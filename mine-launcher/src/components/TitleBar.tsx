import React from 'react'

const IconMinecraft = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#53921b">
    <path d="M4 2h16a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2m2 4v4h4v2H8v6h2v-2h4v2h2v-6h-2v-2h4V6h-4v4h-4V6z" />
  </svg>
)

export const TitleBar: React.FC = () => {
  return (
    <header className="title-bar">
      <div className="title-bar-drag-area">
        <IconMinecraft />
        <span className="title-bar-text">Mine Launcher</span>
      </div>
    </header>
  )
}
