# 🚀 Mine Launcher — Современный Лаунчер Minecraft

Премиальный, высокопроизводительный кастомный лаунчер для **Minecraft**, созданный на стеке **Electron + React + TypeScript + Vite**.

![Mine Launcher Preview](public/icon.png)

## ✨ Основные особенности:

- 🎮 **Поддержка любых версий**: Быстрый запуск Minecraft (включая **1.12.2 по умолчанию**, 1.20.4, Fabric, Forge, Quilt).
- 👤 **Управление аккаунтами**: Простой офлайн-вход, переключение никнеймов в один клик.
- 🎨 **3D Просмотр скинов**: Встроенный интерактивный 3D-просмотрщик скинов на Three.js (`skinview3d`) с вращением мышью на 360°.
- 📤 **Загрузка скинов любым способом**:
  - Быстрая загрузка локальных `.png` файлов.
  - Умный импорт по командам `/give @p minecraft:player_head[...]`, NameMC или ссылке.
- 🧩 **Встроенный менеджер модов Modrinth**: Поиск и установка модов (Sodium, Iris, JEI и др.) в один клик прямо из лаунчера.
- 🔒 **Прокси & Сетевые настройки**: Поддержка HTTP и SOCKS5 прокси для обхода блокировок.
- 🔤 **Кастомизация UI**: Кастомный Windows-style TitleBar, современные тумблеры, выбор красивых шрифтов (Inter, Outfit, Fira Code, Minecraft Pixel).
- 🖥️ **Автоматический Fullscreen**: Игра сразу запускается на весь экран.

---

## 🛠️ Запуск проекта разработчиком:

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки (Vite + Electron Live Reload)
npm run dev

# Компиляция TypeScript и сборка интерфейса
npm run compile

# Сборка финального Windows EXE дистрибутива (Onecompile / electron-builder)
npm run build
```

---

## 📁 Структура проекта:

- `electron/main.ts` — Главный процесс Electron, управление IPC, сохранениями и скачиванием движков.
- `electron/launcherEngine.ts` — Движок скачивания библиотек Minecraft, генерации оффлайн UUID и запуска JVM.
- `src/components/ProfileTab.tsx` — Вкладка профиля с 3D моделями скинов и статистикой.
- `src/components/SettingsModal.tsx` — Окно настроек в стиле Prism Launcher.

---

Создано для сообщества **gitbrou**.
