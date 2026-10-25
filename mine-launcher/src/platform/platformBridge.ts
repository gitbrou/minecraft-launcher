import type { Account, Instance, ModItem } from '../types'

type BridgeWindow = { electronAPI?: Window['electronAPI'] }

export function ensurePlatformBridge() {
  const w = window as unknown as BridgeWindow
  if (w.electronAPI) return

  // Заглушка для браузера: main-процесса нет, поэтому UI работает на пустых данных.
  // Нужна только для `npm run dev` и превью дизайна, в Electron не используется.
  const stubState: {
    accounts: Account[]
    instances: Instance[]
    settings: Record<string, unknown>
  } = {
    accounts: [],
    instances: [],
    settings: {}
  }

  // Только для локального превью дизайна в браузере: /?demo=1
  // В production-сборке условие ложно, данные не подставляются.
  const demoMods: ModItem[] = []
  const isDemo = import.meta.env.DEV && typeof location !== 'undefined' && location.search.includes('demo=1')
  if (isDemo) {
    const now = Date.now()
    demoMods.push(
      { id: 'm1', filename: 'sodium-0.5.11+mc1.20.1.jar', name: 'Sodium', enabled: true, size: 1_240_000 },
      { id: 'm2', filename: 'iris-1.7.0+mc1.20.1.jar', name: 'Iris Shaders', enabled: true, size: 2_100_000 },
      { id: 'm3', filename: 'jei-1.20.1-forge-15.2.0.27.jar', name: 'Just Enough Items', enabled: false, size: 1_800_000 }
    )
    stubState.accounts.push({
      id: 'demo-account',
      username: 'Steve',
      uuid: '',
      type: 'offline',
      isActive: true,
      createdAt: now
    })
    stubState.instances.push(
      { id: 'demo-1', name: 'Create: Above and Beyond', version: '1.20.1', loader: 'fabric', created: now, lastPlayed: now - 2 * 3600_000 },
      { id: 'demo-2', name: 'Выживание с друзьями', version: '1.21.1', loader: 'fabric', created: now, lastPlayed: now - 26 * 3600_000 },
      { id: 'demo-3', name: 'Vanilla 1.20.4', version: '1.20.4', loader: 'vanilla', created: now },
      { id: 'demo-4', name: 'Quilt-сборка', version: '1.19.2', loader: 'quilt', created: now, lastPlayed: now - 9 * 24 * 3600_000 }
    )
  }

  w.electronAPI = {
    platform: typeof navigator !== 'undefined' && /Win/i.test(navigator.platform) ? 'win32' : 'linux',
    minimizeWindow: async () => {},
    maximizeWindow: async () => false,
    closeWindow: async () => {},
    isMaximized: async () => false,

    getAccounts: async () => stubState.accounts,
    addAccount: async (username: string) => {
      stubState.accounts.push({
        id: Date.now().toString(),
        username,
        uuid: '',
        type: 'offline',
        isActive: stubState.accounts.length === 0,
        createdAt: Date.now()
      })
      return stubState.accounts
    },
    setActiveAccount: async (id: string) => {
      stubState.accounts = stubState.accounts.map(a => ({ ...a, isActive: a.id === id }))
      return stubState.accounts
    },
    deleteAccount: async (id: string) => {
      stubState.accounts = stubState.accounts.filter(a => a.id !== id)
      return stubState.accounts
    },

    getInstances: async () => stubState.instances,
    createInstance: async (data: { name: string; version: string; loader: string }) => {
      const inst: Instance = {
        id: 'inst-' + Date.now().toString(36),
        name: data.name || data.version,
        version: data.version,
        loader: (data.loader === 'fabric' || data.loader === 'quilt' ? data.loader : 'vanilla'),
        created: Date.now()
      }
      stubState.instances.push(inst)
      return stubState.instances
    },
    renameInstance: async ({ id, name }: { id: string; name: string }) => {
      stubState.instances = stubState.instances.map((i) => i.id === id ? { ...i, name } : i)
      return stubState.instances
    },
    deleteInstance: async (id: string) => {
      stubState.instances = stubState.instances.filter((i) => i.id !== id)
      return stubState.instances
    },
    openInstanceFolder: async () => {},
    exportInstance: async () => ({ ok: false, canceled: true }),
    importInstance: async () => ({ ok: false, canceled: true }),

    getVersions: async () => ({ latest: { release: '', snapshot: '' }, versions: [] }),

    getSettings: async () => ({ javaPath: '', memoryMin: 1024, memoryMax: 4096, customJvmArgs: '', closeLauncherOnGameStart: false, fullscreen: false, hideLauncher: false, ...stubState.settings }),
    saveSettings: async (s: Record<string, unknown>) => {
      stubState.settings = { ...stubState.settings, ...s }
      return stubState.settings
    },
    setSelectedInstanceId: async () => {},
    detectJava: async () => [],
    getRequiredJava: async () => 17,
    getSystemInfo: async () => ({ totalRamMb: 8192, defaultMaxMemory: 4096 }),
    openLauncherFolder: async () => {},
    checkForUpdates: async () => ({ ok: true }),
    downloadUpdate: async () => ({ ok: true }),
    installUpdate: async () => false,
    onUpdateState: () => () => {},

    launchInstance: async () => false,
    stopInstance: async () => true,
    restoreWindow: async () => {},

    getInstanceMods: async () => demoMods,
    toggleMod: async () => false,
    deleteMod: async () => false,
    downloadModFile: async () => true,
    addModFile: async () => false,

    uploadUserSkin: async () => null,
    fetchOnlineSkin: async () => { throw new Error('Недоступно в браузере') },
    getUserSkin: async () => null,
    getAccountHead: async (username: string) => `https://mc-heads.net/avatar/${username}/64`,
    getProfileStats: async (username: string) => ({
      username, uuid: '', worldsCount: 0, worlds: [],
      instancesCount: 0, modsCount: 0, lastPlayedFormatted: '—'
    }),

    onLaunchProgress: () => () => {},
    onGameLog: () => () => {},
    onDeepLinkResult: () => () => {},
  }
}
