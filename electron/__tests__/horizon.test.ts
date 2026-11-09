import { describe, expect, it } from 'vitest'
import { parseLauncherVersion, parseSha256Sums, parseSignInMessage, pickHorizonAsset } from '../horizon'

const ASSETS = [
  'horizon-launcher-windows-x64.zip',
  'horizon-launcher-windows-arm64.zip',
  'horizon-launcher-macos-arm64.zip',
  'horizon-launcher-macos-x64.zip',
  'horizon-launcher-linux-x86_64.tar.gz',
  'horizon-launcher-linux-x86_64.AppImage',
  'horizon-launcher-windows-x64-setup.exe',
  'SHA256SUMS',
  'SHA256SUMS.sig'
]

describe('pickHorizonAsset', () => {
  it('выбирает windows x64', () => {
    expect(pickHorizonAsset(ASSETS, 'win32', 'x64')).toBe('horizon-launcher-windows-x64.zip')
  })

  it('выбирает windows arm64', () => {
    expect(pickHorizonAsset(ASSETS, 'win32', 'arm64')).toBe('horizon-launcher-windows-arm64.zip')
  })

  it('выбирает macos под обе архитектуры', () => {
    expect(pickHorizonAsset(ASSETS, 'darwin', 'arm64')).toBe('horizon-launcher-macos-arm64.zip')
    expect(pickHorizonAsset(ASSETS, 'darwin', 'x64')).toBe('horizon-launcher-macos-x64.zip')
  })

  it('на linux берёт tar.gz, а не AppImage', () => {
    expect(pickHorizonAsset(ASSETS, 'linux', 'x64')).toBe('horizon-launcher-linux-x86_64.tar.gz')
  })

  it('возвращает null, если сборки нет', () => {
    expect(pickHorizonAsset(ASSETS, 'linux', 'arm64')).toBeNull()
    expect(pickHorizonAsset(['SHA256SUMS'], 'win32', 'x64')).toBeNull()
  })
})

describe('parseSha256Sums', () => {
  const text = [
    '021b17390b2140f4d6b9d1b0c8f1ec2a3b4c5d6e7f8091a2b3c4d5e6f7081920  horizon-launcher-windows-x64.zip',
    'aa'.repeat(32) + ' *./horizon-launcher-linux-x86_64.tar.gz',
    'мусор',
    ''
  ].join('\n')

  it('читает хеши и срезает звёздочку с путём', () => {
    const sums = parseSha256Sums(text)
    expect(sums.get('horizon-launcher-windows-x64.zip')).toBe('021b17390b2140f4d6b9d1b0c8f1ec2a3b4c5d6e7f8091a2b3c4d5e6f7081920')
    expect(sums.get('horizon-launcher-linux-x86_64.tar.gz')).toBe('aa'.repeat(32))
    expect(sums.size).toBe(2)
  })

  it('пропускает строки без нормального хеша', () => {
    expect(parseSha256Sums('abc  file.zip').size).toBe(0)
  })
})

describe('parseSignInMessage', () => {
  it('вытаскивает ссылку и код', () => {
    const line = 'To sign in, open https://microsoft.com/link in a browser and enter the code ABCD-1234'
    expect(parseSignInMessage(line)).toEqual({
      url: 'https://microsoft.com/link',
      code: 'ABCD-1234'
    })
  })

  it('терпит перевод строки между словами', () => {
    const text = 'To sign in, open https://example.dev/device\nin a browser and enter the code WXYZ9'
    expect(parseSignInMessage(text)?.code).toBe('WXYZ9')
  })

  it('возвращает null на обычный лог', () => {
    expect(parseSignInMessage('Signed in as Steve.')).toBeNull()
  })
})

describe('parseLauncherVersion', () => {
  it('берёт версию из вывода --version', () => {
    expect(parseLauncherVersion('horizon-launcher 0.2.55\n')).toBe('0.2.55')
    expect(parseLauncherVersion('нет версии')).toBe('')
  })
})
