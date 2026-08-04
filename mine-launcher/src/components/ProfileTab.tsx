import React, { useState, useEffect, useRef } from 'react'
import { SkinViewer, IdleAnimation } from 'skinview3d'
import * as THREE from 'three'

interface ProfileTabProps {
  activeUsername: string
}

// Failsafe 64x64 Steve skin PNG texture
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
          height: 460,
          skin: skinUrl || DEFAULT_STEVE_SKIN
        })

        // Add explicit THREE.js Ambient and Directional Lights
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

  return (
    <div style={{ flex: 1, display: 'flex', gap: '32px', alignItems: 'center', height: '100%', padding: '10px 20px', overflow: 'hidden' }}>
      {/* Left 3D Rotatable Skin Projection Card */}
      <div
        style={{
          width: '260px',
          height: '475px',
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
        <canvas ref={canvasRef} style={{ width: '250px', height: '460px', borderRadius: '18px', display: 'block' }} />
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
