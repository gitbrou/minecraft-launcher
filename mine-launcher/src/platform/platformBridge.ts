export function ensurePlatformBridge() {
  const w = window as any
  if (w.electronAPI) return

  // Мобильная заглушка (Android/ Boca): main-process недоступен, для запуска
  // используется PojavLauncher-мост через Capacitor.
  const stubState = {
    accounts: [] as any[],
    instances: [] as any[],
    settings: {} as any
  }

  w.electronAPI = {
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
    createInstance: async (data: any) => {
      const inst = {
        id: 'inst-' + Date.now().toString(36),
        name: data.name || data.version,
        version: data.version,
        loader: data.loader,
        created: Date.now()
      }
      stubState.instances.push(inst)
      return stubState.instances
    },
    renameInstance: async ({ id, name }: any) => {
      stubState.instances = stubState.instances.map((i: any) => i.id === id ? { ...i, name } : i)
      return stubState.instances
    },
    deleteInstance: async (id: string) => {
      stubState.instances = stubState.instances.filter((i: any) => i.id !== id)
      return stubState.instances
    },
    openInstanceFolder: async () => {},

    getVersions: async () => ({ latest: { release: '', snapshot: '' }, versions: [] }),

    getSettings: async () => ({ javaPath: '', memoryMin: 1024, memoryMax: 4096, customJvmArgs: '', closeLauncherOnGameStart: false, fullscreen: false, hideLauncher: false, ...stubState.settings }),
    saveSettings: async (s: any) => {
      stubState.settings = { ...stubState.settings, ...s }
      return stubState.settings
    },
    setSelectedInstanceId: async () => {},
    detectJava: async () => [],
    getRequiredJava: async () => 17,
    getSystemInfo: async () => ({ totalRamMb: 8192, defaultMaxMemory: 4096 }),
    openLauncherFolder: async () => {},

    launchInstance: async (id: string) => {
      const inst = stubState.instances.find((i: any) => i.id === id) || stubState.instances[0]
      const username = stubState.accounts.find((a: any) => a.isActive)?.username

      try {
        const { Capacitor, registerPlugin } = await import('@capacitor/core')
        const PojavBridge = registerPlugin<{ launch: (o: { version: string }) => Promise<{ ok: boolean }> }>('PojavBridge')
        if (Capacitor.isNativePlatform()) {
          await PojavBridge.launch({ version: inst?.version || '' })
          return true
        }
      } catch { /* fallthrough */ }

      const deepLink = 'pojavlauncher://launch?version=' + encodeURIComponent(inst?.version || '') + '&user=' + encodeURIComponent(username || '')
      const marketUrl = 'https://play.google.com/store/apps/details?id=net.kdt.pojavlaunch'
      try { window.open(deepLink, '_system') } catch { /* ignore */ }
      setTimeout(() => {
        alert('Для запуска установите движок PojavLauncher (Play Market).')
        window.open(marketUrl, '_system')
      }, 1200)
      return true
    },
    stopInstance: async () => true,
    restoreWindow: async () => {},

    getInstanceMods: async () => [],
    toggleMod: async () => false,
    deleteMod: async () => false,
    downloadModFile: async () => true,
    addModFile: async () => false,

    uploadUserSkin: async () => null,
    fetchOnlineSkin: async () => { throw new Error('Недоступно на Android') },
    getUserSkin: async () => null,
    getAccountHead: async (username: string) => `https://mc-heads.net/avatar/${username}/64`,
    getProfileStats: async (username: string) => ({
      username, uuid: '', worldsCount: 0, worlds: [],
      instancesCount: 0, modsCount: 0, lastPlayedFormatted: '—'
    }),

    onLaunchProgress: () => () => {},
    onGameLog: () => () => {},
  }
}
