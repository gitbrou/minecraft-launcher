import React, { useState, useEffect } from 'react'
import { LauncherSettings } from '../types'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (newSettings: any) => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'java' | 'game'>('java')
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
    try {
      if (window.electronAPI) {
        await window.electronAPI.saveSettings(settings)
      }
      onClose()
    } catch {
      // ignore
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ width: '650px', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">Настройки</h3>

        <div style={{ display: 'flex', gap: '8px', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', paddingBottom: '10px', marginBottom: '16px' }}>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'java' ? 'active' : ''}`}
            onClick={() => setActiveTab('java')}
          >
            Java и Память
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === 'game' ? 'active' : ''}`}
            onClick={() => setActiveTab('game')}
          >
            Параметры запуска
          </button>
        </div>

        <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {activeTab === 'java' && (
            <>
              <div className="form-group">
                <label>Исполняемый файл Java:</label>
                <select
                  value={settings.javaPath}
                  onChange={(e) => setSettings({ ...settings, javaPath: e.target.value })}
                  style={{ width: '100%', padding: '10px', borderRadius: '8px', background: '#121317', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
                >
                  <option value="">Автоопределение (Встроенная Java 17)</option>
                  {detectedJavas.map((j) => (
                    <option key={j} value={j}>{j}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Выделяемая память (Max RAM):</span>
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
                <label>Аргументы JVM:</label>
                <input
                  type="text"
                  placeholder="-XX:+UseG1GC -Dsun.java2d.opengl=true"
                  value={settings.customJvmArgs || ''}
                  onChange={(e) => setSettings({ ...settings, customJvmArgs: e.target.value })}
                />
              </div>
            </>
          )}

          {activeTab === 'game' && (
            <>
              <div className="form-group" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <input
                  type="checkbox"
                  id="closeLauncher"
                  checked={settings.closeLauncherOnGameStart || false}
                  onChange={(e) => setSettings({ ...settings, closeLauncherOnGameStart: e.target.checked })}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="closeLauncher" style={{ margin: 0, cursor: 'pointer' }}>
                  Закрывать лаунчер при запуске игры
                </label>
              </div>
            </>
          )}

          <div className="modal-actions" style={{ marginTop: '16px' }}>
            <button type="button" className="btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Сохранение...' : 'Сохранить'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
