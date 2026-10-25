import React, { useState, useEffect, useRef } from 'react'
import type { SkinViewer } from 'skinview3d'
import { ProfileStats, ProfileWorld } from '../types'
import { errorMessage } from '../utils/errors'
import { cropSkinHead, emitSkinUpdated } from '../utils/skins'

interface ProfileTabProps {
  activeUsername: string
}

const SkinViewerCanvas: React.FC<{ username: string; skinPath: string | null }> = ({ username, skinPath }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<SkinViewer | null>(null)
  const [status, setStatus] = useState<'loading' | 'ready' | 'failed'>('loading')
  const [head, setHead] = useState<string | null>(null)

  // Статичная голова — заглушка, пока 3D-модель грузится или если WebGL/скин недоступен
  useEffect(() => {
    let cancelled = false
    const loadHead = async () => {
      if (skinPath) {
        try {
          const cropped = await cropSkinHead(skinPath)
          if (!cancelled) setHead(cropped)
          return
        } catch {
          // битый файл — падаем на онлайн-голову
        }
      }
      if (!cancelled) setHead(`https://mc-heads.net/avatar/${encodeURIComponent(username)}/128`)
    }
    loadHead()
    return () => { cancelled = true }
  }, [username, skinPath])

  useEffect(() => {
    let disposed = false
    setStatus('loading')

    const setupViewer = async () => {
      try {
        const mod = await import('skinview3d')
        if (disposed || !canvasRef.current) return

        // Кадр квадратный: берём фактическую ширину, чтобы модель не «плавала» в рамке
        const size = frameRef.current?.clientWidth || 146
        const viewer = new mod.SkinViewer({
          canvas: canvasRef.current,
          width: size,
          height: size
        })
        viewerRef.current = viewer

        viewer.zoom = 0.85
        viewer.autoRotate = true
        viewer.autoRotateSpeed = 1.2
        viewer.controls.enableRotate = true
        viewer.controls.enableZoom = true

        const source = skinPath || `https://mc-heads.net/skin/${encodeURIComponent(username)}`
        try {
          await viewer.loadSkin(source)
          if (!disposed) setStatus('ready')
        } catch {
          // Скин не загрузился — оставляем голову заглушкой
          if (!disposed) setStatus('failed')
        }
      } catch {
        // skinview3d не загрузился (нет WebGL) — карточка покажет голову
        if (!disposed) setStatus('failed')
      }
    }

    setupViewer()

    return () => {
      disposed = true
      try { viewerRef.current?.dispose?.() } catch { /* already disposed */ }
    }
  }, [username, skinPath])

  return (
    <div ref={frameRef} className={`profile-skin-frame is-${status}`}>
      <canvas ref={canvasRef} className="skin-canvas" />
      {status !== 'ready' && (
        <div className="skin-placeholder" aria-hidden="true">
          {head ? (
            <img
              className="skin-head"
              src={head}
              alt=""
              onError={() => setHead(null)}
            />
          ) : (
            <span className="skin-head-empty" />
          )}
        </div>
      )}
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
    if (!window.electronAPI) return
    let cancelled = false

    window.electronAPI.getProfileStats(activeUsername).then(setStats)

    const loadSkin = async () => {
      let skin = await window.electronAPI.getUserSkin(activeUsername)
      if (!skin) {
        // Скина ещё нет — один раз подтягиваем по нику, чтобы 3D-модель не была пустой
        try {
          await window.electronAPI.fetchOnlineSkin({ username: activeUsername, targetUsername: activeUsername })
          skin = await window.electronAPI.getUserSkin(activeUsername)
        } catch {
          // нет сети/ника — останется дефолтная модель
        }
      }
      if (!cancelled) setSkinPath(skin)
    }
    loadSkin()
    setSkinNick(activeUsername)

    return () => { cancelled = true }
  }, [activeUsername])

  const handleUploadSkin = async () => {
    setBusy(true)
    try {
      const result = await window.electronAPI.uploadUserSkin(activeUsername)
      if (result) {
        setSkinPath(await window.electronAPI.getUserSkin(activeUsername))
        setSkinVersion((v) => v + 1)
        emitSkinUpdated()
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
      emitSkinUpdated()
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
      <section className="profile-skin-panel">
        <span className="panel-label">Скин</span>
        <SkinViewerCanvas key={`${skinPath || 'default'}-${skinVersion}`} username={activeUsername} skinPath={skinPath} />

        <div className="profile-name">{activeUsername}</div>
        {stats?.uuid && (
          <div className="profile-uuid" title={stats.uuid}>{stats.uuid.slice(0, 8)}…</div>
        )}

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
      </section>

      {/* Right: honest stats */}
      <div className="profile-side">
        <section className="profile-section">
          <div className="profile-section-head">
            <h2 className="profile-section-title">Аккаунт</h2>
          </div>
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
        </section>

        <section className="profile-section">
          <div className="profile-section-head">
            <h2 className="profile-section-title">Миры</h2>
            <span className="profile-section-count">{stats?.worldsCount ?? 0}</span>
          </div>
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
        </section>
      </div>
    </div>
  )
}
