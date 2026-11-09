export type EngineId = 'java' | 'horizon'

export interface EngineTarget {
  version: string
  loader?: string
}

// Horizon — нативный клиент только для Minecraft 26.3 без модов.
export function horizonFits(target?: EngineTarget | null): boolean {
  if (!target) return true
  return target.version === '26.3' && (target.loader || 'vanilla') === 'vanilla'
}

// Движок из настроек главный, но выбранную сборку не подменяем:
// если она не подходит Horizon, запускаем её через Java.
export function pickEngine(engine: EngineId, target?: EngineTarget | null): EngineId {
  return engine === 'horizon' && horizonFits(target) ? 'horizon' : 'java'
}
