import { spawn, spawnSync, type ChildProcessWithoutNullStreams } from 'node:child_process'
import { createHash } from 'node:crypto'
import fs from 'node:fs'
import fsp from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { Readable, Transform } from 'node:stream'
import { pipeline } from 'node:stream/promises'
import AdmZip from 'adm-zip'
import type { HorizonAuth, HorizonProgress, HorizonState, HorizonVersion } from '../src/types'

// Horizon — отдельный клиент Java 26.3 на Rust. Ставим его официальный лаунчер
// и говорим с ним через CLI: своего API у проекта нет.
const RELEASES_API = 'https://api.github.com/repos/horizon-rust/horizon/releases?per_page=20'
const ASSET_PREFIX = 'horizon-launcher-'
const RELEASE_CACHE_MS = 5 * 60 * 1000

export interface HorizonAsset {
  name: string
  browser_download_url: string
  size?: number
}

interface HorizonRelease {
  tag_name: string
  name?: string
  assets: HorizonAsset[]
}

interface ResolvedRelease {
  version: string
  asset: HorizonAsset
  sums: HorizonAsset | null
  fetchedAt: number
}

export interface HorizonEvents {
  state: (state: HorizonState) => void
  progress: (progress: HorizonProgress) => void
  log: (line: string) => void
  auth: (auth: HorizonAuth) => void
}

/** Имя файла лаунчера для текущей платформы. */
export function pickHorizonAsset(names: string[], platform: NodeJS.Platform, arch: string): string | null {
  const osToken: string = platform === 'win32' ? 'windows' : platform === 'darwin' ? 'macos' : 'linux'
  const archPattern = arch === 'arm64' ? /arm64|aarch64/i : /x64|x86_64|amd64/i
  const found = names.filter((name) => {
    if (!name.startsWith(ASSET_PREFIX)) return false
    if (!name.includes(osToken)) return false
    if (!archPattern.test(name)) return false
    if (!/\.(zip|tar\.gz)$/i.test(name)) return false
    return !/setup|appimage/i.test(name)
  })
  return found.length > 0 ? found[0] : null
}

/** SHA256SUMS: строки вида "<хеш>  <файл>". */
export function parseSha256Sums(text: string): Map<string, string> {
  const sums = new Map<string, string>()
  for (const line of text.split(/\r?\n/)) {
    const match = /^([a-f0-9]{64})\s+\*?(.+)$/i.exec(line.trim())
    if (!match) continue
    sums.set(match[2].replace(/^\.\//, '').trim(), match[1].toLowerCase())
  }
  return sums
}

/** Строка входа Horizon: "open <url> in a browser and enter the code <CODE>". */
export function parseSignInMessage(text: string): { url: string; code: string } | null {
  const match = /open\s+(https?:\/\/\S+)\s+in a browser and enter the code\s+([A-Z0-9-]{4,})/i.exec(text)
  if (!match) return null
  return { url: match[1], code: match[2] }
}

export function parseLauncherVersion(output: string): string {
  const match = /(\d+\.\d+\.\d+)/.exec(output)
  return match ? match[1] : ''
}

function parseJson<T>(text: string): T {
  const trimmed = text.trim()
  try {
    return JSON.parse(trimmed) as T
  } catch {
    // CLI может дописать предупреждение до или после JSON
  }
  const open = trimmed.search(/[[{]/)
  const close = Math.max(trimmed.lastIndexOf('}'), trimmed.lastIndexOf(']'))
  if (open >= 0 && close > open) {
    return JSON.parse(trimmed.slice(open, close + 1)) as T
  }
  throw new Error('Horizon вернул не JSON')
}

function majorOf(tag: string): string {
  return /(\d+\.\d+\.\d+)/.exec(tag)?.[1] || ''
}

export class HorizonManager {
  private readonly dir: string
  private readonly events: HorizonEvents
  private playChild: ChildProcessWithoutNullStreams | null = null
  private taskChild: ChildProcessWithoutNullStreams | null = null
  private authChild: ChildProcessWithoutNullStreams | null = null
  private busy: HorizonState['busy'] = null
  private lastState: HorizonState | null = null
  private releaseCache: ResolvedRelease | null = null
  private fullscreenSupport = new Map<string, boolean>()
  private bundledDir: string | null = null
  private minecraftRoot: string | null = null

  constructor(dir: string, events: HorizonEvents, bundledDir: string | null = null, minecraftRoot: string | null = null) {
    this.dir = dir
    this.events = events
    this.bundledDir = bundledDir
    this.minecraftRoot = minecraftRoot
  }

  private exeName(): string {
    return process.platform === 'win32' ? 'horizon-launcher.exe' : 'horizon-launcher'
  }

  private localPath(): string {
    return path.join(this.dir, 'horizon', this.exeName())
  }

  // Официальный лаунчер едет внутри сборки. Если пользователь обновил Horizon
  // через настройки, локальная копия в папке лаунчера важнее встроенной.
  private binaryPath(): string | null {
    const local = this.localPath()
    if (fs.existsSync(local)) return local
    if (!this.bundledDir) return null
    const bundled = path.join(this.bundledDir, this.exeName())
    return fs.existsSync(bundled) ? bundled : null
  }

  launcherPath(): string {
    return this.binaryPath() || this.localPath()
  }

  private get installed(): boolean {
    return !!this.binaryPath()
  }

  // Официальный лаунчер хранит версии в платформенной папке данных (backend::data_dir).
  private dataRoot(): string {
    if (process.env.HORIZON_LAUNCHER_HOME) return process.env.HORIZON_LAUNCHER_HOME
    if (process.platform === 'win32') return path.join(process.env.APPDATA || os.homedir(), 'horizon-launcher')
    if (process.platform === 'darwin') return path.join(os.homedir(), 'Library', 'Application Support', 'horizon-launcher')
    return path.join(process.env.XDG_DATA_HOME || path.join(os.homedir(), '.local', 'share'), 'horizon-launcher')
  }

  // Папка с мирами и настройками игры (backend::game_home).
  private gameHome(): string {
    if (process.env.HORIZON_HOME) return process.env.HORIZON_HOME
    if (process.platform === 'win32') return path.join(process.env.APPDATA || os.homedir(), 'horizon')
    if (process.platform === 'darwin') return path.join(os.homedir(), 'Library', 'Application Support', 'horizon')
    return path.join(process.env.XDG_DATA_HOME || path.join(os.homedir(), '.local', 'share'), 'horizon')
  }

  private versionDir(tag: string): string {
    return path.join(this.dataRoot(), 'versions', tag)
  }

  private clientExe(tag: string): string {
    const name = process.platform === 'win32' ? 'horizon-client.exe' : 'horizon-client'
    return path.join(this.versionDir(tag), name)
  }

  /** Версия Minecraft, из которой Horizon собрал свои ресурсы. */
  private gameVersion(tag: string): string {
    try {
      const lock = JSON.parse(fs.readFileSync(path.join(this.versionDir(tag), 'research-lock.json'), 'utf8')) as {
        minecraft?: { version?: string }
      }
      if (lock.minecraft?.version) return lock.minecraft.version
    } catch {
      // у старых сборок может не быть research-lock.json
    }
    const prepared = path.join(this.versionDir(tag), '.local', 'horizon-client')
    try {
      const found = fs.readdirSync(prepared).find((name) => fs.existsSync(path.join(prepared, name, 'horizon-resources.json')))
      if (found) return found
    } catch {
      // версия ещё не подготовлена
    }
    return '26.3'
  }

  private resourcesDir(tag: string): string {
    return path.join(this.versionDir(tag), '.local', 'horizon-client', this.gameVersion(tag))
  }

  private isPrepared(tag: string): boolean {
    // Итоговый манифест пишется в самом конце подготовки (backend::RESOURCES_MANIFEST).
    return fs.existsSync(path.join(this.resourcesDir(tag), 'horizon-resources.json'))
  }

  // Старые сборки (например v0.2.97) не знают --fullscreen и падают на нём.
  // Спрашиваем у самой игры её справку и запоминаем ответ для каждого тега.
  private supportsFullscreen(tag: string): boolean {
    const cached = this.fullscreenSupport.get(tag)
    if (cached !== undefined) return cached
    let supported = false
    try {
      const exe = this.clientExe(tag)
      if (fs.existsSync(exe)) {
        const help = spawnSync(exe, ['--help'], { timeout: 8000, windowsHide: true, encoding: 'utf8' })
        supported = `${help.stdout || ''}${help.stderr || ''}`.includes('--fullscreen')
      }
    } catch {
      supported = false
    }
    this.fullscreenSupport.set(tag, supported)
    return supported
  }

  private installedTags(): string[] {
    try {
      return fs.readdirSync(path.join(this.dataRoot(), 'versions')).filter((tag) => fs.existsSync(this.clientExe(tag)))
    } catch {
      return []
    }
  }

  private selectedTag(): string | null {
    try {
      const settings = JSON.parse(fs.readFileSync(path.join(this.dataRoot(), 'settings.json'), 'utf8')) as { selected?: string }
      if (settings.selected && fs.existsSync(this.clientExe(settings.selected))) return settings.selected
    } catch {
      // настроек ещё нет
    }
    return null
  }

  private baseState(): HorizonState {
    return {
      installed: this.installed,
      version: '',
      latest: '',
      updateAvailable: false,
      launcherPath: this.launcherPath(),
      playing: !!this.playChild,
      busy: this.busy,
      gameVersions: [],
      selectedVersion: null,
      prepared: false,
      accountName: null,
      owner: false,
      offline: [],
      minecraftDir: '',
      lastError: ''
    }
  }

  async status(): Promise<HorizonState> {
    const state = this.lastState ? { ...this.lastState } : this.baseState()
    state.installed = this.installed
    state.launcherPath = this.launcherPath()
    state.playing = !!this.playChild
    state.busy = this.busy
    if (!this.installed) return state

    const [versionOut, versions, accounts, settings] = await Promise.all([
      this.run(['--version'], 15000).then((r) => r.stdout).catch(() => ''),
      this.run(['versions', '--installed', '--json'], 20000)
        .then((r) => parseJson<{ installed?: string[]; selected?: string | null }>(r.stdout))
        .catch(() => null),
      this.run(['account', 'list', '--json'], 20000)
        .then((r) => parseJson<{ accounts?: Array<Record<string, unknown>>; offline?: string[]; owner?: boolean }>(r.stdout))
        .catch(() => null),
      this.run(['settings', '--json'], 20000)
        .then((r) => parseJson<{ minecraft_dir?: string; selected_version?: string | null }>(r.stdout))
        .catch(() => null)
    ])

    state.version = parseLauncherVersion(versionOut)
    if (versions) {
      state.gameVersions = Array.isArray(versions.installed) ? versions.installed : []
      state.selectedVersion = versions.selected || null
    }
    if (settings) {
      state.minecraftDir = settings.minecraft_dir || ''
      state.selectedVersion = state.selectedVersion || settings.selected_version || null
    }
    if (accounts) {
      const first = Array.isArray(accounts.accounts) ? accounts.accounts[0] : undefined
      state.accountName = first
        ? String(first.name ?? first.username ?? first.login ?? '') || null
        : null
      state.owner = !!accounts.owner
      state.offline = Array.isArray(accounts.offline) ? accounts.offline.map(String) : []
    }
    const tag = state.selectedVersion || state.gameVersions[0]
    state.prepared = !!tag && fs.existsSync(this.clientExe(tag)) && this.isPrepared(tag)
    this.lastState = state
    return state
  }

  private async pushState(): Promise<HorizonState> {
    const state = await this.status().catch(() => this.baseState())
    this.lastState = state
    this.events.state(state)
    return state
  }

  private async resolveRelease(force = false): Promise<ResolvedRelease> {
    if (!force && this.releaseCache && Date.now() - this.releaseCache.fetchedAt < RELEASE_CACHE_MS) {
      return this.releaseCache
    }
    const res = await fetch(RELEASES_API, {
      headers: { 'User-Agent': 'Mine-Launcher', Accept: 'application/vnd.github+json' }
    })
    if (!res.ok) throw new Error(`GitHub ответил ${res.status} на запрос релизов Horizon`)
    const releases = (await res.json()) as HorizonRelease[]
    for (const release of releases) {
      const names = (release.assets || []).map((a) => a.name)
      const assetName = pickHorizonAsset(names, process.platform, process.arch)
      if (!assetName) continue
      const asset = release.assets.find((a) => a.name === assetName)!
      const sums = release.assets.find((a) => a.name === 'SHA256SUMS') || null
      this.releaseCache = { version: majorOf(release.tag_name), asset, sums, fetchedAt: Date.now() }
      return this.releaseCache
    }
    throw new Error(`Нет сборки Horizon под ${process.platform}/${process.arch}`)
  }

  async checkUpdate(): Promise<HorizonState> {
    const release = await this.resolveRelease(true)
    const state = await this.status()
    state.latest = release.version
    state.updateAvailable = !!state.version && state.version !== release.version
    this.lastState = state
    this.events.state(state)
    return state
  }

  private async download(url: string, dest: string, label: string): Promise<string> {
    const res = await fetch(url, { redirect: 'follow', headers: { 'User-Agent': 'Mine-Launcher' } })
    if (!res.ok || !res.body) throw new Error(`Не удалось скачать ${label}: ${res.status}`)
    const total = Number(res.headers.get('content-length') || 0)
    const hash = createHash('sha256')
    let received = 0
    const body = Readable.fromWeb(res.body as never)
    const meter = new Transform({
      transform: (chunk: Buffer, _encoding, done) => {
        received += chunk.length
        hash.update(chunk)
        const percent = total > 0 ? Math.min(99, Math.round((received / total) * 100)) : -1
        this.events.progress({ stage: 'launcher', text: label, percent })
        done(null, chunk)
      }
    })
    await pipeline(body, meter, fs.createWriteStream(dest))
    this.events.progress({ stage: 'launcher', text: label, percent: 100 })
    return hash.digest('hex')
  }

  private async extract(archive: string, target: string): Promise<void> {
    if (archive.endsWith('.zip')) {
      const zip = new AdmZip(archive)
      const root = path.resolve(target)
      for (const entry of zip.getEntries()) {
        const rel = entry.entryName.replace(/\\/g, '/')
        if (rel.includes('..') || rel.startsWith('/') || /^[a-zA-Z]:/.test(rel)) {
          throw new Error('В архиве Horizon небезопасный путь')
        }
        const dest = path.resolve(root, rel)
        if (dest !== root && !dest.startsWith(root + path.sep)) {
          throw new Error('В архиве Horizon небезопасный путь')
        }
        if (entry.isDirectory) {
          await fsp.mkdir(dest, { recursive: true })
        } else {
          await fsp.mkdir(path.dirname(dest), { recursive: true })
          await fsp.writeFile(dest, entry.getData())
        }
      }
      return
    }
    await new Promise<void>((resolve, reject) => {
      const tar = spawn('tar', ['-xzf', archive, '-C', target], { windowsHide: true })
      let stderr = ''
      tar.stderr.on('data', (chunk: Buffer) => { stderr += chunk.toString() })
      tar.on('error', reject)
      tar.on('close', (code) => {
        if (code === 0) resolve()
        else reject(new Error(`tar завершился с кодом ${code}: ${stderr.slice(0, 300)}`))
      })
    })
  }

  async installLauncher(): Promise<HorizonState> {
    if (this.busy) throw new Error('Horizon уже что-то делает')
    this.busy = 'launcher'
    const workDir = path.join(this.dir, 'horizon-tmp')
    try {
      this.events.progress({ stage: 'launcher', text: 'Ищем последний релиз', percent: -1 })
      const release = await this.resolveRelease(true)
      await fsp.mkdir(workDir, { recursive: true })
      const archive = path.join(workDir, release.asset.name)
      const actual = await this.download(release.asset.browser_download_url, archive, `Скачиваем ${release.asset.name}`)

      if (release.sums) {
        this.events.progress({ stage: 'launcher', text: 'Проверяем SHA256', percent: -1 })
        const sumsPath = path.join(workDir, 'SHA256SUMS')
        await this.download(release.sums.browser_download_url, sumsPath, 'Скачиваем контрольные суммы')
        const sums = parseSha256Sums(await fsp.readFile(sumsPath, 'utf8'))
        const expected = sums.get(release.asset.name)
        if (!expected) throw new Error('В SHA256SUMS нет файла для нашей платформы')
        if (expected !== actual) {
          throw new Error(`Хеш не совпал: ожидали ${expected.slice(0, 12)}..., получили ${actual.slice(0, 12)}...`)
        }
      }

      this.events.progress({ stage: 'launcher', text: 'Распаковываем', percent: -1 })
      const target = path.join(this.dir, 'horizon')
      await fsp.rm(target, { recursive: true, force: true })
      await fsp.mkdir(target, { recursive: true })
      await this.extract(archive, target)
      if (process.platform !== 'win32') {
        await fsp.chmod(this.launcherPath(), 0o755).catch(() => {})
      }
      if (!fs.existsSync(this.launcherPath())) {
        throw new Error('В архиве не оказалось horizon-launcher')
      }
      await fsp.rm(workDir, { recursive: true, force: true }).catch(() => {})
      this.lastState = null
    } catch (error) {
      this.busy = null
      await this.pushState().catch(() => null)
      throw error
    } finally {
      this.busy = null
      await fsp.rm(workDir, { recursive: true, force: true }).catch(() => {})
    }
    return this.pushState()
  }

  private run(args: string[], timeoutMs = 60000): Promise<{ stdout: string; stderr: string; code: number | null }> {
    return new Promise((resolve, reject) => {
      const child = spawn(this.launcherPath(), args, { windowsHide: true })
      let stdout = ''
      let stderr = ''
      let settled = false
      const timer = setTimeout(() => {
        if (settled) return
        settled = true
        child.kill()
        reject(new Error(`Horizon не ответил за ${Math.round(timeoutMs / 1000)} с`))
      }, timeoutMs)
      child.stdout.on('data', (chunk: Buffer) => { stdout += chunk.toString() })
      child.stderr.on('data', (chunk: Buffer) => { stderr += chunk.toString() })
      child.on('error', (err) => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        reject(err)
      })
      child.on('close', (code) => {
        if (settled) return
        settled = true
        clearTimeout(timer)
        resolve({ stdout, stderr, code })
      })
    })
  }

  private async runJson<T>(args: string[], timeoutMs = 60000): Promise<T> {
    const result = await this.run(args, timeoutMs)
    if (result.code !== 0) {
      const detail = (result.stderr || result.stdout).trim().split(/\r?\n/).slice(-3).join(' ')
      throw new Error(detail || `Horizon завершился с кодом ${result.code}`)
    }
    return parseJson<T>(result.stdout)
  }

  /** Долгая команда: строки прогресса отдаём в UI, JSON в конце разбираем сами. */
  private runStreaming(args: string[], stage: HorizonProgress['stage']): Promise<void> {
    return new Promise((resolve, reject) => {
      const child = spawn(this.launcherPath(), args, { windowsHide: true })
      this.taskChild = child
      let tail = ''
      let buffer = ''
      const handle = (chunk: Buffer) => {
        const text = chunk.toString()
        tail = (tail + text).slice(-4000)
        buffer += text
        const lines = buffer.split(/\r?\n/)
        buffer = lines.pop() || ''
        for (const line of lines) {
          const clean = line.trim()
          if (!clean) continue
          this.events.log(clean)
          this.events.progress({ stage, text: clean, percent: -1 })
        }
      }
      child.stdout.on('data', handle)
      child.stderr.on('data', handle)
      child.on('error', (err) => { this.taskChild = null; reject(err) })
      child.on('close', (code) => {
        this.taskChild = null
        if (buffer.trim()) this.events.log(buffer.trim())
        if (code === 0) resolve()
        else reject(new Error(tail.trim().split(/\r?\n/).slice(-3).join(' ') || `Horizon завершился с кодом ${code}`))
      })
    })
  }

  async installGame(tag: string): Promise<HorizonState> {
    if (!this.installed) throw new Error('Сначала установите Horizon')
    if (!/^[0-9A-Za-z._-]+$/.test(tag)) throw new Error('Некорректная версия')
    if (this.busy) throw new Error('Horizon уже что-то делает')
    this.busy = 'game'
    try {
      await this.runStreaming(['install', tag], 'game')
      await this.runJson<unknown>(['settings', 'selected-version', tag], 30000).catch(() => null)
    } catch (error) {
      this.busy = null
      await this.pushState().catch(() => null)
      throw error
    } finally {
      this.busy = null
    }
    return this.pushState()
  }

  async prepare(options: { download?: boolean; version?: string; minecraftDir?: string } = {}): Promise<HorizonState> {
    if (!this.installed) throw new Error('Сначала установите Horizon')
    if (this.busy) throw new Error('Horizon уже что-то делает')
    if (options.version && !/^[0-9A-Za-z._-]+$/.test(options.version)) throw new Error('Некорректная версия')
    this.busy = 'prepare'
    const args = ['prepare']
    if (options.download) args.push('--download')
    if (options.version) args.push('--version', options.version)
    if (options.minecraftDir) args.push('--minecraft', options.minecraftDir)
    try {
      await this.runStreaming(args, 'prepare')
    } catch (error) {
      this.busy = null
      await this.pushState().catch(() => null)
      throw error
    } finally {
      this.busy = null
    }
    return this.pushState()
  }

  async setMinecraftDir(dir: string): Promise<HorizonState> {
    if (!fs.existsSync(dir)) throw new Error('Такой папки нет')
    await this.runJson<unknown>(['settings', 'minecraft-dir', dir], 30000)
    return await this.pushState()
  }

  async setOffline(name: string): Promise<HorizonState> {
    if (name && !/^[A-Za-z0-9_]{3,16}$/.test(name)) throw new Error('Ник: 3-16 символов, только латиница, цифры и _')
    const args = ['account', 'offline']
    if (name) args.push(name)
    await this.runJson<unknown>(args, 30000)
    return await this.pushState()
  }

  async startSignIn(): Promise<void> {
    if (!this.installed) throw new Error('Сначала установите Horizon')
    if (this.authChild) return
    const child = spawn(this.launcherPath(), ['account', 'sign-in'], { windowsHide: true })
    this.authChild = child
    let buffer = ''
    let reported = false
    let stdout = ''
    const onData = (chunk: Buffer) => {
      const text = chunk.toString()
      buffer += text
      if (!reported) {
        const parsed = parseSignInMessage(buffer)
        if (parsed) {
          reported = true
          this.events.auth({ status: 'waiting', url: parsed.url, code: parsed.code })
        }
      }
    }
    child.stderr.on('data', onData)
    child.stdout.on('data', (chunk: Buffer) => { stdout += chunk.toString(); onData(chunk) })
    child.on('error', (err) => {
      this.authChild = null
      this.events.auth({ status: 'error', message: err.message })
    })
    child.on('close', async (code) => {
      this.authChild = null
      if (code === 0) {
        this.events.auth({ status: 'done', message: 'Вход выполнен' })
        await this.pushState().catch(() => null)
      } else {
        this.events.auth({ status: 'error', message: stdout.trim().split(/\r?\n/).slice(-2).join(' ') || `Код ${code}` })
      }
    })
  }

  private trackGame(child: ChildProcessWithoutNullStreams): void {
    this.playChild = child
    let buffer = ''
    const handle = (chunk: Buffer) => {
      buffer += chunk.toString()
      const lines = buffer.split(/\r?\n/)
      buffer = lines.pop() || ''
      for (const line of lines) {
        const clean = line.trim()
        if (clean) this.events.log(clean)
      }
    }
    child.stdout.on('data', handle)
    child.stderr.on('data', handle)
    child.on('error', (err) => {
      this.playChild = null
      this.events.log(`Ошибка запуска: ${err.message}`)
      void this.pushState()
    })
    child.on('close', (code) => {
      this.playChild = null
      this.events.log(code === 0 ? 'Игра закрыта' : `Игра завершилась с кодом ${code}`)
      void this.pushState()
    })
    this.lastState = { ...(this.lastState || this.baseState()), playing: true }
    this.events.state(this.lastState)
  }

  async play(version?: string): Promise<void> {
    if (!this.installed) throw new Error('Сначала установите Horizon')
    if (this.playChild) throw new Error('Игра уже запущена')
    const args = ['play']
    if (version) args.push('--version', version)
    this.trackGame(spawn(this.launcherPath(), args, { windowsHide: true }))
  }

  /**
   * Оффлайн-запуск игры без аккаунта Microsoft — так же, как это делает
   * официальный лаунчер с включённым скрытым режимом dev_offline: игра стартует
   * без сессии, берёт файлы из собственной установки Minecraft и умеет только
   * одиночную игру и LAN. Онлайн-серверы и скины по-прежнему требуют лицензию.
   */
  async playOffline(options: { version?: string; nickname?: string; fullscreen?: boolean } = {}): Promise<void> {
    if (!this.installed) throw new Error('Сначала установите Horizon')
    if (this.playChild) throw new Error('Игра уже запущена')

    const tag = options.version || this.selectedTag() || this.installedTags()[0]
    if (!tag) throw new Error('Сначала установите версию игры Horizon')
    if (!/^[0-9A-Za-z._-]+$/.test(tag) || !fs.existsSync(this.clientExe(tag))) {
      throw new Error('Эта версия игры Horizon не установлена')
    }
    if (options.nickname && !/^[A-Za-z0-9_]{3,16}$/.test(options.nickname)) {
      throw new Error('Ник: 3-16 символов, только латиница, цифры и _')
    }

    if (!this.isPrepared(tag)) {
      if (!this.minecraftRoot) throw new Error('Сначала подготовьте игру Horizon')
      await this.prepare({ version: tag, minecraftDir: this.minecraftRoot })
    }

    const home = this.gameHome()
    await fsp.mkdir(home, { recursive: true })
    if (options.nickname) {
      await fsp.writeFile(path.join(home, 'horizon-player.txt'), `name:${options.nickname}\n`)
    }

    const env: NodeJS.ProcessEnv = {
      ...process.env,
      HORIZON_HOME: home,
      HORIZON_LAUNCHER_EXE: this.launcherPath()
    }
    delete env.HORIZON_ACCOUNT_SESSIONS

    const args = ['--resources', this.resourcesDir(tag)]
    if (options.fullscreen && this.supportsFullscreen(tag)) args.push('--fullscreen')
    this.trackGame(spawn(this.clientExe(tag), args, {
      cwd: home,
      env,
      windowsHide: false
    }))
  }

  stop(): boolean {
    const child = this.playChild
    if (!child || !child.pid) return false
    if (process.platform === 'win32') {
      spawn('taskkill', ['/pid', String(child.pid), '/T', '/F'], { windowsHide: true })
    } else {
      child.kill('SIGTERM')
    }
    return true
  }

  async versions(): Promise<HorizonVersion[]> {
    if (!this.installed) return []
    const list = await this.runJson<HorizonVersion[]>(['versions', '--json'], 30000)
    return Array.isArray(list) ? list : []
  }

  dispose(): void {
    this.stop()
    this.taskChild?.kill()
    this.authChild?.kill()
  }
}
