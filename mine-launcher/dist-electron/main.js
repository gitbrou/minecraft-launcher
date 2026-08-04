import { app as G, Menu as Ie, BrowserWindow as we, ipcMain as m, shell as _e, dialog as ve } from "electron";
import { fileURLToPath as Pe } from "node:url";
import a from "node:path";
import n from "node:fs";
import ie from "node:https";
import re from "node:http";
import Ce from "node:crypto";
import { execSync as K, spawn as Me } from "node:child_process";
const H = /* @__PURE__ */ new Map();
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
      r.on("data", (f) => {
        o += f;
      }), r.on("end", () => {
        try {
          s(JSON.parse(o));
        } catch (f) {
          e(f);
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
function Ae(t) {
  if (!t || t.length === 0) return !0;
  let s = !1;
  for (const e of t)
    e.action === "allow" ? (!e.os || e.os.name === "windows") && (s = !0) : e.action === "disallow" && (!e.os || e.os.name === "windows") && (s = !1);
  return s;
}
async function se() {
  const t = [], s = process.platform === "win32", e = s ? "javaw.exe" : "java", i = Y(), r = a.join(i, "java", "java-17"), o = (u) => {
    if (!n.existsSync(u)) return null;
    const c = n.readdirSync(u);
    for (const g of c) {
      const C = a.join(u, g);
      if (g.toLowerCase() === "javaw.exe") return C;
      if (n.statSync(C).isDirectory()) {
        const w = o(C);
        if (w) return w;
      }
    }
    return null;
  }, f = o(r);
  if (f && t.push(f), process.env.JAVA_HOME) {
    const u = a.join(process.env.JAVA_HOME, "bin", e);
    n.existsSync(u) && t.push(u);
  }
  if (s) {
    const u = [
      "C:\\Program Files\\Java",
      "C:\\Program Files (x86)\\Java",
      "C:\\Program Files\\Eclipse Adoptium",
      "C:\\Program Files\\Microsoft",
      "C:\\Program Files\\BellSoft",
      "C:\\Program Files\\Amazon Corretto",
      a.join(process.env.LOCALAPPDATA || "", "Programs", "AdoptOpenJDK"),
      "C:\\Program Files (x86)\\Minecraft Launcher\\runtime"
    ];
    for (const c of u)
      if (n.existsSync(c))
        try {
          const g = n.readdirSync(c);
          for (const C of g) {
            const w = a.join(c, C, "bin", e);
            n.existsSync(w) && !t.includes(w) && t.push(w);
          }
        } catch {
        }
  }
  return t;
}
async function ke(t, s) {
  const e = Y(), i = a.join(e, "java", "java-17"), r = (g) => {
    if (!n.existsSync(g)) return null;
    const C = n.readdirSync(g);
    for (const w of C) {
      const M = a.join(g, w);
      if (w.toLowerCase() === "javaw.exe") return M;
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
  const f = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jre_x64_windows_hotspot_17.0.10_7.zip", u = a.join(e, "java", "java-17.zip");
  n.existsSync(a.dirname(u)) || n.mkdirSync(a.dirname(u), { recursive: !0 }), t({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: "Загрузка OpenJDK Java 17 (40 MB)...",
    progress: 35
  }), await k(f, u), t({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: "Распаковка Java 17 Runtime...",
    progress: 75
  }), s({ timestamp: Date.now(), type: "info", message: "Распаковка архива Java 17..." }), n.existsSync(i) || n.mkdirSync(i, { recursive: !0 });
  try {
    K(`powershell -Command "Expand-Archive -Path '${u}' -DestinationPath '${i}' -Force"`), n.unlinkSync(u);
  } catch (g) {
    s({ timestamp: Date.now(), type: "warn", message: `Ошибка PowerShell распаковки: ${g.message}` });
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
  var M, J, W, ce, le, de, ue, me;
  const i = Y(), r = a.join(i, "instances", t.instanceId), o = a.join(i, "assets"), f = a.join(i, "libraries"), u = a.join(i, "versions"), c = a.join(r, "natives");
  n.existsSync(r) || n.mkdirSync(r, { recursive: !0 }), n.existsSync(c) || n.mkdirSync(c, { recursive: !0 });
  const g = a.join(r, "options.txt");
  n.writeFileSync(g, `version:2586
chatVisibility:0
forceUnicodeFont:false
realmsNotifications:false
hideServerAddress:false
`, "utf-8");
  const w = a.join(r, ".fabric");
  if (n.existsSync(w))
    try {
      const S = (F) => {
        const fe = n.readdirSync(F);
        for (const U of fe) {
          const O = a.join(F, U);
          n.statSync(O).isDirectory() ? S(O) : U.endsWith(".tmp") && n.unlinkSync(O);
        }
      };
      S(w);
    } catch {
    }
  try {
    let S = t.javaPath, F = !1;
    if (S && n.existsSync(S))
      try {
        K(`"${S}" -version 2>&1`), F = !0;
      } catch {
      }
    if (!F) {
      const l = await se();
      for (const h of l)
        if (n.existsSync(h))
          try {
            K(`"${h}" -version 2>&1`), S = h, F = !0;
            break;
          } catch {
          }
    }
    F || (S = await ke(s, e)), e({
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
    const O = a.join(u, t.version, `${t.version}.json`), $ = await B(U.url);
    if (n.existsSync(a.dirname(O)) || n.mkdirSync(a.dirname(O), { recursive: !0 }), n.writeFileSync(O, JSON.stringify($, null, 2)), (M = $.assetIndex) != null && M.url) {
      const l = a.join(o, "indexes"), h = a.join(l, `${$.assetIndex.id}.json`);
      n.existsSync(h) || (s({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Загрузка манифеста ресурсов...",
        progress: 25
      }), await k($.assetIndex.url, h));
      try {
        const I = JSON.parse(n.readFileSync(h, "utf-8")).objects || {}, D = Object.keys(I), E = a.join(o, "objects"), x = [];
        for (const A of D) {
          const j = I[A].hash, R = j.slice(0, 2), q = a.join(E, R, j);
          n.existsSync(q) || x.push({
            hash: j,
            url: `https://resources.download.minecraft.net/${R}/${j}`,
            dest: q
          });
        }
        if (x.length > 0) {
          s({
            instanceId: t.instanceId,
            stage: "downloading",
            statusText: `Загрузка ресурсов (${x.length} файлов)...`,
            progress: 30
          });
          const A = 75;
          let T = 0;
          for (let j = 0; j < x.length; j += A) {
            const R = x.slice(j, j + A);
            await Promise.all(
              R.map((ye) => k(ye.url, ye.dest).catch(() => {
              }))
            ), T += R.length;
            const q = Math.round(30 + T / x.length * 15);
            s({
              instanceId: t.instanceId,
              stage: "downloading",
              statusText: `Загрузка ресурсов (${T}/${x.length})...`,
              progress: q
            });
          }
        }
      } catch (v) {
        e({ timestamp: Date.now(), type: "warn", message: `Ошибка ресурсов: ${v.message}` });
      }
    }
    const ee = a.join(u, t.version, `${t.version}.jar`);
    !n.existsSync(ee) && ((W = (J = $.downloads) == null ? void 0 : J.client) != null && W.url) && (s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка Minecraft client.jar...",
      progress: 50
    }), await k($.downloads.client.url, ee)), s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка и распаковка библиотек...",
      progress: 60
    });
    const V = [], De = $.libraries || [];
    for (const l of De)
      if (Ae(l.rules)) {
        if ((ce = l.downloads) != null && ce.artifact) {
          const h = l.downloads.artifact.path, v = a.join(f, h);
          if (!n.existsSync(v))
            try {
              await k(l.downloads.artifact.url, v);
            } catch {
            }
          n.existsSync(v) && (V.push(v), (h.includes("natives") || l.name.includes("natives")) && te(v, c));
        }
        if ((le = l.downloads) != null && le.classifiers) {
          const h = l.downloads.classifiers, v = h["natives-windows"] || h["natives-windows-64"] || h["natives-windows-x86"];
          if (v) {
            const I = v.path, D = a.join(f, I);
            if (!n.existsSync(D))
              try {
                await k(v.url, D);
              } catch {
              }
            n.existsSync(D) && te(D, c);
          }
        }
        if (!((de = l.downloads) != null && de.artifact) && l.name) {
          const h = l.name.split(":"), v = h[0].replace(/\./g, "/"), I = h[1], D = h[2], E = `${v}/${I}/${D}/${I}-${D}.jar`, x = a.join(f, E), A = l.url ? `${l.url}${E}` : `https://libraries.minecraft.net/${E}`;
          if (!n.existsSync(x))
            try {
              await k(A, x);
            } catch {
            }
          n.existsSync(x) && (V.push(x), l.name.includes("natives") && te(x, c));
        }
      }
    V.push(ee);
    let pe = $.mainClass || "net.minecraft.client.main.Main";
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
          if (v.mainClass && (pe = v.mainClass), v.libraries)
            for (const I of v.libraries) {
              const D = I.name.split(":"), E = D[0].replace(/\./g, "/"), x = D[1], A = D[2], T = `${E}/${x}/${A}/${x}-${A}.jar`, j = a.join(f, T), R = I.url ? `${I.url}${T}` : `https://maven.fabricmc.net/${T}`;
              if (!n.existsSync(j))
                try {
                  await k(R, j);
                } catch {
                }
              n.existsSync(j) && V.unshift(j);
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
    const be = V.join(a.delimiter), p = [];
    p.push(`-Xms${t.memoryMin || 1024}M`), p.push(`-Xmx${t.memoryMax || 4096}M`), p.push(`-Djava.library.path=${c}`), p.push("-Dminecraft.api.auth.host=http://127.0.0.1"), p.push("-Dminecraft.api.account.host=http://127.0.0.1"), p.push("-Dminecraft.api.session.host=http://127.0.0.1"), p.push("-Dminecraft.api.services.host=http://127.0.0.1"), p.push("-XX:+UseG1GC", "-XX:+UnlockExperimentalVMOptions", "-XX:G1NewSizePercent=20", "-XX:G1ReservePercent=20", "-XX:MaxGCPauseMillis=50", "-XX:G1HeapRegionSize=32M"), t.customJvmArgs && p.push(...t.customJvmArgs.split(" ").filter(Boolean)), p.push("-cp", be), p.push(pe);
    const he = (t.uuid || z(t.username || "Player")).replace(/-/g, "");
    if ($.minecraftArguments && typeof $.minecraftArguments == "string") {
      const l = $.minecraftArguments.split(" ");
      for (const h of l) {
        let v = h.replace("${auth_player_name}", t.username || "Player").replace("${version_name}", t.version).replace("${game_directory}", r).replace("${assets_root}", o).replace("${assets_index_name}", ((ue = $.assetIndex) == null ? void 0 : ue.id) || t.version).replace("${auth_uuid}", he).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", "release");
        p.push(v);
      }
    } else
      p.push("--username", t.username || "Player"), p.push("--version", t.version), p.push("--gameDir", r), p.push("--assetsDir", o), p.push("--assetIndex", ((me = $.assetIndex) == null ? void 0 : me.id) || t.version), p.push("--uuid", he), p.push("--accessToken", "0"), p.push("--userType", "mojang"), p.push("--versionType", "release");
    e({
      timestamp: Date.now(),
      type: "info",
      message: `Команда запуска: "${S}" ${p.join(" ")}`
    });
    const X = Me(S || "javaw", p, {
      cwd: r,
      detached: !0
    });
    H.set(t.instanceId, X), X.stdout.on("data", (l) => {
      e({ timestamp: Date.now(), type: "info", message: l.toString() });
    }), X.stderr.on("data", (l) => {
      e({ timestamp: Date.now(), type: "warn", message: l.toString() });
    }), X.on("error", (l) => {
      H.delete(t.instanceId), s({
        instanceId: t.instanceId,
        stage: "error",
        statusText: `Ошибка процесса: ${l.message}`,
        progress: 0,
        error: l.message
      }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${l.message}` });
    }), X.on("exit", (l) => {
      H.delete(t.instanceId), s({
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
function Je(t) {
  const s = H.get(t);
  return s ? (s.kill(), H.delete(t), !0) : !1;
}
Ie.setApplicationMenu(null);
const Se = a.dirname(Pe(import.meta.url));
process.env.APP_ROOT = a.join(Se, "..");
const ne = process.env.VITE_DEV_SERVER_URL, Xe = a.join(process.env.APP_ROOT, "dist-electron"), ge = a.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = ne ? a.join(process.env.APP_ROOT, "public") : ge;
let d = null;
const b = Y(), Z = a.join(b, "accounts.json"), Q = a.join(b, "instances.json"), je = a.join(b, "settings.json"), L = a.join(b, "skins");
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
]), P = oe(je, {
  javaPath: "",
  memoryMin: 1024,
  memoryMax: 4096,
  customJvmArgs: "",
  closeLauncherOnGameStart: !1,
  gameDir: b
});
function $e() {
  d = new we({
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
  }), d.webContents.on("did-finish-load", () => {
    d == null || d.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), ne ? d.loadURL(ne) : d.loadFile(a.join(ge, "index.html"));
}
G.on("window-all-closed", () => {
  process.platform !== "darwin" && (G.quit(), d = null);
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
function Fe() {
  m.handle("minimize-window", () => {
    d == null || d.minimize();
  }), m.handle("maximize-window", () => d ? d.isMaximized() ? (d.unmaximize(), !1) : (d.maximize(), !0) : !1), m.handle("close-window", () => {
    d == null || d.close();
  }), m.handle("is-maximized", () => (d == null ? void 0 : d.isMaximized()) || !1), m.handle("get-accounts", () => y), m.handle("add-account", (t, s) => {
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
  }), m.handle("set-active-account", (t, s) => (y = y.map((e) => ({
    ...e,
    isActive: e.id === s
  })), N(Z, y), y)), m.handle("delete-account", (t, s) => (y = y.filter((e) => e.id !== s), y.length > 0 && !y.some((e) => e.isActive) && (y[0].isActive = !0), N(Z, y), y)), m.handle("get-instances", () => _), m.handle("create-instance", (t, s) => {
    const e = {
      id: "inst-" + Date.now(),
      name: s.version,
      version: s.version,
      loader: s.loader || "vanilla",
      created: Date.now(),
      memoryMin: P.memoryMin,
      memoryMax: P.memoryMax
    };
    _.push(e), N(Q, _);
    const i = a.join(b, "instances", e.id), r = a.join(i, "mods");
    return n.existsSync(r) || n.mkdirSync(r, { recursive: !0 }), _;
  }), m.handle("delete-instance", (t, s) => {
    _ = _.filter((i) => i.id !== s), N(Q, _);
    const e = a.join(b, "instances", s);
    return n.existsSync(e) && n.rmSync(e, { recursive: !0, force: !0 }), _;
  }), m.handle("get-versions", async () => {
    try {
      return await xe();
    } catch (t) {
      return console.error("Failed to get versions:", t), { latest: { release: "1.20.4", snapshot: "1.20.4" }, versions: [] };
    }
  }), m.handle("get-settings", () => P), m.handle("save-settings", (t, s) => (P = { ...P, ...s }, N(je, P), P)), m.handle("detect-java", async () => await se()), m.handle("launch-instance", async (t, s) => {
    const e = _.find((o) => o.id === s);
    if (!e) throw new Error("Инстанс не найден");
    const i = y.find((o) => o.isActive) || y[0];
    if (!i) throw new Error("Добавьте хотя бы один аккаунт!");
    e.lastPlayed = Date.now(), N(Q, _);
    const r = e.javaPath || P.javaPath || (await se())[0];
    return Te(
      {
        instanceId: e.id,
        instanceName: e.name,
        version: e.version,
        loader: e.loader || "vanilla",
        username: i.username,
        uuid: i.uuid,
        memoryMin: e.memoryMin || P.memoryMin || 1024,
        memoryMax: e.memoryMax || P.memoryMax || 4096,
        javaPath: r,
        customJvmArgs: e.jvmArgs || P.customJvmArgs
      },
      (o) => {
        d == null || d.webContents.send("launch-progress", o);
      },
      (o) => {
        d == null || d.webContents.send("game-log", o);
      }
    ), !0;
  }), m.handle("stop-instance", (t, s) => Je(s)), m.handle("open-instance-folder", (t, s) => {
    const e = a.join(b, "instances", s);
    n.existsSync(e) || n.mkdirSync(e, { recursive: !0 }), _e.openPath(e);
  }), m.handle("get-instance-mods", (t, s) => {
    const e = a.join(b, "instances", s, "mods");
    if (!n.existsSync(e)) return [];
    try {
      return n.readdirSync(e).map((r) => {
        const o = a.join(e, r), f = n.statSync(o), u = r.endsWith(".jar"), c = r.replace(/\.jar(\.disabled)?$/, "");
        return {
          id: r,
          filename: r,
          name: c,
          enabled: u,
          size: f.size
        };
      });
    } catch {
      return [];
    }
  }), m.handle("toggle-mod", (t, { instanceId: s, modFilename: e }) => {
    const i = a.join(b, "instances", s, "mods"), r = a.join(i, e);
    if (!n.existsSync(r)) return !1;
    let o = e;
    e.endsWith(".jar") ? o = e + ".disabled" : e.endsWith(".jar.disabled") && (o = e.replace(/\.disabled$/, ""));
    const f = a.join(i, o);
    return n.renameSync(r, f), !0;
  }), m.handle("download-mod-file", async (t, { instanceId: s, downloadUrl: e, filename: i }) => {
    const r = a.join(b, "instances", s, "mods");
    n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
    const o = a.join(r, i);
    return await ae(e, o), !0;
  }), m.handle("add-mod-file", async (t, s) => {
    if (!d) return !1;
    const e = await ve.showOpenDialog(d, {
      title: "Выберите файл мода (.jar)",
      filters: [{ name: "Minecraft Mods", extensions: ["jar"] }],
      properties: ["openFile", "multiSelections"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const i = a.join(b, "instances", s, "mods");
    n.existsSync(i) || n.mkdirSync(i, { recursive: !0 });
    for (const r of e.filePaths) {
      const o = a.join(i, a.basename(r));
      n.copyFileSync(r, o);
    }
    return !0;
  }), m.handle("save-user-skin", async (t, s) => {
    if (!d) return !1;
    const e = await ve.showOpenDialog(d, {
      title: "Выберите файл скина Minecraft (.png)",
      filters: [{ name: "Minecraft Skins", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const i = a.join(L, `${s}.png`);
    return n.copyFileSync(e.filePaths[0], i), i;
  }), m.handle("fetch-online-skin", async (t, { username: s, targetUsername: e }) => {
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
  }), m.handle("get-profile-stats", (t, s) => {
    let e = 0;
    const i = [];
    let r = "Выживание 1.20", o = "Hypixel / PlayMine", f = 0, u = 0;
    try {
      for (const w of _) {
        w.lastPlayed && (u = Math.max(u, w.lastPlayed), f += 45);
        const M = a.join(b, "instances", w.id, "saves");
        if (n.existsSync(M)) {
          const J = n.readdirSync(M);
          for (const W of J)
            n.statSync(a.join(M, W)).isDirectory() && (e++, i.push(W));
        }
      }
      i.length > 0 && (r = i[0]);
    } catch {
    }
    const c = y.find((w) => w.username === s) || y.find((w) => w.isActive) || y[0], g = (f / 60).toFixed(1), C = u ? new Date(u).toLocaleString() : "Не запускался";
    return {
      username: c ? c.username : s,
      uuid: c ? c.uuid : "",
      worldsCount: e,
      totalPlayTimeHours: g,
      lastPlayedFormatted: C,
      favoriteWorld: r,
      favoriteServer: o
    };
  }), m.handle("get-user-skin", (t, s) => {
    const e = a.join(L, `${s}.png`);
    return n.existsSync(e) ? `data:image/png;base64,${n.readFileSync(e).toString("base64")}` : null;
  });
}
G.whenReady().then(() => {
  Fe(), $e();
});
export {
  Xe as MAIN_DIST,
  ge as RENDERER_DIST,
  ne as VITE_DEV_SERVER_URL
};
