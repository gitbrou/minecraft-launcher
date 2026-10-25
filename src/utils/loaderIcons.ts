import vanilla from '../assets/loaders/vanilla.png'
import fabric from '../assets/loaders/fabric.png'
import quilt from '../assets/loaders/quilt.png'
import forge from '../assets/loaders/forge.png'

export const LOADER_ICONS: Record<string, string> = { vanilla, fabric, quilt, forge }

export const LOADER_LABELS: Record<string, string> = {
  vanilla: 'Vanilla',
  fabric: 'Fabric',
  quilt: 'Quilt',
  forge: 'Forge'
}

export function loaderIcon(loader?: string): string {
  return (loader && LOADER_ICONS[loader]) || vanilla
}

export function loaderLabel(loader?: string): string {
  return (loader && LOADER_LABELS[loader]) || 'Vanilla'
}
