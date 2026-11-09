import { describe, it, expect } from 'vitest'
import { horizonFits, pickEngine } from './engine'

describe('horizonFits', () => {
  it('Без выбранной сборки Horizon доступен', () => {
    expect(horizonFits(null)).toBe(true)
    expect(horizonFits(undefined)).toBe(true)
  })

  it('Только 26.3 на ванилле', () => {
    expect(horizonFits({ version: '26.3', loader: 'vanilla' })).toBe(true)
    expect(horizonFits({ version: '26.3' })).toBe(true)
    expect(horizonFits({ version: '26.3', loader: 'fabric' })).toBe(false)
    expect(horizonFits({ version: '1.12.2', loader: 'vanilla' })).toBe(false)
    expect(horizonFits({ version: '1.20.4', loader: 'vanilla' })).toBe(false)
  })
})

describe('pickEngine', () => {
  it('Движок Java всегда остаётся Java', () => {
    expect(pickEngine('java', null)).toBe('java')
    expect(pickEngine('java', { version: '26.3', loader: 'vanilla' })).toBe('java')
  })

  it('Horizon без сборки или с 26.3 vanilla', () => {
    expect(pickEngine('horizon', null)).toBe('horizon')
    expect(pickEngine('horizon', { version: '26.3', loader: 'vanilla' })).toBe('horizon')
  })

  it('Выбранную сборку не подменяем чужой игрой', () => {
    expect(pickEngine('horizon', { version: '1.12.2', loader: 'vanilla' })).toBe('java')
    expect(pickEngine('horizon', { version: '1.20.4', loader: 'vanilla' })).toBe('java')
    expect(pickEngine('horizon', { version: '26.3', loader: 'fabric' })).toBe('java')
  })
})
