import React, { useEffect, useRef, useState } from 'react'
import { LauncherSettings } from '../types'
import { useFocusTrap } from '../hooks/useFocusTrap'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (newSettings: Partial<LauncherSettings>) => void
}

const Switch: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label: string }> = ({ checked, onChange, label }) => (
  <button
    className={`switch ${checked ? 'on' : ''}`}
    role="switch"
    aria-checked={checked}
    aria-label={label}
    onClick={() => onChange(!checked)}
  >
    <span className="switch-knob" />
  </button>
)

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onSave }) => {
  const [settings, setSettings] = useState<LauncherSettings>({
    javaPath: '',
    memoryMin: 1024,
    memoryMax: 4096,
    customJvmArgs: '',
    closeLauncherOnGameStart: false,
    fullscreen: false,
    hideLauncher: false
  })
  const [detectedJavas, setDetectedJavas] = useState<string[]>([])
  const [systemInfo, setSystemInfo] = useState<{ totalRamMb: number; defaultMaxMemory: number } | null>(null)
  const modalRef = useRef<HTMLDivElement>(null)
  useFocusTrap(modalRef, isOpen)

  useEffect(() => {
    if (isOpen && window.electronAPI) {
      window.electronAPI.getSettings().then((s: LauncherSettings) => {
        if (s) {
          setSettings({
            javaPath: s.javaPath || '',
            memoryMin: s.memoryMin || 1024,
            memoryMax: s.memoryMax || 4096,
            customJvmArgs: s.customJvmArgs || '',
            closeLauncherOnGameStart: !!s.closeLauncherOnGameStart,
            fullscreen: !!s.fullscreen,
            hideLauncher: !!s.hideLauncher
          })
        }
      })
      window.electronAPI.detectJava().then(setDetectedJavas).catch(() => {})
      window.electronAPI.getSystemInfo?.().then(setSystemInfo).catch(() => {})
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  if (!isOpen) return null

  const ramWarning = systemInfo
    ? settings.memoryMax > systemInfo.totalRamMb * 0.85
      ? `На ПК всего ${Math.round(systemInfo.totalRamMb / 1024)} ГБ ОЗУ — такое значение памяти Windows может зависнуть/убить игру.`
      : null
    : null

  const save = () => {
    // Не блокируем сохранение по памяти жёстко — предупреждаем сообщением и всё равно разрешаем
    onSave(settings)
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal modal-md"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <span className="modal-title" id="settings-modal-title">Настройки лаунчера</span>
          <button className="modal-close" onClick={onClose} aria-label="Закрыть настройки">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="modal-body">
          {/* Memory */}
          <div className="form-row">
            <span className="form-label">Память (МБ){systemInfo ? ` · ОЗУ ПК ${Math.round(systemInfo.totalRamMb / 1024)} ГБ` : ''}</span>
            <div className="form-inline">
              <input
                className="form-input"
                type="number"
                min={512}
                max={32768}
                step={256}
                value={settings.memoryMin}
                onChange={(e) => setSettings({ ...settings, memoryMin: Math.max(512, parseInt(e.target.value) || 1024) })}
              />
              <span className="range-sep">до</span>
              <input
                className="form-input"
                type="number"
                min={1024}
                max={32768}
                step={512}
                value={settings.memoryMax}
                onChange={(e) => setSettings({ ...settings, memoryMax: Math.max(1024, parseInt(e.target.value) || 4096) })}
              />
            </div>
            <span className="form-hint">Для обычной игры хватит 2048 МБ, для модов — 4096–6144 МБ.</span>
          {ramWarning && <div className="form-error">{ramWarning}</div>}
          {systemInfo && (
            <button
              className={`btn btn-sm align-start ${ramWarning ? '' : 'dimmed'}`}
              onClick={() => setSettings({ ...settings, memoryMax: systemInfo.defaultMaxMemory })}
            >
              Поставить {systemInfo.defaultMaxMemory} МБ (рекомендовано для вашего ПК)
            </button>
          )}
          </div>

          {/* Java */}
          <div className="form-row">
            <span className="form-label">Java путь (необязательно)</span>
            <input
              className="form-input"
              placeholder="Авто — лаунчер сам определит и скачает нужную Java"
              value={settings.javaPath}
              onChange={(e) => setSettings({ ...settings, javaPath: e.target.value })}
            />
            <div className="field-row">
              <span className="form-hint">
                {detectedJavas.length > 0
                  ? `Найдено Java: ${detectedJavas.length}`
                  : 'Java не найдена на ПК — будет скачана автоматически'}
              </span>
              {detectedJavas.length > 0 && (
                <select
                  className="form-select inline"
                  value={settings.javaPath}
                  onChange={(e) => setSettings({ ...settings, javaPath: e.target.value })}
                >
                  <option value="">Авто</option>
                  {detectedJavas.map((j) => (
                    <option key={j} value={j}>{j.split(/[/\\]/).slice(-3).join('/')}</option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* JVM args */}
          <div className="form-row">
            <span className="form-label">Дополнительные JVM аргументы</span>
            <input
              className="form-input"
              placeholder="например: -Dfml.readTimeout=120"
              value={settings.customJvmArgs}
              onChange={(e) => setSettings({ ...settings, customJvmArgs: e.target.value })}
            />
          </div>

          {/* Toggles */}
          <div>
            <div className="switch-row">
              <div>
                <div className="switch-row-label">Полноэкранный режим</div>
                <div className="switch-row-hint">Запускать Minecraft в fullscreen</div>
              </div>
              <Switch checked={settings.fullscreen} onChange={(v) => setSettings({ ...settings, fullscreen: v })} label="Полноэкранный режим" />
            </div>

            <div className="switch-row">
              <div>
                <div className="switch-row-label">Свёртывать лаунчер</div>
                <div className="switch-row-hint">Скрывать окно лаунчера когда игра запустилась</div>
              </div>
              <Switch checked={settings.closeLauncherOnGameStart} onChange={(v) => setSettings({ ...settings, closeLauncherOnGameStart: v })} label="Свёртывать лаунчер при запуске игры" />
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn" onClick={onClose}>Отмена</button>
          <button className="btn btn-primary" onClick={save}>Сохранить</button>
        </div>
      </div>
    </div>
  )
}
