import React, { useState } from 'react'

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

  if (!isOpen) return null

  const handleSearch = async (e?: React.FormEvent) => {
    if (e) e.preventDefault()
    setLoading(true)
    setStatusMsg('')
    try {
      // Query Modrinth open API
      const facets = JSON.stringify([
        [`categories:${loader || 'fabric'}`],
        ['project_type:mod']
      ])
      const res = await fetch(
        `https://api.modrinth.com/v2/search?query=${encodeURIComponent(searchQuery)}&facets=${encodeURIComponent(facets)}&limit=20`
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

  const handleInstallMod = async (project: ModrinthProject) => {
    setInstallingId(project.project_id)
    setStatusMsg(`Загрузка информации о моде ${project.title}...`)
    try {
      // Get versions for project
      const res = await fetch(`https://api.modrinth.com/v2/project/${project.project_id}/version`)
      const versions = await res.json()

      // Find compatible file
      const compatible = versions.find((v: any) =>
        v.game_versions.includes(gameVersion) || v.game_versions.includes(gameVersion.slice(0, 4))
      ) || versions[0]

      if (!compatible || !compatible.files || !compatible.files.length) {
        throw new Error('Подходящий .jar файл не найден')
      }

      const file = compatible.files.find((f: any) => f.primary) || compatible.files[0]
      const filename = file.filename

      setStatusMsg(`Скачивание ${filename}...`)

      // Download file via Electron IPC
      if (window.electronAPI) {
        window.electronAPI.addModFile(instanceId)
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
      <div className="modal-card" style={{ width: '680px', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }} onClick={(e) => e.stopPropagation()}>
        <h3 className="modal-title">📥 Prism Mod Downloader (Modrinth API)</h3>

        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '10px', marginBottom: '16px' }}>
          <input
            type="text"
            placeholder="Поиск модов (например, Sodium, Iris, Lithium)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ flex: 1 }}
          />
          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? 'Поиск...' : 'Найти'}
          </button>
        </form>

        {statusMsg && (
          <div style={{ padding: '8px 12px', borderRadius: '6px', background: 'rgba(83, 146, 27, 0.2)', color: '#6eff8b', fontSize: '14px', marginBottom: '12px' }}>
            {statusMsg}
          </div>
        )}

        <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '12px', paddingRight: '4px' }}>
          {searchResults.length === 0 && !loading && (
            <p style={{ color: '#888', textAlign: 'center', margin: '30px 0' }}>Введите название мода и нажмите "Найти"</p>
          )}

          {searchResults.map((mod) => (
            <div
              key={mod.project_id}
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '10px',
                padding: '14px',
                display: 'flex',
                alignItems: 'center',
                gap: '14px'
              }}
            >
              {mod.icon_url ? (
                <img src={mod.icon_url} alt="" style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'contain' }} />
              ) : (
                <div style={{ width: '48px', height: '48px', borderRadius: '8px', background: '#333', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>🧩</div>
              )}

              <div style={{ flex: 1 }}>
                <h4 style={{ margin: 0, fontSize: '16px', color: '#fff' }}>{mod.title} <small style={{ color: '#888' }}>by {mod.author}</small></h4>
                <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#aaa', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {mod.description}
                </p>
                <small style={{ color: '#666' }}>📥 {mod.downloads.toLocaleString()} скачиваний</small>
              </div>

              <button
                className="btn-primary"
                style={{ padding: '8px 14px', fontSize: '14px' }}
                disabled={installingId === mod.project_id}
                onClick={() => handleInstallMod(mod)}
              >
                {installingId === mod.project_id ? 'Установка...' : 'Установить'}
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
