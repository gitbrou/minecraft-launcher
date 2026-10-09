export function ensurePlatformBridge() {
  const w = window as any
  if (w.electronAPI) return

  const stubState = {
    accounts: [
      { id: '1', username: 'Steve', uuid: '00000000-0000-0000-0000-000000000000', type: 'offline', isActive: true, createdAt: Date.now() }
    ],
    instances: [
      { id: 'android-demo', name: '1.20.4', version: '1.20.4', loader: 'vanilla', created: Date.now(), memoryMin: 1024, memoryMax: 4096 }
    ],
    settings: { javaPath: '', memoryMin: 1024, memoryMax: 4096, customJvmArgs: '', closeLauncherOnGameStart: false, gameDir: '', launcherFont: 'system-ui', selectedInstanceId: '' }
  }

  w.electronAPI = {
    minimizeWindow: async () => {},
    maximizeWindow: async () => false,
    closeWindow: async () => {},
    isMaximized: async () => false,

    getAccounts: async () => stubState.accounts,
    addAccount: async (username: string) => { stubState.accounts.push({ id: Date.now().toString(), username, uuid: '', type: 'offline', isActive: false, createdAt: Date.now() }); return stubState.accounts },
    setActiveAccount: async (id: string) => { stubState.accounts = stubState.accounts.map(a => ({ ...a, isActive: a.id === id })); return stubState.accounts },
    deleteAccount: async (id: string) => { stubState.accounts = stubState.accounts.filter(a => a.id !== id); return stubState.accounts },

    getInstances: async () => stubState.instances,
    createInstance: async (data: any) => { stubState.instances.push({ id: 'inst-' + Date.now(), name: data.version, version: data.version, loader: data.loader, created: Date.now(), memoryMin: 1024, memoryMax: 4096 }); return stubState.instances },
    deleteInstance: async (id: string) => { stubState.instances = stubState.instances.filter(i => i.id !== id); return stubState.instances },
    openInstanceFolder: async () => {},

    getVersions: async () => ({ latest: { release: '1.20.4', snapshot: '1.20.4' }, versions: [] }),

    getSettings: async () => stubState.settings,
    saveSettings: async (s: any) => { stubState.settings = { ...stubState.settings, ...s }; return stubState.settings },
    setSelectedInstanceId: async (id: string) => { stubState.settings = { ...stubState.settings, selectedInstanceId: id }; return stubState.settings },
    detectJava: async () => [],

    launchInstance: async (id: string) => {
      const inst = stubState.instances.find(i => i.id === id) || stubState.instances[0]
      const handoff = {
        action: 'launch',
        version: inst?.version,
        loader: inst?.loader,
        username: stubState.accounts.find(a => a.isActive)?.username,
        source: 'mine-launcher-android'
      }
      console.log('Launch handoff payload:', handoff)

      // PojavBridge — нативный мост
      try {
        const { Capacitor, registerPlugin } = await import('@capacitor/core')
        const PojavBridge = registerPlugin<{ launch: (o: { version: string }) => Promise<{ ok: boolean }> }>('PojavBridge')
        if (Capacitor.isNativePlatform()) {
          await PojavBridge.launch({ version: inst?.version || '' })
          return true
        }
      } catch { /* fallthrough */ }

      // Fallback — deep link / Play Market
      const deepLink = 'pojavlauncher://launch?version=' + encodeURIComponent(inst?.version || '') + '&user=' + encodeURIComponent(handoff.username || '')
      const marketUrl = 'https://play.google.com/store/apps/details?id=net.kdt.pojavlaunch'
      try { window.open(deepLink, '_system') } catch { /* ignore */ }
      setTimeout(() => {
        alert('Для запуска установите движок PojavLauncher (Play Market).')
        window.open(marketUrl, '_system')
      }, 1200)
      return true
    },
    stopInstance: async () => true,

    getInstanceMods: async () => [],
    toggleMod: async () => false,
    downloadModFile: async () => true,
    addModFile: async () => false,

    saveUserSkin: async () => null,
    uploadUserSkin: async () => null,
    saveUserSkinBase64: async () => true,
    parseCommandSkin: async () => { throw new Error('Недоступно на Android') },
    fetchOnlineSkin: async () => { throw new Error('Недоступно на Android') },
    getUserSkin: async () => null,
    getProfileStats: async (username: string) => ({ username, uuid: '', worldsCount: 0, totalPlayTimeHours: 'Нет информации', lastPlayedFormatted: 'Нет информации', favoriteWorld: 'Нет информации', favoriteServer: 'Нет информации' }),

    onLaunchProgress: () => () => {},
    onGameLog: () => () => {},
  }
}
