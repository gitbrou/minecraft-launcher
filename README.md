# Mine Launcher

> Лаунчер Minecraft на Electron: сборки, моды с Modrinth и своя Java.

[![Release](https://img.shields.io/github/v/release/gitbrou/minecraft-launcher?style=flat-square&color=5fae4a)](https://github.com/gitbrou/minecraft-launcher/releases)
[![License](https://img.shields.io/badge/license-MIT-5fae4a?style=flat-square)](LICENSE)
[![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20macOS%20%7C%20Linux-2b2f38?style=flat-square)](https://github.com/gitbrou/minecraft-launcher/releases)

Запускает ваниллу, Fabric и Quilt. Моды ищутся и ставятся с Modrinth, Java нужной версии
скачивается сама, ставить её заранее не нужно.

Сборки независимые: у каждой свой набор модов и миров, а библиотеки, ассеты и версии игры
общие. Ещё есть скины с 3D-просмотром, живые логи, экспорт и импорт сборок в zip.
Обновляется через GitHub Releases, как обычная программа.

<img src="docs/screenshot.png" alt="Mine Launcher" width="900" />

## Установка

Готовые сборки лежат в [Releases](https://github.com/gitbrou/minecraft-launcher/releases).

**Windows.** Скачать `mine-launcher-2.0.0-setup-x64.exe` и запустить. Установщик не
подписан, поэтому SmartScreen может предупредить: «Подробнее» → «Выполнить в любом случае».

**macOS и Linux.** Там же dmg и AppImage. Собирал их реже, так что возможны сюрпризы;
если что-то не работает, лучше написать в issues.

## Как пользоваться

1. Добавить аккаунт. Пока только оффлайн-ник.
2. Создать сборку: выбрать версию игры и загрузчик.
3. Поставить моды во вкладке «Моды» или оставить ваниллу.
4. Нажать «Играть». Java и остальные файлы лаунчер докачает сам.

Сборку можно выгрузить в zip и отдать другу, а он импортирует её кнопкой «Импорт» или
ссылкой `minelauncher://import?url=…`.

## Разработка

Нужен Node.js 18+ и npm.

```bash
cd mine-launcher
npm install
npm run dev
```

Полезные команды:

- `npm test` — 65 тестов, сеть не нужна;
- `npm run lint` — eslint;
- `npm run build` — NSIS-установщик и portable в `dist-build/`.

Данные приложения лежат в `%APPDATA%\mine-launcher\.mine-launcher` на Windows и в
стандартном `userData` на других системах. Внутри `accounts.json`, `instances.json`,
`settings.json` и папки с версиями, библиотеками и скинами.

## История версий

- **2.0.0** — новый интерфейс, автообновления, скины, импорт сборок по ссылке.
- **1.1.0** — исправления, deep link `minelauncher://import`.
- **1.0.2** — первый релиз.

## Автор

gitbrou — [github.com/gitbrou](https://github.com/gitbrou)

Проект распространяется по MIT, текст в [LICENSE](LICENSE).

## Участие

Баг или идея — открывай issue. Если есть лог из вкладки «Логи», приложи его: по нему
обычно видно, чего не хватило. Пулл-реквесты тоже можно, только сначала опиши, что
хочешь поменять.

---

<p align="center">
  MIT License · 2026 gitbrou
</p>
