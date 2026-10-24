import React, { useState, useEffect, useCallback, useRef } from 'react'
import { useFocusTrap } from '../hooks/useFocusTrap'
import { errorMessage } from '../utils/errors'
import { ModrinthProject, ModrinthVersion } from '../types'

interface ModDownloaderModalProps {
  isOpen: boolean
  instanceId: string
  gameVersion: string
  loader: string
  onClose: () => void
  onModInstalled: () => void
}

const IconSearch = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20l-3-3" />
  </svg>
)

const formatDownloads = (n: number): string => {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`
  return String(n)
}

export const ModDownloaderModal: React.FC<ModDownloaderModalProps> = ({
  isOpen,
  instanceId,
  gameVersion,
  loader,
  onClose,
  onModInstalled
}) => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<ModrinthProject[]>([])
  const [loading, setLoading] = useState(false)
  const [installingId, setInstallingId] = useState<string | null>(null)
  const [status, setStatus] = useState<{ kind: 'ok' | 'err' | 'info'; text: string } | null>(null)
  const [installedIds, setInstalledIds] = useState<Set<string>>(new Set())
  const modalRef = useRef<HTMLDivElement>(null)
  useFocusTrap(modalRef, isOpen)

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, onClose])

  const fetchMods = useCallback(async (query: string) => {
    setLoading(true)
    setStatus(null)
    try {
      const facets: string[][] = [['project_type:mod']]
      // For vanilla instances, show Fabric-compatible mods too (most work on vanilla loader not needed).
      // If instance is fabric/quilt, filter to that loader for compatibility.
      if (loader === 'fabric' || loader === 'quilt') {
        facets.push([`categories:${loader}`])
      }
      facets.push([`versions:${gameVersion}`])
      const res = await fetch(
        `https://api.modrinth.com/v2/search?query=${encodeURIComponent(query)}&facets=${encodeURIComponent(JSON.stringify(facets))}&limit=40`
      )
      const data = await res.json() as { hits?: ModrinthProject[] }
      setSearchResults(
        (data.hits || []).map((hit) => ({
          project_id: hit.project_id,
          slug: hit.slug,
          title: hit.title,
          description: hit.description,
          icon_url: hit.icon_url,
          downloads: hit.downloads,
          author: hit.author
        }))
      )
    } catch (err) {
      setStatus({ kind: 'err', text: `Ошибка поиска: ${errorMessage(err, 'сеть недоступна')}` })
    } finally {
      setLoading(false)
    }
  }, [loader, gameVersion])

  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(() => fetchMods(searchQuery), 300)
    return () => clearTimeout(timer)
  }, [searchQuery, isOpen, loader, fetchMods])

  if (!isOpen) return null

  const handleInstall = async (project: ModrinthProject) => {
    setInstallingId(project.project_id)
    setStatus({ kind: 'info', text: `Получаю версии мода ${project.title}...` })
    try {
      const res = await fetch(`https://api.modrinth.com/v2/project/${project.project_id}/version?game_versions=["${gameVersion}"]`)
      const versions = await res.json() as ModrinthVersion[]
      const compatible = Array.isArray(versions) && versions.length > 0 ? versions[0] : null

      if (!compatible?.files?.length) throw new Error('Нет .jar совместимого с этой версией')

      const file = compatible.files.find((f) => f.primary) || compatible.files[0]

      setStatus({ kind: 'info', text: `Скачиваю ${file.filename}...` })
      if (window.electronAPI) {
        await window.electronAPI.downloadModFile({
          instanceId,
          downloadUrl: file.url,
          filename: file.filename
        })
      }
      setStatus({ kind: 'ok', text: `Мод ${project.title} установлен!` })
      setInstalledIds(prev => new Set([...prev, project.project_id]))
      onModInstalled()
      setTimeout(() => setStatus(null), 3000)
    } catch (err) {
      setStatus({ kind: 'err', text: `Ошибка установки: ${errorMessage(err, 'неизвестная ошибка')}` })
    } finally {
      setInstallingId(null)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal modal-lg"
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mods-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <span className="modal-title" id="mods-modal-title">
            Моды из Modrinth — {gameVersion}
            {loader !== 'vanilla' && ` (${loader})`}
          </span>
          <button className="modal-close" onClick={onClose} aria-label="Закрыть каталог модов">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m6 6l12 12M18 6L6 18" /></svg>
          </button>
        </div>

        <div className="mods-search-row">
          <div className="search-bar wide">
            <IconSearch />
            <input
              placeholder="Поиск модов (Sodium, Iris, JEI, Create...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        {status && (
          <div className={`status-banner ${status.kind}`}>
            {status.text}
          </div>
        )}

        <div className="mods-list">
          {loading ? (
            <div className="empty-state"><div className="spinner" /></div>
          ) : searchResults.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state-title">Ничего не найдено</div>
              <div className="empty-state-text">Попробуйте изменить запрос — модов для этой версии может не быть.</div>
            </div>
          ) : (
            searchResults.map((proj) => (
              <div key={proj.project_id} className="mod-dl-card">
                {proj.icon_url ? (
                  <img className="mod-dl-icon" src={proj.icon_url} alt={proj.title} />
                ) : (
                  <div className="mod-avatar">
                    {proj.title[0]}
                  </div>
                )}

                <div className="mod-dl-info">
                  <div className="mod-dl-title">{proj.title}</div>
                  <div className="mod-dl-desc">{proj.description}</div>
                  <div className="mod-dl-dl-count">
                    Загрузок: {formatDownloads(proj.downloads)} · {proj.author}
                  </div>
                </div>

                <button
                  className="btn btn-primary mod-install-btn"
                  disabled={installingId === proj.project_id || installedIds.has(proj.project_id)}
                  onClick={() => handleInstall(proj)}
                >
                  {installingId === proj.project_id ? 'Установка...' : installedIds.has(proj.project_id) ? 'Установлен' : 'Установить'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
