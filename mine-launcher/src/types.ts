export interface Account {
  id: string;
  username: string;
  uuid: string;
  type: 'offline' | 'microsoft';
  isActive: boolean;
  skinUrl?: string;
  createdAt: number;
}

export type LoaderType = 'vanilla' | 'fabric' | 'forge' | 'quilt';

export interface Instance {
  id: string;
  name: string;
  version: string;
  loader: LoaderType;
  loaderVersion?: string;
  icon?: string;
  created: number;
  lastPlayed?: number;
  memoryMin?: number; // in MB
  memoryMax?: number; // in MB
  javaPath?: string;
  jvmArgs?: string;
}

export interface MinecraftVersion {
  id: string;
  type: 'release' | 'snapshot' | 'old_beta' | 'old_alpha';
  url: string;
  time: string;
  releaseTime: string;
}

export interface ModItem {
  id: string;
  filename: string;
  name: string;
  enabled: boolean;
  size: number;
  iconUrl?: string;
}

export interface LauncherSettings {
  javaPath: string;
  memoryMin: number;
  memoryMax: number;
  customJvmArgs: string;
  closeLauncherOnGameStart: boolean;
  gameDir: string;
  useProxy?: boolean;
  proxyType?: 'http' | 'socks5';
  proxyHost?: string;
  proxyPort?: number;
  launcherFont?: string;
  selectedInstanceId?: string;
  customGameArgs?: string;
}

export interface LaunchProgress {
  instanceId: string;
  stage: 'idle' | 'checking' | 'downloading' | 'extracting' | 'launching' | 'running' | 'error';
  statusText: string;
  progress: number; // 0 to 100
  downloadedFiles?: number;
  totalFiles?: number;
  speed?: string;
  error?: string;
}

export interface GameLog {
  timestamp: number;
  type: 'info' | 'warn' | 'error';
  message: string;
}
