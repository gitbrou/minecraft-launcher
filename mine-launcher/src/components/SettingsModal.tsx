import React, { useState, useEffect } from 'react'
import { LauncherSettings } from '../types'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (settings: Partial<LauncherSettings>) => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  onSave
}) => {
  const [javaPath, setJavaPath] = useState('')
  const [memoryMin, setMemoryMin] = useState(1024)
  const [memoryMax, setMemoryMax] = useState(4096)
  const [customJvmArgs, setCustomJvmArgs] = useState('')
  const [detectedJavas, setDetectedJavas] = useState<string[]>([])

  useEffect(() => {
    if (isOpen && window.electronAPI) {
      window.electronAPI.getSettings().then((s: LauncherSettings) => {
        if (s) {
          setJavaPath(s.javaPath || '')
          setMemoryMin(s.memoryMin || 1024)
          setMemoryMax(s.memoryMax || 4096)
          setCustomJvmArgs(s.customJvmArgs || '')
        }
      })

      window.electronAPI.detectJava().then((paths: string[]) => {
        setDetectedJavas(paths)
      })
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    onSave({
      javaPath,
      memoryMin: Number(memoryMin),
      memoryMax: Number(memoryMax),
      customJvmArgs
    })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ width: '560px' }} onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">⚙️ Настройки Java и Памяти</h3>
        <form onSubmit={handleSave}>
          <div className="form-group">
            <label>Путь к Java executable (javaw.exe):</label>
            <input
              type="text"
              placeholder="Авто-определение system java..."
              value={javaPath}
              onChange={(e) => setJavaPath(e.target.value)}
            />

            {detectedJavas.length > 0 && (
              <div style={{ marginTop: '8px' }}>
                <span style={{ fontSize: '12px', color: '#888' }}>Найденные версии Java на ПК:</span>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
                  {detectedJavas.map((p) => (
                    <button
                      key={p}
                      type="button"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '4px',
                        padding: '4px 8px',
                        color: '#ddd',
                        fontSize: '12px',
                        textAlign: 'left',
                        cursor: 'pointer'
                      }}
                      onClick={() => setJavaPath(p)}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="form-group">
            <label>Выделение RAM (Максимум МБ): {memoryMax} МБ ({Math.round(memoryMax / 1024 * 10) / 10} ГБ)</label>
            <input
              type="range"
              min="1024"
              max="16384"
              step="512"
              value={memoryMax}
              onChange={(e) => setMemoryMax(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Выделение RAM (Минимум МБ): {memoryMin} МБ</label>
            <input
              type="range"
              min="512"
              max="4096"
              step="256"
              value={memoryMin}
              onChange={(e) => setMemoryMin(Number(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>Дополнительные JVM аргументы:</label>
            <input
              type="text"
              placeholder="-XX:+UseG1GC -XX:G1ReservePercent=20"
              value={customJvmArgs}
              onChange={(e) => setCustomJvmArgs(e.target.value)}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Отмена
            </button>
            <button type="submit" className="btn-primary">
              Сохранить
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
