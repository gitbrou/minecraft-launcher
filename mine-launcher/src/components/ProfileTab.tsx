import React, { useState, useEffect, useRef } from 'react'

interface ProfileTabProps {
  activeUsername: string
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ activeUsername }) => {
  const [stats, setStats] = useState<any>({
    username: activeUsername || 'Steve',
    worldsCount: 0,
    totalPlayTimeHours: 'Нет информации',
    lastPlayedFormatted: 'Нет информации',
    favoriteWorld: 'Нет информации',
    favoriteServer: 'Нет информации'
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [rotationY, setRotationY] = useState(25)
  const isDragging = useRef(false)
  const lastMouseX = useRef(0)

  useEffect(() => {
    if (activeUsername && window.electronAPI) {
      window.electronAPI.getProfileStats(activeUsername).then(setStats)
    }
  }, [activeUsername])

  // Canvas 2D/3D Isometric Minecraft Player Renderer (Rotatable, colorful & 100% reliable in Electron)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const centerX = canvas.width / 2
      const centerY = canvas.height / 2 + 10
      const rad = (rotationY * Math.PI) / 180

      const cos = Math.cos(rad)
      const sin = Math.sin(rad)

      // Gradient background glow inside 3D card
      const grad = ctx.createRadialGradient(centerX, centerY - 20, 10, centerX, centerY, 140)
      grad.addColorStop(0, 'rgba(20, 184, 166, 0.25)')
      grad.addColorStop(1, 'transparent')
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(centerX, centerY - 20, 140, 0, Math.PI * 2)
      ctx.fill()

      // Shadow on floor
      ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
      ctx.beginPath()
      ctx.ellipse(centerX, centerY + 165, 45, 14, 0, 0, Math.PI * 2)
      ctx.fill()

      ctx.save()
      ctx.translate(centerX, centerY)

      // Draw Minecraft Character Parts in 3D (Head, Torso, Arms, Legs)
      // Colors: Hair (#3d2314), Skin (#c68642), Shirt (#00a8a8), Pants (#1c2859)

      // 1. Head (Cube 3D perspective)
      const headY = -120
      const headSize = 44

      // Head Front Face
      ctx.fillStyle = '#c68642'
      ctx.fillRect(-headSize / 2 * cos, headY, headSize * cos, headSize)

      // Hair
      ctx.fillStyle = '#3d2314'
      ctx.fillRect(-headSize / 2 * cos, headY, headSize * cos, 12)

      // Eyes & Mouth (Front)
      if (cos > 0) {
        ctx.fillStyle = '#ffffff'
        ctx.fillRect(-14 * cos, headY + 18, 8 * cos, 6)
        ctx.fillRect(6 * cos, headY + 18, 8 * cos, 6)

        ctx.fillStyle = '#2b5884'
        ctx.fillRect(-10 * cos, headY + 18, 4 * cos, 6)
        ctx.fillRect(10 * cos, headY + 18, 4 * cos, 6)

        ctx.fillStyle = '#9c5b36'
        ctx.fillRect(-6 * cos, headY + 30, 12 * cos, 4)
      }

      // Head Side Shading Face
      ctx.fillStyle = '#a66a2e'
      ctx.beginPath()
      ctx.moveTo(headSize / 2 * cos, headY)
      ctx.lineTo(headSize / 2 * cos + 18 * sin, headY - 10)
      ctx.lineTo(headSize / 2 * cos + 18 * sin, headY + headSize - 10)
      ctx.lineTo(headSize / 2 * cos, headY + headSize)
      ctx.closePath()
      ctx.fill()

      // 2. Torso (Cyan/Teal Shirt)
      const torsoY = headY + headSize + 4
      const torsoW = 44
      const torsoH = 68

      ctx.fillStyle = '#00a8a8'
      ctx.fillRect(-torsoW / 2 * cos, torsoY, torsoW * cos, torsoH)

      // Torso Side Shading
      ctx.fillStyle = '#008585'
      ctx.beginPath()
      ctx.moveTo(torsoW / 2 * cos, torsoY)
      ctx.lineTo(torsoW / 2 * cos + 18 * sin, torsoY - 10)
      ctx.lineTo(torsoW / 2 * cos + 18 * sin, torsoY + torsoH - 10)
      ctx.lineTo(torsoW / 2 * cos, torsoY + torsoH)
      ctx.closePath()
      ctx.fill()

      // 3. Arms (Left & Right)
      const armW = 20
      const armH = 68

      // Left Arm
      ctx.fillStyle = '#008b8b'
      ctx.fillRect((-torsoW / 2 - armW) * cos, torsoY, armW * cos, armH)
      ctx.fillStyle = '#c68642'
      ctx.fillRect((-torsoW / 2 - armW) * cos, torsoY + 45, armW * cos, 23)

      // Right Arm
      ctx.fillStyle = '#00a8a8'
      ctx.fillRect((torsoW / 2) * cos, torsoY, armW * cos, armH)
      ctx.fillStyle = '#c68642'
      ctx.fillRect((torsoW / 2) * cos, torsoY + 45, armW * cos, 23)

      // 4. Legs (Blue Jeans)
      const legY = torsoY + torsoH + 2
      const legW = 20
      const legH = 75

      // Left Leg
      ctx.fillStyle = '#1c2859'
      ctx.fillRect(-legW * cos - 1, legY, legW * cos, legH)

      // Right Leg
      ctx.fillStyle = '#243473'
      ctx.fillRect(1, legY, legW * cos, legH)

      // Shoes
      ctx.fillStyle = '#404040'
      ctx.fillRect(-legW * cos - 1, legY + legH - 12, legW * cos, 12)
      ctx.fillRect(1, legY + legH - 12, legW * cos, 12)

      ctx.restore()

      animationFrameId = requestAnimationFrame(render)
    }

    render()

    return () => {
      cancelAnimationFrame(animationFrameId)
    }
  }, [rotationY])

  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    lastMouseX.current = e.clientX
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return
    const deltaX = e.clientX - lastMouseX.current
    lastMouseX.current = e.clientX
    setRotationY((prev) => (prev + deltaX * 1.2) % 360)
  }

  const handleMouseUp = () => {
    isDragging.current = false
  }

  return (
    <div
      style={{ flex: 1, display: 'flex', gap: '32px', alignItems: 'center', height: '100%', padding: '10px 20px', overflow: 'hidden' }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
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
          overflow: 'hidden',
          userSelect: 'none'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        title="Зажмите и тяните мышь влево/вправо для 3D вращения персонажа"
      >
        <canvas ref={canvasRef} width={250} height={460} style={{ width: '250px', height: '460px', borderRadius: '18px', display: 'block' }} />
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
