import { app as G, Menu as Ie, BrowserWindow as we, ipcMain as u, shell as _e, dialog as ve } from "electron";
import { fileURLToPath as Ce } from "node:url";
import a from "node:path";
import n from "node:fs";
import ae from "node:https";
import ie from "node:http";
import Me from "node:crypto";
import { execSync as L, spawn as Ae } from "node:child_process";
const X = /* @__PURE__ */ new Map();
function Q() {
  const t = G.getPath("userData"), s = a.join(t, ".mine-launcher");
  return n.existsSync(s) || n.mkdirSync(s, { recursive: !0 }), s;
}
function N(t) {
  const s = Me.createHash("md5");
  s.update(`OfflinePlayer:${t}`);
  const e = s.digest();
  e[6] = e[6] & 15 | 48, e[8] = e[8] & 63 | 128;
  const i = e.toString("hex");
  return `${i.slice(0, 8)}-${i.slice(8, 12)}-${i.slice(12, 16)}-${i.slice(16, 20)}-${i.slice(20, 32)}`;
}
function B(t) {
  return new Promise((s, e) => {
    (t.startsWith("https") ? ae : ie).get(t, (r) => {
      if (r.statusCode && r.statusCode >= 300 && r.statusCode < 400 && r.headers.location)
        return B(r.headers.location).then(s).catch(e);
      if (r.statusCode !== 200)
        return e(new Error(`HTTP ${r.statusCode} loading ${t}`));
      let o = "";
      r.on("data", (y) => {
        o += y;
      }), r.on("end", () => {
        try {
          s(JSON.parse(o));
        } catch (y) {
          e(y);
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
    (t.startsWith("https") ? ae : ie).get(t, (c) => {
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
function ee(t, s) {
  if (n.existsSync(t))
    try {
      const e = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::OpenRead('${t.replace(/'/g, "''")}').Entries | Where-Object { $_.FullName -like '*.dll' } | ForEach-Object { $dest = [System.IO.Path]::Combine('${s.replace(/'/g, "''")}', $_.Name); [System.IO.Compression.ZipFileExtensions]::ExtractToFile($_, $dest, $true) }"`;
      L(e, { stdio: "ignore" });
    } catch {
      try {
        L(`powershell -Command "Expand-Archive -Path '${t}' -DestinationPath '${s}' -Force"`, { stdio: "ignore" });
      } catch {
      }
    }
}
function Pe(t) {
  if (!t || t.length === 0) return !0;
  let s = !1;
  for (const e of t)
    e.action === "allow" ? (!e.os || e.os.name === "windows") && (s = !0) : e.action === "disallow" && (!e.os || e.os.name === "windows") && (s = !1);
  return s;
}
async function te() {
  const t = [], s = process.platform === "win32", e = s ? "javaw.exe" : "java", i = Q(), r = a.join(i, "java", "java-17"), o = (p) => {
    if (!n.existsSync(p)) return null;
    const c = n.readdirSync(p);
    for (const $ of c) {
      const P = a.join(p, $);
      if ($.toLowerCase() === "javaw.exe") return P;
      if (n.statSync(P).isDirectory()) {
        const D = o(P);
        if (D) return D;
      }
    }
    return null;
  }, y = o(r);
  if (y && t.push(y), process.env.JAVA_HOME) {
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
          const $ = n.readdirSync(c);
          for (const P of $) {
            const D = a.join(c, P, "bin", e);
            n.existsSync(D) && !t.includes(D) && t.push(D);
          }
        } catch {
        }
  }
  return t;
}
async function ke(t, s) {
  const e = Q(), i = a.join(e, "java", "java-17"), r = ($) => {
    if (!n.existsSync($)) return null;
    const P = n.readdirSync($);
    for (const D of P) {
      const R = a.join($, D);
      if (D.toLowerCase() === "javaw.exe") return R;
      if (n.statSync(R).isDirectory()) {
        const z = r(R);
        if (z) return z;
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
  const y = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jre_x64_windows_hotspot_17.0.10_7.zip", p = a.join(e, "java", "java-17.zip");
  n.existsSync(a.dirname(p)) || n.mkdirSync(a.dirname(p), { recursive: !0 }), t({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: "Загрузка OpenJDK Java 17 (40 MB)...",
    progress: 35
  }), await A(y, p), t({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: "Распаковка Java 17 Runtime...",
    progress: 75
  }), s({ timestamp: Date.now(), type: "info", message: "Распаковка архива Java 17..." }), n.existsSync(i) || n.mkdirSync(i, { recursive: !0 });
  try {
    L(`powershell -Command "Expand-Archive -Path '${p}' -DestinationPath '${i}' -Force"`), n.unlinkSync(p);
  } catch ($) {
    s({ timestamp: Date.now(), type: "warn", message: `Ошибка PowerShell распаковки: ${$.message}` });
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
  var R, z, oe, ce, le, de, ue, me;
  const i = Q(), r = a.join(i, "instances", t.instanceId), o = a.join(i, "assets"), y = a.join(i, "libraries"), p = a.join(i, "versions"), c = a.join(r, "natives");
  n.existsSync(r) || n.mkdirSync(r, { recursive: !0 }), n.existsSync(c) || n.mkdirSync(c, { recursive: !0 });
  const $ = a.join(r, "options.txt");
  n.writeFileSync($, `version:2586
chatVisibility:0
forceUnicodeFont:false
realmsNotifications:false
hideServerAddress:false
`, "utf-8");
  const D = a.join(r, ".fabric");
  if (n.existsSync(D))
    try {
      const x = (T) => {
        const fe = n.readdirSync(T);
        for (const U of fe) {
          const J = a.join(T, U);
          n.statSync(J).isDirectory() ? x(J) : U.endsWith(".tmp") && n.unlinkSync(J);
        }
      };
      x(D);
    } catch {
    }
  try {
    let x = t.javaPath, T = !1;
    if (x && n.existsSync(x))
      try {
        L(`"${x}" -version 2>&1`), T = !0;
      } catch {
      }
    if (!T) {
      const l = await te();
      for (const f of l)
        if (n.existsSync(f))
          try {
            L(`"${f}" -version 2>&1`), x = f, T = !0;
            break;
          } catch {
          }
    }
    T || (x = await ke(s, e)), e({
      timestamp: Date.now(),
      type: "info",
      message: `Используемый файл Java: ${x}`
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
    const J = a.join(p, t.version, `${t.version}.json`), S = await B(U.url);
    if (n.existsSync(a.dirname(J)) || n.mkdirSync(a.dirname(J), { recursive: !0 }), n.writeFileSync(J, JSON.stringify(S, null, 2)), (R = S.assetIndex) != null && R.url) {
      const l = a.join(o, "indexes"), f = a.join(l, `${S.assetIndex.id}.json`);
      n.existsSync(f) || (s({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Загрузка манифеста ресурсов...",
        progress: 25
      }), await A(S.assetIndex.url, f));
      try {
        const I = JSON.parse(n.readFileSync(f, "utf-8")).objects || {}, g = Object.keys(I), F = a.join(o, "objects"), w = [];
        for (const M of g) {
          const j = I[M].hash, O = j.slice(0, 2), K = a.join(F, O, j);
          n.existsSync(K) || w.push({
            hash: j,
            url: `https://resources.download.minecraft.net/${O}/${j}`,
            dest: K
          });
        }
        if (w.length > 0) {
          s({
            instanceId: t.instanceId,
            stage: "downloading",
            statusText: `Загрузка ресурсов (${w.length} файлов)...`,
            progress: 30
          });
          const M = 75;
          let k = 0;
          for (let j = 0; j < w.length; j += M) {
            const O = w.slice(j, j + M);
            await Promise.all(
              O.map((ye) => A(ye.url, ye.dest).catch(() => {
              }))
            ), k += O.length;
            const K = Math.round(30 + k / w.length * 15);
            s({
              instanceId: t.instanceId,
              stage: "downloading",
              statusText: `Загрузка ресурсов (${k}/${w.length})...`,
              progress: K
            });
          }
        }
      } catch (h) {
        e({ timestamp: Date.now(), type: "warn", message: `Ошибка ресурсов: ${h.message}` });
      }
    }
    const Y = a.join(p, t.version, `${t.version}.jar`);
    !n.existsSync(Y) && ((oe = (z = S.downloads) == null ? void 0 : z.client) != null && oe.url) && (s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка Minecraft client.jar...",
      progress: 50
    }), await A(S.downloads.client.url, Y)), s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка и распаковка библиотек...",
      progress: 60
    });
    const V = [], De = S.libraries || [];
    for (const l of De)
      if (Pe(l.rules)) {
        if ((ce = l.downloads) != null && ce.artifact) {
          const f = l.downloads.artifact.path, h = a.join(y, f);
          if (!n.existsSync(h))
            try {
              await A(l.downloads.artifact.url, h);
            } catch {
            }
          n.existsSync(h) && (V.push(h), (f.includes("natives") || l.name.includes("natives")) && ee(h, c));
        }
        if ((le = l.downloads) != null && le.classifiers) {
          const f = l.downloads.classifiers, h = f["natives-windows"] || f["natives-windows-64"] || f["natives-windows-x86"];
          if (h) {
            const I = h.path, g = a.join(y, I);
            if (!n.existsSync(g))
              try {
                await A(h.url, g);
              } catch {
              }
            n.existsSync(g) && ee(g, c);
          }
        }
        if (!((de = l.downloads) != null && de.artifact) && l.name) {
          const f = l.name.split(":"), h = f[0].replace(/\./g, "/"), I = f[1], g = f[2], F = `${h}/${I}/${g}/${I}-${g}.jar`, w = a.join(y, F), M = l.url ? `${l.url}${F}` : `https://libraries.minecraft.net/${F}`;
          if (!n.existsSync(w))
            try {
              await A(M, w);
            } catch {
            }
          n.existsSync(w) && (V.push(w), l.name.includes("natives") && ee(w, c));
        }
      }
    V.push(Y);
    let pe = S.mainClass || "net.minecraft.client.main.Main";
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
          const f = l[0].loader.version, h = await B(`https://meta.fabricmc.net/v2/versions/loader/${t.version}/${f}/profile/json`);
          if (h.mainClass && (pe = h.mainClass), h.libraries)
            for (const I of h.libraries) {
              const g = I.name.split(":"), F = g[0].replace(/\./g, "/"), w = g[1], M = g[2], k = `${F}/${w}/${M}/${w}-${M}.jar`, j = a.join(y, k), O = I.url ? `${I.url}${k}` : `https://maven.fabricmc.net/${k}`;
              if (!n.existsSync(j))
                try {
                  await A(O, j);
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
    const be = V.join(a.delimiter), m = [];
    m.push(`-Xms${t.memoryMin || 1024}M`), m.push(`-Xmx${t.memoryMax || 4096}M`), m.push(`-Djava.library.path=${c}`), m.push("-Dminecraft.api.auth.host=http://127.0.0.1"), m.push("-Dminecraft.api.account.host=http://127.0.0.1"), m.push("-Dminecraft.api.session.host=http://127.0.0.1"), m.push("-Dminecraft.api.services.host=http://127.0.0.1"), m.push("-XX:+UseG1GC", "-XX:+UnlockExperimentalVMOptions", "-XX:G1NewSizePercent=20", "-XX:G1ReservePercent=20", "-XX:MaxGCPauseMillis=50", "-XX:G1HeapRegionSize=32M"), t.customJvmArgs && m.push(...t.customJvmArgs.split(" ").filter(Boolean)), m.push("-cp", be), m.push(pe);
    const he = (t.uuid || N(t.username || "Player")).replace(/-/g, "");
    if (S.minecraftArguments && typeof S.minecraftArguments == "string") {
      const l = S.minecraftArguments.split(" ");
      for (const f of l) {
        let h = f.replace("${auth_player_name}", t.username || "Player").replace("${version_name}", t.version).replace("${game_directory}", r).replace("${assets_root}", o).replace("${assets_index_name}", ((ue = S.assetIndex) == null ? void 0 : ue.id) || t.version).replace("${auth_uuid}", he).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", "release");
        m.push(h);
      }
    } else
      m.push("--username", t.username || "Player"), m.push("--version", t.version), m.push("--gameDir", r), m.push("--assetsDir", o), m.push("--assetIndex", ((me = S.assetIndex) == null ? void 0 : me.id) || t.version), m.push("--uuid", he), m.push("--accessToken", "0"), m.push("--userType", "mojang"), m.push("--versionType", "release");
    e({
      timestamp: Date.now(),
      type: "info",
      message: `Команда запуска: "${x}" ${m.join(" ")}`
    });
    const W = Ae(x || "javaw", m, {
      cwd: r,
      detached: !0
    });
    X.set(t.instanceId, W), W.stdout.on("data", (l) => {
      e({ timestamp: Date.now(), type: "info", message: l.toString() });
    }), W.stderr.on("data", (l) => {
      e({ timestamp: Date.now(), type: "warn", message: l.toString() });
    }), W.on("error", (l) => {
      X.delete(t.instanceId), s({
        instanceId: t.instanceId,
        stage: "error",
        statusText: `Ошибка процесса: ${l.message}`,
        progress: 0,
        error: l.message
      }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${l.message}` });
    }), W.on("exit", (l) => {
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
  } catch (x) {
    s({
      instanceId: t.instanceId,
      stage: "error",
      statusText: `Ошибка: ${x.message}`,
      progress: 0,
      error: x.message
    }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${x.message}` });
  }
}
function Je(t) {
  const s = X.get(t);
  return s ? (s.kill(), X.delete(t), !0) : !1;
}
Ie.setApplicationMenu(null);
const je = a.dirname(Ce(import.meta.url));
process.env.APP_ROOT = a.join(je, "..");
const se = process.env.VITE_DEV_SERVER_URL, Xe = a.join(process.env.APP_ROOT, "dist-electron"), Se = a.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = se ? a.join(process.env.APP_ROOT, "public") : Se;
let d = null;
const b = Q(), q = a.join(b, "accounts.json"), Z = a.join(b, "instances.json"), ge = a.join(b, "settings.json"), H = a.join(b, "skins");
n.existsSync(H) || n.mkdirSync(H, { recursive: !0 });
function re(t, s) {
  try {
    if (n.existsSync(t))
      return JSON.parse(n.readFileSync(t, "utf-8"));
  } catch (e) {
    console.error(`Failed loading ${t}:`, e);
  }
  return s;
}
function E(t, s) {
  try {
    n.writeFileSync(t, JSON.stringify(s, null, 2), "utf-8");
  } catch (e) {
    console.error(`Failed saving ${t}:`, e);
  }
}
let v = re(q, [
  { id: "1", username: "Test", uuid: N("Test"), type: "offline", isActive: !0, createdAt: Date.now() - 5e4 },
  { id: "2", username: "Nick 2", uuid: N("Nick 2"), type: "offline", isActive: !1, createdAt: Date.now() - 4e4 },
  { id: "3", username: "Nick 3", uuid: N("Nick 3"), type: "offline", isActive: !1, createdAt: Date.now() - 3e4 }
]), C = re(Z, [
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
]), _ = re(ge, {
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
      preload: a.join(je, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), d.webContents.on("did-finish-load", () => {
    d == null || d.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), se ? d.loadURL(se) : d.loadFile(a.join(Se, "index.html"));
}
G.on("window-all-closed", () => {
  process.platform !== "darwin" && (G.quit(), d = null);
});
G.on("activate", () => {
  we.getAllWindows().length === 0 && $e();
});
function ne(t, s) {
  return new Promise((e, i) => {
    const r = a.dirname(s);
    n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
    const o = n.createWriteStream(s);
    (t.startsWith("https") ? ae : ie).get(t, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), ne(c.headers.location, s).then(e).catch(i);
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
  u.handle("minimize-window", () => {
    d == null || d.minimize();
  }), u.handle("maximize-window", () => d ? d.isMaximized() ? (d.unmaximize(), !1) : (d.maximize(), !0) : !1), u.handle("close-window", () => {
    d == null || d.close();
  }), u.handle("is-maximized", () => (d == null ? void 0 : d.isMaximized()) || !1), u.handle("get-accounts", () => v), u.handle("add-account", (t, s) => {
    const e = s.trim();
    if (!e) throw new Error("Имя пользователя не может быть пустым");
    if (v.some((o) => o.username.toLowerCase() === e.toLowerCase()))
      throw new Error(`Никнейм "${e}" уже существует!`);
    const r = {
      id: Date.now().toString(),
      username: e,
      uuid: N(e),
      type: "offline",
      isActive: v.length === 0,
      createdAt: Date.now()
    };
    return v.push(r), E(q, v), v;
  }), u.handle("set-active-account", (t, s) => (v = v.map((e) => ({
    ...e,
    isActive: e.id === s
  })), E(q, v), v)), u.handle("delete-account", (t, s) => (v = v.filter((e) => e.id !== s), v.length > 0 && !v.some((e) => e.isActive) && (v[0].isActive = !0), E(q, v), v)), u.handle("get-instances", () => C), u.handle("create-instance", (t, s) => {
    const e = {
      id: "inst-" + Date.now(),
      name: s.version,
      version: s.version,
      loader: s.loader || "vanilla",
      created: Date.now(),
      memoryMin: _.memoryMin,
      memoryMax: _.memoryMax
    };
    C.push(e), E(Z, C);
    const i = a.join(b, "instances", e.id), r = a.join(i, "mods");
    return n.existsSync(r) || n.mkdirSync(r, { recursive: !0 }), C;
  }), u.handle("delete-instance", (t, s) => {
    C = C.filter((i) => i.id !== s), E(Z, C);
    const e = a.join(b, "instances", s);
    return n.existsSync(e) && n.rmSync(e, { recursive: !0, force: !0 }), C;
  }), u.handle("get-versions", async () => {
    try {
      return await xe();
    } catch (t) {
      return console.error("Failed to get versions:", t), { latest: { release: "1.20.4", snapshot: "1.20.4" }, versions: [] };
    }
  }), u.handle("get-settings", () => _), u.handle("save-settings", (t, s) => (_ = { ..._, ...s }, E(ge, _), _)), u.handle("detect-java", async () => await te()), u.handle("launch-instance", async (t, s) => {
    const e = C.find((o) => o.id === s);
    if (!e) throw new Error("Инстанс не найден");
    const i = v.find((o) => o.isActive) || v[0];
    if (!i) throw new Error("Добавьте хотя бы один аккаунт!");
    e.lastPlayed = Date.now(), E(Z, C);
    const r = e.javaPath || _.javaPath || (await te())[0];
    return Te(
      {
        instanceId: e.id,
        instanceName: e.name,
        version: e.version,
        loader: e.loader || "vanilla",
        username: i.username,
        uuid: i.uuid,
        memoryMin: e.memoryMin || _.memoryMin || 1024,
        memoryMax: e.memoryMax || _.memoryMax || 4096,
        javaPath: r,
        customJvmArgs: e.jvmArgs || _.customJvmArgs
      },
      (o) => {
        d == null || d.webContents.send("launch-progress", o);
      },
      (o) => {
        d == null || d.webContents.send("game-log", o);
      }
    ), !0;
  }), u.handle("stop-instance", (t, s) => Je(s)), u.handle("open-instance-folder", (t, s) => {
    const e = a.join(b, "instances", s);
    n.existsSync(e) || n.mkdirSync(e, { recursive: !0 }), _e.openPath(e);
  }), u.handle("get-instance-mods", (t, s) => {
    const e = a.join(b, "instances", s, "mods");
    if (!n.existsSync(e)) return [];
    try {
      return n.readdirSync(e).map((r) => {
        const o = a.join(e, r), y = n.statSync(o), p = r.endsWith(".jar"), c = r.replace(/\.jar(\.disabled)?$/, "");
        return {
          id: r,
          filename: r,
          name: c,
          enabled: p,
          size: y.size
        };
      });
    } catch {
      return [];
    }
  }), u.handle("toggle-mod", (t, { instanceId: s, modFilename: e }) => {
    const i = a.join(b, "instances", s, "mods"), r = a.join(i, e);
    if (!n.existsSync(r)) return !1;
    let o = e;
    e.endsWith(".jar") ? o = e + ".disabled" : e.endsWith(".jar.disabled") && (o = e.replace(/\.disabled$/, ""));
    const y = a.join(i, o);
    return n.renameSync(r, y), !0;
  }), u.handle("download-mod-file", async (t, { instanceId: s, downloadUrl: e, filename: i }) => {
    const r = a.join(b, "instances", s, "mods");
    n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
    const o = a.join(r, i);
    return await ne(e, o), !0;
  }), u.handle("add-mod-file", async (t, s) => {
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
  }), u.handle("save-user-skin", async (t, s) => {
    if (!d) return !1;
    const e = await ve.showOpenDialog(d, {
      title: "Выберите файл скина Minecraft (.png)",
      filters: [{ name: "Minecraft Skins", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const i = a.join(H, `${s}.png`);
    return n.copyFileSync(e.filePaths[0], i), i;
  }), u.handle("fetch-online-skin", async (t, { username: s, targetUsername: e }) => {
    const i = a.join(H, `${s}.png`), r = [
      `https://ely.by/services/skins-buffer/skins/${encodeURIComponent(e)}.png`,
      `https://minotar.net/skin/${encodeURIComponent(e)}`,
      `https://crafatar.com/skins/${N(e)}`
    ];
    for (const o of r)
      try {
        if (await ne(o, i), n.existsSync(i) && n.statSync(i).size > 100)
          return `data:image/png;base64,${n.readFileSync(i).toString("base64")}`;
      } catch {
      }
    throw new Error(`Скин для никнейма "${e}" не найден на серверах`);
  }), u.handle("get-user-skin", (t, s) => {
    const e = a.join(H, `${s}.png`);
    return n.existsSync(e) ? `data:image/png;base64,${n.readFileSync(e).toString("base64")}` : null;
  });
}
G.whenReady().then(() => {
  Fe(), $e();
});
export {
  Xe as MAIN_DIST,
  Se as RENDERER_DIST,
  se as VITE_DEV_SERVER_URL
};
