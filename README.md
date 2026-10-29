# Mine Launcher

[![Release](https://img.shields.io/github/v/release/gitbrou/minecraft-launcher?style=flat-square&color=5fae4a)](https://github.com/gitbrou/minecraft-launcher/releases/latest)
[![License](https://img.shields.io/badge/license-MIT-5fae4a?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux%20%7C%20Android-2b2f38?style=flat-square)](https://github.com/gitbrou/minecraft-launcher/releases/latest)

Крутой майнрафт лаунчер
Моды, можно делится версиями, скины и многое другое

<img src="docs/screenshot.png" alt="Mine Launcher" width="860" />

## Скачать

Windows, macOS, Linux и Android: [релиз](https://github.com/gitbrou/minecraft-launcher/releases/latest).

На телефоне бери `MineLauncher-1.0.5-arm64-v8a.apk`, он подходит почти всем. Если Android
ругается на процессор, качай `MineLauncher-1.0.5.apk`.

## Использование

Ник, вресия, кнопка играть

## Сборка

```bash
npm install
npm run dev
```

Android собирается в тех же релизах, исходники в `android/`. Это наш лаунчер на базе
Zalith Launcher 2 (GPL-3.0), неофициальная модификация.

## Данные

В `%APPDATA%\mine-launcher\.mine-launcher` лежат аккаунты, сборки, настройки, версии,
скины и миры. На macos linux путь отличается (`~/Library/Application Support/mine-launcher/.mine-launcher`, `~/.config/ или $XDG_CONFIG_HOME/mine-launcher/.mine-launcher`)

## Версии

- 2.1.0. APK для Android в релизах
- 2.0.0. Новый интерфейс, импорт по ссылке и автообновления
- 1.1.0. Исправления
- 1.0.0. Первый релиз

---

<p align="center">
  MIT License · 2026 gitbrou
</p>
