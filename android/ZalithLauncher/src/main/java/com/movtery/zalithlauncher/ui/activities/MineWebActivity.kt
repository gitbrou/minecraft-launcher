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
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import com.movtery.zalithlauncher.BuildConfig
import com.movtery.zalithlauncher.game.account.Account
import com.movtery.zalithlauncher.game.account.AccountType
import com.movtery.zalithlauncher.game.account.AccountsManager
import com.movtery.zalithlauncher.game.launch.GameLaunchFlow
import com.movtery.zalithlauncher.game.version.installed.Version
import com.movtery.zalithlauncher.game.version.installed.VersionsManager
import com.movtery.zalithlauncher.ui.toAndroidString
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.SupervisorJob
import kotlinx.coroutines.cancel
import kotlinx.coroutines.flow.collect
import kotlinx.coroutines.launch
import org.json.JSONArray
import org.json.JSONObject
import java.io.File
import java.net.HttpURLConnection
import java.net.URL

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

    @SuppressLint("SetJavaScriptEnabled")
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

        web = WebView(this).apply {
            setBackgroundColor(Color.parseColor("#131313"))
            settings.javaScriptEnabled = true
            settings.domStorageEnabled = true
            settings.allowFileAccess = true
            addJavascriptInterface(MineBridge(), "MineNative")
            webViewClient = WebViewClient()
        }
        setContentView(web)
        web.loadUrl("file:///android_asset/mineui/index.html")

        scope.launch {
            VersionsManager.versions.collect { emitState() }
        }
        scope.launch {
            AccountsManager.accountsFlow.collect { emitState() }
        }
        VersionsManager.refresh("MineWeb")
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
            AccountsManager.saveAccount(account)
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
            val memory = maxMemoryMb()
            return JSONObject()
                .put("javaPath", "")
                .put("memoryMin", 1024)
                .put("memoryMax", memory)
                .put("customJvmArgs", "")
                .put("closeLauncherOnGameStart", false)
                .put("fullscreen", false)
                .put("hideLauncher", false)
                .toString()
        }

        @JavascriptInterface
        @Suppress("UNUSED_PARAMETER")
        fun saveSettings(json: String): Boolean {
            // Память и параметры запуска пока задаются в нативном режиме
            return true
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
        fun launch(name: String) {
            runOnUiThread { startLaunch(name) }
        }

        @JavascriptInterface
        fun refresh() {
            VersionsManager.refresh("MineWeb")
        }

        @JavascriptInterface
        fun openNative() {
            runOnUiThread {
                startActivity(Intent(this@MineWebActivity, MainActivity::class.java))
            }
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
            openNative()
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
