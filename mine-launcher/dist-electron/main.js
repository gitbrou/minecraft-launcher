import En, { app as Tt, Menu as au, BrowserWindow as lu, ipcMain as K, dialog as No, shell as nl, nativeImage as rl, Tray as ep } from "electron";
import st from "fs";
import tp from "constants";
import at from "stream";
import Jn from "util";
import cu from "assert";
import le from "path";
import qi from "child_process";
import Gi from "events";
import Fr from "crypto";
import uu from "tty";
import zi from "os";
import Jt from "url";
import Bs from "zlib";
import np from "http";
import { fileURLToPath as rp } from "node:url";
import U from "node:path";
import O from "node:fs";
import ip from "node:os";
import Hs from "node:https";
import qs from "node:http";
import op from "node:crypto";
import { execSync as ws, spawn as sp } from "node:child_process";
import fu from "buffer";
var Fe = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ap(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var De = {}, vn = {}, Me = {};
Me.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((n, r) => {
        t.push((i, o) => i != null ? r(i) : n(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
Me.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const n = t[t.length - 1];
    if (typeof n != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((r) => n(null, r), n);
  }, "name", { value: e.name });
};
var Nt = tp, lp = process.cwd, xi = null, cp = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return xi || (xi = lp.call(process)), xi;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var il = process.chdir;
  process.chdir = function(e) {
    xi = null, il.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, il);
}
var up = fp;
function fp(e) {
  Nt.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || n(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = r(e.chmod), e.fchmod = r(e.fchmod), e.lchmod = r(e.lchmod), e.chownSync = s(e.chownSync), e.fchownSync = s(e.fchownSync), e.lchownSync = s(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = a(e.stat), e.fstat = a(e.fstat), e.lstat = a(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(c, f, p) {
    p && process.nextTick(p);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(c, f, p, g) {
    g && process.nextTick(g);
  }, e.lchownSync = function() {
  }), cp === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(c) {
    function f(p, g, w) {
      var y = Date.now(), E = 0;
      c(p, g, function x(T) {
        if (T && (T.code === "EACCES" || T.code === "EPERM" || T.code === "EBUSY") && Date.now() - y < 6e4) {
          setTimeout(function() {
            e.stat(g, function(N, k) {
              N && N.code === "ENOENT" ? c(p, g, x) : w(T);
            });
          }, E), E < 100 && (E += 10);
          return;
        }
        w && w(T);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(c) {
    function f(p, g, w, y, E, x) {
      var T;
      if (x && typeof x == "function") {
        var N = 0;
        T = function(k, W, Y) {
          if (k && k.code === "EAGAIN" && N < 10)
            return N++, c.call(e, p, g, w, y, E, T);
          x.apply(this, arguments);
        };
      }
      return c.call(e, p, g, w, y, E, T);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(f, c), f;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(c) {
    return function(f, p, g, w, y) {
      for (var E = 0; ; )
        try {
          return c.call(e, f, p, g, w, y);
        } catch (x) {
          if (x.code === "EAGAIN" && E < 10) {
            E++;
            continue;
          }
          throw x;
        }
    };
  }(e.readSync);
  function t(c) {
    c.lchmod = function(f, p, g) {
      c.open(
        f,
        Nt.O_WRONLY | Nt.O_SYMLINK,
        p,
        function(w, y) {
          if (w) {
            g && g(w);
            return;
          }
          c.fchmod(y, p, function(E) {
            c.close(y, function(x) {
              g && g(E || x);
            });
          });
        }
      );
    }, c.lchmodSync = function(f, p) {
      var g = c.openSync(f, Nt.O_WRONLY | Nt.O_SYMLINK, p), w = !0, y;
      try {
        y = c.fchmodSync(g, p), w = !1;
      } finally {
        if (w)
          try {
            c.closeSync(g);
          } catch {
          }
        else
          c.closeSync(g);
      }
      return y;
    };
  }
  function n(c) {
    Nt.hasOwnProperty("O_SYMLINK") && c.futimes ? (c.lutimes = function(f, p, g, w) {
      c.open(f, Nt.O_SYMLINK, function(y, E) {
        if (y) {
          w && w(y);
          return;
        }
        c.futimes(E, p, g, function(x) {
          c.close(E, function(T) {
            w && w(x || T);
          });
        });
      });
    }, c.lutimesSync = function(f, p, g) {
      var w = c.openSync(f, Nt.O_SYMLINK), y, E = !0;
      try {
        y = c.futimesSync(w, p, g), E = !1;
      } finally {
        if (E)
          try {
            c.closeSync(w);
          } catch {
          }
        else
          c.closeSync(w);
      }
      return y;
    }) : c.futimes && (c.lutimes = function(f, p, g, w) {
      w && process.nextTick(w);
    }, c.lutimesSync = function() {
    });
  }
  function r(c) {
    return c && function(f, p, g) {
      return c.call(e, f, p, function(w) {
        h(w) && (w = null), g && g.apply(this, arguments);
      });
    };
  }
  function i(c) {
    return c && function(f, p) {
      try {
        return c.call(e, f, p);
      } catch (g) {
        if (!h(g)) throw g;
      }
    };
  }
  function o(c) {
    return c && function(f, p, g, w) {
      return c.call(e, f, p, g, function(y) {
        h(y) && (y = null), w && w.apply(this, arguments);
      });
    };
  }
  function s(c) {
    return c && function(f, p, g) {
      try {
        return c.call(e, f, p, g);
      } catch (w) {
        if (!h(w)) throw w;
      }
    };
  }
  function a(c) {
    return c && function(f, p, g) {
      typeof p == "function" && (g = p, p = null);
      function w(y, E) {
        E && (E.uid < 0 && (E.uid += 4294967296), E.gid < 0 && (E.gid += 4294967296)), g && g.apply(this, arguments);
      }
      return p ? c.call(e, f, p, w) : c.call(e, f, w);
    };
  }
  function l(c) {
    return c && function(f, p) {
      var g = p ? c.call(e, f, p) : c.call(e, f);
      return g && (g.uid < 0 && (g.uid += 4294967296), g.gid < 0 && (g.gid += 4294967296)), g;
    };
  }
  function h(c) {
    if (!c || c.code === "ENOSYS")
      return !0;
    var f = !process.getuid || process.getuid() !== 0;
    return !!(f && (c.code === "EINVAL" || c.code === "EPERM"));
  }
}
var ol = at.Stream, dp = hp;
function hp(e) {
  return {
    ReadStream: t,
    WriteStream: n
  };
  function t(r, i) {
    if (!(this instanceof t)) return new t(r, i);
    ol.call(this);
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
    e.open(this.path, this.flags, this.mode, function(c, f) {
      if (c) {
        o.emit("error", c), o.readable = !1;
        return;
      }
      o.fd = f, o.emit("open", f), o._read();
    });
  }
  function n(r, i) {
    if (!(this instanceof n)) return new n(r, i);
    ol.call(this), this.path = r, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
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
var pp = gp, mp = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function gp(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: mp(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(n) {
    Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
  }), t;
}
var fe = st, yp = up, Ep = dp, wp = pp, oi = Jn, Ce, Ri;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Ce = Symbol.for("graceful-fs.queue"), Ri = Symbol.for("graceful-fs.previous")) : (Ce = "___graceful-fs.queue", Ri = "___graceful-fs.previous");
function vp() {
}
function du(e, t) {
  Object.defineProperty(e, Ce, {
    get: function() {
      return t;
    }
  });
}
var gn = vp;
oi.debuglog ? gn = oi.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (gn = function() {
  var e = oi.format.apply(oi, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!fe[Ce]) {
  var _p = Fe[Ce] || [];
  du(fe, _p), fe.close = function(e) {
    function t(n, r) {
      return e.call(fe, n, function(i) {
        i || sl(), typeof r == "function" && r.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Ri, {
      value: e
    }), t;
  }(fe.close), fe.closeSync = function(e) {
    function t(n) {
      e.apply(fe, arguments), sl();
    }
    return Object.defineProperty(t, Ri, {
      value: e
    }), t;
  }(fe.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    gn(fe[Ce]), cu.equal(fe[Ce].length, 0);
  });
}
Fe[Ce] || du(Fe, fe[Ce]);
var je = Gs(wp(fe));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !fe.__patched && (je = Gs(fe), fe.__patched = !0);
function Gs(e) {
  yp(e), e.gracefulify = Gs, e.createReadStream = W, e.createWriteStream = Y;
  var t = e.readFile;
  e.readFile = n;
  function n(q, v, V) {
    return typeof v == "function" && (V = v, v = null), Z(q, v, V);
    function Z(oe, D, I, P) {
      return t(oe, D, function(C) {
        C && (C.code === "EMFILE" || C.code === "ENFILE") ? Cn([Z, [oe, D, I], C, P || Date.now(), Date.now()]) : typeof I == "function" && I.apply(this, arguments);
      });
    }
  }
  var r = e.writeFile;
  e.writeFile = i;
  function i(q, v, V, Z) {
    return typeof V == "function" && (Z = V, V = null), oe(q, v, V, Z);
    function oe(D, I, P, C, F) {
      return r(D, I, P, function(A) {
        A && (A.code === "EMFILE" || A.code === "ENFILE") ? Cn([oe, [D, I, P, C], A, F || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = s);
  function s(q, v, V, Z) {
    return typeof V == "function" && (Z = V, V = null), oe(q, v, V, Z);
    function oe(D, I, P, C, F) {
      return o(D, I, P, function(A) {
        A && (A.code === "EMFILE" || A.code === "ENFILE") ? Cn([oe, [D, I, P, C], A, F || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  var a = e.copyFile;
  a && (e.copyFile = l);
  function l(q, v, V, Z) {
    return typeof V == "function" && (Z = V, V = 0), oe(q, v, V, Z);
    function oe(D, I, P, C, F) {
      return a(D, I, P, function(A) {
        A && (A.code === "EMFILE" || A.code === "ENFILE") ? Cn([oe, [D, I, P, C], A, F || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  var h = e.readdir;
  e.readdir = f;
  var c = /^v[0-5]\./;
  function f(q, v, V) {
    typeof v == "function" && (V = v, v = null);
    var Z = c.test(process.version) ? function(I, P, C, F) {
      return h(I, oe(
        I,
        P,
        C,
        F
      ));
    } : function(I, P, C, F) {
      return h(I, P, oe(
        I,
        P,
        C,
        F
      ));
    };
    return Z(q, v, V);
    function oe(D, I, P, C) {
      return function(F, A) {
        F && (F.code === "EMFILE" || F.code === "ENFILE") ? Cn([
          Z,
          [D, I, P],
          F,
          C || Date.now(),
          Date.now()
        ]) : (A && A.sort && A.sort(), typeof P == "function" && P.call(this, F, A));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var p = Ep(e);
    x = p.ReadStream, N = p.WriteStream;
  }
  var g = e.ReadStream;
  g && (x.prototype = Object.create(g.prototype), x.prototype.open = T);
  var w = e.WriteStream;
  w && (N.prototype = Object.create(w.prototype), N.prototype.open = k), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return x;
    },
    set: function(q) {
      x = q;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return N;
    },
    set: function(q) {
      N = q;
    },
    enumerable: !0,
    configurable: !0
  });
  var y = x;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return y;
    },
    set: function(q) {
      y = q;
    },
    enumerable: !0,
    configurable: !0
  });
  var E = N;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return E;
    },
    set: function(q) {
      E = q;
    },
    enumerable: !0,
    configurable: !0
  });
  function x(q, v) {
    return this instanceof x ? (g.apply(this, arguments), this) : x.apply(Object.create(x.prototype), arguments);
  }
  function T() {
    var q = this;
    ne(q.path, q.flags, q.mode, function(v, V) {
      v ? (q.autoClose && q.destroy(), q.emit("error", v)) : (q.fd = V, q.emit("open", V), q.read());
    });
  }
  function N(q, v) {
    return this instanceof N ? (w.apply(this, arguments), this) : N.apply(Object.create(N.prototype), arguments);
  }
  function k() {
    var q = this;
    ne(q.path, q.flags, q.mode, function(v, V) {
      v ? (q.destroy(), q.emit("error", v)) : (q.fd = V, q.emit("open", V));
    });
  }
  function W(q, v) {
    return new e.ReadStream(q, v);
  }
  function Y(q, v) {
    return new e.WriteStream(q, v);
  }
  var Q = e.open;
  e.open = ne;
  function ne(q, v, V, Z) {
    return typeof V == "function" && (Z = V, V = null), oe(q, v, V, Z);
    function oe(D, I, P, C, F) {
      return Q(D, I, P, function(A, L) {
        A && (A.code === "EMFILE" || A.code === "ENFILE") ? Cn([oe, [D, I, P, C], A, F || Date.now(), Date.now()]) : typeof C == "function" && C.apply(this, arguments);
      });
    }
  }
  return e;
}
function Cn(e) {
  gn("ENQUEUE", e[0].name, e[1]), fe[Ce].push(e), zs();
}
var si;
function sl() {
  for (var e = Date.now(), t = 0; t < fe[Ce].length; ++t)
    fe[Ce][t].length > 2 && (fe[Ce][t][3] = e, fe[Ce][t][4] = e);
  zs();
}
function zs() {
  if (clearTimeout(si), si = void 0, fe[Ce].length !== 0) {
    var e = fe[Ce].shift(), t = e[0], n = e[1], r = e[2], i = e[3], o = e[4];
    if (i === void 0)
      gn("RETRY", t.name, n), t.apply(null, n);
    else if (Date.now() - i >= 6e4) {
      gn("TIMEOUT", t.name, n);
      var s = n.pop();
      typeof s == "function" && s.call(null, r);
    } else {
      var a = Date.now() - o, l = Math.max(o - i, 1), h = Math.min(l * 1.2, 100);
      a >= h ? (gn("RETRY", t.name, n), t.apply(null, n.concat([i]))) : fe[Ce].push(e);
    }
    si === void 0 && (si = setTimeout(zs, 0));
  }
}
(function(e) {
  const t = Me.fromCallback, n = je, r = [
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
    return typeof h == "function" ? n.read(i, o, s, a, l, h) : new Promise((c, f) => {
      n.read(i, o, s, a, l, (p, g, w) => {
        if (p) return f(p);
        c({ bytesRead: g, buffer: w });
      });
    });
  }, e.write = function(i, o, ...s) {
    return typeof s[s.length - 1] == "function" ? n.write(i, o, ...s) : new Promise((a, l) => {
      n.write(i, o, ...s, (h, c, f) => {
        if (h) return l(h);
        a({ bytesWritten: c, buffer: f });
      });
    });
  }, typeof n.writev == "function" && (e.writev = function(i, o, ...s) {
    return typeof s[s.length - 1] == "function" ? n.writev(i, o, ...s) : new Promise((a, l) => {
      n.writev(i, o, ...s, (h, c, f) => {
        if (h) return l(h);
        a({ bytesWritten: c, buffers: f });
      });
    });
  }), typeof n.realpath.native == "function" ? e.realpath.native = t(n.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(vn);
var Ws = {}, hu = {};
const bp = le;
hu.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(bp.parse(t).root, ""))) {
    const r = new Error(`Path contains invalid characters: ${t}`);
    throw r.code = "EINVAL", r;
  }
};
const pu = vn, { checkPath: mu } = hu, gu = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Ws.makeDir = async (e, t) => (mu(e), pu.mkdir(e, {
  mode: gu(t),
  recursive: !0
}));
Ws.makeDirSync = (e, t) => (mu(e), pu.mkdirSync(e, {
  mode: gu(t),
  recursive: !0
}));
const xp = Me.fromPromise, { makeDir: Sp, makeDirSync: Fo } = Ws, Lo = xp(Sp);
var Et = {
  mkdirs: Lo,
  mkdirsSync: Fo,
  // alias
  mkdirp: Lo,
  mkdirpSync: Fo,
  ensureDir: Lo,
  ensureDirSync: Fo
};
const Ap = Me.fromPromise, yu = vn;
function Tp(e) {
  return yu.access(e).then(() => !0).catch(() => !1);
}
var _n = {
  pathExists: Ap(Tp),
  pathExistsSync: yu.existsSync
};
const Hn = je;
function Cp(e, t, n, r) {
  Hn.open(e, "r+", (i, o) => {
    if (i) return r(i);
    Hn.futimes(o, t, n, (s) => {
      Hn.close(o, (a) => {
        r && r(s || a);
      });
    });
  });
}
function $p(e, t, n) {
  const r = Hn.openSync(e, "r+");
  return Hn.futimesSync(r, t, n), Hn.closeSync(r);
}
var Eu = {
  utimesMillis: Cp,
  utimesMillisSync: $p
};
const Wn = vn, Se = le, Ip = Jn;
function Op(e, t, n) {
  const r = n.dereference ? (i) => Wn.stat(i, { bigint: !0 }) : (i) => Wn.lstat(i, { bigint: !0 });
  return Promise.all([
    r(e),
    r(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function Rp(e, t, n) {
  let r;
  const i = n.dereference ? (s) => Wn.statSync(s, { bigint: !0 }) : (s) => Wn.lstatSync(s, { bigint: !0 }), o = i(e);
  try {
    r = i(t);
  } catch (s) {
    if (s.code === "ENOENT") return { srcStat: o, destStat: null };
    throw s;
  }
  return { srcStat: o, destStat: r };
}
function Dp(e, t, n, r, i) {
  Ip.callbackify(Op)(e, t, r, (o, s) => {
    if (o) return i(o);
    const { srcStat: a, destStat: l } = s;
    if (l) {
      if (Lr(a, l)) {
        const h = Se.basename(e), c = Se.basename(t);
        return n === "move" && h !== c && h.toLowerCase() === c.toLowerCase() ? i(null, { srcStat: a, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (a.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!a.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return a.isDirectory() && Vs(e, t) ? i(new Error(Wi(e, t, n))) : i(null, { srcStat: a, destStat: l });
  });
}
function Pp(e, t, n, r) {
  const { srcStat: i, destStat: o } = Rp(e, t, r);
  if (o) {
    if (Lr(i, o)) {
      const s = Se.basename(e), a = Se.basename(t);
      if (n === "move" && s !== a && s.toLowerCase() === a.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Vs(e, t))
    throw new Error(Wi(e, t, n));
  return { srcStat: i, destStat: o };
}
function wu(e, t, n, r, i) {
  const o = Se.resolve(Se.dirname(e)), s = Se.resolve(Se.dirname(n));
  if (s === o || s === Se.parse(s).root) return i();
  Wn.stat(s, { bigint: !0 }, (a, l) => a ? a.code === "ENOENT" ? i() : i(a) : Lr(t, l) ? i(new Error(Wi(e, n, r))) : wu(e, t, s, r, i));
}
function vu(e, t, n, r) {
  const i = Se.resolve(Se.dirname(e)), o = Se.resolve(Se.dirname(n));
  if (o === i || o === Se.parse(o).root) return;
  let s;
  try {
    s = Wn.statSync(o, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (Lr(t, s))
    throw new Error(Wi(e, n, r));
  return vu(e, t, o, r);
}
function Lr(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Vs(e, t) {
  const n = Se.resolve(e).split(Se.sep).filter((i) => i), r = Se.resolve(t).split(Se.sep).filter((i) => i);
  return n.reduce((i, o, s) => i && r[s] === o, !0);
}
function Wi(e, t, n) {
  return `Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Kn = {
  checkPaths: Dp,
  checkPathsSync: Pp,
  checkParentPaths: wu,
  checkParentPathsSync: vu,
  isSrcSubdir: Vs,
  areIdentical: Lr
};
const qe = je, wr = le, Np = Et.mkdirs, Fp = _n.pathExists, Lp = Eu.utimesMillis, vr = Kn;
function Up(e, t, n, r) {
  typeof n == "function" && !r ? (r = n, n = {}) : typeof n == "function" && (n = { filter: n }), r = r || function() {
  }, n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), vr.checkPaths(e, t, "copy", n, (i, o) => {
    if (i) return r(i);
    const { srcStat: s, destStat: a } = o;
    vr.checkParentPaths(e, s, t, "copy", (l) => l ? r(l) : n.filter ? _u(al, a, e, t, n, r) : al(a, e, t, n, r));
  });
}
function al(e, t, n, r, i) {
  const o = wr.dirname(n);
  Fp(o, (s, a) => {
    if (s) return i(s);
    if (a) return Di(e, t, n, r, i);
    Np(o, (l) => l ? i(l) : Di(e, t, n, r, i));
  });
}
function _u(e, t, n, r, i, o) {
  Promise.resolve(i.filter(n, r)).then((s) => s ? e(t, n, r, i, o) : o(), (s) => o(s));
}
function kp(e, t, n, r, i) {
  return r.filter ? _u(Di, e, t, n, r, i) : Di(e, t, n, r, i);
}
function Di(e, t, n, r, i) {
  (r.dereference ? qe.stat : qe.lstat)(t, (s, a) => s ? i(s) : a.isDirectory() ? zp(a, e, t, n, r, i) : a.isFile() || a.isCharacterDevice() || a.isBlockDevice() ? Mp(a, e, t, n, r, i) : a.isSymbolicLink() ? Yp(e, t, n, r, i) : a.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : a.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function Mp(e, t, n, r, i, o) {
  return t ? jp(e, n, r, i, o) : bu(e, n, r, i, o);
}
function jp(e, t, n, r, i) {
  if (r.overwrite)
    qe.unlink(n, (o) => o ? i(o) : bu(e, t, n, r, i));
  else return r.errorOnExist ? i(new Error(`'${n}' already exists`)) : i();
}
function bu(e, t, n, r, i) {
  qe.copyFile(t, n, (o) => o ? i(o) : r.preserveTimestamps ? Bp(e.mode, t, n, i) : Vi(n, e.mode, i));
}
function Bp(e, t, n, r) {
  return Hp(e) ? qp(n, e, (i) => i ? r(i) : ll(e, t, n, r)) : ll(e, t, n, r);
}
function Hp(e) {
  return (e & 128) === 0;
}
function qp(e, t, n) {
  return Vi(e, t | 128, n);
}
function ll(e, t, n, r) {
  Gp(t, n, (i) => i ? r(i) : Vi(n, e, r));
}
function Vi(e, t, n) {
  return qe.chmod(e, t, n);
}
function Gp(e, t, n) {
  qe.stat(e, (r, i) => r ? n(r) : Lp(t, i.atime, i.mtime, n));
}
function zp(e, t, n, r, i, o) {
  return t ? xu(n, r, i, o) : Wp(e.mode, n, r, i, o);
}
function Wp(e, t, n, r, i) {
  qe.mkdir(n, (o) => {
    if (o) return i(o);
    xu(t, n, r, (s) => s ? i(s) : Vi(n, e, i));
  });
}
function xu(e, t, n, r) {
  qe.readdir(e, (i, o) => i ? r(i) : Su(o, e, t, n, r));
}
function Su(e, t, n, r, i) {
  const o = e.pop();
  return o ? Vp(e, o, t, n, r, i) : i();
}
function Vp(e, t, n, r, i, o) {
  const s = wr.join(n, t), a = wr.join(r, t);
  vr.checkPaths(s, a, "copy", i, (l, h) => {
    if (l) return o(l);
    const { destStat: c } = h;
    kp(c, s, a, i, (f) => f ? o(f) : Su(e, n, r, i, o));
  });
}
function Yp(e, t, n, r, i) {
  qe.readlink(t, (o, s) => {
    if (o) return i(o);
    if (r.dereference && (s = wr.resolve(process.cwd(), s)), e)
      qe.readlink(n, (a, l) => a ? a.code === "EINVAL" || a.code === "UNKNOWN" ? qe.symlink(s, n, i) : i(a) : (r.dereference && (l = wr.resolve(process.cwd(), l)), vr.isSrcSubdir(s, l) ? i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && vr.isSrcSubdir(l, s) ? i(new Error(`Cannot overwrite '${l}' with '${s}'.`)) : Xp(s, n, i)));
    else
      return qe.symlink(s, n, i);
  });
}
function Xp(e, t, n) {
  qe.unlink(t, (r) => r ? n(r) : qe.symlink(e, t, n));
}
var Jp = Up;
const Ne = je, _r = le, Kp = Et.mkdirsSync, Qp = Eu.utimesMillisSync, br = Kn;
function Zp(e, t, n) {
  typeof n == "function" && (n = { filter: n }), n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: r, destStat: i } = br.checkPathsSync(e, t, "copy", n);
  return br.checkParentPathsSync(e, r, t, "copy"), em(i, e, t, n);
}
function em(e, t, n, r) {
  if (r.filter && !r.filter(t, n)) return;
  const i = _r.dirname(n);
  return Ne.existsSync(i) || Kp(i), Au(e, t, n, r);
}
function tm(e, t, n, r) {
  if (!(r.filter && !r.filter(t, n)))
    return Au(e, t, n, r);
}
function Au(e, t, n, r) {
  const o = (r.dereference ? Ne.statSync : Ne.lstatSync)(t);
  if (o.isDirectory()) return lm(o, e, t, n, r);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return nm(o, e, t, n, r);
  if (o.isSymbolicLink()) return fm(e, t, n, r);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function nm(e, t, n, r, i) {
  return t ? rm(e, n, r, i) : Tu(e, n, r, i);
}
function rm(e, t, n, r) {
  if (r.overwrite)
    return Ne.unlinkSync(n), Tu(e, t, n, r);
  if (r.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
function Tu(e, t, n, r) {
  return Ne.copyFileSync(t, n), r.preserveTimestamps && im(e.mode, t, n), Ys(n, e.mode);
}
function im(e, t, n) {
  return om(e) && sm(n, e), am(t, n);
}
function om(e) {
  return (e & 128) === 0;
}
function sm(e, t) {
  return Ys(e, t | 128);
}
function Ys(e, t) {
  return Ne.chmodSync(e, t);
}
function am(e, t) {
  const n = Ne.statSync(e);
  return Qp(t, n.atime, n.mtime);
}
function lm(e, t, n, r, i) {
  return t ? Cu(n, r, i) : cm(e.mode, n, r, i);
}
function cm(e, t, n, r) {
  return Ne.mkdirSync(n), Cu(t, n, r), Ys(n, e);
}
function Cu(e, t, n) {
  Ne.readdirSync(e).forEach((r) => um(r, e, t, n));
}
function um(e, t, n, r) {
  const i = _r.join(t, e), o = _r.join(n, e), { destStat: s } = br.checkPathsSync(i, o, "copy", r);
  return tm(s, i, o, r);
}
function fm(e, t, n, r) {
  let i = Ne.readlinkSync(t);
  if (r.dereference && (i = _r.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = Ne.readlinkSync(n);
    } catch (s) {
      if (s.code === "EINVAL" || s.code === "UNKNOWN") return Ne.symlinkSync(i, n);
      throw s;
    }
    if (r.dereference && (o = _r.resolve(process.cwd(), o)), br.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (Ne.statSync(n).isDirectory() && br.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return dm(i, n);
  } else
    return Ne.symlinkSync(i, n);
}
function dm(e, t) {
  return Ne.unlinkSync(t), Ne.symlinkSync(e, t);
}
var hm = Zp;
const pm = Me.fromCallback;
var Xs = {
  copy: pm(Jp),
  copySync: hm
};
const cl = je, $u = le, se = cu, xr = process.platform === "win32";
function Iu(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((n) => {
    e[n] = e[n] || cl[n], n = n + "Sync", e[n] = e[n] || cl[n];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function Js(e, t, n) {
  let r = 0;
  typeof t == "function" && (n = t, t = {}), se(e, "rimraf: missing path"), se.strictEqual(typeof e, "string", "rimraf: path should be a string"), se.strictEqual(typeof n, "function", "rimraf: callback function required"), se(t, "rimraf: invalid options argument provided"), se.strictEqual(typeof t, "object", "rimraf: options should be object"), Iu(t), ul(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && r < t.maxBusyTries) {
        r++;
        const s = r * 100;
        return setTimeout(() => ul(e, t, i), s);
      }
      o.code === "ENOENT" && (o = null);
    }
    n(o);
  });
}
function ul(e, t, n) {
  se(e), se(t), se(typeof n == "function"), t.lstat(e, (r, i) => {
    if (r && r.code === "ENOENT")
      return n(null);
    if (r && r.code === "EPERM" && xr)
      return fl(e, t, r, n);
    if (i && i.isDirectory())
      return Si(e, t, r, n);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return n(null);
        if (o.code === "EPERM")
          return xr ? fl(e, t, o, n) : Si(e, t, o, n);
        if (o.code === "EISDIR")
          return Si(e, t, o, n);
      }
      return n(o);
    });
  });
}
function fl(e, t, n, r) {
  se(e), se(t), se(typeof r == "function"), t.chmod(e, 438, (i) => {
    i ? r(i.code === "ENOENT" ? null : n) : t.stat(e, (o, s) => {
      o ? r(o.code === "ENOENT" ? null : n) : s.isDirectory() ? Si(e, t, n, r) : t.unlink(e, r);
    });
  });
}
function dl(e, t, n) {
  let r;
  se(e), se(t);
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
  r.isDirectory() ? Ai(e, t, n) : t.unlinkSync(e);
}
function Si(e, t, n, r) {
  se(e), se(t), se(typeof r == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? mm(e, t, r) : i && i.code === "ENOTDIR" ? r(n) : r(i);
  });
}
function mm(e, t, n) {
  se(e), se(t), se(typeof n == "function"), t.readdir(e, (r, i) => {
    if (r) return n(r);
    let o = i.length, s;
    if (o === 0) return t.rmdir(e, n);
    i.forEach((a) => {
      Js($u.join(e, a), t, (l) => {
        if (!s) {
          if (l) return n(s = l);
          --o === 0 && t.rmdir(e, n);
        }
      });
    });
  });
}
function Ou(e, t) {
  let n;
  t = t || {}, Iu(t), se(e, "rimraf: missing path"), se.strictEqual(typeof e, "string", "rimraf: path should be a string"), se(t, "rimraf: missing options"), se.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    n = t.lstatSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    r.code === "EPERM" && xr && dl(e, t, r);
  }
  try {
    n && n.isDirectory() ? Ai(e, t, null) : t.unlinkSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    if (r.code === "EPERM")
      return xr ? dl(e, t, r) : Ai(e, t, r);
    if (r.code !== "EISDIR")
      throw r;
    Ai(e, t, r);
  }
}
function Ai(e, t, n) {
  se(e), se(t);
  try {
    t.rmdirSync(e);
  } catch (r) {
    if (r.code === "ENOTDIR")
      throw n;
    if (r.code === "ENOTEMPTY" || r.code === "EEXIST" || r.code === "EPERM")
      gm(e, t);
    else if (r.code !== "ENOENT")
      throw r;
  }
}
function gm(e, t) {
  if (se(e), se(t), t.readdirSync(e).forEach((n) => Ou($u.join(e, n), t)), xr) {
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
var ym = Js;
Js.sync = Ou;
const Pi = je, Em = Me.fromCallback, Ru = ym;
function wm(e, t) {
  if (Pi.rm) return Pi.rm(e, { recursive: !0, force: !0 }, t);
  Ru(e, t);
}
function vm(e) {
  if (Pi.rmSync) return Pi.rmSync(e, { recursive: !0, force: !0 });
  Ru.sync(e);
}
var Yi = {
  remove: Em(wm),
  removeSync: vm
};
const _m = Me.fromPromise, Du = vn, Pu = le, Nu = Et, Fu = Yi, hl = _m(async function(t) {
  let n;
  try {
    n = await Du.readdir(t);
  } catch {
    return Nu.mkdirs(t);
  }
  return Promise.all(n.map((r) => Fu.remove(Pu.join(t, r))));
});
function pl(e) {
  let t;
  try {
    t = Du.readdirSync(e);
  } catch {
    return Nu.mkdirsSync(e);
  }
  t.forEach((n) => {
    n = Pu.join(e, n), Fu.removeSync(n);
  });
}
var bm = {
  emptyDirSync: pl,
  emptydirSync: pl,
  emptyDir: hl,
  emptydir: hl
};
const xm = Me.fromCallback, Lu = le, Bt = je, Uu = Et;
function Sm(e, t) {
  function n() {
    Bt.writeFile(e, "", (r) => {
      if (r) return t(r);
      t();
    });
  }
  Bt.stat(e, (r, i) => {
    if (!r && i.isFile()) return t();
    const o = Lu.dirname(e);
    Bt.stat(o, (s, a) => {
      if (s)
        return s.code === "ENOENT" ? Uu.mkdirs(o, (l) => {
          if (l) return t(l);
          n();
        }) : t(s);
      a.isDirectory() ? n() : Bt.readdir(o, (l) => {
        if (l) return t(l);
      });
    });
  });
}
function Am(e) {
  let t;
  try {
    t = Bt.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const n = Lu.dirname(e);
  try {
    Bt.statSync(n).isDirectory() || Bt.readdirSync(n);
  } catch (r) {
    if (r && r.code === "ENOENT") Uu.mkdirsSync(n);
    else throw r;
  }
  Bt.writeFileSync(e, "");
}
var Tm = {
  createFile: xm(Sm),
  createFileSync: Am
};
const Cm = Me.fromCallback, ku = le, jt = je, Mu = Et, $m = _n.pathExists, { areIdentical: ju } = Kn;
function Im(e, t, n) {
  function r(i, o) {
    jt.link(i, o, (s) => {
      if (s) return n(s);
      n(null);
    });
  }
  jt.lstat(t, (i, o) => {
    jt.lstat(e, (s, a) => {
      if (s)
        return s.message = s.message.replace("lstat", "ensureLink"), n(s);
      if (o && ju(a, o)) return n(null);
      const l = ku.dirname(t);
      $m(l, (h, c) => {
        if (h) return n(h);
        if (c) return r(e, t);
        Mu.mkdirs(l, (f) => {
          if (f) return n(f);
          r(e, t);
        });
      });
    });
  });
}
function Om(e, t) {
  let n;
  try {
    n = jt.lstatSync(t);
  } catch {
  }
  try {
    const o = jt.lstatSync(e);
    if (n && ju(o, n)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const r = ku.dirname(t);
  return jt.existsSync(r) || Mu.mkdirsSync(r), jt.linkSync(e, t);
}
var Rm = {
  createLink: Cm(Im),
  createLinkSync: Om
};
const Ht = le, mr = je, Dm = _n.pathExists;
function Pm(e, t, n) {
  if (Ht.isAbsolute(e))
    return mr.lstat(e, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), n(r)) : n(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const r = Ht.dirname(t), i = Ht.join(r, e);
    return Dm(i, (o, s) => o ? n(o) : s ? n(null, {
      toCwd: i,
      toDst: e
    }) : mr.lstat(e, (a) => a ? (a.message = a.message.replace("lstat", "ensureSymlink"), n(a)) : n(null, {
      toCwd: e,
      toDst: Ht.relative(r, e)
    })));
  }
}
function Nm(e, t) {
  let n;
  if (Ht.isAbsolute(e)) {
    if (n = mr.existsSync(e), !n) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const r = Ht.dirname(t), i = Ht.join(r, e);
    if (n = mr.existsSync(i), n)
      return {
        toCwd: i,
        toDst: e
      };
    if (n = mr.existsSync(e), !n) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: Ht.relative(r, e)
    };
  }
}
var Fm = {
  symlinkPaths: Pm,
  symlinkPathsSync: Nm
};
const Bu = je;
function Lm(e, t, n) {
  if (n = typeof t == "function" ? t : n, t = typeof t == "function" ? !1 : t, t) return n(null, t);
  Bu.lstat(e, (r, i) => {
    if (r) return n(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", n(null, t);
  });
}
function Um(e, t) {
  let n;
  if (t) return t;
  try {
    n = Bu.lstatSync(e);
  } catch {
    return "file";
  }
  return n && n.isDirectory() ? "dir" : "file";
}
var km = {
  symlinkType: Lm,
  symlinkTypeSync: Um
};
const Mm = Me.fromCallback, Hu = le, it = vn, qu = Et, jm = qu.mkdirs, Bm = qu.mkdirsSync, Gu = Fm, Hm = Gu.symlinkPaths, qm = Gu.symlinkPathsSync, zu = km, Gm = zu.symlinkType, zm = zu.symlinkTypeSync, Wm = _n.pathExists, { areIdentical: Wu } = Kn;
function Vm(e, t, n, r) {
  r = typeof n == "function" ? n : r, n = typeof n == "function" ? !1 : n, it.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      it.stat(e),
      it.stat(t)
    ]).then(([s, a]) => {
      if (Wu(s, a)) return r(null);
      ml(e, t, n, r);
    }) : ml(e, t, n, r);
  });
}
function ml(e, t, n, r) {
  Hm(e, t, (i, o) => {
    if (i) return r(i);
    e = o.toDst, Gm(o.toCwd, n, (s, a) => {
      if (s) return r(s);
      const l = Hu.dirname(t);
      Wm(l, (h, c) => {
        if (h) return r(h);
        if (c) return it.symlink(e, t, a, r);
        jm(l, (f) => {
          if (f) return r(f);
          it.symlink(e, t, a, r);
        });
      });
    });
  });
}
function Ym(e, t, n) {
  let r;
  try {
    r = it.lstatSync(t);
  } catch {
  }
  if (r && r.isSymbolicLink()) {
    const a = it.statSync(e), l = it.statSync(t);
    if (Wu(a, l)) return;
  }
  const i = qm(e, t);
  e = i.toDst, n = zm(i.toCwd, n);
  const o = Hu.dirname(t);
  return it.existsSync(o) || Bm(o), it.symlinkSync(e, t, n);
}
var Xm = {
  createSymlink: Mm(Vm),
  createSymlinkSync: Ym
};
const { createFile: gl, createFileSync: yl } = Tm, { createLink: El, createLinkSync: wl } = Rm, { createSymlink: vl, createSymlinkSync: _l } = Xm;
var Jm = {
  // file
  createFile: gl,
  createFileSync: yl,
  ensureFile: gl,
  ensureFileSync: yl,
  // link
  createLink: El,
  createLinkSync: wl,
  ensureLink: El,
  ensureLinkSync: wl,
  // symlink
  createSymlink: vl,
  createSymlinkSync: _l,
  ensureSymlink: vl,
  ensureSymlinkSync: _l
};
function Km(e, { EOL: t = `
`, finalEOL: n = !0, replacer: r = null, spaces: i } = {}) {
  const o = n ? t : "", s = JSON.stringify(e, r, i);
  if (s === void 0)
    throw new TypeError(`Converting ${typeof e} value to JSON is not supported`);
  return s.replace(/\n/g, t) + o;
}
function Qm(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var Ks = { stringify: Km, stripBom: Qm };
let Vn;
try {
  Vn = je;
} catch {
  Vn = st;
}
const Xi = Me, { stringify: Vu, stripBom: Yu } = Ks;
async function Zm(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || Vn, r = "throws" in t ? t.throws : !0;
  let i = await Xi.fromCallback(n.readFile)(e, t);
  i = Yu(i);
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
const e0 = Xi.fromPromise(Zm);
function t0(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || Vn, r = "throws" in t ? t.throws : !0;
  try {
    let i = n.readFileSync(e, t);
    return i = Yu(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (r)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function n0(e, t, n = {}) {
  const r = n.fs || Vn, i = Vu(t, n);
  await Xi.fromCallback(r.writeFile)(e, i, n);
}
const r0 = Xi.fromPromise(n0);
function i0(e, t, n = {}) {
  const r = n.fs || Vn, i = Vu(t, n);
  return r.writeFileSync(e, i, n);
}
var o0 = {
  readFile: e0,
  readFileSync: t0,
  writeFile: r0,
  writeFileSync: i0
};
const ai = o0;
var s0 = {
  // jsonfile exports
  readJson: ai.readFile,
  readJsonSync: ai.readFileSync,
  writeJson: ai.writeFile,
  writeJsonSync: ai.writeFileSync
};
const a0 = Me.fromCallback, gr = je, Xu = le, Ju = Et, l0 = _n.pathExists;
function c0(e, t, n, r) {
  typeof n == "function" && (r = n, n = "utf8");
  const i = Xu.dirname(e);
  l0(i, (o, s) => {
    if (o) return r(o);
    if (s) return gr.writeFile(e, t, n, r);
    Ju.mkdirs(i, (a) => {
      if (a) return r(a);
      gr.writeFile(e, t, n, r);
    });
  });
}
function u0(e, ...t) {
  const n = Xu.dirname(e);
  if (gr.existsSync(n))
    return gr.writeFileSync(e, ...t);
  Ju.mkdirsSync(n), gr.writeFileSync(e, ...t);
}
var Qs = {
  outputFile: a0(c0),
  outputFileSync: u0
};
const { stringify: f0 } = Ks, { outputFile: d0 } = Qs;
async function h0(e, t, n = {}) {
  const r = f0(t, n);
  await d0(e, r, n);
}
var p0 = h0;
const { stringify: m0 } = Ks, { outputFileSync: g0 } = Qs;
function y0(e, t, n) {
  const r = m0(t, n);
  g0(e, r, n);
}
var E0 = y0;
const w0 = Me.fromPromise, ke = s0;
ke.outputJson = w0(p0);
ke.outputJsonSync = E0;
ke.outputJSON = ke.outputJson;
ke.outputJSONSync = ke.outputJsonSync;
ke.writeJSON = ke.writeJson;
ke.writeJSONSync = ke.writeJsonSync;
ke.readJSON = ke.readJson;
ke.readJSONSync = ke.readJsonSync;
var v0 = ke;
const _0 = je, vs = le, b0 = Xs.copy, Ku = Yi.remove, x0 = Et.mkdirp, S0 = _n.pathExists, bl = Kn;
function A0(e, t, n, r) {
  typeof n == "function" && (r = n, n = {}), n = n || {};
  const i = n.overwrite || n.clobber || !1;
  bl.checkPaths(e, t, "move", n, (o, s) => {
    if (o) return r(o);
    const { srcStat: a, isChangingCase: l = !1 } = s;
    bl.checkParentPaths(e, a, t, "move", (h) => {
      if (h) return r(h);
      if (T0(t)) return xl(e, t, i, l, r);
      x0(vs.dirname(t), (c) => c ? r(c) : xl(e, t, i, l, r));
    });
  });
}
function T0(e) {
  const t = vs.dirname(e);
  return vs.parse(t).root === t;
}
function xl(e, t, n, r, i) {
  if (r) return Uo(e, t, n, i);
  if (n)
    return Ku(t, (o) => o ? i(o) : Uo(e, t, n, i));
  S0(t, (o, s) => o ? i(o) : s ? i(new Error("dest already exists.")) : Uo(e, t, n, i));
}
function Uo(e, t, n, r) {
  _0.rename(e, t, (i) => i ? i.code !== "EXDEV" ? r(i) : C0(e, t, n, r) : r());
}
function C0(e, t, n, r) {
  b0(e, t, {
    overwrite: n,
    errorOnExist: !0
  }, (o) => o ? r(o) : Ku(e, r));
}
var $0 = A0;
const Qu = je, _s = le, I0 = Xs.copySync, Zu = Yi.removeSync, O0 = Et.mkdirpSync, Sl = Kn;
function R0(e, t, n) {
  n = n || {};
  const r = n.overwrite || n.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = Sl.checkPathsSync(e, t, "move", n);
  return Sl.checkParentPathsSync(e, i, t, "move"), D0(t) || O0(_s.dirname(t)), P0(e, t, r, o);
}
function D0(e) {
  const t = _s.dirname(e);
  return _s.parse(t).root === t;
}
function P0(e, t, n, r) {
  if (r) return ko(e, t, n);
  if (n)
    return Zu(t), ko(e, t, n);
  if (Qu.existsSync(t)) throw new Error("dest already exists.");
  return ko(e, t, n);
}
function ko(e, t, n) {
  try {
    Qu.renameSync(e, t);
  } catch (r) {
    if (r.code !== "EXDEV") throw r;
    return N0(e, t, n);
  }
}
function N0(e, t, n) {
  return I0(e, t, {
    overwrite: n,
    errorOnExist: !0
  }), Zu(e);
}
var F0 = R0;
const L0 = Me.fromCallback;
var U0 = {
  move: L0($0),
  moveSync: F0
}, Kt = {
  // Export promiseified graceful-fs:
  ...vn,
  // Export extra methods:
  ...Xs,
  ...bm,
  ...Jm,
  ...v0,
  ...Et,
  ...U0,
  ...Qs,
  ..._n,
  ...Yi
}, bn = {}, zt = {}, _e = {}, Wt = {};
Object.defineProperty(Wt, "__esModule", { value: !0 });
Wt.CancellationError = Wt.CancellationToken = void 0;
const k0 = Gi;
class M0 extends k0.EventEmitter {
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
      return Promise.reject(new bs());
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
          o(new bs());
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
Wt.CancellationToken = M0;
class bs extends Error {
  constructor() {
    super("cancelled");
  }
}
Wt.CancellationError = bs;
var Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.newError = j0;
function j0(e, t) {
  const n = new Error(e);
  return n.code = t, n;
}
var ve = {}, xs = { exports: {} }, li = { exports: {} }, Mo, Al;
function B0() {
  if (Al) return Mo;
  Al = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, i = r * 7, o = r * 365.25;
  Mo = function(c, f) {
    f = f || {};
    var p = typeof c;
    if (p === "string" && c.length > 0)
      return s(c);
    if (p === "number" && isFinite(c))
      return f.long ? l(c) : a(c);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(c)
    );
  };
  function s(c) {
    if (c = String(c), !(c.length > 100)) {
      var f = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        c
      );
      if (f) {
        var p = parseFloat(f[1]), g = (f[2] || "ms").toLowerCase();
        switch (g) {
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
    var f = Math.abs(c);
    return f >= r ? Math.round(c / r) + "d" : f >= n ? Math.round(c / n) + "h" : f >= t ? Math.round(c / t) + "m" : f >= e ? Math.round(c / e) + "s" : c + "ms";
  }
  function l(c) {
    var f = Math.abs(c);
    return f >= r ? h(c, f, r, "day") : f >= n ? h(c, f, n, "hour") : f >= t ? h(c, f, t, "minute") : f >= e ? h(c, f, e, "second") : c + " ms";
  }
  function h(c, f, p, g) {
    var w = f >= p * 1.5;
    return Math.round(c / p) + " " + g + (w ? "s" : "");
  }
  return Mo;
}
var jo, Tl;
function ef() {
  if (Tl) return jo;
  Tl = 1;
  function e(t) {
    r.debug = r, r.default = r, r.coerce = h, r.disable = a, r.enable = o, r.enabled = l, r.humanize = B0(), r.destroy = c, Object.keys(t).forEach((f) => {
      r[f] = t[f];
    }), r.names = [], r.skips = [], r.formatters = {};
    function n(f) {
      let p = 0;
      for (let g = 0; g < f.length; g++)
        p = (p << 5) - p + f.charCodeAt(g), p |= 0;
      return r.colors[Math.abs(p) % r.colors.length];
    }
    r.selectColor = n;
    function r(f) {
      let p, g = null, w, y;
      function E(...x) {
        if (!E.enabled)
          return;
        const T = E, N = Number(/* @__PURE__ */ new Date()), k = N - (p || N);
        T.diff = k, T.prev = p, T.curr = N, p = N, x[0] = r.coerce(x[0]), typeof x[0] != "string" && x.unshift("%O");
        let W = 0;
        x[0] = x[0].replace(/%([a-zA-Z%])/g, (Q, ne) => {
          if (Q === "%%")
            return "%";
          W++;
          const q = r.formatters[ne];
          if (typeof q == "function") {
            const v = x[W];
            Q = q.call(T, v), x.splice(W, 1), W--;
          }
          return Q;
        }), r.formatArgs.call(T, x), (T.log || r.log).apply(T, x);
      }
      return E.namespace = f, E.useColors = r.useColors(), E.color = r.selectColor(f), E.extend = i, E.destroy = r.destroy, Object.defineProperty(E, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => g !== null ? g : (w !== r.namespaces && (w = r.namespaces, y = r.enabled(f)), y),
        set: (x) => {
          g = x;
        }
      }), typeof r.init == "function" && r.init(E), E;
    }
    function i(f, p) {
      const g = r(this.namespace + (typeof p > "u" ? ":" : p) + f);
      return g.log = this.log, g;
    }
    function o(f) {
      r.save(f), r.namespaces = f, r.names = [], r.skips = [];
      const p = (typeof f == "string" ? f : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const g of p)
        g[0] === "-" ? r.skips.push(g.slice(1)) : r.names.push(g);
    }
    function s(f, p) {
      let g = 0, w = 0, y = -1, E = 0;
      for (; g < f.length; )
        if (w < p.length && (p[w] === f[g] || p[w] === "*"))
          p[w] === "*" ? (y = w, E = g, w++) : (g++, w++);
        else if (y !== -1)
          w = y + 1, E++, g = E;
        else
          return !1;
      for (; w < p.length && p[w] === "*"; )
        w++;
      return w === p.length;
    }
    function a() {
      const f = [
        ...r.names,
        ...r.skips.map((p) => "-" + p)
      ].join(",");
      return r.enable(""), f;
    }
    function l(f) {
      for (const p of r.skips)
        if (s(f, p))
          return !1;
      for (const p of r.names)
        if (s(f, p))
          return !0;
      return !1;
    }
    function h(f) {
      return f instanceof Error ? f.stack || f.message : f;
    }
    function c() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  return jo = e, jo;
}
var Cl;
function H0() {
  return Cl || (Cl = 1, function(e, t) {
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
      let c = 0, f = 0;
      l[0].replace(/%[a-zA-Z%]/g, (p) => {
        p !== "%%" && (c++, p === "%c" && (f = c));
      }), l.splice(f, 0, h);
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
    e.exports = ef()(t);
    const { formatters: a } = e.exports;
    a.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (h) {
        return "[UnexpectedJSONParseError]: " + h.message;
      }
    };
  }(li, li.exports)), li.exports;
}
var ci = { exports: {} }, Bo, $l;
function q0() {
  return $l || ($l = 1, Bo = (e, t = process.argv) => {
    const n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", r = t.indexOf(n + e), i = t.indexOf("--");
    return r !== -1 && (i === -1 || r < i);
  }), Bo;
}
var Ho, Il;
function G0() {
  if (Il) return Ho;
  Il = 1;
  const e = zi, t = uu, n = q0(), { env: r } = process;
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
      const f = e.release().split(".");
      return Number(f[0]) >= 10 && Number(f[2]) >= 10586 ? Number(f[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in r)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((f) => f in r) || r.CI_NAME === "codeship" ? 1 : c;
    if ("TEAMCITY_VERSION" in r)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(r.TEAMCITY_VERSION) ? 1 : 0;
    if (r.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in r) {
      const f = parseInt((r.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (r.TERM_PROGRAM) {
        case "iTerm.app":
          return f >= 3 ? 3 : 2;
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
  return Ho = {
    supportsColor: a,
    stdout: o(s(!0, t.isatty(1))),
    stderr: o(s(!0, t.isatty(2)))
  }, Ho;
}
var Ol;
function z0() {
  return Ol || (Ol = 1, function(e, t) {
    const n = uu, r = Jn;
    t.init = c, t.log = a, t.formatArgs = o, t.save = l, t.load = h, t.useColors = i, t.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const p = G0();
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
    t.inspectOpts = Object.keys(process.env).filter((p) => /^debug_/i.test(p)).reduce((p, g) => {
      const w = g.substring(6).toLowerCase().replace(/_([a-z])/g, (E, x) => x.toUpperCase());
      let y = process.env[g];
      return /^(yes|on|true|enabled)$/i.test(y) ? y = !0 : /^(no|off|false|disabled)$/i.test(y) ? y = !1 : y === "null" ? y = null : y = Number(y), p[w] = y, p;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function o(p) {
      const { namespace: g, useColors: w } = this;
      if (w) {
        const y = this.color, E = "\x1B[3" + (y < 8 ? y : "8;5;" + y), x = `  ${E};1m${g} \x1B[0m`;
        p[0] = x + p[0].split(`
`).join(`
` + x), p.push(E + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        p[0] = s() + g + " " + p[0];
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
      const g = Object.keys(t.inspectOpts);
      for (let w = 0; w < g.length; w++)
        p.inspectOpts[g[w]] = t.inspectOpts[g[w]];
    }
    e.exports = ef()(t);
    const { formatters: f } = e.exports;
    f.o = function(p) {
      return this.inspectOpts.colors = this.useColors, r.inspect(p, this.inspectOpts).split(`
`).map((g) => g.trim()).join(" ");
    }, f.O = function(p) {
      return this.inspectOpts.colors = this.useColors, r.inspect(p, this.inspectOpts);
    };
  }(ci, ci.exports)), ci.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? xs.exports = H0() : xs.exports = z0();
var tf = xs.exports, Ur = {};
Object.defineProperty(Ur, "__esModule", { value: !0 });
Ur.ProgressCallbackTransform = void 0;
const W0 = at;
class V0 extends W0.Transform {
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
Ur.ProgressCallbackTransform = V0;
Object.defineProperty(ve, "__esModule", { value: !0 });
ve.DigestTransform = ve.HttpExecutor = ve.HttpError = void 0;
ve.addSensitiveRedirectHeader = eg;
ve.addSensitiveFieldPattern = tg;
ve.createHttpError = As;
ve.parseJson = rg;
ve.configureRequestOptionsFromUrl = af;
ve.configureRequestUrl = ta;
ve.safeGetHeader = qn;
ve.configureRequestOptions = Ni;
ve.isSensitiveFieldName = lf;
ve.hashSensitiveValue = cf;
ve.safeStringifyJson = Fn;
const nf = Fr, Y0 = tf, X0 = st, J0 = at, Ss = Jt, K0 = Wt, Rl = Qn, Q0 = Ur, Ft = (0, Y0.default)("electron-builder"), Zs = (e) => e.toLowerCase().replace(/[-_]/g, ""), rf = /* @__PURE__ */ new Set(["authorization", "proxyauthorization", "privatetoken", "xapikey", "xauthtoken", "xaccesstoken", "xgitlabtoken", "cookie", "xcsrftoken"]), of = ["token", "password", "secret", "authorization", "credential", "apikey", "passphrase", "auth"], Z0 = ["key"];
function eg(e) {
  rf.add(Zs(e));
}
function tg(e) {
  of.push(e.toLowerCase().replace(/[-_]/g, ""));
}
function As(e, t = null) {
  return new ea(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + Fn(e.headers), t);
}
const ng = /* @__PURE__ */ new Map([
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
class ea extends Error {
  constructor(t, n = `HTTP error: ${ng.get(t) || t}`, r = null) {
    super(n), this.statusCode = t, this.description = r, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
ve.HttpError = ea;
function rg(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class Nn {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, n = new K0.CancellationToken(), r) {
    Ni(t);
    const i = r == null ? void 0 : JSON.stringify(r), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      Ft.enabled && Ft(Fn(r));
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
    if (Ft.enabled) {
      const { headers: o, auth: s, ...a } = t;
      Ft(`Request: ${Fn(a)}`);
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
    if (Ft.enabled) {
      const { headers: g, auth: w, ...y } = n;
      Ft(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${Fn(y)}`);
    }
    if (t.statusCode === 404) {
      o(As(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const h = (l = t.statusCode) !== null && l !== void 0 ? l : 0, c = h >= 300 && h < 400, f = qn(t, "location");
    if (c && f != null) {
      if (s > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(Nn.prepareRedirectUrlOptions(f, n), r, a, s).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let p = "";
    t.on("error", o), t.on("data", (g) => p += g), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const g = qn(t, "content-type"), w = g != null && (Array.isArray(g) ? g.find((y) => y.includes("json")) != null : g.includes("json"));
          o(As(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

          Data:
          ${w ? Fn(JSON.parse(p)) : p}
          `));
        } else
          i(p.length === 0 ? null : p);
      } catch (g) {
        o(g);
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
      ta(t, a), Ni(a), this.doDownload(a, {
        destination: null,
        options: n,
        onCancel: o,
        callback: (l) => {
          l == null ? r(Buffer.concat(s)) : i(l);
        },
        responseHandler: (l, h) => {
          let c = 0;
          l.on("data", (f) => {
            if (c += f.length, c > 524288e3) {
              h(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            s.push(f);
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
      const s = qn(o, "location");
      if (s != null) {
        r < this.maxRedirects ? this.doDownload(Nn.prepareRedirectUrlOptions(s, t), n, r++) : n.callback(this.createMaxRedirectError());
        return;
      }
      n.responseHandler == null ? og(n, o) : n.responseHandler(o, n.callback);
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
    const r = af(t, { ...n }), i = r.headers;
    if (i == null)
      return r;
    const o = Nn.reconstructOriginalUrl(n), s = sf(t, n);
    if (Nn.isCrossOriginRedirect(o, s)) {
      Ft.enabled && Ft(`Cross-origin redirect (${o.host} → ${s.host}): stripping sensitive headers`);
      for (const a of Object.keys(i))
        rf.has(Zs(a)) && delete i[a];
    }
    return r;
  }
  static reconstructOriginalUrl(t) {
    const n = t.protocol || "https:";
    if (!t.hostname)
      throw new Error("Missing hostname in request options");
    const r = t.hostname, i = t.port ? `:${t.port}` : "", o = t.path || "/";
    return new Ss.URL(`${n}//${r}${i}${o}`);
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
        if (r < n && (i instanceof ea && i.isServerError() || i.code === "EPIPE")) {
          await new Promise((o) => setTimeout(o, 1e3 * (r + 1)));
          continue;
        }
        throw i;
      }
  }
}
ve.HttpExecutor = Nn;
function sf(e, t) {
  try {
    return new Ss.URL(e);
  } catch {
    const n = t.hostname, r = t.protocol || "https:", i = t.port ? `:${t.port}` : "", o = `${r}//${n}${i}`;
    return new Ss.URL(e, o);
  }
}
function af(e, t) {
  const n = Ni(t), r = sf(e, t);
  return ta(r, n), n;
}
function ta(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Ts extends J0.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, n = "sha512", r = "base64") {
    super(), this.expected = t, this.algorithm = n, this.encoding = r, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, nf.createHash)(n);
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
      throw (0, Rl.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, Rl.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
ve.DigestTransform = Ts;
function ig(e, t, n) {
  return e != null && t != null && e !== t ? (n(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function qn(e, t) {
  const n = e.headers[t];
  return n == null ? null : Array.isArray(n) ? n.length === 0 ? null : n[n.length - 1] : n;
}
function og(e, t) {
  if (!ig(qn(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const n = [];
  if (e.options.onProgress != null) {
    const s = qn(t, "content-length");
    s != null && n.push(new Q0.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const r = e.options.sha512;
  r != null ? n.push(new Ts(r, "sha512", r.length === 128 && !r.includes("+") && !r.includes("Z") && !r.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && n.push(new Ts(e.options.sha2, "sha256", "hex"));
  const i = (0, X0.createWriteStream)(e.destination);
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
function Ni(e, t, n) {
  n != null && (e.method = n), e.headers = { ...e.headers };
  const r = e.headers;
  return t != null && (r.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), r["User-Agent"] == null && (r["User-Agent"] = "electron-builder"), (n == null || n === "GET" || r["Cache-Control"] == null) && (r["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function lf(e) {
  const t = Zs(e);
  return of.some((n) => t.includes(n)) || Z0.some((n) => t.endsWith(n));
}
function cf(e) {
  return `${(0, nf.createHash)("sha256").update(e).digest("hex")} (sha256 hash)`;
}
function Fn(e, t) {
  return JSON.stringify(e, (n, r) => lf(n) || t != null && t.has(n) ? typeof r == "string" ? cf(r) : "<stripped sensitive data>" : r, 2);
}
var Ji = {};
Object.defineProperty(Ji, "__esModule", { value: !0 });
Ji.MemoLazy = void 0;
class sg {
  constructor(t, n) {
    this.selector = t, this.creator = n, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && uf(this.selected, t))
      return this._value;
    this.selected = t;
    const n = this.creator(t);
    return this.value = n, n;
  }
  set value(t) {
    this._value = t;
  }
}
Ji.MemoLazy = sg;
function uf(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((s) => uf(e[s], t[s]));
  }
  return e === t;
}
var kr = {};
Object.defineProperty(kr, "__esModule", { value: !0 });
kr.githubUrl = ag;
kr.githubTagPrefix = lg;
kr.getS3LikeProviderBaseUrl = cg;
function ag(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function lg(e) {
  var t;
  return e.tagNamePrefix ? e.tagNamePrefix : !((t = e.vPrefixedTagName) !== null && t !== void 0) || t ? "v" : "";
}
function cg(e) {
  const t = e.provider;
  if (t === "s3")
    return ug(e);
  if (t === "spaces")
    return fg(e);
  throw new Error(`Not supported provider: ${t}`);
}
function ug(e) {
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
  return ff(t, e.path);
}
function ff(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function fg(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return ff(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var na = {};
Object.defineProperty(na, "__esModule", { value: !0 });
na.retry = df;
const dg = Wt;
async function df(e, t) {
  var n;
  const { retries: r, interval: i, backoff: o = 0, attempt: s = 0, shouldRetry: a, cancellationToken: l = new dg.CancellationToken() } = t;
  try {
    return await e();
  } catch (h) {
    if (await Promise.resolve((n = a == null ? void 0 : a(h)) !== null && n !== void 0 ? n : !0) && r > 0 && !l.cancelled)
      return await new Promise((c) => setTimeout(c, i + o * s)), await df(e, { ...t, retries: r - 1, attempt: s + 1 });
    throw h;
  }
}
var ra = {};
Object.defineProperty(ra, "__esModule", { value: !0 });
ra.parseDn = hg;
function hg(e) {
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
var Yn = {};
Object.defineProperty(Yn, "__esModule", { value: !0 });
Yn.nil = Yn.UUID = void 0;
const hf = Fr, pf = Qn, pg = "options.name must be either a string or a Buffer", Dl = (0, hf.randomBytes)(16);
Dl[0] = Dl[0] | 1;
const Ti = {}, te = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  Ti[t] = e, te[e] = t;
}
class wn {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const n = wn.check(t);
    if (!n)
      throw new Error("not a UUID");
    this.version = n.version, n.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, n) {
    return mg(t, "sha1", 80, n);
  }
  toString() {
    return this.ascii == null && (this.ascii = gg(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, n = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (Ti[t[14] + t[15]] & 240) >> 4,
        variant: Pl((Ti[t[19] + t[20]] & 224) >> 5),
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
        variant: Pl((t[n + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, pf.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const n = Buffer.allocUnsafe(16);
    let r = 0;
    for (let i = 0; i < 16; i++)
      n[i] = Ti[t[r++] + t[r++]], (i === 3 || i === 5 || i === 7 || i === 9) && (r += 1);
    return n;
  }
}
Yn.UUID = wn;
wn.OID = wn.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function Pl(e) {
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
var yr;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(yr || (yr = {}));
function mg(e, t, n, r, i = yr.ASCII) {
  const o = (0, hf.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, pf.newError)(pg, "ERR_INVALID_UUID_NAME");
  o.update(r), o.update(e);
  const a = o.digest();
  let l;
  switch (i) {
    case yr.BINARY:
      a[6] = a[6] & 15 | n, a[8] = a[8] & 63 | 128, l = a;
      break;
    case yr.OBJECT:
      a[6] = a[6] & 15 | n, a[8] = a[8] & 63 | 128, l = new wn(a);
      break;
    default:
      l = te[a[0]] + te[a[1]] + te[a[2]] + te[a[3]] + "-" + te[a[4]] + te[a[5]] + "-" + te[a[6] & 15 | n] + te[a[7]] + "-" + te[a[8] & 63 | 128] + te[a[9]] + "-" + te[a[10]] + te[a[11]] + te[a[12]] + te[a[13]] + te[a[14]] + te[a[15]];
      break;
  }
  return l;
}
function gg(e) {
  return te[e[0]] + te[e[1]] + te[e[2]] + te[e[3]] + "-" + te[e[4]] + te[e[5]] + "-" + te[e[6]] + te[e[7]] + "-" + te[e[8]] + te[e[9]] + "-" + te[e[10]] + te[e[11]] + te[e[12]] + te[e[13]] + te[e[14]] + te[e[15]];
}
Yn.nil = new wn("00000000-0000-0000-0000-000000000000");
var Mr = {}, mf = {};
(function(e) {
  (function(t) {
    t.parser = function(d, u) {
      return new r(d, u);
    }, t.SAXParser = r, t.SAXStream = f, t.createStream = h, t.MAX_BUFFER_LENGTH = 64 * 1024;
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
    function r(d, u) {
      if (!(this instanceof r))
        return new r(d, u);
      var S = this;
      o(S), S.q = S.c = "", S.bufferCheckPosition = t.MAX_BUFFER_LENGTH, S.encoding = null, S.opt = u || {}, S.opt.lowercase = S.opt.lowercase || S.opt.lowercasetags, S.looseCase = S.opt.lowercase ? "toLowerCase" : "toUpperCase", S.opt.maxEntityCount = S.opt.maxEntityCount || 512, S.opt.maxEntityDepth = S.opt.maxEntityDepth || 4, S.entityCount = S.entityDepth = 0, S.tags = [], S.closed = S.closedRoot = S.sawRoot = !1, S.tag = S.error = null, S.strict = !!d, S.noscript = !!(d || S.opt.noscript), S.state = v.BEGIN, S.strictEntities = S.opt.strictEntities, S.ENTITIES = S.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), S.attribList = [], S.opt.xmlns && (S.ns = Object.create(E)), S.opt.unquotedAttributeValues === void 0 && (S.opt.unquotedAttributeValues = !d), S.trackPosition = S.opt.position !== !1, S.trackPosition && (S.position = S.line = S.column = 0), Z(S, "onready");
    }
    Object.create || (Object.create = function(d) {
      function u() {
      }
      u.prototype = d;
      var S = new u();
      return S;
    }), Object.keys || (Object.keys = function(d) {
      var u = [];
      for (var S in d) d.hasOwnProperty(S) && u.push(S);
      return u;
    });
    function i(d) {
      for (var u = Math.max(t.MAX_BUFFER_LENGTH, 10), S = 0, _ = 0, re = n.length; _ < re; _++) {
        var ce = d[n[_]].length;
        if (ce > u)
          switch (n[_]) {
            case "textNode":
              F(d);
              break;
            case "cdata":
              C(d, "oncdata", d.cdata), d.cdata = "";
              break;
            case "script":
              C(d, "onscript", d.script), d.script = "";
              break;
            default:
              L(d, "Max buffer length exceeded: " + n[_]);
          }
        S = Math.max(S, ce);
      }
      var me = t.MAX_BUFFER_LENGTH - S;
      d.bufferCheckPosition = me + d.position;
    }
    function o(d) {
      for (var u = 0, S = n.length; u < S; u++)
        d[n[u]] = "";
    }
    function s(d) {
      F(d), d.cdata !== "" && (C(d, "oncdata", d.cdata), d.cdata = ""), d.script !== "" && (C(d, "onscript", d.script), d.script = "");
    }
    r.prototype = {
      end: function() {
        j(this);
      },
      write: en,
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
    var l = t.EVENTS.filter(function(d) {
      return d !== "error" && d !== "end";
    });
    function h(d, u) {
      return new f(d, u);
    }
    function c(d, u) {
      if (d.length >= 2) {
        if (d[0] === 255 && d[1] === 254)
          return "utf-16le";
        if (d[0] === 254 && d[1] === 255)
          return "utf-16be";
      }
      return d.length >= 3 && d[0] === 239 && d[1] === 187 && d[2] === 191 ? "utf8" : d.length >= 4 ? d[0] === 60 && d[1] === 0 && d[2] === 63 && d[3] === 0 ? "utf-16le" : d[0] === 0 && d[1] === 60 && d[2] === 0 && d[3] === 63 ? "utf-16be" : "utf8" : u ? "utf8" : null;
    }
    function f(d, u) {
      if (!(this instanceof f))
        return new f(d, u);
      a.apply(this), this._parser = new r(d, u), this.writable = !0, this.readable = !0;
      var S = this;
      this._parser.onend = function() {
        S.emit("end");
      }, this._parser.onerror = function(_) {
        S.emit("error", _), S._parser.error = null;
      }, this._decoder = null, this._decoderBuffer = null, l.forEach(function(_) {
        Object.defineProperty(S, "on" + _, {
          get: function() {
            return S._parser["on" + _];
          },
          set: function(re) {
            if (!re)
              return S.removeAllListeners(_), S._parser["on" + _] = re, re;
            S.on(_, re);
          },
          enumerable: !0,
          configurable: !1
        });
      });
    }
    f.prototype = Object.create(a.prototype, {
      constructor: {
        value: f
      }
    }), f.prototype._decodeBuffer = function(d, u) {
      if (this._decoderBuffer && (d = Buffer.concat([this._decoderBuffer, d]), this._decoderBuffer = null), !this._decoder) {
        var S = c(d, u);
        if (!S)
          return this._decoderBuffer = d, "";
        this._parser.encoding = S, this._decoder = new TextDecoder(S);
      }
      return this._decoder.decode(d, { stream: !u });
    }, f.prototype.write = function(d) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(d))
        d = this._decodeBuffer(d, !1);
      else if (this._decoderBuffer) {
        var u = this._decodeBuffer(Buffer.alloc(0), !0);
        u && (this._parser.write(u), this.emit("data", u));
      }
      return this._parser.write(d.toString()), this.emit("data", d), !0;
    }, f.prototype.end = function(d) {
      if (d && d.length && this.write(d), this._decoderBuffer) {
        var u = this._decodeBuffer(Buffer.alloc(0), !0);
        u && (this._parser.write(u), this.emit("data", u));
      } else if (this._decoder) {
        var S = this._decoder.decode();
        S && (this._parser.write(S), this.emit("data", S));
      }
      return this._parser.end(), !0;
    }, f.prototype.on = function(d, u) {
      var S = this;
      return !S._parser["on" + d] && l.indexOf(d) !== -1 && (S._parser["on" + d] = function() {
        var _ = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        _.splice(0, 0, d), S.emit.apply(S, _);
      }), a.prototype.on.call(S, d, u);
    };
    var p = /^\[CDATA\[$/i, g = /^DOCTYPE$/i, w = "http://www.w3.org/XML/1998/namespace", y = "http://www.w3.org/2000/xmlns/", E = { xml: w, xmlns: y }, x = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, N = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, k = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function W(d) {
      return d === " " || d === `
` || d === "\r" || d === "	";
    }
    function Y(d) {
      return d === '"' || d === "'";
    }
    function Q(d) {
      return d === ">" || W(d);
    }
    function ne(d, u) {
      return d.test(u);
    }
    function q(d, u) {
      return !ne(d, u);
    }
    var v = 0;
    t.STATE = {
      BEGIN: v++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: v++,
      // leading whitespace
      TEXT: v++,
      // general stuff
      TEXT_ENTITY: v++,
      // &amp and such.
      OPEN_WAKA: v++,
      // <
      SGML_DECL: v++,
      // <!BLARG
      SGML_DECL_QUOTED: v++,
      // <!BLARG foo "bar
      DOCTYPE: v++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: v++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: v++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: v++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: v++,
      // <!-
      COMMENT: v++,
      // <!--
      COMMENT_ENDING: v++,
      // <!-- blah -
      COMMENT_ENDED: v++,
      // <!-- blah --
      CDATA: v++,
      // <![CDATA[ something
      CDATA_ENDING: v++,
      // ]
      CDATA_ENDING_2: v++,
      // ]]
      PROC_INST: v++,
      // <?hi
      PROC_INST_BODY: v++,
      // <?hi there
      PROC_INST_ENDING: v++,
      // <?hi "there" ?
      OPEN_TAG: v++,
      // <strong
      OPEN_TAG_SLASH: v++,
      // <strong /
      ATTRIB: v++,
      // <a
      ATTRIB_NAME: v++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: v++,
      // <a foo _
      ATTRIB_VALUE: v++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: v++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: v++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: v++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: v++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: v++,
      // <foo bar=&quot
      CLOSE_TAG: v++,
      // </a
      CLOSE_TAG_SAW_WHITE: v++,
      // </a   >
      SCRIPT: v++,
      // <script> ...
      SCRIPT_ENDING: v++
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
    }), Object.keys(t.ENTITIES).forEach(function(d) {
      var u = t.ENTITIES[d], S = typeof u == "number" ? String.fromCharCode(u) : u;
      t.ENTITIES[d] = S;
    });
    for (var V in t.STATE)
      t.STATE[t.STATE[V]] = V;
    v = t.STATE;
    function Z(d, u, S) {
      d[u] && d[u](S);
    }
    function oe(d) {
      var u = d && d.match(/(?:^|\s)encoding\s*=\s*(['"])([^'"]+)\1/i);
      return u ? u[2] : null;
    }
    function D(d) {
      return d ? d.toLowerCase().replace(/[^a-z0-9]/g, "") : null;
    }
    function I(d, u) {
      const S = D(d), _ = D(u);
      return !S || !_ ? !0 : _ === "utf16" ? S === "utf16le" || S === "utf16be" : S === _;
    }
    function P(d, u) {
      if (!(!d.strict || !d.encoding || !u || u.name !== "xml")) {
        var S = oe(u.body);
        S && !I(d.encoding, S) && R(
          d,
          "XML declaration encoding " + S + " does not match detected stream encoding " + d.encoding.toUpperCase()
        );
      }
    }
    function C(d, u, S) {
      d.textNode && F(d), Z(d, u, S);
    }
    function F(d) {
      d.textNode = A(d.opt, d.textNode), d.textNode && Z(d, "ontext", d.textNode), d.textNode = "";
    }
    function A(d, u) {
      return d.trim && (u = u.trim()), d.normalize && (u = u.replace(/\s+/g, " ")), u;
    }
    function L(d, u) {
      return F(d), d.trackPosition && (u += `
Line: ` + d.line + `
Column: ` + d.column + `
Char: ` + d.c), u = new Error(u), d.error = u, Z(d, "onerror", u), d;
    }
    function j(d) {
      return d.sawRoot && !d.closedRoot && R(d, "Unclosed root tag"), d.state !== v.BEGIN && d.state !== v.BEGIN_WHITESPACE && d.state !== v.TEXT && L(d, "Unexpected end"), F(d), d.c = "", d.closed = !0, Z(d, "onend"), r.call(d, d.strict, d.opt), d;
    }
    function R(d, u) {
      if (typeof d != "object" || !(d instanceof r))
        throw new Error("bad call to strictFail");
      d.strict && L(d, u);
    }
    function z(d) {
      d.strict || (d.tagName = d.tagName[d.looseCase]());
      var u = d.tags[d.tags.length - 1] || d, S = d.tag = { name: d.tagName, attributes: {} };
      d.opt.xmlns && (S.ns = u.ns), d.attribList.length = 0, C(d, "onopentagstart", S);
    }
    function J(d, u) {
      var S = d.indexOf(":"), _ = S < 0 ? ["", d] : d.split(":"), re = _[0], ce = _[1];
      return u && d === "xmlns" && (re = "xmlns", ce = ""), { prefix: re, local: ce };
    }
    function M(d) {
      if (d.strict || (d.attribName = d.attribName[d.looseCase]()), d.attribList.indexOf(d.attribName) !== -1 || d.tag.attributes.hasOwnProperty(d.attribName)) {
        d.attribName = d.attribValue = "";
        return;
      }
      if (d.opt.xmlns) {
        var u = J(d.attribName, !0), S = u.prefix, _ = u.local;
        if (S === "xmlns")
          if (_ === "xml" && d.attribValue !== w)
            R(
              d,
              "xml: prefix must be bound to " + w + `
Actual: ` + d.attribValue
            );
          else if (_ === "xmlns" && d.attribValue !== y)
            R(
              d,
              "xmlns: prefix must be bound to " + y + `
Actual: ` + d.attribValue
            );
          else {
            var re = d.tag, ce = d.tags[d.tags.length - 1] || d;
            re.ns === ce.ns && (re.ns = Object.create(ce.ns)), re.ns[_] = d.attribValue;
          }
        d.attribList.push([d.attribName, d.attribValue]);
      } else
        d.tag.attributes[d.attribName] = d.attribValue, C(d, "onattribute", {
          name: d.attribName,
          value: d.attribValue
        });
      d.attribName = d.attribValue = "";
    }
    function ee(d, u) {
      if (d.opt.xmlns) {
        var S = d.tag, _ = J(d.tagName);
        S.prefix = _.prefix, S.local = _.local, S.uri = S.ns[_.prefix] || "", S.prefix && !S.uri && (R(
          d,
          "Unbound namespace prefix: " + JSON.stringify(d.tagName)
        ), S.uri = _.prefix);
        var re = d.tags[d.tags.length - 1] || d;
        S.ns && re.ns !== S.ns && Object.keys(S.ns).forEach(function(An) {
          C(d, "onopennamespace", {
            prefix: An,
            uri: S.ns[An]
          });
        });
        for (var ce = 0, me = d.attribList.length; ce < me; ce++) {
          var Ie = d.attribList[ce], Oe = Ie[0], Ze = Ie[1], Ee = J(Oe, !0), et = Ee.prefix, Co = Ee.local, Kr = et === "" ? "" : S.ns[et] || "", Ot = {
            name: Oe,
            value: Ze,
            prefix: et,
            local: Co,
            uri: Kr
          };
          et && et !== "xmlns" && !Kr && (R(
            d,
            "Unbound namespace prefix: " + JSON.stringify(et)
          ), Ot.uri = et), d.tag.attributes[Oe] = Ot, C(d, "onattribute", Ot);
        }
        d.attribList.length = 0;
      }
      d.tag.isSelfClosing = !!u, d.sawRoot = !0, d.tags.push(d.tag), C(d, "onopentag", d.tag), u || (!d.noscript && d.tagName.toLowerCase() === "script" ? d.state = v.SCRIPT : d.state = v.TEXT, d.tag = null, d.tagName = ""), d.attribName = d.attribValue = "", d.attribList.length = 0;
    }
    function pe(d) {
      if (!d.tagName) {
        R(d, "Weird empty close tag."), d.textNode += "</>", d.state = v.TEXT;
        return;
      }
      if (d.script) {
        if (d.tagName !== "script") {
          d.script += "</" + d.tagName + ">", d.tagName = "", d.state = v.SCRIPT;
          return;
        }
        C(d, "onscript", d.script), d.script = "";
      }
      var u = d.tags.length, S = d.tagName;
      d.strict || (S = S[d.looseCase]());
      for (var _ = S; u--; ) {
        var re = d.tags[u];
        if (re.name !== _)
          R(d, "Unexpected close tag");
        else
          break;
      }
      if (u < 0) {
        R(d, "Unmatched closing tag: " + d.tagName), d.textNode += "</" + d.tagName + ">", d.state = v.TEXT;
        return;
      }
      d.tagName = S;
      for (var ce = d.tags.length; ce-- > u; ) {
        var me = d.tag = d.tags.pop();
        d.tagName = d.tag.name, C(d, "onclosetag", d.tagName);
        var Ie = {};
        for (var Oe in me.ns)
          Ie[Oe] = me.ns[Oe];
        var Ze = d.tags[d.tags.length - 1] || d;
        d.opt.xmlns && me.ns !== Ze.ns && Object.keys(me.ns).forEach(function(Ee) {
          var et = me.ns[Ee];
          C(d, "onclosenamespace", { prefix: Ee, uri: et });
        });
      }
      u === 0 && (d.closedRoot = !0), d.tagName = d.attribValue = d.attribName = "", d.attribList.length = 0, d.state = v.TEXT;
    }
    function ie(d) {
      var u = d.entity, S = u.toLowerCase(), _, re = "";
      return d.ENTITIES[u] ? d.ENTITIES[u] : d.ENTITIES[S] ? d.ENTITIES[S] : (u = S, u.charAt(0) === "#" && (u.charAt(1) === "x" ? (u = u.slice(2), _ = parseInt(u, 16), re = _.toString(16)) : (u = u.slice(1), _ = parseInt(u, 10), re = _.toString(10))), u = u.replace(/^0+/, ""), isNaN(_) || re.toLowerCase() !== u || _ < 0 || _ > 1114111 || !Qe(_) ? (R(d, "Invalid character entity"), "&" + d.entity + ";") : String.fromCodePoint(_));
    }
    function Qe(d) {
      return d === 9 || d === 10 || d === 13 || d >= 32 && d <= 55295 || d >= 57344 && d <= 65533 || d >= 65536 && d <= 1114111;
    }
    function vt(d, u) {
      u === "<" ? (d.state = v.OPEN_WAKA, d.startTagPosition = d.position) : W(u) || (R(d, "Non-whitespace before first tag."), d.textNode = u, d.state = v.TEXT);
    }
    function ze(d, u) {
      var S = "";
      return u < d.length && (S = d.charAt(u)), S;
    }
    function en(d) {
      var u = this;
      if (this.error)
        throw this.error;
      if (u.closed)
        return L(
          u,
          "Cannot write after close. Assign an onready handler."
        );
      if (d === null)
        return j(u);
      typeof d == "object" && (d = d.toString());
      for (var S = 0, _ = ""; _ = ze(d, S++), u.c = _, !!_; )
        switch (u.trackPosition && (u.position++, _ === `
` ? (u.line++, u.column = 0) : u.column++), u.state) {
          case v.BEGIN:
            if (u.state = v.BEGIN_WHITESPACE, _ === "\uFEFF")
              continue;
            vt(u, _);
            continue;
          case v.BEGIN_WHITESPACE:
            vt(u, _);
            continue;
          case v.TEXT:
            if (u.sawRoot && !u.closedRoot) {
              for (var ce = S - 1; _ && _ !== "<" && _ !== "&"; )
                _ = ze(d, S++), _ && u.trackPosition && (u.position++, _ === `
` ? (u.line++, u.column = 0) : u.column++);
              u.textNode += d.substring(ce, S - 1);
            }
            _ === "<" && !(u.sawRoot && u.closedRoot && !u.strict) ? (u.state = v.OPEN_WAKA, u.startTagPosition = u.position) : (!W(_) && (!u.sawRoot || u.closedRoot) && R(u, "Text data outside of root node."), _ === "&" ? u.state = v.TEXT_ENTITY : u.textNode += _);
            continue;
          case v.SCRIPT:
            _ === "<" ? u.state = v.SCRIPT_ENDING : u.script += _;
            continue;
          case v.SCRIPT_ENDING:
            _ === "/" ? u.state = v.CLOSE_TAG : (u.script += "<" + _, u.state = v.SCRIPT);
            continue;
          case v.OPEN_WAKA:
            if (_ === "!")
              u.state = v.SGML_DECL, u.sgmlDecl = "";
            else if (!W(_)) if (ne(x, _))
              u.state = v.OPEN_TAG, u.tagName = _;
            else if (_ === "/")
              u.state = v.CLOSE_TAG, u.tagName = "";
            else if (_ === "?")
              u.state = v.PROC_INST, u.procInstName = u.procInstBody = "";
            else {
              if (R(u, "Unencoded <"), u.startTagPosition + 1 < u.position) {
                var re = u.position - u.startTagPosition;
                _ = new Array(re).join(" ") + _;
              }
              u.textNode += "<" + _, u.state = v.TEXT;
            }
            continue;
          case v.SGML_DECL:
            if (u.sgmlDecl + _ === "--") {
              u.state = v.COMMENT, u.comment = "", u.sgmlDecl = "";
              continue;
            }
            u.doctype && u.doctype !== !0 && u.sgmlDecl ? (u.state = v.DOCTYPE_DTD, u.doctype += "<!" + u.sgmlDecl + _, u.sgmlDecl = "") : p.test(u.sgmlDecl + _) ? (C(u, "onopencdata"), u.state = v.CDATA, u.sgmlDecl = "", u.cdata = "") : g.test(u.sgmlDecl + _) ? (u.state = v.DOCTYPE, (u.doctype || u.sawRoot) && R(
              u,
              "Inappropriately located doctype declaration"
            ), u.doctype = "", u.sgmlDecl = "") : _ === ">" ? (C(u, "onsgmldeclaration", u.sgmlDecl), u.sgmlDecl = "", u.state = v.TEXT) : (Y(_) && (u.state = v.SGML_DECL_QUOTED), u.sgmlDecl += _);
            continue;
          case v.SGML_DECL_QUOTED:
            _ === u.q && (u.state = v.SGML_DECL, u.q = ""), u.sgmlDecl += _;
            continue;
          case v.DOCTYPE:
            _ === ">" ? (u.state = v.TEXT, C(u, "ondoctype", u.doctype), u.doctype = !0) : (u.doctype += _, _ === "[" ? u.state = v.DOCTYPE_DTD : Y(_) && (u.state = v.DOCTYPE_QUOTED, u.q = _));
            continue;
          case v.DOCTYPE_QUOTED:
            u.doctype += _, _ === u.q && (u.q = "", u.state = v.DOCTYPE);
            continue;
          case v.DOCTYPE_DTD:
            _ === "]" ? (u.doctype += _, u.state = v.DOCTYPE) : _ === "<" ? (u.state = v.OPEN_WAKA, u.startTagPosition = u.position) : Y(_) ? (u.doctype += _, u.state = v.DOCTYPE_DTD_QUOTED, u.q = _) : u.doctype += _;
            continue;
          case v.DOCTYPE_DTD_QUOTED:
            u.doctype += _, _ === u.q && (u.state = v.DOCTYPE_DTD, u.q = "");
            continue;
          case v.COMMENT:
            _ === "-" ? u.state = v.COMMENT_ENDING : u.comment += _;
            continue;
          case v.COMMENT_ENDING:
            _ === "-" ? (u.state = v.COMMENT_ENDED, u.comment = A(u.opt, u.comment), u.comment && C(u, "oncomment", u.comment), u.comment = "") : (u.comment += "-" + _, u.state = v.COMMENT);
            continue;
          case v.COMMENT_ENDED:
            _ !== ">" ? (R(u, "Malformed comment"), u.comment += "--" + _, u.state = v.COMMENT) : u.doctype && u.doctype !== !0 ? u.state = v.DOCTYPE_DTD : u.state = v.TEXT;
            continue;
          case v.CDATA:
            for (var ce = S - 1; _ && _ !== "]"; )
              _ = ze(d, S++), _ && u.trackPosition && (u.position++, _ === `
` ? (u.line++, u.column = 0) : u.column++);
            u.cdata += d.substring(ce, S - 1), _ === "]" && (u.state = v.CDATA_ENDING);
            continue;
          case v.CDATA_ENDING:
            _ === "]" ? u.state = v.CDATA_ENDING_2 : (u.cdata += "]" + _, u.state = v.CDATA);
            continue;
          case v.CDATA_ENDING_2:
            _ === ">" ? (u.cdata && C(u, "oncdata", u.cdata), C(u, "onclosecdata"), u.cdata = "", u.state = v.TEXT) : _ === "]" ? u.cdata += "]" : (u.cdata += "]]" + _, u.state = v.CDATA);
            continue;
          case v.PROC_INST:
            _ === "?" ? u.state = v.PROC_INST_ENDING : W(_) ? u.state = v.PROC_INST_BODY : u.procInstName += _;
            continue;
          case v.PROC_INST_BODY:
            if (!u.procInstBody && W(_))
              continue;
            _ === "?" ? u.state = v.PROC_INST_ENDING : u.procInstBody += _;
            continue;
          case v.PROC_INST_ENDING:
            if (_ === ">") {
              const Ze = {
                name: u.procInstName,
                body: u.procInstBody
              };
              P(u, Ze), C(u, "onprocessinginstruction", Ze), u.procInstName = u.procInstBody = "", u.state = v.TEXT;
            } else
              u.procInstBody += "?" + _, u.state = v.PROC_INST_BODY;
            continue;
          case v.OPEN_TAG:
            ne(T, _) ? u.tagName += _ : (z(u), _ === ">" ? ee(u) : _ === "/" ? u.state = v.OPEN_TAG_SLASH : (W(_) || R(u, "Invalid character in tag name"), u.state = v.ATTRIB));
            continue;
          case v.OPEN_TAG_SLASH:
            _ === ">" ? (ee(u, !0), pe(u)) : (R(
              u,
              "Forward-slash in opening tag not followed by >"
            ), u.state = v.ATTRIB);
            continue;
          case v.ATTRIB:
            if (W(_))
              continue;
            _ === ">" ? ee(u) : _ === "/" ? u.state = v.OPEN_TAG_SLASH : ne(x, _) ? (u.attribName = _, u.attribValue = "", u.state = v.ATTRIB_NAME) : R(u, "Invalid attribute name");
            continue;
          case v.ATTRIB_NAME:
            _ === "=" ? u.state = v.ATTRIB_VALUE : _ === ">" ? (R(u, "Attribute without value"), u.attribValue = u.attribName, M(u), ee(u)) : W(_) ? u.state = v.ATTRIB_NAME_SAW_WHITE : ne(T, _) ? u.attribName += _ : R(u, "Invalid attribute name");
            continue;
          case v.ATTRIB_NAME_SAW_WHITE:
            if (_ === "=")
              u.state = v.ATTRIB_VALUE;
            else {
              if (W(_))
                continue;
              R(u, "Attribute without value"), u.tag.attributes[u.attribName] = "", u.attribValue = "", C(u, "onattribute", {
                name: u.attribName,
                value: ""
              }), u.attribName = "", _ === ">" ? ee(u) : ne(x, _) ? (u.attribName = _, u.state = v.ATTRIB_NAME) : (R(u, "Invalid attribute name"), u.state = v.ATTRIB);
            }
            continue;
          case v.ATTRIB_VALUE:
            if (W(_))
              continue;
            Y(_) ? (u.q = _, u.state = v.ATTRIB_VALUE_QUOTED) : (u.opt.unquotedAttributeValues || L(u, "Unquoted attribute value"), u.state = v.ATTRIB_VALUE_UNQUOTED, u.attribValue = _);
            continue;
          case v.ATTRIB_VALUE_QUOTED:
            if (_ !== u.q) {
              _ === "&" ? u.state = v.ATTRIB_VALUE_ENTITY_Q : u.attribValue += _;
              continue;
            }
            M(u), u.q = "", u.state = v.ATTRIB_VALUE_CLOSED;
            continue;
          case v.ATTRIB_VALUE_CLOSED:
            W(_) ? u.state = v.ATTRIB : _ === ">" ? ee(u) : _ === "/" ? u.state = v.OPEN_TAG_SLASH : ne(x, _) ? (R(u, "No whitespace between attributes"), u.attribName = _, u.attribValue = "", u.state = v.ATTRIB_NAME) : R(u, "Invalid attribute name");
            continue;
          case v.ATTRIB_VALUE_UNQUOTED:
            if (!Q(_)) {
              _ === "&" ? u.state = v.ATTRIB_VALUE_ENTITY_U : u.attribValue += _;
              continue;
            }
            M(u), _ === ">" ? ee(u) : u.state = v.ATTRIB;
            continue;
          case v.CLOSE_TAG:
            if (u.tagName)
              _ === ">" ? pe(u) : ne(T, _) ? u.tagName += _ : u.script ? (u.script += "</" + u.tagName + _, u.tagName = "", u.state = v.SCRIPT) : (W(_) || R(u, "Invalid tagname in closing tag"), u.state = v.CLOSE_TAG_SAW_WHITE);
            else {
              if (W(_))
                continue;
              q(x, _) ? u.script ? (u.script += "</" + _, u.state = v.SCRIPT) : R(u, "Invalid tagname in closing tag.") : u.tagName = _;
            }
            continue;
          case v.CLOSE_TAG_SAW_WHITE:
            if (W(_))
              continue;
            _ === ">" ? pe(u) : R(u, "Invalid characters in closing tag");
            continue;
          case v.TEXT_ENTITY:
          case v.ATTRIB_VALUE_ENTITY_Q:
          case v.ATTRIB_VALUE_ENTITY_U:
            var me, Ie;
            switch (u.state) {
              case v.TEXT_ENTITY:
                me = v.TEXT, Ie = "textNode";
                break;
              case v.ATTRIB_VALUE_ENTITY_Q:
                me = v.ATTRIB_VALUE_QUOTED, Ie = "attribValue";
                break;
              case v.ATTRIB_VALUE_ENTITY_U:
                me = v.ATTRIB_VALUE_UNQUOTED, Ie = "attribValue";
                break;
            }
            if (_ === ";") {
              var Oe = ie(u);
              u.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(Oe) ? ((u.entityCount += 1) > u.opt.maxEntityCount && L(
                u,
                "Parsed entity count exceeds max entity count"
              ), (u.entityDepth += 1) > u.opt.maxEntityDepth && L(
                u,
                "Parsed entity depth exceeds max entity depth"
              ), u.entity = "", u.state = me, u.write(Oe), u.entityDepth -= 1) : (u[Ie] += Oe, u.entity = "", u.state = me);
            } else ne(u.entity.length ? k : N, _) ? u.entity += _ : (R(u, "Invalid character in entity name"), u[Ie] += "&" + u.entity + _, u.entity = "", u.state = me);
            continue;
          default:
            throw new Error(u, "Unknown state: " + u.state);
        }
      return u.position >= u.bufferCheckPosition && i(u), u;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var d = String.fromCharCode, u = Math.floor, S = function() {
        var _ = 16384, re = [], ce, me, Ie = -1, Oe = arguments.length;
        if (!Oe)
          return "";
        for (var Ze = ""; ++Ie < Oe; ) {
          var Ee = Number(arguments[Ie]);
          if (!isFinite(Ee) || // `NaN`, `+Infinity`, or `-Infinity`
          Ee < 0 || // not a valid Unicode code point
          Ee > 1114111 || // not a valid Unicode code point
          u(Ee) !== Ee)
            throw RangeError("Invalid code point: " + Ee);
          Ee <= 65535 ? re.push(Ee) : (Ee -= 65536, ce = (Ee >> 10) + 55296, me = Ee % 1024 + 56320, re.push(ce, me)), (Ie + 1 === Oe || re.length > _) && (Ze += d.apply(null, re), re.length = 0);
        }
        return Ze;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: S,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = S;
    }();
  })(e);
})(mf);
Object.defineProperty(Mr, "__esModule", { value: !0 });
Mr.XElement = void 0;
Mr.parseXml = vg;
const yg = mf, ui = Qn;
class gf {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, ui.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!wg(t))
      throw (0, ui.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const n = this.attributes === null ? null : this.attributes[t];
    if (n == null)
      throw (0, ui.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return n;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, n = !1, r = null) {
    const i = this.elementOrNull(t, n);
    if (i === null)
      throw (0, ui.newError)(r || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, n = !1) {
    if (this.elements === null)
      return null;
    for (const r of this.elements)
      if (Nl(r, t, n))
        return r;
    return null;
  }
  getElements(t, n = !1) {
    return this.elements === null ? [] : this.elements.filter((r) => Nl(r, t, n));
  }
  elementValueOrEmpty(t, n = !1) {
    const r = this.elementOrNull(t, n);
    return r === null ? "" : r.value;
  }
}
Mr.XElement = gf;
const Eg = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function wg(e) {
  return Eg.test(e);
}
function Nl(e, t, n) {
  const r = e.name;
  return r === t || n === !0 && r.length === t.length && r.toLowerCase() === t.toLowerCase();
}
function vg(e) {
  let t = null;
  const n = yg.parser(!0, {}), r = [];
  return n.onopentag = (i) => {
    const o = new gf(i.name);
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
var xn = {};
Object.defineProperty(xn, "__esModule", { value: !0 });
xn.mapToObject = yf;
xn.isValidKey = Ki;
xn.asArray = _g;
xn.deepAssign = xg;
xn.objectToArgs = Tg;
function yf(e) {
  const t = {};
  for (const [n, r] of e)
    Ki(n) && (r instanceof Map ? t[n] = yf(r) : t[n] = r);
  return t;
}
function Ki(e) {
  return ["__proto__", "prototype", "constructor"].includes(e) ? !1 : ["string", "number", "symbol", "boolean"].includes(typeof e) || e === null;
}
function _g(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function Fl(e) {
  if (Array.isArray(e))
    return !1;
  const t = typeof e;
  return t === "object" || t === "function";
}
function bg(e, t, n) {
  const r = t[n];
  if (r === void 0)
    return;
  const i = e[n];
  i == null || r == null || !Fl(i) || !Fl(r) ? Array.isArray(i) && Array.isArray(r) ? e[n] = Array.from(new Set(i.concat(r))) : e[n] = r : e[n] = Ef(i, r);
}
function Ef(e, t) {
  if (e !== t)
    for (const n of Object.getOwnPropertyNames(t))
      Ki(n) && bg(e, t, n);
  return e;
}
function xg(e, ...t) {
  for (const n of t)
    n != null && Ef(e, n);
  return e;
}
const Sg = /^[a-zA-Z][a-zA-Z0-9-]*$/, Ag = /[\0\r\n]/;
function Tg(e) {
  const t = Object.entries(e).reduce((n, [r, i]) => {
    if (!Ki(r) || i == null)
      return n;
    if (!Sg.test(r))
      throw new Error(`objectToArgs: unsafe flag name rejected: ${JSON.stringify(r)}`);
    if (Ag.test(i))
      throw new Error(`objectToArgs: value for --${r} contains a null byte or newline`);
    return n.concat([`--${r}`, i]);
  }, []);
  return Object.freeze(t);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.objectToArgs = e.deepAssign = e.asArray = e.mapToObject = e.isValidKey = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubTagPrefix = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.isSensitiveFieldName = e.HttpExecutor = e.hashSensitiveValue = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0;
  var t = Wt;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var n = Qn;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return n.newError;
  } });
  var r = ve;
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
  var i = Ji;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var o = Ur;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return o.ProgressCallbackTransform;
  } });
  var s = kr;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return s.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return s.githubUrl;
  } }), Object.defineProperty(e, "githubTagPrefix", { enumerable: !0, get: function() {
    return s.githubTagPrefix;
  } });
  var a = na;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return a.retry;
  } });
  var l = ra;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return l.parseDn;
  } });
  var h = Yn;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return h.UUID;
  } });
  var c = Mr;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return c.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return c.XElement;
  } });
  var f = xn;
  Object.defineProperty(e, "isValidKey", { enumerable: !0, get: function() {
    return f.isValidKey;
  } }), Object.defineProperty(e, "mapToObject", { enumerable: !0, get: function() {
    return f.mapToObject;
  } }), Object.defineProperty(e, "asArray", { enumerable: !0, get: function() {
    return f.asArray;
  } }), Object.defineProperty(e, "deepAssign", { enumerable: !0, get: function() {
    return f.deepAssign;
  } }), Object.defineProperty(e, "objectToArgs", { enumerable: !0, get: function() {
    return f.objectToArgs;
  } }), e.CURRENT_APP_INSTALLER_FILE_NAME = "installer.exe", e.CURRENT_APP_PACKAGE_FILE_NAME = "package.7z";
})(_e);
var $e = {}, ia = {}, lt = {};
function wf(e) {
  return typeof e > "u" || e === null;
}
function Cg(e) {
  return typeof e == "object" && e !== null;
}
function $g(e) {
  return Array.isArray(e) ? e : wf(e) ? [] : [e];
}
function Ig(e, t) {
  if (t) {
    const n = Object.keys(t);
    for (let r = 0, i = n.length; r < i; r += 1) {
      const o = n[r];
      e[o] = t[o];
    }
  }
  return e;
}
function Og(e, t) {
  let n = "";
  for (let r = 0; r < t; r += 1)
    n += e;
  return n;
}
function Rg(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
lt.isNothing = wf;
lt.isObject = Cg;
lt.toArray = $g;
lt.repeat = Og;
lt.isNegativeZero = Rg;
lt.extend = Ig;
function vf(e, t) {
  let n = "";
  const r = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (n += 'in "' + e.mark.name + '" '), n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (n += `

` + e.mark.snippet), r + " " + n) : r;
}
function Sr(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = vf(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Sr.prototype = Object.create(Error.prototype);
Sr.prototype.constructor = Sr;
Sr.prototype.toString = function(t) {
  return this.name + ": " + vf(this, t);
};
var jr = Sr;
const fr = lt;
function qo(e, t, n, r, i) {
  let o = "", s = "";
  const a = Math.floor(i / 2) - 1;
  return r - t > a && (o = " ... ", t = r - a + o.length), n - r > a && (s = " ...", n = r + a - s.length), {
    str: o + e.slice(t, n).replace(/\t/g, "→") + s,
    pos: r - t + o.length
    // relative position
  };
}
function Go(e, t) {
  return fr.repeat(" ", t - e.length) + e;
}
function Dg(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  const n = /\r?\n|\r|\0/g, r = [0], i = [];
  let o, s = -1;
  for (; o = n.exec(e.buffer); )
    i.push(o.index), r.push(o.index + o[0].length), e.position <= o.index && s < 0 && (s = r.length - 2);
  s < 0 && (s = r.length - 1);
  let a = "";
  const l = Math.min(e.line + t.linesAfter, i.length).toString().length, h = t.maxLength - (t.indent + l + 3);
  for (let f = 1; f <= t.linesBefore && !(s - f < 0); f++) {
    const p = qo(
      e.buffer,
      r[s - f],
      i[s - f],
      e.position - (r[s] - r[s - f]),
      h
    );
    a = fr.repeat(" ", t.indent) + Go((e.line - f + 1).toString(), l) + " | " + p.str + `
` + a;
  }
  const c = qo(e.buffer, r[s], i[s], e.position, h);
  a += fr.repeat(" ", t.indent) + Go((e.line + 1).toString(), l) + " | " + c.str + `
`, a += fr.repeat("-", t.indent + l + 3 + c.pos) + `^
`;
  for (let f = 1; f <= t.linesAfter && !(s + f >= i.length); f++) {
    const p = qo(
      e.buffer,
      r[s + f],
      i[s + f],
      e.position - (r[s] - r[s + f]),
      h
    );
    a += fr.repeat(" ", t.indent) + Go((e.line + f + 1).toString(), l) + " | " + p.str + `
`;
  }
  return a.replace(/\n$/, "");
}
var Pg = Dg;
const Ll = jr, Ng = [
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
], Fg = [
  "scalar",
  "sequence",
  "mapping"
];
function Lg(e) {
  const t = {};
  return e !== null && Object.keys(e).forEach(function(n) {
    e[n].forEach(function(r) {
      t[String(r)] = n;
    });
  }), t;
}
function Ug(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(n) {
    if (Ng.indexOf(n) === -1)
      throw new Ll('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(n) {
    return n;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = Lg(t.styleAliases || null), Fg.indexOf(this.kind) === -1)
    throw new Ll('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var Be = Ug;
const ar = jr, zo = Be;
function Ul(e, t) {
  const n = [];
  return e[t].forEach(function(r) {
    let i = n.length;
    n.forEach(function(o, s) {
      o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (i = s);
    }), n[i] = r;
  }), n;
}
function kg() {
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
function Cs(e) {
  return this.extend(e);
}
Cs.prototype.extend = function(t) {
  let n = [], r = [];
  if (t instanceof zo)
    r.push(t);
  else if (Array.isArray(t))
    r = r.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (n = n.concat(t.implicit)), t.explicit && (r = r.concat(t.explicit));
  else
    throw new ar("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  n.forEach(function(o) {
    if (!(o instanceof zo))
      throw new ar("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new ar("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new ar("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(o) {
    if (!(o instanceof zo))
      throw new ar("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  const i = Object.create(Cs.prototype);
  return i.implicit = (this.implicit || []).concat(n), i.explicit = (this.explicit || []).concat(r), i.compiledImplicit = Ul(i, "implicit"), i.compiledExplicit = Ul(i, "explicit"), i.compiledTypeMap = kg(i.compiledImplicit, i.compiledExplicit), i;
};
var _f = Cs;
const Mg = Be;
var bf = new Mg("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
});
const jg = Be;
var xf = new jg("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
});
const Bg = Be;
var Sf = new Bg("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
});
const Hg = _f;
var Af = new Hg({
  explicit: [
    bf,
    xf,
    Sf
  ]
});
const qg = Be;
function Gg(e) {
  if (e === null) return !0;
  const t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function zg() {
  return null;
}
function Wg(e) {
  return e === null;
}
var Tf = new qg("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Gg,
  construct: zg,
  predicate: Wg,
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
const Vg = Be;
function Yg(e) {
  if (e === null) return !1;
  const t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Xg(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Jg(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var Cf = new Vg("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Yg,
  construct: Xg,
  predicate: Jg,
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
const Kg = lt, Qg = Be;
function Zg(e) {
  return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function ey(e) {
  return e >= 48 && e <= 55;
}
function ty(e) {
  return e >= 48 && e <= 57;
}
function ny(e) {
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
      return r && isFinite(dr(e));
    }
    if (i === "x") {
      for (n++; n < t; n++) {
        if (!Zg(e.charCodeAt(n))) return !1;
        r = !0;
      }
      return r && isFinite(dr(e));
    }
    if (i === "o") {
      for (n++; n < t; n++) {
        if (!ey(e.charCodeAt(n))) return !1;
        r = !0;
      }
      return r && isFinite(dr(e));
    }
  }
  for (; n < t; n++) {
    if (!ty(e.charCodeAt(n)))
      return !1;
    r = !0;
  }
  return r ? isFinite(dr(e)) : !1;
}
function dr(e) {
  let t = e, n = 1, r = t[0];
  if ((r === "-" || r === "+") && (r === "-" && (n = -1), t = t.slice(1), r = t[0]), t === "0") return 0;
  if (r === "0") {
    if (t[1] === "b") return n * parseInt(t.slice(2), 2);
    if (t[1] === "x") return n * parseInt(t.slice(2), 16);
    if (t[1] === "o") return n * parseInt(t.slice(2), 8);
  }
  return n * parseInt(t, 10);
}
function ry(e) {
  return dr(e);
}
function iy(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !Kg.isNegativeZero(e);
}
var $f = new Qg("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: ny,
  construct: ry,
  predicate: iy,
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
const If = lt, oy = Be, sy = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
), ay = new RegExp(
  "^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function ly(e) {
  return e === null || !sy.test(e) ? !1 : isFinite(parseFloat(e, 10)) ? !0 : ay.test(e);
}
function cy(e) {
  let t = e.toLowerCase();
  const n = t[0] === "-" ? -1 : 1;
  return "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : n * parseFloat(t, 10);
}
const uy = /^[-+]?[0-9]+e/;
function fy(e, t) {
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
  else if (If.isNegativeZero(e))
    return "-0.0";
  const n = e.toString(10);
  return uy.test(n) ? n.replace("e", ".e") : n;
}
function dy(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || If.isNegativeZero(e));
}
var Of = new oy("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: ly,
  construct: cy,
  predicate: dy,
  represent: fy,
  defaultStyle: "lowercase"
}), Rf = Af.extend({
  implicit: [
    Tf,
    Cf,
    $f,
    Of
  ]
}), Df = Rf;
const hy = Be, Pf = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Nf = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function py(e) {
  return e === null ? !1 : Pf.exec(e) !== null || Nf.exec(e) !== null;
}
function my(e) {
  let t = 0, n = null, r = Pf.exec(e);
  if (r === null && (r = Nf.exec(e)), r === null) throw new Error("Date resolve error");
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
    const f = +r[10], p = +(r[11] || 0);
    n = (f * 60 + p) * 6e4, r[9] === "-" && (n = -n);
  }
  const c = new Date(Date.UTC(i, o, s, a, l, h, t));
  return n && c.setTime(c.getTime() - n), c;
}
function gy(e) {
  return e.toISOString();
}
var Ff = new hy("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: py,
  construct: my,
  instanceOf: Date,
  represent: gy
});
const yy = Be;
function Ey(e) {
  return e === "<<" || e === null;
}
var Lf = new yy("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Ey
});
const wy = Be, oa = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function vy(e) {
  if (e === null) return !1;
  let t = 0;
  const n = e.length, r = oa;
  for (let i = 0; i < n; i++) {
    const o = r.indexOf(e.charAt(i));
    if (!(o > 64)) {
      if (o < 0) return !1;
      t += 6;
    }
  }
  return t % 8 === 0;
}
function _y(e) {
  const t = e.replace(/[\r\n=]/g, ""), n = t.length, r = oa;
  let i = 0;
  const o = [];
  for (let a = 0; a < n; a++)
    a % 4 === 0 && a && (o.push(i >> 16 & 255), o.push(i >> 8 & 255), o.push(i & 255)), i = i << 6 | r.indexOf(t.charAt(a));
  const s = n % 4 * 6;
  return s === 0 ? (o.push(i >> 16 & 255), o.push(i >> 8 & 255), o.push(i & 255)) : s === 18 ? (o.push(i >> 10 & 255), o.push(i >> 2 & 255)) : s === 12 && o.push(i >> 4 & 255), new Uint8Array(o);
}
function by(e) {
  let t = "", n = 0;
  const r = e.length, i = oa;
  for (let s = 0; s < r; s++)
    s % 3 === 0 && s && (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]), n = (n << 8) + e[s];
  const o = r % 3;
  return o === 0 ? (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]) : o === 2 ? (t += i[n >> 10 & 63], t += i[n >> 4 & 63], t += i[n << 2 & 63], t += i[64]) : o === 1 && (t += i[n >> 2 & 63], t += i[n << 4 & 63], t += i[64], t += i[64]), t;
}
function xy(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Uf = new wy("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: vy,
  construct: _y,
  predicate: xy,
  represent: by
});
const Sy = Be, kl = Object.prototype.hasOwnProperty, Ay = Object.prototype.toString;
function Ty(e) {
  if (e === null) return !0;
  const t = {}, n = e;
  for (let r = 0, i = n.length; r < i; r += 1) {
    const o = n[r];
    let s = !1;
    if (Ay.call(o) !== "[object Object]") return !1;
    let a;
    for (a in o)
      if (kl.call(o, a))
        if (!s) s = !0;
        else return !1;
    if (!s || kl.call(t, a)) return !1;
    Object.defineProperty(t, a, { value: !0 });
  }
  return !0;
}
function Cy(e) {
  return e !== null ? e : [];
}
var kf = new Sy("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: Ty,
  construct: Cy
});
const $y = Be, Iy = Object.prototype.toString;
function Oy(e) {
  if (e === null) return !0;
  const t = e, n = new Array(t.length);
  for (let r = 0, i = t.length; r < i; r += 1) {
    const o = t[r];
    if (Iy.call(o) !== "[object Object]") return !1;
    const s = Object.keys(o);
    if (s.length !== 1) return !1;
    n[r] = [s[0], o[s[0]]];
  }
  return !0;
}
function Ry(e) {
  if (e === null) return [];
  const t = e, n = new Array(t.length);
  for (let r = 0, i = t.length; r < i; r += 1) {
    const o = t[r], s = Object.keys(o);
    n[r] = [s[0], o[s[0]]];
  }
  return n;
}
var Mf = new $y("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: Oy,
  construct: Ry
});
const Dy = Be, Py = Object.prototype.hasOwnProperty;
function Ny(e) {
  if (e === null) return !0;
  const t = e;
  for (const n in t)
    if (Py.call(t, n) && t[n] !== null)
      return !1;
  return !0;
}
function Fy(e) {
  return e !== null ? e : {};
}
var jf = new Dy("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: Ny,
  construct: Fy
}), sa = Df.extend({
  implicit: [
    Ff,
    Lf
  ],
  explicit: [
    Uf,
    kf,
    Mf,
    jf
  ]
});
const un = lt, Bf = jr, Ly = Pg, Uy = sa, ot = Object.prototype.hasOwnProperty, Fi = 1, Hf = 2, qf = 3, Li = 4, Wo = 1, ky = 2, Ml = 3, My = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, jy = /[\x85\u2028\u2029]/, By = /[,\[\]{}]/, Gf = /^(?:!|!!|![0-9A-Za-z-]+!)$/, zf = /^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;
function jl(e) {
  return Object.prototype.toString.call(e);
}
function gt(e) {
  return e === 10 || e === 13;
}
function At(e) {
  return e === 9 || e === 32;
}
function Ge(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function Ln(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function Hy(e) {
  if (e >= 48 && e <= 57)
    return e - 48;
  const t = e | 32;
  return t >= 97 && t <= 102 ? t - 97 + 10 : -1;
}
function qy(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function Gy(e) {
  return e >= 48 && e <= 57 ? e - 48 : -1;
}
function Bl(e) {
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
function zy(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
function Wf(e, t, n) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: n
  }) : e[t] = n;
}
const Vf = new Array(256), Yf = new Array(256);
for (let e = 0; e < 256; e++)
  Vf[e] = Bl(e) ? 1 : 0, Yf[e] = Bl(e);
function Wy(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || Uy, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.maxDepth = typeof t.maxDepth == "number" ? t.maxDepth : 100, this.maxTotalMergeKeys = typeof t.maxTotalMergeKeys == "number" ? t.maxTotalMergeKeys : 1e4, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.depth = 0, this.totalMergeKeys = 0, this.firstTabInLine = -1, this.documents = [], this.anchorMapTransactions = [];
}
function Xf(e, t) {
  const n = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return n.snippet = Ly(n), new Bf(t, n);
}
function H(e, t) {
  throw Xf(e, t);
}
function Ui(e, t) {
  e.onWarning && e.onWarning.call(null, Xf(e, t));
}
function dn(e, t, n) {
  const r = e.anchorMapTransactions;
  if (r.length !== 0) {
    const i = r[r.length - 1];
    ot.call(i, t) || (i[t] = {
      existed: ot.call(e.anchorMap, t),
      value: e.anchorMap[t]
    });
  }
  e.anchorMap[t] = n;
}
function Vy(e) {
  e.anchorMapTransactions.push(/* @__PURE__ */ Object.create(null));
}
function Yy(e) {
  const t = e.anchorMapTransactions.pop(), n = e.anchorMapTransactions;
  if (n.length === 0) return;
  const r = n[n.length - 1], i = Object.keys(t);
  for (let o = 0, s = i.length; o < s; o += 1) {
    const a = i[o];
    ot.call(r, a) || (r[a] = t[a]);
  }
}
function Xy(e) {
  const t = e.anchorMapTransactions.pop(), n = Object.keys(t);
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const i = t[n[r]];
    i.existed ? e.anchorMap[n[r]] = i.value : delete e.anchorMap[n[r]];
  }
}
function Jf(e) {
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
function Hl(e, t) {
  e.position = t.position, e.line = t.line, e.lineStart = t.lineStart, e.lineIndent = t.lineIndent, e.firstTabInLine = t.firstTabInLine, e.tag = t.tag, e.anchor = t.anchor, e.kind = t.kind, e.result = t.result;
}
const ql = {
  YAML: function(t, n, r) {
    t.version !== null && H(t, "duplication of %YAML directive"), r.length !== 1 && H(t, "YAML directive accepts exactly one argument");
    const i = /^([0-9]+)\.([0-9]+)$/.exec(r[0]);
    i === null && H(t, "ill-formed argument of the YAML directive");
    const o = parseInt(i[1], 10), s = parseInt(i[2], 10);
    o !== 1 && H(t, "unacceptable YAML version of the document"), t.version = r[0], t.checkLineBreaks = s < 2, s !== 1 && s !== 2 && Ui(t, "unsupported YAML version of the document");
  },
  TAG: function(t, n, r) {
    let i;
    r.length !== 2 && H(t, "TAG directive accepts exactly two arguments");
    const o = r[0];
    i = r[1], Gf.test(o) || H(t, "ill-formed tag handle (first argument) of the TAG directive"), ot.call(t.tagMap, o) && H(t, 'there is a previously declared suffix for "' + o + '" tag handle'), zf.test(i) || H(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      i = decodeURIComponent(i);
    } catch {
      H(t, "tag prefix is malformed: " + i);
    }
    t.tagMap[o] = i;
  }
};
function Gt(e, t, n, r) {
  if (t < n) {
    const i = e.input.slice(t, n);
    if (r)
      for (let o = 0, s = i.length; o < s; o += 1) {
        const a = i.charCodeAt(o);
        a === 9 || a >= 32 && a <= 1114111 || H(e, "expected valid JSON character");
      }
    else My.test(i) && H(e, "the stream contains non-printable characters");
    e.result += i;
  }
}
function Gl(e) {
  e.totalMergeKeys++, e.maxTotalMergeKeys !== -1 && e.totalMergeKeys > e.maxTotalMergeKeys && H(e, "merge keys exceeded maxTotalMergeKeys (" + e.maxTotalMergeKeys + ")");
}
function zl(e, t, n, r) {
  un.isObject(n) || H(e, "cannot merge mappings; the provided source object is unacceptable"), Gl(e);
  const i = Object.keys(n);
  for (let o = 0, s = i.length; o < s; o += 1) {
    const a = i[o];
    Gl(e), ot.call(t, a) || (Wf(t, a, n[a]), r[a] = !0);
  }
}
function Un(e, t, n, r, i, o, s, a, l) {
  if (Array.isArray(i)) {
    i = Array.prototype.slice.call(i);
    for (let h = 0, c = i.length; h < c; h += 1)
      Array.isArray(i[h]) && H(e, "nested arrays are not supported inside keys"), typeof i == "object" && jl(i[h]) === "[object Object]" && (i[h] = "[object Object]");
  }
  if (typeof i == "object" && jl(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(o)) {
      o.length > 100 && H(e, "abnormal merge sequence size");
      for (let h = 0, c = o.length; h < c; h += 1)
        zl(e, t, o[h], n);
    } else
      zl(e, t, o, n);
  else
    !e.json && !ot.call(n, i) && ot.call(t, i) && (e.line = s || e.line, e.lineStart = a || e.lineStart, e.position = l || e.position, H(e, "duplicated mapping key")), Wf(t, i, o), delete n[i];
  return t;
}
function aa(e) {
  const t = e.input.charCodeAt(e.position);
  t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : H(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function ge(e, t, n) {
  let r = 0, i = e.input.charCodeAt(e.position);
  for (; i !== 0; ) {
    for (; At(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (gt(i))
      for (aa(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return n !== -1 && r !== 0 && e.lineIndent < n && Ui(e, "deficient indentation"), r;
}
function Qi(e) {
  let t = e.position, n = e.input.charCodeAt(t);
  return !!((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2) && (t += 3, n = e.input.charCodeAt(t), n === 0 || Ge(n)));
}
function la(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += un.repeat(`
`, t - 1));
}
function Jy(e, t, n) {
  let r, i, o, s, a, l;
  const h = e.kind, c = e.result;
  let f = e.input.charCodeAt(e.position);
  if (Ge(f) || Ln(f) || f === 35 || f === 38 || f === 42 || f === 33 || f === 124 || f === 62 || f === 39 || f === 34 || f === 37 || f === 64 || f === 96)
    return !1;
  if (f === 63 || f === 45) {
    const p = e.input.charCodeAt(e.position + 1);
    if (Ge(p) || n && Ln(p))
      return !1;
  }
  for (e.kind = "scalar", e.result = "", r = i = e.position, o = !1; f !== 0; ) {
    if (f === 58) {
      const p = e.input.charCodeAt(e.position + 1);
      if (Ge(p) || n && Ln(p))
        break;
    } else if (f === 35) {
      const p = e.input.charCodeAt(e.position - 1);
      if (Ge(p))
        break;
    } else {
      if (e.position === e.lineStart && Qi(e) || n && Ln(f))
        break;
      if (gt(f))
        if (s = e.line, a = e.lineStart, l = e.lineIndent, ge(e, !1, -1), e.lineIndent >= t) {
          o = !0, f = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = i, e.line = s, e.lineStart = a, e.lineIndent = l;
          break;
        }
    }
    o && (Gt(e, r, i, !1), la(e, e.line - s), r = i = e.position, o = !1), At(f) || (i = e.position + 1), f = e.input.charCodeAt(++e.position);
  }
  return Gt(e, r, i, !1), e.result ? !0 : (e.kind = h, e.result = c, !1);
}
function Ky(e, t) {
  let n, r, i = e.input.charCodeAt(e.position);
  if (i !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (i = e.input.charCodeAt(e.position)) !== 0; )
    if (i === 39)
      if (Gt(e, n, e.position, !0), i = e.input.charCodeAt(++e.position), i === 39)
        n = e.position, e.position++, r = e.position;
      else
        return !0;
    else gt(i) ? (Gt(e, n, r, !0), la(e, ge(e, !1, t)), n = r = e.position) : e.position === e.lineStart && Qi(e) ? H(e, "unexpected end of the document within a single quoted scalar") : (e.position++, At(i) || (r = e.position));
  H(e, "unexpected end of the stream within a single quoted scalar");
}
function Qy(e, t) {
  let n, r, i, o = e.input.charCodeAt(e.position);
  if (o !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (o = e.input.charCodeAt(e.position)) !== 0; ) {
    if (o === 34)
      return Gt(e, n, e.position, !0), e.position++, !0;
    if (o === 92) {
      if (Gt(e, n, e.position, !0), o = e.input.charCodeAt(++e.position), gt(o))
        ge(e, !1, t);
      else if (o < 256 && Vf[o])
        e.result += Yf[o], e.position++;
      else if ((i = qy(o)) > 0) {
        let s = i, a = 0;
        for (; s > 0; s--)
          o = e.input.charCodeAt(++e.position), (i = Hy(o)) >= 0 ? a = (a << 4) + i : H(e, "expected hexadecimal character");
        e.result += zy(a), e.position++;
      } else
        H(e, "unknown escape sequence");
      n = r = e.position;
    } else gt(o) ? (Gt(e, n, r, !0), la(e, ge(e, !1, t)), n = r = e.position) : e.position === e.lineStart && Qi(e) ? H(e, "unexpected end of the document within a double quoted scalar") : (e.position++, At(o) || (r = e.position));
  }
  H(e, "unexpected end of the stream within a double quoted scalar");
}
function Zy(e, t) {
  let n = !0, r, i, o;
  const s = e.tag;
  let a;
  const l = e.anchor;
  let h, c, f, p;
  const g = /* @__PURE__ */ Object.create(null);
  let w, y, E, x = e.input.charCodeAt(e.position);
  if (x === 91)
    h = 93, p = !1, a = [];
  else if (x === 123)
    h = 125, p = !0, a = {};
  else
    return !1;
  for (e.anchor !== null && dn(e, e.anchor, a), x = e.input.charCodeAt(++e.position); x !== 0; ) {
    if (ge(e, !0, t), x = e.input.charCodeAt(e.position), x === h)
      return e.position++, e.tag = s, e.anchor = l, e.kind = p ? "mapping" : "sequence", e.result = a, !0;
    if (n ? x === 44 && H(e, "expected the node content, but found ','") : H(e, "missed comma between flow collection entries"), y = w = E = null, c = f = !1, x === 63) {
      const T = e.input.charCodeAt(e.position + 1);
      Ge(T) && (c = f = !0, e.position++, ge(e, !0, t));
    }
    r = e.line, i = e.lineStart, o = e.position, Xn(e, t, Fi, !1, !0), y = e.tag, w = e.result, ge(e, !0, t), x = e.input.charCodeAt(e.position), (f || e.line === r) && x === 58 && (c = !0, x = e.input.charCodeAt(++e.position), ge(e, !0, t), Xn(e, t, Fi, !1, !0), E = e.result), p ? Un(e, a, g, y, w, E, r, i, o) : c ? a.push(Un(e, null, g, y, w, E, r, i, o)) : a.push(w), ge(e, !0, t), x = e.input.charCodeAt(e.position), x === 44 ? (n = !0, x = e.input.charCodeAt(++e.position)) : n = !1;
  }
  H(e, "unexpected end of the stream within a flow collection");
}
function eE(e, t) {
  let n, r = Wo, i = !1, o = !1, s = t, a = 0, l = !1, h, c = e.input.charCodeAt(e.position);
  if (c === 124)
    n = !1;
  else if (c === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; c !== 0; )
    if (c = e.input.charCodeAt(++e.position), c === 43 || c === 45)
      Wo === r ? r = c === 43 ? Ml : ky : H(e, "repeat of a chomping mode identifier");
    else if ((h = Gy(c)) >= 0)
      h === 0 ? H(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? H(e, "repeat of an indentation width identifier") : (s = t + h - 1, o = !0);
    else
      break;
  if (At(c)) {
    do
      c = e.input.charCodeAt(++e.position);
    while (At(c));
    if (c === 35)
      do
        c = e.input.charCodeAt(++e.position);
      while (!gt(c) && c !== 0);
  }
  for (; c !== 0; ) {
    for (aa(e), e.lineIndent = 0, c = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && c === 32; )
      e.lineIndent++, c = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > s && (s = e.lineIndent), gt(c)) {
      a++;
      continue;
    }
    if (!o && s === 0 && H(e, "missing indentation for block scalar"), e.lineIndent < s) {
      r === Ml ? e.result += un.repeat(`
`, i ? 1 + a : a) : r === Wo && i && (e.result += `
`);
      break;
    }
    n ? At(c) ? (l = !0, e.result += un.repeat(`
`, i ? 1 + a : a)) : l ? (l = !1, e.result += un.repeat(`
`, a + 1)) : a === 0 ? i && (e.result += " ") : e.result += un.repeat(`
`, a) : e.result += un.repeat(`
`, i ? 1 + a : a), i = !0, o = !0, a = 0;
    const f = e.position;
    for (; !gt(c) && c !== 0; )
      c = e.input.charCodeAt(++e.position);
    Gt(e, f, e.position, !1);
  }
  return !0;
}
function Wl(e, t) {
  const n = e.tag, r = e.anchor, i = [];
  let o = !1;
  if (e.firstTabInLine !== -1) return !1;
  e.anchor !== null && dn(e, e.anchor, i);
  let s = e.input.charCodeAt(e.position);
  for (; s !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, H(e, "tab characters must not be used in indentation")), s === 45); ) {
    const a = e.input.charCodeAt(e.position + 1);
    if (!Ge(a))
      break;
    if (o = !0, e.position++, ge(e, !0, -1) && e.lineIndent <= t) {
      i.push(null), s = e.input.charCodeAt(e.position);
      continue;
    }
    const l = e.line;
    if (Xn(e, t, qf, !1, !0), i.push(e.result), ge(e, !0, -1), s = e.input.charCodeAt(e.position), (e.line === l || e.lineIndent > t) && s !== 0)
      H(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return o ? (e.tag = n, e.anchor = r, e.kind = "sequence", e.result = i, !0) : !1;
}
function Kf(e, t, n) {
  let r, i, o, s;
  const a = e.tag, l = e.anchor, h = {}, c = /* @__PURE__ */ Object.create(null);
  let f = null, p = null, g = null, w = !1, y = !1;
  if (e.firstTabInLine !== -1) return !1;
  e.anchor !== null && dn(e, e.anchor, h);
  let E = e.input.charCodeAt(e.position);
  for (; E !== 0; ) {
    !w && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, H(e, "tab characters must not be used in indentation"));
    const x = e.input.charCodeAt(e.position + 1), T = e.line;
    if ((E === 63 || E === 58) && Ge(x))
      E === 63 ? (w && (Un(e, h, c, f, p, null, i, o, s), f = p = g = null), y = !0, w = !0, r = !0) : w ? (w = !1, r = !0) : H(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, E = x;
    else {
      if (i = e.line, o = e.lineStart, s = e.position, !Xn(e, n, Hf, !1, !0))
        break;
      if (e.line === T) {
        for (E = e.input.charCodeAt(e.position); At(E); )
          E = e.input.charCodeAt(++e.position);
        if (E === 58)
          E = e.input.charCodeAt(++e.position), Ge(E) || H(e, "a whitespace character is expected after the key-value separator within a block mapping"), w && (Un(e, h, c, f, p, null, i, o, s), f = p = g = null), y = !0, w = !1, r = !1, f = e.tag, p = e.result;
        else if (y)
          H(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = a, e.anchor = l, !0;
      } else if (y)
        H(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = a, e.anchor = l, !0;
    }
    if ((e.line === T || e.lineIndent > t) && (w && (i = e.line, o = e.lineStart, s = e.position), Xn(e, t, Li, !0, r) && (w ? p = e.result : g = e.result), w || (Un(e, h, c, f, p, g, i, o, s), f = p = g = null), ge(e, !0, -1), E = e.input.charCodeAt(e.position)), (e.line === T || e.lineIndent > t) && E !== 0)
      H(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return w && Un(e, h, c, f, p, null, i, o, s), y && (e.tag = a, e.anchor = l, e.kind = "mapping", e.result = h), y;
}
function tE(e) {
  let t = !1, n = !1, r, i, o = e.input.charCodeAt(e.position);
  if (o !== 33) return !1;
  e.tag !== null && H(e, "duplication of a tag property"), o = e.input.charCodeAt(++e.position), o === 60 ? (t = !0, o = e.input.charCodeAt(++e.position)) : o === 33 ? (n = !0, r = "!!", o = e.input.charCodeAt(++e.position)) : r = "!";
  let s = e.position;
  if (t) {
    do
      o = e.input.charCodeAt(++e.position);
    while (o !== 0 && o !== 62);
    e.position < e.length ? (i = e.input.slice(s, e.position), o = e.input.charCodeAt(++e.position)) : H(e, "unexpected end of the stream within a verbatim tag");
  } else {
    for (; o !== 0 && !Ge(o); )
      o === 33 && (n ? H(e, "tag suffix cannot contain exclamation marks") : (r = e.input.slice(s - 1, e.position + 1), Gf.test(r) || H(e, "named tag handle cannot contain such characters"), n = !0, s = e.position + 1)), o = e.input.charCodeAt(++e.position);
    i = e.input.slice(s, e.position), By.test(i) && H(e, "tag suffix cannot contain flow indicator characters");
  }
  i && !zf.test(i) && H(e, "tag name cannot contain such characters: " + i);
  try {
    i = decodeURIComponent(i);
  } catch {
    H(e, "tag name is malformed: " + i);
  }
  return t ? e.tag = i : ot.call(e.tagMap, r) ? e.tag = e.tagMap[r] + i : r === "!" ? e.tag = "!" + i : r === "!!" ? e.tag = "tag:yaml.org,2002:" + i : H(e, 'undeclared tag handle "' + r + '"'), !0;
}
function nE(e) {
  let t = e.input.charCodeAt(e.position);
  if (t !== 38) return !1;
  e.anchor !== null && H(e, "duplication of an anchor property"), t = e.input.charCodeAt(++e.position);
  const n = e.position;
  for (; t !== 0 && !Ge(t) && !Ln(t); )
    t = e.input.charCodeAt(++e.position);
  return e.position === n && H(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function rE(e) {
  let t = e.input.charCodeAt(e.position);
  if (t !== 42) return !1;
  t = e.input.charCodeAt(++e.position);
  const n = e.position;
  for (; t !== 0 && !Ge(t) && !Ln(t); )
    t = e.input.charCodeAt(++e.position);
  e.position === n && H(e, "name of an alias node must contain at least one character");
  const r = e.input.slice(n, e.position);
  return ot.call(e.anchorMap, r) || H(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], ge(e, !0, -1), !0;
}
function iE(e, t, n, r) {
  const i = Jf(e);
  return Vy(e), Hl(e, t), e.tag = null, e.anchor = null, e.kind = null, e.result = null, Kf(e, n, r) && e.kind === "mapping" ? (Yy(e), !0) : (Xy(e), Hl(e, i), !1);
}
function Xn(e, t, n, r, i) {
  let o, s, a = 1, l = !1, h = !1, c = null, f, p, g;
  e.depth >= e.maxDepth && H(e, "nesting exceeded maxDepth (" + e.maxDepth + ")"), e.depth += 1, e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null;
  const w = o = s = Li === n || qf === n;
  if (r && ge(e, !0, -1) && (l = !0, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : e.lineIndent < t && (a = -1)), a === 1)
    for (; ; ) {
      const y = e.input.charCodeAt(e.position), E = Jf(e);
      if (l && (y === 33 && e.tag !== null || y === 38 && e.anchor !== null) || !tE(e) && !nE(e))
        break;
      c === null && (c = E), ge(e, !0, -1) ? (l = !0, s = w, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : e.lineIndent < t && (a = -1)) : s = !1;
    }
  if (s && (s = l || i), a === 1 || Li === n)
    if (Fi === n || Hf === n ? p = t : p = t + 1, g = e.position - e.lineStart, a === 1)
      if (s && (Wl(e, g) || Kf(e, g, p)) || Zy(e, p))
        h = !0;
      else {
        const y = e.input.charCodeAt(e.position);
        c !== null && w && !s && y !== 124 && y !== 62 && iE(
          e,
          c,
          c.position - c.lineStart,
          p
        ) || o && eE(e, p) || Ky(e, p) || Qy(e, p) ? h = !0 : rE(e) ? (h = !0, (e.tag !== null || e.anchor !== null) && H(e, "alias node should not have any properties")) : Jy(e, p, Fi === n) && (h = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && dn(e, e.anchor, e.result);
      }
    else a === 0 && (h = s && Wl(e, g));
  if (e.tag === null)
    e.anchor !== null && dn(e, e.anchor, e.result);
  else if (e.tag === "?") {
    e.result !== null && e.kind !== "scalar" && H(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"');
    for (let y = 0, E = e.implicitTypes.length; y < E; y += 1)
      if (f = e.implicitTypes[y], f.resolve(e.result)) {
        e.result = f.construct(e.result), e.tag = f.tag, e.anchor !== null && dn(e, e.anchor, e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (ot.call(e.typeMap[e.kind || "fallback"], e.tag))
      f = e.typeMap[e.kind || "fallback"][e.tag];
    else {
      f = null;
      const y = e.typeMap.multi[e.kind || "fallback"];
      for (let E = 0, x = y.length; E < x; E += 1)
        if (e.tag.slice(0, y[E].tag.length) === y[E].tag) {
          f = y[E];
          break;
        }
    }
    f || H(e, "unknown tag !<" + e.tag + ">"), e.result !== null && f.kind !== e.kind && H(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + f.kind + '", not "' + e.kind + '"'), f.resolve(e.result, e.tag) ? (e.result = f.construct(e.result, e.tag), e.anchor !== null && dn(e, e.anchor, e.result)) : H(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.depth -= 1, e.tag !== null || e.anchor !== null || h;
}
function oE(e) {
  const t = e.position;
  let n = !1, r;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (r = e.input.charCodeAt(e.position)) !== 0 && (ge(e, !0, -1), r = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || r !== 37)); ) {
    n = !0, r = e.input.charCodeAt(++e.position);
    let i = e.position;
    for (; r !== 0 && !Ge(r); )
      r = e.input.charCodeAt(++e.position);
    const o = e.input.slice(i, e.position), s = [];
    for (o.length < 1 && H(e, "directive name must not be less than one character in length"); r !== 0; ) {
      for (; At(r); )
        r = e.input.charCodeAt(++e.position);
      if (r === 35) {
        do
          r = e.input.charCodeAt(++e.position);
        while (r !== 0 && !gt(r));
        break;
      }
      if (gt(r)) break;
      for (i = e.position; r !== 0 && !Ge(r); )
        r = e.input.charCodeAt(++e.position);
      s.push(e.input.slice(i, e.position));
    }
    r !== 0 && aa(e), ot.call(ql, o) ? ql[o](e, o, s) : Ui(e, 'unknown document directive "' + o + '"');
  }
  if (ge(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, ge(e, !0, -1)) : n && H(e, "directives end mark is expected"), Xn(e, e.lineIndent - 1, Li, !1, !0), ge(e, !0, -1), e.checkLineBreaks && jy.test(e.input.slice(t, e.position)) && Ui(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Qi(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, ge(e, !0, -1));
    return;
  }
  e.position < e.length - 1 && H(e, "end of the stream or a document separator is expected");
}
function Qf(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  const n = new Wy(e, t), r = e.indexOf("\0");
  for (r !== -1 && (n.position = r, H(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    oE(n);
  return n.documents;
}
function sE(e, t, n) {
  t !== null && typeof t == "object" && typeof n > "u" && (n = t, t = null);
  const r = Qf(e, n);
  if (typeof t != "function")
    return r;
  for (let i = 0, o = r.length; i < o; i += 1)
    t(r[i]);
}
function aE(e, t) {
  const n = Qf(e, t);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new Bf("expected a single document in the stream, but found more");
  }
}
ia.loadAll = sE;
ia.load = aE;
var Zf = {};
const Zi = lt, Br = jr, lE = sa, ed = Object.prototype.toString, td = Object.prototype.hasOwnProperty, ca = 65279, cE = 9, Ar = 10, uE = 13, fE = 32, dE = 33, hE = 34, $s = 35, pE = 37, mE = 38, gE = 39, yE = 42, nd = 44, EE = 45, ki = 58, wE = 61, vE = 62, _E = 63, bE = 64, rd = 91, id = 93, xE = 96, od = 123, SE = 124, sd = 125, Le = {};
Le[0] = "\\0";
Le[7] = "\\a";
Le[8] = "\\b";
Le[9] = "\\t";
Le[10] = "\\n";
Le[11] = "\\v";
Le[12] = "\\f";
Le[13] = "\\r";
Le[27] = "\\e";
Le[34] = '\\"';
Le[92] = "\\\\";
Le[133] = "\\N";
Le[160] = "\\_";
Le[8232] = "\\L";
Le[8233] = "\\P";
const AE = [
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
], TE = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function CE(e, t) {
  if (t === null) return {};
  const n = {}, r = Object.keys(t);
  for (let i = 0, o = r.length; i < o; i += 1) {
    let s = r[i], a = String(t[s]);
    s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2));
    const l = e.compiledTypeMap.fallback[s];
    l && td.call(l.styleAliases, a) && (a = l.styleAliases[a]), n[s] = a;
  }
  return n;
}
function $E(e) {
  let t, n;
  const r = e.toString(16).toUpperCase();
  if (e <= 255)
    t = "x", n = 2;
  else if (e <= 65535)
    t = "u", n = 4;
  else if (e <= 4294967295)
    t = "U", n = 8;
  else
    throw new Br("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + t + Zi.repeat("0", n - r.length) + r;
}
const IE = 1, Tr = 2;
function OE(e) {
  this.schema = e.schema || lE, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Zi.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = CE(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Tr : IE, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Vl(e, t) {
  const n = Zi.repeat(" ", t);
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
function Is(e, t) {
  return `
` + Zi.repeat(" ", e.indent * t);
}
function RE(e, t) {
  for (let n = 0, r = e.implicitTypes.length; n < r; n += 1)
    if (e.implicitTypes[n].resolve(t))
      return !0;
  return !1;
}
function Mi(e) {
  return e === fE || e === cE;
}
function Cr(e) {
  return e >= 32 && e <= 126 || e >= 161 && e <= 55295 && e !== 8232 && e !== 8233 || e >= 57344 && e <= 65533 && e !== ca || e >= 65536 && e <= 1114111;
}
function Yl(e) {
  return Cr(e) && e !== ca && // - b-char
  e !== uE && e !== Ar;
}
function Xl(e, t, n) {
  const r = Yl(e), i = r && !Mi(e);
  return (
    // ns-plain-safe
    (n ? r : r && // - c-flow-indicator
    e !== nd && e !== rd && e !== id && e !== od && e !== sd) && // ns-plain-char
    e !== $s && // false on '#'
    !(t === ki && !i) || // false on ': '
    Yl(t) && !Mi(t) && e === $s || // change to true on '[^ ]#'
    t === ki && i
  );
}
function DE(e) {
  return Cr(e) && e !== ca && !Mi(e) && // - s-white
  // - (c-indicator ::=
  // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
  e !== EE && e !== _E && e !== ki && e !== nd && e !== rd && e !== id && e !== od && e !== sd && // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
  e !== $s && e !== mE && e !== yE && e !== dE && e !== SE && e !== wE && e !== vE && e !== gE && e !== hE && // | “%” | “@” | “`”)
  e !== pE && e !== bE && e !== xE;
}
function PE(e) {
  return !Mi(e) && e !== ki;
}
function hr(e, t) {
  const n = e.charCodeAt(t);
  let r;
  return n >= 55296 && n <= 56319 && t + 1 < e.length && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (n - 55296) * 1024 + r - 56320 + 65536 : n;
}
function ad(e) {
  return /^\n* /.test(e);
}
const ld = 1, Os = 2, cd = 3, ud = 4, Pn = 5;
function NE(e, t, n, r, i, o, s, a) {
  let l, h = 0, c = null, f = !1, p = !1;
  const g = r !== -1;
  let w = -1, y = DE(hr(e, 0)) && PE(hr(e, e.length - 1));
  if (t || s)
    for (l = 0; l < e.length; h >= 65536 ? l += 2 : l++) {
      if (h = hr(e, l), !Cr(h))
        return Pn;
      y = y && Xl(h, c, a), c = h;
    }
  else {
    for (l = 0; l < e.length; h >= 65536 ? l += 2 : l++) {
      if (h = hr(e, l), h === Ar)
        f = !0, g && (p = p || // Foldable line = too long, and not more-indented.
        l - w - 1 > r && e[w + 1] !== " ", w = l);
      else if (!Cr(h))
        return Pn;
      y = y && Xl(h, c, a), c = h;
    }
    p = p || g && l - w - 1 > r && e[w + 1] !== " ";
  }
  return !f && !p ? y && !s && !i(e) ? ld : o === Tr ? Pn : Os : n > 9 && ad(e) ? Pn : s ? o === Tr ? Pn : Os : p ? ud : cd;
}
function FE(e, t, n, r, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Tr ? '""' : "''";
    if (!e.noCompatMode && (AE.indexOf(t) !== -1 || TE.test(t)))
      return e.quotingType === Tr ? '"' + t + '"' : "'" + t + "'";
    const o = e.indent * Math.max(1, n), s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), a = r || // No block styles in flow mode.
    e.flowLevel > -1 && n >= e.flowLevel;
    function l(h) {
      return RE(e, h);
    }
    switch (NE(
      t,
      a,
      e.indent,
      s,
      l,
      e.quotingType,
      e.forceQuotes && !r,
      i
    )) {
      case ld:
        return t;
      case Os:
        return "'" + t.replace(/'/g, "''") + "'";
      case cd:
        return "|" + Jl(t, e.indent) + Kl(Vl(t, o));
      case ud:
        return ">" + Jl(t, e.indent) + Kl(Vl(LE(t, s), o));
      case Pn:
        return '"' + UE(t) + '"';
      default:
        throw new Br("impossible error: invalid scalar style");
    }
  }();
}
function Jl(e, t) {
  const n = ad(e) ? String(t) : "", r = e[e.length - 1] === `
`, o = r && (e[e.length - 2] === `
` || e === `
`) ? "+" : r ? "" : "-";
  return n + o + `
`;
}
function Kl(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function LE(e, t) {
  const n = /(\n+)([^\n]*)/g;
  let r = function() {
    let a = e.indexOf(`
`);
    return a = a !== -1 ? a : e.length, n.lastIndex = a, Ql(e.slice(0, a), t);
  }(), i = e[0] === `
` || e[0] === " ", o, s;
  for (; s = n.exec(e); ) {
    const a = s[1], l = s[2];
    o = l[0] === " ", r += a + (!i && !o && l !== "" ? `
` : "") + Ql(l, t), i = o;
  }
  return r;
}
function Ql(e, t) {
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
function UE(e) {
  let t = "", n = 0;
  for (let r = 0; r < e.length; n >= 65536 ? r += 2 : r++) {
    n = hr(e, r);
    const i = Le[n];
    !i && Cr(n) ? (t += e[r], n >= 65536 && (t += e[r + 1])) : t += i || $E(n);
  }
  return t;
}
function kE(e, t, n) {
  let r = "";
  const i = e.tag;
  for (let o = 0, s = n.length; o < s; o += 1) {
    let a = n[o];
    e.replacer && (a = e.replacer.call(n, String(o), a)), (Ct(e, t, a, !1, !1) || typeof a > "u" && Ct(e, t, null, !1, !1)) && (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
  }
  e.tag = i, e.dump = "[" + r + "]";
}
function Zl(e, t, n, r) {
  let i = "";
  const o = e.tag;
  for (let s = 0, a = n.length; s < a; s += 1) {
    let l = n[s];
    e.replacer && (l = e.replacer.call(n, String(s), l)), (Ct(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && Ct(e, t + 1, null, !0, !0, !1, !0)) && ((!r || i !== "") && (i += Is(e, t)), e.dump && Ar === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  }
  e.tag = o, e.dump = i || "[]";
}
function ME(e, t, n) {
  let r = "";
  const i = e.tag, o = Object.keys(n);
  for (let s = 0, a = o.length; s < a; s += 1) {
    let l = "";
    r !== "" && (l += ", "), e.condenseFlow && (l += '"');
    const h = o[s];
    let c = n[h];
    e.replacer && (c = e.replacer.call(n, h, c)), Ct(e, t, h, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Ct(e, t, c, !1, !1) && (l += e.dump, r += l));
  }
  e.tag = i, e.dump = "{" + r + "}";
}
function jE(e, t, n, r) {
  let i = "";
  const o = e.tag, s = Object.keys(n);
  if (e.sortKeys === !0)
    s.sort();
  else if (typeof e.sortKeys == "function")
    s.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Br("sortKeys must be a boolean or a function");
  for (let a = 0, l = s.length; a < l; a += 1) {
    let h = "";
    (!r || i !== "") && (h += Is(e, t));
    const c = s[a];
    let f = n[c];
    if (e.replacer && (f = e.replacer.call(n, c, f)), !Ct(e, t + 1, c, !0, !0, !0))
      continue;
    const p = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024;
    p && (e.dump && Ar === e.dump.charCodeAt(0) ? h += "?" : h += "? "), h += e.dump, p && (h += Is(e, t)), Ct(e, t + 1, f, !0, p) && (e.dump && Ar === e.dump.charCodeAt(0) ? h += ":" : h += ": ", h += e.dump, i += h);
  }
  e.tag = o, e.dump = i || "{}";
}
function ec(e, t, n) {
  const r = n ? e.explicitTypes : e.implicitTypes;
  for (let i = 0, o = r.length; i < o; i += 1) {
    const s = r[i];
    if ((s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (n ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        const a = e.styleMap[s.tag] || s.defaultStyle;
        let l;
        if (ed.call(s.represent) === "[object Function]")
          l = s.represent(t, a);
        else if (td.call(s.represent, a))
          l = s.represent[a](t, a);
        else
          throw new Br("!<" + s.tag + '> tag resolver accepts not "' + a + '" style');
        e.dump = l;
      }
      return !0;
    }
  }
  return !1;
}
function Ct(e, t, n, r, i, o, s) {
  e.tag = null, e.dump = n, ec(e, n, !1) || ec(e, n, !0);
  const a = ed.call(e.dump), l = r;
  r && (r = e.flowLevel < 0 || e.flowLevel > t);
  const h = a === "[object Object]" || a === "[object Array]";
  let c, f;
  if (h && (c = e.duplicates.indexOf(n), f = c !== -1), (e.tag !== null && e.tag !== "?" || f || e.indent !== 2 && t > 0) && (i = !1), f && e.usedDuplicates[c])
    e.dump = "*ref_" + c;
  else {
    if (h && f && !e.usedDuplicates[c] && (e.usedDuplicates[c] = !0), a === "[object Object]")
      r && Object.keys(e.dump).length !== 0 ? (jE(e, t, e.dump, i), f && (e.dump = "&ref_" + c + e.dump)) : (ME(e, t, e.dump), f && (e.dump = "&ref_" + c + " " + e.dump));
    else if (a === "[object Array]")
      r && e.dump.length !== 0 ? (e.noArrayIndent && !s && t > 0 ? Zl(e, t - 1, e.dump, i) : Zl(e, t, e.dump, i), f && (e.dump = "&ref_" + c + e.dump)) : (kE(e, t, e.dump), f && (e.dump = "&ref_" + c + " " + e.dump));
    else if (a === "[object String]")
      e.tag !== "?" && FE(e, e.dump, t, o, l);
    else {
      if (a === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new Br("unacceptable kind of an object to dump " + a);
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
function BE(e, t) {
  const n = [], r = [];
  Rs(e, n, r);
  const i = r.length;
  for (let o = 0; o < i; o += 1)
    t.duplicates.push(n[r[o]]);
  t.usedDuplicates = new Array(i);
}
function Rs(e, t, n) {
  if (e !== null && typeof e == "object") {
    const r = t.indexOf(e);
    if (r !== -1)
      n.indexOf(r) === -1 && n.push(r);
    else if (t.push(e), Array.isArray(e))
      for (let i = 0, o = e.length; i < o; i += 1)
        Rs(e[i], t, n);
    else {
      const i = Object.keys(e);
      for (let o = 0, s = i.length; o < s; o += 1)
        Rs(e[i[o]], t, n);
    }
  }
}
function HE(e, t) {
  t = t || {};
  const n = new OE(t);
  n.noRefs || BE(e, n);
  let r = e;
  return n.replacer && (r = n.replacer.call({ "": r }, "", r)), Ct(n, 0, r, !0, !0) ? n.dump + `
` : "";
}
Zf.dump = HE;
const fd = ia, qE = Zf;
function ua(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
$e.Type = Be;
$e.Schema = _f;
$e.FAILSAFE_SCHEMA = Af;
$e.JSON_SCHEMA = Rf;
$e.CORE_SCHEMA = Df;
$e.DEFAULT_SCHEMA = sa;
$e.load = fd.load;
$e.loadAll = fd.loadAll;
$e.dump = qE.dump;
$e.YAMLException = jr;
$e.types = {
  binary: Uf,
  float: Of,
  map: Sf,
  null: Tf,
  pairs: Mf,
  set: jf,
  timestamp: Ff,
  bool: Cf,
  int: $f,
  merge: Lf,
  omap: kf,
  seq: xf,
  str: bf
};
$e.safeLoad = ua("safeLoad", "load");
$e.safeLoadAll = ua("safeLoadAll", "loadAll");
$e.safeDump = ua("safeDump", "dump");
var eo = {};
Object.defineProperty(eo, "__esModule", { value: !0 });
eo.Lazy = void 0;
class GE {
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
eo.Lazy = GE;
var Ds = { exports: {} };
const zE = "2.0.0", dd = 256, WE = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, VE = 16, YE = dd - 6, XE = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var to = {
  MAX_LENGTH: dd,
  MAX_SAFE_COMPONENT_LENGTH: VE,
  MAX_SAFE_BUILD_LENGTH: YE,
  MAX_SAFE_INTEGER: WE,
  RELEASE_TYPES: XE,
  SEMVER_SPEC_VERSION: zE,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const JE = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var no = JE;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: r,
    MAX_LENGTH: i
  } = to, o = no;
  t = e.exports = {};
  const s = t.re = [], a = t.safeRe = [], l = t.src = [], h = t.safeSrc = [], c = t.t = {};
  let f = 0;
  const p = "[a-zA-Z0-9-]", g = [
    ["\\s", 1],
    ["\\d", i],
    [p, r]
  ], w = (E) => {
    for (const [x, T] of g)
      E = E.split(`${x}*`).join(`${x}{0,${T}}`).split(`${x}+`).join(`${x}{1,${T}}`);
    return E;
  }, y = (E, x, T) => {
    const N = w(x), k = f++;
    o(E, k, x), c[E] = k, l[k] = x, h[k] = N, s[k] = new RegExp(x, T ? "g" : void 0), a[k] = new RegExp(N, T ? "g" : void 0);
  };
  y("NUMERICIDENTIFIER", "0|[1-9]\\d*"), y("NUMERICIDENTIFIERLOOSE", "\\d+"), y("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${p}*`), y("MAINVERSION", `(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})`), y("MAINVERSIONLOOSE", `(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASEIDENTIFIER", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIER]})`), y("PRERELEASEIDENTIFIERLOOSE", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIERLOOSE]})`), y("PRERELEASE", `(?:-(${l[c.PRERELEASEIDENTIFIER]}(?:\\.${l[c.PRERELEASEIDENTIFIER]})*))`), y("PRERELEASELOOSE", `(?:-?(${l[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[c.PRERELEASEIDENTIFIERLOOSE]})*))`), y("BUILDIDENTIFIER", `${p}+`), y("BUILD", `(?:\\+(${l[c.BUILDIDENTIFIER]}(?:\\.${l[c.BUILDIDENTIFIER]})*))`), y("FULLPLAIN", `v?${l[c.MAINVERSION]}${l[c.PRERELEASE]}?${l[c.BUILD]}?`), y("FULL", `^${l[c.FULLPLAIN]}$`), y("LOOSEPLAIN", `[v=\\s]*${l[c.MAINVERSIONLOOSE]}${l[c.PRERELEASELOOSE]}?${l[c.BUILD]}?`), y("LOOSE", `^${l[c.LOOSEPLAIN]}$`), y("GTLT", "((?:<|>)?=?)"), y("XRANGEIDENTIFIERLOOSE", `${l[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), y("XRANGEIDENTIFIER", `${l[c.NUMERICIDENTIFIER]}|x|X|\\*`), y("XRANGEPLAIN", `[v=\\s]*(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:${l[c.PRERELEASE]})?${l[c.BUILD]}?)?)?`), y("XRANGEPLAINLOOSE", `[v=\\s]*(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:${l[c.PRERELEASELOOSE]})?${l[c.BUILD]}?)?)?`), y("XRANGE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAIN]}$`), y("XRANGELOOSE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAINLOOSE]}$`), y("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), y("COERCE", `${l[c.COERCEPLAIN]}(?:$|[^\\d])`), y("COERCEFULL", l[c.COERCEPLAIN] + `(?:${l[c.PRERELEASE]})?(?:${l[c.BUILD]})?(?:$|[^\\d])`), y("COERCERTL", l[c.COERCE], !0), y("COERCERTLFULL", l[c.COERCEFULL], !0), y("LONETILDE", "(?:~>?)"), y("TILDETRIM", `(\\s*)${l[c.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", y("TILDE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAIN]}$`), y("TILDELOOSE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAINLOOSE]}$`), y("LONECARET", "(?:\\^)"), y("CARETTRIM", `(\\s*)${l[c.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", y("CARET", `^${l[c.LONECARET]}${l[c.XRANGEPLAIN]}$`), y("CARETLOOSE", `^${l[c.LONECARET]}${l[c.XRANGEPLAINLOOSE]}$`), y("COMPARATORLOOSE", `^${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]})$|^$`), y("COMPARATOR", `^${l[c.GTLT]}\\s*(${l[c.FULLPLAIN]})$|^$`), y("COMPARATORTRIM", `(\\s*)${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]}|${l[c.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", y("HYPHENRANGE", `^\\s*(${l[c.XRANGEPLAIN]})\\s+-\\s+(${l[c.XRANGEPLAIN]})\\s*$`), y("HYPHENRANGELOOSE", `^\\s*(${l[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[c.XRANGEPLAINLOOSE]})\\s*$`), y("STAR", "(<|>)?=?\\s*\\*"), y("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), y("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Ds, Ds.exports);
var Hr = Ds.exports;
const KE = Object.freeze({ loose: !0 }), QE = Object.freeze({}), ZE = (e) => e ? typeof e != "object" ? KE : e : QE;
var fa = ZE;
const tc = /^[0-9]+$/, hd = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const n = tc.test(e), r = tc.test(t);
  return n && r && (e = +e, t = +t), e === t ? 0 : n && !r ? -1 : r && !n ? 1 : e < t ? -1 : 1;
}, ew = (e, t) => hd(t, e);
var pd = {
  compareIdentifiers: hd,
  rcompareIdentifiers: ew
};
const fi = no, { MAX_LENGTH: nc, MAX_SAFE_INTEGER: di } = to, { safeRe: hi, t: pi } = Hr, tw = fa, { compareIdentifiers: Vo } = pd;
let nw = class ht {
  constructor(t, n) {
    if (n = tw(n), t instanceof ht) {
      if (t.loose === !!n.loose && t.includePrerelease === !!n.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > nc)
      throw new TypeError(
        `version is longer than ${nc} characters`
      );
    fi("SemVer", t, n), this.options = n, this.loose = !!n.loose, this.includePrerelease = !!n.includePrerelease;
    const r = t.trim().match(n.loose ? hi[pi.LOOSE] : hi[pi.FULL]);
    if (!r)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +r[1], this.minor = +r[2], this.patch = +r[3], this.major > di || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > di || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > di || this.patch < 0)
      throw new TypeError("Invalid patch version");
    r[4] ? this.prerelease = r[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < di)
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
    if (fi("SemVer.compare", this.version, this.options, t), !(t instanceof ht)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new ht(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof ht || (t = new ht(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof ht || (t = new ht(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let n = 0;
    do {
      const r = this.prerelease[n], i = t.prerelease[n];
      if (fi("prerelease compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return Vo(r, i);
    } while (++n);
  }
  compareBuild(t) {
    t instanceof ht || (t = new ht(t, this.options));
    let n = 0;
    do {
      const r = this.build[n], i = t.build[n];
      if (fi("build compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return Vo(r, i);
    } while (++n);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, n, r) {
    if (t.startsWith("pre")) {
      if (!n && r === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (n) {
        const i = `-${n}`.match(this.options.loose ? hi[pi.PRERELEASELOOSE] : hi[pi.PRERELEASE]);
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
          r === !1 && (o = [n]), Vo(this.prerelease[0], n) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var He = nw;
const rc = He, rw = (e, t, n = !1) => {
  if (e instanceof rc)
    return e;
  try {
    return new rc(e, t);
  } catch (r) {
    if (!n)
      return null;
    throw r;
  }
};
var Zn = rw;
const iw = Zn, ow = (e, t) => {
  const n = iw(e, t);
  return n ? n.version : null;
};
var sw = ow;
const aw = Zn, lw = (e, t) => {
  const n = aw(e.trim().replace(/^[=v]+/, ""), t);
  return n ? n.version : null;
};
var cw = lw;
const ic = He, uw = (e, t, n, r, i) => {
  typeof n == "string" && (i = r, r = n, n = void 0);
  try {
    return new ic(
      e instanceof ic ? e.version : e,
      n
    ).inc(t, r, i).version;
  } catch {
    return null;
  }
};
var fw = uw;
const oc = Zn, dw = (e, t) => {
  const n = oc(e, null, !0), r = oc(t, null, !0), i = n.compare(r);
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
var hw = dw;
const pw = He, mw = (e, t) => new pw(e, t).major;
var gw = mw;
const yw = He, Ew = (e, t) => new yw(e, t).minor;
var ww = Ew;
const vw = He, _w = (e, t) => new vw(e, t).patch;
var bw = _w;
const xw = Zn, Sw = (e, t) => {
  const n = xw(e, t);
  return n && n.prerelease.length ? n.prerelease : null;
};
var Aw = Sw;
const sc = He, Tw = (e, t, n) => new sc(e, n).compare(new sc(t, n));
var ct = Tw;
const Cw = ct, $w = (e, t, n) => Cw(t, e, n);
var Iw = $w;
const Ow = ct, Rw = (e, t) => Ow(e, t, !0);
var Dw = Rw;
const ac = He, Pw = (e, t, n) => {
  const r = new ac(e, n), i = new ac(t, n);
  return r.compare(i) || r.compareBuild(i);
};
var da = Pw;
const Nw = da, Fw = (e, t) => e.sort((n, r) => Nw(n, r, t));
var Lw = Fw;
const Uw = da, kw = (e, t) => e.sort((n, r) => Uw(r, n, t));
var Mw = kw;
const jw = ct, Bw = (e, t, n) => jw(e, t, n) > 0;
var ro = Bw;
const Hw = ct, qw = (e, t, n) => Hw(e, t, n) < 0;
var ha = qw;
const Gw = ct, zw = (e, t, n) => Gw(e, t, n) === 0;
var md = zw;
const Ww = ct, Vw = (e, t, n) => Ww(e, t, n) !== 0;
var gd = Vw;
const Yw = ct, Xw = (e, t, n) => Yw(e, t, n) >= 0;
var pa = Xw;
const Jw = ct, Kw = (e, t, n) => Jw(e, t, n) <= 0;
var ma = Kw;
const Qw = md, Zw = gd, ev = ro, tv = pa, nv = ha, rv = ma, iv = (e, t, n, r) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e === n;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e !== n;
    case "":
    case "=":
    case "==":
      return Qw(e, n, r);
    case "!=":
      return Zw(e, n, r);
    case ">":
      return ev(e, n, r);
    case ">=":
      return tv(e, n, r);
    case "<":
      return nv(e, n, r);
    case "<=":
      return rv(e, n, r);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var yd = iv;
const ov = He, sv = Zn, { safeRe: mi, t: gi } = Hr, av = (e, t) => {
  if (e instanceof ov)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let n = null;
  if (!t.rtl)
    n = e.match(t.includePrerelease ? mi[gi.COERCEFULL] : mi[gi.COERCE]);
  else {
    const l = t.includePrerelease ? mi[gi.COERCERTLFULL] : mi[gi.COERCERTL];
    let h;
    for (; (h = l.exec(e)) && (!n || n.index + n[0].length !== e.length); )
      (!n || h.index + h[0].length !== n.index + n[0].length) && (n = h), l.lastIndex = h.index + h[1].length + h[2].length;
    l.lastIndex = -1;
  }
  if (n === null)
    return null;
  const r = n[2], i = n[3] || "0", o = n[4] || "0", s = t.includePrerelease && n[5] ? `-${n[5]}` : "", a = t.includePrerelease && n[6] ? `+${n[6]}` : "";
  return sv(`${r}.${i}.${o}${s}${a}`, t);
};
var lv = av;
class cv {
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
var uv = cv, Yo, lc;
function ut() {
  if (lc) return Yo;
  lc = 1;
  const e = /\s+/g;
  class t {
    constructor(I, P) {
      if (P = i(P), I instanceof t)
        return I.loose === !!P.loose && I.includePrerelease === !!P.includePrerelease ? I : new t(I.raw, P);
      if (I instanceof o)
        return this.raw = I.value, this.set = [[I]], this.formatted = void 0, this;
      if (this.options = P, this.loose = !!P.loose, this.includePrerelease = !!P.includePrerelease, this.raw = I.trim().replace(e, " "), this.set = this.raw.split("||").map((C) => this.parseRange(C.trim())).filter((C) => C.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const C = this.set[0];
        if (this.set = this.set.filter((F) => !y(F[0])), this.set.length === 0)
          this.set = [C];
        else if (this.set.length > 1) {
          for (const F of this.set)
            if (F.length === 1 && E(F[0])) {
              this.set = [F];
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
          const P = this.set[I];
          for (let C = 0; C < P.length; C++)
            C > 0 && (this.formatted += " "), this.formatted += P[C].toString().trim();
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
      const C = ((this.options.includePrerelease && g) | (this.options.loose && w)) + ":" + I, F = r.get(C);
      if (F)
        return F;
      const A = this.options.loose, L = A ? l[h.HYPHENRANGELOOSE] : l[h.HYPHENRANGE];
      I = I.replace(L, Z(this.options.includePrerelease)), s("hyphen replace", I), I = I.replace(l[h.COMPARATORTRIM], c), s("comparator trim", I), I = I.replace(l[h.TILDETRIM], f), s("tilde trim", I), I = I.replace(l[h.CARETTRIM], p), s("caret trim", I);
      let j = I.split(" ").map((M) => T(M, this.options)).join(" ").split(/\s+/).map((M) => V(M, this.options));
      A && (j = j.filter((M) => (s("loose invalid filter", M, this.options), !!M.match(l[h.COMPARATORLOOSE])))), s("range list", j);
      const R = /* @__PURE__ */ new Map(), z = j.map((M) => new o(M, this.options));
      for (const M of z) {
        if (y(M))
          return [M];
        R.set(M.value, M);
      }
      R.size > 1 && R.has("") && R.delete("");
      const J = [...R.values()];
      return r.set(C, J), J;
    }
    intersects(I, P) {
      if (!(I instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some((C) => x(C, P) && I.set.some((F) => x(F, P) && C.every((A) => F.every((L) => A.intersects(L, P)))));
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
      for (let P = 0; P < this.set.length; P++)
        if (oe(this.set[P], I, this.options))
          return !0;
      return !1;
    }
  }
  Yo = t;
  const n = uv, r = new n(), i = fa, o = io(), s = no, a = He, {
    safeRe: l,
    t: h,
    comparatorTrimReplace: c,
    tildeTrimReplace: f,
    caretTrimReplace: p
  } = Hr, { FLAG_INCLUDE_PRERELEASE: g, FLAG_LOOSE: w } = to, y = (D) => D.value === "<0.0.0-0", E = (D) => D.value === "", x = (D, I) => {
    let P = !0;
    const C = D.slice();
    let F = C.pop();
    for (; P && C.length; )
      P = C.every((A) => F.intersects(A, I)), F = C.pop();
    return P;
  }, T = (D, I) => (D = D.replace(l[h.BUILD], ""), s("comp", D, I), D = Y(D, I), s("caret", D), D = k(D, I), s("tildes", D), D = ne(D, I), s("xrange", D), D = v(D, I), s("stars", D), D), N = (D) => !D || D.toLowerCase() === "x" || D === "*", k = (D, I) => D.trim().split(/\s+/).map((P) => W(P, I)).join(" "), W = (D, I) => {
    const P = I.loose ? l[h.TILDELOOSE] : l[h.TILDE];
    return D.replace(P, (C, F, A, L, j) => {
      s("tilde", D, C, F, A, L, j);
      let R;
      return N(F) ? R = "" : N(A) ? R = `>=${F}.0.0 <${+F + 1}.0.0-0` : N(L) ? R = `>=${F}.${A}.0 <${F}.${+A + 1}.0-0` : j ? (s("replaceTilde pr", j), R = `>=${F}.${A}.${L}-${j} <${F}.${+A + 1}.0-0`) : R = `>=${F}.${A}.${L} <${F}.${+A + 1}.0-0`, s("tilde return", R), R;
    });
  }, Y = (D, I) => D.trim().split(/\s+/).map((P) => Q(P, I)).join(" "), Q = (D, I) => {
    s("caret", D, I);
    const P = I.loose ? l[h.CARETLOOSE] : l[h.CARET], C = I.includePrerelease ? "-0" : "";
    return D.replace(P, (F, A, L, j, R) => {
      s("caret", D, F, A, L, j, R);
      let z;
      return N(A) ? z = "" : N(L) ? z = `>=${A}.0.0${C} <${+A + 1}.0.0-0` : N(j) ? A === "0" ? z = `>=${A}.${L}.0${C} <${A}.${+L + 1}.0-0` : z = `>=${A}.${L}.0${C} <${+A + 1}.0.0-0` : R ? (s("replaceCaret pr", R), A === "0" ? L === "0" ? z = `>=${A}.${L}.${j}-${R} <${A}.${L}.${+j + 1}-0` : z = `>=${A}.${L}.${j}-${R} <${A}.${+L + 1}.0-0` : z = `>=${A}.${L}.${j}-${R} <${+A + 1}.0.0-0`) : (s("no pr"), A === "0" ? L === "0" ? z = `>=${A}.${L}.${j}${C} <${A}.${L}.${+j + 1}-0` : z = `>=${A}.${L}.${j}${C} <${A}.${+L + 1}.0-0` : z = `>=${A}.${L}.${j} <${+A + 1}.0.0-0`), s("caret return", z), z;
    });
  }, ne = (D, I) => (s("replaceXRanges", D, I), D.split(/\s+/).map((P) => q(P, I)).join(" ")), q = (D, I) => {
    D = D.trim();
    const P = I.loose ? l[h.XRANGELOOSE] : l[h.XRANGE];
    return D.replace(P, (C, F, A, L, j, R) => {
      s("xRange", D, C, F, A, L, j, R);
      const z = N(A), J = z || N(L), M = J || N(j), ee = M;
      return F === "=" && ee && (F = ""), R = I.includePrerelease ? "-0" : "", z ? F === ">" || F === "<" ? C = "<0.0.0-0" : C = "*" : F && ee ? (J && (L = 0), j = 0, F === ">" ? (F = ">=", J ? (A = +A + 1, L = 0, j = 0) : (L = +L + 1, j = 0)) : F === "<=" && (F = "<", J ? A = +A + 1 : L = +L + 1), F === "<" && (R = "-0"), C = `${F + A}.${L}.${j}${R}`) : J ? C = `>=${A}.0.0${R} <${+A + 1}.0.0-0` : M && (C = `>=${A}.${L}.0${R} <${A}.${+L + 1}.0-0`), s("xRange return", C), C;
    });
  }, v = (D, I) => (s("replaceStars", D, I), D.trim().replace(l[h.STAR], "")), V = (D, I) => (s("replaceGTE0", D, I), D.trim().replace(l[I.includePrerelease ? h.GTE0PRE : h.GTE0], "")), Z = (D) => (I, P, C, F, A, L, j, R, z, J, M, ee) => (N(C) ? P = "" : N(F) ? P = `>=${C}.0.0${D ? "-0" : ""}` : N(A) ? P = `>=${C}.${F}.0${D ? "-0" : ""}` : L ? P = `>=${P}` : P = `>=${P}${D ? "-0" : ""}`, N(z) ? R = "" : N(J) ? R = `<${+z + 1}.0.0-0` : N(M) ? R = `<${z}.${+J + 1}.0-0` : ee ? R = `<=${z}.${J}.${M}-${ee}` : D ? R = `<${z}.${J}.${+M + 1}-0` : R = `<=${R}`, `${P} ${R}`.trim()), oe = (D, I, P) => {
    for (let C = 0; C < D.length; C++)
      if (!D[C].test(I))
        return !1;
    if (I.prerelease.length && !P.includePrerelease) {
      for (let C = 0; C < D.length; C++)
        if (s(D[C].semver), D[C].semver !== o.ANY && D[C].semver.prerelease.length > 0) {
          const F = D[C].semver;
          if (F.major === I.major && F.minor === I.minor && F.patch === I.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Yo;
}
var Xo, cc;
function io() {
  if (cc) return Xo;
  cc = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(c, f) {
      if (f = n(f), c instanceof t) {
        if (c.loose === !!f.loose)
          return c;
        c = c.value;
      }
      c = c.trim().split(/\s+/).join(" "), s("comparator", c, f), this.options = f, this.loose = !!f.loose, this.parse(c), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, s("comp", this);
    }
    parse(c) {
      const f = this.options.loose ? r[i.COMPARATORLOOSE] : r[i.COMPARATOR], p = c.match(f);
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
    intersects(c, f) {
      if (!(c instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new l(c.value, f).test(this.value) : c.operator === "" ? c.value === "" ? !0 : new l(this.value, f).test(c.semver) : (f = n(f), f.includePrerelease && (this.value === "<0.0.0-0" || c.value === "<0.0.0-0") || !f.includePrerelease && (this.value.startsWith("<0.0.0") || c.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && c.operator.startsWith(">") || this.operator.startsWith("<") && c.operator.startsWith("<") || this.semver.version === c.semver.version && this.operator.includes("=") && c.operator.includes("=") || o(this.semver, "<", c.semver, f) && this.operator.startsWith(">") && c.operator.startsWith("<") || o(this.semver, ">", c.semver, f) && this.operator.startsWith("<") && c.operator.startsWith(">")));
    }
  }
  Xo = t;
  const n = fa, { safeRe: r, t: i } = Hr, o = yd, s = no, a = He, l = ut();
  return Xo;
}
const fv = ut(), dv = (e, t, n) => {
  try {
    t = new fv(t, n);
  } catch {
    return !1;
  }
  return t.test(e);
};
var oo = dv;
const hv = ut(), pv = (e, t) => new hv(e, t).set.map((n) => n.map((r) => r.value).join(" ").trim().split(" "));
var mv = pv;
const gv = He, yv = ut(), Ev = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new yv(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!r || i.compare(s) === -1) && (r = s, i = new gv(r, n));
  }), r;
};
var wv = Ev;
const vv = He, _v = ut(), bv = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new _v(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!r || i.compare(s) === 1) && (r = s, i = new vv(r, n));
  }), r;
};
var xv = bv;
const Jo = He, Sv = ut(), uc = ro, Av = (e, t) => {
  e = new Sv(e, t);
  let n = new Jo("0.0.0");
  if (e.test(n) || (n = new Jo("0.0.0-0"), e.test(n)))
    return n;
  n = null;
  for (let r = 0; r < e.set.length; ++r) {
    const i = e.set[r];
    let o = null;
    i.forEach((s) => {
      const a = new Jo(s.semver.version);
      switch (s.operator) {
        case ">":
          a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), a.raw = a.format();
        case "":
        case ">=":
          (!o || uc(a, o)) && (o = a);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${s.operator}`);
      }
    }), o && (!n || uc(n, o)) && (n = o);
  }
  return n && e.test(n) ? n : null;
};
var Tv = Av;
const Cv = ut(), $v = (e, t) => {
  try {
    return new Cv(e, t).range || "*";
  } catch {
    return null;
  }
};
var Iv = $v;
const Ov = He, Ed = io(), { ANY: Rv } = Ed, Dv = ut(), Pv = oo, fc = ro, dc = ha, Nv = ma, Fv = pa, Lv = (e, t, n, r) => {
  e = new Ov(e, r), t = new Dv(t, r);
  let i, o, s, a, l;
  switch (n) {
    case ">":
      i = fc, o = Nv, s = dc, a = ">", l = ">=";
      break;
    case "<":
      i = dc, o = Fv, s = fc, a = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (Pv(e, t, r))
    return !1;
  for (let h = 0; h < t.set.length; ++h) {
    const c = t.set[h];
    let f = null, p = null;
    if (c.forEach((g) => {
      g.semver === Rv && (g = new Ed(">=0.0.0")), f = f || g, p = p || g, i(g.semver, f.semver, r) ? f = g : s(g.semver, p.semver, r) && (p = g);
    }), f.operator === a || f.operator === l || (!p.operator || p.operator === a) && o(e, p.semver))
      return !1;
    if (p.operator === l && s(e, p.semver))
      return !1;
  }
  return !0;
};
var ga = Lv;
const Uv = ga, kv = (e, t, n) => Uv(e, t, ">", n);
var Mv = kv;
const jv = ga, Bv = (e, t, n) => jv(e, t, "<", n);
var Hv = Bv;
const hc = ut(), qv = (e, t, n) => (e = new hc(e, n), t = new hc(t, n), e.intersects(t, n));
var Gv = qv;
const zv = oo, Wv = ct;
var Vv = (e, t, n) => {
  const r = [];
  let i = null, o = null;
  const s = e.sort((c, f) => Wv(c, f, n));
  for (const c of s)
    zv(c, t, n) ? (o = c, i || (i = c)) : (o && r.push([i, o]), o = null, i = null);
  i && r.push([i, null]);
  const a = [];
  for (const [c, f] of r)
    c === f ? a.push(c) : !f && c === s[0] ? a.push("*") : f ? c === s[0] ? a.push(`<=${f}`) : a.push(`${c} - ${f}`) : a.push(`>=${c}`);
  const l = a.join(" || "), h = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < h.length ? l : t;
};
const pc = ut(), ya = io(), { ANY: Ko } = ya, lr = oo, Ea = ct, Yv = (e, t, n = {}) => {
  if (e === t)
    return !0;
  e = new pc(e, n), t = new pc(t, n);
  let r = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const s = Jv(i, o, n);
      if (r = r || s !== null, s)
        continue e;
    }
    if (r)
      return !1;
  }
  return !0;
}, Xv = [new ya(">=0.0.0-0")], mc = [new ya(">=0.0.0")], Jv = (e, t, n) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Ko) {
    if (t.length === 1 && t[0].semver === Ko)
      return !0;
    n.includePrerelease ? e = Xv : e = mc;
  }
  if (t.length === 1 && t[0].semver === Ko) {
    if (n.includePrerelease)
      return !0;
    t = mc;
  }
  const r = /* @__PURE__ */ new Set();
  let i, o;
  for (const g of e)
    g.operator === ">" || g.operator === ">=" ? i = gc(i, g, n) : g.operator === "<" || g.operator === "<=" ? o = yc(o, g, n) : r.add(g.semver);
  if (r.size > 1)
    return null;
  let s;
  if (i && o) {
    if (s = Ea(i.semver, o.semver, n), s > 0)
      return null;
    if (s === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const g of r) {
    if (i && !lr(g, String(i), n) || o && !lr(g, String(o), n))
      return null;
    for (const w of t)
      if (!lr(g, String(w), n))
        return !1;
    return !0;
  }
  let a, l, h, c, f = o && !n.includePrerelease && o.semver.prerelease.length ? o.semver : !1, p = i && !n.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  f && f.prerelease.length === 1 && o.operator === "<" && f.prerelease[0] === 0 && (f = !1);
  for (const g of t) {
    if (c = c || g.operator === ">" || g.operator === ">=", h = h || g.operator === "<" || g.operator === "<=", i) {
      if (p && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === p.major && g.semver.minor === p.minor && g.semver.patch === p.patch && (p = !1), g.operator === ">" || g.operator === ">=") {
        if (a = gc(i, g, n), a === g && a !== i)
          return !1;
      } else if (i.operator === ">=" && !lr(i.semver, String(g), n))
        return !1;
    }
    if (o) {
      if (f && g.semver.prerelease && g.semver.prerelease.length && g.semver.major === f.major && g.semver.minor === f.minor && g.semver.patch === f.patch && (f = !1), g.operator === "<" || g.operator === "<=") {
        if (l = yc(o, g, n), l === g && l !== o)
          return !1;
      } else if (o.operator === "<=" && !lr(o.semver, String(g), n))
        return !1;
    }
    if (!g.operator && (o || i) && s !== 0)
      return !1;
  }
  return !(i && h && !o && s !== 0 || o && c && !i && s !== 0 || p || f);
}, gc = (e, t, n) => {
  if (!e)
    return t;
  const r = Ea(e.semver, t.semver, n);
  return r > 0 ? e : r < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, yc = (e, t, n) => {
  if (!e)
    return t;
  const r = Ea(e.semver, t.semver, n);
  return r < 0 ? e : r > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var Kv = Yv;
const Qo = Hr, Ec = to, Qv = He, wc = pd, Zv = Zn, e_ = sw, t_ = cw, n_ = fw, r_ = hw, i_ = gw, o_ = ww, s_ = bw, a_ = Aw, l_ = ct, c_ = Iw, u_ = Dw, f_ = da, d_ = Lw, h_ = Mw, p_ = ro, m_ = ha, g_ = md, y_ = gd, E_ = pa, w_ = ma, v_ = yd, __ = lv, b_ = io(), x_ = ut(), S_ = oo, A_ = mv, T_ = wv, C_ = xv, $_ = Tv, I_ = Iv, O_ = ga, R_ = Mv, D_ = Hv, P_ = Gv, N_ = Vv, F_ = Kv;
var wd = {
  parse: Zv,
  valid: e_,
  clean: t_,
  inc: n_,
  diff: r_,
  major: i_,
  minor: o_,
  patch: s_,
  prerelease: a_,
  compare: l_,
  rcompare: c_,
  compareLoose: u_,
  compareBuild: f_,
  sort: d_,
  rsort: h_,
  gt: p_,
  lt: m_,
  eq: g_,
  neq: y_,
  gte: E_,
  lte: w_,
  cmp: v_,
  coerce: __,
  Comparator: b_,
  Range: x_,
  satisfies: S_,
  toComparators: A_,
  maxSatisfying: T_,
  minSatisfying: C_,
  minVersion: $_,
  validRange: I_,
  outside: O_,
  gtr: R_,
  ltr: D_,
  intersects: P_,
  simplifyRange: N_,
  subset: F_,
  SemVer: Qv,
  re: Qo.re,
  src: Qo.src,
  tokens: Qo.t,
  SEMVER_SPEC_VERSION: Ec.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Ec.RELEASE_TYPES,
  compareIdentifiers: wc.compareIdentifiers,
  rcompareIdentifiers: wc.rcompareIdentifiers
}, qr = {}, ji = { exports: {} };
ji.exports;
(function(e, t) {
  var n = 200, r = "__lodash_hash_undefined__", i = 1, o = 2, s = 9007199254740991, a = "[object Arguments]", l = "[object Array]", h = "[object AsyncFunction]", c = "[object Boolean]", f = "[object Date]", p = "[object Error]", g = "[object Function]", w = "[object GeneratorFunction]", y = "[object Map]", E = "[object Number]", x = "[object Null]", T = "[object Object]", N = "[object Promise]", k = "[object Proxy]", W = "[object RegExp]", Y = "[object Set]", Q = "[object String]", ne = "[object Symbol]", q = "[object Undefined]", v = "[object WeakMap]", V = "[object ArrayBuffer]", Z = "[object DataView]", oe = "[object Float32Array]", D = "[object Float64Array]", I = "[object Int8Array]", P = "[object Int16Array]", C = "[object Int32Array]", F = "[object Uint8Array]", A = "[object Uint8ClampedArray]", L = "[object Uint16Array]", j = "[object Uint32Array]", R = /[\\^$.*+?()[\]{}|]/g, z = /^\[object .+?Constructor\]$/, J = /^(?:0|[1-9]\d*)$/, M = {};
  M[oe] = M[D] = M[I] = M[P] = M[C] = M[F] = M[A] = M[L] = M[j] = !0, M[a] = M[l] = M[V] = M[c] = M[Z] = M[f] = M[p] = M[g] = M[y] = M[E] = M[T] = M[W] = M[Y] = M[Q] = M[v] = !1;
  var ee = typeof Fe == "object" && Fe && Fe.Object === Object && Fe, pe = typeof self == "object" && self && self.Object === Object && self, ie = ee || pe || Function("return this")(), Qe = t && !t.nodeType && t, vt = Qe && !0 && e && !e.nodeType && e, ze = vt && vt.exports === Qe, en = ze && ee.process, d = function() {
    try {
      return en && en.binding && en.binding("util");
    } catch {
    }
  }(), u = d && d.isTypedArray;
  function S(m, b) {
    for (var $ = -1, B = m == null ? 0 : m.length, ae = 0, X = []; ++$ < B; ) {
      var de = m[$];
      b(de, $, m) && (X[ae++] = de);
    }
    return X;
  }
  function _(m, b) {
    for (var $ = -1, B = b.length, ae = m.length; ++$ < B; )
      m[ae + $] = b[$];
    return m;
  }
  function re(m, b) {
    for (var $ = -1, B = m == null ? 0 : m.length; ++$ < B; )
      if (b(m[$], $, m))
        return !0;
    return !1;
  }
  function ce(m, b) {
    for (var $ = -1, B = Array(m); ++$ < m; )
      B[$] = b($);
    return B;
  }
  function me(m) {
    return function(b) {
      return m(b);
    };
  }
  function Ie(m, b) {
    return m.has(b);
  }
  function Oe(m, b) {
    return m == null ? void 0 : m[b];
  }
  function Ze(m) {
    var b = -1, $ = Array(m.size);
    return m.forEach(function(B, ae) {
      $[++b] = [ae, B];
    }), $;
  }
  function Ee(m, b) {
    return function($) {
      return m(b($));
    };
  }
  function et(m) {
    var b = -1, $ = Array(m.size);
    return m.forEach(function(B) {
      $[++b] = B;
    }), $;
  }
  var Co = Array.prototype, Kr = Function.prototype, Ot = Object.prototype, An = ie["__core-js_shared__"], ka = Kr.toString, dt = Ot.hasOwnProperty, Ma = function() {
    var m = /[^.]+$/.exec(An && An.keys && An.keys.IE_PROTO || "");
    return m ? "Symbol(src)_1." + m : "";
  }(), ja = Ot.toString, nh = RegExp(
    "^" + ka.call(dt).replace(R, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Ba = ze ? ie.Buffer : void 0, Qr = ie.Symbol, Ha = ie.Uint8Array, qa = Ot.propertyIsEnumerable, rh = Co.splice, tn = Qr ? Qr.toStringTag : void 0, Ga = Object.getOwnPropertySymbols, ih = Ba ? Ba.isBuffer : void 0, oh = Ee(Object.keys, Object), $o = Tn(ie, "DataView"), rr = Tn(ie, "Map"), Io = Tn(ie, "Promise"), Oo = Tn(ie, "Set"), Ro = Tn(ie, "WeakMap"), ir = Tn(Object, "create"), sh = on($o), ah = on(rr), lh = on(Io), ch = on(Oo), uh = on(Ro), za = Qr ? Qr.prototype : void 0, Do = za ? za.valueOf : void 0;
  function nn(m) {
    var b = -1, $ = m == null ? 0 : m.length;
    for (this.clear(); ++b < $; ) {
      var B = m[b];
      this.set(B[0], B[1]);
    }
  }
  function fh() {
    this.__data__ = ir ? ir(null) : {}, this.size = 0;
  }
  function dh(m) {
    var b = this.has(m) && delete this.__data__[m];
    return this.size -= b ? 1 : 0, b;
  }
  function hh(m) {
    var b = this.__data__;
    if (ir) {
      var $ = b[m];
      return $ === r ? void 0 : $;
    }
    return dt.call(b, m) ? b[m] : void 0;
  }
  function ph(m) {
    var b = this.__data__;
    return ir ? b[m] !== void 0 : dt.call(b, m);
  }
  function mh(m, b) {
    var $ = this.__data__;
    return this.size += this.has(m) ? 0 : 1, $[m] = ir && b === void 0 ? r : b, this;
  }
  nn.prototype.clear = fh, nn.prototype.delete = dh, nn.prototype.get = hh, nn.prototype.has = ph, nn.prototype.set = mh;
  function _t(m) {
    var b = -1, $ = m == null ? 0 : m.length;
    for (this.clear(); ++b < $; ) {
      var B = m[b];
      this.set(B[0], B[1]);
    }
  }
  function gh() {
    this.__data__ = [], this.size = 0;
  }
  function yh(m) {
    var b = this.__data__, $ = ei(b, m);
    if ($ < 0)
      return !1;
    var B = b.length - 1;
    return $ == B ? b.pop() : rh.call(b, $, 1), --this.size, !0;
  }
  function Eh(m) {
    var b = this.__data__, $ = ei(b, m);
    return $ < 0 ? void 0 : b[$][1];
  }
  function wh(m) {
    return ei(this.__data__, m) > -1;
  }
  function vh(m, b) {
    var $ = this.__data__, B = ei($, m);
    return B < 0 ? (++this.size, $.push([m, b])) : $[B][1] = b, this;
  }
  _t.prototype.clear = gh, _t.prototype.delete = yh, _t.prototype.get = Eh, _t.prototype.has = wh, _t.prototype.set = vh;
  function rn(m) {
    var b = -1, $ = m == null ? 0 : m.length;
    for (this.clear(); ++b < $; ) {
      var B = m[b];
      this.set(B[0], B[1]);
    }
  }
  function _h() {
    this.size = 0, this.__data__ = {
      hash: new nn(),
      map: new (rr || _t)(),
      string: new nn()
    };
  }
  function bh(m) {
    var b = ti(this, m).delete(m);
    return this.size -= b ? 1 : 0, b;
  }
  function xh(m) {
    return ti(this, m).get(m);
  }
  function Sh(m) {
    return ti(this, m).has(m);
  }
  function Ah(m, b) {
    var $ = ti(this, m), B = $.size;
    return $.set(m, b), this.size += $.size == B ? 0 : 1, this;
  }
  rn.prototype.clear = _h, rn.prototype.delete = bh, rn.prototype.get = xh, rn.prototype.has = Sh, rn.prototype.set = Ah;
  function Zr(m) {
    var b = -1, $ = m == null ? 0 : m.length;
    for (this.__data__ = new rn(); ++b < $; )
      this.add(m[b]);
  }
  function Th(m) {
    return this.__data__.set(m, r), this;
  }
  function Ch(m) {
    return this.__data__.has(m);
  }
  Zr.prototype.add = Zr.prototype.push = Th, Zr.prototype.has = Ch;
  function Rt(m) {
    var b = this.__data__ = new _t(m);
    this.size = b.size;
  }
  function $h() {
    this.__data__ = new _t(), this.size = 0;
  }
  function Ih(m) {
    var b = this.__data__, $ = b.delete(m);
    return this.size = b.size, $;
  }
  function Oh(m) {
    return this.__data__.get(m);
  }
  function Rh(m) {
    return this.__data__.has(m);
  }
  function Dh(m, b) {
    var $ = this.__data__;
    if ($ instanceof _t) {
      var B = $.__data__;
      if (!rr || B.length < n - 1)
        return B.push([m, b]), this.size = ++$.size, this;
      $ = this.__data__ = new rn(B);
    }
    return $.set(m, b), this.size = $.size, this;
  }
  Rt.prototype.clear = $h, Rt.prototype.delete = Ih, Rt.prototype.get = Oh, Rt.prototype.has = Rh, Rt.prototype.set = Dh;
  function Ph(m, b) {
    var $ = ni(m), B = !$ && Yh(m), ae = !$ && !B && Po(m), X = !$ && !B && !ae && el(m), de = $ || B || ae || X, be = de ? ce(m.length, String) : [], Ae = be.length;
    for (var ue in m)
      dt.call(m, ue) && !(de && // Safari 9 has enumerable `arguments.length` in strict mode.
      (ue == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      ae && (ue == "offset" || ue == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      X && (ue == "buffer" || ue == "byteLength" || ue == "byteOffset") || // Skip index properties.
      qh(ue, Ae))) && be.push(ue);
    return be;
  }
  function ei(m, b) {
    for (var $ = m.length; $--; )
      if (Ja(m[$][0], b))
        return $;
    return -1;
  }
  function Nh(m, b, $) {
    var B = b(m);
    return ni(m) ? B : _(B, $(m));
  }
  function or(m) {
    return m == null ? m === void 0 ? q : x : tn && tn in Object(m) ? Bh(m) : Vh(m);
  }
  function Wa(m) {
    return sr(m) && or(m) == a;
  }
  function Va(m, b, $, B, ae) {
    return m === b ? !0 : m == null || b == null || !sr(m) && !sr(b) ? m !== m && b !== b : Fh(m, b, $, B, Va, ae);
  }
  function Fh(m, b, $, B, ae, X) {
    var de = ni(m), be = ni(b), Ae = de ? l : Dt(m), ue = be ? l : Dt(b);
    Ae = Ae == a ? T : Ae, ue = ue == a ? T : ue;
    var We = Ae == T, tt = ue == T, Re = Ae == ue;
    if (Re && Po(m)) {
      if (!Po(b))
        return !1;
      de = !0, We = !1;
    }
    if (Re && !We)
      return X || (X = new Rt()), de || el(m) ? Ya(m, b, $, B, ae, X) : Mh(m, b, Ae, $, B, ae, X);
    if (!($ & i)) {
      var Xe = We && dt.call(m, "__wrapped__"), Je = tt && dt.call(b, "__wrapped__");
      if (Xe || Je) {
        var Pt = Xe ? m.value() : m, bt = Je ? b.value() : b;
        return X || (X = new Rt()), ae(Pt, bt, $, B, X);
      }
    }
    return Re ? (X || (X = new Rt()), jh(m, b, $, B, ae, X)) : !1;
  }
  function Lh(m) {
    if (!Za(m) || zh(m))
      return !1;
    var b = Ka(m) ? nh : z;
    return b.test(on(m));
  }
  function Uh(m) {
    return sr(m) && Qa(m.length) && !!M[or(m)];
  }
  function kh(m) {
    if (!Wh(m))
      return oh(m);
    var b = [];
    for (var $ in Object(m))
      dt.call(m, $) && $ != "constructor" && b.push($);
    return b;
  }
  function Ya(m, b, $, B, ae, X) {
    var de = $ & i, be = m.length, Ae = b.length;
    if (be != Ae && !(de && Ae > be))
      return !1;
    var ue = X.get(m);
    if (ue && X.get(b))
      return ue == b;
    var We = -1, tt = !0, Re = $ & o ? new Zr() : void 0;
    for (X.set(m, b), X.set(b, m); ++We < be; ) {
      var Xe = m[We], Je = b[We];
      if (B)
        var Pt = de ? B(Je, Xe, We, b, m, X) : B(Xe, Je, We, m, b, X);
      if (Pt !== void 0) {
        if (Pt)
          continue;
        tt = !1;
        break;
      }
      if (Re) {
        if (!re(b, function(bt, sn) {
          if (!Ie(Re, sn) && (Xe === bt || ae(Xe, bt, $, B, X)))
            return Re.push(sn);
        })) {
          tt = !1;
          break;
        }
      } else if (!(Xe === Je || ae(Xe, Je, $, B, X))) {
        tt = !1;
        break;
      }
    }
    return X.delete(m), X.delete(b), tt;
  }
  function Mh(m, b, $, B, ae, X, de) {
    switch ($) {
      case Z:
        if (m.byteLength != b.byteLength || m.byteOffset != b.byteOffset)
          return !1;
        m = m.buffer, b = b.buffer;
      case V:
        return !(m.byteLength != b.byteLength || !X(new Ha(m), new Ha(b)));
      case c:
      case f:
      case E:
        return Ja(+m, +b);
      case p:
        return m.name == b.name && m.message == b.message;
      case W:
      case Q:
        return m == b + "";
      case y:
        var be = Ze;
      case Y:
        var Ae = B & i;
        if (be || (be = et), m.size != b.size && !Ae)
          return !1;
        var ue = de.get(m);
        if (ue)
          return ue == b;
        B |= o, de.set(m, b);
        var We = Ya(be(m), be(b), B, ae, X, de);
        return de.delete(m), We;
      case ne:
        if (Do)
          return Do.call(m) == Do.call(b);
    }
    return !1;
  }
  function jh(m, b, $, B, ae, X) {
    var de = $ & i, be = Xa(m), Ae = be.length, ue = Xa(b), We = ue.length;
    if (Ae != We && !de)
      return !1;
    for (var tt = Ae; tt--; ) {
      var Re = be[tt];
      if (!(de ? Re in b : dt.call(b, Re)))
        return !1;
    }
    var Xe = X.get(m);
    if (Xe && X.get(b))
      return Xe == b;
    var Je = !0;
    X.set(m, b), X.set(b, m);
    for (var Pt = de; ++tt < Ae; ) {
      Re = be[tt];
      var bt = m[Re], sn = b[Re];
      if (B)
        var tl = de ? B(sn, bt, Re, b, m, X) : B(bt, sn, Re, m, b, X);
      if (!(tl === void 0 ? bt === sn || ae(bt, sn, $, B, X) : tl)) {
        Je = !1;
        break;
      }
      Pt || (Pt = Re == "constructor");
    }
    if (Je && !Pt) {
      var ri = m.constructor, ii = b.constructor;
      ri != ii && "constructor" in m && "constructor" in b && !(typeof ri == "function" && ri instanceof ri && typeof ii == "function" && ii instanceof ii) && (Je = !1);
    }
    return X.delete(m), X.delete(b), Je;
  }
  function Xa(m) {
    return Nh(m, Kh, Hh);
  }
  function ti(m, b) {
    var $ = m.__data__;
    return Gh(b) ? $[typeof b == "string" ? "string" : "hash"] : $.map;
  }
  function Tn(m, b) {
    var $ = Oe(m, b);
    return Lh($) ? $ : void 0;
  }
  function Bh(m) {
    var b = dt.call(m, tn), $ = m[tn];
    try {
      m[tn] = void 0;
      var B = !0;
    } catch {
    }
    var ae = ja.call(m);
    return B && (b ? m[tn] = $ : delete m[tn]), ae;
  }
  var Hh = Ga ? function(m) {
    return m == null ? [] : (m = Object(m), S(Ga(m), function(b) {
      return qa.call(m, b);
    }));
  } : Qh, Dt = or;
  ($o && Dt(new $o(new ArrayBuffer(1))) != Z || rr && Dt(new rr()) != y || Io && Dt(Io.resolve()) != N || Oo && Dt(new Oo()) != Y || Ro && Dt(new Ro()) != v) && (Dt = function(m) {
    var b = or(m), $ = b == T ? m.constructor : void 0, B = $ ? on($) : "";
    if (B)
      switch (B) {
        case sh:
          return Z;
        case ah:
          return y;
        case lh:
          return N;
        case ch:
          return Y;
        case uh:
          return v;
      }
    return b;
  });
  function qh(m, b) {
    return b = b ?? s, !!b && (typeof m == "number" || J.test(m)) && m > -1 && m % 1 == 0 && m < b;
  }
  function Gh(m) {
    var b = typeof m;
    return b == "string" || b == "number" || b == "symbol" || b == "boolean" ? m !== "__proto__" : m === null;
  }
  function zh(m) {
    return !!Ma && Ma in m;
  }
  function Wh(m) {
    var b = m && m.constructor, $ = typeof b == "function" && b.prototype || Ot;
    return m === $;
  }
  function Vh(m) {
    return ja.call(m);
  }
  function on(m) {
    if (m != null) {
      try {
        return ka.call(m);
      } catch {
      }
      try {
        return m + "";
      } catch {
      }
    }
    return "";
  }
  function Ja(m, b) {
    return m === b || m !== m && b !== b;
  }
  var Yh = Wa(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Wa : function(m) {
    return sr(m) && dt.call(m, "callee") && !qa.call(m, "callee");
  }, ni = Array.isArray;
  function Xh(m) {
    return m != null && Qa(m.length) && !Ka(m);
  }
  var Po = ih || Zh;
  function Jh(m, b) {
    return Va(m, b);
  }
  function Ka(m) {
    if (!Za(m))
      return !1;
    var b = or(m);
    return b == g || b == w || b == h || b == k;
  }
  function Qa(m) {
    return typeof m == "number" && m > -1 && m % 1 == 0 && m <= s;
  }
  function Za(m) {
    var b = typeof m;
    return m != null && (b == "object" || b == "function");
  }
  function sr(m) {
    return m != null && typeof m == "object";
  }
  var el = u ? me(u) : Uh;
  function Kh(m) {
    return Xh(m) ? Ph(m) : kh(m);
  }
  function Qh() {
    return [];
  }
  function Zh() {
    return !1;
  }
  e.exports = Jh;
})(ji, ji.exports);
var L_ = ji.exports;
Object.defineProperty(qr, "__esModule", { value: !0 });
qr.DownloadedUpdateHelper = void 0;
qr.createTempUpdateFile = B_;
const U_ = Fr, k_ = st, vc = L_, an = Kt, kn = le;
class M_ {
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
    return kn.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, n, r, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return vc(this.versionInfo, n) && vc(this.fileInfo.info, r.info) && await (0, an.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(r, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, n, r, i, o, s) {
    this._file = t, this._packageFile = n, this.versionInfo = r, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, s && await (0, an.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, an.emptyDir)(this.cacheDirForPendingUpdate);
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
    if (!await (0, an.pathExists)(r))
      return null;
    let o;
    try {
      o = await (0, an.readJson)(r);
    } catch (c) {
      let f = "No cached update info available";
      return c.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), f += ` (error on read: ${c.message})`), n.info(f), null;
    }
    const s = o == null ? void 0 : o.fileName;
    if (!(typeof s == "string" && s.length > 0 && kn.basename(s) === s))
      return n.warn("Cached update info is corrupted: invalid fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return n.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const l = kn.join(this.cacheDirForPendingUpdate, s);
    if (!await (0, an.pathExists)(l))
      return n.info("Cached update file doesn't exist"), null;
    const h = await j_(l);
    return t.info.sha512 !== h ? (n.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${h}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, l);
  }
  getUpdateInfoFile() {
    return kn.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
qr.DownloadedUpdateHelper = M_;
function j_(e, t = "sha512", n = "base64", r) {
  return new Promise((i, o) => {
    const s = (0, U_.createHash)(t);
    s.on("error", o).setEncoding(n), (0, k_.createReadStream)(e, {
      ...r,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      s.end(), i(s.read());
    }).pipe(s, { end: !1 });
  });
}
async function B_(e, t, n) {
  let r = 0, i = kn.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, an.unlink)(i), i;
    } catch (s) {
      if (s.code === "ENOENT")
        return i;
      n.warn(`Error on remove temp update file: ${s}`), i = kn.join(t, `${r++}-${e}`);
    }
  return i;
}
var so = {}, wa = {};
Object.defineProperty(wa, "__esModule", { value: !0 });
wa.getAppCacheDir = q_;
const Zo = le, H_ = zi;
function q_() {
  const e = (0, H_.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || Zo.join(e, "AppData", "Local") : process.platform === "darwin" ? t = Zo.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || Zo.join(e, ".cache"), t;
}
Object.defineProperty(so, "__esModule", { value: !0 });
so.ElectronAppAdapter = void 0;
const _c = le, G_ = wa;
class z_ {
  constructor(t = En.app) {
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
    return this.isPackaged ? _c.join(process.resourcesPath, "app-update.yml") : _c.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, G_.getAppCacheDir)();
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
so.ElectronAppAdapter = z_;
var vd = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = n;
  const t = _e;
  e.NET_SESSION_NAME = "electron-updater";
  function n() {
    return En.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class r extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, s, a) {
      return await a.cancellationToken.createPromise((l, h, c) => {
        const f = {
          headers: a.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, f), (0, t.configureRequestOptions)(f), this.doDownload(f, {
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
      const a = En.net.request({
        ...o,
        session: this.cachedSession
      });
      return a.on("response", s), this.proxyLoginCallback != null && a.on("login", this.proxyLoginCallback), a;
    }
    addRedirectHandlers(o, s, a, l, h) {
      o.on("redirect", (c, f, p) => {
        o.abort(), l > this.maxRedirects ? a(this.createMaxRedirectError()) : h(t.HttpExecutor.prepareRedirectUrlOptions(p, s));
      });
    }
  }
  e.ElectronHttpExecutor = r;
})(vd);
var Gr = {}, ft = {};
Object.defineProperty(ft, "__esModule", { value: !0 });
ft.newBaseUrl = W_;
ft.newUrlFromBase = V_;
ft.getChannelFilename = Y_;
const _d = Jt;
function W_(e) {
  const t = new _d.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function V_(e, t, n = !1) {
  const r = new _d.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? r.search = i : n && (r.search = `noCache=${Date.now().toString(32)}`), r;
}
function Y_(e) {
  return `${e}.yml`;
}
var ye = {}, X_ = "[object Symbol]", bd = /[\\^$.*+?()[\]{}|]/g, J_ = RegExp(bd.source), K_ = typeof Fe == "object" && Fe && Fe.Object === Object && Fe, Q_ = typeof self == "object" && self && self.Object === Object && self, Z_ = K_ || Q_ || Function("return this")(), e1 = Object.prototype, t1 = e1.toString, bc = Z_.Symbol, xc = bc ? bc.prototype : void 0, Sc = xc ? xc.toString : void 0;
function n1(e) {
  if (typeof e == "string")
    return e;
  if (i1(e))
    return Sc ? Sc.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function r1(e) {
  return !!e && typeof e == "object";
}
function i1(e) {
  return typeof e == "symbol" || r1(e) && t1.call(e) == X_;
}
function o1(e) {
  return e == null ? "" : n1(e);
}
function s1(e) {
  return e = o1(e), e && J_.test(e) ? e.replace(bd, "\\$&") : e;
}
var xd = s1;
Object.defineProperty(ye, "__esModule", { value: !0 });
ye.Provider = void 0;
ye.findFile = f1;
ye.parseUpdateInfo = d1;
ye.getFileList = Sd;
ye.resolveFiles = h1;
const Vt = _e, a1 = $e, l1 = Jt, Bi = ft, c1 = xd;
class u1 {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  // By default, the blockmap file is in the same directory as the main file
  // But some providers may have a different blockmap file, so we need to override this method
  getBlockMapFiles(t, n, r, i = null) {
    const o = (0, Bi.newUrlFromBase)(`${t.pathname}.blockmap`, t);
    return [(0, Bi.newUrlFromBase)(`${t.pathname.replace(new RegExp(c1(r), "g"), n)}.blockmap`, i ? new l1.URL(i) : t), o];
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
    return this.requestHeaders == null ? n != null && (r.headers = n) : r.headers = n == null ? this.requestHeaders : { ...this.requestHeaders, ...n }, (0, Vt.configureRequestUrl)(t, r), r;
  }
}
ye.Provider = u1;
function f1(e, t, n) {
  var r;
  if (e.length === 0)
    throw (0, Vt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const i = e.filter((s) => s.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`)), o = (r = i.find((s) => [s.url.pathname, s.info.url].some((a) => a.includes(process.arch)))) !== null && r !== void 0 ? r : i.shift();
  return o || (n == null ? e[0] : e.find((s) => !n.some((a) => s.url.pathname.toLowerCase().endsWith(`.${a.toLowerCase()}`))));
}
function d1(e, t, n) {
  if (e == null)
    throw (0, Vt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let r;
  try {
    r = (0, a1.load)(e);
  } catch (i) {
    throw (0, Vt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return r;
}
function Sd(e) {
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
  throw (0, Vt.newError)(`No files provided: ${(0, Vt.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function h1(e, t, n = (r) => r) {
  const i = Sd(e).map((a) => {
    if (a.sha2 == null && a.sha512 == null)
      throw (0, Vt.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, Vt.safeStringifyJson)(a)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, Bi.newUrlFromBase)(n(a.url), t),
      info: a
    };
  }), o = e.packages, s = o == null ? null : o[process.arch] || o.ia32;
  return s != null && (i[0].packageInfo = {
    ...s,
    path: (0, Bi.newUrlFromBase)(n(s.path), t).href
  }), i;
}
Object.defineProperty(Gr, "__esModule", { value: !0 });
Gr.GenericProvider = void 0;
const Ac = _e, es = ft, ts = ye;
class p1 extends ts.Provider {
  constructor(t, n, r) {
    super(r), this.configuration = t, this.updater = n, this.baseUrl = (0, es.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, es.getChannelFilename)(this.channel), n = (0, es.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let r = 0; ; r++)
      try {
        return (0, ts.parseUpdateInfo)(await this.httpRequest(n), t, n);
      } catch (i) {
        if (i instanceof Ac.HttpError && i.statusCode === 404)
          throw (0, Ac.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
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
    return (0, ts.resolveFiles)(t, this.baseUrl);
  }
}
Gr.GenericProvider = p1;
var ao = {}, lo = {};
Object.defineProperty(lo, "__esModule", { value: !0 });
lo.BitbucketProvider = void 0;
const Tc = _e, ns = ft, rs = ye;
class m1 extends rs.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, ns.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new Tc.CancellationToken(), n = (0, ns.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, ns.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, void 0, t);
      return (0, rs.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, Tc.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, rs.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: n } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${n}, channel: ${this.channel})`;
  }
}
lo.BitbucketProvider = m1;
var Yt = {};
Object.defineProperty(Yt, "__esModule", { value: !0 });
Yt.GitHubProvider = Yt.BaseGitHubProvider = void 0;
Yt.computeReleaseNotes = Td;
const St = _e, mt = wd, g1 = Jt, Mn = ft, Ps = ye, is = /\/tag\/(v?[^/]+)$/;
class Ad extends Ps.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Mn.newBaseUrl)((0, St.githubUrl)(t, n));
    const i = n === "github.com" ? "api.github.com" : n;
    this.baseApiUrl = (0, Mn.newBaseUrl)((0, St.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const n = this.options.host;
    return n && !["github.com", "api.github.com"].includes(n) ? `/api/v3${t}` : t;
  }
}
Yt.BaseGitHubProvider = Ad;
class y1 extends Ad {
  constructor(t, n, r) {
    super(t, "github.com", r), this.options = t, this.updater = n;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, n, r, i, o;
    const s = new St.CancellationToken(), a = await this.httpRequest((0, Mn.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, s), l = (0, St.parseXml)(a);
    let h = l.element("entry", !1, "No published versions on GitHub"), c = null;
    try {
      if (this.updater.allowPrerelease) {
        const E = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((n = mt.prerelease(this.updater.currentVersion)) === null || n === void 0 ? void 0 : n[0]) || null;
        if (E === null)
          c = is.exec(h.element("link").attribute("href"))[1];
        else
          for (const x of l.getElements("entry")) {
            const T = is.exec(x.element("link").attribute("href"));
            if (T === null)
              continue;
            const N = T[1];
            if (!mt.valid(N))
              continue;
            const k = ((r = mt.prerelease(N)) === null || r === void 0 ? void 0 : r[0]) || null, W = !E || ["alpha", "beta"].includes(E), Y = k !== null && !["alpha", "beta"].includes(String(k));
            if (W && !Y && !(E === "beta" && k === "alpha")) {
              c = N, h = x;
              break;
            }
            if (k && k === E) {
              c = N, h = x;
              break;
            }
          }
      } else {
        c = await this.getLatestTagName(s);
        for (const E of l.getElements("entry")) {
          const x = is.exec(E.element("link").attribute("href"));
          if (x != null && x[1] === c) {
            h = E;
            break;
          }
        }
      }
    } catch (E) {
      throw (0, St.newError)(`Cannot parse releases feed: ${E.stack || E.message},
XML:
${a}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (c == null)
      throw (0, St.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let f, p = "", g = "";
    const w = async (E) => {
      p = (0, Mn.getChannelFilename)(E), g = (0, Mn.newUrlFromBase)(this.getBaseDownloadPath(String(c), p), this.baseUrl);
      const x = this.createRequestOptions(g);
      try {
        return await this.executor.request(x, s);
      } catch (T) {
        throw T instanceof St.HttpError && T.statusCode === 404 ? (0, St.newError)(`Cannot find ${p} in the latest release artifacts (${g}): ${T.stack || T.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : T;
      }
    };
    try {
      let E = this.channel;
      this.updater.allowPrerelease && (!((i = mt.prerelease(c)) === null || i === void 0) && i[0]) && (E = this.getCustomChannelName(String((o = mt.prerelease(c)) === null || o === void 0 ? void 0 : o[0]))), f = await w(E);
    } catch (E) {
      if (this.updater.allowPrerelease)
        f = await w(this.getDefaultChannelName());
      else
        throw E;
    }
    const y = (0, Ps.parseUpdateInfo)(f, p, g);
    return y.releaseName == null && (y.releaseName = h.elementValueOrEmpty("title")), y.releaseNotes == null && (y.releaseNotes = Td(this.updater.currentVersion, this.updater.fullChangelog, l, h)), {
      tag: c,
      ...y
    };
  }
  async getLatestTagName(t) {
    const n = this.options, r = n.host == null || n.host === "github.com" ? (0, Mn.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new g1.URL(`${this.computeGithubBasePath(`/repos/${n.owner}/${n.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(r, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, St.newError)(`Unable to find latest version on GitHub (${r}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, Ps.resolveFiles)(t, this.baseUrl, (n) => this.getBaseDownloadPath(t.tag, n.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, n) {
    return `${this.basePath}/download/${t}/${n}`;
  }
}
Yt.GitHubProvider = y1;
function Cc(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function Td(e, t, n, r) {
  if (!t)
    return Cc(r);
  const i = /\/tag\/v?([^/]+)$/;
  let o;
  try {
    o = i.exec(r.element("link").attribute("href"))[1], o = mt.valid(o) ? o : void 0;
  } catch {
  }
  if (o == null)
    return null;
  const s = [];
  for (const a of n.getElements("entry")) {
    let l;
    try {
      const f = i.exec(a.element("link").attribute("href"));
      if (!f)
        continue;
      l = f[1];
    } catch {
      continue;
    }
    if (!mt.valid(l))
      continue;
    const h = mt.gt(l, e.raw), c = mt.lte(l, o);
    h && c && s.push({
      version: l,
      note: Cc(a)
    });
  }
  return s.sort((a, l) => mt.rcompare(a.version, l.version));
}
var co = {};
Object.defineProperty(co, "__esModule", { value: !0 });
co.GitLabProvider = void 0;
const Te = _e, os = Jt, E1 = xd, yi = ft, ss = ye;
class w1 extends ss.Provider {
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
    this.baseApiUrl = (0, yi.newBaseUrl)(`https://${o}/api/v4`);
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
    const t = new Te.CancellationToken(), n = (0, yi.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl), r = { Accept: "application/json", ...this.setAuthHeaderForToken(this.options.token || null) };
    let i;
    try {
      i = await this.httpRequest(n, r, t);
    } catch (g) {
      throw (0, Te.newError)(`Unable to find latest release on GitLab (${n}): ${g.stack || g.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
    if (!i)
      throw (0, Te.newError)("No published releases on GitLab", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let o;
    try {
      o = JSON.parse(i);
    } catch (g) {
      throw (0, Te.newError)(`Unable to parse latest release response from GitLab (${n}): response was not valid JSON: ${g.stack || g.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
    if (o.upcoming_release)
      throw (0, Te.newError)("Latest GitLab release is scheduled but not yet published", "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    const s = o.tag_name;
    let a = null, l = "", h = null;
    const c = async (g) => {
      l = (0, yi.getChannelFilename)(g);
      const w = o.assets.links.find((x) => x.name === l);
      if (!w)
        throw (0, Te.newError)(`Cannot find ${l} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      h = new os.URL(w.direct_asset_url);
      const y = this.setAuthHeaderForToken(this.options.token || null), E = Object.keys(y).length ? y : void 0;
      try {
        const x = await this.httpRequest(h, E, t);
        if (!x)
          throw (0, Te.newError)(`Empty response from ${h}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        return x;
      } catch (x) {
        throw x instanceof Te.HttpError && x.statusCode === 404 ? (0, Te.newError)(`Cannot find ${l} in the latest release artifacts (${h}): ${x.stack || x.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : x;
      }
    };
    try {
      a = await c(this.channel);
    } catch (g) {
      if (this.channel !== this.getDefaultChannelName())
        a = await c(this.getDefaultChannelName());
      else
        throw g;
    }
    if (!a)
      throw (0, Te.newError)(`Unable to parse channel data from ${l}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    const f = (0, ss.parseUpdateInfo)(a, l, h);
    f.releaseName == null && (f.releaseName = o.name), f.releaseNotes == null && (f.releaseNotes = o.description || null);
    const p = {
      tag: s,
      assets: this.convertAssetsToMap(o.assets),
      ...f
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
        return new os.URL(o);
    }
    return null;
  }
  async fetchReleaseInfoByVersion(t) {
    const n = new Te.CancellationToken(), r = [`v${t}`, t];
    for (const i of r) {
      const o = (0, yi.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(i)}`, this.baseApiUrl);
      try {
        const s = { Accept: "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, a = await this.httpRequest(o, s, n);
        if (a)
          return JSON.parse(a);
      } catch (s) {
        if (s instanceof Te.HttpError && s.statusCode === 404)
          continue;
        throw (0, Te.newError)(`Unable to find release ${i} on GitLab (${o}): ${s.stack || s.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
      }
    }
    throw (0, Te.newError)(`Unable to find release with version ${t} (tried: ${r.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
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
      const l = r.replace(new RegExp(E1(n), "g"), t);
      o = this.findBlockMapInAssets(a, l);
    }
    return [o, i];
  }
  async getBlockMapFiles(t, n, r, i = null) {
    if (this.options.uploadTarget === "project_upload") {
      const o = t.pathname.split("/").pop() || "", [s, a] = await this.findBlockMapUrlsFromAssets(n, r, o);
      if (!a)
        throw (0, Te.newError)(`Cannot find blockmap file for ${r} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      if (!s)
        throw (0, Te.newError)(`Cannot find blockmap file for ${n} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      return [s, a];
    } else
      return super.getBlockMapFiles(t, n, r, i);
  }
  resolveFiles(t) {
    return (0, ss.getFileList)(t).map((n) => {
      const i = [
        n.url,
        // Original filename
        this.normalizeFilename(n.url)
        // Normalized filename (spaces/underscores → dashes)
      ].find((s) => t.assets.has(s)), o = i ? t.assets.get(i) : void 0;
      if (!o)
        throw (0, Te.newError)(`Cannot find asset "${n.url}" in GitLab release assets. Available assets: ${Array.from(t.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new os.URL(o),
        info: n
      };
    });
  }
  toString() {
    return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
  }
}
co.GitLabProvider = w1;
var uo = {};
Object.defineProperty(uo, "__esModule", { value: !0 });
uo.KeygenProvider = void 0;
const $c = _e, as = ft, ls = ye;
class v1 extends ls.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, as.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new $c.CancellationToken(), n = (0, as.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, as.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, ls.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, $c.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, ls.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: n, platform: r } = this.configuration;
    return `Keygen (account: ${t}, product: ${n}, platform: ${r}, channel: ${this.channel})`;
  }
}
uo.KeygenProvider = v1;
var fo = {};
Object.defineProperty(fo, "__esModule", { value: !0 });
fo.PrivateGitHubProvider = void 0;
const $n = _e, _1 = $e, b1 = le, Ic = Jt, Oc = ft, x1 = Yt, S1 = ye;
class A1 extends x1.BaseGitHubProvider {
  constructor(t, n, r, i) {
    super(t, "api.github.com", i), this.updater = n, this.token = r;
  }
  createRequestOptions(t, n) {
    const r = super.createRequestOptions(t, n);
    return r.redirect = "manual", r;
  }
  async getLatestVersion() {
    const t = new $n.CancellationToken(), n = (0, Oc.getChannelFilename)(this.getDefaultChannelName()), r = await this.getLatestVersionInfo(t), i = r.assets.find((a) => a.name === n);
    if (i == null)
      throw (0, $n.newError)(`Cannot find ${n} in the release ${r.html_url || r.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new Ic.URL(i.url);
    let s;
    try {
      s = (0, _1.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (a) {
      throw a instanceof $n.HttpError && a.statusCode === 404 ? (0, $n.newError)(`Cannot find ${n} in the latest release artifacts (${o}): ${a.stack || a.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : a;
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
    const i = (0, Oc.newUrlFromBase)(r, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      if (n) {
        const s = o.filter((a) => !a.draft);
        return s.find((a) => a.prerelease) || s[0];
      } else
        return o;
    } catch (o) {
      throw (0, $n.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, S1.getFileList)(t).map((n) => {
      const r = b1.posix.basename(n.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === r);
      if (i == null)
        throw (0, $n.newError)(`Cannot find asset "${r}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Ic.URL(i.url),
        info: n
      };
    });
  }
}
fo.PrivateGitHubProvider = A1;
Object.defineProperty(ao, "__esModule", { value: !0 });
ao.isUrlProbablySupportMultiRangeRequests = Cd;
ao.createClient = R1;
const Ei = _e, T1 = lo, Rc = Gr, C1 = Yt, $1 = co, I1 = uo, O1 = fo;
function Cd(e) {
  return !e.includes("s3.amazonaws.com");
}
function R1(e, t, n) {
  if (typeof e == "string")
    throw (0, Ei.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const r = e.provider;
  switch (r) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new C1.GitHubProvider(i, t, n) : new O1.PrivateGitHubProvider(i, t, o, n);
    }
    case "bitbucket":
      return new T1.BitbucketProvider(e, t, n);
    case "gitlab":
      return new $1.GitLabProvider(e, t, n);
    case "keygen":
      return new I1.KeygenProvider(e, t, n);
    case "s3":
    case "spaces":
      return new Rc.GenericProvider({
        provider: "generic",
        url: (0, Ei.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...n,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new Rc.GenericProvider(i, t, {
        ...n,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && Cd(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, Ei.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, n);
    }
    default:
      throw (0, Ei.newError)(`Unsupported provider: ${r}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var ho = {}, zr = {}, er = {}, Sn = {};
Object.defineProperty(Sn, "__esModule", { value: !0 });
Sn.OperationKind = void 0;
Sn.computeOperations = D1;
var hn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(hn || (Sn.OperationKind = hn = {}));
function D1(e, t, n) {
  const r = Pc(e.files), i = Pc(t.files);
  let o = null;
  const s = t.files[0], a = [], l = s.name, h = r.get(l);
  if (h == null)
    throw new Error(`no file ${l} in old blockmap`);
  const c = i.get(l);
  let f = 0;
  const { checksumToOffset: p, checksumToOldSize: g } = N1(r.get(l), h.offset, n);
  let w = s.offset;
  for (let y = 0; y < c.checksums.length; w += c.sizes[y], y++) {
    const E = c.sizes[y], x = c.checksums[y];
    let T = p.get(x);
    T != null && g.get(x) !== E && (n.warn(`Checksum ("${x}") matches, but size differs (old: ${g.get(x)}, new: ${E})`), T = void 0), T === void 0 ? (f++, o != null && o.kind === hn.DOWNLOAD && o.end === w ? o.end += E : (o = {
      kind: hn.DOWNLOAD,
      start: w,
      end: w + E
      // oldBlocks: null,
    }, Dc(o, a, x, y))) : o != null && o.kind === hn.COPY && o.end === T ? o.end += E : (o = {
      kind: hn.COPY,
      start: T,
      end: T + E
      // oldBlocks: [checksum]
    }, Dc(o, a, x, y));
  }
  return f > 0 && n.info(`File${s.name === "file" ? "" : " " + s.name} has ${f} changed blocks`), a;
}
const P1 = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function Dc(e, t, n, r) {
  if (P1 && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((s, a) => s < a ? s : a);
      throw new Error(`operation (block index: ${r}, checksum: ${n}, kind: ${hn[e.kind]}) overlaps previous operation (checksum: ${n}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function N1(e, t, n) {
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
function Pc(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.set(n.name, n);
  return t;
}
Object.defineProperty(er, "__esModule", { value: !0 });
er.DataSplitter = void 0;
er.copyData = $d;
const wi = _e, F1 = st, L1 = at, U1 = Sn, Ns = Buffer.from(`\r
\r
`), Nc = Buffer.from(`

`), k1 = Ns.length - 1, M1 = 4, j1 = 3;
function B1(e) {
  const t = e.indexOf(Ns), n = e.indexOf(Nc);
  return n !== -1 && (t === -1 || n < t) ? { end: n + Nc.length, lineFeedOnly: !0 } : t !== -1 ? { end: t + Ns.length, lineFeedOnly: !1 } : null;
}
var Mt;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(Mt || (Mt = {}));
function $d(e, t, n, r, i) {
  const o = (0, F1.createReadStream)("", {
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
class H1 extends L1.Writable {
  constructor(t, n, r, i, o, s, a, l) {
    super(), this.out = t, this.options = n, this.partIndexToTaskIndex = r, this.partIndexToLength = o, this.finishHandler = s, this.grandTotalBytes = a, this.onProgress = l, this.start = Date.now(), this.nextUpdate = this.start + 1e3, this.transferred = 0, this.delta = 0, this.partIndex = -1, this.headerListTail = null, this.readState = Mt.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryTextLength = i.length, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
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
      throw (0, wi.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const r = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= r, n = r;
    } else if (this.remainingPartDataCount > 0) {
      const r = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= r, await this.processPartData(t, 0, r), n = r;
    }
    if (n !== t.length) {
      if (this.readState === Mt.HEADER) {
        const r = this.searchHeaderListEnd(t, n);
        if (r === -1)
          return;
        n = r, this.readState = Mt.BODY;
      }
      for (; ; ) {
        if (this.readState === Mt.BODY)
          this.readState = Mt.INIT;
        else {
          this.partIndex++;
          let s = this.partIndexToTaskIndex.get(this.partIndex);
          if (s == null)
            if (this.isFinished)
              s = this.options.end;
            else
              throw (0, wi.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (a < s)
            await this.copyExistingData(a, s);
          else if (a > s)
            throw (0, wi.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (n = this.searchHeaderListEnd(t, n), n === -1) {
            this.readState = Mt.HEADER;
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
        if (s.kind !== U1.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        $d(s, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, n) {
    const r = this.headerListTail, i = r == null ? 0 : r.length, o = r == null ? t.subarray(n) : Buffer.concat([r, t.subarray(n)]), s = B1(o);
    return s != null ? (this.headerListTail = null, this.boundaryLength = this.boundaryTextLength + (s.lineFeedOnly ? j1 : M1), n + s.end - i) : (this.headerListTail = Buffer.from(o.subarray(Math.max(0, o.length - k1))), -1);
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, wi.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
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
er.DataSplitter = H1;
var po = {};
Object.defineProperty(po, "__esModule", { value: !0 });
po.executeTasksUsingMultipleRangeRequests = q1;
po.checkIsRangesSupported = Ls;
const Fs = _e, Fc = er, Lc = Sn;
function q1(e, t, n, r, i) {
  const o = (s) => {
    if (s >= t.length) {
      e.fileMetadataBuffer != null && n.write(e.fileMetadataBuffer), n.end();
      return;
    }
    const a = s + 1e3;
    G1(e, {
      tasks: t,
      start: s,
      end: Math.min(t.length, a),
      oldFileFd: r
    }, n, () => o(a), i);
  };
  return o;
}
function G1(e, t, n, r, i) {
  let o = "bytes=", s = 0, a = 0;
  const l = /* @__PURE__ */ new Map(), h = [];
  for (let p = t.start; p < t.end; p++) {
    const g = t.tasks[p];
    g.kind === Lc.OperationKind.DOWNLOAD && (o += `${g.start}-${g.end - 1}, `, l.set(s, p), s++, h.push(g.end - g.start), a += g.end - g.start);
  }
  if (s <= 1) {
    const p = (g) => {
      if (g >= t.end) {
        r();
        return;
      }
      const w = t.tasks[g++];
      if (w.kind === Lc.OperationKind.COPY)
        (0, Fc.copyData)(w, n, t.oldFileFd, i, () => p(g));
      else {
        const y = e.createRequestOptions();
        y.headers.Range = `bytes=${w.start}-${w.end - 1}`;
        const E = e.httpExecutor.createRequest(y, (x) => {
          x.on("error", i), Ls(x, i) && (x.pipe(n, {
            end: !1
          }), x.once("end", () => p(g)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(E, i), E.end();
      }
    };
    p(t.start);
    return;
  }
  const c = e.createRequestOptions();
  c.headers.Range = o.substring(0, o.length - 2);
  const f = e.httpExecutor.createRequest(c, (p) => {
    if (!Ls(p, i))
      return;
    const g = (0, Fs.safeGetHeader)(p, "content-type"), w = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(g);
    if (w == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${g}"`));
      return;
    }
    let y = !1, E = null;
    const x = () => {
      y = !0, E != null && (clearTimeout(E), E = null), r();
    }, T = new Fc.DataSplitter(n, t, l, w[1] || w[2], h, x, a, e.options.onProgress);
    T.on("error", i), p.pipe(T), p.on("end", () => {
      y || (E = setTimeout(() => {
        E = null, !y && (f.abort(), i(new Error("Response ends without calling any handlers")));
      }, 1e4));
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(f, i), f.end();
}
function Ls(e, t) {
  if (e.statusCode >= 400)
    return t((0, Fs.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const n = (0, Fs.safeGetHeader)(e, "accept-ranges");
    if (n == null || n === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var mo = {};
Object.defineProperty(mo, "__esModule", { value: !0 });
mo.ProgressDifferentialDownloadCallbackTransform = void 0;
const z1 = at;
var jn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(jn || (jn = {}));
class W1 extends z1.Transform {
  constructor(t, n, r) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = jn.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == jn.COPY) {
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
    this.operationType = jn.COPY;
  }
  beginRangeDownload() {
    this.operationType = jn.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
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
mo.ProgressDifferentialDownloadCallbackTransform = W1;
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.DifferentialDownloader = void 0;
const cr = _e, cs = Kt, V1 = st, Y1 = er, X1 = Jt, vi = Sn, Uc = po, J1 = mo;
class K1 {
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
    return (0, cr.configureRequestUrl)(this.options.newUrl, t), (0, cr.configureRequestOptions)(t), t;
  }
  doDownload(t, n) {
    if (t.version !== n.version)
      throw new Error(`version is different (${t.version} - ${n.version}), full download is required`);
    const r = this.logger, i = (0, vi.computeOperations)(t, n, r);
    r.debug != null && r.debug(JSON.stringify(i, null, 2));
    let o = 0, s = 0;
    for (const l of i) {
      const h = l.end - l.start;
      l.kind === vi.OperationKind.DOWNLOAD ? o += h : s += h;
    }
    const a = this.blockAwareFileInfo.size;
    if (o + s + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== a)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${s}, newSize: ${a}`);
    return r.info(`Full: ${kc(a)}, To download: ${kc(o)} (${Math.round(o / (a / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const n = [], r = () => Promise.all(n.map((i) => (0, cs.close)(i.descriptor).catch((o) => {
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
    const r = await (0, cs.open)(this.options.oldFile, "r");
    n.push({ descriptor: r, path: this.options.oldFile });
    const i = await (0, cs.open)(this.options.newFile, "w");
    n.push({ descriptor: i, path: this.options.newFile });
    const o = (0, V1.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((s, a) => {
      const l = [];
      let h;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const x = [];
        let T = 0;
        for (const k of t)
          k.kind === vi.OperationKind.DOWNLOAD && (x.push(k.end - k.start), T += k.end - k.start);
        const N = {
          expectedByteCounts: x,
          grandTotal: T
        };
        h = new J1.ProgressDifferentialDownloadCallbackTransform(N, this.options.cancellationToken, this.options.onProgress), l.push(h);
      }
      const c = new cr.DigestTransform(this.blockAwareFileInfo.sha512);
      c.isValidateOnEnd = !1, l.push(c), o.on("finish", () => {
        o.close(() => {
          n.splice(1, 1);
          try {
            c.validate();
          } catch (x) {
            a(x);
            return;
          }
          s(void 0);
        });
      }), l.push(o);
      let f = null;
      for (const x of l)
        x.on("error", a), f == null ? f = x : f = f.pipe(x);
      const p = l[0];
      let g;
      if (this.options.isUseMultipleRangeRequest) {
        g = (0, Uc.executeTasksUsingMultipleRangeRequests)(this, t, p, r, a), g(0);
        return;
      }
      let w = 0, y = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const E = this.createRequestOptions();
      E.redirect = "manual", g = (x) => {
        var T, N;
        if (x >= t.length) {
          this.fileMetadataBuffer != null && p.write(this.fileMetadataBuffer), p.end();
          return;
        }
        const k = t[x++];
        if (k.kind === vi.OperationKind.COPY) {
          h && h.beginFileCopy(), (0, Y1.copyData)(k, p, r, a, () => g(x));
          return;
        }
        const W = `bytes=${k.start}-${k.end - 1}`;
        E.headers.range = W, (N = (T = this.logger) === null || T === void 0 ? void 0 : T.debug) === null || N === void 0 || N.call(T, `download range: ${W}`), h && h.beginRangeDownload();
        const Y = this.httpExecutor.createRequest(E, (Q) => {
          Q.on("error", a), Q.on("aborted", () => {
            a(new Error("response has been aborted by the server"));
          }), Q.statusCode >= 400 && a((0, cr.createHttpError)(Q)), Q.pipe(p, {
            end: !1
          }), Q.once("end", () => {
            h && h.endRangeDownload(), ++w === 100 ? (w = 0, setTimeout(() => g(x), 1e3)) : g(x);
          });
        });
        Y.on("redirect", (Q, ne, q) => {
          this.logger.info(`Redirect to ${Q1(q)}`), y = q, (0, cr.configureRequestUrl)(new X1.URL(y), E), Y.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(Y, a), Y.end();
      }, g(0);
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
        (0, Uc.checkIsRangesSupported)(s, i) && (s.on("error", i), s.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), s.on("data", n), s.on("end", () => r()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
zr.DifferentialDownloader = K1;
function kc(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function Q1(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(ho, "__esModule", { value: !0 });
ho.GenericDifferentialDownloader = void 0;
const Z1 = zr;
class eb extends Z1.DifferentialDownloader {
  download(t, n) {
    return this.doDownload(t, n);
  }
}
ho.GenericDifferentialDownloader = eb;
var Qt = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = r;
  const t = _e;
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
})(Qt);
Object.defineProperty(zt, "__esModule", { value: !0 });
zt.NoOpLogger = zt.AppUpdater = void 0;
const Ue = _e, tb = Fr, nb = zi, rb = Gi, Ve = Kt, ib = $e, us = eo, Ke = le, ln = wd, Mc = qr, ob = so, jc = vd, sb = Gr, fs = ao, ds = Bs, ab = ho, In = Qt;
class va extends rb.EventEmitter {
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
        throw (0, Ue.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, Ue.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
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
    return (0, jc.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new Id();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new us.Lazy(() => this.loadUpdateConfig());
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
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new In.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (o) => this.checkIfUpdateSupported(o), this._isUserWithinRollout = (o) => this.isStagingMatch(o), this.clientPromise = null, this.stagingUserIdPromise = new us.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new us.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (o) => {
      this._logger.error(`Error: ${o.stack || o.message}`);
    }), n == null ? (this.app = new ob.ElectronAppAdapter(), this.httpExecutor = new jc.ElectronHttpExecutor((o, s) => this.emit("login", o, s))) : (this.app = n, this.httpExecutor = null);
    const r = this.app.version, i = (0, ln.parse)(r);
    if (i == null)
      throw (0, Ue.newError)(`App version is not a valid semver version: "${r}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = lb(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
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
    typeof t == "string" ? r = new sb.GenericProvider({ provider: "generic", url: t }, this, {
      ...n,
      isUseMultipleRangeRequest: (0, fs.isUrlProbablySupportMultiRangeRequests)(t)
    }) : r = (0, fs.createClient)(t, this, n), this.clientPromise = Promise.resolve(r);
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
      const r = va.formatDownloadNotification(n.updateInfo.version, this.app.name, t);
      new En.Notification(r).show();
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
    const i = await this.stagingUserIdPromise.value, s = Ue.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${r}, percentage: ${s}, user id: ${i}`), s < r;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const n = (0, ln.parse)(t.version);
    if (n == null)
      throw (0, Ue.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const r = this.currentVersion;
    if ((0, ln.eq)(n, r) || !await Promise.resolve(this.isUpdateSupported(t)) || !await Promise.resolve(this.isUserWithinRollout(t)))
      return !1;
    const o = (0, ln.gt)(n, r), s = (0, ln.lt)(n, r);
    return o ? !0 : this.allowDowngrade && s;
  }
  checkIfUpdateSupported(t) {
    const n = t == null ? void 0 : t.minimumSystemVersion, r = (0, nb.release)();
    if (n)
      try {
        if ((0, ln.lt)(r, n))
          return this._logger.info(`Current OS version ${r} is less than the minimum OS version required ${n} for version ${r}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${r}) with minimum OS version(${n}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((r) => (0, fs.createClient)(r, this, this.createProviderRuntimeOptions())));
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
    const r = new Ue.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: n,
      updateInfo: n,
      cancellationToken: r,
      downloadPromise: this.autoDownload ? this.downloadUpdate(r) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, Ue.asArray)(t.files).map((n) => n.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new Ue.CancellationToken()) {
    const n = this.updateInfoAndProvider;
    if (n == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise.then(Bc);
    this._logger.info(`Downloading update from ${(0, Ue.asArray)(n.info.files).map((i) => i.url).join(", ")}`);
    const r = (i) => {
      if (!(i instanceof Ue.CancellationError))
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
    }), this.downloadPromise.then(Bc);
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(In.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, ib.load)(await (0, Ve.readFile)(this._appUpdateConfigPath, "utf-8"));
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
    const t = Ke.join(this.app.userDataPath, ".updaterId");
    try {
      const r = await (0, Ve.readFile)(t, "utf-8");
      if (Ue.UUID.check(r))
        return r;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${r}`);
    } catch (r) {
      r.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${r}`);
    }
    const n = Ue.UUID.v5((0, tb.randomBytes)(4096), Ue.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${n}`);
    try {
      await (0, Ve.outputFile)(t, n);
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
      const i = Ke.join(this.app.baseCachePath, n || this.app.name);
      r.debug != null && r.debug(`updater cache dir: ${i}`), t = new Mc.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
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
    this.listenerCount(In.DOWNLOAD_PROGRESS) > 0 && (r.onProgress = (k) => this.emit(In.DOWNLOAD_PROGRESS, k));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, o = i.version, s = n.packageInfo;
    function a() {
      const k = decodeURIComponent(t.fileInfo.url.pathname);
      return k.toLowerCase().endsWith(`.${t.fileExtension.toLowerCase()}`) ? Ke.basename(k) : Ke.basename(t.fileInfo.info.url);
    }
    const l = await this.getOrCreateDownloadHelper(), h = l.cacheDirForPendingUpdate;
    await (0, Ve.mkdir)(h, { recursive: !0 });
    const c = a();
    let f = Ke.join(h, c);
    const p = s == null ? null : Ke.join(h, `package-${o}${Ke.extname(s.path) || ".7z"}`), g = Ke.join(h, "current.blockmap"), w = Ke.join(l.cacheDir, "current.blockmap"), y = async (k) => (await l.setDownloadedFile(f, p, i, n, c, k), await t.done({
      ...i,
      downloadedFile: f
    }), await (0, Ve.pathExists)(g) ? await (0, Ve.copyFile)(g, w) : t.downloadUpdateOptions.disableDifferentialDownload || await (0, Ve.remove)(w), p == null ? { updateFile: f } : { updateFile: f, packageFile: p }), E = this._logger, x = await l.validateDownloadedPath(f, i, n, E);
    if (x != null)
      return f = x, await y(!1);
    const T = async () => (await l.clear().catch(() => {
    }), await (0, Ve.unlink)(f).catch(() => {
    }));
    await (0, Ve.remove)(g);
    const N = await (0, Mc.createTempUpdateFile)(`temp-${c}`, h, E);
    try {
      await t.task(N, r, p, T), await (0, Ue.retry)(() => (0, Ve.rename)(N, f), {
        retries: 60,
        interval: 500,
        shouldRetry: (k) => k instanceof Error && /^EBUSY:/.test(k.message) ? !0 : (E.warn(`Cannot rename temp file to final file: ${k.message || k.stack}`), !1)
      });
    } catch (k) {
      throw await T(), k instanceof Ue.CancellationError ? (E.info("cancelled"), this.emit("update-cancelled", i)) : k.code === "ERR_CHECKSUM_MISMATCH" && E.warn(`sha512 checksum mismatch after full download of ${c}: the downloaded file is corrupted or the published update metadata does not match the uploaded file`), k;
    }
    return E.info(`New version ${o} has been downloaded to ${f}`), await y(!0);
  }
  async differentialDownloadInstaller(t, n, r, i, o) {
    let s = !1;
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const a = n.updateInfoAndProvider.provider, l = await a.getBlockMapFiles(t.url, this.app.version, n.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
      this._logger.info(`Download block maps (old: "${l[0]}", new: ${l[1]})`);
      const h = async (y) => {
        const E = await this.httpExecutor.downloadToBuffer(y, {
          headers: n.requestHeaders,
          cancellationToken: n.cancellationToken
        });
        if (E == null || E.length === 0)
          throw new Error(`Blockmap "${y.href}" is empty`);
        try {
          return JSON.parse((0, ds.gunzipSync)(E).toString());
        } catch (x) {
          throw new Error(`Cannot parse blockmap "${y.href}", error: ${x}`);
        }
      }, c = {
        newUrl: t.url,
        oldFile: Ke.join(this.downloadedUpdateHelper.cacheDir, o),
        logger: this._logger,
        newFile: r,
        isUseMultipleRangeRequest: a.isUseMultipleRangeRequest,
        requestHeaders: n.requestHeaders,
        cancellationToken: n.cancellationToken
      };
      this.listenerCount(In.DOWNLOAD_PROGRESS) > 0 && (c.onProgress = (y) => this.emit(In.DOWNLOAD_PROGRESS, y));
      const f = async (y, E) => {
        const x = Ke.join(E, "current.blockmap");
        await (0, Ve.outputFile)(x, (0, ds.gzipSync)(JSON.stringify(y)));
      }, p = async (y) => {
        const E = Ke.join(y, "current.blockmap");
        try {
          if (await (0, Ve.pathExists)(E))
            return JSON.parse((0, ds.gunzipSync)(await (0, Ve.readFile)(E)).toString());
        } catch (x) {
          this._logger.warn(`Cannot parse blockmap "${E}", error: ${x}`);
        }
        return null;
      }, g = await h(l[1]);
      await f(g, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
      let w = await p(this.downloadedUpdateHelper.cacheDir);
      return s = w != null, w == null && (this._logger.info(`No cached blockmap for the old installer, downloading it from "${l[0]}"`), w = await h(l[0])), await new ab.GenericDifferentialDownloader(t.info, this.httpExecutor, c).download(w, g), !1;
    } catch (a) {
      if (a.code === "ERR_CHECKSUM_MISMATCH" && this._logger.warn(`sha512 checksum mismatch after differential download (old blockmap ${s ? "was read from the local cache" : "was downloaded from the server"}): cached "${o}" is likely out of sync with the old blockmap, e.g. because one of them was replaced or evicted independently of the other`), this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), this._testOnlyOptions != null)
        throw a;
      return !0;
    }
  }
}
zt.AppUpdater = va;
function lb(e) {
  const t = (0, ln.prerelease)(e);
  return t != null && t.length > 0;
}
class Id {
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
zt.NoOpLogger = Id;
function Bc({ updateFile: e, packageFile: t }) {
  return t == null ? [e] : [e, t];
}
Object.defineProperty(bn, "__esModule", { value: !0 });
bn.BaseUpdater = void 0;
const Hc = qi, hs = le, cb = zt;
class ub extends cb.AppUpdater {
  constructor(t, n) {
    super(t, n), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, n = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? n : this.autoRunAppAfterInstall) ? setImmediate(() => {
      En.autoUpdater.emit("before-quit-for-update"), this.app.quit();
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
    return t.split(hs.delimiter).filter((n) => hs.isAbsolute(n)).join(hs.delimiter);
  }
  spawnSyncLog(t, n = [], r = {}) {
    var i;
    this._logger.info(`Executing: ${t} with args: ${n}`);
    const o = { ...process.env, ...r }, s = (0, Hc.spawnSync)(t, n, {
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
        const a = { stdio: i, env: r, detached: !0 }, l = (0, Hc.spawn)(t, n, a);
        l.on("error", (h) => {
          s(h);
        }), l.unref(), l.pid !== void 0 && o(!0);
      } catch (a) {
        s(a);
      }
    });
  }
}
bn.BaseUpdater = ub;
var $r = {}, Wr = {};
Object.defineProperty(Wr, "__esModule", { value: !0 });
Wr.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const On = Kt, fb = zr, db = Bs;
class hb extends fb.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, n = t.size, r = n - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(r, n - 1);
    const i = Od(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await pb(this.options.oldFile), i);
  }
}
Wr.FileWithEmbeddedBlockMapDifferentialDownloader = hb;
function Od(e) {
  return JSON.parse((0, db.inflateRawSync)(e).toString());
}
async function pb(e) {
  const t = await (0, On.open)(e, "r");
  try {
    const n = (await (0, On.fstat)(t)).size, r = Buffer.allocUnsafe(4);
    await (0, On.read)(t, r, 0, r.length, n - r.length);
    const i = Buffer.allocUnsafe(r.readUInt32BE(0));
    return await (0, On.read)(t, i, 0, i.length, n - r.length - i.length), await (0, On.close)(t), Od(i);
  } catch (n) {
    throw await (0, On.close)(t), n;
  }
}
Object.defineProperty($r, "__esModule", { value: !0 });
$r.AppImageUpdater = void 0;
const ps = _e, qc = qi, mb = Kt, gb = st, Rn = le, yb = bn, Eb = Wr, wb = ye, Gc = Qt;
class vb extends yb.BaseUpdater {
  constructor(t, n) {
    super(t, n);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, wb.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        const s = process.env.APPIMAGE;
        if (s == null)
          throw (0, ps.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(r, s, i, n, t)) && await this.httpExecutor.download(r.url, i, o), await (0, mb.chmod)(i, 493);
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
      return this.listenerCount(Gc.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(Gc.DOWNLOAD_PROGRESS, a)), await new Eb.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, s).download(), !1;
    } catch (s) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const n = process.env.APPIMAGE;
    if (n == null)
      throw (0, ps.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    if (!Rn.isAbsolute(n) || n.includes("\0"))
      throw (0, ps.newError)(`APPIMAGE env is not a valid absolute path: "${n}"`, "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, gb.unlinkSync)(n);
    let r;
    const i = Rn.basename(n), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    Rn.basename(o) === i || !/\d+\.\d+\.\d+/.test(i) ? r = n : r = Rn.join(Rn.dirname(n), Rn.basename(o)), (0, qc.execFileSync)("mv", ["-f", o, r]), r !== n && this.emit("appimage-filename-updated", r);
    const s = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(r, [], s) : (s.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, qc.execFileSync)(r, [], { env: s })), !0;
  }
}
$r.AppImageUpdater = vb;
var Ir = {}, tr = {};
Object.defineProperty(tr, "__esModule", { value: !0 });
tr.LinuxUpdater = void 0;
const _b = bn, bb = /^[a-zA-Z0-9_-]+$/;
class xb extends _b.BaseUpdater {
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
    i && (bb.test(i) ? r = [i] : this._logger.warn(`ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER "${i}" contains unsafe characters. Ignoring override.`));
    for (const a of r)
      if (this.hasCommand(a))
        return a;
    const o = i ? `ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER override "${i}", ` : "", s = t[0];
    return this._logger.warn(`No package manager found in the list: ${o}${t.join(", ")}. Utilizing default: ${s}`), s;
  }
}
tr.LinuxUpdater = xb;
Object.defineProperty(Ir, "__esModule", { value: !0 });
Ir.DebUpdater = void 0;
const Sb = ye, zc = Qt, Ab = tr;
class _a extends Ab.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, Sb.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(zc.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(zc.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(r.url, i, o);
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
      _a.installWithCommandRunner(i, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
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
Ir.DebUpdater = _a;
var Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.PacmanUpdater = void 0;
const Wc = Qt, Tb = ye, Cb = tr;
class ba extends Cb.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, Tb.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Wc.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(Wc.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(r.url, i, o);
      }
    });
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    try {
      ba.installWithCommandRunner(n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
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
Or.PacmanUpdater = ba;
var Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.RpmUpdater = void 0;
const Vc = Qt, $b = ye, Ib = tr;
class xa extends Ib.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, $b.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Vc.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(Vc.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(r.url, i, o);
      }
    });
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const r = ["zypper", "dnf", "yum", "rpm"], i = this.detectPackageManager(r);
    try {
      xa.installWithCommandRunner(i, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
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
Rr.RpmUpdater = xa;
var Dr = {};
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.MacUpdater = void 0;
const Yc = _e, ms = Kt, Ob = st, Xc = le, Rb = np, Db = zt, Pb = ye, Jc = qi, Kc = Fr;
class Sa extends Db.AppUpdater {
  constructor(t, n) {
    super(t, n), this.nativeUpdater = En.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (r) => {
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
      this.debug("Checking for macOS Rosetta environment"), o = (0, Jc.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), r.info(`Checked for macOS Rosetta environment (isRosetta=${o})`);
    } catch (c) {
      r.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${c}`);
    }
    let s = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const f = (0, Jc.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      r.info(`Checked 'uname -a': arm64=${f}`), s = s || f;
    } catch (c) {
      r.warn(`uname shell command to check for arm64 failed: ${c}`);
    }
    s = s || process.arch === "arm64" || o, n = Sa.filterFilesForArch(n, s);
    const a = (0, Pb.findFile)(n, "zip", ["pkg", "dmg"]);
    if (a == null)
      throw (0, Yc.newError)(`ZIP file not provided: ${(0, Yc.safeStringifyJson)(n)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const l = t.updateInfoAndProvider.provider, h = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: a,
      downloadUpdateOptions: t,
      task: async (c, f) => {
        const p = Xc.join(this.downloadedUpdateHelper.cacheDir, h), g = () => (0, ms.pathExistsSync)(p) ? !t.disableDifferentialDownload : (r.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let w = !0;
        g() && (w = await this.differentialDownloadInstaller(a, t, c, l, h)), w && await this.httpExecutor.download(a.url, c, f);
      },
      done: async (c) => {
        if (!t.disableDifferentialDownload)
          try {
            const f = Xc.join(this.downloadedUpdateHelper.cacheDir, h);
            await (0, ms.copyFile)(c.downloadedFile, f);
          } catch (f) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${f.message}`);
          }
        return this.updateDownloaded(a, c);
      }
    });
  }
  async updateDownloaded(t, n) {
    var r;
    const i = n.downloadedFile, o = (r = t.info.size) !== null && r !== void 0 ? r : (await (0, ms.stat)(i)).size, s = this._logger, a = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${a})`), this.server = (0, Rb.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${a})`), this.server.on("close", () => {
      s.info(`Proxy server for native Squirrel.Mac is closed (${a})`);
    });
    const l = (h) => {
      const c = h.address();
      return typeof c == "string" ? c : `http://127.0.0.1:${c == null ? void 0 : c.port}`;
    };
    return await new Promise((h, c) => {
      const f = (0, Kc.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), p = Buffer.from(`autoupdater:${f}`, "ascii"), g = `/${(0, Kc.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (w, y) => {
        const E = w.url;
        if (s.info(`${E} requested`), E === "/") {
          if (!w.headers.authorization || w.headers.authorization.indexOf("Basic ") === -1) {
            y.statusCode = 401, y.statusMessage = "Invalid Authentication Credentials", y.end(), s.warn("No authenthication info");
            return;
          }
          const N = w.headers.authorization.split(" ")[1], k = Buffer.from(N, "base64").toString("ascii"), [W, Y] = k.split(":");
          if (W !== "autoupdater" || Y !== f) {
            y.statusCode = 401, y.statusMessage = "Invalid Authentication Credentials", y.end(), s.warn("Invalid authenthication credentials");
            return;
          }
          const Q = Buffer.from(`{ "url": "${l(this.server)}${g}" }`);
          y.writeHead(200, { "Content-Type": "application/json", "Content-Length": Q.length }), y.end(Q);
          return;
        }
        if (!E.startsWith(g)) {
          s.warn(`${E} requested, but not supported`), y.writeHead(404), y.end();
          return;
        }
        s.info(`${g} requested by Squirrel.Mac, pipe ${i}`);
        let x = !1;
        y.on("finish", () => {
          x || (this.nativeUpdater.removeListener("error", c), h([]));
        });
        const T = (0, Ob.createReadStream)(i);
        T.on("error", (N) => {
          try {
            y.end();
          } catch (k) {
            s.warn(`cannot end response: ${k}`);
          }
          x = !0, this.nativeUpdater.removeListener("error", c), c(new Error(`Cannot pipe "${i}": ${N}`));
        }), y.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": o
        }), T.pipe(y);
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
Dr.MacUpdater = Sa;
var Pr = {}, Aa = {};
Object.defineProperty(Aa, "__esModule", { value: !0 });
Aa.verifySignature = Fb;
const Qc = _e, Rd = qi, Nb = zi, Zc = le;
function Dd(e, t) {
  return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", e], {
    shell: !0,
    timeout: t
  }];
}
function Fb(e, t, n) {
  return new Promise((r, i) => {
    const o = t.replace(/'/g, "''");
    n.info(`Verifying signature ${o}`), (0, Rd.execFile)(...Dd(`"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`, 20 * 1e3), (s, a, l) => {
      var h;
      try {
        if (s != null || l) {
          gs(n, s, l, i), r(null);
          return;
        }
        const c = Lb(a);
        if (c.Status === 0) {
          try {
            const w = Zc.normalize(c.Path), y = Zc.normalize(t);
            if (n.info(`LiteralPath: ${w}. Update Path: ${y}`), w !== y) {
              gs(n, new Error(`LiteralPath of ${w} is different than ${y}`), l, i), r(null);
              return;
            }
          } catch (w) {
            n.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(h = w.message) !== null && h !== void 0 ? h : w.stack}`);
          }
          const p = (0, Qc.parseDn)(c.SignerCertificate.Subject);
          let g = !1;
          for (const w of e) {
            const y = (0, Qc.parseDn)(w);
            if (y.size ? g = Array.from(y.keys()).every((x) => y.get(x) === p.get(x)) : w === p.get("CN") && (n.warn(`Signature validated using only CN ${w}. Please add your full Distinguished Name (DN) to publisherNames configuration`), g = !0), g) {
              r(null);
              return;
            }
          }
        }
        const f = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(c, (p, g) => p === "RawData" ? void 0 : g, 2);
        n.warn(`Sign verification failed, installer signed with incorrect certificate: ${f}`), r(f);
      } catch (c) {
        gs(n, c, null, i), r(null);
        return;
      }
    });
  });
}
function Lb(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const n = t.SignerCertificate;
  return n != null && (delete n.Archived, delete n.Extensions, delete n.Handle, delete n.HasPrivateKey, delete n.SubjectName), t;
}
function gs(e, t, n, r) {
  if (Ub()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || n}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, Rd.execFileSync)(...Dd("ConvertTo-Json test", 10 * 1e3));
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && r(t), n && r(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${n}. Failing signature validation due to unknown stderr.`));
}
function Ub() {
  const e = Nb.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(Pr, "__esModule", { value: !0 });
Pr.NsisUpdater = void 0;
const _i = _e, eu = le, kb = bn, Mb = Wr, tu = Qt, jb = ye, Bb = Kt, Hb = Aa, nu = Jt;
class qb extends kb.BaseUpdater {
  constructor(t, n) {
    super(t, n), this._verifyUpdateCodeSignature = (r, i) => (0, Hb.verifySignature)(r, i, this._logger);
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
    const n = t.updateInfoAndProvider.provider, r = (0, jb.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: r,
      task: async (i, o, s, a) => {
        const l = r.packageInfo, h = l != null && s != null;
        if (h && t.disableWebInstaller)
          throw (0, _i.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !h && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (h || t.disableDifferentialDownload || await this.differentialDownloadInstaller(r, t, i, n, _i.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(r.url, i, o);
        const c = await this.verifySignature(i);
        if (c != null)
          throw await a(), (0, _i.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${c}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (h && await this.differentialDownloadWebPackage(t, l, s, n))
          try {
            await this.httpExecutor.download(new nu.URL(l.path), s, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: l.sha512
            });
          } catch (f) {
            try {
              await (0, Bb.unlink)(s);
            } catch {
            }
            throw f;
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
      this.spawnLog(eu.join(process.resourcesPath, "elevate.exe"), [n].concat(r)).catch((s) => this.dispatchError(s));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), o(), !0) : (this.spawnLog(n, r).catch((s) => {
      const a = s.code;
      this._logger.info(`Cannot run installer: error code: ${a}, error message: "${s.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), a === "UNKNOWN" || a === "EACCES" ? o() : a === "ENOENT" ? En.shell.openPath(n).catch((l) => this.dispatchError(l)) : this.dispatchError(s);
    }), !0);
  }
  async differentialDownloadWebPackage(t, n, r, i) {
    if (n.blockMapSize == null)
      return !0;
    try {
      const o = {
        newUrl: new nu.URL(n.path),
        oldFile: eu.join(this.downloadedUpdateHelper.cacheDir, _i.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: r,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(tu.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(tu.DOWNLOAD_PROGRESS, s)), await new Mb.FileWithEmbeddedBlockMapDifferentialDownloader(n, this.httpExecutor, o).download();
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "win32";
    }
    return !1;
  }
}
Pr.NsisUpdater = qb;
(function(e) {
  var t = Fe && Fe.__createBinding || (Object.create ? function(E, x, T, N) {
    N === void 0 && (N = T);
    var k = Object.getOwnPropertyDescriptor(x, T);
    (!k || ("get" in k ? !x.__esModule : k.writable || k.configurable)) && (k = { enumerable: !0, get: function() {
      return x[T];
    } }), Object.defineProperty(E, N, k);
  } : function(E, x, T, N) {
    N === void 0 && (N = T), E[N] = x[T];
  }), n = Fe && Fe.__exportStar || function(E, x) {
    for (var T in E) T !== "default" && !Object.prototype.hasOwnProperty.call(x, T) && t(x, E, T);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const r = Kt, i = le;
  var o = bn;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return o.BaseUpdater;
  } });
  var s = zt;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return s.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return s.NoOpLogger;
  } });
  var a = ye;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return a.Provider;
  } });
  var l = $r;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return l.AppImageUpdater;
  } });
  var h = Ir;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return h.DebUpdater;
  } });
  var c = Or;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return c.PacmanUpdater;
  } });
  var f = Rr;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return f.RpmUpdater;
  } });
  var p = Dr;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return p.MacUpdater;
  } });
  var g = Pr;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return g.NsisUpdater;
  } }), n(Qt, e);
  let w;
  function y() {
    if (process.platform === "win32")
      w = new Pr.NsisUpdater();
    else if (process.platform === "darwin")
      w = new Dr.MacUpdater();
    else {
      w = new $r.AppImageUpdater();
      try {
        const E = i.join(process.resourcesPath, "package-type");
        if (!(0, r.existsSync)(E))
          return w;
        switch ((0, r.readFileSync)(E).toString().trim()) {
          case "deb":
            w = new Ir.DebUpdater();
            break;
          case "rpm":
            w = new Rr.RpmUpdater();
            break;
          case "pacman":
            w = new Or.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (E) {
        console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", E.message);
      }
    }
    return w;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => w || y()
  });
})(De);
var nr = { exports: {} }, Ta = { exports: {} }, Gb = Pd;
function Pd(e, t) {
  if (e && t) return Pd(e)(t);
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
var Nd = Gb;
Ta.exports = Nd(Ci);
Ta.exports.strict = Nd(Fd);
Ci.proto = Ci(function() {
  Object.defineProperty(Function.prototype, "once", {
    value: function() {
      return Ci(this);
    },
    configurable: !0
  }), Object.defineProperty(Function.prototype, "onceStrict", {
    value: function() {
      return Fd(this);
    },
    configurable: !0
  });
});
function Ci(e) {
  var t = function() {
    return t.called ? t.value : (t.called = !0, t.value = e.apply(this, arguments));
  };
  return t.called = !1, t;
}
function Fd(e) {
  var t = function() {
    if (t.called)
      throw new Error(t.onceError);
    return t.called = !0, t.value = e.apply(this, arguments);
  }, n = e.name || "Function wrapped with `once`";
  return t.onceError = n + " shouldn't be called more than once", t.called = !1, t;
}
var Ld = Ta.exports, zb = Ld, Wb = function() {
}, Vb = Fe.Bare ? queueMicrotask : process.nextTick.bind(process), Yb = function(e) {
  return e.setHeader && typeof e.abort == "function";
}, Xb = function(e) {
  return e.stdio && Array.isArray(e.stdio) && e.stdio.length === 3;
}, Ud = function(e, t, n) {
  if (typeof t == "function") return Ud(e, null, t);
  t || (t = {}), n = zb(n || Wb);
  var r = e._writableState, i = e._readableState, o = t.readable || t.readable !== !1 && e.readable, s = t.writable || t.writable !== !1 && e.writable, a = !1, l = function() {
    e.writable || h();
  }, h = function() {
    s = !1, o || n.call(e);
  }, c = function() {
    o = !1, s || n.call(e);
  }, f = function(E) {
    n.call(e, E ? new Error("exited with error code: " + E) : null);
  }, p = function(E) {
    n.call(e, E);
  }, g = function() {
    Vb(w);
  }, w = function() {
    if (!a) {
      if (o && !(i && i.ended && !i.destroyed)) return n.call(e, new Error("premature close"));
      if (s && !(r && r.ended && !r.destroyed)) return n.call(e, new Error("premature close"));
    }
  }, y = function() {
    e.req.on("finish", h);
  };
  return Yb(e) ? (e.on("complete", h), e.on("abort", g), e.req ? y() : e.on("request", y)) : s && !r && (e.on("end", l), e.on("close", l)), Xb(e) && e.on("exit", f), e.on("end", c), e.on("finish", h), t.error !== !1 && e.on("error", p), e.on("close", g), function() {
    a = !0, e.removeListener("complete", h), e.removeListener("abort", g), e.removeListener("request", y), e.req && e.req.removeListener("finish", h), e.removeListener("end", l), e.removeListener("close", l), e.removeListener("finish", h), e.removeListener("exit", f), e.removeListener("end", c), e.removeListener("error", p), e.removeListener("close", g);
  };
}, Jb = Ud, Kb = Ld, Qb = Jb, $i;
try {
  $i = require("fs");
} catch {
}
var Nr = function() {
}, Zb = typeof process > "u" ? !1 : /^v?\.0/.test(process.version), go = function(e) {
  return typeof e == "function";
}, ex = function(e) {
  return !Zb || !$i ? !1 : (e instanceof ($i.ReadStream || Nr) || e instanceof ($i.WriteStream || Nr)) && go(e.close);
}, tx = function(e) {
  return e.setHeader && go(e.abort);
}, nx = function(e, t, n, r) {
  r = Kb(r);
  var i = !1;
  e.on("close", function() {
    i = !0;
  }), Qb(e, { readable: t, writable: n }, function(s) {
    if (s) return r(s);
    i = !0, r();
  });
  var o = !1;
  return function(s) {
    if (!i && !o) {
      if (o = !0, ex(e)) return e.close(Nr);
      if (tx(e)) return e.abort();
      if (go(e.destroy)) return e.destroy();
      r(s || new Error("stream was destroyed"));
    }
  };
}, ru = function(e) {
  e();
}, rx = function(e, t) {
  return e.pipe(t);
}, ix = function() {
  var e = Array.prototype.slice.call(arguments), t = go(e[e.length - 1] || Nr) && e.pop() || Nr;
  if (Array.isArray(e[0]) && (e = e[0]), e.length < 2) throw new Error("pump requires two streams per minimum");
  var n, r = e.map(function(i, o) {
    var s = o < e.length - 1, a = o > 0;
    return nx(i, s, a, function(l) {
      n || (n = l), l && r.forEach(ru), !s && (r.forEach(ru), t(n));
    });
  });
  return e.reduce(rx);
}, ox = ix;
const { PassThrough: sx } = at;
var ax = (e) => {
  e = { ...e };
  const { array: t } = e;
  let { encoding: n } = e;
  const r = n === "buffer";
  let i = !1;
  t ? i = !(n || r) : n = n || "utf8", r && (n = null);
  const o = new sx({ objectMode: i });
  n && o.setEncoding(n);
  let s = 0;
  const a = [];
  return o.on("data", (l) => {
    a.push(l), i ? s = a.length : s += l.length;
  }), o.getBufferedValue = () => t ? a : r ? Buffer.concat(a, s) : a.join(""), o.getBufferedLength = () => s, o;
};
const { constants: lx } = fu, cx = ox, ux = ax;
class kd extends Error {
  constructor() {
    super("maxBuffer exceeded"), this.name = "MaxBufferError";
  }
}
async function yo(e, t) {
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
      a && r.getBufferedLength() <= lx.MAX_LENGTH && (a.bufferedData = r.getBufferedValue()), o(a);
    };
    r = cx(e, ux(t), (a) => {
      if (a) {
        s(a);
        return;
      }
      i();
    }), r.on("data", () => {
      r.getBufferedLength() > n && s(new kd());
    });
  }), r.getBufferedValue();
}
nr.exports = yo;
nr.exports.default = yo;
nr.exports.buffer = (e, t) => yo(e, { ...t, encoding: "buffer" });
nr.exports.array = (e, t) => yo(e, { ...t, array: !0 });
nr.exports.MaxBufferError = kd;
var fx = nr.exports, wt = {}, Vr = {}, dx = Eo;
function Eo() {
  this.pending = 0, this.max = 1 / 0, this.listeners = [], this.waiting = [], this.error = null;
}
Eo.prototype.go = function(e) {
  this.pending < this.max ? jd(this, e) : this.waiting.push(e);
};
Eo.prototype.wait = function(e) {
  this.pending === 0 ? e(this.error) : this.listeners.push(e);
};
Eo.prototype.hold = function() {
  return Md(this);
};
function Md(e) {
  e.pending += 1;
  var t = !1;
  return n;
  function n(i) {
    if (t) throw new Error("callback called twice");
    if (t = !0, e.error = e.error || i, e.pending -= 1, e.waiting.length > 0 && e.pending < e.max)
      jd(e, e.waiting.shift());
    else if (e.pending === 0) {
      var o = e.listeners;
      e.listeners = [], o.forEach(r);
    }
  }
  function r(i) {
    i(e.error);
  }
}
function jd(e, t) {
  t(Md(e));
}
var Yr = st, wo = Jn, Ca = at, Bd = Ca.Readable, $a = Ca.Writable, hx = Ca.PassThrough, px = dx, vo = Gi.EventEmitter;
Vr.createFromBuffer = mx;
Vr.createFromFd = gx;
Vr.BufferSlicer = It;
Vr.FdSlicer = $t;
wo.inherits($t, vo);
function $t(e, t) {
  t = t || {}, vo.call(this), this.fd = e, this.pend = new px(), this.pend.max = 1, this.refCount = 0, this.autoClose = !!t.autoClose;
}
$t.prototype.read = function(e, t, n, r, i) {
  var o = this;
  o.pend.go(function(s) {
    Yr.read(o.fd, e, t, n, r, function(a, l, h) {
      s(), i(a, l, h);
    });
  });
};
$t.prototype.write = function(e, t, n, r, i) {
  var o = this;
  o.pend.go(function(s) {
    Yr.write(o.fd, e, t, n, r, function(a, l, h) {
      s(), i(a, l, h);
    });
  });
};
$t.prototype.createReadStream = function(e) {
  return new _o(this, e);
};
$t.prototype.createWriteStream = function(e) {
  return new bo(this, e);
};
$t.prototype.ref = function() {
  this.refCount += 1;
};
$t.prototype.unref = function() {
  var e = this;
  if (e.refCount -= 1, e.refCount > 0) return;
  if (e.refCount < 0) throw new Error("invalid unref");
  e.autoClose && Yr.close(e.fd, t);
  function t(n) {
    n ? e.emit("error", n) : e.emit("close");
  }
};
wo.inherits(_o, Bd);
function _o(e, t) {
  t = t || {}, Bd.call(this, t), this.context = e, this.context.ref(), this.start = t.start || 0, this.endOffset = t.end, this.pos = this.start, this.destroyed = !1;
}
_o.prototype._read = function(e) {
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
      Yr.read(t.context.fd, i, 0, n, t.pos, function(o, s) {
        o ? t.destroy(o) : s === 0 ? (t.destroyed = !0, t.push(null), t.context.unref()) : (t.pos += s, t.push(i.slice(0, s))), r();
      });
    });
  }
};
_o.prototype.destroy = function(e) {
  this.destroyed || (e = e || new Error("stream destroyed"), this.destroyed = !0, this.emit("error", e), this.context.unref());
};
wo.inherits(bo, $a);
function bo(e, t) {
  t = t || {}, $a.call(this, t), this.context = e, this.context.ref(), this.start = t.start || 0, this.endOffset = t.end == null ? 1 / 0 : +t.end, this.bytesWritten = 0, this.pos = this.start, this.destroyed = !1, this.on("finish", this.destroy.bind(this));
}
bo.prototype._write = function(e, t, n) {
  var r = this;
  if (!r.destroyed) {
    if (r.pos + e.length > r.endOffset) {
      var i = new Error("maximum file length exceeded");
      i.code = "ETOOBIG", r.destroy(), n(i);
      return;
    }
    r.context.pend.go(function(o) {
      if (r.destroyed) return o();
      Yr.write(r.context.fd, e, 0, e.length, r.pos, function(s, a) {
        s ? (r.destroy(), o(), n(s)) : (r.bytesWritten += a, r.pos += a, r.emit("progress"), o(), n());
      });
    });
  }
};
bo.prototype.destroy = function() {
  this.destroyed || (this.destroyed = !0, this.context.unref());
};
wo.inherits(It, vo);
function It(e, t) {
  vo.call(this), t = t || {}, this.refCount = 0, this.buffer = e, this.maxChunkSize = t.maxChunkSize || Number.MAX_SAFE_INTEGER;
}
It.prototype.read = function(e, t, n, r, i) {
  var o = r + n, s = o - this.buffer.length, a = s > 0 ? s : n;
  this.buffer.copy(e, t, r, o), setImmediate(function() {
    i(null, a);
  });
};
It.prototype.write = function(e, t, n, r, i) {
  e.copy(this.buffer, r, t, t + n), setImmediate(function() {
    i(null, n, e);
  });
};
It.prototype.createReadStream = function(e) {
  e = e || {};
  var t = new hx(e);
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
It.prototype.createWriteStream = function(e) {
  var t = this;
  e = e || {};
  var n = new $a(e);
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
It.prototype.ref = function() {
  this.refCount += 1;
};
It.prototype.unref = function() {
  if (this.refCount -= 1, this.refCount < 0)
    throw new Error("invalid unref");
};
function mx(e, t) {
  return new It(e, t);
}
function gx(e, t) {
  return new $t(e, t);
}
var kt = fu.Buffer, Us = [
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
typeof Int32Array < "u" && (Us = new Int32Array(Us));
function Hd(e) {
  if (kt.isBuffer(e))
    return e;
  var t = typeof kt.alloc == "function" && typeof kt.from == "function";
  if (typeof e == "number")
    return t ? kt.alloc(e) : new kt(e);
  if (typeof e == "string")
    return t ? kt.from(e) : new kt(e);
  throw new Error("input must be buffer, number, or string, received " + typeof e);
}
function yx(e) {
  var t = Hd(4);
  return t.writeInt32BE(e, 0), t;
}
function Ia(e, t) {
  e = Hd(e), kt.isBuffer(t) && (t = t.readUInt32BE(0));
  for (var n = ~~t ^ -1, r = 0; r < e.length; r++)
    n = Us[(n ^ e[r]) & 255] ^ n >>> 8;
  return n ^ -1;
}
function Oa() {
  return yx(Ia.apply(null, arguments));
}
Oa.signed = function() {
  return Ia.apply(null, arguments);
};
Oa.unsigned = function() {
  return Ia.apply(null, arguments) >>> 0;
};
var Ex = Oa, ks = st, wx = Bs, qd = Vr, vx = Ex, xo = Jn, So = Gi.EventEmitter, Gd = at.Transform, Ra = at.PassThrough, _x = at.Writable;
wt.open = bx;
wt.fromFd = zd;
wt.fromBuffer = xx;
wt.fromRandomAccessReader = Da;
wt.dosDateTimeToDate = Vd;
wt.validateFileName = Yd;
wt.ZipFile = Xt;
wt.Entry = Xr;
wt.RandomAccessReader = Zt;
function bx(e, t, n) {
  typeof t == "function" && (n = t, t = null), t == null && (t = {}), t.autoClose == null && (t.autoClose = !0), t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1), n == null && (n = Hi), ks.open(e, "r", function(r, i) {
    if (r) return n(r);
    zd(i, t, function(o, s) {
      o && ks.close(i, Hi), n(o, s);
    });
  });
}
function zd(e, t, n) {
  typeof t == "function" && (n = t, t = null), t == null && (t = {}), t.autoClose == null && (t.autoClose = !1), t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1), n == null && (n = Hi), ks.fstat(e, function(r, i) {
    if (r) return n(r);
    var o = qd.createFromFd(e, { autoClose: !0 });
    Da(o, i.size, t, n);
  });
}
function xx(e, t, n) {
  typeof t == "function" && (n = t, t = null), t == null && (t = {}), t.autoClose = !1, t.lazyEntries == null && (t.lazyEntries = !1), t.decodeStrings == null && (t.decodeStrings = !0), t.validateEntrySizes == null && (t.validateEntrySizes = !0), t.strictFileNames == null && (t.strictFileNames = !1);
  var r = qd.createFromBuffer(e, { maxChunkSize: 65536 });
  Da(r, e.length, t, n);
}
function Da(e, t, n, r) {
  typeof n == "function" && (r = n, n = null), n == null && (n = {}), n.autoClose == null && (n.autoClose = !0), n.lazyEntries == null && (n.lazyEntries = !1), n.decodeStrings == null && (n.decodeStrings = !0);
  var i = !!n.decodeStrings;
  if (n.validateEntrySizes == null && (n.validateEntrySizes = !0), n.strictFileNames == null && (n.strictFileNames = !1), r == null && (r = Hi), typeof t != "number") throw new Error("expected totalSize parameter to be a number");
  if (t > Number.MAX_SAFE_INTEGER)
    throw new Error("zip file too large. only file sizes up to 2^52 are supported due to JavaScript's Number type being an IEEE 754 double.");
  e.ref();
  var o = 22, s = 65535, a = Math.min(o + s, t), l = yt(a), h = t - l.length;
  Gn(e, l, 0, a, h, function(c) {
    if (c) return r(c);
    for (var f = a - o; f >= 0; f -= 1)
      if (l.readUInt32LE(f) === 101010256) {
        var p = l.slice(f), g = p.readUInt16LE(4);
        if (g !== 0)
          return r(new Error("multi-disk zip files are not supported: found disk number: " + g));
        var w = p.readUInt16LE(10), y = p.readUInt32LE(16), E = p.readUInt16LE(20), x = p.length - o;
        if (E !== x)
          return r(new Error("invalid comment length. expected: " + x + ". found: " + E));
        var T = i ? Ii(p, 22, p.length, !1) : p.slice(22);
        if (!(w === 65535 || y === 4294967295))
          return r(null, new Xt(e, y, t, w, T, n.autoClose, n.lazyEntries, i, n.validateEntrySizes, n.strictFileNames));
        var N = yt(20), k = h + f - N.length;
        Gn(e, N, 0, N.length, k, function(W) {
          if (W) return r(W);
          if (N.readUInt32LE(0) !== 117853008)
            return r(new Error("invalid zip64 end of central directory locator signature"));
          var Y = zn(N, 8), Q = yt(56);
          Gn(e, Q, 0, Q.length, Y, function(ne) {
            return ne ? r(ne) : Q.readUInt32LE(0) !== 101075792 ? r(new Error("invalid zip64 end of central directory record signature")) : (w = zn(Q, 32), y = zn(Q, 48), r(null, new Xt(e, y, t, w, T, n.autoClose, n.lazyEntries, i, n.validateEntrySizes, n.strictFileNames)));
          });
        });
        return;
      }
    r(new Error("end of central directory record signature not found"));
  });
}
xo.inherits(Xt, So);
function Xt(e, t, n, r, i, o, s, a, l, h) {
  var c = this;
  So.call(c), c.reader = e, c.reader.on("error", function(f) {
    Wd(c, f);
  }), c.reader.once("close", function() {
    c.emit("close");
  }), c.readEntryCursor = t, c.fileSize = n, c.entryCount = r, c.comment = i, c.entriesRead = 0, c.autoClose = !!o, c.lazyEntries = !!s, c.decodeStrings = !!a, c.validateEntrySizes = !!l, c.strictFileNames = !!h, c.isOpen = !0, c.emittedError = !1, c.lazyEntries || c._readEntry();
}
Xt.prototype.close = function() {
  this.isOpen && (this.isOpen = !1, this.reader.unref());
};
function nt(e, t) {
  e.autoClose && e.close(), Wd(e, t);
}
function Wd(e, t) {
  e.emittedError || (e.emittedError = !0, e.emit("error", t));
}
Xt.prototype.readEntry = function() {
  if (!this.lazyEntries) throw new Error("readEntry() called without lazyEntries:true");
  this._readEntry();
};
Xt.prototype._readEntry = function() {
  var e = this;
  if (e.entryCount === e.entriesRead) {
    setImmediate(function() {
      e.autoClose && e.close(), !e.emittedError && e.emit("end");
    });
    return;
  }
  if (!e.emittedError) {
    var t = yt(46);
    Gn(e.reader, t, 0, t.length, e.readEntryCursor, function(n) {
      if (n) return nt(e, n);
      if (!e.emittedError) {
        var r = new Xr(), i = t.readUInt32LE(0);
        if (i !== 33639248) return nt(e, new Error("invalid central directory file header signature: 0x" + i.toString(16)));
        if (r.versionMadeBy = t.readUInt16LE(4), r.versionNeededToExtract = t.readUInt16LE(6), r.generalPurposeBitFlag = t.readUInt16LE(8), r.compressionMethod = t.readUInt16LE(10), r.lastModFileTime = t.readUInt16LE(12), r.lastModFileDate = t.readUInt16LE(14), r.crc32 = t.readUInt32LE(16), r.compressedSize = t.readUInt32LE(20), r.uncompressedSize = t.readUInt32LE(24), r.fileNameLength = t.readUInt16LE(28), r.extraFieldLength = t.readUInt16LE(30), r.fileCommentLength = t.readUInt16LE(32), r.internalFileAttributes = t.readUInt16LE(36), r.externalFileAttributes = t.readUInt32LE(38), r.relativeOffsetOfLocalHeader = t.readUInt32LE(42), r.generalPurposeBitFlag & 64) return nt(e, new Error("strong encryption is not supported"));
        e.readEntryCursor += 46, t = yt(r.fileNameLength + r.extraFieldLength + r.fileCommentLength), Gn(e.reader, t, 0, t.length, e.readEntryCursor, function(o) {
          if (o) return nt(e, o);
          if (!e.emittedError) {
            var s = (r.generalPurposeBitFlag & 2048) !== 0;
            r.fileName = e.decodeStrings ? Ii(t, 0, r.fileNameLength, s) : t.slice(0, r.fileNameLength);
            var a = r.fileNameLength + r.extraFieldLength, l = t.slice(r.fileNameLength, a);
            r.extraFields = [];
            for (var h = 0; h < l.length - 3; ) {
              var c = l.readUInt16LE(h + 0), f = l.readUInt16LE(h + 2), p = h + 4, g = p + f;
              if (g > l.length) return nt(e, new Error("extra field length exceeds extra field buffer size"));
              var w = yt(f);
              l.copy(w, 0, p, g), r.extraFields.push({
                id: c,
                data: w
              }), h = g;
            }
            if (r.fileComment = e.decodeStrings ? Ii(t, a, a + r.fileCommentLength, s) : t.slice(a, a + r.fileCommentLength), r.comment = r.fileComment, e.readEntryCursor += t.length, e.entriesRead += 1, r.uncompressedSize === 4294967295 || r.compressedSize === 4294967295 || r.relativeOffsetOfLocalHeader === 4294967295) {
              for (var y = null, h = 0; h < r.extraFields.length; h++) {
                var E = r.extraFields[h];
                if (E.id === 1) {
                  y = E.data;
                  break;
                }
              }
              if (y == null)
                return nt(e, new Error("expected zip64 extended information extra field"));
              var x = 0;
              if (r.uncompressedSize === 4294967295) {
                if (x + 8 > y.length)
                  return nt(e, new Error("zip64 extended information extra field does not include uncompressed size"));
                r.uncompressedSize = zn(y, x), x += 8;
              }
              if (r.compressedSize === 4294967295) {
                if (x + 8 > y.length)
                  return nt(e, new Error("zip64 extended information extra field does not include compressed size"));
                r.compressedSize = zn(y, x), x += 8;
              }
              if (r.relativeOffsetOfLocalHeader === 4294967295) {
                if (x + 8 > y.length)
                  return nt(e, new Error("zip64 extended information extra field does not include relative header offset"));
                r.relativeOffsetOfLocalHeader = zn(y, x), x += 8;
              }
            }
            if (e.decodeStrings)
              for (var h = 0; h < r.extraFields.length; h++) {
                var E = r.extraFields[h];
                if (E.id === 28789) {
                  if (E.data.length < 6 || E.data.readUInt8(0) !== 1)
                    continue;
                  var T = E.data.readUInt32LE(1);
                  if (vx.unsigned(t.slice(0, r.fileNameLength)) !== T)
                    continue;
                  r.fileName = Ii(E.data, 5, E.data.length, !0);
                  break;
                }
              }
            if (e.validateEntrySizes && r.compressionMethod === 0) {
              var N = r.uncompressedSize;
              if (r.isEncrypted() && (N += 12), r.compressedSize !== N) {
                var k = "compressed/uncompressed size mismatch for stored file: " + r.compressedSize + " != " + r.uncompressedSize;
                return nt(e, new Error(k));
              }
            }
            if (e.decodeStrings) {
              e.strictFileNames || (r.fileName = r.fileName.replace(/\\/g, "/"));
              var W = Yd(r.fileName, e.validateFileNameOptions);
              if (W != null) return nt(e, new Error(W));
            }
            e.emit("entry", r), e.lazyEntries || e._readEntry();
          }
        });
      }
    });
  }
};
Xt.prototype.openReadStream = function(e, t, n) {
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
  var s = yt(30);
  Gn(r.reader, s, 0, s.length, e.relativeOffsetOfLocalHeader, function(a) {
    try {
      if (a) return n(a);
      var l = s.readUInt32LE(0);
      if (l !== 67324752)
        return n(new Error("invalid local file header signature: 0x" + l.toString(16)));
      var h = s.readUInt16LE(26), c = s.readUInt16LE(28), f = e.relativeOffsetOfLocalHeader + s.length + h + c, p;
      if (e.compressionMethod === 0)
        p = !1;
      else if (e.compressionMethod === 8)
        p = t.decompress != null ? t.decompress : !0;
      else
        return n(new Error("unsupported compression method: " + e.compressionMethod));
      var g = f, w = g + e.compressedSize;
      if (e.compressedSize !== 0 && w > r.fileSize)
        return n(new Error("file data overflows file bounds: " + g + " + " + e.compressedSize + " > " + r.fileSize));
      var y = r.reader.createReadStream({
        start: g + i,
        end: g + o
      }), E = y;
      if (p) {
        var x = !1, T = wx.createInflateRaw();
        y.on("error", function(N) {
          setImmediate(function() {
            x || T.emit("error", N);
          });
        }), y.pipe(T), r.validateEntrySizes ? (E = new Jr(e.uncompressedSize), T.on("error", function(N) {
          setImmediate(function() {
            x || E.emit("error", N);
          });
        }), T.pipe(E)) : E = T, E.destroy = function() {
          x = !0, T !== E && T.unpipe(E), y.unpipe(T), y.destroy();
        };
      }
      n(null, E);
    } finally {
      r.reader.unref();
    }
  });
};
function Xr() {
}
Xr.prototype.getLastModDate = function() {
  return Vd(this.lastModFileDate, this.lastModFileTime);
};
Xr.prototype.isEncrypted = function() {
  return (this.generalPurposeBitFlag & 1) !== 0;
};
Xr.prototype.isCompressed = function() {
  return this.compressionMethod === 8;
};
function Vd(e, t) {
  var n = e & 31, r = (e >> 5 & 15) - 1, i = (e >> 9 & 127) + 1980, o = 0, s = (t & 31) * 2, a = t >> 5 & 63, l = t >> 11 & 31;
  return new Date(i, r, n, l, a, s, o);
}
function Yd(e) {
  return e.indexOf("\\") !== -1 ? "invalid characters in fileName: " + e : /^[a-zA-Z]:/.test(e) || /^\//.test(e) ? "absolute path: " + e : e.split("/").indexOf("..") !== -1 ? "invalid relative path: " + e : null;
}
function Gn(e, t, n, r, i, o) {
  if (r === 0)
    return setImmediate(function() {
      o(null, yt(0));
    });
  e.read(t, n, r, i, function(s, a) {
    if (s) return o(s);
    if (a < r)
      return o(new Error("unexpected EOF"));
    o();
  });
}
xo.inherits(Jr, Gd);
function Jr(e) {
  Gd.call(this), this.actualByteCount = 0, this.expectedByteCount = e;
}
Jr.prototype._transform = function(e, t, n) {
  if (this.actualByteCount += e.length, this.actualByteCount > this.expectedByteCount) {
    var r = "too many bytes in the stream. expected " + this.expectedByteCount + ". got at least " + this.actualByteCount;
    return n(new Error(r));
  }
  n(null, e);
};
Jr.prototype._flush = function(e) {
  if (this.actualByteCount < this.expectedByteCount) {
    var t = "not enough bytes in the stream. expected " + this.expectedByteCount + ". got only " + this.actualByteCount;
    return e(new Error(t));
  }
  e();
};
xo.inherits(Zt, So);
function Zt() {
  So.call(this), this.refCount = 0;
}
Zt.prototype.ref = function() {
  this.refCount += 1;
};
Zt.prototype.unref = function() {
  var e = this;
  if (e.refCount -= 1, e.refCount > 0) return;
  if (e.refCount < 0) throw new Error("invalid unref");
  e.close(t);
  function t(n) {
    if (n) return e.emit("error", n);
    e.emit("close");
  }
};
Zt.prototype.createReadStream = function(e) {
  var t = e.start, n = e.end;
  if (t === n) {
    var r = new Ra();
    return setImmediate(function() {
      r.end();
    }), r;
  }
  var i = this._readStreamForRange(t, n), o = !1, s = new Ao(this);
  i.on("error", function(l) {
    setImmediate(function() {
      o || s.emit("error", l);
    });
  }), s.destroy = function() {
    i.unpipe(s), s.unref(), i.destroy();
  };
  var a = new Jr(n - t);
  return s.on("error", function(l) {
    setImmediate(function() {
      o || a.emit("error", l);
    });
  }), a.destroy = function() {
    o = !0, s.unpipe(a), s.destroy();
  }, i.pipe(s).pipe(a);
};
Zt.prototype._readStreamForRange = function(e, t) {
  throw new Error("not implemented");
};
Zt.prototype.read = function(e, t, n, r, i) {
  var o = this.createReadStream({ start: r, end: r + n }), s = new _x(), a = 0;
  s._write = function(l, h, c) {
    l.copy(e, t + a, 0, l.length), a += l.length, c();
  }, s.on("finish", i), o.on("error", function(l) {
    i(l);
  }), o.pipe(s);
};
Zt.prototype.close = function(e) {
  setImmediate(e);
};
xo.inherits(Ao, Ra);
function Ao(e) {
  Ra.call(this), this.context = e, this.context.ref(), this.unreffedYet = !1;
}
Ao.prototype._flush = function(e) {
  this.unref(), e();
};
Ao.prototype.unref = function(e) {
  this.unreffedYet || (this.unreffedYet = !0, this.context.unref());
};
var Sx = "\0☺☻♥♦♣♠•◘○◙♂♀♪♫☼►◄↕‼¶§▬↨↑↓→←∟↔▲▼ !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~⌂ÇüéâäàåçêëèïîìÄÅÉæÆôöòûùÿÖÜ¢£¥₧ƒáíóúñÑªº¿⌐¬½¼¡«»░▒▓│┤╡╢╖╕╣║╗╝╜╛┐└┴┬├─┼╞╟╚╔╩╦╠═╬╧╨╤╥╙╘╒╓╫╪┘┌█▄▌▐▀αßΓπΣσµτΦΘΩδ∞φε∩≡±≥≤⌠⌡÷≈°∙·√ⁿ²■ ";
function Ii(e, t, n, r) {
  if (r)
    return e.toString("utf8", t, n);
  for (var i = "", o = t; o < n; o++)
    i += Sx[e[o]];
  return i;
}
function zn(e, t) {
  var n = e.readUInt32LE(t), r = e.readUInt32LE(t + 4);
  return r * 4294967296 + n;
}
var yt;
typeof Buffer.allocUnsafe == "function" ? yt = function(e) {
  return Buffer.allocUnsafe(e);
} : yt = function(e) {
  return new Buffer(e);
};
function Hi(e) {
  if (e) throw e;
}
const rt = tf("extract-zip"), { createWriteStream: Ax, promises: Bn } = st, Tx = fx, cn = le, { promisify: Pa } = Jn, Cx = at, $x = wt, Ix = Pa($x.open), Ox = Pa(Cx.pipeline);
class Rx {
  constructor(t, n) {
    this.zipPath = t, this.opts = n;
  }
  async extract() {
    return rt("opening", this.zipPath, "with opts", this.opts), this.zipfile = await Ix(this.zipPath, { lazyEntries: !0 }), this.canceled = !1, new Promise((t, n) => {
      this.zipfile.on("error", (r) => {
        this.canceled = !0, n(r);
      }), this.zipfile.readEntry(), this.zipfile.on("close", () => {
        this.canceled || (rt("zip extraction complete"), t());
      }), this.zipfile.on("entry", async (r) => {
        if (this.canceled) {
          rt("skipping entry", r.fileName, { cancelled: this.canceled });
          return;
        }
        if (rt("zipfile entry", r.fileName), r.fileName.startsWith("__MACOSX/")) {
          this.zipfile.readEntry();
          return;
        }
        const i = cn.dirname(cn.join(this.opts.dir, r.fileName));
        try {
          await Bn.mkdir(i, { recursive: !0 });
          const o = await Bn.realpath(i);
          if (cn.relative(this.opts.dir, o).split(cn.sep).includes(".."))
            throw new Error(`Out of bound path "${o}" found while processing file ${r.fileName}`);
          await this.extractEntry(r), rt("finished processing", r.fileName), this.zipfile.readEntry();
        } catch (o) {
          this.canceled = !0, this.zipfile.close(), n(o);
        }
      });
    });
  }
  async extractEntry(t) {
    if (this.canceled) {
      rt("skipping entry extraction", t.fileName, { cancelled: this.canceled });
      return;
    }
    this.opts.onEntry && this.opts.onEntry(t, this.zipfile);
    const n = cn.join(this.opts.dir, t.fileName), r = t.externalFileAttributes >> 16 & 65535, i = 61440, o = 16384, a = (r & i) === 40960;
    let l = (r & i) === o;
    !l && t.fileName.endsWith("/") && (l = !0);
    const h = t.versionMadeBy >> 8;
    l || (l = h === 0 && t.externalFileAttributes === 16), rt("extracting entry", { filename: t.fileName, isDir: l, isSymlink: a });
    const c = this.getExtractedMode(r, l) & 511, f = l ? n : cn.dirname(n), p = { recursive: !0 };
    if (l && (p.mode = c), rt("mkdir", { dir: f, ...p }), await Bn.mkdir(f, p), l) return;
    rt("opening read stream", n);
    const g = await Pa(this.zipfile.openReadStream.bind(this.zipfile))(t);
    if (a) {
      const w = await Tx(g);
      rt("creating symlink", w, n), await Bn.symlink(w, n);
    } else
      await Ox(g, Ax(n, { mode: c }));
  }
  getExtractedMode(t, n) {
    let r = t;
    return r === 0 && (n ? (this.opts.defaultDirMode && (r = parseInt(this.opts.defaultDirMode, 10)), r || (r = 493)) : (this.opts.defaultFileMode && (r = parseInt(this.opts.defaultFileMode, 10)), r || (r = 420))), r;
  }
}
var Dx = async function(e, t) {
  if (rt("creating target directory", t.dir), !cn.isAbsolute(t.dir))
    throw new Error("Target directory is expected to be absolute");
  return await Bn.mkdir(t.dir, { recursive: !0 }), t.dir = await Bn.realpath(t.dir), new Rx(e, t).extract();
};
const Xd = /* @__PURE__ */ ap(Dx);
function Jd(e) {
  const n = e.replace(/[^0-9.].*$/, "").split(".").map((s) => parseInt(s, 10)), r = n[0], i = n[1] ?? 0, o = n[2] ?? 0;
  return r > 1 || i > 20 || i === 20 && o >= 5 ? 21 : i >= 17 ? 17 : 8;
}
const iu = {
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
function Px(e) {
  const t = iu[e] || iu[17];
  return process.platform === "win32" ? t.win : process.platform === "darwin" ? process.arch === "arm64" ? t.mac_aarch64 : t.mac_x64 : t.linux_x64;
}
const Er = /* @__PURE__ */ new Map();
let pn = 0, mn = 0;
function To() {
  const e = Tt.getPath("userData"), t = U.join(e, ".mine-launcher");
  return O.existsSync(t) || O.mkdirSync(t, { recursive: !0 }), t;
}
function Kd(e) {
  const t = op.createHash("md5");
  t.update(`OfflinePlayer:${e}`);
  const n = t.digest();
  n[6] = n[6] & 15 | 48, n[8] = n[8] & 63 | 128;
  const r = n.toString("hex");
  return `${r.slice(0, 8)}-${r.slice(8, 12)}-${r.slice(12, 16)}-${r.slice(16, 20)}-${r.slice(20, 32)}`;
}
function fn(e) {
  return new Promise((t, n) => {
    (e.startsWith("https") ? Hs : qs).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (o) => {
      if (o.statusCode && o.statusCode >= 300 && o.statusCode < 400 && o.headers.location)
        return o.resume(), fn(o.headers.location).then(t).catch(n);
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
function pt(e, t, n) {
  return new Promise((r, i) => {
    const o = U.dirname(t);
    O.existsSync(o) || O.mkdirSync(o, { recursive: !0 });
    const s = O.createWriteStream(t);
    (e.startsWith("https") ? Hs : qs).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (h) => {
      if (h.statusCode && h.statusCode >= 300 && h.statusCode < 400 && h.headers.location)
        return s.close(), O.unlinkSync(t), pt(h.headers.location, t, n).then(r).catch(i);
      if (h.statusCode !== 200)
        return s.close(), O.unlink(t, () => {
        }), h.resume(), i(new Error(`HTTP ${h.statusCode}: ${e}`));
      h.on("data", (c) => n == null ? void 0 : n(c.length)), h.pipe(s), s.on("finish", () => s.close(() => r())), s.on("error", i);
    }).on("error", (h) => {
      s.close(), O.unlink(t, () => {
      }), i(h);
    });
  });
}
function ur(e) {
  return !e.includes("..") && !U.isAbsolute(e);
}
async function ys(e, t) {
  if (O.existsSync(e))
    try {
      const n = U.join(t, ".extract-" + Date.now());
      O.mkdirSync(n, { recursive: !0 }), await Xd(e, { dir: n });
      const r = process.platform === "win32" ? ".dll" : process.platform === "darwin" ? ".dylib" : ".so", i = (o) => {
        for (const s of O.readdirSync(o)) {
          const a = U.join(o, s);
          O.statSync(a).isDirectory() ? i(a) : s.toLowerCase().endsWith(r) && O.copyFileSync(a, U.join(t, s));
        }
      };
      i(n), O.rmSync(n, { recursive: !0, force: !0 });
    } catch {
    }
}
let qt = [];
function ou(e) {
  qt.push(e), qt.length > 120 && (qt = qt.slice(-120));
}
function Nx(e) {
  const t = e.join(`
`);
  return t.match(/Unsupported class file major version (\d+)/) ? "Похоже, у вас неправильно подобрана версия Java — версия игры требует более новую Java. Откройте «Настройки» и в разделе Java проверьте, что путь ведёт к правильной JDK/JRE." : /java\.lang\.OutOfMemoryError/.test(t) ? "Игре не хватило памяти. Увеличьте «Максимальную память» в настройках лаунчера (в МБ) и попробуйте снова." : /-1073741515|0xc0000135/i.test(t) ? "Не найдены системные библиотеки Windows. Установите Microsoft Visual C++ Redistributable (x64) — это самая частая причина на чистой Windows." : /-1073741819|0xc0000005/i.test(t) ? "Крит native-кода. Чаще всего помогает обновление видеодрайвера. Если не помогло — запустите без модов и посмотрите лог." : /UnsatisfiedLinkError/i.test(t) ? "Не загрузились системные библиотеки игры (LWJGL natives). Проверьте, не блокирует ли их антивирус, и запустите снова — недостающие файлы скачаются заново." : /No space left|disk full|ENOSPC/i.test(t) ? "Закончилось место на диске. Освободите его и попробуйте снова." : /Failed to (download|fetch)|Could not (download|fetch)|assets/i.test(t) && /asset|resources/i.test(t) ? "Не удалось скачать игровые ресурсы (assets) — часто это сетевая блокировка CDN Mojang у провайдера. Попробуйте другое подключение или VPN и запустите снова." : /Could not create the Java Virtual Machine|Invalid or corrupt jarfile| unrecognized/.test(t) ? "Проверьте аргументы JVM в настройках лаунчера — Java не смогла запуститься с текущими параметрами." : /GLFW error|OpenGL|gpu|DirectX/i.test(t) && /error|fail/i.test(t) ? "Похоже, проблема с видеодрайвером/OpenGL. Обновите драйвер видеокарты." : /Incompatible.fml.mod|Fabric loader|Quilt loading/i.test(t) ? "Похоже, один из модов несовместим с этой версией или загрузчиком. Откройте вкладку «Моды» и отключите их по одному." : /Mixin apply failed|MixinTransformer/i.test(t) ? "Ошибка в моде (Mixin). Отключите свежеустановленные моды во вкладке «Моды»." : /The game crashed.*Calling event|Exception in thread "main"/.test(t) ? "Игра упала при старте. Попробуйте без модов или откройте папку сборки и покажите лог на форуме." : "Смотрите вкладку «Логи» для подробностей.";
}
function Fx(e, t = process.platform === "win32" ? "windows" : process.platform === "darwin" ? "osx" : "linux") {
  if (!e || e.length === 0) return !0;
  let n = !1;
  for (const r of e)
    (!r.os || r.os.name === t) && (n = r.action === "allow");
  return n;
}
async function Qd() {
  const e = [], t = process.platform === "win32", n = t ? "javaw.exe" : "java", r = To(), i = (o, s = 0) => {
    if (!O.existsSync(o) || s > 6) return null;
    try {
      const a = O.readdirSync(o);
      for (const l of a) {
        const h = U.join(o, l);
        if (l.toLowerCase() === n.toLowerCase()) return h;
        try {
          if (O.statSync(h).isDirectory()) {
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
    const s = i(U.join(r, "java", `java-${o}`));
    s && e.push(s);
  }
  if (process.env.JAVA_HOME) {
    const o = U.join(process.env.JAVA_HOME, "bin", n);
    O.existsSync(o) && e.push(o);
  }
  if (t) {
    const o = [
      "C:\\Program Files\\Java",
      "C:\\Program Files (x86)\\Java",
      "C:\\Program Files\\Eclipse Adoptium",
      "C:\\Program Files\\Microsoft",
      "C:\\Program Files\\BellSoft",
      "C:\\Program Files\\Amazon Corretto",
      U.join(process.env.LOCALAPPDATA || "", "Programs", "AdoptOpenJDK"),
      "C:\\Program Files (x86)\\Minecraft Launcher\\runtime"
    ];
    for (const s of o)
      if (O.existsSync(s))
        try {
          for (const a of O.readdirSync(s)) {
            const l = U.join(s, a, "bin", n);
            O.existsSync(l) && !e.includes(l) && e.push(l);
          }
        } catch {
        }
  } else {
    const o = ["/usr/lib/jvm", "/usr/lib64/jvm", "/Library/Java/JavaVirtualMachines", "/opt/java"];
    for (const s of o)
      if (O.existsSync(s))
        try {
          for (const a of O.readdirSync(s))
            for (const l of [`${a}/bin/java`, `${a}/Contents/Home/bin/java`]) {
              const h = U.join(s, l);
              O.existsSync(h) && !e.includes(h) && e.push(h);
            }
        } catch {
        }
  }
  return e;
}
async function Lx(e, t, n = 17) {
  const r = To(), i = U.join(r, "java", `java-${n}`), o = (p, g = 0) => {
    if (!O.existsSync(p) || g > 6) return null;
    try {
      for (const w of O.readdirSync(p)) {
        const y = U.join(p, w);
        if (w.toLowerCase() === (process.platform === "win32" ? "javaw.exe" : "java").toLowerCase()) return y;
        try {
          if (O.statSync(y).isDirectory()) {
            const E = o(y, g + 1);
            if (E) return E;
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
  const a = process.platform === "win32", l = Px(n), h = a ? "zip" : ".tar.gz", c = U.join(r, "java", `java-${n}.${h}`);
  O.existsSync(U.dirname(c)) || O.mkdirSync(U.dirname(c), { recursive: !0 }), await pt(l, c, (p) => {
    mn += p;
    const g = Date.now();
    if (g - pn > 1e3) {
      const w = mn / Math.max(1, (g - pn) / 1e3);
      pn = g, mn = 0, e({
        instanceId: "java-auto",
        stage: "downloading",
        statusText: `Скачивание Java ${n}... (${(w / 1024 / 1024).toFixed(1)} МБ/с)`,
        progress: 55
      });
    }
  }), e({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: `Распаковка Java ${n}...`,
    progress: 75
  }), t({ timestamp: Date.now(), type: "info", message: `Распаковка архива Java ${n}...` }), O.existsSync(i) || O.mkdirSync(i, { recursive: !0 }), a ? await Xd(c, { dir: i }) : ws(`tar -xzf "${c}" -C "${i}"`), O.unlinkSync(c);
  const f = o(i);
  if (!f) throw new Error(`Java ${n} распакована некорректно — попробуйте установить её вручную`);
  return t({ timestamp: Date.now(), type: "info", message: `Java ${n} установлена: ${f}` }), f;
}
async function Zd() {
  return await fn("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function Ux(e, t, n) {
  var h, c, f, p, g, w, y, E, x;
  pn = 0, mn = 0, qt = [];
  const r = To(), i = U.join(r, "instances", e.instanceId), o = U.join(r, "assets"), s = U.join(r, "libraries"), a = U.join(r, "versions"), l = U.join(i, "natives");
  for (const T of [i, l])
    O.existsSync(T) || O.mkdirSync(T, { recursive: !0 });
  try {
    let T = e.javaPath, N = !1;
    if (T && O.existsSync(T))
      try {
        ws(`"${T}" -version 2>&1`, { stdio: "ignore" }), N = !0;
      } catch {
      }
    if (!N) {
      const A = await Qd();
      for (const L of A)
        try {
          ws(`"${L}" -version 2>&1`, { stdio: "ignore" }), T = L, N = !0;
          break;
        } catch {
        }
    }
    N || (T = await Lx(t, n, Jd(e.version))), n({ timestamp: Date.now(), type: "info", message: `Java: ${T}` }), t({ instanceId: e.instanceId, stage: "checking", statusText: "Проверка версии...", progress: 5 });
    const k = (await Zd()).versions.find((A) => A.id === e.version);
    if (!k) throw new Error(`Версия ${e.version} не найдена на серверах Mojang`);
    const W = U.join(a, e.version, `${e.version}.json`);
    let Y;
    if (O.existsSync(W))
      try {
        Y = JSON.parse(O.readFileSync(W, "utf-8"));
      } catch {
        Y = null;
      }
    if (Y || (t({ instanceId: e.instanceId, stage: "downloading", statusText: `Загрузка версии ${e.version}...`, progress: 10 }), Y = await fn(k.url), O.existsSync(U.dirname(W)) || O.mkdirSync(U.dirname(W), { recursive: !0 }), O.writeFileSync(W, JSON.stringify(Y, null, 2))), (h = Y.assetIndex) != null && h.url) {
      const A = U.join(o, "indexes", `${Y.assetIndex.id}.json`);
      O.existsSync(A) || (t({ instanceId: e.instanceId, stage: "downloading", statusText: "Загрузка манифеста ресурсов...", progress: 12 }), await pt(Y.assetIndex.url, A));
      try {
        const j = JSON.parse(O.readFileSync(A, "utf-8")).objects || {}, R = U.join(o, "objects"), z = [];
        for (const J of Object.keys(j)) {
          const M = j[J].hash, ee = U.join(R, M.slice(0, 2), M);
          O.existsSync(ee) || z.push({ hash: M });
        }
        if (z.length > 0) {
          t({
            instanceId: e.instanceId,
            stage: "downloading",
            statusText: `Загрузка ресурсов (0/${z.length})...`,
            progress: 15
          });
          let J = 0;
          const M = 64;
          let ee = Date.now(), pe = 0;
          for (let ie = 0; ie < z.length; ie += M) {
            const Qe = z.slice(ie, ie + M);
            await Promise.all(
              Qe.map((ze) => pt(
                `https://resources.download.minecraft.net/${ze.hash.slice(0, 2)}/${ze.hash}`,
                U.join(R, ze.hash.slice(0, 2), ze.hash),
                (en) => {
                  pe += en;
                }
              ).catch(() => {
              }))
            ), J += Qe.length;
            const vt = Date.now();
            if (vt - ee > 1500) {
              const ze = pe / Math.max(1, (vt - ee) / 1e3);
              t({
                instanceId: e.instanceId,
                stage: "downloading",
                statusText: `Загрузка ресурсов (${J}/${z.length}) — ${(ze / 1024 / 1024).toFixed(1)} МБ/с`,
                progress: 15 + J / z.length * 25
              }), ee = vt, pe = 0;
            }
          }
        }
      } catch (L) {
        n({ timestamp: Date.now(), type: "warn", message: `Ресурсы: ${L.message}` });
      }
    }
    const Q = U.join(a, e.version, `${e.version}.jar`);
    if (!O.existsSync(Q) && ((f = (c = Y.downloads) == null ? void 0 : c.client) != null && f.url)) {
      const A = (L) => {
        mn += L;
        const j = Date.now();
        if (j - pn > 500) {
          const R = mn / Math.max(1, (j - pn) / 1e3);
          pn = j, mn = 0, t({
            instanceId: e.instanceId,
            stage: "downloading",
            statusText: `Загрузка Minecraft ${e.version}.jar — ${(R / 1024 / 1024).toFixed(1)} МБ/с`,
            progress: 45
          });
        }
      };
      t({ instanceId: e.instanceId, stage: "downloading", statusText: `Загрузка Minecraft ${e.version}.jar...`, progress: 42 }), await pt(Y.downloads.client.url, Q, A);
    }
    t({ instanceId: e.instanceId, stage: "downloading", statusText: "Загрузка библиотек...", progress: 50 });
    const ne = [], q = Y.libraries || [];
    let v = 0, V = 0, Z = 0;
    for (const A of q) {
      if (!Fx(A.rules)) continue;
      if ((p = A.downloads) != null && p.artifact) {
        const j = A.downloads.artifact.path;
        if (!ur(j)) {
          n({ timestamp: Date.now(), type: "warn", message: `Библиотека пропущена (путь вне каталога): ${j}` });
          continue;
        }
        const R = U.join(s, j);
        if (!O.existsSync(R))
          try {
            await pt(A.downloads.artifact.url, R, (z) => {
              V += z;
            });
          } catch {
          }
        O.existsSync(R) && (ne.push(R), (j.includes("natives") || A.name.includes("natives")) && await ys(R, l));
      }
      if ((g = A.downloads) != null && g.classifiers) {
        const j = A.downloads.classifiers, R = process.platform === "win32" ? j["natives-windows"] || j["natives-windows-64"] || j["natives-windows-x86"] : process.platform === "darwin" ? j["natives-osx"] || j["natives-macos"] : j["natives-linux"];
        if (R) {
          const z = R.path;
          if (!ur(z)) continue;
          const J = U.join(s, z);
          if (!O.existsSync(J))
            try {
              await pt(R.url, J, (M) => {
                V += M;
              });
            } catch {
            }
          O.existsSync(J) && await ys(J, l);
        }
      }
      if (!((w = A.downloads) != null && w.artifact) && A.name) {
        const j = A.name.split(":"), R = j[0].replace(/\./g, "/"), z = j[1], J = j[2], M = `${R}/${z}/${J}/${z}-${J}.jar`;
        if (!ur(M)) continue;
        const ee = U.join(s, M), pe = A.url ? `${A.url}${M}` : `https://libraries.minecraft.net/${M}`;
        if (!O.existsSync(ee))
          try {
            await pt(pe, ee, (ie) => {
              V += ie;
            });
          } catch {
          }
        O.existsSync(ee) && (ne.push(ee), A.name.includes("natives") && await ys(ee, l));
      }
      Z++;
      const L = Date.now();
      if (L - v > 800 && V > 0) {
        const j = V / Math.max(1, (L - v) / 1e3);
        t({
          instanceId: e.instanceId,
          stage: "downloading",
          statusText: `Библиотеки ${Z}/${q.length} — ${(j / 1024 / 1024).toFixed(1)} МБ/с`,
          progress: 50 + Z / q.length * 15
        }), v = L, V = 0;
      }
    }
    ne.push(Q);
    let oe = Y.mainClass || "net.minecraft.client.main.Main", D = [];
    if (e.loader === "fabric") {
      t({ instanceId: e.instanceId, stage: "downloading", statusText: "Установка Fabric...", progress: 72 });
      try {
        const A = await fn(`https://meta.fabricmc.net/v2/versions/loader/${e.version}`);
        if (A != null && A.length) {
          const L = A[0].loader.version, j = await fn(
            `https://meta.fabricmc.net/v2/versions/loader/${e.version}/${L}/profile/json`
          );
          if (j.mainClass && (oe = j.mainClass), j.libraries)
            for (const R of j.libraries) {
              const z = R.name.split(":"), J = z[0].replace(/\./g, "/"), M = z[1], ee = z[2], pe = `${J}/${M}/${ee}/${M}-${ee}.jar`;
              if (!ur(pe)) continue;
              const ie = U.join(s, pe), Qe = R.url ? `${R.url}${pe}` : `https://maven.fabricmc.net/${pe}`;
              if (!O.existsSync(ie))
                try {
                  await pt(Qe, ie);
                } catch {
                }
              O.existsSync(ie) && ne.unshift(ie);
            }
        }
      } catch (A) {
        throw new Error(`Ошибка загрузки Fabric: ${A.message}`);
      }
    }
    if (e.loader === "quilt") {
      t({ instanceId: e.instanceId, stage: "downloading", statusText: "Установка Quilt...", progress: 72 });
      try {
        const A = await fn(`https://meta.quiltmc.org/v3/versions/loader/${e.version}`);
        if (A != null && A.length) {
          const L = A[0].loader.version, j = await fn(
            `https://meta.quiltmc.org/v3/versions/loader/${e.version}/${L}/profile/json`
          );
          if (j.mainClass && (oe = j.mainClass), j.libraries)
            for (const R of j.libraries) {
              const z = R.name.split(":"), J = z[0].replace(/\./g, "/"), M = z[1], ee = z[2], pe = `${J}/${M}/${ee}/${M}-${ee}.jar`;
              if (!ur(pe)) continue;
              const ie = U.join(s, pe), Qe = R.url ? `${R.url}${pe}` : `https://maven.quiltmc.org/repository/release/${pe}`;
              if (!O.existsSync(ie))
                try {
                  await pt(Qe, ie);
                } catch {
                }
              O.existsSync(ie) && ne.unshift(ie);
            }
        }
      } catch (A) {
        throw new Error(`Ошибка загрузки Quilt: ${A.message}`);
      }
    }
    t({ instanceId: e.instanceId, stage: "launching", statusText: "Запуск игры...", progress: 92 });
    const I = ne.join(U.delimiter), P = [];
    P.push(`-Xms${e.memoryMin || 1024}M`), P.push(`-Xmx${e.memoryMax || 4096}M`), (y = e.customJvmArgs) != null && y.includes("-Djava.library.path") || P.push(`-Djava.library.path=${l}`), P.push(
      "-XX:+UseG1GC",
      "-XX:+UnlockExperimentalVMOptions",
      "-XX:G1NewSizePercent=20",
      "-XX:G1ReservePercent=20",
      "-XX:MaxGCPauseMillis=50",
      "-XX:G1HeapRegionSize=32M"
    ), e.customJvmArgs && P.push(...e.customJvmArgs.split(" ").filter(Boolean)), D.push("-cp", I, oe), P.push(...D);
    const C = (e.uuid || Kd(e.username || "Player")).replace(/-/g, "");
    if (Y.minecraftArguments && typeof Y.minecraftArguments == "string")
      for (const A of Y.minecraftArguments.split(" "))
        P.push(
          A.replace("${auth_player_name}", e.username || "Player").replace("${version_name}", `${e.version}-${e.loader}`).replace("${game_directory}", i).replace("${assets_root}", o).replace("${assets_index_name}", ((E = Y.assetIndex) == null ? void 0 : E.id) || e.version).replace("${auth_uuid}", C).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", e.loader === "vanilla" ? "release" : "release/mod")
        );
    else
      P.push(
        "--username",
        e.username || "Player",
        "--version",
        `${e.version}-${e.loader}`,
        "--gameDir",
        i,
        "--assetsDir",
        o,
        "--assetIndex",
        ((x = Y.assetIndex) == null ? void 0 : x.id) || e.version,
        "--uuid",
        C,
        "--accessToken",
        "0",
        "--userType",
        "mojang",
        "--versionType",
        "release"
      );
    e.fullscreen && !P.includes("--fullscreen") && P.push("--fullscreen"), e.customGameArgs && P.push(...e.customGameArgs.split(" ").filter(Boolean)), n({ timestamp: Date.now(), type: "info", message: `Запуск: "${T}" ${P.slice(0, 8).join(" ")} ... [обрезано]` });
    const F = sp(T || "javaw", P, {
      cwd: i,
      detached: !e.hideLauncher
    });
    Er.set(e.instanceId, F), F.stdout.on("data", (A) => {
      for (const L of A.toString().split(`
`))
        L.trim() && (ou(L), n({ timestamp: Date.now(), type: "info", message: L }));
    }), F.stderr.on("data", (A) => {
      for (const L of A.toString().split(`
`))
        L.trim() && (ou(L), n({ timestamp: Date.now(), type: "warn", message: L }));
    }), F.on("error", (A) => {
      Er.delete(e.instanceId), t({
        instanceId: e.instanceId,
        stage: "error",
        statusText: `Ошибка запуска: ${A.message}`,
        progress: 0,
        error: A.message
      }), n({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${A.message}` });
    }), F.on("exit", (A) => {
      if (Er.delete(e.instanceId), A === 0)
        qt = [], t({ instanceId: e.instanceId, stage: "idle", statusText: "", progress: 0 }), n({ timestamp: Date.now(), type: "info", message: "Minecraft завершён." });
      else {
        const L = Nx(qt);
        qt = [], t({
          instanceId: e.instanceId,
          stage: "error",
          statusText: `Игра завершилась с ошибкой (код ${A}). ${L}`,
          progress: 0,
          error: `exit ${A}`
        }), n({ timestamp: Date.now(), type: "error", message: `Minecraft завершился с кодом ${A}. ${L}` });
      }
    }), t({ instanceId: e.instanceId, stage: "running", statusText: "Игра запущена!", progress: 100 });
  } catch (T) {
    t({
      instanceId: e.instanceId,
      stage: "error",
      statusText: `Ошибка: ${T.message}`,
      progress: 0,
      error: T.message
    }), n({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${T.message}` });
  }
}
function su(e) {
  const t = Er.get(e);
  if (t) {
    try {
      process.kill(-t.pid, "SIGTERM");
    } catch {
      t.kill();
    }
    return Er.delete(e), !0;
  }
  return !1;
}
au.setApplicationMenu(null);
Tt.requestSingleInstanceLock() || Tt.quit();
const eh = U.dirname(rp(import.meta.url));
process.env.APP_ROOT = U.join(eh, "..");
const yn = process.env.VITE_DEV_SERVER_URL, th = U.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = yn ? U.join(process.env.APP_ROOT, "public") : th;
let G = null, Ye = null;
const Pe = To(), Oi = U.join(Pe, "accounts.json"), pr = U.join(Pe, "instances.json"), Ms = U.join(Pe, "settings.json"), Lt = U.join(Pe, "skins");
function Na(e, t) {
  try {
    if (O.existsSync(e)) return JSON.parse(O.readFileSync(e, "utf-8"));
  } catch {
  }
  return t;
}
function xt(e, t) {
  try {
    O.writeFileSync(e, JSON.stringify(t, null, 2), "utf-8");
  } catch (n) {
    console.error(`Failed saving ${e}:`, n);
  }
}
let he = Na(Oi, []), xe = Na(pr, []);
const Fa = Math.round(ip.totalmem() / 1024 / 1024), La = Math.max(2048, Math.min(4096, Math.floor(Fa / 3)));
let we = Na(Ms, {
  javaPath: "",
  memoryMin: 1024,
  memoryMax: La,
  customJvmArgs: "",
  closeLauncherOnGameStart: !1,
  fullscreen: !1,
  hideLauncher: !1
});
(!we.memoryMax || we.memoryMax > Fa * 0.85) && (we.memoryMax = La);
function Ua() {
  G = new lu({
    width: 1100,
    height: 740,
    minWidth: 940,
    minHeight: 660,
    frame: !1,
    titleBarStyle: "hidden",
    backgroundColor: "#111217",
    icon: U.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: U.join(eh, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0,
      webSecurity: !0
    }
  }), yn ? G.loadURL(yn) : G.loadFile(U.join(th, "index.html")), G.on("closed", () => {
    G = null;
  }), G.webContents.setWindowOpenHandler(() => ({ action: "deny" })), G.webContents.on("will-navigate", (e) => e.preventDefault());
}
function kx() {
  if (Ye) return Ye;
  const e = U.join(process.env.VITE_PUBLIC, "icon.png");
  let t = rl.createFromPath(e);
  t.isEmpty() && (t = rl.createEmpty()), Ye = new ep(t), Ye.setToolTip("Mine Launcher"), Ye.on("click", () => {
    G == null || G.show();
  });
  const n = au.buildFromTemplate([
    { label: "Показать лаунчер", click: () => G == null ? void 0 : G.show() },
    { type: "separator" },
    { label: "Выход", click: () => Tt.quit() }
  ]);
  return Ye.setContextMenu(n), Ye;
}
function Dn(e) {
  try {
    G == null || G.webContents.send("updater:state", e);
  } catch {
  }
}
function Mx() {
  yn || process.platform !== "linux" && (De.autoUpdater.autoDownload = !0, De.autoUpdater.autoInstallOnAppQuit = !0, De.autoUpdater.allowDowngrade = !1, De.autoUpdater.on("checking-for-update", () => {
    Dn({ status: "checking" });
  }), De.autoUpdater.on("update-available", (e) => {
    Dn({ status: "available", info: e });
    try {
      De.autoUpdater.downloadUpdate();
    } catch {
    }
  }), De.autoUpdater.on("update-not-available", (e) => {
    Dn({ status: "not-available", info: e });
  }), De.autoUpdater.on("download-progress", (e) => {
    Dn({
      status: "downloading",
      percent: e.percent,
      transferred: e.transferred,
      total: e.total,
      bytesPerSecond: e.bytesPerSecond
    });
  }), De.autoUpdater.on("update-downloaded", (e) => {
    Dn({ status: "downloaded", info: e });
  }), De.autoUpdater.on("error", (e) => {
    Dn({ status: "error", message: (e == null ? void 0 : e.message) || "Ошибка обновления" });
  }), setTimeout(() => {
    De.autoUpdater.checkForUpdates().catch(() => {
    });
  }, 4e3), setInterval(() => {
    De.autoUpdater.checkForUpdates().catch(() => {
    });
  }, 4 * 60 * 60 * 1e3));
}
function jx() {
  kx(), Ye == null || Ye.setToolTip("Mine Launcher — игра запущена"), G == null || G.hide();
}
Tt.on("second-instance", () => {
  G ? (G.isMinimized() && G.restore(), G.show(), G.focus()) : Ua();
});
Tt.on("window-all-closed", () => {
  process.platform !== "darwin" && Tt.quit(), G = null;
});
Tt.on("activate", () => {
  lu.getAllWindows().length === 0 && Ua();
});
function js(e, t) {
  return new Promise((n, r) => {
    const i = U.dirname(t);
    O.existsSync(i) || O.mkdirSync(i, { recursive: !0 });
    const o = O.createWriteStream(t);
    (e.startsWith("https") ? Hs : qs).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (l) => {
      if (l.statusCode && l.statusCode >= 300 && l.statusCode < 400 && l.headers.location)
        return o.close(), js(l.headers.location, t).then(n).catch(r);
      if (l.statusCode !== 200)
        return o.close(), O.unlink(t, () => {
        }), l.resume(), r(new Error(`HTTP ${l.statusCode}: ${e}`));
      l.pipe(o), o.on("finish", () => o.close(() => n())), o.on("error", r);
    }).on("error", (l) => {
      o.close(), O.unlink(t, () => {
      }), r(l);
    });
  });
}
function Es(e, t) {
  const n = U.relative(U.resolve(e), U.resolve(t));
  return n !== "" && !n.startsWith("..") && !U.isAbsolute(n);
}
function Ut(e) {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(e)) throw new Error("Некорректный id сборки");
  return e;
}
function bi(e) {
  if (!/^[A-Za-z0-9._ -]{1,255}$/.test(e)) throw new Error("Некорректное имя файла");
  return e;
}
function Bx() {
  K.handle("minimize-window", () => {
    G == null || G.minimize();
  }), K.handle("maximize-window", () => G ? G.isMaximized() ? (G.unmaximize(), !1) : (G.maximize(), !0) : !1), K.handle("close-window", () => {
    G == null || G.close();
  }), K.handle("is-maximized", () => (G == null ? void 0 : G.isMaximized()) || !1), K.handle("get-accounts", () => he), K.handle("add-account", (e, t) => {
    const n = t.trim();
    if (!n) throw new Error("Введите никнейм");
    if (n.length > 16) throw new Error("Никнейм слишком длинный (максимум 16 символов)");
    if (!/^[a-zA-Z0-9_]+$/.test(n)) throw new Error("Допустимы только латинские буквы, цифры и знак _");
    if (he.some((i) => i.username.toLowerCase() === n.toLowerCase()))
      throw new Error(`Аккаунт «${n}» уже добавлен`);
    const r = {
      id: Date.now().toString(),
      username: n,
      uuid: Kd(n),
      type: "offline",
      isActive: he.length === 0,
      createdAt: Date.now()
    };
    return he.push(r), xt(Oi, he), he;
  }), K.handle("set-active-account", (e, t) => (he = he.map((n) => ({ ...n, isActive: n.id === t })), xt(Oi, he), he)), K.handle("delete-account", (e, t) => (he = he.filter((n) => n.id !== t), he.length > 0 && !he.some((n) => n.isActive) && (he[0].isActive = !0), xt(Oi, he), he)), K.handle("get-instances", () => xe), K.handle("create-instance", (e, t) => {
    if (!t.version) throw new Error("Выберите версию Minecraft");
    if (xe.some((r) => r.name === t.name)) throw new Error(`Сборка «${t.name}» уже существует`);
    const n = {
      id: "inst-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: t.name,
      version: t.version,
      loader: t.loader || "vanilla",
      created: Date.now(),
      memoryMin: we.memoryMin,
      memoryMax: we.memoryMax
    };
    xe.push(n), xt(pr, xe);
    for (const r of ["mods", "saves"]) {
      const i = U.join(Pe, "instances", n.id, r);
      O.existsSync(i) || O.mkdirSync(i, { recursive: !0 });
    }
    return xe;
  }), K.handle("rename-instance", (e, { id: t, name: n }) => {
    const r = xe.find((i) => i.id === t);
    if (!r) throw new Error("Сборка не найдена");
    return r.name = n.trim(), xt(pr, xe), xe;
  }), K.handle("delete-instance", (e, t) => {
    Ut(t);
    const n = xe.find((r) => r.id === t);
    return xe = xe.filter((r) => r.id !== t), xt(pr, xe), n && O.existsSync(U.join(Pe, "instances", t)) && G && No.showMessageBox(G, {
      type: "question",
      buttons: ["Удалить", "Отмена"],
      defaultId: 1,
      title: "Удалить сборку?",
      message: `Удалить сборку «${n.name}» вместе с мирами, модами и файлами игры?`
    }).then(({ response: r }) => {
      r === 0 && O.rmSync(U.join(Pe, "instances", t), { recursive: !0, force: !0 });
    }), xe;
  }), K.handle("get-versions", async () => {
    try {
      return await Zd();
    } catch {
      return { latest: { release: "", snapshot: "" }, versions: [] };
    }
  }), K.handle("get-settings", () => we), K.handle("set-selected-instance-id", (e, t) => (we.selectedInstanceId = t, xt(Ms, we), !0)), K.handle("save-settings", (e, t) => (we = { ...we, ...t }, xt(Ms, we), we)), K.handle("detect-java", async () => Qd()), K.handle("get-required-java", (e, t) => Jd(t)), K.handle("open-launcher-folder", () => nl.openPath(Pe)), K.handle("launch-instance", async (e, t) => {
    Ut(t);
    const n = xe.find((i) => i.id === t);
    if (!n) throw new Error("Сборка не найдена");
    const r = he.find((i) => i.isActive) || he[0];
    if (!r) throw new Error("Сначала добавьте аккаунт на панели слева");
    return su(t) && await new Promise((i) => setTimeout(i, 500)), G == null || G.show(), Ux(
      {
        instanceId: n.id,
        instanceName: n.name,
        version: n.version,
        loader: n.loader || "vanilla",
        username: r.username,
        uuid: r.uuid,
        memoryMin: we.memoryMin || 1024,
        memoryMax: we.memoryMax || 4096,
        javaPath: n.javaPath || we.javaPath || void 0,
        customJvmArgs: we.customJvmArgs || "",
        customGameArgs: "",
        fullscreen: !!we.fullscreen,
        hideLauncher: !!we.closeLauncherOnGameStart
      },
      (i) => {
        if ((i == null ? void 0 : i.stage) === "running") {
          const o = xe.find((s) => s.id === t);
          o && (o.lastPlayed = Date.now(), xt(pr, xe)), we.closeLauncherOnGameStart && setTimeout(() => {
            try {
              jx();
            } catch {
            }
          }, 3e3);
        }
        ((i == null ? void 0 : i.stage) === "idle" || (i == null ? void 0 : i.stage) === "error") && (Ye == null || Ye.setToolTip("Mine Launcher")), G == null || G.webContents.send("launch-progress", i);
      },
      (i) => G == null ? void 0 : G.webContents.send("game-log", i)
    ), !0;
  }), K.handle("stop-instance", (e, t) => su(t)), K.handle("restore-window", () => (G == null || G.show(), !0)), K.handle("get-system-info", () => ({
    totalRamMb: Fa,
    defaultMaxMemory: La
  })), K.handle("open-instance-folder", (e, t) => {
    Ut(t);
    const n = U.join(Pe, "instances", t);
    O.existsSync(n) || O.mkdirSync(n, { recursive: !0 }), nl.openPath(n);
  }), K.handle("get-instance-mods", (e, t) => {
    Ut(t);
    const n = U.join(Pe, "instances", t, "mods");
    if (!O.existsSync(n)) return [];
    try {
      return O.readdirSync(n).filter((r) => r.endsWith(".jar") || r.endsWith(".jar.disabled")).map((r) => {
        const i = U.join(n, r), o = O.statSync(i);
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
  }), K.handle("toggle-mod", (e, { instanceId: t, modFilename: n }) => {
    Ut(t);
    const r = U.join(Pe, "instances", t, "mods"), i = U.join(r, bi(n));
    if (!Es(r, i) || !O.existsSync(i)) return !1;
    const o = n.endsWith(".jar") ? n + ".disabled" : n.replace(/\.disabled$/, ""), s = U.join(r, bi(o));
    return Es(r, s) ? (O.renameSync(i, s), !0) : !1;
  }), K.handle("delete-mod", (e, { instanceId: t, modFilename: n }) => {
    Ut(t);
    const r = U.join(Pe, "instances", t, "mods"), i = U.join(r, bi(n));
    return Es(r, i) ? (O.existsSync(i) && O.unlinkSync(i), !0) : !1;
  }), K.handle("download-mod-file", async (e, { instanceId: t, downloadUrl: n, filename: r }) => {
    Ut(t);
    const i = bi(r);
    if (!n.startsWith("https://cdn.modrinth.com/")) throw new Error("Недопустимый источник файла");
    const o = U.join(Pe, "instances", t, "mods");
    return O.existsSync(o) || O.mkdirSync(o, { recursive: !0 }), await js(n, U.join(o, i)), !0;
  }), K.handle("add-mod-file", async (e, t) => {
    if (Ut(t), !G) return !1;
    const n = await No.showOpenDialog(G, {
      title: "Выберите файл мода (.jar)",
      filters: [{ name: "Minecraft Mods", extensions: ["jar"] }],
      properties: ["openFile", "multiSelections"]
    });
    if (n.canceled || !n.filePaths.length) return !1;
    const r = U.join(Pe, "instances", t, "mods");
    O.existsSync(r) || O.mkdirSync(r, { recursive: !0 });
    for (const i of n.filePaths) {
      const o = U.join(r, U.basename(i));
      O.copyFileSync(i, o);
    }
    return !0;
  }), K.handle("upload-user-skin", async (e, t) => {
    if (!G) return null;
    const n = await No.showOpenDialog(G, {
      title: "Выберите скин Minecraft (.png)",
      filters: [{ name: "Minecraft Skin (*.png)", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (n.canceled || !n.filePaths.length) return null;
    O.existsSync(Lt) || O.mkdirSync(Lt, { recursive: !0 });
    const r = U.join(Lt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`);
    return O.copyFileSync(n.filePaths[0], r), G.webContents.send("accounts-updated", he), r;
  }), K.handle("fetch-online-skin", async (e, { username: t, targetUsername: n }) => {
    O.existsSync(Lt) || O.mkdirSync(Lt, { recursive: !0 });
    const r = U.join(Lt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`), i = [
      `https://mc-heads.net/skin/${encodeURIComponent(n)}`,
      `https://minotar.net/skin/${encodeURIComponent(n)}`
    ];
    for (const o of i)
      try {
        if (await js(o, r), O.existsSync(r) && O.statSync(r).size > 100)
          return !0;
      } catch {
      }
    throw new Error(`Скин для «${n}» не найден на серверах`);
  }), K.handle("get-user-skin", (e, t) => {
    const n = U.join(Lt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`);
    return O.existsSync(n) ? n : null;
  }), K.handle("get-profile-stats", (e, t) => {
    const n = [];
    let r = 0, i = 0;
    for (const s of xe) {
      s.lastPlayed && (i = Math.max(i, s.lastPlayed));
      const a = U.join(Pe, "instances", s.id, "saves");
      if (O.existsSync(a))
        try {
          for (const h of O.readdirSync(a)) {
            const c = U.join(a, h);
            if (O.statSync(c).isDirectory()) {
              let f = 0;
              const p = U.join(c, "level.dat");
              O.existsSync(p) && (f = O.statSync(p).mtimeMs), n.push({
                instanceId: s.id,
                instanceName: s.name,
                worldName: h,
                lastPlayed: f
              });
            }
          }
        } catch {
        }
      const l = U.join(Pe, "instances", s.id, "mods");
      if (O.existsSync(l))
        try {
          r += O.readdirSync(l).filter((h) => h.endsWith(".jar") || h.endsWith(".jar.disabled")).length;
        } catch {
        }
    }
    const o = he.find((s) => s.username === t) || he.find((s) => s.isActive);
    return {
      username: (o == null ? void 0 : o.username) || t,
      uuid: (o == null ? void 0 : o.uuid) || "",
      worldsCount: n.length,
      worlds: n.sort((s, a) => a.lastPlayed - s.lastPlayed),
      instancesCount: xe.length,
      modsCount: r,
      lastPlayedFormatted: i ? new Date(i).toLocaleString("ru-RU") : "Ещё не играл"
    };
  }), K.handle("get-account-head", async (e, t) => {
    const n = U.join(Lt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`);
    return O.existsSync(n) ? `file://${n}` : `https://mc-heads.net/avatar/${encodeURIComponent(t)}/64`;
  }), K.handle("updater:check", async () => {
    if (yn) return { status: "dev" };
    try {
      return await De.autoUpdater.checkForUpdates(), { ok: !0 };
    } catch (e) {
      return { ok: !1, message: e == null ? void 0 : e.message };
    }
  }), K.handle("updater:download", async () => {
    if (yn) return { status: "dev" };
    try {
      return await De.autoUpdater.downloadUpdate(), { ok: !0 };
    } catch (e) {
      return { ok: !1, message: e == null ? void 0 : e.message };
    }
  }), K.handle("updater:install", () => {
    if (yn) return !1;
    try {
      return setImmediate(() => {
        De.autoUpdater.quitAndInstall();
      }), !0;
    } catch {
      return !1;
    }
  });
}
Tt.whenReady().then(() => {
  Bx(), Ua(), Mx();
});
export {
  th as RENDERER_DIST,
  yn as VITE_DEV_SERVER_URL
};
