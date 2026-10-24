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
  DeepLinkResult
} from '../src/types'

const electronAPI = {
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
  stopInstance: (id: string) => ipcRenderer.invoke('stop-instance', id),
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

  // Subscriptions
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
