import Kt, { app as xn, Menu as Zd, BrowserWindow as Ec, ipcMain as se, shell as eh, dialog as fo } from "electron";
import _i from "events";
import hr from "crypto";
import wc from "tty";
import Cn from "util";
import xi from "os";
import tt from "fs";
import nt from "stream";
import $n from "url";
import th from "constants";
import vc from "assert";
import ue from "path";
import bi from "child_process";
import ps from "zlib";
import nh from "http";
import { fileURLToPath as rh } from "node:url";
import B from "node:path";
import F from "node:fs";
import Si from "node:https";
import Ai from "node:http";
import ih from "node:crypto";
import { execSync as qo, spawn as oh } from "node:child_process";
import _c from "buffer";
var ze = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function sh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ho = {}, _e = {}, Pt = {};
Object.defineProperty(Pt, "__esModule", { value: !0 });
Pt.CancellationError = Pt.CancellationToken = void 0;
const ah = _i;
class lh extends ah.EventEmitter {
  get cancelled() {
    return this._cancelled || this._parent != null && this._parent.cancelled;
  }
  set parent(t) {
    this.removeParentCancelHandler(), this._parent = t, this.parentCancelHandler = () => this.cancel(), this._parent.onCancel(this.parentCancelHandler);
  }
  // babel cannot compile ... correctly for super calls
  constructor(t) {
    super(), this.parentCancelHandler = null, this._parent = null, this._cancelled = !1, t != null && (this.parent = t);
  }
  cancel() {
    this._cancelled = !0, this.emit("cancel");
  }
  onCancel(t) {
    this.cancelled ? t() : this.once("cancel", t);
  }
  createPromise(t) {
    if (this.cancelled)
      return Promise.reject(new Go());
    const n = () => {
      if (r != null)
        try {
          this.removeListener("cancel", r), r = null;
        } catch {
        }
    };
    let r = null;
    return new Promise((i, o) => {
      let s = null;
      if (r = () => {
        try {
          s != null && (s(), s = null);
        } finally {
          o(new Go());
        }
      }, this.cancelled) {
        r();
        return;
      }
      this.onCancel(r), t(i, o, (a) => {
        s = a;
      });
    }).then((i) => (n(), i)).catch((i) => {
      throw n(), i;
    });
  }
  removeParentCancelHandler() {
    const t = this._parent;
    t != null && this.parentCancelHandler != null && (t.removeListener("cancel", this.parentCancelHandler), this.parentCancelHandler = null);
  }
  dispose() {
    try {
      this.removeParentCancelHandler();
    } finally {
      this.removeAllListeners(), this._parent = null;
    }
  }
}
Pt.CancellationToken = lh;
class Go extends Error {
  constructor() {
    super("cancelled");
  }
}
Pt.CancellationError = Go;
var Pe = {}, zo = { exports: {} }, kr = { exports: {} }, po, wa;
function ch() {
  if (wa) return po;
  wa = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, i = r * 7, o = r * 365.25;
  po = function(c, u) {
    u = u || {};
    var d = typeof c;
    if (d === "string" && c.length > 0)
      return s(c);
    if (d === "number" && isFinite(c))
      return u.long ? l(c) : a(c);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(c)
    );
  };
  function s(c) {
    if (c = String(c), !(c.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        c
      );
      if (u) {
        var d = parseFloat(u[1]), m = (u[2] || "ms").toLowerCase();
        switch (m) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return d * o;
          case "weeks":
          case "week":
          case "w":
            return d * i;
          case "days":
          case "day":
          case "d":
            return d * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return d * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return d * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return d * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return d;
          default:
            return;
        }
      }
    }
  }
  function a(c) {
    var u = Math.abs(c);
    return u >= r ? Math.round(c / r) + "d" : u >= n ? Math.round(c / n) + "h" : u >= t ? Math.round(c / t) + "m" : u >= e ? Math.round(c / e) + "s" : c + "ms";
  }
  function l(c) {
    var u = Math.abs(c);
    return u >= r ? p(c, u, r, "day") : u >= n ? p(c, u, n, "hour") : u >= t ? p(c, u, t, "minute") : u >= e ? p(c, u, e, "second") : c + " ms";
  }
  function p(c, u, d, m) {
    var w = u >= d * 1.5;
    return Math.round(c / d) + " " + m + (w ? "s" : "");
  }
  return po;
}
var mo, va;
function xc() {
  if (va) return mo;
  va = 1;
  function e(t) {
    r.debug = r, r.default = r, r.coerce = p, r.disable = a, r.enable = o, r.enabled = l, r.humanize = ch(), r.destroy = c, Object.keys(t).forEach((u) => {
      r[u] = t[u];
    }), r.names = [], r.skips = [], r.formatters = {};
    function n(u) {
      let d = 0;
      for (let m = 0; m < u.length; m++)
        d = (d << 5) - d + u.charCodeAt(m), d |= 0;
      return r.colors[Math.abs(d) % r.colors.length];
    }
    r.selectColor = n;
    function r(u) {
      let d, m = null, w, y;
      function v(...b) {
        if (!v.enabled)
          return;
        const I = v, M = Number(/* @__PURE__ */ new Date()), k = M - (d || M);
        I.diff = k, I.prev = d, I.curr = M, d = M, b[0] = r.coerce(b[0]), typeof b[0] != "string" && b.unshift("%O");
        let U = 0;
        b[0] = b[0].replace(/%([a-zA-Z%])/g, (D, R) => {
          if (D === "%%")
            return "%";
          U++;
          const $ = r.formatters[R];
          if (typeof $ == "function") {
            const E = b[U];
            D = $.call(I, E), b.splice(U, 1), U--;
          }
          return D;
        }), r.formatArgs.call(I, b), (I.log || r.log).apply(I, b);
      }
      return v.namespace = u, v.useColors = r.useColors(), v.color = r.selectColor(u), v.extend = i, v.destroy = r.destroy, Object.defineProperty(v, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => m !== null ? m : (w !== r.namespaces && (w = r.namespaces, y = r.enabled(u)), y),
        set: (b) => {
          m = b;
        }
      }), typeof r.init == "function" && r.init(v), v;
    }
    function i(u, d) {
      const m = r(this.namespace + (typeof d > "u" ? ":" : d) + u);
      return m.log = this.log, m;
    }
    function o(u) {
      r.save(u), r.namespaces = u, r.names = [], r.skips = [];
      const d = (typeof u == "string" ? u : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const m of d)
        m[0] === "-" ? r.skips.push(m.slice(1)) : r.names.push(m);
    }
    function s(u, d) {
      let m = 0, w = 0, y = -1, v = 0;
      for (; m < u.length; )
        if (w < d.length && (d[w] === u[m] || d[w] === "*"))
          d[w] === "*" ? (y = w, v = m, w++) : (m++, w++);
        else if (y !== -1)
          w = y + 1, v++, m = v;
        else
          return !1;
      for (; w < d.length && d[w] === "*"; )
        w++;
      return w === d.length;
    }
    function a() {
      const u = [
        ...r.names,
        ...r.skips.map((d) => "-" + d)
      ].join(",");
      return r.enable(""), u;
    }
    function l(u) {
      for (const d of r.skips)
        if (s(u, d))
          return !1;
      for (const d of r.names)
        if (s(u, d))
          return !0;
      return !1;
    }
    function p(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function c() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  return mo = e, mo;
}
var _a;
function uh() {
  return _a || (_a = 1, function(e, t) {
    t.formatArgs = r, t.save = i, t.load = o, t.useColors = n, t.storage = s(), t.destroy = /* @__PURE__ */ (() => {
      let l = !1;
      return () => {
        l || (l = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), t.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function n() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let l;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (l = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(l[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function r(l) {
      if (l[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + l[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const p = "color: " + this.color;
      l.splice(1, 0, p, "color: inherit");
      let c = 0, u = 0;
      l[0].replace(/%[a-zA-Z%]/g, (d) => {
        d !== "%%" && (c++, d === "%c" && (u = c));
      }), l.splice(u, 0, p);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(l) {
      try {
        l ? t.storage.setItem("debug", l) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let l;
      try {
        l = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !l && typeof process < "u" && "env" in process && (l = process.env.DEBUG), l;
    }
    function s() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = xc()(t);
    const { formatters: a } = e.exports;
    a.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (p) {
        return "[UnexpectedJSONParseError]: " + p.message;
      }
    };
  }(kr, kr.exports)), kr.exports;
}
var Mr = { exports: {} }, go, xa;
function fh() {
  return xa || (xa = 1, go = (e, t = process.argv) => {
    const n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", r = t.indexOf(n + e), i = t.indexOf("--");
    return r !== -1 && (i === -1 || r < i);
  }), go;
}
var yo, ba;
function dh() {
  if (ba) return yo;
  ba = 1;
  const e = xi, t = wc, n = fh(), { env: r } = process;
  let i;
  n("no-color") || n("no-colors") || n("color=false") || n("color=never") ? i = 0 : (n("color") || n("colors") || n("color=true") || n("color=always")) && (i = 1), "FORCE_COLOR" in r && (r.FORCE_COLOR === "true" ? i = 1 : r.FORCE_COLOR === "false" ? i = 0 : i = r.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(r.FORCE_COLOR, 10), 3));
  function o(l) {
    return l === 0 ? !1 : {
      level: l,
      hasBasic: !0,
      has256: l >= 2,
      has16m: l >= 3
    };
  }
  function s(l, p) {
    if (i === 0)
      return 0;
    if (n("color=16m") || n("color=full") || n("color=truecolor"))
      return 3;
    if (n("color=256"))
      return 2;
    if (l && !p && i === void 0)
      return 0;
    const c = i || 0;
    if (r.TERM === "dumb")
      return c;
    if (process.platform === "win32") {
      const u = e.release().split(".");
      return Number(u[0]) >= 10 && Number(u[2]) >= 10586 ? Number(u[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in r)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((u) => u in r) || r.CI_NAME === "codeship" ? 1 : c;
    if ("TEAMCITY_VERSION" in r)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(r.TEAMCITY_VERSION) ? 1 : 0;
    if (r.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in r) {
      const u = parseInt((r.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (r.TERM_PROGRAM) {
        case "iTerm.app":
          return u >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(r.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(r.TERM) || "COLORTERM" in r ? 1 : c;
  }
  function a(l) {
    const p = s(l, l && l.isTTY);
    return o(p);
  }
  return yo = {
    supportsColor: a,
    stdout: o(s(!0, t.isatty(1))),
    stderr: o(s(!0, t.isatty(2)))
  }, yo;
}
var Sa;
function hh() {
  return Sa || (Sa = 1, function(e, t) {
    const n = wc, r = Cn;
    t.init = c, t.log = a, t.formatArgs = o, t.save = l, t.load = p, t.useColors = i, t.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const d = dh();
      d && (d.stderr || d).level >= 2 && (t.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    t.inspectOpts = Object.keys(process.env).filter((d) => /^debug_/i.test(d)).reduce((d, m) => {
      const w = m.substring(6).toLowerCase().replace(/_([a-z])/g, (v, b) => b.toUpperCase());
      let y = process.env[m];
      return /^(yes|on|true|enabled)$/i.test(y) ? y = !0 : /^(no|off|false|disabled)$/i.test(y) ? y = !1 : y === "null" ? y = null : y = Number(y), d[w] = y, d;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function o(d) {
      const { namespace: m, useColors: w } = this;
      if (w) {
        const y = this.color, v = "\x1B[3" + (y < 8 ? y : "8;5;" + y), b = `  ${v};1m${m} \x1B[0m`;
        d[0] = b + d[0].split(`
`).join(`
` + b), d.push(v + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        d[0] = s() + m + " " + d[0];
    }
    function s() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function a(...d) {
      return process.stderr.write(r.formatWithOptions(t.inspectOpts, ...d) + `
`);
    }
    function l(d) {
      d ? process.env.DEBUG = d : delete process.env.DEBUG;
    }
    function p() {
      return process.env.DEBUG;
    }
    function c(d) {
      d.inspectOpts = {};
      const m = Object.keys(t.inspectOpts);
      for (let w = 0; w < m.length; w++)
        d.inspectOpts[m[w]] = t.inspectOpts[m[w]];
    }
    e.exports = xc()(t);
    const { formatters: u } = e.exports;
    u.o = function(d) {
      return this.inspectOpts.colors = this.useColors, r.inspect(d, this.inspectOpts).split(`
`).map((m) => m.trim()).join(" ");
    }, u.O = function(d) {
      return this.inspectOpts.colors = this.useColors, r.inspect(d, this.inspectOpts);
    };
  }(Mr, Mr.exports)), Mr.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? zo.exports = uh() : zo.exports = hh();
var bc = zo.exports, In = {};
Object.defineProperty(In, "__esModule", { value: !0 });
In.newError = ph;
function ph(e, t) {
  const n = new Error(e);
  return n.code = t, n;
}
var pr = {};
Object.defineProperty(pr, "__esModule", { value: !0 });
pr.ProgressCallbackTransform = void 0;
const mh = nt;
class gh extends mh.Transform {
  constructor(t, n, r) {
    super(), this.total = t, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.total && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.total * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), r(null, t);
  }
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.total,
      delta: this.delta,
      transferred: this.total,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, t(null);
  }
}
pr.ProgressCallbackTransform = gh;
Object.defineProperty(Pe, "__esModule", { value: !0 });
Pe.DigestTransform = Pe.HttpExecutor = Pe.HttpError = void 0;
Pe.createHttpError = Wo;
Pe.parseJson = Sh;
Pe.configureRequestOptionsFromUrl = Ac;
Pe.configureRequestUrl = gs;
Pe.safeGetHeader = yn;
Pe.configureRequestOptions = ci;
Pe.safeStringifyJson = ui;
const yh = hr, Eh = bc, wh = tt, vh = nt, Sc = $n, _h = Pt, Aa = In, xh = pr, Mn = (0, Eh.default)("electron-builder");
function Wo(e, t = null) {
  return new ms(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + ui(e.headers), t);
}
const bh = /* @__PURE__ */ new Map([
  [429, "Too many requests"],
  [400, "Bad request"],
  [403, "Forbidden"],
  [404, "Not found"],
  [405, "Method not allowed"],
  [406, "Not acceptable"],
  [408, "Request timeout"],
  [413, "Request entity too large"],
  [500, "Internal server error"],
  [502, "Bad gateway"],
  [503, "Service unavailable"],
  [504, "Gateway timeout"],
  [505, "HTTP version not supported"]
]);
class ms extends Error {
  constructor(t, n = `HTTP error: ${bh.get(t) || t}`, r = null) {
    super(n), this.statusCode = t, this.description = r, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
Pe.HttpError = ms;
function Sh(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class li {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, n = new _h.CancellationToken(), r) {
    ci(t);
    const i = r == null ? void 0 : JSON.stringify(r), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      Mn(i);
      const { headers: s, ...a } = t;
      t = {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": o.length,
          ...s
        },
        ...a
      };
    }
    return this.doApiRequest(t, n, (s) => s.end(o));
  }
  doApiRequest(t, n, r, i = 0) {
    return Mn.enabled && Mn(`Request: ${ui(t)}`), n.createPromise((o, s, a) => {
      const l = this.createRequest(t, (p) => {
        try {
          this.handleResponse(p, t, n, o, s, i, r);
        } catch (c) {
          s(c);
        }
      });
      this.addErrorAndTimeoutHandlers(l, s, t.timeout), this.addRedirectHandlers(l, t, s, i, (p) => {
        this.doApiRequest(p, n, r, i).then(o).catch(s);
      }), r(l, s), a(() => l.abort());
    });
  }
  // noinspection JSUnusedLocalSymbols
  // eslint-disable-next-line
  addRedirectHandlers(t, n, r, i, o) {
  }
  addErrorAndTimeoutHandlers(t, n, r = 60 * 1e3) {
    this.addTimeOutHandler(t, n, r), t.on("error", n), t.on("aborted", () => {
      n(new Error("Request has been aborted by the server"));
    });
  }
  handleResponse(t, n, r, i, o, s, a) {
    var l;
    if (Mn.enabled && Mn(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${ui(n)}`), t.statusCode === 404) {
      o(Wo(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const p = (l = t.statusCode) !== null && l !== void 0 ? l : 0, c = p >= 300 && p < 400, u = yn(t, "location");
    if (c && u != null) {
      if (s > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(li.prepareRedirectUrlOptions(u, n), r, a, s).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let d = "";
    t.on("error", o), t.on("data", (m) => d += m), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const m = yn(t, "content-type"), w = m != null && (Array.isArray(m) ? m.find((y) => y.includes("json")) != null : m.includes("json"));
          o(Wo(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

          Data:
          ${w ? JSON.stringify(JSON.parse(d)) : d}
          `));
        } else
          i(d.length === 0 ? null : d);
      } catch (m) {
        o(m);
      }
    });
  }
  async downloadToBuffer(t, n) {
    return await n.cancellationToken.createPromise((r, i, o) => {
      const s = [], a = {
        headers: n.headers || void 0,
        // because PrivateGitHubProvider requires HttpExecutor.prepareRedirectUrlOptions logic, so, we need to redirect manually
        redirect: "manual"
      };
      gs(t, a), ci(a), this.doDownload(a, {
        destination: null,
        options: n,
        onCancel: o,
        callback: (l) => {
          l == null ? r(Buffer.concat(s)) : i(l);
        },
        responseHandler: (l, p) => {
          let c = 0;
          l.on("data", (u) => {
            if (c += u.length, c > 524288e3) {
              p(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            s.push(u);
          }), l.on("end", () => {
            p(null);
          });
        }
      }, 0);
    });
  }
  doDownload(t, n, r) {
    const i = this.createRequest(t, (o) => {
      if (o.statusCode >= 400) {
        n.callback(new Error(`Cannot download "${t.protocol || "https:"}//${t.hostname}${t.path}", status ${o.statusCode}: ${o.statusMessage}`));
        return;
      }
      o.on("error", n.callback);
      const s = yn(o, "location");
      if (s != null) {
        r < this.maxRedirects ? this.doDownload(li.prepareRedirectUrlOptions(s, t), n, r++) : n.callback(this.createMaxRedirectError());
        return;
      }
      n.responseHandler == null ? Th(n, o) : n.responseHandler(o, n.callback);
    });
    this.addErrorAndTimeoutHandlers(i, n.callback, t.timeout), this.addRedirectHandlers(i, t, n.callback, r, (o) => {
      this.doDownload(o, n, r++);
    }), i.end();
  }
  createMaxRedirectError() {
    return new Error(`Too many redirects (> ${this.maxRedirects})`);
  }
  addTimeOutHandler(t, n, r) {
    t.on("socket", (i) => {
      i.setTimeout(r, () => {
        t.abort(), n(new Error("Request timed out"));
      });
    });
  }
  static prepareRedirectUrlOptions(t, n) {
    const r = Ac(t, { ...n }), i = r.headers;
    if (i != null && i.authorization) {
      const o = new Sc.URL(t);
      (o.hostname.endsWith(".amazonaws.com") || o.searchParams.has("X-Amz-Credential")) && delete i.authorization;
    }
    return r;
  }
  static retryOnServerError(t, n = 3) {
    for (let r = 0; ; r++)
      try {
        return t();
      } catch (i) {
        if (r < n && (i instanceof ms && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
Pe.HttpExecutor = li;
function Ac(e, t) {
  const n = ci(t);
  return gs(new Sc.URL(e), n), n;
}
function gs(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Vo extends vh.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, n = "sha512", r = "base64") {
    super(), this.expected = t, this.algorithm = n, this.encoding = r, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, yh.createHash)(n);
  }
  // noinspection JSUnusedGlobalSymbols
  _transform(t, n, r) {
    this.digester.update(t), r(null, t);
  }
  // noinspection JSUnusedGlobalSymbols
  _flush(t) {
    if (this._actual = this.digester.digest(this.encoding), this.isValidateOnEnd)
      try {
        this.validate();
      } catch (n) {
        t(n);
        return;
      }
    t(null);
  }
  validate() {
    if (this._actual == null)
      throw (0, Aa.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, Aa.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
Pe.DigestTransform = Vo;
function Ah(e, t, n) {
  return e != null && t != null && e !== t ? (n(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function yn(e, t) {
  const n = e.headers[t];
  return n == null ? null : Array.isArray(n) ? n.length === 0 ? null : n[n.length - 1] : n;
}
function Th(e, t) {
  if (!Ah(yn(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const n = [];
  if (e.options.onProgress != null) {
    const s = yn(t, "content-length");
    s != null && n.push(new xh.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const r = e.options.sha512;
  r != null ? n.push(new Vo(r, "sha512", r.length === 128 && !r.includes("+") && !r.includes("Z") && !r.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && n.push(new Vo(e.options.sha2, "sha256", "hex"));
  const i = (0, wh.createWriteStream)(e.destination);
  n.push(i);
  let o = t;
  for (const s of n)
    s.on("error", (a) => {
      i.close(), e.options.cancellationToken.cancelled || e.callback(a);
    }), o = o.pipe(s);
  i.on("finish", () => {
    i.close(e.callback);
  });
}
function ci(e, t, n) {
  n != null && (e.method = n), e.headers = { ...e.headers };
  const r = e.headers;
  return t != null && (r.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), r["User-Agent"] == null && (r["User-Agent"] = "electron-builder"), (n == null || n === "GET" || r["Cache-Control"] == null) && (r["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function ui(e, t) {
  return JSON.stringify(e, (n, r) => n.endsWith("Authorization") || n.endsWith("authorization") || n.endsWith("Password") || n.endsWith("PASSWORD") || n.endsWith("Token") || n.includes("password") || n.includes("token") || t != null && t.has(n) ? "<stripped sensitive data>" : r, 2);
}
var Ti = {};
Object.defineProperty(Ti, "__esModule", { value: !0 });
Ti.githubUrl = Ch;
Ti.getS3LikeProviderBaseUrl = $h;
function Ch(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function $h(e) {
  const t = e.provider;
  if (t === "s3")
    return Ih(e);
  if (t === "spaces")
    return Dh(e);
  throw new Error(`Not supported provider: ${t}`);
}
function Ih(e) {
  let t;
  if (e.accelerate == !0)
    t = `https://${e.bucket}.s3-accelerate.amazonaws.com`;
  else if (e.endpoint != null)
    t = `${e.endpoint}/${e.bucket}`;
  else if (e.bucket.includes(".")) {
    if (e.region == null)
      throw new Error(`Bucket name "${e.bucket}" includes a dot, but S3 region is missing`);
    e.region === "us-east-1" ? t = `https://s3.amazonaws.com/${e.bucket}` : t = `https://s3-${e.region}.amazonaws.com/${e.bucket}`;
  } else e.region === "cn-north-1" ? t = `https://${e.bucket}.s3.${e.region}.amazonaws.com.cn` : t = `https://${e.bucket}.s3.amazonaws.com`;
  return Tc(t, e.path);
}
function Tc(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function Dh(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return Tc(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var ys = {};
Object.defineProperty(ys, "__esModule", { value: !0 });
ys.parseDn = Oh;
function Oh(e) {
  let t = !1, n = null, r = "", i = 0;
  e = e.trim();
  const o = /* @__PURE__ */ new Map();
  for (let s = 0; s <= e.length; s++) {
    if (s === e.length) {
      n !== null && o.set(n, r);
      break;
    }
    const a = e[s];
    if (t) {
      if (a === '"') {
        t = !1;
        continue;
      }
    } else {
      if (a === '"') {
        t = !0;
        continue;
      }
      if (a === "\\") {
        s++;
        const l = parseInt(e.slice(s, s + 2), 16);
        Number.isNaN(l) ? r += e[s] : (s++, r += String.fromCharCode(l));
        continue;
      }
      if (n === null && a === "=") {
        n = r, r = "";
        continue;
      }
      if (a === "," || a === ";" || a === "+") {
        n !== null && o.set(n, r), n = null, r = "";
        continue;
      }
    }
    if (a === " " && !t) {
      if (r.length === 0)
        continue;
      if (s > i) {
        let l = s;
        for (; e[l] === " "; )
          l++;
        i = l;
      }
      if (i >= e.length || e[i] === "," || e[i] === ";" || n === null && e[i] === "=" || n !== null && e[i] === "+") {
        s = i - 1;
        continue;
      }
    }
    r += a;
  }
  return o;
}
var bn = {};
Object.defineProperty(bn, "__esModule", { value: !0 });
bn.nil = bn.UUID = void 0;
const Cc = hr, $c = In, Rh = "options.name must be either a string or a Buffer", Ta = (0, Cc.randomBytes)(16);
Ta[0] = Ta[0] | 1;
const Zr = {}, re = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  Zr[t] = e, re[e] = t;
}
class Qt {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const n = Qt.check(t);
    if (!n)
      throw new Error("not a UUID");
    this.version = n.version, n.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, n) {
    return Ph(t, "sha1", 80, n);
  }
  toString() {
    return this.ascii == null && (this.ascii = Nh(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, n = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (Zr[t[14] + t[15]] & 240) >> 4,
        variant: Ca((Zr[t[19] + t[20]] & 224) >> 5),
        format: "ascii"
      } : !1;
    if (Buffer.isBuffer(t)) {
      if (t.length < n + 16)
        return !1;
      let r = 0;
      for (; r < 16 && t[n + r] === 0; r++)
        ;
      return r === 16 ? { version: void 0, variant: "nil", format: "binary" } : {
        version: (t[n + 6] & 240) >> 4,
        variant: Ca((t[n + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, $c.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const n = Buffer.allocUnsafe(16);
    let r = 0;
    for (let i = 0; i < 16; i++)
      n[i] = Zr[t[r++] + t[r++]], (i === 3 || i === 5 || i === 7 || i === 9) && (r += 1);
    return n;
  }
}
bn.UUID = Qt;
Qt.OID = Qt.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function Ca(e) {
  switch (e) {
    case 0:
    case 1:
    case 3:
      return "ncs";
    case 4:
    case 5:
      return "rfc4122";
    case 6:
      return "microsoft";
    default:
      return "future";
  }
}
var Kn;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(Kn || (Kn = {}));
function Ph(e, t, n, r, i = Kn.ASCII) {
  const o = (0, Cc.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, $c.newError)(Rh, "ERR_INVALID_UUID_NAME");
  o.update(r), o.update(e);
  const a = o.digest();
  let l;
  switch (i) {
    case Kn.BINARY:
      a[6] = a[6] & 15 | n, a[8] = a[8] & 63 | 128, l = a;
      break;
    case Kn.OBJECT:
      a[6] = a[6] & 15 | n, a[8] = a[8] & 63 | 128, l = new Qt(a);
      break;
    default:
      l = re[a[0]] + re[a[1]] + re[a[2]] + re[a[3]] + "-" + re[a[4]] + re[a[5]] + "-" + re[a[6] & 15 | n] + re[a[7]] + "-" + re[a[8] & 63 | 128] + re[a[9]] + "-" + re[a[10]] + re[a[11]] + re[a[12]] + re[a[13]] + re[a[14]] + re[a[15]];
      break;
  }
  return l;
}
function Nh(e) {
  return re[e[0]] + re[e[1]] + re[e[2]] + re[e[3]] + "-" + re[e[4]] + re[e[5]] + "-" + re[e[6]] + re[e[7]] + "-" + re[e[8]] + re[e[9]] + "-" + re[e[10]] + re[e[11]] + re[e[12]] + re[e[13]] + re[e[14]] + re[e[15]];
}
bn.nil = new Qt("00000000-0000-0000-0000-000000000000");
var mr = {}, Ic = {};
(function(e) {
  (function(t) {
    t.parser = function(h, f) {
      return new r(h, f);
    }, t.SAXParser = r, t.SAXStream = u, t.createStream = p, t.MAX_BUFFER_LENGTH = 64 * 1024;
    var n = [
      "comment",
      "sgmlDecl",
      "textNode",
      "tagName",
      "doctype",
      "procInstName",
      "procInstBody",
      "entity",
      "attribName",
      "attribValue",
      "cdata",
      "script"
    ];
    t.EVENTS = [
      "text",
      "processinginstruction",
      "sgmldeclaration",
      "doctype",
      "comment",
      "opentagstart",
      "attribute",
      "opentag",
      "closetag",
      "opencdata",
      "cdata",
      "closecdata",
      "error",
      "end",
      "ready",
      "script",
      "opennamespace",
      "closenamespace"
    ];
    function r(h, f) {
      if (!(this instanceof r))
        return new r(h, f);
      var T = this;
      o(T), T.q = T.c = "", T.bufferCheckPosition = t.MAX_BUFFER_LENGTH, T.encoding = null, T.opt = f || {}, T.opt.lowercase = T.opt.lowercase || T.opt.lowercasetags, T.looseCase = T.opt.lowercase ? "toLowerCase" : "toUpperCase", T.opt.maxEntityCount = T.opt.maxEntityCount || 512, T.opt.maxEntityDepth = T.opt.maxEntityDepth || 4, T.entityCount = T.entityDepth = 0, T.tags = [], T.closed = T.closedRoot = T.sawRoot = !1, T.tag = T.error = null, T.strict = !!h, T.noscript = !!(h || T.opt.noscript), T.state = E.BEGIN, T.strictEntities = T.opt.strictEntities, T.ENTITIES = T.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), T.attribList = [], T.opt.xmlns && (T.ns = Object.create(v)), T.opt.unquotedAttributeValues === void 0 && (T.opt.unquotedAttributeValues = !h), T.trackPosition = T.opt.position !== !1, T.trackPosition && (T.position = T.line = T.column = 0), Q(T, "onready");
    }
    Object.create || (Object.create = function(h) {
      function f() {
      }
      f.prototype = h;
      var T = new f();
      return T;
    }), Object.keys || (Object.keys = function(h) {
      var f = [];
      for (var T in h) h.hasOwnProperty(T) && f.push(T);
      return f;
    });
    function i(h) {
      for (var f = Math.max(t.MAX_BUFFER_LENGTH, 10), T = 0, _ = 0, ie = n.length; _ < ie; _++) {
        var fe = h[n[_]].length;
        if (fe > f)
          switch (n[_]) {
            case "textNode":
              S(h);
              break;
            case "cdata":
              C(h, "oncdata", h.cdata), h.cdata = "";
              break;
            case "script":
              C(h, "onscript", h.script), h.script = "";
              break;
            default:
              L(h, "Max buffer length exceeded: " + n[_]);
          }
        T = Math.max(T, fe);
      }
      var ge = t.MAX_BUFFER_LENGTH - T;
      h.bufferCheckPosition = ge + h.position;
    }
    function o(h) {
      for (var f = 0, T = n.length; f < T; f++)
        h[n[f]] = "";
    }
    function s(h) {
      S(h), h.cdata !== "" && (C(h, "oncdata", h.cdata), h.cdata = ""), h.script !== "" && (C(h, "onscript", h.script), h.script = "");
    }
    r.prototype = {
      end: function() {
        W(this);
      },
      write: Nn,
      resume: function() {
        return this.error = null, this;
      },
      close: function() {
        return this.write(null);
      },
      flush: function() {
        s(this);
      }
    };
    var a;
    try {
      a = require("stream").Stream;
    } catch {
      a = function() {
      };
    }
    a || (a = function() {
    });
    var l = t.EVENTS.filter(function(h) {
      return h !== "error" && h !== "end";
    });
    function p(h, f) {
      return new u(h, f);
    }
    function c(h, f) {
      if (h.length >= 2) {
        if (h[0] === 255 && h[1] === 254)
          return "utf-16le";
        if (h[0] === 254 && h[1] === 255)
          return "utf-16be";
      }
      return h.length >= 3 && h[0] === 239 && h[1] === 187 && h[2] === 191 ? "utf8" : h.length >= 4 ? h[0] === 60 && h[1] === 0 && h[2] === 63 && h[3] === 0 ? "utf-16le" : h[0] === 0 && h[1] === 60 && h[2] === 0 && h[3] === 63 ? "utf-16be" : "utf8" : f ? "utf8" : null;
    }
    function u(h, f) {
      if (!(this instanceof u))
        return new u(h, f);
      a.apply(this), this._parser = new r(h, f), this.writable = !0, this.readable = !0;
      var T = this;
      this._parser.onend = function() {
        T.emit("end");
      }, this._parser.onerror = function(_) {
        T.emit("error", _), T._parser.error = null;
      }, this._decoder = null, this._decoderBuffer = null, l.forEach(function(_) {
        Object.defineProperty(T, "on" + _, {
          get: function() {
            return T._parser["on" + _];
          },
          set: function(ie) {
            if (!ie)
              return T.removeAllListeners(_), T._parser["on" + _] = ie, ie;
            T.on(_, ie);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    u.prototype = Object.create(a.prototype, {
      constructor: {
        value: u
      }
    }), u.prototype._decodeBuffer = function(h, f) {
      if (this._decoderBuffer && (h = Buffer.concat([this._decoderBuffer, h]), this._decoderBuffer = null), !this._decoder) {
        var T = c(h, f);
        if (!T)
          return this._decoderBuffer = h, "";
        this._parser.encoding = T, this._decoder = new TextDecoder(T);
      }
      return this._decoder.decode(h, { stream: !f });
    }, u.prototype.write = function(h) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(h))
        h = this._decodeBuffer(h, !1);
      else if (this._decoderBuffer) {
        var f = this._decodeBuffer(Buffer.alloc(0), !0);
        f && (this._parser.write(f), this.emit("data", f));
      }
      return this._parser.write(h.toString()), this.emit("data", h), !0;
    }, u.prototype.end = function(h) {
      if (h && h.length && this.write(h), this._decoderBuffer) {
        var f = this._decodeBuffer(Buffer.alloc(0), !0);
        f && (this._parser.write(f), this.emit("data", f));
      } else if (this._decoder) {
        var T = this._decoder.decode();
        T && (this._parser.write(T), this.emit("data", T));
      }
      return this._parser.end(), !0;
    }, u.prototype.on = function(h, f) {
      var T = this;
      return !T._parser["on" + h] && l.indexOf(h) !== -1 && (T._parser["on" + h] = function() {
        var _ = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        _.splice(0, 0, h), T.emit.apply(T, _);
      }), a.prototype.on.call(T, h, f);
    };
    var d = /^\[CDATA\[$/i, m = /^DOCTYPE$/i, w = "http://www.w3.org/XML/1998/namespace", y = "http://www.w3.org/2000/xmlns/", v = { xml: w, xmlns: y }, b = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, I = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, M = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, k = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function U(h) {
      return h === " " || h === `
` || h === "\r" || h === "	";
    }
    function A(h) {
      return h === '"' || h === "'";
    }
    function D(h) {
      return h === ">" || U(h);
    }
    function R(h, f) {
      return h.test(f);
    }
    function $(h, f) {
      return !R(h, f);
    }
    var E = 0;
    t.STATE = {
      BEGIN: E++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: E++,
      // leading whitespace
      TEXT: E++,
      // general stuff
      TEXT_ENTITY: E++,
      // &amp and such.
      OPEN_WAKA: E++,
      // <
      SGML_DECL: E++,
      // <!BLARG
      SGML_DECL_QUOTED: E++,
      // <!BLARG foo "bar
      DOCTYPE: E++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: E++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: E++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: E++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: E++,
      // <!-
      COMMENT: E++,
      // <!--
      COMMENT_ENDING: E++,
      // <!-- blah -
      COMMENT_ENDED: E++,
      // <!-- blah --
      CDATA: E++,
      // <![CDATA[ something
      CDATA_ENDING: E++,
      // ]
      CDATA_ENDING_2: E++,
      // ]]
      PROC_INST: E++,
      // <?hi
      PROC_INST_BODY: E++,
      // <?hi there
      PROC_INST_ENDING: E++,
      // <?hi "there" ?
      OPEN_TAG: E++,
      // <strong
      OPEN_TAG_SLASH: E++,
      // <strong /
      ATTRIB: E++,
      // <a
      ATTRIB_NAME: E++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: E++,
      // <a foo _
      ATTRIB_VALUE: E++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: E++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: E++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: E++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: E++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: E++,
      // <foo bar=&quot
      CLOSE_TAG: E++,
      // </a
      CLOSE_TAG_SAW_WHITE: E++,
      // </a   >
      SCRIPT: E++,
      // <script> ...
      SCRIPT_ENDING: E++
      // <script> ... <
    }, t.XML_ENTITIES = Object.assign(/* @__PURE__ */ Object.create(null), {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'"
    }), t.ENTITIES = Object.assign(/* @__PURE__ */ Object.create(null), {
      amp: "&",
      gt: ">",
      lt: "<",
      quot: '"',
      apos: "'",
      AElig: 198,
      Aacute: 193,
      Acirc: 194,
      Agrave: 192,
      Aring: 197,
      Atilde: 195,
      Auml: 196,
      Ccedil: 199,
      ETH: 208,
      Eacute: 201,
      Ecirc: 202,
      Egrave: 200,
      Euml: 203,
      Iacute: 205,
      Icirc: 206,
      Igrave: 204,
      Iuml: 207,
      Ntilde: 209,
      Oacute: 211,
      Ocirc: 212,
      Ograve: 210,
      Oslash: 216,
      Otilde: 213,
      Ouml: 214,
      THORN: 222,
      Uacute: 218,
      Ucirc: 219,
      Ugrave: 217,
      Uuml: 220,
      Yacute: 221,
      aacute: 225,
      acirc: 226,
      aelig: 230,
      agrave: 224,
      aring: 229,
      atilde: 227,
      auml: 228,
      ccedil: 231,
      eacute: 233,
      ecirc: 234,
      egrave: 232,
      eth: 240,
      euml: 235,
      iacute: 237,
      icirc: 238,
      igrave: 236,
      iuml: 239,
      ntilde: 241,
      oacute: 243,
      ocirc: 244,
      ograve: 242,
      oslash: 248,
      otilde: 245,
      ouml: 246,
      szlig: 223,
      thorn: 254,
      uacute: 250,
      ucirc: 251,
      ugrave: 249,
      uuml: 252,
      yacute: 253,
      yuml: 255,
      copy: 169,
      reg: 174,
      nbsp: 160,
      iexcl: 161,
      cent: 162,
      pound: 163,
      curren: 164,
      yen: 165,
      brvbar: 166,
      sect: 167,
      uml: 168,
      ordf: 170,
      laquo: 171,
      not: 172,
      shy: 173,
      macr: 175,
      deg: 176,
      plusmn: 177,
      sup1: 185,
      sup2: 178,
      sup3: 179,
      acute: 180,
      micro: 181,
      para: 182,
      middot: 183,
      cedil: 184,
      ordm: 186,
      raquo: 187,
      frac14: 188,
      frac12: 189,
      frac34: 190,
      iquest: 191,
      times: 215,
      divide: 247,
      OElig: 338,
      oelig: 339,
      Scaron: 352,
      scaron: 353,
      Yuml: 376,
      fnof: 402,
      circ: 710,
      tilde: 732,
      Alpha: 913,
      Beta: 914,
      Gamma: 915,
      Delta: 916,
      Epsilon: 917,
      Zeta: 918,
      Eta: 919,
      Theta: 920,
      Iota: 921,
      Kappa: 922,
      Lambda: 923,
      Mu: 924,
      Nu: 925,
      Xi: 926,
      Omicron: 927,
      Pi: 928,
      Rho: 929,
      Sigma: 931,
      Tau: 932,
      Upsilon: 933,
      Phi: 934,
      Chi: 935,
      Psi: 936,
      Omega: 937,
      alpha: 945,
      beta: 946,
      gamma: 947,
      delta: 948,
      epsilon: 949,
      zeta: 950,
      eta: 951,
      theta: 952,
      iota: 953,
      kappa: 954,
      lambda: 955,
      mu: 956,
      nu: 957,
      xi: 958,
      omicron: 959,
      pi: 960,
      rho: 961,
      sigmaf: 962,
      sigma: 963,
      tau: 964,
      upsilon: 965,
      phi: 966,
      chi: 967,
      psi: 968,
      omega: 969,
      thetasym: 977,
      upsih: 978,
      piv: 982,
      ensp: 8194,
      emsp: 8195,
      thinsp: 8201,
      zwnj: 8204,
      zwj: 8205,
      lrm: 8206,
      rlm: 8207,
      ndash: 8211,
      mdash: 8212,
      lsquo: 8216,
      rsquo: 8217,
      sbquo: 8218,
      ldquo: 8220,
      rdquo: 8221,
      bdquo: 8222,
      dagger: 8224,
      Dagger: 8225,
      bull: 8226,
      hellip: 8230,
      permil: 8240,
      prime: 8242,
      Prime: 8243,
      lsaquo: 8249,
      rsaquo: 8250,
      oline: 8254,
      frasl: 8260,
      euro: 8364,
      image: 8465,
      weierp: 8472,
      real: 8476,
      trade: 8482,
      alefsym: 8501,
      larr: 8592,
      uarr: 8593,
      rarr: 8594,
      darr: 8595,
      harr: 8596,
      crarr: 8629,
      lArr: 8656,
      uArr: 8657,
      rArr: 8658,
      dArr: 8659,
      hArr: 8660,
      forall: 8704,
      part: 8706,
      exist: 8707,
      empty: 8709,
      nabla: 8711,
      isin: 8712,
      notin: 8713,
      ni: 8715,
      prod: 8719,
      sum: 8721,
      minus: 8722,
      lowast: 8727,
      radic: 8730,
      prop: 8733,
      infin: 8734,
      ang: 8736,
      and: 8743,
      or: 8744,
      cap: 8745,
      cup: 8746,
      int: 8747,
      there4: 8756,
      sim: 8764,
      cong: 8773,
      asymp: 8776,
      ne: 8800,
      equiv: 8801,
      le: 8804,
      ge: 8805,
      sub: 8834,
      sup: 8835,
      nsub: 8836,
      sube: 8838,
      supe: 8839,
      oplus: 8853,
      otimes: 8855,
      perp: 8869,
      sdot: 8901,
      lceil: 8968,
      rceil: 8969,
      lfloor: 8970,
      rfloor: 8971,
      lang: 9001,
      rang: 9002,
      loz: 9674,
      spades: 9824,
      clubs: 9827,
      hearts: 9829,
      diams: 9830
    }), Object.keys(t.ENTITIES).forEach(function(h) {
      var f = t.ENTITIES[h], T = typeof f == "number" ? String.fromCharCode(f) : f;
      t.ENTITIES[h] = T;
    });
    for (var z in t.STATE)
      t.STATE[t.STATE[z]] = z;
    E = t.STATE;
    function Q(h, f, T) {
      h[f] && h[f](T);
    }
    function ee(h) {
      var f = h && h.match(/(?:^|\s)encoding\s*=\s*(['"])([^'"]+)\1/i);
      return f ? f[2] : null;
    }
    function K(h) {
      return h ? h.toLowerCase().replace(/[^a-z0-9]/g, "") : null;
    }
    function H(h, f) {
      const T = K(h), _ = K(f);
      return !T || !_ ? !0 : _ === "utf16" ? T === "utf16le" || T === "utf16be" : T === _;
    }
    function J(h, f) {
      if (!(!h.strict || !h.encoding || !f || f.name !== "xml")) {
        var T = ee(f.body);
        T && !H(h.encoding, T) && N(
          h,
          "XML declaration encoding " + T + " does not match detected stream encoding " + h.encoding.toUpperCase()
        );
      }
    }
    function C(h, f, T) {
      h.textNode && S(h), Q(h, f, T);
    }
    function S(h) {
      h.textNode = O(h.opt, h.textNode), h.textNode && Q(h, "ontext", h.textNode), h.textNode = "";
    }
    function O(h, f) {
      return h.trim && (f = f.trim()), h.normalize && (f = f.replace(/\s+/g, " ")), f;
    }
    function L(h, f) {
      return S(h), h.trackPosition && (f += `
Line: ` + h.line + `
Column: ` + h.column + `
Char: ` + h.c), f = new Error(f), h.error = f, Q(h, "onerror", f), h;
    }
    function W(h) {
      return h.sawRoot && !h.closedRoot && N(h, "Unclosed root tag"), h.state !== E.BEGIN && h.state !== E.BEGIN_WHITESPACE && h.state !== E.TEXT && L(h, "Unexpected end"), S(h), h.c = "", h.closed = !0, Q(h, "onend"), r.call(h, h.strict, h.opt), h;
    }
    function N(h, f) {
      if (typeof h != "object" || !(h instanceof r))
        throw new Error("bad call to strictFail");
      h.strict && L(h, f);
    }
    function q(h) {
      h.strict || (h.tagName = h.tagName[h.looseCase]());
      var f = h.tags[h.tags.length - 1] || h, T = h.tag = { name: h.tagName, attributes: {} };
      h.opt.xmlns && (T.ns = f.ns), h.attribList.length = 0, C(h, "onopentagstart", T);
    }
    function Y(h, f) {
      var T = h.indexOf(":"), _ = T < 0 ? ["", h] : h.split(":"), ie = _[0], fe = _[1];
      return f && h === "xmlns" && (ie = "xmlns", fe = ""), { prefix: ie, local: fe };
    }
    function j(h) {
      if (h.strict || (h.attribName = h.attribName[h.looseCase]()), h.attribList.indexOf(h.attribName) !== -1 || h.tag.attributes.hasOwnProperty(h.attribName)) {
        h.attribName = h.attribValue = "";
        return;
      }
      if (h.opt.xmlns) {
        var f = Y(h.attribName, !0), T = f.prefix, _ = f.local;
        if (T === "xmlns")
          if (_ === "xml" && h.attribValue !== w)
            N(
              h,
              "xml: prefix must be bound to " + w + `
Actual: ` + h.attribValue
            );
          else if (_ === "xmlns" && h.attribValue !== y)
            N(
              h,
              "xmlns: prefix must be bound to " + y + `
Actual: ` + h.attribValue
            );
          else {
            var ie = h.tag, fe = h.tags[h.tags.length - 1] || h;
            ie.ns === fe.ns && (ie.ns = Object.create(fe.ns)), ie.ns[_] = h.attribValue;
          }
        h.attribList.push([h.attribName, h.attribValue]);
      } else
        h.tag.attributes[h.attribName] = h.attribValue, C(h, "onattribute", {
          name: h.attribName,
          value: h.attribValue
        });
      h.attribName = h.attribValue = "";
    }
    function X(h, f) {
      if (h.opt.xmlns) {
        var T = h.tag, _ = Y(h.tagName);
        T.prefix = _.prefix, T.local = _.local, T.uri = T.ns[_.prefix] || "", T.prefix && !T.uri && (N(
          h,
          "Unbound namespace prefix: " + JSON.stringify(h.tagName)
        ), T.uri = _.prefix);
        var ie = h.tags[h.tags.length - 1] || h;
        T.ns && ie.ns !== T.ns && Object.keys(T.ns).forEach(function(on) {
          C(h, "onopennamespace", {
            prefix: on,
            uri: T.ns[on]
          });
        });
        for (var fe = 0, ge = h.attribList.length; fe < ge; fe++) {
          var Te = h.attribList[fe], Ce = Te[0], Ve = Te[1], Ee = Y(Ce, !0), Ye = Ee.prefix, io = Ee.local, Dr = Ye === "" ? "" : T.ns[Ye] || "", _t = {
            name: Ce,
            value: Ve,
            prefix: Ye,
            local: io,
            uri: Dr
          };
          Ye && Ye !== "xmlns" && !Dr && (N(
            h,
            "Unbound namespace prefix: " + JSON.stringify(Ye)
          ), _t.uri = Ye), h.tag.attributes[Ce] = _t, C(h, "onattribute", _t);
        }
        h.attribList.length = 0;
      }
      h.tag.isSelfClosing = !!f, h.sawRoot = !0, h.tags.push(h.tag), C(h, "onopentag", h.tag), f || (!h.noscript && h.tagName.toLowerCase() === "script" ? h.state = E.SCRIPT : h.state = E.TEXT, h.tag = null, h.tagName = ""), h.attribName = h.attribValue = "", h.attribList.length = 0;
    }
    function ne(h) {
      if (!h.tagName) {
        N(h, "Weird empty close tag."), h.textNode += "</>", h.state = E.TEXT;
        return;
      }
      if (h.script) {
        if (h.tagName !== "script") {
          h.script += "</" + h.tagName + ">", h.tagName = "", h.state = E.SCRIPT;
          return;
        }
        C(h, "onscript", h.script), h.script = "";
      }
      var f = h.tags.length, T = h.tagName;
      h.strict || (T = T[h.looseCase]());
      for (var _ = T; f--; ) {
        var ie = h.tags[f];
        if (ie.name !== _)
          N(h, "Unexpected close tag");
        else
          break;
      }
      if (f < 0) {
        N(h, "Unmatched closing tag: " + h.tagName), h.textNode += "</" + h.tagName + ">", h.state = E.TEXT;
        return;
      }
      h.tagName = T;
      for (var fe = h.tags.length; fe-- > f; ) {
        var ge = h.tag = h.tags.pop();
        h.tagName = h.tag.name, C(h, "onclosetag", h.tagName);
        var Te = {};
        for (var Ce in ge.ns)
          Te[Ce] = ge.ns[Ce];
        var Ve = h.tags[h.tags.length - 1] || h;
        h.opt.xmlns && ge.ns !== Ve.ns && Object.keys(ge.ns).forEach(function(Ee) {
          var Ye = ge.ns[Ee];
          C(h, "onclosenamespace", { prefix: Ee, uri: Ye });
        });
      }
      f === 0 && (h.closedRoot = !0), h.tagName = h.attribValue = h.attribName = "", h.attribList.length = 0, h.state = E.TEXT;
    }
    function te(h) {
      var f = h.entity, T = f.toLowerCase(), _, ie = "";
      return h.ENTITIES[f] ? h.ENTITIES[f] : h.ENTITIES[T] ? h.ENTITIES[T] : (f = T, f.charAt(0) === "#" && (f.charAt(1) === "x" ? (f = f.slice(2), _ = parseInt(f, 16), ie = _.toString(16)) : (f = f.slice(1), _ = parseInt(f, 10), ie = _.toString(10))), f = f.replace(/^0+/, ""), isNaN(_) || ie.toLowerCase() !== f || _ < 0 || _ > 1114111 || !Re(_) ? (N(h, "Invalid character entity"), "&" + h.entity + ";") : String.fromCodePoint(_));
    }
    function Re(h) {
      return h === 9 || h === 10 || h === 13 || h >= 32 && h <= 55295 || h >= 57344 && h <= 65533 || h >= 65536 && h <= 1114111;
    }
    function vt(h, f) {
      f === "<" ? (h.state = E.OPEN_WAKA, h.startTagPosition = h.position) : U(f) || (N(h, "Non-whitespace before first tag."), h.textNode = f, h.state = E.TEXT);
    }
    function rn(h, f) {
      var T = "";
      return f < h.length && (T = h.charAt(f)), T;
    }
    function Nn(h) {
      var f = this;
      if (this.error)
        throw this.error;
      if (f.closed)
        return L(
          f,
          "Cannot write after close. Assign an onready handler."
        );
      if (h === null)
        return W(f);
      typeof h == "object" && (h = h.toString());
      for (var T = 0, _ = ""; _ = rn(h, T++), f.c = _, !!_; )
        switch (f.trackPosition && (f.position++, _ === `
` ? (f.line++, f.column = 0) : f.column++), f.state) {
          case E.BEGIN:
            if (f.state = E.BEGIN_WHITESPACE, _ === "\uFEFF")
              continue;
            vt(f, _);
            continue;
          case E.BEGIN_WHITESPACE:
            vt(f, _);
            continue;
          case E.TEXT:
            if (f.sawRoot && !f.closedRoot) {
              for (var fe = T - 1; _ && _ !== "<" && _ !== "&"; )
                _ = rn(h, T++), _ && f.trackPosition && (f.position++, _ === `
` ? (f.line++, f.column = 0) : f.column++);
              f.textNode += h.substring(fe, T - 1);
            }
            _ === "<" && !(f.sawRoot && f.closedRoot && !f.strict) ? (f.state = E.OPEN_WAKA, f.startTagPosition = f.position) : (!U(_) && (!f.sawRoot || f.closedRoot) && N(f, "Text data outside of root node."), _ === "&" ? f.state = E.TEXT_ENTITY : f.textNode += _);
            continue;
          case E.SCRIPT:
            _ === "<" ? f.state = E.SCRIPT_ENDING : f.script += _;
            continue;
          case E.SCRIPT_ENDING:
            _ === "/" ? f.state = E.CLOSE_TAG : (f.script += "<" + _, f.state = E.SCRIPT);
            continue;
          case E.OPEN_WAKA:
            if (_ === "!")
              f.state = E.SGML_DECL, f.sgmlDecl = "";
            else if (!U(_)) if (R(b, _))
              f.state = E.OPEN_TAG, f.tagName = _;
            else if (_ === "/")
              f.state = E.CLOSE_TAG, f.tagName = "";
            else if (_ === "?")
              f.state = E.PROC_INST, f.procInstName = f.procInstBody = "";
            else {
              if (N(f, "Unencoded <"), f.startTagPosition + 1 < f.position) {
                var ie = f.position - f.startTagPosition;
                _ = new Array(ie).join(" ") + _;
              }
              f.textNode += "<" + _, f.state = E.TEXT;
            }
            continue;
          case E.SGML_DECL:
            if (f.sgmlDecl + _ === "--") {
              f.state = E.COMMENT, f.comment = "", f.sgmlDecl = "";
              continue;
            }
            f.doctype && f.doctype !== !0 && f.sgmlDecl ? (f.state = E.DOCTYPE_DTD, f.doctype += "<!" + f.sgmlDecl + _, f.sgmlDecl = "") : d.test(f.sgmlDecl + _) ? (C(f, "onopencdata"), f.state = E.CDATA, f.sgmlDecl = "", f.cdata = "") : m.test(f.sgmlDecl + _) ? (f.state = E.DOCTYPE, (f.doctype || f.sawRoot) && N(
              f,
              "Inappropriately located doctype declaration"
            ), f.doctype = "", f.sgmlDecl = "") : _ === ">" ? (C(f, "onsgmldeclaration", f.sgmlDecl), f.sgmlDecl = "", f.state = E.TEXT) : (A(_) && (f.state = E.SGML_DECL_QUOTED), f.sgmlDecl += _);
            continue;
          case E.SGML_DECL_QUOTED:
            _ === f.q && (f.state = E.SGML_DECL, f.q = ""), f.sgmlDecl += _;
            continue;
          case E.DOCTYPE:
            _ === ">" ? (f.state = E.TEXT, C(f, "ondoctype", f.doctype), f.doctype = !0) : (f.doctype += _, _ === "[" ? f.state = E.DOCTYPE_DTD : A(_) && (f.state = E.DOCTYPE_QUOTED, f.q = _));
            continue;
          case E.DOCTYPE_QUOTED:
            f.doctype += _, _ === f.q && (f.q = "", f.state = E.DOCTYPE);
            continue;
          case E.DOCTYPE_DTD:
            _ === "]" ? (f.doctype += _, f.state = E.DOCTYPE) : _ === "<" ? (f.state = E.OPEN_WAKA, f.startTagPosition = f.position) : A(_) ? (f.doctype += _, f.state = E.DOCTYPE_DTD_QUOTED, f.q = _) : f.doctype += _;
            continue;
          case E.DOCTYPE_DTD_QUOTED:
            f.doctype += _, _ === f.q && (f.state = E.DOCTYPE_DTD, f.q = "");
            continue;
          case E.COMMENT:
            _ === "-" ? f.state = E.COMMENT_ENDING : f.comment += _;
            continue;
          case E.COMMENT_ENDING:
            _ === "-" ? (f.state = E.COMMENT_ENDED, f.comment = O(f.opt, f.comment), f.comment && C(f, "oncomment", f.comment), f.comment = "") : (f.comment += "-" + _, f.state = E.COMMENT);
            continue;
          case E.COMMENT_ENDED:
            _ !== ">" ? (N(f, "Malformed comment"), f.comment += "--" + _, f.state = E.COMMENT) : f.doctype && f.doctype !== !0 ? f.state = E.DOCTYPE_DTD : f.state = E.TEXT;
            continue;
          case E.CDATA:
            for (var fe = T - 1; _ && _ !== "]"; )
              _ = rn(h, T++), _ && f.trackPosition && (f.position++, _ === `
` ? (f.line++, f.column = 0) : f.column++);
            f.cdata += h.substring(fe, T - 1), _ === "]" && (f.state = E.CDATA_ENDING);
            continue;
          case E.CDATA_ENDING:
            _ === "]" ? f.state = E.CDATA_ENDING_2 : (f.cdata += "]" + _, f.state = E.CDATA);
            continue;
          case E.CDATA_ENDING_2:
            _ === ">" ? (f.cdata && C(f, "oncdata", f.cdata), C(f, "onclosecdata"), f.cdata = "", f.state = E.TEXT) : _ === "]" ? f.cdata += "]" : (f.cdata += "]]" + _, f.state = E.CDATA);
            continue;
          case E.PROC_INST:
            _ === "?" ? f.state = E.PROC_INST_ENDING : U(_) ? f.state = E.PROC_INST_BODY : f.procInstName += _;
            continue;
          case E.PROC_INST_BODY:
            if (!f.procInstBody && U(_))
              continue;
            _ === "?" ? f.state = E.PROC_INST_ENDING : f.procInstBody += _;
            continue;
          case E.PROC_INST_ENDING:
            if (_ === ">") {
              const Ve = {
                name: f.procInstName,
                body: f.procInstBody
              };
              J(f, Ve), C(f, "onprocessinginstruction", Ve), f.procInstName = f.procInstBody = "", f.state = E.TEXT;
            } else
              f.procInstBody += "?" + _, f.state = E.PROC_INST_BODY;
            continue;
          case E.OPEN_TAG:
            R(I, _) ? f.tagName += _ : (q(f), _ === ">" ? X(f) : _ === "/" ? f.state = E.OPEN_TAG_SLASH : (U(_) || N(f, "Invalid character in tag name"), f.state = E.ATTRIB));
            continue;
          case E.OPEN_TAG_SLASH:
            _ === ">" ? (X(f, !0), ne(f)) : (N(
              f,
              "Forward-slash in opening tag not followed by >"
            ), f.state = E.ATTRIB);
            continue;
          case E.ATTRIB:
            if (U(_))
              continue;
            _ === ">" ? X(f) : _ === "/" ? f.state = E.OPEN_TAG_SLASH : R(b, _) ? (f.attribName = _, f.attribValue = "", f.state = E.ATTRIB_NAME) : N(f, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME:
            _ === "=" ? f.state = E.ATTRIB_VALUE : _ === ">" ? (N(f, "Attribute without value"), f.attribValue = f.attribName, j(f), X(f)) : U(_) ? f.state = E.ATTRIB_NAME_SAW_WHITE : R(I, _) ? f.attribName += _ : N(f, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME_SAW_WHITE:
            if (_ === "=")
              f.state = E.ATTRIB_VALUE;
            else {
              if (U(_))
                continue;
              N(f, "Attribute without value"), f.tag.attributes[f.attribName] = "", f.attribValue = "", C(f, "onattribute", {
                name: f.attribName,
                value: ""
              }), f.attribName = "", _ === ">" ? X(f) : R(b, _) ? (f.attribName = _, f.state = E.ATTRIB_NAME) : (N(f, "Invalid attribute name"), f.state = E.ATTRIB);
            }
            continue;
          case E.ATTRIB_VALUE:
            if (U(_))
              continue;
            A(_) ? (f.q = _, f.state = E.ATTRIB_VALUE_QUOTED) : (f.opt.unquotedAttributeValues || L(f, "Unquoted attribute value"), f.state = E.ATTRIB_VALUE_UNQUOTED, f.attribValue = _);
            continue;
          case E.ATTRIB_VALUE_QUOTED:
            if (_ !== f.q) {
              _ === "&" ? f.state = E.ATTRIB_VALUE_ENTITY_Q : f.attribValue += _;
              continue;
            }
            j(f), f.q = "", f.state = E.ATTRIB_VALUE_CLOSED;
            continue;
          case E.ATTRIB_VALUE_CLOSED:
            U(_) ? f.state = E.ATTRIB : _ === ">" ? X(f) : _ === "/" ? f.state = E.OPEN_TAG_SLASH : R(b, _) ? (N(f, "No whitespace between attributes"), f.attribName = _, f.attribValue = "", f.state = E.ATTRIB_NAME) : N(f, "Invalid attribute name");
            continue;
          case E.ATTRIB_VALUE_UNQUOTED:
            if (!D(_)) {
              _ === "&" ? f.state = E.ATTRIB_VALUE_ENTITY_U : f.attribValue += _;
              continue;
            }
            j(f), _ === ">" ? X(f) : f.state = E.ATTRIB;
            continue;
          case E.CLOSE_TAG:
            if (f.tagName)
              _ === ">" ? ne(f) : R(I, _) ? f.tagName += _ : f.script ? (f.script += "</" + f.tagName + _, f.tagName = "", f.state = E.SCRIPT) : (U(_) || N(f, "Invalid tagname in closing tag"), f.state = E.CLOSE_TAG_SAW_WHITE);
            else {
              if (U(_))
                continue;
              $(b, _) ? f.script ? (f.script += "</" + _, f.state = E.SCRIPT) : N(f, "Invalid tagname in closing tag.") : f.tagName = _;
            }
            continue;
          case E.CLOSE_TAG_SAW_WHITE:
            if (U(_))
              continue;
            _ === ">" ? ne(f) : N(f, "Invalid characters in closing tag");
            continue;
          case E.TEXT_ENTITY:
          case E.ATTRIB_VALUE_ENTITY_Q:
          case E.ATTRIB_VALUE_ENTITY_U:
            var ge, Te;
            switch (f.state) {
              case E.TEXT_ENTITY:
                ge = E.TEXT, Te = "textNode";
                break;
              case E.ATTRIB_VALUE_ENTITY_Q:
                ge = E.ATTRIB_VALUE_QUOTED, Te = "attribValue";
                break;
              case E.ATTRIB_VALUE_ENTITY_U:
                ge = E.ATTRIB_VALUE_UNQUOTED, Te = "attribValue";
                break;
            }
            if (_ === ";") {
              var Ce = te(f);
              f.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(Ce) ? ((f.entityCount += 1) > f.opt.maxEntityCount && L(
                f,
                "Parsed entity count exceeds max entity count"
              ), (f.entityDepth += 1) > f.opt.maxEntityDepth && L(
                f,
                "Parsed entity depth exceeds max entity depth"
              ), f.entity = "", f.state = ge, f.write(Ce), f.entityDepth -= 1) : (f[Te] += Ce, f.entity = "", f.state = ge);
            } else R(f.entity.length ? k : M, _) ? f.entity += _ : (N(f, "Invalid character in entity name"), f[Te] += "&" + f.entity + _, f.entity = "", f.state = ge);
            continue;
          default:
            throw new Error(f, "Unknown state: " + f.state);
        }
      return f.position >= f.bufferCheckPosition && i(f), f;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var h = String.fromCharCode, f = Math.floor, T = function() {
        var _ = 16384, ie = [], fe, ge, Te = -1, Ce = arguments.length;
        if (!Ce)
          return "";
        for (var Ve = ""; ++Te < Ce; ) {
          var Ee = Number(arguments[Te]);
          if (!isFinite(Ee) || // `NaN`, `+Infinity`, or `-Infinity`
          Ee < 0 || // not a valid Unicode code point
          Ee > 1114111 || // not a valid Unicode code point
          f(Ee) !== Ee)
            throw RangeError("Invalid code point: " + Ee);
          Ee <= 65535 ? ie.push(Ee) : (Ee -= 65536, fe = (Ee >> 10) + 55296, ge = Ee % 1024 + 56320, ie.push(fe, ge)), (Te + 1 === Ce || ie.length > _) && (Ve += h.apply(null, ie), ie.length = 0);
        }
        return Ve;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: T,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = T;
    }();
  })(e);
})(Ic);
Object.defineProperty(mr, "__esModule", { value: !0 });
mr.XElement = void 0;
mr.parseXml = kh;
const Fh = Ic, jr = In;
class Dc {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, jr.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!Uh(t))
      throw (0, jr.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const n = this.attributes === null ? null : this.attributes[t];
    if (n == null)
      throw (0, jr.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return n;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, n = !1, r = null) {
    const i = this.elementOrNull(t, n);
    if (i === null)
      throw (0, jr.newError)(r || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, n = !1) {
    if (this.elements === null)
      return null;
    for (const r of this.elements)
      if ($a(r, t, n))
        return r;
    return null;
  }
  getElements(t, n = !1) {
    return this.elements === null ? [] : this.elements.filter((r) => $a(r, t, n));
  }
  elementValueOrEmpty(t, n = !1) {
    const r = this.elementOrNull(t, n);
    return r === null ? "" : r.value;
  }
}
mr.XElement = Dc;
const Lh = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function Uh(e) {
  return Lh.test(e);
}
function $a(e, t, n) {
  const r = e.name;
  return r === t || n === !0 && r.length === t.length && r.toLowerCase() === t.toLowerCase();
}
function kh(e) {
  let t = null;
  const n = Fh.parser(!0, {}), r = [];
  return n.onopentag = (i) => {
    const o = new Dc(i.name);
    if (o.attributes = i.attributes, t === null)
      t = o;
    else {
      const s = r[r.length - 1];
      s.elements == null && (s.elements = []), s.elements.push(o);
    }
    r.push(o);
  }, n.onclosetag = () => {
    r.pop();
  }, n.ontext = (i) => {
    r.length > 0 && (r[r.length - 1].value = i);
  }, n.oncdata = (i) => {
    const o = r[r.length - 1];
    o.value = i, o.isCData = !0;
  }, n.onerror = (i) => {
    throw i;
  }, n.write(e), t;
}
var Ci = {};
Object.defineProperty(Ci, "__esModule", { value: !0 });
Ci.MemoLazy = void 0;
class Mh {
  constructor(t, n) {
    this.selector = t, this.creator = n, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && Oc(this.selected, t))
      return this._value;
    this.selected = t;
    const n = this.creator(t);
    return this.value = n, n;
  }
  set value(t) {
    this._value = t;
  }
}
Ci.MemoLazy = Mh;
function Oc(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((s) => Oc(e[s], t[s]));
  }
  return e === t;
}
var Es = {};
Object.defineProperty(Es, "__esModule", { value: !0 });
Es.retry = Rc;
const jh = Pt;
async function Rc(e, t, n, r = 0, i = 0, o) {
  var s;
  const a = new jh.CancellationToken();
  try {
    return await e();
  } catch (l) {
    if ((!((s = o == null ? void 0 : o(l)) !== null && s !== void 0) || s) && t > 0 && !a.cancelled)
      return await new Promise((p) => setTimeout(p, n + r * i)), await Rc(e, t - 1, n, r, i + 1, o);
    throw l;
  }
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.retry = e.MemoLazy = e.newError = e.XElement = e.parseXml = e.ProgressCallbackTransform = e.UUID = e.parseDn = e.githubUrl = e.getS3LikeProviderBaseUrl = e.configureRequestUrl = e.parseJson = e.safeStringifyJson = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.safeGetHeader = e.DigestTransform = e.HttpExecutor = e.createHttpError = e.HttpError = e.CancellationError = e.CancellationToken = void 0, e.asArray = u;
  var t = Pt;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } });
  var n = Pe;
  Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return n.HttpError;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return n.createHttpError;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return n.HttpExecutor;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return n.DigestTransform;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return n.safeGetHeader;
  } }), Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return n.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return n.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return n.safeStringifyJson;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return n.parseJson;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return n.configureRequestUrl;
  } });
  var r = Ti;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return r.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return r.githubUrl;
  } });
  var i = ys;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return i.parseDn;
  } });
  var o = bn;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return o.UUID;
  } });
  var s = pr;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return s.ProgressCallbackTransform;
  } });
  var a = mr;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return a.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return a.XElement;
  } });
  var l = In;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return l.newError;
  } });
  var p = Ci;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return p.MemoLazy;
  } });
  var c = Es;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return c.retry;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function u(d) {
    return d == null ? [] : Array.isArray(d) ? d : [d];
  }
})(_e);
var Zt = {}, Fe = {};
Fe.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((n, r) => {
        t.push((i, o) => i != null ? r(i) : n(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
Fe.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const n = t[t.length - 1];
    if (typeof n != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((r) => n(null, r), n);
  }, "name", { value: e.name });
};
var At = th, Bh = process.cwd, ei = null, Hh = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return ei || (ei = Bh.call(process)), ei;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Ia = process.chdir;
  process.chdir = function(e) {
    ei = null, Ia.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Ia);
}
var qh = Gh;
function Gh(e) {
  At.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || n(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = r(e.chmod), e.fchmod = r(e.fchmod), e.lchmod = r(e.lchmod), e.chownSync = s(e.chownSync), e.fchownSync = s(e.fchownSync), e.lchownSync = s(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = a(e.stat), e.fstat = a(e.fstat), e.lstat = a(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(c, u, d) {
    d && process.nextTick(d);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(c, u, d, m) {
    m && process.nextTick(m);
  }, e.lchownSync = function() {
  }), Hh === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(c) {
    function u(d, m, w) {
      var y = Date.now(), v = 0;
      c(d, m, function b(I) {
        if (I && (I.code === "EACCES" || I.code === "EPERM" || I.code === "EBUSY") && Date.now() - y < 6e4) {
          setTimeout(function() {
            e.stat(m, function(M, k) {
              M && M.code === "ENOENT" ? c(d, m, b) : w(I);
            });
          }, v), v < 100 && (v += 10);
          return;
        }
        w && w(I);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, c), u;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(c) {
    function u(d, m, w, y, v, b) {
      var I;
      if (b && typeof b == "function") {
        var M = 0;
        I = function(k, U, A) {
          if (k && k.code === "EAGAIN" && M < 10)
            return M++, c.call(e, d, m, w, y, v, I);
          b.apply(this, arguments);
        };
      }
      return c.call(e, d, m, w, y, v, I);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, c), u;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(c) {
    return function(u, d, m, w, y) {
      for (var v = 0; ; )
        try {
          return c.call(e, u, d, m, w, y);
        } catch (b) {
          if (b.code === "EAGAIN" && v < 10) {
            v++;
            continue;
          }
          throw b;
        }
    };
  }(e.readSync);
  function t(c) {
    c.lchmod = function(u, d, m) {
      c.open(
        u,
        At.O_WRONLY | At.O_SYMLINK,
        d,
        function(w, y) {
          if (w) {
            m && m(w);
            return;
          }
          c.fchmod(y, d, function(v) {
            c.close(y, function(b) {
              m && m(v || b);
            });
          });
        }
      );
    }, c.lchmodSync = function(u, d) {
      var m = c.openSync(u, At.O_WRONLY | At.O_SYMLINK, d), w = !0, y;
      try {
        y = c.fchmodSync(m, d), w = !1;
      } finally {
        if (w)
          try {
            c.closeSync(m);
          } catch {
          }
        else
          c.closeSync(m);
      }
      return y;
    };
  }
  function n(c) {
    At.hasOwnProperty("O_SYMLINK") && c.futimes ? (c.lutimes = function(u, d, m, w) {
      c.open(u, At.O_SYMLINK, function(y, v) {
        if (y) {
          w && w(y);
          return;
        }
        c.futimes(v, d, m, function(b) {
          c.close(v, function(I) {
            w && w(b || I);
          });
        });
      });
    }, c.lutimesSync = function(u, d, m) {
      var w = c.openSync(u, At.O_SYMLINK), y, v = !0;
      try {
        y = c.futimesSync(w, d, m), v = !1;
      } finally {
        if (v)
          try {
            c.closeSync(w);
          } catch {
          }
        else
          c.closeSync(w);
      }
      return y;
    }) : c.futimes && (c.lutimes = function(u, d, m, w) {
      w && process.nextTick(w);
    }, c.lutimesSync = function() {
    });
  }
  function r(c) {
    return c && function(u, d, m) {
      return c.call(e, u, d, function(w) {
        p(w) && (w = null), m && m.apply(this, arguments);
      });
    };
  }
  function i(c) {
    return c && function(u, d) {
      try {
        return c.call(e, u, d);
      } catch (m) {
        if (!p(m)) throw m;
      }
    };
  }
  function o(c) {
    return c && function(u, d, m, w) {
      return c.call(e, u, d, m, function(y) {
        p(y) && (y = null), w && w.apply(this, arguments);
      });
    };
  }
  function s(c) {
    return c && function(u, d, m) {
      try {
        return c.call(e, u, d, m);
      } catch (w) {
        if (!p(w)) throw w;
      }
    };
  }
  function a(c) {
    return c && function(u, d, m) {
      typeof d == "function" && (m = d, d = null);
      function w(y, v) {
        v && (v.uid < 0 && (v.uid += 4294967296), v.gid < 0 && (v.gid += 4294967296)), m && m.apply(this, arguments);
      }
      return d ? c.call(e, u, d, w) : c.call(e, u, w);
    };
  }
  function l(c) {
    return c && function(u, d) {
      var m = d ? c.call(e, u, d) : c.call(e, u);
      return m && (m.uid < 0 && (m.uid += 4294967296), m.gid < 0 && (m.gid += 4294967296)), m;
    };
  }
  function p(c) {
    if (!c || c.code === "ENOSYS")
      return !0;
    var u = !process.getuid || process.getuid() !== 0;
    return !!(u && (c.code === "EINVAL" || c.code === "EPERM"));
  }
}
var Da = nt.Stream, zh = Wh;
function Wh(e) {
  return {
    ReadStream: t,
    WriteStream: n
  };
  function t(r, i) {
    if (!(this instanceof t)) return new t(r, i);
    Da.call(this);
    var o = this;
    this.path = r, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var s = Object.keys(i), a = 0, l = s.length; a < l; a++) {
      var p = s[a];
      this[p] = i[p];
    }
    if (this.encoding && this.setEncoding(this.encoding), this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.end === void 0)
        this.end = 1 / 0;
      else if (typeof this.end != "number")
        throw TypeError("end must be a Number");
      if (this.start > this.end)
        throw new Error("start must be <= end");
      this.pos = this.start;
    }
    if (this.fd !== null) {
      process.nextTick(function() {
        o._read();
      });
      return;
    }
    e.open(this.path, this.flags, this.mode, function(c, u) {
      if (c) {
        o.emit("error", c), o.readable = !1;
        return;
      }
      o.fd = u, o.emit("open", u), o._read();
    });
  }
  function n(r, i) {
    if (!(this instanceof n)) return new n(r, i);
    Da.call(this), this.path = r, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var o = Object.keys(i), s = 0, a = o.length; s < a; s++) {
      var l = o[s];
      this[l] = i[l];
    }
    if (this.start !== void 0) {
      if (typeof this.start != "number")
        throw TypeError("start must be a Number");
      if (this.start < 0)
        throw new Error("start must be >= zero");
      this.pos = this.start;
    }
    this.busy = !1, this._queue = [], this.fd === null && (this._open = e.open, this._queue.push([this._open, this.path, this.flags, this.mode, void 0]), this.flush());
  }
}
var Vh = Xh, Yh = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Xh(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Yh(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(n) {
    Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
  }), t;
}
var he = tt, Jh = qh, Kh = zh, Qh = Vh, Br = Cn, Se, fi;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Se = Symbol.for("graceful-fs.queue"), fi = Symbol.for("graceful-fs.previous")) : (Se = "___graceful-fs.queue", fi = "___graceful-fs.previous");
function Zh() {
}
function Pc(e, t) {
  Object.defineProperty(e, Se, {
    get: function() {
      return t;
    }
  });
}
var Jt = Zh;
Br.debuglog ? Jt = Br.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (Jt = function() {
  var e = Br.format.apply(Br, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!he[Se]) {
  var ep = ze[Se] || [];
  Pc(he, ep), he.close = function(e) {
    function t(n, r) {
      return e.call(he, n, function(i) {
        i || Oa(), typeof r == "function" && r.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, fi, {
      value: e
    }), t;
  }(he.close), he.closeSync = function(e) {
    function t(n) {
      e.apply(he, arguments), Oa();
    }
    return Object.defineProperty(t, fi, {
      value: e
    }), t;
  }(he.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    Jt(he[Se]), vc.equal(he[Se].length, 0);
  });
}
ze[Se] || Pc(ze, he[Se]);
var Le = ws(Qh(he));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !he.__patched && (Le = ws(he), he.__patched = !0);
function ws(e) {
  Jh(e), e.gracefulify = ws, e.createReadStream = U, e.createWriteStream = A;
  var t = e.readFile;
  e.readFile = n;
  function n($, E, z) {
    return typeof E == "function" && (z = E, E = null), Q($, E, z);
    function Q(ee, K, H, J) {
      return t(ee, K, function(C) {
        C && (C.code === "EMFILE" || C.code === "ENFILE") ? an([Q, [ee, K, H], C, J || Date.now(), Date.now()]) : typeof H == "function" && H.apply(this, arguments);
      });
    }
  }
  var r = e.writeFile;
  e.writeFile = i;
  function i($, E, z, Q) {
    return typeof z == "function" && (Q = z, z = null), ee($, E, z, Q);
    function ee(K, H, J, C, S) {
      return r(K, H, J, function(O) {
        O && (O.code === "EMFILE" || O.code === "ENFILE") ? an([ee, [K, H, J, C], O, S || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = s);
  function s($, E, z, Q) {
    return typeof z == "function" && (Q = z, z = null), ee($, E, z, Q);
    function ee(K, H, J, C, S) {
      return o(K, H, J, function(O) {
        O && (O.code === "EMFILE" || O.code === "ENFILE") ? an([ee, [K, H, J, C], O, S || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  var a = e.copyFile;
  a && (e.copyFile = l);
  function l($, E, z, Q) {
    return typeof z == "function" && (Q = z, z = 0), ee($, E, z, Q);
    function ee(K, H, J, C, S) {
      return a(K, H, J, function(O) {
        O && (O.code === "EMFILE" || O.code === "ENFILE") ? an([ee, [K, H, J, C], O, S || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  var p = e.readdir;
  e.readdir = u;
  var c = /^v[0-5]\./;
  function u($, E, z) {
    typeof E == "function" && (z = E, E = null);
    var Q = c.test(process.version) ? function(H, J, C, S) {
      return p(H, ee(
        H,
        J,
        C,
        S
      ));
    } : function(H, J, C, S) {
      return p(H, J, ee(
        H,
        J,
        C,
        S
      ));
    };
    return Q($, E, z);
    function ee(K, H, J, C) {
      return function(S, O) {
        S && (S.code === "EMFILE" || S.code === "ENFILE") ? an([
          Q,
          [K, H, J],
          S,
          C || Date.now(),
          Date.now()
        ]) : (O && O.sort && O.sort(), typeof J == "function" && J.call(this, S, O));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var d = Kh(e);
    b = d.ReadStream, M = d.WriteStream;
  }
  var m = e.ReadStream;
  m && (b.prototype = Object.create(m.prototype), b.prototype.open = I);
  var w = e.WriteStream;
  w && (M.prototype = Object.create(w.prototype), M.prototype.open = k), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return b;
    },
    set: function($) {
      b = $;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return M;
    },
    set: function($) {
      M = $;
    },
    enumerable: !0,
    configurable: !0
  });
  var y = b;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return y;
    },
    set: function($) {
      y = $;
    },
    enumerable: !0,
    configurable: !0
  });
  var v = M;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return v;
    },
    set: function($) {
      v = $;
    },
    enumerable: !0,
    configurable: !0
  });
  function b($, E) {
    return this instanceof b ? (m.apply(this, arguments), this) : b.apply(Object.create(b.prototype), arguments);
  }
  function I() {
    var $ = this;
    R($.path, $.flags, $.mode, function(E, z) {
      E ? ($.autoClose && $.destroy(), $.emit("error", E)) : ($.fd = z, $.emit("open", z), $.read());
    });
  }
  function M($, E) {
    return this instanceof M ? (w.apply(this, arguments), this) : M.apply(Object.create(M.prototype), arguments);
  }
  function k() {
    var $ = this;
    R($.path, $.flags, $.mode, function(E, z) {
      E ? ($.destroy(), $.emit("error", E)) : ($.fd = z, $.emit("open", z));
    });
  }
  function U($, E) {
    return new e.ReadStream($, E);
  }
  function A($, E) {
    return new e.WriteStream($, E);
  }
  var D = e.open;
  e.open = R;
  function R($, E, z, Q) {
    return typeof z == "function" && (Q = z, z = null), ee($, E, z, Q);
    function ee(K, H, J, C, S) {
      return D(K, H, J, function(O, L) {
        O && (O.code === "EMFILE" || O.code === "ENFILE") ? an([ee, [K, H, J, C], O, S || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  return e;
}
function an(e) {
  Jt("ENQUEUE", e[0].name, e[1]), he[Se].push(e), vs();
}
var Hr;
function Oa() {
  for (var e = Date.now(), t = 0; t < he[Se].length; ++t)
    he[Se][t].length > 2 && (he[Se][t][3] = e, he[Se][t][4] = e);
  vs();
}
function vs() {
  if (clearTimeout(Hr), Hr = void 0, he[Se].length !== 0) {
    var e = he[Se].shift(), t = e[0], n = e[1], r = e[2], i = e[3], o = e[4];
    if (i === void 0)
      Jt("RETRY", t.name, n), t.apply(null, n);
    else if (Date.now() - i >= 6e4) {
      Jt("TIMEOUT", t.name, n);
      var s = n.pop();
      typeof s == "function" && s.call(null, r);
    } else {
      var a = Date.now() - o, l = Math.max(o - i, 1), p = Math.min(l * 1.2, 100);
      a >= p ? (Jt("RETRY", t.name, n), t.apply(null, n.concat([i]))) : he[Se].push(e);
    }
    Hr === void 0 && (Hr = setTimeout(vs, 0));
  }
}
(function(e) {
  const t = Fe.fromCallback, n = Le, r = [
    "access",
    "appendFile",
    "chmod",
    "chown",
    "close",
    "copyFile",
    "fchmod",
    "fchown",
    "fdatasync",
    "fstat",
    "fsync",
    "ftruncate",
    "futimes",
    "lchmod",
    "lchown",
    "link",
    "lstat",
    "mkdir",
    "mkdtemp",
    "open",
    "opendir",
    "readdir",
    "readFile",
    "readlink",
    "realpath",
    "rename",
    "rm",
    "rmdir",
    "stat",
    "symlink",
    "truncate",
    "unlink",
    "utimes",
    "writeFile"
  ].filter((i) => typeof n[i] == "function");
  Object.assign(e, n), r.forEach((i) => {
    e[i] = t(n[i]);
  }), e.exists = function(i, o) {
    return typeof o == "function" ? n.exists(i, o) : new Promise((s) => n.exists(i, s));
  }, e.read = function(i, o, s, a, l, p) {
    return typeof p == "function" ? n.read(i, o, s, a, l, p) : new Promise((c, u) => {
      n.read(i, o, s, a, l, (d, m, w) => {
        if (d) return u(d);
        c({ bytesRead: m, buffer: w });
      });
    });
  }, e.write = function(i, o, ...s) {
    return typeof s[s.length - 1] == "function" ? n.write(i, o, ...s) : new Promise((a, l) => {
      n.write(i, o, ...s, (p, c, u) => {
        if (p) return l(p);
        a({ bytesWritten: c, buffer: u });
      });
    });
  }, typeof n.writev == "function" && (e.writev = function(i, o, ...s) {
    return typeof s[s.length - 1] == "function" ? n.writev(i, o, ...s) : new Promise((a, l) => {
      n.writev(i, o, ...s, (p, c, u) => {
        if (p) return l(p);
        a({ bytesWritten: c, buffers: u });
      });
    });
  }), typeof n.realpath.native == "function" ? e.realpath.native = t(n.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(Zt);
var _s = {}, Nc = {};
const tp = ue;
Nc.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(tp.parse(t).root, ""))) {
    const r = new Error(`Path contains invalid characters: ${t}`);
    throw r.code = "EINVAL", r;
  }
};
const Fc = Zt, { checkPath: Lc } = Nc, Uc = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
_s.makeDir = async (e, t) => (Lc(e), Fc.mkdir(e, {
  mode: Uc(t),
  recursive: !0
}));
_s.makeDirSync = (e, t) => (Lc(e), Fc.mkdirSync(e, {
  mode: Uc(t),
  recursive: !0
}));
const np = Fe.fromPromise, { makeDir: rp, makeDirSync: Eo } = _s, wo = np(rp);
var ut = {
  mkdirs: wo,
  mkdirsSync: Eo,
  // alias
  mkdirp: wo,
  mkdirpSync: Eo,
  ensureDir: wo,
  ensureDirSync: Eo
};
const ip = Fe.fromPromise, kc = Zt;
function op(e) {
  return kc.access(e).then(() => !0).catch(() => !1);
}
var en = {
  pathExists: ip(op),
  pathExistsSync: kc.existsSync
};
const En = Le;
function sp(e, t, n, r) {
  En.open(e, "r+", (i, o) => {
    if (i) return r(i);
    En.futimes(o, t, n, (s) => {
      En.close(o, (a) => {
        r && r(s || a);
      });
    });
  });
}
function ap(e, t, n) {
  const r = En.openSync(e, "r+");
  return En.futimesSync(r, t, n), En.closeSync(r);
}
var Mc = {
  utimesMillis: sp,
  utimesMillisSync: ap
};
const Sn = Zt, ve = ue, lp = Cn;
function cp(e, t, n) {
  const r = n.dereference ? (i) => Sn.stat(i, { bigint: !0 }) : (i) => Sn.lstat(i, { bigint: !0 });
  return Promise.all([
    r(e),
    r(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function up(e, t, n) {
  let r;
  const i = n.dereference ? (s) => Sn.statSync(s, { bigint: !0 }) : (s) => Sn.lstatSync(s, { bigint: !0 }), o = i(e);
  try {
    r = i(t);
  } catch (s) {
    if (s.code === "ENOENT") return { srcStat: o, destStat: null };
    throw s;
  }
  return { srcStat: o, destStat: r };
}
function fp(e, t, n, r, i) {
  lp.callbackify(cp)(e, t, r, (o, s) => {
    if (o) return i(o);
    const { srcStat: a, destStat: l } = s;
    if (l) {
      if (gr(a, l)) {
        const p = ve.basename(e), c = ve.basename(t);
        return n === "move" && p !== c && p.toLowerCase() === c.toLowerCase() ? i(null, { srcStat: a, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (a.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!a.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return a.isDirectory() && xs(e, t) ? i(new Error($i(e, t, n))) : i(null, { srcStat: a, destStat: l });
  });
}
function dp(e, t, n, r) {
  const { srcStat: i, destStat: o } = up(e, t, r);
  if (o) {
    if (gr(i, o)) {
      const s = ve.basename(e), a = ve.basename(t);
      if (n === "move" && s !== a && s.toLowerCase() === a.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && xs(e, t))
    throw new Error($i(e, t, n));
  return { srcStat: i, destStat: o };
}
function jc(e, t, n, r, i) {
  const o = ve.resolve(ve.dirname(e)), s = ve.resolve(ve.dirname(n));
  if (s === o || s === ve.parse(s).root) return i();
  Sn.stat(s, { bigint: !0 }, (a, l) => a ? a.code === "ENOENT" ? i() : i(a) : gr(t, l) ? i(new Error($i(e, n, r))) : jc(e, t, s, r, i));
}
function Bc(e, t, n, r) {
  const i = ve.resolve(ve.dirname(e)), o = ve.resolve(ve.dirname(n));
  if (o === i || o === ve.parse(o).root) return;
  let s;
  try {
    s = Sn.statSync(o, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (gr(t, s))
    throw new Error($i(e, n, r));
  return Bc(e, t, o, r);
}
function gr(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function xs(e, t) {
  const n = ve.resolve(e).split(ve.sep).filter((i) => i), r = ve.resolve(t).split(ve.sep).filter((i) => i);
  return n.reduce((i, o, s) => i && r[s] === o, !0);
}
function $i(e, t, n) {
  return `Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Dn = {
  checkPaths: fp,
  checkPathsSync: dp,
  checkParentPaths: jc,
  checkParentPathsSync: Bc,
  isSrcSubdir: xs,
  areIdentical: gr
};
const Me = Le, rr = ue, hp = ut.mkdirs, pp = en.pathExists, mp = Mc.utimesMillis, ir = Dn;
function gp(e, t, n, r) {
  typeof n == "function" && !r ? (r = n, n = {}) : typeof n == "function" && (n = { filter: n }), r = r || function() {
  }, n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), ir.checkPaths(e, t, "copy", n, (i, o) => {
    if (i) return r(i);
    const { srcStat: s, destStat: a } = o;
    ir.checkParentPaths(e, s, t, "copy", (l) => l ? r(l) : n.filter ? Hc(Ra, a, e, t, n, r) : Ra(a, e, t, n, r));
  });
}
function Ra(e, t, n, r, i) {
  const o = rr.dirname(n);
  pp(o, (s, a) => {
    if (s) return i(s);
    if (a) return di(e, t, n, r, i);
    hp(o, (l) => l ? i(l) : di(e, t, n, r, i));
  });
}
function Hc(e, t, n, r, i, o) {
  Promise.resolve(i.filter(n, r)).then((s) => s ? e(t, n, r, i, o) : o(), (s) => o(s));
}
function yp(e, t, n, r, i) {
  return r.filter ? Hc(di, e, t, n, r, i) : di(e, t, n, r, i);
}
function di(e, t, n, r, i) {
  (r.dereference ? Me.stat : Me.lstat)(t, (s, a) => s ? i(s) : a.isDirectory() ? Sp(a, e, t, n, r, i) : a.isFile() || a.isCharacterDevice() || a.isBlockDevice() ? Ep(a, e, t, n, r, i) : a.isSymbolicLink() ? Cp(e, t, n, r, i) : a.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : a.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function Ep(e, t, n, r, i, o) {
  return t ? wp(e, n, r, i, o) : qc(e, n, r, i, o);
}
function wp(e, t, n, r, i) {
  if (r.overwrite)
    Me.unlink(n, (o) => o ? i(o) : qc(e, t, n, r, i));
  else return r.errorOnExist ? i(new Error(`'${n}' already exists`)) : i();
}
function qc(e, t, n, r, i) {
  Me.copyFile(t, n, (o) => o ? i(o) : r.preserveTimestamps ? vp(e.mode, t, n, i) : Ii(n, e.mode, i));
}
function vp(e, t, n, r) {
  return _p(e) ? xp(n, e, (i) => i ? r(i) : Pa(e, t, n, r)) : Pa(e, t, n, r);
}
function _p(e) {
  return (e & 128) === 0;
}
function xp(e, t, n) {
  return Ii(e, t | 128, n);
}
function Pa(e, t, n, r) {
  bp(t, n, (i) => i ? r(i) : Ii(n, e, r));
}
function Ii(e, t, n) {
  return Me.chmod(e, t, n);
}
function bp(e, t, n) {
  Me.stat(e, (r, i) => r ? n(r) : mp(t, i.atime, i.mtime, n));
}
function Sp(e, t, n, r, i, o) {
  return t ? Gc(n, r, i, o) : Ap(e.mode, n, r, i, o);
}
function Ap(e, t, n, r, i) {
  Me.mkdir(n, (o) => {
    if (o) return i(o);
    Gc(t, n, r, (s) => s ? i(s) : Ii(n, e, i));
  });
}
function Gc(e, t, n, r) {
  Me.readdir(e, (i, o) => i ? r(i) : zc(o, e, t, n, r));
}
function zc(e, t, n, r, i) {
  const o = e.pop();
  return o ? Tp(e, o, t, n, r, i) : i();
}
function Tp(e, t, n, r, i, o) {
  const s = rr.join(n, t), a = rr.join(r, t);
  ir.checkPaths(s, a, "copy", i, (l, p) => {
    if (l) return o(l);
    const { destStat: c } = p;
    yp(c, s, a, i, (u) => u ? o(u) : zc(e, n, r, i, o));
  });
}
function Cp(e, t, n, r, i) {
  Me.readlink(t, (o, s) => {
    if (o) return i(o);
    if (r.dereference && (s = rr.resolve(process.cwd(), s)), e)
      Me.readlink(n, (a, l) => a ? a.code === "EINVAL" || a.code === "UNKNOWN" ? Me.symlink(s, n, i) : i(a) : (r.dereference && (l = rr.resolve(process.cwd(), l)), ir.isSrcSubdir(s, l) ? i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && ir.isSrcSubdir(l, s) ? i(new Error(`Cannot overwrite '${l}' with '${s}'.`)) : $p(s, n, i)));
    else
      return Me.symlink(s, n, i);
  });
}
function $p(e, t, n) {
  Me.unlink(t, (r) => r ? n(r) : Me.symlink(e, t, n));
}
var Ip = gp;
const Ie = Le, or = ue, Dp = ut.mkdirsSync, Op = Mc.utimesMillisSync, sr = Dn;
function Rp(e, t, n) {
  typeof n == "function" && (n = { filter: n }), n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: r, destStat: i } = sr.checkPathsSync(e, t, "copy", n);
  return sr.checkParentPathsSync(e, r, t, "copy"), Pp(i, e, t, n);
}
function Pp(e, t, n, r) {
  if (r.filter && !r.filter(t, n)) return;
  const i = or.dirname(n);
  return Ie.existsSync(i) || Dp(i), Wc(e, t, n, r);
}
function Np(e, t, n, r) {
  if (!(r.filter && !r.filter(t, n)))
    return Wc(e, t, n, r);
}
function Wc(e, t, n, r) {
  const o = (r.dereference ? Ie.statSync : Ie.lstatSync)(t);
  if (o.isDirectory()) return Bp(o, e, t, n, r);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return Fp(o, e, t, n, r);
  if (o.isSymbolicLink()) return Gp(e, t, n, r);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function Fp(e, t, n, r, i) {
  return t ? Lp(e, n, r, i) : Vc(e, n, r, i);
}
function Lp(e, t, n, r) {
  if (r.overwrite)
    return Ie.unlinkSync(n), Vc(e, t, n, r);
  if (r.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
function Vc(e, t, n, r) {
  return Ie.copyFileSync(t, n), r.preserveTimestamps && Up(e.mode, t, n), bs(n, e.mode);
}
function Up(e, t, n) {
  return kp(e) && Mp(n, e), jp(t, n);
}
function kp(e) {
  return (e & 128) === 0;
}
function Mp(e, t) {
  return bs(e, t | 128);
}
function bs(e, t) {
  return Ie.chmodSync(e, t);
}
function jp(e, t) {
  const n = Ie.statSync(e);
  return Op(t, n.atime, n.mtime);
}
function Bp(e, t, n, r, i) {
  return t ? Yc(n, r, i) : Hp(e.mode, n, r, i);
}
function Hp(e, t, n, r) {
  return Ie.mkdirSync(n), Yc(t, n, r), bs(n, e);
}
function Yc(e, t, n) {
  Ie.readdirSync(e).forEach((r) => qp(r, e, t, n));
}
function qp(e, t, n, r) {
  const i = or.join(t, e), o = or.join(n, e), { destStat: s } = sr.checkPathsSync(i, o, "copy", r);
  return Np(s, i, o, r);
}
function Gp(e, t, n, r) {
  let i = Ie.readlinkSync(t);
  if (r.dereference && (i = or.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = Ie.readlinkSync(n);
    } catch (s) {
      if (s.code === "EINVAL" || s.code === "UNKNOWN") return Ie.symlinkSync(i, n);
      throw s;
    }
    if (r.dereference && (o = or.resolve(process.cwd(), o)), sr.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (Ie.statSync(n).isDirectory() && sr.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return zp(i, n);
  } else
    return Ie.symlinkSync(i, n);
}
function zp(e, t) {
  return Ie.unlinkSync(t), Ie.symlinkSync(e, t);
}
var Wp = Rp;
const Vp = Fe.fromCallback;
var Ss = {
  copy: Vp(Ip),
  copySync: Wp
};
const Na = Le, Xc = ue, ae = vc, ar = process.platform === "win32";
function Jc(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((n) => {
    e[n] = e[n] || Na[n], n = n + "Sync", e[n] = e[n] || Na[n];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function As(e, t, n) {
  let r = 0;
  typeof t == "function" && (n = t, t = {}), ae(e, "rimraf: missing path"), ae.strictEqual(typeof e, "string", "rimraf: path should be a string"), ae.strictEqual(typeof n, "function", "rimraf: callback function required"), ae(t, "rimraf: invalid options argument provided"), ae.strictEqual(typeof t, "object", "rimraf: options should be object"), Jc(t), Fa(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && r < t.maxBusyTries) {
        r++;
        const s = r * 100;
        return setTimeout(() => Fa(e, t, i), s);
      }
      o.code === "ENOENT" && (o = null);
    }
    n(o);
  });
}
function Fa(e, t, n) {
  ae(e), ae(t), ae(typeof n == "function"), t.lstat(e, (r, i) => {
    if (r && r.code === "ENOENT")
      return n(null);
    if (r && r.code === "EPERM" && ar)
      return La(e, t, r, n);
    if (i && i.isDirectory())
      return ti(e, t, r, n);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return n(null);
        if (o.code === "EPERM")
          return ar ? La(e, t, o, n) : ti(e, t, o, n);
        if (o.code === "EISDIR")
          return ti(e, t, o, n);
      }
      return n(o);
    });
  });
}
function La(e, t, n, r) {
  ae(e), ae(t), ae(typeof r == "function"), t.chmod(e, 438, (i) => {
    i ? r(i.code === "ENOENT" ? null : n) : t.stat(e, (o, s) => {
      o ? r(o.code === "ENOENT" ? null : n) : s.isDirectory() ? ti(e, t, n, r) : t.unlink(e, r);
    });
  });
}
function Ua(e, t, n) {
  let r;
  ae(e), ae(t);
  try {
    t.chmodSync(e, 438);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw n;
  }
  try {
    r = t.statSync(e);
  } catch (i) {
    if (i.code === "ENOENT")
      return;
    throw n;
  }
  r.isDirectory() ? ni(e, t, n) : t.unlinkSync(e);
}
function ti(e, t, n, r) {
  ae(e), ae(t), ae(typeof r == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? Yp(e, t, r) : i && i.code === "ENOTDIR" ? r(n) : r(i);
  });
}
function Yp(e, t, n) {
  ae(e), ae(t), ae(typeof n == "function"), t.readdir(e, (r, i) => {
    if (r) return n(r);
    let o = i.length, s;
    if (o === 0) return t.rmdir(e, n);
    i.forEach((a) => {
      As(Xc.join(e, a), t, (l) => {
        if (!s) {
          if (l) return n(s = l);
          --o === 0 && t.rmdir(e, n);
        }
      });
    });
  });
}
function Kc(e, t) {
  let n;
  t = t || {}, Jc(t), ae(e, "rimraf: missing path"), ae.strictEqual(typeof e, "string", "rimraf: path should be a string"), ae(t, "rimraf: missing options"), ae.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    n = t.lstatSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    r.code === "EPERM" && ar && Ua(e, t, r);
  }
  try {
    n && n.isDirectory() ? ni(e, t, null) : t.unlinkSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    if (r.code === "EPERM")
      return ar ? Ua(e, t, r) : ni(e, t, r);
    if (r.code !== "EISDIR")
      throw r;
    ni(e, t, r);
  }
}
function ni(e, t, n) {
  ae(e), ae(t);
  try {
    t.rmdirSync(e);
  } catch (r) {
    if (r.code === "ENOTDIR")
      throw n;
    if (r.code === "ENOTEMPTY" || r.code === "EEXIST" || r.code === "EPERM")
      Xp(e, t);
    else if (r.code !== "ENOENT")
      throw r;
  }
}
function Xp(e, t) {
  if (ae(e), ae(t), t.readdirSync(e).forEach((n) => Kc(Xc.join(e, n), t)), ar) {
    const n = Date.now();
    do
      try {
        return t.rmdirSync(e, t);
      } catch {
      }
    while (Date.now() - n < 500);
  } else
    return t.rmdirSync(e, t);
}
var Jp = As;
As.sync = Kc;
const hi = Le, Kp = Fe.fromCallback, Qc = Jp;
function Qp(e, t) {
  if (hi.rm) return hi.rm(e, { recursive: !0, force: !0 }, t);
  Qc(e, t);
}
function Zp(e) {
  if (hi.rmSync) return hi.rmSync(e, { recursive: !0, force: !0 });
  Qc.sync(e);
}
var Di = {
  remove: Kp(Qp),
  removeSync: Zp
};
const em = Fe.fromPromise, Zc = Zt, eu = ue, tu = ut, nu = Di, ka = em(async function(t) {
  let n;
  try {
    n = await Zc.readdir(t);
  } catch {
    return tu.mkdirs(t);
  }
  return Promise.all(n.map((r) => nu.remove(eu.join(t, r))));
});
function Ma(e) {
  let t;
  try {
    t = Zc.readdirSync(e);
  } catch {
    return tu.mkdirsSync(e);
  }
  t.forEach((n) => {
    n = eu.join(e, n), nu.removeSync(n);
  });
}
var tm = {
  emptyDirSync: Ma,
  emptydirSync: Ma,
  emptyDir: ka,
  emptydir: ka
};
const nm = Fe.fromCallback, ru = ue, Dt = Le, iu = ut;
function rm(e, t) {
  function n() {
    Dt.writeFile(e, "", (r) => {
      if (r) return t(r);
      t();
    });
  }
  Dt.stat(e, (r, i) => {
    if (!r && i.isFile()) return t();
    const o = ru.dirname(e);
    Dt.stat(o, (s, a) => {
      if (s)
        return s.code === "ENOENT" ? iu.mkdirs(o, (l) => {
          if (l) return t(l);
          n();
        }) : t(s);
      a.isDirectory() ? n() : Dt.readdir(o, (l) => {
        if (l) return t(l);
      });
    });
  });
}
function im(e) {
  let t;
  try {
    t = Dt.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const n = ru.dirname(e);
  try {
    Dt.statSync(n).isDirectory() || Dt.readdirSync(n);
  } catch (r) {
    if (r && r.code === "ENOENT") iu.mkdirsSync(n);
    else throw r;
  }
  Dt.writeFileSync(e, "");
}
var om = {
  createFile: nm(rm),
  createFileSync: im
};
const sm = Fe.fromCallback, ou = ue, It = Le, su = ut, am = en.pathExists, { areIdentical: au } = Dn;
function lm(e, t, n) {
  function r(i, o) {
    It.link(i, o, (s) => {
      if (s) return n(s);
      n(null);
    });
  }
  It.lstat(t, (i, o) => {
    It.lstat(e, (s, a) => {
      if (s)
        return s.message = s.message.replace("lstat", "ensureLink"), n(s);
      if (o && au(a, o)) return n(null);
      const l = ou.dirname(t);
      am(l, (p, c) => {
        if (p) return n(p);
        if (c) return r(e, t);
        su.mkdirs(l, (u) => {
          if (u) return n(u);
          r(e, t);
        });
      });
    });
  });
}
function cm(e, t) {
  let n;
  try {
    n = It.lstatSync(t);
  } catch {
  }
  try {
    const o = It.lstatSync(e);
    if (n && au(o, n)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const r = ou.dirname(t);
  return It.existsSync(r) || su.mkdirsSync(r), It.linkSync(e, t);
}
var um = {
  createLink: sm(lm),
  createLinkSync: cm
};
const Ot = ue, Qn = Le, fm = en.pathExists;
function dm(e, t, n) {
  if (Ot.isAbsolute(e))
    return Qn.lstat(e, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), n(r)) : n(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const r = Ot.dirname(t), i = Ot.join(r, e);
    return fm(i, (o, s) => o ? n(o) : s ? n(null, {
      toCwd: i,
      toDst: e
    }) : Qn.lstat(e, (a) => a ? (a.message = a.message.replace("lstat", "ensureSymlink"), n(a)) : n(null, {
      toCwd: e,
      toDst: Ot.relative(r, e)
    })));
  }
}
function hm(e, t) {
  let n;
  if (Ot.isAbsolute(e)) {
    if (n = Qn.existsSync(e), !n) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const r = Ot.dirname(t), i = Ot.join(r, e);
    if (n = Qn.existsSync(i), n)
      return {
        toCwd: i,
        toDst: e
      };
    if (n = Qn.existsSync(e), !n) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: Ot.relative(r, e)
    };
  }
}
var pm = {
  symlinkPaths: dm,
  symlinkPathsSync: hm
};
const lu = Le;
function mm(e, t, n) {
  if (n = typeof t == "function" ? t : n, t = typeof t == "function" ? !1 : t, t) return n(null, t);
  lu.lstat(e, (r, i) => {
    if (r) return n(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", n(null, t);
  });
}
function gm(e, t) {
  let n;
  if (t) return t;
  try {
    n = lu.lstatSync(e);
  } catch {
    return "file";
  }
  return n && n.isDirectory() ? "dir" : "file";
}
var ym = {
  symlinkType: mm,
  symlinkTypeSync: gm
};
const Em = Fe.fromCallback, cu = ue, Ze = Zt, uu = ut, wm = uu.mkdirs, vm = uu.mkdirsSync, fu = pm, _m = fu.symlinkPaths, xm = fu.symlinkPathsSync, du = ym, bm = du.symlinkType, Sm = du.symlinkTypeSync, Am = en.pathExists, { areIdentical: hu } = Dn;
function Tm(e, t, n, r) {
  r = typeof n == "function" ? n : r, n = typeof n == "function" ? !1 : n, Ze.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      Ze.stat(e),
      Ze.stat(t)
    ]).then(([s, a]) => {
      if (hu(s, a)) return r(null);
      ja(e, t, n, r);
    }) : ja(e, t, n, r);
  });
}
function ja(e, t, n, r) {
  _m(e, t, (i, o) => {
    if (i) return r(i);
    e = o.toDst, bm(o.toCwd, n, (s, a) => {
      if (s) return r(s);
      const l = cu.dirname(t);
      Am(l, (p, c) => {
        if (p) return r(p);
        if (c) return Ze.symlink(e, t, a, r);
        wm(l, (u) => {
          if (u) return r(u);
          Ze.symlink(e, t, a, r);
        });
      });
    });
  });
}
function Cm(e, t, n) {
  let r;
  try {
    r = Ze.lstatSync(t);
  } catch {
  }
  if (r && r.isSymbolicLink()) {
    const a = Ze.statSync(e), l = Ze.statSync(t);
    if (hu(a, l)) return;
  }
  const i = xm(e, t);
  e = i.toDst, n = Sm(i.toCwd, n);
  const o = cu.dirname(t);
  return Ze.existsSync(o) || vm(o), Ze.symlinkSync(e, t, n);
}
var $m = {
  createSymlink: Em(Tm),
  createSymlinkSync: Cm
};
const { createFile: Ba, createFileSync: Ha } = om, { createLink: qa, createLinkSync: Ga } = um, { createSymlink: za, createSymlinkSync: Wa } = $m;
var Im = {
  // file
  createFile: Ba,
  createFileSync: Ha,
  ensureFile: Ba,
  ensureFileSync: Ha,
  // link
  createLink: qa,
  createLinkSync: Ga,
  ensureLink: qa,
  ensureLinkSync: Ga,
  // symlink
  createSymlink: za,
  createSymlinkSync: Wa,
  ensureSymlink: za,
  ensureSymlinkSync: Wa
};
function Dm(e, { EOL: t = `
`, finalEOL: n = !0, replacer: r = null, spaces: i } = {}) {
  const o = n ? t : "", s = JSON.stringify(e, r, i);
  if (s === void 0)
    throw new TypeError(`Converting ${typeof e} value to JSON is not supported`);
  return s.replace(/\n/g, t) + o;
}
function Om(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var Ts = { stringify: Dm, stripBom: Om };
let An;
try {
  An = Le;
} catch {
  An = tt;
}
const Oi = Fe, { stringify: pu, stripBom: mu } = Ts;
async function Rm(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || An, r = "throws" in t ? t.throws : !0;
  let i = await Oi.fromCallback(n.readFile)(e, t);
  i = mu(i);
  let o;
  try {
    o = JSON.parse(i, t ? t.reviver : null);
  } catch (s) {
    if (r)
      throw s.message = `${e}: ${s.message}`, s;
    return null;
  }
  return o;
}
const Pm = Oi.fromPromise(Rm);
function Nm(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || An, r = "throws" in t ? t.throws : !0;
  try {
    let i = n.readFileSync(e, t);
    return i = mu(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (r)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function Fm(e, t, n = {}) {
  const r = n.fs || An, i = pu(t, n);
  await Oi.fromCallback(r.writeFile)(e, i, n);
}
const Lm = Oi.fromPromise(Fm);
function Um(e, t, n = {}) {
  const r = n.fs || An, i = pu(t, n);
  return r.writeFileSync(e, i, n);
}
var km = {
  readFile: Pm,
  readFileSync: Nm,
  writeFile: Lm,
  writeFileSync: Um
};
const qr = km;
var Mm = {
  // jsonfile exports
  readJson: qr.readFile,
  readJsonSync: qr.readFileSync,
  writeJson: qr.writeFile,
  writeJsonSync: qr.writeFileSync
};
const jm = Fe.fromCallback, Zn = Le, gu = ue, yu = ut, Bm = en.pathExists;
function Hm(e, t, n, r) {
  typeof n == "function" && (r = n, n = "utf8");
  const i = gu.dirname(e);
  Bm(i, (o, s) => {
    if (o) return r(o);
    if (s) return Zn.writeFile(e, t, n, r);
    yu.mkdirs(i, (a) => {
      if (a) return r(a);
      Zn.writeFile(e, t, n, r);
    });
  });
}
function qm(e, ...t) {
  const n = gu.dirname(e);
  if (Zn.existsSync(n))
    return Zn.writeFileSync(e, ...t);
  yu.mkdirsSync(n), Zn.writeFileSync(e, ...t);
}
var Cs = {
  outputFile: jm(Hm),
  outputFileSync: qm
};
const { stringify: Gm } = Ts, { outputFile: zm } = Cs;
async function Wm(e, t, n = {}) {
  const r = Gm(t, n);
  await zm(e, r, n);
}
var Vm = Wm;
const { stringify: Ym } = Ts, { outputFileSync: Xm } = Cs;
function Jm(e, t, n) {
  const r = Ym(t, n);
  Xm(e, r, n);
}
var Km = Jm;
const Qm = Fe.fromPromise, Ne = Mm;
Ne.outputJson = Qm(Vm);
Ne.outputJsonSync = Km;
Ne.outputJSON = Ne.outputJson;
Ne.outputJSONSync = Ne.outputJsonSync;
Ne.writeJSON = Ne.writeJson;
Ne.writeJSONSync = Ne.writeJsonSync;
Ne.readJSON = Ne.readJson;
Ne.readJSONSync = Ne.readJsonSync;
var Zm = Ne;
const e0 = Le, Yo = ue, t0 = Ss.copy, Eu = Di.remove, n0 = ut.mkdirp, r0 = en.pathExists, Va = Dn;
function i0(e, t, n, r) {
  typeof n == "function" && (r = n, n = {}), n = n || {};
  const i = n.overwrite || n.clobber || !1;
  Va.checkPaths(e, t, "move", n, (o, s) => {
    if (o) return r(o);
    const { srcStat: a, isChangingCase: l = !1 } = s;
    Va.checkParentPaths(e, a, t, "move", (p) => {
      if (p) return r(p);
      if (o0(t)) return Ya(e, t, i, l, r);
      n0(Yo.dirname(t), (c) => c ? r(c) : Ya(e, t, i, l, r));
    });
  });
}
function o0(e) {
  const t = Yo.dirname(e);
  return Yo.parse(t).root === t;
}
function Ya(e, t, n, r, i) {
  if (r) return vo(e, t, n, i);
  if (n)
    return Eu(t, (o) => o ? i(o) : vo(e, t, n, i));
  r0(t, (o, s) => o ? i(o) : s ? i(new Error("dest already exists.")) : vo(e, t, n, i));
}
function vo(e, t, n, r) {
  e0.rename(e, t, (i) => i ? i.code !== "EXDEV" ? r(i) : s0(e, t, n, r) : r());
}
function s0(e, t, n, r) {
  t0(e, t, {
    overwrite: n,
    errorOnExist: !0
  }, (o) => o ? r(o) : Eu(e, r));
}
var a0 = i0;
const wu = Le, Xo = ue, l0 = Ss.copySync, vu = Di.removeSync, c0 = ut.mkdirpSync, Xa = Dn;
function u0(e, t, n) {
  n = n || {};
  const r = n.overwrite || n.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = Xa.checkPathsSync(e, t, "move", n);
  return Xa.checkParentPathsSync(e, i, t, "move"), f0(t) || c0(Xo.dirname(t)), d0(e, t, r, o);
}
function f0(e) {
  const t = Xo.dirname(e);
  return Xo.parse(t).root === t;
}
function d0(e, t, n, r) {
  if (r) return _o(e, t, n);
  if (n)
    return vu(t), _o(e, t, n);
  if (wu.existsSync(t)) throw new Error("dest already exists.");
  return _o(e, t, n);
}
function _o(e, t, n) {
  try {
    wu.renameSync(e, t);
  } catch (r) {
    if (r.code !== "EXDEV") throw r;
    return h0(e, t, n);
  }
}
function h0(e, t, n) {
  return l0(e, t, {
    overwrite: n,
    errorOnExist: !0
  }), vu(e);
}
var p0 = u0;
const m0 = Fe.fromCallback;
var g0 = {
  move: m0(a0),
  moveSync: p0
}, Ut = {
  // Export promiseified graceful-fs:
  ...Zt,
  // Export extra methods:
  ...Ss,
  ...tm,
  ...Im,
  ...Zm,
  ...ut,
  ...g0,
  ...Cs,
  ...en,
  ...Di
}, jn = {}, Gt = {}, Ae = {}, $s = {}, rt = {};
function _u(e) {
  return typeof e > "u" || e === null;
}
function y0(e) {
  return typeof e == "object" && e !== null;
}
function E0(e) {
  return Array.isArray(e) ? e : _u(e) ? [] : [e];
}
function w0(e, t) {
  if (t) {
    const n = Object.keys(t);
    for (let r = 0, i = n.length; r < i; r += 1) {
      const o = n[r];
      e[o] = t[o];
    }
  }
  return e;
}
function v0(e, t) {
  let n = "";
  for (let r = 0; r < t; r += 1)
    n += e;
  return n;
}
function _0(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
rt.isNothing = _u;
rt.isObject = y0;
rt.toArray = E0;
rt.repeat = v0;
rt.isNegativeZero = _0;
rt.extend = w0;
function xu(e, t) {
  let n = "";
  const r = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (n += 'in "' + e.mark.name + '" '), n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (n += `

` + e.mark.snippet), r + " " + n) : r;
}
function lr(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = xu(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
lr.prototype = Object.create(Error.prototype);
lr.prototype.constructor = lr;
lr.prototype.toString = function(t) {
  return this.name + ": " + xu(this, t);
};
var yr = lr;
const Yn = rt;
function xo(e, t, n, r, i) {
  let o = "", s = "";
  const a = Math.floor(i / 2) - 1;
  return r - t > a && (o = " ... ", t = r - a + o.length), n - r > a && (s = " ...", n = r + a - s.length), {
    str: o + e.slice(t, n).replace(/\t/g, "→") + s,
    pos: r - t + o.length
    // relative position
  };
}
function bo(e, t) {
  return Yn.repeat(" ", t - e.length) + e;
}
function x0(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  const n = /\r?\n|\r|\0/g, r = [0], i = [];
  let o, s = -1;
  for (; o = n.exec(e.buffer); )
    i.push(o.index), r.push(o.index + o[0].length), e.position <= o.index && s < 0 && (s = r.length - 2);
  s < 0 && (s = r.length - 1);
  let a = "";
  const l = Math.min(e.line + t.linesAfter, i.length).toString().length, p = t.maxLength - (t.indent + l + 3);
  for (let u = 1; u <= t.linesBefore && !(s - u < 0); u++) {
    const d = xo(
      e.buffer,
      r[s - u],
      i[s - u],
      e.position - (r[s] - r[s - u]),
      p
    );
    a = Yn.repeat(" ", t.indent) + bo((e.line - u + 1).toString(), l) + " | " + d.str + `
` + a;
  }
  const c = xo(e.buffer, r[s], i[s], e.position, p);
  a += Yn.repeat(" ", t.indent) + bo((e.line + 1).toString(), l) + " | " + c.str + `
`, a += Yn.repeat("-", t.indent + l + 3 + c.pos) + `^
`;
  for (let u = 1; u <= t.linesAfter && !(s + u >= i.length); u++) {
    const d = xo(
      e.buffer,
      r[s + u],
      i[s + u],
      e.position - (r[s] - r[s + u]),
      p
    );
    a += Yn.repeat(" ", t.indent) + bo((e.line + u + 1).toString(), l) + " | " + d.str + `
`;
  }
  return a.replace(/\n$/, "");
}
var b0 = x0;
const Ja = yr, S0 = [
  "kind",
  "multi",
  "resolve",
  "construct",
  "instanceOf",
  "predicate",
  "represent",
  "representName",
  "defaultStyle",
  "styleAliases"
], A0 = [
  "scalar",
  "sequence",
  "mapping"
];
function T0(e) {
  const t = {};
  return e !== null && Object.keys(e).forEach(function(n) {
    e[n].forEach(function(r) {
      t[String(r)] = n;
    });
  }), t;
}
function C0(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(n) {
    if (S0.indexOf(n) === -1)
      throw new Ja('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(n) {
    return n;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = T0(t.styleAliases || null), A0.indexOf(this.kind) === -1)
    throw new Ja('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var Ue = C0;
const Bn = yr, So = Ue;
function Ka(e, t) {
  const n = [];
  return e[t].forEach(function(r) {
    let i = n.length;
    n.forEach(function(o, s) {
      o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (i = s);
    }), n[i] = r;
  }), n;
}
function $0() {
  const e = {
    scalar: {},
    sequence: {},
    mapping: {},
    fallback: {},
    multi: {
      scalar: [],
      sequence: [],
      mapping: [],
      fallback: []
    }
  };
  function t(n) {
    n.multi ? (e.multi[n.kind].push(n), e.multi.fallback.push(n)) : e[n.kind][n.tag] = e.fallback[n.tag] = n;
  }
  for (let n = 0, r = arguments.length; n < r; n += 1)
    arguments[n].forEach(t);
  return e;
}
function Jo(e) {
  return this.extend(e);
}
Jo.prototype.extend = function(t) {
  let n = [], r = [];
  if (t instanceof So)
    r.push(t);
  else if (Array.isArray(t))
    r = r.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (n = n.concat(t.implicit)), t.explicit && (r = r.concat(t.explicit));
  else
    throw new Bn("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  n.forEach(function(o) {
    if (!(o instanceof So))
      throw new Bn("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new Bn("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new Bn("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(o) {
    if (!(o instanceof So))
      throw new Bn("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  const i = Object.create(Jo.prototype);
  return i.implicit = (this.implicit || []).concat(n), i.explicit = (this.explicit || []).concat(r), i.compiledImplicit = Ka(i, "implicit"), i.compiledExplicit = Ka(i, "explicit"), i.compiledTypeMap = $0(i.compiledImplicit, i.compiledExplicit), i;
};
var bu = Jo;
const I0 = Ue;
var Su = new I0("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
});
const D0 = Ue;
var Au = new D0("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
});
const O0 = Ue;
var Tu = new O0("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
});
const R0 = bu;
var Cu = new R0({
  explicit: [
    Su,
    Au,
    Tu
  ]
});
const P0 = Ue;
function N0(e) {
  if (e === null) return !0;
  const t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function F0() {
  return null;
}
function L0(e) {
  return e === null;
}
var $u = new P0("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: N0,
  construct: F0,
  predicate: L0,
  represent: {
    canonical: function() {
      return "~";
    },
    lowercase: function() {
      return "null";
    },
    uppercase: function() {
      return "NULL";
    },
    camelcase: function() {
      return "Null";
    },
    empty: function() {
      return "";
    }
  },
  defaultStyle: "lowercase"
});
const U0 = Ue;
function k0(e) {
  if (e === null) return !1;
  const t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function M0(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function j0(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Iu = new U0("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: k0,
  construct: M0,
  predicate: j0,
  represent: {
    lowercase: function(e) {
      return e ? "true" : "false";
    },
    uppercase: function(e) {
      return e ? "TRUE" : "FALSE";
    },
    camelcase: function(e) {
      return e ? "True" : "False";
    }
  },
  defaultStyle: "lowercase"
});
const B0 = rt, H0 = Ue;
function q0(e) {
  return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function G0(e) {
  return e >= 48 && e <= 55;
}
function z0(e) {
  return e >= 48 && e <= 57;
}
function W0(e) {
  if (e === null) return !1;
  const t = e.length;
  let n = 0, r = !1;
  if (!t) return !1;
  let i = e[n];
  if ((i === "-" || i === "+") && (i = e[++n]), i === "0") {
    if (n + 1 === t) return !0;
    if (i = e[++n], i === "b") {
      for (n++; n < t; n++) {
        if (i = e[n], i !== "0" && i !== "1") return !1;
        r = !0;
      }
      return r && isFinite(Xn(e));
    }
    if (i === "x") {
      for (n++; n < t; n++) {
        if (!q0(e.charCodeAt(n))) return !1;
        r = !0;
      }
      return r && isFinite(Xn(e));
    }
    if (i === "o") {
      for (n++; n < t; n++) {
        if (!G0(e.charCodeAt(n))) return !1;
        r = !0;
      }
      return r && isFinite(Xn(e));
    }
  }
  for (; n < t; n++) {
    if (!z0(e.charCodeAt(n)))
      return !1;
    r = !0;
  }
  return r ? isFinite(Xn(e)) : !1;
}
function Xn(e) {
  let t = e, n = 1, r = t[0];
  if ((r === "-" || r === "+") && (r === "-" && (n = -1), t = t.slice(1), r = t[0]), t === "0") return 0;
  if (r === "0") {
    if (t[1] === "b") return n * parseInt(t.slice(2), 2);
    if (t[1] === "x") return n * parseInt(t.slice(2), 16);
    if (t[1] === "o") return n * parseInt(t.slice(2), 8);
  }
  return n * parseInt(t, 10);
}
function V0(e) {
  return Xn(e);
}
function Y0(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !B0.isNegativeZero(e);
}
var Du = new H0("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: W0,
  construct: V0,
  predicate: Y0,
  represent: {
    binary: function(e) {
      return e >= 0 ? "0b" + e.toString(2) : "-0b" + e.toString(2).slice(1);
    },
    octal: function(e) {
      return e >= 0 ? "0o" + e.toString(8) : "-0o" + e.toString(8).slice(1);
    },
    decimal: function(e) {
      return e.toString(10);
    },
    hexadecimal: function(e) {
      return e >= 0 ? "0x" + e.toString(16).toUpperCase() : "-0x" + e.toString(16).toUpperCase().slice(1);
    }
  },
  defaultStyle: "decimal",
  styleAliases: {
    binary: [2, "bin"],
    octal: [8, "oct"],
    decimal: [10, "dec"],
    hexadecimal: [16, "hex"]
  }
});
const Ou = rt, X0 = Ue, J0 = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
), K0 = new RegExp(
  "^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Q0(e) {
  return e === null || !J0.test(e) ? !1 : isFinite(parseFloat(e, 10)) ? !0 : K0.test(e);
}
function Z0(e) {
  let t = e.toLowerCase();
  const n = t[0] === "-" ? -1 : 1;
  return "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : n * parseFloat(t, 10);
}
const eg = /^[-+]?[0-9]+e/;
function tg(e, t) {
  if (isNaN(e))
    switch (t) {
      case "lowercase":
        return ".nan";
      case "uppercase":
        return ".NAN";
      case "camelcase":
        return ".NaN";
    }
  else if (Number.POSITIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return ".inf";
      case "uppercase":
        return ".INF";
      case "camelcase":
        return ".Inf";
    }
  else if (Number.NEGATIVE_INFINITY === e)
    switch (t) {
      case "lowercase":
        return "-.inf";
      case "uppercase":
        return "-.INF";
      case "camelcase":
        return "-.Inf";
    }
  else if (Ou.isNegativeZero(e))
    return "-0.0";
  const n = e.toString(10);
  return eg.test(n) ? n.replace("e", ".e") : n;
}
function ng(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || Ou.isNegativeZero(e));
}
var Ru = new X0("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Q0,
  construct: Z0,
  predicate: ng,
  represent: tg,
  defaultStyle: "lowercase"
}), Pu = Cu.extend({
  implicit: [
    $u,
    Iu,
    Du,
    Ru
  ]
}), Nu = Pu;
const rg = Ue, Fu = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Lu = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function ig(e) {
  return e === null ? !1 : Fu.exec(e) !== null || Lu.exec(e) !== null;
}
function og(e) {
  let t = 0, n = null, r = Fu.exec(e);
  if (r === null && (r = Lu.exec(e)), r === null) throw new Error("Date resolve error");
  const i = +r[1], o = +r[2] - 1, s = +r[3];
  if (!r[4])
    return new Date(Date.UTC(i, o, s));
  const a = +r[4], l = +r[5], p = +r[6];
  if (r[7]) {
    for (t = r[7].slice(0, 3); t.length < 3; )
      t += "0";
    t = +t;
  }
  if (r[9]) {
    const u = +r[10], d = +(r[11] || 0);
    n = (u * 60 + d) * 6e4, r[9] === "-" && (n = -n);
  }
  const c = new Date(Date.UTC(i, o, s, a, l, p, t));
  return n && c.setTime(c.getTime() - n), c;
}
function sg(e) {
  return e.toISOString();
}
var Uu = new rg("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: ig,
  construct: og,
  instanceOf: Date,
  represent: sg
});
const ag = Ue;
function lg(e) {
  return e === "<<" || e === null;
}
var ku = new ag("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: lg
});
const cg = Ue, Is = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function ug(e) {
  if (e === null) return !1;
  let t = 0;
  const n = e.length, r = Is;
  for (let i = 0; i < n; i++) {
    const o = r.indexOf(e.charAt(i));
    if (!(o > 64)) {
      if (o < 0) return !1;
      t += 6;
    }
  }
  return t % 8 === 0;
}
function fg(e) {
  const t = e.replace(/[\r\n=]/g, ""), n = t.length, r = Is;
  let i = 0;
  const o = [];
  for (let a = 0; a < n; a++)
    a % 4 === 0 && a && (o.push(i >> 16 & 255), o.push(i >> 8 & 255), o.push(i & 255)), i = i << 6 | r.indexOf(t.charAt(a));
  const s = n % 4 * 6;
  return s === 0 ? (o.push(i >> 16 & 255), o.push(i >> 8 & 255), o.push(i & 255)) : s === 18 ? (o.push(i >> 10 & 255), o.push(i >> 2 & 255)) : s === 12 && o.push(i >> 4 & 255), new Uint8Array(o);
}
function dg(e) {
  let t = "", n = 0;
  const r = e.length, i = Is;
  for (let s = 0; s < r; s++)
    s % 3 === 0 && s && (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]), n = (n << 8) + e[s];
  const o = r % 3;
  return o === 0 ? (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]) : o === 2 ? (t += i[n >> 10 & 63], t += i[n >> 4 & 63], t += i[n << 2 & 63], t += i[64]) : o === 1 && (t += i[n >> 2 & 63], t += i[n << 4 & 63], t += i[64], t += i[64]), t;
}
function hg(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Mu = new cg("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: ug,
  construct: fg,
  predicate: hg,
  represent: dg
});
const pg = Ue, Qa = Object.prototype.hasOwnProperty, mg = Object.prototype.toString;
function gg(e) {
  if (e === null) return !0;
  const t = {}, n = e;
  for (let r = 0, i = n.length; r < i; r += 1) {
    const o = n[r];
    let s = !1;
    if (mg.call(o) !== "[object Object]") return !1;
    let a;
    for (a in o)
      if (Qa.call(o, a))
        if (!s) s = !0;
        else return !1;
    if (!s || Qa.call(t, a)) return !1;
    Object.defineProperty(t, a, { value: !0 });
  }
  return !0;
}
function yg(e) {
  return e !== null ? e : [];
}
var ju = new pg("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: gg,
  construct: yg
});
const Eg = Ue, wg = Object.prototype.toString;
function vg(e) {
  if (e === null) return !0;
  const t = e, n = new Array(t.length);
  for (let r = 0, i = t.length; r < i; r += 1) {
    const o = t[r];
    if (wg.call(o) !== "[object Object]") return !1;
    const s = Object.keys(o);
    if (s.length !== 1) return !1;
    n[r] = [s[0], o[s[0]]];
  }
  return !0;
}
function _g(e) {
  if (e === null) return [];
  const t = e, n = new Array(t.length);
  for (let r = 0, i = t.length; r < i; r += 1) {
    const o = t[r], s = Object.keys(o);
    n[r] = [s[0], o[s[0]]];
  }
  return n;
}
var Bu = new Eg("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: vg,
  construct: _g
});
const xg = Ue, bg = Object.prototype.hasOwnProperty;
function Sg(e) {
  if (e === null) return !0;
  const t = e;
  for (const n in t)
    if (bg.call(t, n) && t[n] !== null)
      return !1;
  return !0;
}
function Ag(e) {
  return e !== null ? e : {};
}
var Hu = new xg("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Sg,
  construct: Ag
}), Ds = Nu.extend({
  implicit: [
    Uu,
    ku
  ],
  explicit: [
    Mu,
    ju,
    Bu,
    Hu
  ]
});
const Vt = rt, qu = yr, Tg = b0, Cg = Ds, et = Object.prototype.hasOwnProperty, pi = 1, Gu = 2, zu = 3, mi = 4, Ao = 1, $g = 2, Za = 3, Ig = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Dg = /[\x85\u2028\u2029]/, Og = /[,\[\]{}]/, Wu = /^(?:!|!!|![0-9A-Za-z-]+!)$/, Vu = /^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;
function el(e) {
  return Object.prototype.toString.call(e);
}
function lt(e) {
  return e === 10 || e === 13;
}
function gt(e) {
  return e === 9 || e === 32;
}
function je(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function fn(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Rg(e) {
  if (e >= 48 && e <= 57)
    return e - 48;
  const t = e | 32;
  return t >= 97 && t <= 102 ? t - 97 + 10 : -1;
}
function Pg(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function Ng(e) {
  return e >= 48 && e <= 57 ? e - 48 : -1;
}
function tl(e) {
  switch (e) {
    case 48:
      return "\0";
    case 97:
      return "\x07";
    case 98:
      return "\b";
    case 116:
      return "	";
    case 9:
      return "	";
    case 110:
      return `
`;
    case 118:
      return "\v";
    case 102:
      return "\f";
    case 114:
      return "\r";
    case 101:
      return "\x1B";
    case 32:
      return " ";
    case 34:
      return '"';
    case 47:
      return "/";
    case 92:
      return "\\";
    case 78:
      return "";
    case 95:
      return " ";
    case 76:
      return "\u2028";
    case 80:
      return "\u2029";
    default:
      return "";
  }
}
function Fg(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
function Yu(e, t, n) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: n
  }) : e[t] = n;
}
const Xu = new Array(256), Ju = new Array(256);
for (let e = 0; e < 256; e++)
  Xu[e] = tl(e) ? 1 : 0, Ju[e] = tl(e);
function Lg(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || Cg, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.maxDepth = typeof t.maxDepth == "number" ? t.maxDepth : 100, this.maxTotalMergeKeys = typeof t.maxTotalMergeKeys == "number" ? t.maxTotalMergeKeys : 1e4, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.depth = 0, this.totalMergeKeys = 0, this.firstTabInLine = -1, this.documents = [], this.anchorMapTransactions = [];
}
function Ku(e, t) {
  const n = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return n.snippet = Tg(n), new qu(t, n);
}
function V(e, t) {
  throw Ku(e, t);
}
function gi(e, t) {
  e.onWarning && e.onWarning.call(null, Ku(e, t));
}
function Yt(e, t, n) {
  const r = e.anchorMapTransactions;
  if (r.length !== 0) {
    const i = r[r.length - 1];
    et.call(i, t) || (i[t] = {
      existed: et.call(e.anchorMap, t),
      value: e.anchorMap[t]
    });
  }
  e.anchorMap[t] = n;
}
function Ug(e) {
  e.anchorMapTransactions.push(/* @__PURE__ */ Object.create(null));
}
function kg(e) {
  const t = e.anchorMapTransactions.pop(), n = e.anchorMapTransactions;
  if (n.length === 0) return;
  const r = n[n.length - 1], i = Object.keys(t);
  for (let o = 0, s = i.length; o < s; o += 1) {
    const a = i[o];
    et.call(r, a) || (r[a] = t[a]);
  }
}
function Mg(e) {
  const t = e.anchorMapTransactions.pop(), n = Object.keys(t);
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const i = t[n[r]];
    i.existed ? e.anchorMap[n[r]] = i.value : delete e.anchorMap[n[r]];
  }
}
function Qu(e) {
  return {
    position: e.position,
    line: e.line,
    lineStart: e.lineStart,
    lineIndent: e.lineIndent,
    firstTabInLine: e.firstTabInLine,
    tag: e.tag,
    anchor: e.anchor,
    kind: e.kind,
    result: e.result
  };
}
function nl(e, t) {
  e.position = t.position, e.line = t.line, e.lineStart = t.lineStart, e.lineIndent = t.lineIndent, e.firstTabInLine = t.firstTabInLine, e.tag = t.tag, e.anchor = t.anchor, e.kind = t.kind, e.result = t.result;
}
const rl = {
  YAML: function(t, n, r) {
    t.version !== null && V(t, "duplication of %YAML directive"), r.length !== 1 && V(t, "YAML directive accepts exactly one argument");
    const i = /^([0-9]+)\.([0-9]+)$/.exec(r[0]);
    i === null && V(t, "ill-formed argument of the YAML directive");
    const o = parseInt(i[1], 10), s = parseInt(i[2], 10);
    o !== 1 && V(t, "unacceptable YAML version of the document"), t.version = r[0], t.checkLineBreaks = s < 2, s !== 1 && s !== 2 && gi(t, "unsupported YAML version of the document");
  },
  TAG: function(t, n, r) {
    let i;
    r.length !== 2 && V(t, "TAG directive accepts exactly two arguments");
    const o = r[0];
    i = r[1], Wu.test(o) || V(t, "ill-formed tag handle (first argument) of the TAG directive"), et.call(t.tagMap, o) && V(t, 'there is a previously declared suffix for "' + o + '" tag handle'), Vu.test(i) || V(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      i = decodeURIComponent(i);
    } catch {
      V(t, "tag prefix is malformed: " + i);
    }
    t.tagMap[o] = i;
  }
};
function Rt(e, t, n, r) {
  if (t < n) {
    const i = e.input.slice(t, n);
    if (r)
      for (let o = 0, s = i.length; o < s; o += 1) {
        const a = i.charCodeAt(o);
        a === 9 || a >= 32 && a <= 1114111 || V(e, "expected valid JSON character");
      }
    else Ig.test(i) && V(e, "the stream contains non-printable characters");
    e.result += i;
  }
}
function il(e, t, n, r) {
  Vt.isObject(n) || V(e, "cannot merge mappings; the provided source object is unacceptable");
  const i = Object.keys(n);
  for (let o = 0, s = i.length; o < s; o += 1) {
    const a = i[o];
    e.maxTotalMergeKeys !== -1 && ++e.totalMergeKeys > e.maxTotalMergeKeys && V(e, "merge keys exceeded maxTotalMergeKeys (" + e.maxTotalMergeKeys + ")"), et.call(t, a) || (Yu(t, a, n[a]), r[a] = !0);
  }
}
function dn(e, t, n, r, i, o, s, a, l) {
  if (Array.isArray(i)) {
    i = Array.prototype.slice.call(i);
    for (let p = 0, c = i.length; p < c; p += 1)
      Array.isArray(i[p]) && V(e, "nested arrays are not supported inside keys"), typeof i == "object" && el(i[p]) === "[object Object]" && (i[p] = "[object Object]");
  }
  if (typeof i == "object" && el(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (let p = 0, c = o.length; p < c; p += 1)
        il(e, t, o[p], n);
    else
      il(e, t, o, n);
  else
    !e.json && !et.call(n, i) && et.call(t, i) && (e.line = s || e.line, e.lineStart = a || e.lineStart, e.position = l || e.position, V(e, "duplicated mapping key")), Yu(t, i, o), delete n[i];
  return t;
}
function Os(e) {
  const t = e.input.charCodeAt(e.position);
  t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : V(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function ye(e, t, n) {
  let r = 0, i = e.input.charCodeAt(e.position);
  for (; i !== 0; ) {
    for (; gt(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (lt(i))
      for (Os(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return n !== -1 && r !== 0 && e.lineIndent < n && gi(e, "deficient indentation"), r;
}
function Ri(e) {
  let t = e.position, n = e.input.charCodeAt(t);
  return !!((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2) && (t += 3, n = e.input.charCodeAt(t), n === 0 || je(n)));
}
function Rs(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += Vt.repeat(`
`, t - 1));
}
function jg(e, t, n) {
  let r, i, o, s, a, l;
  const p = e.kind, c = e.result;
  let u = e.input.charCodeAt(e.position);
  if (je(u) || fn(u) || u === 35 || u === 38 || u === 42 || u === 33 || u === 124 || u === 62 || u === 39 || u === 34 || u === 37 || u === 64 || u === 96)
    return !1;
  if (u === 63 || u === 45) {
    const d = e.input.charCodeAt(e.position + 1);
    if (je(d) || n && fn(d))
      return !1;
  }
  for (e.kind = "scalar", e.result = "", r = i = e.position, o = !1; u !== 0; ) {
    if (u === 58) {
      const d = e.input.charCodeAt(e.position + 1);
      if (je(d) || n && fn(d))
        break;
    } else if (u === 35) {
      const d = e.input.charCodeAt(e.position - 1);
      if (je(d))
        break;
    } else {
      if (e.position === e.lineStart && Ri(e) || n && fn(u))
        break;
      if (lt(u))
        if (s = e.line, a = e.lineStart, l = e.lineIndent, ye(e, !1, -1), e.lineIndent >= t) {
          o = !0, u = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = i, e.line = s, e.lineStart = a, e.lineIndent = l;
          break;
        }
    }
    o && (Rt(e, r, i, !1), Rs(e, e.line - s), r = i = e.position, o = !1), gt(u) || (i = e.position + 1), u = e.input.charCodeAt(++e.position);
  }
  return Rt(e, r, i, !1), e.result ? !0 : (e.kind = p, e.result = c, !1);
}
function Bg(e, t) {
  let n, r, i = e.input.charCodeAt(e.position);
  if (i !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (i = e.input.charCodeAt(e.position)) !== 0; )
    if (i === 39)
      if (Rt(e, n, e.position, !0), i = e.input.charCodeAt(++e.position), i === 39)
        n = e.position, e.position++, r = e.position;
      else
        return !0;
    else lt(i) ? (Rt(e, n, r, !0), Rs(e, ye(e, !1, t)), n = r = e.position) : e.position === e.lineStart && Ri(e) ? V(e, "unexpected end of the document within a single quoted scalar") : (e.position++, gt(i) || (r = e.position));
  V(e, "unexpected end of the stream within a single quoted scalar");
}
function Hg(e, t) {
  let n, r, i, o = e.input.charCodeAt(e.position);
  if (o !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (o = e.input.charCodeAt(e.position)) !== 0; ) {
    if (o === 34)
      return Rt(e, n, e.position, !0), e.position++, !0;
    if (o === 92) {
      if (Rt(e, n, e.position, !0), o = e.input.charCodeAt(++e.position), lt(o))
        ye(e, !1, t);
      else if (o < 256 && Xu[o])
        e.result += Ju[o], e.position++;
      else if ((i = Pg(o)) > 0) {
        let s = i, a = 0;
        for (; s > 0; s--)
          o = e.input.charCodeAt(++e.position), (i = Rg(o)) >= 0 ? a = (a << 4) + i : V(e, "expected hexadecimal character");
        e.result += Fg(a), e.position++;
      } else
        V(e, "unknown escape sequence");
      n = r = e.position;
    } else lt(o) ? (Rt(e, n, r, !0), Rs(e, ye(e, !1, t)), n = r = e.position) : e.position === e.lineStart && Ri(e) ? V(e, "unexpected end of the document within a double quoted scalar") : (e.position++, gt(o) || (r = e.position));
  }
  V(e, "unexpected end of the stream within a double quoted scalar");
}
function qg(e, t) {
  let n = !0, r, i, o;
  const s = e.tag;
  let a;
  const l = e.anchor;
  let p, c, u, d;
  const m = /* @__PURE__ */ Object.create(null);
  let w, y, v, b = e.input.charCodeAt(e.position);
  if (b === 91)
    p = 93, d = !1, a = [];
  else if (b === 123)
    p = 125, d = !0, a = {};
  else
    return !1;
  for (e.anchor !== null && Yt(e, e.anchor, a), b = e.input.charCodeAt(++e.position); b !== 0; ) {
    if (ye(e, !0, t), b = e.input.charCodeAt(e.position), b === p)
      return e.position++, e.tag = s, e.anchor = l, e.kind = d ? "mapping" : "sequence", e.result = a, !0;
    if (n ? b === 44 && V(e, "expected the node content, but found ','") : V(e, "missed comma between flow collection entries"), y = w = v = null, c = u = !1, b === 63) {
      const I = e.input.charCodeAt(e.position + 1);
      je(I) && (c = u = !0, e.position++, ye(e, !0, t));
    }
    r = e.line, i = e.lineStart, o = e.position, Tn(e, t, pi, !1, !0), y = e.tag, w = e.result, ye(e, !0, t), b = e.input.charCodeAt(e.position), (u || e.line === r) && b === 58 && (c = !0, b = e.input.charCodeAt(++e.position), ye(e, !0, t), Tn(e, t, pi, !1, !0), v = e.result), d ? dn(e, a, m, y, w, v, r, i, o) : c ? a.push(dn(e, null, m, y, w, v, r, i, o)) : a.push(w), ye(e, !0, t), b = e.input.charCodeAt(e.position), b === 44 ? (n = !0, b = e.input.charCodeAt(++e.position)) : n = !1;
  }
  V(e, "unexpected end of the stream within a flow collection");
}
function Gg(e, t) {
  let n, r = Ao, i = !1, o = !1, s = t, a = 0, l = !1, p, c = e.input.charCodeAt(e.position);
  if (c === 124)
    n = !1;
  else if (c === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; c !== 0; )
    if (c = e.input.charCodeAt(++e.position), c === 43 || c === 45)
      Ao === r ? r = c === 43 ? Za : $g : V(e, "repeat of a chomping mode identifier");
    else if ((p = Ng(c)) >= 0)
      p === 0 ? V(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? V(e, "repeat of an indentation width identifier") : (s = t + p - 1, o = !0);
    else
      break;
  if (gt(c)) {
    do
      c = e.input.charCodeAt(++e.position);
    while (gt(c));
    if (c === 35)
      do
        c = e.input.charCodeAt(++e.position);
      while (!lt(c) && c !== 0);
  }
  for (; c !== 0; ) {
    for (Os(e), e.lineIndent = 0, c = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && c === 32; )
      e.lineIndent++, c = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > s && (s = e.lineIndent), lt(c)) {
      a++;
      continue;
    }
    if (!o && s === 0 && V(e, "missing indentation for block scalar"), e.lineIndent < s) {
      r === Za ? e.result += Vt.repeat(`
`, i ? 1 + a : a) : r === Ao && i && (e.result += `
`);
      break;
    }
    n ? gt(c) ? (l = !0, e.result += Vt.repeat(`
`, i ? 1 + a : a)) : l ? (l = !1, e.result += Vt.repeat(`
`, a + 1)) : a === 0 ? i && (e.result += " ") : e.result += Vt.repeat(`
`, a) : e.result += Vt.repeat(`
`, i ? 1 + a : a), i = !0, o = !0, a = 0;
    const u = e.position;
    for (; !lt(c) && c !== 0; )
      c = e.input.charCodeAt(++e.position);
    Rt(e, u, e.position, !1);
  }
  return !0;
}
function ol(e, t) {
  const n = e.tag, r = e.anchor, i = [];
  let o = !1;
  if (e.firstTabInLine !== -1) return !1;
  e.anchor !== null && Yt(e, e.anchor, i);
  let s = e.input.charCodeAt(e.position);
  for (; s !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, V(e, "tab characters must not be used in indentation")), s === 45); ) {
    const a = e.input.charCodeAt(e.position + 1);
    if (!je(a))
      break;
    if (o = !0, e.position++, ye(e, !0, -1) && e.lineIndent <= t) {
      i.push(null), s = e.input.charCodeAt(e.position);
      continue;
    }
    const l = e.line;
    if (Tn(e, t, zu, !1, !0), i.push(e.result), ye(e, !0, -1), s = e.input.charCodeAt(e.position), (e.line === l || e.lineIndent > t) && s !== 0)
      V(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return o ? (e.tag = n, e.anchor = r, e.kind = "sequence", e.result = i, !0) : !1;
}
function Zu(e, t, n) {
  let r, i, o, s;
  const a = e.tag, l = e.anchor, p = {}, c = /* @__PURE__ */ Object.create(null);
  let u = null, d = null, m = null, w = !1, y = !1;
  if (e.firstTabInLine !== -1) return !1;
  e.anchor !== null && Yt(e, e.anchor, p);
  let v = e.input.charCodeAt(e.position);
  for (; v !== 0; ) {
    !w && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, V(e, "tab characters must not be used in indentation"));
    const b = e.input.charCodeAt(e.position + 1), I = e.line;
    if ((v === 63 || v === 58) && je(b))
      v === 63 ? (w && (dn(e, p, c, u, d, null, i, o, s), u = d = m = null), y = !0, w = !0, r = !0) : w ? (w = !1, r = !0) : V(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, v = b;
    else {
      if (i = e.line, o = e.lineStart, s = e.position, !Tn(e, n, Gu, !1, !0))
        break;
      if (e.line === I) {
        for (v = e.input.charCodeAt(e.position); gt(v); )
          v = e.input.charCodeAt(++e.position);
        if (v === 58)
          v = e.input.charCodeAt(++e.position), je(v) || V(e, "a whitespace character is expected after the key-value separator within a block mapping"), w && (dn(e, p, c, u, d, null, i, o, s), u = d = m = null), y = !0, w = !1, r = !1, u = e.tag, d = e.result;
        else if (y)
          V(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = a, e.anchor = l, !0;
      } else if (y)
        V(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = a, e.anchor = l, !0;
    }
    if ((e.line === I || e.lineIndent > t) && (w && (i = e.line, o = e.lineStart, s = e.position), Tn(e, t, mi, !0, r) && (w ? d = e.result : m = e.result), w || (dn(e, p, c, u, d, m, i, o, s), u = d = m = null), ye(e, !0, -1), v = e.input.charCodeAt(e.position)), (e.line === I || e.lineIndent > t) && v !== 0)
      V(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return w && dn(e, p, c, u, d, null, i, o, s), y && (e.tag = a, e.anchor = l, e.kind = "mapping", e.result = p), y;
}
function zg(e) {
  let t = !1, n = !1, r, i, o = e.input.charCodeAt(e.position);
  if (o !== 33) return !1;
  e.tag !== null && V(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (t = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (n = !0, r = "!!", o = e.input.charCodeAt(++e.position)) : r = "!";
  let s = e.position;
  if (t) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (i = e.input.slice(s, e.position), o = e.input.charCodeAt(++e.position)) : V(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !je(o); )
      o === 33 && (n ? V(e, "tag suffix cannot contain exclamation marks") : (r = e.input.slice(s - 1, e.position + 1), Wu.test(r) || V(e, "named tag handle cannot contain such characters"), n = !0, s = e.position + 1)), o = e.input.charCodeAt(++e.position);
    i = e.input.slice(s, e.position), Og.test(i) && V(e, "tag suffix cannot contain flow indicator characters");
  }
  i && !Vu.test(i) && V(e, "tag name cannot contain such characters: " + i);
  try {
    i = decodeURIComponent(i);
  } catch {
    V(e, "tag name is malformed: " + i);
  }
  return t ? e.tag = i : et.call(e.tagMap, r) ? e.tag = e.tagMap[r] + i : r === "!" ? e.tag = "!" + i : r === "!!" ? e.tag = "tag:yaml.org,2002:" + i : V(e, 'undeclared tag handle "' + r + '"'), !0;
}
function Wg(e) {
  let t = e.input.charCodeAt(e.position);
  if (t !== 38) return !1;
  e.anchor !== null && V(e, "duplication of an anchor property"), t = e.input.charCodeAt(++e.position);
  const n = e.position;
  for (; t !== 0 && !je(t) && !fn(t); )
    t = e.input.charCodeAt(++e.position);
  return e.position === n && V(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function Vg(e) {
  let t = e.input.charCodeAt(e.position);
  if (t !== 42) return !1;
  t = e.input.charCodeAt(++e.position);
  const n = e.position;
  for (; t !== 0 && !je(t) && !fn(t); )
    t = e.input.charCodeAt(++e.position);
  e.position === n && V(e, "name of an alias node must contain at least one character");
  const r = e.input.slice(n, e.position);
  return et.call(e.anchorMap, r) || V(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], ye(e, !0, -1), !0;
}
function Yg(e, t, n, r) {
  const i = Qu(e);
  return Ug(e), nl(e, t), e.tag = null, e.anchor = null, e.kind = null, e.result = null, Zu(e, n, r) && e.kind === "mapping" ? (kg(e), !0) : (Mg(e), nl(e, i), !1);
}
function Tn(e, t, n, r, i) {
  let o, s, a = 1, l = !1, p = !1, c = null, u, d, m;
  e.depth >= e.maxDepth && V(e, "nesting exceeded maxDepth (" + e.maxDepth + ")"), e.depth += 1, e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null;
  const w = o = s = mi === n || zu === n;
  if (r && ye(e, !0, -1) && (l = !0, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : e.lineIndent < t && (a = -1)), a === 1)
    for (; ; ) {
      const y = e.input.charCodeAt(e.position), v = Qu(e);
      if (l && (y === 33 && e.tag !== null || y === 38 && e.anchor !== null) || !zg(e) && !Wg(e))
        break;
      c === null && (c = v), ye(e, !0, -1) ? (l = !0, s = w, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : e.lineIndent < t && (a = -1)) : s = !1;
    }
  if (s && (s = l || i), a === 1 || mi === n)
    if (pi === n || Gu === n ? d = t : d = t + 1, m = e.position - e.lineStart, a === 1)
      if (s && (ol(e, m) || Zu(e, m, d)) || qg(e, d))
        p = !0;
      else {
        const y = e.input.charCodeAt(e.position);
        c !== null && w && !s && y !== 124 && y !== 62 && Yg(
          e,
          c,
          c.position - c.lineStart,
          d
        ) || o && Gg(e, d) || Bg(e, d) || Hg(e, d) ? p = !0 : Vg(e) ? (p = !0, (e.tag !== null || e.anchor !== null) && V(e, "alias node should not have any properties")) : jg(e, d, pi === n) && (p = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && Yt(e, e.anchor, e.result);
      }
    else a === 0 && (p = s && ol(e, m));
  if (e.tag === null)
    e.anchor !== null && Yt(e, e.anchor, e.result);
  else if (e.tag === "?") {
    e.result !== null && e.kind !== "scalar" && V(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"');
    for (let y = 0, v = e.implicitTypes.length; y < v; y += 1)
      if (u = e.implicitTypes[y], u.resolve(e.result)) {
        e.result = u.construct(e.result), e.tag = u.tag, e.anchor !== null && Yt(e, e.anchor, e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (et.call(e.typeMap[e.kind || "fallback"], e.tag))
      u = e.typeMap[e.kind || "fallback"][e.tag];
    else {
      u = null;
      const y = e.typeMap.multi[e.kind || "fallback"];
      for (let v = 0, b = y.length; v < b; v += 1)
        if (e.tag.slice(0, y[v].tag.length) === y[v].tag) {
          u = y[v];
          break;
        }
    }
    u || V(e, "unknown tag !<" + e.tag + ">"), e.result !== null && u.kind !== e.kind && V(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + u.kind + '", not "' + e.kind + '"'), u.resolve(e.result, e.tag) ? (e.result = u.construct(e.result, e.tag), e.anchor !== null && Yt(e, e.anchor, e.result)) : V(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.depth -= 1, e.tag !== null || e.anchor !== null || p;
}
function Xg(e) {
  const t = e.position;
  let n = !1, r;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (r = e.input.charCodeAt(e.position)) !== 0 && (ye(e, !0, -1), r = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || r !== 37)); ) {
    n = !0, r = e.input.charCodeAt(++e.position);
    let i = e.position;
    for (; r !== 0 && !je(r); )
      r = e.input.charCodeAt(++e.position);
    const o = e.input.slice(i, e.position), s = [];
    for (o.length < 1 && V(e, "directive name must not be less than one character in length"); r !== 0; ) {
      for (; gt(r); )
        r = e.input.charCodeAt(++e.position);
      if (r === 35) {
        do
          r = e.input.charCodeAt(++e.position);
        while (r !== 0 && !lt(r));
        break;
      }
      if (lt(r)) break;
      for (i = e.position; r !== 0 && !je(r); )
        r = e.input.charCodeAt(++e.position);
      s.push(e.input.slice(i, e.position));
    }
    r !== 0 && Os(e), et.call(rl, o) ? rl[o](e, o, s) : gi(e, 'unknown document directive "' + o + '"');
  }
  if (ye(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, ye(e, !0, -1)) : n && V(e, "directives end mark is expected"), Tn(e, e.lineIndent - 1, mi, !1, !0), ye(e, !0, -1), e.checkLineBreaks && Dg.test(e.input.slice(t, e.position)) && gi(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Ri(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, ye(e, !0, -1));
    return;
  }
  e.position < e.length - 1 && V(e, "end of the stream or a document separator is expected");
}
function ef(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  const n = new Lg(e, t), r = e.indexOf("\0");
  for (r !== -1 && (n.position = r, V(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    Xg(n);
  return n.documents;
}
function Jg(e, t, n) {
  t !== null && typeof t == "object" && typeof n > "u" && (n = t, t = null);
  const r = ef(e, n);
  if (typeof t != "function")
    return r;
  for (let i = 0, o = r.length; i < o; i += 1)
    t(r[i]);
}
function Kg(e, t) {
  const n = ef(e, t);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new qu("expected a single document in the stream, but found more");
  }
}
$s.loadAll = Jg;
$s.load = Kg;
var tf = {};
const Pi = rt, Er = yr, Qg = Ds, nf = Object.prototype.toString, rf = Object.prototype.hasOwnProperty, Ps = 65279, Zg = 9, cr = 10, ey = 13, ty = 32, ny = 33, ry = 34, Ko = 35, iy = 37, oy = 38, sy = 39, ay = 42, of = 44, ly = 45, yi = 58, cy = 61, uy = 62, fy = 63, dy = 64, sf = 91, af = 93, hy = 96, lf = 123, py = 124, cf = 125, De = {};
De[0] = "\\0";
De[7] = "\\a";
De[8] = "\\b";
De[9] = "\\t";
De[10] = "\\n";
De[11] = "\\v";
De[12] = "\\f";
De[13] = "\\r";
De[27] = "\\e";
De[34] = '\\"';
De[92] = "\\\\";
De[133] = "\\N";
De[160] = "\\_";
De[8232] = "\\L";
De[8233] = "\\P";
const my = [
  "y",
  "Y",
  "yes",
  "Yes",
  "YES",
  "on",
  "On",
  "ON",
  "n",
  "N",
  "no",
  "No",
  "NO",
  "off",
  "Off",
  "OFF"
], gy = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function yy(e, t) {
  if (t === null) return {};
  const n = {}, r = Object.keys(t);
  for (let i = 0, o = r.length; i < o; i += 1) {
    let s = r[i], a = String(t[s]);
    s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2));
    const l = e.compiledTypeMap.fallback[s];
    l && rf.call(l.styleAliases, a) && (a = l.styleAliases[a]), n[s] = a;
  }
  return n;
}
function Ey(e) {
  let t, n;
  const r = e.toString(16).toUpperCase();
  if (e <= 255)
    t = "x", n = 2;
  else if (e <= 65535)
    t = "u", n = 4;
  else if (e <= 4294967295)
    t = "U", n = 8;
  else
    throw new Er("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + t + Pi.repeat("0", n - r.length) + r;
}
const wy = 1, ur = 2;
function vy(e) {
  this.schema = e.schema || Qg, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Pi.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = yy(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? ur : wy, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function sl(e, t) {
  const n = Pi.repeat(" ", t);
  let r = 0, i = "";
  const o = e.length;
  for (; r < o; ) {
    let s;
    const a = e.indexOf(`
`, r);
    a === -1 ? (s = e.slice(r), r = o) : (s = e.slice(r, a + 1), r = a + 1), s.length && s !== `
` && (i += n), i += s;
  }
  return i;
}
function Qo(e, t) {
  return `
` + Pi.repeat(" ", e.indent * t);
}
function _y(e, t) {
  for (let n = 0, r = e.implicitTypes.length; n < r; n += 1)
    if (e.implicitTypes[n].resolve(t))
      return !0;
  return !1;
}
function Ei(e) {
  return e === ty || e === Zg;
}
function fr(e) {
  return e >= 32 && e <= 126 || e >= 161 && e <= 55295 && e !== 8232 && e !== 8233 || e >= 57344 && e <= 65533 && e !== Ps || e >= 65536 && e <= 1114111;
}
function al(e) {
  return fr(e) && e !== Ps && // - b-char
  e !== ey && e !== cr;
}
function ll(e, t, n) {
  const r = al(e), i = r && !Ei(e);
  return (
    // ns-plain-safe
    (n ? r : r && // - c-flow-indicator
    e !== of && e !== sf && e !== af && e !== lf && e !== cf) && // ns-plain-char
    e !== Ko && // false on '#'
    !(t === yi && !i) || // false on ': '
    al(t) && !Ei(t) && e === Ko || // change to true on '[^ ]#'
    t === yi && i
  );
}
function xy(e) {
  return fr(e) && e !== Ps && !Ei(e) && // - s-white
  // - (c-indicator ::=
  // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
  e !== ly && e !== fy && e !== yi && e !== of && e !== sf && e !== af && e !== lf && e !== cf && // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
  e !== Ko && e !== oy && e !== ay && e !== ny && e !== py && e !== cy && e !== uy && e !== sy && e !== ry && // | “%” | “@” | “`”)
  e !== iy && e !== dy && e !== hy;
}
function by(e) {
  return !Ei(e) && e !== yi;
}
function Jn(e, t) {
  const n = e.charCodeAt(t);
  let r;
  return n >= 55296 && n <= 56319 && t + 1 < e.length && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (n - 55296) * 1024 + r - 56320 + 65536 : n;
}
function uf(e) {
  return /^\n* /.test(e);
}
const ff = 1, Zo = 2, df = 3, hf = 4, un = 5;
function Sy(e, t, n, r, i, o, s, a) {
  let l, p = 0, c = null, u = !1, d = !1;
  const m = r !== -1;
  let w = -1, y = xy(Jn(e, 0)) && by(Jn(e, e.length - 1));
  if (t || s)
    for (l = 0; l < e.length; p >= 65536 ? l += 2 : l++) {
      if (p = Jn(e, l), !fr(p))
        return un;
      y = y && ll(p, c, a), c = p;
    }
  else {
    for (l = 0; l < e.length; p >= 65536 ? l += 2 : l++) {
      if (p = Jn(e, l), p === cr)
        u = !0, m && (d = d || // Foldable line = too long, and not more-indented.
        l - w - 1 > r && e[w + 1] !== " ", w = l);
      else if (!fr(p))
        return un;
      y = y && ll(p, c, a), c = p;
    }
    d = d || m && l - w - 1 > r && e[w + 1] !== " ";
  }
  return !u && !d ? y && !s && !i(e) ? ff : o === ur ? un : Zo : n > 9 && uf(e) ? un : s ? o === ur ? un : Zo : d ? hf : df;
}
function Ay(e, t, n, r, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === ur ? '""' : "''";
    if (!e.noCompatMode && (my.indexOf(t) !== -1 || gy.test(t)))
      return e.quotingType === ur ? '"' + t + '"' : "'" + t + "'";
    const o = e.indent * Math.max(1, n), s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), a = r || // No block styles in flow mode.
    e.flowLevel > -1 && n >= e.flowLevel;
    function l(p) {
      return _y(e, p);
    }
    switch (Sy(
      t,
      a,
      e.indent,
      s,
      l,
      e.quotingType,
      e.forceQuotes && !r,
      i
    )) {
      case ff:
        return t;
      case Zo:
        return "'" + t.replace(/'/g, "''") + "'";
      case df:
        return "|" + cl(t, e.indent) + ul(sl(t, o));
      case hf:
        return ">" + cl(t, e.indent) + ul(sl(Ty(t, s), o));
      case un:
        return '"' + Cy(t) + '"';
      default:
        throw new Er("impossible error: invalid scalar style");
    }
  }();
}
function cl(e, t) {
  const n = uf(e) ? String(t) : "", r = e[e.length - 1] === `
`, o = r && (e[e.length - 2] === `
` || e === `
`) ? "+" : r ? "" : "-";
  return n + o + `
`;
}
function ul(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function Ty(e, t) {
  const n = /(\n+)([^\n]*)/g;
  let r = function() {
    let a = e.indexOf(`
`);
    return a = a !== -1 ? a : e.length, n.lastIndex = a, fl(e.slice(0, a), t);
  }(), i = e[0] === `
` || e[0] === " ", o, s;
  for (; s = n.exec(e); ) {
    const a = s[1], l = s[2];
    o = l[0] === " ", r += a + (!i && !o && l !== "" ? `
` : "") + fl(l, t), i = o;
  }
  return r;
}
function fl(e, t) {
  if (e === "" || e[0] === " ") return e;
  const n = / [^ ]/g;
  let r, i = 0, o, s = 0, a = 0, l = "";
  for (; r = n.exec(e); )
    a = r.index, a - i > t && (o = s > i ? s : a, l += `
` + e.slice(i, o), i = o + 1), s = a;
  return l += `
`, e.length - i > t && s > i ? l += e.slice(i, s) + `
` + e.slice(s + 1) : l += e.slice(i), l.slice(1);
}
function Cy(e) {
  let t = "", n = 0;
  for (let r = 0; r < e.length; n >= 65536 ? r += 2 : r++) {
    n = Jn(e, r);
    const i = De[n];
    !i && fr(n) ? (t += e[r], n >= 65536 && (t += e[r + 1])) : t += i || Ey(n);
  }
  return t;
}
function $y(e, t, n) {
  let r = "";
  const i = e.tag;
  for (let o = 0, s = n.length; o < s; o += 1) {
    let a = n[o];
    e.replacer && (a = e.replacer.call(n, String(o), a)), (yt(e, t, a, !1, !1) || typeof a > "u" && yt(e, t, null, !1, !1)) && (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
  }
  e.tag = i, e.dump = "[" + r + "]";
}
function dl(e, t, n, r) {
  let i = "";
  const o = e.tag;
  for (let s = 0, a = n.length; s < a; s += 1) {
    let l = n[s];
    e.replacer && (l = e.replacer.call(n, String(s), l)), (yt(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && yt(e, t + 1, null, !0, !0, !1, !0)) && ((!r || i !== "") && (i += Qo(e, t)), e.dump && cr === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  }
  e.tag = o, e.dump = i || "[]";
}
function Iy(e, t, n) {
  let r = "";
  const i = e.tag, o = Object.keys(n);
  for (let s = 0, a = o.length; s < a; s += 1) {
    let l = "";
    r !== "" && (l += ", "), e.condenseFlow && (l += '"');
    const p = o[s];
    let c = n[p];
    e.replacer && (c = e.replacer.call(n, p, c)), yt(e, t, p, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), yt(e, t, c, !1, !1) && (l += e.dump, r += l));
  }
  e.tag = i, e.dump = "{" + r + "}";
}
function Dy(e, t, n, r) {
  let i = "";
  const o = e.tag, s = Object.keys(n);
  if (e.sortKeys === !0)
    s.sort();
  else if (typeof e.sortKeys == "function")
    s.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Er("sortKeys must be a boolean or a function");
  for (let a = 0, l = s.length; a < l; a += 1) {
    let p = "";
    (!r || i !== "") && (p += Qo(e, t));
    const c = s[a];
    let u = n[c];
    if (e.replacer && (u = e.replacer.call(n, c, u)), !yt(e, t + 1, c, !0, !0, !0))
      continue;
    const d = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024;
    d && (e.dump && cr === e.dump.charCodeAt(0) ? p += "?" : p += "? "), p += e.dump, d && (p += Qo(e, t)), yt(e, t + 1, u, !0, d) && (e.dump && cr === e.dump.charCodeAt(0) ? p += ":" : p += ": ", p += e.dump, i += p);
  }
  e.tag = o, e.dump = i || "{}";
}
function hl(e, t, n) {
  const r = n ? e.explicitTypes : e.implicitTypes;
  for (let i = 0, o = r.length; i < o; i += 1) {
    const s = r[i];
    if ((s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (n ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        const a = e.styleMap[s.tag] || s.defaultStyle;
        let l;
        if (nf.call(s.represent) === "[object Function]")
          l = s.represent(t, a);
        else if (rf.call(s.represent, a))
          l = s.represent[a](t, a);
        else
          throw new Er("!<" + s.tag + '> tag resolver accepts not "' + a + '" style');
        e.dump = l;
      }
      return !0;
    }
  }
  return !1;
}
function yt(e, t, n, r, i, o, s) {
  e.tag = null, e.dump = n, hl(e, n, !1) || hl(e, n, !0);
  const a = nf.call(e.dump), l = r;
  r && (r = e.flowLevel < 0 || e.flowLevel > t);
  const p = a === "[object Object]" || a === "[object Array]";
  let c, u;
  if (p && (c = e.duplicates.indexOf(n), u = c !== -1), (e.tag !== null && e.tag !== "?" || u || e.indent !== 2 && t > 0) && (i = !1), u && e.usedDuplicates[c])
    e.dump = "*ref_" + c;
  else {
    if (p && u && !e.usedDuplicates[c] && (e.usedDuplicates[c] = !0), a === "[object Object]")
      r && Object.keys(e.dump).length !== 0 ? (Dy(e, t, e.dump, i), u && (e.dump = "&ref_" + c + e.dump)) : (Iy(e, t, e.dump), u && (e.dump = "&ref_" + c + " " + e.dump));
    else if (a === "[object Array]")
      r && e.dump.length !== 0 ? (e.noArrayIndent && !s && t > 0 ? dl(e, t - 1, e.dump, i) : dl(e, t, e.dump, i), u && (e.dump = "&ref_" + c + e.dump)) : ($y(e, t, e.dump), u && (e.dump = "&ref_" + c + " " + e.dump));
    else if (a === "[object String]")
      e.tag !== "?" && Ay(e, e.dump, t, o, l);
    else {
      if (a === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new Er("unacceptable kind of an object to dump " + a);
    }
    if (e.tag !== null && e.tag !== "?") {
      let d = encodeURI(
        e.tag[0] === "!" ? e.tag.slice(1) : e.tag
      ).replace(/!/g, "%21");
      e.tag[0] === "!" ? d = "!" + d : d.slice(0, 18) === "tag:yaml.org,2002:" ? d = "!!" + d.slice(18) : d = "!<" + d + ">", e.dump = d + " " + e.dump;
    }
  }
  return !0;
}
function Oy(e, t) {
  const n = [], r = [];
  es(e, n, r);
  const i = r.length;
  for (let o = 0; o < i; o += 1)
    t.duplicates.push(n[r[o]]);
  t.usedDuplicates = new Array(i);
}
function es(e, t, n) {
  if (e !== null && typeof e == "object") {
    const r = t.indexOf(e);
    if (r !== -1)
      n.indexOf(r) === -1 && n.push(r);
    else if (t.push(e), Array.isArray(e))
      for (let i = 0, o = e.length; i < o; i += 1)
        es(e[i], t, n);
    else {
      const i = Object.keys(e);
      for (let o = 0, s = i.length; o < s; o += 1)
        es(e[i[o]], t, n);
    }
  }
}
function Ry(e, t) {
  t = t || {};
  const n = new vy(t);
  n.noRefs || Oy(e, n);
  let r = e;
  return n.replacer && (r = n.replacer.call({ "": r }, "", r)), yt(n, 0, r, !0, !0) ? n.dump + `
` : "";
}
tf.dump = Ry;
const pf = $s, Py = tf;
function Ns(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Ae.Type = Ue;
Ae.Schema = bu;
Ae.FAILSAFE_SCHEMA = Cu;
Ae.JSON_SCHEMA = Pu;
Ae.CORE_SCHEMA = Nu;
Ae.DEFAULT_SCHEMA = Ds;
Ae.load = pf.load;
Ae.loadAll = pf.loadAll;
Ae.dump = Py.dump;
Ae.YAMLException = yr;
Ae.types = {
  binary: Mu,
  float: Ru,
  map: Tu,
  null: $u,
  pairs: Bu,
  set: Hu,
  timestamp: Uu,
  bool: Iu,
  int: Du,
  merge: ku,
  omap: ju,
  seq: Au,
  str: Su
};
Ae.safeLoad = Ns("safeLoad", "load");
Ae.safeLoadAll = Ns("safeLoadAll", "loadAll");
Ae.safeDump = Ns("safeDump", "dump");
var Ni = {};
Object.defineProperty(Ni, "__esModule", { value: !0 });
Ni.Lazy = void 0;
class Ny {
  constructor(t) {
    this._value = null, this.creator = t;
  }
  get hasValue() {
    return this.creator == null;
  }
  get value() {
    if (this.creator == null)
      return this._value;
    const t = this.creator();
    return this.value = t, t;
  }
  set value(t) {
    this._value = t, this.creator = null;
  }
}
Ni.Lazy = Ny;
var ts = { exports: {} };
const Fy = "2.0.0", mf = 256, Ly = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Uy = 16, ky = mf - 6, My = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var wr = {
  MAX_LENGTH: mf,
  MAX_SAFE_COMPONENT_LENGTH: Uy,
  MAX_SAFE_BUILD_LENGTH: ky,
  MAX_SAFE_INTEGER: Ly,
  RELEASE_TYPES: My,
  SEMVER_SPEC_VERSION: Fy,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const jy = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Fi = jy;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: r,
    MAX_LENGTH: i
  } = wr, o = Fi;
  t = e.exports = {};
  const s = t.re = [], a = t.safeRe = [], l = t.src = [], p = t.safeSrc = [], c = t.t = {};
  let u = 0;
  const d = "[a-zA-Z0-9-]", m = [
    ["\\s", 1],
    ["\\d", i],
    [d, r]
  ], w = (v) => {
    for (const [b, I] of m)
      v = v.split(`${b}*`).join(`${b}{0,${I}}`).split(`${b}+`).join(`${b}{1,${I}}`);
    return v;
  }, y = (v, b, I) => {
    const M = w(b), k = u++;
    o(v, k, b), c[v] = k, l[k] = b, p[k] = M, s[k] = new RegExp(b, I ? "g" : void 0), a[k] = new RegExp(M, I ? "g" : void 0);
  };
  y("NUMERICIDENTIFIER", "0|[1-9]\\d*"), y("NUMERICIDENTIFIERLOOSE", "\\d+"), y("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${d}*`), y("MAINVERSION", `(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})`), y("MAINVERSIONLOOSE", `(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASEIDENTIFIER", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIER]})`), y("PRERELEASEIDENTIFIERLOOSE", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASE", `(?:-(${l[c.PRERELEASEIDENTIFIER]}(?:\\.${l[c.PRERELEASEIDENTIFIER]})*))`), y("PRERELEASELOOSE", `(?:-?(${l[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[c.PRERELEASEIDENTIFIERLOOSE]})*))`), y("BUILDIDENTIFIER", `${d}+`), y("BUILD", `(?:\\+(${l[c.BUILDIDENTIFIER]}(?:\\.${l[c.BUILDIDENTIFIER]})*))`), y("FULLPLAIN", `v?${l[c.MAINVERSION]}${l[c.PRERELEASE]}?${l[c.BUILD]}?`), y("FULL", `^${l[c.FULLPLAIN]}$`), y("LOOSEPLAIN", `[v=\\s]*${l[c.MAINVERSIONLOOSE]}${l[c.PRERELEASELOOSE]}?${l[c.BUILD]}?`), y("LOOSE", `^${l[c.LOOSEPLAIN]}$`), y("GTLT", "((?:<|>)?=?)"), y("XRANGEIDENTIFIERLOOSE", `${l[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), y("XRANGEIDENTIFIER", `${l[c.NUMERICIDENTIFIER]}|x|X|\\*`), y("XRANGEPLAIN", `[v=\\s]*(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:${l[c.PRERELEASE]})?${l[c.BUILD]}?)?)?`), y("XRANGEPLAINLOOSE", `[v=\\s]*(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:${l[c.PRERELEASELOOSE]})?${l[c.BUILD]}?)?)?`), y("XRANGE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAIN]}$`), y("XRANGELOOSE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAINLOOSE]}$`), y("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), y("COERCE", `${l[c.COERCEPLAIN]}(?:$|[^\\d])`), y("COERCEFULL", l[c.COERCEPLAIN] + `(?:${l[c.PRERELEASE]})?(?:${l[c.BUILD]})?(?:$|[^\\d])`), y("COERCERTL", l[c.COERCE], !0), y("COERCERTLFULL", l[c.COERCEFULL], !0), y("LONETILDE", "(?:~>?)"), y("TILDETRIM", `(\\s*)${l[c.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", y("TILDE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAIN]}$`), y("TILDELOOSE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAINLOOSE]}$`), y("LONECARET", "(?:\\^)"), y("CARETTRIM", `(\\s*)${l[c.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", y("CARET", `^${l[c.LONECARET]}${l[c.XRANGEPLAIN]}$`), y("CARETLOOSE", `^${l[c.LONECARET]}${l[c.XRANGEPLAINLOOSE]}$`), y("COMPARATORLOOSE", `^${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]})$|^$`), y("COMPARATOR", `^${l[c.GTLT]}\\s*(${l[c.FULLPLAIN]})$|^$`), y("COMPARATORTRIM", `(\\s*)${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]}|${l[c.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", y("HYPHENRANGE", `^\\s*(${l[c.XRANGEPLAIN]})\\s+-\\s+(${l[c.XRANGEPLAIN]})\\s*$`), y("HYPHENRANGELOOSE", `^\\s*(${l[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[c.XRANGEPLAINLOOSE]})\\s*$`), y("STAR", "(<|>)?=?\\s*\\*"), y("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), y("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(ts, ts.exports);
var vr = ts.exports;
const By = Object.freeze({ loose: !0 }), Hy = Object.freeze({}), qy = (e) => e ? typeof e != "object" ? By : e : Hy;
var Fs = qy;
const pl = /^[0-9]+$/, gf = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const n = pl.test(e), r = pl.test(t);
  return n && r && (e = +e, t = +t), e === t ? 0 : n && !r ? -1 : r && !n ? 1 : e < t ? -1 : 1;
}, Gy = (e, t) => gf(t, e);
var yf = {
  compareIdentifiers: gf,
  rcompareIdentifiers: Gy
};
const Gr = Fi, { MAX_LENGTH: ml, MAX_SAFE_INTEGER: zr } = wr, { safeRe: Wr, t: Vr } = vr, zy = Fs, { compareIdentifiers: ns } = yf, Wy = (e, t) => {
  const n = t.split(".");
  if (n.length > e.length)
    return !1;
  for (let r = 0; r < n.length; r++)
    if (ns(e[r], n[r]) !== 0)
      return !1;
  return !0;
};
let Vy = class at {
  constructor(t, n) {
    if (n = zy(n), t instanceof at) {
      if (t.loose === !!n.loose && t.includePrerelease === !!n.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > ml)
      throw new TypeError(
        `version is longer than ${ml} characters`
      );
    Gr("SemVer", t, n), this.options = n, this.loose = !!n.loose, this.includePrerelease = !!n.includePrerelease;
    const r = t.trim().match(n.loose ? Wr[Vr.LOOSE] : Wr[Vr.FULL]);
    if (!r)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +r[1], this.minor = +r[2], this.patch = +r[3], this.major > zr || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > zr || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > zr || this.patch < 0)
      throw new TypeError("Invalid patch version");
    r[4] ? this.prerelease = r[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < zr)
          return o;
      }
      return i;
    }) : this.prerelease = [], this.build = r[5] ? r[5].split(".") : [], this.format();
  }
  format() {
    return this.version = `${this.major}.${this.minor}.${this.patch}`, this.prerelease.length && (this.version += `-${this.prerelease.join(".")}`), this.version;
  }
  toString() {
    return this.version;
  }
  compare(t) {
    if (Gr("SemVer.compare", this.version, this.options, t), !(t instanceof at)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new at(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof at || (t = new at(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof at || (t = new at(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let n = 0;
    do {
      const r = this.prerelease[n], i = t.prerelease[n];
      if (Gr("prerelease compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return ns(r, i);
    } while (++n);
  }
  compareBuild(t) {
    t instanceof at || (t = new at(t, this.options));
    let n = 0;
    do {
      const r = this.build[n], i = t.build[n];
      if (Gr("build compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return ns(r, i);
    } while (++n);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, n, r) {
    if (t.startsWith("pre")) {
      if (!n && r === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (n) {
        const i = `-${n}`.match(this.options.loose ? Wr[Vr.PRERELEASELOOSE] : Wr[Vr.PRERELEASE]);
        if (!i || i[1] !== n)
          throw new Error(`invalid identifier: ${n}`);
      }
    }
    switch (t) {
      case "premajor":
        this.prerelease.length = 0, this.patch = 0, this.minor = 0, this.major++, this.inc("pre", n, r);
        break;
      case "preminor":
        this.prerelease.length = 0, this.patch = 0, this.minor++, this.inc("pre", n, r);
        break;
      case "prepatch":
        this.prerelease.length = 0, this.inc("patch", n, r), this.inc("pre", n, r);
        break;
      case "prerelease":
        this.prerelease.length === 0 && this.inc("patch", n, r), this.inc("pre", n, r);
        break;
      case "release":
        if (this.prerelease.length === 0)
          throw new Error(`version ${this.raw} is not a prerelease`);
        this.prerelease.length = 0;
        break;
      case "major":
        (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) && this.major++, this.minor = 0, this.patch = 0, this.prerelease = [];
        break;
      case "minor":
        (this.patch !== 0 || this.prerelease.length === 0) && this.minor++, this.patch = 0, this.prerelease = [];
        break;
      case "patch":
        this.prerelease.length === 0 && this.patch++, this.prerelease = [];
        break;
      case "pre": {
        const i = Number(r) ? 1 : 0;
        if (this.prerelease.length === 0)
          this.prerelease = [i];
        else {
          let o = this.prerelease.length;
          for (; --o >= 0; )
            typeof this.prerelease[o] == "number" && (this.prerelease[o]++, o = -2);
          if (o === -1) {
            if (n === this.prerelease.join(".") && r === !1)
              throw new Error("invalid increment argument: identifier already exists");
            this.prerelease.push(i);
          }
        }
        if (n) {
          let o = [n, i];
          if (r === !1 && (o = [n]), Wy(this.prerelease, n)) {
            const s = this.prerelease[n.split(".").length];
            isNaN(s) && (this.prerelease = o);
          } else
            this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Oe = Vy;
const gl = Oe, Yy = (e, t, n = !1) => {
  if (e instanceof gl)
    return e;
  try {
    return new gl(e, t);
  } catch (r) {
    if (!n)
      return null;
    throw r;
  }
};
var tn = Yy;
const Xy = tn, Jy = (e, t) => {
  const n = Xy(e, t);
  return n ? n.version : null;
};
var Ky = Jy;
const Qy = tn, Zy = (e, t) => {
  const n = Qy(e.trim().replace(/^[=v]+/, ""), t);
  return n ? n.version : null;
};
var eE = Zy;
const yl = Oe, tE = (e, t, n, r, i) => {
  typeof n == "string" && (i = r, r = n, n = void 0);
  try {
    return new yl(
      e instanceof yl ? e.version : e,
      n
    ).inc(t, r, i).version;
  } catch {
    return null;
  }
};
var nE = tE;
const El = tn, rE = (e, t) => {
  const n = El(e, null, !0), r = El(t, null, !0), i = n.compare(r);
  if (i === 0)
    return null;
  const o = i > 0, s = o ? n : r, a = o ? r : n, l = !!s.prerelease.length;
  if (!!a.prerelease.length && !l) {
    if (!a.patch && !a.minor)
      return "major";
    if (a.compareMain(s) === 0)
      return a.minor && !a.patch ? "minor" : "patch";
  }
  const c = l ? "pre" : "";
  return n.major !== r.major ? c + "major" : n.minor !== r.minor ? c + "minor" : n.patch !== r.patch ? c + "patch" : "prerelease";
};
var iE = rE;
const oE = Oe, sE = (e, t) => new oE(e, t).major;
var aE = sE;
const lE = Oe, cE = (e, t) => new lE(e, t).minor;
var uE = cE;
const fE = Oe, dE = (e, t) => new fE(e, t).patch;
var hE = dE;
const pE = tn, mE = (e, t) => {
  const n = pE(e, t);
  return n && n.prerelease.length ? n.prerelease : null;
};
var gE = mE;
const wl = Oe, yE = (e, t, n) => new wl(e, n).compare(new wl(t, n));
var it = yE;
const EE = it, wE = (e, t, n) => EE(t, e, n);
var vE = wE;
const _E = it, xE = (e, t) => _E(e, t, !0);
var bE = xE;
const vl = Oe, SE = (e, t, n) => {
  const r = new vl(e, n), i = new vl(t, n);
  return r.compare(i) || r.compareBuild(i);
};
var Ls = SE;
const AE = Ls, TE = (e, t) => e.sort((n, r) => AE(n, r, t));
var CE = TE;
const $E = Ls, IE = (e, t) => e.sort((n, r) => $E(r, n, t));
var DE = IE;
const OE = it, RE = (e, t, n) => OE(e, t, n) > 0;
var Li = RE;
const PE = it, NE = (e, t, n) => PE(e, t, n) < 0;
var Us = NE;
const FE = it, LE = (e, t, n) => FE(e, t, n) === 0;
var Ef = LE;
const UE = it, kE = (e, t, n) => UE(e, t, n) !== 0;
var wf = kE;
const ME = it, jE = (e, t, n) => ME(e, t, n) >= 0;
var ks = jE;
const BE = it, HE = (e, t, n) => BE(e, t, n) <= 0;
var Ms = HE;
const qE = Ef, GE = wf, zE = Li, WE = ks, VE = Us, YE = Ms, XE = (e, t, n, r) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e === n;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e !== n;
    case "":
    case "=":
    case "==":
      return qE(e, n, r);
    case "!=":
      return GE(e, n, r);
    case ">":
      return zE(e, n, r);
    case ">=":
      return WE(e, n, r);
    case "<":
      return VE(e, n, r);
    case "<=":
      return YE(e, n, r);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var vf = XE;
const JE = Oe, KE = tn, { safeRe: Yr, t: Xr } = vr, QE = (e, t) => {
  if (e instanceof JE)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let n = null;
  if (!t.rtl)
    n = e.match(t.includePrerelease ? Yr[Xr.COERCEFULL] : Yr[Xr.COERCE]);
  else {
    const l = t.includePrerelease ? Yr[Xr.COERCERTLFULL] : Yr[Xr.COERCERTL];
    let p;
    for (; (p = l.exec(e)) && (!n || n.index + n[0].length !== e.length); )
      (!n || p.index + p[0].length !== n.index + n[0].length) && (n = p), l.lastIndex = p.index + p[1].length + p[2].length;
    l.lastIndex = -1;
  }
  if (n === null)
    return null;
  const r = n[2], i = n[3] || "0", o = n[4] || "0", s = t.includePrerelease && n[5] ? `-${n[5]}` : "", a = t.includePrerelease && n[6] ? `+${n[6]}` : "";
  return KE(`${r}.${i}.${o}${s}${a}`, t);
};
var ZE = QE;
const ew = tn, tw = wr, nw = Oe, rw = (e, t, n) => {
  if (!tw.RELEASE_TYPES.includes(t))
    return null;
  const r = iw(e, n);
  return r && ow(r, t);
}, iw = (e, t) => {
  const n = e instanceof nw ? e.version : e;
  return ew(n, t);
}, ow = (e, t) => {
  if (sw(t))
    return e.version;
  switch (e.prerelease = [], t) {
    case "major":
      e.minor = 0, e.patch = 0;
      break;
    case "minor":
      e.patch = 0;
      break;
  }
  return e.format();
}, sw = (e) => e.startsWith("pre");
var aw = rw;
class lw {
  constructor() {
    this.max = 1e3, this.map = /* @__PURE__ */ new Map();
  }
  get(t) {
    const n = this.map.get(t);
    if (n !== void 0)
      return this.map.delete(t), this.map.set(t, n), n;
  }
  delete(t) {
    return this.map.delete(t);
  }
  set(t, n) {
    if (!this.delete(t) && n !== void 0) {
      if (this.map.size >= this.max) {
        const i = this.map.keys().next().value;
        this.delete(i);
      }
      this.map.set(t, n);
    }
    return this;
  }
}
var cw = lw, To, _l;
function ot() {
  if (_l) return To;
  _l = 1;
  const e = /\s+/g;
  class t {
    constructor(S, O) {
      if (O = i(O), S instanceof t)
        return S.loose === !!O.loose && S.includePrerelease === !!O.includePrerelease ? S : new t(S.raw, O);
      if (S instanceof o)
        return this.raw = S.value, this.set = [[S]], this.formatted = void 0, this;
      if (this.options = O, this.loose = !!O.loose, this.includePrerelease = !!O.includePrerelease, this.raw = S.trim().replace(e, " "), this.set = this.raw.split("||").map((L) => this.parseRange(L.trim())).filter((L) => L.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const L = this.set[0];
        if (this.set = this.set.filter((W) => !b(W[0])), this.set.length === 0)
          this.set = [L];
        else if (this.set.length > 1) {
          for (const W of this.set)
            if (W.length === 1 && I(W[0])) {
              this.set = [W];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let S = 0; S < this.set.length; S++) {
          S > 0 && (this.formatted += "||");
          const O = this.set[S];
          for (let L = 0; L < O.length; L++)
            L > 0 && (this.formatted += " "), this.formatted += O[L].toString().trim();
        }
      }
      return this.formatted;
    }
    format() {
      return this.range;
    }
    toString() {
      return this.range;
    }
    parseRange(S) {
      S = S.replace(v, "");
      const L = ((this.options.includePrerelease && w) | (this.options.loose && y)) + ":" + S, W = r.get(L);
      if (W)
        return W;
      const N = this.options.loose, q = N ? l[c.HYPHENRANGELOOSE] : l[c.HYPHENRANGE];
      S = S.replace(q, H(this.options.includePrerelease)), s("hyphen replace", S), S = S.replace(l[c.COMPARATORTRIM], u), s("comparator trim", S), S = S.replace(l[c.TILDETRIM], d), s("tilde trim", S), S = S.replace(l[c.CARETTRIM], m), s("caret trim", S);
      let Y = S.split(" ").map((te) => k(te, this.options)).join(" ").split(/\s+/).map((te) => K(te, this.options));
      N && (Y = Y.filter((te) => (s("loose invalid filter", te, this.options), !!te.match(l[c.COMPARATORLOOSE])))), s("range list", Y);
      const j = /* @__PURE__ */ new Map(), X = Y.map((te) => new o(te, this.options));
      for (const te of X) {
        if (b(te))
          return [te];
        j.set(te.value, te);
      }
      j.size > 1 && j.has("") && j.delete("");
      const ne = [...j.values()];
      return r.set(L, ne), ne;
    }
    intersects(S, O) {
      if (!(S instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((L) => M(L, O) && S.set.some((W) => M(W, O) && L.every((N) => W.every((q) => N.intersects(q, O)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(S) {
      if (!S)
        return !1;
      if (typeof S == "string")
        try {
          S = new a(S, this.options);
        } catch {
          return !1;
        }
      for (let O = 0; O < this.set.length; O++)
        if (J(this.set[O], S, this.options))
          return !0;
      return !1;
    }
  }
  To = t;
  const n = cw, r = new n(), i = Fs, o = Ui(), s = Fi, a = Oe, {
    safeRe: l,
    src: p,
    t: c,
    comparatorTrimReplace: u,
    tildeTrimReplace: d,
    caretTrimReplace: m
  } = vr, { FLAG_INCLUDE_PRERELEASE: w, FLAG_LOOSE: y } = wr, v = new RegExp(p[c.BUILD], "g"), b = (C) => C.value === "<0.0.0-0", I = (C) => C.value === "", M = (C, S) => {
    let O = !0;
    const L = C.slice();
    let W = L.pop();
    for (; O && L.length; )
      O = L.every((N) => W.intersects(N, S)), W = L.pop();
    return O;
  }, k = (C, S) => (C = C.replace(l[c.BUILD], ""), s("comp", C, S), C = $(C, S), s("caret", C), C = D(C, S), s("tildes", C), C = z(C, S), s("xrange", C), C = ee(C, S), s("stars", C), C), U = (C) => !C || C.toLowerCase() === "x" || C === "*", A = (C, S, O) => U(C) && !U(S) || U(S) && O && !U(O), D = (C, S) => C.trim().split(/\s+/).map((O) => R(O, S)).join(" "), R = (C, S) => {
    const O = S.loose ? l[c.TILDELOOSE] : l[c.TILDE], L = S.includePrerelease ? "-0" : "";
    return C.replace(O, (W, N, q, Y, j) => {
      s("tilde", C, W, N, q, Y, j);
      let X;
      return U(N) ? X = "" : U(q) ? X = `>=${N}.0.0${L} <${+N + 1}.0.0-0` : U(Y) ? X = `>=${N}.${q}.0${L} <${N}.${+q + 1}.0-0` : j ? (s("replaceTilde pr", j), X = `>=${N}.${q}.${Y}-${j} <${N}.${+q + 1}.0-0`) : X = `>=${N}.${q}.${Y} <${N}.${+q + 1}.0-0`, s("tilde return", X), X;
    });
  }, $ = (C, S) => C.trim().split(/\s+/).map((O) => E(O, S)).join(" "), E = (C, S) => {
    s("caret", C, S);
    const O = S.loose ? l[c.CARETLOOSE] : l[c.CARET], L = S.includePrerelease ? "-0" : "";
    return C.replace(O, (W, N, q, Y, j) => {
      s("caret", C, W, N, q, Y, j);
      let X;
      return U(N) ? X = "" : U(q) ? X = `>=${N}.0.0${L} <${+N + 1}.0.0-0` : U(Y) ? N === "0" ? X = `>=${N}.${q}.0${L} <${N}.${+q + 1}.0-0` : X = `>=${N}.${q}.0${L} <${+N + 1}.0.0-0` : j ? (s("replaceCaret pr", j), N === "0" ? q === "0" ? X = `>=${N}.${q}.${Y}-${j} <${N}.${q}.${+Y + 1}-0` : X = `>=${N}.${q}.${Y}-${j} <${N}.${+q + 1}.0-0` : X = `>=${N}.${q}.${Y}-${j} <${+N + 1}.0.0-0`) : (s("no pr"), N === "0" ? q === "0" ? X = `>=${N}.${q}.${Y} <${N}.${q}.${+Y + 1}-0` : X = `>=${N}.${q}.${Y} <${N}.${+q + 1}.0-0` : X = `>=${N}.${q}.${Y} <${+N + 1}.0.0-0`), s("caret return", X), X;
    });
  }, z = (C, S) => (s("replaceXRanges", C, S), C.split(/\s+/).map((O) => Q(O, S)).join(" ")), Q = (C, S) => {
    C = C.trim();
    const O = S.loose ? l[c.XRANGELOOSE] : l[c.XRANGE];
    return C.replace(O, (L, W, N, q, Y, j) => {
      if (s("xRange", C, L, W, N, q, Y, j), A(N, q, Y))
        return C;
      const X = U(N), ne = X || U(q), te = ne || U(Y), Re = te;
      return W === "=" && Re && (W = ""), j = S.includePrerelease ? "-0" : "", X ? W === ">" || W === "<" ? L = "<0.0.0-0" : L = "*" : W && Re ? (ne && (q = 0), Y = 0, W === ">" ? (W = ">=", ne ? (N = +N + 1, q = 0, Y = 0) : (q = +q + 1, Y = 0)) : W === "<=" && (W = "<", ne ? N = +N + 1 : q = +q + 1), W === "<" && (j = "-0"), L = `${W + N}.${q}.${Y}${j}`) : ne ? L = `>=${N}.0.0${j} <${+N + 1}.0.0-0` : te && (L = `>=${N}.${q}.0${j} <${N}.${+q + 1}.0-0`), s("xRange return", L), L;
    });
  }, ee = (C, S) => (s("replaceStars", C, S), C.trim().replace(l[c.STAR], "")), K = (C, S) => (s("replaceGTE0", C, S), C.trim().replace(l[S.includePrerelease ? c.GTE0PRE : c.GTE0], "")), H = (C) => (S, O, L, W, N, q, Y, j, X, ne, te, Re) => (U(L) ? O = "" : U(W) ? O = `>=${L}.0.0${C ? "-0" : ""}` : U(N) ? O = `>=${L}.${W}.0${C ? "-0" : ""}` : q ? O = `>=${O}` : O = `>=${O}${C ? "-0" : ""}`, U(X) ? j = "" : U(ne) ? j = `<${+X + 1}.0.0-0` : U(te) ? j = `<${X}.${+ne + 1}.0-0` : Re ? j = `<=${X}.${ne}.${te}-${Re}` : C ? j = `<${X}.${ne}.${+te + 1}-0` : j = `<=${j}`, `${O} ${j}`.trim()), J = (C, S, O) => {
    for (let L = 0; L < C.length; L++)
      if (!C[L].test(S))
        return !1;
    if (S.prerelease.length && !O.includePrerelease) {
      for (let L = 0; L < C.length; L++)
        if (s(C[L].semver), C[L].semver !== o.ANY && C[L].semver.prerelease.length > 0) {
          const W = C[L].semver;
          if (W.major === S.major && W.minor === S.minor && W.patch === S.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return To;
}
var Co, xl;
function Ui() {
  if (xl) return Co;
  xl = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(c, u) {
      if (u = n(u), c instanceof t) {
        if (c.loose === !!u.loose)
          return c;
        c = c.value;
      }
      c = c.trim().split(/\s+/).join(" "), s("comparator", c, u), this.options = u, this.loose = !!u.loose, this.parse(c), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, s("comp", this);
    }
    parse(c) {
      const u = this.options.loose ? r[i.COMPARATORLOOSE] : r[i.COMPARATOR], d = c.match(u);
      if (!d)
        throw new TypeError(`Invalid comparator: ${c}`);
      this.operator = d[1] !== void 0 ? d[1] : "", this.operator === "=" && (this.operator = ""), d[2] ? this.semver = new a(d[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(c) {
      if (s("Comparator.test", c, this.options.loose), this.semver === e || c === e)
        return !0;
      if (typeof c == "string")
        try {
          c = new a(c, this.options);
        } catch {
          return !1;
        }
      return o(c, this.operator, this.semver, this.options);
    }
    intersects(c, u) {
      if (!(c instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(c.value, u).test(this.value) : c.operator === "" ? c.value === "" ? !0 : new l(this.value, u).test(c.semver) : (u = n(u), u.includePrerelease && (this.value === "<0.0.0-0" || c.value === "<0.0.0-0") || !u.includePrerelease && (this.value.startsWith("<0.0.0") || c.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && c.operator.startsWith(">") || this.operator.startsWith("<") && c.operator.startsWith("<") || this.semver.version === c.semver.version && this.operator.includes("=") && c.operator.includes("=") || o(this.semver, "<", c.semver, u) && this.operator.startsWith(">") && c.operator.startsWith("<") || o(this.semver, ">", c.semver, u) && this.operator.startsWith("<") && c.operator.startsWith(">")));
    }
  }
  Co = t;
  const n = Fs, { safeRe: r, t: i } = vr, o = vf, s = Fi, a = Oe, l = ot();
  return Co;
}
const uw = ot(), fw = (e, t, n) => {
  try {
    t = new uw(t, n);
  } catch {
    return !1;
  }
  return t.test(e);
};
var ki = fw;
const dw = ot(), hw = (e, t) => new dw(e, t).set.map((n) => n.map((r) => r.value).join(" ").trim().split(" "));
var pw = hw;
const mw = Oe, gw = ot(), yw = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new gw(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!r || i.compare(s) === -1) && (r = s, i = new mw(r, n));
  }), r;
};
var Ew = yw;
const ww = Oe, vw = ot(), _w = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new vw(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!r || i.compare(s) === 1) && (r = s, i = new ww(r, n));
  }), r;
};
var xw = _w;
const $o = Oe, bw = ot(), bl = Li, Sw = (e, t) => {
  e = new bw(e, t);
  let n = new $o("0.0.0");
  if (e.test(n) || (n = new $o("0.0.0-0"), e.test(n)))
    return n;
  n = null;
  for (let r = 0; r < e.set.length; ++r) {
    const i = e.set[r];
    let o = null;
    i.forEach((s) => {
      const a = new $o(s.semver.version);
      switch (s.operator) {
        case ">":
          a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), a.raw = a.format();
        case "":
        case ">=":
          (!o || bl(a, o)) && (o = a);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${s.operator}`);
      }
    }), o && (!n || bl(n, o)) && (n = o);
  }
  return n && e.test(n) ? n : null;
};
var Aw = Sw;
const Tw = ot(), Cw = (e, t) => {
  try {
    return new Tw(e, t).range || "*";
  } catch {
    return null;
  }
};
var $w = Cw;
const Iw = Oe, _f = Ui(), { ANY: Dw } = _f, Ow = ot(), Rw = ki, Sl = Li, Al = Us, Pw = Ms, Nw = ks, Fw = (e, t, n, r) => {
  e = new Iw(e, r), t = new Ow(t, r);
  let i, o, s, a, l;
  switch (n) {
    case ">":
      i = Sl, o = Pw, s = Al, a = ">", l = ">=";
      break;
    case "<":
      i = Al, o = Nw, s = Sl, a = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (Rw(e, t, r))
    return !1;
  for (let p = 0; p < t.set.length; ++p) {
    const c = t.set[p];
    let u = null, d = null;
    if (c.forEach((m) => {
      m.semver === Dw && (m = new _f(">=0.0.0")), u = u || m, d = d || m, i(m.semver, u.semver, r) ? u = m : s(m.semver, d.semver, r) && (d = m);
    }), u.operator === a || u.operator === l || (!d.operator || d.operator === a) && o(e, d.semver))
      return !1;
    if (d.operator === l && s(e, d.semver))
      return !1;
  }
  return !0;
};
var js = Fw;
const Lw = js, Uw = (e, t, n) => Lw(e, t, ">", n);
var kw = Uw;
const Mw = js, jw = (e, t, n) => Mw(e, t, "<", n);
var Bw = jw;
const Tl = ot(), Hw = (e, t, n) => (e = new Tl(e, n), t = new Tl(t, n), e.intersects(t, n));
var qw = Hw;
const Gw = ki, zw = it;
var Ww = (e, t, n) => {
  const r = [];
  let i = null, o = null;
  const s = e.sort((c, u) => zw(c, u, n));
  for (const c of s)
    Gw(c, t, n) ? (o = c, i || (i = c)) : (o && r.push([i, o]), o = null, i = null);
  i && r.push([i, null]);
  const a = [];
  for (const [c, u] of r)
    c === u ? a.push(c) : !u && c === s[0] ? a.push("*") : u ? c === s[0] ? a.push(`<=${u}`) : a.push(`${c} - ${u}`) : a.push(`>=${c}`);
  const l = a.join(" || "), p = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < p.length ? l : t;
};
const Cl = ot(), Bs = Ui(), { ANY: Io } = Bs, Do = ki, Hs = it, Vw = (e, t, n = {}) => {
  if (e === t)
    return !0;
  e = new Cl(e, n), t = new Cl(t, n);
  let r = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const s = Xw(i, o, n);
      if (r = r || s !== null, s)
        continue e;
    }
    if (r)
      return !1;
  }
  return !0;
}, Yw = [new Bs(">=0.0.0-0")], $l = [new Bs(">=0.0.0")], Xw = (e, t, n) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Io) {
    if (t.length === 1 && t[0].semver === Io)
      return !0;
    n.includePrerelease ? e = Yw : e = $l;
  }
  if (t.length === 1 && t[0].semver === Io) {
    if (n.includePrerelease)
      return !0;
    t = $l;
  }
  const r = /* @__PURE__ */ new Set();
  let i, o;
  for (const m of e)
    m.operator === ">" || m.operator === ">=" ? i = Il(i, m, n) : m.operator === "<" || m.operator === "<=" ? o = Dl(o, m, n) : r.add(m.semver);
  if (r.size > 1)
    return null;
  let s;
  if (i && o) {
    if (s = Hs(i.semver, o.semver, n), s > 0)
      return null;
    if (s === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const m of r) {
    if (i && !Do(m, String(i), n) || o && !Do(m, String(o), n))
      return null;
    for (const w of t)
      if (!Do(m, String(w), n))
        return !1;
    return !0;
  }
  let a, l, p, c, u = o && !n.includePrerelease && o.semver.prerelease.length ? o.semver : !1, d = i && !n.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && o.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const m of t) {
    if (c = c || m.operator === ">" || m.operator === ">=", p = p || m.operator === "<" || m.operator === "<=", i) {
      if (d && m.semver.prerelease && m.semver.prerelease.length && m.semver.major === d.major && m.semver.minor === d.minor && m.semver.patch === d.patch && (d = !1), m.operator === ">" || m.operator === ">=") {
        if (a = Il(i, m, n), a === m && a !== i)
          return !1;
      } else if (i.operator === ">=" && !m.test(i.semver))
        return !1;
    }
    if (o) {
      if (u && m.semver.prerelease && m.semver.prerelease.length && m.semver.major === u.major && m.semver.minor === u.minor && m.semver.patch === u.patch && (u = !1), m.operator === "<" || m.operator === "<=") {
        if (l = Dl(o, m, n), l === m && l !== o)
          return !1;
      } else if (o.operator === "<=" && !m.test(o.semver))
        return !1;
    }
    if (!m.operator && (o || i) && s !== 0)
      return !1;
  }
  return !(i && p && !o && s !== 0 || o && c && !i && s !== 0 || d || u);
}, Il = (e, t, n) => {
  if (!e)
    return t;
  const r = Hs(e.semver, t.semver, n);
  return r > 0 ? e : r < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Dl = (e, t, n) => {
  if (!e)
    return t;
  const r = Hs(e.semver, t.semver, n);
  return r < 0 ? e : r > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var Jw = Vw;
const Oo = vr, Ol = wr, Kw = Oe, Rl = yf, Qw = tn, Zw = Ky, ev = eE, tv = nE, nv = iE, rv = aE, iv = uE, ov = hE, sv = gE, av = it, lv = vE, cv = bE, uv = Ls, fv = CE, dv = DE, hv = Li, pv = Us, mv = Ef, gv = wf, yv = ks, Ev = Ms, wv = vf, vv = ZE, _v = aw, xv = Ui(), bv = ot(), Sv = ki, Av = pw, Tv = Ew, Cv = xw, $v = Aw, Iv = $w, Dv = js, Ov = kw, Rv = Bw, Pv = qw, Nv = Ww, Fv = Jw;
var xf = {
  parse: Qw,
  valid: Zw,
  clean: ev,
  inc: tv,
  diff: nv,
  major: rv,
  minor: iv,
  patch: ov,
  prerelease: sv,
  compare: av,
  rcompare: lv,
  compareLoose: cv,
  compareBuild: uv,
  sort: fv,
  rsort: dv,
  gt: hv,
  lt: pv,
  eq: mv,
  neq: gv,
  gte: yv,
  lte: Ev,
  cmp: wv,
  coerce: vv,
  truncate: _v,
  Comparator: xv,
  Range: bv,
  satisfies: Sv,
  toComparators: Av,
  maxSatisfying: Tv,
  minSatisfying: Cv,
  minVersion: $v,
  validRange: Iv,
  outside: Dv,
  gtr: Ov,
  ltr: Rv,
  intersects: Pv,
  simplifyRange: Nv,
  subset: Fv,
  SemVer: Kw,
  re: Oo.re,
  src: Oo.src,
  tokens: Oo.t,
  SEMVER_SPEC_VERSION: Ol.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Ol.RELEASE_TYPES,
  compareIdentifiers: Rl.compareIdentifiers,
  rcompareIdentifiers: Rl.rcompareIdentifiers
}, _r = {}, wi = { exports: {} };
wi.exports;
(function(e, t) {
  var n = 200, r = "__lodash_hash_undefined__", i = 1, o = 2, s = 9007199254740991, a = "[object Arguments]", l = "[object Array]", p = "[object AsyncFunction]", c = "[object Boolean]", u = "[object Date]", d = "[object Error]", m = "[object Function]", w = "[object GeneratorFunction]", y = "[object Map]", v = "[object Number]", b = "[object Null]", I = "[object Object]", M = "[object Promise]", k = "[object Proxy]", U = "[object RegExp]", A = "[object Set]", D = "[object String]", R = "[object Symbol]", $ = "[object Undefined]", E = "[object WeakMap]", z = "[object ArrayBuffer]", Q = "[object DataView]", ee = "[object Float32Array]", K = "[object Float64Array]", H = "[object Int8Array]", J = "[object Int16Array]", C = "[object Int32Array]", S = "[object Uint8Array]", O = "[object Uint8ClampedArray]", L = "[object Uint16Array]", W = "[object Uint32Array]", N = /[\\^$.*+?()[\]{}|]/g, q = /^\[object .+?Constructor\]$/, Y = /^(?:0|[1-9]\d*)$/, j = {};
  j[ee] = j[K] = j[H] = j[J] = j[C] = j[S] = j[O] = j[L] = j[W] = !0, j[a] = j[l] = j[z] = j[c] = j[Q] = j[u] = j[d] = j[m] = j[y] = j[v] = j[I] = j[U] = j[A] = j[D] = j[E] = !1;
  var X = typeof ze == "object" && ze && ze.Object === Object && ze, ne = typeof self == "object" && self && self.Object === Object && self, te = X || ne || Function("return this")(), Re = t && !t.nodeType && t, vt = Re && !0 && e && !e.nodeType && e, rn = vt && vt.exports === Re, Nn = rn && X.process, h = function() {
    try {
      return Nn && Nn.binding && Nn.binding("util");
    } catch {
    }
  }(), f = h && h.isTypedArray;
  function T(g, x) {
    for (var P = -1, G = g == null ? 0 : g.length, ce = 0, Z = []; ++P < G; ) {
      var pe = g[P];
      x(pe, P, g) && (Z[ce++] = pe);
    }
    return Z;
  }
  function _(g, x) {
    for (var P = -1, G = x.length, ce = g.length; ++P < G; )
      g[ce + P] = x[P];
    return g;
  }
  function ie(g, x) {
    for (var P = -1, G = g == null ? 0 : g.length; ++P < G; )
      if (x(g[P], P, g))
        return !0;
    return !1;
  }
  function fe(g, x) {
    for (var P = -1, G = Array(g); ++P < g; )
      G[P] = x(P);
    return G;
  }
  function ge(g) {
    return function(x) {
      return g(x);
    };
  }
  function Te(g, x) {
    return g.has(x);
  }
  function Ce(g, x) {
    return g == null ? void 0 : g[x];
  }
  function Ve(g) {
    var x = -1, P = Array(g.size);
    return g.forEach(function(G, ce) {
      P[++x] = [ce, G];
    }), P;
  }
  function Ee(g, x) {
    return function(P) {
      return g(x(P));
    };
  }
  function Ye(g) {
    var x = -1, P = Array(g.size);
    return g.forEach(function(G) {
      P[++x] = G;
    }), P;
  }
  var io = Array.prototype, Dr = Function.prototype, _t = Object.prototype, on = te["__core-js_shared__"], ta = Dr.toString, st = _t.hasOwnProperty, na = function() {
    var g = /[^.]+$/.exec(on && on.keys && on.keys.IE_PROTO || "");
    return g ? "Symbol(src)_1." + g : "";
  }(), ra = _t.toString, td = RegExp(
    "^" + ta.call(st).replace(N, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), ia = rn ? te.Buffer : void 0, Or = te.Symbol, oa = te.Uint8Array, sa = _t.propertyIsEnumerable, nd = io.splice, Mt = Or ? Or.toStringTag : void 0, aa = Object.getOwnPropertySymbols, rd = ia ? ia.isBuffer : void 0, id = Ee(Object.keys, Object), oo = sn(te, "DataView"), Fn = sn(te, "Map"), so = sn(te, "Promise"), ao = sn(te, "Set"), lo = sn(te, "WeakMap"), Ln = sn(Object, "create"), od = Ht(oo), sd = Ht(Fn), ad = Ht(so), ld = Ht(ao), cd = Ht(lo), la = Or ? Or.prototype : void 0, co = la ? la.valueOf : void 0;
  function jt(g) {
    var x = -1, P = g == null ? 0 : g.length;
    for (this.clear(); ++x < P; ) {
      var G = g[x];
      this.set(G[0], G[1]);
    }
  }
  function ud() {
    this.__data__ = Ln ? Ln(null) : {}, this.size = 0;
  }
  function fd(g) {
    var x = this.has(g) && delete this.__data__[g];
    return this.size -= x ? 1 : 0, x;
  }
  function dd(g) {
    var x = this.__data__;
    if (Ln) {
      var P = x[g];
      return P === r ? void 0 : P;
    }
    return st.call(x, g) ? x[g] : void 0;
  }
  function hd(g) {
    var x = this.__data__;
    return Ln ? x[g] !== void 0 : st.call(x, g);
  }
  function pd(g, x) {
    var P = this.__data__;
    return this.size += this.has(g) ? 0 : 1, P[g] = Ln && x === void 0 ? r : x, this;
  }
  jt.prototype.clear = ud, jt.prototype.delete = fd, jt.prototype.get = dd, jt.prototype.has = hd, jt.prototype.set = pd;
  function dt(g) {
    var x = -1, P = g == null ? 0 : g.length;
    for (this.clear(); ++x < P; ) {
      var G = g[x];
      this.set(G[0], G[1]);
    }
  }
  function md() {
    this.__data__ = [], this.size = 0;
  }
  function gd(g) {
    var x = this.__data__, P = Pr(x, g);
    if (P < 0)
      return !1;
    var G = x.length - 1;
    return P == G ? x.pop() : nd.call(x, P, 1), --this.size, !0;
  }
  function yd(g) {
    var x = this.__data__, P = Pr(x, g);
    return P < 0 ? void 0 : x[P][1];
  }
  function Ed(g) {
    return Pr(this.__data__, g) > -1;
  }
  function wd(g, x) {
    var P = this.__data__, G = Pr(P, g);
    return G < 0 ? (++this.size, P.push([g, x])) : P[G][1] = x, this;
  }
  dt.prototype.clear = md, dt.prototype.delete = gd, dt.prototype.get = yd, dt.prototype.has = Ed, dt.prototype.set = wd;
  function Bt(g) {
    var x = -1, P = g == null ? 0 : g.length;
    for (this.clear(); ++x < P; ) {
      var G = g[x];
      this.set(G[0], G[1]);
    }
  }
  function vd() {
    this.size = 0, this.__data__ = {
      hash: new jt(),
      map: new (Fn || dt)(),
      string: new jt()
    };
  }
  function _d(g) {
    var x = Nr(this, g).delete(g);
    return this.size -= x ? 1 : 0, x;
  }
  function xd(g) {
    return Nr(this, g).get(g);
  }
  function bd(g) {
    return Nr(this, g).has(g);
  }
  function Sd(g, x) {
    var P = Nr(this, g), G = P.size;
    return P.set(g, x), this.size += P.size == G ? 0 : 1, this;
  }
  Bt.prototype.clear = vd, Bt.prototype.delete = _d, Bt.prototype.get = xd, Bt.prototype.has = bd, Bt.prototype.set = Sd;
  function Rr(g) {
    var x = -1, P = g == null ? 0 : g.length;
    for (this.__data__ = new Bt(); ++x < P; )
      this.add(g[x]);
  }
  function Ad(g) {
    return this.__data__.set(g, r), this;
  }
  function Td(g) {
    return this.__data__.has(g);
  }
  Rr.prototype.add = Rr.prototype.push = Ad, Rr.prototype.has = Td;
  function xt(g) {
    var x = this.__data__ = new dt(g);
    this.size = x.size;
  }
  function Cd() {
    this.__data__ = new dt(), this.size = 0;
  }
  function $d(g) {
    var x = this.__data__, P = x.delete(g);
    return this.size = x.size, P;
  }
  function Id(g) {
    return this.__data__.get(g);
  }
  function Dd(g) {
    return this.__data__.has(g);
  }
  function Od(g, x) {
    var P = this.__data__;
    if (P instanceof dt) {
      var G = P.__data__;
      if (!Fn || G.length < n - 1)
        return G.push([g, x]), this.size = ++P.size, this;
      P = this.__data__ = new Bt(G);
    }
    return P.set(g, x), this.size = P.size, this;
  }
  xt.prototype.clear = Cd, xt.prototype.delete = $d, xt.prototype.get = Id, xt.prototype.has = Dd, xt.prototype.set = Od;
  function Rd(g, x) {
    var P = Fr(g), G = !P && Vd(g), ce = !P && !G && uo(g), Z = !P && !G && !ce && ya(g), pe = P || G || ce || Z, we = pe ? fe(g.length, String) : [], be = we.length;
    for (var de in g)
      st.call(g, de) && !(pe && // Safari 9 has enumerable `arguments.length` in strict mode.
      (de == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      ce && (de == "offset" || de == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      Z && (de == "buffer" || de == "byteLength" || de == "byteOffset") || // Skip index properties.
      Hd(de, be))) && we.push(de);
    return we;
  }
  function Pr(g, x) {
    for (var P = g.length; P--; )
      if (ha(g[P][0], x))
        return P;
    return -1;
  }
  function Pd(g, x, P) {
    var G = x(g);
    return Fr(g) ? G : _(G, P(g));
  }
  function Un(g) {
    return g == null ? g === void 0 ? $ : b : Mt && Mt in Object(g) ? jd(g) : Wd(g);
  }
  function ca(g) {
    return kn(g) && Un(g) == a;
  }
  function ua(g, x, P, G, ce) {
    return g === x ? !0 : g == null || x == null || !kn(g) && !kn(x) ? g !== g && x !== x : Nd(g, x, P, G, ua, ce);
  }
  function Nd(g, x, P, G, ce, Z) {
    var pe = Fr(g), we = Fr(x), be = pe ? l : bt(g), de = we ? l : bt(x);
    be = be == a ? I : be, de = de == a ? I : de;
    var Be = be == I, Xe = de == I, $e = be == de;
    if ($e && uo(g)) {
      if (!uo(x))
        return !1;
      pe = !0, Be = !1;
    }
    if ($e && !Be)
      return Z || (Z = new xt()), pe || ya(g) ? fa(g, x, P, G, ce, Z) : kd(g, x, be, P, G, ce, Z);
    if (!(P & i)) {
      var qe = Be && st.call(g, "__wrapped__"), Ge = Xe && st.call(x, "__wrapped__");
      if (qe || Ge) {
        var St = qe ? g.value() : g, ht = Ge ? x.value() : x;
        return Z || (Z = new xt()), ce(St, ht, P, G, Z);
      }
    }
    return $e ? (Z || (Z = new xt()), Md(g, x, P, G, ce, Z)) : !1;
  }
  function Fd(g) {
    if (!ga(g) || Gd(g))
      return !1;
    var x = pa(g) ? td : q;
    return x.test(Ht(g));
  }
  function Ld(g) {
    return kn(g) && ma(g.length) && !!j[Un(g)];
  }
  function Ud(g) {
    if (!zd(g))
      return id(g);
    var x = [];
    for (var P in Object(g))
      st.call(g, P) && P != "constructor" && x.push(P);
    return x;
  }
  function fa(g, x, P, G, ce, Z) {
    var pe = P & i, we = g.length, be = x.length;
    if (we != be && !(pe && be > we))
      return !1;
    var de = Z.get(g);
    if (de && Z.get(x))
      return de == x;
    var Be = -1, Xe = !0, $e = P & o ? new Rr() : void 0;
    for (Z.set(g, x), Z.set(x, g); ++Be < we; ) {
      var qe = g[Be], Ge = x[Be];
      if (G)
        var St = pe ? G(Ge, qe, Be, x, g, Z) : G(qe, Ge, Be, g, x, Z);
      if (St !== void 0) {
        if (St)
          continue;
        Xe = !1;
        break;
      }
      if ($e) {
        if (!ie(x, function(ht, qt) {
          if (!Te($e, qt) && (qe === ht || ce(qe, ht, P, G, Z)))
            return $e.push(qt);
        })) {
          Xe = !1;
          break;
        }
      } else if (!(qe === Ge || ce(qe, Ge, P, G, Z))) {
        Xe = !1;
        break;
      }
    }
    return Z.delete(g), Z.delete(x), Xe;
  }
  function kd(g, x, P, G, ce, Z, pe) {
    switch (P) {
      case Q:
        if (g.byteLength != x.byteLength || g.byteOffset != x.byteOffset)
          return !1;
        g = g.buffer, x = x.buffer;
      case z:
        return !(g.byteLength != x.byteLength || !Z(new oa(g), new oa(x)));
      case c:
      case u:
      case v:
        return ha(+g, +x);
      case d:
        return g.name == x.name && g.message == x.message;
      case U:
      case D:
        return g == x + "";
      case y:
        var we = Ve;
      case A:
        var be = G & i;
        if (we || (we = Ye), g.size != x.size && !be)
          return !1;
        var de = pe.get(g);
        if (de)
          return de == x;
        G |= o, pe.set(g, x);
        var Be = fa(we(g), we(x), G, ce, Z, pe);
        return pe.delete(g), Be;
      case R:
        if (co)
          return co.call(g) == co.call(x);
    }
    return !1;
  }
  function Md(g, x, P, G, ce, Z) {
    var pe = P & i, we = da(g), be = we.length, de = da(x), Be = de.length;
    if (be != Be && !pe)
      return !1;
    for (var Xe = be; Xe--; ) {
      var $e = we[Xe];
      if (!(pe ? $e in x : st.call(x, $e)))
        return !1;
    }
    var qe = Z.get(g);
    if (qe && Z.get(x))
      return qe == x;
    var Ge = !0;
    Z.set(g, x), Z.set(x, g);
    for (var St = pe; ++Xe < be; ) {
      $e = we[Xe];
      var ht = g[$e], qt = x[$e];
      if (G)
        var Ea = pe ? G(qt, ht, $e, x, g, Z) : G(ht, qt, $e, g, x, Z);
      if (!(Ea === void 0 ? ht === qt || ce(ht, qt, P, G, Z) : Ea)) {
        Ge = !1;
        break;
      }
      St || (St = $e == "constructor");
    }
    if (Ge && !St) {
      var Lr = g.constructor, Ur = x.constructor;
      Lr != Ur && "constructor" in g && "constructor" in x && !(typeof Lr == "function" && Lr instanceof Lr && typeof Ur == "function" && Ur instanceof Ur) && (Ge = !1);
    }
    return Z.delete(g), Z.delete(x), Ge;
  }
  function da(g) {
    return Pd(g, Jd, Bd);
  }
  function Nr(g, x) {
    var P = g.__data__;
    return qd(x) ? P[typeof x == "string" ? "string" : "hash"] : P.map;
  }
  function sn(g, x) {
    var P = Ce(g, x);
    return Fd(P) ? P : void 0;
  }
  function jd(g) {
    var x = st.call(g, Mt), P = g[Mt];
    try {
      g[Mt] = void 0;
      var G = !0;
    } catch {
    }
    var ce = ra.call(g);
    return G && (x ? g[Mt] = P : delete g[Mt]), ce;
  }
  var Bd = aa ? function(g) {
    return g == null ? [] : (g = Object(g), T(aa(g), function(x) {
      return sa.call(g, x);
    }));
  } : Kd, bt = Un;
  (oo && bt(new oo(new ArrayBuffer(1))) != Q || Fn && bt(new Fn()) != y || so && bt(so.resolve()) != M || ao && bt(new ao()) != A || lo && bt(new lo()) != E) && (bt = function(g) {
    var x = Un(g), P = x == I ? g.constructor : void 0, G = P ? Ht(P) : "";
    if (G)
      switch (G) {
        case od:
          return Q;
        case sd:
          return y;
        case ad:
          return M;
        case ld:
          return A;
        case cd:
          return E;
      }
    return x;
  });
  function Hd(g, x) {
    return x = x ?? s, !!x && (typeof g == "number" || Y.test(g)) && g > -1 && g % 1 == 0 && g < x;
  }
  function qd(g) {
    var x = typeof g;
    return x == "string" || x == "number" || x == "symbol" || x == "boolean" ? g !== "__proto__" : g === null;
  }
  function Gd(g) {
    return !!na && na in g;
  }
  function zd(g) {
    var x = g && g.constructor, P = typeof x == "function" && x.prototype || _t;
    return g === P;
  }
  function Wd(g) {
    return ra.call(g);
  }
  function Ht(g) {
    if (g != null) {
      try {
        return ta.call(g);
      } catch {
      }
      try {
        return g + "";
      } catch {
      }
    }
    return "";
  }
  function ha(g, x) {
    return g === x || g !== g && x !== x;
  }
  var Vd = ca(/* @__PURE__ */ function() {
    return arguments;
  }()) ? ca : function(g) {
    return kn(g) && st.call(g, "callee") && !sa.call(g, "callee");
  }, Fr = Array.isArray;
  function Yd(g) {
    return g != null && ma(g.length) && !pa(g);
  }
  var uo = rd || Qd;
  function Xd(g, x) {
    return ua(g, x);
  }
  function pa(g) {
    if (!ga(g))
      return !1;
    var x = Un(g);
    return x == m || x == w || x == p || x == k;
  }
  function ma(g) {
    return typeof g == "number" && g > -1 && g % 1 == 0 && g <= s;
  }
  function ga(g) {
    var x = typeof g;
    return g != null && (x == "object" || x == "function");
  }
  function kn(g) {
    return g != null && typeof g == "object";
  }
  var ya = f ? ge(f) : Ld;
  function Jd(g) {
    return Yd(g) ? Rd(g) : Ud(g);
  }
  function Kd() {
    return [];
  }
  function Qd() {
    return !1;
  }
  e.exports = Xd;
})(wi, wi.exports);
var Lv = wi.exports;
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.DownloadedUpdateHelper = void 0;
_r.createTempUpdateFile = Bv;
const Uv = hr, kv = tt, Pl = Lv, zt = Ut, er = ue;
class Mv {
  constructor(t) {
    this.cacheDir = t, this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, this._downloadedFileInfo = null;
  }
  get downloadedFileInfo() {
    return this._downloadedFileInfo;
  }
  get file() {
    return this._file;
  }
  get packageFile() {
    return this._packageFile;
  }
  get cacheDirForPendingUpdate() {
    return er.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, n, r, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return Pl(this.versionInfo, n) && Pl(this.fileInfo.info, r.info) && await (0, zt.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(r, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, n, r, i, o, s) {
    this._file = t, this._packageFile = n, this.versionInfo = r, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, s && await (0, zt.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, zt.emptyDir)(this.cacheDirForPendingUpdate);
    } catch {
    }
  }
  /**
   * Returns "update-info.json" which is created in the update cache directory's "pending" subfolder after the first update is downloaded.  If the update file does not exist then the cache is cleared and recreated.  If the update file exists then its properties are validated.
   * @param fileInfo
   * @param logger
   */
  async getValidCachedUpdateFile(t, n) {
    const r = this.getUpdateInfoFile();
    if (!await (0, zt.pathExists)(r))
      return null;
    let o;
    try {
      o = await (0, zt.readJson)(r);
    } catch (p) {
      let c = "No cached update info available";
      return p.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), c += ` (error on read: ${p.message})`), n.info(c), null;
    }
    if (!((o == null ? void 0 : o.fileName) !== null))
      return n.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return n.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const a = er.join(this.cacheDirForPendingUpdate, o.fileName);
    if (!await (0, zt.pathExists)(a))
      return n.info("Cached update file doesn't exist"), null;
    const l = await jv(a);
    return t.info.sha512 !== l ? (n.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${l}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, a);
  }
  getUpdateInfoFile() {
    return er.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
_r.DownloadedUpdateHelper = Mv;
function jv(e, t = "sha512", n = "base64", r) {
  return new Promise((i, o) => {
    const s = (0, Uv.createHash)(t);
    s.on("error", o).setEncoding(n), (0, kv.createReadStream)(e, {
      ...r,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      s.end(), i(s.read());
    }).pipe(s, { end: !1 });
  });
}
async function Bv(e, t, n) {
  let r = 0, i = er.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, zt.unlink)(i), i;
    } catch (s) {
      if (s.code === "ENOENT")
        return i;
      n.warn(`Error on remove temp update file: ${s}`), i = er.join(t, `${r++}-${e}`);
    }
  return i;
}
var Mi = {}, qs = {};
Object.defineProperty(qs, "__esModule", { value: !0 });
qs.getAppCacheDir = qv;
const Ro = ue, Hv = xi;
function qv() {
  const e = (0, Hv.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || Ro.join(e, "AppData", "Local") : process.platform === "darwin" ? t = Ro.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || Ro.join(e, ".cache"), t;
}
Object.defineProperty(Mi, "__esModule", { value: !0 });
Mi.ElectronAppAdapter = void 0;
const Nl = ue, Gv = qs;
class zv {
  constructor(t = Kt.app) {
    this.app = t;
  }
  whenReady() {
    return this.app.whenReady();
  }
  get version() {
    return this.app.getVersion();
  }
  get name() {
    return this.app.getName();
  }
  get isPackaged() {
    return this.app.isPackaged === !0;
  }
  get appUpdateConfigPath() {
    return this.isPackaged ? Nl.join(process.resourcesPath, "app-update.yml") : Nl.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, Gv.getAppCacheDir)();
  }
  quit() {
    this.app.quit();
  }
  relaunch() {
    this.app.relaunch();
  }
  onQuit(t) {
    this.app.once("quit", (n, r) => t(r));
  }
}
Mi.ElectronAppAdapter = zv;
var bf = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = n;
  const t = _e;
  e.NET_SESSION_NAME = "electron-updater";
  function n() {
    return Kt.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class r extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, s, a) {
      return await a.cancellationToken.createPromise((l, p, c) => {
        const u = {
          headers: a.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, u), (0, t.configureRequestOptions)(u), this.doDownload(u, {
          destination: s,
          options: a,
          onCancel: c,
          callback: (d) => {
            d == null ? l(s) : p(d);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(o, s) {
      o.headers && o.headers.Host && (o.host = o.headers.Host, delete o.headers.Host), this.cachedSession == null && (this.cachedSession = n());
      const a = Kt.net.request({
        ...o,
        session: this.cachedSession
      });
      return a.on("response", s), this.proxyLoginCallback != null && a.on("login", this.proxyLoginCallback), a;
    }
    addRedirectHandlers(o, s, a, l, p) {
      o.on("redirect", (c, u, d) => {
        o.abort(), l > this.maxRedirects ? a(this.createMaxRedirectError()) : p(t.HttpExecutor.prepareRedirectUrlOptions(d, s));
      });
    }
  }
  e.ElectronHttpExecutor = r;
})(bf);
var xr = {}, We = {}, Wv = "[object Symbol]", Sf = /[\\^$.*+?()[\]{}|]/g, Vv = RegExp(Sf.source), Yv = typeof ze == "object" && ze && ze.Object === Object && ze, Xv = typeof self == "object" && self && self.Object === Object && self, Jv = Yv || Xv || Function("return this")(), Kv = Object.prototype, Qv = Kv.toString, Fl = Jv.Symbol, Ll = Fl ? Fl.prototype : void 0, Ul = Ll ? Ll.toString : void 0;
function Zv(e) {
  if (typeof e == "string")
    return e;
  if (t1(e))
    return Ul ? Ul.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function e1(e) {
  return !!e && typeof e == "object";
}
function t1(e) {
  return typeof e == "symbol" || e1(e) && Qv.call(e) == Wv;
}
function n1(e) {
  return e == null ? "" : Zv(e);
}
function r1(e) {
  return e = n1(e), e && Vv.test(e) ? e.replace(Sf, "\\$&") : e;
}
var i1 = r1;
Object.defineProperty(We, "__esModule", { value: !0 });
We.newBaseUrl = s1;
We.newUrlFromBase = rs;
We.getChannelFilename = a1;
We.blockmapFiles = l1;
const Af = $n, o1 = i1;
function s1(e) {
  const t = new Af.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function rs(e, t, n = !1) {
  const r = new Af.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? r.search = i : n && (r.search = `noCache=${Date.now().toString(32)}`), r;
}
function a1(e) {
  return `${e}.yml`;
}
function l1(e, t, n) {
  const r = rs(`${e.pathname}.blockmap`, e);
  return [rs(`${e.pathname.replace(new RegExp(o1(n), "g"), t)}.blockmap`, e), r];
}
var xe = {};
Object.defineProperty(xe, "__esModule", { value: !0 });
xe.Provider = void 0;
xe.findFile = f1;
xe.parseUpdateInfo = d1;
xe.getFileList = Tf;
xe.resolveFiles = h1;
const Nt = _e, c1 = Ae, kl = We;
class u1 {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  get isUseMultipleRangeRequest() {
    return this.runtimeOptions.isUseMultipleRangeRequest !== !1;
  }
  getChannelFilePrefix() {
    if (this.runtimeOptions.platform === "linux") {
      const t = process.env.TEST_UPDATER_ARCH || process.arch;
      return "-linux" + (t === "x64" ? "" : `-${t}`);
    } else
      return this.runtimeOptions.platform === "darwin" ? "-mac" : "";
  }
  // due to historical reasons for windows we use channel name without platform specifier
  getDefaultChannelName() {
    return this.getCustomChannelName("latest");
  }
  getCustomChannelName(t) {
    return `${t}${this.getChannelFilePrefix()}`;
  }
  get fileExtraDownloadHeaders() {
    return null;
  }
  setRequestHeaders(t) {
    this.requestHeaders = t;
  }
  /**
   * Method to perform API request only to resolve update info, but not to download update.
   */
  httpRequest(t, n, r) {
    return this.executor.request(this.createRequestOptions(t, n), r);
  }
  createRequestOptions(t, n) {
    const r = {};
    return this.requestHeaders == null ? n != null && (r.headers = n) : r.headers = n == null ? this.requestHeaders : { ...this.requestHeaders, ...n }, (0, Nt.configureRequestUrl)(t, r), r;
  }
}
xe.Provider = u1;
function f1(e, t, n) {
  if (e.length === 0)
    throw (0, Nt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const r = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return r ?? (n == null ? e[0] : e.find((i) => !n.some((o) => i.url.pathname.toLowerCase().endsWith(`.${o}`))));
}
function d1(e, t, n) {
  if (e == null)
    throw (0, Nt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let r;
  try {
    r = (0, c1.load)(e);
  } catch (i) {
    throw (0, Nt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return r;
}
function Tf(e) {
  const t = e.files;
  if (t != null && t.length > 0)
    return t;
  if (e.path != null)
    return [
      {
        url: e.path,
        sha2: e.sha2,
        sha512: e.sha512
      }
    ];
  throw (0, Nt.newError)(`No files provided: ${(0, Nt.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function h1(e, t, n = (r) => r) {
  const i = Tf(e).map((a) => {
    if (a.sha2 == null && a.sha512 == null)
      throw (0, Nt.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, Nt.safeStringifyJson)(a)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, kl.newUrlFromBase)(n(a.url), t),
      info: a
    };
  }), o = e.packages, s = o == null ? null : o[process.arch] || o.ia32;
  return s != null && (i[0].packageInfo = {
    ...s,
    path: (0, kl.newUrlFromBase)(n(s.path), t).href
  }), i;
}
Object.defineProperty(xr, "__esModule", { value: !0 });
xr.GenericProvider = void 0;
const Ml = _e, Po = We, No = xe;
class p1 extends No.Provider {
  constructor(t, n, r) {
    super(r), this.configuration = t, this.updater = n, this.baseUrl = (0, Po.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, Po.getChannelFilename)(this.channel), n = (0, Po.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let r = 0; ; r++)
      try {
        return (0, No.parseUpdateInfo)(await this.httpRequest(n), t, n);
      } catch (i) {
        if (i instanceof Ml.HttpError && i.statusCode === 404)
          throw (0, Ml.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        if (i.code === "ECONNREFUSED" && r < 3) {
          await new Promise((o, s) => {
            try {
              setTimeout(o, 1e3 * r);
            } catch (a) {
              s(a);
            }
          });
          continue;
        }
        throw i;
      }
  }
  resolveFiles(t) {
    return (0, No.resolveFiles)(t, this.baseUrl);
  }
}
xr.GenericProvider = p1;
var ji = {}, Bi = {};
Object.defineProperty(Bi, "__esModule", { value: !0 });
Bi.BitbucketProvider = void 0;
const jl = _e, Fo = We, Lo = xe;
class m1 extends Lo.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, Fo.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new jl.CancellationToken(), n = (0, Fo.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, Fo.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, void 0, t);
      return (0, Lo.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, jl.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Lo.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: n } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${n}, channel: ${this.channel})`;
  }
}
Bi.BitbucketProvider = m1;
var Ft = {};
Object.defineProperty(Ft, "__esModule", { value: !0 });
Ft.GitHubProvider = Ft.BaseGitHubProvider = void 0;
Ft.computeReleaseNotes = $f;
const pt = _e, hn = xf, g1 = $n, pn = We, is = xe, Uo = /\/tag\/([^/]+)$/;
class Cf extends is.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, pn.newBaseUrl)((0, pt.githubUrl)(t, n));
    const i = n === "github.com" ? "api.github.com" : n;
    this.baseApiUrl = (0, pn.newBaseUrl)((0, pt.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const n = this.options.host;
    return n && !["github.com", "api.github.com"].includes(n) ? `/api/v3${t}` : t;
  }
}
Ft.BaseGitHubProvider = Cf;
class y1 extends Cf {
  constructor(t, n, r) {
    super(t, "github.com", r), this.options = t, this.updater = n;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, n, r, i, o;
    const s = new pt.CancellationToken(), a = await this.httpRequest((0, pn.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, s), l = (0, pt.parseXml)(a);
    let p = l.element("entry", !1, "No published versions on GitHub"), c = null;
    try {
      if (this.updater.allowPrerelease) {
        const v = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((n = hn.prerelease(this.updater.currentVersion)) === null || n === void 0 ? void 0 : n[0]) || null;
        if (v === null)
          c = Uo.exec(p.element("link").attribute("href"))[1];
        else
          for (const b of l.getElements("entry")) {
            const I = Uo.exec(b.element("link").attribute("href"));
            if (I === null)
              continue;
            const M = I[1], k = ((r = hn.prerelease(M)) === null || r === void 0 ? void 0 : r[0]) || null, U = !v || ["alpha", "beta"].includes(v), A = k !== null && !["alpha", "beta"].includes(String(k));
            if (U && !A && !(v === "beta" && k === "alpha")) {
              c = M;
              break;
            }
            if (k && k === v) {
              c = M;
              break;
            }
          }
      } else {
        c = await this.getLatestTagName(s);
        for (const v of l.getElements("entry"))
          if (Uo.exec(v.element("link").attribute("href"))[1] === c) {
            p = v;
            break;
          }
      }
    } catch (v) {
      throw (0, pt.newError)(`Cannot parse releases feed: ${v.stack || v.message},
XML:
${a}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (c == null)
      throw (0, pt.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let u, d = "", m = "";
    const w = async (v) => {
      d = (0, pn.getChannelFilename)(v), m = (0, pn.newUrlFromBase)(this.getBaseDownloadPath(String(c), d), this.baseUrl);
      const b = this.createRequestOptions(m);
      try {
        return await this.executor.request(b, s);
      } catch (I) {
        throw I instanceof pt.HttpError && I.statusCode === 404 ? (0, pt.newError)(`Cannot find ${d} in the latest release artifacts (${m}): ${I.stack || I.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : I;
      }
    };
    try {
      let v = this.channel;
      this.updater.allowPrerelease && (!((i = hn.prerelease(c)) === null || i === void 0) && i[0]) && (v = this.getCustomChannelName(String((o = hn.prerelease(c)) === null || o === void 0 ? void 0 : o[0]))), u = await w(v);
    } catch (v) {
      if (this.updater.allowPrerelease)
        u = await w(this.getDefaultChannelName());
      else
        throw v;
    }
    const y = (0, is.parseUpdateInfo)(u, d, m);
    return y.releaseName == null && (y.releaseName = p.elementValueOrEmpty("title")), y.releaseNotes == null && (y.releaseNotes = $f(this.updater.currentVersion, this.updater.fullChangelog, l, p)), {
      tag: c,
      ...y
    };
  }
  async getLatestTagName(t) {
    const n = this.options, r = n.host == null || n.host === "github.com" ? (0, pn.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new g1.URL(`${this.computeGithubBasePath(`/repos/${n.owner}/${n.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(r, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, pt.newError)(`Unable to find latest version on GitHub (${r}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, is.resolveFiles)(t, this.baseUrl, (n) => this.getBaseDownloadPath(t.tag, n.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, n) {
    return `${this.basePath}/download/${t}/${n}`;
  }
}
Ft.GitHubProvider = y1;
function Bl(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function $f(e, t, n, r) {
  if (!t)
    return Bl(r);
  const i = [];
  for (const o of n.getElements("entry")) {
    const s = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
    hn.lt(e, s) && i.push({
      version: s,
      note: Bl(o)
    });
  }
  return i.sort((o, s) => hn.rcompare(o.version, s.version));
}
var Hi = {};
Object.defineProperty(Hi, "__esModule", { value: !0 });
Hi.KeygenProvider = void 0;
const Hl = _e, ko = We, Mo = xe;
class E1 extends Mo.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n, this.baseUrl = (0, ko.newBaseUrl)(`https://api.keygen.sh/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Hl.CancellationToken(), n = (0, ko.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, ko.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, Mo.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, Hl.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Mo.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: n, platform: r } = this.configuration;
    return `Keygen (account: ${t}, product: ${n}, platform: ${r}, channel: ${this.channel})`;
  }
}
Hi.KeygenProvider = E1;
var qi = {};
Object.defineProperty(qi, "__esModule", { value: !0 });
qi.PrivateGitHubProvider = void 0;
const ln = _e, w1 = Ae, v1 = ue, ql = $n, Gl = We, _1 = Ft, x1 = xe;
class b1 extends _1.BaseGitHubProvider {
  constructor(t, n, r, i) {
    super(t, "api.github.com", i), this.updater = n, this.token = r;
  }
  createRequestOptions(t, n) {
    const r = super.createRequestOptions(t, n);
    return r.redirect = "manual", r;
  }
  async getLatestVersion() {
    const t = new ln.CancellationToken(), n = (0, Gl.getChannelFilename)(this.getDefaultChannelName()), r = await this.getLatestVersionInfo(t), i = r.assets.find((a) => a.name === n);
    if (i == null)
      throw (0, ln.newError)(`Cannot find ${n} in the release ${r.html_url || r.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new ql.URL(i.url);
    let s;
    try {
      s = (0, w1.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (a) {
      throw a instanceof ln.HttpError && a.statusCode === 404 ? (0, ln.newError)(`Cannot find ${n} in the latest release artifacts (${o}): ${a.stack || a.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : a;
    }
    return s.assets = r.assets, s;
  }
  get fileExtraDownloadHeaders() {
    return this.configureHeaders("application/octet-stream");
  }
  configureHeaders(t) {
    return {
      accept: t,
      authorization: `token ${this.token}`
    };
  }
  async getLatestVersionInfo(t) {
    const n = this.updater.allowPrerelease;
    let r = this.basePath;
    n || (r = `${r}/latest`);
    const i = (0, Gl.newUrlFromBase)(r, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return n ? o.find((s) => s.prerelease) || o[0] : o;
    } catch (o) {
      throw (0, ln.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, x1.getFileList)(t).map((n) => {
      const r = v1.posix.basename(n.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === r);
      if (i == null)
        throw (0, ln.newError)(`Cannot find asset "${r}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new ql.URL(i.url),
        info: n
      };
    });
  }
}
qi.PrivateGitHubProvider = b1;
Object.defineProperty(ji, "__esModule", { value: !0 });
ji.isUrlProbablySupportMultiRangeRequests = If;
ji.createClient = $1;
const Jr = _e, S1 = Bi, zl = xr, A1 = Ft, T1 = Hi, C1 = qi;
function If(e) {
  return !e.includes("s3.amazonaws.com");
}
function $1(e, t, n) {
  if (typeof e == "string")
    throw (0, Jr.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const r = e.provider;
  switch (r) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new A1.GitHubProvider(i, t, n) : new C1.PrivateGitHubProvider(i, t, o, n);
    }
    case "bitbucket":
      return new S1.BitbucketProvider(e, t, n);
    case "keygen":
      return new T1.KeygenProvider(e, t, n);
    case "s3":
    case "spaces":
      return new zl.GenericProvider({
        provider: "generic",
        url: (0, Jr.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...n,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new zl.GenericProvider(i, t, {
        ...n,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && If(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, Jr.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, n);
    }
    default:
      throw (0, Jr.newError)(`Unsupported provider: ${r}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var Gi = {}, br = {}, On = {}, nn = {};
Object.defineProperty(nn, "__esModule", { value: !0 });
nn.OperationKind = void 0;
nn.computeOperations = I1;
var Xt;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Xt || (nn.OperationKind = Xt = {}));
function I1(e, t, n) {
  const r = Vl(e.files), i = Vl(t.files);
  let o = null;
  const s = t.files[0], a = [], l = s.name, p = r.get(l);
  if (p == null)
    throw new Error(`no file ${l} in old blockmap`);
  const c = i.get(l);
  let u = 0;
  const { checksumToOffset: d, checksumToOldSize: m } = O1(r.get(l), p.offset, n);
  let w = s.offset;
  for (let y = 0; y < c.checksums.length; w += c.sizes[y], y++) {
    const v = c.sizes[y], b = c.checksums[y];
    let I = d.get(b);
    I != null && m.get(b) !== v && (n.warn(`Checksum ("${b}") matches, but size differs (old: ${m.get(b)}, new: ${v})`), I = void 0), I === void 0 ? (u++, o != null && o.kind === Xt.DOWNLOAD && o.end === w ? o.end += v : (o = {
      kind: Xt.DOWNLOAD,
      start: w,
      end: w + v
      // oldBlocks: null,
    }, Wl(o, a, b, y))) : o != null && o.kind === Xt.COPY && o.end === I ? o.end += v : (o = {
      kind: Xt.COPY,
      start: I,
      end: I + v
      // oldBlocks: [checksum]
    }, Wl(o, a, b, y));
  }
  return u > 0 && n.info(`File${s.name === "file" ? "" : " " + s.name} has ${u} changed blocks`), a;
}
const D1 = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Wl(e, t, n, r) {
  if (D1 && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((s, a) => s < a ? s : a);
      throw new Error(`operation (block index: ${r}, checksum: ${n}, kind: ${Xt[e.kind]}) overlaps previous operation (checksum: ${n}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function O1(e, t, n) {
  const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let s = 0; s < e.checksums.length; s++) {
    const a = e.checksums[s], l = e.sizes[s], p = i.get(a);
    if (p === void 0)
      r.set(a, o), i.set(a, l);
    else if (n.debug != null) {
      const c = p === l ? "(same size)" : `(size: ${p}, this size: ${l})`;
      n.debug(`${a} duplicated in blockmap ${c}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += l;
  }
  return { checksumToOffset: r, checksumToOldSize: i };
}
function Vl(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.set(n.name, n);
  return t;
}
Object.defineProperty(On, "__esModule", { value: !0 });
On.DataSplitter = void 0;
On.copyData = Df;
const Kr = _e, R1 = tt, P1 = nt, N1 = nn, Yl = Buffer.from(`\r
\r
`);
var $t;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})($t || ($t = {}));
function Df(e, t, n, r, i) {
  const o = (0, R1.createReadStream)("", {
    fd: n,
    autoClose: !1,
    start: e.start,
    // end is inclusive
    end: e.end - 1
  });
  o.on("error", r), o.once("end", i), o.pipe(t, {
    end: !1
  });
}
class F1 extends P1.Writable {
  constructor(t, n, r, i, o, s) {
    super(), this.out = t, this.options = n, this.partIndexToTaskIndex = r, this.partIndexToLength = o, this.finishHandler = s, this.partIndex = -1, this.headerListBuffer = null, this.readState = $t.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
  }
  get isFinished() {
    return this.partIndex === this.partIndexToLength.length;
  }
  // noinspection JSUnusedGlobalSymbols
  _write(t, n, r) {
    if (this.isFinished) {
      console.error(`Trailing ignored data: ${t.length} bytes`);
      return;
    }
    this.handleData(t).then(r).catch(r);
  }
  async handleData(t) {
    let n = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, Kr.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const r = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= r, n = r;
    } else if (this.remainingPartDataCount > 0) {
      const r = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= r, await this.processPartData(t, 0, r), n = r;
    }
    if (n !== t.length) {
      if (this.readState === $t.HEADER) {
        const r = this.searchHeaderListEnd(t, n);
        if (r === -1)
          return;
        n = r, this.readState = $t.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === $t.BODY)
          this.readState = $t.INIT;
        else {
          this.partIndex++;
          let s = this.partIndexToTaskIndex.get(this.partIndex);
          if (s == null)
            if (this.isFinished)
              s = this.options.end;
            else
              throw (0, Kr.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (a < s)
            await this.copyExistingData(a, s);
          else if (a > s)
            throw (0, Kr.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (n = this.searchHeaderListEnd(t, n), n === -1) {
            this.readState = $t.HEADER;
            return;
          }
        }
        const r = this.partIndexToLength[this.partIndex], i = n + r, o = Math.min(i, t.length);
        if (await this.processPartStarted(t, n, o), this.remainingPartDataCount = r - (o - n), this.remainingPartDataCount > 0)
          return;
        if (n = i + this.boundaryLength, n >= t.length) {
          this.ignoreByteCount = this.boundaryLength - (t.length - i);
          return;
        }
      }
    }
  }
  copyExistingData(t, n) {
    return new Promise((r, i) => {
      const o = () => {
        if (t === n) {
          r();
          return;
        }
        const s = this.options.tasks[t];
        if (s.kind !== N1.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        Df(s, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, n) {
    const r = t.indexOf(Yl, n);
    if (r !== -1)
      return r + Yl.length;
    const i = n === 0 ? t : t.slice(n);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Kr.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, n, r) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, n, r);
  }
  processPartData(t, n, r) {
    this.actualPartLength += r - n;
    const i = this.out;
    return i.write(n === 0 && t.length === r ? t : t.slice(n, r)) ? Promise.resolve() : new Promise((o, s) => {
      i.on("error", s), i.once("drain", () => {
        i.removeListener("error", s), o();
      });
    });
  }
}
On.DataSplitter = F1;
var zi = {};
Object.defineProperty(zi, "__esModule", { value: !0 });
zi.executeTasksUsingMultipleRangeRequests = L1;
zi.checkIsRangesSupported = ss;
const os = _e, Xl = On, Jl = nn;
function L1(e, t, n, r, i) {
  const o = (s) => {
    if (s >= t.length) {
      e.fileMetadataBuffer != null && n.write(e.fileMetadataBuffer), n.end();
      return;
    }
    const a = s + 1e3;
    U1(e, {
      tasks: t,
      start: s,
      end: Math.min(t.length, a),
      oldFileFd: r
    }, n, () => o(a), i);
  };
  return o;
}
function U1(e, t, n, r, i) {
  let o = "bytes=", s = 0;
  const a = /* @__PURE__ */ new Map(), l = [];
  for (let u = t.start; u < t.end; u++) {
    const d = t.tasks[u];
    d.kind === Jl.OperationKind.DOWNLOAD && (o += `${d.start}-${d.end - 1}, `, a.set(s, u), s++, l.push(d.end - d.start));
  }
  if (s <= 1) {
    const u = (d) => {
      if (d >= t.end) {
        r();
        return;
      }
      const m = t.tasks[d++];
      if (m.kind === Jl.OperationKind.COPY)
        (0, Xl.copyData)(m, n, t.oldFileFd, i, () => u(d));
      else {
        const w = e.createRequestOptions();
        w.headers.Range = `bytes=${m.start}-${m.end - 1}`;
        const y = e.httpExecutor.createRequest(w, (v) => {
          ss(v, i) && (v.pipe(n, {
            end: !1
          }), v.once("end", () => u(d)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(y, i), y.end();
      }
    };
    u(t.start);
    return;
  }
  const p = e.createRequestOptions();
  p.headers.Range = o.substring(0, o.length - 2);
  const c = e.httpExecutor.createRequest(p, (u) => {
    if (!ss(u, i))
      return;
    const d = (0, os.safeGetHeader)(u, "content-type"), m = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(d);
    if (m == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${d}"`));
      return;
    }
    const w = new Xl.DataSplitter(n, t, a, m[1] || m[2], l, r);
    w.on("error", i), u.pipe(w), u.on("end", () => {
      setTimeout(() => {
        c.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(c, i), c.end();
}
function ss(e, t) {
  if (e.statusCode >= 400)
    return t((0, os.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const n = (0, os.safeGetHeader)(e, "accept-ranges");
    if (n == null || n === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var Wi = {};
Object.defineProperty(Wi, "__esModule", { value: !0 });
Wi.ProgressDifferentialDownloadCallbackTransform = void 0;
const k1 = nt;
var mn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(mn || (mn = {}));
class M1 extends k1.Transform {
  constructor(t, n, r) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = mn.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == mn.COPY) {
      r(null, t);
      return;
    }
    this.transferred += t.length, this.delta += t.length;
    const i = Date.now();
    i >= this.nextUpdate && this.transferred !== this.expectedBytes && this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && (this.nextUpdate = i + 1e3, this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
    }), this.delta = 0), r(null, t);
  }
  beginFileCopy() {
    this.operationType = mn.COPY;
  }
  beginRangeDownload() {
    this.operationType = mn.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
  }
  endRangeDownload() {
    this.transferred !== this.progressDifferentialDownloadInfo.grandTotal && this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: this.transferred / this.progressDifferentialDownloadInfo.grandTotal * 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    });
  }
  // Called when we are 100% done with the connection/download
  _flush(t) {
    if (this.cancellationToken.cancelled) {
      t(new Error("cancelled"));
      return;
    }
    this.onProgress({
      total: this.progressDifferentialDownloadInfo.grandTotal,
      delta: this.delta,
      transferred: this.transferred,
      percent: 100,
      bytesPerSecond: Math.round(this.transferred / ((Date.now() - this.start) / 1e3))
    }), this.delta = 0, this.transferred = 0, t(null);
  }
}
Wi.ProgressDifferentialDownloadCallbackTransform = M1;
Object.defineProperty(br, "__esModule", { value: !0 });
br.DifferentialDownloader = void 0;
const Hn = _e, jo = Ut, j1 = tt, B1 = On, H1 = $n, Qr = nn, Kl = zi, q1 = Wi;
class G1 {
  // noinspection TypeScriptAbstractClassConstructorCanBeMadeProtected
  constructor(t, n, r) {
    this.blockAwareFileInfo = t, this.httpExecutor = n, this.options = r, this.fileMetadataBuffer = null, this.logger = r.logger;
  }
  createRequestOptions() {
    const t = {
      headers: {
        ...this.options.requestHeaders,
        accept: "*/*"
      }
    };
    return (0, Hn.configureRequestUrl)(this.options.newUrl, t), (0, Hn.configureRequestOptions)(t), t;
  }
  doDownload(t, n) {
    if (t.version !== n.version)
      throw new Error(`version is different (${t.version} - ${n.version}), full download is required`);
    const r = this.logger, i = (0, Qr.computeOperations)(t, n, r);
    r.debug != null && r.debug(JSON.stringify(i, null, 2));
    let o = 0, s = 0;
    for (const l of i) {
      const p = l.end - l.start;
      l.kind === Qr.OperationKind.DOWNLOAD ? o += p : s += p;
    }
    const a = this.blockAwareFileInfo.size;
    if (o + s + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== a)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${s}, newSize: ${a}`);
    return r.info(`Full: ${Ql(a)}, To download: ${Ql(o)} (${Math.round(o / (a / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const n = [], r = () => Promise.all(n.map((i) => (0, jo.close)(i.descriptor).catch((o) => {
      this.logger.error(`cannot close file "${i.path}": ${o}`);
    })));
    return this.doDownloadFile(t, n).then(r).catch((i) => r().catch((o) => {
      try {
        this.logger.error(`cannot close files: ${o}`);
      } catch (s) {
        try {
          console.error(s);
        } catch {
        }
      }
      throw i;
    }).then(() => {
      throw i;
    }));
  }
  async doDownloadFile(t, n) {
    const r = await (0, jo.open)(this.options.oldFile, "r");
    n.push({ descriptor: r, path: this.options.oldFile });
    const i = await (0, jo.open)(this.options.newFile, "w");
    n.push({ descriptor: i, path: this.options.newFile });
    const o = (0, j1.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((s, a) => {
      const l = [];
      let p;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const b = [];
        let I = 0;
        for (const k of t)
          k.kind === Qr.OperationKind.DOWNLOAD && (b.push(k.end - k.start), I += k.end - k.start);
        const M = {
          expectedByteCounts: b,
          grandTotal: I
        };
        p = new q1.ProgressDifferentialDownloadCallbackTransform(M, this.options.cancellationToken, this.options.onProgress), l.push(p);
      }
      const c = new Hn.DigestTransform(this.blockAwareFileInfo.sha512);
      c.isValidateOnEnd = !1, l.push(c), o.on("finish", () => {
        o.close(() => {
          n.splice(1, 1);
          try {
            c.validate();
          } catch (b) {
            a(b);
            return;
          }
          s(void 0);
        });
      }), l.push(o);
      let u = null;
      for (const b of l)
        b.on("error", a), u == null ? u = b : u = u.pipe(b);
      const d = l[0];
      let m;
      if (this.options.isUseMultipleRangeRequest) {
        m = (0, Kl.executeTasksUsingMultipleRangeRequests)(this, t, d, r, a), m(0);
        return;
      }
      let w = 0, y = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const v = this.createRequestOptions();
      v.redirect = "manual", m = (b) => {
        var I, M;
        if (b >= t.length) {
          this.fileMetadataBuffer != null && d.write(this.fileMetadataBuffer), d.end();
          return;
        }
        const k = t[b++];
        if (k.kind === Qr.OperationKind.COPY) {
          p && p.beginFileCopy(), (0, B1.copyData)(k, d, r, a, () => m(b));
          return;
        }
        const U = `bytes=${k.start}-${k.end - 1}`;
        v.headers.range = U, (M = (I = this.logger) === null || I === void 0 ? void 0 : I.debug) === null || M === void 0 || M.call(I, `download range: ${U}`), p && p.beginRangeDownload();
        const A = this.httpExecutor.createRequest(v, (D) => {
          D.on("error", a), D.on("aborted", () => {
            a(new Error("response has been aborted by the server"));
          }), D.statusCode >= 400 && a((0, Hn.createHttpError)(D)), D.pipe(d, {
            end: !1
          }), D.once("end", () => {
            p && p.endRangeDownload(), ++w === 100 ? (w = 0, setTimeout(() => m(b), 1e3)) : m(b);
          });
        });
        A.on("redirect", (D, R, $) => {
          this.logger.info(`Redirect to ${z1($)}`), y = $, (0, Hn.configureRequestUrl)(new H1.URL(y), v), A.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(A, a), A.end();
      }, m(0);
    });
  }
  async readRemoteBytes(t, n) {
    const r = Buffer.allocUnsafe(n + 1 - t), i = this.createRequestOptions();
    i.headers.range = `bytes=${t}-${n}`;
    let o = 0;
    if (await this.request(i, (s) => {
      s.copy(r, o), o += s.length;
    }), o !== r.length)
      throw new Error(`Received data length ${o} is not equal to expected ${r.length}`);
    return r;
  }
  request(t, n) {
    return new Promise((r, i) => {
      const o = this.httpExecutor.createRequest(t, (s) => {
        (0, Kl.checkIsRangesSupported)(s, i) && (s.on("error", i), s.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), s.on("data", n), s.on("end", () => r()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
br.DifferentialDownloader = G1;
function Ql(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function z1(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(Gi, "__esModule", { value: !0 });
Gi.GenericDifferentialDownloader = void 0;
const W1 = br;
class V1 extends W1.DifferentialDownloader {
  download(t, n) {
    return this.doDownload(t, n);
  }
}
Gi.GenericDifferentialDownloader = V1;
var Zl;
function Gs() {
  if (Zl) return Gt;
  Zl = 1, Object.defineProperty(Gt, "__esModule", { value: !0 }), Gt.NoOpLogger = Gt.AppUpdater = void 0;
  const e = _e, t = hr, n = xi, r = _i, i = Ut, o = Ae, s = Ni, a = ue, l = xf, p = _r, c = Mi, u = bf, d = xr, m = Rn(), w = ji, y = ps, v = We, b = Gi;
  let I = class Of extends r.EventEmitter {
    /**
     * Get the update channel. Doesn't return `channel` from the update configuration, only if was previously set.
     */
    get channel() {
      return this._channel;
    }
    /**
     * Set the update channel. Overrides `channel` in the update configuration.
     *
     * `allowDowngrade` will be automatically set to `true`. If this behavior is not suitable for you, simple set `allowDowngrade` explicitly after.
     */
    set channel(A) {
      if (this._channel != null) {
        if (typeof A != "string")
          throw (0, e.newError)(`Channel must be a string, but got: ${A}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (A.length === 0)
          throw (0, e.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = A, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(A) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: A
      });
    }
    // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    get netSession() {
      return (0, u.getNetSession)();
    }
    /**
     * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
     * Set it to `null` if you would like to disable a logging feature.
     */
    get logger() {
      return this._logger;
    }
    set logger(A) {
      this._logger = A ?? new k();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(A) {
      this.clientPromise = null, this._appUpdateConfigPath = A, this.configOnDisk = new s.Lazy(() => this.loadUpdateConfig());
    }
    constructor(A, D) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new m.UpdaterSignal(this), this._appUpdateConfigPath = null, this.clientPromise = null, this.stagingUserIdPromise = new s.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new s.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (E) => {
        this._logger.error(`Error: ${E.stack || E.message}`);
      }), D == null ? (this.app = new c.ElectronAppAdapter(), this.httpExecutor = new u.ElectronHttpExecutor((E, z) => this.emit("login", E, z))) : (this.app = D, this.httpExecutor = null);
      const R = this.app.version, $ = (0, l.parse)(R);
      if ($ == null)
        throw (0, e.newError)(`App version is not a valid semver version: "${R}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = $, this.allowPrerelease = M($), A != null && (this.setFeedURL(A), typeof A != "string" && A.requestHeaders && (this.requestHeaders = A.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(A) {
      const D = this.createProviderRuntimeOptions();
      let R;
      typeof A == "string" ? R = new d.GenericProvider({ provider: "generic", url: A }, this, {
        ...D,
        isUseMultipleRangeRequest: (0, w.isUrlProbablySupportMultiRangeRequests)(A)
      }) : R = (0, w.createClient)(A, this, D), this.clientPromise = Promise.resolve(R);
    }
    /**
     * Asks the server whether there is an update.
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let A = this.checkForUpdatesPromise;
      if (A != null)
        return this._logger.info("Checking for update (already in progress)"), A;
      const D = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), A = this.doCheckForUpdates().then((R) => (D(), R)).catch((R) => {
        throw D(), this.emit("error", R, `Cannot check for updates: ${(R.stack || R).toString()}`), R;
      }), this.checkForUpdatesPromise = A, A;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(A) {
      return this.checkForUpdates().then((D) => D != null && D.downloadPromise ? (D.downloadPromise.then(() => {
        const R = Of.formatDownloadNotification(D.updateInfo.version, this.app.name, A);
        new Kt.Notification(R).show();
      }), D) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), D));
    }
    static formatDownloadNotification(A, D, R) {
      return R == null && (R = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), R = {
        title: R.title.replace("{appName}", D).replace("{version}", A),
        body: R.body.replace("{appName}", D).replace("{version}", A)
      }, R;
    }
    async isStagingMatch(A) {
      const D = A.stagingPercentage;
      let R = D;
      if (R == null)
        return !0;
      if (R = parseInt(R, 10), isNaN(R))
        return this._logger.warn(`Staging percentage is NaN: ${D}`), !0;
      R = R / 100;
      const $ = await this.stagingUserIdPromise.value, z = e.UUID.parse($).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${R}, percentage: ${z}, user id: ${$}`), z < R;
    }
    computeFinalHeaders(A) {
      return this.requestHeaders != null && Object.assign(A, this.requestHeaders), A;
    }
    async isUpdateAvailable(A) {
      const D = (0, l.parse)(A.version);
      if (D == null)
        throw (0, e.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${A.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const R = this.currentVersion;
      if ((0, l.eq)(D, R))
        return !1;
      const $ = A == null ? void 0 : A.minimumSystemVersion, E = (0, n.release)();
      if ($)
        try {
          if ((0, l.lt)(E, $))
            return this._logger.info(`Current OS version ${E} is less than the minimum OS version required ${$} for version ${E}`), !1;
        } catch (K) {
          this._logger.warn(`Failed to compare current OS version(${E}) with minimum OS version(${$}): ${(K.message || K).toString()}`);
        }
      if (!await this.isStagingMatch(A))
        return !1;
      const Q = (0, l.gt)(D, R), ee = (0, l.lt)(D, R);
      return Q ? !0 : this.allowDowngrade && ee;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((R) => (0, w.createClient)(R, this, this.createProviderRuntimeOptions())));
      const A = await this.clientPromise, D = await this.stagingUserIdPromise.value;
      return A.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": D })), {
        info: await A.getLatestVersion(),
        provider: A
      };
    }
    createProviderRuntimeOptions() {
      return {
        isUseMultipleRangeRequest: !0,
        platform: this._testOnlyOptions == null ? process.platform : this._testOnlyOptions.platform,
        executor: this.httpExecutor
      };
    }
    async doCheckForUpdates() {
      this.emit("checking-for-update");
      const A = await this.getUpdateInfoAndProvider(), D = A.info;
      if (!await this.isUpdateAvailable(D))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${D.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", D), {
          versionInfo: D,
          updateInfo: D
        };
      this.updateInfoAndProvider = A, this.onUpdateAvailable(D);
      const R = new e.CancellationToken();
      return {
        versionInfo: D,
        updateInfo: D,
        cancellationToken: R,
        downloadPromise: this.autoDownload ? this.downloadUpdate(R) : null
      };
    }
    onUpdateAvailable(A) {
      this._logger.info(`Found version ${A.version} (url: ${(0, e.asArray)(A.files).map((D) => D.url).join(", ")})`), this.emit("update-available", A);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(A = new e.CancellationToken()) {
      const D = this.updateInfoAndProvider;
      if (D == null) {
        const $ = new Error("Please check update first");
        return this.dispatchError($), Promise.reject($);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, e.asArray)(D.info.files).map(($) => $.url).join(", ")}`);
      const R = ($) => {
        if (!($ instanceof e.CancellationError))
          try {
            this.dispatchError($);
          } catch (E) {
            this._logger.warn(`Cannot dispatch error event: ${E.stack || E}`);
          }
        return $;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: D,
        requestHeaders: this.computeRequestHeaders(D.provider),
        cancellationToken: A,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch(($) => {
        throw R($);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(A) {
      this.emit("error", A, (A.stack || A).toString());
    }
    dispatchUpdateDownloaded(A) {
      this.emit(m.UPDATE_DOWNLOADED, A);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, o.load)(await (0, i.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(A) {
      const D = A.fileExtraDownloadHeaders;
      if (D != null) {
        const R = this.requestHeaders;
        return R == null ? D : {
          ...D,
          ...R
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const A = a.join(this.app.userDataPath, ".updaterId");
      try {
        const R = await (0, i.readFile)(A, "utf-8");
        if (e.UUID.check(R))
          return R;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${R}`);
      } catch (R) {
        R.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${R}`);
      }
      const D = e.UUID.v5((0, t.randomBytes)(4096), e.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${D}`);
      try {
        await (0, i.outputFile)(A, D);
      } catch (R) {
        this._logger.warn(`Couldn't write out staging user ID: ${R}`);
      }
      return D;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const A = this.requestHeaders;
      if (A == null)
        return !0;
      for (const D of Object.keys(A)) {
        const R = D.toLowerCase();
        if (R === "authorization" || R === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let A = this.downloadedUpdateHelper;
      if (A == null) {
        const D = (await this.configOnDisk.value).updaterCacheDirName, R = this._logger;
        D == null && R.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const $ = a.join(this.app.baseCachePath, D || this.app.name);
        R.debug != null && R.debug(`updater cache dir: ${$}`), A = new p.DownloadedUpdateHelper($), this.downloadedUpdateHelper = A;
      }
      return A;
    }
    async executeDownload(A) {
      const D = A.fileInfo, R = {
        headers: A.downloadUpdateOptions.requestHeaders,
        cancellationToken: A.downloadUpdateOptions.cancellationToken,
        sha2: D.info.sha2,
        sha512: D.info.sha512
      };
      this.listenerCount(m.DOWNLOAD_PROGRESS) > 0 && (R.onProgress = (q) => this.emit(m.DOWNLOAD_PROGRESS, q));
      const $ = A.downloadUpdateOptions.updateInfoAndProvider.info, E = $.version, z = D.packageInfo;
      function Q() {
        const q = decodeURIComponent(A.fileInfo.url.pathname);
        return q.endsWith(`.${A.fileExtension}`) ? a.basename(q) : A.fileInfo.info.url;
      }
      const ee = await this.getOrCreateDownloadHelper(), K = ee.cacheDirForPendingUpdate;
      await (0, i.mkdir)(K, { recursive: !0 });
      const H = Q();
      let J = a.join(K, H);
      const C = z == null ? null : a.join(K, `package-${E}${a.extname(z.path) || ".7z"}`), S = async (q) => (await ee.setDownloadedFile(J, C, $, D, H, q), await A.done({
        ...$,
        downloadedFile: J
      }), C == null ? [J] : [J, C]), O = this._logger, L = await ee.validateDownloadedPath(J, $, D, O);
      if (L != null)
        return J = L, await S(!1);
      const W = async () => (await ee.clear().catch(() => {
      }), await (0, i.unlink)(J).catch(() => {
      })), N = await (0, p.createTempUpdateFile)(`temp-${H}`, K, O);
      try {
        await A.task(N, R, C, W), await (0, e.retry)(() => (0, i.rename)(N, J), 60, 500, 0, 0, (q) => q instanceof Error && /^EBUSY:/.test(q.message));
      } catch (q) {
        throw await W(), q instanceof e.CancellationError && (O.info("cancelled"), this.emit("update-cancelled", $)), q;
      }
      return O.info(`New version ${E} has been downloaded to ${J}`), await S(!0);
    }
    async differentialDownloadInstaller(A, D, R, $, E) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const z = (0, v.blockmapFiles)(A.url, this.app.version, D.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${z[0]}", new: ${z[1]})`);
        const Q = async (H) => {
          const J = await this.httpExecutor.downloadToBuffer(H, {
            headers: D.requestHeaders,
            cancellationToken: D.cancellationToken
          });
          if (J == null || J.length === 0)
            throw new Error(`Blockmap "${H.href}" is empty`);
          try {
            return JSON.parse((0, y.gunzipSync)(J).toString());
          } catch (C) {
            throw new Error(`Cannot parse blockmap "${H.href}", error: ${C}`);
          }
        }, ee = {
          newUrl: A.url,
          oldFile: a.join(this.downloadedUpdateHelper.cacheDir, E),
          logger: this._logger,
          newFile: R,
          isUseMultipleRangeRequest: $.isUseMultipleRangeRequest,
          requestHeaders: D.requestHeaders,
          cancellationToken: D.cancellationToken
        };
        this.listenerCount(m.DOWNLOAD_PROGRESS) > 0 && (ee.onProgress = (H) => this.emit(m.DOWNLOAD_PROGRESS, H));
        const K = await Promise.all(z.map((H) => Q(H)));
        return await new b.GenericDifferentialDownloader(A.info, this.httpExecutor, ee).download(K[0], K[1]), !1;
      } catch (z) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${z.stack || z}`), this._testOnlyOptions != null)
          throw z;
        return !0;
      }
    }
  };
  Gt.AppUpdater = I;
  function M(U) {
    const A = (0, l.prerelease)(U);
    return A != null && A.length > 0;
  }
  class k {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(A) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(A) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(A) {
    }
  }
  return Gt.NoOpLogger = k, Gt;
}
var ec;
function Sr() {
  if (ec) return jn;
  ec = 1, Object.defineProperty(jn, "__esModule", { value: !0 }), jn.BaseUpdater = void 0;
  const e = bi, t = Gs();
  let n = class extends t.AppUpdater {
    constructor(i, o) {
      super(i, o), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(i = !1, o = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(i, i ? o : this.autoRunAppAfterInstall) ? setImmediate(() => {
        Kt.autoUpdater.emit("before-quit-for-update"), this.app.quit();
      }) : this.quitAndInstallCalled = !1;
    }
    executeDownload(i) {
      return super.executeDownload({
        ...i,
        done: (o) => (this.dispatchUpdateDownloaded(o), this.addQuitHandler(), Promise.resolve())
      });
    }
    // must be sync (because quit even handler is not async)
    install(i = !1, o = !1) {
      if (this.quitAndInstallCalled)
        return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
      const s = this.downloadedUpdateHelper, a = s && s.file ? process.platform === "linux" ? s.file.replace(/ /g, "\\ ") : s.file : null, l = s == null ? null : s.downloadedFileInfo;
      if (a == null || l == null)
        return this.dispatchError(new Error("No valid update available, can't quit and install")), !1;
      this.quitAndInstallCalled = !0;
      try {
        return this._logger.info(`Install: isSilent: ${i}, isForceRunAfter: ${o}`), this.doInstall({
          installerPath: a,
          isSilent: i,
          isForceRunAfter: o,
          isAdminRightsRequired: l.isAdminRightsRequired
        });
      } catch (p) {
        return this.dispatchError(p), !1;
      }
    }
    addQuitHandler() {
      this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((i) => {
        if (this.quitAndInstallCalled) {
          this._logger.info("Update installer has already been triggered. Quitting application.");
          return;
        }
        if (!this.autoInstallOnAppQuit) {
          this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
          return;
        }
        if (i !== 0) {
          this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${i}`);
          return;
        }
        this._logger.info("Auto install update on quit"), this.install(!0, !1);
      }));
    }
    wrapSudo() {
      const { name: i } = this.app, o = `"${i} would like to update"`, s = this.spawnSyncLog("which gksudo || which kdesudo || which pkexec || which beesu"), a = [s];
      return /kdesudo/i.test(s) ? (a.push("--comment", o), a.push("-c")) : /gksudo/i.test(s) ? a.push("--message", o) : /pkexec/i.test(s) && a.push("--disable-internal-agent"), a.join(" ");
    }
    spawnSyncLog(i, o = [], s = {}) {
      return this._logger.info(`Executing: ${i} with args: ${o}`), (0, e.spawnSync)(i, o, {
        env: { ...process.env, ...s },
        encoding: "utf-8",
        shell: !0
      }).stdout.trim();
    }
    /**
     * This handles both node 8 and node 10 way of emitting error when spawning a process
     *   - node 8: Throws the error
     *   - node 10: Emit the error(Need to listen with on)
     */
    // https://github.com/electron-userland/electron-builder/issues/1129
    // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
    async spawnLog(i, o = [], s = void 0, a = "ignore") {
      return this._logger.info(`Executing: ${i} with args: ${o}`), new Promise((l, p) => {
        try {
          const c = { stdio: a, env: s, detached: !0 }, u = (0, e.spawn)(i, o, c);
          u.on("error", (d) => {
            p(d);
          }), u.unref(), u.pid !== void 0 && l(!0);
        } catch (c) {
          p(c);
        }
      });
    }
  };
  return jn.BaseUpdater = n, jn;
}
var qn = {}, Ar = {};
Object.defineProperty(Ar, "__esModule", { value: !0 });
Ar.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const cn = Ut, Y1 = br, X1 = ps;
class J1 extends Y1.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, n = t.size, r = n - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(r, n - 1);
    const i = Rf(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await K1(this.options.oldFile), i);
  }
}
Ar.FileWithEmbeddedBlockMapDifferentialDownloader = J1;
function Rf(e) {
  return JSON.parse((0, X1.inflateRawSync)(e).toString());
}
async function K1(e) {
  const t = await (0, cn.open)(e, "r");
  try {
    const n = (await (0, cn.fstat)(t)).size, r = Buffer.allocUnsafe(4);
    await (0, cn.read)(t, r, 0, r.length, n - r.length);
    const i = Buffer.allocUnsafe(r.readUInt32BE(0));
    return await (0, cn.read)(t, i, 0, i.length, n - r.length - i.length), await (0, cn.close)(t), Rf(i);
  } catch (n) {
    throw await (0, cn.close)(t), n;
  }
}
var tc;
function nc() {
  if (tc) return qn;
  tc = 1, Object.defineProperty(qn, "__esModule", { value: !0 }), qn.AppImageUpdater = void 0;
  const e = _e, t = bi, n = Ut, r = tt, i = ue, o = Sr(), s = Ar, a = Rn(), l = xe;
  let p = class extends o.BaseUpdater {
    constructor(u, d) {
      super(u, d);
    }
    isUpdaterActive() {
      return process.env.APPIMAGE == null ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
    }
    /*** @private */
    doDownloadUpdate(u) {
      const d = u.updateInfoAndProvider.provider, m = (0, l.findFile)(d.resolveFiles(u.updateInfoAndProvider.info), "AppImage", ["rpm", "deb"]);
      return this.executeDownload({
        fileExtension: "AppImage",
        fileInfo: m,
        downloadUpdateOptions: u,
        task: async (w, y) => {
          const v = process.env.APPIMAGE;
          if (v == null)
            throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          let b = !1;
          try {
            const I = {
              newUrl: m.url,
              oldFile: v,
              logger: this._logger,
              newFile: w,
              isUseMultipleRangeRequest: d.isUseMultipleRangeRequest,
              requestHeaders: u.requestHeaders,
              cancellationToken: u.cancellationToken
            };
            this.listenerCount(a.DOWNLOAD_PROGRESS) > 0 && (I.onProgress = (M) => this.emit(a.DOWNLOAD_PROGRESS, M)), await new s.FileWithEmbeddedBlockMapDifferentialDownloader(m.info, this.httpExecutor, I).download();
          } catch (I) {
            this._logger.error(`Cannot download differentially, fallback to full download: ${I.stack || I}`), b = process.platform === "linux";
          }
          b && await this.httpExecutor.download(m.url, w, y), await (0, n.chmod)(w, 493);
        }
      });
    }
    doInstall(u) {
      const d = process.env.APPIMAGE;
      if (d == null)
        throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, r.unlinkSync)(d);
      let m;
      const w = i.basename(d);
      i.basename(u.installerPath) === w || !/\d+\.\d+\.\d+/.test(w) ? m = d : m = i.join(i.dirname(d), i.basename(u.installerPath)), (0, t.execFileSync)("mv", ["-f", u.installerPath, m]), m !== d && this.emit("appimage-filename-updated", m);
      const y = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return u.isForceRunAfter ? this.spawnLog(m, [], y) : (y.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, t.execFileSync)(m, [], { env: y })), !0;
    }
  };
  return qn.AppImageUpdater = p, qn;
}
var Gn = {}, rc;
function ic() {
  if (rc) return Gn;
  rc = 1, Object.defineProperty(Gn, "__esModule", { value: !0 }), Gn.DebUpdater = void 0;
  const e = Sr(), t = Rn(), n = xe;
  let r = class extends e.BaseUpdater {
    constructor(o, s) {
      super(o, s);
    }
    /*** @private */
    doDownloadUpdate(o) {
      const s = o.updateInfoAndProvider.provider, a = (0, n.findFile)(s.resolveFiles(o.updateInfoAndProvider.info), "deb", ["AppImage", "rpm"]);
      return this.executeDownload({
        fileExtension: "deb",
        fileInfo: a,
        downloadUpdateOptions: o,
        task: async (l, p) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (p.onProgress = (c) => this.emit(t.DOWNLOAD_PROGRESS, c)), await this.httpExecutor.download(a.url, l, p);
        }
      });
    }
    doInstall(o) {
      const s = this.wrapSudo(), a = /pkexec/i.test(s) ? "" : '"', l = ["dpkg", "-i", o.installerPath, "||", "apt-get", "install", "-f", "-y"];
      return this.spawnSyncLog(s, [`${a}/bin/bash`, "-c", `'${l.join(" ")}'${a}`]), o.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return Gn.DebUpdater = r, Gn;
}
var zn = {}, oc;
function sc() {
  if (oc) return zn;
  oc = 1, Object.defineProperty(zn, "__esModule", { value: !0 }), zn.RpmUpdater = void 0;
  const e = Sr(), t = Rn(), n = xe;
  let r = class extends e.BaseUpdater {
    constructor(o, s) {
      super(o, s);
    }
    /*** @private */
    doDownloadUpdate(o) {
      const s = o.updateInfoAndProvider.provider, a = (0, n.findFile)(s.resolveFiles(o.updateInfoAndProvider.info), "rpm", ["AppImage", "deb"]);
      return this.executeDownload({
        fileExtension: "rpm",
        fileInfo: a,
        downloadUpdateOptions: o,
        task: async (l, p) => {
          this.listenerCount(t.DOWNLOAD_PROGRESS) > 0 && (p.onProgress = (c) => this.emit(t.DOWNLOAD_PROGRESS, c)), await this.httpExecutor.download(a.url, l, p);
        }
      });
    }
    doInstall(o) {
      const s = o.installerPath, a = this.wrapSudo(), l = /pkexec/i.test(a) ? "" : '"', p = this.spawnSyncLog("which zypper");
      let c;
      return p ? c = [p, "--no-refresh", "install", "--allow-unsigned-rpm", "-y", "-f", s] : c = [this.spawnSyncLog("which dnf || which yum"), "-y", "install", s], this.spawnSyncLog(a, [`${l}/bin/bash`, "-c", `'${c.join(" ")}'${l}`]), o.isForceRunAfter && this.app.relaunch(), !0;
    }
  };
  return zn.RpmUpdater = r, zn;
}
var Wn = {}, ac;
function lc() {
  if (ac) return Wn;
  ac = 1, Object.defineProperty(Wn, "__esModule", { value: !0 }), Wn.MacUpdater = void 0;
  const e = _e, t = Ut, n = tt, r = ue, i = nh, o = Gs(), s = xe, a = bi, l = hr;
  let p = class extends o.AppUpdater {
    constructor(u, d) {
      super(u, d), this.nativeUpdater = Kt.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (m) => {
        this._logger.warn(m), this.emit("error", m);
      }), this.nativeUpdater.on("update-downloaded", () => {
        this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
      });
    }
    debug(u) {
      this._logger.debug != null && this._logger.debug(u);
    }
    closeServerIfExists() {
      this.server && (this.debug("Closing proxy server"), this.server.close((u) => {
        u && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
      }));
    }
    async doDownloadUpdate(u) {
      let d = u.updateInfoAndProvider.provider.resolveFiles(u.updateInfoAndProvider.info);
      const m = this._logger, w = "sysctl.proc_translated";
      let y = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), y = (0, a.execFileSync)("sysctl", [w], { encoding: "utf8" }).includes(`${w}: 1`), m.info(`Checked for macOS Rosetta environment (isRosetta=${y})`);
      } catch (U) {
        m.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${U}`);
      }
      let v = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const A = (0, a.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        m.info(`Checked 'uname -a': arm64=${A}`), v = v || A;
      } catch (U) {
        m.warn(`uname shell command to check for arm64 failed: ${U}`);
      }
      v = v || process.arch === "arm64" || y;
      const b = (U) => {
        var A;
        return U.url.pathname.includes("arm64") || ((A = U.info.url) === null || A === void 0 ? void 0 : A.includes("arm64"));
      };
      v && d.some(b) ? d = d.filter((U) => v === b(U)) : d = d.filter((U) => !b(U));
      const I = (0, s.findFile)(d, "zip", ["pkg", "dmg"]);
      if (I == null)
        throw (0, e.newError)(`ZIP file not provided: ${(0, e.safeStringifyJson)(d)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const M = u.updateInfoAndProvider.provider, k = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: I,
        downloadUpdateOptions: u,
        task: async (U, A) => {
          const D = r.join(this.downloadedUpdateHelper.cacheDir, k), R = () => (0, t.pathExistsSync)(D) ? !u.disableDifferentialDownload : (m.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let $ = !0;
          R() && ($ = await this.differentialDownloadInstaller(I, u, U, M, k)), $ && await this.httpExecutor.download(I.url, U, A);
        },
        done: (U) => {
          if (!u.disableDifferentialDownload)
            try {
              const A = r.join(this.downloadedUpdateHelper.cacheDir, k);
              (0, n.copyFileSync)(U.downloadedFile, A);
            } catch (A) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${A.message}`);
            }
          return this.updateDownloaded(I, U);
        }
      });
    }
    async updateDownloaded(u, d) {
      var m;
      const w = d.downloadedFile, y = (m = u.info.size) !== null && m !== void 0 ? m : (await (0, t.stat)(w)).size, v = this._logger, b = `fileToProxy=${u.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${b})`), this.server = (0, i.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${b})`), this.server.on("close", () => {
        v.info(`Proxy server for native Squirrel.Mac is closed (${b})`);
      });
      const I = (M) => {
        const k = M.address();
        return typeof k == "string" ? k : `http://127.0.0.1:${k == null ? void 0 : k.port}`;
      };
      return await new Promise((M, k) => {
        const U = (0, l.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), A = Buffer.from(`autoupdater:${U}`, "ascii"), D = `/${(0, l.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (R, $) => {
          const E = R.url;
          if (v.info(`${E} requested`), E === "/") {
            if (!R.headers.authorization || R.headers.authorization.indexOf("Basic ") === -1) {
              $.statusCode = 401, $.statusMessage = "Invalid Authentication Credentials", $.end(), v.warn("No authenthication info");
              return;
            }
            const ee = R.headers.authorization.split(" ")[1], K = Buffer.from(ee, "base64").toString("ascii"), [H, J] = K.split(":");
            if (H !== "autoupdater" || J !== U) {
              $.statusCode = 401, $.statusMessage = "Invalid Authentication Credentials", $.end(), v.warn("Invalid authenthication credentials");
              return;
            }
            const C = Buffer.from(`{ "url": "${I(this.server)}${D}" }`);
            $.writeHead(200, { "Content-Type": "application/json", "Content-Length": C.length }), $.end(C);
            return;
          }
          if (!E.startsWith(D)) {
            v.warn(`${E} requested, but not supported`), $.writeHead(404), $.end();
            return;
          }
          v.info(`${D} requested by Squirrel.Mac, pipe ${w}`);
          let z = !1;
          $.on("finish", () => {
            z || (this.nativeUpdater.removeListener("error", k), M([]));
          });
          const Q = (0, n.createReadStream)(w);
          Q.on("error", (ee) => {
            try {
              $.end();
            } catch (K) {
              v.warn(`cannot end response: ${K}`);
            }
            z = !0, this.nativeUpdater.removeListener("error", k), k(new Error(`Cannot pipe "${w}": ${ee}`));
          }), $.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": y
          }), Q.pipe($);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${b})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${I(this.server)}, ${b})`), this.nativeUpdater.setFeedURL({
            url: I(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${A.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(d), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", k), this.nativeUpdater.checkForUpdates()) : M([]);
        });
      });
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? (this.nativeUpdater.quitAndInstall(), this.closeServerIfExists()) : (this.nativeUpdater.on("update-downloaded", () => {
        this.nativeUpdater.quitAndInstall(), this.closeServerIfExists();
      }), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return Wn.MacUpdater = p, Wn;
}
var Vn = {}, zs = {};
Object.defineProperty(zs, "__esModule", { value: !0 });
zs.verifySignature = Z1;
const cc = _e, Pf = bi, Q1 = xi, uc = ue;
function Z1(e, t, n) {
  return new Promise((r, i) => {
    const o = t.replace(/'/g, "''");
    n.info(`Verifying signature ${o}`), (0, Pf.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (s, a, l) => {
      var p;
      try {
        if (s != null || l) {
          Bo(n, s, l, i), r(null);
          return;
        }
        const c = e_(a);
        if (c.Status === 0) {
          try {
            const w = uc.normalize(c.Path), y = uc.normalize(t);
            if (n.info(`LiteralPath: ${w}. Update Path: ${y}`), w !== y) {
              Bo(n, new Error(`LiteralPath of ${w} is different than ${y}`), l, i), r(null);
              return;
            }
          } catch (w) {
            n.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(p = w.message) !== null && p !== void 0 ? p : w.stack}`);
          }
          const d = (0, cc.parseDn)(c.SignerCertificate.Subject);
          let m = !1;
          for (const w of e) {
            const y = (0, cc.parseDn)(w);
            if (y.size ? m = Array.from(y.keys()).every((b) => y.get(b) === d.get(b)) : w === d.get("CN") && (n.warn(`Signature validated using only CN ${w}. Please add your full Distinguished Name (DN) to publisherNames configuration`), m = !0), m) {
              r(null);
              return;
            }
          }
        }
        const u = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(c, (d, m) => d === "RawData" ? void 0 : m, 2);
        n.warn(`Sign verification failed, installer signed with incorrect certificate: ${u}`), r(u);
      } catch (c) {
        Bo(n, c, null, i), r(null);
        return;
      }
    });
  });
}
function e_(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const n = t.SignerCertificate;
  return n != null && (delete n.Archived, delete n.Extensions, delete n.Handle, delete n.HasPrivateKey, delete n.SubjectName), t;
}
function Bo(e, t, n, r) {
  if (t_()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || n}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, Pf.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && r(t), n && r(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${n}. Failing signature validation due to unknown stderr.`));
}
function t_() {
  const e = Q1.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
var fc;
function dc() {
  if (fc) return Vn;
  fc = 1, Object.defineProperty(Vn, "__esModule", { value: !0 }), Vn.NsisUpdater = void 0;
  const e = _e, t = ue, n = Sr(), r = Ar, i = Rn(), o = xe, s = Ut, a = zs, l = $n;
  let p = class extends n.BaseUpdater {
    constructor(u, d) {
      super(u, d), this._verifyUpdateCodeSignature = (m, w) => (0, a.verifySignature)(m, w, this._logger);
    }
    /**
     * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
     * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
     */
    get verifyUpdateCodeSignature() {
      return this._verifyUpdateCodeSignature;
    }
    set verifyUpdateCodeSignature(u) {
      u && (this._verifyUpdateCodeSignature = u);
    }
    /*** @private */
    doDownloadUpdate(u) {
      const d = u.updateInfoAndProvider.provider, m = (0, o.findFile)(d.resolveFiles(u.updateInfoAndProvider.info), "exe");
      return this.executeDownload({
        fileExtension: "exe",
        downloadUpdateOptions: u,
        fileInfo: m,
        task: async (w, y, v, b) => {
          const I = m.packageInfo, M = I != null && v != null;
          if (M && u.disableWebInstaller)
            throw (0, e.newError)(`Unable to download new version ${u.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !M && !u.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (M || u.disableDifferentialDownload || await this.differentialDownloadInstaller(m, u, w, d, e.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(m.url, w, y);
          const k = await this.verifySignature(w);
          if (k != null)
            throw await b(), (0, e.newError)(`New version ${u.updateInfoAndProvider.info.version} is not signed by the application owner: ${k}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (M && await this.differentialDownloadWebPackage(u, I, v, d))
            try {
              await this.httpExecutor.download(new l.URL(I.path), v, {
                headers: u.requestHeaders,
                cancellationToken: u.cancellationToken,
                sha512: I.sha512
              });
            } catch (U) {
              try {
                await (0, s.unlink)(v);
              } catch {
              }
              throw U;
            }
        }
      });
    }
    // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
    // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
    // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
    async verifySignature(u) {
      let d;
      try {
        if (d = (await this.configOnDisk.value).publisherName, d == null)
          return null;
      } catch (m) {
        if (m.code === "ENOENT")
          return null;
        throw m;
      }
      return await this._verifyUpdateCodeSignature(Array.isArray(d) ? d : [d], u);
    }
    doInstall(u) {
      const d = ["--updated"];
      u.isSilent && d.push("/S"), u.isForceRunAfter && d.push("--force-run"), this.installDirectory && d.push(`/D=${this.installDirectory}`);
      const m = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
      m != null && d.push(`--package-file=${m}`);
      const w = () => {
        this.spawnLog(t.join(process.resourcesPath, "elevate.exe"), [u.installerPath].concat(d)).catch((y) => this.dispatchError(y));
      };
      return u.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), w(), !0) : (this.spawnLog(u.installerPath, d).catch((y) => {
        const v = y.code;
        this._logger.info(`Cannot run installer: error code: ${v}, error message: "${y.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), v === "UNKNOWN" || v === "EACCES" ? w() : v === "ENOENT" ? Kt.shell.openPath(u.installerPath).catch((b) => this.dispatchError(b)) : this.dispatchError(y);
      }), !0);
    }
    async differentialDownloadWebPackage(u, d, m, w) {
      if (d.blockMapSize == null)
        return !0;
      try {
        const y = {
          newUrl: new l.URL(d.path),
          oldFile: t.join(this.downloadedUpdateHelper.cacheDir, e.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: m,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: w.isUseMultipleRangeRequest,
          cancellationToken: u.cancellationToken
        };
        this.listenerCount(i.DOWNLOAD_PROGRESS) > 0 && (y.onProgress = (v) => this.emit(i.DOWNLOAD_PROGRESS, v)), await new r.FileWithEmbeddedBlockMapDifferentialDownloader(d, this.httpExecutor, y).download();
      } catch (y) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${y.stack || y}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return Vn.NsisUpdater = p, Vn;
}
var hc;
function Rn() {
  return hc || (hc = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.CancellationToken = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
    const t = _e;
    Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return t.CancellationToken;
    } });
    const n = Ut, r = ue;
    var i = Sr();
    Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
      return i.BaseUpdater;
    } });
    var o = Gs();
    Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
      return o.AppUpdater;
    } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
      return o.NoOpLogger;
    } });
    var s = xe;
    Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
      return s.Provider;
    } });
    var a = nc();
    Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
      return a.AppImageUpdater;
    } });
    var l = ic();
    Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
      return l.DebUpdater;
    } });
    var p = sc();
    Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
      return p.RpmUpdater;
    } });
    var c = lc();
    Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
      return c.MacUpdater;
    } });
    var u = dc();
    Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
      return u.NsisUpdater;
    } });
    let d;
    function m() {
      if (process.platform === "win32")
        d = new (dc()).NsisUpdater();
      else if (process.platform === "darwin")
        d = new (lc()).MacUpdater();
      else {
        d = new (nc()).AppImageUpdater();
        try {
          const v = r.join(process.resourcesPath, "package-type");
          if (!(0, n.existsSync)(v))
            return d;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const b = (0, n.readFileSync)(v).toString().trim();
          switch (console.info("Found package-type:", b), b) {
            case "deb":
              d = new (ic()).DebUpdater();
              break;
            case "rpm":
              d = new (sc()).RpmUpdater();
              break;
            default:
              break;
          }
        } catch (v) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", v.message);
        }
      }
      return d;
    }
    Object.defineProperty(e, "autoUpdater", {
      enumerable: !0,
      get: () => d || m()
    }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
    class w {
      constructor(b) {
        this.emitter = b;
      }
      /**
       * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
       */
      login(b) {
        y(this.emitter, "login", b);
      }
      progress(b) {
        y(this.emitter, e.DOWNLOAD_PROGRESS, b);
      }
      updateDownloaded(b) {
        y(this.emitter, e.UPDATE_DOWNLOADED, b);
      }
      updateCancelled(b) {
        y(this.emitter, "update-cancelled", b);
      }
    }
    e.UpdaterSignal = w;
    function y(v, b, I) {
      v.on(b, I);
    }
  }(ho)), ho;
}
var pc = Rn(), Pn = { exports: {} }, Ws = { exports: {} }, n_ = Nf;
function Nf(e, t) {
  if (e && t) return Nf(e)(t);
  if (typeof e != "function")
    throw new TypeError("need wrapper function");
  return Object.keys(e).forEach(function(r) {
    n[r] = e[r];
  }), n;
  function n() {
    for (var r = new Array(arguments.length), i = 0; i < r.length; i++)
      r[i] = arguments[i];
    var o = e.apply(this, r), s = r[r.length - 1];
    return typeof o == "function" && o !== s && Object.keys(s).forEach(function(a) {
      o[a] = s[a];
    }), o;
  }
}
var Ff = n_;
Ws.exports = Ff(ri);
Ws.exports.strict = Ff(Lf);
ri.proto = ri(function() {
  Object.defineProperty(Function.prototype, "once", {
    value: function() {
      return ri(this);
    },
    configurable: !0
  }), Object.defineProperty(Function.prototype, "onceStrict", {
    value: function() {
      return Lf(this);
    },
    configurable: !0
  });
});
function ri(e) {
  var t = function() {
    return t.called ? t.value : (t.called = !0, t.value = e.apply(this, arguments));
  };
  return t.called = !1, t;
}
function Lf(e) {
  var t = function() {
    if (t.called)
      throw new Error(t.onceError);
    return t.called = !0, t.value = e.apply(this, arguments);
  }, n = e.name || "Function wrapped with `once`";
  return t.onceError = n + " shouldn't be called more than once", t.called = !1, t;
}
var Uf = Ws.exports, r_ = Uf, i_ = function() {
}, o_ = ze.Bare ? queueMicrotask : process.nextTick.bind(process), s_ = function(e) {
  return e.setHeader && typeof e.abort == "function";
}, a_ = function(e) {
  return e.stdio && Array.isArray(e.stdio) && e.stdio.length === 3;
}, kf = function(e, t, n) {
  if (typeof t == "function") return kf(e, null, t);
  t || (t = {}), n = r_(n || i_);
  var r = e._writableState, i = e._readableState, o = t.readable || t.readable !== !1 && e.readable, s = t.writable || t.writable !== !1 && e.writable, a = !1, l = function() {
    e.writable || p();
  }, p = function() {
    s = !1, o || n.call(e);
  }, c = function() {
    o = !1, s || n.call(e);
  }, u = function(v) {
    n.call(e, v ? new Error("exited with error code: " + v) : null);
  }, d = function(v) {
    n.call(e, v);
  }, m = function() {
    o_(w);
  }, w = function() {
    if (!a) {
      if (o && !(i && i.ended && !i.destroyed)) return n.call(e, new Error("premature close"));
      if (s && !(r && r.ended && !r.destroyed)) return n.call(e, new Error("premature close"));
    }
  }, y = function() {
    e.req.on("finish", p);
  };
  return s_(e) ? (e.on("complete", p), e.on("abort", m), e.req ? y() : e.on("request", y)) : s && !r && (e.on("end", l), e.on("close", l)), a_(e) && e.on("exit", u), e.on("end", c), e.on("finish", p), t.error !== !1 && e.on("error", d), e.on("close", m), function() {
    a = !0, e.removeListener("complete", p), e.removeListener("abort", m), e.removeListener("request", y), e.req && e.req.removeListener("finish", p), e.removeListener("end", l), e.removeListener("close", l), e.removeListener("finish", p), e.removeListener("exit", u), e.removeListener("end", c), e.removeListener("error", d), e.removeListener("close", m);
  };
}, l_ = kf, c_ = Uf, u_ = l_, ii;
try {
  ii = require("fs");
} catch {
}
var dr = function() {
}, f_ = typeof process > "u" ? !1 : /^v?\.0/.test(process.version), Vi = function(e) {
  return typeof e == "function";
}, d_ = function(e) {
  return !f_ || !ii ? !1 : (e instanceof (ii.ReadStream || dr) || e instanceof (ii.WriteStream || dr)) && Vi(e.close);
}, h_ = function(e) {
  return e.setHeader && Vi(e.abort);
}, p_ = function(e, t, n, r) {
  r = c_(r);
  var i = !1;
  e.on("close", function() {
    i = !0;
  }), u_(e, { readable: t, writable: n }, function(s) {
    if (s) return r(s);
    i = !0, r();
  });
  var o = !1;
  return function(s) {
    if (!i && !o) {
      if (o = !0, d_(e)) return e.close(dr);
      if (h_(e)) return e.abort();
      if (Vi(e.destroy)) return e.destroy();
      r(s || new Error("stream was destroyed"));
    }
  };
}, mc = function(e) {
  e();
}, m_ = function(e, t) {
  return e.pipe(t);
}, g_ = function() {
  var e = Array.prototype.slice.call(arguments), t = Vi(e[e.length - 1] || dr) && e.pop() || dr;
  if (Array.isArray(e[0]) && (e = e[0]), e.length < 2) throw new Error("pump requires two streams per minimum");
  var n, r = e.map(function(i, o) {
    var s = o < e.length - 1, a = o > 0;
    return p_(i, s, a, function(l) {
      n || (n = l), l && r.forEach(mc), !s && (r.forEach(mc), t(n));
    });
  });
  return e.reduce(m_);
}, y_ = g_;
const { PassThrough: E_ } = nt;
var w_ = (e) => {
  e = { ...e };
  const { array: t } = e;
  let { encoding: n } = e;
  const r = n === "buffer";
  let i = !1;
  t ? i = !(n || r) : n = n || "utf8", r && (n = null);
  const o = new E_({ objectMode: i });
  n && o.setEncoding(n);
  let s = 0;
  const a = [];
  return o.on("data", (l) => {
    a.push(l), i ? s = a.length : s += l.length;
  }), o.getBufferedValue = () => t ? a : r ? Buffer.concat(a, s) : a.join(""), o.getBufferedLength = () => s, o;
};
const { constants: v_ } = _c, __ = y_, x_ = w_;
class Mf extends Error {
  constructor() {
    super("maxBuffer exceeded"), this.name = "MaxBufferError";
  }
}
async function Yi(e, t) {
  if (!e)
    return Promise.reject(new Error("Expected a stream"));
  t = {
    maxBuffer: 1 / 0,
    ...t
  };
  const { maxBuffer: n } = t;
  let r;
  return await new Promise((i, o) => {
    const s = (a) => {
      a && r.getBufferedLength() <= v_.MAX_LENGTH && (a.bufferedData = r.getBufferedValue()), o(a);
    };
    r = __(e, x_(t), (a) => {
      if (a) {
        s(a);
        return;
      }
      i();
    }), r.on("data", () => {
      r.getBufferedLength() > n && s(new Mf());
    });
  }), r.getBufferedValue();
}
Pn.exports = Yi;
Pn.exports.default = Yi;
Pn.exports.buffer = (e, t) => Yi(e, { ...t, encoding: "buffer" });
Pn.exports.array = (e, t) => Yi(e, { ...t, array: !0 });
Pn.exports.MaxBufferError = Mf;
var b_ = Pn.exports, ft = {}, Tr = {}, S_ = Xi;
function Xi() {
  this.pending = 0, this.max = 1 / 0, this.listeners = [], this.waiting = [], this.error = null;
}
Xi.prototype.go = function(e) {
  this.pending < this.max ? Bf(this, e) : this.waiting.push(e);
};
Xi.prototype.wait = function(e) {
  this.pending === 0 ? e(this.error) : this.listeners.push(e);
};
Xi.prototype.hold = function() {
  return jf(this);
};
function jf(e) {
  e.pending += 1;
  var t = !1;
  return n;
  function n(i) {
    if (t) throw new Error("callback called twice");
    if (t = !0, e.error = e.error || i, e.pending -= 1, e.waiting.length > 0 && e.pending < e.max)
      Bf(e, e.waiting.shift());
    else if (e.pending === 0) {
      var o = e.listeners;
      e.listeners = [], o.forEach(r);
    }
  }
  function r(i) {
    i(e.error);
  }
}
function Bf(e, t) {
  t(jf(e));
}
var Cr = tt, Ji = Cn, Vs = nt, Hf = Vs.Readable, Ys = Vs.Writable, A_ = Vs.PassThrough, T_ = S_, Ki = _i.EventEmitter;
Tr.createFromBuffer = C_;
Tr.createFromFd = $_;
Tr.BufferSlicer = wt;
Tr.FdSlicer = Et;
Ji.inherits(Et, Ki);
function Et(e, t) {
  t = t || {}, Ki.call(this), this.fd = e, this.pend = new T_(), this.pend.max = 1, this.refCount = 0, this.autoClose = !!t.autoClose;
}
Et.prototype.read = function(e, t, n, r, i) {
  var o = this;
  o.pend.go(function(s) {
    Cr.read(o.fd, e, t, n, r, function(a, l, p) {
      s(), i(a, l, p);
    });
  });
};
Et.prototype.write = function(e, t, n, r, i) {
  var o = this;
  o.pend.go(function(s) {
    Cr.write(o.fd, e, t, n, r, function(a, l, p) {
      s(), i(a, l, p);
    });
  });
};
Et.prototype.createReadStream = function(e) {
  return new Qi(this, e);
};
Et.prototype.createWriteStream = function(e) {
  return new Zi(this, e);
};
Et.prototype.ref = function() {
  this.refCount += 1;
};
Et.prototype.unref = function() {
  var e = this;
  if (e.refCount -= 1, e.refCount > 0) return;
  if (e.refCount < 0) throw new Error("invalid unref");
  e.autoClose && Cr.close(e.fd, t);
  function t(n) {
    n ? e.emit("error", n) : e.emit("close");
  }
};
Ji.inherits(Qi, Hf);
function Qi(e, t) {
  t = t || {}, Hf.call(this, t), this.context = e, this.context.ref(), this.start = t.start || 0, this.endOffset = t.end, this.pos = this.start, this.destroyed = !1;
}
Qi.prototype._read = function(e) {
  var t = this;
  if (!t.destroyed) {
    var n = Math.min(t._readableState.highWaterMark, e);
    if (t.endOffset != null && (n = Math.min(n, t.endOffset - t.pos)), n <= 0) {
      t.destroyed = !0, t.push(null), t.context.unref();
      return;
    }
    t.context.pend.go(function(r) {
      if (t.destroyed) return r();
      var i = new Buffer(n);
      Cr.read(t.context.fd, i, 0, n, t.pos, function(o, s) {
        o ? t.destroy(o) : s === 0 ? (t.destroyed = !0, t.push(null), t.context.unref()) : (t.pos += s, t.push(i.slice(0, s))), r();
      });
    });
  }
};
Qi.prototype.destroy = function(e) {
  this.destroyed || (e = e || new Error("stream destroyed"), this.destroyed = !0, this.emit("error", e), this.context.unref());
};
Ji.inherits(Zi, Ys);
function Zi(e, t) {
  t = t || {}, Ys.call(this, t), this.context = e, this.context.ref(), this.start = t.start || 0, this.endOffset = t.end == null ? 1 / 0 : +t.end, this.bytesWritten = 0, this.pos = this.start, this.destroyed = !1, this.on("finish", this.destroy.bind(this));
}
Zi.prototype._write = function(e, t, n) {
  var r = this;
  if (!r.destroyed) {
    if (r.pos + e.length > r.endOffset) {
      var i = new Error("maximum file length exceeded");
      i.code = "ETOOBIG", r.destroy(), n(i);
      return;
    }
    r.context.pend.go(function(o) {
      if (r.destroyed) return o();
      Cr.write(r.context.fd, e, 0, e.length, r.pos, function(s, a) {
        s ? (r.destroy(), o(), n(s)) : (r.bytesWritten += a, r.pos += a, r.emit("progress"), o(), n());
      });
    });
  }
};
Zi.prototype.destroy = function() {
  this.destroyed || (this.destroyed = !0, this.context.unref());
};
Ji.inherits(wt, Ki);
function wt(e, t) {
  Ki.call(this), t = t || {}, this.refCount = 0, this.buffer = e, this.maxChunkSize = t.maxChunkSize || Number.MAX_SAFE_INTEGER;
}
wt.prototype.read = function(e, t, n, r, i) {
  var o = r + n, s = o - this.buffer.length, a = s > 0 ? s : n;
  this.buffer.copy(e, t, r, o), setImmediate(function() {
    i(null, a);
  });
};
wt.prototype.write = function(e, t, n, r, i) {
  e.copy(this.buffer, r, t, t + n), setImmediate(function() {
    i(null, n, e);
  });
};
wt.prototype.createReadStream = function(e) {
  e = e || {};
  var t = new A_(e);
  t.destroyed = !1, t.start = e.start || 0, t.endOffset = e.end, t.pos = t.endOffset || this.buffer.length;
  for (var n = this.buffer.slice(t.start, t.pos), r = 0; ; ) {
    var i = r + this.maxChunkSize;
    if (i >= n.length) {
      r < n.length && t.write(n.slice(r, n.length));
      break;
    }
    t.write(n.slice(r, i)), r = i;
  }
  return t.end(), t.destroy = function() {
    t.destroyed = !0;
  }, t;
};
wt.prototype.createWriteStream = function(e) {
  var t = this;
  e = e || {};
  var n = new Ys(e);
  return n.start = e.start || 0, n.endOffset = e.end == null ? this.buffer.length : +e.end, n.bytesWritten = 0, n.pos = n.start, n.destroyed = !1, n._write = function(r, i, o) {
    if (!n.destroyed) {
      var s = n.pos + r.length;
      if (s > n.endOffset) {
        var a = new Error("maximum file length exceeded");
        a.code = "ETOOBIG", n.destroyed = !0, o(a);
        return;
      }
      r.copy(t.buffer, n.pos, 0, r.length), n.bytesWritten += r.length, n.pos = s, n.emit("progress"), o();
    }
  }, n.destroy = function() {
    n.destroyed = !0;
  }, n;
};
wt.prototype.ref = function() {
  this.refCount += 1;
};
wt.prototype.unref = function() {
  if (this.refCount -= 1, this.refCount < 0)
    throw new Error("invalid unref");
};
function C_(e, t) {
  return new wt(e, t);
}
function $_(e, t) {
  return new Et(e, t);
}
var Ct = _c.Buffer, as = [
  0,
  1996959894,
  3993919788,
  2567524794,
  124634137,
  1886057615,
  3915621685,
  2657392035,
  249268274,
  2044508324,
  3772115230,
  2547177864,
  162941995,
  2125561021,
  3887607047,
  2428444049,
  498536548,
  1789927666,
  4089016648,
  2227061214,
  450548861,
  1843258603,
  4107580753,
  2211677639,
  325883990,
  1684777152,
  4251122042,
  2321926636,
  335633487,
  1661365465,
  4195302755,
  2366115317,
  997073096,
  1281953886,
  3579855332,
  2724688242,
  1006888145,
  1258607687,
  3524101629,
  2768942443,
  901097722,
  1119000684,
  3686517206,
  2898065728,
  853044451,
  1172266101,
  3705015759,
  2882616665,
  651767980,
  1373503546,
  3369554304,
  3218104598,
  565507253,
  1454621731,
  3485111705,
  3099436303,
  671266974,
  1594198024,
  3322730930,
  2970347812,
  795835527,
  1483230225,
  3244367275,
  3060149565,
  1994146192,
  31158534,
  2563907772,
  4023717930,
  1907459465,
  112637215,
  2680153253,
  3904427059,
  2013776290,
  251722036,
  2517215374,
  3775830040,
  2137656763,
  141376813,
  2439277719,
  3865271297,
  1802195444,
  476864866,
  2238001368,
  4066508878,
  1812370925,
  453092731,
  2181625025,
  4111451223,
  1706088902,
  314042704,
  2344532202,
  4240017532,
  1658658271,
  366619977,
  2362670323,
  4224994405,
  1303535960,
  984961486,
  2747007092,
  3569037538,
  1256170817,
  1037604311,
  2765210733,
  3554079995,
  1131014506,
  879679996,
  2909243462,
  3663771856,
  1141124467,
  855842277,
  2852801631,
  3708648649,
  1342533948,
  654459306,
  3188396048,
  3373015174,
  1466479909,
  544179635,
  3110523913,
  3462522015,
  1591671054,
  702138776,
  2966460450,
  3352799412,
  1504918807,
  783551873,
  3082640443,
  3233442989,
  3988292384,
  2596254646,
  62317068,
  1957810842,
  3939845945,
  2647816111,
  81470997,
  1943803523,
  3814918930,
  2489596804,
  225274430,
  2053790376,
  3826175755,
  2466906013,
  167816743,
  2097651377,
  4027552580,
  2265490386,
  503444072,
  1762050814,
  4150417245,
  2154129355,
  426522225,
  1852507879,
  4275313526,
  2312317920,
  282753626,
  1742555852,
  4189708143,
  2394877945,
  397917763,
  1622183637,
  3604390888,
  2714866558,
  953729732,
  1340076626,
  3518719985,
  2797360999,
  1068828381,
  1219638859,
  3624741850,
  2936675148,
  906185462,
  1090812512,
  3747672003,
  2825379669,
  829329135,
  1181335161,
  3412177804,
  3160834842,
  628085408,
  1382605366,
  3423369109,
  3138078467,
  570562233,
  1426400815,
  3317316542,
  2998733608,
  733239954,
  1555261956,
  3268935591,
  3050360625,
  752459403,
  1541320221,
  2607071920,
  3965973030,
  1969922972,
  40735498,
  2617837225,
  3943577151,
  1913087877,
  83908371,
  2512341634,
  3803740692,
  2075208622,
  213261112,
  2463272603,
  3855990285,
  2094854071,
  198958881,
  2262029012,
  4057260610,
  1759359992,
  534414190,
  2176718541,
  4139329115,
  1873836001,
  414664567,
  2282248934,
  4279200368,
  1711684554,
  285281116,
  2405801727,
  4167216745,
  1634467795,
  376229701,
  2685067896,
  3608007406,
  1308918612,
  956543938,
  2808555105,
  3495958263,
  1231636301,
  1047427035,
  2932959818,
  3654703836,
  1088359270,
  936918e3,
  2847714899,
  3736837829,
  1202900863,
  817233897,
  3183342108,
  3401237130,
  1404277552,
  615818150,
  3134207493,
  3453421203,
  1423857449,
  601450431,
  3009837614,
  3294710456,
  1567103746,
  711928724,
  3020668471,
  3272380065,
  1510334235,
  755167117
];
typeof Int32Array < "u" && (as = new Int32Array(as));
function qf(e) {
  if (Ct.isBuffer(e))
    return e;
  var t = typeof Ct.alloc == "function" && typeof Ct.from == "function";
  if (typeof e == "number")
    return t ? Ct.alloc(e) : new Ct(e);
  if (typeof e == "string")
    return t ? Ct.from(e) : new Ct(e);
  throw new Error("input must be buffer, number, or string, received " + typeof e);
}
function I_(e) {
  var t = qf(4);
  return t.writeInt32BE(e, 0), t;
}
function Xs(e, t) {
  e = qf(e), Ct.isBuffer(t) && (t = t.readUInt32BE(0));
  for (var n = ~~t ^ -1, r = 0; r < e.length; r++)
    n = as[(n ^ e[r]) & 255] ^ n >>> 8;
  return n ^ -1;
}
function Js() {
  return I_(Xs.apply(null, arguments));
}
Js.signed = function() {
  return Xs.apply(null, arguments);
};
Js.unsigned = function() {
  return Xs.apply(null, arguments) >>> 0;
};
var D_ = Js, ls = tt, O_ = ps, Gf = Tr, R_ = D_, eo = Cn, to = _i.EventEmitter, zf = nt.Transform, Ks = nt.PassThrough, P_ = nt.Writable;
ft.open = N_;
ft.fromFd = Wf;
ft.fromBuffer = F_;
ft.fromRandomAccessReader = Qs;
ft.dosDateTimeToDate = Yf;
ft.validateFileName = Xf;
ft.ZipFile = Lt;
ft.Entry = $r;
ft.RandomAccessReader = kt;
function N_(e, t, n) {
  typeof t == "function" && (n = t, t = null), t == null && (t = {}), t.autoClose == null && (t.autoClose = !0), t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1), n == null && (n = vi), ls.open(e, "r", function(r, i) {
    if (r) return n(r);
    Wf(i, t, function(o, s) {
      o && ls.close(i, vi), n(o, s);
    });
  });
}
function Wf(e, t, n) {
  typeof t == "function" && (n = t, t = null), t == null && (t = {}), t.autoClose == null && (t.autoClose = !1), t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1), n == null && (n = vi), ls.fstat(e, function(r, i) {
    if (r) return n(r);
    var o = Gf.createFromFd(e, { autoClose: !0 });
    Qs(o, i.size, t, n);
  });
}
function F_(e, t, n) {
  typeof t == "function" && (n = t, t = null), t == null && (t = {}), t.autoClose = !1, t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1);
  var r = Gf.createFromBuffer(e, { maxChunkSize: 65536 });
  Qs(r, e.length, t, n);
}
function Qs(e, t, n, r) {
  typeof n == "function" && (r = n, n = null), n == null && (n = {}), n.autoClose == null && (n.autoClose = !0), n.lazyEntries == null && (n.lazyEntries = !1), n.decodeStrings == null && (n.decodeStrings = !0);
  var i = !!n.decodeStrings;
  if (n.validateEntrySizes == null && (n.validateEntrySizes = !0), n.strictFileNames == null && (n.strictFileNames = !1), r == null && (r = vi), typeof t != "number") throw new Error("expected totalSize parameter to be a number");
  if (t > Number.MAX_SAFE_INTEGER)
    throw new Error("zip file too large. only file sizes up to 2^52 are supported due to JavaScript's Number type being an IEEE 754 double.");
  e.ref();
  var o = 22, s = 65535, a = Math.min(o + s, t), l = ct(a), p = t - l.length;
  wn(e, l, 0, a, p, function(c) {
    if (c) return r(c);
    for (var u = a - o; u >= 0; u -= 1)
      if (l.readUInt32LE(u) === 101010256) {
        var d = l.slice(u), m = d.readUInt16LE(4);
        if (m !== 0)
          return r(new Error("multi-disk zip files are not supported: found disk number: " + m));
        var w = d.readUInt16LE(10), y = d.readUInt32LE(16), v = d.readUInt16LE(20), b = d.length - o;
        if (v !== b)
          return r(new Error("invalid comment length. expected: " + b + ". found: " + v));
        var I = i ? oi(d, 22, d.length, !1) : d.slice(22);
        if (!(w === 65535 || y === 4294967295))
          return r(null, new Lt(e, y, t, w, I, n.autoClose, n.lazyEntries, i, n.validateEntrySizes, n.strictFileNames));
        var M = ct(20), k = p + u - M.length;
        wn(e, M, 0, M.length, k, function(U) {
          if (U) return r(U);
          if (M.readUInt32LE(0) !== 117853008)
            return r(new Error("invalid zip64 end of central directory locator signature"));
          var A = vn(M, 8), D = ct(56);
          wn(e, D, 0, D.length, A, function(R) {
            return R ? r(R) : D.readUInt32LE(0) !== 101075792 ? r(new Error("invalid zip64 end of central directory record signature")) : (w = vn(D, 32), y = vn(D, 48), r(null, new Lt(e, y, t, w, I, n.autoClose, n.lazyEntries, i, n.validateEntrySizes, n.strictFileNames)));
          });
        });
        return;
      }
    r(new Error("end of central directory record signature not found"));
  });
}
eo.inherits(Lt, to);
function Lt(e, t, n, r, i, o, s, a, l, p) {
  var c = this;
  to.call(c), c.reader = e, c.reader.on("error", function(u) {
    Vf(c, u);
  }), c.reader.once("close", function() {
    c.emit("close");
  }), c.readEntryCursor = t, c.fileSize = n, c.entryCount = r, c.comment = i, c.entriesRead = 0, c.autoClose = !!o, c.lazyEntries = !!s, c.decodeStrings = !!a, c.validateEntrySizes = !!l, c.strictFileNames = !!p, c.isOpen = !0, c.emittedError = !1, c.lazyEntries || c._readEntry();
}
Lt.prototype.close = function() {
  this.isOpen && (this.isOpen = !1, this.reader.unref());
};
function Je(e, t) {
  e.autoClose && e.close(), Vf(e, t);
}
function Vf(e, t) {
  e.emittedError || (e.emittedError = !0, e.emit("error", t));
}
Lt.prototype.readEntry = function() {
  if (!this.lazyEntries) throw new Error("readEntry() called without lazyEntries:true");
  this._readEntry();
};
Lt.prototype._readEntry = function() {
  var e = this;
  if (e.entryCount === e.entriesRead) {
    setImmediate(function() {
      e.autoClose && e.close(), !e.emittedError && e.emit("end");
    });
    return;
  }
  if (!e.emittedError) {
    var t = ct(46);
    wn(e.reader, t, 0, t.length, e.readEntryCursor, function(n) {
      if (n) return Je(e, n);
      if (!e.emittedError) {
        var r = new $r(), i = t.readUInt32LE(0);
        if (i !== 33639248) return Je(e, new Error("invalid central directory file header signature: 0x" + i.toString(16)));
        if (r.versionMadeBy = t.readUInt16LE(4), r.versionNeededToExtract = t.readUInt16LE(6), r.generalPurposeBitFlag = t.readUInt16LE(8), r.compressionMethod = t.readUInt16LE(10), r.lastModFileTime = t.readUInt16LE(12), r.lastModFileDate = t.readUInt16LE(14), r.crc32 = t.readUInt32LE(16), r.compressedSize = t.readUInt32LE(20), r.uncompressedSize = t.readUInt32LE(24), r.fileNameLength = t.readUInt16LE(28), r.extraFieldLength = t.readUInt16LE(30), r.fileCommentLength = t.readUInt16LE(32), r.internalFileAttributes = t.readUInt16LE(36), r.externalFileAttributes = t.readUInt32LE(38), r.relativeOffsetOfLocalHeader = t.readUInt32LE(42), r.generalPurposeBitFlag & 64) return Je(e, new Error("strong encryption is not supported"));
        e.readEntryCursor += 46, t = ct(r.fileNameLength + r.extraFieldLength + r.fileCommentLength), wn(e.reader, t, 0, t.length, e.readEntryCursor, function(o) {
          if (o) return Je(e, o);
          if (!e.emittedError) {
            var s = (r.generalPurposeBitFlag & 2048) !== 0;
            r.fileName = e.decodeStrings ? oi(t, 0, r.fileNameLength, s) : t.slice(0, r.fileNameLength);
            var a = r.fileNameLength + r.extraFieldLength, l = t.slice(r.fileNameLength, a);
            r.extraFields = [];
            for (var p = 0; p < l.length - 3; ) {
              var c = l.readUInt16LE(p + 0), u = l.readUInt16LE(p + 2), d = p + 4, m = d + u;
              if (m > l.length) return Je(e, new Error("extra field length exceeds extra field buffer size"));
              var w = ct(u);
              l.copy(w, 0, d, m), r.extraFields.push({
                id: c,
                data: w
              }), p = m;
            }
            if (r.fileComment = e.decodeStrings ? oi(t, a, a + r.fileCommentLength, s) : t.slice(a, a + r.fileCommentLength), r.comment = r.fileComment, e.readEntryCursor += t.length, e.entriesRead += 1, r.uncompressedSize === 4294967295 || r.compressedSize === 4294967295 || r.relativeOffsetOfLocalHeader === 4294967295) {
              for (var y = null, p = 0; p < r.extraFields.length; p++) {
                var v = r.extraFields[p];
                if (v.id === 1) {
                  y = v.data;
                  break;
                }
              }
              if (y == null)
                return Je(e, new Error("expected zip64 extended information extra field"));
              var b = 0;
              if (r.uncompressedSize === 4294967295) {
                if (b + 8 > y.length)
                  return Je(e, new Error("zip64 extended information extra field does not include uncompressed size"));
                r.uncompressedSize = vn(y, b), b += 8;
              }
              if (r.compressedSize === 4294967295) {
                if (b + 8 > y.length)
                  return Je(e, new Error("zip64 extended information extra field does not include compressed size"));
                r.compressedSize = vn(y, b), b += 8;
              }
              if (r.relativeOffsetOfLocalHeader === 4294967295) {
                if (b + 8 > y.length)
                  return Je(e, new Error("zip64 extended information extra field does not include relative header offset"));
                r.relativeOffsetOfLocalHeader = vn(y, b), b += 8;
              }
            }
            if (e.decodeStrings)
              for (var p = 0; p < r.extraFields.length; p++) {
                var v = r.extraFields[p];
                if (v.id === 28789) {
                  if (v.data.length < 6 || v.data.readUInt8(0) !== 1)
                    continue;
                  var I = v.data.readUInt32LE(1);
                  if (R_.unsigned(t.slice(0, r.fileNameLength)) !== I)
                    continue;
                  r.fileName = oi(v.data, 5, v.data.length, !0);
                  break;
                }
              }
            if (e.validateEntrySizes && r.compressionMethod === 0) {
              var M = r.uncompressedSize;
              if (r.isEncrypted() && (M += 12), r.compressedSize !== M) {
                var k = "compressed/uncompressed size mismatch for stored file: " + r.compressedSize + " != " + r.uncompressedSize;
                return Je(e, new Error(k));
              }
            }
            if (e.decodeStrings) {
              e.strictFileNames || (r.fileName = r.fileName.replace(/\\/g, "/"));
              var U = Xf(r.fileName, e.validateFileNameOptions);
              if (U != null) return Je(e, new Error(U));
            }
            e.emit("entry", r), e.lazyEntries || e._readEntry();
          }
        });
      }
    });
  }
};
Lt.prototype.openReadStream = function(e, t, n) {
  var r = this, i = 0, o = e.compressedSize;
  if (n == null)
    n = t, t = {};
  else {
    if (t.decrypt != null) {
      if (!e.isEncrypted())
        throw new Error("options.decrypt can only be specified for encrypted entries");
      if (t.decrypt !== !1) throw new Error("invalid options.decrypt value: " + t.decrypt);
      if (e.isCompressed() && t.decompress !== !1)
        throw new Error("entry is encrypted and compressed, and options.decompress !== false");
    }
    if (t.decompress != null) {
      if (!e.isCompressed())
        throw new Error("options.decompress can only be specified for compressed entries");
      if (!(t.decompress === !1 || t.decompress === !0))
        throw new Error("invalid options.decompress value: " + t.decompress);
    }
    if (t.start != null || t.end != null) {
      if (e.isCompressed() && t.decompress !== !1)
        throw new Error("start/end range not allowed for compressed entry without options.decompress === false");
      if (e.isEncrypted() && t.decrypt !== !1)
        throw new Error("start/end range not allowed for encrypted entry without options.decrypt === false");
    }
    if (t.start != null) {
      if (i = t.start, i < 0) throw new Error("options.start < 0");
      if (i > e.compressedSize) throw new Error("options.start > entry.compressedSize");
    }
    if (t.end != null) {
      if (o = t.end, o < 0) throw new Error("options.end < 0");
      if (o > e.compressedSize) throw new Error("options.end > entry.compressedSize");
      if (o < i) throw new Error("options.end < options.start");
    }
  }
  if (!r.isOpen) return n(new Error("closed"));
  if (e.isEncrypted() && t.decrypt !== !1)
    return n(new Error("entry is encrypted, and options.decrypt !== false"));
  r.reader.ref();
  var s = ct(30);
  wn(r.reader, s, 0, s.length, e.relativeOffsetOfLocalHeader, function(a) {
    try {
      if (a) return n(a);
      var l = s.readUInt32LE(0);
      if (l !== 67324752)
        return n(new Error("invalid local file header signature: 0x" + l.toString(16)));
      var p = s.readUInt16LE(26), c = s.readUInt16LE(28), u = e.relativeOffsetOfLocalHeader + s.length + p + c, d;
      if (e.compressionMethod === 0)
        d = !1;
      else if (e.compressionMethod === 8)
        d = t.decompress != null ? t.decompress : !0;
      else
        return n(new Error("unsupported compression method: " + e.compressionMethod));
      var m = u, w = m + e.compressedSize;
      if (e.compressedSize !== 0 && w > r.fileSize)
        return n(new Error("file data overflows file bounds: " + m + " + " + e.compressedSize + " > " + r.fileSize));
      var y = r.reader.createReadStream({
        start: m + i,
        end: m + o
      }), v = y;
      if (d) {
        var b = !1, I = O_.createInflateRaw();
        y.on("error", function(M) {
          setImmediate(function() {
            b || I.emit("error", M);
          });
        }), y.pipe(I), r.validateEntrySizes ? (v = new Ir(e.uncompressedSize), I.on("error", function(M) {
          setImmediate(function() {
            b || v.emit("error", M);
          });
        }), I.pipe(v)) : v = I, v.destroy = function() {
          b = !0, I !== v && I.unpipe(v), y.unpipe(I), y.destroy();
        };
      }
      n(null, v);
    } finally {
      r.reader.unref();
    }
  });
};
function $r() {
}
$r.prototype.getLastModDate = function() {
  return Yf(this.lastModFileDate, this.lastModFileTime);
};
$r.prototype.isEncrypted = function() {
  return (this.generalPurposeBitFlag & 1) !== 0;
};
$r.prototype.isCompressed = function() {
  return this.compressionMethod === 8;
};
function Yf(e, t) {
  var n = e & 31, r = (e >> 5 & 15) - 1, i = (e >> 9 & 127) + 1980, o = 0, s = (t & 31) * 2, a = t >> 5 & 63, l = t >> 11 & 31;
  return new Date(i, r, n, l, a, s, o);
}
function Xf(e) {
  return e.indexOf("\\") !== -1 ? "invalid characters in fileName: " + e : /^[a-zA-Z]:/.test(e) || /^\//.test(e) ? "absolute path: " + e : e.split("/").indexOf("..") !== -1 ? "invalid relative path: " + e : null;
}
function wn(e, t, n, r, i, o) {
  if (r === 0)
    return setImmediate(function() {
      o(null, ct(0));
    });
  e.read(t, n, r, i, function(s, a) {
    if (s) return o(s);
    if (a < r)
      return o(new Error("unexpected EOF"));
    o();
  });
}
eo.inherits(Ir, zf);
function Ir(e) {
  zf.call(this), this.actualByteCount = 0, this.expectedByteCount = e;
}
Ir.prototype._transform = function(e, t, n) {
  if (this.actualByteCount += e.length, this.actualByteCount > this.expectedByteCount) {
    var r = "too many bytes in the stream. expected " + this.expectedByteCount + ". got at least " + this.actualByteCount;
    return n(new Error(r));
  }
  n(null, e);
};
Ir.prototype._flush = function(e) {
  if (this.actualByteCount < this.expectedByteCount) {
    var t = "not enough bytes in the stream. expected " + this.expectedByteCount + ". got only " + this.actualByteCount;
    return e(new Error(t));
  }
  e();
};
eo.inherits(kt, to);
function kt() {
  to.call(this), this.refCount = 0;
}
kt.prototype.ref = function() {
  this.refCount += 1;
};
kt.prototype.unref = function() {
  var e = this;
  if (e.refCount -= 1, e.refCount > 0) return;
  if (e.refCount < 0) throw new Error("invalid unref");
  e.close(t);
  function t(n) {
    if (n) return e.emit("error", n);
    e.emit("close");
  }
};
kt.prototype.createReadStream = function(e) {
  var t = e.start, n = e.end;
  if (t === n) {
    var r = new Ks();
    return setImmediate(function() {
      r.end();
    }), r;
  }
  var i = this._readStreamForRange(t, n), o = !1, s = new no(this);
  i.on("error", function(l) {
    setImmediate(function() {
      o || s.emit("error", l);
    });
  }), s.destroy = function() {
    i.unpipe(s), s.unref(), i.destroy();
  };
  var a = new Ir(n - t);
  return s.on("error", function(l) {
    setImmediate(function() {
      o || a.emit("error", l);
    });
  }), a.destroy = function() {
    o = !0, s.unpipe(a), s.destroy();
  }, i.pipe(s).pipe(a);
};
kt.prototype._readStreamForRange = function(e, t) {
  throw new Error("not implemented");
};
kt.prototype.read = function(e, t, n, r, i) {
  var o = this.createReadStream({ start: r, end: r + n }), s = new P_(), a = 0;
  s._write = function(l, p, c) {
    l.copy(e, t + a, 0, l.length), a += l.length, c();
  }, s.on("finish", i), o.on("error", function(l) {
    i(l);
  }), o.pipe(s);
};
kt.prototype.close = function(e) {
  setImmediate(e);
};
eo.inherits(no, Ks);
function no(e) {
  Ks.call(this), this.context = e, this.context.ref(), this.unreffedYet = !1;
}
no.prototype._flush = function(e) {
  this.unref(), e();
};
no.prototype.unref = function(e) {
  this.unreffedYet || (this.unreffedYet = !0, this.context.unref());
};
var L_ = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ";
function oi(e, t, n, r) {
  if (r)
    return e.toString("utf8", t, n);
  for (var i = "", o = t; o < n; o++)
    i += L_[e[o]];
  return i;
}
function vn(e, t) {
  var n = e.readUInt32LE(t), r = e.readUInt32LE(t + 4);
  return r * 4294967296 + n;
}
var ct;
typeof Buffer.allocUnsafe == "function" ? ct = function(e) {
  return Buffer.allocUnsafe(e);
} : ct = function(e) {
  return new Buffer(e);
};
function vi(e) {
  if (e) throw e;
}
const Qe = bc("extract-zip"), { createWriteStream: U_, promises: gn } = tt, k_ = b_, Wt = ue, { promisify: Zs } = Cn, M_ = nt, j_ = ft, B_ = Zs(j_.open), H_ = Zs(M_.pipeline);
class q_ {
  constructor(t, n) {
    this.zipPath = t, this.opts = n;
  }
  async extract() {
    return Qe("opening", this.zipPath, "with opts", this.opts), this.zipfile = await B_(this.zipPath, { lazyEntries: !0 }), this.canceled = !1, new Promise((t, n) => {
      this.zipfile.on("error", (r) => {
        this.canceled = !0, n(r);
      }), this.zipfile.readEntry(), this.zipfile.on("close", () => {
        this.canceled || (Qe("zip extraction complete"), t());
      }), this.zipfile.on("entry", async (r) => {
        if (this.canceled) {
          Qe("skipping entry", r.fileName, { cancelled: this.canceled });
          return;
        }
        if (Qe("zipfile entry", r.fileName), r.fileName.startsWith("__MACOSX/")) {
          this.zipfile.readEntry();
          return;
        }
        const i = Wt.dirname(Wt.join(this.opts.dir, r.fileName));
        try {
          await gn.mkdir(i, { recursive: !0 });
          const o = await gn.realpath(i);
          if (Wt.relative(this.opts.dir, o).split(Wt.sep).includes(".."))
            throw new Error(`Out of bound path "${o}" found while processing file ${r.fileName}`);
          await this.extractEntry(r), Qe("finished processing", r.fileName), this.zipfile.readEntry();
        } catch (o) {
          this.canceled = !0, this.zipfile.close(), n(o);
        }
      });
    });
  }
  async extractEntry(t) {
    if (this.canceled) {
      Qe("skipping entry extraction", t.fileName, { cancelled: this.canceled });
      return;
    }
    this.opts.onEntry && this.opts.onEntry(t, this.zipfile);
    const n = Wt.join(this.opts.dir, t.fileName), r = t.externalFileAttributes >> 16 & 65535, i = 61440, o = 16384, a = (r & i) === 40960;
    let l = (r & i) === o;
    !l && t.fileName.endsWith("/") && (l = !0);
    const p = t.versionMadeBy >> 8;
    l || (l = p === 0 && t.externalFileAttributes === 16), Qe("extracting entry", { filename: t.fileName, isDir: l, isSymlink: a });
    const c = this.getExtractedMode(r, l) & 511, u = l ? n : Wt.dirname(n), d = { recursive: !0 };
    if (l && (d.mode = c), Qe("mkdir", { dir: u, ...d }), await gn.mkdir(u, d), l) return;
    Qe("opening read stream", n);
    const m = await Zs(this.zipfile.openReadStream.bind(this.zipfile))(t);
    if (a) {
      const w = await k_(m);
      Qe("creating symlink", w, n), await gn.symlink(w, n);
    } else
      await H_(m, U_(n, { mode: c }));
  }
  getExtractedMode(t, n) {
    let r = t;
    return r === 0 && (n ? (this.opts.defaultDirMode && (r = parseInt(this.opts.defaultDirMode, 10)), r || (r = 493)) : (this.opts.defaultFileMode && (r = parseInt(this.opts.defaultFileMode, 10)), r || (r = 420))), r;
  }
}
var G_ = async function(e, t) {
  if (Qe("creating target directory", t.dir), !Wt.isAbsolute(t.dir))
    throw new Error("Target directory is expected to be absolute");
  return await gn.mkdir(t.dir, { recursive: !0 }), t.dir = await gn.realpath(t.dir), new q_(e, t).extract();
};
const Jf = /* @__PURE__ */ sh(G_);
function gc(e) {
  const n = e.replace(/[^0-9.].*$/, "").split(".").map((s) => parseInt(s, 10)), r = n[0], i = n[1] ?? 0, o = n[2] ?? 0;
  return r > 1 || i > 20 || i === 20 && o >= 5 ? 21 : i >= 17 ? 17 : 8;
}
const yc = {
  8: {
    win: "https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u422-b05/OpenJDK8U-jre_x64_windows_hotspot_8u422b05.zip",
    mac_x64: "https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u422-b05/OpenJDK8U-jre_x64_mac_hotspot_8u422b05.tar.gz",
    mac_aarch64: "https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u422-b05/OpenJDK8U-jre_aarch64_mac_hotspot_8u422b05.tar.gz",
    linux_x64: "https://github.com/adoptium/temurin8-binaries/releases/download/jdk8u422-b05/OpenJDK8U-jre_x64_linux_hotspot_8u422b05.tar.gz"
  },
  17: {
    win: "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.13%2B11/OpenJDK17U-jre_x64_windows_hotspot_17.0.13_11.zip",
    mac_x64: "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.13%2B11/OpenJDK17U-jre_x64_mac_hotspot_17.0.13_11.tar.gz",
    mac_aarch64: "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.13%2B11/OpenJDK17U-jre_aarch64_mac_hotspot_17.0.13_11.tar.gz",
    linux_x64: "https://github.com/adoptium/temurin17-binaries/releases/download/jdk-17.0.13%2B11/OpenJDK17U-jre_x64_linux_hotspot_17.0.13_11.tar.gz"
  },
  21: {
    win: "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.5%2B11/OpenJDK21U-jre_x64_windows_hotspot_21.0.5_11.zip",
    mac_x64: "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.5%2B11/OpenJDK21U-jre_x64_mac_hotspot_21.0.5_11.tar.gz",
    mac_aarch64: "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.5%2B11/OpenJDK21U-jre_aarch64_mac_hotspot_21.0.5_11.tar.gz",
    linux_x64: "https://github.com/adoptium/temurin21-binaries/releases/download/jdk-21.0.5%2B11/OpenJDK21U-jre_x64_linux_hotspot_21.0.5_11.tar.gz"
  }
};
function z_(e) {
  const t = yc[e] || yc[17];
  return process.platform === "win32" ? t.win : process.platform === "darwin" ? process.arch === "arm64" ? t.mac_aarch64 : t.mac_x64 : t.linux_x64;
}
const tr = /* @__PURE__ */ new Map();
function ro() {
  const e = xn.getPath("userData"), t = B.join(e, ".mine-launcher");
  return F.existsSync(t) || F.mkdirSync(t, { recursive: !0 }), t;
}
function _n(e) {
  const t = ih.createHash("md5");
  t.update(`OfflinePlayer:${e}`);
  const n = t.digest();
  n[6] = n[6] & 15 | 48, n[8] = n[8] & 63 | 128;
  const r = n.toString("hex");
  return `${r.slice(0, 8)}-${r.slice(8, 12)}-${r.slice(12, 16)}-${r.slice(16, 20)}-${r.slice(20, 32)}`;
}
function nr(e) {
  return new Promise((t, n) => {
    (e.startsWith("https") ? Si : Ai).get(e, (i) => {
      if (i.statusCode && i.statusCode >= 300 && i.statusCode < 400 && i.headers.location)
        return nr(i.headers.location).then(t).catch(n);
      if (i.statusCode !== 200)
        return n(new Error(`HTTP ${i.statusCode} loading ${e}`));
      let o = "";
      i.on("data", (s) => {
        o += s;
      }), i.on("end", () => {
        try {
          t(JSON.parse(o));
        } catch (s) {
          n(s);
        }
      });
    }).on("error", n);
  });
}
function mt(e, t) {
  return new Promise((n, r) => {
    const i = B.dirname(t);
    F.existsSync(i) || F.mkdirSync(i, { recursive: !0 });
    const o = F.createWriteStream(t);
    (e.startsWith("https") ? Si : Ai).get(e, (l) => {
      if (l.statusCode && l.statusCode >= 300 && l.statusCode < 400 && l.headers.location)
        return o.close(), mt(l.headers.location, t).then(n).catch(r);
      if (l.statusCode !== 200)
        return o.close(), F.unlink(t, () => {
        }), r(new Error(`Failed to download ${e}: HTTP ${l.statusCode}`));
      l.pipe(o), o.on("finish", () => {
        o.close(() => n());
      });
    }).on("error", (l) => {
      o.close(), F.unlink(t, () => {
      }), r(l);
    });
  });
}
async function Ho(e, t) {
  if (F.existsSync(e))
    try {
      const n = B.join(t, ".extract-" + Date.now());
      F.mkdirSync(n, { recursive: !0 }), await Jf(e, { dir: n });
      const r = process.platform === "win32" ? ".dll" : process.platform === "darwin" ? ".dylib" : ".so", i = (o) => {
        for (const s of F.readdirSync(o)) {
          const a = B.join(o, s);
          F.statSync(a).isDirectory() ? i(a) : s.toLowerCase().endsWith(r) && F.copyFileSync(a, B.join(t, s));
        }
      };
      i(n), F.rmSync(n, { recursive: !0, force: !0 });
    } catch {
    }
}
function W_(e) {
  if (!e || e.length === 0) return !0;
  let t = !1;
  for (const n of e)
    n.action === "allow" ? (!n.os || n.os.name === "windows") && (t = !0) : n.action === "disallow" && (!n.os || n.os.name === "windows") && (t = !1);
  return t;
}
async function cs() {
  const e = [], t = process.platform === "win32", n = t ? "javaw.exe" : "java", r = ro(), i = (o) => {
    if (!F.existsSync(o)) return null;
    const s = F.readdirSync(o);
    for (const a of s) {
      const l = B.join(o, a);
      if (a.toLowerCase() === (process.platform === "win32" ? "javaw.exe" : "java")) return l;
      if (F.statSync(l).isDirectory()) {
        const p = i(l);
        if (p) return p;
      }
    }
    return null;
  };
  for (const o of [17, 21, 8]) {
    const s = i(B.join(r, "java", `java-${o}`));
    s && e.push(s);
  }
  if (process.env.JAVA_HOME) {
    const o = B.join(process.env.JAVA_HOME, "bin", n);
    F.existsSync(o) && e.push(o);
  }
  if (t) {
    const o = [
      "C:\\Program Files\\Java",
      "C:\\Program Files (x86)\\Java",
      "C:\\Program Files\\Eclipse Adoptium",
      "C:\\Program Files\\Microsoft",
      "C:\\Program Files\\BellSoft",
      "C:\\Program Files\\Amazon Corretto",
      B.join(process.env.LOCALAPPDATA || "", "Programs", "AdoptOpenJDK"),
      "C:\\Program Files (x86)\\Minecraft Launcher\\runtime"
    ];
    for (const s of o)
      if (F.existsSync(s))
        try {
          const a = F.readdirSync(s);
          for (const l of a) {
            const p = B.join(s, l, "bin", n);
            F.existsSync(p) && !e.includes(p) && e.push(p);
          }
        } catch {
        }
  } else {
    const o = ["/usr/lib/jvm", "/usr/lib64/jvm", "/Library/Java/JavaVirtualMachines", "/opt/java"];
    for (const s of o)
      if (F.existsSync(s))
        try {
          for (const a of F.readdirSync(s))
            for (const l of [`${a}/bin/java`, `${a}/Contents/Home/bin/java`]) {
              const p = B.join(s, l);
              F.existsSync(p) && !e.includes(p) && e.push(p);
            }
        } catch {
        }
  }
  return e;
}
async function V_(e, t, n = 17) {
  const r = ro(), i = B.join(r, "java", `java-${n}`), o = (d) => {
    if (!F.existsSync(d)) return null;
    const m = F.readdirSync(d);
    for (const w of m) {
      const y = B.join(d, w);
      if (w.toLowerCase() === (process.platform === "win32" ? "javaw.exe" : "java")) return y;
      if (F.statSync(y).isDirectory()) {
        const v = o(y);
        if (v) return v;
      }
    }
    return null;
  }, s = o(i);
  if (s)
    return s;
  e({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: `Авто-скачивание OpenJDK Java ${n}...`,
    progress: 15
  }), t({ timestamp: Date.now(), type: "info", message: `Java не найдена на ПК. Автоматическое скачивание OpenJDK Java ${n} (Temurin)...` });
  const a = process.platform === "win32", l = z_(n), p = a ? "zip" : "tar.gz", c = B.join(r, "java", `java-${n}.${p}`);
  F.existsSync(B.dirname(c)) || F.mkdirSync(B.dirname(c), { recursive: !0 }), e({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: `Загрузка OpenJDK Java ${n}...`,
    progress: 35
  }), await mt(l, c), e({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: `Распаковка Java ${n} Runtime...`,
    progress: 75
  }), t({ timestamp: Date.now(), type: "info", message: `Распаковка архива Java ${n}...` }), F.existsSync(i) || F.mkdirSync(i, { recursive: !0 });
  try {
    a ? await Jf(c, { dir: i }) : qo(`tar -xzf "${c}" -C "${i}"`), F.unlinkSync(c);
  } catch (d) {
    throw t({ timestamp: Date.now(), type: "warn", message: `Ошибка распаковки: ${d.message}` }), d;
  }
  const u = o(i);
  if (!u)
    throw new Error(`Не удалось найти javaw.exe после распаковки Java ${n}. Установите Java вручную.`);
  return t({ timestamp: Date.now(), type: "info", message: `Java ${n} успешно установлена: ${u}` }), u;
}
async function Kf() {
  return await nr("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function Y_(e, t, n) {
  var d, m, w, y, v, b, I, M;
  const r = ro(), i = B.join(r, "instances", e.instanceId), o = B.join(r, "assets"), s = B.join(r, "libraries"), a = B.join(r, "versions"), l = B.join(i, "natives");
  F.existsSync(i) || F.mkdirSync(i, { recursive: !0 }), F.existsSync(l) || F.mkdirSync(l, { recursive: !0 });
  const p = B.join(i, "options.txt");
  F.writeFileSync(p, `version:2586
chatVisibility:0
forceUnicodeFont:false
realmsNotifications:false
hideServerAddress:false
`, "utf-8");
  const u = B.join(i, ".fabric");
  if (F.existsSync(u))
    try {
      const k = (U) => {
        const A = F.readdirSync(U);
        for (const D of A) {
          const R = B.join(U, D);
          F.statSync(R).isDirectory() ? k(R) : D.endsWith(".tmp") && F.unlinkSync(R);
        }
      };
      k(u);
    } catch {
    }
  try {
    let k = e.javaPath, U = !1;
    if (k && F.existsSync(k))
      try {
        qo(`"${k}" -version 2>&1`), U = !0;
      } catch {
      }
    if (!U) {
      const S = await cs(), O = `java-${gc(e.version)}`;
      S.sort((L, W) => (W.includes(O) ? 1 : 0) - (L.includes(O) ? 1 : 0));
      for (const L of S)
        if (F.existsSync(L))
          try {
            qo(`"${L}" -version 2>&1`), k = L, U = !0;
            break;
          } catch {
          }
    }
    U || (k = await V_(t, n, gc(e.version))), n({
      timestamp: Date.now(),
      type: "info",
      message: `Используемый файл Java: ${k}`
    }), t({
      instanceId: e.instanceId,
      stage: "checking",
      statusText: "Получение манифеста версий...",
      progress: 10
    });
    const D = (await Kf()).versions.find((S) => S.id === e.version);
    if (!D)
      throw new Error(`Версия Minecraft ${e.version} не найдена в манифесте Mojang`);
    t({
      instanceId: e.instanceId,
      stage: "downloading",
      statusText: `Загрузка структуры версии ${e.version}...`,
      progress: 20
    });
    const R = B.join(a, e.version, `${e.version}.json`), $ = await nr(D.url);
    if (F.existsSync(B.dirname(R)) || F.mkdirSync(B.dirname(R), { recursive: !0 }), F.writeFileSync(R, JSON.stringify($, null, 2)), (d = $.assetIndex) != null && d.url) {
      const S = B.join(o, "indexes"), O = B.join(S, `${$.assetIndex.id}.json`);
      F.existsSync(O) || (t({
        instanceId: e.instanceId,
        stage: "downloading",
        statusText: "Загрузка манифеста ресурсов...",
        progress: 25
      }), await mt($.assetIndex.url, O));
      try {
        const W = JSON.parse(F.readFileSync(O, "utf-8")).objects || {}, N = Object.keys(W), q = B.join(o, "objects"), Y = [];
        for (const j of N) {
          const ne = W[j].hash, te = ne.slice(0, 2), Re = B.join(q, te, ne);
          F.existsSync(Re) || Y.push({
            hash: ne,
            url: `https://resources.download.minecraft.net/${te}/${ne}`,
            dest: Re
          });
        }
        if (Y.length > 0) {
          t({
            instanceId: e.instanceId,
            stage: "downloading",
            statusText: `Загрузка ресурсов (${Y.length} файлов)...`,
            progress: 30
          });
          const j = 75;
          let X = 0;
          for (let ne = 0; ne < Y.length; ne += j) {
            const te = Y.slice(ne, ne + j);
            await Promise.all(
              te.map((vt) => mt(vt.url, vt.dest).catch(() => {
              }))
            ), X += te.length;
            const Re = Math.round(30 + X / Y.length * 15);
            t({
              instanceId: e.instanceId,
              stage: "downloading",
              statusText: `Загрузка ресурсов (${X}/${Y.length})...`,
              progress: Re
            });
          }
        }
      } catch (L) {
        n({ timestamp: Date.now(), type: "warn", message: `Ошибка ресурсов: ${L.message}` });
      }
    }
    const E = B.join(a, e.version, `${e.version}.jar`);
    !F.existsSync(E) && ((w = (m = $.downloads) == null ? void 0 : m.client) != null && w.url) && (t({
      instanceId: e.instanceId,
      stage: "downloading",
      statusText: "Загрузка Minecraft client.jar...",
      progress: 50
    }), await mt($.downloads.client.url, E)), t({
      instanceId: e.instanceId,
      stage: "downloading",
      statusText: "Загрузка и распаковка библиотек...",
      progress: 60
    });
    const z = [], Q = $.libraries || [];
    for (const S of Q)
      if (W_(S.rules)) {
        if ((y = S.downloads) != null && y.artifact) {
          const O = S.downloads.artifact.path, L = B.join(s, O);
          if (!F.existsSync(L))
            try {
              await mt(S.downloads.artifact.url, L);
            } catch {
            }
          F.existsSync(L) && (z.push(L), (O.includes("natives") || S.name.includes("natives")) && await Ho(L, l));
        }
        if ((v = S.downloads) != null && v.classifiers) {
          const O = S.downloads.classifiers, L = O["natives-windows"] || O["natives-windows-64"] || O["natives-windows-x86"];
          if (L) {
            const W = L.path, N = B.join(s, W);
            if (!F.existsSync(N))
              try {
                await mt(L.url, N);
              } catch {
              }
            F.existsSync(N) && await Ho(N, l);
          }
        }
        if (!((b = S.downloads) != null && b.artifact) && S.name) {
          const O = S.name.split(":"), L = O[0].replace(/\./g, "/"), W = O[1], N = O[2], q = `${L}/${W}/${N}/${W}-${N}.jar`, Y = B.join(s, q), j = S.url ? `${S.url}${q}` : `https://libraries.minecraft.net/${q}`;
          if (!F.existsSync(Y))
            try {
              await mt(j, Y);
            } catch {
            }
          F.existsSync(Y) && (z.push(Y), S.name.includes("natives") && await Ho(Y, l));
        }
      }
    z.push(E);
    let ee = $.mainClass || "net.minecraft.client.main.Main";
    if (e.loader === "fabric") {
      t({
        instanceId: e.instanceId,
        stage: "downloading",
        statusText: "Настройка Fabric...",
        progress: 75
      });
      try {
        const S = await nr(`https://meta.fabricmc.net/v2/versions/loader/${e.version}`);
        if (S && S.length > 0) {
          const O = S[0].loader.version, L = await nr(`https://meta.fabricmc.net/v2/versions/loader/${e.version}/${O}/profile/json`);
          if (L.mainClass && (ee = L.mainClass), L.libraries)
            for (const W of L.libraries) {
              const N = W.name.split(":"), q = N[0].replace(/\./g, "/"), Y = N[1], j = N[2], X = `${q}/${Y}/${j}/${Y}-${j}.jar`, ne = B.join(s, X), te = W.url ? `${W.url}${X}` : `https://maven.fabricmc.net/${X}`;
              if (!F.existsSync(ne))
                try {
                  await mt(te, ne);
                } catch {
                }
              F.existsSync(ne) && z.unshift(ne);
            }
        }
      } catch (S) {
        n({ timestamp: Date.now(), type: "warn", message: `Fabric метаданные: ${S.message}` });
      }
    }
    t({
      instanceId: e.instanceId,
      stage: "launching",
      statusText: "Запуск Minecraft...",
      progress: 90
    });
    const K = z.join(B.delimiter), H = [];
    H.push(`-Xms${e.memoryMin || 1024}M`), H.push(`-Xmx${e.memoryMax || 4096}M`), H.push(`-Djava.library.path=${l}`), H.push("-Dminecraft.api.auth.host=http://127.0.0.1"), H.push("-Dminecraft.api.account.host=http://127.0.0.1"), H.push("-Dminecraft.api.session.host=http://127.0.0.1"), H.push("-Dminecraft.api.services.host=http://127.0.0.1"), H.push("-XX:+UseG1GC", "-XX:+UnlockExperimentalVMOptions", "-XX:G1NewSizePercent=20", "-XX:G1ReservePercent=20", "-XX:MaxGCPauseMillis=50", "-XX:G1HeapRegionSize=32M"), e.customJvmArgs && H.push(...e.customJvmArgs.split(" ").filter(Boolean)), H.push("-cp", K), H.push(ee);
    const J = (e.uuid || _n(e.username || "Player")).replace(/-/g, "");
    if ($.minecraftArguments && typeof $.minecraftArguments == "string") {
      const S = $.minecraftArguments.split(" ");
      for (const O of S) {
        let L = O.replace("${auth_player_name}", e.username || "Player").replace("${version_name}", e.version).replace("${game_directory}", i).replace("${assets_root}", o).replace("${assets_index_name}", ((I = $.assetIndex) == null ? void 0 : I.id) || e.version).replace("${auth_uuid}", J).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", "release");
        H.push(L);
      }
    } else
      H.push("--username", e.username || "Player"), H.push("--version", e.version), H.push("--gameDir", i), H.push("--assetsDir", o), H.push("--assetIndex", ((M = $.assetIndex) == null ? void 0 : M.id) || e.version), H.push("--uuid", J), H.push("--accessToken", "0"), H.push("--userType", "mojang"), H.push("--versionType", "release");
    H.includes("--fullscreen") || H.push("--fullscreen"), e.customGameArgs && H.push(...e.customGameArgs.split(" ").filter(Boolean)), n({
      timestamp: Date.now(),
      type: "info",
      message: `Команда запуска: "${k}" ${H.join(" ")}`
    });
    const C = oh(k || "javaw", H, {
      cwd: i,
      detached: !0
    });
    tr.set(e.instanceId, C), C.stdout.on("data", (S) => {
      n({ timestamp: Date.now(), type: "info", message: S.toString() });
    }), C.stderr.on("data", (S) => {
      n({ timestamp: Date.now(), type: "warn", message: S.toString() });
    }), C.on("error", (S) => {
      tr.delete(e.instanceId), t({
        instanceId: e.instanceId,
        stage: "error",
        statusText: `Ошибка процесса: ${S.message}`,
        progress: 0,
        error: S.message
      }), n({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${S.message}` });
    }), C.on("exit", (S) => {
      tr.delete(e.instanceId), t({
        instanceId: e.instanceId,
        stage: "idle",
        statusText: `Игра завершена (код ${S})`,
        progress: 0
      }), n({ timestamp: Date.now(), type: "info", message: `Minecraft завершился с кодом ${S}` });
    }), t({
      instanceId: e.instanceId,
      stage: "running",
      statusText: "Игра запущена!",
      progress: 100
    });
  } catch (k) {
    t({
      instanceId: e.instanceId,
      stage: "error",
      statusText: `Ошибка: ${k.message}`,
      progress: 0,
      error: k.message
    }), n({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${k.message}` });
  }
}
function X_(e) {
  const t = tr.get(e);
  return t ? (t.kill(), tr.delete(e), !0) : !1;
}
Zd.setApplicationMenu(null);
const Qf = B.dirname(rh(import.meta.url));
process.env.APP_ROOT = B.join(Qf, "..");
const us = process.env.VITE_DEV_SERVER_URL, Tx = B.join(process.env.APP_ROOT, "dist-electron"), Zf = B.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = us ? B.join(process.env.APP_ROOT, "public") : Zf;
let oe = null;
const He = ro(), si = B.join(He, "accounts.json"), ai = B.join(He, "instances.json"), fs = B.join(He, "settings.json"), ke = B.join(He, "skins");
F.existsSync(ke) || F.mkdirSync(ke, { recursive: !0 });
function ea(e, t) {
  try {
    if (F.existsSync(e))
      return JSON.parse(F.readFileSync(e, "utf-8"));
  } catch (n) {
    console.error(`Failed loading ${e}:`, n);
  }
  return t;
}
function Tt(e, t) {
  try {
    F.writeFileSync(e, JSON.stringify(t, null, 2), "utf-8");
  } catch (n) {
    console.error(`Failed saving ${e}:`, n);
  }
}
let me = ea(si, [
  { id: "1", username: "Test", uuid: _n("Test"), type: "offline", isActive: !0, createdAt: Date.now() - 5e4 },
  { id: "2", username: "Nick 2", uuid: _n("Nick 2"), type: "offline", isActive: !1, createdAt: Date.now() - 4e4 },
  { id: "3", username: "Nick 3", uuid: _n("Nick 3"), type: "offline", isActive: !1, createdAt: Date.now() - 3e4 }
]), Ke = ea(ai, [
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
]), le = ea(fs, {
  javaPath: "",
  memoryMin: 1024,
  memoryMax: 4096,
  customJvmArgs: "",
  closeLauncherOnGameStart: !1,
  gameDir: He,
  useProxy: !1,
  proxyType: "http",
  proxyHost: "",
  proxyPort: 8080,
  launcherFont: "system-ui"
});
function ed() {
  oe = new Ec({
    width: 1050,
    height: 720,
    minWidth: 900,
    minHeight: 650,
    frame: !1,
    titleBarStyle: "hidden",
    icon: B.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: B.join(Qf, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0
    }
  }), oe.webContents.on("did-finish-load", () => {
    oe == null || oe.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), us ? oe.loadURL(us) : oe.loadFile(B.join(Zf, "index.html"));
}
xn.on("window-all-closed", () => {
  process.platform !== "darwin" && (xn.quit(), oe = null);
});
xn.on("activate", () => {
  Ec.getAllWindows().length === 0 && ed();
});
function ds(e, t) {
  return new Promise((n, r) => {
    const i = B.dirname(t);
    F.existsSync(i) || F.mkdirSync(i, { recursive: !0 });
    const o = F.createWriteStream(t);
    (e.startsWith("https") ? Si : Ai).get(e, (l) => {
      if (l.statusCode && l.statusCode >= 300 && l.statusCode < 400 && l.headers.location)
        return o.close(), ds(l.headers.location, t).then(n).catch(r);
      if (l.statusCode !== 200)
        return o.close(), F.unlink(t, () => {
        }), r(new Error(`Failed download ${e}: HTTP ${l.statusCode}`));
      l.pipe(o), o.on("finish", () => {
        o.close(() => n());
      });
    }).on("error", (l) => {
      o.close(), F.unlink(t, () => {
      }), r(l);
    });
  });
}
function hs(e) {
  return new Promise((t, n) => {
    (e.startsWith("https") ? Si : Ai).get(e, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8"
      }
    }, (i) => {
      if (i.statusCode && i.statusCode >= 300 && i.statusCode < 400 && i.headers.location)
        return hs(i.headers.location).then(t).catch(n);
      if (i.statusCode !== 200)
        return n(new Error(`HTTP ${i.statusCode}`));
      const o = [];
      i.on("data", (s) => o.push(s)), i.on("end", () => t(Buffer.concat(o))), i.on("error", n);
    }).on("error", n);
  });
}
function J_() {
  se.handle("minimize-window", () => {
    oe == null || oe.minimize();
  }), se.handle("maximize-window", () => oe ? oe.isMaximized() ? (oe.unmaximize(), !1) : (oe.maximize(), !0) : !1), se.handle("close-window", () => {
    oe == null || oe.close();
  }), se.handle("is-maximized", () => (oe == null ? void 0 : oe.isMaximized()) || !1), se.handle("get-accounts", () => me), se.handle("add-account", (e, t) => {
    const n = t.trim();
    if (!n) throw new Error("Имя пользователя не может быть пустым");
    if (me.some((o) => o.username.toLowerCase() === n.toLowerCase()))
      throw new Error(`Никнейм "${n}" уже существует!`);
    const i = {
      id: Date.now().toString(),
      username: n,
      uuid: _n(n),
      type: "offline",
      isActive: me.length === 0,
      createdAt: Date.now()
    };
    return me.push(i), Tt(si, me), me;
  }), se.handle("set-active-account", (e, t) => (me = me.map((n) => ({
    ...n,
    isActive: n.id === t
  })), Tt(si, me), me)), se.handle("delete-account", (e, t) => (me = me.filter((n) => n.id !== t), me.length > 0 && !me.some((n) => n.isActive) && (me[0].isActive = !0), Tt(si, me), me)), se.handle("get-instances", () => Ke), se.handle("create-instance", (e, t) => {
    const n = {
      id: "inst-" + Date.now(),
      name: t.version,
      version: t.version,
      loader: t.loader || "vanilla",
      created: Date.now(),
      memoryMin: le.memoryMin,
      memoryMax: le.memoryMax
    };
    Ke.push(n), Tt(ai, Ke);
    const r = B.join(He, "instances", n.id), i = B.join(r, "mods");
    return F.existsSync(i) || F.mkdirSync(i, { recursive: !0 }), Ke;
  }), se.handle("delete-instance", (e, t) => {
    Ke = Ke.filter((r) => r.id !== t), Tt(ai, Ke);
    const n = B.join(He, "instances", t);
    return F.existsSync(n) && F.rmSync(n, { recursive: !0, force: !0 }), Ke;
  }), se.handle("get-versions", async () => {
    try {
      return await Kf();
    } catch (e) {
      return console.error("Failed to get versions:", e), { latest: { release: "1.20.4", snapshot: "1.20.4" }, versions: [] };
    }
  }), se.handle("get-settings", () => le), se.handle("save-settings", (e, t) => (le = { ...le, ...t }, Tt(fs, le), le)), se.handle("detect-java", async () => await cs()), se.handle("launch-instance", async (e, t) => {
    const n = Ke.find((a) => a.id === t);
    if (!n) throw new Error("Инстанс не найден");
    const r = me.find((a) => a.isActive) || me[0];
    if (!r) throw new Error("Добавьте хотя бы один аккаунт!");
    n.lastPlayed = Date.now(), Tt(ai, Ke);
    const i = n.javaPath || le.javaPath || (await cs())[0];
    let o = n.jvmArgs || le.customJvmArgs || "";
    le.useProxy && le.proxyHost && le.proxyPort && (le.proxyType === "socks5" ? o += ` -DsocksProxyHost=${le.proxyHost} -DsocksProxyPort=${le.proxyPort}` : o += ` -Dhttp.proxyHost=${le.proxyHost} -Dhttp.proxyPort=${le.proxyPort} -Dhttps.proxyHost=${le.proxyHost} -Dhttps.proxyPort=${le.proxyPort}`);
    let s = `--fullscreen ${(le.customGameArgs || "").trim()}`.trim();
    return Y_(
      {
        instanceId: n.id,
        instanceName: n.name,
        version: n.version,
        loader: n.loader || "vanilla",
        username: r.username,
        uuid: r.uuid,
        memoryMin: n.memoryMin || le.memoryMin || 1024,
        memoryMax: n.memoryMax || le.memoryMax || 4096,
        javaPath: i,
        customJvmArgs: o.trim(),
        customGameArgs: s
      },
      (a) => {
        oe == null || oe.webContents.send("launch-progress", a);
      },
      (a) => {
        oe == null || oe.webContents.send("game-log", a);
      }
    ), !0;
  }), se.handle("stop-instance", (e, t) => X_(t)), se.handle("open-instance-folder", (e, t) => {
    const n = B.join(He, "instances", t);
    F.existsSync(n) || F.mkdirSync(n, { recursive: !0 }), eh.openPath(n);
  }), se.handle("get-instance-mods", (e, t) => {
    const n = B.join(He, "instances", t, "mods");
    if (!F.existsSync(n)) return [];
    try {
      return F.readdirSync(n).map((i) => {
        const o = B.join(n, i), s = F.statSync(o), a = i.endsWith(".jar"), l = i.replace(/\.jar(\.disabled)?$/, "");
        let p = "";
        const c = l.toLowerCase();
        return c.includes("iris") ? p = "https://cdn.modrinth.com/data/YL57xq9U/a14589d8164bdf6933bbec92c3008061dfcceecb.png" : c.includes("sodium") ? p = "https://cdn.modrinth.com/data/AANobbFp/d3f0a5015e1a1415df22fa2ff07b46ff4be9cfd8.png" : c.includes("optifine") ? p = "https://optifine.net/favicon.ico" : c.includes("fabric") ? p = "https://cdn.modrinth.com/data/P7Rstage/icon.png" : c.includes("lithium") ? p = "https://cdn.modrinth.com/data/gv2qrgfy/icon.png" : c.includes("indium") ? p = "https://cdn.modrinth.com/data/OradFiWy/icon.png" : c.includes("ferrite") && (p = "https://cdn.modrinth.com/data/u6uhacGG/icon.png"), {
          id: i,
          filename: i,
          name: l,
          enabled: a,
          size: s.size,
          iconUrl: p
        };
      });
    } catch {
      return [];
    }
  }), se.handle("toggle-mod", (e, { instanceId: t, modFilename: n }) => {
    const r = B.join(He, "instances", t, "mods"), i = B.join(r, n);
    if (!F.existsSync(i)) return !1;
    let o = n;
    n.endsWith(".jar") ? o = n + ".disabled" : n.endsWith(".jar.disabled") && (o = n.replace(/\.disabled$/, ""));
    const s = B.join(r, o);
    return F.renameSync(i, s), !0;
  }), se.handle("download-mod-file", async (e, { instanceId: t, downloadUrl: n, filename: r }) => {
    const i = B.join(He, "instances", t, "mods");
    F.existsSync(i) || F.mkdirSync(i, { recursive: !0 });
    const o = B.join(i, r);
    return await ds(n, o), !0;
  }), se.handle("add-mod-file", async (e, t) => {
    if (!oe) return !1;
    const n = await fo.showOpenDialog(oe, {
      title: "Выберите файл мода (.jar)",
      filters: [{ name: "Minecraft Mods", extensions: ["jar"] }],
      properties: ["openFile", "multiSelections"]
    });
    if (n.canceled || !n.filePaths.length) return !1;
    const r = B.join(He, "instances", t, "mods");
    F.existsSync(r) || F.mkdirSync(r, { recursive: !0 });
    for (const i of n.filePaths) {
      const o = B.join(r, B.basename(i));
      F.copyFileSync(i, o);
    }
    return !0;
  }), se.handle("save-user-skin", async (e, t) => {
    if (!oe) return !1;
    const n = await fo.showOpenDialog(oe, {
      title: "Выберите файл скина Minecraft (.png)",
      filters: [{ name: "Minecraft Skins", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (n.canceled || !n.filePaths.length) return !1;
    const r = B.join(ke, `${t}.png`);
    return F.copyFileSync(n.filePaths[0], r), r;
  }), se.handle("fetch-online-skin", async (e, { username: t, targetUsername: n }) => {
    const r = B.join(ke, `${t}.png`), i = [
      `https://ely.by/services/skins-buffer/skins/${encodeURIComponent(n)}.png`,
      `https://minotar.net/skin/${encodeURIComponent(n)}`,
      `https://crafatar.com/skins/${_n(n)}`
    ];
    for (const o of i)
      try {
        if (await ds(o, r), F.existsSync(r) && F.statSync(r).size > 100)
          return `data:image/png;base64,${F.readFileSync(r).toString("base64")}`;
      } catch {
      }
    throw new Error(`Скин для никнейма "${n}" не найден на серверах`);
  }), se.handle("get-profile-stats", (e, t) => {
    let n = 0;
    const r = [];
    let i = "Нет информации", o = "Нет информации", s = 0, a = 0;
    try {
      for (const u of Ke) {
        u.lastPlayed && (a = Math.max(a, u.lastPlayed), s += 45);
        const d = B.join(He, "instances", u.id, "saves");
        if (F.existsSync(d)) {
          const m = F.readdirSync(d);
          for (const w of m)
            F.statSync(B.join(d, w)).isDirectory() && (n++, r.push(w));
        }
      }
      r.length > 0 && (i = r[0]);
    } catch {
    }
    const l = me.find((u) => u.username === t) || me.find((u) => u.isActive) || me[0], p = (s / 60).toFixed(1), c = a ? new Date(a).toLocaleString() : "Нет информации";
    return {
      username: l ? l.username : t,
      uuid: l ? l.uuid : "",
      worldsCount: n,
      totalPlayTimeHours: s > 0 ? `${p} ч.` : "Нет информации",
      lastPlayedFormatted: c,
      favoriteWorld: i,
      favoriteServer: o
    };
  }), se.handle("get-user-skin", (e, t) => {
    const n = B.join(ke, `${t}.png`);
    return F.existsSync(n) ? `data:image/png;base64,${F.readFileSync(n).toString("base64")}` : null;
  }), se.handle("set-selected-instance-id", (e, t) => (le = { ...le, selectedInstanceId: t }, Tt(fs, le), le)), se.handle("save-user-skin-base64", (e, { username: t, base64Data: n }) => {
    try {
      F.existsSync(ke) || F.mkdirSync(ke, { recursive: !0 });
      const r = n.replace(/^data:image\/png;base64,/, ""), i = Buffer.from(r, "base64"), o = B.join(ke, `${t}.png`);
      return F.writeFileSync(o, i), !0;
    } catch (r) {
      return console.error("Failed saving user skin base64:", r), !1;
    }
  }), se.handle("upload-user-skin", async (e, t) => {
    const { canceled: n, filePaths: r } = await fo.showOpenDialog({
      title: "Выберите скин Minecraft (.png)",
      properties: ["openFile"],
      filters: [{ name: "Minecraft Skin (*.png)", extensions: ["png"] }]
    });
    if (!n && r.length > 0) {
      F.existsSync(ke) || F.mkdirSync(ke, { recursive: !0 });
      const i = B.join(ke, `${t}.png`);
      return F.copyFileSync(r[0], i), `data:image/png;base64,${F.readFileSync(i).toString("base64")}`;
    }
    return null;
  }), se.handle("parse-command-skin", async (e, t) => {
    var p, c;
    const { username: n, command: r } = t, i = (r || "").trim();
    let o = "";
    const s = i.match(/(https?:\/\/textures\.minecraft\.net\/texture\/[a-f0-9]+)/i);
    if (s && (o = s[1]), !o) {
      const u = i.match(/[A-Za-z0-9+/=]{16,}/g) || [];
      for (const d of u)
        try {
          const m = Buffer.from(d, "base64").toString("utf-8"), w = m.match(/(https?:\/\/textures\.minecraft\.net\/texture\/[a-f0-9]+)/i);
          if (w) {
            o = w[1];
            break;
          }
          const y = JSON.parse(m);
          if ((c = (p = y == null ? void 0 : y.textures) == null ? void 0 : p.SKIN) != null && c.url) {
            o = y.textures.SKIN.url;
            break;
          }
        } catch {
        }
    }
    if (!o) {
      const u = i.match(/namemc\.com\/skin\/([a-f0-9]+)/i);
      if (u && u[1])
        try {
          const m = (await hs(`https://namemc.com/skin/${u[1]}`)).toString("utf-8").match(/(https?:\/\/textures\.minecraft\.net\/texture\/[a-f0-9]+)/i);
          m && (o = m[1]);
        } catch {
        }
    }
    if (!o && i.length < 32 && !i.includes("/") && (o = `https://minotar.net/skin/${encodeURIComponent(i)}`), !o)
      throw new Error("Не удалось найти скин в введенной команде. Убедитесь, что передан валидный /give, Base64 или ссылка.");
    o.startsWith("http://") && (o = o.replace("http://", "https://"));
    const a = await hs(o);
    F.existsSync(ke) || F.mkdirSync(ke, { recursive: !0 });
    const l = B.join(ke, `${n}.png`);
    return F.writeFileSync(l, a), `data:image/png;base64,${a.toString("base64")}`;
  });
}
xn.whenReady().then(() => {
  J_(), ed(), xn.isPackaged && (pc.autoUpdater.autoDownload = !0, pc.autoUpdater.checkForUpdatesAndNotify().catch((e) => {
    console.error("Auto-update check failed:", e);
  }));
});
export {
  Tx as MAIN_DIST,
  Zf as RENDERER_DIST,
  us as VITE_DEV_SERVER_URL
};
