import React, { useState, useEffect } from 'react'
import { LauncherSettings } from '../types'

interface SettingsModalProps {
  isOpen: boolean
  onClose: () => void
  onSave?: (newSettings: any) => void
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<
    'launcher' | 'minecraft' | 'java' | 'language' | 'commands' | 'proxy' | 'tools' | 'accounts' | 'apis'
  >('launcher')

  const [launcherSubtab, setLauncherSubtab] = useState<'features' | 'ui' | 'console'>('console')

  const [settings, setSettings] = useState<LauncherSettings>({
    javaPath: '',
    memoryMin: 1024,
    memoryMax: 4096,
    customJvmArgs: '',
    closeLauncherOnGameStart: false,
    gameDir: ''
  })

  // Console settings state
  const [showConsoleRunning, setShowConsoleRunning] = useState(false)
  const [autoCloseConsoleQuit, setAutoCloseConsoleQuit] = useState(false)
  const [showConsoleCrash, setShowConsoleCrash] = useState(true)
  const [historyLimitLines, setHistoryLimitLines] = useState('100000 lines')
  const [stopLoggingOverflow, setStopLoggingOverflow] = useState(true)
  const [consoleFont, setConsoleFont] = useState('Noto Sans Mono')
  const [fontSize, setFontSize] = useState(11)

  const [detectedJavas, setDetectedJavas] = useState<string[]>([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (isOpen && window.electronAPI) {
      window.electronAPI.getSettings().then(setSettings)
      window.electronAPI.detectJava().then(setDetectedJavas)
    }
  }, [isOpen])

  if (!isOpen) return null

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
          width: '780px',
          height: '560px',
          background: '#23272e',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: '8px',
          boxShadow: '0 12px 40px rgba(0, 0, 0, 0.6)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          fontFamily: 'system-ui, -apple-system, sans-serif',
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
            <span style={{ fontWeight: '500', color: '#eee' }}>Settings — Mine Launcher</span>
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
              { id: 'launcher', name: 'Launcher', icon: '🚀' },
              { id: 'minecraft', name: 'Minecraft', icon: '🧊' },
              { id: 'java', name: 'Java', icon: '☕' },
              { id: 'language', name: 'Language', icon: '🌐' },
              { id: 'commands', name: 'Custom Commands', icon: '💻' },
              { id: 'proxy', name: 'Proxy', icon: '🔌' },
              { id: 'tools', name: 'External Tools', icon: '🛠️' },
              { id: 'accounts', name: 'Accounts', icon: '👤' },
              { id: 'apis', name: 'APIs', icon: '🔑' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveCategory(item.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '9px 14px',
                  background: activeCategory === item.id ? '#313642' : 'transparent',
                  border: 'none',
                  borderLeft: activeCategory === item.id ? '3px solid #3b82f6' : '3px solid transparent',
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
            <h2 style={{ fontSize: '20px', margin: '0 0 12px 0', fontWeight: '600', color: '#fff' }}>
              {activeCategory === 'launcher' && 'Launcher'}
              {activeCategory === 'minecraft' && 'Minecraft'}
              {activeCategory === 'java' && 'Java'}
              {activeCategory === 'language' && 'Language'}
              {activeCategory === 'commands' && 'Custom Commands'}
              {activeCategory === 'proxy' && 'Proxy'}
              {activeCategory === 'tools' && 'External Tools'}
              {activeCategory === 'accounts' && 'Accounts'}
              {activeCategory === 'apis' && 'APIs'}
            </h2>

            {/* Launcher Category View */}
            {activeCategory === 'launcher' && (
              <>
                {/* Subtabs matching Prism Launcher screenshot */}
                <div style={{ display: 'flex', gap: '2px', borderBottom: '1px solid rgba(255,255,255,0.1)', marginBottom: '16px' }}>
                  <button
                    onClick={() => setLauncherSubtab('features')}
                    style={{
                      padding: '6px 14px',
                      background: launcherSubtab === 'features' ? '#313642' : 'transparent',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderBottom: launcherSubtab === 'features' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '4px 4px 0 0',
                      color: launcherSubtab === 'features' ? '#fff' : '#888',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Features
                  </button>
                  <button
                    onClick={() => setLauncherSubtab('ui')}
                    style={{
                      padding: '6px 14px',
                      background: launcherSubtab === 'ui' ? '#313642' : 'transparent',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderBottom: launcherSubtab === 'ui' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '4px 4px 0 0',
                      color: launcherSubtab === 'ui' ? '#fff' : '#888',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    User Interface
                  </button>
                  <button
                    onClick={() => setLauncherSubtab('console')}
                    style={{
                      padding: '6px 14px',
                      background: launcherSubtab === 'console' ? '#313642' : 'transparent',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderBottom: launcherSubtab === 'console' ? 'none' : '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '4px 4px 0 0',
                      color: launcherSubtab === 'console' ? '#fff' : '#888',
                      fontSize: '12px',
                      cursor: 'pointer'
                    }}
                  >
                    Console
                  </button>
                </div>

                {/* Console Subtab Content matching Screenshot 2 EXACTLY */}
                {launcherSubtab === 'console' && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    {/* Console Settings Group Box */}
                    <fieldset
                      style={{
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '6px',
                        padding: '12px 16px',
                        margin: 0
                      }}
                    >
                      <legend style={{ fontSize: '12px', color: '#aaa', padding: '0 6px' }}>Console Settings</legend>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={showConsoleRunning}
                            onChange={(e) => setShowConsoleRunning(e.target.checked)}
                          />
                          Show console while the game is running?
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={autoCloseConsoleQuit}
                            onChange={(e) => setAutoCloseConsoleQuit(e.target.checked)}
                          />
                          Automatically close console when the game quits?
                        </label>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={showConsoleCrash}
                            onChange={(e) => setShowConsoleCrash(e.target.checked)}
                          />
                          Show console when the game crashes?
                        </label>
                      </div>
                    </fieldset>

                    {/* History limit Group Box */}
                    <fieldset
                      style={{
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '6px',
                        padding: '12px 16px',
                        margin: 0
                      }}
                    >
                      <legend style={{ fontSize: '12px', color: '#aaa', padding: '0 6px' }}>History limit</legend>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px' }}>
                        <select
                          value={historyLimitLines}
                          onChange={(e) => setHistoryLimitLines(e.target.value)}
                          style={{
                            padding: '6px 10px',
                            background: '#191b20',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: '#fff',
                            borderRadius: '4px',
                            width: '100%'
                          }}
                        >
                          <option value="100000 lines">100000 lines</option>
                          <option value="50000 lines">50000 lines</option>
                          <option value="10000 lines">10000 lines</option>
                        </select>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                          <input
                            type="checkbox"
                            checked={stopLoggingOverflow}
                            onChange={(e) => setStopLoggingOverflow(e.target.checked)}
                          />
                          Stop logging when log overflows
                        </label>
                      </div>
                    </fieldset>

                    {/* Console font Group Box */}
                    <fieldset
                      style={{
                        border: '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '6px',
                        padding: '12px 16px',
                        margin: 0
                      }}
                    >
                      <legend style={{ fontSize: '12px', color: '#aaa', padding: '0 6px' }}>Console font</legend>
                      <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                        <select
                          value={consoleFont}
                          onChange={(e) => setConsoleFont(e.target.value)}
                          style={{
                            flex: 1,
                            padding: '6px 10px',
                            background: '#191b20',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: '#fff',
                            borderRadius: '4px'
                          }}
                        >
                          <option value="Noto Sans Mono">Noto Sans Mono</option>
                          <option value="Consolas">Consolas</option>
                          <option value="Monaco">Monaco</option>
                          <option value="Courier New">Courier New</option>
                        </select>

                        <select
                          value={fontSize}
                          onChange={(e) => setFontSize(Number(e.target.value))}
                          style={{
                            width: '60px',
                            padding: '6px 10px',
                            background: '#191b20',
                            border: '1px solid rgba(255,255,255,0.15)',
                            color: '#fff',
                            borderRadius: '4px'
                          }}
                        >
                          <option value="10">10</option>
                          <option value="11">11</option>
                          <option value="12">12</option>
                          <option value="14">14</option>
                        </select>
                      </div>

                      {/* Console font preview box matching Screenshot 2 */}
                      <div
                        style={{
                          background: '#191b20',
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '4px',
                          padding: '10px',
                          fontFamily: 'Noto Sans Mono, Consolas, monospace',
                          fontSize: `${fontSize}px`,
                          lineHeight: '1.5'
                        }}
                      >
                        <div style={{ color: '#ff6b6b' }}>[Something/ERROR] A spooky error!</div>
                        <div style={{ color: '#e0e0e0' }}>[Test/INFO] A harmless message...</div>
                        <div style={{ color: '#fca5a5' }}>[Something/WARN] A not so spooky warning.</div>
                      </div>
                    </fieldset>
                  </div>
                )}

                {launcherSubtab === 'features' && (
                  <div style={{ fontSize: '13px', color: '#888' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', color: '#eee' }}>
                      <input
                        type="checkbox"
                        checked={settings.closeLauncherOnGameStart || false}
                        onChange={(e) => setSettings({ ...settings, closeLauncherOnGameStart: e.target.checked })}
                      />
                      Close launcher when game launches
                    </label>
                  </div>
                )}
              </>
            )}

            {/* Java Category View */}
            {activeCategory === 'java' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <fieldset style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '12px 16px' }}>
                  <legend style={{ fontSize: '12px', color: '#aaa', padding: '0 6px' }}>Java Executable</legend>
                  <select
                    value={settings.javaPath}
                    onChange={(e) => setSettings({ ...settings, javaPath: e.target.value })}
                    style={{ width: '100%', padding: '8px', background: '#191b20', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '4px' }}
                  >
                    <option value="">Auto Detect (Java 17 runtime)</option>
                    {detectedJavas.map((j) => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                </fieldset>

                <fieldset style={{ border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', padding: '12px 16px' }}>
                  <legend style={{ fontSize: '12px', color: '#aaa', padding: '0 6px' }}>Memory (Max RAM)</legend>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                    <span>Allocated RAM:</span>
                    <span style={{ color: '#3b82f6', fontWeight: 'bold' }}>{settings.memoryMax} MB</span>
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
                  <legend style={{ fontSize: '12px', color: '#aaa', padding: '0 6px' }}>JVM Arguments</legend>
                  <input
                    type="text"
                    placeholder="-XX:+UseG1GC"
                    value={settings.customJvmArgs || ''}
                    onChange={(e) => setSettings({ ...settings, customJvmArgs: e.target.value })}
                    style={{ width: '100%', padding: '8px', background: '#191b20', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', borderRadius: '4px' }}
                  />
                </fieldset>
              </div>
            )}

            {/* Fallback for other categories */}
            {activeCategory !== 'launcher' && activeCategory !== 'java' && (
              <div style={{ fontSize: '13px', color: '#888', marginTop: '20px' }}>
                Prism Launcher category Settings configuration.
              </div>
            )}
          </div>
        </div>

        {/* Bottom Window Actions matching Prism Launcher Screenshot 2 */}
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
            ? Help
          </button>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={handleSave}
              style={{
                padding: '5px 16px',
                background: '#313642',
                border: '1px solid rgba(255,255,255,0.2)',
                color: '#fff',
                borderRadius: '4px',
                fontSize: '12px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              {saving ? 'Saving...' : '✕ Close'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
