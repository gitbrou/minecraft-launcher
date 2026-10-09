import { ipcRenderer, contextBridge } from 'electron'

const electronAPI = {
  // Window controls
  minimizeWindow: () => ipcRenderer.invoke('minimize-window'),
  maximizeWindow: () => ipcRenderer.invoke('maximize-window'),
  closeWindow: () => ipcRenderer.invoke('close-window'),
  isMaximized: () => ipcRenderer.invoke('is-maximized'),

  // Accounts
  getAccounts: () => ipcRenderer.invoke('get-accounts'),
  addAccount: (username: string) => ipcRenderer.invoke('add-account', username),
  setActiveAccount: (id: string) => ipcRenderer.invoke('set-active-account', id),
  deleteAccount: (id: string) => ipcRenderer.invoke('delete-account', id),

  // Instances
  getInstances: () => ipcRenderer.invoke('get-instances'),
  createInstance: (data: { name: string; version: string; loader: string }) => ipcRenderer.invoke('create-instance', data),
  deleteInstance: (id: string) => ipcRenderer.invoke('delete-instance', id),
  openInstanceFolder: (id: string) => ipcRenderer.invoke('open-instance-folder', id),

  // Versions
  getVersions: () => ipcRenderer.invoke('get-versions'),

  // Settings & Java
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings: any) => ipcRenderer.invoke('save-settings', settings),
  setSelectedInstanceId: (instanceId: string) => ipcRenderer.invoke('set-selected-instance-id', instanceId),
  detectJava: () => ipcRenderer.invoke('detect-java'),

  // Launching
  launchInstance: (id: string) => ipcRenderer.invoke('launch-instance', id),
  stopInstance: (id: string) => ipcRenderer.invoke('stop-instance', id),

  // Mods
  getInstanceMods: (id: string) => ipcRenderer.invoke('get-instance-mods', id),
  toggleMod: (payload: { instanceId: string; modFilename: string }) => ipcRenderer.invoke('toggle-mod', payload),
  downloadModFile: (payload: { instanceId: string; downloadUrl: string; filename: string }) => ipcRenderer.invoke('download-mod-file', payload),
  addModFile: (instanceId: string) => ipcRenderer.invoke('add-mod-file', instanceId),

  // Skins & Profile
  saveUserSkin: (username: string) => ipcRenderer.invoke('upload-user-skin', username),
  uploadUserSkin: (username: string) => ipcRenderer.invoke('upload-user-skin', username),
  saveUserSkinBase64: (payload: { username: string; base64Data: string }) => ipcRenderer.invoke('save-user-skin-base64', payload),
  parseCommandSkin: (payload: { username: string; command: string }) => ipcRenderer.invoke('parse-command-skin', payload),
  fetchOnlineSkin: (payload: { username: string; targetUsername: string }) => ipcRenderer.invoke('fetch-online-skin', payload),
  getUserSkin: (username: string) => ipcRenderer.invoke('get-user-skin', username),
  getProfileStats: (username: string) => ipcRenderer.invoke('get-profile-stats', username),

  // Subscriptions
  onLaunchProgress: (callback: (data: any) => void) => {
    const handler = (_: any, data: any) => callback(data)
    ipcRenderer.on('launch-progress', handler)
    return () => ipcRenderer.removeListener('launch-progress', handler)
  },
  onGameLog: (callback: (data: any) => void) => {
    const handler = (_: any, data: any) => callback(data)
    ipcRenderer.on('game-log', handler)
    return () => ipcRenderer.removeListener('game-log', handler)
  }
}

contextBridge.exposeInMainWorld('electronAPI', electronAPI)

declare global {
  interface Window {
    electronAPI: typeof electronAPI
  }
}
