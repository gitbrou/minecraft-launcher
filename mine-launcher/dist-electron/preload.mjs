"use strict";
const electron = require("electron");
const electronAPI = {
  // Window controls
  minimizeWindow: () => electron.ipcRenderer.invoke("minimize-window"),
  maximizeWindow: () => electron.ipcRenderer.invoke("maximize-window"),
  closeWindow: () => electron.ipcRenderer.invoke("close-window"),
  isMaximized: () => electron.ipcRenderer.invoke("is-maximized"),
  // Accounts
  getAccounts: () => electron.ipcRenderer.invoke("get-accounts"),
  addAccount: (username) => electron.ipcRenderer.invoke("add-account", username),
  setActiveAccount: (id) => electron.ipcRenderer.invoke("set-active-account", id),
  deleteAccount: (id) => electron.ipcRenderer.invoke("delete-account", id),
  // Instances
  getInstances: () => electron.ipcRenderer.invoke("get-instances"),
  createInstance: (data) => electron.ipcRenderer.invoke("create-instance", data),
  renameInstance: (payload) => electron.ipcRenderer.invoke("rename-instance", payload),
  deleteInstance: (id) => electron.ipcRenderer.invoke("delete-instance", id),
  openInstanceFolder: (id) => electron.ipcRenderer.invoke("open-instance-folder", id),
  // Versions
  getVersions: () => electron.ipcRenderer.invoke("get-versions"),
  // Settings & Java
  getSettings: () => electron.ipcRenderer.invoke("get-settings"),
  saveSettings: (settings) => electron.ipcRenderer.invoke("save-settings", settings),
  setSelectedInstanceId: (instanceId) => electron.ipcRenderer.invoke("set-selected-instance-id", instanceId),
  detectJava: () => electron.ipcRenderer.invoke("detect-java"),
  getRequiredJava: (version) => electron.ipcRenderer.invoke("get-required-java", version),
  getSystemInfo: () => electron.ipcRenderer.invoke("get-system-info"),
  openLauncherFolder: () => electron.ipcRenderer.invoke("open-launcher-folder"),
  // Launching
  launchInstance: (id) => electron.ipcRenderer.invoke("launch-instance", id),
  stopInstance: (id) => electron.ipcRenderer.invoke("stop-instance", id),
  restoreWindow: () => electron.ipcRenderer.invoke("restore-window"),
  // Mods
  getInstanceMods: (id) => electron.ipcRenderer.invoke("get-instance-mods", id),
  toggleMod: (payload) => electron.ipcRenderer.invoke("toggle-mod", payload),
  deleteMod: (payload) => electron.ipcRenderer.invoke("delete-mod", payload),
  downloadModFile: (payload) => electron.ipcRenderer.invoke("download-mod-file", payload),
  addModFile: (instanceId) => electron.ipcRenderer.invoke("add-mod-file", instanceId),
  // Skins & Profile
  uploadUserSkin: (username) => electron.ipcRenderer.invoke("upload-user-skin", username),
  fetchOnlineSkin: (payload) => electron.ipcRenderer.invoke("fetch-online-skin", payload),
  getUserSkin: (username) => electron.ipcRenderer.invoke("get-user-skin", username),
  getAccountHead: (username) => electron.ipcRenderer.invoke("get-account-head", username),
  getProfileStats: (username) => electron.ipcRenderer.invoke("get-profile-stats", username),
  // Subscriptions
  onLaunchProgress: (callback) => {
    const handler = (_, data) => callback(data);
    electron.ipcRenderer.on("launch-progress", handler);
    return () => electron.ipcRenderer.removeListener("launch-progress", handler);
  },
  onGameLog: (callback) => {
    const handler = (_, data) => callback(data);
    electron.ipcRenderer.on("game-log", handler);
    return () => electron.ipcRenderer.removeListener("game-log", handler);
  }
};
electron.contextBridge.exposeInMainWorld("electronAPI", electronAPI);
