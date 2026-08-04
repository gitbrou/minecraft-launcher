import React, { useState, useEffect } from 'react'
import { Instance, MinecraftVersion, ModItem, GameLog } from '../types'

interface InstanceManagerProps {
  instances: Instance[]
  selectedInstance: Instance | null
  onSelectInstance: (instance: Instance) => void
  onCreateInstance: (data: { name: string; version: string; loader: 'vanilla' | 'fabric' | 'forge' | 'quilt' }) => void
  onDeleteInstance: (id: string) => void
  onOpenSettings: () => void
  logs: GameLog[]
}

export const InstanceManager: React.FC<InstanceManagerProps> = ({
  instances,
  selectedInstance,
  onSelectInstance,
  onCreateInstance,
  onDeleteInstance,
  onOpenSettings,
  logs
}) => {
  const [activeTab, setActiveTab] = useState<'instances' | 'mods' | 'logs'>('instances')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [newInstanceName, setNewInstanceName] = useState('')
  const [selectedVersion, setSelectedVersion] = useState('1.20.4')
  const [selectedLoader, setSelectedLoader] = useState<'vanilla' | 'fabric' | 'forge' | 'quilt'>('vanilla')
  const [versionOptions, setVersionOptions] = useState<string[]>(['1.20.4', '1.20.1', '1.19.4', '1.16.5', '1.12.2', '1.8.9'])

  // Mods State
  const [modsList, setModsList] = useState<ModItem[]>([])

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getVersions().then((manifest) => {
        if (manifest?.versions?.length) {
          const releases = manifest.versions
            .filter((v: MinecraftVersion) => v.type === 'release')
            .map((v: MinecraftVersion) => v.id)
          setVersionOptions(releases.slice(0, 30))
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
      name: newInstanceName.trim() || `Minecraft ${selectedVersion}`,
      version: selectedVersion,
      loader: selectedLoader
    })
    setNewInstanceName('')
    setShowCreateModal(false)
  }

  const handleOpenFolder = () => {
    if (selectedInstance && window.electronAPI) {
      window.electronAPI.openInstanceFolder(selectedInstance.id)
    }
  }

  return (
    <div className="instance-display-card">
      {/* Clean Header Bar */}
      <div className="header-actions-row">
        {/* Left Segmented Control Tabs */}
        <div className="tabs-group">
          <button
            className={`tab-btn ${activeTab === 'instances' ? 'active' : ''}`}
            onClick={() => setActiveTab('instances')}
          >
            📦 Инстансы
          </button>
          <button
            className={`tab-btn ${activeTab === 'mods' ? 'active' : ''}`}
            onClick={() => setActiveTab('mods')}
          >
            🧩 Моды
          </button>
          <button
            className={`tab-btn ${activeTab === 'logs' ? 'active' : ''}`}
            onClick={() => setActiveTab('logs')}
          >
            📜 Логи ({logs.length})
          </button>
        </div>

        {/* Right Action Buttons */}
        <div className="action-buttons-group">
          {selectedInstance && (
            <button className="action-btn" onClick={handleOpenFolder} title="Открыть папку инстанса">
              📁 Папка
            </button>
          )}
          <button className="action-btn" onClick={onOpenSettings} title="Настройки Java и памяти">
            ⚙️ Настройки
          </button>
          <button className="action-btn primary" onClick={() => setShowCreateModal(true)}>
            + Новый инстанс
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'instances' && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '16px', overflowY: 'auto', flex: 1, paddingRight: '4px' }}>
          {instances.map((inst) => (
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
                  <h3 style={{ fontSize: '18px', color: '#fff', margin: 0 }}>{inst.name}</h3>
                  <span style={{ fontSize: '12px', padding: '2px 6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', color: '#aaa' }}>
                    {inst.loader}
                  </span>
                </div>
                <p style={{ fontSize: '14px', color: '#888', marginTop: '6px' }}>Версия: {inst.version}</p>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
                <span style={{ fontSize: '12px', color: '#666' }}>
                  {inst.lastPlayed ? `Запускался: ${new Date(inst.lastPlayed).toLocaleDateString()}` : 'Еще не запускался'}
                </span>
                {instances.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      onDeleteInstance(inst.id)
                    }}
                    style={{ background: 'none', border: 'none', color: '#ff5555', cursor: 'pointer', fontSize: '14px' }}
                  >
                    🗑️
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Mods Tab */}
      {activeTab === 'mods' && (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <h3 style={{ fontSize: '18px' }}>Моды для {selectedInstance?.name}</h3>
            <button className="btn-primary" onClick={handleAddModFile}>+ Добавить .jar мод</button>
          </div>

          <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {modsList.length === 0 ? (
              <p style={{ color: '#777', marginTop: '20px' }}>В этой сборке пока нет модов. Нажмите "+ Добавить .jar мод", чтобы добавить моды.</p>
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

      {/* Logs Tab */}
      {activeTab === 'logs' && (
        <div
          style={{
            flex: 1,
            background: '#0a0a0d',
            borderRadius: '10px',
            padding: '12px',
            fontFamily: 'monospace',
            fontSize: '13px',
            overflowY: 'auto',
            color: '#00ff66'
          }}
        >
          {logs.length === 0 ? (
            <span style={{ color: '#555' }}>Логи запуска пусты... Нажмите "Играть" для запуска.</span>
          ) : (
            logs.map((log, idx) => (
              <div key={idx} style={{ color: log.type === 'error' ? '#ff4d4d' : log.type === 'warn' ? '#ffcc00' : '#00ff66', marginBottom: '4px' }}>
                [{new Date(log.timestamp).toLocaleTimeString()}] {log.message}
              </div>
            ))
          )}
        </div>
      )}

      {/* Create Instance Modal */}
      {showCreateModal && (
        <div className="modal-overlay" onClick={() => setShowCreateModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Создание нового инстанса</h3>
            <form onSubmit={handleCreateSubmit}>
              <div className="form-group">
                <label>Название инстанса:</label>
                <input
                  type="text"
                  placeholder="Моя сборка 1.20.4"
                  value={newInstanceName}
                  onChange={(e) => setNewInstanceName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Версия Minecraft:</label>
                <select value={selectedVersion} onChange={(e) => setSelectedVersion(e.target.value)}>
                  {versionOptions.map((v) => (
                    <option key={v} value={v}>{v}</option>
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
