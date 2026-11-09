import { ipcRenderer, contextBridge } from 'electron'
import type {
  Account,
  Instance,
  ModItem,
  GameLog,
  LaunchProgress,
  LauncherSettings,
  MinecraftVersion,
  UpdateState,
  DeepLinkResult,
  HorizonAuth,
  HorizonProgress,
  HorizonState,
  HorizonVersion
} from '../src/types'

const electronAPI = {
  platform: process.platform,
  // Window controls
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  isMaximized: () => ipcRenderer.invoke('is-maximized'),

  // Accounts
  getAccounts: (): Promise<Account[]> => ipcRenderer.invoke('get-accounts'),
  addAccount: (username: string): Promise<Account[]> => ipcRenderer.invoke('add-account', username),
  setActiveAccount: (id: string): Promise<Account[]> => ipcRenderer.invoke('set-active-account', id),
  deleteAccount: (id: string): Promise<Account[]> => ipcRenderer.invoke('delete-account', id),

  // Instances
  getInstances: (): Promise<Instance[]> => ipcRenderer.invoke('get-instances'),
  createInstance: (data: { name: string; version: string; loader: string }): Promise<Instance[]> => ipcRenderer.invoke('create-instance', data),
  renameInstance: (payload: { id: string; name: string }): Promise<Instance[]> => ipcRenderer.invoke('rename-instance', payload),
  deleteInstance: (id: string): Promise<Instance[]> => ipcRenderer.invoke('delete-instance', id),
  openInstanceFolder: (id: string) => ipcRenderer.invoke('open-instance-folder', id),
  exportInstance: (id: string): Promise<{ ok: boolean; path?: string; canceled?: boolean }> => ipcRenderer.invoke('export-instance', id),
  importInstance: (): Promise<{ ok: boolean; canceled?: boolean; instances?: Instance[]; importedId?: string }> => ipcRenderer.invoke('import-instance'),

  // Versions
  getVersions: (): Promise<{ versions: MinecraftVersion[] }> => ipcRenderer.invoke('get-versions'),

  // Settings & Java
  getSettings: (): Promise<LauncherSettings> => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings: Partial<LauncherSettings>) => ipcRenderer.invoke('save-settings', settings),
  setSelectedInstanceId: (instanceId: string) => ipcRenderer.invoke('set-selected-instance-id', instanceId),
  detectJava: () => ipcRenderer.invoke('detect-java'),
  getRequiredJava: (version: string) => ipcRenderer.invoke('get-required-java', version),
  getSystemInfo: () => ipcRenderer.invoke('get-system-info'),
  openLauncherFolder: () => ipcRenderer.invoke('open-launcher-folder'),

  // Launching
  launchInstance: (id: string) => ipcRenderer.invoke('launch-instance', id),
  stopInstance: (id: string): Promise<boolean> => ipcRenderer.invoke('stop-instance', id),
  restoreWindow: () => ipcRenderer.invoke('restore-window'),

  // Mods
  getInstanceMods: (id: string): Promise<ModItem[]> => ipcRenderer.invoke('get-instance-mods', id),
  toggleMod: (payload: { instanceId: string; modFilename: string }): Promise<boolean> => ipcRenderer.invoke('toggle-mod', payload),
  deleteMod: (payload: { instanceId: string; modFilename: string }): Promise<boolean> => ipcRenderer.invoke('delete-mod', payload),
  downloadModFile: (payload: { instanceId: string; downloadUrl: string; filename: string }): Promise<boolean> => ipcRenderer.invoke('download-mod-file', payload),
  addModFile: (instanceId: string): Promise<boolean> => ipcRenderer.invoke('add-mod-file', instanceId),

  // Skins & Profile
  uploadUserSkin: (username: string) => ipcRenderer.invoke('upload-user-skin', username),
  fetchOnlineSkin: (payload: { username: string; targetUsername: string }) => ipcRenderer.invoke('fetch-online-skin', payload),
  getUserSkin: (username: string): Promise<string | null> => ipcRenderer.invoke('get-user-skin', username),
  getAccountHead: (username: string) => ipcRenderer.invoke('get-account-head', username),
  getProfileStats: (username: string) => ipcRenderer.invoke('get-profile-stats', username),

  // Auto-updater
  checkForUpdates: () => ipcRenderer.invoke('updater:check'),
  downloadUpdate: () => ipcRenderer.invoke('updater:download'),
  installUpdate: () => ipcRenderer.invoke('updater:install'),
  onUpdateState: (callback: (state: UpdateState) => void) => {
    const handler = (_event: unknown, state: UpdateState) => callback(state)
    ipcRenderer.on('updater:state', handler)
    return () => { ipcRenderer.removeListener('updater:state', handler) }
  },

  // Horizon (Java 26.3 на Rust)
  horizonStatus: (): Promise<HorizonState> => ipcRenderer.invoke('horizon:status'),
  horizonCheckUpdate: (): Promise<HorizonState> => ipcRenderer.invoke('horizon:check-update'),
  horizonInstall: (): Promise<HorizonState> => ipcRenderer.invoke('horizon:install'),
  horizonVersions: (): Promise<HorizonVersion[]> => ipcRenderer.invoke('horizon:versions'),
  horizonInstallGame: (tag: string): Promise<HorizonState> => ipcRenderer.invoke('horizon:install-game', tag),
  horizonPrepare: (options: { download?: boolean; version?: string }): Promise<HorizonState> =>
    ipcRenderer.invoke('horizon:prepare', options),
  horizonSetMinecraftDir: (): Promise<HorizonState | null> => ipcRenderer.invoke('horizon:set-minecraft-dir'),
  horizonSignIn: (): Promise<boolean> => ipcRenderer.invoke('horizon:sign-in'),
  horizonOffline: (name: string): Promise<HorizonState> => ipcRenderer.invoke('horizon:offline', name),
  horizonPlay: (version?: string) => ipcRenderer.invoke('horizon:play', version),
  horizonStop: (): Promise<boolean> => ipcRenderer.invoke('horizon:stop'),

  // Subscriptions
  onHorizonState: (callback: (state: HorizonState) => void) => {
    const handler = (_event: unknown, state: HorizonState) => callback(state)
    ipcRenderer.on('horizon:state', handler)
    return () => { ipcRenderer.removeListener('horizon:state', handler) }
  },
  onHorizonProgress: (callback: (progress: HorizonProgress) => void) => {
    const handler = (_event: unknown, progress: HorizonProgress) => callback(progress)
    ipcRenderer.on('horizon:progress', handler)
    return () => { ipcRenderer.removeListener('horizon:progress', handler) }
  },
  onHorizonLog: (callback: (line: string) => void) => {
    const handler = (_event: unknown, line: string) => callback(line)
    ipcRenderer.on('horizon:log', handler)
    return () => { ipcRenderer.removeListener('horizon:log', handler) }
  },
  onHorizonAuth: (callback: (auth: HorizonAuth) => void) => {
    const handler = (_event: unknown, auth: HorizonAuth) => callback(auth)
    ipcRenderer.on('horizon:auth', handler)
    return () => { ipcRenderer.removeListener('horizon:auth', handler) }
  },
  onLaunchProgress: (callback: (data: LaunchProgress) => void) => {
    const handler = (_event: unknown, data: LaunchProgress) => callback(data)
    ipcRenderer.on('launch-progress', handler)
    return () => { ipcRenderer.removeListener('launch-progress', handler) }
  },
  onGameLog: (callback: (data: GameLog) => void) => {
    const handler = (_event: unknown, data: GameLog) => callback(data)
    ipcRenderer.on('game-log', handler)
    return () => { ipcRenderer.removeListener('game-log', handler) }
  },
  onDeepLinkResult: (callback: (data: DeepLinkResult) => void) => {
    const handler = (_event: unknown, data: DeepLinkResult) => callback(data)
    ipcRenderer.on('deep-link:result', handler)
    return () => { ipcRenderer.removeListener('deep-link:result', handler) }
  },
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)

declare global {
  interface Window {
    electronAPI: typeof electronAPI
  }
}
