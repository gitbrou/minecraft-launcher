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
import android.content.Intent
import android.graphics.Color
import android.os.Bundle
import android.webkit.JavascriptInterface
import android.webkit.WebView
import android.webkit.WebViewClient
import com.movtery.zalithlauncher.BuildConfig
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

/**
 * Экран лаунчера на нашем интерфейсе.
 *
 * Страница лежит в assets/mineui, общается с игровым движком через [MineBridge].
 * Запуск, список версий и аккаунты берутся из движка Zalith, поэтому поведение
 * то же, что у нативного интерфейса.
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
            AccountsManager.currentAccountFlow.collect { emitState() }
        }
        VersionsManager.refresh("MineWeb")
    }

    override fun onDestroy() {
        scope.cancel()
        web.destroy()
        super.onDestroy()
    }

    private inner class MineBridge {
        @JavascriptInterface
        fun getState(): String = stateJson()

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

        @JavascriptInterface
        fun launch(name: String) {
            runOnUiThread { startLaunch(name) }
        }
    }

    private fun startLaunch(name: String) {
        if (launching) return

        val version = VersionsManager.versions.value.firstOrNull { it.getVersionName() == name }
        if (version == null) {
            emit("launch-error", "Версия не найдена. Обнови список.")
            return
        }
        if (AccountsManager.currentAccountFlow.value == null) {
            emit("need-account", "Сначала добавь аккаунт")
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

    private fun stateJson(): String {
        val versions = JSONArray()
        VersionsManager.versions.value.forEach { version ->
            val info = version.getVersionInfo()
            versions.put(
                JSONObject()
                    .put("name", version.getVersionName())
                    .put("mc", info?.minecraftVersion ?: "")
                    .put("loader", info?.primaryLoader?.loader?.displayName ?: "Vanilla")
                    .put("mods", countMods(version))
            )
        }

        return JSONObject()
            .put("version", BuildConfig.VERSION_NAME)
            .put("active", AccountsManager.currentAccountFlow.value?.username ?: JSONObject.NULL)
            .put("versions", versions)
            .toString()
    }

    private fun countMods(version: Version): Int {
        val modsDir = File(version.getGameHome(), "mods")
        return modsDir.listFiles()
            ?.count { it.isFile && it.name.endsWith(".jar", ignoreCase = true) }
            ?: 0
    }

    private fun emitState() {
        emit("state", stateJson())
    }

    private fun emit(type: String, payload: String) {
        val script = "window.__mineEvent && window.__mineEvent(${JSONObject.quote(type)}, ${JSONObject.quote(payload)})"
        web.post { web.evaluateJavascript(script, null) }
    }
}
