export interface Account {
  id: string;
  username: string;
  uuid: string;
  type: 'offline';
  isActive: boolean;
  createdAt: number;
}

export type LoaderType = 'vanilla' | 'fabric' | 'quilt';

export interface Instance {
  id: string;
  name: string;
  version: string;
  loader: LoaderType;
  icon?: string;
  created: number;
  lastPlayed?: number;
  lastPlayedSeconds?: number;
  memoryMin?: number; // MB
  memoryMax?: number; // MB
  javaPath?: string;
}

export interface MinecraftVersion {
  id: string;
  type: 'release' | 'snapshot' | 'old_beta' | 'old_alpha';
  releaseTime: string;
}

export interface ModItem {
  id: string;
  filename: string;
  name: string;
  enabled: boolean;
  size: number;
}

export interface LauncherSettings {
  javaPath: string;
  memoryMin: number;
  memoryMax: number;
  customJvmArgs: string;
  closeLauncherOnGameStart: boolean;
  fullscreen: boolean;
  hideLauncher: boolean;
  selectedInstanceId?: string;
}

export interface SystemInfo {
  totalRamMb: number;
  defaultMaxMemory: number;
}

export type UpdateStatus = 'dev' | 'checking' | 'available' | 'not-available' | 'downloading' | 'downloaded' | 'error';

export interface UpdateState {
  status: UpdateStatus;
  percent?: number;
  transferred?: number;
  total?: number;
  bytesPerSecond?: number;
  message?: string;
  info?: unknown;
}

export interface DeepLinkResult {
  ok: boolean;
  message?: string;
  instances?: Instance[];
  importedId?: string;
}

export interface LaunchProgress {
  instanceId: string;
  stage: 'idle' | 'checking' | 'downloading' | 'extracting' | 'launching' | 'running' | 'error';
  statusText: string;
  progress: number; // 0-100
  downloadedMb?: string;
  totalMb?: string;
  speed?: string;
  error?: string;
}

export interface GameLog {
  timestamp: number;
  type: 'info' | 'warn' | 'error';
  message: string;
}

export interface ModrinthProject {
  project_id: string;
  slug: string;
  title: string;
  description: string;
  icon_url?: string;
  downloads: number;
  author: string;
}

export interface ModrinthFile {
  url: string;
  filename: string;
  primary?: boolean;
}

export interface ModrinthVersion {
  files: ModrinthFile[];
}

export interface ProfileWorld {
  instanceId: string;
  instanceName: string;
  worldName: string;
  lastPlayed: number;
}

export interface ProfileStats {
  username: string;
  uuid: string;
  worldsCount: number;
  worlds: ProfileWorld[];
  instancesCount: number;
  modsCount: number;
  lastPlayedFormatted: string;
}
