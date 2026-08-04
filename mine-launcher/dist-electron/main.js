import { app as G, Menu as Ie, BrowserWindow as we, ipcMain as p, shell as _e, dialog as ve } from "electron";
import { fileURLToPath as Ce } from "node:url";
import a from "node:path";
import n from "node:fs";
import ae from "node:https";
import ie from "node:http";
import Ae from "node:crypto";
import { execSync as L, spawn as Pe } from "node:child_process";
const z = /* @__PURE__ */ new Map();
function Q() {
  const t = G.getPath("userData"), s = a.join(t, ".mine-launcher");
  return n.existsSync(s) || n.mkdirSync(s, { recursive: !0 }), s;
}
function N(t) {
  const s = Ae.createHash("md5");
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
      r.on("data", (h) => {
        o += h;
      }), r.on("end", () => {
        try {
          s(JSON.parse(o));
        } catch (h) {
          e(h);
        }
      });
    }).on("error", e);
  });
}
function P(t, s) {
  return new Promise((e, i) => {
    const r = a.dirname(s);
    n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
    const o = n.createWriteStream(s);
    (t.startsWith("https") ? ae : ie).get(t, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), P(c.headers.location, s).then(e).catch(i);
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
function Me(t) {
  if (!t || t.length === 0) return !0;
  let s = !1;
  for (const e of t)
    e.action === "allow" ? (!e.os || e.os.name === "windows") && (s = !0) : e.action === "disallow" && (!e.os || e.os.name === "windows") && (s = !1);
  return s;
}
async function te() {
  const t = [], s = process.platform === "win32", e = s ? "javaw.exe" : "java", i = Q(), r = a.join(i, "java", "java-17"), o = (m) => {
    if (!n.existsSync(m)) return null;
    const c = n.readdirSync(m);
    for (const $ of c) {
      const M = a.join(m, $);
      if ($.toLowerCase() === "javaw.exe") return M;
      if (n.statSync(M).isDirectory()) {
        const D = o(M);
        if (D) return D;
      }
    }
    return null;
  }, h = o(r);
  if (h && t.push(h), process.env.JAVA_HOME) {
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
          const $ = n.readdirSync(c);
          for (const M of $) {
            const D = a.join(c, M, "bin", e);
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
    const M = n.readdirSync($);
    for (const D of M) {
      const R = a.join($, D);
      if (D.toLowerCase() === "javaw.exe") return R;
      if (n.statSync(R).isDirectory()) {
        const U = r(R);
        if (U) return U;
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
  const h = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jre_x64_windows_hotspot_17.0.10_7.zip", m = a.join(e, "java", "java-17.zip");
  n.existsSync(a.dirname(m)) || n.mkdirSync(a.dirname(m), { recursive: !0 }), t({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: "Загрузка OpenJDK Java 17 (40 MB)...",
    progress: 35
  }), await P(h, m), t({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: "Распаковка Java 17 Runtime...",
    progress: 75
  }), s({ timestamp: Date.now(), type: "info", message: "Распаковка архива Java 17..." }), n.existsSync(i) || n.mkdirSync(i, { recursive: !0 });
  try {
    L(`powershell -Command "Expand-Archive -Path '${m}' -DestinationPath '${i}' -Force"`), n.unlinkSync(m);
  } catch ($) {
    s({ timestamp: Date.now(), type: "warn", message: `Ошибка PowerShell распаковки: ${$.message}` });
  }
  const c = r(i);
  if (!c)
    throw new Error("Не удалось найти javaw.exe после распаковки Java 17. Установите Java вручную.");
  return s({ timestamp: Date.now(), type: "info", message: `Java 17 успешно установлена: ${c}` }), c;
}
async function je() {
  return await B("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function Te(t, s, e) {
  var R, U, oe, ce, le, de, ue, me;
  const i = Q(), r = a.join(i, "instances", t.instanceId), o = a.join(i, "assets"), h = a.join(i, "libraries"), m = a.join(i, "versions"), c = a.join(r, "natives");
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
      const j = (T) => {
        const fe = n.readdirSync(T);
        for (const V of fe) {
          const J = a.join(T, V);
          n.statSync(J).isDirectory() ? j(J) : V.endsWith(".tmp") && n.unlinkSync(J);
        }
      };
      j(D);
    } catch {
    }
  try {
    let j = t.javaPath, T = !1;
    if (j && n.existsSync(j))
      try {
        L(`"${j}" -version 2>&1`), T = !0;
      } catch {
      }
    if (!T) {
      const l = await te();
      for (const u of l)
        if (n.existsSync(u))
          try {
            L(`"${u}" -version 2>&1`), j = u, T = !0;
            break;
          } catch {
          }
    }
    T || (j = await ke(s, e)), e({
      timestamp: Date.now(),
      type: "info",
      message: `Используемый файл Java: ${j}`
    }), s({
      instanceId: t.instanceId,
      stage: "checking",
      statusText: "Получение манифеста версий...",
      progress: 10
    });
    const V = (await je()).versions.find((l) => l.id === t.version);
    if (!V)
      throw new Error(`Версия Minecraft ${t.version} не найдена в манифесте Mojang`);
    s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: `Загрузка структуры версии ${t.version}...`,
      progress: 20
    });
    const J = a.join(m, t.version, `${t.version}.json`), g = await B(V.url);
    if (n.existsSync(a.dirname(J)) || n.mkdirSync(a.dirname(J), { recursive: !0 }), n.writeFileSync(J, JSON.stringify(g, null, 2)), (R = g.assetIndex) != null && R.url) {
      const l = a.join(o, "indexes"), u = a.join(l, `${g.assetIndex.id}.json`);
      n.existsSync(u) || (s({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Загрузка манифеста ресурсов...",
        progress: 25
      }), await P(g.assetIndex.url, u));
      try {
        const I = JSON.parse(n.readFileSync(u, "utf-8")).objects || {}, x = Object.keys(I), F = a.join(o, "objects"), w = [];
        for (const A of x) {
          const S = I[A].hash, O = S.slice(0, 2), K = a.join(F, O, S);
          n.existsSync(K) || w.push({
            hash: S,
            url: `https://resources.download.minecraft.net/${O}/${S}`,
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
          const A = 75;
          let k = 0;
          for (let S = 0; S < w.length; S += A) {
            const O = w.slice(S, S + A);
            await Promise.all(
              O.map((ye) => P(ye.url, ye.dest).catch(() => {
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
      } catch (f) {
        e({ timestamp: Date.now(), type: "warn", message: `Ошибка ресурсов: ${f.message}` });
      }
    }
    const Y = a.join(m, t.version, `${t.version}.jar`);
    !n.existsSync(Y) && ((oe = (U = g.downloads) == null ? void 0 : U.client) != null && oe.url) && (s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка Minecraft client.jar...",
      progress: 50
    }), await P(g.downloads.client.url, Y)), s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка и распаковка библиотек...",
      progress: 60
    });
    const W = [], De = g.libraries || [];
    for (const l of De)
      if (Me(l.rules)) {
        if ((ce = l.downloads) != null && ce.artifact) {
          const u = l.downloads.artifact.path, f = a.join(h, u);
          if (!n.existsSync(f))
            try {
              await P(l.downloads.artifact.url, f);
            } catch {
            }
          n.existsSync(f) && (W.push(f), (u.includes("natives") || l.name.includes("natives")) && ee(f, c));
        }
        if ((le = l.downloads) != null && le.classifiers) {
          const u = l.downloads.classifiers, f = u["natives-windows"] || u["natives-windows-64"] || u["natives-windows-x86"];
          if (f) {
            const I = f.path, x = a.join(h, I);
            if (!n.existsSync(x))
              try {
                await P(f.url, x);
              } catch {
              }
            n.existsSync(x) && ee(x, c);
          }
        }
        if (!((de = l.downloads) != null && de.artifact) && l.name) {
          const u = l.name.split(":"), f = u[0].replace(/\./g, "/"), I = u[1], x = u[2], F = `${f}/${I}/${x}/${I}-${x}.jar`, w = a.join(h, F), A = l.url ? `${l.url}${F}` : `https://libraries.minecraft.net/${F}`;
          if (!n.existsSync(w))
            try {
              await P(A, w);
            } catch {
            }
          n.existsSync(w) && (W.push(w), l.name.includes("natives") && ee(w, c));
        }
      }
    W.push(Y);
    let pe = g.mainClass || "net.minecraft.client.main.Main";
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
          const u = l[0].loader.version, f = await B(`https://meta.fabricmc.net/v2/versions/loader/${t.version}/${u}/profile/json`);
          if (f.mainClass && (pe = f.mainClass), f.libraries)
            for (const I of f.libraries) {
              const x = I.name.split(":"), F = x[0].replace(/\./g, "/"), w = x[1], A = x[2], k = `${F}/${w}/${A}/${w}-${A}.jar`, S = a.join(h, k), O = I.url ? `${I.url}${k}` : `https://maven.fabricmc.net/${k}`;
              if (!n.existsSync(S))
                try {
                  await P(O, S);
                } catch {
                }
              n.existsSync(S) && W.unshift(S);
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
    const be = W.join(a.delimiter), d = [];
    d.push(`-Xms${t.memoryMin || 1024}M`), d.push(`-Xmx${t.memoryMax || 4096}M`), d.push(`-Djava.library.path=${c}`), d.push("-Dminecraft.api.auth.host=http://127.0.0.1"), d.push("-Dminecraft.api.account.host=http://127.0.0.1"), d.push("-Dminecraft.api.session.host=http://127.0.0.1"), d.push("-Dminecraft.api.services.host=http://127.0.0.1"), d.push("-XX:+UseG1GC", "-XX:+UnlockExperimentalVMOptions", "-XX:G1NewSizePercent=20", "-XX:G1ReservePercent=20", "-XX:MaxGCPauseMillis=50", "-XX:G1HeapRegionSize=32M"), t.customJvmArgs && d.push(...t.customJvmArgs.split(" ").filter(Boolean)), d.push("-cp", be), d.push(pe);
    const he = (t.uuid || N(t.username || "Player")).replace(/-/g, "");
    if (g.minecraftArguments && typeof g.minecraftArguments == "string") {
      const l = g.minecraftArguments.split(" ");
      for (const u of l) {
        let f = u.replace("${auth_player_name}", t.username || "Player").replace("${version_name}", t.version).replace("${game_directory}", r).replace("${assets_root}", o).replace("${assets_index_name}", ((ue = g.assetIndex) == null ? void 0 : ue.id) || t.version).replace("${auth_uuid}", he).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", "release");
        d.push(f);
      }
    } else
      d.push("--username", t.username || "Player"), d.push("--version", t.version), d.push("--gameDir", r), d.push("--assetsDir", o), d.push("--assetIndex", ((me = g.assetIndex) == null ? void 0 : me.id) || t.version), d.push("--uuid", he), d.push("--accessToken", "0"), d.push("--userType", "mojang"), d.push("--versionType", "release");
    e({
      timestamp: Date.now(),
      type: "info",
      message: `Команда запуска: "${j}" ${d.join(" ")}`
    });
    const X = Pe(j || "javaw", d, {
      cwd: r,
      detached: !0
    });
    z.set(t.instanceId, X), X.stdout.on("data", (l) => {
      e({ timestamp: Date.now(), type: "info", message: l.toString() });
    }), X.stderr.on("data", (l) => {
      e({ timestamp: Date.now(), type: "warn", message: l.toString() });
    }), X.on("error", (l) => {
      z.delete(t.instanceId), s({
        instanceId: t.instanceId,
        stage: "error",
        statusText: `Ошибка процесса: ${l.message}`,
        progress: 0,
        error: l.message
      }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${l.message}` });
    }), X.on("exit", (l) => {
      z.delete(t.instanceId), s({
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
  } catch (j) {
    s({
      instanceId: t.instanceId,
      stage: "error",
      statusText: `Ошибка: ${j.message}`,
      progress: 0,
      error: j.message
    }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${j.message}` });
  }
}
function Je(t) {
  const s = z.get(t);
  return s ? (s.kill(), z.delete(t), !0) : !1;
}
Ie.setApplicationMenu(null);
const Se = a.dirname(Ce(import.meta.url));
process.env.APP_ROOT = a.join(Se, "..");
const se = process.env.VITE_DEV_SERVER_URL, ze = a.join(process.env.APP_ROOT, "dist-electron"), ge = a.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = se ? a.join(process.env.APP_ROOT, "public") : ge;
let v = null;
const b = Q(), q = a.join(b, "accounts.json"), Z = a.join(b, "instances.json"), xe = a.join(b, "settings.json"), H = a.join(b, "skins");
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
let y = re(q, [
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
]), _ = re(xe, {
  javaPath: "",
  memoryMin: 1024,
  memoryMax: 4096,
  customJvmArgs: "",
  closeLauncherOnGameStart: !1,
  gameDir: b
});
function $e() {
  v = new we({
    width: 1050,
    height: 720,
    minWidth: 900,
    minHeight: 650,
    frame: !0,
    titleBarStyle: "default",
    icon: a.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: a.join(Se, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), v.webContents.on("did-finish-load", () => {
    v == null || v.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), se ? v.loadURL(se) : v.loadFile(a.join(ge, "index.html"));
}
G.on("window-all-closed", () => {
  process.platform !== "darwin" && (G.quit(), v = null);
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
  p.handle("get-accounts", () => y), p.handle("add-account", (t, s) => {
    const e = s.trim();
    if (!e) throw new Error("Имя пользователя не может быть пустым");
    if (y.some((o) => o.username.toLowerCase() === e.toLowerCase()))
      throw new Error(`Никнейм "${e}" уже существует!`);
    const r = {
      id: Date.now().toString(),
      username: e,
      uuid: N(e),
      type: "offline",
      isActive: y.length === 0,
      createdAt: Date.now()
    };
    return y.push(r), E(q, y), y;
  }), p.handle("set-active-account", (t, s) => (y = y.map((e) => ({
    ...e,
    isActive: e.id === s
  })), E(q, y), y)), p.handle("delete-account", (t, s) => (y = y.filter((e) => e.id !== s), y.length > 0 && !y.some((e) => e.isActive) && (y[0].isActive = !0), E(q, y), y)), p.handle("get-instances", () => C), p.handle("create-instance", (t, s) => {
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
  }), p.handle("delete-instance", (t, s) => {
    C = C.filter((i) => i.id !== s), E(Z, C);
    const e = a.join(b, "instances", s);
    return n.existsSync(e) && n.rmSync(e, { recursive: !0, force: !0 }), C;
  }), p.handle("get-versions", async () => {
    try {
      return await je();
    } catch (t) {
      return console.error("Failed to get versions:", t), { latest: { release: "1.20.4", snapshot: "1.20.4" }, versions: [] };
    }
  }), p.handle("get-settings", () => _), p.handle("save-settings", (t, s) => (_ = { ..._, ...s }, E(xe, _), _)), p.handle("detect-java", async () => await te()), p.handle("launch-instance", async (t, s) => {
    const e = C.find((o) => o.id === s);
    if (!e) throw new Error("Инстанс не найден");
    const i = y.find((o) => o.isActive) || y[0];
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
        v == null || v.webContents.send("launch-progress", o);
      },
      (o) => {
        v == null || v.webContents.send("game-log", o);
      }
    ), !0;
  }), p.handle("stop-instance", (t, s) => Je(s)), p.handle("open-instance-folder", (t, s) => {
    const e = a.join(b, "instances", s);
    n.existsSync(e) || n.mkdirSync(e, { recursive: !0 }), _e.openPath(e);
  }), p.handle("get-instance-mods", (t, s) => {
    const e = a.join(b, "instances", s, "mods");
    if (!n.existsSync(e)) return [];
    try {
      return n.readdirSync(e).map((r) => {
        const o = a.join(e, r), h = n.statSync(o), m = r.endsWith(".jar"), c = r.replace(/\.jar(\.disabled)?$/, "");
        return {
          id: r,
          filename: r,
          name: c,
          enabled: m,
          size: h.size
        };
      });
    } catch {
      return [];
    }
  }), p.handle("toggle-mod", (t, { instanceId: s, modFilename: e }) => {
    const i = a.join(b, "instances", s, "mods"), r = a.join(i, e);
    if (!n.existsSync(r)) return !1;
    let o = e;
    e.endsWith(".jar") ? o = e + ".disabled" : e.endsWith(".jar.disabled") && (o = e.replace(/\.disabled$/, ""));
    const h = a.join(i, o);
    return n.renameSync(r, h), !0;
  }), p.handle("download-mod-file", async (t, { instanceId: s, downloadUrl: e, filename: i }) => {
    const r = a.join(b, "instances", s, "mods");
    n.existsSync(r) || n.mkdirSync(r, { recursive: !0 });
    const o = a.join(r, i);
    return await ne(e, o), !0;
  }), p.handle("add-mod-file", async (t, s) => {
    if (!v) return !1;
    const e = await ve.showOpenDialog(v, {
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
  }), p.handle("save-user-skin", async (t, s) => {
    if (!v) return !1;
    const e = await ve.showOpenDialog(v, {
      title: "Выберите файл скина Minecraft (.png)",
      filters: [{ name: "Minecraft Skins", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const i = a.join(H, `${s}.png`);
    return n.copyFileSync(e.filePaths[0], i), i;
  }), p.handle("fetch-online-skin", async (t, { username: s, targetUsername: e }) => {
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
  }), p.handle("get-user-skin", (t, s) => {
    const e = a.join(H, `${s}.png`);
    return n.existsSync(e) ? `data:image/png;base64,${n.readFileSync(e).toString("base64")}` : null;
  });
}
G.whenReady().then(() => {
  Fe(), $e();
});
export {
  ze as MAIN_DIST,
  ge as RENDERER_DIST,
  se as VITE_DEV_SERVER_URL
};
