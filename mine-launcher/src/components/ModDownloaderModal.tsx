import React, { useState, useEffect } from 'react'

interface ModrinthProject {
  project_id: string
  slug: string
  title: string
  description: string
  icon_url?: string
  downloads: number
  author: string
}

interface ModDownloaderModalProps {
  isOpen: boolean
  instanceId: string
  gameVersion: string
  loader: string
  onClose: () => void
  onModInstalled: () => void
}

const IconSearchPixel = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 20v-1h-1v-1h-1v-1h-1v-1h-2v-1h1v-2h1V7h-1V5h-1V4h-1V3h-1V2h-2V1H7v1H5v1H4v1H3v1H2v2H1v6h1v2h1v1h1v1h1v1h2v1h6v-1h2v-1h1v2h1v1h1v1h1v1h1v1h2v-1h1v-2zm-10-5v1H8v-1H6v-1H5v-2H4V8h1V6h1V5h2V4h4v1h2v1h1v2h1v4h-1v2h-1v1z" />
  </svg>
)

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
  const [statusMsg, setStatusMsg] = useState('')

  // Live debounced search
  useEffect(() => {
    if (!isOpen) return
    const timer = setTimeout(() => {
      fetchMods(searchQuery)
    }, 250)
    return () => clearTimeout(timer)
  }, [searchQuery, isOpen])

  const fetchMods = async (query: string) => {
    setLoading(true)
    setStatusMsg('')
    try {
      const facets = JSON.stringify([
        [`categories:${loader || 'fabric'}`],
        ['project_type:mod']
      ])
      const res = await fetch(
        `https://api.modrinth.com/v2/search?query=${encodeURIComponent(query)}&facets=${encodeURIComponent(facets)}&limit=25`
      )
      const data = await res.json()
      if (data.hits) {
        setSearchResults(
          data.hits.map((hit: any) => ({
            project_id: hit.project_id,
            slug: hit.slug,
            title: hit.title,
            description: hit.description,
            icon_url: hit.icon_url,
            downloads: hit.downloads,
            author: hit.author
          }))
        )
      }
    } catch (err: any) {
      setStatusMsg(`Ошибка поиска: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  if (!isOpen) return null

  const handleInstallMod = async (project: ModrinthProject) => {
    setInstallingId(project.project_id)
    setStatusMsg(`Загрузка информации о моде ${project.title}...`)
    try {
      const res = await fetch(`https://api.modrinth.com/v2/project/${project.project_id}/version`)
      const versions = await res.json()

      const compatible = versions.find((v: any) =>
        v.game_versions.includes(gameVersion) || v.game_versions.includes(gameVersion.slice(0, 4))
      ) || versions[0]

      if (!compatible || !compatible.files || !compatible.files.length) {
        throw new Error('Подходящий .jar файл не найден')
      }

      const file = compatible.files.find((f: any) => f.primary) || compatible.files[0]
      const downloadUrl = file.url
      const filename = file.filename

      setStatusMsg(`Скачивание ${filename}...`)

      if (window.electronAPI) {
        await window.electronAPI.downloadModFile({
          instanceId,
          downloadUrl,
          filename
        })
      }

      setStatusMsg(`Мод ${project.title} успешно установлен!`)
      onModInstalled()
    } catch (err: any) {
      setStatusMsg(`Ошибка установки: ${err.message}`)
    } finally {
      setInstallingId(null)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" style={{ width: '700px', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
        {/* Header title matching requirement 6 */}
        <h3 className="modal-title" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          🧩 Search mods
        </h3>

        {/* Live Search Input Box */}
        <div style={{ position: 'relative', marginBottom: '16px' }}>
          <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#53921b', display: 'flex', alignItems: 'center' }}>
            <IconSearchPixel />
          </div>

          <input
            type="text"
            placeholder="Живой поиск модов (например Sodium, Iris, Lithium, JourneyMap)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: '100%',
              paddingLeft: '42px',
              paddingRight: '14px',
              height: '46px',
              borderRadius: '10px',
              background: '#121317',
              border: '1.5px solid rgba(83, 146, 27, 0.4)',
              color: '#ffffff',
              fontSize: '16px'
            }}
          />
        </div>

        {statusMsg && (
          <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(83, 146, 27, 0.2)', color: '#6eff8b', fontSize: '14px', marginBottom: '12px' }}>
            {statusMsg}
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '10px', paddingRight: '4px' }}>
          {loading && searchResults.length === 0 && (
            <p style={{ color: '#888', textAlign: 'center', margin: '30px 0' }}>Загрузка модов...</p>
          )}

          {!loading && searchResults.length === 0 && (
            <p style={{ color: '#888', textAlign: 'center', margin: '30px 0' }}>Ничего не найдено</p>
          )}

          {searchResults.map((mod) => (
            <div
              key={mod.project_id}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                padding: '12px 14px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              {mod.icon_url ? (
                <img
                  src={mod.icon_url}
                  alt=""
                  loading="lazy"
                  style={{ width: '46px', height: '46px', borderRadius: '8px', objectFit: 'contain', flexShrink: 0 }}
                  onError={(e) => { (e.target as any).style.display = 'none' }}
                />
              ) : (
                <div style={{ width: '46px', height: '46px', borderRadius: '8px', background: '#252730', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>🧩</div>
              )}

              <div style={{ flex: 1, minWidth: 0 }}>
                <h4 style={{ margin: 0, fontSize: '16px', color: '#fff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {mod.title} <small style={{ color: '#888' }}>by {mod.author}</small>
                </h4>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#aaa', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {mod.description}
                </p>
                <small style={{ color: '#666' }}>📥 {mod.downloads.toLocaleString()} скачиваний</small>
              </div>

              {/* Action button renamed to Установить мод */}
              <button
                className="btn-primary"
                style={{ padding: '8px 14px', fontSize: '14px', flexShrink: 0, background: '#3b82f6' }}
                disabled={installingId === mod.project_id}
                onClick={() => handleInstallMod(mod)}
              >
                {installingId === mod.project_id ? 'Загрузка...' : 'Установить мод'}
              </button>
            </div>
          ))}
        </div>

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onClose}>
            Закрыть
          </button>
        </div>
      </div>
    </div>
  )
}
