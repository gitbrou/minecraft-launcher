# Подпись Windows-сборки

Без сертификата SmartScreen пишет «Неизвестный издатель». Самоподписанный сертификат это
не лечит: Windows ему всё равно не доверяет, а пользователю пришлось бы вручную ставить
корневой сертификат. Нужен сертификат публичного CA.

## Что уже готово

В `package.json` включена подпись SHA-256 с меткой времени DigiCert. В workflow сборка
получает `CSC_LINK` и `CSC_KEY_PASSWORD` из секретов GitHub. Если секретов нет, сборка
просто остаётся неподписанной и не падает.

## Свой сертификат (PFX)

Подходит, если сертификат можно выгрузить в PFX: Certum Open Source Code Signing,
обычный OV или EV.

1. Выгрузить сертификат в `.pfx`.
2. Получить base64:

   ```powershell
   [Convert]::ToBase64String([IO.File]::ReadAllBytes("cert.pfx"))
   ```

3. В GitHub: Settings → Secrets and variables → Actions добавить `WIN_CSC_LINK`
   (base64 от PFX) и `WIN_CSC_KEY_PASSWORD` (пароль).
4. Пересобрать релиз и проверить:

   ```powershell
   Get-AuthenticodeSignature "dist-build\mine-launcher-2.0.0-setup-x64.exe"
   ```

Локально на Windows electron-builder при первом билде качает `winCodeSign`. Если он падает
с `Cannot create symbolic link` — включи режим разработчика или распакуй архив без папки
`darwin`: она нужна только для macOS и содержит симлинки.

## SignPath (бесплатно для open source)

SignPath Foundation подписывает открытые проекты своим сертификатом. Издатель будет
«SignPath Foundation», зато бесплатно и без покупки сертификата. Нужно подать заявку,
подключить их GitHub Action и пропускать сборку через него, а не через `electron-builder`.

## Azure Trusted Signing

Около $10 в месяц, ключ хранится в Azure, в CI ничего не лежит. Нужна проверка
личности/компании и доступный регион. С electron-builder 24.13 напрямую не работает:
либо обновлять electron-builder, либо подписывать отдельным шагом после сборки.

## Репутация

Даже с новым OV-сертификатом SmartScreen может какое-то время показывать предупреждение:
репутация набирается по установкам. EV-сертификат даёт доверие сразу, но стоит дороже.
