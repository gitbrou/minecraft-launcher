import React, { useState, useEffect } from 'react'
import { Instance, MinecraftVersion, ModItem, GameLog } from '../types'
import { ProfileTab } from './ProfileTab'

interface InstanceManagerProps {
  instances: Instance[]
  selectedInstance: Instance | null
  activeUsername: string
  onSelectInstance: (instance: Instance) => void
  onCreateInstance: (data: { name: string; version: string; loader: 'vanilla' | 'fabric' | 'forge' | 'quilt' }) => void
  onDeleteInstance: (id: string) => void
  onOpenSettings: () => void
  onOpenModDownloader: () => void
  logs: GameLog[]
}

// Custom SVGs from user files
const IconVersions = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
    <path d="m7.298 9.999l-2.947 1.558a.5.5 0 0 0 0 .884l7.182 3.796a1 1 0 0 0 .934 0l7.182-3.796a.5.5 0 0 0 0-.884l-2.948-1.558m-9.403 4l-2.947 1.558a.5.5 0 0 0 0 .884l7.182 3.796a1 1 0 0 0 .934 0l7.182-3.796a.5.5 0 0 0 0-.884l-2.948-1.558M4.352 8.44l7.182 3.796a1 1 0 0 0 .934 0L19.65 8.44a.5.5 0 0 0 0-.884L12.467 3.76a1 1 0 0 0-.934 0L4.35 7.557a.5.5 0 0 0 0 .884Z" />
  </svg>
)

const IconMods = () => (
  <svg width="20" height="20" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="m4.83 13.661l17.6 10.161v20.196L4.83 33.857z" />
    <path d="m22.43 3.5l17.599 10.161l-17.6 10.161l-17.6-10.16zm7.517 36.177l-7.518 4.34V23.823h0l17.6-10.16v18.382" />
  </svg>
)

const IconProfile = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <g fillRule="evenodd" clipRule="evenodd">
      <path d="M16 9a4 4 0 1 1-8 0a4 4 0 0 1 8 0m-2 0a2 2 0 1 1-4 0a2 2 0 0 1 4 0" />
      <path d="M12 1C5.925 1 1 5.925 1 12s4.925 11 11 11s11-4.925 11-11S18.075 1 12 1M3 12c0 2.09.713 4.014 1.908 5.542A8.99 8.99 0 0 1 12.065 14a8.98 8.98 0 0 1 7.092 3.458A9 9 0 1 0 3 12m9 9a8.96 8.96 0 0 1-5.672-2.012A6.99 6.99 0 0 1 12.065 16a6.99 6.99 0 0 1 5.689 2.92A8.96 8.96 0 0 1 12 21" />
    </g>
  </svg>
)

const IconLogs = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12h.01M4 6h.01M4 18h.01M8 18h2m-2-6h2M8 6h2m4 0h6m-6 6h6m-6 6h6" />
  </svg>
)

const IconFolder = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h6l2 2h8q.825 0 1.413.588T22 8v10q0 .825-.587 1.413T20 20z" />
  </svg>
)

const IconSettings = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="m9.25 22l-.4-3.2q-.325-.125-.612-.3t-.563-.375L4.7 19.375l-2.75-4.75l2.575-1.95Q4.5 12.5 4.5 12.338v-.675q0-.163.025-.338L1.95 9.375l2.75-4.75l2.975 1.25q.275-.2.575-.375t.6-.3l.4-3.2h5.5l.4 3.2q.325.125.613.3t.562.375l2.975-1.25l2.75 4.75l-2.575 1.95q.025.175.025.338v.674q0 .163-.05.338l2.575 1.95l-2.75 4.75l-2.95-1.25q-.275.2-.575.375t-.6.3l-.4 3.2zM11 20h1.975l.35-2.65q.775-.2 1.438-.587t1.212-.938l2.475 1.025l.975-1.7l-2.15-1.625q.125-.35.175-.737T17.5 12t-.05-.787t-.175-.738l2.15-1.625l-.975-1.7l-2.475 1.05q-.55-.575-1.212-.962t-1.438-.588L13 4h-1.975l-.35 2.65q-.775.2-1.437.588t-1.213.937L5.55 7.15l-.975 1.7l2.15 1.6q-.125.375-.175.75t-.05.8q0 .4.05.775t.175.75l-2.15 1.625l.975 1.7l2.475-1.05q.55.575 1.213.963t1.437.587zm1.05-4.5q1.45 0 2.475-1.025T15.55 12t-1.025-2.475T12.05 8.5q-1.475 0-2.488 1.025T8.55 12t1.013 2.475T12.05 15.5M12 12" />
  </svg>
)

const IconAdd = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 13H5v-2h6V5h2v6h6v2h-6v6h-2z" />
  </svg>
)

const IconCopyTabler = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 9.667A2.667 2.667 0 0 1 9.667 7h8.666A2.667 2.667 0 0 1 21 9.667v8.666A2.667 2.667 0 0 1 18.333 21H9.667A2.667 2.667 0 0 1 7 18.333z" />
    <path d="M4.012 16.737A2 2 0 0 1 3 15V5c0-1.1.9-2 2-2h10c.75 0 1.158.385 1.5 1" />
  </svg>
)

const IconDeletePixel = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 7h2v2H6zm14 0h2v10h-2zM8 5h12v2H8zM4 9h2v2H4zm-2 2h2v2H2zm2 2h2v2H4zm2 2h2v2H6zm2 2h12v2H8zm6-6h2v2h-2zm2 2h2v2h-2zm0-4h2v2h-2zm-4 4h2v2h-2zm0-4h2v2h-2z" />
  </svg>
)

export const InstanceManager: React.FC<InstanceManagerProps> = ({
  instances,
  selectedInstance,
  activeUsername,
  onSelectInstance,
  onCreateInstance,
  onDeleteInstance,
  onOpenSettings,
  onOpenModDownloader,
  logs
}) => {
  const [activeTab, setActiveTab] = useState<'versions' | 'mods' | 'profile' | 'logs'>('versions')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [selectedVersion, setSelectedVersion] = useState('1.20.4')
  const [selectedLoader, setSelectedLoader] = useState<'vanilla' | 'fabric' | 'forge' | 'quilt'>('vanilla')
  const [allServerVersions, setAllServerVersions] = useState<MinecraftVersion[]>([])
  const [copyNotice, setCopyNotice] = useState('')

  // Mods State
  const [modsList, setModsList] = useState<ModItem[]>([])

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getVersions().then((manifest) => {
        if (manifest?.versions?.length) {
          setAllServerVersions(manifest.versions)
        }
      }).catch(() => {})
    }
  }, [])

  useEffect(() => {
    if (activeTab === 'mods' && selectedInstance && window.electronAPI) {
      fetchMods()
    }
  }, [activeTab, selectedInstance])

  const fetchMods = () => {
    if (selectedInstance && window.electronAPI) {
      window.electronAPI.getInstanceMods(selectedInstance.id).then(setModsList)
    }
  }

  const handleToggleMod = (modFilename: string) => {
    if (selectedInstance && window.electronAPI) {
      window.electronAPI.toggleMod({ instanceId: selectedInstance.id, modFilename }).then(fetchMods)
    }
  }

  const handleAddModFile = () => {
    if (selectedInstance && window.electronAPI) {
      window.electronAPI.addModFile(selectedInstance.id).then(fetchMods)
    }
  }

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onCreateInstance({
      name: selectedVersion,
      version: selectedVersion,
      loader: selectedLoader
    })
    setShowCreateModal(false)
  }

  const handleOpenFolder = () => {
    if (selectedInstance && window.electronAPI) {
      window.electronAPI.openInstanceFolder(selectedInstance.id)
    }
  }

  const handleCopySingleLogs = () => {
    const text = logs.map(l => `[${new Date(l.timestamp).toLocaleTimeString()}] ${l.message}`).join('\n')
    navigator.clipboard.writeText(text)
    setCopyNotice('Лог скопирован!')
    setTimeout(() => setCopyNotice(''), 2500)
  }

  const getLoaderBadgeStyle = (loader: string) => {
    switch (loader) {
      case 'fabric':
        return { background: '#8b5cf6', color: '#ffffff' }
      case 'forge':
        return { background: '#f97316', color: '#ffffff' }
      case 'quilt':
        return { background: '#06b6d4', color: '#ffffff' }
      default:
        return { background: '#53921b', color: '#ffffff' }
    }
  }

  return (
    <div className="instance-display-card">
      {/* Header Tabs & Actions */}
      <div className="header-actions-row">
        {/* Left Segmented Control Tabs */}
        <div className="tabs-group">
          <button
            className={`tab-btn ${activeTab === 'versions' ? 'active' : ''}`}
            onClick={() => setActiveTab('versions')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <IconVersions /> <span>Версии</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'mods' ? 'active' : ''}`}
            onClick={() => setActiveTab('mods')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <IconMods /> <span>Моды</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
            onClick={() => setActiveTab('profile')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <IconProfile /> <span>Профиль</span>
          </button>

          <button
            className={`tab-btn ${activeTab === 'logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('logs')}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
          >
            <IconLogs /> <span>Логи ({logs.length})</span>
          </button>
        </div>

        {/* Right Icon-Only Action Buttons */}
        <div className="action-buttons-group" style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {selectedInstance && (
            <button
              className="action-btn"
              onClick={handleOpenFolder}
              title="Открыть папку версии"
              style={{
                color: '#facc15',
                padding: '8px 12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '8px'
              }}
            >
              <IconFolder />
            </button>
          )}

          <button
            className="action-btn"
            onClick={onOpenSettings}
            title="Настройки лаунчера и Java"
            style={{
              color: '#e2e8f0',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px'
            }}
          >
            <IconSettings />
          </button>

          <button
            className="action-btn primary"
            onClick={() => setShowCreateModal(true)}
            title="Добавить новую версию"
            style={{
              background: '#53921b',
              color: '#ffffff',
              padding: '8px 12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '8px'
            }}
          >
            <IconAdd />
          </button>
        </div>
      </div>

      {/* Main Versions List */}
      {activeTab === 'versions' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
          {instances.map((inst) => {
            const badgeStyle = getLoaderBadgeStyle(inst.loader)
            return (
              <div
                key={inst.id}
                onClick={() => onSelectInstance(inst)}
                style={{
                  background: selectedInstance?.id === inst.id ? 'rgba(83, 146, 27, 0.25)' : 'rgba(20, 22, 28, 0.6)',
                  border: selectedInstance?.id === inst.id ? '2px solid #53921b' : '1.5px solid rgba(255, 255, 255, 0.1)',
                  borderRadius: '14px',
                  padding: '16px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  height: '130px'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#fff', margin: 0 }}>
                      {inst.version}
                    </h3>

                    <span style={{ fontSize: '11px', fontWeight: '600', padding: '3px 8px', borderRadius: '6px', textTransform: 'uppercase', ...badgeStyle }}>
                      {inst.loader}
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                  <span style={{ fontSize: '12px', color: '#777' }}>
                    {inst.lastPlayed ? `Запуск: ${new Date(inst.lastPlayed).toLocaleDateString()}` : 'Не запускался'}
                  </span>

                  {instances.length > 1 && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        onDeleteInstance(inst.id)
                      }}
                      title="Удалить версию"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.4)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '4px',
                        borderRadius: '4px'
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#ff4d4d')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255, 255, 255, 0.4)')}
                    >
                      <IconDeletePixel />
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

      {/* Mods Tab */}
      {activeTab === 'mods' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px', alignItems: 'center' }}>
            <h3 style={{ fontSize: '18px', margin: 0 }}>Моды для версии {selectedInstance?.version}</h3>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button className="btn-primary" onClick={onOpenModDownloader} style={{ background: '#3b82f6', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <IconMods /> Установить мод
              </button>
              <button className="btn-secondary" onClick={handleAddModFile}>
                + Файл .jar
              </button>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {modsList.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '30px', color: '#888' }}>
                <p style={{ fontSize: '16px' }}>В этой версии пока нет установленных модов.</p>
                <button
                  className="btn-primary"
                  onClick={onOpenModDownloader}
                  style={{ marginTop: '14px', background: '#3b82f6' }}
                >
                  Установить мод
                </button>
              </div>
            ) : (
              modsList.map((mod) => (
                <div
                  key={mod.id}
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    borderRadius: '8px',
                    padding: '10px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <span style={{ textDecoration: mod.enabled ? 'none' : 'line-through', color: mod.enabled ? '#fff' : '#777' }}>
                    {mod.filename}
                  </span>
                  <button
                    className={`btn-secondary`}
                    style={{ padding: '4px 10px', fontSize: '12px' }}
                    onClick={() => handleToggleMod(mod.filename)}
                  >
                    {mod.enabled ? 'Включен' : 'Отключен'}
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <ProfileTab activeUsername={activeUsername} />
      )}

      {/* Logs Tab with Single Copy Button carrying tabler--copy.svg icon */}
      {activeTab === 'logs' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4 style={{ margin: 0, color: '#aaa', fontSize: '14px' }}>Консоль и отчеты сбоев:</h4>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              {copyNotice && <span style={{ color: '#53921b', fontSize: '12px', fontWeight: 'bold' }}>{copyNotice}</span>}
              <button
                className="btn-primary"
                style={{ padding: '6px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px', background: '#53921b' }}
                onClick={handleCopySingleLogs}
                title="Скопировать логи в буфер обмена"
              >
                <IconCopyTabler /> Скопировать логи
              </button>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              background: '#0a0a0d',
              borderRadius: '10px',
              padding: '12px',
              fontFamily: 'Consolas, Monaco, monospace',
              fontSize: '12px',
              overflowY: 'auto',
              color: '#00ff66',
              userSelect: 'text',
              WebkitUserSelect: 'text',
              border: '1px solid rgba(255,255,255,0.08)'
            }}
          >
            {logs.length === 0 ? (
              <span style={{ color: '#555' }}>Логи запуска пусты... Нажмите "Играть" для запуска.</span>
            ) : (
              logs.map((log, idx) => (
                <div key={idx} style={{ color: log.type === 'error' ? '#ff4d4d' : log.type === 'warn' ? '#ffcc00' : '#00ff66', marginBottom: '3px', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  [{new Date(log.timestamp).toLocaleTimeString()}] {log.message}
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Create Version Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Добавление версии</h3>
            <form onSubmit={handleCreateSubmit}>
              <div className="form-group">
                <label>Версия Minecraft (из сервера Mojang):</label>
                <select value={selectedVersion} onChange={(e) => setSelectedVersion(e.target.value)}>
                  {allServerVersions.map((v) => (
                    <option key={v.id} value={v.id}>{v.id} ({v.type})</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Загрузчик (Loader):</label>
                <select
                  value={selectedLoader}
                  onChange={(e) => setSelectedLoader(e.target.value as any)}
                >
                  <option value="vanilla">Vanilla (Обычный)</option>
                  <option value="fabric">Fabric</option>
                  <option value="forge">Forge</option>
                  <option value="quilt">Quilt</option>
                </select>
              </div>

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowCreateModal(false)}>
                  Отмена
                </button>
                <button type="submit" className="btn-primary">
                  Создать
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
