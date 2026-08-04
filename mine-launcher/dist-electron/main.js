import { app as q, Menu as Pe, BrowserWindow as xe, ipcMain as m, shell as Ie, dialog as ne } from "electron";
import { fileURLToPath as _e } from "node:url";
import r from "node:path";
import n from "node:fs";
import le from "node:https";
import de from "node:http";
import ke from "node:crypto";
import { execSync as Z, spawn as Me } from "node:child_process";
const L = /* @__PURE__ */ new Map();
function te() {
  const t = q.getPath("userData"), s = r.join(t, ".mine-launcher");
  return n.existsSync(s) || n.mkdirSync(s, { recursive: !0 }), s;
}
function W(t) {
  const s = ke.createHash("md5");
  s.update(`OfflinePlayer:${t}`);
  const e = s.digest();
  e[6] = e[6] & 15 | 48, e[8] = e[8] & 63 | 128;
  const i = e.toString("hex");
  return `${i.slice(0, 8)}-${i.slice(8, 12)}-${i.slice(12, 16)}-${i.slice(16, 20)}-${i.slice(20, 32)}`;
}
function G(t) {
  return new Promise((s, e) => {
    (t.startsWith("https") ? le : de).get(t, (a) => {
      if (a.statusCode && a.statusCode >= 300 && a.statusCode < 400 && a.headers.location)
        return G(a.headers.location).then(s).catch(e);
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
function O(t, s) {
  return new Promise((e, i) => {
    const a = r.dirname(s);
    n.existsSync(a) || n.mkdirSync(a, { recursive: !0 });
    const o = n.createWriteStream(s);
    (t.startsWith("https") ? le : de).get(t, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), O(c.headers.location, s).then(e).catch(i);
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
function ae(t, s) {
  if (n.existsSync(t))
    try {
      const e = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::OpenRead('${t.replace(/'/g, "''")}').Entries | Where-Object { $_.FullName -like '*.dll' } | ForEach-Object { $dest = [System.IO.Path]::Combine('${s.replace(/'/g, "''")}', $_.Name); [System.IO.Compression.ZipFileExtensions]::ExtractToFile($_, $dest, $true) }"`;
      Z(e, { stdio: "ignore" });
    } catch {
      try {
        Z(`powershell -Command "Expand-Archive -Path '${t}' -DestinationPath '${s}' -Force"`, { stdio: "ignore" });
      } catch {
      }
    }
}
function Ce(t) {
  if (!t || t.length === 0) return !0;
  let s = !1;
  for (const e of t)
    e.action === "allow" ? (!e.os || e.os.name === "windows") && (s = !0) : e.action === "disallow" && (!e.os || e.os.name === "windows") && (s = !1);
  return s;
}
async function ie() {
  const t = [], s = process.platform === "win32", e = s ? "javaw.exe" : "java", i = te(), a = r.join(i, "java", "java-17"), o = (f) => {
    if (!n.existsSync(f)) return null;
    const c = n.readdirSync(f);
    for (const g of c) {
      const b = r.join(f, g);
      if (g.toLowerCase() === "javaw.exe") return b;
      if (n.statSync(b).isDirectory()) {
        const h = o(b);
        if (h) return h;
      }
    }
    return null;
  }, d = o(a);
  if (d && t.push(d), process.env.JAVA_HOME) {
    const f = r.join(process.env.JAVA_HOME, "bin", e);
    n.existsSync(f) && t.push(f);
  }
  if (s) {
    const f = [
      "C:\\Program Files\\Java",
      "C:\\Program Files (x86)\\Java",
      "C:\\Program Files\\Eclipse Adoptium",
      "C:\\Program Files\\Microsoft",
      "C:\\Program Files\\BellSoft",
      "C:\\Program Files\\Amazon Corretto",
      r.join(process.env.LOCALAPPDATA || "", "Programs", "AdoptOpenJDK"),
      "C:\\Program Files (x86)\\Minecraft Launcher\\runtime"
    ];
    for (const c of f)
      if (n.existsSync(c))
        try {
          const g = n.readdirSync(c);
          for (const b of g) {
            const h = r.join(c, b, "bin", e);
            n.existsSync(h) && !t.includes(h) && t.push(h);
          }
        } catch {
        }
  }
  return t;
}
async function Ae(t, s) {
  const e = te(), i = r.join(e, "java", "java-17"), a = (g) => {
    if (!n.existsSync(g)) return null;
    const b = n.readdirSync(g);
    for (const h of b) {
      const P = r.join(g, h);
      if (h.toLowerCase() === "javaw.exe") return P;
      if (n.statSync(P).isDirectory()) {
        const T = a(P);
        if (T) return T;
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
  }), s({ timestamp: Date.now(), type: "info", message: "Java не найдена на ПК. Автоматическое скачивание OpenJDK Java 17 (Temurin)..." });
  const d = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jre_x64_windows_hotspot_17.0.10_7.zip", f = r.join(e, "java", "java-17.zip");
  n.existsSync(r.dirname(f)) || n.mkdirSync(r.dirname(f), { recursive: !0 }), t({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: "Загрузка OpenJDK Java 17 (40 MB)...",
    progress: 35
  }), await O(d, f), t({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: "Распаковка Java 17 Runtime...",
    progress: 75
  }), s({ timestamp: Date.now(), type: "info", message: "Распаковка архива Java 17..." }), n.existsSync(i) || n.mkdirSync(i, { recursive: !0 });
  try {
    Z(`powershell -Command "Expand-Archive -Path '${f}' -DestinationPath '${i}' -Force"`), n.unlinkSync(f);
  } catch (g) {
    s({ timestamp: Date.now(), type: "warn", message: `Ошибка PowerShell распаковки: ${g.message}` });
  }
  const c = a(i);
  if (!c)
    throw new Error("Не удалось найти javaw.exe после распаковки Java 17. Установите Java вручную.");
  return s({ timestamp: Date.now(), type: "info", message: `Java 17 успешно установлена: ${c}` }), c;
}
async function Se() {
  return await G("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function Te(t, s, e) {
  var P, T, S, F, R, me, fe, pe;
  const i = te(), a = r.join(i, "instances", t.instanceId), o = r.join(i, "assets"), d = r.join(i, "libraries"), f = r.join(i, "versions"), c = r.join(a, "natives");
  n.existsSync(a) || n.mkdirSync(a, { recursive: !0 }), n.existsSync(c) || n.mkdirSync(c, { recursive: !0 });
  const g = r.join(a, "options.txt");
  n.writeFileSync(g, `version:2586
chatVisibility:0
forceUnicodeFont:false
realmsNotifications:false
hideServerAddress:false
`, "utf-8");
  const h = r.join(a, ".fabric");
  if (n.existsSync(h))
    try {
      const $ = (z) => {
        const he = n.readdirSync(z);
        for (const B of he) {
          const H = r.join(z, B);
          n.statSync(H).isDirectory() ? $(H) : B.endsWith(".tmp") && n.unlinkSync(H);
        }
      };
      $(h);
    } catch {
    }
  try {
    let $ = t.javaPath, z = !1;
    if ($ && n.existsSync($))
      try {
        Z(`"${$}" -version 2>&1`), z = !0;
      } catch {
      }
    if (!z) {
      const l = await ie();
      for (const v of l)
        if (n.existsSync(v))
          try {
            Z(`"${v}" -version 2>&1`), $ = v, z = !0;
            break;
          } catch {
          }
    }
    z || ($ = await Ae(s, e)), e({
      timestamp: Date.now(),
      type: "info",
      message: `Используемый файл Java: ${$}`
    }), s({
      instanceId: t.instanceId,
      stage: "checking",
      statusText: "Получение манифеста версий...",
      progress: 10
    });
    const B = (await Se()).versions.find((l) => l.id === t.version);
    if (!B)
      throw new Error(`Версия Minecraft ${t.version} не найдена в манифесте Mojang`);
    s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: `Загрузка структуры версии ${t.version}...`,
      progress: 20
    });
    const H = r.join(f, t.version, `${t.version}.json`), I = await G(B.url);
    if (n.existsSync(r.dirname(H)) || n.mkdirSync(r.dirname(H), { recursive: !0 }), n.writeFileSync(H, JSON.stringify(I, null, 2)), (P = I.assetIndex) != null && P.url) {
      const l = r.join(o, "indexes"), v = r.join(l, `${I.assetIndex.id}.json`);
      n.existsSync(v) || (s({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Загрузка манифеста ресурсов...",
        progress: 25
      }), await O(I.assetIndex.url, v));
      try {
        const M = JSON.parse(n.readFileSync(v, "utf-8")).objects || {}, _ = Object.keys(M), U = r.join(o, "objects"), j = [];
        for (const J of _) {
          const D = M[J].hash, V = D.slice(0, 2), Q = r.join(U, V, D);
          n.existsSync(Q) || j.push({
            hash: D,
            url: `https://resources.download.minecraft.net/${V}/${D}`,
            dest: Q
          });
        }
        if (j.length > 0) {
          s({
            instanceId: t.instanceId,
            stage: "downloading",
            statusText: `Загрузка ресурсов (${j.length} файлов)...`,
            progress: 30
          });
          const J = 75;
          let E = 0;
          for (let D = 0; D < j.length; D += J) {
            const V = j.slice(D, D + J);
            await Promise.all(
              V.map((we) => O(we.url, we.dest).catch(() => {
              }))
            ), E += V.length;
            const Q = Math.round(30 + E / j.length * 15);
            s({
              instanceId: t.instanceId,
              stage: "downloading",
              statusText: `Загрузка ресурсов (${E}/${j.length})...`,
              progress: Q
            });
          }
        }
      } catch (x) {
        e({ timestamp: Date.now(), type: "warn", message: `Ошибка ресурсов: ${x.message}` });
      }
    }
    const se = r.join(f, t.version, `${t.version}.jar`);
    !n.existsSync(se) && ((S = (T = I.downloads) == null ? void 0 : T.client) != null && S.url) && (s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка Minecraft client.jar...",
      progress: 50
    }), await O(I.downloads.client.url, se)), s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка и распаковка библиотек...",
      progress: 60
    });
    const X = [], De = I.libraries || [];
    for (const l of De)
      if (Ce(l.rules)) {
        if ((F = l.downloads) != null && F.artifact) {
          const v = l.downloads.artifact.path, x = r.join(d, v);
          if (!n.existsSync(x))
            try {
              await O(l.downloads.artifact.url, x);
            } catch {
            }
          n.existsSync(x) && (X.push(x), (v.includes("natives") || l.name.includes("natives")) && ae(x, c));
        }
        if ((R = l.downloads) != null && R.classifiers) {
          const v = l.downloads.classifiers, x = v["natives-windows"] || v["natives-windows-64"] || v["natives-windows-x86"];
          if (x) {
            const M = x.path, _ = r.join(d, M);
            if (!n.existsSync(_))
              try {
                await O(x.url, _);
              } catch {
              }
            n.existsSync(_) && ae(_, c);
          }
        }
        if (!((me = l.downloads) != null && me.artifact) && l.name) {
          const v = l.name.split(":"), x = v[0].replace(/\./g, "/"), M = v[1], _ = v[2], U = `${x}/${M}/${_}/${M}-${_}.jar`, j = r.join(d, U), J = l.url ? `${l.url}${U}` : `https://libraries.minecraft.net/${U}`;
          if (!n.existsSync(j))
            try {
              await O(J, j);
            } catch {
            }
          n.existsSync(j) && (X.push(j), l.name.includes("natives") && ae(j, c));
        }
      }
    X.push(se);
    let ye = I.mainClass || "net.minecraft.client.main.Main";
    if (t.loader === "fabric") {
      s({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Настройка Fabric...",
        progress: 75
      });
      try {
        const l = await G(`https://meta.fabricmc.net/v2/versions/loader/${t.version}`);
        if (l && l.length > 0) {
          const v = l[0].loader.version, x = await G(`https://meta.fabricmc.net/v2/versions/loader/${t.version}/${v}/profile/json`);
          if (x.mainClass && (ye = x.mainClass), x.libraries)
            for (const M of x.libraries) {
              const _ = M.name.split(":"), U = _[0].replace(/\./g, "/"), j = _[1], J = _[2], E = `${U}/${j}/${J}/${j}-${J}.jar`, D = r.join(d, E), V = M.url ? `${M.url}${E}` : `https://maven.fabricmc.net/${E}`;
              if (!n.existsSync(D))
                try {
                  await O(V, D);
                } catch {
                }
              n.existsSync(D) && X.unshift(D);
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
    const be = X.join(r.delimiter), y = [];
    y.push(`-Xms${t.memoryMin || 1024}M`), y.push(`-Xmx${t.memoryMax || 4096}M`), y.push(`-Djava.library.path=${c}`), y.push("-Dminecraft.api.auth.host=http://127.0.0.1"), y.push("-Dminecraft.api.account.host=http://127.0.0.1"), y.push("-Dminecraft.api.session.host=http://127.0.0.1"), y.push("-Dminecraft.api.services.host=http://127.0.0.1"), y.push("-XX:+UseG1GC", "-XX:+UnlockExperimentalVMOptions", "-XX:G1NewSizePercent=20", "-XX:G1ReservePercent=20", "-XX:MaxGCPauseMillis=50", "-XX:G1HeapRegionSize=32M"), t.customJvmArgs && y.push(...t.customJvmArgs.split(" ").filter(Boolean)), y.push("-cp", be), y.push(ye);
    const ve = (t.uuid || W(t.username || "Player")).replace(/-/g, "");
    if (I.minecraftArguments && typeof I.minecraftArguments == "string") {
      const l = I.minecraftArguments.split(" ");
      for (const v of l) {
        let x = v.replace("${auth_player_name}", t.username || "Player").replace("${version_name}", t.version).replace("${game_directory}", a).replace("${assets_root}", o).replace("${assets_index_name}", ((fe = I.assetIndex) == null ? void 0 : fe.id) || t.version).replace("${auth_uuid}", ve).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", "release");
        y.push(x);
      }
    } else
      y.push("--username", t.username || "Player"), y.push("--version", t.version), y.push("--gameDir", a), y.push("--assetsDir", o), y.push("--assetIndex", ((pe = I.assetIndex) == null ? void 0 : pe.id) || t.version), y.push("--uuid", ve), y.push("--accessToken", "0"), y.push("--userType", "mojang"), y.push("--versionType", "release");
    e({
      timestamp: Date.now(),
      type: "info",
      message: `Команда запуска: "${$}" ${y.join(" ")}`
    });
    const K = Me($ || "javaw", y, {
      cwd: a,
      detached: !0
    });
    L.set(t.instanceId, K), K.stdout.on("data", (l) => {
      e({ timestamp: Date.now(), type: "info", message: l.toString() });
    }), K.stderr.on("data", (l) => {
      e({ timestamp: Date.now(), type: "warn", message: l.toString() });
    }), K.on("error", (l) => {
      L.delete(t.instanceId), s({
        instanceId: t.instanceId,
        stage: "error",
        statusText: `Ошибка процесса: ${l.message}`,
        progress: 0,
        error: l.message
      }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${l.message}` });
    }), K.on("exit", (l) => {
      L.delete(t.instanceId), s({
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
  const s = L.get(t);
  return s ? (s.kill(), L.delete(t), !0) : !1;
}
Pe.setApplicationMenu(null);
const ge = r.dirname(_e(import.meta.url));
process.env.APP_ROOT = r.join(ge, "..");
const re = process.env.VITE_DEV_SERVER_URL, We = r.join(process.env.APP_ROOT, "dist-electron"), je = r.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = re ? r.join(process.env.APP_ROOT, "public") : je;
let u = null;
const k = te(), Y = r.join(k, "accounts.json"), ee = r.join(k, "instances.json"), oe = r.join(k, "settings.json"), A = r.join(k, "skins");
n.existsSync(A) || n.mkdirSync(A, { recursive: !0 });
function ue(t, s) {
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
let w = ue(Y, [
  { id: "1", username: "Test", uuid: W("Test"), type: "offline", isActive: !0, createdAt: Date.now() - 5e4 },
  { id: "2", username: "Nick 2", uuid: W("Nick 2"), type: "offline", isActive: !1, createdAt: Date.now() - 4e4 },
  { id: "3", username: "Nick 3", uuid: W("Nick 3"), type: "offline", isActive: !1, createdAt: Date.now() - 3e4 }
]), C = ue(ee, [
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
]), p = ue(oe, {
  javaPath: "",
  memoryMin: 1024,
  memoryMax: 4096,
  customJvmArgs: "",
  closeLauncherOnGameStart: !1,
  gameDir: k,
  useProxy: !1,
  proxyType: "http",
  proxyHost: "",
  proxyPort: 8080,
  launcherFont: "system-ui"
});
function $e() {
  u = new xe({
    width: 1050,
    height: 720,
    minWidth: 900,
    minHeight: 650,
    frame: !1,
    titleBarStyle: "hidden",
    icon: r.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: r.join(ge, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), u.webContents.on("did-finish-load", () => {
    u == null || u.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), re ? u.loadURL(re) : u.loadFile(r.join(je, "index.html"));
}
q.on("window-all-closed", () => {
  process.platform !== "darwin" && (q.quit(), u = null);
});
q.on("activate", () => {
  xe.getAllWindows().length === 0 && $e();
});
function ce(t, s) {
  return new Promise((e, i) => {
    const a = r.dirname(s);
    n.existsSync(a) || n.mkdirSync(a, { recursive: !0 });
    const o = n.createWriteStream(s);
    (t.startsWith("https") ? le : de).get(t, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), ce(c.headers.location, s).then(e).catch(i);
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
  }), m.handle("is-maximized", () => (u == null ? void 0 : u.isMaximized()) || !1), m.handle("get-accounts", () => w), m.handle("add-account", (t, s) => {
    const e = s.trim();
    if (!e) throw new Error("Имя пользователя не может быть пустым");
    if (w.some((o) => o.username.toLowerCase() === e.toLowerCase()))
      throw new Error(`Никнейм "${e}" уже существует!`);
    const a = {
      id: Date.now().toString(),
      username: e,
      uuid: W(e),
      type: "offline",
      isActive: w.length === 0,
      createdAt: Date.now()
    };
    return w.push(a), N(Y, w), w;
  }), m.handle("set-active-account", (t, s) => (w = w.map((e) => ({
    ...e,
    isActive: e.id === s
  })), N(Y, w), w)), m.handle("delete-account", (t, s) => (w = w.filter((e) => e.id !== s), w.length > 0 && !w.some((e) => e.isActive) && (w[0].isActive = !0), N(Y, w), w)), m.handle("get-instances", () => C), m.handle("create-instance", (t, s) => {
    const e = {
      id: "inst-" + Date.now(),
      name: s.version,
      version: s.version,
      loader: s.loader || "vanilla",
      created: Date.now(),
      memoryMin: p.memoryMin,
      memoryMax: p.memoryMax
    };
    C.push(e), N(ee, C);
    const i = r.join(k, "instances", e.id), a = r.join(i, "mods");
    return n.existsSync(a) || n.mkdirSync(a, { recursive: !0 }), C;
  }), m.handle("delete-instance", (t, s) => {
    C = C.filter((i) => i.id !== s), N(ee, C);
    const e = r.join(k, "instances", s);
    return n.existsSync(e) && n.rmSync(e, { recursive: !0, force: !0 }), C;
  }), m.handle("get-versions", async () => {
    try {
      return await Se();
    } catch (t) {
      return console.error("Failed to get versions:", t), { latest: { release: "1.20.4", snapshot: "1.20.4" }, versions: [] };
    }
  }), m.handle("get-settings", () => p), m.handle("save-settings", (t, s) => (p = { ...p, ...s }, N(oe, p), p)), m.handle("detect-java", async () => await ie()), m.handle("launch-instance", async (t, s) => {
    const e = C.find((d) => d.id === s);
    if (!e) throw new Error("Инстанс не найден");
    const i = w.find((d) => d.isActive) || w[0];
    if (!i) throw new Error("Добавьте хотя бы один аккаунт!");
    e.lastPlayed = Date.now(), N(ee, C);
    const a = e.javaPath || p.javaPath || (await ie())[0];
    let o = e.jvmArgs || p.customJvmArgs || "";
    return p.useProxy && p.proxyHost && p.proxyPort && (p.proxyType === "socks5" ? o += ` -DsocksProxyHost=${p.proxyHost} -DsocksProxyPort=${p.proxyPort}` : o += ` -Dhttp.proxyHost=${p.proxyHost} -Dhttp.proxyPort=${p.proxyPort} -Dhttps.proxyHost=${p.proxyHost} -Dhttps.proxyPort=${p.proxyPort}`), Te(
      {
        instanceId: e.id,
        instanceName: e.name,
        version: e.version,
        loader: e.loader || "vanilla",
        username: i.username,
        uuid: i.uuid,
        memoryMin: e.memoryMin || p.memoryMin || 1024,
        memoryMax: e.memoryMax || p.memoryMax || 4096,
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
  }), m.handle("stop-instance", (t, s) => Fe(s)), m.handle("open-instance-folder", (t, s) => {
    const e = r.join(k, "instances", s);
    n.existsSync(e) || n.mkdirSync(e, { recursive: !0 }), Ie.openPath(e);
  }), m.handle("get-instance-mods", (t, s) => {
    const e = r.join(k, "instances", s, "mods");
    if (!n.existsSync(e)) return [];
    try {
      return n.readdirSync(e).map((a) => {
        const o = r.join(e, a), d = n.statSync(o), f = a.endsWith(".jar"), c = a.replace(/\.jar(\.disabled)?$/, "");
        return {
          id: a,
          filename: a,
          name: c,
          enabled: f,
          size: d.size
        };
      });
    } catch {
      return [];
    }
  }), m.handle("toggle-mod", (t, { instanceId: s, modFilename: e }) => {
    const i = r.join(k, "instances", s, "mods"), a = r.join(i, e);
    if (!n.existsSync(a)) return !1;
    let o = e;
    e.endsWith(".jar") ? o = e + ".disabled" : e.endsWith(".jar.disabled") && (o = e.replace(/\.disabled$/, ""));
    const d = r.join(i, o);
    return n.renameSync(a, d), !0;
  }), m.handle("download-mod-file", async (t, { instanceId: s, downloadUrl: e, filename: i }) => {
    const a = r.join(k, "instances", s, "mods");
    n.existsSync(a) || n.mkdirSync(a, { recursive: !0 });
    const o = r.join(a, i);
    return await ce(e, o), !0;
  }), m.handle("add-mod-file", async (t, s) => {
    if (!u) return !1;
    const e = await ne.showOpenDialog(u, {
      title: "Выберите файл мода (.jar)",
      filters: [{ name: "Minecraft Mods", extensions: ["jar"] }],
      properties: ["openFile", "multiSelections"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const i = r.join(k, "instances", s, "mods");
    n.existsSync(i) || n.mkdirSync(i, { recursive: !0 });
    for (const a of e.filePaths) {
      const o = r.join(i, r.basename(a));
      n.copyFileSync(a, o);
    }
    return !0;
  }), m.handle("save-user-skin", async (t, s) => {
    if (!u) return !1;
    const e = await ne.showOpenDialog(u, {
      title: "Выберите файл скина Minecraft (.png)",
      filters: [{ name: "Minecraft Skins", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const i = r.join(A, `${s}.png`);
    return n.copyFileSync(e.filePaths[0], i), i;
  }), m.handle("fetch-online-skin", async (t, { username: s, targetUsername: e }) => {
    const i = r.join(A, `${s}.png`), a = [
      `https://ely.by/services/skins-buffer/skins/${encodeURIComponent(e)}.png`,
      `https://minotar.net/skin/${encodeURIComponent(e)}`,
      `https://crafatar.com/skins/${W(e)}`
    ];
    for (const o of a)
      try {
        if (await ce(o, i), n.existsSync(i) && n.statSync(i).size > 100)
          return `data:image/png;base64,${n.readFileSync(i).toString("base64")}`;
      } catch {
      }
    throw new Error(`Скин для никнейма "${e}" не найден на серверах`);
  }), m.handle("get-profile-stats", (t, s) => {
    let e = 0;
    const i = [];
    let a = "Нет информации", o = "Нет информации", d = 0, f = 0;
    try {
      for (const h of C) {
        h.lastPlayed && (f = Math.max(f, h.lastPlayed), d += 45);
        const P = r.join(k, "instances", h.id, "saves");
        if (n.existsSync(P)) {
          const T = n.readdirSync(P);
          for (const S of T)
            n.statSync(r.join(P, S)).isDirectory() && (e++, i.push(S));
        }
      }
      i.length > 0 && (a = i[0]);
    } catch {
    }
    const c = w.find((h) => h.username === s) || w.find((h) => h.isActive) || w[0], g = (d / 60).toFixed(1), b = f ? new Date(f).toLocaleString() : "Нет информации";
    return {
      username: c ? c.username : s,
      uuid: c ? c.uuid : "",
      worldsCount: e,
      totalPlayTimeHours: d > 0 ? `${g} ч.` : "Нет информации",
      lastPlayedFormatted: b,
      favoriteWorld: a,
      favoriteServer: o
    };
  }), m.handle("get-user-skin", (t, s) => {
    const e = r.join(A, `${s}.png`);
    return n.existsSync(e) ? `data:image/png;base64,${n.readFileSync(e).toString("base64")}` : null;
  }), m.handle("upload-user-skin", async (t, s) => {
    const { canceled: e, filePaths: i } = await ne.showOpenDialog({
      title: "Выберите скин Minecraft (.png)",
      properties: ["openFile"],
      filters: [{ name: "Minecraft Skin (*.png)", extensions: ["png"] }]
    });
    if (!e && i.length > 0) {
      n.existsSync(A) || n.mkdirSync(A, { recursive: !0 });
      const a = r.join(A, `${s}.png`);
      return n.copyFileSync(i[0], a), `data:image/png;base64,${n.readFileSync(a).toString("base64")}`;
    }
    return null;
  }), m.handle("set-selected-instance-id", (t, s) => (p = { ...p, selectedInstanceId: s }, N(oe, p), p)), m.handle("parse-command-skin", async (t, s) => {
    var b, h, P, T;
    const { username: e, command: i } = s;
    let a = "";
    const o = i.match(/e3RleHR1[A-Za-z0-9+/=]+/);
    if (o)
      try {
        const S = Buffer.from(o[0], "base64").toString("utf-8"), F = JSON.parse(S);
        (h = (b = F == null ? void 0 : F.textures) == null ? void 0 : b.SKIN) != null && h.url && (a = F.textures.SKIN.url);
      } catch {
      }
    if (!a) {
      const S = i.match(/value[:=]\s*["']?([^"'\]}]+)["']?/i);
      if (S && S[1])
        try {
          const F = Buffer.from(S[1], "base64").toString("utf-8"), R = JSON.parse(F);
          (T = (P = R == null ? void 0 : R.textures) == null ? void 0 : P.SKIN) != null && T.url && (a = R.textures.SKIN.url);
        } catch {
        }
    }
    if (!a) {
      const S = i.match(/(https?:\/\/textures\.minecraft\.net\/texture\/[a-f0-9]+)/i);
      S && (a = S[1]);
    }
    if (!a) {
      const S = i.match(/namemc\.com\/skin\/([a-f0-9]+)/i);
      S && S[1] && (a = `https://textures.minecraft.net/texture/${S[1]}`);
    }
    if (!a)
      throw new Error("Не удалось спарсить скин из команды. Убедитесь, что передан валидный /give или ссылка.");
    const d = await fetch(a);
    if (!d.ok) throw new Error("Не удалось скачать скин с сервера Mojang");
    const f = await d.arrayBuffer(), c = Buffer.from(f);
    n.existsSync(A) || n.mkdirSync(A, { recursive: !0 });
    const g = r.join(A, `${e}.png`);
    return n.writeFileSync(g, c), `data:image/png;base64,${c.toString("base64")}`;
  });
}
q.whenReady().then(() => {
  Je(), $e();
});
export {
  We as MAIN_DIST,
  je as RENDERER_DIST,
  re as VITE_DEV_SERVER_URL
};
