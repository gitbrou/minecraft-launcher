export function safeInstId(instanceId: string): string {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(instanceId)) throw new Error('Некорректный id сборки')
  return instanceId
}

/**
 * Имена модов реально содержат "+", пробелы, точки и иногда кириллицу
 * (например fabric-api-0.92.2+1.20.1.jar). Запрещаем только то, что опасно
 * для путей: разделители, управляющие символы и спецсимволы Windows.
 */
export function safeFilename(filename: string): string {
  if (!filename || filename.length > 255) throw new Error('Некорректное имя файла')
  if (filename === '.' || filename === '..') throw new Error('Некорректное имя файла')
  // Управляющие символы ловим по коду, чтобы не держать их в регулярке
  for (const ch of filename) {
    if (ch.codePointAt(0)! < 0x20) throw new Error('Некорректное имя файла')
  }
  if (/[\\/:*?"<>|]/.test(filename)) throw new Error('Некорректное имя файла')
  return filename
}
