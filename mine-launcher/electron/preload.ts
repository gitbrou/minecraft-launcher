import { ipcRenderer, contextBridge } from 'electron'

const electronAPI = {
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
  detectJava: () => ipcRenderer.invoke('detect-java'),

  // Launching
  launchInstance: (id: string) => ipcRenderer.invoke('launch-instance', id),
  stopInstance: (id: string) => ipcRenderer.invoke('stop-instance', id),

  // Mods
  getInstanceMods: (id: string) => ipcRenderer.invoke('get-instance-mods', id),
  toggleMod: (payload: { instanceId: string; modFilename: string }) => ipcRenderer.invoke('toggle-mod', payload),
  addModFile: (instanceId: string) => ipcRenderer.invoke('add-mod-file', instanceId),

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
