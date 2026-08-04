import { app as Z, Menu as Pe, BrowserWindow as xe, ipcMain as f, shell as Ie, dialog as re } from "electron";
import { fileURLToPath as Ce } from "node:url";
import r from "node:path";
import n from "node:fs";
import ne from "node:https";
import me from "node:http";
import _e from "node:crypto";
import { execSync as Q, spawn as ke } from "node:child_process";
const G = /* @__PURE__ */ new Map();
function ae() {
  const t = Z.getPath("userData"), s = r.join(t, ".mine-launcher");
  return n.existsSync(s) || n.mkdirSync(s, { recursive: !0 }), s;
}
function V(t) {
  const s = _e.createHash("md5");
  s.update(`OfflinePlayer:${t}`);
  const e = s.digest();
  e[6] = e[6] & 15 | 48, e[8] = e[8] & 63 | 128;
  const i = e.toString("hex");
  return `${i.slice(0, 8)}-${i.slice(8, 12)}-${i.slice(12, 16)}-${i.slice(16, 20)}-${i.slice(20, 32)}`;
}
function q(t) {
  return new Promise((s, e) => {
    (t.startsWith("https") ? ne : me).get(t, (a) => {
      if (a.statusCode && a.statusCode >= 300 && a.statusCode < 400 && a.headers.location)
        return q(a.headers.location).then(s).catch(e);
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
function E(t, s) {
  return new Promise((e, i) => {
    const a = r.dirname(s);
    n.existsSync(a) || n.mkdirSync(a, { recursive: !0 });
    const o = n.createWriteStream(s);
    (t.startsWith("https") ? ne : me).get(t, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), E(c.headers.location, s).then(e).catch(i);
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
function oe(t, s) {
  if (n.existsSync(t))
    try {
      const e = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::OpenRead('${t.replace(/'/g, "''")}').Entries | Where-Object { $_.FullName -like '*.dll' } | ForEach-Object { $dest = [System.IO.Path]::Combine('${s.replace(/'/g, "''")}', $_.Name); [System.IO.Compression.ZipFileExtensions]::ExtractToFile($_, $dest, $true) }"`;
      Q(e, { stdio: "ignore" });
    } catch {
      try {
        Q(`powershell -Command "Expand-Archive -Path '${t}' -DestinationPath '${s}' -Force"`, { stdio: "ignore" });
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
async function ce() {
  const t = [], s = process.platform === "win32", e = s ? "javaw.exe" : "java", i = ae(), a = r.join(i, "java", "java-17"), o = (m) => {
    if (!n.existsSync(m)) return null;
    const c = n.readdirSync(m);
    for (const S of c) {
      const P = r.join(m, S);
      if (S.toLowerCase() === "javaw.exe") return P;
      if (n.statSync(P).isDirectory()) {
        const h = o(P);
        if (h) return h;
      }
    }
    return null;
  }, d = o(a);
  if (d && t.push(d), process.env.JAVA_HOME) {
    const m = r.join(process.env.JAVA_HOME, "bin", e);
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
      r.join(process.env.LOCALAPPDATA || "", "Programs", "AdoptOpenJDK"),
      "C:\\Program Files (x86)\\Minecraft Launcher\\runtime"
    ];
    for (const c of m)
      if (n.existsSync(c))
        try {
          const S = n.readdirSync(c);
          for (const P of S) {
            const h = r.join(c, P, "bin", e);
            n.existsSync(h) && !t.includes(h) && t.push(h);
          }
        } catch {
        }
  }
  return t;
}
async function Ae(t, s) {
  const e = ae(), i = r.join(e, "java", "java-17"), a = (S) => {
    if (!n.existsSync(S)) return null;
    const P = n.readdirSync(S);
    for (const h of P) {
      const I = r.join(S, h);
      if (h.toLowerCase() === "javaw.exe") return I;
      if (n.statSync(I).isDirectory()) {
        const v = a(I);
        if (v) return v;
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
  const d = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jre_x64_windows_hotspot_17.0.10_7.zip", m = r.join(e, "java", "java-17.zip");
  n.existsSync(r.dirname(m)) || n.mkdirSync(r.dirname(m), { recursive: !0 }), t({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: "Загрузка OpenJDK Java 17 (40 MB)...",
    progress: 35
  }), await E(d, m), t({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: "Распаковка Java 17 Runtime...",
    progress: 75
  }), s({ timestamp: Date.now(), type: "info", message: "Распаковка архива Java 17..." }), n.existsSync(i) || n.mkdirSync(i, { recursive: !0 });
  try {
    Q(`powershell -Command "Expand-Archive -Path '${m}' -DestinationPath '${i}' -Force"`), n.unlinkSync(m);
  } catch (S) {
    s({ timestamp: Date.now(), type: "warn", message: `Ошибка PowerShell распаковки: ${S.message}` });
  }
  const c = a(i);
  if (!c)
    throw new Error("Не удалось найти javaw.exe после распаковки Java 17. Установите Java вручную.");
  return s({ timestamp: Date.now(), type: "info", message: `Java 17 успешно установлена: ${c}` }), c;
}
async function ge() {
  return await q("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function Te(t, s, e) {
  var I, v, $, A, C, X, Y, pe;
  const i = ae(), a = r.join(i, "instances", t.instanceId), o = r.join(i, "assets"), d = r.join(i, "libraries"), m = r.join(i, "versions"), c = r.join(a, "natives");
  n.existsSync(a) || n.mkdirSync(a, { recursive: !0 }), n.existsSync(c) || n.mkdirSync(c, { recursive: !0 });
  const S = r.join(a, "options.txt");
  n.writeFileSync(S, `version:2586
chatVisibility:0
forceUnicodeFont:false
realmsNotifications:false
hideServerAddress:false
`, "utf-8");
  const h = r.join(a, ".fabric");
  if (n.existsSync(h))
    try {
      const D = (z) => {
        const he = n.readdirSync(z);
        for (const B of he) {
          const H = r.join(z, B);
          n.statSync(H).isDirectory() ? D(H) : B.endsWith(".tmp") && n.unlinkSync(H);
        }
      };
      D(h);
    } catch {
    }
  try {
    let D = t.javaPath, z = !1;
    if (D && n.existsSync(D))
      try {
        Q(`"${D}" -version 2>&1`), z = !0;
      } catch {
      }
    if (!z) {
      const l = await ce();
      for (const w of l)
        if (n.existsSync(w))
          try {
            Q(`"${w}" -version 2>&1`), D = w, z = !0;
            break;
          } catch {
          }
    }
    z || (D = await Ae(s, e)), e({
      timestamp: Date.now(),
      type: "info",
      message: `Используемый файл Java: ${D}`
    }), s({
      instanceId: t.instanceId,
      stage: "checking",
      statusText: "Получение манифеста версий...",
      progress: 10
    });
    const B = (await ge()).versions.find((l) => l.id === t.version);
    if (!B)
      throw new Error(`Версия Minecraft ${t.version} не найдена в манифесте Mojang`);
    s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: `Загрузка структуры версии ${t.version}...`,
      progress: 20
    });
    const H = r.join(m, t.version, `${t.version}.json`), _ = await q(B.url);
    if (n.existsSync(r.dirname(H)) || n.mkdirSync(r.dirname(H), { recursive: !0 }), n.writeFileSync(H, JSON.stringify(_, null, 2)), (I = _.assetIndex) != null && I.url) {
      const l = r.join(o, "indexes"), w = r.join(l, `${_.assetIndex.id}.json`);
      n.existsSync(w) || (s({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Загрузка манифеста ресурсов...",
        progress: 25
      }), await E(_.assetIndex.url, w));
      try {
        const T = JSON.parse(n.readFileSync(w, "utf-8")).objects || {}, k = Object.keys(T), W = r.join(o, "objects"), j = [];
        for (const O of k) {
          const b = T[O].hash, U = b.slice(0, 2), ee = r.join(W, U, b);
          n.existsSync(ee) || j.push({
            hash: b,
            url: `https://resources.download.minecraft.net/${U}/${b}`,
            dest: ee
          });
        }
        if (j.length > 0) {
          s({
            instanceId: t.instanceId,
            stage: "downloading",
            statusText: `Загрузка ресурсов (${j.length} файлов)...`,
            progress: 30
          });
          const O = 75;
          let N = 0;
          for (let b = 0; b < j.length; b += O) {
            const U = j.slice(b, b + O);
            await Promise.all(
              U.map((we) => E(we.url, we.dest).catch(() => {
              }))
            ), N += U.length;
            const ee = Math.round(30 + N / j.length * 15);
            s({
              instanceId: t.instanceId,
              stage: "downloading",
              statusText: `Загрузка ресурсов (${N}/${j.length})...`,
              progress: ee
            });
          }
        }
      } catch (g) {
        e({ timestamp: Date.now(), type: "warn", message: `Ошибка ресурсов: ${g.message}` });
      }
    }
    const ie = r.join(m, t.version, `${t.version}.jar`);
    !n.existsSync(ie) && (($ = (v = _.downloads) == null ? void 0 : v.client) != null && $.url) && (s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка Minecraft client.jar...",
      progress: 50
    }), await E(_.downloads.client.url, ie)), s({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка и распаковка библиотек...",
      progress: 60
    });
    const K = [], De = _.libraries || [];
    for (const l of De)
      if (Me(l.rules)) {
        if ((A = l.downloads) != null && A.artifact) {
          const w = l.downloads.artifact.path, g = r.join(d, w);
          if (!n.existsSync(g))
            try {
              await E(l.downloads.artifact.url, g);
            } catch {
            }
          n.existsSync(g) && (K.push(g), (w.includes("natives") || l.name.includes("natives")) && oe(g, c));
        }
        if ((C = l.downloads) != null && C.classifiers) {
          const w = l.downloads.classifiers, g = w["natives-windows"] || w["natives-windows-64"] || w["natives-windows-x86"];
          if (g) {
            const T = g.path, k = r.join(d, T);
            if (!n.existsSync(k))
              try {
                await E(g.url, k);
              } catch {
              }
            n.existsSync(k) && oe(k, c);
          }
        }
        if (!((X = l.downloads) != null && X.artifact) && l.name) {
          const w = l.name.split(":"), g = w[0].replace(/\./g, "/"), T = w[1], k = w[2], W = `${g}/${T}/${k}/${T}-${k}.jar`, j = r.join(d, W), O = l.url ? `${l.url}${W}` : `https://libraries.minecraft.net/${W}`;
          if (!n.existsSync(j))
            try {
              await E(O, j);
            } catch {
            }
          n.existsSync(j) && (K.push(j), l.name.includes("natives") && oe(j, c));
        }
      }
    K.push(ie);
    let ye = _.mainClass || "net.minecraft.client.main.Main";
    if (t.loader === "fabric") {
      s({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Настройка Fabric...",
        progress: 75
      });
      try {
        const l = await q(`https://meta.fabricmc.net/v2/versions/loader/${t.version}`);
        if (l && l.length > 0) {
          const w = l[0].loader.version, g = await q(`https://meta.fabricmc.net/v2/versions/loader/${t.version}/${w}/profile/json`);
          if (g.mainClass && (ye = g.mainClass), g.libraries)
            for (const T of g.libraries) {
              const k = T.name.split(":"), W = k[0].replace(/\./g, "/"), j = k[1], O = k[2], N = `${W}/${j}/${O}/${j}-${O}.jar`, b = r.join(d, N), U = T.url ? `${T.url}${N}` : `https://maven.fabricmc.net/${N}`;
              if (!n.existsSync(b))
                try {
                  await E(U, b);
                } catch {
                }
              n.existsSync(b) && K.unshift(b);
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
    const be = K.join(r.delimiter), y = [];
    y.push(`-Xms${t.memoryMin || 1024}M`), y.push(`-Xmx${t.memoryMax || 4096}M`), y.push(`-Djava.library.path=${c}`), y.push("-Dminecraft.api.auth.host=http://127.0.0.1"), y.push("-Dminecraft.api.account.host=http://127.0.0.1"), y.push("-Dminecraft.api.session.host=http://127.0.0.1"), y.push("-Dminecraft.api.services.host=http://127.0.0.1"), y.push("-XX:+UseG1GC", "-XX:+UnlockExperimentalVMOptions", "-XX:G1NewSizePercent=20", "-XX:G1ReservePercent=20", "-XX:MaxGCPauseMillis=50", "-XX:G1HeapRegionSize=32M"), t.customJvmArgs && y.push(...t.customJvmArgs.split(" ").filter(Boolean)), y.push("-cp", be), y.push(ye);
    const ve = (t.uuid || V(t.username || "Player")).replace(/-/g, "");
    if (_.minecraftArguments && typeof _.minecraftArguments == "string") {
      const l = _.minecraftArguments.split(" ");
      for (const w of l) {
        let g = w.replace("${auth_player_name}", t.username || "Player").replace("${version_name}", t.version).replace("${game_directory}", a).replace("${assets_root}", o).replace("${assets_index_name}", ((Y = _.assetIndex) == null ? void 0 : Y.id) || t.version).replace("${auth_uuid}", ve).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", "release");
        y.push(g);
      }
    } else
      y.push("--username", t.username || "Player"), y.push("--version", t.version), y.push("--gameDir", a), y.push("--assetsDir", o), y.push("--assetIndex", ((pe = _.assetIndex) == null ? void 0 : pe.id) || t.version), y.push("--uuid", ve), y.push("--accessToken", "0"), y.push("--userType", "mojang"), y.push("--versionType", "release");
    e({
      timestamp: Date.now(),
      type: "info",
      message: `Команда запуска: "${D}" ${y.join(" ")}`
    });
    const L = ke(D || "javaw", y, {
      cwd: a,
      detached: !0
    });
    G.set(t.instanceId, L), L.stdout.on("data", (l) => {
      e({ timestamp: Date.now(), type: "info", message: l.toString() });
    }), L.stderr.on("data", (l) => {
      e({ timestamp: Date.now(), type: "warn", message: l.toString() });
    }), L.on("error", (l) => {
      G.delete(t.instanceId), s({
        instanceId: t.instanceId,
        stage: "error",
        statusText: `Ошибка процесса: ${l.message}`,
        progress: 0,
        error: l.message
      }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${l.message}` });
    }), L.on("exit", (l) => {
      G.delete(t.instanceId), s({
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
  } catch (D) {
    s({
      instanceId: t.instanceId,
      stage: "error",
      statusText: `Ошибка: ${D.message}`,
      progress: 0,
      error: D.message
    }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${D.message}` });
  }
}
function Fe(t) {
  const s = G.get(t);
  return s ? (s.kill(), G.delete(t), !0) : !1;
}
Pe.setApplicationMenu(null);
const Se = r.dirname(Ce(import.meta.url));
process.env.APP_ROOT = r.join(Se, "..");
const le = process.env.VITE_DEV_SERVER_URL, Ve = r.join(process.env.APP_ROOT, "dist-electron"), je = r.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = le ? r.join(process.env.APP_ROOT, "public") : je;
let u = null;
const M = ae(), te = r.join(M, "accounts.json"), se = r.join(M, "instances.json"), de = r.join(M, "settings.json"), J = r.join(M, "skins");
n.existsSync(J) || n.mkdirSync(J, { recursive: !0 });
function fe(t, s) {
  try {
    if (n.existsSync(t))
      return JSON.parse(n.readFileSync(t, "utf-8"));
  } catch (e) {
    console.error(`Failed loading ${t}:`, e);
  }
  return s;
}
function R(t, s) {
  try {
    n.writeFileSync(t, JSON.stringify(s, null, 2), "utf-8");
  } catch (e) {
    console.error(`Failed saving ${t}:`, e);
  }
}
let x = fe(te, [
  { id: "1", username: "Test", uuid: V("Test"), type: "offline", isActive: !0, createdAt: Date.now() - 5e4 },
  { id: "2", username: "Nick 2", uuid: V("Nick 2"), type: "offline", isActive: !1, createdAt: Date.now() - 4e4 },
  { id: "3", username: "Nick 3", uuid: V("Nick 3"), type: "offline", isActive: !1, createdAt: Date.now() - 3e4 }
]), F = fe(se, [
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
]), p = fe(de, {
  javaPath: "",
  memoryMin: 1024,
  memoryMax: 4096,
  customJvmArgs: "",
  closeLauncherOnGameStart: !1,
  gameDir: M,
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
      preload: r.join(Se, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), u.webContents.on("did-finish-load", () => {
    u == null || u.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), le ? u.loadURL(le) : u.loadFile(r.join(je, "index.html"));
}
Z.on("window-all-closed", () => {
  process.platform !== "darwin" && (Z.quit(), u = null);
});
Z.on("activate", () => {
  xe.getAllWindows().length === 0 && $e();
});
function ue(t, s) {
  return new Promise((e, i) => {
    const a = r.dirname(s);
    n.existsSync(a) || n.mkdirSync(a, { recursive: !0 });
    const o = n.createWriteStream(s);
    (t.startsWith("https") ? ne : me).get(t, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), ue(c.headers.location, s).then(e).catch(i);
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
  f.handle("minimize-window", () => {
    u == null || u.minimize();
  }), f.handle("maximize-window", () => u ? u.isMaximized() ? (u.unmaximize(), !1) : (u.maximize(), !0) : !1), f.handle("close-window", () => {
    u == null || u.close();
  }), f.handle("is-maximized", () => (u == null ? void 0 : u.isMaximized()) || !1), f.handle("get-accounts", () => x), f.handle("add-account", (t, s) => {
    const e = s.trim();
    if (!e) throw new Error("Имя пользователя не может быть пустым");
    if (x.some((o) => o.username.toLowerCase() === e.toLowerCase()))
      throw new Error(`Никнейм "${e}" уже существует!`);
    const a = {
      id: Date.now().toString(),
      username: e,
      uuid: V(e),
      type: "offline",
      isActive: x.length === 0,
      createdAt: Date.now()
    };
    return x.push(a), R(te, x), x;
  }), f.handle("set-active-account", (t, s) => (x = x.map((e) => ({
    ...e,
    isActive: e.id === s
  })), R(te, x), x)), f.handle("delete-account", (t, s) => (x = x.filter((e) => e.id !== s), x.length > 0 && !x.some((e) => e.isActive) && (x[0].isActive = !0), R(te, x), x)), f.handle("get-instances", () => F), f.handle("create-instance", (t, s) => {
    const e = {
      id: "inst-" + Date.now(),
      name: s.version,
      version: s.version,
      loader: s.loader || "vanilla",
      created: Date.now(),
      memoryMin: p.memoryMin,
      memoryMax: p.memoryMax
    };
    F.push(e), R(se, F);
    const i = r.join(M, "instances", e.id), a = r.join(i, "mods");
    return n.existsSync(a) || n.mkdirSync(a, { recursive: !0 }), F;
  }), f.handle("delete-instance", (t, s) => {
    F = F.filter((i) => i.id !== s), R(se, F);
    const e = r.join(M, "instances", s);
    return n.existsSync(e) && n.rmSync(e, { recursive: !0, force: !0 }), F;
  }), f.handle("get-versions", async () => {
    try {
      return await ge();
    } catch (t) {
      return console.error("Failed to get versions:", t), { latest: { release: "1.20.4", snapshot: "1.20.4" }, versions: [] };
    }
  }), f.handle("get-settings", () => p), f.handle("save-settings", (t, s) => (p = { ...p, ...s }, R(de, p), p)), f.handle("detect-java", async () => await ce()), f.handle("launch-instance", async (t, s) => {
    const e = F.find((d) => d.id === s);
    if (!e) throw new Error("Инстанс не найден");
    const i = x.find((d) => d.isActive) || x[0];
    if (!i) throw new Error("Добавьте хотя бы один аккаунт!");
    e.lastPlayed = Date.now(), R(se, F);
    const a = e.javaPath || p.javaPath || (await ce())[0];
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
  }), f.handle("stop-instance", (t, s) => Fe(s)), f.handle("open-instance-folder", (t, s) => {
    const e = r.join(M, "instances", s);
    n.existsSync(e) || n.mkdirSync(e, { recursive: !0 }), Ie.openPath(e);
  }), f.handle("get-instance-mods", (t, s) => {
    const e = r.join(M, "instances", s, "mods");
    if (!n.existsSync(e)) return [];
    try {
      return n.readdirSync(e).map((a) => {
        const o = r.join(e, a), d = n.statSync(o), m = a.endsWith(".jar"), c = a.replace(/\.jar(\.disabled)?$/, "");
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
    const i = r.join(M, "instances", s, "mods"), a = r.join(i, e);
    if (!n.existsSync(a)) return !1;
    let o = e;
    e.endsWith(".jar") ? o = e + ".disabled" : e.endsWith(".jar.disabled") && (o = e.replace(/\.disabled$/, ""));
    const d = r.join(i, o);
    return n.renameSync(a, d), !0;
  }), f.handle("download-mod-file", async (t, { instanceId: s, downloadUrl: e, filename: i }) => {
    const a = r.join(M, "instances", s, "mods");
    n.existsSync(a) || n.mkdirSync(a, { recursive: !0 });
    const o = r.join(a, i);
    return await ue(e, o), !0;
  }), f.handle("add-mod-file", async (t, s) => {
    if (!u) return !1;
    const e = await re.showOpenDialog(u, {
      title: "Выберите файл мода (.jar)",
      filters: [{ name: "Minecraft Mods", extensions: ["jar"] }],
      properties: ["openFile", "multiSelections"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const i = r.join(M, "instances", s, "mods");
    n.existsSync(i) || n.mkdirSync(i, { recursive: !0 });
    for (const a of e.filePaths) {
      const o = r.join(i, r.basename(a));
      n.copyFileSync(a, o);
    }
    return !0;
  }), f.handle("save-user-skin", async (t, s) => {
    if (!u) return !1;
    const e = await re.showOpenDialog(u, {
      title: "Выберите файл скина Minecraft (.png)",
      filters: [{ name: "Minecraft Skins", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const i = r.join(J, `${s}.png`);
    return n.copyFileSync(e.filePaths[0], i), i;
  }), f.handle("fetch-online-skin", async (t, { username: s, targetUsername: e }) => {
    const i = r.join(J, `${s}.png`), a = [
      `https://ely.by/services/skins-buffer/skins/${encodeURIComponent(e)}.png`,
      `https://minotar.net/skin/${encodeURIComponent(e)}`,
      `https://crafatar.com/skins/${V(e)}`
    ];
    for (const o of a)
      try {
        if (await ue(o, i), n.existsSync(i) && n.statSync(i).size > 100)
          return `data:image/png;base64,${n.readFileSync(i).toString("base64")}`;
      } catch {
      }
    throw new Error(`Скин для никнейма "${e}" не найден на серверах`);
  }), f.handle("get-profile-stats", (t, s) => {
    let e = 0;
    const i = [];
    let a = "Нет информации", o = "Нет информации", d = 0, m = 0;
    try {
      for (const h of F) {
        h.lastPlayed && (m = Math.max(m, h.lastPlayed), d += 45);
        const I = r.join(M, "instances", h.id, "saves");
        if (n.existsSync(I)) {
          const v = n.readdirSync(I);
          for (const $ of v)
            n.statSync(r.join(I, $)).isDirectory() && (e++, i.push($));
        }
      }
      i.length > 0 && (a = i[0]);
    } catch {
    }
    const c = x.find((h) => h.username === s) || x.find((h) => h.isActive) || x[0], S = (d / 60).toFixed(1), P = m ? new Date(m).toLocaleString() : "Нет информации";
    return {
      username: c ? c.username : s,
      uuid: c ? c.uuid : "",
      worldsCount: e,
      totalPlayTimeHours: d > 0 ? `${S} ч.` : "Нет информации",
      lastPlayedFormatted: P,
      favoriteWorld: a,
      favoriteServer: o
    };
  }), f.handle("get-user-skin", (t, s) => {
    const e = r.join(J, `${s}.png`);
    return n.existsSync(e) ? `data:image/png;base64,${n.readFileSync(e).toString("base64")}` : null;
  }), f.handle("upload-user-skin", async (t, s) => {
    const { canceled: e, filePaths: i } = await re.showOpenDialog({
      title: "Выберите скин Minecraft (.png)",
      properties: ["openFile"],
      filters: [{ name: "Minecraft Skin (*.png)", extensions: ["png"] }]
    });
    if (!e && i.length > 0) {
      n.existsSync(J) || n.mkdirSync(J, { recursive: !0 });
      const a = r.join(J, `${s}.png`);
      return n.copyFileSync(i[0], a), `data:image/png;base64,${n.readFileSync(a).toString("base64")}`;
    }
    return null;
  }), f.handle("set-selected-instance-id", (t, s) => (p = { ...p, selectedInstanceId: s }, R(de, p), p)), f.handle("parse-command-skin", async (t, s) => {
    var S, P, h, I;
    const { username: e, command: i } = s;
    let a = "";
    const o = i.match(/e3RleHR1[A-Za-z0-9+/=]+/);
    if (o)
      try {
        const v = Buffer.from(o[0], "base64").toString("utf-8"), $ = JSON.parse(v);
        (P = (S = $ == null ? void 0 : $.textures) == null ? void 0 : S.SKIN) != null && P.url && (a = $.textures.SKIN.url);
      } catch {
      }
    if (!a) {
      const v = i.match(/value[:=]\s*["']?([^"'\]}]+)["']?/i);
      if (v && v[1])
        try {
          const $ = Buffer.from(v[1], "base64").toString("utf-8"), A = JSON.parse($);
          (I = (h = A == null ? void 0 : A.textures) == null ? void 0 : h.SKIN) != null && I.url && (a = A.textures.SKIN.url);
        } catch {
        }
    }
    if (!a) {
      const v = i.match(/(https?:\/\/textures\.minecraft\.net\/texture\/[a-f0-9]+)/i);
      v && (a = v[1]);
    }
    if (!a) {
      const v = i.match(/namemc\.com\/skin\/([a-f0-9]+)/i);
      v && v[1] && (a = `https://textures.minecraft.net/texture/${v[1]}`);
    }
    if (!a)
      throw new Error("Не удалось спарсить скин из команды. Убедитесь, что передан валидный /give или ссылка.");
    a.startsWith("http://") && (a = a.replace("http://", "https://"));
    const d = (v) => new Promise(($, A) => {
      ne.get(v, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
          Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8"
        }
      }, (C) => {
        if (C.statusCode && C.statusCode >= 300 && C.statusCode < 400 && C.headers.location)
          return d(C.headers.location).then($).catch(A);
        if (C.statusCode !== 200)
          return A(new Error(`HTTP ${C.statusCode}`));
        const X = [];
        C.on("data", (Y) => X.push(Y)), C.on("end", () => $(Buffer.concat(X))), C.on("error", A);
      }).on("error", A);
    }), m = await d(a);
    n.existsSync(J) || n.mkdirSync(J, { recursive: !0 });
    const c = r.join(J, `${e}.png`);
    return n.writeFileSync(c, m), `data:image/png;base64,${m.toString("base64")}`;
  });
}
Z.whenReady().then(() => {
  Je(), $e();
});
export {
  Ve as MAIN_DIST,
  je as RENDERER_DIST,
  le as VITE_DEV_SERVER_URL
};
