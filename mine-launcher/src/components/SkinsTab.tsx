import React, { useState, useEffect, useRef } from 'react'

interface SkinsTabProps {
  activeUsername: string
}

const IconSkinsFilled = () => (
  <svg width="22" height="22" viewBox="0 0 1024 1024" fill="currentColor">
    <path d="M870 126H663.8c-17.4 0-32.9 11.9-37 29.3C614.3 208.1 567 246 512 246s-102.3-37.9-114.8-90.7a37.93 37.93 0 0 0-37-29.3H154a44 44 0 0 0-44 44v252a44 44 0 0 0 44 44h75v388a44 44 0 0 0 44 44h478a44 44 0 0 0 44-44V466h75a44 44 0 0 0 44-44V170a44 44 0 0 0-44-44" />
  </svg>
)

export const SkinsTab: React.FC<SkinsTabProps> = ({ activeUsername }) => {
  const [skinDataUrl, setSkinDataUrl] = useState<string | null>(null)
  const [statusMsg, setStatusMsg] = useState('')
  const [targetSkinNick, setTargetSkinNick] = useState(activeUsername || '')
  const [loading, setLoading] = useState(false)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    setTargetSkinNick(activeUsername || '')
    if (activeUsername && window.electronAPI) {
      window.electronAPI.getUserSkin(activeUsername).then((url) => {
        setSkinDataUrl(url)
      })
    }
  }, [activeUsername])

  useEffect(() => {
    if (!skinDataUrl || !canvasRef.current) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.imageSmoothingEnabled = false
    const img = new Image()
    img.crossOrigin = 'anonymous'
    img.src = skinDataUrl
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      // Head
      ctx.drawImage(img, 8, 8, 8, 8, 36, 10, 64, 64)
      // Body
      ctx.drawImage(img, 20, 20, 8, 12, 36, 78, 64, 96)
      // Left Arm
      ctx.drawImage(img, 44, 20, 4, 12, 0, 78, 32, 96)
      // Right Arm
      ctx.drawImage(img, 44, 20, 4, 12, 104, 78, 32, 96)
      // Left Leg
      ctx.drawImage(img, 4, 20, 4, 12, 36, 178, 32, 96)
      // Right Leg
      ctx.drawImage(img, 4, 20, 4, 12, 68, 178, 32, 96)
    }
  }, [skinDataUrl])

  const handleUploadLocalSkin = async () => {
    if (!activeUsername) return
    setStatusMsg('')
    try {
      if (window.electronAPI) {
        const result = await window.electronAPI.saveUserSkin(activeUsername)
        if (result) {
          const url = await window.electronAPI.getUserSkin(activeUsername)
          setSkinDataUrl(url)
          setStatusMsg(`Скин для "${activeUsername}" установлен!`)
        }
      }
    } catch (err: any) {
      setStatusMsg(`Ошибка: ${err.message}`)
    }
  }

  const handleFetchOnlineSkin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!activeUsername || !targetSkinNick.trim()) return
    setLoading(true)
    setStatusMsg(`Загрузка скина "${targetSkinNick.trim()}"...`)
    try {
      if (window.electronAPI) {
        const dataUrl = await window.electronAPI.fetchOnlineSkin({
          username: activeUsername,
          targetUsername: targetSkinNick.trim()
        })
        setSkinDataUrl(dataUrl)
        setStatusMsg(`Скин "${targetSkinNick.trim()}" установлен для ${activeUsername}!`)
      }
    } catch (err: any) {
      setStatusMsg(`Ошибка: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '14px', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '20px', margin: 0, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: '#a855f7' }}><IconSkinsFilled /></span> Скин аккаунта: <span style={{ color: '#53921b' }}>{activeUsername || 'Steve'}</span>
        </h3>
        <button className="btn-primary" onClick={handleUploadLocalSkin} style={{ background: '#a855f7' }}>
          📂 Загрузить файл .png
        </button>
      </div>

      <form onSubmit={handleFetchOnlineSkin} style={{ display: 'flex', gap: '10px', background: 'rgba(255,255,255,0.05)', padding: '10px', borderRadius: '10px' }}>
        <input
          type="text"
          placeholder="Поиск скина по нику (Ely.by / Mojang)..."
          value={targetSkinNick}
          onChange={(e) => setTargetSkinNick(e.target.value)}
          style={{ flex: 1, padding: '8px 12px', borderRadius: '6px', background: '#121317', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }}
        />
        <button type="submit" className="btn-primary" disabled={loading} style={{ background: '#3b82f6', padding: '8px 16px' }}>
          {loading ? 'Загрузка...' : 'Загрузить по нику'}
        </button>
      </form>

      {statusMsg && (
        <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(83, 146, 27, 0.2)', color: '#6eff8b', fontSize: '13px' }}>
          {statusMsg}
        </div>
      )}

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', background: 'rgba(0, 0, 0, 0.4)', borderRadius: '14px', padding: '20px', flex: 1 }}>
        {skinDataUrl ? (
          <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
            <canvas ref={canvasRef} width="136" height="280" style={{ display: 'block' }} />
            <img src={skinDataUrl} alt="Skin Texture" style={{ width: '160px', height: '160px', imageRendering: 'pixelated', objectFit: 'contain' }} />
          </div>
        ) : (
          <div style={{ textAlign: 'center', color: '#777' }}>
            <p style={{ fontSize: '15px' }}>Скин не выбран. Загрузите файл .png или введите ник для скачивания.</p>
          </div>
        )}
      </div>
    </div>
  )
}
