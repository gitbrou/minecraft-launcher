import { app as G, Menu as Pe, BrowserWindow as xe, ipcMain as f, shell as Ie, dialog as ae } from "electron";
import { fileURLToPath as Ce } from "node:url";
import o from "node:path";
import n from "node:fs";
import ee from "node:https";
import te from "node:http";
import ke from "node:crypto";
import { execSync as q, spawn as _e } from "node:child_process";
const K = /* @__PURE__ */ new Map();
function ne() {
  const s = G.getPath("userData"), a = o.join(s, ".mine-launcher");
  return n.existsSync(a) || n.mkdirSync(a, { recursive: !0 }), a;
}
function U(s) {
  const a = ke.createHash("md5");
  a.update(`OfflinePlayer:${s}`);
  const t = a.digest();
  t[6] = t[6] & 15 | 48, t[8] = t[8] & 63 | 128;
  const e = t.toString("hex");
  return `${e.slice(0, 8)}-${e.slice(8, 12)}-${e.slice(12, 16)}-${e.slice(16, 20)}-${e.slice(20, 32)}`;
}
function L(s) {
  return new Promise((a, t) => {
    (s.startsWith("https") ? ee : te).get(s, (r) => {
      if (r.statusCode && r.statusCode >= 300 && r.statusCode < 400 && r.headers.location)
        return L(r.headers.location).then(a).catch(t);
      if (r.statusCode !== 200)
        return t(new Error(`HTTP ${r.statusCode} loading ${s}`));
      let i = "";
      r.on("data", (l) => {
        i += l;
      }), r.on("end", () => {
        try {
          a(JSON.parse(i));
        } catch (l) {
          t(l);
        }
      });
    }).on("error", t);
  });
}
function O(s, a) {
  return new Promise((t, e) => {
    const r = o.dirname(a);
    n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
    const i = n.createWriteStream(a);
    (s.startsWith("https") ? ee : te).get(s, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return i.close(), O(c.headers.location, a).then(t).catch(e);
      if (c.statusCode !== 200)
        return i.close(), n.unlink(a, () => {
        }), e(new Error(`Failed to download ${s}: HTTP ${c.statusCode}`));
      c.pipe(i), i.on("finish", () => {
        i.close(() => t());
      });
    }).on("error", (c) => {
      i.close(), n.unlink(a, () => {
      }), e(c);
    });
  });
}
function ie(s, a) {
  if (n.existsSync(s))
    try {
      const t = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::OpenRead('${s.replace(/'/g, "''")}').Entries | Where-Object { $_.FullName -like '*.dll' } | ForEach-Object { $dest = [System.IO.Path]::Combine('${a.replace(/'/g, "''")}', $_.Name); [System.IO.Compression.ZipFileExtensions]::ExtractToFile($_, $dest, $true) }"`;
      q(t, { stdio: "ignore" });
    } catch {
      try {
        q(`powershell -Command "Expand-Archive -Path '${s}' -DestinationPath '${a}' -Force"`, { stdio: "ignore" });
      } catch {
      }
    }
}
function Me(s) {
  if (!s || s.length === 0) return !0;
  let a = !1;
  for (const t of s)
    t.action === "allow" ? (!t.os || t.os.name === "windows") && (a = !0) : t.action === "disallow" && (!t.os || t.os.name === "windows") && (a = !1);
  return a;
}
async function re() {
  const s = [], a = process.platform === "win32", t = a ? "javaw.exe" : "java", e = ne(), r = o.join(e, "java", "java-17"), i = (d) => {
    if (!n.existsSync(d)) return null;
    const c = n.readdirSync(d);
    for (const y of c) {
      const w = o.join(d, y);
      if (y.toLowerCase() === "javaw.exe") return w;
      if (n.statSync(w).isDirectory()) {
        const p = i(w);
        if (p) return p;
      }
    }
    return null;
  }, l = i(r);
  if (l && s.push(l), process.env.JAVA_HOME) {
    const d = o.join(process.env.JAVA_HOME, "bin", t);
    n.existsSync(d) && s.push(d);
  }
  if (a) {
    const d = [
      "C:\\Program Files\\Java",
      "C:\\Program Files (x86)\\Java",
      "C:\\Program Files\\Eclipse Adoptium",
      "C:\\Program Files\\Microsoft",
      "C:\\Program Files\\BellSoft",
      "C:\\Program Files\\Amazon Corretto",
      o.join(process.env.LOCALAPPDATA || "", "Programs", "AdoptOpenJDK"),
      "C:\\Program Files (x86)\\Minecraft Launcher\\runtime"
    ];
    for (const c of d)
      if (n.existsSync(c))
        try {
          const y = n.readdirSync(c);
          for (const w of y) {
            const p = o.join(c, w, "bin", t);
            n.existsSync(p) && !s.includes(p) && s.push(p);
          }
        } catch {
        }
  }
  return s;
}
async function Ae(s, a) {
  const t = ne(), e = o.join(t, "java", "java-17"), r = (y) => {
    if (!n.existsSync(y)) return null;
    const w = n.readdirSync(y);
    for (const p of w) {
      const $ = o.join(y, p);
      if (p.toLowerCase() === "javaw.exe") return $;
      if (n.statSync($).isDirectory()) {
        const x = r($);
        if (x) return x;
      }
    }
    return null;
  }, i = r(e);
  if (i)
    return i;
  s({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: "Авто-скачивание OpenJDK Java 17...",
    progress: 15
  }), a({ timestamp: Date.now(), type: "info", message: "Java не найдена на ПК. Автоматическое скачивание OpenJDK Java 17 (Temurin)..." });
  const l = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jre_x64_windows_hotspot_17.0.10_7.zip", d = o.join(t, "java", "java-17.zip");
  n.existsSync(o.dirname(d)) || n.mkdirSync(o.dirname(d), { recursive: !0 }), s({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: "Загрузка OpenJDK Java 17 (40 MB)...",
    progress: 35
  }), await O(l, d), s({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: "Распаковка Java 17 Runtime...",
    progress: 75
  }), a({ timestamp: Date.now(), type: "info", message: "Распаковка архива Java 17..." }), n.existsSync(e) || n.mkdirSync(e, { recursive: !0 });
  try {
    q(`powershell -Command "Expand-Archive -Path '${d}' -DestinationPath '${e}' -Force"`), n.unlinkSync(d);
  } catch (y) {
    a({ timestamp: Date.now(), type: "warn", message: `Ошибка PowerShell распаковки: ${y.message}` });
  }
  const c = r(e);
  if (!c)
    throw new Error("Не удалось найти javaw.exe после распаковки Java 17. Установите Java вручную.");
  return a({ timestamp: Date.now(), type: "info", message: `Java 17 успешно установлена: ${c}` }), c;
}
async function ge() {
  return await L("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function Te(s, a, t) {
  var $, x, M, I, ue, me, fe, pe;
  const e = ne(), r = o.join(e, "instances", s.instanceId), i = o.join(e, "assets"), l = o.join(e, "libraries"), d = o.join(e, "versions"), c = o.join(r, "natives");
  n.existsSync(r) || n.mkdirSync(r, { recursive: !0 }), n.existsSync(c) || n.mkdirSync(c, { recursive: !0 });
  const y = o.join(r, "options.txt");
  n.writeFileSync(y, `version:2586
chatVisibility:0
forceUnicodeFont:false
realmsNotifications:false
hideServerAddress:false
`, "utf-8");
  const p = o.join(r, ".fabric");
  if (n.existsSync(p))
    try {
      const b = (R) => {
        const he = n.readdirSync(R);
        for (const V of he) {
          const H = o.join(R, V);
          n.statSync(H).isDirectory() ? b(H) : V.endsWith(".tmp") && n.unlinkSync(H);
        }
      };
      b(p);
    } catch {
    }
  try {
    let b = s.javaPath, R = !1;
    if (b && n.existsSync(b))
      try {
        q(`"${b}" -version 2>&1`), R = !0;
      } catch {
      }
    if (!R) {
      const u = await re();
      for (const g of u)
        if (n.existsSync(g))
          try {
            q(`"${g}" -version 2>&1`), b = g, R = !0;
            break;
          } catch {
          }
    }
    R || (b = await Ae(a, t)), t({
      timestamp: Date.now(),
      type: "info",
      message: `Используемый файл Java: ${b}`
    }), a({
      instanceId: s.instanceId,
      stage: "checking",
      statusText: "Получение манифеста версий...",
      progress: 10
    });
    const V = (await ge()).versions.find((u) => u.id === s.version);
    if (!V)
      throw new Error(`Версия Minecraft ${s.version} не найдена в манифесте Mojang`);
    a({
      instanceId: s.instanceId,
      stage: "downloading",
      statusText: `Загрузка структуры версии ${s.version}...`,
      progress: 20
    });
    const H = o.join(d, s.version, `${s.version}.json`), C = await L(V.url);
    if (n.existsSync(o.dirname(H)) || n.mkdirSync(o.dirname(H), { recursive: !0 }), n.writeFileSync(H, JSON.stringify(C, null, 2)), ($ = C.assetIndex) != null && $.url) {
      const u = o.join(i, "indexes"), g = o.join(u, `${C.assetIndex.id}.json`);
      n.existsSync(g) || (a({
        instanceId: s.instanceId,
        stage: "downloading",
        statusText: "Загрузка манифеста ресурсов...",
        progress: 25
      }), await O(C.assetIndex.url, g));
      try {
        const A = JSON.parse(n.readFileSync(g, "utf-8")).objects || {}, k = Object.keys(A), W = o.join(i, "objects"), D = [];
        for (const J of k) {
          const P = A[J].hash, z = P.slice(0, 2), Z = o.join(W, z, P);
          n.existsSync(Z) || D.push({
            hash: P,
            url: `https://resources.download.minecraft.net/${z}/${P}`,
            dest: Z
          });
        }
        if (D.length > 0) {
          a({
            instanceId: s.instanceId,
            stage: "downloading",
            statusText: `Загрузка ресурсов (${D.length} файлов)...`,
            progress: 30
          });
          const J = 75;
          let E = 0;
          for (let P = 0; P < D.length; P += J) {
            const z = D.slice(P, P + J);
            await Promise.all(
              z.map((we) => O(we.url, we.dest).catch(() => {
              }))
            ), E += z.length;
            const Z = Math.round(30 + E / D.length * 15);
            a({
              instanceId: s.instanceId,
              stage: "downloading",
              statusText: `Загрузка ресурсов (${E}/${D.length})...`,
              progress: Z
            });
          }
        }
      } catch (j) {
        t({ timestamp: Date.now(), type: "warn", message: `Ошибка ресурсов: ${j.message}` });
      }
    }
    const se = o.join(d, s.version, `${s.version}.jar`);
    !n.existsSync(se) && ((M = (x = C.downloads) == null ? void 0 : x.client) != null && M.url) && (a({
      instanceId: s.instanceId,
      stage: "downloading",
      statusText: "Загрузка Minecraft client.jar...",
      progress: 50
    }), await O(C.downloads.client.url, se)), a({
      instanceId: s.instanceId,
      stage: "downloading",
      statusText: "Загрузка и распаковка библиотек...",
      progress: 60
    });
    const X = [], De = C.libraries || [];
    for (const u of De)
      if (Me(u.rules)) {
        if ((I = u.downloads) != null && I.artifact) {
          const g = u.downloads.artifact.path, j = o.join(l, g);
          if (!n.existsSync(j))
            try {
              await O(u.downloads.artifact.url, j);
            } catch {
            }
          n.existsSync(j) && (X.push(j), (g.includes("natives") || u.name.includes("natives")) && ie(j, c));
        }
        if ((ue = u.downloads) != null && ue.classifiers) {
          const g = u.downloads.classifiers, j = g["natives-windows"] || g["natives-windows-64"] || g["natives-windows-x86"];
          if (j) {
            const A = j.path, k = o.join(l, A);
            if (!n.existsSync(k))
              try {
                await O(j.url, k);
              } catch {
              }
            n.existsSync(k) && ie(k, c);
          }
        }
        if (!((me = u.downloads) != null && me.artifact) && u.name) {
          const g = u.name.split(":"), j = g[0].replace(/\./g, "/"), A = g[1], k = g[2], W = `${j}/${A}/${k}/${A}-${k}.jar`, D = o.join(l, W), J = u.url ? `${u.url}${W}` : `https://libraries.minecraft.net/${W}`;
          if (!n.existsSync(D))
            try {
              await O(J, D);
            } catch {
            }
          n.existsSync(D) && (X.push(D), u.name.includes("natives") && ie(D, c));
        }
      }
    X.push(se);
    let ye = C.mainClass || "net.minecraft.client.main.Main";
    if (s.loader === "fabric") {
      a({
        instanceId: s.instanceId,
        stage: "downloading",
        statusText: "Настройка Fabric...",
        progress: 75
      });
      try {
        const u = await L(`https://meta.fabricmc.net/v2/versions/loader/${s.version}`);
        if (u && u.length > 0) {
          const g = u[0].loader.version, j = await L(`https://meta.fabricmc.net/v2/versions/loader/${s.version}/${g}/profile/json`);
          if (j.mainClass && (ye = j.mainClass), j.libraries)
            for (const A of j.libraries) {
              const k = A.name.split(":"), W = k[0].replace(/\./g, "/"), D = k[1], J = k[2], E = `${W}/${D}/${J}/${D}-${J}.jar`, P = o.join(l, E), z = A.url ? `${A.url}${E}` : `https://maven.fabricmc.net/${E}`;
              if (!n.existsSync(P))
                try {
                  await O(z, P);
                } catch {
                }
              n.existsSync(P) && X.unshift(P);
            }
        }
      } catch (u) {
        t({ timestamp: Date.now(), type: "warn", message: `Fabric метаданные: ${u.message}` });
      }
    }
    a({
      instanceId: s.instanceId,
      stage: "launching",
      statusText: "Запуск Minecraft...",
      progress: 90
    });
    const be = X.join(o.delimiter), v = [];
    v.push(`-Xms${s.memoryMin || 1024}M`), v.push(`-Xmx${s.memoryMax || 4096}M`), v.push(`-Djava.library.path=${c}`), v.push("-Dminecraft.api.auth.host=http://127.0.0.1"), v.push("-Dminecraft.api.account.host=http://127.0.0.1"), v.push("-Dminecraft.api.session.host=http://127.0.0.1"), v.push("-Dminecraft.api.services.host=http://127.0.0.1"), v.push("-XX:+UseG1GC", "-XX:+UnlockExperimentalVMOptions", "-XX:G1NewSizePercent=20", "-XX:G1ReservePercent=20", "-XX:MaxGCPauseMillis=50", "-XX:G1HeapRegionSize=32M"), s.customJvmArgs && v.push(...s.customJvmArgs.split(" ").filter(Boolean)), v.push("-cp", be), v.push(ye);
    const ve = (s.uuid || U(s.username || "Player")).replace(/-/g, "");
    if (C.minecraftArguments && typeof C.minecraftArguments == "string") {
      const u = C.minecraftArguments.split(" ");
      for (const g of u) {
        let j = g.replace("${auth_player_name}", s.username || "Player").replace("${version_name}", s.version).replace("${game_directory}", r).replace("${assets_root}", i).replace("${assets_index_name}", ((fe = C.assetIndex) == null ? void 0 : fe.id) || s.version).replace("${auth_uuid}", ve).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", "release");
        v.push(j);
      }
    } else
      v.push("--username", s.username || "Player"), v.push("--version", s.version), v.push("--gameDir", r), v.push("--assetsDir", i), v.push("--assetIndex", ((pe = C.assetIndex) == null ? void 0 : pe.id) || s.version), v.push("--uuid", ve), v.push("--accessToken", "0"), v.push("--userType", "mojang"), v.push("--versionType", "release");
    t({
      timestamp: Date.now(),
      type: "info",
      message: `Команда запуска: "${b}" ${v.join(" ")}`
    });
    const B = _e(b || "javaw", v, {
      cwd: r,
      detached: !0
    });
    K.set(s.instanceId, B), B.stdout.on("data", (u) => {
      t({ timestamp: Date.now(), type: "info", message: u.toString() });
    }), B.stderr.on("data", (u) => {
      t({ timestamp: Date.now(), type: "warn", message: u.toString() });
    }), B.on("error", (u) => {
      K.delete(s.instanceId), a({
        instanceId: s.instanceId,
        stage: "error",
        statusText: `Ошибка процесса: ${u.message}`,
        progress: 0,
        error: u.message
      }), t({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${u.message}` });
    }), B.on("exit", (u) => {
      K.delete(s.instanceId), a({
        instanceId: s.instanceId,
        stage: "idle",
        statusText: `Игра завершена (код ${u})`,
        progress: 0
      }), t({ timestamp: Date.now(), type: "info", message: `Minecraft завершился с кодом ${u}` });
    }), a({
      instanceId: s.instanceId,
      stage: "running",
      statusText: "Игра запущена!",
      progress: 100
    });
  } catch (b) {
    a({
      instanceId: s.instanceId,
      stage: "error",
      statusText: `Ошибка: ${b.message}`,
      progress: 0,
      error: b.message
    }), t({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${b.message}` });
  }
}
function Fe(s) {
  const a = K.get(s);
  return a ? (a.kill(), K.delete(s), !0) : !1;
}
Pe.setApplicationMenu(null);
const Se = o.dirname(Ce(import.meta.url));
process.env.APP_ROOT = o.join(Se, "..");
const oe = process.env.VITE_DEV_SERVER_URL, Ve = o.join(process.env.APP_ROOT, "dist-electron"), je = o.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = oe ? o.join(process.env.APP_ROOT, "public") : je;
let m = null;
const _ = ne(), Y = o.join(_, "accounts.json"), Q = o.join(_, "instances.json"), ce = o.join(_, "settings.json"), F = o.join(_, "skins");
n.existsSync(F) || n.mkdirSync(F, { recursive: !0 });
function de(s, a) {
  try {
    if (n.existsSync(s))
      return JSON.parse(n.readFileSync(s, "utf-8"));
  } catch (t) {
    console.error(`Failed loading ${s}:`, t);
  }
  return a;
}
function N(s, a) {
  try {
    n.writeFileSync(s, JSON.stringify(a, null, 2), "utf-8");
  } catch (t) {
    console.error(`Failed saving ${s}:`, t);
  }
}
let S = de(Y, [
  { id: "1", username: "Test", uuid: U("Test"), type: "offline", isActive: !0, createdAt: Date.now() - 5e4 },
  { id: "2", username: "Nick 2", uuid: U("Nick 2"), type: "offline", isActive: !1, createdAt: Date.now() - 4e4 },
  { id: "3", username: "Nick 3", uuid: U("Nick 3"), type: "offline", isActive: !1, createdAt: Date.now() - 3e4 }
]), T = de(Q, [
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
]), h = de(ce, {
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
  m = new xe({
    width: 1050,
    height: 720,
    minWidth: 900,
    minHeight: 650,
    frame: !1,
    titleBarStyle: "hidden",
    icon: o.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: o.join(Se, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), m.webContents.on("did-finish-load", () => {
    m == null || m.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), oe ? m.loadURL(oe) : m.loadFile(o.join(je, "index.html"));
}
G.on("window-all-closed", () => {
  process.platform !== "darwin" && (G.quit(), m = null);
});
G.on("activate", () => {
  xe.getAllWindows().length === 0 && $e();
});
function le(s, a) {
  return new Promise((t, e) => {
    const r = o.dirname(a);
    n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
    const i = n.createWriteStream(a);
    (s.startsWith("https") ? ee : te).get(s, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return i.close(), le(c.headers.location, a).then(t).catch(e);
      if (c.statusCode !== 200)
        return i.close(), n.unlink(a, () => {
        }), e(new Error(`Failed download ${s}: HTTP ${c.statusCode}`));
      c.pipe(i), i.on("finish", () => {
        i.close(() => t());
      });
    }).on("error", (c) => {
      i.close(), n.unlink(a, () => {
      }), e(c);
    });
  });
}
function Je() {
  f.handle("minimize-window", () => {
    m == null || m.minimize();
  }), f.handle("maximize-window", () => m ? m.isMaximized() ? (m.unmaximize(), !1) : (m.maximize(), !0) : !1), f.handle("close-window", () => {
    m == null || m.close();
  }), f.handle("is-maximized", () => (m == null ? void 0 : m.isMaximized()) || !1), f.handle("get-accounts", () => S), f.handle("add-account", (a, t) => {
    const e = t.trim();
    if (!e) throw new Error("Имя пользователя не может быть пустым");
    if (S.some((l) => l.username.toLowerCase() === e.toLowerCase()))
      throw new Error(`Никнейм "${e}" уже существует!`);
    const i = {
      id: Date.now().toString(),
      username: e,
      uuid: U(e),
      type: "offline",
      isActive: S.length === 0,
      createdAt: Date.now()
    };
    return S.push(i), N(Y, S), S;
  }), f.handle("set-active-account", (a, t) => (S = S.map((e) => ({
    ...e,
    isActive: e.id === t
  })), N(Y, S), S)), f.handle("delete-account", (a, t) => (S = S.filter((e) => e.id !== t), S.length > 0 && !S.some((e) => e.isActive) && (S[0].isActive = !0), N(Y, S), S)), f.handle("get-instances", () => T), f.handle("create-instance", (a, t) => {
    const e = {
      id: "inst-" + Date.now(),
      name: t.version,
      version: t.version,
      loader: t.loader || "vanilla",
      created: Date.now(),
      memoryMin: h.memoryMin,
      memoryMax: h.memoryMax
    };
    T.push(e), N(Q, T);
    const r = o.join(_, "instances", e.id), i = o.join(r, "mods");
    return n.existsSync(i) || n.mkdirSync(i, { recursive: !0 }), T;
  }), f.handle("delete-instance", (a, t) => {
    T = T.filter((r) => r.id !== t), N(Q, T);
    const e = o.join(_, "instances", t);
    return n.existsSync(e) && n.rmSync(e, { recursive: !0, force: !0 }), T;
  }), f.handle("get-versions", async () => {
    try {
      return await ge();
    } catch (a) {
      return console.error("Failed to get versions:", a), { latest: { release: "1.20.4", snapshot: "1.20.4" }, versions: [] };
    }
  }), f.handle("get-settings", () => h), f.handle("save-settings", (a, t) => (h = { ...h, ...t }, N(ce, h), h)), f.handle("detect-java", async () => await re()), f.handle("launch-instance", async (a, t) => {
    const e = T.find((d) => d.id === t);
    if (!e) throw new Error("Инстанс не найден");
    const r = S.find((d) => d.isActive) || S[0];
    if (!r) throw new Error("Добавьте хотя бы один аккаунт!");
    e.lastPlayed = Date.now(), N(Q, T);
    const i = e.javaPath || h.javaPath || (await re())[0];
    let l = e.jvmArgs || h.customJvmArgs || "";
    return h.useProxy && h.proxyHost && h.proxyPort && (h.proxyType === "socks5" ? l += ` -DsocksProxyHost=${h.proxyHost} -DsocksProxyPort=${h.proxyPort}` : l += ` -Dhttp.proxyHost=${h.proxyHost} -Dhttp.proxyPort=${h.proxyPort} -Dhttps.proxyHost=${h.proxyHost} -Dhttps.proxyPort=${h.proxyPort}`), Te(
      {
        instanceId: e.id,
        instanceName: e.name,
        version: e.version,
        loader: e.loader || "vanilla",
        username: r.username,
        uuid: r.uuid,
        memoryMin: e.memoryMin || h.memoryMin || 1024,
        memoryMax: e.memoryMax || h.memoryMax || 4096,
        javaPath: i,
        customJvmArgs: l.trim()
      },
      (d) => {
        m == null || m.webContents.send("launch-progress", d);
      },
      (d) => {
        m == null || m.webContents.send("game-log", d);
      }
    ), !0;
  }), f.handle("stop-instance", (a, t) => Fe(t)), f.handle("open-instance-folder", (a, t) => {
    const e = o.join(_, "instances", t);
    n.existsSync(e) || n.mkdirSync(e, { recursive: !0 }), Ie.openPath(e);
  }), f.handle("get-instance-mods", (a, t) => {
    const e = o.join(_, "instances", t, "mods");
    if (!n.existsSync(e)) return [];
    try {
      return n.readdirSync(e).map((i) => {
        const l = o.join(e, i), d = n.statSync(l), c = i.endsWith(".jar"), y = i.replace(/\.jar(\.disabled)?$/, "");
        let w = "";
        const p = y.toLowerCase();
        return p.includes("iris") ? w = "https://cdn.modrinth.com/data/YL57xq9U/a14589d8164bdf6933bbec92c3008061dfcceecb.png" : p.includes("sodium") ? w = "https://cdn.modrinth.com/data/AANobbFp/d3f0a5015e1a1415df22fa2ff07b46ff4be9cfd8.png" : p.includes("optifine") ? w = "https://optifine.net/favicon.ico" : p.includes("fabric") ? w = "https://cdn.modrinth.com/data/P7Rstage/icon.png" : p.includes("lithium") ? w = "https://cdn.modrinth.com/data/gv2qrgfy/icon.png" : p.includes("indium") ? w = "https://cdn.modrinth.com/data/OradFiWy/icon.png" : p.includes("ferrite") && (w = "https://cdn.modrinth.com/data/u6uhacGG/icon.png"), {
          id: i,
          filename: i,
          name: y,
          enabled: c,
          size: d.size,
          iconUrl: w
        };
      });
    } catch {
      return [];
    }
  }), f.handle("toggle-mod", (a, { instanceId: t, modFilename: e }) => {
    const r = o.join(_, "instances", t, "mods"), i = o.join(r, e);
    if (!n.existsSync(i)) return !1;
    let l = e;
    e.endsWith(".jar") ? l = e + ".disabled" : e.endsWith(".jar.disabled") && (l = e.replace(/\.disabled$/, ""));
    const d = o.join(r, l);
    return n.renameSync(i, d), !0;
  }), f.handle("download-mod-file", async (a, { instanceId: t, downloadUrl: e, filename: r }) => {
    const i = o.join(_, "instances", t, "mods");
    n.existsSync(i) || n.mkdirSync(i, { recursive: !0 });
    const l = o.join(i, r);
    return await le(e, l), !0;
  }), f.handle("add-mod-file", async (a, t) => {
    if (!m) return !1;
    const e = await ae.showOpenDialog(m, {
      title: "Выберите файл мода (.jar)",
      filters: [{ name: "Minecraft Mods", extensions: ["jar"] }],
      properties: ["openFile", "multiSelections"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const r = o.join(_, "instances", t, "mods");
    n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
    for (const i of e.filePaths) {
      const l = o.join(r, o.basename(i));
      n.copyFileSync(i, l);
    }
    return !0;
  }), f.handle("save-user-skin", async (a, t) => {
    if (!m) return !1;
    const e = await ae.showOpenDialog(m, {
      title: "Выберите файл скина Minecraft (.png)",
      filters: [{ name: "Minecraft Skins", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const r = o.join(F, `${t}.png`);
    return n.copyFileSync(e.filePaths[0], r), r;
  }), f.handle("fetch-online-skin", async (a, { username: t, targetUsername: e }) => {
    const r = o.join(F, `${t}.png`), i = [
      `https://ely.by/services/skins-buffer/skins/${encodeURIComponent(e)}.png`,
      `https://minotar.net/skin/${encodeURIComponent(e)}`,
      `https://crafatar.com/skins/${U(e)}`
    ];
    for (const l of i)
      try {
        if (await le(l, r), n.existsSync(r) && n.statSync(r).size > 100)
          return `data:image/png;base64,${n.readFileSync(r).toString("base64")}`;
      } catch {
      }
    throw new Error(`Скин для никнейма "${e}" не найден на серверах`);
  }), f.handle("get-profile-stats", (a, t) => {
    let e = 0;
    const r = [];
    let i = "Нет информации", l = "Нет информации", d = 0, c = 0;
    try {
      for (const $ of T) {
        $.lastPlayed && (c = Math.max(c, $.lastPlayed), d += 45);
        const x = o.join(_, "instances", $.id, "saves");
        if (n.existsSync(x)) {
          const M = n.readdirSync(x);
          for (const I of M)
            n.statSync(o.join(x, I)).isDirectory() && (e++, r.push(I));
        }
      }
      r.length > 0 && (i = r[0]);
    } catch {
    }
    const y = S.find(($) => $.username === t) || S.find(($) => $.isActive) || S[0], w = (d / 60).toFixed(1), p = c ? new Date(c).toLocaleString() : "Нет информации";
    return {
      username: y ? y.username : t,
      uuid: y ? y.uuid : "",
      worldsCount: e,
      totalPlayTimeHours: d > 0 ? `${w} ч.` : "Нет информации",
      lastPlayedFormatted: p,
      favoriteWorld: i,
      favoriteServer: l
    };
  }), f.handle("get-user-skin", (a, t) => {
    const e = o.join(F, `${t}.png`);
    return n.existsSync(e) ? `data:image/png;base64,${n.readFileSync(e).toString("base64")}` : null;
  }), f.handle("upload-user-skin", async (a, t) => {
    const { canceled: e, filePaths: r } = await ae.showOpenDialog({
      title: "Выберите скин Minecraft (.png)",
      properties: ["openFile"],
      filters: [{ name: "Minecraft Skin (*.png)", extensions: ["png"] }]
    });
    if (!e && r.length > 0) {
      n.existsSync(F) || n.mkdirSync(F, { recursive: !0 });
      const i = o.join(F, `${t}.png`);
      return n.copyFileSync(r[0], i), `data:image/png;base64,${n.readFileSync(i).toString("base64")}`;
    }
    return null;
  }), f.handle("set-selected-instance-id", (a, t) => (h = { ...h, selectedInstanceId: t }, N(ce, h), h));
  const s = (a) => new Promise((t, e) => {
    (a.startsWith("https") ? ee : te).get(a, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
      }
    }, (i) => {
      if (i.statusCode && i.statusCode >= 300 && i.statusCode < 400 && i.headers.location)
        return s(i.headers.location).then(t).catch(e);
      if (i.statusCode !== 200)
        return e(new Error(`HTTP ${i.statusCode}`));
      const l = [];
      i.on("data", (d) => l.push(d)), i.on("end", () => t(Buffer.concat(l))), i.on("error", e);
    }).on("error", e);
  });
  f.handle("parse-command-skin", async (a, t) => {
    var y, w, p, $;
    const { username: e, command: r } = t;
    let i = "";
    const l = r.match(/e3RleHR1[A-Za-z0-9+/=]+/);
    if (l)
      try {
        const x = Buffer.from(l[0], "base64").toString("utf-8"), M = JSON.parse(x);
        (w = (y = M == null ? void 0 : M.textures) == null ? void 0 : y.SKIN) != null && w.url && (i = M.textures.SKIN.url);
      } catch {
      }
    if (!i) {
      const x = r.match(/value[:=]\s*["']?([^"'\]}]+)["']?/i);
      if (x && x[1])
        try {
          const M = Buffer.from(x[1], "base64").toString("utf-8"), I = JSON.parse(M);
          ($ = (p = I == null ? void 0 : I.textures) == null ? void 0 : p.SKIN) != null && $.url && (i = I.textures.SKIN.url);
        } catch {
        }
    }
    if (!i) {
      const x = r.match(/(https?:\/\/textures\.minecraft\.net\/texture\/[a-f0-9]{32,64})/i);
      x && (i = x[1]);
    }
    if (!i) {
      const x = r.match(/namemc\.com\/skin\/([a-f0-9]+)/i);
      if (x && x[1])
        try {
          const I = (await s(`https://namemc.com/skin/${x[1]}`)).toString("utf-8").match(/(https?:\/\/textures\.minecraft\.net\/texture\/[a-f0-9]{32,64})/i);
          I && (i = I[1]);
        } catch {
        }
    }
    if (!i)
      throw new Error("Не удалось найти текстуру скина в команде. Убедитесь, что передан корректный /give или ссылка.");
    i.startsWith("http://") && (i = i.replace("http://", "https://"));
    const d = await s(i);
    n.existsSync(F) || n.mkdirSync(F, { recursive: !0 });
    const c = o.join(F, `${e}.png`);
    return n.writeFileSync(c, d), `data:image/png;base64,${d.toString("base64")}`;
  });
}
G.whenReady().then(() => {
  Je(), $e();
});
export {
  Ve as MAIN_DIST,
  je as RENDERER_DIST,
  oe as VITE_DEV_SERVER_URL
};
