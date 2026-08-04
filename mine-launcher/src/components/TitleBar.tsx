import React, { useState, useEffect } from 'react'

const IconMinecraft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#53921b">
    <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m2 4v4h4v2H8v6h2v-2h4v2h2v-6h-2v-2h4V6h-4v4h-4V6z" />
  </svg>
)

const IconMinimize = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M7 20q-.213 0-.356-.144t-.144-.357t.144-.356T7 19h10q.213 0 .356.144t.144.357t-.144.356T17 20z" />
  </svg>
)

const IconExpand = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeMiterlimit="16" strokeWidth="1.5">
    <path d="M19 12V9c0-1.886 0-2.828-.586-3.414S16.886 5 15 5h-3m-7 7v3c0 1.886 0 2.828.586 3.414S7.114 19 9 19h3" />
  </svg>
)

const IconCollapse = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M2 15h7v7h2v-9H2zM15 2h-2v9h9V9h-7z" />
  </svg>
)

const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="m12 12.708l-5.246 5.246q-.14.14-.344.15t-.364-.15t-.16-.354t.16-.354L11.292 12L6.046 6.754q-.14-.14-.15-.344t.15-.364t.354-.16t.354.16L12 11.292l5.246-5.246q.14-.14.345-.15q.203-.01.363.15t.16.354t-.16.354L12.708 12l5.246 5.246q.14.14.15.345q.01.203-.15.363t-.354.16t-.354-.16z" />
  </svg>
)

export const TitleBar: React.FC = () => {
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.isMaximized().then(setIsMaximized)
    }
  }, [])

  const handleMinimize = () => {
    if (window.electronAPI) {
      window.electronAPI.minimizeWindow()
    }
  }

  const handleToggleMaximize = async () => {
    if (window.electronAPI) {
      const maxed = await window.electronAPI.maximizeWindow()
      setIsMaximized(maxed)
    }
  }

  const handleClose = () => {
    if (window.electronAPI) {
      window.electronAPI.closeWindow()
    }
  }

  return (
    <header
      className="title-bar"
      style={{
        WebkitAppRegion: 'drag',
        userSelect: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '36px',
        padding: '0 8px 0 14px',
        background: '#0e0f12'
      } as any}
    >
      <div className="title-bar-drag-area" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <IconMinecraft />
        <span className="title-bar-text" style={{ fontSize: '13px', fontWeight: '600', color: '#ccc' }}>Mine Launcher</span>
      </div>

      {/* Non-draggable Custom Window Controls */}
      <div className="window-controls" style={{ WebkitAppRegion: 'no-drag', display: 'flex', alignItems: 'center', height: '100%' } as any}>
        <button
          onClick={handleMinimize}
          title="Свернуть"
          style={{
            background: 'none',
            border: 'none',
            color: '#888',
            height: '36px',
            width: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
        >
          <IconMinimize />
        </button>

        <button
          onClick={handleToggleMaximize}
          title={isMaximized ? 'Восстановить' : 'Развернуть'}
          style={{
            background: 'none',
            border: 'none',
            color: '#888',
            height: '36px',
            width: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#888')}
        >
          {isMaximized ? <IconCollapse /> : <IconExpand />}
        </button>

        <button
          onClick={handleClose}
          title="Закрыть"
          style={{
            background: 'none',
            border: 'none',
            color: '#888',
            height: '36px',
            width: '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#fff'
            e.currentTarget.style.background = '#ff4d4d'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#888'
            e.currentTarget.style.background = 'none'
          }}
        >
          <IconClose />
        </button>
      </div>
    </header>
  )
}
