import type {
  Account,
  Instance,
  ModItem,
  LauncherSettings,
  MinecraftVersion,
  LaunchProgress
} from '../types'

type NativeBridge = {
  getAccounts(): string
  addAccount(username: string): string
  setActiveAccount(id: string): string
  deleteAccount(id: string): string
  getInstances(): string
  deleteInstance(id: string): string
  getSettings(): string
  saveSettings(json: string): boolean
  getSystemInfo(): string
  getVersions(): string
  installVersion(mc: string, loader: string, name: string): void
  launch(name: string): boolean
  getMods(version: string): string
  toggleMod(version: string, filename: string): boolean
  deleteMod(version: string, filename: string): boolean
  downloadMod(version: string, url: string, filename: string): boolean
  getStats(): string
  openNative(): void
  refresh(): void
}

declare global {
  interface Window {
    MineNative?: NativeBridge
    __mineNativeEvent?: (type: string, payload: string) => void
  }
}

export const isAndroid = () => Boolean(window.MineNative)

export function openNativeScreen() {
  window.MineNative?.openNative()
}

function read<T>(value: string | null, fallback: T): T {
  if (!value) return fallback
  try {
    return JSON.parse(value) as T
  } catch {
    return fallback
  }
}

const progressListeners = new Set<(data: LaunchProgress) => void>()

function emitProgress(data: LaunchProgress) {
  progressListeners.forEach((listener) => listener(data))
}

export function installAndroidBridge(): boolean {
  const native = window.MineNative
  if (!native || window.electronAPI) return false

  document.documentElement.classList.add('android')

  window.__mineNativeEvent = (type: string, payload: string) => {
    if (type === 'launch-start') {
      emitProgress({ instanceId: payload, stage: 'launching', statusText: 'Запускаем игру', progress: 10 })
    } else if (type === 'launch-done') {
      emitProgress({ instanceId: payload, stage: 'running', statusText: 'Игра запущена', progress: 100 })
    } else if (type === 'launch-error') {
      emitProgress({ instanceId: '', stage: 'error', statusText: payload || 'Ошибка запуска', progress: 0, error: payload })
    } else if (type === 'install-error') {
      window.dispatchEvent(new CustomEvent('mine:install-error', { detail: payload }))
    } else if (type === 'install-start') {
      window.dispatchEvent(new CustomEvent('mine:install-start', { detail: payload }))
    } else if (type === 'install-progress') {
      window.dispatchEvent(new CustomEvent('mine:install-progress', { detail: payload }))
    } else if (type === 'install-done') {
      window.dispatchEvent(new CustomEvent('mine:install-done', { detail: payload }))
    } else if (type === 'state') {
      window.dispatchEvent(new CustomEvent('mine:state'))
    }
  }

  let cachedSettings: LauncherSettings = read(native.getSettings(), {
    javaPath: '',
    memoryMin: 1024,
    memoryMax: 4096,
    customJvmArgs: '',
    closeLauncherOnGameStart: false,
    fullscreen: false,
    hideLauncher: false
  })

  window.electronAPI = {
    platform: 'android' as NodeJS.Platform,

    minimizeWindow: async () => {},
    maximizeWindow: async () => false,
    closeWindow: async () => {},
    isMaximized: async () => false,

    getAccounts: async () => read<Account[]>(native.getAccounts(), []),
    addAccount: async (username: string) => read<Account[]>(native.addAccount(username), []),
    setActiveAccount: async (id: string) => read<Account[]>(native.setActiveAccount(id), []),
    deleteAccount: async (id: string) => read<Account[]>(native.deleteAccount(id), []),

    getInstances: async () => read<Instance[]>(native.getInstances(), []),
    createInstance: async (data: { name: string; version: string; loader: string }) => {
      native.installVersion(data.version, data.loader, data.name)
      return read<Instance[]>(native.getInstances(), [])
    },
    renameInstance: async () => read<Instance[]>(native.getInstances(), []),
    deleteInstance: async (id: string) => read<Instance[]>(native.deleteInstance(id), []),
    openInstanceFolder: async () => {},
    exportInstance: async () => ({ ok: false, canceled: true }),
    importInstance: async () => ({ ok: false, canceled: true }),

    getVersions: async () => ({ versions: read<MinecraftVersion[]>(native.getVersions(), []) }),

    getSettings: async () => cachedSettings,
    saveSettings: async (settings: Partial<LauncherSettings>) => {
      cachedSettings = { ...cachedSettings, ...settings }
      native.saveSettings(JSON.stringify(cachedSettings))
      return cachedSettings
    },
    setSelectedInstanceId: async () => {},
    detectJava: async () => [],
    getRequiredJava: async () => 17,
    getSystemInfo: async () => read(native.getSystemInfo(), { totalRamMb: 4096, defaultMaxMemory: 2048 }),
    openLauncherFolder: async () => {},

    launchInstance: async (id: string) => {
      native.launch(id)
      return true
    },
    stopInstance: async () => false,
    restoreWindow: async () => {},

    getInstanceMods: async (id: string) => read<ModItem[]>(native.getMods(id), []),
    toggleMod: async ({ instanceId, modFilename }: { instanceId: string; modFilename: string }) =>
      native.toggleMod(instanceId, modFilename),
    deleteMod: async ({ instanceId, modFilename }: { instanceId: string; modFilename: string }) =>
      native.deleteMod(instanceId, modFilename),
    downloadModFile: async ({ instanceId, downloadUrl, filename }: { instanceId: string; downloadUrl: string; filename: string }) =>
      native.downloadMod(instanceId, downloadUrl, filename),
    addModFile: async () => false,

    uploadUserSkin: async () => null,
    fetchOnlineSkin: async () => {
      throw new Error('Скины на телефоне пока не меняются')
    },
    getUserSkin: async () => null,
    getAccountHead: async (username: string) => `https://mc-heads.net/avatar/${encodeURIComponent(username)}/64`,
    getProfileStats: async (username: string) => read(native.getStats(), {
      username,
      uuid: '',
      worldsCount: 0,
      worlds: [],
      instancesCount: 0,
      modsCount: 0,
      lastPlayedFormatted: '—'
    }),

    checkForUpdates: async () => ({ ok: false }),
    downloadUpdate: async () => ({ ok: false }),
    installUpdate: async () => false,
    onUpdateState: () => () => {},

    onLaunchProgress: (callback: (data: LaunchProgress) => void) => {
      progressListeners.add(callback)
      return () => {
        progressListeners.delete(callback)
      }
    },
    onGameLog: () => () => {},
    onDeepLinkResult: () => () => {},
  }

  return true
}
