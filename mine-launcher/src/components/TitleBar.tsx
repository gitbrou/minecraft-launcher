import React from 'react'

export const TitleBar: React.FC = () => {
  return (
    <header className="title-bar">
      <div className="title-bar-drag-area">
        <svg width="18" height="18" viewBox="0 0 32 32" style={{ borderRadius: '3px' }}>
          <rect x="0" y="0" width="32" height="32" fill="#8B5A2B" />
          <path d="M0 0 H32 V12 H0 Z" fill="#53921b" />
        </svg>
        <span className="title-bar-text">Mine Launcher</span>
      </div>
    </header>
  )
}
