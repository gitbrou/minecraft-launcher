import React, { useState, useEffect } from 'react'

const IconLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m2 4v4h4v2H8v6h2v-2h4v2h2v-6h-2v-2h4V6h-4v4h-4V6z" />
  </svg>
)

const IconMinimize = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="M5 12h14" />
  </svg>
)

const IconMaximize = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="5" y="5" width="14" height="14" rx="1.5" />
  </svg>
)

const IconRestore = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="4" y="9" width="11" height="11" rx="1.5" />
    <path d="M8 9V6a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-3" />
  </svg>
)

const IconClose = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <path d="m6 6l12 12M18 6L6 18" />
  </svg>
)

export const TitleBar: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    window.electronAPI?.isMaximized?.().then(setIsMaximized)
  }, [])

  const handleToggleMaximize = () => {
    window.electronAPI?.maximizeWindow?.().then((maxed: boolean) => setIsMaximized(maxed))
  }

  return (
    <header className="titlebar">
      <div className="titlebar-brand">
        <span className="titlebar-logo"><IconLogo /></span>
        <span className="titlebar-title">Mine Launcher</span>
      </div>

      <div className="titlebar-controls">
        <button className="titlebar-btn" title="Свернуть" onClick={() => window.electronAPI?.minimizeWindow?.()}>
          <IconMinimize />
        </button>

        <button className="titlebar-btn" title={isMaximized ? 'Восстановить' : 'Развернуть'} onClick={handleToggleMaximize}>
          {isMaximized ? <IconRestore /> : <IconMaximize />}
        </button>

        <button className="titlebar-btn close" title="Закрыть" onClick={() => window.electronAPI?.closeWindow?.()}>
          <IconClose />
        </button>
      </div>
    </header>
  )
}
