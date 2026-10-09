import React, { useState, useRef } from 'react'
import { Account } from '../types'

interface AccountsPanelProps {
  accounts: Account[]
  onSelectAccount: (id: string) => void
  onAddAccount: (username: string) => void
  onDeleteAccount: (id: string) => void
}

const IconDeletePixel = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M6 7h2v2H6zm14 0h2v10h-2zM8 5h12v2H8zM4 9h2v2H4zm-2 2h2v2H2zm2 2h2v2H4zm2 2h2v2H6zm2 2h12v2H8zm6-6h2v2h-2zm2 2h2v2h-2zm0-4h2v2h-2zm-4 4h2v2h-2zm0-4h2v2h-2z" />
  </svg>
)

export const AccountsPanel: React.FC<AccountsPanelProps> = ({
  accounts,
  onSelectAccount,
  onAddAccount,
  onDeleteAccount
}) => {
  const [isAddingInline, setIsAddingInline] = useState(false)
  const [inlineInputText, setInlineInputText] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  // Minecraft Username Auto-Formatting: Capitalize 1st letter + Alphanumeric_
  const formatNickname = (val: string): string => {
    const cleaned = val.replace(/[^a-zA-Z0-9_]/g, '')
    if (!cleaned) return ''
    return cleaned.charAt(0).toUpperCase() + cleaned.slice(1)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInlineInputText(formatNickname(e.target.value))
  }

  const commitInlineAccount = async () => {
    const trimmed = inlineInputText.trim()
    if (trimmed.length >= 2) {
      const existing = accounts.find(a => a.username.toLowerCase() === trimmed.toLowerCase())
      if (existing) {
        onSelectAccount(existing.id)
      } else {
        try {
          await onAddAccount(trimmed)
        } catch {
          // ignore duplicate catch
        }
      }
    }
    setInlineInputText('')
    setIsAddingInline(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      commitInlineAccount()
    } else if (e.key === 'Escape') {
      setInlineInputText('')
      setIsAddingInline(false)
    }
  }

  return (
    <aside className="accounts-panel">
      <h2 className="accounts-header">Аккаунты</h2>

      <div className="accounts-list">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className={`account-item ${acc.isActive ? 'active' : ''}`}
            onClick={() => onSelectAccount(acc.id)}
          >
            <div className="radio-circle">
              <div className="radio-circle-inner" />
            </div>
            <span className="account-name">{acc.username}</span>

            {accounts.length > 1 && (
              <button
                className="account-delete-btn"
                title="Удалить ник"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteAccount(acc.id)
                }}
              >
                <IconDeletePixel />
              </button>
            )}
          </div>
        ))}

        {/* Inline input for adding nickname directly without popup modal */}
        {isAddingInline && (
          <div className="account-item active" style={{ padding: '6px 10px' }}>
            <div className="radio-circle">
              <div className="radio-circle-inner" />
            </div>
            <input
              ref={inputRef}
              type="text"
              autoFocus
              placeholder="Никнейм..."
              value={inlineInputText}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              onBlur={commitInlineAccount}
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#ffffff',
                fontSize: '18px',
                fontFamily: 'inherit',
                width: '100%'
              }}
            />
          </div>
        )}
      </div>

      {!isAddingInline && (
        <button
          className="add-account-btn"
          onClick={() => {
            setIsAddingInline(true)
            setInlineInputText('')
          }}
        >
          <span>+ Добавить ник</span>
        </button>
      )}
    </aside>
  )
}
