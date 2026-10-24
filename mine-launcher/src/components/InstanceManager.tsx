import { useState, useEffect } from 'react'
import { Instance, ModItem, LaunchProgress, GameLog, MinecraftVersion } from '../types'
import { ProfileTab } from './ProfileTab'

interface InstanceManagerProps {
  instances: Instance[]
  selectedInstance: Instance | null
  activeUsername: string
  launchProgress: LaunchProgress | null
  onSelectInstance: (instance: Instance) => void
  onCreateInstance: (data: { name: string; version: string; loader: 'vanilla' | 'fabric' | 'quilt' }) => Promise<void>
  onRenameInstance: (id: string, name: string) => void
  onDeleteInstance: (id: string) => void
  onOpenSettings: () => void
  onOpenModDownloader: () => void
  logs: GameLog[]
}

const IconBox = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="m7.298 9.999l-2.947 1.558a.5.5 0 0 0 0 .884l7.182 3.796a1 1 0 0 0 .934 0l7.182-3.796a.5.5 0 0 0 0-.884l-2.948-1.558m-9.403 4l-2.947 1.558a.5.5 0 0 0 0 .884l7.182 3.796a1 1 0 0 0 .934 0l7.182-3.796a.5.5 0 0 0 0-.884l-2.948-1.558M4.352 8.44l7.182 3.796a1 1 0 0 0 .934 0L19.65 8.44a.5.5 0 0 0 0-.884L12.467 3.76a1 1 0 0 0-.934 0L4.35 7.557a.5.5 0 0 0 0 .884Z" />
  </svg>
)

const IconMods = () => (
  <svg width="16" height="16" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m4.83 13.661l17.6 10.161v20.196L4.83 33.857z" />
    <path d="m22.43 3.5l17.599 10.161l-17.6 10.161l-17.6-10.16zm7.517 36.177l-7.518 4.34V23.823h0l17.6-10.16v18.382" />
  </svg>
)

const IconProfile = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <g fillRule="evenodd" clipRule="evenodd">
      <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
      <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.99 8.99 0 0 1 12.065 14a8.98 8.98 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.96 8.96 0 0 1-5.672-2.012A6.99 6.99 0 0 1 12.065 16a6.99 6.99 0 0 1 5.689 2.92A8.96 8.96 0 0 1 12 21" />
    </g>
  </svg>
)

const IconLogs = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h.01M4 6h.01M4 18h.01M8 18h2m-2-6h2M8 6h2m4 0h6m-6 6h6m-6 6h6" />
  </svg>
)

const IconFolder = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h6l2 2h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20z" />
  </svg>
)

const IconSettings = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zM11 20h1.975l.35-2.65q.775-.2 1.438-.587t1.212-.938l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12t-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587zm1.05-4.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5M12 12" />
  </svg>
)

const IconPlus = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
  </svg>
)

const IconTrash = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16M6 6v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6M9 3h6v3H9zM10 11v6M14 11v6" />
  </svg>
)

const IconPen = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 20h4L19 9a2.828 2.828 0 1 0-4-4L4 16v4zM13.5 6.5l4 4" />
  </svg>
)

const IconSearch = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20l-3-3" />
  </svg>
)

const IconPackage = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.5 7.278L12 12l-8.5-4.722m0 0a2 2 0 0 1 .978-1.698l6.543-3.92c.601-.359 1.459-.36 2.061.002l6.538 3.918a2 2 0 0 1 .98 1.698v9.444c0 .68-.365 1.31-.978 1.698l-6.543 3.92c-.601.359-1.459.36-2.061.002l-6.538-3.918a2 2 0 0 1-.98-1.698zM12 22V12" />
  </svg>
)

export const InstanceManager: React.FC<InstanceManagerProps> = ({
  instances,
  selectedInstance,
  activeUsername,
  launchProgress,
  onSelectInstance,
  onCreateInstance,
  onRenameInstance,
  onDeleteInstance,
  onOpenSettings,
  onOpenModDownloader,
  logs
}) => {
  const [activeTab, setActiveTab] = useState<'versions' | 'mods' | 'profile' | 'logs'>('versions')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [modsList, setModsList] = useState<ModItem[]>([])
  const [modsLoading, setModsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameText, setRenameText] = useState('')
  const [copyNotice, setCopyNotice] = useState('')

  useEffect(() => {
    if (activeTab === 'mods' && selectedInstance && window.electronAPI) {
      setModsLoading(true)
      window.electronAPI.getInstanceMods(selectedInstance.id)
        .then(setModsList)
        .finally(() => setModsLoading(false))
    }
  }, [activeTab, selectedInstance?.id])

  const refreshMods = () => {
    if (selectedInstance && window.electronAPI) {
      window.electronAPI.getInstanceMods(selectedInstance.id).then(setModsList)
    }
  }

  const handleToggleMod = (modFilename: string) => {
    if (selectedInstance && window.electronAPI) {
      window.electronAPI.toggleMod({ instanceId: selectedInstance.id, modFilename }).then(refreshMods)
    }
  }

  const handleDeleteMod = (modFilename: string) => {
    if (selectedInstance && window.electronAPI) {
      window.electronAPI.deleteMod({ instanceId: selectedInstance.id, modFilename }).then(refreshMods)
    }
  }

  const handleAddModFile = () => {
    if (selectedInstance && window.electronAPI) {
      window.electronAPI.addModFile(selectedInstance.id).then((ok: any) => { if (ok) refreshMods() })
    }
  }

  const handleOpenFolder = () => {
    if (selectedInstance && window.electronAPI) {
      window.electronAPI.openInstanceFolder(selectedInstance.id)
    }
  }

  const handleCopyLogs = () => {
    const text = logs.map(l => `[${new Date(l.timestamp).toLocaleTimeString()}] ${l.message}`).join('\n')
    navigator.clipboard.writeText(text)
    setCopyNotice('Скопировано')
    setTimeout(() => setCopyNotice(''), 2000)
  }

  const commitRename = () => {
    if (renamingId && renameText.trim()) onRenameInstance(renamingId, renameText.trim())
    setRenamingId(null)
    setRenameText('')
  }

  const isGameRunning = launchProgress?.stage === 'running'

  const filteredInstances = instances.filter(inst =>
    !searchQuery ||
    inst.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    inst.version.includes(searchQuery)
  )

  if (instances.length === 0 && activeTab === 'versions') {
    return (
      <>
        <EmptyOnboarding onCreate={() => setShowCreateModal(true)} />
        {showCreateModal && (
          <CreateInstanceModal
            onClose={() => setShowCreateModal(false)}
            onSubmit={(data) => {
              onCreateInstance(data).then(() => setShowCreateModal(false)).catch(() => {})
            }}
          />
        )}
      </>
    )
  }

  return (
    <>
      {/* Toolbar */}
      <div className="content-toolbar">
        <div className="content-tabs">
          <button className={`content-tab ${activeTab === 'versions' ? 'active' : ''}`} onClick={() => setActiveTab('versions')}>
            <IconBox /> Сборки
          </button>
          <button
            className={`content-tab ${activeTab === 'mods' ? 'active' : ''}`}
            onClick={() => setActiveTab('mods')}
            disabled={!selectedInstance}
            style={{ opacity: selectedInstance ? 1 : 0.4 }}
          >
            <IconMods /> Моды
          </button>
          <button
            className={`content-tab ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
            disabled={!activeUsername}
            style={{ opacity: activeUsername ? 1 : 0.4 }}
          >
            <IconProfile /> Профиль
          </button>
          <button className={`content-tab ${activeTab === 'logs' ? 'active' : ''}`} onClick={() => setActiveTab('logs')}>
            <IconLogs /> Логи
          </button>
        </div>

        <div className="toolbar-actions">
          {activeTab === 'versions' && (
            <div className="search-bar">
              <IconSearch />
              <input
                type="text"
                placeholder="Поиск сборок..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}

          {selectedInstance && (
            <button className="btn btn-ghost btn-icon" title="Открыть папку сборки" onClick={handleOpenFolder}>
              <IconFolder />
            </button>
          )}
          <button className="btn btn-ghost btn-icon" title="Настройки лаунчера" onClick={onOpenSettings}>
            <IconSettings />
          </button>
          <button className="btn btn-primary" title="Создать сборку" onClick={() => setShowCreateModal(true)}>
            <IconPlus /> Новая сборка
          </button>
        </div>
      </div>

      {/* Tab content */}
      {activeTab === 'versions' && (
        <div className="card-grid">
          {filteredInstances.map((inst) => (
            <div
              key={inst.id}
              className={`instance-card ${selectedInstance?.id === inst.id ? 'selected' : ''}`}
              onClick={() => onSelectInstance(inst)}
            >
              <div className="instance-card-top">
                {renamingId === inst.id ? (
                  <input
                    className="form-input"
                    style={{ padding: '4px 8px', fontSize: '14px' }}
                    autoFocus
                    value={renameText}
                    onChange={(e) => setRenameText(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') commitRename()
                      if (e.key === 'Escape') setRenamingId(null)
                    }}
                    onBlur={commitRename}
                    onClick={(e) => e.stopPropagation()}
                  />
                ) : (
                  <div
                    className="instance-name"
                    onDoubleClick={(e) => {
                      e.stopPropagation()
                      setRenamingId(inst.id)
                      setRenameText(inst.name)
                    }}
                    title="Двойной клик — переименовать"
                  >
                    {inst.name}
                  </div>
                )}
                <span className={`loader-badge ${inst.loader}`}>{inst.loader}</span>
              </div>

              <span className="version-pill" style={{ alignSelf: 'flex-start' }}>MC {inst.version}</span>

              <div className="instance-card-meta">
                <span>{inst.lastPlayed ? new Date(inst.lastPlayed).toLocaleDateString() : 'Не запускалась'}</span>
                {!isGameRunning && (
                  <div className="instance-card-actions" onClick={(e) => e.stopPropagation()}>
                    <button
                      className="icon-btn"
                      title="Переименовать"
                      onClick={() => { setRenamingId(inst.id); setRenameText(inst.name) }}
                    >
                      <IconPen />
                    </button>
                    <button
                      className="icon-btn danger"
                      title="Удалить сборку"
                      onClick={() => onDeleteInstance(inst.id)}
                    >
                      <IconTrash />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'mods' && selectedInstance && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          {selectedInstance.loader === 'vanilla' && (
            <div className="status-banner info" style={{ marginBottom: '10px', padding: '10px 14px', borderRadius: '10px' }}>
              Это Vanilla-сборка — моды в игре не загрузятся. Для модов создайте сборку Fabric или Quilt.
            </div>
          )}

          <div style={{ display: 'flex', gap: '10px', marginBottom: '12px' }}>
            <button className="btn btn-primary" onClick={onOpenModDownloader}>
              <IconMods /> Моды из Modrinth
            </button>
            <button className="btn" onClick={handleAddModFile}>
              <IconPlus /> Файл .jar
            </button>
          </div>

          {modsLoading ? (
            <div className="empty-state"><div className="spinner" /></div>
          ) : modsList.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-icon"><IconMods /></div>
              <div className="empty-state-title">Модов нет</div>
              <div className="empty-state-text">
                Скачайте моды из каталога Modrinth или добавьте свой .jar файл.
              </div>
            </div>
          ) : (
            <div className="list-rows">
              {modsList.map((mod) => (
                <div key={mod.id} className="row-item">
                  <div className="row-item-icon"><IconMods /></div>
                  <div className="row-item-main">
                    <div className="row-item-title" style={{ textDecoration: mod.enabled ? 'none' : 'line-through', color: mod.enabled ? 'var(--text)' : 'var(--text-faint)' }}>
                      {mod.name}
                    </div>
                    <div className="row-item-sub">
                      {(mod.size / 1024 / 1024).toFixed(1)} МБ
                    </div>
                  </div>
                  <div className="row-item-actions">
                    <button
                      className={`toggle-chip ${mod.enabled ? 'on' : ''}`}
                      onClick={() => handleToggleMod(mod.filename)}
                    >
                      {mod.enabled ? 'Включён' : 'Отключён'}
                    </button>
                    <button className="icon-btn danger" onClick={() => handleDeleteMod(mod.filename)} title="Удалить мод">
                      <IconTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {activeTab === 'profile' && activeUsername && (
        <ProfileTab activeUsername={activeUsername} />
      )}

      {activeTab === 'logs' && (
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px', alignItems: 'center', gap: '10px' }}>
            {copyNotice && <span style={{ color: 'var(--accent)', fontSize: '12px' }}>{copyNotice}</span>}
            <button className="btn" onClick={handleCopyLogs} disabled={logs.length === 0}>
              Скопировать логи
            </button>
          </div>
          <div className="log-view">
            {logs.length === 0 ? (
              <span style={{ color: 'var(--text-faint)' }}>Логи пусты. Нажмите «Играть», чтобы запустить Minecraft.</span>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} className={`log-line ${log.type === 'error' ? 'error' : log.type === 'warn' ? 'warn' : ''}`}>
                  <span className="log-time">[{new Date(log.timestamp).toLocaleTimeString()}]</span>{log.message}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {showCreateModal && (
        <CreateInstanceModal
          onClose={() => setShowCreateModal(false)}
          onSubmit={(data) => {
            onCreateInstance(data).then(() => setShowCreateModal(false)).catch(() => {})
          }}
        />
      )}
    </>
  )
}

// ───────────────── Create instance modal ─────────────────
const CreateInstanceModal: React.FC<{
  onClose: () => void
  onSubmit: (data: { name: string; version: string; loader: 'vanilla' | 'fabric' | 'quilt' }) => void
}> = ({ onClose, onSubmit }) => {
  const [loader, setLoader] = useState<'vanilla' | 'fabric' | 'quilt'>('vanilla')
  const [version, setVersion] = useState('')
  const [name, setName] = useState('')
  const [versions, setVersions] = useState<MinecraftVersion[]>([])
  const [loadingVersions, setLoadingVersions] = useState(true)
  const [searchText, setSearchText] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getVersions().then((m: any) => setVersions(m?.versions || [])).finally(() => setLoadingVersions(false))
    } else {
      setLoadingVersions(false)
    }
  }, [])

  useEffect(() => {
    const releases = versions.filter(v => v.type === 'release')
    if (!version && releases.length > 0) setVersion(releases[0].id)
  }, [versions])

  const isOpenSearch = searchText.trim() !== ''
  const listedVersions = isOpenSearch
    ? versions.filter(v => v.id.toLowerCase().includes(searchText.toLowerCase())).slice(0, 250)
    : versions.filter(v => v.type === 'release').slice(0, 30)

  const handleSubmit = () => {
    if (!version) {
      setError('Выберите версию Minecraft')
      return
    }
    onSubmit({ name: name.trim() || version, version, loader })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" style={{ width: '460px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Новая сборка</span>
          <button className="modal-close" onClick={onClose}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="modal-body">
          <div className="form-row">
            <span className="form-label">Загрузчик</span>
            <div className="loader-tabs">
              <button className={`loader-tab ${loader === 'vanilla' ? 'active' : ''}`} onClick={() => setLoader('vanilla')}>Vanilla</button>
              <button className={`loader-tab ${loader === 'fabric' ? 'active' : ''}`} onClick={() => setLoader('fabric')}>Fabric</button>
              <button className={`loader-tab ${loader === 'quilt' ? 'active' : ''}`} onClick={() => setLoader('quilt')}>Quilt</button>
              <button className="loader-tab" disabled title="Скоро">Forge (скоро)</button>
            </div>
            {loader !== 'vanilla' && (
              <span className="form-hint">Fabric и Quilt позволяют устанавливать моды через вкладку «Моды».</span>
            )}
          </div>

          <div className="form-row">
            <span className="form-label">Название сборки</span>
            <input
              className="form-input"
              placeholder="Например: Выживание с модами"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={40}
            />
          </div>

          <div className="form-row">
            <span className="form-label">Версия Minecraft</span>
            <div className="search-bar" style={{ width: '100%', marginBottom: '8px' }}>
              <IconSearch />
              <input
                placeholder="Поиск версии (например, 1.20, 1.8.9...)"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
              />
            </div>
            <div className="version-picker-list">
              {loadingVersions ? (
                <div style={{ padding: '20px', textAlign: 'center' }}><div className="spinner" style={{ margin: '0 auto' }} /></div>
              ) : listedVersions.length === 0 ? (
                <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-faint)' }}>
                  Ничего не найдено
                </div>
              ) : (
                listedVersions.map(v => (
                  <div key={v.id} className={`version-picker-row ${version === v.id ? 'selected' : ''}`} onClick={() => setVersion(v.id)}>
                    <span className="selector-item-name">{v.id}</span>
                    <span className="selector-item-meta">
                      {v.type === 'release' ? new Date(v.releaseTime).getFullYear() : v.type}
                    </span>
                  </div>
                ))
              )}
            </div>
            <span className="form-hint">Без поиска показаны последние релизы. Старые версии и снапшоты — через поиск.</span>
          </div>

          {error && <div className="form-error">{error}</div>}
        </div>

        <div className="modal-footer">
          <button className="btn" onClick={onClose}>Отмена</button>
          <button className="btn btn-primary" onClick={handleSubmit} disabled={loadingVersions || !version}>
            Создать сборку
          </button>
        </div>
      </div>
    </div>
  )
}

// ───────────────── Onboarding empty state ─────────────────
const EmptyOnboarding: React.FC<{ onCreate: () => void }> = ({ onCreate }) => (
  <div className="empty-state" style={{ padding: '80px 40px' }}>
    <div className="empty-state-icon"><IconPackage /></div>
    <div className="empty-state-title">Пока нет сборок</div>
    <div className="empty-state-text">
      Создайте свою первую сборку — выберите версию Minecraft и загрузчик (Fabric или Quilt для модов).
      Лаунчер сам скачает игру, библиотеки и нужную Java при первом запуске.
    </div>
    <button className="btn btn-primary" style={{ marginTop: '10px' }} onClick={onCreate}>
      <IconPlus /> Создать сборку
    </button>
  </div>
)
