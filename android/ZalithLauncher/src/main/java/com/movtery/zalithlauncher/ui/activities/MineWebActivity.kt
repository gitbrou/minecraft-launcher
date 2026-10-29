/*
 * Mine Launcher
 * Часть исходников основана на Zalith Launcher 2 (GPL-3.0),
 * Copyright (C) 2025-2026 MovTery <movtery228@qq.com> and contributors.
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

package com.movtery.zalithlauncher.ui.activities

import android.annotation.SuppressLint
import android.app.Activity
import android.app.ActivityManager
import android.content.Context
import android.content.Intent
import android.graphics.Color
import android.os.Build
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebResourceRequest
import android.webkit.WebResourceResponse
import android.webkit.WebView
import androidx.core.content.FileProvider
import androidx.webkit.WebViewAssetLoader
import androidx.webkit.WebViewClientCompat
import com.movtery.zalithlauncher.BuildConfig
import com.movtery.zalithlauncher.coroutine.TaskStage
import com.movtery.zalithlauncher.game.account.Account
import com.movtery.zalithlauncher.game.account.AccountType
import com.movtery.zalithlauncher.game.account.AccountsManager
import com.movtery.zalithlauncher.game.control.ControlManager
import com.movtery.zalithlauncher.game.addons.modloader.fabriclike.fabric.FabricVersions
import com.movtery.zalithlauncher.game.addons.modloader.fabriclike.quilt.QuiltVersions
import com.movtery.zalithlauncher.game.download.game.GameDownloadInfo
import com.movtery.zalithlauncher.game.download.game.GameInstaller
import com.movtery.zalithlauncher.game.launch.GameLaunchFlow
import com.movtery.zalithlauncher.game.version.installed.Version
import com.movtery.zalithlauncher.game.version.installed.VersionsManager
import com.movtery.zalithlauncher.game.versioninfo.MinecraftVersions
import com.movtery.zalithlauncher.path.PathManager
import com.movtery.zalithlauncher.setting.AllSettings
import com.movtery.zalithlauncher.ui.toAndroidString
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.Job
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.delay
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch
import kotlinx.coroutines.runBlocking
import kotlinx.coroutines.withContext
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.net.HttpURLConnection
import java.net.URL

private const val UPDATE_INFO_URL = "https://raw.githubusercontent.com/gitbrou/minecraft-launcher/main/android-info/latest_version_md.json"

/**
 * Экран лаунчера на нашем интерфейсе.
 *
 * В assets/mineui лежит собранный React-клиент из корня репозитория
 * (`npm run build:web`), он общается с игровым движком через [MineBridge].
 */
class MineWebActivity : Activity() {
    private val scope = CoroutineScope(SupervisorJob() + Dispatchers.Main)
    private lateinit var web: WebView
    private var launching = false
    private var installJob: Job? = null

    /** Локальный https-домен: ES-модули с file:// WebView блокирует */
    private val assetLoader by lazy {
        WebViewAssetLoader.Builder()
            .addPathHandler("/assets/", WebViewAssetLoader.AssetsPathHandler(this))
            .build()
    }

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        web = WebView(this).apply {
            setBackgroundColor(Color.parseColor("#131313"))
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            addJavascriptInterface(MineBridge(), "MineNative")
            webViewClient = object : WebViewClientCompat() {
                override fun shouldInterceptRequest(
                    view: WebView,
                    request: WebResourceRequest
                ): WebResourceResponse? = assetLoader.shouldInterceptRequest(request.url)
            }
        }
        setContentView(web)
        web.loadUrl("https://appassets.androidplatform.net/assets/mineui/index.html")

        scope.launch {
            VersionsManager.versions.collect { emitState() }
        }
        scope.launch {
            AccountsManager.accountsFlow.collect { emitState() }
        }
        VersionsManager.refresh("MineWeb")
        AccountsManager.reloadAccounts()
        // Без этого в игре нет экранных кнопок: стандартная раскладка
        // распаковывается только отсюда
        ensureControlLayout()

        scope.launch {
            delay(1500)
            checkUpdate()
        }
    }

    override fun onDestroy() {
        scope.cancel()
        web.destroy()
        super.onDestroy()
    }

    /** Мост для web-интерфейса. Все методы возвращают JSON-строки. */
    private inner class MineBridge {
        @JavascriptInterface
        fun getAccounts(): String = accountsJson()

        @JavascriptInterface
        fun addAccount(username: String): String {
            val name = username.trim()
            if (name.isEmpty()) return accountsJson()
            val account = Account(
                username = name,
                accountType = AccountType.LOCAL.tag
            )
            // Пишем сразу, чтобы интерфейс получил готовый список, а не пустоту
            runBlocking(Dispatchers.IO) {
                AccountsManager.suspendSaveAccount(account)
            }
            return accountsJson()
        }

        @JavascriptInterface
        fun setActiveAccount(id: String): String {
            AccountsManager.accountsFlow.value.firstOrNull { it.uniqueUUID == id }?.let {
                AccountsManager.setCurrentAccount(it)
            }
            return accountsJson()
        }

        @JavascriptInterface
        fun deleteAccount(id: String): String {
            AccountsManager.accountsFlow.value.firstOrNull { it.uniqueUUID == id }?.let {
                AccountsManager.deleteAccount(it)
            }
            return accountsJson()
        }

        @JavascriptInterface
        fun getInstances(): String = instancesJson()

        @JavascriptInterface
        fun deleteInstance(id: String): String {
            findVersion(id)?.getVersionPath()?.deleteRecursively()
            VersionsManager.refresh("MineWeb-delete")
            return instancesJson()
        }

        @JavascriptInterface
        fun getSettings(): String {
            val args = AllSettings.jvmArgs.getValue()
            val max = Regex("-Xmx(\\d+)[mM]").find(args)?.groupValues?.get(1)?.toIntOrNull() ?: maxMemoryMb()
            val min = Regex("-Xms(\\d+)[mM]").find(args)?.groupValues?.get(1)?.toIntOrNull() ?: 1024
            return JSONObject()
                .put("javaPath", "")
                .put("memoryMin", min)
                .put("memoryMax", max)
                .put("customJvmArgs", args)
                .put("closeLauncherOnGameStart", false)
                .put("fullscreen", AllSettings.launcherFullScreen.getValue())
                .put("hideLauncher", false)
                .toString()
        }

        @JavascriptInterface
        fun saveSettings(json: String): Boolean {
            return runCatching {
                val obj = JSONObject(json)
                val min = obj.optInt("memoryMin", 1024)
                val max = obj.optInt("memoryMax", maxMemoryMb())
                val custom = obj.optString("customJvmArgs", "").trim()
                val args = "-Xms${min}M -Xmx${max}M${if (custom.isEmpty()) "" else " $custom"}"
                AllSettings.jvmArgs.save(args)
                true
            }.getOrDefault(false)
        }

        @JavascriptInterface
        fun getSystemInfo(): String {
            val total = totalRamMb()
            return JSONObject()
                .put("totalRamMb", total)
                .put("defaultMaxMemory", maxMemoryMb())
                .toString()
        }

        @JavascriptInterface
        fun getStats(): String {
            val versions = VersionsManager.versions.value
            var worlds = 0
            var mods = 0
            versions.forEach { version ->
                val home = File(version.getGameHome())
                worlds += File(home, "saves").listFiles()?.count { it.isDirectory } ?: 0
                mods += modsDir(version).listFiles()?.count { it.isFile } ?: 0
            }
            val account = AccountsManager.currentAccountFlow.value
            return JSONObject()
                .put("username", account?.username ?: "")
                .put("uuid", account?.profileId ?: "")
                .put("worldsCount", worlds)
                .put("worlds", JSONArray())
                .put("instancesCount", versions.size)
                .put("modsCount", mods)
                .put("lastPlayedFormatted", "—")
                .toString()
        }

        @JavascriptInterface
        fun getMods(version: String): String {
            val mods = findVersion(version)?.let { modsDir(it) } ?: return "[]"
            val list = JSONArray()
            mods.listFiles()
                ?.filter { it.isFile && it.name.endsWith(".jar", true) || it.name.endsWith(".jar.disabled", true) }
                ?.sortedBy { it.name }
                ?.forEach { file ->
                    val enabled = !file.name.endsWith(".disabled", true)
                    list.put(
                        JSONObject()
                            .put("id", file.name)
                            .put("filename", file.name)
                            .put("name", file.name.removeSuffix(".disabled"))
                            .put("enabled", enabled)
                            .put("size", file.length())
                    )
                }
            return list.toString()
        }

        @JavascriptInterface
        fun toggleMod(version: String, filename: String): Boolean {
            val mods = findVersion(version)?.let { modsDir(it) } ?: return false
            val file = File(mods, filename)
            if (!file.exists()) return false
            return if (file.name.endsWith(".disabled", true)) {
                file.renameTo(File(mods, file.name.removeSuffix(".disabled")))
            } else {
                file.renameTo(File(mods, file.name + ".disabled"))
            }
        }

        @JavascriptInterface
        fun deleteMod(version: String, filename: String): Boolean {
            val mods = findVersion(version)?.let { modsDir(it) } ?: return false
            return File(mods, filename).delete()
        }

        @JavascriptInterface
        fun downloadMod(version: String, url: String, filename: String): Boolean {
            val mods = findVersion(version)?.let { modsDir(it) } ?: return false
            val safeName = filename.substringAfterLast('/').substringAfterLast('\\')
            if (safeName.isEmpty() || !safeName.endsWith(".jar", true)) return false
            mods.mkdirs()
            val target = File(mods, safeName)
            val temp = File(mods, "$safeName.part")
            return runCatching {
                val connection = URL(url).openConnection() as HttpURLConnection
                connection.connectTimeout = 15000
                connection.readTimeout = 30000
                connection.instanceFollowRedirects = true
                connection.inputStream.use { input ->
                    temp.outputStream().use { output -> input.copyTo(output) }
                }
                connection.disconnect()
                temp.renameTo(target)
            }.getOrDefault(false)
        }

        @JavascriptInterface
        fun getVersions(): String = runBlocking {
            runCatching {
                val manifest = MinecraftVersions.getVersionManifest()
                val list = JSONArray()
                manifest.versions
                    .filter { it.type == "release" || it.type == "snapshot" }
                    .forEach { version ->
                        list.put(
                            JSONObject()
                                .put("id", version.id)
                                .put("type", version.type)
                                .put("releaseTime", version.releaseTime)
                        )
                    }
                list.toString()
            }.getOrDefault("[]")
        }

        @JavascriptInterface
        fun installVersion(mc: String, loader: String, name: String) {
            scope.launch {
                val targetName = name.ifBlank { mc }
                emit("install-start", targetName)
                runCatching {
                    val fabric = if (loader == "fabric") {
                        FabricVersions.fetchFabricLoaderList(mc)?.firstOrNull()
                            ?: error("Не нашёл Fabric для $mc")
                    } else null
                    val quilt = if (loader == "quilt") {
                        QuiltVersions.fetchQuiltLoaderList(mc)?.firstOrNull()
                            ?: error("Не нашёл Quilt для $mc")
                    } else null

                    val info = GameDownloadInfo(
                        gameVersion = mc,
                        customVersionName = targetName,
                        fabric = fabric,
                        quilt = quilt
                    )
                    val installer = GameInstaller(this@MineWebActivity, info, scope)

                    // Раз в 400 мс отдаём в интерфейс текущий шаг и процент
                    installJob?.cancel()
                    installJob = scope.launch {
                        while (isActive) {
                            val tasks = installer.tasksFlow.value
                            val active = tasks.firstOrNull { it.task.stage.value == TaskStage.RUNNING }
                                ?: tasks.lastOrNull()
                            if (active != null) {
                                val progress = active.task.progress.value
                                emit(
                                    "install-progress",
                                    JSONObject()
                                        .put("name", targetName)
                                        .put("text", active.title.toAndroidString(this@MineWebActivity))
                                        .put("percent", if (progress >= 0f) (progress * 100).toInt() else -1)
                                        .toString()
                                )
                            }
                            delay(400)
                        }
                    }

                    installer.installGame(
                        onInstalled = { version ->
                            installJob?.cancel()
                            VersionsManager.refresh("MineWeb-install", version)
                            emit("install-done", version)
                            emitState()
                        },
                        onError = { th ->
                            installJob?.cancel()
                            emit("install-error", th.message ?: th.toString())
                        },
                        onGameAlreadyInstalled = {
                            installJob?.cancel()
                            emit("install-error", "Эта версия уже установлена")
                        }
                    )
                }.onFailure {
                    installJob?.cancel()
                    emit("install-error", it.message ?: it.toString())
                }
            }
        }

        @JavascriptInterface
        fun launch(name: String) {
            runOnUiThread { startLaunch(name) }
        }

        @JavascriptInterface
        fun installUpdate(uri: String) {
            scope.launch {
                emit("update-progress", "Скачиваем обновление")
                runCatching {
                    val apk = withContext(Dispatchers.IO) {
                        val connection = URL(uri).openConnection() as HttpURLConnection
                        connection.instanceFollowRedirects = true
                        connection.connectTimeout = 20000
                        connection.readTimeout = 30000
                        connection.connect()
                        val code = connection.responseCode
                        if (code !in 200..299) error("Сервер отдал $code")

                        val total = connection.contentLengthLong
                        val target = File(cacheDir, "mine-launcher-${System.currentTimeMillis()}.apk")
                        connection.inputStream.use { input ->
                            target.outputStream().use { output ->
                                val buffer = ByteArray(64 * 1024)
                                var readTotal = 0L
                                var lastEmit = 0L
                                while (true) {
                                    val read = input.read(buffer)
                                    if (read < 0) break
                                    output.write(buffer, 0, read)
                                    readTotal += read
                                    val now = System.currentTimeMillis()
                                    if (total > 0 && now - lastEmit > 400) {
                                        lastEmit = now
                                        emit(
                                            "update-progress",
                                            "Скачиваем обновление ${readTotal * 100 / total}%"
                                        )
                                    }
                                }
                            }
                        }
                        connection.disconnect()
                        if (target.length() < 1024) error("Файл обновления пустой")
                        target
                    }

                    val authority = "${BuildConfig.APPLICATION_ID}.provider"
                    val apkUri = FileProvider.getUriForFile(this@MineWebActivity, authority, apk)
                    val intent = Intent(Intent.ACTION_VIEW).apply {
                        setDataAndType(apkUri, "application/vnd.android.package-archive")
                        addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION or Intent.FLAG_ACTIVITY_NEW_TASK)
                    }
                    emit("update-progress", "Открываем установщик")
                    startActivity(intent)
                }.onFailure {
                    emit("update-error", it.message ?: it.toString())
                }
            }
        }

        @JavascriptInterface
        fun refresh() {
            VersionsManager.refresh("MineWeb")
        }

        @JavascriptInterface
        fun openNative() {
            runOnUiThread { openNativeScreen() }
        }
    }

    private fun accountsJson(): String {
        val current = AccountsManager.currentAccountFlow.value
        val list = JSONArray()
        AccountsManager.accountsFlow.value.forEach { account ->
            list.put(
                JSONObject()
                    .put("id", account.uniqueUUID)
                    .put("username", account.username)
                    .put("uuid", account.profileId)
                    .put("type", "offline")
                    .put("isActive", account.uniqueUUID == current?.uniqueUUID)
                    .put("createdAt", 0)
            )
        }
        return list.toString()
    }

    private fun instancesJson(): String {
        val list = JSONArray()
        VersionsManager.versions.value.forEach { version ->
            val info = version.getVersionInfo()
            list.put(
                JSONObject()
                    .put("id", version.getVersionName())
                    .put("name", version.getVersionName())
                    .put("version", info?.minecraftVersion ?: "")
                    .put("loader", loaderOf(version))
                    .put("created", version.getVersionPath().lastModified())
            )
        }
        return list.toString()
    }

    private fun loaderOf(version: Version): String {
        val loader = version.getVersionInfo()?.primaryLoader?.loader?.displayName?.lowercase() ?: return "vanilla"
        return when {
            loader.contains("fabric") -> "fabric"
            loader.contains("quilt") -> "quilt"
            else -> "vanilla"
        }
    }

    private fun findVersion(name: String): Version? =
        VersionsManager.versions.value.firstOrNull { it.getVersionName() == name }

    private fun openNativeScreen() {
        startActivity(Intent(this, MainActivity::class.java))
    }

    /**
     * Раскладка экранных кнопок.
     *
     * Свою раскладку кладём вместо стандартной залитовской (она заточена
     * под мышь и вкладки). Файл перезаписываем только если он ещё не наш,
     * чтобы не убивать пользовательские правки и выбранную раскладку.
     */
    private fun ensureControlLayout() {
        scope.launch(Dispatchers.IO) {
            runCatching {
                val dir = PathManager.DIR_CONTROL_LAYOUTS
                val ours = assets.open("default_layout.json").bufferedReader().use { it.readText() }
                dir.listFiles()?.forEach { file ->
                    if (!file.isFile || !file.extension.equals("json", true)) return@forEach
                    val info = runCatching { JSONObject(file.readText()).optJSONObject("info") }.getOrNull()
                    val name = info?.optJSONObject("name")?.optString("default") ?: ""
                    val version = info?.optString("versionName") ?: ""
                    if (name == "default" && version != "mine-1") {
                        file.writeText(ours)
                    }
                }
            }
            ControlManager.checkDefaultAndRefresh(this@MineWebActivity)
        }
    }

    /** Проверяем android-info в репозитории: если код новее сборки, показываем плашку */
    private fun checkUpdate() {
        scope.launch {
            runCatching {
                val text = withContext(Dispatchers.IO) { URL(UPDATE_INFO_URL).readText() }
                val info = JSONObject(text)
                if (info.optInt("code", 0) <= BuildConfig.VERSION_CODE) return@launch

                val version = info.optString("version")
                val abi = Build.SUPPORTED_ABIS.firstOrNull() ?: "arm64-v8a"
                val arch = when {
                    abi.contains("arm64") -> "arm64"
                    abi.contains("armeabi") -> "arm"
                    abi.contains("x86_64") -> "x86_64"
                    abi.contains("x86") -> "x86"
                    else -> "all"
                }

                val files = info.optJSONArray("files") ?: JSONArray()
                var uri = ""
                for (index in 0 until files.length()) {
                    val file = files.getJSONObject(index)
                    if (file.optString("arch") == arch) {
                        uri = file.optString("uri")
                        break
                    }
                }
                if (uri.isEmpty() && files.length() > 0) {
                    uri = files.getJSONObject(0).optString("uri")
                }
                if (uri.isNotEmpty()) {
                    emit(
                        "update-available",
                        JSONObject().put("version", version).put("uri", uri).toString()
                    )
                }
            }
        }
    }

    private fun modsDir(version: Version): File = File(version.getGameHome(), "mods")

    private fun totalRamMb(): Int {
        val manager = getSystemService(Context.ACTIVITY_SERVICE) as ActivityManager
        val info = ActivityManager.MemoryInfo()
        manager.getMemoryInfo(info)
        return (info.totalMem / (1024 * 1024)).toInt()
    }

    private fun maxMemoryMb(): Int {
        val total = totalRamMb()
        return (total / 2).coerceIn(1024, 4096)
    }

    private fun startLaunch(name: String) {
        if (launching) return

        val version = findVersion(name)
        if (version == null) {
            emit("launch-error", "Версия не найдена")
            return
        }
        if (AccountsManager.currentAccountFlow.value == null) {
            emit("launch-error", "Сначала добавь аккаунт")
            openNativeScreen()
            return
        }

        launching = true
        emit("launch-start", name)

        val flow = GameLaunchFlow(scope)
        flow.launch(
            context = this,
            version = version,
            exitActivity = {},
            onComplete = {
                launching = false
                emit("launch-done", name)
                emitState()
            },
            onError = { message ->
                launching = false
                emit("launch-error", message.message.toAndroidString(this))
            }
        )
    }

    private fun emitState() = emit("state", "{}")

    private fun emit(type: String, payload: String) {
        val script = "window.__mineNativeEvent && window.__mineNativeEvent(${JSONObject.quote(type)}, ${JSONObject.quote(payload)})"
        web.post { web.evaluateJavascript(script, null) }
    }
}
