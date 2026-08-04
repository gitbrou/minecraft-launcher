import { app as K, Menu as Pe, BrowserWindow as we, ipcMain as f, shell as Ie, dialog as te } from "electron";
import { fileURLToPath as _e } from "node:url";
import i from "node:path";
import n from "node:fs";
import re from "node:https";
import oe from "node:http";
import ke from "node:crypto";
import { execSync as G, spawn as Ce } from "node:child_process";
const X = /* @__PURE__ */ new Map();
function Y() {
  const t = K.getPath("userData"), s = i.join(t, ".mine-launcher");
  return n.existsSync(s) || n.mkdirSync(s, { recursive: !0 }), s;
}
function H(t) {
  const s = ke.createHash("md5");
  s.update(`OfflinePlayer:${t}`);
  const e = s.digest();
  e[6] = e[6] & 15 | 48, e[8] = e[8] & 63 | 128;
  const r = e.toString("hex");
  return `${r.slice(0, 8)}-${r.slice(8, 12)}-${r.slice(12, 16)}-${r.slice(16, 20)}-${r.slice(20, 32)}`;
}
function L(t) {
  return new Promise((s, e) => {
    (t.startsWith("https") ? re : oe).get(t, (a) => {
      if (a.statusCode && a.statusCode >= 300 && a.statusCode < 400 && a.headers.location)
        return L(a.headers.location).then(s).catch(e);
      if (a.statusCode !== 200)
        return e(new Error(`HTTP ${a.statusCode} loading ${t}`));
      let o = "";
      a.on("data", (d) => {
        o += d;
      }), a.on("end", () => {
        try {
          s(JSON.parse(o));
        } catch (d) {
          e(d);
        }
      });
    }).on("error", e);
  });
}
function F(t, s) {
  return new Promise((e, r) => {
    const a = i.dirname(s);
    n.existsSync(a) || n.mkdirSync(a, { recursive: !0 });
    const o = n.createWriteStream(s);
    (t.startsWith("https") ? re : oe).get(t, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), F(c.headers.location, s).then(e).catch(r);
      if (c.statusCode !== 200)
        return o.close(), n.unlink(s, () => {
        }), r(new Error(`Failed to download ${t}: HTTP ${c.statusCode}`));
      c.pipe(o), o.on("finish", () => {
        o.close(() => e());
      });
    }).on("error", (c) => {
      o.close(), n.unlink(s, () => {
      }), r(c);
    });
  });
}
function se(t, s) {
  if (n.existsSync(t))
    try {
      const e = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::OpenRead('${t.replace(/'/g, "''")}').Entries | Where-Object { $_.FullName -like '*.dll' } | ForEach-Object { $dest = [System.IO.Path]::Combine('${s.replace(/'/g, "''")}', $_.Name); [System.IO.Compression.ZipFileExtensions]::ExtractToFile($_, $dest, $true) }"`;
      G(e, { stdio: "ignore" });
    } catch {
      try {
        G(`powershell -Command "Expand-Archive -Path '${t}' -DestinationPath '${s}' -Force"`, { stdio: "ignore" });
      } catch {
      }
    }
}
function Me(t) {
  if (!t || t.length === 0) return !0;
  let s = !1;
  for (const e of t)
    e.action === "allow" ? (!e.os || e.os.name === "windows") && (s = !0) : e.action === "disallow" && (!e.os || e.os.name === "windows") && (s = !1);
  return s;
}
async function ne() {
  const t = [], s = process.platform === "win32", e = s ? "javaw.exe" : "java", r = Y(), a = i.join(r, "java", "java-17"), o = (m) => {
    if (!n.existsSync(m)) return null;
    const c = n.readdirSync(m);
    for (const g of c) {
      const b = i.join(m, g);
      if (g.toLowerCase() === "javaw.exe") return b;
      if (n.statSync(b).isDirectory()) {
        const p = o(b);
        if (p) return p;
      }
    }
    return null;
  }, d = o(a);
  if (d && t.push(d), process.env.JAVA_HOME) {
    const m = i.join(process.env.JAVA_HOME, "bin", e);
    n.existsSync(m) && t.push(m);
  }
  if (s) {
    const m = [
      "C:\\Program Files\\Java",
      "C:\\Program Files (x86)\\Java",
      "C:\\Program Files\\Eclipse Adoptium",
      "C:\\Program Files\\Microsoft",
      "C:\\Program Files\\BellSoft",
      "C:\\Program Files\\Amazon Corretto",
      i.join(process.env.LOCALAPPDATA || "", "Programs", "AdoptOpenJDK"),
      "C:\\Program Files (x86)\\Minecraft Launcher\\runtime"
    ];
    for (const c of m)
      if (n.existsSync(c))
        try {
          const g = n.readdirSync(c);
          for (const b of g) {
            const p = i.join(c, b, "bin", e);
            n.existsSync(p) && !t.includes(p) && t.push(p);
          }
        } catch {
        }
  }
  return t;
}
async function Ae(t, s) {
  const e = Y(), r = i.join(e, "java", "java-17"), a = (g) => {
    if (!n.existsSync(g)) return null;
    const b = n.readdirSync(g);
    for (const p of b) {
      const j = i.join(g, p);
      if (p.toLowerCase() === "javaw.exe") return j;
      if (n.statSync(j).isDirectory()) {
        const k = a(j);
        if (k) return k;
      }
    }
    return null;
  }, o = a(r);
  if (o)
    return o;
  t({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: "Авто-скачивание OpenJDK Java 17...",
    progress: 15
  }), s({ timestamp: Date.now(), type: "info", message: "Java не найдена на ПК. Автоматическое скачивание OpenJDK Java 17 (Temurin)..." });
  const d = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jre_x64_windows_hotspot_17.0.10_7.zip", m = i.join(e, "java", "java-17.zip");
  n.existsSync(i.dirname(m)) || n.mkdirSync(i.dirname(m), { recursive: !0 }), t({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: "Загрузка OpenJDK Java 17 (40 MB)...",
    progress: 35
  }), await F(d, m), t({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: "Распаковка Java 17 Runtime...",
    progress: 75
  }), s({ timestamp: Date.now(), type: "info", message: "Распаковка архива Java 17..." }), n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
  try {
    G(`powershell -Command "Expand-Archive -Path '${m}' -DestinationPath '${r}' -Force"`), n.unlinkSync(m);
  } catch (g) {
    s({ timestamp: Date.now(), type: "warn", message: `Ошибка PowerShell распаковки: ${g.message}` });
  }
  const c = a(r);
  if (!c)
    throw new Error("Не удалось найти javaw.exe после распаковки Java 17. Установите Java вручную.");
  return s({ timestamp: Date.now(), type: "info", message: `Java 17 успешно установлена: ${c}` }), c;
}
async function xe() {
  return await L("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function Te(t, s, e) {
  var j, k, U, le, de, ue, me, fe;
  const r = Y(), a = i.join(r, "instances", t.instanceId), o = i.join(r, "assets"), d = i.join(r, "libraries"), m = i.join(r, "versions"), c = i.join(a, "natives");
  n.existsSync(a) || n.mkdirSync(a, { recursive: !0 }), n.existsSync(c) || n.mkdirSync(c, { recursive: !0 });
  const g = i.join(a, "options.txt");
  n.writeFileSync(g, `version:2586
chatVisibility:0
forceUnicodeFont:false
realmsNotifications:false
hideServerAddress:false
`, "utf-8");
  const p = i.join(a, ".fabric");
  if (n.existsSync(p))
    try {
      const $ = (O) => {
        const pe = n.readdirSync(O);
        for (const W of pe) {
          const E = i.join(O, W);
          n.statSync(E).isDirectory() ? $(E) : W.endsWith(".tmp") && n.unlinkSync(E);
        }
      };
      $(p);
    } catch {
    }
  try {
    let $ = t.javaPath, O = !1;
    if ($ && n.existsSync($))
      try {
        G(`"${$}" -version 2>&1`), O = !0;
      } catch {
      }
    if (!O) {
      const l = await ne();
      for (const y of l)
        if (n.existsSync(y))
          try {
            G(`"${y}" -version 2>&1`), $ = y, O = !0;
            break;
          } catch {
          }
    }
    O || ($ = await Ae(s, e)), e({
      timestamp: Date.now(),
      type: "info",
      message: `Используемый файл Java: ${$}`
    }), s({
      instanceId: t.instanceId,
      stage: "checking",
      statusText: "Получение манифеста версий...",
      progress: 10
    });
    const W = (await xe()).versions.find((l) => l.id === t.version);
    if (!W)
      throw new Error(`Версия Minecraft ${t.version} не найдена в манифесте Mojang`);
    s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: `Загрузка структуры версии ${t.version}...`,
      progress: 20
    });
    const E = i.join(m, t.version, `${t.version}.json`), P = await L(W.url);
    if (n.existsSync(i.dirname(E)) || n.mkdirSync(i.dirname(E), { recursive: !0 }), n.writeFileSync(E, JSON.stringify(P, null, 2)), (j = P.assetIndex) != null && j.url) {
      const l = i.join(o, "indexes"), y = i.join(l, `${P.assetIndex.id}.json`);
      n.existsSync(y) || (s({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Загрузка манифеста ресурсов...",
        progress: 25
      }), await F(P.assetIndex.url, y));
      try {
        const C = JSON.parse(n.readFileSync(y, "utf-8")).objects || {}, I = Object.keys(C), R = i.join(o, "objects"), S = [];
        for (const T of I) {
          const D = C[T].hash, N = D.slice(0, 2), q = i.join(R, N, D);
          n.existsSync(q) || S.push({
            hash: D,
            url: `https://resources.download.minecraft.net/${N}/${D}`,
            dest: q
          });
        }
        if (S.length > 0) {
          s({
            instanceId: t.instanceId,
            stage: "downloading",
            statusText: `Загрузка ресурсов (${S.length} файлов)...`,
            progress: 30
          });
          const T = 75;
          let J = 0;
          for (let D = 0; D < S.length; D += T) {
            const N = S.slice(D, D + T);
            await Promise.all(
              N.map((ve) => F(ve.url, ve.dest).catch(() => {
              }))
            ), J += N.length;
            const q = Math.round(30 + J / S.length * 15);
            s({
              instanceId: t.instanceId,
              stage: "downloading",
              statusText: `Загрузка ресурсов (${J}/${S.length})...`,
              progress: q
            });
          }
        }
      } catch (w) {
        e({ timestamp: Date.now(), type: "warn", message: `Ошибка ресурсов: ${w.message}` });
      }
    }
    const ee = i.join(m, t.version, `${t.version}.jar`);
    !n.existsSync(ee) && ((U = (k = P.downloads) == null ? void 0 : k.client) != null && U.url) && (s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка Minecraft client.jar...",
      progress: 50
    }), await F(P.downloads.client.url, ee)), s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка и распаковка библиотек...",
      progress: 60
    });
    const V = [], De = P.libraries || [];
    for (const l of De)
      if (Me(l.rules)) {
        if ((le = l.downloads) != null && le.artifact) {
          const y = l.downloads.artifact.path, w = i.join(d, y);
          if (!n.existsSync(w))
            try {
              await F(l.downloads.artifact.url, w);
            } catch {
            }
          n.existsSync(w) && (V.push(w), (y.includes("natives") || l.name.includes("natives")) && se(w, c));
        }
        if ((de = l.downloads) != null && de.classifiers) {
          const y = l.downloads.classifiers, w = y["natives-windows"] || y["natives-windows-64"] || y["natives-windows-x86"];
          if (w) {
            const C = w.path, I = i.join(d, C);
            if (!n.existsSync(I))
              try {
                await F(w.url, I);
              } catch {
              }
            n.existsSync(I) && se(I, c);
          }
        }
        if (!((ue = l.downloads) != null && ue.artifact) && l.name) {
          const y = l.name.split(":"), w = y[0].replace(/\./g, "/"), C = y[1], I = y[2], R = `${w}/${C}/${I}/${C}-${I}.jar`, S = i.join(d, R), T = l.url ? `${l.url}${R}` : `https://libraries.minecraft.net/${R}`;
          if (!n.existsSync(S))
            try {
              await F(T, S);
            } catch {
            }
          n.existsSync(S) && (V.push(S), l.name.includes("natives") && se(S, c));
        }
      }
    V.push(ee);
    let he = P.mainClass || "net.minecraft.client.main.Main";
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
          const y = l[0].loader.version, w = await L(`https://meta.fabricmc.net/v2/versions/loader/${t.version}/${y}/profile/json`);
          if (w.mainClass && (he = w.mainClass), w.libraries)
            for (const C of w.libraries) {
              const I = C.name.split(":"), R = I[0].replace(/\./g, "/"), S = I[1], T = I[2], J = `${R}/${S}/${T}/${S}-${T}.jar`, D = i.join(d, J), N = C.url ? `${C.url}${J}` : `https://maven.fabricmc.net/${J}`;
              if (!n.existsSync(D))
                try {
                  await F(N, D);
                } catch {
                }
              n.existsSync(D) && V.unshift(D);
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
    const be = V.join(i.delimiter), h = [];
    h.push(`-Xms${t.memoryMin || 1024}M`), h.push(`-Xmx${t.memoryMax || 4096}M`), h.push(`-Djava.library.path=${c}`), h.push("-Dminecraft.api.auth.host=http://127.0.0.1"), h.push("-Dminecraft.api.account.host=http://127.0.0.1"), h.push("-Dminecraft.api.session.host=http://127.0.0.1"), h.push("-Dminecraft.api.services.host=http://127.0.0.1"), h.push("-XX:+UseG1GC", "-XX:+UnlockExperimentalVMOptions", "-XX:G1NewSizePercent=20", "-XX:G1ReservePercent=20", "-XX:MaxGCPauseMillis=50", "-XX:G1HeapRegionSize=32M"), t.customJvmArgs && h.push(...t.customJvmArgs.split(" ").filter(Boolean)), h.push("-cp", be), h.push(he);
    const ye = (t.uuid || H(t.username || "Player")).replace(/-/g, "");
    if (P.minecraftArguments && typeof P.minecraftArguments == "string") {
      const l = P.minecraftArguments.split(" ");
      for (const y of l) {
        let w = y.replace("${auth_player_name}", t.username || "Player").replace("${version_name}", t.version).replace("${game_directory}", a).replace("${assets_root}", o).replace("${assets_index_name}", ((me = P.assetIndex) == null ? void 0 : me.id) || t.version).replace("${auth_uuid}", ye).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", "release");
        h.push(w);
      }
    } else
      h.push("--username", t.username || "Player"), h.push("--version", t.version), h.push("--gameDir", a), h.push("--assetsDir", o), h.push("--assetIndex", ((fe = P.assetIndex) == null ? void 0 : fe.id) || t.version), h.push("--uuid", ye), h.push("--accessToken", "0"), h.push("--userType", "mojang"), h.push("--versionType", "release");
    e({
      timestamp: Date.now(),
      type: "info",
      message: `Команда запуска: "${$}" ${h.join(" ")}`
    });
    const B = Ce($ || "javaw", h, {
      cwd: a,
      detached: !0
    });
    X.set(t.instanceId, B), B.stdout.on("data", (l) => {
      e({ timestamp: Date.now(), type: "info", message: l.toString() });
    }), B.stderr.on("data", (l) => {
      e({ timestamp: Date.now(), type: "warn", message: l.toString() });
    }), B.on("error", (l) => {
      X.delete(t.instanceId), s({
        instanceId: t.instanceId,
        stage: "error",
        statusText: `Ошибка процесса: ${l.message}`,
        progress: 0,
        error: l.message
      }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${l.message}` });
    }), B.on("exit", (l) => {
      X.delete(t.instanceId), s({
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
  } catch ($) {
    s({
      instanceId: t.instanceId,
      stage: "error",
      statusText: `Ошибка: ${$.message}`,
      progress: 0,
      error: $.message
    }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${$.message}` });
  }
}
function Fe(t) {
  const s = X.get(t);
  return s ? (s.kill(), X.delete(t), !0) : !1;
}
Pe.setApplicationMenu(null);
const ge = i.dirname(_e(import.meta.url));
process.env.APP_ROOT = i.join(ge, "..");
const ae = process.env.VITE_DEV_SERVER_URL, Ve = i.join(process.env.APP_ROOT, "dist-electron"), Se = i.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = ae ? i.join(process.env.APP_ROOT, "public") : Se;
let u = null;
const _ = Y(), Z = i.join(_, "accounts.json"), Q = i.join(_, "instances.json"), je = i.join(_, "settings.json"), A = i.join(_, "skins");
n.existsSync(A) || n.mkdirSync(A, { recursive: !0 });
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
let v = ce(Z, [
  { id: "1", username: "Test", uuid: H("Test"), type: "offline", isActive: !0, createdAt: Date.now() - 5e4 },
  { id: "2", username: "Nick 2", uuid: H("Nick 2"), type: "offline", isActive: !1, createdAt: Date.now() - 4e4 },
  { id: "3", username: "Nick 3", uuid: H("Nick 3"), type: "offline", isActive: !1, createdAt: Date.now() - 3e4 }
]), M = ce(Q, [
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
]), x = ce(je, {
  javaPath: "",
  memoryMin: 1024,
  memoryMax: 4096,
  customJvmArgs: "",
  closeLauncherOnGameStart: !1,
  gameDir: _,
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
    icon: i.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: i.join(ge, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), u.webContents.on("did-finish-load", () => {
    u == null || u.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), ae ? u.loadURL(ae) : u.loadFile(i.join(Se, "index.html"));
}
K.on("window-all-closed", () => {
  process.platform !== "darwin" && (K.quit(), u = null);
});
K.on("activate", () => {
  we.getAllWindows().length === 0 && $e();
});
function ie(t, s) {
  return new Promise((e, r) => {
    const a = i.dirname(s);
    n.existsSync(a) || n.mkdirSync(a, { recursive: !0 });
    const o = n.createWriteStream(s);
    (t.startsWith("https") ? re : oe).get(t, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), ie(c.headers.location, s).then(e).catch(r);
      if (c.statusCode !== 200)
        return o.close(), n.unlink(s, () => {
        }), r(new Error(`Failed download ${t}: HTTP ${c.statusCode}`));
      c.pipe(o), o.on("finish", () => {
        o.close(() => e());
      });
    }).on("error", (c) => {
      o.close(), n.unlink(s, () => {
      }), r(c);
    });
  });
}
function Je() {
  f.handle("minimize-window", () => {
    u == null || u.minimize();
  }), f.handle("maximize-window", () => u ? u.isMaximized() ? (u.unmaximize(), !1) : (u.maximize(), !0) : !1), f.handle("close-window", () => {
    u == null || u.close();
  }), f.handle("is-maximized", () => (u == null ? void 0 : u.isMaximized()) || !1), f.handle("get-accounts", () => v), f.handle("add-account", (t, s) => {
    const e = s.trim();
    if (!e) throw new Error("Имя пользователя не может быть пустым");
    if (v.some((o) => o.username.toLowerCase() === e.toLowerCase()))
      throw new Error(`Никнейм "${e}" уже существует!`);
    const a = {
      id: Date.now().toString(),
      username: e,
      uuid: H(e),
      type: "offline",
      isActive: v.length === 0,
      createdAt: Date.now()
    };
    return v.push(a), z(Z, v), v;
  }), f.handle("set-active-account", (t, s) => (v = v.map((e) => ({
    ...e,
    isActive: e.id === s
  })), z(Z, v), v)), f.handle("delete-account", (t, s) => (v = v.filter((e) => e.id !== s), v.length > 0 && !v.some((e) => e.isActive) && (v[0].isActive = !0), z(Z, v), v)), f.handle("get-instances", () => M), f.handle("create-instance", (t, s) => {
    const e = {
      id: "inst-" + Date.now(),
      name: s.version,
      version: s.version,
      loader: s.loader || "vanilla",
      created: Date.now(),
      memoryMin: x.memoryMin,
      memoryMax: x.memoryMax
    };
    M.push(e), z(Q, M);
    const r = i.join(_, "instances", e.id), a = i.join(r, "mods");
    return n.existsSync(a) || n.mkdirSync(a, { recursive: !0 }), M;
  }), f.handle("delete-instance", (t, s) => {
    M = M.filter((r) => r.id !== s), z(Q, M);
    const e = i.join(_, "instances", s);
    return n.existsSync(e) && n.rmSync(e, { recursive: !0, force: !0 }), M;
  }), f.handle("get-versions", async () => {
    try {
      return await xe();
    } catch (t) {
      return console.error("Failed to get versions:", t), { latest: { release: "1.20.4", snapshot: "1.20.4" }, versions: [] };
    }
  }), f.handle("get-settings", () => x), f.handle("save-settings", (t, s) => (x = { ...x, ...s }, z(je, x), x)), f.handle("detect-java", async () => await ne()), f.handle("launch-instance", async (t, s) => {
    const e = M.find((d) => d.id === s);
    if (!e) throw new Error("Инстанс не найден");
    const r = v.find((d) => d.isActive) || v[0];
    if (!r) throw new Error("Добавьте хотя бы один аккаунт!");
    e.lastPlayed = Date.now(), z(Q, M);
    const a = e.javaPath || x.javaPath || (await ne())[0];
    let o = e.jvmArgs || x.customJvmArgs || "";
    return x.useProxy && x.proxyHost && x.proxyPort && (x.proxyType === "socks5" ? o += ` -DsocksProxyHost=${x.proxyHost} -DsocksProxyPort=${x.proxyPort}` : o += ` -Dhttp.proxyHost=${x.proxyHost} -Dhttp.proxyPort=${x.proxyPort} -Dhttps.proxyHost=${x.proxyHost} -Dhttps.proxyPort=${x.proxyPort}`), Te(
      {
        instanceId: e.id,
        instanceName: e.name,
        version: e.version,
        loader: e.loader || "vanilla",
        username: r.username,
        uuid: r.uuid,
        memoryMin: e.memoryMin || x.memoryMin || 1024,
        memoryMax: e.memoryMax || x.memoryMax || 4096,
        javaPath: a,
        customJvmArgs: o.trim()
      },
      (d) => {
        u == null || u.webContents.send("launch-progress", d);
      },
      (d) => {
        u == null || u.webContents.send("game-log", d);
      }
    ), !0;
  }), f.handle("stop-instance", (t, s) => Fe(s)), f.handle("open-instance-folder", (t, s) => {
    const e = i.join(_, "instances", s);
    n.existsSync(e) || n.mkdirSync(e, { recursive: !0 }), Ie.openPath(e);
  }), f.handle("get-instance-mods", (t, s) => {
    const e = i.join(_, "instances", s, "mods");
    if (!n.existsSync(e)) return [];
    try {
      return n.readdirSync(e).map((a) => {
        const o = i.join(e, a), d = n.statSync(o), m = a.endsWith(".jar"), c = a.replace(/\.jar(\.disabled)?$/, "");
        return {
          id: a,
          filename: a,
          name: c,
          enabled: m,
          size: d.size
        };
      });
    } catch {
      return [];
    }
  }), f.handle("toggle-mod", (t, { instanceId: s, modFilename: e }) => {
    const r = i.join(_, "instances", s, "mods"), a = i.join(r, e);
    if (!n.existsSync(a)) return !1;
    let o = e;
    e.endsWith(".jar") ? o = e + ".disabled" : e.endsWith(".jar.disabled") && (o = e.replace(/\.disabled$/, ""));
    const d = i.join(r, o);
    return n.renameSync(a, d), !0;
  }), f.handle("download-mod-file", async (t, { instanceId: s, downloadUrl: e, filename: r }) => {
    const a = i.join(_, "instances", s, "mods");
    n.existsSync(a) || n.mkdirSync(a, { recursive: !0 });
    const o = i.join(a, r);
    return await ie(e, o), !0;
  }), f.handle("add-mod-file", async (t, s) => {
    if (!u) return !1;
    const e = await te.showOpenDialog(u, {
      title: "Выберите файл мода (.jar)",
      filters: [{ name: "Minecraft Mods", extensions: ["jar"] }],
      properties: ["openFile", "multiSelections"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const r = i.join(_, "instances", s, "mods");
    n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
    for (const a of e.filePaths) {
      const o = i.join(r, i.basename(a));
      n.copyFileSync(a, o);
    }
    return !0;
  }), f.handle("save-user-skin", async (t, s) => {
    if (!u) return !1;
    const e = await te.showOpenDialog(u, {
      title: "Выберите файл скина Minecraft (.png)",
      filters: [{ name: "Minecraft Skins", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const r = i.join(A, `${s}.png`);
    return n.copyFileSync(e.filePaths[0], r), r;
  }), f.handle("fetch-online-skin", async (t, { username: s, targetUsername: e }) => {
    const r = i.join(A, `${s}.png`), a = [
      `https://ely.by/services/skins-buffer/skins/${encodeURIComponent(e)}.png`,
      `https://minotar.net/skin/${encodeURIComponent(e)}`,
      `https://crafatar.com/skins/${H(e)}`
    ];
    for (const o of a)
      try {
        if (await ie(o, r), n.existsSync(r) && n.statSync(r).size > 100)
          return `data:image/png;base64,${n.readFileSync(r).toString("base64")}`;
      } catch {
      }
    throw new Error(`Скин для никнейма "${e}" не найден на серверах`);
  }), f.handle("get-profile-stats", (t, s) => {
    let e = 0;
    const r = [];
    let a = "Нет информации", o = "Нет информации", d = 0, m = 0;
    try {
      for (const p of M) {
        p.lastPlayed && (m = Math.max(m, p.lastPlayed), d += 45);
        const j = i.join(_, "instances", p.id, "saves");
        if (n.existsSync(j)) {
          const k = n.readdirSync(j);
          for (const U of k)
            n.statSync(i.join(j, U)).isDirectory() && (e++, r.push(U));
        }
      }
      r.length > 0 && (a = r[0]);
    } catch {
    }
    const c = v.find((p) => p.username === s) || v.find((p) => p.isActive) || v[0], g = (d / 60).toFixed(1), b = m ? new Date(m).toLocaleString() : "Нет информации";
    return {
      username: c ? c.username : s,
      uuid: c ? c.uuid : "",
      worldsCount: e,
      totalPlayTimeHours: d > 0 ? `${g} ч.` : "Нет информации",
      lastPlayedFormatted: b,
      favoriteWorld: a,
      favoriteServer: o
    };
  }), f.handle("get-user-skin", (t, s) => {
    const e = i.join(A, `${s}.png`);
    return n.existsSync(e) ? `data:image/png;base64,${n.readFileSync(e).toString("base64")}` : null;
  }), f.handle("upload-user-skin", async (t, s) => {
    const { canceled: e, filePaths: r } = await te.showOpenDialog({
      title: "Выберите скин Minecraft (.png)",
      properties: ["openFile"],
      filters: [{ name: "Minecraft Skin (*.png)", extensions: ["png"] }]
    });
    if (!e && r.length > 0) {
      n.existsSync(A) || n.mkdirSync(A, { recursive: !0 });
      const a = i.join(A, `${s}.png`);
      return n.copyFileSync(r[0], a), `data:image/png;base64,${n.readFileSync(a).toString("base64")}`;
    }
    return null;
  }), f.handle("parse-command-skin", async (t, s) => {
    var b, p;
    const { username: e, command: r } = s;
    let a = "";
    const o = r.match(/value:\s*"([^"]+)"/i) || r.match(/value=?"([^"]+)"/i);
    if (o && o[1])
      try {
        const j = Buffer.from(o[1], "base64").toString("utf-8"), k = JSON.parse(j);
        (p = (b = k == null ? void 0 : k.textures) == null ? void 0 : b.SKIN) != null && p.url && (a = k.textures.SKIN.url);
      } catch {
      }
    if (!a) {
      const j = r.match(/(https?:\/\/textures\.minecraft\.net\/texture\/[a-f0-9]+)/i);
      j && (a = j[1]);
    }
    if (!a)
      throw new Error("Не удалось найти текстуру скина в переданной команде");
    const d = await fetch(a);
    if (!d.ok) throw new Error("Не удалось скачать скин по URL текстуры");
    const m = await d.arrayBuffer(), c = Buffer.from(m);
    n.existsSync(A) || n.mkdirSync(A, { recursive: !0 });
    const g = i.join(A, `${e}.png`);
    return n.writeFileSync(g, c), `data:image/png;base64,${c.toString("base64")}`;
  });
}
K.whenReady().then(() => {
  Je(), $e();
});
export {
  Ve as MAIN_DIST,
  Se as RENDERER_DIST,
  ae as VITE_DEV_SERVER_URL
};
