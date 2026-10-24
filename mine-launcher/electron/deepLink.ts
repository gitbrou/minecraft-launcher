export interface ImportDeepLink {
  url: string
}

const MAX_TARGET_URL_LENGTH = 2048

/**
 * Поддерживаемый формат: minelauncher://import?url=https%3A%2F%2Fhost%2Fpack.zip
 * Любые другие схемы/действия/не-https цели отклоняются.
 */
export function parseImportDeepLink(raw: string): ImportDeepLink | null {
  try {
    const parsed = new URL(raw)
    if (parsed.protocol !== 'minelauncher:') return null

    const action = parsed.hostname || parsed.pathname.replace(/^\/+/, '')
    if (action !== 'import') return null

    const target = parsed.searchParams.get('url')
    if (!target || target.length > MAX_TARGET_URL_LENGTH) return null

    const targetUrl = new URL(target)
    if (targetUrl.protocol !== 'https:') return null
    if (targetUrl.username || targetUrl.password) return null
    if (!targetUrl.hostname) return null

    return { url: targetUrl.toString() }
  } catch {
    return null
  }
}

/** Ищет валидную deep-link-ссылку среди argv (Windows/Linux передают её аргументом) */
export function findDeepLink(argv: string[]): ImportDeepLink | null {
  for (const arg of argv) {
    if (!/^minelauncher:\/\//i.test(arg)) continue
    const parsed = parseImportDeepLink(arg)
    if (parsed) return parsed
  }
  return null
}
