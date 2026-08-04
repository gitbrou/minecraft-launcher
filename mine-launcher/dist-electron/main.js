import { app as L, Menu as Ie, BrowserWindow as xe, ipcMain as m, shell as ke, dialog as se } from "electron";
import { fileURLToPath as Ce } from "node:url";
import r from "node:path";
import s from "node:fs";
import Q from "node:https";
import ee from "node:http";
import _e from "node:crypto";
import { execSync as G, spawn as Me } from "node:child_process";
const B = /* @__PURE__ */ new Map();
function te() {
  const t = L.getPath("userData"), n = r.join(t, ".mine-launcher");
  return s.existsSync(n) || s.mkdirSync(n, { recursive: !0 }), n;
}
function z(t) {
  const n = _e.createHash("md5");
  n.update(`OfflinePlayer:${t}`);
  const e = n.digest();
  e[6] = e[6] & 15 | 48, e[8] = e[8] & 63 | 128;
  const i = e.toString("hex");
  return `${i.slice(0, 8)}-${i.slice(8, 12)}-${i.slice(12, 16)}-${i.slice(16, 20)}-${i.slice(20, 32)}`;
}
function K(t) {
  return new Promise((n, e) => {
    (t.startsWith("https") ? Q : ee).get(t, (a) => {
      if (a.statusCode && a.statusCode >= 300 && a.statusCode < 400 && a.headers.location)
        return K(a.headers.location).then(n).catch(e);
      if (a.statusCode !== 200)
        return e(new Error(`HTTP ${a.statusCode} loading ${t}`));
      let o = "";
      a.on("data", (d) => {
        o += d;
      }), a.on("end", () => {
        try {
          n(JSON.parse(o));
        } catch (d) {
          e(d);
        }
      });
    }).on("error", e);
  });
}
function J(t, n) {
  return new Promise((e, i) => {
    const a = r.dirname(n);
    s.existsSync(a) || s.mkdirSync(a, { recursive: !0 });
    const o = s.createWriteStream(n);
    (t.startsWith("https") ? Q : ee).get(t, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), J(c.headers.location, n).then(e).catch(i);
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
function ae(t, n) {
  if (s.existsSync(t))
    try {
      const e = `powershell -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::OpenRead('${t.replace(/'/g, "''")}').Entries | Where-Object { $_.FullName -like '*.dll' } | ForEach-Object { $dest = [System.IO.Path]::Combine('${n.replace(/'/g, "''")}', $_.Name); [System.IO.Compression.ZipFileExtensions]::ExtractToFile($_, $dest, $true) }"`;
      G(e, { stdio: "ignore" });
    } catch {
      try {
        G(`powershell -Command "Expand-Archive -Path '${t}' -DestinationPath '${n}' -Force"`, { stdio: "ignore" });
      } catch {
      }
    }
}
function Ae(t) {
  if (!t || t.length === 0) return !0;
  let n = !1;
  for (const e of t)
    e.action === "allow" ? (!e.os || e.os.name === "windows") && (n = !0) : e.action === "disallow" && (!e.os || e.os.name === "windows") && (n = !1);
  return n;
}
async function ie() {
  const t = [], n = process.platform === "win32", e = n ? "javaw.exe" : "java", i = te(), a = r.join(i, "java", "java-17"), o = (f) => {
    if (!s.existsSync(f)) return null;
    const c = s.readdirSync(f);
    for (const p of c) {
      const S = r.join(f, p);
      if (p.toLowerCase() === "javaw.exe") return S;
      if (s.statSync(S).isDirectory()) {
        const y = o(S);
        if (y) return y;
      }
    }
    return null;
  }, d = o(a);
  if (d && t.push(d), process.env.JAVA_HOME) {
    const f = r.join(process.env.JAVA_HOME, "bin", e);
    s.existsSync(f) && t.push(f);
  }
  if (n) {
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
      if (s.existsSync(c))
        try {
          const p = s.readdirSync(c);
          for (const S of p) {
            const y = r.join(c, S, "bin", e);
            s.existsSync(y) && !t.includes(y) && t.push(y);
          }
        } catch {
        }
  }
  return t;
}
async function Te(t, n) {
  const e = te(), i = r.join(e, "java", "java-17"), a = (p) => {
    if (!s.existsSync(p)) return null;
    const S = s.readdirSync(p);
    for (const y of S) {
      const v = r.join(p, y);
      if (y.toLowerCase() === "javaw.exe") return v;
      if (s.statSync(v).isDirectory()) {
        const M = a(v);
        if (M) return M;
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
  const d = "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.10%2B7/OpenJDK17U-jre_x64_windows_hotspot_17.0.10_7.zip", f = r.join(e, "java", "java-17.zip");
  s.existsSync(r.dirname(f)) || s.mkdirSync(r.dirname(f), { recursive: !0 }), t({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: "Загрузка OpenJDK Java 17 (40 MB)...",
    progress: 35
  }), await J(d, f), t({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: "Распаковка Java 17 Runtime...",
    progress: 75
  }), n({ timestamp: Date.now(), type: "info", message: "Распаковка архива Java 17..." }), s.existsSync(i) || s.mkdirSync(i, { recursive: !0 });
  try {
    G(`powershell -Command "Expand-Archive -Path '${f}' -DestinationPath '${i}' -Force"`), s.unlinkSync(f);
  } catch (p) {
    n({ timestamp: Date.now(), type: "warn", message: `Ошибка PowerShell распаковки: ${p.message}` });
  }
  const c = a(i);
  if (!c)
    throw new Error("Не удалось найти javaw.exe после распаковки Java 17. Установите Java вручную.");
  return n({ timestamp: Date.now(), type: "info", message: `Java 17 успешно установлена: ${c}` }), c;
}
async function Se() {
  return await K("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function Fe(t, n, e) {
  var v, M, $, ue, me, fe, pe, he;
  const i = te(), a = r.join(i, "instances", t.instanceId), o = r.join(i, "assets"), d = r.join(i, "libraries"), f = r.join(i, "versions"), c = r.join(a, "natives");
  s.existsSync(a) || s.mkdirSync(a, { recursive: !0 }), s.existsSync(c) || s.mkdirSync(c, { recursive: !0 });
  const p = r.join(a, "options.txt");
  s.writeFileSync(p, `version:2586
chatVisibility:0
forceUnicodeFont:false
realmsNotifications:false
hideServerAddress:false
`, "utf-8");
  const y = r.join(a, ".fabric");
  if (s.existsSync(y))
    try {
      const b = (N) => {
        const ye = s.readdirSync(N);
        for (const U of ye) {
          const R = r.join(N, U);
          s.statSync(R).isDirectory() ? b(R) : U.endsWith(".tmp") && s.unlinkSync(R);
        }
      };
      b(y);
    } catch {
    }
  try {
    let b = t.javaPath, N = !1;
    if (b && s.existsSync(b))
      try {
        G(`"${b}" -version 2>&1`), N = !0;
      } catch {
      }
    if (!N) {
      const l = await ie();
      for (const g of l)
        if (s.existsSync(g))
          try {
            G(`"${g}" -version 2>&1`), b = g, N = !0;
            break;
          } catch {
          }
    }
    N || (b = await Te(n, e)), e({
      timestamp: Date.now(),
      type: "info",
      message: `Используемый файл Java: ${b}`
    }), n({
      instanceId: t.instanceId,
      stage: "checking",
      statusText: "Получение манифеста версий...",
      progress: 10
    });
    const U = (await Se()).versions.find((l) => l.id === t.version);
    if (!U)
      throw new Error(`Версия Minecraft ${t.version} не найдена в манифесте Mojang`);
    n({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: `Загрузка структуры версии ${t.version}...`,
      progress: 20
    });
    const R = r.join(f, t.version, `${t.version}.json`), k = await K(U.url);
    if (s.existsSync(r.dirname(R)) || s.mkdirSync(r.dirname(R), { recursive: !0 }), s.writeFileSync(R, JSON.stringify(k, null, 2)), (v = k.assetIndex) != null && v.url) {
      const l = r.join(o, "indexes"), g = r.join(l, `${k.assetIndex.id}.json`);
      s.existsSync(g) || (n({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Загрузка манифеста ресурсов...",
        progress: 25
      }), await J(k.assetIndex.url, g));
      try {
        const A = JSON.parse(s.readFileSync(g, "utf-8")).objects || {}, C = Object.keys(A), H = r.join(o, "objects"), D = [];
        for (const F of C) {
          const P = A[F].hash, W = P.slice(0, 2), q = r.join(H, W, P);
          s.existsSync(q) || D.push({
            hash: P,
            url: `https://resources.download.minecraft.net/${W}/${P}`,
            dest: q
          });
        }
        if (D.length > 0) {
          n({
            instanceId: t.instanceId,
            stage: "downloading",
            statusText: `Загрузка ресурсов (${D.length} файлов)...`,
            progress: 30
          });
          const F = 75;
          let O = 0;
          for (let P = 0; P < D.length; P += F) {
            const W = D.slice(P, P + F);
            await Promise.all(
              W.map((ge) => J(ge.url, ge.dest).catch(() => {
              }))
            ), O += W.length;
            const q = Math.round(30 + O / D.length * 15);
            n({
              instanceId: t.instanceId,
              stage: "downloading",
              statusText: `Загрузка ресурсов (${O}/${D.length})...`,
              progress: q
            });
          }
        }
      } catch (j) {
        e({ timestamp: Date.now(), type: "warn", message: `Ошибка ресурсов: ${j.message}` });
      }
    }
    const ne = r.join(f, t.version, `${t.version}.jar`);
    !s.existsSync(ne) && (($ = (M = k.downloads) == null ? void 0 : M.client) != null && $.url) && (n({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка Minecraft client.jar...",
      progress: 50
    }), await J(k.downloads.client.url, ne)), n({
      instanceId: t.instanceId,
      stage: "downloading",
      statusText: "Загрузка и распаковка библиотек...",
      progress: 60
    });
    const V = [], be = k.libraries || [];
    for (const l of be)
      if (Ae(l.rules)) {
        if ((ue = l.downloads) != null && ue.artifact) {
          const g = l.downloads.artifact.path, j = r.join(d, g);
          if (!s.existsSync(j))
            try {
              await J(l.downloads.artifact.url, j);
            } catch {
            }
          s.existsSync(j) && (V.push(j), (g.includes("natives") || l.name.includes("natives")) && ae(j, c));
        }
        if ((me = l.downloads) != null && me.classifiers) {
          const g = l.downloads.classifiers, j = g["natives-windows"] || g["natives-windows-64"] || g["natives-windows-x86"];
          if (j) {
            const A = j.path, C = r.join(d, A);
            if (!s.existsSync(C))
              try {
                await J(j.url, C);
              } catch {
              }
            s.existsSync(C) && ae(C, c);
          }
        }
        if (!((fe = l.downloads) != null && fe.artifact) && l.name) {
          const g = l.name.split(":"), j = g[0].replace(/\./g, "/"), A = g[1], C = g[2], H = `${j}/${A}/${C}/${A}-${C}.jar`, D = r.join(d, H), F = l.url ? `${l.url}${H}` : `https://libraries.minecraft.net/${H}`;
          if (!s.existsSync(D))
            try {
              await J(F, D);
            } catch {
            }
          s.existsSync(D) && (V.push(D), l.name.includes("natives") && ae(D, c));
        }
      }
    V.push(ne);
    let ve = k.mainClass || "net.minecraft.client.main.Main";
    if (t.loader === "fabric") {
      n({
        instanceId: t.instanceId,
        stage: "downloading",
        statusText: "Настройка Fabric...",
        progress: 75
      });
      try {
        const l = await K(`https://meta.fabricmc.net/v2/versions/loader/${t.version}`);
        if (l && l.length > 0) {
          const g = l[0].loader.version, j = await K(`https://meta.fabricmc.net/v2/versions/loader/${t.version}/${g}/profile/json`);
          if (j.mainClass && (ve = j.mainClass), j.libraries)
            for (const A of j.libraries) {
              const C = A.name.split(":"), H = C[0].replace(/\./g, "/"), D = C[1], F = C[2], O = `${H}/${D}/${F}/${D}-${F}.jar`, P = r.join(d, O), W = A.url ? `${A.url}${O}` : `https://maven.fabricmc.net/${O}`;
              if (!s.existsSync(P))
                try {
                  await J(W, P);
                } catch {
                }
              s.existsSync(P) && V.unshift(P);
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
    const Pe = V.join(r.delimiter), w = [];
    w.push(`-Xms${t.memoryMin || 1024}M`), w.push(`-Xmx${t.memoryMax || 4096}M`), w.push(`-Djava.library.path=${c}`), w.push("-Dminecraft.api.auth.host=http://127.0.0.1"), w.push("-Dminecraft.api.account.host=http://127.0.0.1"), w.push("-Dminecraft.api.session.host=http://127.0.0.1"), w.push("-Dminecraft.api.services.host=http://127.0.0.1"), w.push("-XX:+UseG1GC", "-XX:+UnlockExperimentalVMOptions", "-XX:G1NewSizePercent=20", "-XX:G1ReservePercent=20", "-XX:MaxGCPauseMillis=50", "-XX:G1HeapRegionSize=32M"), t.customJvmArgs && w.push(...t.customJvmArgs.split(" ").filter(Boolean)), w.push("-cp", Pe), w.push(ve);
    const we = (t.uuid || z(t.username || "Player")).replace(/-/g, "");
    if (k.minecraftArguments && typeof k.minecraftArguments == "string") {
      const l = k.minecraftArguments.split(" ");
      for (const g of l) {
        let j = g.replace("${auth_player_name}", t.username || "Player").replace("${version_name}", t.version).replace("${game_directory}", a).replace("${assets_root}", o).replace("${assets_index_name}", ((pe = k.assetIndex) == null ? void 0 : pe.id) || t.version).replace("${auth_uuid}", we).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", "release");
        w.push(j);
      }
    } else
      w.push("--username", t.username || "Player"), w.push("--version", t.version), w.push("--gameDir", a), w.push("--assetsDir", o), w.push("--assetIndex", ((he = k.assetIndex) == null ? void 0 : he.id) || t.version), w.push("--uuid", we), w.push("--accessToken", "0"), w.push("--userType", "mojang"), w.push("--versionType", "release");
    e({
      timestamp: Date.now(),
      type: "info",
      message: `Команда запуска: "${b}" ${w.join(" ")}`
    });
    const X = Me(b || "javaw", w, {
      cwd: a,
      detached: !0
    });
    B.set(t.instanceId, X), X.stdout.on("data", (l) => {
      e({ timestamp: Date.now(), type: "info", message: l.toString() });
    }), X.stderr.on("data", (l) => {
      e({ timestamp: Date.now(), type: "warn", message: l.toString() });
    }), X.on("error", (l) => {
      B.delete(t.instanceId), n({
        instanceId: t.instanceId,
        stage: "error",
        statusText: `Ошибка процесса: ${l.message}`,
        progress: 0,
        error: l.message
      }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${l.message}` });
    }), X.on("exit", (l) => {
      B.delete(t.instanceId), n({
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
  } catch (b) {
    n({
      instanceId: t.instanceId,
      stage: "error",
      statusText: `Ошибка: ${b.message}`,
      progress: 0,
      error: b.message
    }), e({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${b.message}` });
  }
}
function Je(t) {
  const n = B.get(t);
  return n ? (n.kill(), B.delete(t), !0) : !1;
}
Ie.setApplicationMenu(null);
const je = r.dirname(Ce(import.meta.url));
process.env.APP_ROOT = r.join(je, "..");
const re = process.env.VITE_DEV_SERVER_URL, Xe = r.join(process.env.APP_ROOT, "dist-electron"), $e = r.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = re ? r.join(process.env.APP_ROOT, "public") : $e;
let u = null;
const _ = te(), Z = r.join(_, "accounts.json"), Y = r.join(_, "instances.json"), oe = r.join(_, "settings.json"), I = r.join(_, "skins");
s.existsSync(I) || s.mkdirSync(I, { recursive: !0 });
function de(t, n) {
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
let x = de(Z, [
  { id: "1", username: "Test", uuid: z("Test"), type: "offline", isActive: !0, createdAt: Date.now() - 5e4 },
  { id: "2", username: "Nick 2", uuid: z("Nick 2"), type: "offline", isActive: !1, createdAt: Date.now() - 4e4 },
  { id: "3", username: "Nick 3", uuid: z("Nick 3"), type: "offline", isActive: !1, createdAt: Date.now() - 3e4 }
]), T = de(Y, [
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
]), h = de(oe, {
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
function De() {
  u = new xe({
    width: 1050,
    height: 720,
    minWidth: 900,
    minHeight: 650,
    frame: !1,
    titleBarStyle: "hidden",
    icon: r.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: r.join(je, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), u.webContents.on("did-finish-load", () => {
    u == null || u.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), re ? u.loadURL(re) : u.loadFile(r.join($e, "index.html"));
}
L.on("window-all-closed", () => {
  process.platform !== "darwin" && (L.quit(), u = null);
});
L.on("activate", () => {
  xe.getAllWindows().length === 0 && De();
});
function ce(t, n) {
  return new Promise((e, i) => {
    const a = r.dirname(n);
    s.existsSync(a) || s.mkdirSync(a, { recursive: !0 });
    const o = s.createWriteStream(n);
    (t.startsWith("https") ? Q : ee).get(t, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), ce(c.headers.location, n).then(e).catch(i);
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
function le(t) {
  return new Promise((n, e) => {
    (t.startsWith("https") ? Q : ee).get(t, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
      }
    }, (a) => {
      if (a.statusCode && a.statusCode >= 300 && a.statusCode < 400 && a.headers.location)
        return le(a.headers.location).then(n).catch(e);
      if (a.statusCode !== 200)
        return e(new Error(`HTTP ${a.statusCode}`));
      const o = [];
      a.on("data", (d) => o.push(d)), a.on("end", () => n(Buffer.concat(o))), a.on("error", e);
    }).on("error", e);
  });
}
function Oe() {
  m.handle("minimize-window", () => {
    u == null || u.minimize();
  }), m.handle("maximize-window", () => u ? u.isMaximized() ? (u.unmaximize(), !1) : (u.maximize(), !0) : !1), m.handle("close-window", () => {
    u == null || u.close();
  }), m.handle("is-maximized", () => (u == null ? void 0 : u.isMaximized()) || !1), m.handle("get-accounts", () => x), m.handle("add-account", (t, n) => {
    const e = n.trim();
    if (!e) throw new Error("Имя пользователя не может быть пустым");
    if (x.some((o) => o.username.toLowerCase() === e.toLowerCase()))
      throw new Error(`Никнейм "${e}" уже существует!`);
    const a = {
      id: Date.now().toString(),
      username: e,
      uuid: z(e),
      type: "offline",
      isActive: x.length === 0,
      createdAt: Date.now()
    };
    return x.push(a), E(Z, x), x;
  }), m.handle("set-active-account", (t, n) => (x = x.map((e) => ({
    ...e,
    isActive: e.id === n
  })), E(Z, x), x)), m.handle("delete-account", (t, n) => (x = x.filter((e) => e.id !== n), x.length > 0 && !x.some((e) => e.isActive) && (x[0].isActive = !0), E(Z, x), x)), m.handle("get-instances", () => T), m.handle("create-instance", (t, n) => {
    const e = {
      id: "inst-" + Date.now(),
      name: n.version,
      version: n.version,
      loader: n.loader || "vanilla",
      created: Date.now(),
      memoryMin: h.memoryMin,
      memoryMax: h.memoryMax
    };
    T.push(e), E(Y, T);
    const i = r.join(_, "instances", e.id), a = r.join(i, "mods");
    return s.existsSync(a) || s.mkdirSync(a, { recursive: !0 }), T;
  }), m.handle("delete-instance", (t, n) => {
    T = T.filter((i) => i.id !== n), E(Y, T);
    const e = r.join(_, "instances", n);
    return s.existsSync(e) && s.rmSync(e, { recursive: !0, force: !0 }), T;
  }), m.handle("get-versions", async () => {
    try {
      return await Se();
    } catch (t) {
      return console.error("Failed to get versions:", t), { latest: { release: "1.20.4", snapshot: "1.20.4" }, versions: [] };
    }
  }), m.handle("get-settings", () => h), m.handle("save-settings", (t, n) => (h = { ...h, ...n }, E(oe, h), h)), m.handle("detect-java", async () => await ie()), m.handle("launch-instance", async (t, n) => {
    const e = T.find((d) => d.id === n);
    if (!e) throw new Error("Инстанс не найден");
    const i = x.find((d) => d.isActive) || x[0];
    if (!i) throw new Error("Добавьте хотя бы один аккаунт!");
    e.lastPlayed = Date.now(), E(Y, T);
    const a = e.javaPath || h.javaPath || (await ie())[0];
    let o = e.jvmArgs || h.customJvmArgs || "";
    return h.useProxy && h.proxyHost && h.proxyPort && (h.proxyType === "socks5" ? o += ` -DsocksProxyHost=${h.proxyHost} -DsocksProxyPort=${h.proxyPort}` : o += ` -Dhttp.proxyHost=${h.proxyHost} -Dhttp.proxyPort=${h.proxyPort} -Dhttps.proxyHost=${h.proxyHost} -Dhttps.proxyPort=${h.proxyPort}`), Fe(
      {
        instanceId: e.id,
        instanceName: e.name,
        version: e.version,
        loader: e.loader || "vanilla",
        username: i.username,
        uuid: i.uuid,
        memoryMin: e.memoryMin || h.memoryMin || 1024,
        memoryMax: e.memoryMax || h.memoryMax || 4096,
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
  }), m.handle("stop-instance", (t, n) => Je(n)), m.handle("open-instance-folder", (t, n) => {
    const e = r.join(_, "instances", n);
    s.existsSync(e) || s.mkdirSync(e, { recursive: !0 }), ke.openPath(e);
  }), m.handle("get-instance-mods", (t, n) => {
    const e = r.join(_, "instances", n, "mods");
    if (!s.existsSync(e)) return [];
    try {
      return s.readdirSync(e).map((a) => {
        const o = r.join(e, a), d = s.statSync(o), f = a.endsWith(".jar"), c = a.replace(/\.jar(\.disabled)?$/, "");
        let p = "";
        const S = c.toLowerCase();
        return S.includes("iris") ? p = "https://cdn.modrinth.com/data/YL57xq9U/a14589d8164bdf6933bbec92c3008061dfcceecb.png" : S.includes("sodium") ? p = "https://cdn.modrinth.com/data/AANobbFp/d3f0a5015e1a1415df22fa2ff07b46ff4be9cfd8.png" : S.includes("optifine") ? p = "https://optifine.net/favicon.ico" : S.includes("fabric") ? p = "https://cdn.modrinth.com/data/P7Rstage/icon.png" : S.includes("lithium") ? p = "https://cdn.modrinth.com/data/gv2qrgfy/icon.png" : S.includes("indium") ? p = "https://cdn.modrinth.com/data/OradFiWy/icon.png" : S.includes("ferrite") && (p = "https://cdn.modrinth.com/data/u6uhacGG/icon.png"), {
          id: a,
          filename: a,
          name: c,
          enabled: f,
          size: d.size,
          iconUrl: p
        };
      });
    } catch {
      return [];
    }
  }), m.handle("toggle-mod", (t, { instanceId: n, modFilename: e }) => {
    const i = r.join(_, "instances", n, "mods"), a = r.join(i, e);
    if (!s.existsSync(a)) return !1;
    let o = e;
    e.endsWith(".jar") ? o = e + ".disabled" : e.endsWith(".jar.disabled") && (o = e.replace(/\.disabled$/, ""));
    const d = r.join(i, o);
    return s.renameSync(a, d), !0;
  }), m.handle("download-mod-file", async (t, { instanceId: n, downloadUrl: e, filename: i }) => {
    const a = r.join(_, "instances", n, "mods");
    s.existsSync(a) || s.mkdirSync(a, { recursive: !0 });
    const o = r.join(a, i);
    return await ce(e, o), !0;
  }), m.handle("add-mod-file", async (t, n) => {
    if (!u) return !1;
    const e = await se.showOpenDialog(u, {
      title: "Выберите файл мода (.jar)",
      filters: [{ name: "Minecraft Mods", extensions: ["jar"] }],
      properties: ["openFile", "multiSelections"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const i = r.join(_, "instances", n, "mods");
    s.existsSync(i) || s.mkdirSync(i, { recursive: !0 });
    for (const a of e.filePaths) {
      const o = r.join(i, r.basename(a));
      s.copyFileSync(a, o);
    }
    return !0;
  }), m.handle("save-user-skin", async (t, n) => {
    if (!u) return !1;
    const e = await se.showOpenDialog(u, {
      title: "Выберите файл скина Minecraft (.png)",
      filters: [{ name: "Minecraft Skins", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (e.canceled || !e.filePaths.length) return !1;
    const i = r.join(I, `${n}.png`);
    return s.copyFileSync(e.filePaths[0], i), i;
  }), m.handle("fetch-online-skin", async (t, { username: n, targetUsername: e }) => {
    const i = r.join(I, `${n}.png`), a = [
      `https://ely.by/services/skins-buffer/skins/${encodeURIComponent(e)}.png`,
      `https://minotar.net/skin/${encodeURIComponent(e)}`,
      `https://crafatar.com/skins/${z(e)}`
    ];
    for (const o of a)
      try {
        if (await ce(o, i), s.existsSync(i) && s.statSync(i).size > 100)
          return `data:image/png;base64,${s.readFileSync(i).toString("base64")}`;
      } catch {
      }
    throw new Error(`Скин для никнейма "${e}" не найден на серверах`);
  }), m.handle("get-profile-stats", (t, n) => {
    let e = 0;
    const i = [];
    let a = "Нет информации", o = "Нет информации", d = 0, f = 0;
    try {
      for (const y of T) {
        y.lastPlayed && (f = Math.max(f, y.lastPlayed), d += 45);
        const v = r.join(_, "instances", y.id, "saves");
        if (s.existsSync(v)) {
          const M = s.readdirSync(v);
          for (const $ of M)
            s.statSync(r.join(v, $)).isDirectory() && (e++, i.push($));
        }
      }
      i.length > 0 && (a = i[0]);
    } catch {
    }
    const c = x.find((y) => y.username === n) || x.find((y) => y.isActive) || x[0], p = (d / 60).toFixed(1), S = f ? new Date(f).toLocaleString() : "Нет информации";
    return {
      username: c ? c.username : n,
      uuid: c ? c.uuid : "",
      worldsCount: e,
      totalPlayTimeHours: d > 0 ? `${p} ч.` : "Нет информации",
      lastPlayedFormatted: S,
      favoriteWorld: a,
      favoriteServer: o
    };
  }), m.handle("get-user-skin", (t, n) => {
    const e = r.join(I, `${n}.png`);
    return s.existsSync(e) ? `data:image/png;base64,${s.readFileSync(e).toString("base64")}` : null;
  }), m.handle("set-selected-instance-id", (t, n) => (h = { ...h, selectedInstanceId: n }, E(oe, h), h)), m.handle("save-user-skin-base64", (t, { username: n, base64Data: e }) => {
    try {
      s.existsSync(I) || s.mkdirSync(I, { recursive: !0 });
      const i = e.replace(/^data:image\/png;base64,/, ""), a = Buffer.from(i, "base64"), o = r.join(I, `${n}.png`);
      return s.writeFileSync(o, a), !0;
    } catch (i) {
      return console.error("Failed saving user skin base64:", i), !1;
    }
  }), m.handle("upload-user-skin", async (t, n) => {
    const { canceled: e, filePaths: i } = await se.showOpenDialog({
      title: "Выберите скин Minecraft (.png)",
      properties: ["openFile"],
      filters: [{ name: "Minecraft Skin (*.png)", extensions: ["png"] }]
    });
    if (!e && i.length > 0) {
      s.existsSync(I) || s.mkdirSync(I, { recursive: !0 });
      const a = r.join(I, `${n}.png`);
      return s.copyFileSync(i[0], a), `data:image/png;base64,${s.readFileSync(a).toString("base64")}`;
    }
    return null;
  }), m.handle("parse-command-skin", async (t, n) => {
    var c, p, S, y;
    const { username: e, command: i } = n;
    let a = "";
    const o = i.match(/(?:e3RleHR1|eyJ0ZXh0)[A-Za-z0-9+/=]+/g);
    if (o && o.length > 0)
      for (const v of o)
        try {
          const M = Buffer.from(v, "base64").toString("utf-8"), $ = JSON.parse(M);
          if ((p = (c = $ == null ? void 0 : $.textures) == null ? void 0 : c.SKIN) != null && p.url) {
            a = $.textures.SKIN.url;
            break;
          }
        } catch {
        }
    if (!a) {
      const v = i.match(/value[:=]\s*["']?([^"'\]}\s]+)["']?/i);
      if (v && v[1])
        try {
          const M = Buffer.from(v[1], "base64").toString("utf-8"), $ = JSON.parse(M);
          (y = (S = $ == null ? void 0 : $.textures) == null ? void 0 : S.SKIN) != null && y.url && (a = $.textures.SKIN.url);
        } catch {
        }
    }
    if (!a) {
      const v = i.match(/(https?:\/\/textures\.minecraft\.net\/texture\/[a-f0-9]+)/i);
      v && (a = v[1]);
    }
    if (!a) {
      const v = i.match(/namemc\.com\/skin\/([a-f0-9]+)/i);
      if (v && v[1])
        try {
          const $ = (await le(`https://namemc.com/skin/${v[1]}`)).toString("utf-8").match(/(https?:\/\/textures\.minecraft\.net\/texture\/[a-f0-9]+)/i);
          $ && (a = $[1]);
        } catch {
        }
    }
    if (!a)
      throw new Error("Не удалось найти текстуру скина в команде. Убедитесь, что передан валидный /give или ссылка.");
    a.startsWith("http://") && (a = a.replace("http://", "https://"));
    const d = await le(a);
    s.existsSync(I) || s.mkdirSync(I, { recursive: !0 });
    const f = r.join(I, `${e}.png`);
    return s.writeFileSync(f, d), `data:image/png;base64,${d.toString("base64")}`;
  });
}
L.whenReady().then(() => {
  Oe(), De();
});
export {
  Xe as MAIN_DIST,
  $e as RENDERER_DIST,
  re as VITE_DEV_SERVER_URL
};
