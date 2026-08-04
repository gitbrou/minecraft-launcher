import { app as G, Menu as Pe, BrowserWindow as we, ipcMain as p, shell as Ie, dialog as ve } from "electron";
import { fileURLToPath as _e } from "node:url";
import a from "node:path";
import n from "node:fs";
import ie from "node:https";
import re from "node:http";
import Ce from "node:crypto";
import { execSync as K, spawn as Ae } from "node:child_process";
const X = /* @__PURE__ */ new Map();
function Y() {
  const t = G.getPath("userData"), s = a.join(t, ".mine-launcher");
  return n.existsSync(s) || n.mkdirSync(s, { recursive: !0 }), s;
}
function z(t) {
  const s = Ce.createHash("md5");
  s.update(`OfflinePlayer:${t}`);
  const e = s.digest();
  e[6] = e[6] & 15 | 48, e[8] = e[8] & 63 | 128;
  const i = e.toString("hex");
  return `${i.slice(0, 8)}-${i.slice(8, 12)}-${i.slice(12, 16)}-${i.slice(16, 20)}-${i.slice(20, 32)}`;
}
function B(t) {
  return new Promise((s, e) => {
    (t.startsWith("https") ? ie : re).get(t, (r) => {
      if (r.statusCode && r.statusCode >= 300 && r.statusCode < 400 && r.headers.location)
        return B(r.headers.location).then(s).catch(e);
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
function k(t, s) {
  return new Promise((e, i) => {
    const r = a.dirname(s);
    n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
    const o = n.createWriteStream(s);
    (t.startsWith("https") ? ie : re).get(t, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), k(c.headers.location, s).then(e).catch(i);
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
function te(t, s) {
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
function Me(t) {
  if (!t || t.length === 0) return !0;
  let s = !1;
  for (const e of t)
    e.action === "allow" ? (!e.os || e.os.name === "windows") && (s = !0) : e.action === "disallow" && (!e.os || e.os.name === "windows") && (s = !1);
  return s;
}
async function se() {
  const t = [], s = process.platform === "win32", e = s ? "javaw.exe" : "java", i = Y(), r = a.join(i, "java", "java-17"), o = (m) => {
    if (!n.existsSync(m)) return null;
    const c = n.readdirSync(m);
    for (const j of c) {
      const C = a.join(m, j);
      if (j.toLowerCase() === "javaw.exe") return C;
      if (n.statSync(C).isDirectory()) {
        const x = o(C);
        if (x) return x;
      }
    }
    return null;
  }, d = o(r);
  if (d && t.push(d), process.env.JAVA_HOME) {
    const m = a.join(process.env.JAVA_HOME, "bin", e);
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
      a.join(process.env.LOCALAPPDATA || "", "Programs", "AdoptOpenJDK"),
      "C:\\Program Files (x86)\\Minecraft Launcher\\runtime"
    ];
    for (const c of m)
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
async function ke(t, s) {
  const e = Y(), i = a.join(e, "java", "java-17"), r = (j) => {
    if (!n.existsSync(j)) return null;
    const C = n.readdirSync(j);
    for (const x of C) {
      const A = a.join(j, x);
      if (x.toLowerCase() === "javaw.exe") return A;
      if (n.statSync(A).isDirectory()) {
        const F = r(A);
        if (F) return F;
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
  const d = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jre_x64_windows_hotspot_17.0.10_7.zip", m = a.join(e, "java", "java-17.zip");
  n.existsSync(a.dirname(m)) || n.mkdirSync(a.dirname(m), { recursive: !0 }), t({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: "Загрузка OpenJDK Java 17 (40 MB)...",
    progress: 35
  }), await k(d, m), t({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: "Распаковка Java 17 Runtime...",
    progress: 75
  }), s({ timestamp: Date.now(), type: "info", message: "Распаковка архива Java 17..." }), n.existsSync(i) || n.mkdirSync(i, { recursive: !0 });
  try {
    K(`powershell -Command "Expand-Archive -Path '${m}' -DestinationPath '${i}' -Force"`), n.unlinkSync(m);
  } catch (j) {
    s({ timestamp: Date.now(), type: "warn", message: `Ошибка PowerShell распаковки: ${j.message}` });
  }
  const c = r(i);
  if (!c)
    throw new Error("Не удалось найти javaw.exe после распаковки Java 17. Установите Java вручную.");
  return s({ timestamp: Date.now(), type: "info", message: `Java 17 успешно установлена: ${c}` }), c;
}
async function xe() {
  return await B("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function Te(t, s, e) {
  var A, F, H, ce, le, de, ue, me;
  const i = Y(), r = a.join(i, "instances", t.instanceId), o = a.join(i, "assets"), d = a.join(i, "libraries"), m = a.join(i, "versions"), c = a.join(r, "natives");
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
      const g = (J) => {
        const pe = n.readdirSync(J);
        for (const W of pe) {
          const O = a.join(J, W);
          n.statSync(O).isDirectory() ? g(O) : W.endsWith(".tmp") && n.unlinkSync(O);
        }
      };
      g(x);
    } catch {
    }
  try {
    let g = t.javaPath, J = !1;
    if (g && n.existsSync(g))
      try {
        K(`"${g}" -version 2>&1`), J = !0;
      } catch {
      }
    if (!J) {
      const l = await se();
      for (const h of l)
        if (n.existsSync(h))
          try {
            K(`"${h}" -version 2>&1`), g = h, J = !0;
            break;
          } catch {
          }
    }
    J || (g = await ke(s, e)), e({
      timestamp: Date.now(),
      type: "info",
      message: `Используемый файл Java: ${g}`
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
    const O = a.join(m, t.version, `${t.version}.json`), D = await B(W.url);
    if (n.existsSync(a.dirname(O)) || n.mkdirSync(a.dirname(O), { recursive: !0 }), n.writeFileSync(O, JSON.stringify(D, null, 2)), (A = D.assetIndex) != null && A.url) {
      const l = a.join(o, "indexes"), h = a.join(l, `${D.assetIndex.id}.json`);
      n.existsSync(h) || (s({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Загрузка манифеста ресурсов...",
        progress: 25
      }), await k(D.assetIndex.url, h));
      try {
        const I = JSON.parse(n.readFileSync(h, "utf-8")).objects || {}, b = Object.keys(I), E = a.join(o, "objects"), S = [];
        for (const M of b) {
          const $ = I[M].hash, R = $.slice(0, 2), q = a.join(E, R, $);
          n.existsSync(q) || S.push({
            hash: $,
            url: `https://resources.download.minecraft.net/${R}/${$}`,
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
          const M = 75;
          let T = 0;
          for (let $ = 0; $ < S.length; $ += M) {
            const R = S.slice($, $ + M);
            await Promise.all(
              R.map((ye) => k(ye.url, ye.dest).catch(() => {
              }))
            ), T += R.length;
            const q = Math.round(30 + T / S.length * 15);
            s({
              instanceId: t.instanceId,
              stage: "downloading",
              statusText: `Загрузка ресурсов (${T}/${S.length})...`,
              progress: q
            });
          }
        }
      } catch (v) {
        e({ timestamp: Date.now(), type: "warn", message: `Ошибка ресурсов: ${v.message}` });
      }
    }
    const ee = a.join(m, t.version, `${t.version}.jar`);
    !n.existsSync(ee) && ((H = (F = D.downloads) == null ? void 0 : F.client) != null && H.url) && (s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка Minecraft client.jar...",
      progress: 50
    }), await k(D.downloads.client.url, ee)), s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка и распаковка библиотек...",
      progress: 60
    });
    const U = [], De = D.libraries || [];
    for (const l of De)
      if (Me(l.rules)) {
        if ((ce = l.downloads) != null && ce.artifact) {
          const h = l.downloads.artifact.path, v = a.join(d, h);
          if (!n.existsSync(v))
            try {
              await k(l.downloads.artifact.url, v);
            } catch {
            }
          n.existsSync(v) && (U.push(v), (h.includes("natives") || l.name.includes("natives")) && te(v, c));
        }
        if ((le = l.downloads) != null && le.classifiers) {
          const h = l.downloads.classifiers, v = h["natives-windows"] || h["natives-windows-64"] || h["natives-windows-x86"];
          if (v) {
            const I = v.path, b = a.join(d, I);
            if (!n.existsSync(b))
              try {
                await k(v.url, b);
              } catch {
              }
            n.existsSync(b) && te(b, c);
          }
        }
        if (!((de = l.downloads) != null && de.artifact) && l.name) {
          const h = l.name.split(":"), v = h[0].replace(/\./g, "/"), I = h[1], b = h[2], E = `${v}/${I}/${b}/${I}-${b}.jar`, S = a.join(d, E), M = l.url ? `${l.url}${E}` : `https://libraries.minecraft.net/${E}`;
          if (!n.existsSync(S))
            try {
              await k(M, S);
            } catch {
            }
          n.existsSync(S) && (U.push(S), l.name.includes("natives") && te(S, c));
        }
      }
    U.push(ee);
    let fe = D.mainClass || "net.minecraft.client.main.Main";
    if (t.loader === "fabric") {
      s({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Настройка Fabric...",
        progress: 75
      });
      try {
        const l = await B(`https://meta.fabricmc.net/v2/versions/loader/${t.version}`);
        if (l && l.length > 0) {
          const h = l[0].loader.version, v = await B(`https://meta.fabricmc.net/v2/versions/loader/${t.version}/${h}/profile/json`);
          if (v.mainClass && (fe = v.mainClass), v.libraries)
            for (const I of v.libraries) {
              const b = I.name.split(":"), E = b[0].replace(/\./g, "/"), S = b[1], M = b[2], T = `${E}/${S}/${M}/${S}-${M}.jar`, $ = a.join(d, T), R = I.url ? `${I.url}${T}` : `https://maven.fabricmc.net/${T}`;
              if (!n.existsSync($))
                try {
                  await k(R, $);
                } catch {
                }
              n.existsSync($) && U.unshift($);
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
    const be = U.join(a.delimiter), f = [];
    f.push(`-Xms${t.memoryMin || 1024}M`), f.push(`-Xmx${t.memoryMax || 4096}M`), f.push(`-Djava.library.path=${c}`), f.push("-Dminecraft.api.auth.host=http://127.0.0.1"), f.push("-Dminecraft.api.account.host=http://127.0.0.1"), f.push("-Dminecraft.api.session.host=http://127.0.0.1"), f.push("-Dminecraft.api.services.host=http://127.0.0.1"), f.push("-XX:+UseG1GC", "-XX:+UnlockExperimentalVMOptions", "-XX:G1NewSizePercent=20", "-XX:G1ReservePercent=20", "-XX:MaxGCPauseMillis=50", "-XX:G1HeapRegionSize=32M"), t.customJvmArgs && f.push(...t.customJvmArgs.split(" ").filter(Boolean)), f.push("-cp", be), f.push(fe);
    const he = (t.uuid || z(t.username || "Player")).replace(/-/g, "");
    if (D.minecraftArguments && typeof D.minecraftArguments == "string") {
      const l = D.minecraftArguments.split(" ");
      for (const h of l) {
        let v = h.replace("${auth_player_name}", t.username || "Player").replace("${version_name}", t.version).replace("${game_directory}", r).replace("${assets_root}", o).replace("${assets_index_name}", ((ue = D.assetIndex) == null ? void 0 : ue.id) || t.version).replace("${auth_uuid}", he).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", "release");
        f.push(v);
      }
    } else
      f.push("--username", t.username || "Player"), f.push("--version", t.version), f.push("--gameDir", r), f.push("--assetsDir", o), f.push("--assetIndex", ((me = D.assetIndex) == null ? void 0 : me.id) || t.version), f.push("--uuid", he), f.push("--accessToken", "0"), f.push("--userType", "mojang"), f.push("--versionType", "release");
    e({
      timestamp: Date.now(),
      type: "info",
      message: `Команда запуска: "${g}" ${f.join(" ")}`
    });
    const V = Ae(g || "javaw", f, {
      cwd: r,
      detached: !0
    });
    X.set(t.instanceId, V), V.stdout.on("data", (l) => {
      e({ timestamp: Date.now(), type: "info", message: l.toString() });
    }), V.stderr.on("data", (l) => {
      e({ timestamp: Date.now(), type: "warn", message: l.toString() });
    }), V.on("error", (l) => {
      X.delete(t.instanceId), s({
        instanceId: t.instanceId,
        stage: "error",
        statusText: `Ошибка процесса: ${l.message}`,
        progress: 0,
        error: l.message
      }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${l.message}` });
    }), V.on("exit", (l) => {
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
  } catch (g) {
    s({
      instanceId: t.instanceId,
      stage: "error",
      statusText: `Ошибка: ${g.message}`,
      progress: 0,
      error: g.message
    }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${g.message}` });
  }
}
function Fe(t) {
  const s = X.get(t);
  return s ? (s.kill(), X.delete(t), !0) : !1;
}
Pe.setApplicationMenu(null);
const Se = a.dirname(_e(import.meta.url));
process.env.APP_ROOT = a.join(Se, "..");
const ne = process.env.VITE_DEV_SERVER_URL, Ve = a.join(process.env.APP_ROOT, "dist-electron"), ge = a.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = ne ? a.join(process.env.APP_ROOT, "public") : ge;
let u = null;
const P = Y(), Z = a.join(P, "accounts.json"), Q = a.join(P, "instances.json"), je = a.join(P, "settings.json"), L = a.join(P, "skins");
n.existsSync(L) || n.mkdirSync(L, { recursive: !0 });
function oe(t, s) {
  try {
    if (n.existsSync(t))
      return JSON.parse(n.readFileSync(t, "utf-8"));
  } catch (e) {
    console.error(`Failed loading ${t}:`, e);
  }
  return s;
}
function N(t, s) {
  try {
    n.writeFileSync(t, JSON.stringify(s, null, 2), "utf-8");
  } catch (e) {
    console.error(`Failed saving ${t}:`, e);
  }
}
let y = oe(Z, [
  { id: "1", username: "Test", uuid: z("Test"), type: "offline", isActive: !0, createdAt: Date.now() - 5e4 },
  { id: "2", username: "Nick 2", uuid: z("Nick 2"), type: "offline", isActive: !1, createdAt: Date.now() - 4e4 },
  { id: "3", username: "Nick 3", uuid: z("Nick 3"), type: "offline", isActive: !1, createdAt: Date.now() - 3e4 }
]), _ = oe(Q, [
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
]), w = oe(je, {
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
      preload: a.join(Se, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), u.webContents.on("did-finish-load", () => {
    u == null || u.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), ne ? u.loadURL(ne) : u.loadFile(a.join(ge, "index.html"));
}
G.on("window-all-closed", () => {
  process.platform !== "darwin" && (G.quit(), u = null);
});
G.on("activate", () => {
  we.getAllWindows().length === 0 && $e();
});
function ae(t, s) {
  return new Promise((e, i) => {
    const r = a.dirname(s);
    n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
    const o = n.createWriteStream(s);
    (t.startsWith("https") ? ie : re).get(t, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), ae(c.headers.location, s).then(e).catch(i);
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
  p.handle("minimize-window", () => {
    u == null || u.minimize();
  }), p.handle("maximize-window", () => u ? u.isMaximized() ? (u.unmaximize(), !1) : (u.maximize(), !0) : !1), p.handle("close-window", () => {
    u == null || u.close();
  }), p.handle("is-maximized", () => (u == null ? void 0 : u.isMaximized()) || !1), p.handle("get-accounts", () => y), p.handle("add-account", (t, s) => {
    const e = s.trim();
    if (!e) throw new Error("Имя пользователя не может быть пустым");
    if (y.some((o) => o.username.toLowerCase() === e.toLowerCase()))
      throw new Error(`Никнейм "${e}" уже существует!`);
    const r = {
      id: Date.now().toString(),
      username: e,
      uuid: z(e),
      type: "offline",
      isActive: y.length === 0,
      createdAt: Date.now()
    };
    return y.push(r), N(Z, y), y;
  }), p.handle("set-active-account", (t, s) => (y = y.map((e) => ({
    ...e,
    isActive: e.id === s
  })), N(Z, y), y)), p.handle("delete-account", (t, s) => (y = y.filter((e) => e.id !== s), y.length > 0 && !y.some((e) => e.isActive) && (y[0].isActive = !0), N(Z, y), y)), p.handle("get-instances", () => _), p.handle("create-instance", (t, s) => {
    const e = {
      id: "inst-" + Date.now(),
      name: s.version,
      version: s.version,
      loader: s.loader || "vanilla",
      created: Date.now(),
      memoryMin: w.memoryMin,
      memoryMax: w.memoryMax
    };
    _.push(e), N(Q, _);
    const i = a.join(P, "instances", e.id), r = a.join(i, "mods");
    return n.existsSync(r) || n.mkdirSync(r, { recursive: !0 }), _;
  }), p.handle("delete-instance", (t, s) => {
    _ = _.filter((i) => i.id !== s), N(Q, _);
    const e = a.join(P, "instances", s);
    return n.existsSync(e) && n.rmSync(e, { recursive: !0, force: !0 }), _;
  }), p.handle("get-versions", async () => {
    try {
      return await xe();
    } catch (t) {
      return console.error("Failed to get versions:", t), { latest: { release: "1.20.4", snapshot: "1.20.4" }, versions: [] };
    }
  }), p.handle("get-settings", () => w), p.handle("save-settings", (t, s) => (w = { ...w, ...s }, N(je, w), w)), p.handle("detect-java", async () => await se()), p.handle("launch-instance", async (t, s) => {
    const e = _.find((d) => d.id === s);
    if (!e) throw new Error("Инстанс не найден");
    const i = y.find((d) => d.isActive) || y[0];
    if (!i) throw new Error("Добавьте хотя бы один аккаунт!");
    e.lastPlayed = Date.now(), N(Q, _);
    const r = e.javaPath || w.javaPath || (await se())[0];
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
  }), p.handle("stop-instance", (t, s) => Fe(s)), p.handle("open-instance-folder", (t, s) => {
    const e = a.join(P, "instances", s);
    n.existsSync(e) || n.mkdirSync(e, { recursive: !0 }), Ie.openPath(e);
  }), p.handle("get-instance-mods", (t, s) => {
    const e = a.join(P, "instances", s, "mods");
    if (!n.existsSync(e)) return [];
    try {
      return n.readdirSync(e).map((r) => {
        const o = a.join(e, r), d = n.statSync(o), m = r.endsWith(".jar"), c = r.replace(/\.jar(\.disabled)?$/, "");
        return {
          id: r,
          filename: r,
          name: c,
          enabled: m,
          size: d.size
        };
      });
    } catch {
      return [];
    }
  }), p.handle("toggle-mod", (t, { instanceId: s, modFilename: e }) => {
    const i = a.join(P, "instances", s, "mods"), r = a.join(i, e);
    if (!n.existsSync(r)) return !1;
    let o = e;
    e.endsWith(".jar") ? o = e + ".disabled" : e.endsWith(".jar.disabled") && (o = e.replace(/\.disabled$/, ""));
    const d = a.join(i, o);
    return n.renameSync(r, d), !0;
  }), p.handle("download-mod-file", async (t, { instanceId: s, downloadUrl: e, filename: i }) => {
    const r = a.join(P, "instances", s, "mods");
    n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
    const o = a.join(r, i);
    return await ae(e, o), !0;
  }), p.handle("add-mod-file", async (t, s) => {
    if (!u) return !1;
    const e = await ve.showOpenDialog(u, {
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
  }), p.handle("save-user-skin", async (t, s) => {
    if (!u) return !1;
    const e = await ve.showOpenDialog(u, {
      title: "Выберите файл скина Minecraft (.png)",
      filters: [{ name: "Minecraft Skins", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const i = a.join(L, `${s}.png`);
    return n.copyFileSync(e.filePaths[0], i), i;
  }), p.handle("fetch-online-skin", async (t, { username: s, targetUsername: e }) => {
    const i = a.join(L, `${s}.png`), r = [
      `https://ely.by/services/skins-buffer/skins/${encodeURIComponent(e)}.png`,
      `https://minotar.net/skin/${encodeURIComponent(e)}`,
      `https://crafatar.com/skins/${z(e)}`
    ];
    for (const o of r)
      try {
        if (await ae(o, i), n.existsSync(i) && n.statSync(i).size > 100)
          return `data:image/png;base64,${n.readFileSync(i).toString("base64")}`;
      } catch {
      }
    throw new Error(`Скин для никнейма "${e}" не найден на серверах`);
  }), p.handle("get-profile-stats", (t, s) => {
    let e = 0;
    const i = [];
    let r = "Нет информации", o = "Нет информации", d = 0, m = 0;
    try {
      for (const x of _) {
        x.lastPlayed && (m = Math.max(m, x.lastPlayed), d += 45);
        const A = a.join(P, "instances", x.id, "saves");
        if (n.existsSync(A)) {
          const F = n.readdirSync(A);
          for (const H of F)
            n.statSync(a.join(A, H)).isDirectory() && (e++, i.push(H));
        }
      }
      i.length > 0 && (r = i[0]);
    } catch {
    }
    const c = y.find((x) => x.username === s) || y.find((x) => x.isActive) || y[0], j = (d / 60).toFixed(1), C = m ? new Date(m).toLocaleString() : "Нет информации";
    return {
      username: c ? c.username : s,
      uuid: c ? c.uuid : "",
      worldsCount: e,
      totalPlayTimeHours: d > 0 ? `${j} ч.` : "Нет информации",
      lastPlayedFormatted: C,
      favoriteWorld: r,
      favoriteServer: o
    };
  }), p.handle("get-user-skin", (t, s) => {
    const e = a.join(L, `${s}.png`);
    return n.existsSync(e) ? `data:image/png;base64,${n.readFileSync(e).toString("base64")}` : null;
  });
}
G.whenReady().then(() => {
  Je(), $e();
});
export {
  Ve as MAIN_DIST,
  ge as RENDERER_DIST,
  ne as VITE_DEV_SERVER_URL
};
