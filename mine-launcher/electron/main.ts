import { app, BrowserWindow, ipcMain, shell, dialog, Menu } from 'electron'

// Remove default Electron application menu bar
Menu.setApplicationMenu(null)

import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import https from 'node:https'
import http from 'node:http'
import {
  getRootDir,
  getMinecraftVersions,
  detectJavaPaths,
  launchMinecraft,
  stopInstance,
  generateOfflineUUID
} from './launcherEngine'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null = null

// Data persistence paths
const rootDir = getRootDir()
const accountsFile = path.join(rootDir, 'accounts.json')
const instancesFile = path.join(rootDir, 'instances.json')
const settingsFile = path.join(rootDir, 'settings.json')
const skinsDir = path.join(rootDir, 'skins')

if (!fs.existsSync(skinsDir)) {
  fs.mkdirSync(skinsDir, { recursive: true })
}

// Helper data accessors
function loadJsonData<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) {
      return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
    }
  } catch (e) {
    console.error(`Failed loading ${filePath}:`, e)
  }
  return fallback
}

function saveJsonData<T>(filePath: string, data: T) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
  } catch (e) {
    console.error(`Failed saving ${filePath}:`, e)
  }
}

// Initial default data if none exists
let accounts = loadJsonData(accountsFile, [
  { id: '1', username: 'Test', uuid: generateOfflineUUID('Test'), type: 'offline', isActive: true, createdAt: Date.now() - 50000 },
  { id: '2', username: 'Nick 2', uuid: generateOfflineUUID('Nick 2'), type: 'offline', isActive: false, createdAt: Date.now() - 40000 },
  { id: '3', username: 'Nick 3', uuid: generateOfflineUUID('Nick 3'), type: 'offline', isActive: false, createdAt: Date.now() - 30000 }
])

let instances = loadJsonData(instancesFile, [
  {
    id: 'default-1',
    name: '1.20.4',
    version: '1.20.4',
    loader: 'vanilla',
    created: Date.now() - 100000,
    lastPlayed: Date.now() - 50000,
    memoryMin: 1024,
    memoryMax: 4096
  },
  {
    id: 'fabric-1',
    name: '1.20.1',
    version: '1.20.1',
    loader: 'fabric',
    created: Date.now() - 80000,
    memoryMin: 2048,
    memoryMax: 4096
  }
])

let settings: {
  javaPath: string
  memoryMin: number
  memoryMax: number
  customJvmArgs: string
  closeLauncherOnGameStart: boolean
  gameDir: string
  useProxy?: boolean
  proxyType?: string
  proxyHost?: string
  proxyPort?: number
  launcherFont?: string
} = loadJsonData(settingsFile, {
  javaPath: '',
  memoryMin: 1024,
  memoryMax: 4096,
  customJvmArgs: '',
  closeLauncherOnGameStart: false,
  gameDir: rootDir,
  useProxy: false,
  proxyType: 'http',
  proxyHost: '',
  proxyPort: 8080,
  launcherFont: 'system-ui'
})

function createWindow() {
  win = new BrowserWindow({
    width: 1050,
    height: 720,
    minWidth: 900,
    minHeight: 650,
    frame: false,
    titleBarStyle: 'hidden',
    icon: path.join(process.env.VITE_PUBLIC, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true
    },
  })

  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
}

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Helper to download a URL to a file path
function downloadUrlToFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(destPath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    const file = fs.createWriteStream(destPath)
    const client = url.startsWith('https') ? https : http

    const request = client.get(url, (response) => {
      if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close()
        return downloadUrlToFile(response.headers.location, destPath).then(resolve).catch(reject)
      }
      if (response.statusCode !== 200) {
        file.close()
        fs.unlink(destPath, () => {})
        return reject(new Error(`Failed download ${url}: HTTP ${response.statusCode}`))
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

// Setup IPC Listeners
function setupIpcHandlers() {
  // Window Controls
  ipcMain.handle('minimize-window', () => {
    win?.minimize()
  })

  ipcMain.handle('maximize-window', () => {
    if (!win) return false
    if (win.isMaximized()) {
      win.unmaximize()
      return false
    } else {
      win.maximize()
      return true
    }
  })

  ipcMain.handle('close-window', () => {
    win?.close()
  })

  ipcMain.handle('is-maximized', () => {
    return win?.isMaximized() || false
  })

  // Accounts
  ipcMain.handle('get-accounts', () => accounts)

  ipcMain.handle('add-account', (_, username: string) => {
    const trimmed = username.trim()
    if (!trimmed) throw new Error('Имя пользователя не может быть пустым')

    // Prevent duplicate nicknames (case-insensitive check)
    const isDuplicate = accounts.some(a => a.username.toLowerCase() === trimmed.toLowerCase())
    if (isDuplicate) {
      throw new Error(`Никнейм "${trimmed}" уже существует!`)
    }

    const newAcc = {
      id: Date.now().toString(),
      username: trimmed,
      uuid: generateOfflineUUID(trimmed),
      type: 'offline' as const,
      isActive: accounts.length === 0,
      createdAt: Date.now()
    }
    accounts.push(newAcc)
    saveJsonData(accountsFile, accounts)
    return accounts
  })

  ipcMain.handle('set-active-account', (_, accountId: string) => {
    accounts = accounts.map(acc => ({
      ...acc,
      isActive: acc.id === accountId
    }))
    saveJsonData(accountsFile, accounts)
    return accounts
  })

  ipcMain.handle('delete-account', (_, accountId: string) => {
    accounts = accounts.filter(acc => acc.id !== accountId)
    if (accounts.length > 0 && !accounts.some(acc => acc.isActive)) {
      accounts[0].isActive = true
    }
    saveJsonData(accountsFile, accounts)
    return accounts
  })

  // Instances
  ipcMain.handle('get-instances', () => instances)

  ipcMain.handle('create-instance', (_, data: { name: string; version: string; loader: 'vanilla' | 'fabric' | 'forge' | 'quilt' }) => {
    const newInst = {
      id: 'inst-' + Date.now(),
      name: data.version,
      version: data.version,
      loader: data.loader || 'vanilla',
      created: Date.now(),
      memoryMin: settings.memoryMin,
      memoryMax: settings.memoryMax
    }
    instances.push(newInst)
    saveJsonData(instancesFile, instances)

    const instDir = path.join(rootDir, 'instances', newInst.id)
    const modsDir = path.join(instDir, 'mods')
    if (!fs.existsSync(modsDir)) {
      fs.mkdirSync(modsDir, { recursive: true })
    }

    return instances
  })

  ipcMain.handle('delete-instance', (_, instanceId: string) => {
    instances = instances.filter(i => i.id !== instanceId)
    saveJsonData(instancesFile, instances)
    const instDir = path.join(rootDir, 'instances', instanceId)
    if (fs.existsSync(instDir)) {
      fs.rmSync(instDir, { recursive: true, force: true })
    }
    return instances
  })

  // Versions
  ipcMain.handle('get-versions', async () => {
    try {
      return await getMinecraftVersions()
    } catch (e: any) {
      console.error('Failed to get versions:', e)
      return { latest: { release: '1.20.4', snapshot: '1.20.4' }, versions: [] }
    }
  })

  // Settings & Java
  ipcMain.handle('get-settings', () => settings)

  ipcMain.handle('save-settings', (_, newSettings: any) => {
    settings = { ...settings, ...newSettings }
    saveJsonData(settingsFile, settings)
    return settings
  })

  ipcMain.handle('detect-java', async () => {
    return await detectJavaPaths()
  })

  // Launching
  ipcMain.handle('launch-instance', async (_, instanceId: string) => {
    const inst: any = instances.find((i: any) => i.id === instanceId)
    if (!inst) throw new Error('Инстанс не найден')

    const activeAcc = accounts.find(a => a.isActive) || accounts[0]
    if (!activeAcc) throw new Error('Добавьте хотя бы один аккаунт!')

    inst.lastPlayed = Date.now()
    saveJsonData(instancesFile, instances)

    const javaPathToUse = inst.javaPath || settings.javaPath || (await detectJavaPaths())[0]

    let customArgsCombined = inst.jvmArgs || settings.customJvmArgs || ''
    if (settings.useProxy && settings.proxyHost && settings.proxyPort) {
      if (settings.proxyType === 'socks5') {
        customArgsCombined += ` -DsocksProxyHost=${settings.proxyHost} -DsocksProxyPort=${settings.proxyPort}`
      } else {
        customArgsCombined += ` -Dhttp.proxyHost=${settings.proxyHost} -Dhttp.proxyPort=${settings.proxyPort} -Dhttps.proxyHost=${settings.proxyHost} -Dhttps.proxyPort=${settings.proxyPort}`
      }
    }

    launchMinecraft(
      {
        instanceId: inst.id,
        instanceName: inst.name,
        version: inst.version,
        loader: (inst.loader || 'vanilla') as 'vanilla' | 'fabric' | 'forge' | 'quilt',
        username: activeAcc.username,
        uuid: activeAcc.uuid,
        memoryMin: inst.memoryMin || settings.memoryMin || 1024,
        memoryMax: inst.memoryMax || settings.memoryMax || 4096,
        javaPath: javaPathToUse,
        customJvmArgs: customArgsCombined.trim()
      },
      (progressData) => {
        win?.webContents.send('launch-progress', progressData)
      },
      (logData) => {
        win?.webContents.send('game-log', logData)
      }
    )
    return true
  })

  ipcMain.handle('stop-instance', (_, instanceId: string) => {
    return stopInstance(instanceId)
  })

  // Mods
  ipcMain.handle('open-instance-folder', (_, instanceId: string) => {
    const instDir = path.join(rootDir, 'instances', instanceId)
    if (!fs.existsSync(instDir)) fs.mkdirSync(instDir, { recursive: true })
    shell.openPath(instDir)
  })

  ipcMain.handle('get-instance-mods', (_, instanceId: string) => {
    const modsDir = path.join(rootDir, 'instances', instanceId, 'mods')
    if (!fs.existsSync(modsDir)) return []

    try {
      const files = fs.readdirSync(modsDir)
      return files.map(file => {
        const fullPath = path.join(modsDir, file)
        const stat = fs.statSync(fullPath)
        const isEnabled = file.endsWith('.jar')
        const name = file.replace(/\.jar(\.disabled)?$/, '')
        return {
          id: file,
          filename: file,
          name,
          enabled: isEnabled,
          size: stat.size
        }
      })
    } catch {
      return []
    }
  })

  ipcMain.handle('toggle-mod', (_, { instanceId, modFilename }: { instanceId: string; modFilename: string }) => {
    const modsDir = path.join(rootDir, 'instances', instanceId, 'mods')
    const oldPath = path.join(modsDir, modFilename)
    if (!fs.existsSync(oldPath)) return false

    let newFilename = modFilename
    if (modFilename.endsWith('.jar')) {
      newFilename = modFilename + '.disabled'
    } else if (modFilename.endsWith('.jar.disabled')) {
      newFilename = modFilename.replace(/\.disabled$/, '')
    }
    const newPath = path.join(modsDir, newFilename)
    fs.renameSync(oldPath, newPath)
    return true
  })

  ipcMain.handle('download-mod-file', async (_, { instanceId, downloadUrl, filename }: { instanceId: string; downloadUrl: string; filename: string }) => {
    const modsDir = path.join(rootDir, 'instances', instanceId, 'mods')
    if (!fs.existsSync(modsDir)) fs.mkdirSync(modsDir, { recursive: true })
    const destPath = path.join(modsDir, filename)
    await downloadUrlToFile(downloadUrl, destPath)
    return true
  })

  ipcMain.handle('add-mod-file', async (_, instanceId: string) => {
    if (!win) return false
    const res = await dialog.showOpenDialog(win, {
      title: 'Выберите файл мода (.jar)',
      filters: [{ name: 'Minecraft Mods', extensions: ['jar'] }],
      properties: ['openFile', 'multiSelections']
    })
    if (res.canceled || !res.filePaths.length) return false

    const modsDir = path.join(rootDir, 'instances', instanceId, 'mods')
    if (!fs.existsSync(modsDir)) fs.mkdirSync(modsDir, { recursive: true })

    for (const file of res.filePaths) {
      const dest = path.join(modsDir, path.basename(file))
      fs.copyFileSync(file, dest)
    }
    return true
  })

  // Skins
  ipcMain.handle('save-user-skin', async (_, username: string) => {
    if (!win) return false
    const res = await dialog.showOpenDialog(win, {
      title: 'Выберите файл скина Minecraft (.png)',
      filters: [{ name: 'Minecraft Skins', extensions: ['png'] }],
      properties: ['openFile']
    })
    if (res.canceled || !res.filePaths.length) return false

    const skinDest = path.join(skinsDir, `${username}.png`)
    fs.copyFileSync(res.filePaths[0], skinDest)
    return skinDest
  })

  ipcMain.handle('fetch-online-skin', async (_, { username, targetUsername }: { username: string; targetUsername: string }) => {
    const skinDest = path.join(skinsDir, `${username}.png`)
    const urls = [
      `https://ely.by/services/skins-buffer/skins/${encodeURIComponent(targetUsername)}.png`,
      `https://minotar.net/skin/${encodeURIComponent(targetUsername)}`,
      `https://crafatar.com/skins/${generateOfflineUUID(targetUsername)}`
    ]

    for (const u of urls) {
      try {
        await downloadUrlToFile(u, skinDest)
        if (fs.existsSync(skinDest) && fs.statSync(skinDest).size > 100) {
          const data = fs.readFileSync(skinDest)
          return `data:image/png;base64,${data.toString('base64')}`
        }
      } catch {}
    }
    throw new Error(`Скин для никнейма "${targetUsername}" не найден на серверах`)
  })

  // Profile & Statistics
  ipcMain.handle('get-profile-stats', (_, username: string) => {
    let worldsCount = 0
    const worldNames: string[] = []
    let favoriteWorld = 'Нет информации'
    let favoriteServer = 'Нет информации'
    let totalPlayMinutes = 0
    let lastPlayedTime = 0

    try {
      for (const inst of instances) {
        if ((inst as any).lastPlayed) {
          lastPlayedTime = Math.max(lastPlayedTime, (inst as any).lastPlayed)
          totalPlayMinutes += 45
        }
        const savesDir = path.join(rootDir, 'instances', (inst as any).id, 'saves')
        if (fs.existsSync(savesDir)) {
          const saves = fs.readdirSync(savesDir)
          for (const s of saves) {
            if (fs.statSync(path.join(savesDir, s)).isDirectory()) {
              worldsCount++
              worldNames.push(s)
            }
          }
        }
      }
      if (worldNames.length > 0) {
        favoriteWorld = worldNames[0]
      }
    } catch {}

    const activeAcc = accounts.find(a => a.username === username) || accounts.find(a => a.isActive) || accounts[0]
    const hours = (totalPlayMinutes / 60).toFixed(1)
    const lastPlayedFormatted = lastPlayedTime ? new Date(lastPlayedTime).toLocaleString() : 'Нет информации'

    return {
      username: activeAcc ? activeAcc.username : username,
      uuid: activeAcc ? activeAcc.uuid : '',
      worldsCount,
      totalPlayTimeHours: totalPlayMinutes > 0 ? `${hours} ч.` : 'Нет информации',
      lastPlayedFormatted,
      favoriteWorld,
      favoriteServer
    }
  })

  ipcMain.handle('get-user-skin', (_, username: string) => {
    const skinPath = path.join(skinsDir, `${username}.png`)
    if (fs.existsSync(skinPath)) {
      const data = fs.readFileSync(skinPath)
      return `data:image/png;base64,${data.toString('base64')}`
    }
    return null
  })
}

app.whenReady().then(() => {
  setupIpcHandlers()
  createWindow()
})
