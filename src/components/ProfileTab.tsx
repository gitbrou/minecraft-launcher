import React, { useState, useEffect, useRef } from 'react'
import type { SkinViewer } from 'skinview3d'
import { ProfileStats, ProfileWorld } from '../types'
import { errorMessage } from '../utils/errors'
import { cropSkinHead, emitSkinUpdated } from '../utils/skins'

interface ProfileTabProps {
  activeUsername: string
}

const IconCopy = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="9" y="9" width="11" height="11" rx="1.5" />
    <path d="M5 15V5.5A1.5 1.5 0 0 1 6.5 4H16" />
  </svg>
)

const IconCheck = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m4 12 5 5L20 6" />
  </svg>
)

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
  const [copied, setCopied] = useState(false)
  // Пересоздаём 3D-вьюер после смены скина: путь к файлу тот же, без этого модель не обновится
  const [skinVersion, setSkinVersion] = useState(0)

  const copyUuid = async () => {
    if (!stats?.uuid || !navigator.clipboard) return
    try {
      await navigator.clipboard.writeText(stats.uuid)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1400)
    } catch {
      // буфер обмена недоступен, UUID остаётся в title
    }
  }

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
      <aside className="profile-skin-panel">
        <div className="profile-panel-head">
          <span className="panel-label">Профиль</span>
          <span className="profile-badge">offline</span>
        </div>

        <SkinViewerCanvas key={`${skinPath || 'default'}-${skinVersion}`} username={activeUsername} skinPath={skinPath} />

        <div className="profile-identity">
          <h2 className="profile-name">{activeUsername}</h2>
          {stats?.uuid ? (
            <button
              type="button"
              className="profile-uuid"
              onClick={copyUuid}
              title={copied ? 'Скопировано' : 'Скопировать UUID'}
            >
              <span>{stats.uuid.slice(0, 8)}…</span>
              {copied ? <IconCheck /> : <IconCopy />}
            </button>
          ) : (
            <span className="profile-uuid is-empty">—</span>
          )}
        </div>

        <div className="skin-actions">
          <button className="btn" onClick={handleUploadSkin} disabled={busy}>
            Загрузить PNG
          </button>
        </div>

        <form className="skin-nick-form" onSubmit={handleFetchSkin}>
          <span className="panel-label">Скин по нику</span>
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

        <p className="profile-skin-hint">PNG 64×64. Скин применится сразу.</p>
        {notice && <div className="profile-notice">{notice}</div>}
        {busy && <div className="spinner" />}
      </aside>

      <div className="profile-side">
        <section className="profile-stats" aria-label="Статистика аккаунта">
          <div className="profile-stat">
            <span className="profile-stat-value">{stats?.instancesCount ?? '—'}</span>
            <span className="profile-stat-label">Сборки</span>
          </div>
          <div className="profile-stat">
            <span className="profile-stat-value">{stats?.modsCount ?? '—'}</span>
            <span className="profile-stat-label">Моды</span>
          </div>
          <div className="profile-stat">
            <span className={`profile-stat-value is-date ${stats?.lastPlayedFormatted ? '' : 'is-empty'}`}>
              {stats?.lastPlayedFormatted ?? '—'}
            </span>
            <span className="profile-stat-label">Последний запуск</span>
          </div>
        </section>

        <section className="profile-section">
          <div className="profile-section-head">
            <h2 className="profile-section-title">Миры</h2>
            <span className="profile-section-count">{stats?.worldsCount ?? 0}</span>
          </div>

          {stats?.worlds?.length ? (
            <>
              <div className="profile-worlds-head">
                <span>Мир</span>
                <span>Сборка</span>
                <span>Вход</span>
              </div>
              {stats.worlds.map((w: ProfileWorld) => (
                <div key={`${w.instanceId}-${w.worldName}`} className="profile-world">
                  <span className="profile-world-name">{w.worldName}</span>
                  <span className="profile-world-instance">{w.instanceName}</span>
                  <span className="profile-world-date">{formatDate(w.lastPlayed)}</span>
                </div>
              ))}
            </>
          ) : (
            <div className="profile-empty">
              <span className="profile-empty-title">Пока нет миров</span>
              <span className="profile-empty-hint">Создай мир в игре, и он появится здесь.</span>
            </div>
          )}
        </section>

        <section className="profile-section">
          <div className="profile-section-head">
            <h2 className="profile-section-title">Аккаунт</h2>
          </div>
          <div className="profile-kv">
            <span>Тип входа</span>
            <span className="profile-kv-value">Offline</span>
          </div>
          <div className="profile-kv">
            <span>UUID</span>
            <span className="profile-kv-value profile-kv-uuid">{stats?.uuid || '—'}</span>
          </div>
          <div className="profile-kv">
            <span>Папка лаунчера</span>
            <button className="profile-link" onClick={() => window.electronAPI.openLauncherFolder()}>
              Открыть
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
