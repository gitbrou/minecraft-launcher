import React, { useState, useEffect, useRef } from 'react'
import { SkinViewer, IdleAnimation } from 'skinview3d'
import * as THREE from 'three'

interface ProfileTabProps {
  activeUsername: string
}

// User SVGs
const IconUpload = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M11 16V7.85l-2.6 2.6L7 9l5-5l5 5l-1.4 1.45l-2.6-2.6V16zm-5 4q-.825 0-1.412-.587T4 18v-3h2v3h12v-3h2v3q0 .825-.587 1.413T18 20z" />
  </svg>
)

const IconTerminalCmd = () => (
  <svg width="20" height="20" viewBox="0 0 16 16" fill="currentColor">
    <path d="M12.5 1h-9A2.5 2.5 0 0 0 1 3.5v9A2.5 2.5 0 0 0 3.5 15h9a2.5 2.5 0 0 0 2.5-2.5v-9A2.5 2.5 0 0 0 12.5 1M14 12.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 12.5V5h12zM14 4H2v-.5A1.5 1.5 0 0 1 3.5 2h9A1.5 1.5 0 0 1 14 3.5zM4 10.508v-2c0-.827.673-1.5 1.5-1.5s1.5.673 1.5 1.5a.5.5 0 0 1-1 0a.5.5 0 0 0-1 0v2a.5.5 0 0 0 1 0a.5.5 0 0 1 1 0c0 .827-.673 1.5-1.5 1.5s-1.5-.673-1.5-1.5M8 8.5a.5.5 0 1 1 1 0a.5.5 0 0 1-1 0m0 2a.5.5 0 1 1 1 0a.5.5 0 0 1-1 0m1.532-2.824a.5.5 0 0 1 .292-.644a.5.5 0 0 1 .644.292l1.5 4A.5.5 0 0 1 11.5 12a.5.5 0 0 1-.468-.324z" />
  </svg>
)

const DEFAULT_STEVE_SKIN = 'https://textures.minecraft.net/texture/31f477eb3753239a5f36e4f16b23d0c9fbf8f09d841e247b9015119a008c2a86'

export const ProfileTab: React.FC<ProfileTabProps> = ({ activeUsername }) => {
  const [stats, setStats] = useState<any>({
    username: activeUsername || 'Steve',
    worldsCount: 0,
    totalPlayTimeHours: 'Нет информации',
    lastPlayedFormatted: 'Нет информации',
    favoriteWorld: 'Нет информации',
    favoriteServer: 'Нет информации'
  })

  const [skinUrl, setSkinUrl] = useState<string>(DEFAULT_STEVE_SKIN)
  const [showCmdModal, setShowCmdModal] = useState(false)
  const [cmdText, setCmdText] = useState('')
  const [cmdError, setCmdError] = useState('')
  const [loadingCmd, setLoadingCmd] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const viewerRef = useRef<SkinViewer | null>(null)

  useEffect(() => {
    if (activeUsername && window.electronAPI) {
      window.electronAPI.getProfileStats(activeUsername).then(setStats)
      window.electronAPI.getUserSkin(activeUsername).then((url) => {
        if (url) {
          setSkinUrl(url)
        } else {
          setSkinUrl(DEFAULT_STEVE_SKIN)
        }
      }).catch(() => {
        setSkinUrl(DEFAULT_STEVE_SKIN)
      })
    }
  }, [activeUsername])

  // Initialize 3D Real Minecraft Character Model with THREE.js lights
  useEffect(() => {
    let viewer: SkinViewer | null = null

    const timer = setTimeout(() => {
      if (!canvasRef.current) return
      try {
        viewer = new SkinViewer({
          canvas: canvasRef.current,
          width: 250,
          height: 420,
          skin: skinUrl || DEFAULT_STEVE_SKIN
        })

        const ambientLight = new THREE.AmbientLight(0xffffff, 2.5)
        viewer.scene.add(ambientLight)

        const dirLight = new THREE.DirectionalLight(0xffffff, 1.5)
        dirLight.position.set(10, 20, 15)
        viewer.scene.add(dirLight)

        viewer.loadSkin(skinUrl || DEFAULT_STEVE_SKIN)

        if (viewer.playerObject) {
          viewer.playerObject.rotation.y = 0.5
        }

        viewer.controls.enableRotate = true
        viewer.controls.enableZoom = true
        viewer.controls.enablePan = false
        viewer.animation = new IdleAnimation()
        viewerRef.current = viewer
      } catch (err) {
        console.error('SkinViewer init error:', err)
      }
    }, 100)

    return () => {
      clearTimeout(timer)
      if (viewer) {
        try {
          viewer.dispose()
        } catch {}
      }
    }
  }, [skinUrl])

  const handleUploadSkin = async () => {
    if (window.electronAPI) {
      const newSkin = await window.electronAPI.uploadUserSkin(activeUsername)
      if (newSkin) {
        setSkinUrl(newSkin)
      }
    }
  }

  const handleParseCommandSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!cmdText.trim()) return
    setLoadingCmd(true)
    setCmdError('')
    try {
      if (window.electronAPI) {
        const newSkin = await window.electronAPI.parseCommandSkin({
          username: activeUsername,
          command: cmdText
        })
        if (newSkin) {
          setSkinUrl(newSkin)
          setShowCmdModal(false)
          setCmdText('')
        }
      }
    } catch (err: any) {
      setCmdError(err.message || 'Ошибка обработки команды скина')
    } finally {
      setLoadingCmd(false)
    }
  }

  return (
    <div style={{ flex: 1, display: 'flex', gap: '32px', alignItems: 'center', height: '100%', padding: '10px 20px', overflow: 'hidden' }}>
      {/* Left Column: 3D Rotatable Skin Projection Card + 2 Icon Buttons underneath */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', alignItems: 'center' }}>
        <div
          style={{
            width: '260px',
            height: '430px',
            borderRadius: '24px',
            background: 'radial-gradient(circle at center, #2d3748 0%, #111827 100%)',
            border: '3px solid #14b8a6',
            boxShadow: '0 0 24px rgba(20, 184, 166, 0.35)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            cursor: 'grab',
            overflow: 'hidden'
          }}
          title="3D модель персонажа (тяните мышь для 3D вращения)"
        >
          <canvas ref={canvasRef} style={{ width: '250px', height: '420px', borderRadius: '18px', display: 'block' }} />
        </div>

        {/* 2 Clean Icon-Only Action Buttons right under 3D model card */}
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', width: '260px' }}>
          {/* Button 1: Upload PNG file */}
          <button
            onClick={handleUploadSkin}
            title="Загрузить скин (.png)"
            style={{
              flex: 1,
              height: '42px',
              background: '#14b8a6',
              border: 'none',
              borderRadius: '12px',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(20, 184, 166, 0.35)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#0d9488')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#14b8a6')}
          >
            <IconUpload />
          </button>

          {/* Button 2: Import Skin via /give Command */}
          <button
            onClick={() => setShowCmdModal(true)}
            title="Импортировать скин по команде Minecraft (/give @p minecraft:player_head...)"
            style={{
              flex: 1,
              height: '42px',
              background: '#3b82f6',
              border: 'none',
              borderRadius: '12px',
              color: '#ffffff',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 14px rgba(59, 130, 246, 0.35)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = '#2563eb')}
            onMouseLeave={(e) => (e.currentTarget.style.background = '#3b82f6')}
          >
            <IconTerminalCmd />
          </button>
        </div>
      </div>

      {/* Right Account Info exact labels */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px', color: '#ffffff', fontFamily: 'serif, system-ui' }}>
        <h2 style={{ fontSize: '26px', margin: '0 0 10px 0', fontWeight: 'bold', borderBottom: '1px solid rgba(255,255,255,0.15)', paddingBottom: '8px' }}>
          Информация
        </h2>

        <div style={{ fontSize: '20px', lineHeight: '1.8' }}>
          <div>
            <strong>Ник:</strong> <span style={{ color: '#2dd4bf' }}>{stats.username}</span>
          </div>

          <div>
            <strong>Миры:</strong> <span>{stats.worldsCount}</span>
          </div>

          <div>
            <strong>Часов в игре:</strong> <span>{stats.totalPlayTimeHours}</span>
          </div>

          <div>
            <strong>Последний запуск:</strong> <span>{stats.lastPlayedFormatted}</span>
          </div>

          <div style={{ border: '1px solid #14b8a6', padding: '6px 12px', borderRadius: '6px', width: 'fit-content', marginTop: '6px' }}>
            <strong>Любимый мир:</strong> <span>{stats.favoriteWorld}</span>
          </div>

          <div style={{ border: '1px solid #14b8a6', padding: '6px 12px', borderRadius: '6px', width: 'fit-content', marginTop: '8px' }}>
            <strong>Любимый сервер:</strong> <span>{stats.favoriteServer}</span>
          </div>
        </div>
      </div>

      {/* Command Skin Import Modal */}
      {showCmdModal && (
        <div className="modal-overlay" onClick={() => setShowCmdModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()} style={{ width: '560px' }}>
            <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <IconTerminalCmd /> Импорт скина по команде Minecraft
            </h3>

            <form onSubmit={handleParseCommandSubmit}>
              <div className="form-group">
                <label>Вставьте команду (/give @p minecraft:player_head... или URL):</label>
                <textarea
                  rows={4}
                  placeholder='/give @p minecraft:player_head[profile={properties:[{name:"textures",value:"e3RleHR1..."}]}]'
                  value={cmdText}
                  onChange={(e) => setCmdText(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '8px',
                    background: '#12141a',
                    border: '1px solid rgba(255,255,255,0.15)',
                    color: '#00ff66',
                    fontFamily: 'monospace',
                    fontSize: '12px',
                    outline: 'none',
                    resize: 'none'
                  }}
                />
              </div>

              {cmdError && <div style={{ color: '#ff4d4d', fontSize: '13px', marginBottom: '10px' }}>{cmdError}</div>}

              <div className="modal-actions">
                <button type="button" className="btn-secondary" onClick={() => setShowCmdModal(false)}>
                  Отмена
                </button>
                <button type="submit" className="btn-primary" disabled={loadingCmd}>
                  {loadingCmd ? 'Загрузка...' : 'Импортировать скин'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
