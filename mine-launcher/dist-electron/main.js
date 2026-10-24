import ln, { app as _t, Menu as Ac, BrowserWindow as Cc, ipcMain as re, dialog as go, shell as Ta, nativeImage as Aa, Tray as fh } from "electron";
import Ci from "events";
import vr from "crypto";
import $c from "tty";
import Fn from "util";
import $i from "os";
import rt from "fs";
import it from "stream";
import Ln from "url";
import dh from "constants";
import Ic from "assert";
import ce from "path";
import Ii from "child_process";
import ms from "zlib";
import hh from "http";
import { fileURLToPath as ph } from "node:url";
import H from "node:path";
import F from "node:fs";
import mh from "node:os";
import gs from "node:https";
import ys from "node:http";
import gh from "node:crypto";
import { execSync as Vo, spawn as yh } from "node:child_process";
import Oc from "buffer";
var Ye = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Eh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var yo = {}, xe = {}, kt = {};
Object.defineProperty(kt, "__esModule", { value: !0 });
kt.CancellationError = kt.CancellationToken = void 0;
const wh = Ci;
class vh extends wh.EventEmitter {
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
      return Promise.reject(new Yo());
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
          o(new Yo());
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
kt.CancellationToken = vh;
class Yo extends Error {
  constructor() {
    super("cancelled");
  }
}
kt.CancellationError = Yo;
var Le = {}, Xo = { exports: {} }, zr = { exports: {} }, Eo, Ca;
function _h() {
  if (Ca) return Eo;
  Ca = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, i = r * 7, o = r * 365.25;
  Eo = function(c, u) {
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
    var v = u >= d * 1.5;
    return Math.round(c / d) + " " + m + (v ? "s" : "");
  }
  return Eo;
}
var wo, $a;
function Dc() {
  if ($a) return wo;
  $a = 1;
  function e(t) {
    r.debug = r, r.default = r, r.coerce = p, r.disable = a, r.enable = o, r.enabled = l, r.humanize = _h(), r.destroy = c, Object.keys(t).forEach((u) => {
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
      let d, m = null, v, y;
      function w(...b) {
        if (!w.enabled)
          return;
        const $ = w, B = Number(/* @__PURE__ */ new Date()), z = B - (d || B);
        $.diff = z, $.prev = d, $.curr = B, d = B, b[0] = r.coerce(b[0]), typeof b[0] != "string" && b.unshift("%O");
        let U = 0;
        b[0] = b[0].replace(/%([a-zA-Z%])/g, (R, N) => {
          if (R === "%%")
            return "%";
          U++;
          const D = r.formatters[N];
          if (typeof D == "function") {
            const E = b[U];
            R = D.call($, E), b.splice(U, 1), U--;
          }
          return R;
        }), r.formatArgs.call($, b), ($.log || r.log).apply($, b);
      }
      return w.namespace = u, w.useColors = r.useColors(), w.color = r.selectColor(u), w.extend = i, w.destroy = r.destroy, Object.defineProperty(w, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => m !== null ? m : (v !== r.namespaces && (v = r.namespaces, y = r.enabled(u)), y),
        set: (b) => {
          m = b;
        }
      }), typeof r.init == "function" && r.init(w), w;
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
      let m = 0, v = 0, y = -1, w = 0;
      for (; m < u.length; )
        if (v < d.length && (d[v] === u[m] || d[v] === "*"))
          d[v] === "*" ? (y = v, w = m, v++) : (m++, v++);
        else if (y !== -1)
          v = y + 1, w++, m = w;
        else
          return !1;
      for (; v < d.length && d[v] === "*"; )
        v++;
      return v === d.length;
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
  return wo = e, wo;
}
var Ia;
function xh() {
  return Ia || (Ia = 1, function(e, t) {
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
    e.exports = Dc()(t);
    const { formatters: a } = e.exports;
    a.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (p) {
        return "[UnexpectedJSONParseError]: " + p.message;
      }
    };
  }(zr, zr.exports)), zr.exports;
}
var Wr = { exports: {} }, vo, Oa;
function bh() {
  return Oa || (Oa = 1, vo = (e, t = process.argv) => {
    const n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", r = t.indexOf(n + e), i = t.indexOf("--");
    return r !== -1 && (i === -1 || r < i);
  }), vo;
}
var _o, Da;
function Sh() {
  if (Da) return _o;
  Da = 1;
  const e = $i, t = $c, n = bh(), { env: r } = process;
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
  return _o = {
    supportsColor: a,
    stdout: o(s(!0, t.isatty(1))),
    stderr: o(s(!0, t.isatty(2)))
  }, _o;
}
var Ra;
function Th() {
  return Ra || (Ra = 1, function(e, t) {
    const n = $c, r = Fn;
    t.init = c, t.log = a, t.formatArgs = o, t.save = l, t.load = p, t.useColors = i, t.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const d = Sh();
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
      const v = m.substring(6).toLowerCase().replace(/_([a-z])/g, (w, b) => b.toUpperCase());
      let y = process.env[m];
      return /^(yes|on|true|enabled)$/i.test(y) ? y = !0 : /^(no|off|false|disabled)$/i.test(y) ? y = !1 : y === "null" ? y = null : y = Number(y), d[v] = y, d;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function o(d) {
      const { namespace: m, useColors: v } = this;
      if (v) {
        const y = this.color, w = "\x1B[3" + (y < 8 ? y : "8;5;" + y), b = `  ${w};1m${m} \x1B[0m`;
        d[0] = b + d[0].split(`
`).join(`
` + b), d.push(w + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
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
      for (let v = 0; v < m.length; v++)
        d.inspectOpts[m[v]] = t.inspectOpts[m[v]];
    }
    e.exports = Dc()(t);
    const { formatters: u } = e.exports;
    u.o = function(d) {
      return this.inspectOpts.colors = this.useColors, r.inspect(d, this.inspectOpts).split(`
`).map((m) => m.trim()).join(" ");
    }, u.O = function(d) {
      return this.inspectOpts.colors = this.useColors, r.inspect(d, this.inspectOpts);
    };
  }(Wr, Wr.exports)), Wr.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? Xo.exports = xh() : Xo.exports = Th();
var Rc = Xo.exports, Un = {};
Object.defineProperty(Un, "__esModule", { value: !0 });
Un.newError = Ah;
function Ah(e, t) {
  const n = new Error(e);
  return n.code = t, n;
}
var _r = {};
Object.defineProperty(_r, "__esModule", { value: !0 });
_r.ProgressCallbackTransform = void 0;
const Ch = it;
class $h extends Ch.Transform {
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
_r.ProgressCallbackTransform = $h;
Object.defineProperty(Le, "__esModule", { value: !0 });
Le.DigestTransform = Le.HttpExecutor = Le.HttpError = void 0;
Le.createHttpError = Jo;
Le.parseJson = Lh;
Le.configureRequestOptionsFromUrl = Nc;
Le.configureRequestUrl = ws;
Le.safeGetHeader = Cn;
Le.configureRequestOptions = mi;
Le.safeStringifyJson = gi;
const Ih = vr, Oh = Rc, Dh = rt, Rh = it, Pc = Ln, Ph = kt, Pa = Un, Nh = _r, Wn = (0, Oh.default)("electron-builder");
function Jo(e, t = null) {
  return new Es(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + gi(e.headers), t);
}
const Fh = /* @__PURE__ */ new Map([
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
class Es extends Error {
  constructor(t, n = `HTTP error: ${Fh.get(t) || t}`, r = null) {
    super(n), this.statusCode = t, this.description = r, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
Le.HttpError = Es;
function Lh(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class pi {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, n = new Ph.CancellationToken(), r) {
    mi(t);
    const i = r == null ? void 0 : JSON.stringify(r), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      Wn(i);
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
    return Wn.enabled && Wn(`Request: ${gi(t)}`), n.createPromise((o, s, a) => {
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
    if (Wn.enabled && Wn(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${gi(n)}`), t.statusCode === 404) {
      o(Jo(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const p = (l = t.statusCode) !== null && l !== void 0 ? l : 0, c = p >= 300 && p < 400, u = Cn(t, "location");
    if (c && u != null) {
      if (s > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(pi.prepareRedirectUrlOptions(u, n), r, a, s).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let d = "";
    t.on("error", o), t.on("data", (m) => d += m), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const m = Cn(t, "content-type"), v = m != null && (Array.isArray(m) ? m.find((y) => y.includes("json")) != null : m.includes("json"));
          o(Jo(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

          Data:
          ${v ? JSON.stringify(JSON.parse(d)) : d}
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
      ws(t, a), mi(a), this.doDownload(a, {
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
      const s = Cn(o, "location");
      if (s != null) {
        r < this.maxRedirects ? this.doDownload(pi.prepareRedirectUrlOptions(s, t), n, r++) : n.callback(this.createMaxRedirectError());
        return;
      }
      n.responseHandler == null ? kh(n, o) : n.responseHandler(o, n.callback);
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
    const r = Nc(t, { ...n }), i = r.headers;
    if (i != null && i.authorization) {
      const o = new Pc.URL(t);
      (o.hostname.endsWith(".amazonaws.com") || o.searchParams.has("X-Amz-Credential")) && delete i.authorization;
    }
    return r;
  }
  static retryOnServerError(t, n = 3) {
    for (let r = 0; ; r++)
      try {
        return t();
      } catch (i) {
        if (r < n && (i instanceof Es && i.isServerError() || i.code === "EPIPE"))
          continue;
        throw i;
      }
  }
}
Le.HttpExecutor = pi;
function Nc(e, t) {
  const n = mi(t);
  return ws(new Pc.URL(e), n), n;
}
function ws(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Ko extends Rh.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, n = "sha512", r = "base64") {
    super(), this.expected = t, this.algorithm = n, this.encoding = r, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, Ih.createHash)(n);
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
      throw (0, Pa.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, Pa.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
Le.DigestTransform = Ko;
function Uh(e, t, n) {
  return e != null && t != null && e !== t ? (n(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function Cn(e, t) {
  const n = e.headers[t];
  return n == null ? null : Array.isArray(n) ? n.length === 0 ? null : n[n.length - 1] : n;
}
function kh(e, t) {
  if (!Uh(Cn(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const n = [];
  if (e.options.onProgress != null) {
    const s = Cn(t, "content-length");
    s != null && n.push(new Nh.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const r = e.options.sha512;
  r != null ? n.push(new Ko(r, "sha512", r.length === 128 && !r.includes("+") && !r.includes("Z") && !r.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && n.push(new Ko(e.options.sha2, "sha256", "hex"));
  const i = (0, Dh.createWriteStream)(e.destination);
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
function mi(e, t, n) {
  n != null && (e.method = n), e.headers = { ...e.headers };
  const r = e.headers;
  return t != null && (r.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), r["User-Agent"] == null && (r["User-Agent"] = "electron-builder"), (n == null || n === "GET" || r["Cache-Control"] == null) && (r["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function gi(e, t) {
  return JSON.stringify(e, (n, r) => n.endsWith("Authorization") || n.endsWith("authorization") || n.endsWith("Password") || n.endsWith("PASSWORD") || n.endsWith("Token") || n.includes("password") || n.includes("token") || t != null && t.has(n) ? "<stripped sensitive data>" : r, 2);
}
var Oi = {};
Object.defineProperty(Oi, "__esModule", { value: !0 });
Oi.githubUrl = Mh;
Oi.getS3LikeProviderBaseUrl = jh;
function Mh(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function jh(e) {
  const t = e.provider;
  if (t === "s3")
    return Bh(e);
  if (t === "spaces")
    return Hh(e);
  throw new Error(`Not supported provider: ${t}`);
}
function Bh(e) {
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
  return Fc(t, e.path);
}
function Fc(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function Hh(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return Fc(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var vs = {};
Object.defineProperty(vs, "__esModule", { value: !0 });
vs.parseDn = qh;
function qh(e) {
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
var Dn = {};
Object.defineProperty(Dn, "__esModule", { value: !0 });
Dn.nil = Dn.UUID = void 0;
const Lc = vr, Uc = Un, Gh = "options.name must be either a string or a Buffer", Na = (0, Lc.randomBytes)(16);
Na[0] = Na[0] | 1;
const si = {}, oe = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  si[t] = e, oe[e] = t;
}
class cn {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const n = cn.check(t);
    if (!n)
      throw new Error("not a UUID");
    this.version = n.version, n.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, n) {
    return zh(t, "sha1", 80, n);
  }
  toString() {
    return this.ascii == null && (this.ascii = Wh(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, n = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (si[t[14] + t[15]] & 240) >> 4,
        variant: Fa((si[t[19] + t[20]] & 224) >> 5),
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
        variant: Fa((t[n + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, Uc.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const n = Buffer.allocUnsafe(16);
    let r = 0;
    for (let i = 0; i < 16; i++)
      n[i] = si[t[r++] + t[r++]], (i === 3 || i === 5 || i === 7 || i === 9) && (r += 1);
    return n;
  }
}
Dn.UUID = cn;
cn.OID = cn.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function Fa(e) {
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
var or;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(or || (or = {}));
function zh(e, t, n, r, i = or.ASCII) {
  const o = (0, Lc.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, Uc.newError)(Gh, "ERR_INVALID_UUID_NAME");
  o.update(r), o.update(e);
  const a = o.digest();
  let l;
  switch (i) {
    case or.BINARY:
      a[6] = a[6] & 15 | n, a[8] = a[8] & 63 | 128, l = a;
      break;
    case or.OBJECT:
      a[6] = a[6] & 15 | n, a[8] = a[8] & 63 | 128, l = new cn(a);
      break;
    default:
      l = oe[a[0]] + oe[a[1]] + oe[a[2]] + oe[a[3]] + "-" + oe[a[4]] + oe[a[5]] + "-" + oe[a[6] & 15 | n] + oe[a[7]] + "-" + oe[a[8] & 63 | 128] + oe[a[9]] + "-" + oe[a[10]] + oe[a[11]] + oe[a[12]] + oe[a[13]] + oe[a[14]] + oe[a[15]];
      break;
  }
  return l;
}
function Wh(e) {
  return oe[e[0]] + oe[e[1]] + oe[e[2]] + oe[e[3]] + "-" + oe[e[4]] + oe[e[5]] + "-" + oe[e[6]] + oe[e[7]] + "-" + oe[e[8]] + oe[e[9]] + "-" + oe[e[10]] + oe[e[11]] + oe[e[12]] + oe[e[13]] + oe[e[14]] + oe[e[15]];
}
Dn.nil = new cn("00000000-0000-0000-0000-000000000000");
var xr = {}, kc = {};
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
      var A = this;
      o(A), A.q = A.c = "", A.bufferCheckPosition = t.MAX_BUFFER_LENGTH, A.encoding = null, A.opt = f || {}, A.opt.lowercase = A.opt.lowercase || A.opt.lowercasetags, A.looseCase = A.opt.lowercase ? "toLowerCase" : "toUpperCase", A.opt.maxEntityCount = A.opt.maxEntityCount || 512, A.opt.maxEntityDepth = A.opt.maxEntityDepth || 4, A.entityCount = A.entityDepth = 0, A.tags = [], A.closed = A.closedRoot = A.sawRoot = !1, A.tag = A.error = null, A.strict = !!h, A.noscript = !!(h || A.opt.noscript), A.state = E.BEGIN, A.strictEntities = A.opt.strictEntities, A.ENTITIES = A.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), A.attribList = [], A.opt.xmlns && (A.ns = Object.create(w)), A.opt.unquotedAttributeValues === void 0 && (A.opt.unquotedAttributeValues = !h), A.trackPosition = A.opt.position !== !1, A.trackPosition && (A.position = A.line = A.column = 0), Z(A, "onready");
    }
    Object.create || (Object.create = function(h) {
      function f() {
      }
      f.prototype = h;
      var A = new f();
      return A;
    }), Object.keys || (Object.keys = function(h) {
      var f = [];
      for (var A in h) h.hasOwnProperty(A) && f.push(A);
      return f;
    });
    function i(h) {
      for (var f = Math.max(t.MAX_BUFFER_LENGTH, 10), A = 0, _ = 0, se = n.length; _ < se; _++) {
        var ue = h[n[_]].length;
        if (ue > f)
          switch (n[_]) {
            case "textNode":
              I(h);
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
        A = Math.max(A, ue);
      }
      var me = t.MAX_BUFFER_LENGTH - A;
      h.bufferCheckPosition = me + h.position;
    }
    function o(h) {
      for (var f = 0, A = n.length; f < A; f++)
        h[n[f]] = "";
    }
    function s(h) {
      I(h), h.cdata !== "" && (C(h, "oncdata", h.cdata), h.cdata = ""), h.script !== "" && (C(h, "onscript", h.script), h.script = "");
    }
    r.prototype = {
      end: function() {
        j(this);
      },
      write: Gt,
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
      var A = this;
      this._parser.onend = function() {
        A.emit("end");
      }, this._parser.onerror = function(_) {
        A.emit("error", _), A._parser.error = null;
      }, this._decoder = null, this._decoderBuffer = null, l.forEach(function(_) {
        Object.defineProperty(A, "on" + _, {
          get: function() {
            return A._parser["on" + _];
          },
          set: function(se) {
            if (!se)
              return A.removeAllListeners(_), A._parser["on" + _] = se, se;
            A.on(_, se);
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
        var A = c(h, f);
        if (!A)
          return this._decoderBuffer = h, "";
        this._parser.encoding = A, this._decoder = new TextDecoder(A);
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
        var A = this._decoder.decode();
        A && (this._parser.write(A), this.emit("data", A));
      }
      return this._parser.end(), !0;
    }, u.prototype.on = function(h, f) {
      var A = this;
      return !A._parser["on" + h] && l.indexOf(h) !== -1 && (A._parser["on" + h] = function() {
        var _ = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        _.splice(0, 0, h), A.emit.apply(A, _);
      }), a.prototype.on.call(A, h, f);
    };
    var d = /^\[CDATA\[$/i, m = /^DOCTYPE$/i, v = "http://www.w3.org/XML/1998/namespace", y = "http://www.w3.org/2000/xmlns/", w = { xml: v, xmlns: y }, b = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, $ = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, B = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, z = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function U(h) {
      return h === " " || h === `
` || h === "\r" || h === "	";
    }
    function S(h) {
      return h === '"' || h === "'";
    }
    function R(h) {
      return h === ">" || U(h);
    }
    function N(h, f) {
      return h.test(f);
    }
    function D(h, f) {
      return !N(h, f);
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
      var f = t.ENTITIES[h], A = typeof f == "number" ? String.fromCharCode(f) : f;
      t.ENTITIES[h] = A;
    });
    for (var q in t.STATE)
      t.STATE[t.STATE[q]] = q;
    E = t.STATE;
    function Z(h, f, A) {
      h[f] && h[f](A);
    }
    function te(h) {
      var f = h && h.match(/(?:^|\s)encoding\s*=\s*(['"])([^'"]+)\1/i);
      return f ? f[2] : null;
    }
    function ee(h) {
      return h ? h.toLowerCase().replace(/[^a-z0-9]/g, "") : null;
    }
    function Q(h, f) {
      const A = ee(h), _ = ee(f);
      return !A || !_ ? !0 : _ === "utf16" ? A === "utf16le" || A === "utf16be" : A === _;
    }
    function Y(h, f) {
      if (!(!h.strict || !h.encoding || !f || f.name !== "xml")) {
        var A = te(f.body);
        A && !Q(h.encoding, A) && O(
          h,
          "XML declaration encoding " + A + " does not match detected stream encoding " + h.encoding.toUpperCase()
        );
      }
    }
    function C(h, f, A) {
      h.textNode && I(h), Z(h, f, A);
    }
    function I(h) {
      h.textNode = T(h.opt, h.textNode), h.textNode && Z(h, "ontext", h.textNode), h.textNode = "";
    }
    function T(h, f) {
      return h.trim && (f = f.trim()), h.normalize && (f = f.replace(/\s+/g, " ")), f;
    }
    function L(h, f) {
      return I(h), h.trackPosition && (f += `
Line: ` + h.line + `
Column: ` + h.column + `
Char: ` + h.c), f = new Error(f), h.error = f, Z(h, "onerror", f), h;
    }
    function j(h) {
      return h.sawRoot && !h.closedRoot && O(h, "Unclosed root tag"), h.state !== E.BEGIN && h.state !== E.BEGIN_WHITESPACE && h.state !== E.TEXT && L(h, "Unexpected end"), I(h), h.c = "", h.closed = !0, Z(h, "onend"), r.call(h, h.strict, h.opt), h;
    }
    function O(h, f) {
      if (typeof h != "object" || !(h instanceof r))
        throw new Error("bad call to strictFail");
      h.strict && L(h, f);
    }
    function k(h) {
      h.strict || (h.tagName = h.tagName[h.looseCase]());
      var f = h.tags[h.tags.length - 1] || h, A = h.tag = { name: h.tagName, attributes: {} };
      h.opt.xmlns && (A.ns = f.ns), h.attribList.length = 0, C(h, "onopentagstart", A);
    }
    function J(h, f) {
      var A = h.indexOf(":"), _ = A < 0 ? ["", h] : h.split(":"), se = _[0], ue = _[1];
      return f && h === "xmlns" && (se = "xmlns", ue = ""), { prefix: se, local: ue };
    }
    function M(h) {
      if (h.strict || (h.attribName = h.attribName[h.looseCase]()), h.attribList.indexOf(h.attribName) !== -1 || h.tag.attributes.hasOwnProperty(h.attribName)) {
        h.attribName = h.attribValue = "";
        return;
      }
      if (h.opt.xmlns) {
        var f = J(h.attribName, !0), A = f.prefix, _ = f.local;
        if (A === "xmlns")
          if (_ === "xml" && h.attribValue !== v)
            O(
              h,
              "xml: prefix must be bound to " + v + `
Actual: ` + h.attribValue
            );
          else if (_ === "xmlns" && h.attribValue !== y)
            O(
              h,
              "xmlns: prefix must be bound to " + y + `
Actual: ` + h.attribValue
            );
          else {
            var se = h.tag, ue = h.tags[h.tags.length - 1] || h;
            se.ns === ue.ns && (se.ns = Object.create(ue.ns)), se.ns[_] = h.attribValue;
          }
        h.attribList.push([h.attribName, h.attribValue]);
      } else
        h.tag.attributes[h.attribName] = h.attribValue, C(h, "onattribute", {
          name: h.attribName,
          value: h.attribValue
        });
      h.attribName = h.attribValue = "";
    }
    function W(h, f) {
      if (h.opt.xmlns) {
        var A = h.tag, _ = J(h.tagName);
        A.prefix = _.prefix, A.local = _.local, A.uri = A.ns[_.prefix] || "", A.prefix && !A.uri && (O(
          h,
          "Unbound namespace prefix: " + JSON.stringify(h.tagName)
        ), A.uri = _.prefix);
        var se = h.tags[h.tags.length - 1] || h;
        A.ns && se.ns !== A.ns && Object.keys(A.ns).forEach(function(pn) {
          C(h, "onopennamespace", {
            prefix: pn,
            uri: A.ns[pn]
          });
        });
        for (var ue = 0, me = h.attribList.length; ue < me; ue++) {
          var $e = h.attribList[ue], Ie = $e[0], Je = $e[1], ye = J(Ie, !0), Ke = ye.prefix, lo = ye.local, Ur = Ke === "" ? "" : A.ns[Ke] || "", Tt = {
            name: Ie,
            value: Je,
            prefix: Ke,
            local: lo,
            uri: Ur
          };
          Ke && Ke !== "xmlns" && !Ur && (O(
            h,
            "Unbound namespace prefix: " + JSON.stringify(Ke)
          ), Tt.uri = Ke), h.tag.attributes[Ie] = Tt, C(h, "onattribute", Tt);
        }
        h.attribList.length = 0;
      }
      h.tag.isSelfClosing = !!f, h.sawRoot = !0, h.tags.push(h.tag), C(h, "onopentag", h.tag), f || (!h.noscript && h.tagName.toLowerCase() === "script" ? h.state = E.SCRIPT : h.state = E.TEXT, h.tag = null, h.tagName = ""), h.attribName = h.attribValue = "", h.attribList.length = 0;
    }
    function ie(h) {
      if (!h.tagName) {
        O(h, "Weird empty close tag."), h.textNode += "</>", h.state = E.TEXT;
        return;
      }
      if (h.script) {
        if (h.tagName !== "script") {
          h.script += "</" + h.tagName + ">", h.tagName = "", h.state = E.SCRIPT;
          return;
        }
        C(h, "onscript", h.script), h.script = "";
      }
      var f = h.tags.length, A = h.tagName;
      h.strict || (A = A[h.looseCase]());
      for (var _ = A; f--; ) {
        var se = h.tags[f];
        if (se.name !== _)
          O(h, "Unexpected close tag");
        else
          break;
      }
      if (f < 0) {
        O(h, "Unmatched closing tag: " + h.tagName), h.textNode += "</" + h.tagName + ">", h.state = E.TEXT;
        return;
      }
      h.tagName = A;
      for (var ue = h.tags.length; ue-- > f; ) {
        var me = h.tag = h.tags.pop();
        h.tagName = h.tag.name, C(h, "onclosetag", h.tagName);
        var $e = {};
        for (var Ie in me.ns)
          $e[Ie] = me.ns[Ie];
        var Je = h.tags[h.tags.length - 1] || h;
        h.opt.xmlns && me.ns !== Je.ns && Object.keys(me.ns).forEach(function(ye) {
          var Ke = me.ns[ye];
          C(h, "onclosenamespace", { prefix: ye, uri: Ke });
        });
      }
      f === 0 && (h.closedRoot = !0), h.tagName = h.attribValue = h.attribName = "", h.attribList.length = 0, h.state = E.TEXT;
    }
    function K(h) {
      var f = h.entity, A = f.toLowerCase(), _, se = "";
      return h.ENTITIES[f] ? h.ENTITIES[f] : h.ENTITIES[A] ? h.ENTITIES[A] : (f = A, f.charAt(0) === "#" && (f.charAt(1) === "x" ? (f = f.slice(2), _ = parseInt(f, 16), se = _.toString(16)) : (f = f.slice(1), _ = parseInt(f, 10), se = _.toString(10))), f = f.replace(/^0+/, ""), isNaN(_) || se.toLowerCase() !== f || _ < 0 || _ > 1114111 || !Se(_) ? (O(h, "Invalid character entity"), "&" + h.entity + ";") : String.fromCodePoint(_));
    }
    function Se(h) {
      return h === 9 || h === 10 || h === 13 || h >= 32 && h <= 55295 || h >= 57344 && h <= 65533 || h >= 65536 && h <= 1114111;
    }
    function mt(h, f) {
      f === "<" ? (h.state = E.OPEN_WAKA, h.startTagPosition = h.position) : U(f) || (O(h, "Non-whitespace before first tag."), h.textNode = f, h.state = E.TEXT);
    }
    function qe(h, f) {
      var A = "";
      return f < h.length && (A = h.charAt(f)), A;
    }
    function Gt(h) {
      var f = this;
      if (this.error)
        throw this.error;
      if (f.closed)
        return L(
          f,
          "Cannot write after close. Assign an onready handler."
        );
      if (h === null)
        return j(f);
      typeof h == "object" && (h = h.toString());
      for (var A = 0, _ = ""; _ = qe(h, A++), f.c = _, !!_; )
        switch (f.trackPosition && (f.position++, _ === `
` ? (f.line++, f.column = 0) : f.column++), f.state) {
          case E.BEGIN:
            if (f.state = E.BEGIN_WHITESPACE, _ === "\uFEFF")
              continue;
            mt(f, _);
            continue;
          case E.BEGIN_WHITESPACE:
            mt(f, _);
            continue;
          case E.TEXT:
            if (f.sawRoot && !f.closedRoot) {
              for (var ue = A - 1; _ && _ !== "<" && _ !== "&"; )
                _ = qe(h, A++), _ && f.trackPosition && (f.position++, _ === `
` ? (f.line++, f.column = 0) : f.column++);
              f.textNode += h.substring(ue, A - 1);
            }
            _ === "<" && !(f.sawRoot && f.closedRoot && !f.strict) ? (f.state = E.OPEN_WAKA, f.startTagPosition = f.position) : (!U(_) && (!f.sawRoot || f.closedRoot) && O(f, "Text data outside of root node."), _ === "&" ? f.state = E.TEXT_ENTITY : f.textNode += _);
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
            else if (!U(_)) if (N(b, _))
              f.state = E.OPEN_TAG, f.tagName = _;
            else if (_ === "/")
              f.state = E.CLOSE_TAG, f.tagName = "";
            else if (_ === "?")
              f.state = E.PROC_INST, f.procInstName = f.procInstBody = "";
            else {
              if (O(f, "Unencoded <"), f.startTagPosition + 1 < f.position) {
                var se = f.position - f.startTagPosition;
                _ = new Array(se).join(" ") + _;
              }
              f.textNode += "<" + _, f.state = E.TEXT;
            }
            continue;
          case E.SGML_DECL:
            if (f.sgmlDecl + _ === "--") {
              f.state = E.COMMENT, f.comment = "", f.sgmlDecl = "";
              continue;
            }
            f.doctype && f.doctype !== !0 && f.sgmlDecl ? (f.state = E.DOCTYPE_DTD, f.doctype += "<!" + f.sgmlDecl + _, f.sgmlDecl = "") : d.test(f.sgmlDecl + _) ? (C(f, "onopencdata"), f.state = E.CDATA, f.sgmlDecl = "", f.cdata = "") : m.test(f.sgmlDecl + _) ? (f.state = E.DOCTYPE, (f.doctype || f.sawRoot) && O(
              f,
              "Inappropriately located doctype declaration"
            ), f.doctype = "", f.sgmlDecl = "") : _ === ">" ? (C(f, "onsgmldeclaration", f.sgmlDecl), f.sgmlDecl = "", f.state = E.TEXT) : (S(_) && (f.state = E.SGML_DECL_QUOTED), f.sgmlDecl += _);
            continue;
          case E.SGML_DECL_QUOTED:
            _ === f.q && (f.state = E.SGML_DECL, f.q = ""), f.sgmlDecl += _;
            continue;
          case E.DOCTYPE:
            _ === ">" ? (f.state = E.TEXT, C(f, "ondoctype", f.doctype), f.doctype = !0) : (f.doctype += _, _ === "[" ? f.state = E.DOCTYPE_DTD : S(_) && (f.state = E.DOCTYPE_QUOTED, f.q = _));
            continue;
          case E.DOCTYPE_QUOTED:
            f.doctype += _, _ === f.q && (f.q = "", f.state = E.DOCTYPE);
            continue;
          case E.DOCTYPE_DTD:
            _ === "]" ? (f.doctype += _, f.state = E.DOCTYPE) : _ === "<" ? (f.state = E.OPEN_WAKA, f.startTagPosition = f.position) : S(_) ? (f.doctype += _, f.state = E.DOCTYPE_DTD_QUOTED, f.q = _) : f.doctype += _;
            continue;
          case E.DOCTYPE_DTD_QUOTED:
            f.doctype += _, _ === f.q && (f.state = E.DOCTYPE_DTD, f.q = "");
            continue;
          case E.COMMENT:
            _ === "-" ? f.state = E.COMMENT_ENDING : f.comment += _;
            continue;
          case E.COMMENT_ENDING:
            _ === "-" ? (f.state = E.COMMENT_ENDED, f.comment = T(f.opt, f.comment), f.comment && C(f, "oncomment", f.comment), f.comment = "") : (f.comment += "-" + _, f.state = E.COMMENT);
            continue;
          case E.COMMENT_ENDED:
            _ !== ">" ? (O(f, "Malformed comment"), f.comment += "--" + _, f.state = E.COMMENT) : f.doctype && f.doctype !== !0 ? f.state = E.DOCTYPE_DTD : f.state = E.TEXT;
            continue;
          case E.CDATA:
            for (var ue = A - 1; _ && _ !== "]"; )
              _ = qe(h, A++), _ && f.trackPosition && (f.position++, _ === `
` ? (f.line++, f.column = 0) : f.column++);
            f.cdata += h.substring(ue, A - 1), _ === "]" && (f.state = E.CDATA_ENDING);
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
              const Je = {
                name: f.procInstName,
                body: f.procInstBody
              };
              Y(f, Je), C(f, "onprocessinginstruction", Je), f.procInstName = f.procInstBody = "", f.state = E.TEXT;
            } else
              f.procInstBody += "?" + _, f.state = E.PROC_INST_BODY;
            continue;
          case E.OPEN_TAG:
            N($, _) ? f.tagName += _ : (k(f), _ === ">" ? W(f) : _ === "/" ? f.state = E.OPEN_TAG_SLASH : (U(_) || O(f, "Invalid character in tag name"), f.state = E.ATTRIB));
            continue;
          case E.OPEN_TAG_SLASH:
            _ === ">" ? (W(f, !0), ie(f)) : (O(
              f,
              "Forward-slash in opening tag not followed by >"
            ), f.state = E.ATTRIB);
            continue;
          case E.ATTRIB:
            if (U(_))
              continue;
            _ === ">" ? W(f) : _ === "/" ? f.state = E.OPEN_TAG_SLASH : N(b, _) ? (f.attribName = _, f.attribValue = "", f.state = E.ATTRIB_NAME) : O(f, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME:
            _ === "=" ? f.state = E.ATTRIB_VALUE : _ === ">" ? (O(f, "Attribute without value"), f.attribValue = f.attribName, M(f), W(f)) : U(_) ? f.state = E.ATTRIB_NAME_SAW_WHITE : N($, _) ? f.attribName += _ : O(f, "Invalid attribute name");
            continue;
          case E.ATTRIB_NAME_SAW_WHITE:
            if (_ === "=")
              f.state = E.ATTRIB_VALUE;
            else {
              if (U(_))
                continue;
              O(f, "Attribute without value"), f.tag.attributes[f.attribName] = "", f.attribValue = "", C(f, "onattribute", {
                name: f.attribName,
                value: ""
              }), f.attribName = "", _ === ">" ? W(f) : N(b, _) ? (f.attribName = _, f.state = E.ATTRIB_NAME) : (O(f, "Invalid attribute name"), f.state = E.ATTRIB);
            }
            continue;
          case E.ATTRIB_VALUE:
            if (U(_))
              continue;
            S(_) ? (f.q = _, f.state = E.ATTRIB_VALUE_QUOTED) : (f.opt.unquotedAttributeValues || L(f, "Unquoted attribute value"), f.state = E.ATTRIB_VALUE_UNQUOTED, f.attribValue = _);
            continue;
          case E.ATTRIB_VALUE_QUOTED:
            if (_ !== f.q) {
              _ === "&" ? f.state = E.ATTRIB_VALUE_ENTITY_Q : f.attribValue += _;
              continue;
            }
            M(f), f.q = "", f.state = E.ATTRIB_VALUE_CLOSED;
            continue;
          case E.ATTRIB_VALUE_CLOSED:
            U(_) ? f.state = E.ATTRIB : _ === ">" ? W(f) : _ === "/" ? f.state = E.OPEN_TAG_SLASH : N(b, _) ? (O(f, "No whitespace between attributes"), f.attribName = _, f.attribValue = "", f.state = E.ATTRIB_NAME) : O(f, "Invalid attribute name");
            continue;
          case E.ATTRIB_VALUE_UNQUOTED:
            if (!R(_)) {
              _ === "&" ? f.state = E.ATTRIB_VALUE_ENTITY_U : f.attribValue += _;
              continue;
            }
            M(f), _ === ">" ? W(f) : f.state = E.ATTRIB;
            continue;
          case E.CLOSE_TAG:
            if (f.tagName)
              _ === ">" ? ie(f) : N($, _) ? f.tagName += _ : f.script ? (f.script += "</" + f.tagName + _, f.tagName = "", f.state = E.SCRIPT) : (U(_) || O(f, "Invalid tagname in closing tag"), f.state = E.CLOSE_TAG_SAW_WHITE);
            else {
              if (U(_))
                continue;
              D(b, _) ? f.script ? (f.script += "</" + _, f.state = E.SCRIPT) : O(f, "Invalid tagname in closing tag.") : f.tagName = _;
            }
            continue;
          case E.CLOSE_TAG_SAW_WHITE:
            if (U(_))
              continue;
            _ === ">" ? ie(f) : O(f, "Invalid characters in closing tag");
            continue;
          case E.TEXT_ENTITY:
          case E.ATTRIB_VALUE_ENTITY_Q:
          case E.ATTRIB_VALUE_ENTITY_U:
            var me, $e;
            switch (f.state) {
              case E.TEXT_ENTITY:
                me = E.TEXT, $e = "textNode";
                break;
              case E.ATTRIB_VALUE_ENTITY_Q:
                me = E.ATTRIB_VALUE_QUOTED, $e = "attribValue";
                break;
              case E.ATTRIB_VALUE_ENTITY_U:
                me = E.ATTRIB_VALUE_UNQUOTED, $e = "attribValue";
                break;
            }
            if (_ === ";") {
              var Ie = K(f);
              f.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(Ie) ? ((f.entityCount += 1) > f.opt.maxEntityCount && L(
                f,
                "Parsed entity count exceeds max entity count"
              ), (f.entityDepth += 1) > f.opt.maxEntityDepth && L(
                f,
                "Parsed entity depth exceeds max entity depth"
              ), f.entity = "", f.state = me, f.write(Ie), f.entityDepth -= 1) : (f[$e] += Ie, f.entity = "", f.state = me);
            } else N(f.entity.length ? z : B, _) ? f.entity += _ : (O(f, "Invalid character in entity name"), f[$e] += "&" + f.entity + _, f.entity = "", f.state = me);
            continue;
          default:
            throw new Error(f, "Unknown state: " + f.state);
        }
      return f.position >= f.bufferCheckPosition && i(f), f;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var h = String.fromCharCode, f = Math.floor, A = function() {
        var _ = 16384, se = [], ue, me, $e = -1, Ie = arguments.length;
        if (!Ie)
          return "";
        for (var Je = ""; ++$e < Ie; ) {
          var ye = Number(arguments[$e]);
          if (!isFinite(ye) || // `NaN`, `+Infinity`, or `-Infinity`
          ye < 0 || // not a valid Unicode code point
          ye > 1114111 || // not a valid Unicode code point
          f(ye) !== ye)
            throw RangeError("Invalid code point: " + ye);
          ye <= 65535 ? se.push(ye) : (ye -= 65536, ue = (ye >> 10) + 55296, me = ye % 1024 + 56320, se.push(ue, me)), ($e + 1 === Ie || se.length > _) && (Je += h.apply(null, se), se.length = 0);
        }
        return Je;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: A,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = A;
    }();
  })(e);
})(kc);
Object.defineProperty(xr, "__esModule", { value: !0 });
xr.XElement = void 0;
xr.parseXml = Jh;
const Vh = kc, Vr = Un;
class Mc {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, Vr.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!Xh(t))
      throw (0, Vr.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const n = this.attributes === null ? null : this.attributes[t];
    if (n == null)
      throw (0, Vr.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return n;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, n = !1, r = null) {
    const i = this.elementOrNull(t, n);
    if (i === null)
      throw (0, Vr.newError)(r || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, n = !1) {
    if (this.elements === null)
      return null;
    for (const r of this.elements)
      if (La(r, t, n))
        return r;
    return null;
  }
  getElements(t, n = !1) {
    return this.elements === null ? [] : this.elements.filter((r) => La(r, t, n));
  }
  elementValueOrEmpty(t, n = !1) {
    const r = this.elementOrNull(t, n);
    return r === null ? "" : r.value;
  }
}
xr.XElement = Mc;
const Yh = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function Xh(e) {
  return Yh.test(e);
}
function La(e, t, n) {
  const r = e.name;
  return r === t || n === !0 && r.length === t.length && r.toLowerCase() === t.toLowerCase();
}
function Jh(e) {
  let t = null;
  const n = Vh.parser(!0, {}), r = [];
  return n.onopentag = (i) => {
    const o = new Mc(i.name);
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
var Di = {};
Object.defineProperty(Di, "__esModule", { value: !0 });
Di.MemoLazy = void 0;
class Kh {
  constructor(t, n) {
    this.selector = t, this.creator = n, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && jc(this.selected, t))
      return this._value;
    this.selected = t;
    const n = this.creator(t);
    return this.value = n, n;
  }
  set value(t) {
    this._value = t;
  }
}
Di.MemoLazy = Kh;
function jc(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((s) => jc(e[s], t[s]));
  }
  return e === t;
}
var _s = {};
Object.defineProperty(_s, "__esModule", { value: !0 });
_s.retry = Bc;
const Qh = kt;
async function Bc(e, t, n, r = 0, i = 0, o) {
  var s;
  const a = new Qh.CancellationToken();
  try {
    return await e();
  } catch (l) {
    if ((!((s = o == null ? void 0 : o(l)) !== null && s !== void 0) || s) && t > 0 && !a.cancelled)
      return await new Promise((p) => setTimeout(p, n + r * i)), await Bc(e, t - 1, n, r, i + 1, o);
    throw l;
  }
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.retry = e.MemoLazy = e.newError = e.XElement = e.parseXml = e.ProgressCallbackTransform = e.UUID = e.parseDn = e.githubUrl = e.getS3LikeProviderBaseUrl = e.configureRequestUrl = e.parseJson = e.safeStringifyJson = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.safeGetHeader = e.DigestTransform = e.HttpExecutor = e.createHttpError = e.HttpError = e.CancellationError = e.CancellationToken = void 0, e.asArray = u;
  var t = kt;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } });
  var n = Le;
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
  var r = Oi;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return r.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return r.githubUrl;
  } });
  var i = vs;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return i.parseDn;
  } });
  var o = Dn;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return o.UUID;
  } });
  var s = _r;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return s.ProgressCallbackTransform;
  } });
  var a = xr;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return a.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return a.XElement;
  } });
  var l = Un;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return l.newError;
  } });
  var p = Di;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return p.MemoLazy;
  } });
  var c = _s;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return c.retry;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
  function u(d) {
    return d == null ? [] : Array.isArray(d) ? d : [d];
  }
})(xe);
var un = {}, ke = {};
ke.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((n, r) => {
        t.push((i, o) => i != null ? r(i) : n(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
ke.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const n = t[t.length - 1];
    if (typeof n != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((r) => n(null, r), n);
  }, "name", { value: e.name });
};
var It = dh, Zh = process.cwd, ai = null, ep = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return ai || (ai = Zh.call(process)), ai;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Ua = process.chdir;
  process.chdir = function(e) {
    ai = null, Ua.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Ua);
}
var tp = np;
function np(e) {
  It.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || n(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = r(e.chmod), e.fchmod = r(e.fchmod), e.lchmod = r(e.lchmod), e.chownSync = s(e.chownSync), e.fchownSync = s(e.fchownSync), e.lchownSync = s(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = a(e.stat), e.fstat = a(e.fstat), e.lstat = a(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(c, u, d) {
    d && process.nextTick(d);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(c, u, d, m) {
    m && process.nextTick(m);
  }, e.lchownSync = function() {
  }), ep === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(c) {
    function u(d, m, v) {
      var y = Date.now(), w = 0;
      c(d, m, function b($) {
        if ($ && ($.code === "EACCES" || $.code === "EPERM" || $.code === "EBUSY") && Date.now() - y < 6e4) {
          setTimeout(function() {
            e.stat(m, function(B, z) {
              B && B.code === "ENOENT" ? c(d, m, b) : v($);
            });
          }, w), w < 100 && (w += 10);
          return;
        }
        v && v($);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, c), u;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(c) {
    function u(d, m, v, y, w, b) {
      var $;
      if (b && typeof b == "function") {
        var B = 0;
        $ = function(z, U, S) {
          if (z && z.code === "EAGAIN" && B < 10)
            return B++, c.call(e, d, m, v, y, w, $);
          b.apply(this, arguments);
        };
      }
      return c.call(e, d, m, v, y, w, $);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, c), u;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(c) {
    return function(u, d, m, v, y) {
      for (var w = 0; ; )
        try {
          return c.call(e, u, d, m, v, y);
        } catch (b) {
          if (b.code === "EAGAIN" && w < 10) {
            w++;
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
        It.O_WRONLY | It.O_SYMLINK,
        d,
        function(v, y) {
          if (v) {
            m && m(v);
            return;
          }
          c.fchmod(y, d, function(w) {
            c.close(y, function(b) {
              m && m(w || b);
            });
          });
        }
      );
    }, c.lchmodSync = function(u, d) {
      var m = c.openSync(u, It.O_WRONLY | It.O_SYMLINK, d), v = !0, y;
      try {
        y = c.fchmodSync(m, d), v = !1;
      } finally {
        if (v)
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
    It.hasOwnProperty("O_SYMLINK") && c.futimes ? (c.lutimes = function(u, d, m, v) {
      c.open(u, It.O_SYMLINK, function(y, w) {
        if (y) {
          v && v(y);
          return;
        }
        c.futimes(w, d, m, function(b) {
          c.close(w, function($) {
            v && v(b || $);
          });
        });
      });
    }, c.lutimesSync = function(u, d, m) {
      var v = c.openSync(u, It.O_SYMLINK), y, w = !0;
      try {
        y = c.futimesSync(v, d, m), w = !1;
      } finally {
        if (w)
          try {
            c.closeSync(v);
          } catch {
          }
        else
          c.closeSync(v);
      }
      return y;
    }) : c.futimes && (c.lutimes = function(u, d, m, v) {
      v && process.nextTick(v);
    }, c.lutimesSync = function() {
    });
  }
  function r(c) {
    return c && function(u, d, m) {
      return c.call(e, u, d, function(v) {
        p(v) && (v = null), m && m.apply(this, arguments);
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
    return c && function(u, d, m, v) {
      return c.call(e, u, d, m, function(y) {
        p(y) && (y = null), v && v.apply(this, arguments);
      });
    };
  }
  function s(c) {
    return c && function(u, d, m) {
      try {
        return c.call(e, u, d, m);
      } catch (v) {
        if (!p(v)) throw v;
      }
    };
  }
  function a(c) {
    return c && function(u, d, m) {
      typeof d == "function" && (m = d, d = null);
      function v(y, w) {
        w && (w.uid < 0 && (w.uid += 4294967296), w.gid < 0 && (w.gid += 4294967296)), m && m.apply(this, arguments);
      }
      return d ? c.call(e, u, d, v) : c.call(e, u, v);
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
var ka = it.Stream, rp = ip;
function ip(e) {
  return {
    ReadStream: t,
    WriteStream: n
  };
  function t(r, i) {
    if (!(this instanceof t)) return new t(r, i);
    ka.call(this);
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
    ka.call(this), this.path = r, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
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
var op = ap, sp = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function ap(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: sp(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(n) {
    Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
  }), t;
}
var de = rt, lp = tp, cp = rp, up = op, Yr = Fn, Ae, yi;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Ae = Symbol.for("graceful-fs.queue"), yi = Symbol.for("graceful-fs.previous")) : (Ae = "___graceful-fs.queue", yi = "___graceful-fs.previous");
function fp() {
}
function Hc(e, t) {
  Object.defineProperty(e, Ae, {
    get: function() {
      return t;
    }
  });
}
var sn = fp;
Yr.debuglog ? sn = Yr.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (sn = function() {
  var e = Yr.format.apply(Yr, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!de[Ae]) {
  var dp = Ye[Ae] || [];
  Hc(de, dp), de.close = function(e) {
    function t(n, r) {
      return e.call(de, n, function(i) {
        i || Ma(), typeof r == "function" && r.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, yi, {
      value: e
    }), t;
  }(de.close), de.closeSync = function(e) {
    function t(n) {
      e.apply(de, arguments), Ma();
    }
    return Object.defineProperty(t, yi, {
      value: e
    }), t;
  }(de.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    sn(de[Ae]), Ic.equal(de[Ae].length, 0);
  });
}
Ye[Ae] || Hc(Ye, de[Ae]);
var Me = xs(up(de));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !de.__patched && (Me = xs(de), de.__patched = !0);
function xs(e) {
  lp(e), e.gracefulify = xs, e.createReadStream = U, e.createWriteStream = S;
  var t = e.readFile;
  e.readFile = n;
  function n(D, E, q) {
    return typeof E == "function" && (q = E, E = null), Z(D, E, q);
    function Z(te, ee, Q, Y) {
      return t(te, ee, function(C) {
        C && (C.code === "EMFILE" || C.code === "ENFILE") ? gn([Z, [te, ee, Q], C, Y || Date.now(), Date.now()]) : typeof Q == "function" && Q.apply(this, arguments);
      });
    }
  }
  var r = e.writeFile;
  e.writeFile = i;
  function i(D, E, q, Z) {
    return typeof q == "function" && (Z = q, q = null), te(D, E, q, Z);
    function te(ee, Q, Y, C, I) {
      return r(ee, Q, Y, function(T) {
        T && (T.code === "EMFILE" || T.code === "ENFILE") ? gn([te, [ee, Q, Y, C], T, I || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = s);
  function s(D, E, q, Z) {
    return typeof q == "function" && (Z = q, q = null), te(D, E, q, Z);
    function te(ee, Q, Y, C, I) {
      return o(ee, Q, Y, function(T) {
        T && (T.code === "EMFILE" || T.code === "ENFILE") ? gn([te, [ee, Q, Y, C], T, I || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  var a = e.copyFile;
  a && (e.copyFile = l);
  function l(D, E, q, Z) {
    return typeof q == "function" && (Z = q, q = 0), te(D, E, q, Z);
    function te(ee, Q, Y, C, I) {
      return a(ee, Q, Y, function(T) {
        T && (T.code === "EMFILE" || T.code === "ENFILE") ? gn([te, [ee, Q, Y, C], T, I || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  var p = e.readdir;
  e.readdir = u;
  var c = /^v[0-5]\./;
  function u(D, E, q) {
    typeof E == "function" && (q = E, E = null);
    var Z = c.test(process.version) ? function(Q, Y, C, I) {
      return p(Q, te(
        Q,
        Y,
        C,
        I
      ));
    } : function(Q, Y, C, I) {
      return p(Q, Y, te(
        Q,
        Y,
        C,
        I
      ));
    };
    return Z(D, E, q);
    function te(ee, Q, Y, C) {
      return function(I, T) {
        I && (I.code === "EMFILE" || I.code === "ENFILE") ? gn([
          Z,
          [ee, Q, Y],
          I,
          C || Date.now(),
          Date.now()
        ]) : (T && T.sort && T.sort(), typeof Y == "function" && Y.call(this, I, T));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var d = cp(e);
    b = d.ReadStream, B = d.WriteStream;
  }
  var m = e.ReadStream;
  m && (b.prototype = Object.create(m.prototype), b.prototype.open = $);
  var v = e.WriteStream;
  v && (B.prototype = Object.create(v.prototype), B.prototype.open = z), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return b;
    },
    set: function(D) {
      b = D;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return B;
    },
    set: function(D) {
      B = D;
    },
    enumerable: !0,
    configurable: !0
  });
  var y = b;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return y;
    },
    set: function(D) {
      y = D;
    },
    enumerable: !0,
    configurable: !0
  });
  var w = B;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return w;
    },
    set: function(D) {
      w = D;
    },
    enumerable: !0,
    configurable: !0
  });
  function b(D, E) {
    return this instanceof b ? (m.apply(this, arguments), this) : b.apply(Object.create(b.prototype), arguments);
  }
  function $() {
    var D = this;
    N(D.path, D.flags, D.mode, function(E, q) {
      E ? (D.autoClose && D.destroy(), D.emit("error", E)) : (D.fd = q, D.emit("open", q), D.read());
    });
  }
  function B(D, E) {
    return this instanceof B ? (v.apply(this, arguments), this) : B.apply(Object.create(B.prototype), arguments);
  }
  function z() {
    var D = this;
    N(D.path, D.flags, D.mode, function(E, q) {
      E ? (D.destroy(), D.emit("error", E)) : (D.fd = q, D.emit("open", q));
    });
  }
  function U(D, E) {
    return new e.ReadStream(D, E);
  }
  function S(D, E) {
    return new e.WriteStream(D, E);
  }
  var R = e.open;
  e.open = N;
  function N(D, E, q, Z) {
    return typeof q == "function" && (Z = q, q = null), te(D, E, q, Z);
    function te(ee, Q, Y, C, I) {
      return R(ee, Q, Y, function(T, L) {
        T && (T.code === "EMFILE" || T.code === "ENFILE") ? gn([te, [ee, Q, Y, C], T, I || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  return e;
}
function gn(e) {
  sn("ENQUEUE", e[0].name, e[1]), de[Ae].push(e), bs();
}
var Xr;
function Ma() {
  for (var e = Date.now(), t = 0; t < de[Ae].length; ++t)
    de[Ae][t].length > 2 && (de[Ae][t][3] = e, de[Ae][t][4] = e);
  bs();
}
function bs() {
  if (clearTimeout(Xr), Xr = void 0, de[Ae].length !== 0) {
    var e = de[Ae].shift(), t = e[0], n = e[1], r = e[2], i = e[3], o = e[4];
    if (i === void 0)
      sn("RETRY", t.name, n), t.apply(null, n);
    else if (Date.now() - i >= 6e4) {
      sn("TIMEOUT", t.name, n);
      var s = n.pop();
      typeof s == "function" && s.call(null, r);
    } else {
      var a = Date.now() - o, l = Math.max(o - i, 1), p = Math.min(l * 1.2, 100);
      a >= p ? (sn("RETRY", t.name, n), t.apply(null, n.concat([i]))) : de[Ae].push(e);
    }
    Xr === void 0 && (Xr = setTimeout(bs, 0));
  }
}
(function(e) {
  const t = ke.fromCallback, n = Me, r = [
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
      n.read(i, o, s, a, l, (d, m, v) => {
        if (d) return u(d);
        c({ bytesRead: m, buffer: v });
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
})(un);
var Ss = {}, qc = {};
const hp = ce;
qc.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(hp.parse(t).root, ""))) {
    const r = new Error(`Path contains invalid characters: ${t}`);
    throw r.code = "EINVAL", r;
  }
};
const Gc = un, { checkPath: zc } = qc, Wc = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Ss.makeDir = async (e, t) => (zc(e), Gc.mkdir(e, {
  mode: Wc(t),
  recursive: !0
}));
Ss.makeDirSync = (e, t) => (zc(e), Gc.mkdirSync(e, {
  mode: Wc(t),
  recursive: !0
}));
const pp = ke.fromPromise, { makeDir: mp, makeDirSync: xo } = Ss, bo = pp(mp);
var ht = {
  mkdirs: bo,
  mkdirsSync: xo,
  // alias
  mkdirp: bo,
  mkdirpSync: xo,
  ensureDir: bo,
  ensureDirSync: xo
};
const gp = ke.fromPromise, Vc = un;
function yp(e) {
  return Vc.access(e).then(() => !0).catch(() => !1);
}
var fn = {
  pathExists: gp(yp),
  pathExistsSync: Vc.existsSync
};
const $n = Me;
function Ep(e, t, n, r) {
  $n.open(e, "r+", (i, o) => {
    if (i) return r(i);
    $n.futimes(o, t, n, (s) => {
      $n.close(o, (a) => {
        r && r(s || a);
      });
    });
  });
}
function wp(e, t, n) {
  const r = $n.openSync(e, "r+");
  return $n.futimesSync(r, t, n), $n.closeSync(r);
}
var Yc = {
  utimesMillis: Ep,
  utimesMillisSync: wp
};
const Rn = un, _e = ce, vp = Fn;
function _p(e, t, n) {
  const r = n.dereference ? (i) => Rn.stat(i, { bigint: !0 }) : (i) => Rn.lstat(i, { bigint: !0 });
  return Promise.all([
    r(e),
    r(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function xp(e, t, n) {
  let r;
  const i = n.dereference ? (s) => Rn.statSync(s, { bigint: !0 }) : (s) => Rn.lstatSync(s, { bigint: !0 }), o = i(e);
  try {
    r = i(t);
  } catch (s) {
    if (s.code === "ENOENT") return { srcStat: o, destStat: null };
    throw s;
  }
  return { srcStat: o, destStat: r };
}
function bp(e, t, n, r, i) {
  vp.callbackify(_p)(e, t, r, (o, s) => {
    if (o) return i(o);
    const { srcStat: a, destStat: l } = s;
    if (l) {
      if (br(a, l)) {
        const p = _e.basename(e), c = _e.basename(t);
        return n === "move" && p !== c && p.toLowerCase() === c.toLowerCase() ? i(null, { srcStat: a, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (a.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!a.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return a.isDirectory() && Ts(e, t) ? i(new Error(Ri(e, t, n))) : i(null, { srcStat: a, destStat: l });
  });
}
function Sp(e, t, n, r) {
  const { srcStat: i, destStat: o } = xp(e, t, r);
  if (o) {
    if (br(i, o)) {
      const s = _e.basename(e), a = _e.basename(t);
      if (n === "move" && s !== a && s.toLowerCase() === a.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Ts(e, t))
    throw new Error(Ri(e, t, n));
  return { srcStat: i, destStat: o };
}
function Xc(e, t, n, r, i) {
  const o = _e.resolve(_e.dirname(e)), s = _e.resolve(_e.dirname(n));
  if (s === o || s === _e.parse(s).root) return i();
  Rn.stat(s, { bigint: !0 }, (a, l) => a ? a.code === "ENOENT" ? i() : i(a) : br(t, l) ? i(new Error(Ri(e, n, r))) : Xc(e, t, s, r, i));
}
function Jc(e, t, n, r) {
  const i = _e.resolve(_e.dirname(e)), o = _e.resolve(_e.dirname(n));
  if (o === i || o === _e.parse(o).root) return;
  let s;
  try {
    s = Rn.statSync(o, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (br(t, s))
    throw new Error(Ri(e, n, r));
  return Jc(e, t, o, r);
}
function br(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Ts(e, t) {
  const n = _e.resolve(e).split(_e.sep).filter((i) => i), r = _e.resolve(t).split(_e.sep).filter((i) => i);
  return n.reduce((i, o, s) => i && r[s] === o, !0);
}
function Ri(e, t, n) {
  return `Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`;
}
var kn = {
  checkPaths: bp,
  checkPathsSync: Sp,
  checkParentPaths: Xc,
  checkParentPathsSync: Jc,
  isSrcSubdir: Ts,
  areIdentical: br
};
const Be = Me, ur = ce, Tp = ht.mkdirs, Ap = fn.pathExists, Cp = Yc.utimesMillis, fr = kn;
function $p(e, t, n, r) {
  typeof n == "function" && !r ? (r = n, n = {}) : typeof n == "function" && (n = { filter: n }), r = r || function() {
  }, n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), fr.checkPaths(e, t, "copy", n, (i, o) => {
    if (i) return r(i);
    const { srcStat: s, destStat: a } = o;
    fr.checkParentPaths(e, s, t, "copy", (l) => l ? r(l) : n.filter ? Kc(ja, a, e, t, n, r) : ja(a, e, t, n, r));
  });
}
function ja(e, t, n, r, i) {
  const o = ur.dirname(n);
  Ap(o, (s, a) => {
    if (s) return i(s);
    if (a) return Ei(e, t, n, r, i);
    Tp(o, (l) => l ? i(l) : Ei(e, t, n, r, i));
  });
}
function Kc(e, t, n, r, i, o) {
  Promise.resolve(i.filter(n, r)).then((s) => s ? e(t, n, r, i, o) : o(), (s) => o(s));
}
function Ip(e, t, n, r, i) {
  return r.filter ? Kc(Ei, e, t, n, r, i) : Ei(e, t, n, r, i);
}
function Ei(e, t, n, r, i) {
  (r.dereference ? Be.stat : Be.lstat)(t, (s, a) => s ? i(s) : a.isDirectory() ? Lp(a, e, t, n, r, i) : a.isFile() || a.isCharacterDevice() || a.isBlockDevice() ? Op(a, e, t, n, r, i) : a.isSymbolicLink() ? Mp(e, t, n, r, i) : a.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : a.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function Op(e, t, n, r, i, o) {
  return t ? Dp(e, n, r, i, o) : Qc(e, n, r, i, o);
}
function Dp(e, t, n, r, i) {
  if (r.overwrite)
    Be.unlink(n, (o) => o ? i(o) : Qc(e, t, n, r, i));
  else return r.errorOnExist ? i(new Error(`'${n}' already exists`)) : i();
}
function Qc(e, t, n, r, i) {
  Be.copyFile(t, n, (o) => o ? i(o) : r.preserveTimestamps ? Rp(e.mode, t, n, i) : Pi(n, e.mode, i));
}
function Rp(e, t, n, r) {
  return Pp(e) ? Np(n, e, (i) => i ? r(i) : Ba(e, t, n, r)) : Ba(e, t, n, r);
}
function Pp(e) {
  return (e & 128) === 0;
}
function Np(e, t, n) {
  return Pi(e, t | 128, n);
}
function Ba(e, t, n, r) {
  Fp(t, n, (i) => i ? r(i) : Pi(n, e, r));
}
function Pi(e, t, n) {
  return Be.chmod(e, t, n);
}
function Fp(e, t, n) {
  Be.stat(e, (r, i) => r ? n(r) : Cp(t, i.atime, i.mtime, n));
}
function Lp(e, t, n, r, i, o) {
  return t ? Zc(n, r, i, o) : Up(e.mode, n, r, i, o);
}
function Up(e, t, n, r, i) {
  Be.mkdir(n, (o) => {
    if (o) return i(o);
    Zc(t, n, r, (s) => s ? i(s) : Pi(n, e, i));
  });
}
function Zc(e, t, n, r) {
  Be.readdir(e, (i, o) => i ? r(i) : eu(o, e, t, n, r));
}
function eu(e, t, n, r, i) {
  const o = e.pop();
  return o ? kp(e, o, t, n, r, i) : i();
}
function kp(e, t, n, r, i, o) {
  const s = ur.join(n, t), a = ur.join(r, t);
  fr.checkPaths(s, a, "copy", i, (l, p) => {
    if (l) return o(l);
    const { destStat: c } = p;
    Ip(c, s, a, i, (u) => u ? o(u) : eu(e, n, r, i, o));
  });
}
function Mp(e, t, n, r, i) {
  Be.readlink(t, (o, s) => {
    if (o) return i(o);
    if (r.dereference && (s = ur.resolve(process.cwd(), s)), e)
      Be.readlink(n, (a, l) => a ? a.code === "EINVAL" || a.code === "UNKNOWN" ? Be.symlink(s, n, i) : i(a) : (r.dereference && (l = ur.resolve(process.cwd(), l)), fr.isSrcSubdir(s, l) ? i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && fr.isSrcSubdir(l, s) ? i(new Error(`Cannot overwrite '${l}' with '${s}'.`)) : jp(s, n, i)));
    else
      return Be.symlink(s, n, i);
  });
}
function jp(e, t, n) {
  Be.unlink(t, (r) => r ? n(r) : Be.symlink(e, t, n));
}
var Bp = $p;
const Re = Me, dr = ce, Hp = ht.mkdirsSync, qp = Yc.utimesMillisSync, hr = kn;
function Gp(e, t, n) {
  typeof n == "function" && (n = { filter: n }), n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: r, destStat: i } = hr.checkPathsSync(e, t, "copy", n);
  return hr.checkParentPathsSync(e, r, t, "copy"), zp(i, e, t, n);
}
function zp(e, t, n, r) {
  if (r.filter && !r.filter(t, n)) return;
  const i = dr.dirname(n);
  return Re.existsSync(i) || Hp(i), tu(e, t, n, r);
}
function Wp(e, t, n, r) {
  if (!(r.filter && !r.filter(t, n)))
    return tu(e, t, n, r);
}
function tu(e, t, n, r) {
  const o = (r.dereference ? Re.statSync : Re.lstatSync)(t);
  if (o.isDirectory()) return Zp(o, e, t, n, r);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return Vp(o, e, t, n, r);
  if (o.isSymbolicLink()) return nm(e, t, n, r);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function Vp(e, t, n, r, i) {
  return t ? Yp(e, n, r, i) : nu(e, n, r, i);
}
function Yp(e, t, n, r) {
  if (r.overwrite)
    return Re.unlinkSync(n), nu(e, t, n, r);
  if (r.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
function nu(e, t, n, r) {
  return Re.copyFileSync(t, n), r.preserveTimestamps && Xp(e.mode, t, n), As(n, e.mode);
}
function Xp(e, t, n) {
  return Jp(e) && Kp(n, e), Qp(t, n);
}
function Jp(e) {
  return (e & 128) === 0;
}
function Kp(e, t) {
  return As(e, t | 128);
}
function As(e, t) {
  return Re.chmodSync(e, t);
}
function Qp(e, t) {
  const n = Re.statSync(e);
  return qp(t, n.atime, n.mtime);
}
function Zp(e, t, n, r, i) {
  return t ? ru(n, r, i) : em(e.mode, n, r, i);
}
function em(e, t, n, r) {
  return Re.mkdirSync(n), ru(t, n, r), As(n, e);
}
function ru(e, t, n) {
  Re.readdirSync(e).forEach((r) => tm(r, e, t, n));
}
function tm(e, t, n, r) {
  const i = dr.join(t, e), o = dr.join(n, e), { destStat: s } = hr.checkPathsSync(i, o, "copy", r);
  return Wp(s, i, o, r);
}
function nm(e, t, n, r) {
  let i = Re.readlinkSync(t);
  if (r.dereference && (i = dr.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = Re.readlinkSync(n);
    } catch (s) {
      if (s.code === "EINVAL" || s.code === "UNKNOWN") return Re.symlinkSync(i, n);
      throw s;
    }
    if (r.dereference && (o = dr.resolve(process.cwd(), o)), hr.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (Re.statSync(n).isDirectory() && hr.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return rm(i, n);
  } else
    return Re.symlinkSync(i, n);
}
function rm(e, t) {
  return Re.unlinkSync(t), Re.symlinkSync(e, t);
}
var im = Gp;
const om = ke.fromCallback;
var Cs = {
  copy: om(Bp),
  copySync: im
};
const Ha = Me, iu = ce, ae = Ic, pr = process.platform === "win32";
function ou(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((n) => {
    e[n] = e[n] || Ha[n], n = n + "Sync", e[n] = e[n] || Ha[n];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function $s(e, t, n) {
  let r = 0;
  typeof t == "function" && (n = t, t = {}), ae(e, "rimraf: missing path"), ae.strictEqual(typeof e, "string", "rimraf: path should be a string"), ae.strictEqual(typeof n, "function", "rimraf: callback function required"), ae(t, "rimraf: invalid options argument provided"), ae.strictEqual(typeof t, "object", "rimraf: options should be object"), ou(t), qa(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && r < t.maxBusyTries) {
        r++;
        const s = r * 100;
        return setTimeout(() => qa(e, t, i), s);
      }
      o.code === "ENOENT" && (o = null);
    }
    n(o);
  });
}
function qa(e, t, n) {
  ae(e), ae(t), ae(typeof n == "function"), t.lstat(e, (r, i) => {
    if (r && r.code === "ENOENT")
      return n(null);
    if (r && r.code === "EPERM" && pr)
      return Ga(e, t, r, n);
    if (i && i.isDirectory())
      return li(e, t, r, n);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return n(null);
        if (o.code === "EPERM")
          return pr ? Ga(e, t, o, n) : li(e, t, o, n);
        if (o.code === "EISDIR")
          return li(e, t, o, n);
      }
      return n(o);
    });
  });
}
function Ga(e, t, n, r) {
  ae(e), ae(t), ae(typeof r == "function"), t.chmod(e, 438, (i) => {
    i ? r(i.code === "ENOENT" ? null : n) : t.stat(e, (o, s) => {
      o ? r(o.code === "ENOENT" ? null : n) : s.isDirectory() ? li(e, t, n, r) : t.unlink(e, r);
    });
  });
}
function za(e, t, n) {
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
  r.isDirectory() ? ci(e, t, n) : t.unlinkSync(e);
}
function li(e, t, n, r) {
  ae(e), ae(t), ae(typeof r == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? sm(e, t, r) : i && i.code === "ENOTDIR" ? r(n) : r(i);
  });
}
function sm(e, t, n) {
  ae(e), ae(t), ae(typeof n == "function"), t.readdir(e, (r, i) => {
    if (r) return n(r);
    let o = i.length, s;
    if (o === 0) return t.rmdir(e, n);
    i.forEach((a) => {
      $s(iu.join(e, a), t, (l) => {
        if (!s) {
          if (l) return n(s = l);
          --o === 0 && t.rmdir(e, n);
        }
      });
    });
  });
}
function su(e, t) {
  let n;
  t = t || {}, ou(t), ae(e, "rimraf: missing path"), ae.strictEqual(typeof e, "string", "rimraf: path should be a string"), ae(t, "rimraf: missing options"), ae.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    n = t.lstatSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    r.code === "EPERM" && pr && za(e, t, r);
  }
  try {
    n && n.isDirectory() ? ci(e, t, null) : t.unlinkSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    if (r.code === "EPERM")
      return pr ? za(e, t, r) : ci(e, t, r);
    if (r.code !== "EISDIR")
      throw r;
    ci(e, t, r);
  }
}
function ci(e, t, n) {
  ae(e), ae(t);
  try {
    t.rmdirSync(e);
  } catch (r) {
    if (r.code === "ENOTDIR")
      throw n;
    if (r.code === "ENOTEMPTY" || r.code === "EEXIST" || r.code === "EPERM")
      am(e, t);
    else if (r.code !== "ENOENT")
      throw r;
  }
}
function am(e, t) {
  if (ae(e), ae(t), t.readdirSync(e).forEach((n) => su(iu.join(e, n), t)), pr) {
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
var lm = $s;
$s.sync = su;
const wi = Me, cm = ke.fromCallback, au = lm;
function um(e, t) {
  if (wi.rm) return wi.rm(e, { recursive: !0, force: !0 }, t);
  au(e, t);
}
function fm(e) {
  if (wi.rmSync) return wi.rmSync(e, { recursive: !0, force: !0 });
  au.sync(e);
}
var Ni = {
  remove: cm(um),
  removeSync: fm
};
const dm = ke.fromPromise, lu = un, cu = ce, uu = ht, fu = Ni, Wa = dm(async function(t) {
  let n;
  try {
    n = await lu.readdir(t);
  } catch {
    return uu.mkdirs(t);
  }
  return Promise.all(n.map((r) => fu.remove(cu.join(t, r))));
});
function Va(e) {
  let t;
  try {
    t = lu.readdirSync(e);
  } catch {
    return uu.mkdirsSync(e);
  }
  t.forEach((n) => {
    n = cu.join(e, n), fu.removeSync(n);
  });
}
var hm = {
  emptyDirSync: Va,
  emptydirSync: Va,
  emptyDir: Wa,
  emptydir: Wa
};
const pm = ke.fromCallback, du = ce, Nt = Me, hu = ht;
function mm(e, t) {
  function n() {
    Nt.writeFile(e, "", (r) => {
      if (r) return t(r);
      t();
    });
  }
  Nt.stat(e, (r, i) => {
    if (!r && i.isFile()) return t();
    const o = du.dirname(e);
    Nt.stat(o, (s, a) => {
      if (s)
        return s.code === "ENOENT" ? hu.mkdirs(o, (l) => {
          if (l) return t(l);
          n();
        }) : t(s);
      a.isDirectory() ? n() : Nt.readdir(o, (l) => {
        if (l) return t(l);
      });
    });
  });
}
function gm(e) {
  let t;
  try {
    t = Nt.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const n = du.dirname(e);
  try {
    Nt.statSync(n).isDirectory() || Nt.readdirSync(n);
  } catch (r) {
    if (r && r.code === "ENOENT") hu.mkdirsSync(n);
    else throw r;
  }
  Nt.writeFileSync(e, "");
}
var ym = {
  createFile: pm(mm),
  createFileSync: gm
};
const Em = ke.fromCallback, pu = ce, Pt = Me, mu = ht, wm = fn.pathExists, { areIdentical: gu } = kn;
function vm(e, t, n) {
  function r(i, o) {
    Pt.link(i, o, (s) => {
      if (s) return n(s);
      n(null);
    });
  }
  Pt.lstat(t, (i, o) => {
    Pt.lstat(e, (s, a) => {
      if (s)
        return s.message = s.message.replace("lstat", "ensureLink"), n(s);
      if (o && gu(a, o)) return n(null);
      const l = pu.dirname(t);
      wm(l, (p, c) => {
        if (p) return n(p);
        if (c) return r(e, t);
        mu.mkdirs(l, (u) => {
          if (u) return n(u);
          r(e, t);
        });
      });
    });
  });
}
function _m(e, t) {
  let n;
  try {
    n = Pt.lstatSync(t);
  } catch {
  }
  try {
    const o = Pt.lstatSync(e);
    if (n && gu(o, n)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const r = pu.dirname(t);
  return Pt.existsSync(r) || mu.mkdirsSync(r), Pt.linkSync(e, t);
}
var xm = {
  createLink: Em(vm),
  createLinkSync: _m
};
const Ft = ce, sr = Me, bm = fn.pathExists;
function Sm(e, t, n) {
  if (Ft.isAbsolute(e))
    return sr.lstat(e, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), n(r)) : n(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const r = Ft.dirname(t), i = Ft.join(r, e);
    return bm(i, (o, s) => o ? n(o) : s ? n(null, {
      toCwd: i,
      toDst: e
    }) : sr.lstat(e, (a) => a ? (a.message = a.message.replace("lstat", "ensureSymlink"), n(a)) : n(null, {
      toCwd: e,
      toDst: Ft.relative(r, e)
    })));
  }
}
function Tm(e, t) {
  let n;
  if (Ft.isAbsolute(e)) {
    if (n = sr.existsSync(e), !n) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const r = Ft.dirname(t), i = Ft.join(r, e);
    if (n = sr.existsSync(i), n)
      return {
        toCwd: i,
        toDst: e
      };
    if (n = sr.existsSync(e), !n) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: Ft.relative(r, e)
    };
  }
}
var Am = {
  symlinkPaths: Sm,
  symlinkPathsSync: Tm
};
const yu = Me;
function Cm(e, t, n) {
  if (n = typeof t == "function" ? t : n, t = typeof t == "function" ? !1 : t, t) return n(null, t);
  yu.lstat(e, (r, i) => {
    if (r) return n(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", n(null, t);
  });
}
function $m(e, t) {
  let n;
  if (t) return t;
  try {
    n = yu.lstatSync(e);
  } catch {
    return "file";
  }
  return n && n.isDirectory() ? "dir" : "file";
}
var Im = {
  symlinkType: Cm,
  symlinkTypeSync: $m
};
const Om = ke.fromCallback, Eu = ce, tt = un, wu = ht, Dm = wu.mkdirs, Rm = wu.mkdirsSync, vu = Am, Pm = vu.symlinkPaths, Nm = vu.symlinkPathsSync, _u = Im, Fm = _u.symlinkType, Lm = _u.symlinkTypeSync, Um = fn.pathExists, { areIdentical: xu } = kn;
function km(e, t, n, r) {
  r = typeof n == "function" ? n : r, n = typeof n == "function" ? !1 : n, tt.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      tt.stat(e),
      tt.stat(t)
    ]).then(([s, a]) => {
      if (xu(s, a)) return r(null);
      Ya(e, t, n, r);
    }) : Ya(e, t, n, r);
  });
}
function Ya(e, t, n, r) {
  Pm(e, t, (i, o) => {
    if (i) return r(i);
    e = o.toDst, Fm(o.toCwd, n, (s, a) => {
      if (s) return r(s);
      const l = Eu.dirname(t);
      Um(l, (p, c) => {
        if (p) return r(p);
        if (c) return tt.symlink(e, t, a, r);
        Dm(l, (u) => {
          if (u) return r(u);
          tt.symlink(e, t, a, r);
        });
      });
    });
  });
}
function Mm(e, t, n) {
  let r;
  try {
    r = tt.lstatSync(t);
  } catch {
  }
  if (r && r.isSymbolicLink()) {
    const a = tt.statSync(e), l = tt.statSync(t);
    if (xu(a, l)) return;
  }
  const i = Nm(e, t);
  e = i.toDst, n = Lm(i.toCwd, n);
  const o = Eu.dirname(t);
  return tt.existsSync(o) || Rm(o), tt.symlinkSync(e, t, n);
}
var jm = {
  createSymlink: Om(km),
  createSymlinkSync: Mm
};
const { createFile: Xa, createFileSync: Ja } = ym, { createLink: Ka, createLinkSync: Qa } = xm, { createSymlink: Za, createSymlinkSync: el } = jm;
var Bm = {
  // file
  createFile: Xa,
  createFileSync: Ja,
  ensureFile: Xa,
  ensureFileSync: Ja,
  // link
  createLink: Ka,
  createLinkSync: Qa,
  ensureLink: Ka,
  ensureLinkSync: Qa,
  // symlink
  createSymlink: Za,
  createSymlinkSync: el,
  ensureSymlink: Za,
  ensureSymlinkSync: el
};
function Hm(e, { EOL: t = `
`, finalEOL: n = !0, replacer: r = null, spaces: i } = {}) {
  const o = n ? t : "", s = JSON.stringify(e, r, i);
  if (s === void 0)
    throw new TypeError(`Converting ${typeof e} value to JSON is not supported`);
  return s.replace(/\n/g, t) + o;
}
function qm(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var Is = { stringify: Hm, stripBom: qm };
let Pn;
try {
  Pn = Me;
} catch {
  Pn = rt;
}
const Fi = ke, { stringify: bu, stripBom: Su } = Is;
async function Gm(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || Pn, r = "throws" in t ? t.throws : !0;
  let i = await Fi.fromCallback(n.readFile)(e, t);
  i = Su(i);
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
const zm = Fi.fromPromise(Gm);
function Wm(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || Pn, r = "throws" in t ? t.throws : !0;
  try {
    let i = n.readFileSync(e, t);
    return i = Su(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (r)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function Vm(e, t, n = {}) {
  const r = n.fs || Pn, i = bu(t, n);
  await Fi.fromCallback(r.writeFile)(e, i, n);
}
const Ym = Fi.fromPromise(Vm);
function Xm(e, t, n = {}) {
  const r = n.fs || Pn, i = bu(t, n);
  return r.writeFileSync(e, i, n);
}
var Jm = {
  readFile: zm,
  readFileSync: Wm,
  writeFile: Ym,
  writeFileSync: Xm
};
const Jr = Jm;
var Km = {
  // jsonfile exports
  readJson: Jr.readFile,
  readJsonSync: Jr.readFileSync,
  writeJson: Jr.writeFile,
  writeJsonSync: Jr.writeFileSync
};
const Qm = ke.fromCallback, ar = Me, Tu = ce, Au = ht, Zm = fn.pathExists;
function e0(e, t, n, r) {
  typeof n == "function" && (r = n, n = "utf8");
  const i = Tu.dirname(e);
  Zm(i, (o, s) => {
    if (o) return r(o);
    if (s) return ar.writeFile(e, t, n, r);
    Au.mkdirs(i, (a) => {
      if (a) return r(a);
      ar.writeFile(e, t, n, r);
    });
  });
}
function t0(e, ...t) {
  const n = Tu.dirname(e);
  if (ar.existsSync(n))
    return ar.writeFileSync(e, ...t);
  Au.mkdirsSync(n), ar.writeFileSync(e, ...t);
}
var Os = {
  outputFile: Qm(e0),
  outputFileSync: t0
};
const { stringify: n0 } = Is, { outputFile: r0 } = Os;
async function i0(e, t, n = {}) {
  const r = n0(t, n);
  await r0(e, r, n);
}
var o0 = i0;
const { stringify: s0 } = Is, { outputFileSync: a0 } = Os;
function l0(e, t, n) {
  const r = s0(t, n);
  a0(e, r, n);
}
var c0 = l0;
const u0 = ke.fromPromise, Ue = Km;
Ue.outputJson = u0(o0);
Ue.outputJsonSync = c0;
Ue.outputJSON = Ue.outputJson;
Ue.outputJSONSync = Ue.outputJsonSync;
Ue.writeJSON = Ue.writeJson;
Ue.writeJSONSync = Ue.writeJsonSync;
Ue.readJSON = Ue.readJson;
Ue.readJSONSync = Ue.readJsonSync;
var f0 = Ue;
const d0 = Me, Qo = ce, h0 = Cs.copy, Cu = Ni.remove, p0 = ht.mkdirp, m0 = fn.pathExists, tl = kn;
function g0(e, t, n, r) {
  typeof n == "function" && (r = n, n = {}), n = n || {};
  const i = n.overwrite || n.clobber || !1;
  tl.checkPaths(e, t, "move", n, (o, s) => {
    if (o) return r(o);
    const { srcStat: a, isChangingCase: l = !1 } = s;
    tl.checkParentPaths(e, a, t, "move", (p) => {
      if (p) return r(p);
      if (y0(t)) return nl(e, t, i, l, r);
      p0(Qo.dirname(t), (c) => c ? r(c) : nl(e, t, i, l, r));
    });
  });
}
function y0(e) {
  const t = Qo.dirname(e);
  return Qo.parse(t).root === t;
}
function nl(e, t, n, r, i) {
  if (r) return So(e, t, n, i);
  if (n)
    return Cu(t, (o) => o ? i(o) : So(e, t, n, i));
  m0(t, (o, s) => o ? i(o) : s ? i(new Error("dest already exists.")) : So(e, t, n, i));
}
function So(e, t, n, r) {
  d0.rename(e, t, (i) => i ? i.code !== "EXDEV" ? r(i) : E0(e, t, n, r) : r());
}
function E0(e, t, n, r) {
  h0(e, t, {
    overwrite: n,
    errorOnExist: !0
  }, (o) => o ? r(o) : Cu(e, r));
}
var w0 = g0;
const $u = Me, Zo = ce, v0 = Cs.copySync, Iu = Ni.removeSync, _0 = ht.mkdirpSync, rl = kn;
function x0(e, t, n) {
  n = n || {};
  const r = n.overwrite || n.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = rl.checkPathsSync(e, t, "move", n);
  return rl.checkParentPathsSync(e, i, t, "move"), b0(t) || _0(Zo.dirname(t)), S0(e, t, r, o);
}
function b0(e) {
  const t = Zo.dirname(e);
  return Zo.parse(t).root === t;
}
function S0(e, t, n, r) {
  if (r) return To(e, t, n);
  if (n)
    return Iu(t), To(e, t, n);
  if ($u.existsSync(t)) throw new Error("dest already exists.");
  return To(e, t, n);
}
function To(e, t, n) {
  try {
    $u.renameSync(e, t);
  } catch (r) {
    if (r.code !== "EXDEV") throw r;
    return T0(e, t, n);
  }
}
function T0(e, t, n) {
  return v0(e, t, {
    overwrite: n,
    errorOnExist: !0
  }), Iu(e);
}
var A0 = x0;
const C0 = ke.fromCallback;
var $0 = {
  move: C0(w0),
  moveSync: A0
}, Ht = {
  // Export promiseified graceful-fs:
  ...un,
  // Export extra methods:
  ...Cs,
  ...hm,
  ...Bm,
  ...f0,
  ...ht,
  ...$0,
  ...Os,
  ...fn,
  ...Ni
}, Vn = {}, Jt = {}, Ce = {}, Ds = {}, ot = {};
function Ou(e) {
  return typeof e > "u" || e === null;
}
function I0(e) {
  return typeof e == "object" && e !== null;
}
function O0(e) {
  return Array.isArray(e) ? e : Ou(e) ? [] : [e];
}
function D0(e, t) {
  if (t) {
    const n = Object.keys(t);
    for (let r = 0, i = n.length; r < i; r += 1) {
      const o = n[r];
      e[o] = t[o];
    }
  }
  return e;
}
function R0(e, t) {
  let n = "";
  for (let r = 0; r < t; r += 1)
    n += e;
  return n;
}
function P0(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
ot.isNothing = Ou;
ot.isObject = I0;
ot.toArray = O0;
ot.repeat = R0;
ot.isNegativeZero = P0;
ot.extend = D0;
function Du(e, t) {
  let n = "";
  const r = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (n += 'in "' + e.mark.name + '" '), n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (n += `

` + e.mark.snippet), r + " " + n) : r;
}
function mr(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = Du(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
mr.prototype = Object.create(Error.prototype);
mr.prototype.constructor = mr;
mr.prototype.toString = function(t) {
  return this.name + ": " + Du(this, t);
};
var Sr = mr;
const tr = ot;
function Ao(e, t, n, r, i) {
  let o = "", s = "";
  const a = Math.floor(i / 2) - 1;
  return r - t > a && (o = " ... ", t = r - a + o.length), n - r > a && (s = " ...", n = r + a - s.length), {
    str: o + e.slice(t, n).replace(/\t/g, "→") + s,
    pos: r - t + o.length
    // relative position
  };
}
function Co(e, t) {
  return tr.repeat(" ", t - e.length) + e;
}
function N0(e, t) {
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
    const d = Ao(
      e.buffer,
      r[s - u],
      i[s - u],
      e.position - (r[s] - r[s - u]),
      p
    );
    a = tr.repeat(" ", t.indent) + Co((e.line - u + 1).toString(), l) + " | " + d.str + `
` + a;
  }
  const c = Ao(e.buffer, r[s], i[s], e.position, p);
  a += tr.repeat(" ", t.indent) + Co((e.line + 1).toString(), l) + " | " + c.str + `
`, a += tr.repeat("-", t.indent + l + 3 + c.pos) + `^
`;
  for (let u = 1; u <= t.linesAfter && !(s + u >= i.length); u++) {
    const d = Ao(
      e.buffer,
      r[s + u],
      i[s + u],
      e.position - (r[s] - r[s + u]),
      p
    );
    a += tr.repeat(" ", t.indent) + Co((e.line + u + 1).toString(), l) + " | " + d.str + `
`;
  }
  return a.replace(/\n$/, "");
}
var F0 = N0;
const il = Sr, L0 = [
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
], U0 = [
  "scalar",
  "sequence",
  "mapping"
];
function k0(e) {
  const t = {};
  return e !== null && Object.keys(e).forEach(function(n) {
    e[n].forEach(function(r) {
      t[String(r)] = n;
    });
  }), t;
}
function M0(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(n) {
    if (L0.indexOf(n) === -1)
      throw new il('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(n) {
    return n;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = k0(t.styleAliases || null), U0.indexOf(this.kind) === -1)
    throw new il('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var je = M0;
const Yn = Sr, $o = je;
function ol(e, t) {
  const n = [];
  return e[t].forEach(function(r) {
    let i = n.length;
    n.forEach(function(o, s) {
      o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (i = s);
    }), n[i] = r;
  }), n;
}
function j0() {
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
function es(e) {
  return this.extend(e);
}
es.prototype.extend = function(t) {
  let n = [], r = [];
  if (t instanceof $o)
    r.push(t);
  else if (Array.isArray(t))
    r = r.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (n = n.concat(t.implicit)), t.explicit && (r = r.concat(t.explicit));
  else
    throw new Yn("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  n.forEach(function(o) {
    if (!(o instanceof $o))
      throw new Yn("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new Yn("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new Yn("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(o) {
    if (!(o instanceof $o))
      throw new Yn("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  const i = Object.create(es.prototype);
  return i.implicit = (this.implicit || []).concat(n), i.explicit = (this.explicit || []).concat(r), i.compiledImplicit = ol(i, "implicit"), i.compiledExplicit = ol(i, "explicit"), i.compiledTypeMap = j0(i.compiledImplicit, i.compiledExplicit), i;
};
var Ru = es;
const B0 = je;
var Pu = new B0("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
});
const H0 = je;
var Nu = new H0("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
});
const q0 = je;
var Fu = new q0("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
});
const G0 = Ru;
var Lu = new G0({
  explicit: [
    Pu,
    Nu,
    Fu
  ]
});
const z0 = je;
function W0(e) {
  if (e === null) return !0;
  const t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function V0() {
  return null;
}
function Y0(e) {
  return e === null;
}
var Uu = new z0("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: W0,
  construct: V0,
  predicate: Y0,
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
const X0 = je;
function J0(e) {
  if (e === null) return !1;
  const t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function K0(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Q0(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var ku = new X0("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: J0,
  construct: K0,
  predicate: Q0,
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
const Z0 = ot, eg = je;
function tg(e) {
  return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function ng(e) {
  return e >= 48 && e <= 55;
}
function rg(e) {
  return e >= 48 && e <= 57;
}
function ig(e) {
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
      return r && isFinite(nr(e));
    }
    if (i === "x") {
      for (n++; n < t; n++) {
        if (!tg(e.charCodeAt(n))) return !1;
        r = !0;
      }
      return r && isFinite(nr(e));
    }
    if (i === "o") {
      for (n++; n < t; n++) {
        if (!ng(e.charCodeAt(n))) return !1;
        r = !0;
      }
      return r && isFinite(nr(e));
    }
  }
  for (; n < t; n++) {
    if (!rg(e.charCodeAt(n)))
      return !1;
    r = !0;
  }
  return r ? isFinite(nr(e)) : !1;
}
function nr(e) {
  let t = e, n = 1, r = t[0];
  if ((r === "-" || r === "+") && (r === "-" && (n = -1), t = t.slice(1), r = t[0]), t === "0") return 0;
  if (r === "0") {
    if (t[1] === "b") return n * parseInt(t.slice(2), 2);
    if (t[1] === "x") return n * parseInt(t.slice(2), 16);
    if (t[1] === "o") return n * parseInt(t.slice(2), 8);
  }
  return n * parseInt(t, 10);
}
function og(e) {
  return nr(e);
}
function sg(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !Z0.isNegativeZero(e);
}
var Mu = new eg("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: ig,
  construct: og,
  predicate: sg,
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
const ju = ot, ag = je, lg = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
), cg = new RegExp(
  "^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function ug(e) {
  return e === null || !lg.test(e) ? !1 : isFinite(parseFloat(e, 10)) ? !0 : cg.test(e);
}
function fg(e) {
  let t = e.toLowerCase();
  const n = t[0] === "-" ? -1 : 1;
  return "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : n * parseFloat(t, 10);
}
const dg = /^[-+]?[0-9]+e/;
function hg(e, t) {
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
  else if (ju.isNegativeZero(e))
    return "-0.0";
  const n = e.toString(10);
  return dg.test(n) ? n.replace("e", ".e") : n;
}
function pg(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || ju.isNegativeZero(e));
}
var Bu = new ag("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: ug,
  construct: fg,
  predicate: pg,
  represent: hg,
  defaultStyle: "lowercase"
}), Hu = Lu.extend({
  implicit: [
    Uu,
    ku,
    Mu,
    Bu
  ]
}), qu = Hu;
const mg = je, Gu = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), zu = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function gg(e) {
  return e === null ? !1 : Gu.exec(e) !== null || zu.exec(e) !== null;
}
function yg(e) {
  let t = 0, n = null, r = Gu.exec(e);
  if (r === null && (r = zu.exec(e)), r === null) throw new Error("Date resolve error");
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
function Eg(e) {
  return e.toISOString();
}
var Wu = new mg("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: gg,
  construct: yg,
  instanceOf: Date,
  represent: Eg
});
const wg = je;
function vg(e) {
  return e === "<<" || e === null;
}
var Vu = new wg("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: vg
});
const _g = je, Rs = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function xg(e) {
  if (e === null) return !1;
  let t = 0;
  const n = e.length, r = Rs;
  for (let i = 0; i < n; i++) {
    const o = r.indexOf(e.charAt(i));
    if (!(o > 64)) {
      if (o < 0) return !1;
      t += 6;
    }
  }
  return t % 8 === 0;
}
function bg(e) {
  const t = e.replace(/[\r\n=]/g, ""), n = t.length, r = Rs;
  let i = 0;
  const o = [];
  for (let a = 0; a < n; a++)
    a % 4 === 0 && a && (o.push(i >> 16 & 255), o.push(i >> 8 & 255), o.push(i & 255)), i = i << 6 | r.indexOf(t.charAt(a));
  const s = n % 4 * 6;
  return s === 0 ? (o.push(i >> 16 & 255), o.push(i >> 8 & 255), o.push(i & 255)) : s === 18 ? (o.push(i >> 10 & 255), o.push(i >> 2 & 255)) : s === 12 && o.push(i >> 4 & 255), new Uint8Array(o);
}
function Sg(e) {
  let t = "", n = 0;
  const r = e.length, i = Rs;
  for (let s = 0; s < r; s++)
    s % 3 === 0 && s && (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]), n = (n << 8) + e[s];
  const o = r % 3;
  return o === 0 ? (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]) : o === 2 ? (t += i[n >> 10 & 63], t += i[n >> 4 & 63], t += i[n << 2 & 63], t += i[64]) : o === 1 && (t += i[n >> 2 & 63], t += i[n << 4 & 63], t += i[64], t += i[64]), t;
}
function Tg(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Yu = new _g("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: xg,
  construct: bg,
  predicate: Tg,
  represent: Sg
});
const Ag = je, sl = Object.prototype.hasOwnProperty, Cg = Object.prototype.toString;
function $g(e) {
  if (e === null) return !0;
  const t = {}, n = e;
  for (let r = 0, i = n.length; r < i; r += 1) {
    const o = n[r];
    let s = !1;
    if (Cg.call(o) !== "[object Object]") return !1;
    let a;
    for (a in o)
      if (sl.call(o, a))
        if (!s) s = !0;
        else return !1;
    if (!s || sl.call(t, a)) return !1;
    Object.defineProperty(t, a, { value: !0 });
  }
  return !0;
}
function Ig(e) {
  return e !== null ? e : [];
}
var Xu = new Ag("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: $g,
  construct: Ig
});
const Og = je, Dg = Object.prototype.toString;
function Rg(e) {
  if (e === null) return !0;
  const t = e, n = new Array(t.length);
  for (let r = 0, i = t.length; r < i; r += 1) {
    const o = t[r];
    if (Dg.call(o) !== "[object Object]") return !1;
    const s = Object.keys(o);
    if (s.length !== 1) return !1;
    n[r] = [s[0], o[s[0]]];
  }
  return !0;
}
function Pg(e) {
  if (e === null) return [];
  const t = e, n = new Array(t.length);
  for (let r = 0, i = t.length; r < i; r += 1) {
    const o = t[r], s = Object.keys(o);
    n[r] = [s[0], o[s[0]]];
  }
  return n;
}
var Ju = new Og("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Rg,
  construct: Pg
});
const Ng = je, Fg = Object.prototype.hasOwnProperty;
function Lg(e) {
  if (e === null) return !0;
  const t = e;
  for (const n in t)
    if (Fg.call(t, n) && t[n] !== null)
      return !1;
  return !0;
}
function Ug(e) {
  return e !== null ? e : {};
}
var Ku = new Ng("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Lg,
  construct: Ug
}), Ps = qu.extend({
  implicit: [
    Wu,
    Vu
  ],
  explicit: [
    Yu,
    Xu,
    Ju,
    Ku
  ]
});
const Zt = ot, Qu = Sr, kg = F0, Mg = Ps, nt = Object.prototype.hasOwnProperty, vi = 1, Zu = 2, ef = 3, _i = 4, Io = 1, jg = 2, al = 3, Bg = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Hg = /[\x85\u2028\u2029]/, qg = /[,\[\]{}]/, tf = /^(?:!|!!|![0-9A-Za-z-]+!)$/, nf = /^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;
function ll(e) {
  return Object.prototype.toString.call(e);
}
function ft(e) {
  return e === 10 || e === 13;
}
function vt(e) {
  return e === 9 || e === 32;
}
function He(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function _n(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Gg(e) {
  if (e >= 48 && e <= 57)
    return e - 48;
  const t = e | 32;
  return t >= 97 && t <= 102 ? t - 97 + 10 : -1;
}
function zg(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function Wg(e) {
  return e >= 48 && e <= 57 ? e - 48 : -1;
}
function cl(e) {
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
function Vg(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
function rf(e, t, n) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: n
  }) : e[t] = n;
}
const of = new Array(256), sf = new Array(256);
for (let e = 0; e < 256; e++)
  of[e] = cl(e) ? 1 : 0, sf[e] = cl(e);
function Yg(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || Mg, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.maxDepth = typeof t.maxDepth == "number" ? t.maxDepth : 100, this.maxTotalMergeKeys = typeof t.maxTotalMergeKeys == "number" ? t.maxTotalMergeKeys : 1e4, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.depth = 0, this.totalMergeKeys = 0, this.firstTabInLine = -1, this.documents = [], this.anchorMapTransactions = [];
}
function af(e, t) {
  const n = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return n.snippet = kg(n), new Qu(t, n);
}
function V(e, t) {
  throw af(e, t);
}
function xi(e, t) {
  e.onWarning && e.onWarning.call(null, af(e, t));
}
function tn(e, t, n) {
  const r = e.anchorMapTransactions;
  if (r.length !== 0) {
    const i = r[r.length - 1];
    nt.call(i, t) || (i[t] = {
      existed: nt.call(e.anchorMap, t),
      value: e.anchorMap[t]
    });
  }
  e.anchorMap[t] = n;
}
function Xg(e) {
  e.anchorMapTransactions.push(/* @__PURE__ */ Object.create(null));
}
function Jg(e) {
  const t = e.anchorMapTransactions.pop(), n = e.anchorMapTransactions;
  if (n.length === 0) return;
  const r = n[n.length - 1], i = Object.keys(t);
  for (let o = 0, s = i.length; o < s; o += 1) {
    const a = i[o];
    nt.call(r, a) || (r[a] = t[a]);
  }
}
function Kg(e) {
  const t = e.anchorMapTransactions.pop(), n = Object.keys(t);
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const i = t[n[r]];
    i.existed ? e.anchorMap[n[r]] = i.value : delete e.anchorMap[n[r]];
  }
}
function lf(e) {
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
function ul(e, t) {
  e.position = t.position, e.line = t.line, e.lineStart = t.lineStart, e.lineIndent = t.lineIndent, e.firstTabInLine = t.firstTabInLine, e.tag = t.tag, e.anchor = t.anchor, e.kind = t.kind, e.result = t.result;
}
const fl = {
  YAML: function(t, n, r) {
    t.version !== null && V(t, "duplication of %YAML directive"), r.length !== 1 && V(t, "YAML directive accepts exactly one argument");
    const i = /^([0-9]+)\.([0-9]+)$/.exec(r[0]);
    i === null && V(t, "ill-formed argument of the YAML directive");
    const o = parseInt(i[1], 10), s = parseInt(i[2], 10);
    o !== 1 && V(t, "unacceptable YAML version of the document"), t.version = r[0], t.checkLineBreaks = s < 2, s !== 1 && s !== 2 && xi(t, "unsupported YAML version of the document");
  },
  TAG: function(t, n, r) {
    let i;
    r.length !== 2 && V(t, "TAG directive accepts exactly two arguments");
    const o = r[0];
    i = r[1], tf.test(o) || V(t, "ill-formed tag handle (first argument) of the TAG directive"), nt.call(t.tagMap, o) && V(t, 'there is a previously declared suffix for "' + o + '" tag handle'), nf.test(i) || V(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      i = decodeURIComponent(i);
    } catch {
      V(t, "tag prefix is malformed: " + i);
    }
    t.tagMap[o] = i;
  }
};
function Ut(e, t, n, r) {
  if (t < n) {
    const i = e.input.slice(t, n);
    if (r)
      for (let o = 0, s = i.length; o < s; o += 1) {
        const a = i.charCodeAt(o);
        a === 9 || a >= 32 && a <= 1114111 || V(e, "expected valid JSON character");
      }
    else Bg.test(i) && V(e, "the stream contains non-printable characters");
    e.result += i;
  }
}
function dl(e, t, n, r) {
  Zt.isObject(n) || V(e, "cannot merge mappings; the provided source object is unacceptable");
  const i = Object.keys(n);
  for (let o = 0, s = i.length; o < s; o += 1) {
    const a = i[o];
    e.maxTotalMergeKeys !== -1 && ++e.totalMergeKeys > e.maxTotalMergeKeys && V(e, "merge keys exceeded maxTotalMergeKeys (" + e.maxTotalMergeKeys + ")"), nt.call(t, a) || (rf(t, a, n[a]), r[a] = !0);
  }
}
function xn(e, t, n, r, i, o, s, a, l) {
  if (Array.isArray(i)) {
    i = Array.prototype.slice.call(i);
    for (let p = 0, c = i.length; p < c; p += 1)
      Array.isArray(i[p]) && V(e, "nested arrays are not supported inside keys"), typeof i == "object" && ll(i[p]) === "[object Object]" && (i[p] = "[object Object]");
  }
  if (typeof i == "object" && ll(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(o))
      for (let p = 0, c = o.length; p < c; p += 1)
        dl(e, t, o[p], n);
    else
      dl(e, t, o, n);
  else
    !e.json && !nt.call(n, i) && nt.call(t, i) && (e.line = s || e.line, e.lineStart = a || e.lineStart, e.position = l || e.position, V(e, "duplicated mapping key")), rf(t, i, o), delete n[i];
  return t;
}
function Ns(e) {
  const t = e.input.charCodeAt(e.position);
  t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : V(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function ge(e, t, n) {
  let r = 0, i = e.input.charCodeAt(e.position);
  for (; i !== 0; ) {
    for (; vt(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (ft(i))
      for (Ns(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return n !== -1 && r !== 0 && e.lineIndent < n && xi(e, "deficient indentation"), r;
}
function Li(e) {
  let t = e.position, n = e.input.charCodeAt(t);
  return !!((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2) && (t += 3, n = e.input.charCodeAt(t), n === 0 || He(n)));
}
function Fs(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += Zt.repeat(`
`, t - 1));
}
function Qg(e, t, n) {
  let r, i, o, s, a, l;
  const p = e.kind, c = e.result;
  let u = e.input.charCodeAt(e.position);
  if (He(u) || _n(u) || u === 35 || u === 38 || u === 42 || u === 33 || u === 124 || u === 62 || u === 39 || u === 34 || u === 37 || u === 64 || u === 96)
    return !1;
  if (u === 63 || u === 45) {
    const d = e.input.charCodeAt(e.position + 1);
    if (He(d) || n && _n(d))
      return !1;
  }
  for (e.kind = "scalar", e.result = "", r = i = e.position, o = !1; u !== 0; ) {
    if (u === 58) {
      const d = e.input.charCodeAt(e.position + 1);
      if (He(d) || n && _n(d))
        break;
    } else if (u === 35) {
      const d = e.input.charCodeAt(e.position - 1);
      if (He(d))
        break;
    } else {
      if (e.position === e.lineStart && Li(e) || n && _n(u))
        break;
      if (ft(u))
        if (s = e.line, a = e.lineStart, l = e.lineIndent, ge(e, !1, -1), e.lineIndent >= t) {
          o = !0, u = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = i, e.line = s, e.lineStart = a, e.lineIndent = l;
          break;
        }
    }
    o && (Ut(e, r, i, !1), Fs(e, e.line - s), r = i = e.position, o = !1), vt(u) || (i = e.position + 1), u = e.input.charCodeAt(++e.position);
  }
  return Ut(e, r, i, !1), e.result ? !0 : (e.kind = p, e.result = c, !1);
}
function Zg(e, t) {
  let n, r, i = e.input.charCodeAt(e.position);
  if (i !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (i = e.input.charCodeAt(e.position)) !== 0; )
    if (i === 39)
      if (Ut(e, n, e.position, !0), i = e.input.charCodeAt(++e.position), i === 39)
        n = e.position, e.position++, r = e.position;
      else
        return !0;
    else ft(i) ? (Ut(e, n, r, !0), Fs(e, ge(e, !1, t)), n = r = e.position) : e.position === e.lineStart && Li(e) ? V(e, "unexpected end of the document within a single quoted scalar") : (e.position++, vt(i) || (r = e.position));
  V(e, "unexpected end of the stream within a single quoted scalar");
}
function ey(e, t) {
  let n, r, i, o = e.input.charCodeAt(e.position);
  if (o !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (o = e.input.charCodeAt(e.position)) !== 0; ) {
    if (o === 34)
      return Ut(e, n, e.position, !0), e.position++, !0;
    if (o === 92) {
      if (Ut(e, n, e.position, !0), o = e.input.charCodeAt(++e.position), ft(o))
        ge(e, !1, t);
      else if (o < 256 && of[o])
        e.result += sf[o], e.position++;
      else if ((i = zg(o)) > 0) {
        let s = i, a = 0;
        for (; s > 0; s--)
          o = e.input.charCodeAt(++e.position), (i = Gg(o)) >= 0 ? a = (a << 4) + i : V(e, "expected hexadecimal character");
        e.result += Vg(a), e.position++;
      } else
        V(e, "unknown escape sequence");
      n = r = e.position;
    } else ft(o) ? (Ut(e, n, r, !0), Fs(e, ge(e, !1, t)), n = r = e.position) : e.position === e.lineStart && Li(e) ? V(e, "unexpected end of the document within a double quoted scalar") : (e.position++, vt(o) || (r = e.position));
  }
  V(e, "unexpected end of the stream within a double quoted scalar");
}
function ty(e, t) {
  let n = !0, r, i, o;
  const s = e.tag;
  let a;
  const l = e.anchor;
  let p, c, u, d;
  const m = /* @__PURE__ */ Object.create(null);
  let v, y, w, b = e.input.charCodeAt(e.position);
  if (b === 91)
    p = 93, d = !1, a = [];
  else if (b === 123)
    p = 125, d = !0, a = {};
  else
    return !1;
  for (e.anchor !== null && tn(e, e.anchor, a), b = e.input.charCodeAt(++e.position); b !== 0; ) {
    if (ge(e, !0, t), b = e.input.charCodeAt(e.position), b === p)
      return e.position++, e.tag = s, e.anchor = l, e.kind = d ? "mapping" : "sequence", e.result = a, !0;
    if (n ? b === 44 && V(e, "expected the node content, but found ','") : V(e, "missed comma between flow collection entries"), y = v = w = null, c = u = !1, b === 63) {
      const $ = e.input.charCodeAt(e.position + 1);
      He($) && (c = u = !0, e.position++, ge(e, !0, t));
    }
    r = e.line, i = e.lineStart, o = e.position, Nn(e, t, vi, !1, !0), y = e.tag, v = e.result, ge(e, !0, t), b = e.input.charCodeAt(e.position), (u || e.line === r) && b === 58 && (c = !0, b = e.input.charCodeAt(++e.position), ge(e, !0, t), Nn(e, t, vi, !1, !0), w = e.result), d ? xn(e, a, m, y, v, w, r, i, o) : c ? a.push(xn(e, null, m, y, v, w, r, i, o)) : a.push(v), ge(e, !0, t), b = e.input.charCodeAt(e.position), b === 44 ? (n = !0, b = e.input.charCodeAt(++e.position)) : n = !1;
  }
  V(e, "unexpected end of the stream within a flow collection");
}
function ny(e, t) {
  let n, r = Io, i = !1, o = !1, s = t, a = 0, l = !1, p, c = e.input.charCodeAt(e.position);
  if (c === 124)
    n = !1;
  else if (c === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; c !== 0; )
    if (c = e.input.charCodeAt(++e.position), c === 43 || c === 45)
      Io === r ? r = c === 43 ? al : jg : V(e, "repeat of a chomping mode identifier");
    else if ((p = Wg(c)) >= 0)
      p === 0 ? V(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? V(e, "repeat of an indentation width identifier") : (s = t + p - 1, o = !0);
    else
      break;
  if (vt(c)) {
    do
      c = e.input.charCodeAt(++e.position);
    while (vt(c));
    if (c === 35)
      do
        c = e.input.charCodeAt(++e.position);
      while (!ft(c) && c !== 0);
  }
  for (; c !== 0; ) {
    for (Ns(e), e.lineIndent = 0, c = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && c === 32; )
      e.lineIndent++, c = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > s && (s = e.lineIndent), ft(c)) {
      a++;
      continue;
    }
    if (!o && s === 0 && V(e, "missing indentation for block scalar"), e.lineIndent < s) {
      r === al ? e.result += Zt.repeat(`
`, i ? 1 + a : a) : r === Io && i && (e.result += `
`);
      break;
    }
    n ? vt(c) ? (l = !0, e.result += Zt.repeat(`
`, i ? 1 + a : a)) : l ? (l = !1, e.result += Zt.repeat(`
`, a + 1)) : a === 0 ? i && (e.result += " ") : e.result += Zt.repeat(`
`, a) : e.result += Zt.repeat(`
`, i ? 1 + a : a), i = !0, o = !0, a = 0;
    const u = e.position;
    for (; !ft(c) && c !== 0; )
      c = e.input.charCodeAt(++e.position);
    Ut(e, u, e.position, !1);
  }
  return !0;
}
function hl(e, t) {
  const n = e.tag, r = e.anchor, i = [];
  let o = !1;
  if (e.firstTabInLine !== -1) return !1;
  e.anchor !== null && tn(e, e.anchor, i);
  let s = e.input.charCodeAt(e.position);
  for (; s !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, V(e, "tab characters must not be used in indentation")), s === 45); ) {
    const a = e.input.charCodeAt(e.position + 1);
    if (!He(a))
      break;
    if (o = !0, e.position++, ge(e, !0, -1) && e.lineIndent <= t) {
      i.push(null), s = e.input.charCodeAt(e.position);
      continue;
    }
    const l = e.line;
    if (Nn(e, t, ef, !1, !0), i.push(e.result), ge(e, !0, -1), s = e.input.charCodeAt(e.position), (e.line === l || e.lineIndent > t) && s !== 0)
      V(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return o ? (e.tag = n, e.anchor = r, e.kind = "sequence", e.result = i, !0) : !1;
}
function cf(e, t, n) {
  let r, i, o, s;
  const a = e.tag, l = e.anchor, p = {}, c = /* @__PURE__ */ Object.create(null);
  let u = null, d = null, m = null, v = !1, y = !1;
  if (e.firstTabInLine !== -1) return !1;
  e.anchor !== null && tn(e, e.anchor, p);
  let w = e.input.charCodeAt(e.position);
  for (; w !== 0; ) {
    !v && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, V(e, "tab characters must not be used in indentation"));
    const b = e.input.charCodeAt(e.position + 1), $ = e.line;
    if ((w === 63 || w === 58) && He(b))
      w === 63 ? (v && (xn(e, p, c, u, d, null, i, o, s), u = d = m = null), y = !0, v = !0, r = !0) : v ? (v = !1, r = !0) : V(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, w = b;
    else {
      if (i = e.line, o = e.lineStart, s = e.position, !Nn(e, n, Zu, !1, !0))
        break;
      if (e.line === $) {
        for (w = e.input.charCodeAt(e.position); vt(w); )
          w = e.input.charCodeAt(++e.position);
        if (w === 58)
          w = e.input.charCodeAt(++e.position), He(w) || V(e, "a whitespace character is expected after the key-value separator within a block mapping"), v && (xn(e, p, c, u, d, null, i, o, s), u = d = m = null), y = !0, v = !1, r = !1, u = e.tag, d = e.result;
        else if (y)
          V(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = a, e.anchor = l, !0;
      } else if (y)
        V(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = a, e.anchor = l, !0;
    }
    if ((e.line === $ || e.lineIndent > t) && (v && (i = e.line, o = e.lineStart, s = e.position), Nn(e, t, _i, !0, r) && (v ? d = e.result : m = e.result), v || (xn(e, p, c, u, d, m, i, o, s), u = d = m = null), ge(e, !0, -1), w = e.input.charCodeAt(e.position)), (e.line === $ || e.lineIndent > t) && w !== 0)
      V(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return v && xn(e, p, c, u, d, null, i, o, s), y && (e.tag = a, e.anchor = l, e.kind = "mapping", e.result = p), y;
}
function ry(e) {
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
    for (; o !== 0 && !He(o); )
      o === 33 && (n ? V(e, "tag suffix cannot contain exclamation marks") : (r = e.input.slice(s - 1, e.position + 1), tf.test(r) || V(e, "named tag handle cannot contain such characters"), n = !0, s = e.position + 1)), o = e.input.charCodeAt(++e.position);
    i = e.input.slice(s, e.position), qg.test(i) && V(e, "tag suffix cannot contain flow indicator characters");
  }
  i && !nf.test(i) && V(e, "tag name cannot contain such characters: " + i);
  try {
    i = decodeURIComponent(i);
  } catch {
    V(e, "tag name is malformed: " + i);
  }
  return t ? e.tag = i : nt.call(e.tagMap, r) ? e.tag = e.tagMap[r] + i : r === "!" ? e.tag = "!" + i : r === "!!" ? e.tag = "tag:yaml.org,2002:" + i : V(e, 'undeclared tag handle "' + r + '"'), !0;
}
function iy(e) {
  let t = e.input.charCodeAt(e.position);
  if (t !== 38) return !1;
  e.anchor !== null && V(e, "duplication of an anchor property"), t = e.input.charCodeAt(++e.position);
  const n = e.position;
  for (; t !== 0 && !He(t) && !_n(t); )
    t = e.input.charCodeAt(++e.position);
  return e.position === n && V(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function oy(e) {
  let t = e.input.charCodeAt(e.position);
  if (t !== 42) return !1;
  t = e.input.charCodeAt(++e.position);
  const n = e.position;
  for (; t !== 0 && !He(t) && !_n(t); )
    t = e.input.charCodeAt(++e.position);
  e.position === n && V(e, "name of an alias node must contain at least one character");
  const r = e.input.slice(n, e.position);
  return nt.call(e.anchorMap, r) || V(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], ge(e, !0, -1), !0;
}
function sy(e, t, n, r) {
  const i = lf(e);
  return Xg(e), ul(e, t), e.tag = null, e.anchor = null, e.kind = null, e.result = null, cf(e, n, r) && e.kind === "mapping" ? (Jg(e), !0) : (Kg(e), ul(e, i), !1);
}
function Nn(e, t, n, r, i) {
  let o, s, a = 1, l = !1, p = !1, c = null, u, d, m;
  e.depth >= e.maxDepth && V(e, "nesting exceeded maxDepth (" + e.maxDepth + ")"), e.depth += 1, e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null;
  const v = o = s = _i === n || ef === n;
  if (r && ge(e, !0, -1) && (l = !0, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : e.lineIndent < t && (a = -1)), a === 1)
    for (; ; ) {
      const y = e.input.charCodeAt(e.position), w = lf(e);
      if (l && (y === 33 && e.tag !== null || y === 38 && e.anchor !== null) || !ry(e) && !iy(e))
        break;
      c === null && (c = w), ge(e, !0, -1) ? (l = !0, s = v, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : e.lineIndent < t && (a = -1)) : s = !1;
    }
  if (s && (s = l || i), a === 1 || _i === n)
    if (vi === n || Zu === n ? d = t : d = t + 1, m = e.position - e.lineStart, a === 1)
      if (s && (hl(e, m) || cf(e, m, d)) || ty(e, d))
        p = !0;
      else {
        const y = e.input.charCodeAt(e.position);
        c !== null && v && !s && y !== 124 && y !== 62 && sy(
          e,
          c,
          c.position - c.lineStart,
          d
        ) || o && ny(e, d) || Zg(e, d) || ey(e, d) ? p = !0 : oy(e) ? (p = !0, (e.tag !== null || e.anchor !== null) && V(e, "alias node should not have any properties")) : Qg(e, d, vi === n) && (p = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && tn(e, e.anchor, e.result);
      }
    else a === 0 && (p = s && hl(e, m));
  if (e.tag === null)
    e.anchor !== null && tn(e, e.anchor, e.result);
  else if (e.tag === "?") {
    e.result !== null && e.kind !== "scalar" && V(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"');
    for (let y = 0, w = e.implicitTypes.length; y < w; y += 1)
      if (u = e.implicitTypes[y], u.resolve(e.result)) {
        e.result = u.construct(e.result), e.tag = u.tag, e.anchor !== null && tn(e, e.anchor, e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (nt.call(e.typeMap[e.kind || "fallback"], e.tag))
      u = e.typeMap[e.kind || "fallback"][e.tag];
    else {
      u = null;
      const y = e.typeMap.multi[e.kind || "fallback"];
      for (let w = 0, b = y.length; w < b; w += 1)
        if (e.tag.slice(0, y[w].tag.length) === y[w].tag) {
          u = y[w];
          break;
        }
    }
    u || V(e, "unknown tag !<" + e.tag + ">"), e.result !== null && u.kind !== e.kind && V(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + u.kind + '", not "' + e.kind + '"'), u.resolve(e.result, e.tag) ? (e.result = u.construct(e.result, e.tag), e.anchor !== null && tn(e, e.anchor, e.result)) : V(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.depth -= 1, e.tag !== null || e.anchor !== null || p;
}
function ay(e) {
  const t = e.position;
  let n = !1, r;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (r = e.input.charCodeAt(e.position)) !== 0 && (ge(e, !0, -1), r = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || r !== 37)); ) {
    n = !0, r = e.input.charCodeAt(++e.position);
    let i = e.position;
    for (; r !== 0 && !He(r); )
      r = e.input.charCodeAt(++e.position);
    const o = e.input.slice(i, e.position), s = [];
    for (o.length < 1 && V(e, "directive name must not be less than one character in length"); r !== 0; ) {
      for (; vt(r); )
        r = e.input.charCodeAt(++e.position);
      if (r === 35) {
        do
          r = e.input.charCodeAt(++e.position);
        while (r !== 0 && !ft(r));
        break;
      }
      if (ft(r)) break;
      for (i = e.position; r !== 0 && !He(r); )
        r = e.input.charCodeAt(++e.position);
      s.push(e.input.slice(i, e.position));
    }
    r !== 0 && Ns(e), nt.call(fl, o) ? fl[o](e, o, s) : xi(e, 'unknown document directive "' + o + '"');
  }
  if (ge(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, ge(e, !0, -1)) : n && V(e, "directives end mark is expected"), Nn(e, e.lineIndent - 1, _i, !1, !0), ge(e, !0, -1), e.checkLineBreaks && Hg.test(e.input.slice(t, e.position)) && xi(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Li(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, ge(e, !0, -1));
    return;
  }
  e.position < e.length - 1 && V(e, "end of the stream or a document separator is expected");
}
function uf(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  const n = new Yg(e, t), r = e.indexOf("\0");
  for (r !== -1 && (n.position = r, V(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    ay(n);
  return n.documents;
}
function ly(e, t, n) {
  t !== null && typeof t == "object" && typeof n > "u" && (n = t, t = null);
  const r = uf(e, n);
  if (typeof t != "function")
    return r;
  for (let i = 0, o = r.length; i < o; i += 1)
    t(r[i]);
}
function cy(e, t) {
  const n = uf(e, t);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new Qu("expected a single document in the stream, but found more");
  }
}
Ds.loadAll = ly;
Ds.load = cy;
var ff = {};
const Ui = ot, Tr = Sr, uy = Ps, df = Object.prototype.toString, hf = Object.prototype.hasOwnProperty, Ls = 65279, fy = 9, gr = 10, dy = 13, hy = 32, py = 33, my = 34, ts = 35, gy = 37, yy = 38, Ey = 39, wy = 42, pf = 44, vy = 45, bi = 58, _y = 61, xy = 62, by = 63, Sy = 64, mf = 91, gf = 93, Ty = 96, yf = 123, Ay = 124, Ef = 125, Pe = {};
Pe[0] = "\\0";
Pe[7] = "\\a";
Pe[8] = "\\b";
Pe[9] = "\\t";
Pe[10] = "\\n";
Pe[11] = "\\v";
Pe[12] = "\\f";
Pe[13] = "\\r";
Pe[27] = "\\e";
Pe[34] = '\\"';
Pe[92] = "\\\\";
Pe[133] = "\\N";
Pe[160] = "\\_";
Pe[8232] = "\\L";
Pe[8233] = "\\P";
const Cy = [
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
], $y = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function Iy(e, t) {
  if (t === null) return {};
  const n = {}, r = Object.keys(t);
  for (let i = 0, o = r.length; i < o; i += 1) {
    let s = r[i], a = String(t[s]);
    s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2));
    const l = e.compiledTypeMap.fallback[s];
    l && hf.call(l.styleAliases, a) && (a = l.styleAliases[a]), n[s] = a;
  }
  return n;
}
function Oy(e) {
  let t, n;
  const r = e.toString(16).toUpperCase();
  if (e <= 255)
    t = "x", n = 2;
  else if (e <= 65535)
    t = "u", n = 4;
  else if (e <= 4294967295)
    t = "U", n = 8;
  else
    throw new Tr("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + t + Ui.repeat("0", n - r.length) + r;
}
const Dy = 1, yr = 2;
function Ry(e) {
  this.schema = e.schema || uy, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Ui.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = Iy(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? yr : Dy, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function pl(e, t) {
  const n = Ui.repeat(" ", t);
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
function ns(e, t) {
  return `
` + Ui.repeat(" ", e.indent * t);
}
function Py(e, t) {
  for (let n = 0, r = e.implicitTypes.length; n < r; n += 1)
    if (e.implicitTypes[n].resolve(t))
      return !0;
  return !1;
}
function Si(e) {
  return e === hy || e === fy;
}
function Er(e) {
  return e >= 32 && e <= 126 || e >= 161 && e <= 55295 && e !== 8232 && e !== 8233 || e >= 57344 && e <= 65533 && e !== Ls || e >= 65536 && e <= 1114111;
}
function ml(e) {
  return Er(e) && e !== Ls && // - b-char
  e !== dy && e !== gr;
}
function gl(e, t, n) {
  const r = ml(e), i = r && !Si(e);
  return (
    // ns-plain-safe
    (n ? r : r && // - c-flow-indicator
    e !== pf && e !== mf && e !== gf && e !== yf && e !== Ef) && // ns-plain-char
    e !== ts && // false on '#'
    !(t === bi && !i) || // false on ': '
    ml(t) && !Si(t) && e === ts || // change to true on '[^ ]#'
    t === bi && i
  );
}
function Ny(e) {
  return Er(e) && e !== Ls && !Si(e) && // - s-white
  // - (c-indicator ::=
  // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
  e !== vy && e !== by && e !== bi && e !== pf && e !== mf && e !== gf && e !== yf && e !== Ef && // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
  e !== ts && e !== yy && e !== wy && e !== py && e !== Ay && e !== _y && e !== xy && e !== Ey && e !== my && // | “%” | “@” | “`”)
  e !== gy && e !== Sy && e !== Ty;
}
function Fy(e) {
  return !Si(e) && e !== bi;
}
function rr(e, t) {
  const n = e.charCodeAt(t);
  let r;
  return n >= 55296 && n <= 56319 && t + 1 < e.length && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (n - 55296) * 1024 + r - 56320 + 65536 : n;
}
function wf(e) {
  return /^\n* /.test(e);
}
const vf = 1, rs = 2, _f = 3, xf = 4, vn = 5;
function Ly(e, t, n, r, i, o, s, a) {
  let l, p = 0, c = null, u = !1, d = !1;
  const m = r !== -1;
  let v = -1, y = Ny(rr(e, 0)) && Fy(rr(e, e.length - 1));
  if (t || s)
    for (l = 0; l < e.length; p >= 65536 ? l += 2 : l++) {
      if (p = rr(e, l), !Er(p))
        return vn;
      y = y && gl(p, c, a), c = p;
    }
  else {
    for (l = 0; l < e.length; p >= 65536 ? l += 2 : l++) {
      if (p = rr(e, l), p === gr)
        u = !0, m && (d = d || // Foldable line = too long, and not more-indented.
        l - v - 1 > r && e[v + 1] !== " ", v = l);
      else if (!Er(p))
        return vn;
      y = y && gl(p, c, a), c = p;
    }
    d = d || m && l - v - 1 > r && e[v + 1] !== " ";
  }
  return !u && !d ? y && !s && !i(e) ? vf : o === yr ? vn : rs : n > 9 && wf(e) ? vn : s ? o === yr ? vn : rs : d ? xf : _f;
}
function Uy(e, t, n, r, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === yr ? '""' : "''";
    if (!e.noCompatMode && (Cy.indexOf(t) !== -1 || $y.test(t)))
      return e.quotingType === yr ? '"' + t + '"' : "'" + t + "'";
    const o = e.indent * Math.max(1, n), s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), a = r || // No block styles in flow mode.
    e.flowLevel > -1 && n >= e.flowLevel;
    function l(p) {
      return Py(e, p);
    }
    switch (Ly(
      t,
      a,
      e.indent,
      s,
      l,
      e.quotingType,
      e.forceQuotes && !r,
      i
    )) {
      case vf:
        return t;
      case rs:
        return "'" + t.replace(/'/g, "''") + "'";
      case _f:
        return "|" + yl(t, e.indent) + El(pl(t, o));
      case xf:
        return ">" + yl(t, e.indent) + El(pl(ky(t, s), o));
      case vn:
        return '"' + My(t) + '"';
      default:
        throw new Tr("impossible error: invalid scalar style");
    }
  }();
}
function yl(e, t) {
  const n = wf(e) ? String(t) : "", r = e[e.length - 1] === `
`, o = r && (e[e.length - 2] === `
` || e === `
`) ? "+" : r ? "" : "-";
  return n + o + `
`;
}
function El(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function ky(e, t) {
  const n = /(\n+)([^\n]*)/g;
  let r = function() {
    let a = e.indexOf(`
`);
    return a = a !== -1 ? a : e.length, n.lastIndex = a, wl(e.slice(0, a), t);
  }(), i = e[0] === `
` || e[0] === " ", o, s;
  for (; s = n.exec(e); ) {
    const a = s[1], l = s[2];
    o = l[0] === " ", r += a + (!i && !o && l !== "" ? `
` : "") + wl(l, t), i = o;
  }
  return r;
}
function wl(e, t) {
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
function My(e) {
  let t = "", n = 0;
  for (let r = 0; r < e.length; n >= 65536 ? r += 2 : r++) {
    n = rr(e, r);
    const i = Pe[n];
    !i && Er(n) ? (t += e[r], n >= 65536 && (t += e[r + 1])) : t += i || Oy(n);
  }
  return t;
}
function jy(e, t, n) {
  let r = "";
  const i = e.tag;
  for (let o = 0, s = n.length; o < s; o += 1) {
    let a = n[o];
    e.replacer && (a = e.replacer.call(n, String(o), a)), (xt(e, t, a, !1, !1) || typeof a > "u" && xt(e, t, null, !1, !1)) && (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
  }
  e.tag = i, e.dump = "[" + r + "]";
}
function vl(e, t, n, r) {
  let i = "";
  const o = e.tag;
  for (let s = 0, a = n.length; s < a; s += 1) {
    let l = n[s];
    e.replacer && (l = e.replacer.call(n, String(s), l)), (xt(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && xt(e, t + 1, null, !0, !0, !1, !0)) && ((!r || i !== "") && (i += ns(e, t)), e.dump && gr === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  }
  e.tag = o, e.dump = i || "[]";
}
function By(e, t, n) {
  let r = "";
  const i = e.tag, o = Object.keys(n);
  for (let s = 0, a = o.length; s < a; s += 1) {
    let l = "";
    r !== "" && (l += ", "), e.condenseFlow && (l += '"');
    const p = o[s];
    let c = n[p];
    e.replacer && (c = e.replacer.call(n, p, c)), xt(e, t, p, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), xt(e, t, c, !1, !1) && (l += e.dump, r += l));
  }
  e.tag = i, e.dump = "{" + r + "}";
}
function Hy(e, t, n, r) {
  let i = "";
  const o = e.tag, s = Object.keys(n);
  if (e.sortKeys === !0)
    s.sort();
  else if (typeof e.sortKeys == "function")
    s.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Tr("sortKeys must be a boolean or a function");
  for (let a = 0, l = s.length; a < l; a += 1) {
    let p = "";
    (!r || i !== "") && (p += ns(e, t));
    const c = s[a];
    let u = n[c];
    if (e.replacer && (u = e.replacer.call(n, c, u)), !xt(e, t + 1, c, !0, !0, !0))
      continue;
    const d = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024;
    d && (e.dump && gr === e.dump.charCodeAt(0) ? p += "?" : p += "? "), p += e.dump, d && (p += ns(e, t)), xt(e, t + 1, u, !0, d) && (e.dump && gr === e.dump.charCodeAt(0) ? p += ":" : p += ": ", p += e.dump, i += p);
  }
  e.tag = o, e.dump = i || "{}";
}
function _l(e, t, n) {
  const r = n ? e.explicitTypes : e.implicitTypes;
  for (let i = 0, o = r.length; i < o; i += 1) {
    const s = r[i];
    if ((s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (n ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        const a = e.styleMap[s.tag] || s.defaultStyle;
        let l;
        if (df.call(s.represent) === "[object Function]")
          l = s.represent(t, a);
        else if (hf.call(s.represent, a))
          l = s.represent[a](t, a);
        else
          throw new Tr("!<" + s.tag + '> tag resolver accepts not "' + a + '" style');
        e.dump = l;
      }
      return !0;
    }
  }
  return !1;
}
function xt(e, t, n, r, i, o, s) {
  e.tag = null, e.dump = n, _l(e, n, !1) || _l(e, n, !0);
  const a = df.call(e.dump), l = r;
  r && (r = e.flowLevel < 0 || e.flowLevel > t);
  const p = a === "[object Object]" || a === "[object Array]";
  let c, u;
  if (p && (c = e.duplicates.indexOf(n), u = c !== -1), (e.tag !== null && e.tag !== "?" || u || e.indent !== 2 && t > 0) && (i = !1), u && e.usedDuplicates[c])
    e.dump = "*ref_" + c;
  else {
    if (p && u && !e.usedDuplicates[c] && (e.usedDuplicates[c] = !0), a === "[object Object]")
      r && Object.keys(e.dump).length !== 0 ? (Hy(e, t, e.dump, i), u && (e.dump = "&ref_" + c + e.dump)) : (By(e, t, e.dump), u && (e.dump = "&ref_" + c + " " + e.dump));
    else if (a === "[object Array]")
      r && e.dump.length !== 0 ? (e.noArrayIndent && !s && t > 0 ? vl(e, t - 1, e.dump, i) : vl(e, t, e.dump, i), u && (e.dump = "&ref_" + c + e.dump)) : (jy(e, t, e.dump), u && (e.dump = "&ref_" + c + " " + e.dump));
    else if (a === "[object String]")
      e.tag !== "?" && Uy(e, e.dump, t, o, l);
    else {
      if (a === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new Tr("unacceptable kind of an object to dump " + a);
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
function qy(e, t) {
  const n = [], r = [];
  is(e, n, r);
  const i = r.length;
  for (let o = 0; o < i; o += 1)
    t.duplicates.push(n[r[o]]);
  t.usedDuplicates = new Array(i);
}
function is(e, t, n) {
  if (e !== null && typeof e == "object") {
    const r = t.indexOf(e);
    if (r !== -1)
      n.indexOf(r) === -1 && n.push(r);
    else if (t.push(e), Array.isArray(e))
      for (let i = 0, o = e.length; i < o; i += 1)
        is(e[i], t, n);
    else {
      const i = Object.keys(e);
      for (let o = 0, s = i.length; o < s; o += 1)
        is(e[i[o]], t, n);
    }
  }
}
function Gy(e, t) {
  t = t || {};
  const n = new Ry(t);
  n.noRefs || qy(e, n);
  let r = e;
  return n.replacer && (r = n.replacer.call({ "": r }, "", r)), xt(n, 0, r, !0, !0) ? n.dump + `
` : "";
}
ff.dump = Gy;
const bf = Ds, zy = ff;
function Us(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Ce.Type = je;
Ce.Schema = Ru;
Ce.FAILSAFE_SCHEMA = Lu;
Ce.JSON_SCHEMA = Hu;
Ce.CORE_SCHEMA = qu;
Ce.DEFAULT_SCHEMA = Ps;
Ce.load = bf.load;
Ce.loadAll = bf.loadAll;
Ce.dump = zy.dump;
Ce.YAMLException = Sr;
Ce.types = {
  binary: Yu,
  float: Bu,
  map: Fu,
  null: Uu,
  pairs: Ju,
  set: Ku,
  timestamp: Wu,
  bool: ku,
  int: Mu,
  merge: Vu,
  omap: Xu,
  seq: Nu,
  str: Pu
};
Ce.safeLoad = Us("safeLoad", "load");
Ce.safeLoadAll = Us("safeLoadAll", "loadAll");
Ce.safeDump = Us("safeDump", "dump");
var ki = {};
Object.defineProperty(ki, "__esModule", { value: !0 });
ki.Lazy = void 0;
class Wy {
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
ki.Lazy = Wy;
var os = { exports: {} };
const Vy = "2.0.0", Sf = 256, Yy = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Xy = 16, Jy = Sf - 6, Ky = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Ar = {
  MAX_LENGTH: Sf,
  MAX_SAFE_COMPONENT_LENGTH: Xy,
  MAX_SAFE_BUILD_LENGTH: Jy,
  MAX_SAFE_INTEGER: Yy,
  RELEASE_TYPES: Ky,
  SEMVER_SPEC_VERSION: Vy,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const Qy = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Mi = Qy;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: r,
    MAX_LENGTH: i
  } = Ar, o = Mi;
  t = e.exports = {};
  const s = t.re = [], a = t.safeRe = [], l = t.src = [], p = t.safeSrc = [], c = t.t = {};
  let u = 0;
  const d = "[a-zA-Z0-9-]", m = [
    ["\\s", 1],
    ["\\d", i],
    [d, r]
  ], v = (w) => {
    for (const [b, $] of m)
      w = w.split(`${b}*`).join(`${b}{0,${$}}`).split(`${b}+`).join(`${b}{1,${$}}`);
    return w;
  }, y = (w, b, $) => {
    const B = v(b), z = u++;
    o(w, z, b), c[w] = z, l[z] = b, p[z] = B, s[z] = new RegExp(b, $ ? "g" : void 0), a[z] = new RegExp(B, $ ? "g" : void 0);
  };
  y("NUMERICIDENTIFIER", "0|[1-9]\\d*"), y("NUMERICIDENTIFIERLOOSE", "\\d+"), y("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${d}*`), y("MAINVERSION", `(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})`), y("MAINVERSIONLOOSE", `(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASEIDENTIFIER", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIER]})`), y("PRERELEASEIDENTIFIERLOOSE", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASE", `(?:-(${l[c.PRERELEASEIDENTIFIER]}(?:\\.${l[c.PRERELEASEIDENTIFIER]})*))`), y("PRERELEASELOOSE", `(?:-?(${l[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[c.PRERELEASEIDENTIFIERLOOSE]})*))`), y("BUILDIDENTIFIER", `${d}+`), y("BUILD", `(?:\\+(${l[c.BUILDIDENTIFIER]}(?:\\.${l[c.BUILDIDENTIFIER]})*))`), y("FULLPLAIN", `v?${l[c.MAINVERSION]}${l[c.PRERELEASE]}?${l[c.BUILD]}?`), y("FULL", `^${l[c.FULLPLAIN]}$`), y("LOOSEPLAIN", `[v=\\s]*${l[c.MAINVERSIONLOOSE]}${l[c.PRERELEASELOOSE]}?${l[c.BUILD]}?`), y("LOOSE", `^${l[c.LOOSEPLAIN]}$`), y("GTLT", "((?:<|>)?=?)"), y("XRANGEIDENTIFIERLOOSE", `${l[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), y("XRANGEIDENTIFIER", `${l[c.NUMERICIDENTIFIER]}|x|X|\\*`), y("XRANGEPLAIN", `[v=\\s]*(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:${l[c.PRERELEASE]})?${l[c.BUILD]}?)?)?`), y("XRANGEPLAINLOOSE", `[v=\\s]*(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:${l[c.PRERELEASELOOSE]})?${l[c.BUILD]}?)?)?`), y("XRANGE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAIN]}$`), y("XRANGELOOSE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAINLOOSE]}$`), y("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), y("COERCE", `${l[c.COERCEPLAIN]}(?:$|[^\\d])`), y("COERCEFULL", l[c.COERCEPLAIN] + `(?:${l[c.PRERELEASE]})?(?:${l[c.BUILD]})?(?:$|[^\\d])`), y("COERCERTL", l[c.COERCE], !0), y("COERCERTLFULL", l[c.COERCEFULL], !0), y("LONETILDE", "(?:~>?)"), y("TILDETRIM", `(\\s*)${l[c.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", y("TILDE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAIN]}$`), y("TILDELOOSE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAINLOOSE]}$`), y("LONECARET", "(?:\\^)"), y("CARETTRIM", `(\\s*)${l[c.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", y("CARET", `^${l[c.LONECARET]}${l[c.XRANGEPLAIN]}$`), y("CARETLOOSE", `^${l[c.LONECARET]}${l[c.XRANGEPLAINLOOSE]}$`), y("COMPARATORLOOSE", `^${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]})$|^$`), y("COMPARATOR", `^${l[c.GTLT]}\\s*(${l[c.FULLPLAIN]})$|^$`), y("COMPARATORTRIM", `(\\s*)${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]}|${l[c.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", y("HYPHENRANGE", `^\\s*(${l[c.XRANGEPLAIN]})\\s+-\\s+(${l[c.XRANGEPLAIN]})\\s*$`), y("HYPHENRANGELOOSE", `^\\s*(${l[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[c.XRANGEPLAINLOOSE]})\\s*$`), y("STAR", "(<|>)?=?\\s*\\*"), y("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), y("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(os, os.exports);
var Cr = os.exports;
const Zy = Object.freeze({ loose: !0 }), eE = Object.freeze({}), tE = (e) => e ? typeof e != "object" ? Zy : e : eE;
var ks = tE;
const xl = /^[0-9]+$/, Tf = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const n = xl.test(e), r = xl.test(t);
  return n && r && (e = +e, t = +t), e === t ? 0 : n && !r ? -1 : r && !n ? 1 : e < t ? -1 : 1;
}, nE = (e, t) => Tf(t, e);
var Af = {
  compareIdentifiers: Tf,
  rcompareIdentifiers: nE
};
const Kr = Mi, { MAX_LENGTH: bl, MAX_SAFE_INTEGER: Qr } = Ar, { safeRe: Zr, t: ei } = Cr, rE = ks, { compareIdentifiers: ss } = Af, iE = (e, t) => {
  const n = t.split(".");
  if (n.length > e.length)
    return !1;
  for (let r = 0; r < n.length; r++)
    if (ss(e[r], n[r]) !== 0)
      return !1;
  return !0;
};
let oE = class ct {
  constructor(t, n) {
    if (n = rE(n), t instanceof ct) {
      if (t.loose === !!n.loose && t.includePrerelease === !!n.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > bl)
      throw new TypeError(
        `version is longer than ${bl} characters`
      );
    Kr("SemVer", t, n), this.options = n, this.loose = !!n.loose, this.includePrerelease = !!n.includePrerelease;
    const r = t.trim().match(n.loose ? Zr[ei.LOOSE] : Zr[ei.FULL]);
    if (!r)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +r[1], this.minor = +r[2], this.patch = +r[3], this.major > Qr || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Qr || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Qr || this.patch < 0)
      throw new TypeError("Invalid patch version");
    r[4] ? this.prerelease = r[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < Qr)
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
    if (Kr("SemVer.compare", this.version, this.options, t), !(t instanceof ct)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new ct(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof ct || (t = new ct(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof ct || (t = new ct(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let n = 0;
    do {
      const r = this.prerelease[n], i = t.prerelease[n];
      if (Kr("prerelease compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return ss(r, i);
    } while (++n);
  }
  compareBuild(t) {
    t instanceof ct || (t = new ct(t, this.options));
    let n = 0;
    do {
      const r = this.build[n], i = t.build[n];
      if (Kr("build compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return ss(r, i);
    } while (++n);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, n, r) {
    if (t.startsWith("pre")) {
      if (!n && r === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (n) {
        const i = `-${n}`.match(this.options.loose ? Zr[ei.PRERELEASELOOSE] : Zr[ei.PRERELEASE]);
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
          if (r === !1 && (o = [n]), iE(this.prerelease, n)) {
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
var Ne = oE;
const Sl = Ne, sE = (e, t, n = !1) => {
  if (e instanceof Sl)
    return e;
  try {
    return new Sl(e, t);
  } catch (r) {
    if (!n)
      return null;
    throw r;
  }
};
var dn = sE;
const aE = dn, lE = (e, t) => {
  const n = aE(e, t);
  return n ? n.version : null;
};
var cE = lE;
const uE = dn, fE = (e, t) => {
  const n = uE(e.trim().replace(/^[=v]+/, ""), t);
  return n ? n.version : null;
};
var dE = fE;
const Tl = Ne, hE = (e, t, n, r, i) => {
  typeof n == "string" && (i = r, r = n, n = void 0);
  try {
    return new Tl(
      e instanceof Tl ? e.version : e,
      n
    ).inc(t, r, i).version;
  } catch {
    return null;
  }
};
var pE = hE;
const Al = dn, mE = (e, t) => {
  const n = Al(e, null, !0), r = Al(t, null, !0), i = n.compare(r);
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
var gE = mE;
const yE = Ne, EE = (e, t) => new yE(e, t).major;
var wE = EE;
const vE = Ne, _E = (e, t) => new vE(e, t).minor;
var xE = _E;
const bE = Ne, SE = (e, t) => new bE(e, t).patch;
var TE = SE;
const AE = dn, CE = (e, t) => {
  const n = AE(e, t);
  return n && n.prerelease.length ? n.prerelease : null;
};
var $E = CE;
const Cl = Ne, IE = (e, t, n) => new Cl(e, n).compare(new Cl(t, n));
var st = IE;
const OE = st, DE = (e, t, n) => OE(t, e, n);
var RE = DE;
const PE = st, NE = (e, t) => PE(e, t, !0);
var FE = NE;
const $l = Ne, LE = (e, t, n) => {
  const r = new $l(e, n), i = new $l(t, n);
  return r.compare(i) || r.compareBuild(i);
};
var Ms = LE;
const UE = Ms, kE = (e, t) => e.sort((n, r) => UE(n, r, t));
var ME = kE;
const jE = Ms, BE = (e, t) => e.sort((n, r) => jE(r, n, t));
var HE = BE;
const qE = st, GE = (e, t, n) => qE(e, t, n) > 0;
var ji = GE;
const zE = st, WE = (e, t, n) => zE(e, t, n) < 0;
var js = WE;
const VE = st, YE = (e, t, n) => VE(e, t, n) === 0;
var Cf = YE;
const XE = st, JE = (e, t, n) => XE(e, t, n) !== 0;
var $f = JE;
const KE = st, QE = (e, t, n) => KE(e, t, n) >= 0;
var Bs = QE;
const ZE = st, ew = (e, t, n) => ZE(e, t, n) <= 0;
var Hs = ew;
const tw = Cf, nw = $f, rw = ji, iw = Bs, ow = js, sw = Hs, aw = (e, t, n, r) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e === n;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e !== n;
    case "":
    case "=":
    case "==":
      return tw(e, n, r);
    case "!=":
      return nw(e, n, r);
    case ">":
      return rw(e, n, r);
    case ">=":
      return iw(e, n, r);
    case "<":
      return ow(e, n, r);
    case "<=":
      return sw(e, n, r);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var If = aw;
const lw = Ne, cw = dn, { safeRe: ti, t: ni } = Cr, uw = (e, t) => {
  if (e instanceof lw)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let n = null;
  if (!t.rtl)
    n = e.match(t.includePrerelease ? ti[ni.COERCEFULL] : ti[ni.COERCE]);
  else {
    const l = t.includePrerelease ? ti[ni.COERCERTLFULL] : ti[ni.COERCERTL];
    let p;
    for (; (p = l.exec(e)) && (!n || n.index + n[0].length !== e.length); )
      (!n || p.index + p[0].length !== n.index + n[0].length) && (n = p), l.lastIndex = p.index + p[1].length + p[2].length;
    l.lastIndex = -1;
  }
  if (n === null)
    return null;
  const r = n[2], i = n[3] || "0", o = n[4] || "0", s = t.includePrerelease && n[5] ? `-${n[5]}` : "", a = t.includePrerelease && n[6] ? `+${n[6]}` : "";
  return cw(`${r}.${i}.${o}${s}${a}`, t);
};
var fw = uw;
const dw = dn, hw = Ar, pw = Ne, mw = (e, t, n) => {
  if (!hw.RELEASE_TYPES.includes(t))
    return null;
  const r = gw(e, n);
  return r && yw(r, t);
}, gw = (e, t) => {
  const n = e instanceof pw ? e.version : e;
  return dw(n, t);
}, yw = (e, t) => {
  if (Ew(t))
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
}, Ew = (e) => e.startsWith("pre");
var ww = mw;
class vw {
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
var _w = vw, Oo, Il;
function at() {
  if (Il) return Oo;
  Il = 1;
  const e = /\s+/g;
  class t {
    constructor(I, T) {
      if (T = i(T), I instanceof t)
        return I.loose === !!T.loose && I.includePrerelease === !!T.includePrerelease ? I : new t(I.raw, T);
      if (I instanceof o)
        return this.raw = I.value, this.set = [[I]], this.formatted = void 0, this;
      if (this.options = T, this.loose = !!T.loose, this.includePrerelease = !!T.includePrerelease, this.raw = I.trim().replace(e, " "), this.set = this.raw.split("||").map((L) => this.parseRange(L.trim())).filter((L) => L.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const L = this.set[0];
        if (this.set = this.set.filter((j) => !b(j[0])), this.set.length === 0)
          this.set = [L];
        else if (this.set.length > 1) {
          for (const j of this.set)
            if (j.length === 1 && $(j[0])) {
              this.set = [j];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let I = 0; I < this.set.length; I++) {
          I > 0 && (this.formatted += "||");
          const T = this.set[I];
          for (let L = 0; L < T.length; L++)
            L > 0 && (this.formatted += " "), this.formatted += T[L].toString().trim();
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
    parseRange(I) {
      I = I.replace(w, "");
      const L = ((this.options.includePrerelease && v) | (this.options.loose && y)) + ":" + I, j = r.get(L);
      if (j)
        return j;
      const O = this.options.loose, k = O ? l[c.HYPHENRANGELOOSE] : l[c.HYPHENRANGE];
      I = I.replace(k, Q(this.options.includePrerelease)), s("hyphen replace", I), I = I.replace(l[c.COMPARATORTRIM], u), s("comparator trim", I), I = I.replace(l[c.TILDETRIM], d), s("tilde trim", I), I = I.replace(l[c.CARETTRIM], m), s("caret trim", I);
      let J = I.split(" ").map((K) => z(K, this.options)).join(" ").split(/\s+/).map((K) => ee(K, this.options));
      O && (J = J.filter((K) => (s("loose invalid filter", K, this.options), !!K.match(l[c.COMPARATORLOOSE])))), s("range list", J);
      const M = /* @__PURE__ */ new Map(), W = J.map((K) => new o(K, this.options));
      for (const K of W) {
        if (b(K))
          return [K];
        M.set(K.value, K);
      }
      M.size > 1 && M.has("") && M.delete("");
      const ie = [...M.values()];
      return r.set(L, ie), ie;
    }
    intersects(I, T) {
      if (!(I instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((L) => B(L, T) && I.set.some((j) => B(j, T) && L.every((O) => j.every((k) => O.intersects(k, T)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(I) {
      if (!I)
        return !1;
      if (typeof I == "string")
        try {
          I = new a(I, this.options);
        } catch {
          return !1;
        }
      for (let T = 0; T < this.set.length; T++)
        if (Y(this.set[T], I, this.options))
          return !0;
      return !1;
    }
  }
  Oo = t;
  const n = _w, r = new n(), i = ks, o = Bi(), s = Mi, a = Ne, {
    safeRe: l,
    src: p,
    t: c,
    comparatorTrimReplace: u,
    tildeTrimReplace: d,
    caretTrimReplace: m
  } = Cr, { FLAG_INCLUDE_PRERELEASE: v, FLAG_LOOSE: y } = Ar, w = new RegExp(p[c.BUILD], "g"), b = (C) => C.value === "<0.0.0-0", $ = (C) => C.value === "", B = (C, I) => {
    let T = !0;
    const L = C.slice();
    let j = L.pop();
    for (; T && L.length; )
      T = L.every((O) => j.intersects(O, I)), j = L.pop();
    return T;
  }, z = (C, I) => (C = C.replace(l[c.BUILD], ""), s("comp", C, I), C = D(C, I), s("caret", C), C = R(C, I), s("tildes", C), C = q(C, I), s("xrange", C), C = te(C, I), s("stars", C), C), U = (C) => !C || C.toLowerCase() === "x" || C === "*", S = (C, I, T) => U(C) && !U(I) || U(I) && T && !U(T), R = (C, I) => C.trim().split(/\s+/).map((T) => N(T, I)).join(" "), N = (C, I) => {
    const T = I.loose ? l[c.TILDELOOSE] : l[c.TILDE], L = I.includePrerelease ? "-0" : "";
    return C.replace(T, (j, O, k, J, M) => {
      s("tilde", C, j, O, k, J, M);
      let W;
      return U(O) ? W = "" : U(k) ? W = `>=${O}.0.0${L} <${+O + 1}.0.0-0` : U(J) ? W = `>=${O}.${k}.0${L} <${O}.${+k + 1}.0-0` : M ? (s("replaceTilde pr", M), W = `>=${O}.${k}.${J}-${M} <${O}.${+k + 1}.0-0`) : W = `>=${O}.${k}.${J} <${O}.${+k + 1}.0-0`, s("tilde return", W), W;
    });
  }, D = (C, I) => C.trim().split(/\s+/).map((T) => E(T, I)).join(" "), E = (C, I) => {
    s("caret", C, I);
    const T = I.loose ? l[c.CARETLOOSE] : l[c.CARET], L = I.includePrerelease ? "-0" : "";
    return C.replace(T, (j, O, k, J, M) => {
      s("caret", C, j, O, k, J, M);
      let W;
      return U(O) ? W = "" : U(k) ? W = `>=${O}.0.0${L} <${+O + 1}.0.0-0` : U(J) ? O === "0" ? W = `>=${O}.${k}.0${L} <${O}.${+k + 1}.0-0` : W = `>=${O}.${k}.0${L} <${+O + 1}.0.0-0` : M ? (s("replaceCaret pr", M), O === "0" ? k === "0" ? W = `>=${O}.${k}.${J}-${M} <${O}.${k}.${+J + 1}-0` : W = `>=${O}.${k}.${J}-${M} <${O}.${+k + 1}.0-0` : W = `>=${O}.${k}.${J}-${M} <${+O + 1}.0.0-0`) : (s("no pr"), O === "0" ? k === "0" ? W = `>=${O}.${k}.${J} <${O}.${k}.${+J + 1}-0` : W = `>=${O}.${k}.${J} <${O}.${+k + 1}.0-0` : W = `>=${O}.${k}.${J} <${+O + 1}.0.0-0`), s("caret return", W), W;
    });
  }, q = (C, I) => (s("replaceXRanges", C, I), C.split(/\s+/).map((T) => Z(T, I)).join(" ")), Z = (C, I) => {
    C = C.trim();
    const T = I.loose ? l[c.XRANGELOOSE] : l[c.XRANGE];
    return C.replace(T, (L, j, O, k, J, M) => {
      if (s("xRange", C, L, j, O, k, J, M), S(O, k, J))
        return C;
      const W = U(O), ie = W || U(k), K = ie || U(J), Se = K;
      return j === "=" && Se && (j = ""), M = I.includePrerelease ? "-0" : "", W ? j === ">" || j === "<" ? L = "<0.0.0-0" : L = "*" : j && Se ? (ie && (k = 0), J = 0, j === ">" ? (j = ">=", ie ? (O = +O + 1, k = 0, J = 0) : (k = +k + 1, J = 0)) : j === "<=" && (j = "<", ie ? O = +O + 1 : k = +k + 1), j === "<" && (M = "-0"), L = `${j + O}.${k}.${J}${M}`) : ie ? L = `>=${O}.0.0${M} <${+O + 1}.0.0-0` : K && (L = `>=${O}.${k}.0${M} <${O}.${+k + 1}.0-0`), s("xRange return", L), L;
    });
  }, te = (C, I) => (s("replaceStars", C, I), C.trim().replace(l[c.STAR], "")), ee = (C, I) => (s("replaceGTE0", C, I), C.trim().replace(l[I.includePrerelease ? c.GTE0PRE : c.GTE0], "")), Q = (C) => (I, T, L, j, O, k, J, M, W, ie, K, Se) => (U(L) ? T = "" : U(j) ? T = `>=${L}.0.0${C ? "-0" : ""}` : U(O) ? T = `>=${L}.${j}.0${C ? "-0" : ""}` : k ? T = `>=${T}` : T = `>=${T}${C ? "-0" : ""}`, U(W) ? M = "" : U(ie) ? M = `<${+W + 1}.0.0-0` : U(K) ? M = `<${W}.${+ie + 1}.0-0` : Se ? M = `<=${W}.${ie}.${K}-${Se}` : C ? M = `<${W}.${ie}.${+K + 1}-0` : M = `<=${M}`, `${T} ${M}`.trim()), Y = (C, I, T) => {
    for (let L = 0; L < C.length; L++)
      if (!C[L].test(I))
        return !1;
    if (I.prerelease.length && !T.includePrerelease) {
      for (let L = 0; L < C.length; L++)
        if (s(C[L].semver), C[L].semver !== o.ANY && C[L].semver.prerelease.length > 0) {
          const j = C[L].semver;
          if (j.major === I.major && j.minor === I.minor && j.patch === I.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Oo;
}
var Do, Ol;
function Bi() {
  if (Ol) return Do;
  Ol = 1;
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
  Do = t;
  const n = ks, { safeRe: r, t: i } = Cr, o = If, s = Mi, a = Ne, l = at();
  return Do;
}
const xw = at(), bw = (e, t, n) => {
  try {
    t = new xw(t, n);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Hi = bw;
const Sw = at(), Tw = (e, t) => new Sw(e, t).set.map((n) => n.map((r) => r.value).join(" ").trim().split(" "));
var Aw = Tw;
const Cw = Ne, $w = at(), Iw = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new $w(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!r || i.compare(s) === -1) && (r = s, i = new Cw(r, n));
  }), r;
};
var Ow = Iw;
const Dw = Ne, Rw = at(), Pw = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new Rw(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!r || i.compare(s) === 1) && (r = s, i = new Dw(r, n));
  }), r;
};
var Nw = Pw;
const Ro = Ne, Fw = at(), Dl = ji, Lw = (e, t) => {
  e = new Fw(e, t);
  let n = new Ro("0.0.0");
  if (e.test(n) || (n = new Ro("0.0.0-0"), e.test(n)))
    return n;
  n = null;
  for (let r = 0; r < e.set.length; ++r) {
    const i = e.set[r];
    let o = null;
    i.forEach((s) => {
      const a = new Ro(s.semver.version);
      switch (s.operator) {
        case ">":
          a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), a.raw = a.format();
        case "":
        case ">=":
          (!o || Dl(a, o)) && (o = a);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${s.operator}`);
      }
    }), o && (!n || Dl(n, o)) && (n = o);
  }
  return n && e.test(n) ? n : null;
};
var Uw = Lw;
const kw = at(), Mw = (e, t) => {
  try {
    return new kw(e, t).range || "*";
  } catch {
    return null;
  }
};
var jw = Mw;
const Bw = Ne, Of = Bi(), { ANY: Hw } = Of, qw = at(), Gw = Hi, Rl = ji, Pl = js, zw = Hs, Ww = Bs, Vw = (e, t, n, r) => {
  e = new Bw(e, r), t = new qw(t, r);
  let i, o, s, a, l;
  switch (n) {
    case ">":
      i = Rl, o = zw, s = Pl, a = ">", l = ">=";
      break;
    case "<":
      i = Pl, o = Ww, s = Rl, a = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (Gw(e, t, r))
    return !1;
  for (let p = 0; p < t.set.length; ++p) {
    const c = t.set[p];
    let u = null, d = null;
    if (c.forEach((m) => {
      m.semver === Hw && (m = new Of(">=0.0.0")), u = u || m, d = d || m, i(m.semver, u.semver, r) ? u = m : s(m.semver, d.semver, r) && (d = m);
    }), u.operator === a || u.operator === l || (!d.operator || d.operator === a) && o(e, d.semver))
      return !1;
    if (d.operator === l && s(e, d.semver))
      return !1;
  }
  return !0;
};
var qs = Vw;
const Yw = qs, Xw = (e, t, n) => Yw(e, t, ">", n);
var Jw = Xw;
const Kw = qs, Qw = (e, t, n) => Kw(e, t, "<", n);
var Zw = Qw;
const Nl = at(), ev = (e, t, n) => (e = new Nl(e, n), t = new Nl(t, n), e.intersects(t, n));
var tv = ev;
const nv = Hi, rv = st;
var iv = (e, t, n) => {
  const r = [];
  let i = null, o = null;
  const s = e.sort((c, u) => rv(c, u, n));
  for (const c of s)
    nv(c, t, n) ? (o = c, i || (i = c)) : (o && r.push([i, o]), o = null, i = null);
  i && r.push([i, null]);
  const a = [];
  for (const [c, u] of r)
    c === u ? a.push(c) : !u && c === s[0] ? a.push("*") : u ? c === s[0] ? a.push(`<=${u}`) : a.push(`${c} - ${u}`) : a.push(`>=${c}`);
  const l = a.join(" || "), p = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < p.length ? l : t;
};
const Fl = at(), Gs = Bi(), { ANY: Po } = Gs, No = Hi, zs = st, ov = (e, t, n = {}) => {
  if (e === t)
    return !0;
  e = new Fl(e, n), t = new Fl(t, n);
  let r = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const s = av(i, o, n);
      if (r = r || s !== null, s)
        continue e;
    }
    if (r)
      return !1;
  }
  return !0;
}, sv = [new Gs(">=0.0.0-0")], Ll = [new Gs(">=0.0.0")], av = (e, t, n) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Po) {
    if (t.length === 1 && t[0].semver === Po)
      return !0;
    n.includePrerelease ? e = sv : e = Ll;
  }
  if (t.length === 1 && t[0].semver === Po) {
    if (n.includePrerelease)
      return !0;
    t = Ll;
  }
  const r = /* @__PURE__ */ new Set();
  let i, o;
  for (const m of e)
    m.operator === ">" || m.operator === ">=" ? i = Ul(i, m, n) : m.operator === "<" || m.operator === "<=" ? o = kl(o, m, n) : r.add(m.semver);
  if (r.size > 1)
    return null;
  let s;
  if (i && o) {
    if (s = zs(i.semver, o.semver, n), s > 0)
      return null;
    if (s === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const m of r) {
    if (i && !No(m, String(i), n) || o && !No(m, String(o), n))
      return null;
    for (const v of t)
      if (!No(m, String(v), n))
        return !1;
    return !0;
  }
  let a, l, p, c, u = o && !n.includePrerelease && o.semver.prerelease.length ? o.semver : !1, d = i && !n.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && o.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const m of t) {
    if (c = c || m.operator === ">" || m.operator === ">=", p = p || m.operator === "<" || m.operator === "<=", i) {
      if (d && m.semver.prerelease && m.semver.prerelease.length && m.semver.major === d.major && m.semver.minor === d.minor && m.semver.patch === d.patch && (d = !1), m.operator === ">" || m.operator === ">=") {
        if (a = Ul(i, m, n), a === m && a !== i)
          return !1;
      } else if (i.operator === ">=" && !m.test(i.semver))
        return !1;
    }
    if (o) {
      if (u && m.semver.prerelease && m.semver.prerelease.length && m.semver.major === u.major && m.semver.minor === u.minor && m.semver.patch === u.patch && (u = !1), m.operator === "<" || m.operator === "<=") {
        if (l = kl(o, m, n), l === m && l !== o)
          return !1;
      } else if (o.operator === "<=" && !m.test(o.semver))
        return !1;
    }
    if (!m.operator && (o || i) && s !== 0)
      return !1;
  }
  return !(i && p && !o && s !== 0 || o && c && !i && s !== 0 || d || u);
}, Ul = (e, t, n) => {
  if (!e)
    return t;
  const r = zs(e.semver, t.semver, n);
  return r > 0 ? e : r < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, kl = (e, t, n) => {
  if (!e)
    return t;
  const r = zs(e.semver, t.semver, n);
  return r < 0 ? e : r > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var lv = ov;
const Fo = Cr, Ml = Ar, cv = Ne, jl = Af, uv = dn, fv = cE, dv = dE, hv = pE, pv = gE, mv = wE, gv = xE, yv = TE, Ev = $E, wv = st, vv = RE, _v = FE, xv = Ms, bv = ME, Sv = HE, Tv = ji, Av = js, Cv = Cf, $v = $f, Iv = Bs, Ov = Hs, Dv = If, Rv = fw, Pv = ww, Nv = Bi(), Fv = at(), Lv = Hi, Uv = Aw, kv = Ow, Mv = Nw, jv = Uw, Bv = jw, Hv = qs, qv = Jw, Gv = Zw, zv = tv, Wv = iv, Vv = lv;
var Df = {
  parse: uv,
  valid: fv,
  clean: dv,
  inc: hv,
  diff: pv,
  major: mv,
  minor: gv,
  patch: yv,
  prerelease: Ev,
  compare: wv,
  rcompare: vv,
  compareLoose: _v,
  compareBuild: xv,
  sort: bv,
  rsort: Sv,
  gt: Tv,
  lt: Av,
  eq: Cv,
  neq: $v,
  gte: Iv,
  lte: Ov,
  cmp: Dv,
  coerce: Rv,
  truncate: Pv,
  Comparator: Nv,
  Range: Fv,
  satisfies: Lv,
  toComparators: Uv,
  maxSatisfying: kv,
  minSatisfying: Mv,
  minVersion: jv,
  validRange: Bv,
  outside: Hv,
  gtr: qv,
  ltr: Gv,
  intersects: zv,
  simplifyRange: Wv,
  subset: Vv,
  SemVer: cv,
  re: Fo.re,
  src: Fo.src,
  tokens: Fo.t,
  SEMVER_SPEC_VERSION: Ml.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Ml.RELEASE_TYPES,
  compareIdentifiers: jl.compareIdentifiers,
  rcompareIdentifiers: jl.rcompareIdentifiers
}, $r = {}, Ti = { exports: {} };
Ti.exports;
(function(e, t) {
  var n = 200, r = "__lodash_hash_undefined__", i = 1, o = 2, s = 9007199254740991, a = "[object Arguments]", l = "[object Array]", p = "[object AsyncFunction]", c = "[object Boolean]", u = "[object Date]", d = "[object Error]", m = "[object Function]", v = "[object GeneratorFunction]", y = "[object Map]", w = "[object Number]", b = "[object Null]", $ = "[object Object]", B = "[object Promise]", z = "[object Proxy]", U = "[object RegExp]", S = "[object Set]", R = "[object String]", N = "[object Symbol]", D = "[object Undefined]", E = "[object WeakMap]", q = "[object ArrayBuffer]", Z = "[object DataView]", te = "[object Float32Array]", ee = "[object Float64Array]", Q = "[object Int8Array]", Y = "[object Int16Array]", C = "[object Int32Array]", I = "[object Uint8Array]", T = "[object Uint8ClampedArray]", L = "[object Uint16Array]", j = "[object Uint32Array]", O = /[\\^$.*+?()[\]{}|]/g, k = /^\[object .+?Constructor\]$/, J = /^(?:0|[1-9]\d*)$/, M = {};
  M[te] = M[ee] = M[Q] = M[Y] = M[C] = M[I] = M[T] = M[L] = M[j] = !0, M[a] = M[l] = M[q] = M[c] = M[Z] = M[u] = M[d] = M[m] = M[y] = M[w] = M[$] = M[U] = M[S] = M[R] = M[E] = !1;
  var W = typeof Ye == "object" && Ye && Ye.Object === Object && Ye, ie = typeof self == "object" && self && self.Object === Object && self, K = W || ie || Function("return this")(), Se = t && !t.nodeType && t, mt = Se && !0 && e && !e.nodeType && e, qe = mt && mt.exports === Se, Gt = qe && W.process, h = function() {
    try {
      return Gt && Gt.binding && Gt.binding("util");
    } catch {
    }
  }(), f = h && h.isTypedArray;
  function A(g, x) {
    for (var P = -1, G = g == null ? 0 : g.length, le = 0, ne = []; ++P < G; ) {
      var he = g[P];
      x(he, P, g) && (ne[le++] = he);
    }
    return ne;
  }
  function _(g, x) {
    for (var P = -1, G = x.length, le = g.length; ++P < G; )
      g[le + P] = x[P];
    return g;
  }
  function se(g, x) {
    for (var P = -1, G = g == null ? 0 : g.length; ++P < G; )
      if (x(g[P], P, g))
        return !0;
    return !1;
  }
  function ue(g, x) {
    for (var P = -1, G = Array(g); ++P < g; )
      G[P] = x(P);
    return G;
  }
  function me(g) {
    return function(x) {
      return g(x);
    };
  }
  function $e(g, x) {
    return g.has(x);
  }
  function Ie(g, x) {
    return g == null ? void 0 : g[x];
  }
  function Je(g) {
    var x = -1, P = Array(g.size);
    return g.forEach(function(G, le) {
      P[++x] = [le, G];
    }), P;
  }
  function ye(g, x) {
    return function(P) {
      return g(x(P));
    };
  }
  function Ke(g) {
    var x = -1, P = Array(g.size);
    return g.forEach(function(G) {
      P[++x] = G;
    }), P;
  }
  var lo = Array.prototype, Ur = Function.prototype, Tt = Object.prototype, pn = K["__core-js_shared__"], aa = Ur.toString, lt = Tt.hasOwnProperty, la = function() {
    var g = /[^.]+$/.exec(pn && pn.keys && pn.keys.IE_PROTO || "");
    return g ? "Symbol(src)_1." + g : "";
  }(), ca = Tt.toString, hd = RegExp(
    "^" + aa.call(lt).replace(O, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), ua = qe ? K.Buffer : void 0, kr = K.Symbol, fa = K.Uint8Array, da = Tt.propertyIsEnumerable, pd = lo.splice, zt = kr ? kr.toStringTag : void 0, ha = Object.getOwnPropertySymbols, md = ua ? ua.isBuffer : void 0, gd = ye(Object.keys, Object), co = mn(K, "DataView"), Hn = mn(K, "Map"), uo = mn(K, "Promise"), fo = mn(K, "Set"), ho = mn(K, "WeakMap"), qn = mn(Object, "create"), yd = Yt(co), Ed = Yt(Hn), wd = Yt(uo), vd = Yt(fo), _d = Yt(ho), pa = kr ? kr.prototype : void 0, po = pa ? pa.valueOf : void 0;
  function Wt(g) {
    var x = -1, P = g == null ? 0 : g.length;
    for (this.clear(); ++x < P; ) {
      var G = g[x];
      this.set(G[0], G[1]);
    }
  }
  function xd() {
    this.__data__ = qn ? qn(null) : {}, this.size = 0;
  }
  function bd(g) {
    var x = this.has(g) && delete this.__data__[g];
    return this.size -= x ? 1 : 0, x;
  }
  function Sd(g) {
    var x = this.__data__;
    if (qn) {
      var P = x[g];
      return P === r ? void 0 : P;
    }
    return lt.call(x, g) ? x[g] : void 0;
  }
  function Td(g) {
    var x = this.__data__;
    return qn ? x[g] !== void 0 : lt.call(x, g);
  }
  function Ad(g, x) {
    var P = this.__data__;
    return this.size += this.has(g) ? 0 : 1, P[g] = qn && x === void 0 ? r : x, this;
  }
  Wt.prototype.clear = xd, Wt.prototype.delete = bd, Wt.prototype.get = Sd, Wt.prototype.has = Td, Wt.prototype.set = Ad;
  function gt(g) {
    var x = -1, P = g == null ? 0 : g.length;
    for (this.clear(); ++x < P; ) {
      var G = g[x];
      this.set(G[0], G[1]);
    }
  }
  function Cd() {
    this.__data__ = [], this.size = 0;
  }
  function $d(g) {
    var x = this.__data__, P = jr(x, g);
    if (P < 0)
      return !1;
    var G = x.length - 1;
    return P == G ? x.pop() : pd.call(x, P, 1), --this.size, !0;
  }
  function Id(g) {
    var x = this.__data__, P = jr(x, g);
    return P < 0 ? void 0 : x[P][1];
  }
  function Od(g) {
    return jr(this.__data__, g) > -1;
  }
  function Dd(g, x) {
    var P = this.__data__, G = jr(P, g);
    return G < 0 ? (++this.size, P.push([g, x])) : P[G][1] = x, this;
  }
  gt.prototype.clear = Cd, gt.prototype.delete = $d, gt.prototype.get = Id, gt.prototype.has = Od, gt.prototype.set = Dd;
  function Vt(g) {
    var x = -1, P = g == null ? 0 : g.length;
    for (this.clear(); ++x < P; ) {
      var G = g[x];
      this.set(G[0], G[1]);
    }
  }
  function Rd() {
    this.size = 0, this.__data__ = {
      hash: new Wt(),
      map: new (Hn || gt)(),
      string: new Wt()
    };
  }
  function Pd(g) {
    var x = Br(this, g).delete(g);
    return this.size -= x ? 1 : 0, x;
  }
  function Nd(g) {
    return Br(this, g).get(g);
  }
  function Fd(g) {
    return Br(this, g).has(g);
  }
  function Ld(g, x) {
    var P = Br(this, g), G = P.size;
    return P.set(g, x), this.size += P.size == G ? 0 : 1, this;
  }
  Vt.prototype.clear = Rd, Vt.prototype.delete = Pd, Vt.prototype.get = Nd, Vt.prototype.has = Fd, Vt.prototype.set = Ld;
  function Mr(g) {
    var x = -1, P = g == null ? 0 : g.length;
    for (this.__data__ = new Vt(); ++x < P; )
      this.add(g[x]);
  }
  function Ud(g) {
    return this.__data__.set(g, r), this;
  }
  function kd(g) {
    return this.__data__.has(g);
  }
  Mr.prototype.add = Mr.prototype.push = Ud, Mr.prototype.has = kd;
  function At(g) {
    var x = this.__data__ = new gt(g);
    this.size = x.size;
  }
  function Md() {
    this.__data__ = new gt(), this.size = 0;
  }
  function jd(g) {
    var x = this.__data__, P = x.delete(g);
    return this.size = x.size, P;
  }
  function Bd(g) {
    return this.__data__.get(g);
  }
  function Hd(g) {
    return this.__data__.has(g);
  }
  function qd(g, x) {
    var P = this.__data__;
    if (P instanceof gt) {
      var G = P.__data__;
      if (!Hn || G.length < n - 1)
        return G.push([g, x]), this.size = ++P.size, this;
      P = this.__data__ = new Vt(G);
    }
    return P.set(g, x), this.size = P.size, this;
  }
  At.prototype.clear = Md, At.prototype.delete = jd, At.prototype.get = Bd, At.prototype.has = Hd, At.prototype.set = qd;
  function Gd(g, x) {
    var P = Hr(g), G = !P && oh(g), le = !P && !G && mo(g), ne = !P && !G && !le && ba(g), he = P || G || le || ne, we = he ? ue(g.length, String) : [], Te = we.length;
    for (var fe in g)
      lt.call(g, fe) && !(he && // Safari 9 has enumerable `arguments.length` in strict mode.
      (fe == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      le && (fe == "offset" || fe == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      ne && (fe == "buffer" || fe == "byteLength" || fe == "byteOffset") || // Skip index properties.
      eh(fe, Te))) && we.push(fe);
    return we;
  }
  function jr(g, x) {
    for (var P = g.length; P--; )
      if (wa(g[P][0], x))
        return P;
    return -1;
  }
  function zd(g, x, P) {
    var G = x(g);
    return Hr(g) ? G : _(G, P(g));
  }
  function Gn(g) {
    return g == null ? g === void 0 ? D : b : zt && zt in Object(g) ? Qd(g) : ih(g);
  }
  function ma(g) {
    return zn(g) && Gn(g) == a;
  }
  function ga(g, x, P, G, le) {
    return g === x ? !0 : g == null || x == null || !zn(g) && !zn(x) ? g !== g && x !== x : Wd(g, x, P, G, ga, le);
  }
  function Wd(g, x, P, G, le, ne) {
    var he = Hr(g), we = Hr(x), Te = he ? l : Ct(g), fe = we ? l : Ct(x);
    Te = Te == a ? $ : Te, fe = fe == a ? $ : fe;
    var Ge = Te == $, Qe = fe == $, Oe = Te == fe;
    if (Oe && mo(g)) {
      if (!mo(x))
        return !1;
      he = !0, Ge = !1;
    }
    if (Oe && !Ge)
      return ne || (ne = new At()), he || ba(g) ? ya(g, x, P, G, le, ne) : Jd(g, x, Te, P, G, le, ne);
    if (!(P & i)) {
      var We = Ge && lt.call(g, "__wrapped__"), Ve = Qe && lt.call(x, "__wrapped__");
      if (We || Ve) {
        var $t = We ? g.value() : g, yt = Ve ? x.value() : x;
        return ne || (ne = new At()), le($t, yt, P, G, ne);
      }
    }
    return Oe ? (ne || (ne = new At()), Kd(g, x, P, G, le, ne)) : !1;
  }
  function Vd(g) {
    if (!xa(g) || nh(g))
      return !1;
    var x = va(g) ? hd : k;
    return x.test(Yt(g));
  }
  function Yd(g) {
    return zn(g) && _a(g.length) && !!M[Gn(g)];
  }
  function Xd(g) {
    if (!rh(g))
      return gd(g);
    var x = [];
    for (var P in Object(g))
      lt.call(g, P) && P != "constructor" && x.push(P);
    return x;
  }
  function ya(g, x, P, G, le, ne) {
    var he = P & i, we = g.length, Te = x.length;
    if (we != Te && !(he && Te > we))
      return !1;
    var fe = ne.get(g);
    if (fe && ne.get(x))
      return fe == x;
    var Ge = -1, Qe = !0, Oe = P & o ? new Mr() : void 0;
    for (ne.set(g, x), ne.set(x, g); ++Ge < we; ) {
      var We = g[Ge], Ve = x[Ge];
      if (G)
        var $t = he ? G(Ve, We, Ge, x, g, ne) : G(We, Ve, Ge, g, x, ne);
      if ($t !== void 0) {
        if ($t)
          continue;
        Qe = !1;
        break;
      }
      if (Oe) {
        if (!se(x, function(yt, Xt) {
          if (!$e(Oe, Xt) && (We === yt || le(We, yt, P, G, ne)))
            return Oe.push(Xt);
        })) {
          Qe = !1;
          break;
        }
      } else if (!(We === Ve || le(We, Ve, P, G, ne))) {
        Qe = !1;
        break;
      }
    }
    return ne.delete(g), ne.delete(x), Qe;
  }
  function Jd(g, x, P, G, le, ne, he) {
    switch (P) {
      case Z:
        if (g.byteLength != x.byteLength || g.byteOffset != x.byteOffset)
          return !1;
        g = g.buffer, x = x.buffer;
      case q:
        return !(g.byteLength != x.byteLength || !ne(new fa(g), new fa(x)));
      case c:
      case u:
      case w:
        return wa(+g, +x);
      case d:
        return g.name == x.name && g.message == x.message;
      case U:
      case R:
        return g == x + "";
      case y:
        var we = Je;
      case S:
        var Te = G & i;
        if (we || (we = Ke), g.size != x.size && !Te)
          return !1;
        var fe = he.get(g);
        if (fe)
          return fe == x;
        G |= o, he.set(g, x);
        var Ge = ya(we(g), we(x), G, le, ne, he);
        return he.delete(g), Ge;
      case N:
        if (po)
          return po.call(g) == po.call(x);
    }
    return !1;
  }
  function Kd(g, x, P, G, le, ne) {
    var he = P & i, we = Ea(g), Te = we.length, fe = Ea(x), Ge = fe.length;
    if (Te != Ge && !he)
      return !1;
    for (var Qe = Te; Qe--; ) {
      var Oe = we[Qe];
      if (!(he ? Oe in x : lt.call(x, Oe)))
        return !1;
    }
    var We = ne.get(g);
    if (We && ne.get(x))
      return We == x;
    var Ve = !0;
    ne.set(g, x), ne.set(x, g);
    for (var $t = he; ++Qe < Te; ) {
      Oe = we[Qe];
      var yt = g[Oe], Xt = x[Oe];
      if (G)
        var Sa = he ? G(Xt, yt, Oe, x, g, ne) : G(yt, Xt, Oe, g, x, ne);
      if (!(Sa === void 0 ? yt === Xt || le(yt, Xt, P, G, ne) : Sa)) {
        Ve = !1;
        break;
      }
      $t || ($t = Oe == "constructor");
    }
    if (Ve && !$t) {
      var qr = g.constructor, Gr = x.constructor;
      qr != Gr && "constructor" in g && "constructor" in x && !(typeof qr == "function" && qr instanceof qr && typeof Gr == "function" && Gr instanceof Gr) && (Ve = !1);
    }
    return ne.delete(g), ne.delete(x), Ve;
  }
  function Ea(g) {
    return zd(g, lh, Zd);
  }
  function Br(g, x) {
    var P = g.__data__;
    return th(x) ? P[typeof x == "string" ? "string" : "hash"] : P.map;
  }
  function mn(g, x) {
    var P = Ie(g, x);
    return Vd(P) ? P : void 0;
  }
  function Qd(g) {
    var x = lt.call(g, zt), P = g[zt];
    try {
      g[zt] = void 0;
      var G = !0;
    } catch {
    }
    var le = ca.call(g);
    return G && (x ? g[zt] = P : delete g[zt]), le;
  }
  var Zd = ha ? function(g) {
    return g == null ? [] : (g = Object(g), A(ha(g), function(x) {
      return da.call(g, x);
    }));
  } : ch, Ct = Gn;
  (co && Ct(new co(new ArrayBuffer(1))) != Z || Hn && Ct(new Hn()) != y || uo && Ct(uo.resolve()) != B || fo && Ct(new fo()) != S || ho && Ct(new ho()) != E) && (Ct = function(g) {
    var x = Gn(g), P = x == $ ? g.constructor : void 0, G = P ? Yt(P) : "";
    if (G)
      switch (G) {
        case yd:
          return Z;
        case Ed:
          return y;
        case wd:
          return B;
        case vd:
          return S;
        case _d:
          return E;
      }
    return x;
  });
  function eh(g, x) {
    return x = x ?? s, !!x && (typeof g == "number" || J.test(g)) && g > -1 && g % 1 == 0 && g < x;
  }
  function th(g) {
    var x = typeof g;
    return x == "string" || x == "number" || x == "symbol" || x == "boolean" ? g !== "__proto__" : g === null;
  }
  function nh(g) {
    return !!la && la in g;
  }
  function rh(g) {
    var x = g && g.constructor, P = typeof x == "function" && x.prototype || Tt;
    return g === P;
  }
  function ih(g) {
    return ca.call(g);
  }
  function Yt(g) {
    if (g != null) {
      try {
        return aa.call(g);
      } catch {
      }
      try {
        return g + "";
      } catch {
      }
    }
    return "";
  }
  function wa(g, x) {
    return g === x || g !== g && x !== x;
  }
  var oh = ma(/* @__PURE__ */ function() {
    return arguments;
  }()) ? ma : function(g) {
    return zn(g) && lt.call(g, "callee") && !da.call(g, "callee");
  }, Hr = Array.isArray;
  function sh(g) {
    return g != null && _a(g.length) && !va(g);
  }
  var mo = md || uh;
  function ah(g, x) {
    return ga(g, x);
  }
  function va(g) {
    if (!xa(g))
      return !1;
    var x = Gn(g);
    return x == m || x == v || x == p || x == z;
  }
  function _a(g) {
    return typeof g == "number" && g > -1 && g % 1 == 0 && g <= s;
  }
  function xa(g) {
    var x = typeof g;
    return g != null && (x == "object" || x == "function");
  }
  function zn(g) {
    return g != null && typeof g == "object";
  }
  var ba = f ? me(f) : Yd;
  function lh(g) {
    return sh(g) ? Gd(g) : Xd(g);
  }
  function ch() {
    return [];
  }
  function uh() {
    return !1;
  }
  e.exports = ah;
})(Ti, Ti.exports);
var Yv = Ti.exports;
Object.defineProperty($r, "__esModule", { value: !0 });
$r.DownloadedUpdateHelper = void 0;
$r.createTempUpdateFile = Zv;
const Xv = vr, Jv = rt, Bl = Yv, Kt = Ht, lr = ce;
class Kv {
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
    return lr.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, n, r, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return Bl(this.versionInfo, n) && Bl(this.fileInfo.info, r.info) && await (0, Kt.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(r, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, n, r, i, o, s) {
    this._file = t, this._packageFile = n, this.versionInfo = r, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, s && await (0, Kt.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, Kt.emptyDir)(this.cacheDirForPendingUpdate);
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
    if (!await (0, Kt.pathExists)(r))
      return null;
    let o;
    try {
      o = await (0, Kt.readJson)(r);
    } catch (p) {
      let c = "No cached update info available";
      return p.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), c += ` (error on read: ${p.message})`), n.info(c), null;
    }
    if (!((o == null ? void 0 : o.fileName) !== null))
      return n.warn("Cached update info is corrupted: no fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return n.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const a = lr.join(this.cacheDirForPendingUpdate, o.fileName);
    if (!await (0, Kt.pathExists)(a))
      return n.info("Cached update file doesn't exist"), null;
    const l = await Qv(a);
    return t.info.sha512 !== l ? (n.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${l}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, a);
  }
  getUpdateInfoFile() {
    return lr.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
$r.DownloadedUpdateHelper = Kv;
function Qv(e, t = "sha512", n = "base64", r) {
  return new Promise((i, o) => {
    const s = (0, Xv.createHash)(t);
    s.on("error", o).setEncoding(n), (0, Jv.createReadStream)(e, {
      ...r,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      s.end(), i(s.read());
    }).pipe(s, { end: !1 });
  });
}
async function Zv(e, t, n) {
  let r = 0, i = lr.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, Kt.unlink)(i), i;
    } catch (s) {
      if (s.code === "ENOENT")
        return i;
      n.warn(`Error on remove temp update file: ${s}`), i = lr.join(t, `${r++}-${e}`);
    }
  return i;
}
var qi = {}, Ws = {};
Object.defineProperty(Ws, "__esModule", { value: !0 });
Ws.getAppCacheDir = t1;
const Lo = ce, e1 = $i;
function t1() {
  const e = (0, e1.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || Lo.join(e, "AppData", "Local") : process.platform === "darwin" ? t = Lo.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || Lo.join(e, ".cache"), t;
}
Object.defineProperty(qi, "__esModule", { value: !0 });
qi.ElectronAppAdapter = void 0;
const Hl = ce, n1 = Ws;
class r1 {
  constructor(t = ln.app) {
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
    return this.isPackaged ? Hl.join(process.resourcesPath, "app-update.yml") : Hl.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, n1.getAppCacheDir)();
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
qi.ElectronAppAdapter = r1;
var Rf = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = n;
  const t = xe;
  e.NET_SESSION_NAME = "electron-updater";
  function n() {
    return ln.session.fromPartition(e.NET_SESSION_NAME, {
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
      const a = ln.net.request({
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
})(Rf);
var Ir = {}, Xe = {}, i1 = "[object Symbol]", Pf = /[\\^$.*+?()[\]{}|]/g, o1 = RegExp(Pf.source), s1 = typeof Ye == "object" && Ye && Ye.Object === Object && Ye, a1 = typeof self == "object" && self && self.Object === Object && self, l1 = s1 || a1 || Function("return this")(), c1 = Object.prototype, u1 = c1.toString, ql = l1.Symbol, Gl = ql ? ql.prototype : void 0, zl = Gl ? Gl.toString : void 0;
function f1(e) {
  if (typeof e == "string")
    return e;
  if (h1(e))
    return zl ? zl.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function d1(e) {
  return !!e && typeof e == "object";
}
function h1(e) {
  return typeof e == "symbol" || d1(e) && u1.call(e) == i1;
}
function p1(e) {
  return e == null ? "" : f1(e);
}
function m1(e) {
  return e = p1(e), e && o1.test(e) ? e.replace(Pf, "\\$&") : e;
}
var g1 = m1;
Object.defineProperty(Xe, "__esModule", { value: !0 });
Xe.newBaseUrl = E1;
Xe.newUrlFromBase = as;
Xe.getChannelFilename = w1;
Xe.blockmapFiles = v1;
const Nf = Ln, y1 = g1;
function E1(e) {
  const t = new Nf.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function as(e, t, n = !1) {
  const r = new Nf.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? r.search = i : n && (r.search = `noCache=${Date.now().toString(32)}`), r;
}
function w1(e) {
  return `${e}.yml`;
}
function v1(e, t, n) {
  const r = as(`${e.pathname}.blockmap`, e);
  return [as(`${e.pathname.replace(new RegExp(y1(n), "g"), t)}.blockmap`, e), r];
}
var be = {};
Object.defineProperty(be, "__esModule", { value: !0 });
be.Provider = void 0;
be.findFile = b1;
be.parseUpdateInfo = S1;
be.getFileList = Ff;
be.resolveFiles = T1;
const Mt = xe, _1 = Ce, Wl = Xe;
class x1 {
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
    return this.requestHeaders == null ? n != null && (r.headers = n) : r.headers = n == null ? this.requestHeaders : { ...this.requestHeaders, ...n }, (0, Mt.configureRequestUrl)(t, r), r;
  }
}
be.Provider = x1;
function b1(e, t, n) {
  if (e.length === 0)
    throw (0, Mt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const r = e.find((i) => i.url.pathname.toLowerCase().endsWith(`.${t}`));
  return r ?? (n == null ? e[0] : e.find((i) => !n.some((o) => i.url.pathname.toLowerCase().endsWith(`.${o}`))));
}
function S1(e, t, n) {
  if (e == null)
    throw (0, Mt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let r;
  try {
    r = (0, _1.load)(e);
  } catch (i) {
    throw (0, Mt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return r;
}
function Ff(e) {
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
  throw (0, Mt.newError)(`No files provided: ${(0, Mt.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function T1(e, t, n = (r) => r) {
  const i = Ff(e).map((a) => {
    if (a.sha2 == null && a.sha512 == null)
      throw (0, Mt.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, Mt.safeStringifyJson)(a)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, Wl.newUrlFromBase)(n(a.url), t),
      info: a
    };
  }), o = e.packages, s = o == null ? null : o[process.arch] || o.ia32;
  return s != null && (i[0].packageInfo = {
    ...s,
    path: (0, Wl.newUrlFromBase)(n(s.path), t).href
  }), i;
}
Object.defineProperty(Ir, "__esModule", { value: !0 });
Ir.GenericProvider = void 0;
const Vl = xe, Uo = Xe, ko = be;
class A1 extends ko.Provider {
  constructor(t, n, r) {
    super(r), this.configuration = t, this.updater = n, this.baseUrl = (0, Uo.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, Uo.getChannelFilename)(this.channel), n = (0, Uo.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let r = 0; ; r++)
      try {
        return (0, ko.parseUpdateInfo)(await this.httpRequest(n), t, n);
      } catch (i) {
        if (i instanceof Vl.HttpError && i.statusCode === 404)
          throw (0, Vl.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
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
    return (0, ko.resolveFiles)(t, this.baseUrl);
  }
}
Ir.GenericProvider = A1;
var Gi = {}, zi = {};
Object.defineProperty(zi, "__esModule", { value: !0 });
zi.BitbucketProvider = void 0;
const Yl = xe, Mo = Xe, jo = be;
class C1 extends jo.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, Mo.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new Yl.CancellationToken(), n = (0, Mo.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, Mo.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, void 0, t);
      return (0, jo.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, Yl.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, jo.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: n } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${n}, channel: ${this.channel})`;
  }
}
zi.BitbucketProvider = C1;
var jt = {};
Object.defineProperty(jt, "__esModule", { value: !0 });
jt.GitHubProvider = jt.BaseGitHubProvider = void 0;
jt.computeReleaseNotes = Uf;
const wt = xe, bn = Df, $1 = Ln, Sn = Xe, ls = be, Bo = /\/tag\/([^/]+)$/;
class Lf extends ls.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Sn.newBaseUrl)((0, wt.githubUrl)(t, n));
    const i = n === "github.com" ? "api.github.com" : n;
    this.baseApiUrl = (0, Sn.newBaseUrl)((0, wt.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const n = this.options.host;
    return n && !["github.com", "api.github.com"].includes(n) ? `/api/v3${t}` : t;
  }
}
jt.BaseGitHubProvider = Lf;
class I1 extends Lf {
  constructor(t, n, r) {
    super(t, "github.com", r), this.options = t, this.updater = n;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, n, r, i, o;
    const s = new wt.CancellationToken(), a = await this.httpRequest((0, Sn.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, s), l = (0, wt.parseXml)(a);
    let p = l.element("entry", !1, "No published versions on GitHub"), c = null;
    try {
      if (this.updater.allowPrerelease) {
        const w = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((n = bn.prerelease(this.updater.currentVersion)) === null || n === void 0 ? void 0 : n[0]) || null;
        if (w === null)
          c = Bo.exec(p.element("link").attribute("href"))[1];
        else
          for (const b of l.getElements("entry")) {
            const $ = Bo.exec(b.element("link").attribute("href"));
            if ($ === null)
              continue;
            const B = $[1], z = ((r = bn.prerelease(B)) === null || r === void 0 ? void 0 : r[0]) || null, U = !w || ["alpha", "beta"].includes(w), S = z !== null && !["alpha", "beta"].includes(String(z));
            if (U && !S && !(w === "beta" && z === "alpha")) {
              c = B;
              break;
            }
            if (z && z === w) {
              c = B;
              break;
            }
          }
      } else {
        c = await this.getLatestTagName(s);
        for (const w of l.getElements("entry"))
          if (Bo.exec(w.element("link").attribute("href"))[1] === c) {
            p = w;
            break;
          }
      }
    } catch (w) {
      throw (0, wt.newError)(`Cannot parse releases feed: ${w.stack || w.message},
XML:
${a}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (c == null)
      throw (0, wt.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let u, d = "", m = "";
    const v = async (w) => {
      d = (0, Sn.getChannelFilename)(w), m = (0, Sn.newUrlFromBase)(this.getBaseDownloadPath(String(c), d), this.baseUrl);
      const b = this.createRequestOptions(m);
      try {
        return await this.executor.request(b, s);
      } catch ($) {
        throw $ instanceof wt.HttpError && $.statusCode === 404 ? (0, wt.newError)(`Cannot find ${d} in the latest release artifacts (${m}): ${$.stack || $.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : $;
      }
    };
    try {
      let w = this.channel;
      this.updater.allowPrerelease && (!((i = bn.prerelease(c)) === null || i === void 0) && i[0]) && (w = this.getCustomChannelName(String((o = bn.prerelease(c)) === null || o === void 0 ? void 0 : o[0]))), u = await v(w);
    } catch (w) {
      if (this.updater.allowPrerelease)
        u = await v(this.getDefaultChannelName());
      else
        throw w;
    }
    const y = (0, ls.parseUpdateInfo)(u, d, m);
    return y.releaseName == null && (y.releaseName = p.elementValueOrEmpty("title")), y.releaseNotes == null && (y.releaseNotes = Uf(this.updater.currentVersion, this.updater.fullChangelog, l, p)), {
      tag: c,
      ...y
    };
  }
  async getLatestTagName(t) {
    const n = this.options, r = n.host == null || n.host === "github.com" ? (0, Sn.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new $1.URL(`${this.computeGithubBasePath(`/repos/${n.owner}/${n.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(r, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, wt.newError)(`Unable to find latest version on GitHub (${r}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, ls.resolveFiles)(t, this.baseUrl, (n) => this.getBaseDownloadPath(t.tag, n.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, n) {
    return `${this.basePath}/download/${t}/${n}`;
  }
}
jt.GitHubProvider = I1;
function Xl(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function Uf(e, t, n, r) {
  if (!t)
    return Xl(r);
  const i = [];
  for (const o of n.getElements("entry")) {
    const s = /\/tag\/v?([^/]+)$/.exec(o.element("link").attribute("href"))[1];
    bn.lt(e, s) && i.push({
      version: s,
      note: Xl(o)
    });
  }
  return i.sort((o, s) => bn.rcompare(o.version, s.version));
}
var Wi = {};
Object.defineProperty(Wi, "__esModule", { value: !0 });
Wi.KeygenProvider = void 0;
const Jl = xe, Ho = Xe, qo = be;
class O1 extends qo.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n, this.baseUrl = (0, Ho.newBaseUrl)(`https://api.keygen.sh/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Jl.CancellationToken(), n = (0, Ho.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, Ho.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, qo.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, Jl.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, qo.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: n, platform: r } = this.configuration;
    return `Keygen (account: ${t}, product: ${n}, platform: ${r}, channel: ${this.channel})`;
  }
}
Wi.KeygenProvider = O1;
var Vi = {};
Object.defineProperty(Vi, "__esModule", { value: !0 });
Vi.PrivateGitHubProvider = void 0;
const yn = xe, D1 = Ce, R1 = ce, Kl = Ln, Ql = Xe, P1 = jt, N1 = be;
class F1 extends P1.BaseGitHubProvider {
  constructor(t, n, r, i) {
    super(t, "api.github.com", i), this.updater = n, this.token = r;
  }
  createRequestOptions(t, n) {
    const r = super.createRequestOptions(t, n);
    return r.redirect = "manual", r;
  }
  async getLatestVersion() {
    const t = new yn.CancellationToken(), n = (0, Ql.getChannelFilename)(this.getDefaultChannelName()), r = await this.getLatestVersionInfo(t), i = r.assets.find((a) => a.name === n);
    if (i == null)
      throw (0, yn.newError)(`Cannot find ${n} in the release ${r.html_url || r.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new Kl.URL(i.url);
    let s;
    try {
      s = (0, D1.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (a) {
      throw a instanceof yn.HttpError && a.statusCode === 404 ? (0, yn.newError)(`Cannot find ${n} in the latest release artifacts (${o}): ${a.stack || a.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : a;
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
    const i = (0, Ql.newUrlFromBase)(r, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      return n ? o.find((s) => s.prerelease) || o[0] : o;
    } catch (o) {
      throw (0, yn.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, N1.getFileList)(t).map((n) => {
      const r = R1.posix.basename(n.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === r);
      if (i == null)
        throw (0, yn.newError)(`Cannot find asset "${r}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Kl.URL(i.url),
        info: n
      };
    });
  }
}
Vi.PrivateGitHubProvider = F1;
Object.defineProperty(Gi, "__esModule", { value: !0 });
Gi.isUrlProbablySupportMultiRangeRequests = kf;
Gi.createClient = j1;
const ri = xe, L1 = zi, Zl = Ir, U1 = jt, k1 = Wi, M1 = Vi;
function kf(e) {
  return !e.includes("s3.amazonaws.com");
}
function j1(e, t, n) {
  if (typeof e == "string")
    throw (0, ri.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const r = e.provider;
  switch (r) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new U1.GitHubProvider(i, t, n) : new M1.PrivateGitHubProvider(i, t, o, n);
    }
    case "bitbucket":
      return new L1.BitbucketProvider(e, t, n);
    case "keygen":
      return new k1.KeygenProvider(e, t, n);
    case "s3":
    case "spaces":
      return new Zl.GenericProvider({
        provider: "generic",
        url: (0, ri.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...n,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new Zl.GenericProvider(i, t, {
        ...n,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && kf(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, ri.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, n);
    }
    default:
      throw (0, ri.newError)(`Unsupported provider: ${r}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var Yi = {}, Or = {}, Mn = {}, hn = {};
Object.defineProperty(hn, "__esModule", { value: !0 });
hn.OperationKind = void 0;
hn.computeOperations = B1;
var nn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(nn || (hn.OperationKind = nn = {}));
function B1(e, t, n) {
  const r = tc(e.files), i = tc(t.files);
  let o = null;
  const s = t.files[0], a = [], l = s.name, p = r.get(l);
  if (p == null)
    throw new Error(`no file ${l} in old blockmap`);
  const c = i.get(l);
  let u = 0;
  const { checksumToOffset: d, checksumToOldSize: m } = q1(r.get(l), p.offset, n);
  let v = s.offset;
  for (let y = 0; y < c.checksums.length; v += c.sizes[y], y++) {
    const w = c.sizes[y], b = c.checksums[y];
    let $ = d.get(b);
    $ != null && m.get(b) !== w && (n.warn(`Checksum ("${b}") matches, but size differs (old: ${m.get(b)}, new: ${w})`), $ = void 0), $ === void 0 ? (u++, o != null && o.kind === nn.DOWNLOAD && o.end === v ? o.end += w : (o = {
      kind: nn.DOWNLOAD,
      start: v,
      end: v + w
      // oldBlocks: null,
    }, ec(o, a, b, y))) : o != null && o.kind === nn.COPY && o.end === $ ? o.end += w : (o = {
      kind: nn.COPY,
      start: $,
      end: $ + w
      // oldBlocks: [checksum]
    }, ec(o, a, b, y));
  }
  return u > 0 && n.info(`File${s.name === "file" ? "" : " " + s.name} has ${u} changed blocks`), a;
}
const H1 = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function ec(e, t, n, r) {
  if (H1 && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((s, a) => s < a ? s : a);
      throw new Error(`operation (block index: ${r}, checksum: ${n}, kind: ${nn[e.kind]}) overlaps previous operation (checksum: ${n}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function q1(e, t, n) {
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
function tc(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.set(n.name, n);
  return t;
}
Object.defineProperty(Mn, "__esModule", { value: !0 });
Mn.DataSplitter = void 0;
Mn.copyData = Mf;
const ii = xe, G1 = rt, z1 = it, W1 = hn, nc = Buffer.from(`\r
\r
`);
var Rt;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(Rt || (Rt = {}));
function Mf(e, t, n, r, i) {
  const o = (0, G1.createReadStream)("", {
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
class V1 extends z1.Writable {
  constructor(t, n, r, i, o, s) {
    super(), this.out = t, this.options = n, this.partIndexToTaskIndex = r, this.partIndexToLength = o, this.finishHandler = s, this.partIndex = -1, this.headerListBuffer = null, this.readState = Rt.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
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
      throw (0, ii.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const r = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= r, n = r;
    } else if (this.remainingPartDataCount > 0) {
      const r = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= r, await this.processPartData(t, 0, r), n = r;
    }
    if (n !== t.length) {
      if (this.readState === Rt.HEADER) {
        const r = this.searchHeaderListEnd(t, n);
        if (r === -1)
          return;
        n = r, this.readState = Rt.BODY, this.headerListBuffer = null;
      }
      for (; ; ) {
        if (this.readState === Rt.BODY)
          this.readState = Rt.INIT;
        else {
          this.partIndex++;
          let s = this.partIndexToTaskIndex.get(this.partIndex);
          if (s == null)
            if (this.isFinished)
              s = this.options.end;
            else
              throw (0, ii.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (a < s)
            await this.copyExistingData(a, s);
          else if (a > s)
            throw (0, ii.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (n = this.searchHeaderListEnd(t, n), n === -1) {
            this.readState = Rt.HEADER;
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
        if (s.kind !== W1.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        Mf(s, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, n) {
    const r = t.indexOf(nc, n);
    if (r !== -1)
      return r + nc.length;
    const i = n === 0 ? t : t.slice(n);
    return this.headerListBuffer == null ? this.headerListBuffer = i : this.headerListBuffer = Buffer.concat([this.headerListBuffer, i]), -1;
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, ii.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
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
Mn.DataSplitter = V1;
var Xi = {};
Object.defineProperty(Xi, "__esModule", { value: !0 });
Xi.executeTasksUsingMultipleRangeRequests = Y1;
Xi.checkIsRangesSupported = us;
const cs = xe, rc = Mn, ic = hn;
function Y1(e, t, n, r, i) {
  const o = (s) => {
    if (s >= t.length) {
      e.fileMetadataBuffer != null && n.write(e.fileMetadataBuffer), n.end();
      return;
    }
    const a = s + 1e3;
    X1(e, {
      tasks: t,
      start: s,
      end: Math.min(t.length, a),
      oldFileFd: r
    }, n, () => o(a), i);
  };
  return o;
}
function X1(e, t, n, r, i) {
  let o = "bytes=", s = 0;
  const a = /* @__PURE__ */ new Map(), l = [];
  for (let u = t.start; u < t.end; u++) {
    const d = t.tasks[u];
    d.kind === ic.OperationKind.DOWNLOAD && (o += `${d.start}-${d.end - 1}, `, a.set(s, u), s++, l.push(d.end - d.start));
  }
  if (s <= 1) {
    const u = (d) => {
      if (d >= t.end) {
        r();
        return;
      }
      const m = t.tasks[d++];
      if (m.kind === ic.OperationKind.COPY)
        (0, rc.copyData)(m, n, t.oldFileFd, i, () => u(d));
      else {
        const v = e.createRequestOptions();
        v.headers.Range = `bytes=${m.start}-${m.end - 1}`;
        const y = e.httpExecutor.createRequest(v, (w) => {
          us(w, i) && (w.pipe(n, {
            end: !1
          }), w.once("end", () => u(d)));
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
    if (!us(u, i))
      return;
    const d = (0, cs.safeGetHeader)(u, "content-type"), m = /^multipart\/.+?(?:; boundary=(?:(?:"(.+)")|(?:([^\s]+))))$/i.exec(d);
    if (m == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${d}"`));
      return;
    }
    const v = new rc.DataSplitter(n, t, a, m[1] || m[2], l, r);
    v.on("error", i), u.pipe(v), u.on("end", () => {
      setTimeout(() => {
        c.abort(), i(new Error("Response ends without calling any handlers"));
      }, 1e4);
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(c, i), c.end();
}
function us(e, t) {
  if (e.statusCode >= 400)
    return t((0, cs.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const n = (0, cs.safeGetHeader)(e, "accept-ranges");
    if (n == null || n === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var Ji = {};
Object.defineProperty(Ji, "__esModule", { value: !0 });
Ji.ProgressDifferentialDownloadCallbackTransform = void 0;
const J1 = it;
var Tn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Tn || (Tn = {}));
class K1 extends J1.Transform {
  constructor(t, n, r) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = Tn.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == Tn.COPY) {
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
    this.operationType = Tn.COPY;
  }
  beginRangeDownload() {
    this.operationType = Tn.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
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
Ji.ProgressDifferentialDownloadCallbackTransform = K1;
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.DifferentialDownloader = void 0;
const Xn = xe, Go = Ht, Q1 = rt, Z1 = Mn, e_ = Ln, oi = hn, oc = Xi, t_ = Ji;
class n_ {
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
    return (0, Xn.configureRequestUrl)(this.options.newUrl, t), (0, Xn.configureRequestOptions)(t), t;
  }
  doDownload(t, n) {
    if (t.version !== n.version)
      throw new Error(`version is different (${t.version} - ${n.version}), full download is required`);
    const r = this.logger, i = (0, oi.computeOperations)(t, n, r);
    r.debug != null && r.debug(JSON.stringify(i, null, 2));
    let o = 0, s = 0;
    for (const l of i) {
      const p = l.end - l.start;
      l.kind === oi.OperationKind.DOWNLOAD ? o += p : s += p;
    }
    const a = this.blockAwareFileInfo.size;
    if (o + s + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== a)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${s}, newSize: ${a}`);
    return r.info(`Full: ${sc(a)}, To download: ${sc(o)} (${Math.round(o / (a / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const n = [], r = () => Promise.all(n.map((i) => (0, Go.close)(i.descriptor).catch((o) => {
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
    const r = await (0, Go.open)(this.options.oldFile, "r");
    n.push({ descriptor: r, path: this.options.oldFile });
    const i = await (0, Go.open)(this.options.newFile, "w");
    n.push({ descriptor: i, path: this.options.newFile });
    const o = (0, Q1.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((s, a) => {
      const l = [];
      let p;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const b = [];
        let $ = 0;
        for (const z of t)
          z.kind === oi.OperationKind.DOWNLOAD && (b.push(z.end - z.start), $ += z.end - z.start);
        const B = {
          expectedByteCounts: b,
          grandTotal: $
        };
        p = new t_.ProgressDifferentialDownloadCallbackTransform(B, this.options.cancellationToken, this.options.onProgress), l.push(p);
      }
      const c = new Xn.DigestTransform(this.blockAwareFileInfo.sha512);
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
        m = (0, oc.executeTasksUsingMultipleRangeRequests)(this, t, d, r, a), m(0);
        return;
      }
      let v = 0, y = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const w = this.createRequestOptions();
      w.redirect = "manual", m = (b) => {
        var $, B;
        if (b >= t.length) {
          this.fileMetadataBuffer != null && d.write(this.fileMetadataBuffer), d.end();
          return;
        }
        const z = t[b++];
        if (z.kind === oi.OperationKind.COPY) {
          p && p.beginFileCopy(), (0, Z1.copyData)(z, d, r, a, () => m(b));
          return;
        }
        const U = `bytes=${z.start}-${z.end - 1}`;
        w.headers.range = U, (B = ($ = this.logger) === null || $ === void 0 ? void 0 : $.debug) === null || B === void 0 || B.call($, `download range: ${U}`), p && p.beginRangeDownload();
        const S = this.httpExecutor.createRequest(w, (R) => {
          R.on("error", a), R.on("aborted", () => {
            a(new Error("response has been aborted by the server"));
          }), R.statusCode >= 400 && a((0, Xn.createHttpError)(R)), R.pipe(d, {
            end: !1
          }), R.once("end", () => {
            p && p.endRangeDownload(), ++v === 100 ? (v = 0, setTimeout(() => m(b), 1e3)) : m(b);
          });
        });
        S.on("redirect", (R, N, D) => {
          this.logger.info(`Redirect to ${r_(D)}`), y = D, (0, Xn.configureRequestUrl)(new e_.URL(y), w), S.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(S, a), S.end();
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
        (0, oc.checkIsRangesSupported)(s, i) && (s.on("error", i), s.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), s.on("data", n), s.on("end", () => r()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
Or.DifferentialDownloader = n_;
function sc(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function r_(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(Yi, "__esModule", { value: !0 });
Yi.GenericDifferentialDownloader = void 0;
const i_ = Or;
class o_ extends i_.DifferentialDownloader {
  download(t, n) {
    return this.doDownload(t, n);
  }
}
Yi.GenericDifferentialDownloader = o_;
var ac;
function Vs() {
  if (ac) return Jt;
  ac = 1, Object.defineProperty(Jt, "__esModule", { value: !0 }), Jt.NoOpLogger = Jt.AppUpdater = void 0;
  const e = xe, t = vr, n = $i, r = Ci, i = Ht, o = Ce, s = ki, a = ce, l = Df, p = $r, c = qi, u = Rf, d = Ir, m = jn(), v = Gi, y = ms, w = Xe, b = Yi;
  let $ = class jf extends r.EventEmitter {
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
    set channel(S) {
      if (this._channel != null) {
        if (typeof S != "string")
          throw (0, e.newError)(`Channel must be a string, but got: ${S}`, "ERR_UPDATER_INVALID_CHANNEL");
        if (S.length === 0)
          throw (0, e.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
      }
      this._channel = S, this.allowDowngrade = !0;
    }
    /**
     *  Shortcut for explicitly adding auth tokens to request headers
     */
    addAuthHeader(S) {
      this.requestHeaders = Object.assign({}, this.requestHeaders, {
        authorization: S
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
    set logger(S) {
      this._logger = S ?? new z();
    }
    // noinspection JSUnusedGlobalSymbols
    /**
     * test only
     * @private
     */
    set updateConfigPath(S) {
      this.clientPromise = null, this._appUpdateConfigPath = S, this.configOnDisk = new s.Lazy(() => this.loadUpdateConfig());
    }
    constructor(S, R) {
      super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new m.UpdaterSignal(this), this._appUpdateConfigPath = null, this.clientPromise = null, this.stagingUserIdPromise = new s.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new s.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (E) => {
        this._logger.error(`Error: ${E.stack || E.message}`);
      }), R == null ? (this.app = new c.ElectronAppAdapter(), this.httpExecutor = new u.ElectronHttpExecutor((E, q) => this.emit("login", E, q))) : (this.app = R, this.httpExecutor = null);
      const N = this.app.version, D = (0, l.parse)(N);
      if (D == null)
        throw (0, e.newError)(`App version is not a valid semver version: "${N}"`, "ERR_UPDATER_INVALID_VERSION");
      this.currentVersion = D, this.allowPrerelease = B(D), S != null && (this.setFeedURL(S), typeof S != "string" && S.requestHeaders && (this.requestHeaders = S.requestHeaders));
    }
    //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
    getFeedURL() {
      return "Deprecated. Do not use it.";
    }
    /**
     * Configure update provider. If value is `string`, [GenericServerOptions](./publish.md#genericserveroptions) will be set with value as `url`.
     * @param options If you want to override configuration in the `app-update.yml`.
     */
    setFeedURL(S) {
      const R = this.createProviderRuntimeOptions();
      let N;
      typeof S == "string" ? N = new d.GenericProvider({ provider: "generic", url: S }, this, {
        ...R,
        isUseMultipleRangeRequest: (0, v.isUrlProbablySupportMultiRangeRequests)(S)
      }) : N = (0, v.createClient)(S, this, R), this.clientPromise = Promise.resolve(N);
    }
    /**
     * Asks the server whether there is an update.
     */
    checkForUpdates() {
      if (!this.isUpdaterActive())
        return Promise.resolve(null);
      let S = this.checkForUpdatesPromise;
      if (S != null)
        return this._logger.info("Checking for update (already in progress)"), S;
      const R = () => this.checkForUpdatesPromise = null;
      return this._logger.info("Checking for update"), S = this.doCheckForUpdates().then((N) => (R(), N)).catch((N) => {
        throw R(), this.emit("error", N, `Cannot check for updates: ${(N.stack || N).toString()}`), N;
      }), this.checkForUpdatesPromise = S, S;
    }
    isUpdaterActive() {
      return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
    }
    // noinspection JSUnusedGlobalSymbols
    checkForUpdatesAndNotify(S) {
      return this.checkForUpdates().then((R) => R != null && R.downloadPromise ? (R.downloadPromise.then(() => {
        const N = jf.formatDownloadNotification(R.updateInfo.version, this.app.name, S);
        new ln.Notification(N).show();
      }), R) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), R));
    }
    static formatDownloadNotification(S, R, N) {
      return N == null && (N = {
        title: "A new update is ready to install",
        body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
      }), N = {
        title: N.title.replace("{appName}", R).replace("{version}", S),
        body: N.body.replace("{appName}", R).replace("{version}", S)
      }, N;
    }
    async isStagingMatch(S) {
      const R = S.stagingPercentage;
      let N = R;
      if (N == null)
        return !0;
      if (N = parseInt(N, 10), isNaN(N))
        return this._logger.warn(`Staging percentage is NaN: ${R}`), !0;
      N = N / 100;
      const D = await this.stagingUserIdPromise.value, q = e.UUID.parse(D).readUInt32BE(12) / 4294967295;
      return this._logger.info(`Staging percentage: ${N}, percentage: ${q}, user id: ${D}`), q < N;
    }
    computeFinalHeaders(S) {
      return this.requestHeaders != null && Object.assign(S, this.requestHeaders), S;
    }
    async isUpdateAvailable(S) {
      const R = (0, l.parse)(S.version);
      if (R == null)
        throw (0, e.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${S.version}"`, "ERR_UPDATER_INVALID_VERSION");
      const N = this.currentVersion;
      if ((0, l.eq)(R, N))
        return !1;
      const D = S == null ? void 0 : S.minimumSystemVersion, E = (0, n.release)();
      if (D)
        try {
          if ((0, l.lt)(E, D))
            return this._logger.info(`Current OS version ${E} is less than the minimum OS version required ${D} for version ${E}`), !1;
        } catch (ee) {
          this._logger.warn(`Failed to compare current OS version(${E}) with minimum OS version(${D}): ${(ee.message || ee).toString()}`);
        }
      if (!await this.isStagingMatch(S))
        return !1;
      const Z = (0, l.gt)(R, N), te = (0, l.lt)(R, N);
      return Z ? !0 : this.allowDowngrade && te;
    }
    async getUpdateInfoAndProvider() {
      await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((N) => (0, v.createClient)(N, this, this.createProviderRuntimeOptions())));
      const S = await this.clientPromise, R = await this.stagingUserIdPromise.value;
      return S.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": R })), {
        info: await S.getLatestVersion(),
        provider: S
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
      const S = await this.getUpdateInfoAndProvider(), R = S.info;
      if (!await this.isUpdateAvailable(R))
        return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${R.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", R), {
          versionInfo: R,
          updateInfo: R
        };
      this.updateInfoAndProvider = S, this.onUpdateAvailable(R);
      const N = new e.CancellationToken();
      return {
        versionInfo: R,
        updateInfo: R,
        cancellationToken: N,
        downloadPromise: this.autoDownload ? this.downloadUpdate(N) : null
      };
    }
    onUpdateAvailable(S) {
      this._logger.info(`Found version ${S.version} (url: ${(0, e.asArray)(S.files).map((R) => R.url).join(", ")})`), this.emit("update-available", S);
    }
    /**
     * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
     * @returns {Promise<Array<string>>} Paths to downloaded files.
     */
    downloadUpdate(S = new e.CancellationToken()) {
      const R = this.updateInfoAndProvider;
      if (R == null) {
        const D = new Error("Please check update first");
        return this.dispatchError(D), Promise.reject(D);
      }
      if (this.downloadPromise != null)
        return this._logger.info("Downloading update (already in progress)"), this.downloadPromise;
      this._logger.info(`Downloading update from ${(0, e.asArray)(R.info.files).map((D) => D.url).join(", ")}`);
      const N = (D) => {
        if (!(D instanceof e.CancellationError))
          try {
            this.dispatchError(D);
          } catch (E) {
            this._logger.warn(`Cannot dispatch error event: ${E.stack || E}`);
          }
        return D;
      };
      return this.downloadPromise = this.doDownloadUpdate({
        updateInfoAndProvider: R,
        requestHeaders: this.computeRequestHeaders(R.provider),
        cancellationToken: S,
        disableWebInstaller: this.disableWebInstaller,
        disableDifferentialDownload: this.disableDifferentialDownload
      }).catch((D) => {
        throw N(D);
      }).finally(() => {
        this.downloadPromise = null;
      }), this.downloadPromise;
    }
    dispatchError(S) {
      this.emit("error", S, (S.stack || S).toString());
    }
    dispatchUpdateDownloaded(S) {
      this.emit(m.UPDATE_DOWNLOADED, S);
    }
    async loadUpdateConfig() {
      return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, o.load)(await (0, i.readFile)(this._appUpdateConfigPath, "utf-8"));
    }
    computeRequestHeaders(S) {
      const R = S.fileExtraDownloadHeaders;
      if (R != null) {
        const N = this.requestHeaders;
        return N == null ? R : {
          ...R,
          ...N
        };
      }
      return this.computeFinalHeaders({ accept: "*/*" });
    }
    async getOrCreateStagingUserId() {
      const S = a.join(this.app.userDataPath, ".updaterId");
      try {
        const N = await (0, i.readFile)(S, "utf-8");
        if (e.UUID.check(N))
          return N;
        this._logger.warn(`Staging user id file exists, but content was invalid: ${N}`);
      } catch (N) {
        N.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${N}`);
      }
      const R = e.UUID.v5((0, t.randomBytes)(4096), e.UUID.OID);
      this._logger.info(`Generated new staging user ID: ${R}`);
      try {
        await (0, i.outputFile)(S, R);
      } catch (N) {
        this._logger.warn(`Couldn't write out staging user ID: ${N}`);
      }
      return R;
    }
    /** @internal */
    get isAddNoCacheQuery() {
      const S = this.requestHeaders;
      if (S == null)
        return !0;
      for (const R of Object.keys(S)) {
        const N = R.toLowerCase();
        if (N === "authorization" || N === "private-token")
          return !1;
      }
      return !0;
    }
    async getOrCreateDownloadHelper() {
      let S = this.downloadedUpdateHelper;
      if (S == null) {
        const R = (await this.configOnDisk.value).updaterCacheDirName, N = this._logger;
        R == null && N.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
        const D = a.join(this.app.baseCachePath, R || this.app.name);
        N.debug != null && N.debug(`updater cache dir: ${D}`), S = new p.DownloadedUpdateHelper(D), this.downloadedUpdateHelper = S;
      }
      return S;
    }
    async executeDownload(S) {
      const R = S.fileInfo, N = {
        headers: S.downloadUpdateOptions.requestHeaders,
        cancellationToken: S.downloadUpdateOptions.cancellationToken,
        sha2: R.info.sha2,
        sha512: R.info.sha512
      };
      this.listenerCount(m.DOWNLOAD_PROGRESS) > 0 && (N.onProgress = (k) => this.emit(m.DOWNLOAD_PROGRESS, k));
      const D = S.downloadUpdateOptions.updateInfoAndProvider.info, E = D.version, q = R.packageInfo;
      function Z() {
        const k = decodeURIComponent(S.fileInfo.url.pathname);
        return k.endsWith(`.${S.fileExtension}`) ? a.basename(k) : S.fileInfo.info.url;
      }
      const te = await this.getOrCreateDownloadHelper(), ee = te.cacheDirForPendingUpdate;
      await (0, i.mkdir)(ee, { recursive: !0 });
      const Q = Z();
      let Y = a.join(ee, Q);
      const C = q == null ? null : a.join(ee, `package-${E}${a.extname(q.path) || ".7z"}`), I = async (k) => (await te.setDownloadedFile(Y, C, D, R, Q, k), await S.done({
        ...D,
        downloadedFile: Y
      }), C == null ? [Y] : [Y, C]), T = this._logger, L = await te.validateDownloadedPath(Y, D, R, T);
      if (L != null)
        return Y = L, await I(!1);
      const j = async () => (await te.clear().catch(() => {
      }), await (0, i.unlink)(Y).catch(() => {
      })), O = await (0, p.createTempUpdateFile)(`temp-${Q}`, ee, T);
      try {
        await S.task(O, N, C, j), await (0, e.retry)(() => (0, i.rename)(O, Y), 60, 500, 0, 0, (k) => k instanceof Error && /^EBUSY:/.test(k.message));
      } catch (k) {
        throw await j(), k instanceof e.CancellationError && (T.info("cancelled"), this.emit("update-cancelled", D)), k;
      }
      return T.info(`New version ${E} has been downloaded to ${Y}`), await I(!0);
    }
    async differentialDownloadInstaller(S, R, N, D, E) {
      try {
        if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
          return !0;
        const q = (0, w.blockmapFiles)(S.url, this.app.version, R.updateInfoAndProvider.info.version);
        this._logger.info(`Download block maps (old: "${q[0]}", new: ${q[1]})`);
        const Z = async (Q) => {
          const Y = await this.httpExecutor.downloadToBuffer(Q, {
            headers: R.requestHeaders,
            cancellationToken: R.cancellationToken
          });
          if (Y == null || Y.length === 0)
            throw new Error(`Blockmap "${Q.href}" is empty`);
          try {
            return JSON.parse((0, y.gunzipSync)(Y).toString());
          } catch (C) {
            throw new Error(`Cannot parse blockmap "${Q.href}", error: ${C}`);
          }
        }, te = {
          newUrl: S.url,
          oldFile: a.join(this.downloadedUpdateHelper.cacheDir, E),
          logger: this._logger,
          newFile: N,
          isUseMultipleRangeRequest: D.isUseMultipleRangeRequest,
          requestHeaders: R.requestHeaders,
          cancellationToken: R.cancellationToken
        };
        this.listenerCount(m.DOWNLOAD_PROGRESS) > 0 && (te.onProgress = (Q) => this.emit(m.DOWNLOAD_PROGRESS, Q));
        const ee = await Promise.all(q.map((Q) => Z(Q)));
        return await new b.GenericDifferentialDownloader(S.info, this.httpExecutor, te).download(ee[0], ee[1]), !1;
      } catch (q) {
        if (this._logger.error(`Cannot download differentially, fallback to full download: ${q.stack || q}`), this._testOnlyOptions != null)
          throw q;
        return !0;
      }
    }
  };
  Jt.AppUpdater = $;
  function B(U) {
    const S = (0, l.prerelease)(U);
    return S != null && S.length > 0;
  }
  class z {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    info(S) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    warn(S) {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    error(S) {
    }
  }
  return Jt.NoOpLogger = z, Jt;
}
var lc;
function Dr() {
  if (lc) return Vn;
  lc = 1, Object.defineProperty(Vn, "__esModule", { value: !0 }), Vn.BaseUpdater = void 0;
  const e = Ii, t = Vs();
  let n = class extends t.AppUpdater {
    constructor(i, o) {
      super(i, o), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
    }
    quitAndInstall(i = !1, o = !1) {
      this._logger.info("Install on explicit quitAndInstall"), this.install(i, i ? o : this.autoRunAppAfterInstall) ? setImmediate(() => {
        ln.autoUpdater.emit("before-quit-for-update"), this.app.quit();
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
  return Vn.BaseUpdater = n, Vn;
}
var Jn = {}, Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const En = Ht, s_ = Or, a_ = ms;
class l_ extends s_.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, n = t.size, r = n - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(r, n - 1);
    const i = Bf(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await c_(this.options.oldFile), i);
  }
}
Rr.FileWithEmbeddedBlockMapDifferentialDownloader = l_;
function Bf(e) {
  return JSON.parse((0, a_.inflateRawSync)(e).toString());
}
async function c_(e) {
  const t = await (0, En.open)(e, "r");
  try {
    const n = (await (0, En.fstat)(t)).size, r = Buffer.allocUnsafe(4);
    await (0, En.read)(t, r, 0, r.length, n - r.length);
    const i = Buffer.allocUnsafe(r.readUInt32BE(0));
    return await (0, En.read)(t, i, 0, i.length, n - r.length - i.length), await (0, En.close)(t), Bf(i);
  } catch (n) {
    throw await (0, En.close)(t), n;
  }
}
var cc;
function uc() {
  if (cc) return Jn;
  cc = 1, Object.defineProperty(Jn, "__esModule", { value: !0 }), Jn.AppImageUpdater = void 0;
  const e = xe, t = Ii, n = Ht, r = rt, i = ce, o = Dr(), s = Rr, a = jn(), l = be;
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
        task: async (v, y) => {
          const w = process.env.APPIMAGE;
          if (w == null)
            throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
          let b = !1;
          try {
            const $ = {
              newUrl: m.url,
              oldFile: w,
              logger: this._logger,
              newFile: v,
              isUseMultipleRangeRequest: d.isUseMultipleRangeRequest,
              requestHeaders: u.requestHeaders,
              cancellationToken: u.cancellationToken
            };
            this.listenerCount(a.DOWNLOAD_PROGRESS) > 0 && ($.onProgress = (B) => this.emit(a.DOWNLOAD_PROGRESS, B)), await new s.FileWithEmbeddedBlockMapDifferentialDownloader(m.info, this.httpExecutor, $).download();
          } catch ($) {
            this._logger.error(`Cannot download differentially, fallback to full download: ${$.stack || $}`), b = process.platform === "linux";
          }
          b && await this.httpExecutor.download(m.url, v, y), await (0, n.chmod)(v, 493);
        }
      });
    }
    doInstall(u) {
      const d = process.env.APPIMAGE;
      if (d == null)
        throw (0, e.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
      (0, r.unlinkSync)(d);
      let m;
      const v = i.basename(d);
      i.basename(u.installerPath) === v || !/\d+\.\d+\.\d+/.test(v) ? m = d : m = i.join(i.dirname(d), i.basename(u.installerPath)), (0, t.execFileSync)("mv", ["-f", u.installerPath, m]), m !== d && this.emit("appimage-filename-updated", m);
      const y = {
        ...process.env,
        APPIMAGE_SILENT_INSTALL: "true"
      };
      return u.isForceRunAfter ? this.spawnLog(m, [], y) : (y.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, t.execFileSync)(m, [], { env: y })), !0;
    }
  };
  return Jn.AppImageUpdater = p, Jn;
}
var Kn = {}, fc;
function dc() {
  if (fc) return Kn;
  fc = 1, Object.defineProperty(Kn, "__esModule", { value: !0 }), Kn.DebUpdater = void 0;
  const e = Dr(), t = jn(), n = be;
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
  return Kn.DebUpdater = r, Kn;
}
var Qn = {}, hc;
function pc() {
  if (hc) return Qn;
  hc = 1, Object.defineProperty(Qn, "__esModule", { value: !0 }), Qn.RpmUpdater = void 0;
  const e = Dr(), t = jn(), n = be;
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
  return Qn.RpmUpdater = r, Qn;
}
var Zn = {}, mc;
function gc() {
  if (mc) return Zn;
  mc = 1, Object.defineProperty(Zn, "__esModule", { value: !0 }), Zn.MacUpdater = void 0;
  const e = xe, t = Ht, n = rt, r = ce, i = hh, o = Vs(), s = be, a = Ii, l = vr;
  let p = class extends o.AppUpdater {
    constructor(u, d) {
      super(u, d), this.nativeUpdater = ln.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (m) => {
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
      const m = this._logger, v = "sysctl.proc_translated";
      let y = !1;
      try {
        this.debug("Checking for macOS Rosetta environment"), y = (0, a.execFileSync)("sysctl", [v], { encoding: "utf8" }).includes(`${v}: 1`), m.info(`Checked for macOS Rosetta environment (isRosetta=${y})`);
      } catch (U) {
        m.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${U}`);
      }
      let w = !1;
      try {
        this.debug("Checking for arm64 in uname");
        const S = (0, a.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
        m.info(`Checked 'uname -a': arm64=${S}`), w = w || S;
      } catch (U) {
        m.warn(`uname shell command to check for arm64 failed: ${U}`);
      }
      w = w || process.arch === "arm64" || y;
      const b = (U) => {
        var S;
        return U.url.pathname.includes("arm64") || ((S = U.info.url) === null || S === void 0 ? void 0 : S.includes("arm64"));
      };
      w && d.some(b) ? d = d.filter((U) => w === b(U)) : d = d.filter((U) => !b(U));
      const $ = (0, s.findFile)(d, "zip", ["pkg", "dmg"]);
      if ($ == null)
        throw (0, e.newError)(`ZIP file not provided: ${(0, e.safeStringifyJson)(d)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
      const B = u.updateInfoAndProvider.provider, z = "update.zip";
      return this.executeDownload({
        fileExtension: "zip",
        fileInfo: $,
        downloadUpdateOptions: u,
        task: async (U, S) => {
          const R = r.join(this.downloadedUpdateHelper.cacheDir, z), N = () => (0, t.pathExistsSync)(R) ? !u.disableDifferentialDownload : (m.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
          let D = !0;
          N() && (D = await this.differentialDownloadInstaller($, u, U, B, z)), D && await this.httpExecutor.download($.url, U, S);
        },
        done: (U) => {
          if (!u.disableDifferentialDownload)
            try {
              const S = r.join(this.downloadedUpdateHelper.cacheDir, z);
              (0, n.copyFileSync)(U.downloadedFile, S);
            } catch (S) {
              this._logger.warn(`Unable to copy file for caching for future differential downloads: ${S.message}`);
            }
          return this.updateDownloaded($, U);
        }
      });
    }
    async updateDownloaded(u, d) {
      var m;
      const v = d.downloadedFile, y = (m = u.info.size) !== null && m !== void 0 ? m : (await (0, t.stat)(v)).size, w = this._logger, b = `fileToProxy=${u.url.href}`;
      this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${b})`), this.server = (0, i.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${b})`), this.server.on("close", () => {
        w.info(`Proxy server for native Squirrel.Mac is closed (${b})`);
      });
      const $ = (B) => {
        const z = B.address();
        return typeof z == "string" ? z : `http://127.0.0.1:${z == null ? void 0 : z.port}`;
      };
      return await new Promise((B, z) => {
        const U = (0, l.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), S = Buffer.from(`autoupdater:${U}`, "ascii"), R = `/${(0, l.randomBytes)(64).toString("hex")}.zip`;
        this.server.on("request", (N, D) => {
          const E = N.url;
          if (w.info(`${E} requested`), E === "/") {
            if (!N.headers.authorization || N.headers.authorization.indexOf("Basic ") === -1) {
              D.statusCode = 401, D.statusMessage = "Invalid Authentication Credentials", D.end(), w.warn("No authenthication info");
              return;
            }
            const te = N.headers.authorization.split(" ")[1], ee = Buffer.from(te, "base64").toString("ascii"), [Q, Y] = ee.split(":");
            if (Q !== "autoupdater" || Y !== U) {
              D.statusCode = 401, D.statusMessage = "Invalid Authentication Credentials", D.end(), w.warn("Invalid authenthication credentials");
              return;
            }
            const C = Buffer.from(`{ "url": "${$(this.server)}${R}" }`);
            D.writeHead(200, { "Content-Type": "application/json", "Content-Length": C.length }), D.end(C);
            return;
          }
          if (!E.startsWith(R)) {
            w.warn(`${E} requested, but not supported`), D.writeHead(404), D.end();
            return;
          }
          w.info(`${R} requested by Squirrel.Mac, pipe ${v}`);
          let q = !1;
          D.on("finish", () => {
            q || (this.nativeUpdater.removeListener("error", z), B([]));
          });
          const Z = (0, n.createReadStream)(v);
          Z.on("error", (te) => {
            try {
              D.end();
            } catch (ee) {
              w.warn(`cannot end response: ${ee}`);
            }
            q = !0, this.nativeUpdater.removeListener("error", z), z(new Error(`Cannot pipe "${v}": ${te}`));
          }), D.writeHead(200, {
            "Content-Type": "application/zip",
            "Content-Length": y
          }), Z.pipe(D);
        }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${b})`), this.server.listen(0, "127.0.0.1", () => {
          this.debug(`Proxy server for native Squirrel.Mac is listening (address=${$(this.server)}, ${b})`), this.nativeUpdater.setFeedURL({
            url: $(this.server),
            headers: {
              "Cache-Control": "no-cache",
              Authorization: `Basic ${S.toString("base64")}`
            }
          }), this.dispatchUpdateDownloaded(d), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", z), this.nativeUpdater.checkForUpdates()) : B([]);
        });
      });
    }
    quitAndInstall() {
      this.squirrelDownloadedUpdate ? (this.nativeUpdater.quitAndInstall(), this.closeServerIfExists()) : (this.nativeUpdater.on("update-downloaded", () => {
        this.nativeUpdater.quitAndInstall(), this.closeServerIfExists();
      }), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
    }
  };
  return Zn.MacUpdater = p, Zn;
}
var er = {}, Ys = {};
Object.defineProperty(Ys, "__esModule", { value: !0 });
Ys.verifySignature = f_;
const yc = xe, Hf = Ii, u_ = $i, Ec = ce;
function f_(e, t, n) {
  return new Promise((r, i) => {
    const o = t.replace(/'/g, "''");
    n.info(`Verifying signature ${o}`), (0, Hf.execFile)('set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", `"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`], {
      shell: !0,
      timeout: 20 * 1e3
    }, (s, a, l) => {
      var p;
      try {
        if (s != null || l) {
          zo(n, s, l, i), r(null);
          return;
        }
        const c = d_(a);
        if (c.Status === 0) {
          try {
            const v = Ec.normalize(c.Path), y = Ec.normalize(t);
            if (n.info(`LiteralPath: ${v}. Update Path: ${y}`), v !== y) {
              zo(n, new Error(`LiteralPath of ${v} is different than ${y}`), l, i), r(null);
              return;
            }
          } catch (v) {
            n.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(p = v.message) !== null && p !== void 0 ? p : v.stack}`);
          }
          const d = (0, yc.parseDn)(c.SignerCertificate.Subject);
          let m = !1;
          for (const v of e) {
            const y = (0, yc.parseDn)(v);
            if (y.size ? m = Array.from(y.keys()).every((b) => y.get(b) === d.get(b)) : v === d.get("CN") && (n.warn(`Signature validated using only CN ${v}. Please add your full Distinguished Name (DN) to publisherNames configuration`), m = !0), m) {
              r(null);
              return;
            }
          }
        }
        const u = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(c, (d, m) => d === "RawData" ? void 0 : m, 2);
        n.warn(`Sign verification failed, installer signed with incorrect certificate: ${u}`), r(u);
      } catch (c) {
        zo(n, c, null, i), r(null);
        return;
      }
    });
  });
}
function d_(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const n = t.SignerCertificate;
  return n != null && (delete n.Archived, delete n.Extensions, delete n.Handle, delete n.HasPrivateKey, delete n.SubjectName), t;
}
function zo(e, t, n, r) {
  if (h_()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || n}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, Hf.execFileSync)("powershell.exe", ["-NoProfile", "-NonInteractive", "-Command", "ConvertTo-Json test"], { timeout: 10 * 1e3 });
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && r(t), n && r(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${n}. Failing signature validation due to unknown stderr.`));
}
function h_() {
  const e = u_.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
var wc;
function vc() {
  if (wc) return er;
  wc = 1, Object.defineProperty(er, "__esModule", { value: !0 }), er.NsisUpdater = void 0;
  const e = xe, t = ce, n = Dr(), r = Rr, i = jn(), o = be, s = Ht, a = Ys, l = Ln;
  let p = class extends n.BaseUpdater {
    constructor(u, d) {
      super(u, d), this._verifyUpdateCodeSignature = (m, v) => (0, a.verifySignature)(m, v, this._logger);
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
        task: async (v, y, w, b) => {
          const $ = m.packageInfo, B = $ != null && w != null;
          if (B && u.disableWebInstaller)
            throw (0, e.newError)(`Unable to download new version ${u.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
          !B && !u.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (B || u.disableDifferentialDownload || await this.differentialDownloadInstaller(m, u, v, d, e.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(m.url, v, y);
          const z = await this.verifySignature(v);
          if (z != null)
            throw await b(), (0, e.newError)(`New version ${u.updateInfoAndProvider.info.version} is not signed by the application owner: ${z}`, "ERR_UPDATER_INVALID_SIGNATURE");
          if (B && await this.differentialDownloadWebPackage(u, $, w, d))
            try {
              await this.httpExecutor.download(new l.URL($.path), w, {
                headers: u.requestHeaders,
                cancellationToken: u.cancellationToken,
                sha512: $.sha512
              });
            } catch (U) {
              try {
                await (0, s.unlink)(w);
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
      const v = () => {
        this.spawnLog(t.join(process.resourcesPath, "elevate.exe"), [u.installerPath].concat(d)).catch((y) => this.dispatchError(y));
      };
      return u.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), v(), !0) : (this.spawnLog(u.installerPath, d).catch((y) => {
        const w = y.code;
        this._logger.info(`Cannot run installer: error code: ${w}, error message: "${y.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), w === "UNKNOWN" || w === "EACCES" ? v() : w === "ENOENT" ? ln.shell.openPath(u.installerPath).catch((b) => this.dispatchError(b)) : this.dispatchError(y);
      }), !0);
    }
    async differentialDownloadWebPackage(u, d, m, v) {
      if (d.blockMapSize == null)
        return !0;
      try {
        const y = {
          newUrl: new l.URL(d.path),
          oldFile: t.join(this.downloadedUpdateHelper.cacheDir, e.CURRENT_APP_PACKAGE_FILE_NAME),
          logger: this._logger,
          newFile: m,
          requestHeaders: this.requestHeaders,
          isUseMultipleRangeRequest: v.isUseMultipleRangeRequest,
          cancellationToken: u.cancellationToken
        };
        this.listenerCount(i.DOWNLOAD_PROGRESS) > 0 && (y.onProgress = (w) => this.emit(i.DOWNLOAD_PROGRESS, w)), await new r.FileWithEmbeddedBlockMapDifferentialDownloader(d, this.httpExecutor, y).download();
      } catch (y) {
        return this._logger.error(`Cannot download differentially, fallback to full download: ${y.stack || y}`), process.platform === "win32";
      }
      return !1;
    }
  };
  return er.NsisUpdater = p, er;
}
var _c;
function jn() {
  return _c || (_c = 1, function(e) {
    Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.CancellationToken = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
    const t = xe;
    Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
      return t.CancellationToken;
    } });
    const n = Ht, r = ce;
    var i = Dr();
    Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
      return i.BaseUpdater;
    } });
    var o = Vs();
    Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
      return o.AppUpdater;
    } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
      return o.NoOpLogger;
    } });
    var s = be;
    Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
      return s.Provider;
    } });
    var a = uc();
    Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
      return a.AppImageUpdater;
    } });
    var l = dc();
    Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
      return l.DebUpdater;
    } });
    var p = pc();
    Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
      return p.RpmUpdater;
    } });
    var c = gc();
    Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
      return c.MacUpdater;
    } });
    var u = vc();
    Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
      return u.NsisUpdater;
    } });
    let d;
    function m() {
      if (process.platform === "win32")
        d = new (vc()).NsisUpdater();
      else if (process.platform === "darwin")
        d = new (gc()).MacUpdater();
      else {
        d = new (uc()).AppImageUpdater();
        try {
          const w = r.join(process.resourcesPath, "package-type");
          if (!(0, n.existsSync)(w))
            return d;
          console.info("Checking for beta autoupdate feature for deb/rpm distributions");
          const b = (0, n.readFileSync)(w).toString().trim();
          switch (console.info("Found package-type:", b), b) {
            case "deb":
              d = new (dc()).DebUpdater();
              break;
            case "rpm":
              d = new (pc()).RpmUpdater();
              break;
            default:
              break;
          }
        } catch (w) {
          console.warn("Unable to detect 'package-type' for autoUpdater (beta rpm/deb support). If you'd like to expand support, please consider contributing to electron-builder", w.message);
        }
      }
      return d;
    }
    Object.defineProperty(e, "autoUpdater", {
      enumerable: !0,
      get: () => d || m()
    }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
    class v {
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
    e.UpdaterSignal = v;
    function y(w, b, $) {
      w.on(b, $);
    }
  }(yo)), yo;
}
var Fe = jn(), Bn = { exports: {} }, Xs = { exports: {} }, p_ = qf;
function qf(e, t) {
  if (e && t) return qf(e)(t);
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
var Gf = p_;
Xs.exports = Gf(ui);
Xs.exports.strict = Gf(zf);
ui.proto = ui(function() {
  Object.defineProperty(Function.prototype, "once", {
    value: function() {
      return ui(this);
    },
    configurable: !0
  }), Object.defineProperty(Function.prototype, "onceStrict", {
    value: function() {
      return zf(this);
    },
    configurable: !0
  });
});
function ui(e) {
  var t = function() {
    return t.called ? t.value : (t.called = !0, t.value = e.apply(this, arguments));
  };
  return t.called = !1, t;
}
function zf(e) {
  var t = function() {
    if (t.called)
      throw new Error(t.onceError);
    return t.called = !0, t.value = e.apply(this, arguments);
  }, n = e.name || "Function wrapped with `once`";
  return t.onceError = n + " shouldn't be called more than once", t.called = !1, t;
}
var Wf = Xs.exports, m_ = Wf, g_ = function() {
}, y_ = Ye.Bare ? queueMicrotask : process.nextTick.bind(process), E_ = function(e) {
  return e.setHeader && typeof e.abort == "function";
}, w_ = function(e) {
  return e.stdio && Array.isArray(e.stdio) && e.stdio.length === 3;
}, Vf = function(e, t, n) {
  if (typeof t == "function") return Vf(e, null, t);
  t || (t = {}), n = m_(n || g_);
  var r = e._writableState, i = e._readableState, o = t.readable || t.readable !== !1 && e.readable, s = t.writable || t.writable !== !1 && e.writable, a = !1, l = function() {
    e.writable || p();
  }, p = function() {
    s = !1, o || n.call(e);
  }, c = function() {
    o = !1, s || n.call(e);
  }, u = function(w) {
    n.call(e, w ? new Error("exited with error code: " + w) : null);
  }, d = function(w) {
    n.call(e, w);
  }, m = function() {
    y_(v);
  }, v = function() {
    if (!a) {
      if (o && !(i && i.ended && !i.destroyed)) return n.call(e, new Error("premature close"));
      if (s && !(r && r.ended && !r.destroyed)) return n.call(e, new Error("premature close"));
    }
  }, y = function() {
    e.req.on("finish", p);
  };
  return E_(e) ? (e.on("complete", p), e.on("abort", m), e.req ? y() : e.on("request", y)) : s && !r && (e.on("end", l), e.on("close", l)), w_(e) && e.on("exit", u), e.on("end", c), e.on("finish", p), t.error !== !1 && e.on("error", d), e.on("close", m), function() {
    a = !0, e.removeListener("complete", p), e.removeListener("abort", m), e.removeListener("request", y), e.req && e.req.removeListener("finish", p), e.removeListener("end", l), e.removeListener("close", l), e.removeListener("finish", p), e.removeListener("exit", u), e.removeListener("end", c), e.removeListener("error", d), e.removeListener("close", m);
  };
}, v_ = Vf, __ = Wf, x_ = v_, fi;
try {
  fi = require("fs");
} catch {
}
var wr = function() {
}, b_ = typeof process > "u" ? !1 : /^v?\.0/.test(process.version), Ki = function(e) {
  return typeof e == "function";
}, S_ = function(e) {
  return !b_ || !fi ? !1 : (e instanceof (fi.ReadStream || wr) || e instanceof (fi.WriteStream || wr)) && Ki(e.close);
}, T_ = function(e) {
  return e.setHeader && Ki(e.abort);
}, A_ = function(e, t, n, r) {
  r = __(r);
  var i = !1;
  e.on("close", function() {
    i = !0;
  }), x_(e, { readable: t, writable: n }, function(s) {
    if (s) return r(s);
    i = !0, r();
  });
  var o = !1;
  return function(s) {
    if (!i && !o) {
      if (o = !0, S_(e)) return e.close(wr);
      if (T_(e)) return e.abort();
      if (Ki(e.destroy)) return e.destroy();
      r(s || new Error("stream was destroyed"));
    }
  };
}, xc = function(e) {
  e();
}, C_ = function(e, t) {
  return e.pipe(t);
}, $_ = function() {
  var e = Array.prototype.slice.call(arguments), t = Ki(e[e.length - 1] || wr) && e.pop() || wr;
  if (Array.isArray(e[0]) && (e = e[0]), e.length < 2) throw new Error("pump requires two streams per minimum");
  var n, r = e.map(function(i, o) {
    var s = o < e.length - 1, a = o > 0;
    return A_(i, s, a, function(l) {
      n || (n = l), l && r.forEach(xc), !s && (r.forEach(xc), t(n));
    });
  });
  return e.reduce(C_);
}, I_ = $_;
const { PassThrough: O_ } = it;
var D_ = (e) => {
  e = { ...e };
  const { array: t } = e;
  let { encoding: n } = e;
  const r = n === "buffer";
  let i = !1;
  t ? i = !(n || r) : n = n || "utf8", r && (n = null);
  const o = new O_({ objectMode: i });
  n && o.setEncoding(n);
  let s = 0;
  const a = [];
  return o.on("data", (l) => {
    a.push(l), i ? s = a.length : s += l.length;
  }), o.getBufferedValue = () => t ? a : r ? Buffer.concat(a, s) : a.join(""), o.getBufferedLength = () => s, o;
};
const { constants: R_ } = Oc, P_ = I_, N_ = D_;
class Yf extends Error {
  constructor() {
    super("maxBuffer exceeded"), this.name = "MaxBufferError";
  }
}
async function Qi(e, t) {
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
      a && r.getBufferedLength() <= R_.MAX_LENGTH && (a.bufferedData = r.getBufferedValue()), o(a);
    };
    r = P_(e, N_(t), (a) => {
      if (a) {
        s(a);
        return;
      }
      i();
    }), r.on("data", () => {
      r.getBufferedLength() > n && s(new Yf());
    });
  }), r.getBufferedValue();
}
Bn.exports = Qi;
Bn.exports.default = Qi;
Bn.exports.buffer = (e, t) => Qi(e, { ...t, encoding: "buffer" });
Bn.exports.array = (e, t) => Qi(e, { ...t, array: !0 });
Bn.exports.MaxBufferError = Yf;
var F_ = Bn.exports, pt = {}, Pr = {}, L_ = Zi;
function Zi() {
  this.pending = 0, this.max = 1 / 0, this.listeners = [], this.waiting = [], this.error = null;
}
Zi.prototype.go = function(e) {
  this.pending < this.max ? Jf(this, e) : this.waiting.push(e);
};
Zi.prototype.wait = function(e) {
  this.pending === 0 ? e(this.error) : this.listeners.push(e);
};
Zi.prototype.hold = function() {
  return Xf(this);
};
function Xf(e) {
  e.pending += 1;
  var t = !1;
  return n;
  function n(i) {
    if (t) throw new Error("callback called twice");
    if (t = !0, e.error = e.error || i, e.pending -= 1, e.waiting.length > 0 && e.pending < e.max)
      Jf(e, e.waiting.shift());
    else if (e.pending === 0) {
      var o = e.listeners;
      e.listeners = [], o.forEach(r);
    }
  }
  function r(i) {
    i(e.error);
  }
}
function Jf(e, t) {
  t(Xf(e));
}
var Nr = rt, eo = Fn, Js = it, Kf = Js.Readable, Ks = Js.Writable, U_ = Js.PassThrough, k_ = L_, to = Ci.EventEmitter;
Pr.createFromBuffer = M_;
Pr.createFromFd = j_;
Pr.BufferSlicer = St;
Pr.FdSlicer = bt;
eo.inherits(bt, to);
function bt(e, t) {
  t = t || {}, to.call(this), this.fd = e, this.pend = new k_(), this.pend.max = 1, this.refCount = 0, this.autoClose = !!t.autoClose;
}
bt.prototype.read = function(e, t, n, r, i) {
  var o = this;
  o.pend.go(function(s) {
    Nr.read(o.fd, e, t, n, r, function(a, l, p) {
      s(), i(a, l, p);
    });
  });
};
bt.prototype.write = function(e, t, n, r, i) {
  var o = this;
  o.pend.go(function(s) {
    Nr.write(o.fd, e, t, n, r, function(a, l, p) {
      s(), i(a, l, p);
    });
  });
};
bt.prototype.createReadStream = function(e) {
  return new no(this, e);
};
bt.prototype.createWriteStream = function(e) {
  return new ro(this, e);
};
bt.prototype.ref = function() {
  this.refCount += 1;
};
bt.prototype.unref = function() {
  var e = this;
  if (e.refCount -= 1, e.refCount > 0) return;
  if (e.refCount < 0) throw new Error("invalid unref");
  e.autoClose && Nr.close(e.fd, t);
  function t(n) {
    n ? e.emit("error", n) : e.emit("close");
  }
};
eo.inherits(no, Kf);
function no(e, t) {
  t = t || {}, Kf.call(this, t), this.context = e, this.context.ref(), this.start = t.start || 0, this.endOffset = t.end, this.pos = this.start, this.destroyed = !1;
}
no.prototype._read = function(e) {
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
      Nr.read(t.context.fd, i, 0, n, t.pos, function(o, s) {
        o ? t.destroy(o) : s === 0 ? (t.destroyed = !0, t.push(null), t.context.unref()) : (t.pos += s, t.push(i.slice(0, s))), r();
      });
    });
  }
};
no.prototype.destroy = function(e) {
  this.destroyed || (e = e || new Error("stream destroyed"), this.destroyed = !0, this.emit("error", e), this.context.unref());
};
eo.inherits(ro, Ks);
function ro(e, t) {
  t = t || {}, Ks.call(this, t), this.context = e, this.context.ref(), this.start = t.start || 0, this.endOffset = t.end == null ? 1 / 0 : +t.end, this.bytesWritten = 0, this.pos = this.start, this.destroyed = !1, this.on("finish", this.destroy.bind(this));
}
ro.prototype._write = function(e, t, n) {
  var r = this;
  if (!r.destroyed) {
    if (r.pos + e.length > r.endOffset) {
      var i = new Error("maximum file length exceeded");
      i.code = "ETOOBIG", r.destroy(), n(i);
      return;
    }
    r.context.pend.go(function(o) {
      if (r.destroyed) return o();
      Nr.write(r.context.fd, e, 0, e.length, r.pos, function(s, a) {
        s ? (r.destroy(), o(), n(s)) : (r.bytesWritten += a, r.pos += a, r.emit("progress"), o(), n());
      });
    });
  }
};
ro.prototype.destroy = function() {
  this.destroyed || (this.destroyed = !0, this.context.unref());
};
eo.inherits(St, to);
function St(e, t) {
  to.call(this), t = t || {}, this.refCount = 0, this.buffer = e, this.maxChunkSize = t.maxChunkSize || Number.MAX_SAFE_INTEGER;
}
St.prototype.read = function(e, t, n, r, i) {
  var o = r + n, s = o - this.buffer.length, a = s > 0 ? s : n;
  this.buffer.copy(e, t, r, o), setImmediate(function() {
    i(null, a);
  });
};
St.prototype.write = function(e, t, n, r, i) {
  e.copy(this.buffer, r, t, t + n), setImmediate(function() {
    i(null, n, e);
  });
};
St.prototype.createReadStream = function(e) {
  e = e || {};
  var t = new U_(e);
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
St.prototype.createWriteStream = function(e) {
  var t = this;
  e = e || {};
  var n = new Ks(e);
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
St.prototype.ref = function() {
  this.refCount += 1;
};
St.prototype.unref = function() {
  if (this.refCount -= 1, this.refCount < 0)
    throw new Error("invalid unref");
};
function M_(e, t) {
  return new St(e, t);
}
function j_(e, t) {
  return new bt(e, t);
}
var Dt = Oc.Buffer, fs = [
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
typeof Int32Array < "u" && (fs = new Int32Array(fs));
function Qf(e) {
  if (Dt.isBuffer(e))
    return e;
  var t = typeof Dt.alloc == "function" && typeof Dt.from == "function";
  if (typeof e == "number")
    return t ? Dt.alloc(e) : new Dt(e);
  if (typeof e == "string")
    return t ? Dt.from(e) : new Dt(e);
  throw new Error("input must be buffer, number, or string, received " + typeof e);
}
function B_(e) {
  var t = Qf(4);
  return t.writeInt32BE(e, 0), t;
}
function Qs(e, t) {
  e = Qf(e), Dt.isBuffer(t) && (t = t.readUInt32BE(0));
  for (var n = ~~t ^ -1, r = 0; r < e.length; r++)
    n = fs[(n ^ e[r]) & 255] ^ n >>> 8;
  return n ^ -1;
}
function Zs() {
  return B_(Qs.apply(null, arguments));
}
Zs.signed = function() {
  return Qs.apply(null, arguments);
};
Zs.unsigned = function() {
  return Qs.apply(null, arguments) >>> 0;
};
var H_ = Zs, ds = rt, q_ = ms, Zf = Pr, G_ = H_, io = Fn, oo = Ci.EventEmitter, ed = it.Transform, ea = it.PassThrough, z_ = it.Writable;
pt.open = W_;
pt.fromFd = td;
pt.fromBuffer = V_;
pt.fromRandomAccessReader = ta;
pt.dosDateTimeToDate = rd;
pt.validateFileName = id;
pt.ZipFile = Bt;
pt.Entry = Fr;
pt.RandomAccessReader = qt;
function W_(e, t, n) {
  typeof t == "function" && (n = t, t = null), t == null && (t = {}), t.autoClose == null && (t.autoClose = !0), t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1), n == null && (n = Ai), ds.open(e, "r", function(r, i) {
    if (r) return n(r);
    td(i, t, function(o, s) {
      o && ds.close(i, Ai), n(o, s);
    });
  });
}
function td(e, t, n) {
  typeof t == "function" && (n = t, t = null), t == null && (t = {}), t.autoClose == null && (t.autoClose = !1), t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1), n == null && (n = Ai), ds.fstat(e, function(r, i) {
    if (r) return n(r);
    var o = Zf.createFromFd(e, { autoClose: !0 });
    ta(o, i.size, t, n);
  });
}
function V_(e, t, n) {
  typeof t == "function" && (n = t, t = null), t == null && (t = {}), t.autoClose = !1, t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1);
  var r = Zf.createFromBuffer(e, { maxChunkSize: 65536 });
  ta(r, e.length, t, n);
}
function ta(e, t, n, r) {
  typeof n == "function" && (r = n, n = null), n == null && (n = {}), n.autoClose == null && (n.autoClose = !0), n.lazyEntries == null && (n.lazyEntries = !1), n.decodeStrings == null && (n.decodeStrings = !0);
  var i = !!n.decodeStrings;
  if (n.validateEntrySizes == null && (n.validateEntrySizes = !0), n.strictFileNames == null && (n.strictFileNames = !1), r == null && (r = Ai), typeof t != "number") throw new Error("expected totalSize parameter to be a number");
  if (t > Number.MAX_SAFE_INTEGER)
    throw new Error("zip file too large. only file sizes up to 2^52 are supported due to JavaScript's Number type being an IEEE 754 double.");
  e.ref();
  var o = 22, s = 65535, a = Math.min(o + s, t), l = dt(a), p = t - l.length;
  In(e, l, 0, a, p, function(c) {
    if (c) return r(c);
    for (var u = a - o; u >= 0; u -= 1)
      if (l.readUInt32LE(u) === 101010256) {
        var d = l.slice(u), m = d.readUInt16LE(4);
        if (m !== 0)
          return r(new Error("multi-disk zip files are not supported: found disk number: " + m));
        var v = d.readUInt16LE(10), y = d.readUInt32LE(16), w = d.readUInt16LE(20), b = d.length - o;
        if (w !== b)
          return r(new Error("invalid comment length. expected: " + b + ". found: " + w));
        var $ = i ? di(d, 22, d.length, !1) : d.slice(22);
        if (!(v === 65535 || y === 4294967295))
          return r(null, new Bt(e, y, t, v, $, n.autoClose, n.lazyEntries, i, n.validateEntrySizes, n.strictFileNames));
        var B = dt(20), z = p + u - B.length;
        In(e, B, 0, B.length, z, function(U) {
          if (U) return r(U);
          if (B.readUInt32LE(0) !== 117853008)
            return r(new Error("invalid zip64 end of central directory locator signature"));
          var S = On(B, 8), R = dt(56);
          In(e, R, 0, R.length, S, function(N) {
            return N ? r(N) : R.readUInt32LE(0) !== 101075792 ? r(new Error("invalid zip64 end of central directory record signature")) : (v = On(R, 32), y = On(R, 48), r(null, new Bt(e, y, t, v, $, n.autoClose, n.lazyEntries, i, n.validateEntrySizes, n.strictFileNames)));
          });
        });
        return;
      }
    r(new Error("end of central directory record signature not found"));
  });
}
io.inherits(Bt, oo);
function Bt(e, t, n, r, i, o, s, a, l, p) {
  var c = this;
  oo.call(c), c.reader = e, c.reader.on("error", function(u) {
    nd(c, u);
  }), c.reader.once("close", function() {
    c.emit("close");
  }), c.readEntryCursor = t, c.fileSize = n, c.entryCount = r, c.comment = i, c.entriesRead = 0, c.autoClose = !!o, c.lazyEntries = !!s, c.decodeStrings = !!a, c.validateEntrySizes = !!l, c.strictFileNames = !!p, c.isOpen = !0, c.emittedError = !1, c.lazyEntries || c._readEntry();
}
Bt.prototype.close = function() {
  this.isOpen && (this.isOpen = !1, this.reader.unref());
};
function Ze(e, t) {
  e.autoClose && e.close(), nd(e, t);
}
function nd(e, t) {
  e.emittedError || (e.emittedError = !0, e.emit("error", t));
}
Bt.prototype.readEntry = function() {
  if (!this.lazyEntries) throw new Error("readEntry() called without lazyEntries:true");
  this._readEntry();
};
Bt.prototype._readEntry = function() {
  var e = this;
  if (e.entryCount === e.entriesRead) {
    setImmediate(function() {
      e.autoClose && e.close(), !e.emittedError && e.emit("end");
    });
    return;
  }
  if (!e.emittedError) {
    var t = dt(46);
    In(e.reader, t, 0, t.length, e.readEntryCursor, function(n) {
      if (n) return Ze(e, n);
      if (!e.emittedError) {
        var r = new Fr(), i = t.readUInt32LE(0);
        if (i !== 33639248) return Ze(e, new Error("invalid central directory file header signature: 0x" + i.toString(16)));
        if (r.versionMadeBy = t.readUInt16LE(4), r.versionNeededToExtract = t.readUInt16LE(6), r.generalPurposeBitFlag = t.readUInt16LE(8), r.compressionMethod = t.readUInt16LE(10), r.lastModFileTime = t.readUInt16LE(12), r.lastModFileDate = t.readUInt16LE(14), r.crc32 = t.readUInt32LE(16), r.compressedSize = t.readUInt32LE(20), r.uncompressedSize = t.readUInt32LE(24), r.fileNameLength = t.readUInt16LE(28), r.extraFieldLength = t.readUInt16LE(30), r.fileCommentLength = t.readUInt16LE(32), r.internalFileAttributes = t.readUInt16LE(36), r.externalFileAttributes = t.readUInt32LE(38), r.relativeOffsetOfLocalHeader = t.readUInt32LE(42), r.generalPurposeBitFlag & 64) return Ze(e, new Error("strong encryption is not supported"));
        e.readEntryCursor += 46, t = dt(r.fileNameLength + r.extraFieldLength + r.fileCommentLength), In(e.reader, t, 0, t.length, e.readEntryCursor, function(o) {
          if (o) return Ze(e, o);
          if (!e.emittedError) {
            var s = (r.generalPurposeBitFlag & 2048) !== 0;
            r.fileName = e.decodeStrings ? di(t, 0, r.fileNameLength, s) : t.slice(0, r.fileNameLength);
            var a = r.fileNameLength + r.extraFieldLength, l = t.slice(r.fileNameLength, a);
            r.extraFields = [];
            for (var p = 0; p < l.length - 3; ) {
              var c = l.readUInt16LE(p + 0), u = l.readUInt16LE(p + 2), d = p + 4, m = d + u;
              if (m > l.length) return Ze(e, new Error("extra field length exceeds extra field buffer size"));
              var v = dt(u);
              l.copy(v, 0, d, m), r.extraFields.push({
                id: c,
                data: v
              }), p = m;
            }
            if (r.fileComment = e.decodeStrings ? di(t, a, a + r.fileCommentLength, s) : t.slice(a, a + r.fileCommentLength), r.comment = r.fileComment, e.readEntryCursor += t.length, e.entriesRead += 1, r.uncompressedSize === 4294967295 || r.compressedSize === 4294967295 || r.relativeOffsetOfLocalHeader === 4294967295) {
              for (var y = null, p = 0; p < r.extraFields.length; p++) {
                var w = r.extraFields[p];
                if (w.id === 1) {
                  y = w.data;
                  break;
                }
              }
              if (y == null)
                return Ze(e, new Error("expected zip64 extended information extra field"));
              var b = 0;
              if (r.uncompressedSize === 4294967295) {
                if (b + 8 > y.length)
                  return Ze(e, new Error("zip64 extended information extra field does not include uncompressed size"));
                r.uncompressedSize = On(y, b), b += 8;
              }
              if (r.compressedSize === 4294967295) {
                if (b + 8 > y.length)
                  return Ze(e, new Error("zip64 extended information extra field does not include compressed size"));
                r.compressedSize = On(y, b), b += 8;
              }
              if (r.relativeOffsetOfLocalHeader === 4294967295) {
                if (b + 8 > y.length)
                  return Ze(e, new Error("zip64 extended information extra field does not include relative header offset"));
                r.relativeOffsetOfLocalHeader = On(y, b), b += 8;
              }
            }
            if (e.decodeStrings)
              for (var p = 0; p < r.extraFields.length; p++) {
                var w = r.extraFields[p];
                if (w.id === 28789) {
                  if (w.data.length < 6 || w.data.readUInt8(0) !== 1)
                    continue;
                  var $ = w.data.readUInt32LE(1);
                  if (G_.unsigned(t.slice(0, r.fileNameLength)) !== $)
                    continue;
                  r.fileName = di(w.data, 5, w.data.length, !0);
                  break;
                }
              }
            if (e.validateEntrySizes && r.compressionMethod === 0) {
              var B = r.uncompressedSize;
              if (r.isEncrypted() && (B += 12), r.compressedSize !== B) {
                var z = "compressed/uncompressed size mismatch for stored file: " + r.compressedSize + " != " + r.uncompressedSize;
                return Ze(e, new Error(z));
              }
            }
            if (e.decodeStrings) {
              e.strictFileNames || (r.fileName = r.fileName.replace(/\\/g, "/"));
              var U = id(r.fileName, e.validateFileNameOptions);
              if (U != null) return Ze(e, new Error(U));
            }
            e.emit("entry", r), e.lazyEntries || e._readEntry();
          }
        });
      }
    });
  }
};
Bt.prototype.openReadStream = function(e, t, n) {
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
  var s = dt(30);
  In(r.reader, s, 0, s.length, e.relativeOffsetOfLocalHeader, function(a) {
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
      var m = u, v = m + e.compressedSize;
      if (e.compressedSize !== 0 && v > r.fileSize)
        return n(new Error("file data overflows file bounds: " + m + " + " + e.compressedSize + " > " + r.fileSize));
      var y = r.reader.createReadStream({
        start: m + i,
        end: m + o
      }), w = y;
      if (d) {
        var b = !1, $ = q_.createInflateRaw();
        y.on("error", function(B) {
          setImmediate(function() {
            b || $.emit("error", B);
          });
        }), y.pipe($), r.validateEntrySizes ? (w = new Lr(e.uncompressedSize), $.on("error", function(B) {
          setImmediate(function() {
            b || w.emit("error", B);
          });
        }), $.pipe(w)) : w = $, w.destroy = function() {
          b = !0, $ !== w && $.unpipe(w), y.unpipe($), y.destroy();
        };
      }
      n(null, w);
    } finally {
      r.reader.unref();
    }
  });
};
function Fr() {
}
Fr.prototype.getLastModDate = function() {
  return rd(this.lastModFileDate, this.lastModFileTime);
};
Fr.prototype.isEncrypted = function() {
  return (this.generalPurposeBitFlag & 1) !== 0;
};
Fr.prototype.isCompressed = function() {
  return this.compressionMethod === 8;
};
function rd(e, t) {
  var n = e & 31, r = (e >> 5 & 15) - 1, i = (e >> 9 & 127) + 1980, o = 0, s = (t & 31) * 2, a = t >> 5 & 63, l = t >> 11 & 31;
  return new Date(i, r, n, l, a, s, o);
}
function id(e) {
  return e.indexOf("\\") !== -1 ? "invalid characters in fileName: " + e : /^[a-zA-Z]:/.test(e) || /^\//.test(e) ? "absolute path: " + e : e.split("/").indexOf("..") !== -1 ? "invalid relative path: " + e : null;
}
function In(e, t, n, r, i, o) {
  if (r === 0)
    return setImmediate(function() {
      o(null, dt(0));
    });
  e.read(t, n, r, i, function(s, a) {
    if (s) return o(s);
    if (a < r)
      return o(new Error("unexpected EOF"));
    o();
  });
}
io.inherits(Lr, ed);
function Lr(e) {
  ed.call(this), this.actualByteCount = 0, this.expectedByteCount = e;
}
Lr.prototype._transform = function(e, t, n) {
  if (this.actualByteCount += e.length, this.actualByteCount > this.expectedByteCount) {
    var r = "too many bytes in the stream. expected " + this.expectedByteCount + ". got at least " + this.actualByteCount;
    return n(new Error(r));
  }
  n(null, e);
};
Lr.prototype._flush = function(e) {
  if (this.actualByteCount < this.expectedByteCount) {
    var t = "not enough bytes in the stream. expected " + this.expectedByteCount + ". got only " + this.actualByteCount;
    return e(new Error(t));
  }
  e();
};
io.inherits(qt, oo);
function qt() {
  oo.call(this), this.refCount = 0;
}
qt.prototype.ref = function() {
  this.refCount += 1;
};
qt.prototype.unref = function() {
  var e = this;
  if (e.refCount -= 1, e.refCount > 0) return;
  if (e.refCount < 0) throw new Error("invalid unref");
  e.close(t);
  function t(n) {
    if (n) return e.emit("error", n);
    e.emit("close");
  }
};
qt.prototype.createReadStream = function(e) {
  var t = e.start, n = e.end;
  if (t === n) {
    var r = new ea();
    return setImmediate(function() {
      r.end();
    }), r;
  }
  var i = this._readStreamForRange(t, n), o = !1, s = new so(this);
  i.on("error", function(l) {
    setImmediate(function() {
      o || s.emit("error", l);
    });
  }), s.destroy = function() {
    i.unpipe(s), s.unref(), i.destroy();
  };
  var a = new Lr(n - t);
  return s.on("error", function(l) {
    setImmediate(function() {
      o || a.emit("error", l);
    });
  }), a.destroy = function() {
    o = !0, s.unpipe(a), s.destroy();
  }, i.pipe(s).pipe(a);
};
qt.prototype._readStreamForRange = function(e, t) {
  throw new Error("not implemented");
};
qt.prototype.read = function(e, t, n, r, i) {
  var o = this.createReadStream({ start: r, end: r + n }), s = new z_(), a = 0;
  s._write = function(l, p, c) {
    l.copy(e, t + a, 0, l.length), a += l.length, c();
  }, s.on("finish", i), o.on("error", function(l) {
    i(l);
  }), o.pipe(s);
};
qt.prototype.close = function(e) {
  setImmediate(e);
};
io.inherits(so, ea);
function so(e) {
  ea.call(this), this.context = e, this.context.ref(), this.unreffedYet = !1;
}
so.prototype._flush = function(e) {
  this.unref(), e();
};
so.prototype.unref = function(e) {
  this.unreffedYet || (this.unreffedYet = !0, this.context.unref());
};
var Y_ = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ";
function di(e, t, n, r) {
  if (r)
    return e.toString("utf8", t, n);
  for (var i = "", o = t; o < n; o++)
    i += Y_[e[o]];
  return i;
}
function On(e, t) {
  var n = e.readUInt32LE(t), r = e.readUInt32LE(t + 4);
  return r * 4294967296 + n;
}
var dt;
typeof Buffer.allocUnsafe == "function" ? dt = function(e) {
  return Buffer.allocUnsafe(e);
} : dt = function(e) {
  return new Buffer(e);
};
function Ai(e) {
  if (e) throw e;
}
const et = Rc("extract-zip"), { createWriteStream: X_, promises: An } = rt, J_ = F_, Qt = ce, { promisify: na } = Fn, K_ = it, Q_ = pt, Z_ = na(Q_.open), ex = na(K_.pipeline);
class tx {
  constructor(t, n) {
    this.zipPath = t, this.opts = n;
  }
  async extract() {
    return et("opening", this.zipPath, "with opts", this.opts), this.zipfile = await Z_(this.zipPath, { lazyEntries: !0 }), this.canceled = !1, new Promise((t, n) => {
      this.zipfile.on("error", (r) => {
        this.canceled = !0, n(r);
      }), this.zipfile.readEntry(), this.zipfile.on("close", () => {
        this.canceled || (et("zip extraction complete"), t());
      }), this.zipfile.on("entry", async (r) => {
        if (this.canceled) {
          et("skipping entry", r.fileName, { cancelled: this.canceled });
          return;
        }
        if (et("zipfile entry", r.fileName), r.fileName.startsWith("__MACOSX/")) {
          this.zipfile.readEntry();
          return;
        }
        const i = Qt.dirname(Qt.join(this.opts.dir, r.fileName));
        try {
          await An.mkdir(i, { recursive: !0 });
          const o = await An.realpath(i);
          if (Qt.relative(this.opts.dir, o).split(Qt.sep).includes(".."))
            throw new Error(`Out of bound path "${o}" found while processing file ${r.fileName}`);
          await this.extractEntry(r), et("finished processing", r.fileName), this.zipfile.readEntry();
        } catch (o) {
          this.canceled = !0, this.zipfile.close(), n(o);
        }
      });
    });
  }
  async extractEntry(t) {
    if (this.canceled) {
      et("skipping entry extraction", t.fileName, { cancelled: this.canceled });
      return;
    }
    this.opts.onEntry && this.opts.onEntry(t, this.zipfile);
    const n = Qt.join(this.opts.dir, t.fileName), r = t.externalFileAttributes >> 16 & 65535, i = 61440, o = 16384, a = (r & i) === 40960;
    let l = (r & i) === o;
    !l && t.fileName.endsWith("/") && (l = !0);
    const p = t.versionMadeBy >> 8;
    l || (l = p === 0 && t.externalFileAttributes === 16), et("extracting entry", { filename: t.fileName, isDir: l, isSymlink: a });
    const c = this.getExtractedMode(r, l) & 511, u = l ? n : Qt.dirname(n), d = { recursive: !0 };
    if (l && (d.mode = c), et("mkdir", { dir: u, ...d }), await An.mkdir(u, d), l) return;
    et("opening read stream", n);
    const m = await na(this.zipfile.openReadStream.bind(this.zipfile))(t);
    if (a) {
      const v = await J_(m);
      et("creating symlink", v, n), await An.symlink(v, n);
    } else
      await ex(m, X_(n, { mode: c }));
  }
  getExtractedMode(t, n) {
    let r = t;
    return r === 0 && (n ? (this.opts.defaultDirMode && (r = parseInt(this.opts.defaultDirMode, 10)), r || (r = 493)) : (this.opts.defaultFileMode && (r = parseInt(this.opts.defaultFileMode, 10)), r || (r = 420))), r;
  }
}
var nx = async function(e, t) {
  if (et("creating target directory", t.dir), !Qt.isAbsolute(t.dir))
    throw new Error("Target directory is expected to be absolute");
  return await An.mkdir(t.dir, { recursive: !0 }), t.dir = await An.realpath(t.dir), new tx(e, t).extract();
};
const od = /* @__PURE__ */ Eh(nx);
function sd(e) {
  const n = e.replace(/[^0-9.].*$/, "").split(".").map((s) => parseInt(s, 10)), r = n[0], i = n[1] ?? 0, o = n[2] ?? 0;
  return r > 1 || i > 20 || i === 20 && o >= 5 ? 21 : i >= 17 ? 17 : 8;
}
const bc = {
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
function rx(e) {
  const t = bc[e] || bc[17];
  return process.platform === "win32" ? t.win : process.platform === "darwin" ? process.arch === "arm64" ? t.mac_aarch64 : t.mac_x64 : t.linux_x64;
}
const cr = /* @__PURE__ */ new Map();
let rn = 0, on = 0;
function ao() {
  const e = _t.getPath("userData"), t = H.join(e, ".mine-launcher");
  return F.existsSync(t) || F.mkdirSync(t, { recursive: !0 }), t;
}
function ad(e) {
  const t = gh.createHash("md5");
  t.update(`OfflinePlayer:${e}`);
  const n = t.digest();
  n[6] = n[6] & 15 | 48, n[8] = n[8] & 63 | 128;
  const r = n.toString("hex");
  return `${r.slice(0, 8)}-${r.slice(8, 12)}-${r.slice(12, 16)}-${r.slice(16, 20)}-${r.slice(20, 32)}`;
}
function en(e) {
  return new Promise((t, n) => {
    (e.startsWith("https") ? gs : ys).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (o) => {
      if (o.statusCode && o.statusCode >= 300 && o.statusCode < 400 && o.headers.location)
        return o.resume(), en(o.headers.location).then(t).catch(n);
      if (o.statusCode !== 200)
        return o.resume(), n(new Error(`HTTP ${o.statusCode} — ${e}`));
      let s = "";
      o.setEncoding("utf-8"), o.on("data", (a) => {
        s += a;
      }), o.on("end", () => {
        try {
          t(JSON.parse(s));
        } catch (a) {
          n(a);
        }
      }), o.on("error", n);
    }).on("error", n);
  });
}
function ut(e, t, n) {
  return new Promise((r, i) => {
    const o = H.dirname(t);
    F.existsSync(o) || F.mkdirSync(o, { recursive: !0 });
    const s = F.createWriteStream(t);
    (e.startsWith("https") ? gs : ys).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (p) => {
      if (p.statusCode && p.statusCode >= 300 && p.statusCode < 400 && p.headers.location)
        return s.close(), F.unlinkSync(t), ut(p.headers.location, t, n).then(r).catch(i);
      if (p.statusCode !== 200)
        return s.close(), F.unlink(t, () => {
        }), p.resume(), i(new Error(`HTTP ${p.statusCode}: ${e}`));
      p.on("data", (c) => n == null ? void 0 : n(c.length)), p.pipe(s), s.on("finish", () => s.close(() => r())), s.on("error", i);
    }).on("error", (p) => {
      s.close(), F.unlink(t, () => {
      }), i(p);
    });
  });
}
async function Wo(e, t) {
  if (F.existsSync(e))
    try {
      const n = H.join(t, ".extract-" + Date.now());
      F.mkdirSync(n, { recursive: !0 }), await od(e, { dir: n });
      const r = process.platform === "win32" ? ".dll" : process.platform === "darwin" ? ".dylib" : ".so", i = (o) => {
        for (const s of F.readdirSync(o)) {
          const a = H.join(o, s);
          F.statSync(a).isDirectory() ? i(a) : s.toLowerCase().endsWith(r) && F.copyFileSync(a, H.join(t, s));
        }
      };
      i(n), F.rmSync(n, { recursive: !0, force: !0 });
    } catch {
    }
}
let Lt = [];
function Sc(e) {
  Lt.push(e), Lt.length > 120 && (Lt = Lt.slice(-120));
}
function ix() {
  const e = Lt.join(`
`);
  return e.match(/Unsupported class file major version (\d+)/) ? "Похоже, у вас неправильно подобрана версия Java — версия игры требует более новую Java. Откройте «Настройки» и в разделе Java проверьте, что путь ведёт к правильной JDK/JRE." : /java\.lang\.OutOfMemoryError/.test(e) ? "Игра объёмом не хватило памяти. Увеличьте «Максимальную память» в настройках лаунчера (в МБ) и попробуйте снова." : /Could not create the Java Virtual Machine|Invalid or corrupt jarfile| unrecognized/.test(e) ? "Проверьте аргументы JVM в настройках лаунчера — Java не смогла запуститься с текущими параметрами." : /GLFW error|OpenGL|gpu|DirectX/i.test(e) && /error|fail/i.test(e) ? "Похоже, проблема с видеодрайвером/OpenGL. Обновите драйвер видеокарты." : /Incompatible.fml.mod|Fabric loader|Quilt loading/i.test(e) ? "Похоже, один из модов несовместим с этой версией или загрузчиком. Откройте вкладку «Моды» и отключите их по одному." : /Mixin apply failed|MixinTransformer/i.test(e) ? "Ошибка в моде (Mixin). Отключите свежеустановленные моды во вкладке «Моды»." : /The game crashed.*Calling event|Exception in thread "main"/.test(e) ? "Игра упала при старте. Попробуйте без модов или откройте папку сборки и покажите лог на форуме." : "Смотрите вкладку «Логи» для подробностей.";
}
function ox(e) {
  if (!e || e.length === 0) return !0;
  const t = process.platform === "win32" ? "windows" : process.platform === "darwin" ? "osx" : "linux";
  let n = !1;
  for (const r of e)
    (!r.os || r.os.name === t) && (n = r.action === "allow");
  return n;
}
async function ld() {
  const e = [], t = process.platform === "win32", n = t ? "javaw.exe" : "java", r = ao(), i = (o, s = 0) => {
    if (!F.existsSync(o) || s > 6) return null;
    try {
      const a = F.readdirSync(o);
      for (const l of a) {
        const p = H.join(o, l);
        if (l.toLowerCase() === n.toLowerCase()) return p;
        try {
          if (F.statSync(p).isDirectory()) {
            const c = i(p, s + 1);
            if (c) return c;
          }
        } catch {
        }
      }
    } catch {
    }
    return null;
  };
  for (const o of [21, 17, 8]) {
    const s = i(H.join(r, "java", `java-${o}`));
    s && e.push(s);
  }
  if (process.env.JAVA_HOME) {
    const o = H.join(process.env.JAVA_HOME, "bin", n);
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
      H.join(process.env.LOCALAPPDATA || "", "Programs", "AdoptOpenJDK"),
      "C:\\Program Files (x86)\\Minecraft Launcher\\runtime"
    ];
    for (const s of o)
      if (F.existsSync(s))
        try {
          for (const a of F.readdirSync(s)) {
            const l = H.join(s, a, "bin", n);
            F.existsSync(l) && !e.includes(l) && e.push(l);
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
              const p = H.join(s, l);
              F.existsSync(p) && !e.includes(p) && e.push(p);
            }
        } catch {
        }
  }
  return e;
}
async function sx(e, t, n = 17) {
  const r = ao(), i = H.join(r, "java", `java-${n}`), o = (d, m = 0) => {
    if (!F.existsSync(d) || m > 6) return null;
    try {
      for (const v of F.readdirSync(d)) {
        const y = H.join(d, v);
        if (v.toLowerCase() === (process.platform === "win32" ? "javaw.exe" : "java").toLowerCase()) return y;
        try {
          if (F.statSync(y).isDirectory()) {
            const w = o(y, m + 1);
            if (w) return w;
          }
        } catch {
        }
      }
    } catch {
    }
    return null;
  }, s = o(i);
  if (s) return s;
  e({
    instanceId: "java-auto",
    stage: "downloading",
    statusText: `Скачивание Java ${n}...`,
    progress: 55
  }), t({
    timestamp: Date.now(),
    type: "info",
    message: `Java ${n} не найдена на ПК — скачиваю Eclipse Temurin JRE ${n}...`
  });
  const a = process.platform === "win32", l = rx(n), p = a ? "zip" : ".tar.gz", c = H.join(r, "java", `java-${n}.${p}`);
  F.existsSync(H.dirname(c)) || F.mkdirSync(H.dirname(c), { recursive: !0 }), await ut(l, c, (d) => {
    on += d;
    const m = Date.now();
    if (m - rn > 1e3) {
      const v = on / Math.max(1, (m - rn) / 1e3);
      rn = m, on = 0, e({
        instanceId: "java-auto",
        stage: "downloading",
        statusText: `Скачивание Java ${n}... (${(v / 1024 / 1024).toFixed(1)} МБ/с)`,
        progress: 55
      });
    }
  }), e({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: `Распаковка Java ${n}...`,
    progress: 75
  }), t({ timestamp: Date.now(), type: "info", message: `Распаковка архива Java ${n}...` }), F.existsSync(i) || F.mkdirSync(i, { recursive: !0 }), a ? await od(c, { dir: i }) : Vo(`tar -xzf "${c}" -C "${i}"`), F.unlinkSync(c);
  const u = o(i);
  if (!u) throw new Error(`Java ${n} распакована некорректно — попробуйте установить её вручную`);
  return t({ timestamp: Date.now(), type: "info", message: `Java ${n} установлена: ${u}` }), u;
}
async function cd() {
  return await en("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function ax(e, t, n) {
  var p, c, u, d, m, v, y, w, b;
  rn = 0, on = 0, Lt = [];
  const r = ao(), i = H.join(r, "instances", e.instanceId), o = H.join(r, "assets"), s = H.join(r, "libraries"), a = H.join(r, "versions"), l = H.join(i, "natives");
  for (const $ of [i, l])
    F.existsSync($) || F.mkdirSync($, { recursive: !0 });
  try {
    let $ = e.javaPath, B = !1;
    if ($ && F.existsSync($))
      try {
        Vo(`"${$}" -version 2>&1`, { stdio: "ignore" }), B = !0;
      } catch {
      }
    if (!B) {
      const T = await ld();
      for (const L of T)
        try {
          Vo(`"${L}" -version 2>&1`, { stdio: "ignore" }), $ = L, B = !0;
          break;
        } catch {
        }
    }
    B || ($ = await sx(t, n, sd(e.version))), n({ timestamp: Date.now(), type: "info", message: `Java: ${$}` }), t({ instanceId: e.instanceId, stage: "checking", statusText: "Проверка версии...", progress: 5 });
    const z = (await cd()).versions.find((T) => T.id === e.version);
    if (!z) throw new Error(`Версия ${e.version} не найдена на серверах Mojang`);
    const U = H.join(a, e.version, `${e.version}.json`);
    let S;
    if (F.existsSync(U))
      try {
        S = JSON.parse(F.readFileSync(U, "utf-8"));
      } catch {
        S = null;
      }
    if (S || (t({ instanceId: e.instanceId, stage: "downloading", statusText: `Загрузка версии ${e.version}...`, progress: 10 }), S = await en(z.url), F.existsSync(H.dirname(U)) || F.mkdirSync(H.dirname(U), { recursive: !0 }), F.writeFileSync(U, JSON.stringify(S, null, 2))), (p = S.assetIndex) != null && p.url) {
      const T = H.join(o, "indexes", `${S.assetIndex.id}.json`);
      F.existsSync(T) || (t({ instanceId: e.instanceId, stage: "downloading", statusText: "Загрузка манифеста ресурсов...", progress: 12 }), await ut(S.assetIndex.url, T));
      try {
        const j = JSON.parse(F.readFileSync(T, "utf-8")).objects || {}, O = H.join(o, "objects"), k = [];
        for (const J of Object.keys(j)) {
          const M = j[J].hash, W = H.join(O, M.slice(0, 2), M);
          F.existsSync(W) || k.push({ hash: M });
        }
        if (k.length > 0) {
          t({
            instanceId: e.instanceId,
            stage: "downloading",
            statusText: `Загрузка ресурсов (0/${k.length})...`,
            progress: 15
          });
          let J = 0;
          const M = 64;
          let W = Date.now(), ie = 0;
          for (let K = 0; K < k.length; K += M) {
            const Se = k.slice(K, K + M);
            await Promise.all(
              Se.map((qe) => ut(
                `https://resources.download.minecraft.net/${qe.hash.slice(0, 2)}/${qe.hash}`,
                H.join(O, qe.hash.slice(0, 2), qe.hash),
                (Gt) => {
                  ie += Gt;
                }
              ).catch(() => {
              }))
            ), J += Se.length;
            const mt = Date.now();
            if (mt - W > 1500) {
              const qe = ie / Math.max(1, (mt - W) / 1e3);
              t({
                instanceId: e.instanceId,
                stage: "downloading",
                statusText: `Загрузка ресурсов (${J}/${k.length}) — ${(qe / 1024 / 1024).toFixed(1)} МБ/с`,
                progress: 15 + J / k.length * 25
              }), W = mt, ie = 0;
            }
          }
        }
      } catch (L) {
        n({ timestamp: Date.now(), type: "warn", message: `Ресурсы: ${L.message}` });
      }
    }
    const R = H.join(a, e.version, `${e.version}.jar`);
    if (!F.existsSync(R) && ((u = (c = S.downloads) == null ? void 0 : c.client) != null && u.url)) {
      const T = (L) => {
        on += L;
        const j = Date.now();
        if (j - rn > 500) {
          const O = on / Math.max(1, (j - rn) / 1e3);
          rn = j, on = 0, t({
            instanceId: e.instanceId,
            stage: "downloading",
            statusText: `Загрузка Minecraft ${e.version}.jar — ${(O / 1024 / 1024).toFixed(1)} МБ/с`,
            progress: 45
          });
        }
      };
      t({ instanceId: e.instanceId, stage: "downloading", statusText: `Загрузка Minecraft ${e.version}.jar...`, progress: 42 }), await ut(S.downloads.client.url, R, T);
    }
    t({ instanceId: e.instanceId, stage: "downloading", statusText: "Загрузка библиотек...", progress: 50 });
    const N = [], D = S.libraries || [];
    let E = 0, q = 0, Z = 0;
    for (const T of D) {
      if (!ox(T.rules)) continue;
      if ((d = T.downloads) != null && d.artifact) {
        const j = T.downloads.artifact.path, O = H.join(s, j);
        if (!F.existsSync(O))
          try {
            await ut(T.downloads.artifact.url, O, (k) => {
              q += k;
            });
          } catch {
          }
        F.existsSync(O) && (N.push(O), (j.includes("natives") || T.name.includes("natives")) && await Wo(O, l));
      }
      if ((m = T.downloads) != null && m.classifiers) {
        const j = T.downloads.classifiers, O = process.platform === "win32" ? j["natives-windows"] || j["natives-windows-64"] || j["natives-windows-x86"] : process.platform === "darwin" ? j["natives-osx"] || j["natives-macos"] : j["natives-linux"];
        if (O) {
          const k = O.path, J = H.join(s, k);
          if (!F.existsSync(J))
            try {
              await ut(O.url, J, (M) => {
                q += M;
              });
            } catch {
            }
          F.existsSync(J) && await Wo(J, l);
        }
      }
      if (!((v = T.downloads) != null && v.artifact) && T.name) {
        const j = T.name.split(":"), O = j[0].replace(/\./g, "/"), k = j[1], J = j[2], M = `${O}/${k}/${J}/${k}-${J}.jar`, W = H.join(s, M), ie = T.url ? `${T.url}${M}` : `https://libraries.minecraft.net/${M}`;
        if (!F.existsSync(W))
          try {
            await ut(ie, W, (K) => {
              q += K;
            });
          } catch {
          }
        F.existsSync(W) && (N.push(W), T.name.includes("natives") && await Wo(W, l));
      }
      Z++;
      const L = Date.now();
      if (L - E > 800 && q > 0) {
        const j = q / Math.max(1, (L - E) / 1e3);
        t({
          instanceId: e.instanceId,
          stage: "downloading",
          statusText: `Библиотеки ${Z}/${D.length} — ${(j / 1024 / 1024).toFixed(1)} МБ/с`,
          progress: 50 + Z / D.length * 15
        }), E = L, q = 0;
      }
    }
    N.push(R);
    let te = S.mainClass || "net.minecraft.client.main.Main", ee = [];
    if (e.loader === "fabric") {
      t({ instanceId: e.instanceId, stage: "downloading", statusText: "Установка Fabric...", progress: 72 });
      try {
        const T = await en(`https://meta.fabricmc.net/v2/versions/loader/${e.version}`);
        if (T != null && T.length) {
          const L = T[0].loader.version, j = await en(
            `https://meta.fabricmc.net/v2/versions/loader/${e.version}/${L}/profile/json`
          );
          if (j.mainClass && (te = j.mainClass), j.libraries)
            for (const O of j.libraries) {
              const k = O.name.split(":"), J = k[0].replace(/\./g, "/"), M = k[1], W = k[2], ie = `${J}/${M}/${W}/${M}-${W}.jar`, K = H.join(s, ie), Se = O.url ? `${O.url}${ie}` : `https://maven.fabricmc.net/${ie}`;
              if (!F.existsSync(K))
                try {
                  await ut(Se, K);
                } catch {
                }
              F.existsSync(K) && N.unshift(K);
            }
        }
      } catch (T) {
        throw new Error(`Ошибка загрузки Fabric: ${T.message}`);
      }
    }
    if (e.loader === "quilt") {
      t({ instanceId: e.instanceId, stage: "downloading", statusText: "Установка Quilt...", progress: 72 });
      try {
        const T = await en(`https://meta.quiltmc.org/v3/versions/loader/${e.version}`);
        if (T != null && T.length) {
          const L = T[0].loader.version, j = await en(
            `https://meta.quiltmc.org/v3/versions/loader/${e.version}/${L}/profile/json`
          );
          if (j.mainClass && (te = j.mainClass), j.libraries)
            for (const O of j.libraries) {
              const k = O.name.split(":"), J = k[0].replace(/\./g, "/"), M = k[1], W = k[2], ie = `${J}/${M}/${W}/${M}-${W}.jar`, K = H.join(s, ie), Se = O.url ? `${O.url}${ie}` : `https://maven.quiltmc.org/repository/release/${ie}`;
              if (!F.existsSync(K))
                try {
                  await ut(Se, K);
                } catch {
                }
              F.existsSync(K) && N.unshift(K);
            }
        }
      } catch (T) {
        throw new Error(`Ошибка загрузки Quilt: ${T.message}`);
      }
    }
    t({ instanceId: e.instanceId, stage: "launching", statusText: "Запуск игры...", progress: 92 });
    const Q = N.join(H.delimiter), Y = [];
    Y.push(`-Xms${e.memoryMin || 1024}M`), Y.push(`-Xmx${e.memoryMax || 4096}M`), (y = e.customJvmArgs) != null && y.includes("-Djava.library.path") || Y.push(`-Djava.library.path=${l}`), Y.push(
      "-XX:+UseG1GC",
      "-XX:+UnlockExperimentalVMOptions",
      "-XX:G1NewSizePercent=20",
      "-XX:G1ReservePercent=20",
      "-XX:MaxGCPauseMillis=50",
      "-XX:G1HeapRegionSize=32M"
    ), e.customJvmArgs && Y.push(...e.customJvmArgs.split(" ").filter(Boolean)), ee.push("-cp", Q, te), Y.push(...ee);
    const C = (e.uuid || ad(e.username || "Player")).replace(/-/g, "");
    if (S.minecraftArguments && typeof S.minecraftArguments == "string")
      for (const T of S.minecraftArguments.split(" "))
        Y.push(
          T.replace("${auth_player_name}", e.username || "Player").replace("${version_name}", `${e.version}-${e.loader}`).replace("${game_directory}", i).replace("${assets_root}", o).replace("${assets_index_name}", ((w = S.assetIndex) == null ? void 0 : w.id) || e.version).replace("${auth_uuid}", C).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", e.loader === "vanilla" ? "release" : "release/mod")
        );
    else
      Y.push(
        "--username",
        e.username || "Player",
        "--version",
        `${e.version}-${e.loader}`,
        "--gameDir",
        i,
        "--assetsDir",
        o,
        "--assetIndex",
        ((b = S.assetIndex) == null ? void 0 : b.id) || e.version,
        "--uuid",
        C,
        "--accessToken",
        "0",
        "--userType",
        "mojang",
        "--versionType",
        "release"
      );
    e.fullscreen && !Y.includes("--fullscreen") && Y.push("--fullscreen"), e.customGameArgs && Y.push(...e.customGameArgs.split(" ").filter(Boolean)), n({ timestamp: Date.now(), type: "info", message: `Запуск: "${$}" ${Y.slice(0, 8).join(" ")} ... [обрезано]` });
    const I = yh($ || "javaw", Y, {
      cwd: i,
      detached: !e.hideLauncher
    });
    cr.set(e.instanceId, I), I.stdout.on("data", (T) => {
      for (const L of T.toString().split(`
`))
        L.trim() && (Sc(L), n({ timestamp: Date.now(), type: "info", message: L }));
    }), I.stderr.on("data", (T) => {
      for (const L of T.toString().split(`
`))
        L.trim() && (Sc(L), n({ timestamp: Date.now(), type: "warn", message: L }));
    }), I.on("error", (T) => {
      cr.delete(e.instanceId), t({
        instanceId: e.instanceId,
        stage: "error",
        statusText: `Ошибка запуска: ${T.message}`,
        progress: 0,
        error: T.message
      }), n({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${T.message}` });
    }), I.on("exit", (T) => {
      if (cr.delete(e.instanceId), T === 0)
        Lt = [], t({ instanceId: e.instanceId, stage: "idle", statusText: "", progress: 0 }), n({ timestamp: Date.now(), type: "info", message: "Minecraft завершён." });
      else {
        const L = ix();
        Lt = [], t({
          instanceId: e.instanceId,
          stage: "error",
          statusText: `Игра завершилась с ошибкой (код ${T}). ${L}`,
          progress: 0,
          error: `exit ${T}`
        }), n({ timestamp: Date.now(), type: "error", message: `Minecraft завершился с кодом ${T}. ${L}` });
      }
    }), t({ instanceId: e.instanceId, stage: "running", statusText: "Игра запущена!", progress: 100 });
  } catch ($) {
    t({
      instanceId: e.instanceId,
      stage: "error",
      statusText: `Ошибка: ${$.message}`,
      progress: 0,
      error: $.message
    }), n({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${$.message}` });
  }
}
function Tc(e) {
  const t = cr.get(e);
  if (t) {
    try {
      process.kill(-t.pid, "SIGTERM");
    } catch {
      t.kill();
    }
    return cr.delete(e), !0;
  }
  return !1;
}
Ac.setApplicationMenu(null);
_t.requestSingleInstanceLock() || _t.quit();
const ud = H.dirname(ph(import.meta.url));
process.env.APP_ROOT = H.join(ud, "..");
const an = process.env.VITE_DEV_SERVER_URL, fd = H.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = an ? H.join(process.env.APP_ROOT, "public") : fd;
let X = null, ze = null, dd = !1;
const De = ao(), hi = H.join(De, "accounts.json"), ir = H.join(De, "instances.json"), hs = H.join(De, "settings.json"), Ot = H.join(De, "skins");
function ra(e, t) {
  try {
    if (F.existsSync(e)) return JSON.parse(F.readFileSync(e, "utf-8"));
  } catch {
  }
  return t;
}
function Et(e, t) {
  try {
    F.writeFileSync(e, JSON.stringify(t, null, 2), "utf-8");
  } catch (n) {
    console.error(`Failed saving ${e}:`, n);
  }
}
let pe = ra(hi, []), ve = ra(ir, []);
const ia = Math.round(mh.totalmem() / 1024 / 1024), oa = Math.max(2048, Math.min(4096, Math.floor(ia / 3)));
let Ee = ra(hs, {
  javaPath: "",
  memoryMin: 1024,
  memoryMax: oa,
  customJvmArgs: "",
  closeLauncherOnGameStart: !1,
  fullscreen: !1,
  hideLauncher: !1
});
(!Ee.memoryMax || Ee.memoryMax > ia * 0.85) && (Ee.memoryMax = oa);
function sa() {
  X = new Cc({
    width: 1100,
    height: 740,
    minWidth: 940,
    minHeight: 660,
    frame: !1,
    titleBarStyle: "hidden",
    backgroundColor: "#111217",
    icon: H.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: H.join(ud, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0,
      webSecurity: !0
    }
  }), an ? X.loadURL(an) : X.loadFile(H.join(fd, "index.html")), X.on("closed", () => {
    X = null;
  }), X.webContents.setWindowOpenHandler(() => ({ action: "deny" })), X.webContents.on("will-navigate", (e) => e.preventDefault());
}
function lx() {
  if (ze) return ze;
  const e = H.join(process.env.VITE_PUBLIC, "icon.png");
  let t = Aa.createFromPath(e);
  t.isEmpty() && (t = Aa.createEmpty()), ze = new fh(t), ze.setToolTip("Mine Launcher"), ze.on("click", () => {
    X == null || X.show();
  });
  const n = Ac.buildFromTemplate([
    { label: "Показать лаунчер", click: () => X == null ? void 0 : X.show() },
    { type: "separator" },
    { label: "Выход", click: () => _t.quit() }
  ]);
  return ze.setContextMenu(n), ze;
}
function wn(e) {
  try {
    X == null || X.webContents.send("updater:state", e);
  } catch {
  }
}
function cx() {
  an || process.platform !== "linux" && (Fe.autoUpdater.autoDownload = !0, Fe.autoUpdater.autoInstallOnAppQuit = !0, Fe.autoUpdater.allowDowngrade = !1, Fe.autoUpdater.on("checking-for-update", () => {
    wn({ status: "checking" });
  }), Fe.autoUpdater.on("update-available", (e) => {
    wn({ status: "available", info: e });
    try {
      Fe.autoUpdater.downloadUpdate();
    } catch {
    }
  }), Fe.autoUpdater.on("update-not-available", (e) => {
    wn({ status: "not-available", info: e });
  }), Fe.autoUpdater.on("download-progress", (e) => {
    wn({
      status: "downloading",
      percent: e.percent,
      transferred: e.transferred,
      total: e.total,
      bytesPerSecond: e.bytesPerSecond
    });
  }), Fe.autoUpdater.on("update-downloaded", (e) => {
    wn({ status: "downloaded", info: e });
  }), Fe.autoUpdater.on("error", (e) => {
    wn({ status: "error", message: (e == null ? void 0 : e.message) || "Ошибка обновления" });
  }), setTimeout(() => {
    Fe.autoUpdater.checkForUpdates().catch(() => {
    });
  }, 4e3), setInterval(() => {
    Fe.autoUpdater.checkForUpdates().catch(() => {
    });
  }, 4 * 60 * 60 * 1e3));
}
function ux() {
  lx(), ze == null || ze.setToolTip("Mine Launcher — игра запущена"), X == null || X.hide();
}
_t.on("second-instance", () => {
  X ? (X.isMinimized() && X.restore(), X.show(), X.focus()) : sa();
});
_t.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    if (dd) return;
    _t.quit();
  }
  X = null;
});
_t.on("activate", () => {
  Cc.getAllWindows().length === 0 && sa();
});
function ps(e, t) {
  return new Promise((n, r) => {
    const i = H.dirname(t);
    F.existsSync(i) || F.mkdirSync(i, { recursive: !0 });
    const o = F.createWriteStream(t);
    (e.startsWith("https") ? gs : ys).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (l) => {
      if (l.statusCode && l.statusCode >= 300 && l.statusCode < 400 && l.headers.location)
        return o.close(), ps(l.headers.location, t).then(n).catch(r);
      if (l.statusCode !== 200)
        return o.close(), F.unlink(t, () => {
        }), l.resume(), r(new Error(`HTTP ${l.statusCode}: ${e}`));
      l.pipe(o), o.on("finish", () => o.close(() => n())), o.on("error", r);
    }).on("error", (l) => {
      o.close(), F.unlink(t, () => {
      }), r(l);
    });
  });
}
function fx() {
  re.handle("minimize-window", () => {
    X == null || X.minimize();
  }), re.handle("maximize-window", () => X ? X.isMaximized() ? (X.unmaximize(), !1) : (X.maximize(), !0) : !1), re.handle("close-window", () => {
    X == null || X.close();
  }), re.handle("is-maximized", () => (X == null ? void 0 : X.isMaximized()) || !1), re.handle("get-accounts", () => pe), re.handle("add-account", (e, t) => {
    const n = t.trim();
    if (!n) throw new Error("Введите никнейм");
    if (n.length > 16) throw new Error("Никнейм слишком длинный (максимум 16 символов)");
    if (!/^[a-zA-Z0-9_]+$/.test(n)) throw new Error("Допустимы только латинские буквы, цифры и знак _");
    if (pe.some((i) => i.username.toLowerCase() === n.toLowerCase()))
      throw new Error(`Аккаунт «${n}» уже добавлен`);
    const r = {
      id: Date.now().toString(),
      username: n,
      uuid: ad(n),
      type: "offline",
      isActive: pe.length === 0,
      createdAt: Date.now()
    };
    return pe.push(r), Et(hi, pe), pe;
  }), re.handle("set-active-account", (e, t) => (pe = pe.map((n) => ({ ...n, isActive: n.id === t })), Et(hi, pe), pe)), re.handle("delete-account", (e, t) => (pe = pe.filter((n) => n.id !== t), pe.length > 0 && !pe.some((n) => n.isActive) && (pe[0].isActive = !0), Et(hi, pe), pe)), re.handle("get-instances", () => ve), re.handle("create-instance", (e, t) => {
    if (!t.version) throw new Error("Выберите версию Minecraft");
    if (ve.some((r) => r.name === t.name)) throw new Error(`Сборка «${t.name}» уже существует`);
    const n = {
      id: "inst-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: t.name,
      version: t.version,
      loader: t.loader || "vanilla",
      created: Date.now(),
      memoryMin: Ee.memoryMin,
      memoryMax: Ee.memoryMax
    };
    ve.push(n), Et(ir, ve);
    for (const r of ["mods", "saves"]) {
      const i = H.join(De, "instances", n.id, r);
      F.existsSync(i) || F.mkdirSync(i, { recursive: !0 });
    }
    return ve;
  }), re.handle("rename-instance", (e, { id: t, name: n }) => {
    const r = ve.find((i) => i.id === t);
    if (!r) throw new Error("Сборка не найдена");
    return r.name = n.trim(), Et(ir, ve), ve;
  }), re.handle("delete-instance", (e, t) => {
    const n = ve.find((r) => r.id === t);
    return ve = ve.filter((r) => r.id !== t), Et(ir, ve), n && F.existsSync(H.join(De, "instances", t)) && X && go.showMessageBox(X, {
      type: "question",
      buttons: ["Удалить", "Отмена"],
      defaultId: 1,
      title: "Удалить сборку?",
      message: `Удалить сборку «${n.name}» вместе с мирами, модами и файлами игры?`
    }).then(({ response: r }) => {
      r === 0 && F.rmSync(H.join(De, "instances", t), { recursive: !0, force: !0 });
    }), ve;
  }), re.handle("get-versions", async () => {
    try {
      return await cd();
    } catch {
      return { latest: { release: "", snapshot: "" }, versions: [] };
    }
  }), re.handle("get-settings", () => Ee), re.handle("set-selected-instance-id", (e, t) => (Ee.selectedInstanceId = t, Et(hs, Ee), !0)), re.handle("save-settings", (e, t) => (Ee = { ...Ee, ...t }, Et(hs, Ee), Ee)), re.handle("detect-java", async () => ld()), re.handle("get-required-java", (e, t) => sd(t)), re.handle("open-launcher-folder", () => Ta.openPath(De)), re.handle("launch-instance", async (e, t) => {
    const n = ve.find((i) => i.id === t);
    if (!n) throw new Error("Сборка не найдена");
    const r = pe.find((i) => i.isActive) || pe[0];
    if (!r) throw new Error("Сначала добавьте аккаунт на панели слева");
    return Tc(t) && await new Promise((i) => setTimeout(i, 500)), X == null || X.show(), ax(
      {
        instanceId: n.id,
        instanceName: n.name,
        version: n.version,
        loader: n.loader || "vanilla",
        username: r.username,
        uuid: r.uuid,
        memoryMin: Ee.memoryMin || 1024,
        memoryMax: Ee.memoryMax || 4096,
        javaPath: n.javaPath || Ee.javaPath || void 0,
        customJvmArgs: Ee.customJvmArgs || "",
        customGameArgs: "",
        fullscreen: !!Ee.fullscreen,
        hideLauncher: !!Ee.closeLauncherOnGameStart
      },
      (i) => {
        if ((i == null ? void 0 : i.stage) === "running") {
          const o = ve.find((s) => s.id === t);
          o && (o.lastPlayed = Date.now(), Et(ir, ve)), Ee.closeLauncherOnGameStart && setTimeout(() => {
            try {
              ux();
            } catch {
            }
          }, 3e3);
        }
        ((i == null ? void 0 : i.stage) === "idle" || (i == null ? void 0 : i.stage) === "error") && (ze == null || ze.setToolTip("Mine Launcher")), X == null || X.webContents.send("launch-progress", i);
      },
      (i) => X == null ? void 0 : X.webContents.send("game-log", i)
    ), !0;
  }), re.handle("stop-instance", (e, t) => Tc(t)), re.handle("restore-window", () => (X == null || X.show(), !0)), re.handle("get-system-info", () => ({
    totalRamMb: ia,
    defaultMaxMemory: oa
  })), re.handle("open-instance-folder", (e, t) => {
    const n = H.join(De, "instances", t);
    F.existsSync(n) || F.mkdirSync(n, { recursive: !0 }), Ta.openPath(n);
  }), re.handle("get-instance-mods", (e, t) => {
    const n = H.join(De, "instances", t, "mods");
    if (!F.existsSync(n)) return [];
    try {
      return F.readdirSync(n).filter((r) => r.endsWith(".jar") || r.endsWith(".jar.disabled")).map((r) => {
        const i = H.join(n, r), o = F.statSync(i);
        return {
          id: r,
          filename: r,
          name: r.replace(/\.jar(\.disabled)?$/, ""),
          enabled: r.endsWith(".jar"),
          size: o.size
        };
      });
    } catch {
      return [];
    }
  }), re.handle("toggle-mod", (e, { instanceId: t, modFilename: n }) => {
    const r = H.join(De, "instances", t, "mods"), i = H.join(r, n);
    if (!F.existsSync(i)) return !1;
    const o = n.endsWith(".jar") ? n + ".disabled" : n.replace(/\.disabled$/, "");
    return F.renameSync(i, H.join(r, o)), !0;
  }), re.handle("delete-mod", (e, { instanceId: t, modFilename: n }) => {
    const r = H.join(De, "instances", t, "mods"), i = H.join(r, n);
    return F.existsSync(i) && F.unlinkSync(i), !0;
  }), re.handle("download-mod-file", async (e, { instanceId: t, downloadUrl: n, filename: r }) => {
    if (!/^[a-zA-Z0-9._ -]+$/.test(r)) throw new Error("Некорректное имя файла мода");
    const i = H.join(De, "instances", t, "mods");
    return F.existsSync(i) || F.mkdirSync(i, { recursive: !0 }), await ps(n, H.join(i, r)), !0;
  }), re.handle("add-mod-file", async (e, t) => {
    if (!X) return !1;
    const n = await go.showOpenDialog(X, {
      title: "Выберите файл мода (.jar)",
      filters: [{ name: "Minecraft Mods", extensions: ["jar"] }],
      properties: ["openFile", "multiSelections"]
    });
    if (n.canceled || !n.filePaths.length) return !1;
    const r = H.join(De, "instances", t, "mods");
    F.existsSync(r) || F.mkdirSync(r, { recursive: !0 });
    for (const i of n.filePaths) {
      const o = H.join(r, H.basename(i));
      F.copyFileSync(i, o);
    }
    return !0;
  }), re.handle("upload-user-skin", async (e, t) => {
    if (!X) return null;
    const n = await go.showOpenDialog(X, {
      title: "Выберите скин Minecraft (.png)",
      filters: [{ name: "Minecraft Skin (*.png)", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (n.canceled || !n.filePaths.length) return null;
    F.existsSync(Ot) || F.mkdirSync(Ot, { recursive: !0 });
    const r = H.join(Ot, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`);
    return F.copyFileSync(n.filePaths[0], r), X.webContents.send("accounts-updated", pe), r;
  }), re.handle("fetch-online-skin", async (e, { username: t, targetUsername: n }) => {
    F.existsSync(Ot) || F.mkdirSync(Ot, { recursive: !0 });
    const r = H.join(Ot, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`), i = [
      `https://mc-heads.net/skin/${encodeURIComponent(n)}`,
      `https://minotar.net/skin/${encodeURIComponent(n)}`
    ];
    for (const o of i)
      try {
        if (await ps(o, r), F.existsSync(r) && F.statSync(r).size > 100)
          return !0;
      } catch {
      }
    throw new Error(`Скин для «${n}» не найден на серверах`);
  }), re.handle("get-user-skin", (e, t) => {
    const n = H.join(Ot, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`);
    return F.existsSync(n) ? n : null;
  }), re.handle("get-profile-stats", (e, t) => {
    const n = [];
    let r = 0, i = 0;
    for (const s of ve) {
      s.lastPlayed && (i = Math.max(i, s.lastPlayed));
      const a = H.join(De, "instances", s.id, "saves");
      if (F.existsSync(a))
        try {
          for (const p of F.readdirSync(a)) {
            const c = H.join(a, p);
            if (F.statSync(c).isDirectory()) {
              let u = 0;
              const d = H.join(c, "level.dat");
              F.existsSync(d) && (u = F.statSync(d).mtimeMs), n.push({
                instanceId: s.id,
                instanceName: s.name,
                worldName: p,
                lastPlayed: u
              });
            }
          }
        } catch {
        }
      const l = H.join(De, "instances", s.id, "mods");
      if (F.existsSync(l))
        try {
          r += F.readdirSync(l).filter((p) => p.endsWith(".jar") || p.endsWith(".jar.disabled")).length;
        } catch {
        }
    }
    const o = pe.find((s) => s.username === t) || pe.find((s) => s.isActive);
    return {
      username: (o == null ? void 0 : o.username) || t,
      uuid: (o == null ? void 0 : o.uuid) || "",
      worldsCount: n.length,
      worlds: n.sort((s, a) => a.lastPlayed - s.lastPlayed),
      instancesCount: ve.length,
      modsCount: r,
      lastPlayedFormatted: i ? new Date(i).toLocaleString("ru-RU") : "Ещё не играл"
    };
  }), re.handle("get-account-head", async (e, t) => {
    const n = H.join(Ot, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`);
    return F.existsSync(n) ? `file://${n}` : `https://mc-heads.net/avatar/${encodeURIComponent(t)}/64`;
  }), re.handle("updater:check", async () => {
    if (an) return { status: "dev" };
    try {
      return await Fe.autoUpdater.checkForUpdates(), { ok: !0 };
    } catch (e) {
      return { ok: !1, message: e == null ? void 0 : e.message };
    }
  }), re.handle("updater:download", async () => {
    if (an) return { status: "dev" };
    try {
      return await Fe.autoUpdater.downloadUpdate(), { ok: !0 };
    } catch (e) {
      return { ok: !1, message: e == null ? void 0 : e.message };
    }
  }), re.handle("updater:install", () => {
    if (an) return !1;
    try {
      return dd = !0, setImmediate(() => {
        Fe.autoUpdater.quitAndInstall();
      }), !0;
    } catch {
      return !1;
    }
  });
}
_t.whenReady().then(() => {
  fx(), sa(), cx();
});
export {
  fd as RENDERER_DIST,
  an as VITE_DEV_SERVER_URL
};
