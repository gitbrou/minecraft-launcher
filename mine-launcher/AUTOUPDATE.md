# Автообновления — концепт

## Схема
```
[GitHub Release vX.Y.Z (latest.yml + .exe/.dmg/.AppImage)]
            ^
            | HTTPS check on startup (electron-updater)
[Mine Launcher (packaged app)]
```

1. **Публикация**: `npm run build` → electron-builder собирает установщик и
   `latest.yml`, `npm run build -- --publish always` выкладывает их в GitHub
   Releases (provider `github`, см. `publish` в package.json).
2. **Проверка**: при старте запущенной (упакованной) копии вызывается
   `autoUpdater.checkForUpdatesAndNotify()` (см. `electron/main.ts`).
3. **Скачивание**: при наличии обновления оно грузится в фоне (`autoDownload = true`).
4. **Установка**: после загрузки показывается нативное уведомление,
   рестарт-и-обновление происходит по `restartAndInstall()`
   (по умолчанию при следующем запуске).

## Правила версий
- semver: `patch` — багфиксы, `minor` — новые фичи, `major` — ломающие изменения.
- Тег релиза должен совпадать с версией: `git tag v1.2.3 && git push --tags`.

## Откат
electron-updater хранит предыдущую копию в `%LOCALAPPDATA%\mine-launcher-updater`;
ручной откат — установка `.exe` предыдущего релиза поверх.

## Android
APK-канал обновлений — Play Market (или sideload через ту же схему GitHub
Releases с проверкой `latest`-манифеста; не через electron-updater).
