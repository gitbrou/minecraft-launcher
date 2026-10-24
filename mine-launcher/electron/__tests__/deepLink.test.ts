import { describe, it, expect } from 'vitest'
import { parseImportDeepLink, findDeepLink } from '../deepLink'

const packUrl = 'https://example.com/packs/survival.zip'

describe('parseImportDeepLink', () => {
  it('Принимает валидную ссылку с https-целью', () => {
    const link = parseImportDeepLink(`minelauncher://import?url=${encodeURIComponent(packUrl)}`)
    expect(link).toEqual({ url: packUrl })
  })

  it('Понимает вариант с тремя слэшами', () => {
    const link = parseImportDeepLink(`minelauncher:///import?url=${encodeURIComponent(packUrl)}`)
    expect(link?.url).toBe(packUrl)
  })

  it('Отклоняет http (только https)', () => {
    expect(parseImportDeepLink('minelauncher://import?url=http%3A%2F%2Fexample.com%2Fa.zip')).toBeNull()
  })

  it('Отклоняет чужую схему и другое действие', () => {
    expect(parseImportDeepLink('https://example.com/?url=https%3A%2F%2Fx%2Fa.zip')).toBeNull()
    expect(parseImportDeepLink('minelauncher://open?url=https%3A%2F%2Fexample.com%2Fa.zip')).toBeNull()
  })

  it('Отклоняет javascript/data/file цели', () => {
    expect(parseImportDeepLink('minelauncher://import?url=javascript%3Aalert(1)')).toBeNull()
    expect(parseImportDeepLink('minelauncher://import?url=file%3A%2F%2F%2Fetc%2Fpasswd')).toBeNull()
    expect(parseImportDeepLink('minelauncher://import?url=data%3Atext%2Fplain%2Cx')).toBeNull()
  })

  it('Отклоняет URL с логином/паролем', () => {
    expect(parseImportDeepLink('minelauncher://import?url=https%3A%2F%2Fuser%3Apass%40example.com%2Fa.zip')).toBeNull()
  })

  it('Отклоняет отсутствующую и слишком длинную цель', () => {
    expect(parseImportDeepLink('minelauncher://import')).toBeNull()
    const huge = 'https://example.com/' + 'a'.repeat(3000) + '.zip'
    expect(parseImportDeepLink(`minelauncher://import?url=${encodeURIComponent(huge)}`)).toBeNull()
  })

  it('Отклоняет мусор вместо URL', () => {
    expect(parseImportDeepLink('minelauncher://import?url=%%%')).toBeNull()
    expect(parseImportDeepLink('not a url')).toBeNull()
  })
})

describe('findDeepLink', () => {
  it('Находит ссылку среди аргументов процесса', () => {
    const argv = ['C:\\app\\Mine Launcher.exe', `minelauncher://import?url=${encodeURIComponent(packUrl)}`]
    expect(findDeepLink(argv)?.url).toBe(packUrl)
  })

  it('Возвращает null, если ссылки нет или она невалидна', () => {
    expect(findDeepLink(['app.exe', '--flag'])).toBeNull()
    expect(findDeepLink(['app.exe', 'minelauncher://import?url=http%3A%2F%2Fevil'])).toBeNull()
  })
})
