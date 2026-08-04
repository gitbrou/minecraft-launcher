import React, { useState, useEffect } from 'react'
import { LauncherSettings } from '../types'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (newSettings: any) => void
}

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
          {/* Left Navigation Sidebar */}
          <div
            style={{
              width: '180px',
              background: '#1c1e24',
              borderRight: '1px solid rgba(255, 255, 255, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              padding: '6px 0',
              overflowY: 'auto'
            }}
          >
            {[
              { id: 'java', name: 'Java и Память', icon: '☕' },
              { id: 'proxy', name: 'Прокси (Proxy)', icon: '🔌' },
              { id: 'ui', name: 'Интерфейс и Шрифт', icon: '🎨' }
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
                <span>{item.icon}</span>
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

            {/* UI & Font View */}
            {activeCategory === 'ui' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <fieldset style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '12px 16px' }}>
                  <legend style={{ fontSize: '12px', color: '#aaa', padding: '0 6px' }}>Шрифт Лаунчера</legend>
                  <select
                    value={settings.launcherFont || 'system-ui'}
                    onChange={(e) => handleFontChange(e.target.value)}
                    style={{ width: '100%', padding: '8px', background: '#191b20', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '4px' }}
                  >
                    <option value="system-ui">Системный (По умолчанию)</option>
                    <option value="Inter, sans-serif">Inter</option>
                    <option value="Roboto, sans-serif">Roboto</option>
                    <option value="Segoe UI, sans-serif">Segoe UI</option>
                    <option value="Noto Sans, sans-serif">Noto Sans</option>
                    <option value="Consolas, monospace">Consolas (Моноширинный)</option>
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
