# Mine Launcher

[![Release](https://img.shields.io/github/v/release/gitbrou/minecraft-launcher?style=flat-square&color=5fae4a)](https://github.com/gitbrou/minecraft-launcher/releases/latest)
[![License](https://img.shields.io/badge/license-MIT-5fae4a?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-2b2f38?style=flat-square)](https://github.com/gitbrou/minecraft-launcher/releases/latest)

Лаунчер Minecraft: Vanilla, Fabric и Quilt. Моды ставятся с Modrinth, Java нужной версии
скачивается сама.

<img src="docs/screenshot.png" alt="Mine Launcher" width="860" />

## Скачать

Windows: [установщик](https://github.com/gitbrou/minecraft-launcher/releases/latest).
Подписи нет, SmartScreen предупредит — «Подробнее» → «Выполнить в любом случае».

macOS и Linux: dmg и AppImage в том же релизе.

## Использование

Добавить ник, создать сборку, выбрать версию и загрузчик. Моды — во вкладке «Моды».
Первый запуск дольше обычного: скачиваются Java, библиотеки и ассеты.

## Сборка

```bash
cd mine-launcher
npm install
npm run dev
```

`npm test` — 65 тестов, `npm run lint` — eslint, `npm run build` — установщик в
`dist-build/`.

## Данные

`%APPDATA%\mine-launcher\.mine-launcher` — аккаунты, сборки, настройки, версии, скины
и миры.

## Версии

- 2.0.0 — новый интерфейс и автообновления
- 1.1.0 — импорт по ссылке
- 1.0.0 — первый релиз

---

<p align="center">
  MIT License · 2026 gitbrou
</p>
