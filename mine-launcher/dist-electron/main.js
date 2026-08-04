import { app as K, Menu as Ie, BrowserWindow as xe, ipcMain as f, shell as ke, dialog as ae } from "electron";
import { fileURLToPath as Ce } from "node:url";
import r from "node:path";
import s from "node:fs";
import ee from "node:https";
import te from "node:http";
import Ae from "node:crypto";
import { execSync as q, spawn as _e } from "node:child_process";
const X = /* @__PURE__ */ new Map();
function ne() {
  const t = K.getPath("userData"), n = r.join(t, ".mine-launcher");
  return s.existsSync(n) || s.mkdirSync(n, { recursive: !0 }), n;
}
function U(t) {
  const n = Ae.createHash("md5");
  n.update(`OfflinePlayer:${t}`);
  const e = n.digest();
  e[6] = e[6] & 15 | 48, e[8] = e[8] & 63 | 128;
  const i = e.toString("hex");
  return `${i.slice(0, 8)}-${i.slice(8, 12)}-${i.slice(12, 16)}-${i.slice(16, 20)}-${i.slice(20, 32)}`;
}
function L(t) {
  return new Promise((n, e) => {
    (t.startsWith("https") ? ee : te).get(t, (a) => {
      if (a.statusCode && a.statusCode >= 300 && a.statusCode < 400 && a.headers.location)
        return L(a.headers.location).then(n).catch(e);
      if (a.statusCode !== 200)
        return e(new Error(`HTTP ${a.statusCode} loading ${t}`));
      let o = "";
      a.on("data", (u) => {
        o += u;
      }), a.on("end", () => {
        try {
          n(JSON.parse(o));
        } catch (u) {
          e(u);
        }
      });
    }).on("error", e);
  });
}
function F(t, n) {
  return new Promise((e, i) => {
    const a = r.dirname(n);
    s.existsSync(a) || s.mkdirSync(a, { recursive: !0 });
    const o = s.createWriteStream(n);
    (t.startsWith("https") ? ee : te).get(t, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), F(c.headers.location, n).then(e).catch(i);
      if (c.statusCode !== 200)
        return o.close(), s.unlink(n, () => {
        }), i(new Error(`Failed to download ${t}: HTTP ${c.statusCode}`));
      c.pipe(o), o.on("finish", () => {
        o.close(() => e());
      });
    }).on("error", (c) => {
      o.close(), s.unlink(n, () => {
      }), i(c);
    });
  });
}
function ie(t, n) {
  if (s.existsSync(t))
    try {
      const e = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::OpenRead('${t.replace(/'/g, "''")}').Entries | Where-Object { $_.FullName -like '*.dll' } | ForEach-Object { $dest = [System.IO.Path]::Combine('${n.replace(/'/g, "''")}', $_.Name); [System.IO.Compression.ZipFileExtensions]::ExtractToFile($_, $dest, $true) }"`;
      q(e, { stdio: "ignore" });
    } catch {
      try {
        q(`powershell -Command "Expand-Archive -Path '${t}' -DestinationPath '${n}' -Force"`, { stdio: "ignore" });
      } catch {
      }
    }
}
function Me(t) {
  if (!t || t.length === 0) return !0;
  let n = !1;
  for (const e of t)
    e.action === "allow" ? (!e.os || e.os.name === "windows") && (n = !0) : e.action === "disallow" && (!e.os || e.os.name === "windows") && (n = !1);
  return n;
}
async function re() {
  const t = [], n = process.platform === "win32", e = n ? "javaw.exe" : "java", i = ne(), a = r.join(i, "java", "java-17"), o = (d) => {
    if (!s.existsSync(d)) return null;
    const c = s.readdirSync(d);
    for (const p of c) {
      const x = r.join(d, p);
      if (p.toLowerCase() === "javaw.exe") return x;
      if (s.statSync(x).isDirectory()) {
        const h = o(x);
        if (h) return h;
      }
    }
    return null;
  }, u = o(a);
  if (u && t.push(u), process.env.JAVA_HOME) {
    const d = r.join(process.env.JAVA_HOME, "bin", e);
    s.existsSync(d) && t.push(d);
  }
  if (n) {
    const d = [
      "C:\\Program Files\\Java",
      "C:\\Program Files (x86)\\Java",
      "C:\\Program Files\\Eclipse Adoptium",
      "C:\\Program Files\\Microsoft",
      "C:\\Program Files\\BellSoft",
      "C:\\Program Files\\Amazon Corretto",
      r.join(process.env.LOCALAPPDATA || "", "Programs", "AdoptOpenJDK"),
      "C:\\Program Files (x86)\\Minecraft Launcher\\runtime"
    ];
    for (const c of d)
      if (s.existsSync(c))
        try {
          const p = s.readdirSync(c);
          for (const x of p) {
            const h = r.join(c, x, "bin", e);
            s.existsSync(h) && !t.includes(h) && t.push(h);
          }
        } catch {
        }
  }
  return t;
}
async function Te(t, n) {
  const e = ne(), i = r.join(e, "java", "java-17"), a = (p) => {
    if (!s.existsSync(p)) return null;
    const x = s.readdirSync(p);
    for (const h of x) {
      const P = r.join(p, h);
      if (h.toLowerCase() === "javaw.exe") return P;
      if (s.statSync(P).isDirectory()) {
        const I = a(P);
        if (I) return I;
      }
    }
    return null;
  }, o = a(i);
  if (o)
    return o;
  t({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: "Авто-скачивание OpenJDK Java 17...",
    progress: 15
  }), n({ timestamp: Date.now(), type: "info", message: "Java не найдена на ПК. Автоматическое скачивание OpenJDK Java 17 (Temurin)..." });
  const u = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jre_x64_windows_hotspot_17.0.10_7.zip", d = r.join(e, "java", "java-17.zip");
  s.existsSync(r.dirname(d)) || s.mkdirSync(r.dirname(d), { recursive: !0 }), t({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: "Загрузка OpenJDK Java 17 (40 MB)...",
    progress: 35
  }), await F(u, d), t({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: "Распаковка Java 17 Runtime...",
    progress: 75
  }), n({ timestamp: Date.now(), type: "info", message: "Распаковка архива Java 17..." }), s.existsSync(i) || s.mkdirSync(i, { recursive: !0 });
  try {
    q(`powershell -Command "Expand-Archive -Path '${d}' -DestinationPath '${i}' -Force"`), s.unlinkSync(d);
  } catch (p) {
    n({ timestamp: Date.now(), type: "warn", message: `Ошибка PowerShell распаковки: ${p.message}` });
  }
  const c = a(i);
  if (!c)
    throw new Error("Не удалось найти javaw.exe после распаковки Java 17. Установите Java вручную.");
  return n({ timestamp: Date.now(), type: "info", message: `Java 17 успешно установлена: ${c}` }), c;
}
async function Se() {
  return await L("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function Fe(t, n, e) {
  var P, I, J, R, me, fe, pe, he;
  const i = ne(), a = r.join(i, "instances", t.instanceId), o = r.join(i, "assets"), u = r.join(i, "libraries"), d = r.join(i, "versions"), c = r.join(a, "natives");
  s.existsSync(a) || s.mkdirSync(a, { recursive: !0 }), s.existsSync(c) || s.mkdirSync(c, { recursive: !0 });
  const p = r.join(a, "options.txt");
  s.writeFileSync(p, `version:2586
chatVisibility:0
forceUnicodeFont:false
realmsNotifications:false
hideServerAddress:false
`, "utf-8");
  const h = r.join(a, ".fabric");
  if (s.existsSync(h))
    try {
      const j = (N) => {
        const ye = s.readdirSync(N);
        for (const B of ye) {
          const H = r.join(N, B);
          s.statSync(H).isDirectory() ? j(H) : B.endsWith(".tmp") && s.unlinkSync(H);
        }
      };
      j(h);
    } catch {
    }
  try {
    let j = t.javaPath, N = !1;
    if (j && s.existsSync(j))
      try {
        q(`"${j}" -version 2>&1`), N = !0;
      } catch {
      }
    if (!N) {
      const l = await re();
      for (const w of l)
        if (s.existsSync(w))
          try {
            q(`"${w}" -version 2>&1`), j = w, N = !0;
            break;
          } catch {
          }
    }
    N || (j = await Te(n, e)), e({
      timestamp: Date.now(),
      type: "info",
      message: `Используемый файл Java: ${j}`
    }), n({
      instanceId: t.instanceId,
      stage: "checking",
      statusText: "Получение манифеста версий...",
      progress: 10
    });
    const B = (await Se()).versions.find((l) => l.id === t.version);
    if (!B)
      throw new Error(`Версия Minecraft ${t.version} не найдена в манифесте Mojang`);
    n({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: `Загрузка структуры версии ${t.version}...`,
      progress: 20
    });
    const H = r.join(d, t.version, `${t.version}.json`), k = await L(B.url);
    if (s.existsSync(r.dirname(H)) || s.mkdirSync(r.dirname(H), { recursive: !0 }), s.writeFileSync(H, JSON.stringify(k, null, 2)), (P = k.assetIndex) != null && P.url) {
      const l = r.join(o, "indexes"), w = r.join(l, `${k.assetIndex.id}.json`);
      s.existsSync(w) || (n({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Загрузка манифеста ресурсов...",
        progress: 25
      }), await F(k.assetIndex.url, w));
      try {
        const _ = JSON.parse(s.readFileSync(w, "utf-8")).objects || {}, C = Object.keys(_), W = r.join(o, "objects"), $ = [];
        for (const T of C) {
          const D = _[T].hash, z = D.slice(0, 2), Z = r.join(W, z, D);
          s.existsSync(Z) || $.push({
            hash: D,
            url: `https://resources.download.minecraft.net/${z}/${D}`,
            dest: Z
          });
        }
        if ($.length > 0) {
          n({
            instanceId: t.instanceId,
            stage: "downloading",
            statusText: `Загрузка ресурсов (${$.length} файлов)...`,
            progress: 30
          });
          const T = 75;
          let O = 0;
          for (let D = 0; D < $.length; D += T) {
            const z = $.slice(D, D + T);
            await Promise.all(
              z.map((ge) => F(ge.url, ge.dest).catch(() => {
              }))
            ), O += z.length;
            const Z = Math.round(30 + O / $.length * 15);
            n({
              instanceId: t.instanceId,
              stage: "downloading",
              statusText: `Загрузка ресурсов (${O}/${$.length})...`,
              progress: Z
            });
          }
        }
      } catch (S) {
        e({ timestamp: Date.now(), type: "warn", message: `Ошибка ресурсов: ${S.message}` });
      }
    }
    const se = r.join(d, t.version, `${t.version}.jar`);
    !s.existsSync(se) && ((J = (I = k.downloads) == null ? void 0 : I.client) != null && J.url) && (n({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка Minecraft client.jar...",
      progress: 50
    }), await F(k.downloads.client.url, se)), n({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка и распаковка библиотек...",
      progress: 60
    });
    const G = [], be = k.libraries || [];
    for (const l of be)
      if (Me(l.rules)) {
        if ((R = l.downloads) != null && R.artifact) {
          const w = l.downloads.artifact.path, S = r.join(u, w);
          if (!s.existsSync(S))
            try {
              await F(l.downloads.artifact.url, S);
            } catch {
            }
          s.existsSync(S) && (G.push(S), (w.includes("natives") || l.name.includes("natives")) && ie(S, c));
        }
        if ((me = l.downloads) != null && me.classifiers) {
          const w = l.downloads.classifiers, S = w["natives-windows"] || w["natives-windows-64"] || w["natives-windows-x86"];
          if (S) {
            const _ = S.path, C = r.join(u, _);
            if (!s.existsSync(C))
              try {
                await F(S.url, C);
              } catch {
              }
            s.existsSync(C) && ie(C, c);
          }
        }
        if (!((fe = l.downloads) != null && fe.artifact) && l.name) {
          const w = l.name.split(":"), S = w[0].replace(/\./g, "/"), _ = w[1], C = w[2], W = `${S}/${_}/${C}/${_}-${C}.jar`, $ = r.join(u, W), T = l.url ? `${l.url}${W}` : `https://libraries.minecraft.net/${W}`;
          if (!s.existsSync($))
            try {
              await F(T, $);
            } catch {
            }
          s.existsSync($) && (G.push($), l.name.includes("natives") && ie($, c));
        }
      }
    G.push(se);
    let ve = k.mainClass || "net.minecraft.client.main.Main";
    if (t.loader === "fabric") {
      n({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Настройка Fabric...",
        progress: 75
      });
      try {
        const l = await L(`https://meta.fabricmc.net/v2/versions/loader/${t.version}`);
        if (l && l.length > 0) {
          const w = l[0].loader.version, S = await L(`https://meta.fabricmc.net/v2/versions/loader/${t.version}/${w}/profile/json`);
          if (S.mainClass && (ve = S.mainClass), S.libraries)
            for (const _ of S.libraries) {
              const C = _.name.split(":"), W = C[0].replace(/\./g, "/"), $ = C[1], T = C[2], O = `${W}/${$}/${T}/${$}-${T}.jar`, D = r.join(u, O), z = _.url ? `${_.url}${O}` : `https://maven.fabricmc.net/${O}`;
              if (!s.existsSync(D))
                try {
                  await F(z, D);
                } catch {
                }
              s.existsSync(D) && G.unshift(D);
            }
        }
      } catch (l) {
        e({ timestamp: Date.now(), type: "warn", message: `Fabric метаданные: ${l.message}` });
      }
    }
    n({
      instanceId: t.instanceId,
      stage: "launching",
      statusText: "Запуск Minecraft...",
      progress: 90
    });
    const Pe = G.join(r.delimiter), y = [];
    y.push(`-Xms${t.memoryMin || 1024}M`), y.push(`-Xmx${t.memoryMax || 4096}M`), y.push(`-Djava.library.path=${c}`), y.push("-Dminecraft.api.auth.host=http://127.0.0.1"), y.push("-Dminecraft.api.account.host=http://127.0.0.1"), y.push("-Dminecraft.api.session.host=http://127.0.0.1"), y.push("-Dminecraft.api.services.host=http://127.0.0.1"), y.push("-XX:+UseG1GC", "-XX:+UnlockExperimentalVMOptions", "-XX:G1NewSizePercent=20", "-XX:G1ReservePercent=20", "-XX:MaxGCPauseMillis=50", "-XX:G1HeapRegionSize=32M"), t.customJvmArgs && y.push(...t.customJvmArgs.split(" ").filter(Boolean)), y.push("-cp", Pe), y.push(ve);
    const we = (t.uuid || U(t.username || "Player")).replace(/-/g, "");
    if (k.minecraftArguments && typeof k.minecraftArguments == "string") {
      const l = k.minecraftArguments.split(" ");
      for (const w of l) {
        let S = w.replace("${auth_player_name}", t.username || "Player").replace("${version_name}", t.version).replace("${game_directory}", a).replace("${assets_root}", o).replace("${assets_index_name}", ((pe = k.assetIndex) == null ? void 0 : pe.id) || t.version).replace("${auth_uuid}", we).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", "release");
        y.push(S);
      }
    } else
      y.push("--username", t.username || "Player"), y.push("--version", t.version), y.push("--gameDir", a), y.push("--assetsDir", o), y.push("--assetIndex", ((he = k.assetIndex) == null ? void 0 : he.id) || t.version), y.push("--uuid", we), y.push("--accessToken", "0"), y.push("--userType", "mojang"), y.push("--versionType", "release");
    y.includes("--fullscreen") || y.push("--fullscreen"), t.customGameArgs && y.push(...t.customGameArgs.split(" ").filter(Boolean)), e({
      timestamp: Date.now(),
      type: "info",
      message: `Команда запуска: "${j}" ${y.join(" ")}`
    });
    const V = _e(j || "javaw", y, {
      cwd: a,
      detached: !0
    });
    X.set(t.instanceId, V), V.stdout.on("data", (l) => {
      e({ timestamp: Date.now(), type: "info", message: l.toString() });
    }), V.stderr.on("data", (l) => {
      e({ timestamp: Date.now(), type: "warn", message: l.toString() });
    }), V.on("error", (l) => {
      X.delete(t.instanceId), n({
        instanceId: t.instanceId,
        stage: "error",
        statusText: `Ошибка процесса: ${l.message}`,
        progress: 0,
        error: l.message
      }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${l.message}` });
    }), V.on("exit", (l) => {
      X.delete(t.instanceId), n({
        instanceId: t.instanceId,
        stage: "idle",
        statusText: `Игра завершена (код ${l})`,
        progress: 0
      }), e({ timestamp: Date.now(), type: "info", message: `Minecraft завершился с кодом ${l}` });
    }), n({
      instanceId: t.instanceId,
      stage: "running",
      statusText: "Игра запущена!",
      progress: 100
    });
  } catch (j) {
    n({
      instanceId: t.instanceId,
      stage: "error",
      statusText: `Ошибка: ${j.message}`,
      progress: 0,
      error: j.message
    }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${j.message}` });
  }
}
function Je(t) {
  const n = X.get(t);
  return n ? (n.kill(), X.delete(t), !0) : !1;
}
Ie.setApplicationMenu(null);
const $e = r.dirname(Ce(import.meta.url));
process.env.APP_ROOT = r.join($e, "..");
const oe = process.env.VITE_DEV_SERVER_URL, Ge = r.join(process.env.APP_ROOT, "dist-electron"), je = r.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = oe ? r.join(process.env.APP_ROOT, "public") : je;
let m = null;
const A = ne(), Y = r.join(A, "accounts.json"), Q = r.join(A, "instances.json"), ce = r.join(A, "settings.json"), b = r.join(A, "skins");
s.existsSync(b) || s.mkdirSync(b, { recursive: !0 });
function ue(t, n) {
  try {
    if (s.existsSync(t))
      return JSON.parse(s.readFileSync(t, "utf-8"));
  } catch (e) {
    console.error(`Failed loading ${t}:`, e);
  }
  return n;
}
function E(t, n) {
  try {
    s.writeFileSync(t, JSON.stringify(n, null, 2), "utf-8");
  } catch (e) {
    console.error(`Failed saving ${t}:`, e);
  }
}
let g = ue(Y, [
  { id: "1", username: "Test", uuid: U("Test"), type: "offline", isActive: !0, createdAt: Date.now() - 5e4 },
  { id: "2", username: "Nick 2", uuid: U("Nick 2"), type: "offline", isActive: !1, createdAt: Date.now() - 4e4 },
  { id: "3", username: "Nick 3", uuid: U("Nick 3"), type: "offline", isActive: !1, createdAt: Date.now() - 3e4 }
]), M = ue(Q, [
  {
    id: "default-1122",
    name: "1.12.2",
    version: "1.12.2",
    loader: "vanilla",
    created: Date.now() - 1e5,
    lastPlayed: Date.now(),
    memoryMin: 1024,
    memoryMax: 4096
  },
  {
    id: "default-1",
    name: "1.20.4",
    version: "1.20.4",
    loader: "vanilla",
    created: Date.now() - 9e4,
    memoryMin: 1024,
    memoryMax: 4096
  }
]), v = ue(ce, {
  javaPath: "",
  memoryMin: 1024,
  memoryMax: 4096,
  customJvmArgs: "",
  closeLauncherOnGameStart: !1,
  gameDir: A,
  useProxy: !1,
  proxyType: "http",
  proxyHost: "",
  proxyPort: 8080,
  launcherFont: "system-ui"
});
function De() {
  m = new xe({
    width: 1050,
    height: 720,
    minWidth: 900,
    minHeight: 650,
    frame: !1,
    titleBarStyle: "hidden",
    icon: r.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: r.join($e, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), m.webContents.on("did-finish-load", () => {
    m == null || m.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), oe ? m.loadURL(oe) : m.loadFile(r.join(je, "index.html"));
}
K.on("window-all-closed", () => {
  process.platform !== "darwin" && (K.quit(), m = null);
});
K.on("activate", () => {
  xe.getAllWindows().length === 0 && De();
});
function le(t, n) {
  return new Promise((e, i) => {
    const a = r.dirname(n);
    s.existsSync(a) || s.mkdirSync(a, { recursive: !0 });
    const o = s.createWriteStream(n);
    (t.startsWith("https") ? ee : te).get(t, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), le(c.headers.location, n).then(e).catch(i);
      if (c.statusCode !== 200)
        return o.close(), s.unlink(n, () => {
        }), i(new Error(`Failed download ${t}: HTTP ${c.statusCode}`));
      c.pipe(o), o.on("finish", () => {
        o.close(() => e());
      });
    }).on("error", (c) => {
      o.close(), s.unlink(n, () => {
      }), i(c);
    });
  });
}
function de(t) {
  return new Promise((n, e) => {
    (t.startsWith("https") ? ee : te).get(t, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
      }
    }, (a) => {
      if (a.statusCode && a.statusCode >= 300 && a.statusCode < 400 && a.headers.location)
        return de(a.headers.location).then(n).catch(e);
      if (a.statusCode !== 200)
        return e(new Error(`HTTP ${a.statusCode}`));
      const o = [];
      a.on("data", (u) => o.push(u)), a.on("end", () => n(Buffer.concat(o))), a.on("error", e);
    }).on("error", e);
  });
}
function Oe() {
  f.handle("minimize-window", () => {
    m == null || m.minimize();
  }), f.handle("maximize-window", () => m ? m.isMaximized() ? (m.unmaximize(), !1) : (m.maximize(), !0) : !1), f.handle("close-window", () => {
    m == null || m.close();
  }), f.handle("is-maximized", () => (m == null ? void 0 : m.isMaximized()) || !1), f.handle("get-accounts", () => g), f.handle("add-account", (t, n) => {
    const e = n.trim();
    if (!e) throw new Error("Имя пользователя не может быть пустым");
    if (g.some((o) => o.username.toLowerCase() === e.toLowerCase()))
      throw new Error(`Никнейм "${e}" уже существует!`);
    const a = {
      id: Date.now().toString(),
      username: e,
      uuid: U(e),
      type: "offline",
      isActive: g.length === 0,
      createdAt: Date.now()
    };
    return g.push(a), E(Y, g), g;
  }), f.handle("set-active-account", (t, n) => (g = g.map((e) => ({
    ...e,
    isActive: e.id === n
  })), E(Y, g), g)), f.handle("delete-account", (t, n) => (g = g.filter((e) => e.id !== n), g.length > 0 && !g.some((e) => e.isActive) && (g[0].isActive = !0), E(Y, g), g)), f.handle("get-instances", () => M), f.handle("create-instance", (t, n) => {
    const e = {
      id: "inst-" + Date.now(),
      name: n.version,
      version: n.version,
      loader: n.loader || "vanilla",
      created: Date.now(),
      memoryMin: v.memoryMin,
      memoryMax: v.memoryMax
    };
    M.push(e), E(Q, M);
    const i = r.join(A, "instances", e.id), a = r.join(i, "mods");
    return s.existsSync(a) || s.mkdirSync(a, { recursive: !0 }), M;
  }), f.handle("delete-instance", (t, n) => {
    M = M.filter((i) => i.id !== n), E(Q, M);
    const e = r.join(A, "instances", n);
    return s.existsSync(e) && s.rmSync(e, { recursive: !0, force: !0 }), M;
  }), f.handle("get-versions", async () => {
    try {
      return await Se();
    } catch (t) {
      return console.error("Failed to get versions:", t), { latest: { release: "1.20.4", snapshot: "1.20.4" }, versions: [] };
    }
  }), f.handle("get-settings", () => v), f.handle("save-settings", (t, n) => (v = { ...v, ...n }, E(ce, v), v)), f.handle("detect-java", async () => await re()), f.handle("launch-instance", async (t, n) => {
    const e = M.find((d) => d.id === n);
    if (!e) throw new Error("Инстанс не найден");
    const i = g.find((d) => d.isActive) || g[0];
    if (!i) throw new Error("Добавьте хотя бы один аккаунт!");
    e.lastPlayed = Date.now(), E(Q, M);
    const a = e.javaPath || v.javaPath || (await re())[0];
    let o = e.jvmArgs || v.customJvmArgs || "";
    v.useProxy && v.proxyHost && v.proxyPort && (v.proxyType === "socks5" ? o += ` -DsocksProxyHost=${v.proxyHost} -DsocksProxyPort=${v.proxyPort}` : o += ` -Dhttp.proxyHost=${v.proxyHost} -Dhttp.proxyPort=${v.proxyPort} -Dhttps.proxyHost=${v.proxyHost} -Dhttps.proxyPort=${v.proxyPort}`);
    let u = `--fullscreen ${(v.customGameArgs || "").trim()}`.trim();
    return Fe(
      {
        instanceId: e.id,
        instanceName: e.name,
        version: e.version,
        loader: e.loader || "vanilla",
        username: i.username,
        uuid: i.uuid,
        memoryMin: e.memoryMin || v.memoryMin || 1024,
        memoryMax: e.memoryMax || v.memoryMax || 4096,
        javaPath: a,
        customJvmArgs: o.trim(),
        customGameArgs: u
      },
      (d) => {
        m == null || m.webContents.send("launch-progress", d);
      },
      (d) => {
        m == null || m.webContents.send("game-log", d);
      }
    ), !0;
  }), f.handle("stop-instance", (t, n) => Je(n)), f.handle("open-instance-folder", (t, n) => {
    const e = r.join(A, "instances", n);
    s.existsSync(e) || s.mkdirSync(e, { recursive: !0 }), ke.openPath(e);
  }), f.handle("get-instance-mods", (t, n) => {
    const e = r.join(A, "instances", n, "mods");
    if (!s.existsSync(e)) return [];
    try {
      return s.readdirSync(e).map((a) => {
        const o = r.join(e, a), u = s.statSync(o), d = a.endsWith(".jar"), c = a.replace(/\.jar(\.disabled)?$/, "");
        let p = "";
        const x = c.toLowerCase();
        return x.includes("iris") ? p = "https://cdn.modrinth.com/data/YL57xq9U/a14589d8164bdf6933bbec92c3008061dfcceecb.png" : x.includes("sodium") ? p = "https://cdn.modrinth.com/data/AANobbFp/d3f0a5015e1a1415df22fa2ff07b46ff4be9cfd8.png" : x.includes("optifine") ? p = "https://optifine.net/favicon.ico" : x.includes("fabric") ? p = "https://cdn.modrinth.com/data/P7Rstage/icon.png" : x.includes("lithium") ? p = "https://cdn.modrinth.com/data/gv2qrgfy/icon.png" : x.includes("indium") ? p = "https://cdn.modrinth.com/data/OradFiWy/icon.png" : x.includes("ferrite") && (p = "https://cdn.modrinth.com/data/u6uhacGG/icon.png"), {
          id: a,
          filename: a,
          name: c,
          enabled: d,
          size: u.size,
          iconUrl: p
        };
      });
    } catch {
      return [];
    }
  }), f.handle("toggle-mod", (t, { instanceId: n, modFilename: e }) => {
    const i = r.join(A, "instances", n, "mods"), a = r.join(i, e);
    if (!s.existsSync(a)) return !1;
    let o = e;
    e.endsWith(".jar") ? o = e + ".disabled" : e.endsWith(".jar.disabled") && (o = e.replace(/\.disabled$/, ""));
    const u = r.join(i, o);
    return s.renameSync(a, u), !0;
  }), f.handle("download-mod-file", async (t, { instanceId: n, downloadUrl: e, filename: i }) => {
    const a = r.join(A, "instances", n, "mods");
    s.existsSync(a) || s.mkdirSync(a, { recursive: !0 });
    const o = r.join(a, i);
    return await le(e, o), !0;
  }), f.handle("add-mod-file", async (t, n) => {
    if (!m) return !1;
    const e = await ae.showOpenDialog(m, {
      title: "Выберите файл мода (.jar)",
      filters: [{ name: "Minecraft Mods", extensions: ["jar"] }],
      properties: ["openFile", "multiSelections"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const i = r.join(A, "instances", n, "mods");
    s.existsSync(i) || s.mkdirSync(i, { recursive: !0 });
    for (const a of e.filePaths) {
      const o = r.join(i, r.basename(a));
      s.copyFileSync(a, o);
    }
    return !0;
  }), f.handle("save-user-skin", async (t, n) => {
    if (!m) return !1;
    const e = await ae.showOpenDialog(m, {
      title: "Выберите файл скина Minecraft (.png)",
      filters: [{ name: "Minecraft Skins", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const i = r.join(b, `${n}.png`);
    return s.copyFileSync(e.filePaths[0], i), i;
  }), f.handle("fetch-online-skin", async (t, { username: n, targetUsername: e }) => {
    const i = r.join(b, `${n}.png`), a = [
      `https://ely.by/services/skins-buffer/skins/${encodeURIComponent(e)}.png`,
      `https://minotar.net/skin/${encodeURIComponent(e)}`,
      `https://crafatar.com/skins/${U(e)}`
    ];
    for (const o of a)
      try {
        if (await le(o, i), s.existsSync(i) && s.statSync(i).size > 100)
          return `data:image/png;base64,${s.readFileSync(i).toString("base64")}`;
      } catch {
      }
    throw new Error(`Скин для никнейма "${e}" не найден на серверах`);
  }), f.handle("get-profile-stats", (t, n) => {
    let e = 0;
    const i = [];
    let a = "Нет информации", o = "Нет информации", u = 0, d = 0;
    try {
      for (const h of M) {
        h.lastPlayed && (d = Math.max(d, h.lastPlayed), u += 45);
        const P = r.join(A, "instances", h.id, "saves");
        if (s.existsSync(P)) {
          const I = s.readdirSync(P);
          for (const J of I)
            s.statSync(r.join(P, J)).isDirectory() && (e++, i.push(J));
        }
      }
      i.length > 0 && (a = i[0]);
    } catch {
    }
    const c = g.find((h) => h.username === n) || g.find((h) => h.isActive) || g[0], p = (u / 60).toFixed(1), x = d ? new Date(d).toLocaleString() : "Нет информации";
    return {
      username: c ? c.username : n,
      uuid: c ? c.uuid : "",
      worldsCount: e,
      totalPlayTimeHours: u > 0 ? `${p} ч.` : "Нет информации",
      lastPlayedFormatted: x,
      favoriteWorld: a,
      favoriteServer: o
    };
  }), f.handle("get-user-skin", (t, n) => {
    const e = r.join(b, `${n}.png`);
    return s.existsSync(e) ? `data:image/png;base64,${s.readFileSync(e).toString("base64")}` : null;
  }), f.handle("set-selected-instance-id", (t, n) => (v = { ...v, selectedInstanceId: n }, E(ce, v), v)), f.handle("save-user-skin-base64", (t, { username: n, base64Data: e }) => {
    try {
      s.existsSync(b) || s.mkdirSync(b, { recursive: !0 });
      const i = e.replace(/^data:image\/png;base64,/, ""), a = Buffer.from(i, "base64"), o = r.join(b, `${n}.png`);
      return s.writeFileSync(o, a), !0;
    } catch (i) {
      return console.error("Failed saving user skin base64:", i), !1;
    }
  }), f.handle("upload-user-skin", async (t, n) => {
    const { canceled: e, filePaths: i } = await ae.showOpenDialog({
      title: "Выберите скин Minecraft (.png)",
      properties: ["openFile"],
      filters: [{ name: "Minecraft Skin (*.png)", extensions: ["png"] }]
    });
    if (!e && i.length > 0) {
      s.existsSync(b) || s.mkdirSync(b, { recursive: !0 });
      const a = r.join(b, `${n}.png`);
      return s.copyFileSync(i[0], a), `data:image/png;base64,${s.readFileSync(a).toString("base64")}`;
    }
    return null;
  }), f.handle("parse-command-skin", async (t, n) => {
    var p, x;
    const { username: e, command: i } = n, a = (i || "").trim();
    let o = "";
    const u = a.match(/(https?:\/\/textures\.minecraft\.net\/texture\/[a-f0-9]+)/i);
    if (u && (o = u[1]), !o) {
      const h = a.match(/[A-Za-z0-9+/=]{16,}/g) || [];
      for (const P of h)
        try {
          const I = Buffer.from(P, "base64").toString("utf-8"), J = I.match(/(https?:\/\/textures\.minecraft\.net\/texture\/[a-f0-9]+)/i);
          if (J) {
            o = J[1];
            break;
          }
          const R = JSON.parse(I);
          if ((x = (p = R == null ? void 0 : R.textures) == null ? void 0 : p.SKIN) != null && x.url) {
            o = R.textures.SKIN.url;
            break;
          }
        } catch {
        }
    }
    if (!o) {
      const h = a.match(/namemc\.com\/skin\/([a-f0-9]+)/i);
      if (h && h[1])
        try {
          const I = (await de(`https://namemc.com/skin/${h[1]}`)).toString("utf-8").match(/(https?:\/\/textures\.minecraft\.net\/texture\/[a-f0-9]+)/i);
          I && (o = I[1]);
        } catch {
        }
    }
    if (!o && a.length < 32 && !a.includes("/") && (o = `https://minotar.net/skin/${encodeURIComponent(a)}`), !o)
      throw new Error("Не удалось найти скин в введенной команде. Убедитесь, что передан валидный /give, Base64 или ссылка.");
    o.startsWith("http://") && (o = o.replace("http://", "https://"));
    const d = await de(o);
    s.existsSync(b) || s.mkdirSync(b, { recursive: !0 });
    const c = r.join(b, `${e}.png`);
    return s.writeFileSync(c, d), `data:image/png;base64,${d.toString("base64")}`;
  });
}
K.whenReady().then(() => {
  Oe(), De();
});
export {
  Ge as MAIN_DIST,
  je as RENDERER_DIST,
  oe as VITE_DEV_SERVER_URL
};
