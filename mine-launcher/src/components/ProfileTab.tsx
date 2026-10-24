import React, { useState, useEffect, useRef } from 'react'
import { ProfileStats, ProfileWorld } from '../types'

interface ProfileTabProps {
  activeUsername: string
}

const SkinViewerCanvas: React.FC<{ username: string; skinPath: string | null }> = ({ username, skinPath }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const viewerRef = useRef<any>(null)

  useEffect(() => {
    let disposed = false

    const setupViewer = async () => {
      try {
        const mod: any = await import('skinview3d')
        if (disposed || !canvasRef.current) return

        const viewer = new mod.SkinViewer({
          canvas: canvasRef.current,
          width: 140,
          height: 140,
          renderPaused: false
        })
        viewerRef.current = viewer

        viewer.zoom = 0.85
        viewer.autoRotate = true
        viewer.autoRotateSpeed = 1.2
        viewer.controls.enableRotate = true
        viewer.controls.enableZoom = true

        try {
          if (skinPath) {
            await mod.loadSkinFromURL(viewer.playerObject, skinPath)
          } else {
            await mod.loadSkinFromURL(viewer.playerObject, `https://mc-heads.net/skin/${encodeURIComponent(username)}`)
          }
        } catch {
          // fallback Steve/missing skin is fine
        }
      } catch {}
    }

    setupViewer()

    return () => {
      disposed = true
      try { viewerRef.current?.dispose?.() } catch {}
    }
  }, [username, skinPath])

  return (
    <div className="profile-skin-frame">
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  )
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ activeUsername }) => {
  const [stats, setStats] = useState<ProfileStats | null>(null)
  const [skinPath, setSkinPath] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getProfileStats(activeUsername).then(setStats)
      window.electronAPI.getUserSkin(activeUsername).then(setSkinPath)
    }
  }, [activeUsername])

  const handleUploadSkin = async () => {
    setBusy(true)
    try {
      const result = await window.electronAPI.uploadUserSkin(activeUsername)
      if (result) {
        setSkinPath(result)
        // trigger an accounts refresh event if main was asked
      }
    } catch {
      // cancel or error
    }
    setBusy(false)
  }

  const handleFetchSkin = async () => {
    setBusy(true)
    setNotice('')
    try {
      await window.electronAPI.fetchOnlineSkin({ username: activeUsername, targetUsername: activeUsername })
      setSkinPath(await window.electronAPI.getUserSkin(activeUsername))
      setNotice('Скин загружен')
    } catch (err: any) {
      setNotice(err?.message || 'Не удалось загрузить скин')
    }
    setBusy(false)
  }

  const formatDate = (ts: number) => {
    if (!ts) return '—'
    return new Date(ts).toLocaleDateString('ru-RU')
  }

  return (
    <div className="profile-layout">
      {/* Left card: skin */}
      <div className="profile-card">
        <SkinViewerCanvas username={activeUsername} skinPath={skinPath} />

        <div className="profile-name">{activeUsername}</div>
        {stats?.uuid && <div className="profile-uuid">{stats.uuid}</div>}

        <div className="skin-actions">
          <button className="btn" onClick={handleUploadSkin} disabled={busy}>
            Загрузить скин
          </button>
          <button className="btn btn-ghost" onClick={handleFetchSkin} disabled={busy} title="Загрузить скин по нику с публичного сервера">
            Скачать по нику
          </button>
        </div>

        {notice && <div style={{ fontSize: '12px', color: 'var(--text-muted)', textAlign: 'center' }}>{notice}</div>}
        {busy && <div className="spinner" />}
      </div>

      {/* Right: honest stats */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', minWidth: 0 }}>
        <div className="profile-stats-card">
          <span className="profile-stats-title">Статистика</span>
          <div className="stat-list">
            <div className="stat-row">
              <span className="stat-key">Сборок</span>
              <span className="stat-value">{stats?.instancesCount ?? '—'}</span>
            </div>
            <div className="stat-row">
              <span className="stat-key">Установлено модов (всех)</span>
              <span className="stat-value">{stats?.modsCount ?? '—'}</span>
            </div>
            <div className="stat-row">
              <span className="stat-key">Последний запуск игры</span>
              <span className="stat-value">{stats?.lastPlayedFormatted ?? '—'}</span>
            </div>
          </div>
        </div>

        <div className="profile-stats-card">
          <span className="profile-stats-title">Миры ({stats?.worldsCount ?? 0})</span>
          {(!stats?.worlds || stats.worlds.length === 0) ? (
            <div style={{ fontSize: '13px', color: 'var(--text-faint)' }}>
              Миров пока нет — создайте новый в игре и он появится здесь.
            </div>
          ) : (
            <div className="list-rows" style={{ maxHeight: '320px' }}>
              {stats.worlds.map((w: ProfileWorld) => (
                <div key={`${w.instanceId}-${w.worldName}`} className="row-item" style={{ padding: '9px 12px' }}>
                  <div className="row-item-main">
                    <div className="row-item-title">{w.worldName}</div>
                    <div className="row-item-sub">Сборка: {w.instanceName}</div>
                  </div>
                  <span className="row-item-sub">{formatDate(w.lastPlayed)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
