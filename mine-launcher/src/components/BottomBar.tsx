import React, { useState, useRef, useEffect } from 'react'
import { Instance, LaunchProgress } from '../types'

interface BottomBarProps {
  instances: Instance[]
  selectedInstance: Instance | null
  hasAccount: boolean
  onSelectInstance: (instance: Instance) => void
  onLaunch: () => void
  onStop: () => void
  launchProgress: LaunchProgress | null
}

const IconStop = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <rect x="6" y="6" width="12" height="12" rx="2" />
  </svg>
)

export const BottomBar: React.FC<BottomBarProps> = ({
  instances,
  selectedInstance,
  hasAccount,
  onSelectInstance,
  onLaunch,
  onStop,
  launchProgress
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', onDocClick)
      return () => document.removeEventListener('mousedown', onDocClick)
    }
  }, [dropdownOpen])

  const isActiveProgress = (p: LaunchProgress | null) =>
    p && (p.stage === 'downloading' || p.stage === 'checking' || p.stage === 'launching' || p.stage === 'extracting')

  const isActiveForSelected = isActiveProgress(launchProgress) && launchProgress!.instanceId === selectedInstance?.id
  const isRunning = launchProgress?.stage === 'running' && launchProgress.instanceId === selectedInstance?.id

  // Почему кнопка недоступна — показываем пользователю текст, а не просто серую кнопку
  let disabledReason: string | null = null
  if (!selectedInstance) disabledReason = 'Создайте сборку, чтобы играть'
  else if (!hasAccount) disabledReason = 'Добавьте аккаунт на панели слева'

  const disabled = !!disabledReason || isActiveForSelected || isRunning
  const errorText = launchProgress?.stage === 'error' && launchProgress?.instanceId === selectedInstance?.id
    ? launchProgress.statusText
    : null

  const getButtonText = () => {
    if (isActiveForSelected) {
      return `${launchProgress!.statusText || 'Загрузка...'} ${Math.round(launchProgress!.progress)}%`
    }
    if (isRunning) return 'Игра запущена'
    return 'Играть'
  }

  return (
    <>
      {errorText && (
        <div className="error-strip">
          <span className="error-strip-text">{errorText}</span>
          <button
            className="btn btn-ghost"
            style={{ fontSize: '11px', padding: '3px 10px' }}
            title="Перейдите на вкладку «Логи» для полной информации"
          >
            Смотрите вкладку «Логи»
          </button>
        </div>
      )}
      <div className="bottom-bar">
      <div className="bottom-bar-inner">
      <div className="launch-instance-selector" ref={menuRef}>
        <button className="selector-trigger" onClick={() => setDropdownOpen(!dropdownOpen)}>
          <div>
            <div className="selector-title">{selectedInstance?.name || 'Нет сборки'}</div>
            <div className="selector-sub">
              {selectedInstance ? `Minecraft ${selectedInstance.version} · ${selectedInstance.loader}` : 'Создайте сборку'}
            </div>
          </div>
          <span className={`selector-arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>

          {dropdownOpen && (
            <div className="selector-menu" onClick={(e) => e.stopPropagation()}>
              {instances.map((inst) => (
                <div
                  key={inst.id}
                  className={`selector-item ${selectedInstance?.id === inst.id ? 'active' : ''}`}
                  onClick={() => { onSelectInstance(inst); setDropdownOpen(false) }}
                >
                  <span className="selector-item-name">{inst.name}</span>
                  <span className="selector-item-meta">{inst.version}</span>
                </div>
              ))}
            </div>
          )}
        </button>
      </div>

      <button
        className={`play-button ${isActiveForSelected ? 'launching' : ''}`}
        onClick={onLaunch}
        disabled={disabled}
        title={disabledReason || 'Запустить Minecraft'}
      >
        {isActiveForSelected && <div className="play-progress-fill" style={{ width: `${launchProgress!.progress || 0}%` }} />}
        <span className="play-button-text">
          {disabledReason && !isActiveForSelected && !isRunning ? disabledReason : getButtonText()}
        </span>
      </button>

      <button
        className="btn btn-danger"
        onClick={onStop}
        disabled={!isRunning && !isActiveForSelected}
        title="Принудительно остановить игру"
      >
        <IconStop /> Остановить
      </button>
      </div>
      </div>
    </>
  )
}
