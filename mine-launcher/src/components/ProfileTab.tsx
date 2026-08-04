import React, { useState, useEffect, useRef } from 'react'
import { SkinViewer, IdleAnimation } from 'skinview3d'

interface ProfileTabProps {
  activeUsername: string
}

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

  const [skinUrl, setSkinUrl] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const viewerRef = useRef<SkinViewer | null>(null)

  useEffect(() => {
    if (activeUsername && window.electronAPI) {
      window.electronAPI.getProfileStats(activeUsername).then(setStats)
      window.electronAPI.getUserSkin(activeUsername).then((url) => {
        setSkinUrl(url || DEFAULT_STEVE_SKIN)
      })
    } else {
      setSkinUrl(DEFAULT_STEVE_SKIN)
    }
  }, [activeUsername])

  // Initialize 3D Interactive Skin Viewer
  useEffect(() => {
    if (!canvasRef.current) return

    try {
      const viewer = new SkinViewer({
        canvas: canvasRef.current,
        width: 260,
        height: 470,
        skin: skinUrl || DEFAULT_STEVE_SKIN
      })

      viewer.controls.enableRotate = true
      viewer.controls.enableZoom = true
      viewer.controls.enablePan = false
      viewer.animation = new IdleAnimation()
      viewerRef.current = viewer

      return () => {
        try {
          viewer.dispose()
        } catch {}
      }
    } catch (err) {
      console.error('Failed 3D SkinViewer init:', err)
    }
  }, [skinUrl])

  return (
    <div style={{ flex: 1, display: 'flex', gap: '32px', alignItems: 'center', height: '100%', padding: '10px 20px', overflow: 'hidden' }}>
      {/* Left 3D Rotatable Skin Projection Card */}
      <div
        style={{
          width: '270px',
          height: '485px',
          borderRadius: '24px',
          background: 'radial-gradient(circle at center, #374151 0%, #111827 100%)',
          border: '3px solid #14b8a6',
          boxShadow: '0 0 24px rgba(20, 184, 166, 0.35)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
          cursor: 'grab'
        }}
        title="3D модель персонажа"
      >
        <canvas ref={canvasRef} style={{ width: '260px', height: '470px', borderRadius: '20px', display: 'block' }} />
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
    </div>
  )
}
