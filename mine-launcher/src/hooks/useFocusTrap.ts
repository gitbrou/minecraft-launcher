import { useEffect, type RefObject } from 'react'

const FOCUSABLE =
  'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'

/**
 * Держит фокус внутри модалки: Tab/Shift+Tab циклятся по реально видимым
 * контролам, при закрытии фокус возвращается туда, откуда модалку открыли.
 */
export function useFocusTrap<T extends HTMLElement>(container: RefObject<T | null>, active: boolean) {
  useEffect(() => {
    if (!active) return
    const root = container.current
    if (!root) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    const focusable = () =>
      Array.from(root.querySelectorAll<HTMLElement>(FOCUSABLE)).filter((el) => el.offsetParent !== null)

    // Начинаем с первого поля ввода, а не с крестика закрытия
    const initial =
      Array.from(root.querySelectorAll<HTMLElement>('input:not([disabled]), select:not([disabled]), textarea:not([disabled])'))
        .filter((el) => el.offsetParent !== null)[0] || focusable()[0]
    initial?.focus()

    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return
      const items = focusable()
      if (items.length === 0) return
      const index = items.indexOf(document.activeElement as HTMLElement)
      if (e.shiftKey && index <= 0) {
        e.preventDefault()
        items[items.length - 1].focus()
      } else if (!e.shiftKey && index === items.length - 1) {
        e.preventDefault()
        items[0].focus()
      }
    }

    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      previouslyFocused?.focus?.()
    }
  }, [active, container])
}
