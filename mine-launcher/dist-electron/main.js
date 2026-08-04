import { app as E, Menu as me, BrowserWindow as ee, ipcMain as m, shell as fe, dialog as pe } from "electron";
import { fileURLToPath as he } from "node:url";
import a from "node:path";
import s from "node:fs";
import ve from "node:crypto";
import te from "node:https";
import ne from "node:http";
import { execSync as K, spawn as ye } from "node:child_process";
const T = /* @__PURE__ */ new Map();
function U() {
  const t = E.getPath("userData"), n = a.join(t, ".mine-launcher");
  return s.existsSync(n) || s.mkdirSync(n, { recursive: !0 }), n;
}
function A(t) {
  const n = ve.createHash("md5");
  n.update(`OfflinePlayer:${t}`);
  const e = n.digest();
  e[6] = e[6] & 15 | 48, e[8] = e[8] & 63 | 128;
  const i = e.toString("hex");
  return `${i.slice(0, 8)}-${i.slice(8, 12)}-${i.slice(12, 16)}-${i.slice(16, 20)}-${i.slice(20, 32)}`;
}
function C(t) {
  return new Promise((n, e) => {
    (t.startsWith("https") ? te : ne).get(t, (r) => {
      if (r.statusCode && r.statusCode >= 300 && r.statusCode < 400 && r.headers.location)
        return C(r.headers.location).then(n).catch(e);
      if (r.statusCode !== 200)
        return e(new Error(`HTTP ${r.statusCode} loading ${t}`));
      let o = "";
      r.on("data", (f) => {
        o += f;
      }), r.on("end", () => {
        try {
          n(JSON.parse(o));
        } catch (f) {
          e(f);
        }
      });
    }).on("error", e);
  });
}
function M(t, n) {
  return new Promise((e, i) => {
    const r = a.dirname(n);
    s.existsSync(r) || s.mkdirSync(r, { recursive: !0 });
    const o = s.createWriteStream(n);
    (t.startsWith("https") ? te : ne).get(t, (l) => {
      if (l.statusCode && l.statusCode >= 300 && l.statusCode < 400 && l.headers.location)
        return o.close(), M(l.headers.location, n).then(e).catch(i);
      if (l.statusCode !== 200)
        return o.close(), s.unlink(n, () => {
        }), i(new Error(`Failed to download ${t}: HTTP ${l.statusCode}`));
      l.pipe(o), o.on("finish", () => {
        o.close(() => e());
      });
    }).on("error", (l) => {
      o.close(), s.unlink(n, () => {
      }), i(l);
    });
  });
}
function we(t) {
  if (!t || t.length === 0) return !0;
  let n = !1;
  for (const e of t)
    e.action === "allow" ? (!e.os || e.os.name === "windows") && (n = !0) : e.action === "disallow" && (!e.os || e.os.name === "windows") && (n = !1);
  return n;
}
async function L() {
  const t = [], n = process.platform === "win32", e = n ? "javaw.exe" : "java", i = U(), r = a.join(i, "java", "java-17"), o = (d) => {
    if (!s.existsSync(d)) return null;
    const l = s.readdirSync(d);
    for (const v of l) {
      const x = a.join(d, v);
      if (v.toLowerCase() === "javaw.exe") return x;
      if (s.statSync(x).isDirectory()) {
        const y = o(x);
        if (y) return y;
      }
    }
    return null;
  }, f = o(r);
  if (f && t.push(f), process.env.JAVA_HOME) {
    const d = a.join(process.env.JAVA_HOME, "bin", e);
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
      a.join(process.env.LOCALAPPDATA || "", "Programs", "AdoptOpenJDK"),
      "C:\\Program Files (x86)\\Minecraft Launcher\\runtime"
    ];
    for (const l of d)
      if (s.existsSync(l))
        try {
          const v = s.readdirSync(l);
          for (const x of v) {
            const y = a.join(l, x, "bin", e);
            s.existsSync(y) && !t.includes(y) && t.push(y);
          }
        } catch {
        }
  }
  return t;
}
async function je(t, n) {
  const e = U(), i = a.join(e, "java", "java-17"), r = (v) => {
    if (!s.existsSync(v)) return null;
    const x = s.readdirSync(v);
    for (const y of x) {
      const J = a.join(v, y);
      if (y.toLowerCase() === "javaw.exe") return J;
      if (s.statSync(J).isDirectory()) {
        const P = r(J);
        if (P) return P;
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
  }), n({ timestamp: Date.now(), type: "info", message: "Java не найдена на ПК. Автоматическое скачивание OpenJDK Java 17 (Temurin)..." });
  const f = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jre_x64_windows_hotspot_17.0.10_7.zip", d = a.join(e, "java", "java-17.zip");
  s.existsSync(a.dirname(d)) || s.mkdirSync(a.dirname(d), { recursive: !0 }), t({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: "Загрузка OpenJDK Java 17 (40 MB)...",
    progress: 35
  }), await M(f, d), t({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: "Распаковка Java 17 Runtime...",
    progress: 75
  }), n({ timestamp: Date.now(), type: "info", message: "Распаковка архива Java 17..." }), s.existsSync(i) || s.mkdirSync(i, { recursive: !0 });
  try {
    K(`powershell -Command "Expand-Archive -Path '${d}' -DestinationPath '${i}' -Force"`), s.unlinkSync(d);
  } catch (v) {
    n({ timestamp: Date.now(), type: "warn", message: `Ошибка PowerShell распаковки: ${v.message}` });
  }
  const l = r(i);
  if (!l)
    throw new Error("Не удалось найти javaw.exe после распаковки Java 17. Установите Java вручную.");
  return n({ timestamp: Date.now(), type: "info", message: `Java 17 успешно установлена: ${l}` }), l;
}
async function se() {
  return await C("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function xe(t, n, e) {
  var v, x, y, J, P;
  const i = U(), r = a.join(i, "instances", t.instanceId), o = a.join(i, "assets"), f = a.join(i, "libraries"), d = a.join(i, "versions"), l = a.join(r, "natives");
  s.existsSync(r) || s.mkdirSync(r, { recursive: !0 }), s.existsSync(l) || s.mkdirSync(l, { recursive: !0 });
  try {
    let w = t.javaPath, O = !1;
    if (w && s.existsSync(w))
      try {
        K(`"${w}" -version 2>&1`), O = !0;
      } catch {
      }
    if (!O) {
      const c = await L();
      for (const D of c)
        if (s.existsSync(D))
          try {
            K(`"${D}" -version 2>&1`), w = D, O = !0;
            break;
          } catch {
          }
    }
    O || (w = await je(n, e)), e({
      timestamp: Date.now(),
      type: "info",
      message: `Используемый файл Java: ${w}`
    }), n({
      instanceId: t.instanceId,
      stage: "checking",
      statusText: "Получение манифеста версий...",
      progress: 10
    });
    const G = (await se()).versions.find((c) => c.id === t.version);
    if (!G)
      throw new Error(`Версия Minecraft ${t.version} не найдена в манифесте`);
    n({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: `Загрузка структуры версии ${t.version}...`,
      progress: 20
    });
    const W = a.join(d, t.version, `${t.version}.json`), I = await C(G.url);
    if (s.existsSync(a.dirname(W)) || s.mkdirSync(a.dirname(W), { recursive: !0 }), s.writeFileSync(W, JSON.stringify(I, null, 2)), (v = I.assetIndex) != null && v.url) {
      const c = a.join(o, "indexes"), D = a.join(c, `${I.assetIndex.id}.json`);
      s.existsSync(D) || (n({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Загрузка ассетов игры...",
        progress: 30
      }), await M(I.assetIndex.url, D));
    }
    const B = a.join(d, t.version, `${t.version}.jar`);
    !s.existsSync(B) && ((y = (x = I.downloads) == null ? void 0 : x.client) != null && y.url) && (n({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка Minecraft client.jar...",
      progress: 40
    }), await M(I.downloads.client.url, B)), n({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка библиотек...",
      progress: 55
    });
    const F = [], ce = I.libraries || [];
    for (const c of ce)
      if (we(c.rules) && (J = c.downloads) != null && J.artifact) {
        const D = c.downloads.artifact.path, $ = a.join(f, D);
        if (!s.existsSync($))
          try {
            await M(c.downloads.artifact.url, $);
          } catch {
            e({ timestamp: Date.now(), type: "warn", message: `Пропущена библиотека: ${c.name}` });
          }
        s.existsSync($) && F.push($);
      }
    F.push(B);
    let Q = I.mainClass || "net.minecraft.client.main.Main";
    if (t.loader === "fabric") {
      n({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Настройка Fabric...",
        progress: 75
      });
      try {
        const c = await C(`https://meta.fabricmc.net/v2/versions/loader/${t.version}`);
        if (c && c.length > 0) {
          const D = c[0].loader.version, $ = await C(`https://meta.fabricmc.net/v2/versions/loader/${t.version}/${D}/profile/json`);
          if ($.mainClass && (Q = $.mainClass), $.libraries)
            for (const N of $.libraries) {
              const z = N.name.split(":"), de = z[0].replace(/\./g, "/"), Y = z[1], Z = z[2], H = `${de}/${Y}/${Z}/${Y}-${Z}.jar`, R = a.join(f, H), ue = N.url ? `${N.url}${H}` : `https://maven.fabricmc.net/${H}`;
              if (!s.existsSync(R))
                try {
                  await M(ue, R);
                } catch {
                }
              s.existsSync(R) && F.unshift(R);
            }
        }
      } catch (c) {
        e({ timestamp: Date.now(), type: "warn", message: `Не удалось загрузить Fabric метаданные: ${c.message}` });
      }
    }
    n({
      instanceId: t.instanceId,
      stage: "launching",
      statusText: "Запуск Minecraft...",
      progress: 90
    });
    const le = F.join(a.delimiter), p = [];
    p.push(`-Xms${t.memoryMin || 1024}M`), p.push(`-Xmx${t.memoryMax || 4096}M`), p.push(`-Djava.library.path=${l}`), t.customJvmArgs && p.push(...t.customJvmArgs.split(" ").filter(Boolean)), p.push("-cp", le), p.push(Q), p.push("--username", t.username || "Player"), p.push("--version", t.version), p.push("--gameDir", r), p.push("--assetsDir", o), p.push("--assetIndex", ((P = I.assetIndex) == null ? void 0 : P.id) || t.version), p.push("--uuid", t.uuid || A(t.username || "Player")), p.push("--accessToken", "0"), p.push("--userType", "legacy"), e({
      timestamp: Date.now(),
      type: "info",
      message: `Команда запуска: "${w}" ${p.join(" ")}`
    });
    const _ = ye(w || "javaw", p, {
      cwd: r,
      detached: !0
    });
    T.set(t.instanceId, _), _.stdout.on("data", (c) => {
      e({ timestamp: Date.now(), type: "info", message: c.toString() });
    }), _.stderr.on("data", (c) => {
      e({ timestamp: Date.now(), type: "warn", message: c.toString() });
    }), _.on("error", (c) => {
      T.delete(t.instanceId), n({
        instanceId: t.instanceId,
        stage: "error",
        statusText: `Ошибка процесса: ${c.message}`,
        progress: 0,
        error: c.message
      }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${c.message}` });
    }), _.on("exit", (c) => {
      T.delete(t.instanceId), n({
        instanceId: t.instanceId,
        stage: "idle",
        statusText: `Игра завершена (код ${c})`,
        progress: 0
      }), e({ timestamp: Date.now(), type: "info", message: `Minecraft завершился с кодом ${c}` });
    }), n({
      instanceId: t.instanceId,
      stage: "running",
      statusText: "Игра запущена!",
      progress: 100
    });
  } catch (w) {
    n({
      instanceId: t.instanceId,
      stage: "error",
      statusText: `Ошибка: ${w.message}`,
      progress: 0,
      error: w.message
    }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${w.message}` });
  }
}
function De(t) {
  const n = T.get(t);
  return n ? (n.kill(), T.delete(t), !0) : !1;
}
me.setApplicationMenu(null);
const ae = a.dirname(he(import.meta.url));
process.env.APP_ROOT = a.join(ae, "..");
const q = process.env.VITE_DEV_SERVER_URL, Te = a.join(process.env.APP_ROOT, "dist-electron"), ie = a.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = q ? a.join(process.env.APP_ROOT, "public") : ie;
let h = null;
const S = U(), k = a.join(S, "accounts.json"), V = a.join(S, "instances.json"), re = a.join(S, "settings.json");
function X(t, n) {
  try {
    if (s.existsSync(t))
      return JSON.parse(s.readFileSync(t, "utf-8"));
  } catch (e) {
    console.error(`Failed loading ${t}:`, e);
  }
  return n;
}
function b(t, n) {
  try {
    s.writeFileSync(t, JSON.stringify(n, null, 2), "utf-8");
  } catch (e) {
    console.error(`Failed saving ${t}:`, e);
  }
}
let u = X(k, [
  { id: "1", username: "Ник 1", uuid: A("Ник 1"), type: "offline", isActive: !0, createdAt: Date.now() - 5e4 },
  { id: "2", username: "Ник 2", uuid: A("Ник 2"), type: "offline", isActive: !1, createdAt: Date.now() - 4e4 },
  { id: "3", username: "Ник 3", uuid: A("Ник 3"), type: "offline", isActive: !1, createdAt: Date.now() - 3e4 },
  { id: "4", username: "Ник 4", uuid: A("Ник 4"), type: "offline", isActive: !1, createdAt: Date.now() - 2e4 },
  { id: "5", username: "Ник 5", uuid: A("Ник 5"), type: "offline", isActive: !1, createdAt: Date.now() - 1e4 }
]), g = X(V, [
  {
    id: "default-1",
    name: "Vanilla 1.20.4",
    version: "1.20.4",
    loader: "vanilla",
    created: Date.now() - 1e5,
    lastPlayed: Date.now() - 5e4,
    memoryMin: 1024,
    memoryMax: 4096
  },
  {
    id: "fabric-1",
    name: "Fabric 1.20.1",
    version: "1.20.1",
    loader: "fabric",
    created: Date.now() - 8e4,
    memoryMin: 2048,
    memoryMax: 4096
  }
]), j = X(re, {
  javaPath: "",
  memoryMin: 1024,
  memoryMax: 4096,
  customJvmArgs: "",
  closeLauncherOnGameStart: !1,
  gameDir: S
});
function oe() {
  h = new ee({
    width: 1050,
    height: 720,
    minWidth: 900,
    minHeight: 650,
    frame: !0,
    titleBarStyle: "default",
    icon: a.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: a.join(ae, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), h.webContents.on("did-finish-load", () => {
    h == null || h.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), q ? h.loadURL(q) : h.loadFile(a.join(ie, "index.html"));
}
E.on("window-all-closed", () => {
  process.platform !== "darwin" && (E.quit(), h = null);
});
E.on("activate", () => {
  ee.getAllWindows().length === 0 && oe();
});
function ge() {
  m.handle("get-accounts", () => u), m.handle("add-account", (t, n) => {
    const e = n.trim();
    if (!e) throw new Error("Имя пользователя не может быть пустым");
    const i = {
      id: Date.now().toString(),
      username: e,
      uuid: A(e),
      type: "offline",
      isActive: u.length === 0,
      createdAt: Date.now()
    };
    return u.push(i), b(k, u), u;
  }), m.handle("set-active-account", (t, n) => (u = u.map((e) => ({
    ...e,
    isActive: e.id === n
  })), b(k, u), u)), m.handle("delete-account", (t, n) => (u = u.filter((e) => e.id !== n), u.length > 0 && !u.some((e) => e.isActive) && (u[0].isActive = !0), b(k, u), u)), m.handle("get-instances", () => g), m.handle("create-instance", (t, n) => {
    const e = {
      id: "inst-" + Date.now(),
      name: n.name || `Minecraft ${n.version}`,
      version: n.version,
      loader: n.loader || "vanilla",
      created: Date.now(),
      memoryMin: j.memoryMin,
      memoryMax: j.memoryMax
    };
    g.push(e), b(V, g);
    const i = a.join(S, "instances", e.id), r = a.join(i, "mods");
    return s.existsSync(r) || s.mkdirSync(r, { recursive: !0 }), g;
  }), m.handle("delete-instance", (t, n) => {
    g = g.filter((i) => i.id !== n), b(V, g);
    const e = a.join(S, "instances", n);
    return s.existsSync(e) && s.rmSync(e, { recursive: !0, force: !0 }), g;
  }), m.handle("get-versions", async () => {
    try {
      return await se();
    } catch (t) {
      return console.error("Failed to get versions:", t), { latest: { release: "1.20.4", snapshot: "1.20.4" }, versions: [] };
    }
  }), m.handle("get-settings", () => j), m.handle("save-settings", (t, n) => (j = { ...j, ...n }, b(re, j), j)), m.handle("detect-java", async () => await L()), m.handle("launch-instance", async (t, n) => {
    const e = g.find((o) => o.id === n);
    if (!e) throw new Error("Инстанс не найден");
    const i = u.find((o) => o.isActive) || u[0];
    if (!i) throw new Error("Добавьте хотя бы один аккаунт!");
    e.lastPlayed = Date.now(), b(V, g);
    const r = e.javaPath || j.javaPath || (await L())[0];
    return xe(
      {
        instanceId: e.id,
        instanceName: e.name,
        version: e.version,
        loader: e.loader || "vanilla",
        username: i.username,
        uuid: i.uuid,
        memoryMin: e.memoryMin || j.memoryMin || 1024,
        memoryMax: e.memoryMax || j.memoryMax || 4096,
        javaPath: r,
        customJvmArgs: e.jvmArgs || j.customJvmArgs
      },
      (o) => {
        h == null || h.webContents.send("launch-progress", o);
      },
      (o) => {
        h == null || h.webContents.send("game-log", o);
      }
    ), !0;
  }), m.handle("stop-instance", (t, n) => De(n)), m.handle("open-instance-folder", (t, n) => {
    const e = a.join(S, "instances", n);
    s.existsSync(e) || s.mkdirSync(e, { recursive: !0 }), fe.openPath(e);
  }), m.handle("get-instance-mods", (t, n) => {
    const e = a.join(S, "instances", n, "mods");
    if (!s.existsSync(e)) return [];
    try {
      return s.readdirSync(e).map((r) => {
        const o = a.join(e, r), f = s.statSync(o), d = r.endsWith(".jar"), l = r.replace(/\.jar(\.disabled)?$/, "");
        return {
          id: r,
          filename: r,
          name: l,
          enabled: d,
          size: f.size
        };
      });
    } catch {
      return [];
    }
  }), m.handle("toggle-mod", (t, { instanceId: n, modFilename: e }) => {
    const i = a.join(S, "instances", n, "mods"), r = a.join(i, e);
    if (!s.existsSync(r)) return !1;
    let o = e;
    e.endsWith(".jar") ? o = e + ".disabled" : e.endsWith(".jar.disabled") && (o = e.replace(/\.disabled$/, ""));
    const f = a.join(i, o);
    return s.renameSync(r, f), !0;
  }), m.handle("add-mod-file", async (t, n) => {
    if (!h) return !1;
    const e = await pe.showOpenDialog(h, {
      title: "Выберите файл мода (.jar)",
      filters: [{ name: "Minecraft Mods", extensions: ["jar"] }],
      properties: ["openFile", "multiSelections"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const i = a.join(S, "instances", n, "mods");
    s.existsSync(i) || s.mkdirSync(i, { recursive: !0 });
    for (const r of e.filePaths) {
      const o = a.join(i, a.basename(r));
      s.copyFileSync(r, o);
    }
    return !0;
  });
}
E.whenReady().then(() => {
  ge(), oe();
});
export {
  Te as MAIN_DIST,
  ie as RENDERER_DIST,
  q as VITE_DEV_SERVER_URL
};
