import { describe, it, expect } from 'vitest'
import AdmZip from 'adm-zip'
import {
  buildInstanceMeta,
  validateArchiveEntries,
  parseExportedMeta,
  uniqueInstanceName
} from '../instancePack'

const entry = (entryName: string, size = 1024) => ({ entryName, size })

describe('validateArchiveEntries', () => {
  it('Принимает валидный архив и возвращает список модов', () => {
    const mods = validateArchiveEntries([
      entry('instance.json', 200),
      entry('mods/sodium.jar'),
      entry('mods/oldmod.jar.disabled')
    ])
    expect(mods).toEqual(['sodium.jar', 'oldmod.jar.disabled'])
  })

  it('Отклоняет zip-slip в моде', () => {
    expect(() => validateArchiveEntries([
      entry('instance.json'),
      entry('mods/../../evil.jar')
    ])).toThrow(/небезопасный путь/i)
  })

  it('Отклоняет zip-slip в корне', () => {
    expect(() => validateArchiveEntries([
      entry('instance.json'),
      entry('../evil.jar')
    ])).toThrow()
  })

  it('Отклоняет абсолютные пути (windows и unix)', () => {
    expect(() => validateArchiveEntries([
      entry('instance.json'),
      entry('C:/Windows/evil.jar')
    ])).toThrow(/абсолютный путь/i)
    expect(() => validateArchiveEntries([
      entry('instance.json'),
      entry('/etc/evil.jar')
    ])).toThrow(/абсолютный путь/i)
  })

  it('Отклоняет файлы вне mods и instance.json', () => {
    expect(() => validateArchiveEntries([
      entry('instance.json'),
      entry('mods/a.jar'),
      entry('saves/world/level.dat')
    ])).toThrow(/Неожиданный файл/i)
  })

  it('Отклоняет вложенность и не-jar в mods', () => {
    expect(() => validateArchiveEntries([
      entry('instance.json'),
      entry('mods/sub/a.jar')
    ])).toThrow()
    expect(() => validateArchiveEntries([
      entry('instance.json'),
      entry('mods/readme.txt')
    ])).toThrow(/только \.jar/i)
  })

  it('Отклоняет архив без instance.json', () => {
    expect(() => validateArchiveEntries([entry('mods/a.jar')]))
      .toThrow(/instance\.json/)
  })

  it('Отклоняет пустой набор модов', () => {
    expect(() => validateArchiveEntries([entry('instance.json')]))
      .toThrow(/нет модов/i)
  })

  it('Отклоняет слишком большой файл мода', () => {
    expect(() => validateArchiveEntries([
      entry('instance.json'),
      entry('mods/huge.jar', 65 * 1024 * 1024)
    ])).toThrow(/слишком большой/i)
  })

  it('Отклоняет суммарный перебор размера', () => {
    const mods = Array.from({ length: 9 }, (_, i) => entry(`mods/m${i}.jar`, 63 * 1024 * 1024))
    expect(() => validateArchiveEntries([entry('instance.json'), ...mods]))
      .toThrow(/Архив слишком большой/i)
  })

  it('Допускает обратные слэши в путях архива', () => {
    const mods = validateArchiveEntries([
      entry('instance.json'),
      entry('mods\\sodium.jar')
    ])
    expect(mods).toEqual(['sodium.jar'])
  })
})

describe('parseExportedMeta', () => {
  const valid = { format: 1, name: 'Выживание', version: '1.20.1', loader: 'fabric', exportedAt: 1 }

  it('Принимает корректный манифест', () => {
    expect(parseExportedMeta(valid)).toMatchObject({ name: 'Выживание', version: '1.20.1', loader: 'fabric' })
  })

  it('Отклоняет чужой формат', () => {
    expect(() => parseExportedMeta({ ...valid, format: 2 })).toThrow(/формат/i)
  })

  it('Отклоняет неизвестный загрузчик (инъекция значения)', () => {
    expect(() => parseExportedMeta({ ...valid, loader: 'forge<script>' })).toThrow(/загрузчик/i)
  })

  it('Отклоняет мусорную версию', () => {
    expect(() => parseExportedMeta({ ...valid, version: '../../etc' })).toThrow(/версия/i)
  })

  it('Отклоняет пустое имя и не-объект', () => {
    expect(() => parseExportedMeta({ ...valid, name: '   ' })).toThrow(/названия/i)
    expect(() => parseExportedMeta(null)).toThrow()
    expect(() => parseExportedMeta('строка')).toThrow()
  })

  it('Обрезает слишком длинное имя до 60 символов', () => {
    const long = 'a'.repeat(120)
    expect(parseExportedMeta({ ...valid, name: long }).name.length).toBe(60)
  })
})

describe('uniqueInstanceName', () => {
  it('Свободное имя не меняется', () => {
    expect(uniqueInstanceName('Сборка', ['Другая'])).toBe('Сборка')
  })

  it('Конфликт → «(2)», затем «(3)»', () => {
    expect(uniqueInstanceName('Сборка', ['Сборка'])).toBe('Сборка (2)')
    expect(uniqueInstanceName('Сборка', ['Сборка', 'Сборка (2)'])).toBe('Сборка (3)')
  })

  it('Пустое имя получает дефолт', () => {
    expect(uniqueInstanceName('   ', [])).toBe('Импортированная сборка')
  })
})

describe('buildInstanceMeta', () => {
  it('Загрузчик вне whitelist схлопывается в vanilla', () => {
    expect(buildInstanceMeta({ name: 'x', version: '1.20.1', loader: 'forge' }).loader).toBe('vanilla')
  })

  it('Валидный загрузчик сохраняется', () => {
    expect(buildInstanceMeta({ name: 'x', version: '1.20.1', loader: 'quilt' }).loader).toBe('quilt')
  })
})

describe('roundtrip архива', () => {
  it('Экспорт → валидация → распаковка сохраняет моды байт-в-байт', () => {
    const zip = new AdmZip()
    zip.addFile('instance.json', Buffer.from(JSON.stringify(
      buildInstanceMeta({ name: 'Тест', version: '1.20.1', loader: 'fabric' })
    ), 'utf-8'))
    const modBytes = Buffer.from([0x50, 0x4b, 0x03, 0x04, 1, 2, 3, 4])
    zip.addFile('mods/demo.jar', modBytes)
    zip.addFile('mods/old.jar.disabled', Buffer.from('disabled'))
    const archive = zip.toBuffer()

    const reopened = new AdmZip(archive)
    const files = reopened.getEntries().filter(e => !e.isDirectory)
    const mods = validateArchiveEntries(files.map(e => ({ entryName: e.entryName, size: e.header.size })))
    expect(mods).toEqual(['demo.jar', 'old.jar.disabled'])

    expect(reopened.getEntry('mods/demo.jar')!.getData().equals(modBytes)).toBe(true)
    const meta = parseExportedMeta(JSON.parse(reopened.getEntry('instance.json')!.getData().toString('utf-8')))
    expect(meta).toMatchObject({ name: 'Тест', version: '1.20.1', loader: 'fabric' })
  })
})
