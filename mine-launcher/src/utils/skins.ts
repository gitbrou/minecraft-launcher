const SKIN_UPDATED_EVENT = 'mine-launcher:skin-updated'

/** Сообщает сайдбару и другим поверхностям, что локальный скин аккаунта изменился */
export function emitSkinUpdated() {
  window.dispatchEvent(new Event(SKIN_UPDATED_EVENT))
}

export function onSkinUpdated(callback: () => void): () => void {
  window.addEventListener(SKIN_UPDATED_EVENT, callback)
  return () => window.removeEventListener(SKIN_UPDATED_EVENT, callback)
}

/**
 * Режет PNG-скин в квадрат головы 8×8 (лицо + слой шапки) и отдаёт data-URL.
 * Так аватар показывает именно локально применённый скин, а не кэш mc-heads.
 */
export function cropSkinHead(skinUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas')
        canvas.width = 8
        canvas.height = 8
        const ctx = canvas.getContext('2d')
        if (!ctx) throw new Error('canvas 2d недоступен')
        ctx.imageSmoothingEnabled = false
        ctx.drawImage(img, 8, 8, 8, 8, 0, 0, 8, 8)
        ctx.drawImage(img, 40, 8, 8, 8, 0, 0, 8, 8)
        resolve(canvas.toDataURL())
      } catch (err) {
        reject(err)
      }
    }
    img.onerror = () => reject(new Error('не удалось прочитать скин'))
    img.src = skinUrl
  })
}
