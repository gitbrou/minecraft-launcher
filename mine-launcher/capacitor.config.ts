import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.minelauncher.app',
  appName: 'Mine Launcher',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
