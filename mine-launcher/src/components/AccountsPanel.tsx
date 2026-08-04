import React, { useState } from 'react'
import { Account } from '../types'

interface AccountsPanelProps {
  accounts: Account[]
  onSelectAccount: (id: string) => void
  onAddAccount: (username: string) => void
  onDeleteAccount: (id: string) => void
}

export const AccountsPanel: React.FC<AccountsPanelProps> = ({
  accounts,
  onSelectAccount,
  onAddAccount,
  onDeleteAccount
}) => {
  const [showAddModal, setShowAddModal] = useState(false)
  const [newUsername, setNewUsername] = useState('')

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newUsername.trim()) {
      onAddAccount(newUsername.trim())
      setNewUsername('')
      setShowAddModal(false)
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
                title="Удалить аккаунт"
                onClick={(e) => {
                  e.stopPropagation()
                  onDeleteAccount(acc.id)
                }}
              >
                ✕
              </button>
            )}
          </div>
        ))}
      </div>

      <button className="add-account-btn" onClick={() => setShowAddModal(true)}>
        <span>+ Добавить ник</span>
      </button>

      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-card" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Добавить пиратский аккаунт</h3>
            <form onSubmit={handleAddSubmit}>
              <div className="form-group">
                <label>Имя пользователя (Никнейм):</label>
                <input
                  type="text"
                  autoFocus
                  placeholder="Например: Steve"
                  value={newUsername}
                  onChange={(e) => setNewUsername(e.target.value)}
                />
              </div>
              <div className="modal-actions">
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setShowAddModal(false)}
                >
                  Отмена
                </button>
                <button type="submit" className="btn-primary">
                  Добавить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </aside>
  )
}
