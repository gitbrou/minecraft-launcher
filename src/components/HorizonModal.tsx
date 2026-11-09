import React, { useEffect, useRef, useState } from 'react'
import { HorizonAuth, HorizonProgress, HorizonState, HorizonVersion } from '../types'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { errorMessage } from '../utils/errors'

interface HorizonModalProps {
  isOpen: boolean
  onClose: () => void
}

const EMPTY_STATE: HorizonState = {
  installed: false,
  version: '',
  latest: '',
  updateAvailable: false,
  launcherPath: '',
  playing: false,
  busy: null,
  gameVersions: [],
  selectedVersion: null,
  accountName: null,
  owner: false,
  offline: [],
  minecraftDir: '',
  lastError: ''
}

function cleanError(err: unknown, fallback: string): string {
  return errorMessage(err, fallback).replace(/^Error invoking remote method '[^']+':\s*(Error:\s*)?/, '')
}

function versionLabel(v: HorizonVersion): string {
  return v.tag.startsWith('nightly') ? `Nightly ${v.date}` : v.tag
}

function defaultTag(list: HorizonVersion[]): string {
  const stable = list.find((v) => v.tag.startsWith('v') && v.available_here)
  const any = list.find((v) => v.available_here)
  return (stable || any)?.tag || ''
}

export const HorizonModal: React.FC<HorizonModalProps> = ({ isOpen, onClose }) => {
  const [state, setState] = useState<HorizonState>(EMPTY_STATE)
  const [versions, setVersions] = useState<HorizonVersion[]>([])
  const [tag, setTag] = useState('')
  const [offline, setOffline] = useState('')
  const [note, setNote] = useState('')
  const [progress, setProgress] = useState<HorizonProgress | null>(null)
  const [auth, setAuth] = useState<HorizonAuth | null>(null)
  const [logs, setLogs] = useState<string[]>([])
  const [loading, setLoading] = useState(false)
  const modalRef = useRef<HTMLDivElement>(null)
  const logRef = useRef<HTMLPreElement>(null)
  useFocusTrap(modalRef, isOpen)

  useEffect(() => {
    if (!isOpen || !window.electronAPI) return
    let cancelled = false
    setLoading(true)
    window.electronAPI.horizonStatus()
      .then((next) => {
        if (cancelled) return
        setState(next)
        if (next.installed) {
          window.electronAPI.horizonVersions().then((list) => {
            if (cancelled) return
            setVersions(list)
            setTag((prev) => prev || defaultTag(list))
          }).catch(() => {})
          window.electronAPI.horizonCheckUpdate().catch(() => {})
        }
      })
      .catch((err) => setNote(cleanError(err, 'Не удалось прочитать состояние Horizon')))
      .finally(() => { if (!cancelled) setLoading(false) })

    const offState = window.electronAPI.onHorizonState((next) => setState(next))
    const offProgress = window.electronAPI.onHorizonProgress((next) => setProgress(next))
    const offLog = window.electronAPI.onHorizonLog((line) => {
      setLogs((prev) => [...prev, line].slice(-200))
    })
    const offAuth = window.electronAPI.onHorizonAuth((next) => {
      setAuth(next)
      if (next.status === 'done') {
        setNote('Вход выполнен, можно играть')
        window.electronAPI.horizonStatus().then(setState).catch(() => {})
      }
    })
    return () => {
      cancelled = true
      offState()
      offProgress()
      offLog()
      offAuth()
    }
  }, [isOpen])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight
  }, [logs])

  if (!isOpen) return null

  const api = window.electronAPI
  const run = async (label: string, task: () => Promise<unknown>) => {
    setNote('')
    setLoading(true)
    try {
      const result = await task()
      if (result && typeof result === 'object' && 'installed' in result) {
        setState(result as HorizonState)
      }
    } catch (err) {
      setNote(cleanError(err, `${label}: не получилось`))
    } finally {
      setLoading(false)
      setProgress(null)
    }
  }

  const installLauncher = () => run('Установка Horizon', async () => {
    const next = await api.horizonInstall()
    if (next.installed) {
      setNote('Horizon установлен')
      const list = await api.horizonVersions().catch(() => [])
      setVersions(list)
      setTag((prev) => prev || defaultTag(list))
    }
    return next
  })

  const installGame = () => run('Установка версии', () => api.horizonInstallGame(tag))
  const prepareGame = () => run('Подготовка игры', () => api.horizonPrepare({ download: true, version: tag || undefined }))
  const pickFolder = () => run('Выбор папки', async () => {
    const next = await api.horizonSetMinecraftDir()
    return next || undefined
  })
  const signIn = () => run('Вход', async () => {
    setAuth({ status: 'waiting' })
    await api.horizonSignIn()
  })
  const playOffline = () => run('Запуск', async () => {
    if (offline.trim()) await api.horizonOffline(offline.trim())
    await api.horizonPlay(state.selectedVersion || tag || undefined)
  })
  const play = () => run('Запуск', () => api.horizonPlay(state.selectedVersion || tag || undefined))
  const stop = () => run('Остановка', () => api.horizonStop())

  const stable = versions.find((v) => v.tag.startsWith('v') && v.available_here)
  const nightly = versions.find((v) => v.tag.startsWith('nightly') && v.available_here)
  const freeVersions: HorizonVersion[] = []
  for (const item of [stable, nightly, ...versions.filter((v) => v.installed)]) {
    if (item && !freeVersions.some((v) => v.tag === item.tag)) freeVersions.push(item)
  }
  const busy = loading || !!state.busy

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal horizon-modal"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="horizon-modal-title"
      >
        <div className="modal-header">
          <div>
            <span className="modal-title" id="horizon-modal-title">Horizon</span>
            <div className="horizon-subtitle">Клиент Java 26.3 на Rust</div>
          </div>
          <button className="modal-close" onClick={onClose} aria-label="Закрыть">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          </button>
        </div>

        <div className="modal-body horizon-body">
          {!state.installed && !loading && (
            <div className="horizon-intro">
              <p>
                Horizon это отдельная игра, не Java-сборка. Ставится рядом с лаунчером, примерно 21 МБ.
                Играть можно только с аккаунтом Microsoft, у которого есть Minecraft Java.
              </p>
              <button className="btn btn-primary" onClick={installLauncher}>Установить Horizon</button>
            </div>
          )}

          {state.installed && (
            <>
              <div className="horizon-row">
                <div>
                  <div className="horizon-label">Лаунчер</div>
                  <div className="horizon-value">
                    {state.version ? `Версия ${state.version}` : 'версия неизвестна'}
                    {state.updateAvailable && state.latest ? ` · есть ${state.latest}` : ''}
                  </div>
                </div>
                {state.updateAvailable && (
                  <button className="btn btn-sm" onClick={installLauncher}>Обновить</button>
                )}
              </div>

              {!state.owner && (
                <div className="horizon-gate">
                  <div className="horizon-gate-title">Нужен вход в Microsoft</div>
                  <div className="horizon-gate-text">
                    Horizon запускается только с аккаунтом Microsoft, у которого куплен Minecraft Java.
                    Без этого игра не стартует, и обойти проверку нельзя.
                    Если входа нет, переключись на движок Java в настройках: там работают оффлайн-аккаунты.
                  </div>
                  <button className="btn btn-primary btn-sm" onClick={signIn} disabled={loading}>
                    Войти через Microsoft
                  </button>
                </div>
              )}

              <div className="horizon-row">
                <div>
                  <div className="horizon-label">Аккаунт Microsoft</div>
                  <div className="horizon-value">
                    {state.accountName || 'не выполнен вход'}
                    {state.owner ? ' · лицензия есть' : ''}
                  </div>
                </div>
                <button className="btn btn-sm" onClick={signIn} disabled={loading}>{state.accountName ? 'Сменить' : 'Войти'}</button>
              </div>

              {auth?.status === 'waiting' && (
                <div className="horizon-auth">
                  {auth.url ? (
                    <>
                      <div>Открой ссылку и введи код:</div>
                      <a href={auth.url} target="_blank" rel="noreferrer">{auth.url}</a>
                      {auth.code && <code className="horizon-code">{auth.code}</code>}
                    </>
                  ) : (
                    <div className="horizon-muted">Ждём код от Horizon...</div>
                  )}
                </div>
              )}
              {auth?.status === 'error' && <div className="form-error">{auth.message}</div>}

              <div className="horizon-row horizon-row-column">
                <div className="horizon-label">Версия игры</div>
                <div className="horizon-inline">
                  <select
                    className="form-select"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    aria-label="Версия Horizon"
                  >
                    {freeVersions.length === 0 && <option value="">нет доступных версий</option>}
                    {freeVersions.map((v) => (
                      <option key={v.tag} value={v.tag}>
                        {versionLabel(v)}{v.installed ? ' · установлена' : ''}
                      </option>
                    ))}
                  </select>
                  <button className="btn btn-sm" onClick={installGame} disabled={!tag || busy}>Установить</button>
                  <button className="btn btn-sm" onClick={prepareGame} disabled={busy}>Подготовить</button>
                </div>
                <div className="horizon-hint">
                  Установить собирает версию из исходников, это долго. Подготовить качает готовую игру с Mojang.
                </div>
              </div>

              <div className="horizon-row">
                <div>
                  <div className="horizon-label">Папка Minecraft</div>
                  <div className="horizon-value mono small">{state.minecraftDir || 'по умолчанию'}</div>
                </div>
                <button className="btn btn-sm" onClick={pickFolder} disabled={loading}>Выбрать</button>
              </div>

              <div className="horizon-row">
                <div>
                  <div className="horizon-label">Оффлайн ник</div>
                  <div className="horizon-hint">Работает только если владелец лицензии уже вошёл</div>
                </div>
                <div className="horizon-inline">
                  <input
                    className="form-input horizon-offline-input"
                    value={offline}
                    maxLength={16}
                    placeholder="Steve"
                    onChange={(e) => setOffline(e.target.value.replace(/[^a-zA-Z0-9_]/g, ''))}
                  />
                  <button className="btn btn-sm" onClick={playOffline} disabled={busy}>Играть</button>
                </div>
              </div>

              {progress && (
                <div className="horizon-progress">
                  <div className="horizon-progress-text">{progress.text}</div>
                  {progress.percent >= 0 && (
                    <div className="install-bar">
                      <div className="install-bar-fill" style={{ width: `${Math.min(100, Math.max(0, progress.percent))}%` }} />
                    </div>
                  )}
                </div>
              )}

              {logs.length > 0 && (
                <pre className="horizon-log" ref={logRef}>{logs.join('\n')}</pre>
              )}
            </>
          )}

          {note && <div className="horizon-note">{note}</div>}
          {state.lastError && <div className="form-error">{state.lastError}</div>}
        </div>

        {state.installed && (
          <div className="modal-footer">
            {state.playing ? (
              <button className="btn btn-danger" onClick={stop}>Остановить игру</button>
            ) : !state.owner ? (
              <button className="btn btn-primary" onClick={signIn} disabled={loading}>
                {loading ? 'Подождите...' : 'Войти в Microsoft'}
              </button>
            ) : (
              <button className="btn btn-primary" onClick={play} disabled={busy || !(state.selectedVersion || tag)}>
                {loading ? 'Подождите...' : 'Играть'}
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
