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
