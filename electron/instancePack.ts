import path from 'node:path'

export type PackLoader = 'vanilla' | 'fabric' | 'quilt'

export interface ExportedInstanceMeta {
  format: 1
  name: string
  version: string
  loader: PackLoader
  exportedAt: number
}

const MAX_MOD_BYTES = 64 * 1024 * 1024
const MAX_TOTAL_ENTRY_BYTES = 512 * 1024 * 1024
export const MAX_MOD_BYTES_EXPORTED = MAX_MOD_BYTES

export function buildInstanceMeta(input: {
  name: string
  version: string
  loader: string
}): ExportedInstanceMeta {
  return {
    format: 1,
    name: input.name,
    version: input.version,
    loader: (['vanilla', 'fabric', 'quilt'].includes(input.loader) ? input.loader : 'vanilla') as PackLoader,
    exportedAt: Date.now()
  }
}

/**
 * Допустимые записи архива: ровно `instance.json` и файлы `mods/<имя>` (без вложенности).
 * Всё остальное — повод отказать в импорте целиком (zip-slip, абсолютные пути, мусор).
 */
export function validateArchiveEntries(entries: Array<{ entryName: string; size: number }>): string[] {
  let total = 0
  const modFiles: string[] = []

  for (const entry of entries) {
    const raw = (entry.entryName || '').replace(/\\/g, '/')
    if (!raw) throw new Error('Архив содержит пустое имя файла')

    // нормализация отбрасывает хвостовые слэши директорий, но не скрывает traversal
    const normalized = raw.replace(/\/+$/, '')
    if (path.isAbsolute(normalized) || /^[a-zA-Z]:/.test(normalized)) {
      throw new Error('Архив содержит абсолютный путь — импорт отклонён')
    }
    const segments = normalized.split('/')
    if (segments.some((s) => s === '' || s === '.' || s === '..')) {
      throw new Error('Архив содержит небезопасный путь — импорт отклонён')
    }

    if (normalized === 'instance.json') {
      total += entry.size
      if (total > MAX_TOTAL_ENTRY_BYTES) throw new Error('Архив слишком большой')
      continue
    }

    if (segments[0] !== 'mods' || segments.length !== 2) {
      throw new Error(`Неожиданный файл в архиве: ${normalized}`)
    }
    if (!/\.jar(\.disabled)?$/i.test(segments[1])) {
      throw new Error(`В папке mods ожидаются только .jar: ${segments[1]}`)
    }
    if (entry.size > MAX_MOD_BYTES) {
      throw new Error(`Файл мода слишком большой: ${segments[1]}`)
    }
    total += entry.size
    if (total > MAX_TOTAL_ENTRY_BYTES) throw new Error('Архив слишком большой')

    if (!modFiles.includes(segments[1])) modFiles.push(segments[1])
  }

  if (!entries.some((e) => (e.entryName || '').replace(/\\/g, '/').replace(/\/+$/, '') === 'instance.json')) {
    throw new Error('В архиве нет instance.json — это не сборка Mine Launcher')
  }
  if (modFiles.length === 0) {
    throw new Error('В архиве нет модов — импортировать нечего')
  }

  return modFiles
}

export function parseExportedMeta(raw: unknown): ExportedInstanceMeta {
  if (!raw || typeof raw !== 'object') throw new Error('instance.json повреждён')
  const obj = raw as Record<string, unknown>
  if (obj.format !== 1) throw new Error('Неподдерживаемый формат сборки')
  if (typeof obj.name !== 'string' || !obj.name.trim()) throw new Error('В сборке нет названия')
  if (typeof obj.version !== 'string' || !/^[0-9A-Za-z._-]{1,32}$/.test(obj.version)) {
    throw new Error('Некорректная версия Minecraft в сборке')
  }
  if (obj.loader !== 'vanilla' && obj.loader !== 'fabric' && obj.loader !== 'quilt') {
    throw new Error('Некорректный загрузчик в сборке')
  }
  return {
    format: 1,
    name: obj.name.trim().slice(0, 60),
    version: obj.version,
    loader: obj.loader,
    exportedAt: typeof obj.exportedAt === 'number' ? obj.exportedAt : Date.now()
  }
}

/** Импорт не должен затирать существующую сборку: «Выживание» → «Выживание (2)» */
export function uniqueInstanceName(name: string, existingNames: string[]): string {
  const base = name.trim() || 'Импортированная сборка'
  if (!existingNames.includes(base)) return base
  for (let n = 2; n < 100; n++) {
    const candidate = `${base} (${n})`
    if (!existingNames.includes(candidate)) return candidate
  }
  return `${base} (${Date.now().toString(36)})`
}
