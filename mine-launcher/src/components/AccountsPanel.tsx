import React, { useState } from 'react'
import { Account } from '../types'

interface AccountsPanelProps {
  accounts: Account[]
  onSelectAccount: (id: string) => void
  onAddAccount: (username: string) => Promise<void>
  onDeleteAccount: (id: string) => void
}

const IconTrash = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16M6 6v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V6M9 3h6v3H9z" />
  </svg>
)

export const AccountsPanel: React.FC<AccountsPanelProps> = ({
  accounts,
  onSelectAccount,
  onAddAccount,
  onDeleteAccount
}) => {
  const [isAdding, setIsAdding] = useState(false)
  const [input, setInput] = useState('')
  const [inputError, setInputError] = useState('')

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
    } catch (err: any) {
      setInputError(err?.message || 'Ошибка')
    }
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">Аккаунты</div>

      <div className="accounts-list">
        {accounts.map((acc) => (
          <div
            key={acc.id}
            className={`account-item ${acc.isActive ? 'active' : ''}`}
            onClick={() => onSelectAccount(acc.id)}
          >
            <img
              className="account-avatar"
              src={`https://mc-heads.net/avatar/${acc.username}/32`}
              alt={acc.username}
              onError={(e) => { (e.target as HTMLImageElement).style.visibility = 'hidden' }}
            />
            <span className="account-name">{acc.username}</span>
            <button
              className="account-delete"
              title="Удалить аккаунт"
              onClick={(e) => {
                e.stopPropagation()
                onDeleteAccount(acc.id)
              }}
            >
              <IconTrash />
            </button>
          </div>
        ))}

        {isAdding && (
          <div style={{ padding: '6px' }}>
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
            {inputError && <div className="form-error" style={{ marginTop: '4px' }}>{inputError}</div>}
          </div>
        )}
      </div>

      <div className="sidebar-footer">
        {isAdding ? (
          <button className="btn" style={{ width: '100%' }} onClick={commit}>
            Добавить
          </button>
        ) : (
          <button className="btn-add-account" onClick={() => setIsAdding(true)}>
            + Добавить аккаунт
          </button>
        )}
      </div>
    </aside>
  )
}
