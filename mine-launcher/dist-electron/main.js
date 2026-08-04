import { app as G, Menu as Pe, BrowserWindow as we, ipcMain as m, shell as Ie, dialog as te } from "electron";
import { fileURLToPath as _e } from "node:url";
import a from "node:path";
import n from "node:fs";
import re from "node:https";
import oe from "node:http";
import Ce from "node:crypto";
import { execSync as K, spawn as Me } from "node:child_process";
const B = /* @__PURE__ */ new Map();
function Y() {
  const t = G.getPath("userData"), s = a.join(t, ".mine-launcher");
  return n.existsSync(s) || n.mkdirSync(s, { recursive: !0 }), s;
}
function H(t) {
  const s = Ce.createHash("md5");
  s.update(`OfflinePlayer:${t}`);
  const e = s.digest();
  e[6] = e[6] & 15 | 48, e[8] = e[8] & 63 | 128;
  const i = e.toString("hex");
  return `${i.slice(0, 8)}-${i.slice(8, 12)}-${i.slice(12, 16)}-${i.slice(16, 20)}-${i.slice(20, 32)}`;
}
function L(t) {
  return new Promise((s, e) => {
    (t.startsWith("https") ? re : oe).get(t, (r) => {
      if (r.statusCode && r.statusCode >= 300 && r.statusCode < 400 && r.headers.location)
        return L(r.headers.location).then(s).catch(e);
      if (r.statusCode !== 200)
        return e(new Error(`HTTP ${r.statusCode} loading ${t}`));
      let o = "";
      r.on("data", (d) => {
        o += d;
      }), r.on("end", () => {
        try {
          s(JSON.parse(o));
        } catch (d) {
          e(d);
        }
      });
    }).on("error", e);
  });
}
function A(t, s) {
  return new Promise((e, i) => {
    const r = a.dirname(s);
    n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
    const o = n.createWriteStream(s);
    (t.startsWith("https") ? re : oe).get(t, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), A(c.headers.location, s).then(e).catch(i);
      if (c.statusCode !== 200)
        return o.close(), n.unlink(s, () => {
        }), i(new Error(`Failed to download ${t}: HTTP ${c.statusCode}`));
      c.pipe(o), o.on("finish", () => {
        o.close(() => e());
      });
    }).on("error", (c) => {
      o.close(), n.unlink(s, () => {
      }), i(c);
    });
  });
}
function se(t, s) {
  if (n.existsSync(t))
    try {
      const e = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::OpenRead('${t.replace(/'/g, "''")}').Entries | Where-Object { $_.FullName -like '*.dll' } | ForEach-Object { $dest = [System.IO.Path]::Combine('${s.replace(/'/g, "''")}', $_.Name); [System.IO.Compression.ZipFileExtensions]::ExtractToFile($_, $dest, $true) }"`;
      K(e, { stdio: "ignore" });
    } catch {
      try {
        K(`powershell -Command "Expand-Archive -Path '${t}' -DestinationPath '${s}' -Force"`, { stdio: "ignore" });
      } catch {
      }
    }
}
function ke(t) {
  if (!t || t.length === 0) return !0;
  let s = !1;
  for (const e of t)
    e.action === "allow" ? (!e.os || e.os.name === "windows") && (s = !0) : e.action === "disallow" && (!e.os || e.os.name === "windows") && (s = !1);
  return s;
}
async function ne() {
  const t = [], s = process.platform === "win32", e = s ? "javaw.exe" : "java", i = Y(), r = a.join(i, "java", "java-17"), o = (p) => {
    if (!n.existsSync(p)) return null;
    const c = n.readdirSync(p);
    for (const j of c) {
      const C = a.join(p, j);
      if (j.toLowerCase() === "javaw.exe") return C;
      if (n.statSync(C).isDirectory()) {
        const x = o(C);
        if (x) return x;
      }
    }
    return null;
  }, d = o(r);
  if (d && t.push(d), process.env.JAVA_HOME) {
    const p = a.join(process.env.JAVA_HOME, "bin", e);
    n.existsSync(p) && t.push(p);
  }
  if (s) {
    const p = [
      "C:\\Program Files\\Java",
      "C:\\Program Files (x86)\\Java",
      "C:\\Program Files\\Eclipse Adoptium",
      "C:\\Program Files\\Microsoft",
      "C:\\Program Files\\BellSoft",
      "C:\\Program Files\\Amazon Corretto",
      a.join(process.env.LOCALAPPDATA || "", "Programs", "AdoptOpenJDK"),
      "C:\\Program Files (x86)\\Minecraft Launcher\\runtime"
    ];
    for (const c of p)
      if (n.existsSync(c))
        try {
          const j = n.readdirSync(c);
          for (const C of j) {
            const x = a.join(c, C, "bin", e);
            n.existsSync(x) && !t.includes(x) && t.push(x);
          }
        } catch {
        }
  }
  return t;
}
async function Ae(t, s) {
  const e = Y(), i = a.join(e, "java", "java-17"), r = (j) => {
    if (!n.existsSync(j)) return null;
    const C = n.readdirSync(j);
    for (const x of C) {
      const M = a.join(j, x);
      if (x.toLowerCase() === "javaw.exe") return M;
      if (n.statSync(M).isDirectory()) {
        const J = r(M);
        if (J) return J;
      }
    }
    return null;
  }, o = r(i);
  if (o)
    return o;
  t({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: "Авто-скачивание OpenJDK Java 17...",
    progress: 15
  }), s({ timestamp: Date.now(), type: "info", message: "Java не найдена на ПК. Автоматическое скачивание OpenJDK Java 17 (Temurin)..." });
  const d = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jre_x64_windows_hotspot_17.0.10_7.zip", p = a.join(e, "java", "java-17.zip");
  n.existsSync(a.dirname(p)) || n.mkdirSync(a.dirname(p), { recursive: !0 }), t({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: "Загрузка OpenJDK Java 17 (40 MB)...",
    progress: 35
  }), await A(d, p), t({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: "Распаковка Java 17 Runtime...",
    progress: 75
  }), s({ timestamp: Date.now(), type: "info", message: "Распаковка архива Java 17..." }), n.existsSync(i) || n.mkdirSync(i, { recursive: !0 });
  try {
    K(`powershell -Command "Expand-Archive -Path '${p}' -DestinationPath '${i}' -Force"`), n.unlinkSync(p);
  } catch (j) {
    s({ timestamp: Date.now(), type: "warn", message: `Ошибка PowerShell распаковки: ${j.message}` });
  }
  const c = r(i);
  if (!c)
    throw new Error("Не удалось найти javaw.exe после распаковки Java 17. Установите Java вручную.");
  return s({ timestamp: Date.now(), type: "info", message: `Java 17 успешно установлена: ${c}` }), c;
}
async function xe() {
  return await L("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function Te(t, s, e) {
  var M, J, W, le, de, ue, me, pe;
  const i = Y(), r = a.join(i, "instances", t.instanceId), o = a.join(i, "assets"), d = a.join(i, "libraries"), p = a.join(i, "versions"), c = a.join(r, "natives");
  n.existsSync(r) || n.mkdirSync(r, { recursive: !0 }), n.existsSync(c) || n.mkdirSync(c, { recursive: !0 });
  const j = a.join(r, "options.txt");
  n.writeFileSync(j, `version:2586
chatVisibility:0
forceUnicodeFont:false
realmsNotifications:false
hideServerAddress:false
`, "utf-8");
  const x = a.join(r, ".fabric");
  if (n.existsSync(x))
    try {
      const S = (O) => {
        const fe = n.readdirSync(O);
        for (const U of fe) {
          const E = a.join(O, U);
          n.statSync(E).isDirectory() ? S(E) : U.endsWith(".tmp") && n.unlinkSync(E);
        }
      };
      S(x);
    } catch {
    }
  try {
    let S = t.javaPath, O = !1;
    if (S && n.existsSync(S))
      try {
        K(`"${S}" -version 2>&1`), O = !0;
      } catch {
      }
    if (!O) {
      const l = await ne();
      for (const h of l)
        if (n.existsSync(h))
          try {
            K(`"${h}" -version 2>&1`), S = h, O = !0;
            break;
          } catch {
          }
    }
    O || (S = await Ae(s, e)), e({
      timestamp: Date.now(),
      type: "info",
      message: `Используемый файл Java: ${S}`
    }), s({
      instanceId: t.instanceId,
      stage: "checking",
      statusText: "Получение манифеста версий...",
      progress: 10
    });
    const U = (await xe()).versions.find((l) => l.id === t.version);
    if (!U)
      throw new Error(`Версия Minecraft ${t.version} не найдена в манифесте Mojang`);
    s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: `Загрузка структуры версии ${t.version}...`,
      progress: 20
    });
    const E = a.join(p, t.version, `${t.version}.json`), D = await L(U.url);
    if (n.existsSync(a.dirname(E)) || n.mkdirSync(a.dirname(E), { recursive: !0 }), n.writeFileSync(E, JSON.stringify(D, null, 2)), (M = D.assetIndex) != null && M.url) {
      const l = a.join(o, "indexes"), h = a.join(l, `${D.assetIndex.id}.json`);
      n.existsSync(h) || (s({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Загрузка манифеста ресурсов...",
        progress: 25
      }), await A(D.assetIndex.url, h));
      try {
        const I = JSON.parse(n.readFileSync(h, "utf-8")).objects || {}, b = Object.keys(I), R = a.join(o, "objects"), g = [];
        for (const k of b) {
          const $ = I[k].hash, N = $.slice(0, 2), q = a.join(R, N, $);
          n.existsSync(q) || g.push({
            hash: $,
            url: `https://resources.download.minecraft.net/${N}/${$}`,
            dest: q
          });
        }
        if (g.length > 0) {
          s({
            instanceId: t.instanceId,
            stage: "downloading",
            statusText: `Загрузка ресурсов (${g.length} файлов)...`,
            progress: 30
          });
          const k = 75;
          let T = 0;
          for (let $ = 0; $ < g.length; $ += k) {
            const N = g.slice($, $ + k);
            await Promise.all(
              N.map((ve) => A(ve.url, ve.dest).catch(() => {
              }))
            ), T += N.length;
            const q = Math.round(30 + T / g.length * 15);
            s({
              instanceId: t.instanceId,
              stage: "downloading",
              statusText: `Загрузка ресурсов (${T}/${g.length})...`,
              progress: q
            });
          }
        }
      } catch (v) {
        e({ timestamp: Date.now(), type: "warn", message: `Ошибка ресурсов: ${v.message}` });
      }
    }
    const ee = a.join(p, t.version, `${t.version}.jar`);
    !n.existsSync(ee) && ((W = (J = D.downloads) == null ? void 0 : J.client) != null && W.url) && (s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка Minecraft client.jar...",
      progress: 50
    }), await A(D.downloads.client.url, ee)), s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка и распаковка библиотек...",
      progress: 60
    });
    const V = [], De = D.libraries || [];
    for (const l of De)
      if (ke(l.rules)) {
        if ((le = l.downloads) != null && le.artifact) {
          const h = l.downloads.artifact.path, v = a.join(d, h);
          if (!n.existsSync(v))
            try {
              await A(l.downloads.artifact.url, v);
            } catch {
            }
          n.existsSync(v) && (V.push(v), (h.includes("natives") || l.name.includes("natives")) && se(v, c));
        }
        if ((de = l.downloads) != null && de.classifiers) {
          const h = l.downloads.classifiers, v = h["natives-windows"] || h["natives-windows-64"] || h["natives-windows-x86"];
          if (v) {
            const I = v.path, b = a.join(d, I);
            if (!n.existsSync(b))
              try {
                await A(v.url, b);
              } catch {
              }
            n.existsSync(b) && se(b, c);
          }
        }
        if (!((ue = l.downloads) != null && ue.artifact) && l.name) {
          const h = l.name.split(":"), v = h[0].replace(/\./g, "/"), I = h[1], b = h[2], R = `${v}/${I}/${b}/${I}-${b}.jar`, g = a.join(d, R), k = l.url ? `${l.url}${R}` : `https://libraries.minecraft.net/${R}`;
          if (!n.existsSync(g))
            try {
              await A(k, g);
            } catch {
            }
          n.existsSync(g) && (V.push(g), l.name.includes("natives") && se(g, c));
        }
      }
    V.push(ee);
    let he = D.mainClass || "net.minecraft.client.main.Main";
    if (t.loader === "fabric") {
      s({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Настройка Fabric...",
        progress: 75
      });
      try {
        const l = await L(`https://meta.fabricmc.net/v2/versions/loader/${t.version}`);
        if (l && l.length > 0) {
          const h = l[0].loader.version, v = await L(`https://meta.fabricmc.net/v2/versions/loader/${t.version}/${h}/profile/json`);
          if (v.mainClass && (he = v.mainClass), v.libraries)
            for (const I of v.libraries) {
              const b = I.name.split(":"), R = b[0].replace(/\./g, "/"), g = b[1], k = b[2], T = `${R}/${g}/${k}/${g}-${k}.jar`, $ = a.join(d, T), N = I.url ? `${I.url}${T}` : `https://maven.fabricmc.net/${T}`;
              if (!n.existsSync($))
                try {
                  await A(N, $);
                } catch {
                }
              n.existsSync($) && V.unshift($);
            }
        }
      } catch (l) {
        e({ timestamp: Date.now(), type: "warn", message: `Fabric метаданные: ${l.message}` });
      }
    }
    s({
      instanceId: t.instanceId,
      stage: "launching",
      statusText: "Запуск Minecraft...",
      progress: 90
    });
    const be = V.join(a.delimiter), f = [];
    f.push(`-Xms${t.memoryMin || 1024}M`), f.push(`-Xmx${t.memoryMax || 4096}M`), f.push(`-Djava.library.path=${c}`), f.push("-Dminecraft.api.auth.host=http://127.0.0.1"), f.push("-Dminecraft.api.account.host=http://127.0.0.1"), f.push("-Dminecraft.api.session.host=http://127.0.0.1"), f.push("-Dminecraft.api.services.host=http://127.0.0.1"), f.push("-XX:+UseG1GC", "-XX:+UnlockExperimentalVMOptions", "-XX:G1NewSizePercent=20", "-XX:G1ReservePercent=20", "-XX:MaxGCPauseMillis=50", "-XX:G1HeapRegionSize=32M"), t.customJvmArgs && f.push(...t.customJvmArgs.split(" ").filter(Boolean)), f.push("-cp", be), f.push(he);
    const ye = (t.uuid || H(t.username || "Player")).replace(/-/g, "");
    if (D.minecraftArguments && typeof D.minecraftArguments == "string") {
      const l = D.minecraftArguments.split(" ");
      for (const h of l) {
        let v = h.replace("${auth_player_name}", t.username || "Player").replace("${version_name}", t.version).replace("${game_directory}", r).replace("${assets_root}", o).replace("${assets_index_name}", ((me = D.assetIndex) == null ? void 0 : me.id) || t.version).replace("${auth_uuid}", ye).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", "release");
        f.push(v);
      }
    } else
      f.push("--username", t.username || "Player"), f.push("--version", t.version), f.push("--gameDir", r), f.push("--assetsDir", o), f.push("--assetIndex", ((pe = D.assetIndex) == null ? void 0 : pe.id) || t.version), f.push("--uuid", ye), f.push("--accessToken", "0"), f.push("--userType", "mojang"), f.push("--versionType", "release");
    e({
      timestamp: Date.now(),
      type: "info",
      message: `Команда запуска: "${S}" ${f.join(" ")}`
    });
    const X = Me(S || "javaw", f, {
      cwd: r,
      detached: !0
    });
    B.set(t.instanceId, X), X.stdout.on("data", (l) => {
      e({ timestamp: Date.now(), type: "info", message: l.toString() });
    }), X.stderr.on("data", (l) => {
      e({ timestamp: Date.now(), type: "warn", message: l.toString() });
    }), X.on("error", (l) => {
      B.delete(t.instanceId), s({
        instanceId: t.instanceId,
        stage: "error",
        statusText: `Ошибка процесса: ${l.message}`,
        progress: 0,
        error: l.message
      }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${l.message}` });
    }), X.on("exit", (l) => {
      B.delete(t.instanceId), s({
        instanceId: t.instanceId,
        stage: "idle",
        statusText: `Игра завершена (код ${l})`,
        progress: 0
      }), e({ timestamp: Date.now(), type: "info", message: `Minecraft завершился с кодом ${l}` });
    }), s({
      instanceId: t.instanceId,
      stage: "running",
      statusText: "Игра запущена!",
      progress: 100
    });
  } catch (S) {
    s({
      instanceId: t.instanceId,
      stage: "error",
      statusText: `Ошибка: ${S.message}`,
      progress: 0,
      error: S.message
    }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${S.message}` });
  }
}
function Fe(t) {
  const s = B.get(t);
  return s ? (s.kill(), B.delete(t), !0) : !1;
}
Pe.setApplicationMenu(null);
const ge = a.dirname(_e(import.meta.url));
process.env.APP_ROOT = a.join(ge, "..");
const ae = process.env.VITE_DEV_SERVER_URL, Ve = a.join(process.env.APP_ROOT, "dist-electron"), Se = a.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = ae ? a.join(process.env.APP_ROOT, "public") : Se;
let u = null;
const P = Y(), Z = a.join(P, "accounts.json"), Q = a.join(P, "instances.json"), je = a.join(P, "settings.json"), F = a.join(P, "skins");
n.existsSync(F) || n.mkdirSync(F, { recursive: !0 });
function ce(t, s) {
  try {
    if (n.existsSync(t))
      return JSON.parse(n.readFileSync(t, "utf-8"));
  } catch (e) {
    console.error(`Failed loading ${t}:`, e);
  }
  return s;
}
function z(t, s) {
  try {
    n.writeFileSync(t, JSON.stringify(s, null, 2), "utf-8");
  } catch (e) {
    console.error(`Failed saving ${t}:`, e);
  }
}
let y = ce(Z, [
  { id: "1", username: "Test", uuid: H("Test"), type: "offline", isActive: !0, createdAt: Date.now() - 5e4 },
  { id: "2", username: "Nick 2", uuid: H("Nick 2"), type: "offline", isActive: !1, createdAt: Date.now() - 4e4 },
  { id: "3", username: "Nick 3", uuid: H("Nick 3"), type: "offline", isActive: !1, createdAt: Date.now() - 3e4 }
]), _ = ce(Q, [
  {
    id: "default-1",
    name: "1.20.4",
    version: "1.20.4",
    loader: "vanilla",
    created: Date.now() - 1e5,
    lastPlayed: Date.now() - 5e4,
    memoryMin: 1024,
    memoryMax: 4096
  },
  {
    id: "fabric-1",
    name: "1.20.1",
    version: "1.20.1",
    loader: "fabric",
    created: Date.now() - 8e4,
    memoryMin: 2048,
    memoryMax: 4096
  }
]), w = ce(je, {
  javaPath: "",
  memoryMin: 1024,
  memoryMax: 4096,
  customJvmArgs: "",
  closeLauncherOnGameStart: !1,
  gameDir: P,
  useProxy: !1,
  proxyType: "http",
  proxyHost: "",
  proxyPort: 8080,
  launcherFont: "system-ui"
});
function $e() {
  u = new we({
    width: 1050,
    height: 720,
    minWidth: 900,
    minHeight: 650,
    frame: !1,
    titleBarStyle: "hidden",
    icon: a.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: a.join(ge, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), u.webContents.on("did-finish-load", () => {
    u == null || u.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), ae ? u.loadURL(ae) : u.loadFile(a.join(Se, "index.html"));
}
G.on("window-all-closed", () => {
  process.platform !== "darwin" && (G.quit(), u = null);
});
G.on("activate", () => {
  we.getAllWindows().length === 0 && $e();
});
function ie(t, s) {
  return new Promise((e, i) => {
    const r = a.dirname(s);
    n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
    const o = n.createWriteStream(s);
    (t.startsWith("https") ? re : oe).get(t, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), ie(c.headers.location, s).then(e).catch(i);
      if (c.statusCode !== 200)
        return o.close(), n.unlink(s, () => {
        }), i(new Error(`Failed download ${t}: HTTP ${c.statusCode}`));
      c.pipe(o), o.on("finish", () => {
        o.close(() => e());
      });
    }).on("error", (c) => {
      o.close(), n.unlink(s, () => {
      }), i(c);
    });
  });
}
function Je() {
  m.handle("minimize-window", () => {
    u == null || u.minimize();
  }), m.handle("maximize-window", () => u ? u.isMaximized() ? (u.unmaximize(), !1) : (u.maximize(), !0) : !1), m.handle("close-window", () => {
    u == null || u.close();
  }), m.handle("is-maximized", () => (u == null ? void 0 : u.isMaximized()) || !1), m.handle("get-accounts", () => y), m.handle("add-account", (t, s) => {
    const e = s.trim();
    if (!e) throw new Error("Имя пользователя не может быть пустым");
    if (y.some((o) => o.username.toLowerCase() === e.toLowerCase()))
      throw new Error(`Никнейм "${e}" уже существует!`);
    const r = {
      id: Date.now().toString(),
      username: e,
      uuid: H(e),
      type: "offline",
      isActive: y.length === 0,
      createdAt: Date.now()
    };
    return y.push(r), z(Z, y), y;
  }), m.handle("set-active-account", (t, s) => (y = y.map((e) => ({
    ...e,
    isActive: e.id === s
  })), z(Z, y), y)), m.handle("delete-account", (t, s) => (y = y.filter((e) => e.id !== s), y.length > 0 && !y.some((e) => e.isActive) && (y[0].isActive = !0), z(Z, y), y)), m.handle("get-instances", () => _), m.handle("create-instance", (t, s) => {
    const e = {
      id: "inst-" + Date.now(),
      name: s.version,
      version: s.version,
      loader: s.loader || "vanilla",
      created: Date.now(),
      memoryMin: w.memoryMin,
      memoryMax: w.memoryMax
    };
    _.push(e), z(Q, _);
    const i = a.join(P, "instances", e.id), r = a.join(i, "mods");
    return n.existsSync(r) || n.mkdirSync(r, { recursive: !0 }), _;
  }), m.handle("delete-instance", (t, s) => {
    _ = _.filter((i) => i.id !== s), z(Q, _);
    const e = a.join(P, "instances", s);
    return n.existsSync(e) && n.rmSync(e, { recursive: !0, force: !0 }), _;
  }), m.handle("get-versions", async () => {
    try {
      return await xe();
    } catch (t) {
      return console.error("Failed to get versions:", t), { latest: { release: "1.20.4", snapshot: "1.20.4" }, versions: [] };
    }
  }), m.handle("get-settings", () => w), m.handle("save-settings", (t, s) => (w = { ...w, ...s }, z(je, w), w)), m.handle("detect-java", async () => await ne()), m.handle("launch-instance", async (t, s) => {
    const e = _.find((d) => d.id === s);
    if (!e) throw new Error("Инстанс не найден");
    const i = y.find((d) => d.isActive) || y[0];
    if (!i) throw new Error("Добавьте хотя бы один аккаунт!");
    e.lastPlayed = Date.now(), z(Q, _);
    const r = e.javaPath || w.javaPath || (await ne())[0];
    let o = e.jvmArgs || w.customJvmArgs || "";
    return w.useProxy && w.proxyHost && w.proxyPort && (w.proxyType === "socks5" ? o += ` -DsocksProxyHost=${w.proxyHost} -DsocksProxyPort=${w.proxyPort}` : o += ` -Dhttp.proxyHost=${w.proxyHost} -Dhttp.proxyPort=${w.proxyPort} -Dhttps.proxyHost=${w.proxyHost} -Dhttps.proxyPort=${w.proxyPort}`), Te(
      {
        instanceId: e.id,
        instanceName: e.name,
        version: e.version,
        loader: e.loader || "vanilla",
        username: i.username,
        uuid: i.uuid,
        memoryMin: e.memoryMin || w.memoryMin || 1024,
        memoryMax: e.memoryMax || w.memoryMax || 4096,
        javaPath: r,
        customJvmArgs: o.trim()
      },
      (d) => {
        u == null || u.webContents.send("launch-progress", d);
      },
      (d) => {
        u == null || u.webContents.send("game-log", d);
      }
    ), !0;
  }), m.handle("stop-instance", (t, s) => Fe(s)), m.handle("open-instance-folder", (t, s) => {
    const e = a.join(P, "instances", s);
    n.existsSync(e) || n.mkdirSync(e, { recursive: !0 }), Ie.openPath(e);
  }), m.handle("get-instance-mods", (t, s) => {
    const e = a.join(P, "instances", s, "mods");
    if (!n.existsSync(e)) return [];
    try {
      return n.readdirSync(e).map((r) => {
        const o = a.join(e, r), d = n.statSync(o), p = r.endsWith(".jar"), c = r.replace(/\.jar(\.disabled)?$/, "");
        return {
          id: r,
          filename: r,
          name: c,
          enabled: p,
          size: d.size
        };
      });
    } catch {
      return [];
    }
  }), m.handle("toggle-mod", (t, { instanceId: s, modFilename: e }) => {
    const i = a.join(P, "instances", s, "mods"), r = a.join(i, e);
    if (!n.existsSync(r)) return !1;
    let o = e;
    e.endsWith(".jar") ? o = e + ".disabled" : e.endsWith(".jar.disabled") && (o = e.replace(/\.disabled$/, ""));
    const d = a.join(i, o);
    return n.renameSync(r, d), !0;
  }), m.handle("download-mod-file", async (t, { instanceId: s, downloadUrl: e, filename: i }) => {
    const r = a.join(P, "instances", s, "mods");
    n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
    const o = a.join(r, i);
    return await ie(e, o), !0;
  }), m.handle("add-mod-file", async (t, s) => {
    if (!u) return !1;
    const e = await te.showOpenDialog(u, {
      title: "Выберите файл мода (.jar)",
      filters: [{ name: "Minecraft Mods", extensions: ["jar"] }],
      properties: ["openFile", "multiSelections"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const i = a.join(P, "instances", s, "mods");
    n.existsSync(i) || n.mkdirSync(i, { recursive: !0 });
    for (const r of e.filePaths) {
      const o = a.join(i, a.basename(r));
      n.copyFileSync(r, o);
    }
    return !0;
  }), m.handle("save-user-skin", async (t, s) => {
    if (!u) return !1;
    const e = await te.showOpenDialog(u, {
      title: "Выберите файл скина Minecraft (.png)",
      filters: [{ name: "Minecraft Skins", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const i = a.join(F, `${s}.png`);
    return n.copyFileSync(e.filePaths[0], i), i;
  }), m.handle("fetch-online-skin", async (t, { username: s, targetUsername: e }) => {
    const i = a.join(F, `${s}.png`), r = [
      `https://ely.by/services/skins-buffer/skins/${encodeURIComponent(e)}.png`,
      `https://minotar.net/skin/${encodeURIComponent(e)}`,
      `https://crafatar.com/skins/${H(e)}`
    ];
    for (const o of r)
      try {
        if (await ie(o, i), n.existsSync(i) && n.statSync(i).size > 100)
          return `data:image/png;base64,${n.readFileSync(i).toString("base64")}`;
      } catch {
      }
    throw new Error(`Скин для никнейма "${e}" не найден на серверах`);
  }), m.handle("get-profile-stats", (t, s) => {
    let e = 0;
    const i = [];
    let r = "Нет информации", o = "Нет информации", d = 0, p = 0;
    try {
      for (const x of _) {
        x.lastPlayed && (p = Math.max(p, x.lastPlayed), d += 45);
        const M = a.join(P, "instances", x.id, "saves");
        if (n.existsSync(M)) {
          const J = n.readdirSync(M);
          for (const W of J)
            n.statSync(a.join(M, W)).isDirectory() && (e++, i.push(W));
        }
      }
      i.length > 0 && (r = i[0]);
    } catch {
    }
    const c = y.find((x) => x.username === s) || y.find((x) => x.isActive) || y[0], j = (d / 60).toFixed(1), C = p ? new Date(p).toLocaleString() : "Нет информации";
    return {
      username: c ? c.username : s,
      uuid: c ? c.uuid : "",
      worldsCount: e,
      totalPlayTimeHours: d > 0 ? `${j} ч.` : "Нет информации",
      lastPlayedFormatted: C,
      favoriteWorld: r,
      favoriteServer: o
    };
  }), m.handle("get-user-skin", (t, s) => {
    const e = a.join(F, `${s}.png`);
    return n.existsSync(e) ? `data:image/png;base64,${n.readFileSync(e).toString("base64")}` : null;
  }), m.handle("upload-user-skin", async (t, s) => {
    const { canceled: e, filePaths: i } = await te.showOpenDialog({
      title: "Выберите скин Minecraft (.png)",
      properties: ["openFile"],
      filters: [{ name: "Minecraft Skin (*.png)", extensions: ["png"] }]
    });
    if (!e && i.length > 0) {
      n.existsSync(F) || n.mkdirSync(F, { recursive: !0 });
      const r = a.join(F, `${s}.png`);
      return n.copyFileSync(i[0], r), `data:image/png;base64,${n.readFileSync(r).toString("base64")}`;
    }
    return null;
  });
}
G.whenReady().then(() => {
  Je(), $e();
});
export {
  Ve as MAIN_DIST,
  Se as RENDERER_DIST,
  ae as VITE_DEV_SERVER_URL
};
