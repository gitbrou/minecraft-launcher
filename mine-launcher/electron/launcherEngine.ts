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
  customJvmArgs?: string;
  customGameArgs?: string;
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

function extractNativeDlls(jarPath: string, destDir: string) {
  if (!fs.existsSync(jarPath)) return
  try {
    const command = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::OpenRead('${jarPath.replace(/'/g, "''")}').Entries | Where-Object { $_.FullName -like '*.dll' } | ForEach-Object { $dest = [System.IO.Path]::Combine('${destDir.replace(/'/g, "''")}', $_.Name); [System.IO.Compression.ZipFileExtensions]::ExtractToFile($_, $dest, $true) }"`
    execSync(command, { stdio: 'ignore' })
  } catch {
    try {
      execSync(`powershell -Command "Expand-Archive -Path '${jarPath}' -DestinationPath '${destDir}' -Force"`, { stdio: 'ignore' })
    } catch {}
  }
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

  // Force options.txt to unlock Multiplayer and Chat in 1.16.5 and all versions
  const optionsPath = path.join(instanceDir, 'options.txt')
  const optionsContent = `version:2586\nchatVisibility:0\nforceUnicodeFont:false\nrealmsNotifications:false\nhideServerAddress:false\n`
  fs.writeFileSync(optionsPath, optionsContent, 'utf-8')

  // Clean up any stale Fabric .tmp files
  const fabricDir = path.join(instanceDir, '.fabric')
  if (fs.existsSync(fabricDir)) {
    try {
      const removeTmpFiles = (dirPath: string) => {
        const entries = fs.readdirSync(dirPath)
        for (const entry of entries) {
          const full = path.join(dirPath, entry)
          if (fs.statSync(full).isDirectory()) {
            removeTmpFiles(full)
          } else if (entry.endsWith('.tmp')) {
            fs.unlinkSync(full)
          }
        }
      }
      removeTmpFiles(fabricDir)
    } catch {
      // ignore
    }
  }

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
      throw new Error(`Версия Minecraft ${config.version} не найдена в манифесте Mojang`)
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

    // Download Asset Index JSON & Asset Objects
    if (versionData.assetIndex?.url) {
      const assetIndexDir = path.join(assetsDir, 'indexes')
      const assetIndexPath = path.join(assetIndexDir, `${versionData.assetIndex.id}.json`)
      if (!fs.existsSync(assetIndexPath)) {
        onProgress({
          instanceId: config.instanceId,
          stage: 'downloading',
          statusText: 'Загрузка манифеста ресурсов...',
          progress: 25
        })
        await downloadFile(versionData.assetIndex.url, assetIndexPath)
      }

      try {
        const indexContent = JSON.parse(fs.readFileSync(assetIndexPath, 'utf-8'))
        const objects = indexContent.objects || {}
        const objectKeys = Object.keys(objects)
        const objectsDir = path.join(assetsDir, 'objects')

        const missingObjects: Array<{ hash: string; url: string; dest: string }> = []

        for (const key of objectKeys) {
          const obj = objects[key]
          const hash = obj.hash
          const prefix = hash.slice(0, 2)
          const dest = path.join(objectsDir, prefix, hash)
          if (!fs.existsSync(dest)) {
            missingObjects.push({
              hash,
              url: `https://resources.download.minecraft.net/${prefix}/${hash}`,
              dest
            })
          }
        }

        if (missingObjects.length > 0) {
          onProgress({
            instanceId: config.instanceId,
            stage: 'downloading',
            statusText: `Загрузка ресурсов (${missingObjects.length} файлов)...`,
            progress: 30
          })

          const batchSize = 75
          let completed = 0

          for (let i = 0; i < missingObjects.length; i += batchSize) {
            const chunk = missingObjects.slice(i, i + batchSize)
            await Promise.all(
              chunk.map(item => downloadFile(item.url, item.dest).catch(() => {}))
            )
            completed += chunk.length
            const pct = Math.round(30 + (completed / missingObjects.length) * 15)
            onProgress({
              instanceId: config.instanceId,
              stage: 'downloading',
              statusText: `Загрузка ресурсов (${completed}/${missingObjects.length})...`,
              progress: pct
            })
          }
        }
      } catch (e: any) {
        onLog({ timestamp: Date.now(), type: 'warn', message: `Ошибка ресурсов: ${e.message}` })
      }
    }

    // Download client JAR
    const clientJarPath = path.join(versionsDir, config.version, `${config.version}.jar`)
    if (!fs.existsSync(clientJarPath) && versionData.downloads?.client?.url) {
      onProgress({
        instanceId: config.instanceId,
        stage: 'downloading',
        statusText: 'Загрузка Minecraft client.jar...',
        progress: 50
      })
      await downloadFile(versionData.downloads.client.url, clientJarPath)
    }

    // Download & Extract Libraries & Native DLLs
    onProgress({
      instanceId: config.instanceId,
      stage: 'downloading',
      statusText: 'Загрузка и распаковка библиотек...',
      progress: 60
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
          } catch {}
        }
        if (fs.existsSync(libFullPath)) {
          cpList.push(libFullPath)
          if (libRelPath.includes('natives') || lib.name.includes('natives')) {
            extractNativeDlls(libFullPath, nativesDir)
          }
        }
      }

      if (lib.downloads?.classifiers) {
        const classifiers = lib.downloads.classifiers
        const winNative = classifiers['natives-windows'] || classifiers['natives-windows-64'] || classifiers['natives-windows-x86']
        if (winNative) {
          const nativeRelPath = winNative.path
          const nativeFullPath = path.join(librariesDir, nativeRelPath)
          if (!fs.existsSync(nativeFullPath)) {
            try {
              await downloadFile(winNative.url, nativeFullPath)
            } catch {}
          }
          if (fs.existsSync(nativeFullPath)) {
            extractNativeDlls(nativeFullPath, nativesDir)
          }
        }
      }

      if (!lib.downloads?.artifact && lib.name) {
        const parts = lib.name.split(':')
        const domain = parts[0].replace(/\./g, '/')
        const name = parts[1]
        const ver = parts[2]
        const relPath = `${domain}/${name}/${ver}/${name}-${ver}.jar`
        const libFullPath = path.join(librariesDir, relPath)
        const url = lib.url ? `${lib.url}${relPath}` : `https://libraries.minecraft.net/${relPath}`
        if (!fs.existsSync(libFullPath)) {
          try {
            await downloadFile(url, libFullPath)
          } catch {}
        }
        if (fs.existsSync(libFullPath)) {
          cpList.push(libFullPath)
          if (lib.name.includes('natives')) {
            extractNativeDlls(libFullPath, nativesDir)
          }
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
        onLog({ timestamp: Date.now(), type: 'warn', message: `Fabric метаданные: ${err.message}` })
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

    // Memory & JVM Flags
    args.push(`-Xms${config.memoryMin || 1024}M`)
    args.push(`-Xmx${config.memoryMax || 4096}M`)
    args.push(`-Djava.library.path=${nativesDir}`)

    // Disable SocialInteractions blocklist check to unlock Multiplayer 100%
    args.push('-Dminecraft.api.auth.host=http://127.0.0.1')
    args.push('-Dminecraft.api.account.host=http://127.0.0.1')
    args.push('-Dminecraft.api.session.host=http://127.0.0.1')
    args.push('-Dminecraft.api.services.host=http://127.0.0.1')

    // High-Performance G1GC JVM Flags
    args.push('-XX:+UseG1GC', '-XX:+UnlockExperimentalVMOptions', '-XX:G1NewSizePercent=20', '-XX:G1ReservePercent=20', '-XX:MaxGCPauseMillis=50', '-XX:G1HeapRegionSize=32M')

    if (config.customJvmArgs) {
      args.push(...config.customJvmArgs.split(' ').filter(Boolean))
    }

    args.push('-cp', classpath)
    args.push(mainClass)

    // Minecraft Game Arguments - Formatted for Offline Multiplayer Support
    const userUuid = (config.uuid || generateOfflineUUID(config.username || 'Player')).replace(/-/g, '')

    if (versionData.minecraftArguments && typeof versionData.minecraftArguments === 'string') {
      const templateArgs = versionData.minecraftArguments.split(' ')
      for (const tArg of templateArgs) {
        let resolved = tArg
          .replace('${auth_player_name}', config.username || 'Player')
          .replace('${version_name}', config.version)
          .replace('${game_directory}', instanceDir)
          .replace('${assets_root}', assetsDir)
          .replace('${assets_index_name}', versionData.assetIndex?.id || config.version)
          .replace('${auth_uuid}', userUuid)
          .replace('${auth_access_token}', '0')
          .replace('${user_type}', 'mojang')
          .replace('${version_type}', 'release')
        args.push(resolved)
      }
    } else {
      args.push('--username', config.username || 'Player')
      args.push('--version', config.version)
      args.push('--gameDir', instanceDir)
      args.push('--assetsDir', assetsDir)
      args.push('--assetIndex', versionData.assetIndex?.id || config.version)
      args.push('--uuid', userUuid)
      args.push('--accessToken', '0')
      args.push('--userType', 'mojang')
      args.push('--versionType', 'release')
    }

    // Always launch in fullscreen
    if (!args.includes('--fullscreen')) {
      args.push('--fullscreen')
    }

    if (config.customGameArgs) {
      args.push(...config.customGameArgs.split(' ').filter(Boolean))
    }

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
