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
      const loaderCategory = (loader && loader !== 'vanilla') ? loader : 'fabric'
      const facets = JSON.stringify([
        [`categories:${loaderCategory}`],
        ['project_type:mod']
      ])
      const res = await fetch(
        `https://api.modrinth.com/v2/search?query=${encodeURIComponent(query)}&facets=${encodeURIComponent(facets)}&limit=30`
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

      setStatusMsg(`Установка ${filename}...`)
      if (window.electronAPI) {
        await window.electronAPI.downloadModFile({
          instanceId,
          downloadUrl,
          filename
        })
      }
      setStatusMsg(`Мод ${project.title} успешно установлен!`)
      onModInstalled()
      setTimeout(() => setStatusMsg(''), 3000)
    } catch (err: any) {
      setStatusMsg(`Ошибка установки: ${err.message}`)
    } finally {
      setInstallingId(null)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose} style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}>
      <div
        className="modal-card"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '780px',
          height: '560px',
          background: '#1a1c23',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: '16px',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          padding: 0
        }}
      >
        {/* Header */}
        <div
          style={{
            height: '42px',
            background: '#12141a',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 16px'
          }}
        >
          <span style={{ fontWeight: '600', color: '#fff', fontSize: '14px' }}>
            Поиск и установка модов (Версия: {gameVersion}, Загрузчик: {loader || 'Vanilla/Fabric'})
          </span>
          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '16px' }}
          >
            ✕
          </button>
        </div>

        {/* Search input */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', gap: '10px' }}>
          <div style={{ position: 'relative', flex: 1 }}>
            <input
              type="text"
              placeholder="Поиск модов на Modrinth (Sodium, Iris, JEI, JourneyMap...)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px 10px 40px',
                background: '#12141a',
                border: '1px solid rgba(255,255,255,0.15)',
                color: '#fff',
                borderRadius: '8px',
                outline: 'none',
                fontSize: '13px'
              }}
            />
            <span style={{ position: 'absolute', left: '12px', top: '10px', color: '#777', display: 'flex' }}>
              <IconSearchPixel />
            </span>
          </div>
        </div>

        {/* Status notice */}
        {statusMsg && (
          <div style={{ padding: '8px 20px', background: 'rgba(83, 146, 27, 0.2)', color: '#53921b', fontSize: '13px', fontWeight: '500' }}>
            {statusMsg}
          </div>
        )}

        {/* Results List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {loading ? (
            <div style={{ color: '#aaa', textAlign: 'center', marginTop: '40px' }}>Загрузка модов с Modrinth...</div>
          ) : searchResults.length === 0 ? (
            <div style={{ color: '#888', textAlign: 'center', marginTop: '40px' }}>Моды не найдены</div>
          ) : (
            searchResults.map((proj) => (
              <div
                key={proj.project_id}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '10px',
                  padding: '12px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px'
                }}
              >
                {proj.icon_url ? (
                  <img src={proj.icon_url} alt={proj.title} style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'cover' }} />
                ) : (
                  <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: '#374151', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 'bold' }}>
                    {proj.title[0]}
                  </div>
                )}

                <div style={{ flex: 1, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <h4 style={{ margin: 0, fontSize: '15px', color: '#fff', fontWeight: '600' }}>{proj.title}</h4>
                    <span style={{ fontSize: '11px', color: '#888' }}>от {proj.author}</span>
                  </div>
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#aaa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {proj.description}
                  </p>
                </div>

                <button
                  onClick={() => handleInstallMod(proj)}
                  disabled={installingId === proj.project_id}
                  style={{
                    padding: '8px 16px',
                    background: '#53921b',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontWeight: '600',
                    fontSize: '12px',
                    cursor: 'pointer',
                    whiteSpace: 'nowrap'
                  }}
                >
                  {installingId === proj.project_id ? 'Установка...' : 'Установить'}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
