import fs from 'node:fs'
import path from 'node:path'
import crypto from 'node:crypto'
import https from 'node:https'
import http from 'node:http'
import { spawn, execSync } from 'node:child_process'
import { app } from 'electron'

export interface VersionManifest {
  latest: {
    release: string
    snapshot: string
  }
  versions: Array<{
    id: string
    type: string
    url: string
    time: string
    releaseTime: string
  }>
}

export interface LaunchConfig {
  instanceId: string
  instanceName: string
  version: string
  loader: 'vanilla' | 'fabric' | 'forge' | 'quilt'
  username: string
  uuid: string
  memoryMin: number
  memoryMax: number
  javaPath?: string;
  customJvmArgs?: string
}

export interface ProgressCallback {
  (data: {
    instanceId: string
    stage: 'idle' | 'checking' | 'downloading' | 'extracting' | 'launching' | 'running' | 'error'
    statusText: string
    progress: number
    downloadedFiles?: number
    totalFiles?: number
    error?: string
  }): void
}

export interface LogCallback {
  (log: { timestamp: number; type: 'info' | 'warn' | 'error'; message: string }): void
}

const activeProcesses = new Map<string, any>()

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
    client.get(url, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return fetchJson<T>(res.headers.location).then(resolve).catch(reject)
      }
      if (res.statusCode !== 200) {
        return reject(new Error(`HTTP ${res.statusCode} loading ${url}`))
      }
      let rawData = ''
      res.on('data', (chunk) => { rawData += chunk })
      res.on('end', () => {
        try {
          resolve(JSON.parse(rawData))
        } catch (e) {
          reject(e)
        }
      })
    }).on('error', reject)
  })
}

function downloadFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(destPath)
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true })
    }
    const file = fs.createWriteStream(destPath)
    const client = url.startsWith('https') ? https : http

    const request = client.get(url, (response) => {
      if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close()
        return downloadFile(response.headers.location, destPath).then(resolve).catch(reject)
      }
      if (response.statusCode !== 200) {
        file.close()
        fs.unlink(destPath, () => {})
        return reject(new Error(`Failed to download ${url}: HTTP ${response.statusCode}`))
      }
      response.pipe(file)
      file.on('finish', () => {
        file.close(() => resolve())
      })
    })

    request.on('error', (err) => {
      file.close()
      fs.unlink(destPath, () => {})
      reject(err)
    })
  })
}

function isLibraryAllowed(rules?: Array<{ action: string; os?: { name: string } }>): boolean {
  if (!rules || rules.length === 0) return true
  let allowed = false
  for (const r of rules) {
    if (r.action === 'allow') {
      if (!r.os || r.os.name === 'windows') allowed = true
    } else if (r.action === 'disallow') {
      if (!r.os || r.os.name === 'windows') allowed = false
    }
  }
  return allowed
}

export async function detectJavaPaths(): Promise<string[]> {
  const found: string[] = []
  const isWin = process.platform === 'win32'
  const javaName = isWin ? 'javaw.exe' : 'java'

  // Check downloaded Java 17 in launcher dir first
  const rootDir = getRootDir()
  const internalJava = path.join(rootDir, 'java', 'java-17')
  const findInternalJavaw = (dir: string): string | null => {
    if (!fs.existsSync(dir)) return null
    const items = fs.readdirSync(dir)
    for (const item of items) {
      const full = path.join(dir, item)
      if (item.toLowerCase() === 'javaw.exe') return full
      if (fs.statSync(full).isDirectory()) {
        const res = findInternalJavaw(full)
        if (res) return res
      }
    }
    return null
  }
  const internalJavaw = findInternalJavaw(internalJava)
  if (internalJavaw) {
    found.push(internalJavaw)
  }

  // Check JAVA_HOME
  if (process.env.JAVA_HOME) {
    const p = path.join(process.env.JAVA_HOME, 'bin', javaName)
    if (fs.existsSync(p)) found.push(p)
  }

  // Common Windows install paths
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
      if (fs.existsSync(sDir)) {
        try {
          const subdirs = fs.readdirSync(sDir)
          for (const sub of subdirs) {
            const fullPath = path.join(sDir, sub, 'bin', javaName)
            if (fs.existsSync(fullPath) && !found.includes(fullPath)) {
              found.push(fullPath)
            }
          }
        } catch {
          // ignore
        }
      }
    }
  }

  return found
}

export async function downloadJavaRuntime(
  onProgress: ProgressCallback,
  onLog: LogCallback
): Promise<string> {
  const rootDir = getRootDir()
  const javaDir = path.join(rootDir, 'java', 'java-17')

  const findJavaw = (dir: string): string | null => {
    if (!fs.existsSync(dir)) return null
    const items = fs.readdirSync(dir)
    for (const item of items) {
      const full = path.join(dir, item)
      if (item.toLowerCase() === 'javaw.exe') return full
      if (fs.statSync(full).isDirectory()) {
        const res = findJavaw(full)
        if (res) return res
      }
    }
    return null
  }

  const existingJavaw = findJavaw(javaDir)
  if (existingJavaw) {
    return existingJavaw
  }

  onProgress({
    instanceId: 'java-auto',
    stage: 'downloading',
    statusText: 'Авто-скачивание OpenJDK Java 17...',
    progress: 15
  })
  onLog({ timestamp: Date.now(), type: 'info', message: 'Java не найдена на ПК. Автоматическое скачивание OpenJDK Java 17 (Temurin)...' })

  const zipUrl = 'https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jre_x64_windows_hotspot_17.0.10_7.zip'
  const zipPath = path.join(rootDir, 'java', 'java-17.zip')

  if (!fs.existsSync(path.dirname(zipPath))) {
    fs.mkdirSync(path.dirname(zipPath), { recursive: true })
  }

  onProgress({
    instanceId: 'java-auto',
    stage: 'downloading',
    statusText: 'Загрузка OpenJDK Java 17 (40 MB)...',
    progress: 35
  })

  await downloadFile(zipUrl, zipPath)

  onProgress({
    instanceId: 'java-auto',
    stage: 'extracting',
    statusText: 'Распаковка Java 17 Runtime...',
    progress: 75
  })
  onLog({ timestamp: Date.now(), type: 'info', message: 'Распаковка архива Java 17...' })

  if (!fs.existsSync(javaDir)) {
    fs.mkdirSync(javaDir, { recursive: true })
  }

  try {
    execSync(`powershell -Command "Expand-Archive -Path '${zipPath}' -DestinationPath '${javaDir}' -Force"`)
    fs.unlinkSync(zipPath)
  } catch (e: any) {
    onLog({ timestamp: Date.now(), type: 'warn', message: `Ошибка PowerShell распаковки: ${e.message}` })
  }

  const finalJavaw = findJavaw(javaDir)
  if (!finalJavaw) {
    throw new Error('Не удалось найти javaw.exe после распаковки Java 17. Установите Java вручную.')
  }

  onLog({ timestamp: Date.now(), type: 'info', message: `Java 17 успешно установлена: ${finalJavaw}` })
  return finalJavaw
}

export async function getMinecraftVersions(): Promise<VersionManifest> {
  const url = 'https://launchermeta.mojang.com/mc/game/version_manifest_v2.json'
  return await fetchJson<VersionManifest>(url)
}

export async function launchMinecraft(
  config: LaunchConfig,
  onProgress: ProgressCallback,
  onLog: LogCallback
): Promise<void> {
  const rootDir = getRootDir()
  const instanceDir = path.join(rootDir, 'instances', config.instanceId)
  const assetsDir = path.join(rootDir, 'assets')
  const librariesDir = path.join(rootDir, 'libraries')
  const versionsDir = path.join(rootDir, 'versions')
  const nativesDir = path.join(instanceDir, 'natives')

  if (!fs.existsSync(instanceDir)) fs.mkdirSync(instanceDir, { recursive: true })
  if (!fs.existsSync(nativesDir)) fs.mkdirSync(nativesDir, { recursive: true })

  try {
    // 1. Resolve Java Runtime
    let javaBin = config.javaPath
    let isJavaValid = false

    if (javaBin && fs.existsSync(javaBin)) {
      try {
        execSync(`"${javaBin}" -version 2>&1`)
        isJavaValid = true
      } catch {}
    }

    if (!isJavaValid) {
      const detected = await detectJavaPaths()
      for (const d of detected) {
        if (fs.existsSync(d)) {
          try {
            execSync(`"${d}" -version 2>&1`)
            javaBin = d
            isJavaValid = true
            break
          } catch {}
        }
      }
    }

    if (!isJavaValid) {
      javaBin = await downloadJavaRuntime(onProgress, onLog)
    }

    onLog({
      timestamp: Date.now(),
      type: 'info',
      message: `Используемый файл Java: ${javaBin}`
    })

    // 2. Fetch Version Manifest
    onProgress({
      instanceId: config.instanceId,
      stage: 'checking',
      statusText: 'Получение манифеста версий...',
      progress: 10
    })

    const manifest = await getMinecraftVersions()
    const verInfo = manifest.versions.find((v) => v.id === config.version)
    if (!verInfo) {
      throw new Error(`Версия Minecraft ${config.version} не найдена в манифесте`)
    }

    onProgress({
      instanceId: config.instanceId,
      stage: 'downloading',
      statusText: `Загрузка структуры версии ${config.version}...`,
      progress: 20
    })

    const versionJsonPath = path.join(versionsDir, config.version, `${config.version}.json`)
    const versionData = await fetchJson<any>(verInfo.url)
    if (!fs.existsSync(path.dirname(versionJsonPath))) {
      fs.mkdirSync(path.dirname(versionJsonPath), { recursive: true })
    }
    fs.writeFileSync(versionJsonPath, JSON.stringify(versionData, null, 2))

    // Download Asset Index JSON
    if (versionData.assetIndex?.url) {
      const assetIndexDir = path.join(assetsDir, 'indexes')
      const assetIndexPath = path.join(assetIndexDir, `${versionData.assetIndex.id}.json`)
      if (!fs.existsSync(assetIndexPath)) {
        onProgress({
          instanceId: config.instanceId,
          stage: 'downloading',
          statusText: 'Загрузка ассетов игры...',
          progress: 30
        })
        await downloadFile(versionData.assetIndex.url, assetIndexPath)
      }
    }

    // Download client JAR
    const clientJarPath = path.join(versionsDir, config.version, `${config.version}.jar`)
    if (!fs.existsSync(clientJarPath) && versionData.downloads?.client?.url) {
      onProgress({
        instanceId: config.instanceId,
        stage: 'downloading',
        statusText: 'Загрузка Minecraft client.jar...',
        progress: 40
      })
      await downloadFile(versionData.downloads.client.url, clientJarPath)
    }

    // Download Libraries
    onProgress({
      instanceId: config.instanceId,
      stage: 'downloading',
      statusText: 'Загрузка библиотек...',
      progress: 55
    })

    const cpList: string[] = []
    const libraries = versionData.libraries || []

    for (const lib of libraries) {
      if (!isLibraryAllowed(lib.rules)) continue

      if (lib.downloads?.artifact) {
        const libRelPath = lib.downloads.artifact.path
        const libFullPath = path.join(librariesDir, libRelPath)
        if (!fs.existsSync(libFullPath)) {
          try {
            await downloadFile(lib.downloads.artifact.url, libFullPath)
          } catch {
            onLog({ timestamp: Date.now(), type: 'warn', message: `Пропущена библиотека: ${lib.name}` })
          }
        }
        if (fs.existsSync(libFullPath)) {
          cpList.push(libFullPath)
        }
      }
    }
    cpList.push(clientJarPath)

    // Handle Loader Profile (Fabric / Forge)
    let mainClass = versionData.mainClass || 'net.minecraft.client.main.Main'
    if (config.loader === 'fabric') {
      onProgress({
        instanceId: config.instanceId,
        stage: 'downloading',
        statusText: 'Настройка Fabric...',
        progress: 75
      })
      try {
        const fabricMeta = await fetchJson<any[]>(`https://meta.fabricmc.net/v2/versions/loader/${config.version}`)
        if (fabricMeta && fabricMeta.length > 0) {
          const loaderVer = fabricMeta[0].loader.version
          const fabricProfile = await fetchJson<any>(`https://meta.fabricmc.net/v2/versions/loader/${config.version}/${loaderVer}/profile/json`)
          if (fabricProfile.mainClass) {
            mainClass = fabricProfile.mainClass
          }
          if (fabricProfile.libraries) {
            for (const fLib of fabricProfile.libraries) {
              const parts = fLib.name.split(':')
              const domain = parts[0].replace(/\./g, '/')
              const name = parts[1]
              const ver = parts[2]
              const relPath = `${domain}/${name}/${ver}/${name}-${ver}.jar`
              const fLibPath = path.join(librariesDir, relPath)
              const url = fLib.url ? `${fLib.url}${relPath}` : `https://maven.fabricmc.net/${relPath}`
              if (!fs.existsSync(fLibPath)) {
                try {
                  await downloadFile(url, fLibPath)
                } catch {
                  // ignore
                }
              }
              if (fs.existsSync(fLibPath)) {
                cpList.unshift(fLibPath)
              }
            }
          }
        }
      } catch (err: any) {
        onLog({ timestamp: Date.now(), type: 'warn', message: `Не удалось загрузить Fabric метаданные: ${err.message}` })
      }
    }

    onProgress({
      instanceId: config.instanceId,
      stage: 'launching',
      statusText: 'Запуск Minecraft...',
      progress: 90
    })

    const classpath = cpList.join(path.delimiter)
    const args: string[] = []

    // Memory & Flags
    args.push(`-Xms${config.memoryMin || 1024}M`)
    args.push(`-Xmx${config.memoryMax || 4096}M`)
    args.push(`-Djava.library.path=${nativesDir}`)

    if (config.customJvmArgs) {
      args.push(...config.customJvmArgs.split(' ').filter(Boolean))
    }

    args.push('-cp', classpath)
    args.push(mainClass)

    // Minecraft Game Arguments
    args.push('--username', config.username || 'Player')
    args.push('--version', config.version)
    args.push('--gameDir', instanceDir)
    args.push('--assetsDir', assetsDir)
    args.push('--assetIndex', versionData.assetIndex?.id || config.version)
    args.push('--uuid', config.uuid || generateOfflineUUID(config.username || 'Player'))
    args.push('--accessToken', '0')
    args.push('--userType', 'legacy')

    onLog({
      timestamp: Date.now(),
      type: 'info',
      message: `Команда запуска: "${javaBin}" ${args.join(' ')}`
    })

    const child: any = spawn(javaBin || 'javaw', args, {
      cwd: instanceDir,
      detached: true
    })

    activeProcesses.set(config.instanceId, child)

    child.stdout.on('data', (data: any) => {
      onLog({ timestamp: Date.now(), type: 'info', message: data.toString() })
    })

    child.stderr.on('data', (data: any) => {
      onLog({ timestamp: Date.now(), type: 'warn', message: data.toString() })
    })

    child.on('error', (err: any) => {
      activeProcesses.delete(config.instanceId)
      onProgress({
        instanceId: config.instanceId,
        stage: 'error',
        statusText: `Ошибка процесса: ${err.message}`,
        progress: 0,
        error: err.message
      })
      onLog({ timestamp: Date.now(), type: 'error', message: `Ошибка запуска: ${err.message}` })
    })

    child.on('exit', (code: any) => {
      activeProcesses.delete(config.instanceId)
      onProgress({
        instanceId: config.instanceId,
        stage: 'idle',
        statusText: `Игра завершена (код ${code})`,
        progress: 0
      })
      onLog({ timestamp: Date.now(), type: 'info', message: `Minecraft завершился с кодом ${code}` })
    })

    onProgress({
      instanceId: config.instanceId,
      stage: 'running',
      statusText: 'Игра запущена!',
      progress: 100
    })

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
    proc.kill()
    activeProcesses.delete(instanceId)
    return true
  }
  return false
}
