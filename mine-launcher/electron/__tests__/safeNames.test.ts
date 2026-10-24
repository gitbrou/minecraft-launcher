import { describe, it, expect } from 'vitest'
import { safeInstId, safeFilename } from '../safeNames'

describe('safeFilename', () => {
  it('Принимает реальные имена модов с +, пробелами и точками', () => {
    expect(safeFilename('fabric-api-0.92.2+1.20.1.jar')).toBe('fabric-api-0.92.2+1.20.1.jar')
    expect(safeFilename('jei 15.2.0.27.jar.disabled')).toBe('jei 15.2.0.27.jar.disabled')
    expect(safeFilename('Мод-на-русском.jar')).toBe('Мод-на-русском.jar')
  })

  it('Отклоняет traversal и разделители путей', () => {
    expect(() => safeFilename('../evil.jar')).toThrow()
    expect(() => safeFilename('..')).toThrow()
    expect(() => safeFilename('a/b.jar')).toThrow()
    expect(() => safeFilename('a\\b.jar')).toThrow()
  })

  it('Отклоняет абсолютные пути и спецсимволы Windows', () => {
    expect(() => safeFilename('C:/evil.jar')).toThrow()
    expect(() => safeFilename('a:b.jar')).toThrow()
    expect(() => safeFilename('a*b.jar')).toThrow()
    expect(() => safeFilename('a|b.jar')).toThrow()
  })

  it('Отклоняет пустое имя и управляющие символы', () => {
    expect(() => safeFilename('')).toThrow()
    expect(() => safeFilename('a\u0000b.jar')).toThrow()
  })
})

describe('safeInstId', () => {
  it('Принимает id, которые генерирует лаунчер', () => {
    expect(safeInstId('inst-m1abc2def')).toBe('inst-m1abc2def')
    expect(safeInstId('default-1122')).toBe('default-1122')
  })

  it('Отклоняет traversal и мусор', () => {
    expect(() => safeInstId('../x')).toThrow()
    expect(() => safeInstId('a/b')).toThrow()
    expect(() => safeInstId('')).toThrow()
  })
})
