import vanilla from '../assets/loaders/vanilla.png'
import fabric from '../assets/loaders/fabric.png'
import quilt from '../assets/loaders/quilt.png'
import forge from '../assets/loaders/forge.png'

export const LOADER_ICONS: Record<string, string> = { vanilla, fabric, quilt, forge }

export function loaderIcon(loader?: string): string {
  return (loader && LOADER_ICONS[loader]) || vanilla
}
