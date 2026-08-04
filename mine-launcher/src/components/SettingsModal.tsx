import React, { useState, useEffect } from 'react'
import { LauncherSettings } from '../types'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (newSettings: any) => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'java' | 'game' | 'perf'>('java')
  const [settings, setSettings] = useState<LauncherSettings>({
    javaPath: '',
    memoryMin: 1024,
    memoryMax: 4096,
    customJvmArgs: '',
    closeLauncherOnGameStart: false,
    gameDir: ''
  })
  const [detectedJavas, setDetectedJavas] = useState<string[]>([])
  const [saving, setSaving] = useState(false)
  const [statusMsg, setStatusMsg] = useState('')

  useEffect(() => {
    if (isOpen && window.electronAPI) {
      window.electronAPI.getSettings().then(setSettings)
      window.electronAPI.detectJava().then(setDetectedJavas)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setStatusMsg('')
    try {
      if (window.electronAPI) {
        await window.electronAPI.saveSettings(settings)
      }
      setStatusMsg('Настройки сохранены!')
      setTimeout(() => {
        onClose()
      }, 400)
    } catch (err: any) {
      setStatusMsg(`Ошибка сохранения: ${err.message}`)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ width: '750px', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          ⚙️ Настройки Prism Launcher
        </h3>

        {/* Prism Navigation Tabs */}
        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '12px', marginBottom: '16px' }}>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'java' ? 'active' : ''}`}
            onClick={() => setActiveTab('java')}
          >
            ☕ Java & Память
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'game' ? 'active' : ''}`}
            onClick={() => setActiveTab('game')}
          >
            🎮 Игра и экран
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'perf' ? 'active' : ''}`}
            onClick={() => setActiveTab('perf')}
          >
            ⚡ Оптимизация G1GC
          </button>
        </div>

        {statusMsg && (
          <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(83, 146, 27, 0.2)', color: '#6eff8b', fontSize: '14px', marginBottom: '14px' }}>
            {statusMsg}
          </div>
        )}

        <form onSubmit={handleSave} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
          {/* Tab 1: Java & Memory */}
          {activeTab === 'java' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group">
                <label>Путь к Java Runtime (javaw.exe):</label>
                <select
                  value={settings.javaPath}
                  onChange={(e) => setSettings({ ...settings, javaPath: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#121317', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                >
                  <option value="">Автоопределение (Встроенная Java 17 Temurin JRE)</option>
                  {detectedJavas.map((j) => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Минимальная память (Min RAM -Xms):</span>
                  <span style={{ color: '#53921b', fontWeight: 'bold' }}>{settings.memoryMin} MB</span>
                </label>
                <input
                  type="range"
                  min="512"
                  max="16384"
                  step="512"
                  value={settings.memoryMin}
                  onChange={(e) => setSettings({ ...settings, memoryMin: Number(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Максимальная память (Max RAM -Xmx):</span>
                  <span style={{ color: '#53921b', fontWeight: 'bold' }}>{settings.memoryMax} MB</span>
                </label>
                <input
                  type="range"
                  min="1024"
                  max="32768"
                  step="512"
                  value={settings.memoryMax}
                  onChange={(e) => setSettings({ ...settings, memoryMax: Number(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label>Пользовательские JVM Аргументы:</label>
                <input
                  type="text"
                  placeholder="-Dsun.java2d.opengl=true -Dfile.encoding=UTF-8"
                  value={settings.customJvmArgs || ''}
                  onChange={(e) => setSettings({ ...settings, customJvmArgs: e.target.value })}
                />
              </div>
            </div>
          )}

          {/* Tab 2: Game & Screen */}
          {activeTab === 'game' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="closeLauncher"
                  checked={settings.closeLauncherOnGameStart || false}
                  onChange={(e) => setSettings({ ...settings, closeLauncherOnGameStart: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="closeLauncher" style={{ margin: 0, cursor: 'pointer' }}>
                  Автоматически закрывать лаунчер при запуске игры
                </label>
              </div>

              <div className="form-group">
                <label>Директория файлов Minecraft (.mine-launcher):</label>
                <input
                  type="text"
                  readOnly
                  value={settings.gameDir || 'Стандартная директория AppData/.mine-launcher'}
                  style={{ opacity: 0.7 }}
                />
              </div>
            </div>
          )}

          {/* Tab 3: Performance & G1GC Flags */}
          {activeTab === 'perf' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: 'rgba(83, 146, 27, 0.15)', border: '1px solid #53921b', padding: '14px', borderRadius: '10px' }}>
                <h4 style={{ margin: '0 0 6px 0', color: '#6eff8b' }}>🚀 Высокопроизводительные JVM флаги G1GC включены</h4>
                <p style={{ margin: 0, fontSize: '13px', color: '#ccc' }}>
                  Лаунчер автоматически применяет оптимальные настройки Garbage Collector (G1GC, MaxGCPauseMillis=50, RegionSize=32M) для обеспечения стабильного 120+ FPS без фризов.
                </p>
              </div>
            </div>
          )}

          <div className="modal-actions" style={{ marginTop: '24px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Сохранение...' : 'Сохранить настройки'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
