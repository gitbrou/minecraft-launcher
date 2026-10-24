import { useState, useEffect, useRef } from 'react'
import { Account, Instance, LaunchProgress, GameLog, LauncherSettings } from './types'
import { TitleBar } from './components/TitleBar'
import { Sidebar, NavSection } from './components/Sidebar'
import { InstanceManager } from './components/InstanceManager'
import { BottomBar } from './components/BottomBar'
import { SettingsModal } from './components/SettingsModal'
import { ModDownloaderModal } from './components/ModDownloaderModal'

export function App() {
  const [accounts, setAccounts] = useState<Account[]>([])
  const [instances, setInstances] = useState<Instance[]>([])
  const [selectedInstance, setSelectedInstance] = useState<Instance | null>(null)
  const [launchProgress, setLaunchProgress] = useState<LaunchProgress | null>(null)
  const [logs, setLogs] = useState<GameLog[]>([])
  const logBufferRef = useRef<GameLog[]>([])
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [isModDownloaderOpen, setIsModDownloaderOpen] = useState(false)
  const [isBooted, setIsBooted] = useState(false)
  const [updateState, setUpdateState] = useState<any>(null)
  const [navSection, setNavSection] = useState<NavSection>('builds')
  const [modsRefreshKey, setModsRefreshKey] = useState(0)
  const [toast, setToast] = useState('')

  useEffect(() => {
    if (!toast) return
    const timer = setTimeout(() => setToast(''), 4500)
    return () => clearTimeout(timer)
  }, [toast])

  useEffect(() => {
    if (!window.electronAPI) return

    Promise.all([
      window.electronAPI.getAccounts(),
      window.electronAPI.getInstances(),
      window.electronAPI.getSettings()
    ]).then(([accs, insts, stg]) => {
      setAccounts(accs)
      setInstances(insts)
      if (insts.length > 0) {
        const saved = stg?.selectedInstanceId ? insts.find((i: Instance) => i.id === stg.selectedInstanceId) : null
        setSelectedInstance(saved || insts[0])
      }
      setIsBooted(true)
    }).catch(() => setIsBooted(true))

    const unsubscribeProgress = window.electronAPI.onLaunchProgress((data: LaunchProgress) => {
      setLaunchProgress(data)
      if (data?.stage === 'running') {
        setInstances((prev: Instance[]) => prev.map(i =>
          i.id === data.instanceId ? { ...i, lastPlayed: Date.now() } : i
        ))
      }
    })
    const unsubscribeLogs = window.electronAPI.onGameLog((data: GameLog) => {
      // Не ре-рендерим App на каждую строку stdout: копим и флашим пачкой
      logBufferRef.current.push(data)
    })
    // 250 мс — компромисс между «живым» логом и отсутствием шторма ре-рендеров
    const logFlushTimer = setInterval(() => {
      if (logBufferRef.current.length === 0) return
      const pending = logBufferRef.current
      logBufferRef.current = []
      setLogs((prev) => [...prev, ...pending].slice(-300))
    }, 250)
    const unsubscribeUpdate = window.electronAPI.onUpdateState?.((state: any) => setUpdateState(state))

    return () => {
      unsubscribeProgress()
      unsubscribeLogs()
      unsubscribeUpdate?.()
      clearInterval(logFlushTimer)
    }
  }, [])

  const handleSelectInstance = (instance: Instance) => {
    setSelectedInstance(instance)
    if (window.electronAPI) {
      window.electronAPI.setSelectedInstanceId(instance.id)
    }
  }

  // Accounts
  const handleSelectAccount = (id: string) => {
    if (window.electronAPI) {
      window.electronAPI.setActiveAccount(id).then(setAccounts)
    }
  }

  const handleAddAccount = (username: string) => {
    if (window.electronAPI) {
      return window.electronAPI.addAccount(username).then((next: Account[]) => {
        setAccounts(next)
      })
    }
    return Promise.reject(new Error('electronAPI недоступен'))
  }

  const handleDeleteAccount = (id: string) => {
    if (window.electronAPI) {
      window.electronAPI.deleteAccount(id).then(setAccounts)
    }
  }

  // Instances
  const handleCreateInstance = (data: { name: string; version: string; loader: 'vanilla' | 'fabric' | 'quilt' }) => {
    if (window.electronAPI) {
      return window.electronAPI.createInstance(data).then((next: Instance[]) => {
        setInstances(next)
        const created = next.find((i) => i.name === data.name)
        if (created) handleSelectInstance(created)
      })
    }
    return Promise.reject(new Error('electronAPI недоступен'))
  }

  const handleRenameInstance = (id: string, name: string) => {
    if (window.electronAPI) {
      window.electronAPI.renameInstance({ id, name }).then((next: Instance[]) => {
        setInstances(next)
        setSelectedInstance(prev => prev && prev.id === id ? { ...prev, name } : prev)
      })
    }
  }

  const handleDeleteInstance = (id: string) => {
    if (window.electronAPI) {
      window.electronAPI.deleteInstance(id).then((updated: Instance[]) => {
        setInstances(updated)
        if (selectedInstance?.id === id) {
          setSelectedInstance(updated[0] || null)
        }
      })
    }
  }

  // Экспорт / импорт сборок
  const handleExportInstance = async (instance: Instance) => {
    try {
      const result = await window.electronAPI.exportInstance(instance.id)
      if (result?.ok) setToast(`Сборка «${instance.name}» сохранена в zip`)
    } catch (err: any) {
      setToast(err?.message || 'Не удалось экспортировать сборку')
    }
  }

  const handleImportInstance = async () => {
    try {
      const result = await window.electronAPI.importInstance()
      if (!result?.ok) return
      setInstances(result.instances)
      const imported = result.instances.find((i: Instance) => i.id === result.importedId)
      if (imported) handleSelectInstance(imported)
      setToast(`Импортирована сборка «${imported?.name || 'без названия'}»`)
    } catch (err: any) {
      setToast(err?.message || 'Не удалось импортировать сборку')
    }
  }

  // Launch — принимает необязательную сборку (quick-play с карточки)
  const handleLaunch = (instance?: Instance) => {
    const target = instance || selectedInstance
    if (!target) return
    const targetId = target.id
    if (window.electronAPI) {
      setLogs([])
      logBufferRef.current = []
      window.electronAPI.launchInstance(targetId).catch((err: Error) => {
        setLaunchProgress({
          instanceId: targetId,
          stage: 'error',
          statusText: `Ошибка: ${err.message}`,
          progress: 0,
          error: err.message
        })
      })
    }
  }

  const handleStopGame = () => {
    if (selectedInstance && window.electronAPI) {
      window.electronAPI.stopInstance(selectedInstance.id)
    }
  }

  const handleSaveSettings = (newSettings: Partial<LauncherSettings>) => {
    if (window.electronAPI) {
      window.electronAPI.saveSettings(newSettings)
    }
  }

  if (!isBooted) {
    return (
      <>
        <TitleBar />
        <div className="boot-splash">
          <div className="spinner large" />
          <div>Загрузка лаунчера...</div>
        </div>
      </>
    )
  }

  const updateBannerText =
    updateState?.status === 'checking' ? 'Проверка обновлений...'
    : updateState?.status === 'available' ? 'Найдено обновление — скачивание...'
    : updateState?.status === 'downloading' ? `Скачивание обновления… ${Math.round(updateState.percent || 0)}%`
    : updateState?.status === 'downloaded' ? 'Обновление загружено — установится при выходе'
    : updateState?.status === 'error' ? `Ошибка обновления: ${updateState.message || ''}`
    : null

  return (
    <>
      <TitleBar />

      {toast && (
        <div className="app-toast" role="status" aria-live="polite">{toast}</div>
      )}

      {updateBannerText && (
        <div className="update-banner" role="status" aria-live="polite">
          <div className="update-banner-left">
            {updateState.status !== 'downloaded' && (
              <div className="spinner" style={{ width: 14, height: 14, borderBottomWidth: 2, borderLeftWidth: 2, borderRightWidth: 2, borderTopWidth: 2 }} />
            )}
            <span className="update-banner-text">{updateBannerText}</span>
          </div>
          <div className="update-banner-actions">
            {updateState.status === 'downloading' && (
              <>
                <div className="update-progress-bar" aria-hidden="true">
                  <div className="update-progress-fill" style={{ width: `${Math.min(100, Math.max(0, updateState.percent || 0))}%` }} />
                </div>
                <span className="update-percent">{Math.round(updateState.percent || 0)}%</span>
              </>
            )}
            {updateState.status === 'downloaded' && (
              <button
                className="btn btn-primary"
                style={{ padding: '5px 12px', fontSize: '12px' }}
                onClick={() => window.electronAPI.installUpdate?.()}
              >
                Перезапустить и обновить
              </button>
            )}
          </div>
        </div>
      )}

      <div className="app-shell">
        <Sidebar
          accounts={accounts}
          activeSection={navSection}
          hasSelectedInstance={!!selectedInstance}
          hasActiveUsername={!!accounts.find((a) => a.isActive)?.username}
          onSelectAccount={handleSelectAccount}
          onAddAccount={handleAddAccount}
          onDeleteAccount={handleDeleteAccount}
          onNavigate={(section) => setNavSection(section)}
          onOpenSettings={() => setIsSettingsOpen(true)}
        />

        <main className="main-content">
          <div className="content-area">
            <InstanceManager
              section={navSection}
              instances={instances}
              selectedInstance={selectedInstance}
              activeUsername={accounts.find((a) => a.isActive)?.username || ''}
              modsRefreshKey={modsRefreshKey}
              launchProgress={launchProgress}
              onSelectInstance={handleSelectInstance}
              onQuickPlay={(inst) => handleLaunch(inst)}
              onExportInstance={handleExportInstance}
              onImportInstance={handleImportInstance}
              onCreateInstance={handleCreateInstance}
              onRenameInstance={handleRenameInstance}
              onDeleteInstance={handleDeleteInstance}
              onOpenModDownloader={() => setIsModDownloaderOpen(true)}
              logs={logs}
            />
          </div>

          <BottomBar
            instances={instances}
            selectedInstance={selectedInstance}
            hasAccount={accounts.length > 0}
            onSelectInstance={handleSelectInstance}
            onLaunch={handleLaunch}
            onStop={handleStopGame}
            launchProgress={launchProgress}
          />
        </main>
      </div>

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSave={handleSaveSettings}
      />

      {selectedInstance && (
        <ModDownloaderModal
          isOpen={isModDownloaderOpen}
          instanceId={selectedInstance.id}
          gameVersion={selectedInstance.version}
          loader={selectedInstance.loader}
          onClose={() => setIsModDownloaderOpen(false)}
          onModInstalled={() => setModsRefreshKey((k) => k + 1)}
        />
      )}
    </>
  )
}

export default App
