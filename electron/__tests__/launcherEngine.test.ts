import { describe, it, expect, vi } from 'vitest'

vi.mock('electron', () => ({
  app: { getPath: vi.fn(() => 'C:\\Users\\test\\AppData\\Roaming\\mine-launcher') }
}))

import {
  requiredJavaMajor,
  generateOfflineUUID,
  isSafeRelPath,
  isLibraryAllowed,
  buildCrashHint
} from '../launcherEngine'

// ───────────────────────── requiredJavaMajor ─────────────────────────
describe('requiredJavaMajor', () => {
  it('Java 8: релизы до 1.16.5 включительно', () => {
    expect(requiredJavaMajor('1.16.5')).toBe(8)
    expect(requiredJavaMajor('1.12.2')).toBe(8)
    expect(requiredJavaMajor('1.8.9')).toBe(8)
  })

  it('Java 17: с 1.17 по 1.20.4', () => {
    expect(requiredJavaMajor('1.17')).toBe(17)
    expect(requiredJavaMajor('1.18.2')).toBe(17)
    expect(requiredJavaMajor('1.20.4')).toBe(17)
  })

  it('Java 21: с 1.20.5+, границы диапазона', () => {
    expect(requiredJavaMajor('1.20.5')).toBe(21)
    expect(requiredJavaMajor('1.21')).toBe(21)
    expect(requiredJavaMajor('1.21.4')).toBe(21)
  })

  it('Суффиксы (pre/snapshot) отбрасываются корректно', () => {
    expect(requiredJavaMajor('1.20.5-pre1')).toBe(21)
    expect(requiredJavaMajor('1.20.1-pre2')).toBe(17)
    expect(requiredJavaMajor('1.16.5-pre2')).toBe(8)
  })

  it('Минорная версия «1.20» без патча → Java 17 (граница до .5)', () => {
    expect(requiredJavaMajor('1.20')).toBe(17)
  })
})

// ───────────────────────── generateOfflineUUID ───────────────────────
describe('generateOfflineUUID', () => {
  it('Эталонные UUID по MD5 OfflinePlayer:{name} (v3, variant RFC4122)', () => {
    expect(generateOfflineUUID('Notch')).toBe('b50ad385-829d-3141-a216-7e7d7539ba7f')
    expect(generateOfflineUUID('Herobrine')).toBe('25966168-dc9c-360c-8f32-ed022bfa1070')
  })

  it('Детерминированный и зависящий от регистра ника', () => {
    expect(generateOfflineUUID('notch')).not.toBe(generateOfflineUUID('Notch'))
    expect(generateOfflineUUID('Notch')).toBe(generateOfflineUUID('Notch'))
  })

  it('Формат 8-4-4-4-12 hex', () => {
    expect(generateOfflineUUID('player')).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-3[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/)
  })
})

// ───────────────────────── isSafeRelPath (безопасность) ───────────────
describe('isSafeRelPath', () => {
  it('Обычные относительные пути разрешены', () => {
    expect(isSafeRelPath('com/mojang/datafixers.jar')).toBe(true)
    expect(isSafeRelPath('libs/lwjgl-natives.dll')).toBe(true)
  })

  it('Path traversal запрещён', () => {
    expect(isSafeRelPath('../evil.dll')).toBe(false)
    expect(isSafeRelPath('a/b/../../../etc/passwd')).toBe(false)
  })

  it('Абсолютные пути запрещены', () => {
    expect(isSafeRelPath('C:\\Windows\\system32\\evil.dll')).toBe(false)
    expect(isSafeRelPath('/etc/passwd')).toBe(false)
  })
})

// ───────────────────────── isLibraryAllowed (правила Mojang) ─────────
describe('isLibraryAllowed', () => {
  it('Нет правил → разрешить всем', () => {
    expect(isLibraryAllowed(undefined, 'windows')).toBe(true)
    expect(isLibraryAllowed([], 'windows')).toBe(true)
  })

  it('Правило только для целой ОС → да', () => {
    expect(isLibraryAllowed([{ action: 'allow', os: { name: 'windows' } }], 'windows')).toBe(true)
    expect(isLibraryAllowed([{ action: 'allow', os: { name: 'windows' } }], 'linux')).toBe(false)
  })

  it('Последнее совпавшее правило выигрывает (deny после allow)', () => {
    expect(isLibraryAllowed([
      { action: 'allow' },
      { action: 'deny', os: { name: 'windows' } }
    ], 'windows')).toBe(false)
  })

  it('non-matching os-правило не переопределяет действие', () => {
    // deny для osx не относится к windows → остаётся allow
    expect(isLibraryAllowed([
      { action: 'allow' },
      { action: 'deny', os: { name: 'osx' } }
    ], 'windows')).toBe(true)
  })
})

// ───────────────────────── buildCrashHint ────────────────────────────
describe('buildCrashHint', () => {
  const hint = (lines: string[]) => buildCrashHint(lines)

  it('OOM → подсказка про память', () => {
    const r = hint(['java.lang.OutOfMemoryError: Java heap space'])
    expect(r).toContain('памяти')
  })

  it('Unsupported class file → подсказка про версию Java', () => {
    const r = hint(['Unsupported class file major version 65'])
    expect(r).toContain('Java')
  })

  it('0xC0000135 → подсказка про VC++ Redistributable', () => {
    const r = hint(['exit code -1073741515'])
    expect(r).toContain('Visual C++')
  })

  it('UnsatisfiedLinkError → подсказка про natives', () => {
    const r = hint(['java.lang.UnsatisfiedLinkError: liblwjgl.so'])
    expect(r).toContain('LWJGL')
  })

  it('Спокойный лог без паттернов → нейтральная подсказка про логи', () => {
    const r = hint(['[Render thread/INFO]: Loading for game 1.21.4'])
    expect(r).toContain('Логи')
  })

  it('Пустой лог не падает', () => {
    expect(() => hint([])).not.toThrow()
  })
})
