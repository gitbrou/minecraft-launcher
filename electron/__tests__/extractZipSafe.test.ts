import { describe, it, expect, vi, beforeEach } from 'vitest'
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import AdmZip from 'adm-zip'

vi.mock('electron', () => ({
  app: { getPath: vi.fn(() => 'C:\\Users\\test\\AppData\\Roaming\\mine-launcher') }
}))

import { extractZipSafe } from '../launcherEngine'

let workDir: string

beforeEach(() => {
  workDir = fs.mkdtempSync(path.join(os.tmpdir(), 'ml-extract-'))
})

function writeZip(build: (zip: AdmZip) => void): string {
  const zip = new AdmZip()
  build(zip)
  const p = path.join(workDir, 'archive.zip')
  fs.writeFileSync(p, zip.toBuffer())
  return p
}

describe('extractZipSafe', () => {
  it('Распаковывает вложенные файлы, создавая каталоги', () => {
    const zipPath = writeZip((zip) => {
      zip.addFile('runtime/bin/java.exe', Buffer.from('bin'))
      zip.addFile('runtime/release', Buffer.from('JAVA_VERSION="21"'))
    })
    const dest = path.join(workDir, 'out')
    const count = extractZipSafe(zipPath, dest)

    expect(count).toBe(2)
    expect(fs.readFileSync(path.join(dest, 'runtime', 'bin', 'java.exe'), 'utf-8')).toBe('bin')
    expect(fs.existsSync(path.join(dest, 'runtime', 'release'))).toBe(true)
  })

  it('filter пропускает только нужные записи', () => {
    const zipPath = writeZip((zip) => {
      zip.addFile('a/keep.txt', Buffer.from('1'))
      zip.addFile('a/skip.bin', Buffer.from('2'))
    })
    const dest = path.join(workDir, 'out')
    extractZipSafe(zipPath, dest, (name) => name.endsWith('.txt'))

    expect(fs.existsSync(path.join(dest, 'a', 'keep.txt'))).toBe(true)
    expect(fs.existsSync(path.join(dest, 'a', 'skip.bin'))).toBe(false)
  })

  it('Отклоняет symlink-записи (CVE-класс extract-zip)', () => {
    const zipPath = writeZip((zip) => {
      zip.addFile('safe.txt', Buffer.from('x'))
      zip.addFile('link', Buffer.from('/etc/passwd'))
      const link = zip.getEntry('link')!
      link.header.attr = (0o120777 << 16) >>> 0
    })
    const dest = path.join(workDir, 'out')
    expect(() => extractZipSafe(zipPath, dest)).toThrow(/symlink/i)
  })

  it('Отклоняет path traversal, не записывая файл наружу', () => {
    const zipPath = writeZip((zip) => {
      zip.addFile('../evil.txt', Buffer.from('evil'))
    })
    const dest = path.join(workDir, 'out')
    const outside = path.join(workDir, 'evil.txt')

    let threw = false
    try {
      extractZipSafe(zipPath, dest)
    } catch {
      threw = true
    }
    // adm-zip может нормализовать имя при записи; главное — файл не оказался снаружи
    expect(threw || !fs.existsSync(outside)).toBe(true)
    expect(fs.existsSync(outside)).toBe(false)
  })

  it('Отклоняет абсолютные пути', () => {
    const zipPath = writeZip((zip) => {
      zip.addFile('C:\\Windows\\evil.txt', Buffer.from('evil'))
    })
    expect(() => extractZipSafe(zipPath, path.join(workDir, 'out'))).toThrow()
  })
})
