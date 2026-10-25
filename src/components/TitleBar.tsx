import React, { useState, useEffect } from 'react'

const IconLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m2 4v4h4v2H8v6h2v-2h4v2h2v-6h-2v-2h4V6h-4v4h-4V6z" />
  </svg>
)

const IconMinimize = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 20q-.213 0-.356-.144t-.144-.357t.144-.356T7 19h10q.213 0 .356.144t.144.357t-.144.356T17 20z" />
  </svg>
)

const IconExpand = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5">
    <path d="M19 12V9c0-1.886 0-2.828-.586-3.414S16.886 5 15 5h-3m-7 7v3c0 1.886 0 2.828.586 3.414S7.114 19 9 19h3" />
  </svg>
)

const IconCollapse = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 15h7v7h2v-9H2zM15 2h-2v9h9V9h-7z" />
  </svg>
)

const IconClose = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16z" />
  </svg>
)

// Стандартные виндовые caption-кнопки: 10×10, штрих 1px, выровнены по сетке
const WinMinimize = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M0 5.5h10" />
  </svg>
)
const WinMaximize = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="0.5" y="0.5" width="9" height="9" />
  </svg>
)
const WinRestore = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
    <rect x="0.5" y="2.5" width="7" height="7" />
    <path d="M2.5 2.5V0.5h7v7h-2" />
  </svg>
)
const WinClose = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="currentColor" strokeWidth="1">
    <path d="M0.5 0.5l9 9M9.5 0.5l-9 9" />
  </svg>
)

export const TitleBar: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false)
  const isWindows = window.electronAPI?.platform === 'win32'

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
          {isWindows ? <WinMinimize /> : <IconMinimize />}
        </button>

        <button className="titlebar-btn" title={isMaximized ? 'Восстановить' : 'Развернуть'} onClick={handleToggleMaximize}>
          {isWindows
            ? (isMaximized ? <WinRestore /> : <WinMaximize />)
            : (isMaximized ? <IconCollapse /> : <IconExpand />)}
        </button>

        <button className="titlebar-btn close" title="Закрыть" onClick={() => window.electronAPI?.closeWindow?.()}>
          {isWindows ? <WinClose /> : <IconClose />}
        </button>
      </div>
    </header>
  )
}
