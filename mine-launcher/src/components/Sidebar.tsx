import React, { useState, useEffect } from 'react'
import { Account } from '../types'
import { errorMessage } from '../utils/errors'
import { cropSkinHead, onSkinUpdated } from '../utils/skins'
import appIcon from '../assets/icon.png'

export type NavSection = 'builds' | 'mods' | 'profile' | 'logs'

interface SidebarProps {
  accounts: Account[]
  activeSection: NavSection
  hasSelectedInstance: boolean
  hasActiveUsername: boolean
  onSelectAccount: (id: string) => void
  onAddAccount: (username: string) => Promise<void>
  onDeleteAccount: (id: string) => void
  onNavigate: (section: NavSection) => void
  onOpenSettings: () => void
}

const NavItems: Array<{ id: NavSection; label: string; icon: React.FC; needsInstance?: boolean; needsAccount?: boolean }> = [
  {
    id: 'builds',
    label: 'Сборки',
    icon: () => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinejoin="round">
        <path d="m7.298 9.999l-2.947 1.558a.5.5 0 0 0 0 .884l7.182 3.796a1 1 0 0 0 .934 0l7.182-3.796a.5.5 0 0 0 0-.884l-2.948-1.558m-9.403 4l-2.947 1.558a.5.5 0 0 0 0 .884l7.182 3.796a1 1 0 0 0 .934 0l7.182-3.796a.5.5 0 0 0 0-.884l-2.948-1.558M4.352 8.44l7.182 3.796a1 1 0 0 0 .934 0L19.65 8.44a.5.5 0 0 0 0-.884L12.467 3.76a1 1 0 0 0-.934 0L4.35 7.557a.5.5 0 0 0 0 .884Z" />
      </svg>
    )
  },
  {
    id: 'mods',
    label: 'Моды',
    needsInstance: true,
    icon: () => (
      <svg width="15" height="15" viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="m4.83 13.661l17.6 10.161v20.196L4.83 33.857z" />
        <path d="m22.43 3.5l17.599 10.161l-17.6 10.161l-17.6-10.16zm7.517 36.177l-7.518 4.34V23.823h0l17.6-10.16v18.382" />
      </svg>
    )
  },
  {
    id: 'profile',
    label: 'Профиль',
    needsAccount: true,
    icon: () => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" strokeLinecap="round" />
      </svg>
    )
  },
  {
    id: 'logs',
    label: 'Логи',
    icon: () => (
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 12h.01M4 6h.01M4 18h.01M8 18h2m-2-6h2M8 6h2m4 0h6m-6 6h6m-6 6h6" />
      </svg>
    )
  }
]

export const Sidebar: React.FC<SidebarProps> = ({
  accounts,
  activeSection,
  hasSelectedInstance,
  hasActiveUsername,
  onSelectAccount,
  onAddAccount,
  onDeleteAccount,
  onNavigate,
  onOpenSettings
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const [input, setInput] = useState('')
  const [inputError, setInputError] = useState('')
  const [heads, setHeads] = useState<Record<string, string>>({})

  useEffect(() => {
    let cancelled = false

    const loadHeads = async () => {
      const next: Record<string, string> = {}
      await Promise.all(accounts.map(async (acc) => {
        const fallback = `https://mc-heads.net/avatar/${encodeURIComponent(acc.username)}/32`
        try {
          const skin = window.electronAPI ? await window.electronAPI.getUserSkin(acc.username) : null
          next[acc.id] = skin ? await cropSkinHead(skin) : fallback
        } catch {
          next[acc.id] = fallback
        }
      }))
      if (!cancelled) setHeads(next)
    }

    loadHeads()
    const unsubscribe = onSkinUpdated(loadHeads)
    return () => {
      cancelled = true
      unsubscribe()
    }
  }, [accounts])

  const formatNickname = (val: string): string => {
    const cleaned = val.replace(/[^a-zA-Z0-9_]/g, '')
    return cleaned ? cleaned.charAt(0).toUpperCase() + cleaned.slice(1) : ''
  }

  const commit = async () => {
    const trimmed = input.trim()
    if (trimmed.length < 3) {
      setInputError('Минимум 3 символа')
      return
    }
    setInputError('')
    try {
      await onAddAccount(trimmed)
      setInput('')
      setIsAdding(false)
    } catch (err) {
      setInputError(errorMessage(err, 'Ошибка'))
    }
  }

  return (
    <aside className="sidebar">
      <div className="side-brand">
        <div className="side-brand-mark" aria-hidden="true">
          <img src={appIcon} alt="" width={20} height={20} />
        </div>
        <div>
          <div className="side-brand-name">Mine Launcher</div>
          <div className="side-brand-sub">2.0.0</div>
        </div>
      </div>

      <nav className="side-nav" aria-label="Разделы">
        {NavItems.map((item) => {
          const disabled = (item.needsInstance && !hasSelectedInstance) || (item.needsAccount && !hasActiveUsername)
          return (
            <button
              key={item.id}
              className={`side-nav-item ${activeSection === item.id ? 'active' : ''}`}
              aria-disabled={disabled || undefined}
              onClick={() => {
                if (disabled) return
                onNavigate(item.id)
              }}
              title={disabled ? 'Сначала создайте сборку или добавьте аккаунт' : item.label}
            >
              <item.icon />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      <div className="side-block-header">Аккаунты</div>
      <div className="accounts-list">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className={`account-item ${acc.isActive ? 'active' : ''}`}
            onClick={() => onSelectAccount(acc.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelectAccount(acc.id) } }}
          >
            <img
              className="account-avatar"
              src={heads[acc.id] || `https://mc-heads.net/avatar/${encodeURIComponent(acc.username)}/32`}
              alt=""
              onError={(e) => { (e.target as HTMLImageElement).style.visibility = 'hidden' }}
            />
            <span className="account-name">{acc.username}</span>
            <button
              className="account-delete"
              title="Удалить аккаунт"
              aria-label={`Удалить аккаунт ${acc.username}`}
              onClick={(e) => { e.stopPropagation(); onDeleteAccount(acc.id) }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 6h16M6 6v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6M9 3h6v3H9z" />
              </svg>
            </button>
          </div>
        ))}

        {isAdding && (
          <div className="account-add-wrap">
            <input
              className="account-input"
              autoFocus
              placeholder="Никнейм..."
              value={input}
              maxLength={16}
              onChange={(e) => setInput(formatNickname(e.target.value))}
              onKeyDown={(e) => {
                if (e.key === 'Enter') commit()
                if (e.key === 'Escape') { setIsAdding(false); setInput('') }
              }}
            />
            {inputError && <div className="form-error compact">{inputError}</div>}
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        {isAdding ? (
          <button className="btn full-width" onClick={commit}>
            Добавить
          </button>
        ) : (
          <button className="btn-add-account" onClick={() => setIsAdding(true)}>
            + Добавить аккаунт
          </button>
        )}
        <button className="side-action" onClick={onOpenSettings}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
            <path d="M4 7h16M4 17h16" />
            <circle cx="9" cy="7" r="2.2" fill="var(--bg-elevated)" />
            <circle cx="15" cy="17" r="2.2" fill="var(--bg-elevated)" />
          </svg>
          <span>Настройки</span>
        </button>
      </div>
    </aside>
  )
}
