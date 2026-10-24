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
          <span className="modal-title" id="settings-modal-title">Настройки</span>
          <button className="modal-close" onClick={onClose} aria-label="Закрыть настройки">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="modal-body settings-body">
          <section className="settings-section">
            <h3 className="settings-section-title">Память</h3>
            <div className="settings-field">
              <div className="settings-field-head">
                <span className="settings-field-label">Оперативная память</span>
                {systemInfo && <span className="settings-meta">ОЗУ ПК {Math.round(systemInfo.totalRamMb / 1024)} ГБ</span>}
              </div>
              <div className="settings-memory-row">
                <input
                  className="form-input mono"
                  type="number"
                  min={512}
                  max={32768}
                  step={256}
                  value={settings.memoryMin}
                  aria-label="Минимальная память, МБ"
                  onChange={(e) => setSettings({ ...settings, memoryMin: Math.max(512, parseInt(e.target.value) || 1024) })}
                />
                <span className="range-sep">до</span>
                <input
                  className="form-input mono"
                  type="number"
                  min={1024}
                  max={32768}
                  step={512}
                  value={settings.memoryMax}
                  aria-label="Максимальная память, МБ"
                  onChange={(e) => setSettings({ ...settings, memoryMax: Math.max(1024, parseInt(e.target.value) || 4096) })}
                />
                <span className="settings-unit">МБ</span>
              </div>
              <span className="settings-hint">Для ваниллы хватит 2048 МБ, для модов — 4096–6144 МБ.</span>
              {ramWarning && <div className="form-error">{ramWarning}</div>}
              {systemInfo && (
                <button
                  className={`btn btn-sm align-start ${ramWarning ? '' : 'dimmed'}`}
                  onClick={() => setSettings({ ...settings, memoryMax: systemInfo.defaultMaxMemory })}
                >
                  Поставить {systemInfo.defaultMaxMemory} МБ для этого ПК
                </button>
              )}
            </div>
          </section>

          <section className="settings-section">
            <h3 className="settings-section-title">Java</h3>
            <div className="settings-field">
              <div className="settings-field-head">
                <span className="settings-field-label">Путь к Java</span>
                <span className="settings-meta">
                  {detectedJavas.length > 0 ? `найдено: ${detectedJavas.length}` : 'не найдена — скачаем'}
                </span>
              </div>
              <input
                className="form-input mono"
                placeholder="Авто — нужная версия скачается сама"
                value={settings.javaPath}
                onChange={(e) => setSettings({ ...settings, javaPath: e.target.value })}
              />
              {detectedJavas.length > 0 && (
                <div className="settings-java-row">
                  <select
                    className="form-select inline"
                    value={settings.javaPath}
                    onChange={(e) => setSettings({ ...settings, javaPath: e.target.value })}
                    aria-label="Выбрать найденную Java"
                  >
                    <option value="">Авто</option>
                    {detectedJavas.map((j) => (
                      <option key={j} value={j}>{j.split(/[/\\]/).slice(-3).join('/')}</option>
                    ))}
                  </select>
                  <span className="settings-hint">или укажите путь вручную</span>
                </div>
              )}
              <div className="settings-field-head settings-subhead">
                <span className="settings-field-label">JVM-аргументы</span>
              </div>
              <input
                className="form-input mono"
                placeholder="-Dfml.readTimeout=120"
                value={settings.customJvmArgs}
                onChange={(e) => setSettings({ ...settings, customJvmArgs: e.target.value })}
              />
            </div>
          </section>

          <section className="settings-section">
            <h3 className="settings-section-title">Запуск</h3>
            <div className="settings-switch-row">
              <div>
                <div className="settings-switch-label">Полноэкранный режим</div>
                <div className="settings-switch-hint">Запускать игру в fullscreen</div>
              </div>
              <Switch checked={settings.fullscreen} onChange={(v) => setSettings({ ...settings, fullscreen: v })} label="Полноэкранный режим" />
            </div>
            <div className="settings-switch-row">
              <div>
                <div className="settings-switch-label">Свёртывать лаунчер</div>
                <div className="settings-switch-hint">Скрывать окно после запуска игры</div>
              </div>
              <Switch checked={settings.closeLauncherOnGameStart} onChange={(v) => setSettings({ ...settings, closeLauncherOnGameStart: v })} label="Свёртывать лаунчер при запуске игры" />
            </div>
          </section>

          <section className="settings-section">
            <h3 className="settings-section-title">Данные</h3>
            <div className="settings-field">
              <span className="settings-hint">Сборки, миры, скины, библиотеки и скачанные версии игры.</span>
              <button className="btn btn-sm align-start" onClick={() => window.electronAPI.openLauncherFolder()}>
                Открыть папку лаунчера
              </button>
            </div>
          </section>
        </div>

        <div className="modal-footer settings-footer">
          <button className="btn" onClick={onClose}>Отмена</button>
          <button className="btn btn-primary" onClick={save}>Сохранить</button>
        </div>
      </div>
    </div>
  )
}
