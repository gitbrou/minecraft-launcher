import { useState, useEffect } from 'react'
import { Instance, ModItem, LaunchProgress, GameLog, MinecraftVersion } from '../types'
import { NavSection } from './Sidebar'
import { ProfileTab } from './ProfileTab'

interface InstanceManagerProps {
  section: NavSection
  instances: Instance[]
  selectedInstance: Instance | null
  activeUsername: string
  modsRefreshKey: number
  launchProgress: LaunchProgress | null
  onSelectInstance: (instance: Instance) => void
  onQuickPlay: (instance: Instance) => void
  onCreateInstance: (data: { name: string; version: string; loader: 'vanilla' | 'fabric' | 'quilt' }) => Promise<void>
  onRenameInstance: (id: string, name: string) => void
  onDeleteInstance: (id: string) => void
  onOpenModDownloader: () => void
  logs: GameLog[]
}

const IconMods = () => (
  <svg width="14" height="14" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m4.83 13.661l17.6 10.161v20.196L4.83 33.857z" />
    <path d="m22.43 3.5l17.599 10.161l-17.6 10.161l-17.6-10.16zm7.517 36.177l-7.518 4.34V23.823h0l17.6-10.16v18.382" />
  </svg>
)

const IconFolder = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h6l2 2h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20z" />
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

const IconPlay = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5.14v14l11-7-11-7z" />
  </svg>
)

const IconPackage = () => (
  <svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M20.5 7.278L12 12l-8.5-4.722m0 0a2 2 0 0 1 .978-1.698l6.543-3.92c.601-.359 1.459-.36 2.061.002l6.538 3.918a2 2 0 0 1 .98 1.698v9.444c0 .68-.365 1.31-.978 1.698l-6.543 3.92c-.601.359-1.459.36-2.061.002l-6.538-3.918a2 2 0 0 1-.98-1.698zM12 22V12" />
  </svg>
)

const SectionTitles: Record<NavSection, string> = {
  builds: 'Сборки',
  mods: 'Моды',
  profile: 'Профиль',
  logs: 'Логи'
}

export const InstanceManager: React.FC<InstanceManagerProps> = ({
  section,
  instances,
  selectedInstance,
  activeUsername,
  modsRefreshKey,
  launchProgress,
  onSelectInstance,
  onQuickPlay,
  onCreateInstance,
  onRenameInstance,
  onDeleteInstance,
  onOpenModDownloader,
  logs
}) => {
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [modsList, setModsList] = useState<ModItem[]>([])
  const [modsLoading, setModsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [renamingId, setRenamingId] = useState<string | null>(null)
  const [renameText, setRenameText] = useState('')
  const [copyNotice, setCopyNotice] = useState('')

  useEffect(() => {
    if (section === 'mods' && selectedInstance && window.electronAPI) {
      setModsLoading(true)
      window.electronAPI.getInstanceMods(selectedInstance.id)
        .then(setModsList)
        .finally(() => setModsLoading(false))
    }
  }, [section, selectedInstance?.id, modsRefreshKey])

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
  const isBusy = (p: LaunchProgress | null) =>
    p && (p.stage === 'downloading' || p.stage === 'checking' || p.stage === 'launching' || p.stage === 'extracting')

  const filteredInstances = instances.filter(inst =>
    !searchQuery ||
    (inst.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
    (inst.version || '').includes(searchQuery)
  )

  // ── Builds section ─────────────────────────────────────────────
  if (section === 'builds') {
    if (instances.length === 0) {
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
        <div className="content-toolbar">
          <h1 className="section-title">{SectionTitles.builds}</h1>
          <div className="toolbar-actions">
            <div className="search-bar">
              <IconSearch />
              <input
                type="text"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={() => setShowCreateModal(true)}>
              <IconPlus /> Новая сборка
            </button>
          </div>
        </div>

        <div className="card-grid">
          {filteredInstances.map((inst, idx) => {
            const busyForThis = isBusy(launchProgress) && launchProgress!.instanceId === inst.id
            const runningForThis = isGameRunning && launchProgress!.instanceId === inst.id
            return (
              <div
                key={inst.id}
                className={`instance-card ${selectedInstance?.id === inst.id ? 'selected' : ''}`}
                style={{ animationDelay: `${Math.min(idx, 8) * 30}ms` }}
                role="button"
                tabIndex={0}
                aria-pressed={selectedInstance?.id === inst.id}
                onClick={() => onSelectInstance(inst)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectInstance(inst) }
                }}
              >
                <div className={`instance-cover cover-${inst.loader}`} aria-hidden="true">
                  <span className="instance-cover-letter">{(inst.name || '?').slice(0, 1).toUpperCase()}</span>
                  <button
                    className="card-play"
                    title={runningForThis ? 'Игра запущена' : 'Играть в эту сборку'}
                    disabled={!!busyForThis || !!runningForThis}
                    onClick={(e) => { e.stopPropagation(); onQuickPlay(inst) }}
                  >
                    <IconPlay />
                  </button>
                </div>

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

                <div className="instance-card-meta">
                  <span className="version-pill">MC {inst.version}</span>
                  <span>
                    {runningForThis ? 'запущена' : inst.lastPlayed ? new Date(inst.lastPlayed).toLocaleDateString() : 'Не запускалась'}
                  </span>
                  <div className="instance-card-actions" onClick={(e) => e.stopPropagation()}>
                    <button className="icon-btn" title="Переименовать" onClick={() => { setRenamingId(inst.id); setRenameText(inst.name) }}>
                      <IconPen />
                    </button>
                    <button className="icon-btn danger" title="Удалить сборку" onClick={() => onDeleteInstance(inst.id)}>
                      <IconTrash />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

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

  // ── Mods section ───────────────────────────────────────────────
  if (section === 'mods') {
    if (!selectedInstance) return null
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <div className="content-toolbar">
          <h1 className="section-title">Моды · {selectedInstance.name}</h1>
          <div className="toolbar-actions">
            <button className="btn" onClick={handleOpenFolder}>
              <IconFolder /> Папка
            </button>
            <button className="btn btn-primary" onClick={onOpenModDownloader}>
              <IconMods /> Из Modrinth
            </button>
            <button className="btn" onClick={handleAddModFile}>
              <IconPlus /> .jar файл
            </button>
          </div>
        </div>

        {selectedInstance.loader === 'vanilla' && (
          <div className="status-banner info" style={{ borderRadius: '10px', marginBottom: '10px' }}>
            Это Vanilla-сборка — моды в игре не загрузятся. Для модов создайте Fabric или Quilt.
          </div>
        )}

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
    )
  }

  // ── Profile section ────────────────────────────────────────────
  if (section === 'profile') {
    if (!activeUsername) return null
    return (
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
        <div className="content-toolbar">
          <h1 className="section-title">Профиль</h1>
        </div>
        <ProfileTab activeUsername={activeUsername} />
      </div>
    )
  }

  // ── Logs section ───────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minHeight: 0 }}>
      <div className="content-toolbar">
        <h1 className="section-title">Логи</h1>
        <div className="toolbar-actions">
          {copyNotice && <span style={{ color: 'var(--accent)', fontSize: '12px' }}>{copyNotice}</span>}
          <button className="btn" onClick={handleCopyLogs} disabled={logs.length === 0}>
            Скопировать логи
          </button>
        </div>
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
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

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

  const popularIds = ['1.21.4', '1.21.1', '1.20.1', '1.19.2', '1.18.2', '1.16.5', '1.12.2', '1.8.9']
  const popularChips = popularIds
    .map(id => versions.find(v => v.id === id))
    .filter(Boolean) as MinecraftVersion[]

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
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-label="Новая сборка">
      <div className="modal" style={{ width: '460px' }} onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-title">Новая сборка</span>
          <button className="modal-close" onClick={onClose} aria-label="Закрыть">
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
            {!isOpenSearch && popularChips.length > 0 && (
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '8px' }}>
                {popularChips.map(v => (
                  <button
                    key={v.id}
                    className={`toggle-chip ${version === v.id ? 'on' : ''}`}
                    onClick={() => setVersion(v.id)}
                  >
                    {v.id}
                  </button>
                ))}
              </div>
            )}
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
                <div style={{ padding: '20px', textAlign: 'center' }}>
                  <div className="spinner" style={{ margin: '0 auto' }} />
                </div>
              ) : listedVersions.length === 0 ? (
                <div style={{ padding: '16px', textAlign: 'center', color: 'var(--text-faint)' }}>
                  Ничего не найдено
                </div>
              ) : (
                listedVersions.map(v => (
                  <div
                    key={v.id}
                    role="button"
                    tabIndex={0}
                    aria-pressed={version === v.id}
                    className={`version-picker-row ${version === v.id ? 'selected' : ''}`}
                    onClick={() => setVersion(v.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setVersion(v.id) }
                    }}
                  >
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
