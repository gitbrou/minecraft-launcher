import { useState, useEffect } from 'react'
import { Account, Instance, LaunchProgress, GameLog, LauncherSettings } from './types'
import { TitleBar } from './components/TitleBar'
import { AccountsPanel } from './components/AccountsPanel'
import { BottomBar } from './components/BottomBar'
import { InstanceManager } from './components/InstanceManager'
import { SettingsModal } from './components/SettingsModal'
import { ModDownloaderModal } from './components/ModDownloaderModal'

export function App() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [instances, setInstances] = useState<Instance[]>([])
  const [selectedInstance, setSelectedInstance] = useState<Instance | null>(null)
  const [launchProgress, setLaunchProgress] = useState<LaunchProgress | null>(null)
  const [logs, setLogs] = useState<GameLog[]>([])
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isModDownloaderOpen, setIsModDownloaderOpen] = useState(false)

  // Load initial data from Main Process via IPC
  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getAccounts().then((accs) => {
        setAccounts(accs)
      })

      Promise.all([
        window.electronAPI.getInstances(),
        window.electronAPI.getSettings()
      ]).then(([insts, stg]) => {
        setInstances(insts)
        if (insts.length > 0) {
          const savedInst = stg?.selectedInstanceId ? insts.find((i: Instance) => i.id === stg.selectedInstanceId) : null
          setSelectedInstance(savedInst || insts[0])
        }
      })

      // Subscribe to real-time progress & logs from main process
      const unsubscribeProgress = window.electronAPI.onLaunchProgress((data) => {
        setLaunchProgress(data)
      })

      const unsubscribeLogs = window.electronAPI.onGameLog((data) => {
        setLogs((prev) => [...prev.slice(-200), data])
      })

      return () => {
        unsubscribeProgress()
        unsubscribeLogs()
      }
    }
  }, [])

  const handleSelectInstance = (instance: Instance) => {
    setSelectedInstance(instance)
    if (window.electronAPI) {
      window.electronAPI.setSelectedInstanceId(instance.id)
    }
  }

  // Accounts Handlers
  const handleSelectAccount = (id: string) => {
    if (window.electronAPI) {
      window.electronAPI.setActiveAccount(id).then(setAccounts)
    }
  }

  const handleAddAccount = (username: string) => {
    if (window.electronAPI) {
      window.electronAPI.addAccount(username).then(setAccounts)
    }
  }

  const handleDeleteAccount = (id: string) => {
    if (window.electronAPI) {
      window.electronAPI.deleteAccount(id).then(setAccounts)
    }
  }

  // Instance Handlers
  const handleCreateInstance = (data: { name: string; version: string; loader: 'vanilla' | 'fabric' | 'forge' | 'quilt' }) => {
    if (window.electronAPI) {
      window.electronAPI.createInstance(data).then((newInstances) => {
        setInstances(newInstances)
        const newlyCreated = newInstances.find((i: Instance) => i.name === data.name) || newInstances[newInstances.length - 1]
        if (newlyCreated) setSelectedInstance(newlyCreated)
      })
    }
  }

  const handleDeleteInstance = (id: string) => {
    if (window.electronAPI) {
      window.electronAPI.deleteInstance(id).then((updated) => {
        setInstances(updated)
        if (selectedInstance?.id === id) {
          setSelectedInstance(updated[0] || null)
        }
      })
    }
  }

  // Launch Handler
  const handleLaunch = () => {
    if (!selectedInstance) return
    if (window.electronAPI) {
      setLogs([])
      setLaunchProgress({
        instanceId: selectedInstance.id,
        stage: 'checking',
        statusText: 'Инициализация запуска...',
        progress: 5
      })
      window.electronAPI.launchInstance(selectedInstance.id).catch((err) => {
        setLaunchProgress({
          instanceId: selectedInstance.id,
          stage: 'error',
          statusText: `Ошибка: ${err.message}`,
          progress: 0,
          error: err.message
        })
      })
    }
  }

  const handleSaveSettings = (newSettings: Partial<LauncherSettings>) => {
    if (window.electronAPI) {
      window.electronAPI.saveSettings(newSettings)
    }
  }

  return (
    <>
      {/* Clean Custom TitleBar */}
      <TitleBar />

      <div className="app-container">
        {/* Left Sidebar: Accounts Panel matching Group.svg */}
        <AccountsPanel
          accounts={accounts}
          onSelectAccount={handleSelectAccount}
          onAddAccount={handleAddAccount}
          onDeleteAccount={handleDeleteAccount}
        />

        {/* Main Center Area: Instance Manager & Bottom Launch Bar */}
        <main className="main-content">
          <InstanceManager
            instances={instances}
            selectedInstance={selectedInstance}
            activeUsername={accounts.find((a) => a.isActive)?.username || 'Steve'}
            onSelectInstance={handleSelectInstance}
            onCreateInstance={handleCreateInstance}
            onDeleteInstance={handleDeleteInstance}
            onOpenSettings={() => setIsSettingsOpen(true)}
            onOpenModDownloader={() => setIsModDownloaderOpen(true)}
            logs={logs}
          />

          {/* Bottom Control Bar: Version Dropdown & Green Play Button */}
          <BottomBar
            instances={instances}
            selectedInstance={selectedInstance}
            onSelectInstance={handleSelectInstance}
            onLaunch={handleLaunch}
            launchProgress={launchProgress}
          />
        </main>

        {/* Settings Modal */}
        <SettingsModal
          isOpen={isSettingsOpen}
          onClose={() => setIsSettingsOpen(false)}
          onSave={handleSaveSettings}
        />

        {/* Mod Downloader Modal */}
        {selectedInstance && (
          <ModDownloaderModal
            isOpen={isModDownloaderOpen}
            instanceId={selectedInstance.id}
            gameVersion={selectedInstance.version}
            loader={selectedInstance.loader}
            onClose={() => setIsModDownloaderOpen(false)}
            onModInstalled={() => {}}
          />
        )}
      </div>
    </>
  )
}

export default App
