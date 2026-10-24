import React, { useState, useEffect, useRef } from 'react'
import type { SkinViewer } from 'skinview3d'
import { ProfileStats, ProfileWorld } from '../types'
import { errorMessage } from '../utils/errors'

interface ProfileTabProps {
  activeUsername: string
}

const SkinViewerCanvas: React.FC<{ username: string; skinPath: string | null }> = ({ username, skinPath }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const viewerRef = useRef<SkinViewer | null>(null)

  useEffect(() => {
    let disposed = false

    const setupViewer = async () => {
      try {
        const mod = await import('skinview3d')
        if (disposed || !canvasRef.current) return

        const viewer = new mod.SkinViewer({
          canvas: canvasRef.current,
          width: 140,
          height: 140
        })
        viewerRef.current = viewer

        viewer.zoom = 0.85
        viewer.autoRotate = true
        viewer.autoRotateSpeed = 1.2
        viewer.controls.enableRotate = true
        viewer.controls.enableZoom = true

        try {
          const source = skinPath || `https://mc-heads.net/skin/${encodeURIComponent(username)}`
          await viewer.loadSkin(source)
        } catch {
          // нет интернета/скина — остаётся дефолтная модель, это не ошибка экрана
        }
      } catch {
        // skinview3d не загрузился (нет WebGL) — карточка просто останется без 3D
      }
    }

    setupViewer()

    return () => {
      disposed = true
      try { viewerRef.current?.dispose?.() } catch { /* already disposed */ }
    }
  }, [username, skinPath])

  return (
    <div className="profile-skin-frame">
      <canvas ref={canvasRef} className="skin-canvas" />
    </div>
  )
}

export const ProfileTab: React.FC<ProfileTabProps> = ({ activeUsername }) => {
  const [stats, setStats] = useState<ProfileStats | null>(null)
  const [skinPath, setSkinPath] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)
  const [notice, setNotice] = useState('')
  const [skinNick, setSkinNick] = useState(activeUsername)
  const [nickError, setNickError] = useState('')
  // Пересоздаём 3D-вьюер после смены скина: путь к файлу тот же, без этого модель не обновится
  const [skinVersion, setSkinVersion] = useState(0)

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.getProfileStats(activeUsername).then(setStats)
      window.electronAPI.getUserSkin(activeUsername).then(setSkinPath)
    }
    setSkinNick(activeUsername)
  }, [activeUsername])

  const handleUploadSkin = async () => {
    setBusy(true)
    try {
      const result = await window.electronAPI.uploadUserSkin(activeUsername)
      if (result) {
        setSkinPath(result)
        setSkinVersion((v) => v + 1)
        setNotice('Скин загружен')
      } else {
        setNotice('Загрузка отменена')
      }
    } catch (err) {
      setNotice(errorMessage(err, 'Не удалось загрузить скин'))
    }
    setBusy(false)
  }

  const handleFetchSkin = async (e: React.FormEvent) => {
    e.preventDefault()
    const nick = skinNick.trim()
    if (!/^[A-Za-z0-9_]{3,16}$/.test(nick)) {
      setNickError('Ник: 3–16 символов, латиница, цифры и _')
      return
    }
    setNickError('')
    setBusy(true)
    setNotice('')
    try {
      await window.electronAPI.fetchOnlineSkin({ username: activeUsername, targetUsername: nick })
      setSkinPath(await window.electronAPI.getUserSkin(activeUsername))
      setSkinVersion((v) => v + 1)
      setNotice(`Скин «${nick}» применён`)
    } catch (err) {
      setNotice(errorMessage(err, 'Не удалось загрузить скин'))
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
        <SkinViewerCanvas key={`${skinPath || 'default'}-${skinVersion}`} username={activeUsername} skinPath={skinPath} />

        <div className="profile-name">{activeUsername}</div>
        {stats?.uuid && <div className="profile-uuid">{stats.uuid}</div>}

        <div className="skin-actions">
          <button className="btn" onClick={handleUploadSkin} disabled={busy}>
            Загрузить скин
          </button>
        </div>

        <form className="skin-nick-form" onSubmit={handleFetchSkin}>
          <span className="form-label">Скин по нику</span>
          <div className="skin-nick-row">
            <input
              className="form-input"
              placeholder="Ник в Minecraft"
              value={skinNick}
              maxLength={16}
              disabled={busy}
              aria-label="Ник игрока, чей скин скачать"
              aria-invalid={!!nickError}
              onChange={(e) => {
                setSkinNick(e.target.value.replace(/[^A-Za-z0-9_]/g, ''))
                if (nickError) setNickError('')
              }}
            />
            <button className="btn" type="submit" disabled={busy || !skinNick.trim()}>
              Скачать
            </button>
          </div>
          {nickError && <div className="form-error">{nickError}</div>}
        </form>

        {notice && <div className="profile-notice">{notice}</div>}
        {busy && <div className="spinner" />}
      </div>

      {/* Right: honest stats */}
      <div className="profile-column">
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
            <div className="profile-hint">
              Миров пока нет — создайте новый в игре и он появится здесь.
            </div>
          ) : (
            <div className="list-rows worlds-list">
              {stats.worlds.map((w: ProfileWorld) => (
                <div key={`${w.instanceId}-${w.worldName}`} className="row-item world-row">
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
