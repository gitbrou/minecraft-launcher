import React, { useState, useEffect, useRef } from 'react'
import { SkinViewer, IdleAnimation } from 'skinview3d'

interface ProfileTabProps {
  activeUsername: string
}

// Built-in Steve skin data URL to avoid external CORS blocking in Electron WebGL
const STEVE_SKIN_DATA_URL = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAFNElEQVR42u3bT2gUZxzH8ee37M6+bTazNlsoNhZKaXuxoRQbSkmxUEtLoVAoLfQghVLoQUq9CS30ILSE0kIPUkghlUIq9CCFEkoLpZRS2oMSWqh+m1SS3c2szO7Ozu7sO8/v88zOzmZ11mST3eyy+7yY3V3eZ57v9zsf3vf7PTNvm5ubGzT4/9v5y2+3/3Dq9Fvb+w/sP3DgwDvf/+D+Q4cOHvz59Jn/5T04duzY+T8v/PTL8a9P/3bqt+Pvvnf40B+Hf//9L+08evTo+VOnzvzv/aN/nP7j7Q8+eE2+d3T/+1+/8zbf39//4fTp0xOtrb/7hRUrVqxYsWLFihUrVqxYsWLFihUrVqxYsWLFihUrVqxYsWLFihUrVqxYsWLFihUrVqxYsWLFihUrVqxYsbpZg/fv35/cvHlzoqWlpW08Hg+n0+lsOp3e4vf7s4FAIBuNRs92dnb+0NTUND4/Pz/d2tra8eTJE+m/d1paWjpyudzeYDDY1dHR8XZfX9/x/v7+Lzdt2jQ+OTl5oKWlZeTp06evdHR0fDs3N/ft5s2b/5+fn/++oaHhq/n5+e+Ghob+qK2tPVxfX/9LdXX1u+3t7aO5XO4jv9+fSaVS+2tra38ZHh7++cGDB78kk8m/Wltbz7W0tPx6//79H+rr6882NzefnZ2dvdrQ0LC1o6NjuL6+ftvhw4ffe//9989ubGz4/3r48OGJioqK02fPnT1RWVlZ98EHH7zW2Nj4t+fz+Xx/aWlp7Xfffff1xsZGf21t7cmurq5ft27deuzKlSsnvV6vH4vFwuvXr491dnae7urquhGLxe5Eo9G/Dx48+OPZs2cveDyen6urq09t3rx51uv1/vX111//eO/eva9bWlp2nzt37qN0On2lsrJysrm5eeL/g7/t/gPff/Dhhx+u/eOPP060trYefffdd48dPXr0wOnTp0+eOXNm/I033rj56quvfvb666+/9+GHH36wffv2f1paWo68//77X+/cuXPnfffd12nU/Q/u18K/37r+0c+3b10vv/7w1vXrm1v12kbr5lbj0lvhxa2t2oW/tYtbN2/e3Lh169a/W1vXb/2xvnXx8tqlixcvXvzvv//++296enpzc3Nz/vv729/7ff2v4v2v8v2f4v2/+v2/+f1++H3++/v8t3++/25/f3//u729vd83Nzf3ffv7++/u19fXN+33+6fT/x/+95v9g79vf3//++29vb39/v7++/v72/9/3/8D/6/9vwA8aG2G/QIAAAAASUVORK5CYII='

export const ProfileTab: React.FC<ProfileTabProps> = ({ activeUsername }) => {
  const [stats, setStats] = useState<any>({
    username: activeUsername || 'Steve',
    worldsCount: 0,
    totalPlayTimeHours: 'Нет информации',
    lastPlayedFormatted: 'Нет информации',
    favoriteWorld: 'Нет информации',
    favoriteServer: 'Нет информации'
  })

  const [skinUrl, setSkinUrl] = useState<string>(STEVE_SKIN_DATA_URL)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const viewerRef = useRef<SkinViewer | null>(null)

  useEffect(() => {
    if (activeUsername && window.electronAPI) {
      window.electronAPI.getProfileStats(activeUsername).then(setStats)
      window.electronAPI.getUserSkin(activeUsername).then((url) => {
        if (url) {
          setSkinUrl(url)
        } else {
          setSkinUrl(STEVE_SKIN_DATA_URL)
        }
      }).catch(() => {
        setSkinUrl(STEVE_SKIN_DATA_URL)
      })
    }
  }, [activeUsername])

  // Initialize 3D WebGL SkinViewer with ambient lights
  useEffect(() => {
    let viewer: SkinViewer | null = null

    const timer = setTimeout(() => {
      if (!canvasRef.current) return
      try {
        viewer = new SkinViewer({
          canvas: canvasRef.current,
          width: 250,
          height: 460,
          skin: skinUrl || STEVE_SKIN_DATA_URL
        })

        // Ensure lighting is properly initialized
        if (viewer.playerObject) {
          viewer.playerObject.rotation.y = 0.5
        }

        viewer.controls.enableRotate = true
        viewer.controls.enableZoom = true
        viewer.controls.enablePan = false
        viewer.animation = new IdleAnimation()
        viewerRef.current = viewer
      } catch (err) {
        console.error('SkinViewer Canvas init:', err)
      }
    }, 60)

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
          background: 'radial-gradient(circle at center, #2d3748 0%, #1a202c 100%)',
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
