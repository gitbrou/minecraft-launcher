<div align="center">

<img src="docs/og.png" alt="Mine Launcher" width="720" />

# Mine Launcher

Лаунчер Minecraft на Electron + React.

</div>

Запускает ваниллу, Fabric и Quilt, ставит моды с Modrinth, сам скачивает нужную Java и
обновляется через GitHub Releases. У каждой сборки свои миры и моды; скачанные версии,
библиотеки и ресурсы общие.

## Что работает

- **Сборки.** Создание, переименование, удаление, поиск. У каждой — отдельная папка в `instances/`.
- **Загрузчики.** Vanilla, Fabric, Quilt.
- **Моды.** Поиск и установка с Modrinth с фильтром по версии игры и загрузчику, включение/отключение/удаление.
- **Java.** Ищет установленную или скачивает Temurin JRE 8/17/21 — версию выбирает по версии игры.
- **Аккаунты.** Оффлайн-ники. UUID генерируется по стандарту OfflinePlayer.
- **Обмен сборками.** Экспорт в zip, импорт из zip и по ссылке `minelauncher://import?url=…`.
- **Скины.** Загрузка PNG или по нику, 3D-просмотр через `skinview3d`.
- **Логи и краши.** Живой вывод игры; при падении лаунчер объясняет причину (память, Java, VC++, CDN Mojang, драйвер).
- **Трей.** Окно можно свернуть во время игры; второй экземпляр лаунчера не запускается.

## Чего нет

- Forge.
- Входа через Microsoft — только оффлайн-ники.
- Автообновлений на Linux и macOS: на Linux проверка отключена; на macOS `electron-updater` требует подписанное приложение, а сборка не подписана.
- Android: в репозитории есть Capacitor-заглушка с мостом на PojavLauncher, но мобильная сборка не тестировалась и не входит в релизы.

## Требования

- Node.js 18+ и npm — для сборки из исходников.
- Windows 10/11 — основная платформа. Linux и macOS собираются, но тестировались меньше.
- Java ставить не нужно: лаунчер скачает её сам.

## Сборка и запуск

```bash
cd mine-launcher
npm install

npm run dev       # запуск в режиме разработки
npm run compile   # проверка типов + сборка renderer и main
npm test          # юнит-тесты (vitest)
npm run lint      # eslint
npm run build     # установщик и portable → dist-build/
```

`npm run build` собирает NSIS-установщик и portable для Windows x64. Linux и macOS собираются
из исходников на своих ОС — цели AppImage и dmg есть в `package.json`.

## Тесты

`npm test` — 59 тестов. Сеть не нужна; тесты распаковки работают во временных папках.

- `requiredJavaMajor` — границы 8/17/21 для версий игры;
- `generateOfflineUUID` — формат и эталонные значения v3-UUID;
- правила библиотек Mojang и безопасность путей;
- `buildCrashHint` — разбор типовых падений игры;
- формат zip-сборок: zip-slip, symlink, лимиты, round-trip;
- разбор `minelauncher://` ссылок.

## Где лежат данные

`app.getPath('userData')/.mine-launcher`:

- Windows: `%APPDATA%\mine-launcher\.mine-launcher`
- Linux: `~/.config/mine-launcher/.mine-launcher`
- macOS: `~/Library/Application Support/mine-launcher/.mine-launcher`

Внутри: `accounts.json`, `instances.json`, `settings.json`, а также `instances/`, `assets/`,
`libraries/`, `versions/`, `java/`, `skins/`.

## Обмен сборками

Кнопка «Поделиться» на карточке сборки сохраняет zip с `instance.json` и файлами из `mods/`.
Импорт — кнопка «Импорт» или ссылка:

```
minelauncher://import?url=https%3A%2F%2Fexample.com%2Fsurvival.zip
```

Ссылка открывает лаунчер, показывает хост и спрашивает подтверждение. Разрешён только `https`,
редиректов не больше трёх, архив не больше 600 МБ. Архивы с путями наружу, symlink-записями
и превышением размера отклоняются до записи на диск.

## Обновления лаунчера

Рассчитаны на установленную Windows-сборку (NSIS), в `npm run dev` не работают.

1. Поднимите версию в `package.json`.
2. `npm run build`.
3. Создайте GitHub Release и приложите `.exe`, `.blockmap` и `.yml` из `dist-build/`
   (или запустите `npx electron-builder --publish always` с токеном).

Клиент проверяет обновления при старте и раз в 4 часа, скачивает их в фоне и устанавливает
при выходе либо по кнопке в баннере.

## Структура

```
mine-launcher/
├── electron/
│   ├── main.ts             # окно, трей, IPC, автообновление, deep link
│   ├── launcherEngine.ts   # загрузка и запуск Minecraft, разбор крашей
│   ├── instancePack.ts     # формат zip-сборки
│   ├── deepLink.ts         # разбор minelauncher:// ссылок
│   ├── preload.ts          # IPC-мост
│   └── __tests__/          # vitest
├── src/
│   ├── components/         # экраны и модалки
│   ├── hooks/              # focus trap
│   ├── platform/           # заглушка для Android
│   └── utils/
├── build/                  # иконка для electron-builder
└── dist-build/             # результат npm run build

docs/                       # OG-картинка и SVG-мастер иконки (на уровне репозитория)
```

## Безопасность

- `contextIsolation` включён, `nodeIntegration` выключен, внешняя навигация окна запрещена.
- IPC валидирует id сборок, имена файлов и пути; моды качаются только с `cdn.modrinth.com`.
- Своя распаковка zip вместо `extract-zip` (у него открыт symlink traversal без фикса):
  проверяются абсолютные пути, `..`, symlink-записи и фактический размер распаковки.
- `npm audit --omit=dev` — 0 уязвимостей в production-зависимостях.

## Известные проблемы

- Electron 30.x содержит известные CVE; миграция на актуальную ветку — отдельная задача,
  она ломает API и требует проверки.
- Windows-сборка не подписана, SmartScreen будет предупреждать при установке.
- macOS-сборка не нотаризована.

## Планы

- Forge.
- Вход через Microsoft.
- Перенос на актуальный Electron.

## Лицензия

MIT. Текст — в [LICENSE](LICENSE).
