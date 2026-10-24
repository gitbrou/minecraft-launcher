import { app, BrowserWindow, ipcMain, shell, dialog, Menu, Tray, nativeImage } from 'electron'
import { autoUpdater } from 'electron-updater'

Menu.setApplicationMenu(null)

import { fileURLToPath } from 'node:url'
import path from 'node:path'
import fs from 'node:fs'
import os from 'node:os'
import https from 'node:https'
import http from 'node:http'
import AdmZip from 'adm-zip'
import {
  getRootDir,
  getMinecraftVersions,
  detectJavaPaths,
  launchMinecraft,
  stopInstance,
  generateOfflineUUID,
  requiredJavaMajor
} from './launcherEngine'
import { buildInstanceMeta, validateArchiveEntries, parseExportedMeta, uniqueInstanceName, MAX_MOD_BYTES_EXPORTED } from './instancePack'
import { parseImportDeepLink, findDeepLink } from './deepLink'
import type { Account, Instance, LauncherSettings, ProfileWorld, UpdateState } from '../src/types'
import { errorMessage } from '../src/utils/errors'

// Запрещаем второй экземпляр лаунчера
if (!app.requestSingleInstanceLock()) {
  app.quit()
}

const __dirname = path.dirname(fileURLToPath(import.meta.url))

process.env.APP_ROOT = path.join(__dirname, '..')

export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

// Фиксируем имя приложения до первого getPath('userData'): иначе в упакованной
// сборке Electron берёт productName («Mine Launcher») и данные уезжают в другой каталог.
app.setName('mine-launcher')

// Схема minelauncher://import?url=... — ссылки из Discord/Telegram открывают лаунчер
try {
  if (VITE_DEV_SERVER_URL) {
    app.setAsDefaultProtocolClient('minelauncher', process.execPath, [path.resolve(process.argv[1] || '.')])
  } else {
    app.setAsDefaultProtocolClient('minelauncher')
  }
} catch {}

let win: BrowserWindow | null = null
let tray: Tray | null = null

const rootDir = getRootDir()
const accountsFile = path.join(rootDir, 'accounts.json')
const instancesFile = path.join(rootDir, 'instances.json')
const settingsFile = path.join(rootDir, 'settings.json')
const skinsDir = path.join(rootDir, 'skins')

function loadJsonData<T>(filePath: string, fallback: T): T {
  try {
    if (fs.existsSync(filePath)) return JSON.parse(fs.readFileSync(filePath, 'utf-8'))
  } catch {}
  return fallback
}

function saveJsonData<T>(filePath: string, data: T) {
  try {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8')
  } catch (e) {
    console.error(`Failed saving ${filePath}:`, e)
  }
}

// No fake demo data — user starts clean and everything is created in the UI
let accounts: Account[] = loadJsonData(accountsFile, [])
let instances: Instance[] = loadJsonData(instancesFile, [])

// Фолбэк памяти зависит от реального объёма ОЗУ машины
const totalRamMb = Math.round(os.totalmem() / 1024 / 1024)
const defaultMaxMemory = Math.max(2048, Math.min(4096, Math.floor(totalRamMb / 3)))

let settings: LauncherSettings = loadJsonData<LauncherSettings>(settingsFile, {
  javaPath: '',
  memoryMin: 1024,
  memoryMax: defaultMaxMemory,
  customJvmArgs: '',
  closeLauncherOnGameStart: false,
  fullscreen: false,
  hideLauncher: false
})

// Если memoryMax больше, чем есть ОЗУ — сбрасываем на разумный дефолт
if (!settings.memoryMax || settings.memoryMax > totalRamMb * 0.85) {
  settings.memoryMax = defaultMaxMemory
}

function createWindow() {
  win = new BrowserWindow({
    width: 1100,
    height: 740,
    minWidth: 940,
    minHeight: 660,
    frame: false,
    titleBarStyle: 'hidden',
    backgroundColor: '#111217',
    icon: path.join(process.env.VITE_PUBLIC!, 'icon.png'),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      nodeIntegration: false,
      contextIsolation: true,
      webSecurity: true
    },
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }

  win.on('closed', () => { win = null })

  win.webContents.setWindowOpenHandler(() => ({ action: 'deny' }))
  // Отдельный рендер не должен уводить окно на внешние URL
  win.webContents.on('will-navigate', (e) => e.preventDefault())
}

// Трей: показывает иконку, когда лаунчер скрыт во время игры
function ensureTray() {
  if (tray) return tray
  const iconPath = path.join(process.env.VITE_PUBLIC!, 'icon.png')
  let img = nativeImage.createFromPath(iconPath)
  if (img.isEmpty()) img = nativeImage.createEmpty()
  tray = new Tray(img)
  tray.setToolTip('Mine Launcher')
  tray.on('click', () => { win?.show() })
  const ctx = Menu.buildFromTemplate([
    { label: 'Показать лаунчер', click: () => win?.show() },
    { type: 'separator' },
    { label: 'Выход', click: () => app.quit() }
  ])
  tray.setContextMenu(ctx)
  return tray
}

function sendUpdateState(state: UpdateState) {
  try {
    win?.webContents.send('updater:state', state)
  } catch {}
}

function initAutoUpdater() {
  if (VITE_DEV_SERVER_URL) return
  if (process.platform === 'linux') return

  autoUpdater.autoDownload = true
  autoUpdater.autoInstallOnAppQuit = true
  autoUpdater.allowDowngrade = false

  autoUpdater.on('checking-for-update', () => {
    sendUpdateState({ status: 'checking' })
  })

  autoUpdater.on('update-available', (info) => {
    sendUpdateState({ status: 'available', info })
    try { autoUpdater.downloadUpdate() } catch {}
  })

  autoUpdater.on('update-not-available', (info) => {
    sendUpdateState({ status: 'not-available', info })
  })

  autoUpdater.on('download-progress', (progressObj) => {
    sendUpdateState({
      status: 'downloading',
      percent: progressObj.percent,
      transferred: progressObj.transferred,
      total: progressObj.total,
      bytesPerSecond: progressObj.bytesPerSecond
    })
  })

  autoUpdater.on('update-downloaded', (info) => {
    sendUpdateState({ status: 'downloaded', info })
  })

  autoUpdater.on('error', (err) => {
    sendUpdateState({ status: 'error', message: err?.message || 'Ошибка обновления' })
  })

  setTimeout(() => {
    autoUpdater.checkForUpdates().catch(() => {})
  }, 4000)

  setInterval(() => {
    autoUpdater.checkForUpdates().catch(() => {})
  }, 4 * 60 * 60 * 1000)
}

function hideToTray() {
  ensureTray()
  tray?.setToolTip('Mine Launcher — игра запущена')
  win?.hide()
}

// Второе приложение передаёт сюда активацию существующего окна (и deep link в argv)
app.on('second-instance', (_event, argv) => {
  if (win) {
    if (win.isMinimized()) win.restore()
    win.show()
    win.focus()
  } else {
    createWindow()
  }
  const link = findDeepLink(argv || [])
  if (link) queueDeepLink(link)
})

// macOS: ссылки приходят событием, а не argv
app.on('open-url', (event, url) => {
  event.preventDefault()
  const link = parseImportDeepLink(url)
  if (link) queueDeepLink(link)
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
  win = null
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

function downloadUrlToFile(url: string, destPath: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const dir = path.dirname(destPath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    const file = fs.createWriteStream(destPath)
    const client = url.startsWith('https') ? https : http

    const request = client.get(url, { headers: { 'User-Agent': 'MineLauncher/2.0' } }, (response) => {
      if (response.statusCode && response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
        file.close()
        return downloadUrlToFile(response.headers.location, destPath).then(resolve).catch(reject)
      }
      if (response.statusCode !== 200) {
        file.close()
        fs.unlink(destPath, () => {})
        response.resume()
        return reject(new Error(`HTTP ${response.statusCode}: ${url}`))
      }
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

// ── Deep link импорт: minelauncher://import?url=... ─────────────
const MAX_IMPORT_BYTES = 600 * 1024 * 1024
let pendingDeepLink: ReturnType<typeof findDeepLink> = findDeepLink(process.argv)

function downloadImportArchive(url: string, destPath: string, redirects = 0): Promise<void> {
  return new Promise((resolve, reject) => {
    if (redirects > 3) return reject(new Error('Слишком много перенаправлений'))
    let parsed: URL
    try {
      parsed = new URL(url)
    } catch {
      return reject(new Error('Некорректная ссылка'))
    }
    if (parsed.protocol !== 'https:') return reject(new Error('Разрешены только https-ссылки'))

    let settled = false
    const fail = (err: Error) => {
      if (!settled) { settled = true; reject(err) }
    }
    const ok = () => {
      if (!settled) { settled = true; resolve() }
    }

    const req = https.get(url, { headers: { 'User-Agent': 'MineLauncher/2.0' }, timeout: 20000 }, (res) => {
      if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        res.resume()
        return downloadImportArchive(new URL(res.headers.location, url).toString(), destPath, redirects + 1)
          .then(ok)
          .catch(fail)
      }
      if (res.statusCode !== 200) {
        res.resume()
        return fail(new Error(`HTTP ${res.statusCode}`))
      }
      const declared = Number(res.headers['content-length'] || 0)
      if (declared > MAX_IMPORT_BYTES) {
        res.resume()
        return fail(new Error('Архив больше 600 МБ — отказ'))
      }

      const out = fs.createWriteStream(destPath)
      let received = 0
      res.on('data', (chunk: Buffer) => {
        received += chunk.length
        if (received > MAX_IMPORT_BYTES) {
          res.destroy()
          out.destroy()
          fs.rm(destPath, { force: true }, () => {})
          fail(new Error('Архив больше 600 МБ — отказ'))
        }
      })
      res.on('error', fail)
      out.on('error', fail)
      res.pipe(out)
      out.on('finish', () => out.close(ok))
    })

    req.on('timeout', () => req.destroy(new Error('Таймаут загрузки')))
    req.on('error', fail)
  })
}

async function handleDeepLink(link: NonNullable<ReturnType<typeof findDeepLink>>) {
  if (!win) createWindow()

  const host = new URL(link.url).hostname
  const answer = await dialog.showMessageBox(win!, {
    type: 'question',
    buttons: ['Импортировать', 'Отмена'],
    defaultId: 0,
    cancelId: 1,
    title: 'Импорт сборки по ссылке',
    message: `Скачать и импортировать сборку с ${host}?`,
    detail: link.url
  })
  if (answer.response !== 0) return

  const tempPath = path.join(app.getPath('temp'), `mine-launcher-import-${Date.now()}.zip`)
  try {
    await downloadImportArchive(link.url, tempPath)
    const result = importInstanceFromArchive(tempPath)
    win?.show()
    win?.focus()
    win?.webContents.send('deep-link:result', {
      ok: true,
      message: 'Сборка импортирована по ссылке',
      instances: result.instances,
      importedId: result.importedId
    })
  } catch (err) {
    win?.webContents.send('deep-link:result', {
      ok: false,
      message: errorMessage(err, 'Не удалось импортировать сборку')
    })
  } finally {
    fs.rm(tempPath, { force: true }, () => {})
  }
}

function queueDeepLink(link: NonNullable<ReturnType<typeof findDeepLink>>) {
  if (!app.isReady() || !win || win.webContents.isLoading()) {
    pendingDeepLink = link
    return
  }
  handleDeepLink(link).catch(() => {})
}

function flushPendingDeepLink() {
  const link = pendingDeepLink
  if (!link || !win) return
  pendingDeepLink = null
  handleDeepLink(link).catch(() => {})
}

// ── Path-safety helpers: IPC-строки и внешние метаданные не выводят нас за пределы каталога ──
function isInsideDir(dir: string, target: string): boolean {
  const rel = path.relative(path.resolve(dir), path.resolve(target))
  return rel !== '' && !rel.startsWith('..') && !path.isAbsolute(rel)
}

function safeInstId(instanceId: string): string {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(instanceId)) throw new Error('Некорректный id сборки')
  return instanceId
}

function safeFilename(filename: string): string {
  if (!/^[A-Za-z0-9._ -]{1,255}$/.test(filename)) throw new Error('Некорректное имя файла')
  return filename
}

// Общий путь импорта: и для диалога, и для deep link. Валидация целиком до записи на диск.
function importInstanceFromArchive(archivePath: string): { instances: Instance[]; importedId: string } {
  const stat = fs.statSync(archivePath)
  if (stat.size > 600 * 1024 * 1024) throw new Error('Архив больше 600 МБ — отказ')

  const zip = new AdmZip(archivePath)
  const fileEntries = zip.getEntries().filter((e) => !e.isDirectory)
  // Валидация ДО любой записи на диск: zip-slip, абсолютные пути, лимиты
  const modFiles = validateArchiveEntries(
    fileEntries.map((e) => ({ entryName: e.entryName, size: e.header.size }))
  )

  const metaEntry = zip.getEntry('instance.json')
  if (!metaEntry) throw new Error('В архиве нет instance.json')
  const meta = parseExportedMeta(JSON.parse(metaEntry.getData().toString('utf-8')))

  const newId = 'inst-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6)
  const newInst: Instance = {
    id: newId,
    name: uniqueInstanceName(meta.name, instances.map((i) => i.name)),
    version: meta.version,
    loader: meta.loader,
    created: Date.now(),
    memoryMin: settings.memoryMin,
    memoryMax: settings.memoryMax
  }

  const instDir = path.join(rootDir, 'instances', newId)
  const modsDir = path.join(instDir, 'mods')
  try {
    fs.mkdirSync(modsDir, { recursive: true })

    // Сопоставляем нормализованные имена с записями архива (обратные слэши тоже бывают)
    const byBasename = new Map<string, AdmZip.IZipEntry>()
    for (const entry of fileEntries) {
      const normalized = entry.entryName.replace(/\\/g, '/').replace(/\/+$/, '')
      if (normalized.startsWith('mods/')) {
        byBasename.set(normalized.slice('mods/'.length), entry)
      }
    }
    for (const file of modFiles) {
      const entry = byBasename.get(file)
      if (!entry) throw new Error(`Файл мода пропал при чтении: ${file}`)
      const data = entry.getData()
      // Заголовок zip может врать о размере — проверяем фактический объём (zip-bomb)
      if (data.length > MAX_MOD_BYTES_EXPORTED) {
        throw new Error(`Файл мода распаковался больше лимита: ${file}`)
      }
      fs.writeFileSync(path.join(modsDir, file), data)
    }
    fs.mkdirSync(path.join(instDir, 'saves'), { recursive: true })
  } catch (err) {
    // Откат: не оставляем полураспакованную сборку
    fs.rmSync(instDir, { recursive: true, force: true })
    throw err
  }

  instances.push(newInst)
  saveJsonData(instancesFile, instances)

  return { instances, importedId: newId }
}

function setupIpcHandlers() {
  // ── Window controls ───────────────────────────────────────────
  ipcMain.handle('minimize-window', () => { win?.minimize() })

  ipcMain.handle('maximize-window', () => {
    if (!win) return false
    if (win.isMaximized()) { win.unmaximize(); return false }
    win.maximize(); return true
  })

  ipcMain.handle('close-window', () => { win?.close() })

  ipcMain.handle('is-maximized', () => win?.isMaximized() || false)

  // ── Accounts ─────────────────────────────────────────────────
  ipcMain.handle('get-accounts', () => accounts)

  ipcMain.handle('add-account', (_, username: string) => {
    const trimmed = username.trim()
    if (!trimmed) throw new Error('Введите никнейм')
    if (trimmed.length > 16) throw new Error('Никнейм слишком длинный (максимум 16 символов)')
    if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) throw new Error('Допустимы только латинские буквы, цифры и знак _')

    if (accounts.some(a => a.username.toLowerCase() === trimmed.toLowerCase())) {
      throw new Error(`Аккаунт «${ trimmed}» уже добавлен`)
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
    accounts = accounts.map(acc => ({ ...acc, isActive: acc.id === accountId }))
    saveJsonData(accountsFile, accounts)
    return accounts
  })

  ipcMain.handle('delete-account', (_, accountId: string) => {
    accounts = accounts.filter(acc => acc.id !== accountId)
    if (accounts.length > 0 && !accounts.some(acc => acc.isActive)) accounts[0].isActive = true
    saveJsonData(accountsFile, accounts)
    return accounts
  })

  // ── Instances ────────────────────────────────────────────────
  ipcMain.handle('get-instances', () => instances)

  ipcMain.handle('create-instance', (_, data: { name: string; version: string; loader: 'vanilla' | 'fabric' | 'quilt' }) => {
    if (!data.version) throw new Error('Выберите версию Minecraft')
    if (instances.some(i => i.name === data.name)) throw new Error(`Сборка «${data.name}» уже существует`)

    const newInst: Instance = {
      id: 'inst-' + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: data.name,
      version: data.version,
      loader: data.loader || 'vanilla',
      created: Date.now(),
      memoryMin: settings.memoryMin,
      memoryMax: settings.memoryMax
    }
    instances.push(newInst)
    saveJsonData(instancesFile, instances)

    for (const sub of ['mods', 'saves']) {
      const d = path.join(rootDir, 'instances', newInst.id, sub)
      if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive: true })
    }

    return instances
  })

  ipcMain.handle('rename-instance', (_, { id, name }: { id: string; name: string }) => {
    const inst = instances.find((i) => i.id === id)
    if (!inst) throw new Error('Сборка не найдена')
    inst.name = name.trim()
    saveJsonData(instancesFile, instances)
    return instances
  })

  ipcMain.handle('delete-instance', (_, instanceId: string) => {
    safeInstId(instanceId)
    const inst = instances.find((i) => i.id === instanceId)
    instances = instances.filter((i) => i.id !== instanceId)
    saveJsonData(instancesFile, instances)

    if (inst && fs.existsSync(path.join(rootDir, 'instances', instanceId))) {
      if (win) {
        dialog.showMessageBox(win, {
          type: 'question',
          buttons: ['Удалить', 'Отмена'],
          defaultId: 1,
          title: 'Удалить сборку?',
          message: `Удалить сборку «${inst.name}» вместе с мирами, модами и файлами игры?`
        }).then(({ response }) => {
          if (response === 0) {
            fs.rmSync(path.join(rootDir, 'instances', instanceId), { recursive: true, force: true })
          }
        })
      }
    }

    return instances
  })

  // ── Instance export / import ─────────────────────────────────
  ipcMain.handle('export-instance', async (_, instanceId: string) => {
    safeInstId(instanceId)
    const inst = instances.find((i) => i.id === instanceId)
    if (!inst) throw new Error('Сборка не найдена')

    const modsDir = path.join(rootDir, 'instances', instanceId, 'mods')
    const modFiles = fs.existsSync(modsDir)
      ? fs.readdirSync(modsDir).filter((f) => /\.jar(\.disabled)?$/i.test(f))
      : []
    if (modFiles.length === 0) throw new Error('В этой сборке нет модов — делиться нечем')

    // Имя файла чистим от символов, запрещённых в Windows-путях
    const safeName = (inst.name || 'instance').replace(/[\\/:*?"<>|]/g, '_').trim() || 'instance'
    const saveResult = win
      ? await dialog.showSaveDialog(win, {
          title: 'Экспорт сборки',
          defaultPath: path.join(app.getPath('documents'), `${safeName}.zip`),
          filters: [{ name: 'Сборка Mine Launcher', extensions: ['zip'] }]
        })
      : { canceled: true, filePath: undefined }
    if (saveResult.canceled || !saveResult.filePath) return { ok: false, canceled: true }

    const zip = new AdmZip()
    zip.addFile('instance.json', Buffer.from(JSON.stringify(buildInstanceMeta(inst), null, 2), 'utf-8'))
    for (const file of modFiles) {
      zip.addLocalFile(path.join(modsDir, file), 'mods')
    }
    zip.writeZip(saveResult.filePath)

    return { ok: true, path: saveResult.filePath }
  })

  ipcMain.handle('import-instance', async () => {
    const pick = win
      ? await dialog.showOpenDialog(win, {
          title: 'Импорт сборки',
          properties: ['openFile'],
          filters: [{ name: 'Сборка Mine Launcher', extensions: ['zip'] }]
        })
      : { canceled: true, filePaths: [] as string[] }
    if (pick.canceled || pick.filePaths.length === 0) return { ok: false, canceled: true }

    const result = importInstanceFromArchive(pick.filePaths[0])
    return { ok: true, ...result }
  })

  // ── Versions ─────────────────────────────────────────────────
  ipcMain.handle('get-versions', async () => {
    try {
      return await getMinecraftVersions()
    } catch {
      return { latest: { release: '', snapshot: '' }, versions: [] }
    }
  })

  // ── Settings ─────────────────────────────────────────────────
  ipcMain.handle('get-settings', () => settings)

  ipcMain.handle('set-selected-instance-id', (_, instanceId: string) => {
    settings.selectedInstanceId = instanceId
    saveJsonData(settingsFile, settings)
    return true
  })

  ipcMain.handle('save-settings', (_, newSettings: Partial<LauncherSettings>) => {
    settings = { ...settings, ...newSettings }
    saveJsonData(settingsFile, settings)
    return settings
  })

  ipcMain.handle('detect-java', async () => detectJavaPaths())

  ipcMain.handle('get-required-java', (_, version: string) => requiredJavaMajor(version))

  ipcMain.handle('open-launcher-folder', () => shell.openPath(rootDir))

  // ── Launching ────────────────────────────────────────────────
  ipcMain.handle('launch-instance', async (_, instanceId: string) => {
    safeInstId(instanceId)
    const inst = instances.find((i) => i.id === instanceId)
    if (!inst) throw new Error('Сборка не найдена')

    const activeAcc = accounts.find(a => a.isActive) || accounts[0]
    if (!activeAcc) throw new Error('Сначала добавьте аккаунт на панели слева')

    if (stopInstance(instanceId)) {
      await new Promise(resolve => setTimeout(resolve, 500))
    }

    // Лаунчер мог быть скрыт в трей — показываем при новом запуске
    win?.show()

    launchMinecraft(
      {
        instanceId: inst.id,
        instanceName: inst.name,
        version: inst.version,
        loader: (inst.loader || 'vanilla') as 'vanilla' | 'fabric' | 'quilt',
        username: activeAcc.username,
        uuid: activeAcc.uuid,
        memoryMin: settings.memoryMin || 1024,
        memoryMax: settings.memoryMax || 4096,
        javaPath: inst.javaPath || settings.javaPath || undefined,
        customJvmArgs: settings.customJvmArgs || '',
        customGameArgs: '',
        fullscreen: !!settings.fullscreen,
        hideLauncher: !!settings.closeLauncherOnGameStart
      },
      (data) => {
        if (data?.stage === 'running') {
          // Дата последнего запуска честно проставляется только когда игра реально стартовала
          const cur = instances.find((i) => i.id === instanceId)
          if (cur) { cur.lastPlayed = Date.now(); saveJsonData(instancesFile, instances) }
          if (settings.closeLauncherOnGameStart) {
            setTimeout(() => { try { hideToTray() } catch {} }, 3000)
          }
        }
        if (data?.stage === 'idle' || data?.stage === 'error') {
          tray?.setToolTip('Mine Launcher')
        }
        win?.webContents.send('launch-progress', data)
      },
      (logData) => win?.webContents.send('game-log', logData)
    )

    return true
  })

  ipcMain.handle('stop-instance', (_, instanceId: string) => stopInstance(instanceId))

  ipcMain.handle('restore-window', () => {
    win?.show()
    return true
  })

  ipcMain.handle('get-system-info', () => ({
    totalRamMb: totalRamMb,
    defaultMaxMemory
  }))

  // ── Mods ─────────────────────────────────────────────────────
  ipcMain.handle('open-instance-folder', (_, instanceId: string) => {
    safeInstId(instanceId)
    const instDir = path.join(rootDir, 'instances', instanceId)
    if (!fs.existsSync(instDir)) fs.mkdirSync(instDir, { recursive: true })
    shell.openPath(instDir)
  })

  ipcMain.handle('get-instance-mods', (_, instanceId: string) => {
    safeInstId(instanceId)
    const modsDir = path.join(rootDir, 'instances', instanceId, 'mods')
    if (!fs.existsSync(modsDir)) return []

    try {
      return fs.readdirSync(modsDir)
        .filter(file => file.endsWith('.jar') || file.endsWith('.jar.disabled'))
        .map(file => {
          const fullPath = path.join(modsDir, file)
          const stat = fs.statSync(fullPath)
          return {
            id: file,
            filename: file,
            name: file.replace(/\.jar(\.disabled)?$/, ''),
            enabled: file.endsWith('.jar'),
            size: stat.size
          }
        })
    } catch {
      return []
    }
  })

  ipcMain.handle('toggle-mod', (_, { instanceId, modFilename }: { instanceId: string; modFilename: string }) => {
    safeInstId(instanceId)
    const modsDir = path.join(rootDir, 'instances', instanceId, 'mods')
    const oldPath = path.join(modsDir, safeFilename(modFilename))
    if (!isInsideDir(modsDir, oldPath)) return false
    if (!fs.existsSync(oldPath)) return false

    const newFilename = modFilename.endsWith('.jar')
      ? modFilename + '.disabled'
      : modFilename.replace(/\.disabled$/, '')
    const newPath = path.join(modsDir, safeFilename(newFilename))
    if (!isInsideDir(modsDir, newPath)) return false
    fs.renameSync(oldPath, newPath)
    return true
  })

  ipcMain.handle('delete-mod', (_, { instanceId, modFilename }: { instanceId: string; modFilename: string }) => {
    safeInstId(instanceId)
    const modsDir = path.join(rootDir, 'instances', instanceId, 'mods')
    const targetPath = path.join(modsDir, safeFilename(modFilename))
    if (!isInsideDir(modsDir, targetPath)) return false
    if (fs.existsSync(targetPath)) fs.unlinkSync(targetPath)
    return true
  })

  ipcMain.handle('download-mod-file', async (_, { instanceId, downloadUrl, filename }: { instanceId: string; downloadUrl: string; filename: string }) => {
    safeInstId(instanceId)
    const safeName = safeFilename(filename)
    // Мод файла может прийти только с CDN Modrinth — внешние/локальные URL не принимаем
    if (!downloadUrl.startsWith('https://cdn.modrinth.com/')) throw new Error('Недопустимый источник файла')
    const modsDir = path.join(rootDir, 'instances', instanceId, 'mods')
    if (!fs.existsSync(modsDir)) fs.mkdirSync(modsDir, { recursive: true })
    await downloadUrlToFile(downloadUrl, path.join(modsDir, safeName))
    return true
  })

  ipcMain.handle('add-mod-file', async (_, instanceId: string) => {
    safeInstId(instanceId)
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

  // ── Skins ────────────────────────────────────────────────────
  ipcMain.handle('upload-user-skin', async (_, username: string) => {
    if (!win) return null
    const res = await dialog.showOpenDialog(win, {
      title: 'Выберите скин Minecraft (.png)',
      filters: [{ name: 'Minecraft Skin (*.png)', extensions: ['png'] }],
      properties: ['openFile']
    })
    if (res.canceled || !res.filePaths.length) return null

    if (!fs.existsSync(skinsDir)) fs.mkdirSync(skinsDir, { recursive: true })
    const targetPath = path.join(skinsDir, `${username.replace(/[^a-zA-Z0-9_]/g, '')}.png`)
    fs.copyFileSync(res.filePaths[0], targetPath)
    // trigger accounts refresh so skin shows
    win.webContents.send('accounts-updated', accounts)
    return targetPath
  })

  ipcMain.handle('fetch-online-skin', async (_, { username, targetUsername }: { username: string; targetUsername: string }) => {
    if (!fs.existsSync(skinsDir)) fs.mkdirSync(skinsDir, { recursive: true })
    const skinDest = path.join(skinsDir, `${username.replace(/[^a-zA-Z0-9_]/g, '')}.png`)
    const urls = [
      `https://mc-heads.net/skin/${encodeURIComponent(targetUsername)}`,
      `https://minotar.net/skin/${encodeURIComponent(targetUsername)}`
    ]

    for (const u of urls) {
      try {
        await downloadUrlToFile(u, skinDest)
        if (fs.existsSync(skinDest) && fs.statSync(skinDest).size > 100) {
          return true
        }
      } catch {}
    }
    throw new Error(`Скин для «${targetUsername}» не найден на серверах`)
  })

  ipcMain.handle('get-user-skin', (_, username: string) => {
    const skinPath = path.join(skinsDir, `${username.replace(/[^a-zA-Z0-9_]/g, '')}.png`)
    return fs.existsSync(skinPath) ? skinPath : null
  })

  // ── Profile (honest data only) ───────────────────────────────
  ipcMain.handle('get-profile-stats', (_, username: string) => {
    const worlds: ProfileWorld[] = []
    let modsCount = 0
    let lastPlayedTime = 0

    for (const inst of instances) {
      if (inst.lastPlayed) lastPlayedTime = Math.max(lastPlayedTime, inst.lastPlayed)

      const savesDir = path.join(rootDir, 'instances', inst.id, 'saves')
      if (fs.existsSync(savesDir)) {
        try {
          for (const s of fs.readdirSync(savesDir)) {
            const full = path.join(savesDir, s)
            if (fs.statSync(full).isDirectory()) {
              let worldTime = 0
              const levelDat = path.join(full, 'level.dat')
              if (fs.existsSync(levelDat)) worldTime = fs.statSync(levelDat).mtimeMs
              worlds.push({
                instanceId: inst.id,
                instanceName: inst.name,
                worldName: s,
                lastPlayed: worldTime
              })
            }
          }
        } catch {}
      }

      const modsDir = path.join(rootDir, 'instances', inst.id, 'mods')
      if (fs.existsSync(modsDir)) {
        try {
          modsCount += fs.readdirSync(modsDir).filter(f => f.endsWith('.jar') || f.endsWith('.jar.disabled')).length
        } catch {}
      }
    }

    const activeAcc = accounts.find(a => a.username === username) || accounts.find(a => a.isActive)

    return {
      username: activeAcc?.username || username,
      uuid: activeAcc?.uuid || '',
      worldsCount: worlds.length,
      worlds: worlds.sort((a, b) => b.lastPlayed - a.lastPlayed),
      instancesCount: instances.length,
      modsCount,
      lastPlayedFormatted: lastPlayedTime
        ? new Date(lastPlayedTime).toLocaleString('ru-RU')
        : 'Ещё не играл'
    }
  })

  // ── Skin backups for avatar lookup ─────────────────────────────
  ipcMain.handle('get-account-head', async (_, username: string) => {
    const localPath = path.join(skinsDir, `${username.replace(/[^a-zA-Z0-9_]/g, '')}.png`)
    if (fs.existsSync(localPath)) {
      return `file://${localPath}`
    }
    return `https://mc-heads.net/avatar/${encodeURIComponent(username)}/64`
  })

  // ── Auto-updater ──────────────────────────────────────────────
  ipcMain.handle('updater:check', async () => {
    if (VITE_DEV_SERVER_URL) return { status: 'dev' }
    try {
      await autoUpdater.checkForUpdates()
      return { ok: true }
    } catch (e) {
      return { ok: false, message: errorMessage(e, 'Не удалось проверить обновления') }
    }
  })

  ipcMain.handle('updater:download', async () => {
    if (VITE_DEV_SERVER_URL) return { status: 'dev' }
    try {
      await autoUpdater.downloadUpdate()
      return { ok: true }
    } catch (e) {
      return { ok: false, message: errorMessage(e, 'Не удалось скачать обновление') }
    }
  })

  ipcMain.handle('updater:install', () => {
    if (VITE_DEV_SERVER_URL) return false
    try {
      setImmediate(() => {
        autoUpdater.quitAndInstall()
      })
      return true
    } catch {
      return false
    }
  })
}

app.whenReady().then(() => {
  setupIpcHandlers()
  createWindow()
  initAutoUpdater()

  // Стартовый deep link (ярлык/браузер запустили приложение со ссылкой)
  if (pendingDeepLink) {
    if (win?.webContents.isLoading()) {
      win.webContents.once('did-finish-load', () => setTimeout(flushPendingDeepLink, 600))
    } else {
      setTimeout(flushPendingDeepLink, 600)
    }
  }
})
