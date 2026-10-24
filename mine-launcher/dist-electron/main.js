import wn, { app as Ge, Menu as Jc, BrowserWindow as Zc, dialog as xn, ipcMain as ne, shell as Fa, nativeImage as Ua, Tray as Fh } from "electron";
import xt from "fs";
import Uh from "constants";
import xr from "stream";
import bs from "util";
import Kc from "assert";
import fe from "path";
import ki from "child_process";
import Qc from "events";
import Jn from "crypto";
import eu from "tty";
import Mi from "os";
import Qt from "url";
import Bi from "zlib";
import kh from "http";
import { fileURLToPath as Mh } from "node:url";
import k from "node:path";
import x from "node:fs";
import Bh from "node:os";
import ji from "node:https";
import Rs from "node:http";
import jh from "node:crypto";
import { execSync as us, spawn as Hh } from "node:child_process";
var Ve = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Gh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var je = {}, vn = {}, Ye = {};
Ye.fromCallback = function(e) {
  return Object.defineProperty(function(...t) {
    if (typeof t[t.length - 1] == "function") e.apply(this, t);
    else
      return new Promise((n, r) => {
        t.push((i, o) => i != null ? r(i) : n(o)), e.apply(this, t);
      });
  }, "name", { value: e.name });
};
Ye.fromPromise = function(e) {
  return Object.defineProperty(function(...t) {
    const n = t[t.length - 1];
    if (typeof n != "function") return e.apply(this, t);
    t.pop(), e.apply(this, t).then((r) => n(null, r), n);
  }, "name", { value: e.name });
};
var Mt = Uh, qh = process.cwd, _i = null, zh = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return _i || (_i = qh.call(process)), _i;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var ka = process.chdir;
  process.chdir = function(e) {
    _i = null, ka.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, ka);
}
var Vh = Wh;
function Wh(e) {
  Mt.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || n(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = r(e.chmod), e.fchmod = r(e.fchmod), e.lchmod = r(e.lchmod), e.chownSync = s(e.chownSync), e.fchownSync = s(e.fchownSync), e.lchownSync = s(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = a(e.stat), e.fstat = a(e.fstat), e.lstat = a(e.lstat), e.statSync = c(e.statSync), e.fstatSync = c(e.fstatSync), e.lstatSync = c(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, u, h) {
    h && process.nextTick(h);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(l, u, h, w) {
    w && process.nextTick(w);
  }, e.lchownSync = function() {
  }), zh === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(l) {
    function u(h, w, m) {
      var f = Date.now(), y = 0;
      l(h, w, function _(E) {
        if (E && (E.code === "EACCES" || E.code === "EPERM" || E.code === "EBUSY") && Date.now() - f < 6e4) {
          setTimeout(function() {
            e.stat(w, function(S, T) {
              S && S.code === "ENOENT" ? l(h, w, _) : m(E);
            });
          }, y), y < 100 && (y += 10);
          return;
        }
        m && m(E);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(l) {
    function u(h, w, m, f, y, _) {
      var E;
      if (_ && typeof _ == "function") {
        var S = 0;
        E = function(T, R, O) {
          if (T && T.code === "EAGAIN" && S < 10)
            return S++, l.call(e, h, w, m, f, y, E);
          _.apply(this, arguments);
        };
      }
      return l.call(e, h, w, m, f, y, E);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(l) {
    return function(u, h, w, m, f) {
      for (var y = 0; ; )
        try {
          return l.call(e, u, h, w, m, f);
        } catch (_) {
          if (_.code === "EAGAIN" && y < 10) {
            y++;
            continue;
          }
          throw _;
        }
    };
  }(e.readSync);
  function t(l) {
    l.lchmod = function(u, h, w) {
      l.open(
        u,
        Mt.O_WRONLY | Mt.O_SYMLINK,
        h,
        function(m, f) {
          if (m) {
            w && w(m);
            return;
          }
          l.fchmod(f, h, function(y) {
            l.close(f, function(_) {
              w && w(y || _);
            });
          });
        }
      );
    }, l.lchmodSync = function(u, h) {
      var w = l.openSync(u, Mt.O_WRONLY | Mt.O_SYMLINK, h), m = !0, f;
      try {
        f = l.fchmodSync(w, h), m = !1;
      } finally {
        if (m)
          try {
            l.closeSync(w);
          } catch {
          }
        else
          l.closeSync(w);
      }
      return f;
    };
  }
  function n(l) {
    Mt.hasOwnProperty("O_SYMLINK") && l.futimes ? (l.lutimes = function(u, h, w, m) {
      l.open(u, Mt.O_SYMLINK, function(f, y) {
        if (f) {
          m && m(f);
          return;
        }
        l.futimes(y, h, w, function(_) {
          l.close(y, function(E) {
            m && m(_ || E);
          });
        });
      });
    }, l.lutimesSync = function(u, h, w) {
      var m = l.openSync(u, Mt.O_SYMLINK), f, y = !0;
      try {
        f = l.futimesSync(m, h, w), y = !1;
      } finally {
        if (y)
          try {
            l.closeSync(m);
          } catch {
          }
        else
          l.closeSync(m);
      }
      return f;
    }) : l.futimes && (l.lutimes = function(u, h, w, m) {
      m && process.nextTick(m);
    }, l.lutimesSync = function() {
    });
  }
  function r(l) {
    return l && function(u, h, w) {
      return l.call(e, u, h, function(m) {
        p(m) && (m = null), w && w.apply(this, arguments);
      });
    };
  }
  function i(l) {
    return l && function(u, h) {
      try {
        return l.call(e, u, h);
      } catch (w) {
        if (!p(w)) throw w;
      }
    };
  }
  function o(l) {
    return l && function(u, h, w, m) {
      return l.call(e, u, h, w, function(f) {
        p(f) && (f = null), m && m.apply(this, arguments);
      });
    };
  }
  function s(l) {
    return l && function(u, h, w) {
      try {
        return l.call(e, u, h, w);
      } catch (m) {
        if (!p(m)) throw m;
      }
    };
  }
  function a(l) {
    return l && function(u, h, w) {
      typeof h == "function" && (w = h, h = null);
      function m(f, y) {
        y && (y.uid < 0 && (y.uid += 4294967296), y.gid < 0 && (y.gid += 4294967296)), w && w.apply(this, arguments);
      }
      return h ? l.call(e, u, h, m) : l.call(e, u, m);
    };
  }
  function c(l) {
    return l && function(u, h) {
      var w = h ? l.call(e, u, h) : l.call(e, u);
      return w && (w.uid < 0 && (w.uid += 4294967296), w.gid < 0 && (w.gid += 4294967296)), w;
    };
  }
  function p(l) {
    if (!l || l.code === "ENOSYS")
      return !0;
    var u = !process.getuid || process.getuid() !== 0;
    return !!(u && (l.code === "EINVAL" || l.code === "EPERM"));
  }
}
var Ma = xr.Stream, Yh = Xh;
function Xh(e) {
  return {
    ReadStream: t,
    WriteStream: n
  };
  function t(r, i) {
    if (!(this instanceof t)) return new t(r, i);
    Ma.call(this);
    var o = this;
    this.path = r, this.fd = null, this.readable = !0, this.paused = !1, this.flags = "r", this.mode = 438, this.bufferSize = 64 * 1024, i = i || {};
    for (var s = Object.keys(i), a = 0, c = s.length; a < c; a++) {
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
    e.open(this.path, this.flags, this.mode, function(l, u) {
      if (l) {
        o.emit("error", l), o.readable = !1;
        return;
      }
      o.fd = u, o.emit("open", u), o._read();
    });
  }
  function n(r, i) {
    if (!(this instanceof n)) return new n(r, i);
    Ma.call(this), this.path = r, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
    for (var o = Object.keys(i), s = 0, a = o.length; s < a; s++) {
      var c = o[s];
      this[c] = i[c];
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
var Jh = Kh, Zh = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Kh(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Zh(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(n) {
    Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
  }), t;
}
var Ee = xt, Qh = Vh, ep = Yh, tp = Jh, ni = bs, Pe, Ii;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Pe = Symbol.for("graceful-fs.queue"), Ii = Symbol.for("graceful-fs.previous")) : (Pe = "___graceful-fs.queue", Ii = "___graceful-fs.previous");
function np() {
}
function tu(e, t) {
  Object.defineProperty(e, Pe, {
    get: function() {
      return t;
    }
  });
}
var yn = np;
ni.debuglog ? yn = ni.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (yn = function() {
  var e = ni.format.apply(ni, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!Ee[Pe]) {
  var rp = Ve[Pe] || [];
  tu(Ee, rp), Ee.close = function(e) {
    function t(n, r) {
      return e.call(Ee, n, function(i) {
        i || Ba(), typeof r == "function" && r.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Ii, {
      value: e
    }), t;
  }(Ee.close), Ee.closeSync = function(e) {
    function t(n) {
      e.apply(Ee, arguments), Ba();
    }
    return Object.defineProperty(t, Ii, {
      value: e
    }), t;
  }(Ee.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    yn(Ee[Pe]), Kc.equal(Ee[Pe].length, 0);
  });
}
Ve[Pe] || tu(Ve, Ee[Pe]);
var Xe = $s(tp(Ee));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !Ee.__patched && (Xe = $s(Ee), Ee.__patched = !0);
function $s(e) {
  Qh(e), e.gracefulify = $s, e.createReadStream = R, e.createWriteStream = O;
  var t = e.readFile;
  e.readFile = n;
  function n(P, A, Y) {
    return typeof A == "function" && (Y = A, A = null), K(P, A, Y);
    function K(te, F, b, M) {
      return t(te, F, function($) {
        $ && ($.code === "EMFILE" || $.code === "ENFILE") ? Nn([K, [te, F, b], $, M || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var r = e.writeFile;
  e.writeFile = i;
  function i(P, A, Y, K) {
    return typeof Y == "function" && (K = Y, Y = null), te(P, A, Y, K);
    function te(F, b, M, $, G) {
      return r(F, b, M, function(N) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? Nn([te, [F, b, M, $], N, G || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = s);
  function s(P, A, Y, K) {
    return typeof Y == "function" && (K = Y, Y = null), te(P, A, Y, K);
    function te(F, b, M, $, G) {
      return o(F, b, M, function(N) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? Nn([te, [F, b, M, $], N, G || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  var a = e.copyFile;
  a && (e.copyFile = c);
  function c(P, A, Y, K) {
    return typeof Y == "function" && (K = Y, Y = 0), te(P, A, Y, K);
    function te(F, b, M, $, G) {
      return a(F, b, M, function(N) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? Nn([te, [F, b, M, $], N, G || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  var p = e.readdir;
  e.readdir = u;
  var l = /^v[0-5]\./;
  function u(P, A, Y) {
    typeof A == "function" && (Y = A, A = null);
    var K = l.test(process.version) ? function(b, M, $, G) {
      return p(b, te(
        b,
        M,
        $,
        G
      ));
    } : function(b, M, $, G) {
      return p(b, M, te(
        b,
        M,
        $,
        G
      ));
    };
    return K(P, A, Y);
    function te(F, b, M, $) {
      return function(G, N) {
        G && (G.code === "EMFILE" || G.code === "ENFILE") ? Nn([
          K,
          [F, b, M],
          G,
          $ || Date.now(),
          Date.now()
        ]) : (N && N.sort && N.sort(), typeof M == "function" && M.call(this, G, N));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var h = ep(e);
    _ = h.ReadStream, S = h.WriteStream;
  }
  var w = e.ReadStream;
  w && (_.prototype = Object.create(w.prototype), _.prototype.open = E);
  var m = e.WriteStream;
  m && (S.prototype = Object.create(m.prototype), S.prototype.open = T), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return _;
    },
    set: function(P) {
      _ = P;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return S;
    },
    set: function(P) {
      S = P;
    },
    enumerable: !0,
    configurable: !0
  });
  var f = _;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return f;
    },
    set: function(P) {
      f = P;
    },
    enumerable: !0,
    configurable: !0
  });
  var y = S;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return y;
    },
    set: function(P) {
      y = P;
    },
    enumerable: !0,
    configurable: !0
  });
  function _(P, A) {
    return this instanceof _ ? (w.apply(this, arguments), this) : _.apply(Object.create(_.prototype), arguments);
  }
  function E() {
    var P = this;
    B(P.path, P.flags, P.mode, function(A, Y) {
      A ? (P.autoClose && P.destroy(), P.emit("error", A)) : (P.fd = Y, P.emit("open", Y), P.read());
    });
  }
  function S(P, A) {
    return this instanceof S ? (m.apply(this, arguments), this) : S.apply(Object.create(S.prototype), arguments);
  }
  function T() {
    var P = this;
    B(P.path, P.flags, P.mode, function(A, Y) {
      A ? (P.destroy(), P.emit("error", A)) : (P.fd = Y, P.emit("open", Y));
    });
  }
  function R(P, A) {
    return new e.ReadStream(P, A);
  }
  function O(P, A) {
    return new e.WriteStream(P, A);
  }
  var j = e.open;
  e.open = B;
  function B(P, A, Y, K) {
    return typeof Y == "function" && (K = Y, Y = null), te(P, A, Y, K);
    function te(F, b, M, $, G) {
      return j(F, b, M, function(N, q) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? Nn([te, [F, b, M, $], N, G || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  return e;
}
function Nn(e) {
  yn("ENQUEUE", e[0].name, e[1]), Ee[Pe].push(e), Ls();
}
var ri;
function Ba() {
  for (var e = Date.now(), t = 0; t < Ee[Pe].length; ++t)
    Ee[Pe][t].length > 2 && (Ee[Pe][t][3] = e, Ee[Pe][t][4] = e);
  Ls();
}
function Ls() {
  if (clearTimeout(ri), ri = void 0, Ee[Pe].length !== 0) {
    var e = Ee[Pe].shift(), t = e[0], n = e[1], r = e[2], i = e[3], o = e[4];
    if (i === void 0)
      yn("RETRY", t.name, n), t.apply(null, n);
    else if (Date.now() - i >= 6e4) {
      yn("TIMEOUT", t.name, n);
      var s = n.pop();
      typeof s == "function" && s.call(null, r);
    } else {
      var a = Date.now() - o, c = Math.max(o - i, 1), p = Math.min(c * 1.2, 100);
      a >= p ? (yn("RETRY", t.name, n), t.apply(null, n.concat([i]))) : Ee[Pe].push(e);
    }
    ri === void 0 && (ri = setTimeout(Ls, 0));
  }
}
(function(e) {
  const t = Ye.fromCallback, n = Xe, r = [
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
  }, e.read = function(i, o, s, a, c, p) {
    return typeof p == "function" ? n.read(i, o, s, a, c, p) : new Promise((l, u) => {
      n.read(i, o, s, a, c, (h, w, m) => {
        if (h) return u(h);
        l({ bytesRead: w, buffer: m });
      });
    });
  }, e.write = function(i, o, ...s) {
    return typeof s[s.length - 1] == "function" ? n.write(i, o, ...s) : new Promise((a, c) => {
      n.write(i, o, ...s, (p, l, u) => {
        if (p) return c(p);
        a({ bytesWritten: l, buffer: u });
      });
    });
  }, typeof n.writev == "function" && (e.writev = function(i, o, ...s) {
    return typeof s[s.length - 1] == "function" ? n.writev(i, o, ...s) : new Promise((a, c) => {
      n.writev(i, o, ...s, (p, l, u) => {
        if (p) return c(p);
        a({ bytesWritten: l, buffers: u });
      });
    });
  }), typeof n.realpath.native == "function" ? e.realpath.native = t(n.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(vn);
var xs = {}, nu = {};
const ip = fe;
nu.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(ip.parse(t).root, ""))) {
    const r = new Error(`Path contains invalid characters: ${t}`);
    throw r.code = "EINVAL", r;
  }
};
const ru = vn, { checkPath: iu } = nu, ou = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
xs.makeDir = async (e, t) => (iu(e), ru.mkdir(e, {
  mode: ou(t),
  recursive: !0
}));
xs.makeDirSync = (e, t) => (iu(e), ru.mkdirSync(e, {
  mode: ou(t),
  recursive: !0
}));
const op = Ye.fromPromise, { makeDir: sp, makeDirSync: Co } = xs, Io = op(sp);
var Ct = {
  mkdirs: Io,
  mkdirsSync: Co,
  // alias
  mkdirp: Io,
  mkdirpSync: Co,
  ensureDir: Io,
  ensureDirSync: Co
};
const ap = Ye.fromPromise, su = vn;
function lp(e) {
  return su.access(e).then(() => !0).catch(() => !1);
}
var Sn = {
  pathExists: ap(lp),
  pathExistsSync: su.existsSync
};
const qn = Xe;
function cp(e, t, n, r) {
  qn.open(e, "r+", (i, o) => {
    if (i) return r(i);
    qn.futimes(o, t, n, (s) => {
      qn.close(o, (a) => {
        r && r(s || a);
      });
    });
  });
}
function up(e, t, n) {
  const r = qn.openSync(e, "r+");
  return qn.futimesSync(r, t, n), qn.closeSync(r);
}
var au = {
  utimesMillis: cp,
  utimesMillisSync: up
};
const Vn = vn, $e = fe, fp = bs;
function dp(e, t, n) {
  const r = n.dereference ? (i) => Vn.stat(i, { bigint: !0 }) : (i) => Vn.lstat(i, { bigint: !0 });
  return Promise.all([
    r(e),
    r(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function hp(e, t, n) {
  let r;
  const i = n.dereference ? (s) => Vn.statSync(s, { bigint: !0 }) : (s) => Vn.lstatSync(s, { bigint: !0 }), o = i(e);
  try {
    r = i(t);
  } catch (s) {
    if (s.code === "ENOENT") return { srcStat: o, destStat: null };
    throw s;
  }
  return { srcStat: o, destStat: r };
}
function pp(e, t, n, r, i) {
  fp.callbackify(dp)(e, t, r, (o, s) => {
    if (o) return i(o);
    const { srcStat: a, destStat: c } = s;
    if (c) {
      if (Pr(a, c)) {
        const p = $e.basename(e), l = $e.basename(t);
        return n === "move" && p !== l && p.toLowerCase() === l.toLowerCase() ? i(null, { srcStat: a, destStat: c, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (a.isDirectory() && !c.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!a.isDirectory() && c.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return a.isDirectory() && Ps(e, t) ? i(new Error(Hi(e, t, n))) : i(null, { srcStat: a, destStat: c });
  });
}
function mp(e, t, n, r) {
  const { srcStat: i, destStat: o } = hp(e, t, r);
  if (o) {
    if (Pr(i, o)) {
      const s = $e.basename(e), a = $e.basename(t);
      if (n === "move" && s !== a && s.toLowerCase() === a.toLowerCase())
        return { srcStat: i, destStat: o, isChangingCase: !0 };
      throw new Error("Source and destination must not be the same.");
    }
    if (i.isDirectory() && !o.isDirectory())
      throw new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`);
    if (!i.isDirectory() && o.isDirectory())
      throw new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`);
  }
  if (i.isDirectory() && Ps(e, t))
    throw new Error(Hi(e, t, n));
  return { srcStat: i, destStat: o };
}
function lu(e, t, n, r, i) {
  const o = $e.resolve($e.dirname(e)), s = $e.resolve($e.dirname(n));
  if (s === o || s === $e.parse(s).root) return i();
  Vn.stat(s, { bigint: !0 }, (a, c) => a ? a.code === "ENOENT" ? i() : i(a) : Pr(t, c) ? i(new Error(Hi(e, n, r))) : lu(e, t, s, r, i));
}
function cu(e, t, n, r) {
  const i = $e.resolve($e.dirname(e)), o = $e.resolve($e.dirname(n));
  if (o === i || o === $e.parse(o).root) return;
  let s;
  try {
    s = Vn.statSync(o, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (Pr(t, s))
    throw new Error(Hi(e, n, r));
  return cu(e, t, o, r);
}
function Pr(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Ps(e, t) {
  const n = $e.resolve(e).split($e.sep).filter((i) => i), r = $e.resolve(t).split($e.sep).filter((i) => i);
  return n.reduce((i, o, s) => i && r[s] === o, !0);
}
function Hi(e, t, n) {
  return `Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Zn = {
  checkPaths: pp,
  checkPathsSync: mp,
  checkParentPaths: lu,
  checkParentPathsSync: cu,
  isSrcSubdir: Ps,
  areIdentical: Pr
};
const Ke = Xe, yr = fe, gp = Ct.mkdirs, Ep = Sn.pathExists, yp = au.utimesMillis, wr = Zn;
function wp(e, t, n, r) {
  typeof n == "function" && !r ? (r = n, n = {}) : typeof n == "function" && (n = { filter: n }), r = r || function() {
  }, n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), wr.checkPaths(e, t, "copy", n, (i, o) => {
    if (i) return r(i);
    const { srcStat: s, destStat: a } = o;
    wr.checkParentPaths(e, s, t, "copy", (c) => c ? r(c) : n.filter ? uu(ja, a, e, t, n, r) : ja(a, e, t, n, r));
  });
}
function ja(e, t, n, r, i) {
  const o = yr.dirname(n);
  Ep(o, (s, a) => {
    if (s) return i(s);
    if (a) return Di(e, t, n, r, i);
    gp(o, (c) => c ? i(c) : Di(e, t, n, r, i));
  });
}
function uu(e, t, n, r, i, o) {
  Promise.resolve(i.filter(n, r)).then((s) => s ? e(t, n, r, i, o) : o(), (s) => o(s));
}
function _p(e, t, n, r, i) {
  return r.filter ? uu(Di, e, t, n, r, i) : Di(e, t, n, r, i);
}
function Di(e, t, n, r, i) {
  (r.dereference ? Ke.stat : Ke.lstat)(t, (s, a) => s ? i(s) : a.isDirectory() ? Dp(a, e, t, n, r, i) : a.isFile() || a.isCharacterDevice() || a.isBlockDevice() ? vp(a, e, t, n, r, i) : a.isSymbolicLink() ? bp(e, t, n, r, i) : a.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : a.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function vp(e, t, n, r, i, o) {
  return t ? Sp(e, n, r, i, o) : fu(e, n, r, i, o);
}
function Sp(e, t, n, r, i) {
  if (r.overwrite)
    Ke.unlink(n, (o) => o ? i(o) : fu(e, t, n, r, i));
  else return r.errorOnExist ? i(new Error(`'${n}' already exists`)) : i();
}
function fu(e, t, n, r, i) {
  Ke.copyFile(t, n, (o) => o ? i(o) : r.preserveTimestamps ? Ap(e.mode, t, n, i) : Gi(n, e.mode, i));
}
function Ap(e, t, n, r) {
  return Tp(e) ? Cp(n, e, (i) => i ? r(i) : Ha(e, t, n, r)) : Ha(e, t, n, r);
}
function Tp(e) {
  return (e & 128) === 0;
}
function Cp(e, t, n) {
  return Gi(e, t | 128, n);
}
function Ha(e, t, n, r) {
  Ip(t, n, (i) => i ? r(i) : Gi(n, e, r));
}
function Gi(e, t, n) {
  return Ke.chmod(e, t, n);
}
function Ip(e, t, n) {
  Ke.stat(e, (r, i) => r ? n(r) : yp(t, i.atime, i.mtime, n));
}
function Dp(e, t, n, r, i, o) {
  return t ? du(n, r, i, o) : Np(e.mode, n, r, i, o);
}
function Np(e, t, n, r, i) {
  Ke.mkdir(n, (o) => {
    if (o) return i(o);
    du(t, n, r, (s) => s ? i(s) : Gi(n, e, i));
  });
}
function du(e, t, n, r) {
  Ke.readdir(e, (i, o) => i ? r(i) : hu(o, e, t, n, r));
}
function hu(e, t, n, r, i) {
  const o = e.pop();
  return o ? Op(e, o, t, n, r, i) : i();
}
function Op(e, t, n, r, i, o) {
  const s = yr.join(n, t), a = yr.join(r, t);
  wr.checkPaths(s, a, "copy", i, (c, p) => {
    if (c) return o(c);
    const { destStat: l } = p;
    _p(l, s, a, i, (u) => u ? o(u) : hu(e, n, r, i, o));
  });
}
function bp(e, t, n, r, i) {
  Ke.readlink(t, (o, s) => {
    if (o) return i(o);
    if (r.dereference && (s = yr.resolve(process.cwd(), s)), e)
      Ke.readlink(n, (a, c) => a ? a.code === "EINVAL" || a.code === "UNKNOWN" ? Ke.symlink(s, n, i) : i(a) : (r.dereference && (c = yr.resolve(process.cwd(), c)), wr.isSrcSubdir(s, c) ? i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${c}'.`)) : e.isDirectory() && wr.isSrcSubdir(c, s) ? i(new Error(`Cannot overwrite '${c}' with '${s}'.`)) : Rp(s, n, i)));
    else
      return Ke.symlink(s, n, i);
  });
}
function Rp(e, t, n) {
  Ke.unlink(t, (r) => r ? n(r) : Ke.symlink(e, t, n));
}
var $p = wp;
const He = Xe, _r = fe, Lp = Ct.mkdirsSync, xp = au.utimesMillisSync, vr = Zn;
function Pp(e, t, n) {
  typeof n == "function" && (n = { filter: n }), n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: r, destStat: i } = vr.checkPathsSync(e, t, "copy", n);
  return vr.checkParentPathsSync(e, r, t, "copy"), Fp(i, e, t, n);
}
function Fp(e, t, n, r) {
  if (r.filter && !r.filter(t, n)) return;
  const i = _r.dirname(n);
  return He.existsSync(i) || Lp(i), pu(e, t, n, r);
}
function Up(e, t, n, r) {
  if (!(r.filter && !r.filter(t, n)))
    return pu(e, t, n, r);
}
function pu(e, t, n, r) {
  const o = (r.dereference ? He.statSync : He.lstatSync)(t);
  if (o.isDirectory()) return qp(o, e, t, n, r);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return kp(o, e, t, n, r);
  if (o.isSymbolicLink()) return Wp(e, t, n, r);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function kp(e, t, n, r, i) {
  return t ? Mp(e, n, r, i) : mu(e, n, r, i);
}
function Mp(e, t, n, r) {
  if (r.overwrite)
    return He.unlinkSync(n), mu(e, t, n, r);
  if (r.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
function mu(e, t, n, r) {
  return He.copyFileSync(t, n), r.preserveTimestamps && Bp(e.mode, t, n), Fs(n, e.mode);
}
function Bp(e, t, n) {
  return jp(e) && Hp(n, e), Gp(t, n);
}
function jp(e) {
  return (e & 128) === 0;
}
function Hp(e, t) {
  return Fs(e, t | 128);
}
function Fs(e, t) {
  return He.chmodSync(e, t);
}
function Gp(e, t) {
  const n = He.statSync(e);
  return xp(t, n.atime, n.mtime);
}
function qp(e, t, n, r, i) {
  return t ? gu(n, r, i) : zp(e.mode, n, r, i);
}
function zp(e, t, n, r) {
  return He.mkdirSync(n), gu(t, n, r), Fs(n, e);
}
function gu(e, t, n) {
  He.readdirSync(e).forEach((r) => Vp(r, e, t, n));
}
function Vp(e, t, n, r) {
  const i = _r.join(t, e), o = _r.join(n, e), { destStat: s } = vr.checkPathsSync(i, o, "copy", r);
  return Up(s, i, o, r);
}
function Wp(e, t, n, r) {
  let i = He.readlinkSync(t);
  if (r.dereference && (i = _r.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = He.readlinkSync(n);
    } catch (s) {
      if (s.code === "EINVAL" || s.code === "UNKNOWN") return He.symlinkSync(i, n);
      throw s;
    }
    if (r.dereference && (o = _r.resolve(process.cwd(), o)), vr.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (He.statSync(n).isDirectory() && vr.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return Yp(i, n);
  } else
    return He.symlinkSync(i, n);
}
function Yp(e, t) {
  return He.unlinkSync(t), He.symlinkSync(e, t);
}
var Xp = Pp;
const Jp = Ye.fromCallback;
var Us = {
  copy: Jp($p),
  copySync: Xp
};
const Ga = Xe, Eu = fe, ue = Kc, Sr = process.platform === "win32";
function yu(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((n) => {
    e[n] = e[n] || Ga[n], n = n + "Sync", e[n] = e[n] || Ga[n];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function ks(e, t, n) {
  let r = 0;
  typeof t == "function" && (n = t, t = {}), ue(e, "rimraf: missing path"), ue.strictEqual(typeof e, "string", "rimraf: path should be a string"), ue.strictEqual(typeof n, "function", "rimraf: callback function required"), ue(t, "rimraf: invalid options argument provided"), ue.strictEqual(typeof t, "object", "rimraf: options should be object"), yu(t), qa(e, t, function i(o) {
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
  ue(e), ue(t), ue(typeof n == "function"), t.lstat(e, (r, i) => {
    if (r && r.code === "ENOENT")
      return n(null);
    if (r && r.code === "EPERM" && Sr)
      return za(e, t, r, n);
    if (i && i.isDirectory())
      return vi(e, t, r, n);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return n(null);
        if (o.code === "EPERM")
          return Sr ? za(e, t, o, n) : vi(e, t, o, n);
        if (o.code === "EISDIR")
          return vi(e, t, o, n);
      }
      return n(o);
    });
  });
}
function za(e, t, n, r) {
  ue(e), ue(t), ue(typeof r == "function"), t.chmod(e, 438, (i) => {
    i ? r(i.code === "ENOENT" ? null : n) : t.stat(e, (o, s) => {
      o ? r(o.code === "ENOENT" ? null : n) : s.isDirectory() ? vi(e, t, n, r) : t.unlink(e, r);
    });
  });
}
function Va(e, t, n) {
  let r;
  ue(e), ue(t);
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
  r.isDirectory() ? Si(e, t, n) : t.unlinkSync(e);
}
function vi(e, t, n, r) {
  ue(e), ue(t), ue(typeof r == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? Zp(e, t, r) : i && i.code === "ENOTDIR" ? r(n) : r(i);
  });
}
function Zp(e, t, n) {
  ue(e), ue(t), ue(typeof n == "function"), t.readdir(e, (r, i) => {
    if (r) return n(r);
    let o = i.length, s;
    if (o === 0) return t.rmdir(e, n);
    i.forEach((a) => {
      ks(Eu.join(e, a), t, (c) => {
        if (!s) {
          if (c) return n(s = c);
          --o === 0 && t.rmdir(e, n);
        }
      });
    });
  });
}
function wu(e, t) {
  let n;
  t = t || {}, yu(t), ue(e, "rimraf: missing path"), ue.strictEqual(typeof e, "string", "rimraf: path should be a string"), ue(t, "rimraf: missing options"), ue.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    n = t.lstatSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    r.code === "EPERM" && Sr && Va(e, t, r);
  }
  try {
    n && n.isDirectory() ? Si(e, t, null) : t.unlinkSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    if (r.code === "EPERM")
      return Sr ? Va(e, t, r) : Si(e, t, r);
    if (r.code !== "EISDIR")
      throw r;
    Si(e, t, r);
  }
}
function Si(e, t, n) {
  ue(e), ue(t);
  try {
    t.rmdirSync(e);
  } catch (r) {
    if (r.code === "ENOTDIR")
      throw n;
    if (r.code === "ENOTEMPTY" || r.code === "EEXIST" || r.code === "EPERM")
      Kp(e, t);
    else if (r.code !== "ENOENT")
      throw r;
  }
}
function Kp(e, t) {
  if (ue(e), ue(t), t.readdirSync(e).forEach((n) => wu(Eu.join(e, n), t)), Sr) {
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
var Qp = ks;
ks.sync = wu;
const Ni = Xe, em = Ye.fromCallback, _u = Qp;
function tm(e, t) {
  if (Ni.rm) return Ni.rm(e, { recursive: !0, force: !0 }, t);
  _u(e, t);
}
function nm(e) {
  if (Ni.rmSync) return Ni.rmSync(e, { recursive: !0, force: !0 });
  _u.sync(e);
}
var qi = {
  remove: em(tm),
  removeSync: nm
};
const rm = Ye.fromPromise, vu = vn, Su = fe, Au = Ct, Tu = qi, Wa = rm(async function(t) {
  let n;
  try {
    n = await vu.readdir(t);
  } catch {
    return Au.mkdirs(t);
  }
  return Promise.all(n.map((r) => Tu.remove(Su.join(t, r))));
});
function Ya(e) {
  let t;
  try {
    t = vu.readdirSync(e);
  } catch {
    return Au.mkdirsSync(e);
  }
  t.forEach((n) => {
    n = Su.join(e, n), Tu.removeSync(n);
  });
}
var im = {
  emptyDirSync: Ya,
  emptydirSync: Ya,
  emptyDir: Wa,
  emptydir: Wa
};
const om = Ye.fromCallback, Cu = fe, qt = Xe, Iu = Ct;
function sm(e, t) {
  function n() {
    qt.writeFile(e, "", (r) => {
      if (r) return t(r);
      t();
    });
  }
  qt.stat(e, (r, i) => {
    if (!r && i.isFile()) return t();
    const o = Cu.dirname(e);
    qt.stat(o, (s, a) => {
      if (s)
        return s.code === "ENOENT" ? Iu.mkdirs(o, (c) => {
          if (c) return t(c);
          n();
        }) : t(s);
      a.isDirectory() ? n() : qt.readdir(o, (c) => {
        if (c) return t(c);
      });
    });
  });
}
function am(e) {
  let t;
  try {
    t = qt.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const n = Cu.dirname(e);
  try {
    qt.statSync(n).isDirectory() || qt.readdirSync(n);
  } catch (r) {
    if (r && r.code === "ENOENT") Iu.mkdirsSync(n);
    else throw r;
  }
  qt.writeFileSync(e, "");
}
var lm = {
  createFile: om(sm),
  createFileSync: am
};
const cm = Ye.fromCallback, Du = fe, Gt = Xe, Nu = Ct, um = Sn.pathExists, { areIdentical: Ou } = Zn;
function fm(e, t, n) {
  function r(i, o) {
    Gt.link(i, o, (s) => {
      if (s) return n(s);
      n(null);
    });
  }
  Gt.lstat(t, (i, o) => {
    Gt.lstat(e, (s, a) => {
      if (s)
        return s.message = s.message.replace("lstat", "ensureLink"), n(s);
      if (o && Ou(a, o)) return n(null);
      const c = Du.dirname(t);
      um(c, (p, l) => {
        if (p) return n(p);
        if (l) return r(e, t);
        Nu.mkdirs(c, (u) => {
          if (u) return n(u);
          r(e, t);
        });
      });
    });
  });
}
function dm(e, t) {
  let n;
  try {
    n = Gt.lstatSync(t);
  } catch {
  }
  try {
    const o = Gt.lstatSync(e);
    if (n && Ou(o, n)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const r = Du.dirname(t);
  return Gt.existsSync(r) || Nu.mkdirsSync(r), Gt.linkSync(e, t);
}
var hm = {
  createLink: cm(fm),
  createLinkSync: dm
};
const zt = fe, pr = Xe, pm = Sn.pathExists;
function mm(e, t, n) {
  if (zt.isAbsolute(e))
    return pr.lstat(e, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), n(r)) : n(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const r = zt.dirname(t), i = zt.join(r, e);
    return pm(i, (o, s) => o ? n(o) : s ? n(null, {
      toCwd: i,
      toDst: e
    }) : pr.lstat(e, (a) => a ? (a.message = a.message.replace("lstat", "ensureSymlink"), n(a)) : n(null, {
      toCwd: e,
      toDst: zt.relative(r, e)
    })));
  }
}
function gm(e, t) {
  let n;
  if (zt.isAbsolute(e)) {
    if (n = pr.existsSync(e), !n) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const r = zt.dirname(t), i = zt.join(r, e);
    if (n = pr.existsSync(i), n)
      return {
        toCwd: i,
        toDst: e
      };
    if (n = pr.existsSync(e), !n) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: zt.relative(r, e)
    };
  }
}
var Em = {
  symlinkPaths: mm,
  symlinkPathsSync: gm
};
const bu = Xe;
function ym(e, t, n) {
  if (n = typeof t == "function" ? t : n, t = typeof t == "function" ? !1 : t, t) return n(null, t);
  bu.lstat(e, (r, i) => {
    if (r) return n(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", n(null, t);
  });
}
function wm(e, t) {
  let n;
  if (t) return t;
  try {
    n = bu.lstatSync(e);
  } catch {
    return "file";
  }
  return n && n.isDirectory() ? "dir" : "file";
}
var _m = {
  symlinkType: ym,
  symlinkTypeSync: wm
};
const vm = Ye.fromCallback, Ru = fe, ht = vn, $u = Ct, Sm = $u.mkdirs, Am = $u.mkdirsSync, Lu = Em, Tm = Lu.symlinkPaths, Cm = Lu.symlinkPathsSync, xu = _m, Im = xu.symlinkType, Dm = xu.symlinkTypeSync, Nm = Sn.pathExists, { areIdentical: Pu } = Zn;
function Om(e, t, n, r) {
  r = typeof n == "function" ? n : r, n = typeof n == "function" ? !1 : n, ht.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      ht.stat(e),
      ht.stat(t)
    ]).then(([s, a]) => {
      if (Pu(s, a)) return r(null);
      Xa(e, t, n, r);
    }) : Xa(e, t, n, r);
  });
}
function Xa(e, t, n, r) {
  Tm(e, t, (i, o) => {
    if (i) return r(i);
    e = o.toDst, Im(o.toCwd, n, (s, a) => {
      if (s) return r(s);
      const c = Ru.dirname(t);
      Nm(c, (p, l) => {
        if (p) return r(p);
        if (l) return ht.symlink(e, t, a, r);
        Sm(c, (u) => {
          if (u) return r(u);
          ht.symlink(e, t, a, r);
        });
      });
    });
  });
}
function bm(e, t, n) {
  let r;
  try {
    r = ht.lstatSync(t);
  } catch {
  }
  if (r && r.isSymbolicLink()) {
    const a = ht.statSync(e), c = ht.statSync(t);
    if (Pu(a, c)) return;
  }
  const i = Cm(e, t);
  e = i.toDst, n = Dm(i.toCwd, n);
  const o = Ru.dirname(t);
  return ht.existsSync(o) || Am(o), ht.symlinkSync(e, t, n);
}
var Rm = {
  createSymlink: vm(Om),
  createSymlinkSync: bm
};
const { createFile: Ja, createFileSync: Za } = lm, { createLink: Ka, createLinkSync: Qa } = hm, { createSymlink: el, createSymlinkSync: tl } = Rm;
var $m = {
  // file
  createFile: Ja,
  createFileSync: Za,
  ensureFile: Ja,
  ensureFileSync: Za,
  // link
  createLink: Ka,
  createLinkSync: Qa,
  ensureLink: Ka,
  ensureLinkSync: Qa,
  // symlink
  createSymlink: el,
  createSymlinkSync: tl,
  ensureSymlink: el,
  ensureSymlinkSync: tl
};
function Lm(e, { EOL: t = `
`, finalEOL: n = !0, replacer: r = null, spaces: i } = {}) {
  const o = n ? t : "", s = JSON.stringify(e, r, i);
  if (s === void 0)
    throw new TypeError(`Converting ${typeof e} value to JSON is not supported`);
  return s.replace(/\n/g, t) + o;
}
function xm(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var Ms = { stringify: Lm, stripBom: xm };
let Wn;
try {
  Wn = Xe;
} catch {
  Wn = xt;
}
const zi = Ye, { stringify: Fu, stripBom: Uu } = Ms;
async function Pm(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || Wn, r = "throws" in t ? t.throws : !0;
  let i = await zi.fromCallback(n.readFile)(e, t);
  i = Uu(i);
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
const Fm = zi.fromPromise(Pm);
function Um(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || Wn, r = "throws" in t ? t.throws : !0;
  try {
    let i = n.readFileSync(e, t);
    return i = Uu(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (r)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function km(e, t, n = {}) {
  const r = n.fs || Wn, i = Fu(t, n);
  await zi.fromCallback(r.writeFile)(e, i, n);
}
const Mm = zi.fromPromise(km);
function Bm(e, t, n = {}) {
  const r = n.fs || Wn, i = Fu(t, n);
  return r.writeFileSync(e, i, n);
}
var jm = {
  readFile: Fm,
  readFileSync: Um,
  writeFile: Mm,
  writeFileSync: Bm
};
const ii = jm;
var Hm = {
  // jsonfile exports
  readJson: ii.readFile,
  readJsonSync: ii.readFileSync,
  writeJson: ii.writeFile,
  writeJsonSync: ii.writeFileSync
};
const Gm = Ye.fromCallback, mr = Xe, ku = fe, Mu = Ct, qm = Sn.pathExists;
function zm(e, t, n, r) {
  typeof n == "function" && (r = n, n = "utf8");
  const i = ku.dirname(e);
  qm(i, (o, s) => {
    if (o) return r(o);
    if (s) return mr.writeFile(e, t, n, r);
    Mu.mkdirs(i, (a) => {
      if (a) return r(a);
      mr.writeFile(e, t, n, r);
    });
  });
}
function Vm(e, ...t) {
  const n = ku.dirname(e);
  if (mr.existsSync(n))
    return mr.writeFileSync(e, ...t);
  Mu.mkdirsSync(n), mr.writeFileSync(e, ...t);
}
var Bs = {
  outputFile: Gm(zm),
  outputFileSync: Vm
};
const { stringify: Wm } = Ms, { outputFile: Ym } = Bs;
async function Xm(e, t, n = {}) {
  const r = Wm(t, n);
  await Ym(e, r, n);
}
var Jm = Xm;
const { stringify: Zm } = Ms, { outputFileSync: Km } = Bs;
function Qm(e, t, n) {
  const r = Zm(t, n);
  Km(e, r, n);
}
var e0 = Qm;
const t0 = Ye.fromPromise, We = Hm;
We.outputJson = t0(Jm);
We.outputJsonSync = e0;
We.outputJSON = We.outputJson;
We.outputJSONSync = We.outputJsonSync;
We.writeJSON = We.writeJson;
We.writeJSONSync = We.writeJsonSync;
We.readJSON = We.readJson;
We.readJSONSync = We.readJsonSync;
var n0 = We;
const r0 = Xe, fs = fe, i0 = Us.copy, Bu = qi.remove, o0 = Ct.mkdirp, s0 = Sn.pathExists, nl = Zn;
function a0(e, t, n, r) {
  typeof n == "function" && (r = n, n = {}), n = n || {};
  const i = n.overwrite || n.clobber || !1;
  nl.checkPaths(e, t, "move", n, (o, s) => {
    if (o) return r(o);
    const { srcStat: a, isChangingCase: c = !1 } = s;
    nl.checkParentPaths(e, a, t, "move", (p) => {
      if (p) return r(p);
      if (l0(t)) return rl(e, t, i, c, r);
      o0(fs.dirname(t), (l) => l ? r(l) : rl(e, t, i, c, r));
    });
  });
}
function l0(e) {
  const t = fs.dirname(e);
  return fs.parse(t).root === t;
}
function rl(e, t, n, r, i) {
  if (r) return Do(e, t, n, i);
  if (n)
    return Bu(t, (o) => o ? i(o) : Do(e, t, n, i));
  s0(t, (o, s) => o ? i(o) : s ? i(new Error("dest already exists.")) : Do(e, t, n, i));
}
function Do(e, t, n, r) {
  r0.rename(e, t, (i) => i ? i.code !== "EXDEV" ? r(i) : c0(e, t, n, r) : r());
}
function c0(e, t, n, r) {
  i0(e, t, {
    overwrite: n,
    errorOnExist: !0
  }, (o) => o ? r(o) : Bu(e, r));
}
var u0 = a0;
const ju = Xe, ds = fe, f0 = Us.copySync, Hu = qi.removeSync, d0 = Ct.mkdirpSync, il = Zn;
function h0(e, t, n) {
  n = n || {};
  const r = n.overwrite || n.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = il.checkPathsSync(e, t, "move", n);
  return il.checkParentPathsSync(e, i, t, "move"), p0(t) || d0(ds.dirname(t)), m0(e, t, r, o);
}
function p0(e) {
  const t = ds.dirname(e);
  return ds.parse(t).root === t;
}
function m0(e, t, n, r) {
  if (r) return No(e, t, n);
  if (n)
    return Hu(t), No(e, t, n);
  if (ju.existsSync(t)) throw new Error("dest already exists.");
  return No(e, t, n);
}
function No(e, t, n) {
  try {
    ju.renameSync(e, t);
  } catch (r) {
    if (r.code !== "EXDEV") throw r;
    return g0(e, t, n);
  }
}
function g0(e, t, n) {
  return f0(e, t, {
    overwrite: n,
    errorOnExist: !0
  }), Hu(e);
}
var E0 = h0;
const y0 = Ye.fromCallback;
var w0 = {
  move: y0(u0),
  moveSync: E0
}, en = {
  // Export promiseified graceful-fs:
  ...vn,
  // Export extra methods:
  ...Us,
  ...im,
  ...$m,
  ...n0,
  ...Ct,
  ...w0,
  ...Bs,
  ...Sn,
  ...qi
}, An = {}, Xt = {}, Oe = {}, Jt = {};
Object.defineProperty(Jt, "__esModule", { value: !0 });
Jt.CancellationError = Jt.CancellationToken = void 0;
const _0 = Qc;
class v0 extends _0.EventEmitter {
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
      return Promise.reject(new hs());
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
          o(new hs());
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
Jt.CancellationToken = v0;
class hs extends Error {
  constructor() {
    super("cancelled");
  }
}
Jt.CancellationError = hs;
var Kn = {};
Object.defineProperty(Kn, "__esModule", { value: !0 });
Kn.newError = S0;
function S0(e, t) {
  const n = new Error(e);
  return n.code = t, n;
}
var Ne = {}, ps = { exports: {} }, oi = { exports: {} }, Oo, ol;
function A0() {
  if (ol) return Oo;
  ol = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, i = r * 7, o = r * 365.25;
  Oo = function(l, u) {
    u = u || {};
    var h = typeof l;
    if (h === "string" && l.length > 0)
      return s(l);
    if (h === "number" && isFinite(l))
      return u.long ? c(l) : a(l);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(l)
    );
  };
  function s(l) {
    if (l = String(l), !(l.length > 100)) {
      var u = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        l
      );
      if (u) {
        var h = parseFloat(u[1]), w = (u[2] || "ms").toLowerCase();
        switch (w) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return h * o;
          case "weeks":
          case "week":
          case "w":
            return h * i;
          case "days":
          case "day":
          case "d":
            return h * r;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return h * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return h * t;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return h * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return h;
          default:
            return;
        }
      }
    }
  }
  function a(l) {
    var u = Math.abs(l);
    return u >= r ? Math.round(l / r) + "d" : u >= n ? Math.round(l / n) + "h" : u >= t ? Math.round(l / t) + "m" : u >= e ? Math.round(l / e) + "s" : l + "ms";
  }
  function c(l) {
    var u = Math.abs(l);
    return u >= r ? p(l, u, r, "day") : u >= n ? p(l, u, n, "hour") : u >= t ? p(l, u, t, "minute") : u >= e ? p(l, u, e, "second") : l + " ms";
  }
  function p(l, u, h, w) {
    var m = u >= h * 1.5;
    return Math.round(l / h) + " " + w + (m ? "s" : "");
  }
  return Oo;
}
var bo, sl;
function Gu() {
  if (sl) return bo;
  sl = 1;
  function e(t) {
    r.debug = r, r.default = r, r.coerce = p, r.disable = a, r.enable = o, r.enabled = c, r.humanize = A0(), r.destroy = l, Object.keys(t).forEach((u) => {
      r[u] = t[u];
    }), r.names = [], r.skips = [], r.formatters = {};
    function n(u) {
      let h = 0;
      for (let w = 0; w < u.length; w++)
        h = (h << 5) - h + u.charCodeAt(w), h |= 0;
      return r.colors[Math.abs(h) % r.colors.length];
    }
    r.selectColor = n;
    function r(u) {
      let h, w = null, m, f;
      function y(..._) {
        if (!y.enabled)
          return;
        const E = y, S = Number(/* @__PURE__ */ new Date()), T = S - (h || S);
        E.diff = T, E.prev = h, E.curr = S, h = S, _[0] = r.coerce(_[0]), typeof _[0] != "string" && _.unshift("%O");
        let R = 0;
        _[0] = _[0].replace(/%([a-zA-Z%])/g, (j, B) => {
          if (j === "%%")
            return "%";
          R++;
          const P = r.formatters[B];
          if (typeof P == "function") {
            const A = _[R];
            j = P.call(E, A), _.splice(R, 1), R--;
          }
          return j;
        }), r.formatArgs.call(E, _), (E.log || r.log).apply(E, _);
      }
      return y.namespace = u, y.useColors = r.useColors(), y.color = r.selectColor(u), y.extend = i, y.destroy = r.destroy, Object.defineProperty(y, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => w !== null ? w : (m !== r.namespaces && (m = r.namespaces, f = r.enabled(u)), f),
        set: (_) => {
          w = _;
        }
      }), typeof r.init == "function" && r.init(y), y;
    }
    function i(u, h) {
      const w = r(this.namespace + (typeof h > "u" ? ":" : h) + u);
      return w.log = this.log, w;
    }
    function o(u) {
      r.save(u), r.namespaces = u, r.names = [], r.skips = [];
      const h = (typeof u == "string" ? u : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const w of h)
        w[0] === "-" ? r.skips.push(w.slice(1)) : r.names.push(w);
    }
    function s(u, h) {
      let w = 0, m = 0, f = -1, y = 0;
      for (; w < u.length; )
        if (m < h.length && (h[m] === u[w] || h[m] === "*"))
          h[m] === "*" ? (f = m, y = w, m++) : (w++, m++);
        else if (f !== -1)
          m = f + 1, y++, w = y;
        else
          return !1;
      for (; m < h.length && h[m] === "*"; )
        m++;
      return m === h.length;
    }
    function a() {
      const u = [
        ...r.names,
        ...r.skips.map((h) => "-" + h)
      ].join(",");
      return r.enable(""), u;
    }
    function c(u) {
      for (const h of r.skips)
        if (s(u, h))
          return !1;
      for (const h of r.names)
        if (s(u, h))
          return !0;
      return !1;
    }
    function p(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function l() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  return bo = e, bo;
}
var al;
function T0() {
  return al || (al = 1, function(e, t) {
    t.formatArgs = r, t.save = i, t.load = o, t.useColors = n, t.storage = s(), t.destroy = /* @__PURE__ */ (() => {
      let c = !1;
      return () => {
        c || (c = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
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
      let c;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (c = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(c[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function r(c) {
      if (c[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + c[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const p = "color: " + this.color;
      c.splice(1, 0, p, "color: inherit");
      let l = 0, u = 0;
      c[0].replace(/%[a-zA-Z%]/g, (h) => {
        h !== "%%" && (l++, h === "%c" && (u = l));
      }), c.splice(u, 0, p);
    }
    t.log = console.debug || console.log || (() => {
    });
    function i(c) {
      try {
        c ? t.storage.setItem("debug", c) : t.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let c;
      try {
        c = t.storage.getItem("debug") || t.storage.getItem("DEBUG");
      } catch {
      }
      return !c && typeof process < "u" && "env" in process && (c = process.env.DEBUG), c;
    }
    function s() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = Gu()(t);
    const { formatters: a } = e.exports;
    a.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (p) {
        return "[UnexpectedJSONParseError]: " + p.message;
      }
    };
  }(oi, oi.exports)), oi.exports;
}
var si = { exports: {} }, Ro, ll;
function C0() {
  return ll || (ll = 1, Ro = (e, t = process.argv) => {
    const n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", r = t.indexOf(n + e), i = t.indexOf("--");
    return r !== -1 && (i === -1 || r < i);
  }), Ro;
}
var $o, cl;
function I0() {
  if (cl) return $o;
  cl = 1;
  const e = Mi, t = eu, n = C0(), { env: r } = process;
  let i;
  n("no-color") || n("no-colors") || n("color=false") || n("color=never") ? i = 0 : (n("color") || n("colors") || n("color=true") || n("color=always")) && (i = 1), "FORCE_COLOR" in r && (r.FORCE_COLOR === "true" ? i = 1 : r.FORCE_COLOR === "false" ? i = 0 : i = r.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(r.FORCE_COLOR, 10), 3));
  function o(c) {
    return c === 0 ? !1 : {
      level: c,
      hasBasic: !0,
      has256: c >= 2,
      has16m: c >= 3
    };
  }
  function s(c, p) {
    if (i === 0)
      return 0;
    if (n("color=16m") || n("color=full") || n("color=truecolor"))
      return 3;
    if (n("color=256"))
      return 2;
    if (c && !p && i === void 0)
      return 0;
    const l = i || 0;
    if (r.TERM === "dumb")
      return l;
    if (process.platform === "win32") {
      const u = e.release().split(".");
      return Number(u[0]) >= 10 && Number(u[2]) >= 10586 ? Number(u[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in r)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((u) => u in r) || r.CI_NAME === "codeship" ? 1 : l;
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
    return /-256(color)?$/i.test(r.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(r.TERM) || "COLORTERM" in r ? 1 : l;
  }
  function a(c) {
    const p = s(c, c && c.isTTY);
    return o(p);
  }
  return $o = {
    supportsColor: a,
    stdout: o(s(!0, t.isatty(1))),
    stderr: o(s(!0, t.isatty(2)))
  }, $o;
}
var ul;
function D0() {
  return ul || (ul = 1, function(e, t) {
    const n = eu, r = bs;
    t.init = l, t.log = a, t.formatArgs = o, t.save = c, t.load = p, t.useColors = i, t.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const h = I0();
      h && (h.stderr || h).level >= 2 && (t.colors = [
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
    t.inspectOpts = Object.keys(process.env).filter((h) => /^debug_/i.test(h)).reduce((h, w) => {
      const m = w.substring(6).toLowerCase().replace(/_([a-z])/g, (y, _) => _.toUpperCase());
      let f = process.env[w];
      return /^(yes|on|true|enabled)$/i.test(f) ? f = !0 : /^(no|off|false|disabled)$/i.test(f) ? f = !1 : f === "null" ? f = null : f = Number(f), h[m] = f, h;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function o(h) {
      const { namespace: w, useColors: m } = this;
      if (m) {
        const f = this.color, y = "\x1B[3" + (f < 8 ? f : "8;5;" + f), _ = `  ${y};1m${w} \x1B[0m`;
        h[0] = _ + h[0].split(`
`).join(`
` + _), h.push(y + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        h[0] = s() + w + " " + h[0];
    }
    function s() {
      return t.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function a(...h) {
      return process.stderr.write(r.formatWithOptions(t.inspectOpts, ...h) + `
`);
    }
    function c(h) {
      h ? process.env.DEBUG = h : delete process.env.DEBUG;
    }
    function p() {
      return process.env.DEBUG;
    }
    function l(h) {
      h.inspectOpts = {};
      const w = Object.keys(t.inspectOpts);
      for (let m = 0; m < w.length; m++)
        h.inspectOpts[w[m]] = t.inspectOpts[w[m]];
    }
    e.exports = Gu()(t);
    const { formatters: u } = e.exports;
    u.o = function(h) {
      return this.inspectOpts.colors = this.useColors, r.inspect(h, this.inspectOpts).split(`
`).map((w) => w.trim()).join(" ");
    }, u.O = function(h) {
      return this.inspectOpts.colors = this.useColors, r.inspect(h, this.inspectOpts);
    };
  }(si, si.exports)), si.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? ps.exports = T0() : ps.exports = D0();
var N0 = ps.exports, Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.ProgressCallbackTransform = void 0;
const O0 = xr;
class b0 extends O0.Transform {
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
Fr.ProgressCallbackTransform = b0;
Object.defineProperty(Ne, "__esModule", { value: !0 });
Ne.DigestTransform = Ne.HttpExecutor = Ne.HttpError = void 0;
Ne.addSensitiveRedirectHeader = U0;
Ne.addSensitiveFieldPattern = k0;
Ne.createHttpError = gs;
Ne.parseJson = B0;
Ne.configureRequestOptionsFromUrl = Yu;
Ne.configureRequestUrl = Gs;
Ne.safeGetHeader = zn;
Ne.configureRequestOptions = Oi;
Ne.isSensitiveFieldName = Xu;
Ne.hashSensitiveValue = Ju;
Ne.safeStringifyJson = Un;
const qu = Jn, R0 = N0, $0 = xt, L0 = xr, ms = Qt, x0 = Jt, fl = Kn, P0 = Fr, Bt = (0, R0.default)("electron-builder"), js = (e) => e.toLowerCase().replace(/[-_]/g, ""), zu = /* @__PURE__ */ new Set(["authorization", "proxyauthorization", "privatetoken", "xapikey", "xauthtoken", "xaccesstoken", "xgitlabtoken", "cookie", "xcsrftoken"]), Vu = ["token", "password", "secret", "authorization", "credential", "apikey", "passphrase", "auth"], F0 = ["key"];
function U0(e) {
  zu.add(js(e));
}
function k0(e) {
  Vu.push(e.toLowerCase().replace(/[-_]/g, ""));
}
function gs(e, t = null) {
  return new Hs(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + Un(e.headers), t);
}
const M0 = /* @__PURE__ */ new Map([
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
class Hs extends Error {
  constructor(t, n = `HTTP error: ${M0.get(t) || t}`, r = null) {
    super(n), this.statusCode = t, this.description = r, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
Ne.HttpError = Hs;
function B0(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class Fn {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, n = new x0.CancellationToken(), r) {
    Oi(t);
    const i = r == null ? void 0 : JSON.stringify(r), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      Bt.enabled && Bt(Un(r));
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
    if (Bt.enabled) {
      const { headers: o, auth: s, ...a } = t;
      Bt(`Request: ${Un(a)}`);
    }
    return n.createPromise((o, s, a) => {
      const c = this.createRequest(t, (p) => {
        try {
          this.handleResponse(p, t, n, o, s, i, r);
        } catch (l) {
          s(l);
        }
      });
      this.addErrorAndTimeoutHandlers(c, s, t.timeout), this.addRedirectHandlers(c, t, s, i, (p) => {
        this.doApiRequest(p, n, r, i).then(o).catch(s);
      }), r(c, s), a(() => c.abort());
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
    var c;
    if (Bt.enabled) {
      const { headers: w, auth: m, ...f } = n;
      Bt(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${Un(f)}`);
    }
    if (t.statusCode === 404) {
      o(gs(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const p = (c = t.statusCode) !== null && c !== void 0 ? c : 0, l = p >= 300 && p < 400, u = zn(t, "location");
    if (l && u != null) {
      if (s > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(Fn.prepareRedirectUrlOptions(u, n), r, a, s).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let h = "";
    t.on("error", o), t.on("data", (w) => h += w), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const w = zn(t, "content-type"), m = w != null && (Array.isArray(w) ? w.find((f) => f.includes("json")) != null : w.includes("json"));
          o(gs(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

          Data:
          ${m ? Un(JSON.parse(h)) : h}
          `));
        } else
          i(h.length === 0 ? null : h);
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
      Gs(t, a), Oi(a), this.doDownload(a, {
        destination: null,
        options: n,
        onCancel: o,
        callback: (c) => {
          c == null ? r(Buffer.concat(s)) : i(c);
        },
        responseHandler: (c, p) => {
          let l = 0;
          c.on("data", (u) => {
            if (l += u.length, l > 524288e3) {
              p(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            s.push(u);
          }), c.on("end", () => {
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
      const s = zn(o, "location");
      if (s != null) {
        r < this.maxRedirects ? this.doDownload(Fn.prepareRedirectUrlOptions(s, t), n, r++) : n.callback(this.createMaxRedirectError());
        return;
      }
      n.responseHandler == null ? H0(n, o) : n.responseHandler(o, n.callback);
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
    const r = Yu(t, { ...n }), i = r.headers;
    if (i == null)
      return r;
    const o = Fn.reconstructOriginalUrl(n), s = Wu(t, n);
    if (Fn.isCrossOriginRedirect(o, s)) {
      Bt.enabled && Bt(`Cross-origin redirect (${o.host} → ${s.host}): stripping sensitive headers`);
      for (const a of Object.keys(i))
        zu.has(js(a)) && delete i[a];
    }
    return r;
  }
  static reconstructOriginalUrl(t) {
    const n = t.protocol || "https:";
    if (!t.hostname)
      throw new Error("Missing hostname in request options");
    const r = t.hostname, i = t.port ? `:${t.port}` : "", o = t.path || "/";
    return new ms.URL(`${n}//${r}${i}${o}`);
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
        if (r < n && (i instanceof Hs && i.isServerError() || i.code === "EPIPE")) {
          await new Promise((o) => setTimeout(o, 1e3 * (r + 1)));
          continue;
        }
        throw i;
      }
  }
}
Ne.HttpExecutor = Fn;
function Wu(e, t) {
  try {
    return new ms.URL(e);
  } catch {
    const n = t.hostname, r = t.protocol || "https:", i = t.port ? `:${t.port}` : "", o = `${r}//${n}${i}`;
    return new ms.URL(e, o);
  }
}
function Yu(e, t) {
  const n = Oi(t), r = Wu(e, t);
  return Gs(r, n), n;
}
function Gs(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class Es extends L0.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, n = "sha512", r = "base64") {
    super(), this.expected = t, this.algorithm = n, this.encoding = r, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, qu.createHash)(n);
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
      throw (0, fl.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, fl.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
Ne.DigestTransform = Es;
function j0(e, t, n) {
  return e != null && t != null && e !== t ? (n(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function zn(e, t) {
  const n = e.headers[t];
  return n == null ? null : Array.isArray(n) ? n.length === 0 ? null : n[n.length - 1] : n;
}
function H0(e, t) {
  if (!j0(zn(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const n = [];
  if (e.options.onProgress != null) {
    const s = zn(t, "content-length");
    s != null && n.push(new P0.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const r = e.options.sha512;
  r != null ? n.push(new Es(r, "sha512", r.length === 128 && !r.includes("+") && !r.includes("Z") && !r.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && n.push(new Es(e.options.sha2, "sha256", "hex"));
  const i = (0, $0.createWriteStream)(e.destination);
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
function Oi(e, t, n) {
  n != null && (e.method = n), e.headers = { ...e.headers };
  const r = e.headers;
  return t != null && (r.authorization = t.startsWith("Basic") || t.startsWith("Bearer") ? t : `token ${t}`), r["User-Agent"] == null && (r["User-Agent"] = "electron-builder"), (n == null || n === "GET" || r["Cache-Control"] == null) && (r["Cache-Control"] = "no-cache"), e.protocol == null && process.versions.electron != null && (e.protocol = "https:"), e;
}
function Xu(e) {
  const t = js(e);
  return Vu.some((n) => t.includes(n)) || F0.some((n) => t.endsWith(n));
}
function Ju(e) {
  return `${(0, qu.createHash)("sha256").update(e).digest("hex")} (sha256 hash)`;
}
function Un(e, t) {
  return JSON.stringify(e, (n, r) => Xu(n) || t != null && t.has(n) ? typeof r == "string" ? Ju(r) : "<stripped sensitive data>" : r, 2);
}
var Vi = {};
Object.defineProperty(Vi, "__esModule", { value: !0 });
Vi.MemoLazy = void 0;
class G0 {
  constructor(t, n) {
    this.selector = t, this.creator = n, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && Zu(this.selected, t))
      return this._value;
    this.selected = t;
    const n = this.creator(t);
    return this.value = n, n;
  }
  set value(t) {
    this._value = t;
  }
}
Vi.MemoLazy = G0;
function Zu(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((s) => Zu(e[s], t[s]));
  }
  return e === t;
}
var Ur = {};
Object.defineProperty(Ur, "__esModule", { value: !0 });
Ur.githubUrl = q0;
Ur.githubTagPrefix = z0;
Ur.getS3LikeProviderBaseUrl = V0;
function q0(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function z0(e) {
  var t;
  return e.tagNamePrefix ? e.tagNamePrefix : !((t = e.vPrefixedTagName) !== null && t !== void 0) || t ? "v" : "";
}
function V0(e) {
  const t = e.provider;
  if (t === "s3")
    return W0(e);
  if (t === "spaces")
    return Y0(e);
  throw new Error(`Not supported provider: ${t}`);
}
function W0(e) {
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
  return Ku(t, e.path);
}
function Ku(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function Y0(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return Ku(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var qs = {};
Object.defineProperty(qs, "__esModule", { value: !0 });
qs.retry = Qu;
const X0 = Jt;
async function Qu(e, t) {
  var n;
  const { retries: r, interval: i, backoff: o = 0, attempt: s = 0, shouldRetry: a, cancellationToken: c = new X0.CancellationToken() } = t;
  try {
    return await e();
  } catch (p) {
    if (await Promise.resolve((n = a == null ? void 0 : a(p)) !== null && n !== void 0 ? n : !0) && r > 0 && !c.cancelled)
      return await new Promise((l) => setTimeout(l, i + o * s)), await Qu(e, { ...t, retries: r - 1, attempt: s + 1 });
    throw p;
  }
}
var zs = {};
Object.defineProperty(zs, "__esModule", { value: !0 });
zs.parseDn = J0;
function J0(e) {
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
        const c = parseInt(e.slice(s, s + 2), 16);
        Number.isNaN(c) ? r += e[s] : (s++, r += String.fromCharCode(c));
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
        let c = s;
        for (; e[c] === " "; )
          c++;
        i = c;
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
const ef = Jn, tf = Kn, Z0 = "options.name must be either a string or a Buffer", dl = (0, ef.randomBytes)(16);
dl[0] = dl[0] | 1;
const Ai = {}, oe = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  Ai[t] = e, oe[e] = t;
}
class _n {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const n = _n.check(t);
    if (!n)
      throw new Error("not a UUID");
    this.version = n.version, n.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, n) {
    return K0(t, "sha1", 80, n);
  }
  toString() {
    return this.ascii == null && (this.ascii = Q0(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, n = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (Ai[t[14] + t[15]] & 240) >> 4,
        variant: hl((Ai[t[19] + t[20]] & 224) >> 5),
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
        variant: hl((t[n + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, tf.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
  }
  // read stringified uuid into a Buffer
  static parse(t) {
    const n = Buffer.allocUnsafe(16);
    let r = 0;
    for (let i = 0; i < 16; i++)
      n[i] = Ai[t[r++] + t[r++]], (i === 3 || i === 5 || i === 7 || i === 9) && (r += 1);
    return n;
  }
}
Yn.UUID = _n;
_n.OID = _n.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function hl(e) {
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
var gr;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(gr || (gr = {}));
function K0(e, t, n, r, i = gr.ASCII) {
  const o = (0, ef.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, tf.newError)(Z0, "ERR_INVALID_UUID_NAME");
  o.update(r), o.update(e);
  const a = o.digest();
  let c;
  switch (i) {
    case gr.BINARY:
      a[6] = a[6] & 15 | n, a[8] = a[8] & 63 | 128, c = a;
      break;
    case gr.OBJECT:
      a[6] = a[6] & 15 | n, a[8] = a[8] & 63 | 128, c = new _n(a);
      break;
    default:
      c = oe[a[0]] + oe[a[1]] + oe[a[2]] + oe[a[3]] + "-" + oe[a[4]] + oe[a[5]] + "-" + oe[a[6] & 15 | n] + oe[a[7]] + "-" + oe[a[8] & 63 | 128] + oe[a[9]] + "-" + oe[a[10]] + oe[a[11]] + oe[a[12]] + oe[a[13]] + oe[a[14]] + oe[a[15]];
      break;
  }
  return c;
}
function Q0(e) {
  return oe[e[0]] + oe[e[1]] + oe[e[2]] + oe[e[3]] + "-" + oe[e[4]] + oe[e[5]] + "-" + oe[e[6]] + oe[e[7]] + "-" + oe[e[8]] + oe[e[9]] + "-" + oe[e[10]] + oe[e[11]] + oe[e[12]] + oe[e[13]] + oe[e[14]] + oe[e[15]];
}
Yn.nil = new _n("00000000-0000-0000-0000-000000000000");
var kr = {}, nf = {};
(function(e) {
  (function(t) {
    t.parser = function(g, d) {
      return new r(g, d);
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
    function r(g, d) {
      if (!(this instanceof r))
        return new r(g, d);
      var D = this;
      o(D), D.q = D.c = "", D.bufferCheckPosition = t.MAX_BUFFER_LENGTH, D.encoding = null, D.opt = d || {}, D.opt.lowercase = D.opt.lowercase || D.opt.lowercasetags, D.looseCase = D.opt.lowercase ? "toLowerCase" : "toUpperCase", D.opt.maxEntityCount = D.opt.maxEntityCount || 512, D.opt.maxEntityDepth = D.opt.maxEntityDepth || 4, D.entityCount = D.entityDepth = 0, D.tags = [], D.closed = D.closedRoot = D.sawRoot = !1, D.tag = D.error = null, D.strict = !!g, D.noscript = !!(g || D.opt.noscript), D.state = A.BEGIN, D.strictEntities = D.opt.strictEntities, D.ENTITIES = D.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), D.attribList = [], D.opt.xmlns && (D.ns = Object.create(y)), D.opt.unquotedAttributeValues === void 0 && (D.opt.unquotedAttributeValues = !g), D.trackPosition = D.opt.position !== !1, D.trackPosition && (D.position = D.line = D.column = 0), K(D, "onready");
    }
    Object.create || (Object.create = function(g) {
      function d() {
      }
      d.prototype = g;
      var D = new d();
      return D;
    }), Object.keys || (Object.keys = function(g) {
      var d = [];
      for (var D in g) g.hasOwnProperty(D) && d.push(D);
      return d;
    });
    function i(g) {
      for (var d = Math.max(t.MAX_BUFFER_LENGTH, 10), D = 0, C = 0, se = n.length; C < se; C++) {
        var pe = g[n[C]].length;
        if (pe > d)
          switch (n[C]) {
            case "textNode":
              G(g);
              break;
            case "cdata":
              $(g, "oncdata", g.cdata), g.cdata = "";
              break;
            case "script":
              $(g, "onscript", g.script), g.script = "";
              break;
            default:
              q(g, "Max buffer length exceeded: " + n[C]);
          }
        D = Math.max(D, pe);
      }
      var Ae = t.MAX_BUFFER_LENGTH - D;
      g.bufferCheckPosition = Ae + g.position;
    }
    function o(g) {
      for (var d = 0, D = n.length; d < D; d++)
        g[n[d]] = "";
    }
    function s(g) {
      G(g), g.cdata !== "" && ($(g, "oncdata", g.cdata), g.cdata = ""), g.script !== "" && ($(g, "onscript", g.script), g.script = "");
    }
    r.prototype = {
      end: function() {
        W(this);
      },
      write: nn,
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
    var c = t.EVENTS.filter(function(g) {
      return g !== "error" && g !== "end";
    });
    function p(g, d) {
      return new u(g, d);
    }
    function l(g, d) {
      if (g.length >= 2) {
        if (g[0] === 255 && g[1] === 254)
          return "utf-16le";
        if (g[0] === 254 && g[1] === 255)
          return "utf-16be";
      }
      return g.length >= 3 && g[0] === 239 && g[1] === 187 && g[2] === 191 ? "utf8" : g.length >= 4 ? g[0] === 60 && g[1] === 0 && g[2] === 63 && g[3] === 0 ? "utf-16le" : g[0] === 0 && g[1] === 60 && g[2] === 0 && g[3] === 63 ? "utf-16be" : "utf8" : d ? "utf8" : null;
    }
    function u(g, d) {
      if (!(this instanceof u))
        return new u(g, d);
      a.apply(this), this._parser = new r(g, d), this.writable = !0, this.readable = !0;
      var D = this;
      this._parser.onend = function() {
        D.emit("end");
      }, this._parser.onerror = function(C) {
        D.emit("error", C), D._parser.error = null;
      }, this._decoder = null, this._decoderBuffer = null, c.forEach(function(C) {
        Object.defineProperty(D, "on" + C, {
          get: function() {
            return D._parser["on" + C];
          },
          set: function(se) {
            if (!se)
              return D.removeAllListeners(C), D._parser["on" + C] = se, se;
            D.on(C, se);
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
    }), u.prototype._decodeBuffer = function(g, d) {
      if (this._decoderBuffer && (g = Buffer.concat([this._decoderBuffer, g]), this._decoderBuffer = null), !this._decoder) {
        var D = l(g, d);
        if (!D)
          return this._decoderBuffer = g, "";
        this._parser.encoding = D, this._decoder = new TextDecoder(D);
      }
      return this._decoder.decode(g, { stream: !d });
    }, u.prototype.write = function(g) {
      if (typeof Buffer == "function" && typeof Buffer.isBuffer == "function" && Buffer.isBuffer(g))
        g = this._decodeBuffer(g, !1);
      else if (this._decoderBuffer) {
        var d = this._decodeBuffer(Buffer.alloc(0), !0);
        d && (this._parser.write(d), this.emit("data", d));
      }
      return this._parser.write(g.toString()), this.emit("data", g), !0;
    }, u.prototype.end = function(g) {
      if (g && g.length && this.write(g), this._decoderBuffer) {
        var d = this._decodeBuffer(Buffer.alloc(0), !0);
        d && (this._parser.write(d), this.emit("data", d));
      } else if (this._decoder) {
        var D = this._decoder.decode();
        D && (this._parser.write(D), this.emit("data", D));
      }
      return this._parser.end(), !0;
    }, u.prototype.on = function(g, d) {
      var D = this;
      return !D._parser["on" + g] && c.indexOf(g) !== -1 && (D._parser["on" + g] = function() {
        var C = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        C.splice(0, 0, g), D.emit.apply(D, C);
      }), a.prototype.on.call(D, g, d);
    };
    var h = /^\[CDATA\[$/i, w = /^DOCTYPE$/i, m = "http://www.w3.org/XML/1998/namespace", f = "http://www.w3.org/2000/xmlns/", y = { xml: m, xmlns: f }, _ = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, E = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, S = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function R(g) {
      return g === " " || g === `
` || g === "\r" || g === "	";
    }
    function O(g) {
      return g === '"' || g === "'";
    }
    function j(g) {
      return g === ">" || R(g);
    }
    function B(g, d) {
      return g.test(d);
    }
    function P(g, d) {
      return !B(g, d);
    }
    var A = 0;
    t.STATE = {
      BEGIN: A++,
      // leading byte order mark or whitespace
      BEGIN_WHITESPACE: A++,
      // leading whitespace
      TEXT: A++,
      // general stuff
      TEXT_ENTITY: A++,
      // &amp and such.
      OPEN_WAKA: A++,
      // <
      SGML_DECL: A++,
      // <!BLARG
      SGML_DECL_QUOTED: A++,
      // <!BLARG foo "bar
      DOCTYPE: A++,
      // <!DOCTYPE
      DOCTYPE_QUOTED: A++,
      // <!DOCTYPE "//blah
      DOCTYPE_DTD: A++,
      // <!DOCTYPE "//blah" [ ...
      DOCTYPE_DTD_QUOTED: A++,
      // <!DOCTYPE "//blah" [ "foo
      COMMENT_STARTING: A++,
      // <!-
      COMMENT: A++,
      // <!--
      COMMENT_ENDING: A++,
      // <!-- blah -
      COMMENT_ENDED: A++,
      // <!-- blah --
      CDATA: A++,
      // <![CDATA[ something
      CDATA_ENDING: A++,
      // ]
      CDATA_ENDING_2: A++,
      // ]]
      PROC_INST: A++,
      // <?hi
      PROC_INST_BODY: A++,
      // <?hi there
      PROC_INST_ENDING: A++,
      // <?hi "there" ?
      OPEN_TAG: A++,
      // <strong
      OPEN_TAG_SLASH: A++,
      // <strong /
      ATTRIB: A++,
      // <a
      ATTRIB_NAME: A++,
      // <a foo
      ATTRIB_NAME_SAW_WHITE: A++,
      // <a foo _
      ATTRIB_VALUE: A++,
      // <a foo=
      ATTRIB_VALUE_QUOTED: A++,
      // <a foo="bar
      ATTRIB_VALUE_CLOSED: A++,
      // <a foo="bar"
      ATTRIB_VALUE_UNQUOTED: A++,
      // <a foo=bar
      ATTRIB_VALUE_ENTITY_Q: A++,
      // <foo bar="&quot;"
      ATTRIB_VALUE_ENTITY_U: A++,
      // <foo bar=&quot
      CLOSE_TAG: A++,
      // </a
      CLOSE_TAG_SAW_WHITE: A++,
      // </a   >
      SCRIPT: A++,
      // <script> ...
      SCRIPT_ENDING: A++
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
    }), Object.keys(t.ENTITIES).forEach(function(g) {
      var d = t.ENTITIES[g], D = typeof d == "number" ? String.fromCharCode(d) : d;
      t.ENTITIES[g] = D;
    });
    for (var Y in t.STATE)
      t.STATE[t.STATE[Y]] = Y;
    A = t.STATE;
    function K(g, d, D) {
      g[d] && g[d](D);
    }
    function te(g) {
      var d = g && g.match(/(?:^|\s)encoding\s*=\s*(['"])([^'"]+)\1/i);
      return d ? d[2] : null;
    }
    function F(g) {
      return g ? g.toLowerCase().replace(/[^a-z0-9]/g, "") : null;
    }
    function b(g, d) {
      const D = F(g), C = F(d);
      return !D || !C ? !0 : C === "utf16" ? D === "utf16le" || D === "utf16be" : D === C;
    }
    function M(g, d) {
      if (!(!g.strict || !g.encoding || !d || d.name !== "xml")) {
        var D = te(d.body);
        D && !b(g.encoding, D) && U(
          g,
          "XML declaration encoding " + D + " does not match detected stream encoding " + g.encoding.toUpperCase()
        );
      }
    }
    function $(g, d, D) {
      g.textNode && G(g), K(g, d, D);
    }
    function G(g) {
      g.textNode = N(g.opt, g.textNode), g.textNode && K(g, "ontext", g.textNode), g.textNode = "";
    }
    function N(g, d) {
      return g.trim && (d = d.trim()), g.normalize && (d = d.replace(/\s+/g, " ")), d;
    }
    function q(g, d) {
      return G(g), g.trackPosition && (d += `
Line: ` + g.line + `
Column: ` + g.column + `
Char: ` + g.c), d = new Error(d), g.error = d, K(g, "onerror", d), g;
    }
    function W(g) {
      return g.sawRoot && !g.closedRoot && U(g, "Unclosed root tag"), g.state !== A.BEGIN && g.state !== A.BEGIN_WHITESPACE && g.state !== A.TEXT && q(g, "Unexpected end"), G(g), g.c = "", g.closed = !0, K(g, "onend"), r.call(g, g.strict, g.opt), g;
    }
    function U(g, d) {
      if (typeof g != "object" || !(g instanceof r))
        throw new Error("bad call to strictFail");
      g.strict && q(g, d);
    }
    function Q(g) {
      g.strict || (g.tagName = g.tagName[g.looseCase]());
      var d = g.tags[g.tags.length - 1] || g, D = g.tag = { name: g.tagName, attributes: {} };
      g.opt.xmlns && (D.ns = d.ns), g.attribList.length = 0, $(g, "onopentagstart", D);
    }
    function re(g, d) {
      var D = g.indexOf(":"), C = D < 0 ? ["", g] : g.split(":"), se = C[0], pe = C[1];
      return d && g === "xmlns" && (se = "xmlns", pe = ""), { prefix: se, local: pe };
    }
    function V(g) {
      if (g.strict || (g.attribName = g.attribName[g.looseCase]()), g.attribList.indexOf(g.attribName) !== -1 || g.tag.attributes.hasOwnProperty(g.attribName)) {
        g.attribName = g.attribValue = "";
        return;
      }
      if (g.opt.xmlns) {
        var d = re(g.attribName, !0), D = d.prefix, C = d.local;
        if (D === "xmlns")
          if (C === "xml" && g.attribValue !== m)
            U(
              g,
              "xml: prefix must be bound to " + m + `
Actual: ` + g.attribValue
            );
          else if (C === "xmlns" && g.attribValue !== f)
            U(
              g,
              "xmlns: prefix must be bound to " + f + `
Actual: ` + g.attribValue
            );
          else {
            var se = g.tag, pe = g.tags[g.tags.length - 1] || g;
            se.ns === pe.ns && (se.ns = Object.create(pe.ns)), se.ns[C] = g.attribValue;
          }
        g.attribList.push([g.attribName, g.attribValue]);
      } else
        g.tag.attributes[g.attribName] = g.attribValue, $(g, "onattribute", {
          name: g.attribName,
          value: g.attribValue
        });
      g.attribName = g.attribValue = "";
    }
    function ie(g, d) {
      if (g.opt.xmlns) {
        var D = g.tag, C = re(g.tagName);
        D.prefix = C.prefix, D.local = C.local, D.uri = D.ns[C.prefix] || "", D.prefix && !D.uri && (U(
          g,
          "Unbound namespace prefix: " + JSON.stringify(g.tagName)
        ), D.uri = C.prefix);
        var se = g.tags[g.tags.length - 1] || g;
        D.ns && se.ns !== D.ns && Object.keys(D.ns).forEach(function(In) {
          $(g, "onopennamespace", {
            prefix: In,
            uri: D.ns[In]
          });
        });
        for (var pe = 0, Ae = g.attribList.length; pe < Ae; pe++) {
          var Ue = g.attribList[pe], ke = Ue[0], ut = Ue[1], De = re(ke, !0), ft = De.prefix, yo = De.local, Yr = ft === "" ? "" : D.ns[ft] || "", Pt = {
            name: ke,
            value: ut,
            prefix: ft,
            local: yo,
            uri: Yr
          };
          ft && ft !== "xmlns" && !Yr && (U(
            g,
            "Unbound namespace prefix: " + JSON.stringify(ft)
          ), Pt.uri = ft), g.tag.attributes[ke] = Pt, $(g, "onattribute", Pt);
        }
        g.attribList.length = 0;
      }
      g.tag.isSelfClosing = !!d, g.sawRoot = !0, g.tags.push(g.tag), $(g, "onopentag", g.tag), d || (!g.noscript && g.tagName.toLowerCase() === "script" ? g.state = A.SCRIPT : g.state = A.TEXT, g.tag = null, g.tagName = ""), g.attribName = g.attribValue = "", g.attribList.length = 0;
    }
    function Se(g) {
      if (!g.tagName) {
        U(g, "Weird empty close tag."), g.textNode += "</>", g.state = A.TEXT;
        return;
      }
      if (g.script) {
        if (g.tagName !== "script") {
          g.script += "</" + g.tagName + ">", g.tagName = "", g.state = A.SCRIPT;
          return;
        }
        $(g, "onscript", g.script), g.script = "";
      }
      var d = g.tags.length, D = g.tagName;
      g.strict || (D = D[g.looseCase]());
      for (var C = D; d--; ) {
        var se = g.tags[d];
        if (se.name !== C)
          U(g, "Unexpected close tag");
        else
          break;
      }
      if (d < 0) {
        U(g, "Unmatched closing tag: " + g.tagName), g.textNode += "</" + g.tagName + ">", g.state = A.TEXT;
        return;
      }
      g.tagName = D;
      for (var pe = g.tags.length; pe-- > d; ) {
        var Ae = g.tag = g.tags.pop();
        g.tagName = g.tag.name, $(g, "onclosetag", g.tagName);
        var Ue = {};
        for (var ke in Ae.ns)
          Ue[ke] = Ae.ns[ke];
        var ut = g.tags[g.tags.length - 1] || g;
        g.opt.xmlns && Ae.ns !== ut.ns && Object.keys(Ae.ns).forEach(function(De) {
          var ft = Ae.ns[De];
          $(g, "onclosenamespace", { prefix: De, uri: ft });
        });
      }
      d === 0 && (g.closedRoot = !0), g.tagName = g.attribValue = g.attribName = "", g.attribList.length = 0, g.state = A.TEXT;
    }
    function le(g) {
      var d = g.entity, D = d.toLowerCase(), C, se = "";
      return g.ENTITIES[d] ? g.ENTITIES[d] : g.ENTITIES[D] ? g.ENTITIES[D] : (d = D, d.charAt(0) === "#" && (d.charAt(1) === "x" ? (d = d.slice(2), C = parseInt(d, 16), se = C.toString(16)) : (d = d.slice(1), C = parseInt(d, 10), se = C.toString(10))), d = d.replace(/^0+/, ""), isNaN(C) || se.toLowerCase() !== d || C < 0 || C > 1114111 || !ct(C) ? (U(g, "Invalid character entity"), "&" + g.entity + ";") : String.fromCodePoint(C));
    }
    function ct(g) {
      return g === 9 || g === 10 || g === 13 || g >= 32 && g <= 55295 || g >= 57344 && g <= 65533 || g >= 65536 && g <= 1114111;
    }
    function It(g, d) {
      d === "<" ? (g.state = A.OPEN_WAKA, g.startTagPosition = g.position) : R(d) || (U(g, "Non-whitespace before first tag."), g.textNode = d, g.state = A.TEXT);
    }
    function et(g, d) {
      var D = "";
      return d < g.length && (D = g.charAt(d)), D;
    }
    function nn(g) {
      var d = this;
      if (this.error)
        throw this.error;
      if (d.closed)
        return q(
          d,
          "Cannot write after close. Assign an onready handler."
        );
      if (g === null)
        return W(d);
      typeof g == "object" && (g = g.toString());
      for (var D = 0, C = ""; C = et(g, D++), d.c = C, !!C; )
        switch (d.trackPosition && (d.position++, C === `
` ? (d.line++, d.column = 0) : d.column++), d.state) {
          case A.BEGIN:
            if (d.state = A.BEGIN_WHITESPACE, C === "\uFEFF")
              continue;
            It(d, C);
            continue;
          case A.BEGIN_WHITESPACE:
            It(d, C);
            continue;
          case A.TEXT:
            if (d.sawRoot && !d.closedRoot) {
              for (var pe = D - 1; C && C !== "<" && C !== "&"; )
                C = et(g, D++), C && d.trackPosition && (d.position++, C === `
` ? (d.line++, d.column = 0) : d.column++);
              d.textNode += g.substring(pe, D - 1);
            }
            C === "<" && !(d.sawRoot && d.closedRoot && !d.strict) ? (d.state = A.OPEN_WAKA, d.startTagPosition = d.position) : (!R(C) && (!d.sawRoot || d.closedRoot) && U(d, "Text data outside of root node."), C === "&" ? d.state = A.TEXT_ENTITY : d.textNode += C);
            continue;
          case A.SCRIPT:
            C === "<" ? d.state = A.SCRIPT_ENDING : d.script += C;
            continue;
          case A.SCRIPT_ENDING:
            C === "/" ? d.state = A.CLOSE_TAG : (d.script += "<" + C, d.state = A.SCRIPT);
            continue;
          case A.OPEN_WAKA:
            if (C === "!")
              d.state = A.SGML_DECL, d.sgmlDecl = "";
            else if (!R(C)) if (B(_, C))
              d.state = A.OPEN_TAG, d.tagName = C;
            else if (C === "/")
              d.state = A.CLOSE_TAG, d.tagName = "";
            else if (C === "?")
              d.state = A.PROC_INST, d.procInstName = d.procInstBody = "";
            else {
              if (U(d, "Unencoded <"), d.startTagPosition + 1 < d.position) {
                var se = d.position - d.startTagPosition;
                C = new Array(se).join(" ") + C;
              }
              d.textNode += "<" + C, d.state = A.TEXT;
            }
            continue;
          case A.SGML_DECL:
            if (d.sgmlDecl + C === "--") {
              d.state = A.COMMENT, d.comment = "", d.sgmlDecl = "";
              continue;
            }
            d.doctype && d.doctype !== !0 && d.sgmlDecl ? (d.state = A.DOCTYPE_DTD, d.doctype += "<!" + d.sgmlDecl + C, d.sgmlDecl = "") : h.test(d.sgmlDecl + C) ? ($(d, "onopencdata"), d.state = A.CDATA, d.sgmlDecl = "", d.cdata = "") : w.test(d.sgmlDecl + C) ? (d.state = A.DOCTYPE, (d.doctype || d.sawRoot) && U(
              d,
              "Inappropriately located doctype declaration"
            ), d.doctype = "", d.sgmlDecl = "") : C === ">" ? ($(d, "onsgmldeclaration", d.sgmlDecl), d.sgmlDecl = "", d.state = A.TEXT) : (O(C) && (d.state = A.SGML_DECL_QUOTED), d.sgmlDecl += C);
            continue;
          case A.SGML_DECL_QUOTED:
            C === d.q && (d.state = A.SGML_DECL, d.q = ""), d.sgmlDecl += C;
            continue;
          case A.DOCTYPE:
            C === ">" ? (d.state = A.TEXT, $(d, "ondoctype", d.doctype), d.doctype = !0) : (d.doctype += C, C === "[" ? d.state = A.DOCTYPE_DTD : O(C) && (d.state = A.DOCTYPE_QUOTED, d.q = C));
            continue;
          case A.DOCTYPE_QUOTED:
            d.doctype += C, C === d.q && (d.q = "", d.state = A.DOCTYPE);
            continue;
          case A.DOCTYPE_DTD:
            C === "]" ? (d.doctype += C, d.state = A.DOCTYPE) : C === "<" ? (d.state = A.OPEN_WAKA, d.startTagPosition = d.position) : O(C) ? (d.doctype += C, d.state = A.DOCTYPE_DTD_QUOTED, d.q = C) : d.doctype += C;
            continue;
          case A.DOCTYPE_DTD_QUOTED:
            d.doctype += C, C === d.q && (d.state = A.DOCTYPE_DTD, d.q = "");
            continue;
          case A.COMMENT:
            C === "-" ? d.state = A.COMMENT_ENDING : d.comment += C;
            continue;
          case A.COMMENT_ENDING:
            C === "-" ? (d.state = A.COMMENT_ENDED, d.comment = N(d.opt, d.comment), d.comment && $(d, "oncomment", d.comment), d.comment = "") : (d.comment += "-" + C, d.state = A.COMMENT);
            continue;
          case A.COMMENT_ENDED:
            C !== ">" ? (U(d, "Malformed comment"), d.comment += "--" + C, d.state = A.COMMENT) : d.doctype && d.doctype !== !0 ? d.state = A.DOCTYPE_DTD : d.state = A.TEXT;
            continue;
          case A.CDATA:
            for (var pe = D - 1; C && C !== "]"; )
              C = et(g, D++), C && d.trackPosition && (d.position++, C === `
` ? (d.line++, d.column = 0) : d.column++);
            d.cdata += g.substring(pe, D - 1), C === "]" && (d.state = A.CDATA_ENDING);
            continue;
          case A.CDATA_ENDING:
            C === "]" ? d.state = A.CDATA_ENDING_2 : (d.cdata += "]" + C, d.state = A.CDATA);
            continue;
          case A.CDATA_ENDING_2:
            C === ">" ? (d.cdata && $(d, "oncdata", d.cdata), $(d, "onclosecdata"), d.cdata = "", d.state = A.TEXT) : C === "]" ? d.cdata += "]" : (d.cdata += "]]" + C, d.state = A.CDATA);
            continue;
          case A.PROC_INST:
            C === "?" ? d.state = A.PROC_INST_ENDING : R(C) ? d.state = A.PROC_INST_BODY : d.procInstName += C;
            continue;
          case A.PROC_INST_BODY:
            if (!d.procInstBody && R(C))
              continue;
            C === "?" ? d.state = A.PROC_INST_ENDING : d.procInstBody += C;
            continue;
          case A.PROC_INST_ENDING:
            if (C === ">") {
              const ut = {
                name: d.procInstName,
                body: d.procInstBody
              };
              M(d, ut), $(d, "onprocessinginstruction", ut), d.procInstName = d.procInstBody = "", d.state = A.TEXT;
            } else
              d.procInstBody += "?" + C, d.state = A.PROC_INST_BODY;
            continue;
          case A.OPEN_TAG:
            B(E, C) ? d.tagName += C : (Q(d), C === ">" ? ie(d) : C === "/" ? d.state = A.OPEN_TAG_SLASH : (R(C) || U(d, "Invalid character in tag name"), d.state = A.ATTRIB));
            continue;
          case A.OPEN_TAG_SLASH:
            C === ">" ? (ie(d, !0), Se(d)) : (U(
              d,
              "Forward-slash in opening tag not followed by >"
            ), d.state = A.ATTRIB);
            continue;
          case A.ATTRIB:
            if (R(C))
              continue;
            C === ">" ? ie(d) : C === "/" ? d.state = A.OPEN_TAG_SLASH : B(_, C) ? (d.attribName = C, d.attribValue = "", d.state = A.ATTRIB_NAME) : U(d, "Invalid attribute name");
            continue;
          case A.ATTRIB_NAME:
            C === "=" ? d.state = A.ATTRIB_VALUE : C === ">" ? (U(d, "Attribute without value"), d.attribValue = d.attribName, V(d), ie(d)) : R(C) ? d.state = A.ATTRIB_NAME_SAW_WHITE : B(E, C) ? d.attribName += C : U(d, "Invalid attribute name");
            continue;
          case A.ATTRIB_NAME_SAW_WHITE:
            if (C === "=")
              d.state = A.ATTRIB_VALUE;
            else {
              if (R(C))
                continue;
              U(d, "Attribute without value"), d.tag.attributes[d.attribName] = "", d.attribValue = "", $(d, "onattribute", {
                name: d.attribName,
                value: ""
              }), d.attribName = "", C === ">" ? ie(d) : B(_, C) ? (d.attribName = C, d.state = A.ATTRIB_NAME) : (U(d, "Invalid attribute name"), d.state = A.ATTRIB);
            }
            continue;
          case A.ATTRIB_VALUE:
            if (R(C))
              continue;
            O(C) ? (d.q = C, d.state = A.ATTRIB_VALUE_QUOTED) : (d.opt.unquotedAttributeValues || q(d, "Unquoted attribute value"), d.state = A.ATTRIB_VALUE_UNQUOTED, d.attribValue = C);
            continue;
          case A.ATTRIB_VALUE_QUOTED:
            if (C !== d.q) {
              C === "&" ? d.state = A.ATTRIB_VALUE_ENTITY_Q : d.attribValue += C;
              continue;
            }
            V(d), d.q = "", d.state = A.ATTRIB_VALUE_CLOSED;
            continue;
          case A.ATTRIB_VALUE_CLOSED:
            R(C) ? d.state = A.ATTRIB : C === ">" ? ie(d) : C === "/" ? d.state = A.OPEN_TAG_SLASH : B(_, C) ? (U(d, "No whitespace between attributes"), d.attribName = C, d.attribValue = "", d.state = A.ATTRIB_NAME) : U(d, "Invalid attribute name");
            continue;
          case A.ATTRIB_VALUE_UNQUOTED:
            if (!j(C)) {
              C === "&" ? d.state = A.ATTRIB_VALUE_ENTITY_U : d.attribValue += C;
              continue;
            }
            V(d), C === ">" ? ie(d) : d.state = A.ATTRIB;
            continue;
          case A.CLOSE_TAG:
            if (d.tagName)
              C === ">" ? Se(d) : B(E, C) ? d.tagName += C : d.script ? (d.script += "</" + d.tagName + C, d.tagName = "", d.state = A.SCRIPT) : (R(C) || U(d, "Invalid tagname in closing tag"), d.state = A.CLOSE_TAG_SAW_WHITE);
            else {
              if (R(C))
                continue;
              P(_, C) ? d.script ? (d.script += "</" + C, d.state = A.SCRIPT) : U(d, "Invalid tagname in closing tag.") : d.tagName = C;
            }
            continue;
          case A.CLOSE_TAG_SAW_WHITE:
            if (R(C))
              continue;
            C === ">" ? Se(d) : U(d, "Invalid characters in closing tag");
            continue;
          case A.TEXT_ENTITY:
          case A.ATTRIB_VALUE_ENTITY_Q:
          case A.ATTRIB_VALUE_ENTITY_U:
            var Ae, Ue;
            switch (d.state) {
              case A.TEXT_ENTITY:
                Ae = A.TEXT, Ue = "textNode";
                break;
              case A.ATTRIB_VALUE_ENTITY_Q:
                Ae = A.ATTRIB_VALUE_QUOTED, Ue = "attribValue";
                break;
              case A.ATTRIB_VALUE_ENTITY_U:
                Ae = A.ATTRIB_VALUE_UNQUOTED, Ue = "attribValue";
                break;
            }
            if (C === ";") {
              var ke = le(d);
              d.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(ke) ? ((d.entityCount += 1) > d.opt.maxEntityCount && q(
                d,
                "Parsed entity count exceeds max entity count"
              ), (d.entityDepth += 1) > d.opt.maxEntityDepth && q(
                d,
                "Parsed entity depth exceeds max entity depth"
              ), d.entity = "", d.state = Ae, d.write(ke), d.entityDepth -= 1) : (d[Ue] += ke, d.entity = "", d.state = Ae);
            } else B(d.entity.length ? T : S, C) ? d.entity += C : (U(d, "Invalid character in entity name"), d[Ue] += "&" + d.entity + C, d.entity = "", d.state = Ae);
            continue;
          default:
            throw new Error(d, "Unknown state: " + d.state);
        }
      return d.position >= d.bufferCheckPosition && i(d), d;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var g = String.fromCharCode, d = Math.floor, D = function() {
        var C = 16384, se = [], pe, Ae, Ue = -1, ke = arguments.length;
        if (!ke)
          return "";
        for (var ut = ""; ++Ue < ke; ) {
          var De = Number(arguments[Ue]);
          if (!isFinite(De) || // `NaN`, `+Infinity`, or `-Infinity`
          De < 0 || // not a valid Unicode code point
          De > 1114111 || // not a valid Unicode code point
          d(De) !== De)
            throw RangeError("Invalid code point: " + De);
          De <= 65535 ? se.push(De) : (De -= 65536, pe = (De >> 10) + 55296, Ae = De % 1024 + 56320, se.push(pe, Ae)), (Ue + 1 === ke || se.length > C) && (ut += g.apply(null, se), se.length = 0);
        }
        return ut;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: D,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = D;
    }();
  })(e);
})(nf);
Object.defineProperty(kr, "__esModule", { value: !0 });
kr.XElement = void 0;
kr.parseXml = rg;
const eg = nf, ai = Kn;
class rf {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, ai.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!ng(t))
      throw (0, ai.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const n = this.attributes === null ? null : this.attributes[t];
    if (n == null)
      throw (0, ai.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return n;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, n = !1, r = null) {
    const i = this.elementOrNull(t, n);
    if (i === null)
      throw (0, ai.newError)(r || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, n = !1) {
    if (this.elements === null)
      return null;
    for (const r of this.elements)
      if (pl(r, t, n))
        return r;
    return null;
  }
  getElements(t, n = !1) {
    return this.elements === null ? [] : this.elements.filter((r) => pl(r, t, n));
  }
  elementValueOrEmpty(t, n = !1) {
    const r = this.elementOrNull(t, n);
    return r === null ? "" : r.value;
  }
}
kr.XElement = rf;
const tg = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function ng(e) {
  return tg.test(e);
}
function pl(e, t, n) {
  const r = e.name;
  return r === t || n === !0 && r.length === t.length && r.toLowerCase() === t.toLowerCase();
}
function rg(e) {
  let t = null;
  const n = eg.parser(!0, {}), r = [];
  return n.onopentag = (i) => {
    const o = new rf(i.name);
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
var Tn = {};
Object.defineProperty(Tn, "__esModule", { value: !0 });
Tn.mapToObject = of;
Tn.isValidKey = Wi;
Tn.asArray = ig;
Tn.deepAssign = sg;
Tn.objectToArgs = cg;
function of(e) {
  const t = {};
  for (const [n, r] of e)
    Wi(n) && (r instanceof Map ? t[n] = of(r) : t[n] = r);
  return t;
}
function Wi(e) {
  return ["__proto__", "prototype", "constructor"].includes(e) ? !1 : ["string", "number", "symbol", "boolean"].includes(typeof e) || e === null;
}
function ig(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function ml(e) {
  if (Array.isArray(e))
    return !1;
  const t = typeof e;
  return t === "object" || t === "function";
}
function og(e, t, n) {
  const r = t[n];
  if (r === void 0)
    return;
  const i = e[n];
  i == null || r == null || !ml(i) || !ml(r) ? Array.isArray(i) && Array.isArray(r) ? e[n] = Array.from(new Set(i.concat(r))) : e[n] = r : e[n] = sf(i, r);
}
function sf(e, t) {
  if (e !== t)
    for (const n of Object.getOwnPropertyNames(t))
      Wi(n) && og(e, t, n);
  return e;
}
function sg(e, ...t) {
  for (const n of t)
    n != null && sf(e, n);
  return e;
}
const ag = /^[a-zA-Z][a-zA-Z0-9-]*$/, lg = /[\0\r\n]/;
function cg(e) {
  const t = Object.entries(e).reduce((n, [r, i]) => {
    if (!Wi(r) || i == null)
      return n;
    if (!ag.test(r))
      throw new Error(`objectToArgs: unsafe flag name rejected: ${JSON.stringify(r)}`);
    if (lg.test(i))
      throw new Error(`objectToArgs: value for --${r} contains a null byte or newline`);
    return n.concat([`--${r}`, i]);
  }, []);
  return Object.freeze(t);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.objectToArgs = e.deepAssign = e.asArray = e.mapToObject = e.isValidKey = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubTagPrefix = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.isSensitiveFieldName = e.HttpExecutor = e.hashSensitiveValue = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0;
  var t = Jt;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var n = Kn;
  Object.defineProperty(e, "newError", { enumerable: !0, get: function() {
    return n.newError;
  } });
  var r = Ne;
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
  var i = Vi;
  Object.defineProperty(e, "MemoLazy", { enumerable: !0, get: function() {
    return i.MemoLazy;
  } });
  var o = Fr;
  Object.defineProperty(e, "ProgressCallbackTransform", { enumerable: !0, get: function() {
    return o.ProgressCallbackTransform;
  } });
  var s = Ur;
  Object.defineProperty(e, "getS3LikeProviderBaseUrl", { enumerable: !0, get: function() {
    return s.getS3LikeProviderBaseUrl;
  } }), Object.defineProperty(e, "githubUrl", { enumerable: !0, get: function() {
    return s.githubUrl;
  } }), Object.defineProperty(e, "githubTagPrefix", { enumerable: !0, get: function() {
    return s.githubTagPrefix;
  } });
  var a = qs;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return a.retry;
  } });
  var c = zs;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return c.parseDn;
  } });
  var p = Yn;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return p.UUID;
  } });
  var l = kr;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return l.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return l.XElement;
  } });
  var u = Tn;
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
})(Oe);
var Fe = {}, Vs = {}, mt = {};
function af(e) {
  return typeof e > "u" || e === null;
}
function ug(e) {
  return typeof e == "object" && e !== null;
}
function fg(e) {
  return Array.isArray(e) ? e : af(e) ? [] : [e];
}
function dg(e, t) {
  if (t) {
    const n = Object.keys(t);
    for (let r = 0, i = n.length; r < i; r += 1) {
      const o = n[r];
      e[o] = t[o];
    }
  }
  return e;
}
function hg(e, t) {
  let n = "";
  for (let r = 0; r < t; r += 1)
    n += e;
  return n;
}
function pg(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
mt.isNothing = af;
mt.isObject = ug;
mt.toArray = fg;
mt.repeat = hg;
mt.isNegativeZero = pg;
mt.extend = dg;
function lf(e, t) {
  let n = "";
  const r = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (n += 'in "' + e.mark.name + '" '), n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (n += `

` + e.mark.snippet), r + " " + n) : r;
}
function Ar(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = lf(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Ar.prototype = Object.create(Error.prototype);
Ar.prototype.constructor = Ar;
Ar.prototype.toString = function(t) {
  return this.name + ": " + lf(this, t);
};
var Mr = Ar;
const fr = mt;
function Lo(e, t, n, r, i) {
  let o = "", s = "";
  const a = Math.floor(i / 2) - 1;
  return r - t > a && (o = " ... ", t = r - a + o.length), n - r > a && (s = " ...", n = r + a - s.length), {
    str: o + e.slice(t, n).replace(/\t/g, "→") + s,
    pos: r - t + o.length
    // relative position
  };
}
function xo(e, t) {
  return fr.repeat(" ", t - e.length) + e;
}
function mg(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  const n = /\r?\n|\r|\0/g, r = [0], i = [];
  let o, s = -1;
  for (; o = n.exec(e.buffer); )
    i.push(o.index), r.push(o.index + o[0].length), e.position <= o.index && s < 0 && (s = r.length - 2);
  s < 0 && (s = r.length - 1);
  let a = "";
  const c = Math.min(e.line + t.linesAfter, i.length).toString().length, p = t.maxLength - (t.indent + c + 3);
  for (let u = 1; u <= t.linesBefore && !(s - u < 0); u++) {
    const h = Lo(
      e.buffer,
      r[s - u],
      i[s - u],
      e.position - (r[s] - r[s - u]),
      p
    );
    a = fr.repeat(" ", t.indent) + xo((e.line - u + 1).toString(), c) + " | " + h.str + `
` + a;
  }
  const l = Lo(e.buffer, r[s], i[s], e.position, p);
  a += fr.repeat(" ", t.indent) + xo((e.line + 1).toString(), c) + " | " + l.str + `
`, a += fr.repeat("-", t.indent + c + 3 + l.pos) + `^
`;
  for (let u = 1; u <= t.linesAfter && !(s + u >= i.length); u++) {
    const h = Lo(
      e.buffer,
      r[s + u],
      i[s + u],
      e.position - (r[s] - r[s + u]),
      p
    );
    a += fr.repeat(" ", t.indent) + xo((e.line + u + 1).toString(), c) + " | " + h.str + `
`;
  }
  return a.replace(/\n$/, "");
}
var gg = mg;
const gl = Mr, Eg = [
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
], yg = [
  "scalar",
  "sequence",
  "mapping"
];
function wg(e) {
  const t = {};
  return e !== null && Object.keys(e).forEach(function(n) {
    e[n].forEach(function(r) {
      t[String(r)] = n;
    });
  }), t;
}
function _g(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(n) {
    if (Eg.indexOf(n) === -1)
      throw new gl('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(n) {
    return n;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = wg(t.styleAliases || null), yg.indexOf(this.kind) === -1)
    throw new gl('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var Je = _g;
const ar = Mr, Po = Je;
function El(e, t) {
  const n = [];
  return e[t].forEach(function(r) {
    let i = n.length;
    n.forEach(function(o, s) {
      o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (i = s);
    }), n[i] = r;
  }), n;
}
function vg() {
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
function ys(e) {
  return this.extend(e);
}
ys.prototype.extend = function(t) {
  let n = [], r = [];
  if (t instanceof Po)
    r.push(t);
  else if (Array.isArray(t))
    r = r.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (n = n.concat(t.implicit)), t.explicit && (r = r.concat(t.explicit));
  else
    throw new ar("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  n.forEach(function(o) {
    if (!(o instanceof Po))
      throw new ar("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new ar("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new ar("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(o) {
    if (!(o instanceof Po))
      throw new ar("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  const i = Object.create(ys.prototype);
  return i.implicit = (this.implicit || []).concat(n), i.explicit = (this.explicit || []).concat(r), i.compiledImplicit = El(i, "implicit"), i.compiledExplicit = El(i, "explicit"), i.compiledTypeMap = vg(i.compiledImplicit, i.compiledExplicit), i;
};
var cf = ys;
const Sg = Je;
var uf = new Sg("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
});
const Ag = Je;
var ff = new Ag("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
});
const Tg = Je;
var df = new Tg("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
});
const Cg = cf;
var hf = new Cg({
  explicit: [
    uf,
    ff,
    df
  ]
});
const Ig = Je;
function Dg(e) {
  if (e === null) return !0;
  const t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function Ng() {
  return null;
}
function Og(e) {
  return e === null;
}
var pf = new Ig("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Dg,
  construct: Ng,
  predicate: Og,
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
const bg = Je;
function Rg(e) {
  if (e === null) return !1;
  const t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function $g(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Lg(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var mf = new bg("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Rg,
  construct: $g,
  predicate: Lg,
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
const xg = mt, Pg = Je;
function Fg(e) {
  return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function Ug(e) {
  return e >= 48 && e <= 55;
}
function kg(e) {
  return e >= 48 && e <= 57;
}
function Mg(e) {
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
        if (!Fg(e.charCodeAt(n))) return !1;
        r = !0;
      }
      return r && isFinite(dr(e));
    }
    if (i === "o") {
      for (n++; n < t; n++) {
        if (!Ug(e.charCodeAt(n))) return !1;
        r = !0;
      }
      return r && isFinite(dr(e));
    }
  }
  for (; n < t; n++) {
    if (!kg(e.charCodeAt(n)))
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
function Bg(e) {
  return dr(e);
}
function jg(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !xg.isNegativeZero(e);
}
var gf = new Pg("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Mg,
  construct: Bg,
  predicate: jg,
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
const Ef = mt, Hg = Je, Gg = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
), qg = new RegExp(
  "^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function zg(e) {
  return e === null || !Gg.test(e) ? !1 : isFinite(parseFloat(e, 10)) ? !0 : qg.test(e);
}
function Vg(e) {
  let t = e.toLowerCase();
  const n = t[0] === "-" ? -1 : 1;
  return "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : n * parseFloat(t, 10);
}
const Wg = /^[-+]?[0-9]+e/;
function Yg(e, t) {
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
  else if (Ef.isNegativeZero(e))
    return "-0.0";
  const n = e.toString(10);
  return Wg.test(n) ? n.replace("e", ".e") : n;
}
function Xg(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || Ef.isNegativeZero(e));
}
var yf = new Hg("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: zg,
  construct: Vg,
  predicate: Xg,
  represent: Yg,
  defaultStyle: "lowercase"
}), wf = hf.extend({
  implicit: [
    pf,
    mf,
    gf,
    yf
  ]
}), _f = wf;
const Jg = Je, vf = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Sf = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Zg(e) {
  return e === null ? !1 : vf.exec(e) !== null || Sf.exec(e) !== null;
}
function Kg(e) {
  let t = 0, n = null, r = vf.exec(e);
  if (r === null && (r = Sf.exec(e)), r === null) throw new Error("Date resolve error");
  const i = +r[1], o = +r[2] - 1, s = +r[3];
  if (!r[4])
    return new Date(Date.UTC(i, o, s));
  const a = +r[4], c = +r[5], p = +r[6];
  if (r[7]) {
    for (t = r[7].slice(0, 3); t.length < 3; )
      t += "0";
    t = +t;
  }
  if (r[9]) {
    const u = +r[10], h = +(r[11] || 0);
    n = (u * 60 + h) * 6e4, r[9] === "-" && (n = -n);
  }
  const l = new Date(Date.UTC(i, o, s, a, c, p, t));
  return n && l.setTime(l.getTime() - n), l;
}
function Qg(e) {
  return e.toISOString();
}
var Af = new Jg("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Zg,
  construct: Kg,
  instanceOf: Date,
  represent: Qg
});
const eE = Je;
function tE(e) {
  return e === "<<" || e === null;
}
var Tf = new eE("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: tE
});
const nE = Je, Ws = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function rE(e) {
  if (e === null) return !1;
  let t = 0;
  const n = e.length, r = Ws;
  for (let i = 0; i < n; i++) {
    const o = r.indexOf(e.charAt(i));
    if (!(o > 64)) {
      if (o < 0) return !1;
      t += 6;
    }
  }
  return t % 8 === 0;
}
function iE(e) {
  const t = e.replace(/[\r\n=]/g, ""), n = t.length, r = Ws;
  let i = 0;
  const o = [];
  for (let a = 0; a < n; a++)
    a % 4 === 0 && a && (o.push(i >> 16 & 255), o.push(i >> 8 & 255), o.push(i & 255)), i = i << 6 | r.indexOf(t.charAt(a));
  const s = n % 4 * 6;
  return s === 0 ? (o.push(i >> 16 & 255), o.push(i >> 8 & 255), o.push(i & 255)) : s === 18 ? (o.push(i >> 10 & 255), o.push(i >> 2 & 255)) : s === 12 && o.push(i >> 4 & 255), new Uint8Array(o);
}
function oE(e) {
  let t = "", n = 0;
  const r = e.length, i = Ws;
  for (let s = 0; s < r; s++)
    s % 3 === 0 && s && (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]), n = (n << 8) + e[s];
  const o = r % 3;
  return o === 0 ? (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]) : o === 2 ? (t += i[n >> 10 & 63], t += i[n >> 4 & 63], t += i[n << 2 & 63], t += i[64]) : o === 1 && (t += i[n >> 2 & 63], t += i[n << 4 & 63], t += i[64], t += i[64]), t;
}
function sE(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Cf = new nE("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: rE,
  construct: iE,
  predicate: sE,
  represent: oE
});
const aE = Je, yl = Object.prototype.hasOwnProperty, lE = Object.prototype.toString;
function cE(e) {
  if (e === null) return !0;
  const t = {}, n = e;
  for (let r = 0, i = n.length; r < i; r += 1) {
    const o = n[r];
    let s = !1;
    if (lE.call(o) !== "[object Object]") return !1;
    let a;
    for (a in o)
      if (yl.call(o, a))
        if (!s) s = !0;
        else return !1;
    if (!s || yl.call(t, a)) return !1;
    Object.defineProperty(t, a, { value: !0 });
  }
  return !0;
}
function uE(e) {
  return e !== null ? e : [];
}
var If = new aE("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: cE,
  construct: uE
});
const fE = Je, dE = Object.prototype.toString;
function hE(e) {
  if (e === null) return !0;
  const t = e, n = new Array(t.length);
  for (let r = 0, i = t.length; r < i; r += 1) {
    const o = t[r];
    if (dE.call(o) !== "[object Object]") return !1;
    const s = Object.keys(o);
    if (s.length !== 1) return !1;
    n[r] = [s[0], o[s[0]]];
  }
  return !0;
}
function pE(e) {
  if (e === null) return [];
  const t = e, n = new Array(t.length);
  for (let r = 0, i = t.length; r < i; r += 1) {
    const o = t[r], s = Object.keys(o);
    n[r] = [s[0], o[s[0]]];
  }
  return n;
}
var Df = new fE("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: hE,
  construct: pE
});
const mE = Je, gE = Object.prototype.hasOwnProperty;
function EE(e) {
  if (e === null) return !0;
  const t = e;
  for (const n in t)
    if (gE.call(t, n) && t[n] !== null)
      return !1;
  return !0;
}
function yE(e) {
  return e !== null ? e : {};
}
var Nf = new mE("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: EE,
  construct: yE
}), Ys = _f.extend({
  implicit: [
    Af,
    Tf
  ],
  explicit: [
    Cf,
    If,
    Df,
    Nf
  ]
});
const dn = mt, Of = Mr, wE = gg, _E = Ys, pt = Object.prototype.hasOwnProperty, bi = 1, bf = 2, Rf = 3, Ri = 4, Fo = 1, vE = 2, wl = 3, SE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, AE = /[\x85\u2028\u2029]/, TE = /[,\[\]{}]/, $f = /^(?:!|!!|![0-9A-Za-z-]+!)$/, Lf = /^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;
function _l(e) {
  return Object.prototype.toString.call(e);
}
function Tt(e) {
  return e === 10 || e === 13;
}
function $t(e) {
  return e === 9 || e === 32;
}
function Qe(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function kn(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function CE(e) {
  if (e >= 48 && e <= 57)
    return e - 48;
  const t = e | 32;
  return t >= 97 && t <= 102 ? t - 97 + 10 : -1;
}
function IE(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function DE(e) {
  return e >= 48 && e <= 57 ? e - 48 : -1;
}
function vl(e) {
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
function NE(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
function xf(e, t, n) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: n
  }) : e[t] = n;
}
const Pf = new Array(256), Ff = new Array(256);
for (let e = 0; e < 256; e++)
  Pf[e] = vl(e) ? 1 : 0, Ff[e] = vl(e);
function OE(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || _E, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.maxDepth = typeof t.maxDepth == "number" ? t.maxDepth : 100, this.maxTotalMergeKeys = typeof t.maxTotalMergeKeys == "number" ? t.maxTotalMergeKeys : 1e4, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.depth = 0, this.totalMergeKeys = 0, this.firstTabInLine = -1, this.documents = [], this.anchorMapTransactions = [];
}
function Uf(e, t) {
  const n = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return n.snippet = wE(n), new Of(t, n);
}
function J(e, t) {
  throw Uf(e, t);
}
function $i(e, t) {
  e.onWarning && e.onWarning.call(null, Uf(e, t));
}
function pn(e, t, n) {
  const r = e.anchorMapTransactions;
  if (r.length !== 0) {
    const i = r[r.length - 1];
    pt.call(i, t) || (i[t] = {
      existed: pt.call(e.anchorMap, t),
      value: e.anchorMap[t]
    });
  }
  e.anchorMap[t] = n;
}
function bE(e) {
  e.anchorMapTransactions.push(/* @__PURE__ */ Object.create(null));
}
function RE(e) {
  const t = e.anchorMapTransactions.pop(), n = e.anchorMapTransactions;
  if (n.length === 0) return;
  const r = n[n.length - 1], i = Object.keys(t);
  for (let o = 0, s = i.length; o < s; o += 1) {
    const a = i[o];
    pt.call(r, a) || (r[a] = t[a]);
  }
}
function $E(e) {
  const t = e.anchorMapTransactions.pop(), n = Object.keys(t);
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const i = t[n[r]];
    i.existed ? e.anchorMap[n[r]] = i.value : delete e.anchorMap[n[r]];
  }
}
function kf(e) {
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
function Sl(e, t) {
  e.position = t.position, e.line = t.line, e.lineStart = t.lineStart, e.lineIndent = t.lineIndent, e.firstTabInLine = t.firstTabInLine, e.tag = t.tag, e.anchor = t.anchor, e.kind = t.kind, e.result = t.result;
}
const Al = {
  YAML: function(t, n, r) {
    t.version !== null && J(t, "duplication of %YAML directive"), r.length !== 1 && J(t, "YAML directive accepts exactly one argument");
    const i = /^([0-9]+)\.([0-9]+)$/.exec(r[0]);
    i === null && J(t, "ill-formed argument of the YAML directive");
    const o = parseInt(i[1], 10), s = parseInt(i[2], 10);
    o !== 1 && J(t, "unacceptable YAML version of the document"), t.version = r[0], t.checkLineBreaks = s < 2, s !== 1 && s !== 2 && $i(t, "unsupported YAML version of the document");
  },
  TAG: function(t, n, r) {
    let i;
    r.length !== 2 && J(t, "TAG directive accepts exactly two arguments");
    const o = r[0];
    i = r[1], $f.test(o) || J(t, "ill-formed tag handle (first argument) of the TAG directive"), pt.call(t.tagMap, o) && J(t, 'there is a previously declared suffix for "' + o + '" tag handle'), Lf.test(i) || J(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      i = decodeURIComponent(i);
    } catch {
      J(t, "tag prefix is malformed: " + i);
    }
    t.tagMap[o] = i;
  }
};
function Wt(e, t, n, r) {
  if (t < n) {
    const i = e.input.slice(t, n);
    if (r)
      for (let o = 0, s = i.length; o < s; o += 1) {
        const a = i.charCodeAt(o);
        a === 9 || a >= 32 && a <= 1114111 || J(e, "expected valid JSON character");
      }
    else SE.test(i) && J(e, "the stream contains non-printable characters");
    e.result += i;
  }
}
function Tl(e) {
  e.totalMergeKeys++, e.maxTotalMergeKeys !== -1 && e.totalMergeKeys > e.maxTotalMergeKeys && J(e, "merge keys exceeded maxTotalMergeKeys (" + e.maxTotalMergeKeys + ")");
}
function Cl(e, t, n, r) {
  dn.isObject(n) || J(e, "cannot merge mappings; the provided source object is unacceptable"), Tl(e);
  const i = Object.keys(n);
  for (let o = 0, s = i.length; o < s; o += 1) {
    const a = i[o];
    Tl(e), pt.call(t, a) || (xf(t, a, n[a]), r[a] = !0);
  }
}
function Mn(e, t, n, r, i, o, s, a, c) {
  if (Array.isArray(i)) {
    i = Array.prototype.slice.call(i);
    for (let p = 0, l = i.length; p < l; p += 1)
      Array.isArray(i[p]) && J(e, "nested arrays are not supported inside keys"), typeof i == "object" && _l(i[p]) === "[object Object]" && (i[p] = "[object Object]");
  }
  if (typeof i == "object" && _l(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(o)) {
      o.length > 100 && J(e, "abnormal merge sequence size");
      for (let p = 0, l = o.length; p < l; p += 1)
        Cl(e, t, o[p], n);
    } else
      Cl(e, t, o, n);
  else
    !e.json && !pt.call(n, i) && pt.call(t, i) && (e.line = s || e.line, e.lineStart = a || e.lineStart, e.position = c || e.position, J(e, "duplicated mapping key")), xf(t, i, o), delete n[i];
  return t;
}
function Xs(e) {
  const t = e.input.charCodeAt(e.position);
  t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : J(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function Ce(e, t, n) {
  let r = 0, i = e.input.charCodeAt(e.position);
  for (; i !== 0; ) {
    for (; $t(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (Tt(i))
      for (Xs(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return n !== -1 && r !== 0 && e.lineIndent < n && $i(e, "deficient indentation"), r;
}
function Yi(e) {
  let t = e.position, n = e.input.charCodeAt(t);
  return !!((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2) && (t += 3, n = e.input.charCodeAt(t), n === 0 || Qe(n)));
}
function Js(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += dn.repeat(`
`, t - 1));
}
function LE(e, t, n) {
  let r, i, o, s, a, c;
  const p = e.kind, l = e.result;
  let u = e.input.charCodeAt(e.position);
  if (Qe(u) || kn(u) || u === 35 || u === 38 || u === 42 || u === 33 || u === 124 || u === 62 || u === 39 || u === 34 || u === 37 || u === 64 || u === 96)
    return !1;
  if (u === 63 || u === 45) {
    const h = e.input.charCodeAt(e.position + 1);
    if (Qe(h) || n && kn(h))
      return !1;
  }
  for (e.kind = "scalar", e.result = "", r = i = e.position, o = !1; u !== 0; ) {
    if (u === 58) {
      const h = e.input.charCodeAt(e.position + 1);
      if (Qe(h) || n && kn(h))
        break;
    } else if (u === 35) {
      const h = e.input.charCodeAt(e.position - 1);
      if (Qe(h))
        break;
    } else {
      if (e.position === e.lineStart && Yi(e) || n && kn(u))
        break;
      if (Tt(u))
        if (s = e.line, a = e.lineStart, c = e.lineIndent, Ce(e, !1, -1), e.lineIndent >= t) {
          o = !0, u = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = i, e.line = s, e.lineStart = a, e.lineIndent = c;
          break;
        }
    }
    o && (Wt(e, r, i, !1), Js(e, e.line - s), r = i = e.position, o = !1), $t(u) || (i = e.position + 1), u = e.input.charCodeAt(++e.position);
  }
  return Wt(e, r, i, !1), e.result ? !0 : (e.kind = p, e.result = l, !1);
}
function xE(e, t) {
  let n, r, i = e.input.charCodeAt(e.position);
  if (i !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (i = e.input.charCodeAt(e.position)) !== 0; )
    if (i === 39)
      if (Wt(e, n, e.position, !0), i = e.input.charCodeAt(++e.position), i === 39)
        n = e.position, e.position++, r = e.position;
      else
        return !0;
    else Tt(i) ? (Wt(e, n, r, !0), Js(e, Ce(e, !1, t)), n = r = e.position) : e.position === e.lineStart && Yi(e) ? J(e, "unexpected end of the document within a single quoted scalar") : (e.position++, $t(i) || (r = e.position));
  J(e, "unexpected end of the stream within a single quoted scalar");
}
function PE(e, t) {
  let n, r, i, o = e.input.charCodeAt(e.position);
  if (o !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (o = e.input.charCodeAt(e.position)) !== 0; ) {
    if (o === 34)
      return Wt(e, n, e.position, !0), e.position++, !0;
    if (o === 92) {
      if (Wt(e, n, e.position, !0), o = e.input.charCodeAt(++e.position), Tt(o))
        Ce(e, !1, t);
      else if (o < 256 && Pf[o])
        e.result += Ff[o], e.position++;
      else if ((i = IE(o)) > 0) {
        let s = i, a = 0;
        for (; s > 0; s--)
          o = e.input.charCodeAt(++e.position), (i = CE(o)) >= 0 ? a = (a << 4) + i : J(e, "expected hexadecimal character");
        e.result += NE(a), e.position++;
      } else
        J(e, "unknown escape sequence");
      n = r = e.position;
    } else Tt(o) ? (Wt(e, n, r, !0), Js(e, Ce(e, !1, t)), n = r = e.position) : e.position === e.lineStart && Yi(e) ? J(e, "unexpected end of the document within a double quoted scalar") : (e.position++, $t(o) || (r = e.position));
  }
  J(e, "unexpected end of the stream within a double quoted scalar");
}
function FE(e, t) {
  let n = !0, r, i, o;
  const s = e.tag;
  let a;
  const c = e.anchor;
  let p, l, u, h;
  const w = /* @__PURE__ */ Object.create(null);
  let m, f, y, _ = e.input.charCodeAt(e.position);
  if (_ === 91)
    p = 93, h = !1, a = [];
  else if (_ === 123)
    p = 125, h = !0, a = {};
  else
    return !1;
  for (e.anchor !== null && pn(e, e.anchor, a), _ = e.input.charCodeAt(++e.position); _ !== 0; ) {
    if (Ce(e, !0, t), _ = e.input.charCodeAt(e.position), _ === p)
      return e.position++, e.tag = s, e.anchor = c, e.kind = h ? "mapping" : "sequence", e.result = a, !0;
    if (n ? _ === 44 && J(e, "expected the node content, but found ','") : J(e, "missed comma between flow collection entries"), f = m = y = null, l = u = !1, _ === 63) {
      const E = e.input.charCodeAt(e.position + 1);
      Qe(E) && (l = u = !0, e.position++, Ce(e, !0, t));
    }
    r = e.line, i = e.lineStart, o = e.position, Xn(e, t, bi, !1, !0), f = e.tag, m = e.result, Ce(e, !0, t), _ = e.input.charCodeAt(e.position), (u || e.line === r) && _ === 58 && (l = !0, _ = e.input.charCodeAt(++e.position), Ce(e, !0, t), Xn(e, t, bi, !1, !0), y = e.result), h ? Mn(e, a, w, f, m, y, r, i, o) : l ? a.push(Mn(e, null, w, f, m, y, r, i, o)) : a.push(m), Ce(e, !0, t), _ = e.input.charCodeAt(e.position), _ === 44 ? (n = !0, _ = e.input.charCodeAt(++e.position)) : n = !1;
  }
  J(e, "unexpected end of the stream within a flow collection");
}
function UE(e, t) {
  let n, r = Fo, i = !1, o = !1, s = t, a = 0, c = !1, p, l = e.input.charCodeAt(e.position);
  if (l === 124)
    n = !1;
  else if (l === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; l !== 0; )
    if (l = e.input.charCodeAt(++e.position), l === 43 || l === 45)
      Fo === r ? r = l === 43 ? wl : vE : J(e, "repeat of a chomping mode identifier");
    else if ((p = DE(l)) >= 0)
      p === 0 ? J(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? J(e, "repeat of an indentation width identifier") : (s = t + p - 1, o = !0);
    else
      break;
  if ($t(l)) {
    do
      l = e.input.charCodeAt(++e.position);
    while ($t(l));
    if (l === 35)
      do
        l = e.input.charCodeAt(++e.position);
      while (!Tt(l) && l !== 0);
  }
  for (; l !== 0; ) {
    for (Xs(e), e.lineIndent = 0, l = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && l === 32; )
      e.lineIndent++, l = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > s && (s = e.lineIndent), Tt(l)) {
      a++;
      continue;
    }
    if (!o && s === 0 && J(e, "missing indentation for block scalar"), e.lineIndent < s) {
      r === wl ? e.result += dn.repeat(`
`, i ? 1 + a : a) : r === Fo && i && (e.result += `
`);
      break;
    }
    n ? $t(l) ? (c = !0, e.result += dn.repeat(`
`, i ? 1 + a : a)) : c ? (c = !1, e.result += dn.repeat(`
`, a + 1)) : a === 0 ? i && (e.result += " ") : e.result += dn.repeat(`
`, a) : e.result += dn.repeat(`
`, i ? 1 + a : a), i = !0, o = !0, a = 0;
    const u = e.position;
    for (; !Tt(l) && l !== 0; )
      l = e.input.charCodeAt(++e.position);
    Wt(e, u, e.position, !1);
  }
  return !0;
}
function Il(e, t) {
  const n = e.tag, r = e.anchor, i = [];
  let o = !1;
  if (e.firstTabInLine !== -1) return !1;
  e.anchor !== null && pn(e, e.anchor, i);
  let s = e.input.charCodeAt(e.position);
  for (; s !== 0 && (e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, J(e, "tab characters must not be used in indentation")), s === 45); ) {
    const a = e.input.charCodeAt(e.position + 1);
    if (!Qe(a))
      break;
    if (o = !0, e.position++, Ce(e, !0, -1) && e.lineIndent <= t) {
      i.push(null), s = e.input.charCodeAt(e.position);
      continue;
    }
    const c = e.line;
    if (Xn(e, t, Rf, !1, !0), i.push(e.result), Ce(e, !0, -1), s = e.input.charCodeAt(e.position), (e.line === c || e.lineIndent > t) && s !== 0)
      J(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return o ? (e.tag = n, e.anchor = r, e.kind = "sequence", e.result = i, !0) : !1;
}
function Mf(e, t, n) {
  let r, i, o, s;
  const a = e.tag, c = e.anchor, p = {}, l = /* @__PURE__ */ Object.create(null);
  let u = null, h = null, w = null, m = !1, f = !1;
  if (e.firstTabInLine !== -1) return !1;
  e.anchor !== null && pn(e, e.anchor, p);
  let y = e.input.charCodeAt(e.position);
  for (; y !== 0; ) {
    !m && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, J(e, "tab characters must not be used in indentation"));
    const _ = e.input.charCodeAt(e.position + 1), E = e.line;
    if ((y === 63 || y === 58) && Qe(_))
      y === 63 ? (m && (Mn(e, p, l, u, h, null, i, o, s), u = h = w = null), f = !0, m = !0, r = !0) : m ? (m = !1, r = !0) : J(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, y = _;
    else {
      if (i = e.line, o = e.lineStart, s = e.position, !Xn(e, n, bf, !1, !0))
        break;
      if (e.line === E) {
        for (y = e.input.charCodeAt(e.position); $t(y); )
          y = e.input.charCodeAt(++e.position);
        if (y === 58)
          y = e.input.charCodeAt(++e.position), Qe(y) || J(e, "a whitespace character is expected after the key-value separator within a block mapping"), m && (Mn(e, p, l, u, h, null, i, o, s), u = h = w = null), f = !0, m = !1, r = !1, u = e.tag, h = e.result;
        else if (f)
          J(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = a, e.anchor = c, !0;
      } else if (f)
        J(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = a, e.anchor = c, !0;
    }
    if ((e.line === E || e.lineIndent > t) && (m && (i = e.line, o = e.lineStart, s = e.position), Xn(e, t, Ri, !0, r) && (m ? h = e.result : w = e.result), m || (Mn(e, p, l, u, h, w, i, o, s), u = h = w = null), Ce(e, !0, -1), y = e.input.charCodeAt(e.position)), (e.line === E || e.lineIndent > t) && y !== 0)
      J(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return m && Mn(e, p, l, u, h, null, i, o, s), f && (e.tag = a, e.anchor = c, e.kind = "mapping", e.result = p), f;
}
function kE(e) {
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
    for (; o !== 0 && !Qe(o); )
      o === 33 && (n ? J(e, "tag suffix cannot contain exclamation marks") : (r = e.input.slice(s - 1, e.position + 1), $f.test(r) || J(e, "named tag handle cannot contain such characters"), n = !0, s = e.position + 1)), o = e.input.charCodeAt(++e.position);
    i = e.input.slice(s, e.position), TE.test(i) && J(e, "tag suffix cannot contain flow indicator characters");
  }
  i && !Lf.test(i) && J(e, "tag name cannot contain such characters: " + i);
  try {
    i = decodeURIComponent(i);
  } catch {
    J(e, "tag name is malformed: " + i);
  }
  return t ? e.tag = i : pt.call(e.tagMap, r) ? e.tag = e.tagMap[r] + i : r === "!" ? e.tag = "!" + i : r === "!!" ? e.tag = "tag:yaml.org,2002:" + i : J(e, 'undeclared tag handle "' + r + '"'), !0;
}
function ME(e) {
  let t = e.input.charCodeAt(e.position);
  if (t !== 38) return !1;
  e.anchor !== null && J(e, "duplication of an anchor property"), t = e.input.charCodeAt(++e.position);
  const n = e.position;
  for (; t !== 0 && !Qe(t) && !kn(t); )
    t = e.input.charCodeAt(++e.position);
  return e.position === n && J(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function BE(e) {
  let t = e.input.charCodeAt(e.position);
  if (t !== 42) return !1;
  t = e.input.charCodeAt(++e.position);
  const n = e.position;
  for (; t !== 0 && !Qe(t) && !kn(t); )
    t = e.input.charCodeAt(++e.position);
  e.position === n && J(e, "name of an alias node must contain at least one character");
  const r = e.input.slice(n, e.position);
  return pt.call(e.anchorMap, r) || J(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], Ce(e, !0, -1), !0;
}
function jE(e, t, n, r) {
  const i = kf(e);
  return bE(e), Sl(e, t), e.tag = null, e.anchor = null, e.kind = null, e.result = null, Mf(e, n, r) && e.kind === "mapping" ? (RE(e), !0) : ($E(e), Sl(e, i), !1);
}
function Xn(e, t, n, r, i) {
  let o, s, a = 1, c = !1, p = !1, l = null, u, h, w;
  e.depth >= e.maxDepth && J(e, "nesting exceeded maxDepth (" + e.maxDepth + ")"), e.depth += 1, e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null;
  const m = o = s = Ri === n || Rf === n;
  if (r && Ce(e, !0, -1) && (c = !0, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : e.lineIndent < t && (a = -1)), a === 1)
    for (; ; ) {
      const f = e.input.charCodeAt(e.position), y = kf(e);
      if (c && (f === 33 && e.tag !== null || f === 38 && e.anchor !== null) || !kE(e) && !ME(e))
        break;
      l === null && (l = y), Ce(e, !0, -1) ? (c = !0, s = m, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : e.lineIndent < t && (a = -1)) : s = !1;
    }
  if (s && (s = c || i), a === 1 || Ri === n)
    if (bi === n || bf === n ? h = t : h = t + 1, w = e.position - e.lineStart, a === 1)
      if (s && (Il(e, w) || Mf(e, w, h)) || FE(e, h))
        p = !0;
      else {
        const f = e.input.charCodeAt(e.position);
        l !== null && m && !s && f !== 124 && f !== 62 && jE(
          e,
          l,
          l.position - l.lineStart,
          h
        ) || o && UE(e, h) || xE(e, h) || PE(e, h) ? p = !0 : BE(e) ? (p = !0, (e.tag !== null || e.anchor !== null) && J(e, "alias node should not have any properties")) : LE(e, h, bi === n) && (p = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && pn(e, e.anchor, e.result);
      }
    else a === 0 && (p = s && Il(e, w));
  if (e.tag === null)
    e.anchor !== null && pn(e, e.anchor, e.result);
  else if (e.tag === "?") {
    e.result !== null && e.kind !== "scalar" && J(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"');
    for (let f = 0, y = e.implicitTypes.length; f < y; f += 1)
      if (u = e.implicitTypes[f], u.resolve(e.result)) {
        e.result = u.construct(e.result), e.tag = u.tag, e.anchor !== null && pn(e, e.anchor, e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (pt.call(e.typeMap[e.kind || "fallback"], e.tag))
      u = e.typeMap[e.kind || "fallback"][e.tag];
    else {
      u = null;
      const f = e.typeMap.multi[e.kind || "fallback"];
      for (let y = 0, _ = f.length; y < _; y += 1)
        if (e.tag.slice(0, f[y].tag.length) === f[y].tag) {
          u = f[y];
          break;
        }
    }
    u || J(e, "unknown tag !<" + e.tag + ">"), e.result !== null && u.kind !== e.kind && J(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + u.kind + '", not "' + e.kind + '"'), u.resolve(e.result, e.tag) ? (e.result = u.construct(e.result, e.tag), e.anchor !== null && pn(e, e.anchor, e.result)) : J(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.depth -= 1, e.tag !== null || e.anchor !== null || p;
}
function HE(e) {
  const t = e.position;
  let n = !1, r;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (r = e.input.charCodeAt(e.position)) !== 0 && (Ce(e, !0, -1), r = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || r !== 37)); ) {
    n = !0, r = e.input.charCodeAt(++e.position);
    let i = e.position;
    for (; r !== 0 && !Qe(r); )
      r = e.input.charCodeAt(++e.position);
    const o = e.input.slice(i, e.position), s = [];
    for (o.length < 1 && J(e, "directive name must not be less than one character in length"); r !== 0; ) {
      for (; $t(r); )
        r = e.input.charCodeAt(++e.position);
      if (r === 35) {
        do
          r = e.input.charCodeAt(++e.position);
        while (r !== 0 && !Tt(r));
        break;
      }
      if (Tt(r)) break;
      for (i = e.position; r !== 0 && !Qe(r); )
        r = e.input.charCodeAt(++e.position);
      s.push(e.input.slice(i, e.position));
    }
    r !== 0 && Xs(e), pt.call(Al, o) ? Al[o](e, o, s) : $i(e, 'unknown document directive "' + o + '"');
  }
  if (Ce(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, Ce(e, !0, -1)) : n && J(e, "directives end mark is expected"), Xn(e, e.lineIndent - 1, Ri, !1, !0), Ce(e, !0, -1), e.checkLineBreaks && AE.test(e.input.slice(t, e.position)) && $i(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Yi(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, Ce(e, !0, -1));
    return;
  }
  e.position < e.length - 1 && J(e, "end of the stream or a document separator is expected");
}
function Bf(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  const n = new OE(e, t), r = e.indexOf("\0");
  for (r !== -1 && (n.position = r, J(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    HE(n);
  return n.documents;
}
function GE(e, t, n) {
  t !== null && typeof t == "object" && typeof n > "u" && (n = t, t = null);
  const r = Bf(e, n);
  if (typeof t != "function")
    return r;
  for (let i = 0, o = r.length; i < o; i += 1)
    t(r[i]);
}
function qE(e, t) {
  const n = Bf(e, t);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new Of("expected a single document in the stream, but found more");
  }
}
Vs.loadAll = GE;
Vs.load = qE;
var jf = {};
const Xi = mt, Br = Mr, zE = Ys, Hf = Object.prototype.toString, Gf = Object.prototype.hasOwnProperty, Zs = 65279, VE = 9, Tr = 10, WE = 13, YE = 32, XE = 33, JE = 34, ws = 35, ZE = 37, KE = 38, QE = 39, ey = 42, qf = 44, ty = 45, Li = 58, ny = 61, ry = 62, iy = 63, oy = 64, zf = 91, Vf = 93, sy = 96, Wf = 123, ay = 124, Yf = 125, qe = {};
qe[0] = "\\0";
qe[7] = "\\a";
qe[8] = "\\b";
qe[9] = "\\t";
qe[10] = "\\n";
qe[11] = "\\v";
qe[12] = "\\f";
qe[13] = "\\r";
qe[27] = "\\e";
qe[34] = '\\"';
qe[92] = "\\\\";
qe[133] = "\\N";
qe[160] = "\\_";
qe[8232] = "\\L";
qe[8233] = "\\P";
const ly = [
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
], cy = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function uy(e, t) {
  if (t === null) return {};
  const n = {}, r = Object.keys(t);
  for (let i = 0, o = r.length; i < o; i += 1) {
    let s = r[i], a = String(t[s]);
    s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2));
    const c = e.compiledTypeMap.fallback[s];
    c && Gf.call(c.styleAliases, a) && (a = c.styleAliases[a]), n[s] = a;
  }
  return n;
}
function fy(e) {
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
  return "\\" + t + Xi.repeat("0", n - r.length) + r;
}
const dy = 1, Cr = 2;
function hy(e) {
  this.schema = e.schema || zE, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Xi.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = uy(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Cr : dy, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Dl(e, t) {
  const n = Xi.repeat(" ", t);
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
function _s(e, t) {
  return `
` + Xi.repeat(" ", e.indent * t);
}
function py(e, t) {
  for (let n = 0, r = e.implicitTypes.length; n < r; n += 1)
    if (e.implicitTypes[n].resolve(t))
      return !0;
  return !1;
}
function xi(e) {
  return e === YE || e === VE;
}
function Ir(e) {
  return e >= 32 && e <= 126 || e >= 161 && e <= 55295 && e !== 8232 && e !== 8233 || e >= 57344 && e <= 65533 && e !== Zs || e >= 65536 && e <= 1114111;
}
function Nl(e) {
  return Ir(e) && e !== Zs && // - b-char
  e !== WE && e !== Tr;
}
function Ol(e, t, n) {
  const r = Nl(e), i = r && !xi(e);
  return (
    // ns-plain-safe
    (n ? r : r && // - c-flow-indicator
    e !== qf && e !== zf && e !== Vf && e !== Wf && e !== Yf) && // ns-plain-char
    e !== ws && // false on '#'
    !(t === Li && !i) || // false on ': '
    Nl(t) && !xi(t) && e === ws || // change to true on '[^ ]#'
    t === Li && i
  );
}
function my(e) {
  return Ir(e) && e !== Zs && !xi(e) && // - s-white
  // - (c-indicator ::=
  // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
  e !== ty && e !== iy && e !== Li && e !== qf && e !== zf && e !== Vf && e !== Wf && e !== Yf && // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
  e !== ws && e !== KE && e !== ey && e !== XE && e !== ay && e !== ny && e !== ry && e !== QE && e !== JE && // | “%” | “@” | “`”)
  e !== ZE && e !== oy && e !== sy;
}
function gy(e) {
  return !xi(e) && e !== Li;
}
function hr(e, t) {
  const n = e.charCodeAt(t);
  let r;
  return n >= 55296 && n <= 56319 && t + 1 < e.length && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (n - 55296) * 1024 + r - 56320 + 65536 : n;
}
function Xf(e) {
  return /^\n* /.test(e);
}
const Jf = 1, vs = 2, Zf = 3, Kf = 4, Pn = 5;
function Ey(e, t, n, r, i, o, s, a) {
  let c, p = 0, l = null, u = !1, h = !1;
  const w = r !== -1;
  let m = -1, f = my(hr(e, 0)) && gy(hr(e, e.length - 1));
  if (t || s)
    for (c = 0; c < e.length; p >= 65536 ? c += 2 : c++) {
      if (p = hr(e, c), !Ir(p))
        return Pn;
      f = f && Ol(p, l, a), l = p;
    }
  else {
    for (c = 0; c < e.length; p >= 65536 ? c += 2 : c++) {
      if (p = hr(e, c), p === Tr)
        u = !0, w && (h = h || // Foldable line = too long, and not more-indented.
        c - m - 1 > r && e[m + 1] !== " ", m = c);
      else if (!Ir(p))
        return Pn;
      f = f && Ol(p, l, a), l = p;
    }
    h = h || w && c - m - 1 > r && e[m + 1] !== " ";
  }
  return !u && !h ? f && !s && !i(e) ? Jf : o === Cr ? Pn : vs : n > 9 && Xf(e) ? Pn : s ? o === Cr ? Pn : vs : h ? Kf : Zf;
}
function yy(e, t, n, r, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Cr ? '""' : "''";
    if (!e.noCompatMode && (ly.indexOf(t) !== -1 || cy.test(t)))
      return e.quotingType === Cr ? '"' + t + '"' : "'" + t + "'";
    const o = e.indent * Math.max(1, n), s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), a = r || // No block styles in flow mode.
    e.flowLevel > -1 && n >= e.flowLevel;
    function c(p) {
      return py(e, p);
    }
    switch (Ey(
      t,
      a,
      e.indent,
      s,
      c,
      e.quotingType,
      e.forceQuotes && !r,
      i
    )) {
      case Jf:
        return t;
      case vs:
        return "'" + t.replace(/'/g, "''") + "'";
      case Zf:
        return "|" + bl(t, e.indent) + Rl(Dl(t, o));
      case Kf:
        return ">" + bl(t, e.indent) + Rl(Dl(wy(t, s), o));
      case Pn:
        return '"' + _y(t) + '"';
      default:
        throw new Br("impossible error: invalid scalar style");
    }
  }();
}
function bl(e, t) {
  const n = Xf(e) ? String(t) : "", r = e[e.length - 1] === `
`, o = r && (e[e.length - 2] === `
` || e === `
`) ? "+" : r ? "" : "-";
  return n + o + `
`;
}
function Rl(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function wy(e, t) {
  const n = /(\n+)([^\n]*)/g;
  let r = function() {
    let a = e.indexOf(`
`);
    return a = a !== -1 ? a : e.length, n.lastIndex = a, $l(e.slice(0, a), t);
  }(), i = e[0] === `
` || e[0] === " ", o, s;
  for (; s = n.exec(e); ) {
    const a = s[1], c = s[2];
    o = c[0] === " ", r += a + (!i && !o && c !== "" ? `
` : "") + $l(c, t), i = o;
  }
  return r;
}
function $l(e, t) {
  if (e === "" || e[0] === " ") return e;
  const n = / [^ ]/g;
  let r, i = 0, o, s = 0, a = 0, c = "";
  for (; r = n.exec(e); )
    a = r.index, a - i > t && (o = s > i ? s : a, c += `
` + e.slice(i, o), i = o + 1), s = a;
  return c += `
`, e.length - i > t && s > i ? c += e.slice(i, s) + `
` + e.slice(s + 1) : c += e.slice(i), c.slice(1);
}
function _y(e) {
  let t = "", n = 0;
  for (let r = 0; r < e.length; n >= 65536 ? r += 2 : r++) {
    n = hr(e, r);
    const i = qe[n];
    !i && Ir(n) ? (t += e[r], n >= 65536 && (t += e[r + 1])) : t += i || fy(n);
  }
  return t;
}
function vy(e, t, n) {
  let r = "";
  const i = e.tag;
  for (let o = 0, s = n.length; o < s; o += 1) {
    let a = n[o];
    e.replacer && (a = e.replacer.call(n, String(o), a)), (Lt(e, t, a, !1, !1) || typeof a > "u" && Lt(e, t, null, !1, !1)) && (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
  }
  e.tag = i, e.dump = "[" + r + "]";
}
function Ll(e, t, n, r) {
  let i = "";
  const o = e.tag;
  for (let s = 0, a = n.length; s < a; s += 1) {
    let c = n[s];
    e.replacer && (c = e.replacer.call(n, String(s), c)), (Lt(e, t + 1, c, !0, !0, !1, !0) || typeof c > "u" && Lt(e, t + 1, null, !0, !0, !1, !0)) && ((!r || i !== "") && (i += _s(e, t)), e.dump && Tr === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  }
  e.tag = o, e.dump = i || "[]";
}
function Sy(e, t, n) {
  let r = "";
  const i = e.tag, o = Object.keys(n);
  for (let s = 0, a = o.length; s < a; s += 1) {
    let c = "";
    r !== "" && (c += ", "), e.condenseFlow && (c += '"');
    const p = o[s];
    let l = n[p];
    e.replacer && (l = e.replacer.call(n, p, l)), Lt(e, t, p, !1, !1) && (e.dump.length > 1024 && (c += "? "), c += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Lt(e, t, l, !1, !1) && (c += e.dump, r += c));
  }
  e.tag = i, e.dump = "{" + r + "}";
}
function Ay(e, t, n, r) {
  let i = "";
  const o = e.tag, s = Object.keys(n);
  if (e.sortKeys === !0)
    s.sort();
  else if (typeof e.sortKeys == "function")
    s.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Br("sortKeys must be a boolean or a function");
  for (let a = 0, c = s.length; a < c; a += 1) {
    let p = "";
    (!r || i !== "") && (p += _s(e, t));
    const l = s[a];
    let u = n[l];
    if (e.replacer && (u = e.replacer.call(n, l, u)), !Lt(e, t + 1, l, !0, !0, !0))
      continue;
    const h = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024;
    h && (e.dump && Tr === e.dump.charCodeAt(0) ? p += "?" : p += "? "), p += e.dump, h && (p += _s(e, t)), Lt(e, t + 1, u, !0, h) && (e.dump && Tr === e.dump.charCodeAt(0) ? p += ":" : p += ": ", p += e.dump, i += p);
  }
  e.tag = o, e.dump = i || "{}";
}
function xl(e, t, n) {
  const r = n ? e.explicitTypes : e.implicitTypes;
  for (let i = 0, o = r.length; i < o; i += 1) {
    const s = r[i];
    if ((s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (n ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        const a = e.styleMap[s.tag] || s.defaultStyle;
        let c;
        if (Hf.call(s.represent) === "[object Function]")
          c = s.represent(t, a);
        else if (Gf.call(s.represent, a))
          c = s.represent[a](t, a);
        else
          throw new Br("!<" + s.tag + '> tag resolver accepts not "' + a + '" style');
        e.dump = c;
      }
      return !0;
    }
  }
  return !1;
}
function Lt(e, t, n, r, i, o, s) {
  e.tag = null, e.dump = n, xl(e, n, !1) || xl(e, n, !0);
  const a = Hf.call(e.dump), c = r;
  r && (r = e.flowLevel < 0 || e.flowLevel > t);
  const p = a === "[object Object]" || a === "[object Array]";
  let l, u;
  if (p && (l = e.duplicates.indexOf(n), u = l !== -1), (e.tag !== null && e.tag !== "?" || u || e.indent !== 2 && t > 0) && (i = !1), u && e.usedDuplicates[l])
    e.dump = "*ref_" + l;
  else {
    if (p && u && !e.usedDuplicates[l] && (e.usedDuplicates[l] = !0), a === "[object Object]")
      r && Object.keys(e.dump).length !== 0 ? (Ay(e, t, e.dump, i), u && (e.dump = "&ref_" + l + e.dump)) : (Sy(e, t, e.dump), u && (e.dump = "&ref_" + l + " " + e.dump));
    else if (a === "[object Array]")
      r && e.dump.length !== 0 ? (e.noArrayIndent && !s && t > 0 ? Ll(e, t - 1, e.dump, i) : Ll(e, t, e.dump, i), u && (e.dump = "&ref_" + l + e.dump)) : (vy(e, t, e.dump), u && (e.dump = "&ref_" + l + " " + e.dump));
    else if (a === "[object String]")
      e.tag !== "?" && yy(e, e.dump, t, o, c);
    else {
      if (a === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new Br("unacceptable kind of an object to dump " + a);
    }
    if (e.tag !== null && e.tag !== "?") {
      let h = encodeURI(
        e.tag[0] === "!" ? e.tag.slice(1) : e.tag
      ).replace(/!/g, "%21");
      e.tag[0] === "!" ? h = "!" + h : h.slice(0, 18) === "tag:yaml.org,2002:" ? h = "!!" + h.slice(18) : h = "!<" + h + ">", e.dump = h + " " + e.dump;
    }
  }
  return !0;
}
function Ty(e, t) {
  const n = [], r = [];
  Ss(e, n, r);
  const i = r.length;
  for (let o = 0; o < i; o += 1)
    t.duplicates.push(n[r[o]]);
  t.usedDuplicates = new Array(i);
}
function Ss(e, t, n) {
  if (e !== null && typeof e == "object") {
    const r = t.indexOf(e);
    if (r !== -1)
      n.indexOf(r) === -1 && n.push(r);
    else if (t.push(e), Array.isArray(e))
      for (let i = 0, o = e.length; i < o; i += 1)
        Ss(e[i], t, n);
    else {
      const i = Object.keys(e);
      for (let o = 0, s = i.length; o < s; o += 1)
        Ss(e[i[o]], t, n);
    }
  }
}
function Cy(e, t) {
  t = t || {};
  const n = new hy(t);
  n.noRefs || Ty(e, n);
  let r = e;
  return n.replacer && (r = n.replacer.call({ "": r }, "", r)), Lt(n, 0, r, !0, !0) ? n.dump + `
` : "";
}
jf.dump = Cy;
const Qf = Vs, Iy = jf;
function Ks(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Fe.Type = Je;
Fe.Schema = cf;
Fe.FAILSAFE_SCHEMA = hf;
Fe.JSON_SCHEMA = wf;
Fe.CORE_SCHEMA = _f;
Fe.DEFAULT_SCHEMA = Ys;
Fe.load = Qf.load;
Fe.loadAll = Qf.loadAll;
Fe.dump = Iy.dump;
Fe.YAMLException = Mr;
Fe.types = {
  binary: Cf,
  float: yf,
  map: df,
  null: pf,
  pairs: Df,
  set: Nf,
  timestamp: Af,
  bool: mf,
  int: gf,
  merge: Tf,
  omap: If,
  seq: ff,
  str: uf
};
Fe.safeLoad = Ks("safeLoad", "load");
Fe.safeLoadAll = Ks("safeLoadAll", "loadAll");
Fe.safeDump = Ks("safeDump", "dump");
var Ji = {};
Object.defineProperty(Ji, "__esModule", { value: !0 });
Ji.Lazy = void 0;
class Dy {
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
Ji.Lazy = Dy;
var As = { exports: {} };
const Ny = "2.0.0", ed = 256, Oy = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, by = 16, Ry = ed - 6, $y = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Zi = {
  MAX_LENGTH: ed,
  MAX_SAFE_COMPONENT_LENGTH: by,
  MAX_SAFE_BUILD_LENGTH: Ry,
  MAX_SAFE_INTEGER: Oy,
  RELEASE_TYPES: $y,
  SEMVER_SPEC_VERSION: Ny,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const Ly = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Ki = Ly;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: r,
    MAX_LENGTH: i
  } = Zi, o = Ki;
  t = e.exports = {};
  const s = t.re = [], a = t.safeRe = [], c = t.src = [], p = t.safeSrc = [], l = t.t = {};
  let u = 0;
  const h = "[a-zA-Z0-9-]", w = [
    ["\\s", 1],
    ["\\d", i],
    [h, r]
  ], m = (y) => {
    for (const [_, E] of w)
      y = y.split(`${_}*`).join(`${_}{0,${E}}`).split(`${_}+`).join(`${_}{1,${E}}`);
    return y;
  }, f = (y, _, E) => {
    const S = m(_), T = u++;
    o(y, T, _), l[y] = T, c[T] = _, p[T] = S, s[T] = new RegExp(_, E ? "g" : void 0), a[T] = new RegExp(S, E ? "g" : void 0);
  };
  f("NUMERICIDENTIFIER", "0|[1-9]\\d*"), f("NUMERICIDENTIFIERLOOSE", "\\d+"), f("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), f("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), f("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), f("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), f("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), f("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), f("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), f("BUILDIDENTIFIER", `${h}+`), f("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), f("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), f("FULL", `^${c[l.FULLPLAIN]}$`), f("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), f("LOOSE", `^${c[l.LOOSEPLAIN]}$`), f("GTLT", "((?:<|>)?=?)"), f("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), f("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), f("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), f("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), f("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), f("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), f("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), f("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), f("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), f("COERCERTL", c[l.COERCE], !0), f("COERCERTLFULL", c[l.COERCEFULL], !0), f("LONETILDE", "(?:~>?)"), f("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", f("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), f("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), f("LONECARET", "(?:\\^)"), f("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", f("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), f("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), f("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), f("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), f("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", f("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), f("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), f("STAR", "(<|>)?=?\\s*\\*"), f("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), f("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(As, As.exports);
var jr = As.exports;
const xy = Object.freeze({ loose: !0 }), Py = Object.freeze({}), Fy = (e) => e ? typeof e != "object" ? xy : e : Py;
var Qs = Fy;
const Pl = /^[0-9]+$/, td = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const n = Pl.test(e), r = Pl.test(t);
  return n && r && (e = +e, t = +t), e === t ? 0 : n && !r ? -1 : r && !n ? 1 : e < t ? -1 : 1;
}, Uy = (e, t) => td(t, e);
var nd = {
  compareIdentifiers: td,
  rcompareIdentifiers: Uy
};
const li = Ki, { MAX_LENGTH: Fl, MAX_SAFE_INTEGER: ci } = Zi, { safeRe: ui, t: fi } = jr, ky = Qs, { compareIdentifiers: Uo } = nd;
let My = class _t {
  constructor(t, n) {
    if (n = ky(n), t instanceof _t) {
      if (t.loose === !!n.loose && t.includePrerelease === !!n.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Fl)
      throw new TypeError(
        `version is longer than ${Fl} characters`
      );
    li("SemVer", t, n), this.options = n, this.loose = !!n.loose, this.includePrerelease = !!n.includePrerelease;
    const r = t.trim().match(n.loose ? ui[fi.LOOSE] : ui[fi.FULL]);
    if (!r)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +r[1], this.minor = +r[2], this.patch = +r[3], this.major > ci || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > ci || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > ci || this.patch < 0)
      throw new TypeError("Invalid patch version");
    r[4] ? this.prerelease = r[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < ci)
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
    if (li("SemVer.compare", this.version, this.options, t), !(t instanceof _t)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new _t(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof _t || (t = new _t(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof _t || (t = new _t(t, this.options)), this.prerelease.length && !t.prerelease.length)
      return -1;
    if (!this.prerelease.length && t.prerelease.length)
      return 1;
    if (!this.prerelease.length && !t.prerelease.length)
      return 0;
    let n = 0;
    do {
      const r = this.prerelease[n], i = t.prerelease[n];
      if (li("prerelease compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return Uo(r, i);
    } while (++n);
  }
  compareBuild(t) {
    t instanceof _t || (t = new _t(t, this.options));
    let n = 0;
    do {
      const r = this.build[n], i = t.build[n];
      if (li("build compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return Uo(r, i);
    } while (++n);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, n, r) {
    if (t.startsWith("pre")) {
      if (!n && r === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (n) {
        const i = `-${n}`.match(this.options.loose ? ui[fi.PRERELEASELOOSE] : ui[fi.PRERELEASE]);
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
          r === !1 && (o = [n]), Uo(this.prerelease[0], n) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Ze = My;
const Ul = Ze, By = (e, t, n = !1) => {
  if (e instanceof Ul)
    return e;
  try {
    return new Ul(e, t);
  } catch (r) {
    if (!n)
      return null;
    throw r;
  }
};
var Qn = By;
const jy = Qn, Hy = (e, t) => {
  const n = jy(e, t);
  return n ? n.version : null;
};
var Gy = Hy;
const qy = Qn, zy = (e, t) => {
  const n = qy(e.trim().replace(/^[=v]+/, ""), t);
  return n ? n.version : null;
};
var Vy = zy;
const kl = Ze, Wy = (e, t, n, r, i) => {
  typeof n == "string" && (i = r, r = n, n = void 0);
  try {
    return new kl(
      e instanceof kl ? e.version : e,
      n
    ).inc(t, r, i).version;
  } catch {
    return null;
  }
};
var Yy = Wy;
const Ml = Qn, Xy = (e, t) => {
  const n = Ml(e, null, !0), r = Ml(t, null, !0), i = n.compare(r);
  if (i === 0)
    return null;
  const o = i > 0, s = o ? n : r, a = o ? r : n, c = !!s.prerelease.length;
  if (!!a.prerelease.length && !c) {
    if (!a.patch && !a.minor)
      return "major";
    if (a.compareMain(s) === 0)
      return a.minor && !a.patch ? "minor" : "patch";
  }
  const l = c ? "pre" : "";
  return n.major !== r.major ? l + "major" : n.minor !== r.minor ? l + "minor" : n.patch !== r.patch ? l + "patch" : "prerelease";
};
var Jy = Xy;
const Zy = Ze, Ky = (e, t) => new Zy(e, t).major;
var Qy = Ky;
const ew = Ze, tw = (e, t) => new ew(e, t).minor;
var nw = tw;
const rw = Ze, iw = (e, t) => new rw(e, t).patch;
var ow = iw;
const sw = Qn, aw = (e, t) => {
  const n = sw(e, t);
  return n && n.prerelease.length ? n.prerelease : null;
};
var lw = aw;
const Bl = Ze, cw = (e, t, n) => new Bl(e, n).compare(new Bl(t, n));
var gt = cw;
const uw = gt, fw = (e, t, n) => uw(t, e, n);
var dw = fw;
const hw = gt, pw = (e, t) => hw(e, t, !0);
var mw = pw;
const jl = Ze, gw = (e, t, n) => {
  const r = new jl(e, n), i = new jl(t, n);
  return r.compare(i) || r.compareBuild(i);
};
var ea = gw;
const Ew = ea, yw = (e, t) => e.sort((n, r) => Ew(n, r, t));
var ww = yw;
const _w = ea, vw = (e, t) => e.sort((n, r) => _w(r, n, t));
var Sw = vw;
const Aw = gt, Tw = (e, t, n) => Aw(e, t, n) > 0;
var Qi = Tw;
const Cw = gt, Iw = (e, t, n) => Cw(e, t, n) < 0;
var ta = Iw;
const Dw = gt, Nw = (e, t, n) => Dw(e, t, n) === 0;
var rd = Nw;
const Ow = gt, bw = (e, t, n) => Ow(e, t, n) !== 0;
var id = bw;
const Rw = gt, $w = (e, t, n) => Rw(e, t, n) >= 0;
var na = $w;
const Lw = gt, xw = (e, t, n) => Lw(e, t, n) <= 0;
var ra = xw;
const Pw = rd, Fw = id, Uw = Qi, kw = na, Mw = ta, Bw = ra, jw = (e, t, n, r) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e === n;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e !== n;
    case "":
    case "=":
    case "==":
      return Pw(e, n, r);
    case "!=":
      return Fw(e, n, r);
    case ">":
      return Uw(e, n, r);
    case ">=":
      return kw(e, n, r);
    case "<":
      return Mw(e, n, r);
    case "<=":
      return Bw(e, n, r);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var od = jw;
const Hw = Ze, Gw = Qn, { safeRe: di, t: hi } = jr, qw = (e, t) => {
  if (e instanceof Hw)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let n = null;
  if (!t.rtl)
    n = e.match(t.includePrerelease ? di[hi.COERCEFULL] : di[hi.COERCE]);
  else {
    const c = t.includePrerelease ? di[hi.COERCERTLFULL] : di[hi.COERCERTL];
    let p;
    for (; (p = c.exec(e)) && (!n || n.index + n[0].length !== e.length); )
      (!n || p.index + p[0].length !== n.index + n[0].length) && (n = p), c.lastIndex = p.index + p[1].length + p[2].length;
    c.lastIndex = -1;
  }
  if (n === null)
    return null;
  const r = n[2], i = n[3] || "0", o = n[4] || "0", s = t.includePrerelease && n[5] ? `-${n[5]}` : "", a = t.includePrerelease && n[6] ? `+${n[6]}` : "";
  return Gw(`${r}.${i}.${o}${s}${a}`, t);
};
var zw = qw;
class Vw {
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
var Ww = Vw, ko, Hl;
function Et() {
  if (Hl) return ko;
  Hl = 1;
  const e = /\s+/g;
  class t {
    constructor(b, M) {
      if (M = i(M), b instanceof t)
        return b.loose === !!M.loose && b.includePrerelease === !!M.includePrerelease ? b : new t(b.raw, M);
      if (b instanceof o)
        return this.raw = b.value, this.set = [[b]], this.formatted = void 0, this;
      if (this.options = M, this.loose = !!M.loose, this.includePrerelease = !!M.includePrerelease, this.raw = b.trim().replace(e, " "), this.set = this.raw.split("||").map(($) => this.parseRange($.trim())).filter(($) => $.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const $ = this.set[0];
        if (this.set = this.set.filter((G) => !f(G[0])), this.set.length === 0)
          this.set = [$];
        else if (this.set.length > 1) {
          for (const G of this.set)
            if (G.length === 1 && y(G[0])) {
              this.set = [G];
              break;
            }
        }
      }
      this.formatted = void 0;
    }
    get range() {
      if (this.formatted === void 0) {
        this.formatted = "";
        for (let b = 0; b < this.set.length; b++) {
          b > 0 && (this.formatted += "||");
          const M = this.set[b];
          for (let $ = 0; $ < M.length; $++)
            $ > 0 && (this.formatted += " "), this.formatted += M[$].toString().trim();
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
    parseRange(b) {
      const $ = ((this.options.includePrerelease && w) | (this.options.loose && m)) + ":" + b, G = r.get($);
      if (G)
        return G;
      const N = this.options.loose, q = N ? c[p.HYPHENRANGELOOSE] : c[p.HYPHENRANGE];
      b = b.replace(q, K(this.options.includePrerelease)), s("hyphen replace", b), b = b.replace(c[p.COMPARATORTRIM], l), s("comparator trim", b), b = b.replace(c[p.TILDETRIM], u), s("tilde trim", b), b = b.replace(c[p.CARETTRIM], h), s("caret trim", b);
      let W = b.split(" ").map((V) => E(V, this.options)).join(" ").split(/\s+/).map((V) => Y(V, this.options));
      N && (W = W.filter((V) => (s("loose invalid filter", V, this.options), !!V.match(c[p.COMPARATORLOOSE])))), s("range list", W);
      const U = /* @__PURE__ */ new Map(), Q = W.map((V) => new o(V, this.options));
      for (const V of Q) {
        if (f(V))
          return [V];
        U.set(V.value, V);
      }
      U.size > 1 && U.has("") && U.delete("");
      const re = [...U.values()];
      return r.set($, re), re;
    }
    intersects(b, M) {
      if (!(b instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some(($) => _($, M) && b.set.some((G) => _(G, M) && $.every((N) => G.every((q) => N.intersects(q, M)))));
    }
    // if ANY of the sets match ALL of its comparators, then pass
    test(b) {
      if (!b)
        return !1;
      if (typeof b == "string")
        try {
          b = new a(b, this.options);
        } catch {
          return !1;
        }
      for (let M = 0; M < this.set.length; M++)
        if (te(this.set[M], b, this.options))
          return !0;
      return !1;
    }
  }
  ko = t;
  const n = Ww, r = new n(), i = Qs, o = eo(), s = Ki, a = Ze, {
    safeRe: c,
    t: p,
    comparatorTrimReplace: l,
    tildeTrimReplace: u,
    caretTrimReplace: h
  } = jr, { FLAG_INCLUDE_PRERELEASE: w, FLAG_LOOSE: m } = Zi, f = (F) => F.value === "<0.0.0-0", y = (F) => F.value === "", _ = (F, b) => {
    let M = !0;
    const $ = F.slice();
    let G = $.pop();
    for (; M && $.length; )
      M = $.every((N) => G.intersects(N, b)), G = $.pop();
    return M;
  }, E = (F, b) => (F = F.replace(c[p.BUILD], ""), s("comp", F, b), F = O(F, b), s("caret", F), F = T(F, b), s("tildes", F), F = B(F, b), s("xrange", F), F = A(F, b), s("stars", F), F), S = (F) => !F || F.toLowerCase() === "x" || F === "*", T = (F, b) => F.trim().split(/\s+/).map((M) => R(M, b)).join(" "), R = (F, b) => {
    const M = b.loose ? c[p.TILDELOOSE] : c[p.TILDE];
    return F.replace(M, ($, G, N, q, W) => {
      s("tilde", F, $, G, N, q, W);
      let U;
      return S(G) ? U = "" : S(N) ? U = `>=${G}.0.0 <${+G + 1}.0.0-0` : S(q) ? U = `>=${G}.${N}.0 <${G}.${+N + 1}.0-0` : W ? (s("replaceTilde pr", W), U = `>=${G}.${N}.${q}-${W} <${G}.${+N + 1}.0-0`) : U = `>=${G}.${N}.${q} <${G}.${+N + 1}.0-0`, s("tilde return", U), U;
    });
  }, O = (F, b) => F.trim().split(/\s+/).map((M) => j(M, b)).join(" "), j = (F, b) => {
    s("caret", F, b);
    const M = b.loose ? c[p.CARETLOOSE] : c[p.CARET], $ = b.includePrerelease ? "-0" : "";
    return F.replace(M, (G, N, q, W, U) => {
      s("caret", F, G, N, q, W, U);
      let Q;
      return S(N) ? Q = "" : S(q) ? Q = `>=${N}.0.0${$} <${+N + 1}.0.0-0` : S(W) ? N === "0" ? Q = `>=${N}.${q}.0${$} <${N}.${+q + 1}.0-0` : Q = `>=${N}.${q}.0${$} <${+N + 1}.0.0-0` : U ? (s("replaceCaret pr", U), N === "0" ? q === "0" ? Q = `>=${N}.${q}.${W}-${U} <${N}.${q}.${+W + 1}-0` : Q = `>=${N}.${q}.${W}-${U} <${N}.${+q + 1}.0-0` : Q = `>=${N}.${q}.${W}-${U} <${+N + 1}.0.0-0`) : (s("no pr"), N === "0" ? q === "0" ? Q = `>=${N}.${q}.${W}${$} <${N}.${q}.${+W + 1}-0` : Q = `>=${N}.${q}.${W}${$} <${N}.${+q + 1}.0-0` : Q = `>=${N}.${q}.${W} <${+N + 1}.0.0-0`), s("caret return", Q), Q;
    });
  }, B = (F, b) => (s("replaceXRanges", F, b), F.split(/\s+/).map((M) => P(M, b)).join(" ")), P = (F, b) => {
    F = F.trim();
    const M = b.loose ? c[p.XRANGELOOSE] : c[p.XRANGE];
    return F.replace(M, ($, G, N, q, W, U) => {
      s("xRange", F, $, G, N, q, W, U);
      const Q = S(N), re = Q || S(q), V = re || S(W), ie = V;
      return G === "=" && ie && (G = ""), U = b.includePrerelease ? "-0" : "", Q ? G === ">" || G === "<" ? $ = "<0.0.0-0" : $ = "*" : G && ie ? (re && (q = 0), W = 0, G === ">" ? (G = ">=", re ? (N = +N + 1, q = 0, W = 0) : (q = +q + 1, W = 0)) : G === "<=" && (G = "<", re ? N = +N + 1 : q = +q + 1), G === "<" && (U = "-0"), $ = `${G + N}.${q}.${W}${U}`) : re ? $ = `>=${N}.0.0${U} <${+N + 1}.0.0-0` : V && ($ = `>=${N}.${q}.0${U} <${N}.${+q + 1}.0-0`), s("xRange return", $), $;
    });
  }, A = (F, b) => (s("replaceStars", F, b), F.trim().replace(c[p.STAR], "")), Y = (F, b) => (s("replaceGTE0", F, b), F.trim().replace(c[b.includePrerelease ? p.GTE0PRE : p.GTE0], "")), K = (F) => (b, M, $, G, N, q, W, U, Q, re, V, ie) => (S($) ? M = "" : S(G) ? M = `>=${$}.0.0${F ? "-0" : ""}` : S(N) ? M = `>=${$}.${G}.0${F ? "-0" : ""}` : q ? M = `>=${M}` : M = `>=${M}${F ? "-0" : ""}`, S(Q) ? U = "" : S(re) ? U = `<${+Q + 1}.0.0-0` : S(V) ? U = `<${Q}.${+re + 1}.0-0` : ie ? U = `<=${Q}.${re}.${V}-${ie}` : F ? U = `<${Q}.${re}.${+V + 1}-0` : U = `<=${U}`, `${M} ${U}`.trim()), te = (F, b, M) => {
    for (let $ = 0; $ < F.length; $++)
      if (!F[$].test(b))
        return !1;
    if (b.prerelease.length && !M.includePrerelease) {
      for (let $ = 0; $ < F.length; $++)
        if (s(F[$].semver), F[$].semver !== o.ANY && F[$].semver.prerelease.length > 0) {
          const G = F[$].semver;
          if (G.major === b.major && G.minor === b.minor && G.patch === b.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return ko;
}
var Mo, Gl;
function eo() {
  if (Gl) return Mo;
  Gl = 1;
  const e = Symbol("SemVer ANY");
  class t {
    static get ANY() {
      return e;
    }
    constructor(l, u) {
      if (u = n(u), l instanceof t) {
        if (l.loose === !!u.loose)
          return l;
        l = l.value;
      }
      l = l.trim().split(/\s+/).join(" "), s("comparator", l, u), this.options = u, this.loose = !!u.loose, this.parse(l), this.semver === e ? this.value = "" : this.value = this.operator + this.semver.version, s("comp", this);
    }
    parse(l) {
      const u = this.options.loose ? r[i.COMPARATORLOOSE] : r[i.COMPARATOR], h = l.match(u);
      if (!h)
        throw new TypeError(`Invalid comparator: ${l}`);
      this.operator = h[1] !== void 0 ? h[1] : "", this.operator === "=" && (this.operator = ""), h[2] ? this.semver = new a(h[2], this.options.loose) : this.semver = e;
    }
    toString() {
      return this.value;
    }
    test(l) {
      if (s("Comparator.test", l, this.options.loose), this.semver === e || l === e)
        return !0;
      if (typeof l == "string")
        try {
          l = new a(l, this.options);
        } catch {
          return !1;
        }
      return o(l, this.operator, this.semver, this.options);
    }
    intersects(l, u) {
      if (!(l instanceof t))
        throw new TypeError("a Comparator is required");
      return this.operator === "" ? this.value === "" ? !0 : new c(l.value, u).test(this.value) : l.operator === "" ? l.value === "" ? !0 : new c(this.value, u).test(l.semver) : (u = n(u), u.includePrerelease && (this.value === "<0.0.0-0" || l.value === "<0.0.0-0") || !u.includePrerelease && (this.value.startsWith("<0.0.0") || l.value.startsWith("<0.0.0")) ? !1 : !!(this.operator.startsWith(">") && l.operator.startsWith(">") || this.operator.startsWith("<") && l.operator.startsWith("<") || this.semver.version === l.semver.version && this.operator.includes("=") && l.operator.includes("=") || o(this.semver, "<", l.semver, u) && this.operator.startsWith(">") && l.operator.startsWith("<") || o(this.semver, ">", l.semver, u) && this.operator.startsWith("<") && l.operator.startsWith(">")));
    }
  }
  Mo = t;
  const n = Qs, { safeRe: r, t: i } = jr, o = od, s = Ki, a = Ze, c = Et();
  return Mo;
}
const Yw = Et(), Xw = (e, t, n) => {
  try {
    t = new Yw(t, n);
  } catch {
    return !1;
  }
  return t.test(e);
};
var to = Xw;
const Jw = Et(), Zw = (e, t) => new Jw(e, t).set.map((n) => n.map((r) => r.value).join(" ").trim().split(" "));
var Kw = Zw;
const Qw = Ze, e_ = Et(), t_ = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new e_(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!r || i.compare(s) === -1) && (r = s, i = new Qw(r, n));
  }), r;
};
var n_ = t_;
const r_ = Ze, i_ = Et(), o_ = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new i_(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!r || i.compare(s) === 1) && (r = s, i = new r_(r, n));
  }), r;
};
var s_ = o_;
const Bo = Ze, a_ = Et(), ql = Qi, l_ = (e, t) => {
  e = new a_(e, t);
  let n = new Bo("0.0.0");
  if (e.test(n) || (n = new Bo("0.0.0-0"), e.test(n)))
    return n;
  n = null;
  for (let r = 0; r < e.set.length; ++r) {
    const i = e.set[r];
    let o = null;
    i.forEach((s) => {
      const a = new Bo(s.semver.version);
      switch (s.operator) {
        case ">":
          a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), a.raw = a.format();
        case "":
        case ">=":
          (!o || ql(a, o)) && (o = a);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${s.operator}`);
      }
    }), o && (!n || ql(n, o)) && (n = o);
  }
  return n && e.test(n) ? n : null;
};
var c_ = l_;
const u_ = Et(), f_ = (e, t) => {
  try {
    return new u_(e, t).range || "*";
  } catch {
    return null;
  }
};
var d_ = f_;
const h_ = Ze, sd = eo(), { ANY: p_ } = sd, m_ = Et(), g_ = to, zl = Qi, Vl = ta, E_ = ra, y_ = na, w_ = (e, t, n, r) => {
  e = new h_(e, r), t = new m_(t, r);
  let i, o, s, a, c;
  switch (n) {
    case ">":
      i = zl, o = E_, s = Vl, a = ">", c = ">=";
      break;
    case "<":
      i = Vl, o = y_, s = zl, a = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (g_(e, t, r))
    return !1;
  for (let p = 0; p < t.set.length; ++p) {
    const l = t.set[p];
    let u = null, h = null;
    if (l.forEach((w) => {
      w.semver === p_ && (w = new sd(">=0.0.0")), u = u || w, h = h || w, i(w.semver, u.semver, r) ? u = w : s(w.semver, h.semver, r) && (h = w);
    }), u.operator === a || u.operator === c || (!h.operator || h.operator === a) && o(e, h.semver))
      return !1;
    if (h.operator === c && s(e, h.semver))
      return !1;
  }
  return !0;
};
var ia = w_;
const __ = ia, v_ = (e, t, n) => __(e, t, ">", n);
var S_ = v_;
const A_ = ia, T_ = (e, t, n) => A_(e, t, "<", n);
var C_ = T_;
const Wl = Et(), I_ = (e, t, n) => (e = new Wl(e, n), t = new Wl(t, n), e.intersects(t, n));
var D_ = I_;
const N_ = to, O_ = gt;
var b_ = (e, t, n) => {
  const r = [];
  let i = null, o = null;
  const s = e.sort((l, u) => O_(l, u, n));
  for (const l of s)
    N_(l, t, n) ? (o = l, i || (i = l)) : (o && r.push([i, o]), o = null, i = null);
  i && r.push([i, null]);
  const a = [];
  for (const [l, u] of r)
    l === u ? a.push(l) : !u && l === s[0] ? a.push("*") : u ? l === s[0] ? a.push(`<=${u}`) : a.push(`${l} - ${u}`) : a.push(`>=${l}`);
  const c = a.join(" || "), p = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < p.length ? c : t;
};
const Yl = Et(), oa = eo(), { ANY: jo } = oa, lr = to, sa = gt, R_ = (e, t, n = {}) => {
  if (e === t)
    return !0;
  e = new Yl(e, n), t = new Yl(t, n);
  let r = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const s = L_(i, o, n);
      if (r = r || s !== null, s)
        continue e;
    }
    if (r)
      return !1;
  }
  return !0;
}, $_ = [new oa(">=0.0.0-0")], Xl = [new oa(">=0.0.0")], L_ = (e, t, n) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === jo) {
    if (t.length === 1 && t[0].semver === jo)
      return !0;
    n.includePrerelease ? e = $_ : e = Xl;
  }
  if (t.length === 1 && t[0].semver === jo) {
    if (n.includePrerelease)
      return !0;
    t = Xl;
  }
  const r = /* @__PURE__ */ new Set();
  let i, o;
  for (const w of e)
    w.operator === ">" || w.operator === ">=" ? i = Jl(i, w, n) : w.operator === "<" || w.operator === "<=" ? o = Zl(o, w, n) : r.add(w.semver);
  if (r.size > 1)
    return null;
  let s;
  if (i && o) {
    if (s = sa(i.semver, o.semver, n), s > 0)
      return null;
    if (s === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const w of r) {
    if (i && !lr(w, String(i), n) || o && !lr(w, String(o), n))
      return null;
    for (const m of t)
      if (!lr(w, String(m), n))
        return !1;
    return !0;
  }
  let a, c, p, l, u = o && !n.includePrerelease && o.semver.prerelease.length ? o.semver : !1, h = i && !n.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && o.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const w of t) {
    if (l = l || w.operator === ">" || w.operator === ">=", p = p || w.operator === "<" || w.operator === "<=", i) {
      if (h && w.semver.prerelease && w.semver.prerelease.length && w.semver.major === h.major && w.semver.minor === h.minor && w.semver.patch === h.patch && (h = !1), w.operator === ">" || w.operator === ">=") {
        if (a = Jl(i, w, n), a === w && a !== i)
          return !1;
      } else if (i.operator === ">=" && !lr(i.semver, String(w), n))
        return !1;
    }
    if (o) {
      if (u && w.semver.prerelease && w.semver.prerelease.length && w.semver.major === u.major && w.semver.minor === u.minor && w.semver.patch === u.patch && (u = !1), w.operator === "<" || w.operator === "<=") {
        if (c = Zl(o, w, n), c === w && c !== o)
          return !1;
      } else if (o.operator === "<=" && !lr(o.semver, String(w), n))
        return !1;
    }
    if (!w.operator && (o || i) && s !== 0)
      return !1;
  }
  return !(i && p && !o && s !== 0 || o && l && !i && s !== 0 || h || u);
}, Jl = (e, t, n) => {
  if (!e)
    return t;
  const r = sa(e.semver, t.semver, n);
  return r > 0 ? e : r < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Zl = (e, t, n) => {
  if (!e)
    return t;
  const r = sa(e.semver, t.semver, n);
  return r < 0 ? e : r > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var x_ = R_;
const Ho = jr, Kl = Zi, P_ = Ze, Ql = nd, F_ = Qn, U_ = Gy, k_ = Vy, M_ = Yy, B_ = Jy, j_ = Qy, H_ = nw, G_ = ow, q_ = lw, z_ = gt, V_ = dw, W_ = mw, Y_ = ea, X_ = ww, J_ = Sw, Z_ = Qi, K_ = ta, Q_ = rd, ev = id, tv = na, nv = ra, rv = od, iv = zw, ov = eo(), sv = Et(), av = to, lv = Kw, cv = n_, uv = s_, fv = c_, dv = d_, hv = ia, pv = S_, mv = C_, gv = D_, Ev = b_, yv = x_;
var ad = {
  parse: F_,
  valid: U_,
  clean: k_,
  inc: M_,
  diff: B_,
  major: j_,
  minor: H_,
  patch: G_,
  prerelease: q_,
  compare: z_,
  rcompare: V_,
  compareLoose: W_,
  compareBuild: Y_,
  sort: X_,
  rsort: J_,
  gt: Z_,
  lt: K_,
  eq: Q_,
  neq: ev,
  gte: tv,
  lte: nv,
  cmp: rv,
  coerce: iv,
  Comparator: ov,
  Range: sv,
  satisfies: av,
  toComparators: lv,
  maxSatisfying: cv,
  minSatisfying: uv,
  minVersion: fv,
  validRange: dv,
  outside: hv,
  gtr: pv,
  ltr: mv,
  intersects: gv,
  simplifyRange: Ev,
  subset: yv,
  SemVer: P_,
  re: Ho.re,
  src: Ho.src,
  tokens: Ho.t,
  SEMVER_SPEC_VERSION: Kl.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Kl.RELEASE_TYPES,
  compareIdentifiers: Ql.compareIdentifiers,
  rcompareIdentifiers: Ql.rcompareIdentifiers
}, Hr = {}, Pi = { exports: {} };
Pi.exports;
(function(e, t) {
  var n = 200, r = "__lodash_hash_undefined__", i = 1, o = 2, s = 9007199254740991, a = "[object Arguments]", c = "[object Array]", p = "[object AsyncFunction]", l = "[object Boolean]", u = "[object Date]", h = "[object Error]", w = "[object Function]", m = "[object GeneratorFunction]", f = "[object Map]", y = "[object Number]", _ = "[object Null]", E = "[object Object]", S = "[object Promise]", T = "[object Proxy]", R = "[object RegExp]", O = "[object Set]", j = "[object String]", B = "[object Symbol]", P = "[object Undefined]", A = "[object WeakMap]", Y = "[object ArrayBuffer]", K = "[object DataView]", te = "[object Float32Array]", F = "[object Float64Array]", b = "[object Int8Array]", M = "[object Int16Array]", $ = "[object Int32Array]", G = "[object Uint8Array]", N = "[object Uint8ClampedArray]", q = "[object Uint16Array]", W = "[object Uint32Array]", U = /[\\^$.*+?()[\]{}|]/g, Q = /^\[object .+?Constructor\]$/, re = /^(?:0|[1-9]\d*)$/, V = {};
  V[te] = V[F] = V[b] = V[M] = V[$] = V[G] = V[N] = V[q] = V[W] = !0, V[a] = V[c] = V[Y] = V[l] = V[K] = V[u] = V[h] = V[w] = V[f] = V[y] = V[E] = V[R] = V[O] = V[j] = V[A] = !1;
  var ie = typeof Ve == "object" && Ve && Ve.Object === Object && Ve, Se = typeof self == "object" && self && self.Object === Object && self, le = ie || Se || Function("return this")(), ct = t && !t.nodeType && t, It = ct && !0 && e && !e.nodeType && e, et = It && It.exports === ct, nn = et && ie.process, g = function() {
    try {
      return nn && nn.binding && nn.binding("util");
    } catch {
    }
  }(), d = g && g.isTypedArray;
  function D(v, I) {
    for (var L = -1, X = v == null ? 0 : v.length, de = 0, ee = []; ++L < X; ) {
      var ye = v[L];
      I(ye, L, v) && (ee[de++] = ye);
    }
    return ee;
  }
  function C(v, I) {
    for (var L = -1, X = I.length, de = v.length; ++L < X; )
      v[de + L] = I[L];
    return v;
  }
  function se(v, I) {
    for (var L = -1, X = v == null ? 0 : v.length; ++L < X; )
      if (I(v[L], L, v))
        return !0;
    return !1;
  }
  function pe(v, I) {
    for (var L = -1, X = Array(v); ++L < v; )
      X[L] = I(L);
    return X;
  }
  function Ae(v) {
    return function(I) {
      return v(I);
    };
  }
  function Ue(v, I) {
    return v.has(I);
  }
  function ke(v, I) {
    return v == null ? void 0 : v[I];
  }
  function ut(v) {
    var I = -1, L = Array(v.size);
    return v.forEach(function(X, de) {
      L[++I] = [de, X];
    }), L;
  }
  function De(v, I) {
    return function(L) {
      return v(I(L));
    };
  }
  function ft(v) {
    var I = -1, L = Array(v.size);
    return v.forEach(function(X) {
      L[++I] = X;
    }), L;
  }
  var yo = Array.prototype, Yr = Function.prototype, Pt = Object.prototype, In = le["__core-js_shared__"], ya = Yr.toString, wt = Pt.hasOwnProperty, wa = function() {
    var v = /[^.]+$/.exec(In && In.keys && In.keys.IE_PROTO || "");
    return v ? "Symbol(src)_1." + v : "";
  }(), _a = Pt.toString, kd = RegExp(
    "^" + ya.call(wt).replace(U, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), va = et ? le.Buffer : void 0, Xr = le.Symbol, Sa = le.Uint8Array, Aa = Pt.propertyIsEnumerable, Md = yo.splice, rn = Xr ? Xr.toStringTag : void 0, Ta = Object.getOwnPropertySymbols, Bd = va ? va.isBuffer : void 0, jd = De(Object.keys, Object), wo = Dn(le, "DataView"), rr = Dn(le, "Map"), _o = Dn(le, "Promise"), vo = Dn(le, "Set"), So = Dn(le, "WeakMap"), ir = Dn(Object, "create"), Hd = an(wo), Gd = an(rr), qd = an(_o), zd = an(vo), Vd = an(So), Ca = Xr ? Xr.prototype : void 0, Ao = Ca ? Ca.valueOf : void 0;
  function on(v) {
    var I = -1, L = v == null ? 0 : v.length;
    for (this.clear(); ++I < L; ) {
      var X = v[I];
      this.set(X[0], X[1]);
    }
  }
  function Wd() {
    this.__data__ = ir ? ir(null) : {}, this.size = 0;
  }
  function Yd(v) {
    var I = this.has(v) && delete this.__data__[v];
    return this.size -= I ? 1 : 0, I;
  }
  function Xd(v) {
    var I = this.__data__;
    if (ir) {
      var L = I[v];
      return L === r ? void 0 : L;
    }
    return wt.call(I, v) ? I[v] : void 0;
  }
  function Jd(v) {
    var I = this.__data__;
    return ir ? I[v] !== void 0 : wt.call(I, v);
  }
  function Zd(v, I) {
    var L = this.__data__;
    return this.size += this.has(v) ? 0 : 1, L[v] = ir && I === void 0 ? r : I, this;
  }
  on.prototype.clear = Wd, on.prototype.delete = Yd, on.prototype.get = Xd, on.prototype.has = Jd, on.prototype.set = Zd;
  function Dt(v) {
    var I = -1, L = v == null ? 0 : v.length;
    for (this.clear(); ++I < L; ) {
      var X = v[I];
      this.set(X[0], X[1]);
    }
  }
  function Kd() {
    this.__data__ = [], this.size = 0;
  }
  function Qd(v) {
    var I = this.__data__, L = Zr(I, v);
    if (L < 0)
      return !1;
    var X = I.length - 1;
    return L == X ? I.pop() : Md.call(I, L, 1), --this.size, !0;
  }
  function eh(v) {
    var I = this.__data__, L = Zr(I, v);
    return L < 0 ? void 0 : I[L][1];
  }
  function th(v) {
    return Zr(this.__data__, v) > -1;
  }
  function nh(v, I) {
    var L = this.__data__, X = Zr(L, v);
    return X < 0 ? (++this.size, L.push([v, I])) : L[X][1] = I, this;
  }
  Dt.prototype.clear = Kd, Dt.prototype.delete = Qd, Dt.prototype.get = eh, Dt.prototype.has = th, Dt.prototype.set = nh;
  function sn(v) {
    var I = -1, L = v == null ? 0 : v.length;
    for (this.clear(); ++I < L; ) {
      var X = v[I];
      this.set(X[0], X[1]);
    }
  }
  function rh() {
    this.size = 0, this.__data__ = {
      hash: new on(),
      map: new (rr || Dt)(),
      string: new on()
    };
  }
  function ih(v) {
    var I = Kr(this, v).delete(v);
    return this.size -= I ? 1 : 0, I;
  }
  function oh(v) {
    return Kr(this, v).get(v);
  }
  function sh(v) {
    return Kr(this, v).has(v);
  }
  function ah(v, I) {
    var L = Kr(this, v), X = L.size;
    return L.set(v, I), this.size += L.size == X ? 0 : 1, this;
  }
  sn.prototype.clear = rh, sn.prototype.delete = ih, sn.prototype.get = oh, sn.prototype.has = sh, sn.prototype.set = ah;
  function Jr(v) {
    var I = -1, L = v == null ? 0 : v.length;
    for (this.__data__ = new sn(); ++I < L; )
      this.add(v[I]);
  }
  function lh(v) {
    return this.__data__.set(v, r), this;
  }
  function ch(v) {
    return this.__data__.has(v);
  }
  Jr.prototype.add = Jr.prototype.push = lh, Jr.prototype.has = ch;
  function Ft(v) {
    var I = this.__data__ = new Dt(v);
    this.size = I.size;
  }
  function uh() {
    this.__data__ = new Dt(), this.size = 0;
  }
  function fh(v) {
    var I = this.__data__, L = I.delete(v);
    return this.size = I.size, L;
  }
  function dh(v) {
    return this.__data__.get(v);
  }
  function hh(v) {
    return this.__data__.has(v);
  }
  function ph(v, I) {
    var L = this.__data__;
    if (L instanceof Dt) {
      var X = L.__data__;
      if (!rr || X.length < n - 1)
        return X.push([v, I]), this.size = ++L.size, this;
      L = this.__data__ = new sn(X);
    }
    return L.set(v, I), this.size = L.size, this;
  }
  Ft.prototype.clear = uh, Ft.prototype.delete = fh, Ft.prototype.get = dh, Ft.prototype.has = hh, Ft.prototype.set = ph;
  function mh(v, I) {
    var L = Qr(v), X = !L && bh(v), de = !L && !X && To(v), ee = !L && !X && !de && xa(v), ye = L || X || de || ee, be = ye ? pe(v.length, String) : [], Le = be.length;
    for (var me in v)
      wt.call(v, me) && !(ye && // Safari 9 has enumerable `arguments.length` in strict mode.
      (me == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      de && (me == "offset" || me == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      ee && (me == "buffer" || me == "byteLength" || me == "byteOffset") || // Skip index properties.
      Ch(me, Le))) && be.push(me);
    return be;
  }
  function Zr(v, I) {
    for (var L = v.length; L--; )
      if (ba(v[L][0], I))
        return L;
    return -1;
  }
  function gh(v, I, L) {
    var X = I(v);
    return Qr(v) ? X : C(X, L(v));
  }
  function or(v) {
    return v == null ? v === void 0 ? P : _ : rn && rn in Object(v) ? Ah(v) : Oh(v);
  }
  function Ia(v) {
    return sr(v) && or(v) == a;
  }
  function Da(v, I, L, X, de) {
    return v === I ? !0 : v == null || I == null || !sr(v) && !sr(I) ? v !== v && I !== I : Eh(v, I, L, X, Da, de);
  }
  function Eh(v, I, L, X, de, ee) {
    var ye = Qr(v), be = Qr(I), Le = ye ? c : Ut(v), me = be ? c : Ut(I);
    Le = Le == a ? E : Le, me = me == a ? E : me;
    var tt = Le == E, dt = me == E, Me = Le == me;
    if (Me && To(v)) {
      if (!To(I))
        return !1;
      ye = !0, tt = !1;
    }
    if (Me && !tt)
      return ee || (ee = new Ft()), ye || xa(v) ? Na(v, I, L, X, de, ee) : vh(v, I, Le, L, X, de, ee);
    if (!(L & i)) {
      var ot = tt && wt.call(v, "__wrapped__"), st = dt && wt.call(I, "__wrapped__");
      if (ot || st) {
        var kt = ot ? v.value() : v, Nt = st ? I.value() : I;
        return ee || (ee = new Ft()), de(kt, Nt, L, X, ee);
      }
    }
    return Me ? (ee || (ee = new Ft()), Sh(v, I, L, X, de, ee)) : !1;
  }
  function yh(v) {
    if (!La(v) || Dh(v))
      return !1;
    var I = Ra(v) ? kd : Q;
    return I.test(an(v));
  }
  function wh(v) {
    return sr(v) && $a(v.length) && !!V[or(v)];
  }
  function _h(v) {
    if (!Nh(v))
      return jd(v);
    var I = [];
    for (var L in Object(v))
      wt.call(v, L) && L != "constructor" && I.push(L);
    return I;
  }
  function Na(v, I, L, X, de, ee) {
    var ye = L & i, be = v.length, Le = I.length;
    if (be != Le && !(ye && Le > be))
      return !1;
    var me = ee.get(v);
    if (me && ee.get(I))
      return me == I;
    var tt = -1, dt = !0, Me = L & o ? new Jr() : void 0;
    for (ee.set(v, I), ee.set(I, v); ++tt < be; ) {
      var ot = v[tt], st = I[tt];
      if (X)
        var kt = ye ? X(st, ot, tt, I, v, ee) : X(ot, st, tt, v, I, ee);
      if (kt !== void 0) {
        if (kt)
          continue;
        dt = !1;
        break;
      }
      if (Me) {
        if (!se(I, function(Nt, ln) {
          if (!Ue(Me, ln) && (ot === Nt || de(ot, Nt, L, X, ee)))
            return Me.push(ln);
        })) {
          dt = !1;
          break;
        }
      } else if (!(ot === st || de(ot, st, L, X, ee))) {
        dt = !1;
        break;
      }
    }
    return ee.delete(v), ee.delete(I), dt;
  }
  function vh(v, I, L, X, de, ee, ye) {
    switch (L) {
      case K:
        if (v.byteLength != I.byteLength || v.byteOffset != I.byteOffset)
          return !1;
        v = v.buffer, I = I.buffer;
      case Y:
        return !(v.byteLength != I.byteLength || !ee(new Sa(v), new Sa(I)));
      case l:
      case u:
      case y:
        return ba(+v, +I);
      case h:
        return v.name == I.name && v.message == I.message;
      case R:
      case j:
        return v == I + "";
      case f:
        var be = ut;
      case O:
        var Le = X & i;
        if (be || (be = ft), v.size != I.size && !Le)
          return !1;
        var me = ye.get(v);
        if (me)
          return me == I;
        X |= o, ye.set(v, I);
        var tt = Na(be(v), be(I), X, de, ee, ye);
        return ye.delete(v), tt;
      case B:
        if (Ao)
          return Ao.call(v) == Ao.call(I);
    }
    return !1;
  }
  function Sh(v, I, L, X, de, ee) {
    var ye = L & i, be = Oa(v), Le = be.length, me = Oa(I), tt = me.length;
    if (Le != tt && !ye)
      return !1;
    for (var dt = Le; dt--; ) {
      var Me = be[dt];
      if (!(ye ? Me in I : wt.call(I, Me)))
        return !1;
    }
    var ot = ee.get(v);
    if (ot && ee.get(I))
      return ot == I;
    var st = !0;
    ee.set(v, I), ee.set(I, v);
    for (var kt = ye; ++dt < Le; ) {
      Me = be[dt];
      var Nt = v[Me], ln = I[Me];
      if (X)
        var Pa = ye ? X(ln, Nt, Me, I, v, ee) : X(Nt, ln, Me, v, I, ee);
      if (!(Pa === void 0 ? Nt === ln || de(Nt, ln, L, X, ee) : Pa)) {
        st = !1;
        break;
      }
      kt || (kt = Me == "constructor");
    }
    if (st && !kt) {
      var ei = v.constructor, ti = I.constructor;
      ei != ti && "constructor" in v && "constructor" in I && !(typeof ei == "function" && ei instanceof ei && typeof ti == "function" && ti instanceof ti) && (st = !1);
    }
    return ee.delete(v), ee.delete(I), st;
  }
  function Oa(v) {
    return gh(v, Lh, Th);
  }
  function Kr(v, I) {
    var L = v.__data__;
    return Ih(I) ? L[typeof I == "string" ? "string" : "hash"] : L.map;
  }
  function Dn(v, I) {
    var L = ke(v, I);
    return yh(L) ? L : void 0;
  }
  function Ah(v) {
    var I = wt.call(v, rn), L = v[rn];
    try {
      v[rn] = void 0;
      var X = !0;
    } catch {
    }
    var de = _a.call(v);
    return X && (I ? v[rn] = L : delete v[rn]), de;
  }
  var Th = Ta ? function(v) {
    return v == null ? [] : (v = Object(v), D(Ta(v), function(I) {
      return Aa.call(v, I);
    }));
  } : xh, Ut = or;
  (wo && Ut(new wo(new ArrayBuffer(1))) != K || rr && Ut(new rr()) != f || _o && Ut(_o.resolve()) != S || vo && Ut(new vo()) != O || So && Ut(new So()) != A) && (Ut = function(v) {
    var I = or(v), L = I == E ? v.constructor : void 0, X = L ? an(L) : "";
    if (X)
      switch (X) {
        case Hd:
          return K;
        case Gd:
          return f;
        case qd:
          return S;
        case zd:
          return O;
        case Vd:
          return A;
      }
    return I;
  });
  function Ch(v, I) {
    return I = I ?? s, !!I && (typeof v == "number" || re.test(v)) && v > -1 && v % 1 == 0 && v < I;
  }
  function Ih(v) {
    var I = typeof v;
    return I == "string" || I == "number" || I == "symbol" || I == "boolean" ? v !== "__proto__" : v === null;
  }
  function Dh(v) {
    return !!wa && wa in v;
  }
  function Nh(v) {
    var I = v && v.constructor, L = typeof I == "function" && I.prototype || Pt;
    return v === L;
  }
  function Oh(v) {
    return _a.call(v);
  }
  function an(v) {
    if (v != null) {
      try {
        return ya.call(v);
      } catch {
      }
      try {
        return v + "";
      } catch {
      }
    }
    return "";
  }
  function ba(v, I) {
    return v === I || v !== v && I !== I;
  }
  var bh = Ia(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Ia : function(v) {
    return sr(v) && wt.call(v, "callee") && !Aa.call(v, "callee");
  }, Qr = Array.isArray;
  function Rh(v) {
    return v != null && $a(v.length) && !Ra(v);
  }
  var To = Bd || Ph;
  function $h(v, I) {
    return Da(v, I);
  }
  function Ra(v) {
    if (!La(v))
      return !1;
    var I = or(v);
    return I == w || I == m || I == p || I == T;
  }
  function $a(v) {
    return typeof v == "number" && v > -1 && v % 1 == 0 && v <= s;
  }
  function La(v) {
    var I = typeof v;
    return v != null && (I == "object" || I == "function");
  }
  function sr(v) {
    return v != null && typeof v == "object";
  }
  var xa = d ? Ae(d) : wh;
  function Lh(v) {
    return Rh(v) ? mh(v) : _h(v);
  }
  function xh() {
    return [];
  }
  function Ph() {
    return !1;
  }
  e.exports = $h;
})(Pi, Pi.exports);
var wv = Pi.exports;
Object.defineProperty(Hr, "__esModule", { value: !0 });
Hr.DownloadedUpdateHelper = void 0;
Hr.createTempUpdateFile = Tv;
const _v = Jn, vv = xt, ec = wv, un = en, Bn = fe;
class Sv {
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
    return Bn.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, n, r, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return ec(this.versionInfo, n) && ec(this.fileInfo.info, r.info) && await (0, un.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(r, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, n, r, i, o, s) {
    this._file = t, this._packageFile = n, this.versionInfo = r, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, s && await (0, un.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, un.emptyDir)(this.cacheDirForPendingUpdate);
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
    if (!await (0, un.pathExists)(r))
      return null;
    let o;
    try {
      o = await (0, un.readJson)(r);
    } catch (l) {
      let u = "No cached update info available";
      return l.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), u += ` (error on read: ${l.message})`), n.info(u), null;
    }
    const s = o == null ? void 0 : o.fileName;
    if (!(typeof s == "string" && s.length > 0 && Bn.basename(s) === s))
      return n.warn("Cached update info is corrupted: invalid fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return n.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const c = Bn.join(this.cacheDirForPendingUpdate, s);
    if (!await (0, un.pathExists)(c))
      return n.info("Cached update file doesn't exist"), null;
    const p = await Av(c);
    return t.info.sha512 !== p ? (n.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${p}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, c);
  }
  getUpdateInfoFile() {
    return Bn.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Hr.DownloadedUpdateHelper = Sv;
function Av(e, t = "sha512", n = "base64", r) {
  return new Promise((i, o) => {
    const s = (0, _v.createHash)(t);
    s.on("error", o).setEncoding(n), (0, vv.createReadStream)(e, {
      ...r,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      s.end(), i(s.read());
    }).pipe(s, { end: !1 });
  });
}
async function Tv(e, t, n) {
  let r = 0, i = Bn.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, un.unlink)(i), i;
    } catch (s) {
      if (s.code === "ENOENT")
        return i;
      n.warn(`Error on remove temp update file: ${s}`), i = Bn.join(t, `${r++}-${e}`);
    }
  return i;
}
var no = {}, aa = {};
Object.defineProperty(aa, "__esModule", { value: !0 });
aa.getAppCacheDir = Iv;
const Go = fe, Cv = Mi;
function Iv() {
  const e = (0, Cv.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || Go.join(e, "AppData", "Local") : process.platform === "darwin" ? t = Go.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || Go.join(e, ".cache"), t;
}
Object.defineProperty(no, "__esModule", { value: !0 });
no.ElectronAppAdapter = void 0;
const tc = fe, Dv = aa;
class Nv {
  constructor(t = wn.app) {
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
    return this.isPackaged ? tc.join(process.resourcesPath, "app-update.yml") : tc.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, Dv.getAppCacheDir)();
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
no.ElectronAppAdapter = Nv;
var ld = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = n;
  const t = Oe;
  e.NET_SESSION_NAME = "electron-updater";
  function n() {
    return wn.session.fromPartition(e.NET_SESSION_NAME, {
      cache: !1
    });
  }
  class r extends t.HttpExecutor {
    constructor(o) {
      super(), this.proxyLoginCallback = o, this.cachedSession = null;
    }
    async download(o, s, a) {
      return await a.cancellationToken.createPromise((c, p, l) => {
        const u = {
          headers: a.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, u), (0, t.configureRequestOptions)(u), this.doDownload(u, {
          destination: s,
          options: a,
          onCancel: l,
          callback: (h) => {
            h == null ? c(s) : p(h);
          },
          responseHandler: null
        }, 0);
      });
    }
    createRequest(o, s) {
      o.headers && o.headers.Host && (o.host = o.headers.Host, delete o.headers.Host), this.cachedSession == null && (this.cachedSession = n());
      const a = wn.net.request({
        ...o,
        session: this.cachedSession
      });
      return a.on("response", s), this.proxyLoginCallback != null && a.on("login", this.proxyLoginCallback), a;
    }
    addRedirectHandlers(o, s, a, c, p) {
      o.on("redirect", (l, u, h) => {
        o.abort(), c > this.maxRedirects ? a(this.createMaxRedirectError()) : p(t.HttpExecutor.prepareRedirectUrlOptions(h, s));
      });
    }
  }
  e.ElectronHttpExecutor = r;
})(ld);
var Gr = {}, yt = {};
Object.defineProperty(yt, "__esModule", { value: !0 });
yt.newBaseUrl = Ov;
yt.newUrlFromBase = bv;
yt.getChannelFilename = Rv;
const cd = Qt;
function Ov(e) {
  const t = new cd.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function bv(e, t, n = !1) {
  const r = new cd.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? r.search = i : n && (r.search = `noCache=${Date.now().toString(32)}`), r;
}
function Rv(e) {
  return `${e}.yml`;
}
var Ie = {}, $v = "[object Symbol]", ud = /[\\^$.*+?()[\]{}|]/g, Lv = RegExp(ud.source), xv = typeof Ve == "object" && Ve && Ve.Object === Object && Ve, Pv = typeof self == "object" && self && self.Object === Object && self, Fv = xv || Pv || Function("return this")(), Uv = Object.prototype, kv = Uv.toString, nc = Fv.Symbol, rc = nc ? nc.prototype : void 0, ic = rc ? rc.toString : void 0;
function Mv(e) {
  if (typeof e == "string")
    return e;
  if (jv(e))
    return ic ? ic.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function Bv(e) {
  return !!e && typeof e == "object";
}
function jv(e) {
  return typeof e == "symbol" || Bv(e) && kv.call(e) == $v;
}
function Hv(e) {
  return e == null ? "" : Mv(e);
}
function Gv(e) {
  return e = Hv(e), e && Lv.test(e) ? e.replace(ud, "\\$&") : e;
}
var fd = Gv;
Object.defineProperty(Ie, "__esModule", { value: !0 });
Ie.Provider = void 0;
Ie.findFile = Yv;
Ie.parseUpdateInfo = Xv;
Ie.getFileList = dd;
Ie.resolveFiles = Jv;
const Zt = Oe, qv = Fe, zv = Qt, Fi = yt, Vv = fd;
class Wv {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  // By default, the blockmap file is in the same directory as the main file
  // But some providers may have a different blockmap file, so we need to override this method
  getBlockMapFiles(t, n, r, i = null) {
    const o = (0, Fi.newUrlFromBase)(`${t.pathname}.blockmap`, t);
    return [(0, Fi.newUrlFromBase)(`${t.pathname.replace(new RegExp(Vv(r), "g"), n)}.blockmap`, i ? new zv.URL(i) : t), o];
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
    return this.requestHeaders == null ? n != null && (r.headers = n) : r.headers = n == null ? this.requestHeaders : { ...this.requestHeaders, ...n }, (0, Zt.configureRequestUrl)(t, r), r;
  }
}
Ie.Provider = Wv;
function Yv(e, t, n) {
  var r;
  if (e.length === 0)
    throw (0, Zt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const i = e.filter((s) => s.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`)), o = (r = i.find((s) => [s.url.pathname, s.info.url].some((a) => a.includes(process.arch)))) !== null && r !== void 0 ? r : i.shift();
  return o || (n == null ? e[0] : e.find((s) => !n.some((a) => s.url.pathname.toLowerCase().endsWith(`.${a.toLowerCase()}`))));
}
function Xv(e, t, n) {
  if (e == null)
    throw (0, Zt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let r;
  try {
    r = (0, qv.load)(e);
  } catch (i) {
    throw (0, Zt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return r;
}
function dd(e) {
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
  throw (0, Zt.newError)(`No files provided: ${(0, Zt.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function Jv(e, t, n = (r) => r) {
  const i = dd(e).map((a) => {
    if (a.sha2 == null && a.sha512 == null)
      throw (0, Zt.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, Zt.safeStringifyJson)(a)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, Fi.newUrlFromBase)(n(a.url), t),
      info: a
    };
  }), o = e.packages, s = o == null ? null : o[process.arch] || o.ia32;
  return s != null && (i[0].packageInfo = {
    ...s,
    path: (0, Fi.newUrlFromBase)(n(s.path), t).href
  }), i;
}
Object.defineProperty(Gr, "__esModule", { value: !0 });
Gr.GenericProvider = void 0;
const oc = Oe, qo = yt, zo = Ie;
class Zv extends zo.Provider {
  constructor(t, n, r) {
    super(r), this.configuration = t, this.updater = n, this.baseUrl = (0, qo.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, qo.getChannelFilename)(this.channel), n = (0, qo.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let r = 0; ; r++)
      try {
        return (0, zo.parseUpdateInfo)(await this.httpRequest(n), t, n);
      } catch (i) {
        if (i instanceof oc.HttpError && i.statusCode === 404)
          throw (0, oc.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
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
    return (0, zo.resolveFiles)(t, this.baseUrl);
  }
}
Gr.GenericProvider = Zv;
var ro = {}, io = {};
Object.defineProperty(io, "__esModule", { value: !0 });
io.BitbucketProvider = void 0;
const sc = Oe, Vo = yt, Wo = Ie;
class Kv extends Wo.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, Vo.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new sc.CancellationToken(), n = (0, Vo.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, Vo.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, void 0, t);
      return (0, Wo.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, sc.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Wo.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: n } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${n}, channel: ${this.channel})`;
  }
}
io.BitbucketProvider = Kv;
var Kt = {};
Object.defineProperty(Kt, "__esModule", { value: !0 });
Kt.GitHubProvider = Kt.BaseGitHubProvider = void 0;
Kt.computeReleaseNotes = pd;
const Rt = Oe, At = ad, Qv = Qt, jn = yt, Ts = Ie, Yo = /\/tag\/(v?[^/]+)$/;
class hd extends Ts.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, jn.newBaseUrl)((0, Rt.githubUrl)(t, n));
    const i = n === "github.com" ? "api.github.com" : n;
    this.baseApiUrl = (0, jn.newBaseUrl)((0, Rt.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const n = this.options.host;
    return n && !["github.com", "api.github.com"].includes(n) ? `/api/v3${t}` : t;
  }
}
Kt.BaseGitHubProvider = hd;
class eS extends hd {
  constructor(t, n, r) {
    super(t, "github.com", r), this.options = t, this.updater = n;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, n, r, i, o;
    const s = new Rt.CancellationToken(), a = await this.httpRequest((0, jn.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, s), c = (0, Rt.parseXml)(a);
    let p = c.element("entry", !1, "No published versions on GitHub"), l = null;
    try {
      if (this.updater.allowPrerelease) {
        const y = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((n = At.prerelease(this.updater.currentVersion)) === null || n === void 0 ? void 0 : n[0]) || null;
        if (y === null)
          l = Yo.exec(p.element("link").attribute("href"))[1];
        else
          for (const _ of c.getElements("entry")) {
            const E = Yo.exec(_.element("link").attribute("href"));
            if (E === null)
              continue;
            const S = E[1];
            if (!At.valid(S))
              continue;
            const T = ((r = At.prerelease(S)) === null || r === void 0 ? void 0 : r[0]) || null, R = !y || ["alpha", "beta"].includes(y), O = T !== null && !["alpha", "beta"].includes(String(T));
            if (R && !O && !(y === "beta" && T === "alpha")) {
              l = S, p = _;
              break;
            }
            if (T && T === y) {
              l = S, p = _;
              break;
            }
          }
      } else {
        l = await this.getLatestTagName(s);
        for (const y of c.getElements("entry")) {
          const _ = Yo.exec(y.element("link").attribute("href"));
          if (_ != null && _[1] === l) {
            p = y;
            break;
          }
        }
      }
    } catch (y) {
      throw (0, Rt.newError)(`Cannot parse releases feed: ${y.stack || y.message},
XML:
${a}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (l == null)
      throw (0, Rt.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let u, h = "", w = "";
    const m = async (y) => {
      h = (0, jn.getChannelFilename)(y), w = (0, jn.newUrlFromBase)(this.getBaseDownloadPath(String(l), h), this.baseUrl);
      const _ = this.createRequestOptions(w);
      try {
        return await this.executor.request(_, s);
      } catch (E) {
        throw E instanceof Rt.HttpError && E.statusCode === 404 ? (0, Rt.newError)(`Cannot find ${h} in the latest release artifacts (${w}): ${E.stack || E.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : E;
      }
    };
    try {
      let y = this.channel;
      this.updater.allowPrerelease && (!((i = At.prerelease(l)) === null || i === void 0) && i[0]) && (y = this.getCustomChannelName(String((o = At.prerelease(l)) === null || o === void 0 ? void 0 : o[0]))), u = await m(y);
    } catch (y) {
      if (this.updater.allowPrerelease)
        u = await m(this.getDefaultChannelName());
      else
        throw y;
    }
    const f = (0, Ts.parseUpdateInfo)(u, h, w);
    return f.releaseName == null && (f.releaseName = p.elementValueOrEmpty("title")), f.releaseNotes == null && (f.releaseNotes = pd(this.updater.currentVersion, this.updater.fullChangelog, c, p)), {
      tag: l,
      ...f
    };
  }
  async getLatestTagName(t) {
    const n = this.options, r = n.host == null || n.host === "github.com" ? (0, jn.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new Qv.URL(`${this.computeGithubBasePath(`/repos/${n.owner}/${n.repo}/releases`)}/latest`, this.baseApiUrl);
    try {
      const i = await this.httpRequest(r, { Accept: "application/json" }, t);
      return i == null ? null : JSON.parse(i).tag_name;
    } catch (i) {
      throw (0, Rt.newError)(`Unable to find latest version on GitHub (${r}), please ensure a production release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return `/${this.options.owner}/${this.options.repo}/releases`;
  }
  resolveFiles(t) {
    return (0, Ts.resolveFiles)(t, this.baseUrl, (n) => this.getBaseDownloadPath(t.tag, n.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, n) {
    return `${this.basePath}/download/${t}/${n}`;
  }
}
Kt.GitHubProvider = eS;
function ac(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function pd(e, t, n, r) {
  if (!t)
    return ac(r);
  const i = /\/tag\/v?([^/]+)$/;
  let o;
  try {
    o = i.exec(r.element("link").attribute("href"))[1], o = At.valid(o) ? o : void 0;
  } catch {
  }
  if (o == null)
    return null;
  const s = [];
  for (const a of n.getElements("entry")) {
    let c;
    try {
      const u = i.exec(a.element("link").attribute("href"));
      if (!u)
        continue;
      c = u[1];
    } catch {
      continue;
    }
    if (!At.valid(c))
      continue;
    const p = At.gt(c, e.raw), l = At.lte(c, o);
    p && l && s.push({
      version: c,
      note: ac(a)
    });
  }
  return s.sort((a, c) => At.rcompare(a.version, c.version));
}
var oo = {};
Object.defineProperty(oo, "__esModule", { value: !0 });
oo.GitLabProvider = void 0;
const xe = Oe, Xo = Qt, tS = fd, pi = yt, Jo = Ie;
class nS extends Jo.Provider {
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
    this.baseApiUrl = (0, pi.newBaseUrl)(`https://${o}/api/v4`);
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
    const t = new xe.CancellationToken(), n = (0, pi.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl), r = { Accept: "application/json", ...this.setAuthHeaderForToken(this.options.token || null) };
    let i;
    try {
      i = await this.httpRequest(n, r, t);
    } catch (w) {
      throw (0, xe.newError)(`Unable to find latest release on GitLab (${n}): ${w.stack || w.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
    if (!i)
      throw (0, xe.newError)("No published releases on GitLab", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let o;
    try {
      o = JSON.parse(i);
    } catch (w) {
      throw (0, xe.newError)(`Unable to parse latest release response from GitLab (${n}): response was not valid JSON: ${w.stack || w.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
    if (o.upcoming_release)
      throw (0, xe.newError)("Latest GitLab release is scheduled but not yet published", "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    const s = o.tag_name;
    let a = null, c = "", p = null;
    const l = async (w) => {
      c = (0, pi.getChannelFilename)(w);
      const m = o.assets.links.find((_) => _.name === c);
      if (!m)
        throw (0, xe.newError)(`Cannot find ${c} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      p = new Xo.URL(m.direct_asset_url);
      const f = this.setAuthHeaderForToken(this.options.token || null), y = Object.keys(f).length ? f : void 0;
      try {
        const _ = await this.httpRequest(p, y, t);
        if (!_)
          throw (0, xe.newError)(`Empty response from ${p}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        return _;
      } catch (_) {
        throw _ instanceof xe.HttpError && _.statusCode === 404 ? (0, xe.newError)(`Cannot find ${c} in the latest release artifacts (${p}): ${_.stack || _.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : _;
      }
    };
    try {
      a = await l(this.channel);
    } catch (w) {
      if (this.channel !== this.getDefaultChannelName())
        a = await l(this.getDefaultChannelName());
      else
        throw w;
    }
    if (!a)
      throw (0, xe.newError)(`Unable to parse channel data from ${c}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    const u = (0, Jo.parseUpdateInfo)(a, c, p);
    u.releaseName == null && (u.releaseName = o.name), u.releaseNotes == null && (u.releaseNotes = o.description || null);
    const h = {
      tag: s,
      assets: this.convertAssetsToMap(o.assets),
      ...u
    };
    return this.cachedLatestVersion = h, h;
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
        return new Xo.URL(o);
    }
    return null;
  }
  async fetchReleaseInfoByVersion(t) {
    const n = new xe.CancellationToken(), r = [`v${t}`, t];
    for (const i of r) {
      const o = (0, pi.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(i)}`, this.baseApiUrl);
      try {
        const s = { Accept: "application/json", ...this.setAuthHeaderForToken(this.options.token || null) }, a = await this.httpRequest(o, s, n);
        if (a)
          return JSON.parse(a);
      } catch (s) {
        if (s instanceof xe.HttpError && s.statusCode === 404)
          continue;
        throw (0, xe.newError)(`Unable to find release ${i} on GitLab (${o}): ${s.stack || s.message}`, "ERR_UPDATER_RELEASE_NOT_FOUND");
      }
    }
    throw (0, xe.newError)(`Unable to find release with version ${t} (tried: ${r.join(", ")}) on GitLab`, "ERR_UPDATER_RELEASE_NOT_FOUND");
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
      const c = r.replace(new RegExp(tS(n), "g"), t);
      o = this.findBlockMapInAssets(a, c);
    }
    return [o, i];
  }
  async getBlockMapFiles(t, n, r, i = null) {
    if (this.options.uploadTarget === "project_upload") {
      const o = t.pathname.split("/").pop() || "", [s, a] = await this.findBlockMapUrlsFromAssets(n, r, o);
      if (!a)
        throw (0, xe.newError)(`Cannot find blockmap file for ${r} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      if (!s)
        throw (0, xe.newError)(`Cannot find blockmap file for ${n} in GitLab assets`, "ERR_UPDATER_BLOCKMAP_FILE_NOT_FOUND");
      return [s, a];
    } else
      return super.getBlockMapFiles(t, n, r, i);
  }
  resolveFiles(t) {
    return (0, Jo.getFileList)(t).map((n) => {
      const i = [
        n.url,
        // Original filename
        this.normalizeFilename(n.url)
        // Normalized filename (spaces/underscores → dashes)
      ].find((s) => t.assets.has(s)), o = i ? t.assets.get(i) : void 0;
      if (!o)
        throw (0, xe.newError)(`Cannot find asset "${n.url}" in GitLab release assets. Available assets: ${Array.from(t.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Xo.URL(o),
        info: n
      };
    });
  }
  toString() {
    return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
  }
}
oo.GitLabProvider = nS;
var so = {};
Object.defineProperty(so, "__esModule", { value: !0 });
so.KeygenProvider = void 0;
const lc = Oe, Zo = yt, Ko = Ie;
class rS extends Ko.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, Zo.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new lc.CancellationToken(), n = (0, Zo.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, Zo.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, Ko.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, lc.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Ko.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: n, platform: r } = this.configuration;
    return `Keygen (account: ${t}, product: ${n}, platform: ${r}, channel: ${this.channel})`;
  }
}
so.KeygenProvider = rS;
var ao = {};
Object.defineProperty(ao, "__esModule", { value: !0 });
ao.PrivateGitHubProvider = void 0;
const On = Oe, iS = Fe, oS = fe, cc = Qt, uc = yt, sS = Kt, aS = Ie;
class lS extends sS.BaseGitHubProvider {
  constructor(t, n, r, i) {
    super(t, "api.github.com", i), this.updater = n, this.token = r;
  }
  createRequestOptions(t, n) {
    const r = super.createRequestOptions(t, n);
    return r.redirect = "manual", r;
  }
  async getLatestVersion() {
    const t = new On.CancellationToken(), n = (0, uc.getChannelFilename)(this.getDefaultChannelName()), r = await this.getLatestVersionInfo(t), i = r.assets.find((a) => a.name === n);
    if (i == null)
      throw (0, On.newError)(`Cannot find ${n} in the release ${r.html_url || r.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new cc.URL(i.url);
    let s;
    try {
      s = (0, iS.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
    } catch (a) {
      throw a instanceof On.HttpError && a.statusCode === 404 ? (0, On.newError)(`Cannot find ${n} in the latest release artifacts (${o}): ${a.stack || a.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : a;
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
    const i = (0, uc.newUrlFromBase)(r, this.baseUrl);
    try {
      const o = JSON.parse(await this.httpRequest(i, this.configureHeaders("application/vnd.github.v3+json"), t));
      if (n) {
        const s = o.filter((a) => !a.draft);
        return s.find((a) => a.prerelease) || s[0];
      } else
        return o;
    } catch (o) {
      throw (0, On.newError)(`Unable to find latest version on GitHub (${i}), please ensure a production release exists: ${o.stack || o.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  get basePath() {
    return this.computeGithubBasePath(`/repos/${this.options.owner}/${this.options.repo}/releases`);
  }
  resolveFiles(t) {
    return (0, aS.getFileList)(t).map((n) => {
      const r = oS.posix.basename(n.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === r);
      if (i == null)
        throw (0, On.newError)(`Cannot find asset "${r}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new cc.URL(i.url),
        info: n
      };
    });
  }
}
ao.PrivateGitHubProvider = lS;
Object.defineProperty(ro, "__esModule", { value: !0 });
ro.isUrlProbablySupportMultiRangeRequests = md;
ro.createClient = pS;
const mi = Oe, cS = io, fc = Gr, uS = Kt, fS = oo, dS = so, hS = ao;
function md(e) {
  return !e.includes("s3.amazonaws.com");
}
function pS(e, t, n) {
  if (typeof e == "string")
    throw (0, mi.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const r = e.provider;
  switch (r) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new uS.GitHubProvider(i, t, n) : new hS.PrivateGitHubProvider(i, t, o, n);
    }
    case "bitbucket":
      return new cS.BitbucketProvider(e, t, n);
    case "gitlab":
      return new fS.GitLabProvider(e, t, n);
    case "keygen":
      return new dS.KeygenProvider(e, t, n);
    case "s3":
    case "spaces":
      return new fc.GenericProvider({
        provider: "generic",
        url: (0, mi.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...n,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new fc.GenericProvider(i, t, {
        ...n,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && md(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, mi.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, n);
    }
    default:
      throw (0, mi.newError)(`Unsupported provider: ${r}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var lo = {}, qr = {}, er = {}, Cn = {};
Object.defineProperty(Cn, "__esModule", { value: !0 });
Cn.OperationKind = void 0;
Cn.computeOperations = mS;
var mn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(mn || (Cn.OperationKind = mn = {}));
function mS(e, t, n) {
  const r = hc(e.files), i = hc(t.files);
  let o = null;
  const s = t.files[0], a = [], c = s.name, p = r.get(c);
  if (p == null)
    throw new Error(`no file ${c} in old blockmap`);
  const l = i.get(c);
  let u = 0;
  const { checksumToOffset: h, checksumToOldSize: w } = ES(r.get(c), p.offset, n);
  let m = s.offset;
  for (let f = 0; f < l.checksums.length; m += l.sizes[f], f++) {
    const y = l.sizes[f], _ = l.checksums[f];
    let E = h.get(_);
    E != null && w.get(_) !== y && (n.warn(`Checksum ("${_}") matches, but size differs (old: ${w.get(_)}, new: ${y})`), E = void 0), E === void 0 ? (u++, o != null && o.kind === mn.DOWNLOAD && o.end === m ? o.end += y : (o = {
      kind: mn.DOWNLOAD,
      start: m,
      end: m + y
      // oldBlocks: null,
    }, dc(o, a, _, f))) : o != null && o.kind === mn.COPY && o.end === E ? o.end += y : (o = {
      kind: mn.COPY,
      start: E,
      end: E + y
      // oldBlocks: [checksum]
    }, dc(o, a, _, f));
  }
  return u > 0 && n.info(`File${s.name === "file" ? "" : " " + s.name} has ${u} changed blocks`), a;
}
const gS = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function dc(e, t, n, r) {
  if (gS && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((s, a) => s < a ? s : a);
      throw new Error(`operation (block index: ${r}, checksum: ${n}, kind: ${mn[e.kind]}) overlaps previous operation (checksum: ${n}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function ES(e, t, n) {
  const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let s = 0; s < e.checksums.length; s++) {
    const a = e.checksums[s], c = e.sizes[s], p = i.get(a);
    if (p === void 0)
      r.set(a, o), i.set(a, c);
    else if (n.debug != null) {
      const l = p === c ? "(same size)" : `(size: ${p}, this size: ${c})`;
      n.debug(`${a} duplicated in blockmap ${l}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += c;
  }
  return { checksumToOffset: r, checksumToOldSize: i };
}
function hc(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.set(n.name, n);
  return t;
}
Object.defineProperty(er, "__esModule", { value: !0 });
er.DataSplitter = void 0;
er.copyData = gd;
const gi = Oe, yS = xt, wS = xr, _S = Cn, Cs = Buffer.from(`\r
\r
`), pc = Buffer.from(`

`), vS = Cs.length - 1, SS = 4, AS = 3;
function TS(e) {
  const t = e.indexOf(Cs), n = e.indexOf(pc);
  return n !== -1 && (t === -1 || n < t) ? { end: n + pc.length, lineFeedOnly: !0 } : t !== -1 ? { end: t + Cs.length, lineFeedOnly: !1 } : null;
}
var Ht;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(Ht || (Ht = {}));
function gd(e, t, n, r, i) {
  const o = (0, yS.createReadStream)("", {
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
class CS extends wS.Writable {
  constructor(t, n, r, i, o, s, a, c) {
    super(), this.out = t, this.options = n, this.partIndexToTaskIndex = r, this.partIndexToLength = o, this.finishHandler = s, this.grandTotalBytes = a, this.onProgress = c, this.start = Date.now(), this.nextUpdate = this.start + 1e3, this.transferred = 0, this.delta = 0, this.partIndex = -1, this.headerListTail = null, this.readState = Ht.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryTextLength = i.length, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
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
      throw (0, gi.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
    if (this.ignoreByteCount > 0) {
      const r = Math.min(this.ignoreByteCount, t.length);
      this.ignoreByteCount -= r, n = r;
    } else if (this.remainingPartDataCount > 0) {
      const r = Math.min(this.remainingPartDataCount, t.length);
      this.remainingPartDataCount -= r, await this.processPartData(t, 0, r), n = r;
    }
    if (n !== t.length) {
      if (this.readState === Ht.HEADER) {
        const r = this.searchHeaderListEnd(t, n);
        if (r === -1)
          return;
        n = r, this.readState = Ht.BODY;
      }
      for (; ; ) {
        if (this.readState === Ht.BODY)
          this.readState = Ht.INIT;
        else {
          this.partIndex++;
          let s = this.partIndexToTaskIndex.get(this.partIndex);
          if (s == null)
            if (this.isFinished)
              s = this.options.end;
            else
              throw (0, gi.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (a < s)
            await this.copyExistingData(a, s);
          else if (a > s)
            throw (0, gi.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
          if (this.isFinished) {
            this.onPartEnd(), this.finishHandler();
            return;
          }
          if (n = this.searchHeaderListEnd(t, n), n === -1) {
            this.readState = Ht.HEADER;
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
        if (s.kind !== _S.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        gd(s, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, n) {
    const r = this.headerListTail, i = r == null ? 0 : r.length, o = r == null ? t.subarray(n) : Buffer.concat([r, t.subarray(n)]), s = TS(o);
    return s != null ? (this.headerListTail = null, this.boundaryLength = this.boundaryTextLength + (s.lineFeedOnly ? AS : SS), n + s.end - i) : (this.headerListTail = Buffer.from(o.subarray(Math.max(0, o.length - vS))), -1);
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, gi.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
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
er.DataSplitter = CS;
var co = {};
Object.defineProperty(co, "__esModule", { value: !0 });
co.executeTasksUsingMultipleRangeRequests = IS;
co.checkIsRangesSupported = Ds;
const Is = Oe, mc = er, gc = Cn;
function IS(e, t, n, r, i) {
  const o = (s) => {
    if (s >= t.length) {
      e.fileMetadataBuffer != null && n.write(e.fileMetadataBuffer), n.end();
      return;
    }
    const a = s + 1e3;
    DS(e, {
      tasks: t,
      start: s,
      end: Math.min(t.length, a),
      oldFileFd: r
    }, n, () => o(a), i);
  };
  return o;
}
function DS(e, t, n, r, i) {
  let o = "bytes=", s = 0, a = 0;
  const c = /* @__PURE__ */ new Map(), p = [];
  for (let h = t.start; h < t.end; h++) {
    const w = t.tasks[h];
    w.kind === gc.OperationKind.DOWNLOAD && (o += `${w.start}-${w.end - 1}, `, c.set(s, h), s++, p.push(w.end - w.start), a += w.end - w.start);
  }
  if (s <= 1) {
    const h = (w) => {
      if (w >= t.end) {
        r();
        return;
      }
      const m = t.tasks[w++];
      if (m.kind === gc.OperationKind.COPY)
        (0, mc.copyData)(m, n, t.oldFileFd, i, () => h(w));
      else {
        const f = e.createRequestOptions();
        f.headers.Range = `bytes=${m.start}-${m.end - 1}`;
        const y = e.httpExecutor.createRequest(f, (_) => {
          _.on("error", i), Ds(_, i) && (_.pipe(n, {
            end: !1
          }), _.once("end", () => h(w)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(y, i), y.end();
      }
    };
    h(t.start);
    return;
  }
  const l = e.createRequestOptions();
  l.headers.Range = o.substring(0, o.length - 2);
  const u = e.httpExecutor.createRequest(l, (h) => {
    if (!Ds(h, i))
      return;
    const w = (0, Is.safeGetHeader)(h, "content-type"), m = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(w);
    if (m == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${w}"`));
      return;
    }
    let f = !1, y = null;
    const _ = () => {
      f = !0, y != null && (clearTimeout(y), y = null), r();
    }, E = new mc.DataSplitter(n, t, c, m[1] || m[2], p, _, a, e.options.onProgress);
    E.on("error", i), h.pipe(E), h.on("end", () => {
      f || (y = setTimeout(() => {
        y = null, !f && (u.abort(), i(new Error("Response ends without calling any handlers")));
      }, 1e4));
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(u, i), u.end();
}
function Ds(e, t) {
  if (e.statusCode >= 400)
    return t((0, Is.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const n = (0, Is.safeGetHeader)(e, "accept-ranges");
    if (n == null || n === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var uo = {};
Object.defineProperty(uo, "__esModule", { value: !0 });
uo.ProgressDifferentialDownloadCallbackTransform = void 0;
const NS = xr;
var Hn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Hn || (Hn = {}));
class OS extends NS.Transform {
  constructor(t, n, r) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = Hn.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == Hn.COPY) {
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
    this.operationType = Hn.COPY;
  }
  beginRangeDownload() {
    this.operationType = Hn.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
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
uo.ProgressDifferentialDownloadCallbackTransform = OS;
Object.defineProperty(qr, "__esModule", { value: !0 });
qr.DifferentialDownloader = void 0;
const cr = Oe, Qo = en, bS = xt, RS = er, $S = Qt, Ei = Cn, Ec = co, LS = uo;
class xS {
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
    const r = this.logger, i = (0, Ei.computeOperations)(t, n, r);
    r.debug != null && r.debug(JSON.stringify(i, null, 2));
    let o = 0, s = 0;
    for (const c of i) {
      const p = c.end - c.start;
      c.kind === Ei.OperationKind.DOWNLOAD ? o += p : s += p;
    }
    const a = this.blockAwareFileInfo.size;
    if (o + s + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== a)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${s}, newSize: ${a}`);
    return r.info(`Full: ${yc(a)}, To download: ${yc(o)} (${Math.round(o / (a / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const n = [], r = () => Promise.all(n.map((i) => (0, Qo.close)(i.descriptor).catch((o) => {
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
    const r = await (0, Qo.open)(this.options.oldFile, "r");
    n.push({ descriptor: r, path: this.options.oldFile });
    const i = await (0, Qo.open)(this.options.newFile, "w");
    n.push({ descriptor: i, path: this.options.newFile });
    const o = (0, bS.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((s, a) => {
      const c = [];
      let p;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const _ = [];
        let E = 0;
        for (const T of t)
          T.kind === Ei.OperationKind.DOWNLOAD && (_.push(T.end - T.start), E += T.end - T.start);
        const S = {
          expectedByteCounts: _,
          grandTotal: E
        };
        p = new LS.ProgressDifferentialDownloadCallbackTransform(S, this.options.cancellationToken, this.options.onProgress), c.push(p);
      }
      const l = new cr.DigestTransform(this.blockAwareFileInfo.sha512);
      l.isValidateOnEnd = !1, c.push(l), o.on("finish", () => {
        o.close(() => {
          n.splice(1, 1);
          try {
            l.validate();
          } catch (_) {
            a(_);
            return;
          }
          s(void 0);
        });
      }), c.push(o);
      let u = null;
      for (const _ of c)
        _.on("error", a), u == null ? u = _ : u = u.pipe(_);
      const h = c[0];
      let w;
      if (this.options.isUseMultipleRangeRequest) {
        w = (0, Ec.executeTasksUsingMultipleRangeRequests)(this, t, h, r, a), w(0);
        return;
      }
      let m = 0, f = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const y = this.createRequestOptions();
      y.redirect = "manual", w = (_) => {
        var E, S;
        if (_ >= t.length) {
          this.fileMetadataBuffer != null && h.write(this.fileMetadataBuffer), h.end();
          return;
        }
        const T = t[_++];
        if (T.kind === Ei.OperationKind.COPY) {
          p && p.beginFileCopy(), (0, RS.copyData)(T, h, r, a, () => w(_));
          return;
        }
        const R = `bytes=${T.start}-${T.end - 1}`;
        y.headers.range = R, (S = (E = this.logger) === null || E === void 0 ? void 0 : E.debug) === null || S === void 0 || S.call(E, `download range: ${R}`), p && p.beginRangeDownload();
        const O = this.httpExecutor.createRequest(y, (j) => {
          j.on("error", a), j.on("aborted", () => {
            a(new Error("response has been aborted by the server"));
          }), j.statusCode >= 400 && a((0, cr.createHttpError)(j)), j.pipe(h, {
            end: !1
          }), j.once("end", () => {
            p && p.endRangeDownload(), ++m === 100 ? (m = 0, setTimeout(() => w(_), 1e3)) : w(_);
          });
        });
        O.on("redirect", (j, B, P) => {
          this.logger.info(`Redirect to ${PS(P)}`), f = P, (0, cr.configureRequestUrl)(new $S.URL(f), y), O.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(O, a), O.end();
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
        (0, Ec.checkIsRangesSupported)(s, i) && (s.on("error", i), s.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), s.on("data", n), s.on("end", () => r()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
qr.DifferentialDownloader = xS;
function yc(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function PS(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(lo, "__esModule", { value: !0 });
lo.GenericDifferentialDownloader = void 0;
const FS = qr;
class US extends FS.DifferentialDownloader {
  download(t, n) {
    return this.doDownload(t, n);
  }
}
lo.GenericDifferentialDownloader = US;
var tn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = r;
  const t = Oe;
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
})(tn);
Object.defineProperty(Xt, "__esModule", { value: !0 });
Xt.NoOpLogger = Xt.AppUpdater = void 0;
const ze = Oe, kS = Jn, MS = Mi, BS = Qc, nt = en, jS = Fe, es = Ji, at = fe, fn = ad, wc = Hr, HS = no, _c = ld, GS = Gr, ts = ro, ns = Bi, qS = lo, bn = tn;
class la extends BS.EventEmitter {
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
        throw (0, ze.newError)(`Channel must be a string, but got: ${t}`, "ERR_UPDATER_INVALID_CHANNEL");
      if (t.length === 0)
        throw (0, ze.newError)("Channel must be not an empty string", "ERR_UPDATER_INVALID_CHANNEL");
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
    return (0, _c.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new Ed();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new es.Lazy(() => this.loadUpdateConfig());
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
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new bn.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (o) => this.checkIfUpdateSupported(o), this._isUserWithinRollout = (o) => this.isStagingMatch(o), this.clientPromise = null, this.stagingUserIdPromise = new es.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new es.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (o) => {
      this._logger.error(`Error: ${o.stack || o.message}`);
    }), n == null ? (this.app = new HS.ElectronAppAdapter(), this.httpExecutor = new _c.ElectronHttpExecutor((o, s) => this.emit("login", o, s))) : (this.app = n, this.httpExecutor = null);
    const r = this.app.version, i = (0, fn.parse)(r);
    if (i == null)
      throw (0, ze.newError)(`App version is not a valid semver version: "${r}"`, "ERR_UPDATER_INVALID_VERSION");
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
    typeof t == "string" ? r = new GS.GenericProvider({ provider: "generic", url: t }, this, {
      ...n,
      isUseMultipleRangeRequest: (0, ts.isUrlProbablySupportMultiRangeRequests)(t)
    }) : r = (0, ts.createClient)(t, this, n), this.clientPromise = Promise.resolve(r);
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
      const r = la.formatDownloadNotification(n.updateInfo.version, this.app.name, t);
      new wn.Notification(r).show();
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
    const i = await this.stagingUserIdPromise.value, s = ze.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${r}, percentage: ${s}, user id: ${i}`), s < r;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const n = (0, fn.parse)(t.version);
    if (n == null)
      throw (0, ze.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const r = this.currentVersion;
    if ((0, fn.eq)(n, r) || !await Promise.resolve(this.isUpdateSupported(t)) || !await Promise.resolve(this.isUserWithinRollout(t)))
      return !1;
    const o = (0, fn.gt)(n, r), s = (0, fn.lt)(n, r);
    return o ? !0 : this.allowDowngrade && s;
  }
  checkIfUpdateSupported(t) {
    const n = t == null ? void 0 : t.minimumSystemVersion, r = (0, MS.release)();
    if (n)
      try {
        if ((0, fn.lt)(r, n))
          return this._logger.info(`Current OS version ${r} is less than the minimum OS version required ${n} for version ${r}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${r}) with minimum OS version(${n}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((r) => (0, ts.createClient)(r, this, this.createProviderRuntimeOptions())));
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
    const r = new ze.CancellationToken();
    return {
      isUpdateAvailable: !0,
      versionInfo: n,
      updateInfo: n,
      cancellationToken: r,
      downloadPromise: this.autoDownload ? this.downloadUpdate(r) : null
    };
  }
  onUpdateAvailable(t) {
    this._logger.info(`Found version ${t.version} (url: ${(0, ze.asArray)(t.files).map((n) => n.url).join(", ")})`), this.emit("update-available", t);
  }
  /**
   * Start downloading update manually. You can use this method if `autoDownload` option is set to `false`.
   * @returns {Promise<Array<string>>} Paths to downloaded files.
   */
  downloadUpdate(t = new ze.CancellationToken()) {
    const n = this.updateInfoAndProvider;
    if (n == null) {
      const i = new Error("Please check update first");
      return this.dispatchError(i), Promise.reject(i);
    }
    if (this.downloadPromise != null)
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise.then(vc);
    this._logger.info(`Downloading update from ${(0, ze.asArray)(n.info.files).map((i) => i.url).join(", ")}`);
    const r = (i) => {
      if (!(i instanceof ze.CancellationError))
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
    }), this.downloadPromise.then(vc);
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(bn.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, jS.load)(await (0, nt.readFile)(this._appUpdateConfigPath, "utf-8"));
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
    const t = at.join(this.app.userDataPath, ".updaterId");
    try {
      const r = await (0, nt.readFile)(t, "utf-8");
      if (ze.UUID.check(r))
        return r;
      this._logger.warn(`Staging user id file exists, but content was invalid: ${r}`);
    } catch (r) {
      r.code !== "ENOENT" && this._logger.warn(`Couldn't read staging user ID, creating a blank one: ${r}`);
    }
    const n = ze.UUID.v5((0, kS.randomBytes)(4096), ze.UUID.OID);
    this._logger.info(`Generated new staging user ID: ${n}`);
    try {
      await (0, nt.outputFile)(t, n);
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
      const i = at.join(this.app.baseCachePath, n || this.app.name);
      r.debug != null && r.debug(`updater cache dir: ${i}`), t = new wc.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
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
    this.listenerCount(bn.DOWNLOAD_PROGRESS) > 0 && (r.onProgress = (T) => this.emit(bn.DOWNLOAD_PROGRESS, T));
    const i = t.downloadUpdateOptions.updateInfoAndProvider.info, o = i.version, s = n.packageInfo;
    function a() {
      const T = decodeURIComponent(t.fileInfo.url.pathname);
      return T.toLowerCase().endsWith(`.${t.fileExtension.toLowerCase()}`) ? at.basename(T) : at.basename(t.fileInfo.info.url);
    }
    const c = await this.getOrCreateDownloadHelper(), p = c.cacheDirForPendingUpdate;
    await (0, nt.mkdir)(p, { recursive: !0 });
    const l = a();
    let u = at.join(p, l);
    const h = s == null ? null : at.join(p, `package-${o}${at.extname(s.path) || ".7z"}`), w = at.join(p, "current.blockmap"), m = at.join(c.cacheDir, "current.blockmap"), f = async (T) => (await c.setDownloadedFile(u, h, i, n, l, T), await t.done({
      ...i,
      downloadedFile: u
    }), await (0, nt.pathExists)(w) ? await (0, nt.copyFile)(w, m) : t.downloadUpdateOptions.disableDifferentialDownload || await (0, nt.remove)(m), h == null ? { updateFile: u } : { updateFile: u, packageFile: h }), y = this._logger, _ = await c.validateDownloadedPath(u, i, n, y);
    if (_ != null)
      return u = _, await f(!1);
    const E = async () => (await c.clear().catch(() => {
    }), await (0, nt.unlink)(u).catch(() => {
    }));
    await (0, nt.remove)(w);
    const S = await (0, wc.createTempUpdateFile)(`temp-${l}`, p, y);
    try {
      await t.task(S, r, h, E), await (0, ze.retry)(() => (0, nt.rename)(S, u), {
        retries: 60,
        interval: 500,
        shouldRetry: (T) => T instanceof Error && /^EBUSY:/.test(T.message) ? !0 : (y.warn(`Cannot rename temp file to final file: ${T.message || T.stack}`), !1)
      });
    } catch (T) {
      throw await E(), T instanceof ze.CancellationError ? (y.info("cancelled"), this.emit("update-cancelled", i)) : T.code === "ERR_CHECKSUM_MISMATCH" && y.warn(`sha512 checksum mismatch after full download of ${l}: the downloaded file is corrupted or the published update metadata does not match the uploaded file`), T;
    }
    return y.info(`New version ${o} has been downloaded to ${u}`), await f(!0);
  }
  async differentialDownloadInstaller(t, n, r, i, o) {
    let s = !1;
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const a = n.updateInfoAndProvider.provider, c = await a.getBlockMapFiles(t.url, this.app.version, n.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
      this._logger.info(`Download block maps (old: "${c[0]}", new: ${c[1]})`);
      const p = async (f) => {
        const y = await this.httpExecutor.downloadToBuffer(f, {
          headers: n.requestHeaders,
          cancellationToken: n.cancellationToken
        });
        if (y == null || y.length === 0)
          throw new Error(`Blockmap "${f.href}" is empty`);
        try {
          return JSON.parse((0, ns.gunzipSync)(y).toString());
        } catch (_) {
          throw new Error(`Cannot parse blockmap "${f.href}", error: ${_}`);
        }
      }, l = {
        newUrl: t.url,
        oldFile: at.join(this.downloadedUpdateHelper.cacheDir, o),
        logger: this._logger,
        newFile: r,
        isUseMultipleRangeRequest: a.isUseMultipleRangeRequest,
        requestHeaders: n.requestHeaders,
        cancellationToken: n.cancellationToken
      };
      this.listenerCount(bn.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = (f) => this.emit(bn.DOWNLOAD_PROGRESS, f));
      const u = async (f, y) => {
        const _ = at.join(y, "current.blockmap");
        await (0, nt.outputFile)(_, (0, ns.gzipSync)(JSON.stringify(f)));
      }, h = async (f) => {
        const y = at.join(f, "current.blockmap");
        try {
          if (await (0, nt.pathExists)(y))
            return JSON.parse((0, ns.gunzipSync)(await (0, nt.readFile)(y)).toString());
        } catch (_) {
          this._logger.warn(`Cannot parse blockmap "${y}", error: ${_}`);
        }
        return null;
      }, w = await p(c[1]);
      await u(w, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
      let m = await h(this.downloadedUpdateHelper.cacheDir);
      return s = m != null, m == null && (this._logger.info(`No cached blockmap for the old installer, downloading it from "${c[0]}"`), m = await p(c[0])), await new qS.GenericDifferentialDownloader(t.info, this.httpExecutor, l).download(m, w), !1;
    } catch (a) {
      if (a.code === "ERR_CHECKSUM_MISMATCH" && this._logger.warn(`sha512 checksum mismatch after differential download (old blockmap ${s ? "was read from the local cache" : "was downloaded from the server"}): cached "${o}" is likely out of sync with the old blockmap, e.g. because one of them was replaced or evicted independently of the other`), this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), this._testOnlyOptions != null)
        throw a;
      return !0;
    }
  }
}
Xt.AppUpdater = la;
function zS(e) {
  const t = (0, fn.prerelease)(e);
  return t != null && t.length > 0;
}
class Ed {
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
Xt.NoOpLogger = Ed;
function vc({ updateFile: e, packageFile: t }) {
  return t == null ? [e] : [e, t];
}
Object.defineProperty(An, "__esModule", { value: !0 });
An.BaseUpdater = void 0;
const Sc = ki, rs = fe, VS = Xt;
class WS extends VS.AppUpdater {
  constructor(t, n) {
    super(t, n), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, n = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? n : this.autoRunAppAfterInstall) ? setImmediate(() => {
      wn.autoUpdater.emit("before-quit-for-update"), this.app.quit();
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
    return t.split(rs.delimiter).filter((n) => rs.isAbsolute(n)).join(rs.delimiter);
  }
  spawnSyncLog(t, n = [], r = {}) {
    var i;
    this._logger.info(`Executing: ${t} with args: ${n}`);
    const o = { ...process.env, ...r }, s = (0, Sc.spawnSync)(t, n, {
      env: { ...o, PATH: this.sanitizeEnvPath((i = o.PATH) !== null && i !== void 0 ? i : "") },
      encoding: "utf-8",
      shell: !0
    }), { error: a, status: c, stdout: p, stderr: l } = s;
    if (a != null)
      throw this._logger.error(l), a;
    if (c != null && c !== 0)
      throw this._logger.error(l), new Error(`Command ${t} exited with code ${c}`);
    return p.trim();
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
        const a = { stdio: i, env: r, detached: !0 }, c = (0, Sc.spawn)(t, n, a);
        c.on("error", (p) => {
          s(p);
        }), c.unref(), c.pid !== void 0 && o(!0);
      } catch (a) {
        s(a);
      }
    });
  }
}
An.BaseUpdater = WS;
var Dr = {}, zr = {};
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const Rn = en, YS = qr, XS = Bi;
class JS extends YS.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, n = t.size, r = n - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(r, n - 1);
    const i = yd(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await ZS(this.options.oldFile), i);
  }
}
zr.FileWithEmbeddedBlockMapDifferentialDownloader = JS;
function yd(e) {
  return JSON.parse((0, XS.inflateRawSync)(e).toString());
}
async function ZS(e) {
  const t = await (0, Rn.open)(e, "r");
  try {
    const n = (await (0, Rn.fstat)(t)).size, r = Buffer.allocUnsafe(4);
    await (0, Rn.read)(t, r, 0, r.length, n - r.length);
    const i = Buffer.allocUnsafe(r.readUInt32BE(0));
    return await (0, Rn.read)(t, i, 0, i.length, n - r.length - i.length), await (0, Rn.close)(t), yd(i);
  } catch (n) {
    throw await (0, Rn.close)(t), n;
  }
}
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.AppImageUpdater = void 0;
const is = Oe, Ac = ki, KS = en, QS = xt, $n = fe, e1 = An, t1 = zr, n1 = Ie, Tc = tn;
class r1 extends e1.BaseUpdater {
  constructor(t, n) {
    super(t, n);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, n1.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        const s = process.env.APPIMAGE;
        if (s == null)
          throw (0, is.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(r, s, i, n, t)) && await this.httpExecutor.download(r.url, i, o), await (0, KS.chmod)(i, 493);
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
      return this.listenerCount(Tc.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(Tc.DOWNLOAD_PROGRESS, a)), await new t1.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, s).download(), !1;
    } catch (s) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const n = process.env.APPIMAGE;
    if (n == null)
      throw (0, is.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    if (!$n.isAbsolute(n) || n.includes("\0"))
      throw (0, is.newError)(`APPIMAGE env is not a valid absolute path: "${n}"`, "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, QS.unlinkSync)(n);
    let r;
    const i = $n.basename(n), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    $n.basename(o) === i || !/\d+\.\d+\.\d+/.test(i) ? r = n : r = $n.join($n.dirname(n), $n.basename(o)), (0, Ac.execFileSync)("mv", ["-f", o, r]), r !== n && this.emit("appimage-filename-updated", r);
    const s = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(r, [], s) : (s.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, Ac.execFileSync)(r, [], { env: s })), !0;
  }
}
Dr.AppImageUpdater = r1;
var Nr = {}, tr = {};
Object.defineProperty(tr, "__esModule", { value: !0 });
tr.LinuxUpdater = void 0;
const i1 = An, o1 = /^[a-zA-Z0-9_-]+$/;
class s1 extends i1.BaseUpdater {
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
    i && (o1.test(i) ? r = [i] : this._logger.warn(`ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER "${i}" contains unsafe characters. Ignoring override.`));
    for (const a of r)
      if (this.hasCommand(a))
        return a;
    const o = i ? `ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER override "${i}", ` : "", s = t[0];
    return this._logger.warn(`No package manager found in the list: ${o}${t.join(", ")}. Utilizing default: ${s}`), s;
  }
}
tr.LinuxUpdater = s1;
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.DebUpdater = void 0;
const a1 = Ie, Cc = tn, l1 = tr;
class ca extends l1.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, a1.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Cc.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(Cc.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(r.url, i, o);
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
      ca.installWithCommandRunner(i, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
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
Nr.DebUpdater = ca;
var Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.PacmanUpdater = void 0;
const Ic = tn, c1 = Ie, u1 = tr;
class ua extends u1.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, c1.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Ic.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(Ic.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(r.url, i, o);
      }
    });
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    try {
      ua.installWithCommandRunner(n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
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
Or.PacmanUpdater = ua;
var br = {};
Object.defineProperty(br, "__esModule", { value: !0 });
br.RpmUpdater = void 0;
const Dc = tn, f1 = Ie, d1 = tr;
class fa extends d1.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, f1.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Dc.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(Dc.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(r.url, i, o);
      }
    });
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const r = ["zypper", "dnf", "yum", "rpm"], i = this.detectPackageManager(r);
    try {
      fa.installWithCommandRunner(i, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
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
br.RpmUpdater = fa;
var Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.MacUpdater = void 0;
const Nc = Oe, os = en, h1 = xt, Oc = fe, p1 = kh, m1 = Xt, g1 = Ie, bc = ki, Rc = Jn;
class da extends m1.AppUpdater {
  constructor(t, n) {
    super(t, n), this.nativeUpdater = wn.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (r) => {
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
      this.debug("Checking for macOS Rosetta environment"), o = (0, bc.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), r.info(`Checked for macOS Rosetta environment (isRosetta=${o})`);
    } catch (l) {
      r.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${l}`);
    }
    let s = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const u = (0, bc.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      r.info(`Checked 'uname -a': arm64=${u}`), s = s || u;
    } catch (l) {
      r.warn(`uname shell command to check for arm64 failed: ${l}`);
    }
    s = s || process.arch === "arm64" || o, n = da.filterFilesForArch(n, s);
    const a = (0, g1.findFile)(n, "zip", ["pkg", "dmg"]);
    if (a == null)
      throw (0, Nc.newError)(`ZIP file not provided: ${(0, Nc.safeStringifyJson)(n)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const c = t.updateInfoAndProvider.provider, p = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: a,
      downloadUpdateOptions: t,
      task: async (l, u) => {
        const h = Oc.join(this.downloadedUpdateHelper.cacheDir, p), w = () => (0, os.pathExistsSync)(h) ? !t.disableDifferentialDownload : (r.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let m = !0;
        w() && (m = await this.differentialDownloadInstaller(a, t, l, c, p)), m && await this.httpExecutor.download(a.url, l, u);
      },
      done: async (l) => {
        if (!t.disableDifferentialDownload)
          try {
            const u = Oc.join(this.downloadedUpdateHelper.cacheDir, p);
            await (0, os.copyFile)(l.downloadedFile, u);
          } catch (u) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${u.message}`);
          }
        return this.updateDownloaded(a, l);
      }
    });
  }
  async updateDownloaded(t, n) {
    var r;
    const i = n.downloadedFile, o = (r = t.info.size) !== null && r !== void 0 ? r : (await (0, os.stat)(i)).size, s = this._logger, a = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${a})`), this.server = (0, p1.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${a})`), this.server.on("close", () => {
      s.info(`Proxy server for native Squirrel.Mac is closed (${a})`);
    });
    const c = (p) => {
      const l = p.address();
      return typeof l == "string" ? l : `http://127.0.0.1:${l == null ? void 0 : l.port}`;
    };
    return await new Promise((p, l) => {
      const u = (0, Rc.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), h = Buffer.from(`autoupdater:${u}`, "ascii"), w = `/${(0, Rc.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (m, f) => {
        const y = m.url;
        if (s.info(`${y} requested`), y === "/") {
          if (!m.headers.authorization || m.headers.authorization.indexOf("Basic ") === -1) {
            f.statusCode = 401, f.statusMessage = "Invalid Authentication Credentials", f.end(), s.warn("No authenthication info");
            return;
          }
          const S = m.headers.authorization.split(" ")[1], T = Buffer.from(S, "base64").toString("ascii"), [R, O] = T.split(":");
          if (R !== "autoupdater" || O !== u) {
            f.statusCode = 401, f.statusMessage = "Invalid Authentication Credentials", f.end(), s.warn("Invalid authenthication credentials");
            return;
          }
          const j = Buffer.from(`{ "url": "${c(this.server)}${w}" }`);
          f.writeHead(200, { "Content-Type": "application/json", "Content-Length": j.length }), f.end(j);
          return;
        }
        if (!y.startsWith(w)) {
          s.warn(`${y} requested, but not supported`), f.writeHead(404), f.end();
          return;
        }
        s.info(`${w} requested by Squirrel.Mac, pipe ${i}`);
        let _ = !1;
        f.on("finish", () => {
          _ || (this.nativeUpdater.removeListener("error", l), p([]));
        });
        const E = (0, h1.createReadStream)(i);
        E.on("error", (S) => {
          try {
            f.end();
          } catch (T) {
            s.warn(`cannot end response: ${T}`);
          }
          _ = !0, this.nativeUpdater.removeListener("error", l), l(new Error(`Cannot pipe "${i}": ${S}`));
        }), f.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": o
        }), E.pipe(f);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${a})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${c(this.server)}, ${a})`), this.nativeUpdater.setFeedURL({
          url: c(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${h.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(n), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", l), this.nativeUpdater.checkForUpdates()) : p([]);
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
Rr.MacUpdater = da;
var $r = {}, ha = {};
Object.defineProperty(ha, "__esModule", { value: !0 });
ha.verifySignature = y1;
const $c = Oe, wd = ki, E1 = Mi, Lc = fe;
function _d(e, t) {
  return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", e], {
    shell: !0,
    timeout: t
  }];
}
function y1(e, t, n) {
  return new Promise((r, i) => {
    const o = t.replace(/'/g, "''");
    n.info(`Verifying signature ${o}`), (0, wd.execFile)(..._d(`"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`, 20 * 1e3), (s, a, c) => {
      var p;
      try {
        if (s != null || c) {
          ss(n, s, c, i), r(null);
          return;
        }
        const l = w1(a);
        if (l.Status === 0) {
          try {
            const m = Lc.normalize(l.Path), f = Lc.normalize(t);
            if (n.info(`LiteralPath: ${m}. Update Path: ${f}`), m !== f) {
              ss(n, new Error(`LiteralPath of ${m} is different than ${f}`), c, i), r(null);
              return;
            }
          } catch (m) {
            n.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(p = m.message) !== null && p !== void 0 ? p : m.stack}`);
          }
          const h = (0, $c.parseDn)(l.SignerCertificate.Subject);
          let w = !1;
          for (const m of e) {
            const f = (0, $c.parseDn)(m);
            if (f.size ? w = Array.from(f.keys()).every((_) => f.get(_) === h.get(_)) : m === h.get("CN") && (n.warn(`Signature validated using only CN ${m}. Please add your full Distinguished Name (DN) to publisherNames configuration`), w = !0), w) {
              r(null);
              return;
            }
          }
        }
        const u = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(l, (h, w) => h === "RawData" ? void 0 : w, 2);
        n.warn(`Sign verification failed, installer signed with incorrect certificate: ${u}`), r(u);
      } catch (l) {
        ss(n, l, null, i), r(null);
        return;
      }
    });
  });
}
function w1(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const n = t.SignerCertificate;
  return n != null && (delete n.Archived, delete n.Extensions, delete n.Handle, delete n.HasPrivateKey, delete n.SubjectName), t;
}
function ss(e, t, n, r) {
  if (_1()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || n}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, wd.execFileSync)(..._d("ConvertTo-Json test", 10 * 1e3));
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && r(t), n && r(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${n}. Failing signature validation due to unknown stderr.`));
}
function _1() {
  const e = E1.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty($r, "__esModule", { value: !0 });
$r.NsisUpdater = void 0;
const yi = Oe, xc = fe, v1 = An, S1 = zr, Pc = tn, A1 = Ie, T1 = en, C1 = ha, Fc = Qt;
class I1 extends v1.BaseUpdater {
  constructor(t, n) {
    super(t, n), this._verifyUpdateCodeSignature = (r, i) => (0, C1.verifySignature)(r, i, this._logger);
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
    const n = t.updateInfoAndProvider.provider, r = (0, A1.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: r,
      task: async (i, o, s, a) => {
        const c = r.packageInfo, p = c != null && s != null;
        if (p && t.disableWebInstaller)
          throw (0, yi.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !p && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (p || t.disableDifferentialDownload || await this.differentialDownloadInstaller(r, t, i, n, yi.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(r.url, i, o);
        const l = await this.verifySignature(i);
        if (l != null)
          throw await a(), (0, yi.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${l}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (p && await this.differentialDownloadWebPackage(t, c, s, n))
          try {
            await this.httpExecutor.download(new Fc.URL(c.path), s, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: c.sha512
            });
          } catch (u) {
            try {
              await (0, T1.unlink)(s);
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
      this.spawnLog(xc.join(process.resourcesPath, "elevate.exe"), [n].concat(r)).catch((s) => this.dispatchError(s));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), o(), !0) : (this.spawnLog(n, r).catch((s) => {
      const a = s.code;
      this._logger.info(`Cannot run installer: error code: ${a}, error message: "${s.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), a === "UNKNOWN" || a === "EACCES" ? o() : a === "ENOENT" ? wn.shell.openPath(n).catch((c) => this.dispatchError(c)) : this.dispatchError(s);
    }), !0);
  }
  async differentialDownloadWebPackage(t, n, r, i) {
    if (n.blockMapSize == null)
      return !0;
    try {
      const o = {
        newUrl: new Fc.URL(n.path),
        oldFile: xc.join(this.downloadedUpdateHelper.cacheDir, yi.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: r,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(Pc.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(Pc.DOWNLOAD_PROGRESS, s)), await new S1.FileWithEmbeddedBlockMapDifferentialDownloader(n, this.httpExecutor, o).download();
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "win32";
    }
    return !1;
  }
}
$r.NsisUpdater = I1;
(function(e) {
  var t = Ve && Ve.__createBinding || (Object.create ? function(y, _, E, S) {
    S === void 0 && (S = E);
    var T = Object.getOwnPropertyDescriptor(_, E);
    (!T || ("get" in T ? !_.__esModule : T.writable || T.configurable)) && (T = { enumerable: !0, get: function() {
      return _[E];
    } }), Object.defineProperty(y, S, T);
  } : function(y, _, E, S) {
    S === void 0 && (S = E), y[S] = _[E];
  }), n = Ve && Ve.__exportStar || function(y, _) {
    for (var E in y) E !== "default" && !Object.prototype.hasOwnProperty.call(_, E) && t(_, y, E);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const r = en, i = fe;
  var o = An;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return o.BaseUpdater;
  } });
  var s = Xt;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return s.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return s.NoOpLogger;
  } });
  var a = Ie;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return a.Provider;
  } });
  var c = Dr;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return c.AppImageUpdater;
  } });
  var p = Nr;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return p.DebUpdater;
  } });
  var l = Or;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return l.PacmanUpdater;
  } });
  var u = br;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return u.RpmUpdater;
  } });
  var h = Rr;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return h.MacUpdater;
  } });
  var w = $r;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return w.NsisUpdater;
  } }), n(tn, e);
  let m;
  function f() {
    if (process.platform === "win32")
      m = new $r.NsisUpdater();
    else if (process.platform === "darwin")
      m = new Rr.MacUpdater();
    else {
      m = new Dr.AppImageUpdater();
      try {
        const y = i.join(process.resourcesPath, "package-type");
        if (!(0, r.existsSync)(y))
          return m;
        switch ((0, r.readFileSync)(y).toString().trim()) {
          case "deb":
            m = new Nr.DebUpdater();
            break;
          case "rpm":
            m = new br.RpmUpdater();
            break;
          case "pacman":
            m = new Or.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (y) {
        console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", y.message);
      }
    }
    return m;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => m || f()
  });
})(je);
var nr = { exports: {} }, vd = {
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
}, Vr = {};
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
})(Vr);
const D1 = xt, ae = fe, Uc = vd, pa = Vr, N1 = typeof process == "object" && process.platform === "win32", kc = (e) => typeof e == "object" && e !== null, Sd = new Uint32Array(256).map((e, t) => {
  for (let n = 0; n < 8; n++)
    t & 1 ? t = 3988292384 ^ t >>> 1 : t >>>= 1;
  return t >>> 0;
});
function he(e) {
  this.sep = ae.sep, this.fs = D1, kc(e) && kc(e.fs) && typeof e.fs.statSync == "function" && (this.fs = e.fs);
}
var O1 = he;
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
        if (s && s.isFile()) throw pa.FILE_IN_THE_WAY(`"${i}"`);
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
    o.fs.stat(e, function(a, c) {
      if (s && c && c.isDirectory())
        return i(!1);
      var p = ae.dirname(e);
      o.fs.exists(p, function(l) {
        if (!l)
          try {
            o.makeDir(p);
          } catch {
            return i(!1);
          }
        const u = function(h) {
          o.fs.write(h, t, 0, t.length, 0, function(w) {
            o.fs.close(h, function() {
              if (w) return i(!1);
              o.fs.chmod(e, r || 438, function() {
                i(!0);
              });
            });
          });
        };
        o.fs.open(e, "w", 438, function(h, w) {
          h ? o.fs.chmod(e, 438, function() {
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
    let c;
    try {
      c = n.fs.lstatSync(s);
    } catch {
      break;
    }
    if (c.isSymbolicLink()) throw pa.FILE_IN_THE_WAY(`"${s}"`);
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
  function o(s, a, c, p) {
    let l = [];
    return t.fs.readdirSync(s).forEach(function(u) {
      const h = ae.join(s, u);
      if (i(h)) return;
      const w = t.fs.statSync(h);
      if (l.push(ae.normalize(h) + (w.isDirectory() ? t.sep : "")), w.isDirectory() && c) {
        const m = t.fs.realpathSync(h);
        p.has(m) || (p.add(m), l = l.concat(o(h, a, c, p)));
      }
    }), l;
  }
  return o(e, void 0, !0, /* @__PURE__ */ new Set([r]));
};
he.prototype.findFilesAsync = function(e, t) {
  const n = this, r = [];
  let i = !1;
  const o = function(l) {
    i || (i = !0, t(l, l ? void 0 : r));
  }, s = typeof n.fs.lstat == "function";
  let a = null;
  const c = function(l, u) {
    if (!s) return u(null, !1);
    n.fs.lstat(l, function(h, w) {
      if (h) return u(h);
      if (!w || !w.isSymbolicLink()) return u(null, !1);
      n.fs.realpath(l, function(m, f) {
        if (m) return u(null, !0);
        u(null, !(f === a || f.startsWith(a + ae.sep)));
      });
    });
  }, p = function(l, u, h) {
    n.fs.readdir(l, function(w, m) {
      if (w) return h(w);
      let f = m.length;
      if (!f) return h();
      m.forEach(function(y) {
        const _ = ae.join(l, y);
        c(_, function(E, S) {
          if (E) return h(E);
          if (S) {
            --f || h();
            return;
          }
          n.fs.stat(_, function(T, R) {
            if (T) return h(T);
            if (!R) {
              --f || h();
              return;
            }
            if (r.push(ae.normalize(_) + (R.isDirectory() ? n.sep : "")), !R.isDirectory()) {
              --f || h();
              return;
            }
            n.fs.realpath(_, function(O, j) {
              if (O) return h(O);
              if (u.has(j)) {
                --f || h();
                return;
              }
              u.add(j), p(_, u, function(B) {
                if (B) return h(B);
                --f || h();
              });
            });
          });
        });
      });
    });
  };
  n.fs.realpath(e, function(l, u) {
    if (l) return o(l);
    a = u, p(e, /* @__PURE__ */ new Set([u]), o);
  });
};
he.prototype.getAttributes = function() {
};
he.prototype.setAttributes = function() {
};
he.crc32update = function(e, t) {
  return Sd[(e ^ t) & 255] ^ e >>> 8;
};
he.crc32 = function(e) {
  typeof e == "string" && (e = Buffer.from(e, "utf8"));
  let t = e.length, n = -1;
  for (let r = 0; r < t; ) n = he.crc32update(n, e[r++]);
  return ~n >>> 0;
};
he.methodToString = function(e) {
  switch (e) {
    case Uc.STORED:
      return "STORED (" + e + ")";
    case Uc.DEFLATED:
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
    throw pa.ZIP64_VALUE_TOO_LARGE();
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
he.isWin = N1;
he.crcTable = Sd;
const b1 = fe;
var R1 = function(e, { fs: t }) {
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
  return n && t.existsSync(n) ? (i = t.statSync(n), r.directory = i.isDirectory(), r.mtime = i.mtime, r.atime = i.atime, r.executable = (73 & i.mode) !== 0, r.readonly = (128 & i.mode) === 0, r.hidden = b1.basename(n)[0] === ".") : console.warn("Invalid path: " + n), {
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
}, $1 = {
  efs: !0,
  encode: (e) => Buffer.from(e, "utf8"),
  decode: (e) => e.toString("utf8")
};
nr.exports = O1;
nr.exports.Constants = vd;
nr.exports.Errors = Vr;
nr.exports.FileAttr = R1;
nr.exports.decoder = $1;
var Wr = nr.exports, fo = {}, bt = Wr, z = bt.Constants, L1 = function() {
  var e = 20, t = 10, n = 0, r = 0, i = 0, o = 0, s = 0, a = 0, c = 0, p = 0, l = 0, u = 0, h = 0, w = 0, m = 0;
  e |= bt.isWin ? 2560 : 768, n |= z.FLG_EFS;
  const f = {
    extraLen: 0
  }, y = (E) => Math.max(0, E) >>> 0, _ = (E) => Math.max(0, E) & 255;
  return i = bt.fromDate2DOS(/* @__PURE__ */ new Date()), {
    get made() {
      return e;
    },
    set made(E) {
      e = E;
    },
    get version() {
      return t;
    },
    set version(E) {
      t = E;
    },
    get flags() {
      return n;
    },
    set flags(E) {
      n = E;
    },
    get flags_efs() {
      return (n & z.FLG_EFS) > 0;
    },
    set flags_efs(E) {
      E ? n |= z.FLG_EFS : n &= ~z.FLG_EFS;
    },
    get flags_desc() {
      return (n & z.FLG_DESC) > 0;
    },
    set flags_desc(E) {
      E ? n |= z.FLG_DESC : n &= ~z.FLG_DESC;
    },
    get method() {
      return r;
    },
    set method(E) {
      switch (E) {
        case z.STORED:
          this.version = 10;
          break;
        case z.DEFLATED:
        default:
          this.version = 20;
      }
      r = E;
    },
    get time() {
      return bt.fromDOS2Date(this.timeval);
    },
    set time(E) {
      E = new Date(E), this.timeval = bt.fromDate2DOS(E);
    },
    get timeval() {
      return i;
    },
    set timeval(E) {
      i = y(E);
    },
    get timeHighByte() {
      return _(i >>> 8);
    },
    get crc() {
      return o;
    },
    set crc(E) {
      o = y(E);
    },
    get compressedSize() {
      return s;
    },
    set compressedSize(E) {
      s = y(E);
    },
    get size() {
      return a;
    },
    set size(E) {
      a = y(E);
    },
    get fileNameLength() {
      return c;
    },
    set fileNameLength(E) {
      c = E;
    },
    get extraLength() {
      return p;
    },
    set extraLength(E) {
      p = E;
    },
    get extraLocalLength() {
      return f.extraLen;
    },
    set extraLocalLength(E) {
      f.extraLen = E;
    },
    get commentLength() {
      return l;
    },
    set commentLength(E) {
      l = E;
    },
    get diskNumStart() {
      return u;
    },
    set diskNumStart(E) {
      u = y(E);
    },
    get inAttr() {
      return h;
    },
    set inAttr(E) {
      h = y(E);
    },
    get attr() {
      return w;
    },
    set attr(E) {
      w = y(E);
    },
    // get Unix file permissions
    get fileAttr() {
      return (w || 0) >> 16 & 511;
    },
    get offset() {
      return m;
    },
    set offset(E) {
      m = y(E);
    },
    get encrypted() {
      return (n & z.FLG_ENC) === z.FLG_ENC;
    },
    get centralHeaderSize() {
      return z.CENHDR + c + p + l;
    },
    get realDataOffset() {
      return m + z.LOCHDR + f.fnameLen + f.extraLen;
    },
    get localHeader() {
      return f;
    },
    loadLocalHeaderFromBinary: function(E) {
      if (m < 0 || m + z.LOCHDR > E.length)
        throw bt.Errors.INVALID_LOC();
      var S = E.slice(m, m + z.LOCHDR);
      if (S.readUInt32LE(0) !== z.LOCSIG)
        throw bt.Errors.INVALID_LOC();
      f.version = S.readUInt16LE(z.LOCVER), f.flags = S.readUInt16LE(z.LOCFLG), f.flags_desc = (f.flags & z.FLG_DESC) > 0, f.method = S.readUInt16LE(z.LOCHOW), f.time = S.readUInt32LE(z.LOCTIM), f.crc = S.readUInt32LE(z.LOCCRC), f.compressedSize = S.readUInt32LE(z.LOCSIZ), f.size = S.readUInt32LE(z.LOCLEN), f.fnameLen = S.readUInt16LE(z.LOCNAM), f.extraLen = S.readUInt16LE(z.LOCEXT);
      const T = m + z.LOCHDR + f.fnameLen, R = T + f.extraLen;
      return E.slice(T, R);
    },
    loadFromBinary: function(E) {
      if (E.length !== z.CENHDR || E.readUInt32LE(0) !== z.CENSIG)
        throw bt.Errors.INVALID_CEN();
      e = E.readUInt16LE(z.CENVEM), t = E.readUInt16LE(z.CENVER), n = E.readUInt16LE(z.CENFLG), r = E.readUInt16LE(z.CENHOW), i = E.readUInt32LE(z.CENTIM), o = E.readUInt32LE(z.CENCRC), s = E.readUInt32LE(z.CENSIZ), a = E.readUInt32LE(z.CENLEN), c = E.readUInt16LE(z.CENNAM), p = E.readUInt16LE(z.CENEXT), l = E.readUInt16LE(z.CENCOM), u = E.readUInt16LE(z.CENDSK), h = E.readUInt16LE(z.CENATT), w = E.readUInt32LE(z.CENATX), m = E.readUInt32LE(z.CENOFF);
    },
    localHeaderToBinary: function() {
      var E = Buffer.alloc(z.LOCHDR);
      return E.writeUInt32LE(z.LOCSIG, 0), E.writeUInt16LE(t, z.LOCVER), E.writeUInt16LE(n & ~z.FLG_DESC, z.LOCFLG), E.writeUInt16LE(r, z.LOCHOW), E.writeUInt32LE(i, z.LOCTIM), E.writeUInt32LE(o, z.LOCCRC), E.writeUInt32LE(s, z.LOCSIZ), E.writeUInt32LE(a, z.LOCLEN), E.writeUInt16LE(c, z.LOCNAM), E.writeUInt16LE(f.extraLen, z.LOCEXT), E;
    },
    centralHeaderToBinary: function() {
      var E = Buffer.alloc(z.CENHDR + c + p + l);
      return E.writeUInt32LE(z.CENSIG, 0), E.writeUInt16LE(e, z.CENVEM), E.writeUInt16LE(t, z.CENVER), E.writeUInt16LE(n & ~z.FLG_DESC, z.CENFLG), E.writeUInt16LE(r, z.CENHOW), E.writeUInt32LE(i, z.CENTIM), E.writeUInt32LE(o, z.CENCRC), E.writeUInt32LE(s, z.CENSIZ), E.writeUInt32LE(a, z.CENLEN), E.writeUInt16LE(c, z.CENNAM), E.writeUInt16LE(p, z.CENEXT), E.writeUInt16LE(l, z.CENCOM), E.writeUInt16LE(u, z.CENDSK), E.writeUInt16LE(h, z.CENATT), E.writeUInt32LE(w, z.CENATX), E.writeUInt32LE(m, z.CENOFF), E;
    },
    toJSON: function() {
      const E = function(S) {
        return S + " bytes";
      };
      return {
        made: e,
        version: t,
        flags: n,
        method: bt.methodToString(r),
        time: this.time,
        crc: "0x" + o.toString(16).toUpperCase(),
        compressedSize: E(s),
        size: E(a),
        fileNameLength: E(c),
        extraLength: E(p),
        commentLength: E(l),
        diskNumStart: u,
        inAttr: h,
        attr: w,
        offset: m,
        centralHeaderSize: E(z.CENHDR + c + p + l)
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
}, lt = Wr, Z = lt.Constants, x1 = function() {
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
        throw lt.Errors.INVALID_END();
      s.readUInt32LE(0) === Z.ENDSIG ? (e = s.readUInt16LE(Z.ENDSUB), t = s.readUInt16LE(Z.ENDTOT), n = s.readUInt32LE(Z.ENDSIZ), r = s.readUInt32LE(Z.ENDOFF), i = s.readUInt16LE(Z.ENDCOM)) : (e = lt.readBigUInt64LE(s, Z.ZIP64SUB), t = lt.readBigUInt64LE(s, Z.ZIP64TOT), n = lt.readBigUInt64LE(s, Z.ZIP64SIZB), r = lt.readBigUInt64LE(s, Z.ZIP64OFF), i = 0);
    },
    toBinary: function() {
      if (!o()) {
        var s = Buffer.alloc(Z.ENDHDR + i);
        return s.writeUInt32LE(Z.ENDSIG, 0), s.writeUInt32LE(0, 4), s.writeUInt16LE(e, Z.ENDSUB), s.writeUInt16LE(t, Z.ENDTOT), s.writeUInt32LE(n, Z.ENDSIZ), s.writeUInt32LE(r, Z.ENDOFF), s.writeUInt16LE(i, Z.ENDCOM), s.fill(" ", Z.ENDHDR), s;
      }
      var s = Buffer.alloc(this.mainHeaderSize);
      let a = 0;
      s.writeUInt32LE(Z.ZIP64SIG, a), lt.writeBigUInt64LE(s, Z.ZIP64HDR - Z.ZIP64LEAD, a + Z.ZIP64SIZE), s.writeUInt16LE(45, a + Z.ZIP64VEM), s.writeUInt16LE(45, a + Z.ZIP64VER), s.writeUInt32LE(0, a + Z.ZIP64DSK), s.writeUInt32LE(0, a + Z.ZIP64DSKDIR), lt.writeBigUInt64LE(s, e, a + Z.ZIP64SUB), lt.writeBigUInt64LE(s, t, a + Z.ZIP64TOT), lt.writeBigUInt64LE(s, n, a + Z.ZIP64SIZB), lt.writeBigUInt64LE(s, r, a + Z.ZIP64OFF);
      const c = r + n;
      return a += Z.ZIP64HDR, s.writeUInt32LE(Z.END64SIG, a), s.writeUInt32LE(0, a + Z.END64START), lt.writeBigUInt64LE(s, c, a + Z.END64OFF), s.writeUInt32LE(1, a + Z.END64NUMDISKS), a += Z.END64HDR, s.writeUInt32LE(Z.ENDSIG, a), s.writeUInt32LE(0, a + 4), s.writeUInt16LE(Math.min(e, Z.EF_ZIP64_OR_16), a + Z.ENDSUB), s.writeUInt16LE(Math.min(t, Z.EF_ZIP64_OR_16), a + Z.ENDTOT), s.writeUInt32LE(Math.min(n, Z.EF_ZIP64_OR_32), a + Z.ENDSIZ), s.writeUInt32LE(Math.min(r, Z.EF_ZIP64_OR_32), a + Z.ENDOFF), s.writeUInt16LE(i, a + Z.ENDCOM), s.fill(" ", a + Z.ENDHDR), s;
    },
    toJSON: function() {
      const s = function(a, c) {
        let p = a.toString(16).toUpperCase();
        for (; p.length < c; ) p = "0" + p;
        return "0x" + p;
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
fo.EntryHeader = L1;
fo.MainHeader = x1;
var ho = {}, P1 = function(e) {
  var t = Bi, n = { chunkSize: (parseInt(e.length / 1024) + 1) * 1024 };
  return {
    deflate: function() {
      return t.deflateRawSync(e, n);
    },
    deflateAsync: function(r) {
      var i = t.createDeflateRaw(n), o = [], s = 0;
      i.on("data", function(a) {
        o.push(a), s += a.length;
      }), i.on("end", function() {
        var a = Buffer.alloc(s), c = 0;
        a.fill(0);
        for (var p = 0; p < o.length; p++) {
          var l = o[p];
          l.copy(a, c), c += l.length;
        }
        r && r(a);
      }), i.end(e);
    }
  };
}, Xc;
const F1 = +(((Xc = process == null ? void 0 : process.versions) == null ? void 0 : Xc.node) ?? "").split(".")[0] || 0, U1 = Vr;
var k1 = function(e, t) {
  var n = Bi;
  const r = t > 0 ? t : 1, i = F1 >= 15 ? { maxOutputLength: r } : {};
  return {
    inflate: function() {
      return n.inflateRawSync(e, i);
    },
    inflateAsync: function(o) {
      var s = n.createInflateRaw(i), a = [], c = 0, p = !1;
      const l = function(u) {
        p || (p = !0, s.destroy(), o && o(Buffer.alloc(0), u));
      };
      s.on("error", function(u) {
        l(u);
      }), s.on("data", function(u) {
        if (!p) {
          if (c += u.length, c > r)
            return l(U1.MAX_OUTPUT_EXCEEDED());
          a.push(u);
        }
      }), s.on("end", function() {
        if (!p) {
          p = !0;
          var u = Buffer.alloc(c), h = 0;
          u.fill(0);
          for (var w = 0; w < a.length; w++) {
            var m = a[w];
            m.copy(u, h), h += m.length;
          }
          o && o(u);
        }
      }), s.end(e);
    }
  };
};
const { randomFillSync: Mc } = Jn, M1 = Vr, B1 = new Uint32Array(256).map((e, t) => {
  for (let n = 0; n < 8; n++)
    t & 1 ? t = t >>> 1 ^ 3988292384 : t >>>= 1;
  return t >>> 0;
}), Ad = (e, t) => Math.imul(e, t) >>> 0, Bc = (e, t) => B1[(e ^ t) & 255] ^ e >>> 8, Lr = () => typeof Mc == "function" ? Mc(Buffer.alloc(12)) : Lr.node();
Lr.node = () => {
  const e = Buffer.alloc(12), t = e.length;
  for (let n = 0; n < t; n++) e[n] = Math.random() * 256 & 255;
  return e;
};
const Ti = {
  genSalt: Lr
};
function po(e) {
  const t = Buffer.isBuffer(e) ? e : Buffer.from(e);
  this.keys = new Uint32Array([305419896, 591751049, 878082192]);
  for (let n = 0; n < t.length; n++)
    this.updateKeys(t[n]);
}
po.prototype.updateKeys = function(e) {
  const t = this.keys;
  return t[0] = Bc(t[0], e), t[1] += t[0] & 255, t[1] = Ad(t[1], 134775813) + 1, t[2] = Bc(t[2], t[1] >>> 24), e;
};
po.prototype.next = function() {
  const e = (this.keys[2] | 2) >>> 0;
  return Ad(e, e ^ 1) >> 8 & 255;
};
function j1(e) {
  const t = new po(e);
  return function(n) {
    const r = Buffer.alloc(n.length);
    let i = 0;
    for (let o of n)
      r[i++] = t.updateKeys(o ^ t.next());
    return r;
  };
}
function H1(e) {
  const t = new po(e);
  return function(n, r, i = 0) {
    r || (r = Buffer.alloc(n.length));
    for (let o of n) {
      const s = t.next();
      r[i++] = o ^ s, t.updateKeys(o);
    }
    return r;
  };
}
function G1(e, t, n) {
  if (!e || !Buffer.isBuffer(e) || e.length < 12)
    return Buffer.alloc(0);
  const r = j1(n), i = r(e.slice(0, 12)), o = (t.flags & 8) === 8 ? t.timeHighByte : t.crc >>> 24;
  if (i[11] !== o)
    throw M1.WRONG_PASSWORD();
  return r(e.slice(12));
}
function q1(e) {
  Buffer.isBuffer(e) && e.length >= 12 ? Ti.genSalt = function() {
    return e.slice(0, 12);
  } : e === "node" ? Ti.genSalt = Lr.node : Ti.genSalt = Lr;
}
function z1(e, t, n, r = !1) {
  e == null && (e = Buffer.alloc(0)), Buffer.isBuffer(e) || (e = Buffer.from(e.toString()));
  const i = H1(n), o = Ti.genSalt();
  o[11] = t.crc >>> 24 & 255, r && (o[10] = t.crc >>> 16 & 255);
  const s = Buffer.alloc(e.length + 12);
  return i(o, s), i(e, s, 12);
}
var V1 = { decrypt: G1, encrypt: z1, _salter: q1 };
ho.Deflater = P1;
ho.Inflater = k1;
ho.ZipCrypto = V1;
var ce = Wr, W1 = fo, rt = ce.Constants, as = ho, Td = function(e, t) {
  var n = new W1.EntryHeader(), r = Buffer.alloc(0), i = Buffer.alloc(0), o = !1, s = null, a = Buffer.alloc(0), c = Buffer.alloc(0), p = !0;
  const l = e, u = typeof l.decoder == "object" ? l.decoder : ce.decoder;
  p = u.hasOwnProperty("efs") ? u.efs : !1;
  function h() {
    if (!t || !(t instanceof Uint8Array))
      return Buffer.alloc(0);
    c = n.loadLocalHeaderFromBinary(t);
    const S = n.realDataOffset, T = S + n.compressedSize;
    if (S < 0 || T < S || T > t.length)
      throw ce.Errors.INVALID_LOC();
    return t.slice(S, T);
  }
  function w(S) {
    const T = n.flags_desc || n.localHeader.flags_desc ? n.crc : n.localHeader.crc;
    return ce.crc32(S) === T;
  }
  function m(S, T, R) {
    if (typeof T > "u" && typeof S == "string" && (R = S, S = void 0), o)
      return S && T && T(Buffer.alloc(0), ce.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
    var O;
    try {
      if (O = h(), O.length === 0)
        return S && T && T(O), O;
      if (n.encrypted) {
        if (typeof R != "string" && !Buffer.isBuffer(R))
          throw ce.Errors.INVALID_PASS_PARAM();
        O = as.ZipCrypto.decrypt(O, n, R);
      }
    } catch (P) {
      if (S && T)
        return T(Buffer.alloc(0), P), Buffer.alloc(0);
      throw P;
    }
    var j;
    switch (n.method) {
      case ce.Constants.STORED:
        if (j = Buffer.alloc(O.length), O.copy(j), w(j))
          return S && T && T(j), j;
        throw S && T && T(j, ce.Errors.BAD_CRC()), ce.Errors.BAD_CRC();
      case ce.Constants.DEFLATED:
        var B = new as.Inflater(O, n.size);
        if (S)
          B.inflateAsync(function(P, A) {
            T && (A ? T(Buffer.alloc(0), A) : w(P) ? T(P) : T(P, ce.Errors.BAD_CRC()));
          });
        else {
          if (j = B.inflate(), !w(j))
            throw ce.Errors.BAD_CRC(`"${u.decode(r)}"`);
          return j;
        }
        break;
      default:
        throw S && T && T(Buffer.alloc(0), ce.Errors.UNKNOWN_METHOD()), ce.Errors.UNKNOWN_METHOD();
    }
  }
  function f(S, T) {
    if ((!s || !s.length) && Buffer.isBuffer(t))
      return S && T && T(h()), h();
    if (s.length && !o) {
      var R;
      switch (n.method) {
        case ce.Constants.STORED:
          return n.compressedSize = n.size, R = Buffer.alloc(s.length), s.copy(R), S && T && T(R), R;
        default:
        case ce.Constants.DEFLATED:
          var O = new as.Deflater(s);
          if (S)
            O.deflateAsync(function(B) {
              R = Buffer.alloc(B.length), n.compressedSize = B.length, B.copy(R), T && T(R);
            });
          else {
            var j = O.deflate();
            return n.compressedSize = j.length, j;
          }
          O = null;
          break;
      }
    } else if (S && T)
      T(Buffer.alloc(0));
    else
      return Buffer.alloc(0);
  }
  function y(S, T) {
    return ce.readBigUInt64LE(S, T);
  }
  function _(S) {
    try {
      for (var T = 0, R, O, j; T + 4 < S.length; )
        R = S.readUInt16LE(T), T += 2, O = S.readUInt16LE(T), T += 2, j = S.slice(T, T + O), T += O, rt.ID_ZIP64 === R && E(j);
    } catch {
      throw ce.Errors.EXTRA_FIELD_PARSE_ERROR();
    }
  }
  function E(S) {
    var T, R, O, j;
    S.length >= rt.EF_ZIP64_SCOMP && (T = y(S, rt.EF_ZIP64_SUNCOMP), n.size === rt.EF_ZIP64_OR_32 && (n.size = T)), S.length >= rt.EF_ZIP64_RHO && (R = y(S, rt.EF_ZIP64_SCOMP), n.compressedSize === rt.EF_ZIP64_OR_32 && (n.compressedSize = R)), S.length >= rt.EF_ZIP64_DSN && (O = y(S, rt.EF_ZIP64_RHO), n.offset === rt.EF_ZIP64_OR_32 && (n.offset = O)), S.length >= rt.EF_ZIP64_DSN + 4 && (j = S.readUInt32LE(rt.EF_ZIP64_DSN), n.diskNumStart === rt.EF_ZIP64_OR_16 && (n.diskNumStart = j));
  }
  return {
    get entryName() {
      return u.decode(r);
    },
    get rawEntryName() {
      return r;
    },
    set entryName(S) {
      r = ce.toBuffer(S, u.encode);
      var T = r[r.length - 1];
      o = T === 47 || T === 92, n.fileNameLength = r.length;
    },
    get efs() {
      return typeof p == "function" ? p(this.entryName) : p;
    },
    get extra() {
      return a;
    },
    set extra(S) {
      a = S, n.extraLength = S.length, _(S);
    },
    get comment() {
      return u.decode(i);
    },
    set comment(S) {
      if (i = ce.toBuffer(S, u.encode), n.commentLength = i.length, i.length > 65535) throw ce.Errors.COMMENT_TOO_LONG();
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
      s = ce.toBuffer(S, ce.decoder.encode), !o && s.length ? (n.size = s.length, n.method = ce.Constants.DEFLATED, n.crc = ce.crc32(S), n.changed = !0) : n.method = ce.Constants.STORED;
    },
    getData: function(S) {
      return n.changed ? s : m(!1, null, S);
    },
    getDataAsync: function(S, T) {
      n.changed ? S(s) : m(!0, S, T);
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
      var S = n.centralHeaderToBinary(), T = ce.Constants.CENHDR;
      return r.copy(S, T), T += r.length, a.copy(S, T), T += n.extraLength, i.copy(S, T), S;
    },
    packLocalHeader: function() {
      let S = 0;
      n.flags_efs = this.efs, n.extraLocalLength = c.length;
      const T = n.localHeaderToBinary(), R = Buffer.alloc(T.length + r.length + n.extraLocalLength);
      return T.copy(R, S), S += T.length, r.copy(R, S), S += r.length, c.copy(R, S), S += c.length, R;
    },
    toJSON: function() {
      const S = function(T) {
        return "<" + (T && T.length + " bytes buffer" || "null") + ">";
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
const jc = Td, Y1 = fo, Be = Wr;
var X1 = function(e, t) {
  var n = [], r = /* @__PURE__ */ Object.create(null), i = Buffer.alloc(0), o = new Y1.MainHeader(), s = !1;
  const a = /* @__PURE__ */ new Set(), c = t, { noSort: p, decoder: l } = c;
  e ? w(c.readEntries) : s = !0;
  function u() {
    const f = /* @__PURE__ */ new Set();
    for (const y of Object.keys(r)) {
      const _ = y.split("/");
      if (_.pop(), !!_.length)
        for (let E = 0; E < _.length; E++) {
          const S = _.slice(0, E + 1).join("/") + "/";
          f.add(S);
        }
    }
    for (const y of f)
      if (!(y in r)) {
        const _ = new jc(c);
        _.entryName = y, _.attr = 16, _.temporary = !0, n.push(_), r[_.entryName] = _, a.add(_);
      }
  }
  function h() {
    if (s = !0, r = /* @__PURE__ */ Object.create(null), o.diskEntries > (e.length - o.offset) / Be.Constants.CENHDR)
      throw Be.Errors.DISK_ENTRY_TOO_LARGE();
    n = new Array(o.diskEntries);
    for (var f = o.offset, y = 0; y < n.length; y++) {
      var _ = f, E = new jc(c, e);
      if (E.header = e.slice(_, _ += Be.Constants.CENHDR), E.entryName = e.slice(_, _ += E.header.fileNameLength), E.header.extraLength && (E.extra = e.slice(_, _ += E.header.extraLength)), E.header.commentLength && (E.comment = e.slice(_, _ + E.header.commentLength)), f += E.header.centralHeaderSize, E.entryName in r)
        throw Be.Errors.DUPLICATE_ENTRY(`"${E.entryName}"`);
      n[y] = E, r[E.entryName] = E;
    }
    a.clear(), u();
  }
  function w(f) {
    var y = e.length - Be.Constants.ENDHDR, _ = Math.max(0, y - 65535), E = _, S = e.length, T = -1, R = 0;
    for ((typeof c.trailingSpace == "boolean" ? c.trailingSpace : !1) && (_ = 0), y; y >= E; y--)
      if (e[y] === 80) {
        if (e.readUInt32LE(y) === Be.Constants.ENDSIG) {
          T = y, R = y, S = y + Be.Constants.ENDHDR, E = y - Be.Constants.END64HDR;
          continue;
        }
        if (e.readUInt32LE(y) === Be.Constants.END64SIG) {
          E = _;
          continue;
        }
        if (e.readUInt32LE(y) === Be.Constants.ZIP64SIG) {
          T = y, S = y + Be.readBigUInt64LE(e, y + Be.Constants.ZIP64SIZE) + Be.Constants.ZIP64LEAD;
          break;
        }
      }
    if (T == -1) throw Be.Errors.INVALID_FORMAT();
    o.loadFromBinary(e.slice(T, S)), o.commentLength && (i = e.slice(R + Be.Constants.ENDHDR)), f && h();
  }
  function m() {
    n.length > 1 && !p && (n = n.map((f) => ({ entry: f, key: f.entryName.toLowerCase() })).sort((f, y) => f.key.localeCompare(y.key)).map((f) => f.entry));
  }
  return {
    /**
     * Returns an array of ZipEntry objects existent in the current opened archive
     * @return Array
     */
    get entries() {
      return s || h(), n.filter((f) => !a.has(f));
    },
    /**
     * Archive comment
     * @return {String}
     */
    get comment() {
      return l.decode(i);
    },
    set comment(f) {
      i = Be.toBuffer(f, l.encode), o.commentLength = i.length;
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
      return s || h(), r[f] || null;
    },
    /**
     * Adds the given entry to the entry list
     *
     * @param entry
     */
    setEntry: function(f) {
      s || h(), n.push(f), r[f.entryName] = f, o.totalEntries = n.length;
    },
    /**
     * Removes the file with the given name from the entry list.
     *
     * If the entry is a directory, then all nested files and directories will be removed
     * @param entryName
     * @returns {void}
     */
    deleteFile: function(f, y = !0) {
      s || h();
      const _ = r[f];
      this.getEntryChildren(_, y).map((S) => S.entryName).forEach(this.deleteEntry);
    },
    /**
     * Removes the entry with the given name from the entry list.
     *
     * @param {string} entryName
     * @returns {void}
     */
    deleteEntry: function(f) {
      s || h();
      const y = r[f], _ = n.indexOf(y);
      _ >= 0 && (n.splice(_, 1), delete r[f], o.totalEntries = n.length);
    },
    /**
     *  Iterates and returns all nested files and directories of the given entry
     *
     * @param entry
     * @return Array
     */
    getEntryChildren: function(f, y = !0) {
      if (s || h(), typeof f == "object")
        if (f.isDirectory && y) {
          const _ = [], E = f.entryName;
          for (const S of n)
            S.entryName.startsWith(E) && _.push(S);
          return _;
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
        const y = this.getEntryChildren(f);
        return y.includes(f) ? y.length - 1 : y.length;
      }
      return 0;
    },
    /**
     * Returns the zip file
     *
     * @return Buffer
     */
    compressToBuffer: function() {
      s || h(), m();
      const f = [], y = [];
      let _ = 0, E = 0;
      o.size = 0, o.offset = 0;
      let S = 0;
      for (const O of this.entries) {
        const j = O.getCompressedData();
        O.header.offset = E;
        const B = O.packLocalHeader(), P = B.length + j.length;
        E += P, f.push(B), f.push(j);
        const A = O.packCentralHeader();
        y.push(A), o.size += A.length, _ += P + A.length, S++;
      }
      _ += o.mainHeaderSize, o.offset = E, o.totalEntries = S, E = 0;
      const T = Buffer.alloc(_);
      for (const O of f)
        O.copy(T, E), E += O.length;
      for (const O of y)
        O.copy(T, E), E += O.length;
      const R = o.toBinary();
      return i && i.copy(R, R.length - i.length), R.copy(T, E), e = T, s = !1, T;
    },
    toAsyncBuffer: function(f, y, _, E) {
      try {
        s || h(), m();
        const S = [], T = [];
        let R = 0, O = 0, j = 0;
        o.size = 0, o.offset = 0;
        const B = function(P) {
          if (P.length > 0) {
            const A = P.shift(), Y = A.entryName + A.extra.toString();
            _ && _(Y), A.getCompressedDataAsync(function(K) {
              E && E(Y), A.header.offset = O;
              const te = A.packLocalHeader(), F = te.length + K.length;
              O += F, S.push(te), S.push(K);
              const b = A.packCentralHeader();
              T.push(b), o.size += b.length, R += F + b.length, j++, B(P);
            });
          } else {
            R += o.mainHeaderSize, o.offset = O, o.totalEntries = j, O = 0;
            const A = Buffer.alloc(R);
            S.forEach(function(K) {
              K.copy(A, O), O += K.length;
            }), T.forEach(function(K) {
              K.copy(A, O), O += K.length;
            });
            const Y = o.toBinary();
            i && i.copy(Y, Y.length - i.length), Y.copy(A, O), e = A, s = !1, f(A);
          }
        };
        B(Array.from(this.entries));
      } catch (S) {
        y(S);
      }
    }
  };
};
const ve = Wr, we = fe, J1 = Td, Z1 = X1, cn = (...e) => ve.findLast(e, (t) => typeof t == "boolean"), Hc = (...e) => ve.findLast(e, (t) => typeof t == "string"), K1 = (...e) => ve.findLast(e, (t) => typeof t == "function"), Q1 = {
  // option "noSort" : if true it disables files sorting
  noSort: !1,
  // read entries during load (initial loading may be slower)
  readEntries: !1,
  // default method is none
  method: ve.Constants.NONE,
  // file system
  fs: null
};
var eA = function(e, t) {
  let n = null;
  const r = Object.assign(/* @__PURE__ */ Object.create(null), Q1);
  e && typeof e == "object" && (e instanceof Uint8Array || (Object.assign(r, e), e = r.input ? r.input : void 0, r.input && delete r.input), Buffer.isBuffer(e) && (n = e, r.method = ve.Constants.BUFFER, e = void 0)), Object.assign(r, t);
  const i = new ve(r), o = (m) => {
    m.filter((f) => f.attr).sort((f, y) => y.path.length - f.path.length).forEach((f) => i.fs.chmodSync(f.path, f.attr));
  };
  if ((typeof r.decoder != "object" || typeof r.decoder.encode != "function" || typeof r.decoder.decode != "function") && (r.decoder = ve.decoder), e && typeof e == "string")
    if (i.fs.existsSync(e))
      r.method = ve.Constants.FILE, r.filename = e, n = i.fs.readFileSync(e);
    else
      throw ve.Errors.INVALID_FILENAME();
  const s = new Z1(n, r), { canonical: a, sanitize: c, zipnamefix: p } = ve;
  function l(m) {
    if (m && s) {
      var f;
      if (typeof m == "string" && (f = s.getEntry(we.posix.normalize(m))), typeof m == "object" && typeof m.entryName < "u" && typeof m.header < "u" && (f = s.getEntry(m.entryName)), f)
        return f;
    }
    return null;
  }
  function u(m) {
    const { join: f, normalize: y, sep: _ } = we.posix;
    return f(we.isAbsolute(m) ? "/" : ".", y(_ + m.split("\\").join(_) + _));
  }
  function h(m) {
    return m instanceof RegExp ? /* @__PURE__ */ function(f) {
      return function(y) {
        return f.test(y);
      };
    }(m) : typeof m != "function" ? () => !0 : m;
  }
  const w = (m, f) => {
    let y = f.slice(-1);
    return y = y === i.sep ? i.sep : "", we.relative(m, f) + y;
  };
  return {
    /**
     * Extracts the given entry from the archive and returns the content as a Buffer object
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @param {Buffer|string} [pass] - password
     * @return Buffer or Null in case of error
     */
    readFile: function(m, f) {
      var y = l(m);
      return y && y.getData(f) || null;
    },
    /**
     * Returns how many child elements has on entry (directories) on files it is always 0
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @returns {integer}
     */
    childCount: function(m) {
      const f = l(m);
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
      var y = l(m);
      y ? y.getDataAsync(f) : f(null, "getEntry failed for:" + m);
    },
    /**
     * Extracts the given entry from the archive and returns the content as plain text in the given encoding
     * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
     * @param {string} encoding - Optional. If no encoding is specified utf8 is used
     *
     * @return String
     */
    readAsText: function(m, f) {
      var y = l(m);
      if (y) {
        var _ = y.getData();
        if (_ && _.length)
          return _.toString(f || "utf8");
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
    readAsTextAsync: function(m, f, y) {
      var _ = l(m);
      _ ? _.getDataAsync(function(E, S) {
        if (S) {
          f(E, S);
          return;
        }
        E && E.length ? f(E.toString(y || "utf8")) : f("");
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
      var y = l(m);
      y && s.deleteFile(y.entryName, f);
    },
    /**
     * Remove the entry from the file or directory without affecting any nested entries
     *
     * @param {ZipEntry|string} entry
     * @returns {void}
     */
    deleteEntry: function(m) {
      var f = l(m);
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
      var y = l(m);
      y && (y.comment = f);
    },
    /**
     * Returns the comment of the specified entry
     *
     * @param {ZipEntry} entry
     * @return String
     */
    getZipEntryComment: function(m) {
      var f = l(m);
      return f && f.comment || "";
    },
    /**
     * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
     *
     * @param {ZipEntry} entry
     * @param {Buffer} content
     */
    updateFile: function(m, f) {
      var y = l(m);
      y && y.setData(f);
    },
    /**
     * Adds a file from the disk to the archive
     *
     * @param {string} localPath File to add to zip
     * @param {string} [zipPath] Optional path inside the zip
     * @param {string} [zipName] Optional name for the file
     * @param {string} [comment] Optional file comment
     */
    addLocalFile: function(m, f, y, _) {
      if (i.fs.existsSync(m)) {
        f = f ? u(f) : "";
        const E = we.win32.basename(we.win32.normalize(m));
        f += y || E;
        const S = i.fs.statSync(m), T = S.isFile() ? i.fs.readFileSync(m) : Buffer.alloc(0);
        S.isDirectory() && (f += i.sep), this.addFile(f, T, _, S);
      } else
        throw ve.Errors.FILE_NOT_FOUND(m);
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
      const y = we.resolve(m.localPath), { comment: _ } = m;
      let { zipPath: E, zipName: S } = m;
      const T = this;
      i.fs.stat(y, function(R, O) {
        if (R) return f(R, !1);
        E = E ? u(E) : "";
        const j = we.win32.basename(we.win32.normalize(y));
        if (E += S || j, O.isFile())
          i.fs.readFile(y, function(B, P) {
            return B ? f(B, !1) : (T.addFile(E, P, _, O), setImmediate(f, void 0, !0));
          });
        else if (O.isDirectory())
          return E += i.sep, T.addFile(E, Buffer.alloc(0), _, O), setImmediate(f, void 0, !0);
      });
    },
    /**
     * Adds a local directory and all its nested files and directories to the archive
     *
     * @param {string} localPath - local path to the folder
     * @param {string} [zipPath] - optional path inside zip
     * @param {(RegExp|function)} [filter] - optional RegExp or Function if files match will be included.
     */
    addLocalFolder: function(m, f, y) {
      if (y = h(y), f = f ? u(f) : "", m = we.normalize(m), i.fs.existsSync(m)) {
        const _ = i.findFiles(m), E = this;
        if (_.length)
          for (const S of _) {
            const T = we.join(f, w(m, S));
            y(T) && E.addLocalFile(S, we.dirname(T));
          }
      } else
        throw ve.Errors.FILE_NOT_FOUND(m);
    },
    /**
     * Asynchronous addLocalFolder
     * @param {string} localPath
     * @param {callback} callback
     * @param {string} [zipPath] optional path inside zip
     * @param {RegExp|function} [filter] optional RegExp or Function if files match will
     *               be included.
     */
    addLocalFolderAsync: function(m, f, y, _) {
      _ = h(_), y = y ? u(y) : "", m = we.normalize(m);
      var E = this;
      i.fs.open(m, "r", function(S) {
        if (S && S.code === "ENOENT")
          f(void 0, ve.Errors.FILE_NOT_FOUND(m));
        else if (S)
          f(void 0, S);
        else {
          var T = i.findFiles(m), R = -1, O = function() {
            if (R += 1, R < T.length) {
              var j = T[R], B = w(m, j).split("\\").join("/");
              B = B.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), _(B) ? i.fs.stat(j, function(P, A) {
                P && f(void 0, P), A.isFile() ? i.fs.readFile(j, function(Y, K) {
                  Y ? f(void 0, Y) : (E.addFile(y + B, K, "", A), O());
                }) : (E.addFile(y + B + "/", Buffer.alloc(0), "", A), O());
              }) : process.nextTick(() => {
                O();
              });
            } else
              f(!0, void 0);
          };
          O();
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
      const y = this;
      m = typeof m == "object" ? m : { localPath: m };
      const _ = we.resolve(m.localPath);
      let { zipPath: E, filter: S, namefix: T } = m;
      S instanceof RegExp ? S = /* @__PURE__ */ function(j) {
        return function(B) {
          return j.test(B);
        };
      }(S) : typeof S != "function" && (S = function() {
        return !0;
      }), E = E ? u(E) : "", T === "latin1" && (T = (j) => j.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof T != "function" && (T = (j) => j);
      const R = (j) => we.join(E, T(w(_, j))), O = (j) => we.win32.basename(we.win32.normalize(T(j)));
      i.fs.open(_, "r", function(j) {
        j && j.code === "ENOENT" ? f(ve.Errors.FILE_NOT_FOUND(_), !1) : j ? f(j, !1) : i.findFilesAsync(_, function(B, P) {
          if (B) return f(B, !1);
          if (P = P.filter((A) => S(R(A))), !P.length) return f(void 0, !0);
          setImmediate(
            P.reverse().reduce(function(A, Y) {
              return function(K, te) {
                if (K || te === !1) return setImmediate(A, K, !1);
                y.addLocalFileAsync(
                  {
                    localPath: Y,
                    zipPath: we.dirname(R(Y)),
                    zipName: O(Y)
                  },
                  A
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
      return new Promise((y, _) => {
        this.addLocalFolderAsync2(Object.assign({ localPath: m }, f), (E, S) => {
          if (E) return _(E);
          S && y(this);
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
    addFile: function(m, f, y, _) {
      m = p(m);
      let E = l(m);
      const S = E != null;
      S || (E = new J1(r), E.entryName = m), E.comment = y || "";
      const T = typeof _ == "object" && _ instanceof i.fs.Stats;
      T && (E.header.time = _.mtime);
      var R = E.isDirectory ? 16 : 0;
      let O = E.isDirectory ? 16384 : 32768;
      return T ? O |= 4095 & _.mode : typeof _ == "number" ? O |= 4095 & _ : O |= E.isDirectory ? 493 : 420, R = (R | O << 16) >>> 0, E.attr = R, E.setData(f), S || s.setEntry(E), E;
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
      return l(m);
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
    extractEntryTo: function(m, f, y, _, E, S) {
      _ = cn(!1, _), E = cn(!1, E), y = cn(!0, y), S = Hc(E, S);
      var T = l(m);
      if (!T)
        throw ve.Errors.NO_ENTRY();
      var R = a(T.entryName), O = c(f, S && !T.isDirectory ? a(S) : y ? R : we.basename(R));
      if (T.isDirectory) {
        var j = s.getEntryChildren(T);
        return j.forEach(function(A) {
          if (A.isDirectory) return;
          var Y = A.getData();
          if (!Y)
            throw ve.Errors.CANT_EXTRACT_FILE();
          var K = a(y ? A.entryName : A.entryName.substring(T.entryName.length)), te = c(f, K);
          i.assertPathSafe(f, te);
          const F = E ? A.header.fileAttr : void 0;
          i.writeFileTo(te, Y, _, F);
        }), !0;
      }
      var B = T.getData(s.password);
      if (!B) throw ve.Errors.CANT_EXTRACT_FILE();
      if (i.assertPathSafe(f, O), i.fs.existsSync(O) && !_)
        throw ve.Errors.CANT_OVERRIDE();
      const P = E ? m.header.fileAttr : void 0;
      return i.writeFileTo(O, B, _, P), !0;
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
          var y = f.getData(m);
          if (!y)
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
    extractAllTo: function(m, f, y, _) {
      if (y = cn(!1, y), _ = Hc(y, _), f = cn(!1, f), !s) throw ve.Errors.NO_ZIP();
      const E = [];
      s.entries.forEach(function(S) {
        var T = c(m, a(S.entryName));
        if (i.assertPathSafe(m, T), S.isDirectory) {
          i.makeDir(T), y && E.push({ path: T, attr: S.header.fileAttr });
          return;
        }
        var R = S.getData(_);
        if (!R)
          throw ve.Errors.CANT_EXTRACT_FILE();
        const O = y ? S.header.fileAttr : void 0;
        i.writeFileTo(T, R, f, O);
        try {
          i.fs.utimesSync(T, S.header.time, S.header.time);
        } catch {
        }
      }), o(E);
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
    extractAllToAsync: function(m, f, y, _) {
      if (_ = K1(f, y, _), y = cn(!1, y), f = cn(!1, f), !_)
        return new Promise((B, P) => {
          this.extractAllToAsync(m, f, y, function(A) {
            A ? P(A) : B(this);
          });
        });
      if (!s) {
        _(ve.Errors.NO_ZIP());
        return;
      }
      m = we.resolve(m);
      const E = (B) => c(m, we.normalize(a(B.entryName))), S = (B, P) => new Error(B + ': "' + P + '"'), T = [], R = [];
      s.entries.forEach((B) => {
        B.isDirectory ? T.push(B) : R.push(B);
      });
      const O = [];
      for (const B of T) {
        const P = E(B), A = y ? B.header.fileAttr : void 0;
        try {
          i.assertPathSafe(m, P), i.makeDir(P);
        } catch {
          _(S("Unable to create folder", P));
          continue;
        }
        A && O.push({ path: P, attr: A });
        try {
          i.fs.utimesSync(P, B.header.time, B.header.time);
        } catch {
        }
      }
      const j = (B) => {
        if (!B)
          try {
            o(O);
          } catch (P) {
            return _(S("Unable to set folder permissions", P.path || ""));
          }
        _(B);
      };
      R.reverse().reduce(function(B, P) {
        return function(A) {
          if (A)
            B(A);
          else {
            const Y = we.normalize(a(P.entryName)), K = c(m, Y);
            try {
              i.assertPathSafe(m, K);
            } catch (te) {
              return B(te);
            }
            P.getDataAsync(function(te, F) {
              if (F)
                B(F);
              else if (!te)
                B(ve.Errors.CANT_EXTRACT_FILE());
              else {
                const b = y ? P.header.fileAttr : void 0;
                i.writeFileToAsync(K, te, f, b, function(M) {
                  if (!M)
                    return B(S("Unable to write file", K));
                  i.fs.utimes(K, P.header.time, P.header.time, function() {
                    B();
                  });
                });
              }
            });
          }
        };
      }, j)();
    },
    /**
     * Writes the newly created zip file to disk at the specified location or if a zip was opened and no ``targetFileName`` is provided, it will overwrite the opened zip
     *
     * @param {string} targetFileName
     * @param {function} callback
     */
    writeZip: function(m, f) {
      if (arguments.length === 1 && typeof m == "function" && (f = m, m = ""), !m && r.filename && (m = r.filename), !!m) {
        var y = s.compressToBuffer();
        if (y) {
          var _ = i.writeFileTo(m, y, !0);
          typeof f == "function" && f(_ ? null : new Error("failed"), "");
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
      const { overwrite: y, perm: _ } = Object.assign({ overwrite: !0 }, f);
      return new Promise((E, S) => {
        !m && r.filename && (m = r.filename), m || S("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((T) => {
          const R = (O) => O ? E(O) : S("ADM-ZIP: Wasn't able to write zip file");
          i.writeFileToAsync(m, T, y, _, R);
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
    toBuffer: function(m, f, y, _) {
      return typeof m == "function" ? (s.toAsyncBuffer(m, f, y, _), null) : s.compressToBuffer();
    }
  };
};
const mo = /* @__PURE__ */ Gh(eA);
function Cd(e) {
  const n = e.replace(/[^0-9.].*$/, "").split(".").map((s) => parseInt(s, 10)), r = n[0], i = n[1] ?? 0, o = n[2] ?? 0;
  return r > 1 || i > 20 || i === 20 && o >= 5 ? 21 : i >= 17 ? 17 : 8;
}
const Gc = {
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
function tA(e) {
  const t = Gc[e] || Gc[17];
  return process.platform === "win32" ? t.win : process.platform === "darwin" ? process.arch === "arm64" ? t.mac_aarch64 : t.mac_x64 : t.linux_x64;
}
const Er = /* @__PURE__ */ new Map();
let gn = 0, En = 0;
function go() {
  const e = Ge.getPath("userData"), t = k.join(e, ".mine-launcher");
  return x.existsSync(t) || x.mkdirSync(t, { recursive: !0 }), t;
}
function Id(e) {
  const t = jh.createHash("md5");
  t.update(`OfflinePlayer:${e}`);
  const n = t.digest();
  n[6] = n[6] & 15 | 48, n[8] = n[8] & 63 | 128;
  const r = n.toString("hex");
  return `${r.slice(0, 8)}-${r.slice(8, 12)}-${r.slice(12, 16)}-${r.slice(16, 20)}-${r.slice(20, 32)}`;
}
function hn(e) {
  return new Promise((t, n) => {
    (e.startsWith("https") ? ji : Rs).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (o) => {
      if (o.statusCode && o.statusCode >= 300 && o.statusCode < 400 && o.headers.location)
        return o.resume(), hn(o.headers.location).then(t).catch(n);
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
function St(e, t, n) {
  return new Promise((r, i) => {
    const o = k.dirname(t);
    x.existsSync(o) || x.mkdirSync(o, { recursive: !0 });
    const s = x.createWriteStream(t);
    (e.startsWith("https") ? ji : Rs).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (p) => {
      if (p.statusCode && p.statusCode >= 300 && p.statusCode < 400 && p.headers.location)
        return s.close(), x.unlinkSync(t), St(p.headers.location, t, n).then(r).catch(i);
      if (p.statusCode !== 200)
        return s.close(), x.unlink(t, () => {
        }), p.resume(), i(new Error(`HTTP ${p.statusCode}: ${e}`));
      p.on("data", (l) => n == null ? void 0 : n(l.length)), p.pipe(s), s.on("finish", () => s.close(() => r())), s.on("error", i);
    }).on("error", (p) => {
      s.close(), x.unlink(t, () => {
      }), i(p);
    });
  });
}
function ur(e) {
  return !e.includes("..") && !k.isAbsolute(e);
}
function nA(e, t, n) {
  var s;
  const r = new mo(e), i = k.resolve(t);
  let o = 0;
  for (const a of r.getEntries()) {
    if (a.isDirectory) continue;
    const c = a.entryName.replace(/\\/g, "/"), p = Number(((s = a.header) == null ? void 0 : s.attr) ?? 0);
    if ((p >>> 16 & 61440) === 40960 || (p & 61440) === 40960)
      throw new Error(`Архив содержит symlink: ${c}`);
    if (k.isAbsolute(c) || /^[A-Za-z]:/.test(c) || c.split("/").some((w) => w === "" || w === "." || w === ".."))
      throw new Error(`Небезопасный путь в архиве: ${c}`);
    const u = k.resolve(i, ...c.split("/")), h = k.relative(i, u);
    if (h === "" || h.startsWith("..") || k.isAbsolute(h))
      throw new Error(`Путь вне каталога распаковки: ${c}`);
    x.mkdirSync(k.dirname(u), { recursive: !0 }), x.writeFileSync(u, a.getData()), o++;
  }
  return o;
}
async function ls(e, t) {
  if (x.existsSync(e))
    try {
      const n = process.platform === "win32" ? ".dll" : process.platform === "darwin" ? ".dylib" : ".so", r = new mo(e);
      for (const i of r.getEntries()) {
        if (i.isDirectory) continue;
        const o = k.basename(i.entryName.replace(/\\/g, "/"));
        o.toLowerCase().endsWith(n) && /^[A-Za-z0-9._ -]{1,200}$/.test(o) && x.writeFileSync(k.join(t, o), i.getData());
      }
    } catch {
    }
}
let Vt = [];
function qc(e) {
  Vt.push(e), Vt.length > 120 && (Vt = Vt.slice(-120));
}
function rA(e) {
  const t = e.join(`
`);
  return t.match(/Unsupported class file major version (\d+)/) ? "Похоже, у вас неправильно подобрана версия Java — версия игры требует более новую Java. Откройте «Настройки» и в разделе Java проверьте, что путь ведёт к правильной JDK/JRE." : /java\.lang\.OutOfMemoryError/.test(t) ? "Игре не хватило памяти. Увеличьте «Максимальную память» в настройках лаунчера (в МБ) и попробуйте снова." : /-1073741515|0xc0000135/i.test(t) ? "Не найдены системные библиотеки Windows. Установите Microsoft Visual C++ Redistributable (x64) — это самая частая причина на чистой Windows." : /-1073741819|0xc0000005/i.test(t) ? "Крит native-кода. Чаще всего помогает обновление видеодрайвера. Если не помогло — запустите без модов и посмотрите лог." : /UnsatisfiedLinkError/i.test(t) ? "Не загрузились системные библиотеки игры (LWJGL natives). Проверьте, не блокирует ли их антивирус, и запустите снова — недостающие файлы скачаются заново." : /No space left|disk full|ENOSPC/i.test(t) ? "Закончилось место на диске. Освободите его и попробуйте снова." : /Failed to (download|fetch)|Could not (download|fetch)|assets/i.test(t) && /asset|resources/i.test(t) ? "Не удалось скачать игровые ресурсы (assets) — часто это сетевая блокировка CDN Mojang у провайдера. Попробуйте другое подключение или VPN и запустите снова." : /Could not create the Java Virtual Machine|Invalid or corrupt jarfile| unrecognized/.test(t) ? "Проверьте аргументы JVM в настройках лаунчера — Java не смогла запуститься с текущими параметрами." : /GLFW error|OpenGL|gpu|DirectX/i.test(t) && /error|fail/i.test(t) ? "Похоже, проблема с видеодрайвером/OpenGL. Обновите драйвер видеокарты." : /Incompatible.fml.mod|Fabric loader|Quilt loading/i.test(t) ? "Похоже, один из модов несовместим с этой версией или загрузчиком. Откройте вкладку «Моды» и отключите их по одному." : /Mixin apply failed|MixinTransformer/i.test(t) ? "Ошибка в моде (Mixin). Отключите свежеустановленные моды во вкладке «Моды»." : /The game crashed.*Calling event|Exception in thread "main"/.test(t) ? "Игра упала при старте. Попробуйте без модов или откройте папку сборки и покажите лог на форуме." : "Смотрите вкладку «Логи» для подробностей.";
}
function iA(e, t = process.platform === "win32" ? "windows" : process.platform === "darwin" ? "osx" : "linux") {
  if (!e || e.length === 0) return !0;
  let n = !1;
  for (const r of e)
    (!r.os || r.os.name === t) && (n = r.action === "allow");
  return n;
}
async function Dd() {
  const e = [], t = process.platform === "win32", n = t ? "javaw.exe" : "java", r = go(), i = (o, s = 0) => {
    if (!x.existsSync(o) || s > 6) return null;
    try {
      const a = x.readdirSync(o);
      for (const c of a) {
        const p = k.join(o, c);
        if (c.toLowerCase() === n.toLowerCase()) return p;
        try {
          if (x.statSync(p).isDirectory()) {
            const l = i(p, s + 1);
            if (l) return l;
          }
        } catch {
        }
      }
    } catch {
    }
    return null;
  };
  for (const o of [21, 17, 8]) {
    const s = i(k.join(r, "java", `java-${o}`));
    s && e.push(s);
  }
  if (process.env.JAVA_HOME) {
    const o = k.join(process.env.JAVA_HOME, "bin", n);
    x.existsSync(o) && e.push(o);
  }
  if (t) {
    const o = [
      "C:\\Program Files\\Java",
      "C:\\Program Files (x86)\\Java",
      "C:\\Program Files\\Eclipse Adoptium",
      "C:\\Program Files\\Microsoft",
      "C:\\Program Files\\BellSoft",
      "C:\\Program Files\\Amazon Corretto",
      k.join(process.env.LOCALAPPDATA || "", "Programs", "AdoptOpenJDK"),
      "C:\\Program Files (x86)\\Minecraft Launcher\\runtime"
    ];
    for (const s of o)
      if (x.existsSync(s))
        try {
          for (const a of x.readdirSync(s)) {
            const c = k.join(s, a, "bin", n);
            x.existsSync(c) && !e.includes(c) && e.push(c);
          }
        } catch {
        }
  } else {
    const o = ["/usr/lib/jvm", "/usr/lib64/jvm", "/Library/Java/JavaVirtualMachines", "/opt/java"];
    for (const s of o)
      if (x.existsSync(s))
        try {
          for (const a of x.readdirSync(s))
            for (const c of [`${a}/bin/java`, `${a}/Contents/Home/bin/java`]) {
              const p = k.join(s, c);
              x.existsSync(p) && !e.includes(p) && e.push(p);
            }
        } catch {
        }
  }
  return e;
}
async function oA(e, t, n = 17) {
  const r = go(), i = k.join(r, "java", `java-${n}`), o = (h, w = 0) => {
    if (!x.existsSync(h) || w > 6) return null;
    try {
      for (const m of x.readdirSync(h)) {
        const f = k.join(h, m);
        if (m.toLowerCase() === (process.platform === "win32" ? "javaw.exe" : "java").toLowerCase()) return f;
        try {
          if (x.statSync(f).isDirectory()) {
            const y = o(f, w + 1);
            if (y) return y;
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
  const a = process.platform === "win32", c = tA(n), p = a ? "zip" : ".tar.gz", l = k.join(r, "java", `java-${n}.${p}`);
  x.existsSync(k.dirname(l)) || x.mkdirSync(k.dirname(l), { recursive: !0 }), await St(c, l, (h) => {
    En += h;
    const w = Date.now();
    if (w - gn > 1e3) {
      const m = En / Math.max(1, (w - gn) / 1e3);
      gn = w, En = 0, e({
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
  }), t({ timestamp: Date.now(), type: "info", message: `Распаковка архива Java ${n}...` }), x.existsSync(i) || x.mkdirSync(i, { recursive: !0 }), a ? nA(l, i) : us(`tar -xzf "${l}" -C "${i}"`), x.unlinkSync(l);
  const u = o(i);
  if (!u) throw new Error(`Java ${n} распакована некорректно — попробуйте установить её вручную`);
  return t({ timestamp: Date.now(), type: "info", message: `Java ${n} установлена: ${u}` }), u;
}
async function Nd() {
  return await hn("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function sA(e, t, n) {
  var p, l, u, h, w, m, f, y, _;
  gn = 0, En = 0, Vt = [];
  const r = go(), i = k.join(r, "instances", e.instanceId), o = k.join(r, "assets"), s = k.join(r, "libraries"), a = k.join(r, "versions"), c = k.join(i, "natives");
  for (const E of [i, c])
    x.existsSync(E) || x.mkdirSync(E, { recursive: !0 });
  try {
    let E = e.javaPath, S = !1;
    if (E && x.existsSync(E))
      try {
        us(`"${E}" -version 2>&1`, { stdio: "ignore" }), S = !0;
      } catch {
      }
    if (!S) {
      const N = await Dd();
      for (const q of N)
        try {
          us(`"${q}" -version 2>&1`, { stdio: "ignore" }), E = q, S = !0;
          break;
        } catch {
        }
    }
    S || (E = await oA(t, n, Cd(e.version))), n({ timestamp: Date.now(), type: "info", message: `Java: ${E}` }), t({ instanceId: e.instanceId, stage: "checking", statusText: "Проверка версии...", progress: 5 });
    const T = (await Nd()).versions.find((N) => N.id === e.version);
    if (!T) throw new Error(`Версия ${e.version} не найдена на серверах Mojang`);
    const R = k.join(a, e.version, `${e.version}.json`);
    let O;
    if (x.existsSync(R))
      try {
        O = JSON.parse(x.readFileSync(R, "utf-8"));
      } catch {
        O = null;
      }
    if (O || (t({ instanceId: e.instanceId, stage: "downloading", statusText: `Загрузка версии ${e.version}...`, progress: 10 }), O = await hn(T.url), x.existsSync(k.dirname(R)) || x.mkdirSync(k.dirname(R), { recursive: !0 }), x.writeFileSync(R, JSON.stringify(O, null, 2))), (p = O.assetIndex) != null && p.url) {
      const N = k.join(o, "indexes", `${O.assetIndex.id}.json`);
      x.existsSync(N) || (t({ instanceId: e.instanceId, stage: "downloading", statusText: "Загрузка манифеста ресурсов...", progress: 12 }), await St(O.assetIndex.url, N));
      try {
        const W = JSON.parse(x.readFileSync(N, "utf-8")).objects || {}, U = k.join(o, "objects"), Q = [];
        for (const re of Object.keys(W)) {
          const V = W[re].hash, ie = k.join(U, V.slice(0, 2), V);
          x.existsSync(ie) || Q.push({ hash: V });
        }
        if (Q.length > 0) {
          t({
            instanceId: e.instanceId,
            stage: "downloading",
            statusText: `Загрузка ресурсов (0/${Q.length})...`,
            progress: 15
          });
          let re = 0;
          const V = 64;
          let ie = Date.now(), Se = 0;
          for (let le = 0; le < Q.length; le += V) {
            const ct = Q.slice(le, le + V);
            await Promise.all(
              ct.map((et) => St(
                `https://resources.download.minecraft.net/${et.hash.slice(0, 2)}/${et.hash}`,
                k.join(U, et.hash.slice(0, 2), et.hash),
                (nn) => {
                  Se += nn;
                }
              ).catch(() => {
              }))
            ), re += ct.length;
            const It = Date.now();
            if (It - ie > 1500) {
              const et = Se / Math.max(1, (It - ie) / 1e3);
              t({
                instanceId: e.instanceId,
                stage: "downloading",
                statusText: `Загрузка ресурсов (${re}/${Q.length}) — ${(et / 1024 / 1024).toFixed(1)} МБ/с`,
                progress: 15 + re / Q.length * 25
              }), ie = It, Se = 0;
            }
          }
        }
      } catch (q) {
        n({ timestamp: Date.now(), type: "warn", message: `Ресурсы: ${q.message}` });
      }
    }
    const j = k.join(a, e.version, `${e.version}.jar`);
    if (!x.existsSync(j) && ((u = (l = O.downloads) == null ? void 0 : l.client) != null && u.url)) {
      const N = (q) => {
        En += q;
        const W = Date.now();
        if (W - gn > 500) {
          const U = En / Math.max(1, (W - gn) / 1e3);
          gn = W, En = 0, t({
            instanceId: e.instanceId,
            stage: "downloading",
            statusText: `Загрузка Minecraft ${e.version}.jar — ${(U / 1024 / 1024).toFixed(1)} МБ/с`,
            progress: 45
          });
        }
      };
      t({ instanceId: e.instanceId, stage: "downloading", statusText: `Загрузка Minecraft ${e.version}.jar...`, progress: 42 }), await St(O.downloads.client.url, j, N);
    }
    t({ instanceId: e.instanceId, stage: "downloading", statusText: "Загрузка библиотек...", progress: 50 });
    const B = [], P = O.libraries || [];
    let A = 0, Y = 0, K = 0;
    for (const N of P) {
      if (!iA(N.rules)) continue;
      if ((h = N.downloads) != null && h.artifact) {
        const W = N.downloads.artifact.path;
        if (!ur(W)) {
          n({ timestamp: Date.now(), type: "warn", message: `Библиотека пропущена (путь вне каталога): ${W}` });
          continue;
        }
        const U = k.join(s, W);
        if (!x.existsSync(U))
          try {
            await St(N.downloads.artifact.url, U, (Q) => {
              Y += Q;
            });
          } catch {
          }
        x.existsSync(U) && (B.push(U), (W.includes("natives") || N.name.includes("natives")) && await ls(U, c));
      }
      if ((w = N.downloads) != null && w.classifiers) {
        const W = N.downloads.classifiers, U = process.platform === "win32" ? W["natives-windows"] || W["natives-windows-64"] || W["natives-windows-x86"] : process.platform === "darwin" ? W["natives-osx"] || W["natives-macos"] : W["natives-linux"];
        if (U) {
          const Q = U.path;
          if (!ur(Q)) continue;
          const re = k.join(s, Q);
          if (!x.existsSync(re))
            try {
              await St(U.url, re, (V) => {
                Y += V;
              });
            } catch {
            }
          x.existsSync(re) && await ls(re, c);
        }
      }
      if (!((m = N.downloads) != null && m.artifact) && N.name) {
        const W = N.name.split(":"), U = W[0].replace(/\./g, "/"), Q = W[1], re = W[2], V = `${U}/${Q}/${re}/${Q}-${re}.jar`;
        if (!ur(V)) continue;
        const ie = k.join(s, V), Se = N.url ? `${N.url}${V}` : `https://libraries.minecraft.net/${V}`;
        if (!x.existsSync(ie))
          try {
            await St(Se, ie, (le) => {
              Y += le;
            });
          } catch {
          }
        x.existsSync(ie) && (B.push(ie), N.name.includes("natives") && await ls(ie, c));
      }
      K++;
      const q = Date.now();
      if (q - A > 800 && Y > 0) {
        const W = Y / Math.max(1, (q - A) / 1e3);
        t({
          instanceId: e.instanceId,
          stage: "downloading",
          statusText: `Библиотеки ${K}/${P.length} — ${(W / 1024 / 1024).toFixed(1)} МБ/с`,
          progress: 50 + K / P.length * 15
        }), A = q, Y = 0;
      }
    }
    B.push(j);
    let te = O.mainClass || "net.minecraft.client.main.Main";
    const F = [];
    if (e.loader === "fabric") {
      t({ instanceId: e.instanceId, stage: "downloading", statusText: "Установка Fabric...", progress: 72 });
      try {
        const N = await hn(`https://meta.fabricmc.net/v2/versions/loader/${e.version}`);
        if (N != null && N.length) {
          const q = N[0].loader.version, W = await hn(
            `https://meta.fabricmc.net/v2/versions/loader/${e.version}/${q}/profile/json`
          );
          if (W.mainClass && (te = W.mainClass), W.libraries)
            for (const U of W.libraries) {
              const Q = U.name.split(":"), re = Q[0].replace(/\./g, "/"), V = Q[1], ie = Q[2], Se = `${re}/${V}/${ie}/${V}-${ie}.jar`;
              if (!ur(Se)) continue;
              const le = k.join(s, Se), ct = U.url ? `${U.url}${Se}` : `https://maven.fabricmc.net/${Se}`;
              if (!x.existsSync(le))
                try {
                  await St(ct, le);
                } catch {
                }
              x.existsSync(le) && B.unshift(le);
            }
        }
      } catch (N) {
        throw new Error(`Ошибка загрузки Fabric: ${N.message}`);
      }
    }
    if (e.loader === "quilt") {
      t({ instanceId: e.instanceId, stage: "downloading", statusText: "Установка Quilt...", progress: 72 });
      try {
        const N = await hn(`https://meta.quiltmc.org/v3/versions/loader/${e.version}`);
        if (N != null && N.length) {
          const q = N[0].loader.version, W = await hn(
            `https://meta.quiltmc.org/v3/versions/loader/${e.version}/${q}/profile/json`
          );
          if (W.mainClass && (te = W.mainClass), W.libraries)
            for (const U of W.libraries) {
              const Q = U.name.split(":"), re = Q[0].replace(/\./g, "/"), V = Q[1], ie = Q[2], Se = `${re}/${V}/${ie}/${V}-${ie}.jar`;
              if (!ur(Se)) continue;
              const le = k.join(s, Se), ct = U.url ? `${U.url}${Se}` : `https://maven.quiltmc.org/repository/release/${Se}`;
              if (!x.existsSync(le))
                try {
                  await St(ct, le);
                } catch {
                }
              x.existsSync(le) && B.unshift(le);
            }
        }
      } catch (N) {
        throw new Error(`Ошибка загрузки Quilt: ${N.message}`);
      }
    }
    t({ instanceId: e.instanceId, stage: "launching", statusText: "Запуск игры...", progress: 92 });
    const b = B.join(k.delimiter), M = [];
    M.push(`-Xms${e.memoryMin || 1024}M`), M.push(`-Xmx${e.memoryMax || 4096}M`), (f = e.customJvmArgs) != null && f.includes("-Djava.library.path") || M.push(`-Djava.library.path=${c}`), M.push(
      "-XX:+UseG1GC",
      "-XX:+UnlockExperimentalVMOptions",
      "-XX:G1NewSizePercent=20",
      "-XX:G1ReservePercent=20",
      "-XX:MaxGCPauseMillis=50",
      "-XX:G1HeapRegionSize=32M"
    ), e.customJvmArgs && M.push(...e.customJvmArgs.split(" ").filter(Boolean)), F.push("-cp", b, te), M.push(...F);
    const $ = (e.uuid || Id(e.username || "Player")).replace(/-/g, "");
    if (O.minecraftArguments && typeof O.minecraftArguments == "string")
      for (const N of O.minecraftArguments.split(" "))
        M.push(
          N.replace("${auth_player_name}", e.username || "Player").replace("${version_name}", `${e.version}-${e.loader}`).replace("${game_directory}", i).replace("${assets_root}", o).replace("${assets_index_name}", ((y = O.assetIndex) == null ? void 0 : y.id) || e.version).replace("${auth_uuid}", $).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", e.loader === "vanilla" ? "release" : "release/mod")
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
        ((_ = O.assetIndex) == null ? void 0 : _.id) || e.version,
        "--uuid",
        $,
        "--accessToken",
        "0",
        "--userType",
        "mojang",
        "--versionType",
        "release"
      );
    e.fullscreen && !M.includes("--fullscreen") && M.push("--fullscreen"), e.customGameArgs && M.push(...e.customGameArgs.split(" ").filter(Boolean)), n({ timestamp: Date.now(), type: "info", message: `Запуск: "${E}" ${M.slice(0, 8).join(" ")} ... [обрезано]` });
    const G = Hh(E || "javaw", M, {
      cwd: i,
      detached: !e.hideLauncher
    });
    Er.set(e.instanceId, G), G.stdout.on("data", (N) => {
      for (const q of N.toString().split(`
`))
        q.trim() && (qc(q), n({ timestamp: Date.now(), type: "info", message: q }));
    }), G.stderr.on("data", (N) => {
      for (const q of N.toString().split(`
`))
        q.trim() && (qc(q), n({ timestamp: Date.now(), type: "warn", message: q }));
    }), G.on("error", (N) => {
      Er.delete(e.instanceId), t({
        instanceId: e.instanceId,
        stage: "error",
        statusText: `Ошибка запуска: ${N.message}`,
        progress: 0,
        error: N.message
      }), n({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${N.message}` });
    }), G.on("exit", (N) => {
      if (Er.delete(e.instanceId), N === 0)
        Vt = [], t({ instanceId: e.instanceId, stage: "idle", statusText: "", progress: 0 }), n({ timestamp: Date.now(), type: "info", message: "Minecraft завершён." });
      else {
        const q = rA(Vt);
        Vt = [], t({
          instanceId: e.instanceId,
          stage: "error",
          statusText: `Игра завершилась с ошибкой (код ${N}). ${q}`,
          progress: 0,
          error: `exit ${N}`
        }), n({ timestamp: Date.now(), type: "error", message: `Minecraft завершился с кодом ${N}. ${q}` });
      }
    }), t({ instanceId: e.instanceId, stage: "running", statusText: "Игра запущена!", progress: 100 });
  } catch (E) {
    t({
      instanceId: e.instanceId,
      stage: "error",
      statusText: `Ошибка: ${E.message}`,
      progress: 0,
      error: E.message
    }), n({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${E.message}` });
  }
}
function zc(e) {
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
const Od = 64 * 1024 * 1024, Vc = 512 * 1024 * 1024, aA = Od;
function lA(e) {
  return {
    format: 1,
    name: e.name,
    version: e.version,
    loader: ["vanilla", "fabric", "quilt"].includes(e.loader) ? e.loader : "vanilla",
    exportedAt: Date.now()
  };
}
function cA(e) {
  let t = 0;
  const n = [];
  for (const r of e) {
    const i = (r.entryName || "").replace(/\\/g, "/");
    if (!i) throw new Error("Архив содержит пустое имя файла");
    const o = i.replace(/\/+$/, "");
    if (k.isAbsolute(o) || /^[a-zA-Z]:/.test(o))
      throw new Error("Архив содержит абсолютный путь — импорт отклонён");
    const s = o.split("/");
    if (s.some((a) => a === "" || a === "." || a === ".."))
      throw new Error("Архив содержит небезопасный путь — импорт отклонён");
    if (o === "instance.json") {
      if (t += r.size, t > Vc) throw new Error("Архив слишком большой");
      continue;
    }
    if (s[0] !== "mods" || s.length !== 2)
      throw new Error(`Неожиданный файл в архиве: ${o}`);
    if (!/\.jar(\.disabled)?$/i.test(s[1]))
      throw new Error(`В папке mods ожидаются только .jar: ${s[1]}`);
    if (r.size > Od)
      throw new Error(`Файл мода слишком большой: ${s[1]}`);
    if (t += r.size, t > Vc) throw new Error("Архив слишком большой");
    n.includes(s[1]) || n.push(s[1]);
  }
  if (!e.some((r) => (r.entryName || "").replace(/\\/g, "/").replace(/\/+$/, "") === "instance.json"))
    throw new Error("В архиве нет instance.json — это не сборка Mine Launcher");
  if (n.length === 0)
    throw new Error("В архиве нет модов — импортировать нечего");
  return n;
}
function uA(e) {
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
function fA(e, t) {
  const n = e.trim() || "Импортированная сборка";
  if (!t.includes(n)) return n;
  for (let r = 2; r < 100; r++) {
    const i = `${n} (${r})`;
    if (!t.includes(i)) return i;
  }
  return `${n} (${Date.now().toString(36)})`;
}
const dA = 2048;
function bd(e) {
  try {
    const t = new URL(e);
    if (t.protocol !== "minelauncher:" || (t.hostname || t.pathname.replace(/^\/+/, "")) !== "import") return null;
    const r = t.searchParams.get("url");
    if (!r || r.length > dA) return null;
    const i = new URL(r);
    return i.protocol !== "https:" || i.username || i.password || !i.hostname ? null : { url: i.toString() };
  } catch {
    return null;
  }
}
function Rd(e) {
  for (const t of e) {
    if (!/^minelauncher:\/\//i.test(t)) continue;
    const n = bd(t);
    if (n) return n;
  }
  return null;
}
Jc.setApplicationMenu(null);
Ge.requestSingleInstanceLock() || Ge.quit();
const $d = k.dirname(Mh(import.meta.url));
process.env.APP_ROOT = k.join($d, "..");
const Yt = process.env.VITE_DEV_SERVER_URL, Ld = k.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Yt ? k.join(process.env.APP_ROOT, "public") : Ld;
Ge.setName("mine-launcher");
try {
  Yt ? Ge.setAsDefaultProtocolClient("minelauncher", process.execPath, [k.resolve(process.argv[1] || ".")]) : Ge.setAsDefaultProtocolClient("minelauncher");
} catch {
}
let H = null, it = null;
const Re = go(), Ci = k.join(Re, "accounts.json"), Gn = k.join(Re, "instances.json"), Ns = k.join(Re, "settings.json"), jt = k.join(Re, "skins");
function ma(e, t) {
  try {
    if (x.existsSync(e)) return JSON.parse(x.readFileSync(e, "utf-8"));
  } catch {
  }
  return t;
}
function vt(e, t) {
  try {
    x.writeFileSync(e, JSON.stringify(t, null, 2), "utf-8");
  } catch (n) {
    console.error(`Failed saving ${e}:`, n);
  }
}
let _e = ma(Ci, []), ge = ma(Gn, []);
const ga = Math.round(Bh.totalmem() / 1024 / 1024), Ea = Math.max(2048, Math.min(4096, Math.floor(ga / 3)));
let Te = ma(Ns, {
  javaPath: "",
  memoryMin: 1024,
  memoryMax: Ea,
  customJvmArgs: "",
  closeLauncherOnGameStart: !1,
  fullscreen: !1,
  hideLauncher: !1
});
(!Te.memoryMax || Te.memoryMax > ga * 0.85) && (Te.memoryMax = Ea);
function Eo() {
  H = new Zc({
    width: 1100,
    height: 740,
    minWidth: 940,
    minHeight: 660,
    frame: !1,
    titleBarStyle: "hidden",
    backgroundColor: "#111217",
    icon: k.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: k.join($d, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0,
      webSecurity: !0
    }
  }), Yt ? H.loadURL(Yt) : H.loadFile(k.join(Ld, "index.html")), H.on("closed", () => {
    H = null;
  }), H.webContents.setWindowOpenHandler(() => ({ action: "deny" })), H.webContents.on("will-navigate", (e) => e.preventDefault());
}
function hA() {
  if (it) return it;
  const e = k.join(process.env.VITE_PUBLIC, "icon.png");
  let t = Ua.createFromPath(e);
  t.isEmpty() && (t = Ua.createEmpty()), it = new Fh(t), it.setToolTip("Mine Launcher"), it.on("click", () => {
    H == null || H.show();
  });
  const n = Jc.buildFromTemplate([
    { label: "Показать лаунчер", click: () => H == null ? void 0 : H.show() },
    { type: "separator" },
    { label: "Выход", click: () => Ge.quit() }
  ]);
  return it.setContextMenu(n), it;
}
function Ln(e) {
  try {
    H == null || H.webContents.send("updater:state", e);
  } catch {
  }
}
function pA() {
  Yt || process.platform !== "linux" && (je.autoUpdater.autoDownload = !0, je.autoUpdater.autoInstallOnAppQuit = !0, je.autoUpdater.allowDowngrade = !1, je.autoUpdater.on("checking-for-update", () => {
    Ln({ status: "checking" });
  }), je.autoUpdater.on("update-available", (e) => {
    Ln({ status: "available", info: e });
    try {
      je.autoUpdater.downloadUpdate();
    } catch {
    }
  }), je.autoUpdater.on("update-not-available", (e) => {
    Ln({ status: "not-available", info: e });
  }), je.autoUpdater.on("download-progress", (e) => {
    Ln({
      status: "downloading",
      percent: e.percent,
      transferred: e.transferred,
      total: e.total,
      bytesPerSecond: e.bytesPerSecond
    });
  }), je.autoUpdater.on("update-downloaded", (e) => {
    Ln({ status: "downloaded", info: e });
  }), je.autoUpdater.on("error", (e) => {
    Ln({ status: "error", message: (e == null ? void 0 : e.message) || "Ошибка обновления" });
  }), setTimeout(() => {
    je.autoUpdater.checkForUpdates().catch(() => {
    });
  }, 4e3), setInterval(() => {
    je.autoUpdater.checkForUpdates().catch(() => {
    });
  }, 4 * 60 * 60 * 1e3));
}
function mA() {
  hA(), it == null || it.setToolTip("Mine Launcher — игра запущена"), H == null || H.hide();
}
Ge.on("second-instance", (e, t) => {
  H ? (H.isMinimized() && H.restore(), H.show(), H.focus()) : Eo();
  const n = Rd(t || []);
  n && Fd(n);
});
Ge.on("open-url", (e, t) => {
  e.preventDefault();
  const n = bd(t);
  n && Fd(n);
});
Ge.on("window-all-closed", () => {
  process.platform !== "darwin" && Ge.quit(), H = null;
});
Ge.on("activate", () => {
  Zc.getAllWindows().length === 0 && Eo();
});
function Os(e, t) {
  return new Promise((n, r) => {
    const i = k.dirname(t);
    x.existsSync(i) || x.mkdirSync(i, { recursive: !0 });
    const o = x.createWriteStream(t);
    (e.startsWith("https") ? ji : Rs).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (c) => {
      if (c.statusCode && c.statusCode >= 300 && c.statusCode < 400 && c.headers.location)
        return o.close(), Os(c.headers.location, t).then(n).catch(r);
      if (c.statusCode !== 200)
        return o.close(), x.unlink(t, () => {
        }), c.resume(), r(new Error(`HTTP ${c.statusCode}: ${e}`));
      c.pipe(o), o.on("finish", () => o.close(() => n())), o.on("error", r);
    }).on("error", (c) => {
      o.close(), x.unlink(t, () => {
      }), r(c);
    });
  });
}
const Wc = 600 * 1024 * 1024;
let Ui = Rd(process.argv);
function xd(e, t, n = 0) {
  return new Promise((r, i) => {
    if (n > 3) return i(new Error("Слишком много перенаправлений"));
    let o;
    try {
      o = new URL(e);
    } catch {
      return i(new Error("Некорректная ссылка"));
    }
    if (o.protocol !== "https:") return i(new Error("Разрешены только https-ссылки"));
    let s = !1;
    const a = (l) => {
      s || (s = !0, i(l));
    }, c = () => {
      s || (s = !0, r());
    }, p = ji.get(e, { headers: { "User-Agent": "MineLauncher/2.0" }, timeout: 2e4 }, (l) => {
      if (l.statusCode && l.statusCode >= 300 && l.statusCode < 400 && l.headers.location)
        return l.resume(), xd(new URL(l.headers.location, e).toString(), t, n + 1).then(c).catch(a);
      if (l.statusCode !== 200)
        return l.resume(), a(new Error(`HTTP ${l.statusCode}`));
      if (Number(l.headers["content-length"] || 0) > Wc)
        return l.resume(), a(new Error("Архив больше 600 МБ — отказ"));
      const h = x.createWriteStream(t);
      let w = 0;
      l.on("data", (m) => {
        w += m.length, w > Wc && (l.destroy(), h.destroy(), x.rm(t, { force: !0 }, () => {
        }), a(new Error("Архив больше 600 МБ — отказ")));
      }), l.on("error", a), h.on("error", a), l.pipe(h), h.on("finish", () => h.close(c));
    });
    p.on("timeout", () => p.destroy(new Error("Таймаут загрузки"))), p.on("error", a);
  });
}
async function Pd(e) {
  H || Eo();
  const t = new URL(e.url).hostname;
  if ((await xn.showMessageBox(H, {
    type: "question",
    buttons: ["Импортировать", "Отмена"],
    defaultId: 0,
    cancelId: 1,
    title: "Импорт сборки по ссылке",
    message: `Скачать и импортировать сборку с ${t}?`,
    detail: e.url
  })).response !== 0) return;
  const r = k.join(Ge.getPath("temp"), `mine-launcher-import-${Date.now()}.zip`);
  try {
    await xd(e.url, r);
    const i = Ud(r);
    H == null || H.show(), H == null || H.focus(), H == null || H.webContents.send("deep-link:result", {
      ok: !0,
      message: "Сборка импортирована по ссылке",
      instances: i.instances,
      importedId: i.importedId
    });
  } catch (i) {
    H == null || H.webContents.send("deep-link:result", {
      ok: !1,
      message: (i == null ? void 0 : i.message) || "Не удалось импортировать сборку"
    });
  } finally {
    x.rm(r, { force: !0 }, () => {
    });
  }
}
function Fd(e) {
  if (!Ge.isReady() || !H || H.webContents.isLoading()) {
    Ui = e;
    return;
  }
  Pd(e).catch(() => {
  });
}
function Yc() {
  const e = Ui;
  !e || !H || (Ui = null, Pd(e).catch(() => {
  }));
}
function cs(e, t) {
  const n = k.relative(k.resolve(e), k.resolve(t));
  return n !== "" && !n.startsWith("..") && !k.isAbsolute(n);
}
function Ot(e) {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(e)) throw new Error("Некорректный id сборки");
  return e;
}
function wi(e) {
  if (!/^[A-Za-z0-9._ -]{1,255}$/.test(e)) throw new Error("Некорректное имя файла");
  return e;
}
function Ud(e) {
  if (x.statSync(e).size > 600 * 1024 * 1024) throw new Error("Архив больше 600 МБ — отказ");
  const n = new mo(e), r = n.getEntries().filter((u) => !u.isDirectory), i = cA(
    r.map((u) => ({ entryName: u.entryName, size: u.header.size }))
  ), o = n.getEntry("instance.json");
  if (!o) throw new Error("В архиве нет instance.json");
  const s = uA(JSON.parse(o.getData().toString("utf-8"))), a = "inst-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), c = {
    id: a,
    name: fA(s.name, ge.map((u) => u.name)),
    version: s.version,
    loader: s.loader,
    created: Date.now(),
    memoryMin: Te.memoryMin,
    memoryMax: Te.memoryMax
  }, p = k.join(Re, "instances", a), l = k.join(p, "mods");
  try {
    x.mkdirSync(l, { recursive: !0 });
    const u = /* @__PURE__ */ new Map();
    for (const h of r) {
      const w = h.entryName.replace(/\\/g, "/").replace(/\/+$/, "");
      w.startsWith("mods/") && u.set(w.slice(5), h);
    }
    for (const h of i) {
      const w = u.get(h);
      if (!w) throw new Error(`Файл мода пропал при чтении: ${h}`);
      const m = w.getData();
      if (m.length > aA)
        throw new Error(`Файл мода распаковался больше лимита: ${h}`);
      x.writeFileSync(k.join(l, h), m);
    }
    x.mkdirSync(k.join(p, "saves"), { recursive: !0 });
  } catch (u) {
    throw x.rmSync(p, { recursive: !0, force: !0 }), u;
  }
  return ge.push(c), vt(Gn, ge), { instances: ge, importedId: a };
}
function gA() {
  ne.handle("minimize-window", () => {
    H == null || H.minimize();
  }), ne.handle("maximize-window", () => H ? H.isMaximized() ? (H.unmaximize(), !1) : (H.maximize(), !0) : !1), ne.handle("close-window", () => {
    H == null || H.close();
  }), ne.handle("is-maximized", () => (H == null ? void 0 : H.isMaximized()) || !1), ne.handle("get-accounts", () => _e), ne.handle("add-account", (e, t) => {
    const n = t.trim();
    if (!n) throw new Error("Введите никнейм");
    if (n.length > 16) throw new Error("Никнейм слишком длинный (максимум 16 символов)");
    if (!/^[a-zA-Z0-9_]+$/.test(n)) throw new Error("Допустимы только латинские буквы, цифры и знак _");
    if (_e.some((i) => i.username.toLowerCase() === n.toLowerCase()))
      throw new Error(`Аккаунт «${n}» уже добавлен`);
    const r = {
      id: Date.now().toString(),
      username: n,
      uuid: Id(n),
      type: "offline",
      isActive: _e.length === 0,
      createdAt: Date.now()
    };
    return _e.push(r), vt(Ci, _e), _e;
  }), ne.handle("set-active-account", (e, t) => (_e = _e.map((n) => ({ ...n, isActive: n.id === t })), vt(Ci, _e), _e)), ne.handle("delete-account", (e, t) => (_e = _e.filter((n) => n.id !== t), _e.length > 0 && !_e.some((n) => n.isActive) && (_e[0].isActive = !0), vt(Ci, _e), _e)), ne.handle("get-instances", () => ge), ne.handle("create-instance", (e, t) => {
    if (!t.version) throw new Error("Выберите версию Minecraft");
    if (ge.some((r) => r.name === t.name)) throw new Error(`Сборка «${t.name}» уже существует`);
    const n = {
      id: "inst-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6),
      name: t.name,
      version: t.version,
      loader: t.loader || "vanilla",
      created: Date.now(),
      memoryMin: Te.memoryMin,
      memoryMax: Te.memoryMax
    };
    ge.push(n), vt(Gn, ge);
    for (const r of ["mods", "saves"]) {
      const i = k.join(Re, "instances", n.id, r);
      x.existsSync(i) || x.mkdirSync(i, { recursive: !0 });
    }
    return ge;
  }), ne.handle("rename-instance", (e, { id: t, name: n }) => {
    const r = ge.find((i) => i.id === t);
    if (!r) throw new Error("Сборка не найдена");
    return r.name = n.trim(), vt(Gn, ge), ge;
  }), ne.handle("delete-instance", (e, t) => {
    Ot(t);
    const n = ge.find((r) => r.id === t);
    return ge = ge.filter((r) => r.id !== t), vt(Gn, ge), n && x.existsSync(k.join(Re, "instances", t)) && H && xn.showMessageBox(H, {
      type: "question",
      buttons: ["Удалить", "Отмена"],
      defaultId: 1,
      title: "Удалить сборку?",
      message: `Удалить сборку «${n.name}» вместе с мирами, модами и файлами игры?`
    }).then(({ response: r }) => {
      r === 0 && x.rmSync(k.join(Re, "instances", t), { recursive: !0, force: !0 });
    }), ge;
  }), ne.handle("export-instance", async (e, t) => {
    Ot(t);
    const n = ge.find((c) => c.id === t);
    if (!n) throw new Error("Сборка не найдена");
    const r = k.join(Re, "instances", t, "mods"), i = x.existsSync(r) ? x.readdirSync(r).filter((c) => /\.jar(\.disabled)?$/i.test(c)) : [];
    if (i.length === 0) throw new Error("В этой сборке нет модов — делиться нечем");
    const o = (n.name || "instance").replace(/[\\/:*?"<>|]/g, "_").trim() || "instance", s = H ? await xn.showSaveDialog(H, {
      title: "Экспорт сборки",
      defaultPath: k.join(Ge.getPath("documents"), `${o}.zip`),
      filters: [{ name: "Сборка Mine Launcher", extensions: ["zip"] }]
    }) : { canceled: !0, filePath: void 0 };
    if (s.canceled || !s.filePath) return { ok: !1, canceled: !0 };
    const a = new mo();
    a.addFile("instance.json", Buffer.from(JSON.stringify(lA(n), null, 2), "utf-8"));
    for (const c of i)
      a.addLocalFile(k.join(r, c), "mods");
    return a.writeZip(s.filePath), { ok: !0, path: s.filePath };
  }), ne.handle("import-instance", async () => {
    const e = H ? await xn.showOpenDialog(H, {
      title: "Импорт сборки",
      properties: ["openFile"],
      filters: [{ name: "Сборка Mine Launcher", extensions: ["zip"] }]
    }) : { canceled: !0, filePaths: [] };
    return e.canceled || e.filePaths.length === 0 ? { ok: !1, canceled: !0 } : { ok: !0, ...Ud(e.filePaths[0]) };
  }), ne.handle("get-versions", async () => {
    try {
      return await Nd();
    } catch {
      return { latest: { release: "", snapshot: "" }, versions: [] };
    }
  }), ne.handle("get-settings", () => Te), ne.handle("set-selected-instance-id", (e, t) => (Te.selectedInstanceId = t, vt(Ns, Te), !0)), ne.handle("save-settings", (e, t) => (Te = { ...Te, ...t }, vt(Ns, Te), Te)), ne.handle("detect-java", async () => Dd()), ne.handle("get-required-java", (e, t) => Cd(t)), ne.handle("open-launcher-folder", () => Fa.openPath(Re)), ne.handle("launch-instance", async (e, t) => {
    Ot(t);
    const n = ge.find((i) => i.id === t);
    if (!n) throw new Error("Сборка не найдена");
    const r = _e.find((i) => i.isActive) || _e[0];
    if (!r) throw new Error("Сначала добавьте аккаунт на панели слева");
    return zc(t) && await new Promise((i) => setTimeout(i, 500)), H == null || H.show(), sA(
      {
        instanceId: n.id,
        instanceName: n.name,
        version: n.version,
        loader: n.loader || "vanilla",
        username: r.username,
        uuid: r.uuid,
        memoryMin: Te.memoryMin || 1024,
        memoryMax: Te.memoryMax || 4096,
        javaPath: n.javaPath || Te.javaPath || void 0,
        customJvmArgs: Te.customJvmArgs || "",
        customGameArgs: "",
        fullscreen: !!Te.fullscreen,
        hideLauncher: !!Te.closeLauncherOnGameStart
      },
      (i) => {
        if ((i == null ? void 0 : i.stage) === "running") {
          const o = ge.find((s) => s.id === t);
          o && (o.lastPlayed = Date.now(), vt(Gn, ge)), Te.closeLauncherOnGameStart && setTimeout(() => {
            try {
              mA();
            } catch {
            }
          }, 3e3);
        }
        ((i == null ? void 0 : i.stage) === "idle" || (i == null ? void 0 : i.stage) === "error") && (it == null || it.setToolTip("Mine Launcher")), H == null || H.webContents.send("launch-progress", i);
      },
      (i) => H == null ? void 0 : H.webContents.send("game-log", i)
    ), !0;
  }), ne.handle("stop-instance", (e, t) => zc(t)), ne.handle("restore-window", () => (H == null || H.show(), !0)), ne.handle("get-system-info", () => ({
    totalRamMb: ga,
    defaultMaxMemory: Ea
  })), ne.handle("open-instance-folder", (e, t) => {
    Ot(t);
    const n = k.join(Re, "instances", t);
    x.existsSync(n) || x.mkdirSync(n, { recursive: !0 }), Fa.openPath(n);
  }), ne.handle("get-instance-mods", (e, t) => {
    Ot(t);
    const n = k.join(Re, "instances", t, "mods");
    if (!x.existsSync(n)) return [];
    try {
      return x.readdirSync(n).filter((r) => r.endsWith(".jar") || r.endsWith(".jar.disabled")).map((r) => {
        const i = k.join(n, r), o = x.statSync(i);
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
    Ot(t);
    const r = k.join(Re, "instances", t, "mods"), i = k.join(r, wi(n));
    if (!cs(r, i) || !x.existsSync(i)) return !1;
    const o = n.endsWith(".jar") ? n + ".disabled" : n.replace(/\.disabled$/, ""), s = k.join(r, wi(o));
    return cs(r, s) ? (x.renameSync(i, s), !0) : !1;
  }), ne.handle("delete-mod", (e, { instanceId: t, modFilename: n }) => {
    Ot(t);
    const r = k.join(Re, "instances", t, "mods"), i = k.join(r, wi(n));
    return cs(r, i) ? (x.existsSync(i) && x.unlinkSync(i), !0) : !1;
  }), ne.handle("download-mod-file", async (e, { instanceId: t, downloadUrl: n, filename: r }) => {
    Ot(t);
    const i = wi(r);
    if (!n.startsWith("https://cdn.modrinth.com/")) throw new Error("Недопустимый источник файла");
    const o = k.join(Re, "instances", t, "mods");
    return x.existsSync(o) || x.mkdirSync(o, { recursive: !0 }), await Os(n, k.join(o, i)), !0;
  }), ne.handle("add-mod-file", async (e, t) => {
    if (Ot(t), !H) return !1;
    const n = await xn.showOpenDialog(H, {
      title: "Выберите файл мода (.jar)",
      filters: [{ name: "Minecraft Mods", extensions: ["jar"] }],
      properties: ["openFile", "multiSelections"]
    });
    if (n.canceled || !n.filePaths.length) return !1;
    const r = k.join(Re, "instances", t, "mods");
    x.existsSync(r) || x.mkdirSync(r, { recursive: !0 });
    for (const i of n.filePaths) {
      const o = k.join(r, k.basename(i));
      x.copyFileSync(i, o);
    }
    return !0;
  }), ne.handle("upload-user-skin", async (e, t) => {
    if (!H) return null;
    const n = await xn.showOpenDialog(H, {
      title: "Выберите скин Minecraft (.png)",
      filters: [{ name: "Minecraft Skin (*.png)", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (n.canceled || !n.filePaths.length) return null;
    x.existsSync(jt) || x.mkdirSync(jt, { recursive: !0 });
    const r = k.join(jt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`);
    return x.copyFileSync(n.filePaths[0], r), H.webContents.send("accounts-updated", _e), r;
  }), ne.handle("fetch-online-skin", async (e, { username: t, targetUsername: n }) => {
    x.existsSync(jt) || x.mkdirSync(jt, { recursive: !0 });
    const r = k.join(jt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`), i = [
      `https://mc-heads.net/skin/${encodeURIComponent(n)}`,
      `https://minotar.net/skin/${encodeURIComponent(n)}`
    ];
    for (const o of i)
      try {
        if (await Os(o, r), x.existsSync(r) && x.statSync(r).size > 100)
          return !0;
      } catch {
      }
    throw new Error(`Скин для «${n}» не найден на серверах`);
  }), ne.handle("get-user-skin", (e, t) => {
    const n = k.join(jt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`);
    return x.existsSync(n) ? n : null;
  }), ne.handle("get-profile-stats", (e, t) => {
    const n = [];
    let r = 0, i = 0;
    for (const s of ge) {
      s.lastPlayed && (i = Math.max(i, s.lastPlayed));
      const a = k.join(Re, "instances", s.id, "saves");
      if (x.existsSync(a))
        try {
          for (const p of x.readdirSync(a)) {
            const l = k.join(a, p);
            if (x.statSync(l).isDirectory()) {
              let u = 0;
              const h = k.join(l, "level.dat");
              x.existsSync(h) && (u = x.statSync(h).mtimeMs), n.push({
                instanceId: s.id,
                instanceName: s.name,
                worldName: p,
                lastPlayed: u
              });
            }
          }
        } catch {
        }
      const c = k.join(Re, "instances", s.id, "mods");
      if (x.existsSync(c))
        try {
          r += x.readdirSync(c).filter((p) => p.endsWith(".jar") || p.endsWith(".jar.disabled")).length;
        } catch {
        }
    }
    const o = _e.find((s) => s.username === t) || _e.find((s) => s.isActive);
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
    const n = k.join(jt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`);
    return x.existsSync(n) ? `file://${n}` : `https://mc-heads.net/avatar/${encodeURIComponent(t)}/64`;
  }), ne.handle("updater:check", async () => {
    if (Yt) return { status: "dev" };
    try {
      return await je.autoUpdater.checkForUpdates(), { ok: !0 };
    } catch (e) {
      return { ok: !1, message: e == null ? void 0 : e.message };
    }
  }), ne.handle("updater:download", async () => {
    if (Yt) return { status: "dev" };
    try {
      return await je.autoUpdater.downloadUpdate(), { ok: !0 };
    } catch (e) {
      return { ok: !1, message: e == null ? void 0 : e.message };
    }
  }), ne.handle("updater:install", () => {
    if (Yt) return !1;
    try {
      return setImmediate(() => {
        je.autoUpdater.quitAndInstall();
      }), !0;
    } catch {
      return !1;
    }
  });
}
Ge.whenReady().then(() => {
  gA(), Eo(), pA(), Ui && (H != null && H.webContents.isLoading() ? H.webContents.once("did-finish-load", () => setTimeout(Yc, 600)) : setTimeout(Yc, 600));
});
export {
  Ld as RENDERER_DIST,
  Yt as VITE_DEV_SERVER_URL
};
