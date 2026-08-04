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

const IconCommandLine = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6.75 7.5l3 2.25l-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25" />
  </svg>
)

// Custom Modern UI Toggle Switch Component (Тумблер)
const ToggleSwitch: React.FC<{ checked: boolean; onChange: (v: boolean) => void; label: string }> = ({ checked, onChange, label }) => {
  return (
    <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', userSelect: 'none', width: '100%' }}>
      <span style={{ fontSize: '13px', color: '#eee', fontWeight: '500' }}>{label}</span>
      <div
        onClick={() => onChange(!checked)}
        style={{
          width: '44px',
          height: '24px',
          background: checked ? '#53921b' : '#374151',
          borderRadius: '12px',
          padding: '2px',
          transition: 'all 0.2s ease',
          position: 'relative',
          boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.4)'
        }}
      >
        <div
          style={{
            width: '20px',
            height: '20px',
            background: '#ffffff',
            borderRadius: '50%',
            transition: 'all 0.2s ease',
            transform: checked ? 'translateX(20px)' : 'translateX(0px)',
            boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}
        />
      </div>
    </label>
  )
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<'java' | 'proxy' | 'ui' | 'cmd'>('java')

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
    launcherFont: 'system-ui',
    customGameArgs: ''
  })

  const [detectedJavas, setDetectedJavas] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isOpen && window.electronAPI) {
      window.electronAPI.getSettings().then((s) => {
        if (s) {
          setSettings({
            javaPath: s.javaPath || '',
            memoryMin: s.memoryMin || 1024,
            memoryMax: s.memoryMax || 4096,
            customJvmArgs: s.customJvmArgs || '',
            closeLauncherOnGameStart: s.closeLauncherOnGameStart || false,
            gameDir: s.gameDir || '',
            useProxy: s.useProxy || false,
            proxyType: s.proxyType || 'http',
            proxyHost: s.proxyHost || '',
            proxyPort: s.proxyPort || 8080,
            launcherFont: s.launcherFont || 'system-ui',
            customGameArgs: s.customGameArgs || ''
          })
          if (s.launcherFont) {
            applyFontToApp(s.launcherFont)
          }
        }
      })
      window.electronAPI.detectJava().then(setDetectedJavas)
    }
  }, [isOpen])

  if (!isOpen) return null

  const applyFontToApp = (font: string) => {
    let fontCss = font
    if (font === 'system-ui') {
      fontCss = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    } else if (font === 'Minecraft') {
      fontCss = '"Fira Code", Consolas, monospace'
    }
    document.body.style.fontFamily = fontCss
  }

  const handleFontChange = (font: string) => {
    setSettings({ ...settings, launcherFont: font })
    applyFontToApp(font)
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
    <div className="modal-overlay" onClick={onClose} style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }}>
      {/* Premium Settings Window */}
      <div
        className="prism-settings-window"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '750px',
          height: '540px',
          background: '#1a1c23',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: settings.launcherFont === 'system-ui' ? 'system-ui, sans-serif' : settings.launcherFont,
          color: '#e0e0e0'
        }}
      >
        {/* Top Window Bar */}
        <div
          style={{
            height: '38px',
            background: '#12141a',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 16px',
            fontSize: '13px',
            color: '#aaa',
            userSelect: 'none'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '15px' }}>⚙️</span>
            <span style={{ fontWeight: '600', color: '#eee' }}>Настройки — Mine Launcher</span>
          </div>

          <button
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#aaa', cursor: 'pointer', fontSize: '16px', padding: '4px' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#aaa')}
          >
            ✕
          </button>
        </div>

        {/* Main Split Body */}
        <div style={{ flex: 1, display: 'flex', overflow: 'hidden' }}>
          {/* Left Navigation Sidebar */}
          <div
            style={{
              width: '210px',
              background: '#14161d',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              padding: '10px 8px',
              gap: '4px'
            }}
          >
            {[
              { id: 'java', name: 'Java и Память', icon: <IconJava /> },
              { id: 'proxy', name: 'Прокси (Proxy)', icon: <IconProxy /> },
              { id: 'ui', name: 'Интерфейс и Шрифт', icon: <IconFont /> },
              { id: 'cmd', name: 'Параметры запуска', icon: <IconCommandLine /> }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveCategory(item.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 14px',
                  background: activeCategory === item.id ? 'rgba(83, 146, 27, 0.2)' : 'transparent',
                  border: 'none',
                  borderRadius: '10px',
                  color: activeCategory === item.id ? '#ffffff' : '#9ca3af',
                  fontSize: '13px',
                  fontWeight: activeCategory === item.id ? '600' : '500',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
              >
                <span style={{ display: 'flex', alignItems: 'center', color: activeCategory === item.id ? '#53921b' : '#6b7280' }}>
                  {item.icon}
                </span>
                <span>{item.name}</span>
              </button>
            ))}
          </div>

          {/* Right Category Content Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '20px 24px', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '18px', margin: '0 0 16px 0', fontWeight: '600', color: '#fff' }}>
              {activeCategory === 'java' && 'Настройки Java и оперативной памяти'}
              {activeCategory === 'proxy' && 'Сеть и Прокси-сервер'}
              {activeCategory === 'ui' && 'Внешний вид и Шрифт приложения'}
              {activeCategory === 'cmd' && 'Параметры запуска Minecraft'}
            </h2>

            {/* Java & RAM View */}
            {activeCategory === 'java' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <fieldset style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 18px', background: 'rgba(255,255,255,0.02)' }}>
                  <legend style={{ fontSize: '12px', color: '#53921b', padding: '0 6px', fontWeight: '600' }}>Исполняемый файл Java</legend>
                  <select
                    value={settings.javaPath}
                    onChange={(e) => setSettings({ ...settings, javaPath: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: '#12141a',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '13px'
                    }}
                  >
                    <option value="">Автоопределение (Встроенная Java 17)</option>
                    {detectedJavas.map((j) => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                </fieldset>

                <fieldset style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 18px', background: 'rgba(255,255,255,0.02)' }}>
                  <legend style={{ fontSize: '12px', color: '#53921b', padding: '0 6px', fontWeight: '600' }}>Выделяемая память (Max RAM)</legend>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '13px' }}>
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
                    style={{ width: '100%', accentColor: '#53921b', cursor: 'pointer' }}
                  />
                </fieldset>
              </div>
            )}

            {/* Proxy View */}
            {activeCategory === 'proxy' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <fieldset style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 18px', background: 'rgba(255,255,255,0.02)' }}>
                  <legend style={{ fontSize: '12px', color: '#53921b', padding: '0 6px', fontWeight: '600' }}>Параметры Прокси-сервера</legend>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    <ToggleSwitch
                      label="Включить Прокси для запуска Minecraft"
                      checked={settings.useProxy || false}
                      onChange={(val) => setSettings({ ...settings, useProxy: val })}
                    />

                    <div style={{ display: 'flex', gap: '12px', opacity: settings.useProxy ? 1 : 0.4, pointerEvents: settings.useProxy ? 'auto' : 'none', transition: 'all 0.2s ease' }}>
                      <div style={{ width: '120px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '6px' }}>Тип прокси:</label>
                        <select
                          value={settings.proxyType || 'http'}
                          onChange={(e) => setSettings({ ...settings, proxyType: e.target.value as any })}
                          style={{ width: '100%', padding: '8px', background: '#12141a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '8px' }}
                        >
                          <option value="http">HTTP</option>
                          <option value="socks5">SOCKS5</option>
                        </select>
                      </div>

                      <div style={{ flex: 1 }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '6px' }}>Хост прокси (IP / Domain):</label>
                        <input
                          type="text"
                          placeholder="127.0.0.1"
                          value={settings.proxyHost || ''}
                          onChange={(e) => setSettings({ ...settings, proxyHost: e.target.value })}
                          style={{ width: '100%', padding: '8px 12px', background: '#12141a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '8px' }}
                        />
                      </div>

                      <div style={{ width: '100px' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#aaa', marginBottom: '6px' }}>Порт:</label>
                        <input
                          type="number"
                          placeholder="8080"
                          value={settings.proxyPort || 8080}
                          onChange={(e) => setSettings({ ...settings, proxyPort: Number(e.target.value) })}
                          style={{ width: '100%', padding: '8px', background: '#12141a', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '8px' }}
                        />
                      </div>
                    </div>
                  </div>
                </fieldset>
              </div>
            )}

            {/* UI & Font Selection View */}
            {activeCategory === 'ui' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <fieldset style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 18px', background: 'rgba(255,255,255,0.02)' }}>
                  <legend style={{ fontSize: '12px', color: '#53921b', padding: '0 6px', fontWeight: '600' }}>Шрифт Лаунчера</legend>
                  <select
                    value={settings.launcherFont || 'system-ui'}
                    onChange={(e) => handleFontChange(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: '#12141a',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '14px'
                    }}
                  >
                    <option value="system-ui">System UI (По умолчанию)</option>
                    <option value="Inter, sans-serif">Inter (Современный)</option>
                    <option value="Roboto, sans-serif">Roboto</option>
                    <option value="Outfit, sans-serif">Outfit</option>
                    <option value="Montserrat, sans-serif">Montserrat</option>
                    <option value="Open Sans, sans-serif">Open Sans</option>
                    <option value="Segoe UI, sans-serif">Segoe UI</option>
                    <option value="Fira Code, monospace">Fira Code (Код)</option>
                    <option value="Consolas, monospace">Consolas (Моноширинный)</option>
                    <option value="Minecraft">Minecraft Pixel</option>
                  </select>
                </fieldset>

                <fieldset style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 18px', background: 'rgba(255,255,255,0.02)' }}>
                  <legend style={{ fontSize: '12px', color: '#53921b', padding: '0 6px', fontWeight: '600' }}>Поведение лаунчера</legend>
                  <ToggleSwitch
                    label="Закрывать лаунчер при запуске игры"
                    checked={settings.closeLauncherOnGameStart || false}
                    onChange={(val) => setSettings({ ...settings, closeLauncherOnGameStart: val })}
                  />
                </fieldset>
              </div>
            )}

            {/* Launch Parameters View (Параметры запуска) */}
            {activeCategory === 'cmd' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {/* Mandatory Systems Launch Arguments (Read-Only) */}
                <fieldset style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 18px', background: 'rgba(0,0,0,0.2)' }}>
                  <legend style={{ fontSize: '12px', color: '#888', padding: '0 6px', fontWeight: '600' }}>Обязательные параметры системы (Защищены от удаления)</legend>
                  <div
                    style={{
                      fontFamily: 'monospace',
                      fontSize: '11px',
                      color: '#6b7280',
                      background: '#12141a',
                      padding: '10px 12px',
                      borderRadius: '8px',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-all',
                      lineHeight: '1.5',
                      border: '1px solid rgba(255,255,255,0.05)',
                      userSelect: 'none'
                    }}
                  >
                    -Xms1024M -Xmx4096M -Djava.library.path=natives net.minecraft.client.main.Main --username [Никнейм] --version [Версия] --gameDir [Папка] --assetsDir assets --assetIndex [Index] --uuid [UUID] --accessToken 00000000 --userType legacy
                  </div>
                </fieldset>

                {/* Additional JVM Arguments (Editable) */}
                <fieldset style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 18px', background: 'rgba(255,255,255,0.02)' }}>
                  <legend style={{ fontSize: '12px', color: '#53921b', padding: '0 6px', fontWeight: '600' }}>Дополнительные аргументы JVM</legend>
                  <input
                    type="text"
                    placeholder="-XX:+UseG1GC -Dsun.java2d.opengl=true"
                    value={settings.customJvmArgs || ''}
                    onChange={(e) => setSettings({ ...settings, customJvmArgs: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: '#12141a',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '13px'
                    }}
                  />
                </fieldset>

                {/* Additional Game Arguments (Editable) */}
                <fieldset style={{ border: '1px solid rgba(255,255,255,0.12)', borderRadius: '12px', padding: '14px 18px', background: 'rgba(255,255,255,0.02)' }}>
                  <legend style={{ fontSize: '12px', color: '#53921b', padding: '0 6px', fontWeight: '600' }}>Дополнительные аргументы игры Minecraft</legend>
                  <input
                    type="text"
                    placeholder="--width 1280 --height 720 --fullscreen"
                    value={settings.customGameArgs || ''}
                    onChange={(e) => setSettings({ ...settings, customGameArgs: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      background: '#12141a',
                      border: '1px solid rgba(255,255,255,0.15)',
                      color: '#fff',
                      borderRadius: '8px',
                      outline: 'none',
                      fontSize: '13px'
                    }}
                  />
                </fieldset>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Window Actions */}
        <div
          style={{
            height: '48px',
            background: '#12141a',
            borderTop: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 18px'
          }}
        >
          <button
            type="button"
            style={{
              padding: '6px 14px',
              background: 'rgba(255,255,255,0.06)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#ccc',
              borderRadius: '8px',
              fontSize: '12px',
              cursor: 'pointer'
            }}
          >
            ? Справка
          </button>

          <button
            type="button"
            onClick={handleSave}
            style={{
              padding: '8px 22px',
              background: '#53921b',
              border: 'none',
              color: '#fff',
              borderRadius: '8px',
              fontSize: '13px',
              fontWeight: '600',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 2px 8px rgba(83, 146, 27, 0.4)'
            }}
          >
            {saving ? 'Сохранение...' : '✓ Сохранить и закрыть'}
          </button>
        </div>
      </div>
    </div>
  )
}
