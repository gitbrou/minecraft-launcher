<div align="center">

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=TypeScript&logoColor=FFF)
![React](https://shields.io/badge/-react-4377cb?logo=react)
![Electron](https://img.shields.io/badge/Electron-006C9C)

# Mine Launcher

Простой и быстрый лаунчер Minecraft с изоляцией сборок, модами из Modrinth и авто-установкой Java.

</div>

## Что умеет

- **Сборки (instances)** — каждая сборка изолирована: свои миры, моды, ключи и настройки. Переименование двойным кликом, поиск по сборкам.
- **Загрузчики** — Vanilla, Fabric и Quilt. Forge в планах.
- **Моды одной кнопкой** — поиск и установка модов с [Modrinth](https://modrinth.com) под вашу версию + загрузчик; включение/отключение/удаление в два клика.
- **Java не нужна** — лаунчер находит установленную Java или сам скачивает [Temurin JRE](https://adoptium.net) (8/17/21 — нужную под вашу версию игры).
- **Официальные серверы Mojang** — версии, либы, ресурсы качаются с launchermeta / resources.mojang.com, честно и без посредников.
- **Скины с 3D-просмотром** — загрузите PNG или подтяните скин по нику, крутите модель мышью.
- **Логи и прогресс** — загрузка с МБ/с, проценты, копирование логов одной кнопкой, «Остановить игру».
- **Чистый тёмный интерфейс** — без фейковых данных и предупреждающих мигалок.

## Запуск

```bash
cd mine-launcher

npm install      # зависимости
npm run dev      # режим разработки
npm run compile  # typecheck + сборка
npm run build    # установщик/портативка (Windows NSIS)
```

## Структура

```
mine-launcher/
├── electron/            # main-процесс
│   ├── main.ts          # окно, IPC, файлы данных
│   ├── launcherEngine.ts# скачивание и запуск Minecraft
│   └── preload.ts       # безопасный мост в renderer
├── src/                 # интерфейс (React)
│   ├── components/      # панели, модалки, вкладки
│   └── platform/        # мобильная заглушка (Capacitor)
└── dist-build/          # вывод сборки
```

Данные лаунчера лежат в `%APPDATA%/mine-launcher/.mine-launcher` (Windows) — там же `accounts.json`, `instances.json`, `settings.json`.

## Дорожная карта

- [ ] Forge
- [ ] Microsoft-аккаунты (лицензия)
- [ ] Перенос/экспорт сборок
- [ ] Скриншоты модов и описания в каталоге

---

<p align="center">
  MIT License · 2026 gitbrou
</p>
