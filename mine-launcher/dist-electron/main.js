import Nn, { app as Dt, Menu as Mu, BrowserWindow as ku, ipcMain as ne, dialog as Sr, shell as Cl, nativeImage as Il, Tray as Up } from "electron";
import lt from "fs";
import Mp from "constants";
import Et from "stream";
import cr from "util";
import Bu from "assert";
import ce from "path";
import lo from "child_process";
import co from "events";
import ur from "crypto";
import ju from "tty";
import uo from "os";
import ln from "url";
import Zr from "zlib";
import kp from "http";
import { fileURLToPath as Bp } from "node:url";
import j from "node:path";
import P from "node:fs";
import jp from "node:os";
import ca from "node:https";
import ua from "node:http";
import Hp from "node:crypto";
import { execSync as js, spawn as Gp } from "node:child_process";
import Hu from "buffer";
var Ge = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Gu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var je = {}, Rn = {}, We = {};
We.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((n, r) => {
        t.push((i, o) => i != null ? r(i) : n(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
We.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const n = t[t.length - 1];
    if (typeof n != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((r) => n(null, r), n);
  }, "name", { value: e.name });
};
var Vt = Mp, zp = process.cwd, ji = null, qp = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return ji || (ji = zp.call(process)), ji;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var bl = process.chdir;
  process.chdir = function(e) {
    ji = null, bl.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, bl);
}
var Vp = Wp;
function Wp(e) {
  Vt.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || n(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = r(e.chmod), e.fchmod = r(e.fchmod), e.lchmod = r(e.lchmod), e.chownSync = s(e.chownSync), e.fchownSync = s(e.fchownSync), e.lchownSync = s(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = a(e.stat), e.fstat = a(e.fstat), e.lstat = a(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(c, u, p) {
    p && process.nextTick(p);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(c, u, p, w) {
    w && process.nextTick(w);
  }, e.lchownSync = function() {
  }), qp === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(c) {
    function u(p, w, m) {
      var f = Date.now(), g = 0;
      c(p, w, function v(y) {
        if (y && (y.code === "EACCES" || y.code === "EPERM" || y.code === "EBUSY") && Date.now() - f < 6e4) {
          setTimeout(function() {
            e.stat(w, function(S, C) {
              S && S.code === "ENOENT" ? c(p, w, v) : m(y);
            });
          }, g), g < 100 && (g += 10);
          return;
        }
        m && m(y);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, c), u;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(c) {
    function u(p, w, m, f, g, v) {
      var y;
      if (v && typeof v == "function") {
        var S = 0;
        y = function(C, N, D) {
          if (C && C.code === "EAGAIN" && S < 10)
            return S++, c.call(e, p, w, m, f, g, y);
          v.apply(this, arguments);
        };
      }
      return c.call(e, p, w, m, f, g, y);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, c), u;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(c) {
    return function(u, p, w, m, f) {
      for (var g = 0; ; )
        try {
          return c.call(e, u, p, w, m, f);
        } catch (v) {
          if (v.code === "EAGAIN" && g < 10) {
            g++;
            continue;
          }
          throw v;
        }
    };
  }(e.readSync);
  function t(c) {
    c.lchmod = function(u, p, w) {
      c.open(
        u,
        Vt.O_WRONLY | Vt.O_SYMLINK,
        p,
        function(m, f) {
          if (m) {
            w && w(m);
            return;
          }
          c.fchmod(f, p, function(g) {
            c.close(f, function(v) {
              w && w(g || v);
            });
          });
        }
      );
    }, c.lchmodSync = function(u, p) {
      var w = c.openSync(u, Vt.O_WRONLY | Vt.O_SYMLINK, p), m = !0, f;
      try {
        f = c.fchmodSync(w, p), m = !1;
      } finally {
        if (m)
          try {
            c.closeSync(w);
          } catch {
          }
        else
          c.closeSync(w);
      }
      return f;
    };
  }
  function n(c) {
    Vt.hasOwnProperty("O_SYMLINK") && c.futimes ? (c.lutimes = function(u, p, w, m) {
      c.open(u, Vt.O_SYMLINK, function(f, g) {
        if (f) {
          m && m(f);
          return;
        }
        c.futimes(g, p, w, function(v) {
          c.close(g, function(y) {
            m && m(v || y);
          });
        });
      });
    }, c.lutimesSync = function(u, p, w) {
      var m = c.openSync(u, Vt.O_SYMLINK), f, g = !0;
      try {
        f = c.futimesSync(m, p, w), g = !1;
      } finally {
        if (g)
          try {
            c.closeSync(m);
          } catch {
          }
        else
          c.closeSync(m);
      }
      return f;
    }) : c.futimes && (c.lutimes = function(u, p, w, m) {
      m && process.nextTick(m);
    }, c.lutimesSync = function() {
    });
  }
  function r(c) {
    return c && function(u, p, w) {
      return c.call(e, u, p, function(m) {
        h(m) && (m = null), w && w.apply(this, arguments);
      });
    };
  }
  function i(c) {
    return c && function(u, p) {
      try {
        return c.call(e, u, p);
      } catch (w) {
        if (!h(w)) throw w;
      }
    };
  }
  function o(c) {
    return c && function(u, p, w, m) {
      return c.call(e, u, p, w, function(f) {
        h(f) && (f = null), m && m.apply(this, arguments);
      });
    };
  }
  function s(c) {
    return c && function(u, p, w) {
      try {
        return c.call(e, u, p, w);
      } catch (m) {
        if (!h(m)) throw m;
      }
    };
  }
  function a(c) {
    return c && function(u, p, w) {
      typeof p == "function" && (w = p, p = null);
      function m(f, g) {
        g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), w && w.apply(this, arguments);
      }
      return p ? c.call(e, u, p, m) : c.call(e, u, m);
    };
  }
  function l(c) {
    return c && function(u, p) {
      var w = p ? c.call(e, u, p) : c.call(e, u);
      return w && (w.uid < 0 && (w.uid += 4294967296), w.gid < 0 && (w.gid += 4294967296)), w;
    };
  }
  function h(c) {
    if (!c || c.code === "ENOSYS")
      return !0;
    var u = !process.getuid || process.getuid() !== 0;
    return !!(u && (c.code === "EINVAL" || c.code === "EPERM"));
  }
}
var Al = Et.Stream, Yp = Xp;
function Xp(e) {
  return {
    ReadStream: t,
    WriteStream: n
  };
  function t(r, i) {
    if (!(this instanceof t)) return new t(r, i);
    Al.call(this);
    var o = this;
    this.path = r, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var s = Object.keys(i), a = 0, l = s.length; a < l; a++) {
      var h = s[a];
      this[h] = i[h];
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
    Al.call(this), this.path = r, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
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
var Jp = Kp, Zp = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Kp(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Zp(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(n) {
    Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
  }), t;
}
var Ee = lt, Qp = Vp, em = Yp, tm = Jp, xi = cr, Pe, Ji;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Pe = Symbol.for("graceful-fs.queue"), Ji = Symbol.for("graceful-fs.previous")) : (Pe = "___graceful-fs.queue", Ji = "___graceful-fs.previous");
function nm() {
}
function zu(e, t) {
  Object.defineProperty(e, Pe, {
    get: function() {
      return t;
    }
  });
}
var Tn = nm;
xi.debuglog ? Tn = xi.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (Tn = function() {
  var e = xi.format.apply(xi, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!Ee[Pe]) {
  var rm = Ge[Pe] || [];
  zu(Ee, rm), Ee.close = function(e) {
    function t(n, r) {
      return e.call(Ee, n, function(i) {
        i || Tl(), typeof r == "function" && r.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Ji, {
      value: e
    }), t;
  }(Ee.close), Ee.closeSync = function(e) {
    function t(n) {
      e.apply(Ee, arguments), Tl();
    }
    return Object.defineProperty(t, Ji, {
      value: e
    }), t;
  }(Ee.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    Tn(Ee[Pe]), Bu.equal(Ee[Pe].length, 0);
  });
}
Ge[Pe] || zu(Ge, Ee[Pe]);
var Ye = fa(tm(Ee));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !Ee.__patched && (Ye = fa(Ee), Ee.__patched = !0);
function fa(e) {
  Qp(e), e.gracefulify = fa, e.createReadStream = N, e.createWriteStream = D;
  var t = e.readFile;
  e.readFile = n;
  function n(L, x, W) {
    return typeof x == "function" && (W = x, x = null), K(L, x, W);
    function K(te, F, O, M) {
      return t(te, F, function(R) {
        R && (R.code === "EMFILE" || R.code === "ENFILE") ? kn([K, [te, F, O], R, M || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  var r = e.writeFile;
  e.writeFile = i;
  function i(L, x, W, K) {
    return typeof W == "function" && (K = W, W = null), te(L, x, W, K);
    function te(F, O, M, R, H) {
      return r(F, O, M, function(T) {
        T && (T.code === "EMFILE" || T.code === "ENFILE") ? kn([te, [F, O, M, R], T, H || Date.now(), Date.now()]) : typeof R == "function" && R.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = s);
  function s(L, x, W, K) {
    return typeof W == "function" && (K = W, W = null), te(L, x, W, K);
    function te(F, O, M, R, H) {
      return o(F, O, M, function(T) {
        T && (T.code === "EMFILE" || T.code === "ENFILE") ? kn([te, [F, O, M, R], T, H || Date.now(), Date.now()]) : typeof R == "function" && R.apply(this, arguments);
      });
    }
  }
  var a = e.copyFile;
  a && (e.copyFile = l);
  function l(L, x, W, K) {
    return typeof W == "function" && (K = W, W = 0), te(L, x, W, K);
    function te(F, O, M, R, H) {
      return a(F, O, M, function(T) {
        T && (T.code === "EMFILE" || T.code === "ENFILE") ? kn([te, [F, O, M, R], T, H || Date.now(), Date.now()]) : typeof R == "function" && R.apply(this, arguments);
      });
    }
  }
  var h = e.readdir;
  e.readdir = u;
  var c = /^v[0-5]\./;
  function u(L, x, W) {
    typeof x == "function" && (W = x, x = null);
    var K = c.test(process.version) ? function(O, M, R, H) {
      return h(O, te(
        O,
        M,
        R,
        H
      ));
    } : function(O, M, R, H) {
      return h(O, M, te(
        O,
        M,
        R,
        H
      ));
    };
    return K(L, x, W);
    function te(F, O, M, R) {
      return function(H, T) {
        H && (H.code === "EMFILE" || H.code === "ENFILE") ? kn([
          K,
          [F, O, M],
          H,
          R || Date.now(),
          Date.now()
        ]) : (T && T.sort && T.sort(), typeof M == "function" && M.call(this, H, T));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var p = em(e);
    v = p.ReadStream, S = p.WriteStream;
  }
  var w = e.ReadStream;
  w && (v.prototype = Object.create(w.prototype), v.prototype.open = y);
  var m = e.WriteStream;
  m && (S.prototype = Object.create(m.prototype), S.prototype.open = C), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return v;
    },
    set: function(L) {
      v = L;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return S;
    },
    set: function(L) {
      S = L;
    },
    enumerable: !0,
    configurable: !0
  });
  var f = v;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return f;
    },
    set: function(L) {
      f = L;
    },
    enumerable: !0,
    configurable: !0
  });
  var g = S;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return g;
    },
    set: function(L) {
      g = L;
    },
    enumerable: !0,
    configurable: !0
  });
  function v(L, x) {
    return this instanceof v ? (w.apply(this, arguments), this) : v.apply(Object.create(v.prototype), arguments);
  }
  function y() {
    var L = this;
    k(L.path, L.flags, L.mode, function(x, W) {
      x ? (L.autoClose && L.destroy(), L.emit("error", x)) : (L.fd = W, L.emit("open", W), L.read());
    });
  }
  function S(L, x) {
    return this instanceof S ? (m.apply(this, arguments), this) : S.apply(Object.create(S.prototype), arguments);
  }
  function C() {
    var L = this;
    k(L.path, L.flags, L.mode, function(x, W) {
      x ? (L.destroy(), L.emit("error", x)) : (L.fd = W, L.emit("open", W));
    });
  }
  function N(L, x) {
    return new e.ReadStream(L, x);
  }
  function D(L, x) {
    return new e.WriteStream(L, x);
  }
  var B = e.open;
  e.open = k;
  function k(L, x, W, K) {
    return typeof W == "function" && (K = W, W = null), te(L, x, W, K);
    function te(F, O, M, R, H) {
      return B(F, O, M, function(T, G) {
        T && (T.code === "EMFILE" || T.code === "ENFILE") ? kn([te, [F, O, M, R], T, H || Date.now(), Date.now()]) : typeof R == "function" && R.apply(this, arguments);
      });
    }
  }
  return e;
}
function kn(e) {
  Tn("ENQUEUE", e[0].name, e[1]), Ee[Pe].push(e), da();
}
var Ci;
function Tl() {
  for (var e = Date.now(), t = 0; t < Ee[Pe].length; ++t)
    Ee[Pe][t].length > 2 && (Ee[Pe][t][3] = e, Ee[Pe][t][4] = e);
  da();
}
function da() {
  if (clearTimeout(Ci), Ci = void 0, Ee[Pe].length !== 0) {
    var e = Ee[Pe].shift(), t = e[0], n = e[1], r = e[2], i = e[3], o = e[4];
    if (i === void 0)
      Tn("RETRY", t.name, n), t.apply(null, n);
    else if (Date.now() - i >= 6e4) {
      Tn("TIMEOUT", t.name, n);
      var s = n.pop();
      typeof s == "function" && s.call(null, r);
    } else {
      var a = Date.now() - o, l = Math.max(o - i, 1), h = Math.min(l * 1.2, 100);
      a >= h ? (Tn("RETRY", t.name, n), t.apply(null, n.concat([i]))) : Ee[Pe].push(e);
    }
    Ci === void 0 && (Ci = setTimeout(da, 0));
  }
}
(function(e) {
  const t = We.fromCallback, n = Ye, r = [
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
  }, e.read = function(i, o, s, a, l, h) {
    return typeof h == "function" ? n.read(i, o, s, a, l, h) : new Promise((c, u) => {
      n.read(i, o, s, a, l, (p, w, m) => {
        if (p) return u(p);
        c({ bytesRead: w, buffer: m });
      });
    });
  }, e.write = function(i, o, ...s) {
    return typeof s[s.length - 1] == "function" ? n.write(i, o, ...s) : new Promise((a, l) => {
      n.write(i, o, ...s, (h, c, u) => {
        if (h) return l(h);
        a({ bytesWritten: c, buffer: u });
      });
    });
  }, typeof n.writev == "function" && (e.writev = function(i, o, ...s) {
    return typeof s[s.length - 1] == "function" ? n.writev(i, o, ...s) : new Promise((a, l) => {
      n.writev(i, o, ...s, (h, c, u) => {
        if (h) return l(h);
        a({ bytesWritten: c, buffers: u });
      });
    });
  }), typeof n.realpath.native == "function" ? e.realpath.native = t(n.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(Rn);
var ha = {}, qu = {};
const im = ce;
qu.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(im.parse(t).root, ""))) {
    const r = new Error(`Path contains invalid characters: ${t}`);
    throw r.code = "EINVAL", r;
  }
};
const Vu = Rn, { checkPath: Wu } = qu, Yu = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
ha.makeDir = async (e, t) => (Wu(e), Vu.mkdir(e, {
  mode: Yu(t),
  recursive: !0
}));
ha.makeDirSync = (e, t) => (Wu(e), Vu.mkdirSync(e, {
  mode: Yu(t),
  recursive: !0
}));
const om = We.fromPromise, { makeDir: sm, makeDirSync: ns } = ha, rs = om(sm);
var Nt = {
  mkdirs: rs,
  mkdirsSync: ns,
  // alias
  mkdirp: rs,
  mkdirpSync: ns,
  ensureDir: rs,
  ensureDirSync: ns
};
const am = We.fromPromise, Xu = Rn;
function lm(e) {
  return Xu.access(e).then(() => !0).catch(() => !1);
}
var $n = {
  pathExists: am(lm),
  pathExistsSync: Xu.existsSync
};
const tr = Ye;
function cm(e, t, n, r) {
  tr.open(e, "r+", (i, o) => {
    if (i) return r(i);
    tr.futimes(o, t, n, (s) => {
      tr.close(o, (a) => {
        r && r(s || a);
      });
    });
  });
}
function um(e, t, n) {
  const r = tr.openSync(e, "r+");
  return tr.futimesSync(r, t, n), tr.closeSync(r);
}
var Ju = {
  utimesMillis: cm,
  utimesMillisSync: um
};
const or = Rn, Re = ce, fm = cr;
function dm(e, t, n) {
  const r = n.dereference ? (i) => or.stat(i, { bigint: !0 }) : (i) => or.lstat(i, { bigint: !0 });
  return Promise.all([
    r(e),
    r(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function hm(e, t, n) {
  let r;
  const i = n.dereference ? (s) => or.statSync(s, { bigint: !0 }) : (s) => or.lstatSync(s, { bigint: !0 }), o = i(e);
  try {
    r = i(t);
  } catch (s) {
    if (s.code === "ENOENT") return { srcStat: o, destStat: null };
    throw s;
  }
  return { srcStat: o, destStat: r };
}
function pm(e, t, n, r, i) {
  fm.callbackify(dm)(e, t, r, (o, s) => {
    if (o) return i(o);
    const { srcStat: a, destStat: l } = s;
    if (l) {
      if (Kr(a, l)) {
        const h = Re.basename(e), c = Re.basename(t);
        return n === "move" && h !== c && h.toLowerCase() === c.toLowerCase() ? i(null, { srcStat: a, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (a.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!a.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return a.isDirectory() && pa(e, t) ? i(new Error(fo(e, t, n))) : i(null, { srcStat: a, destStat: l });
  });
}
function mm(e, t, n, r) {
  const { srcStat: i, destStat: o } = hm(e, t, r);
  if (o) {
    if (Kr(i, o)) {
      const s = Re.basename(e), a = Re.basename(t);
      if (n === "move" && s !== a && s.toLowerCase() === a.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && pa(e, t))
    throw new Error(fo(e, t, n));
  return { srcStat: i, destStat: o };
}
function Zu(e, t, n, r, i) {
  const o = Re.resolve(Re.dirname(e)), s = Re.resolve(Re.dirname(n));
  if (s === o || s === Re.parse(s).root) return i();
  or.stat(s, { bigint: !0 }, (a, l) => a ? a.code === "ENOENT" ? i() : i(a) : Kr(t, l) ? i(new Error(fo(e, n, r))) : Zu(e, t, s, r, i));
}
function Ku(e, t, n, r) {
  const i = Re.resolve(Re.dirname(e)), o = Re.resolve(Re.dirname(n));
  if (o === i || o === Re.parse(o).root) return;
  let s;
  try {
    s = or.statSync(o, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (Kr(t, s))
    throw new Error(fo(e, n, r));
  return Ku(e, t, o, r);
}
function Kr(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function pa(e, t) {
  const n = Re.resolve(e).split(Re.sep).filter((i) => i), r = Re.resolve(t).split(Re.sep).filter((i) => i);
  return n.reduce((i, o, s) => i && r[s] === o, !0);
}
function fo(e, t, n) {
  return `Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`;
}
var fr = {
  checkPaths: pm,
  checkPathsSync: mm,
  checkParentPaths: Zu,
  checkParentPathsSync: Ku,
  isSrcSubdir: pa,
  areIdentical: Kr
};
const Ze = Ye, Lr = ce, gm = Nt.mkdirs, Em = $n.pathExists, ym = Ju.utimesMillis, Pr = fr;
function wm(e, t, n, r) {
  typeof n == "function" && !r ? (r = n, n = {}) : typeof n == "function" && (n = { filter: n }), r = r || function() {
  }, n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), Pr.checkPaths(e, t, "copy", n, (i, o) => {
    if (i) return r(i);
    const { srcStat: s, destStat: a } = o;
    Pr.checkParentPaths(e, s, t, "copy", (l) => l ? r(l) : n.filter ? Qu(Dl, a, e, t, n, r) : Dl(a, e, t, n, r));
  });
}
function Dl(e, t, n, r, i) {
  const o = Lr.dirname(n);
  Em(o, (s, a) => {
    if (s) return i(s);
    if (a) return Zi(e, t, n, r, i);
    gm(o, (l) => l ? i(l) : Zi(e, t, n, r, i));
  });
}
function Qu(e, t, n, r, i, o) {
  Promise.resolve(i.filter(n, r)).then((s) => s ? e(t, n, r, i, o) : o(), (s) => o(s));
}
function vm(e, t, n, r, i) {
  return r.filter ? Qu(Zi, e, t, n, r, i) : Zi(e, t, n, r, i);
}
function Zi(e, t, n, r, i) {
  (r.dereference ? Ze.stat : Ze.lstat)(t, (s, a) => s ? i(s) : a.isDirectory() ? Am(a, e, t, n, r, i) : a.isFile() || a.isCharacterDevice() || a.isBlockDevice() ? _m(a, e, t, n, r, i) : a.isSymbolicLink() ? Nm(e, t, n, r, i) : a.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : a.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function _m(e, t, n, r, i, o) {
  return t ? Sm(e, n, r, i, o) : ef(e, n, r, i, o);
}
function Sm(e, t, n, r, i) {
  if (r.overwrite)
    Ze.unlink(n, (o) => o ? i(o) : ef(e, t, n, r, i));
  else return r.errorOnExist ? i(new Error(`'${n}' already exists`)) : i();
}
function ef(e, t, n, r, i) {
  Ze.copyFile(t, n, (o) => o ? i(o) : r.preserveTimestamps ? xm(e.mode, t, n, i) : ho(n, e.mode, i));
}
function xm(e, t, n, r) {
  return Cm(e) ? Im(n, e, (i) => i ? r(i) : Nl(e, t, n, r)) : Nl(e, t, n, r);
}
function Cm(e) {
  return (e & 128) === 0;
}
function Im(e, t, n) {
  return ho(e, t | 128, n);
}
function Nl(e, t, n, r) {
  bm(t, n, (i) => i ? r(i) : ho(n, e, r));
}
function ho(e, t, n) {
  return Ze.chmod(e, t, n);
}
function bm(e, t, n) {
  Ze.stat(e, (r, i) => r ? n(r) : ym(t, i.atime, i.mtime, n));
}
function Am(e, t, n, r, i, o) {
  return t ? tf(n, r, i, o) : Tm(e.mode, n, r, i, o);
}
function Tm(e, t, n, r, i) {
  Ze.mkdir(n, (o) => {
    if (o) return i(o);
    tf(t, n, r, (s) => s ? i(s) : ho(n, e, i));
  });
}
function tf(e, t, n, r) {
  Ze.readdir(e, (i, o) => i ? r(i) : nf(o, e, t, n, r));
}
function nf(e, t, n, r, i) {
  const o = e.pop();
  return o ? Dm(e, o, t, n, r, i) : i();
}
function Dm(e, t, n, r, i, o) {
  const s = Lr.join(n, t), a = Lr.join(r, t);
  Pr.checkPaths(s, a, "copy", i, (l, h) => {
    if (l) return o(l);
    const { destStat: c } = h;
    vm(c, s, a, i, (u) => u ? o(u) : nf(e, n, r, i, o));
  });
}
function Nm(e, t, n, r, i) {
  Ze.readlink(t, (o, s) => {
    if (o) return i(o);
    if (r.dereference && (s = Lr.resolve(process.cwd(), s)), e)
      Ze.readlink(n, (a, l) => a ? a.code === "EINVAL" || a.code === "UNKNOWN" ? Ze.symlink(s, n, i) : i(a) : (r.dereference && (l = Lr.resolve(process.cwd(), l)), Pr.isSrcSubdir(s, l) ? i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && Pr.isSrcSubdir(l, s) ? i(new Error(`Cannot overwrite '${l}' with '${s}'.`)) : Om(s, n, i)));
    else
      return Ze.symlink(s, n, i);
  });
}
function Om(e, t, n) {
  Ze.unlink(t, (r) => r ? n(r) : Ze.symlink(e, t, n));
}
var Rm = wm;
const He = Ye, Fr = ce, $m = Nt.mkdirsSync, Lm = Ju.utimesMillisSync, Ur = fr;
function Pm(e, t, n) {
  typeof n == "function" && (n = { filter: n }), n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: r, destStat: i } = Ur.checkPathsSync(e, t, "copy", n);
  return Ur.checkParentPathsSync(e, r, t, "copy"), Fm(i, e, t, n);
}
function Fm(e, t, n, r) {
  if (r.filter && !r.filter(t, n)) return;
  const i = Fr.dirname(n);
  return He.existsSync(i) || $m(i), rf(e, t, n, r);
}
function Um(e, t, n, r) {
  if (!(r.filter && !r.filter(t, n)))
    return rf(e, t, n, r);
}
function rf(e, t, n, r) {
  const o = (r.dereference ? He.statSync : He.lstatSync)(t);
  if (o.isDirectory()) return zm(o, e, t, n, r);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return Mm(o, e, t, n, r);
  if (o.isSymbolicLink()) return Wm(e, t, n, r);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function Mm(e, t, n, r, i) {
  return t ? km(e, n, r, i) : of(e, n, r, i);
}
function km(e, t, n, r) {
  if (r.overwrite)
    return He.unlinkSync(n), of(e, t, n, r);
  if (r.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
function of(e, t, n, r) {
  return He.copyFileSync(t, n), r.preserveTimestamps && Bm(e.mode, t, n), ma(n, e.mode);
}
function Bm(e, t, n) {
  return jm(e) && Hm(n, e), Gm(t, n);
}
function jm(e) {
  return (e & 128) === 0;
}
function Hm(e, t) {
  return ma(e, t | 128);
}
function ma(e, t) {
  return He.chmodSync(e, t);
}
function Gm(e, t) {
  const n = He.statSync(e);
  return Lm(t, n.atime, n.mtime);
}
function zm(e, t, n, r, i) {
  return t ? sf(n, r, i) : qm(e.mode, n, r, i);
}
function qm(e, t, n, r) {
  return He.mkdirSync(n), sf(t, n, r), ma(n, e);
}
function sf(e, t, n) {
  He.readdirSync(e).forEach((r) => Vm(r, e, t, n));
}
function Vm(e, t, n, r) {
  const i = Fr.join(t, e), o = Fr.join(n, e), { destStat: s } = Ur.checkPathsSync(i, o, "copy", r);
  return Um(s, i, o, r);
}
function Wm(e, t, n, r) {
  let i = He.readlinkSync(t);
  if (r.dereference && (i = Fr.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = He.readlinkSync(n);
    } catch (s) {
      if (s.code === "EINVAL" || s.code === "UNKNOWN") return He.symlinkSync(i, n);
      throw s;
    }
    if (r.dereference && (o = Fr.resolve(process.cwd(), o)), Ur.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (He.statSync(n).isDirectory() && Ur.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return Ym(i, n);
  } else
    return He.symlinkSync(i, n);
}
function Ym(e, t) {
  return He.unlinkSync(t), He.symlinkSync(e, t);
}
var Xm = Pm;
const Jm = We.fromCallback;
var ga = {
  copy: Jm(Rm),
  copySync: Xm
};
const Ol = Ye, af = ce, fe = Bu, Mr = process.platform === "win32";
function lf(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((n) => {
    e[n] = e[n] || Ol[n], n = n + "Sync", e[n] = e[n] || Ol[n];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function Ea(e, t, n) {
  let r = 0;
  typeof t == "function" && (n = t, t = {}), fe(e, "rimraf: missing path"), fe.strictEqual(typeof e, "string", "rimraf: path should be a string"), fe.strictEqual(typeof n, "function", "rimraf: callback function required"), fe(t, "rimraf: invalid options argument provided"), fe.strictEqual(typeof t, "object", "rimraf: options should be object"), lf(t), Rl(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && r < t.maxBusyTries) {
        r++;
        const s = r * 100;
        return setTimeout(() => Rl(e, t, i), s);
      }
      o.code === "ENOENT" && (o = null);
    }
    n(o);
  });
}
function Rl(e, t, n) {
  fe(e), fe(t), fe(typeof n == "function"), t.lstat(e, (r, i) => {
    if (r && r.code === "ENOENT")
      return n(null);
    if (r && r.code === "EPERM" && Mr)
      return $l(e, t, r, n);
    if (i && i.isDirectory())
      return Hi(e, t, r, n);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return n(null);
        if (o.code === "EPERM")
          return Mr ? $l(e, t, o, n) : Hi(e, t, o, n);
        if (o.code === "EISDIR")
          return Hi(e, t, o, n);
      }
      return n(o);
    });
  });
}
function $l(e, t, n, r) {
  fe(e), fe(t), fe(typeof r == "function"), t.chmod(e, 438, (i) => {
    i ? r(i.code === "ENOENT" ? null : n) : t.stat(e, (o, s) => {
      o ? r(o.code === "ENOENT" ? null : n) : s.isDirectory() ? Hi(e, t, n, r) : t.unlink(e, r);
    });
  });
}
function Ll(e, t, n) {
  let r;
  fe(e), fe(t);
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
  r.isDirectory() ? Gi(e, t, n) : t.unlinkSync(e);
}
function Hi(e, t, n, r) {
  fe(e), fe(t), fe(typeof r == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? Zm(e, t, r) : i && i.code === "ENOTDIR" ? r(n) : r(i);
  });
}
function Zm(e, t, n) {
  fe(e), fe(t), fe(typeof n == "function"), t.readdir(e, (r, i) => {
    if (r) return n(r);
    let o = i.length, s;
    if (o === 0) return t.rmdir(e, n);
    i.forEach((a) => {
      Ea(af.join(e, a), t, (l) => {
        if (!s) {
          if (l) return n(s = l);
          --o === 0 && t.rmdir(e, n);
        }
      });
    });
  });
}
function cf(e, t) {
  let n;
  t = t || {}, lf(t), fe(e, "rimraf: missing path"), fe.strictEqual(typeof e, "string", "rimraf: path should be a string"), fe(t, "rimraf: missing options"), fe.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    n = t.lstatSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    r.code === "EPERM" && Mr && Ll(e, t, r);
  }
  try {
    n && n.isDirectory() ? Gi(e, t, null) : t.unlinkSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    if (r.code === "EPERM")
      return Mr ? Ll(e, t, r) : Gi(e, t, r);
    if (r.code !== "EISDIR")
      throw r;
    Gi(e, t, r);
  }
}
function Gi(e, t, n) {
  fe(e), fe(t);
  try {
    t.rmdirSync(e);
  } catch (r) {
    if (r.code === "ENOTDIR")
      throw n;
    if (r.code === "ENOTEMPTY" || r.code === "EEXIST" || r.code === "EPERM")
      Km(e, t);
    else if (r.code !== "ENOENT")
      throw r;
  }
}
function Km(e, t) {
  if (fe(e), fe(t), t.readdirSync(e).forEach((n) => cf(af.join(e, n), t)), Mr) {
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
var Qm = Ea;
Ea.sync = cf;
const Ki = Ye, e0 = We.fromCallback, uf = Qm;
function t0(e, t) {
  if (Ki.rm) return Ki.rm(e, { recursive: !0, force: !0 }, t);
  uf(e, t);
}
function n0(e) {
  if (Ki.rmSync) return Ki.rmSync(e, { recursive: !0, force: !0 });
  uf.sync(e);
}
var po = {
  remove: e0(t0),
  removeSync: n0
};
const r0 = We.fromPromise, ff = Rn, df = ce, hf = Nt, pf = po, Pl = r0(async function(t) {
  let n;
  try {
    n = await ff.readdir(t);
  } catch {
    return hf.mkdirs(t);
  }
  return Promise.all(n.map((r) => pf.remove(df.join(t, r))));
});
function Fl(e) {
  let t;
  try {
    t = ff.readdirSync(e);
  } catch {
    return hf.mkdirsSync(e);
  }
  t.forEach((n) => {
    n = df.join(e, n), pf.removeSync(n);
  });
}
var i0 = {
  emptyDirSync: Fl,
  emptydirSync: Fl,
  emptyDir: Pl,
  emptydir: Pl
};
const o0 = We.fromCallback, mf = ce, Kt = Ye, gf = Nt;
function s0(e, t) {
  function n() {
    Kt.writeFile(e, "", (r) => {
      if (r) return t(r);
      t();
    });
  }
  Kt.stat(e, (r, i) => {
    if (!r && i.isFile()) return t();
    const o = mf.dirname(e);
    Kt.stat(o, (s, a) => {
      if (s)
        return s.code === "ENOENT" ? gf.mkdirs(o, (l) => {
          if (l) return t(l);
          n();
        }) : t(s);
      a.isDirectory() ? n() : Kt.readdir(o, (l) => {
        if (l) return t(l);
      });
    });
  });
}
function a0(e) {
  let t;
  try {
    t = Kt.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const n = mf.dirname(e);
  try {
    Kt.statSync(n).isDirectory() || Kt.readdirSync(n);
  } catch (r) {
    if (r && r.code === "ENOENT") gf.mkdirsSync(n);
    else throw r;
  }
  Kt.writeFileSync(e, "");
}
var l0 = {
  createFile: o0(s0),
  createFileSync: a0
};
const c0 = We.fromCallback, Ef = ce, Zt = Ye, yf = Nt, u0 = $n.pathExists, { areIdentical: wf } = fr;
function f0(e, t, n) {
  function r(i, o) {
    Zt.link(i, o, (s) => {
      if (s) return n(s);
      n(null);
    });
  }
  Zt.lstat(t, (i, o) => {
    Zt.lstat(e, (s, a) => {
      if (s)
        return s.message = s.message.replace("lstat", "ensureLink"), n(s);
      if (o && wf(a, o)) return n(null);
      const l = Ef.dirname(t);
      u0(l, (h, c) => {
        if (h) return n(h);
        if (c) return r(e, t);
        yf.mkdirs(l, (u) => {
          if (u) return n(u);
          r(e, t);
        });
      });
    });
  });
}
function d0(e, t) {
  let n;
  try {
    n = Zt.lstatSync(t);
  } catch {
  }
  try {
    const o = Zt.lstatSync(e);
    if (n && wf(o, n)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const r = Ef.dirname(t);
  return Zt.existsSync(r) || yf.mkdirsSync(r), Zt.linkSync(e, t);
}
var h0 = {
  createLink: c0(f0),
  createLinkSync: d0
};
const Qt = ce, Nr = Ye, p0 = $n.pathExists;
function m0(e, t, n) {
  if (Qt.isAbsolute(e))
    return Nr.lstat(e, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), n(r)) : n(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const r = Qt.dirname(t), i = Qt.join(r, e);
    return p0(i, (o, s) => o ? n(o) : s ? n(null, {
      toCwd: i,
      toDst: e
    }) : Nr.lstat(e, (a) => a ? (a.message = a.message.replace("lstat", "ensureSymlink"), n(a)) : n(null, {
      toCwd: e,
      toDst: Qt.relative(r, e)
    })));
  }
}
function g0(e, t) {
  let n;
  if (Qt.isAbsolute(e)) {
    if (n = Nr.existsSync(e), !n) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const r = Qt.dirname(t), i = Qt.join(r, e);
    if (n = Nr.existsSync(i), n)
      return {
        toCwd: i,
        toDst: e
      };
    if (n = Nr.existsSync(e), !n) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: Qt.relative(r, e)
    };
  }
}
var E0 = {
  symlinkPaths: m0,
  symlinkPathsSync: g0
};
const vf = Ye;
function y0(e, t, n) {
  if (n = typeof t == "function" ? t : n, t = typeof t == "function" ? !1 : t, t) return n(null, t);
  vf.lstat(e, (r, i) => {
    if (r) return n(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", n(null, t);
  });
}
function w0(e, t) {
  let n;
  if (t) return t;
  try {
    n = vf.lstatSync(e);
  } catch {
    return "file";
  }
  return n && n.isDirectory() ? "dir" : "file";
}
var v0 = {
  symlinkType: y0,
  symlinkTypeSync: w0
};
const _0 = We.fromCallback, _f = ce, mt = Rn, Sf = Nt, S0 = Sf.mkdirs, x0 = Sf.mkdirsSync, xf = E0, C0 = xf.symlinkPaths, I0 = xf.symlinkPathsSync, Cf = v0, b0 = Cf.symlinkType, A0 = Cf.symlinkTypeSync, T0 = $n.pathExists, { areIdentical: If } = fr;
function D0(e, t, n, r) {
  r = typeof n == "function" ? n : r, n = typeof n == "function" ? !1 : n, mt.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      mt.stat(e),
      mt.stat(t)
    ]).then(([s, a]) => {
      if (If(s, a)) return r(null);
      Ul(e, t, n, r);
    }) : Ul(e, t, n, r);
  });
}
function Ul(e, t, n, r) {
  C0(e, t, (i, o) => {
    if (i) return r(i);
    e = o.toDst, b0(o.toCwd, n, (s, a) => {
      if (s) return r(s);
      const l = _f.dirname(t);
      T0(l, (h, c) => {
        if (h) return r(h);
        if (c) return mt.symlink(e, t, a, r);
        S0(l, (u) => {
          if (u) return r(u);
          mt.symlink(e, t, a, r);
        });
      });
    });
  });
}
function N0(e, t, n) {
  let r;
  try {
    r = mt.lstatSync(t);
  } catch {
  }
  if (r && r.isSymbolicLink()) {
    const a = mt.statSync(e), l = mt.statSync(t);
    if (If(a, l)) return;
  }
  const i = I0(e, t);
  e = i.toDst, n = A0(i.toCwd, n);
  const o = _f.dirname(t);
  return mt.existsSync(o) || x0(o), mt.symlinkSync(e, t, n);
}
var O0 = {
  createSymlink: _0(D0),
  createSymlinkSync: N0
};
const { createFile: Ml, createFileSync: kl } = l0, { createLink: Bl, createLinkSync: jl } = h0, { createSymlink: Hl, createSymlinkSync: Gl } = O0;
var R0 = {
  // file
  createFile: Ml,
  createFileSync: kl,
  ensureFile: Ml,
  ensureFileSync: kl,
  // link
  createLink: Bl,
  createLinkSync: jl,
  ensureLink: Bl,
  ensureLinkSync: jl,
  // symlink
  createSymlink: Hl,
  createSymlinkSync: Gl,
  ensureSymlink: Hl,
  ensureSymlinkSync: Gl
};
function $0(e, { EOL: t = `
`, finalEOL: n = !0, replacer: r = null, spaces: i } = {}) {
  const o = n ? t : "", s = JSON.stringify(e, r, i);
  if (s === void 0)
    throw new TypeError(`Converting ${typeof e} value to JSON is not supported`);
  return s.replace(/\n/g, t) + o;
}
function L0(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var ya = { stringify: $0, stripBom: L0 };
let sr;
try {
  sr = Ye;
} catch {
  sr = lt;
}
const mo = We, { stringify: bf, stripBom: Af } = ya;
async function P0(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || sr, r = "throws" in t ? t.throws : !0;
  let i = await mo.fromCallback(n.readFile)(e, t);
  i = Af(i);
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
const F0 = mo.fromPromise(P0);
function U0(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || sr, r = "throws" in t ? t.throws : !0;
  try {
    let i = n.readFileSync(e, t);
    return i = Af(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (r)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function M0(e, t, n = {}) {
  const r = n.fs || sr, i = bf(t, n);
  await mo.fromCallback(r.writeFile)(e, i, n);
}
const k0 = mo.fromPromise(M0);
function B0(e, t, n = {}) {
  const r = n.fs || sr, i = bf(t, n);
  return r.writeFileSync(e, i, n);
}
var j0 = {
  readFile: F0,
  readFileSync: U0,
  writeFile: k0,
  writeFileSync: B0
};
const Ii = j0;
var H0 = {
  // jsonfile exports
  readJson: Ii.readFile,
  readJsonSync: Ii.readFileSync,
  writeJson: Ii.writeFile,
  writeJsonSync: Ii.writeFileSync
};
const G0 = We.fromCallback, Or = Ye, Tf = ce, Df = Nt, z0 = $n.pathExists;
function q0(e, t, n, r) {
  typeof n == "function" && (r = n, n = "utf8");
  const i = Tf.dirname(e);
  z0(i, (o, s) => {
    if (o) return r(o);
    if (s) return Or.writeFile(e, t, n, r);
    Df.mkdirs(i, (a) => {
      if (a) return r(a);
      Or.writeFile(e, t, n, r);
    });
  });
}
function V0(e, ...t) {
  const n = Tf.dirname(e);
  if (Or.existsSync(n))
    return Or.writeFileSync(e, ...t);
  Df.mkdirsSync(n), Or.writeFileSync(e, ...t);
}
var wa = {
  outputFile: G0(q0),
  outputFileSync: V0
};
const { stringify: W0 } = ya, { outputFile: Y0 } = wa;
async function X0(e, t, n = {}) {
  const r = W0(t, n);
  await Y0(e, r, n);
}
var J0 = X0;
const { stringify: Z0 } = ya, { outputFileSync: K0 } = wa;
function Q0(e, t, n) {
  const r = Z0(t, n);
  K0(e, r, n);
}
var eg = Q0;
const tg = We.fromPromise, Ve = H0;
Ve.outputJson = tg(J0);
Ve.outputJsonSync = eg;
Ve.outputJSON = Ve.outputJson;
Ve.outputJSONSync = Ve.outputJsonSync;
Ve.writeJSON = Ve.writeJson;
Ve.writeJSONSync = Ve.writeJsonSync;
Ve.readJSON = Ve.readJson;
Ve.readJSONSync = Ve.readJsonSync;
var ng = Ve;
const rg = Ye, Hs = ce, ig = ga.copy, Nf = po.remove, og = Nt.mkdirp, sg = $n.pathExists, zl = fr;
function ag(e, t, n, r) {
  typeof n == "function" && (r = n, n = {}), n = n || {};
  const i = n.overwrite || n.clobber || !1;
  zl.checkPaths(e, t, "move", n, (o, s) => {
    if (o) return r(o);
    const { srcStat: a, isChangingCase: l = !1 } = s;
    zl.checkParentPaths(e, a, t, "move", (h) => {
      if (h) return r(h);
      if (lg(t)) return ql(e, t, i, l, r);
      og(Hs.dirname(t), (c) => c ? r(c) : ql(e, t, i, l, r));
    });
  });
}
function lg(e) {
  const t = Hs.dirname(e);
  return Hs.parse(t).root === t;
}
function ql(e, t, n, r, i) {
  if (r) return is(e, t, n, i);
  if (n)
    return Nf(t, (o) => o ? i(o) : is(e, t, n, i));
  sg(t, (o, s) => o ? i(o) : s ? i(new Error("dest already exists.")) : is(e, t, n, i));
}
function is(e, t, n, r) {
  rg.rename(e, t, (i) => i ? i.code !== "EXDEV" ? r(i) : cg(e, t, n, r) : r());
}
function cg(e, t, n, r) {
  ig(e, t, {
    overwrite: n,
    errorOnExist: !0
  }, (o) => o ? r(o) : Nf(e, r));
}
var ug = ag;
const Of = Ye, Gs = ce, fg = ga.copySync, Rf = po.removeSync, dg = Nt.mkdirpSync, Vl = fr;
function hg(e, t, n) {
  n = n || {};
  const r = n.overwrite || n.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = Vl.checkPathsSync(e, t, "move", n);
  return Vl.checkParentPathsSync(e, i, t, "move"), pg(t) || dg(Gs.dirname(t)), mg(e, t, r, o);
}
function pg(e) {
  const t = Gs.dirname(e);
  return Gs.parse(t).root === t;
}
function mg(e, t, n, r) {
  if (r) return os(e, t, n);
  if (n)
    return Rf(t), os(e, t, n);
  if (Of.existsSync(t)) throw new Error("dest already exists.");
  return os(e, t, n);
}
function os(e, t, n) {
  try {
    Of.renameSync(e, t);
  } catch (r) {
    if (r.code !== "EXDEV") throw r;
    return gg(e, t, n);
  }
}
function gg(e, t, n) {
  return fg(e, t, {
    overwrite: n,
    errorOnExist: !0
  }), Rf(e);
}
var Eg = hg;
const yg = We.fromCallback;
var wg = {
  move: yg(ug),
  moveSync: Eg
}, cn = {
  // Export promiseified graceful-fs:
  ...Rn,
  // Export extra methods:
  ...ga,
  ...i0,
  ...R0,
  ...ng,
  ...Nt,
  ...wg,
  ...wa,
  ...$n,
  ...po
}, Ln = {}, nn = {}, De = {}, rn = {};
Object.defineProperty(rn, "__esModule", { value: !0 });
rn.CancellationError = rn.CancellationToken = void 0;
const vg = co;
class _g extends vg.EventEmitter {
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
      return Promise.reject(new zs());
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
          o(new zs());
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
rn.CancellationToken = _g;
class zs extends Error {
  constructor() {
    super("cancelled");
  }
}
rn.CancellationError = zs;
var dr = {};
Object.defineProperty(dr, "__esModule", { value: !0 });
dr.newError = Sg;
function Sg(e, t) {
  const n = new Error(e);
  return n.code = t, n;
}
var Te = {}, qs = { exports: {} }, bi = { exports: {} }, ss, Wl;
function xg() {
  if (Wl) return ss;
  Wl = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, i = r * 7, o = r * 365.25;
  ss = function(c, u) {
    u = u || {};
    var p = typeof c;
    if (p === "string" && c.length > 0)
      return s(c);
    if (p === "number" && isFinite(c))
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
        var p = parseFloat(u[1]), w = (u[2] || "ms").toLowerCase();
        switch (w) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return p * o;
          case "weeks":
          case "week":
          case "w":
            return p * i;
          case "days":
          case "day":
          case "d":
            return p * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return p * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return p * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return p * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return p;
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
    return u >= r ? h(c, u, r, "day") : u >= n ? h(c, u, n, "hour") : u >= t ? h(c, u, t, "minute") : u >= e ? h(c, u, e, "second") : c + " ms";
  }
  function h(c, u, p, w) {
    var m = u >= p * 1.5;
    return Math.round(c / p) + " " + w + (m ? "s" : "");
  }
  return ss;
}
var as, Yl;
function $f() {
  if (Yl) return as;
  Yl = 1;
  function e(t) {
    r.debug = r, r.default = r, r.coerce = h, r.disable = a, r.enable = o, r.enabled = l, r.humanize = xg(), r.destroy = c, Object.keys(t).forEach((u) => {
      r[u] = t[u];
    }), r.names = [], r.skips = [], r.formatters = {};
    function n(u) {
      let p = 0;
      for (let w = 0; w < u.length; w++)
        p = (p << 5) - p + u.charCodeAt(w), p |= 0;
      return r.colors[Math.abs(p) % r.colors.length];
    }
    r.selectColor = n;
    function r(u) {
      let p, w = null, m, f;
      function g(...v) {
        if (!g.enabled)
          return;
        const y = g, S = Number(/* @__PURE__ */ new Date()), C = S - (p || S);
        y.diff = C, y.prev = p, y.curr = S, p = S, v[0] = r.coerce(v[0]), typeof v[0] != "string" && v.unshift("%O");
        let N = 0;
        v[0] = v[0].replace(/%([a-zA-Z%])/g, (B, k) => {
          if (B === "%%")
            return "%";
          N++;
          const L = r.formatters[k];
          if (typeof L == "function") {
            const x = v[N];
            B = L.call(y, x), v.splice(N, 1), N--;
          }
          return B;
        }), r.formatArgs.call(y, v), (y.log || r.log).apply(y, v);
      }
      return g.namespace = u, g.useColors = r.useColors(), g.color = r.selectColor(u), g.extend = i, g.destroy = r.destroy, Object.defineProperty(g, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => w !== null ? w : (m !== r.namespaces && (m = r.namespaces, f = r.enabled(u)), f),
        set: (v) => {
          w = v;
        }
      }), typeof r.init == "function" && r.init(g), g;
    }
    function i(u, p) {
      const w = r(this.namespace + (typeof p > "u" ? ":" : p) + u);
      return w.log = this.log, w;
    }
    function o(u) {
      r.save(u), r.namespaces = u, r.names = [], r.skips = [];
      const p = (typeof u == "string" ? u : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const w of p)
        w[0] === "-" ? r.skips.push(w.slice(1)) : r.names.push(w);
    }
    function s(u, p) {
      let w = 0, m = 0, f = -1, g = 0;
      for (; w < u.length; )
        if (m < p.length && (p[m] === u[w] || p[m] === "*"))
          p[m] === "*" ? (f = m, g = w, m++) : (w++, m++);
        else if (f !== -1)
          m = f + 1, g++, w = g;
        else
          return !1;
      for (; m < p.length && p[m] === "*"; )
        m++;
      return m === p.length;
    }
    function a() {
      const u = [
        ...r.names,
        ...r.skips.map((p) => "-" + p)
      ].join(",");
      return r.enable(""), u;
    }
    function l(u) {
      for (const p of r.skips)
        if (s(u, p))
          return !1;
      for (const p of r.names)
        if (s(u, p))
          return !0;
      return !1;
    }
    function h(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function c() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  return as = e, as;
}
var Xl;
function Cg() {
  return Xl || (Xl = 1, function(e, t) {
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
      const h = "color: " + this.color;
      l.splice(1, 0, h, "color: inherit");
      let c = 0, u = 0;
      l[0].replace(/%[a-zA-Z%]/g, (p) => {
        p !== "%%" && (c++, p === "%c" && (u = c));
      }), l.splice(u, 0, h);
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
    e.exports = $f()(t);
    const { formatters: a } = e.exports;
    a.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (h) {
        return "[UnexpectedJSONParseError]: " + h.message;
      }
    };
  }(bi, bi.exports)), bi.exports;
}
var Ai = { exports: {} }, ls, Jl;
function Ig() {
  return Jl || (Jl = 1, ls = (e, t = process.argv) => {
    const n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", r = t.indexOf(n + e), i = t.indexOf("--");
    return r !== -1 && (i === -1 || r < i);
  }), ls;
}
var cs, Zl;
function bg() {
  if (Zl) return cs;
  Zl = 1;
  const e = uo, t = ju, n = Ig(), { env: r } = process;
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
  function s(l, h) {
    if (i === 0)
      return 0;
    if (n("color=16m") || n("color=full") || n("color=truecolor"))
      return 3;
    if (n("color=256"))
      return 2;
    if (l && !h && i === void 0)
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
    const h = s(l, l && l.isTTY);
    return o(h);
  }
  return cs = {
    supportsColor: a,
    stdout: o(s(!0, t.isatty(1))),
    stderr: o(s(!0, t.isatty(2)))
  }, cs;
}
var Kl;
function Ag() {
  return Kl || (Kl = 1, function(e, t) {
    const n = ju, r = cr;
    t.init = c, t.log = a, t.formatArgs = o, t.save = l, t.load = h, t.useColors = i, t.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const p = bg();
      p && (p.stderr || p).level >= 2 && (t.colors = [
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
    t.inspectOpts = Object.keys(process.env).filter((p) => /^debug_/i.test(p)).reduce((p, w) => {
      const m = w.substring(6).toLowerCase().replace(/_([a-z])/g, (g, v) => v.toUpperCase());
      let f = process.env[w];
      return /^(yes|on|true|enabled)$/i.test(f) ? f = !0 : /^(no|off|false|disabled)$/i.test(f) ? f = !1 : f === "null" ? f = null : f = Number(f), p[m] = f, p;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function o(p) {
      const { namespace: w, useColors: m } = this;
      if (m) {
        const f = this.color, g = "\x1B[3" + (f < 8 ? f : "8;5;" + f), v = `  ${g};1m${w} \x1B[0m`;
        p[0] = v + p[0].split(`
`).join(`
` + v), p.push(g + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        p[0] = s() + w + " " + p[0];
    }
    function s() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function a(...p) {
      return process.stderr.write(r.formatWithOptions(t.inspectOpts, ...p) + `
`);
    }
    function l(p) {
      p ? process.env.DEBUG = p : delete process.env.DEBUG;
    }
    function h() {
      return process.env.DEBUG;
    }
    function c(p) {
      p.inspectOpts = {};
      const w = Object.keys(t.inspectOpts);
      for (let m = 0; m < w.length; m++)
        p.inspectOpts[w[m]] = t.inspectOpts[w[m]];
    }
    e.exports = $f()(t);
    const { formatters: u } = e.exports;
    u.o = function(p) {
      return this.inspectOpts.colors = this.useColors, r.inspect(p, this.inspectOpts).split(`
`).map((w) => w.trim()).join(" ");
    }, u.O = function(p) {
      return this.inspectOpts.colors = this.useColors, r.inspect(p, this.inspectOpts);
    };
  }(Ai, Ai.exports)), Ai.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? qs.exports = Cg() : qs.exports = Ag();
var Lf = qs.exports, Qr = {};
Object.defineProperty(Qr, "__esModule", { value: !0 });
Qr.ProgressCallbackTransform = void 0;
const Tg = Et;
class Dg extends Tg.Transform {
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
Qr.ProgressCallbackTransform = Dg;
Object.defineProperty(Te, "__esModule", { value: !0 });
Te.DigestTransform = Te.HttpExecutor = Te.HttpError = void 0;
Te.addSensitiveRedirectHeader = Fg;
Te.addSensitiveFieldPattern = Ug;
Te.createHttpError = Ws;
Te.parseJson = kg;
Te.configureRequestOptionsFromUrl = kf;
Te.configureRequestUrl = Sa;
Te.safeGetHeader = nr;
Te.configureRequestOptions = Qi;
Te.isSensitiveFieldName = Bf;
Te.hashSensitiveValue = jf;
Te.safeStringifyJson = Yn;
const Pf = ur, Ng = Lf, Og = lt, Rg = Et, Vs = ln, $g = rn, Ql = dr, Lg = Qr, Wt = (0, Ng.default)("electron-builder"), va = (e) => e.toLowerCase().replace(/[-_]/g, ""), Ff = /* @__PURE__ */ new Set(["authorization", "proxyauthorization", "privatetoken", "xapikey", "xauthtoken", "xaccesstoken", "xgitlabtoken", "cookie", "xcsrftoken"]), Uf = ["token", "password", "secret", "authorization", "credential", "apikey", "passphrase", "auth"], Pg = ["key"];
function Fg(e) {
  Ff.add(va(e));
}
function Ug(e) {
  Uf.push(e.toLowerCase().replace(/[-_]/g, ""));
}
function Ws(e, t = null) {
  return new _a(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + Yn(e.headers), t);
}
const Mg = /* @__PURE__ */ new Map([
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
class _a extends Error {
  constructor(t, n = `HTTP error: ${Mg.get(t) || t}`, r = null) {
    super(n), this.statusCode = t, this.description = r, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
Te.HttpError = _a;
function kg(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class Wn {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, n = new $g.CancellationToken(), r) {
    Qi(t);
    const i = r == null ? void 0 : JSON.stringify(r), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      Wt.enabled && Wt(Yn(r));
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
    if (Wt.enabled) {
      const { headers: o, auth: s, ...a } = t;
      Wt(`Request: ${Yn(a)}`);
    }
    return n.createPromise((o, s, a) => {
      const l = this.createRequest(t, (h) => {
        try {
          this.handleResponse(h, t, n, o, s, i, r);
        } catch (c) {
          s(c);
        }
      });
      this.addErrorAndTimeoutHandlers(l, s, t.timeout), this.addRedirectHandlers(l, t, s, i, (h) => {
        this.doApiRequest(h, n, r, i).then(o).catch(s);
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
    if (Wt.enabled) {
      const { headers: w, auth: m, ...f } = n;
      Wt(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${Yn(f)}`);
    }
    if (t.statusCode === 404) {
      o(Ws(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const h = (l = t.statusCode) !== null && l !== void 0 ? l : 0, c = h >= 300 && h < 400, u = nr(t, "location");
    if (c && u != null) {
      if (s > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(Wn.prepareRedirectUrlOptions(u, n), r, a, s).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let p = "";
    t.on("error", o), t.on("data", (w) => p += w), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const w = nr(t, "content-type"), m = w != null && (Array.isArray(w) ? w.find((f) => f.includes("json")) != null : w.includes("json"));
          o(Ws(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

          Data:
          ${m ? Yn(JSON.parse(p)) : p}
          `));
        } else
          i(p.length === 0 ? null : p);
      } catch (w) {
        o(w);
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
      Sa(t, a), Qi(a), this.doDownload(a, {
        destination: null,
        options: n,
        onCancel: o,
        callback: (l) => {
          l == null ? r(Buffer.concat(s)) : i(l);
        },
        responseHandler: (l, h) => {
          let c = 0;
          l.on("data", (u) => {
            if (c += u.length, c > 524288e3) {
              h(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            s.push(u);
          }), l.on("end", () => {
            h(null);
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
      const s = nr(o, "location");
      if (s != null) {
        r < this.maxRedirects ? this.doDownload(Wn.prepareRedirectUrlOptions(s, t), n, r++) : n.callback(this.createMaxRedirectError());
        return;
      }
      n.responseHandler == null ? jg(n, o) : n.responseHandler(o, n.callback);
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
    const r = kf(t, { ...n }), i = r.headers;
    if (i == null)
      return r;
    const o = Wn.reconstructOriginalUrl(n), s = Mf(t, n);
    if (Wn.isCrossOriginRedirect(o, s)) {
      Wt.enabled && Wt(`Cross-origin redirect (${o.host} → ${s.host}): stripping sensitive headers`);
      for (const a of Object.keys(i))
        Ff.has(va(a)) && delete i[a];
    }
    return r;
  }
  static reconstructOriginalUrl(t) {
    const n = t.protocol || "https:";
    if (!t.hostname)
      throw new Error("Missing hostname in request options");
    const r = t.hostname, i = t.port ? `:${t.port}` : "", o = t.path || "/";
    return new Vs.URL(`${n}//${r}${i}${o}`);
  }
  static isCrossOriginRedirect(t, n) {
    if (t.hostname.toLowerCase() !== n.hostname.toLowerCase())
      return !0;
    if (t.protocol === "http:" && // This can be replaced with `!originalUrl.port`, but for the sake of clarity.
    ["80", ""].includes(t.port) && n.protocol === "https:" && // This can be replaced with `!redirectUrl.port`, but for the sake of clarity.
    ["443", ""].includes(n.port))
      return !1;
    if (t.protocol !== n.protocol)
      return !0;
    const r = t.port, i = n.port;
    return r !== i;
  }
  static async retryOnServerError(t, n = 3) {
    for (let r = 0; ; r++)
      try {
        return await t();
      } catch (i) {
        if (r < n && (i instanceof _a && i.isServerError() || i.code === "EPIPE")) {
          await new Promise((o) => setTimeout(o, 1e3 * (r + 1)));
          continue;
        }
        throw i;
      }
  }
}
Te.HttpExecutor = Wn;
function Mf(e, t) {
  try {
    return new Vs.URL(e);
  } catch {
    const n = t.hostname, r = t.protocol || "https:", i = t.port ? `:${t.port}` : "", o = `${r}//${n}${i}`;
    return new Vs.URL(e, o);
  }
}
function kf(e, t) {
  const n = Qi(t), r = Mf(e, t);
  return Sa(r, n), n;
}
function Sa(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Ys extends Rg.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, n = "sha512", r = "base64") {
    super(), this.expected = t, this.algorithm = n, this.encoding = r, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, Pf.createHash)(n);
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
      throw (0, Ql.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, Ql.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
Te.DigestTransform = Ys;
function Bg(e, t, n) {
  return e != null && t != null && e !== t ? (n(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function nr(e, t) {
  const n = e.headers[t];
  return n == null ? null : Array.isArray(n) ? n.length === 0 ? null : n[n.length - 1] : n;
}
function jg(e, t) {
  if (!Bg(nr(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const n = [];
  if (e.options.onProgress != null) {
    const s = nr(t, "content-length");
    s != null && n.push(new Lg.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const r = e.options.sha512;
  r != null ? n.push(new Ys(r, "sha512", r.length === 128 && !r.includes("+") && !r.includes("Z") && !r.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && n.push(new Ys(e.options.sha2, "sha256", "hex"));
  const i = (0, Og.createWriteStream)(e.destination);
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
function Qi(e, t, n) {
  n != null && (e.method = n), e.headers = { ...e.headers };
  const r = e.headers;
  return t != null && (r.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), r["User-Agent"] == null && (r["User-Agent"] = "electron-builder"), (n == null || n === "GET" || r["Cache-Control"] == null) && (r["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function Bf(e) {
  const t = va(e);
  return Uf.some((n) => t.includes(n)) || Pg.some((n) => t.endsWith(n));
}
function jf(e) {
  return `${(0, Pf.createHash)("sha256").update(e).digest("hex")} (sha256 hash)`;
}
function Yn(e, t) {
  return JSON.stringify(e, (n, r) => Bf(n) || t != null && t.has(n) ? typeof r == "string" ? jf(r) : "<stripped sensitive data>" : r, 2);
}
var go = {};
Object.defineProperty(go, "__esModule", { value: !0 });
go.MemoLazy = void 0;
class Hg {
  constructor(t, n) {
    this.selector = t, this.creator = n, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && Hf(this.selected, t))
      return this._value;
    this.selected = t;
    const n = this.creator(t);
    return this.value = n, n;
  }
  set value(t) {
    this._value = t;
  }
}
go.MemoLazy = Hg;
function Hf(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((s) => Hf(e[s], t[s]));
  }
  return e === t;
}
var ei = {};
Object.defineProperty(ei, "__esModule", { value: !0 });
ei.githubUrl = Gg;
ei.githubTagPrefix = zg;
ei.getS3LikeProviderBaseUrl = qg;
function Gg(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function zg(e) {
  var t;
  return e.tagNamePrefix ? e.tagNamePrefix : !((t = e.vPrefixedTagName) !== null && t !== void 0) || t ? "v" : "";
}
function qg(e) {
  const t = e.provider;
  if (t === "s3")
    return Vg(e);
  if (t === "spaces")
    return Wg(e);
  throw new Error(`Not supported provider: ${t}`);
}
function Vg(e) {
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
  return Gf(t, e.path);
}
function Gf(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function Wg(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return Gf(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var xa = {};
Object.defineProperty(xa, "__esModule", { value: !0 });
xa.retry = zf;
const Yg = rn;
async function zf(e, t) {
  var n;
  const { retries: r, interval: i, backoff: o = 0, attempt: s = 0, shouldRetry: a, cancellationToken: l = new Yg.CancellationToken() } = t;
  try {
    return await e();
  } catch (h) {
    if (await Promise.resolve((n = a == null ? void 0 : a(h)) !== null && n !== void 0 ? n : !0) && r > 0 && !l.cancelled)
      return await new Promise((c) => setTimeout(c, i + o * s)), await zf(e, { ...t, retries: r - 1, attempt: s + 1 });
    throw h;
  }
}
var Ca = {};
Object.defineProperty(Ca, "__esModule", { value: !0 });
Ca.parseDn = Xg;
function Xg(e) {
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
var ar = {};
Object.defineProperty(ar, "__esModule", { value: !0 });
ar.nil = ar.UUID = void 0;
const qf = ur, Vf = dr, Jg = "options.name must be either a string or a Buffer", ec = (0, qf.randomBytes)(16);
ec[0] = ec[0] | 1;
const zi = {}, oe = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  zi[t] = e, oe[e] = t;
}
class On {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const n = On.check(t);
    if (!n)
      throw new Error("not a UUID");
    this.version = n.version, n.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, n) {
    return Zg(t, "sha1", 80, n);
  }
  toString() {
    return this.ascii == null && (this.ascii = Kg(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, n = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (zi[t[14] + t[15]] & 240) >> 4,
        variant: tc((zi[t[19] + t[20]] & 224) >> 5),
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
        variant: tc((t[n + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, Vf.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const n = Buffer.allocUnsafe(16);
    let r = 0;
    for (let i = 0; i < 16; i++)
      n[i] = zi[t[r++] + t[r++]], (i === 3 || i === 5 || i === 7 || i === 9) && (r += 1);
    return n;
  }
}
ar.UUID = On;
On.OID = On.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function tc(e) {
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
var Rr;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(Rr || (Rr = {}));
function Zg(e, t, n, r, i = Rr.ASCII) {
  const o = (0, qf.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, Vf.newError)(Jg, "ERR_INVALID_UUID_NAME");
  o.update(r), o.update(e);
  const a = o.digest();
  let l;
  switch (i) {
    case Rr.BINARY:
      a[6] = a[6] & 15 | n, a[8] = a[8] & 63 | 128, l = a;
      break;
    case Rr.OBJECT:
      a[6] = a[6] & 15 | n, a[8] = a[8] & 63 | 128, l = new On(a);
      break;
    default:
      l = oe[a[0]] + oe[a[1]] + oe[a[2]] + oe[a[3]] + "-" + oe[a[4]] + oe[a[5]] + "-" + oe[a[6] & 15 | n] + oe[a[7]] + "-" + oe[a[8] & 63 | 128] + oe[a[9]] + "-" + oe[a[10]] + oe[a[11]] + oe[a[12]] + oe[a[13]] + oe[a[14]] + oe[a[15]];
      break;
  }
  return l;
}
function Kg(e) {
  return oe[e[0]] + oe[e[1]] + oe[e[2]] + oe[e[3]] + "-" + oe[e[4]] + oe[e[5]] + "-" + oe[e[6]] + oe[e[7]] + "-" + oe[e[8]] + oe[e[9]] + "-" + oe[e[10]] + oe[e[11]] + oe[e[12]] + oe[e[13]] + oe[e[14]] + oe[e[15]];
}
ar.nil = new On("00000000-0000-0000-0000-000000000000");
var ti = {}, Wf = {};
(function(e) {
  (function(t) {
    t.parser = function(E, d) {
      return new r(E, d);
    }, t.SAXParser = r, t.SAXStream = u, t.createStream = h, t.MAX_BUFFER_LENGTH = 64 * 1024;
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
    function r(E, d) {
      if (!(this instanceof r))
        return new r(E, d);
      var A = this;
      o(A), A.q = A.c = "", A.bufferCheckPosition = t.MAX_BUFFER_LENGTH, A.encoding = null, A.opt = d || {}, A.opt.lowercase = A.opt.lowercase || A.opt.lowercasetags, A.looseCase = A.opt.lowercase ? "toLowerCase" : "toUpperCase", A.opt.maxEntityCount = A.opt.maxEntityCount || 512, A.opt.maxEntityDepth = A.opt.maxEntityDepth || 4, A.entityCount = A.entityDepth = 0, A.tags = [], A.closed = A.closedRoot = A.sawRoot = !1, A.tag = A.error = null, A.strict = !!E, A.noscript = !!(E || A.opt.noscript), A.state = x.BEGIN, A.strictEntities = A.opt.strictEntities, A.ENTITIES = A.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), A.attribList = [], A.opt.xmlns && (A.ns = Object.create(g)), A.opt.unquotedAttributeValues === void 0 && (A.opt.unquotedAttributeValues = !E), A.trackPosition = A.opt.position !== !1, A.trackPosition && (A.position = A.line = A.column = 0), K(A, "onready");
    }
    Object.create || (Object.create = function(E) {
      function d() {
      }
      d.prototype = E;
      var A = new d();
      return A;
    }), Object.keys || (Object.keys = function(E) {
      var d = [];
      for (var A in E) E.hasOwnProperty(A) && d.push(A);
      return d;
    });
    function i(E) {
      for (var d = Math.max(t.MAX_BUFFER_LENGTH, 10), A = 0, I = 0, se = n.length; I < se; I++) {
        var pe = E[n[I]].length;
        if (pe > d)
          switch (n[I]) {
            case "textNode":
              H(E);
              break;
            case "cdata":
              R(E, "oncdata", E.cdata), E.cdata = "";
              break;
            case "script":
              R(E, "onscript", E.script), E.script = "";
              break;
            default:
              G(E, "Max buffer length exceeded: " + n[I]);
          }
        A = Math.max(A, pe);
      }
      var xe = t.MAX_BUFFER_LENGTH - A;
      E.bufferCheckPosition = xe + E.position;
    }
    function o(E) {
      for (var d = 0, A = n.length; d < A; d++)
        E[n[d]] = "";
    }
    function s(E) {
      H(E), E.cdata !== "" && (R(E, "oncdata", E.cdata), E.cdata = ""), E.script !== "" && (R(E, "onscript", E.script), E.script = "");
    }
    r.prototype = {
      end: function() {
        V(this);
      },
      write: dn,
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
    var l = t.EVENTS.filter(function(E) {
      return E !== "error" && E !== "end";
    });
    function h(E, d) {
      return new u(E, d);
    }
    function c(E, d) {
      if (E.length >= 2) {
        if (E[0] === 255 && E[1] === 254)
          return "utf-16le";
        if (E[0] === 254 && E[1] === 255)
          return "utf-16be";
      }
      return E.length >= 3 && E[0] === 239 && E[1] === 187 && E[2] === 191 ? "utf8" : E.length >= 4 ? E[0] === 60 && E[1] === 0 && E[2] === 63 && E[3] === 0 ? "utf-16le" : E[0] === 0 && E[1] === 60 && E[2] === 0 && E[3] === 63 ? "utf-16be" : "utf8" : d ? "utf8" : null;
    }
    function u(E, d) {
      if (!(this instanceof u))
        return new u(E, d);
      a.apply(this), this._parser = new r(E, d), this.writable = !0, this.readable = !0;
      var A = this;
      this._parser.onend = function() {
        A.emit("end");
      }, this._parser.onerror = function(I) {
        A.emit("error", I), A._parser.error = null;
      }, this._decoder = null, this._decoderBuffer = null, l.forEach(function(I) {
        Object.defineProperty(A, "on" + I, {
          get: function() {
            return A._parser["on" + I];
          },
          set: function(se) {
            if (!se)
              return A.removeAllListeners(I), A._parser["on" + I] = se, se;
            A.on(I, se);
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
    }), u.prototype._decodeBuffer = function(E, d) {
      if (this._decoderBuffer && (E = Buffer.concat([this._decoderBuffer, E]), this._decoderBuffer = null), !this._decoder) {
        var A = c(E, d);
        if (!A)
          return this._decoderBuffer = E, "";
        this._parser.encoding = A, this._decoder = new TextDecoder(A);
      }
      return this._decoder.decode(E, { stream: !d });
    }, u.prototype.write = function(E) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(E))
        E = this._decodeBuffer(E, !1);
      else if (this._decoderBuffer) {
        var d = this._decodeBuffer(Buffer.alloc(0), !0);
        d && (this._parser.write(d), this.emit("data", d));
      }
      return this._parser.write(E.toString()), this.emit("data", E), !0;
    }, u.prototype.end = function(E) {
      if (E && E.length && this.write(E), this._decoderBuffer) {
        var d = this._decodeBuffer(Buffer.alloc(0), !0);
        d && (this._parser.write(d), this.emit("data", d));
      } else if (this._decoder) {
        var A = this._decoder.decode();
        A && (this._parser.write(A), this.emit("data", A));
      }
      return this._parser.end(), !0;
    }, u.prototype.on = function(E, d) {
      var A = this;
      return !A._parser["on" + E] && l.indexOf(E) !== -1 && (A._parser["on" + E] = function() {
        var I = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        I.splice(0, 0, E), A.emit.apply(A, I);
      }), a.prototype.on.call(A, E, d);
    };
    var p = /^\[CDATA\[$/i, w = /^DOCTYPE$/i, m = "http://www.w3.org/XML/1998/namespace", f = "http://www.w3.org/2000/xmlns/", g = { xml: m, xmlns: f }, v = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, y = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, S = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, C = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function N(E) {
      return E === " " || E === `
` || E === "\r" || E === "	";
    }
    function D(E) {
      return E === '"' || E === "'";
    }
    function B(E) {
      return E === ">" || N(E);
    }
    function k(E, d) {
      return E.test(d);
    }
    function L(E, d) {
      return !k(E, d);
    }
    var x = 0;
    t.STATE = {
      BEGIN: x++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: x++,
      // leading whitespace
      TEXT: x++,
      // general stuff
      TEXT_ENTITY: x++,
      // &amp and such.
      OPEN_WAKA: x++,
      // <
      SGML_DECL: x++,
      // <!BLARG
      SGML_DECL_QUOTED: x++,
      // <!BLARG foo "bar
      DOCTYPE: x++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: x++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: x++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: x++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: x++,
      // <!-
      COMMENT: x++,
      // <!--
      COMMENT_ENDING: x++,
      // <!-- blah -
      COMMENT_ENDED: x++,
      // <!-- blah --
      CDATA: x++,
      // <![CDATA[ something
      CDATA_ENDING: x++,
      // ]
      CDATA_ENDING_2: x++,
      // ]]
      PROC_INST: x++,
      // <?hi
      PROC_INST_BODY: x++,
      // <?hi there
      PROC_INST_ENDING: x++,
      // <?hi "there" ?
      OPEN_TAG: x++,
      // <strong
      OPEN_TAG_SLASH: x++,
      // <strong /
      ATTRIB: x++,
      // <a
      ATTRIB_NAME: x++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: x++,
      // <a foo _
      ATTRIB_VALUE: x++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: x++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: x++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: x++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: x++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: x++,
      // <foo bar=&quot
      CLOSE_TAG: x++,
      // </a
      CLOSE_TAG_SAW_WHITE: x++,
      // </a   >
      SCRIPT: x++,
      // <script> ...
      SCRIPT_ENDING: x++
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
    }), Object.keys(t.ENTITIES).forEach(function(E) {
      var d = t.ENTITIES[E], A = typeof d == "number" ? String.fromCharCode(d) : d;
      t.ENTITIES[E] = A;
    });
    for (var W in t.STATE)
      t.STATE[t.STATE[W]] = W;
    x = t.STATE;
    function K(E, d, A) {
      E[d] && E[d](A);
    }
    function te(E) {
      var d = E && E.match(/(?:^|\s)encoding\s*=\s*(['"])([^'"]+)\1/i);
      return d ? d[2] : null;
    }
    function F(E) {
      return E ? E.toLowerCase().replace(/[^a-z0-9]/g, "") : null;
    }
    function O(E, d) {
      const A = F(E), I = F(d);
      return !A || !I ? !0 : I === "utf16" ? A === "utf16le" || A === "utf16be" : A === I;
    }
    function M(E, d) {
      if (!(!E.strict || !E.encoding || !d || d.name !== "xml")) {
        var A = te(d.body);
        A && !O(E.encoding, A) && U(
          E,
          "XML declaration encoding " + A + " does not match detected stream encoding " + E.encoding.toUpperCase()
        );
      }
    }
    function R(E, d, A) {
      E.textNode && H(E), K(E, d, A);
    }
    function H(E) {
      E.textNode = T(E.opt, E.textNode), E.textNode && K(E, "ontext", E.textNode), E.textNode = "";
    }
    function T(E, d) {
      return E.trim && (d = d.trim()), E.normalize && (d = d.replace(/\s+/g, " ")), d;
    }
    function G(E, d) {
      return H(E), E.trackPosition && (d += `
Line: ` + E.line + `
Column: ` + E.column + `
Char: ` + E.c), d = new Error(d), E.error = d, K(E, "onerror", d), E;
    }
    function V(E) {
      return E.sawRoot && !E.closedRoot && U(E, "Unclosed root tag"), E.state !== x.BEGIN && E.state !== x.BEGIN_WHITESPACE && E.state !== x.TEXT && G(E, "Unexpected end"), H(E), E.c = "", E.closed = !0, K(E, "onend"), r.call(E, E.strict, E.opt), E;
    }
    function U(E, d) {
      if (typeof E != "object" || !(E instanceof r))
        throw new Error("bad call to strictFail");
      E.strict && G(E, d);
    }
    function Q(E) {
      E.strict || (E.tagName = E.tagName[E.looseCase]());
      var d = E.tags[E.tags.length - 1] || E, A = E.tag = { name: E.tagName, attributes: {} };
      E.opt.xmlns && (A.ns = d.ns), E.attribList.length = 0, R(E, "onopentagstart", A);
    }
    function re(E, d) {
      var A = E.indexOf(":"), I = A < 0 ? ["", E] : E.split(":"), se = I[0], pe = I[1];
      return d && E === "xmlns" && (se = "xmlns", pe = ""), { prefix: se, local: pe };
    }
    function q(E) {
      if (E.strict || (E.attribName = E.attribName[E.looseCase]()), E.attribList.indexOf(E.attribName) !== -1 || E.tag.attributes.hasOwnProperty(E.attribName)) {
        E.attribName = E.attribValue = "";
        return;
      }
      if (E.opt.xmlns) {
        var d = re(E.attribName, !0), A = d.prefix, I = d.local;
        if (A === "xmlns")
          if (I === "xml" && E.attribValue !== m)
            U(
              E,
              "xml: prefix must be bound to " + m + `
Actual: ` + E.attribValue
            );
          else if (I === "xmlns" && E.attribValue !== f)
            U(
              E,
              "xmlns: prefix must be bound to " + f + `
Actual: ` + E.attribValue
            );
          else {
            var se = E.tag, pe = E.tags[E.tags.length - 1] || E;
            se.ns === pe.ns && (se.ns = Object.create(pe.ns)), se.ns[I] = E.attribValue;
          }
        E.attribList.push([E.attribName, E.attribValue]);
      } else
        E.tag.attributes[E.attribName] = E.attribValue, R(E, "onattribute", {
          name: E.attribName,
          value: E.attribValue
        });
      E.attribName = E.attribValue = "";
    }
    function ie(E, d) {
      if (E.opt.xmlns) {
        var A = E.tag, I = re(E.tagName);
        A.prefix = I.prefix, A.local = I.local, A.uri = A.ns[I.prefix] || "", A.prefix && !A.uri && (U(
          E,
          "Unbound namespace prefix: " + JSON.stringify(E.tagName)
        ), A.uri = I.prefix);
        var se = E.tags[E.tags.length - 1] || E;
        A.ns && se.ns !== A.ns && Object.keys(A.ns).forEach(function(Un) {
          R(E, "onopennamespace", {
            prefix: Un,
            uri: A.ns[Un]
          });
        });
        for (var pe = 0, xe = E.attribList.length; pe < xe; pe++) {
          var Ue = E.attribList[pe], Me = Ue[0], ut = Ue[1], Ae = re(Me, !0), ft = Ae.prefix, Xo = Ae.local, mi = ft === "" ? "" : A.ns[ft] || "", Ht = {
            name: Me,
            value: ut,
            prefix: ft,
            local: Xo,
            uri: mi
          };
          ft && ft !== "xmlns" && !mi && (U(
            E,
            "Unbound namespace prefix: " + JSON.stringify(ft)
          ), Ht.uri = ft), E.tag.attributes[Me] = Ht, R(E, "onattribute", Ht);
        }
        E.attribList.length = 0;
      }
      E.tag.isSelfClosing = !!d, E.sawRoot = !0, E.tags.push(E.tag), R(E, "onopentag", E.tag), d || (!E.noscript && E.tagName.toLowerCase() === "script" ? E.state = x.SCRIPT : E.state = x.TEXT, E.tag = null, E.tagName = ""), E.attribName = E.attribValue = "", E.attribList.length = 0;
    }
    function Se(E) {
      if (!E.tagName) {
        U(E, "Weird empty close tag."), E.textNode += "</>", E.state = x.TEXT;
        return;
      }
      if (E.script) {
        if (E.tagName !== "script") {
          E.script += "</" + E.tagName + ">", E.tagName = "", E.state = x.SCRIPT;
          return;
        }
        R(E, "onscript", E.script), E.script = "";
      }
      var d = E.tags.length, A = E.tagName;
      E.strict || (A = A[E.looseCase]());
      for (var I = A; d--; ) {
        var se = E.tags[d];
        if (se.name !== I)
          U(E, "Unexpected close tag");
        else
          break;
      }
      if (d < 0) {
        U(E, "Unmatched closing tag: " + E.tagName), E.textNode += "</" + E.tagName + ">", E.state = x.TEXT;
        return;
      }
      E.tagName = A;
      for (var pe = E.tags.length; pe-- > d; ) {
        var xe = E.tag = E.tags.pop();
        E.tagName = E.tag.name, R(E, "onclosetag", E.tagName);
        var Ue = {};
        for (var Me in xe.ns)
          Ue[Me] = xe.ns[Me];
        var ut = E.tags[E.tags.length - 1] || E;
        E.opt.xmlns && xe.ns !== ut.ns && Object.keys(xe.ns).forEach(function(Ae) {
          var ft = xe.ns[Ae];
          R(E, "onclosenamespace", { prefix: Ae, uri: ft });
        });
      }
      d === 0 && (E.closedRoot = !0), E.tagName = E.attribValue = E.attribName = "", E.attribList.length = 0, E.state = x.TEXT;
    }
    function le(E) {
      var d = E.entity, A = d.toLowerCase(), I, se = "";
      return E.ENTITIES[d] ? E.ENTITIES[d] : E.ENTITIES[A] ? E.ENTITIES[A] : (d = A, d.charAt(0) === "#" && (d.charAt(1) === "x" ? (d = d.slice(2), I = parseInt(d, 16), se = I.toString(16)) : (d = d.slice(1), I = parseInt(d, 10), se = I.toString(10))), d = d.replace(/^0+/, ""), isNaN(I) || se.toLowerCase() !== d || I < 0 || I > 1114111 || !ct(I) ? (U(E, "Invalid character entity"), "&" + E.entity + ";") : String.fromCodePoint(I));
    }
    function ct(E) {
      return E === 9 || E === 10 || E === 13 || E >= 32 && E <= 55295 || E >= 57344 && E <= 65533 || E >= 65536 && E <= 1114111;
    }
    function Rt(E, d) {
      d === "<" ? (E.state = x.OPEN_WAKA, E.startTagPosition = E.position) : N(d) || (U(E, "Non-whitespace before first tag."), E.textNode = d, E.state = x.TEXT);
    }
    function Qe(E, d) {
      var A = "";
      return d < E.length && (A = E.charAt(d)), A;
    }
    function dn(E) {
      var d = this;
      if (this.error)
        throw this.error;
      if (d.closed)
        return G(
          d,
          "Cannot write after close. Assign an onready handler."
        );
      if (E === null)
        return V(d);
      typeof E == "object" && (E = E.toString());
      for (var A = 0, I = ""; I = Qe(E, A++), d.c = I, !!I; )
        switch (d.trackPosition && (d.position++, I === `
` ? (d.line++, d.column = 0) : d.column++), d.state) {
          case x.BEGIN:
            if (d.state = x.BEGIN_WHITESPACE, I === "\uFEFF")
              continue;
            Rt(d, I);
            continue;
          case x.BEGIN_WHITESPACE:
            Rt(d, I);
            continue;
          case x.TEXT:
            if (d.sawRoot && !d.closedRoot) {
              for (var pe = A - 1; I && I !== "<" && I !== "&"; )
                I = Qe(E, A++), I && d.trackPosition && (d.position++, I === `
` ? (d.line++, d.column = 0) : d.column++);
              d.textNode += E.substring(pe, A - 1);
            }
            I === "<" && !(d.sawRoot && d.closedRoot && !d.strict) ? (d.state = x.OPEN_WAKA, d.startTagPosition = d.position) : (!N(I) && (!d.sawRoot || d.closedRoot) && U(d, "Text data outside of root node."), I === "&" ? d.state = x.TEXT_ENTITY : d.textNode += I);
            continue;
          case x.SCRIPT:
            I === "<" ? d.state = x.SCRIPT_ENDING : d.script += I;
            continue;
          case x.SCRIPT_ENDING:
            I === "/" ? d.state = x.CLOSE_TAG : (d.script += "<" + I, d.state = x.SCRIPT);
            continue;
          case x.OPEN_WAKA:
            if (I === "!")
              d.state = x.SGML_DECL, d.sgmlDecl = "";
            else if (!N(I)) if (k(v, I))
              d.state = x.OPEN_TAG, d.tagName = I;
            else if (I === "/")
              d.state = x.CLOSE_TAG, d.tagName = "";
            else if (I === "?")
              d.state = x.PROC_INST, d.procInstName = d.procInstBody = "";
            else {
              if (U(d, "Unencoded <"), d.startTagPosition + 1 < d.position) {
                var se = d.position - d.startTagPosition;
                I = new Array(se).join(" ") + I;
              }
              d.textNode += "<" + I, d.state = x.TEXT;
            }
            continue;
          case x.SGML_DECL:
            if (d.sgmlDecl + I === "--") {
              d.state = x.COMMENT, d.comment = "", d.sgmlDecl = "";
              continue;
            }
            d.doctype && d.doctype !== !0 && d.sgmlDecl ? (d.state = x.DOCTYPE_DTD, d.doctype += "<!" + d.sgmlDecl + I, d.sgmlDecl = "") : p.test(d.sgmlDecl + I) ? (R(d, "onopencdata"), d.state = x.CDATA, d.sgmlDecl = "", d.cdata = "") : w.test(d.sgmlDecl + I) ? (d.state = x.DOCTYPE, (d.doctype || d.sawRoot) && U(
              d,
              "Inappropriately located doctype declaration"
            ), d.doctype = "", d.sgmlDecl = "") : I === ">" ? (R(d, "onsgmldeclaration", d.sgmlDecl), d.sgmlDecl = "", d.state = x.TEXT) : (D(I) && (d.state = x.SGML_DECL_QUOTED), d.sgmlDecl += I);
            continue;
          case x.SGML_DECL_QUOTED:
            I === d.q && (d.state = x.SGML_DECL, d.q = ""), d.sgmlDecl += I;
            continue;
          case x.DOCTYPE:
            I === ">" ? (d.state = x.TEXT, R(d, "ondoctype", d.doctype), d.doctype = !0) : (d.doctype += I, I === "[" ? d.state = x.DOCTYPE_DTD : D(I) && (d.state = x.DOCTYPE_QUOTED, d.q = I));
            continue;
          case x.DOCTYPE_QUOTED:
            d.doctype += I, I === d.q && (d.q = "", d.state = x.DOCTYPE);
            continue;
          case x.DOCTYPE_DTD:
            I === "]" ? (d.doctype += I, d.state = x.DOCTYPE) : I === "<" ? (d.state = x.OPEN_WAKA, d.startTagPosition = d.position) : D(I) ? (d.doctype += I, d.state = x.DOCTYPE_DTD_QUOTED, d.q = I) : d.doctype += I;
            continue;
          case x.DOCTYPE_DTD_QUOTED:
            d.doctype += I, I === d.q && (d.state = x.DOCTYPE_DTD, d.q = "");
            continue;
          case x.COMMENT:
            I === "-" ? d.state = x.COMMENT_ENDING : d.comment += I;
            continue;
          case x.COMMENT_ENDING:
            I === "-" ? (d.state = x.COMMENT_ENDED, d.comment = T(d.opt, d.comment), d.comment && R(d, "oncomment", d.comment), d.comment = "") : (d.comment += "-" + I, d.state = x.COMMENT);
            continue;
          case x.COMMENT_ENDED:
            I !== ">" ? (U(d, "Malformed comment"), d.comment += "--" + I, d.state = x.COMMENT) : d.doctype && d.doctype !== !0 ? d.state = x.DOCTYPE_DTD : d.state = x.TEXT;
            continue;
          case x.CDATA:
            for (var pe = A - 1; I && I !== "]"; )
              I = Qe(E, A++), I && d.trackPosition && (d.position++, I === `
` ? (d.line++, d.column = 0) : d.column++);
            d.cdata += E.substring(pe, A - 1), I === "]" && (d.state = x.CDATA_ENDING);
            continue;
          case x.CDATA_ENDING:
            I === "]" ? d.state = x.CDATA_ENDING_2 : (d.cdata += "]" + I, d.state = x.CDATA);
            continue;
          case x.CDATA_ENDING_2:
            I === ">" ? (d.cdata && R(d, "oncdata", d.cdata), R(d, "onclosecdata"), d.cdata = "", d.state = x.TEXT) : I === "]" ? d.cdata += "]" : (d.cdata += "]]" + I, d.state = x.CDATA);
            continue;
          case x.PROC_INST:
            I === "?" ? d.state = x.PROC_INST_ENDING : N(I) ? d.state = x.PROC_INST_BODY : d.procInstName += I;
            continue;
          case x.PROC_INST_BODY:
            if (!d.procInstBody && N(I))
              continue;
            I === "?" ? d.state = x.PROC_INST_ENDING : d.procInstBody += I;
            continue;
          case x.PROC_INST_ENDING:
            if (I === ">") {
              const ut = {
                name: d.procInstName,
                body: d.procInstBody
              };
              M(d, ut), R(d, "onprocessinginstruction", ut), d.procInstName = d.procInstBody = "", d.state = x.TEXT;
            } else
              d.procInstBody += "?" + I, d.state = x.PROC_INST_BODY;
            continue;
          case x.OPEN_TAG:
            k(y, I) ? d.tagName += I : (Q(d), I === ">" ? ie(d) : I === "/" ? d.state = x.OPEN_TAG_SLASH : (N(I) || U(d, "Invalid character in tag name"), d.state = x.ATTRIB));
            continue;
          case x.OPEN_TAG_SLASH:
            I === ">" ? (ie(d, !0), Se(d)) : (U(
              d,
              "Forward-slash in opening tag not followed by >"
            ), d.state = x.ATTRIB);
            continue;
          case x.ATTRIB:
            if (N(I))
              continue;
            I === ">" ? ie(d) : I === "/" ? d.state = x.OPEN_TAG_SLASH : k(v, I) ? (d.attribName = I, d.attribValue = "", d.state = x.ATTRIB_NAME) : U(d, "Invalid attribute name");
            continue;
          case x.ATTRIB_NAME:
            I === "=" ? d.state = x.ATTRIB_VALUE : I === ">" ? (U(d, "Attribute without value"), d.attribValue = d.attribName, q(d), ie(d)) : N(I) ? d.state = x.ATTRIB_NAME_SAW_WHITE : k(y, I) ? d.attribName += I : U(d, "Invalid attribute name");
            continue;
          case x.ATTRIB_NAME_SAW_WHITE:
            if (I === "=")
              d.state = x.ATTRIB_VALUE;
            else {
              if (N(I))
                continue;
              U(d, "Attribute without value"), d.tag.attributes[d.attribName] = "", d.attribValue = "", R(d, "onattribute", {
                name: d.attribName,
                value: ""
              }), d.attribName = "", I === ">" ? ie(d) : k(v, I) ? (d.attribName = I, d.state = x.ATTRIB_NAME) : (U(d, "Invalid attribute name"), d.state = x.ATTRIB);
            }
            continue;
          case x.ATTRIB_VALUE:
            if (N(I))
              continue;
            D(I) ? (d.q = I, d.state = x.ATTRIB_VALUE_QUOTED) : (d.opt.unquotedAttributeValues || G(d, "Unquoted attribute value"), d.state = x.ATTRIB_VALUE_UNQUOTED, d.attribValue = I);
            continue;
          case x.ATTRIB_VALUE_QUOTED:
            if (I !== d.q) {
              I === "&" ? d.state = x.ATTRIB_VALUE_ENTITY_Q : d.attribValue += I;
              continue;
            }
            q(d), d.q = "", d.state = x.ATTRIB_VALUE_CLOSED;
            continue;
          case x.ATTRIB_VALUE_CLOSED:
            N(I) ? d.state = x.ATTRIB : I === ">" ? ie(d) : I === "/" ? d.state = x.OPEN_TAG_SLASH : k(v, I) ? (U(d, "No whitespace between attributes"), d.attribName = I, d.attribValue = "", d.state = x.ATTRIB_NAME) : U(d, "Invalid attribute name");
            continue;
          case x.ATTRIB_VALUE_UNQUOTED:
            if (!B(I)) {
              I === "&" ? d.state = x.ATTRIB_VALUE_ENTITY_U : d.attribValue += I;
              continue;
            }
            q(d), I === ">" ? ie(d) : d.state = x.ATTRIB;
            continue;
          case x.CLOSE_TAG:
            if (d.tagName)
              I === ">" ? Se(d) : k(y, I) ? d.tagName += I : d.script ? (d.script += "</" + d.tagName + I, d.tagName = "", d.state = x.SCRIPT) : (N(I) || U(d, "Invalid tagname in closing tag"), d.state = x.CLOSE_TAG_SAW_WHITE);
            else {
              if (N(I))
                continue;
              L(v, I) ? d.script ? (d.script += "</" + I, d.state = x.SCRIPT) : U(d, "Invalid tagname in closing tag.") : d.tagName = I;
            }
            continue;
          case x.CLOSE_TAG_SAW_WHITE:
            if (N(I))
              continue;
            I === ">" ? Se(d) : U(d, "Invalid characters in closing tag");
            continue;
          case x.TEXT_ENTITY:
          case x.ATTRIB_VALUE_ENTITY_Q:
          case x.ATTRIB_VALUE_ENTITY_U:
            var xe, Ue;
            switch (d.state) {
              case x.TEXT_ENTITY:
                xe = x.TEXT, Ue = "textNode";
                break;
              case x.ATTRIB_VALUE_ENTITY_Q:
                xe = x.ATTRIB_VALUE_QUOTED, Ue = "attribValue";
                break;
              case x.ATTRIB_VALUE_ENTITY_U:
                xe = x.ATTRIB_VALUE_UNQUOTED, Ue = "attribValue";
                break;
            }
            if (I === ";") {
              var Me = le(d);
              d.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(Me) ? ((d.entityCount += 1) > d.opt.maxEntityCount && G(
                d,
                "Parsed entity count exceeds max entity count"
              ), (d.entityDepth += 1) > d.opt.maxEntityDepth && G(
                d,
                "Parsed entity depth exceeds max entity depth"
              ), d.entity = "", d.state = xe, d.write(Me), d.entityDepth -= 1) : (d[Ue] += Me, d.entity = "", d.state = xe);
            } else k(d.entity.length ? C : S, I) ? d.entity += I : (U(d, "Invalid character in entity name"), d[Ue] += "&" + d.entity + I, d.entity = "", d.state = xe);
            continue;
          default:
            throw new Error(d, "Unknown state: " + d.state);
        }
      return d.position >= d.bufferCheckPosition && i(d), d;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var E = String.fromCharCode, d = Math.floor, A = function() {
        var I = 16384, se = [], pe, xe, Ue = -1, Me = arguments.length;
        if (!Me)
          return "";
        for (var ut = ""; ++Ue < Me; ) {
          var Ae = Number(arguments[Ue]);
          if (!isFinite(Ae) || // `NaN`, `+Infinity`, or `-Infinity`
          Ae < 0 || // not a valid Unicode code point
          Ae > 1114111 || // not a valid Unicode code point
          d(Ae) !== Ae)
            throw RangeError("Invalid code point: " + Ae);
          Ae <= 65535 ? se.push(Ae) : (Ae -= 65536, pe = (Ae >> 10) + 55296, xe = Ae % 1024 + 56320, se.push(pe, xe)), (Ue + 1 === Me || se.length > I) && (ut += E.apply(null, se), se.length = 0);
        }
        return ut;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: A,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = A;
    }();
  })(e);
})(Wf);
Object.defineProperty(ti, "__esModule", { value: !0 });
ti.XElement = void 0;
ti.parseXml = nE;
const Qg = Wf, Ti = dr;
class Yf {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, Ti.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!tE(t))
      throw (0, Ti.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const n = this.attributes === null ? null : this.attributes[t];
    if (n == null)
      throw (0, Ti.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return n;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, n = !1, r = null) {
    const i = this.elementOrNull(t, n);
    if (i === null)
      throw (0, Ti.newError)(r || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, n = !1) {
    if (this.elements === null)
      return null;
    for (const r of this.elements)
      if (nc(r, t, n))
        return r;
    return null;
  }
  getElements(t, n = !1) {
    return this.elements === null ? [] : this.elements.filter((r) => nc(r, t, n));
  }
  elementValueOrEmpty(t, n = !1) {
    const r = this.elementOrNull(t, n);
    return r === null ? "" : r.value;
  }
}
ti.XElement = Yf;
const eE = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function tE(e) {
  return eE.test(e);
}
function nc(e, t, n) {
  const r = e.name;
  return r === t || n === !0 && r.length === t.length && r.toLowerCase() === t.toLowerCase();
}
function nE(e) {
  let t = null;
  const n = Qg.parser(!0, {}), r = [];
  return n.onopentag = (i) => {
    const o = new Yf(i.name);
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
var Pn = {};
Object.defineProperty(Pn, "__esModule", { value: !0 });
Pn.mapToObject = Xf;
Pn.isValidKey = Eo;
Pn.asArray = rE;
Pn.deepAssign = oE;
Pn.objectToArgs = lE;
function Xf(e) {
  const t = {};
  for (const [n, r] of e)
    Eo(n) && (r instanceof Map ? t[n] = Xf(r) : t[n] = r);
  return t;
}
function Eo(e) {
  return ["__proto__", "prototype", "constructor"].includes(e) ? !1 : ["string", "number", "symbol", "boolean"].includes(typeof e) || e === null;
}
function rE(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function rc(e) {
  if (Array.isArray(e))
    return !1;
  const t = typeof e;
  return t === "object" || t === "function";
}
function iE(e, t, n) {
  const r = t[n];
  if (r === void 0)
    return;
  const i = e[n];
  i == null || r == null || !rc(i) || !rc(r) ? Array.isArray(i) && Array.isArray(r) ? e[n] = Array.from(new Set(i.concat(r))) : e[n] = r : e[n] = Jf(i, r);
}
function Jf(e, t) {
  if (e !== t)
    for (const n of Object.getOwnPropertyNames(t))
      Eo(n) && iE(e, t, n);
  return e;
}
function oE(e, ...t) {
  for (const n of t)
    n != null && Jf(e, n);
  return e;
}
const sE = /^[a-zA-Z][a-zA-Z0-9-]*$/, aE = /[\0\r\n]/;
function lE(e) {
  const t = Object.entries(e).reduce((n, [r, i]) => {
    if (!Eo(r) || i == null)
      return n;
    if (!sE.test(r))
      throw new Error(`objectToArgs: unsafe flag name rejected: ${JSON.stringify(r)}`);
    if (aE.test(i))
      throw new Error(`objectToArgs: value for --${r} contains a null byte or newline`);
    return n.concat([`--${r}`, i]);
  }, []);
  return Object.freeze(t);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.objectToArgs = e.deepAssign = e.asArray = e.mapToObject = e.isValidKey = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubTagPrefix = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.isSensitiveFieldName = e.HttpExecutor = e.hashSensitiveValue = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0;
  var t = rn;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var n = dr;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return n.newError;
  } });
  var r = Te;
  Object.defineProperty(e, "configureRequestOptions", { enumerable: !0, get: function() {
    return r.configureRequestOptions;
  } }), Object.defineProperty(e, "configureRequestOptionsFromUrl", { enumerable: !0, get: function() {
    return r.configureRequestOptionsFromUrl;
  } }), Object.defineProperty(e, "configureRequestUrl", { enumerable: !0, get: function() {
    return r.configureRequestUrl;
  } }), Object.defineProperty(e, "createHttpError", { enumerable: !0, get: function() {
    return r.createHttpError;
  } }), Object.defineProperty(e, "DigestTransform", { enumerable: !0, get: function() {
    return r.DigestTransform;
  } }), Object.defineProperty(e, "HttpError", { enumerable: !0, get: function() {
    return r.HttpError;
  } }), Object.defineProperty(e, "hashSensitiveValue", { enumerable: !0, get: function() {
    return r.hashSensitiveValue;
  } }), Object.defineProperty(e, "HttpExecutor", { enumerable: !0, get: function() {
    return r.HttpExecutor;
  } }), Object.defineProperty(e, "isSensitiveFieldName", { enumerable: !0, get: function() {
    return r.isSensitiveFieldName;
  } }), Object.defineProperty(e, "parseJson", { enumerable: !0, get: function() {
    return r.parseJson;
  } }), Object.defineProperty(e, "safeGetHeader", { enumerable: !0, get: function() {
    return r.safeGetHeader;
  } }), Object.defineProperty(e, "safeStringifyJson", { enumerable: !0, get: function() {
    return r.safeStringifyJson;
  } });
  var i = go;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var o = Qr;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return o.ProgressCallbackTransform;
  } });
  var s = ei;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return s.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return s.githubUrl;
  } }), Object.defineProperty(e, "githubTagPrefix", { enumerable: !0, get: function() {
    return s.githubTagPrefix;
  } });
  var a = xa;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return a.retry;
  } });
  var l = Ca;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return l.parseDn;
  } });
  var h = ar;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return h.UUID;
  } });
  var c = ti;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return c.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return c.XElement;
  } });
  var u = Pn;
  Object.defineProperty(e, "isValidKey", { enumerable: !0, get: function() {
    return u.isValidKey;
  } }), Object.defineProperty(e, "mapToObject", { enumerable: !0, get: function() {
    return u.mapToObject;
  } }), Object.defineProperty(e, "asArray", { enumerable: !0, get: function() {
    return u.asArray;
  } }), Object.defineProperty(e, "deepAssign", { enumerable: !0, get: function() {
    return u.deepAssign;
  } }), Object.defineProperty(e, "objectToArgs", { enumerable: !0, get: function() {
    return u.objectToArgs;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
})(De);
var Fe = {}, Ia = {}, yt = {};
function Zf(e) {
  return typeof e > "u" || e === null;
}
function cE(e) {
  return typeof e == "object" && e !== null;
}
function uE(e) {
  return Array.isArray(e) ? e : Zf(e) ? [] : [e];
}
function fE(e, t) {
  if (t) {
    const n = Object.keys(t);
    for (let r = 0, i = n.length; r < i; r += 1) {
      const o = n[r];
      e[o] = t[o];
    }
  }
  return e;
}
function dE(e, t) {
  let n = "";
  for (let r = 0; r < t; r += 1)
    n += e;
  return n;
}
function hE(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
yt.isNothing = Zf;
yt.isObject = cE;
yt.toArray = uE;
yt.repeat = dE;
yt.isNegativeZero = hE;
yt.extend = fE;
function Kf(e, t) {
  let n = "";
  const r = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (n += 'in "' + e.mark.name + '" '), n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (n += `

` + e.mark.snippet), r + " " + n) : r;
}
function kr(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = Kf(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
kr.prototype = Object.create(Error.prototype);
kr.prototype.constructor = kr;
kr.prototype.toString = function(t) {
  return this.name + ": " + Kf(this, t);
};
var ni = kr;
const Ar = yt;
function us(e, t, n, r, i) {
  let o = "", s = "";
  const a = Math.floor(i / 2) - 1;
  return r - t > a && (o = " ... ", t = r - a + o.length), n - r > a && (s = " ...", n = r + a - s.length), {
    str: o + e.slice(t, n).replace(/\t/g, "→") + s,
    pos: r - t + o.length
    // relative position
  };
}
function fs(e, t) {
  return Ar.repeat(" ", t - e.length) + e;
}
function pE(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  const n = /\r?\n|\r|\0/g, r = [0], i = [];
  let o, s = -1;
  for (; o = n.exec(e.buffer); )
    i.push(o.index), r.push(o.index + o[0].length), e.position <= o.index && s < 0 && (s = r.length - 2);
  s < 0 && (s = r.length - 1);
  let a = "";
  const l = Math.min(e.line + t.linesAfter, i.length).toString().length, h = t.maxLength - (t.indent + l + 3);
  for (let u = 1; u <= t.linesBefore && !(s - u < 0); u++) {
    const p = us(
      e.buffer,
      r[s - u],
      i[s - u],
      e.position - (r[s] - r[s - u]),
      h
    );
    a = Ar.repeat(" ", t.indent) + fs((e.line - u + 1).toString(), l) + " | " + p.str + `
` + a;
  }
  const c = us(e.buffer, r[s], i[s], e.position, h);
  a += Ar.repeat(" ", t.indent) + fs((e.line + 1).toString(), l) + " | " + c.str + `
`, a += Ar.repeat("-", t.indent + l + 3 + c.pos) + `^
`;
  for (let u = 1; u <= t.linesAfter && !(s + u >= i.length); u++) {
    const p = us(
      e.buffer,
      r[s + u],
      i[s + u],
      e.position - (r[s] - r[s + u]),
      h
    );
    a += Ar.repeat(" ", t.indent) + fs((e.line + u + 1).toString(), l) + " | " + p.str + `
`;
  }
  return a.replace(/\n$/, "");
}
var mE = pE;
const ic = ni, gE = [
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
], EE = [
  "scalar",
  "sequence",
  "mapping"
];
function yE(e) {
  const t = {};
  return e !== null && Object.keys(e).forEach(function(n) {
    e[n].forEach(function(r) {
      t[String(r)] = n;
    });
  }), t;
}
function wE(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(n) {
    if (gE.indexOf(n) === -1)
      throw new ic('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(n) {
    return n;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = yE(t.styleAliases || null), EE.indexOf(this.kind) === -1)
    throw new ic('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var Xe = wE;
const xr = ni, ds = Xe;
function oc(e, t) {
  const n = [];
  return e[t].forEach(function(r) {
    let i = n.length;
    n.forEach(function(o, s) {
      o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (i = s);
    }), n[i] = r;
  }), n;
}
function vE() {
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
function Xs(e) {
  return this.extend(e);
}
Xs.prototype.extend = function(t) {
  let n = [], r = [];
  if (t instanceof ds)
    r.push(t);
  else if (Array.isArray(t))
    r = r.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (n = n.concat(t.implicit)), t.explicit && (r = r.concat(t.explicit));
  else
    throw new xr("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  n.forEach(function(o) {
    if (!(o instanceof ds))
      throw new xr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new xr("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new xr("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(o) {
    if (!(o instanceof ds))
      throw new xr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  const i = Object.create(Xs.prototype);
  return i.implicit = (this.implicit || []).concat(n), i.explicit = (this.explicit || []).concat(r), i.compiledImplicit = oc(i, "implicit"), i.compiledExplicit = oc(i, "explicit"), i.compiledTypeMap = vE(i.compiledImplicit, i.compiledExplicit), i;
};
var Qf = Xs;
const _E = Xe;
var ed = new _E("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
});
const SE = Xe;
var td = new SE("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
});
const xE = Xe;
var nd = new xE("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
});
const CE = Qf;
var rd = new CE({
  explicit: [
    ed,
    td,
    nd
  ]
});
const IE = Xe;
function bE(e) {
  if (e === null) return !0;
  const t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function AE() {
  return null;
}
function TE(e) {
  return e === null;
}
var id = new IE("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: bE,
  construct: AE,
  predicate: TE,
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
const DE = Xe;
function NE(e) {
  if (e === null) return !1;
  const t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function OE(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function RE(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var od = new DE("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: NE,
  construct: OE,
  predicate: RE,
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
const $E = yt, LE = Xe;
function PE(e) {
  return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function FE(e) {
  return e >= 48 && e <= 55;
}
function UE(e) {
  return e >= 48 && e <= 57;
}
function ME(e) {
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
      return r && isFinite(Tr(e));
    }
    if (i === "x") {
      for (n++; n < t; n++) {
        if (!PE(e.charCodeAt(n))) return !1;
        r = !0;
      }
      return r && isFinite(Tr(e));
    }
    if (i === "o") {
      for (n++; n < t; n++) {
        if (!FE(e.charCodeAt(n))) return !1;
        r = !0;
      }
      return r && isFinite(Tr(e));
    }
  }
  for (; n < t; n++) {
    if (!UE(e.charCodeAt(n)))
      return !1;
    r = !0;
  }
  return r ? isFinite(Tr(e)) : !1;
}
function Tr(e) {
  let t = e, n = 1, r = t[0];
  if ((r === "-" || r === "+") && (r === "-" && (n = -1), t = t.slice(1), r = t[0]), t === "0") return 0;
  if (r === "0") {
    if (t[1] === "b") return n * parseInt(t.slice(2), 2);
    if (t[1] === "x") return n * parseInt(t.slice(2), 16);
    if (t[1] === "o") return n * parseInt(t.slice(2), 8);
  }
  return n * parseInt(t, 10);
}
function kE(e) {
  return Tr(e);
}
function BE(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !$E.isNegativeZero(e);
}
var sd = new LE("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: ME,
  construct: kE,
  predicate: BE,
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
const ad = yt, jE = Xe, HE = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
), GE = new RegExp(
  "^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function zE(e) {
  return e === null || !HE.test(e) ? !1 : isFinite(parseFloat(e, 10)) ? !0 : GE.test(e);
}
function qE(e) {
  let t = e.toLowerCase();
  const n = t[0] === "-" ? -1 : 1;
  return "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : n * parseFloat(t, 10);
}
const VE = /^[-+]?[0-9]+e/;
function WE(e, t) {
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
  else if (ad.isNegativeZero(e))
    return "-0.0";
  const n = e.toString(10);
  return VE.test(n) ? n.replace("e", ".e") : n;
}
function YE(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || ad.isNegativeZero(e));
}
var ld = new jE("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: zE,
  construct: qE,
  predicate: YE,
  represent: WE,
  defaultStyle: "lowercase"
}), cd = rd.extend({
  implicit: [
    id,
    od,
    sd,
    ld
  ]
}), ud = cd;
const XE = Xe, fd = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), dd = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function JE(e) {
  return e === null ? !1 : fd.exec(e) !== null || dd.exec(e) !== null;
}
function ZE(e) {
  let t = 0, n = null, r = fd.exec(e);
  if (r === null && (r = dd.exec(e)), r === null) throw new Error("Date resolve error");
  const i = +r[1], o = +r[2] - 1, s = +r[3];
  if (!r[4])
    return new Date(Date.UTC(i, o, s));
  const a = +r[4], l = +r[5], h = +r[6];
  if (r[7]) {
    for (t = r[7].slice(0, 3); t.length < 3; )
      t += "0";
    t = +t;
  }
  if (r[9]) {
    const u = +r[10], p = +(r[11] || 0);
    n = (u * 60 + p) * 6e4, r[9] === "-" && (n = -n);
  }
  const c = new Date(Date.UTC(i, o, s, a, l, h, t));
  return n && c.setTime(c.getTime() - n), c;
}
function KE(e) {
  return e.toISOString();
}
var hd = new XE("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: JE,
  construct: ZE,
  instanceOf: Date,
  represent: KE
});
const QE = Xe;
function ey(e) {
  return e === "<<" || e === null;
}
var pd = new QE("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: ey
});
const ty = Xe, ba = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function ny(e) {
  if (e === null) return !1;
  let t = 0;
  const n = e.length, r = ba;
  for (let i = 0; i < n; i++) {
    const o = r.indexOf(e.charAt(i));
    if (!(o > 64)) {
      if (o < 0) return !1;
      t += 6;
    }
  }
  return t % 8 === 0;
}
function ry(e) {
  const t = e.replace(/[\r\n=]/g, ""), n = t.length, r = ba;
  let i = 0;
  const o = [];
  for (let a = 0; a < n; a++)
    a % 4 === 0 && a && (o.push(i >> 16 & 255), o.push(i >> 8 & 255), o.push(i & 255)), i = i << 6 | r.indexOf(t.charAt(a));
  const s = n % 4 * 6;
  return s === 0 ? (o.push(i >> 16 & 255), o.push(i >> 8 & 255), o.push(i & 255)) : s === 18 ? (o.push(i >> 10 & 255), o.push(i >> 2 & 255)) : s === 12 && o.push(i >> 4 & 255), new Uint8Array(o);
}
function iy(e) {
  let t = "", n = 0;
  const r = e.length, i = ba;
  for (let s = 0; s < r; s++)
    s % 3 === 0 && s && (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]), n = (n << 8) + e[s];
  const o = r % 3;
  return o === 0 ? (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]) : o === 2 ? (t += i[n >> 10 & 63], t += i[n >> 4 & 63], t += i[n << 2 & 63], t += i[64]) : o === 1 && (t += i[n >> 2 & 63], t += i[n << 4 & 63], t += i[64], t += i[64]), t;
}
function oy(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var md = new ty("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: ny,
  construct: ry,
  predicate: oy,
  represent: iy
});
const sy = Xe, sc = Object.prototype.hasOwnProperty, ay = Object.prototype.toString;
function ly(e) {
  if (e === null) return !0;
  const t = {}, n = e;
  for (let r = 0, i = n.length; r < i; r += 1) {
    const o = n[r];
    let s = !1;
    if (ay.call(o) !== "[object Object]") return !1;
    let a;
    for (a in o)
      if (sc.call(o, a))
        if (!s) s = !0;
        else return !1;
    if (!s || sc.call(t, a)) return !1;
    Object.defineProperty(t, a, { value: !0 });
  }
  return !0;
}
function cy(e) {
  return e !== null ? e : [];
}
var gd = new sy("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: ly,
  construct: cy
});
const uy = Xe, fy = Object.prototype.toString;
function dy(e) {
  if (e === null) return !0;
  const t = e, n = new Array(t.length);
  for (let r = 0, i = t.length; r < i; r += 1) {
    const o = t[r];
    if (fy.call(o) !== "[object Object]") return !1;
    const s = Object.keys(o);
    if (s.length !== 1) return !1;
    n[r] = [s[0], o[s[0]]];
  }
  return !0;
}
function hy(e) {
  if (e === null) return [];
  const t = e, n = new Array(t.length);
  for (let r = 0, i = t.length; r < i; r += 1) {
    const o = t[r], s = Object.keys(o);
    n[r] = [s[0], o[s[0]]];
  }
  return n;
}
var Ed = new uy("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: dy,
  construct: hy
});
const py = Xe, my = Object.prototype.hasOwnProperty;
function gy(e) {
  if (e === null) return !0;
  const t = e;
  for (const n in t)
    if (my.call(t, n) && t[n] !== null)
      return !1;
  return !0;
}
function Ey(e) {
  return e !== null ? e : {};
}
var yd = new py("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: gy,
  construct: Ey
}), Aa = ud.extend({
  implicit: [
    hd,
    pd
  ],
  explicit: [
    md,
    gd,
    Ed,
    yd
  ]
});
const Sn = yt, wd = ni, yy = mE, wy = Aa, gt = Object.prototype.hasOwnProperty, eo = 1, vd = 2, _d = 3, to = 4, hs = 1, vy = 2, ac = 3, _y = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, Sy = /[\x85\u2028\u2029]/, xy = /[,\[\]{}]/, Sd = /^(?:!|!!|![0-9A-Za-z-]+!)$/, xd = /^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;
function lc(e) {
  return Object.prototype.toString.call(e);
}
function At(e) {
  return e === 10 || e === 13;
}
function Mt(e) {
  return e === 9 || e === 32;
}
function Ke(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Xn(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Cy(e) {
  if (e >= 48 && e <= 57)
    return e - 48;
  const t = e | 32;
  return t >= 97 && t <= 102 ? t - 97 + 10 : -1;
}
function Iy(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function by(e) {
  return e >= 48 && e <= 57 ? e - 48 : -1;
}
function cc(e) {
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
function Ay(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
function Cd(e, t, n) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: n
  }) : e[t] = n;
}
const Id = new Array(256), bd = new Array(256);
for (let e = 0; e < 256; e++)
  Id[e] = cc(e) ? 1 : 0, bd[e] = cc(e);
function Ty(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || wy, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.maxDepth = typeof t.maxDepth == "number" ? t.maxDepth : 100, this.maxTotalMergeKeys = typeof t.maxTotalMergeKeys == "number" ? t.maxTotalMergeKeys : 1e4, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.depth = 0, this.totalMergeKeys = 0, this.firstTabInLine = -1, this.documents = [], this.anchorMapTransactions = [];
}
function Ad(e, t) {
  const n = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return n.snippet = yy(n), new wd(t, n);
}
function J(e, t) {
  throw Ad(e, t);
}
function no(e, t) {
  e.onWarning && e.onWarning.call(null, Ad(e, t));
}
function Cn(e, t, n) {
  const r = e.anchorMapTransactions;
  if (r.length !== 0) {
    const i = r[r.length - 1];
    gt.call(i, t) || (i[t] = {
      existed: gt.call(e.anchorMap, t),
      value: e.anchorMap[t]
    });
  }
  e.anchorMap[t] = n;
}
function Dy(e) {
  e.anchorMapTransactions.push(/* @__PURE__ */ Object.create(null));
}
function Ny(e) {
  const t = e.anchorMapTransactions.pop(), n = e.anchorMapTransactions;
  if (n.length === 0) return;
  const r = n[n.length - 1], i = Object.keys(t);
  for (let o = 0, s = i.length; o < s; o += 1) {
    const a = i[o];
    gt.call(r, a) || (r[a] = t[a]);
  }
}
function Oy(e) {
  const t = e.anchorMapTransactions.pop(), n = Object.keys(t);
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const i = t[n[r]];
    i.existed ? e.anchorMap[n[r]] = i.value : delete e.anchorMap[n[r]];
  }
}
function Td(e) {
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
function uc(e, t) {
  e.position = t.position, e.line = t.line, e.lineStart = t.lineStart, e.lineIndent = t.lineIndent, e.firstTabInLine = t.firstTabInLine, e.tag = t.tag, e.anchor = t.anchor, e.kind = t.kind, e.result = t.result;
}
const fc = {
  YAML: function(t, n, r) {
    t.version !== null && J(t, "duplication of %YAML directive"), r.length !== 1 && J(t, "YAML directive accepts exactly one argument");
    const i = /^([0-9]+)\.([0-9]+)$/.exec(r[0]);
    i === null && J(t, "ill-formed argument of the YAML directive");
    const o = parseInt(i[1], 10), s = parseInt(i[2], 10);
    o !== 1 && J(t, "unacceptable YAML version of the document"), t.version = r[0], t.checkLineBreaks = s < 2, s !== 1 && s !== 2 && no(t, "unsupported YAML version of the document");
  },
  TAG: function(t, n, r) {
    let i;
    r.length !== 2 && J(t, "TAG directive accepts exactly two arguments");
    const o = r[0];
    i = r[1], Sd.test(o) || J(t, "ill-formed tag handle (first argument) of the TAG directive"), gt.call(t.tagMap, o) && J(t, 'there is a previously declared suffix for "' + o + '" tag handle'), xd.test(i) || J(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      i = decodeURIComponent(i);
    } catch {
      J(t, "tag prefix is malformed: " + i);
    }
    t.tagMap[o] = i;
  }
};
function tn(e, t, n, r) {
  if (t < n) {
    const i = e.input.slice(t, n);
    if (r)
      for (let o = 0, s = i.length; o < s; o += 1) {
        const a = i.charCodeAt(o);
        a === 9 || a >= 32 && a <= 1114111 || J(e, "expected valid JSON character");
      }
    else _y.test(i) && J(e, "the stream contains non-printable characters");
    e.result += i;
  }
}
function dc(e) {
  e.totalMergeKeys++, e.maxTotalMergeKeys !== -1 && e.totalMergeKeys > e.maxTotalMergeKeys && J(e, "merge keys exceeded maxTotalMergeKeys (" + e.maxTotalMergeKeys + ")");
}
function hc(e, t, n, r) {
  Sn.isObject(n) || J(e, "cannot merge mappings; the provided source object is unacceptable"), dc(e);
  const i = Object.keys(n);
  for (let o = 0, s = i.length; o < s; o += 1) {
    const a = i[o];
    dc(e), gt.call(t, a) || (Cd(t, a, n[a]), r[a] = !0);
  }
}
function Jn(e, t, n, r, i, o, s, a, l) {
  if (Array.isArray(i)) {
    i = Array.prototype.slice.call(i);
    for (let h = 0, c = i.length; h < c; h += 1)
      Array.isArray(i[h]) && J(e, "nested arrays are not supported inside keys"), typeof i == "object" && lc(i[h]) === "[object Object]" && (i[h] = "[object Object]");
  }
  if (typeof i == "object" && lc(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(o)) {
      o.length > 100 && J(e, "abnormal merge sequence size");
      for (let h = 0, c = o.length; h < c; h += 1)
        hc(e, t, o[h], n);
    } else
      hc(e, t, o, n);
  else
    !e.json && !gt.call(n, i) && gt.call(t, i) && (e.line = s || e.line, e.lineStart = a || e.lineStart, e.position = l || e.position, J(e, "duplicated mapping key")), Cd(t, i, o), delete n[i];
  return t;
}
function Ta(e) {
  const t = e.input.charCodeAt(e.position);
  t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : J(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function Ie(e, t, n) {
  let r = 0, i = e.input.charCodeAt(e.position);
  for (; i !== 0; ) {
    for (; Mt(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (At(i))
      for (Ta(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return n !== -1 && r !== 0 && e.lineIndent < n && no(e, "deficient indentation"), r;
}
function yo(e) {
  let t = e.position, n = e.input.charCodeAt(t);
  return !!((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2) && (t += 3, n = e.input.charCodeAt(t), n === 0 || Ke(n)));
}
function Da(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += Sn.repeat(`
`, t - 1));
}
function Ry(e, t, n) {
  let r, i, o, s, a, l;
  const h = e.kind, c = e.result;
  let u = e.input.charCodeAt(e.position);
  if (Ke(u) || Xn(u) || u === 35 || u === 38 || u === 42 || u === 33 || u === 124 || u === 62 || u === 39 || u === 34 || u === 37 || u === 64 || u === 96)
    return !1;
  if (u === 63 || u === 45) {
    const p = e.input.charCodeAt(e.position + 1);
    if (Ke(p) || n && Xn(p))
      return !1;
  }
  for (e.kind = "scalar", e.result = "", r = i = e.position, o = !1; u !== 0; ) {
    if (u === 58) {
      const p = e.input.charCodeAt(e.position + 1);
      if (Ke(p) || n && Xn(p))
        break;
    } else if (u === 35) {
      const p = e.input.charCodeAt(e.position - 1);
      if (Ke(p))
        break;
    } else {
      if (e.position === e.lineStart && yo(e) || n && Xn(u))
        break;
      if (At(u))
        if (s = e.line, a = e.lineStart, l = e.lineIndent, Ie(e, !1, -1), e.lineIndent >= t) {
          o = !0, u = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = i, e.line = s, e.lineStart = a, e.lineIndent = l;
          break;
        }
    }
    o && (tn(e, r, i, !1), Da(e, e.line - s), r = i = e.position, o = !1), Mt(u) || (i = e.position + 1), u = e.input.charCodeAt(++e.position);
  }
  return tn(e, r, i, !1), e.result ? !0 : (e.kind = h, e.result = c, !1);
}
function $y(e, t) {
  let n, r, i = e.input.charCodeAt(e.position);
  if (i !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (i = e.input.charCodeAt(e.position)) !== 0; )
    if (i === 39)
      if (tn(e, n, e.position, !0), i = e.input.charCodeAt(++e.position), i === 39)
        n = e.position, e.position++, r = e.position;
      else
        return !0;
    else At(i) ? (tn(e, n, r, !0), Da(e, Ie(e, !1, t)), n = r = e.position) : e.position === e.lineStart && yo(e) ? J(e, "unexpected end of the document within a single quoted scalar") : (e.position++, Mt(i) || (r = e.position));
  J(e, "unexpected end of the stream within a single quoted scalar");
}
function Ly(e, t) {
  let n, r, i, o = e.input.charCodeAt(e.position);
  if (o !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (o = e.input.charCodeAt(e.position)) !== 0; ) {
    if (o === 34)
      return tn(e, n, e.position, !0), e.position++, !0;
    if (o === 92) {
      if (tn(e, n, e.position, !0), o = e.input.charCodeAt(++e.position), At(o))
        Ie(e, !1, t);
      else if (o < 256 && Id[o])
        e.result += bd[o], e.position++;
      else if ((i = Iy(o)) > 0) {
        let s = i, a = 0;
        for (; s > 0; s--)
          o = e.input.charCodeAt(++e.position), (i = Cy(o)) >= 0 ? a = (a << 4) + i : J(e, "expected hexadecimal character");
        e.result += Ay(a), e.position++;
      } else
        J(e, "unknown escape sequence");
      n = r = e.position;
    } else At(o) ? (tn(e, n, r, !0), Da(e, Ie(e, !1, t)), n = r = e.position) : e.position === e.lineStart && yo(e) ? J(e, "unexpected end of the document within a double quoted scalar") : (e.position++, Mt(o) || (r = e.position));
  }
  J(e, "unexpected end of the stream within a double quoted scalar");
}
function Py(e, t) {
  let n = !0, r, i, o;
  const s = e.tag;
  let a;
  const l = e.anchor;
  let h, c, u, p;
  const w = /* @__PURE__ */ Object.create(null);
  let m, f, g, v = e.input.charCodeAt(e.position);
  if (v === 91)
    h = 93, p = !1, a = [];
  else if (v === 123)
    h = 125, p = !0, a = {};
  else
    return !1;
  for (e.anchor !== null && Cn(e, e.anchor, a), v = e.input.charCodeAt(++e.position); v !== 0; ) {
    if (Ie(e, !0, t), v = e.input.charCodeAt(e.position), v === h)
      return e.position++, e.tag = s, e.anchor = l, e.kind = p ? "mapping" : "sequence", e.result = a, !0;
    if (n ? v === 44 && J(e, "expected the node content, but found ','") : J(e, "missed comma between flow collection entries"), f = m = g = null, c = u = !1, v === 63) {
      const y = e.input.charCodeAt(e.position + 1);
      Ke(y) && (c = u = !0, e.position++, Ie(e, !0, t));
    }
    r = e.line, i = e.lineStart, o = e.position, lr(e, t, eo, !1, !0), f = e.tag, m = e.result, Ie(e, !0, t), v = e.input.charCodeAt(e.position), (u || e.line === r) && v === 58 && (c = !0, v = e.input.charCodeAt(++e.position), Ie(e, !0, t), lr(e, t, eo, !1, !0), g = e.result), p ? Jn(e, a, w, f, m, g, r, i, o) : c ? a.push(Jn(e, null, w, f, m, g, r, i, o)) : a.push(m), Ie(e, !0, t), v = e.input.charCodeAt(e.position), v === 44 ? (n = !0, v = e.input.charCodeAt(++e.position)) : n = !1;
  }
  J(e, "unexpected end of the stream within a flow collection");
}
function Fy(e, t) {
  let n, r = hs, i = !1, o = !1, s = t, a = 0, l = !1, h, c = e.input.charCodeAt(e.position);
  if (c === 124)
    n = !1;
  else if (c === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; c !== 0; )
    if (c = e.input.charCodeAt(++e.position), c === 43 || c === 45)
      hs === r ? r = c === 43 ? ac : vy : J(e, "repeat of a chomping mode identifier");
    else if ((h = by(c)) >= 0)
      h === 0 ? J(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? J(e, "repeat of an indentation width identifier") : (s = t + h - 1, o = !0);
    else
      break;
  if (Mt(c)) {
    do
      c = e.input.charCodeAt(++e.position);
    while (Mt(c));
    if (c === 35)
      do
        c = e.input.charCodeAt(++e.position);
      while (!At(c) && c !== 0);
  }
  for (; c !== 0; ) {
    for (Ta(e), e.lineIndent = 0, c = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && c === 32; )
      e.lineIndent++, c = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > s && (s = e.lineIndent), At(c)) {
      a++;
      continue;
    }
    if (!o && s === 0 && J(e, "missing indentation for block scalar"), e.lineIndent < s) {
      r === ac ? e.result += Sn.repeat(`
`, i ? 1 + a : a) : r === hs && i && (e.result += `
`);
      break;
    }
    n ? Mt(c) ? (l = !0, e.result += Sn.repeat(`
`, i ? 1 + a : a)) : l ? (l = !1, e.result += Sn.repeat(`
`, a + 1)) : a === 0 ? i && (e.result += " ") : e.result += Sn.repeat(`
`, a) : e.result += Sn.repeat(`
`, i ? 1 + a : a), i = !0, o = !0, a = 0;
    const u = e.position;
    for (; !At(c) && c !== 0; )
      c = e.input.charCodeAt(++e.position);
    tn(e, u, e.position, !1);
  }
  return !0;
}
function pc(e, t) {
  const n = e.tag, r = e.anchor, i = [];
  let o = !1;
  if (e.firstTabInLine !== -1) return !1;
  e.anchor !== null && Cn(e, e.anchor, i);
  let s = e.input.charCodeAt(e.position);
  for (; s !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, J(e, "tab characters must not be used in indentation")), s === 45); ) {
    const a = e.input.charCodeAt(e.position + 1);
    if (!Ke(a))
      break;
    if (o = !0, e.position++, Ie(e, !0, -1) && e.lineIndent <= t) {
      i.push(null), s = e.input.charCodeAt(e.position);
      continue;
    }
    const l = e.line;
    if (lr(e, t, _d, !1, !0), i.push(e.result), Ie(e, !0, -1), s = e.input.charCodeAt(e.position), (e.line === l || e.lineIndent > t) && s !== 0)
      J(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return o ? (e.tag = n, e.anchor = r, e.kind = "sequence", e.result = i, !0) : !1;
}
function Dd(e, t, n) {
  let r, i, o, s;
  const a = e.tag, l = e.anchor, h = {}, c = /* @__PURE__ */ Object.create(null);
  let u = null, p = null, w = null, m = !1, f = !1;
  if (e.firstTabInLine !== -1) return !1;
  e.anchor !== null && Cn(e, e.anchor, h);
  let g = e.input.charCodeAt(e.position);
  for (; g !== 0; ) {
    !m && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, J(e, "tab characters must not be used in indentation"));
    const v = e.input.charCodeAt(e.position + 1), y = e.line;
    if ((g === 63 || g === 58) && Ke(v))
      g === 63 ? (m && (Jn(e, h, c, u, p, null, i, o, s), u = p = w = null), f = !0, m = !0, r = !0) : m ? (m = !1, r = !0) : J(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, g = v;
    else {
      if (i = e.line, o = e.lineStart, s = e.position, !lr(e, n, vd, !1, !0))
        break;
      if (e.line === y) {
        for (g = e.input.charCodeAt(e.position); Mt(g); )
          g = e.input.charCodeAt(++e.position);
        if (g === 58)
          g = e.input.charCodeAt(++e.position), Ke(g) || J(e, "a whitespace character is expected after the key-value separator within a block mapping"), m && (Jn(e, h, c, u, p, null, i, o, s), u = p = w = null), f = !0, m = !1, r = !1, u = e.tag, p = e.result;
        else if (f)
          J(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = a, e.anchor = l, !0;
      } else if (f)
        J(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = a, e.anchor = l, !0;
    }
    if ((e.line === y || e.lineIndent > t) && (m && (i = e.line, o = e.lineStart, s = e.position), lr(e, t, to, !0, r) && (m ? p = e.result : w = e.result), m || (Jn(e, h, c, u, p, w, i, o, s), u = p = w = null), Ie(e, !0, -1), g = e.input.charCodeAt(e.position)), (e.line === y || e.lineIndent > t) && g !== 0)
      J(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return m && Jn(e, h, c, u, p, null, i, o, s), f && (e.tag = a, e.anchor = l, e.kind = "mapping", e.result = h), f;
}
function Uy(e) {
  let t = !1, n = !1, r, i, o = e.input.charCodeAt(e.position);
  if (o !== 33) return !1;
  e.tag !== null && J(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (t = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (n = !0, r = "!!", o = e.input.charCodeAt(++e.position)) : r = "!";
  let s = e.position;
  if (t) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (i = e.input.slice(s, e.position), o = e.input.charCodeAt(++e.position)) : J(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !Ke(o); )
      o === 33 && (n ? J(e, "tag suffix cannot contain exclamation marks") : (r = e.input.slice(s - 1, e.position + 1), Sd.test(r) || J(e, "named tag handle cannot contain such characters"), n = !0, s = e.position + 1)), o = e.input.charCodeAt(++e.position);
    i = e.input.slice(s, e.position), xy.test(i) && J(e, "tag suffix cannot contain flow indicator characters");
  }
  i && !xd.test(i) && J(e, "tag name cannot contain such characters: " + i);
  try {
    i = decodeURIComponent(i);
  } catch {
    J(e, "tag name is malformed: " + i);
  }
  return t ? e.tag = i : gt.call(e.tagMap, r) ? e.tag = e.tagMap[r] + i : r === "!" ? e.tag = "!" + i : r === "!!" ? e.tag = "tag:yaml.org,2002:" + i : J(e, 'undeclared tag handle "' + r + '"'), !0;
}
function My(e) {
  let t = e.input.charCodeAt(e.position);
  if (t !== 38) return !1;
  e.anchor !== null && J(e, "duplication of an anchor property"), t = e.input.charCodeAt(++e.position);
  const n = e.position;
  for (; t !== 0 && !Ke(t) && !Xn(t); )
    t = e.input.charCodeAt(++e.position);
  return e.position === n && J(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function ky(e) {
  let t = e.input.charCodeAt(e.position);
  if (t !== 42) return !1;
  t = e.input.charCodeAt(++e.position);
  const n = e.position;
  for (; t !== 0 && !Ke(t) && !Xn(t); )
    t = e.input.charCodeAt(++e.position);
  e.position === n && J(e, "name of an alias node must contain at least one character");
  const r = e.input.slice(n, e.position);
  return gt.call(e.anchorMap, r) || J(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], Ie(e, !0, -1), !0;
}
function By(e, t, n, r) {
  const i = Td(e);
  return Dy(e), uc(e, t), e.tag = null, e.anchor = null, e.kind = null, e.result = null, Dd(e, n, r) && e.kind === "mapping" ? (Ny(e), !0) : (Oy(e), uc(e, i), !1);
}
function lr(e, t, n, r, i) {
  let o, s, a = 1, l = !1, h = !1, c = null, u, p, w;
  e.depth >= e.maxDepth && J(e, "nesting exceeded maxDepth (" + e.maxDepth + ")"), e.depth += 1, e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null;
  const m = o = s = to === n || _d === n;
  if (r && Ie(e, !0, -1) && (l = !0, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : e.lineIndent < t && (a = -1)), a === 1)
    for (; ; ) {
      const f = e.input.charCodeAt(e.position), g = Td(e);
      if (l && (f === 33 && e.tag !== null || f === 38 && e.anchor !== null) || !Uy(e) && !My(e))
        break;
      c === null && (c = g), Ie(e, !0, -1) ? (l = !0, s = m, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : e.lineIndent < t && (a = -1)) : s = !1;
    }
  if (s && (s = l || i), a === 1 || to === n)
    if (eo === n || vd === n ? p = t : p = t + 1, w = e.position - e.lineStart, a === 1)
      if (s && (pc(e, w) || Dd(e, w, p)) || Py(e, p))
        h = !0;
      else {
        const f = e.input.charCodeAt(e.position);
        c !== null && m && !s && f !== 124 && f !== 62 && By(
          e,
          c,
          c.position - c.lineStart,
          p
        ) || o && Fy(e, p) || $y(e, p) || Ly(e, p) ? h = !0 : ky(e) ? (h = !0, (e.tag !== null || e.anchor !== null) && J(e, "alias node should not have any properties")) : Ry(e, p, eo === n) && (h = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && Cn(e, e.anchor, e.result);
      }
    else a === 0 && (h = s && pc(e, w));
  if (e.tag === null)
    e.anchor !== null && Cn(e, e.anchor, e.result);
  else if (e.tag === "?") {
    e.result !== null && e.kind !== "scalar" && J(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"');
    for (let f = 0, g = e.implicitTypes.length; f < g; f += 1)
      if (u = e.implicitTypes[f], u.resolve(e.result)) {
        e.result = u.construct(e.result), e.tag = u.tag, e.anchor !== null && Cn(e, e.anchor, e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (gt.call(e.typeMap[e.kind || "fallback"], e.tag))
      u = e.typeMap[e.kind || "fallback"][e.tag];
    else {
      u = null;
      const f = e.typeMap.multi[e.kind || "fallback"];
      for (let g = 0, v = f.length; g < v; g += 1)
        if (e.tag.slice(0, f[g].tag.length) === f[g].tag) {
          u = f[g];
          break;
        }
    }
    u || J(e, "unknown tag !<" + e.tag + ">"), e.result !== null && u.kind !== e.kind && J(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + u.kind + '", not "' + e.kind + '"'), u.resolve(e.result, e.tag) ? (e.result = u.construct(e.result, e.tag), e.anchor !== null && Cn(e, e.anchor, e.result)) : J(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.depth -= 1, e.tag !== null || e.anchor !== null || h;
}
function jy(e) {
  const t = e.position;
  let n = !1, r;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (r = e.input.charCodeAt(e.position)) !== 0 && (Ie(e, !0, -1), r = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || r !== 37)); ) {
    n = !0, r = e.input.charCodeAt(++e.position);
    let i = e.position;
    for (; r !== 0 && !Ke(r); )
      r = e.input.charCodeAt(++e.position);
    const o = e.input.slice(i, e.position), s = [];
    for (o.length < 1 && J(e, "directive name must not be less than one character in length"); r !== 0; ) {
      for (; Mt(r); )
        r = e.input.charCodeAt(++e.position);
      if (r === 35) {
        do
          r = e.input.charCodeAt(++e.position);
        while (r !== 0 && !At(r));
        break;
      }
      if (At(r)) break;
      for (i = e.position; r !== 0 && !Ke(r); )
        r = e.input.charCodeAt(++e.position);
      s.push(e.input.slice(i, e.position));
    }
    r !== 0 && Ta(e), gt.call(fc, o) ? fc[o](e, o, s) : no(e, 'unknown document directive "' + o + '"');
  }
  if (Ie(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, Ie(e, !0, -1)) : n && J(e, "directives end mark is expected"), lr(e, e.lineIndent - 1, to, !1, !0), Ie(e, !0, -1), e.checkLineBreaks && Sy.test(e.input.slice(t, e.position)) && no(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && yo(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, Ie(e, !0, -1));
    return;
  }
  e.position < e.length - 1 && J(e, "end of the stream or a document separator is expected");
}
function Nd(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  const n = new Ty(e, t), r = e.indexOf("\0");
  for (r !== -1 && (n.position = r, J(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    jy(n);
  return n.documents;
}
function Hy(e, t, n) {
  t !== null && typeof t == "object" && typeof n > "u" && (n = t, t = null);
  const r = Nd(e, n);
  if (typeof t != "function")
    return r;
  for (let i = 0, o = r.length; i < o; i += 1)
    t(r[i]);
}
function Gy(e, t) {
  const n = Nd(e, t);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new wd("expected a single document in the stream, but found more");
  }
}
Ia.loadAll = Hy;
Ia.load = Gy;
var Od = {};
const wo = yt, ri = ni, zy = Aa, Rd = Object.prototype.toString, $d = Object.prototype.hasOwnProperty, Na = 65279, qy = 9, Br = 10, Vy = 13, Wy = 32, Yy = 33, Xy = 34, Js = 35, Jy = 37, Zy = 38, Ky = 39, Qy = 42, Ld = 44, ew = 45, ro = 58, tw = 61, nw = 62, rw = 63, iw = 64, Pd = 91, Fd = 93, ow = 96, Ud = 123, sw = 124, Md = 125, ze = {};
ze[0] = "\\0";
ze[7] = "\\a";
ze[8] = "\\b";
ze[9] = "\\t";
ze[10] = "\\n";
ze[11] = "\\v";
ze[12] = "\\f";
ze[13] = "\\r";
ze[27] = "\\e";
ze[34] = '\\"';
ze[92] = "\\\\";
ze[133] = "\\N";
ze[160] = "\\_";
ze[8232] = "\\L";
ze[8233] = "\\P";
const aw = [
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
], lw = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function cw(e, t) {
  if (t === null) return {};
  const n = {}, r = Object.keys(t);
  for (let i = 0, o = r.length; i < o; i += 1) {
    let s = r[i], a = String(t[s]);
    s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2));
    const l = e.compiledTypeMap.fallback[s];
    l && $d.call(l.styleAliases, a) && (a = l.styleAliases[a]), n[s] = a;
  }
  return n;
}
function uw(e) {
  let t, n;
  const r = e.toString(16).toUpperCase();
  if (e <= 255)
    t = "x", n = 2;
  else if (e <= 65535)
    t = "u", n = 4;
  else if (e <= 4294967295)
    t = "U", n = 8;
  else
    throw new ri("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + t + wo.repeat("0", n - r.length) + r;
}
const fw = 1, jr = 2;
function dw(e) {
  this.schema = e.schema || zy, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = wo.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = cw(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? jr : fw, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function mc(e, t) {
  const n = wo.repeat(" ", t);
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
function Zs(e, t) {
  return `
` + wo.repeat(" ", e.indent * t);
}
function hw(e, t) {
  for (let n = 0, r = e.implicitTypes.length; n < r; n += 1)
    if (e.implicitTypes[n].resolve(t))
      return !0;
  return !1;
}
function io(e) {
  return e === Wy || e === qy;
}
function Hr(e) {
  return e >= 32 && e <= 126 || e >= 161 && e <= 55295 && e !== 8232 && e !== 8233 || e >= 57344 && e <= 65533 && e !== Na || e >= 65536 && e <= 1114111;
}
function gc(e) {
  return Hr(e) && e !== Na && // - b-char
  e !== Vy && e !== Br;
}
function Ec(e, t, n) {
  const r = gc(e), i = r && !io(e);
  return (
    // ns-plain-safe
    (n ? r : r && // - c-flow-indicator
    e !== Ld && e !== Pd && e !== Fd && e !== Ud && e !== Md) && // ns-plain-char
    e !== Js && // false on '#'
    !(t === ro && !i) || // false on ': '
    gc(t) && !io(t) && e === Js || // change to true on '[^ ]#'
    t === ro && i
  );
}
function pw(e) {
  return Hr(e) && e !== Na && !io(e) && // - s-white
  // - (c-indicator ::=
  // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
  e !== ew && e !== rw && e !== ro && e !== Ld && e !== Pd && e !== Fd && e !== Ud && e !== Md && // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
  e !== Js && e !== Zy && e !== Qy && e !== Yy && e !== sw && e !== tw && e !== nw && e !== Ky && e !== Xy && // | “%” | “@” | “`”)
  e !== Jy && e !== iw && e !== ow;
}
function mw(e) {
  return !io(e) && e !== ro;
}
function Dr(e, t) {
  const n = e.charCodeAt(t);
  let r;
  return n >= 55296 && n <= 56319 && t + 1 < e.length && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (n - 55296) * 1024 + r - 56320 + 65536 : n;
}
function kd(e) {
  return /^\n* /.test(e);
}
const Bd = 1, Ks = 2, jd = 3, Hd = 4, qn = 5;
function gw(e, t, n, r, i, o, s, a) {
  let l, h = 0, c = null, u = !1, p = !1;
  const w = r !== -1;
  let m = -1, f = pw(Dr(e, 0)) && mw(Dr(e, e.length - 1));
  if (t || s)
    for (l = 0; l < e.length; h >= 65536 ? l += 2 : l++) {
      if (h = Dr(e, l), !Hr(h))
        return qn;
      f = f && Ec(h, c, a), c = h;
    }
  else {
    for (l = 0; l < e.length; h >= 65536 ? l += 2 : l++) {
      if (h = Dr(e, l), h === Br)
        u = !0, w && (p = p || // Foldable line = too long, and not more-indented.
        l - m - 1 > r && e[m + 1] !== " ", m = l);
      else if (!Hr(h))
        return qn;
      f = f && Ec(h, c, a), c = h;
    }
    p = p || w && l - m - 1 > r && e[m + 1] !== " ";
  }
  return !u && !p ? f && !s && !i(e) ? Bd : o === jr ? qn : Ks : n > 9 && kd(e) ? qn : s ? o === jr ? qn : Ks : p ? Hd : jd;
}
function Ew(e, t, n, r, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === jr ? '""' : "''";
    if (!e.noCompatMode && (aw.indexOf(t) !== -1 || lw.test(t)))
      return e.quotingType === jr ? '"' + t + '"' : "'" + t + "'";
    const o = e.indent * Math.max(1, n), s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), a = r || // No block styles in flow mode.
    e.flowLevel > -1 && n >= e.flowLevel;
    function l(h) {
      return hw(e, h);
    }
    switch (gw(
      t,
      a,
      e.indent,
      s,
      l,
      e.quotingType,
      e.forceQuotes && !r,
      i
    )) {
      case Bd:
        return t;
      case Ks:
        return "'" + t.replace(/'/g, "''") + "'";
      case jd:
        return "|" + yc(t, e.indent) + wc(mc(t, o));
      case Hd:
        return ">" + yc(t, e.indent) + wc(mc(yw(t, s), o));
      case qn:
        return '"' + ww(t) + '"';
      default:
        throw new ri("impossible error: invalid scalar style");
    }
  }();
}
function yc(e, t) {
  const n = kd(e) ? String(t) : "", r = e[e.length - 1] === `
`, o = r && (e[e.length - 2] === `
` || e === `
`) ? "+" : r ? "" : "-";
  return n + o + `
`;
}
function wc(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function yw(e, t) {
  const n = /(\n+)([^\n]*)/g;
  let r = function() {
    let a = e.indexOf(`
`);
    return a = a !== -1 ? a : e.length, n.lastIndex = a, vc(e.slice(0, a), t);
  }(), i = e[0] === `
` || e[0] === " ", o, s;
  for (; s = n.exec(e); ) {
    const a = s[1], l = s[2];
    o = l[0] === " ", r += a + (!i && !o && l !== "" ? `
` : "") + vc(l, t), i = o;
  }
  return r;
}
function vc(e, t) {
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
function ww(e) {
  let t = "", n = 0;
  for (let r = 0; r < e.length; n >= 65536 ? r += 2 : r++) {
    n = Dr(e, r);
    const i = ze[n];
    !i && Hr(n) ? (t += e[r], n >= 65536 && (t += e[r + 1])) : t += i || uw(n);
  }
  return t;
}
function vw(e, t, n) {
  let r = "";
  const i = e.tag;
  for (let o = 0, s = n.length; o < s; o += 1) {
    let a = n[o];
    e.replacer && (a = e.replacer.call(n, String(o), a)), (kt(e, t, a, !1, !1) || typeof a > "u" && kt(e, t, null, !1, !1)) && (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
  }
  e.tag = i, e.dump = "[" + r + "]";
}
function _c(e, t, n, r) {
  let i = "";
  const o = e.tag;
  for (let s = 0, a = n.length; s < a; s += 1) {
    let l = n[s];
    e.replacer && (l = e.replacer.call(n, String(s), l)), (kt(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && kt(e, t + 1, null, !0, !0, !1, !0)) && ((!r || i !== "") && (i += Zs(e, t)), e.dump && Br === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  }
  e.tag = o, e.dump = i || "[]";
}
function _w(e, t, n) {
  let r = "";
  const i = e.tag, o = Object.keys(n);
  for (let s = 0, a = o.length; s < a; s += 1) {
    let l = "";
    r !== "" && (l += ", "), e.condenseFlow && (l += '"');
    const h = o[s];
    let c = n[h];
    e.replacer && (c = e.replacer.call(n, h, c)), kt(e, t, h, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), kt(e, t, c, !1, !1) && (l += e.dump, r += l));
  }
  e.tag = i, e.dump = "{" + r + "}";
}
function Sw(e, t, n, r) {
  let i = "";
  const o = e.tag, s = Object.keys(n);
  if (e.sortKeys === !0)
    s.sort();
  else if (typeof e.sortKeys == "function")
    s.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new ri("sortKeys must be a boolean or a function");
  for (let a = 0, l = s.length; a < l; a += 1) {
    let h = "";
    (!r || i !== "") && (h += Zs(e, t));
    const c = s[a];
    let u = n[c];
    if (e.replacer && (u = e.replacer.call(n, c, u)), !kt(e, t + 1, c, !0, !0, !0))
      continue;
    const p = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024;
    p && (e.dump && Br === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, p && (h += Zs(e, t)), kt(e, t + 1, u, !0, p) && (e.dump && Br === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, i += h);
  }
  e.tag = o, e.dump = i || "{}";
}
function Sc(e, t, n) {
  const r = n ? e.explicitTypes : e.implicitTypes;
  for (let i = 0, o = r.length; i < o; i += 1) {
    const s = r[i];
    if ((s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (n ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        const a = e.styleMap[s.tag] || s.defaultStyle;
        let l;
        if (Rd.call(s.represent) === "[object Function]")
          l = s.represent(t, a);
        else if ($d.call(s.represent, a))
          l = s.represent[a](t, a);
        else
          throw new ri("!<" + s.tag + '> tag resolver accepts not "' + a + '" style');
        e.dump = l;
      }
      return !0;
    }
  }
  return !1;
}
function kt(e, t, n, r, i, o, s) {
  e.tag = null, e.dump = n, Sc(e, n, !1) || Sc(e, n, !0);
  const a = Rd.call(e.dump), l = r;
  r && (r = e.flowLevel < 0 || e.flowLevel > t);
  const h = a === "[object Object]" || a === "[object Array]";
  let c, u;
  if (h && (c = e.duplicates.indexOf(n), u = c !== -1), (e.tag !== null && e.tag !== "?" || u || e.indent !== 2 && t > 0) && (i = !1), u && e.usedDuplicates[c])
    e.dump = "*ref_" + c;
  else {
    if (h && u && !e.usedDuplicates[c] && (e.usedDuplicates[c] = !0), a === "[object Object]")
      r && Object.keys(e.dump).length !== 0 ? (Sw(e, t, e.dump, i), u && (e.dump = "&ref_" + c + e.dump)) : (_w(e, t, e.dump), u && (e.dump = "&ref_" + c + " " + e.dump));
    else if (a === "[object Array]")
      r && e.dump.length !== 0 ? (e.noArrayIndent && !s && t > 0 ? _c(e, t - 1, e.dump, i) : _c(e, t, e.dump, i), u && (e.dump = "&ref_" + c + e.dump)) : (vw(e, t, e.dump), u && (e.dump = "&ref_" + c + " " + e.dump));
    else if (a === "[object String]")
      e.tag !== "?" && Ew(e, e.dump, t, o, l);
    else {
      if (a === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new ri("unacceptable kind of an object to dump " + a);
    }
    if (e.tag !== null && e.tag !== "?") {
      let p = encodeURI(
        e.tag[0] === "!" ? e.tag.slice(1) : e.tag
      ).replace(/!/g, "%21");
      e.tag[0] === "!" ? p = "!" + p : p.slice(0, 18) === "tag:yaml.org,2002:" ? p = "!!" + p.slice(18) : p = "!<" + p + ">", e.dump = p + " " + e.dump;
    }
  }
  return !0;
}
function xw(e, t) {
  const n = [], r = [];
  Qs(e, n, r);
  const i = r.length;
  for (let o = 0; o < i; o += 1)
    t.duplicates.push(n[r[o]]);
  t.usedDuplicates = new Array(i);
}
function Qs(e, t, n) {
  if (e !== null && typeof e == "object") {
    const r = t.indexOf(e);
    if (r !== -1)
      n.indexOf(r) === -1 && n.push(r);
    else if (t.push(e), Array.isArray(e))
      for (let i = 0, o = e.length; i < o; i += 1)
        Qs(e[i], t, n);
    else {
      const i = Object.keys(e);
      for (let o = 0, s = i.length; o < s; o += 1)
        Qs(e[i[o]], t, n);
    }
  }
}
function Cw(e, t) {
  t = t || {};
  const n = new dw(t);
  n.noRefs || xw(e, n);
  let r = e;
  return n.replacer && (r = n.replacer.call({ "": r }, "", r)), kt(n, 0, r, !0, !0) ? n.dump + `
` : "";
}
Od.dump = Cw;
const Gd = Ia, Iw = Od;
function Oa(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Fe.Type = Xe;
Fe.Schema = Qf;
Fe.FAILSAFE_SCHEMA = rd;
Fe.JSON_SCHEMA = cd;
Fe.CORE_SCHEMA = ud;
Fe.DEFAULT_SCHEMA = Aa;
Fe.load = Gd.load;
Fe.loadAll = Gd.loadAll;
Fe.dump = Iw.dump;
Fe.YAMLException = ni;
Fe.types = {
  binary: md,
  float: ld,
  map: nd,
  null: id,
  pairs: Ed,
  set: yd,
  timestamp: hd,
  bool: od,
  int: sd,
  merge: pd,
  omap: gd,
  seq: td,
  str: ed
};
Fe.safeLoad = Oa("safeLoad", "load");
Fe.safeLoadAll = Oa("safeLoadAll", "loadAll");
Fe.safeDump = Oa("safeDump", "dump");
var vo = {};
Object.defineProperty(vo, "__esModule", { value: !0 });
vo.Lazy = void 0;
class bw {
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
vo.Lazy = bw;
var ea = { exports: {} };
const Aw = "2.0.0", zd = 256, Tw = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Dw = 16, Nw = zd - 6, Ow = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var _o = {
  MAX_LENGTH: zd,
  MAX_SAFE_COMPONENT_LENGTH: Dw,
  MAX_SAFE_BUILD_LENGTH: Nw,
  MAX_SAFE_INTEGER: Tw,
  RELEASE_TYPES: Ow,
  SEMVER_SPEC_VERSION: Aw,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const Rw = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var So = Rw;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: r,
    MAX_LENGTH: i
  } = _o, o = So;
  t = e.exports = {};
  const s = t.re = [], a = t.safeRe = [], l = t.src = [], h = t.safeSrc = [], c = t.t = {};
  let u = 0;
  const p = "[a-zA-Z0-9-]", w = [
    ["\\s", 1],
    ["\\d", i],
    [p, r]
  ], m = (g) => {
    for (const [v, y] of w)
      g = g.split(`${v}*`).join(`${v}{0,${y}}`).split(`${v}+`).join(`${v}{1,${y}}`);
    return g;
  }, f = (g, v, y) => {
    const S = m(v), C = u++;
    o(g, C, v), c[g] = C, l[C] = v, h[C] = S, s[C] = new RegExp(v, y ? "g" : void 0), a[C] = new RegExp(S, y ? "g" : void 0);
  };
  f("NUMERICIDENTIFIER", "0|[1-9]\\d*"), f("NUMERICIDENTIFIERLOOSE", "\\d+"), f("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${p}*`), f("MAINVERSION", `(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})`), f("MAINVERSIONLOOSE", `(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})`), f("PRERELEASEIDENTIFIER", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIER]})`), f("PRERELEASEIDENTIFIERLOOSE", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIERLOOSE]})`), f("PRERELEASE", `(?:-(${l[c.PRERELEASEIDENTIFIER]}(?:\\.${l[c.PRERELEASEIDENTIFIER]})*))`), f("PRERELEASELOOSE", `(?:-?(${l[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[c.PRERELEASEIDENTIFIERLOOSE]})*))`), f("BUILDIDENTIFIER", `${p}+`), f("BUILD", `(?:\\+(${l[c.BUILDIDENTIFIER]}(?:\\.${l[c.BUILDIDENTIFIER]})*))`), f("FULLPLAIN", `v?${l[c.MAINVERSION]}${l[c.PRERELEASE]}?${l[c.BUILD]}?`), f("FULL", `^${l[c.FULLPLAIN]}$`), f("LOOSEPLAIN", `[v=\\s]*${l[c.MAINVERSIONLOOSE]}${l[c.PRERELEASELOOSE]}?${l[c.BUILD]}?`), f("LOOSE", `^${l[c.LOOSEPLAIN]}$`), f("GTLT", "((?:<|>)?=?)"), f("XRANGEIDENTIFIERLOOSE", `${l[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), f("XRANGEIDENTIFIER", `${l[c.NUMERICIDENTIFIER]}|x|X|\\*`), f("XRANGEPLAIN", `[v=\\s]*(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:${l[c.PRERELEASE]})?${l[c.BUILD]}?)?)?`), f("XRANGEPLAINLOOSE", `[v=\\s]*(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:${l[c.PRERELEASELOOSE]})?${l[c.BUILD]}?)?)?`), f("XRANGE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAIN]}$`), f("XRANGELOOSE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAINLOOSE]}$`), f("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), f("COERCE", `${l[c.COERCEPLAIN]}(?:$|[^\\d])`), f("COERCEFULL", l[c.COERCEPLAIN] + `(?:${l[c.PRERELEASE]})?(?:${l[c.BUILD]})?(?:$|[^\\d])`), f("COERCERTL", l[c.COERCE], !0), f("COERCERTLFULL", l[c.COERCEFULL], !0), f("LONETILDE", "(?:~>?)"), f("TILDETRIM", `(\\s*)${l[c.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", f("TILDE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAIN]}$`), f("TILDELOOSE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAINLOOSE]}$`), f("LONECARET", "(?:\\^)"), f("CARETTRIM", `(\\s*)${l[c.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", f("CARET", `^${l[c.LONECARET]}${l[c.XRANGEPLAIN]}$`), f("CARETLOOSE", `^${l[c.LONECARET]}${l[c.XRANGEPLAINLOOSE]}$`), f("COMPARATORLOOSE", `^${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]})$|^$`), f("COMPARATOR", `^${l[c.GTLT]}\\s*(${l[c.FULLPLAIN]})$|^$`), f("COMPARATORTRIM", `(\\s*)${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]}|${l[c.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", f("HYPHENRANGE", `^\\s*(${l[c.XRANGEPLAIN]})\\s+-\\s+(${l[c.XRANGEPLAIN]})\\s*$`), f("HYPHENRANGELOOSE", `^\\s*(${l[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[c.XRANGEPLAINLOOSE]})\\s*$`), f("STAR", "(<|>)?=?\\s*\\*"), f("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), f("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(ea, ea.exports);
var ii = ea.exports;
const $w = Object.freeze({ loose: !0 }), Lw = Object.freeze({}), Pw = (e) => e ? typeof e != "object" ? $w : e : Lw;
var Ra = Pw;
const xc = /^[0-9]+$/, qd = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const n = xc.test(e), r = xc.test(t);
  return n && r && (e = +e, t = +t), e === t ? 0 : n && !r ? -1 : r && !n ? 1 : e < t ? -1 : 1;
}, Fw = (e, t) => qd(t, e);
var Vd = {
  compareIdentifiers: qd,
  rcompareIdentifiers: Fw
};
const Di = So, { MAX_LENGTH: Cc, MAX_SAFE_INTEGER: Ni } = _o, { safeRe: Oi, t: Ri } = ii, Uw = Ra, { compareIdentifiers: ps } = Vd;
let Mw = class Ct {
  constructor(t, n) {
    if (n = Uw(n), t instanceof Ct) {
      if (t.loose === !!n.loose && t.includePrerelease === !!n.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Cc)
      throw new TypeError(
        `version is longer than ${Cc} characters`
      );
    Di("SemVer", t, n), this.options = n, this.loose = !!n.loose, this.includePrerelease = !!n.includePrerelease;
    const r = t.trim().match(n.loose ? Oi[Ri.LOOSE] : Oi[Ri.FULL]);
    if (!r)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +r[1], this.minor = +r[2], this.patch = +r[3], this.major > Ni || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > Ni || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > Ni || this.patch < 0)
      throw new TypeError("Invalid patch version");
    r[4] ? this.prerelease = r[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < Ni)
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
    if (Di("SemVer.compare", this.version, this.options, t), !(t instanceof Ct)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new Ct(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof Ct || (t = new Ct(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof Ct || (t = new Ct(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let n = 0;
    do {
      const r = this.prerelease[n], i = t.prerelease[n];
      if (Di("prerelease compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return ps(r, i);
    } while (++n);
  }
  compareBuild(t) {
    t instanceof Ct || (t = new Ct(t, this.options));
    let n = 0;
    do {
      const r = this.build[n], i = t.build[n];
      if (Di("build compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return ps(r, i);
    } while (++n);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, n, r) {
    if (t.startsWith("pre")) {
      if (!n && r === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (n) {
        const i = `-${n}`.match(this.options.loose ? Oi[Ri.PRERELEASELOOSE] : Oi[Ri.PRERELEASE]);
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
          r === !1 && (o = [n]), ps(this.prerelease[0], n) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Je = Mw;
const Ic = Je, kw = (e, t, n = !1) => {
  if (e instanceof Ic)
    return e;
  try {
    return new Ic(e, t);
  } catch (r) {
    if (!n)
      return null;
    throw r;
  }
};
var hr = kw;
const Bw = hr, jw = (e, t) => {
  const n = Bw(e, t);
  return n ? n.version : null;
};
var Hw = jw;
const Gw = hr, zw = (e, t) => {
  const n = Gw(e.trim().replace(/^[=v]+/, ""), t);
  return n ? n.version : null;
};
var qw = zw;
const bc = Je, Vw = (e, t, n, r, i) => {
  typeof n == "string" && (i = r, r = n, n = void 0);
  try {
    return new bc(
      e instanceof bc ? e.version : e,
      n
    ).inc(t, r, i).version;
  } catch {
    return null;
  }
};
var Ww = Vw;
const Ac = hr, Yw = (e, t) => {
  const n = Ac(e, null, !0), r = Ac(t, null, !0), i = n.compare(r);
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
var Xw = Yw;
const Jw = Je, Zw = (e, t) => new Jw(e, t).major;
var Kw = Zw;
const Qw = Je, ev = (e, t) => new Qw(e, t).minor;
var tv = ev;
const nv = Je, rv = (e, t) => new nv(e, t).patch;
var iv = rv;
const ov = hr, sv = (e, t) => {
  const n = ov(e, t);
  return n && n.prerelease.length ? n.prerelease : null;
};
var av = sv;
const Tc = Je, lv = (e, t, n) => new Tc(e, n).compare(new Tc(t, n));
var wt = lv;
const cv = wt, uv = (e, t, n) => cv(t, e, n);
var fv = uv;
const dv = wt, hv = (e, t) => dv(e, t, !0);
var pv = hv;
const Dc = Je, mv = (e, t, n) => {
  const r = new Dc(e, n), i = new Dc(t, n);
  return r.compare(i) || r.compareBuild(i);
};
var $a = mv;
const gv = $a, Ev = (e, t) => e.sort((n, r) => gv(n, r, t));
var yv = Ev;
const wv = $a, vv = (e, t) => e.sort((n, r) => wv(r, n, t));
var _v = vv;
const Sv = wt, xv = (e, t, n) => Sv(e, t, n) > 0;
var xo = xv;
const Cv = wt, Iv = (e, t, n) => Cv(e, t, n) < 0;
var La = Iv;
const bv = wt, Av = (e, t, n) => bv(e, t, n) === 0;
var Wd = Av;
const Tv = wt, Dv = (e, t, n) => Tv(e, t, n) !== 0;
var Yd = Dv;
const Nv = wt, Ov = (e, t, n) => Nv(e, t, n) >= 0;
var Pa = Ov;
const Rv = wt, $v = (e, t, n) => Rv(e, t, n) <= 0;
var Fa = $v;
const Lv = Wd, Pv = Yd, Fv = xo, Uv = Pa, Mv = La, kv = Fa, Bv = (e, t, n, r) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e === n;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e !== n;
    case "":
    case "=":
    case "==":
      return Lv(e, n, r);
    case "!=":
      return Pv(e, n, r);
    case ">":
      return Fv(e, n, r);
    case ">=":
      return Uv(e, n, r);
    case "<":
      return Mv(e, n, r);
    case "<=":
      return kv(e, n, r);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var Xd = Bv;
const jv = Je, Hv = hr, { safeRe: $i, t: Li } = ii, Gv = (e, t) => {
  if (e instanceof jv)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let n = null;
  if (!t.rtl)
    n = e.match(t.includePrerelease ? $i[Li.COERCEFULL] : $i[Li.COERCE]);
  else {
    const l = t.includePrerelease ? $i[Li.COERCERTLFULL] : $i[Li.COERCERTL];
    let h;
    for (; (h = l.exec(e)) && (!n || n.index + n[0].length !== e.length); )
      (!n || h.index + h[0].length !== n.index + n[0].length) && (n = h), l.lastIndex = h.index + h[1].length + h[2].length;
    l.lastIndex = -1;
  }
  if (n === null)
    return null;
  const r = n[2], i = n[3] || "0", o = n[4] || "0", s = t.includePrerelease && n[5] ? `-${n[5]}` : "", a = t.includePrerelease && n[6] ? `+${n[6]}` : "";
  return Hv(`${r}.${i}.${o}${s}${a}`, t);
};
var zv = Gv;
class qv {
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
var Vv = qv, ms, Nc;
function vt() {
  if (Nc) return ms;
  Nc = 1;
  const e = /\s+/g;
  class t {
    constructor(O, M) {
      if (M = i(M), O instanceof t)
        return O.loose === !!M.loose && O.includePrerelease === !!M.includePrerelease ? O : new t(O.raw, M);
      if (O instanceof o)
        return this.raw = O.value, this.set = [[O]], this.formatted = void 0, this;
      if (this.options = M, this.loose = !!M.loose, this.includePrerelease = !!M.includePrerelease, this.raw = O.trim().replace(e, " "), this.set = this.raw.split("||").map((R) => this.parseRange(R.trim())).filter((R) => R.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const R = this.set[0];
        if (this.set = this.set.filter((H) => !f(H[0])), this.set.length === 0)
          this.set = [R];
        else if (this.set.length > 1) {
          for (const H of this.set)
            if (H.length === 1 && g(H[0])) {
              this.set = [H];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let O = 0; O < this.set.length; O++) {
          O > 0 && (this.formatted += "||");
          const M = this.set[O];
          for (let R = 0; R < M.length; R++)
            R > 0 && (this.formatted += " "), this.formatted += M[R].toString().trim();
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
    parseRange(O) {
      const R = ((this.options.includePrerelease && w) | (this.options.loose && m)) + ":" + O, H = r.get(R);
      if (H)
        return H;
      const T = this.options.loose, G = T ? l[h.HYPHENRANGELOOSE] : l[h.HYPHENRANGE];
      O = O.replace(G, K(this.options.includePrerelease)), s("hyphen replace", O), O = O.replace(l[h.COMPARATORTRIM], c), s("comparator trim", O), O = O.replace(l[h.TILDETRIM], u), s("tilde trim", O), O = O.replace(l[h.CARETTRIM], p), s("caret trim", O);
      let V = O.split(" ").map((q) => y(q, this.options)).join(" ").split(/\s+/).map((q) => W(q, this.options));
      T && (V = V.filter((q) => (s("loose invalid filter", q, this.options), !!q.match(l[h.COMPARATORLOOSE])))), s("range list", V);
      const U = /* @__PURE__ */ new Map(), Q = V.map((q) => new o(q, this.options));
      for (const q of Q) {
        if (f(q))
          return [q];
        U.set(q.value, q);
      }
      U.size > 1 && U.has("") && U.delete("");
      const re = [...U.values()];
      return r.set(R, re), re;
    }
    intersects(O, M) {
      if (!(O instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((R) => v(R, M) && O.set.some((H) => v(H, M) && R.every((T) => H.every((G) => T.intersects(G, M)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(O) {
      if (!O)
        return !1;
      if (typeof O == "string")
        try {
          O = new a(O, this.options);
        } catch {
          return !1;
        }
      for (let M = 0; M < this.set.length; M++)
        if (te(this.set[M], O, this.options))
          return !0;
      return !1;
    }
  }
  ms = t;
  const n = Vv, r = new n(), i = Ra, o = Co(), s = So, a = Je, {
    safeRe: l,
    t: h,
    comparatorTrimReplace: c,
    tildeTrimReplace: u,
    caretTrimReplace: p
  } = ii, { FLAG_INCLUDE_PRERELEASE: w, FLAG_LOOSE: m } = _o, f = (F) => F.value === "<0.0.0-0", g = (F) => F.value === "", v = (F, O) => {
    let M = !0;
    const R = F.slice();
    let H = R.pop();
    for (; M && R.length; )
      M = R.every((T) => H.intersects(T, O)), H = R.pop();
    return M;
  }, y = (F, O) => (F = F.replace(l[h.BUILD], ""), s("comp", F, O), F = D(F, O), s("caret", F), F = C(F, O), s("tildes", F), F = k(F, O), s("xrange", F), F = x(F, O), s("stars", F), F), S = (F) => !F || F.toLowerCase() === "x" || F === "*", C = (F, O) => F.trim().split(/\s+/).map((M) => N(M, O)).join(" "), N = (F, O) => {
    const M = O.loose ? l[h.TILDELOOSE] : l[h.TILDE];
    return F.replace(M, (R, H, T, G, V) => {
      s("tilde", F, R, H, T, G, V);
      let U;
      return S(H) ? U = "" : S(T) ? U = `>=${H}.0.0 <${+H + 1}.0.0-0` : S(G) ? U = `>=${H}.${T}.0 <${H}.${+T + 1}.0-0` : V ? (s("replaceTilde pr", V), U = `>=${H}.${T}.${G}-${V} <${H}.${+T + 1}.0-0`) : U = `>=${H}.${T}.${G} <${H}.${+T + 1}.0-0`, s("tilde return", U), U;
    });
  }, D = (F, O) => F.trim().split(/\s+/).map((M) => B(M, O)).join(" "), B = (F, O) => {
    s("caret", F, O);
    const M = O.loose ? l[h.CARETLOOSE] : l[h.CARET], R = O.includePrerelease ? "-0" : "";
    return F.replace(M, (H, T, G, V, U) => {
      s("caret", F, H, T, G, V, U);
      let Q;
      return S(T) ? Q = "" : S(G) ? Q = `>=${T}.0.0${R} <${+T + 1}.0.0-0` : S(V) ? T === "0" ? Q = `>=${T}.${G}.0${R} <${T}.${+G + 1}.0-0` : Q = `>=${T}.${G}.0${R} <${+T + 1}.0.0-0` : U ? (s("replaceCaret pr", U), T === "0" ? G === "0" ? Q = `>=${T}.${G}.${V}-${U} <${T}.${G}.${+V + 1}-0` : Q = `>=${T}.${G}.${V}-${U} <${T}.${+G + 1}.0-0` : Q = `>=${T}.${G}.${V}-${U} <${+T + 1}.0.0-0`) : (s("no pr"), T === "0" ? G === "0" ? Q = `>=${T}.${G}.${V}${R} <${T}.${G}.${+V + 1}-0` : Q = `>=${T}.${G}.${V}${R} <${T}.${+G + 1}.0-0` : Q = `>=${T}.${G}.${V} <${+T + 1}.0.0-0`), s("caret return", Q), Q;
    });
  }, k = (F, O) => (s("replaceXRanges", F, O), F.split(/\s+/).map((M) => L(M, O)).join(" ")), L = (F, O) => {
    F = F.trim();
    const M = O.loose ? l[h.XRANGELOOSE] : l[h.XRANGE];
    return F.replace(M, (R, H, T, G, V, U) => {
      s("xRange", F, R, H, T, G, V, U);
      const Q = S(T), re = Q || S(G), q = re || S(V), ie = q;
      return H === "=" && ie && (H = ""), U = O.includePrerelease ? "-0" : "", Q ? H === ">" || H === "<" ? R = "<0.0.0-0" : R = "*" : H && ie ? (re && (G = 0), V = 0, H === ">" ? (H = ">=", re ? (T = +T + 1, G = 0, V = 0) : (G = +G + 1, V = 0)) : H === "<=" && (H = "<", re ? T = +T + 1 : G = +G + 1), H === "<" && (U = "-0"), R = `${H + T}.${G}.${V}${U}`) : re ? R = `>=${T}.0.0${U} <${+T + 1}.0.0-0` : q && (R = `>=${T}.${G}.0${U} <${T}.${+G + 1}.0-0`), s("xRange return", R), R;
    });
  }, x = (F, O) => (s("replaceStars", F, O), F.trim().replace(l[h.STAR], "")), W = (F, O) => (s("replaceGTE0", F, O), F.trim().replace(l[O.includePrerelease ? h.GTE0PRE : h.GTE0], "")), K = (F) => (O, M, R, H, T, G, V, U, Q, re, q, ie) => (S(R) ? M = "" : S(H) ? M = `>=${R}.0.0${F ? "-0" : ""}` : S(T) ? M = `>=${R}.${H}.0${F ? "-0" : ""}` : G ? M = `>=${M}` : M = `>=${M}${F ? "-0" : ""}`, S(Q) ? U = "" : S(re) ? U = `<${+Q + 1}.0.0-0` : S(q) ? U = `<${Q}.${+re + 1}.0-0` : ie ? U = `<=${Q}.${re}.${q}-${ie}` : F ? U = `<${Q}.${re}.${+q + 1}-0` : U = `<=${U}`, `${M} ${U}`.trim()), te = (F, O, M) => {
    for (let R = 0; R < F.length; R++)
      if (!F[R].test(O))
        return !1;
    if (O.prerelease.length && !M.includePrerelease) {
      for (let R = 0; R < F.length; R++)
        if (s(F[R].semver), F[R].semver !== o.ANY && F[R].semver.prerelease.length > 0) {
          const H = F[R].semver;
          if (H.major === O.major && H.minor === O.minor && H.patch === O.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return ms;
}
var gs, Oc;
function Co() {
  if (Oc) return gs;
  Oc = 1;
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
      const u = this.options.loose ? r[i.COMPARATORLOOSE] : r[i.COMPARATOR], p = c.match(u);
      if (!p)
        throw new TypeError(`Invalid comparator: ${c}`);
      this.operator = p[1] !== void 0 ? p[1] : "", this.operator === "=" && (this.operator = ""), p[2] ? this.semver = new a(p[2], this.options.loose) : this.semver = e;
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
  gs = t;
  const n = Ra, { safeRe: r, t: i } = ii, o = Xd, s = So, a = Je, l = vt();
  return gs;
}
const Wv = vt(), Yv = (e, t, n) => {
  try {
    t = new Wv(t, n);
  } catch {
    return !1;
  }
  return t.test(e);
};
var Io = Yv;
const Xv = vt(), Jv = (e, t) => new Xv(e, t).set.map((n) => n.map((r) => r.value).join(" ").trim().split(" "));
var Zv = Jv;
const Kv = Je, Qv = vt(), e_ = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new Qv(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!r || i.compare(s) === -1) && (r = s, i = new Kv(r, n));
  }), r;
};
var t_ = e_;
const n_ = Je, r_ = vt(), i_ = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new r_(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!r || i.compare(s) === 1) && (r = s, i = new n_(r, n));
  }), r;
};
var o_ = i_;
const Es = Je, s_ = vt(), Rc = xo, a_ = (e, t) => {
  e = new s_(e, t);
  let n = new Es("0.0.0");
  if (e.test(n) || (n = new Es("0.0.0-0"), e.test(n)))
    return n;
  n = null;
  for (let r = 0; r < e.set.length; ++r) {
    const i = e.set[r];
    let o = null;
    i.forEach((s) => {
      const a = new Es(s.semver.version);
      switch (s.operator) {
        case ">":
          a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), a.raw = a.format();
        case "":
        case ">=":
          (!o || Rc(a, o)) && (o = a);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${s.operator}`);
      }
    }), o && (!n || Rc(n, o)) && (n = o);
  }
  return n && e.test(n) ? n : null;
};
var l_ = a_;
const c_ = vt(), u_ = (e, t) => {
  try {
    return new c_(e, t).range || "*";
  } catch {
    return null;
  }
};
var f_ = u_;
const d_ = Je, Jd = Co(), { ANY: h_ } = Jd, p_ = vt(), m_ = Io, $c = xo, Lc = La, g_ = Fa, E_ = Pa, y_ = (e, t, n, r) => {
  e = new d_(e, r), t = new p_(t, r);
  let i, o, s, a, l;
  switch (n) {
    case ">":
      i = $c, o = g_, s = Lc, a = ">", l = ">=";
      break;
    case "<":
      i = Lc, o = E_, s = $c, a = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (m_(e, t, r))
    return !1;
  for (let h = 0; h < t.set.length; ++h) {
    const c = t.set[h];
    let u = null, p = null;
    if (c.forEach((w) => {
      w.semver === h_ && (w = new Jd(">=0.0.0")), u = u || w, p = p || w, i(w.semver, u.semver, r) ? u = w : s(w.semver, p.semver, r) && (p = w);
    }), u.operator === a || u.operator === l || (!p.operator || p.operator === a) && o(e, p.semver))
      return !1;
    if (p.operator === l && s(e, p.semver))
      return !1;
  }
  return !0;
};
var Ua = y_;
const w_ = Ua, v_ = (e, t, n) => w_(e, t, ">", n);
var __ = v_;
const S_ = Ua, x_ = (e, t, n) => S_(e, t, "<", n);
var C_ = x_;
const Pc = vt(), I_ = (e, t, n) => (e = new Pc(e, n), t = new Pc(t, n), e.intersects(t, n));
var b_ = I_;
const A_ = Io, T_ = wt;
var D_ = (e, t, n) => {
  const r = [];
  let i = null, o = null;
  const s = e.sort((c, u) => T_(c, u, n));
  for (const c of s)
    A_(c, t, n) ? (o = c, i || (i = c)) : (o && r.push([i, o]), o = null, i = null);
  i && r.push([i, null]);
  const a = [];
  for (const [c, u] of r)
    c === u ? a.push(c) : !u && c === s[0] ? a.push("*") : u ? c === s[0] ? a.push(`<=${u}`) : a.push(`${c} - ${u}`) : a.push(`>=${c}`);
  const l = a.join(" || "), h = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < h.length ? l : t;
};
const Fc = vt(), Ma = Co(), { ANY: ys } = Ma, Cr = Io, ka = wt, N_ = (e, t, n = {}) => {
  if (e === t)
    return !0;
  e = new Fc(e, n), t = new Fc(t, n);
  let r = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const s = R_(i, o, n);
      if (r = r || s !== null, s)
        continue e;
    }
    if (r)
      return !1;
  }
  return !0;
}, O_ = [new Ma(">=0.0.0-0")], Uc = [new Ma(">=0.0.0")], R_ = (e, t, n) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === ys) {
    if (t.length === 1 && t[0].semver === ys)
      return !0;
    n.includePrerelease ? e = O_ : e = Uc;
  }
  if (t.length === 1 && t[0].semver === ys) {
    if (n.includePrerelease)
      return !0;
    t = Uc;
  }
  const r = /* @__PURE__ */ new Set();
  let i, o;
  for (const w of e)
    w.operator === ">" || w.operator === ">=" ? i = Mc(i, w, n) : w.operator === "<" || w.operator === "<=" ? o = kc(o, w, n) : r.add(w.semver);
  if (r.size > 1)
    return null;
  let s;
  if (i && o) {
    if (s = ka(i.semver, o.semver, n), s > 0)
      return null;
    if (s === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const w of r) {
    if (i && !Cr(w, String(i), n) || o && !Cr(w, String(o), n))
      return null;
    for (const m of t)
      if (!Cr(w, String(m), n))
        return !1;
    return !0;
  }
  let a, l, h, c, u = o && !n.includePrerelease && o.semver.prerelease.length ? o.semver : !1, p = i && !n.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && o.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const w of t) {
    if (c = c || w.operator === ">" || w.operator === ">=", h = h || w.operator === "<" || w.operator === "<=", i) {
      if (p && w.semver.prerelease && w.semver.prerelease.length && w.semver.major === p.major && w.semver.minor === p.minor && w.semver.patch === p.patch && (p = !1), w.operator === ">" || w.operator === ">=") {
        if (a = Mc(i, w, n), a === w && a !== i)
          return !1;
      } else if (i.operator === ">=" && !Cr(i.semver, String(w), n))
        return !1;
    }
    if (o) {
      if (u && w.semver.prerelease && w.semver.prerelease.length && w.semver.major === u.major && w.semver.minor === u.minor && w.semver.patch === u.patch && (u = !1), w.operator === "<" || w.operator === "<=") {
        if (l = kc(o, w, n), l === w && l !== o)
          return !1;
      } else if (o.operator === "<=" && !Cr(o.semver, String(w), n))
        return !1;
    }
    if (!w.operator && (o || i) && s !== 0)
      return !1;
  }
  return !(i && h && !o && s !== 0 || o && c && !i && s !== 0 || p || u);
}, Mc = (e, t, n) => {
  if (!e)
    return t;
  const r = ka(e.semver, t.semver, n);
  return r > 0 ? e : r < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, kc = (e, t, n) => {
  if (!e)
    return t;
  const r = ka(e.semver, t.semver, n);
  return r < 0 ? e : r > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var $_ = N_;
const ws = ii, Bc = _o, L_ = Je, jc = Vd, P_ = hr, F_ = Hw, U_ = qw, M_ = Ww, k_ = Xw, B_ = Kw, j_ = tv, H_ = iv, G_ = av, z_ = wt, q_ = fv, V_ = pv, W_ = $a, Y_ = yv, X_ = _v, J_ = xo, Z_ = La, K_ = Wd, Q_ = Yd, e1 = Pa, t1 = Fa, n1 = Xd, r1 = zv, i1 = Co(), o1 = vt(), s1 = Io, a1 = Zv, l1 = t_, c1 = o_, u1 = l_, f1 = f_, d1 = Ua, h1 = __, p1 = C_, m1 = b_, g1 = D_, E1 = $_;
var Zd = {
  parse: P_,
  valid: F_,
  clean: U_,
  inc: M_,
  diff: k_,
  major: B_,
  minor: j_,
  patch: H_,
  prerelease: G_,
  compare: z_,
  rcompare: q_,
  compareLoose: V_,
  compareBuild: W_,
  sort: Y_,
  rsort: X_,
  gt: J_,
  lt: Z_,
  eq: K_,
  neq: Q_,
  gte: e1,
  lte: t1,
  cmp: n1,
  coerce: r1,
  Comparator: i1,
  Range: o1,
  satisfies: s1,
  toComparators: a1,
  maxSatisfying: l1,
  minSatisfying: c1,
  minVersion: u1,
  validRange: f1,
  outside: d1,
  gtr: h1,
  ltr: p1,
  intersects: m1,
  simplifyRange: g1,
  subset: E1,
  SemVer: L_,
  re: ws.re,
  src: ws.src,
  tokens: ws.t,
  SEMVER_SPEC_VERSION: Bc.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Bc.RELEASE_TYPES,
  compareIdentifiers: jc.compareIdentifiers,
  rcompareIdentifiers: jc.rcompareIdentifiers
}, oi = {}, oo = { exports: {} };
oo.exports;
(function(e, t) {
  var n = 200, r = "__lodash_hash_undefined__", i = 1, o = 2, s = 9007199254740991, a = "[object Arguments]", l = "[object Array]", h = "[object AsyncFunction]", c = "[object Boolean]", u = "[object Date]", p = "[object Error]", w = "[object Function]", m = "[object GeneratorFunction]", f = "[object Map]", g = "[object Number]", v = "[object Null]", y = "[object Object]", S = "[object Promise]", C = "[object Proxy]", N = "[object RegExp]", D = "[object Set]", B = "[object String]", k = "[object Symbol]", L = "[object Undefined]", x = "[object WeakMap]", W = "[object ArrayBuffer]", K = "[object DataView]", te = "[object Float32Array]", F = "[object Float64Array]", O = "[object Int8Array]", M = "[object Int16Array]", R = "[object Int32Array]", H = "[object Uint8Array]", T = "[object Uint8ClampedArray]", G = "[object Uint16Array]", V = "[object Uint32Array]", U = /[\\^$.*+?()[\]{}|]/g, Q = /^\[object .+?Constructor\]$/, re = /^(?:0|[1-9]\d*)$/, q = {};
  q[te] = q[F] = q[O] = q[M] = q[R] = q[H] = q[T] = q[G] = q[V] = !0, q[a] = q[l] = q[W] = q[c] = q[K] = q[u] = q[p] = q[w] = q[f] = q[g] = q[y] = q[N] = q[D] = q[B] = q[x] = !1;
  var ie = typeof Ge == "object" && Ge && Ge.Object === Object && Ge, Se = typeof self == "object" && self && self.Object === Object && self, le = ie || Se || Function("return this")(), ct = t && !t.nodeType && t, Rt = ct && !0 && e && !e.nodeType && e, Qe = Rt && Rt.exports === ct, dn = Qe && ie.process, E = function() {
    try {
      return dn && dn.binding && dn.binding("util");
    } catch {
    }
  }(), d = E && E.isTypedArray;
  function A(_, b) {
    for (var $ = -1, Y = _ == null ? 0 : _.length, de = 0, ee = []; ++$ < Y; ) {
      var ye = _[$];
      b(ye, $, _) && (ee[de++] = ye);
    }
    return ee;
  }
  function I(_, b) {
    for (var $ = -1, Y = b.length, de = _.length; ++$ < Y; )
      _[de + $] = b[$];
    return _;
  }
  function se(_, b) {
    for (var $ = -1, Y = _ == null ? 0 : _.length; ++$ < Y; )
      if (b(_[$], $, _))
        return !0;
    return !1;
  }
  function pe(_, b) {
    for (var $ = -1, Y = Array(_); ++$ < _; )
      Y[$] = b($);
    return Y;
  }
  function xe(_) {
    return function(b) {
      return _(b);
    };
  }
  function Ue(_, b) {
    return _.has(b);
  }
  function Me(_, b) {
    return _ == null ? void 0 : _[b];
  }
  function ut(_) {
    var b = -1, $ = Array(_.size);
    return _.forEach(function(Y, de) {
      $[++b] = [de, Y];
    }), $;
  }
  function Ae(_, b) {
    return function($) {
      return _(b($));
    };
  }
  function ft(_) {
    var b = -1, $ = Array(_.size);
    return _.forEach(function(Y) {
      $[++b] = Y;
    }), $;
  }
  var Xo = Array.prototype, mi = Function.prototype, Ht = Object.prototype, Un = le["__core-js_shared__"], sl = mi.toString, St = Ht.hasOwnProperty, al = function() {
    var _ = /[^.]+$/.exec(Un && Un.keys && Un.keys.IE_PROTO || "");
    return _ ? "Symbol(src)_1." + _ : "";
  }(), ll = Ht.toString, kh = RegExp(
    "^" + sl.call(St).replace(U, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), cl = Qe ? le.Buffer : void 0, gi = le.Symbol, ul = le.Uint8Array, fl = Ht.propertyIsEnumerable, Bh = Xo.splice, hn = gi ? gi.toStringTag : void 0, dl = Object.getOwnPropertySymbols, jh = cl ? cl.isBuffer : void 0, Hh = Ae(Object.keys, Object), Jo = Mn(le, "DataView"), yr = Mn(le, "Map"), Zo = Mn(le, "Promise"), Ko = Mn(le, "Set"), Qo = Mn(le, "WeakMap"), wr = Mn(Object, "create"), Gh = gn(Jo), zh = gn(yr), qh = gn(Zo), Vh = gn(Ko), Wh = gn(Qo), hl = gi ? gi.prototype : void 0, es = hl ? hl.valueOf : void 0;
  function pn(_) {
    var b = -1, $ = _ == null ? 0 : _.length;
    for (this.clear(); ++b < $; ) {
      var Y = _[b];
      this.set(Y[0], Y[1]);
    }
  }
  function Yh() {
    this.__data__ = wr ? wr(null) : {}, this.size = 0;
  }
  function Xh(_) {
    var b = this.has(_) && delete this.__data__[_];
    return this.size -= b ? 1 : 0, b;
  }
  function Jh(_) {
    var b = this.__data__;
    if (wr) {
      var $ = b[_];
      return $ === r ? void 0 : $;
    }
    return St.call(b, _) ? b[_] : void 0;
  }
  function Zh(_) {
    var b = this.__data__;
    return wr ? b[_] !== void 0 : St.call(b, _);
  }
  function Kh(_, b) {
    var $ = this.__data__;
    return this.size += this.has(_) ? 0 : 1, $[_] = wr && b === void 0 ? r : b, this;
  }
  pn.prototype.clear = Yh, pn.prototype.delete = Xh, pn.prototype.get = Jh, pn.prototype.has = Zh, pn.prototype.set = Kh;
  function $t(_) {
    var b = -1, $ = _ == null ? 0 : _.length;
    for (this.clear(); ++b < $; ) {
      var Y = _[b];
      this.set(Y[0], Y[1]);
    }
  }
  function Qh() {
    this.__data__ = [], this.size = 0;
  }
  function ep(_) {
    var b = this.__data__, $ = yi(b, _);
    if ($ < 0)
      return !1;
    var Y = b.length - 1;
    return $ == Y ? b.pop() : Bh.call(b, $, 1), --this.size, !0;
  }
  function tp(_) {
    var b = this.__data__, $ = yi(b, _);
    return $ < 0 ? void 0 : b[$][1];
  }
  function np(_) {
    return yi(this.__data__, _) > -1;
  }
  function rp(_, b) {
    var $ = this.__data__, Y = yi($, _);
    return Y < 0 ? (++this.size, $.push([_, b])) : $[Y][1] = b, this;
  }
  $t.prototype.clear = Qh, $t.prototype.delete = ep, $t.prototype.get = tp, $t.prototype.has = np, $t.prototype.set = rp;
  function mn(_) {
    var b = -1, $ = _ == null ? 0 : _.length;
    for (this.clear(); ++b < $; ) {
      var Y = _[b];
      this.set(Y[0], Y[1]);
    }
  }
  function ip() {
    this.size = 0, this.__data__ = {
      hash: new pn(),
      map: new (yr || $t)(),
      string: new pn()
    };
  }
  function op(_) {
    var b = wi(this, _).delete(_);
    return this.size -= b ? 1 : 0, b;
  }
  function sp(_) {
    return wi(this, _).get(_);
  }
  function ap(_) {
    return wi(this, _).has(_);
  }
  function lp(_, b) {
    var $ = wi(this, _), Y = $.size;
    return $.set(_, b), this.size += $.size == Y ? 0 : 1, this;
  }
  mn.prototype.clear = ip, mn.prototype.delete = op, mn.prototype.get = sp, mn.prototype.has = ap, mn.prototype.set = lp;
  function Ei(_) {
    var b = -1, $ = _ == null ? 0 : _.length;
    for (this.__data__ = new mn(); ++b < $; )
      this.add(_[b]);
  }
  function cp(_) {
    return this.__data__.set(_, r), this;
  }
  function up(_) {
    return this.__data__.has(_);
  }
  Ei.prototype.add = Ei.prototype.push = cp, Ei.prototype.has = up;
  function Gt(_) {
    var b = this.__data__ = new $t(_);
    this.size = b.size;
  }
  function fp() {
    this.__data__ = new $t(), this.size = 0;
  }
  function dp(_) {
    var b = this.__data__, $ = b.delete(_);
    return this.size = b.size, $;
  }
  function hp(_) {
    return this.__data__.get(_);
  }
  function pp(_) {
    return this.__data__.has(_);
  }
  function mp(_, b) {
    var $ = this.__data__;
    if ($ instanceof $t) {
      var Y = $.__data__;
      if (!yr || Y.length < n - 1)
        return Y.push([_, b]), this.size = ++$.size, this;
      $ = this.__data__ = new mn(Y);
    }
    return $.set(_, b), this.size = $.size, this;
  }
  Gt.prototype.clear = fp, Gt.prototype.delete = dp, Gt.prototype.get = hp, Gt.prototype.has = pp, Gt.prototype.set = mp;
  function gp(_, b) {
    var $ = vi(_), Y = !$ && Op(_), de = !$ && !Y && ts(_), ee = !$ && !Y && !de && Sl(_), ye = $ || Y || de || ee, Ne = ye ? pe(_.length, String) : [], $e = Ne.length;
    for (var me in _)
      St.call(_, me) && !(ye && // Safari 9 has enumerable `arguments.length` in strict mode.
      (me == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      de && (me == "offset" || me == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      ee && (me == "buffer" || me == "byteLength" || me == "byteOffset") || // Skip index properties.
      bp(me, $e))) && Ne.push(me);
    return Ne;
  }
  function yi(_, b) {
    for (var $ = _.length; $--; )
      if (yl(_[$][0], b))
        return $;
    return -1;
  }
  function Ep(_, b, $) {
    var Y = b(_);
    return vi(_) ? Y : I(Y, $(_));
  }
  function vr(_) {
    return _ == null ? _ === void 0 ? L : v : hn && hn in Object(_) ? Cp(_) : Np(_);
  }
  function pl(_) {
    return _r(_) && vr(_) == a;
  }
  function ml(_, b, $, Y, de) {
    return _ === b ? !0 : _ == null || b == null || !_r(_) && !_r(b) ? _ !== _ && b !== b : yp(_, b, $, Y, ml, de);
  }
  function yp(_, b, $, Y, de, ee) {
    var ye = vi(_), Ne = vi(b), $e = ye ? l : zt(_), me = Ne ? l : zt(b);
    $e = $e == a ? y : $e, me = me == a ? y : me;
    var et = $e == y, dt = me == y, ke = $e == me;
    if (ke && ts(_)) {
      if (!ts(b))
        return !1;
      ye = !0, et = !1;
    }
    if (ke && !et)
      return ee || (ee = new Gt()), ye || Sl(_) ? gl(_, b, $, Y, de, ee) : Sp(_, b, $e, $, Y, de, ee);
    if (!($ & i)) {
      var it = et && St.call(_, "__wrapped__"), ot = dt && St.call(b, "__wrapped__");
      if (it || ot) {
        var qt = it ? _.value() : _, Lt = ot ? b.value() : b;
        return ee || (ee = new Gt()), de(qt, Lt, $, Y, ee);
      }
    }
    return ke ? (ee || (ee = new Gt()), xp(_, b, $, Y, de, ee)) : !1;
  }
  function wp(_) {
    if (!_l(_) || Tp(_))
      return !1;
    var b = wl(_) ? kh : Q;
    return b.test(gn(_));
  }
  function vp(_) {
    return _r(_) && vl(_.length) && !!q[vr(_)];
  }
  function _p(_) {
    if (!Dp(_))
      return Hh(_);
    var b = [];
    for (var $ in Object(_))
      St.call(_, $) && $ != "constructor" && b.push($);
    return b;
  }
  function gl(_, b, $, Y, de, ee) {
    var ye = $ & i, Ne = _.length, $e = b.length;
    if (Ne != $e && !(ye && $e > Ne))
      return !1;
    var me = ee.get(_);
    if (me && ee.get(b))
      return me == b;
    var et = -1, dt = !0, ke = $ & o ? new Ei() : void 0;
    for (ee.set(_, b), ee.set(b, _); ++et < Ne; ) {
      var it = _[et], ot = b[et];
      if (Y)
        var qt = ye ? Y(ot, it, et, b, _, ee) : Y(it, ot, et, _, b, ee);
      if (qt !== void 0) {
        if (qt)
          continue;
        dt = !1;
        break;
      }
      if (ke) {
        if (!se(b, function(Lt, En) {
          if (!Ue(ke, En) && (it === Lt || de(it, Lt, $, Y, ee)))
            return ke.push(En);
        })) {
          dt = !1;
          break;
        }
      } else if (!(it === ot || de(it, ot, $, Y, ee))) {
        dt = !1;
        break;
      }
    }
    return ee.delete(_), ee.delete(b), dt;
  }
  function Sp(_, b, $, Y, de, ee, ye) {
    switch ($) {
      case K:
        if (_.byteLength != b.byteLength || _.byteOffset != b.byteOffset)
          return !1;
        _ = _.buffer, b = b.buffer;
      case W:
        return !(_.byteLength != b.byteLength || !ee(new ul(_), new ul(b)));
      case c:
      case u:
      case g:
        return yl(+_, +b);
      case p:
        return _.name == b.name && _.message == b.message;
      case N:
      case B:
        return _ == b + "";
      case f:
        var Ne = ut;
      case D:
        var $e = Y & i;
        if (Ne || (Ne = ft), _.size != b.size && !$e)
          return !1;
        var me = ye.get(_);
        if (me)
          return me == b;
        Y |= o, ye.set(_, b);
        var et = gl(Ne(_), Ne(b), Y, de, ee, ye);
        return ye.delete(_), et;
      case k:
        if (es)
          return es.call(_) == es.call(b);
    }
    return !1;
  }
  function xp(_, b, $, Y, de, ee) {
    var ye = $ & i, Ne = El(_), $e = Ne.length, me = El(b), et = me.length;
    if ($e != et && !ye)
      return !1;
    for (var dt = $e; dt--; ) {
      var ke = Ne[dt];
      if (!(ye ? ke in b : St.call(b, ke)))
        return !1;
    }
    var it = ee.get(_);
    if (it && ee.get(b))
      return it == b;
    var ot = !0;
    ee.set(_, b), ee.set(b, _);
    for (var qt = ye; ++dt < $e; ) {
      ke = Ne[dt];
      var Lt = _[ke], En = b[ke];
      if (Y)
        var xl = ye ? Y(En, Lt, ke, b, _, ee) : Y(Lt, En, ke, _, b, ee);
      if (!(xl === void 0 ? Lt === En || de(Lt, En, $, Y, ee) : xl)) {
        ot = !1;
        break;
      }
      qt || (qt = ke == "constructor");
    }
    if (ot && !qt) {
      var _i = _.constructor, Si = b.constructor;
      _i != Si && "constructor" in _ && "constructor" in b && !(typeof _i == "function" && _i instanceof _i && typeof Si == "function" && Si instanceof Si) && (ot = !1);
    }
    return ee.delete(_), ee.delete(b), ot;
  }
  function El(_) {
    return Ep(_, Lp, Ip);
  }
  function wi(_, b) {
    var $ = _.__data__;
    return Ap(b) ? $[typeof b == "string" ? "string" : "hash"] : $.map;
  }
  function Mn(_, b) {
    var $ = Me(_, b);
    return wp($) ? $ : void 0;
  }
  function Cp(_) {
    var b = St.call(_, hn), $ = _[hn];
    try {
      _[hn] = void 0;
      var Y = !0;
    } catch {
    }
    var de = ll.call(_);
    return Y && (b ? _[hn] = $ : delete _[hn]), de;
  }
  var Ip = dl ? function(_) {
    return _ == null ? [] : (_ = Object(_), A(dl(_), function(b) {
      return fl.call(_, b);
    }));
  } : Pp, zt = vr;
  (Jo && zt(new Jo(new ArrayBuffer(1))) != K || yr && zt(new yr()) != f || Zo && zt(Zo.resolve()) != S || Ko && zt(new Ko()) != D || Qo && zt(new Qo()) != x) && (zt = function(_) {
    var b = vr(_), $ = b == y ? _.constructor : void 0, Y = $ ? gn($) : "";
    if (Y)
      switch (Y) {
        case Gh:
          return K;
        case zh:
          return f;
        case qh:
          return S;
        case Vh:
          return D;
        case Wh:
          return x;
      }
    return b;
  });
  function bp(_, b) {
    return b = b ?? s, !!b && (typeof _ == "number" || re.test(_)) && _ > -1 && _ % 1 == 0 && _ < b;
  }
  function Ap(_) {
    var b = typeof _;
    return b == "string" || b == "number" || b == "symbol" || b == "boolean" ? _ !== "__proto__" : _ === null;
  }
  function Tp(_) {
    return !!al && al in _;
  }
  function Dp(_) {
    var b = _ && _.constructor, $ = typeof b == "function" && b.prototype || Ht;
    return _ === $;
  }
  function Np(_) {
    return ll.call(_);
  }
  function gn(_) {
    if (_ != null) {
      try {
        return sl.call(_);
      } catch {
      }
      try {
        return _ + "";
      } catch {
      }
    }
    return "";
  }
  function yl(_, b) {
    return _ === b || _ !== _ && b !== b;
  }
  var Op = pl(/* @__PURE__ */ function() {
    return arguments;
  }()) ? pl : function(_) {
    return _r(_) && St.call(_, "callee") && !fl.call(_, "callee");
  }, vi = Array.isArray;
  function Rp(_) {
    return _ != null && vl(_.length) && !wl(_);
  }
  var ts = jh || Fp;
  function $p(_, b) {
    return ml(_, b);
  }
  function wl(_) {
    if (!_l(_))
      return !1;
    var b = vr(_);
    return b == w || b == m || b == h || b == C;
  }
  function vl(_) {
    return typeof _ == "number" && _ > -1 && _ % 1 == 0 && _ <= s;
  }
  function _l(_) {
    var b = typeof _;
    return _ != null && (b == "object" || b == "function");
  }
  function _r(_) {
    return _ != null && typeof _ == "object";
  }
  var Sl = d ? xe(d) : vp;
  function Lp(_) {
    return Rp(_) ? gp(_) : _p(_);
  }
  function Pp() {
    return [];
  }
  function Fp() {
    return !1;
  }
  e.exports = $p;
})(oo, oo.exports);
var y1 = oo.exports;
Object.defineProperty(oi, "__esModule", { value: !0 });
oi.DownloadedUpdateHelper = void 0;
oi.createTempUpdateFile = x1;
const w1 = ur, v1 = lt, Hc = y1, wn = cn, Zn = ce;
class _1 {
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
    return Zn.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, n, r, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return Hc(this.versionInfo, n) && Hc(this.fileInfo.info, r.info) && await (0, wn.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(r, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, n, r, i, o, s) {
    this._file = t, this._packageFile = n, this.versionInfo = r, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, s && await (0, wn.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, wn.emptyDir)(this.cacheDirForPendingUpdate);
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
    if (!await (0, wn.pathExists)(r))
      return null;
    let o;
    try {
      o = await (0, wn.readJson)(r);
    } catch (c) {
      let u = "No cached update info available";
      return c.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), u += ` (error on read: ${c.message})`), n.info(u), null;
    }
    const s = o == null ? void 0 : o.fileName;
    if (!(typeof s == "string" && s.length > 0 && Zn.basename(s) === s))
      return n.warn("Cached update info is corrupted: invalid fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return n.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const l = Zn.join(this.cacheDirForPendingUpdate, s);
    if (!await (0, wn.pathExists)(l))
      return n.info("Cached update file doesn't exist"), null;
    const h = await S1(l);
    return t.info.sha512 !== h ? (n.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${h}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, l);
  }
  getUpdateInfoFile() {
    return Zn.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
oi.DownloadedUpdateHelper = _1;
function S1(e, t = "sha512", n = "base64", r) {
  return new Promise((i, o) => {
    const s = (0, w1.createHash)(t);
    s.on("error", o).setEncoding(n), (0, v1.createReadStream)(e, {
      ...r,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      s.end(), i(s.read());
    }).pipe(s, { end: !1 });
  });
}
async function x1(e, t, n) {
  let r = 0, i = Zn.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, wn.unlink)(i), i;
    } catch (s) {
      if (s.code === "ENOENT")
        return i;
      n.warn(`Error on remove temp update file: ${s}`), i = Zn.join(t, `${r++}-${e}`);
    }
  return i;
}
var bo = {}, Ba = {};
Object.defineProperty(Ba, "__esModule", { value: !0 });
Ba.getAppCacheDir = I1;
const vs = ce, C1 = uo;
function I1() {
  const e = (0, C1.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || vs.join(e, "AppData", "Local") : process.platform === "darwin" ? t = vs.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || vs.join(e, ".cache"), t;
}
Object.defineProperty(bo, "__esModule", { value: !0 });
bo.ElectronAppAdapter = void 0;
const Gc = ce, b1 = Ba;
class A1 {
  constructor(t = Nn.app) {
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
    return this.isPackaged ? Gc.join(process.resourcesPath, "app-update.yml") : Gc.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, b1.getAppCacheDir)();
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
bo.ElectronAppAdapter = A1;
var Kd = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = n;
  const t = De;
  e.NET_SESSION_NAME = "electron-updater";
  function n() {
    return Nn.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class r extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, s, a) {
      return await a.cancellationToken.createPromise((l, h, c) => {
        const u = {
          headers: a.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, u), (0, t.configureRequestOptions)(u), this.doDownload(u, {
          destination: s,
          options: a,
          onCancel: c,
          callback: (p) => {
            p == null ? l(s) : h(p);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(o, s) {
      o.headers && o.headers.Host && (o.host = o.headers.Host, delete o.headers.Host), this.cachedSession == null && (this.cachedSession = n());
      const a = Nn.net.request({
        ...o,
        session: this.cachedSession
      });
      return a.on("response", s), this.proxyLoginCallback != null && a.on("login", this.proxyLoginCallback), a;
    }
    addRedirectHandlers(o, s, a, l, h) {
      o.on("redirect", (c, u, p) => {
        o.abort(), l > this.maxRedirects ? a(this.createMaxRedirectError()) : h(t.HttpExecutor.prepareRedirectUrlOptions(p, s));
      });
    }
  }
  e.ElectronHttpExecutor = r;
})(Kd);
var si = {}, _t = {};
Object.defineProperty(_t, "__esModule", { value: !0 });
_t.newBaseUrl = T1;
_t.newUrlFromBase = D1;
_t.getChannelFilename = N1;
const Qd = ln;
function T1(e) {
  const t = new Qd.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function D1(e, t, n = !1) {
  const r = new Qd.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? r.search = i : n && (r.search = `noCache=${Date.now().toString(32)}`), r;
}
function N1(e) {
  return `${e}.yml`;
}
var be = {}, O1 = "[object Symbol]", eh = /[\\^$.*+?()[\]{}|]/g, R1 = RegExp(eh.source), $1 = typeof Ge == "object" && Ge && Ge.Object === Object && Ge, L1 = typeof self == "object" && self && self.Object === Object && self, P1 = $1 || L1 || Function("return this")(), F1 = Object.prototype, U1 = F1.toString, zc = P1.Symbol, qc = zc ? zc.prototype : void 0, Vc = qc ? qc.toString : void 0;
function M1(e) {
  if (typeof e == "string")
    return e;
  if (B1(e))
    return Vc ? Vc.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function k1(e) {
  return !!e && typeof e == "object";
}
function B1(e) {
  return typeof e == "symbol" || k1(e) && U1.call(e) == O1;
}
function j1(e) {
  return e == null ? "" : M1(e);
}
function H1(e) {
  return e = j1(e), e && R1.test(e) ? e.replace(eh, "\\$&") : e;
}
var th = H1;
Object.defineProperty(be, "__esModule", { value: !0 });
be.Provider = void 0;
be.findFile = W1;
be.parseUpdateInfo = Y1;
be.getFileList = nh;
be.resolveFiles = X1;
const on = De, G1 = Fe, z1 = ln, so = _t, q1 = th;
class V1 {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  // By default, the blockmap file is in the same directory as the main file
  // But some providers may have a different blockmap file, so we need to override this method
  getBlockMapFiles(t, n, r, i = null) {
    const o = (0, so.newUrlFromBase)(`${t.pathname}.blockmap`, t);
    return [(0, so.newUrlFromBase)(`${t.pathname.replace(new RegExp(q1(r), "g"), n)}.blockmap`, i ? new z1.URL(i) : t), o];
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
    return this.requestHeaders == null ? n != null && (r.headers = n) : r.headers = n == null ? this.requestHeaders : { ...this.requestHeaders, ...n }, (0, on.configureRequestUrl)(t, r), r;
  }
}
be.Provider = V1;
function W1(e, t, n) {
  var r;
  if (e.length === 0)
    throw (0, on.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const i = e.filter((s) => s.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`)), o = (r = i.find((s) => [s.url.pathname, s.info.url].some((a) => a.includes(process.arch)))) !== null && r !== void 0 ? r : i.shift();
  return o || (n == null ? e[0] : e.find((s) => !n.some((a) => s.url.pathname.toLowerCase().endsWith(`.${a.toLowerCase()}`))));
}
function Y1(e, t, n) {
  if (e == null)
    throw (0, on.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let r;
  try {
    r = (0, G1.load)(e);
  } catch (i) {
    throw (0, on.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return r;
}
function nh(e) {
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
  throw (0, on.newError)(`No files provided: ${(0, on.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function X1(e, t, n = (r) => r) {
  const i = nh(e).map((a) => {
    if (a.sha2 == null && a.sha512 == null)
      throw (0, on.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, on.safeStringifyJson)(a)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, so.newUrlFromBase)(n(a.url), t),
      info: a
    };
  }), o = e.packages, s = o == null ? null : o[process.arch] || o.ia32;
  return s != null && (i[0].packageInfo = {
    ...s,
    path: (0, so.newUrlFromBase)(n(s.path), t).href
  }), i;
}
Object.defineProperty(si, "__esModule", { value: !0 });
si.GenericProvider = void 0;
const Wc = De, _s = _t, Ss = be;
class J1 extends Ss.Provider {
  constructor(t, n, r) {
    super(r), this.configuration = t, this.updater = n, this.baseUrl = (0, _s.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, _s.getChannelFilename)(this.channel), n = (0, _s.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let r = 0; ; r++)
      try {
        return (0, Ss.parseUpdateInfo)(await this.httpRequest(n), t, n);
      } catch (i) {
        if (i instanceof Wc.HttpError && i.statusCode === 404)
          throw (0, Wc.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
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
    return (0, Ss.resolveFiles)(t, this.baseUrl);
  }
}
si.GenericProvider = J1;
var Ao = {}, To = {};
Object.defineProperty(To, "__esModule", { value: !0 });
To.BitbucketProvider = void 0;
const Yc = De, xs = _t, Cs = be;
class Z1 extends Cs.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, xs.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new Yc.CancellationToken(), n = (0, xs.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, xs.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, void 0, t);
      return (0, Cs.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, Yc.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Cs.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: n } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${n}, channel: ${this.channel})`;
  }
}
To.BitbucketProvider = Z1;
var sn = {};
Object.defineProperty(sn, "__esModule", { value: !0 });
sn.GitHubProvider = sn.BaseGitHubProvider = void 0;
sn.computeReleaseNotes = ih;
const Ut = De, bt = Zd, K1 = ln, Kn = _t, ta = be, Is = /\/tag\/(v?[^/]+)$/;
class rh extends ta.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Kn.newBaseUrl)((0, Ut.githubUrl)(t, n));
    const i = n === "github.com" ? "api.github.com" : n;
    this.baseApiUrl = (0, Kn.newBaseUrl)((0, Ut.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const n = this.options.host;
    return n && !["github.com", "api.github.com"].includes(n) ? `/api/v3${t}` : t;
  }
}
sn.BaseGitHubProvider = rh;
class Q1 extends rh {
  constructor(t, n, r) {
    super(t, "github.com", r), this.options = t, this.updater = n;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, n, r, i, o;
    const s = new Ut.CancellationToken(), a = await this.httpRequest((0, Kn.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, s), l = (0, Ut.parseXml)(a);
    let h = l.element("entry", !1, "No published versions on GitHub"), c = null;
    try {
      if (this.updater.allowPrerelease) {
        const g = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((n = bt.prerelease(this.updater.currentVersion)) === null || n === void 0 ? void 0 : n[0]) || null;
        if (g === null)
          c = Is.exec(h.element("link").attribute("href"))[1];
        else
          for (const v of l.getElements("entry")) {
            const y = Is.exec(v.element("link").attribute("href"));
            if (y === null)
              continue;
            const S = y[1];
            if (!bt.valid(S))
              continue;
            const C = ((r = bt.prerelease(S)) === null || r === void 0 ? void 0 : r[0]) || null, N = !g || ["alpha", "beta"].includes(g), D = C !== null && !["alpha", "beta"].includes(String(C));
            if (N && !D && !(g === "beta" && C === "alpha")) {
              c = S, h = v;
              break;
            }
            if (C && C === g) {
              c = S, h = v;
              break;
            }
          }
      } else {
        c = await this.getLatestTagName(s);
        for (const g of l.getElements("entry")) {
          const v = Is.exec(g.element("link").attribute("href"));
          if (v != null && v[1] === c) {
            h = g;
            break;
          }
        }
      }
    } catch (g) {
      throw (0, Ut.newError)(`Cannot parse releases feed: ${g.stack || g.message},
XML:
${a}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (c == null)
      throw (0, Ut.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let u, p = "", w = "";
    const m = async (g) => {
      p = (0, Kn.getChannelFilename)(g), w = (0, Kn.newUrlFromBase)(this.getBaseDownloadPath(String(c), p), this.baseUrl);
      const v = this.createRequestOptions(w);
      try {
        return await this.executor.request(v, s);
      } catch (y) {
        throw y instanceof Ut.HttpError && y.statusCode === 404 ? (0, Ut.newError)(`Cannot find ${p} in the latest release artifacts (${w}): ${y.stack || y.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : y;
      }
    };
    try {
      let g = this.channel;
      this.updater.allowPrerelease && (!((i = bt.prerelease(c)) === null || i === void 0) && i[0]) && (g = this.getCustomChannelName(String((o = bt.prerelease(c)) === null || o === void 0 ? void 0 : o[0]))), u = await m(g);
    } catch (g) {
      if (this.updater.allowPrerelease)
        u = await m(this.getDefaultChannelName());
      else
        throw g;
    }
    const f = (0, ta.parseUpdateInfo)(u, p, w);
    return f.releaseName == null && (f.releaseName = h.elementValueOrEmpty("title")), f.releaseNotes == null && (f.releaseNotes = ih(this.updater.currentVersion, this.updater.fullChangelog, l, h)), {
      tag: c,
      ...f
    };
  }
  async getLatestTagName(t) {
    const n = this.options, r = n.host == null || n.host === "github.com" ? (0, Kn.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new K1.URL(`${this.computeGithubBasePath(`/repos/${n.owner}/${n.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(r, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, Ut.newError)(`Unable to find latest version on GitHub (${r}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, ta.resolveFiles)(t, this.baseUrl, (n) => this.getBaseDownloadPath(t.tag, n.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, n) {
    return `${this.basePath}/download/${t}/${n}`;
  }
}
sn.GitHubProvider = Q1;
function Xc(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function ih(e, t, n, r) {
  if (!t)
    return Xc(r);
  const i = /\/tag\/v?([^/]+)$/;
  let o;
  try {
    o = i.exec(r.element("link").attribute("href"))[1], o = bt.valid(o) ? o : void 0;
  } catch {
  }
  if (o == null)
    return null;
  const s = [];
  for (const a of n.getElements("entry")) {
    let l;
    try {
      const u = i.exec(a.element("link").attribute("href"));
      if (!u)
        continue;
      l = u[1];
    } catch {
      continue;
    }
    if (!bt.valid(l))
      continue;
    const h = bt.gt(l, e.raw), c = bt.lte(l, o);
    h && c && s.push({
      version: l,
      note: Xc(a)
    });
  }
  return s.sort((a, l) => bt.rcompare(a.version, l.version));
}
var Do = {};
Object.defineProperty(Do, "__esModule", { value: !0 });
Do.GitLabProvider = void 0;
const Le = De, bs = ln, eS = th, Pi = _t, As = be;
class tS extends As.Provider {
  /**
   * Normalizes filenames by replacing spaces and underscores with dashes.
   *
   * This is a workaround to handle filename formatting differences between tools:
   * - electron-builder formats filenames like "test file.txt" as "test-file.txt"
   * - GitLab may provide asset URLs using underscores, such as "test_file.txt"
   *
   * Because of this mismatch, we can't reliably extract the correct filename from
   * the asset path without normalization. This function ensures consistent matching
   * across different filename formats by converting all spaces and underscores to dashes.
   *
   * @param filename The filename to normalize
   * @returns The normalized filename with spaces and underscores replaced by dashes
   */
  normalizeFilename(t) {
    return t.replace(/ |_/g, "-");
  }
  constructor(t, n, r) {
    super({
      ...r,
      // GitLab might not support multiple range requests efficiently
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.updater = n, this.cachedLatestVersion = null;
    const o = t.host || "gitlab.com";
    this.baseApiUrl = (0, Pi.newBaseUrl)(`https://${o}/api/v4`);
  }
  createRequestOptions(t, n) {
    const r = super.createRequestOptions(t, n);
    return r.redirect = "manual", r;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = new Le.CancellationToken(), n = (0, Pi.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl), r = { Accept: "application/json", ...this.setAuthHeaderForToken(this.options.token || null) };
    let i;
    try {
      i = await this.httpRequest(n, r, t);
    } catch (w) {
      throw (0, Le.newError)(`Unable to find latest release on GitLab (${n}): ${w.stack || w.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
    if (!i)
      throw (0, Le.newError)("No published releases on GitLab", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let o;
    try {
      o = JSON.parse(i);
    } catch (w) {
      throw (0, Le.newError)(`Unable to parse latest release response from GitLab (${n}): response was not valid JSON: ${w.stack || w.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
    if (o.upcoming_release)
      throw (0, Le.newError)("Latest GitLab release is scheduled but not yet published", "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    const s = o.tag_name;
    let a = null, l = "", h = null;
    const c = async (w) => {
      l = (0, Pi.getChannelFilename)(w);
      const m = o.assets.links.find((v) => v.name === l);
      if (!m)
        throw (0, Le.newError)(`Cannot find ${l} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      h = new bs.URL(m.direct_asset_url);
      const f = this.setAuthHeaderForToken(this.options.token || null), g = Object.keys(f).length ? f : void 0;
      try {
        const v = await this.httpRequest(h, g, t);
        if (!v)
          throw (0, Le.newError)(`Empty response from ${h}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        return v;
      } catch (v) {
        throw v instanceof Le.HttpError && v.statusCode === 404 ? (0, Le.newError)(`Cannot find ${l} in the latest release artifacts (${h}): ${v.stack || v.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : v;
      }
    };
    try {
      a = await c(this.channel);
    } catch (w) {
      if (this.channel !== this.getDefaultChannelName())
        a = await c(this.getDefaultChannelName());
      else
        throw w;
    }
    if (!a)
      throw (0, Le.newError)(`Unable to parse channel data from ${l}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    const u = (0, As.parseUpdateInfo)(a, l, h);
    u.releaseName == null && (u.releaseName = o.name), u.releaseNotes == null && (u.releaseNotes = o.description || null);
    const p = {
      tag: s,
      assets: this.convertAssetsToMap(o.assets),
      ...u
    };
    return this.cachedLatestVersion = p, p;
  }
  /**
   * Utility function to convert GitlabReleaseAsset to Map<string, string>
   * Maps asset names to their download URLs
   */
  convertAssetsToMap(t) {
    const n = /* @__PURE__ */ new Map();
    for (const r of t.links)
      n.set(this.normalizeFilename(r.name), r.direct_asset_url);
    return n;
  }
  /**
   * Find blockmap file URL in assets map for a specific filename
   */
  findBlockMapInAssets(t, n) {
    const r = [`${n}.blockmap`, `${this.normalizeFilename(n)}.blockmap`];
    for (const i of r) {
      const o = t.get(i);
      if (o)
        return new bs.URL(o);
    }
    return null;
  }
  async fetchReleaseInfoByVersion(t) {
    const n = new Le.CancellationToken(), r = [`v${t}`, t];
    for (const i of r) {
      const o = (0, Pi.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(i)}`, this.baseApiUrl);
      try {
        const s = { Accept: "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, a = await this.httpRequest(o, s, n);
        if (a)
          return JSON.parse(a);
      } catch (s) {
        if (s instanceof Le.HttpError && s.statusCode === 404)
          continue;
        throw (0, Le.newError)(`Unable to find release ${i} on GitLab (${o}): ${s.stack || s.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
      }
    }
    throw (0, Le.newError)(`Unable to find release with version ${t} (tried: ${r.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
  }
  setAuthHeaderForToken(t) {
    const n = {};
    return t != null && (t.startsWith("Bearer") ? n.authorization = t : n["PRIVATE-TOKEN"] = t), n;
  }
  /**
   * Get version info for blockmap files, using cache when possible
   */
  async getVersionInfoForBlockMap(t) {
    if (this.cachedLatestVersion && this.cachedLatestVersion.version === t)
      return this.cachedLatestVersion.assets;
    const n = await this.fetchReleaseInfoByVersion(t);
    return n && n.assets ? this.convertAssetsToMap(n.assets) : null;
  }
  /**
   * Find blockmap URLs from version assets
   */
  async findBlockMapUrlsFromAssets(t, n, r) {
    let i = null, o = null;
    const s = await this.getVersionInfoForBlockMap(n);
    s && (i = this.findBlockMapInAssets(s, r));
    const a = await this.getVersionInfoForBlockMap(t);
    if (a) {
      const l = r.replace(new RegExp(eS(n), "g"), t);
      o = this.findBlockMapInAssets(a, l);
    }
    return [o, i];
  }
  async getBlockMapFiles(t, n, r, i = null) {
    if (this.options.uploadTarget === "project_upload") {
      const o = t.pathname.split("/").pop() || "", [s, a] = await this.findBlockMapUrlsFromAssets(n, r, o);
      if (!a)
        throw (0, Le.newError)(`Cannot find blockmap file for ${r} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      if (!s)
        throw (0, Le.newError)(`Cannot find blockmap file for ${n} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      return [s, a];
    } else
      return super.getBlockMapFiles(t, n, r, i);
  }
  resolveFiles(t) {
    return (0, As.getFileList)(t).map((n) => {
      const i = [
        n.url,
        // Original filename
        this.normalizeFilename(n.url)
        // Normalized filename (spaces/underscores → dashes)
      ].find((s) => t.assets.has(s)), o = i ? t.assets.get(i) : void 0;
      if (!o)
        throw (0, Le.newError)(`Cannot find asset "${n.url}" in GitLab release assets. Available assets: ${Array.from(t.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new bs.URL(o),
        info: n
      };
    });
  }
  toString() {
    return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
  }
}
Do.GitLabProvider = tS;
var No = {};
Object.defineProperty(No, "__esModule", { value: !0 });
No.KeygenProvider = void 0;
const Jc = De, Ts = _t, Ds = be;
class nS extends Ds.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, Ts.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new Jc.CancellationToken(), n = (0, Ts.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, Ts.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, Ds.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, Jc.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Ds.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: n, platform: r } = this.configuration;
    return `Keygen (account: ${t}, product: ${n}, platform: ${r}, channel: ${this.channel})`;
  }
}
No.KeygenProvider = nS;
var Oo = {};
Object.defineProperty(Oo, "__esModule", { value: !0 });
Oo.PrivateGitHubProvider = void 0;
const Bn = De, rS = Fe, iS = ce, Zc = ln, Kc = _t, oS = sn, sS = be;
class aS extends oS.BaseGitHubProvider {
  constructor(t, n, r, i) {
    super(t, "api.github.com", i), this.updater = n, this.token = r;
  }
  createRequestOptions(t, n) {
    const r = super.createRequestOptions(t, n);
    return r.redirect = "manual", r;
  }
  async getLatestVersion() {
    const t = new Bn.CancellationToken(), n = (0, Kc.getChannelFilename)(this.getDefaultChannelName()), r = await this.getLatestVersionInfo(t), i = r.assets.find((a) => a.name === n);
    if (i == null)
      throw (0, Bn.newError)(`Cannot find ${n} in the release ${r.html_url || r.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new Zc.URL(i.url);
    let s;
    try {
      s = (0, rS.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (a) {
      throw a instanceof Bn.HttpError && a.statusCode === 404 ? (0, Bn.newError)(`Cannot find ${n} in the latest release artifacts (${o}): ${a.stack || a.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : a;
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
    const i = (0, Kc.newUrlFromBase)(r, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      if (n) {
        const s = o.filter((a) => !a.draft);
        return s.find((a) => a.prerelease) || s[0];
      } else
        return o;
    } catch (o) {
      throw (0, Bn.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, sS.getFileList)(t).map((n) => {
      const r = iS.posix.basename(n.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === r);
      if (i == null)
        throw (0, Bn.newError)(`Cannot find asset "${r}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Zc.URL(i.url),
        info: n
      };
    });
  }
}
Oo.PrivateGitHubProvider = aS;
Object.defineProperty(Ao, "__esModule", { value: !0 });
Ao.isUrlProbablySupportMultiRangeRequests = oh;
Ao.createClient = hS;
const Fi = De, lS = To, Qc = si, cS = sn, uS = Do, fS = No, dS = Oo;
function oh(e) {
  return !e.includes("s3.amazonaws.com");
}
function hS(e, t, n) {
  if (typeof e == "string")
    throw (0, Fi.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const r = e.provider;
  switch (r) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new cS.GitHubProvider(i, t, n) : new dS.PrivateGitHubProvider(i, t, o, n);
    }
    case "bitbucket":
      return new lS.BitbucketProvider(e, t, n);
    case "gitlab":
      return new uS.GitLabProvider(e, t, n);
    case "keygen":
      return new fS.KeygenProvider(e, t, n);
    case "s3":
    case "spaces":
      return new Qc.GenericProvider({
        provider: "generic",
        url: (0, Fi.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...n,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new Qc.GenericProvider(i, t, {
        ...n,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && oh(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, Fi.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, n);
    }
    default:
      throw (0, Fi.newError)(`Unsupported provider: ${r}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var Ro = {}, ai = {}, pr = {}, Fn = {};
Object.defineProperty(Fn, "__esModule", { value: !0 });
Fn.OperationKind = void 0;
Fn.computeOperations = pS;
var In;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(In || (Fn.OperationKind = In = {}));
function pS(e, t, n) {
  const r = tu(e.files), i = tu(t.files);
  let o = null;
  const s = t.files[0], a = [], l = s.name, h = r.get(l);
  if (h == null)
    throw new Error(`no file ${l} in old blockmap`);
  const c = i.get(l);
  let u = 0;
  const { checksumToOffset: p, checksumToOldSize: w } = gS(r.get(l), h.offset, n);
  let m = s.offset;
  for (let f = 0; f < c.checksums.length; m += c.sizes[f], f++) {
    const g = c.sizes[f], v = c.checksums[f];
    let y = p.get(v);
    y != null && w.get(v) !== g && (n.warn(`Checksum ("${v}") matches, but size differs (old: ${w.get(v)}, new: ${g})`), y = void 0), y === void 0 ? (u++, o != null && o.kind === In.DOWNLOAD && o.end === m ? o.end += g : (o = {
      kind: In.DOWNLOAD,
      start: m,
      end: m + g
      // oldBlocks: null,
    }, eu(o, a, v, f))) : o != null && o.kind === In.COPY && o.end === y ? o.end += g : (o = {
      kind: In.COPY,
      start: y,
      end: y + g
      // oldBlocks: [checksum]
    }, eu(o, a, v, f));
  }
  return u > 0 && n.info(`File${s.name === "file" ? "" : " " + s.name} has ${u} changed blocks`), a;
}
const mS = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function eu(e, t, n, r) {
  if (mS && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((s, a) => s < a ? s : a);
      throw new Error(`operation (block index: ${r}, checksum: ${n}, kind: ${In[e.kind]}) overlaps previous operation (checksum: ${n}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function gS(e, t, n) {
  const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let s = 0; s < e.checksums.length; s++) {
    const a = e.checksums[s], l = e.sizes[s], h = i.get(a);
    if (h === void 0)
      r.set(a, o), i.set(a, l);
    else if (n.debug != null) {
      const c = h === l ? "(same size)" : `(size: ${h}, this size: ${l})`;
      n.debug(`${a} duplicated in blockmap ${c}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += l;
  }
  return { checksumToOffset: r, checksumToOldSize: i };
}
function tu(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.set(n.name, n);
  return t;
}
Object.defineProperty(pr, "__esModule", { value: !0 });
pr.DataSplitter = void 0;
pr.copyData = sh;
const Ui = De, ES = lt, yS = Et, wS = Fn, na = Buffer.from(`\r
\r
`), nu = Buffer.from(`

`), vS = na.length - 1, _S = 4, SS = 3;
function xS(e) {
  const t = e.indexOf(na), n = e.indexOf(nu);
  return n !== -1 && (t === -1 || n < t) ? { end: n + nu.length, lineFeedOnly: !0 } : t !== -1 ? { end: t + na.length, lineFeedOnly: !1 } : null;
}
var Jt;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(Jt || (Jt = {}));
function sh(e, t, n, r, i) {
  const o = (0, ES.createReadStream)("", {
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
class CS extends yS.Writable {
  constructor(t, n, r, i, o, s, a, l) {
    super(), this.out = t, this.options = n, this.partIndexToTaskIndex = r, this.partIndexToLength = o, this.finishHandler = s, this.grandTotalBytes = a, this.onProgress = l, this.start = Date.now(), this.nextUpdate = this.start + 1e3, this.transferred = 0, this.delta = 0, this.partIndex = -1, this.headerListTail = null, this.readState = Jt.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryTextLength = i.length, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
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
    this.handleData(t).then(() => {
      if (this.onProgress) {
        const i = Date.now();
        (i >= this.nextUpdate || this.transferred === this.grandTotalBytes) && this.grandTotalBytes && (i - this.start) / 1e3 && (this.nextUpdate = i + 1e3, this.onProgress({
          total: this.grandTotalBytes,
          delta: this.delta,
          transferred: this.transferred,
          percent: this.transferred / this.grandTotalBytes * 100,
          bytesPerSecond: Math.round(this.transferred / ((i - this.start) / 1e3))
        }), this.delta = 0);
      }
      r();
    }).catch(r);
  }
  async handleData(t) {
    let n = 0;
    if (this.ignoreByteCount !== 0 && this.remainingPartDataCount !== 0)
      throw (0, Ui.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const r = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= r, n = r;
    } else if (this.remainingPartDataCount > 0) {
      const r = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= r, await this.processPartData(t, 0, r), n = r;
    }
    if (n !== t.length) {
      if (this.readState === Jt.HEADER) {
        const r = this.searchHeaderListEnd(t, n);
        if (r === -1)
          return;
        n = r, this.readState = Jt.BODY;
      }
      for (; ; ) {
        if (this.readState === Jt.BODY)
          this.readState = Jt.INIT;
        else {
          this.partIndex++;
          let s = this.partIndexToTaskIndex.get(this.partIndex);
          if (s == null)
            if (this.isFinished)
              s = this.options.end;
            else
              throw (0, Ui.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (a < s)
            await this.copyExistingData(a, s);
          else if (a > s)
            throw (0, Ui.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (n = this.searchHeaderListEnd(t, n), n === -1) {
            this.readState = Jt.HEADER;
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
        if (s.kind !== wS.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        sh(s, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, n) {
    const r = this.headerListTail, i = r == null ? 0 : r.length, o = r == null ? t.subarray(n) : Buffer.concat([r, t.subarray(n)]), s = xS(o);
    return s != null ? (this.headerListTail = null, this.boundaryLength = this.boundaryTextLength + (s.lineFeedOnly ? SS : _S), n + s.end - i) : (this.headerListTail = Buffer.from(o.subarray(Math.max(0, o.length - vS))), -1);
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Ui.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
    this.actualPartLength = 0;
  }
  processPartStarted(t, n, r) {
    return this.partIndex !== 0 && this.onPartEnd(), this.processPartData(t, n, r);
  }
  processPartData(t, n, r) {
    this.actualPartLength += r - n, this.transferred += r - n, this.delta += r - n;
    const i = this.out;
    return i.write(n === 0 && t.length === r ? t : t.slice(n, r)) ? Promise.resolve() : new Promise((o, s) => {
      i.on("error", s), i.once("drain", () => {
        i.removeListener("error", s), o();
      });
    });
  }
}
pr.DataSplitter = CS;
var $o = {};
Object.defineProperty($o, "__esModule", { value: !0 });
$o.executeTasksUsingMultipleRangeRequests = IS;
$o.checkIsRangesSupported = ia;
const ra = De, ru = pr, iu = Fn;
function IS(e, t, n, r, i) {
  const o = (s) => {
    if (s >= t.length) {
      e.fileMetadataBuffer != null && n.write(e.fileMetadataBuffer), n.end();
      return;
    }
    const a = s + 1e3;
    bS(e, {
      tasks: t,
      start: s,
      end: Math.min(t.length, a),
      oldFileFd: r
    }, n, () => o(a), i);
  };
  return o;
}
function bS(e, t, n, r, i) {
  let o = "bytes=", s = 0, a = 0;
  const l = /* @__PURE__ */ new Map(), h = [];
  for (let p = t.start; p < t.end; p++) {
    const w = t.tasks[p];
    w.kind === iu.OperationKind.DOWNLOAD && (o += `${w.start}-${w.end - 1}, `, l.set(s, p), s++, h.push(w.end - w.start), a += w.end - w.start);
  }
  if (s <= 1) {
    const p = (w) => {
      if (w >= t.end) {
        r();
        return;
      }
      const m = t.tasks[w++];
      if (m.kind === iu.OperationKind.COPY)
        (0, ru.copyData)(m, n, t.oldFileFd, i, () => p(w));
      else {
        const f = e.createRequestOptions();
        f.headers.Range = `bytes=${m.start}-${m.end - 1}`;
        const g = e.httpExecutor.createRequest(f, (v) => {
          v.on("error", i), ia(v, i) && (v.pipe(n, {
            end: !1
          }), v.once("end", () => p(w)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(g, i), g.end();
      }
    };
    p(t.start);
    return;
  }
  const c = e.createRequestOptions();
  c.headers.Range = o.substring(0, o.length - 2);
  const u = e.httpExecutor.createRequest(c, (p) => {
    if (!ia(p, i))
      return;
    const w = (0, ra.safeGetHeader)(p, "content-type"), m = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(w);
    if (m == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${w}"`));
      return;
    }
    let f = !1, g = null;
    const v = () => {
      f = !0, g != null && (clearTimeout(g), g = null), r();
    }, y = new ru.DataSplitter(n, t, l, m[1] || m[2], h, v, a, e.options.onProgress);
    y.on("error", i), p.pipe(y), p.on("end", () => {
      f || (g = setTimeout(() => {
        g = null, !f && (u.abort(), i(new Error("Response ends without calling any handlers")));
      }, 1e4));
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(u, i), u.end();
}
function ia(e, t) {
  if (e.statusCode >= 400)
    return t((0, ra.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const n = (0, ra.safeGetHeader)(e, "accept-ranges");
    if (n == null || n === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var Lo = {};
Object.defineProperty(Lo, "__esModule", { value: !0 });
Lo.ProgressDifferentialDownloadCallbackTransform = void 0;
const AS = Et;
var Qn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Qn || (Qn = {}));
class TS extends AS.Transform {
  constructor(t, n, r) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = Qn.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == Qn.COPY) {
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
    this.operationType = Qn.COPY;
  }
  beginRangeDownload() {
    this.operationType = Qn.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
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
Lo.ProgressDifferentialDownloadCallbackTransform = TS;
Object.defineProperty(ai, "__esModule", { value: !0 });
ai.DifferentialDownloader = void 0;
const Ir = De, Ns = cn, DS = lt, NS = pr, OS = ln, Mi = Fn, ou = $o, RS = Lo;
class $S {
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
    return (0, Ir.configureRequestUrl)(this.options.newUrl, t), (0, Ir.configureRequestOptions)(t), t;
  }
  doDownload(t, n) {
    if (t.version !== n.version)
      throw new Error(`version is different (${t.version} - ${n.version}), full download is required`);
    const r = this.logger, i = (0, Mi.computeOperations)(t, n, r);
    r.debug != null && r.debug(JSON.stringify(i, null, 2));
    let o = 0, s = 0;
    for (const l of i) {
      const h = l.end - l.start;
      l.kind === Mi.OperationKind.DOWNLOAD ? o += h : s += h;
    }
    const a = this.blockAwareFileInfo.size;
    if (o + s + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== a)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${s}, newSize: ${a}`);
    return r.info(`Full: ${su(a)}, To download: ${su(o)} (${Math.round(o / (a / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const n = [], r = () => Promise.all(n.map((i) => (0, Ns.close)(i.descriptor).catch((o) => {
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
    const r = await (0, Ns.open)(this.options.oldFile, "r");
    n.push({ descriptor: r, path: this.options.oldFile });
    const i = await (0, Ns.open)(this.options.newFile, "w");
    n.push({ descriptor: i, path: this.options.newFile });
    const o = (0, DS.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((s, a) => {
      const l = [];
      let h;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const v = [];
        let y = 0;
        for (const C of t)
          C.kind === Mi.OperationKind.DOWNLOAD && (v.push(C.end - C.start), y += C.end - C.start);
        const S = {
          expectedByteCounts: v,
          grandTotal: y
        };
        h = new RS.ProgressDifferentialDownloadCallbackTransform(S, this.options.cancellationToken, this.options.onProgress), l.push(h);
      }
      const c = new Ir.DigestTransform(this.blockAwareFileInfo.sha512);
      c.isValidateOnEnd = !1, l.push(c), o.on("finish", () => {
        o.close(() => {
          n.splice(1, 1);
          try {
            c.validate();
          } catch (v) {
            a(v);
            return;
          }
          s(void 0);
        });
      }), l.push(o);
      let u = null;
      for (const v of l)
        v.on("error", a), u == null ? u = v : u = u.pipe(v);
      const p = l[0];
      let w;
      if (this.options.isUseMultipleRangeRequest) {
        w = (0, ou.executeTasksUsingMultipleRangeRequests)(this, t, p, r, a), w(0);
        return;
      }
      let m = 0, f = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const g = this.createRequestOptions();
      g.redirect = "manual", w = (v) => {
        var y, S;
        if (v >= t.length) {
          this.fileMetadataBuffer != null && p.write(this.fileMetadataBuffer), p.end();
          return;
        }
        const C = t[v++];
        if (C.kind === Mi.OperationKind.COPY) {
          h && h.beginFileCopy(), (0, NS.copyData)(C, p, r, a, () => w(v));
          return;
        }
        const N = `bytes=${C.start}-${C.end - 1}`;
        g.headers.range = N, (S = (y = this.logger) === null || y === void 0 ? void 0 : y.debug) === null || S === void 0 || S.call(y, `download range: ${N}`), h && h.beginRangeDownload();
        const D = this.httpExecutor.createRequest(g, (B) => {
          B.on("error", a), B.on("aborted", () => {
            a(new Error("response has been aborted by the server"));
          }), B.statusCode >= 400 && a((0, Ir.createHttpError)(B)), B.pipe(p, {
            end: !1
          }), B.once("end", () => {
            h && h.endRangeDownload(), ++m === 100 ? (m = 0, setTimeout(() => w(v), 1e3)) : w(v);
          });
        });
        D.on("redirect", (B, k, L) => {
          this.logger.info(`Redirect to ${LS(L)}`), f = L, (0, Ir.configureRequestUrl)(new OS.URL(f), g), D.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(D, a), D.end();
      }, w(0);
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
        (0, ou.checkIsRangesSupported)(s, i) && (s.on("error", i), s.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), s.on("data", n), s.on("end", () => r()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
ai.DifferentialDownloader = $S;
function su(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function LS(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(Ro, "__esModule", { value: !0 });
Ro.GenericDifferentialDownloader = void 0;
const PS = ai;
class FS extends PS.DifferentialDownloader {
  download(t, n) {
    return this.doDownload(t, n);
  }
}
Ro.GenericDifferentialDownloader = FS;
var un = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = r;
  const t = De;
  Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } }), e.DOWNLOAD_PROGRESS = "download-progress", e.UPDATE_DOWNLOADED = "update-downloaded";
  class n {
    constructor(o) {
      this.emitter = o;
    }
    /**
     * Emitted when an authenticating proxy is [asking for user credentials](https://github.com/electron/electron/blob/master/docs/api/client-request.md#event-login).
     */
    login(o) {
      r(this.emitter, "login", o);
    }
    progress(o) {
      r(this.emitter, e.DOWNLOAD_PROGRESS, o);
    }
    updateDownloaded(o) {
      r(this.emitter, e.UPDATE_DOWNLOADED, o);
    }
    updateCancelled(o) {
      r(this.emitter, "update-cancelled", o);
    }
  }
  e.UpdaterSignal = n;
  function r(i, o, s) {
    i.on(o, s);
  }
})(un);
Object.defineProperty(nn, "__esModule", { value: !0 });
nn.NoOpLogger = nn.AppUpdater = void 0;
const qe = De, US = ur, MS = uo, kS = co, tt = cn, BS = Fe, Os = vo, st = ce, vn = Zd, au = oi, jS = bo, lu = Kd, HS = si, Rs = Ao, $s = Zr, GS = Ro, jn = un;
class ja extends kS.EventEmitter {
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
  set channel(t) {
    if (this._channel != null) {
      if (typeof t != "string")
        throw (0, qe.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, qe.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
    }
    this._channel = t, this.allowDowngrade = !0;
  }
  /**
   *  Shortcut for explicitly adding auth tokens to request headers
   */
  addAuthHeader(t) {
    this.requestHeaders = Object.assign({}, this.requestHeaders, {
      authorization: t
    });
  }
  // noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  get netSession() {
    return (0, lu.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new ah();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new Os.Lazy(() => this.loadUpdateConfig());
  }
  /**
   * Allows developer to override default logic for determining if an update is supported.
   * The default logic compares the `UpdateInfo` minimum system version against the `os.release()` with `semver` package
   */
  get isUpdateSupported() {
    return this._isUpdateSupported;
  }
  set isUpdateSupported(t) {
    t && (this._isUpdateSupported = t);
  }
  /**
   * Allows developer to override default logic for determining if the user is below the rollout threshold.
   * The default logic compares the staging percentage with numerical representation of user ID.
   * An override can define custom logic, or bypass it if needed.
   */
  get isUserWithinRollout() {
    return this._isUserWithinRollout;
  }
  set isUserWithinRollout(t) {
    t && (this._isUserWithinRollout = t);
  }
  constructor(t, n) {
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new jn.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (o) => this.checkIfUpdateSupported(o), this._isUserWithinRollout = (o) => this.isStagingMatch(o), this.clientPromise = null, this.stagingUserIdPromise = new Os.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new Os.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (o) => {
      this._logger.error(`Error: ${o.stack || o.message}`);
    }), n == null ? (this.app = new jS.ElectronAppAdapter(), this.httpExecutor = new lu.ElectronHttpExecutor((o, s) => this.emit("login", o, s))) : (this.app = n, this.httpExecutor = null);
    const r = this.app.version, i = (0, vn.parse)(r);
    if (i == null)
      throw (0, qe.newError)(`App version is not a valid semver version: "${r}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = zS(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
  }
  //noinspection JSMethodCanBeStatic,JSUnusedGlobalSymbols
  getFeedURL() {
    return "Deprecated. Do not use it.";
  }
  /**
   * Configure update provider. If value is `string`, [GenericServerOptions](https://www.electron.build/publish#genericserveroptions) will be set with value as `url`.
   * @param options If you want to override configuration in the `app-update.yml`.
   */
  setFeedURL(t) {
    const n = this.createProviderRuntimeOptions();
    let r;
    typeof t == "string" ? r = new HS.GenericProvider({ provider: "generic", url: t }, this, {
      ...n,
      isUseMultipleRangeRequest: (0, Rs.isUrlProbablySupportMultiRangeRequests)(t)
    }) : r = (0, Rs.createClient)(t, this, n), this.clientPromise = Promise.resolve(r);
  }
  /**
   * Asks the server whether there is an update.
   * @returns null if the updater is disabled, otherwise info about the latest version
   */
  checkForUpdates() {
    if (!this.isUpdaterActive())
      return Promise.resolve(null);
    let t = this.checkForUpdatesPromise;
    if (t != null)
      return this._logger.info("Checking for update (already in progress)"), t;
    const n = () => this.checkForUpdatesPromise = null;
    return this._logger.info("Checking for update"), t = this.doCheckForUpdates().then((r) => (n(), r)).catch((r) => {
      throw n(), this.emit("error", r, `Cannot check for updates: ${(r.stack || r).toString()}`), r;
    }), this.checkForUpdatesPromise = t, t;
  }
  isUpdaterActive() {
    return this.app.isPackaged || this.forceDevUpdateConfig ? !0 : (this._logger.info("Skip checkForUpdates because application is not packed and dev update config is not forced"), !1);
  }
  // noinspection JSUnusedGlobalSymbols
  checkForUpdatesAndNotify(t) {
    return this.checkForUpdates().then((n) => n != null && n.downloadPromise ? (n.downloadPromise.then(() => {
      const r = ja.formatDownloadNotification(n.updateInfo.version, this.app.name, t);
      new Nn.Notification(r).show();
    }), n) : (this._logger.debug != null && this._logger.debug("checkForUpdatesAndNotify called, downloadPromise is null"), n));
  }
  static formatDownloadNotification(t, n, r) {
    return r == null && (r = {
      title: "A new update is ready to install",
      body: "{appName} version {version} has been downloaded and will be automatically installed on exit"
    }), r = {
      title: r.title.replace("{appName}", n).replace("{version}", t),
      body: r.body.replace("{appName}", n).replace("{version}", t)
    }, r;
  }
  async isStagingMatch(t) {
    const n = t.stagingPercentage;
    let r = n;
    if (r == null)
      return !0;
    if (r = parseInt(r, 10), isNaN(r))
      return this._logger.warn(`Staging percentage is NaN: ${n}`), !0;
    r = r / 100;
    const i = await this.stagingUserIdPromise.value, s = qe.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${r}, percentage: ${s}, user id: ${i}`), s < r;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const n = (0, vn.parse)(t.version);
    if (n == null)
      throw (0, qe.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const r = this.currentVersion;
    if ((0, vn.eq)(n, r) || !await Promise.resolve(this.isUpdateSupported(t)) || !await Promise.resolve(this.isUserWithinRollout(t)))
      return !1;
    const o = (0, vn.gt)(n, r), s = (0, vn.lt)(n, r);
    return o ? !0 : this.allowDowngrade && s;
  }
  checkIfUpdateSupported(t) {
    const n = t == null ? void 0 : t.minimumSystemVersion, r = (0, MS.release)();
    if (n)
      try {
        if ((0, vn.lt)(r, n))
          return this._logger.info(`Current OS version ${r} is less than the minimum OS version required ${n} for version ${r}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${r}) with minimum OS version(${n}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((r) => (0, Rs.createClient)(r, this, this.createProviderRuntimeOptions())));
    const t = await this.clientPromise, n = await this.stagingUserIdPromise.value;
    return t.setRequestHeaders(this.computeFinalHeaders({ "x-user-staging-id": n })), {
      info: await t.getLatestVersion(),
      provider: t
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
    const t = await this.getUpdateInfoAndProvider(), n = t.info;
    if (!await this.isUpdateAvailable(n))
      return this._logger.info(`Update for version ${this.currentVersion.format()} is not available (latest version: ${n.version}, downgrade is ${this.allowDowngrade ? "allowed" : "disallowed"}).`), this.emit("update-not-available", n), {
        isUpdateAvailable: !1,
        versionInfo: n,
        updateInfo: n
      };
    this.updateInfoAndProvider = t, this.onUpdateAvailable(n);
    const r = new qe.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: n,
      updateInfo: n,
      cancellationToken: r,
      downloadPromise: this.autoDownload ? this.downloadUpdate(r) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, qe.asArray)(t.files).map((n) => n.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new qe.CancellationToken()) {
    const n = this.updateInfoAndProvider;
    if (n == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise.then(cu);
    this._logger.info(`Downloading update from ${(0, qe.asArray)(n.info.files).map((i) => i.url).join(", ")}`);
    const r = (i) => {
      if (!(i instanceof qe.CancellationError))
        try {
          this.dispatchError(i);
        } catch (o) {
          this._logger.warn(`Cannot dispatch error event: ${o.stack || o}`);
        }
      return i;
    };
    return this.downloadPromise = this.doDownloadUpdate({
      updateInfoAndProvider: n,
      requestHeaders: this.computeRequestHeaders(n.provider),
      cancellationToken: t,
      disableWebInstaller: this.disableWebInstaller,
      disableDifferentialDownload: this.disableDifferentialDownload
    }).catch((i) => {
      throw r(i);
    }).finally(() => {
      this.downloadPromise = null;
    }), this.downloadPromise.then(cu);
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(jn.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, BS.load)(await (0, tt.readFile)(this._appUpdateConfigPath, "utf-8"));
  }
  computeRequestHeaders(t) {
    const n = t.fileExtraDownloadHeaders;
    if (n != null) {
      const r = this.requestHeaders;
      return r == null ? n : {
        ...n,
        ...r
      };
    }
    return this.computeFinalHeaders({ accept: "*/*" });
  }
  async getOrCreateStagingUserId() {
    const t = st.join(this.app.userDataPath, ".updaterId");
    try {
      const r = await (0, tt.readFile)(t, "utf-8");
      if (qe.UUID.check(r))
        return r;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${r}`);
    } catch (r) {
      r.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${r}`);
    }
    const n = qe.UUID.v5((0, US.randomBytes)(4096), qe.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${n}`);
    try {
      await (0, tt.outputFile)(t, n);
    } catch (r) {
      this._logger.warn(`Couldn't write out staging user ID: ${r}`);
    }
    return n;
  }
  /** @internal */
  get isAddNoCacheQuery() {
    const t = this.requestHeaders;
    if (t == null)
      return !0;
    for (const n of Object.keys(t)) {
      const r = n.toLowerCase();
      if (r === "authorization" || r === "private-token")
        return !1;
    }
    return !0;
  }
  async getOrCreateDownloadHelper() {
    let t = this.downloadedUpdateHelper;
    if (t == null) {
      const n = (await this.configOnDisk.value).updaterCacheDirName, r = this._logger;
      n == null && r.error("updaterCacheDirName is not specified in app-update.yml Was app build using at least electron-builder 20.34.0?");
      const i = st.join(this.app.baseCachePath, n || this.app.name);
      r.debug != null && r.debug(`updater cache dir: ${i}`), t = new au.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
    }
    return t;
  }
  async executeDownload(t) {
    const n = t.fileInfo, r = {
      headers: t.downloadUpdateOptions.requestHeaders,
      cancellationToken: t.downloadUpdateOptions.cancellationToken,
      sha2: n.info.sha2,
      sha512: n.info.sha512
    };
    this.listenerCount(jn.DOWNLOAD_PROGRESS) > 0 && (r.onProgress = (C) => this.emit(jn.DOWNLOAD_PROGRESS, C));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, o = i.version, s = n.packageInfo;
    function a() {
      const C = decodeURIComponent(t.fileInfo.url.pathname);
      return C.toLowerCase().endsWith(`.${t.fileExtension.toLowerCase()}`) ? st.basename(C) : st.basename(t.fileInfo.info.url);
    }
    const l = await this.getOrCreateDownloadHelper(), h = l.cacheDirForPendingUpdate;
    await (0, tt.mkdir)(h, { recursive: !0 });
    const c = a();
    let u = st.join(h, c);
    const p = s == null ? null : st.join(h, `package-${o}${st.extname(s.path) || ".7z"}`), w = st.join(h, "current.blockmap"), m = st.join(l.cacheDir, "current.blockmap"), f = async (C) => (await l.setDownloadedFile(u, p, i, n, c, C), await t.done({
      ...i,
      downloadedFile: u
    }), await (0, tt.pathExists)(w) ? await (0, tt.copyFile)(w, m) : t.downloadUpdateOptions.disableDifferentialDownload || await (0, tt.remove)(m), p == null ? { updateFile: u } : { updateFile: u, packageFile: p }), g = this._logger, v = await l.validateDownloadedPath(u, i, n, g);
    if (v != null)
      return u = v, await f(!1);
    const y = async () => (await l.clear().catch(() => {
    }), await (0, tt.unlink)(u).catch(() => {
    }));
    await (0, tt.remove)(w);
    const S = await (0, au.createTempUpdateFile)(`temp-${c}`, h, g);
    try {
      await t.task(S, r, p, y), await (0, qe.retry)(() => (0, tt.rename)(S, u), {
        retries: 60,
        interval: 500,
        shouldRetry: (C) => C instanceof Error && /^EBUSY:/.test(C.message) ? !0 : (g.warn(`Cannot rename temp file to final file: ${C.message || C.stack}`), !1)
      });
    } catch (C) {
      throw await y(), C instanceof qe.CancellationError ? (g.info("cancelled"), this.emit("update-cancelled", i)) : C.code === "ERR_CHECKSUM_MISMATCH" && g.warn(`sha512 checksum mismatch after full download of ${c}: the downloaded file is corrupted or the published update metadata does not match the uploaded file`), C;
    }
    return g.info(`New version ${o} has been downloaded to ${u}`), await f(!0);
  }
  async differentialDownloadInstaller(t, n, r, i, o) {
    let s = !1;
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const a = n.updateInfoAndProvider.provider, l = await a.getBlockMapFiles(t.url, this.app.version, n.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
      this._logger.info(`Download block maps (old: "${l[0]}", new: ${l[1]})`);
      const h = async (f) => {
        const g = await this.httpExecutor.downloadToBuffer(f, {
          headers: n.requestHeaders,
          cancellationToken: n.cancellationToken
        });
        if (g == null || g.length === 0)
          throw new Error(`Blockmap "${f.href}" is empty`);
        try {
          return JSON.parse((0, $s.gunzipSync)(g).toString());
        } catch (v) {
          throw new Error(`Cannot parse blockmap "${f.href}", error: ${v}`);
        }
      }, c = {
        newUrl: t.url,
        oldFile: st.join(this.downloadedUpdateHelper.cacheDir, o),
        logger: this._logger,
        newFile: r,
        isUseMultipleRangeRequest: a.isUseMultipleRangeRequest,
        requestHeaders: n.requestHeaders,
        cancellationToken: n.cancellationToken
      };
      this.listenerCount(jn.DOWNLOAD_PROGRESS) > 0 && (c.onProgress = (f) => this.emit(jn.DOWNLOAD_PROGRESS, f));
      const u = async (f, g) => {
        const v = st.join(g, "current.blockmap");
        await (0, tt.outputFile)(v, (0, $s.gzipSync)(JSON.stringify(f)));
      }, p = async (f) => {
        const g = st.join(f, "current.blockmap");
        try {
          if (await (0, tt.pathExists)(g))
            return JSON.parse((0, $s.gunzipSync)(await (0, tt.readFile)(g)).toString());
        } catch (v) {
          this._logger.warn(`Cannot parse blockmap "${g}", error: ${v}`);
        }
        return null;
      }, w = await h(l[1]);
      await u(w, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
      let m = await p(this.downloadedUpdateHelper.cacheDir);
      return s = m != null, m == null && (this._logger.info(`No cached blockmap for the old installer, downloading it from "${l[0]}"`), m = await h(l[0])), await new GS.GenericDifferentialDownloader(t.info, this.httpExecutor, c).download(m, w), !1;
    } catch (a) {
      if (a.code === "ERR_CHECKSUM_MISMATCH" && this._logger.warn(`sha512 checksum mismatch after differential download (old blockmap ${s ? "was read from the local cache" : "was downloaded from the server"}): cached "${o}" is likely out of sync with the old blockmap, e.g. because one of them was replaced or evicted independently of the other`), this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), this._testOnlyOptions != null)
        throw a;
      return !0;
    }
  }
}
nn.AppUpdater = ja;
function zS(e) {
  const t = (0, vn.prerelease)(e);
  return t != null && t.length > 0;
}
class ah {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  info(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  warn(t) {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  error(t) {
  }
}
nn.NoOpLogger = ah;
function cu({ updateFile: e, packageFile: t }) {
  return t == null ? [e] : [e, t];
}
Object.defineProperty(Ln, "__esModule", { value: !0 });
Ln.BaseUpdater = void 0;
const uu = lo, Ls = ce, qS = nn;
class VS extends qS.AppUpdater {
  constructor(t, n) {
    super(t, n), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, n = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? n : this.autoRunAppAfterInstall) ? setImmediate(() => {
      Nn.autoUpdater.emit("before-quit-for-update"), this.app.quit();
    }) : this.quitAndInstallCalled = !1;
  }
  executeDownload(t) {
    return super.executeDownload({
      ...t,
      done: (n) => (this.dispatchUpdateDownloaded(n), this.addQuitHandler(), Promise.resolve())
    });
  }
  get installerPath() {
    return this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.file;
  }
  // must be sync (because quit even handler is not async)
  install(t = !1, n = !1) {
    if (this.quitAndInstallCalled)
      return this._logger.warn("install call ignored: quitAndInstallCalled is set to true"), !1;
    const r = this.downloadedUpdateHelper, i = this.installerPath, o = r == null ? null : r.downloadedFileInfo;
    if (i == null || o == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    this.quitAndInstallCalled = !0;
    try {
      return this._logger.info(`Install: isSilent: ${t}, isForceRunAfter: ${n}`), this.doInstall({
        isSilent: t,
        isForceRunAfter: n,
        isAdminRightsRequired: o.isAdminRightsRequired
      });
    } catch (s) {
      return this.dispatchError(s), !1;
    }
  }
  addQuitHandler() {
    this.quitHandlerAdded || !this.autoInstallOnAppQuit || (this.quitHandlerAdded = !0, this.app.onQuit((t) => {
      if (this.quitAndInstallCalled) {
        this._logger.info("Update installer has already been triggered. Quitting application.");
        return;
      }
      if (!this.autoInstallOnAppQuit) {
        this._logger.info("Update will not be installed on quit because autoInstallOnAppQuit is set to false.");
        return;
      }
      if (t !== 0) {
        this._logger.info(`Update will be not installed on quit because application is quitting with exit code ${t}`);
        return;
      }
      this._logger.info("Auto install update on quit"), this.install(!0, !1);
    }));
  }
  /**
   * Strips relative-path entries from a PATH string.
   * Prevents PATH-poisoning where a writable directory earlier in PATH shadows
   * a trusted package manager binary.
   */
  sanitizeEnvPath(t) {
    return t.split(Ls.delimiter).filter((n) => Ls.isAbsolute(n)).join(Ls.delimiter);
  }
  spawnSyncLog(t, n = [], r = {}) {
    var i;
    this._logger.info(`Executing: ${t} with args: ${n}`);
    const o = { ...process.env, ...r }, s = (0, uu.spawnSync)(t, n, {
      env: { ...o, PATH: this.sanitizeEnvPath((i = o.PATH) !== null && i !== void 0 ? i : "") },
      encoding: "utf-8",
      shell: !0
    }), { error: a, status: l, stdout: h, stderr: c } = s;
    if (a != null)
      throw this._logger.error(c), a;
    if (l != null && l !== 0)
      throw this._logger.error(c), new Error(`Command ${t} exited with code ${l}`);
    return h.trim();
  }
  /**
   * This handles both node 8 and node 10 way of emitting error when spawning a process
   *   - node 8: Throws the error
   *   - node 10: Emit the error(Need to listen with on)
   */
  // https://github.com/electron-userland/electron-builder/issues/1129
  // Node 8 sends errors: https://nodejs.org/dist/latest-v8.x/docs/api/errors.html#errors_common_system_errors
  async spawnLog(t, n = [], r = void 0, i = "ignore") {
    return this._logger.info(`Executing: ${t} with args: ${n}`), new Promise((o, s) => {
      try {
        const a = { stdio: i, env: r, detached: !0 }, l = (0, uu.spawn)(t, n, a);
        l.on("error", (h) => {
          s(h);
        }), l.unref(), l.pid !== void 0 && o(!0);
      } catch (a) {
        s(a);
      }
    });
  }
}
Ln.BaseUpdater = VS;
var Gr = {}, li = {};
Object.defineProperty(li, "__esModule", { value: !0 });
li.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const Hn = cn, WS = ai, YS = Zr;
class XS extends WS.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, n = t.size, r = n - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(r, n - 1);
    const i = lh(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await JS(this.options.oldFile), i);
  }
}
li.FileWithEmbeddedBlockMapDifferentialDownloader = XS;
function lh(e) {
  return JSON.parse((0, YS.inflateRawSync)(e).toString());
}
async function JS(e) {
  const t = await (0, Hn.open)(e, "r");
  try {
    const n = (await (0, Hn.fstat)(t)).size, r = Buffer.allocUnsafe(4);
    await (0, Hn.read)(t, r, 0, r.length, n - r.length);
    const i = Buffer.allocUnsafe(r.readUInt32BE(0));
    return await (0, Hn.read)(t, i, 0, i.length, n - r.length - i.length), await (0, Hn.close)(t), lh(i);
  } catch (n) {
    throw await (0, Hn.close)(t), n;
  }
}
Object.defineProperty(Gr, "__esModule", { value: !0 });
Gr.AppImageUpdater = void 0;
const Ps = De, fu = lo, ZS = cn, KS = lt, Gn = ce, QS = Ln, ex = li, tx = be, du = un;
class nx extends QS.BaseUpdater {
  constructor(t, n) {
    super(t, n);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, tx.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        const s = process.env.APPIMAGE;
        if (s == null)
          throw (0, Ps.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(r, s, i, n, t)) && await this.httpExecutor.download(r.url, i, o), await (0, ZS.chmod)(i, 493);
      }
    });
  }
  async downloadDifferential(t, n, r, i, o) {
    try {
      const s = {
        newUrl: t.url,
        oldFile: n,
        logger: this._logger,
        newFile: r,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        requestHeaders: o.requestHeaders,
        cancellationToken: o.cancellationToken
      };
      return this.listenerCount(du.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(du.DOWNLOAD_PROGRESS, a)), await new ex.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, s).download(), !1;
    } catch (s) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const n = process.env.APPIMAGE;
    if (n == null)
      throw (0, Ps.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    if (!Gn.isAbsolute(n) || n.includes("\0"))
      throw (0, Ps.newError)(`APPIMAGE env is not a valid absolute path: "${n}"`, "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, KS.unlinkSync)(n);
    let r;
    const i = Gn.basename(n), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    Gn.basename(o) === i || !/\d+\.\d+\.\d+/.test(i) ? r = n : r = Gn.join(Gn.dirname(n), Gn.basename(o)), (0, fu.execFileSync)("mv", ["-f", o, r]), r !== n && this.emit("appimage-filename-updated", r);
    const s = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(r, [], s) : (s.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, fu.execFileSync)(r, [], { env: s })), !0;
  }
}
Gr.AppImageUpdater = nx;
var zr = {}, mr = {};
Object.defineProperty(mr, "__esModule", { value: !0 });
mr.LinuxUpdater = void 0;
const rx = Ln, ix = /^[a-zA-Z0-9_-]+$/;
class ox extends rx.BaseUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /**
   * Returns true if the current process is running as root.
   */
  isRunningAsRoot() {
    var t;
    return ((t = process.getuid) === null || t === void 0 ? void 0 : t.call(process)) === 0;
  }
  /**
   * Sanitizes the installer path for use with shell:true spawn calls.
   * Backslash-escapes metacharacters that have special meaning in POSIX shell.
   * Note: paths containing single-quotes (') are not supported.
   */
  get installerPath() {
    const t = super.installerPath;
    return t == null ? null : t.replace(/\\/g, "\\\\").replace(/([`$!" ;|&()<>])/g, "\\$1").replace(/[\n\r]/g, "");
  }
  runCommandWithSudoIfNeeded(t) {
    if (this.isRunningAsRoot())
      return this._logger.info("Running as root, no need to use sudo"), this.spawnSyncLog(t[0], t.slice(1));
    const { name: n } = this.app, i = `"${n.replace(/["`$\\!\n\r;|&<>(){}*?[\]#~]/g, "")} would like to update"`, o = this.sudoWithArgs(i);
    this._logger.info(`Running as non-root user, using sudo to install: ${o}`);
    let s = '"';
    return (/pkexec/i.test(o[0]) || o[0] === "sudo") && (s = ""), this.spawnSyncLog(o[0], [...o.length > 1 ? o.slice(1) : [], `${s}/bin/bash`, "-c", `'${t.join(" ")}'${s}`]);
  }
  sudoWithArgs(t) {
    const n = this.determineSudoCommand(), r = [n];
    return /kdesudo/i.test(n) ? (r.push("--comment", t), r.push("-c")) : /gksudo/i.test(n) ? r.push("--message", t) : /pkexec/i.test(n) && r.push("--disable-internal-agent"), r;
  }
  hasCommand(t) {
    try {
      return this.spawnSyncLog("command", ["-v", t]), !0;
    } catch {
      return !1;
    }
  }
  determineSudoCommand() {
    const t = ["gksudo", "kdesudo", "pkexec", "beesu"];
    for (const n of t)
      if (this.hasCommand(n))
        return n;
    return "sudo";
  }
  /**
   * Detects the package manager to use based on the available commands.
   * Allows overriding the default behavior by setting the ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER environment variable.
   * If the environment variable is set, it will be used directly. (This is useful for testing each package manager logic path.)
   * Otherwise, it checks for the presence of the specified package manager commands in the order provided.
   * @param pms - An array of package manager commands to check for, in priority order.
   * @returns The detected package manager command or "unknown" if none are found.
   */
  detectPackageManager(t) {
    var n;
    let r = t;
    const i = (n = process.env.ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER) === null || n === void 0 ? void 0 : n.trim();
    i && (ix.test(i) ? r = [i] : this._logger.warn(`ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER "${i}" contains unsafe characters. Ignoring override.`));
    for (const a of r)
      if (this.hasCommand(a))
        return a;
    const o = i ? `ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER override "${i}", ` : "", s = t[0];
    return this._logger.warn(`No package manager found in the list: ${o}${t.join(", ")}. Utilizing default: ${s}`), s;
  }
}
mr.LinuxUpdater = ox;
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.DebUpdater = void 0;
const sx = be, hu = un, ax = mr;
class Ha extends ax.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, sx.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(hu.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(hu.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(r.url, i, o);
      }
    });
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
      return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
    const r = ["dpkg", "apt"], i = this.detectPackageManager(r);
    try {
      Ha.installWithCommandRunner(i, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (o) {
      return this.dispatchError(o), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, n, r, i) {
    var o;
    if (t === "dpkg")
      try {
        r(["dpkg", "-i", n]);
      } catch (s) {
        i.warn((o = s.message) !== null && o !== void 0 ? o : s), i.warn("dpkg installation failed, trying to fix broken dependencies with apt-get"), r(["apt-get", "install", "-f", "-y"]);
      }
    else if (t === "apt")
      i.warn("Using apt to install a local .deb. This may fail for unsigned packages unless properly configured."), r([
        "apt",
        "install",
        "-y",
        "--allow-unauthenticated",
        // needed for unsigned .debs
        "--allow-downgrades",
        // allow lower version installs
        "--allow-change-held-packages",
        n
      ]);
    else
      throw new Error(`Package manager ${t} not supported`);
  }
}
zr.DebUpdater = Ha;
var qr = {};
Object.defineProperty(qr, "__esModule", { value: !0 });
qr.PacmanUpdater = void 0;
const pu = un, lx = be, cx = mr;
class Ga extends cx.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, lx.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(pu.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(pu.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(r.url, i, o);
      }
    });
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    try {
      Ga.installWithCommandRunner(n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (r) {
      return this.dispatchError(r), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, n, r) {
    var i;
    try {
      n(["pacman", "-U", "--noconfirm", t]);
    } catch (o) {
      r.warn((i = o.message) !== null && i !== void 0 ? i : o), r.warn("pacman installation failed, attempting to update package database and retry");
      try {
        n(["pacman", "-Sy", "--noconfirm"]), n(["pacman", "-U", "--noconfirm", t]);
      } catch (s) {
        throw r.error("Retry after pacman -Sy failed"), s;
      }
    }
  }
}
qr.PacmanUpdater = Ga;
var Vr = {};
Object.defineProperty(Vr, "__esModule", { value: !0 });
Vr.RpmUpdater = void 0;
const mu = un, ux = be, fx = mr;
class za extends fx.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, ux.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(mu.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(mu.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(r.url, i, o);
      }
    });
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const r = ["zypper", "dnf", "yum", "rpm"], i = this.detectPackageManager(r);
    try {
      za.installWithCommandRunner(i, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
    } catch (o) {
      return this.dispatchError(o), !1;
    }
    return t.isForceRunAfter && this.app.relaunch(), !0;
  }
  static installWithCommandRunner(t, n, r, i) {
    if (t === "zypper")
      return r(["zypper", "--non-interactive", "--no-refresh", "install", "--allow-unsigned-rpm", "-f", n]);
    if (t === "dnf")
      return r(["dnf", "install", "--nogpgcheck", "-y", n]);
    if (t === "yum")
      return r(["yum", "install", "--nogpgcheck", "-y", n]);
    if (t === "rpm")
      return i.warn("Installing with rpm only (no dependency resolution)."), r(["rpm", "-Uvh", "--replacepkgs", "--replacefiles", "--nodeps", n]);
    throw new Error(`Package manager ${t} not supported`);
  }
}
Vr.RpmUpdater = za;
var Wr = {};
Object.defineProperty(Wr, "__esModule", { value: !0 });
Wr.MacUpdater = void 0;
const gu = De, Fs = cn, dx = lt, Eu = ce, hx = kp, px = nn, mx = be, yu = lo, wu = ur;
class qa extends px.AppUpdater {
  constructor(t, n) {
    super(t, n), this.nativeUpdater = Nn.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (r) => {
      this._logger.warn(r), this.emit("error", r);
    }), this.nativeUpdater.on("update-downloaded", () => {
      this.squirrelDownloadedUpdate = !0, this.debug("nativeUpdater.update-downloaded");
    });
  }
  /** Filters update files to the appropriate architecture.
   * On arm64 Macs (including Rosetta), arm64 files are preferred when available.
   * On x64 Macs, arm64 files are excluded. */
  static filterFilesForArch(t, n) {
    const r = (i) => {
      var o;
      return i.url.pathname.includes("arm64") || ((o = i.info.url) === null || o === void 0 ? void 0 : o.includes("arm64"));
    };
    return n && t.some(r) ? t.filter((i) => n === r(i)) : t.filter((i) => !r(i));
  }
  debug(t) {
    this._logger.debug != null && this._logger.debug(t);
  }
  closeServerIfExists() {
    this.server && (this.debug("Closing proxy server"), this.server.close((t) => {
      t && this.debug("proxy server wasn't already open, probably attempted closing again as a safety check before quit");
    }));
  }
  async doDownloadUpdate(t) {
    let n = t.updateInfoAndProvider.provider.resolveFiles(t.updateInfoAndProvider.info);
    const r = this._logger, i = "sysctl.proc_translated";
    let o = !1;
    try {
      this.debug("Checking for macOS Rosetta environment"), o = (0, yu.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), r.info(`Checked for macOS Rosetta environment (isRosetta=${o})`);
    } catch (c) {
      r.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${c}`);
    }
    let s = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const u = (0, yu.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      r.info(`Checked 'uname -a': arm64=${u}`), s = s || u;
    } catch (c) {
      r.warn(`uname shell command to check for arm64 failed: ${c}`);
    }
    s = s || process.arch === "arm64" || o, n = qa.filterFilesForArch(n, s);
    const a = (0, mx.findFile)(n, "zip", ["pkg", "dmg"]);
    if (a == null)
      throw (0, gu.newError)(`ZIP file not provided: ${(0, gu.safeStringifyJson)(n)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const l = t.updateInfoAndProvider.provider, h = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: a,
      downloadUpdateOptions: t,
      task: async (c, u) => {
        const p = Eu.join(this.downloadedUpdateHelper.cacheDir, h), w = () => (0, Fs.pathExistsSync)(p) ? !t.disableDifferentialDownload : (r.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let m = !0;
        w() && (m = await this.differentialDownloadInstaller(a, t, c, l, h)), m && await this.httpExecutor.download(a.url, c, u);
      },
      done: async (c) => {
        if (!t.disableDifferentialDownload)
          try {
            const u = Eu.join(this.downloadedUpdateHelper.cacheDir, h);
            await (0, Fs.copyFile)(c.downloadedFile, u);
          } catch (u) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${u.message}`);
          }
        return this.updateDownloaded(a, c);
      }
    });
  }
  async updateDownloaded(t, n) {
    var r;
    const i = n.downloadedFile, o = (r = t.info.size) !== null && r !== void 0 ? r : (await (0, Fs.stat)(i)).size, s = this._logger, a = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${a})`), this.server = (0, hx.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${a})`), this.server.on("close", () => {
      s.info(`Proxy server for native Squirrel.Mac is closed (${a})`);
    });
    const l = (h) => {
      const c = h.address();
      return typeof c == "string" ? c : `http://127.0.0.1:${c == null ? void 0 : c.port}`;
    };
    return await new Promise((h, c) => {
      const u = (0, wu.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), p = Buffer.from(`autoupdater:${u}`, "ascii"), w = `/${(0, wu.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (m, f) => {
        const g = m.url;
        if (s.info(`${g} requested`), g === "/") {
          if (!m.headers.authorization || m.headers.authorization.indexOf("Basic ") === -1) {
            f.statusCode = 401, f.statusMessage = "Invalid Authentication Credentials", f.end(), s.warn("No authenthication info");
            return;
          }
          const S = m.headers.authorization.split(" ")[1], C = Buffer.from(S, "base64").toString("ascii"), [N, D] = C.split(":");
          if (N !== "autoupdater" || D !== u) {
            f.statusCode = 401, f.statusMessage = "Invalid Authentication Credentials", f.end(), s.warn("Invalid authenthication credentials");
            return;
          }
          const B = Buffer.from(`{ "url": "${l(this.server)}${w}" }`);
          f.writeHead(200, { "Content-Type": "application/json", "Content-Length": B.length }), f.end(B);
          return;
        }
        if (!g.startsWith(w)) {
          s.warn(`${g} requested, but not supported`), f.writeHead(404), f.end();
          return;
        }
        s.info(`${w} requested by Squirrel.Mac, pipe ${i}`);
        let v = !1;
        f.on("finish", () => {
          v || (this.nativeUpdater.removeListener("error", c), h([]));
        });
        const y = (0, dx.createReadStream)(i);
        y.on("error", (S) => {
          try {
            f.end();
          } catch (C) {
            s.warn(`cannot end response: ${C}`);
          }
          v = !0, this.nativeUpdater.removeListener("error", c), c(new Error(`Cannot pipe "${i}": ${S}`));
        }), f.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": o
        }), y.pipe(f);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${a})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${l(this.server)}, ${a})`), this.nativeUpdater.setFeedURL({
          url: l(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${p.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(n), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", c), this.nativeUpdater.checkForUpdates()) : h([]);
      });
    });
  }
  handleUpdateDownloaded() {
    this.autoRunAppAfterInstall ? this.nativeUpdater.quitAndInstall() : this.app.quit(), this.closeServerIfExists();
  }
  quitAndInstall() {
    this.squirrelDownloadedUpdate ? this.handleUpdateDownloaded() : (this.nativeUpdater.on("update-downloaded", () => this.handleUpdateDownloaded()), this.autoInstallOnAppQuit || this.nativeUpdater.checkForUpdates());
  }
}
Wr.MacUpdater = qa;
var Yr = {}, Va = {};
Object.defineProperty(Va, "__esModule", { value: !0 });
Va.verifySignature = Ex;
const vu = De, ch = lo, gx = uo, _u = ce;
function uh(e, t) {
  return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", e], {
    shell: !0,
    timeout: t
  }];
}
function Ex(e, t, n) {
  return new Promise((r, i) => {
    const o = t.replace(/'/g, "''");
    n.info(`Verifying signature ${o}`), (0, ch.execFile)(...uh(`"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`, 20 * 1e3), (s, a, l) => {
      var h;
      try {
        if (s != null || l) {
          Us(n, s, l, i), r(null);
          return;
        }
        const c = yx(a);
        if (c.Status === 0) {
          try {
            const m = _u.normalize(c.Path), f = _u.normalize(t);
            if (n.info(`LiteralPath: ${m}. Update Path: ${f}`), m !== f) {
              Us(n, new Error(`LiteralPath of ${m} is different than ${f}`), l, i), r(null);
              return;
            }
          } catch (m) {
            n.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(h = m.message) !== null && h !== void 0 ? h : m.stack}`);
          }
          const p = (0, vu.parseDn)(c.SignerCertificate.Subject);
          let w = !1;
          for (const m of e) {
            const f = (0, vu.parseDn)(m);
            if (f.size ? w = Array.from(f.keys()).every((v) => f.get(v) === p.get(v)) : m === p.get("CN") && (n.warn(`Signature validated using only CN ${m}. Please add your full Distinguished Name (DN) to publisherNames configuration`), w = !0), w) {
              r(null);
              return;
            }
          }
        }
        const u = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(c, (p, w) => p === "RawData" ? void 0 : w, 2);
        n.warn(`Sign verification failed, installer signed with incorrect certificate: ${u}`), r(u);
      } catch (c) {
        Us(n, c, null, i), r(null);
        return;
      }
    });
  });
}
function yx(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const n = t.SignerCertificate;
  return n != null && (delete n.Archived, delete n.Extensions, delete n.Handle, delete n.HasPrivateKey, delete n.SubjectName), t;
}
function Us(e, t, n, r) {
  if (wx()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || n}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, ch.execFileSync)(...uh("ConvertTo-Json test", 10 * 1e3));
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && r(t), n && r(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${n}. Failing signature validation due to unknown stderr.`));
}
function wx() {
  const e = gx.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(Yr, "__esModule", { value: !0 });
Yr.NsisUpdater = void 0;
const ki = De, Su = ce, vx = Ln, _x = li, xu = un, Sx = be, xx = cn, Cx = Va, Cu = ln;
class Ix extends vx.BaseUpdater {
  constructor(t, n) {
    super(t, n), this._verifyUpdateCodeSignature = (r, i) => (0, Cx.verifySignature)(r, i, this._logger);
  }
  /**
   * The verifyUpdateCodeSignature. You can pass [win-verify-signature](https://github.com/beyondkmp/win-verify-trust) or another custom verify function: ` (publisherName: string[], path: string) => Promise<string | null>`.
   * The default verify function uses [windowsExecutableCodeSignatureVerifier](https://github.com/electron-userland/electron-builder/blob/master/packages/electron-updater/src/windowsExecutableCodeSignatureVerifier.ts)
   */
  get verifyUpdateCodeSignature() {
    return this._verifyUpdateCodeSignature;
  }
  set verifyUpdateCodeSignature(t) {
    t && (this._verifyUpdateCodeSignature = t);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, Sx.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: r,
      task: async (i, o, s, a) => {
        const l = r.packageInfo, h = l != null && s != null;
        if (h && t.disableWebInstaller)
          throw (0, ki.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !h && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (h || t.disableDifferentialDownload || await this.differentialDownloadInstaller(r, t, i, n, ki.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(r.url, i, o);
        const c = await this.verifySignature(i);
        if (c != null)
          throw await a(), (0, ki.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${c}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (h && await this.differentialDownloadWebPackage(t, l, s, n))
          try {
            await this.httpExecutor.download(new Cu.URL(l.path), s, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: l.sha512
            });
          } catch (u) {
            try {
              await (0, xx.unlink)(s);
            } catch {
            }
            throw u;
          }
      }
    });
  }
  // $certificateInfo = (Get-AuthenticodeSignature 'xxx\yyy.exe'
  // | where {$_.Status.Equals([System.Management.Automation.SignatureStatus]::Valid) -and $_.SignerCertificate.Subject.Contains("CN=siemens.com")})
  // | Out-String ; if ($certificateInfo) { exit 0 } else { exit 1 }
  async verifySignature(t) {
    let n;
    try {
      if (n = (await this.configOnDisk.value).publisherName, n == null)
        return null;
    } catch (r) {
      if (r.code === "ENOENT")
        return null;
      throw r;
    }
    return await this._verifyUpdateCodeSignature(Array.isArray(n) ? n : [n], t);
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const r = ["--updated"];
    t.isSilent && r.push("/S"), t.isForceRunAfter && r.push("--force-run"), this.installDirectory && r.push(`/D=${this.installDirectory}`);
    const i = this.downloadedUpdateHelper == null ? null : this.downloadedUpdateHelper.packageFile;
    i != null && r.push(`--package-file=${i}`);
    const o = () => {
      this.spawnLog(Su.join(process.resourcesPath, "elevate.exe"), [n].concat(r)).catch((s) => this.dispatchError(s));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), o(), !0) : (this.spawnLog(n, r).catch((s) => {
      const a = s.code;
      this._logger.info(`Cannot run installer: error code: ${a}, error message: "${s.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), a === "UNKNOWN" || a === "EACCES" ? o() : a === "ENOENT" ? Nn.shell.openPath(n).catch((l) => this.dispatchError(l)) : this.dispatchError(s);
    }), !0);
  }
  async differentialDownloadWebPackage(t, n, r, i) {
    if (n.blockMapSize == null)
      return !0;
    try {
      const o = {
        newUrl: new Cu.URL(n.path),
        oldFile: Su.join(this.downloadedUpdateHelper.cacheDir, ki.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: r,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(xu.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(xu.DOWNLOAD_PROGRESS, s)), await new _x.FileWithEmbeddedBlockMapDifferentialDownloader(n, this.httpExecutor, o).download();
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "win32";
    }
    return !1;
  }
}
Yr.NsisUpdater = Ix;
(function(e) {
  var t = Ge && Ge.__createBinding || (Object.create ? function(g, v, y, S) {
    S === void 0 && (S = y);
    var C = Object.getOwnPropertyDescriptor(v, y);
    (!C || ("get" in C ? !v.__esModule : C.writable || C.configurable)) && (C = { enumerable: !0, get: function() {
      return v[y];
    } }), Object.defineProperty(g, S, C);
  } : function(g, v, y, S) {
    S === void 0 && (S = y), g[S] = v[y];
  }), n = Ge && Ge.__exportStar || function(g, v) {
    for (var y in g) y !== "default" && !Object.prototype.hasOwnProperty.call(v, y) && t(v, g, y);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const r = cn, i = ce;
  var o = Ln;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return o.BaseUpdater;
  } });
  var s = nn;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return s.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return s.NoOpLogger;
  } });
  var a = be;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return a.Provider;
  } });
  var l = Gr;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return l.AppImageUpdater;
  } });
  var h = zr;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return h.DebUpdater;
  } });
  var c = qr;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return c.PacmanUpdater;
  } });
  var u = Vr;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return u.RpmUpdater;
  } });
  var p = Wr;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return p.MacUpdater;
  } });
  var w = Yr;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return w.NsisUpdater;
  } }), n(un, e);
  let m;
  function f() {
    if (process.platform === "win32")
      m = new Yr.NsisUpdater();
    else if (process.platform === "darwin")
      m = new Wr.MacUpdater();
    else {
      m = new Gr.AppImageUpdater();
      try {
        const g = i.join(process.resourcesPath, "package-type");
        if (!(0, r.existsSync)(g))
          return m;
        switch ((0, r.readFileSync)(g).toString().trim()) {
          case "deb":
            m = new zr.DebUpdater();
            break;
          case "rpm":
            m = new Vr.RpmUpdater();
            break;
          case "pacman":
            m = new qr.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (g) {
        console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", g.message);
      }
    }
    return m;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => m || f()
  });
})(je);
var gr = { exports: {} }, fh = {
  /* The local file header */
  LOCHDR: 30,
  // LOC header size
  LOCSIG: 67324752,
  // "PK\003\004"
  LOCVER: 4,
  // version needed to extract
  LOCFLG: 6,
  // general purpose bit flag
  LOCHOW: 8,
  // compression method
  LOCTIM: 10,
  // modification time (2 bytes time, 2 bytes date)
  LOCCRC: 14,
  // uncompressed file crc-32 value
  LOCSIZ: 18,
  // compressed size
  LOCLEN: 22,
  // uncompressed size
  LOCNAM: 26,
  // filename length
  LOCEXT: 28,
  // extra field length
  /* The Data descriptor */
  EXTSIG: 134695760,
  // "PK\007\008"
  EXTHDR: 16,
  // EXT header size
  EXTCRC: 4,
  // uncompressed file crc-32 value
  EXTSIZ: 8,
  // compressed size
  EXTLEN: 12,
  // uncompressed size
  /* The central directory file header */
  CENHDR: 46,
  // CEN header size
  CENSIG: 33639248,
  // "PK\001\002"
  CENVEM: 4,
  // version made by
  CENVER: 6,
  // version needed to extract
  CENFLG: 8,
  // encrypt, decrypt flags
  CENHOW: 10,
  // compression method
  CENTIM: 12,
  // modification time (2 bytes time, 2 bytes date)
  CENCRC: 16,
  // uncompressed file crc-32 value
  CENSIZ: 20,
  // compressed size
  CENLEN: 24,
  // uncompressed size
  CENNAM: 28,
  // filename length
  CENEXT: 30,
  // extra field length
  CENCOM: 32,
  // file comment length
  CENDSK: 34,
  // volume number start
  CENATT: 36,
  // internal file attributes
  CENATX: 38,
  // external file attributes (host system dependent)
  CENOFF: 42,
  // LOC header offset
  /* The entries in the end of central directory */
  ENDHDR: 22,
  // END header size
  ENDSIG: 101010256,
  // "PK\005\006"
  ENDSUB: 8,
  // number of entries on this disk
  ENDTOT: 10,
  // total number of entries
  ENDSIZ: 12,
  // central directory size in bytes
  ENDOFF: 16,
  // offset of first CEN header
  ENDCOM: 20,
  // zip file comment length
  END64HDR: 20,
  // zip64 END header size
  END64SIG: 117853008,
  // zip64 Locator signature, "PK\006\007"
  END64START: 4,
  // number of the disk with the start of the zip64
  END64OFF: 8,
  // relative offset of the zip64 end of central directory
  END64NUMDISKS: 16,
  // total number of disks
  ZIP64SIG: 101075792,
  // zip64 signature, "PK\006\006"
  ZIP64HDR: 56,
  // zip64 record minimum size
  ZIP64LEAD: 12,
  // leading bytes at the start of the record, not counted by the value stored in ZIP64SIZE
  ZIP64SIZE: 4,
  // zip64 size of the central directory record
  ZIP64VEM: 12,
  // zip64 version made by
  ZIP64VER: 14,
  // zip64 version needed to extract
  ZIP64DSK: 16,
  // zip64 number of this disk
  ZIP64DSKDIR: 20,
  // number of the disk with the start of the record directory
  ZIP64SUB: 24,
  // number of entries on this disk
  ZIP64TOT: 32,
  // total number of entries
  ZIP64SIZB: 40,
  // zip64 central directory size in bytes
  ZIP64OFF: 48,
  // offset of start of central directory with respect to the starting disk number
  ZIP64EXTRA: 56,
  // extensible data sector
  /* Compression methods */
  STORED: 0,
  // no compression
  SHRUNK: 1,
  // shrunk
  REDUCED1: 2,
  // reduced with compression factor 1
  REDUCED2: 3,
  // reduced with compression factor 2
  REDUCED3: 4,
  // reduced with compression factor 3
  REDUCED4: 5,
  // reduced with compression factor 4
  IMPLODED: 6,
  // imploded
  // 7 reserved for Tokenizing compression algorithm
  DEFLATED: 8,
  // deflated
  ENHANCED_DEFLATED: 9,
  // enhanced deflated
  PKWARE: 10,
  // PKWare DCL imploded
  // 11 reserved by PKWARE
  BZIP2: 12,
  //  compressed using BZIP2
  // 13 reserved by PKWARE
  LZMA: 14,
  // LZMA
  // 15-17 reserved by PKWARE
  IBM_TERSE: 18,
  // compressed using IBM TERSE
  IBM_LZ77: 19,
  // IBM LZ77 z
  AES_ENCRYPT: 99,
  // WinZIP AES encryption method
  /* General purpose bit flag */
  // values can obtained with expression 2**bitnr
  FLG_ENC: 1,
  // Bit 0: encrypted file
  FLG_COMP1: 2,
  // Bit 1, compression option
  FLG_COMP2: 4,
  // Bit 2, compression option
  FLG_DESC: 8,
  // Bit 3, data descriptor
  FLG_ENH: 16,
  // Bit 4, enhanced deflating
  FLG_PATCH: 32,
  // Bit 5, indicates that the file is compressed patched data.
  FLG_STR: 64,
  // Bit 6, strong encryption (patented)
  // Bits 7-10: Currently unused.
  FLG_EFS: 2048,
  // Bit 11: Language encoding flag (EFS)
  // Bit 12: Reserved by PKWARE for enhanced compression.
  // Bit 13: encrypted the Central Directory (patented).
  // Bits 14-15: Reserved by PKWARE.
  FLG_MSK: 4096,
  // mask header values
  /* Load type */
  FILE: 2,
  BUFFER: 1,
  NONE: 0,
  /* 4.5 Extensible data fields */
  EF_ID: 0,
  EF_SIZE: 2,
  /* Header IDs */
  ID_ZIP64: 1,
  ID_AVINFO: 7,
  ID_PFS: 8,
  ID_OS2: 9,
  ID_NTFS: 10,
  ID_OPENVMS: 12,
  ID_UNIX: 13,
  ID_FORK: 14,
  ID_PATCH: 15,
  ID_X509_PKCS7: 20,
  ID_X509_CERTID_F: 21,
  ID_X509_CERTID_C: 22,
  ID_STRONGENC: 23,
  ID_RECORD_MGT: 24,
  ID_X509_PKCS7_RL: 25,
  ID_IBM1: 101,
  ID_IBM2: 102,
  ID_POSZIP: 18064,
  EF_ZIP64_OR_32: 4294967295,
  EF_ZIP64_OR_16: 65535,
  EF_ZIP64_SUNCOMP: 0,
  EF_ZIP64_SCOMP: 8,
  EF_ZIP64_RHO: 16,
  EF_ZIP64_DSN: 24
}, ci = {};
(function(e) {
  const t = {
    /* Header error messages */
    INVALID_LOC: "Invalid LOC header (bad signature)",
    INVALID_CEN: "Invalid CEN header (bad signature)",
    INVALID_END: "Invalid END header (bad signature)",
    /* Descriptor */
    DESCRIPTOR_NOT_EXIST: "No descriptor present",
    DESCRIPTOR_UNKNOWN: "Unknown descriptor format",
    DESCRIPTOR_FAULTY: "Descriptor data is malformed",
    /* ZipEntry error messages*/
    NO_DATA: "Nothing to decompress",
    BAD_CRC: "CRC32 checksum failed {0}",
    MAX_OUTPUT_EXCEEDED: "Decompressed data exceeds the declared uncompressed size",
    FILE_IN_THE_WAY: "There is a file in the way: {0}",
    UNKNOWN_METHOD: "Invalid/unsupported compression method",
    /* Inflater error messages */
    AVAIL_DATA: "inflate::Available inflate data did not terminate",
    INVALID_DISTANCE: "inflate::Invalid literal/length or distance code in fixed or dynamic block",
    TO_MANY_CODES: "inflate::Dynamic block code description: too many length or distance codes",
    INVALID_REPEAT_LEN: "inflate::Dynamic block code description: repeat more than specified lengths",
    INVALID_REPEAT_FIRST: "inflate::Dynamic block code description: repeat lengths with no first length",
    INCOMPLETE_CODES: "inflate::Dynamic block code description: code lengths codes incomplete",
    INVALID_DYN_DISTANCE: "inflate::Dynamic block code description: invalid distance code lengths",
    INVALID_CODES_LEN: "inflate::Dynamic block code description: invalid literal/length code lengths",
    INVALID_STORE_BLOCK: "inflate::Stored block length did not match one's complement",
    INVALID_BLOCK_TYPE: "inflate::Invalid block type (type == 3)",
    /* ADM-ZIP error messages */
    CANT_EXTRACT_FILE: "Could not extract the file",
    CANT_OVERRIDE: "Target file already exists",
    DISK_ENTRY_TOO_LARGE: "Number of disk entries is too large",
    NO_ZIP: "No zip file was loaded",
    NO_ENTRY: "Entry doesn't exist",
    DUPLICATE_ENTRY: "Duplicate entry name {0}",
    DIRECTORY_CONTENT_ERROR: "A directory cannot have content",
    FILE_NOT_FOUND: 'File not found: "{0}"',
    NOT_IMPLEMENTED: "Not implemented",
    INVALID_FILENAME: "Invalid filename",
    INVALID_FORMAT: "Invalid or unsupported zip format. No END header found",
    ZIP64_VALUE_TOO_LARGE: "Zip64 value exceeds the maximum safe integer",
    INVALID_PASS_PARAM: "Incompatible password parameter",
    WRONG_PASSWORD: "Wrong Password",
    /* ADM-ZIP */
    COMMENT_TOO_LONG: "Comment is too long",
    // Comment can be max 65535 bytes long (NOTE: some non-US characters may take more space)
    EXTRA_FIELD_PARSE_ERROR: "Extra field parsing error"
  };
  function n(r) {
    return function(...i) {
      return i.length && (r = r.replace(/\{(\d)\}/g, (o, s) => i[s] || "")), new Error("ADM-ZIP: " + r);
    };
  }
  for (const r of Object.keys(t))
    e[r] = n(t[r]);
})(ci);
const bx = lt, ae = ce, Iu = fh, Wa = ci, Ax = typeof process == "object" && process.platform === "win32", bu = (e) => typeof e == "object" && e !== null, dh = new Uint32Array(256).map((e, t) => {
  for (let n = 0; n < 8; n++)
    t & 1 ? t = 3988292384 ^ t >>> 1 : t >>>= 1;
  return t >>> 0;
});
function he(e) {
  this.sep = ae.sep, this.fs = bx, bu(e) && bu(e.fs) && typeof e.fs.statSync == "function" && (this.fs = e.fs);
}
var Tx = he;
he.prototype.makeDir = function(e) {
  const t = this;
  function n(r) {
    let i = r.split(t.sep)[0];
    r.split(t.sep).forEach(function(o) {
      if (!(!o || o.substr(-1, 1) === ":")) {
        i += t.sep + o;
        var s;
        try {
          s = t.fs.statSync(i);
        } catch (a) {
          if (a.message && a.message.startsWith("ENOENT"))
            t.fs.mkdirSync(i);
          else
            throw a;
        }
        if (s && s.isFile()) throw Wa.FILE_IN_THE_WAY(`"${i}"`);
      }
    });
  }
  n(e);
};
he.prototype.writeFileTo = function(e, t, n, r) {
  const i = this;
  if (i.fs.existsSync(e)) {
    if (!n) return !1;
    var o = i.fs.statSync(e);
    if (o.isDirectory())
      return !1;
  }
  var s = ae.dirname(e);
  i.fs.existsSync(s) || i.makeDir(s);
  var a;
  try {
    a = i.fs.openSync(e, "w", 438);
  } catch {
    i.fs.chmodSync(e, 438), a = i.fs.openSync(e, "w", 438);
  }
  if (a)
    try {
      i.fs.writeSync(a, t, 0, t.length, 0);
    } finally {
      i.fs.closeSync(a);
    }
  return i.fs.chmodSync(e, r || 438), !0;
};
he.prototype.writeFileToAsync = function(e, t, n, r, i) {
  typeof r == "function" && (i = r, r = void 0);
  const o = this;
  o.fs.exists(e, function(s) {
    if (s && !n) return i(!1);
    o.fs.stat(e, function(a, l) {
      if (s && l && l.isDirectory())
        return i(!1);
      var h = ae.dirname(e);
      o.fs.exists(h, function(c) {
        if (!c)
          try {
            o.makeDir(h);
          } catch {
            return i(!1);
          }
        const u = function(p) {
          o.fs.write(p, t, 0, t.length, 0, function(w) {
            o.fs.close(p, function() {
              if (w) return i(!1);
              o.fs.chmod(e, r || 438, function() {
                i(!0);
              });
            });
          });
        };
        o.fs.open(e, "w", 438, function(p, w) {
          p ? o.fs.chmod(e, 438, function() {
            o.fs.open(e, "w", 438, function(m, f) {
              if (m || !f) return i(!1);
              u(f);
            });
          }) : w ? u(w) : i(!1);
        });
      });
    });
  });
};
he.prototype.assertPathSafe = function(e, t) {
  const n = this;
  if (typeof n.fs.lstatSync != "function") return;
  const r = ae.resolve(e), i = ae.resolve(t);
  if (i === r) return;
  const o = ae.relative(r, i);
  if (!o || o === ".." || o.startsWith(".." + ae.sep) || ae.isAbsolute(o)) return;
  let s = r;
  for (const a of o.split(ae.sep)) {
    if (!a || a === ".") continue;
    s = ae.join(s, a);
    let l;
    try {
      l = n.fs.lstatSync(s);
    } catch {
      break;
    }
    if (l.isSymbolicLink()) throw Wa.FILE_IN_THE_WAY(`"${s}"`);
  }
};
he.prototype.findFiles = function(e) {
  const t = this, n = typeof t.fs.lstatSync == "function", r = t.fs.realpathSync(e);
  function i(s) {
    if (!n || !t.fs.lstatSync(s).isSymbolicLink()) return !1;
    let a;
    try {
      a = t.fs.realpathSync(s);
    } catch {
      return !0;
    }
    return !(a === r || a.startsWith(r + ae.sep));
  }
  function o(s, a, l, h) {
    let c = [];
    return t.fs.readdirSync(s).forEach(function(u) {
      const p = ae.join(s, u);
      if (i(p)) return;
      const w = t.fs.statSync(p);
      if (c.push(ae.normalize(p) + (w.isDirectory() ? t.sep : "")), w.isDirectory() && l) {
        const m = t.fs.realpathSync(p);
        h.has(m) || (h.add(m), c = c.concat(o(p, a, l, h)));
      }
    }), c;
  }
  return o(e, void 0, !0, /* @__PURE__ */ new Set([r]));
};
he.prototype.findFilesAsync = function(e, t) {
  const n = this, r = [];
  let i = !1;
  const o = function(c) {
    i || (i = !0, t(c, c ? void 0 : r));
  }, s = typeof n.fs.lstat == "function";
  let a = null;
  const l = function(c, u) {
    if (!s) return u(null, !1);
    n.fs.lstat(c, function(p, w) {
      if (p) return u(p);
      if (!w || !w.isSymbolicLink()) return u(null, !1);
      n.fs.realpath(c, function(m, f) {
        if (m) return u(null, !0);
        u(null, !(f === a || f.startsWith(a + ae.sep)));
      });
    });
  }, h = function(c, u, p) {
    n.fs.readdir(c, function(w, m) {
      if (w) return p(w);
      let f = m.length;
      if (!f) return p();
      m.forEach(function(g) {
        const v = ae.join(c, g);
        l(v, function(y, S) {
          if (y) return p(y);
          if (S) {
            --f || p();
            return;
          }
          n.fs.stat(v, function(C, N) {
            if (C) return p(C);
            if (!N) {
              --f || p();
              return;
            }
            if (r.push(ae.normalize(v) + (N.isDirectory() ? n.sep : "")), !N.isDirectory()) {
              --f || p();
              return;
            }
            n.fs.realpath(v, function(D, B) {
              if (D) return p(D);
              if (u.has(B)) {
                --f || p();
                return;
              }
              u.add(B), h(v, u, function(k) {
                if (k) return p(k);
                --f || p();
              });
            });
          });
        });
      });
    });
  };
  n.fs.realpath(e, function(c, u) {
    if (c) return o(c);
    a = u, h(e, /* @__PURE__ */ new Set([u]), o);
  });
};
he.prototype.getAttributes = function() {
};
he.prototype.setAttributes = function() {
};
he.crc32update = function(e, t) {
  return dh[(e ^ t) & 255] ^ e >>> 8;
};
he.crc32 = function(e) {
  typeof e == "string" && (e = Buffer.from(e, "utf8"));
  let t = e.length, n = -1;
  for (let r = 0; r < t; ) n = he.crc32update(n, e[r++]);
  return ~n >>> 0;
};
he.methodToString = function(e) {
  switch (e) {
    case Iu.STORED:
      return "STORED (" + e + ")";
    case Iu.DEFLATED:
      return "DEFLATED (" + e + ")";
    default:
      return "UNSUPPORTED (" + e + ")";
  }
};
he.canonical = function(e) {
  if (!e) return "";
  const t = ae.posix.normalize("/" + e.split("\\").join("/"));
  return ae.join(".", t);
};
he.zipnamefix = function(e) {
  if (!e) return "";
  const t = ae.posix.normalize("/" + e.split("\\").join("/"));
  return ae.posix.join(".", t);
};
he.findLast = function(e, t) {
  if (!Array.isArray(e)) throw new TypeError("arr is not array");
  const n = e.length >>> 0;
  for (let r = n - 1; r >= 0; r--)
    if (t(e[r], r, e))
      return e[r];
};
he.sanitize = function(e, t) {
  e = ae.resolve(ae.normalize(e));
  for (var n = t.split("/"), r = 0, i = n.length; r < i; r++) {
    var o = ae.normalize(ae.join(e, n.slice(r, i).join(ae.sep)));
    if (o === e || o.startsWith(e + ae.sep))
      return o;
  }
  return ae.normalize(ae.join(e, ae.basename(t)));
};
he.toBuffer = function(t, n) {
  return Buffer.isBuffer(t) ? t : t instanceof Uint8Array ? Buffer.from(t) : typeof t == "string" ? n(t) : Buffer.alloc(0);
};
he.readBigUInt64LE = function(e, t) {
  const n = e.readUInt32LE(t), i = e.readUInt32LE(t + 4) * 4294967296 + n;
  if (i > Number.MAX_SAFE_INTEGER)
    throw Wa.ZIP64_VALUE_TOO_LARGE();
  return i;
};
he.writeBigUInt64LE = function(e, t, n) {
  const r = t >>> 0, i = Math.floor(t / 4294967296) >>> 0;
  e.writeUInt32LE(r, n), e.writeUInt32LE(i, n + 4);
};
he.fromDOS2Date = function(e) {
  return new Date((e >> 25 & 127) + 1980, Math.max((e >> 21 & 15) - 1, 0), Math.max(e >> 16 & 31, 1), e >> 11 & 31, e >> 5 & 63, (e & 31) << 1);
};
he.fromDate2DOS = function(e) {
  let t = 0, n = 0;
  return e.getFullYear() > 1979 && (t = (e.getFullYear() - 1980 & 127) << 9 | e.getMonth() + 1 << 5 | e.getDate(), n = e.getHours() << 11 | e.getMinutes() << 5 | e.getSeconds() >> 1), t << 16 | n;
};
he.isWin = Ax;
he.crcTable = dh;
const Dx = ce;
var Nx = function(e, { fs: t }) {
  var n = e || "", r = o(), i = null;
  function o() {
    return {
      directory: !1,
      readonly: !1,
      hidden: !1,
      executable: !1,
      mtime: 0,
      atime: 0
    };
  }
  return n && t.existsSync(n) ? (i = t.statSync(n), r.directory = i.isDirectory(), r.mtime = i.mtime, r.atime = i.atime, r.executable = (73 & i.mode) !== 0, r.readonly = (128 & i.mode) === 0, r.hidden = Dx.basename(n)[0] === ".") : console.warn("Invalid path: " + n), {
    get directory() {
      return r.directory;
    },
    get readOnly() {
      return r.readonly;
    },
    get hidden() {
      return r.hidden;
    },
    get mtime() {
      return r.mtime;
    },
    get atime() {
      return r.atime;
    },
    get executable() {
      return r.executable;
    },
    decodeAttributes: function() {
    },
    encodeAttributes: function() {
    },
    toJSON: function() {
      return {
        path: n,
        isDirectory: r.directory,
        isReadOnly: r.readonly,
        isHidden: r.hidden,
        isExecutable: r.executable,
        mTime: r.mtime,
        aTime: r.atime
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
}, Ox = {
  efs: !0,
  encode: (e) => Buffer.from(e, "utf8"),
  decode: (e) => e.toString("utf8")
};
gr.exports = Tx;
gr.exports.Constants = fh;
gr.exports.Errors = ci;
gr.exports.FileAttr = Nx;
gr.exports.decoder = Ox;
var ui = gr.exports, Po = {}, Ft = ui, z = Ft.Constants, Rx = function() {
  var e = 20, t = 10, n = 0, r = 0, i = 0, o = 0, s = 0, a = 0, l = 0, h = 0, c = 0, u = 0, p = 0, w = 0, m = 0;
  e |= Ft.isWin ? 2560 : 768, n |= z.FLG_EFS;
  const f = {
    extraLen: 0
  }, g = (y) => Math.max(0, y) >>> 0, v = (y) => Math.max(0, y) & 255;
  return i = Ft.fromDate2DOS(/* @__PURE__ */ new Date()), {
    get made() {
      return e;
    },
    set made(y) {
      e = y;
    },
    get version() {
      return t;
    },
    set version(y) {
      t = y;
    },
    get flags() {
      return n;
    },
    set flags(y) {
      n = y;
    },
    get flags_efs() {
      return (n & z.FLG_EFS) > 0;
    },
    set flags_efs(y) {
      y ? n |= z.FLG_EFS : n &= ~z.FLG_EFS;
    },
    get flags_desc() {
      return (n & z.FLG_DESC) > 0;
    },
    set flags_desc(y) {
      y ? n |= z.FLG_DESC : n &= ~z.FLG_DESC;
    },
    get method() {
      return r;
    },
    set method(y) {
      switch (y) {
        case z.STORED:
          this.version = 10;
          break;
        case z.DEFLATED:
        default:
          this.version = 20;
      }
      r = y;
    },
    get time() {
      return Ft.fromDOS2Date(this.timeval);
    },
    set time(y) {
      y = new Date(y), this.timeval = Ft.fromDate2DOS(y);
    },
    get timeval() {
      return i;
    },
    set timeval(y) {
      i = g(y);
    },
    get timeHighByte() {
      return v(i >>> 8);
    },
    get crc() {
      return o;
    },
    set crc(y) {
      o = g(y);
    },
    get compressedSize() {
      return s;
    },
    set compressedSize(y) {
      s = g(y);
    },
    get size() {
      return a;
    },
    set size(y) {
      a = g(y);
    },
    get fileNameLength() {
      return l;
    },
    set fileNameLength(y) {
      l = y;
    },
    get extraLength() {
      return h;
    },
    set extraLength(y) {
      h = y;
    },
    get extraLocalLength() {
      return f.extraLen;
    },
    set extraLocalLength(y) {
      f.extraLen = y;
    },
    get commentLength() {
      return c;
    },
    set commentLength(y) {
      c = y;
    },
    get diskNumStart() {
      return u;
    },
    set diskNumStart(y) {
      u = g(y);
    },
    get inAttr() {
      return p;
    },
    set inAttr(y) {
      p = g(y);
    },
    get attr() {
      return w;
    },
    set attr(y) {
      w = g(y);
    },
    // get Unix file permissions
    get fileAttr() {
      return (w || 0) >> 16 & 511;
    },
    get offset() {
      return m;
    },
    set offset(y) {
      m = g(y);
    },
    get encrypted() {
      return (n & z.FLG_ENC) === z.FLG_ENC;
    },
    get centralHeaderSize() {
      return z.CENHDR + l + h + c;
    },
    get realDataOffset() {
      return m + z.LOCHDR + f.fnameLen + f.extraLen;
    },
    get localHeader() {
      return f;
    },
    loadLocalHeaderFromBinary: function(y) {
      if (m < 0 || m + z.LOCHDR > y.length)
        throw Ft.Errors.INVALID_LOC();
      var S = y.slice(m, m + z.LOCHDR);
      if (S.readUInt32LE(0) !== z.LOCSIG)
        throw Ft.Errors.INVALID_LOC();
      f.version = S.readUInt16LE(z.LOCVER), f.flags = S.readUInt16LE(z.LOCFLG), f.flags_desc = (f.flags & z.FLG_DESC) > 0, f.method = S.readUInt16LE(z.LOCHOW), f.time = S.readUInt32LE(z.LOCTIM), f.crc = S.readUInt32LE(z.LOCCRC), f.compressedSize = S.readUInt32LE(z.LOCSIZ), f.size = S.readUInt32LE(z.LOCLEN), f.fnameLen = S.readUInt16LE(z.LOCNAM), f.extraLen = S.readUInt16LE(z.LOCEXT);
      const C = m + z.LOCHDR + f.fnameLen, N = C + f.extraLen;
      return y.slice(C, N);
    },
    loadFromBinary: function(y) {
      if (y.length !== z.CENHDR || y.readUInt32LE(0) !== z.CENSIG)
        throw Ft.Errors.INVALID_CEN();
      e = y.readUInt16LE(z.CENVEM), t = y.readUInt16LE(z.CENVER), n = y.readUInt16LE(z.CENFLG), r = y.readUInt16LE(z.CENHOW), i = y.readUInt32LE(z.CENTIM), o = y.readUInt32LE(z.CENCRC), s = y.readUInt32LE(z.CENSIZ), a = y.readUInt32LE(z.CENLEN), l = y.readUInt16LE(z.CENNAM), h = y.readUInt16LE(z.CENEXT), c = y.readUInt16LE(z.CENCOM), u = y.readUInt16LE(z.CENDSK), p = y.readUInt16LE(z.CENATT), w = y.readUInt32LE(z.CENATX), m = y.readUInt32LE(z.CENOFF);
    },
    localHeaderToBinary: function() {
      var y = Buffer.alloc(z.LOCHDR);
      return y.writeUInt32LE(z.LOCSIG, 0), y.writeUInt16LE(t, z.LOCVER), y.writeUInt16LE(n & ~z.FLG_DESC, z.LOCFLG), y.writeUInt16LE(r, z.LOCHOW), y.writeUInt32LE(i, z.LOCTIM), y.writeUInt32LE(o, z.LOCCRC), y.writeUInt32LE(s, z.LOCSIZ), y.writeUInt32LE(a, z.LOCLEN), y.writeUInt16LE(l, z.LOCNAM), y.writeUInt16LE(f.extraLen, z.LOCEXT), y;
    },
    centralHeaderToBinary: function() {
      var y = Buffer.alloc(z.CENHDR + l + h + c);
      return y.writeUInt32LE(z.CENSIG, 0), y.writeUInt16LE(e, z.CENVEM), y.writeUInt16LE(t, z.CENVER), y.writeUInt16LE(n & ~z.FLG_DESC, z.CENFLG), y.writeUInt16LE(r, z.CENHOW), y.writeUInt32LE(i, z.CENTIM), y.writeUInt32LE(o, z.CENCRC), y.writeUInt32LE(s, z.CENSIZ), y.writeUInt32LE(a, z.CENLEN), y.writeUInt16LE(l, z.CENNAM), y.writeUInt16LE(h, z.CENEXT), y.writeUInt16LE(c, z.CENCOM), y.writeUInt16LE(u, z.CENDSK), y.writeUInt16LE(p, z.CENATT), y.writeUInt32LE(w, z.CENATX), y.writeUInt32LE(m, z.CENOFF), y;
    },
    toJSON: function() {
      const y = function(S) {
        return S + " bytes";
      };
      return {
        made: e,
        version: t,
        flags: n,
        method: Ft.methodToString(r),
        time: this.time,
        crc: "0x" + o.toString(16).toUpperCase(),
        compressedSize: y(s),
        size: y(a),
        fileNameLength: y(l),
        extraLength: y(h),
        commentLength: y(c),
        diskNumStart: u,
        inAttr: p,
        attr: w,
        offset: m,
        centralHeaderSize: y(z.CENHDR + l + h + c)
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
}, at = ui, Z = at.Constants, $x = function() {
  var e = 0, t = 0, n = 0, r = 0, i = 0;
  const o = () => e > Z.EF_ZIP64_OR_16 || t > Z.EF_ZIP64_OR_16 || n > Z.EF_ZIP64_OR_32 || r > Z.EF_ZIP64_OR_32;
  return {
    get diskEntries() {
      return e;
    },
    set diskEntries(s) {
      e = t = s;
    },
    get totalEntries() {
      return t;
    },
    set totalEntries(s) {
      t = e = s;
    },
    get size() {
      return n;
    },
    set size(s) {
      n = s;
    },
    get offset() {
      return r;
    },
    set offset(s) {
      r = s;
    },
    get commentLength() {
      return i;
    },
    set commentLength(s) {
      i = s;
    },
    get mainHeaderSize() {
      return (o() ? Z.ZIP64HDR + Z.END64HDR : 0) + Z.ENDHDR + i;
    },
    loadFromBinary: function(s) {
      if ((s.length !== Z.ENDHDR || s.readUInt32LE(0) !== Z.ENDSIG) && (s.length < Z.ZIP64HDR || s.readUInt32LE(0) !== Z.ZIP64SIG))
        throw at.Errors.INVALID_END();
      s.readUInt32LE(0) === Z.ENDSIG ? (e = s.readUInt16LE(Z.ENDSUB), t = s.readUInt16LE(Z.ENDTOT), n = s.readUInt32LE(Z.ENDSIZ), r = s.readUInt32LE(Z.ENDOFF), i = s.readUInt16LE(Z.ENDCOM)) : (e = at.readBigUInt64LE(s, Z.ZIP64SUB), t = at.readBigUInt64LE(s, Z.ZIP64TOT), n = at.readBigUInt64LE(s, Z.ZIP64SIZB), r = at.readBigUInt64LE(s, Z.ZIP64OFF), i = 0);
    },
    toBinary: function() {
      if (!o()) {
        var s = Buffer.alloc(Z.ENDHDR + i);
        return s.writeUInt32LE(Z.ENDSIG, 0), s.writeUInt32LE(0, 4), s.writeUInt16LE(e, Z.ENDSUB), s.writeUInt16LE(t, Z.ENDTOT), s.writeUInt32LE(n, Z.ENDSIZ), s.writeUInt32LE(r, Z.ENDOFF), s.writeUInt16LE(i, Z.ENDCOM), s.fill(" ", Z.ENDHDR), s;
      }
      var s = Buffer.alloc(this.mainHeaderSize);
      let a = 0;
      s.writeUInt32LE(Z.ZIP64SIG, a), at.writeBigUInt64LE(s, Z.ZIP64HDR - Z.ZIP64LEAD, a + Z.ZIP64SIZE), s.writeUInt16LE(45, a + Z.ZIP64VEM), s.writeUInt16LE(45, a + Z.ZIP64VER), s.writeUInt32LE(0, a + Z.ZIP64DSK), s.writeUInt32LE(0, a + Z.ZIP64DSKDIR), at.writeBigUInt64LE(s, e, a + Z.ZIP64SUB), at.writeBigUInt64LE(s, t, a + Z.ZIP64TOT), at.writeBigUInt64LE(s, n, a + Z.ZIP64SIZB), at.writeBigUInt64LE(s, r, a + Z.ZIP64OFF);
      const l = r + n;
      return a += Z.ZIP64HDR, s.writeUInt32LE(Z.END64SIG, a), s.writeUInt32LE(0, a + Z.END64START), at.writeBigUInt64LE(s, l, a + Z.END64OFF), s.writeUInt32LE(1, a + Z.END64NUMDISKS), a += Z.END64HDR, s.writeUInt32LE(Z.ENDSIG, a), s.writeUInt32LE(0, a + 4), s.writeUInt16LE(Math.min(e, Z.EF_ZIP64_OR_16), a + Z.ENDSUB), s.writeUInt16LE(Math.min(t, Z.EF_ZIP64_OR_16), a + Z.ENDTOT), s.writeUInt32LE(Math.min(n, Z.EF_ZIP64_OR_32), a + Z.ENDSIZ), s.writeUInt32LE(Math.min(r, Z.EF_ZIP64_OR_32), a + Z.ENDOFF), s.writeUInt16LE(i, a + Z.ENDCOM), s.fill(" ", a + Z.ENDHDR), s;
    },
    toJSON: function() {
      const s = function(a, l) {
        let h = a.toString(16).toUpperCase();
        for (; h.length < l; ) h = "0" + h;
        return "0x" + h;
      };
      return {
        diskEntries: e,
        totalEntries: t,
        size: n + " bytes",
        offset: s(r, 4),
        commentLength: i
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
};
Po.EntryHeader = Rx;
Po.MainHeader = $x;
var Fo = {}, Lx = function(e) {
  var t = Zr, n = { chunkSize: (parseInt(e.length / 1024) + 1) * 1024 };
  return {
    deflate: function() {
      return t.deflateRawSync(e, n);
    },
    deflateAsync: function(r) {
      var i = t.createDeflateRaw(n), o = [], s = 0;
      i.on("data", function(a) {
        o.push(a), s += a.length;
      }), i.on("end", function() {
        var a = Buffer.alloc(s), l = 0;
        a.fill(0);
        for (var h = 0; h < o.length; h++) {
          var c = o[h];
          c.copy(a, l), l += c.length;
        }
        r && r(a);
      }), i.end(e);
    }
  };
}, Uu;
const Px = +(((Uu = process == null ? void 0 : process.versions) == null ? void 0 : Uu.node) ?? "").split(".")[0] || 0, Fx = ci;
var Ux = function(e, t) {
  var n = Zr;
  const r = t > 0 ? t : 1, i = Px >= 15 ? { maxOutputLength: r } : {};
  return {
    inflate: function() {
      return n.inflateRawSync(e, i);
    },
    inflateAsync: function(o) {
      var s = n.createInflateRaw(i), a = [], l = 0, h = !1;
      const c = function(u) {
        h || (h = !0, s.destroy(), o && o(Buffer.alloc(0), u));
      };
      s.on("error", function(u) {
        c(u);
      }), s.on("data", function(u) {
        if (!h) {
          if (l += u.length, l > r)
            return c(Fx.MAX_OUTPUT_EXCEEDED());
          a.push(u);
        }
      }), s.on("end", function() {
        if (!h) {
          h = !0;
          var u = Buffer.alloc(l), p = 0;
          u.fill(0);
          for (var w = 0; w < a.length; w++) {
            var m = a[w];
            m.copy(u, p), p += m.length;
          }
          o && o(u);
        }
      }), s.end(e);
    }
  };
};
const { randomFillSync: Au } = ur, Mx = ci, kx = new Uint32Array(256).map((e, t) => {
  for (let n = 0; n < 8; n++)
    t & 1 ? t = t >>> 1 ^ 3988292384 : t >>>= 1;
  return t >>> 0;
}), hh = (e, t) => Math.imul(e, t) >>> 0, Tu = (e, t) => kx[(e ^ t) & 255] ^ e >>> 8, Xr = () => typeof Au == "function" ? Au(Buffer.alloc(12)) : Xr.node();
Xr.node = () => {
  const e = Buffer.alloc(12), t = e.length;
  for (let n = 0; n < t; n++) e[n] = Math.random() * 256 & 255;
  return e;
};
const qi = {
  genSalt: Xr
};
function Uo(e) {
  const t = Buffer.isBuffer(e) ? e : Buffer.from(e);
  this.keys = new Uint32Array([305419896, 591751049, 878082192]);
  for (let n = 0; n < t.length; n++)
    this.updateKeys(t[n]);
}
Uo.prototype.updateKeys = function(e) {
  const t = this.keys;
  return t[0] = Tu(t[0], e), t[1] += t[0] & 255, t[1] = hh(t[1], 134775813) + 1, t[2] = Tu(t[2], t[1] >>> 24), e;
};
Uo.prototype.next = function() {
  const e = (this.keys[2] | 2) >>> 0;
  return hh(e, e ^ 1) >> 8 & 255;
};
function Bx(e) {
  const t = new Uo(e);
  return function(n) {
    const r = Buffer.alloc(n.length);
    let i = 0;
    for (let o of n)
      r[i++] = t.updateKeys(o ^ t.next());
    return r;
  };
}
function jx(e) {
  const t = new Uo(e);
  return function(n, r, i = 0) {
    r || (r = Buffer.alloc(n.length));
    for (let o of n) {
      const s = t.next();
      r[i++] = o ^ s, t.updateKeys(o);
    }
    return r;
  };
}
function Hx(e, t, n) {
  if (!e || !Buffer.isBuffer(e) || e.length < 12)
    return Buffer.alloc(0);
  const r = Bx(n), i = r(e.slice(0, 12)), o = (t.flags & 8) === 8 ? t.timeHighByte : t.crc >>> 24;
  if (i[11] !== o)
    throw Mx.WRONG_PASSWORD();
  return r(e.slice(12));
}
function Gx(e) {
  Buffer.isBuffer(e) && e.length >= 12 ? qi.genSalt = function() {
    return e.slice(0, 12);
  } : e === "node" ? qi.genSalt = Xr.node : qi.genSalt = Xr;
}
function zx(e, t, n, r = !1) {
  e == null && (e = Buffer.alloc(0)), Buffer.isBuffer(e) || (e = Buffer.from(e.toString()));
  const i = jx(n), o = qi.genSalt();
  o[11] = t.crc >>> 24 & 255, r && (o[10] = t.crc >>> 16 & 255);
  const s = Buffer.alloc(e.length + 12);
  return i(o, s), i(e, s, 12);
}
var qx = { decrypt: Hx, encrypt: zx, _salter: Gx };
Fo.Deflater = Lx;
Fo.Inflater = Ux;
Fo.ZipCrypto = qx;
var ue = ui, Vx = Po, nt = ue.Constants, Ms = Fo, ph = function(e, t) {
  var n = new Vx.EntryHeader(), r = Buffer.alloc(0), i = Buffer.alloc(0), o = !1, s = null, a = Buffer.alloc(0), l = Buffer.alloc(0), h = !0;
  const c = e, u = typeof c.decoder == "object" ? c.decoder : ue.decoder;
  h = u.hasOwnProperty("efs") ? u.efs : !1;
  function p() {
    if (!t || !(t instanceof Uint8Array))
      return Buffer.alloc(0);
    l = n.loadLocalHeaderFromBinary(t);
    const S = n.realDataOffset, C = S + n.compressedSize;
    if (S < 0 || C < S || C > t.length)
      throw ue.Errors.INVALID_LOC();
    return t.slice(S, C);
  }
  function w(S) {
    const C = n.flags_desc || n.localHeader.flags_desc ? n.crc : n.localHeader.crc;
    return ue.crc32(S) === C;
  }
  function m(S, C, N) {
    if (typeof C > "u" && typeof S == "string" && (N = S, S = void 0), o)
      return S && C && C(Buffer.alloc(0), ue.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
    var D;
    try {
      if (D = p(), D.length === 0)
        return S && C && C(D), D;
      if (n.encrypted) {
        if (typeof N != "string" && !Buffer.isBuffer(N))
          throw ue.Errors.INVALID_PASS_PARAM();
        D = Ms.ZipCrypto.decrypt(D, n, N);
      }
    } catch (L) {
      if (S && C)
        return C(Buffer.alloc(0), L), Buffer.alloc(0);
      throw L;
    }
    var B;
    switch (n.method) {
      case ue.Constants.STORED:
        if (B = Buffer.alloc(D.length), D.copy(B), w(B))
          return S && C && C(B), B;
        throw S && C && C(B, ue.Errors.BAD_CRC()), ue.Errors.BAD_CRC();
      case ue.Constants.DEFLATED:
        var k = new Ms.Inflater(D, n.size);
        if (S)
          k.inflateAsync(function(L, x) {
            C && (x ? C(Buffer.alloc(0), x) : w(L) ? C(L) : C(L, ue.Errors.BAD_CRC()));
          });
        else {
          if (B = k.inflate(), !w(B))
            throw ue.Errors.BAD_CRC(`"${u.decode(r)}"`);
          return B;
        }
        break;
      default:
        throw S && C && C(Buffer.alloc(0), ue.Errors.UNKNOWN_METHOD()), ue.Errors.UNKNOWN_METHOD();
    }
  }
  function f(S, C) {
    if ((!s || !s.length) && Buffer.isBuffer(t))
      return S && C && C(p()), p();
    if (s.length && !o) {
      var N;
      switch (n.method) {
        case ue.Constants.STORED:
          return n.compressedSize = n.size, N = Buffer.alloc(s.length), s.copy(N), S && C && C(N), N;
        default:
        case ue.Constants.DEFLATED:
          var D = new Ms.Deflater(s);
          if (S)
            D.deflateAsync(function(k) {
              N = Buffer.alloc(k.length), n.compressedSize = k.length, k.copy(N), C && C(N);
            });
          else {
            var B = D.deflate();
            return n.compressedSize = B.length, B;
          }
          D = null;
          break;
      }
    } else if (S && C)
      C(Buffer.alloc(0));
    else
      return Buffer.alloc(0);
  }
  function g(S, C) {
    return ue.readBigUInt64LE(S, C);
  }
  function v(S) {
    try {
      for (var C = 0, N, D, B; C + 4 < S.length; )
        N = S.readUInt16LE(C), C += 2, D = S.readUInt16LE(C), C += 2, B = S.slice(C, C + D), C += D, nt.ID_ZIP64 === N && y(B);
    } catch {
      throw ue.Errors.EXTRA_FIELD_PARSE_ERROR();
    }
  }
  function y(S) {
    var C, N, D, B;
    S.length >= nt.EF_ZIP64_SCOMP && (C = g(S, nt.EF_ZIP64_SUNCOMP), n.size === nt.EF_ZIP64_OR_32 && (n.size = C)), S.length >= nt.EF_ZIP64_RHO && (N = g(S, nt.EF_ZIP64_SCOMP), n.compressedSize === nt.EF_ZIP64_OR_32 && (n.compressedSize = N)), S.length >= nt.EF_ZIP64_DSN && (D = g(S, nt.EF_ZIP64_RHO), n.offset === nt.EF_ZIP64_OR_32 && (n.offset = D)), S.length >= nt.EF_ZIP64_DSN + 4 && (B = S.readUInt32LE(nt.EF_ZIP64_DSN), n.diskNumStart === nt.EF_ZIP64_OR_16 && (n.diskNumStart = B));
  }
  return {
    get entryName() {
      return u.decode(r);
    },
    get rawEntryName() {
      return r;
    },
    set entryName(S) {
      r = ue.toBuffer(S, u.encode);
      var C = r[r.length - 1];
      o = C === 47 || C === 92, n.fileNameLength = r.length;
    },
    get efs() {
      return typeof h == "function" ? h(this.entryName) : h;
    },
    get extra() {
      return a;
    },
    set extra(S) {
      a = S, n.extraLength = S.length, v(S);
    },
    get comment() {
      return u.decode(i);
    },
    set comment(S) {
      if (i = ue.toBuffer(S, u.encode), n.commentLength = i.length, i.length > 65535) throw ue.Errors.COMMENT_TOO_LONG();
    },
    get name() {
      const S = u.decode(r);
      return o ? S.replace(/[/\\]$/, "").split("/").pop() : S.split("/").pop();
    },
    get isDirectory() {
      return o;
    },
    getCompressedData: function() {
      return f(!1, null);
    },
    getCompressedDataAsync: function(S) {
      f(!0, S);
    },
    setData: function(S) {
      s = ue.toBuffer(S, ue.decoder.encode), !o && s.length ? (n.size = s.length, n.method = ue.Constants.DEFLATED, n.crc = ue.crc32(S), n.changed = !0) : n.method = ue.Constants.STORED;
    },
    getData: function(S) {
      return n.changed ? s : m(!1, null, S);
    },
    getDataAsync: function(S, C) {
      n.changed ? S(s) : m(!0, S, C);
    },
    set attr(S) {
      n.attr = S;
    },
    get attr() {
      return n.attr;
    },
    set header(S) {
      n.loadFromBinary(S);
    },
    get header() {
      return n;
    },
    packCentralHeader: function() {
      n.flags_efs = this.efs, n.extraLength = a.length;
      var S = n.centralHeaderToBinary(), C = ue.Constants.CENHDR;
      return r.copy(S, C), C += r.length, a.copy(S, C), C += n.extraLength, i.copy(S, C), S;
    },
    packLocalHeader: function() {
      let S = 0;
      n.flags_efs = this.efs, n.extraLocalLength = l.length;
      const C = n.localHeaderToBinary(), N = Buffer.alloc(C.length + r.length + n.extraLocalLength);
      return C.copy(N, S), S += C.length, r.copy(N, S), S += r.length, l.copy(N, S), S += l.length, N;
    },
    toJSON: function() {
      const S = function(C) {
        return "<" + (C && C.length + " bytes buffer" || "null") + ">";
      };
      return {
        entryName: this.entryName,
        name: this.name,
        comment: this.comment,
        isDirectory: this.isDirectory,
        header: n.toJSON(),
        compressedData: S(t),
        data: S(s)
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
};
const Du = ph, Wx = Po, Be = ui;
var Yx = function(e, t) {
  var n = [], r = /* @__PURE__ */ Object.create(null), i = Buffer.alloc(0), o = new Wx.MainHeader(), s = !1;
  const a = /* @__PURE__ */ new Set(), l = t, { noSort: h, decoder: c } = l;
  e ? w(l.readEntries) : s = !0;
  function u() {
    const f = /* @__PURE__ */ new Set();
    for (const g of Object.keys(r)) {
      const v = g.split("/");
      if (v.pop(), !!v.length)
        for (let y = 0; y < v.length; y++) {
          const S = v.slice(0, y + 1).join("/") + "/";
          f.add(S);
        }
    }
    for (const g of f)
      if (!(g in r)) {
        const v = new Du(l);
        v.entryName = g, v.attr = 16, v.temporary = !0, n.push(v), r[v.entryName] = v, a.add(v);
      }
  }
  function p() {
    if (s = !0, r = /* @__PURE__ */ Object.create(null), o.diskEntries > (e.length - o.offset) / Be.Constants.CENHDR)
      throw Be.Errors.DISK_ENTRY_TOO_LARGE();
    n = new Array(o.diskEntries);
    for (var f = o.offset, g = 0; g < n.length; g++) {
      var v = f, y = new Du(l, e);
      if (y.header = e.slice(v, v += Be.Constants.CENHDR), y.entryName = e.slice(v, v += y.header.fileNameLength), y.header.extraLength && (y.extra = e.slice(v, v += y.header.extraLength)), y.header.commentLength && (y.comment = e.slice(v, v + y.header.commentLength)), f += y.header.centralHeaderSize, y.entryName in r)
        throw Be.Errors.DUPLICATE_ENTRY(`"${y.entryName}"`);
      n[g] = y, r[y.entryName] = y;
    }
    a.clear(), u();
  }
  function w(f) {
    var g = e.length - Be.Constants.ENDHDR, v = Math.max(0, g - 65535), y = v, S = e.length, C = -1, N = 0;
    for ((typeof l.trailingSpace == "boolean" ? l.trailingSpace : !1) && (v = 0), g; g >= y; g--)
      if (e[g] === 80) {
        if (e.readUInt32LE(g) === Be.Constants.ENDSIG) {
          C = g, N = g, S = g + Be.Constants.ENDHDR, y = g - Be.Constants.END64HDR;
          continue;
        }
        if (e.readUInt32LE(g) === Be.Constants.END64SIG) {
          y = v;
          continue;
        }
        if (e.readUInt32LE(g) === Be.Constants.ZIP64SIG) {
          C = g, S = g + Be.readBigUInt64LE(e, g + Be.Constants.ZIP64SIZE) + Be.Constants.ZIP64LEAD;
          break;
        }
      }
    if (C == -1) throw Be.Errors.INVALID_FORMAT();
    o.loadFromBinary(e.slice(C, S)), o.commentLength && (i = e.slice(N + Be.Constants.ENDHDR)), f && p();
  }
  function m() {
    n.length > 1 && !h && (n = n.map((f) => ({ entry: f, key: f.entryName.toLowerCase() })).sort((f, g) => f.key.localeCompare(g.key)).map((f) => f.entry));
  }
  return {
    /**
     * Returns an array of ZipEntry objects existent in the current opened archive
     * @return Array
     */
    get entries() {
      return s || p(), n.filter((f) => !a.has(f));
    },
    /**
     * Archive comment
     * @return {String}
     */
    get comment() {
      return c.decode(i);
    },
    set comment(f) {
      i = Be.toBuffer(f, c.encode), o.commentLength = i.length;
    },
    getEntryCount: function() {
      return s ? n.length : o.diskEntries;
    },
    forEach: function(f) {
      this.entries.forEach(f);
    },
    /**
     * Returns a reference to the entry with the given name or null if entry is inexistent
     *
     * @param entryName
     * @return ZipEntry
     */
    getEntry: function(f) {
      return s || p(), r[f] || null;
    },
    /**
     * Adds the given entry to the entry list
     *
     * @param entry
     */
    setEntry: function(f) {
      s || p(), n.push(f), r[f.entryName] = f, o.totalEntries = n.length;
    },
    /**
     * Removes the file with the given name from the entry list.
     *
     * If the entry is a directory, then all nested files and directories will be removed
     * @param entryName
     * @returns {void}
     */
    deleteFile: function(f, g = !0) {
      s || p();
      const v = r[f];
      this.getEntryChildren(v, g).map((S) => S.entryName).forEach(this.deleteEntry);
    },
    /**
     * Removes the entry with the given name from the entry list.
     *
     * @param {string} entryName
     * @returns {void}
     */
    deleteEntry: function(f) {
      s || p();
      const g = r[f], v = n.indexOf(g);
      v >= 0 && (n.splice(v, 1), delete r[f], o.totalEntries = n.length);
    },
    /**
     *  Iterates and returns all nested files and directories of the given entry
     *
     * @param entry
     * @return Array
     */
    getEntryChildren: function(f, g = !0) {
      if (s || p(), typeof f == "object")
        if (f.isDirectory && g) {
          const v = [], y = f.entryName;
          for (const S of n)
            S.entryName.startsWith(y) && v.push(S);
          return v;
        } else
          return [f];
      return [];
    },
    /**
     *  How many child elements entry has
     *
     * @param {ZipEntry} entry
     * @return {integer}
     */
    getChildCount: function(f) {
      if (f && f.isDirectory) {
        const g = this.getEntryChildren(f);
        return g.includes(f) ? g.length - 1 : g.length;
      }
      return 0;
    },
    /**
     * Returns the zip file
     *
     * @return Buffer
     */
    compressToBuffer: function() {
      s || p(), m();
      const f = [], g = [];
      let v = 0, y = 0;
      o.size = 0, o.offset = 0;
      let S = 0;
      for (const D of this.entries) {
        const B = D.getCompressedData();
        D.header.offset = y;
        const k = D.packLocalHeader(), L = k.length + B.length;
        y += L, f.push(k), f.push(B);
        const x = D.packCentralHeader();
        g.push(x), o.size += x.length, v += L + x.length, S++;
      }
      v += o.mainHeaderSize, o.offset = y, o.totalEntries = S, y = 0;
      const C = Buffer.alloc(v);
      for (const D of f)
        D.copy(C, y), y += D.length;
      for (const D of g)
        D.copy(C, y), y += D.length;
      const N = o.toBinary();
      return i && i.copy(N, N.length - i.length), N.copy(C, y), e = C, s = !1, C;
    },
    toAsyncBuffer: function(f, g, v, y) {
      try {
        s || p(), m();
        const S = [], C = [];
        let N = 0, D = 0, B = 0;
        o.size = 0, o.offset = 0;
        const k = function(L) {
          if (L.length > 0) {
            const x = L.shift(), W = x.entryName + x.extra.toString();
            v && v(W), x.getCompressedDataAsync(function(K) {
              y && y(W), x.header.offset = D;
              const te = x.packLocalHeader(), F = te.length + K.length;
              D += F, S.push(te), S.push(K);
              const O = x.packCentralHeader();
              C.push(O), o.size += O.length, N += F + O.length, B++, k(L);
            });
          } else {
            N += o.mainHeaderSize, o.offset = D, o.totalEntries = B, D = 0;
            const x = Buffer.alloc(N);
            S.forEach(function(K) {
              K.copy(x, D), D += K.length;
            }), C.forEach(function(K) {
              K.copy(x, D), D += K.length;
            });
            const W = o.toBinary();
            i && i.copy(W, W.length - i.length), W.copy(x, D), e = x, s = !1, f(x);
          }
        };
        k(Array.from(this.entries));
      } catch (S) {
        g(S);
      }
    }
  };
};
const _e = ui, we = ce, Xx = ph, Jx = Yx, yn = (...e) => _e.findLast(e, (t) => typeof t == "boolean"), Nu = (...e) => _e.findLast(e, (t) => typeof t == "string"), Zx = (...e) => _e.findLast(e, (t) => typeof t == "function"), Kx = {
  // option "noSort" : if true it disables files sorting
  noSort: !1,
  // read entries during load (initial loading may be slower)
  readEntries: !1,
  // default method is none
  method: _e.Constants.NONE,
  // file system
  fs: null
};
var Qx = function(e, t) {
  let n = null;
  const r = Object.assign(/* @__PURE__ */ Object.create(null), Kx);
  e && typeof e == "object" && (e instanceof Uint8Array || (Object.assign(r, e), e = r.input ? r.input : void 0, r.input && delete r.input), Buffer.isBuffer(e) && (n = e, r.method = _e.Constants.BUFFER, e = void 0)), Object.assign(r, t);
  const i = new _e(r), o = (m) => {
    m.filter((f) => f.attr).sort((f, g) => g.path.length - f.path.length).forEach((f) => i.fs.chmodSync(f.path, f.attr));
  };
  if ((typeof r.decoder != "object" || typeof r.decoder.encode != "function" || typeof r.decoder.decode != "function") && (r.decoder = _e.decoder), e && typeof e == "string")
    if (i.fs.existsSync(e))
      r.method = _e.Constants.FILE, r.filename = e, n = i.fs.readFileSync(e);
    else
      throw _e.Errors.INVALID_FILENAME();
  const s = new Jx(n, r), { canonical: a, sanitize: l, zipnamefix: h } = _e;
  function c(m) {
    if (m && s) {
      var f;
      if (typeof m == "string" && (f = s.getEntry(we.posix.normalize(m))), typeof m == "object" && typeof m.entryName < "u" && typeof m.header < "u" && (f = s.getEntry(m.entryName)), f)
        return f;
    }
    return null;
  }
  function u(m) {
    const { join: f, normalize: g, sep: v } = we.posix;
    return f(we.isAbsolute(m) ? "/" : ".", g(v + m.split("\\").join(v) + v));
  }
  function p(m) {
    return m instanceof RegExp ? /* @__PURE__ */ function(f) {
      return function(g) {
        return f.test(g);
      };
    }(m) : typeof m != "function" ? () => !0 : m;
  }
  const w = (m, f) => {
    let g = f.slice(-1);
    return g = g === i.sep ? i.sep : "", we.relative(m, f) + g;
  };
  return {
    /**
     * Extracts the given entry from the archive and returns the content as a Buffer object
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @param {Buffer|string} [pass] - password
     * @return Buffer or Null in case of error
     */
    readFile: function(m, f) {
      var g = c(m);
      return g && g.getData(f) || null;
    },
    /**
     * Returns how many child elements has on entry (directories) on files it is always 0
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @returns {integer}
     */
    childCount: function(m) {
      const f = c(m);
      if (f)
        return s.getChildCount(f);
    },
    /**
     * Asynchronous readFile
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @param {callback} callback
     *
     * @return Buffer or Null in case of error
     */
    readFileAsync: function(m, f) {
      var g = c(m);
      g ? g.getDataAsync(f) : f(null, "getEntry failed for:" + m);
    },
    /**
     * Extracts the given entry from the archive and returns the content as plain text in the given encoding
     * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
     * @param {string} encoding - Optional. If no encoding is specified utf8 is used
     *
     * @return String
     */
    readAsText: function(m, f) {
      var g = c(m);
      if (g) {
        var v = g.getData();
        if (v && v.length)
          return v.toString(f || "utf8");
      }
      return "";
    },
    /**
     * Asynchronous readAsText
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @param {callback} callback
     * @param {string} [encoding] - Optional. If no encoding is specified utf8 is used
     *
     * @return String
     */
    readAsTextAsync: function(m, f, g) {
      var v = c(m);
      v ? v.getDataAsync(function(y, S) {
        if (S) {
          f(y, S);
          return;
        }
        y && y.length ? f(y.toString(g || "utf8")) : f("");
      }) : f("");
    },
    /**
     * Remove the entry from the file or the entry and all it's nested directories and files if the given entry is a directory
     *
     * @param {ZipEntry|string} entry
     * @param {boolean} withsubfolders
     * @returns {void}
     */
    deleteFile: function(m, f = !0) {
      var g = c(m);
      g && s.deleteFile(g.entryName, f);
    },
    /**
     * Remove the entry from the file or directory without affecting any nested entries
     *
     * @param {ZipEntry|string} entry
     * @returns {void}
     */
    deleteEntry: function(m) {
      var f = c(m);
      f && s.deleteEntry(f.entryName);
    },
    /**
     * Adds a comment to the zip. The zip must be rewritten after adding the comment.
     *
     * @param {string} comment
     */
    addZipComment: function(m) {
      s.comment = m;
    },
    /**
     * Returns the zip comment
     *
     * @return String
     */
    getZipComment: function() {
      return s.comment || "";
    },
    /**
     * Adds a comment to a specified zipEntry. The zip must be rewritten after adding the comment
     * The comment cannot exceed 65535 characters in length
     *
     * @param {ZipEntry} entry
     * @param {string} comment
     */
    addZipEntryComment: function(m, f) {
      var g = c(m);
      g && (g.comment = f);
    },
    /**
     * Returns the comment of the specified entry
     *
     * @param {ZipEntry} entry
     * @return String
     */
    getZipEntryComment: function(m) {
      var f = c(m);
      return f && f.comment || "";
    },
    /**
     * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
     *
     * @param {ZipEntry} entry
     * @param {Buffer} content
     */
    updateFile: function(m, f) {
      var g = c(m);
      g && g.setData(f);
    },
    /**
     * Adds a file from the disk to the archive
     *
     * @param {string} localPath File to add to zip
     * @param {string} [zipPath] Optional path inside the zip
     * @param {string} [zipName] Optional name for the file
     * @param {string} [comment] Optional file comment
     */
    addLocalFile: function(m, f, g, v) {
      if (i.fs.existsSync(m)) {
        f = f ? u(f) : "";
        const y = we.win32.basename(we.win32.normalize(m));
        f += g || y;
        const S = i.fs.statSync(m), C = S.isFile() ? i.fs.readFileSync(m) : Buffer.alloc(0);
        S.isDirectory() && (f += i.sep), this.addFile(f, C, v, S);
      } else
        throw _e.Errors.FILE_NOT_FOUND(m);
    },
    /**
     * Callback for showing if everything was done.
     *
     * @callback doneCallback
     * @param {Error} err - Error object
     * @param {boolean} done - was request fully completed
     */
    /**
     * Adds a file from the disk to the archive
     *
     * @param {(object|string)} options - options object, if it is string it us used as localPath.
     * @param {string} options.localPath - Local path to the file.
     * @param {string} [options.comment] - Optional file comment.
     * @param {string} [options.zipPath] - Optional path inside the zip
     * @param {string} [options.zipName] - Optional name for the file
     * @param {doneCallback} callback - The callback that handles the response.
     */
    addLocalFileAsync: function(m, f) {
      m = typeof m == "object" ? m : { localPath: m };
      const g = we.resolve(m.localPath), { comment: v } = m;
      let { zipPath: y, zipName: S } = m;
      const C = this;
      i.fs.stat(g, function(N, D) {
        if (N) return f(N, !1);
        y = y ? u(y) : "";
        const B = we.win32.basename(we.win32.normalize(g));
        if (y += S || B, D.isFile())
          i.fs.readFile(g, function(k, L) {
            return k ? f(k, !1) : (C.addFile(y, L, v, D), setImmediate(f, void 0, !0));
          });
        else if (D.isDirectory())
          return y += i.sep, C.addFile(y, Buffer.alloc(0), v, D), setImmediate(f, void 0, !0);
      });
    },
    /**
     * Adds a local directory and all its nested files and directories to the archive
     *
     * @param {string} localPath - local path to the folder
     * @param {string} [zipPath] - optional path inside zip
     * @param {(RegExp|function)} [filter] - optional RegExp or Function if files match will be included.
     */
    addLocalFolder: function(m, f, g) {
      if (g = p(g), f = f ? u(f) : "", m = we.normalize(m), i.fs.existsSync(m)) {
        const v = i.findFiles(m), y = this;
        if (v.length)
          for (const S of v) {
            const C = we.join(f, w(m, S));
            g(C) && y.addLocalFile(S, we.dirname(C));
          }
      } else
        throw _e.Errors.FILE_NOT_FOUND(m);
    },
    /**
     * Asynchronous addLocalFolder
     * @param {string} localPath
     * @param {callback} callback
     * @param {string} [zipPath] optional path inside zip
     * @param {RegExp|function} [filter] optional RegExp or Function if files match will
     *               be included.
     */
    addLocalFolderAsync: function(m, f, g, v) {
      v = p(v), g = g ? u(g) : "", m = we.normalize(m);
      var y = this;
      i.fs.open(m, "r", function(S) {
        if (S && S.code === "ENOENT")
          f(void 0, _e.Errors.FILE_NOT_FOUND(m));
        else if (S)
          f(void 0, S);
        else {
          var C = i.findFiles(m), N = -1, D = function() {
            if (N += 1, N < C.length) {
              var B = C[N], k = w(m, B).split("\\").join("/");
              k = k.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), v(k) ? i.fs.stat(B, function(L, x) {
                L && f(void 0, L), x.isFile() ? i.fs.readFile(B, function(W, K) {
                  W ? f(void 0, W) : (y.addFile(g + k, K, "", x), D());
                }) : (y.addFile(g + k + "/", Buffer.alloc(0), "", x), D());
              }) : process.nextTick(() => {
                D();
              });
            } else
              f(!0, void 0);
          };
          D();
        }
      });
    },
    /**
     * Adds a local directory and all its nested files and directories to the archive
     *
     * @param {object | string} options - options object, if it is string it us used as localPath.
     * @param {string} options.localPath - Local path to the folder.
     * @param {string} [options.zipPath] - optional path inside zip.
     * @param {RegExp|function} [options.filter] - optional RegExp or Function if files match will be included.
     * @param {function|string} [options.namefix] - optional function to help fix filename
     * @param {doneCallback} callback - The callback that handles the response.
     *
     */
    addLocalFolderAsync2: function(m, f) {
      const g = this;
      m = typeof m == "object" ? m : { localPath: m };
      const v = we.resolve(m.localPath);
      let { zipPath: y, filter: S, namefix: C } = m;
      S instanceof RegExp ? S = /* @__PURE__ */ function(B) {
        return function(k) {
          return B.test(k);
        };
      }(S) : typeof S != "function" && (S = function() {
        return !0;
      }), y = y ? u(y) : "", C === "latin1" && (C = (B) => B.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof C != "function" && (C = (B) => B);
      const N = (B) => we.join(y, C(w(v, B))), D = (B) => we.win32.basename(we.win32.normalize(C(B)));
      i.fs.open(v, "r", function(B) {
        B && B.code === "ENOENT" ? f(_e.Errors.FILE_NOT_FOUND(v), !1) : B ? f(B, !1) : i.findFilesAsync(v, function(k, L) {
          if (k) return f(k, !1);
          if (L = L.filter((x) => S(N(x))), !L.length) return f(void 0, !0);
          setImmediate(
            L.reverse().reduce(function(x, W) {
              return function(K, te) {
                if (K || te === !1) return setImmediate(x, K, !1);
                g.addLocalFileAsync(
                  {
                    localPath: W,
                    zipPath: we.dirname(N(W)),
                    zipName: D(W)
                  },
                  x
                );
              };
            }, f)
          );
        });
      });
    },
    /**
     * Adds a local directory and all its nested files and directories to the archive
     *
     * @param {string} localPath - path where files will be extracted
     * @param {object} props - optional properties
     * @param {string} [props.zipPath] - optional path inside zip
     * @param {RegExp|function} [props.filter] - optional RegExp or Function if files match will be included.
     * @param {function|string} [props.namefix] - optional function to help fix filename
     */
    addLocalFolderPromise: function(m, f) {
      return new Promise((g, v) => {
        this.addLocalFolderAsync2(Object.assign({ localPath: m }, f), (y, S) => {
          if (y) return v(y);
          S && g(this);
        });
      });
    },
    /**
     * Allows you to create a entry (file or directory) in the zip file.
     * If you want to create a directory the entryName must end in / and a null buffer should be provided.
     * Comment and attributes are optional
     *
     * @param {string} entryName
     * @param {Buffer | string} content - file content as buffer or utf8 coded string
     * @param {string} [comment] - file comment
     * @param {number | object} [attr] - number as unix file permissions, object as filesystem Stats object
     */
    addFile: function(m, f, g, v) {
      m = h(m);
      let y = c(m);
      const S = y != null;
      S || (y = new Xx(r), y.entryName = m), y.comment = g || "";
      const C = typeof v == "object" && v instanceof i.fs.Stats;
      C && (y.header.time = v.mtime);
      var N = y.isDirectory ? 16 : 0;
      let D = y.isDirectory ? 16384 : 32768;
      return C ? D |= 4095 & v.mode : typeof v == "number" ? D |= 4095 & v : D |= y.isDirectory ? 493 : 420, N = (N | D << 16) >>> 0, y.attr = N, y.setData(f), S || s.setEntry(y), y;
    },
    /**
     * Returns an array of ZipEntry objects representing the files and folders inside the archive
     *
     * @param {string} [password]
     * @returns Array
     */
    getEntries: function(m) {
      return s.password = m, s ? s.entries : [];
    },
    /**
     * Returns a ZipEntry object representing the file or folder specified by ``name``.
     *
     * @param {string} name
     * @return ZipEntry
     */
    getEntry: function(m) {
      return c(m);
    },
    getEntryCount: function() {
      return s.getEntryCount();
    },
    forEach: function(m) {
      return s.forEach(m);
    },
    /**
     * Extracts the given entry to the given targetPath
     * If the entry is a directory inside the archive, the entire directory and it's subdirectories will be extracted
     *
     * @param {string|ZipEntry} entry - ZipEntry object or String with the full path of the entry
     * @param {string} targetPath - Target folder where to write the file
     * @param {boolean} [maintainEntryPath=true] - If maintainEntryPath is true and the entry is inside a folder, the entry folder will be created in targetPath as well. Default is TRUE
     * @param {boolean} [overwrite=false] - If the file already exists at the target path, the file will be overwriten if this is true.
     * @param {boolean} [keepOriginalPermission=false] - The file will be set as the permission from the entry if this is true.
     * @param {string} [outFileName] - String If set will override the filename of the extracted file (Only works if the entry is a file)
     *
     * @return Boolean
     */
    extractEntryTo: function(m, f, g, v, y, S) {
      v = yn(!1, v), y = yn(!1, y), g = yn(!0, g), S = Nu(y, S);
      var C = c(m);
      if (!C)
        throw _e.Errors.NO_ENTRY();
      var N = a(C.entryName), D = l(f, S && !C.isDirectory ? a(S) : g ? N : we.basename(N));
      if (C.isDirectory) {
        var B = s.getEntryChildren(C);
        return B.forEach(function(x) {
          if (x.isDirectory) return;
          var W = x.getData();
          if (!W)
            throw _e.Errors.CANT_EXTRACT_FILE();
          var K = a(g ? x.entryName : x.entryName.substring(C.entryName.length)), te = l(f, K);
          i.assertPathSafe(f, te);
          const F = y ? x.header.fileAttr : void 0;
          i.writeFileTo(te, W, v, F);
        }), !0;
      }
      var k = C.getData(s.password);
      if (!k) throw _e.Errors.CANT_EXTRACT_FILE();
      if (i.assertPathSafe(f, D), i.fs.existsSync(D) && !v)
        throw _e.Errors.CANT_OVERRIDE();
      const L = y ? m.header.fileAttr : void 0;
      return i.writeFileTo(D, k, v, L), !0;
    },
    /**
     * Test the archive
     * @param {string} [pass]
     */
    test: function(m) {
      if (!s)
        return !1;
      for (var f of s.entries)
        try {
          if (f.isDirectory)
            continue;
          var g = f.getData(m);
          if (!g)
            return !1;
        } catch {
          return !1;
        }
      return !0;
    },
    /**
     * Extracts the entire archive to the given location
     *
     * @param {string} targetPath Target location
     * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
     *                  Default is FALSE
     * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
     *                  Default is FALSE
     * @param {string|Buffer} [pass] password
     */
    extractAllTo: function(m, f, g, v) {
      if (g = yn(!1, g), v = Nu(g, v), f = yn(!1, f), !s) throw _e.Errors.NO_ZIP();
      const y = [];
      s.entries.forEach(function(S) {
        var C = l(m, a(S.entryName));
        if (i.assertPathSafe(m, C), S.isDirectory) {
          i.makeDir(C), g && y.push({ path: C, attr: S.header.fileAttr });
          return;
        }
        var N = S.getData(v);
        if (!N)
          throw _e.Errors.CANT_EXTRACT_FILE();
        const D = g ? S.header.fileAttr : void 0;
        i.writeFileTo(C, N, f, D);
        try {
          i.fs.utimesSync(C, S.header.time, S.header.time);
        } catch {
        }
      }), o(y);
    },
    /**
     * Asynchronous extractAllTo
     *
     * @param {string} targetPath Target location
     * @param {boolean} [overwrite=false] If the file already exists at the target path, the file will be overwriten if this is true.
     *                  Default is FALSE
     * @param {boolean} [keepOriginalPermission=false] The file will be set as the permission from the entry if this is true.
     *                  Default is FALSE
     * @param {function} callback The callback will be executed when all entries are extracted successfully or any error is thrown.
     */
    extractAllToAsync: function(m, f, g, v) {
      if (v = Zx(f, g, v), g = yn(!1, g), f = yn(!1, f), !v)
        return new Promise((k, L) => {
          this.extractAllToAsync(m, f, g, function(x) {
            x ? L(x) : k(this);
          });
        });
      if (!s) {
        v(_e.Errors.NO_ZIP());
        return;
      }
      m = we.resolve(m);
      const y = (k) => l(m, we.normalize(a(k.entryName))), S = (k, L) => new Error(k + ': "' + L + '"'), C = [], N = [];
      s.entries.forEach((k) => {
        k.isDirectory ? C.push(k) : N.push(k);
      });
      const D = [];
      for (const k of C) {
        const L = y(k), x = g ? k.header.fileAttr : void 0;
        try {
          i.assertPathSafe(m, L), i.makeDir(L);
        } catch {
          v(S("Unable to create folder", L));
          continue;
        }
        x && D.push({ path: L, attr: x });
        try {
          i.fs.utimesSync(L, k.header.time, k.header.time);
        } catch {
        }
      }
      const B = (k) => {
        if (!k)
          try {
            o(D);
          } catch (L) {
            return v(S("Unable to set folder permissions", L.path || ""));
          }
        v(k);
      };
      N.reverse().reduce(function(k, L) {
        return function(x) {
          if (x)
            k(x);
          else {
            const W = we.normalize(a(L.entryName)), K = l(m, W);
            try {
              i.assertPathSafe(m, K);
            } catch (te) {
              return k(te);
            }
            L.getDataAsync(function(te, F) {
              if (F)
                k(F);
              else if (!te)
                k(_e.Errors.CANT_EXTRACT_FILE());
              else {
                const O = g ? L.header.fileAttr : void 0;
                i.writeFileToAsync(K, te, f, O, function(M) {
                  if (!M)
                    return k(S("Unable to write file", K));
                  i.fs.utimes(K, L.header.time, L.header.time, function() {
                    k();
                  });
                });
              }
            });
          }
        };
      }, B)();
    },
    /**
     * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
     *
     * @param {string} targetFileName
     * @param {function} callback
     */
    writeZip: function(m, f) {
      if (arguments.length === 1 && typeof m == "function" && (f = m, m = ""), !m && r.filename && (m = r.filename), !!m) {
        var g = s.compressToBuffer();
        if (g) {
          var v = i.writeFileTo(m, g, !0);
          typeof f == "function" && f(v ? null : new Error("failed"), "");
        }
      }
    },
    /**
             *
             * @param {string} targetFileName
             * @param {object} [props]
             * @param {boolean} [props.overwrite=true] If the file already exists at the target path, the file will be overwriten if this is true.
             * @param {boolean} [props.perm] The file will be set as the permission from the entry if this is true.
    
             * @returns {Promise<void>}
             */
    writeZipPromise: function(m, f) {
      const { overwrite: g, perm: v } = Object.assign({ overwrite: !0 }, f);
      return new Promise((y, S) => {
        !m && r.filename && (m = r.filename), m || S("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((C) => {
          const N = (D) => D ? y(D) : S("ADM-ZIP: Wasn't able to write zip file");
          i.writeFileToAsync(m, C, g, v, N);
        }, S);
      });
    },
    /**
     * @returns {Promise<Buffer>} A promise to the Buffer.
     */
    toBufferPromise: function() {
      return new Promise((m, f) => {
        s.toAsyncBuffer(m, f);
      });
    },
    /**
     * Returns the content of the entire zip file as a Buffer object
     *
     * @prop {function} [onSuccess]
     * @prop {function} [onFail]
     * @prop {function} [onItemStart]
     * @prop {function} [onItemEnd]
     * @returns {Buffer}
     */
    toBuffer: function(m, f, g, v) {
      return typeof m == "function" ? (s.toAsyncBuffer(m, f, g, v), null) : s.compressToBuffer();
    }
  };
};
const Ou = /* @__PURE__ */ Gu(Qx);
var Er = { exports: {} }, Ya = { exports: {} }, eC = mh;
function mh(e, t) {
  if (e && t) return mh(e)(t);
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
var gh = eC;
Ya.exports = gh(Vi);
Ya.exports.strict = gh(Eh);
Vi.proto = Vi(function() {
  Object.defineProperty(Function.prototype, "once", {
    value: function() {
      return Vi(this);
    },
    configurable: !0
  }), Object.defineProperty(Function.prototype, "onceStrict", {
    value: function() {
      return Eh(this);
    },
    configurable: !0
  });
});
function Vi(e) {
  var t = function() {
    return t.called ? t.value : (t.called = !0, t.value = e.apply(this, arguments));
  };
  return t.called = !1, t;
}
function Eh(e) {
  var t = function() {
    if (t.called)
      throw new Error(t.onceError);
    return t.called = !0, t.value = e.apply(this, arguments);
  }, n = e.name || "Function wrapped with `once`";
  return t.onceError = n + " shouldn't be called more than once", t.called = !1, t;
}
var yh = Ya.exports, tC = yh, nC = function() {
}, rC = Ge.Bare ? queueMicrotask : process.nextTick.bind(process), iC = function(e) {
  return e.setHeader && typeof e.abort == "function";
}, oC = function(e) {
  return e.stdio && Array.isArray(e.stdio) && e.stdio.length === 3;
}, wh = function(e, t, n) {
  if (typeof t == "function") return wh(e, null, t);
  t || (t = {}), n = tC(n || nC);
  var r = e._writableState, i = e._readableState, o = t.readable || t.readable !== !1 && e.readable, s = t.writable || t.writable !== !1 && e.writable, a = !1, l = function() {
    e.writable || h();
  }, h = function() {
    s = !1, o || n.call(e);
  }, c = function() {
    o = !1, s || n.call(e);
  }, u = function(g) {
    n.call(e, g ? new Error("exited with error code: " + g) : null);
  }, p = function(g) {
    n.call(e, g);
  }, w = function() {
    rC(m);
  }, m = function() {
    if (!a) {
      if (o && !(i && i.ended && !i.destroyed)) return n.call(e, new Error("premature close"));
      if (s && !(r && r.ended && !r.destroyed)) return n.call(e, new Error("premature close"));
    }
  }, f = function() {
    e.req.on("finish", h);
  };
  return iC(e) ? (e.on("complete", h), e.on("abort", w), e.req ? f() : e.on("request", f)) : s && !r && (e.on("end", l), e.on("close", l)), oC(e) && e.on("exit", u), e.on("end", c), e.on("finish", h), t.error !== !1 && e.on("error", p), e.on("close", w), function() {
    a = !0, e.removeListener("complete", h), e.removeListener("abort", w), e.removeListener("request", f), e.req && e.req.removeListener("finish", h), e.removeListener("end", l), e.removeListener("close", l), e.removeListener("finish", h), e.removeListener("exit", u), e.removeListener("end", c), e.removeListener("error", p), e.removeListener("close", w);
  };
}, sC = wh, aC = yh, lC = sC, Wi;
try {
  Wi = require("fs");
} catch {
}
var Jr = function() {
}, cC = typeof process > "u" ? !1 : /^v?\.0/.test(process.version), Mo = function(e) {
  return typeof e == "function";
}, uC = function(e) {
  return !cC || !Wi ? !1 : (e instanceof (Wi.ReadStream || Jr) || e instanceof (Wi.WriteStream || Jr)) && Mo(e.close);
}, fC = function(e) {
  return e.setHeader && Mo(e.abort);
}, dC = function(e, t, n, r) {
  r = aC(r);
  var i = !1;
  e.on("close", function() {
    i = !0;
  }), lC(e, { readable: t, writable: n }, function(s) {
    if (s) return r(s);
    i = !0, r();
  });
  var o = !1;
  return function(s) {
    if (!i && !o) {
      if (o = !0, uC(e)) return e.close(Jr);
      if (fC(e)) return e.abort();
      if (Mo(e.destroy)) return e.destroy();
      r(s || new Error("stream was destroyed"));
    }
  };
}, Ru = function(e) {
  e();
}, hC = function(e, t) {
  return e.pipe(t);
}, pC = function() {
  var e = Array.prototype.slice.call(arguments), t = Mo(e[e.length - 1] || Jr) && e.pop() || Jr;
  if (Array.isArray(e[0]) && (e = e[0]), e.length < 2) throw new Error("pump requires two streams per minimum");
  var n, r = e.map(function(i, o) {
    var s = o < e.length - 1, a = o > 0;
    return dC(i, s, a, function(l) {
      n || (n = l), l && r.forEach(Ru), !s && (r.forEach(Ru), t(n));
    });
  });
  return e.reduce(hC);
}, mC = pC;
const { PassThrough: gC } = Et;
var EC = (e) => {
  e = { ...e };
  const { array: t } = e;
  let { encoding: n } = e;
  const r = n === "buffer";
  let i = !1;
  t ? i = !(n || r) : n = n || "utf8", r && (n = null);
  const o = new gC({ objectMode: i });
  n && o.setEncoding(n);
  let s = 0;
  const a = [];
  return o.on("data", (l) => {
    a.push(l), i ? s = a.length : s += l.length;
  }), o.getBufferedValue = () => t ? a : r ? Buffer.concat(a, s) : a.join(""), o.getBufferedLength = () => s, o;
};
const { constants: yC } = Hu, wC = mC, vC = EC;
class vh extends Error {
  constructor() {
    super("maxBuffer exceeded"), this.name = "MaxBufferError";
  }
}
async function ko(e, t) {
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
      a && r.getBufferedLength() <= yC.MAX_LENGTH && (a.bufferedData = r.getBufferedValue()), o(a);
    };
    r = wC(e, vC(t), (a) => {
      if (a) {
        s(a);
        return;
      }
      i();
    }), r.on("data", () => {
      r.getBufferedLength() > n && s(new vh());
    });
  }), r.getBufferedValue();
}
Er.exports = ko;
Er.exports.default = ko;
Er.exports.buffer = (e, t) => ko(e, { ...t, encoding: "buffer" });
Er.exports.array = (e, t) => ko(e, { ...t, array: !0 });
Er.exports.MaxBufferError = vh;
var _C = Er.exports, Ot = {}, fi = {}, SC = Bo;
function Bo() {
  this.pending = 0, this.max = 1 / 0, this.listeners = [], this.waiting = [], this.error = null;
}
Bo.prototype.go = function(e) {
  this.pending < this.max ? Sh(this, e) : this.waiting.push(e);
};
Bo.prototype.wait = function(e) {
  this.pending === 0 ? e(this.error) : this.listeners.push(e);
};
Bo.prototype.hold = function() {
  return _h(this);
};
function _h(e) {
  e.pending += 1;
  var t = !1;
  return n;
  function n(i) {
    if (t) throw new Error("callback called twice");
    if (t = !0, e.error = e.error || i, e.pending -= 1, e.waiting.length > 0 && e.pending < e.max)
      Sh(e, e.waiting.shift());
    else if (e.pending === 0) {
      var o = e.listeners;
      e.listeners = [], o.forEach(r);
    }
  }
  function r(i) {
    i(e.error);
  }
}
function Sh(e, t) {
  t(_h(e));
}
var di = lt, jo = cr, Xa = Et, xh = Xa.Readable, Ja = Xa.Writable, xC = Xa.PassThrough, CC = SC, Ho = co.EventEmitter;
fi.createFromBuffer = IC;
fi.createFromFd = bC;
fi.BufferSlicer = jt;
fi.FdSlicer = Bt;
jo.inherits(Bt, Ho);
function Bt(e, t) {
  t = t || {}, Ho.call(this), this.fd = e, this.pend = new CC(), this.pend.max = 1, this.refCount = 0, this.autoClose = !!t.autoClose;
}
Bt.prototype.read = function(e, t, n, r, i) {
  var o = this;
  o.pend.go(function(s) {
    di.read(o.fd, e, t, n, r, function(a, l, h) {
      s(), i(a, l, h);
    });
  });
};
Bt.prototype.write = function(e, t, n, r, i) {
  var o = this;
  o.pend.go(function(s) {
    di.write(o.fd, e, t, n, r, function(a, l, h) {
      s(), i(a, l, h);
    });
  });
};
Bt.prototype.createReadStream = function(e) {
  return new Go(this, e);
};
Bt.prototype.createWriteStream = function(e) {
  return new zo(this, e);
};
Bt.prototype.ref = function() {
  this.refCount += 1;
};
Bt.prototype.unref = function() {
  var e = this;
  if (e.refCount -= 1, e.refCount > 0) return;
  if (e.refCount < 0) throw new Error("invalid unref");
  e.autoClose && di.close(e.fd, t);
  function t(n) {
    n ? e.emit("error", n) : e.emit("close");
  }
};
jo.inherits(Go, xh);
function Go(e, t) {
  t = t || {}, xh.call(this, t), this.context = e, this.context.ref(), this.start = t.start || 0, this.endOffset = t.end, this.pos = this.start, this.destroyed = !1;
}
Go.prototype._read = function(e) {
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
      di.read(t.context.fd, i, 0, n, t.pos, function(o, s) {
        o ? t.destroy(o) : s === 0 ? (t.destroyed = !0, t.push(null), t.context.unref()) : (t.pos += s, t.push(i.slice(0, s))), r();
      });
    });
  }
};
Go.prototype.destroy = function(e) {
  this.destroyed || (e = e || new Error("stream destroyed"), this.destroyed = !0, this.emit("error", e), this.context.unref());
};
jo.inherits(zo, Ja);
function zo(e, t) {
  t = t || {}, Ja.call(this, t), this.context = e, this.context.ref(), this.start = t.start || 0, this.endOffset = t.end == null ? 1 / 0 : +t.end, this.bytesWritten = 0, this.pos = this.start, this.destroyed = !1, this.on("finish", this.destroy.bind(this));
}
zo.prototype._write = function(e, t, n) {
  var r = this;
  if (!r.destroyed) {
    if (r.pos + e.length > r.endOffset) {
      var i = new Error("maximum file length exceeded");
      i.code = "ETOOBIG", r.destroy(), n(i);
      return;
    }
    r.context.pend.go(function(o) {
      if (r.destroyed) return o();
      di.write(r.context.fd, e, 0, e.length, r.pos, function(s, a) {
        s ? (r.destroy(), o(), n(s)) : (r.bytesWritten += a, r.pos += a, r.emit("progress"), o(), n());
      });
    });
  }
};
zo.prototype.destroy = function() {
  this.destroyed || (this.destroyed = !0, this.context.unref());
};
jo.inherits(jt, Ho);
function jt(e, t) {
  Ho.call(this), t = t || {}, this.refCount = 0, this.buffer = e, this.maxChunkSize = t.maxChunkSize || Number.MAX_SAFE_INTEGER;
}
jt.prototype.read = function(e, t, n, r, i) {
  var o = r + n, s = o - this.buffer.length, a = s > 0 ? s : n;
  this.buffer.copy(e, t, r, o), setImmediate(function() {
    i(null, a);
  });
};
jt.prototype.write = function(e, t, n, r, i) {
  e.copy(this.buffer, r, t, t + n), setImmediate(function() {
    i(null, n, e);
  });
};
jt.prototype.createReadStream = function(e) {
  e = e || {};
  var t = new xC(e);
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
jt.prototype.createWriteStream = function(e) {
  var t = this;
  e = e || {};
  var n = new Ja(e);
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
jt.prototype.ref = function() {
  this.refCount += 1;
};
jt.prototype.unref = function() {
  if (this.refCount -= 1, this.refCount < 0)
    throw new Error("invalid unref");
};
function IC(e, t) {
  return new jt(e, t);
}
function bC(e, t) {
  return new Bt(e, t);
}
var Xt = Hu.Buffer, oa = [
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
typeof Int32Array < "u" && (oa = new Int32Array(oa));
function Ch(e) {
  if (Xt.isBuffer(e))
    return e;
  var t = typeof Xt.alloc == "function" && typeof Xt.from == "function";
  if (typeof e == "number")
    return t ? Xt.alloc(e) : new Xt(e);
  if (typeof e == "string")
    return t ? Xt.from(e) : new Xt(e);
  throw new Error("input must be buffer, number, or string, received " + typeof e);
}
function AC(e) {
  var t = Ch(4);
  return t.writeInt32BE(e, 0), t;
}
function Za(e, t) {
  e = Ch(e), Xt.isBuffer(t) && (t = t.readUInt32BE(0));
  for (var n = ~~t ^ -1, r = 0; r < e.length; r++)
    n = oa[(n ^ e[r]) & 255] ^ n >>> 8;
  return n ^ -1;
}
function Ka() {
  return AC(Za.apply(null, arguments));
}
Ka.signed = function() {
  return Za.apply(null, arguments);
};
Ka.unsigned = function() {
  return Za.apply(null, arguments) >>> 0;
};
var TC = Ka, sa = lt, DC = Zr, Ih = fi, NC = TC, qo = cr, Vo = co.EventEmitter, bh = Et.Transform, Qa = Et.PassThrough, OC = Et.Writable;
Ot.open = RC;
Ot.fromFd = Ah;
Ot.fromBuffer = $C;
Ot.fromRandomAccessReader = el;
Ot.dosDateTimeToDate = Dh;
Ot.validateFileName = Nh;
Ot.ZipFile = an;
Ot.Entry = hi;
Ot.RandomAccessReader = fn;
function RC(e, t, n) {
  typeof t == "function" && (n = t, t = null), t == null && (t = {}), t.autoClose == null && (t.autoClose = !0), t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1), n == null && (n = ao), sa.open(e, "r", function(r, i) {
    if (r) return n(r);
    Ah(i, t, function(o, s) {
      o && sa.close(i, ao), n(o, s);
    });
  });
}
function Ah(e, t, n) {
  typeof t == "function" && (n = t, t = null), t == null && (t = {}), t.autoClose == null && (t.autoClose = !1), t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1), n == null && (n = ao), sa.fstat(e, function(r, i) {
    if (r) return n(r);
    var o = Ih.createFromFd(e, { autoClose: !0 });
    el(o, i.size, t, n);
  });
}
function $C(e, t, n) {
  typeof t == "function" && (n = t, t = null), t == null && (t = {}), t.autoClose = !1, t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1);
  var r = Ih.createFromBuffer(e, { maxChunkSize: 65536 });
  el(r, e.length, t, n);
}
function el(e, t, n, r) {
  typeof n == "function" && (r = n, n = null), n == null && (n = {}), n.autoClose == null && (n.autoClose = !0), n.lazyEntries == null && (n.lazyEntries = !1), n.decodeStrings == null && (n.decodeStrings = !0);
  var i = !!n.decodeStrings;
  if (n.validateEntrySizes == null && (n.validateEntrySizes = !0), n.strictFileNames == null && (n.strictFileNames = !1), r == null && (r = ao), typeof t != "number") throw new Error("expected totalSize parameter to be a number");
  if (t > Number.MAX_SAFE_INTEGER)
    throw new Error("zip file too large. only file sizes up to 2^52 are supported due to JavaScript's Number type being an IEEE 754 double.");
  e.ref();
  var o = 22, s = 65535, a = Math.min(o + s, t), l = Tt(a), h = t - l.length;
  rr(e, l, 0, a, h, function(c) {
    if (c) return r(c);
    for (var u = a - o; u >= 0; u -= 1)
      if (l.readUInt32LE(u) === 101010256) {
        var p = l.slice(u), w = p.readUInt16LE(4);
        if (w !== 0)
          return r(new Error("multi-disk zip files are not supported: found disk number: " + w));
        var m = p.readUInt16LE(10), f = p.readUInt32LE(16), g = p.readUInt16LE(20), v = p.length - o;
        if (g !== v)
          return r(new Error("invalid comment length. expected: " + v + ". found: " + g));
        var y = i ? Yi(p, 22, p.length, !1) : p.slice(22);
        if (!(m === 65535 || f === 4294967295))
          return r(null, new an(e, f, t, m, y, n.autoClose, n.lazyEntries, i, n.validateEntrySizes, n.strictFileNames));
        var S = Tt(20), C = h + u - S.length;
        rr(e, S, 0, S.length, C, function(N) {
          if (N) return r(N);
          if (S.readUInt32LE(0) !== 117853008)
            return r(new Error("invalid zip64 end of central directory locator signature"));
          var D = ir(S, 8), B = Tt(56);
          rr(e, B, 0, B.length, D, function(k) {
            return k ? r(k) : B.readUInt32LE(0) !== 101075792 ? r(new Error("invalid zip64 end of central directory record signature")) : (m = ir(B, 32), f = ir(B, 48), r(null, new an(e, f, t, m, y, n.autoClose, n.lazyEntries, i, n.validateEntrySizes, n.strictFileNames)));
          });
        });
        return;
      }
    r(new Error("end of central directory record signature not found"));
  });
}
qo.inherits(an, Vo);
function an(e, t, n, r, i, o, s, a, l, h) {
  var c = this;
  Vo.call(c), c.reader = e, c.reader.on("error", function(u) {
    Th(c, u);
  }), c.reader.once("close", function() {
    c.emit("close");
  }), c.readEntryCursor = t, c.fileSize = n, c.entryCount = r, c.comment = i, c.entriesRead = 0, c.autoClose = !!o, c.lazyEntries = !!s, c.decodeStrings = !!a, c.validateEntrySizes = !!l, c.strictFileNames = !!h, c.isOpen = !0, c.emittedError = !1, c.lazyEntries || c._readEntry();
}
an.prototype.close = function() {
  this.isOpen && (this.isOpen = !1, this.reader.unref());
};
function ht(e, t) {
  e.autoClose && e.close(), Th(e, t);
}
function Th(e, t) {
  e.emittedError || (e.emittedError = !0, e.emit("error", t));
}
an.prototype.readEntry = function() {
  if (!this.lazyEntries) throw new Error("readEntry() called without lazyEntries:true");
  this._readEntry();
};
an.prototype._readEntry = function() {
  var e = this;
  if (e.entryCount === e.entriesRead) {
    setImmediate(function() {
      e.autoClose && e.close(), !e.emittedError && e.emit("end");
    });
    return;
  }
  if (!e.emittedError) {
    var t = Tt(46);
    rr(e.reader, t, 0, t.length, e.readEntryCursor, function(n) {
      if (n) return ht(e, n);
      if (!e.emittedError) {
        var r = new hi(), i = t.readUInt32LE(0);
        if (i !== 33639248) return ht(e, new Error("invalid central directory file header signature: 0x" + i.toString(16)));
        if (r.versionMadeBy = t.readUInt16LE(4), r.versionNeededToExtract = t.readUInt16LE(6), r.generalPurposeBitFlag = t.readUInt16LE(8), r.compressionMethod = t.readUInt16LE(10), r.lastModFileTime = t.readUInt16LE(12), r.lastModFileDate = t.readUInt16LE(14), r.crc32 = t.readUInt32LE(16), r.compressedSize = t.readUInt32LE(20), r.uncompressedSize = t.readUInt32LE(24), r.fileNameLength = t.readUInt16LE(28), r.extraFieldLength = t.readUInt16LE(30), r.fileCommentLength = t.readUInt16LE(32), r.internalFileAttributes = t.readUInt16LE(36), r.externalFileAttributes = t.readUInt32LE(38), r.relativeOffsetOfLocalHeader = t.readUInt32LE(42), r.generalPurposeBitFlag & 64) return ht(e, new Error("strong encryption is not supported"));
        e.readEntryCursor += 46, t = Tt(r.fileNameLength + r.extraFieldLength + r.fileCommentLength), rr(e.reader, t, 0, t.length, e.readEntryCursor, function(o) {
          if (o) return ht(e, o);
          if (!e.emittedError) {
            var s = (r.generalPurposeBitFlag & 2048) !== 0;
            r.fileName = e.decodeStrings ? Yi(t, 0, r.fileNameLength, s) : t.slice(0, r.fileNameLength);
            var a = r.fileNameLength + r.extraFieldLength, l = t.slice(r.fileNameLength, a);
            r.extraFields = [];
            for (var h = 0; h < l.length - 3; ) {
              var c = l.readUInt16LE(h + 0), u = l.readUInt16LE(h + 2), p = h + 4, w = p + u;
              if (w > l.length) return ht(e, new Error("extra field length exceeds extra field buffer size"));
              var m = Tt(u);
              l.copy(m, 0, p, w), r.extraFields.push({
                id: c,
                data: m
              }), h = w;
            }
            if (r.fileComment = e.decodeStrings ? Yi(t, a, a + r.fileCommentLength, s) : t.slice(a, a + r.fileCommentLength), r.comment = r.fileComment, e.readEntryCursor += t.length, e.entriesRead += 1, r.uncompressedSize === 4294967295 || r.compressedSize === 4294967295 || r.relativeOffsetOfLocalHeader === 4294967295) {
              for (var f = null, h = 0; h < r.extraFields.length; h++) {
                var g = r.extraFields[h];
                if (g.id === 1) {
                  f = g.data;
                  break;
                }
              }
              if (f == null)
                return ht(e, new Error("expected zip64 extended information extra field"));
              var v = 0;
              if (r.uncompressedSize === 4294967295) {
                if (v + 8 > f.length)
                  return ht(e, new Error("zip64 extended information extra field does not include uncompressed size"));
                r.uncompressedSize = ir(f, v), v += 8;
              }
              if (r.compressedSize === 4294967295) {
                if (v + 8 > f.length)
                  return ht(e, new Error("zip64 extended information extra field does not include compressed size"));
                r.compressedSize = ir(f, v), v += 8;
              }
              if (r.relativeOffsetOfLocalHeader === 4294967295) {
                if (v + 8 > f.length)
                  return ht(e, new Error("zip64 extended information extra field does not include relative header offset"));
                r.relativeOffsetOfLocalHeader = ir(f, v), v += 8;
              }
            }
            if (e.decodeStrings)
              for (var h = 0; h < r.extraFields.length; h++) {
                var g = r.extraFields[h];
                if (g.id === 28789) {
                  if (g.data.length < 6 || g.data.readUInt8(0) !== 1)
                    continue;
                  var y = g.data.readUInt32LE(1);
                  if (NC.unsigned(t.slice(0, r.fileNameLength)) !== y)
                    continue;
                  r.fileName = Yi(g.data, 5, g.data.length, !0);
                  break;
                }
              }
            if (e.validateEntrySizes && r.compressionMethod === 0) {
              var S = r.uncompressedSize;
              if (r.isEncrypted() && (S += 12), r.compressedSize !== S) {
                var C = "compressed/uncompressed size mismatch for stored file: " + r.compressedSize + " != " + r.uncompressedSize;
                return ht(e, new Error(C));
              }
            }
            if (e.decodeStrings) {
              e.strictFileNames || (r.fileName = r.fileName.replace(/\\/g, "/"));
              var N = Nh(r.fileName, e.validateFileNameOptions);
              if (N != null) return ht(e, new Error(N));
            }
            e.emit("entry", r), e.lazyEntries || e._readEntry();
          }
        });
      }
    });
  }
};
an.prototype.openReadStream = function(e, t, n) {
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
  var s = Tt(30);
  rr(r.reader, s, 0, s.length, e.relativeOffsetOfLocalHeader, function(a) {
    try {
      if (a) return n(a);
      var l = s.readUInt32LE(0);
      if (l !== 67324752)
        return n(new Error("invalid local file header signature: 0x" + l.toString(16)));
      var h = s.readUInt16LE(26), c = s.readUInt16LE(28), u = e.relativeOffsetOfLocalHeader + s.length + h + c, p;
      if (e.compressionMethod === 0)
        p = !1;
      else if (e.compressionMethod === 8)
        p = t.decompress != null ? t.decompress : !0;
      else
        return n(new Error("unsupported compression method: " + e.compressionMethod));
      var w = u, m = w + e.compressedSize;
      if (e.compressedSize !== 0 && m > r.fileSize)
        return n(new Error("file data overflows file bounds: " + w + " + " + e.compressedSize + " > " + r.fileSize));
      var f = r.reader.createReadStream({
        start: w + i,
        end: w + o
      }), g = f;
      if (p) {
        var v = !1, y = DC.createInflateRaw();
        f.on("error", function(S) {
          setImmediate(function() {
            v || y.emit("error", S);
          });
        }), f.pipe(y), r.validateEntrySizes ? (g = new pi(e.uncompressedSize), y.on("error", function(S) {
          setImmediate(function() {
            v || g.emit("error", S);
          });
        }), y.pipe(g)) : g = y, g.destroy = function() {
          v = !0, y !== g && y.unpipe(g), f.unpipe(y), f.destroy();
        };
      }
      n(null, g);
    } finally {
      r.reader.unref();
    }
  });
};
function hi() {
}
hi.prototype.getLastModDate = function() {
  return Dh(this.lastModFileDate, this.lastModFileTime);
};
hi.prototype.isEncrypted = function() {
  return (this.generalPurposeBitFlag & 1) !== 0;
};
hi.prototype.isCompressed = function() {
  return this.compressionMethod === 8;
};
function Dh(e, t) {
  var n = e & 31, r = (e >> 5 & 15) - 1, i = (e >> 9 & 127) + 1980, o = 0, s = (t & 31) * 2, a = t >> 5 & 63, l = t >> 11 & 31;
  return new Date(i, r, n, l, a, s, o);
}
function Nh(e) {
  return e.indexOf("\\") !== -1 ? "invalid characters in fileName: " + e : /^[a-zA-Z]:/.test(e) || /^\//.test(e) ? "absolute path: " + e : e.split("/").indexOf("..") !== -1 ? "invalid relative path: " + e : null;
}
function rr(e, t, n, r, i, o) {
  if (r === 0)
    return setImmediate(function() {
      o(null, Tt(0));
    });
  e.read(t, n, r, i, function(s, a) {
    if (s) return o(s);
    if (a < r)
      return o(new Error("unexpected EOF"));
    o();
  });
}
qo.inherits(pi, bh);
function pi(e) {
  bh.call(this), this.actualByteCount = 0, this.expectedByteCount = e;
}
pi.prototype._transform = function(e, t, n) {
  if (this.actualByteCount += e.length, this.actualByteCount > this.expectedByteCount) {
    var r = "too many bytes in the stream. expected " + this.expectedByteCount + ". got at least " + this.actualByteCount;
    return n(new Error(r));
  }
  n(null, e);
};
pi.prototype._flush = function(e) {
  if (this.actualByteCount < this.expectedByteCount) {
    var t = "not enough bytes in the stream. expected " + this.expectedByteCount + ". got only " + this.actualByteCount;
    return e(new Error(t));
  }
  e();
};
qo.inherits(fn, Vo);
function fn() {
  Vo.call(this), this.refCount = 0;
}
fn.prototype.ref = function() {
  this.refCount += 1;
};
fn.prototype.unref = function() {
  var e = this;
  if (e.refCount -= 1, e.refCount > 0) return;
  if (e.refCount < 0) throw new Error("invalid unref");
  e.close(t);
  function t(n) {
    if (n) return e.emit("error", n);
    e.emit("close");
  }
};
fn.prototype.createReadStream = function(e) {
  var t = e.start, n = e.end;
  if (t === n) {
    var r = new Qa();
    return setImmediate(function() {
      r.end();
    }), r;
  }
  var i = this._readStreamForRange(t, n), o = !1, s = new Wo(this);
  i.on("error", function(l) {
    setImmediate(function() {
      o || s.emit("error", l);
    });
  }), s.destroy = function() {
    i.unpipe(s), s.unref(), i.destroy();
  };
  var a = new pi(n - t);
  return s.on("error", function(l) {
    setImmediate(function() {
      o || a.emit("error", l);
    });
  }), a.destroy = function() {
    o = !0, s.unpipe(a), s.destroy();
  }, i.pipe(s).pipe(a);
};
fn.prototype._readStreamForRange = function(e, t) {
  throw new Error("not implemented");
};
fn.prototype.read = function(e, t, n, r, i) {
  var o = this.createReadStream({ start: r, end: r + n }), s = new OC(), a = 0;
  s._write = function(l, h, c) {
    l.copy(e, t + a, 0, l.length), a += l.length, c();
  }, s.on("finish", i), o.on("error", function(l) {
    i(l);
  }), o.pipe(s);
};
fn.prototype.close = function(e) {
  setImmediate(e);
};
qo.inherits(Wo, Qa);
function Wo(e) {
  Qa.call(this), this.context = e, this.context.ref(), this.unreffedYet = !1;
}
Wo.prototype._flush = function(e) {
  this.unref(), e();
};
Wo.prototype.unref = function(e) {
  this.unreffedYet || (this.unreffedYet = !0, this.context.unref());
};
var LC = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ";
function Yi(e, t, n, r) {
  if (r)
    return e.toString("utf8", t, n);
  for (var i = "", o = t; o < n; o++)
    i += LC[e[o]];
  return i;
}
function ir(e, t) {
  var n = e.readUInt32LE(t), r = e.readUInt32LE(t + 4);
  return r * 4294967296 + n;
}
var Tt;
typeof Buffer.allocUnsafe == "function" ? Tt = function(e) {
  return Buffer.allocUnsafe(e);
} : Tt = function(e) {
  return new Buffer(e);
};
function ao(e) {
  if (e) throw e;
}
const pt = Lf("extract-zip"), { createWriteStream: PC, promises: er } = lt, FC = _C, _n = ce, { promisify: tl } = cr, UC = Et, MC = Ot, kC = tl(MC.open), BC = tl(UC.pipeline);
class jC {
  constructor(t, n) {
    this.zipPath = t, this.opts = n;
  }
  async extract() {
    return pt("opening", this.zipPath, "with opts", this.opts), this.zipfile = await kC(this.zipPath, { lazyEntries: !0 }), this.canceled = !1, new Promise((t, n) => {
      this.zipfile.on("error", (r) => {
        this.canceled = !0, n(r);
      }), this.zipfile.readEntry(), this.zipfile.on("close", () => {
        this.canceled || (pt("zip extraction complete"), t());
      }), this.zipfile.on("entry", async (r) => {
        if (this.canceled) {
          pt("skipping entry", r.fileName, { cancelled: this.canceled });
          return;
        }
        if (pt("zipfile entry", r.fileName), r.fileName.startsWith("__MACOSX/")) {
          this.zipfile.readEntry();
          return;
        }
        const i = _n.dirname(_n.join(this.opts.dir, r.fileName));
        try {
          await er.mkdir(i, { recursive: !0 });
          const o = await er.realpath(i);
          if (_n.relative(this.opts.dir, o).split(_n.sep).includes(".."))
            throw new Error(`Out of bound path "${o}" found while processing file ${r.fileName}`);
          await this.extractEntry(r), pt("finished processing", r.fileName), this.zipfile.readEntry();
        } catch (o) {
          this.canceled = !0, this.zipfile.close(), n(o);
        }
      });
    });
  }
  async extractEntry(t) {
    if (this.canceled) {
      pt("skipping entry extraction", t.fileName, { cancelled: this.canceled });
      return;
    }
    this.opts.onEntry && this.opts.onEntry(t, this.zipfile);
    const n = _n.join(this.opts.dir, t.fileName), r = t.externalFileAttributes >> 16 & 65535, i = 61440, o = 16384, a = (r & i) === 40960;
    let l = (r & i) === o;
    !l && t.fileName.endsWith("/") && (l = !0);
    const h = t.versionMadeBy >> 8;
    l || (l = h === 0 && t.externalFileAttributes === 16), pt("extracting entry", { filename: t.fileName, isDir: l, isSymlink: a });
    const c = this.getExtractedMode(r, l) & 511, u = l ? n : _n.dirname(n), p = { recursive: !0 };
    if (l && (p.mode = c), pt("mkdir", { dir: u, ...p }), await er.mkdir(u, p), l) return;
    pt("opening read stream", n);
    const w = await tl(this.zipfile.openReadStream.bind(this.zipfile))(t);
    if (a) {
      const m = await FC(w);
      pt("creating symlink", m, n), await er.symlink(m, n);
    } else
      await BC(w, PC(n, { mode: c }));
  }
  getExtractedMode(t, n) {
    let r = t;
    return r === 0 && (n ? (this.opts.defaultDirMode && (r = parseInt(this.opts.defaultDirMode, 10)), r || (r = 493)) : (this.opts.defaultFileMode && (r = parseInt(this.opts.defaultFileMode, 10)), r || (r = 420))), r;
  }
}
var HC = async function(e, t) {
  if (pt("creating target directory", t.dir), !_n.isAbsolute(t.dir))
    throw new Error("Target directory is expected to be absolute");
  return await er.mkdir(t.dir, { recursive: !0 }), t.dir = await er.realpath(t.dir), new jC(e, t).extract();
};
const Oh = /* @__PURE__ */ Gu(HC);
function Rh(e) {
  const n = e.replace(/[^0-9.].*$/, "").split(".").map((s) => parseInt(s, 10)), r = n[0], i = n[1] ?? 0, o = n[2] ?? 0;
  return r > 1 || i > 20 || i === 20 && o >= 5 ? 21 : i >= 17 ? 17 : 8;
}
const $u = {
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
function GC(e) {
  const t = $u[e] || $u[17];
  return process.platform === "win32" ? t.win : process.platform === "darwin" ? process.arch === "arm64" ? t.mac_aarch64 : t.mac_x64 : t.linux_x64;
}
const $r = /* @__PURE__ */ new Map();
let bn = 0, An = 0;
function Yo() {
  const e = Dt.getPath("userData"), t = j.join(e, ".mine-launcher");
  return P.existsSync(t) || P.mkdirSync(t, { recursive: !0 }), t;
}
function $h(e) {
  const t = Hp.createHash("md5");
  t.update(`OfflinePlayer:${e}`);
  const n = t.digest();
  n[6] = n[6] & 15 | 48, n[8] = n[8] & 63 | 128;
  const r = n.toString("hex");
  return `${r.slice(0, 8)}-${r.slice(8, 12)}-${r.slice(12, 16)}-${r.slice(16, 20)}-${r.slice(20, 32)}`;
}
function xn(e) {
  return new Promise((t, n) => {
    (e.startsWith("https") ? ca : ua).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (o) => {
      if (o.statusCode && o.statusCode >= 300 && o.statusCode < 400 && o.headers.location)
        return o.resume(), xn(o.headers.location).then(t).catch(n);
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
function It(e, t, n) {
  return new Promise((r, i) => {
    const o = j.dirname(t);
    P.existsSync(o) || P.mkdirSync(o, { recursive: !0 });
    const s = P.createWriteStream(t);
    (e.startsWith("https") ? ca : ua).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (h) => {
      if (h.statusCode && h.statusCode >= 300 && h.statusCode < 400 && h.headers.location)
        return s.close(), P.unlinkSync(t), It(h.headers.location, t, n).then(r).catch(i);
      if (h.statusCode !== 200)
        return s.close(), P.unlink(t, () => {
        }), h.resume(), i(new Error(`HTTP ${h.statusCode}: ${e}`));
      h.on("data", (c) => n == null ? void 0 : n(c.length)), h.pipe(s), s.on("finish", () => s.close(() => r())), s.on("error", i);
    }).on("error", (h) => {
      s.close(), P.unlink(t, () => {
      }), i(h);
    });
  });
}
function br(e) {
  return !e.includes("..") && !j.isAbsolute(e);
}
async function ks(e, t) {
  if (P.existsSync(e))
    try {
      const n = j.join(t, ".extract-" + Date.now());
      P.mkdirSync(n, { recursive: !0 }), await Oh(e, { dir: n });
      const r = process.platform === "win32" ? ".dll" : process.platform === "darwin" ? ".dylib" : ".so", i = (o) => {
        for (const s of P.readdirSync(o)) {
          const a = j.join(o, s);
          P.statSync(a).isDirectory() ? i(a) : s.toLowerCase().endsWith(r) && P.copyFileSync(a, j.join(t, s));
        }
      };
      i(n), P.rmSync(n, { recursive: !0, force: !0 });
    } catch {
    }
}
let en = [];
function Lu(e) {
  en.push(e), en.length > 120 && (en = en.slice(-120));
}
function zC(e) {
  const t = e.join(`
`);
  return t.match(/Unsupported class file major version (\d+)/) ? "Похоже, у вас неправильно подобрана версия Java — версия игры требует более новую Java. Откройте «Настройки» и в разделе Java проверьте, что путь ведёт к правильной JDK/JRE." : /java\.lang\.OutOfMemoryError/.test(t) ? "Игре не хватило памяти. Увеличьте «Максимальную память» в настройках лаунчера (в МБ) и попробуйте снова." : /-1073741515|0xc0000135/i.test(t) ? "Не найдены системные библиотеки Windows. Установите Microsoft Visual C++ Redistributable (x64) — это самая частая причина на чистой Windows." : /-1073741819|0xc0000005/i.test(t) ? "Крит native-кода. Чаще всего помогает обновление видеодрайвера. Если не помогло — запустите без модов и посмотрите лог." : /UnsatisfiedLinkError/i.test(t) ? "Не загрузились системные библиотеки игры (LWJGL natives). Проверьте, не блокирует ли их антивирус, и запустите снова — недостающие файлы скачаются заново." : /No space left|disk full|ENOSPC/i.test(t) ? "Закончилось место на диске. Освободите его и попробуйте снова." : /Failed to (download|fetch)|Could not (download|fetch)|assets/i.test(t) && /asset|resources/i.test(t) ? "Не удалось скачать игровые ресурсы (assets) — часто это сетевая блокировка CDN Mojang у провайдера. Попробуйте другое подключение или VPN и запустите снова." : /Could not create the Java Virtual Machine|Invalid or corrupt jarfile| unrecognized/.test(t) ? "Проверьте аргументы JVM в настройках лаунчера — Java не смогла запуститься с текущими параметрами." : /GLFW error|OpenGL|gpu|DirectX/i.test(t) && /error|fail/i.test(t) ? "Похоже, проблема с видеодрайвером/OpenGL. Обновите драйвер видеокарты." : /Incompatible.fml.mod|Fabric loader|Quilt loading/i.test(t) ? "Похоже, один из модов несовместим с этой версией или загрузчиком. Откройте вкладку «Моды» и отключите их по одному." : /Mixin apply failed|MixinTransformer/i.test(t) ? "Ошибка в моде (Mixin). Отключите свежеустановленные моды во вкладке «Моды»." : /The game crashed.*Calling event|Exception in thread "main"/.test(t) ? "Игра упала при старте. Попробуйте без модов или откройте папку сборки и покажите лог на форуме." : "Смотрите вкладку «Логи» для подробностей.";
}
function qC(e, t = process.platform === "win32" ? "windows" : process.platform === "darwin" ? "osx" : "linux") {
  if (!e || e.length === 0) return !0;
  let n = !1;
  for (const r of e)
    (!r.os || r.os.name === t) && (n = r.action === "allow");
  return n;
}
async function Lh() {
  const e = [], t = process.platform === "win32", n = t ? "javaw.exe" : "java", r = Yo(), i = (o, s = 0) => {
    if (!P.existsSync(o) || s > 6) return null;
    try {
      const a = P.readdirSync(o);
      for (const l of a) {
        const h = j.join(o, l);
        if (l.toLowerCase() === n.toLowerCase()) return h;
        try {
          if (P.statSync(h).isDirectory()) {
            const c = i(h, s + 1);
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
    const s = i(j.join(r, "java", `java-${o}`));
    s && e.push(s);
  }
  if (process.env.JAVA_HOME) {
    const o = j.join(process.env.JAVA_HOME, "bin", n);
    P.existsSync(o) && e.push(o);
  }
  if (t) {
    const o = [
      "C:\\Program Files\\Java",
      "C:\\Program Files (x86)\\Java",
      "C:\\Program Files\\Eclipse Adoptium",
      "C:\\Program Files\\Microsoft",
      "C:\\Program Files\\BellSoft",
      "C:\\Program Files\\Amazon Corretto",
      j.join(process.env.LOCALAPPDATA || "", "Programs", "AdoptOpenJDK"),
      "C:\\Program Files (x86)\\Minecraft Launcher\\runtime"
    ];
    for (const s of o)
      if (P.existsSync(s))
        try {
          for (const a of P.readdirSync(s)) {
            const l = j.join(s, a, "bin", n);
            P.existsSync(l) && !e.includes(l) && e.push(l);
          }
        } catch {
        }
  } else {
    const o = ["/usr/lib/jvm", "/usr/lib64/jvm", "/Library/Java/JavaVirtualMachines", "/opt/java"];
    for (const s of o)
      if (P.existsSync(s))
        try {
          for (const a of P.readdirSync(s))
            for (const l of [`${a}/bin/java`, `${a}/Contents/Home/bin/java`]) {
              const h = j.join(s, l);
              P.existsSync(h) && !e.includes(h) && e.push(h);
            }
        } catch {
        }
  }
  return e;
}
async function VC(e, t, n = 17) {
  const r = Yo(), i = j.join(r, "java", `java-${n}`), o = (p, w = 0) => {
    if (!P.existsSync(p) || w > 6) return null;
    try {
      for (const m of P.readdirSync(p)) {
        const f = j.join(p, m);
        if (m.toLowerCase() === (process.platform === "win32" ? "javaw.exe" : "java").toLowerCase()) return f;
        try {
          if (P.statSync(f).isDirectory()) {
            const g = o(f, w + 1);
            if (g) return g;
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
  const a = process.platform === "win32", l = GC(n), h = a ? "zip" : ".tar.gz", c = j.join(r, "java", `java-${n}.${h}`);
  P.existsSync(j.dirname(c)) || P.mkdirSync(j.dirname(c), { recursive: !0 }), await It(l, c, (p) => {
    An += p;
    const w = Date.now();
    if (w - bn > 1e3) {
      const m = An / Math.max(1, (w - bn) / 1e3);
      bn = w, An = 0, e({
        instanceId: "java-auto",
        stage: "downloading",
        statusText: `Скачивание Java ${n}... (${(m / 1024 / 1024).toFixed(1)} МБ/с)`,
        progress: 55
      });
    }
  }), e({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: `Распаковка Java ${n}...`,
    progress: 75
  }), t({ timestamp: Date.now(), type: "info", message: `Распаковка архива Java ${n}...` }), P.existsSync(i) || P.mkdirSync(i, { recursive: !0 }), a ? await Oh(c, { dir: i }) : js(`tar -xzf "${c}" -C "${i}"`), P.unlinkSync(c);
  const u = o(i);
  if (!u) throw new Error(`Java ${n} распакована некорректно — попробуйте установить её вручную`);
  return t({ timestamp: Date.now(), type: "info", message: `Java ${n} установлена: ${u}` }), u;
}
async function Ph() {
  return await xn("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function WC(e, t, n) {
  var h, c, u, p, w, m, f, g, v;
  bn = 0, An = 0, en = [];
  const r = Yo(), i = j.join(r, "instances", e.instanceId), o = j.join(r, "assets"), s = j.join(r, "libraries"), a = j.join(r, "versions"), l = j.join(i, "natives");
  for (const y of [i, l])
    P.existsSync(y) || P.mkdirSync(y, { recursive: !0 });
  try {
    let y = e.javaPath, S = !1;
    if (y && P.existsSync(y))
      try {
        js(`"${y}" -version 2>&1`, { stdio: "ignore" }), S = !0;
      } catch {
      }
    if (!S) {
      const T = await Lh();
      for (const G of T)
        try {
          js(`"${G}" -version 2>&1`, { stdio: "ignore" }), y = G, S = !0;
          break;
        } catch {
        }
    }
    S || (y = await VC(t, n, Rh(e.version))), n({ timestamp: Date.now(), type: "info", message: `Java: ${y}` }), t({ instanceId: e.instanceId, stage: "checking", statusText: "Проверка версии...", progress: 5 });
    const C = (await Ph()).versions.find((T) => T.id === e.version);
    if (!C) throw new Error(`Версия ${e.version} не найдена на серверах Mojang`);
    const N = j.join(a, e.version, `${e.version}.json`);
    let D;
    if (P.existsSync(N))
      try {
        D = JSON.parse(P.readFileSync(N, "utf-8"));
      } catch {
        D = null;
      }
    if (D || (t({ instanceId: e.instanceId, stage: "downloading", statusText: `Загрузка версии ${e.version}...`, progress: 10 }), D = await xn(C.url), P.existsSync(j.dirname(N)) || P.mkdirSync(j.dirname(N), { recursive: !0 }), P.writeFileSync(N, JSON.stringify(D, null, 2))), (h = D.assetIndex) != null && h.url) {
      const T = j.join(o, "indexes", `${D.assetIndex.id}.json`);
      P.existsSync(T) || (t({ instanceId: e.instanceId, stage: "downloading", statusText: "Загрузка манифеста ресурсов...", progress: 12 }), await It(D.assetIndex.url, T));
      try {
        const V = JSON.parse(P.readFileSync(T, "utf-8")).objects || {}, U = j.join(o, "objects"), Q = [];
        for (const re of Object.keys(V)) {
          const q = V[re].hash, ie = j.join(U, q.slice(0, 2), q);
          P.existsSync(ie) || Q.push({ hash: q });
        }
        if (Q.length > 0) {
          t({
            instanceId: e.instanceId,
            stage: "downloading",
            statusText: `Загрузка ресурсов (0/${Q.length})...`,
            progress: 15
          });
          let re = 0;
          const q = 64;
          let ie = Date.now(), Se = 0;
          for (let le = 0; le < Q.length; le += q) {
            const ct = Q.slice(le, le + q);
            await Promise.all(
              ct.map((Qe) => It(
                `https://resources.download.minecraft.net/${Qe.hash.slice(0, 2)}/${Qe.hash}`,
                j.join(U, Qe.hash.slice(0, 2), Qe.hash),
                (dn) => {
                  Se += dn;
                }
              ).catch(() => {
              }))
            ), re += ct.length;
            const Rt = Date.now();
            if (Rt - ie > 1500) {
              const Qe = Se / Math.max(1, (Rt - ie) / 1e3);
              t({
                instanceId: e.instanceId,
                stage: "downloading",
                statusText: `Загрузка ресурсов (${re}/${Q.length}) — ${(Qe / 1024 / 1024).toFixed(1)} МБ/с`,
                progress: 15 + re / Q.length * 25
              }), ie = Rt, Se = 0;
            }
          }
        }
      } catch (G) {
        n({ timestamp: Date.now(), type: "warn", message: `Ресурсы: ${G.message}` });
      }
    }
    const B = j.join(a, e.version, `${e.version}.jar`);
    if (!P.existsSync(B) && ((u = (c = D.downloads) == null ? void 0 : c.client) != null && u.url)) {
      const T = (G) => {
        An += G;
        const V = Date.now();
        if (V - bn > 500) {
          const U = An / Math.max(1, (V - bn) / 1e3);
          bn = V, An = 0, t({
            instanceId: e.instanceId,
            stage: "downloading",
            statusText: `Загрузка Minecraft ${e.version}.jar — ${(U / 1024 / 1024).toFixed(1)} МБ/с`,
            progress: 45
          });
        }
      };
      t({ instanceId: e.instanceId, stage: "downloading", statusText: `Загрузка Minecraft ${e.version}.jar...`, progress: 42 }), await It(D.downloads.client.url, B, T);
    }
    t({ instanceId: e.instanceId, stage: "downloading", statusText: "Загрузка библиотек...", progress: 50 });
    const k = [], L = D.libraries || [];
    let x = 0, W = 0, K = 0;
    for (const T of L) {
      if (!qC(T.rules)) continue;
      if ((p = T.downloads) != null && p.artifact) {
        const V = T.downloads.artifact.path;
        if (!br(V)) {
          n({ timestamp: Date.now(), type: "warn", message: `Библиотека пропущена (путь вне каталога): ${V}` });
          continue;
        }
        const U = j.join(s, V);
        if (!P.existsSync(U))
          try {
            await It(T.downloads.artifact.url, U, (Q) => {
              W += Q;
            });
          } catch {
          }
        P.existsSync(U) && (k.push(U), (V.includes("natives") || T.name.includes("natives")) && await ks(U, l));
      }
      if ((w = T.downloads) != null && w.classifiers) {
        const V = T.downloads.classifiers, U = process.platform === "win32" ? V["natives-windows"] || V["natives-windows-64"] || V["natives-windows-x86"] : process.platform === "darwin" ? V["natives-osx"] || V["natives-macos"] : V["natives-linux"];
        if (U) {
          const Q = U.path;
          if (!br(Q)) continue;
          const re = j.join(s, Q);
          if (!P.existsSync(re))
            try {
              await It(U.url, re, (q) => {
                W += q;
              });
            } catch {
            }
          P.existsSync(re) && await ks(re, l);
        }
      }
      if (!((m = T.downloads) != null && m.artifact) && T.name) {
        const V = T.name.split(":"), U = V[0].replace(/\./g, "/"), Q = V[1], re = V[2], q = `${U}/${Q}/${re}/${Q}-${re}.jar`;
        if (!br(q)) continue;
        const ie = j.join(s, q), Se = T.url ? `${T.url}${q}` : `https://libraries.minecraft.net/${q}`;
        if (!P.existsSync(ie))
          try {
            await It(Se, ie, (le) => {
              W += le;
            });
          } catch {
          }
        P.existsSync(ie) && (k.push(ie), T.name.includes("natives") && await ks(ie, l));
      }
      K++;
      const G = Date.now();
      if (G - x > 800 && W > 0) {
        const V = W / Math.max(1, (G - x) / 1e3);
        t({
          instanceId: e.instanceId,
          stage: "downloading",
          statusText: `Библиотеки ${K}/${L.length} — ${(V / 1024 / 1024).toFixed(1)} МБ/с`,
          progress: 50 + K / L.length * 15
        }), x = G, W = 0;
      }
    }
    k.push(B);
    let te = D.mainClass || "net.minecraft.client.main.Main";
    const F = [];
    if (e.loader === "fabric") {
      t({ instanceId: e.instanceId, stage: "downloading", statusText: "Установка Fabric...", progress: 72 });
      try {
        const T = await xn(`https://meta.fabricmc.net/v2/versions/loader/${e.version}`);
        if (T != null && T.length) {
          const G = T[0].loader.version, V = await xn(
            `https://meta.fabricmc.net/v2/versions/loader/${e.version}/${G}/profile/json`
          );
          if (V.mainClass && (te = V.mainClass), V.libraries)
            for (const U of V.libraries) {
              const Q = U.name.split(":"), re = Q[0].replace(/\./g, "/"), q = Q[1], ie = Q[2], Se = `${re}/${q}/${ie}/${q}-${ie}.jar`;
              if (!br(Se)) continue;
              const le = j.join(s, Se), ct = U.url ? `${U.url}${Se}` : `https://maven.fabricmc.net/${Se}`;
              if (!P.existsSync(le))
                try {
                  await It(ct, le);
                } catch {
                }
              P.existsSync(le) && k.unshift(le);
            }
        }
      } catch (T) {
        throw new Error(`Ошибка загрузки Fabric: ${T.message}`);
      }
    }
    if (e.loader === "quilt") {
      t({ instanceId: e.instanceId, stage: "downloading", statusText: "Установка Quilt...", progress: 72 });
      try {
        const T = await xn(`https://meta.quiltmc.org/v3/versions/loader/${e.version}`);
        if (T != null && T.length) {
          const G = T[0].loader.version, V = await xn(
            `https://meta.quiltmc.org/v3/versions/loader/${e.version}/${G}/profile/json`
          );
          if (V.mainClass && (te = V.mainClass), V.libraries)
            for (const U of V.libraries) {
              const Q = U.name.split(":"), re = Q[0].replace(/\./g, "/"), q = Q[1], ie = Q[2], Se = `${re}/${q}/${ie}/${q}-${ie}.jar`;
              if (!br(Se)) continue;
              const le = j.join(s, Se), ct = U.url ? `${U.url}${Se}` : `https://maven.quiltmc.org/repository/release/${Se}`;
              if (!P.existsSync(le))
                try {
                  await It(ct, le);
                } catch {
                }
              P.existsSync(le) && k.unshift(le);
            }
        }
      } catch (T) {
        throw new Error(`Ошибка загрузки Quilt: ${T.message}`);
      }
    }
    t({ instanceId: e.instanceId, stage: "launching", statusText: "Запуск игры...", progress: 92 });
    const O = k.join(j.delimiter), M = [];
    M.push(`-Xms${e.memoryMin || 1024}M`), M.push(`-Xmx${e.memoryMax || 4096}M`), (f = e.customJvmArgs) != null && f.includes("-Djava.library.path") || M.push(`-Djava.library.path=${l}`), M.push(
      "-XX:+UseG1GC",
      "-XX:+UnlockExperimentalVMOptions",
      "-XX:G1NewSizePercent=20",
      "-XX:G1ReservePercent=20",
      "-XX:MaxGCPauseMillis=50",
      "-XX:G1HeapRegionSize=32M"
    ), e.customJvmArgs && M.push(...e.customJvmArgs.split(" ").filter(Boolean)), F.push("-cp", O, te), M.push(...F);
    const R = (e.uuid || $h(e.username || "Player")).replace(/-/g, "");
    if (D.minecraftArguments && typeof D.minecraftArguments == "string")
      for (const T of D.minecraftArguments.split(" "))
        M.push(
          T.replace("${auth_player_name}", e.username || "Player").replace("${version_name}", `${e.version}-${e.loader}`).replace("${game_directory}", i).replace("${assets_root}", o).replace("${assets_index_name}", ((g = D.assetIndex) == null ? void 0 : g.id) || e.version).replace("${auth_uuid}", R).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", e.loader === "vanilla" ? "release" : "release/mod")
        );
    else
      M.push(
        "--username",
        e.username || "Player",
        "--version",
        `${e.version}-${e.loader}`,
        "--gameDir",
        i,
        "--assetsDir",
        o,
        "--assetIndex",
        ((v = D.assetIndex) == null ? void 0 : v.id) || e.version,
        "--uuid",
        R,
        "--accessToken",
        "0",
        "--userType",
        "mojang",
        "--versionType",
        "release"
      );
    e.fullscreen && !M.includes("--fullscreen") && M.push("--fullscreen"), e.customGameArgs && M.push(...e.customGameArgs.split(" ").filter(Boolean)), n({ timestamp: Date.now(), type: "info", message: `Запуск: "${y}" ${M.slice(0, 8).join(" ")} ... [обрезано]` });
    const H = Gp(y || "javaw", M, {
      cwd: i,
      detached: !e.hideLauncher
    });
    $r.set(e.instanceId, H), H.stdout.on("data", (T) => {
      for (const G of T.toString().split(`
`))
        G.trim() && (Lu(G), n({ timestamp: Date.now(), type: "info", message: G }));
    }), H.stderr.on("data", (T) => {
      for (const G of T.toString().split(`
`))
        G.trim() && (Lu(G), n({ timestamp: Date.now(), type: "warn", message: G }));
    }), H.on("error", (T) => {
      $r.delete(e.instanceId), t({
        instanceId: e.instanceId,
        stage: "error",
        statusText: `Ошибка запуска: ${T.message}`,
        progress: 0,
        error: T.message
      }), n({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${T.message}` });
    }), H.on("exit", (T) => {
      if ($r.delete(e.instanceId), T === 0)
        en = [], t({ instanceId: e.instanceId, stage: "idle", statusText: "", progress: 0 }), n({ timestamp: Date.now(), type: "info", message: "Minecraft завершён." });
      else {
        const G = zC(en);
        en = [], t({
          instanceId: e.instanceId,
          stage: "error",
          statusText: `Игра завершилась с ошибкой (код ${T}). ${G}`,
          progress: 0,
          error: `exit ${T}`
        }), n({ timestamp: Date.now(), type: "error", message: `Minecraft завершился с кодом ${T}. ${G}` });
      }
    }), t({ instanceId: e.instanceId, stage: "running", statusText: "Игра запущена!", progress: 100 });
  } catch (y) {
    t({
      instanceId: e.instanceId,
      stage: "error",
      statusText: `Ошибка: ${y.message}`,
      progress: 0,
      error: y.message
    }), n({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${y.message}` });
  }
}
function Pu(e) {
  const t = $r.get(e);
  if (t) {
    try {
      process.kill(-t.pid, "SIGTERM");
    } catch {
      t.kill();
    }
    return $r.delete(e), !0;
  }
  return !1;
}
const Fh = 64 * 1024 * 1024, Fu = 512 * 1024 * 1024, YC = Fh;
function XC(e) {
  return {
    format: 1,
    name: e.name,
    version: e.version,
    loader: ["vanilla", "fabric", "quilt"].includes(e.loader) ? e.loader : "vanilla",
    exportedAt: Date.now()
  };
}
function JC(e) {
  let t = 0;
  const n = [];
  for (const r of e) {
    const i = (r.entryName || "").replace(/\\/g, "/");
    if (!i) throw new Error("Архив содержит пустое имя файла");
    const o = i.replace(/\/+$/, "");
    if (j.isAbsolute(o) || /^[a-zA-Z]:/.test(o))
      throw new Error("Архив содержит абсолютный путь — импорт отклонён");
    const s = o.split("/");
    if (s.some((a) => a === "" || a === "." || a === ".."))
      throw new Error("Архив содержит небезопасный путь — импорт отклонён");
    if (o === "instance.json") {
      if (t += r.size, t > Fu) throw new Error("Архив слишком большой");
      continue;
    }
    if (s[0] !== "mods" || s.length !== 2)
      throw new Error(`Неожиданный файл в архиве: ${o}`);
    if (!/\.jar(\.disabled)?$/i.test(s[1]))
      throw new Error(`В папке mods ожидаются только .jar: ${s[1]}`);
    if (r.size > Fh)
      throw new Error(`Файл мода слишком большой: ${s[1]}`);
    if (t += r.size, t > Fu) throw new Error("Архив слишком большой");
    n.includes(s[1]) || n.push(s[1]);
  }
  if (!e.some((r) => (r.entryName || "").replace(/\\/g, "/").replace(/\/+$/, "") === "instance.json"))
    throw new Error("В архиве нет instance.json — это не сборка Mine Launcher");
  if (n.length === 0)
    throw new Error("В архиве нет модов — импортировать нечего");
  return n;
}
function ZC(e) {
  if (!e || typeof e != "object") throw new Error("instance.json повреждён");
  const t = e;
  if (t.format !== 1) throw new Error("Неподдерживаемый формат сборки");
  if (typeof t.name != "string" || !t.name.trim()) throw new Error("В сборке нет названия");
  if (typeof t.version != "string" || !/^[0-9A-Za-z._-]{1,32}$/.test(t.version))
    throw new Error("Некорректная версия Minecraft в сборке");
  if (t.loader !== "vanilla" && t.loader !== "fabric" && t.loader !== "quilt")
    throw new Error("Некорректный загрузчик в сборке");
  return {
    format: 1,
    name: t.name.trim().slice(0, 60),
    version: t.version,
    loader: t.loader,
    exportedAt: typeof t.exportedAt == "number" ? t.exportedAt : Date.now()
  };
}
function KC(e, t) {
  const n = e.trim() || "Импортированная сборка";
  if (!t.includes(n)) return n;
  for (let r = 2; r < 100; r++) {
    const i = `${n} (${r})`;
    if (!t.includes(i)) return i;
  }
  return `${n} (${Date.now().toString(36)})`;
}
Mu.setApplicationMenu(null);
Dt.requestSingleInstanceLock() || Dt.quit();
const Uh = j.dirname(Bp(import.meta.url));
process.env.APP_ROOT = j.join(Uh, "..");
const Dn = process.env.VITE_DEV_SERVER_URL, Mh = j.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Dn ? j.join(process.env.APP_ROOT, "public") : Mh;
let X = null, rt = null;
const Oe = Yo(), Xi = j.join(Oe, "accounts.json"), Vn = j.join(Oe, "instances.json"), aa = j.join(Oe, "settings.json"), Yt = j.join(Oe, "skins");
function nl(e, t) {
  try {
    if (P.existsSync(e)) return JSON.parse(P.readFileSync(e, "utf-8"));
  } catch {
  }
  return t;
}
function xt(e, t) {
  try {
    P.writeFileSync(e, JSON.stringify(t, null, 2), "utf-8");
  } catch (n) {
    console.error(`Failed saving ${e}:`, n);
  }
}
let ve = nl(Xi, []), ge = nl(Vn, []);
const rl = Math.round(jp.totalmem() / 1024 / 1024), il = Math.max(2048, Math.min(4096, Math.floor(rl / 3)));
let Ce = nl(aa, {
  javaPath: "",
  memoryMin: 1024,
  memoryMax: il,
  customJvmArgs: "",
  closeLauncherOnGameStart: !1,
  fullscreen: !1,
  hideLauncher: !1
});
(!Ce.memoryMax || Ce.memoryMax > rl * 0.85) && (Ce.memoryMax = il);
function ol() {
  X = new ku({
    width: 1100,
    height: 740,
    minWidth: 940,
    minHeight: 660,
    frame: !1,
    titleBarStyle: "hidden",
    backgroundColor: "#111217",
    icon: j.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: j.join(Uh, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0,
      webSecurity: !0
    }
  }), Dn ? X.loadURL(Dn) : X.loadFile(j.join(Mh, "index.html")), X.on("closed", () => {
    X = null;
  }), X.webContents.setWindowOpenHandler(() => ({ action: "deny" })), X.webContents.on("will-navigate", (e) => e.preventDefault());
}
function QC() {
  if (rt) return rt;
  const e = j.join(process.env.VITE_PUBLIC, "icon.png");
  let t = Il.createFromPath(e);
  t.isEmpty() && (t = Il.createEmpty()), rt = new Up(t), rt.setToolTip("Mine Launcher"), rt.on("click", () => {
    X == null || X.show();
  });
  const n = Mu.buildFromTemplate([
    { label: "Показать лаунчер", click: () => X == null ? void 0 : X.show() },
    { type: "separator" },
    { label: "Выход", click: () => Dt.quit() }
  ]);
  return rt.setContextMenu(n), rt;
}
function zn(e) {
  try {
    X == null || X.webContents.send("updater:state", e);
  } catch {
  }
}
function eI() {
  Dn || process.platform !== "linux" && (je.autoUpdater.autoDownload = !0, je.autoUpdater.autoInstallOnAppQuit = !0, je.autoUpdater.allowDowngrade = !1, je.autoUpdater.on("checking-for-update", () => {
    zn({ status: "checking" });
  }), je.autoUpdater.on("update-available", (e) => {
    zn({ status: "available", info: e });
    try {
      je.autoUpdater.downloadUpdate();
    } catch {
    }
  }), je.autoUpdater.on("update-not-available", (e) => {
    zn({ status: "not-available", info: e });
  }), je.autoUpdater.on("download-progress", (e) => {
    zn({
      status: "downloading",
      percent: e.percent,
      transferred: e.transferred,
      total: e.total,
      bytesPerSecond: e.bytesPerSecond
    });
  }), je.autoUpdater.on("update-downloaded", (e) => {
    zn({ status: "downloaded", info: e });
  }), je.autoUpdater.on("error", (e) => {
    zn({ status: "error", message: (e == null ? void 0 : e.message) || "Ошибка обновления" });
  }), setTimeout(() => {
    je.autoUpdater.checkForUpdates().catch(() => {
    });
  }, 4e3), setInterval(() => {
    je.autoUpdater.checkForUpdates().catch(() => {
    });
  }, 4 * 60 * 60 * 1e3));
}
function tI() {
  QC(), rt == null || rt.setToolTip("Mine Launcher — игра запущена"), X == null || X.hide();
}
Dt.on("second-instance", () => {
  X ? (X.isMinimized() && X.restore(), X.show(), X.focus()) : ol();
});
Dt.on("window-all-closed", () => {
  process.platform !== "darwin" && Dt.quit(), X = null;
});
Dt.on("activate", () => {
  ku.getAllWindows().length === 0 && ol();
});
function la(e, t) {
  return new Promise((n, r) => {
    const i = j.dirname(t);
    P.existsSync(i) || P.mkdirSync(i, { recursive: !0 });
    const o = P.createWriteStream(t);
    (e.startsWith("https") ? ca : ua).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (l) => {
      if (l.statusCode && l.statusCode >= 300 && l.statusCode < 400 && l.headers.location)
        return o.close(), la(l.headers.location, t).then(n).catch(r);
      if (l.statusCode !== 200)
        return o.close(), P.unlink(t, () => {
        }), l.resume(), r(new Error(`HTTP ${l.statusCode}: ${e}`));
      l.pipe(o), o.on("finish", () => o.close(() => n())), o.on("error", r);
    }).on("error", (l) => {
      o.close(), P.unlink(t, () => {
      }), r(l);
    });
  });
}
function Bs(e, t) {
  const n = j.relative(j.resolve(e), j.resolve(t));
  return n !== "" && !n.startsWith("..") && !j.isAbsolute(n);
}
function Pt(e) {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(e)) throw new Error("Некорректный id сборки");
  return e;
}
function Bi(e) {
  if (!/^[A-Za-z0-9._ -]{1,255}$/.test(e)) throw new Error("Некорректное имя файла");
  return e;
}
function nI() {
  ne.handle("minimize-window", () => {
    X == null || X.minimize();
  }), ne.handle("maximize-window", () => X ? X.isMaximized() ? (X.unmaximize(), !1) : (X.maximize(), !0) : !1), ne.handle("close-window", () => {
    X == null || X.close();
  }), ne.handle("is-maximized", () => (X == null ? void 0 : X.isMaximized()) || !1), ne.handle("get-accounts", () => ve), ne.handle("add-account", (e, t) => {
    const n = t.trim();
    if (!n) throw new Error("Введите никнейм");
    if (n.length > 16) throw new Error("Никнейм слишком длинный (максимум 16 символов)");
    if (!/^[a-zA-Z0-9_]+$/.test(n)) throw new Error("Допустимы только латинские буквы, цифры и знак _");
    if (ve.some((i) => i.username.toLowerCase() === n.toLowerCase()))
      throw new Error(`Аккаунт «${n}» уже добавлен`);
    const r = {
      id: Date.now().toString(),
      username: n,
      uuid: $h(n),
      type: "offline",
      isActive: ve.length === 0,
      createdAt: Date.now()
    };
    return ve.push(r), xt(Xi, ve), ve;
  }), ne.handle("set-active-account", (e, t) => (ve = ve.map((n) => ({ ...n, isActive: n.id === t })), xt(Xi, ve), ve)), ne.handle("delete-account", (e, t) => (ve = ve.filter((n) => n.id !== t), ve.length > 0 && !ve.some((n) => n.isActive) && (ve[0].isActive = !0), xt(Xi, ve), ve)), ne.handle("get-instances", () => ge), ne.handle("create-instance", (e, t) => {
    if (!t.version) throw new Error("Выберите версию Minecraft");
    if (ge.some((r) => r.name === t.name)) throw new Error(`Сборка «${t.name}» уже существует`);
    const n = {
      id: "inst-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: t.name,
      version: t.version,
      loader: t.loader || "vanilla",
      created: Date.now(),
      memoryMin: Ce.memoryMin,
      memoryMax: Ce.memoryMax
    };
    ge.push(n), xt(Vn, ge);
    for (const r of ["mods", "saves"]) {
      const i = j.join(Oe, "instances", n.id, r);
      P.existsSync(i) || P.mkdirSync(i, { recursive: !0 });
    }
    return ge;
  }), ne.handle("rename-instance", (e, { id: t, name: n }) => {
    const r = ge.find((i) => i.id === t);
    if (!r) throw new Error("Сборка не найдена");
    return r.name = n.trim(), xt(Vn, ge), ge;
  }), ne.handle("delete-instance", (e, t) => {
    Pt(t);
    const n = ge.find((r) => r.id === t);
    return ge = ge.filter((r) => r.id !== t), xt(Vn, ge), n && P.existsSync(j.join(Oe, "instances", t)) && X && Sr.showMessageBox(X, {
      type: "question",
      buttons: ["Удалить", "Отмена"],
      defaultId: 1,
      title: "Удалить сборку?",
      message: `Удалить сборку «${n.name}» вместе с мирами, модами и файлами игры?`
    }).then(({ response: r }) => {
      r === 0 && P.rmSync(j.join(Oe, "instances", t), { recursive: !0, force: !0 });
    }), ge;
  }), ne.handle("export-instance", async (e, t) => {
    Pt(t);
    const n = ge.find((l) => l.id === t);
    if (!n) throw new Error("Сборка не найдена");
    const r = j.join(Oe, "instances", t, "mods"), i = P.existsSync(r) ? P.readdirSync(r).filter((l) => /\.jar(\.disabled)?$/i.test(l)) : [];
    if (i.length === 0) throw new Error("В этой сборке нет модов — делиться нечем");
    const o = (n.name || "instance").replace(/[\\/:*?"<>|]/g, "_").trim() || "instance", s = X ? await Sr.showSaveDialog(X, {
      title: "Экспорт сборки",
      defaultPath: j.join(Dt.getPath("documents"), `${o}.zip`),
      filters: [{ name: "Сборка Mine Launcher", extensions: ["zip"] }]
    }) : { canceled: !0, filePath: void 0 };
    if (s.canceled || !s.filePath) return { ok: !1, canceled: !0 };
    const a = new Ou();
    a.addFile("instance.json", Buffer.from(JSON.stringify(XC(n), null, 2), "utf-8"));
    for (const l of i)
      a.addLocalFile(j.join(r, l), "mods");
    return a.writeZip(s.filePath), { ok: !0, path: s.filePath };
  }), ne.handle("import-instance", async () => {
    const e = X ? await Sr.showOpenDialog(X, {
      title: "Импорт сборки",
      properties: ["openFile"],
      filters: [{ name: "Сборка Mine Launcher", extensions: ["zip"] }]
    }) : { canceled: !0, filePaths: [] };
    if (e.canceled || e.filePaths.length === 0) return { ok: !1, canceled: !0 };
    const t = e.filePaths[0];
    if (P.statSync(t).size > 600 * 1024 * 1024) throw new Error("Архив больше 600 МБ — отказ");
    const r = new Ou(t), i = r.getEntries().filter((p) => !p.isDirectory), o = JC(
      i.map((p) => ({ entryName: p.entryName, size: p.header.size }))
    ), s = r.getEntry("instance.json");
    if (!s) throw new Error("В архиве нет instance.json");
    const a = ZC(JSON.parse(s.getData().toString("utf-8"))), l = "inst-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), h = {
      id: l,
      name: KC(a.name, ge.map((p) => p.name)),
      version: a.version,
      loader: a.loader,
      created: Date.now(),
      memoryMin: Ce.memoryMin,
      memoryMax: Ce.memoryMax
    }, c = j.join(Oe, "instances", l), u = j.join(c, "mods");
    try {
      P.mkdirSync(u, { recursive: !0 });
      const p = /* @__PURE__ */ new Map();
      for (const w of i) {
        const m = w.entryName.replace(/\\/g, "/").replace(/\/+$/, "");
        m.startsWith("mods/") && p.set(m.slice(5), w);
      }
      for (const w of o) {
        const m = p.get(w);
        if (!m) throw new Error(`Файл мода пропал при чтении: ${w}`);
        const f = m.getData();
        if (f.length > YC)
          throw new Error(`Файл мода распаковался больше лимита: ${w}`);
        P.writeFileSync(j.join(u, w), f);
      }
      P.mkdirSync(j.join(c, "saves"), { recursive: !0 });
    } catch (p) {
      throw P.rmSync(c, { recursive: !0, force: !0 }), p;
    }
    return ge.push(h), xt(Vn, ge), { ok: !0, instances: ge, importedId: l };
  }), ne.handle("get-versions", async () => {
    try {
      return await Ph();
    } catch {
      return { latest: { release: "", snapshot: "" }, versions: [] };
    }
  }), ne.handle("get-settings", () => Ce), ne.handle("set-selected-instance-id", (e, t) => (Ce.selectedInstanceId = t, xt(aa, Ce), !0)), ne.handle("save-settings", (e, t) => (Ce = { ...Ce, ...t }, xt(aa, Ce), Ce)), ne.handle("detect-java", async () => Lh()), ne.handle("get-required-java", (e, t) => Rh(t)), ne.handle("open-launcher-folder", () => Cl.openPath(Oe)), ne.handle("launch-instance", async (e, t) => {
    Pt(t);
    const n = ge.find((i) => i.id === t);
    if (!n) throw new Error("Сборка не найдена");
    const r = ve.find((i) => i.isActive) || ve[0];
    if (!r) throw new Error("Сначала добавьте аккаунт на панели слева");
    return Pu(t) && await new Promise((i) => setTimeout(i, 500)), X == null || X.show(), WC(
      {
        instanceId: n.id,
        instanceName: n.name,
        version: n.version,
        loader: n.loader || "vanilla",
        username: r.username,
        uuid: r.uuid,
        memoryMin: Ce.memoryMin || 1024,
        memoryMax: Ce.memoryMax || 4096,
        javaPath: n.javaPath || Ce.javaPath || void 0,
        customJvmArgs: Ce.customJvmArgs || "",
        customGameArgs: "",
        fullscreen: !!Ce.fullscreen,
        hideLauncher: !!Ce.closeLauncherOnGameStart
      },
      (i) => {
        if ((i == null ? void 0 : i.stage) === "running") {
          const o = ge.find((s) => s.id === t);
          o && (o.lastPlayed = Date.now(), xt(Vn, ge)), Ce.closeLauncherOnGameStart && setTimeout(() => {
            try {
              tI();
            } catch {
            }
          }, 3e3);
        }
        ((i == null ? void 0 : i.stage) === "idle" || (i == null ? void 0 : i.stage) === "error") && (rt == null || rt.setToolTip("Mine Launcher")), X == null || X.webContents.send("launch-progress", i);
      },
      (i) => X == null ? void 0 : X.webContents.send("game-log", i)
    ), !0;
  }), ne.handle("stop-instance", (e, t) => Pu(t)), ne.handle("restore-window", () => (X == null || X.show(), !0)), ne.handle("get-system-info", () => ({
    totalRamMb: rl,
    defaultMaxMemory: il
  })), ne.handle("open-instance-folder", (e, t) => {
    Pt(t);
    const n = j.join(Oe, "instances", t);
    P.existsSync(n) || P.mkdirSync(n, { recursive: !0 }), Cl.openPath(n);
  }), ne.handle("get-instance-mods", (e, t) => {
    Pt(t);
    const n = j.join(Oe, "instances", t, "mods");
    if (!P.existsSync(n)) return [];
    try {
      return P.readdirSync(n).filter((r) => r.endsWith(".jar") || r.endsWith(".jar.disabled")).map((r) => {
        const i = j.join(n, r), o = P.statSync(i);
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
  }), ne.handle("toggle-mod", (e, { instanceId: t, modFilename: n }) => {
    Pt(t);
    const r = j.join(Oe, "instances", t, "mods"), i = j.join(r, Bi(n));
    if (!Bs(r, i) || !P.existsSync(i)) return !1;
    const o = n.endsWith(".jar") ? n + ".disabled" : n.replace(/\.disabled$/, ""), s = j.join(r, Bi(o));
    return Bs(r, s) ? (P.renameSync(i, s), !0) : !1;
  }), ne.handle("delete-mod", (e, { instanceId: t, modFilename: n }) => {
    Pt(t);
    const r = j.join(Oe, "instances", t, "mods"), i = j.join(r, Bi(n));
    return Bs(r, i) ? (P.existsSync(i) && P.unlinkSync(i), !0) : !1;
  }), ne.handle("download-mod-file", async (e, { instanceId: t, downloadUrl: n, filename: r }) => {
    Pt(t);
    const i = Bi(r);
    if (!n.startsWith("https://cdn.modrinth.com/")) throw new Error("Недопустимый источник файла");
    const o = j.join(Oe, "instances", t, "mods");
    return P.existsSync(o) || P.mkdirSync(o, { recursive: !0 }), await la(n, j.join(o, i)), !0;
  }), ne.handle("add-mod-file", async (e, t) => {
    if (Pt(t), !X) return !1;
    const n = await Sr.showOpenDialog(X, {
      title: "Выберите файл мода (.jar)",
      filters: [{ name: "Minecraft Mods", extensions: ["jar"] }],
      properties: ["openFile", "multiSelections"]
    });
    if (n.canceled || !n.filePaths.length) return !1;
    const r = j.join(Oe, "instances", t, "mods");
    P.existsSync(r) || P.mkdirSync(r, { recursive: !0 });
    for (const i of n.filePaths) {
      const o = j.join(r, j.basename(i));
      P.copyFileSync(i, o);
    }
    return !0;
  }), ne.handle("upload-user-skin", async (e, t) => {
    if (!X) return null;
    const n = await Sr.showOpenDialog(X, {
      title: "Выберите скин Minecraft (.png)",
      filters: [{ name: "Minecraft Skin (*.png)", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (n.canceled || !n.filePaths.length) return null;
    P.existsSync(Yt) || P.mkdirSync(Yt, { recursive: !0 });
    const r = j.join(Yt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`);
    return P.copyFileSync(n.filePaths[0], r), X.webContents.send("accounts-updated", ve), r;
  }), ne.handle("fetch-online-skin", async (e, { username: t, targetUsername: n }) => {
    P.existsSync(Yt) || P.mkdirSync(Yt, { recursive: !0 });
    const r = j.join(Yt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`), i = [
      `https://mc-heads.net/skin/${encodeURIComponent(n)}`,
      `https://minotar.net/skin/${encodeURIComponent(n)}`
    ];
    for (const o of i)
      try {
        if (await la(o, r), P.existsSync(r) && P.statSync(r).size > 100)
          return !0;
      } catch {
      }
    throw new Error(`Скин для «${n}» не найден на серверах`);
  }), ne.handle("get-user-skin", (e, t) => {
    const n = j.join(Yt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`);
    return P.existsSync(n) ? n : null;
  }), ne.handle("get-profile-stats", (e, t) => {
    const n = [];
    let r = 0, i = 0;
    for (const s of ge) {
      s.lastPlayed && (i = Math.max(i, s.lastPlayed));
      const a = j.join(Oe, "instances", s.id, "saves");
      if (P.existsSync(a))
        try {
          for (const h of P.readdirSync(a)) {
            const c = j.join(a, h);
            if (P.statSync(c).isDirectory()) {
              let u = 0;
              const p = j.join(c, "level.dat");
              P.existsSync(p) && (u = P.statSync(p).mtimeMs), n.push({
                instanceId: s.id,
                instanceName: s.name,
                worldName: h,
                lastPlayed: u
              });
            }
          }
        } catch {
        }
      const l = j.join(Oe, "instances", s.id, "mods");
      if (P.existsSync(l))
        try {
          r += P.readdirSync(l).filter((h) => h.endsWith(".jar") || h.endsWith(".jar.disabled")).length;
        } catch {
        }
    }
    const o = ve.find((s) => s.username === t) || ve.find((s) => s.isActive);
    return {
      username: (o == null ? void 0 : o.username) || t,
      uuid: (o == null ? void 0 : o.uuid) || "",
      worldsCount: n.length,
      worlds: n.sort((s, a) => a.lastPlayed - s.lastPlayed),
      instancesCount: ge.length,
      modsCount: r,
      lastPlayedFormatted: i ? new Date(i).toLocaleString("ru-RU") : "Ещё не играл"
    };
  }), ne.handle("get-account-head", async (e, t) => {
    const n = j.join(Yt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`);
    return P.existsSync(n) ? `file://${n}` : `https://mc-heads.net/avatar/${encodeURIComponent(t)}/64`;
  }), ne.handle("updater:check", async () => {
    if (Dn) return { status: "dev" };
    try {
      return await je.autoUpdater.checkForUpdates(), { ok: !0 };
    } catch (e) {
      return { ok: !1, message: e == null ? void 0 : e.message };
    }
  }), ne.handle("updater:download", async () => {
    if (Dn) return { status: "dev" };
    try {
      return await je.autoUpdater.downloadUpdate(), { ok: !0 };
    } catch (e) {
      return { ok: !1, message: e == null ? void 0 : e.message };
    }
  }), ne.handle("updater:install", () => {
    if (Dn) return !1;
    try {
      return setImmediate(() => {
        je.autoUpdater.quitAndInstall();
      }), !0;
    } catch {
      return !1;
    }
  });
}
Dt.whenReady().then(() => {
  nI(), ol(), eI();
});
export {
  Mh as RENDERER_DIST,
  Dn as VITE_DEV_SERVER_URL
};
