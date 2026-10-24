import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import https from 'node:https'
import http from 'node:http'
import { spawn, execSync } from 'node:child_process'
import { app } from 'electron'
import AdmZip from 'adm-zip'

// Java major по версии Minecraft
export function requiredJavaMajor(mcVersion: string): number {
  const v = mcVersion.replace(/[^0-9.].*$/, '')
  const parts = v.split('.').map(n => parseInt(n, 10))
  const major = parts[0]
  const minor = parts[1] ?? 0
  const patch = parts[2] ?? 0
  if (major > 1) return 21
  if (minor > 20 || (minor === 20 && patch >= 5)) return 21 // 1.20.5+
  if (minor >= 17) return 17                                 // 1.17–1.20.4
  return 8                                                   // ≤ 1.16.5
}

const TEMURIN: Record<number, { win: string; mac_x64: string; mac_aarch64: string; linux_x64: string }> = {
  8:  {
    win:          'https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u422-b05/OpenJDK8U-jre_x64_windows_hotspot_8u422b05.zip',
    mac_x64:      'https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u422-b05/OpenJDK8U-jre_x64_mac_hotspot_8u422b05.tar.gz',
    mac_aarch64:  'https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u422-b05/OpenJDK8U-jre_aarch64_mac_hotspot_8u422b05.tar.gz',
    linux_x64:    'https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u422-b05/OpenJDK8U-jre_x64_linux_hotspot_8u422b05.tar.gz',
  },
  17: {
    win:          'https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.13%2B11/OpenJDK17U-jre_x64_windows_hotspot_17.0.13_11.zip',
    mac_x64:      'https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.13%2B11/OpenJDK17U-jre_x64_mac_hotspot_17.0.13_11.tar.gz',
    mac_aarch64:  'https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.13%2B11/OpenJDK17U-jre_aarch64_mac_hotspot_17.0.13_11.tar.gz',
    linux_x64:    'https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.13%2B11/OpenJDK17U-jre_x64_linux_hotspot_17.0.13_11.tar.gz',
  },
  21: {
    win:          'https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.5%2B11/OpenJDK21U-jre_x64_windows_hotspot_21.0.5_11.zip',
    mac_x64:      'https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.5%2B11/OpenJDK21U-jre_x64_mac_hotspot_21.0.5_11.tar.gz',
    mac_aarch64:  'https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.5%2B11/OpenJDK21U-jre_aarch64_mac_hotspot_21.0.5_11.tar.gz',
    linux_x64:    'https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.5%2B11/OpenJDK21U-jre_x64_linux_hotspot_21.0.5_11.tar.gz',
  },
}

function temurinUrl(javaMajor: number): string {
  const t = TEMURIN[javaMajor] || TEMURIN[17]
  if (process.platform === 'win32') return t.win
  if (process.platform === 'darwin') return process.arch === 'arm64' ? t.mac_aarch64 : t.mac_x64
  return t.linux_x64
}

export interface VersionManifest {
  latest: { release: string; snapshot: string }
  versions: Array<{ id: string; type: string; url: string; time: string; releaseTime: string }>
}

export interface LaunchConfig {
  instanceId: string
  instanceName: string
  version: string
  loader: 'vanilla' | 'fabric' | 'quilt'
  username: string
  uuid: string
  memoryMin: number
  memoryMax: number
  javaPath?: string
  customJvmArgs?: string
  customGameArgs?: string
  fullscreen: boolean
  hideLauncher: boolean
}

export interface ProgressCallback {
  (data: {
    instanceId: string
    stage: 'idle' | 'checking' | 'downloading' | 'extracting' | 'launching' | 'running' | 'error'
    statusText: string
    progress: number
    downloadedMb?: string
    totalMb?: string
    speed?: string
    error?: string
  }): void
}

export interface LogCallback {
  (log: { timestamp: number; type: 'info' | 'warn' | 'error'; message: string }): void
}

const activeProcesses = new Map<string, any>()

let lastLaunchAt = 0
let lastLaunchBytes = 0

export function getRootDir(): string {
  const baseDir = app.getPath('userData')
  const launcherDir = path.join(baseDir, '.mine-launcher')
  if (!fs.existsSync(launcherDir)) {
    fs.mkdirSync(launcherDir, { recursive: true })
  }
  return launcherDir
}

export function generateOfflineUUID(username: string): string {
  const md5 = crypto.createHash('md5')
  md5.update(`OfflinePlayer:${username}`)
  const bytes = md5.digest()
  bytes[6] = (bytes[6] & 0x0f) | 0x30 // v3 UUID
  bytes[8] = (bytes[8] & 0x3f) | 0x80
  const hex = bytes.toString('hex')
  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20, 32)}`
}

function fetchJson<T>(url: string): Promise<T> {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http
    const req = client.get(url, { headers: { 'User-Agent': 'MineLauncher/2.0' } }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume()
        return fetchJson<T>(res.headers.location).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        res.resume()
        return reject(new Error(`HTTP ${res.statusCode} — ${url}`))
      }
      let rawData = ''
      res.setEncoding('utf-8')
      res.on('data', (chunk) => { rawData += chunk })
      res.on('end', () => {
        try { resolve(JSON.parse(rawData)) } catch (e) { reject(e) }
      })
      res.on('error', reject)
    })
    req.on('error', reject)
  })
}

function downloadFile(url: string, destPath: string, onBytes?: (bytesSinceLast: number) => void): Promise<void> {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(destPath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    const file = fs.createWriteStream(destPath)
    const client = url.startsWith('https') ? https : http

    const request = client.get(url, { headers: { 'User-Agent': 'MineLauncher/2.0' } }, (response) => {
      if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close()
        fs.unlinkSync(destPath)
        return downloadFile(response.headers.location, destPath, onBytes).then(resolve).catch(reject)
      }
      if (response.statusCode !== 200) {
        file.close()
        fs.unlink(destPath, () => {})
        response.resume()
        return reject(new Error(`HTTP ${response.statusCode}: ${url}`))
      }
      response.on('data', (chunk) => onBytes?.(chunk.length))
      response.pipe(file)
      file.on('finish', () => file.close(() => resolve()))
      file.on('error', reject)
    })

    request.on('error', (err) => {
      file.close()
      fs.unlink(destPath, () => {})
      reject(err)
    })
  })
}

export function isSafeRelPath(rel: string): boolean {
  return !rel.includes('..') && !path.isAbsolute(rel)
}

/**
 * Безопасная распаковка zip: никаких symlink-записей, никаких путей за пределами destDir.
 * extract-zip удалён из зависимостей: у него открыт symlink path traversal без фикса.
 */
export function extractZipSafe(zipPath: string, destDir: string, filter?: (name: string) => boolean): number {
  const zip = new AdmZip(zipPath)
  const destRoot = path.resolve(destDir)
  let written = 0

  for (const entry of zip.getEntries()) {
    if (entry.isDirectory) continue
    const raw = entry.entryName.replace(/\\/g, '/')

    // Unix-биты режима в zip лежат в старших 16 битах external attributes.
    // 0o120000 — symlink: такие записи опасны, отказываем целиком.
    const attr = Number((entry.header as any)?.attr ?? 0)
    const unixMode = (attr >>> 16) & 0o170000
    if (unixMode === 0o120000 || (attr & 0o170000) === 0o120000) {
      throw new Error(`Архив содержит symlink: ${raw}`)
    }

    if (path.isAbsolute(raw) || /^[A-Za-z]:/.test(raw) || raw.split('/').some((s) => s === '' || s === '.' || s === '..')) {
      throw new Error(`Небезопасный путь в архиве: ${raw}`)
    }
    if (filter && !filter(raw)) continue

    const target = path.resolve(destRoot, ...raw.split('/'))
    const rel = path.relative(destRoot, target)
    if (rel === '' || rel.startsWith('..') || path.isAbsolute(rel)) {
      throw new Error(`Путь вне каталога распаковки: ${raw}`)
    }

    fs.mkdirSync(path.dirname(target), { recursive: true })
    fs.writeFileSync(target, entry.getData())
    written++
  }

  return written
}

async function extractNativeDlls(jarPath: string, destDir: string) {
  if (!fs.existsSync(jarPath)) return
  try {
    const wanted = process.platform === 'win32' ? '.dll'
                 : process.platform === 'darwin' ? '.dylib'
                 : '.so'
    const zip = new AdmZip(jarPath)
    for (const entry of zip.getEntries()) {
      if (entry.isDirectory) continue
      // Берём только имя файла: структура путей jar нас не интересует, traversal невозможен
      const name = path.basename(entry.entryName.replace(/\\/g, '/'))
      if (!name.toLowerCase().endsWith(wanted)) continue
      if (!/^[A-Za-z0-9._ -]{1,200}$/.test(name)) continue
      fs.writeFileSync(path.join(destDir, name), entry.getData())
    }
  } catch {}
}

// Кольцевой буфер последних строк вывода игры — нужен для разбора причин краша
let logRingBuffer: string[] = []
function pushLogLine(line: string) {
  logRingBuffer.push(line)
  if (logRingBuffer.length > 120) logRingBuffer = logRingBuffer.slice(-120)
}

export function buildCrashHint(lines: string[]): string {
  const joined = lines.join('\n')

  const mBadJava = joined.match(/Unsupported class file major version (\d+)/)
  if (mBadJava) {
    return 'Похоже, у вас неправильно подобрана версия Java — версия игры требует более новую Java. ' +
           'Откройте «Настройки» и в разделе Java проверьте, что путь ведёт к правильной JDK/JRE.'
  }

  if (/java\.lang\.OutOfMemoryError/.test(joined)) {
    return 'Игре не хватило памяти. Увеличьте «Максимальную память» в настройках лаунчера (в МБ) и попробуйте снова.'
  }

  // Windows: 0xC0000135 = DLL not found — почти всегда отсутствует VC++ Redistributable
  if (/-1073741515|0xc0000135/i.test(joined)) {
    return 'Не найдены системные библиотеки Windows. Установите Microsoft Visual C++ Redistributable (x64) — это самая частая причина на чистой Windows.'
  }

  // 0xC0000005 = access violation — обычно видеодрайвер либо побитый native
  if (/-1073741819|0xc0000005/i.test(joined)) {
    return 'Крит native-кода. Чаще всего помогает обновление видеодрайвера. Если не помогло — запустите без модов и посмотрите лог.'
  }

  if (/UnsatisfiedLinkError/i.test(joined)) {
    return 'Не загрузились системные библиотеки игры (LWJGL natives). Проверьте, не блокирует ли их антивирус, и запустите снова — недостающие файлы скачаются заново.'
  }

  if (/No space left|disk full|ENOSPC/i.test(joined)) {
    return 'Закончилось место на диске. Освободите его и попробуйте снова.'
  }

  if (/Failed to (download|fetch)|Could not (download|fetch)|assets/i.test(joined) && /asset|resources/i.test(joined)) {
    return 'Не удалось скачать игровые ресурсы (assets) — часто это сетевая блокировка CDN Mojang у провайдера. Попробуйте другое подключение или VPN и запустите снова.'
  }

  if (/Could not create the Java Virtual Machine|Invalid or corrupt jarfile| unrecognized/.test(joined)) {
    return 'Проверьте аргументы JVM в настройках лаунчера — Java не смогла запуститься с текущими параметрами.'
  }

  if (/GLFW error|OpenGL|gpu|DirectX/i.test(joined) && /error|fail/i.test(joined)) {
    return 'Похоже, проблема с видеодрайвером/OpenGL. Обновите драйвер видеокарты.'
  }

  if (/Incompatible.fml.mod|Fabric loader|Quilt loading/i.test(joined)) {
    return 'Похоже, один из модов несовместим с этой версией или загрузчиком. Откройте вкладку «Моды» и отключите их по одному.'
  }

  if (/Mixin apply failed|MixinTransformer/i.test(joined)) {
    return 'Ошибка в моде (Mixin). Отключите свежеустановленные моды во вкладке «Моды».'
  }

  if (/The game crashed.*Calling event|Exception in thread "main"/.test(joined)) {
    return 'Игра упала при старте. Попробуйте без модов или откройте папку сборки и покажите лог на форуме.'
  }

  return 'Смотрите вкладку «Логи» для подробностей.'
}

export function isLibraryAllowed(
  rules?: Array<{ action: string; os?: { name: string } }>,
  wantedOs: string = process.platform === 'win32' ? 'windows'
                : process.platform === 'darwin' ? 'osx'
                : 'linux'
): boolean {
  if (!rules || rules.length === 0) return true
  let allowed = false
  for (const r of rules) {
    if (!r.os || r.os.name === wantedOs) {
      allowed = r.action === 'allow'
    }
  }
  return allowed
}

export async function detectJavaPaths(): Promise<string[]> {
  const found: string[] = []
  const isWin = process.platform === 'win32'
  const javaName = isWin ? 'javaw.exe' : 'java'

  const rootDir = getRootDir()

  const findJava = (dir: string, depth = 0): string | null => {
    if (!fs.existsSync(dir) || depth > 6) return null
    try {
      const items = fs.readdirSync(dir)
      for (const item of items) {
        const full = path.join(dir, item)
        if (item.toLowerCase() === javaName.toLowerCase()) return full
        try {
          if (fs.statSync(full).isDirectory()) {
            const res = findJava(full, depth + 1)
            if (res) return res
          }
        } catch {}
      }
    } catch {}
    return null
  }

  for (const major of [21, 17, 8]) {
    const internalJava = findJava(path.join(rootDir, 'java', `java-${major}`))
    if (internalJava) found.push(internalJava)
  }

  if (process.env.JAVA_HOME) {
    const p = path.join(process.env.JAVA_HOME, 'bin', javaName)
    if (fs.existsSync(p)) found.push(p)
  }

  if (isWin) {
    const searchDirs = [
      'C:\\Program Files\\Java',
      'C:\\Program Files (x86)\\Java',
      'C:\\Program Files\\Eclipse Adoptium',
      'C:\\Program Files\\Microsoft',
      'C:\\Program Files\\BellSoft',
      'C:\\Program Files\\Amazon Corretto',
      path.join(process.env.LOCALAPPDATA || '', 'Programs', 'AdoptOpenJDK'),
      'C:\\Program Files (x86)\\Minecraft Launcher\\runtime'
    ]
    for (const sDir of searchDirs) {
      if (!fs.existsSync(sDir)) continue
      try {
        for (const sub of fs.readdirSync(sDir)) {
          const fullPath = path.join(sDir, sub, 'bin', javaName)
          if (fs.existsSync(fullPath) && !found.includes(fullPath)) found.push(fullPath)
        }
      } catch {}
    }
  } else {
    const unixDirs = ['/usr/lib/jvm', '/usr/lib64/jvm', '/Library/Java/JavaVirtualMachines', '/opt/java']
    for (const d of unixDirs) {
      if (!fs.existsSync(d)) continue
      try {
        for (const sub of fs.readdirSync(d)) {
          for (const candidate of [`${sub}/bin/java`, `${sub}/Contents/Home/bin/java`]) {
            const full = path.join(d, candidate)
            if (fs.existsSync(full) && !found.includes(full)) found.push(full)
          }
        }
      } catch {}
    }
  }

  return found
}

export async function downloadJavaRuntime(
  onProgress: ProgressCallback,
  onLog: LogCallback,
  javaMajor: number = 17
): Promise<string> {
  const rootDir = getRootDir()
  const javaDir = path.join(rootDir, 'java', `java-${javaMajor}`)

  const findJava = (dir: string, depth = 0): string | null => {
    if (!fs.existsSync(dir) || depth > 6) return null
    try {
      for (const item of fs.readdirSync(dir)) {
        const full = path.join(dir, item)
        if (item.toLowerCase() === (process.platform === 'win32' ? 'javaw.exe' : 'java').toLowerCase()) return full
        try {
          if (fs.statSync(full).isDirectory()) {
            const res = findJava(full, depth + 1)
            if (res) return res
          }
        } catch {}
      }
    } catch {}
    return null
  }

  const existing = findJava(javaDir)
  if (existing) return existing

  onProgress({
    instanceId: 'java-auto',
    stage: 'downloading',
    statusText: `Скачивание Java ${javaMajor}...`,
    progress: 55
  })
  onLog({
    timestamp: Date.now(),
    type: 'info',
    message: `Java ${javaMajor} не найдена на ПК — скачиваю Eclipse Temurin JRE ${javaMajor}...`
  })

  const isWin = process.platform === 'win32'
  const zipUrl = temurinUrl(javaMajor)
  const ext = isWin ? 'zip' : '.tar.gz'
  const zipPath = path.join(rootDir, 'java', `java-${javaMajor}.${ext}`)

  if (!fs.existsSync(path.dirname(zipPath))) fs.mkdirSync(path.dirname(zipPath), { recursive: true })

  await downloadFile(zipUrl, zipPath, (bytes) => {
    lastLaunchBytes += bytes
    const now = Date.now()
    if (now - lastLaunchAt > 1000) {
      const speed = lastLaunchBytes / Math.max(1, (now - lastLaunchAt) / 1000)
      lastLaunchAt = now
      lastLaunchBytes = 0
      onProgress({
        instanceId: 'java-auto',
        stage: 'downloading',
        statusText: `Скачивание Java ${javaMajor}... (${(speed / 1024 / 1024).toFixed(1)} МБ/с)`,
        progress: 55
      })
    }
  })

  onProgress({
    instanceId: 'java-auto',
    stage: 'extracting',
    statusText: `Распаковка Java ${javaMajor}...`,
    progress: 75
  })
  onLog({ timestamp: Date.now(), type: 'info', message: `Распаковка архива Java ${javaMajor}...` })

  if (!fs.existsSync(javaDir)) fs.mkdirSync(javaDir, { recursive: true })

  if (isWin) {
    extractZipSafe(zipPath, javaDir)
  } else {
    execSync(`tar -xzf "${zipPath}" -C "${javaDir}"`)
  }
  fs.unlinkSync(zipPath)

  const finalJava = findJava(javaDir)
  if (!finalJava) throw new Error(`Java ${javaMajor} распакована некорректно — попробуйте установить её вручную`)

  onLog({ timestamp: Date.now(), type: 'info', message: `Java ${javaMajor} установлена: ${finalJava}` })
  return finalJava
}

export async function getMinecraftVersions(): Promise<VersionManifest> {
  return await fetchJson<VersionManifest>('https://launchermeta.mojang.com/mc/game/version_manifest_v2.json')
}

export async function launchMinecraft(
  config: LaunchConfig,
  onProgress: ProgressCallback,
  onLog: LogCallback
): Promise<void> {
  lastLaunchAt = 0
  lastLaunchBytes = 0
  logRingBuffer = []

  const rootDir = getRootDir()
  const instanceDir = path.join(rootDir, 'instances', config.instanceId)
  const assetsDir = path.join(rootDir, 'assets')
  const librariesDir = path.join(rootDir, 'libraries')
  const versionsDir = path.join(rootDir, 'versions')
  const nativesDir = path.join(instanceDir, 'natives')

  for (const d of [instanceDir, nativesDir]) {
    if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true })
  }

  try {
    // 1. Java
    let javaBin: string | undefined = config.javaPath
    let isJavaValid = false

    if (javaBin && fs.existsSync(javaBin)) {
      try {
        execSync(`"${javaBin}" -version 2>&1`, { stdio: 'ignore' })
        isJavaValid = true
      } catch {}
    }

    if (!isJavaValid) {
      const detected = await detectJavaPaths()
      for (const d of detected) {
        try {
          execSync(`"${d}" -version 2>&1`, { stdio: 'ignore' })
          javaBin = d
          isJavaValid = true
          break
        } catch {}
      }
    }

    if (!isJavaValid) {
      javaBin = await downloadJavaRuntime(onProgress, onLog, requiredJavaMajor(config.version))
    }

    onLog({ timestamp: Date.now(), type: 'info', message: `Java: ${javaBin}` })

    // 2. Version manifest / version JSON
    onProgress({ instanceId: config.instanceId, stage: 'checking', statusText: 'Проверка версии...', progress: 5 })

    const verInfo = (await getMinecraftVersions()).versions.find((v) => v.id === config.version)
    if (!verInfo) throw new Error(`Версия ${config.version} не найдена на серверах Mojang`)

    const versionJsonPath = path.join(versionsDir, config.version, `${config.version}.json`)
    let versionData: any
    if (fs.existsSync(versionJsonPath)) {
      try {
        versionData = JSON.parse(fs.readFileSync(versionJsonPath, 'utf-8'))
      } catch {
        versionData = null
      }
    }
    if (!versionData) {
      onProgress({ instanceId: config.instanceId, stage: 'downloading', statusText: `Загрузка версии ${config.version}...`, progress: 10 })
      versionData = await fetchJson<any>(verInfo.url)
      if (!fs.existsSync(path.dirname(versionJsonPath))) fs.mkdirSync(path.dirname(versionJsonPath), { recursive: true })
      fs.writeFileSync(versionJsonPath, JSON.stringify(versionData, null, 2))
    }

    // 3. Assets
    if (versionData.assetIndex?.url) {
      const assetIndexPath = path.join(assetsDir, 'indexes', `${versionData.assetIndex.id}.json`)
      if (!fs.existsSync(assetIndexPath)) {
        onProgress({ instanceId: config.instanceId, stage: 'downloading', statusText: 'Загрузка манифеста ресурсов...', progress: 12 })
        await downloadFile(versionData.assetIndex.url, assetIndexPath)
      }

      try {
        const index = JSON.parse(fs.readFileSync(assetIndexPath, 'utf-8'))
        const objects = index.objects || {}
        const objectsDir = path.join(assetsDir, 'objects')

        const missing: Array<{ hash: string }> = []
        for (const key of Object.keys(objects)) {
          const hash = objects[key].hash
          const dest = path.join(objectsDir, hash.slice(0, 2), hash)
          if (!fs.existsSync(dest)) missing.push({ hash })
        }

        if (missing.length > 0) {
          onProgress({
            instanceId: config.instanceId,
            stage: 'downloading',
            statusText: `Загрузка ресурсов (0/${missing.length})...`,
            progress: 15
          })
          let completed = 0
          const batchSize = 64
          let windowStarted = Date.now()
          let windowBytes = 0

          for (let i = 0; i < missing.length; i += batchSize) {
            const chunk = missing.slice(i, i + batchSize)
            await Promise.all(
              chunk.map(item => downloadFile(
                `https://resources.download.minecraft.net/${item.hash.slice(0, 2)}/${item.hash}`,
                path.join(objectsDir, item.hash.slice(0, 2), item.hash),
                (b) => { windowBytes += b }
              ).catch(() => {}))
            )
            completed += chunk.length

            const now = Date.now()
            if (now - windowStarted > 1500) {
              const speed = windowBytes / Math.max(1, (now - windowStarted) / 1000)
              onProgress({
                instanceId: config.instanceId,
                stage: 'downloading',
                statusText: `Загрузка ресурсов (${completed}/${missing.length}) — ${(speed / 1024 / 1024).toFixed(1)} МБ/с`,
                progress: 15 + (completed / missing.length) * 25
              })
              windowStarted = now
              windowBytes = 0
            }
          }
        }
      } catch (e: any) {
        onLog({ timestamp: Date.now(), type: 'warn', message: `Ресурсы: ${e.message}` })
      }
    }

    // 4. Client JAR
    const clientJarPath = path.join(versionsDir, config.version, `${config.version}.jar`)
    if (!fs.existsSync(clientJarPath) && versionData.downloads?.client?.url) {
      const onBytes = (b: number) => {
        lastLaunchBytes += b
        const now = Date.now()
        if (now - lastLaunchAt > 500) {
          const speed = lastLaunchBytes / Math.max(1, (now - lastLaunchAt) / 1000)
          lastLaunchAt = now
          lastLaunchBytes = 0
          onProgress({
            instanceId: config.instanceId,
            stage: 'downloading',
            statusText: `Загрузка Minecraft ${config.version}.jar — ${(speed / 1024 / 1024).toFixed(1)} МБ/с`,
            progress: 45
          })
        }
      }
      onProgress({ instanceId: config.instanceId, stage: 'downloading', statusText: `Загрузка Minecraft ${config.version}.jar...`, progress: 42 })
      await downloadFile(versionData.downloads.client.url, clientJarPath, onBytes)
    }

    // 5. Libraries
    onProgress({ instanceId: config.instanceId, stage: 'downloading', statusText: 'Загрузка библиотек...', progress: 50 })

    const cpList: string[] = []
    const libraries = versionData.libraries || []
    let lastSpeedUpdate = 0
    let libBytes = 0
    let libDone = 0

    for (const lib of libraries) {
      if (!isLibraryAllowed(lib.rules)) continue

      if (lib.downloads?.artifact) {
        const libRelPath = lib.downloads.artifact.path
        if (!isSafeRelPath(libRelPath)) { onLog({ timestamp: Date.now(), type: 'warn', message: `Библиотека пропущена (путь вне каталога): ${libRelPath}` }); continue }
        const libFullPath = path.join(librariesDir, libRelPath)
        if (!fs.existsSync(libFullPath)) {
          try {
            await downloadFile(lib.downloads.artifact.url, libFullPath, (b) => { libBytes += b })
          } catch {}
        }
        if (fs.existsSync(libFullPath)) {
          cpList.push(libFullPath)
          if (libRelPath.includes('natives') || lib.name.includes('natives')) {
            await extractNativeDlls(libFullPath, nativesDir)
          }
        }
      }

      if (lib.downloads?.classifiers) {
        const classifiers = lib.downloads.classifiers
        const wantedNative = process.platform === 'win32'
          ? (classifiers['natives-windows'] || classifiers['natives-windows-64'] || classifiers['natives-windows-x86'])
          : process.platform === 'darwin'
            ? classifiers['natives-osx'] || classifiers['natives-macos']
            : classifiers['natives-linux']
        if (wantedNative) {
          const nativeRelPath = wantedNative.path
          if (!isSafeRelPath(nativeRelPath)) continue
          const nativeFullPath = path.join(librariesDir, nativeRelPath)
          if (!fs.existsSync(nativeFullPath)) {
            try {
              await downloadFile(wantedNative.url, nativeFullPath, (b) => { libBytes += b })
            } catch {}
          }
          if (fs.existsSync(nativeFullPath)) await extractNativeDlls(nativeFullPath, nativesDir)
        }
      }

      if (!lib.downloads?.artifact && lib.name) {
        const parts = lib.name.split(':')
        const domain = parts[0].replace(/\./g, '/')
        const name = parts[1]
        const ver = parts[2]
        const relPath = `${domain}/${name}/${ver}/${name}-${ver}.jar`
        if (!isSafeRelPath(relPath)) continue
        const libFullPath = path.join(librariesDir, relPath)
        const url = lib.url ? `${lib.url}${relPath}` : `https://libraries.minecraft.net/${relPath}`
        if (!fs.existsSync(libFullPath)) {
          try {
            await downloadFile(url, libFullPath, (b) => { libBytes += b })
          } catch {}
        }
        if (fs.existsSync(libFullPath)) {
          cpList.push(libFullPath)
          if (lib.name.includes('natives')) await extractNativeDlls(libFullPath, nativesDir)
        }
      }

      libDone++
      const now = Date.now()
      if (now - lastSpeedUpdate > 800 && libBytes > 0) {
        const speed = libBytes / Math.max(1, (now - lastSpeedUpdate) / 1000)
        onProgress({
          instanceId: config.instanceId,
          stage: 'downloading',
          statusText: `Библиотеки ${libDone}/${libraries.length} — ${(speed / 1024 / 1024).toFixed(1)} МБ/с`,
          progress: 50 + (libDone / libraries.length) * 15
        })
        lastSpeedUpdate = now
        libBytes = 0
      }
    }
    cpList.push(clientJarPath)

    // 6. Loader (Fabric / Quilt)
    let mainClass = versionData.mainClass || 'net.minecraft.client.main.Main'
    const loaderArgs: string[] = []

    if (config.loader === 'fabric') {
      onProgress({ instanceId: config.instanceId, stage: 'downloading', statusText: 'Установка Fabric...', progress: 72 })
      try {
        const fabricMeta = await fetchJson<any[]>(`https://meta.fabricmc.net/v2/versions/loader/${config.version}`)
        if (fabricMeta?.length) {
          const loaderVer = fabricMeta[0].loader.version
          const fabricProfile = await fetchJson<any>(
            `https://meta.fabricmc.net/v2/versions/loader/${config.version}/${loaderVer}/profile/json`
          )
          if (fabricProfile.mainClass) mainClass = fabricProfile.mainClass
          if (fabricProfile.libraries) {
            for (const fLib of fabricProfile.libraries) {
              const parts = fLib.name.split(':')
              const domain = parts[0].replace(/\./g, '/')
              const name = parts[1]
              const ver = parts[2]
              const relPath = `${domain}/${name}/${ver}/${name}-${ver}.jar`
              if (!isSafeRelPath(relPath)) continue
              const fLibPath = path.join(librariesDir, relPath)
              const url = fLib.url ? `${fLib.url}${relPath}` : `https://maven.fabricmc.net/${relPath}`
              if (!fs.existsSync(fLibPath)) {
                try { await downloadFile(url, fLibPath) } catch {}
              }
              if (fs.existsSync(fLibPath)) cpList.unshift(fLibPath)
            }
          }
        }
      } catch (err: any) {
        throw new Error(`Ошибка загрузки Fabric: ${err.message}`)
      }
    }

    if (config.loader === 'quilt') {
      onProgress({ instanceId: config.instanceId, stage: 'downloading', statusText: 'Установка Quilt...', progress: 72 })
      try {
        const quiltMeta = await fetchJson<any[]>(`https://meta.quiltmc.org/v3/versions/loader/${config.version}`)
        if (quiltMeta?.length) {
          const loaderVer = quiltMeta[0].loader.version
          const quiltProfile = await fetchJson<any>(
            `https://meta.quiltmc.org/v3/versions/loader/${config.version}/${loaderVer}/profile/json`
          )
          if (quiltProfile.mainClass) mainClass = quiltProfile.mainClass
          if (quiltProfile.libraries) {
            for (const qLib of quiltProfile.libraries) {
              const parts = qLib.name.split(':')
              const domain = parts[0].replace(/\./g, '/')
              const name = parts[1]
              const ver = parts[2]
              const relPath = `${domain}/${name}/${ver}/${name}-${ver}.jar`
              if (!isSafeRelPath(relPath)) continue
              const qLibPath = path.join(librariesDir, relPath)
              const url = qLib.url ? `${qLib.url}${relPath}` : `https://maven.quiltmc.org/repository/release/${relPath}`
              if (!fs.existsSync(qLibPath)) {
                try { await downloadFile(url, qLibPath) } catch {}
              }
              if (fs.existsSync(qLibPath)) cpList.unshift(qLibPath)
            }
          }
        }
      } catch (err: any) {
        throw new Error(`Ошибка загрузки Quilt: ${err.message}`)
      }
    }

    // 7. Build JVM args
    onProgress({ instanceId: config.instanceId, stage: 'launching', statusText: 'Запуск игры...', progress: 92 })

    const classpath = cpList.join(path.delimiter)
    const args: string[] = []

    args.push(`-Xms${config.memoryMin || 1024}M`)
    args.push(`-Xmx${config.memoryMax || 4096}M`)
    if (!config.customJvmArgs?.includes('-Djava.library.path')) {
      args.push(`-Djava.library.path=${nativesDir}`)
    }

    args.push(
      '-XX:+UseG1GC',
      '-XX:+UnlockExperimentalVMOptions',
      '-XX:G1NewSizePercent=20',
      '-XX:G1ReservePercent=20',
      '-XX:MaxGCPauseMillis=50',
      '-XX:G1HeapRegionSize=32M'
    )

    if (config.customJvmArgs) {
      args.push(...config.customJvmArgs.split(' ').filter(Boolean))
    }

    loaderArgs.push('-cp', classpath, mainClass)
    args.push(...loaderArgs)

    // 8. Game args
    const userUuid = (config.uuid || generateOfflineUUID(config.username || 'Player')).replace(/-/g, '')

    if (versionData.minecraftArguments && typeof versionData.minecraftArguments === 'string') {
      for (const tArg of versionData.minecraftArguments.split(' ')) {
        args.push(
          tArg
            .replace('${auth_player_name}', config.username || 'Player')
            .replace('${version_name}', `${config.version}-${config.loader}`)
            .replace('${game_directory}', instanceDir)
            .replace('${assets_root}', assetsDir)
            .replace('${assets_index_name}', versionData.assetIndex?.id || config.version)
            .replace('${auth_uuid}', userUuid)
            .replace('${auth_access_token}', '0')
            .replace('${user_type}', 'mojang')
            .replace('${version_type}', config.loader === 'vanilla' ? 'release' : 'release/mod')
        )
      }
    } else {
      args.push(
        '--username', config.username || 'Player',
        '--version', `${config.version}-${config.loader}`,
        '--gameDir', instanceDir,
        '--assetsDir', assetsDir,
        '--assetIndex', versionData.assetIndex?.id || config.version,
        '--uuid', userUuid,
        '--accessToken', '0',
        '--userType', 'mojang',
        '--versionType', 'release'
      )
    }

    if (config.fullscreen && !args.includes('--fullscreen')) args.push('--fullscreen')

    if (config.customGameArgs) {
      args.push(...config.customGameArgs.split(' ').filter(Boolean))
    }

    onLog({ timestamp: Date.now(), type: 'info', message: `Запуск: "${javaBin}" ${args.slice(0, 8).join(' ')} ... [обрезано]` })

    const child: any = spawn(javaBin || 'javaw', args, {
      cwd: instanceDir,
      detached: !config.hideLauncher
    })

    activeProcesses.set(config.instanceId, child)

    child.stdout.on('data', (data: any) => {
      for (const line of data.toString().split('\n')) {
        if (line.trim()) {
          pushLogLine(line)
          onLog({ timestamp: Date.now(), type: 'info', message: line })
        }
      }
    })

    child.stderr.on('data', (data: any) => {
      for (const line of data.toString().split('\n')) {
        if (line.trim()) {
          pushLogLine(line)
          onLog({ timestamp: Date.now(), type: 'warn', message: line })
        }
      }
    })

    child.on('error', (err: any) => {
      activeProcesses.delete(config.instanceId)
      onProgress({
        instanceId: config.instanceId,
        stage: 'error',
        statusText: `Ошибка запуска: ${err.message}`,
        progress: 0,
        error: err.message
      })
      onLog({ timestamp: Date.now(), type: 'error', message: `Ошибка запуска: ${err.message}` })
    })

    child.on('exit', (code: any) => {
      activeProcesses.delete(config.instanceId)
      if (code === 0) {
        logRingBuffer = []
        onProgress({ instanceId: config.instanceId, stage: 'idle', statusText: '', progress: 0 })
        onLog({ timestamp: Date.now(), type: 'info', message: 'Minecraft завершён.' })
      } else {
        const hint = buildCrashHint(logRingBuffer)
        logRingBuffer = []
        onProgress({
          instanceId: config.instanceId,
          stage: 'error',
          statusText: `Игра завершилась с ошибкой (код ${code}). ${hint}`,
          progress: 0,
          error: `exit ${code}`
        })
        onLog({ timestamp: Date.now(), type: 'error', message: `Minecraft завершился с кодом ${code}. ${hint}` })
      }
    })

    onProgress({ instanceId: config.instanceId, stage: 'running', statusText: 'Игра запущена!', progress: 100 })

  } catch (error: any) {
    onProgress({
      instanceId: config.instanceId,
      stage: 'error',
      statusText: `Ошибка: ${error.message}`,
      progress: 0,
      error: error.message
    })
    onLog({ timestamp: Date.now(), type: 'error', message: `Ошибка запуска: ${error.message}` })
  }
}

export function stopInstance(instanceId: string): boolean {
  const proc = activeProcesses.get(instanceId)
  if (proc) {
    try {
      process.kill(-proc.pid, 'SIGTERM')
    } catch {
      proc.kill()
    }
    activeProcesses.delete(instanceId)
    return true
  }
  return false
}
