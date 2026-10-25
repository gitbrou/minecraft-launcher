import React, { useState, useRef, useEffect } from 'react'
import { Instance, LaunchProgress } from '../types'
import { loaderIcon, loaderLabel } from '../utils/loaderIcons'

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

  const shortReason = !selectedInstance ? 'Нет сборки' : !hasAccount ? 'Нет аккаунта' : null

  return (
    <>
      {errorText && (
        <div className="error-strip" role="alert">
          <span className="error-strip-text">{errorText}</span>
        </div>
      )}
      <div className="bottom-bar">
        <div className="bottom-bar-inner">
          <div className="launch-instance-selector" ref={menuRef}>
            <button
              className="launch-target"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-haspopup="listbox"
              aria-expanded={dropdownOpen}
              aria-label="Выбрать сборку для запуска"
            >
              <img className={`instance-icon ${selectedInstance?.loader === 'quilt' ? 'is-smooth' : ''}`} src={loaderIcon(selectedInstance?.loader)} alt="" width={20} height={20} aria-hidden="true" />
              <span className="launch-target-main">
                <span className="launch-target-name">{selectedInstance?.name || 'Нет сборки'}</span>
                <span className="launch-target-sub">
                  {selectedInstance ? `${selectedInstance.version} · ${loaderLabel(selectedInstance.loader)}` : 'Создайте сборку'}
                </span>
              </span>
              <span className={`selector-arrow ${dropdownOpen ? 'open' : ''}`} aria-hidden="true">▾</span>
            </button>

            {dropdownOpen && (
              <div className="selector-menu" role="listbox" aria-label="Сборки" onClick={(e) => e.stopPropagation()}>
                {instances.map((inst) => (
                  <div
                    key={inst.id}
                    role="option"
                    aria-selected={selectedInstance?.id === inst.id}
                    className={`selector-item ${selectedInstance?.id === inst.id ? 'active' : ''}`}
                    onClick={() => { onSelectInstance(inst); setDropdownOpen(false) }}
                  >
                    <span className="selector-item-name">{inst.name}</span>
                    <span className="selector-item-meta">{inst.version}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="bottom-bar-fill" />

          {launchProgress?.stage === 'running' && (
            <button className="btn stop-button" onClick={onStop} title="Остановить игру">
              <IconStop /> Остановить
            </button>
          )}

          <button
            className={`play-button ${isActiveForSelected ? 'launching' : ''}`}
            onClick={() => onLaunch()}
            disabled={disabled}
            title={disabledReason || 'Запустить Minecraft'}
          >
            {isActiveForSelected && <div className="play-progress-fill" style={{ width: `${launchProgress!.progress || 0}%` }} />}
            <span className="play-button-text">
              {shortReason && !isActiveForSelected && !isRunning ? shortReason : getButtonText()}
            </span>
          </button>
        </div>
      </div>
    </>
  )
}
