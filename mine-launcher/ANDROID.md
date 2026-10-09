# Android-движок: PojavLauncher handoff

Electron и JVM-рантайм не работают внутри Android APK. Поэтому используется
двухъядерная схема:

```
[Mine Launcher Android]  --(deep link / intent)-->  [PojavLauncher]
     Capacitor WebView                                  нативный движок
     (UI: аккаунты, инстансы, скины)                    (JRE + GL4ES, реальный запуск)
```

## Как это работает
1. Пользователь жмёт **Play** в Android-версии лаунчера.
2. `src/platform/platformBridge.ts` собирает payload `{version, loader, username}`
   и пытается открыть `pojavlauncher://launch?...`.
3. Если PojavLauncher не установлен — открывается страница в Play Market:
   `net.kdt.pojavlaunch`.
4. Десктоп (Windows/macOS/Linux) продолжает использовать Electron-движок
   (`electron/launcherEngine.ts`) без изменений.

## APK-сборка (Android)
```powershell
npm run compile          # webDir = dist
npx cap add android      # первый раз
npm run android:sync     # синк webDir -> android/
npm run android:open     # открыть Android Studio
```
В Android Studio: **Build → Generate Signed Bundle / APK**.

> JRE и GL4ES-слой для внутриигрового запуска поставляет само приложение
> PojavLauncher; наш APK остаётся UI-компаньоном.
