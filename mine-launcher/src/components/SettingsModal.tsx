import React, { useState, useEffect } from 'react'
import { LauncherSettings } from '../types'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (newSettings: any) => void
}

// User SVGs
const IconJava = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="m15.638 4.566l.056.032c-.758.4-2.924 1.689-2.924 3.332c0 .554.317 1.088.614 1.59c.262.442.509.857.509 1.238c0 .957-.933 1.7-1.46 2.042l-.1-.058c.199-.243.444-.65.444-1.084c0-.598-.307-1.076-.618-1.561c-.322-.501-.648-1.01-.648-1.67c0-2.292 3.115-3.522 4.127-3.861m-4.095 1.212c1.253-1.12 2.622-2.344 2.622-4.185c0-.833-.341-1.365-.51-1.578L13.6.046c.04.166.1.472.1.872c0 1.676-1.422 2.85-2.798 3.988C9.611 5.974 8.36 7.008 8.36 8.392c0 1.985 1.958 3.206 2.785 3.722l.063.04l.05-.03q-.067-.074-.142-.152c-.636-.677-1.602-1.704-1.602-3.275c0-1.103.974-1.974 2.03-2.919m-.452 9.908c1.764 0 2.998-.253 3.546-.408l.832.48c-.793.403-2.551.71-4.382.71c-2.153 0-4.507-.462-4.514-1.078c-.005-.34.765-.566 1.595-.712l.05.029s-.281.101-.278.333c.004.35 1.42.646 3.15.646m-3.529 2.171c0-.408.839-.6 1.223-.677l.05.03c-.066.049-.102.116-.102.173c0 .267.93.511 2.356.511c1.278 0 1.988-.157 2.41-.258l.99.573c-.045.032-1.02.645-3.402.645c-1.731 0-3.525-.432-3.525-.997m8.529-1.728c1.18-.673 2.361-1.469 2.428-2.747c.044-.839-.727-1.454-1.57-1.29l.045-.112v-.002c.212-.064.474-.116.767-.116c.943 0 1.666.565 1.758 1.356c.186 1.586-2.062 2.618-3.321 2.973zm1.975 2.988c.01 1.09-3.698 1.738-7.012 1.767c-2.861.025-7.474-.516-7.484-1.605c-.006-.753 2-1.275 3.09-1.425l.115.066s-1.625.377-1.62 1.062c.006.683 3.425 1.274 5.894 1.253c3.825-.034 6.414-.657 6.72-1.502l.054-.031c.112.082.24.217.243.415M6.43 21.337a26 26 0 0 0 4.279.325c6.208-.054 7.96-1.58 8.23-1.912l.047.028c-.064 1.208-3.347 2.212-7.396 2.247c-2.061.018-3.937-.22-5.285-.615zm2.602-9.283c-1.079.083-3.396.426-3.396 1.036c0 .462 2.124 1.113 5.452 1.113c2.994 0 4.884-.565 5.325-.78l-.643-.375c-.46.125-2.169.506-4.682.506c-1.48 0-4.03-.273-4.03-.69c0-.374 1.591-.663 2.048-.745l.029-.005z" />
  </svg>
)

const IconProxy = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="m15.013 9.395l4.57-4.57L21 6.243V2h-4.243l1.411 1.41l-4.834 4.835a3.938 3.938 0 0 0-5.191 2.75H5.72a2 2 0 1 0 .005 2H8.14a3.94 3.94 0 0 0 5.204 2.757l4.83 4.83L16.758 22H21v-4.243l-1.41 1.411l-4.571-4.57a4 4 0 0 0 .841-1.603L18 13v2l3-3l-3-3v2l-2.143-.005a4 4 0 0 0-.844-1.6" />
  </svg>
)

const IconFont = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor">
    <path d="M4.5 2A3.5 3.5 0 0 1 8 5.5V14H6v-4H3v4H1V5.5A3.5 3.5 0 0 1 4.5 2m0 2A1.5 1.5 0 0 0 3 5.5V8h3V5.5A1.5 1.5 0 0 0 4.5 4M12 6a3 3 0 0 1 3 3v5h-3.5a2.5 2.5 0 0 1 0-5H13a1 1 0 0 0-1-1h-2V6zm-.5 5a.5.5 0 0 0 0 1H13v-1z" />
  </svg>
)

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<'java' | 'proxy' | 'ui'>('java')

  const [settings, setSettings] = useState<LauncherSettings>({
    javaPath: '',
    memoryMin: 1024,
    memoryMax: 4096,
    customJvmArgs: '',
    closeLauncherOnGameStart: false,
    gameDir: '',
    useProxy: false,
    proxyType: 'http',
    proxyHost: '',
    proxyPort: 8080,
    launcherFont: 'system-ui'
  })

  const [detectedJavas, setDetectedJavas] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isOpen && window.electronAPI) {
      window.electronAPI.getSettings().then((s) => {
        setSettings({
          javaPath: s?.javaPath || '',
          memoryMin: s?.memoryMin || 1024,
          memoryMax: s?.memoryMax || 4096,
          customJvmArgs: s?.customJvmArgs || '',
          closeLauncherOnGameStart: s?.closeLauncherOnGameStart || false,
          gameDir: s?.gameDir || '',
          useProxy: s?.useProxy || false,
          proxyType: s?.proxyType || 'http',
          proxyHost: s?.proxyHost || '',
          proxyPort: s?.proxyPort || 8080,
          launcherFont: s?.launcherFont || 'system-ui'
        })
      })
      window.electronAPI.detectJava().then(setDetectedJavas)
    }
  }, [isOpen])

  if (!isOpen) return null

  const handleFontChange = (font: string) => {
    setSettings({ ...settings, launcherFont: font })
    document.body.style.fontFamily = font === 'system-ui' ? 'system-ui, -apple-system, sans-serif' : font
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      if (window.electronAPI) {
        await window.electronAPI.saveSettings(settings)
      }
      onClose()
    } catch {
      // ignore
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose} style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(3px)' }}>
      {/* Prism Launcher Style Window Card */}
      <div
        className="prism-settings-window"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '740px',
          height: '520px',
          background: '#23272e',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '8px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: settings.launcherFont || 'system-ui, sans-serif',
          color: '#e0e0e0'
        }}
      >
        {/* Top Window Bar */}
        <div
          style={{
            height: '32px',
            background: '#1b1d23',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 12px',
            fontSize: '12px',
            color: '#aaa',
            userSelect: 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '14px' }}>⚙️</span>
            <span style={{ fontWeight: '500', color: '#eee' }}>Настройки — Mine Launcher</span>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={onClose}
              style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '14px' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#aaa')}
            >
              ✕
            </button>
          </div>
        </div>

        {/* Main Split Body */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Left Navigation Sidebar with Custom SVGs */}
          <div
            style={{
              width: '190px',
              background: '#1c1e24',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              padding: '6px 0',
              overflowY: 'auto'
            }}
          >
            {[
              { id: 'java', name: 'Java и Память', icon: <IconJava /> },
              { id: 'proxy', name: 'Прокси (Proxy)', icon: <IconProxy /> },
              { id: 'ui', name: 'Интерфейс и Шрифт', icon: <IconFont /> }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveCategory(item.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  background: activeCategory === item.id ? '#313642' : 'transparent',
                  border: 'none',
                  borderLeft: activeCategory === item.id ? '3px solid #53921b' : '3px solid transparent',
                  color: activeCategory === item.id ? '#ffffff' : '#a0a5b1',
                  fontSize: '13px',
                  fontWeight: activeCategory === item.id ? '600' : 'normal',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', color: activeCategory === item.id ? '#53921b' : '#888' }}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* Right Category Content Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '16px 20px', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '18px', margin: '0 0 14px 0', fontWeight: '600', color: '#fff' }}>
              {activeCategory === 'java' && 'Настройки Java и оперативной памяти'}
              {activeCategory === 'proxy' && 'Сеть и Прокси (Proxy)'}
              {activeCategory === 'ui' && 'Внешний вид и Шрифт лаунчера'}
            </h2>

            {/* Java & RAM View */}
            {activeCategory === 'java' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <fieldset style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '12px 16px' }}>
                  <legend style={{ fontSize: '12px', color: '#aaa', padding: '0 6px' }}>Исполняемый файл Java</legend>
                  <select
                    value={settings.javaPath}
                    onChange={(e) => setSettings({ ...settings, javaPath: e.target.value })}
                    style={{ width: '100%', padding: '8px', background: '#191b20', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '4px' }}
                  >
                    <option value="">Автоопределение (Встроенная Java 17)</option>
                    {detectedJavas.map((j) => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                </fieldset>

                <fieldset style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '12px 16px' }}>
                  <legend style={{ fontSize: '12px', color: '#aaa', padding: '0 6px' }}>Выделяемая память (Max RAM)</legend>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                    <span>Максимум RAM:</span>
                    <span style={{ color: '#53921b', fontWeight: 'bold' }}>{settings.memoryMax} MB</span>
                  </div>
                  <input
                    type="range"
                    min="1024"
                    max="32768"
                    step="512"
                    value={settings.memoryMax}
                    onChange={(e) => setSettings({ ...settings, memoryMax: Number(e.target.value) })}
                    style={{ width: '100%' }}
                  />
                </fieldset>

                <fieldset style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '12px 16px' }}>
                  <legend style={{ fontSize: '12px', color: '#aaa', padding: '0 6px' }}>Аргументы JVM</legend>
                  <input
                    type="text"
                    placeholder="-XX:+UseG1GC -Dsun.java2d.opengl=true"
                    value={settings.customJvmArgs || ''}
                    onChange={(e) => setSettings({ ...settings, customJvmArgs: e.target.value })}
                    style={{ width: '100%', padding: '8px', background: '#191b20', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '4px' }}
                  />
                </fieldset>
              </div>
            )}

            {/* Proxy View */}
            {activeCategory === 'proxy' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <fieldset style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '12px 16px' }}>
                  <legend style={{ fontSize: '12px', color: '#aaa', padding: '0 6px' }}>Параметры Прокси-сервера</legend>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#fff' }}>
                      <input
                        type="checkbox"
                        checked={settings.useProxy || false}
                        onChange={(e) => setSettings({ ...settings, useProxy: e.target.checked })}
                      />
                      Использовать Прокси для запуска Minecraft
                    </label>

                    <div style={{ display: 'flex', gap: '10px' }}>
                      <div style={{ width: '120px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>Тип прокси:</label>
                        <select
                          value={settings.proxyType || 'http'}
                          onChange={(e) => setSettings({ ...settings, proxyType: e.target.value as any })}
                          style={{ width: '100%', padding: '7px', background: '#191b20', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '4px' }}
                        >
                          <option value="http">HTTP</option>
                          <option value="socks5">SOCKS5</option>
                        </select>
                      </div>

                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>Хост прокси (IP / Domain):</label>
                        <input
                          type="text"
                          placeholder="127.0.0.1"
                          value={settings.proxyHost || ''}
                          onChange={(e) => setSettings({ ...settings, proxyHost: e.target.value })}
                          style={{ width: '100%', padding: '7px', background: '#191b20', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '4px' }}
                        />
                      </div>

                      <div style={{ width: '90px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '4px' }}>Порт:</label>
                        <input
                          type="number"
                          placeholder="1080"
                          value={settings.proxyPort || 8080}
                          onChange={(e) => setSettings({ ...settings, proxyPort: Number(e.target.value) })}
                          style={{ width: '100%', padding: '7px', background: '#191b20', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '4px' }}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            )}

            {/* UI & Extensive Font View */}
            {activeCategory === 'ui' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <fieldset style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '12px 16px' }}>
                  <legend style={{ fontSize: '12px', color: '#aaa', padding: '0 6px' }}>Шрифт Лаунчера</legend>
                  <select
                    value={settings.launcherFont || 'system-ui'}
                    onChange={(e) => handleFontChange(e.target.value)}
                    style={{ width: '100%', padding: '8px', background: '#191b20', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '4px', fontSize: '14px' }}
                  >
                    <option value="system-ui">System UI (По умолчанию)</option>
                    <option value="Inter, sans-serif">Inter (Современный)</option>
                    <option value="Roboto, sans-serif">Roboto</option>
                    <option value="Segoe UI, sans-serif">Segoe UI</option>
                    <option value="Outfit, sans-serif">Outfit</option>
                    <option value="Montserrat, sans-serif">Montserrat</option>
                    <option value="Open Sans, sans-serif">Open Sans</option>
                    <option value="Fira Code, monospace">Fira Code (Код)</option>
                    <option value="Consolas, monospace">Consolas (Моноширинный)</option>
                    <option value="Minecraft, monospace">Minecraft Pixel Font</option>
                  </select>
                </fieldset>

                <fieldset style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '12px 16px' }}>
                  <legend style={{ fontSize: '12px', color: '#aaa', padding: '0 6px' }}>Поведение лаунчера</legend>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '13px', color: '#fff' }}>
                    <input
                      type="checkbox"
                      checked={settings.closeLauncherOnGameStart || false}
                      onChange={(e) => setSettings({ ...settings, closeLauncherOnGameStart: e.target.checked })}
                    />
                    Закрывать лаунчер при запуске игры
                  </label>
                </fieldset>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Window Actions */}
        <div
          style={{
            height: '42px',
            background: '#1b1d23',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 14px'
          }}
        >
          <button
            type="button"
            style={{
              padding: '5px 12px',
              background: 'rgba(255,255,255,0.08)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#ddd',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            ? Справка
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={handleSave}
              style={{
                padding: '6px 18px',
                background: '#53921b',
                border: 'none',
                color: '#fff',
                borderRadius: '4px',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {saving ? 'Сохранение...' : '✕ Сохранить и закрыть'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
