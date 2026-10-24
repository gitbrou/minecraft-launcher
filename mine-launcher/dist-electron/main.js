import _n, { app as Ge, Menu as Zc, BrowserWindow as Kc, dialog as Pn, ipcMain as ne, shell as Ua, nativeImage as ka, Tray as Uh } from "electron";
import xt from "fs";
import kh from "constants";
import Pr from "stream";
import Rs from "util";
import Qc from "assert";
import fe from "path";
import Mi from "child_process";
import eu from "events";
import Zn from "crypto";
import tu from "tty";
import Bi from "os";
import en from "url";
import ji from "zlib";
import Mh from "http";
import { fileURLToPath as Bh } from "node:url";
import k from "node:path";
import x from "node:fs";
import jh from "node:os";
import Hi from "node:https";
import $s from "node:http";
import Hh from "node:crypto";
import { execSync as fs, spawn as Gh } from "node:child_process";
var Ve = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function qh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var je = {}, Sn = {}, Ye = {};
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
var Mt = kh, zh = process.cwd, vi = null, Vh = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return vi || (vi = zh.call(process)), vi;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Ma = process.chdir;
  process.chdir = function(e) {
    vi = null, Ma.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Ma);
}
var Wh = Yh;
function Yh(e) {
  Mt.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || n(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = r(e.chmod), e.fchmod = r(e.fchmod), e.lchmod = r(e.lchmod), e.chownSync = s(e.chownSync), e.fchownSync = s(e.fchownSync), e.lchownSync = s(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = a(e.stat), e.fstat = a(e.fstat), e.lstat = a(e.lstat), e.statSync = c(e.statSync), e.fstatSync = c(e.fstatSync), e.lstatSync = c(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(l, u, h) {
    h && process.nextTick(h);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(l, u, h, w) {
    w && process.nextTick(w);
  }, e.lchownSync = function() {
  }), Vh === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(l) {
    function u(h, w, m) {
      var f = Date.now(), E = 0;
      l(h, w, function _(y) {
        if (y && (y.code === "EACCES" || y.code === "EPERM" || y.code === "EBUSY") && Date.now() - f < 6e4) {
          setTimeout(function() {
            e.stat(w, function(S, T) {
              S && S.code === "ENOENT" ? l(h, w, _) : m(y);
            });
          }, E), E < 100 && (E += 10);
          return;
        }
        m && m(y);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(l) {
    function u(h, w, m, f, E, _) {
      var y;
      if (_ && typeof _ == "function") {
        var S = 0;
        y = function(T, R, b) {
          if (T && T.code === "EAGAIN" && S < 10)
            return S++, l.call(e, h, w, m, f, E, y);
          _.apply(this, arguments);
        };
      }
      return l.call(e, h, w, m, f, E, y);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, l), u;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(l) {
    return function(u, h, w, m, f) {
      for (var E = 0; ; )
        try {
          return l.call(e, u, h, w, m, f);
        } catch (_) {
          if (_.code === "EAGAIN" && E < 10) {
            E++;
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
          l.fchmod(f, h, function(E) {
            l.close(f, function(_) {
              w && w(E || _);
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
      l.open(u, Mt.O_SYMLINK, function(f, E) {
        if (f) {
          m && m(f);
          return;
        }
        l.futimes(E, h, w, function(_) {
          l.close(E, function(y) {
            m && m(_ || y);
          });
        });
      });
    }, l.lutimesSync = function(u, h, w) {
      var m = l.openSync(u, Mt.O_SYMLINK), f, E = !0;
      try {
        f = l.futimesSync(m, h, w), E = !1;
      } finally {
        if (E)
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
      function m(f, E) {
        E && (E.uid < 0 && (E.uid += 4294967296), E.gid < 0 && (E.gid += 4294967296)), w && w.apply(this, arguments);
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
var Ba = Pr.Stream, Xh = Jh;
function Jh(e) {
  return {
    ReadStream: t,
    WriteStream: n
  };
  function t(r, i) {
    if (!(this instanceof t)) return new t(r, i);
    Ba.call(this);
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
    Ba.call(this), this.path = r, this.fd = null, this.writable = !0, this.flags = "w", this.encoding = "binary", this.mode = 438, this.bytesWritten = 0, i = i || {};
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
var Zh = Qh, Kh = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Qh(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Kh(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(n) {
    Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
  }), t;
}
var Ee = xt, ep = Wh, tp = Xh, np = Zh, ri = Rs, Pe, Di;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Pe = Symbol.for("graceful-fs.queue"), Di = Symbol.for("graceful-fs.previous")) : (Pe = "___graceful-fs.queue", Di = "___graceful-fs.previous");
function rp() {
}
function nu(e, t) {
  Object.defineProperty(e, Pe, {
    get: function() {
      return t;
    }
  });
}
var wn = rp;
ri.debuglog ? wn = ri.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (wn = function() {
  var e = ri.format.apply(ri, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!Ee[Pe]) {
  var ip = Ve[Pe] || [];
  nu(Ee, ip), Ee.close = function(e) {
    function t(n, r) {
      return e.call(Ee, n, function(i) {
        i || ja(), typeof r == "function" && r.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Di, {
      value: e
    }), t;
  }(Ee.close), Ee.closeSync = function(e) {
    function t(n) {
      e.apply(Ee, arguments), ja();
    }
    return Object.defineProperty(t, Di, {
      value: e
    }), t;
  }(Ee.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    wn(Ee[Pe]), Qc.equal(Ee[Pe].length, 0);
  });
}
Ve[Pe] || nu(Ve, Ee[Pe]);
var Xe = Ls(np(Ee));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !Ee.__patched && (Xe = Ls(Ee), Ee.__patched = !0);
function Ls(e) {
  ep(e), e.gracefulify = Ls, e.createReadStream = R, e.createWriteStream = b;
  var t = e.readFile;
  e.readFile = n;
  function n(P, A, Y) {
    return typeof A == "function" && (Y = A, A = null), K(P, A, Y);
    function K(te, F, O, M) {
      return t(te, F, function($) {
        $ && ($.code === "EMFILE" || $.code === "ENFILE") ? bn([K, [te, F, O], $, M || Date.now(), Date.now()]) : typeof O == "function" && O.apply(this, arguments);
      });
    }
  }
  var r = e.writeFile;
  e.writeFile = i;
  function i(P, A, Y, K) {
    return typeof Y == "function" && (K = Y, Y = null), te(P, A, Y, K);
    function te(F, O, M, $, q) {
      return r(F, O, M, function(N) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? bn([te, [F, O, M, $], N, q || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = s);
  function s(P, A, Y, K) {
    return typeof Y == "function" && (K = Y, Y = null), te(P, A, Y, K);
    function te(F, O, M, $, q) {
      return o(F, O, M, function(N) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? bn([te, [F, O, M, $], N, q || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  var a = e.copyFile;
  a && (e.copyFile = c);
  function c(P, A, Y, K) {
    return typeof Y == "function" && (K = Y, Y = 0), te(P, A, Y, K);
    function te(F, O, M, $, q) {
      return a(F, O, M, function(N) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? bn([te, [F, O, M, $], N, q || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  var p = e.readdir;
  e.readdir = u;
  var l = /^v[0-5]\./;
  function u(P, A, Y) {
    typeof A == "function" && (Y = A, A = null);
    var K = l.test(process.version) ? function(O, M, $, q) {
      return p(O, te(
        O,
        M,
        $,
        q
      ));
    } : function(O, M, $, q) {
      return p(O, M, te(
        O,
        M,
        $,
        q
      ));
    };
    return K(P, A, Y);
    function te(F, O, M, $) {
      return function(q, N) {
        q && (q.code === "EMFILE" || q.code === "ENFILE") ? bn([
          K,
          [F, O, M],
          q,
          $ || Date.now(),
          Date.now()
        ]) : (N && N.sort && N.sort(), typeof M == "function" && M.call(this, q, N));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var h = tp(e);
    _ = h.ReadStream, S = h.WriteStream;
  }
  var w = e.ReadStream;
  w && (_.prototype = Object.create(w.prototype), _.prototype.open = y);
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
  var E = S;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return E;
    },
    set: function(P) {
      E = P;
    },
    enumerable: !0,
    configurable: !0
  });
  function _(P, A) {
    return this instanceof _ ? (w.apply(this, arguments), this) : _.apply(Object.create(_.prototype), arguments);
  }
  function y() {
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
  function b(P, A) {
    return new e.WriteStream(P, A);
  }
  var j = e.open;
  e.open = B;
  function B(P, A, Y, K) {
    return typeof Y == "function" && (K = Y, Y = null), te(P, A, Y, K);
    function te(F, O, M, $, q) {
      return j(F, O, M, function(N, H) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? bn([te, [F, O, M, $], N, q || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  return e;
}
function bn(e) {
  wn("ENQUEUE", e[0].name, e[1]), Ee[Pe].push(e), xs();
}
var ii;
function ja() {
  for (var e = Date.now(), t = 0; t < Ee[Pe].length; ++t)
    Ee[Pe][t].length > 2 && (Ee[Pe][t][3] = e, Ee[Pe][t][4] = e);
  xs();
}
function xs() {
  if (clearTimeout(ii), ii = void 0, Ee[Pe].length !== 0) {
    var e = Ee[Pe].shift(), t = e[0], n = e[1], r = e[2], i = e[3], o = e[4];
    if (i === void 0)
      wn("RETRY", t.name, n), t.apply(null, n);
    else if (Date.now() - i >= 6e4) {
      wn("TIMEOUT", t.name, n);
      var s = n.pop();
      typeof s == "function" && s.call(null, r);
    } else {
      var a = Date.now() - o, c = Math.max(o - i, 1), p = Math.min(c * 1.2, 100);
      a >= p ? (wn("RETRY", t.name, n), t.apply(null, n.concat([i]))) : Ee[Pe].push(e);
    }
    ii === void 0 && (ii = setTimeout(xs, 0));
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
})(Sn);
var Ps = {}, ru = {};
const op = fe;
ru.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(op.parse(t).root, ""))) {
    const r = new Error(`Path contains invalid characters: ${t}`);
    throw r.code = "EINVAL", r;
  }
};
const iu = Sn, { checkPath: ou } = ru, su = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
Ps.makeDir = async (e, t) => (ou(e), iu.mkdir(e, {
  mode: su(t),
  recursive: !0
}));
Ps.makeDirSync = (e, t) => (ou(e), iu.mkdirSync(e, {
  mode: su(t),
  recursive: !0
}));
const sp = Ye.fromPromise, { makeDir: ap, makeDirSync: Io } = Ps, Do = sp(ap);
var Ct = {
  mkdirs: Do,
  mkdirsSync: Io,
  // alias
  mkdirp: Do,
  mkdirpSync: Io,
  ensureDir: Do,
  ensureDirSync: Io
};
const lp = Ye.fromPromise, au = Sn;
function cp(e) {
  return au.access(e).then(() => !0).catch(() => !1);
}
var An = {
  pathExists: lp(cp),
  pathExistsSync: au.existsSync
};
const zn = Xe;
function up(e, t, n, r) {
  zn.open(e, "r+", (i, o) => {
    if (i) return r(i);
    zn.futimes(o, t, n, (s) => {
      zn.close(o, (a) => {
        r && r(s || a);
      });
    });
  });
}
function fp(e, t, n) {
  const r = zn.openSync(e, "r+");
  return zn.futimesSync(r, t, n), zn.closeSync(r);
}
var lu = {
  utimesMillis: up,
  utimesMillisSync: fp
};
const Wn = Sn, $e = fe, dp = Rs;
function hp(e, t, n) {
  const r = n.dereference ? (i) => Wn.stat(i, { bigint: !0 }) : (i) => Wn.lstat(i, { bigint: !0 });
  return Promise.all([
    r(e),
    r(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function pp(e, t, n) {
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
function mp(e, t, n, r, i) {
  dp.callbackify(hp)(e, t, r, (o, s) => {
    if (o) return i(o);
    const { srcStat: a, destStat: c } = s;
    if (c) {
      if (Fr(a, c)) {
        const p = $e.basename(e), l = $e.basename(t);
        return n === "move" && p !== l && p.toLowerCase() === l.toLowerCase() ? i(null, { srcStat: a, destStat: c, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (a.isDirectory() && !c.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!a.isDirectory() && c.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return a.isDirectory() && Fs(e, t) ? i(new Error(Gi(e, t, n))) : i(null, { srcStat: a, destStat: c });
  });
}
function gp(e, t, n, r) {
  const { srcStat: i, destStat: o } = pp(e, t, r);
  if (o) {
    if (Fr(i, o)) {
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
  if (i.isDirectory() && Fs(e, t))
    throw new Error(Gi(e, t, n));
  return { srcStat: i, destStat: o };
}
function cu(e, t, n, r, i) {
  const o = $e.resolve($e.dirname(e)), s = $e.resolve($e.dirname(n));
  if (s === o || s === $e.parse(s).root) return i();
  Wn.stat(s, { bigint: !0 }, (a, c) => a ? a.code === "ENOENT" ? i() : i(a) : Fr(t, c) ? i(new Error(Gi(e, n, r))) : cu(e, t, s, r, i));
}
function uu(e, t, n, r) {
  const i = $e.resolve($e.dirname(e)), o = $e.resolve($e.dirname(n));
  if (o === i || o === $e.parse(o).root) return;
  let s;
  try {
    s = Wn.statSync(o, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (Fr(t, s))
    throw new Error(Gi(e, n, r));
  return uu(e, t, o, r);
}
function Fr(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Fs(e, t) {
  const n = $e.resolve(e).split($e.sep).filter((i) => i), r = $e.resolve(t).split($e.sep).filter((i) => i);
  return n.reduce((i, o, s) => i && r[s] === o, !0);
}
function Gi(e, t, n) {
  return `Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Kn = {
  checkPaths: mp,
  checkPathsSync: gp,
  checkParentPaths: cu,
  checkParentPathsSync: uu,
  isSrcSubdir: Fs,
  areIdentical: Fr
};
const Ke = Xe, wr = fe, Ep = Ct.mkdirs, yp = An.pathExists, wp = lu.utimesMillis, _r = Kn;
function _p(e, t, n, r) {
  typeof n == "function" && !r ? (r = n, n = {}) : typeof n == "function" && (n = { filter: n }), r = r || function() {
  }, n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), _r.checkPaths(e, t, "copy", n, (i, o) => {
    if (i) return r(i);
    const { srcStat: s, destStat: a } = o;
    _r.checkParentPaths(e, s, t, "copy", (c) => c ? r(c) : n.filter ? fu(Ha, a, e, t, n, r) : Ha(a, e, t, n, r));
  });
}
function Ha(e, t, n, r, i) {
  const o = wr.dirname(n);
  yp(o, (s, a) => {
    if (s) return i(s);
    if (a) return Ni(e, t, n, r, i);
    Ep(o, (c) => c ? i(c) : Ni(e, t, n, r, i));
  });
}
function fu(e, t, n, r, i, o) {
  Promise.resolve(i.filter(n, r)).then((s) => s ? e(t, n, r, i, o) : o(), (s) => o(s));
}
function vp(e, t, n, r, i) {
  return r.filter ? fu(Ni, e, t, n, r, i) : Ni(e, t, n, r, i);
}
function Ni(e, t, n, r, i) {
  (r.dereference ? Ke.stat : Ke.lstat)(t, (s, a) => s ? i(s) : a.isDirectory() ? Np(a, e, t, n, r, i) : a.isFile() || a.isCharacterDevice() || a.isBlockDevice() ? Sp(a, e, t, n, r, i) : a.isSymbolicLink() ? Rp(e, t, n, r, i) : a.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : a.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function Sp(e, t, n, r, i, o) {
  return t ? Ap(e, n, r, i, o) : du(e, n, r, i, o);
}
function Ap(e, t, n, r, i) {
  if (r.overwrite)
    Ke.unlink(n, (o) => o ? i(o) : du(e, t, n, r, i));
  else return r.errorOnExist ? i(new Error(`'${n}' already exists`)) : i();
}
function du(e, t, n, r, i) {
  Ke.copyFile(t, n, (o) => o ? i(o) : r.preserveTimestamps ? Tp(e.mode, t, n, i) : qi(n, e.mode, i));
}
function Tp(e, t, n, r) {
  return Cp(e) ? Ip(n, e, (i) => i ? r(i) : Ga(e, t, n, r)) : Ga(e, t, n, r);
}
function Cp(e) {
  return (e & 128) === 0;
}
function Ip(e, t, n) {
  return qi(e, t | 128, n);
}
function Ga(e, t, n, r) {
  Dp(t, n, (i) => i ? r(i) : qi(n, e, r));
}
function qi(e, t, n) {
  return Ke.chmod(e, t, n);
}
function Dp(e, t, n) {
  Ke.stat(e, (r, i) => r ? n(r) : wp(t, i.atime, i.mtime, n));
}
function Np(e, t, n, r, i, o) {
  return t ? hu(n, r, i, o) : bp(e.mode, n, r, i, o);
}
function bp(e, t, n, r, i) {
  Ke.mkdir(n, (o) => {
    if (o) return i(o);
    hu(t, n, r, (s) => s ? i(s) : qi(n, e, i));
  });
}
function hu(e, t, n, r) {
  Ke.readdir(e, (i, o) => i ? r(i) : pu(o, e, t, n, r));
}
function pu(e, t, n, r, i) {
  const o = e.pop();
  return o ? Op(e, o, t, n, r, i) : i();
}
function Op(e, t, n, r, i, o) {
  const s = wr.join(n, t), a = wr.join(r, t);
  _r.checkPaths(s, a, "copy", i, (c, p) => {
    if (c) return o(c);
    const { destStat: l } = p;
    vp(l, s, a, i, (u) => u ? o(u) : pu(e, n, r, i, o));
  });
}
function Rp(e, t, n, r, i) {
  Ke.readlink(t, (o, s) => {
    if (o) return i(o);
    if (r.dereference && (s = wr.resolve(process.cwd(), s)), e)
      Ke.readlink(n, (a, c) => a ? a.code === "EINVAL" || a.code === "UNKNOWN" ? Ke.symlink(s, n, i) : i(a) : (r.dereference && (c = wr.resolve(process.cwd(), c)), _r.isSrcSubdir(s, c) ? i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${c}'.`)) : e.isDirectory() && _r.isSrcSubdir(c, s) ? i(new Error(`Cannot overwrite '${c}' with '${s}'.`)) : $p(s, n, i)));
    else
      return Ke.symlink(s, n, i);
  });
}
function $p(e, t, n) {
  Ke.unlink(t, (r) => r ? n(r) : Ke.symlink(e, t, n));
}
var Lp = _p;
const He = Xe, vr = fe, xp = Ct.mkdirsSync, Pp = lu.utimesMillisSync, Sr = Kn;
function Fp(e, t, n) {
  typeof n == "function" && (n = { filter: n }), n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: r, destStat: i } = Sr.checkPathsSync(e, t, "copy", n);
  return Sr.checkParentPathsSync(e, r, t, "copy"), Up(i, e, t, n);
}
function Up(e, t, n, r) {
  if (r.filter && !r.filter(t, n)) return;
  const i = vr.dirname(n);
  return He.existsSync(i) || xp(i), mu(e, t, n, r);
}
function kp(e, t, n, r) {
  if (!(r.filter && !r.filter(t, n)))
    return mu(e, t, n, r);
}
function mu(e, t, n, r) {
  const o = (r.dereference ? He.statSync : He.lstatSync)(t);
  if (o.isDirectory()) return zp(o, e, t, n, r);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return Mp(o, e, t, n, r);
  if (o.isSymbolicLink()) return Yp(e, t, n, r);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function Mp(e, t, n, r, i) {
  return t ? Bp(e, n, r, i) : gu(e, n, r, i);
}
function Bp(e, t, n, r) {
  if (r.overwrite)
    return He.unlinkSync(n), gu(e, t, n, r);
  if (r.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
function gu(e, t, n, r) {
  return He.copyFileSync(t, n), r.preserveTimestamps && jp(e.mode, t, n), Us(n, e.mode);
}
function jp(e, t, n) {
  return Hp(e) && Gp(n, e), qp(t, n);
}
function Hp(e) {
  return (e & 128) === 0;
}
function Gp(e, t) {
  return Us(e, t | 128);
}
function Us(e, t) {
  return He.chmodSync(e, t);
}
function qp(e, t) {
  const n = He.statSync(e);
  return Pp(t, n.atime, n.mtime);
}
function zp(e, t, n, r, i) {
  return t ? Eu(n, r, i) : Vp(e.mode, n, r, i);
}
function Vp(e, t, n, r) {
  return He.mkdirSync(n), Eu(t, n, r), Us(n, e);
}
function Eu(e, t, n) {
  He.readdirSync(e).forEach((r) => Wp(r, e, t, n));
}
function Wp(e, t, n, r) {
  const i = vr.join(t, e), o = vr.join(n, e), { destStat: s } = Sr.checkPathsSync(i, o, "copy", r);
  return kp(s, i, o, r);
}
function Yp(e, t, n, r) {
  let i = He.readlinkSync(t);
  if (r.dereference && (i = vr.resolve(process.cwd(), i)), e) {
    let o;
    try {
      o = He.readlinkSync(n);
    } catch (s) {
      if (s.code === "EINVAL" || s.code === "UNKNOWN") return He.symlinkSync(i, n);
      throw s;
    }
    if (r.dereference && (o = vr.resolve(process.cwd(), o)), Sr.isSrcSubdir(i, o))
      throw new Error(`Cannot copy '${i}' to a subdirectory of itself, '${o}'.`);
    if (He.statSync(n).isDirectory() && Sr.isSrcSubdir(o, i))
      throw new Error(`Cannot overwrite '${o}' with '${i}'.`);
    return Xp(i, n);
  } else
    return He.symlinkSync(i, n);
}
function Xp(e, t) {
  return He.unlinkSync(t), He.symlinkSync(e, t);
}
var Jp = Fp;
const Zp = Ye.fromCallback;
var ks = {
  copy: Zp(Lp),
  copySync: Jp
};
const qa = Xe, yu = fe, ue = Qc, Ar = process.platform === "win32";
function wu(e) {
  [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ].forEach((n) => {
    e[n] = e[n] || qa[n], n = n + "Sync", e[n] = e[n] || qa[n];
  }), e.maxBusyTries = e.maxBusyTries || 3;
}
function Ms(e, t, n) {
  let r = 0;
  typeof t == "function" && (n = t, t = {}), ue(e, "rimraf: missing path"), ue.strictEqual(typeof e, "string", "rimraf: path should be a string"), ue.strictEqual(typeof n, "function", "rimraf: callback function required"), ue(t, "rimraf: invalid options argument provided"), ue.strictEqual(typeof t, "object", "rimraf: options should be object"), wu(t), za(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && r < t.maxBusyTries) {
        r++;
        const s = r * 100;
        return setTimeout(() => za(e, t, i), s);
      }
      o.code === "ENOENT" && (o = null);
    }
    n(o);
  });
}
function za(e, t, n) {
  ue(e), ue(t), ue(typeof n == "function"), t.lstat(e, (r, i) => {
    if (r && r.code === "ENOENT")
      return n(null);
    if (r && r.code === "EPERM" && Ar)
      return Va(e, t, r, n);
    if (i && i.isDirectory())
      return Si(e, t, r, n);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return n(null);
        if (o.code === "EPERM")
          return Ar ? Va(e, t, o, n) : Si(e, t, o, n);
        if (o.code === "EISDIR")
          return Si(e, t, o, n);
      }
      return n(o);
    });
  });
}
function Va(e, t, n, r) {
  ue(e), ue(t), ue(typeof r == "function"), t.chmod(e, 438, (i) => {
    i ? r(i.code === "ENOENT" ? null : n) : t.stat(e, (o, s) => {
      o ? r(o.code === "ENOENT" ? null : n) : s.isDirectory() ? Si(e, t, n, r) : t.unlink(e, r);
    });
  });
}
function Wa(e, t, n) {
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
  r.isDirectory() ? Ai(e, t, n) : t.unlinkSync(e);
}
function Si(e, t, n, r) {
  ue(e), ue(t), ue(typeof r == "function"), t.rmdir(e, (i) => {
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? Kp(e, t, r) : i && i.code === "ENOTDIR" ? r(n) : r(i);
  });
}
function Kp(e, t, n) {
  ue(e), ue(t), ue(typeof n == "function"), t.readdir(e, (r, i) => {
    if (r) return n(r);
    let o = i.length, s;
    if (o === 0) return t.rmdir(e, n);
    i.forEach((a) => {
      Ms(yu.join(e, a), t, (c) => {
        if (!s) {
          if (c) return n(s = c);
          --o === 0 && t.rmdir(e, n);
        }
      });
    });
  });
}
function _u(e, t) {
  let n;
  t = t || {}, wu(t), ue(e, "rimraf: missing path"), ue.strictEqual(typeof e, "string", "rimraf: path should be a string"), ue(t, "rimraf: missing options"), ue.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    n = t.lstatSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    r.code === "EPERM" && Ar && Wa(e, t, r);
  }
  try {
    n && n.isDirectory() ? Ai(e, t, null) : t.unlinkSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    if (r.code === "EPERM")
      return Ar ? Wa(e, t, r) : Ai(e, t, r);
    if (r.code !== "EISDIR")
      throw r;
    Ai(e, t, r);
  }
}
function Ai(e, t, n) {
  ue(e), ue(t);
  try {
    t.rmdirSync(e);
  } catch (r) {
    if (r.code === "ENOTDIR")
      throw n;
    if (r.code === "ENOTEMPTY" || r.code === "EEXIST" || r.code === "EPERM")
      Qp(e, t);
    else if (r.code !== "ENOENT")
      throw r;
  }
}
function Qp(e, t) {
  if (ue(e), ue(t), t.readdirSync(e).forEach((n) => _u(yu.join(e, n), t)), Ar) {
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
var em = Ms;
Ms.sync = _u;
const bi = Xe, tm = Ye.fromCallback, vu = em;
function nm(e, t) {
  if (bi.rm) return bi.rm(e, { recursive: !0, force: !0 }, t);
  vu(e, t);
}
function rm(e) {
  if (bi.rmSync) return bi.rmSync(e, { recursive: !0, force: !0 });
  vu.sync(e);
}
var zi = {
  remove: tm(nm),
  removeSync: rm
};
const im = Ye.fromPromise, Su = Sn, Au = fe, Tu = Ct, Cu = zi, Ya = im(async function(t) {
  let n;
  try {
    n = await Su.readdir(t);
  } catch {
    return Tu.mkdirs(t);
  }
  return Promise.all(n.map((r) => Cu.remove(Au.join(t, r))));
});
function Xa(e) {
  let t;
  try {
    t = Su.readdirSync(e);
  } catch {
    return Tu.mkdirsSync(e);
  }
  t.forEach((n) => {
    n = Au.join(e, n), Cu.removeSync(n);
  });
}
var om = {
  emptyDirSync: Xa,
  emptydirSync: Xa,
  emptyDir: Ya,
  emptydir: Ya
};
const sm = Ye.fromCallback, Iu = fe, zt = Xe, Du = Ct;
function am(e, t) {
  function n() {
    zt.writeFile(e, "", (r) => {
      if (r) return t(r);
      t();
    });
  }
  zt.stat(e, (r, i) => {
    if (!r && i.isFile()) return t();
    const o = Iu.dirname(e);
    zt.stat(o, (s, a) => {
      if (s)
        return s.code === "ENOENT" ? Du.mkdirs(o, (c) => {
          if (c) return t(c);
          n();
        }) : t(s);
      a.isDirectory() ? n() : zt.readdir(o, (c) => {
        if (c) return t(c);
      });
    });
  });
}
function lm(e) {
  let t;
  try {
    t = zt.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const n = Iu.dirname(e);
  try {
    zt.statSync(n).isDirectory() || zt.readdirSync(n);
  } catch (r) {
    if (r && r.code === "ENOENT") Du.mkdirsSync(n);
    else throw r;
  }
  zt.writeFileSync(e, "");
}
var cm = {
  createFile: sm(am),
  createFileSync: lm
};
const um = Ye.fromCallback, Nu = fe, Gt = Xe, bu = Ct, fm = An.pathExists, { areIdentical: Ou } = Kn;
function dm(e, t, n) {
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
      const c = Nu.dirname(t);
      fm(c, (p, l) => {
        if (p) return n(p);
        if (l) return r(e, t);
        bu.mkdirs(c, (u) => {
          if (u) return n(u);
          r(e, t);
        });
      });
    });
  });
}
function hm(e, t) {
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
  const r = Nu.dirname(t);
  return Gt.existsSync(r) || bu.mkdirsSync(r), Gt.linkSync(e, t);
}
var pm = {
  createLink: um(dm),
  createLinkSync: hm
};
const Vt = fe, mr = Xe, mm = An.pathExists;
function gm(e, t, n) {
  if (Vt.isAbsolute(e))
    return mr.lstat(e, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), n(r)) : n(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const r = Vt.dirname(t), i = Vt.join(r, e);
    return mm(i, (o, s) => o ? n(o) : s ? n(null, {
      toCwd: i,
      toDst: e
    }) : mr.lstat(e, (a) => a ? (a.message = a.message.replace("lstat", "ensureSymlink"), n(a)) : n(null, {
      toCwd: e,
      toDst: Vt.relative(r, e)
    })));
  }
}
function Em(e, t) {
  let n;
  if (Vt.isAbsolute(e)) {
    if (n = mr.existsSync(e), !n) throw new Error("absolute srcpath does not exist");
    return {
      toCwd: e,
      toDst: e
    };
  } else {
    const r = Vt.dirname(t), i = Vt.join(r, e);
    if (n = mr.existsSync(i), n)
      return {
        toCwd: i,
        toDst: e
      };
    if (n = mr.existsSync(e), !n) throw new Error("relative srcpath does not exist");
    return {
      toCwd: e,
      toDst: Vt.relative(r, e)
    };
  }
}
var ym = {
  symlinkPaths: gm,
  symlinkPathsSync: Em
};
const Ru = Xe;
function wm(e, t, n) {
  if (n = typeof t == "function" ? t : n, t = typeof t == "function" ? !1 : t, t) return n(null, t);
  Ru.lstat(e, (r, i) => {
    if (r) return n(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", n(null, t);
  });
}
function _m(e, t) {
  let n;
  if (t) return t;
  try {
    n = Ru.lstatSync(e);
  } catch {
    return "file";
  }
  return n && n.isDirectory() ? "dir" : "file";
}
var vm = {
  symlinkType: wm,
  symlinkTypeSync: _m
};
const Sm = Ye.fromCallback, $u = fe, ht = Sn, Lu = Ct, Am = Lu.mkdirs, Tm = Lu.mkdirsSync, xu = ym, Cm = xu.symlinkPaths, Im = xu.symlinkPathsSync, Pu = vm, Dm = Pu.symlinkType, Nm = Pu.symlinkTypeSync, bm = An.pathExists, { areIdentical: Fu } = Kn;
function Om(e, t, n, r) {
  r = typeof n == "function" ? n : r, n = typeof n == "function" ? !1 : n, ht.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      ht.stat(e),
      ht.stat(t)
    ]).then(([s, a]) => {
      if (Fu(s, a)) return r(null);
      Ja(e, t, n, r);
    }) : Ja(e, t, n, r);
  });
}
function Ja(e, t, n, r) {
  Cm(e, t, (i, o) => {
    if (i) return r(i);
    e = o.toDst, Dm(o.toCwd, n, (s, a) => {
      if (s) return r(s);
      const c = $u.dirname(t);
      bm(c, (p, l) => {
        if (p) return r(p);
        if (l) return ht.symlink(e, t, a, r);
        Am(c, (u) => {
          if (u) return r(u);
          ht.symlink(e, t, a, r);
        });
      });
    });
  });
}
function Rm(e, t, n) {
  let r;
  try {
    r = ht.lstatSync(t);
  } catch {
  }
  if (r && r.isSymbolicLink()) {
    const a = ht.statSync(e), c = ht.statSync(t);
    if (Fu(a, c)) return;
  }
  const i = Im(e, t);
  e = i.toDst, n = Nm(i.toCwd, n);
  const o = $u.dirname(t);
  return ht.existsSync(o) || Tm(o), ht.symlinkSync(e, t, n);
}
var $m = {
  createSymlink: Sm(Om),
  createSymlinkSync: Rm
};
const { createFile: Za, createFileSync: Ka } = cm, { createLink: Qa, createLinkSync: el } = pm, { createSymlink: tl, createSymlinkSync: nl } = $m;
var Lm = {
  // file
  createFile: Za,
  createFileSync: Ka,
  ensureFile: Za,
  ensureFileSync: Ka,
  // link
  createLink: Qa,
  createLinkSync: el,
  ensureLink: Qa,
  ensureLinkSync: el,
  // symlink
  createSymlink: tl,
  createSymlinkSync: nl,
  ensureSymlink: tl,
  ensureSymlinkSync: nl
};
function xm(e, { EOL: t = `
`, finalEOL: n = !0, replacer: r = null, spaces: i } = {}) {
  const o = n ? t : "", s = JSON.stringify(e, r, i);
  if (s === void 0)
    throw new TypeError(`Converting ${typeof e} value to JSON is not supported`);
  return s.replace(/\n/g, t) + o;
}
function Pm(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var Bs = { stringify: xm, stripBom: Pm };
let Yn;
try {
  Yn = Xe;
} catch {
  Yn = xt;
}
const Vi = Ye, { stringify: Uu, stripBom: ku } = Bs;
async function Fm(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || Yn, r = "throws" in t ? t.throws : !0;
  let i = await Vi.fromCallback(n.readFile)(e, t);
  i = ku(i);
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
const Um = Vi.fromPromise(Fm);
function km(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || Yn, r = "throws" in t ? t.throws : !0;
  try {
    let i = n.readFileSync(e, t);
    return i = ku(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (r)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function Mm(e, t, n = {}) {
  const r = n.fs || Yn, i = Uu(t, n);
  await Vi.fromCallback(r.writeFile)(e, i, n);
}
const Bm = Vi.fromPromise(Mm);
function jm(e, t, n = {}) {
  const r = n.fs || Yn, i = Uu(t, n);
  return r.writeFileSync(e, i, n);
}
var Hm = {
  readFile: Um,
  readFileSync: km,
  writeFile: Bm,
  writeFileSync: jm
};
const oi = Hm;
var Gm = {
  // jsonfile exports
  readJson: oi.readFile,
  readJsonSync: oi.readFileSync,
  writeJson: oi.writeFile,
  writeJsonSync: oi.writeFileSync
};
const qm = Ye.fromCallback, gr = Xe, Mu = fe, Bu = Ct, zm = An.pathExists;
function Vm(e, t, n, r) {
  typeof n == "function" && (r = n, n = "utf8");
  const i = Mu.dirname(e);
  zm(i, (o, s) => {
    if (o) return r(o);
    if (s) return gr.writeFile(e, t, n, r);
    Bu.mkdirs(i, (a) => {
      if (a) return r(a);
      gr.writeFile(e, t, n, r);
    });
  });
}
function Wm(e, ...t) {
  const n = Mu.dirname(e);
  if (gr.existsSync(n))
    return gr.writeFileSync(e, ...t);
  Bu.mkdirsSync(n), gr.writeFileSync(e, ...t);
}
var js = {
  outputFile: qm(Vm),
  outputFileSync: Wm
};
const { stringify: Ym } = Bs, { outputFile: Xm } = js;
async function Jm(e, t, n = {}) {
  const r = Ym(t, n);
  await Xm(e, r, n);
}
var Zm = Jm;
const { stringify: Km } = Bs, { outputFileSync: Qm } = js;
function e0(e, t, n) {
  const r = Km(t, n);
  Qm(e, r, n);
}
var t0 = e0;
const n0 = Ye.fromPromise, We = Gm;
We.outputJson = n0(Zm);
We.outputJsonSync = t0;
We.outputJSON = We.outputJson;
We.outputJSONSync = We.outputJsonSync;
We.writeJSON = We.writeJson;
We.writeJSONSync = We.writeJsonSync;
We.readJSON = We.readJson;
We.readJSONSync = We.readJsonSync;
var r0 = We;
const i0 = Xe, ds = fe, o0 = ks.copy, ju = zi.remove, s0 = Ct.mkdirp, a0 = An.pathExists, rl = Kn;
function l0(e, t, n, r) {
  typeof n == "function" && (r = n, n = {}), n = n || {};
  const i = n.overwrite || n.clobber || !1;
  rl.checkPaths(e, t, "move", n, (o, s) => {
    if (o) return r(o);
    const { srcStat: a, isChangingCase: c = !1 } = s;
    rl.checkParentPaths(e, a, t, "move", (p) => {
      if (p) return r(p);
      if (c0(t)) return il(e, t, i, c, r);
      s0(ds.dirname(t), (l) => l ? r(l) : il(e, t, i, c, r));
    });
  });
}
function c0(e) {
  const t = ds.dirname(e);
  return ds.parse(t).root === t;
}
function il(e, t, n, r, i) {
  if (r) return No(e, t, n, i);
  if (n)
    return ju(t, (o) => o ? i(o) : No(e, t, n, i));
  a0(t, (o, s) => o ? i(o) : s ? i(new Error("dest already exists.")) : No(e, t, n, i));
}
function No(e, t, n, r) {
  i0.rename(e, t, (i) => i ? i.code !== "EXDEV" ? r(i) : u0(e, t, n, r) : r());
}
function u0(e, t, n, r) {
  o0(e, t, {
    overwrite: n,
    errorOnExist: !0
  }, (o) => o ? r(o) : ju(e, r));
}
var f0 = l0;
const Hu = Xe, hs = fe, d0 = ks.copySync, Gu = zi.removeSync, h0 = Ct.mkdirpSync, ol = Kn;
function p0(e, t, n) {
  n = n || {};
  const r = n.overwrite || n.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = ol.checkPathsSync(e, t, "move", n);
  return ol.checkParentPathsSync(e, i, t, "move"), m0(t) || h0(hs.dirname(t)), g0(e, t, r, o);
}
function m0(e) {
  const t = hs.dirname(e);
  return hs.parse(t).root === t;
}
function g0(e, t, n, r) {
  if (r) return bo(e, t, n);
  if (n)
    return Gu(t), bo(e, t, n);
  if (Hu.existsSync(t)) throw new Error("dest already exists.");
  return bo(e, t, n);
}
function bo(e, t, n) {
  try {
    Hu.renameSync(e, t);
  } catch (r) {
    if (r.code !== "EXDEV") throw r;
    return E0(e, t, n);
  }
}
function E0(e, t, n) {
  return d0(e, t, {
    overwrite: n,
    errorOnExist: !0
  }), Gu(e);
}
var y0 = p0;
const w0 = Ye.fromCallback;
var _0 = {
  move: w0(f0),
  moveSync: y0
}, tn = {
  // Export promiseified graceful-fs:
  ...Sn,
  // Export extra methods:
  ...ks,
  ...om,
  ...Lm,
  ...r0,
  ...Ct,
  ..._0,
  ...js,
  ...An,
  ...zi
}, Tn = {}, Jt = {}, be = {}, Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.CancellationError = Zt.CancellationToken = void 0;
const v0 = eu;
class S0 extends v0.EventEmitter {
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
      return Promise.reject(new ps());
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
          o(new ps());
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
Zt.CancellationToken = S0;
class ps extends Error {
  constructor() {
    super("cancelled");
  }
}
Zt.CancellationError = ps;
var Qn = {};
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.newError = A0;
function A0(e, t) {
  const n = new Error(e);
  return n.code = t, n;
}
var Ne = {}, ms = { exports: {} }, si = { exports: {} }, Oo, sl;
function T0() {
  if (sl) return Oo;
  sl = 1;
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
var Ro, al;
function qu() {
  if (al) return Ro;
  al = 1;
  function e(t) {
    r.debug = r, r.default = r, r.coerce = p, r.disable = a, r.enable = o, r.enabled = c, r.humanize = T0(), r.destroy = l, Object.keys(t).forEach((u) => {
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
      function E(..._) {
        if (!E.enabled)
          return;
        const y = E, S = Number(/* @__PURE__ */ new Date()), T = S - (h || S);
        y.diff = T, y.prev = h, y.curr = S, h = S, _[0] = r.coerce(_[0]), typeof _[0] != "string" && _.unshift("%O");
        let R = 0;
        _[0] = _[0].replace(/%([a-zA-Z%])/g, (j, B) => {
          if (j === "%%")
            return "%";
          R++;
          const P = r.formatters[B];
          if (typeof P == "function") {
            const A = _[R];
            j = P.call(y, A), _.splice(R, 1), R--;
          }
          return j;
        }), r.formatArgs.call(y, _), (y.log || r.log).apply(y, _);
      }
      return E.namespace = u, E.useColors = r.useColors(), E.color = r.selectColor(u), E.extend = i, E.destroy = r.destroy, Object.defineProperty(E, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => w !== null ? w : (m !== r.namespaces && (m = r.namespaces, f = r.enabled(u)), f),
        set: (_) => {
          w = _;
        }
      }), typeof r.init == "function" && r.init(E), E;
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
      let w = 0, m = 0, f = -1, E = 0;
      for (; w < u.length; )
        if (m < h.length && (h[m] === u[w] || h[m] === "*"))
          h[m] === "*" ? (f = m, E = w, m++) : (w++, m++);
        else if (f !== -1)
          m = f + 1, E++, w = E;
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
  return Ro = e, Ro;
}
var ll;
function C0() {
  return ll || (ll = 1, function(e, t) {
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
    e.exports = qu()(t);
    const { formatters: a } = e.exports;
    a.j = function(c) {
      try {
        return JSON.stringify(c);
      } catch (p) {
        return "[UnexpectedJSONParseError]: " + p.message;
      }
    };
  }(si, si.exports)), si.exports;
}
var ai = { exports: {} }, $o, cl;
function I0() {
  return cl || (cl = 1, $o = (e, t = process.argv) => {
    const n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", r = t.indexOf(n + e), i = t.indexOf("--");
    return r !== -1 && (i === -1 || r < i);
  }), $o;
}
var Lo, ul;
function D0() {
  if (ul) return Lo;
  ul = 1;
  const e = Bi, t = tu, n = I0(), { env: r } = process;
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
  return Lo = {
    supportsColor: a,
    stdout: o(s(!0, t.isatty(1))),
    stderr: o(s(!0, t.isatty(2)))
  }, Lo;
}
var fl;
function N0() {
  return fl || (fl = 1, function(e, t) {
    const n = tu, r = Rs;
    t.init = l, t.log = a, t.formatArgs = o, t.save = c, t.load = p, t.useColors = i, t.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const h = D0();
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
      const m = w.substring(6).toLowerCase().replace(/_([a-z])/g, (E, _) => _.toUpperCase());
      let f = process.env[w];
      return /^(yes|on|true|enabled)$/i.test(f) ? f = !0 : /^(no|off|false|disabled)$/i.test(f) ? f = !1 : f === "null" ? f = null : f = Number(f), h[m] = f, h;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function o(h) {
      const { namespace: w, useColors: m } = this;
      if (m) {
        const f = this.color, E = "\x1B[3" + (f < 8 ? f : "8;5;" + f), _ = `  ${E};1m${w} \x1B[0m`;
        h[0] = _ + h[0].split(`
`).join(`
` + _), h.push(E + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
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
    e.exports = qu()(t);
    const { formatters: u } = e.exports;
    u.o = function(h) {
      return this.inspectOpts.colors = this.useColors, r.inspect(h, this.inspectOpts).split(`
`).map((w) => w.trim()).join(" ");
    }, u.O = function(h) {
      return this.inspectOpts.colors = this.useColors, r.inspect(h, this.inspectOpts);
    };
  }(ai, ai.exports)), ai.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? ms.exports = C0() : ms.exports = N0();
var b0 = ms.exports, Ur = {};
Object.defineProperty(Ur, "__esModule", { value: !0 });
Ur.ProgressCallbackTransform = void 0;
const O0 = Pr;
class R0 extends O0.Transform {
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
Ur.ProgressCallbackTransform = R0;
Object.defineProperty(Ne, "__esModule", { value: !0 });
Ne.DigestTransform = Ne.HttpExecutor = Ne.HttpError = void 0;
Ne.addSensitiveRedirectHeader = k0;
Ne.addSensitiveFieldPattern = M0;
Ne.createHttpError = Es;
Ne.parseJson = j0;
Ne.configureRequestOptionsFromUrl = Xu;
Ne.configureRequestUrl = qs;
Ne.safeGetHeader = Vn;
Ne.configureRequestOptions = Oi;
Ne.isSensitiveFieldName = Ju;
Ne.hashSensitiveValue = Zu;
Ne.safeStringifyJson = kn;
const zu = Zn, $0 = b0, L0 = xt, x0 = Pr, gs = en, P0 = Zt, dl = Qn, F0 = Ur, Bt = (0, $0.default)("electron-builder"), Hs = (e) => e.toLowerCase().replace(/[-_]/g, ""), Vu = /* @__PURE__ */ new Set(["authorization", "proxyauthorization", "privatetoken", "xapikey", "xauthtoken", "xaccesstoken", "xgitlabtoken", "cookie", "xcsrftoken"]), Wu = ["token", "password", "secret", "authorization", "credential", "apikey", "passphrase", "auth"], U0 = ["key"];
function k0(e) {
  Vu.add(Hs(e));
}
function M0(e) {
  Wu.push(e.toLowerCase().replace(/[-_]/g, ""));
}
function Es(e, t = null) {
  return new Gs(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + kn(e.headers), t);
}
const B0 = /* @__PURE__ */ new Map([
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
class Gs extends Error {
  constructor(t, n = `HTTP error: ${B0.get(t) || t}`, r = null) {
    super(n), this.statusCode = t, this.description = r, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
Ne.HttpError = Gs;
function j0(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class Un {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, n = new P0.CancellationToken(), r) {
    Oi(t);
    const i = r == null ? void 0 : JSON.stringify(r), o = i ? Buffer.from(i) : void 0;
    if (o != null) {
      Bt.enabled && Bt(kn(r));
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
      Bt(`Request: ${kn(a)}`);
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
      Bt(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${kn(f)}`);
    }
    if (t.statusCode === 404) {
      o(Es(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const p = (c = t.statusCode) !== null && c !== void 0 ? c : 0, l = p >= 300 && p < 400, u = Vn(t, "location");
    if (l && u != null) {
      if (s > this.maxRedirects) {
        o(this.createMaxRedirectError());
        return;
      }
      this.doApiRequest(Un.prepareRedirectUrlOptions(u, n), r, a, s).then(i).catch(o);
      return;
    }
    t.setEncoding("utf8");
    let h = "";
    t.on("error", o), t.on("data", (w) => h += w), t.on("end", () => {
      try {
        if (t.statusCode != null && t.statusCode >= 400) {
          const w = Vn(t, "content-type"), m = w != null && (Array.isArray(w) ? w.find((f) => f.includes("json")) != null : w.includes("json"));
          o(Es(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

          Data:
          ${m ? kn(JSON.parse(h)) : h}
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
      qs(t, a), Oi(a), this.doDownload(a, {
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
      const s = Vn(o, "location");
      if (s != null) {
        r < this.maxRedirects ? this.doDownload(Un.prepareRedirectUrlOptions(s, t), n, r++) : n.callback(this.createMaxRedirectError());
        return;
      }
      n.responseHandler == null ? G0(n, o) : n.responseHandler(o, n.callback);
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
    const r = Xu(t, { ...n }), i = r.headers;
    if (i == null)
      return r;
    const o = Un.reconstructOriginalUrl(n), s = Yu(t, n);
    if (Un.isCrossOriginRedirect(o, s)) {
      Bt.enabled && Bt(`Cross-origin redirect (${o.host} → ${s.host}): stripping sensitive headers`);
      for (const a of Object.keys(i))
        Vu.has(Hs(a)) && delete i[a];
    }
    return r;
  }
  static reconstructOriginalUrl(t) {
    const n = t.protocol || "https:";
    if (!t.hostname)
      throw new Error("Missing hostname in request options");
    const r = t.hostname, i = t.port ? `:${t.port}` : "", o = t.path || "/";
    return new gs.URL(`${n}//${r}${i}${o}`);
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
        if (r < n && (i instanceof Gs && i.isServerError() || i.code === "EPIPE")) {
          await new Promise((o) => setTimeout(o, 1e3 * (r + 1)));
          continue;
        }
        throw i;
      }
  }
}
Ne.HttpExecutor = Un;
function Yu(e, t) {
  try {
    return new gs.URL(e);
  } catch {
    const n = t.hostname, r = t.protocol || "https:", i = t.port ? `:${t.port}` : "", o = `${r}//${n}${i}`;
    return new gs.URL(e, o);
  }
}
function Xu(e, t) {
  const n = Oi(t), r = Yu(e, t);
  return qs(r, n), n;
}
function qs(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class ys extends x0.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, n = "sha512", r = "base64") {
    super(), this.expected = t, this.algorithm = n, this.encoding = r, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, zu.createHash)(n);
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
      throw (0, dl.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, dl.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
Ne.DigestTransform = ys;
function H0(e, t, n) {
  return e != null && t != null && e !== t ? (n(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function Vn(e, t) {
  const n = e.headers[t];
  return n == null ? null : Array.isArray(n) ? n.length === 0 ? null : n[n.length - 1] : n;
}
function G0(e, t) {
  if (!H0(Vn(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const n = [];
  if (e.options.onProgress != null) {
    const s = Vn(t, "content-length");
    s != null && n.push(new F0.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const r = e.options.sha512;
  r != null ? n.push(new ys(r, "sha512", r.length === 128 && !r.includes("+") && !r.includes("Z") && !r.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && n.push(new ys(e.options.sha2, "sha256", "hex"));
  const i = (0, L0.createWriteStream)(e.destination);
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
function Ju(e) {
  const t = Hs(e);
  return Wu.some((n) => t.includes(n)) || U0.some((n) => t.endsWith(n));
}
function Zu(e) {
  return `${(0, zu.createHash)("sha256").update(e).digest("hex")} (sha256 hash)`;
}
function kn(e, t) {
  return JSON.stringify(e, (n, r) => Ju(n) || t != null && t.has(n) ? typeof r == "string" ? Zu(r) : "<stripped sensitive data>" : r, 2);
}
var Wi = {};
Object.defineProperty(Wi, "__esModule", { value: !0 });
Wi.MemoLazy = void 0;
class q0 {
  constructor(t, n) {
    this.selector = t, this.creator = n, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && Ku(this.selected, t))
      return this._value;
    this.selected = t;
    const n = this.creator(t);
    return this.value = n, n;
  }
  set value(t) {
    this._value = t;
  }
}
Wi.MemoLazy = q0;
function Ku(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((s) => Ku(e[s], t[s]));
  }
  return e === t;
}
var kr = {};
Object.defineProperty(kr, "__esModule", { value: !0 });
kr.githubUrl = z0;
kr.githubTagPrefix = V0;
kr.getS3LikeProviderBaseUrl = W0;
function z0(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function V0(e) {
  var t;
  return e.tagNamePrefix ? e.tagNamePrefix : !((t = e.vPrefixedTagName) !== null && t !== void 0) || t ? "v" : "";
}
function W0(e) {
  const t = e.provider;
  if (t === "s3")
    return Y0(e);
  if (t === "spaces")
    return X0(e);
  throw new Error(`Not supported provider: ${t}`);
}
function Y0(e) {
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
  return Qu(t, e.path);
}
function Qu(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function X0(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return Qu(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var zs = {};
Object.defineProperty(zs, "__esModule", { value: !0 });
zs.retry = ef;
const J0 = Zt;
async function ef(e, t) {
  var n;
  const { retries: r, interval: i, backoff: o = 0, attempt: s = 0, shouldRetry: a, cancellationToken: c = new J0.CancellationToken() } = t;
  try {
    return await e();
  } catch (p) {
    if (await Promise.resolve((n = a == null ? void 0 : a(p)) !== null && n !== void 0 ? n : !0) && r > 0 && !c.cancelled)
      return await new Promise((l) => setTimeout(l, i + o * s)), await ef(e, { ...t, retries: r - 1, attempt: s + 1 });
    throw p;
  }
}
var Vs = {};
Object.defineProperty(Vs, "__esModule", { value: !0 });
Vs.parseDn = Z0;
function Z0(e) {
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
var Xn = {};
Object.defineProperty(Xn, "__esModule", { value: !0 });
Xn.nil = Xn.UUID = void 0;
const tf = Zn, nf = Qn, K0 = "options.name must be either a string or a Buffer", hl = (0, tf.randomBytes)(16);
hl[0] = hl[0] | 1;
const Ti = {}, oe = [];
for (let e = 0; e < 256; e++) {
  const t = (e + 256).toString(16).substr(1);
  Ti[t] = e, oe[e] = t;
}
class vn {
  constructor(t) {
    this.ascii = null, this.binary = null;
    const n = vn.check(t);
    if (!n)
      throw new Error("not a UUID");
    this.version = n.version, n.format === "ascii" ? this.ascii = t : this.binary = t;
  }
  static v5(t, n) {
    return Q0(t, "sha1", 80, n);
  }
  toString() {
    return this.ascii == null && (this.ascii = eg(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, n = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (Ti[t[14] + t[15]] & 240) >> 4,
        variant: pl((Ti[t[19] + t[20]] & 224) >> 5),
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
        variant: pl((t[n + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, nf.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
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
Xn.UUID = vn;
vn.OID = vn.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function pl(e) {
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
var Er;
(function(e) {
  e[e.ASCII = 0] = "ASCII", e[e.BINARY = 1] = "BINARY", e[e.OBJECT = 2] = "OBJECT";
})(Er || (Er = {}));
function Q0(e, t, n, r, i = Er.ASCII) {
  const o = (0, tf.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, nf.newError)(K0, "ERR_INVALID_UUID_NAME");
  o.update(r), o.update(e);
  const a = o.digest();
  let c;
  switch (i) {
    case Er.BINARY:
      a[6] = a[6] & 15 | n, a[8] = a[8] & 63 | 128, c = a;
      break;
    case Er.OBJECT:
      a[6] = a[6] & 15 | n, a[8] = a[8] & 63 | 128, c = new vn(a);
      break;
    default:
      c = oe[a[0]] + oe[a[1]] + oe[a[2]] + oe[a[3]] + "-" + oe[a[4]] + oe[a[5]] + "-" + oe[a[6] & 15 | n] + oe[a[7]] + "-" + oe[a[8] & 63 | 128] + oe[a[9]] + "-" + oe[a[10]] + oe[a[11]] + oe[a[12]] + oe[a[13]] + oe[a[14]] + oe[a[15]];
      break;
  }
  return c;
}
function eg(e) {
  return oe[e[0]] + oe[e[1]] + oe[e[2]] + oe[e[3]] + "-" + oe[e[4]] + oe[e[5]] + "-" + oe[e[6]] + oe[e[7]] + "-" + oe[e[8]] + oe[e[9]] + "-" + oe[e[10]] + oe[e[11]] + oe[e[12]] + oe[e[13]] + oe[e[14]] + oe[e[15]];
}
Xn.nil = new vn("00000000-0000-0000-0000-000000000000");
var Mr = {}, rf = {};
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
      o(D), D.q = D.c = "", D.bufferCheckPosition = t.MAX_BUFFER_LENGTH, D.encoding = null, D.opt = d || {}, D.opt.lowercase = D.opt.lowercase || D.opt.lowercasetags, D.looseCase = D.opt.lowercase ? "toLowerCase" : "toUpperCase", D.opt.maxEntityCount = D.opt.maxEntityCount || 512, D.opt.maxEntityDepth = D.opt.maxEntityDepth || 4, D.entityCount = D.entityDepth = 0, D.tags = [], D.closed = D.closedRoot = D.sawRoot = !1, D.tag = D.error = null, D.strict = !!g, D.noscript = !!(g || D.opt.noscript), D.state = A.BEGIN, D.strictEntities = D.opt.strictEntities, D.ENTITIES = D.strictEntities ? Object.create(t.XML_ENTITIES) : Object.create(t.ENTITIES), D.attribList = [], D.opt.xmlns && (D.ns = Object.create(E)), D.opt.unquotedAttributeValues === void 0 && (D.opt.unquotedAttributeValues = !g), D.trackPosition = D.opt.position !== !1, D.trackPosition && (D.position = D.line = D.column = 0), K(D, "onready");
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
              q(g);
              break;
            case "cdata":
              $(g, "oncdata", g.cdata), g.cdata = "";
              break;
            case "script":
              $(g, "onscript", g.script), g.script = "";
              break;
            default:
              H(g, "Max buffer length exceeded: " + n[C]);
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
      q(g), g.cdata !== "" && ($(g, "oncdata", g.cdata), g.cdata = ""), g.script !== "" && ($(g, "onscript", g.script), g.script = "");
    }
    r.prototype = {
      end: function() {
        W(this);
      },
      write: rn,
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
    var h = /^\[CDATA\[$/i, w = /^DOCTYPE$/i, m = "http://www.w3.org/XML/1998/namespace", f = "http://www.w3.org/2000/xmlns/", E = { xml: m, xmlns: f }, _ = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, y = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, S = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
    function R(g) {
      return g === " " || g === `
` || g === "\r" || g === "	";
    }
    function b(g) {
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
    function O(g, d) {
      const D = F(g), C = F(d);
      return !D || !C ? !0 : C === "utf16" ? D === "utf16le" || D === "utf16be" : D === C;
    }
    function M(g, d) {
      if (!(!g.strict || !g.encoding || !d || d.name !== "xml")) {
        var D = te(d.body);
        D && !O(g.encoding, D) && U(
          g,
          "XML declaration encoding " + D + " does not match detected stream encoding " + g.encoding.toUpperCase()
        );
      }
    }
    function $(g, d, D) {
      g.textNode && q(g), K(g, d, D);
    }
    function q(g) {
      g.textNode = N(g.opt, g.textNode), g.textNode && K(g, "ontext", g.textNode), g.textNode = "";
    }
    function N(g, d) {
      return g.trim && (d = d.trim()), g.normalize && (d = d.replace(/\s+/g, " ")), d;
    }
    function H(g, d) {
      return q(g), g.trackPosition && (d += `
Line: ` + g.line + `
Column: ` + g.column + `
Char: ` + g.c), d = new Error(d), g.error = d, K(g, "onerror", d), g;
    }
    function W(g) {
      return g.sawRoot && !g.closedRoot && U(g, "Unclosed root tag"), g.state !== A.BEGIN && g.state !== A.BEGIN_WHITESPACE && g.state !== A.TEXT && H(g, "Unexpected end"), q(g), g.c = "", g.closed = !0, K(g, "onend"), r.call(g, g.strict, g.opt), g;
    }
    function U(g, d) {
      if (typeof g != "object" || !(g instanceof r))
        throw new Error("bad call to strictFail");
      g.strict && H(g, d);
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
        D.ns && se.ns !== D.ns && Object.keys(D.ns).forEach(function(Dn) {
          $(g, "onopennamespace", {
            prefix: Dn,
            uri: D.ns[Dn]
          });
        });
        for (var pe = 0, Ae = g.attribList.length; pe < Ae; pe++) {
          var Ue = g.attribList[pe], ke = Ue[0], ut = Ue[1], De = re(ke, !0), ft = De.prefix, wo = De.local, Xr = ft === "" ? "" : D.ns[ft] || "", Pt = {
            name: ke,
            value: ut,
            prefix: ft,
            local: wo,
            uri: Xr
          };
          ft && ft !== "xmlns" && !Xr && (U(
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
    function rn(g) {
      var d = this;
      if (this.error)
        throw this.error;
      if (d.closed)
        return H(
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
            ), d.doctype = "", d.sgmlDecl = "") : C === ">" ? ($(d, "onsgmldeclaration", d.sgmlDecl), d.sgmlDecl = "", d.state = A.TEXT) : (b(C) && (d.state = A.SGML_DECL_QUOTED), d.sgmlDecl += C);
            continue;
          case A.SGML_DECL_QUOTED:
            C === d.q && (d.state = A.SGML_DECL, d.q = ""), d.sgmlDecl += C;
            continue;
          case A.DOCTYPE:
            C === ">" ? (d.state = A.TEXT, $(d, "ondoctype", d.doctype), d.doctype = !0) : (d.doctype += C, C === "[" ? d.state = A.DOCTYPE_DTD : b(C) && (d.state = A.DOCTYPE_QUOTED, d.q = C));
            continue;
          case A.DOCTYPE_QUOTED:
            d.doctype += C, C === d.q && (d.q = "", d.state = A.DOCTYPE);
            continue;
          case A.DOCTYPE_DTD:
            C === "]" ? (d.doctype += C, d.state = A.DOCTYPE) : C === "<" ? (d.state = A.OPEN_WAKA, d.startTagPosition = d.position) : b(C) ? (d.doctype += C, d.state = A.DOCTYPE_DTD_QUOTED, d.q = C) : d.doctype += C;
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
            B(y, C) ? d.tagName += C : (Q(d), C === ">" ? ie(d) : C === "/" ? d.state = A.OPEN_TAG_SLASH : (R(C) || U(d, "Invalid character in tag name"), d.state = A.ATTRIB));
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
            C === "=" ? d.state = A.ATTRIB_VALUE : C === ">" ? (U(d, "Attribute without value"), d.attribValue = d.attribName, V(d), ie(d)) : R(C) ? d.state = A.ATTRIB_NAME_SAW_WHITE : B(y, C) ? d.attribName += C : U(d, "Invalid attribute name");
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
            b(C) ? (d.q = C, d.state = A.ATTRIB_VALUE_QUOTED) : (d.opt.unquotedAttributeValues || H(d, "Unquoted attribute value"), d.state = A.ATTRIB_VALUE_UNQUOTED, d.attribValue = C);
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
              C === ">" ? Se(d) : B(y, C) ? d.tagName += C : d.script ? (d.script += "</" + d.tagName + C, d.tagName = "", d.state = A.SCRIPT) : (R(C) || U(d, "Invalid tagname in closing tag"), d.state = A.CLOSE_TAG_SAW_WHITE);
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
              d.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(ke) ? ((d.entityCount += 1) > d.opt.maxEntityCount && H(
                d,
                "Parsed entity count exceeds max entity count"
              ), (d.entityDepth += 1) > d.opt.maxEntityDepth && H(
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
})(rf);
Object.defineProperty(Mr, "__esModule", { value: !0 });
Mr.XElement = void 0;
Mr.parseXml = ig;
const tg = rf, li = Qn;
class of {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, li.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!rg(t))
      throw (0, li.newError)(`Invalid element name: ${t}`, "ERR_XML_ELEMENT_INVALID_NAME");
  }
  attribute(t) {
    const n = this.attributes === null ? null : this.attributes[t];
    if (n == null)
      throw (0, li.newError)(`No attribute "${t}"`, "ERR_XML_MISSED_ATTRIBUTE");
    return n;
  }
  removeAttribute(t) {
    this.attributes !== null && delete this.attributes[t];
  }
  element(t, n = !1, r = null) {
    const i = this.elementOrNull(t, n);
    if (i === null)
      throw (0, li.newError)(r || `No element "${t}"`, "ERR_XML_MISSED_ELEMENT");
    return i;
  }
  elementOrNull(t, n = !1) {
    if (this.elements === null)
      return null;
    for (const r of this.elements)
      if (ml(r, t, n))
        return r;
    return null;
  }
  getElements(t, n = !1) {
    return this.elements === null ? [] : this.elements.filter((r) => ml(r, t, n));
  }
  elementValueOrEmpty(t, n = !1) {
    const r = this.elementOrNull(t, n);
    return r === null ? "" : r.value;
  }
}
Mr.XElement = of;
const ng = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function rg(e) {
  return ng.test(e);
}
function ml(e, t, n) {
  const r = e.name;
  return r === t || n === !0 && r.length === t.length && r.toLowerCase() === t.toLowerCase();
}
function ig(e) {
  let t = null;
  const n = tg.parser(!0, {}), r = [];
  return n.onopentag = (i) => {
    const o = new of(i.name);
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
var Cn = {};
Object.defineProperty(Cn, "__esModule", { value: !0 });
Cn.mapToObject = sf;
Cn.isValidKey = Yi;
Cn.asArray = og;
Cn.deepAssign = ag;
Cn.objectToArgs = ug;
function sf(e) {
  const t = {};
  for (const [n, r] of e)
    Yi(n) && (r instanceof Map ? t[n] = sf(r) : t[n] = r);
  return t;
}
function Yi(e) {
  return ["__proto__", "prototype", "constructor"].includes(e) ? !1 : ["string", "number", "symbol", "boolean"].includes(typeof e) || e === null;
}
function og(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function gl(e) {
  if (Array.isArray(e))
    return !1;
  const t = typeof e;
  return t === "object" || t === "function";
}
function sg(e, t, n) {
  const r = t[n];
  if (r === void 0)
    return;
  const i = e[n];
  i == null || r == null || !gl(i) || !gl(r) ? Array.isArray(i) && Array.isArray(r) ? e[n] = Array.from(new Set(i.concat(r))) : e[n] = r : e[n] = af(i, r);
}
function af(e, t) {
  if (e !== t)
    for (const n of Object.getOwnPropertyNames(t))
      Yi(n) && sg(e, t, n);
  return e;
}
function ag(e, ...t) {
  for (const n of t)
    n != null && af(e, n);
  return e;
}
const lg = /^[a-zA-Z][a-zA-Z0-9-]*$/, cg = /[\0\r\n]/;
function ug(e) {
  const t = Object.entries(e).reduce((n, [r, i]) => {
    if (!Yi(r) || i == null)
      return n;
    if (!lg.test(r))
      throw new Error(`objectToArgs: unsafe flag name rejected: ${JSON.stringify(r)}`);
    if (cg.test(i))
      throw new Error(`objectToArgs: value for --${r} contains a null byte or newline`);
    return n.concat([`--${r}`, i]);
  }, []);
  return Object.freeze(t);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.objectToArgs = e.deepAssign = e.asArray = e.mapToObject = e.isValidKey = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubTagPrefix = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.isSensitiveFieldName = e.HttpExecutor = e.hashSensitiveValue = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0;
  var t = Zt;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var n = Qn;
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
  var i = Wi;
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
  var a = zs;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return a.retry;
  } });
  var c = Vs;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return c.parseDn;
  } });
  var p = Xn;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return p.UUID;
  } });
  var l = Mr;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return l.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return l.XElement;
  } });
  var u = Cn;
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
})(be);
var Fe = {}, Ws = {}, mt = {};
function lf(e) {
  return typeof e > "u" || e === null;
}
function fg(e) {
  return typeof e == "object" && e !== null;
}
function dg(e) {
  return Array.isArray(e) ? e : lf(e) ? [] : [e];
}
function hg(e, t) {
  if (t) {
    const n = Object.keys(t);
    for (let r = 0, i = n.length; r < i; r += 1) {
      const o = n[r];
      e[o] = t[o];
    }
  }
  return e;
}
function pg(e, t) {
  let n = "";
  for (let r = 0; r < t; r += 1)
    n += e;
  return n;
}
function mg(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
mt.isNothing = lf;
mt.isObject = fg;
mt.toArray = dg;
mt.repeat = pg;
mt.isNegativeZero = mg;
mt.extend = hg;
function cf(e, t) {
  let n = "";
  const r = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (n += 'in "' + e.mark.name + '" '), n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (n += `

` + e.mark.snippet), r + " " + n) : r;
}
function Tr(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = cf(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Tr.prototype = Object.create(Error.prototype);
Tr.prototype.constructor = Tr;
Tr.prototype.toString = function(t) {
  return this.name + ": " + cf(this, t);
};
var Br = Tr;
const dr = mt;
function xo(e, t, n, r, i) {
  let o = "", s = "";
  const a = Math.floor(i / 2) - 1;
  return r - t > a && (o = " ... ", t = r - a + o.length), n - r > a && (s = " ...", n = r + a - s.length), {
    str: o + e.slice(t, n).replace(/\t/g, "→") + s,
    pos: r - t + o.length
    // relative position
  };
}
function Po(e, t) {
  return dr.repeat(" ", t - e.length) + e;
}
function gg(e, t) {
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
    const h = xo(
      e.buffer,
      r[s - u],
      i[s - u],
      e.position - (r[s] - r[s - u]),
      p
    );
    a = dr.repeat(" ", t.indent) + Po((e.line - u + 1).toString(), c) + " | " + h.str + `
` + a;
  }
  const l = xo(e.buffer, r[s], i[s], e.position, p);
  a += dr.repeat(" ", t.indent) + Po((e.line + 1).toString(), c) + " | " + l.str + `
`, a += dr.repeat("-", t.indent + c + 3 + l.pos) + `^
`;
  for (let u = 1; u <= t.linesAfter && !(s + u >= i.length); u++) {
    const h = xo(
      e.buffer,
      r[s + u],
      i[s + u],
      e.position - (r[s] - r[s + u]),
      p
    );
    a += dr.repeat(" ", t.indent) + Po((e.line + u + 1).toString(), c) + " | " + h.str + `
`;
  }
  return a.replace(/\n$/, "");
}
var Eg = gg;
const El = Br, yg = [
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
], wg = [
  "scalar",
  "sequence",
  "mapping"
];
function _g(e) {
  const t = {};
  return e !== null && Object.keys(e).forEach(function(n) {
    e[n].forEach(function(r) {
      t[String(r)] = n;
    });
  }), t;
}
function vg(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(n) {
    if (yg.indexOf(n) === -1)
      throw new El('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(n) {
    return n;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = _g(t.styleAliases || null), wg.indexOf(this.kind) === -1)
    throw new El('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var Je = vg;
const lr = Br, Fo = Je;
function yl(e, t) {
  const n = [];
  return e[t].forEach(function(r) {
    let i = n.length;
    n.forEach(function(o, s) {
      o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (i = s);
    }), n[i] = r;
  }), n;
}
function Sg() {
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
function ws(e) {
  return this.extend(e);
}
ws.prototype.extend = function(t) {
  let n = [], r = [];
  if (t instanceof Fo)
    r.push(t);
  else if (Array.isArray(t))
    r = r.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (n = n.concat(t.implicit)), t.explicit && (r = r.concat(t.explicit));
  else
    throw new lr("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  n.forEach(function(o) {
    if (!(o instanceof Fo))
      throw new lr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new lr("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new lr("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(o) {
    if (!(o instanceof Fo))
      throw new lr("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  const i = Object.create(ws.prototype);
  return i.implicit = (this.implicit || []).concat(n), i.explicit = (this.explicit || []).concat(r), i.compiledImplicit = yl(i, "implicit"), i.compiledExplicit = yl(i, "explicit"), i.compiledTypeMap = Sg(i.compiledImplicit, i.compiledExplicit), i;
};
var uf = ws;
const Ag = Je;
var ff = new Ag("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
});
const Tg = Je;
var df = new Tg("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
});
const Cg = Je;
var hf = new Cg("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
});
const Ig = uf;
var pf = new Ig({
  explicit: [
    ff,
    df,
    hf
  ]
});
const Dg = Je;
function Ng(e) {
  if (e === null) return !0;
  const t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function bg() {
  return null;
}
function Og(e) {
  return e === null;
}
var mf = new Dg("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: Ng,
  construct: bg,
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
const Rg = Je;
function $g(e) {
  if (e === null) return !1;
  const t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Lg(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function xg(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var gf = new Rg("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: $g,
  construct: Lg,
  predicate: xg,
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
const Pg = mt, Fg = Je;
function Ug(e) {
  return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function kg(e) {
  return e >= 48 && e <= 55;
}
function Mg(e) {
  return e >= 48 && e <= 57;
}
function Bg(e) {
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
      return r && isFinite(hr(e));
    }
    if (i === "x") {
      for (n++; n < t; n++) {
        if (!Ug(e.charCodeAt(n))) return !1;
        r = !0;
      }
      return r && isFinite(hr(e));
    }
    if (i === "o") {
      for (n++; n < t; n++) {
        if (!kg(e.charCodeAt(n))) return !1;
        r = !0;
      }
      return r && isFinite(hr(e));
    }
  }
  for (; n < t; n++) {
    if (!Mg(e.charCodeAt(n)))
      return !1;
    r = !0;
  }
  return r ? isFinite(hr(e)) : !1;
}
function hr(e) {
  let t = e, n = 1, r = t[0];
  if ((r === "-" || r === "+") && (r === "-" && (n = -1), t = t.slice(1), r = t[0]), t === "0") return 0;
  if (r === "0") {
    if (t[1] === "b") return n * parseInt(t.slice(2), 2);
    if (t[1] === "x") return n * parseInt(t.slice(2), 16);
    if (t[1] === "o") return n * parseInt(t.slice(2), 8);
  }
  return n * parseInt(t, 10);
}
function jg(e) {
  return hr(e);
}
function Hg(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !Pg.isNegativeZero(e);
}
var Ef = new Fg("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: Bg,
  construct: jg,
  predicate: Hg,
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
const yf = mt, Gg = Je, qg = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
), zg = new RegExp(
  "^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Vg(e) {
  return e === null || !qg.test(e) ? !1 : isFinite(parseFloat(e, 10)) ? !0 : zg.test(e);
}
function Wg(e) {
  let t = e.toLowerCase();
  const n = t[0] === "-" ? -1 : 1;
  return "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : n * parseFloat(t, 10);
}
const Yg = /^[-+]?[0-9]+e/;
function Xg(e, t) {
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
  else if (yf.isNegativeZero(e))
    return "-0.0";
  const n = e.toString(10);
  return Yg.test(n) ? n.replace("e", ".e") : n;
}
function Jg(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || yf.isNegativeZero(e));
}
var wf = new Gg("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Vg,
  construct: Wg,
  predicate: Jg,
  represent: Xg,
  defaultStyle: "lowercase"
}), _f = pf.extend({
  implicit: [
    mf,
    gf,
    Ef,
    wf
  ]
}), vf = _f;
const Zg = Je, Sf = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), Af = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Kg(e) {
  return e === null ? !1 : Sf.exec(e) !== null || Af.exec(e) !== null;
}
function Qg(e) {
  let t = 0, n = null, r = Sf.exec(e);
  if (r === null && (r = Af.exec(e)), r === null) throw new Error("Date resolve error");
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
function eE(e) {
  return e.toISOString();
}
var Tf = new Zg("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Kg,
  construct: Qg,
  instanceOf: Date,
  represent: eE
});
const tE = Je;
function nE(e) {
  return e === "<<" || e === null;
}
var Cf = new tE("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: nE
});
const rE = Je, Ys = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function iE(e) {
  if (e === null) return !1;
  let t = 0;
  const n = e.length, r = Ys;
  for (let i = 0; i < n; i++) {
    const o = r.indexOf(e.charAt(i));
    if (!(o > 64)) {
      if (o < 0) return !1;
      t += 6;
    }
  }
  return t % 8 === 0;
}
function oE(e) {
  const t = e.replace(/[\r\n=]/g, ""), n = t.length, r = Ys;
  let i = 0;
  const o = [];
  for (let a = 0; a < n; a++)
    a % 4 === 0 && a && (o.push(i >> 16 & 255), o.push(i >> 8 & 255), o.push(i & 255)), i = i << 6 | r.indexOf(t.charAt(a));
  const s = n % 4 * 6;
  return s === 0 ? (o.push(i >> 16 & 255), o.push(i >> 8 & 255), o.push(i & 255)) : s === 18 ? (o.push(i >> 10 & 255), o.push(i >> 2 & 255)) : s === 12 && o.push(i >> 4 & 255), new Uint8Array(o);
}
function sE(e) {
  let t = "", n = 0;
  const r = e.length, i = Ys;
  for (let s = 0; s < r; s++)
    s % 3 === 0 && s && (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]), n = (n << 8) + e[s];
  const o = r % 3;
  return o === 0 ? (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]) : o === 2 ? (t += i[n >> 10 & 63], t += i[n >> 4 & 63], t += i[n << 2 & 63], t += i[64]) : o === 1 && (t += i[n >> 2 & 63], t += i[n << 4 & 63], t += i[64], t += i[64]), t;
}
function aE(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var If = new rE("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: iE,
  construct: oE,
  predicate: aE,
  represent: sE
});
const lE = Je, wl = Object.prototype.hasOwnProperty, cE = Object.prototype.toString;
function uE(e) {
  if (e === null) return !0;
  const t = {}, n = e;
  for (let r = 0, i = n.length; r < i; r += 1) {
    const o = n[r];
    let s = !1;
    if (cE.call(o) !== "[object Object]") return !1;
    let a;
    for (a in o)
      if (wl.call(o, a))
        if (!s) s = !0;
        else return !1;
    if (!s || wl.call(t, a)) return !1;
    Object.defineProperty(t, a, { value: !0 });
  }
  return !0;
}
function fE(e) {
  return e !== null ? e : [];
}
var Df = new lE("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: uE,
  construct: fE
});
const dE = Je, hE = Object.prototype.toString;
function pE(e) {
  if (e === null) return !0;
  const t = e, n = new Array(t.length);
  for (let r = 0, i = t.length; r < i; r += 1) {
    const o = t[r];
    if (hE.call(o) !== "[object Object]") return !1;
    const s = Object.keys(o);
    if (s.length !== 1) return !1;
    n[r] = [s[0], o[s[0]]];
  }
  return !0;
}
function mE(e) {
  if (e === null) return [];
  const t = e, n = new Array(t.length);
  for (let r = 0, i = t.length; r < i; r += 1) {
    const o = t[r], s = Object.keys(o);
    n[r] = [s[0], o[s[0]]];
  }
  return n;
}
var Nf = new dE("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: pE,
  construct: mE
});
const gE = Je, EE = Object.prototype.hasOwnProperty;
function yE(e) {
  if (e === null) return !0;
  const t = e;
  for (const n in t)
    if (EE.call(t, n) && t[n] !== null)
      return !1;
  return !0;
}
function wE(e) {
  return e !== null ? e : {};
}
var bf = new gE("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: yE,
  construct: wE
}), Xs = vf.extend({
  implicit: [
    Tf,
    Cf
  ],
  explicit: [
    If,
    Df,
    Nf,
    bf
  ]
});
const hn = mt, Of = Br, _E = Eg, vE = Xs, pt = Object.prototype.hasOwnProperty, Ri = 1, Rf = 2, $f = 3, $i = 4, Uo = 1, SE = 2, _l = 3, AE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, TE = /[\x85\u2028\u2029]/, CE = /[,\[\]{}]/, Lf = /^(?:!|!!|![0-9A-Za-z-]+!)$/, xf = /^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;
function vl(e) {
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
function Mn(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function IE(e) {
  if (e >= 48 && e <= 57)
    return e - 48;
  const t = e | 32;
  return t >= 97 && t <= 102 ? t - 97 + 10 : -1;
}
function DE(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function NE(e) {
  return e >= 48 && e <= 57 ? e - 48 : -1;
}
function Sl(e) {
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
function bE(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
function Pf(e, t, n) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: n
  }) : e[t] = n;
}
const Ff = new Array(256), Uf = new Array(256);
for (let e = 0; e < 256; e++)
  Ff[e] = Sl(e) ? 1 : 0, Uf[e] = Sl(e);
function OE(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || vE, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.maxDepth = typeof t.maxDepth == "number" ? t.maxDepth : 100, this.maxTotalMergeKeys = typeof t.maxTotalMergeKeys == "number" ? t.maxTotalMergeKeys : 1e4, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.depth = 0, this.totalMergeKeys = 0, this.firstTabInLine = -1, this.documents = [], this.anchorMapTransactions = [];
}
function kf(e, t) {
  const n = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return n.snippet = _E(n), new Of(t, n);
}
function J(e, t) {
  throw kf(e, t);
}
function Li(e, t) {
  e.onWarning && e.onWarning.call(null, kf(e, t));
}
function mn(e, t, n) {
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
function RE(e) {
  e.anchorMapTransactions.push(/* @__PURE__ */ Object.create(null));
}
function $E(e) {
  const t = e.anchorMapTransactions.pop(), n = e.anchorMapTransactions;
  if (n.length === 0) return;
  const r = n[n.length - 1], i = Object.keys(t);
  for (let o = 0, s = i.length; o < s; o += 1) {
    const a = i[o];
    pt.call(r, a) || (r[a] = t[a]);
  }
}
function LE(e) {
  const t = e.anchorMapTransactions.pop(), n = Object.keys(t);
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const i = t[n[r]];
    i.existed ? e.anchorMap[n[r]] = i.value : delete e.anchorMap[n[r]];
  }
}
function Mf(e) {
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
function Al(e, t) {
  e.position = t.position, e.line = t.line, e.lineStart = t.lineStart, e.lineIndent = t.lineIndent, e.firstTabInLine = t.firstTabInLine, e.tag = t.tag, e.anchor = t.anchor, e.kind = t.kind, e.result = t.result;
}
const Tl = {
  YAML: function(t, n, r) {
    t.version !== null && J(t, "duplication of %YAML directive"), r.length !== 1 && J(t, "YAML directive accepts exactly one argument");
    const i = /^([0-9]+)\.([0-9]+)$/.exec(r[0]);
    i === null && J(t, "ill-formed argument of the YAML directive");
    const o = parseInt(i[1], 10), s = parseInt(i[2], 10);
    o !== 1 && J(t, "unacceptable YAML version of the document"), t.version = r[0], t.checkLineBreaks = s < 2, s !== 1 && s !== 2 && Li(t, "unsupported YAML version of the document");
  },
  TAG: function(t, n, r) {
    let i;
    r.length !== 2 && J(t, "TAG directive accepts exactly two arguments");
    const o = r[0];
    i = r[1], Lf.test(o) || J(t, "ill-formed tag handle (first argument) of the TAG directive"), pt.call(t.tagMap, o) && J(t, 'there is a previously declared suffix for "' + o + '" tag handle'), xf.test(i) || J(t, "ill-formed tag prefix (second argument) of the TAG directive");
    try {
      i = decodeURIComponent(i);
    } catch {
      J(t, "tag prefix is malformed: " + i);
    }
    t.tagMap[o] = i;
  }
};
function Yt(e, t, n, r) {
  if (t < n) {
    const i = e.input.slice(t, n);
    if (r)
      for (let o = 0, s = i.length; o < s; o += 1) {
        const a = i.charCodeAt(o);
        a === 9 || a >= 32 && a <= 1114111 || J(e, "expected valid JSON character");
      }
    else AE.test(i) && J(e, "the stream contains non-printable characters");
    e.result += i;
  }
}
function Cl(e) {
  e.totalMergeKeys++, e.maxTotalMergeKeys !== -1 && e.totalMergeKeys > e.maxTotalMergeKeys && J(e, "merge keys exceeded maxTotalMergeKeys (" + e.maxTotalMergeKeys + ")");
}
function Il(e, t, n, r) {
  hn.isObject(n) || J(e, "cannot merge mappings; the provided source object is unacceptable"), Cl(e);
  const i = Object.keys(n);
  for (let o = 0, s = i.length; o < s; o += 1) {
    const a = i[o];
    Cl(e), pt.call(t, a) || (Pf(t, a, n[a]), r[a] = !0);
  }
}
function Bn(e, t, n, r, i, o, s, a, c) {
  if (Array.isArray(i)) {
    i = Array.prototype.slice.call(i);
    for (let p = 0, l = i.length; p < l; p += 1)
      Array.isArray(i[p]) && J(e, "nested arrays are not supported inside keys"), typeof i == "object" && vl(i[p]) === "[object Object]" && (i[p] = "[object Object]");
  }
  if (typeof i == "object" && vl(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(o)) {
      o.length > 100 && J(e, "abnormal merge sequence size");
      for (let p = 0, l = o.length; p < l; p += 1)
        Il(e, t, o[p], n);
    } else
      Il(e, t, o, n);
  else
    !e.json && !pt.call(n, i) && pt.call(t, i) && (e.line = s || e.line, e.lineStart = a || e.lineStart, e.position = c || e.position, J(e, "duplicated mapping key")), Pf(t, i, o), delete n[i];
  return t;
}
function Js(e) {
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
      for (Js(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return n !== -1 && r !== 0 && e.lineIndent < n && Li(e, "deficient indentation"), r;
}
function Xi(e) {
  let t = e.position, n = e.input.charCodeAt(t);
  return !!((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2) && (t += 3, n = e.input.charCodeAt(t), n === 0 || Qe(n)));
}
function Zs(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += hn.repeat(`
`, t - 1));
}
function xE(e, t, n) {
  let r, i, o, s, a, c;
  const p = e.kind, l = e.result;
  let u = e.input.charCodeAt(e.position);
  if (Qe(u) || Mn(u) || u === 35 || u === 38 || u === 42 || u === 33 || u === 124 || u === 62 || u === 39 || u === 34 || u === 37 || u === 64 || u === 96)
    return !1;
  if (u === 63 || u === 45) {
    const h = e.input.charCodeAt(e.position + 1);
    if (Qe(h) || n && Mn(h))
      return !1;
  }
  for (e.kind = "scalar", e.result = "", r = i = e.position, o = !1; u !== 0; ) {
    if (u === 58) {
      const h = e.input.charCodeAt(e.position + 1);
      if (Qe(h) || n && Mn(h))
        break;
    } else if (u === 35) {
      const h = e.input.charCodeAt(e.position - 1);
      if (Qe(h))
        break;
    } else {
      if (e.position === e.lineStart && Xi(e) || n && Mn(u))
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
    o && (Yt(e, r, i, !1), Zs(e, e.line - s), r = i = e.position, o = !1), $t(u) || (i = e.position + 1), u = e.input.charCodeAt(++e.position);
  }
  return Yt(e, r, i, !1), e.result ? !0 : (e.kind = p, e.result = l, !1);
}
function PE(e, t) {
  let n, r, i = e.input.charCodeAt(e.position);
  if (i !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (i = e.input.charCodeAt(e.position)) !== 0; )
    if (i === 39)
      if (Yt(e, n, e.position, !0), i = e.input.charCodeAt(++e.position), i === 39)
        n = e.position, e.position++, r = e.position;
      else
        return !0;
    else Tt(i) ? (Yt(e, n, r, !0), Zs(e, Ce(e, !1, t)), n = r = e.position) : e.position === e.lineStart && Xi(e) ? J(e, "unexpected end of the document within a single quoted scalar") : (e.position++, $t(i) || (r = e.position));
  J(e, "unexpected end of the stream within a single quoted scalar");
}
function FE(e, t) {
  let n, r, i, o = e.input.charCodeAt(e.position);
  if (o !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (o = e.input.charCodeAt(e.position)) !== 0; ) {
    if (o === 34)
      return Yt(e, n, e.position, !0), e.position++, !0;
    if (o === 92) {
      if (Yt(e, n, e.position, !0), o = e.input.charCodeAt(++e.position), Tt(o))
        Ce(e, !1, t);
      else if (o < 256 && Ff[o])
        e.result += Uf[o], e.position++;
      else if ((i = DE(o)) > 0) {
        let s = i, a = 0;
        for (; s > 0; s--)
          o = e.input.charCodeAt(++e.position), (i = IE(o)) >= 0 ? a = (a << 4) + i : J(e, "expected hexadecimal character");
        e.result += bE(a), e.position++;
      } else
        J(e, "unknown escape sequence");
      n = r = e.position;
    } else Tt(o) ? (Yt(e, n, r, !0), Zs(e, Ce(e, !1, t)), n = r = e.position) : e.position === e.lineStart && Xi(e) ? J(e, "unexpected end of the document within a double quoted scalar") : (e.position++, $t(o) || (r = e.position));
  }
  J(e, "unexpected end of the stream within a double quoted scalar");
}
function UE(e, t) {
  let n = !0, r, i, o;
  const s = e.tag;
  let a;
  const c = e.anchor;
  let p, l, u, h;
  const w = /* @__PURE__ */ Object.create(null);
  let m, f, E, _ = e.input.charCodeAt(e.position);
  if (_ === 91)
    p = 93, h = !1, a = [];
  else if (_ === 123)
    p = 125, h = !0, a = {};
  else
    return !1;
  for (e.anchor !== null && mn(e, e.anchor, a), _ = e.input.charCodeAt(++e.position); _ !== 0; ) {
    if (Ce(e, !0, t), _ = e.input.charCodeAt(e.position), _ === p)
      return e.position++, e.tag = s, e.anchor = c, e.kind = h ? "mapping" : "sequence", e.result = a, !0;
    if (n ? _ === 44 && J(e, "expected the node content, but found ','") : J(e, "missed comma between flow collection entries"), f = m = E = null, l = u = !1, _ === 63) {
      const y = e.input.charCodeAt(e.position + 1);
      Qe(y) && (l = u = !0, e.position++, Ce(e, !0, t));
    }
    r = e.line, i = e.lineStart, o = e.position, Jn(e, t, Ri, !1, !0), f = e.tag, m = e.result, Ce(e, !0, t), _ = e.input.charCodeAt(e.position), (u || e.line === r) && _ === 58 && (l = !0, _ = e.input.charCodeAt(++e.position), Ce(e, !0, t), Jn(e, t, Ri, !1, !0), E = e.result), h ? Bn(e, a, w, f, m, E, r, i, o) : l ? a.push(Bn(e, null, w, f, m, E, r, i, o)) : a.push(m), Ce(e, !0, t), _ = e.input.charCodeAt(e.position), _ === 44 ? (n = !0, _ = e.input.charCodeAt(++e.position)) : n = !1;
  }
  J(e, "unexpected end of the stream within a flow collection");
}
function kE(e, t) {
  let n, r = Uo, i = !1, o = !1, s = t, a = 0, c = !1, p, l = e.input.charCodeAt(e.position);
  if (l === 124)
    n = !1;
  else if (l === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; l !== 0; )
    if (l = e.input.charCodeAt(++e.position), l === 43 || l === 45)
      Uo === r ? r = l === 43 ? _l : SE : J(e, "repeat of a chomping mode identifier");
    else if ((p = NE(l)) >= 0)
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
    for (Js(e), e.lineIndent = 0, l = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && l === 32; )
      e.lineIndent++, l = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > s && (s = e.lineIndent), Tt(l)) {
      a++;
      continue;
    }
    if (!o && s === 0 && J(e, "missing indentation for block scalar"), e.lineIndent < s) {
      r === _l ? e.result += hn.repeat(`
`, i ? 1 + a : a) : r === Uo && i && (e.result += `
`);
      break;
    }
    n ? $t(l) ? (c = !0, e.result += hn.repeat(`
`, i ? 1 + a : a)) : c ? (c = !1, e.result += hn.repeat(`
`, a + 1)) : a === 0 ? i && (e.result += " ") : e.result += hn.repeat(`
`, a) : e.result += hn.repeat(`
`, i ? 1 + a : a), i = !0, o = !0, a = 0;
    const u = e.position;
    for (; !Tt(l) && l !== 0; )
      l = e.input.charCodeAt(++e.position);
    Yt(e, u, e.position, !1);
  }
  return !0;
}
function Dl(e, t) {
  const n = e.tag, r = e.anchor, i = [];
  let o = !1;
  if (e.firstTabInLine !== -1) return !1;
  e.anchor !== null && mn(e, e.anchor, i);
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
    if (Jn(e, t, $f, !1, !0), i.push(e.result), Ce(e, !0, -1), s = e.input.charCodeAt(e.position), (e.line === c || e.lineIndent > t) && s !== 0)
      J(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return o ? (e.tag = n, e.anchor = r, e.kind = "sequence", e.result = i, !0) : !1;
}
function Bf(e, t, n) {
  let r, i, o, s;
  const a = e.tag, c = e.anchor, p = {}, l = /* @__PURE__ */ Object.create(null);
  let u = null, h = null, w = null, m = !1, f = !1;
  if (e.firstTabInLine !== -1) return !1;
  e.anchor !== null && mn(e, e.anchor, p);
  let E = e.input.charCodeAt(e.position);
  for (; E !== 0; ) {
    !m && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, J(e, "tab characters must not be used in indentation"));
    const _ = e.input.charCodeAt(e.position + 1), y = e.line;
    if ((E === 63 || E === 58) && Qe(_))
      E === 63 ? (m && (Bn(e, p, l, u, h, null, i, o, s), u = h = w = null), f = !0, m = !0, r = !0) : m ? (m = !1, r = !0) : J(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, E = _;
    else {
      if (i = e.line, o = e.lineStart, s = e.position, !Jn(e, n, Rf, !1, !0))
        break;
      if (e.line === y) {
        for (E = e.input.charCodeAt(e.position); $t(E); )
          E = e.input.charCodeAt(++e.position);
        if (E === 58)
          E = e.input.charCodeAt(++e.position), Qe(E) || J(e, "a whitespace character is expected after the key-value separator within a block mapping"), m && (Bn(e, p, l, u, h, null, i, o, s), u = h = w = null), f = !0, m = !1, r = !1, u = e.tag, h = e.result;
        else if (f)
          J(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = a, e.anchor = c, !0;
      } else if (f)
        J(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = a, e.anchor = c, !0;
    }
    if ((e.line === y || e.lineIndent > t) && (m && (i = e.line, o = e.lineStart, s = e.position), Jn(e, t, $i, !0, r) && (m ? h = e.result : w = e.result), m || (Bn(e, p, l, u, h, w, i, o, s), u = h = w = null), Ce(e, !0, -1), E = e.input.charCodeAt(e.position)), (e.line === y || e.lineIndent > t) && E !== 0)
      J(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return m && Bn(e, p, l, u, h, null, i, o, s), f && (e.tag = a, e.anchor = c, e.kind = "mapping", e.result = p), f;
}
function ME(e) {
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
      o === 33 && (n ? J(e, "tag suffix cannot contain exclamation marks") : (r = e.input.slice(s - 1, e.position + 1), Lf.test(r) || J(e, "named tag handle cannot contain such characters"), n = !0, s = e.position + 1)), o = e.input.charCodeAt(++e.position);
    i = e.input.slice(s, e.position), CE.test(i) && J(e, "tag suffix cannot contain flow indicator characters");
  }
  i && !xf.test(i) && J(e, "tag name cannot contain such characters: " + i);
  try {
    i = decodeURIComponent(i);
  } catch {
    J(e, "tag name is malformed: " + i);
  }
  return t ? e.tag = i : pt.call(e.tagMap, r) ? e.tag = e.tagMap[r] + i : r === "!" ? e.tag = "!" + i : r === "!!" ? e.tag = "tag:yaml.org,2002:" + i : J(e, 'undeclared tag handle "' + r + '"'), !0;
}
function BE(e) {
  let t = e.input.charCodeAt(e.position);
  if (t !== 38) return !1;
  e.anchor !== null && J(e, "duplication of an anchor property"), t = e.input.charCodeAt(++e.position);
  const n = e.position;
  for (; t !== 0 && !Qe(t) && !Mn(t); )
    t = e.input.charCodeAt(++e.position);
  return e.position === n && J(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function jE(e) {
  let t = e.input.charCodeAt(e.position);
  if (t !== 42) return !1;
  t = e.input.charCodeAt(++e.position);
  const n = e.position;
  for (; t !== 0 && !Qe(t) && !Mn(t); )
    t = e.input.charCodeAt(++e.position);
  e.position === n && J(e, "name of an alias node must contain at least one character");
  const r = e.input.slice(n, e.position);
  return pt.call(e.anchorMap, r) || J(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], Ce(e, !0, -1), !0;
}
function HE(e, t, n, r) {
  const i = Mf(e);
  return RE(e), Al(e, t), e.tag = null, e.anchor = null, e.kind = null, e.result = null, Bf(e, n, r) && e.kind === "mapping" ? ($E(e), !0) : (LE(e), Al(e, i), !1);
}
function Jn(e, t, n, r, i) {
  let o, s, a = 1, c = !1, p = !1, l = null, u, h, w;
  e.depth >= e.maxDepth && J(e, "nesting exceeded maxDepth (" + e.maxDepth + ")"), e.depth += 1, e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null;
  const m = o = s = $i === n || $f === n;
  if (r && Ce(e, !0, -1) && (c = !0, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : e.lineIndent < t && (a = -1)), a === 1)
    for (; ; ) {
      const f = e.input.charCodeAt(e.position), E = Mf(e);
      if (c && (f === 33 && e.tag !== null || f === 38 && e.anchor !== null) || !ME(e) && !BE(e))
        break;
      l === null && (l = E), Ce(e, !0, -1) ? (c = !0, s = m, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : e.lineIndent < t && (a = -1)) : s = !1;
    }
  if (s && (s = c || i), a === 1 || $i === n)
    if (Ri === n || Rf === n ? h = t : h = t + 1, w = e.position - e.lineStart, a === 1)
      if (s && (Dl(e, w) || Bf(e, w, h)) || UE(e, h))
        p = !0;
      else {
        const f = e.input.charCodeAt(e.position);
        l !== null && m && !s && f !== 124 && f !== 62 && HE(
          e,
          l,
          l.position - l.lineStart,
          h
        ) || o && kE(e, h) || PE(e, h) || FE(e, h) ? p = !0 : jE(e) ? (p = !0, (e.tag !== null || e.anchor !== null) && J(e, "alias node should not have any properties")) : xE(e, h, Ri === n) && (p = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && mn(e, e.anchor, e.result);
      }
    else a === 0 && (p = s && Dl(e, w));
  if (e.tag === null)
    e.anchor !== null && mn(e, e.anchor, e.result);
  else if (e.tag === "?") {
    e.result !== null && e.kind !== "scalar" && J(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"');
    for (let f = 0, E = e.implicitTypes.length; f < E; f += 1)
      if (u = e.implicitTypes[f], u.resolve(e.result)) {
        e.result = u.construct(e.result), e.tag = u.tag, e.anchor !== null && mn(e, e.anchor, e.result);
        break;
      }
  } else if (e.tag !== "!") {
    if (pt.call(e.typeMap[e.kind || "fallback"], e.tag))
      u = e.typeMap[e.kind || "fallback"][e.tag];
    else {
      u = null;
      const f = e.typeMap.multi[e.kind || "fallback"];
      for (let E = 0, _ = f.length; E < _; E += 1)
        if (e.tag.slice(0, f[E].tag.length) === f[E].tag) {
          u = f[E];
          break;
        }
    }
    u || J(e, "unknown tag !<" + e.tag + ">"), e.result !== null && u.kind !== e.kind && J(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + u.kind + '", not "' + e.kind + '"'), u.resolve(e.result, e.tag) ? (e.result = u.construct(e.result, e.tag), e.anchor !== null && mn(e, e.anchor, e.result)) : J(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.depth -= 1, e.tag !== null || e.anchor !== null || p;
}
function GE(e) {
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
    r !== 0 && Js(e), pt.call(Tl, o) ? Tl[o](e, o, s) : Li(e, 'unknown document directive "' + o + '"');
  }
  if (Ce(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, Ce(e, !0, -1)) : n && J(e, "directives end mark is expected"), Jn(e, e.lineIndent - 1, $i, !1, !0), Ce(e, !0, -1), e.checkLineBreaks && TE.test(e.input.slice(t, e.position)) && Li(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Xi(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, Ce(e, !0, -1));
    return;
  }
  e.position < e.length - 1 && J(e, "end of the stream or a document separator is expected");
}
function jf(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  const n = new OE(e, t), r = e.indexOf("\0");
  for (r !== -1 && (n.position = r, J(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    GE(n);
  return n.documents;
}
function qE(e, t, n) {
  t !== null && typeof t == "object" && typeof n > "u" && (n = t, t = null);
  const r = jf(e, n);
  if (typeof t != "function")
    return r;
  for (let i = 0, o = r.length; i < o; i += 1)
    t(r[i]);
}
function zE(e, t) {
  const n = jf(e, t);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new Of("expected a single document in the stream, but found more");
  }
}
Ws.loadAll = qE;
Ws.load = zE;
var Hf = {};
const Ji = mt, jr = Br, VE = Xs, Gf = Object.prototype.toString, qf = Object.prototype.hasOwnProperty, Ks = 65279, WE = 9, Cr = 10, YE = 13, XE = 32, JE = 33, ZE = 34, _s = 35, KE = 37, QE = 38, ey = 39, ty = 42, zf = 44, ny = 45, xi = 58, ry = 61, iy = 62, oy = 63, sy = 64, Vf = 91, Wf = 93, ay = 96, Yf = 123, ly = 124, Xf = 125, qe = {};
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
const cy = [
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
], uy = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function fy(e, t) {
  if (t === null) return {};
  const n = {}, r = Object.keys(t);
  for (let i = 0, o = r.length; i < o; i += 1) {
    let s = r[i], a = String(t[s]);
    s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2));
    const c = e.compiledTypeMap.fallback[s];
    c && qf.call(c.styleAliases, a) && (a = c.styleAliases[a]), n[s] = a;
  }
  return n;
}
function dy(e) {
  let t, n;
  const r = e.toString(16).toUpperCase();
  if (e <= 255)
    t = "x", n = 2;
  else if (e <= 65535)
    t = "u", n = 4;
  else if (e <= 4294967295)
    t = "U", n = 8;
  else
    throw new jr("code point within a string may not be greater than 0xFFFFFFFF");
  return "\\" + t + Ji.repeat("0", n - r.length) + r;
}
const hy = 1, Ir = 2;
function py(e) {
  this.schema = e.schema || VE, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Ji.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = fy(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Ir : hy, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Nl(e, t) {
  const n = Ji.repeat(" ", t);
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
function vs(e, t) {
  return `
` + Ji.repeat(" ", e.indent * t);
}
function my(e, t) {
  for (let n = 0, r = e.implicitTypes.length; n < r; n += 1)
    if (e.implicitTypes[n].resolve(t))
      return !0;
  return !1;
}
function Pi(e) {
  return e === XE || e === WE;
}
function Dr(e) {
  return e >= 32 && e <= 126 || e >= 161 && e <= 55295 && e !== 8232 && e !== 8233 || e >= 57344 && e <= 65533 && e !== Ks || e >= 65536 && e <= 1114111;
}
function bl(e) {
  return Dr(e) && e !== Ks && // - b-char
  e !== YE && e !== Cr;
}
function Ol(e, t, n) {
  const r = bl(e), i = r && !Pi(e);
  return (
    // ns-plain-safe
    (n ? r : r && // - c-flow-indicator
    e !== zf && e !== Vf && e !== Wf && e !== Yf && e !== Xf) && // ns-plain-char
    e !== _s && // false on '#'
    !(t === xi && !i) || // false on ': '
    bl(t) && !Pi(t) && e === _s || // change to true on '[^ ]#'
    t === xi && i
  );
}
function gy(e) {
  return Dr(e) && e !== Ks && !Pi(e) && // - s-white
  // - (c-indicator ::=
  // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
  e !== ny && e !== oy && e !== xi && e !== zf && e !== Vf && e !== Wf && e !== Yf && e !== Xf && // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
  e !== _s && e !== QE && e !== ty && e !== JE && e !== ly && e !== ry && e !== iy && e !== ey && e !== ZE && // | “%” | “@” | “`”)
  e !== KE && e !== sy && e !== ay;
}
function Ey(e) {
  return !Pi(e) && e !== xi;
}
function pr(e, t) {
  const n = e.charCodeAt(t);
  let r;
  return n >= 55296 && n <= 56319 && t + 1 < e.length && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (n - 55296) * 1024 + r - 56320 + 65536 : n;
}
function Jf(e) {
  return /^\n* /.test(e);
}
const Zf = 1, Ss = 2, Kf = 3, Qf = 4, Fn = 5;
function yy(e, t, n, r, i, o, s, a) {
  let c, p = 0, l = null, u = !1, h = !1;
  const w = r !== -1;
  let m = -1, f = gy(pr(e, 0)) && Ey(pr(e, e.length - 1));
  if (t || s)
    for (c = 0; c < e.length; p >= 65536 ? c += 2 : c++) {
      if (p = pr(e, c), !Dr(p))
        return Fn;
      f = f && Ol(p, l, a), l = p;
    }
  else {
    for (c = 0; c < e.length; p >= 65536 ? c += 2 : c++) {
      if (p = pr(e, c), p === Cr)
        u = !0, w && (h = h || // Foldable line = too long, and not more-indented.
        c - m - 1 > r && e[m + 1] !== " ", m = c);
      else if (!Dr(p))
        return Fn;
      f = f && Ol(p, l, a), l = p;
    }
    h = h || w && c - m - 1 > r && e[m + 1] !== " ";
  }
  return !u && !h ? f && !s && !i(e) ? Zf : o === Ir ? Fn : Ss : n > 9 && Jf(e) ? Fn : s ? o === Ir ? Fn : Ss : h ? Qf : Kf;
}
function wy(e, t, n, r, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Ir ? '""' : "''";
    if (!e.noCompatMode && (cy.indexOf(t) !== -1 || uy.test(t)))
      return e.quotingType === Ir ? '"' + t + '"' : "'" + t + "'";
    const o = e.indent * Math.max(1, n), s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), a = r || // No block styles in flow mode.
    e.flowLevel > -1 && n >= e.flowLevel;
    function c(p) {
      return my(e, p);
    }
    switch (yy(
      t,
      a,
      e.indent,
      s,
      c,
      e.quotingType,
      e.forceQuotes && !r,
      i
    )) {
      case Zf:
        return t;
      case Ss:
        return "'" + t.replace(/'/g, "''") + "'";
      case Kf:
        return "|" + Rl(t, e.indent) + $l(Nl(t, o));
      case Qf:
        return ">" + Rl(t, e.indent) + $l(Nl(_y(t, s), o));
      case Fn:
        return '"' + vy(t) + '"';
      default:
        throw new jr("impossible error: invalid scalar style");
    }
  }();
}
function Rl(e, t) {
  const n = Jf(e) ? String(t) : "", r = e[e.length - 1] === `
`, o = r && (e[e.length - 2] === `
` || e === `
`) ? "+" : r ? "" : "-";
  return n + o + `
`;
}
function $l(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function _y(e, t) {
  const n = /(\n+)([^\n]*)/g;
  let r = function() {
    let a = e.indexOf(`
`);
    return a = a !== -1 ? a : e.length, n.lastIndex = a, Ll(e.slice(0, a), t);
  }(), i = e[0] === `
` || e[0] === " ", o, s;
  for (; s = n.exec(e); ) {
    const a = s[1], c = s[2];
    o = c[0] === " ", r += a + (!i && !o && c !== "" ? `
` : "") + Ll(c, t), i = o;
  }
  return r;
}
function Ll(e, t) {
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
function vy(e) {
  let t = "", n = 0;
  for (let r = 0; r < e.length; n >= 65536 ? r += 2 : r++) {
    n = pr(e, r);
    const i = qe[n];
    !i && Dr(n) ? (t += e[r], n >= 65536 && (t += e[r + 1])) : t += i || dy(n);
  }
  return t;
}
function Sy(e, t, n) {
  let r = "";
  const i = e.tag;
  for (let o = 0, s = n.length; o < s; o += 1) {
    let a = n[o];
    e.replacer && (a = e.replacer.call(n, String(o), a)), (Lt(e, t, a, !1, !1) || typeof a > "u" && Lt(e, t, null, !1, !1)) && (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
  }
  e.tag = i, e.dump = "[" + r + "]";
}
function xl(e, t, n, r) {
  let i = "";
  const o = e.tag;
  for (let s = 0, a = n.length; s < a; s += 1) {
    let c = n[s];
    e.replacer && (c = e.replacer.call(n, String(s), c)), (Lt(e, t + 1, c, !0, !0, !1, !0) || typeof c > "u" && Lt(e, t + 1, null, !0, !0, !1, !0)) && ((!r || i !== "") && (i += vs(e, t)), e.dump && Cr === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  }
  e.tag = o, e.dump = i || "[]";
}
function Ay(e, t, n) {
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
function Ty(e, t, n, r) {
  let i = "";
  const o = e.tag, s = Object.keys(n);
  if (e.sortKeys === !0)
    s.sort();
  else if (typeof e.sortKeys == "function")
    s.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new jr("sortKeys must be a boolean or a function");
  for (let a = 0, c = s.length; a < c; a += 1) {
    let p = "";
    (!r || i !== "") && (p += vs(e, t));
    const l = s[a];
    let u = n[l];
    if (e.replacer && (u = e.replacer.call(n, l, u)), !Lt(e, t + 1, l, !0, !0, !0))
      continue;
    const h = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024;
    h && (e.dump && Cr === e.dump.charCodeAt(0) ? p += "?" : p += "? "), p += e.dump, h && (p += vs(e, t)), Lt(e, t + 1, u, !0, h) && (e.dump && Cr === e.dump.charCodeAt(0) ? p += ":" : p += ": ", p += e.dump, i += p);
  }
  e.tag = o, e.dump = i || "{}";
}
function Pl(e, t, n) {
  const r = n ? e.explicitTypes : e.implicitTypes;
  for (let i = 0, o = r.length; i < o; i += 1) {
    const s = r[i];
    if ((s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (n ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        const a = e.styleMap[s.tag] || s.defaultStyle;
        let c;
        if (Gf.call(s.represent) === "[object Function]")
          c = s.represent(t, a);
        else if (qf.call(s.represent, a))
          c = s.represent[a](t, a);
        else
          throw new jr("!<" + s.tag + '> tag resolver accepts not "' + a + '" style');
        e.dump = c;
      }
      return !0;
    }
  }
  return !1;
}
function Lt(e, t, n, r, i, o, s) {
  e.tag = null, e.dump = n, Pl(e, n, !1) || Pl(e, n, !0);
  const a = Gf.call(e.dump), c = r;
  r && (r = e.flowLevel < 0 || e.flowLevel > t);
  const p = a === "[object Object]" || a === "[object Array]";
  let l, u;
  if (p && (l = e.duplicates.indexOf(n), u = l !== -1), (e.tag !== null && e.tag !== "?" || u || e.indent !== 2 && t > 0) && (i = !1), u && e.usedDuplicates[l])
    e.dump = "*ref_" + l;
  else {
    if (p && u && !e.usedDuplicates[l] && (e.usedDuplicates[l] = !0), a === "[object Object]")
      r && Object.keys(e.dump).length !== 0 ? (Ty(e, t, e.dump, i), u && (e.dump = "&ref_" + l + e.dump)) : (Ay(e, t, e.dump), u && (e.dump = "&ref_" + l + " " + e.dump));
    else if (a === "[object Array]")
      r && e.dump.length !== 0 ? (e.noArrayIndent && !s && t > 0 ? xl(e, t - 1, e.dump, i) : xl(e, t, e.dump, i), u && (e.dump = "&ref_" + l + e.dump)) : (Sy(e, t, e.dump), u && (e.dump = "&ref_" + l + " " + e.dump));
    else if (a === "[object String]")
      e.tag !== "?" && wy(e, e.dump, t, o, c);
    else {
      if (a === "[object Undefined]")
        return !1;
      if (e.skipInvalid) return !1;
      throw new jr("unacceptable kind of an object to dump " + a);
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
function Cy(e, t) {
  const n = [], r = [];
  As(e, n, r);
  const i = r.length;
  for (let o = 0; o < i; o += 1)
    t.duplicates.push(n[r[o]]);
  t.usedDuplicates = new Array(i);
}
function As(e, t, n) {
  if (e !== null && typeof e == "object") {
    const r = t.indexOf(e);
    if (r !== -1)
      n.indexOf(r) === -1 && n.push(r);
    else if (t.push(e), Array.isArray(e))
      for (let i = 0, o = e.length; i < o; i += 1)
        As(e[i], t, n);
    else {
      const i = Object.keys(e);
      for (let o = 0, s = i.length; o < s; o += 1)
        As(e[i[o]], t, n);
    }
  }
}
function Iy(e, t) {
  t = t || {};
  const n = new py(t);
  n.noRefs || Cy(e, n);
  let r = e;
  return n.replacer && (r = n.replacer.call({ "": r }, "", r)), Lt(n, 0, r, !0, !0) ? n.dump + `
` : "";
}
Hf.dump = Iy;
const ed = Ws, Dy = Hf;
function Qs(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Fe.Type = Je;
Fe.Schema = uf;
Fe.FAILSAFE_SCHEMA = pf;
Fe.JSON_SCHEMA = _f;
Fe.CORE_SCHEMA = vf;
Fe.DEFAULT_SCHEMA = Xs;
Fe.load = ed.load;
Fe.loadAll = ed.loadAll;
Fe.dump = Dy.dump;
Fe.YAMLException = Br;
Fe.types = {
  binary: If,
  float: wf,
  map: hf,
  null: mf,
  pairs: Nf,
  set: bf,
  timestamp: Tf,
  bool: gf,
  int: Ef,
  merge: Cf,
  omap: Df,
  seq: df,
  str: ff
};
Fe.safeLoad = Qs("safeLoad", "load");
Fe.safeLoadAll = Qs("safeLoadAll", "loadAll");
Fe.safeDump = Qs("safeDump", "dump");
var Zi = {};
Object.defineProperty(Zi, "__esModule", { value: !0 });
Zi.Lazy = void 0;
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
Zi.Lazy = Ny;
var Ts = { exports: {} };
const by = "2.0.0", td = 256, Oy = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, Ry = 16, $y = td - 6, Ly = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Ki = {
  MAX_LENGTH: td,
  MAX_SAFE_COMPONENT_LENGTH: Ry,
  MAX_SAFE_BUILD_LENGTH: $y,
  MAX_SAFE_INTEGER: Oy,
  RELEASE_TYPES: Ly,
  SEMVER_SPEC_VERSION: by,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const xy = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Qi = xy;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: r,
    MAX_LENGTH: i
  } = Ki, o = Qi;
  t = e.exports = {};
  const s = t.re = [], a = t.safeRe = [], c = t.src = [], p = t.safeSrc = [], l = t.t = {};
  let u = 0;
  const h = "[a-zA-Z0-9-]", w = [
    ["\\s", 1],
    ["\\d", i],
    [h, r]
  ], m = (E) => {
    for (const [_, y] of w)
      E = E.split(`${_}*`).join(`${_}{0,${y}}`).split(`${_}+`).join(`${_}{1,${y}}`);
    return E;
  }, f = (E, _, y) => {
    const S = m(_), T = u++;
    o(E, T, _), l[E] = T, c[T] = _, p[T] = S, s[T] = new RegExp(_, y ? "g" : void 0), a[T] = new RegExp(S, y ? "g" : void 0);
  };
  f("NUMERICIDENTIFIER", "0|[1-9]\\d*"), f("NUMERICIDENTIFIERLOOSE", "\\d+"), f("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), f("MAINVERSION", `(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})\\.(${c[l.NUMERICIDENTIFIER]})`), f("MAINVERSIONLOOSE", `(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})\\.(${c[l.NUMERICIDENTIFIERLOOSE]})`), f("PRERELEASEIDENTIFIER", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIER]})`), f("PRERELEASEIDENTIFIERLOOSE", `(?:${c[l.NONNUMERICIDENTIFIER]}|${c[l.NUMERICIDENTIFIERLOOSE]})`), f("PRERELEASE", `(?:-(${c[l.PRERELEASEIDENTIFIER]}(?:\\.${c[l.PRERELEASEIDENTIFIER]})*))`), f("PRERELEASELOOSE", `(?:-?(${c[l.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${c[l.PRERELEASEIDENTIFIERLOOSE]})*))`), f("BUILDIDENTIFIER", `${h}+`), f("BUILD", `(?:\\+(${c[l.BUILDIDENTIFIER]}(?:\\.${c[l.BUILDIDENTIFIER]})*))`), f("FULLPLAIN", `v?${c[l.MAINVERSION]}${c[l.PRERELEASE]}?${c[l.BUILD]}?`), f("FULL", `^${c[l.FULLPLAIN]}$`), f("LOOSEPLAIN", `[v=\\s]*${c[l.MAINVERSIONLOOSE]}${c[l.PRERELEASELOOSE]}?${c[l.BUILD]}?`), f("LOOSE", `^${c[l.LOOSEPLAIN]}$`), f("GTLT", "((?:<|>)?=?)"), f("XRANGEIDENTIFIERLOOSE", `${c[l.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), f("XRANGEIDENTIFIER", `${c[l.NUMERICIDENTIFIER]}|x|X|\\*`), f("XRANGEPLAIN", `[v=\\s]*(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:\\.(${c[l.XRANGEIDENTIFIER]})(?:${c[l.PRERELEASE]})?${c[l.BUILD]}?)?)?`), f("XRANGEPLAINLOOSE", `[v=\\s]*(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:\\.(${c[l.XRANGEIDENTIFIERLOOSE]})(?:${c[l.PRERELEASELOOSE]})?${c[l.BUILD]}?)?)?`), f("XRANGE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAIN]}$`), f("XRANGELOOSE", `^${c[l.GTLT]}\\s*${c[l.XRANGEPLAINLOOSE]}$`), f("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), f("COERCE", `${c[l.COERCEPLAIN]}(?:$|[^\\d])`), f("COERCEFULL", c[l.COERCEPLAIN] + `(?:${c[l.PRERELEASE]})?(?:${c[l.BUILD]})?(?:$|[^\\d])`), f("COERCERTL", c[l.COERCE], !0), f("COERCERTLFULL", c[l.COERCEFULL], !0), f("LONETILDE", "(?:~>?)"), f("TILDETRIM", `(\\s*)${c[l.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", f("TILDE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAIN]}$`), f("TILDELOOSE", `^${c[l.LONETILDE]}${c[l.XRANGEPLAINLOOSE]}$`), f("LONECARET", "(?:\\^)"), f("CARETTRIM", `(\\s*)${c[l.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", f("CARET", `^${c[l.LONECARET]}${c[l.XRANGEPLAIN]}$`), f("CARETLOOSE", `^${c[l.LONECARET]}${c[l.XRANGEPLAINLOOSE]}$`), f("COMPARATORLOOSE", `^${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]})$|^$`), f("COMPARATOR", `^${c[l.GTLT]}\\s*(${c[l.FULLPLAIN]})$|^$`), f("COMPARATORTRIM", `(\\s*)${c[l.GTLT]}\\s*(${c[l.LOOSEPLAIN]}|${c[l.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", f("HYPHENRANGE", `^\\s*(${c[l.XRANGEPLAIN]})\\s+-\\s+(${c[l.XRANGEPLAIN]})\\s*$`), f("HYPHENRANGELOOSE", `^\\s*(${c[l.XRANGEPLAINLOOSE]})\\s+-\\s+(${c[l.XRANGEPLAINLOOSE]})\\s*$`), f("STAR", "(<|>)?=?\\s*\\*"), f("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), f("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(Ts, Ts.exports);
var Hr = Ts.exports;
const Py = Object.freeze({ loose: !0 }), Fy = Object.freeze({}), Uy = (e) => e ? typeof e != "object" ? Py : e : Fy;
var ea = Uy;
const Fl = /^[0-9]+$/, nd = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const n = Fl.test(e), r = Fl.test(t);
  return n && r && (e = +e, t = +t), e === t ? 0 : n && !r ? -1 : r && !n ? 1 : e < t ? -1 : 1;
}, ky = (e, t) => nd(t, e);
var rd = {
  compareIdentifiers: nd,
  rcompareIdentifiers: ky
};
const ci = Qi, { MAX_LENGTH: Ul, MAX_SAFE_INTEGER: ui } = Ki, { safeRe: fi, t: di } = Hr, My = ea, { compareIdentifiers: ko } = rd;
let By = class _t {
  constructor(t, n) {
    if (n = My(n), t instanceof _t) {
      if (t.loose === !!n.loose && t.includePrerelease === !!n.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Ul)
      throw new TypeError(
        `version is longer than ${Ul} characters`
      );
    ci("SemVer", t, n), this.options = n, this.loose = !!n.loose, this.includePrerelease = !!n.includePrerelease;
    const r = t.trim().match(n.loose ? fi[di.LOOSE] : fi[di.FULL]);
    if (!r)
      throw new TypeError(`Invalid Version: ${t}`);
    if (this.raw = t, this.major = +r[1], this.minor = +r[2], this.patch = +r[3], this.major > ui || this.major < 0)
      throw new TypeError("Invalid major version");
    if (this.minor > ui || this.minor < 0)
      throw new TypeError("Invalid minor version");
    if (this.patch > ui || this.patch < 0)
      throw new TypeError("Invalid patch version");
    r[4] ? this.prerelease = r[4].split(".").map((i) => {
      if (/^[0-9]+$/.test(i)) {
        const o = +i;
        if (o >= 0 && o < ui)
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
    if (ci("SemVer.compare", this.version, this.options, t), !(t instanceof _t)) {
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
      if (ci("prerelease compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return ko(r, i);
    } while (++n);
  }
  compareBuild(t) {
    t instanceof _t || (t = new _t(t, this.options));
    let n = 0;
    do {
      const r = this.build[n], i = t.build[n];
      if (ci("build compare", n, r, i), r === void 0 && i === void 0)
        return 0;
      if (i === void 0)
        return 1;
      if (r === void 0)
        return -1;
      if (r === i)
        continue;
      return ko(r, i);
    } while (++n);
  }
  // preminor will bump the version up to the next minor release, and immediately
  // down to pre-release. premajor and prepatch work the same way.
  inc(t, n, r) {
    if (t.startsWith("pre")) {
      if (!n && r === !1)
        throw new Error("invalid increment argument: identifier is empty");
      if (n) {
        const i = `-${n}`.match(this.options.loose ? fi[di.PRERELEASELOOSE] : fi[di.PRERELEASE]);
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
          r === !1 && (o = [n]), ko(this.prerelease[0], n) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Ze = By;
const kl = Ze, jy = (e, t, n = !1) => {
  if (e instanceof kl)
    return e;
  try {
    return new kl(e, t);
  } catch (r) {
    if (!n)
      return null;
    throw r;
  }
};
var er = jy;
const Hy = er, Gy = (e, t) => {
  const n = Hy(e, t);
  return n ? n.version : null;
};
var qy = Gy;
const zy = er, Vy = (e, t) => {
  const n = zy(e.trim().replace(/^[=v]+/, ""), t);
  return n ? n.version : null;
};
var Wy = Vy;
const Ml = Ze, Yy = (e, t, n, r, i) => {
  typeof n == "string" && (i = r, r = n, n = void 0);
  try {
    return new Ml(
      e instanceof Ml ? e.version : e,
      n
    ).inc(t, r, i).version;
  } catch {
    return null;
  }
};
var Xy = Yy;
const Bl = er, Jy = (e, t) => {
  const n = Bl(e, null, !0), r = Bl(t, null, !0), i = n.compare(r);
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
var Zy = Jy;
const Ky = Ze, Qy = (e, t) => new Ky(e, t).major;
var ew = Qy;
const tw = Ze, nw = (e, t) => new tw(e, t).minor;
var rw = nw;
const iw = Ze, ow = (e, t) => new iw(e, t).patch;
var sw = ow;
const aw = er, lw = (e, t) => {
  const n = aw(e, t);
  return n && n.prerelease.length ? n.prerelease : null;
};
var cw = lw;
const jl = Ze, uw = (e, t, n) => new jl(e, n).compare(new jl(t, n));
var gt = uw;
const fw = gt, dw = (e, t, n) => fw(t, e, n);
var hw = dw;
const pw = gt, mw = (e, t) => pw(e, t, !0);
var gw = mw;
const Hl = Ze, Ew = (e, t, n) => {
  const r = new Hl(e, n), i = new Hl(t, n);
  return r.compare(i) || r.compareBuild(i);
};
var ta = Ew;
const yw = ta, ww = (e, t) => e.sort((n, r) => yw(n, r, t));
var _w = ww;
const vw = ta, Sw = (e, t) => e.sort((n, r) => vw(r, n, t));
var Aw = Sw;
const Tw = gt, Cw = (e, t, n) => Tw(e, t, n) > 0;
var eo = Cw;
const Iw = gt, Dw = (e, t, n) => Iw(e, t, n) < 0;
var na = Dw;
const Nw = gt, bw = (e, t, n) => Nw(e, t, n) === 0;
var id = bw;
const Ow = gt, Rw = (e, t, n) => Ow(e, t, n) !== 0;
var od = Rw;
const $w = gt, Lw = (e, t, n) => $w(e, t, n) >= 0;
var ra = Lw;
const xw = gt, Pw = (e, t, n) => xw(e, t, n) <= 0;
var ia = Pw;
const Fw = id, Uw = od, kw = eo, Mw = ra, Bw = na, jw = ia, Hw = (e, t, n, r) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e === n;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e !== n;
    case "":
    case "=":
    case "==":
      return Fw(e, n, r);
    case "!=":
      return Uw(e, n, r);
    case ">":
      return kw(e, n, r);
    case ">=":
      return Mw(e, n, r);
    case "<":
      return Bw(e, n, r);
    case "<=":
      return jw(e, n, r);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var sd = Hw;
const Gw = Ze, qw = er, { safeRe: hi, t: pi } = Hr, zw = (e, t) => {
  if (e instanceof Gw)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let n = null;
  if (!t.rtl)
    n = e.match(t.includePrerelease ? hi[pi.COERCEFULL] : hi[pi.COERCE]);
  else {
    const c = t.includePrerelease ? hi[pi.COERCERTLFULL] : hi[pi.COERCERTL];
    let p;
    for (; (p = c.exec(e)) && (!n || n.index + n[0].length !== e.length); )
      (!n || p.index + p[0].length !== n.index + n[0].length) && (n = p), c.lastIndex = p.index + p[1].length + p[2].length;
    c.lastIndex = -1;
  }
  if (n === null)
    return null;
  const r = n[2], i = n[3] || "0", o = n[4] || "0", s = t.includePrerelease && n[5] ? `-${n[5]}` : "", a = t.includePrerelease && n[6] ? `+${n[6]}` : "";
  return qw(`${r}.${i}.${o}${s}${a}`, t);
};
var Vw = zw;
class Ww {
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
var Yw = Ww, Mo, Gl;
function Et() {
  if (Gl) return Mo;
  Gl = 1;
  const e = /\s+/g;
  class t {
    constructor(O, M) {
      if (M = i(M), O instanceof t)
        return O.loose === !!M.loose && O.includePrerelease === !!M.includePrerelease ? O : new t(O.raw, M);
      if (O instanceof o)
        return this.raw = O.value, this.set = [[O]], this.formatted = void 0, this;
      if (this.options = M, this.loose = !!M.loose, this.includePrerelease = !!M.includePrerelease, this.raw = O.trim().replace(e, " "), this.set = this.raw.split("||").map(($) => this.parseRange($.trim())).filter(($) => $.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const $ = this.set[0];
        if (this.set = this.set.filter((q) => !f(q[0])), this.set.length === 0)
          this.set = [$];
        else if (this.set.length > 1) {
          for (const q of this.set)
            if (q.length === 1 && E(q[0])) {
              this.set = [q];
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
    parseRange(O) {
      const $ = ((this.options.includePrerelease && w) | (this.options.loose && m)) + ":" + O, q = r.get($);
      if (q)
        return q;
      const N = this.options.loose, H = N ? c[p.HYPHENRANGELOOSE] : c[p.HYPHENRANGE];
      O = O.replace(H, K(this.options.includePrerelease)), s("hyphen replace", O), O = O.replace(c[p.COMPARATORTRIM], l), s("comparator trim", O), O = O.replace(c[p.TILDETRIM], u), s("tilde trim", O), O = O.replace(c[p.CARETTRIM], h), s("caret trim", O);
      let W = O.split(" ").map((V) => y(V, this.options)).join(" ").split(/\s+/).map((V) => Y(V, this.options));
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
    intersects(O, M) {
      if (!(O instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some(($) => _($, M) && O.set.some((q) => _(q, M) && $.every((N) => q.every((H) => N.intersects(H, M)))));
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
  Mo = t;
  const n = Yw, r = new n(), i = ea, o = to(), s = Qi, a = Ze, {
    safeRe: c,
    t: p,
    comparatorTrimReplace: l,
    tildeTrimReplace: u,
    caretTrimReplace: h
  } = Hr, { FLAG_INCLUDE_PRERELEASE: w, FLAG_LOOSE: m } = Ki, f = (F) => F.value === "<0.0.0-0", E = (F) => F.value === "", _ = (F, O) => {
    let M = !0;
    const $ = F.slice();
    let q = $.pop();
    for (; M && $.length; )
      M = $.every((N) => q.intersects(N, O)), q = $.pop();
    return M;
  }, y = (F, O) => (F = F.replace(c[p.BUILD], ""), s("comp", F, O), F = b(F, O), s("caret", F), F = T(F, O), s("tildes", F), F = B(F, O), s("xrange", F), F = A(F, O), s("stars", F), F), S = (F) => !F || F.toLowerCase() === "x" || F === "*", T = (F, O) => F.trim().split(/\s+/).map((M) => R(M, O)).join(" "), R = (F, O) => {
    const M = O.loose ? c[p.TILDELOOSE] : c[p.TILDE];
    return F.replace(M, ($, q, N, H, W) => {
      s("tilde", F, $, q, N, H, W);
      let U;
      return S(q) ? U = "" : S(N) ? U = `>=${q}.0.0 <${+q + 1}.0.0-0` : S(H) ? U = `>=${q}.${N}.0 <${q}.${+N + 1}.0-0` : W ? (s("replaceTilde pr", W), U = `>=${q}.${N}.${H}-${W} <${q}.${+N + 1}.0-0`) : U = `>=${q}.${N}.${H} <${q}.${+N + 1}.0-0`, s("tilde return", U), U;
    });
  }, b = (F, O) => F.trim().split(/\s+/).map((M) => j(M, O)).join(" "), j = (F, O) => {
    s("caret", F, O);
    const M = O.loose ? c[p.CARETLOOSE] : c[p.CARET], $ = O.includePrerelease ? "-0" : "";
    return F.replace(M, (q, N, H, W, U) => {
      s("caret", F, q, N, H, W, U);
      let Q;
      return S(N) ? Q = "" : S(H) ? Q = `>=${N}.0.0${$} <${+N + 1}.0.0-0` : S(W) ? N === "0" ? Q = `>=${N}.${H}.0${$} <${N}.${+H + 1}.0-0` : Q = `>=${N}.${H}.0${$} <${+N + 1}.0.0-0` : U ? (s("replaceCaret pr", U), N === "0" ? H === "0" ? Q = `>=${N}.${H}.${W}-${U} <${N}.${H}.${+W + 1}-0` : Q = `>=${N}.${H}.${W}-${U} <${N}.${+H + 1}.0-0` : Q = `>=${N}.${H}.${W}-${U} <${+N + 1}.0.0-0`) : (s("no pr"), N === "0" ? H === "0" ? Q = `>=${N}.${H}.${W}${$} <${N}.${H}.${+W + 1}-0` : Q = `>=${N}.${H}.${W}${$} <${N}.${+H + 1}.0-0` : Q = `>=${N}.${H}.${W} <${+N + 1}.0.0-0`), s("caret return", Q), Q;
    });
  }, B = (F, O) => (s("replaceXRanges", F, O), F.split(/\s+/).map((M) => P(M, O)).join(" ")), P = (F, O) => {
    F = F.trim();
    const M = O.loose ? c[p.XRANGELOOSE] : c[p.XRANGE];
    return F.replace(M, ($, q, N, H, W, U) => {
      s("xRange", F, $, q, N, H, W, U);
      const Q = S(N), re = Q || S(H), V = re || S(W), ie = V;
      return q === "=" && ie && (q = ""), U = O.includePrerelease ? "-0" : "", Q ? q === ">" || q === "<" ? $ = "<0.0.0-0" : $ = "*" : q && ie ? (re && (H = 0), W = 0, q === ">" ? (q = ">=", re ? (N = +N + 1, H = 0, W = 0) : (H = +H + 1, W = 0)) : q === "<=" && (q = "<", re ? N = +N + 1 : H = +H + 1), q === "<" && (U = "-0"), $ = `${q + N}.${H}.${W}${U}`) : re ? $ = `>=${N}.0.0${U} <${+N + 1}.0.0-0` : V && ($ = `>=${N}.${H}.0${U} <${N}.${+H + 1}.0-0`), s("xRange return", $), $;
    });
  }, A = (F, O) => (s("replaceStars", F, O), F.trim().replace(c[p.STAR], "")), Y = (F, O) => (s("replaceGTE0", F, O), F.trim().replace(c[O.includePrerelease ? p.GTE0PRE : p.GTE0], "")), K = (F) => (O, M, $, q, N, H, W, U, Q, re, V, ie) => (S($) ? M = "" : S(q) ? M = `>=${$}.0.0${F ? "-0" : ""}` : S(N) ? M = `>=${$}.${q}.0${F ? "-0" : ""}` : H ? M = `>=${M}` : M = `>=${M}${F ? "-0" : ""}`, S(Q) ? U = "" : S(re) ? U = `<${+Q + 1}.0.0-0` : S(V) ? U = `<${Q}.${+re + 1}.0-0` : ie ? U = `<=${Q}.${re}.${V}-${ie}` : F ? U = `<${Q}.${re}.${+V + 1}-0` : U = `<=${U}`, `${M} ${U}`.trim()), te = (F, O, M) => {
    for (let $ = 0; $ < F.length; $++)
      if (!F[$].test(O))
        return !1;
    if (O.prerelease.length && !M.includePrerelease) {
      for (let $ = 0; $ < F.length; $++)
        if (s(F[$].semver), F[$].semver !== o.ANY && F[$].semver.prerelease.length > 0) {
          const q = F[$].semver;
          if (q.major === O.major && q.minor === O.minor && q.patch === O.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Mo;
}
var Bo, ql;
function to() {
  if (ql) return Bo;
  ql = 1;
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
  Bo = t;
  const n = ea, { safeRe: r, t: i } = Hr, o = sd, s = Qi, a = Ze, c = Et();
  return Bo;
}
const Xw = Et(), Jw = (e, t, n) => {
  try {
    t = new Xw(t, n);
  } catch {
    return !1;
  }
  return t.test(e);
};
var no = Jw;
const Zw = Et(), Kw = (e, t) => new Zw(e, t).set.map((n) => n.map((r) => r.value).join(" ").trim().split(" "));
var Qw = Kw;
const e_ = Ze, t_ = Et(), n_ = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new t_(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!r || i.compare(s) === -1) && (r = s, i = new e_(r, n));
  }), r;
};
var r_ = n_;
const i_ = Ze, o_ = Et(), s_ = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new o_(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!r || i.compare(s) === 1) && (r = s, i = new i_(r, n));
  }), r;
};
var a_ = s_;
const jo = Ze, l_ = Et(), zl = eo, c_ = (e, t) => {
  e = new l_(e, t);
  let n = new jo("0.0.0");
  if (e.test(n) || (n = new jo("0.0.0-0"), e.test(n)))
    return n;
  n = null;
  for (let r = 0; r < e.set.length; ++r) {
    const i = e.set[r];
    let o = null;
    i.forEach((s) => {
      const a = new jo(s.semver.version);
      switch (s.operator) {
        case ">":
          a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), a.raw = a.format();
        case "":
        case ">=":
          (!o || zl(a, o)) && (o = a);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${s.operator}`);
      }
    }), o && (!n || zl(n, o)) && (n = o);
  }
  return n && e.test(n) ? n : null;
};
var u_ = c_;
const f_ = Et(), d_ = (e, t) => {
  try {
    return new f_(e, t).range || "*";
  } catch {
    return null;
  }
};
var h_ = d_;
const p_ = Ze, ad = to(), { ANY: m_ } = ad, g_ = Et(), E_ = no, Vl = eo, Wl = na, y_ = ia, w_ = ra, __ = (e, t, n, r) => {
  e = new p_(e, r), t = new g_(t, r);
  let i, o, s, a, c;
  switch (n) {
    case ">":
      i = Vl, o = y_, s = Wl, a = ">", c = ">=";
      break;
    case "<":
      i = Wl, o = w_, s = Vl, a = "<", c = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (E_(e, t, r))
    return !1;
  for (let p = 0; p < t.set.length; ++p) {
    const l = t.set[p];
    let u = null, h = null;
    if (l.forEach((w) => {
      w.semver === m_ && (w = new ad(">=0.0.0")), u = u || w, h = h || w, i(w.semver, u.semver, r) ? u = w : s(w.semver, h.semver, r) && (h = w);
    }), u.operator === a || u.operator === c || (!h.operator || h.operator === a) && o(e, h.semver))
      return !1;
    if (h.operator === c && s(e, h.semver))
      return !1;
  }
  return !0;
};
var oa = __;
const v_ = oa, S_ = (e, t, n) => v_(e, t, ">", n);
var A_ = S_;
const T_ = oa, C_ = (e, t, n) => T_(e, t, "<", n);
var I_ = C_;
const Yl = Et(), D_ = (e, t, n) => (e = new Yl(e, n), t = new Yl(t, n), e.intersects(t, n));
var N_ = D_;
const b_ = no, O_ = gt;
var R_ = (e, t, n) => {
  const r = [];
  let i = null, o = null;
  const s = e.sort((l, u) => O_(l, u, n));
  for (const l of s)
    b_(l, t, n) ? (o = l, i || (i = l)) : (o && r.push([i, o]), o = null, i = null);
  i && r.push([i, null]);
  const a = [];
  for (const [l, u] of r)
    l === u ? a.push(l) : !u && l === s[0] ? a.push("*") : u ? l === s[0] ? a.push(`<=${u}`) : a.push(`${l} - ${u}`) : a.push(`>=${l}`);
  const c = a.join(" || "), p = typeof t.raw == "string" ? t.raw : String(t);
  return c.length < p.length ? c : t;
};
const Xl = Et(), sa = to(), { ANY: Ho } = sa, cr = no, aa = gt, $_ = (e, t, n = {}) => {
  if (e === t)
    return !0;
  e = new Xl(e, n), t = new Xl(t, n);
  let r = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const s = x_(i, o, n);
      if (r = r || s !== null, s)
        continue e;
    }
    if (r)
      return !1;
  }
  return !0;
}, L_ = [new sa(">=0.0.0-0")], Jl = [new sa(">=0.0.0")], x_ = (e, t, n) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === Ho) {
    if (t.length === 1 && t[0].semver === Ho)
      return !0;
    n.includePrerelease ? e = L_ : e = Jl;
  }
  if (t.length === 1 && t[0].semver === Ho) {
    if (n.includePrerelease)
      return !0;
    t = Jl;
  }
  const r = /* @__PURE__ */ new Set();
  let i, o;
  for (const w of e)
    w.operator === ">" || w.operator === ">=" ? i = Zl(i, w, n) : w.operator === "<" || w.operator === "<=" ? o = Kl(o, w, n) : r.add(w.semver);
  if (r.size > 1)
    return null;
  let s;
  if (i && o) {
    if (s = aa(i.semver, o.semver, n), s > 0)
      return null;
    if (s === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const w of r) {
    if (i && !cr(w, String(i), n) || o && !cr(w, String(o), n))
      return null;
    for (const m of t)
      if (!cr(w, String(m), n))
        return !1;
    return !0;
  }
  let a, c, p, l, u = o && !n.includePrerelease && o.semver.prerelease.length ? o.semver : !1, h = i && !n.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && o.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const w of t) {
    if (l = l || w.operator === ">" || w.operator === ">=", p = p || w.operator === "<" || w.operator === "<=", i) {
      if (h && w.semver.prerelease && w.semver.prerelease.length && w.semver.major === h.major && w.semver.minor === h.minor && w.semver.patch === h.patch && (h = !1), w.operator === ">" || w.operator === ">=") {
        if (a = Zl(i, w, n), a === w && a !== i)
          return !1;
      } else if (i.operator === ">=" && !cr(i.semver, String(w), n))
        return !1;
    }
    if (o) {
      if (u && w.semver.prerelease && w.semver.prerelease.length && w.semver.major === u.major && w.semver.minor === u.minor && w.semver.patch === u.patch && (u = !1), w.operator === "<" || w.operator === "<=") {
        if (c = Kl(o, w, n), c === w && c !== o)
          return !1;
      } else if (o.operator === "<=" && !cr(o.semver, String(w), n))
        return !1;
    }
    if (!w.operator && (o || i) && s !== 0)
      return !1;
  }
  return !(i && p && !o && s !== 0 || o && l && !i && s !== 0 || h || u);
}, Zl = (e, t, n) => {
  if (!e)
    return t;
  const r = aa(e.semver, t.semver, n);
  return r > 0 ? e : r < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Kl = (e, t, n) => {
  if (!e)
    return t;
  const r = aa(e.semver, t.semver, n);
  return r < 0 ? e : r > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var P_ = $_;
const Go = Hr, Ql = Ki, F_ = Ze, ec = rd, U_ = er, k_ = qy, M_ = Wy, B_ = Xy, j_ = Zy, H_ = ew, G_ = rw, q_ = sw, z_ = cw, V_ = gt, W_ = hw, Y_ = gw, X_ = ta, J_ = _w, Z_ = Aw, K_ = eo, Q_ = na, ev = id, tv = od, nv = ra, rv = ia, iv = sd, ov = Vw, sv = to(), av = Et(), lv = no, cv = Qw, uv = r_, fv = a_, dv = u_, hv = h_, pv = oa, mv = A_, gv = I_, Ev = N_, yv = R_, wv = P_;
var ld = {
  parse: U_,
  valid: k_,
  clean: M_,
  inc: B_,
  diff: j_,
  major: H_,
  minor: G_,
  patch: q_,
  prerelease: z_,
  compare: V_,
  rcompare: W_,
  compareLoose: Y_,
  compareBuild: X_,
  sort: J_,
  rsort: Z_,
  gt: K_,
  lt: Q_,
  eq: ev,
  neq: tv,
  gte: nv,
  lte: rv,
  cmp: iv,
  coerce: ov,
  Comparator: sv,
  Range: av,
  satisfies: lv,
  toComparators: cv,
  maxSatisfying: uv,
  minSatisfying: fv,
  minVersion: dv,
  validRange: hv,
  outside: pv,
  gtr: mv,
  ltr: gv,
  intersects: Ev,
  simplifyRange: yv,
  subset: wv,
  SemVer: F_,
  re: Go.re,
  src: Go.src,
  tokens: Go.t,
  SEMVER_SPEC_VERSION: Ql.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Ql.RELEASE_TYPES,
  compareIdentifiers: ec.compareIdentifiers,
  rcompareIdentifiers: ec.rcompareIdentifiers
}, Gr = {}, Fi = { exports: {} };
Fi.exports;
(function(e, t) {
  var n = 200, r = "__lodash_hash_undefined__", i = 1, o = 2, s = 9007199254740991, a = "[object Arguments]", c = "[object Array]", p = "[object AsyncFunction]", l = "[object Boolean]", u = "[object Date]", h = "[object Error]", w = "[object Function]", m = "[object GeneratorFunction]", f = "[object Map]", E = "[object Number]", _ = "[object Null]", y = "[object Object]", S = "[object Promise]", T = "[object Proxy]", R = "[object RegExp]", b = "[object Set]", j = "[object String]", B = "[object Symbol]", P = "[object Undefined]", A = "[object WeakMap]", Y = "[object ArrayBuffer]", K = "[object DataView]", te = "[object Float32Array]", F = "[object Float64Array]", O = "[object Int8Array]", M = "[object Int16Array]", $ = "[object Int32Array]", q = "[object Uint8Array]", N = "[object Uint8ClampedArray]", H = "[object Uint16Array]", W = "[object Uint32Array]", U = /[\\^$.*+?()[\]{}|]/g, Q = /^\[object .+?Constructor\]$/, re = /^(?:0|[1-9]\d*)$/, V = {};
  V[te] = V[F] = V[O] = V[M] = V[$] = V[q] = V[N] = V[H] = V[W] = !0, V[a] = V[c] = V[Y] = V[l] = V[K] = V[u] = V[h] = V[w] = V[f] = V[E] = V[y] = V[R] = V[b] = V[j] = V[A] = !1;
  var ie = typeof Ve == "object" && Ve && Ve.Object === Object && Ve, Se = typeof self == "object" && self && self.Object === Object && self, le = ie || Se || Function("return this")(), ct = t && !t.nodeType && t, It = ct && !0 && e && !e.nodeType && e, et = It && It.exports === ct, rn = et && ie.process, g = function() {
    try {
      return rn && rn.binding && rn.binding("util");
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
  var wo = Array.prototype, Xr = Function.prototype, Pt = Object.prototype, Dn = le["__core-js_shared__"], wa = Xr.toString, wt = Pt.hasOwnProperty, _a = function() {
    var v = /[^.]+$/.exec(Dn && Dn.keys && Dn.keys.IE_PROTO || "");
    return v ? "Symbol(src)_1." + v : "";
  }(), va = Pt.toString, Md = RegExp(
    "^" + wa.call(wt).replace(U, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), Sa = et ? le.Buffer : void 0, Jr = le.Symbol, Aa = le.Uint8Array, Ta = Pt.propertyIsEnumerable, Bd = wo.splice, on = Jr ? Jr.toStringTag : void 0, Ca = Object.getOwnPropertySymbols, jd = Sa ? Sa.isBuffer : void 0, Hd = De(Object.keys, Object), _o = Nn(le, "DataView"), ir = Nn(le, "Map"), vo = Nn(le, "Promise"), So = Nn(le, "Set"), Ao = Nn(le, "WeakMap"), or = Nn(Object, "create"), Gd = ln(_o), qd = ln(ir), zd = ln(vo), Vd = ln(So), Wd = ln(Ao), Ia = Jr ? Jr.prototype : void 0, To = Ia ? Ia.valueOf : void 0;
  function sn(v) {
    var I = -1, L = v == null ? 0 : v.length;
    for (this.clear(); ++I < L; ) {
      var X = v[I];
      this.set(X[0], X[1]);
    }
  }
  function Yd() {
    this.__data__ = or ? or(null) : {}, this.size = 0;
  }
  function Xd(v) {
    var I = this.has(v) && delete this.__data__[v];
    return this.size -= I ? 1 : 0, I;
  }
  function Jd(v) {
    var I = this.__data__;
    if (or) {
      var L = I[v];
      return L === r ? void 0 : L;
    }
    return wt.call(I, v) ? I[v] : void 0;
  }
  function Zd(v) {
    var I = this.__data__;
    return or ? I[v] !== void 0 : wt.call(I, v);
  }
  function Kd(v, I) {
    var L = this.__data__;
    return this.size += this.has(v) ? 0 : 1, L[v] = or && I === void 0 ? r : I, this;
  }
  sn.prototype.clear = Yd, sn.prototype.delete = Xd, sn.prototype.get = Jd, sn.prototype.has = Zd, sn.prototype.set = Kd;
  function Dt(v) {
    var I = -1, L = v == null ? 0 : v.length;
    for (this.clear(); ++I < L; ) {
      var X = v[I];
      this.set(X[0], X[1]);
    }
  }
  function Qd() {
    this.__data__ = [], this.size = 0;
  }
  function eh(v) {
    var I = this.__data__, L = Kr(I, v);
    if (L < 0)
      return !1;
    var X = I.length - 1;
    return L == X ? I.pop() : Bd.call(I, L, 1), --this.size, !0;
  }
  function th(v) {
    var I = this.__data__, L = Kr(I, v);
    return L < 0 ? void 0 : I[L][1];
  }
  function nh(v) {
    return Kr(this.__data__, v) > -1;
  }
  function rh(v, I) {
    var L = this.__data__, X = Kr(L, v);
    return X < 0 ? (++this.size, L.push([v, I])) : L[X][1] = I, this;
  }
  Dt.prototype.clear = Qd, Dt.prototype.delete = eh, Dt.prototype.get = th, Dt.prototype.has = nh, Dt.prototype.set = rh;
  function an(v) {
    var I = -1, L = v == null ? 0 : v.length;
    for (this.clear(); ++I < L; ) {
      var X = v[I];
      this.set(X[0], X[1]);
    }
  }
  function ih() {
    this.size = 0, this.__data__ = {
      hash: new sn(),
      map: new (ir || Dt)(),
      string: new sn()
    };
  }
  function oh(v) {
    var I = Qr(this, v).delete(v);
    return this.size -= I ? 1 : 0, I;
  }
  function sh(v) {
    return Qr(this, v).get(v);
  }
  function ah(v) {
    return Qr(this, v).has(v);
  }
  function lh(v, I) {
    var L = Qr(this, v), X = L.size;
    return L.set(v, I), this.size += L.size == X ? 0 : 1, this;
  }
  an.prototype.clear = ih, an.prototype.delete = oh, an.prototype.get = sh, an.prototype.has = ah, an.prototype.set = lh;
  function Zr(v) {
    var I = -1, L = v == null ? 0 : v.length;
    for (this.__data__ = new an(); ++I < L; )
      this.add(v[I]);
  }
  function ch(v) {
    return this.__data__.set(v, r), this;
  }
  function uh(v) {
    return this.__data__.has(v);
  }
  Zr.prototype.add = Zr.prototype.push = ch, Zr.prototype.has = uh;
  function Ft(v) {
    var I = this.__data__ = new Dt(v);
    this.size = I.size;
  }
  function fh() {
    this.__data__ = new Dt(), this.size = 0;
  }
  function dh(v) {
    var I = this.__data__, L = I.delete(v);
    return this.size = I.size, L;
  }
  function hh(v) {
    return this.__data__.get(v);
  }
  function ph(v) {
    return this.__data__.has(v);
  }
  function mh(v, I) {
    var L = this.__data__;
    if (L instanceof Dt) {
      var X = L.__data__;
      if (!ir || X.length < n - 1)
        return X.push([v, I]), this.size = ++L.size, this;
      L = this.__data__ = new an(X);
    }
    return L.set(v, I), this.size = L.size, this;
  }
  Ft.prototype.clear = fh, Ft.prototype.delete = dh, Ft.prototype.get = hh, Ft.prototype.has = ph, Ft.prototype.set = mh;
  function gh(v, I) {
    var L = ei(v), X = !L && Rh(v), de = !L && !X && Co(v), ee = !L && !X && !de && Pa(v), ye = L || X || de || ee, Oe = ye ? pe(v.length, String) : [], Le = Oe.length;
    for (var me in v)
      wt.call(v, me) && !(ye && // Safari 9 has enumerable `arguments.length` in strict mode.
      (me == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      de && (me == "offset" || me == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      ee && (me == "buffer" || me == "byteLength" || me == "byteOffset") || // Skip index properties.
      Ih(me, Le))) && Oe.push(me);
    return Oe;
  }
  function Kr(v, I) {
    for (var L = v.length; L--; )
      if (Ra(v[L][0], I))
        return L;
    return -1;
  }
  function Eh(v, I, L) {
    var X = I(v);
    return ei(v) ? X : C(X, L(v));
  }
  function sr(v) {
    return v == null ? v === void 0 ? P : _ : on && on in Object(v) ? Th(v) : Oh(v);
  }
  function Da(v) {
    return ar(v) && sr(v) == a;
  }
  function Na(v, I, L, X, de) {
    return v === I ? !0 : v == null || I == null || !ar(v) && !ar(I) ? v !== v && I !== I : yh(v, I, L, X, Na, de);
  }
  function yh(v, I, L, X, de, ee) {
    var ye = ei(v), Oe = ei(I), Le = ye ? c : Ut(v), me = Oe ? c : Ut(I);
    Le = Le == a ? y : Le, me = me == a ? y : me;
    var tt = Le == y, dt = me == y, Me = Le == me;
    if (Me && Co(v)) {
      if (!Co(I))
        return !1;
      ye = !0, tt = !1;
    }
    if (Me && !tt)
      return ee || (ee = new Ft()), ye || Pa(v) ? ba(v, I, L, X, de, ee) : Sh(v, I, Le, L, X, de, ee);
    if (!(L & i)) {
      var ot = tt && wt.call(v, "__wrapped__"), st = dt && wt.call(I, "__wrapped__");
      if (ot || st) {
        var kt = ot ? v.value() : v, Nt = st ? I.value() : I;
        return ee || (ee = new Ft()), de(kt, Nt, L, X, ee);
      }
    }
    return Me ? (ee || (ee = new Ft()), Ah(v, I, L, X, de, ee)) : !1;
  }
  function wh(v) {
    if (!xa(v) || Nh(v))
      return !1;
    var I = $a(v) ? Md : Q;
    return I.test(ln(v));
  }
  function _h(v) {
    return ar(v) && La(v.length) && !!V[sr(v)];
  }
  function vh(v) {
    if (!bh(v))
      return Hd(v);
    var I = [];
    for (var L in Object(v))
      wt.call(v, L) && L != "constructor" && I.push(L);
    return I;
  }
  function ba(v, I, L, X, de, ee) {
    var ye = L & i, Oe = v.length, Le = I.length;
    if (Oe != Le && !(ye && Le > Oe))
      return !1;
    var me = ee.get(v);
    if (me && ee.get(I))
      return me == I;
    var tt = -1, dt = !0, Me = L & o ? new Zr() : void 0;
    for (ee.set(v, I), ee.set(I, v); ++tt < Oe; ) {
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
        if (!se(I, function(Nt, cn) {
          if (!Ue(Me, cn) && (ot === Nt || de(ot, Nt, L, X, ee)))
            return Me.push(cn);
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
  function Sh(v, I, L, X, de, ee, ye) {
    switch (L) {
      case K:
        if (v.byteLength != I.byteLength || v.byteOffset != I.byteOffset)
          return !1;
        v = v.buffer, I = I.buffer;
      case Y:
        return !(v.byteLength != I.byteLength || !ee(new Aa(v), new Aa(I)));
      case l:
      case u:
      case E:
        return Ra(+v, +I);
      case h:
        return v.name == I.name && v.message == I.message;
      case R:
      case j:
        return v == I + "";
      case f:
        var Oe = ut;
      case b:
        var Le = X & i;
        if (Oe || (Oe = ft), v.size != I.size && !Le)
          return !1;
        var me = ye.get(v);
        if (me)
          return me == I;
        X |= o, ye.set(v, I);
        var tt = ba(Oe(v), Oe(I), X, de, ee, ye);
        return ye.delete(v), tt;
      case B:
        if (To)
          return To.call(v) == To.call(I);
    }
    return !1;
  }
  function Ah(v, I, L, X, de, ee) {
    var ye = L & i, Oe = Oa(v), Le = Oe.length, me = Oa(I), tt = me.length;
    if (Le != tt && !ye)
      return !1;
    for (var dt = Le; dt--; ) {
      var Me = Oe[dt];
      if (!(ye ? Me in I : wt.call(I, Me)))
        return !1;
    }
    var ot = ee.get(v);
    if (ot && ee.get(I))
      return ot == I;
    var st = !0;
    ee.set(v, I), ee.set(I, v);
    for (var kt = ye; ++dt < Le; ) {
      Me = Oe[dt];
      var Nt = v[Me], cn = I[Me];
      if (X)
        var Fa = ye ? X(cn, Nt, Me, I, v, ee) : X(Nt, cn, Me, v, I, ee);
      if (!(Fa === void 0 ? Nt === cn || de(Nt, cn, L, X, ee) : Fa)) {
        st = !1;
        break;
      }
      kt || (kt = Me == "constructor");
    }
    if (st && !kt) {
      var ti = v.constructor, ni = I.constructor;
      ti != ni && "constructor" in v && "constructor" in I && !(typeof ti == "function" && ti instanceof ti && typeof ni == "function" && ni instanceof ni) && (st = !1);
    }
    return ee.delete(v), ee.delete(I), st;
  }
  function Oa(v) {
    return Eh(v, xh, Ch);
  }
  function Qr(v, I) {
    var L = v.__data__;
    return Dh(I) ? L[typeof I == "string" ? "string" : "hash"] : L.map;
  }
  function Nn(v, I) {
    var L = ke(v, I);
    return wh(L) ? L : void 0;
  }
  function Th(v) {
    var I = wt.call(v, on), L = v[on];
    try {
      v[on] = void 0;
      var X = !0;
    } catch {
    }
    var de = va.call(v);
    return X && (I ? v[on] = L : delete v[on]), de;
  }
  var Ch = Ca ? function(v) {
    return v == null ? [] : (v = Object(v), D(Ca(v), function(I) {
      return Ta.call(v, I);
    }));
  } : Ph, Ut = sr;
  (_o && Ut(new _o(new ArrayBuffer(1))) != K || ir && Ut(new ir()) != f || vo && Ut(vo.resolve()) != S || So && Ut(new So()) != b || Ao && Ut(new Ao()) != A) && (Ut = function(v) {
    var I = sr(v), L = I == y ? v.constructor : void 0, X = L ? ln(L) : "";
    if (X)
      switch (X) {
        case Gd:
          return K;
        case qd:
          return f;
        case zd:
          return S;
        case Vd:
          return b;
        case Wd:
          return A;
      }
    return I;
  });
  function Ih(v, I) {
    return I = I ?? s, !!I && (typeof v == "number" || re.test(v)) && v > -1 && v % 1 == 0 && v < I;
  }
  function Dh(v) {
    var I = typeof v;
    return I == "string" || I == "number" || I == "symbol" || I == "boolean" ? v !== "__proto__" : v === null;
  }
  function Nh(v) {
    return !!_a && _a in v;
  }
  function bh(v) {
    var I = v && v.constructor, L = typeof I == "function" && I.prototype || Pt;
    return v === L;
  }
  function Oh(v) {
    return va.call(v);
  }
  function ln(v) {
    if (v != null) {
      try {
        return wa.call(v);
      } catch {
      }
      try {
        return v + "";
      } catch {
      }
    }
    return "";
  }
  function Ra(v, I) {
    return v === I || v !== v && I !== I;
  }
  var Rh = Da(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Da : function(v) {
    return ar(v) && wt.call(v, "callee") && !Ta.call(v, "callee");
  }, ei = Array.isArray;
  function $h(v) {
    return v != null && La(v.length) && !$a(v);
  }
  var Co = jd || Fh;
  function Lh(v, I) {
    return Na(v, I);
  }
  function $a(v) {
    if (!xa(v))
      return !1;
    var I = sr(v);
    return I == w || I == m || I == p || I == T;
  }
  function La(v) {
    return typeof v == "number" && v > -1 && v % 1 == 0 && v <= s;
  }
  function xa(v) {
    var I = typeof v;
    return v != null && (I == "object" || I == "function");
  }
  function ar(v) {
    return v != null && typeof v == "object";
  }
  var Pa = d ? Ae(d) : _h;
  function xh(v) {
    return $h(v) ? gh(v) : vh(v);
  }
  function Ph() {
    return [];
  }
  function Fh() {
    return !1;
  }
  e.exports = Lh;
})(Fi, Fi.exports);
var _v = Fi.exports;
Object.defineProperty(Gr, "__esModule", { value: !0 });
Gr.DownloadedUpdateHelper = void 0;
Gr.createTempUpdateFile = Cv;
const vv = Zn, Sv = xt, tc = _v, fn = tn, jn = fe;
class Av {
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
    return jn.join(this.cacheDir, "pending");
  }
  async validateDownloadedPath(t, n, r, i) {
    if (this.versionInfo != null && this.file === t && this.fileInfo != null)
      return tc(this.versionInfo, n) && tc(this.fileInfo.info, r.info) && await (0, fn.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(r, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, n, r, i, o, s) {
    this._file = t, this._packageFile = n, this.versionInfo = r, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, s && await (0, fn.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, fn.emptyDir)(this.cacheDirForPendingUpdate);
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
    if (!await (0, fn.pathExists)(r))
      return null;
    let o;
    try {
      o = await (0, fn.readJson)(r);
    } catch (l) {
      let u = "No cached update info available";
      return l.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), u += ` (error on read: ${l.message})`), n.info(u), null;
    }
    const s = o == null ? void 0 : o.fileName;
    if (!(typeof s == "string" && s.length > 0 && jn.basename(s) === s))
      return n.warn("Cached update info is corrupted: invalid fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return n.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const c = jn.join(this.cacheDirForPendingUpdate, s);
    if (!await (0, fn.pathExists)(c))
      return n.info("Cached update file doesn't exist"), null;
    const p = await Tv(c);
    return t.info.sha512 !== p ? (n.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${p}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, c);
  }
  getUpdateInfoFile() {
    return jn.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Gr.DownloadedUpdateHelper = Av;
function Tv(e, t = "sha512", n = "base64", r) {
  return new Promise((i, o) => {
    const s = (0, vv.createHash)(t);
    s.on("error", o).setEncoding(n), (0, Sv.createReadStream)(e, {
      ...r,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      s.end(), i(s.read());
    }).pipe(s, { end: !1 });
  });
}
async function Cv(e, t, n) {
  let r = 0, i = jn.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, fn.unlink)(i), i;
    } catch (s) {
      if (s.code === "ENOENT")
        return i;
      n.warn(`Error on remove temp update file: ${s}`), i = jn.join(t, `${r++}-${e}`);
    }
  return i;
}
var ro = {}, la = {};
Object.defineProperty(la, "__esModule", { value: !0 });
la.getAppCacheDir = Dv;
const qo = fe, Iv = Bi;
function Dv() {
  const e = (0, Iv.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || qo.join(e, "AppData", "Local") : process.platform === "darwin" ? t = qo.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || qo.join(e, ".cache"), t;
}
Object.defineProperty(ro, "__esModule", { value: !0 });
ro.ElectronAppAdapter = void 0;
const nc = fe, Nv = la;
class bv {
  constructor(t = _n.app) {
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
    return this.isPackaged ? nc.join(process.resourcesPath, "app-update.yml") : nc.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, Nv.getAppCacheDir)();
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
ro.ElectronAppAdapter = bv;
var cd = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.ElectronHttpExecutor = e.NET_SESSION_NAME = void 0, e.getNetSession = n;
  const t = be;
  e.NET_SESSION_NAME = "electron-updater";
  function n() {
    return _n.session.fromPartition(e.NET_SESSION_NAME, {
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
      const a = _n.net.request({
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
})(cd);
var qr = {}, yt = {};
Object.defineProperty(yt, "__esModule", { value: !0 });
yt.newBaseUrl = Ov;
yt.newUrlFromBase = Rv;
yt.getChannelFilename = $v;
const ud = en;
function Ov(e) {
  const t = new ud.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function Rv(e, t, n = !1) {
  const r = new ud.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? r.search = i : n && (r.search = `noCache=${Date.now().toString(32)}`), r;
}
function $v(e) {
  return `${e}.yml`;
}
var Ie = {}, Lv = "[object Symbol]", fd = /[\\^$.*+?()[\]{}|]/g, xv = RegExp(fd.source), Pv = typeof Ve == "object" && Ve && Ve.Object === Object && Ve, Fv = typeof self == "object" && self && self.Object === Object && self, Uv = Pv || Fv || Function("return this")(), kv = Object.prototype, Mv = kv.toString, rc = Uv.Symbol, ic = rc ? rc.prototype : void 0, oc = ic ? ic.toString : void 0;
function Bv(e) {
  if (typeof e == "string")
    return e;
  if (Hv(e))
    return oc ? oc.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function jv(e) {
  return !!e && typeof e == "object";
}
function Hv(e) {
  return typeof e == "symbol" || jv(e) && Mv.call(e) == Lv;
}
function Gv(e) {
  return e == null ? "" : Bv(e);
}
function qv(e) {
  return e = Gv(e), e && xv.test(e) ? e.replace(fd, "\\$&") : e;
}
var dd = qv;
Object.defineProperty(Ie, "__esModule", { value: !0 });
Ie.Provider = void 0;
Ie.findFile = Xv;
Ie.parseUpdateInfo = Jv;
Ie.getFileList = hd;
Ie.resolveFiles = Zv;
const Kt = be, zv = Fe, Vv = en, Ui = yt, Wv = dd;
class Yv {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  // By default, the blockmap file is in the same directory as the main file
  // But some providers may have a different blockmap file, so we need to override this method
  getBlockMapFiles(t, n, r, i = null) {
    const o = (0, Ui.newUrlFromBase)(`${t.pathname}.blockmap`, t);
    return [(0, Ui.newUrlFromBase)(`${t.pathname.replace(new RegExp(Wv(r), "g"), n)}.blockmap`, i ? new Vv.URL(i) : t), o];
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
    return this.requestHeaders == null ? n != null && (r.headers = n) : r.headers = n == null ? this.requestHeaders : { ...this.requestHeaders, ...n }, (0, Kt.configureRequestUrl)(t, r), r;
  }
}
Ie.Provider = Yv;
function Xv(e, t, n) {
  var r;
  if (e.length === 0)
    throw (0, Kt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const i = e.filter((s) => s.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`)), o = (r = i.find((s) => [s.url.pathname, s.info.url].some((a) => a.includes(process.arch)))) !== null && r !== void 0 ? r : i.shift();
  return o || (n == null ? e[0] : e.find((s) => !n.some((a) => s.url.pathname.toLowerCase().endsWith(`.${a.toLowerCase()}`))));
}
function Jv(e, t, n) {
  if (e == null)
    throw (0, Kt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let r;
  try {
    r = (0, zv.load)(e);
  } catch (i) {
    throw (0, Kt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return r;
}
function hd(e) {
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
  throw (0, Kt.newError)(`No files provided: ${(0, Kt.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function Zv(e, t, n = (r) => r) {
  const i = hd(e).map((a) => {
    if (a.sha2 == null && a.sha512 == null)
      throw (0, Kt.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, Kt.safeStringifyJson)(a)}`, "ERR_UPDATER_NO_CHECKSUM");
    return {
      url: (0, Ui.newUrlFromBase)(n(a.url), t),
      info: a
    };
  }), o = e.packages, s = o == null ? null : o[process.arch] || o.ia32;
  return s != null && (i[0].packageInfo = {
    ...s,
    path: (0, Ui.newUrlFromBase)(n(s.path), t).href
  }), i;
}
Object.defineProperty(qr, "__esModule", { value: !0 });
qr.GenericProvider = void 0;
const sc = be, zo = yt, Vo = Ie;
class Kv extends Vo.Provider {
  constructor(t, n, r) {
    super(r), this.configuration = t, this.updater = n, this.baseUrl = (0, zo.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, zo.getChannelFilename)(this.channel), n = (0, zo.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let r = 0; ; r++)
      try {
        return (0, Vo.parseUpdateInfo)(await this.httpRequest(n), t, n);
      } catch (i) {
        if (i instanceof sc.HttpError && i.statusCode === 404)
          throw (0, sc.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
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
    return (0, Vo.resolveFiles)(t, this.baseUrl);
  }
}
qr.GenericProvider = Kv;
var io = {}, oo = {};
Object.defineProperty(oo, "__esModule", { value: !0 });
oo.BitbucketProvider = void 0;
const ac = be, Wo = yt, Yo = Ie;
class Qv extends Yo.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, Wo.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new ac.CancellationToken(), n = (0, Wo.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, Wo.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, void 0, t);
      return (0, Yo.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, ac.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Yo.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: n } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${n}, channel: ${this.channel})`;
  }
}
oo.BitbucketProvider = Qv;
var Qt = {};
Object.defineProperty(Qt, "__esModule", { value: !0 });
Qt.GitHubProvider = Qt.BaseGitHubProvider = void 0;
Qt.computeReleaseNotes = md;
const Rt = be, At = ld, eS = en, Hn = yt, Cs = Ie, Xo = /\/tag\/(v?[^/]+)$/;
class pd extends Cs.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      /* because GitHib uses S3 */
      isUseMultipleRangeRequest: !1
    }), this.options = t, this.baseUrl = (0, Hn.newBaseUrl)((0, Rt.githubUrl)(t, n));
    const i = n === "github.com" ? "api.github.com" : n;
    this.baseApiUrl = (0, Hn.newBaseUrl)((0, Rt.githubUrl)(t, i));
  }
  computeGithubBasePath(t) {
    const n = this.options.host;
    return n && !["github.com", "api.github.com"].includes(n) ? `/api/v3${t}` : t;
  }
}
Qt.BaseGitHubProvider = pd;
class tS extends pd {
  constructor(t, n, r) {
    super(t, "github.com", r), this.options = t, this.updater = n;
  }
  get channel() {
    const t = this.updater.channel || this.options.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    var t, n, r, i, o;
    const s = new Rt.CancellationToken(), a = await this.httpRequest((0, Hn.newUrlFromBase)(`${this.basePath}.atom`, this.baseUrl), {
      accept: "application/xml, application/atom+xml, text/xml, */*"
    }, s), c = (0, Rt.parseXml)(a);
    let p = c.element("entry", !1, "No published versions on GitHub"), l = null;
    try {
      if (this.updater.allowPrerelease) {
        const E = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((n = At.prerelease(this.updater.currentVersion)) === null || n === void 0 ? void 0 : n[0]) || null;
        if (E === null)
          l = Xo.exec(p.element("link").attribute("href"))[1];
        else
          for (const _ of c.getElements("entry")) {
            const y = Xo.exec(_.element("link").attribute("href"));
            if (y === null)
              continue;
            const S = y[1];
            if (!At.valid(S))
              continue;
            const T = ((r = At.prerelease(S)) === null || r === void 0 ? void 0 : r[0]) || null, R = !E || ["alpha", "beta"].includes(E), b = T !== null && !["alpha", "beta"].includes(String(T));
            if (R && !b && !(E === "beta" && T === "alpha")) {
              l = S, p = _;
              break;
            }
            if (T && T === E) {
              l = S, p = _;
              break;
            }
          }
      } else {
        l = await this.getLatestTagName(s);
        for (const E of c.getElements("entry")) {
          const _ = Xo.exec(E.element("link").attribute("href"));
          if (_ != null && _[1] === l) {
            p = E;
            break;
          }
        }
      }
    } catch (E) {
      throw (0, Rt.newError)(`Cannot parse releases feed: ${E.stack || E.message},
XML:
${a}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (l == null)
      throw (0, Rt.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let u, h = "", w = "";
    const m = async (E) => {
      h = (0, Hn.getChannelFilename)(E), w = (0, Hn.newUrlFromBase)(this.getBaseDownloadPath(String(l), h), this.baseUrl);
      const _ = this.createRequestOptions(w);
      try {
        return await this.executor.request(_, s);
      } catch (y) {
        throw y instanceof Rt.HttpError && y.statusCode === 404 ? (0, Rt.newError)(`Cannot find ${h} in the latest release artifacts (${w}): ${y.stack || y.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : y;
      }
    };
    try {
      let E = this.channel;
      this.updater.allowPrerelease && (!((i = At.prerelease(l)) === null || i === void 0) && i[0]) && (E = this.getCustomChannelName(String((o = At.prerelease(l)) === null || o === void 0 ? void 0 : o[0]))), u = await m(E);
    } catch (E) {
      if (this.updater.allowPrerelease)
        u = await m(this.getDefaultChannelName());
      else
        throw E;
    }
    const f = (0, Cs.parseUpdateInfo)(u, h, w);
    return f.releaseName == null && (f.releaseName = p.elementValueOrEmpty("title")), f.releaseNotes == null && (f.releaseNotes = md(this.updater.currentVersion, this.updater.fullChangelog, c, p)), {
      tag: l,
      ...f
    };
  }
  async getLatestTagName(t) {
    const n = this.options, r = n.host == null || n.host === "github.com" ? (0, Hn.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new eS.URL(`${this.computeGithubBasePath(`/repos/${n.owner}/${n.repo}/releases`)}/latest`, this.baseApiUrl);
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
    return (0, Cs.resolveFiles)(t, this.baseUrl, (n) => this.getBaseDownloadPath(t.tag, n.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, n) {
    return `${this.basePath}/download/${t}/${n}`;
  }
}
Qt.GitHubProvider = tS;
function lc(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function md(e, t, n, r) {
  if (!t)
    return lc(r);
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
      note: lc(a)
    });
  }
  return s.sort((a, c) => At.rcompare(a.version, c.version));
}
var so = {};
Object.defineProperty(so, "__esModule", { value: !0 });
so.GitLabProvider = void 0;
const xe = be, Jo = en, nS = dd, mi = yt, Zo = Ie;
class rS extends Zo.Provider {
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
    this.baseApiUrl = (0, mi.newBaseUrl)(`https://${o}/api/v4`);
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
    const t = new xe.CancellationToken(), n = (0, mi.newUrlFromBase)(`projects/${this.options.projectId}/releases/permalink/latest`, this.baseApiUrl), r = { Accept: "application/json", ...this.setAuthHeaderForToken(this.options.token || null) };
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
      c = (0, mi.getChannelFilename)(w);
      const m = o.assets.links.find((_) => _.name === c);
      if (!m)
        throw (0, xe.newError)(`Cannot find ${c} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      p = new Jo.URL(m.direct_asset_url);
      const f = this.setAuthHeaderForToken(this.options.token || null), E = Object.keys(f).length ? f : void 0;
      try {
        const _ = await this.httpRequest(p, E, t);
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
    const u = (0, Zo.parseUpdateInfo)(a, c, p);
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
        return new Jo.URL(o);
    }
    return null;
  }
  async fetchReleaseInfoByVersion(t) {
    const n = new xe.CancellationToken(), r = [`v${t}`, t];
    for (const i of r) {
      const o = (0, mi.newUrlFromBase)(`projects/${this.options.projectId}/releases/${encodeURIComponent(i)}`, this.baseApiUrl);
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
      const c = r.replace(new RegExp(nS(n), "g"), t);
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
    return (0, Zo.getFileList)(t).map((n) => {
      const i = [
        n.url,
        // Original filename
        this.normalizeFilename(n.url)
        // Normalized filename (spaces/underscores → dashes)
      ].find((s) => t.assets.has(s)), o = i ? t.assets.get(i) : void 0;
      if (!o)
        throw (0, xe.newError)(`Cannot find asset "${n.url}" in GitLab release assets. Available assets: ${Array.from(t.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Jo.URL(o),
        info: n
      };
    });
  }
  toString() {
    return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
  }
}
so.GitLabProvider = rS;
var ao = {};
Object.defineProperty(ao, "__esModule", { value: !0 });
ao.KeygenProvider = void 0;
const cc = be, Ko = yt, Qo = Ie;
class iS extends Qo.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, Ko.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new cc.CancellationToken(), n = (0, Ko.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, Ko.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, Qo.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, cc.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Qo.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: n, platform: r } = this.configuration;
    return `Keygen (account: ${t}, product: ${n}, platform: ${r}, channel: ${this.channel})`;
  }
}
ao.KeygenProvider = iS;
var lo = {};
Object.defineProperty(lo, "__esModule", { value: !0 });
lo.PrivateGitHubProvider = void 0;
const On = be, oS = Fe, sS = fe, uc = en, fc = yt, aS = Qt, lS = Ie;
class cS extends aS.BaseGitHubProvider {
  constructor(t, n, r, i) {
    super(t, "api.github.com", i), this.updater = n, this.token = r;
  }
  createRequestOptions(t, n) {
    const r = super.createRequestOptions(t, n);
    return r.redirect = "manual", r;
  }
  async getLatestVersion() {
    const t = new On.CancellationToken(), n = (0, fc.getChannelFilename)(this.getDefaultChannelName()), r = await this.getLatestVersionInfo(t), i = r.assets.find((a) => a.name === n);
    if (i == null)
      throw (0, On.newError)(`Cannot find ${n} in the release ${r.html_url || r.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new uc.URL(i.url);
    let s;
    try {
      s = (0, oS.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
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
    const i = (0, fc.newUrlFromBase)(r, this.baseUrl);
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
    return (0, lS.getFileList)(t).map((n) => {
      const r = sS.posix.basename(n.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === r);
      if (i == null)
        throw (0, On.newError)(`Cannot find asset "${r}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new uc.URL(i.url),
        info: n
      };
    });
  }
}
lo.PrivateGitHubProvider = cS;
Object.defineProperty(io, "__esModule", { value: !0 });
io.isUrlProbablySupportMultiRangeRequests = gd;
io.createClient = mS;
const gi = be, uS = oo, dc = qr, fS = Qt, dS = so, hS = ao, pS = lo;
function gd(e) {
  return !e.includes("s3.amazonaws.com");
}
function mS(e, t, n) {
  if (typeof e == "string")
    throw (0, gi.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const r = e.provider;
  switch (r) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new fS.GitHubProvider(i, t, n) : new pS.PrivateGitHubProvider(i, t, o, n);
    }
    case "bitbucket":
      return new uS.BitbucketProvider(e, t, n);
    case "gitlab":
      return new dS.GitLabProvider(e, t, n);
    case "keygen":
      return new hS.KeygenProvider(e, t, n);
    case "s3":
    case "spaces":
      return new dc.GenericProvider({
        provider: "generic",
        url: (0, gi.getS3LikeProviderBaseUrl)(e),
        channel: e.channel || null
      }, t, {
        ...n,
        // https://github.com/minio/minio/issues/5285#issuecomment-350428955
        isUseMultipleRangeRequest: !1
      });
    case "generic": {
      const i = e;
      return new dc.GenericProvider(i, t, {
        ...n,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && gd(i.url)
      });
    }
    case "custom": {
      const i = e, o = i.updateProvider;
      if (!o)
        throw (0, gi.newError)("Custom provider not specified", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
      return new o(i, t, n);
    }
    default:
      throw (0, gi.newError)(`Unsupported provider: ${r}`, "ERR_UPDATER_UNSUPPORTED_PROVIDER");
  }
}
var co = {}, zr = {}, tr = {}, In = {};
Object.defineProperty(In, "__esModule", { value: !0 });
In.OperationKind = void 0;
In.computeOperations = gS;
var gn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(gn || (In.OperationKind = gn = {}));
function gS(e, t, n) {
  const r = pc(e.files), i = pc(t.files);
  let o = null;
  const s = t.files[0], a = [], c = s.name, p = r.get(c);
  if (p == null)
    throw new Error(`no file ${c} in old blockmap`);
  const l = i.get(c);
  let u = 0;
  const { checksumToOffset: h, checksumToOldSize: w } = yS(r.get(c), p.offset, n);
  let m = s.offset;
  for (let f = 0; f < l.checksums.length; m += l.sizes[f], f++) {
    const E = l.sizes[f], _ = l.checksums[f];
    let y = h.get(_);
    y != null && w.get(_) !== E && (n.warn(`Checksum ("${_}") matches, but size differs (old: ${w.get(_)}, new: ${E})`), y = void 0), y === void 0 ? (u++, o != null && o.kind === gn.DOWNLOAD && o.end === m ? o.end += E : (o = {
      kind: gn.DOWNLOAD,
      start: m,
      end: m + E
      // oldBlocks: null,
    }, hc(o, a, _, f))) : o != null && o.kind === gn.COPY && o.end === y ? o.end += E : (o = {
      kind: gn.COPY,
      start: y,
      end: y + E
      // oldBlocks: [checksum]
    }, hc(o, a, _, f));
  }
  return u > 0 && n.info(`File${s.name === "file" ? "" : " " + s.name} has ${u} changed blocks`), a;
}
const ES = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function hc(e, t, n, r) {
  if (ES && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((s, a) => s < a ? s : a);
      throw new Error(`operation (block index: ${r}, checksum: ${n}, kind: ${gn[e.kind]}) overlaps previous operation (checksum: ${n}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function yS(e, t, n) {
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
function pc(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.set(n.name, n);
  return t;
}
Object.defineProperty(tr, "__esModule", { value: !0 });
tr.DataSplitter = void 0;
tr.copyData = Ed;
const Ei = be, wS = xt, _S = Pr, vS = In, Is = Buffer.from(`\r
\r
`), mc = Buffer.from(`

`), SS = Is.length - 1, AS = 4, TS = 3;
function CS(e) {
  const t = e.indexOf(Is), n = e.indexOf(mc);
  return n !== -1 && (t === -1 || n < t) ? { end: n + mc.length, lineFeedOnly: !0 } : t !== -1 ? { end: t + Is.length, lineFeedOnly: !1 } : null;
}
var Ht;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(Ht || (Ht = {}));
function Ed(e, t, n, r, i) {
  const o = (0, wS.createReadStream)("", {
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
class IS extends _S.Writable {
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
      throw (0, Ei.newError)("Internal error", "ERR_DATA_SPLITTER_BYTE_COUNT_MISMATCH");
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
              throw (0, Ei.newError)("taskIndex is null", "ERR_DATA_SPLITTER_TASK_INDEX_IS_NULL");
          const a = this.partIndex === 0 ? this.options.start : this.partIndexToTaskIndex.get(this.partIndex - 1) + 1;
          if (a < s)
            await this.copyExistingData(a, s);
          else if (a > s)
            throw (0, Ei.newError)("prevTaskIndex must be < taskIndex", "ERR_DATA_SPLITTER_TASK_INDEX_ASSERT_FAILED");
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
        if (s.kind !== vS.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        Ed(s, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, n) {
    const r = this.headerListTail, i = r == null ? 0 : r.length, o = r == null ? t.subarray(n) : Buffer.concat([r, t.subarray(n)]), s = CS(o);
    return s != null ? (this.headerListTail = null, this.boundaryLength = this.boundaryTextLength + (s.lineFeedOnly ? TS : AS), n + s.end - i) : (this.headerListTail = Buffer.from(o.subarray(Math.max(0, o.length - SS))), -1);
  }
  onPartEnd() {
    const t = this.partIndexToLength[this.partIndex - 1];
    if (this.actualPartLength !== t)
      throw (0, Ei.newError)(`Expected length: ${t} differs from actual: ${this.actualPartLength}`, "ERR_DATA_SPLITTER_LENGTH_MISMATCH");
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
tr.DataSplitter = IS;
var uo = {};
Object.defineProperty(uo, "__esModule", { value: !0 });
uo.executeTasksUsingMultipleRangeRequests = DS;
uo.checkIsRangesSupported = Ns;
const Ds = be, gc = tr, Ec = In;
function DS(e, t, n, r, i) {
  const o = (s) => {
    if (s >= t.length) {
      e.fileMetadataBuffer != null && n.write(e.fileMetadataBuffer), n.end();
      return;
    }
    const a = s + 1e3;
    NS(e, {
      tasks: t,
      start: s,
      end: Math.min(t.length, a),
      oldFileFd: r
    }, n, () => o(a), i);
  };
  return o;
}
function NS(e, t, n, r, i) {
  let o = "bytes=", s = 0, a = 0;
  const c = /* @__PURE__ */ new Map(), p = [];
  for (let h = t.start; h < t.end; h++) {
    const w = t.tasks[h];
    w.kind === Ec.OperationKind.DOWNLOAD && (o += `${w.start}-${w.end - 1}, `, c.set(s, h), s++, p.push(w.end - w.start), a += w.end - w.start);
  }
  if (s <= 1) {
    const h = (w) => {
      if (w >= t.end) {
        r();
        return;
      }
      const m = t.tasks[w++];
      if (m.kind === Ec.OperationKind.COPY)
        (0, gc.copyData)(m, n, t.oldFileFd, i, () => h(w));
      else {
        const f = e.createRequestOptions();
        f.headers.Range = `bytes=${m.start}-${m.end - 1}`;
        const E = e.httpExecutor.createRequest(f, (_) => {
          _.on("error", i), Ns(_, i) && (_.pipe(n, {
            end: !1
          }), _.once("end", () => h(w)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(E, i), E.end();
      }
    };
    h(t.start);
    return;
  }
  const l = e.createRequestOptions();
  l.headers.Range = o.substring(0, o.length - 2);
  const u = e.httpExecutor.createRequest(l, (h) => {
    if (!Ns(h, i))
      return;
    const w = (0, Ds.safeGetHeader)(h, "content-type"), m = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(w);
    if (m == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${w}"`));
      return;
    }
    let f = !1, E = null;
    const _ = () => {
      f = !0, E != null && (clearTimeout(E), E = null), r();
    }, y = new gc.DataSplitter(n, t, c, m[1] || m[2], p, _, a, e.options.onProgress);
    y.on("error", i), h.pipe(y), h.on("end", () => {
      f || (E = setTimeout(() => {
        E = null, !f && (u.abort(), i(new Error("Response ends without calling any handlers")));
      }, 1e4));
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(u, i), u.end();
}
function Ns(e, t) {
  if (e.statusCode >= 400)
    return t((0, Ds.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const n = (0, Ds.safeGetHeader)(e, "accept-ranges");
    if (n == null || n === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var fo = {};
Object.defineProperty(fo, "__esModule", { value: !0 });
fo.ProgressDifferentialDownloadCallbackTransform = void 0;
const bS = Pr;
var Gn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Gn || (Gn = {}));
class OS extends bS.Transform {
  constructor(t, n, r) {
    super(), this.progressDifferentialDownloadInfo = t, this.cancellationToken = n, this.onProgress = r, this.start = Date.now(), this.transferred = 0, this.delta = 0, this.expectedBytes = 0, this.index = 0, this.operationType = Gn.COPY, this.nextUpdate = this.start + 1e3;
  }
  _transform(t, n, r) {
    if (this.cancellationToken.cancelled) {
      r(new Error("cancelled"), null);
      return;
    }
    if (this.operationType == Gn.COPY) {
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
    this.operationType = Gn.COPY;
  }
  beginRangeDownload() {
    this.operationType = Gn.DOWNLOAD, this.expectedBytes += this.progressDifferentialDownloadInfo.expectedByteCounts[this.index++];
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
fo.ProgressDifferentialDownloadCallbackTransform = OS;
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.DifferentialDownloader = void 0;
const ur = be, es = tn, RS = xt, $S = tr, LS = en, yi = In, yc = uo, xS = fo;
class PS {
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
    return (0, ur.configureRequestUrl)(this.options.newUrl, t), (0, ur.configureRequestOptions)(t), t;
  }
  doDownload(t, n) {
    if (t.version !== n.version)
      throw new Error(`version is different (${t.version} - ${n.version}), full download is required`);
    const r = this.logger, i = (0, yi.computeOperations)(t, n, r);
    r.debug != null && r.debug(JSON.stringify(i, null, 2));
    let o = 0, s = 0;
    for (const c of i) {
      const p = c.end - c.start;
      c.kind === yi.OperationKind.DOWNLOAD ? o += p : s += p;
    }
    const a = this.blockAwareFileInfo.size;
    if (o + s + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== a)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${s}, newSize: ${a}`);
    return r.info(`Full: ${wc(a)}, To download: ${wc(o)} (${Math.round(o / (a / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const n = [], r = () => Promise.all(n.map((i) => (0, es.close)(i.descriptor).catch((o) => {
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
    const r = await (0, es.open)(this.options.oldFile, "r");
    n.push({ descriptor: r, path: this.options.oldFile });
    const i = await (0, es.open)(this.options.newFile, "w");
    n.push({ descriptor: i, path: this.options.newFile });
    const o = (0, RS.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((s, a) => {
      const c = [];
      let p;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const _ = [];
        let y = 0;
        for (const T of t)
          T.kind === yi.OperationKind.DOWNLOAD && (_.push(T.end - T.start), y += T.end - T.start);
        const S = {
          expectedByteCounts: _,
          grandTotal: y
        };
        p = new xS.ProgressDifferentialDownloadCallbackTransform(S, this.options.cancellationToken, this.options.onProgress), c.push(p);
      }
      const l = new ur.DigestTransform(this.blockAwareFileInfo.sha512);
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
        w = (0, yc.executeTasksUsingMultipleRangeRequests)(this, t, h, r, a), w(0);
        return;
      }
      let m = 0, f = null;
      this.logger.info(`Differential download: ${this.options.newUrl}`);
      const E = this.createRequestOptions();
      E.redirect = "manual", w = (_) => {
        var y, S;
        if (_ >= t.length) {
          this.fileMetadataBuffer != null && h.write(this.fileMetadataBuffer), h.end();
          return;
        }
        const T = t[_++];
        if (T.kind === yi.OperationKind.COPY) {
          p && p.beginFileCopy(), (0, $S.copyData)(T, h, r, a, () => w(_));
          return;
        }
        const R = `bytes=${T.start}-${T.end - 1}`;
        E.headers.range = R, (S = (y = this.logger) === null || y === void 0 ? void 0 : y.debug) === null || S === void 0 || S.call(y, `download range: ${R}`), p && p.beginRangeDownload();
        const b = this.httpExecutor.createRequest(E, (j) => {
          j.on("error", a), j.on("aborted", () => {
            a(new Error("response has been aborted by the server"));
          }), j.statusCode >= 400 && a((0, ur.createHttpError)(j)), j.pipe(h, {
            end: !1
          }), j.once("end", () => {
            p && p.endRangeDownload(), ++m === 100 ? (m = 0, setTimeout(() => w(_), 1e3)) : w(_);
          });
        });
        b.on("redirect", (j, B, P) => {
          this.logger.info(`Redirect to ${FS(P)}`), f = P, (0, ur.configureRequestUrl)(new LS.URL(f), E), b.followRedirect();
        }), this.httpExecutor.addErrorAndTimeoutHandlers(b, a), b.end();
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
        (0, yc.checkIsRangesSupported)(s, i) && (s.on("error", i), s.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), s.on("data", n), s.on("end", () => r()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
zr.DifferentialDownloader = PS;
function wc(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function FS(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(co, "__esModule", { value: !0 });
co.GenericDifferentialDownloader = void 0;
const US = zr;
class kS extends US.DifferentialDownloader {
  download(t, n) {
    return this.doDownload(t, n);
  }
}
co.GenericDifferentialDownloader = kS;
var nn = {};
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.UpdaterSignal = e.UPDATE_DOWNLOADED = e.DOWNLOAD_PROGRESS = e.CancellationToken = void 0, e.addHandler = r;
  const t = be;
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
})(nn);
Object.defineProperty(Jt, "__esModule", { value: !0 });
Jt.NoOpLogger = Jt.AppUpdater = void 0;
const ze = be, MS = Zn, BS = Bi, jS = eu, nt = tn, HS = Fe, ts = Zi, at = fe, dn = ld, _c = Gr, GS = ro, vc = cd, qS = qr, ns = io, rs = ji, zS = co, Rn = nn;
class ca extends jS.EventEmitter {
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
    return (0, vc.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new yd();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new ts.Lazy(() => this.loadUpdateConfig());
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
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new Rn.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (o) => this.checkIfUpdateSupported(o), this._isUserWithinRollout = (o) => this.isStagingMatch(o), this.clientPromise = null, this.stagingUserIdPromise = new ts.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new ts.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (o) => {
      this._logger.error(`Error: ${o.stack || o.message}`);
    }), n == null ? (this.app = new GS.ElectronAppAdapter(), this.httpExecutor = new vc.ElectronHttpExecutor((o, s) => this.emit("login", o, s))) : (this.app = n, this.httpExecutor = null);
    const r = this.app.version, i = (0, dn.parse)(r);
    if (i == null)
      throw (0, ze.newError)(`App version is not a valid semver version: "${r}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = VS(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
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
    typeof t == "string" ? r = new qS.GenericProvider({ provider: "generic", url: t }, this, {
      ...n,
      isUseMultipleRangeRequest: (0, ns.isUrlProbablySupportMultiRangeRequests)(t)
    }) : r = (0, ns.createClient)(t, this, n), this.clientPromise = Promise.resolve(r);
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
      const r = ca.formatDownloadNotification(n.updateInfo.version, this.app.name, t);
      new _n.Notification(r).show();
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
    const n = (0, dn.parse)(t.version);
    if (n == null)
      throw (0, ze.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const r = this.currentVersion;
    if ((0, dn.eq)(n, r) || !await Promise.resolve(this.isUpdateSupported(t)) || !await Promise.resolve(this.isUserWithinRollout(t)))
      return !1;
    const o = (0, dn.gt)(n, r), s = (0, dn.lt)(n, r);
    return o ? !0 : this.allowDowngrade && s;
  }
  checkIfUpdateSupported(t) {
    const n = t == null ? void 0 : t.minimumSystemVersion, r = (0, BS.release)();
    if (n)
      try {
        if ((0, dn.lt)(r, n))
          return this._logger.info(`Current OS version ${r} is less than the minimum OS version required ${n} for version ${r}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${r}) with minimum OS version(${n}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((r) => (0, ns.createClient)(r, this, this.createProviderRuntimeOptions())));
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
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise.then(Sc);
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
    }), this.downloadPromise.then(Sc);
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(Rn.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, HS.load)(await (0, nt.readFile)(this._appUpdateConfigPath, "utf-8"));
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
    const n = ze.UUID.v5((0, MS.randomBytes)(4096), ze.UUID.OID);
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
      r.debug != null && r.debug(`updater cache dir: ${i}`), t = new _c.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
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
    this.listenerCount(Rn.DOWNLOAD_PROGRESS) > 0 && (r.onProgress = (T) => this.emit(Rn.DOWNLOAD_PROGRESS, T));
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
    }), await (0, nt.pathExists)(w) ? await (0, nt.copyFile)(w, m) : t.downloadUpdateOptions.disableDifferentialDownload || await (0, nt.remove)(m), h == null ? { updateFile: u } : { updateFile: u, packageFile: h }), E = this._logger, _ = await c.validateDownloadedPath(u, i, n, E);
    if (_ != null)
      return u = _, await f(!1);
    const y = async () => (await c.clear().catch(() => {
    }), await (0, nt.unlink)(u).catch(() => {
    }));
    await (0, nt.remove)(w);
    const S = await (0, _c.createTempUpdateFile)(`temp-${l}`, p, E);
    try {
      await t.task(S, r, h, y), await (0, ze.retry)(() => (0, nt.rename)(S, u), {
        retries: 60,
        interval: 500,
        shouldRetry: (T) => T instanceof Error && /^EBUSY:/.test(T.message) ? !0 : (E.warn(`Cannot rename temp file to final file: ${T.message || T.stack}`), !1)
      });
    } catch (T) {
      throw await y(), T instanceof ze.CancellationError ? (E.info("cancelled"), this.emit("update-cancelled", i)) : T.code === "ERR_CHECKSUM_MISMATCH" && E.warn(`sha512 checksum mismatch after full download of ${l}: the downloaded file is corrupted or the published update metadata does not match the uploaded file`), T;
    }
    return E.info(`New version ${o} has been downloaded to ${u}`), await f(!0);
  }
  async differentialDownloadInstaller(t, n, r, i, o) {
    let s = !1;
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const a = n.updateInfoAndProvider.provider, c = await a.getBlockMapFiles(t.url, this.app.version, n.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
      this._logger.info(`Download block maps (old: "${c[0]}", new: ${c[1]})`);
      const p = async (f) => {
        const E = await this.httpExecutor.downloadToBuffer(f, {
          headers: n.requestHeaders,
          cancellationToken: n.cancellationToken
        });
        if (E == null || E.length === 0)
          throw new Error(`Blockmap "${f.href}" is empty`);
        try {
          return JSON.parse((0, rs.gunzipSync)(E).toString());
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
      this.listenerCount(Rn.DOWNLOAD_PROGRESS) > 0 && (l.onProgress = (f) => this.emit(Rn.DOWNLOAD_PROGRESS, f));
      const u = async (f, E) => {
        const _ = at.join(E, "current.blockmap");
        await (0, nt.outputFile)(_, (0, rs.gzipSync)(JSON.stringify(f)));
      }, h = async (f) => {
        const E = at.join(f, "current.blockmap");
        try {
          if (await (0, nt.pathExists)(E))
            return JSON.parse((0, rs.gunzipSync)(await (0, nt.readFile)(E)).toString());
        } catch (_) {
          this._logger.warn(`Cannot parse blockmap "${E}", error: ${_}`);
        }
        return null;
      }, w = await p(c[1]);
      await u(w, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
      let m = await h(this.downloadedUpdateHelper.cacheDir);
      return s = m != null, m == null && (this._logger.info(`No cached blockmap for the old installer, downloading it from "${c[0]}"`), m = await p(c[0])), await new zS.GenericDifferentialDownloader(t.info, this.httpExecutor, l).download(m, w), !1;
    } catch (a) {
      if (a.code === "ERR_CHECKSUM_MISMATCH" && this._logger.warn(`sha512 checksum mismatch after differential download (old blockmap ${s ? "was read from the local cache" : "was downloaded from the server"}): cached "${o}" is likely out of sync with the old blockmap, e.g. because one of them was replaced or evicted independently of the other`), this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), this._testOnlyOptions != null)
        throw a;
      return !0;
    }
  }
}
Jt.AppUpdater = ca;
function VS(e) {
  const t = (0, dn.prerelease)(e);
  return t != null && t.length > 0;
}
class yd {
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
Jt.NoOpLogger = yd;
function Sc({ updateFile: e, packageFile: t }) {
  return t == null ? [e] : [e, t];
}
Object.defineProperty(Tn, "__esModule", { value: !0 });
Tn.BaseUpdater = void 0;
const Ac = Mi, is = fe, WS = Jt;
class YS extends WS.AppUpdater {
  constructor(t, n) {
    super(t, n), this.quitAndInstallCalled = !1, this.quitHandlerAdded = !1;
  }
  quitAndInstall(t = !1, n = !1) {
    this._logger.info("Install on explicit quitAndInstall"), this.install(t, t ? n : this.autoRunAppAfterInstall) ? setImmediate(() => {
      _n.autoUpdater.emit("before-quit-for-update"), this.app.quit();
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
    return t.split(is.delimiter).filter((n) => is.isAbsolute(n)).join(is.delimiter);
  }
  spawnSyncLog(t, n = [], r = {}) {
    var i;
    this._logger.info(`Executing: ${t} with args: ${n}`);
    const o = { ...process.env, ...r }, s = (0, Ac.spawnSync)(t, n, {
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
        const a = { stdio: i, env: r, detached: !0 }, c = (0, Ac.spawn)(t, n, a);
        c.on("error", (p) => {
          s(p);
        }), c.unref(), c.pid !== void 0 && o(!0);
      } catch (a) {
        s(a);
      }
    });
  }
}
Tn.BaseUpdater = YS;
var Nr = {}, Vr = {};
Object.defineProperty(Vr, "__esModule", { value: !0 });
Vr.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const $n = tn, XS = zr, JS = ji;
class ZS extends XS.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, n = t.size, r = n - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(r, n - 1);
    const i = wd(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await KS(this.options.oldFile), i);
  }
}
Vr.FileWithEmbeddedBlockMapDifferentialDownloader = ZS;
function wd(e) {
  return JSON.parse((0, JS.inflateRawSync)(e).toString());
}
async function KS(e) {
  const t = await (0, $n.open)(e, "r");
  try {
    const n = (await (0, $n.fstat)(t)).size, r = Buffer.allocUnsafe(4);
    await (0, $n.read)(t, r, 0, r.length, n - r.length);
    const i = Buffer.allocUnsafe(r.readUInt32BE(0));
    return await (0, $n.read)(t, i, 0, i.length, n - r.length - i.length), await (0, $n.close)(t), wd(i);
  } catch (n) {
    throw await (0, $n.close)(t), n;
  }
}
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.AppImageUpdater = void 0;
const os = be, Tc = Mi, QS = tn, e1 = xt, Ln = fe, t1 = Tn, n1 = Vr, r1 = Ie, Cc = nn;
class i1 extends t1.BaseUpdater {
  constructor(t, n) {
    super(t, n);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, r1.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        const s = process.env.APPIMAGE;
        if (s == null)
          throw (0, os.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(r, s, i, n, t)) && await this.httpExecutor.download(r.url, i, o), await (0, QS.chmod)(i, 493);
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
      return this.listenerCount(Cc.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(Cc.DOWNLOAD_PROGRESS, a)), await new n1.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, s).download(), !1;
    } catch (s) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const n = process.env.APPIMAGE;
    if (n == null)
      throw (0, os.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    if (!Ln.isAbsolute(n) || n.includes("\0"))
      throw (0, os.newError)(`APPIMAGE env is not a valid absolute path: "${n}"`, "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, e1.unlinkSync)(n);
    let r;
    const i = Ln.basename(n), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    Ln.basename(o) === i || !/\d+\.\d+\.\d+/.test(i) ? r = n : r = Ln.join(Ln.dirname(n), Ln.basename(o)), (0, Tc.execFileSync)("mv", ["-f", o, r]), r !== n && this.emit("appimage-filename-updated", r);
    const s = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(r, [], s) : (s.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, Tc.execFileSync)(r, [], { env: s })), !0;
  }
}
Nr.AppImageUpdater = i1;
var br = {}, nr = {};
Object.defineProperty(nr, "__esModule", { value: !0 });
nr.LinuxUpdater = void 0;
const o1 = Tn, s1 = /^[a-zA-Z0-9_-]+$/;
class a1 extends o1.BaseUpdater {
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
    i && (s1.test(i) ? r = [i] : this._logger.warn(`ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER "${i}" contains unsafe characters. Ignoring override.`));
    for (const a of r)
      if (this.hasCommand(a))
        return a;
    const o = i ? `ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER override "${i}", ` : "", s = t[0];
    return this._logger.warn(`No package manager found in the list: ${o}${t.join(", ")}. Utilizing default: ${s}`), s;
  }
}
nr.LinuxUpdater = a1;
Object.defineProperty(br, "__esModule", { value: !0 });
br.DebUpdater = void 0;
const l1 = Ie, Ic = nn, c1 = nr;
class ua extends c1.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, l1.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
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
    if (!this.hasCommand("dpkg") && !this.hasCommand("apt"))
      return this.dispatchError(new Error("Neither dpkg nor apt command found. Cannot install .deb package.")), !1;
    const r = ["dpkg", "apt"], i = this.detectPackageManager(r);
    try {
      ua.installWithCommandRunner(i, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
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
br.DebUpdater = ua;
var Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.PacmanUpdater = void 0;
const Dc = nn, u1 = Ie, f1 = nr;
class fa extends f1.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, u1.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
    return this.executeDownload({
      fileExtension: "pacman",
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
    try {
      fa.installWithCommandRunner(n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
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
Or.PacmanUpdater = fa;
var Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.RpmUpdater = void 0;
const Nc = nn, d1 = Ie, h1 = nr;
class da extends h1.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, d1.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Nc.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(Nc.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(r.url, i, o);
      }
    });
  }
  doInstall(t) {
    const n = this.installerPath;
    if (n == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    const r = ["zypper", "dnf", "yum", "rpm"], i = this.detectPackageManager(r);
    try {
      da.installWithCommandRunner(i, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
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
Rr.RpmUpdater = da;
var $r = {};
Object.defineProperty($r, "__esModule", { value: !0 });
$r.MacUpdater = void 0;
const bc = be, ss = tn, p1 = xt, Oc = fe, m1 = Mh, g1 = Jt, E1 = Ie, Rc = Mi, $c = Zn;
class ha extends g1.AppUpdater {
  constructor(t, n) {
    super(t, n), this.nativeUpdater = _n.autoUpdater, this.squirrelDownloadedUpdate = !1, this.nativeUpdater.on("error", (r) => {
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
      this.debug("Checking for macOS Rosetta environment"), o = (0, Rc.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), r.info(`Checked for macOS Rosetta environment (isRosetta=${o})`);
    } catch (l) {
      r.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${l}`);
    }
    let s = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const u = (0, Rc.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      r.info(`Checked 'uname -a': arm64=${u}`), s = s || u;
    } catch (l) {
      r.warn(`uname shell command to check for arm64 failed: ${l}`);
    }
    s = s || process.arch === "arm64" || o, n = ha.filterFilesForArch(n, s);
    const a = (0, E1.findFile)(n, "zip", ["pkg", "dmg"]);
    if (a == null)
      throw (0, bc.newError)(`ZIP file not provided: ${(0, bc.safeStringifyJson)(n)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const c = t.updateInfoAndProvider.provider, p = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: a,
      downloadUpdateOptions: t,
      task: async (l, u) => {
        const h = Oc.join(this.downloadedUpdateHelper.cacheDir, p), w = () => (0, ss.pathExistsSync)(h) ? !t.disableDifferentialDownload : (r.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let m = !0;
        w() && (m = await this.differentialDownloadInstaller(a, t, l, c, p)), m && await this.httpExecutor.download(a.url, l, u);
      },
      done: async (l) => {
        if (!t.disableDifferentialDownload)
          try {
            const u = Oc.join(this.downloadedUpdateHelper.cacheDir, p);
            await (0, ss.copyFile)(l.downloadedFile, u);
          } catch (u) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${u.message}`);
          }
        return this.updateDownloaded(a, l);
      }
    });
  }
  async updateDownloaded(t, n) {
    var r;
    const i = n.downloadedFile, o = (r = t.info.size) !== null && r !== void 0 ? r : (await (0, ss.stat)(i)).size, s = this._logger, a = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${a})`), this.server = (0, m1.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${a})`), this.server.on("close", () => {
      s.info(`Proxy server for native Squirrel.Mac is closed (${a})`);
    });
    const c = (p) => {
      const l = p.address();
      return typeof l == "string" ? l : `http://127.0.0.1:${l == null ? void 0 : l.port}`;
    };
    return await new Promise((p, l) => {
      const u = (0, $c.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), h = Buffer.from(`autoupdater:${u}`, "ascii"), w = `/${(0, $c.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (m, f) => {
        const E = m.url;
        if (s.info(`${E} requested`), E === "/") {
          if (!m.headers.authorization || m.headers.authorization.indexOf("Basic ") === -1) {
            f.statusCode = 401, f.statusMessage = "Invalid Authentication Credentials", f.end(), s.warn("No authenthication info");
            return;
          }
          const S = m.headers.authorization.split(" ")[1], T = Buffer.from(S, "base64").toString("ascii"), [R, b] = T.split(":");
          if (R !== "autoupdater" || b !== u) {
            f.statusCode = 401, f.statusMessage = "Invalid Authentication Credentials", f.end(), s.warn("Invalid authenthication credentials");
            return;
          }
          const j = Buffer.from(`{ "url": "${c(this.server)}${w}" }`);
          f.writeHead(200, { "Content-Type": "application/json", "Content-Length": j.length }), f.end(j);
          return;
        }
        if (!E.startsWith(w)) {
          s.warn(`${E} requested, but not supported`), f.writeHead(404), f.end();
          return;
        }
        s.info(`${w} requested by Squirrel.Mac, pipe ${i}`);
        let _ = !1;
        f.on("finish", () => {
          _ || (this.nativeUpdater.removeListener("error", l), p([]));
        });
        const y = (0, p1.createReadStream)(i);
        y.on("error", (S) => {
          try {
            f.end();
          } catch (T) {
            s.warn(`cannot end response: ${T}`);
          }
          _ = !0, this.nativeUpdater.removeListener("error", l), l(new Error(`Cannot pipe "${i}": ${S}`));
        }), f.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": o
        }), y.pipe(f);
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
$r.MacUpdater = ha;
var Lr = {}, pa = {};
Object.defineProperty(pa, "__esModule", { value: !0 });
pa.verifySignature = w1;
const Lc = be, _d = Mi, y1 = Bi, xc = fe;
function vd(e, t) {
  return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", e], {
    shell: !0,
    timeout: t
  }];
}
function w1(e, t, n) {
  return new Promise((r, i) => {
    const o = t.replace(/'/g, "''");
    n.info(`Verifying signature ${o}`), (0, _d.execFile)(...vd(`"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`, 20 * 1e3), (s, a, c) => {
      var p;
      try {
        if (s != null || c) {
          as(n, s, c, i), r(null);
          return;
        }
        const l = _1(a);
        if (l.Status === 0) {
          try {
            const m = xc.normalize(l.Path), f = xc.normalize(t);
            if (n.info(`LiteralPath: ${m}. Update Path: ${f}`), m !== f) {
              as(n, new Error(`LiteralPath of ${m} is different than ${f}`), c, i), r(null);
              return;
            }
          } catch (m) {
            n.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(p = m.message) !== null && p !== void 0 ? p : m.stack}`);
          }
          const h = (0, Lc.parseDn)(l.SignerCertificate.Subject);
          let w = !1;
          for (const m of e) {
            const f = (0, Lc.parseDn)(m);
            if (f.size ? w = Array.from(f.keys()).every((_) => f.get(_) === h.get(_)) : m === h.get("CN") && (n.warn(`Signature validated using only CN ${m}. Please add your full Distinguished Name (DN) to publisherNames configuration`), w = !0), w) {
              r(null);
              return;
            }
          }
        }
        const u = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(l, (h, w) => h === "RawData" ? void 0 : w, 2);
        n.warn(`Sign verification failed, installer signed with incorrect certificate: ${u}`), r(u);
      } catch (l) {
        as(n, l, null, i), r(null);
        return;
      }
    });
  });
}
function _1(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const n = t.SignerCertificate;
  return n != null && (delete n.Archived, delete n.Extensions, delete n.Handle, delete n.HasPrivateKey, delete n.SubjectName), t;
}
function as(e, t, n, r) {
  if (v1()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || n}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, _d.execFileSync)(...vd("ConvertTo-Json test", 10 * 1e3));
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && r(t), n && r(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${n}. Failing signature validation due to unknown stderr.`));
}
function v1() {
  const e = y1.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty(Lr, "__esModule", { value: !0 });
Lr.NsisUpdater = void 0;
const wi = be, Pc = fe, S1 = Tn, A1 = Vr, Fc = nn, T1 = Ie, C1 = tn, I1 = pa, Uc = en;
class D1 extends S1.BaseUpdater {
  constructor(t, n) {
    super(t, n), this._verifyUpdateCodeSignature = (r, i) => (0, I1.verifySignature)(r, i, this._logger);
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
    const n = t.updateInfoAndProvider.provider, r = (0, T1.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: r,
      task: async (i, o, s, a) => {
        const c = r.packageInfo, p = c != null && s != null;
        if (p && t.disableWebInstaller)
          throw (0, wi.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !p && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (p || t.disableDifferentialDownload || await this.differentialDownloadInstaller(r, t, i, n, wi.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(r.url, i, o);
        const l = await this.verifySignature(i);
        if (l != null)
          throw await a(), (0, wi.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${l}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (p && await this.differentialDownloadWebPackage(t, c, s, n))
          try {
            await this.httpExecutor.download(new Uc.URL(c.path), s, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: c.sha512
            });
          } catch (u) {
            try {
              await (0, C1.unlink)(s);
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
      this.spawnLog(Pc.join(process.resourcesPath, "elevate.exe"), [n].concat(r)).catch((s) => this.dispatchError(s));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), o(), !0) : (this.spawnLog(n, r).catch((s) => {
      const a = s.code;
      this._logger.info(`Cannot run installer: error code: ${a}, error message: "${s.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), a === "UNKNOWN" || a === "EACCES" ? o() : a === "ENOENT" ? _n.shell.openPath(n).catch((c) => this.dispatchError(c)) : this.dispatchError(s);
    }), !0);
  }
  async differentialDownloadWebPackage(t, n, r, i) {
    if (n.blockMapSize == null)
      return !0;
    try {
      const o = {
        newUrl: new Uc.URL(n.path),
        oldFile: Pc.join(this.downloadedUpdateHelper.cacheDir, wi.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: r,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(Fc.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(Fc.DOWNLOAD_PROGRESS, s)), await new A1.FileWithEmbeddedBlockMapDifferentialDownloader(n, this.httpExecutor, o).download();
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "win32";
    }
    return !1;
  }
}
Lr.NsisUpdater = D1;
(function(e) {
  var t = Ve && Ve.__createBinding || (Object.create ? function(E, _, y, S) {
    S === void 0 && (S = y);
    var T = Object.getOwnPropertyDescriptor(_, y);
    (!T || ("get" in T ? !_.__esModule : T.writable || T.configurable)) && (T = { enumerable: !0, get: function() {
      return _[y];
    } }), Object.defineProperty(E, S, T);
  } : function(E, _, y, S) {
    S === void 0 && (S = y), E[S] = _[y];
  }), n = Ve && Ve.__exportStar || function(E, _) {
    for (var y in E) y !== "default" && !Object.prototype.hasOwnProperty.call(_, y) && t(_, E, y);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const r = tn, i = fe;
  var o = Tn;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return o.BaseUpdater;
  } });
  var s = Jt;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return s.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return s.NoOpLogger;
  } });
  var a = Ie;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return a.Provider;
  } });
  var c = Nr;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return c.AppImageUpdater;
  } });
  var p = br;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return p.DebUpdater;
  } });
  var l = Or;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return l.PacmanUpdater;
  } });
  var u = Rr;
  Object.defineProperty(e, "RpmUpdater", { enumerable: !0, get: function() {
    return u.RpmUpdater;
  } });
  var h = $r;
  Object.defineProperty(e, "MacUpdater", { enumerable: !0, get: function() {
    return h.MacUpdater;
  } });
  var w = Lr;
  Object.defineProperty(e, "NsisUpdater", { enumerable: !0, get: function() {
    return w.NsisUpdater;
  } }), n(nn, e);
  let m;
  function f() {
    if (process.platform === "win32")
      m = new Lr.NsisUpdater();
    else if (process.platform === "darwin")
      m = new $r.MacUpdater();
    else {
      m = new Nr.AppImageUpdater();
      try {
        const E = i.join(process.resourcesPath, "package-type");
        if (!(0, r.existsSync)(E))
          return m;
        switch ((0, r.readFileSync)(E).toString().trim()) {
          case "deb":
            m = new br.DebUpdater();
            break;
          case "rpm":
            m = new Rr.RpmUpdater();
            break;
          case "pacman":
            m = new Or.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (E) {
        console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", E.message);
      }
    }
    return m;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => m || f()
  });
})(je);
var rr = { exports: {} }, Sd = {
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
}, Wr = {};
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
})(Wr);
const N1 = xt, ae = fe, kc = Sd, ma = Wr, b1 = typeof process == "object" && process.platform === "win32", Mc = (e) => typeof e == "object" && e !== null, Ad = new Uint32Array(256).map((e, t) => {
  for (let n = 0; n < 8; n++)
    t & 1 ? t = 3988292384 ^ t >>> 1 : t >>>= 1;
  return t >>> 0;
});
function he(e) {
  this.sep = ae.sep, this.fs = N1, Mc(e) && Mc(e.fs) && typeof e.fs.statSync == "function" && (this.fs = e.fs);
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
        if (s && s.isFile()) throw ma.FILE_IN_THE_WAY(`"${i}"`);
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
    if (c.isSymbolicLink()) throw ma.FILE_IN_THE_WAY(`"${s}"`);
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
      m.forEach(function(E) {
        const _ = ae.join(l, E);
        c(_, function(y, S) {
          if (y) return h(y);
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
            n.fs.realpath(_, function(b, j) {
              if (b) return h(b);
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
  return Ad[(e ^ t) & 255] ^ e >>> 8;
};
he.crc32 = function(e) {
  typeof e == "string" && (e = Buffer.from(e, "utf8"));
  let t = e.length, n = -1;
  for (let r = 0; r < t; ) n = he.crc32update(n, e[r++]);
  return ~n >>> 0;
};
he.methodToString = function(e) {
  switch (e) {
    case kc.STORED:
      return "STORED (" + e + ")";
    case kc.DEFLATED:
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
    throw ma.ZIP64_VALUE_TOO_LARGE();
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
he.isWin = b1;
he.crcTable = Ad;
const R1 = fe;
var $1 = function(e, { fs: t }) {
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
  return n && t.existsSync(n) ? (i = t.statSync(n), r.directory = i.isDirectory(), r.mtime = i.mtime, r.atime = i.atime, r.executable = (73 & i.mode) !== 0, r.readonly = (128 & i.mode) === 0, r.hidden = R1.basename(n)[0] === ".") : console.warn("Invalid path: " + n), {
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
}, L1 = {
  efs: !0,
  encode: (e) => Buffer.from(e, "utf8"),
  decode: (e) => e.toString("utf8")
};
rr.exports = O1;
rr.exports.Constants = Sd;
rr.exports.Errors = Wr;
rr.exports.FileAttr = $1;
rr.exports.decoder = L1;
var Yr = rr.exports, ho = {}, Ot = Yr, z = Ot.Constants, x1 = function() {
  var e = 20, t = 10, n = 0, r = 0, i = 0, o = 0, s = 0, a = 0, c = 0, p = 0, l = 0, u = 0, h = 0, w = 0, m = 0;
  e |= Ot.isWin ? 2560 : 768, n |= z.FLG_EFS;
  const f = {
    extraLen: 0
  }, E = (y) => Math.max(0, y) >>> 0, _ = (y) => Math.max(0, y) & 255;
  return i = Ot.fromDate2DOS(/* @__PURE__ */ new Date()), {
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
      return Ot.fromDOS2Date(this.timeval);
    },
    set time(y) {
      y = new Date(y), this.timeval = Ot.fromDate2DOS(y);
    },
    get timeval() {
      return i;
    },
    set timeval(y) {
      i = E(y);
    },
    get timeHighByte() {
      return _(i >>> 8);
    },
    get crc() {
      return o;
    },
    set crc(y) {
      o = E(y);
    },
    get compressedSize() {
      return s;
    },
    set compressedSize(y) {
      s = E(y);
    },
    get size() {
      return a;
    },
    set size(y) {
      a = E(y);
    },
    get fileNameLength() {
      return c;
    },
    set fileNameLength(y) {
      c = y;
    },
    get extraLength() {
      return p;
    },
    set extraLength(y) {
      p = y;
    },
    get extraLocalLength() {
      return f.extraLen;
    },
    set extraLocalLength(y) {
      f.extraLen = y;
    },
    get commentLength() {
      return l;
    },
    set commentLength(y) {
      l = y;
    },
    get diskNumStart() {
      return u;
    },
    set diskNumStart(y) {
      u = E(y);
    },
    get inAttr() {
      return h;
    },
    set inAttr(y) {
      h = E(y);
    },
    get attr() {
      return w;
    },
    set attr(y) {
      w = E(y);
    },
    // get Unix file permissions
    get fileAttr() {
      return (w || 0) >> 16 & 511;
    },
    get offset() {
      return m;
    },
    set offset(y) {
      m = E(y);
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
    loadLocalHeaderFromBinary: function(y) {
      if (m < 0 || m + z.LOCHDR > y.length)
        throw Ot.Errors.INVALID_LOC();
      var S = y.slice(m, m + z.LOCHDR);
      if (S.readUInt32LE(0) !== z.LOCSIG)
        throw Ot.Errors.INVALID_LOC();
      f.version = S.readUInt16LE(z.LOCVER), f.flags = S.readUInt16LE(z.LOCFLG), f.flags_desc = (f.flags & z.FLG_DESC) > 0, f.method = S.readUInt16LE(z.LOCHOW), f.time = S.readUInt32LE(z.LOCTIM), f.crc = S.readUInt32LE(z.LOCCRC), f.compressedSize = S.readUInt32LE(z.LOCSIZ), f.size = S.readUInt32LE(z.LOCLEN), f.fnameLen = S.readUInt16LE(z.LOCNAM), f.extraLen = S.readUInt16LE(z.LOCEXT);
      const T = m + z.LOCHDR + f.fnameLen, R = T + f.extraLen;
      return y.slice(T, R);
    },
    loadFromBinary: function(y) {
      if (y.length !== z.CENHDR || y.readUInt32LE(0) !== z.CENSIG)
        throw Ot.Errors.INVALID_CEN();
      e = y.readUInt16LE(z.CENVEM), t = y.readUInt16LE(z.CENVER), n = y.readUInt16LE(z.CENFLG), r = y.readUInt16LE(z.CENHOW), i = y.readUInt32LE(z.CENTIM), o = y.readUInt32LE(z.CENCRC), s = y.readUInt32LE(z.CENSIZ), a = y.readUInt32LE(z.CENLEN), c = y.readUInt16LE(z.CENNAM), p = y.readUInt16LE(z.CENEXT), l = y.readUInt16LE(z.CENCOM), u = y.readUInt16LE(z.CENDSK), h = y.readUInt16LE(z.CENATT), w = y.readUInt32LE(z.CENATX), m = y.readUInt32LE(z.CENOFF);
    },
    localHeaderToBinary: function() {
      var y = Buffer.alloc(z.LOCHDR);
      return y.writeUInt32LE(z.LOCSIG, 0), y.writeUInt16LE(t, z.LOCVER), y.writeUInt16LE(n & ~z.FLG_DESC, z.LOCFLG), y.writeUInt16LE(r, z.LOCHOW), y.writeUInt32LE(i, z.LOCTIM), y.writeUInt32LE(o, z.LOCCRC), y.writeUInt32LE(s, z.LOCSIZ), y.writeUInt32LE(a, z.LOCLEN), y.writeUInt16LE(c, z.LOCNAM), y.writeUInt16LE(f.extraLen, z.LOCEXT), y;
    },
    centralHeaderToBinary: function() {
      var y = Buffer.alloc(z.CENHDR + c + p + l);
      return y.writeUInt32LE(z.CENSIG, 0), y.writeUInt16LE(e, z.CENVEM), y.writeUInt16LE(t, z.CENVER), y.writeUInt16LE(n & ~z.FLG_DESC, z.CENFLG), y.writeUInt16LE(r, z.CENHOW), y.writeUInt32LE(i, z.CENTIM), y.writeUInt32LE(o, z.CENCRC), y.writeUInt32LE(s, z.CENSIZ), y.writeUInt32LE(a, z.CENLEN), y.writeUInt16LE(c, z.CENNAM), y.writeUInt16LE(p, z.CENEXT), y.writeUInt16LE(l, z.CENCOM), y.writeUInt16LE(u, z.CENDSK), y.writeUInt16LE(h, z.CENATT), y.writeUInt32LE(w, z.CENATX), y.writeUInt32LE(m, z.CENOFF), y;
    },
    toJSON: function() {
      const y = function(S) {
        return S + " bytes";
      };
      return {
        made: e,
        version: t,
        flags: n,
        method: Ot.methodToString(r),
        time: this.time,
        crc: "0x" + o.toString(16).toUpperCase(),
        compressedSize: y(s),
        size: y(a),
        fileNameLength: y(c),
        extraLength: y(p),
        commentLength: y(l),
        diskNumStart: u,
        inAttr: h,
        attr: w,
        offset: m,
        centralHeaderSize: y(z.CENHDR + c + p + l)
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
}, lt = Yr, Z = lt.Constants, P1 = function() {
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
ho.EntryHeader = x1;
ho.MainHeader = P1;
var po = {}, F1 = function(e) {
  var t = ji, n = { chunkSize: (parseInt(e.length / 1024) + 1) * 1024 };
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
}, Jc;
const U1 = +(((Jc = process == null ? void 0 : process.versions) == null ? void 0 : Jc.node) ?? "").split(".")[0] || 0, k1 = Wr;
var M1 = function(e, t) {
  var n = ji;
  const r = t > 0 ? t : 1, i = U1 >= 15 ? { maxOutputLength: r } : {};
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
            return l(k1.MAX_OUTPUT_EXCEEDED());
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
const { randomFillSync: Bc } = Zn, B1 = Wr, j1 = new Uint32Array(256).map((e, t) => {
  for (let n = 0; n < 8; n++)
    t & 1 ? t = t >>> 1 ^ 3988292384 : t >>>= 1;
  return t >>> 0;
}), Td = (e, t) => Math.imul(e, t) >>> 0, jc = (e, t) => j1[(e ^ t) & 255] ^ e >>> 8, xr = () => typeof Bc == "function" ? Bc(Buffer.alloc(12)) : xr.node();
xr.node = () => {
  const e = Buffer.alloc(12), t = e.length;
  for (let n = 0; n < t; n++) e[n] = Math.random() * 256 & 255;
  return e;
};
const Ci = {
  genSalt: xr
};
function mo(e) {
  const t = Buffer.isBuffer(e) ? e : Buffer.from(e);
  this.keys = new Uint32Array([305419896, 591751049, 878082192]);
  for (let n = 0; n < t.length; n++)
    this.updateKeys(t[n]);
}
mo.prototype.updateKeys = function(e) {
  const t = this.keys;
  return t[0] = jc(t[0], e), t[1] += t[0] & 255, t[1] = Td(t[1], 134775813) + 1, t[2] = jc(t[2], t[1] >>> 24), e;
};
mo.prototype.next = function() {
  const e = (this.keys[2] | 2) >>> 0;
  return Td(e, e ^ 1) >> 8 & 255;
};
function H1(e) {
  const t = new mo(e);
  return function(n) {
    const r = Buffer.alloc(n.length);
    let i = 0;
    for (let o of n)
      r[i++] = t.updateKeys(o ^ t.next());
    return r;
  };
}
function G1(e) {
  const t = new mo(e);
  return function(n, r, i = 0) {
    r || (r = Buffer.alloc(n.length));
    for (let o of n) {
      const s = t.next();
      r[i++] = o ^ s, t.updateKeys(o);
    }
    return r;
  };
}
function q1(e, t, n) {
  if (!e || !Buffer.isBuffer(e) || e.length < 12)
    return Buffer.alloc(0);
  const r = H1(n), i = r(e.slice(0, 12)), o = (t.flags & 8) === 8 ? t.timeHighByte : t.crc >>> 24;
  if (i[11] !== o)
    throw B1.WRONG_PASSWORD();
  return r(e.slice(12));
}
function z1(e) {
  Buffer.isBuffer(e) && e.length >= 12 ? Ci.genSalt = function() {
    return e.slice(0, 12);
  } : e === "node" ? Ci.genSalt = xr.node : Ci.genSalt = xr;
}
function V1(e, t, n, r = !1) {
  e == null && (e = Buffer.alloc(0)), Buffer.isBuffer(e) || (e = Buffer.from(e.toString()));
  const i = G1(n), o = Ci.genSalt();
  o[11] = t.crc >>> 24 & 255, r && (o[10] = t.crc >>> 16 & 255);
  const s = Buffer.alloc(e.length + 12);
  return i(o, s), i(e, s, 12);
}
var W1 = { decrypt: q1, encrypt: V1, _salter: z1 };
po.Deflater = F1;
po.Inflater = M1;
po.ZipCrypto = W1;
var ce = Yr, Y1 = ho, rt = ce.Constants, ls = po, Cd = function(e, t) {
  var n = new Y1.EntryHeader(), r = Buffer.alloc(0), i = Buffer.alloc(0), o = !1, s = null, a = Buffer.alloc(0), c = Buffer.alloc(0), p = !0;
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
    var b;
    try {
      if (b = h(), b.length === 0)
        return S && T && T(b), b;
      if (n.encrypted) {
        if (typeof R != "string" && !Buffer.isBuffer(R))
          throw ce.Errors.INVALID_PASS_PARAM();
        b = ls.ZipCrypto.decrypt(b, n, R);
      }
    } catch (P) {
      if (S && T)
        return T(Buffer.alloc(0), P), Buffer.alloc(0);
      throw P;
    }
    var j;
    switch (n.method) {
      case ce.Constants.STORED:
        if (j = Buffer.alloc(b.length), b.copy(j), w(j))
          return S && T && T(j), j;
        throw S && T && T(j, ce.Errors.BAD_CRC()), ce.Errors.BAD_CRC();
      case ce.Constants.DEFLATED:
        var B = new ls.Inflater(b, n.size);
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
          var b = new ls.Deflater(s);
          if (S)
            b.deflateAsync(function(B) {
              R = Buffer.alloc(B.length), n.compressedSize = B.length, B.copy(R), T && T(R);
            });
          else {
            var j = b.deflate();
            return n.compressedSize = j.length, j;
          }
          b = null;
          break;
      }
    } else if (S && T)
      T(Buffer.alloc(0));
    else
      return Buffer.alloc(0);
  }
  function E(S, T) {
    return ce.readBigUInt64LE(S, T);
  }
  function _(S) {
    try {
      for (var T = 0, R, b, j; T + 4 < S.length; )
        R = S.readUInt16LE(T), T += 2, b = S.readUInt16LE(T), T += 2, j = S.slice(T, T + b), T += b, rt.ID_ZIP64 === R && y(j);
    } catch {
      throw ce.Errors.EXTRA_FIELD_PARSE_ERROR();
    }
  }
  function y(S) {
    var T, R, b, j;
    S.length >= rt.EF_ZIP64_SCOMP && (T = E(S, rt.EF_ZIP64_SUNCOMP), n.size === rt.EF_ZIP64_OR_32 && (n.size = T)), S.length >= rt.EF_ZIP64_RHO && (R = E(S, rt.EF_ZIP64_SCOMP), n.compressedSize === rt.EF_ZIP64_OR_32 && (n.compressedSize = R)), S.length >= rt.EF_ZIP64_DSN && (b = E(S, rt.EF_ZIP64_RHO), n.offset === rt.EF_ZIP64_OR_32 && (n.offset = b)), S.length >= rt.EF_ZIP64_DSN + 4 && (j = S.readUInt32LE(rt.EF_ZIP64_DSN), n.diskNumStart === rt.EF_ZIP64_OR_16 && (n.diskNumStart = j));
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
const Hc = Cd, X1 = ho, Be = Yr;
var J1 = function(e, t) {
  var n = [], r = /* @__PURE__ */ Object.create(null), i = Buffer.alloc(0), o = new X1.MainHeader(), s = !1;
  const a = /* @__PURE__ */ new Set(), c = t, { noSort: p, decoder: l } = c;
  e ? w(c.readEntries) : s = !0;
  function u() {
    const f = /* @__PURE__ */ new Set();
    for (const E of Object.keys(r)) {
      const _ = E.split("/");
      if (_.pop(), !!_.length)
        for (let y = 0; y < _.length; y++) {
          const S = _.slice(0, y + 1).join("/") + "/";
          f.add(S);
        }
    }
    for (const E of f)
      if (!(E in r)) {
        const _ = new Hc(c);
        _.entryName = E, _.attr = 16, _.temporary = !0, n.push(_), r[_.entryName] = _, a.add(_);
      }
  }
  function h() {
    if (s = !0, r = /* @__PURE__ */ Object.create(null), o.diskEntries > (e.length - o.offset) / Be.Constants.CENHDR)
      throw Be.Errors.DISK_ENTRY_TOO_LARGE();
    n = new Array(o.diskEntries);
    for (var f = o.offset, E = 0; E < n.length; E++) {
      var _ = f, y = new Hc(c, e);
      if (y.header = e.slice(_, _ += Be.Constants.CENHDR), y.entryName = e.slice(_, _ += y.header.fileNameLength), y.header.extraLength && (y.extra = e.slice(_, _ += y.header.extraLength)), y.header.commentLength && (y.comment = e.slice(_, _ + y.header.commentLength)), f += y.header.centralHeaderSize, y.entryName in r)
        throw Be.Errors.DUPLICATE_ENTRY(`"${y.entryName}"`);
      n[E] = y, r[y.entryName] = y;
    }
    a.clear(), u();
  }
  function w(f) {
    var E = e.length - Be.Constants.ENDHDR, _ = Math.max(0, E - 65535), y = _, S = e.length, T = -1, R = 0;
    for ((typeof c.trailingSpace == "boolean" ? c.trailingSpace : !1) && (_ = 0), E; E >= y; E--)
      if (e[E] === 80) {
        if (e.readUInt32LE(E) === Be.Constants.ENDSIG) {
          T = E, R = E, S = E + Be.Constants.ENDHDR, y = E - Be.Constants.END64HDR;
          continue;
        }
        if (e.readUInt32LE(E) === Be.Constants.END64SIG) {
          y = _;
          continue;
        }
        if (e.readUInt32LE(E) === Be.Constants.ZIP64SIG) {
          T = E, S = E + Be.readBigUInt64LE(e, E + Be.Constants.ZIP64SIZE) + Be.Constants.ZIP64LEAD;
          break;
        }
      }
    if (T == -1) throw Be.Errors.INVALID_FORMAT();
    o.loadFromBinary(e.slice(T, S)), o.commentLength && (i = e.slice(R + Be.Constants.ENDHDR)), f && h();
  }
  function m() {
    n.length > 1 && !p && (n = n.map((f) => ({ entry: f, key: f.entryName.toLowerCase() })).sort((f, E) => f.key.localeCompare(E.key)).map((f) => f.entry));
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
    deleteFile: function(f, E = !0) {
      s || h();
      const _ = r[f];
      this.getEntryChildren(_, E).map((S) => S.entryName).forEach(this.deleteEntry);
    },
    /**
     * Removes the entry with the given name from the entry list.
     *
     * @param {string} entryName
     * @returns {void}
     */
    deleteEntry: function(f) {
      s || h();
      const E = r[f], _ = n.indexOf(E);
      _ >= 0 && (n.splice(_, 1), delete r[f], o.totalEntries = n.length);
    },
    /**
     *  Iterates and returns all nested files and directories of the given entry
     *
     * @param entry
     * @return Array
     */
    getEntryChildren: function(f, E = !0) {
      if (s || h(), typeof f == "object")
        if (f.isDirectory && E) {
          const _ = [], y = f.entryName;
          for (const S of n)
            S.entryName.startsWith(y) && _.push(S);
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
        const E = this.getEntryChildren(f);
        return E.includes(f) ? E.length - 1 : E.length;
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
      const f = [], E = [];
      let _ = 0, y = 0;
      o.size = 0, o.offset = 0;
      let S = 0;
      for (const b of this.entries) {
        const j = b.getCompressedData();
        b.header.offset = y;
        const B = b.packLocalHeader(), P = B.length + j.length;
        y += P, f.push(B), f.push(j);
        const A = b.packCentralHeader();
        E.push(A), o.size += A.length, _ += P + A.length, S++;
      }
      _ += o.mainHeaderSize, o.offset = y, o.totalEntries = S, y = 0;
      const T = Buffer.alloc(_);
      for (const b of f)
        b.copy(T, y), y += b.length;
      for (const b of E)
        b.copy(T, y), y += b.length;
      const R = o.toBinary();
      return i && i.copy(R, R.length - i.length), R.copy(T, y), e = T, s = !1, T;
    },
    toAsyncBuffer: function(f, E, _, y) {
      try {
        s || h(), m();
        const S = [], T = [];
        let R = 0, b = 0, j = 0;
        o.size = 0, o.offset = 0;
        const B = function(P) {
          if (P.length > 0) {
            const A = P.shift(), Y = A.entryName + A.extra.toString();
            _ && _(Y), A.getCompressedDataAsync(function(K) {
              y && y(Y), A.header.offset = b;
              const te = A.packLocalHeader(), F = te.length + K.length;
              b += F, S.push(te), S.push(K);
              const O = A.packCentralHeader();
              T.push(O), o.size += O.length, R += F + O.length, j++, B(P);
            });
          } else {
            R += o.mainHeaderSize, o.offset = b, o.totalEntries = j, b = 0;
            const A = Buffer.alloc(R);
            S.forEach(function(K) {
              K.copy(A, b), b += K.length;
            }), T.forEach(function(K) {
              K.copy(A, b), b += K.length;
            });
            const Y = o.toBinary();
            i && i.copy(Y, Y.length - i.length), Y.copy(A, b), e = A, s = !1, f(A);
          }
        };
        B(Array.from(this.entries));
      } catch (S) {
        E(S);
      }
    }
  };
};
const ve = Yr, we = fe, Z1 = Cd, K1 = J1, un = (...e) => ve.findLast(e, (t) => typeof t == "boolean"), Gc = (...e) => ve.findLast(e, (t) => typeof t == "string"), Q1 = (...e) => ve.findLast(e, (t) => typeof t == "function"), eA = {
  // option "noSort" : if true it disables files sorting
  noSort: !1,
  // read entries during load (initial loading may be slower)
  readEntries: !1,
  // default method is none
  method: ve.Constants.NONE,
  // file system
  fs: null
};
var tA = function(e, t) {
  let n = null;
  const r = Object.assign(/* @__PURE__ */ Object.create(null), eA);
  e && typeof e == "object" && (e instanceof Uint8Array || (Object.assign(r, e), e = r.input ? r.input : void 0, r.input && delete r.input), Buffer.isBuffer(e) && (n = e, r.method = ve.Constants.BUFFER, e = void 0)), Object.assign(r, t);
  const i = new ve(r), o = (m) => {
    m.filter((f) => f.attr).sort((f, E) => E.path.length - f.path.length).forEach((f) => i.fs.chmodSync(f.path, f.attr));
  };
  if ((typeof r.decoder != "object" || typeof r.decoder.encode != "function" || typeof r.decoder.decode != "function") && (r.decoder = ve.decoder), e && typeof e == "string")
    if (i.fs.existsSync(e))
      r.method = ve.Constants.FILE, r.filename = e, n = i.fs.readFileSync(e);
    else
      throw ve.Errors.INVALID_FILENAME();
  const s = new K1(n, r), { canonical: a, sanitize: c, zipnamefix: p } = ve;
  function l(m) {
    if (m && s) {
      var f;
      if (typeof m == "string" && (f = s.getEntry(we.posix.normalize(m))), typeof m == "object" && typeof m.entryName < "u" && typeof m.header < "u" && (f = s.getEntry(m.entryName)), f)
        return f;
    }
    return null;
  }
  function u(m) {
    const { join: f, normalize: E, sep: _ } = we.posix;
    return f(we.isAbsolute(m) ? "/" : ".", E(_ + m.split("\\").join(_) + _));
  }
  function h(m) {
    return m instanceof RegExp ? /* @__PURE__ */ function(f) {
      return function(E) {
        return f.test(E);
      };
    }(m) : typeof m != "function" ? () => !0 : m;
  }
  const w = (m, f) => {
    let E = f.slice(-1);
    return E = E === i.sep ? i.sep : "", we.relative(m, f) + E;
  };
  return {
    /**
     * Extracts the given entry from the archive and returns the content as a Buffer object
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @param {Buffer|string} [pass] - password
     * @return Buffer or Null in case of error
     */
    readFile: function(m, f) {
      var E = l(m);
      return E && E.getData(f) || null;
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
      var E = l(m);
      E ? E.getDataAsync(f) : f(null, "getEntry failed for:" + m);
    },
    /**
     * Extracts the given entry from the archive and returns the content as plain text in the given encoding
     * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
     * @param {string} encoding - Optional. If no encoding is specified utf8 is used
     *
     * @return String
     */
    readAsText: function(m, f) {
      var E = l(m);
      if (E) {
        var _ = E.getData();
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
    readAsTextAsync: function(m, f, E) {
      var _ = l(m);
      _ ? _.getDataAsync(function(y, S) {
        if (S) {
          f(y, S);
          return;
        }
        y && y.length ? f(y.toString(E || "utf8")) : f("");
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
      var E = l(m);
      E && s.deleteFile(E.entryName, f);
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
      var E = l(m);
      E && (E.comment = f);
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
      var E = l(m);
      E && E.setData(f);
    },
    /**
     * Adds a file from the disk to the archive
     *
     * @param {string} localPath File to add to zip
     * @param {string} [zipPath] Optional path inside the zip
     * @param {string} [zipName] Optional name for the file
     * @param {string} [comment] Optional file comment
     */
    addLocalFile: function(m, f, E, _) {
      if (i.fs.existsSync(m)) {
        f = f ? u(f) : "";
        const y = we.win32.basename(we.win32.normalize(m));
        f += E || y;
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
      const E = we.resolve(m.localPath), { comment: _ } = m;
      let { zipPath: y, zipName: S } = m;
      const T = this;
      i.fs.stat(E, function(R, b) {
        if (R) return f(R, !1);
        y = y ? u(y) : "";
        const j = we.win32.basename(we.win32.normalize(E));
        if (y += S || j, b.isFile())
          i.fs.readFile(E, function(B, P) {
            return B ? f(B, !1) : (T.addFile(y, P, _, b), setImmediate(f, void 0, !0));
          });
        else if (b.isDirectory())
          return y += i.sep, T.addFile(y, Buffer.alloc(0), _, b), setImmediate(f, void 0, !0);
      });
    },
    /**
     * Adds a local directory and all its nested files and directories to the archive
     *
     * @param {string} localPath - local path to the folder
     * @param {string} [zipPath] - optional path inside zip
     * @param {(RegExp|function)} [filter] - optional RegExp or Function if files match will be included.
     */
    addLocalFolder: function(m, f, E) {
      if (E = h(E), f = f ? u(f) : "", m = we.normalize(m), i.fs.existsSync(m)) {
        const _ = i.findFiles(m), y = this;
        if (_.length)
          for (const S of _) {
            const T = we.join(f, w(m, S));
            E(T) && y.addLocalFile(S, we.dirname(T));
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
    addLocalFolderAsync: function(m, f, E, _) {
      _ = h(_), E = E ? u(E) : "", m = we.normalize(m);
      var y = this;
      i.fs.open(m, "r", function(S) {
        if (S && S.code === "ENOENT")
          f(void 0, ve.Errors.FILE_NOT_FOUND(m));
        else if (S)
          f(void 0, S);
        else {
          var T = i.findFiles(m), R = -1, b = function() {
            if (R += 1, R < T.length) {
              var j = T[R], B = w(m, j).split("\\").join("/");
              B = B.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), _(B) ? i.fs.stat(j, function(P, A) {
                P && f(void 0, P), A.isFile() ? i.fs.readFile(j, function(Y, K) {
                  Y ? f(void 0, Y) : (y.addFile(E + B, K, "", A), b());
                }) : (y.addFile(E + B + "/", Buffer.alloc(0), "", A), b());
              }) : process.nextTick(() => {
                b();
              });
            } else
              f(!0, void 0);
          };
          b();
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
      const E = this;
      m = typeof m == "object" ? m : { localPath: m };
      const _ = we.resolve(m.localPath);
      let { zipPath: y, filter: S, namefix: T } = m;
      S instanceof RegExp ? S = /* @__PURE__ */ function(j) {
        return function(B) {
          return j.test(B);
        };
      }(S) : typeof S != "function" && (S = function() {
        return !0;
      }), y = y ? u(y) : "", T === "latin1" && (T = (j) => j.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof T != "function" && (T = (j) => j);
      const R = (j) => we.join(y, T(w(_, j))), b = (j) => we.win32.basename(we.win32.normalize(T(j)));
      i.fs.open(_, "r", function(j) {
        j && j.code === "ENOENT" ? f(ve.Errors.FILE_NOT_FOUND(_), !1) : j ? f(j, !1) : i.findFilesAsync(_, function(B, P) {
          if (B) return f(B, !1);
          if (P = P.filter((A) => S(R(A))), !P.length) return f(void 0, !0);
          setImmediate(
            P.reverse().reduce(function(A, Y) {
              return function(K, te) {
                if (K || te === !1) return setImmediate(A, K, !1);
                E.addLocalFileAsync(
                  {
                    localPath: Y,
                    zipPath: we.dirname(R(Y)),
                    zipName: b(Y)
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
      return new Promise((E, _) => {
        this.addLocalFolderAsync2(Object.assign({ localPath: m }, f), (y, S) => {
          if (y) return _(y);
          S && E(this);
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
    addFile: function(m, f, E, _) {
      m = p(m);
      let y = l(m);
      const S = y != null;
      S || (y = new Z1(r), y.entryName = m), y.comment = E || "";
      const T = typeof _ == "object" && _ instanceof i.fs.Stats;
      T && (y.header.time = _.mtime);
      var R = y.isDirectory ? 16 : 0;
      let b = y.isDirectory ? 16384 : 32768;
      return T ? b |= 4095 & _.mode : typeof _ == "number" ? b |= 4095 & _ : b |= y.isDirectory ? 493 : 420, R = (R | b << 16) >>> 0, y.attr = R, y.setData(f), S || s.setEntry(y), y;
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
    extractEntryTo: function(m, f, E, _, y, S) {
      _ = un(!1, _), y = un(!1, y), E = un(!0, E), S = Gc(y, S);
      var T = l(m);
      if (!T)
        throw ve.Errors.NO_ENTRY();
      var R = a(T.entryName), b = c(f, S && !T.isDirectory ? a(S) : E ? R : we.basename(R));
      if (T.isDirectory) {
        var j = s.getEntryChildren(T);
        return j.forEach(function(A) {
          if (A.isDirectory) return;
          var Y = A.getData();
          if (!Y)
            throw ve.Errors.CANT_EXTRACT_FILE();
          var K = a(E ? A.entryName : A.entryName.substring(T.entryName.length)), te = c(f, K);
          i.assertPathSafe(f, te);
          const F = y ? A.header.fileAttr : void 0;
          i.writeFileTo(te, Y, _, F);
        }), !0;
      }
      var B = T.getData(s.password);
      if (!B) throw ve.Errors.CANT_EXTRACT_FILE();
      if (i.assertPathSafe(f, b), i.fs.existsSync(b) && !_)
        throw ve.Errors.CANT_OVERRIDE();
      const P = y ? m.header.fileAttr : void 0;
      return i.writeFileTo(b, B, _, P), !0;
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
          var E = f.getData(m);
          if (!E)
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
    extractAllTo: function(m, f, E, _) {
      if (E = un(!1, E), _ = Gc(E, _), f = un(!1, f), !s) throw ve.Errors.NO_ZIP();
      const y = [];
      s.entries.forEach(function(S) {
        var T = c(m, a(S.entryName));
        if (i.assertPathSafe(m, T), S.isDirectory) {
          i.makeDir(T), E && y.push({ path: T, attr: S.header.fileAttr });
          return;
        }
        var R = S.getData(_);
        if (!R)
          throw ve.Errors.CANT_EXTRACT_FILE();
        const b = E ? S.header.fileAttr : void 0;
        i.writeFileTo(T, R, f, b);
        try {
          i.fs.utimesSync(T, S.header.time, S.header.time);
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
    extractAllToAsync: function(m, f, E, _) {
      if (_ = Q1(f, E, _), E = un(!1, E), f = un(!1, f), !_)
        return new Promise((B, P) => {
          this.extractAllToAsync(m, f, E, function(A) {
            A ? P(A) : B(this);
          });
        });
      if (!s) {
        _(ve.Errors.NO_ZIP());
        return;
      }
      m = we.resolve(m);
      const y = (B) => c(m, we.normalize(a(B.entryName))), S = (B, P) => new Error(B + ': "' + P + '"'), T = [], R = [];
      s.entries.forEach((B) => {
        B.isDirectory ? T.push(B) : R.push(B);
      });
      const b = [];
      for (const B of T) {
        const P = y(B), A = E ? B.header.fileAttr : void 0;
        try {
          i.assertPathSafe(m, P), i.makeDir(P);
        } catch {
          _(S("Unable to create folder", P));
          continue;
        }
        A && b.push({ path: P, attr: A });
        try {
          i.fs.utimesSync(P, B.header.time, B.header.time);
        } catch {
        }
      }
      const j = (B) => {
        if (!B)
          try {
            o(b);
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
                const O = E ? P.header.fileAttr : void 0;
                i.writeFileToAsync(K, te, f, O, function(M) {
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
        var E = s.compressToBuffer();
        if (E) {
          var _ = i.writeFileTo(m, E, !0);
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
      const { overwrite: E, perm: _ } = Object.assign({ overwrite: !0 }, f);
      return new Promise((y, S) => {
        !m && r.filename && (m = r.filename), m || S("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((T) => {
          const R = (b) => b ? y(b) : S("ADM-ZIP: Wasn't able to write zip file");
          i.writeFileToAsync(m, T, E, _, R);
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
    toBuffer: function(m, f, E, _) {
      return typeof m == "function" ? (s.toAsyncBuffer(m, f, E, _), null) : s.compressToBuffer();
    }
  };
};
const go = /* @__PURE__ */ qh(tA);
function qt(e, t) {
  if (e instanceof Error && e.message) return e.message;
  if (typeof e == "string" && e.trim()) return e;
  if (e && typeof e == "object" && "message" in e) {
    const n = e.message;
    if (typeof n == "string" && n.trim()) return n;
  }
  return t;
}
function Id(e) {
  const n = e.replace(/[^0-9.].*$/, "").split(".").map((s) => parseInt(s, 10)), r = n[0], i = n[1] ?? 0, o = n[2] ?? 0;
  return r > 1 || i > 20 || i === 20 && o >= 5 ? 21 : i >= 17 ? 17 : 8;
}
const qc = {
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
function nA(e) {
  const t = qc[e] || qc[17];
  return process.platform === "win32" ? t.win : process.platform === "darwin" ? process.arch === "arm64" ? t.mac_aarch64 : t.mac_x64 : t.linux_x64;
}
const yr = /* @__PURE__ */ new Map();
let En = 0, yn = 0;
function Eo() {
  const e = Ge.getPath("userData"), t = k.join(e, ".mine-launcher");
  return x.existsSync(t) || x.mkdirSync(t, { recursive: !0 }), t;
}
function Dd(e) {
  const t = Hh.createHash("md5");
  t.update(`OfflinePlayer:${e}`);
  const n = t.digest();
  n[6] = n[6] & 15 | 48, n[8] = n[8] & 63 | 128;
  const r = n.toString("hex");
  return `${r.slice(0, 8)}-${r.slice(8, 12)}-${r.slice(12, 16)}-${r.slice(16, 20)}-${r.slice(20, 32)}`;
}
function pn(e) {
  return new Promise((t, n) => {
    (e.startsWith("https") ? Hi : $s).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (o) => {
      if (o.statusCode && o.statusCode >= 300 && o.statusCode < 400 && o.headers.location)
        return o.resume(), pn(o.headers.location).then(t).catch(n);
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
    (e.startsWith("https") ? Hi : $s).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (p) => {
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
function fr(e) {
  return !e.includes("..") && !k.isAbsolute(e);
}
function rA(e, t, n) {
  const r = new go(e), i = k.resolve(t);
  let o = 0;
  for (const s of r.getEntries()) {
    if (s.isDirectory) continue;
    const a = s.entryName.replace(/\\/g, "/"), c = Number(s.header.attr ?? 0);
    if ((c >>> 16 & 61440) === 40960 || (c & 61440) === 40960)
      throw new Error(`Архив содержит symlink: ${a}`);
    if (k.isAbsolute(a) || /^[A-Za-z]:/.test(a) || a.split("/").some((h) => h === "" || h === "." || h === ".."))
      throw new Error(`Небезопасный путь в архиве: ${a}`);
    const l = k.resolve(i, ...a.split("/")), u = k.relative(i, l);
    if (u === "" || u.startsWith("..") || k.isAbsolute(u))
      throw new Error(`Путь вне каталога распаковки: ${a}`);
    x.mkdirSync(k.dirname(l), { recursive: !0 }), x.writeFileSync(l, s.getData()), o++;
  }
  return o;
}
async function cs(e, t) {
  if (x.existsSync(e))
    try {
      const n = process.platform === "win32" ? ".dll" : process.platform === "darwin" ? ".dylib" : ".so", r = new go(e);
      for (const i of r.getEntries()) {
        if (i.isDirectory) continue;
        const o = k.basename(i.entryName.replace(/\\/g, "/"));
        o.toLowerCase().endsWith(n) && /^[A-Za-z0-9._ -]{1,200}$/.test(o) && x.writeFileSync(k.join(t, o), i.getData());
      }
    } catch {
    }
}
let Wt = [];
function zc(e) {
  Wt.push(e), Wt.length > 120 && (Wt = Wt.slice(-120));
}
function iA(e) {
  const t = e.join(`
`);
  return t.match(/Unsupported class file major version (\d+)/) ? "Похоже, у вас неправильно подобрана версия Java — версия игры требует более новую Java. Откройте «Настройки» и в разделе Java проверьте, что путь ведёт к правильной JDK/JRE." : /java\.lang\.OutOfMemoryError/.test(t) ? "Игре не хватило памяти. Увеличьте «Максимальную память» в настройках лаунчера (в МБ) и попробуйте снова." : /-1073741515|0xc0000135/i.test(t) ? "Не найдены системные библиотеки Windows. Установите Microsoft Visual C++ Redistributable (x64) — это самая частая причина на чистой Windows." : /-1073741819|0xc0000005/i.test(t) ? "Крит native-кода. Чаще всего помогает обновление видеодрайвера. Если не помогло — запустите без модов и посмотрите лог." : /UnsatisfiedLinkError/i.test(t) ? "Не загрузились системные библиотеки игры (LWJGL natives). Проверьте, не блокирует ли их антивирус, и запустите снова — недостающие файлы скачаются заново." : /No space left|disk full|ENOSPC/i.test(t) ? "Закончилось место на диске. Освободите его и попробуйте снова." : /Failed to (download|fetch)|Could not (download|fetch)|assets/i.test(t) && /asset|resources/i.test(t) ? "Не удалось скачать игровые ресурсы (assets) — часто это сетевая блокировка CDN Mojang у провайдера. Попробуйте другое подключение или VPN и запустите снова." : /Could not create the Java Virtual Machine|Invalid or corrupt jarfile| unrecognized/.test(t) ? "Проверьте аргументы JVM в настройках лаунчера — Java не смогла запуститься с текущими параметрами." : /GLFW error|OpenGL|gpu|DirectX/i.test(t) && /error|fail/i.test(t) ? "Похоже, проблема с видеодрайвером/OpenGL. Обновите драйвер видеокарты." : /Incompatible.fml.mod|Fabric loader|Quilt loading/i.test(t) ? "Похоже, один из модов несовместим с этой версией или загрузчиком. Откройте вкладку «Моды» и отключите их по одному." : /Mixin apply failed|MixinTransformer/i.test(t) ? "Ошибка в моде (Mixin). Отключите свежеустановленные моды во вкладке «Моды»." : /The game crashed.*Calling event|Exception in thread "main"/.test(t) ? "Игра упала при старте. Попробуйте без модов или откройте папку сборки и покажите лог на форуме." : "Смотрите вкладку «Логи» для подробностей.";
}
function oA(e, t = process.platform === "win32" ? "windows" : process.platform === "darwin" ? "osx" : "linux") {
  if (!e || e.length === 0) return !0;
  let n = !1;
  for (const r of e)
    (!r.os || r.os.name === t) && (n = r.action === "allow");
  return n;
}
async function Nd() {
  const e = [], t = process.platform === "win32", n = t ? "javaw.exe" : "java", r = Eo(), i = (o, s = 0) => {
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
async function sA(e, t, n = 17) {
  const r = Eo(), i = k.join(r, "java", `java-${n}`), o = (h, w = 0) => {
    if (!x.existsSync(h) || w > 6) return null;
    try {
      for (const m of x.readdirSync(h)) {
        const f = k.join(h, m);
        if (m.toLowerCase() === (process.platform === "win32" ? "javaw.exe" : "java").toLowerCase()) return f;
        try {
          if (x.statSync(f).isDirectory()) {
            const E = o(f, w + 1);
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
  const a = process.platform === "win32", c = nA(n), p = a ? "zip" : ".tar.gz", l = k.join(r, "java", `java-${n}.${p}`);
  x.existsSync(k.dirname(l)) || x.mkdirSync(k.dirname(l), { recursive: !0 }), await St(c, l, (h) => {
    yn += h;
    const w = Date.now();
    if (w - En > 1e3) {
      const m = yn / Math.max(1, (w - En) / 1e3);
      En = w, yn = 0, e({
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
  }), t({ timestamp: Date.now(), type: "info", message: `Распаковка архива Java ${n}...` }), x.existsSync(i) || x.mkdirSync(i, { recursive: !0 }), a ? rA(l, i) : fs(`tar -xzf "${l}" -C "${i}"`), x.unlinkSync(l);
  const u = o(i);
  if (!u) throw new Error(`Java ${n} распакована некорректно — попробуйте установить её вручную`);
  return t({ timestamp: Date.now(), type: "info", message: `Java ${n} установлена: ${u}` }), u;
}
async function bd() {
  return await pn("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function aA(e, t, n) {
  var p, l, u, h, w, m, f, E, _;
  En = 0, yn = 0, Wt = [];
  const r = Eo(), i = k.join(r, "instances", e.instanceId), o = k.join(r, "assets"), s = k.join(r, "libraries"), a = k.join(r, "versions"), c = k.join(i, "natives");
  for (const y of [i, c])
    x.existsSync(y) || x.mkdirSync(y, { recursive: !0 });
  try {
    let y = e.javaPath, S = !1;
    if (y && x.existsSync(y))
      try {
        fs(`"${y}" -version 2>&1`, { stdio: "ignore" }), S = !0;
      } catch {
      }
    if (!S) {
      const N = await Nd();
      for (const H of N)
        try {
          fs(`"${H}" -version 2>&1`, { stdio: "ignore" }), y = H, S = !0;
          break;
        } catch {
        }
    }
    S || (y = await sA(t, n, Id(e.version))), n({ timestamp: Date.now(), type: "info", message: `Java: ${y}` }), t({ instanceId: e.instanceId, stage: "checking", statusText: "Проверка версии...", progress: 5 });
    const T = (await bd()).versions.find((N) => N.id === e.version);
    if (!T) throw new Error(`Версия ${e.version} не найдена на серверах Mojang`);
    const R = k.join(a, e.version, `${e.version}.json`);
    let b;
    if (x.existsSync(R))
      try {
        b = JSON.parse(x.readFileSync(R, "utf-8"));
      } catch {
        b = null;
      }
    else
      b = null;
    if (b || (t({ instanceId: e.instanceId, stage: "downloading", statusText: `Загрузка версии ${e.version}...`, progress: 10 }), b = await pn(T.url), x.existsSync(k.dirname(R)) || x.mkdirSync(k.dirname(R), { recursive: !0 }), x.writeFileSync(R, JSON.stringify(b, null, 2))), (p = b.assetIndex) != null && p.url) {
      const N = k.join(o, "indexes", `${b.assetIndex.id}.json`);
      x.existsSync(N) || (t({ instanceId: e.instanceId, stage: "downloading", statusText: "Загрузка манифеста ресурсов...", progress: 12 }), await St(b.assetIndex.url, N));
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
                (rn) => {
                  Se += rn;
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
      } catch (H) {
        n({ timestamp: Date.now(), type: "warn", message: `Ресурсы: ${qt(H, "не удалось загрузить")}` });
      }
    }
    const j = k.join(a, e.version, `${e.version}.jar`);
    if (!x.existsSync(j) && ((u = (l = b.downloads) == null ? void 0 : l.client) != null && u.url)) {
      const N = (H) => {
        yn += H;
        const W = Date.now();
        if (W - En > 500) {
          const U = yn / Math.max(1, (W - En) / 1e3);
          En = W, yn = 0, t({
            instanceId: e.instanceId,
            stage: "downloading",
            statusText: `Загрузка Minecraft ${e.version}.jar — ${(U / 1024 / 1024).toFixed(1)} МБ/с`,
            progress: 45
          });
        }
      };
      t({ instanceId: e.instanceId, stage: "downloading", statusText: `Загрузка Minecraft ${e.version}.jar...`, progress: 42 }), await St(b.downloads.client.url, j, N);
    }
    t({ instanceId: e.instanceId, stage: "downloading", statusText: "Загрузка библиотек...", progress: 50 });
    const B = [], P = b.libraries || [];
    let A = 0, Y = 0, K = 0;
    for (const N of P) {
      if (!oA(N.rules)) continue;
      if ((h = N.downloads) != null && h.artifact) {
        const W = N.downloads.artifact.path;
        if (!fr(W)) {
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
        x.existsSync(U) && (B.push(U), (W.includes("natives") || N.name.includes("natives")) && await cs(U, c));
      }
      if ((w = N.downloads) != null && w.classifiers) {
        const W = N.downloads.classifiers, U = process.platform === "win32" ? W["natives-windows"] || W["natives-windows-64"] || W["natives-windows-x86"] : process.platform === "darwin" ? W["natives-osx"] || W["natives-macos"] : W["natives-linux"];
        if (U) {
          const Q = U.path;
          if (!fr(Q)) continue;
          const re = k.join(s, Q);
          if (!x.existsSync(re))
            try {
              await St(U.url, re, (V) => {
                Y += V;
              });
            } catch {
            }
          x.existsSync(re) && await cs(re, c);
        }
      }
      if (!((m = N.downloads) != null && m.artifact) && N.name) {
        const W = N.name.split(":"), U = W[0].replace(/\./g, "/"), Q = W[1], re = W[2], V = `${U}/${Q}/${re}/${Q}-${re}.jar`;
        if (!fr(V)) continue;
        const ie = k.join(s, V), Se = N.url ? `${N.url}${V}` : `https://libraries.minecraft.net/${V}`;
        if (!x.existsSync(ie))
          try {
            await St(Se, ie, (le) => {
              Y += le;
            });
          } catch {
          }
        x.existsSync(ie) && (B.push(ie), N.name.includes("natives") && await cs(ie, c));
      }
      K++;
      const H = Date.now();
      if (H - A > 800 && Y > 0) {
        const W = Y / Math.max(1, (H - A) / 1e3);
        t({
          instanceId: e.instanceId,
          stage: "downloading",
          statusText: `Библиотеки ${K}/${P.length} — ${(W / 1024 / 1024).toFixed(1)} МБ/с`,
          progress: 50 + K / P.length * 15
        }), A = H, Y = 0;
      }
    }
    B.push(j);
    let te = b.mainClass || "net.minecraft.client.main.Main";
    const F = [];
    if (e.loader === "fabric") {
      t({ instanceId: e.instanceId, stage: "downloading", statusText: "Установка Fabric...", progress: 72 });
      try {
        const N = await pn(`https://meta.fabricmc.net/v2/versions/loader/${e.version}`);
        if (N != null && N.length) {
          const H = N[0].loader.version, W = await pn(
            `https://meta.fabricmc.net/v2/versions/loader/${e.version}/${H}/profile/json`
          );
          if (W.mainClass && (te = W.mainClass), W.libraries)
            for (const U of W.libraries) {
              const Q = U.name.split(":"), re = Q[0].replace(/\./g, "/"), V = Q[1], ie = Q[2], Se = `${re}/${V}/${ie}/${V}-${ie}.jar`;
              if (!fr(Se)) continue;
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
        throw new Error(`Ошибка загрузки Fabric: ${qt(N, "неизвестная ошибка")}`);
      }
    }
    if (e.loader === "quilt") {
      t({ instanceId: e.instanceId, stage: "downloading", statusText: "Установка Quilt...", progress: 72 });
      try {
        const N = await pn(`https://meta.quiltmc.org/v3/versions/loader/${e.version}`);
        if (N != null && N.length) {
          const H = N[0].loader.version, W = await pn(
            `https://meta.quiltmc.org/v3/versions/loader/${e.version}/${H}/profile/json`
          );
          if (W.mainClass && (te = W.mainClass), W.libraries)
            for (const U of W.libraries) {
              const Q = U.name.split(":"), re = Q[0].replace(/\./g, "/"), V = Q[1], ie = Q[2], Se = `${re}/${V}/${ie}/${V}-${ie}.jar`;
              if (!fr(Se)) continue;
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
        throw new Error(`Ошибка загрузки Quilt: ${qt(N, "неизвестная ошибка")}`);
      }
    }
    t({ instanceId: e.instanceId, stage: "launching", statusText: "Запуск игры...", progress: 92 });
    const O = B.join(k.delimiter), M = [];
    M.push(`-Xms${e.memoryMin || 1024}M`), M.push(`-Xmx${e.memoryMax || 4096}M`), (f = e.customJvmArgs) != null && f.includes("-Djava.library.path") || M.push(`-Djava.library.path=${c}`), M.push(
      "-XX:+UseG1GC",
      "-XX:+UnlockExperimentalVMOptions",
      "-XX:G1NewSizePercent=20",
      "-XX:G1ReservePercent=20",
      "-XX:MaxGCPauseMillis=50",
      "-XX:G1HeapRegionSize=32M"
    ), e.customJvmArgs && M.push(...e.customJvmArgs.split(" ").filter(Boolean)), F.push("-cp", O, te), M.push(...F);
    const $ = (e.uuid || Dd(e.username || "Player")).replace(/-/g, "");
    if (b.minecraftArguments && typeof b.minecraftArguments == "string")
      for (const N of b.minecraftArguments.split(" "))
        M.push(
          N.replace("${auth_player_name}", e.username || "Player").replace("${version_name}", `${e.version}-${e.loader}`).replace("${game_directory}", i).replace("${assets_root}", o).replace("${assets_index_name}", ((E = b.assetIndex) == null ? void 0 : E.id) || e.version).replace("${auth_uuid}", $).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", e.loader === "vanilla" ? "release" : "release/mod")
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
        ((_ = b.assetIndex) == null ? void 0 : _.id) || e.version,
        "--uuid",
        $,
        "--accessToken",
        "0",
        "--userType",
        "mojang",
        "--versionType",
        "release"
      );
    e.fullscreen && !M.includes("--fullscreen") && M.push("--fullscreen"), e.customGameArgs && M.push(...e.customGameArgs.split(" ").filter(Boolean)), n({ timestamp: Date.now(), type: "info", message: `Запуск: "${y}" ${M.slice(0, 8).join(" ")} ... [обрезано]` });
    const q = Gh(y || "javaw", M, {
      cwd: i,
      detached: !e.hideLauncher
    });
    yr.set(e.instanceId, q), q.stdout.on("data", (N) => {
      for (const H of N.toString().split(`
`))
        H.trim() && (zc(H), n({ timestamp: Date.now(), type: "info", message: H }));
    }), q.stderr.on("data", (N) => {
      for (const H of N.toString().split(`
`))
        H.trim() && (zc(H), n({ timestamp: Date.now(), type: "warn", message: H }));
    }), q.on("error", (N) => {
      yr.delete(e.instanceId);
      const H = qt(N, "не удалось запустить Java");
      t({
        instanceId: e.instanceId,
        stage: "error",
        statusText: `Ошибка запуска: ${H}`,
        progress: 0,
        error: H
      }), n({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${H}` });
    }), q.on("exit", (N) => {
      if (yr.delete(e.instanceId), N === 0)
        Wt = [], t({ instanceId: e.instanceId, stage: "idle", statusText: "", progress: 0 }), n({ timestamp: Date.now(), type: "info", message: "Minecraft завершён." });
      else {
        const H = iA(Wt);
        Wt = [], t({
          instanceId: e.instanceId,
          stage: "error",
          statusText: `Игра завершилась с ошибкой (код ${N}). ${H}`,
          progress: 0,
          error: `exit ${N}`
        }), n({ timestamp: Date.now(), type: "error", message: `Minecraft завершился с кодом ${N}. ${H}` });
      }
    }), t({ instanceId: e.instanceId, stage: "running", statusText: "Игра запущена!", progress: 100 });
  } catch (y) {
    const S = qt(y, "неизвестная ошибка");
    t({
      instanceId: e.instanceId,
      stage: "error",
      statusText: `Ошибка: ${S}`,
      progress: 0,
      error: S
    }), n({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${S}` });
  }
}
function Vc(e) {
  const t = yr.get(e);
  if (t) {
    try {
      t.pid ? process.kill(-t.pid, "SIGTERM") : t.kill();
    } catch {
      t.kill();
    }
    return yr.delete(e), !0;
  }
  return !1;
}
const Od = 64 * 1024 * 1024, Wc = 512 * 1024 * 1024, lA = Od;
function cA(e) {
  return {
    format: 1,
    name: e.name,
    version: e.version,
    loader: ["vanilla", "fabric", "quilt"].includes(e.loader) ? e.loader : "vanilla",
    exportedAt: Date.now()
  };
}
function uA(e) {
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
      if (t += r.size, t > Wc) throw new Error("Архив слишком большой");
      continue;
    }
    if (s[0] !== "mods" || s.length !== 2)
      throw new Error(`Неожиданный файл в архиве: ${o}`);
    if (!/\.jar(\.disabled)?$/i.test(s[1]))
      throw new Error(`В папке mods ожидаются только .jar: ${s[1]}`);
    if (r.size > Od)
      throw new Error(`Файл мода слишком большой: ${s[1]}`);
    if (t += r.size, t > Wc) throw new Error("Архив слишком большой");
    n.includes(s[1]) || n.push(s[1]);
  }
  if (!e.some((r) => (r.entryName || "").replace(/\\/g, "/").replace(/\/+$/, "") === "instance.json"))
    throw new Error("В архиве нет instance.json — это не сборка Mine Launcher");
  if (n.length === 0)
    throw new Error("В архиве нет модов — импортировать нечего");
  return n;
}
function fA(e) {
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
function dA(e, t) {
  const n = e.trim() || "Импортированная сборка";
  if (!t.includes(n)) return n;
  for (let r = 2; r < 100; r++) {
    const i = `${n} (${r})`;
    if (!t.includes(i)) return i;
  }
  return `${n} (${Date.now().toString(36)})`;
}
const hA = 2048;
function Rd(e) {
  try {
    const t = new URL(e);
    if (t.protocol !== "minelauncher:" || (t.hostname || t.pathname.replace(/^\/+/, "")) !== "import") return null;
    const r = t.searchParams.get("url");
    if (!r || r.length > hA) return null;
    const i = new URL(r);
    return i.protocol !== "https:" || i.username || i.password || !i.hostname ? null : { url: i.toString() };
  } catch {
    return null;
  }
}
function $d(e) {
  for (const t of e) {
    if (!/^minelauncher:\/\//i.test(t)) continue;
    const n = Rd(t);
    if (n) return n;
  }
  return null;
}
function bt(e) {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(e)) throw new Error("Некорректный id сборки");
  return e;
}
function _i(e) {
  if (!e || e.length > 255) throw new Error("Некорректное имя файла");
  if (e === "." || e === "..") throw new Error("Некорректное имя файла");
  if (/[\\/:*?"<>|\x00-\x1f]/.test(e)) throw new Error("Некорректное имя файла");
  return e;
}
Zc.setApplicationMenu(null);
Ge.requestSingleInstanceLock() || Ge.quit();
const Ld = k.dirname(Bh(import.meta.url));
process.env.APP_ROOT = k.join(Ld, "..");
const Xt = process.env.VITE_DEV_SERVER_URL, xd = k.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Xt ? k.join(process.env.APP_ROOT, "public") : xd;
Ge.setName("mine-launcher");
try {
  Xt ? Ge.setAsDefaultProtocolClient("minelauncher", process.execPath, [k.resolve(process.argv[1] || ".")]) : Ge.setAsDefaultProtocolClient("minelauncher");
} catch {
}
let G = null, it = null;
const Re = Eo(), Ii = k.join(Re, "accounts.json"), qn = k.join(Re, "instances.json"), bs = k.join(Re, "settings.json"), jt = k.join(Re, "skins");
function ga(e, t) {
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
let _e = ga(Ii, []), ge = ga(qn, []);
const Ea = Math.round(jh.totalmem() / 1024 / 1024), ya = Math.max(2048, Math.min(4096, Math.floor(Ea / 3)));
let Te = ga(bs, {
  javaPath: "",
  memoryMin: 1024,
  memoryMax: ya,
  customJvmArgs: "",
  closeLauncherOnGameStart: !1,
  fullscreen: !1,
  hideLauncher: !1
});
(!Te.memoryMax || Te.memoryMax > Ea * 0.85) && (Te.memoryMax = ya);
function yo() {
  G = new Kc({
    width: 1100,
    height: 740,
    minWidth: 940,
    minHeight: 660,
    frame: !1,
    titleBarStyle: "hidden",
    backgroundColor: "#111217",
    icon: k.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: k.join(Ld, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0,
      webSecurity: !0
    }
  }), Xt ? G.loadURL(Xt) : G.loadFile(k.join(xd, "index.html")), G.on("closed", () => {
    G = null;
  }), G.webContents.setWindowOpenHandler(() => ({ action: "deny" })), G.webContents.on("will-navigate", (e) => e.preventDefault());
}
function pA() {
  if (it) return it;
  const e = k.join(process.env.VITE_PUBLIC, "icon.png");
  let t = ka.createFromPath(e);
  t.isEmpty() && (t = ka.createEmpty()), it = new Uh(t), it.setToolTip("Mine Launcher"), it.on("click", () => {
    G == null || G.show();
  });
  const n = Zc.buildFromTemplate([
    { label: "Показать лаунчер", click: () => G == null ? void 0 : G.show() },
    { type: "separator" },
    { label: "Выход", click: () => Ge.quit() }
  ]);
  return it.setContextMenu(n), it;
}
function xn(e) {
  try {
    G == null || G.webContents.send("updater:state", e);
  } catch {
  }
}
function mA() {
  Xt || process.platform !== "linux" && (je.autoUpdater.autoDownload = !0, je.autoUpdater.autoInstallOnAppQuit = !0, je.autoUpdater.allowDowngrade = !1, je.autoUpdater.on("checking-for-update", () => {
    xn({ status: "checking" });
  }), je.autoUpdater.on("update-available", (e) => {
    xn({ status: "available", info: e });
    try {
      je.autoUpdater.downloadUpdate();
    } catch {
    }
  }), je.autoUpdater.on("update-not-available", (e) => {
    xn({ status: "not-available", info: e });
  }), je.autoUpdater.on("download-progress", (e) => {
    xn({
      status: "downloading",
      percent: e.percent,
      transferred: e.transferred,
      total: e.total,
      bytesPerSecond: e.bytesPerSecond
    });
  }), je.autoUpdater.on("update-downloaded", (e) => {
    xn({ status: "downloaded", info: e });
  }), je.autoUpdater.on("error", (e) => {
    xn({ status: "error", message: (e == null ? void 0 : e.message) || "Ошибка обновления" });
  }), setTimeout(() => {
    je.autoUpdater.checkForUpdates().catch(() => {
    });
  }, 4e3), setInterval(() => {
    je.autoUpdater.checkForUpdates().catch(() => {
    });
  }, 4 * 60 * 60 * 1e3));
}
function gA() {
  pA(), it == null || it.setToolTip("Mine Launcher — игра запущена"), G == null || G.hide();
}
Ge.on("second-instance", (e, t) => {
  G ? (G.isMinimized() && G.restore(), G.show(), G.focus()) : yo();
  const n = $d(t || []);
  n && Ud(n);
});
Ge.on("open-url", (e, t) => {
  e.preventDefault();
  const n = Rd(t);
  n && Ud(n);
});
Ge.on("window-all-closed", () => {
  process.platform !== "darwin" && Ge.quit(), G = null;
});
Ge.on("activate", () => {
  Kc.getAllWindows().length === 0 && yo();
});
function Os(e, t) {
  return new Promise((n, r) => {
    const i = k.dirname(t);
    x.existsSync(i) || x.mkdirSync(i, { recursive: !0 });
    const o = x.createWriteStream(t);
    (e.startsWith("https") ? Hi : $s).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (c) => {
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
const Yc = 600 * 1024 * 1024;
let ki = $d(process.argv);
function Pd(e, t, n = 0) {
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
    }, p = Hi.get(e, { headers: { "User-Agent": "MineLauncher/2.0" }, timeout: 2e4 }, (l) => {
      if (l.statusCode && l.statusCode >= 300 && l.statusCode < 400 && l.headers.location)
        return l.resume(), Pd(new URL(l.headers.location, e).toString(), t, n + 1).then(c).catch(a);
      if (l.statusCode !== 200)
        return l.resume(), a(new Error(`HTTP ${l.statusCode}`));
      if (Number(l.headers["content-length"] || 0) > Yc)
        return l.resume(), a(new Error("Архив больше 600 МБ — отказ"));
      const h = x.createWriteStream(t);
      let w = 0;
      l.on("data", (m) => {
        w += m.length, w > Yc && (l.destroy(), h.destroy(), x.rm(t, { force: !0 }, () => {
        }), a(new Error("Архив больше 600 МБ — отказ")));
      }), l.on("error", a), h.on("error", a), l.pipe(h), h.on("finish", () => h.close(c));
    });
    p.on("timeout", () => p.destroy(new Error("Таймаут загрузки"))), p.on("error", a);
  });
}
async function Fd(e) {
  G || yo();
  const t = new URL(e.url).hostname;
  if ((await Pn.showMessageBox(G, {
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
    await Pd(e.url, r);
    const i = kd(r);
    G == null || G.show(), G == null || G.focus(), G == null || G.webContents.send("deep-link:result", {
      ok: !0,
      message: "Сборка импортирована по ссылке",
      instances: i.instances,
      importedId: i.importedId
    });
  } catch (i) {
    G == null || G.webContents.send("deep-link:result", {
      ok: !1,
      message: qt(i, "Не удалось импортировать сборку")
    });
  } finally {
    x.rm(r, { force: !0 }, () => {
    });
  }
}
function Ud(e) {
  if (!Ge.isReady() || !G || G.webContents.isLoading()) {
    ki = e;
    return;
  }
  Fd(e).catch(() => {
  });
}
function Xc() {
  const e = ki;
  !e || !G || (ki = null, Fd(e).catch(() => {
  }));
}
function us(e, t) {
  const n = k.relative(k.resolve(e), k.resolve(t));
  return n !== "" && !n.startsWith("..") && !k.isAbsolute(n);
}
function kd(e) {
  if (x.statSync(e).size > 600 * 1024 * 1024) throw new Error("Архив больше 600 МБ — отказ");
  const n = new go(e), r = n.getEntries().filter((u) => !u.isDirectory), i = uA(
    r.map((u) => ({ entryName: u.entryName, size: u.header.size }))
  ), o = n.getEntry("instance.json");
  if (!o) throw new Error("В архиве нет instance.json");
  const s = fA(JSON.parse(o.getData().toString("utf-8"))), a = "inst-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), c = {
    id: a,
    name: dA(s.name, ge.map((u) => u.name)),
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
      if (m.length > lA)
        throw new Error(`Файл мода распаковался больше лимита: ${h}`);
      x.writeFileSync(k.join(l, h), m);
    }
    x.mkdirSync(k.join(p, "saves"), { recursive: !0 });
  } catch (u) {
    throw x.rmSync(p, { recursive: !0, force: !0 }), u;
  }
  return ge.push(c), vt(qn, ge), { instances: ge, importedId: a };
}
function EA() {
  ne.handle("minimize-window", () => {
    G == null || G.minimize();
  }), ne.handle("maximize-window", () => G ? G.isMaximized() ? (G.unmaximize(), !1) : (G.maximize(), !0) : !1), ne.handle("close-window", () => {
    G == null || G.close();
  }), ne.handle("is-maximized", () => (G == null ? void 0 : G.isMaximized()) || !1), ne.handle("get-accounts", () => _e), ne.handle("add-account", (e, t) => {
    const n = t.trim();
    if (!n) throw new Error("Введите никнейм");
    if (n.length > 16) throw new Error("Никнейм слишком длинный (максимум 16 символов)");
    if (!/^[a-zA-Z0-9_]+$/.test(n)) throw new Error("Допустимы только латинские буквы, цифры и знак _");
    if (_e.some((i) => i.username.toLowerCase() === n.toLowerCase()))
      throw new Error(`Аккаунт «${n}» уже добавлен`);
    const r = {
      id: Date.now().toString(),
      username: n,
      uuid: Dd(n),
      type: "offline",
      isActive: _e.length === 0,
      createdAt: Date.now()
    };
    return _e.push(r), vt(Ii, _e), _e;
  }), ne.handle("set-active-account", (e, t) => (_e = _e.map((n) => ({ ...n, isActive: n.id === t })), vt(Ii, _e), _e)), ne.handle("delete-account", (e, t) => (_e = _e.filter((n) => n.id !== t), _e.length > 0 && !_e.some((n) => n.isActive) && (_e[0].isActive = !0), vt(Ii, _e), _e)), ne.handle("get-instances", () => ge), ne.handle("create-instance", (e, t) => {
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
    ge.push(n), vt(qn, ge);
    for (const r of ["mods", "saves"]) {
      const i = k.join(Re, "instances", n.id, r);
      x.existsSync(i) || x.mkdirSync(i, { recursive: !0 });
    }
    return ge;
  }), ne.handle("rename-instance", (e, { id: t, name: n }) => {
    const r = ge.find((i) => i.id === t);
    if (!r) throw new Error("Сборка не найдена");
    return r.name = n.trim(), vt(qn, ge), ge;
  }), ne.handle("delete-instance", (e, t) => {
    bt(t);
    const n = ge.find((r) => r.id === t);
    return ge = ge.filter((r) => r.id !== t), vt(qn, ge), n && x.existsSync(k.join(Re, "instances", t)) && G && Pn.showMessageBox(G, {
      type: "question",
      buttons: ["Удалить", "Отмена"],
      defaultId: 1,
      title: "Удалить сборку?",
      message: `Удалить сборку «${n.name}» вместе с мирами, модами и файлами игры?`
    }).then(({ response: r }) => {
      r === 0 && x.rmSync(k.join(Re, "instances", t), { recursive: !0, force: !0 });
    }), ge;
  }), ne.handle("export-instance", async (e, t) => {
    bt(t);
    const n = ge.find((c) => c.id === t);
    if (!n) throw new Error("Сборка не найдена");
    const r = k.join(Re, "instances", t, "mods"), i = x.existsSync(r) ? x.readdirSync(r).filter((c) => /\.jar(\.disabled)?$/i.test(c)) : [];
    if (i.length === 0) throw new Error("В этой сборке нет модов — делиться нечем");
    const o = (n.name || "instance").replace(/[\\/:*?"<>|]/g, "_").trim() || "instance", s = G ? await Pn.showSaveDialog(G, {
      title: "Экспорт сборки",
      defaultPath: k.join(Ge.getPath("documents"), `${o}.zip`),
      filters: [{ name: "Сборка Mine Launcher", extensions: ["zip"] }]
    }) : { canceled: !0, filePath: void 0 };
    if (s.canceled || !s.filePath) return { ok: !1, canceled: !0 };
    const a = new go();
    a.addFile("instance.json", Buffer.from(JSON.stringify(cA(n), null, 2), "utf-8"));
    for (const c of i)
      a.addLocalFile(k.join(r, c), "mods");
    return a.writeZip(s.filePath), { ok: !0, path: s.filePath };
  }), ne.handle("import-instance", async () => {
    const e = G ? await Pn.showOpenDialog(G, {
      title: "Импорт сборки",
      properties: ["openFile"],
      filters: [{ name: "Сборка Mine Launcher", extensions: ["zip"] }]
    }) : { canceled: !0, filePaths: [] };
    return e.canceled || e.filePaths.length === 0 ? { ok: !1, canceled: !0 } : { ok: !0, ...kd(e.filePaths[0]) };
  }), ne.handle("get-versions", async () => {
    try {
      return await bd();
    } catch {
      return { latest: { release: "", snapshot: "" }, versions: [] };
    }
  }), ne.handle("get-settings", () => Te), ne.handle("set-selected-instance-id", (e, t) => (Te.selectedInstanceId = t, vt(bs, Te), !0)), ne.handle("save-settings", (e, t) => (Te = { ...Te, ...t }, vt(bs, Te), Te)), ne.handle("detect-java", async () => Nd()), ne.handle("get-required-java", (e, t) => Id(t)), ne.handle("open-launcher-folder", () => Ua.openPath(Re)), ne.handle("launch-instance", async (e, t) => {
    bt(t);
    const n = ge.find((i) => i.id === t);
    if (!n) throw new Error("Сборка не найдена");
    const r = _e.find((i) => i.isActive) || _e[0];
    if (!r) throw new Error("Сначала добавьте аккаунт на панели слева");
    return Vc(t) && await new Promise((i) => setTimeout(i, 500)), G == null || G.show(), aA(
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
          o && (o.lastPlayed = Date.now(), vt(qn, ge)), Te.closeLauncherOnGameStart && setTimeout(() => {
            try {
              gA();
            } catch {
            }
          }, 3e3);
        }
        ((i == null ? void 0 : i.stage) === "idle" || (i == null ? void 0 : i.stage) === "error") && (it == null || it.setToolTip("Mine Launcher")), G == null || G.webContents.send("launch-progress", i);
      },
      (i) => G == null ? void 0 : G.webContents.send("game-log", i)
    ), !0;
  }), ne.handle("stop-instance", (e, t) => Vc(t)), ne.handle("restore-window", () => (G == null || G.show(), !0)), ne.handle("get-system-info", () => ({
    totalRamMb: Ea,
    defaultMaxMemory: ya
  })), ne.handle("open-instance-folder", (e, t) => {
    bt(t);
    const n = k.join(Re, "instances", t);
    x.existsSync(n) || x.mkdirSync(n, { recursive: !0 }), Ua.openPath(n);
  }), ne.handle("get-instance-mods", (e, t) => {
    bt(t);
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
    bt(t);
    const r = k.join(Re, "instances", t, "mods"), i = k.join(r, _i(n));
    if (!us(r, i) || !x.existsSync(i)) return !1;
    const o = n.endsWith(".jar") ? n + ".disabled" : n.replace(/\.disabled$/, ""), s = k.join(r, _i(o));
    return us(r, s) ? (x.renameSync(i, s), !0) : !1;
  }), ne.handle("delete-mod", (e, { instanceId: t, modFilename: n }) => {
    bt(t);
    const r = k.join(Re, "instances", t, "mods"), i = k.join(r, _i(n));
    return us(r, i) ? (x.existsSync(i) && x.unlinkSync(i), !0) : !1;
  }), ne.handle("download-mod-file", async (e, { instanceId: t, downloadUrl: n, filename: r }) => {
    bt(t);
    const i = _i(r);
    if (!n.startsWith("https://cdn.modrinth.com/")) throw new Error("Недопустимый источник файла");
    const o = k.join(Re, "instances", t, "mods");
    return x.existsSync(o) || x.mkdirSync(o, { recursive: !0 }), await Os(n, k.join(o, i)), !0;
  }), ne.handle("add-mod-file", async (e, t) => {
    if (bt(t), !G) return !1;
    const n = await Pn.showOpenDialog(G, {
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
    if (!G) return null;
    const n = await Pn.showOpenDialog(G, {
      title: "Выберите скин Minecraft (.png)",
      filters: [{ name: "Minecraft Skin (*.png)", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (n.canceled || !n.filePaths.length) return null;
    x.existsSync(jt) || x.mkdirSync(jt, { recursive: !0 });
    const r = k.join(jt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`);
    return x.copyFileSync(n.filePaths[0], r), G.webContents.send("accounts-updated", _e), r;
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
    if (!x.existsSync(n)) return null;
    try {
      return `data:image/png;base64,${x.readFileSync(n).toString("base64")}`;
    } catch {
      return null;
    }
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
    if (Xt) return { status: "dev" };
    try {
      return await je.autoUpdater.checkForUpdates(), { ok: !0 };
    } catch (e) {
      return { ok: !1, message: qt(e, "Не удалось проверить обновления") };
    }
  }), ne.handle("updater:download", async () => {
    if (Xt) return { status: "dev" };
    try {
      return await je.autoUpdater.downloadUpdate(), { ok: !0 };
    } catch (e) {
      return { ok: !1, message: qt(e, "Не удалось скачать обновление") };
    }
  }), ne.handle("updater:install", () => {
    if (Xt) return !1;
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
  EA(), yo(), mA(), ki && (G != null && G.webContents.isLoading() ? G.webContents.once("did-finish-load", () => setTimeout(Xc, 600)) : setTimeout(Xc, 600));
});
export {
  xd as RENDERER_DIST,
  Xt as VITE_DEV_SERVER_URL
};
