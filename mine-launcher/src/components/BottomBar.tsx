import React, { useState } from 'react'
import { Instance, LaunchProgress } from '../types'

interface BottomBarProps {
  instances: Instance[]
  selectedInstance: Instance | null
  onSelectInstance: (instance: Instance) => void
  onLaunch: () => void
  launchProgress: LaunchProgress | null
}

export const BottomBar: React.FC<BottomBarProps> = ({
  instances,
  selectedInstance,
  onSelectInstance,
  onLaunch,
  launchProgress
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const isLaunching = launchProgress && (launchProgress.stage === 'downloading' || launchProgress.stage === 'checking' || launchProgress.stage === 'launching')
  const isRunning = launchProgress?.stage === 'running'

  const getButtonText = () => {
    if (isRunning) return 'В игре'
    if (launchProgress?.stage === 'downloading') {
      return `Скачивание ${Math.round(launchProgress.progress)}%`
    }
    if (launchProgress?.stage === 'launching') return 'Запуск...'
    if (launchProgress?.stage === 'checking') return 'Проверка...'
    return 'Играть'
  }

  return (
    <div className="bottom-bar">
      <div className="controls-column">
        {/* Version Selector Dropdown Pill */}
        <div
          className="version-selector-pill"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          <div className="version-info">
            {/* Minecraft Grass Block SVG Icon */}
            <svg className="grass-icon" viewBox="0 0 32 32">
              <rect x="0" y="0" width="32" height="32" fill="#8B5A2B" rx="4" />
              <path d="M0 0 H32 V12 H0 Z" fill="#53921b" />
              <path d="M4 12 V16 H8 V12 Z M12 12 V18 H16 V12 Z M20 12 V15 H24 V12 Z M26 12 V17 H30 V12 Z" fill="#437715" />
            </svg>

            <span className="version-text">
              {selectedInstance ? selectedInstance.name : 'Версия'}
            </span>
          </div>

          <span className={`dropdown-arrow ${dropdownOpen ? 'open' : ''}`}>▼</span>

          {dropdownOpen && (
            <div className="version-menu-popup" onClick={(e) => e.stopPropagation()}>
              {instances.map((inst) => (
                <div
                  key={inst.id}
                  className={`version-menu-item ${selectedInstance?.id === inst.id ? 'active' : ''}`}
                  onClick={() => {
                    onSelectInstance(inst)
                    setDropdownOpen(false)
                  }}
                >
                  <span>{inst.name}</span>
                  <small style={{ color: '#999' }}>{inst.version} ({inst.loader})</small>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Green "Играть" Button matching Group.svg */}
        <button
          className={`play-button ${isLaunching ? 'launching' : ''}`}
          onClick={onLaunch}
          disabled={isLaunching || isRunning}
        >
          {isLaunching && (
            <div
              className="launch-progress-fill"
              style={{ width: `${launchProgress.progress || 0}%` }}
            />
          )}
          <span className="play-button-text">{getButtonText()}</span>
        </button>
      </div>
    </div>
  )
}
