import wn, { app as ht, Menu as Wc, BrowserWindow as Yc, ipcMain as ne, dialog as sr, shell as Pa, nativeImage as Fa, Tray as Dh } from "electron";
import xt from "fs";
import Nh from "constants";
import xr from "stream";
import Ds from "util";
import Xc from "assert";
import fe from "path";
import ki from "child_process";
import Jc from "events";
import Xn from "crypto";
import Zc from "tty";
import Mi from "os";
import Kt from "url";
import Bi from "zlib";
import Oh from "http";
import { fileURLToPath as bh } from "node:url";
import M from "node:path";
import P from "node:fs";
import Rh from "node:os";
import Ns from "node:https";
import Os from "node:http";
import $h from "node:crypto";
import { execSync as as, spawn as Lh } from "node:child_process";
var ze = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function xh(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var je = {}, vn = {}, We = {};
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
var Mt = Nh, Ph = process.cwd, _i = null, Fh = process.env.GRACEFUL_FS_PLATFORM || process.platform;
process.cwd = function() {
  return _i || (_i = Ph.call(process)), _i;
};
try {
  process.cwd();
} catch {
}
if (typeof process.chdir == "function") {
  var Ua = process.chdir;
  process.chdir = function(e) {
    _i = null, Ua.call(process, e);
  }, Object.setPrototypeOf && Object.setPrototypeOf(process.chdir, Ua);
}
var Uh = kh;
function kh(e) {
  Mt.hasOwnProperty("O_SYMLINK") && process.version.match(/^v0\.6\.[0-2]|^v0\.5\./) && t(e), e.lutimes || n(e), e.chown = o(e.chown), e.fchown = o(e.fchown), e.lchown = o(e.lchown), e.chmod = r(e.chmod), e.fchmod = r(e.fchmod), e.lchmod = r(e.lchmod), e.chownSync = s(e.chownSync), e.fchownSync = s(e.fchownSync), e.lchownSync = s(e.lchownSync), e.chmodSync = i(e.chmodSync), e.fchmodSync = i(e.fchmodSync), e.lchmodSync = i(e.lchmodSync), e.stat = a(e.stat), e.fstat = a(e.fstat), e.lstat = a(e.lstat), e.statSync = l(e.statSync), e.fstatSync = l(e.fstatSync), e.lstatSync = l(e.lstatSync), e.chmod && !e.lchmod && (e.lchmod = function(c, u, h) {
    h && process.nextTick(h);
  }, e.lchmodSync = function() {
  }), e.chown && !e.lchown && (e.lchown = function(c, u, h, w) {
    w && process.nextTick(w);
  }, e.lchownSync = function() {
  }), Fh === "win32" && (e.rename = typeof e.rename != "function" ? e.rename : function(c) {
    function u(h, w, p) {
      var f = Date.now(), y = 0;
      c(h, w, function _(E) {
        if (E && (E.code === "EACCES" || E.code === "EPERM" || E.code === "EBUSY") && Date.now() - f < 6e4) {
          setTimeout(function() {
            e.stat(w, function(S, T) {
              S && S.code === "ENOENT" ? c(h, w, _) : p(E);
            });
          }, y), y < 100 && (y += 10);
          return;
        }
        p && p(E);
      });
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, c), u;
  }(e.rename)), e.read = typeof e.read != "function" ? e.read : function(c) {
    function u(h, w, p, f, y, _) {
      var E;
      if (_ && typeof _ == "function") {
        var S = 0;
        E = function(T, R, O) {
          if (T && T.code === "EAGAIN" && S < 10)
            return S++, c.call(e, h, w, p, f, y, E);
          _.apply(this, arguments);
        };
      }
      return c.call(e, h, w, p, f, y, E);
    }
    return Object.setPrototypeOf && Object.setPrototypeOf(u, c), u;
  }(e.read), e.readSync = typeof e.readSync != "function" ? e.readSync : /* @__PURE__ */ function(c) {
    return function(u, h, w, p, f) {
      for (var y = 0; ; )
        try {
          return c.call(e, u, h, w, p, f);
        } catch (_) {
          if (_.code === "EAGAIN" && y < 10) {
            y++;
            continue;
          }
          throw _;
        }
    };
  }(e.readSync);
  function t(c) {
    c.lchmod = function(u, h, w) {
      c.open(
        u,
        Mt.O_WRONLY | Mt.O_SYMLINK,
        h,
        function(p, f) {
          if (p) {
            w && w(p);
            return;
          }
          c.fchmod(f, h, function(y) {
            c.close(f, function(_) {
              w && w(y || _);
            });
          });
        }
      );
    }, c.lchmodSync = function(u, h) {
      var w = c.openSync(u, Mt.O_WRONLY | Mt.O_SYMLINK, h), p = !0, f;
      try {
        f = c.fchmodSync(w, h), p = !1;
      } finally {
        if (p)
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
    Mt.hasOwnProperty("O_SYMLINK") && c.futimes ? (c.lutimes = function(u, h, w, p) {
      c.open(u, Mt.O_SYMLINK, function(f, y) {
        if (f) {
          p && p(f);
          return;
        }
        c.futimes(y, h, w, function(_) {
          c.close(y, function(E) {
            p && p(_ || E);
          });
        });
      });
    }, c.lutimesSync = function(u, h, w) {
      var p = c.openSync(u, Mt.O_SYMLINK), f, y = !0;
      try {
        f = c.futimesSync(p, h, w), y = !1;
      } finally {
        if (y)
          try {
            c.closeSync(p);
          } catch {
          }
        else
          c.closeSync(p);
      }
      return f;
    }) : c.futimes && (c.lutimes = function(u, h, w, p) {
      p && process.nextTick(p);
    }, c.lutimesSync = function() {
    });
  }
  function r(c) {
    return c && function(u, h, w) {
      return c.call(e, u, h, function(p) {
        m(p) && (p = null), w && w.apply(this, arguments);
      });
    };
  }
  function i(c) {
    return c && function(u, h) {
      try {
        return c.call(e, u, h);
      } catch (w) {
        if (!m(w)) throw w;
      }
    };
  }
  function o(c) {
    return c && function(u, h, w, p) {
      return c.call(e, u, h, w, function(f) {
        m(f) && (f = null), p && p.apply(this, arguments);
      });
    };
  }
  function s(c) {
    return c && function(u, h, w) {
      try {
        return c.call(e, u, h, w);
      } catch (p) {
        if (!m(p)) throw p;
      }
    };
  }
  function a(c) {
    return c && function(u, h, w) {
      typeof h == "function" && (w = h, h = null);
      function p(f, y) {
        y && (y.uid < 0 && (y.uid += 4294967296), y.gid < 0 && (y.gid += 4294967296)), w && w.apply(this, arguments);
      }
      return h ? c.call(e, u, h, p) : c.call(e, u, p);
    };
  }
  function l(c) {
    return c && function(u, h) {
      var w = h ? c.call(e, u, h) : c.call(e, u);
      return w && (w.uid < 0 && (w.uid += 4294967296), w.gid < 0 && (w.gid += 4294967296)), w;
    };
  }
  function m(c) {
    if (!c || c.code === "ENOSYS")
      return !0;
    var u = !process.getuid || process.getuid() !== 0;
    return !!(u && (c.code === "EINVAL" || c.code === "EPERM"));
  }
}
var ka = xr.Stream, Mh = Bh;
function Bh(e) {
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
      var m = s[a];
      this[m] = i[m];
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
var jh = Gh, Hh = Object.getPrototypeOf || function(e) {
  return e.__proto__;
};
function Gh(e) {
  if (e === null || typeof e != "object")
    return e;
  if (e instanceof Object)
    var t = { __proto__: Hh(e) };
  else
    var t = /* @__PURE__ */ Object.create(null);
  return Object.getOwnPropertyNames(e).forEach(function(n) {
    Object.defineProperty(t, n, Object.getOwnPropertyDescriptor(e, n));
  }), t;
}
var Ee = xt, qh = Uh, zh = Mh, Vh = jh, ni = Ds, Pe, Ci;
typeof Symbol == "function" && typeof Symbol.for == "function" ? (Pe = Symbol.for("graceful-fs.queue"), Ci = Symbol.for("graceful-fs.previous")) : (Pe = "___graceful-fs.queue", Ci = "___graceful-fs.previous");
function Wh() {
}
function Kc(e, t) {
  Object.defineProperty(e, Pe, {
    get: function() {
      return t;
    }
  });
}
var En = Wh;
ni.debuglog ? En = ni.debuglog("gfs4") : /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && (En = function() {
  var e = ni.format.apply(ni, arguments);
  e = "GFS4: " + e.split(/\n/).join(`
GFS4: `), console.error(e);
});
if (!Ee[Pe]) {
  var Yh = ze[Pe] || [];
  Kc(Ee, Yh), Ee.close = function(e) {
    function t(n, r) {
      return e.call(Ee, n, function(i) {
        i || Ma(), typeof r == "function" && r.apply(this, arguments);
      });
    }
    return Object.defineProperty(t, Ci, {
      value: e
    }), t;
  }(Ee.close), Ee.closeSync = function(e) {
    function t(n) {
      e.apply(Ee, arguments), Ma();
    }
    return Object.defineProperty(t, Ci, {
      value: e
    }), t;
  }(Ee.closeSync), /\bgfs4\b/i.test(process.env.NODE_DEBUG || "") && process.on("exit", function() {
    En(Ee[Pe]), Xc.equal(Ee[Pe].length, 0);
  });
}
ze[Pe] || Kc(ze, Ee[Pe]);
var Ye = bs(Vh(Ee));
process.env.TEST_GRACEFUL_FS_GLOBAL_PATCH && !Ee.__patched && (Ye = bs(Ee), Ee.__patched = !0);
function bs(e) {
  qh(e), e.gracefulify = bs, e.createReadStream = R, e.createWriteStream = O;
  var t = e.readFile;
  e.readFile = n;
  function n(x, A, W) {
    return typeof A == "function" && (W = A, A = null), K(x, A, W);
    function K(te, F, b, k) {
      return t(te, F, function($) {
        $ && ($.code === "EMFILE" || $.code === "ENFILE") ? Nn([K, [te, F, b], $, k || Date.now(), Date.now()]) : typeof b == "function" && b.apply(this, arguments);
      });
    }
  }
  var r = e.writeFile;
  e.writeFile = i;
  function i(x, A, W, K) {
    return typeof W == "function" && (K = W, W = null), te(x, A, W, K);
    function te(F, b, k, $, H) {
      return r(F, b, k, function(N) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? Nn([te, [F, b, k, $], N, H || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  var o = e.appendFile;
  o && (e.appendFile = s);
  function s(x, A, W, K) {
    return typeof W == "function" && (K = W, W = null), te(x, A, W, K);
    function te(F, b, k, $, H) {
      return o(F, b, k, function(N) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? Nn([te, [F, b, k, $], N, H || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  var a = e.copyFile;
  a && (e.copyFile = l);
  function l(x, A, W, K) {
    return typeof W == "function" && (K = W, W = 0), te(x, A, W, K);
    function te(F, b, k, $, H) {
      return a(F, b, k, function(N) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? Nn([te, [F, b, k, $], N, H || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  var m = e.readdir;
  e.readdir = u;
  var c = /^v[0-5]\./;
  function u(x, A, W) {
    typeof A == "function" && (W = A, A = null);
    var K = c.test(process.version) ? function(b, k, $, H) {
      return m(b, te(
        b,
        k,
        $,
        H
      ));
    } : function(b, k, $, H) {
      return m(b, k, te(
        b,
        k,
        $,
        H
      ));
    };
    return K(x, A, W);
    function te(F, b, k, $) {
      return function(H, N) {
        H && (H.code === "EMFILE" || H.code === "ENFILE") ? Nn([
          K,
          [F, b, k],
          H,
          $ || Date.now(),
          Date.now()
        ]) : (N && N.sort && N.sort(), typeof k == "function" && k.call(this, H, N));
      };
    }
  }
  if (process.version.substr(0, 4) === "v0.8") {
    var h = zh(e);
    _ = h.ReadStream, S = h.WriteStream;
  }
  var w = e.ReadStream;
  w && (_.prototype = Object.create(w.prototype), _.prototype.open = E);
  var p = e.WriteStream;
  p && (S.prototype = Object.create(p.prototype), S.prototype.open = T), Object.defineProperty(e, "ReadStream", {
    get: function() {
      return _;
    },
    set: function(x) {
      _ = x;
    },
    enumerable: !0,
    configurable: !0
  }), Object.defineProperty(e, "WriteStream", {
    get: function() {
      return S;
    },
    set: function(x) {
      S = x;
    },
    enumerable: !0,
    configurable: !0
  });
  var f = _;
  Object.defineProperty(e, "FileReadStream", {
    get: function() {
      return f;
    },
    set: function(x) {
      f = x;
    },
    enumerable: !0,
    configurable: !0
  });
  var y = S;
  Object.defineProperty(e, "FileWriteStream", {
    get: function() {
      return y;
    },
    set: function(x) {
      y = x;
    },
    enumerable: !0,
    configurable: !0
  });
  function _(x, A) {
    return this instanceof _ ? (w.apply(this, arguments), this) : _.apply(Object.create(_.prototype), arguments);
  }
  function E() {
    var x = this;
    B(x.path, x.flags, x.mode, function(A, W) {
      A ? (x.autoClose && x.destroy(), x.emit("error", A)) : (x.fd = W, x.emit("open", W), x.read());
    });
  }
  function S(x, A) {
    return this instanceof S ? (p.apply(this, arguments), this) : S.apply(Object.create(S.prototype), arguments);
  }
  function T() {
    var x = this;
    B(x.path, x.flags, x.mode, function(A, W) {
      A ? (x.destroy(), x.emit("error", A)) : (x.fd = W, x.emit("open", W));
    });
  }
  function R(x, A) {
    return new e.ReadStream(x, A);
  }
  function O(x, A) {
    return new e.WriteStream(x, A);
  }
  var j = e.open;
  e.open = B;
  function B(x, A, W, K) {
    return typeof W == "function" && (K = W, W = null), te(x, A, W, K);
    function te(F, b, k, $, H) {
      return j(F, b, k, function(N, G) {
        N && (N.code === "EMFILE" || N.code === "ENFILE") ? Nn([te, [F, b, k, $], N, H || Date.now(), Date.now()]) : typeof $ == "function" && $.apply(this, arguments);
      });
    }
  }
  return e;
}
function Nn(e) {
  En("ENQUEUE", e[0].name, e[1]), Ee[Pe].push(e), Rs();
}
var ri;
function Ma() {
  for (var e = Date.now(), t = 0; t < Ee[Pe].length; ++t)
    Ee[Pe][t].length > 2 && (Ee[Pe][t][3] = e, Ee[Pe][t][4] = e);
  Rs();
}
function Rs() {
  if (clearTimeout(ri), ri = void 0, Ee[Pe].length !== 0) {
    var e = Ee[Pe].shift(), t = e[0], n = e[1], r = e[2], i = e[3], o = e[4];
    if (i === void 0)
      En("RETRY", t.name, n), t.apply(null, n);
    else if (Date.now() - i >= 6e4) {
      En("TIMEOUT", t.name, n);
      var s = n.pop();
      typeof s == "function" && s.call(null, r);
    } else {
      var a = Date.now() - o, l = Math.max(o - i, 1), m = Math.min(l * 1.2, 100);
      a >= m ? (En("RETRY", t.name, n), t.apply(null, n.concat([i]))) : Ee[Pe].push(e);
    }
    ri === void 0 && (ri = setTimeout(Rs, 0));
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
  }, e.read = function(i, o, s, a, l, m) {
    return typeof m == "function" ? n.read(i, o, s, a, l, m) : new Promise((c, u) => {
      n.read(i, o, s, a, l, (h, w, p) => {
        if (h) return u(h);
        c({ bytesRead: w, buffer: p });
      });
    });
  }, e.write = function(i, o, ...s) {
    return typeof s[s.length - 1] == "function" ? n.write(i, o, ...s) : new Promise((a, l) => {
      n.write(i, o, ...s, (m, c, u) => {
        if (m) return l(m);
        a({ bytesWritten: c, buffer: u });
      });
    });
  }, typeof n.writev == "function" && (e.writev = function(i, o, ...s) {
    return typeof s[s.length - 1] == "function" ? n.writev(i, o, ...s) : new Promise((a, l) => {
      n.writev(i, o, ...s, (m, c, u) => {
        if (m) return l(m);
        a({ bytesWritten: c, buffers: u });
      });
    });
  }), typeof n.realpath.native == "function" ? e.realpath.native = t(n.realpath.native) : process.emitWarning(
    "fs.realpath.native is not a function. Is fs being monkey-patched?",
    "Warning",
    "fs-extra-WARN0003"
  );
})(vn);
var $s = {}, Qc = {};
const Xh = fe;
Qc.checkPath = function(t) {
  if (process.platform === "win32" && /[<>:"|?*]/.test(t.replace(Xh.parse(t).root, ""))) {
    const r = new Error(`Path contains invalid characters: ${t}`);
    throw r.code = "EINVAL", r;
  }
};
const eu = vn, { checkPath: tu } = Qc, nu = (e) => {
  const t = { mode: 511 };
  return typeof e == "number" ? e : { ...t, ...e }.mode;
};
$s.makeDir = async (e, t) => (tu(e), eu.mkdir(e, {
  mode: nu(t),
  recursive: !0
}));
$s.makeDirSync = (e, t) => (tu(e), eu.mkdirSync(e, {
  mode: nu(t),
  recursive: !0
}));
const Jh = We.fromPromise, { makeDir: Zh, makeDirSync: So } = $s, Ao = Jh(Zh);
var It = {
  mkdirs: Ao,
  mkdirsSync: So,
  // alias
  mkdirp: Ao,
  mkdirpSync: So,
  ensureDir: Ao,
  ensureDirSync: So
};
const Kh = We.fromPromise, ru = vn;
function Qh(e) {
  return ru.access(e).then(() => !0).catch(() => !1);
}
var Sn = {
  pathExists: Kh(Qh),
  pathExistsSync: ru.existsSync
};
const Gn = Ye;
function ep(e, t, n, r) {
  Gn.open(e, "r+", (i, o) => {
    if (i) return r(i);
    Gn.futimes(o, t, n, (s) => {
      Gn.close(o, (a) => {
        r && r(s || a);
      });
    });
  });
}
function tp(e, t, n) {
  const r = Gn.openSync(e, "r+");
  return Gn.futimesSync(r, t, n), Gn.closeSync(r);
}
var iu = {
  utimesMillis: ep,
  utimesMillisSync: tp
};
const zn = vn, $e = fe, np = Ds;
function rp(e, t, n) {
  const r = n.dereference ? (i) => zn.stat(i, { bigint: !0 }) : (i) => zn.lstat(i, { bigint: !0 });
  return Promise.all([
    r(e),
    r(t).catch((i) => {
      if (i.code === "ENOENT") return null;
      throw i;
    })
  ]).then(([i, o]) => ({ srcStat: i, destStat: o }));
}
function ip(e, t, n) {
  let r;
  const i = n.dereference ? (s) => zn.statSync(s, { bigint: !0 }) : (s) => zn.lstatSync(s, { bigint: !0 }), o = i(e);
  try {
    r = i(t);
  } catch (s) {
    if (s.code === "ENOENT") return { srcStat: o, destStat: null };
    throw s;
  }
  return { srcStat: o, destStat: r };
}
function op(e, t, n, r, i) {
  np.callbackify(rp)(e, t, r, (o, s) => {
    if (o) return i(o);
    const { srcStat: a, destStat: l } = s;
    if (l) {
      if (Pr(a, l)) {
        const m = $e.basename(e), c = $e.basename(t);
        return n === "move" && m !== c && m.toLowerCase() === c.toLowerCase() ? i(null, { srcStat: a, destStat: l, isChangingCase: !0 }) : i(new Error("Source and destination must not be the same."));
      }
      if (a.isDirectory() && !l.isDirectory())
        return i(new Error(`Cannot overwrite non-directory '${t}' with directory '${e}'.`));
      if (!a.isDirectory() && l.isDirectory())
        return i(new Error(`Cannot overwrite directory '${t}' with non-directory '${e}'.`));
    }
    return a.isDirectory() && Ls(e, t) ? i(new Error(ji(e, t, n))) : i(null, { srcStat: a, destStat: l });
  });
}
function sp(e, t, n, r) {
  const { srcStat: i, destStat: o } = ip(e, t, r);
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
  if (i.isDirectory() && Ls(e, t))
    throw new Error(ji(e, t, n));
  return { srcStat: i, destStat: o };
}
function ou(e, t, n, r, i) {
  const o = $e.resolve($e.dirname(e)), s = $e.resolve($e.dirname(n));
  if (s === o || s === $e.parse(s).root) return i();
  zn.stat(s, { bigint: !0 }, (a, l) => a ? a.code === "ENOENT" ? i() : i(a) : Pr(t, l) ? i(new Error(ji(e, n, r))) : ou(e, t, s, r, i));
}
function su(e, t, n, r) {
  const i = $e.resolve($e.dirname(e)), o = $e.resolve($e.dirname(n));
  if (o === i || o === $e.parse(o).root) return;
  let s;
  try {
    s = zn.statSync(o, { bigint: !0 });
  } catch (a) {
    if (a.code === "ENOENT") return;
    throw a;
  }
  if (Pr(t, s))
    throw new Error(ji(e, n, r));
  return su(e, t, o, r);
}
function Pr(e, t) {
  return t.ino && t.dev && t.ino === e.ino && t.dev === e.dev;
}
function Ls(e, t) {
  const n = $e.resolve(e).split($e.sep).filter((i) => i), r = $e.resolve(t).split($e.sep).filter((i) => i);
  return n.reduce((i, o, s) => i && r[s] === o, !0);
}
function ji(e, t, n) {
  return `Cannot ${n} '${e}' to a subdirectory of itself, '${t}'.`;
}
var Jn = {
  checkPaths: op,
  checkPathsSync: sp,
  checkParentPaths: ou,
  checkParentPathsSync: su,
  isSrcSubdir: Ls,
  areIdentical: Pr
};
const Ze = Ye, yr = fe, ap = It.mkdirs, lp = Sn.pathExists, cp = iu.utimesMillis, wr = Jn;
function up(e, t, n, r) {
  typeof n == "function" && !r ? (r = n, n = {}) : typeof n == "function" && (n = { filter: n }), r = r || function() {
  }, n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0001"
  ), wr.checkPaths(e, t, "copy", n, (i, o) => {
    if (i) return r(i);
    const { srcStat: s, destStat: a } = o;
    wr.checkParentPaths(e, s, t, "copy", (l) => l ? r(l) : n.filter ? au(Ba, a, e, t, n, r) : Ba(a, e, t, n, r));
  });
}
function Ba(e, t, n, r, i) {
  const o = yr.dirname(n);
  lp(o, (s, a) => {
    if (s) return i(s);
    if (a) return Di(e, t, n, r, i);
    ap(o, (l) => l ? i(l) : Di(e, t, n, r, i));
  });
}
function au(e, t, n, r, i, o) {
  Promise.resolve(i.filter(n, r)).then((s) => s ? e(t, n, r, i, o) : o(), (s) => o(s));
}
function fp(e, t, n, r, i) {
  return r.filter ? au(Di, e, t, n, r, i) : Di(e, t, n, r, i);
}
function Di(e, t, n, r, i) {
  (r.dereference ? Ze.stat : Ze.lstat)(t, (s, a) => s ? i(s) : a.isDirectory() ? yp(a, e, t, n, r, i) : a.isFile() || a.isCharacterDevice() || a.isBlockDevice() ? dp(a, e, t, n, r, i) : a.isSymbolicLink() ? vp(e, t, n, r, i) : a.isSocket() ? i(new Error(`Cannot copy a socket file: ${t}`)) : a.isFIFO() ? i(new Error(`Cannot copy a FIFO pipe: ${t}`)) : i(new Error(`Unknown file: ${t}`)));
}
function dp(e, t, n, r, i, o) {
  return t ? hp(e, n, r, i, o) : lu(e, n, r, i, o);
}
function hp(e, t, n, r, i) {
  if (r.overwrite)
    Ze.unlink(n, (o) => o ? i(o) : lu(e, t, n, r, i));
  else return r.errorOnExist ? i(new Error(`'${n}' already exists`)) : i();
}
function lu(e, t, n, r, i) {
  Ze.copyFile(t, n, (o) => o ? i(o) : r.preserveTimestamps ? pp(e.mode, t, n, i) : Hi(n, e.mode, i));
}
function pp(e, t, n, r) {
  return mp(e) ? gp(n, e, (i) => i ? r(i) : ja(e, t, n, r)) : ja(e, t, n, r);
}
function mp(e) {
  return (e & 128) === 0;
}
function gp(e, t, n) {
  return Hi(e, t | 128, n);
}
function ja(e, t, n, r) {
  Ep(t, n, (i) => i ? r(i) : Hi(n, e, r));
}
function Hi(e, t, n) {
  return Ze.chmod(e, t, n);
}
function Ep(e, t, n) {
  Ze.stat(e, (r, i) => r ? n(r) : cp(t, i.atime, i.mtime, n));
}
function yp(e, t, n, r, i, o) {
  return t ? cu(n, r, i, o) : wp(e.mode, n, r, i, o);
}
function wp(e, t, n, r, i) {
  Ze.mkdir(n, (o) => {
    if (o) return i(o);
    cu(t, n, r, (s) => s ? i(s) : Hi(n, e, i));
  });
}
function cu(e, t, n, r) {
  Ze.readdir(e, (i, o) => i ? r(i) : uu(o, e, t, n, r));
}
function uu(e, t, n, r, i) {
  const o = e.pop();
  return o ? _p(e, o, t, n, r, i) : i();
}
function _p(e, t, n, r, i, o) {
  const s = yr.join(n, t), a = yr.join(r, t);
  wr.checkPaths(s, a, "copy", i, (l, m) => {
    if (l) return o(l);
    const { destStat: c } = m;
    fp(c, s, a, i, (u) => u ? o(u) : uu(e, n, r, i, o));
  });
}
function vp(e, t, n, r, i) {
  Ze.readlink(t, (o, s) => {
    if (o) return i(o);
    if (r.dereference && (s = yr.resolve(process.cwd(), s)), e)
      Ze.readlink(n, (a, l) => a ? a.code === "EINVAL" || a.code === "UNKNOWN" ? Ze.symlink(s, n, i) : i(a) : (r.dereference && (l = yr.resolve(process.cwd(), l)), wr.isSrcSubdir(s, l) ? i(new Error(`Cannot copy '${s}' to a subdirectory of itself, '${l}'.`)) : e.isDirectory() && wr.isSrcSubdir(l, s) ? i(new Error(`Cannot overwrite '${l}' with '${s}'.`)) : Sp(s, n, i)));
    else
      return Ze.symlink(s, n, i);
  });
}
function Sp(e, t, n) {
  Ze.unlink(t, (r) => r ? n(r) : Ze.symlink(e, t, n));
}
var Ap = up;
const He = Ye, _r = fe, Tp = It.mkdirsSync, Ip = iu.utimesMillisSync, vr = Jn;
function Cp(e, t, n) {
  typeof n == "function" && (n = { filter: n }), n = n || {}, n.clobber = "clobber" in n ? !!n.clobber : !0, n.overwrite = "overwrite" in n ? !!n.overwrite : n.clobber, n.preserveTimestamps && process.arch === "ia32" && process.emitWarning(
    `Using the preserveTimestamps option in 32-bit node is not recommended;

	see https://github.com/jprichardson/node-fs-extra/issues/269`,
    "Warning",
    "fs-extra-WARN0002"
  );
  const { srcStat: r, destStat: i } = vr.checkPathsSync(e, t, "copy", n);
  return vr.checkParentPathsSync(e, r, t, "copy"), Dp(i, e, t, n);
}
function Dp(e, t, n, r) {
  if (r.filter && !r.filter(t, n)) return;
  const i = _r.dirname(n);
  return He.existsSync(i) || Tp(i), fu(e, t, n, r);
}
function Np(e, t, n, r) {
  if (!(r.filter && !r.filter(t, n)))
    return fu(e, t, n, r);
}
function fu(e, t, n, r) {
  const o = (r.dereference ? He.statSync : He.lstatSync)(t);
  if (o.isDirectory()) return Pp(o, e, t, n, r);
  if (o.isFile() || o.isCharacterDevice() || o.isBlockDevice()) return Op(o, e, t, n, r);
  if (o.isSymbolicLink()) return kp(e, t, n, r);
  throw o.isSocket() ? new Error(`Cannot copy a socket file: ${t}`) : o.isFIFO() ? new Error(`Cannot copy a FIFO pipe: ${t}`) : new Error(`Unknown file: ${t}`);
}
function Op(e, t, n, r, i) {
  return t ? bp(e, n, r, i) : du(e, n, r, i);
}
function bp(e, t, n, r) {
  if (r.overwrite)
    return He.unlinkSync(n), du(e, t, n, r);
  if (r.errorOnExist)
    throw new Error(`'${n}' already exists`);
}
function du(e, t, n, r) {
  return He.copyFileSync(t, n), r.preserveTimestamps && Rp(e.mode, t, n), xs(n, e.mode);
}
function Rp(e, t, n) {
  return $p(e) && Lp(n, e), xp(t, n);
}
function $p(e) {
  return (e & 128) === 0;
}
function Lp(e, t) {
  return xs(e, t | 128);
}
function xs(e, t) {
  return He.chmodSync(e, t);
}
function xp(e, t) {
  const n = He.statSync(e);
  return Ip(t, n.atime, n.mtime);
}
function Pp(e, t, n, r, i) {
  return t ? hu(n, r, i) : Fp(e.mode, n, r, i);
}
function Fp(e, t, n, r) {
  return He.mkdirSync(n), hu(t, n, r), xs(n, e);
}
function hu(e, t, n) {
  He.readdirSync(e).forEach((r) => Up(r, e, t, n));
}
function Up(e, t, n, r) {
  const i = _r.join(t, e), o = _r.join(n, e), { destStat: s } = vr.checkPathsSync(i, o, "copy", r);
  return Np(s, i, o, r);
}
function kp(e, t, n, r) {
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
    return Mp(i, n);
  } else
    return He.symlinkSync(i, n);
}
function Mp(e, t) {
  return He.unlinkSync(t), He.symlinkSync(e, t);
}
var Bp = Cp;
const jp = We.fromCallback;
var Ps = {
  copy: jp(Ap),
  copySync: Bp
};
const Ha = Ye, pu = fe, ue = Xc, Sr = process.platform === "win32";
function mu(e) {
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
function Fs(e, t, n) {
  let r = 0;
  typeof t == "function" && (n = t, t = {}), ue(e, "rimraf: missing path"), ue.strictEqual(typeof e, "string", "rimraf: path should be a string"), ue.strictEqual(typeof n, "function", "rimraf: callback function required"), ue(t, "rimraf: invalid options argument provided"), ue.strictEqual(typeof t, "object", "rimraf: options should be object"), mu(t), Ga(e, t, function i(o) {
    if (o) {
      if ((o.code === "EBUSY" || o.code === "ENOTEMPTY" || o.code === "EPERM") && r < t.maxBusyTries) {
        r++;
        const s = r * 100;
        return setTimeout(() => Ga(e, t, i), s);
      }
      o.code === "ENOENT" && (o = null);
    }
    n(o);
  });
}
function Ga(e, t, n) {
  ue(e), ue(t), ue(typeof n == "function"), t.lstat(e, (r, i) => {
    if (r && r.code === "ENOENT")
      return n(null);
    if (r && r.code === "EPERM" && Sr)
      return qa(e, t, r, n);
    if (i && i.isDirectory())
      return vi(e, t, r, n);
    t.unlink(e, (o) => {
      if (o) {
        if (o.code === "ENOENT")
          return n(null);
        if (o.code === "EPERM")
          return Sr ? qa(e, t, o, n) : vi(e, t, o, n);
        if (o.code === "EISDIR")
          return vi(e, t, o, n);
      }
      return n(o);
    });
  });
}
function qa(e, t, n, r) {
  ue(e), ue(t), ue(typeof r == "function"), t.chmod(e, 438, (i) => {
    i ? r(i.code === "ENOENT" ? null : n) : t.stat(e, (o, s) => {
      o ? r(o.code === "ENOENT" ? null : n) : s.isDirectory() ? vi(e, t, n, r) : t.unlink(e, r);
    });
  });
}
function za(e, t, n) {
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
    i && (i.code === "ENOTEMPTY" || i.code === "EEXIST" || i.code === "EPERM") ? Hp(e, t, r) : i && i.code === "ENOTDIR" ? r(n) : r(i);
  });
}
function Hp(e, t, n) {
  ue(e), ue(t), ue(typeof n == "function"), t.readdir(e, (r, i) => {
    if (r) return n(r);
    let o = i.length, s;
    if (o === 0) return t.rmdir(e, n);
    i.forEach((a) => {
      Fs(pu.join(e, a), t, (l) => {
        if (!s) {
          if (l) return n(s = l);
          --o === 0 && t.rmdir(e, n);
        }
      });
    });
  });
}
function gu(e, t) {
  let n;
  t = t || {}, mu(t), ue(e, "rimraf: missing path"), ue.strictEqual(typeof e, "string", "rimraf: path should be a string"), ue(t, "rimraf: missing options"), ue.strictEqual(typeof t, "object", "rimraf: options should be object");
  try {
    n = t.lstatSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    r.code === "EPERM" && Sr && za(e, t, r);
  }
  try {
    n && n.isDirectory() ? Si(e, t, null) : t.unlinkSync(e);
  } catch (r) {
    if (r.code === "ENOENT")
      return;
    if (r.code === "EPERM")
      return Sr ? za(e, t, r) : Si(e, t, r);
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
      Gp(e, t);
    else if (r.code !== "ENOENT")
      throw r;
  }
}
function Gp(e, t) {
  if (ue(e), ue(t), t.readdirSync(e).forEach((n) => gu(pu.join(e, n), t)), Sr) {
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
var qp = Fs;
Fs.sync = gu;
const Ni = Ye, zp = We.fromCallback, Eu = qp;
function Vp(e, t) {
  if (Ni.rm) return Ni.rm(e, { recursive: !0, force: !0 }, t);
  Eu(e, t);
}
function Wp(e) {
  if (Ni.rmSync) return Ni.rmSync(e, { recursive: !0, force: !0 });
  Eu.sync(e);
}
var Gi = {
  remove: zp(Vp),
  removeSync: Wp
};
const Yp = We.fromPromise, yu = vn, wu = fe, _u = It, vu = Gi, Va = Yp(async function(t) {
  let n;
  try {
    n = await yu.readdir(t);
  } catch {
    return _u.mkdirs(t);
  }
  return Promise.all(n.map((r) => vu.remove(wu.join(t, r))));
});
function Wa(e) {
  let t;
  try {
    t = yu.readdirSync(e);
  } catch {
    return _u.mkdirsSync(e);
  }
  t.forEach((n) => {
    n = wu.join(e, n), vu.removeSync(n);
  });
}
var Xp = {
  emptyDirSync: Wa,
  emptydirSync: Wa,
  emptyDir: Va,
  emptydir: Va
};
const Jp = We.fromCallback, Su = fe, qt = Ye, Au = It;
function Zp(e, t) {
  function n() {
    qt.writeFile(e, "", (r) => {
      if (r) return t(r);
      t();
    });
  }
  qt.stat(e, (r, i) => {
    if (!r && i.isFile()) return t();
    const o = Su.dirname(e);
    qt.stat(o, (s, a) => {
      if (s)
        return s.code === "ENOENT" ? Au.mkdirs(o, (l) => {
          if (l) return t(l);
          n();
        }) : t(s);
      a.isDirectory() ? n() : qt.readdir(o, (l) => {
        if (l) return t(l);
      });
    });
  });
}
function Kp(e) {
  let t;
  try {
    t = qt.statSync(e);
  } catch {
  }
  if (t && t.isFile()) return;
  const n = Su.dirname(e);
  try {
    qt.statSync(n).isDirectory() || qt.readdirSync(n);
  } catch (r) {
    if (r && r.code === "ENOENT") Au.mkdirsSync(n);
    else throw r;
  }
  qt.writeFileSync(e, "");
}
var Qp = {
  createFile: Jp(Zp),
  createFileSync: Kp
};
const em = We.fromCallback, Tu = fe, Gt = Ye, Iu = It, tm = Sn.pathExists, { areIdentical: Cu } = Jn;
function nm(e, t, n) {
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
      if (o && Cu(a, o)) return n(null);
      const l = Tu.dirname(t);
      tm(l, (m, c) => {
        if (m) return n(m);
        if (c) return r(e, t);
        Iu.mkdirs(l, (u) => {
          if (u) return n(u);
          r(e, t);
        });
      });
    });
  });
}
function rm(e, t) {
  let n;
  try {
    n = Gt.lstatSync(t);
  } catch {
  }
  try {
    const o = Gt.lstatSync(e);
    if (n && Cu(o, n)) return;
  } catch (o) {
    throw o.message = o.message.replace("lstat", "ensureLink"), o;
  }
  const r = Tu.dirname(t);
  return Gt.existsSync(r) || Iu.mkdirsSync(r), Gt.linkSync(e, t);
}
var im = {
  createLink: em(nm),
  createLinkSync: rm
};
const zt = fe, pr = Ye, om = Sn.pathExists;
function sm(e, t, n) {
  if (zt.isAbsolute(e))
    return pr.lstat(e, (r) => r ? (r.message = r.message.replace("lstat", "ensureSymlink"), n(r)) : n(null, {
      toCwd: e,
      toDst: e
    }));
  {
    const r = zt.dirname(t), i = zt.join(r, e);
    return om(i, (o, s) => o ? n(o) : s ? n(null, {
      toCwd: i,
      toDst: e
    }) : pr.lstat(e, (a) => a ? (a.message = a.message.replace("lstat", "ensureSymlink"), n(a)) : n(null, {
      toCwd: e,
      toDst: zt.relative(r, e)
    })));
  }
}
function am(e, t) {
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
var lm = {
  symlinkPaths: sm,
  symlinkPathsSync: am
};
const Du = Ye;
function cm(e, t, n) {
  if (n = typeof t == "function" ? t : n, t = typeof t == "function" ? !1 : t, t) return n(null, t);
  Du.lstat(e, (r, i) => {
    if (r) return n(null, "file");
    t = i && i.isDirectory() ? "dir" : "file", n(null, t);
  });
}
function um(e, t) {
  let n;
  if (t) return t;
  try {
    n = Du.lstatSync(e);
  } catch {
    return "file";
  }
  return n && n.isDirectory() ? "dir" : "file";
}
var fm = {
  symlinkType: cm,
  symlinkTypeSync: um
};
const dm = We.fromCallback, Nu = fe, dt = vn, Ou = It, hm = Ou.mkdirs, pm = Ou.mkdirsSync, bu = lm, mm = bu.symlinkPaths, gm = bu.symlinkPathsSync, Ru = fm, Em = Ru.symlinkType, ym = Ru.symlinkTypeSync, wm = Sn.pathExists, { areIdentical: $u } = Jn;
function _m(e, t, n, r) {
  r = typeof n == "function" ? n : r, n = typeof n == "function" ? !1 : n, dt.lstat(t, (i, o) => {
    !i && o.isSymbolicLink() ? Promise.all([
      dt.stat(e),
      dt.stat(t)
    ]).then(([s, a]) => {
      if ($u(s, a)) return r(null);
      Ya(e, t, n, r);
    }) : Ya(e, t, n, r);
  });
}
function Ya(e, t, n, r) {
  mm(e, t, (i, o) => {
    if (i) return r(i);
    e = o.toDst, Em(o.toCwd, n, (s, a) => {
      if (s) return r(s);
      const l = Nu.dirname(t);
      wm(l, (m, c) => {
        if (m) return r(m);
        if (c) return dt.symlink(e, t, a, r);
        hm(l, (u) => {
          if (u) return r(u);
          dt.symlink(e, t, a, r);
        });
      });
    });
  });
}
function vm(e, t, n) {
  let r;
  try {
    r = dt.lstatSync(t);
  } catch {
  }
  if (r && r.isSymbolicLink()) {
    const a = dt.statSync(e), l = dt.statSync(t);
    if ($u(a, l)) return;
  }
  const i = gm(e, t);
  e = i.toDst, n = ym(i.toCwd, n);
  const o = Nu.dirname(t);
  return dt.existsSync(o) || pm(o), dt.symlinkSync(e, t, n);
}
var Sm = {
  createSymlink: dm(_m),
  createSymlinkSync: vm
};
const { createFile: Xa, createFileSync: Ja } = Qp, { createLink: Za, createLinkSync: Ka } = im, { createSymlink: Qa, createSymlinkSync: el } = Sm;
var Am = {
  // file
  createFile: Xa,
  createFileSync: Ja,
  ensureFile: Xa,
  ensureFileSync: Ja,
  // link
  createLink: Za,
  createLinkSync: Ka,
  ensureLink: Za,
  ensureLinkSync: Ka,
  // symlink
  createSymlink: Qa,
  createSymlinkSync: el,
  ensureSymlink: Qa,
  ensureSymlinkSync: el
};
function Tm(e, { EOL: t = `
`, finalEOL: n = !0, replacer: r = null, spaces: i } = {}) {
  const o = n ? t : "", s = JSON.stringify(e, r, i);
  if (s === void 0)
    throw new TypeError(`Converting ${typeof e} value to JSON is not supported`);
  return s.replace(/\n/g, t) + o;
}
function Im(e) {
  return Buffer.isBuffer(e) && (e = e.toString("utf8")), e.replace(/^\uFEFF/, "");
}
var Us = { stringify: Tm, stripBom: Im };
let Vn;
try {
  Vn = Ye;
} catch {
  Vn = xt;
}
const qi = We, { stringify: Lu, stripBom: xu } = Us;
async function Cm(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || Vn, r = "throws" in t ? t.throws : !0;
  let i = await qi.fromCallback(n.readFile)(e, t);
  i = xu(i);
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
const Dm = qi.fromPromise(Cm);
function Nm(e, t = {}) {
  typeof t == "string" && (t = { encoding: t });
  const n = t.fs || Vn, r = "throws" in t ? t.throws : !0;
  try {
    let i = n.readFileSync(e, t);
    return i = xu(i), JSON.parse(i, t.reviver);
  } catch (i) {
    if (r)
      throw i.message = `${e}: ${i.message}`, i;
    return null;
  }
}
async function Om(e, t, n = {}) {
  const r = n.fs || Vn, i = Lu(t, n);
  await qi.fromCallback(r.writeFile)(e, i, n);
}
const bm = qi.fromPromise(Om);
function Rm(e, t, n = {}) {
  const r = n.fs || Vn, i = Lu(t, n);
  return r.writeFileSync(e, i, n);
}
var $m = {
  readFile: Dm,
  readFileSync: Nm,
  writeFile: bm,
  writeFileSync: Rm
};
const ii = $m;
var Lm = {
  // jsonfile exports
  readJson: ii.readFile,
  readJsonSync: ii.readFileSync,
  writeJson: ii.writeFile,
  writeJsonSync: ii.writeFileSync
};
const xm = We.fromCallback, mr = Ye, Pu = fe, Fu = It, Pm = Sn.pathExists;
function Fm(e, t, n, r) {
  typeof n == "function" && (r = n, n = "utf8");
  const i = Pu.dirname(e);
  Pm(i, (o, s) => {
    if (o) return r(o);
    if (s) return mr.writeFile(e, t, n, r);
    Fu.mkdirs(i, (a) => {
      if (a) return r(a);
      mr.writeFile(e, t, n, r);
    });
  });
}
function Um(e, ...t) {
  const n = Pu.dirname(e);
  if (mr.existsSync(n))
    return mr.writeFileSync(e, ...t);
  Fu.mkdirsSync(n), mr.writeFileSync(e, ...t);
}
var ks = {
  outputFile: xm(Fm),
  outputFileSync: Um
};
const { stringify: km } = Us, { outputFile: Mm } = ks;
async function Bm(e, t, n = {}) {
  const r = km(t, n);
  await Mm(e, r, n);
}
var jm = Bm;
const { stringify: Hm } = Us, { outputFileSync: Gm } = ks;
function qm(e, t, n) {
  const r = Hm(t, n);
  Gm(e, r, n);
}
var zm = qm;
const Vm = We.fromPromise, Ve = Lm;
Ve.outputJson = Vm(jm);
Ve.outputJsonSync = zm;
Ve.outputJSON = Ve.outputJson;
Ve.outputJSONSync = Ve.outputJsonSync;
Ve.writeJSON = Ve.writeJson;
Ve.writeJSONSync = Ve.writeJsonSync;
Ve.readJSON = Ve.readJson;
Ve.readJSONSync = Ve.readJsonSync;
var Wm = Ve;
const Ym = Ye, ls = fe, Xm = Ps.copy, Uu = Gi.remove, Jm = It.mkdirp, Zm = Sn.pathExists, tl = Jn;
function Km(e, t, n, r) {
  typeof n == "function" && (r = n, n = {}), n = n || {};
  const i = n.overwrite || n.clobber || !1;
  tl.checkPaths(e, t, "move", n, (o, s) => {
    if (o) return r(o);
    const { srcStat: a, isChangingCase: l = !1 } = s;
    tl.checkParentPaths(e, a, t, "move", (m) => {
      if (m) return r(m);
      if (Qm(t)) return nl(e, t, i, l, r);
      Jm(ls.dirname(t), (c) => c ? r(c) : nl(e, t, i, l, r));
    });
  });
}
function Qm(e) {
  const t = ls.dirname(e);
  return ls.parse(t).root === t;
}
function nl(e, t, n, r, i) {
  if (r) return To(e, t, n, i);
  if (n)
    return Uu(t, (o) => o ? i(o) : To(e, t, n, i));
  Zm(t, (o, s) => o ? i(o) : s ? i(new Error("dest already exists.")) : To(e, t, n, i));
}
function To(e, t, n, r) {
  Ym.rename(e, t, (i) => i ? i.code !== "EXDEV" ? r(i) : e0(e, t, n, r) : r());
}
function e0(e, t, n, r) {
  Xm(e, t, {
    overwrite: n,
    errorOnExist: !0
  }, (o) => o ? r(o) : Uu(e, r));
}
var t0 = Km;
const ku = Ye, cs = fe, n0 = Ps.copySync, Mu = Gi.removeSync, r0 = It.mkdirpSync, rl = Jn;
function i0(e, t, n) {
  n = n || {};
  const r = n.overwrite || n.clobber || !1, { srcStat: i, isChangingCase: o = !1 } = rl.checkPathsSync(e, t, "move", n);
  return rl.checkParentPathsSync(e, i, t, "move"), o0(t) || r0(cs.dirname(t)), s0(e, t, r, o);
}
function o0(e) {
  const t = cs.dirname(e);
  return cs.parse(t).root === t;
}
function s0(e, t, n, r) {
  if (r) return Io(e, t, n);
  if (n)
    return Mu(t), Io(e, t, n);
  if (ku.existsSync(t)) throw new Error("dest already exists.");
  return Io(e, t, n);
}
function Io(e, t, n) {
  try {
    ku.renameSync(e, t);
  } catch (r) {
    if (r.code !== "EXDEV") throw r;
    return a0(e, t, n);
  }
}
function a0(e, t, n) {
  return n0(e, t, {
    overwrite: n,
    errorOnExist: !0
  }), Mu(e);
}
var l0 = i0;
const c0 = We.fromCallback;
var u0 = {
  move: c0(t0),
  moveSync: l0
}, Qt = {
  // Export promiseified graceful-fs:
  ...vn,
  // Export extra methods:
  ...Ps,
  ...Xp,
  ...Am,
  ...Wm,
  ...It,
  ...u0,
  ...ks,
  ...Sn,
  ...Gi
}, An = {}, Yt = {}, Oe = {}, Xt = {};
Object.defineProperty(Xt, "__esModule", { value: !0 });
Xt.CancellationError = Xt.CancellationToken = void 0;
const f0 = Jc;
class d0 extends f0.EventEmitter {
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
      return Promise.reject(new us());
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
          o(new us());
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
Xt.CancellationToken = d0;
class us extends Error {
  constructor() {
    super("cancelled");
  }
}
Xt.CancellationError = us;
var Zn = {};
Object.defineProperty(Zn, "__esModule", { value: !0 });
Zn.newError = h0;
function h0(e, t) {
  const n = new Error(e);
  return n.code = t, n;
}
var Ne = {}, fs = { exports: {} }, oi = { exports: {} }, Co, il;
function p0() {
  if (il) return Co;
  il = 1;
  var e = 1e3, t = e * 60, n = t * 60, r = n * 24, i = r * 7, o = r * 365.25;
  Co = function(c, u) {
    u = u || {};
    var h = typeof c;
    if (h === "string" && c.length > 0)
      return s(c);
    if (h === "number" && isFinite(c))
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
  function a(c) {
    var u = Math.abs(c);
    return u >= r ? Math.round(c / r) + "d" : u >= n ? Math.round(c / n) + "h" : u >= t ? Math.round(c / t) + "m" : u >= e ? Math.round(c / e) + "s" : c + "ms";
  }
  function l(c) {
    var u = Math.abs(c);
    return u >= r ? m(c, u, r, "day") : u >= n ? m(c, u, n, "hour") : u >= t ? m(c, u, t, "minute") : u >= e ? m(c, u, e, "second") : c + " ms";
  }
  function m(c, u, h, w) {
    var p = u >= h * 1.5;
    return Math.round(c / h) + " " + w + (p ? "s" : "");
  }
  return Co;
}
var Do, ol;
function Bu() {
  if (ol) return Do;
  ol = 1;
  function e(t) {
    r.debug = r, r.default = r, r.coerce = m, r.disable = a, r.enable = o, r.enabled = l, r.humanize = p0(), r.destroy = c, Object.keys(t).forEach((u) => {
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
      let h, w = null, p, f;
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
          const x = r.formatters[B];
          if (typeof x == "function") {
            const A = _[R];
            j = x.call(E, A), _.splice(R, 1), R--;
          }
          return j;
        }), r.formatArgs.call(E, _), (E.log || r.log).apply(E, _);
      }
      return y.namespace = u, y.useColors = r.useColors(), y.color = r.selectColor(u), y.extend = i, y.destroy = r.destroy, Object.defineProperty(y, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => w !== null ? w : (p !== r.namespaces && (p = r.namespaces, f = r.enabled(u)), f),
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
      let w = 0, p = 0, f = -1, y = 0;
      for (; w < u.length; )
        if (p < h.length && (h[p] === u[w] || h[p] === "*"))
          h[p] === "*" ? (f = p, y = w, p++) : (w++, p++);
        else if (f !== -1)
          p = f + 1, y++, w = y;
        else
          return !1;
      for (; p < h.length && h[p] === "*"; )
        p++;
      return p === h.length;
    }
    function a() {
      const u = [
        ...r.names,
        ...r.skips.map((h) => "-" + h)
      ].join(",");
      return r.enable(""), u;
    }
    function l(u) {
      for (const h of r.skips)
        if (s(u, h))
          return !1;
      for (const h of r.names)
        if (s(u, h))
          return !0;
      return !1;
    }
    function m(u) {
      return u instanceof Error ? u.stack || u.message : u;
    }
    function c() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return r.enable(r.load()), r;
  }
  return Do = e, Do;
}
var sl;
function m0() {
  return sl || (sl = 1, function(e, t) {
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
      const m = "color: " + this.color;
      l.splice(1, 0, m, "color: inherit");
      let c = 0, u = 0;
      l[0].replace(/%[a-zA-Z%]/g, (h) => {
        h !== "%%" && (c++, h === "%c" && (u = c));
      }), l.splice(u, 0, m);
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
    e.exports = Bu()(t);
    const { formatters: a } = e.exports;
    a.j = function(l) {
      try {
        return JSON.stringify(l);
      } catch (m) {
        return "[UnexpectedJSONParseError]: " + m.message;
      }
    };
  }(oi, oi.exports)), oi.exports;
}
var si = { exports: {} }, No, al;
function g0() {
  return al || (al = 1, No = (e, t = process.argv) => {
    const n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", r = t.indexOf(n + e), i = t.indexOf("--");
    return r !== -1 && (i === -1 || r < i);
  }), No;
}
var Oo, ll;
function E0() {
  if (ll) return Oo;
  ll = 1;
  const e = Mi, t = Zc, n = g0(), { env: r } = process;
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
  function s(l, m) {
    if (i === 0)
      return 0;
    if (n("color=16m") || n("color=full") || n("color=truecolor"))
      return 3;
    if (n("color=256"))
      return 2;
    if (l && !m && i === void 0)
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
    const m = s(l, l && l.isTTY);
    return o(m);
  }
  return Oo = {
    supportsColor: a,
    stdout: o(s(!0, t.isatty(1))),
    stderr: o(s(!0, t.isatty(2)))
  }, Oo;
}
var cl;
function y0() {
  return cl || (cl = 1, function(e, t) {
    const n = Zc, r = Ds;
    t.init = c, t.log = a, t.formatArgs = o, t.save = l, t.load = m, t.useColors = i, t.destroy = r.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), t.colors = [6, 2, 3, 4, 5, 1];
    try {
      const h = E0();
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
      const p = w.substring(6).toLowerCase().replace(/_([a-z])/g, (y, _) => _.toUpperCase());
      let f = process.env[w];
      return /^(yes|on|true|enabled)$/i.test(f) ? f = !0 : /^(no|off|false|disabled)$/i.test(f) ? f = !1 : f === "null" ? f = null : f = Number(f), h[p] = f, h;
    }, {});
    function i() {
      return "colors" in t.inspectOpts ? !!t.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function o(h) {
      const { namespace: w, useColors: p } = this;
      if (p) {
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
    function l(h) {
      h ? process.env.DEBUG = h : delete process.env.DEBUG;
    }
    function m() {
      return process.env.DEBUG;
    }
    function c(h) {
      h.inspectOpts = {};
      const w = Object.keys(t.inspectOpts);
      for (let p = 0; p < w.length; p++)
        h.inspectOpts[w[p]] = t.inspectOpts[w[p]];
    }
    e.exports = Bu()(t);
    const { formatters: u } = e.exports;
    u.o = function(h) {
      return this.inspectOpts.colors = this.useColors, r.inspect(h, this.inspectOpts).split(`
`).map((w) => w.trim()).join(" ");
    }, u.O = function(h) {
      return this.inspectOpts.colors = this.useColors, r.inspect(h, this.inspectOpts);
    };
  }(si, si.exports)), si.exports;
}
typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? fs.exports = m0() : fs.exports = y0();
var w0 = fs.exports, Fr = {};
Object.defineProperty(Fr, "__esModule", { value: !0 });
Fr.ProgressCallbackTransform = void 0;
const _0 = xr;
class v0 extends _0.Transform {
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
Fr.ProgressCallbackTransform = v0;
Object.defineProperty(Ne, "__esModule", { value: !0 });
Ne.DigestTransform = Ne.HttpExecutor = Ne.HttpError = void 0;
Ne.addSensitiveRedirectHeader = N0;
Ne.addSensitiveFieldPattern = O0;
Ne.createHttpError = hs;
Ne.parseJson = R0;
Ne.configureRequestOptionsFromUrl = zu;
Ne.configureRequestUrl = js;
Ne.safeGetHeader = qn;
Ne.configureRequestOptions = Oi;
Ne.isSensitiveFieldName = Vu;
Ne.hashSensitiveValue = Wu;
Ne.safeStringifyJson = Un;
const ju = Xn, S0 = w0, A0 = xt, T0 = xr, ds = Kt, I0 = Xt, ul = Zn, C0 = Fr, Bt = (0, S0.default)("electron-builder"), Ms = (e) => e.toLowerCase().replace(/[-_]/g, ""), Hu = /* @__PURE__ */ new Set(["authorization", "proxyauthorization", "privatetoken", "xapikey", "xauthtoken", "xaccesstoken", "xgitlabtoken", "cookie", "xcsrftoken"]), Gu = ["token", "password", "secret", "authorization", "credential", "apikey", "passphrase", "auth"], D0 = ["key"];
function N0(e) {
  Hu.add(Ms(e));
}
function O0(e) {
  Gu.push(e.toLowerCase().replace(/[-_]/g, ""));
}
function hs(e, t = null) {
  return new Bs(e.statusCode || -1, `${e.statusCode} ${e.statusMessage}` + (t == null ? "" : `
` + JSON.stringify(t, null, "  ")) + `
Headers: ` + Un(e.headers), t);
}
const b0 = /* @__PURE__ */ new Map([
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
class Bs extends Error {
  constructor(t, n = `HTTP error: ${b0.get(t) || t}`, r = null) {
    super(n), this.statusCode = t, this.description = r, this.name = "HttpError", this.code = `HTTP_ERROR_${t}`;
  }
  isServerError() {
    return this.statusCode >= 500 && this.statusCode <= 599;
  }
}
Ne.HttpError = Bs;
function R0(e) {
  return e.then((t) => t == null || t.length === 0 ? null : JSON.parse(t));
}
class Fn {
  constructor() {
    this.maxRedirects = 10;
  }
  request(t, n = new I0.CancellationToken(), r) {
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
      const l = this.createRequest(t, (m) => {
        try {
          this.handleResponse(m, t, n, o, s, i, r);
        } catch (c) {
          s(c);
        }
      });
      this.addErrorAndTimeoutHandlers(l, s, t.timeout), this.addRedirectHandlers(l, t, s, i, (m) => {
        this.doApiRequest(m, n, r, i).then(o).catch(s);
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
    if (Bt.enabled) {
      const { headers: w, auth: p, ...f } = n;
      Bt(`Response: ${t.statusCode} ${t.statusMessage}, request options: ${Un(f)}`);
    }
    if (t.statusCode === 404) {
      o(hs(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

Please double check that your authentication token is correct. Due to security reasons, actual status maybe not reported, but 404.
`));
      return;
    } else if (t.statusCode === 204) {
      i();
      return;
    }
    const m = (l = t.statusCode) !== null && l !== void 0 ? l : 0, c = m >= 300 && m < 400, u = qn(t, "location");
    if (c && u != null) {
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
          const w = qn(t, "content-type"), p = w != null && (Array.isArray(w) ? w.find((f) => f.includes("json")) != null : w.includes("json"));
          o(hs(t, `method: ${n.method || "GET"} url: ${n.protocol || "https:"}//${n.hostname}${n.port ? `:${n.port}` : ""}${n.path}

          Data:
          ${p ? Un(JSON.parse(h)) : h}
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
      js(t, a), Oi(a), this.doDownload(a, {
        destination: null,
        options: n,
        onCancel: o,
        callback: (l) => {
          l == null ? r(Buffer.concat(s)) : i(l);
        },
        responseHandler: (l, m) => {
          let c = 0;
          l.on("data", (u) => {
            if (c += u.length, c > 524288e3) {
              m(new Error("Maximum allowed size is 500 MB"));
              return;
            }
            s.push(u);
          }), l.on("end", () => {
            m(null);
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
        r < this.maxRedirects ? this.doDownload(Fn.prepareRedirectUrlOptions(s, t), n, r++) : n.callback(this.createMaxRedirectError());
        return;
      }
      n.responseHandler == null ? L0(n, o) : n.responseHandler(o, n.callback);
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
    const r = zu(t, { ...n }), i = r.headers;
    if (i == null)
      return r;
    const o = Fn.reconstructOriginalUrl(n), s = qu(t, n);
    if (Fn.isCrossOriginRedirect(o, s)) {
      Bt.enabled && Bt(`Cross-origin redirect (${o.host} → ${s.host}): stripping sensitive headers`);
      for (const a of Object.keys(i))
        Hu.has(Ms(a)) && delete i[a];
    }
    return r;
  }
  static reconstructOriginalUrl(t) {
    const n = t.protocol || "https:";
    if (!t.hostname)
      throw new Error("Missing hostname in request options");
    const r = t.hostname, i = t.port ? `:${t.port}` : "", o = t.path || "/";
    return new ds.URL(`${n}//${r}${i}${o}`);
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
        if (r < n && (i instanceof Bs && i.isServerError() || i.code === "EPIPE")) {
          await new Promise((o) => setTimeout(o, 1e3 * (r + 1)));
          continue;
        }
        throw i;
      }
  }
}
Ne.HttpExecutor = Fn;
function qu(e, t) {
  try {
    return new ds.URL(e);
  } catch {
    const n = t.hostname, r = t.protocol || "https:", i = t.port ? `:${t.port}` : "", o = `${r}//${n}${i}`;
    return new ds.URL(e, o);
  }
}
function zu(e, t) {
  const n = Oi(t), r = qu(e, t);
  return js(r, n), n;
}
function js(e, t) {
  t.protocol = e.protocol, t.hostname = e.hostname, e.port ? t.port = e.port : t.port && delete t.port, t.path = e.pathname + e.search;
}
class ps extends T0.Transform {
  // noinspection JSUnusedGlobalSymbols
  get actual() {
    return this._actual;
  }
  constructor(t, n = "sha512", r = "base64") {
    super(), this.expected = t, this.algorithm = n, this.encoding = r, this._actual = null, this.isValidateOnEnd = !0, this.digester = (0, ju.createHash)(n);
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
      throw (0, ul.newError)("Not finished yet", "ERR_STREAM_NOT_FINISHED");
    if (this._actual !== this.expected)
      throw (0, ul.newError)(`${this.algorithm} checksum mismatch, expected ${this.expected}, got ${this._actual}`, "ERR_CHECKSUM_MISMATCH");
    return null;
  }
}
Ne.DigestTransform = ps;
function $0(e, t, n) {
  return e != null && t != null && e !== t ? (n(new Error(`checksum mismatch: expected ${t} but got ${e} (X-Checksum-Sha2 header)`)), !1) : !0;
}
function qn(e, t) {
  const n = e.headers[t];
  return n == null ? null : Array.isArray(n) ? n.length === 0 ? null : n[n.length - 1] : n;
}
function L0(e, t) {
  if (!$0(qn(t, "X-Checksum-Sha2"), e.options.sha2, e.callback))
    return;
  const n = [];
  if (e.options.onProgress != null) {
    const s = qn(t, "content-length");
    s != null && n.push(new C0.ProgressCallbackTransform(parseInt(s, 10), e.options.cancellationToken, e.options.onProgress));
  }
  const r = e.options.sha512;
  r != null ? n.push(new ps(r, "sha512", r.length === 128 && !r.includes("+") && !r.includes("Z") && !r.includes("=") ? "hex" : "base64")) : e.options.sha2 != null && n.push(new ps(e.options.sha2, "sha256", "hex"));
  const i = (0, A0.createWriteStream)(e.destination);
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
function Vu(e) {
  const t = Ms(e);
  return Gu.some((n) => t.includes(n)) || D0.some((n) => t.endsWith(n));
}
function Wu(e) {
  return `${(0, ju.createHash)("sha256").update(e).digest("hex")} (sha256 hash)`;
}
function Un(e, t) {
  return JSON.stringify(e, (n, r) => Vu(n) || t != null && t.has(n) ? typeof r == "string" ? Wu(r) : "<stripped sensitive data>" : r, 2);
}
var zi = {};
Object.defineProperty(zi, "__esModule", { value: !0 });
zi.MemoLazy = void 0;
class x0 {
  constructor(t, n) {
    this.selector = t, this.creator = n, this.selected = void 0, this._value = void 0;
  }
  get hasValue() {
    return this._value !== void 0;
  }
  get value() {
    const t = this.selector();
    if (this._value !== void 0 && Yu(this.selected, t))
      return this._value;
    this.selected = t;
    const n = this.creator(t);
    return this.value = n, n;
  }
  set value(t) {
    this._value = t;
  }
}
zi.MemoLazy = x0;
function Yu(e, t) {
  if (typeof e == "object" && e !== null && (typeof t == "object" && t !== null)) {
    const i = Object.keys(e), o = Object.keys(t);
    return i.length === o.length && i.every((s) => Yu(e[s], t[s]));
  }
  return e === t;
}
var Ur = {};
Object.defineProperty(Ur, "__esModule", { value: !0 });
Ur.githubUrl = P0;
Ur.githubTagPrefix = F0;
Ur.getS3LikeProviderBaseUrl = U0;
function P0(e, t = "github.com") {
  return `${e.protocol || "https"}://${e.host || t}`;
}
function F0(e) {
  var t;
  return e.tagNamePrefix ? e.tagNamePrefix : !((t = e.vPrefixedTagName) !== null && t !== void 0) || t ? "v" : "";
}
function U0(e) {
  const t = e.provider;
  if (t === "s3")
    return k0(e);
  if (t === "spaces")
    return M0(e);
  throw new Error(`Not supported provider: ${t}`);
}
function k0(e) {
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
  return Xu(t, e.path);
}
function Xu(e, t) {
  return t != null && t.length > 0 && (t.startsWith("/") || (e += "/"), e += t), e;
}
function M0(e) {
  if (e.name == null)
    throw new Error("name is missing");
  if (e.region == null)
    throw new Error("region is missing");
  return Xu(`https://${e.name}.${e.region}.digitaloceanspaces.com`, e.path);
}
var Hs = {};
Object.defineProperty(Hs, "__esModule", { value: !0 });
Hs.retry = Ju;
const B0 = Xt;
async function Ju(e, t) {
  var n;
  const { retries: r, interval: i, backoff: o = 0, attempt: s = 0, shouldRetry: a, cancellationToken: l = new B0.CancellationToken() } = t;
  try {
    return await e();
  } catch (m) {
    if (await Promise.resolve((n = a == null ? void 0 : a(m)) !== null && n !== void 0 ? n : !0) && r > 0 && !l.cancelled)
      return await new Promise((c) => setTimeout(c, i + o * s)), await Ju(e, { ...t, retries: r - 1, attempt: s + 1 });
    throw m;
  }
}
var Gs = {};
Object.defineProperty(Gs, "__esModule", { value: !0 });
Gs.parseDn = j0;
function j0(e) {
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
var Wn = {};
Object.defineProperty(Wn, "__esModule", { value: !0 });
Wn.nil = Wn.UUID = void 0;
const Zu = Xn, Ku = Zn, H0 = "options.name must be either a string or a Buffer", fl = (0, Zu.randomBytes)(16);
fl[0] = fl[0] | 1;
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
    return G0(t, "sha1", 80, n);
  }
  toString() {
    return this.ascii == null && (this.ascii = q0(this.binary)), this.ascii;
  }
  inspect() {
    return `UUID v${this.version} ${this.toString()}`;
  }
  static check(t, n = 0) {
    if (typeof t == "string")
      return t = t.toLowerCase(), /^[a-f0-9]{8}(-[a-f0-9]{4}){3}-([a-f0-9]{12})$/.test(t) ? t === "00000000-0000-0000-0000-000000000000" ? { version: void 0, variant: "nil", format: "ascii" } : {
        version: (Ai[t[14] + t[15]] & 240) >> 4,
        variant: dl((Ai[t[19] + t[20]] & 224) >> 5),
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
        variant: dl((t[n + 8] & 224) >> 5),
        format: "binary"
      };
    }
    throw (0, Ku.newError)("Unknown type of uuid", "ERR_UNKNOWN_UUID_TYPE");
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
Wn.UUID = _n;
_n.OID = _n.parse("6ba7b812-9dad-11d1-80b4-00c04fd430c8");
function dl(e) {
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
function G0(e, t, n, r, i = gr.ASCII) {
  const o = (0, Zu.createHash)(t);
  if (typeof e != "string" && !Buffer.isBuffer(e))
    throw (0, Ku.newError)(H0, "ERR_INVALID_UUID_NAME");
  o.update(r), o.update(e);
  const a = o.digest();
  let l;
  switch (i) {
    case gr.BINARY:
      a[6] = a[6] & 15 | n, a[8] = a[8] & 63 | 128, l = a;
      break;
    case gr.OBJECT:
      a[6] = a[6] & 15 | n, a[8] = a[8] & 63 | 128, l = new _n(a);
      break;
    default:
      l = oe[a[0]] + oe[a[1]] + oe[a[2]] + oe[a[3]] + "-" + oe[a[4]] + oe[a[5]] + "-" + oe[a[6] & 15 | n] + oe[a[7]] + "-" + oe[a[8] & 63 | 128] + oe[a[9]] + "-" + oe[a[10]] + oe[a[11]] + oe[a[12]] + oe[a[13]] + oe[a[14]] + oe[a[15]];
      break;
  }
  return l;
}
function q0(e) {
  return oe[e[0]] + oe[e[1]] + oe[e[2]] + oe[e[3]] + "-" + oe[e[4]] + oe[e[5]] + "-" + oe[e[6]] + oe[e[7]] + "-" + oe[e[8]] + oe[e[9]] + "-" + oe[e[10]] + oe[e[11]] + oe[e[12]] + oe[e[13]] + oe[e[14]] + oe[e[15]];
}
Wn.nil = new _n("00000000-0000-0000-0000-000000000000");
var kr = {}, Qu = {};
(function(e) {
  (function(t) {
    t.parser = function(g, d) {
      return new r(g, d);
    }, t.SAXParser = r, t.SAXStream = u, t.createStream = m, t.MAX_BUFFER_LENGTH = 64 * 1024;
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
      for (var d = Math.max(t.MAX_BUFFER_LENGTH, 10), D = 0, I = 0, se = n.length; I < se; I++) {
        var pe = g[n[I]].length;
        if (pe > d)
          switch (n[I]) {
            case "textNode":
              H(g);
              break;
            case "cdata":
              $(g, "oncdata", g.cdata), g.cdata = "";
              break;
            case "script":
              $(g, "onscript", g.script), g.script = "";
              break;
            default:
              G(g, "Max buffer length exceeded: " + n[I]);
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
      H(g), g.cdata !== "" && ($(g, "oncdata", g.cdata), g.cdata = ""), g.script !== "" && ($(g, "onscript", g.script), g.script = "");
    }
    r.prototype = {
      end: function() {
        V(this);
      },
      write: tn,
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
    var l = t.EVENTS.filter(function(g) {
      return g !== "error" && g !== "end";
    });
    function m(g, d) {
      return new u(g, d);
    }
    function c(g, d) {
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
      }, this._parser.onerror = function(I) {
        D.emit("error", I), D._parser.error = null;
      }, this._decoder = null, this._decoderBuffer = null, l.forEach(function(I) {
        Object.defineProperty(D, "on" + I, {
          get: function() {
            return D._parser["on" + I];
          },
          set: function(se) {
            if (!se)
              return D.removeAllListeners(I), D._parser["on" + I] = se, se;
            D.on(I, se);
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
        var D = c(g, d);
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
      return !D._parser["on" + g] && l.indexOf(g) !== -1 && (D._parser["on" + g] = function() {
        var I = arguments.length === 1 ? [arguments[0]] : Array.apply(null, arguments);
        I.splice(0, 0, g), D.emit.apply(D, I);
      }), a.prototype.on.call(D, g, d);
    };
    var h = /^\[CDATA\[$/i, w = /^DOCTYPE$/i, p = "http://www.w3.org/XML/1998/namespace", f = "http://www.w3.org/2000/xmlns/", y = { xml: p, xmlns: f }, _ = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, E = /[:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/, S = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD]/, T = /[#:_A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\u00B7\u0300-\u036F\u203F-\u2040.\d-]/;
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
    function x(g, d) {
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
    for (var W in t.STATE)
      t.STATE[t.STATE[W]] = W;
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
      const D = F(g), I = F(d);
      return !D || !I ? !0 : I === "utf16" ? D === "utf16le" || D === "utf16be" : D === I;
    }
    function k(g, d) {
      if (!(!g.strict || !g.encoding || !d || d.name !== "xml")) {
        var D = te(d.body);
        D && !b(g.encoding, D) && U(
          g,
          "XML declaration encoding " + D + " does not match detected stream encoding " + g.encoding.toUpperCase()
        );
      }
    }
    function $(g, d, D) {
      g.textNode && H(g), K(g, d, D);
    }
    function H(g) {
      g.textNode = N(g.opt, g.textNode), g.textNode && K(g, "ontext", g.textNode), g.textNode = "";
    }
    function N(g, d) {
      return g.trim && (d = d.trim()), g.normalize && (d = d.replace(/\s+/g, " ")), d;
    }
    function G(g, d) {
      return H(g), g.trackPosition && (d += `
Line: ` + g.line + `
Column: ` + g.column + `
Char: ` + g.c), d = new Error(d), g.error = d, K(g, "onerror", d), g;
    }
    function V(g) {
      return g.sawRoot && !g.closedRoot && U(g, "Unclosed root tag"), g.state !== A.BEGIN && g.state !== A.BEGIN_WHITESPACE && g.state !== A.TEXT && G(g, "Unexpected end"), H(g), g.c = "", g.closed = !0, K(g, "onend"), r.call(g, g.strict, g.opt), g;
    }
    function U(g, d) {
      if (typeof g != "object" || !(g instanceof r))
        throw new Error("bad call to strictFail");
      g.strict && G(g, d);
    }
    function Q(g) {
      g.strict || (g.tagName = g.tagName[g.looseCase]());
      var d = g.tags[g.tags.length - 1] || g, D = g.tag = { name: g.tagName, attributes: {} };
      g.opt.xmlns && (D.ns = d.ns), g.attribList.length = 0, $(g, "onopentagstart", D);
    }
    function re(g, d) {
      var D = g.indexOf(":"), I = D < 0 ? ["", g] : g.split(":"), se = I[0], pe = I[1];
      return d && g === "xmlns" && (se = "xmlns", pe = ""), { prefix: se, local: pe };
    }
    function z(g) {
      if (g.strict || (g.attribName = g.attribName[g.looseCase]()), g.attribList.indexOf(g.attribName) !== -1 || g.tag.attributes.hasOwnProperty(g.attribName)) {
        g.attribName = g.attribValue = "";
        return;
      }
      if (g.opt.xmlns) {
        var d = re(g.attribName, !0), D = d.prefix, I = d.local;
        if (D === "xmlns")
          if (I === "xml" && g.attribValue !== p)
            U(
              g,
              "xml: prefix must be bound to " + p + `
Actual: ` + g.attribValue
            );
          else if (I === "xmlns" && g.attribValue !== f)
            U(
              g,
              "xmlns: prefix must be bound to " + f + `
Actual: ` + g.attribValue
            );
          else {
            var se = g.tag, pe = g.tags[g.tags.length - 1] || g;
            se.ns === pe.ns && (se.ns = Object.create(pe.ns)), se.ns[I] = g.attribValue;
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
        var D = g.tag, I = re(g.tagName);
        D.prefix = I.prefix, D.local = I.local, D.uri = D.ns[I.prefix] || "", D.prefix && !D.uri && (U(
          g,
          "Unbound namespace prefix: " + JSON.stringify(g.tagName)
        ), D.uri = I.prefix);
        var se = g.tags[g.tags.length - 1] || g;
        D.ns && se.ns !== D.ns && Object.keys(D.ns).forEach(function(Cn) {
          $(g, "onopennamespace", {
            prefix: Cn,
            uri: D.ns[Cn]
          });
        });
        for (var pe = 0, Ae = g.attribList.length; pe < Ae; pe++) {
          var Ue = g.attribList[pe], ke = Ue[0], ct = Ue[1], De = re(ke, !0), ut = De.prefix, mo = De.local, Yr = ut === "" ? "" : D.ns[ut] || "", Pt = {
            name: ke,
            value: ct,
            prefix: ut,
            local: mo,
            uri: Yr
          };
          ut && ut !== "xmlns" && !Yr && (U(
            g,
            "Unbound namespace prefix: " + JSON.stringify(ut)
          ), Pt.uri = ut), g.tag.attributes[ke] = Pt, $(g, "onattribute", Pt);
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
      for (var I = D; d--; ) {
        var se = g.tags[d];
        if (se.name !== I)
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
        var ct = g.tags[g.tags.length - 1] || g;
        g.opt.xmlns && Ae.ns !== ct.ns && Object.keys(Ae.ns).forEach(function(De) {
          var ut = Ae.ns[De];
          $(g, "onclosenamespace", { prefix: De, uri: ut });
        });
      }
      d === 0 && (g.closedRoot = !0), g.tagName = g.attribValue = g.attribName = "", g.attribList.length = 0, g.state = A.TEXT;
    }
    function le(g) {
      var d = g.entity, D = d.toLowerCase(), I, se = "";
      return g.ENTITIES[d] ? g.ENTITIES[d] : g.ENTITIES[D] ? g.ENTITIES[D] : (d = D, d.charAt(0) === "#" && (d.charAt(1) === "x" ? (d = d.slice(2), I = parseInt(d, 16), se = I.toString(16)) : (d = d.slice(1), I = parseInt(d, 10), se = I.toString(10))), d = d.replace(/^0+/, ""), isNaN(I) || se.toLowerCase() !== d || I < 0 || I > 1114111 || !lt(I) ? (U(g, "Invalid character entity"), "&" + g.entity + ";") : String.fromCodePoint(I));
    }
    function lt(g) {
      return g === 9 || g === 10 || g === 13 || g >= 32 && g <= 55295 || g >= 57344 && g <= 65533 || g >= 65536 && g <= 1114111;
    }
    function Ct(g, d) {
      d === "<" ? (g.state = A.OPEN_WAKA, g.startTagPosition = g.position) : R(d) || (U(g, "Non-whitespace before first tag."), g.textNode = d, g.state = A.TEXT);
    }
    function Qe(g, d) {
      var D = "";
      return d < g.length && (D = g.charAt(d)), D;
    }
    function tn(g) {
      var d = this;
      if (this.error)
        throw this.error;
      if (d.closed)
        return G(
          d,
          "Cannot write after close. Assign an onready handler."
        );
      if (g === null)
        return V(d);
      typeof g == "object" && (g = g.toString());
      for (var D = 0, I = ""; I = Qe(g, D++), d.c = I, !!I; )
        switch (d.trackPosition && (d.position++, I === `
` ? (d.line++, d.column = 0) : d.column++), d.state) {
          case A.BEGIN:
            if (d.state = A.BEGIN_WHITESPACE, I === "\uFEFF")
              continue;
            Ct(d, I);
            continue;
          case A.BEGIN_WHITESPACE:
            Ct(d, I);
            continue;
          case A.TEXT:
            if (d.sawRoot && !d.closedRoot) {
              for (var pe = D - 1; I && I !== "<" && I !== "&"; )
                I = Qe(g, D++), I && d.trackPosition && (d.position++, I === `
` ? (d.line++, d.column = 0) : d.column++);
              d.textNode += g.substring(pe, D - 1);
            }
            I === "<" && !(d.sawRoot && d.closedRoot && !d.strict) ? (d.state = A.OPEN_WAKA, d.startTagPosition = d.position) : (!R(I) && (!d.sawRoot || d.closedRoot) && U(d, "Text data outside of root node."), I === "&" ? d.state = A.TEXT_ENTITY : d.textNode += I);
            continue;
          case A.SCRIPT:
            I === "<" ? d.state = A.SCRIPT_ENDING : d.script += I;
            continue;
          case A.SCRIPT_ENDING:
            I === "/" ? d.state = A.CLOSE_TAG : (d.script += "<" + I, d.state = A.SCRIPT);
            continue;
          case A.OPEN_WAKA:
            if (I === "!")
              d.state = A.SGML_DECL, d.sgmlDecl = "";
            else if (!R(I)) if (B(_, I))
              d.state = A.OPEN_TAG, d.tagName = I;
            else if (I === "/")
              d.state = A.CLOSE_TAG, d.tagName = "";
            else if (I === "?")
              d.state = A.PROC_INST, d.procInstName = d.procInstBody = "";
            else {
              if (U(d, "Unencoded <"), d.startTagPosition + 1 < d.position) {
                var se = d.position - d.startTagPosition;
                I = new Array(se).join(" ") + I;
              }
              d.textNode += "<" + I, d.state = A.TEXT;
            }
            continue;
          case A.SGML_DECL:
            if (d.sgmlDecl + I === "--") {
              d.state = A.COMMENT, d.comment = "", d.sgmlDecl = "";
              continue;
            }
            d.doctype && d.doctype !== !0 && d.sgmlDecl ? (d.state = A.DOCTYPE_DTD, d.doctype += "<!" + d.sgmlDecl + I, d.sgmlDecl = "") : h.test(d.sgmlDecl + I) ? ($(d, "onopencdata"), d.state = A.CDATA, d.sgmlDecl = "", d.cdata = "") : w.test(d.sgmlDecl + I) ? (d.state = A.DOCTYPE, (d.doctype || d.sawRoot) && U(
              d,
              "Inappropriately located doctype declaration"
            ), d.doctype = "", d.sgmlDecl = "") : I === ">" ? ($(d, "onsgmldeclaration", d.sgmlDecl), d.sgmlDecl = "", d.state = A.TEXT) : (O(I) && (d.state = A.SGML_DECL_QUOTED), d.sgmlDecl += I);
            continue;
          case A.SGML_DECL_QUOTED:
            I === d.q && (d.state = A.SGML_DECL, d.q = ""), d.sgmlDecl += I;
            continue;
          case A.DOCTYPE:
            I === ">" ? (d.state = A.TEXT, $(d, "ondoctype", d.doctype), d.doctype = !0) : (d.doctype += I, I === "[" ? d.state = A.DOCTYPE_DTD : O(I) && (d.state = A.DOCTYPE_QUOTED, d.q = I));
            continue;
          case A.DOCTYPE_QUOTED:
            d.doctype += I, I === d.q && (d.q = "", d.state = A.DOCTYPE);
            continue;
          case A.DOCTYPE_DTD:
            I === "]" ? (d.doctype += I, d.state = A.DOCTYPE) : I === "<" ? (d.state = A.OPEN_WAKA, d.startTagPosition = d.position) : O(I) ? (d.doctype += I, d.state = A.DOCTYPE_DTD_QUOTED, d.q = I) : d.doctype += I;
            continue;
          case A.DOCTYPE_DTD_QUOTED:
            d.doctype += I, I === d.q && (d.state = A.DOCTYPE_DTD, d.q = "");
            continue;
          case A.COMMENT:
            I === "-" ? d.state = A.COMMENT_ENDING : d.comment += I;
            continue;
          case A.COMMENT_ENDING:
            I === "-" ? (d.state = A.COMMENT_ENDED, d.comment = N(d.opt, d.comment), d.comment && $(d, "oncomment", d.comment), d.comment = "") : (d.comment += "-" + I, d.state = A.COMMENT);
            continue;
          case A.COMMENT_ENDED:
            I !== ">" ? (U(d, "Malformed comment"), d.comment += "--" + I, d.state = A.COMMENT) : d.doctype && d.doctype !== !0 ? d.state = A.DOCTYPE_DTD : d.state = A.TEXT;
            continue;
          case A.CDATA:
            for (var pe = D - 1; I && I !== "]"; )
              I = Qe(g, D++), I && d.trackPosition && (d.position++, I === `
` ? (d.line++, d.column = 0) : d.column++);
            d.cdata += g.substring(pe, D - 1), I === "]" && (d.state = A.CDATA_ENDING);
            continue;
          case A.CDATA_ENDING:
            I === "]" ? d.state = A.CDATA_ENDING_2 : (d.cdata += "]" + I, d.state = A.CDATA);
            continue;
          case A.CDATA_ENDING_2:
            I === ">" ? (d.cdata && $(d, "oncdata", d.cdata), $(d, "onclosecdata"), d.cdata = "", d.state = A.TEXT) : I === "]" ? d.cdata += "]" : (d.cdata += "]]" + I, d.state = A.CDATA);
            continue;
          case A.PROC_INST:
            I === "?" ? d.state = A.PROC_INST_ENDING : R(I) ? d.state = A.PROC_INST_BODY : d.procInstName += I;
            continue;
          case A.PROC_INST_BODY:
            if (!d.procInstBody && R(I))
              continue;
            I === "?" ? d.state = A.PROC_INST_ENDING : d.procInstBody += I;
            continue;
          case A.PROC_INST_ENDING:
            if (I === ">") {
              const ct = {
                name: d.procInstName,
                body: d.procInstBody
              };
              k(d, ct), $(d, "onprocessinginstruction", ct), d.procInstName = d.procInstBody = "", d.state = A.TEXT;
            } else
              d.procInstBody += "?" + I, d.state = A.PROC_INST_BODY;
            continue;
          case A.OPEN_TAG:
            B(E, I) ? d.tagName += I : (Q(d), I === ">" ? ie(d) : I === "/" ? d.state = A.OPEN_TAG_SLASH : (R(I) || U(d, "Invalid character in tag name"), d.state = A.ATTRIB));
            continue;
          case A.OPEN_TAG_SLASH:
            I === ">" ? (ie(d, !0), Se(d)) : (U(
              d,
              "Forward-slash in opening tag not followed by >"
            ), d.state = A.ATTRIB);
            continue;
          case A.ATTRIB:
            if (R(I))
              continue;
            I === ">" ? ie(d) : I === "/" ? d.state = A.OPEN_TAG_SLASH : B(_, I) ? (d.attribName = I, d.attribValue = "", d.state = A.ATTRIB_NAME) : U(d, "Invalid attribute name");
            continue;
          case A.ATTRIB_NAME:
            I === "=" ? d.state = A.ATTRIB_VALUE : I === ">" ? (U(d, "Attribute without value"), d.attribValue = d.attribName, z(d), ie(d)) : R(I) ? d.state = A.ATTRIB_NAME_SAW_WHITE : B(E, I) ? d.attribName += I : U(d, "Invalid attribute name");
            continue;
          case A.ATTRIB_NAME_SAW_WHITE:
            if (I === "=")
              d.state = A.ATTRIB_VALUE;
            else {
              if (R(I))
                continue;
              U(d, "Attribute without value"), d.tag.attributes[d.attribName] = "", d.attribValue = "", $(d, "onattribute", {
                name: d.attribName,
                value: ""
              }), d.attribName = "", I === ">" ? ie(d) : B(_, I) ? (d.attribName = I, d.state = A.ATTRIB_NAME) : (U(d, "Invalid attribute name"), d.state = A.ATTRIB);
            }
            continue;
          case A.ATTRIB_VALUE:
            if (R(I))
              continue;
            O(I) ? (d.q = I, d.state = A.ATTRIB_VALUE_QUOTED) : (d.opt.unquotedAttributeValues || G(d, "Unquoted attribute value"), d.state = A.ATTRIB_VALUE_UNQUOTED, d.attribValue = I);
            continue;
          case A.ATTRIB_VALUE_QUOTED:
            if (I !== d.q) {
              I === "&" ? d.state = A.ATTRIB_VALUE_ENTITY_Q : d.attribValue += I;
              continue;
            }
            z(d), d.q = "", d.state = A.ATTRIB_VALUE_CLOSED;
            continue;
          case A.ATTRIB_VALUE_CLOSED:
            R(I) ? d.state = A.ATTRIB : I === ">" ? ie(d) : I === "/" ? d.state = A.OPEN_TAG_SLASH : B(_, I) ? (U(d, "No whitespace between attributes"), d.attribName = I, d.attribValue = "", d.state = A.ATTRIB_NAME) : U(d, "Invalid attribute name");
            continue;
          case A.ATTRIB_VALUE_UNQUOTED:
            if (!j(I)) {
              I === "&" ? d.state = A.ATTRIB_VALUE_ENTITY_U : d.attribValue += I;
              continue;
            }
            z(d), I === ">" ? ie(d) : d.state = A.ATTRIB;
            continue;
          case A.CLOSE_TAG:
            if (d.tagName)
              I === ">" ? Se(d) : B(E, I) ? d.tagName += I : d.script ? (d.script += "</" + d.tagName + I, d.tagName = "", d.state = A.SCRIPT) : (R(I) || U(d, "Invalid tagname in closing tag"), d.state = A.CLOSE_TAG_SAW_WHITE);
            else {
              if (R(I))
                continue;
              x(_, I) ? d.script ? (d.script += "</" + I, d.state = A.SCRIPT) : U(d, "Invalid tagname in closing tag.") : d.tagName = I;
            }
            continue;
          case A.CLOSE_TAG_SAW_WHITE:
            if (R(I))
              continue;
            I === ">" ? Se(d) : U(d, "Invalid characters in closing tag");
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
            if (I === ";") {
              var ke = le(d);
              d.opt.unparsedEntities && !Object.values(t.XML_ENTITIES).includes(ke) ? ((d.entityCount += 1) > d.opt.maxEntityCount && G(
                d,
                "Parsed entity count exceeds max entity count"
              ), (d.entityDepth += 1) > d.opt.maxEntityDepth && G(
                d,
                "Parsed entity depth exceeds max entity depth"
              ), d.entity = "", d.state = Ae, d.write(ke), d.entityDepth -= 1) : (d[Ue] += ke, d.entity = "", d.state = Ae);
            } else B(d.entity.length ? T : S, I) ? d.entity += I : (U(d, "Invalid character in entity name"), d[Ue] += "&" + d.entity + I, d.entity = "", d.state = Ae);
            continue;
          default:
            throw new Error(d, "Unknown state: " + d.state);
        }
      return d.position >= d.bufferCheckPosition && i(d), d;
    }
    /*! http://mths.be/fromcodepoint v0.1.0 by @mathias */
    String.fromCodePoint || function() {
      var g = String.fromCharCode, d = Math.floor, D = function() {
        var I = 16384, se = [], pe, Ae, Ue = -1, ke = arguments.length;
        if (!ke)
          return "";
        for (var ct = ""; ++Ue < ke; ) {
          var De = Number(arguments[Ue]);
          if (!isFinite(De) || // `NaN`, `+Infinity`, or `-Infinity`
          De < 0 || // not a valid Unicode code point
          De > 1114111 || // not a valid Unicode code point
          d(De) !== De)
            throw RangeError("Invalid code point: " + De);
          De <= 65535 ? se.push(De) : (De -= 65536, pe = (De >> 10) + 55296, Ae = De % 1024 + 56320, se.push(pe, Ae)), (Ue + 1 === ke || se.length > I) && (ct += g.apply(null, se), se.length = 0);
        }
        return ct;
      };
      Object.defineProperty ? Object.defineProperty(String, "fromCodePoint", {
        value: D,
        configurable: !0,
        writable: !0
      }) : String.fromCodePoint = D;
    }();
  })(e);
})(Qu);
Object.defineProperty(kr, "__esModule", { value: !0 });
kr.XElement = void 0;
kr.parseXml = Y0;
const z0 = Qu, ai = Zn;
class ef {
  constructor(t) {
    if (this.name = t, this.value = "", this.attributes = null, this.isCData = !1, this.elements = null, !t)
      throw (0, ai.newError)("Element name cannot be empty", "ERR_XML_ELEMENT_NAME_EMPTY");
    if (!W0(t))
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
      if (hl(r, t, n))
        return r;
    return null;
  }
  getElements(t, n = !1) {
    return this.elements === null ? [] : this.elements.filter((r) => hl(r, t, n));
  }
  elementValueOrEmpty(t, n = !1) {
    const r = this.elementOrNull(t, n);
    return r === null ? "" : r.value;
  }
}
kr.XElement = ef;
const V0 = new RegExp(/^[A-Za-z_][:A-Za-z0-9_-]*$/i);
function W0(e) {
  return V0.test(e);
}
function hl(e, t, n) {
  const r = e.name;
  return r === t || n === !0 && r.length === t.length && r.toLowerCase() === t.toLowerCase();
}
function Y0(e) {
  let t = null;
  const n = z0.parser(!0, {}), r = [];
  return n.onopentag = (i) => {
    const o = new ef(i.name);
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
Tn.mapToObject = tf;
Tn.isValidKey = Vi;
Tn.asArray = X0;
Tn.deepAssign = Z0;
Tn.objectToArgs = eg;
function tf(e) {
  const t = {};
  for (const [n, r] of e)
    Vi(n) && (r instanceof Map ? t[n] = tf(r) : t[n] = r);
  return t;
}
function Vi(e) {
  return ["__proto__", "prototype", "constructor"].includes(e) ? !1 : ["string", "number", "symbol", "boolean"].includes(typeof e) || e === null;
}
function X0(e) {
  return e == null ? [] : Array.isArray(e) ? e : [e];
}
function pl(e) {
  if (Array.isArray(e))
    return !1;
  const t = typeof e;
  return t === "object" || t === "function";
}
function J0(e, t, n) {
  const r = t[n];
  if (r === void 0)
    return;
  const i = e[n];
  i == null || r == null || !pl(i) || !pl(r) ? Array.isArray(i) && Array.isArray(r) ? e[n] = Array.from(new Set(i.concat(r))) : e[n] = r : e[n] = nf(i, r);
}
function nf(e, t) {
  if (e !== t)
    for (const n of Object.getOwnPropertyNames(t))
      Vi(n) && J0(e, t, n);
  return e;
}
function Z0(e, ...t) {
  for (const n of t)
    n != null && nf(e, n);
  return e;
}
const K0 = /^[a-zA-Z][a-zA-Z0-9-]*$/, Q0 = /[\0\r\n]/;
function eg(e) {
  const t = Object.entries(e).reduce((n, [r, i]) => {
    if (!Vi(r) || i == null)
      return n;
    if (!K0.test(r))
      throw new Error(`objectToArgs: unsafe flag name rejected: ${JSON.stringify(r)}`);
    if (Q0.test(i))
      throw new Error(`objectToArgs: value for --${r} contains a null byte or newline`);
    return n.concat([`--${r}`, i]);
  }, []);
  return Object.freeze(t);
}
(function(e) {
  Object.defineProperty(e, "__esModule", { value: !0 }), e.CURRENT_APP_PACKAGE_FILE_NAME = e.CURRENT_APP_INSTALLER_FILE_NAME = e.objectToArgs = e.deepAssign = e.asArray = e.mapToObject = e.isValidKey = e.XElement = e.parseXml = e.UUID = e.parseDn = e.retry = e.githubTagPrefix = e.githubUrl = e.getS3LikeProviderBaseUrl = e.ProgressCallbackTransform = e.MemoLazy = e.safeStringifyJson = e.safeGetHeader = e.parseJson = e.isSensitiveFieldName = e.HttpExecutor = e.hashSensitiveValue = e.HttpError = e.DigestTransform = e.createHttpError = e.configureRequestUrl = e.configureRequestOptionsFromUrl = e.configureRequestOptions = e.newError = e.CancellationToken = e.CancellationError = void 0;
  var t = Xt;
  Object.defineProperty(e, "CancellationError", { enumerable: !0, get: function() {
    return t.CancellationError;
  } }), Object.defineProperty(e, "CancellationToken", { enumerable: !0, get: function() {
    return t.CancellationToken;
  } });
  var n = Zn;
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
  var i = zi;
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
  var a = Hs;
  Object.defineProperty(e, "retry", { enumerable: !0, get: function() {
    return a.retry;
  } });
  var l = Gs;
  Object.defineProperty(e, "parseDn", { enumerable: !0, get: function() {
    return l.parseDn;
  } });
  var m = Wn;
  Object.defineProperty(e, "UUID", { enumerable: !0, get: function() {
    return m.UUID;
  } });
  var c = kr;
  Object.defineProperty(e, "parseXml", { enumerable: !0, get: function() {
    return c.parseXml;
  } }), Object.defineProperty(e, "XElement", { enumerable: !0, get: function() {
    return c.XElement;
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
var Fe = {}, qs = {}, mt = {};
function rf(e) {
  return typeof e > "u" || e === null;
}
function tg(e) {
  return typeof e == "object" && e !== null;
}
function ng(e) {
  return Array.isArray(e) ? e : rf(e) ? [] : [e];
}
function rg(e, t) {
  if (t) {
    const n = Object.keys(t);
    for (let r = 0, i = n.length; r < i; r += 1) {
      const o = n[r];
      e[o] = t[o];
    }
  }
  return e;
}
function ig(e, t) {
  let n = "";
  for (let r = 0; r < t; r += 1)
    n += e;
  return n;
}
function og(e) {
  return e === 0 && Number.NEGATIVE_INFINITY === 1 / e;
}
mt.isNothing = rf;
mt.isObject = tg;
mt.toArray = ng;
mt.repeat = ig;
mt.isNegativeZero = og;
mt.extend = rg;
function of(e, t) {
  let n = "";
  const r = e.reason || "(unknown reason)";
  return e.mark ? (e.mark.name && (n += 'in "' + e.mark.name + '" '), n += "(" + (e.mark.line + 1) + ":" + (e.mark.column + 1) + ")", !t && e.mark.snippet && (n += `

` + e.mark.snippet), r + " " + n) : r;
}
function Ar(e, t) {
  Error.call(this), this.name = "YAMLException", this.reason = e, this.mark = t, this.message = of(this, !1), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack || "";
}
Ar.prototype = Object.create(Error.prototype);
Ar.prototype.constructor = Ar;
Ar.prototype.toString = function(t) {
  return this.name + ": " + of(this, t);
};
var Mr = Ar;
const fr = mt;
function bo(e, t, n, r, i) {
  let o = "", s = "";
  const a = Math.floor(i / 2) - 1;
  return r - t > a && (o = " ... ", t = r - a + o.length), n - r > a && (s = " ...", n = r + a - s.length), {
    str: o + e.slice(t, n).replace(/\t/g, "→") + s,
    pos: r - t + o.length
    // relative position
  };
}
function Ro(e, t) {
  return fr.repeat(" ", t - e.length) + e;
}
function sg(e, t) {
  if (t = Object.create(t || null), !e.buffer) return null;
  t.maxLength || (t.maxLength = 79), typeof t.indent != "number" && (t.indent = 1), typeof t.linesBefore != "number" && (t.linesBefore = 3), typeof t.linesAfter != "number" && (t.linesAfter = 2);
  const n = /\r?\n|\r|\0/g, r = [0], i = [];
  let o, s = -1;
  for (; o = n.exec(e.buffer); )
    i.push(o.index), r.push(o.index + o[0].length), e.position <= o.index && s < 0 && (s = r.length - 2);
  s < 0 && (s = r.length - 1);
  let a = "";
  const l = Math.min(e.line + t.linesAfter, i.length).toString().length, m = t.maxLength - (t.indent + l + 3);
  for (let u = 1; u <= t.linesBefore && !(s - u < 0); u++) {
    const h = bo(
      e.buffer,
      r[s - u],
      i[s - u],
      e.position - (r[s] - r[s - u]),
      m
    );
    a = fr.repeat(" ", t.indent) + Ro((e.line - u + 1).toString(), l) + " | " + h.str + `
` + a;
  }
  const c = bo(e.buffer, r[s], i[s], e.position, m);
  a += fr.repeat(" ", t.indent) + Ro((e.line + 1).toString(), l) + " | " + c.str + `
`, a += fr.repeat("-", t.indent + l + 3 + c.pos) + `^
`;
  for (let u = 1; u <= t.linesAfter && !(s + u >= i.length); u++) {
    const h = bo(
      e.buffer,
      r[s + u],
      i[s + u],
      e.position - (r[s] - r[s + u]),
      m
    );
    a += fr.repeat(" ", t.indent) + Ro((e.line + u + 1).toString(), l) + " | " + h.str + `
`;
  }
  return a.replace(/\n$/, "");
}
var ag = sg;
const ml = Mr, lg = [
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
], cg = [
  "scalar",
  "sequence",
  "mapping"
];
function ug(e) {
  const t = {};
  return e !== null && Object.keys(e).forEach(function(n) {
    e[n].forEach(function(r) {
      t[String(r)] = n;
    });
  }), t;
}
function fg(e, t) {
  if (t = t || {}, Object.keys(t).forEach(function(n) {
    if (lg.indexOf(n) === -1)
      throw new ml('Unknown option "' + n + '" is met in definition of "' + e + '" YAML type.');
  }), this.options = t, this.tag = e, this.kind = t.kind || null, this.resolve = t.resolve || function() {
    return !0;
  }, this.construct = t.construct || function(n) {
    return n;
  }, this.instanceOf = t.instanceOf || null, this.predicate = t.predicate || null, this.represent = t.represent || null, this.representName = t.representName || null, this.defaultStyle = t.defaultStyle || null, this.multi = t.multi || !1, this.styleAliases = ug(t.styleAliases || null), cg.indexOf(this.kind) === -1)
    throw new ml('Unknown kind "' + this.kind + '" is specified for "' + e + '" YAML type.');
}
var Xe = fg;
const ar = Mr, $o = Xe;
function gl(e, t) {
  const n = [];
  return e[t].forEach(function(r) {
    let i = n.length;
    n.forEach(function(o, s) {
      o.tag === r.tag && o.kind === r.kind && o.multi === r.multi && (i = s);
    }), n[i] = r;
  }), n;
}
function dg() {
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
function ms(e) {
  return this.extend(e);
}
ms.prototype.extend = function(t) {
  let n = [], r = [];
  if (t instanceof $o)
    r.push(t);
  else if (Array.isArray(t))
    r = r.concat(t);
  else if (t && (Array.isArray(t.implicit) || Array.isArray(t.explicit)))
    t.implicit && (n = n.concat(t.implicit)), t.explicit && (r = r.concat(t.explicit));
  else
    throw new ar("Schema.extend argument should be a Type, [ Type ], or a schema definition ({ implicit: [...], explicit: [...] })");
  n.forEach(function(o) {
    if (!(o instanceof $o))
      throw new ar("Specified list of YAML types (or a single Type object) contains a non-Type object.");
    if (o.loadKind && o.loadKind !== "scalar")
      throw new ar("There is a non-scalar type in the implicit list of a schema. Implicit resolving of such types is not supported.");
    if (o.multi)
      throw new ar("There is a multi type in the implicit list of a schema. Multi tags can only be listed as explicit.");
  }), r.forEach(function(o) {
    if (!(o instanceof $o))
      throw new ar("Specified list of YAML types (or a single Type object) contains a non-Type object.");
  });
  const i = Object.create(ms.prototype);
  return i.implicit = (this.implicit || []).concat(n), i.explicit = (this.explicit || []).concat(r), i.compiledImplicit = gl(i, "implicit"), i.compiledExplicit = gl(i, "explicit"), i.compiledTypeMap = dg(i.compiledImplicit, i.compiledExplicit), i;
};
var sf = ms;
const hg = Xe;
var af = new hg("tag:yaml.org,2002:str", {
  kind: "scalar",
  construct: function(e) {
    return e !== null ? e : "";
  }
});
const pg = Xe;
var lf = new pg("tag:yaml.org,2002:seq", {
  kind: "sequence",
  construct: function(e) {
    return e !== null ? e : [];
  }
});
const mg = Xe;
var cf = new mg("tag:yaml.org,2002:map", {
  kind: "mapping",
  construct: function(e) {
    return e !== null ? e : {};
  }
});
const gg = sf;
var uf = new gg({
  explicit: [
    af,
    lf,
    cf
  ]
});
const Eg = Xe;
function yg(e) {
  if (e === null) return !0;
  const t = e.length;
  return t === 1 && e === "~" || t === 4 && (e === "null" || e === "Null" || e === "NULL");
}
function wg() {
  return null;
}
function _g(e) {
  return e === null;
}
var ff = new Eg("tag:yaml.org,2002:null", {
  kind: "scalar",
  resolve: yg,
  construct: wg,
  predicate: _g,
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
const vg = Xe;
function Sg(e) {
  if (e === null) return !1;
  const t = e.length;
  return t === 4 && (e === "true" || e === "True" || e === "TRUE") || t === 5 && (e === "false" || e === "False" || e === "FALSE");
}
function Ag(e) {
  return e === "true" || e === "True" || e === "TRUE";
}
function Tg(e) {
  return Object.prototype.toString.call(e) === "[object Boolean]";
}
var df = new vg("tag:yaml.org,2002:bool", {
  kind: "scalar",
  resolve: Sg,
  construct: Ag,
  predicate: Tg,
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
const Ig = mt, Cg = Xe;
function Dg(e) {
  return e >= 48 && e <= 57 || e >= 65 && e <= 70 || e >= 97 && e <= 102;
}
function Ng(e) {
  return e >= 48 && e <= 55;
}
function Og(e) {
  return e >= 48 && e <= 57;
}
function bg(e) {
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
        if (!Dg(e.charCodeAt(n))) return !1;
        r = !0;
      }
      return r && isFinite(dr(e));
    }
    if (i === "o") {
      for (n++; n < t; n++) {
        if (!Ng(e.charCodeAt(n))) return !1;
        r = !0;
      }
      return r && isFinite(dr(e));
    }
  }
  for (; n < t; n++) {
    if (!Og(e.charCodeAt(n)))
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
function Rg(e) {
  return dr(e);
}
function $g(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && e % 1 === 0 && !Ig.isNegativeZero(e);
}
var hf = new Cg("tag:yaml.org,2002:int", {
  kind: "scalar",
  resolve: bg,
  construct: Rg,
  predicate: $g,
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
const pf = mt, Lg = Xe, xg = new RegExp(
  // 2.5e4, 2.5 and integers
  "^(?:[-+]?(?:[0-9]+)(?:\\.[0-9]*)?(?:[eE][-+]?[0-9]+)?|\\.[0-9]+(?:[eE][-+]?[0-9]+)?|[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
), Pg = new RegExp(
  "^(?:[-+]?\\.(?:inf|Inf|INF)|\\.(?:nan|NaN|NAN))$"
);
function Fg(e) {
  return e === null || !xg.test(e) ? !1 : isFinite(parseFloat(e, 10)) ? !0 : Pg.test(e);
}
function Ug(e) {
  let t = e.toLowerCase();
  const n = t[0] === "-" ? -1 : 1;
  return "+-".indexOf(t[0]) >= 0 && (t = t.slice(1)), t === ".inf" ? n === 1 ? Number.POSITIVE_INFINITY : Number.NEGATIVE_INFINITY : t === ".nan" ? NaN : n * parseFloat(t, 10);
}
const kg = /^[-+]?[0-9]+e/;
function Mg(e, t) {
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
  else if (pf.isNegativeZero(e))
    return "-0.0";
  const n = e.toString(10);
  return kg.test(n) ? n.replace("e", ".e") : n;
}
function Bg(e) {
  return Object.prototype.toString.call(e) === "[object Number]" && (e % 1 !== 0 || pf.isNegativeZero(e));
}
var mf = new Lg("tag:yaml.org,2002:float", {
  kind: "scalar",
  resolve: Fg,
  construct: Ug,
  predicate: Bg,
  represent: Mg,
  defaultStyle: "lowercase"
}), gf = uf.extend({
  implicit: [
    ff,
    df,
    hf,
    mf
  ]
}), Ef = gf;
const jg = Xe, yf = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9])-([0-9][0-9])$"
), wf = new RegExp(
  "^([0-9][0-9][0-9][0-9])-([0-9][0-9]?)-([0-9][0-9]?)(?:[Tt]|[ \\t]+)([0-9][0-9]?):([0-9][0-9]):([0-9][0-9])(?:\\.([0-9]*))?(?:[ \\t]*(Z|([-+])([0-9][0-9]?)(?::([0-9][0-9]))?))?$"
);
function Hg(e) {
  return e === null ? !1 : yf.exec(e) !== null || wf.exec(e) !== null;
}
function Gg(e) {
  let t = 0, n = null, r = yf.exec(e);
  if (r === null && (r = wf.exec(e)), r === null) throw new Error("Date resolve error");
  const i = +r[1], o = +r[2] - 1, s = +r[3];
  if (!r[4])
    return new Date(Date.UTC(i, o, s));
  const a = +r[4], l = +r[5], m = +r[6];
  if (r[7]) {
    for (t = r[7].slice(0, 3); t.length < 3; )
      t += "0";
    t = +t;
  }
  if (r[9]) {
    const u = +r[10], h = +(r[11] || 0);
    n = (u * 60 + h) * 6e4, r[9] === "-" && (n = -n);
  }
  const c = new Date(Date.UTC(i, o, s, a, l, m, t));
  return n && c.setTime(c.getTime() - n), c;
}
function qg(e) {
  return e.toISOString();
}
var _f = new jg("tag:yaml.org,2002:timestamp", {
  kind: "scalar",
  resolve: Hg,
  construct: Gg,
  instanceOf: Date,
  represent: qg
});
const zg = Xe;
function Vg(e) {
  return e === "<<" || e === null;
}
var vf = new zg("tag:yaml.org,2002:merge", {
  kind: "scalar",
  resolve: Vg
});
const Wg = Xe, zs = `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=
\r`;
function Yg(e) {
  if (e === null) return !1;
  let t = 0;
  const n = e.length, r = zs;
  for (let i = 0; i < n; i++) {
    const o = r.indexOf(e.charAt(i));
    if (!(o > 64)) {
      if (o < 0) return !1;
      t += 6;
    }
  }
  return t % 8 === 0;
}
function Xg(e) {
  const t = e.replace(/[\r\n=]/g, ""), n = t.length, r = zs;
  let i = 0;
  const o = [];
  for (let a = 0; a < n; a++)
    a % 4 === 0 && a && (o.push(i >> 16 & 255), o.push(i >> 8 & 255), o.push(i & 255)), i = i << 6 | r.indexOf(t.charAt(a));
  const s = n % 4 * 6;
  return s === 0 ? (o.push(i >> 16 & 255), o.push(i >> 8 & 255), o.push(i & 255)) : s === 18 ? (o.push(i >> 10 & 255), o.push(i >> 2 & 255)) : s === 12 && o.push(i >> 4 & 255), new Uint8Array(o);
}
function Jg(e) {
  let t = "", n = 0;
  const r = e.length, i = zs;
  for (let s = 0; s < r; s++)
    s % 3 === 0 && s && (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]), n = (n << 8) + e[s];
  const o = r % 3;
  return o === 0 ? (t += i[n >> 18 & 63], t += i[n >> 12 & 63], t += i[n >> 6 & 63], t += i[n & 63]) : o === 2 ? (t += i[n >> 10 & 63], t += i[n >> 4 & 63], t += i[n << 2 & 63], t += i[64]) : o === 1 && (t += i[n >> 2 & 63], t += i[n << 4 & 63], t += i[64], t += i[64]), t;
}
function Zg(e) {
  return Object.prototype.toString.call(e) === "[object Uint8Array]";
}
var Sf = new Wg("tag:yaml.org,2002:binary", {
  kind: "scalar",
  resolve: Yg,
  construct: Xg,
  predicate: Zg,
  represent: Jg
});
const Kg = Xe, El = Object.prototype.hasOwnProperty, Qg = Object.prototype.toString;
function eE(e) {
  if (e === null) return !0;
  const t = {}, n = e;
  for (let r = 0, i = n.length; r < i; r += 1) {
    const o = n[r];
    let s = !1;
    if (Qg.call(o) !== "[object Object]") return !1;
    let a;
    for (a in o)
      if (El.call(o, a))
        if (!s) s = !0;
        else return !1;
    if (!s || El.call(t, a)) return !1;
    Object.defineProperty(t, a, { value: !0 });
  }
  return !0;
}
function tE(e) {
  return e !== null ? e : [];
}
var Af = new Kg("tag:yaml.org,2002:omap", {
  kind: "sequence",
  resolve: eE,
  construct: tE
});
const nE = Xe, rE = Object.prototype.toString;
function iE(e) {
  if (e === null) return !0;
  const t = e, n = new Array(t.length);
  for (let r = 0, i = t.length; r < i; r += 1) {
    const o = t[r];
    if (rE.call(o) !== "[object Object]") return !1;
    const s = Object.keys(o);
    if (s.length !== 1) return !1;
    n[r] = [s[0], o[s[0]]];
  }
  return !0;
}
function oE(e) {
  if (e === null) return [];
  const t = e, n = new Array(t.length);
  for (let r = 0, i = t.length; r < i; r += 1) {
    const o = t[r], s = Object.keys(o);
    n[r] = [s[0], o[s[0]]];
  }
  return n;
}
var Tf = new nE("tag:yaml.org,2002:pairs", {
  kind: "sequence",
  resolve: iE,
  construct: oE
});
const sE = Xe, aE = Object.prototype.hasOwnProperty;
function lE(e) {
  if (e === null) return !0;
  const t = e;
  for (const n in t)
    if (aE.call(t, n) && t[n] !== null)
      return !1;
  return !0;
}
function cE(e) {
  return e !== null ? e : {};
}
var If = new sE("tag:yaml.org,2002:set", {
  kind: "mapping",
  resolve: lE,
  construct: cE
}), Vs = Ef.extend({
  implicit: [
    _f,
    vf
  ],
  explicit: [
    Sf,
    Af,
    Tf,
    If
  ]
});
const fn = mt, Cf = Mr, uE = ag, fE = Vs, pt = Object.prototype.hasOwnProperty, bi = 1, Df = 2, Nf = 3, Ri = 4, Lo = 1, dE = 2, yl = 3, hE = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F-\x84\x86-\x9F\uFFFE\uFFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/, pE = /[\x85\u2028\u2029]/, mE = /[,\[\]{}]/, Of = /^(?:!|!!|![0-9A-Za-z-]+!)$/, bf = /^(?:!|[^,\[\]{}])(?:%[0-9a-f]{2}|[0-9a-z\-#;/?:@&=+$,_.!~*'()\[\]])*$/i;
function wl(e) {
  return Object.prototype.toString.call(e);
}
function Tt(e) {
  return e === 10 || e === 13;
}
function $t(e) {
  return e === 9 || e === 32;
}
function Ke(e) {
  return e === 9 || e === 32 || e === 10 || e === 13;
}
function kn(e) {
  return e === 44 || e === 91 || e === 93 || e === 123 || e === 125;
}
function gE(e) {
  if (e >= 48 && e <= 57)
    return e - 48;
  const t = e | 32;
  return t >= 97 && t <= 102 ? t - 97 + 10 : -1;
}
function EE(e) {
  return e === 120 ? 2 : e === 117 ? 4 : e === 85 ? 8 : 0;
}
function yE(e) {
  return e >= 48 && e <= 57 ? e - 48 : -1;
}
function _l(e) {
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
function wE(e) {
  return e <= 65535 ? String.fromCharCode(e) : String.fromCharCode(
    (e - 65536 >> 10) + 55296,
    (e - 65536 & 1023) + 56320
  );
}
function Rf(e, t, n) {
  t === "__proto__" ? Object.defineProperty(e, t, {
    configurable: !0,
    enumerable: !0,
    writable: !0,
    value: n
  }) : e[t] = n;
}
const $f = new Array(256), Lf = new Array(256);
for (let e = 0; e < 256; e++)
  $f[e] = _l(e) ? 1 : 0, Lf[e] = _l(e);
function _E(e, t) {
  this.input = e, this.filename = t.filename || null, this.schema = t.schema || fE, this.onWarning = t.onWarning || null, this.legacy = t.legacy || !1, this.json = t.json || !1, this.listener = t.listener || null, this.maxDepth = typeof t.maxDepth == "number" ? t.maxDepth : 100, this.maxTotalMergeKeys = typeof t.maxTotalMergeKeys == "number" ? t.maxTotalMergeKeys : 1e4, this.implicitTypes = this.schema.compiledImplicit, this.typeMap = this.schema.compiledTypeMap, this.length = e.length, this.position = 0, this.line = 0, this.lineStart = 0, this.lineIndent = 0, this.depth = 0, this.totalMergeKeys = 0, this.firstTabInLine = -1, this.documents = [], this.anchorMapTransactions = [];
}
function xf(e, t) {
  const n = {
    name: e.filename,
    buffer: e.input.slice(0, -1),
    // omit trailing \0
    position: e.position,
    line: e.line,
    column: e.position - e.lineStart
  };
  return n.snippet = uE(n), new Cf(t, n);
}
function J(e, t) {
  throw xf(e, t);
}
function $i(e, t) {
  e.onWarning && e.onWarning.call(null, xf(e, t));
}
function hn(e, t, n) {
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
function vE(e) {
  e.anchorMapTransactions.push(/* @__PURE__ */ Object.create(null));
}
function SE(e) {
  const t = e.anchorMapTransactions.pop(), n = e.anchorMapTransactions;
  if (n.length === 0) return;
  const r = n[n.length - 1], i = Object.keys(t);
  for (let o = 0, s = i.length; o < s; o += 1) {
    const a = i[o];
    pt.call(r, a) || (r[a] = t[a]);
  }
}
function AE(e) {
  const t = e.anchorMapTransactions.pop(), n = Object.keys(t);
  for (let r = n.length - 1; r >= 0; r -= 1) {
    const i = t[n[r]];
    i.existed ? e.anchorMap[n[r]] = i.value : delete e.anchorMap[n[r]];
  }
}
function Pf(e) {
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
function vl(e, t) {
  e.position = t.position, e.line = t.line, e.lineStart = t.lineStart, e.lineIndent = t.lineIndent, e.firstTabInLine = t.firstTabInLine, e.tag = t.tag, e.anchor = t.anchor, e.kind = t.kind, e.result = t.result;
}
const Sl = {
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
    i = r[1], Of.test(o) || J(t, "ill-formed tag handle (first argument) of the TAG directive"), pt.call(t.tagMap, o) && J(t, 'there is a previously declared suffix for "' + o + '" tag handle'), bf.test(i) || J(t, "ill-formed tag prefix (second argument) of the TAG directive");
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
    else hE.test(i) && J(e, "the stream contains non-printable characters");
    e.result += i;
  }
}
function Al(e) {
  e.totalMergeKeys++, e.maxTotalMergeKeys !== -1 && e.totalMergeKeys > e.maxTotalMergeKeys && J(e, "merge keys exceeded maxTotalMergeKeys (" + e.maxTotalMergeKeys + ")");
}
function Tl(e, t, n, r) {
  fn.isObject(n) || J(e, "cannot merge mappings; the provided source object is unacceptable"), Al(e);
  const i = Object.keys(n);
  for (let o = 0, s = i.length; o < s; o += 1) {
    const a = i[o];
    Al(e), pt.call(t, a) || (Rf(t, a, n[a]), r[a] = !0);
  }
}
function Mn(e, t, n, r, i, o, s, a, l) {
  if (Array.isArray(i)) {
    i = Array.prototype.slice.call(i);
    for (let m = 0, c = i.length; m < c; m += 1)
      Array.isArray(i[m]) && J(e, "nested arrays are not supported inside keys"), typeof i == "object" && wl(i[m]) === "[object Object]" && (i[m] = "[object Object]");
  }
  if (typeof i == "object" && wl(i) === "[object Object]" && (i = "[object Object]"), i = String(i), t === null && (t = {}), r === "tag:yaml.org,2002:merge")
    if (Array.isArray(o)) {
      o.length > 100 && J(e, "abnormal merge sequence size");
      for (let m = 0, c = o.length; m < c; m += 1)
        Tl(e, t, o[m], n);
    } else
      Tl(e, t, o, n);
  else
    !e.json && !pt.call(n, i) && pt.call(t, i) && (e.line = s || e.line, e.lineStart = a || e.lineStart, e.position = l || e.position, J(e, "duplicated mapping key")), Rf(t, i, o), delete n[i];
  return t;
}
function Ws(e) {
  const t = e.input.charCodeAt(e.position);
  t === 10 ? e.position++ : t === 13 ? (e.position++, e.input.charCodeAt(e.position) === 10 && e.position++) : J(e, "a line break is expected"), e.line += 1, e.lineStart = e.position, e.firstTabInLine = -1;
}
function Ie(e, t, n) {
  let r = 0, i = e.input.charCodeAt(e.position);
  for (; i !== 0; ) {
    for (; $t(i); )
      i === 9 && e.firstTabInLine === -1 && (e.firstTabInLine = e.position), i = e.input.charCodeAt(++e.position);
    if (t && i === 35)
      do
        i = e.input.charCodeAt(++e.position);
      while (i !== 10 && i !== 13 && i !== 0);
    if (Tt(i))
      for (Ws(e), i = e.input.charCodeAt(e.position), r++, e.lineIndent = 0; i === 32; )
        e.lineIndent++, i = e.input.charCodeAt(++e.position);
    else
      break;
  }
  return n !== -1 && r !== 0 && e.lineIndent < n && $i(e, "deficient indentation"), r;
}
function Wi(e) {
  let t = e.position, n = e.input.charCodeAt(t);
  return !!((n === 45 || n === 46) && n === e.input.charCodeAt(t + 1) && n === e.input.charCodeAt(t + 2) && (t += 3, n = e.input.charCodeAt(t), n === 0 || Ke(n)));
}
function Ys(e, t) {
  t === 1 ? e.result += " " : t > 1 && (e.result += fn.repeat(`
`, t - 1));
}
function TE(e, t, n) {
  let r, i, o, s, a, l;
  const m = e.kind, c = e.result;
  let u = e.input.charCodeAt(e.position);
  if (Ke(u) || kn(u) || u === 35 || u === 38 || u === 42 || u === 33 || u === 124 || u === 62 || u === 39 || u === 34 || u === 37 || u === 64 || u === 96)
    return !1;
  if (u === 63 || u === 45) {
    const h = e.input.charCodeAt(e.position + 1);
    if (Ke(h) || n && kn(h))
      return !1;
  }
  for (e.kind = "scalar", e.result = "", r = i = e.position, o = !1; u !== 0; ) {
    if (u === 58) {
      const h = e.input.charCodeAt(e.position + 1);
      if (Ke(h) || n && kn(h))
        break;
    } else if (u === 35) {
      const h = e.input.charCodeAt(e.position - 1);
      if (Ke(h))
        break;
    } else {
      if (e.position === e.lineStart && Wi(e) || n && kn(u))
        break;
      if (Tt(u))
        if (s = e.line, a = e.lineStart, l = e.lineIndent, Ie(e, !1, -1), e.lineIndent >= t) {
          o = !0, u = e.input.charCodeAt(e.position);
          continue;
        } else {
          e.position = i, e.line = s, e.lineStart = a, e.lineIndent = l;
          break;
        }
    }
    o && (Wt(e, r, i, !1), Ys(e, e.line - s), r = i = e.position, o = !1), $t(u) || (i = e.position + 1), u = e.input.charCodeAt(++e.position);
  }
  return Wt(e, r, i, !1), e.result ? !0 : (e.kind = m, e.result = c, !1);
}
function IE(e, t) {
  let n, r, i = e.input.charCodeAt(e.position);
  if (i !== 39)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (i = e.input.charCodeAt(e.position)) !== 0; )
    if (i === 39)
      if (Wt(e, n, e.position, !0), i = e.input.charCodeAt(++e.position), i === 39)
        n = e.position, e.position++, r = e.position;
      else
        return !0;
    else Tt(i) ? (Wt(e, n, r, !0), Ys(e, Ie(e, !1, t)), n = r = e.position) : e.position === e.lineStart && Wi(e) ? J(e, "unexpected end of the document within a single quoted scalar") : (e.position++, $t(i) || (r = e.position));
  J(e, "unexpected end of the stream within a single quoted scalar");
}
function CE(e, t) {
  let n, r, i, o = e.input.charCodeAt(e.position);
  if (o !== 34)
    return !1;
  for (e.kind = "scalar", e.result = "", e.position++, n = r = e.position; (o = e.input.charCodeAt(e.position)) !== 0; ) {
    if (o === 34)
      return Wt(e, n, e.position, !0), e.position++, !0;
    if (o === 92) {
      if (Wt(e, n, e.position, !0), o = e.input.charCodeAt(++e.position), Tt(o))
        Ie(e, !1, t);
      else if (o < 256 && $f[o])
        e.result += Lf[o], e.position++;
      else if ((i = EE(o)) > 0) {
        let s = i, a = 0;
        for (; s > 0; s--)
          o = e.input.charCodeAt(++e.position), (i = gE(o)) >= 0 ? a = (a << 4) + i : J(e, "expected hexadecimal character");
        e.result += wE(a), e.position++;
      } else
        J(e, "unknown escape sequence");
      n = r = e.position;
    } else Tt(o) ? (Wt(e, n, r, !0), Ys(e, Ie(e, !1, t)), n = r = e.position) : e.position === e.lineStart && Wi(e) ? J(e, "unexpected end of the document within a double quoted scalar") : (e.position++, $t(o) || (r = e.position));
  }
  J(e, "unexpected end of the stream within a double quoted scalar");
}
function DE(e, t) {
  let n = !0, r, i, o;
  const s = e.tag;
  let a;
  const l = e.anchor;
  let m, c, u, h;
  const w = /* @__PURE__ */ Object.create(null);
  let p, f, y, _ = e.input.charCodeAt(e.position);
  if (_ === 91)
    m = 93, h = !1, a = [];
  else if (_ === 123)
    m = 125, h = !0, a = {};
  else
    return !1;
  for (e.anchor !== null && hn(e, e.anchor, a), _ = e.input.charCodeAt(++e.position); _ !== 0; ) {
    if (Ie(e, !0, t), _ = e.input.charCodeAt(e.position), _ === m)
      return e.position++, e.tag = s, e.anchor = l, e.kind = h ? "mapping" : "sequence", e.result = a, !0;
    if (n ? _ === 44 && J(e, "expected the node content, but found ','") : J(e, "missed comma between flow collection entries"), f = p = y = null, c = u = !1, _ === 63) {
      const E = e.input.charCodeAt(e.position + 1);
      Ke(E) && (c = u = !0, e.position++, Ie(e, !0, t));
    }
    r = e.line, i = e.lineStart, o = e.position, Yn(e, t, bi, !1, !0), f = e.tag, p = e.result, Ie(e, !0, t), _ = e.input.charCodeAt(e.position), (u || e.line === r) && _ === 58 && (c = !0, _ = e.input.charCodeAt(++e.position), Ie(e, !0, t), Yn(e, t, bi, !1, !0), y = e.result), h ? Mn(e, a, w, f, p, y, r, i, o) : c ? a.push(Mn(e, null, w, f, p, y, r, i, o)) : a.push(p), Ie(e, !0, t), _ = e.input.charCodeAt(e.position), _ === 44 ? (n = !0, _ = e.input.charCodeAt(++e.position)) : n = !1;
  }
  J(e, "unexpected end of the stream within a flow collection");
}
function NE(e, t) {
  let n, r = Lo, i = !1, o = !1, s = t, a = 0, l = !1, m, c = e.input.charCodeAt(e.position);
  if (c === 124)
    n = !1;
  else if (c === 62)
    n = !0;
  else
    return !1;
  for (e.kind = "scalar", e.result = ""; c !== 0; )
    if (c = e.input.charCodeAt(++e.position), c === 43 || c === 45)
      Lo === r ? r = c === 43 ? yl : dE : J(e, "repeat of a chomping mode identifier");
    else if ((m = yE(c)) >= 0)
      m === 0 ? J(e, "bad explicit indentation width of a block scalar; it cannot be less than one") : o ? J(e, "repeat of an indentation width identifier") : (s = t + m - 1, o = !0);
    else
      break;
  if ($t(c)) {
    do
      c = e.input.charCodeAt(++e.position);
    while ($t(c));
    if (c === 35)
      do
        c = e.input.charCodeAt(++e.position);
      while (!Tt(c) && c !== 0);
  }
  for (; c !== 0; ) {
    for (Ws(e), e.lineIndent = 0, c = e.input.charCodeAt(e.position); (!o || e.lineIndent < s) && c === 32; )
      e.lineIndent++, c = e.input.charCodeAt(++e.position);
    if (!o && e.lineIndent > s && (s = e.lineIndent), Tt(c)) {
      a++;
      continue;
    }
    if (!o && s === 0 && J(e, "missing indentation for block scalar"), e.lineIndent < s) {
      r === yl ? e.result += fn.repeat(`
`, i ? 1 + a : a) : r === Lo && i && (e.result += `
`);
      break;
    }
    n ? $t(c) ? (l = !0, e.result += fn.repeat(`
`, i ? 1 + a : a)) : l ? (l = !1, e.result += fn.repeat(`
`, a + 1)) : a === 0 ? i && (e.result += " ") : e.result += fn.repeat(`
`, a) : e.result += fn.repeat(`
`, i ? 1 + a : a), i = !0, o = !0, a = 0;
    const u = e.position;
    for (; !Tt(c) && c !== 0; )
      c = e.input.charCodeAt(++e.position);
    Wt(e, u, e.position, !1);
  }
  return !0;
}
function Il(e, t) {
  const n = e.tag, r = e.anchor, i = [];
  let o = !1;
  if (e.firstTabInLine !== -1) return !1;
  e.anchor !== null && hn(e, e.anchor, i);
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
    if (Yn(e, t, Nf, !1, !0), i.push(e.result), Ie(e, !0, -1), s = e.input.charCodeAt(e.position), (e.line === l || e.lineIndent > t) && s !== 0)
      J(e, "bad indentation of a sequence entry");
    else if (e.lineIndent < t)
      break;
  }
  return o ? (e.tag = n, e.anchor = r, e.kind = "sequence", e.result = i, !0) : !1;
}
function Ff(e, t, n) {
  let r, i, o, s;
  const a = e.tag, l = e.anchor, m = {}, c = /* @__PURE__ */ Object.create(null);
  let u = null, h = null, w = null, p = !1, f = !1;
  if (e.firstTabInLine !== -1) return !1;
  e.anchor !== null && hn(e, e.anchor, m);
  let y = e.input.charCodeAt(e.position);
  for (; y !== 0; ) {
    !p && e.firstTabInLine !== -1 && (e.position = e.firstTabInLine, J(e, "tab characters must not be used in indentation"));
    const _ = e.input.charCodeAt(e.position + 1), E = e.line;
    if ((y === 63 || y === 58) && Ke(_))
      y === 63 ? (p && (Mn(e, m, c, u, h, null, i, o, s), u = h = w = null), f = !0, p = !0, r = !0) : p ? (p = !1, r = !0) : J(e, "incomplete explicit mapping pair; a key node is missed; or followed by a non-tabulated empty line"), e.position += 1, y = _;
    else {
      if (i = e.line, o = e.lineStart, s = e.position, !Yn(e, n, Df, !1, !0))
        break;
      if (e.line === E) {
        for (y = e.input.charCodeAt(e.position); $t(y); )
          y = e.input.charCodeAt(++e.position);
        if (y === 58)
          y = e.input.charCodeAt(++e.position), Ke(y) || J(e, "a whitespace character is expected after the key-value separator within a block mapping"), p && (Mn(e, m, c, u, h, null, i, o, s), u = h = w = null), f = !0, p = !1, r = !1, u = e.tag, h = e.result;
        else if (f)
          J(e, "can not read an implicit mapping pair; a colon is missed");
        else
          return e.tag = a, e.anchor = l, !0;
      } else if (f)
        J(e, "can not read a block mapping entry; a multiline key may not be an implicit key");
      else
        return e.tag = a, e.anchor = l, !0;
    }
    if ((e.line === E || e.lineIndent > t) && (p && (i = e.line, o = e.lineStart, s = e.position), Yn(e, t, Ri, !0, r) && (p ? h = e.result : w = e.result), p || (Mn(e, m, c, u, h, w, i, o, s), u = h = w = null), Ie(e, !0, -1), y = e.input.charCodeAt(e.position)), (e.line === E || e.lineIndent > t) && y !== 0)
      J(e, "bad indentation of a mapping entry");
    else if (e.lineIndent < t)
      break;
  }
  return p && Mn(e, m, c, u, h, null, i, o, s), f && (e.tag = a, e.anchor = l, e.kind = "mapping", e.result = m), f;
}
function OE(e) {
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
      o === 33 && (n ? J(e, "tag suffix cannot contain exclamation marks") : (r = e.input.slice(s - 1, e.position + 1), Of.test(r) || J(e, "named tag handle cannot contain such characters"), n = !0, s = e.position + 1)), o = e.input.charCodeAt(++e.position);
    i = e.input.slice(s, e.position), mE.test(i) && J(e, "tag suffix cannot contain flow indicator characters");
  }
  i && !bf.test(i) && J(e, "tag name cannot contain such characters: " + i);
  try {
    i = decodeURIComponent(i);
  } catch {
    J(e, "tag name is malformed: " + i);
  }
  return t ? e.tag = i : pt.call(e.tagMap, r) ? e.tag = e.tagMap[r] + i : r === "!" ? e.tag = "!" + i : r === "!!" ? e.tag = "tag:yaml.org,2002:" + i : J(e, 'undeclared tag handle "' + r + '"'), !0;
}
function bE(e) {
  let t = e.input.charCodeAt(e.position);
  if (t !== 38) return !1;
  e.anchor !== null && J(e, "duplication of an anchor property"), t = e.input.charCodeAt(++e.position);
  const n = e.position;
  for (; t !== 0 && !Ke(t) && !kn(t); )
    t = e.input.charCodeAt(++e.position);
  return e.position === n && J(e, "name of an anchor node must contain at least one character"), e.anchor = e.input.slice(n, e.position), !0;
}
function RE(e) {
  let t = e.input.charCodeAt(e.position);
  if (t !== 42) return !1;
  t = e.input.charCodeAt(++e.position);
  const n = e.position;
  for (; t !== 0 && !Ke(t) && !kn(t); )
    t = e.input.charCodeAt(++e.position);
  e.position === n && J(e, "name of an alias node must contain at least one character");
  const r = e.input.slice(n, e.position);
  return pt.call(e.anchorMap, r) || J(e, 'unidentified alias "' + r + '"'), e.result = e.anchorMap[r], Ie(e, !0, -1), !0;
}
function $E(e, t, n, r) {
  const i = Pf(e);
  return vE(e), vl(e, t), e.tag = null, e.anchor = null, e.kind = null, e.result = null, Ff(e, n, r) && e.kind === "mapping" ? (SE(e), !0) : (AE(e), vl(e, i), !1);
}
function Yn(e, t, n, r, i) {
  let o, s, a = 1, l = !1, m = !1, c = null, u, h, w;
  e.depth >= e.maxDepth && J(e, "nesting exceeded maxDepth (" + e.maxDepth + ")"), e.depth += 1, e.listener !== null && e.listener("open", e), e.tag = null, e.anchor = null, e.kind = null, e.result = null;
  const p = o = s = Ri === n || Nf === n;
  if (r && Ie(e, !0, -1) && (l = !0, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : e.lineIndent < t && (a = -1)), a === 1)
    for (; ; ) {
      const f = e.input.charCodeAt(e.position), y = Pf(e);
      if (l && (f === 33 && e.tag !== null || f === 38 && e.anchor !== null) || !OE(e) && !bE(e))
        break;
      c === null && (c = y), Ie(e, !0, -1) ? (l = !0, s = p, e.lineIndent > t ? a = 1 : e.lineIndent === t ? a = 0 : e.lineIndent < t && (a = -1)) : s = !1;
    }
  if (s && (s = l || i), a === 1 || Ri === n)
    if (bi === n || Df === n ? h = t : h = t + 1, w = e.position - e.lineStart, a === 1)
      if (s && (Il(e, w) || Ff(e, w, h)) || DE(e, h))
        m = !0;
      else {
        const f = e.input.charCodeAt(e.position);
        c !== null && p && !s && f !== 124 && f !== 62 && $E(
          e,
          c,
          c.position - c.lineStart,
          h
        ) || o && NE(e, h) || IE(e, h) || CE(e, h) ? m = !0 : RE(e) ? (m = !0, (e.tag !== null || e.anchor !== null) && J(e, "alias node should not have any properties")) : TE(e, h, bi === n) && (m = !0, e.tag === null && (e.tag = "?")), e.anchor !== null && hn(e, e.anchor, e.result);
      }
    else a === 0 && (m = s && Il(e, w));
  if (e.tag === null)
    e.anchor !== null && hn(e, e.anchor, e.result);
  else if (e.tag === "?") {
    e.result !== null && e.kind !== "scalar" && J(e, 'unacceptable node kind for !<?> tag; it should be "scalar", not "' + e.kind + '"');
    for (let f = 0, y = e.implicitTypes.length; f < y; f += 1)
      if (u = e.implicitTypes[f], u.resolve(e.result)) {
        e.result = u.construct(e.result), e.tag = u.tag, e.anchor !== null && hn(e, e.anchor, e.result);
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
    u || J(e, "unknown tag !<" + e.tag + ">"), e.result !== null && u.kind !== e.kind && J(e, "unacceptable node kind for !<" + e.tag + '> tag; it should be "' + u.kind + '", not "' + e.kind + '"'), u.resolve(e.result, e.tag) ? (e.result = u.construct(e.result, e.tag), e.anchor !== null && hn(e, e.anchor, e.result)) : J(e, "cannot resolve a node with !<" + e.tag + "> explicit tag");
  }
  return e.listener !== null && e.listener("close", e), e.depth -= 1, e.tag !== null || e.anchor !== null || m;
}
function LE(e) {
  const t = e.position;
  let n = !1, r;
  for (e.version = null, e.checkLineBreaks = e.legacy, e.tagMap = /* @__PURE__ */ Object.create(null), e.anchorMap = /* @__PURE__ */ Object.create(null); (r = e.input.charCodeAt(e.position)) !== 0 && (Ie(e, !0, -1), r = e.input.charCodeAt(e.position), !(e.lineIndent > 0 || r !== 37)); ) {
    n = !0, r = e.input.charCodeAt(++e.position);
    let i = e.position;
    for (; r !== 0 && !Ke(r); )
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
      for (i = e.position; r !== 0 && !Ke(r); )
        r = e.input.charCodeAt(++e.position);
      s.push(e.input.slice(i, e.position));
    }
    r !== 0 && Ws(e), pt.call(Sl, o) ? Sl[o](e, o, s) : $i(e, 'unknown document directive "' + o + '"');
  }
  if (Ie(e, !0, -1), e.lineIndent === 0 && e.input.charCodeAt(e.position) === 45 && e.input.charCodeAt(e.position + 1) === 45 && e.input.charCodeAt(e.position + 2) === 45 ? (e.position += 3, Ie(e, !0, -1)) : n && J(e, "directives end mark is expected"), Yn(e, e.lineIndent - 1, Ri, !1, !0), Ie(e, !0, -1), e.checkLineBreaks && pE.test(e.input.slice(t, e.position)) && $i(e, "non-ASCII line breaks are interpreted as content"), e.documents.push(e.result), e.position === e.lineStart && Wi(e)) {
    e.input.charCodeAt(e.position) === 46 && (e.position += 3, Ie(e, !0, -1));
    return;
  }
  e.position < e.length - 1 && J(e, "end of the stream or a document separator is expected");
}
function Uf(e, t) {
  e = String(e), t = t || {}, e.length !== 0 && (e.charCodeAt(e.length - 1) !== 10 && e.charCodeAt(e.length - 1) !== 13 && (e += `
`), e.charCodeAt(0) === 65279 && (e = e.slice(1)));
  const n = new _E(e, t), r = e.indexOf("\0");
  for (r !== -1 && (n.position = r, J(n, "null byte is not allowed in input")), n.input += "\0"; n.input.charCodeAt(n.position) === 32; )
    n.lineIndent += 1, n.position += 1;
  for (; n.position < n.length - 1; )
    LE(n);
  return n.documents;
}
function xE(e, t, n) {
  t !== null && typeof t == "object" && typeof n > "u" && (n = t, t = null);
  const r = Uf(e, n);
  if (typeof t != "function")
    return r;
  for (let i = 0, o = r.length; i < o; i += 1)
    t(r[i]);
}
function PE(e, t) {
  const n = Uf(e, t);
  if (n.length !== 0) {
    if (n.length === 1)
      return n[0];
    throw new Cf("expected a single document in the stream, but found more");
  }
}
qs.loadAll = xE;
qs.load = PE;
var kf = {};
const Yi = mt, Br = Mr, FE = Vs, Mf = Object.prototype.toString, Bf = Object.prototype.hasOwnProperty, Xs = 65279, UE = 9, Tr = 10, kE = 13, ME = 32, BE = 33, jE = 34, gs = 35, HE = 37, GE = 38, qE = 39, zE = 42, jf = 44, VE = 45, Li = 58, WE = 61, YE = 62, XE = 63, JE = 64, Hf = 91, Gf = 93, ZE = 96, qf = 123, KE = 124, zf = 125, Ge = {};
Ge[0] = "\\0";
Ge[7] = "\\a";
Ge[8] = "\\b";
Ge[9] = "\\t";
Ge[10] = "\\n";
Ge[11] = "\\v";
Ge[12] = "\\f";
Ge[13] = "\\r";
Ge[27] = "\\e";
Ge[34] = '\\"';
Ge[92] = "\\\\";
Ge[133] = "\\N";
Ge[160] = "\\_";
Ge[8232] = "\\L";
Ge[8233] = "\\P";
const QE = [
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
], ey = /^[-+]?[0-9_]+(?::[0-9_]+)+(?:\.[0-9_]*)?$/;
function ty(e, t) {
  if (t === null) return {};
  const n = {}, r = Object.keys(t);
  for (let i = 0, o = r.length; i < o; i += 1) {
    let s = r[i], a = String(t[s]);
    s.slice(0, 2) === "!!" && (s = "tag:yaml.org,2002:" + s.slice(2));
    const l = e.compiledTypeMap.fallback[s];
    l && Bf.call(l.styleAliases, a) && (a = l.styleAliases[a]), n[s] = a;
  }
  return n;
}
function ny(e) {
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
  return "\\" + t + Yi.repeat("0", n - r.length) + r;
}
const ry = 1, Ir = 2;
function iy(e) {
  this.schema = e.schema || FE, this.indent = Math.max(1, e.indent || 2), this.noArrayIndent = e.noArrayIndent || !1, this.skipInvalid = e.skipInvalid || !1, this.flowLevel = Yi.isNothing(e.flowLevel) ? -1 : e.flowLevel, this.styleMap = ty(this.schema, e.styles || null), this.sortKeys = e.sortKeys || !1, this.lineWidth = e.lineWidth || 80, this.noRefs = e.noRefs || !1, this.noCompatMode = e.noCompatMode || !1, this.condenseFlow = e.condenseFlow || !1, this.quotingType = e.quotingType === '"' ? Ir : ry, this.forceQuotes = e.forceQuotes || !1, this.replacer = typeof e.replacer == "function" ? e.replacer : null, this.implicitTypes = this.schema.compiledImplicit, this.explicitTypes = this.schema.compiledExplicit, this.tag = null, this.result = "", this.duplicates = [], this.usedDuplicates = null;
}
function Cl(e, t) {
  const n = Yi.repeat(" ", t);
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
function Es(e, t) {
  return `
` + Yi.repeat(" ", e.indent * t);
}
function oy(e, t) {
  for (let n = 0, r = e.implicitTypes.length; n < r; n += 1)
    if (e.implicitTypes[n].resolve(t))
      return !0;
  return !1;
}
function xi(e) {
  return e === ME || e === UE;
}
function Cr(e) {
  return e >= 32 && e <= 126 || e >= 161 && e <= 55295 && e !== 8232 && e !== 8233 || e >= 57344 && e <= 65533 && e !== Xs || e >= 65536 && e <= 1114111;
}
function Dl(e) {
  return Cr(e) && e !== Xs && // - b-char
  e !== kE && e !== Tr;
}
function Nl(e, t, n) {
  const r = Dl(e), i = r && !xi(e);
  return (
    // ns-plain-safe
    (n ? r : r && // - c-flow-indicator
    e !== jf && e !== Hf && e !== Gf && e !== qf && e !== zf) && // ns-plain-char
    e !== gs && // false on '#'
    !(t === Li && !i) || // false on ': '
    Dl(t) && !xi(t) && e === gs || // change to true on '[^ ]#'
    t === Li && i
  );
}
function sy(e) {
  return Cr(e) && e !== Xs && !xi(e) && // - s-white
  // - (c-indicator ::=
  // “-” | “?” | “:” | “,” | “[” | “]” | “{” | “}”
  e !== VE && e !== XE && e !== Li && e !== jf && e !== Hf && e !== Gf && e !== qf && e !== zf && // | “#” | “&” | “*” | “!” | “|” | “=” | “>” | “'” | “"”
  e !== gs && e !== GE && e !== zE && e !== BE && e !== KE && e !== WE && e !== YE && e !== qE && e !== jE && // | “%” | “@” | “`”)
  e !== HE && e !== JE && e !== ZE;
}
function ay(e) {
  return !xi(e) && e !== Li;
}
function hr(e, t) {
  const n = e.charCodeAt(t);
  let r;
  return n >= 55296 && n <= 56319 && t + 1 < e.length && (r = e.charCodeAt(t + 1), r >= 56320 && r <= 57343) ? (n - 55296) * 1024 + r - 56320 + 65536 : n;
}
function Vf(e) {
  return /^\n* /.test(e);
}
const Wf = 1, ys = 2, Yf = 3, Xf = 4, xn = 5;
function ly(e, t, n, r, i, o, s, a) {
  let l, m = 0, c = null, u = !1, h = !1;
  const w = r !== -1;
  let p = -1, f = sy(hr(e, 0)) && ay(hr(e, e.length - 1));
  if (t || s)
    for (l = 0; l < e.length; m >= 65536 ? l += 2 : l++) {
      if (m = hr(e, l), !Cr(m))
        return xn;
      f = f && Nl(m, c, a), c = m;
    }
  else {
    for (l = 0; l < e.length; m >= 65536 ? l += 2 : l++) {
      if (m = hr(e, l), m === Tr)
        u = !0, w && (h = h || // Foldable line = too long, and not more-indented.
        l - p - 1 > r && e[p + 1] !== " ", p = l);
      else if (!Cr(m))
        return xn;
      f = f && Nl(m, c, a), c = m;
    }
    h = h || w && l - p - 1 > r && e[p + 1] !== " ";
  }
  return !u && !h ? f && !s && !i(e) ? Wf : o === Ir ? xn : ys : n > 9 && Vf(e) ? xn : s ? o === Ir ? xn : ys : h ? Xf : Yf;
}
function cy(e, t, n, r, i) {
  e.dump = function() {
    if (t.length === 0)
      return e.quotingType === Ir ? '""' : "''";
    if (!e.noCompatMode && (QE.indexOf(t) !== -1 || ey.test(t)))
      return e.quotingType === Ir ? '"' + t + '"' : "'" + t + "'";
    const o = e.indent * Math.max(1, n), s = e.lineWidth === -1 ? -1 : Math.max(Math.min(e.lineWidth, 40), e.lineWidth - o), a = r || // No block styles in flow mode.
    e.flowLevel > -1 && n >= e.flowLevel;
    function l(m) {
      return oy(e, m);
    }
    switch (ly(
      t,
      a,
      e.indent,
      s,
      l,
      e.quotingType,
      e.forceQuotes && !r,
      i
    )) {
      case Wf:
        return t;
      case ys:
        return "'" + t.replace(/'/g, "''") + "'";
      case Yf:
        return "|" + Ol(t, e.indent) + bl(Cl(t, o));
      case Xf:
        return ">" + Ol(t, e.indent) + bl(Cl(uy(t, s), o));
      case xn:
        return '"' + fy(t) + '"';
      default:
        throw new Br("impossible error: invalid scalar style");
    }
  }();
}
function Ol(e, t) {
  const n = Vf(e) ? String(t) : "", r = e[e.length - 1] === `
`, o = r && (e[e.length - 2] === `
` || e === `
`) ? "+" : r ? "" : "-";
  return n + o + `
`;
}
function bl(e) {
  return e[e.length - 1] === `
` ? e.slice(0, -1) : e;
}
function uy(e, t) {
  const n = /(\n+)([^\n]*)/g;
  let r = function() {
    let a = e.indexOf(`
`);
    return a = a !== -1 ? a : e.length, n.lastIndex = a, Rl(e.slice(0, a), t);
  }(), i = e[0] === `
` || e[0] === " ", o, s;
  for (; s = n.exec(e); ) {
    const a = s[1], l = s[2];
    o = l[0] === " ", r += a + (!i && !o && l !== "" ? `
` : "") + Rl(l, t), i = o;
  }
  return r;
}
function Rl(e, t) {
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
function fy(e) {
  let t = "", n = 0;
  for (let r = 0; r < e.length; n >= 65536 ? r += 2 : r++) {
    n = hr(e, r);
    const i = Ge[n];
    !i && Cr(n) ? (t += e[r], n >= 65536 && (t += e[r + 1])) : t += i || ny(n);
  }
  return t;
}
function dy(e, t, n) {
  let r = "";
  const i = e.tag;
  for (let o = 0, s = n.length; o < s; o += 1) {
    let a = n[o];
    e.replacer && (a = e.replacer.call(n, String(o), a)), (Lt(e, t, a, !1, !1) || typeof a > "u" && Lt(e, t, null, !1, !1)) && (r !== "" && (r += "," + (e.condenseFlow ? "" : " ")), r += e.dump);
  }
  e.tag = i, e.dump = "[" + r + "]";
}
function $l(e, t, n, r) {
  let i = "";
  const o = e.tag;
  for (let s = 0, a = n.length; s < a; s += 1) {
    let l = n[s];
    e.replacer && (l = e.replacer.call(n, String(s), l)), (Lt(e, t + 1, l, !0, !0, !1, !0) || typeof l > "u" && Lt(e, t + 1, null, !0, !0, !1, !0)) && ((!r || i !== "") && (i += Es(e, t)), e.dump && Tr === e.dump.charCodeAt(0) ? i += "-" : i += "- ", i += e.dump);
  }
  e.tag = o, e.dump = i || "[]";
}
function hy(e, t, n) {
  let r = "";
  const i = e.tag, o = Object.keys(n);
  for (let s = 0, a = o.length; s < a; s += 1) {
    let l = "";
    r !== "" && (l += ", "), e.condenseFlow && (l += '"');
    const m = o[s];
    let c = n[m];
    e.replacer && (c = e.replacer.call(n, m, c)), Lt(e, t, m, !1, !1) && (e.dump.length > 1024 && (l += "? "), l += e.dump + (e.condenseFlow ? '"' : "") + ":" + (e.condenseFlow ? "" : " "), Lt(e, t, c, !1, !1) && (l += e.dump, r += l));
  }
  e.tag = i, e.dump = "{" + r + "}";
}
function py(e, t, n, r) {
  let i = "";
  const o = e.tag, s = Object.keys(n);
  if (e.sortKeys === !0)
    s.sort();
  else if (typeof e.sortKeys == "function")
    s.sort(e.sortKeys);
  else if (e.sortKeys)
    throw new Br("sortKeys must be a boolean or a function");
  for (let a = 0, l = s.length; a < l; a += 1) {
    let m = "";
    (!r || i !== "") && (m += Es(e, t));
    const c = s[a];
    let u = n[c];
    if (e.replacer && (u = e.replacer.call(n, c, u)), !Lt(e, t + 1, c, !0, !0, !0))
      continue;
    const h = e.tag !== null && e.tag !== "?" || e.dump && e.dump.length > 1024;
    h && (e.dump && Tr === e.dump.charCodeAt(0) ? m += "?" : m += "? "), m += e.dump, h && (m += Es(e, t)), Lt(e, t + 1, u, !0, h) && (e.dump && Tr === e.dump.charCodeAt(0) ? m += ":" : m += ": ", m += e.dump, i += m);
  }
  e.tag = o, e.dump = i || "{}";
}
function Ll(e, t, n) {
  const r = n ? e.explicitTypes : e.implicitTypes;
  for (let i = 0, o = r.length; i < o; i += 1) {
    const s = r[i];
    if ((s.instanceOf || s.predicate) && (!s.instanceOf || typeof t == "object" && t instanceof s.instanceOf) && (!s.predicate || s.predicate(t))) {
      if (n ? s.multi && s.representName ? e.tag = s.representName(t) : e.tag = s.tag : e.tag = "?", s.represent) {
        const a = e.styleMap[s.tag] || s.defaultStyle;
        let l;
        if (Mf.call(s.represent) === "[object Function]")
          l = s.represent(t, a);
        else if (Bf.call(s.represent, a))
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
function Lt(e, t, n, r, i, o, s) {
  e.tag = null, e.dump = n, Ll(e, n, !1) || Ll(e, n, !0);
  const a = Mf.call(e.dump), l = r;
  r && (r = e.flowLevel < 0 || e.flowLevel > t);
  const m = a === "[object Object]" || a === "[object Array]";
  let c, u;
  if (m && (c = e.duplicates.indexOf(n), u = c !== -1), (e.tag !== null && e.tag !== "?" || u || e.indent !== 2 && t > 0) && (i = !1), u && e.usedDuplicates[c])
    e.dump = "*ref_" + c;
  else {
    if (m && u && !e.usedDuplicates[c] && (e.usedDuplicates[c] = !0), a === "[object Object]")
      r && Object.keys(e.dump).length !== 0 ? (py(e, t, e.dump, i), u && (e.dump = "&ref_" + c + e.dump)) : (hy(e, t, e.dump), u && (e.dump = "&ref_" + c + " " + e.dump));
    else if (a === "[object Array]")
      r && e.dump.length !== 0 ? (e.noArrayIndent && !s && t > 0 ? $l(e, t - 1, e.dump, i) : $l(e, t, e.dump, i), u && (e.dump = "&ref_" + c + e.dump)) : (dy(e, t, e.dump), u && (e.dump = "&ref_" + c + " " + e.dump));
    else if (a === "[object String]")
      e.tag !== "?" && cy(e, e.dump, t, o, l);
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
function my(e, t) {
  const n = [], r = [];
  ws(e, n, r);
  const i = r.length;
  for (let o = 0; o < i; o += 1)
    t.duplicates.push(n[r[o]]);
  t.usedDuplicates = new Array(i);
}
function ws(e, t, n) {
  if (e !== null && typeof e == "object") {
    const r = t.indexOf(e);
    if (r !== -1)
      n.indexOf(r) === -1 && n.push(r);
    else if (t.push(e), Array.isArray(e))
      for (let i = 0, o = e.length; i < o; i += 1)
        ws(e[i], t, n);
    else {
      const i = Object.keys(e);
      for (let o = 0, s = i.length; o < s; o += 1)
        ws(e[i[o]], t, n);
    }
  }
}
function gy(e, t) {
  t = t || {};
  const n = new iy(t);
  n.noRefs || my(e, n);
  let r = e;
  return n.replacer && (r = n.replacer.call({ "": r }, "", r)), Lt(n, 0, r, !0, !0) ? n.dump + `
` : "";
}
kf.dump = gy;
const Jf = qs, Ey = kf;
function Js(e, t) {
  return function() {
    throw new Error("Function yaml." + e + " is removed in js-yaml 4. Use yaml." + t + " instead, which is now safe by default.");
  };
}
Fe.Type = Xe;
Fe.Schema = sf;
Fe.FAILSAFE_SCHEMA = uf;
Fe.JSON_SCHEMA = gf;
Fe.CORE_SCHEMA = Ef;
Fe.DEFAULT_SCHEMA = Vs;
Fe.load = Jf.load;
Fe.loadAll = Jf.loadAll;
Fe.dump = Ey.dump;
Fe.YAMLException = Mr;
Fe.types = {
  binary: Sf,
  float: mf,
  map: cf,
  null: ff,
  pairs: Tf,
  set: If,
  timestamp: _f,
  bool: df,
  int: hf,
  merge: vf,
  omap: Af,
  seq: lf,
  str: af
};
Fe.safeLoad = Js("safeLoad", "load");
Fe.safeLoadAll = Js("safeLoadAll", "loadAll");
Fe.safeDump = Js("safeDump", "dump");
var Xi = {};
Object.defineProperty(Xi, "__esModule", { value: !0 });
Xi.Lazy = void 0;
class yy {
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
Xi.Lazy = yy;
var _s = { exports: {} };
const wy = "2.0.0", Zf = 256, _y = Number.MAX_SAFE_INTEGER || /* istanbul ignore next */
9007199254740991, vy = 16, Sy = Zf - 6, Ay = [
  "major",
  "premajor",
  "minor",
  "preminor",
  "patch",
  "prepatch",
  "prerelease"
];
var Ji = {
  MAX_LENGTH: Zf,
  MAX_SAFE_COMPONENT_LENGTH: vy,
  MAX_SAFE_BUILD_LENGTH: Sy,
  MAX_SAFE_INTEGER: _y,
  RELEASE_TYPES: Ay,
  SEMVER_SPEC_VERSION: wy,
  FLAG_INCLUDE_PRERELEASE: 1,
  FLAG_LOOSE: 2
};
const Ty = typeof process == "object" && process.env && process.env.NODE_DEBUG && /\bsemver\b/i.test(process.env.NODE_DEBUG) ? (...e) => console.error("SEMVER", ...e) : () => {
};
var Zi = Ty;
(function(e, t) {
  const {
    MAX_SAFE_COMPONENT_LENGTH: n,
    MAX_SAFE_BUILD_LENGTH: r,
    MAX_LENGTH: i
  } = Ji, o = Zi;
  t = e.exports = {};
  const s = t.re = [], a = t.safeRe = [], l = t.src = [], m = t.safeSrc = [], c = t.t = {};
  let u = 0;
  const h = "[a-zA-Z0-9-]", w = [
    ["\\s", 1],
    ["\\d", i],
    [h, r]
  ], p = (y) => {
    for (const [_, E] of w)
      y = y.split(`${_}*`).join(`${_}{0,${E}}`).split(`${_}+`).join(`${_}{1,${E}}`);
    return y;
  }, f = (y, _, E) => {
    const S = p(_), T = u++;
    o(y, T, _), c[y] = T, l[T] = _, m[T] = S, s[T] = new RegExp(_, E ? "g" : void 0), a[T] = new RegExp(S, E ? "g" : void 0);
  };
  f("NUMERICIDENTIFIER", "0|[1-9]\\d*"), f("NUMERICIDENTIFIERLOOSE", "\\d+"), f("NONNUMERICIDENTIFIER", `\\d*[a-zA-Z-]${h}*`), f("MAINVERSION", `(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})\\.(${l[c.NUMERICIDENTIFIER]})`), f("MAINVERSIONLOOSE", `(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})\\.(${l[c.NUMERICIDENTIFIERLOOSE]})`), f("PRERELEASEIDENTIFIER", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIER]})`), f("PRERELEASEIDENTIFIERLOOSE", `(?:${l[c.NONNUMERICIDENTIFIER]}|${l[c.NUMERICIDENTIFIERLOOSE]})`), f("PRERELEASE", `(?:-(${l[c.PRERELEASEIDENTIFIER]}(?:\\.${l[c.PRERELEASEIDENTIFIER]})*))`), f("PRERELEASELOOSE", `(?:-?(${l[c.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${l[c.PRERELEASEIDENTIFIERLOOSE]})*))`), f("BUILDIDENTIFIER", `${h}+`), f("BUILD", `(?:\\+(${l[c.BUILDIDENTIFIER]}(?:\\.${l[c.BUILDIDENTIFIER]})*))`), f("FULLPLAIN", `v?${l[c.MAINVERSION]}${l[c.PRERELEASE]}?${l[c.BUILD]}?`), f("FULL", `^${l[c.FULLPLAIN]}$`), f("LOOSEPLAIN", `[v=\\s]*${l[c.MAINVERSIONLOOSE]}${l[c.PRERELEASELOOSE]}?${l[c.BUILD]}?`), f("LOOSE", `^${l[c.LOOSEPLAIN]}$`), f("GTLT", "((?:<|>)?=?)"), f("XRANGEIDENTIFIERLOOSE", `${l[c.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`), f("XRANGEIDENTIFIER", `${l[c.NUMERICIDENTIFIER]}|x|X|\\*`), f("XRANGEPLAIN", `[v=\\s]*(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:\\.(${l[c.XRANGEIDENTIFIER]})(?:${l[c.PRERELEASE]})?${l[c.BUILD]}?)?)?`), f("XRANGEPLAINLOOSE", `[v=\\s]*(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:\\.(${l[c.XRANGEIDENTIFIERLOOSE]})(?:${l[c.PRERELEASELOOSE]})?${l[c.BUILD]}?)?)?`), f("XRANGE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAIN]}$`), f("XRANGELOOSE", `^${l[c.GTLT]}\\s*${l[c.XRANGEPLAINLOOSE]}$`), f("COERCEPLAIN", `(^|[^\\d])(\\d{1,${n}})(?:\\.(\\d{1,${n}}))?(?:\\.(\\d{1,${n}}))?`), f("COERCE", `${l[c.COERCEPLAIN]}(?:$|[^\\d])`), f("COERCEFULL", l[c.COERCEPLAIN] + `(?:${l[c.PRERELEASE]})?(?:${l[c.BUILD]})?(?:$|[^\\d])`), f("COERCERTL", l[c.COERCE], !0), f("COERCERTLFULL", l[c.COERCEFULL], !0), f("LONETILDE", "(?:~>?)"), f("TILDETRIM", `(\\s*)${l[c.LONETILDE]}\\s+`, !0), t.tildeTrimReplace = "$1~", f("TILDE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAIN]}$`), f("TILDELOOSE", `^${l[c.LONETILDE]}${l[c.XRANGEPLAINLOOSE]}$`), f("LONECARET", "(?:\\^)"), f("CARETTRIM", `(\\s*)${l[c.LONECARET]}\\s+`, !0), t.caretTrimReplace = "$1^", f("CARET", `^${l[c.LONECARET]}${l[c.XRANGEPLAIN]}$`), f("CARETLOOSE", `^${l[c.LONECARET]}${l[c.XRANGEPLAINLOOSE]}$`), f("COMPARATORLOOSE", `^${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]})$|^$`), f("COMPARATOR", `^${l[c.GTLT]}\\s*(${l[c.FULLPLAIN]})$|^$`), f("COMPARATORTRIM", `(\\s*)${l[c.GTLT]}\\s*(${l[c.LOOSEPLAIN]}|${l[c.XRANGEPLAIN]})`, !0), t.comparatorTrimReplace = "$1$2$3", f("HYPHENRANGE", `^\\s*(${l[c.XRANGEPLAIN]})\\s+-\\s+(${l[c.XRANGEPLAIN]})\\s*$`), f("HYPHENRANGELOOSE", `^\\s*(${l[c.XRANGEPLAINLOOSE]})\\s+-\\s+(${l[c.XRANGEPLAINLOOSE]})\\s*$`), f("STAR", "(<|>)?=?\\s*\\*"), f("GTE0", "^\\s*>=\\s*0\\.0\\.0\\s*$"), f("GTE0PRE", "^\\s*>=\\s*0\\.0\\.0-0\\s*$");
})(_s, _s.exports);
var jr = _s.exports;
const Iy = Object.freeze({ loose: !0 }), Cy = Object.freeze({}), Dy = (e) => e ? typeof e != "object" ? Iy : e : Cy;
var Zs = Dy;
const xl = /^[0-9]+$/, Kf = (e, t) => {
  if (typeof e == "number" && typeof t == "number")
    return e === t ? 0 : e < t ? -1 : 1;
  const n = xl.test(e), r = xl.test(t);
  return n && r && (e = +e, t = +t), e === t ? 0 : n && !r ? -1 : r && !n ? 1 : e < t ? -1 : 1;
}, Ny = (e, t) => Kf(t, e);
var Qf = {
  compareIdentifiers: Kf,
  rcompareIdentifiers: Ny
};
const li = Zi, { MAX_LENGTH: Pl, MAX_SAFE_INTEGER: ci } = Ji, { safeRe: ui, t: fi } = jr, Oy = Zs, { compareIdentifiers: xo } = Qf;
let by = class vt {
  constructor(t, n) {
    if (n = Oy(n), t instanceof vt) {
      if (t.loose === !!n.loose && t.includePrerelease === !!n.includePrerelease)
        return t;
      t = t.version;
    } else if (typeof t != "string")
      throw new TypeError(`Invalid version. Must be a string. Got type "${typeof t}".`);
    if (t.length > Pl)
      throw new TypeError(
        `version is longer than ${Pl} characters`
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
    if (li("SemVer.compare", this.version, this.options, t), !(t instanceof vt)) {
      if (typeof t == "string" && t === this.version)
        return 0;
      t = new vt(t, this.options);
    }
    return t.version === this.version ? 0 : this.compareMain(t) || this.comparePre(t);
  }
  compareMain(t) {
    return t instanceof vt || (t = new vt(t, this.options)), this.major < t.major ? -1 : this.major > t.major ? 1 : this.minor < t.minor ? -1 : this.minor > t.minor ? 1 : this.patch < t.patch ? -1 : this.patch > t.patch ? 1 : 0;
  }
  comparePre(t) {
    if (t instanceof vt || (t = new vt(t, this.options)), this.prerelease.length && !t.prerelease.length)
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
      return xo(r, i);
    } while (++n);
  }
  compareBuild(t) {
    t instanceof vt || (t = new vt(t, this.options));
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
      return xo(r, i);
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
          r === !1 && (o = [n]), xo(this.prerelease[0], n) === 0 ? isNaN(this.prerelease[1]) && (this.prerelease = o) : this.prerelease = o;
        }
        break;
      }
      default:
        throw new Error(`invalid increment argument: ${t}`);
    }
    return this.raw = this.format(), this.build.length && (this.raw += `+${this.build.join(".")}`), this;
  }
};
var Je = by;
const Fl = Je, Ry = (e, t, n = !1) => {
  if (e instanceof Fl)
    return e;
  try {
    return new Fl(e, t);
  } catch (r) {
    if (!n)
      return null;
    throw r;
  }
};
var Kn = Ry;
const $y = Kn, Ly = (e, t) => {
  const n = $y(e, t);
  return n ? n.version : null;
};
var xy = Ly;
const Py = Kn, Fy = (e, t) => {
  const n = Py(e.trim().replace(/^[=v]+/, ""), t);
  return n ? n.version : null;
};
var Uy = Fy;
const Ul = Je, ky = (e, t, n, r, i) => {
  typeof n == "string" && (i = r, r = n, n = void 0);
  try {
    return new Ul(
      e instanceof Ul ? e.version : e,
      n
    ).inc(t, r, i).version;
  } catch {
    return null;
  }
};
var My = ky;
const kl = Kn, By = (e, t) => {
  const n = kl(e, null, !0), r = kl(t, null, !0), i = n.compare(r);
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
var jy = By;
const Hy = Je, Gy = (e, t) => new Hy(e, t).major;
var qy = Gy;
const zy = Je, Vy = (e, t) => new zy(e, t).minor;
var Wy = Vy;
const Yy = Je, Xy = (e, t) => new Yy(e, t).patch;
var Jy = Xy;
const Zy = Kn, Ky = (e, t) => {
  const n = Zy(e, t);
  return n && n.prerelease.length ? n.prerelease : null;
};
var Qy = Ky;
const Ml = Je, ew = (e, t, n) => new Ml(e, n).compare(new Ml(t, n));
var gt = ew;
const tw = gt, nw = (e, t, n) => tw(t, e, n);
var rw = nw;
const iw = gt, ow = (e, t) => iw(e, t, !0);
var sw = ow;
const Bl = Je, aw = (e, t, n) => {
  const r = new Bl(e, n), i = new Bl(t, n);
  return r.compare(i) || r.compareBuild(i);
};
var Ks = aw;
const lw = Ks, cw = (e, t) => e.sort((n, r) => lw(n, r, t));
var uw = cw;
const fw = Ks, dw = (e, t) => e.sort((n, r) => fw(r, n, t));
var hw = dw;
const pw = gt, mw = (e, t, n) => pw(e, t, n) > 0;
var Ki = mw;
const gw = gt, Ew = (e, t, n) => gw(e, t, n) < 0;
var Qs = Ew;
const yw = gt, ww = (e, t, n) => yw(e, t, n) === 0;
var ed = ww;
const _w = gt, vw = (e, t, n) => _w(e, t, n) !== 0;
var td = vw;
const Sw = gt, Aw = (e, t, n) => Sw(e, t, n) >= 0;
var ea = Aw;
const Tw = gt, Iw = (e, t, n) => Tw(e, t, n) <= 0;
var ta = Iw;
const Cw = ed, Dw = td, Nw = Ki, Ow = ea, bw = Qs, Rw = ta, $w = (e, t, n, r) => {
  switch (t) {
    case "===":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e === n;
    case "!==":
      return typeof e == "object" && (e = e.version), typeof n == "object" && (n = n.version), e !== n;
    case "":
    case "=":
    case "==":
      return Cw(e, n, r);
    case "!=":
      return Dw(e, n, r);
    case ">":
      return Nw(e, n, r);
    case ">=":
      return Ow(e, n, r);
    case "<":
      return bw(e, n, r);
    case "<=":
      return Rw(e, n, r);
    default:
      throw new TypeError(`Invalid operator: ${t}`);
  }
};
var nd = $w;
const Lw = Je, xw = Kn, { safeRe: di, t: hi } = jr, Pw = (e, t) => {
  if (e instanceof Lw)
    return e;
  if (typeof e == "number" && (e = String(e)), typeof e != "string")
    return null;
  t = t || {};
  let n = null;
  if (!t.rtl)
    n = e.match(t.includePrerelease ? di[hi.COERCEFULL] : di[hi.COERCE]);
  else {
    const l = t.includePrerelease ? di[hi.COERCERTLFULL] : di[hi.COERCERTL];
    let m;
    for (; (m = l.exec(e)) && (!n || n.index + n[0].length !== e.length); )
      (!n || m.index + m[0].length !== n.index + n[0].length) && (n = m), l.lastIndex = m.index + m[1].length + m[2].length;
    l.lastIndex = -1;
  }
  if (n === null)
    return null;
  const r = n[2], i = n[3] || "0", o = n[4] || "0", s = t.includePrerelease && n[5] ? `-${n[5]}` : "", a = t.includePrerelease && n[6] ? `+${n[6]}` : "";
  return xw(`${r}.${i}.${o}${s}${a}`, t);
};
var Fw = Pw;
class Uw {
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
var kw = Uw, Po, jl;
function Et() {
  if (jl) return Po;
  jl = 1;
  const e = /\s+/g;
  class t {
    constructor(b, k) {
      if (k = i(k), b instanceof t)
        return b.loose === !!k.loose && b.includePrerelease === !!k.includePrerelease ? b : new t(b.raw, k);
      if (b instanceof o)
        return this.raw = b.value, this.set = [[b]], this.formatted = void 0, this;
      if (this.options = k, this.loose = !!k.loose, this.includePrerelease = !!k.includePrerelease, this.raw = b.trim().replace(e, " "), this.set = this.raw.split("||").map(($) => this.parseRange($.trim())).filter(($) => $.length), !this.set.length)
        throw new TypeError(`Invalid SemVer Range: ${this.raw}`);
      if (this.set.length > 1) {
        const $ = this.set[0];
        if (this.set = this.set.filter((H) => !f(H[0])), this.set.length === 0)
          this.set = [$];
        else if (this.set.length > 1) {
          for (const H of this.set)
            if (H.length === 1 && y(H[0])) {
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
        for (let b = 0; b < this.set.length; b++) {
          b > 0 && (this.formatted += "||");
          const k = this.set[b];
          for (let $ = 0; $ < k.length; $++)
            $ > 0 && (this.formatted += " "), this.formatted += k[$].toString().trim();
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
      const $ = ((this.options.includePrerelease && w) | (this.options.loose && p)) + ":" + b, H = r.get($);
      if (H)
        return H;
      const N = this.options.loose, G = N ? l[m.HYPHENRANGELOOSE] : l[m.HYPHENRANGE];
      b = b.replace(G, K(this.options.includePrerelease)), s("hyphen replace", b), b = b.replace(l[m.COMPARATORTRIM], c), s("comparator trim", b), b = b.replace(l[m.TILDETRIM], u), s("tilde trim", b), b = b.replace(l[m.CARETTRIM], h), s("caret trim", b);
      let V = b.split(" ").map((z) => E(z, this.options)).join(" ").split(/\s+/).map((z) => W(z, this.options));
      N && (V = V.filter((z) => (s("loose invalid filter", z, this.options), !!z.match(l[m.COMPARATORLOOSE])))), s("range list", V);
      const U = /* @__PURE__ */ new Map(), Q = V.map((z) => new o(z, this.options));
      for (const z of Q) {
        if (f(z))
          return [z];
        U.set(z.value, z);
      }
      U.size > 1 && U.has("") && U.delete("");
      const re = [...U.values()];
      return r.set($, re), re;
    }
    intersects(b, k) {
      if (!(b instanceof t))
        throw new TypeError("a Range is required");
      return this.set.some(($) => _($, k) && b.set.some((H) => _(H, k) && $.every((N) => H.every((G) => N.intersects(G, k)))));
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
      for (let k = 0; k < this.set.length; k++)
        if (te(this.set[k], b, this.options))
          return !0;
      return !1;
    }
  }
  Po = t;
  const n = kw, r = new n(), i = Zs, o = Qi(), s = Zi, a = Je, {
    safeRe: l,
    t: m,
    comparatorTrimReplace: c,
    tildeTrimReplace: u,
    caretTrimReplace: h
  } = jr, { FLAG_INCLUDE_PRERELEASE: w, FLAG_LOOSE: p } = Ji, f = (F) => F.value === "<0.0.0-0", y = (F) => F.value === "", _ = (F, b) => {
    let k = !0;
    const $ = F.slice();
    let H = $.pop();
    for (; k && $.length; )
      k = $.every((N) => H.intersects(N, b)), H = $.pop();
    return k;
  }, E = (F, b) => (F = F.replace(l[m.BUILD], ""), s("comp", F, b), F = O(F, b), s("caret", F), F = T(F, b), s("tildes", F), F = B(F, b), s("xrange", F), F = A(F, b), s("stars", F), F), S = (F) => !F || F.toLowerCase() === "x" || F === "*", T = (F, b) => F.trim().split(/\s+/).map((k) => R(k, b)).join(" "), R = (F, b) => {
    const k = b.loose ? l[m.TILDELOOSE] : l[m.TILDE];
    return F.replace(k, ($, H, N, G, V) => {
      s("tilde", F, $, H, N, G, V);
      let U;
      return S(H) ? U = "" : S(N) ? U = `>=${H}.0.0 <${+H + 1}.0.0-0` : S(G) ? U = `>=${H}.${N}.0 <${H}.${+N + 1}.0-0` : V ? (s("replaceTilde pr", V), U = `>=${H}.${N}.${G}-${V} <${H}.${+N + 1}.0-0`) : U = `>=${H}.${N}.${G} <${H}.${+N + 1}.0-0`, s("tilde return", U), U;
    });
  }, O = (F, b) => F.trim().split(/\s+/).map((k) => j(k, b)).join(" "), j = (F, b) => {
    s("caret", F, b);
    const k = b.loose ? l[m.CARETLOOSE] : l[m.CARET], $ = b.includePrerelease ? "-0" : "";
    return F.replace(k, (H, N, G, V, U) => {
      s("caret", F, H, N, G, V, U);
      let Q;
      return S(N) ? Q = "" : S(G) ? Q = `>=${N}.0.0${$} <${+N + 1}.0.0-0` : S(V) ? N === "0" ? Q = `>=${N}.${G}.0${$} <${N}.${+G + 1}.0-0` : Q = `>=${N}.${G}.0${$} <${+N + 1}.0.0-0` : U ? (s("replaceCaret pr", U), N === "0" ? G === "0" ? Q = `>=${N}.${G}.${V}-${U} <${N}.${G}.${+V + 1}-0` : Q = `>=${N}.${G}.${V}-${U} <${N}.${+G + 1}.0-0` : Q = `>=${N}.${G}.${V}-${U} <${+N + 1}.0.0-0`) : (s("no pr"), N === "0" ? G === "0" ? Q = `>=${N}.${G}.${V}${$} <${N}.${G}.${+V + 1}-0` : Q = `>=${N}.${G}.${V}${$} <${N}.${+G + 1}.0-0` : Q = `>=${N}.${G}.${V} <${+N + 1}.0.0-0`), s("caret return", Q), Q;
    });
  }, B = (F, b) => (s("replaceXRanges", F, b), F.split(/\s+/).map((k) => x(k, b)).join(" ")), x = (F, b) => {
    F = F.trim();
    const k = b.loose ? l[m.XRANGELOOSE] : l[m.XRANGE];
    return F.replace(k, ($, H, N, G, V, U) => {
      s("xRange", F, $, H, N, G, V, U);
      const Q = S(N), re = Q || S(G), z = re || S(V), ie = z;
      return H === "=" && ie && (H = ""), U = b.includePrerelease ? "-0" : "", Q ? H === ">" || H === "<" ? $ = "<0.0.0-0" : $ = "*" : H && ie ? (re && (G = 0), V = 0, H === ">" ? (H = ">=", re ? (N = +N + 1, G = 0, V = 0) : (G = +G + 1, V = 0)) : H === "<=" && (H = "<", re ? N = +N + 1 : G = +G + 1), H === "<" && (U = "-0"), $ = `${H + N}.${G}.${V}${U}`) : re ? $ = `>=${N}.0.0${U} <${+N + 1}.0.0-0` : z && ($ = `>=${N}.${G}.0${U} <${N}.${+G + 1}.0-0`), s("xRange return", $), $;
    });
  }, A = (F, b) => (s("replaceStars", F, b), F.trim().replace(l[m.STAR], "")), W = (F, b) => (s("replaceGTE0", F, b), F.trim().replace(l[b.includePrerelease ? m.GTE0PRE : m.GTE0], "")), K = (F) => (b, k, $, H, N, G, V, U, Q, re, z, ie) => (S($) ? k = "" : S(H) ? k = `>=${$}.0.0${F ? "-0" : ""}` : S(N) ? k = `>=${$}.${H}.0${F ? "-0" : ""}` : G ? k = `>=${k}` : k = `>=${k}${F ? "-0" : ""}`, S(Q) ? U = "" : S(re) ? U = `<${+Q + 1}.0.0-0` : S(z) ? U = `<${Q}.${+re + 1}.0-0` : ie ? U = `<=${Q}.${re}.${z}-${ie}` : F ? U = `<${Q}.${re}.${+z + 1}-0` : U = `<=${U}`, `${k} ${U}`.trim()), te = (F, b, k) => {
    for (let $ = 0; $ < F.length; $++)
      if (!F[$].test(b))
        return !1;
    if (b.prerelease.length && !k.includePrerelease) {
      for (let $ = 0; $ < F.length; $++)
        if (s(F[$].semver), F[$].semver !== o.ANY && F[$].semver.prerelease.length > 0) {
          const H = F[$].semver;
          if (H.major === b.major && H.minor === b.minor && H.patch === b.patch)
            return !0;
        }
      return !1;
    }
    return !0;
  };
  return Po;
}
var Fo, Hl;
function Qi() {
  if (Hl) return Fo;
  Hl = 1;
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
      const u = this.options.loose ? r[i.COMPARATORLOOSE] : r[i.COMPARATOR], h = c.match(u);
      if (!h)
        throw new TypeError(`Invalid comparator: ${c}`);
      this.operator = h[1] !== void 0 ? h[1] : "", this.operator === "=" && (this.operator = ""), h[2] ? this.semver = new a(h[2], this.options.loose) : this.semver = e;
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
  Fo = t;
  const n = Zs, { safeRe: r, t: i } = jr, o = nd, s = Zi, a = Je, l = Et();
  return Fo;
}
const Mw = Et(), Bw = (e, t, n) => {
  try {
    t = new Mw(t, n);
  } catch {
    return !1;
  }
  return t.test(e);
};
var eo = Bw;
const jw = Et(), Hw = (e, t) => new jw(e, t).set.map((n) => n.map((r) => r.value).join(" ").trim().split(" "));
var Gw = Hw;
const qw = Je, zw = Et(), Vw = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new zw(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!r || i.compare(s) === -1) && (r = s, i = new qw(r, n));
  }), r;
};
var Ww = Vw;
const Yw = Je, Xw = Et(), Jw = (e, t, n) => {
  let r = null, i = null, o = null;
  try {
    o = new Xw(t, n);
  } catch {
    return null;
  }
  return e.forEach((s) => {
    o.test(s) && (!r || i.compare(s) === 1) && (r = s, i = new Yw(r, n));
  }), r;
};
var Zw = Jw;
const Uo = Je, Kw = Et(), Gl = Ki, Qw = (e, t) => {
  e = new Kw(e, t);
  let n = new Uo("0.0.0");
  if (e.test(n) || (n = new Uo("0.0.0-0"), e.test(n)))
    return n;
  n = null;
  for (let r = 0; r < e.set.length; ++r) {
    const i = e.set[r];
    let o = null;
    i.forEach((s) => {
      const a = new Uo(s.semver.version);
      switch (s.operator) {
        case ">":
          a.prerelease.length === 0 ? a.patch++ : a.prerelease.push(0), a.raw = a.format();
        case "":
        case ">=":
          (!o || Gl(a, o)) && (o = a);
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${s.operator}`);
      }
    }), o && (!n || Gl(n, o)) && (n = o);
  }
  return n && e.test(n) ? n : null;
};
var e_ = Qw;
const t_ = Et(), n_ = (e, t) => {
  try {
    return new t_(e, t).range || "*";
  } catch {
    return null;
  }
};
var r_ = n_;
const i_ = Je, rd = Qi(), { ANY: o_ } = rd, s_ = Et(), a_ = eo, ql = Ki, zl = Qs, l_ = ta, c_ = ea, u_ = (e, t, n, r) => {
  e = new i_(e, r), t = new s_(t, r);
  let i, o, s, a, l;
  switch (n) {
    case ">":
      i = ql, o = l_, s = zl, a = ">", l = ">=";
      break;
    case "<":
      i = zl, o = c_, s = ql, a = "<", l = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (a_(e, t, r))
    return !1;
  for (let m = 0; m < t.set.length; ++m) {
    const c = t.set[m];
    let u = null, h = null;
    if (c.forEach((w) => {
      w.semver === o_ && (w = new rd(">=0.0.0")), u = u || w, h = h || w, i(w.semver, u.semver, r) ? u = w : s(w.semver, h.semver, r) && (h = w);
    }), u.operator === a || u.operator === l || (!h.operator || h.operator === a) && o(e, h.semver))
      return !1;
    if (h.operator === l && s(e, h.semver))
      return !1;
  }
  return !0;
};
var na = u_;
const f_ = na, d_ = (e, t, n) => f_(e, t, ">", n);
var h_ = d_;
const p_ = na, m_ = (e, t, n) => p_(e, t, "<", n);
var g_ = m_;
const Vl = Et(), E_ = (e, t, n) => (e = new Vl(e, n), t = new Vl(t, n), e.intersects(t, n));
var y_ = E_;
const w_ = eo, __ = gt;
var v_ = (e, t, n) => {
  const r = [];
  let i = null, o = null;
  const s = e.sort((c, u) => __(c, u, n));
  for (const c of s)
    w_(c, t, n) ? (o = c, i || (i = c)) : (o && r.push([i, o]), o = null, i = null);
  i && r.push([i, null]);
  const a = [];
  for (const [c, u] of r)
    c === u ? a.push(c) : !u && c === s[0] ? a.push("*") : u ? c === s[0] ? a.push(`<=${u}`) : a.push(`${c} - ${u}`) : a.push(`>=${c}`);
  const l = a.join(" || "), m = typeof t.raw == "string" ? t.raw : String(t);
  return l.length < m.length ? l : t;
};
const Wl = Et(), ra = Qi(), { ANY: ko } = ra, lr = eo, ia = gt, S_ = (e, t, n = {}) => {
  if (e === t)
    return !0;
  e = new Wl(e, n), t = new Wl(t, n);
  let r = !1;
  e: for (const i of e.set) {
    for (const o of t.set) {
      const s = T_(i, o, n);
      if (r = r || s !== null, s)
        continue e;
    }
    if (r)
      return !1;
  }
  return !0;
}, A_ = [new ra(">=0.0.0-0")], Yl = [new ra(">=0.0.0")], T_ = (e, t, n) => {
  if (e === t)
    return !0;
  if (e.length === 1 && e[0].semver === ko) {
    if (t.length === 1 && t[0].semver === ko)
      return !0;
    n.includePrerelease ? e = A_ : e = Yl;
  }
  if (t.length === 1 && t[0].semver === ko) {
    if (n.includePrerelease)
      return !0;
    t = Yl;
  }
  const r = /* @__PURE__ */ new Set();
  let i, o;
  for (const w of e)
    w.operator === ">" || w.operator === ">=" ? i = Xl(i, w, n) : w.operator === "<" || w.operator === "<=" ? o = Jl(o, w, n) : r.add(w.semver);
  if (r.size > 1)
    return null;
  let s;
  if (i && o) {
    if (s = ia(i.semver, o.semver, n), s > 0)
      return null;
    if (s === 0 && (i.operator !== ">=" || o.operator !== "<="))
      return null;
  }
  for (const w of r) {
    if (i && !lr(w, String(i), n) || o && !lr(w, String(o), n))
      return null;
    for (const p of t)
      if (!lr(w, String(p), n))
        return !1;
    return !0;
  }
  let a, l, m, c, u = o && !n.includePrerelease && o.semver.prerelease.length ? o.semver : !1, h = i && !n.includePrerelease && i.semver.prerelease.length ? i.semver : !1;
  u && u.prerelease.length === 1 && o.operator === "<" && u.prerelease[0] === 0 && (u = !1);
  for (const w of t) {
    if (c = c || w.operator === ">" || w.operator === ">=", m = m || w.operator === "<" || w.operator === "<=", i) {
      if (h && w.semver.prerelease && w.semver.prerelease.length && w.semver.major === h.major && w.semver.minor === h.minor && w.semver.patch === h.patch && (h = !1), w.operator === ">" || w.operator === ">=") {
        if (a = Xl(i, w, n), a === w && a !== i)
          return !1;
      } else if (i.operator === ">=" && !lr(i.semver, String(w), n))
        return !1;
    }
    if (o) {
      if (u && w.semver.prerelease && w.semver.prerelease.length && w.semver.major === u.major && w.semver.minor === u.minor && w.semver.patch === u.patch && (u = !1), w.operator === "<" || w.operator === "<=") {
        if (l = Jl(o, w, n), l === w && l !== o)
          return !1;
      } else if (o.operator === "<=" && !lr(o.semver, String(w), n))
        return !1;
    }
    if (!w.operator && (o || i) && s !== 0)
      return !1;
  }
  return !(i && m && !o && s !== 0 || o && c && !i && s !== 0 || h || u);
}, Xl = (e, t, n) => {
  if (!e)
    return t;
  const r = ia(e.semver, t.semver, n);
  return r > 0 ? e : r < 0 || t.operator === ">" && e.operator === ">=" ? t : e;
}, Jl = (e, t, n) => {
  if (!e)
    return t;
  const r = ia(e.semver, t.semver, n);
  return r < 0 ? e : r > 0 || t.operator === "<" && e.operator === "<=" ? t : e;
};
var I_ = S_;
const Mo = jr, Zl = Ji, C_ = Je, Kl = Qf, D_ = Kn, N_ = xy, O_ = Uy, b_ = My, R_ = jy, $_ = qy, L_ = Wy, x_ = Jy, P_ = Qy, F_ = gt, U_ = rw, k_ = sw, M_ = Ks, B_ = uw, j_ = hw, H_ = Ki, G_ = Qs, q_ = ed, z_ = td, V_ = ea, W_ = ta, Y_ = nd, X_ = Fw, J_ = Qi(), Z_ = Et(), K_ = eo, Q_ = Gw, ev = Ww, tv = Zw, nv = e_, rv = r_, iv = na, ov = h_, sv = g_, av = y_, lv = v_, cv = I_;
var id = {
  parse: D_,
  valid: N_,
  clean: O_,
  inc: b_,
  diff: R_,
  major: $_,
  minor: L_,
  patch: x_,
  prerelease: P_,
  compare: F_,
  rcompare: U_,
  compareLoose: k_,
  compareBuild: M_,
  sort: B_,
  rsort: j_,
  gt: H_,
  lt: G_,
  eq: q_,
  neq: z_,
  gte: V_,
  lte: W_,
  cmp: Y_,
  coerce: X_,
  Comparator: J_,
  Range: Z_,
  satisfies: K_,
  toComparators: Q_,
  maxSatisfying: ev,
  minSatisfying: tv,
  minVersion: nv,
  validRange: rv,
  outside: iv,
  gtr: ov,
  ltr: sv,
  intersects: av,
  simplifyRange: lv,
  subset: cv,
  SemVer: C_,
  re: Mo.re,
  src: Mo.src,
  tokens: Mo.t,
  SEMVER_SPEC_VERSION: Zl.SEMVER_SPEC_VERSION,
  RELEASE_TYPES: Zl.RELEASE_TYPES,
  compareIdentifiers: Kl.compareIdentifiers,
  rcompareIdentifiers: Kl.rcompareIdentifiers
}, Hr = {}, Pi = { exports: {} };
Pi.exports;
(function(e, t) {
  var n = 200, r = "__lodash_hash_undefined__", i = 1, o = 2, s = 9007199254740991, a = "[object Arguments]", l = "[object Array]", m = "[object AsyncFunction]", c = "[object Boolean]", u = "[object Date]", h = "[object Error]", w = "[object Function]", p = "[object GeneratorFunction]", f = "[object Map]", y = "[object Number]", _ = "[object Null]", E = "[object Object]", S = "[object Promise]", T = "[object Proxy]", R = "[object RegExp]", O = "[object Set]", j = "[object String]", B = "[object Symbol]", x = "[object Undefined]", A = "[object WeakMap]", W = "[object ArrayBuffer]", K = "[object DataView]", te = "[object Float32Array]", F = "[object Float64Array]", b = "[object Int8Array]", k = "[object Int16Array]", $ = "[object Int32Array]", H = "[object Uint8Array]", N = "[object Uint8ClampedArray]", G = "[object Uint16Array]", V = "[object Uint32Array]", U = /[\\^$.*+?()[\]{}|]/g, Q = /^\[object .+?Constructor\]$/, re = /^(?:0|[1-9]\d*)$/, z = {};
  z[te] = z[F] = z[b] = z[k] = z[$] = z[H] = z[N] = z[G] = z[V] = !0, z[a] = z[l] = z[W] = z[c] = z[K] = z[u] = z[h] = z[w] = z[f] = z[y] = z[E] = z[R] = z[O] = z[j] = z[A] = !1;
  var ie = typeof ze == "object" && ze && ze.Object === Object && ze, Se = typeof self == "object" && self && self.Object === Object && self, le = ie || Se || Function("return this")(), lt = t && !t.nodeType && t, Ct = lt && !0 && e && !e.nodeType && e, Qe = Ct && Ct.exports === lt, tn = Qe && ie.process, g = function() {
    try {
      return tn && tn.binding && tn.binding("util");
    } catch {
    }
  }(), d = g && g.isTypedArray;
  function D(v, C) {
    for (var L = -1, Y = v == null ? 0 : v.length, de = 0, ee = []; ++L < Y; ) {
      var ye = v[L];
      C(ye, L, v) && (ee[de++] = ye);
    }
    return ee;
  }
  function I(v, C) {
    for (var L = -1, Y = C.length, de = v.length; ++L < Y; )
      v[de + L] = C[L];
    return v;
  }
  function se(v, C) {
    for (var L = -1, Y = v == null ? 0 : v.length; ++L < Y; )
      if (C(v[L], L, v))
        return !0;
    return !1;
  }
  function pe(v, C) {
    for (var L = -1, Y = Array(v); ++L < v; )
      Y[L] = C(L);
    return Y;
  }
  function Ae(v) {
    return function(C) {
      return v(C);
    };
  }
  function Ue(v, C) {
    return v.has(C);
  }
  function ke(v, C) {
    return v == null ? void 0 : v[C];
  }
  function ct(v) {
    var C = -1, L = Array(v.size);
    return v.forEach(function(Y, de) {
      L[++C] = [de, Y];
    }), L;
  }
  function De(v, C) {
    return function(L) {
      return v(C(L));
    };
  }
  function ut(v) {
    var C = -1, L = Array(v.size);
    return v.forEach(function(Y) {
      L[++C] = Y;
    }), L;
  }
  var mo = Array.prototype, Yr = Function.prototype, Pt = Object.prototype, Cn = le["__core-js_shared__"], Ea = Yr.toString, wt = Pt.hasOwnProperty, ya = function() {
    var v = /[^.]+$/.exec(Cn && Cn.keys && Cn.keys.IE_PROTO || "");
    return v ? "Symbol(src)_1." + v : "";
  }(), wa = Pt.toString, Od = RegExp(
    "^" + Ea.call(wt).replace(U, "\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, "$1.*?") + "$"
  ), _a = Qe ? le.Buffer : void 0, Xr = le.Symbol, va = le.Uint8Array, Sa = Pt.propertyIsEnumerable, bd = mo.splice, nn = Xr ? Xr.toStringTag : void 0, Aa = Object.getOwnPropertySymbols, Rd = _a ? _a.isBuffer : void 0, $d = De(Object.keys, Object), go = Dn(le, "DataView"), nr = Dn(le, "Map"), Eo = Dn(le, "Promise"), yo = Dn(le, "Set"), wo = Dn(le, "WeakMap"), rr = Dn(Object, "create"), Ld = sn(go), xd = sn(nr), Pd = sn(Eo), Fd = sn(yo), Ud = sn(wo), Ta = Xr ? Xr.prototype : void 0, _o = Ta ? Ta.valueOf : void 0;
  function rn(v) {
    var C = -1, L = v == null ? 0 : v.length;
    for (this.clear(); ++C < L; ) {
      var Y = v[C];
      this.set(Y[0], Y[1]);
    }
  }
  function kd() {
    this.__data__ = rr ? rr(null) : {}, this.size = 0;
  }
  function Md(v) {
    var C = this.has(v) && delete this.__data__[v];
    return this.size -= C ? 1 : 0, C;
  }
  function Bd(v) {
    var C = this.__data__;
    if (rr) {
      var L = C[v];
      return L === r ? void 0 : L;
    }
    return wt.call(C, v) ? C[v] : void 0;
  }
  function jd(v) {
    var C = this.__data__;
    return rr ? C[v] !== void 0 : wt.call(C, v);
  }
  function Hd(v, C) {
    var L = this.__data__;
    return this.size += this.has(v) ? 0 : 1, L[v] = rr && C === void 0 ? r : C, this;
  }
  rn.prototype.clear = kd, rn.prototype.delete = Md, rn.prototype.get = Bd, rn.prototype.has = jd, rn.prototype.set = Hd;
  function Dt(v) {
    var C = -1, L = v == null ? 0 : v.length;
    for (this.clear(); ++C < L; ) {
      var Y = v[C];
      this.set(Y[0], Y[1]);
    }
  }
  function Gd() {
    this.__data__ = [], this.size = 0;
  }
  function qd(v) {
    var C = this.__data__, L = Zr(C, v);
    if (L < 0)
      return !1;
    var Y = C.length - 1;
    return L == Y ? C.pop() : bd.call(C, L, 1), --this.size, !0;
  }
  function zd(v) {
    var C = this.__data__, L = Zr(C, v);
    return L < 0 ? void 0 : C[L][1];
  }
  function Vd(v) {
    return Zr(this.__data__, v) > -1;
  }
  function Wd(v, C) {
    var L = this.__data__, Y = Zr(L, v);
    return Y < 0 ? (++this.size, L.push([v, C])) : L[Y][1] = C, this;
  }
  Dt.prototype.clear = Gd, Dt.prototype.delete = qd, Dt.prototype.get = zd, Dt.prototype.has = Vd, Dt.prototype.set = Wd;
  function on(v) {
    var C = -1, L = v == null ? 0 : v.length;
    for (this.clear(); ++C < L; ) {
      var Y = v[C];
      this.set(Y[0], Y[1]);
    }
  }
  function Yd() {
    this.size = 0, this.__data__ = {
      hash: new rn(),
      map: new (nr || Dt)(),
      string: new rn()
    };
  }
  function Xd(v) {
    var C = Kr(this, v).delete(v);
    return this.size -= C ? 1 : 0, C;
  }
  function Jd(v) {
    return Kr(this, v).get(v);
  }
  function Zd(v) {
    return Kr(this, v).has(v);
  }
  function Kd(v, C) {
    var L = Kr(this, v), Y = L.size;
    return L.set(v, C), this.size += L.size == Y ? 0 : 1, this;
  }
  on.prototype.clear = Yd, on.prototype.delete = Xd, on.prototype.get = Jd, on.prototype.has = Zd, on.prototype.set = Kd;
  function Jr(v) {
    var C = -1, L = v == null ? 0 : v.length;
    for (this.__data__ = new on(); ++C < L; )
      this.add(v[C]);
  }
  function Qd(v) {
    return this.__data__.set(v, r), this;
  }
  function eh(v) {
    return this.__data__.has(v);
  }
  Jr.prototype.add = Jr.prototype.push = Qd, Jr.prototype.has = eh;
  function Ft(v) {
    var C = this.__data__ = new Dt(v);
    this.size = C.size;
  }
  function th() {
    this.__data__ = new Dt(), this.size = 0;
  }
  function nh(v) {
    var C = this.__data__, L = C.delete(v);
    return this.size = C.size, L;
  }
  function rh(v) {
    return this.__data__.get(v);
  }
  function ih(v) {
    return this.__data__.has(v);
  }
  function oh(v, C) {
    var L = this.__data__;
    if (L instanceof Dt) {
      var Y = L.__data__;
      if (!nr || Y.length < n - 1)
        return Y.push([v, C]), this.size = ++L.size, this;
      L = this.__data__ = new on(Y);
    }
    return L.set(v, C), this.size = L.size, this;
  }
  Ft.prototype.clear = th, Ft.prototype.delete = nh, Ft.prototype.get = rh, Ft.prototype.has = ih, Ft.prototype.set = oh;
  function sh(v, C) {
    var L = Qr(v), Y = !L && vh(v), de = !L && !Y && vo(v), ee = !L && !Y && !de && La(v), ye = L || Y || de || ee, be = ye ? pe(v.length, String) : [], Le = be.length;
    for (var me in v)
      wt.call(v, me) && !(ye && // Safari 9 has enumerable `arguments.length` in strict mode.
      (me == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
      de && (me == "offset" || me == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
      ee && (me == "buffer" || me == "byteLength" || me == "byteOffset") || // Skip index properties.
      gh(me, Le))) && be.push(me);
    return be;
  }
  function Zr(v, C) {
    for (var L = v.length; L--; )
      if (Oa(v[L][0], C))
        return L;
    return -1;
  }
  function ah(v, C, L) {
    var Y = C(v);
    return Qr(v) ? Y : I(Y, L(v));
  }
  function ir(v) {
    return v == null ? v === void 0 ? x : _ : nn && nn in Object(v) ? ph(v) : _h(v);
  }
  function Ia(v) {
    return or(v) && ir(v) == a;
  }
  function Ca(v, C, L, Y, de) {
    return v === C ? !0 : v == null || C == null || !or(v) && !or(C) ? v !== v && C !== C : lh(v, C, L, Y, Ca, de);
  }
  function lh(v, C, L, Y, de, ee) {
    var ye = Qr(v), be = Qr(C), Le = ye ? l : Ut(v), me = be ? l : Ut(C);
    Le = Le == a ? E : Le, me = me == a ? E : me;
    var et = Le == E, ft = me == E, Me = Le == me;
    if (Me && vo(v)) {
      if (!vo(C))
        return !1;
      ye = !0, et = !1;
    }
    if (Me && !et)
      return ee || (ee = new Ft()), ye || La(v) ? Da(v, C, L, Y, de, ee) : dh(v, C, Le, L, Y, de, ee);
    if (!(L & i)) {
      var it = et && wt.call(v, "__wrapped__"), ot = ft && wt.call(C, "__wrapped__");
      if (it || ot) {
        var kt = it ? v.value() : v, Nt = ot ? C.value() : C;
        return ee || (ee = new Ft()), de(kt, Nt, L, Y, ee);
      }
    }
    return Me ? (ee || (ee = new Ft()), hh(v, C, L, Y, de, ee)) : !1;
  }
  function ch(v) {
    if (!$a(v) || yh(v))
      return !1;
    var C = ba(v) ? Od : Q;
    return C.test(sn(v));
  }
  function uh(v) {
    return or(v) && Ra(v.length) && !!z[ir(v)];
  }
  function fh(v) {
    if (!wh(v))
      return $d(v);
    var C = [];
    for (var L in Object(v))
      wt.call(v, L) && L != "constructor" && C.push(L);
    return C;
  }
  function Da(v, C, L, Y, de, ee) {
    var ye = L & i, be = v.length, Le = C.length;
    if (be != Le && !(ye && Le > be))
      return !1;
    var me = ee.get(v);
    if (me && ee.get(C))
      return me == C;
    var et = -1, ft = !0, Me = L & o ? new Jr() : void 0;
    for (ee.set(v, C), ee.set(C, v); ++et < be; ) {
      var it = v[et], ot = C[et];
      if (Y)
        var kt = ye ? Y(ot, it, et, C, v, ee) : Y(it, ot, et, v, C, ee);
      if (kt !== void 0) {
        if (kt)
          continue;
        ft = !1;
        break;
      }
      if (Me) {
        if (!se(C, function(Nt, an) {
          if (!Ue(Me, an) && (it === Nt || de(it, Nt, L, Y, ee)))
            return Me.push(an);
        })) {
          ft = !1;
          break;
        }
      } else if (!(it === ot || de(it, ot, L, Y, ee))) {
        ft = !1;
        break;
      }
    }
    return ee.delete(v), ee.delete(C), ft;
  }
  function dh(v, C, L, Y, de, ee, ye) {
    switch (L) {
      case K:
        if (v.byteLength != C.byteLength || v.byteOffset != C.byteOffset)
          return !1;
        v = v.buffer, C = C.buffer;
      case W:
        return !(v.byteLength != C.byteLength || !ee(new va(v), new va(C)));
      case c:
      case u:
      case y:
        return Oa(+v, +C);
      case h:
        return v.name == C.name && v.message == C.message;
      case R:
      case j:
        return v == C + "";
      case f:
        var be = ct;
      case O:
        var Le = Y & i;
        if (be || (be = ut), v.size != C.size && !Le)
          return !1;
        var me = ye.get(v);
        if (me)
          return me == C;
        Y |= o, ye.set(v, C);
        var et = Da(be(v), be(C), Y, de, ee, ye);
        return ye.delete(v), et;
      case B:
        if (_o)
          return _o.call(v) == _o.call(C);
    }
    return !1;
  }
  function hh(v, C, L, Y, de, ee) {
    var ye = L & i, be = Na(v), Le = be.length, me = Na(C), et = me.length;
    if (Le != et && !ye)
      return !1;
    for (var ft = Le; ft--; ) {
      var Me = be[ft];
      if (!(ye ? Me in C : wt.call(C, Me)))
        return !1;
    }
    var it = ee.get(v);
    if (it && ee.get(C))
      return it == C;
    var ot = !0;
    ee.set(v, C), ee.set(C, v);
    for (var kt = ye; ++ft < Le; ) {
      Me = be[ft];
      var Nt = v[Me], an = C[Me];
      if (Y)
        var xa = ye ? Y(an, Nt, Me, C, v, ee) : Y(Nt, an, Me, v, C, ee);
      if (!(xa === void 0 ? Nt === an || de(Nt, an, L, Y, ee) : xa)) {
        ot = !1;
        break;
      }
      kt || (kt = Me == "constructor");
    }
    if (ot && !kt) {
      var ei = v.constructor, ti = C.constructor;
      ei != ti && "constructor" in v && "constructor" in C && !(typeof ei == "function" && ei instanceof ei && typeof ti == "function" && ti instanceof ti) && (ot = !1);
    }
    return ee.delete(v), ee.delete(C), ot;
  }
  function Na(v) {
    return ah(v, Th, mh);
  }
  function Kr(v, C) {
    var L = v.__data__;
    return Eh(C) ? L[typeof C == "string" ? "string" : "hash"] : L.map;
  }
  function Dn(v, C) {
    var L = ke(v, C);
    return ch(L) ? L : void 0;
  }
  function ph(v) {
    var C = wt.call(v, nn), L = v[nn];
    try {
      v[nn] = void 0;
      var Y = !0;
    } catch {
    }
    var de = wa.call(v);
    return Y && (C ? v[nn] = L : delete v[nn]), de;
  }
  var mh = Aa ? function(v) {
    return v == null ? [] : (v = Object(v), D(Aa(v), function(C) {
      return Sa.call(v, C);
    }));
  } : Ih, Ut = ir;
  (go && Ut(new go(new ArrayBuffer(1))) != K || nr && Ut(new nr()) != f || Eo && Ut(Eo.resolve()) != S || yo && Ut(new yo()) != O || wo && Ut(new wo()) != A) && (Ut = function(v) {
    var C = ir(v), L = C == E ? v.constructor : void 0, Y = L ? sn(L) : "";
    if (Y)
      switch (Y) {
        case Ld:
          return K;
        case xd:
          return f;
        case Pd:
          return S;
        case Fd:
          return O;
        case Ud:
          return A;
      }
    return C;
  });
  function gh(v, C) {
    return C = C ?? s, !!C && (typeof v == "number" || re.test(v)) && v > -1 && v % 1 == 0 && v < C;
  }
  function Eh(v) {
    var C = typeof v;
    return C == "string" || C == "number" || C == "symbol" || C == "boolean" ? v !== "__proto__" : v === null;
  }
  function yh(v) {
    return !!ya && ya in v;
  }
  function wh(v) {
    var C = v && v.constructor, L = typeof C == "function" && C.prototype || Pt;
    return v === L;
  }
  function _h(v) {
    return wa.call(v);
  }
  function sn(v) {
    if (v != null) {
      try {
        return Ea.call(v);
      } catch {
      }
      try {
        return v + "";
      } catch {
      }
    }
    return "";
  }
  function Oa(v, C) {
    return v === C || v !== v && C !== C;
  }
  var vh = Ia(/* @__PURE__ */ function() {
    return arguments;
  }()) ? Ia : function(v) {
    return or(v) && wt.call(v, "callee") && !Sa.call(v, "callee");
  }, Qr = Array.isArray;
  function Sh(v) {
    return v != null && Ra(v.length) && !ba(v);
  }
  var vo = Rd || Ch;
  function Ah(v, C) {
    return Ca(v, C);
  }
  function ba(v) {
    if (!$a(v))
      return !1;
    var C = ir(v);
    return C == w || C == p || C == m || C == T;
  }
  function Ra(v) {
    return typeof v == "number" && v > -1 && v % 1 == 0 && v <= s;
  }
  function $a(v) {
    var C = typeof v;
    return v != null && (C == "object" || C == "function");
  }
  function or(v) {
    return v != null && typeof v == "object";
  }
  var La = d ? Ae(d) : uh;
  function Th(v) {
    return Sh(v) ? sh(v) : fh(v);
  }
  function Ih() {
    return [];
  }
  function Ch() {
    return !1;
  }
  e.exports = Ah;
})(Pi, Pi.exports);
var uv = Pi.exports;
Object.defineProperty(Hr, "__esModule", { value: !0 });
Hr.DownloadedUpdateHelper = void 0;
Hr.createTempUpdateFile = mv;
const fv = Xn, dv = xt, Ql = uv, cn = Qt, Bn = fe;
class hv {
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
      return Ql(this.versionInfo, n) && Ql(this.fileInfo.info, r.info) && await (0, cn.pathExists)(t) ? t : null;
    const o = await this.getValidCachedUpdateFile(r, i);
    return o === null ? null : (i.info(`Update has already been downloaded to ${t}).`), this._file = o, o);
  }
  async setDownloadedFile(t, n, r, i, o, s) {
    this._file = t, this._packageFile = n, this.versionInfo = r, this.fileInfo = i, this._downloadedFileInfo = {
      fileName: o,
      sha512: i.info.sha512,
      isAdminRightsRequired: i.info.isAdminRightsRequired === !0
    }, s && await (0, cn.outputJson)(this.getUpdateInfoFile(), this._downloadedFileInfo);
  }
  async clear() {
    this._file = null, this._packageFile = null, this.versionInfo = null, this.fileInfo = null, await this.cleanCacheDirForPendingUpdate();
  }
  async cleanCacheDirForPendingUpdate() {
    try {
      await (0, cn.emptyDir)(this.cacheDirForPendingUpdate);
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
    if (!await (0, cn.pathExists)(r))
      return null;
    let o;
    try {
      o = await (0, cn.readJson)(r);
    } catch (c) {
      let u = "No cached update info available";
      return c.code !== "ENOENT" && (await this.cleanCacheDirForPendingUpdate(), u += ` (error on read: ${c.message})`), n.info(u), null;
    }
    const s = o == null ? void 0 : o.fileName;
    if (!(typeof s == "string" && s.length > 0 && Bn.basename(s) === s))
      return n.warn("Cached update info is corrupted: invalid fileName, directory for cached update will be cleaned"), await this.cleanCacheDirForPendingUpdate(), null;
    if (t.info.sha512 !== o.sha512)
      return n.info(`Cached update sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${o.sha512}, expected: ${t.info.sha512}. Directory for cached update will be cleaned`), await this.cleanCacheDirForPendingUpdate(), null;
    const l = Bn.join(this.cacheDirForPendingUpdate, s);
    if (!await (0, cn.pathExists)(l))
      return n.info("Cached update file doesn't exist"), null;
    const m = await pv(l);
    return t.info.sha512 !== m ? (n.warn(`Sha512 checksum doesn't match the latest available update. New update must be downloaded. Cached: ${m}, expected: ${t.info.sha512}`), await this.cleanCacheDirForPendingUpdate(), null) : (this._downloadedFileInfo = o, l);
  }
  getUpdateInfoFile() {
    return Bn.join(this.cacheDirForPendingUpdate, "update-info.json");
  }
}
Hr.DownloadedUpdateHelper = hv;
function pv(e, t = "sha512", n = "base64", r) {
  return new Promise((i, o) => {
    const s = (0, fv.createHash)(t);
    s.on("error", o).setEncoding(n), (0, dv.createReadStream)(e, {
      ...r,
      highWaterMark: 1024 * 1024
      /* better to use more memory but hash faster */
    }).on("error", o).on("end", () => {
      s.end(), i(s.read());
    }).pipe(s, { end: !1 });
  });
}
async function mv(e, t, n) {
  let r = 0, i = Bn.join(t, e);
  for (let o = 0; o < 3; o++)
    try {
      return await (0, cn.unlink)(i), i;
    } catch (s) {
      if (s.code === "ENOENT")
        return i;
      n.warn(`Error on remove temp update file: ${s}`), i = Bn.join(t, `${r++}-${e}`);
    }
  return i;
}
var to = {}, oa = {};
Object.defineProperty(oa, "__esModule", { value: !0 });
oa.getAppCacheDir = Ev;
const Bo = fe, gv = Mi;
function Ev() {
  const e = (0, gv.homedir)();
  let t;
  return process.platform === "win32" ? t = process.env.LOCALAPPDATA || Bo.join(e, "AppData", "Local") : process.platform === "darwin" ? t = Bo.join(e, "Library", "Caches") : t = process.env.XDG_CACHE_HOME || Bo.join(e, ".cache"), t;
}
Object.defineProperty(to, "__esModule", { value: !0 });
to.ElectronAppAdapter = void 0;
const ec = fe, yv = oa;
class wv {
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
    return this.isPackaged ? ec.join(process.resourcesPath, "app-update.yml") : ec.join(this.app.getAppPath(), "dev-app-update.yml");
  }
  get userDataPath() {
    return this.app.getPath("userData");
  }
  get baseCachePath() {
    return (0, yv.getAppCacheDir)();
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
to.ElectronAppAdapter = wv;
var od = {};
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
      return await a.cancellationToken.createPromise((l, m, c) => {
        const u = {
          headers: a.headers || void 0,
          redirect: "manual"
        };
        (0, t.configureRequestUrl)(o, u), (0, t.configureRequestOptions)(u), this.doDownload(u, {
          destination: s,
          options: a,
          onCancel: c,
          callback: (h) => {
            h == null ? l(s) : m(h);
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
    addRedirectHandlers(o, s, a, l, m) {
      o.on("redirect", (c, u, h) => {
        o.abort(), l > this.maxRedirects ? a(this.createMaxRedirectError()) : m(t.HttpExecutor.prepareRedirectUrlOptions(h, s));
      });
    }
  }
  e.ElectronHttpExecutor = r;
})(od);
var Gr = {}, yt = {};
Object.defineProperty(yt, "__esModule", { value: !0 });
yt.newBaseUrl = _v;
yt.newUrlFromBase = vv;
yt.getChannelFilename = Sv;
const sd = Kt;
function _v(e) {
  const t = new sd.URL(e);
  return t.pathname.endsWith("/") || (t.pathname += "/"), t;
}
function vv(e, t, n = !1) {
  const r = new sd.URL(e, t), i = t.search;
  return i != null && i.length !== 0 ? r.search = i : n && (r.search = `noCache=${Date.now().toString(32)}`), r;
}
function Sv(e) {
  return `${e}.yml`;
}
var Ce = {}, Av = "[object Symbol]", ad = /[\\^$.*+?()[\]{}|]/g, Tv = RegExp(ad.source), Iv = typeof ze == "object" && ze && ze.Object === Object && ze, Cv = typeof self == "object" && self && self.Object === Object && self, Dv = Iv || Cv || Function("return this")(), Nv = Object.prototype, Ov = Nv.toString, tc = Dv.Symbol, nc = tc ? tc.prototype : void 0, rc = nc ? nc.toString : void 0;
function bv(e) {
  if (typeof e == "string")
    return e;
  if ($v(e))
    return rc ? rc.call(e) : "";
  var t = e + "";
  return t == "0" && 1 / e == -1 / 0 ? "-0" : t;
}
function Rv(e) {
  return !!e && typeof e == "object";
}
function $v(e) {
  return typeof e == "symbol" || Rv(e) && Ov.call(e) == Av;
}
function Lv(e) {
  return e == null ? "" : bv(e);
}
function xv(e) {
  return e = Lv(e), e && Tv.test(e) ? e.replace(ad, "\\$&") : e;
}
var ld = xv;
Object.defineProperty(Ce, "__esModule", { value: !0 });
Ce.Provider = void 0;
Ce.findFile = Mv;
Ce.parseUpdateInfo = Bv;
Ce.getFileList = cd;
Ce.resolveFiles = jv;
const Jt = Oe, Pv = Fe, Fv = Kt, Fi = yt, Uv = ld;
class kv {
  constructor(t) {
    this.runtimeOptions = t, this.requestHeaders = null, this.executor = t.executor;
  }
  // By default, the blockmap file is in the same directory as the main file
  // But some providers may have a different blockmap file, so we need to override this method
  getBlockMapFiles(t, n, r, i = null) {
    const o = (0, Fi.newUrlFromBase)(`${t.pathname}.blockmap`, t);
    return [(0, Fi.newUrlFromBase)(`${t.pathname.replace(new RegExp(Uv(r), "g"), n)}.blockmap`, i ? new Fv.URL(i) : t), o];
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
    return this.requestHeaders == null ? n != null && (r.headers = n) : r.headers = n == null ? this.requestHeaders : { ...this.requestHeaders, ...n }, (0, Jt.configureRequestUrl)(t, r), r;
  }
}
Ce.Provider = kv;
function Mv(e, t, n) {
  var r;
  if (e.length === 0)
    throw (0, Jt.newError)("No files provided", "ERR_UPDATER_NO_FILES_PROVIDED");
  const i = e.filter((s) => s.url.pathname.toLowerCase().endsWith(`.${t.toLowerCase()}`)), o = (r = i.find((s) => [s.url.pathname, s.info.url].some((a) => a.includes(process.arch)))) !== null && r !== void 0 ? r : i.shift();
  return o || (n == null ? e[0] : e.find((s) => !n.some((a) => s.url.pathname.toLowerCase().endsWith(`.${a.toLowerCase()}`))));
}
function Bv(e, t, n) {
  if (e == null)
    throw (0, Jt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): rawData: null`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  let r;
  try {
    r = (0, Pv.load)(e);
  } catch (i) {
    throw (0, Jt.newError)(`Cannot parse update info from ${t} in the latest release artifacts (${n}): ${i.stack || i.message}, rawData: ${e}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
  }
  return r;
}
function cd(e) {
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
  throw (0, Jt.newError)(`No files provided: ${(0, Jt.safeStringifyJson)(e)}`, "ERR_UPDATER_NO_FILES_PROVIDED");
}
function jv(e, t, n = (r) => r) {
  const i = cd(e).map((a) => {
    if (a.sha2 == null && a.sha512 == null)
      throw (0, Jt.newError)(`Update info doesn't contain nor sha256 neither sha512 checksum: ${(0, Jt.safeStringifyJson)(a)}`, "ERR_UPDATER_NO_CHECKSUM");
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
const ic = Oe, jo = yt, Ho = Ce;
class Hv extends Ho.Provider {
  constructor(t, n, r) {
    super(r), this.configuration = t, this.updater = n, this.baseUrl = (0, jo.newBaseUrl)(this.configuration.url);
  }
  get channel() {
    const t = this.updater.channel || this.configuration.channel;
    return t == null ? this.getDefaultChannelName() : this.getCustomChannelName(t);
  }
  async getLatestVersion() {
    const t = (0, jo.getChannelFilename)(this.channel), n = (0, jo.newUrlFromBase)(t, this.baseUrl, this.updater.isAddNoCacheQuery);
    for (let r = 0; ; r++)
      try {
        return (0, Ho.parseUpdateInfo)(await this.httpRequest(n), t, n);
      } catch (i) {
        if (i instanceof ic.HttpError && i.statusCode === 404)
          throw (0, ic.newError)(`Cannot find channel "${t}" update info: ${i.stack || i.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
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
    return (0, Ho.resolveFiles)(t, this.baseUrl);
  }
}
Gr.GenericProvider = Hv;
var no = {}, ro = {};
Object.defineProperty(ro, "__esModule", { value: !0 });
ro.BitbucketProvider = void 0;
const oc = Oe, Go = yt, qo = Ce;
class Gv extends qo.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n;
    const { owner: i, slug: o } = t;
    this.baseUrl = (0, Go.newBaseUrl)(`https://api.bitbucket.org/2.0/repositories/${i}/${o}/downloads`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "latest";
  }
  async getLatestVersion() {
    const t = new oc.CancellationToken(), n = (0, Go.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, Go.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, void 0, t);
      return (0, qo.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, oc.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, qo.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { owner: t, slug: n } = this.configuration;
    return `Bitbucket (owner: ${t}, slug: ${n}, channel: ${this.channel})`;
  }
}
ro.BitbucketProvider = Gv;
var Zt = {};
Object.defineProperty(Zt, "__esModule", { value: !0 });
Zt.GitHubProvider = Zt.BaseGitHubProvider = void 0;
Zt.computeReleaseNotes = fd;
const Rt = Oe, At = id, qv = Kt, jn = yt, vs = Ce, zo = /\/tag\/(v?[^/]+)$/;
class ud extends vs.Provider {
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
Zt.BaseGitHubProvider = ud;
class zv extends ud {
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
    }, s), l = (0, Rt.parseXml)(a);
    let m = l.element("entry", !1, "No published versions on GitHub"), c = null;
    try {
      if (this.updater.allowPrerelease) {
        const y = ((t = this.updater) === null || t === void 0 ? void 0 : t.channel) || ((n = At.prerelease(this.updater.currentVersion)) === null || n === void 0 ? void 0 : n[0]) || null;
        if (y === null)
          c = zo.exec(m.element("link").attribute("href"))[1];
        else
          for (const _ of l.getElements("entry")) {
            const E = zo.exec(_.element("link").attribute("href"));
            if (E === null)
              continue;
            const S = E[1];
            if (!At.valid(S))
              continue;
            const T = ((r = At.prerelease(S)) === null || r === void 0 ? void 0 : r[0]) || null, R = !y || ["alpha", "beta"].includes(y), O = T !== null && !["alpha", "beta"].includes(String(T));
            if (R && !O && !(y === "beta" && T === "alpha")) {
              c = S, m = _;
              break;
            }
            if (T && T === y) {
              c = S, m = _;
              break;
            }
          }
      } else {
        c = await this.getLatestTagName(s);
        for (const y of l.getElements("entry")) {
          const _ = zo.exec(y.element("link").attribute("href"));
          if (_ != null && _[1] === c) {
            m = y;
            break;
          }
        }
      }
    } catch (y) {
      throw (0, Rt.newError)(`Cannot parse releases feed: ${y.stack || y.message},
XML:
${a}`, "ERR_UPDATER_INVALID_RELEASE_FEED");
    }
    if (c == null)
      throw (0, Rt.newError)("No published versions on GitHub", "ERR_UPDATER_NO_PUBLISHED_VERSIONS");
    let u, h = "", w = "";
    const p = async (y) => {
      h = (0, jn.getChannelFilename)(y), w = (0, jn.newUrlFromBase)(this.getBaseDownloadPath(String(c), h), this.baseUrl);
      const _ = this.createRequestOptions(w);
      try {
        return await this.executor.request(_, s);
      } catch (E) {
        throw E instanceof Rt.HttpError && E.statusCode === 404 ? (0, Rt.newError)(`Cannot find ${h} in the latest release artifacts (${w}): ${E.stack || E.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : E;
      }
    };
    try {
      let y = this.channel;
      this.updater.allowPrerelease && (!((i = At.prerelease(c)) === null || i === void 0) && i[0]) && (y = this.getCustomChannelName(String((o = At.prerelease(c)) === null || o === void 0 ? void 0 : o[0]))), u = await p(y);
    } catch (y) {
      if (this.updater.allowPrerelease)
        u = await p(this.getDefaultChannelName());
      else
        throw y;
    }
    const f = (0, vs.parseUpdateInfo)(u, h, w);
    return f.releaseName == null && (f.releaseName = m.elementValueOrEmpty("title")), f.releaseNotes == null && (f.releaseNotes = fd(this.updater.currentVersion, this.updater.fullChangelog, l, m)), {
      tag: c,
      ...f
    };
  }
  async getLatestTagName(t) {
    const n = this.options, r = n.host == null || n.host === "github.com" ? (0, jn.newUrlFromBase)(`${this.basePath}/latest`, this.baseUrl) : new qv.URL(`${this.computeGithubBasePath(`/repos/${n.owner}/${n.repo}/releases`)}/latest`, this.baseApiUrl);
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
    return (0, vs.resolveFiles)(t, this.baseUrl, (n) => this.getBaseDownloadPath(t.tag, n.replace(/ /g, "-")));
  }
  getBaseDownloadPath(t, n) {
    return `${this.basePath}/download/${t}/${n}`;
  }
}
Zt.GitHubProvider = zv;
function sc(e) {
  const t = e.elementValueOrEmpty("content");
  return t === "No content." ? "" : t;
}
function fd(e, t, n, r) {
  if (!t)
    return sc(r);
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
    let l;
    try {
      const u = i.exec(a.element("link").attribute("href"));
      if (!u)
        continue;
      l = u[1];
    } catch {
      continue;
    }
    if (!At.valid(l))
      continue;
    const m = At.gt(l, e.raw), c = At.lte(l, o);
    m && c && s.push({
      version: l,
      note: sc(a)
    });
  }
  return s.sort((a, l) => At.rcompare(a.version, l.version));
}
var io = {};
Object.defineProperty(io, "__esModule", { value: !0 });
io.GitLabProvider = void 0;
const xe = Oe, Vo = Kt, Vv = ld, pi = yt, Wo = Ce;
class Wv extends Wo.Provider {
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
    let a = null, l = "", m = null;
    const c = async (w) => {
      l = (0, pi.getChannelFilename)(w);
      const p = o.assets.links.find((_) => _.name === l);
      if (!p)
        throw (0, xe.newError)(`Cannot find ${l} in the latest release assets`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
      m = new Vo.URL(p.direct_asset_url);
      const f = this.setAuthHeaderForToken(this.options.token || null), y = Object.keys(f).length ? f : void 0;
      try {
        const _ = await this.httpRequest(m, y, t);
        if (!_)
          throw (0, xe.newError)(`Empty response from ${m}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
        return _;
      } catch (_) {
        throw _ instanceof xe.HttpError && _.statusCode === 404 ? (0, xe.newError)(`Cannot find ${l} in the latest release artifacts (${m}): ${_.stack || _.message}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND") : _;
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
      throw (0, xe.newError)(`Unable to parse channel data from ${l}`, "ERR_UPDATER_INVALID_UPDATE_INFO");
    const u = (0, Wo.parseUpdateInfo)(a, l, m);
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
        return new Vo.URL(o);
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
      const l = r.replace(new RegExp(Vv(n), "g"), t);
      o = this.findBlockMapInAssets(a, l);
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
    return (0, Wo.getFileList)(t).map((n) => {
      const i = [
        n.url,
        // Original filename
        this.normalizeFilename(n.url)
        // Normalized filename (spaces/underscores → dashes)
      ].find((s) => t.assets.has(s)), o = i ? t.assets.get(i) : void 0;
      if (!o)
        throw (0, xe.newError)(`Cannot find asset "${n.url}" in GitLab release assets. Available assets: ${Array.from(t.assets.keys()).join(", ")}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new Vo.URL(o),
        info: n
      };
    });
  }
  toString() {
    return `GitLab (projectId: ${this.options.projectId}, channel: ${this.channel})`;
  }
}
io.GitLabProvider = Wv;
var oo = {};
Object.defineProperty(oo, "__esModule", { value: !0 });
oo.KeygenProvider = void 0;
const ac = Oe, Yo = yt, Xo = Ce;
class Yv extends Xo.Provider {
  constructor(t, n, r) {
    super({
      ...r,
      isUseMultipleRangeRequest: !1
    }), this.configuration = t, this.updater = n, this.defaultHostname = "api.keygen.sh";
    const i = this.configuration.host || this.defaultHostname;
    this.baseUrl = (0, Yo.newBaseUrl)(`https://${i}/v1/accounts/${this.configuration.account}/artifacts?product=${this.configuration.product}`);
  }
  get channel() {
    return this.updater.channel || this.configuration.channel || "stable";
  }
  async getLatestVersion() {
    const t = new ac.CancellationToken(), n = (0, Yo.getChannelFilename)(this.getCustomChannelName(this.channel)), r = (0, Yo.newUrlFromBase)(n, this.baseUrl, this.updater.isAddNoCacheQuery);
    try {
      const i = await this.httpRequest(r, {
        Accept: "application/vnd.api+json",
        "Keygen-Version": "1.1"
      }, t);
      return (0, Xo.parseUpdateInfo)(i, n, r);
    } catch (i) {
      throw (0, ac.newError)(`Unable to find latest version on ${this.toString()}, please ensure release exists: ${i.stack || i.message}`, "ERR_UPDATER_LATEST_VERSION_NOT_FOUND");
    }
  }
  resolveFiles(t) {
    return (0, Xo.resolveFiles)(t, this.baseUrl);
  }
  toString() {
    const { account: t, product: n, platform: r } = this.configuration;
    return `Keygen (account: ${t}, product: ${n}, platform: ${r}, channel: ${this.channel})`;
  }
}
oo.KeygenProvider = Yv;
var so = {};
Object.defineProperty(so, "__esModule", { value: !0 });
so.PrivateGitHubProvider = void 0;
const On = Oe, Xv = Fe, Jv = fe, lc = Kt, cc = yt, Zv = Zt, Kv = Ce;
class Qv extends Zv.BaseGitHubProvider {
  constructor(t, n, r, i) {
    super(t, "api.github.com", i), this.updater = n, this.token = r;
  }
  createRequestOptions(t, n) {
    const r = super.createRequestOptions(t, n);
    return r.redirect = "manual", r;
  }
  async getLatestVersion() {
    const t = new On.CancellationToken(), n = (0, cc.getChannelFilename)(this.getDefaultChannelName()), r = await this.getLatestVersionInfo(t), i = r.assets.find((a) => a.name === n);
    if (i == null)
      throw (0, On.newError)(`Cannot find ${n} in the release ${r.html_url || r.name}`, "ERR_UPDATER_CHANNEL_FILE_NOT_FOUND");
    const o = new lc.URL(i.url);
    let s;
    try {
      s = (0, Xv.load)(await this.httpRequest(o, this.configureHeaders("application/octet-stream"), t));
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
    const i = (0, cc.newUrlFromBase)(r, this.baseUrl);
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
    return (0, Kv.getFileList)(t).map((n) => {
      const r = Jv.posix.basename(n.url).replace(/ /g, "-"), i = t.assets.find((o) => o != null && o.name === r);
      if (i == null)
        throw (0, On.newError)(`Cannot find asset "${r}" in: ${JSON.stringify(t.assets, null, 2)}`, "ERR_UPDATER_ASSET_NOT_FOUND");
      return {
        url: new lc.URL(i.url),
        info: n
      };
    });
  }
}
so.PrivateGitHubProvider = Qv;
Object.defineProperty(no, "__esModule", { value: !0 });
no.isUrlProbablySupportMultiRangeRequests = dd;
no.createClient = oS;
const mi = Oe, eS = ro, uc = Gr, tS = Zt, nS = io, rS = oo, iS = so;
function dd(e) {
  return !e.includes("s3.amazonaws.com");
}
function oS(e, t, n) {
  if (typeof e == "string")
    throw (0, mi.newError)("Please pass PublishConfiguration object", "ERR_UPDATER_INVALID_PROVIDER_CONFIGURATION");
  const r = e.provider;
  switch (r) {
    case "github": {
      const i = e, o = (i.private ? process.env.GH_TOKEN || process.env.GITHUB_TOKEN : null) || i.token;
      return o == null ? new tS.GitHubProvider(i, t, n) : new iS.PrivateGitHubProvider(i, t, o, n);
    }
    case "bitbucket":
      return new eS.BitbucketProvider(e, t, n);
    case "gitlab":
      return new nS.GitLabProvider(e, t, n);
    case "keygen":
      return new rS.KeygenProvider(e, t, n);
    case "s3":
    case "spaces":
      return new uc.GenericProvider({
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
      return new uc.GenericProvider(i, t, {
        ...n,
        isUseMultipleRangeRequest: i.useMultipleRangeRequest !== !1 && dd(i.url)
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
var ao = {}, qr = {}, Qn = {}, In = {};
Object.defineProperty(In, "__esModule", { value: !0 });
In.OperationKind = void 0;
In.computeOperations = sS;
var pn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(pn || (In.OperationKind = pn = {}));
function sS(e, t, n) {
  const r = dc(e.files), i = dc(t.files);
  let o = null;
  const s = t.files[0], a = [], l = s.name, m = r.get(l);
  if (m == null)
    throw new Error(`no file ${l} in old blockmap`);
  const c = i.get(l);
  let u = 0;
  const { checksumToOffset: h, checksumToOldSize: w } = lS(r.get(l), m.offset, n);
  let p = s.offset;
  for (let f = 0; f < c.checksums.length; p += c.sizes[f], f++) {
    const y = c.sizes[f], _ = c.checksums[f];
    let E = h.get(_);
    E != null && w.get(_) !== y && (n.warn(`Checksum ("${_}") matches, but size differs (old: ${w.get(_)}, new: ${y})`), E = void 0), E === void 0 ? (u++, o != null && o.kind === pn.DOWNLOAD && o.end === p ? o.end += y : (o = {
      kind: pn.DOWNLOAD,
      start: p,
      end: p + y
      // oldBlocks: null,
    }, fc(o, a, _, f))) : o != null && o.kind === pn.COPY && o.end === E ? o.end += y : (o = {
      kind: pn.COPY,
      start: E,
      end: E + y
      // oldBlocks: [checksum]
    }, fc(o, a, _, f));
  }
  return u > 0 && n.info(`File${s.name === "file" ? "" : " " + s.name} has ${u} changed blocks`), a;
}
const aS = process.env.DIFFERENTIAL_DOWNLOAD_PLAN_BUILDER_VALIDATE_RANGES === "true";
function fc(e, t, n, r) {
  if (aS && t.length !== 0) {
    const i = t[t.length - 1];
    if (i.kind === e.kind && e.start < i.end && e.start > i.start) {
      const o = [i.start, i.end, e.start, e.end].reduce((s, a) => s < a ? s : a);
      throw new Error(`operation (block index: ${r}, checksum: ${n}, kind: ${pn[e.kind]}) overlaps previous operation (checksum: ${n}):
abs: ${i.start} until ${i.end} and ${e.start} until ${e.end}
rel: ${i.start - o} until ${i.end - o} and ${e.start - o} until ${e.end - o}`);
    }
  }
  t.push(e);
}
function lS(e, t, n) {
  const r = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map();
  let o = t;
  for (let s = 0; s < e.checksums.length; s++) {
    const a = e.checksums[s], l = e.sizes[s], m = i.get(a);
    if (m === void 0)
      r.set(a, o), i.set(a, l);
    else if (n.debug != null) {
      const c = m === l ? "(same size)" : `(size: ${m}, this size: ${l})`;
      n.debug(`${a} duplicated in blockmap ${c}, it doesn't lead to broken differential downloader, just corresponding block will be skipped)`);
    }
    o += l;
  }
  return { checksumToOffset: r, checksumToOldSize: i };
}
function dc(e) {
  const t = /* @__PURE__ */ new Map();
  for (const n of e)
    t.set(n.name, n);
  return t;
}
Object.defineProperty(Qn, "__esModule", { value: !0 });
Qn.DataSplitter = void 0;
Qn.copyData = hd;
const gi = Oe, cS = xt, uS = xr, fS = In, Ss = Buffer.from(`\r
\r
`), hc = Buffer.from(`

`), dS = Ss.length - 1, hS = 4, pS = 3;
function mS(e) {
  const t = e.indexOf(Ss), n = e.indexOf(hc);
  return n !== -1 && (t === -1 || n < t) ? { end: n + hc.length, lineFeedOnly: !0 } : t !== -1 ? { end: t + Ss.length, lineFeedOnly: !1 } : null;
}
var Ht;
(function(e) {
  e[e.INIT = 0] = "INIT", e[e.HEADER = 1] = "HEADER", e[e.BODY = 2] = "BODY";
})(Ht || (Ht = {}));
function hd(e, t, n, r, i) {
  const o = (0, cS.createReadStream)("", {
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
class gS extends uS.Writable {
  constructor(t, n, r, i, o, s, a, l) {
    super(), this.out = t, this.options = n, this.partIndexToTaskIndex = r, this.partIndexToLength = o, this.finishHandler = s, this.grandTotalBytes = a, this.onProgress = l, this.start = Date.now(), this.nextUpdate = this.start + 1e3, this.transferred = 0, this.delta = 0, this.partIndex = -1, this.headerListTail = null, this.readState = Ht.INIT, this.ignoreByteCount = 0, this.remainingPartDataCount = 0, this.actualPartLength = 0, this.boundaryTextLength = i.length, this.boundaryLength = i.length + 4, this.ignoreByteCount = this.boundaryLength - 2;
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
        if (s.kind !== fS.OperationKind.COPY) {
          i(new Error("Task kind must be COPY"));
          return;
        }
        hd(s, this.out, this.options.oldFileFd, i, () => {
          t++, o();
        });
      };
      o();
    });
  }
  searchHeaderListEnd(t, n) {
    const r = this.headerListTail, i = r == null ? 0 : r.length, o = r == null ? t.subarray(n) : Buffer.concat([r, t.subarray(n)]), s = mS(o);
    return s != null ? (this.headerListTail = null, this.boundaryLength = this.boundaryTextLength + (s.lineFeedOnly ? pS : hS), n + s.end - i) : (this.headerListTail = Buffer.from(o.subarray(Math.max(0, o.length - dS))), -1);
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
Qn.DataSplitter = gS;
var lo = {};
Object.defineProperty(lo, "__esModule", { value: !0 });
lo.executeTasksUsingMultipleRangeRequests = ES;
lo.checkIsRangesSupported = Ts;
const As = Oe, pc = Qn, mc = In;
function ES(e, t, n, r, i) {
  const o = (s) => {
    if (s >= t.length) {
      e.fileMetadataBuffer != null && n.write(e.fileMetadataBuffer), n.end();
      return;
    }
    const a = s + 1e3;
    yS(e, {
      tasks: t,
      start: s,
      end: Math.min(t.length, a),
      oldFileFd: r
    }, n, () => o(a), i);
  };
  return o;
}
function yS(e, t, n, r, i) {
  let o = "bytes=", s = 0, a = 0;
  const l = /* @__PURE__ */ new Map(), m = [];
  for (let h = t.start; h < t.end; h++) {
    const w = t.tasks[h];
    w.kind === mc.OperationKind.DOWNLOAD && (o += `${w.start}-${w.end - 1}, `, l.set(s, h), s++, m.push(w.end - w.start), a += w.end - w.start);
  }
  if (s <= 1) {
    const h = (w) => {
      if (w >= t.end) {
        r();
        return;
      }
      const p = t.tasks[w++];
      if (p.kind === mc.OperationKind.COPY)
        (0, pc.copyData)(p, n, t.oldFileFd, i, () => h(w));
      else {
        const f = e.createRequestOptions();
        f.headers.Range = `bytes=${p.start}-${p.end - 1}`;
        const y = e.httpExecutor.createRequest(f, (_) => {
          _.on("error", i), Ts(_, i) && (_.pipe(n, {
            end: !1
          }), _.once("end", () => h(w)));
        });
        e.httpExecutor.addErrorAndTimeoutHandlers(y, i), y.end();
      }
    };
    h(t.start);
    return;
  }
  const c = e.createRequestOptions();
  c.headers.Range = o.substring(0, o.length - 2);
  const u = e.httpExecutor.createRequest(c, (h) => {
    if (!Ts(h, i))
      return;
    const w = (0, As.safeGetHeader)(h, "content-type"), p = /^multipart\/.+?\s*;\s*boundary=(?:"([^"]+)"|([^\s";]+))\s*$/i.exec(w);
    if (p == null) {
      i(new Error(`Content-Type "multipart/byteranges" is expected, but got "${w}"`));
      return;
    }
    let f = !1, y = null;
    const _ = () => {
      f = !0, y != null && (clearTimeout(y), y = null), r();
    }, E = new pc.DataSplitter(n, t, l, p[1] || p[2], m, _, a, e.options.onProgress);
    E.on("error", i), h.pipe(E), h.on("end", () => {
      f || (y = setTimeout(() => {
        y = null, !f && (u.abort(), i(new Error("Response ends without calling any handlers")));
      }, 1e4));
    });
  });
  e.httpExecutor.addErrorAndTimeoutHandlers(u, i), u.end();
}
function Ts(e, t) {
  if (e.statusCode >= 400)
    return t((0, As.createHttpError)(e)), !1;
  if (e.statusCode !== 206) {
    const n = (0, As.safeGetHeader)(e, "accept-ranges");
    if (n == null || n === "none")
      return t(new Error(`Server doesn't support Accept-Ranges (response code ${e.statusCode})`)), !1;
  }
  return !0;
}
var co = {};
Object.defineProperty(co, "__esModule", { value: !0 });
co.ProgressDifferentialDownloadCallbackTransform = void 0;
const wS = xr;
var Hn;
(function(e) {
  e[e.COPY = 0] = "COPY", e[e.DOWNLOAD = 1] = "DOWNLOAD";
})(Hn || (Hn = {}));
class _S extends wS.Transform {
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
co.ProgressDifferentialDownloadCallbackTransform = _S;
Object.defineProperty(qr, "__esModule", { value: !0 });
qr.DifferentialDownloader = void 0;
const cr = Oe, Jo = Qt, vS = xt, SS = Qn, AS = Kt, Ei = In, gc = lo, TS = co;
class IS {
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
    for (const l of i) {
      const m = l.end - l.start;
      l.kind === Ei.OperationKind.DOWNLOAD ? o += m : s += m;
    }
    const a = this.blockAwareFileInfo.size;
    if (o + s + (this.fileMetadataBuffer == null ? 0 : this.fileMetadataBuffer.length) !== a)
      throw new Error(`Internal error, size mismatch: downloadSize: ${o}, copySize: ${s}, newSize: ${a}`);
    return r.info(`Full: ${Ec(a)}, To download: ${Ec(o)} (${Math.round(o / (a / 100))}%)`), this.downloadFile(i);
  }
  downloadFile(t) {
    const n = [], r = () => Promise.all(n.map((i) => (0, Jo.close)(i.descriptor).catch((o) => {
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
    const r = await (0, Jo.open)(this.options.oldFile, "r");
    n.push({ descriptor: r, path: this.options.oldFile });
    const i = await (0, Jo.open)(this.options.newFile, "w");
    n.push({ descriptor: i, path: this.options.newFile });
    const o = (0, vS.createWriteStream)(this.options.newFile, { fd: i });
    await new Promise((s, a) => {
      const l = [];
      let m;
      if (!this.options.isUseMultipleRangeRequest && this.options.onProgress) {
        const _ = [];
        let E = 0;
        for (const T of t)
          T.kind === Ei.OperationKind.DOWNLOAD && (_.push(T.end - T.start), E += T.end - T.start);
        const S = {
          expectedByteCounts: _,
          grandTotal: E
        };
        m = new TS.ProgressDifferentialDownloadCallbackTransform(S, this.options.cancellationToken, this.options.onProgress), l.push(m);
      }
      const c = new cr.DigestTransform(this.blockAwareFileInfo.sha512);
      c.isValidateOnEnd = !1, l.push(c), o.on("finish", () => {
        o.close(() => {
          n.splice(1, 1);
          try {
            c.validate();
          } catch (_) {
            a(_);
            return;
          }
          s(void 0);
        });
      }), l.push(o);
      let u = null;
      for (const _ of l)
        _.on("error", a), u == null ? u = _ : u = u.pipe(_);
      const h = l[0];
      let w;
      if (this.options.isUseMultipleRangeRequest) {
        w = (0, gc.executeTasksUsingMultipleRangeRequests)(this, t, h, r, a), w(0);
        return;
      }
      let p = 0, f = null;
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
          m && m.beginFileCopy(), (0, SS.copyData)(T, h, r, a, () => w(_));
          return;
        }
        const R = `bytes=${T.start}-${T.end - 1}`;
        y.headers.range = R, (S = (E = this.logger) === null || E === void 0 ? void 0 : E.debug) === null || S === void 0 || S.call(E, `download range: ${R}`), m && m.beginRangeDownload();
        const O = this.httpExecutor.createRequest(y, (j) => {
          j.on("error", a), j.on("aborted", () => {
            a(new Error("response has been aborted by the server"));
          }), j.statusCode >= 400 && a((0, cr.createHttpError)(j)), j.pipe(h, {
            end: !1
          }), j.once("end", () => {
            m && m.endRangeDownload(), ++p === 100 ? (p = 0, setTimeout(() => w(_), 1e3)) : w(_);
          });
        });
        O.on("redirect", (j, B, x) => {
          this.logger.info(`Redirect to ${CS(x)}`), f = x, (0, cr.configureRequestUrl)(new AS.URL(f), y), O.followRedirect();
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
        (0, gc.checkIsRangesSupported)(s, i) && (s.on("error", i), s.on("aborted", () => {
          i(new Error("response has been aborted by the server"));
        }), s.on("data", n), s.on("end", () => r()));
      });
      this.httpExecutor.addErrorAndTimeoutHandlers(o, i), o.end();
    });
  }
}
qr.DifferentialDownloader = IS;
function Ec(e, t = " KB") {
  return new Intl.NumberFormat("en").format((e / 1024).toFixed(2)) + t;
}
function CS(e) {
  const t = e.indexOf("?");
  return t < 0 ? e : e.substring(0, t);
}
Object.defineProperty(ao, "__esModule", { value: !0 });
ao.GenericDifferentialDownloader = void 0;
const DS = qr;
class NS extends DS.DifferentialDownloader {
  download(t, n) {
    return this.doDownload(t, n);
  }
}
ao.GenericDifferentialDownloader = NS;
var en = {};
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
})(en);
Object.defineProperty(Yt, "__esModule", { value: !0 });
Yt.NoOpLogger = Yt.AppUpdater = void 0;
const qe = Oe, OS = Xn, bS = Mi, RS = Jc, tt = Qt, $S = Fe, Zo = Xi, st = fe, un = id, yc = Hr, LS = to, wc = od, xS = Gr, Ko = no, Qo = Bi, PS = ao, bn = en;
class sa extends RS.EventEmitter {
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
    return (0, wc.getNetSession)();
  }
  /**
   * The logger. You can pass [electron-log](https://github.com/megahertz/electron-log), [winston](https://github.com/winstonjs/winston) or another logger with the following interface: `{ info(), warn(), error() }`.
   * Set it to `null` if you would like to disable a logging feature.
   */
  get logger() {
    return this._logger;
  }
  set logger(t) {
    this._logger = t ?? new pd();
  }
  // noinspection JSUnusedGlobalSymbols
  /**
   * test only
   * @private
   */
  set updateConfigPath(t) {
    this.clientPromise = null, this._appUpdateConfigPath = t, this.configOnDisk = new Zo.Lazy(() => this.loadUpdateConfig());
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
    super(), this.autoDownload = !0, this.autoInstallOnAppQuit = !0, this.autoRunAppAfterInstall = !0, this.allowPrerelease = !1, this.fullChangelog = !1, this.allowDowngrade = !1, this.disableWebInstaller = !1, this.disableDifferentialDownload = !1, this.forceDevUpdateConfig = !1, this.previousBlockmapBaseUrlOverride = null, this._channel = null, this.downloadedUpdateHelper = null, this.requestHeaders = null, this._logger = console, this.signals = new bn.UpdaterSignal(this), this._appUpdateConfigPath = null, this._isUpdateSupported = (o) => this.checkIfUpdateSupported(o), this._isUserWithinRollout = (o) => this.isStagingMatch(o), this.clientPromise = null, this.stagingUserIdPromise = new Zo.Lazy(() => this.getOrCreateStagingUserId()), this.configOnDisk = new Zo.Lazy(() => this.loadUpdateConfig()), this.checkForUpdatesPromise = null, this.downloadPromise = null, this.updateInfoAndProvider = null, this._testOnlyOptions = null, this.on("error", (o) => {
      this._logger.error(`Error: ${o.stack || o.message}`);
    }), n == null ? (this.app = new LS.ElectronAppAdapter(), this.httpExecutor = new wc.ElectronHttpExecutor((o, s) => this.emit("login", o, s))) : (this.app = n, this.httpExecutor = null);
    const r = this.app.version, i = (0, un.parse)(r);
    if (i == null)
      throw (0, qe.newError)(`App version is not a valid semver version: "${r}"`, "ERR_UPDATER_INVALID_VERSION");
    this.currentVersion = i, this.allowPrerelease = FS(i), t != null && (this.setFeedURL(t), typeof t != "string" && t.requestHeaders && (this.requestHeaders = t.requestHeaders));
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
    typeof t == "string" ? r = new xS.GenericProvider({ provider: "generic", url: t }, this, {
      ...n,
      isUseMultipleRangeRequest: (0, Ko.isUrlProbablySupportMultiRangeRequests)(t)
    }) : r = (0, Ko.createClient)(t, this, n), this.clientPromise = Promise.resolve(r);
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
      const r = sa.formatDownloadNotification(n.updateInfo.version, this.app.name, t);
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
    const i = await this.stagingUserIdPromise.value, s = qe.UUID.parse(i).readUInt32BE(12) / 4294967295;
    return this._logger.info(`Staging percentage: ${r}, percentage: ${s}, user id: ${i}`), s < r;
  }
  computeFinalHeaders(t) {
    return this.requestHeaders != null && Object.assign(t, this.requestHeaders), t;
  }
  async isUpdateAvailable(t) {
    const n = (0, un.parse)(t.version);
    if (n == null)
      throw (0, qe.newError)(`This file could not be downloaded, or the latest version (from update server) does not have a valid semver version: "${t.version}"`, "ERR_UPDATER_INVALID_VERSION");
    const r = this.currentVersion;
    if ((0, un.eq)(n, r) || !await Promise.resolve(this.isUpdateSupported(t)) || !await Promise.resolve(this.isUserWithinRollout(t)))
      return !1;
    const o = (0, un.gt)(n, r), s = (0, un.lt)(n, r);
    return o ? !0 : this.allowDowngrade && s;
  }
  checkIfUpdateSupported(t) {
    const n = t == null ? void 0 : t.minimumSystemVersion, r = (0, bS.release)();
    if (n)
      try {
        if ((0, un.lt)(r, n))
          return this._logger.info(`Current OS version ${r} is less than the minimum OS version required ${n} for version ${r}`), !1;
      } catch (i) {
        this._logger.warn(`Failed to compare current OS version(${r}) with minimum OS version(${n}): ${(i.message || i).toString()}`);
      }
    return !0;
  }
  async getUpdateInfoAndProvider() {
    await this.app.whenReady(), this.clientPromise == null && (this.clientPromise = this.configOnDisk.value.then((r) => (0, Ko.createClient)(r, this, this.createProviderRuntimeOptions())));
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
      return this._logger.info("Downloading update (already in progress)"), this.downloadPromise.then(_c);
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
    }), this.downloadPromise.then(_c);
  }
  dispatchError(t) {
    this.emit("error", t, (t.stack || t).toString());
  }
  dispatchUpdateDownloaded(t) {
    this.emit(bn.UPDATE_DOWNLOADED, t);
  }
  async loadUpdateConfig() {
    return this._appUpdateConfigPath == null && (this._appUpdateConfigPath = this.app.appUpdateConfigPath), (0, $S.load)(await (0, tt.readFile)(this._appUpdateConfigPath, "utf-8"));
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
    const n = qe.UUID.v5((0, OS.randomBytes)(4096), qe.UUID.OID);
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
      r.debug != null && r.debug(`updater cache dir: ${i}`), t = new yc.DownloadedUpdateHelper(i), this.downloadedUpdateHelper = t;
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
      return T.toLowerCase().endsWith(`.${t.fileExtension.toLowerCase()}`) ? st.basename(T) : st.basename(t.fileInfo.info.url);
    }
    const l = await this.getOrCreateDownloadHelper(), m = l.cacheDirForPendingUpdate;
    await (0, tt.mkdir)(m, { recursive: !0 });
    const c = a();
    let u = st.join(m, c);
    const h = s == null ? null : st.join(m, `package-${o}${st.extname(s.path) || ".7z"}`), w = st.join(m, "current.blockmap"), p = st.join(l.cacheDir, "current.blockmap"), f = async (T) => (await l.setDownloadedFile(u, h, i, n, c, T), await t.done({
      ...i,
      downloadedFile: u
    }), await (0, tt.pathExists)(w) ? await (0, tt.copyFile)(w, p) : t.downloadUpdateOptions.disableDifferentialDownload || await (0, tt.remove)(p), h == null ? { updateFile: u } : { updateFile: u, packageFile: h }), y = this._logger, _ = await l.validateDownloadedPath(u, i, n, y);
    if (_ != null)
      return u = _, await f(!1);
    const E = async () => (await l.clear().catch(() => {
    }), await (0, tt.unlink)(u).catch(() => {
    }));
    await (0, tt.remove)(w);
    const S = await (0, yc.createTempUpdateFile)(`temp-${c}`, m, y);
    try {
      await t.task(S, r, h, E), await (0, qe.retry)(() => (0, tt.rename)(S, u), {
        retries: 60,
        interval: 500,
        shouldRetry: (T) => T instanceof Error && /^EBUSY:/.test(T.message) ? !0 : (y.warn(`Cannot rename temp file to final file: ${T.message || T.stack}`), !1)
      });
    } catch (T) {
      throw await E(), T instanceof qe.CancellationError ? (y.info("cancelled"), this.emit("update-cancelled", i)) : T.code === "ERR_CHECKSUM_MISMATCH" && y.warn(`sha512 checksum mismatch after full download of ${c}: the downloaded file is corrupted or the published update metadata does not match the uploaded file`), T;
    }
    return y.info(`New version ${o} has been downloaded to ${u}`), await f(!0);
  }
  async differentialDownloadInstaller(t, n, r, i, o) {
    let s = !1;
    try {
      if (this._testOnlyOptions != null && !this._testOnlyOptions.isUseDifferentialDownload)
        return !0;
      const a = n.updateInfoAndProvider.provider, l = await a.getBlockMapFiles(t.url, this.app.version, n.updateInfoAndProvider.info.version, this.previousBlockmapBaseUrlOverride);
      this._logger.info(`Download block maps (old: "${l[0]}", new: ${l[1]})`);
      const m = async (f) => {
        const y = await this.httpExecutor.downloadToBuffer(f, {
          headers: n.requestHeaders,
          cancellationToken: n.cancellationToken
        });
        if (y == null || y.length === 0)
          throw new Error(`Blockmap "${f.href}" is empty`);
        try {
          return JSON.parse((0, Qo.gunzipSync)(y).toString());
        } catch (_) {
          throw new Error(`Cannot parse blockmap "${f.href}", error: ${_}`);
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
      this.listenerCount(bn.DOWNLOAD_PROGRESS) > 0 && (c.onProgress = (f) => this.emit(bn.DOWNLOAD_PROGRESS, f));
      const u = async (f, y) => {
        const _ = st.join(y, "current.blockmap");
        await (0, tt.outputFile)(_, (0, Qo.gzipSync)(JSON.stringify(f)));
      }, h = async (f) => {
        const y = st.join(f, "current.blockmap");
        try {
          if (await (0, tt.pathExists)(y))
            return JSON.parse((0, Qo.gunzipSync)(await (0, tt.readFile)(y)).toString());
        } catch (_) {
          this._logger.warn(`Cannot parse blockmap "${y}", error: ${_}`);
        }
        return null;
      }, w = await m(l[1]);
      await u(w, this.downloadedUpdateHelper.cacheDirForPendingUpdate);
      let p = await h(this.downloadedUpdateHelper.cacheDir);
      return s = p != null, p == null && (this._logger.info(`No cached blockmap for the old installer, downloading it from "${l[0]}"`), p = await m(l[0])), await new PS.GenericDifferentialDownloader(t.info, this.httpExecutor, c).download(p, w), !1;
    } catch (a) {
      if (a.code === "ERR_CHECKSUM_MISMATCH" && this._logger.warn(`sha512 checksum mismatch after differential download (old blockmap ${s ? "was read from the local cache" : "was downloaded from the server"}): cached "${o}" is likely out of sync with the old blockmap, e.g. because one of them was replaced or evicted independently of the other`), this._logger.error(`Cannot download differentially, fallback to full download: ${a.stack || a}`), this._testOnlyOptions != null)
        throw a;
      return !0;
    }
  }
}
Yt.AppUpdater = sa;
function FS(e) {
  const t = (0, un.prerelease)(e);
  return t != null && t.length > 0;
}
class pd {
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
Yt.NoOpLogger = pd;
function _c({ updateFile: e, packageFile: t }) {
  return t == null ? [e] : [e, t];
}
Object.defineProperty(An, "__esModule", { value: !0 });
An.BaseUpdater = void 0;
const vc = ki, es = fe, US = Yt;
class kS extends US.AppUpdater {
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
    return t.split(es.delimiter).filter((n) => es.isAbsolute(n)).join(es.delimiter);
  }
  spawnSyncLog(t, n = [], r = {}) {
    var i;
    this._logger.info(`Executing: ${t} with args: ${n}`);
    const o = { ...process.env, ...r }, s = (0, vc.spawnSync)(t, n, {
      env: { ...o, PATH: this.sanitizeEnvPath((i = o.PATH) !== null && i !== void 0 ? i : "") },
      encoding: "utf-8",
      shell: !0
    }), { error: a, status: l, stdout: m, stderr: c } = s;
    if (a != null)
      throw this._logger.error(c), a;
    if (l != null && l !== 0)
      throw this._logger.error(c), new Error(`Command ${t} exited with code ${l}`);
    return m.trim();
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
        const a = { stdio: i, env: r, detached: !0 }, l = (0, vc.spawn)(t, n, a);
        l.on("error", (m) => {
          s(m);
        }), l.unref(), l.pid !== void 0 && o(!0);
      } catch (a) {
        s(a);
      }
    });
  }
}
An.BaseUpdater = kS;
var Dr = {}, zr = {};
Object.defineProperty(zr, "__esModule", { value: !0 });
zr.FileWithEmbeddedBlockMapDifferentialDownloader = void 0;
const Rn = Qt, MS = qr, BS = Bi;
class jS extends MS.DifferentialDownloader {
  async download() {
    const t = this.blockAwareFileInfo, n = t.size, r = n - (t.blockMapSize + 4);
    this.fileMetadataBuffer = await this.readRemoteBytes(r, n - 1);
    const i = md(this.fileMetadataBuffer.slice(0, this.fileMetadataBuffer.length - 4));
    await this.doDownload(await HS(this.options.oldFile), i);
  }
}
zr.FileWithEmbeddedBlockMapDifferentialDownloader = jS;
function md(e) {
  return JSON.parse((0, BS.inflateRawSync)(e).toString());
}
async function HS(e) {
  const t = await (0, Rn.open)(e, "r");
  try {
    const n = (await (0, Rn.fstat)(t)).size, r = Buffer.allocUnsafe(4);
    await (0, Rn.read)(t, r, 0, r.length, n - r.length);
    const i = Buffer.allocUnsafe(r.readUInt32BE(0));
    return await (0, Rn.read)(t, i, 0, i.length, n - r.length - i.length), await (0, Rn.close)(t), md(i);
  } catch (n) {
    throw await (0, Rn.close)(t), n;
  }
}
Object.defineProperty(Dr, "__esModule", { value: !0 });
Dr.AppImageUpdater = void 0;
const ts = Oe, Sc = ki, GS = Qt, qS = xt, $n = fe, zS = An, VS = zr, WS = Ce, Ac = en;
class YS extends zS.BaseUpdater {
  constructor(t, n) {
    super(t, n);
  }
  isUpdaterActive() {
    return process.env.APPIMAGE == null && !this.forceDevUpdateConfig ? (process.env.SNAP == null ? this._logger.warn("APPIMAGE env is not defined, current application is not an AppImage") : this._logger.info("SNAP env is defined, updater is disabled"), !1) : super.isUpdaterActive();
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, WS.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "AppImage", ["rpm", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "AppImage",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        const s = process.env.APPIMAGE;
        if (s == null)
          throw (0, ts.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
        (t.disableDifferentialDownload || await this.downloadDifferential(r, s, i, n, t)) && await this.httpExecutor.download(r.url, i, o), await (0, GS.chmod)(i, 493);
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
      return this.listenerCount(Ac.DOWNLOAD_PROGRESS) > 0 && (s.onProgress = (a) => this.emit(Ac.DOWNLOAD_PROGRESS, a)), await new VS.FileWithEmbeddedBlockMapDifferentialDownloader(t.info, this.httpExecutor, s).download(), !1;
    } catch (s) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${s.stack || s}`), process.platform === "linux";
    }
  }
  doInstall(t) {
    const n = process.env.APPIMAGE;
    if (n == null)
      throw (0, ts.newError)("APPIMAGE env is not defined", "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    if (!$n.isAbsolute(n) || n.includes("\0"))
      throw (0, ts.newError)(`APPIMAGE env is not a valid absolute path: "${n}"`, "ERR_UPDATER_OLD_FILE_NOT_FOUND");
    (0, qS.unlinkSync)(n);
    let r;
    const i = $n.basename(n), o = this.installerPath;
    if (o == null)
      return this.dispatchError(new Error("No update filepath provided, can't quit and install")), !1;
    $n.basename(o) === i || !/\d+\.\d+\.\d+/.test(i) ? r = n : r = $n.join($n.dirname(n), $n.basename(o)), (0, Sc.execFileSync)("mv", ["-f", o, r]), r !== n && this.emit("appimage-filename-updated", r);
    const s = {
      ...process.env,
      APPIMAGE_SILENT_INSTALL: "true"
    };
    return t.isForceRunAfter ? this.spawnLog(r, [], s) : (s.APPIMAGE_EXIT_AFTER_INSTALL = "true", (0, Sc.execFileSync)(r, [], { env: s })), !0;
  }
}
Dr.AppImageUpdater = YS;
var Nr = {}, er = {};
Object.defineProperty(er, "__esModule", { value: !0 });
er.LinuxUpdater = void 0;
const XS = An, JS = /^[a-zA-Z0-9_-]+$/;
class ZS extends XS.BaseUpdater {
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
    i && (JS.test(i) ? r = [i] : this._logger.warn(`ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER "${i}" contains unsafe characters. Ignoring override.`));
    for (const a of r)
      if (this.hasCommand(a))
        return a;
    const o = i ? `ELECTRON_BUILDER_LINUX_PACKAGE_MANAGER override "${i}", ` : "", s = t[0];
    return this._logger.warn(`No package manager found in the list: ${o}${t.join(", ")}. Utilizing default: ${s}`), s;
  }
}
er.LinuxUpdater = ZS;
Object.defineProperty(Nr, "__esModule", { value: !0 });
Nr.DebUpdater = void 0;
const KS = Ce, Tc = en, QS = er;
class aa extends QS.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, KS.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "deb", ["AppImage", "rpm", "pacman"]);
    return this.executeDownload({
      fileExtension: "deb",
      fileInfo: r,
      downloadUpdateOptions: t,
      task: async (i, o) => {
        this.listenerCount(Tc.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(Tc.DOWNLOAD_PROGRESS, s)), await this.httpExecutor.download(r.url, i, o);
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
      aa.installWithCommandRunner(i, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
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
Nr.DebUpdater = aa;
var Or = {};
Object.defineProperty(Or, "__esModule", { value: !0 });
Or.PacmanUpdater = void 0;
const Ic = en, e1 = Ce, t1 = er;
class la extends t1.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, e1.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "pacman", ["AppImage", "deb", "rpm"]);
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
      la.installWithCommandRunner(n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
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
Or.PacmanUpdater = la;
var br = {};
Object.defineProperty(br, "__esModule", { value: !0 });
br.RpmUpdater = void 0;
const Cc = en, n1 = Ce, r1 = er;
class ca extends r1.LinuxUpdater {
  constructor(t, n) {
    super(t, n);
  }
  /*** @private */
  doDownloadUpdate(t) {
    const n = t.updateInfoAndProvider.provider, r = (0, n1.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "rpm", ["AppImage", "deb", "pacman"]);
    return this.executeDownload({
      fileExtension: "rpm",
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
    const r = ["zypper", "dnf", "yum", "rpm"], i = this.detectPackageManager(r);
    try {
      ca.installWithCommandRunner(i, n, this.runCommandWithSudoIfNeeded.bind(this), this._logger);
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
br.RpmUpdater = ca;
var Rr = {};
Object.defineProperty(Rr, "__esModule", { value: !0 });
Rr.MacUpdater = void 0;
const Dc = Oe, ns = Qt, i1 = xt, Nc = fe, o1 = Oh, s1 = Yt, a1 = Ce, Oc = ki, bc = Xn;
class ua extends s1.AppUpdater {
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
      this.debug("Checking for macOS Rosetta environment"), o = (0, Oc.execFileSync)("sysctl", [i], { encoding: "utf8" }).includes(`${i}: 1`), r.info(`Checked for macOS Rosetta environment (isRosetta=${o})`);
    } catch (c) {
      r.warn(`sysctl shell command to check for macOS Rosetta environment failed: ${c}`);
    }
    let s = !1;
    try {
      this.debug("Checking for arm64 in uname");
      const u = (0, Oc.execFileSync)("uname", ["-a"], { encoding: "utf8" }).includes("ARM");
      r.info(`Checked 'uname -a': arm64=${u}`), s = s || u;
    } catch (c) {
      r.warn(`uname shell command to check for arm64 failed: ${c}`);
    }
    s = s || process.arch === "arm64" || o, n = ua.filterFilesForArch(n, s);
    const a = (0, a1.findFile)(n, "zip", ["pkg", "dmg"]);
    if (a == null)
      throw (0, Dc.newError)(`ZIP file not provided: ${(0, Dc.safeStringifyJson)(n)}`, "ERR_UPDATER_ZIP_FILE_NOT_FOUND");
    const l = t.updateInfoAndProvider.provider, m = "update.zip";
    return this.executeDownload({
      fileExtension: "zip",
      fileInfo: a,
      downloadUpdateOptions: t,
      task: async (c, u) => {
        const h = Nc.join(this.downloadedUpdateHelper.cacheDir, m), w = () => (0, ns.pathExistsSync)(h) ? !t.disableDifferentialDownload : (r.info("Unable to locate previous update.zip for differential download (is this first install?), falling back to full download"), !1);
        let p = !0;
        w() && (p = await this.differentialDownloadInstaller(a, t, c, l, m)), p && await this.httpExecutor.download(a.url, c, u);
      },
      done: async (c) => {
        if (!t.disableDifferentialDownload)
          try {
            const u = Nc.join(this.downloadedUpdateHelper.cacheDir, m);
            await (0, ns.copyFile)(c.downloadedFile, u);
          } catch (u) {
            this._logger.warn(`Unable to copy file for caching for future differential downloads: ${u.message}`);
          }
        return this.updateDownloaded(a, c);
      }
    });
  }
  async updateDownloaded(t, n) {
    var r;
    const i = n.downloadedFile, o = (r = t.info.size) !== null && r !== void 0 ? r : (await (0, ns.stat)(i)).size, s = this._logger, a = `fileToProxy=${t.url.href}`;
    this.closeServerIfExists(), this.debug(`Creating proxy server for native Squirrel.Mac (${a})`), this.server = (0, o1.createServer)(), this.debug(`Proxy server for native Squirrel.Mac is created (${a})`), this.server.on("close", () => {
      s.info(`Proxy server for native Squirrel.Mac is closed (${a})`);
    });
    const l = (m) => {
      const c = m.address();
      return typeof c == "string" ? c : `http://127.0.0.1:${c == null ? void 0 : c.port}`;
    };
    return await new Promise((m, c) => {
      const u = (0, bc.randomBytes)(64).toString("base64").replace(/\//g, "_").replace(/\+/g, "-"), h = Buffer.from(`autoupdater:${u}`, "ascii"), w = `/${(0, bc.randomBytes)(64).toString("hex")}.zip`;
      this.server.on("request", (p, f) => {
        const y = p.url;
        if (s.info(`${y} requested`), y === "/") {
          if (!p.headers.authorization || p.headers.authorization.indexOf("Basic ") === -1) {
            f.statusCode = 401, f.statusMessage = "Invalid Authentication Credentials", f.end(), s.warn("No authenthication info");
            return;
          }
          const S = p.headers.authorization.split(" ")[1], T = Buffer.from(S, "base64").toString("ascii"), [R, O] = T.split(":");
          if (R !== "autoupdater" || O !== u) {
            f.statusCode = 401, f.statusMessage = "Invalid Authentication Credentials", f.end(), s.warn("Invalid authenthication credentials");
            return;
          }
          const j = Buffer.from(`{ "url": "${l(this.server)}${w}" }`);
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
          _ || (this.nativeUpdater.removeListener("error", c), m([]));
        });
        const E = (0, i1.createReadStream)(i);
        E.on("error", (S) => {
          try {
            f.end();
          } catch (T) {
            s.warn(`cannot end response: ${T}`);
          }
          _ = !0, this.nativeUpdater.removeListener("error", c), c(new Error(`Cannot pipe "${i}": ${S}`));
        }), f.writeHead(200, {
          "Content-Type": "application/zip",
          "Content-Length": o
        }), E.pipe(f);
      }), this.debug(`Proxy server for native Squirrel.Mac is starting to listen (${a})`), this.server.listen(0, "127.0.0.1", () => {
        this.debug(`Proxy server for native Squirrel.Mac is listening (address=${l(this.server)}, ${a})`), this.nativeUpdater.setFeedURL({
          url: l(this.server),
          headers: {
            "Cache-Control": "no-cache",
            Authorization: `Basic ${h.toString("base64")}`
          }
        }), this.dispatchUpdateDownloaded(n), this.autoInstallOnAppQuit ? (this.nativeUpdater.once("error", c), this.nativeUpdater.checkForUpdates()) : m([]);
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
Rr.MacUpdater = ua;
var $r = {}, fa = {};
Object.defineProperty(fa, "__esModule", { value: !0 });
fa.verifySignature = c1;
const Rc = Oe, gd = ki, l1 = Mi, $c = fe;
function Ed(e, t) {
  return ['set "PSModulePath=" & chcp 65001 >NUL & powershell.exe', ["-NoProfile", "-NonInteractive", "-InputFormat", "None", "-Command", e], {
    shell: !0,
    timeout: t
  }];
}
function c1(e, t, n) {
  return new Promise((r, i) => {
    const o = t.replace(/'/g, "''");
    n.info(`Verifying signature ${o}`), (0, gd.execFile)(...Ed(`"Get-AuthenticodeSignature -LiteralPath '${o}' | ConvertTo-Json -Compress"`, 20 * 1e3), (s, a, l) => {
      var m;
      try {
        if (s != null || l) {
          rs(n, s, l, i), r(null);
          return;
        }
        const c = u1(a);
        if (c.Status === 0) {
          try {
            const p = $c.normalize(c.Path), f = $c.normalize(t);
            if (n.info(`LiteralPath: ${p}. Update Path: ${f}`), p !== f) {
              rs(n, new Error(`LiteralPath of ${p} is different than ${f}`), l, i), r(null);
              return;
            }
          } catch (p) {
            n.warn(`Unable to verify LiteralPath of update asset due to missing data.Path. Skipping this step of validation. Message: ${(m = p.message) !== null && m !== void 0 ? m : p.stack}`);
          }
          const h = (0, Rc.parseDn)(c.SignerCertificate.Subject);
          let w = !1;
          for (const p of e) {
            const f = (0, Rc.parseDn)(p);
            if (f.size ? w = Array.from(f.keys()).every((_) => f.get(_) === h.get(_)) : p === h.get("CN") && (n.warn(`Signature validated using only CN ${p}. Please add your full Distinguished Name (DN) to publisherNames configuration`), w = !0), w) {
              r(null);
              return;
            }
          }
        }
        const u = `publisherNames: ${e.join(" | ")}, raw info: ` + JSON.stringify(c, (h, w) => h === "RawData" ? void 0 : w, 2);
        n.warn(`Sign verification failed, installer signed with incorrect certificate: ${u}`), r(u);
      } catch (c) {
        rs(n, c, null, i), r(null);
        return;
      }
    });
  });
}
function u1(e) {
  const t = JSON.parse(e);
  delete t.PrivateKey, delete t.IsOSBinary, delete t.SignatureType;
  const n = t.SignerCertificate;
  return n != null && (delete n.Archived, delete n.Extensions, delete n.Handle, delete n.HasPrivateKey, delete n.SubjectName), t;
}
function rs(e, t, n, r) {
  if (f1()) {
    e.warn(`Cannot execute Get-AuthenticodeSignature: ${t || n}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  try {
    (0, gd.execFileSync)(...Ed("ConvertTo-Json test", 10 * 1e3));
  } catch (i) {
    e.warn(`Cannot execute ConvertTo-Json: ${i.message}. Ignoring signature validation due to unsupported powershell version. Please upgrade to powershell 3 or higher.`);
    return;
  }
  t != null && r(t), n && r(new Error(`Cannot execute Get-AuthenticodeSignature, stderr: ${n}. Failing signature validation due to unknown stderr.`));
}
function f1() {
  const e = l1.release();
  return e.startsWith("6.") && !e.startsWith("6.3");
}
Object.defineProperty($r, "__esModule", { value: !0 });
$r.NsisUpdater = void 0;
const yi = Oe, Lc = fe, d1 = An, h1 = zr, xc = en, p1 = Ce, m1 = Qt, g1 = fa, Pc = Kt;
class E1 extends d1.BaseUpdater {
  constructor(t, n) {
    super(t, n), this._verifyUpdateCodeSignature = (r, i) => (0, g1.verifySignature)(r, i, this._logger);
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
    const n = t.updateInfoAndProvider.provider, r = (0, p1.findFile)(n.resolveFiles(t.updateInfoAndProvider.info), "exe");
    return this.executeDownload({
      fileExtension: "exe",
      downloadUpdateOptions: t,
      fileInfo: r,
      task: async (i, o, s, a) => {
        const l = r.packageInfo, m = l != null && s != null;
        if (m && t.disableWebInstaller)
          throw (0, yi.newError)(`Unable to download new version ${t.updateInfoAndProvider.info.version}. Web Installers are disabled`, "ERR_UPDATER_WEB_INSTALLER_DISABLED");
        !m && !t.disableWebInstaller && this._logger.warn("disableWebInstaller is set to false, you should set it to true if you do not plan on using a web installer. This will default to true in a future version."), (m || t.disableDifferentialDownload || await this.differentialDownloadInstaller(r, t, i, n, yi.CURRENT_APP_INSTALLER_FILE_NAME)) && await this.httpExecutor.download(r.url, i, o);
        const c = await this.verifySignature(i);
        if (c != null)
          throw await a(), (0, yi.newError)(`New version ${t.updateInfoAndProvider.info.version} is not signed by the application owner: ${c}`, "ERR_UPDATER_INVALID_SIGNATURE");
        if (m && await this.differentialDownloadWebPackage(t, l, s, n))
          try {
            await this.httpExecutor.download(new Pc.URL(l.path), s, {
              headers: t.requestHeaders,
              cancellationToken: t.cancellationToken,
              sha512: l.sha512
            });
          } catch (u) {
            try {
              await (0, m1.unlink)(s);
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
      this.spawnLog(Lc.join(process.resourcesPath, "elevate.exe"), [n].concat(r)).catch((s) => this.dispatchError(s));
    };
    return t.isAdminRightsRequired ? (this._logger.info("isAdminRightsRequired is set to true, run installer using elevate.exe"), o(), !0) : (this.spawnLog(n, r).catch((s) => {
      const a = s.code;
      this._logger.info(`Cannot run installer: error code: ${a}, error message: "${s.message}", will be executed again using elevate if EACCES, and will try to use electron.shell.openItem if ENOENT`), a === "UNKNOWN" || a === "EACCES" ? o() : a === "ENOENT" ? wn.shell.openPath(n).catch((l) => this.dispatchError(l)) : this.dispatchError(s);
    }), !0);
  }
  async differentialDownloadWebPackage(t, n, r, i) {
    if (n.blockMapSize == null)
      return !0;
    try {
      const o = {
        newUrl: new Pc.URL(n.path),
        oldFile: Lc.join(this.downloadedUpdateHelper.cacheDir, yi.CURRENT_APP_PACKAGE_FILE_NAME),
        logger: this._logger,
        newFile: r,
        requestHeaders: this.requestHeaders,
        isUseMultipleRangeRequest: i.isUseMultipleRangeRequest,
        cancellationToken: t.cancellationToken
      };
      this.listenerCount(xc.DOWNLOAD_PROGRESS) > 0 && (o.onProgress = (s) => this.emit(xc.DOWNLOAD_PROGRESS, s)), await new h1.FileWithEmbeddedBlockMapDifferentialDownloader(n, this.httpExecutor, o).download();
    } catch (o) {
      return this._logger.error(`Cannot download differentially, fallback to full download: ${o.stack || o}`), process.platform === "win32";
    }
    return !1;
  }
}
$r.NsisUpdater = E1;
(function(e) {
  var t = ze && ze.__createBinding || (Object.create ? function(y, _, E, S) {
    S === void 0 && (S = E);
    var T = Object.getOwnPropertyDescriptor(_, E);
    (!T || ("get" in T ? !_.__esModule : T.writable || T.configurable)) && (T = { enumerable: !0, get: function() {
      return _[E];
    } }), Object.defineProperty(y, S, T);
  } : function(y, _, E, S) {
    S === void 0 && (S = E), y[S] = _[E];
  }), n = ze && ze.__exportStar || function(y, _) {
    for (var E in y) E !== "default" && !Object.prototype.hasOwnProperty.call(_, E) && t(_, y, E);
  };
  Object.defineProperty(e, "__esModule", { value: !0 }), e.NsisUpdater = e.MacUpdater = e.RpmUpdater = e.PacmanUpdater = e.DebUpdater = e.AppImageUpdater = e.Provider = e.NoOpLogger = e.AppUpdater = e.BaseUpdater = void 0;
  const r = Qt, i = fe;
  var o = An;
  Object.defineProperty(e, "BaseUpdater", { enumerable: !0, get: function() {
    return o.BaseUpdater;
  } });
  var s = Yt;
  Object.defineProperty(e, "AppUpdater", { enumerable: !0, get: function() {
    return s.AppUpdater;
  } }), Object.defineProperty(e, "NoOpLogger", { enumerable: !0, get: function() {
    return s.NoOpLogger;
  } });
  var a = Ce;
  Object.defineProperty(e, "Provider", { enumerable: !0, get: function() {
    return a.Provider;
  } });
  var l = Dr;
  Object.defineProperty(e, "AppImageUpdater", { enumerable: !0, get: function() {
    return l.AppImageUpdater;
  } });
  var m = Nr;
  Object.defineProperty(e, "DebUpdater", { enumerable: !0, get: function() {
    return m.DebUpdater;
  } });
  var c = Or;
  Object.defineProperty(e, "PacmanUpdater", { enumerable: !0, get: function() {
    return c.PacmanUpdater;
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
  } }), n(en, e);
  let p;
  function f() {
    if (process.platform === "win32")
      p = new $r.NsisUpdater();
    else if (process.platform === "darwin")
      p = new Rr.MacUpdater();
    else {
      p = new Dr.AppImageUpdater();
      try {
        const y = i.join(process.resourcesPath, "package-type");
        if (!(0, r.existsSync)(y))
          return p;
        switch ((0, r.readFileSync)(y).toString().trim()) {
          case "deb":
            p = new Nr.DebUpdater();
            break;
          case "rpm":
            p = new br.RpmUpdater();
            break;
          case "pacman":
            p = new Or.PacmanUpdater();
            break;
          default:
            break;
        }
      } catch (y) {
        console.warn("Unable to detect 'package-type' for autoUpdater (rpm/deb/pacman support). If you'd like to expand support, please consider contributing to electron-builder", y.message);
      }
    }
    return p;
  }
  Object.defineProperty(e, "autoUpdater", {
    enumerable: !0,
    get: () => p || f()
  });
})(je);
var tr = { exports: {} }, yd = {
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
const y1 = xt, ae = fe, Fc = yd, da = Vr, w1 = typeof process == "object" && process.platform === "win32", Uc = (e) => typeof e == "object" && e !== null, wd = new Uint32Array(256).map((e, t) => {
  for (let n = 0; n < 8; n++)
    t & 1 ? t = 3988292384 ^ t >>> 1 : t >>>= 1;
  return t >>> 0;
});
function he(e) {
  this.sep = ae.sep, this.fs = y1, Uc(e) && Uc(e.fs) && typeof e.fs.statSync == "function" && (this.fs = e.fs);
}
var _1 = he;
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
        if (s && s.isFile()) throw da.FILE_IN_THE_WAY(`"${i}"`);
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
      var m = ae.dirname(e);
      o.fs.exists(m, function(c) {
        if (!c)
          try {
            o.makeDir(m);
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
            o.fs.open(e, "w", 438, function(p, f) {
              if (p || !f) return i(!1);
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
    if (l.isSymbolicLink()) throw da.FILE_IN_THE_WAY(`"${s}"`);
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
  function o(s, a, l, m) {
    let c = [];
    return t.fs.readdirSync(s).forEach(function(u) {
      const h = ae.join(s, u);
      if (i(h)) return;
      const w = t.fs.statSync(h);
      if (c.push(ae.normalize(h) + (w.isDirectory() ? t.sep : "")), w.isDirectory() && l) {
        const p = t.fs.realpathSync(h);
        m.has(p) || (m.add(p), c = c.concat(o(h, a, l, m)));
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
    n.fs.lstat(c, function(h, w) {
      if (h) return u(h);
      if (!w || !w.isSymbolicLink()) return u(null, !1);
      n.fs.realpath(c, function(p, f) {
        if (p) return u(null, !0);
        u(null, !(f === a || f.startsWith(a + ae.sep)));
      });
    });
  }, m = function(c, u, h) {
    n.fs.readdir(c, function(w, p) {
      if (w) return h(w);
      let f = p.length;
      if (!f) return h();
      p.forEach(function(y) {
        const _ = ae.join(c, y);
        l(_, function(E, S) {
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
              u.add(j), m(_, u, function(B) {
                if (B) return h(B);
                --f || h();
              });
            });
          });
        });
      });
    });
  };
  n.fs.realpath(e, function(c, u) {
    if (c) return o(c);
    a = u, m(e, /* @__PURE__ */ new Set([u]), o);
  });
};
he.prototype.getAttributes = function() {
};
he.prototype.setAttributes = function() {
};
he.crc32update = function(e, t) {
  return wd[(e ^ t) & 255] ^ e >>> 8;
};
he.crc32 = function(e) {
  typeof e == "string" && (e = Buffer.from(e, "utf8"));
  let t = e.length, n = -1;
  for (let r = 0; r < t; ) n = he.crc32update(n, e[r++]);
  return ~n >>> 0;
};
he.methodToString = function(e) {
  switch (e) {
    case Fc.STORED:
      return "STORED (" + e + ")";
    case Fc.DEFLATED:
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
    throw da.ZIP64_VALUE_TOO_LARGE();
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
he.isWin = w1;
he.crcTable = wd;
const v1 = fe;
var S1 = function(e, { fs: t }) {
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
  return n && t.existsSync(n) ? (i = t.statSync(n), r.directory = i.isDirectory(), r.mtime = i.mtime, r.atime = i.atime, r.executable = (73 & i.mode) !== 0, r.readonly = (128 & i.mode) === 0, r.hidden = v1.basename(n)[0] === ".") : console.warn("Invalid path: " + n), {
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
}, A1 = {
  efs: !0,
  encode: (e) => Buffer.from(e, "utf8"),
  decode: (e) => e.toString("utf8")
};
tr.exports = _1;
tr.exports.Constants = yd;
tr.exports.Errors = Vr;
tr.exports.FileAttr = S1;
tr.exports.decoder = A1;
var Wr = tr.exports, uo = {}, bt = Wr, q = bt.Constants, T1 = function() {
  var e = 20, t = 10, n = 0, r = 0, i = 0, o = 0, s = 0, a = 0, l = 0, m = 0, c = 0, u = 0, h = 0, w = 0, p = 0;
  e |= bt.isWin ? 2560 : 768, n |= q.FLG_EFS;
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
      return (n & q.FLG_EFS) > 0;
    },
    set flags_efs(E) {
      E ? n |= q.FLG_EFS : n &= ~q.FLG_EFS;
    },
    get flags_desc() {
      return (n & q.FLG_DESC) > 0;
    },
    set flags_desc(E) {
      E ? n |= q.FLG_DESC : n &= ~q.FLG_DESC;
    },
    get method() {
      return r;
    },
    set method(E) {
      switch (E) {
        case q.STORED:
          this.version = 10;
          break;
        case q.DEFLATED:
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
      return l;
    },
    set fileNameLength(E) {
      l = E;
    },
    get extraLength() {
      return m;
    },
    set extraLength(E) {
      m = E;
    },
    get extraLocalLength() {
      return f.extraLen;
    },
    set extraLocalLength(E) {
      f.extraLen = E;
    },
    get commentLength() {
      return c;
    },
    set commentLength(E) {
      c = E;
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
      return p;
    },
    set offset(E) {
      p = y(E);
    },
    get encrypted() {
      return (n & q.FLG_ENC) === q.FLG_ENC;
    },
    get centralHeaderSize() {
      return q.CENHDR + l + m + c;
    },
    get realDataOffset() {
      return p + q.LOCHDR + f.fnameLen + f.extraLen;
    },
    get localHeader() {
      return f;
    },
    loadLocalHeaderFromBinary: function(E) {
      if (p < 0 || p + q.LOCHDR > E.length)
        throw bt.Errors.INVALID_LOC();
      var S = E.slice(p, p + q.LOCHDR);
      if (S.readUInt32LE(0) !== q.LOCSIG)
        throw bt.Errors.INVALID_LOC();
      f.version = S.readUInt16LE(q.LOCVER), f.flags = S.readUInt16LE(q.LOCFLG), f.flags_desc = (f.flags & q.FLG_DESC) > 0, f.method = S.readUInt16LE(q.LOCHOW), f.time = S.readUInt32LE(q.LOCTIM), f.crc = S.readUInt32LE(q.LOCCRC), f.compressedSize = S.readUInt32LE(q.LOCSIZ), f.size = S.readUInt32LE(q.LOCLEN), f.fnameLen = S.readUInt16LE(q.LOCNAM), f.extraLen = S.readUInt16LE(q.LOCEXT);
      const T = p + q.LOCHDR + f.fnameLen, R = T + f.extraLen;
      return E.slice(T, R);
    },
    loadFromBinary: function(E) {
      if (E.length !== q.CENHDR || E.readUInt32LE(0) !== q.CENSIG)
        throw bt.Errors.INVALID_CEN();
      e = E.readUInt16LE(q.CENVEM), t = E.readUInt16LE(q.CENVER), n = E.readUInt16LE(q.CENFLG), r = E.readUInt16LE(q.CENHOW), i = E.readUInt32LE(q.CENTIM), o = E.readUInt32LE(q.CENCRC), s = E.readUInt32LE(q.CENSIZ), a = E.readUInt32LE(q.CENLEN), l = E.readUInt16LE(q.CENNAM), m = E.readUInt16LE(q.CENEXT), c = E.readUInt16LE(q.CENCOM), u = E.readUInt16LE(q.CENDSK), h = E.readUInt16LE(q.CENATT), w = E.readUInt32LE(q.CENATX), p = E.readUInt32LE(q.CENOFF);
    },
    localHeaderToBinary: function() {
      var E = Buffer.alloc(q.LOCHDR);
      return E.writeUInt32LE(q.LOCSIG, 0), E.writeUInt16LE(t, q.LOCVER), E.writeUInt16LE(n & ~q.FLG_DESC, q.LOCFLG), E.writeUInt16LE(r, q.LOCHOW), E.writeUInt32LE(i, q.LOCTIM), E.writeUInt32LE(o, q.LOCCRC), E.writeUInt32LE(s, q.LOCSIZ), E.writeUInt32LE(a, q.LOCLEN), E.writeUInt16LE(l, q.LOCNAM), E.writeUInt16LE(f.extraLen, q.LOCEXT), E;
    },
    centralHeaderToBinary: function() {
      var E = Buffer.alloc(q.CENHDR + l + m + c);
      return E.writeUInt32LE(q.CENSIG, 0), E.writeUInt16LE(e, q.CENVEM), E.writeUInt16LE(t, q.CENVER), E.writeUInt16LE(n & ~q.FLG_DESC, q.CENFLG), E.writeUInt16LE(r, q.CENHOW), E.writeUInt32LE(i, q.CENTIM), E.writeUInt32LE(o, q.CENCRC), E.writeUInt32LE(s, q.CENSIZ), E.writeUInt32LE(a, q.CENLEN), E.writeUInt16LE(l, q.CENNAM), E.writeUInt16LE(m, q.CENEXT), E.writeUInt16LE(c, q.CENCOM), E.writeUInt16LE(u, q.CENDSK), E.writeUInt16LE(h, q.CENATT), E.writeUInt32LE(w, q.CENATX), E.writeUInt32LE(p, q.CENOFF), E;
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
        fileNameLength: E(l),
        extraLength: E(m),
        commentLength: E(c),
        diskNumStart: u,
        inAttr: h,
        attr: w,
        offset: p,
        centralHeaderSize: E(q.CENHDR + l + m + c)
      };
    },
    toString: function() {
      return JSON.stringify(this.toJSON(), null, "	");
    }
  };
}, at = Wr, Z = at.Constants, I1 = function() {
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
        let m = a.toString(16).toUpperCase();
        for (; m.length < l; ) m = "0" + m;
        return "0x" + m;
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
uo.EntryHeader = T1;
uo.MainHeader = I1;
var fo = {}, C1 = function(e) {
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
        var a = Buffer.alloc(s), l = 0;
        a.fill(0);
        for (var m = 0; m < o.length; m++) {
          var c = o[m];
          c.copy(a, l), l += c.length;
        }
        r && r(a);
      }), i.end(e);
    }
  };
}, Vc;
const D1 = +(((Vc = process == null ? void 0 : process.versions) == null ? void 0 : Vc.node) ?? "").split(".")[0] || 0, N1 = Vr;
var O1 = function(e, t) {
  var n = Bi;
  const r = t > 0 ? t : 1, i = D1 >= 15 ? { maxOutputLength: r } : {};
  return {
    inflate: function() {
      return n.inflateRawSync(e, i);
    },
    inflateAsync: function(o) {
      var s = n.createInflateRaw(i), a = [], l = 0, m = !1;
      const c = function(u) {
        m || (m = !0, s.destroy(), o && o(Buffer.alloc(0), u));
      };
      s.on("error", function(u) {
        c(u);
      }), s.on("data", function(u) {
        if (!m) {
          if (l += u.length, l > r)
            return c(N1.MAX_OUTPUT_EXCEEDED());
          a.push(u);
        }
      }), s.on("end", function() {
        if (!m) {
          m = !0;
          var u = Buffer.alloc(l), h = 0;
          u.fill(0);
          for (var w = 0; w < a.length; w++) {
            var p = a[w];
            p.copy(u, h), h += p.length;
          }
          o && o(u);
        }
      }), s.end(e);
    }
  };
};
const { randomFillSync: kc } = Xn, b1 = Vr, R1 = new Uint32Array(256).map((e, t) => {
  for (let n = 0; n < 8; n++)
    t & 1 ? t = t >>> 1 ^ 3988292384 : t >>>= 1;
  return t >>> 0;
}), _d = (e, t) => Math.imul(e, t) >>> 0, Mc = (e, t) => R1[(e ^ t) & 255] ^ e >>> 8, Lr = () => typeof kc == "function" ? kc(Buffer.alloc(12)) : Lr.node();
Lr.node = () => {
  const e = Buffer.alloc(12), t = e.length;
  for (let n = 0; n < t; n++) e[n] = Math.random() * 256 & 255;
  return e;
};
const Ti = {
  genSalt: Lr
};
function ho(e) {
  const t = Buffer.isBuffer(e) ? e : Buffer.from(e);
  this.keys = new Uint32Array([305419896, 591751049, 878082192]);
  for (let n = 0; n < t.length; n++)
    this.updateKeys(t[n]);
}
ho.prototype.updateKeys = function(e) {
  const t = this.keys;
  return t[0] = Mc(t[0], e), t[1] += t[0] & 255, t[1] = _d(t[1], 134775813) + 1, t[2] = Mc(t[2], t[1] >>> 24), e;
};
ho.prototype.next = function() {
  const e = (this.keys[2] | 2) >>> 0;
  return _d(e, e ^ 1) >> 8 & 255;
};
function $1(e) {
  const t = new ho(e);
  return function(n) {
    const r = Buffer.alloc(n.length);
    let i = 0;
    for (let o of n)
      r[i++] = t.updateKeys(o ^ t.next());
    return r;
  };
}
function L1(e) {
  const t = new ho(e);
  return function(n, r, i = 0) {
    r || (r = Buffer.alloc(n.length));
    for (let o of n) {
      const s = t.next();
      r[i++] = o ^ s, t.updateKeys(o);
    }
    return r;
  };
}
function x1(e, t, n) {
  if (!e || !Buffer.isBuffer(e) || e.length < 12)
    return Buffer.alloc(0);
  const r = $1(n), i = r(e.slice(0, 12)), o = (t.flags & 8) === 8 ? t.timeHighByte : t.crc >>> 24;
  if (i[11] !== o)
    throw b1.WRONG_PASSWORD();
  return r(e.slice(12));
}
function P1(e) {
  Buffer.isBuffer(e) && e.length >= 12 ? Ti.genSalt = function() {
    return e.slice(0, 12);
  } : e === "node" ? Ti.genSalt = Lr.node : Ti.genSalt = Lr;
}
function F1(e, t, n, r = !1) {
  e == null && (e = Buffer.alloc(0)), Buffer.isBuffer(e) || (e = Buffer.from(e.toString()));
  const i = L1(n), o = Ti.genSalt();
  o[11] = t.crc >>> 24 & 255, r && (o[10] = t.crc >>> 16 & 255);
  const s = Buffer.alloc(e.length + 12);
  return i(o, s), i(e, s, 12);
}
var U1 = { decrypt: x1, encrypt: F1, _salter: P1 };
fo.Deflater = C1;
fo.Inflater = O1;
fo.ZipCrypto = U1;
var ce = Wr, k1 = uo, nt = ce.Constants, is = fo, vd = function(e, t) {
  var n = new k1.EntryHeader(), r = Buffer.alloc(0), i = Buffer.alloc(0), o = !1, s = null, a = Buffer.alloc(0), l = Buffer.alloc(0), m = !0;
  const c = e, u = typeof c.decoder == "object" ? c.decoder : ce.decoder;
  m = u.hasOwnProperty("efs") ? u.efs : !1;
  function h() {
    if (!t || !(t instanceof Uint8Array))
      return Buffer.alloc(0);
    l = n.loadLocalHeaderFromBinary(t);
    const S = n.realDataOffset, T = S + n.compressedSize;
    if (S < 0 || T < S || T > t.length)
      throw ce.Errors.INVALID_LOC();
    return t.slice(S, T);
  }
  function w(S) {
    const T = n.flags_desc || n.localHeader.flags_desc ? n.crc : n.localHeader.crc;
    return ce.crc32(S) === T;
  }
  function p(S, T, R) {
    if (typeof T > "u" && typeof S == "string" && (R = S, S = void 0), o)
      return S && T && T(Buffer.alloc(0), ce.Errors.DIRECTORY_CONTENT_ERROR()), Buffer.alloc(0);
    var O;
    try {
      if (O = h(), O.length === 0)
        return S && T && T(O), O;
      if (n.encrypted) {
        if (typeof R != "string" && !Buffer.isBuffer(R))
          throw ce.Errors.INVALID_PASS_PARAM();
        O = is.ZipCrypto.decrypt(O, n, R);
      }
    } catch (x) {
      if (S && T)
        return T(Buffer.alloc(0), x), Buffer.alloc(0);
      throw x;
    }
    var j;
    switch (n.method) {
      case ce.Constants.STORED:
        if (j = Buffer.alloc(O.length), O.copy(j), w(j))
          return S && T && T(j), j;
        throw S && T && T(j, ce.Errors.BAD_CRC()), ce.Errors.BAD_CRC();
      case ce.Constants.DEFLATED:
        var B = new is.Inflater(O, n.size);
        if (S)
          B.inflateAsync(function(x, A) {
            T && (A ? T(Buffer.alloc(0), A) : w(x) ? T(x) : T(x, ce.Errors.BAD_CRC()));
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
          var O = new is.Deflater(s);
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
        R = S.readUInt16LE(T), T += 2, O = S.readUInt16LE(T), T += 2, j = S.slice(T, T + O), T += O, nt.ID_ZIP64 === R && E(j);
    } catch {
      throw ce.Errors.EXTRA_FIELD_PARSE_ERROR();
    }
  }
  function E(S) {
    var T, R, O, j;
    S.length >= nt.EF_ZIP64_SCOMP && (T = y(S, nt.EF_ZIP64_SUNCOMP), n.size === nt.EF_ZIP64_OR_32 && (n.size = T)), S.length >= nt.EF_ZIP64_RHO && (R = y(S, nt.EF_ZIP64_SCOMP), n.compressedSize === nt.EF_ZIP64_OR_32 && (n.compressedSize = R)), S.length >= nt.EF_ZIP64_DSN && (O = y(S, nt.EF_ZIP64_RHO), n.offset === nt.EF_ZIP64_OR_32 && (n.offset = O)), S.length >= nt.EF_ZIP64_DSN + 4 && (j = S.readUInt32LE(nt.EF_ZIP64_DSN), n.diskNumStart === nt.EF_ZIP64_OR_16 && (n.diskNumStart = j));
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
      return typeof m == "function" ? m(this.entryName) : m;
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
      return n.changed ? s : p(!1, null, S);
    },
    getDataAsync: function(S, T) {
      n.changed ? S(s) : p(!0, S, T);
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
      n.flags_efs = this.efs, n.extraLocalLength = l.length;
      const T = n.localHeaderToBinary(), R = Buffer.alloc(T.length + r.length + n.extraLocalLength);
      return T.copy(R, S), S += T.length, r.copy(R, S), S += r.length, l.copy(R, S), S += l.length, R;
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
const Bc = vd, M1 = uo, Be = Wr;
var B1 = function(e, t) {
  var n = [], r = /* @__PURE__ */ Object.create(null), i = Buffer.alloc(0), o = new M1.MainHeader(), s = !1;
  const a = /* @__PURE__ */ new Set(), l = t, { noSort: m, decoder: c } = l;
  e ? w(l.readEntries) : s = !0;
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
        const _ = new Bc(l);
        _.entryName = y, _.attr = 16, _.temporary = !0, n.push(_), r[_.entryName] = _, a.add(_);
      }
  }
  function h() {
    if (s = !0, r = /* @__PURE__ */ Object.create(null), o.diskEntries > (e.length - o.offset) / Be.Constants.CENHDR)
      throw Be.Errors.DISK_ENTRY_TOO_LARGE();
    n = new Array(o.diskEntries);
    for (var f = o.offset, y = 0; y < n.length; y++) {
      var _ = f, E = new Bc(l, e);
      if (E.header = e.slice(_, _ += Be.Constants.CENHDR), E.entryName = e.slice(_, _ += E.header.fileNameLength), E.header.extraLength && (E.extra = e.slice(_, _ += E.header.extraLength)), E.header.commentLength && (E.comment = e.slice(_, _ + E.header.commentLength)), f += E.header.centralHeaderSize, E.entryName in r)
        throw Be.Errors.DUPLICATE_ENTRY(`"${E.entryName}"`);
      n[y] = E, r[E.entryName] = E;
    }
    a.clear(), u();
  }
  function w(f) {
    var y = e.length - Be.Constants.ENDHDR, _ = Math.max(0, y - 65535), E = _, S = e.length, T = -1, R = 0;
    for ((typeof l.trailingSpace == "boolean" ? l.trailingSpace : !1) && (_ = 0), y; y >= E; y--)
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
  function p() {
    n.length > 1 && !m && (n = n.map((f) => ({ entry: f, key: f.entryName.toLowerCase() })).sort((f, y) => f.key.localeCompare(y.key)).map((f) => f.entry));
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
      s || h(), p();
      const f = [], y = [];
      let _ = 0, E = 0;
      o.size = 0, o.offset = 0;
      let S = 0;
      for (const O of this.entries) {
        const j = O.getCompressedData();
        O.header.offset = E;
        const B = O.packLocalHeader(), x = B.length + j.length;
        E += x, f.push(B), f.push(j);
        const A = O.packCentralHeader();
        y.push(A), o.size += A.length, _ += x + A.length, S++;
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
        s || h(), p();
        const S = [], T = [];
        let R = 0, O = 0, j = 0;
        o.size = 0, o.offset = 0;
        const B = function(x) {
          if (x.length > 0) {
            const A = x.shift(), W = A.entryName + A.extra.toString();
            _ && _(W), A.getCompressedDataAsync(function(K) {
              E && E(W), A.header.offset = O;
              const te = A.packLocalHeader(), F = te.length + K.length;
              O += F, S.push(te), S.push(K);
              const b = A.packCentralHeader();
              T.push(b), o.size += b.length, R += F + b.length, j++, B(x);
            });
          } else {
            R += o.mainHeaderSize, o.offset = O, o.totalEntries = j, O = 0;
            const A = Buffer.alloc(R);
            S.forEach(function(K) {
              K.copy(A, O), O += K.length;
            }), T.forEach(function(K) {
              K.copy(A, O), O += K.length;
            });
            const W = o.toBinary();
            i && i.copy(W, W.length - i.length), W.copy(A, O), e = A, s = !1, f(A);
          }
        };
        B(Array.from(this.entries));
      } catch (S) {
        y(S);
      }
    }
  };
};
const ve = Wr, we = fe, j1 = vd, H1 = B1, ln = (...e) => ve.findLast(e, (t) => typeof t == "boolean"), jc = (...e) => ve.findLast(e, (t) => typeof t == "string"), G1 = (...e) => ve.findLast(e, (t) => typeof t == "function"), q1 = {
  // option "noSort" : if true it disables files sorting
  noSort: !1,
  // read entries during load (initial loading may be slower)
  readEntries: !1,
  // default method is none
  method: ve.Constants.NONE,
  // file system
  fs: null
};
var z1 = function(e, t) {
  let n = null;
  const r = Object.assign(/* @__PURE__ */ Object.create(null), q1);
  e && typeof e == "object" && (e instanceof Uint8Array || (Object.assign(r, e), e = r.input ? r.input : void 0, r.input && delete r.input), Buffer.isBuffer(e) && (n = e, r.method = ve.Constants.BUFFER, e = void 0)), Object.assign(r, t);
  const i = new ve(r), o = (p) => {
    p.filter((f) => f.attr).sort((f, y) => y.path.length - f.path.length).forEach((f) => i.fs.chmodSync(f.path, f.attr));
  };
  if ((typeof r.decoder != "object" || typeof r.decoder.encode != "function" || typeof r.decoder.decode != "function") && (r.decoder = ve.decoder), e && typeof e == "string")
    if (i.fs.existsSync(e))
      r.method = ve.Constants.FILE, r.filename = e, n = i.fs.readFileSync(e);
    else
      throw ve.Errors.INVALID_FILENAME();
  const s = new H1(n, r), { canonical: a, sanitize: l, zipnamefix: m } = ve;
  function c(p) {
    if (p && s) {
      var f;
      if (typeof p == "string" && (f = s.getEntry(we.posix.normalize(p))), typeof p == "object" && typeof p.entryName < "u" && typeof p.header < "u" && (f = s.getEntry(p.entryName)), f)
        return f;
    }
    return null;
  }
  function u(p) {
    const { join: f, normalize: y, sep: _ } = we.posix;
    return f(we.isAbsolute(p) ? "/" : ".", y(_ + p.split("\\").join(_) + _));
  }
  function h(p) {
    return p instanceof RegExp ? /* @__PURE__ */ function(f) {
      return function(y) {
        return f.test(y);
      };
    }(p) : typeof p != "function" ? () => !0 : p;
  }
  const w = (p, f) => {
    let y = f.slice(-1);
    return y = y === i.sep ? i.sep : "", we.relative(p, f) + y;
  };
  return {
    /**
     * Extracts the given entry from the archive and returns the content as a Buffer object
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @param {Buffer|string} [pass] - password
     * @return Buffer or Null in case of error
     */
    readFile: function(p, f) {
      var y = c(p);
      return y && y.getData(f) || null;
    },
    /**
     * Returns how many child elements has on entry (directories) on files it is always 0
     * @param {ZipEntry|string} entry ZipEntry object or String with the full path of the entry
     * @returns {integer}
     */
    childCount: function(p) {
      const f = c(p);
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
    readFileAsync: function(p, f) {
      var y = c(p);
      y ? y.getDataAsync(f) : f(null, "getEntry failed for:" + p);
    },
    /**
     * Extracts the given entry from the archive and returns the content as plain text in the given encoding
     * @param {ZipEntry|string} entry - ZipEntry object or String with the full path of the entry
     * @param {string} encoding - Optional. If no encoding is specified utf8 is used
     *
     * @return String
     */
    readAsText: function(p, f) {
      var y = c(p);
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
    readAsTextAsync: function(p, f, y) {
      var _ = c(p);
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
    deleteFile: function(p, f = !0) {
      var y = c(p);
      y && s.deleteFile(y.entryName, f);
    },
    /**
     * Remove the entry from the file or directory without affecting any nested entries
     *
     * @param {ZipEntry|string} entry
     * @returns {void}
     */
    deleteEntry: function(p) {
      var f = c(p);
      f && s.deleteEntry(f.entryName);
    },
    /**
     * Adds a comment to the zip. The zip must be rewritten after adding the comment.
     *
     * @param {string} comment
     */
    addZipComment: function(p) {
      s.comment = p;
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
    addZipEntryComment: function(p, f) {
      var y = c(p);
      y && (y.comment = f);
    },
    /**
     * Returns the comment of the specified entry
     *
     * @param {ZipEntry} entry
     * @return String
     */
    getZipEntryComment: function(p) {
      var f = c(p);
      return f && f.comment || "";
    },
    /**
     * Updates the content of an existing entry inside the archive. The zip must be rewritten after updating the content
     *
     * @param {ZipEntry} entry
     * @param {Buffer} content
     */
    updateFile: function(p, f) {
      var y = c(p);
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
    addLocalFile: function(p, f, y, _) {
      if (i.fs.existsSync(p)) {
        f = f ? u(f) : "";
        const E = we.win32.basename(we.win32.normalize(p));
        f += y || E;
        const S = i.fs.statSync(p), T = S.isFile() ? i.fs.readFileSync(p) : Buffer.alloc(0);
        S.isDirectory() && (f += i.sep), this.addFile(f, T, _, S);
      } else
        throw ve.Errors.FILE_NOT_FOUND(p);
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
    addLocalFileAsync: function(p, f) {
      p = typeof p == "object" ? p : { localPath: p };
      const y = we.resolve(p.localPath), { comment: _ } = p;
      let { zipPath: E, zipName: S } = p;
      const T = this;
      i.fs.stat(y, function(R, O) {
        if (R) return f(R, !1);
        E = E ? u(E) : "";
        const j = we.win32.basename(we.win32.normalize(y));
        if (E += S || j, O.isFile())
          i.fs.readFile(y, function(B, x) {
            return B ? f(B, !1) : (T.addFile(E, x, _, O), setImmediate(f, void 0, !0));
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
    addLocalFolder: function(p, f, y) {
      if (y = h(y), f = f ? u(f) : "", p = we.normalize(p), i.fs.existsSync(p)) {
        const _ = i.findFiles(p), E = this;
        if (_.length)
          for (const S of _) {
            const T = we.join(f, w(p, S));
            y(T) && E.addLocalFile(S, we.dirname(T));
          }
      } else
        throw ve.Errors.FILE_NOT_FOUND(p);
    },
    /**
     * Asynchronous addLocalFolder
     * @param {string} localPath
     * @param {callback} callback
     * @param {string} [zipPath] optional path inside zip
     * @param {RegExp|function} [filter] optional RegExp or Function if files match will
     *               be included.
     */
    addLocalFolderAsync: function(p, f, y, _) {
      _ = h(_), y = y ? u(y) : "", p = we.normalize(p);
      var E = this;
      i.fs.open(p, "r", function(S) {
        if (S && S.code === "ENOENT")
          f(void 0, ve.Errors.FILE_NOT_FOUND(p));
        else if (S)
          f(void 0, S);
        else {
          var T = i.findFiles(p), R = -1, O = function() {
            if (R += 1, R < T.length) {
              var j = T[R], B = w(p, j).split("\\").join("/");
              B = B.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, ""), _(B) ? i.fs.stat(j, function(x, A) {
                x && f(void 0, x), A.isFile() ? i.fs.readFile(j, function(W, K) {
                  W ? f(void 0, W) : (E.addFile(y + B, K, "", A), O());
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
    addLocalFolderAsync2: function(p, f) {
      const y = this;
      p = typeof p == "object" ? p : { localPath: p };
      const _ = we.resolve(p.localPath);
      let { zipPath: E, filter: S, namefix: T } = p;
      S instanceof RegExp ? S = /* @__PURE__ */ function(j) {
        return function(B) {
          return j.test(B);
        };
      }(S) : typeof S != "function" && (S = function() {
        return !0;
      }), E = E ? u(E) : "", T === "latin1" && (T = (j) => j.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^\x20-\x7E]/g, "")), typeof T != "function" && (T = (j) => j);
      const R = (j) => we.join(E, T(w(_, j))), O = (j) => we.win32.basename(we.win32.normalize(T(j)));
      i.fs.open(_, "r", function(j) {
        j && j.code === "ENOENT" ? f(ve.Errors.FILE_NOT_FOUND(_), !1) : j ? f(j, !1) : i.findFilesAsync(_, function(B, x) {
          if (B) return f(B, !1);
          if (x = x.filter((A) => S(R(A))), !x.length) return f(void 0, !0);
          setImmediate(
            x.reverse().reduce(function(A, W) {
              return function(K, te) {
                if (K || te === !1) return setImmediate(A, K, !1);
                y.addLocalFileAsync(
                  {
                    localPath: W,
                    zipPath: we.dirname(R(W)),
                    zipName: O(W)
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
    addLocalFolderPromise: function(p, f) {
      return new Promise((y, _) => {
        this.addLocalFolderAsync2(Object.assign({ localPath: p }, f), (E, S) => {
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
    addFile: function(p, f, y, _) {
      p = m(p);
      let E = c(p);
      const S = E != null;
      S || (E = new j1(r), E.entryName = p), E.comment = y || "";
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
    getEntries: function(p) {
      return s.password = p, s ? s.entries : [];
    },
    /**
     * Returns a ZipEntry object representing the file or folder specified by ``name``.
     *
     * @param {string} name
     * @return ZipEntry
     */
    getEntry: function(p) {
      return c(p);
    },
    getEntryCount: function() {
      return s.getEntryCount();
    },
    forEach: function(p) {
      return s.forEach(p);
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
    extractEntryTo: function(p, f, y, _, E, S) {
      _ = ln(!1, _), E = ln(!1, E), y = ln(!0, y), S = jc(E, S);
      var T = c(p);
      if (!T)
        throw ve.Errors.NO_ENTRY();
      var R = a(T.entryName), O = l(f, S && !T.isDirectory ? a(S) : y ? R : we.basename(R));
      if (T.isDirectory) {
        var j = s.getEntryChildren(T);
        return j.forEach(function(A) {
          if (A.isDirectory) return;
          var W = A.getData();
          if (!W)
            throw ve.Errors.CANT_EXTRACT_FILE();
          var K = a(y ? A.entryName : A.entryName.substring(T.entryName.length)), te = l(f, K);
          i.assertPathSafe(f, te);
          const F = E ? A.header.fileAttr : void 0;
          i.writeFileTo(te, W, _, F);
        }), !0;
      }
      var B = T.getData(s.password);
      if (!B) throw ve.Errors.CANT_EXTRACT_FILE();
      if (i.assertPathSafe(f, O), i.fs.existsSync(O) && !_)
        throw ve.Errors.CANT_OVERRIDE();
      const x = E ? p.header.fileAttr : void 0;
      return i.writeFileTo(O, B, _, x), !0;
    },
    /**
     * Test the archive
     * @param {string} [pass]
     */
    test: function(p) {
      if (!s)
        return !1;
      for (var f of s.entries)
        try {
          if (f.isDirectory)
            continue;
          var y = f.getData(p);
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
    extractAllTo: function(p, f, y, _) {
      if (y = ln(!1, y), _ = jc(y, _), f = ln(!1, f), !s) throw ve.Errors.NO_ZIP();
      const E = [];
      s.entries.forEach(function(S) {
        var T = l(p, a(S.entryName));
        if (i.assertPathSafe(p, T), S.isDirectory) {
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
    extractAllToAsync: function(p, f, y, _) {
      if (_ = G1(f, y, _), y = ln(!1, y), f = ln(!1, f), !_)
        return new Promise((B, x) => {
          this.extractAllToAsync(p, f, y, function(A) {
            A ? x(A) : B(this);
          });
        });
      if (!s) {
        _(ve.Errors.NO_ZIP());
        return;
      }
      p = we.resolve(p);
      const E = (B) => l(p, we.normalize(a(B.entryName))), S = (B, x) => new Error(B + ': "' + x + '"'), T = [], R = [];
      s.entries.forEach((B) => {
        B.isDirectory ? T.push(B) : R.push(B);
      });
      const O = [];
      for (const B of T) {
        const x = E(B), A = y ? B.header.fileAttr : void 0;
        try {
          i.assertPathSafe(p, x), i.makeDir(x);
        } catch {
          _(S("Unable to create folder", x));
          continue;
        }
        A && O.push({ path: x, attr: A });
        try {
          i.fs.utimesSync(x, B.header.time, B.header.time);
        } catch {
        }
      }
      const j = (B) => {
        if (!B)
          try {
            o(O);
          } catch (x) {
            return _(S("Unable to set folder permissions", x.path || ""));
          }
        _(B);
      };
      R.reverse().reduce(function(B, x) {
        return function(A) {
          if (A)
            B(A);
          else {
            const W = we.normalize(a(x.entryName)), K = l(p, W);
            try {
              i.assertPathSafe(p, K);
            } catch (te) {
              return B(te);
            }
            x.getDataAsync(function(te, F) {
              if (F)
                B(F);
              else if (!te)
                B(ve.Errors.CANT_EXTRACT_FILE());
              else {
                const b = y ? x.header.fileAttr : void 0;
                i.writeFileToAsync(K, te, f, b, function(k) {
                  if (!k)
                    return B(S("Unable to write file", K));
                  i.fs.utimes(K, x.header.time, x.header.time, function() {
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
    writeZip: function(p, f) {
      if (arguments.length === 1 && typeof p == "function" && (f = p, p = ""), !p && r.filename && (p = r.filename), !!p) {
        var y = s.compressToBuffer();
        if (y) {
          var _ = i.writeFileTo(p, y, !0);
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
    writeZipPromise: function(p, f) {
      const { overwrite: y, perm: _ } = Object.assign({ overwrite: !0 }, f);
      return new Promise((E, S) => {
        !p && r.filename && (p = r.filename), p || S("ADM-ZIP: ZIP File Name Missing"), this.toBufferPromise().then((T) => {
          const R = (O) => O ? E(O) : S("ADM-ZIP: Wasn't able to write zip file");
          i.writeFileToAsync(p, T, y, _, R);
        }, S);
      });
    },
    /**
     * @returns {Promise<Buffer>} A promise to the Buffer.
     */
    toBufferPromise: function() {
      return new Promise((p, f) => {
        s.toAsyncBuffer(p, f);
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
    toBuffer: function(p, f, y, _) {
      return typeof p == "function" ? (s.toAsyncBuffer(p, f, y, _), null) : s.compressToBuffer();
    }
  };
};
const Ui = /* @__PURE__ */ xh(z1);
function Sd(e) {
  const n = e.replace(/[^0-9.].*$/, "").split(".").map((s) => parseInt(s, 10)), r = n[0], i = n[1] ?? 0, o = n[2] ?? 0;
  return r > 1 || i > 20 || i === 20 && o >= 5 ? 21 : i >= 17 ? 17 : 8;
}
const Hc = {
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
function V1(e) {
  const t = Hc[e] || Hc[17];
  return process.platform === "win32" ? t.win : process.platform === "darwin" ? process.arch === "arm64" ? t.mac_aarch64 : t.mac_x64 : t.linux_x64;
}
const Er = /* @__PURE__ */ new Map();
let mn = 0, gn = 0;
function po() {
  const e = ht.getPath("userData"), t = M.join(e, ".mine-launcher");
  return P.existsSync(t) || P.mkdirSync(t, { recursive: !0 }), t;
}
function Ad(e) {
  const t = $h.createHash("md5");
  t.update(`OfflinePlayer:${e}`);
  const n = t.digest();
  n[6] = n[6] & 15 | 48, n[8] = n[8] & 63 | 128;
  const r = n.toString("hex");
  return `${r.slice(0, 8)}-${r.slice(8, 12)}-${r.slice(12, 16)}-${r.slice(16, 20)}-${r.slice(20, 32)}`;
}
function dn(e) {
  return new Promise((t, n) => {
    (e.startsWith("https") ? Ns : Os).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (o) => {
      if (o.statusCode && o.statusCode >= 300 && o.statusCode < 400 && o.headers.location)
        return o.resume(), dn(o.headers.location).then(t).catch(n);
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
    const o = M.dirname(t);
    P.existsSync(o) || P.mkdirSync(o, { recursive: !0 });
    const s = P.createWriteStream(t);
    (e.startsWith("https") ? Ns : Os).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (m) => {
      if (m.statusCode && m.statusCode >= 300 && m.statusCode < 400 && m.headers.location)
        return s.close(), P.unlinkSync(t), St(m.headers.location, t, n).then(r).catch(i);
      if (m.statusCode !== 200)
        return s.close(), P.unlink(t, () => {
        }), m.resume(), i(new Error(`HTTP ${m.statusCode}: ${e}`));
      m.on("data", (c) => n == null ? void 0 : n(c.length)), m.pipe(s), s.on("finish", () => s.close(() => r())), s.on("error", i);
    }).on("error", (m) => {
      s.close(), P.unlink(t, () => {
      }), i(m);
    });
  });
}
function ur(e) {
  return !e.includes("..") && !M.isAbsolute(e);
}
function W1(e, t, n) {
  var s;
  const r = new Ui(e), i = M.resolve(t);
  let o = 0;
  for (const a of r.getEntries()) {
    if (a.isDirectory) continue;
    const l = a.entryName.replace(/\\/g, "/"), m = Number(((s = a.header) == null ? void 0 : s.attr) ?? 0);
    if ((m >>> 16 & 61440) === 40960 || (m & 61440) === 40960)
      throw new Error(`Архив содержит symlink: ${l}`);
    if (M.isAbsolute(l) || /^[A-Za-z]:/.test(l) || l.split("/").some((w) => w === "" || w === "." || w === ".."))
      throw new Error(`Небезопасный путь в архиве: ${l}`);
    const u = M.resolve(i, ...l.split("/")), h = M.relative(i, u);
    if (h === "" || h.startsWith("..") || M.isAbsolute(h))
      throw new Error(`Путь вне каталога распаковки: ${l}`);
    P.mkdirSync(M.dirname(u), { recursive: !0 }), P.writeFileSync(u, a.getData()), o++;
  }
  return o;
}
async function os(e, t) {
  if (P.existsSync(e))
    try {
      const n = process.platform === "win32" ? ".dll" : process.platform === "darwin" ? ".dylib" : ".so", r = new Ui(e);
      for (const i of r.getEntries()) {
        if (i.isDirectory) continue;
        const o = M.basename(i.entryName.replace(/\\/g, "/"));
        o.toLowerCase().endsWith(n) && /^[A-Za-z0-9._ -]{1,200}$/.test(o) && P.writeFileSync(M.join(t, o), i.getData());
      }
    } catch {
    }
}
let Vt = [];
function Gc(e) {
  Vt.push(e), Vt.length > 120 && (Vt = Vt.slice(-120));
}
function Y1(e) {
  const t = e.join(`
`);
  return t.match(/Unsupported class file major version (\d+)/) ? "Похоже, у вас неправильно подобрана версия Java — версия игры требует более новую Java. Откройте «Настройки» и в разделе Java проверьте, что путь ведёт к правильной JDK/JRE." : /java\.lang\.OutOfMemoryError/.test(t) ? "Игре не хватило памяти. Увеличьте «Максимальную память» в настройках лаунчера (в МБ) и попробуйте снова." : /-1073741515|0xc0000135/i.test(t) ? "Не найдены системные библиотеки Windows. Установите Microsoft Visual C++ Redistributable (x64) — это самая частая причина на чистой Windows." : /-1073741819|0xc0000005/i.test(t) ? "Крит native-кода. Чаще всего помогает обновление видеодрайвера. Если не помогло — запустите без модов и посмотрите лог." : /UnsatisfiedLinkError/i.test(t) ? "Не загрузились системные библиотеки игры (LWJGL natives). Проверьте, не блокирует ли их антивирус, и запустите снова — недостающие файлы скачаются заново." : /No space left|disk full|ENOSPC/i.test(t) ? "Закончилось место на диске. Освободите его и попробуйте снова." : /Failed to (download|fetch)|Could not (download|fetch)|assets/i.test(t) && /asset|resources/i.test(t) ? "Не удалось скачать игровые ресурсы (assets) — часто это сетевая блокировка CDN Mojang у провайдера. Попробуйте другое подключение или VPN и запустите снова." : /Could not create the Java Virtual Machine|Invalid or corrupt jarfile| unrecognized/.test(t) ? "Проверьте аргументы JVM в настройках лаунчера — Java не смогла запуститься с текущими параметрами." : /GLFW error|OpenGL|gpu|DirectX/i.test(t) && /error|fail/i.test(t) ? "Похоже, проблема с видеодрайвером/OpenGL. Обновите драйвер видеокарты." : /Incompatible.fml.mod|Fabric loader|Quilt loading/i.test(t) ? "Похоже, один из модов несовместим с этой версией или загрузчиком. Откройте вкладку «Моды» и отключите их по одному." : /Mixin apply failed|MixinTransformer/i.test(t) ? "Ошибка в моде (Mixin). Отключите свежеустановленные моды во вкладке «Моды»." : /The game crashed.*Calling event|Exception in thread "main"/.test(t) ? "Игра упала при старте. Попробуйте без модов или откройте папку сборки и покажите лог на форуме." : "Смотрите вкладку «Логи» для подробностей.";
}
function X1(e, t = process.platform === "win32" ? "windows" : process.platform === "darwin" ? "osx" : "linux") {
  if (!e || e.length === 0) return !0;
  let n = !1;
  for (const r of e)
    (!r.os || r.os.name === t) && (n = r.action === "allow");
  return n;
}
async function Td() {
  const e = [], t = process.platform === "win32", n = t ? "javaw.exe" : "java", r = po(), i = (o, s = 0) => {
    if (!P.existsSync(o) || s > 6) return null;
    try {
      const a = P.readdirSync(o);
      for (const l of a) {
        const m = M.join(o, l);
        if (l.toLowerCase() === n.toLowerCase()) return m;
        try {
          if (P.statSync(m).isDirectory()) {
            const c = i(m, s + 1);
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
    const s = i(M.join(r, "java", `java-${o}`));
    s && e.push(s);
  }
  if (process.env.JAVA_HOME) {
    const o = M.join(process.env.JAVA_HOME, "bin", n);
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
      M.join(process.env.LOCALAPPDATA || "", "Programs", "AdoptOpenJDK"),
      "C:\\Program Files (x86)\\Minecraft Launcher\\runtime"
    ];
    for (const s of o)
      if (P.existsSync(s))
        try {
          for (const a of P.readdirSync(s)) {
            const l = M.join(s, a, "bin", n);
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
              const m = M.join(s, l);
              P.existsSync(m) && !e.includes(m) && e.push(m);
            }
        } catch {
        }
  }
  return e;
}
async function J1(e, t, n = 17) {
  const r = po(), i = M.join(r, "java", `java-${n}`), o = (h, w = 0) => {
    if (!P.existsSync(h) || w > 6) return null;
    try {
      for (const p of P.readdirSync(h)) {
        const f = M.join(h, p);
        if (p.toLowerCase() === (process.platform === "win32" ? "javaw.exe" : "java").toLowerCase()) return f;
        try {
          if (P.statSync(f).isDirectory()) {
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
  const a = process.platform === "win32", l = V1(n), m = a ? "zip" : ".tar.gz", c = M.join(r, "java", `java-${n}.${m}`);
  P.existsSync(M.dirname(c)) || P.mkdirSync(M.dirname(c), { recursive: !0 }), await St(l, c, (h) => {
    gn += h;
    const w = Date.now();
    if (w - mn > 1e3) {
      const p = gn / Math.max(1, (w - mn) / 1e3);
      mn = w, gn = 0, e({
        instanceId: "java-auto",
        stage: "downloading",
        statusText: `Скачивание Java ${n}... (${(p / 1024 / 1024).toFixed(1)} МБ/с)`,
        progress: 55
      });
    }
  }), e({
    instanceId: "java-auto",
    stage: "extracting",
    statusText: `Распаковка Java ${n}...`,
    progress: 75
  }), t({ timestamp: Date.now(), type: "info", message: `Распаковка архива Java ${n}...` }), P.existsSync(i) || P.mkdirSync(i, { recursive: !0 }), a ? W1(c, i) : as(`tar -xzf "${c}" -C "${i}"`), P.unlinkSync(c);
  const u = o(i);
  if (!u) throw new Error(`Java ${n} распакована некорректно — попробуйте установить её вручную`);
  return t({ timestamp: Date.now(), type: "info", message: `Java ${n} установлена: ${u}` }), u;
}
async function Id() {
  return await dn("https://launchermeta.mojang.com/mc/game/version_manifest_v2.json");
}
async function Z1(e, t, n) {
  var m, c, u, h, w, p, f, y, _;
  mn = 0, gn = 0, Vt = [];
  const r = po(), i = M.join(r, "instances", e.instanceId), o = M.join(r, "assets"), s = M.join(r, "libraries"), a = M.join(r, "versions"), l = M.join(i, "natives");
  for (const E of [i, l])
    P.existsSync(E) || P.mkdirSync(E, { recursive: !0 });
  try {
    let E = e.javaPath, S = !1;
    if (E && P.existsSync(E))
      try {
        as(`"${E}" -version 2>&1`, { stdio: "ignore" }), S = !0;
      } catch {
      }
    if (!S) {
      const N = await Td();
      for (const G of N)
        try {
          as(`"${G}" -version 2>&1`, { stdio: "ignore" }), E = G, S = !0;
          break;
        } catch {
        }
    }
    S || (E = await J1(t, n, Sd(e.version))), n({ timestamp: Date.now(), type: "info", message: `Java: ${E}` }), t({ instanceId: e.instanceId, stage: "checking", statusText: "Проверка версии...", progress: 5 });
    const T = (await Id()).versions.find((N) => N.id === e.version);
    if (!T) throw new Error(`Версия ${e.version} не найдена на серверах Mojang`);
    const R = M.join(a, e.version, `${e.version}.json`);
    let O;
    if (P.existsSync(R))
      try {
        O = JSON.parse(P.readFileSync(R, "utf-8"));
      } catch {
        O = null;
      }
    if (O || (t({ instanceId: e.instanceId, stage: "downloading", statusText: `Загрузка версии ${e.version}...`, progress: 10 }), O = await dn(T.url), P.existsSync(M.dirname(R)) || P.mkdirSync(M.dirname(R), { recursive: !0 }), P.writeFileSync(R, JSON.stringify(O, null, 2))), (m = O.assetIndex) != null && m.url) {
      const N = M.join(o, "indexes", `${O.assetIndex.id}.json`);
      P.existsSync(N) || (t({ instanceId: e.instanceId, stage: "downloading", statusText: "Загрузка манифеста ресурсов...", progress: 12 }), await St(O.assetIndex.url, N));
      try {
        const V = JSON.parse(P.readFileSync(N, "utf-8")).objects || {}, U = M.join(o, "objects"), Q = [];
        for (const re of Object.keys(V)) {
          const z = V[re].hash, ie = M.join(U, z.slice(0, 2), z);
          P.existsSync(ie) || Q.push({ hash: z });
        }
        if (Q.length > 0) {
          t({
            instanceId: e.instanceId,
            stage: "downloading",
            statusText: `Загрузка ресурсов (0/${Q.length})...`,
            progress: 15
          });
          let re = 0;
          const z = 64;
          let ie = Date.now(), Se = 0;
          for (let le = 0; le < Q.length; le += z) {
            const lt = Q.slice(le, le + z);
            await Promise.all(
              lt.map((Qe) => St(
                `https://resources.download.minecraft.net/${Qe.hash.slice(0, 2)}/${Qe.hash}`,
                M.join(U, Qe.hash.slice(0, 2), Qe.hash),
                (tn) => {
                  Se += tn;
                }
              ).catch(() => {
              }))
            ), re += lt.length;
            const Ct = Date.now();
            if (Ct - ie > 1500) {
              const Qe = Se / Math.max(1, (Ct - ie) / 1e3);
              t({
                instanceId: e.instanceId,
                stage: "downloading",
                statusText: `Загрузка ресурсов (${re}/${Q.length}) — ${(Qe / 1024 / 1024).toFixed(1)} МБ/с`,
                progress: 15 + re / Q.length * 25
              }), ie = Ct, Se = 0;
            }
          }
        }
      } catch (G) {
        n({ timestamp: Date.now(), type: "warn", message: `Ресурсы: ${G.message}` });
      }
    }
    const j = M.join(a, e.version, `${e.version}.jar`);
    if (!P.existsSync(j) && ((u = (c = O.downloads) == null ? void 0 : c.client) != null && u.url)) {
      const N = (G) => {
        gn += G;
        const V = Date.now();
        if (V - mn > 500) {
          const U = gn / Math.max(1, (V - mn) / 1e3);
          mn = V, gn = 0, t({
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
    const B = [], x = O.libraries || [];
    let A = 0, W = 0, K = 0;
    for (const N of x) {
      if (!X1(N.rules)) continue;
      if ((h = N.downloads) != null && h.artifact) {
        const V = N.downloads.artifact.path;
        if (!ur(V)) {
          n({ timestamp: Date.now(), type: "warn", message: `Библиотека пропущена (путь вне каталога): ${V}` });
          continue;
        }
        const U = M.join(s, V);
        if (!P.existsSync(U))
          try {
            await St(N.downloads.artifact.url, U, (Q) => {
              W += Q;
            });
          } catch {
          }
        P.existsSync(U) && (B.push(U), (V.includes("natives") || N.name.includes("natives")) && await os(U, l));
      }
      if ((w = N.downloads) != null && w.classifiers) {
        const V = N.downloads.classifiers, U = process.platform === "win32" ? V["natives-windows"] || V["natives-windows-64"] || V["natives-windows-x86"] : process.platform === "darwin" ? V["natives-osx"] || V["natives-macos"] : V["natives-linux"];
        if (U) {
          const Q = U.path;
          if (!ur(Q)) continue;
          const re = M.join(s, Q);
          if (!P.existsSync(re))
            try {
              await St(U.url, re, (z) => {
                W += z;
              });
            } catch {
            }
          P.existsSync(re) && await os(re, l);
        }
      }
      if (!((p = N.downloads) != null && p.artifact) && N.name) {
        const V = N.name.split(":"), U = V[0].replace(/\./g, "/"), Q = V[1], re = V[2], z = `${U}/${Q}/${re}/${Q}-${re}.jar`;
        if (!ur(z)) continue;
        const ie = M.join(s, z), Se = N.url ? `${N.url}${z}` : `https://libraries.minecraft.net/${z}`;
        if (!P.existsSync(ie))
          try {
            await St(Se, ie, (le) => {
              W += le;
            });
          } catch {
          }
        P.existsSync(ie) && (B.push(ie), N.name.includes("natives") && await os(ie, l));
      }
      K++;
      const G = Date.now();
      if (G - A > 800 && W > 0) {
        const V = W / Math.max(1, (G - A) / 1e3);
        t({
          instanceId: e.instanceId,
          stage: "downloading",
          statusText: `Библиотеки ${K}/${x.length} — ${(V / 1024 / 1024).toFixed(1)} МБ/с`,
          progress: 50 + K / x.length * 15
        }), A = G, W = 0;
      }
    }
    B.push(j);
    let te = O.mainClass || "net.minecraft.client.main.Main";
    const F = [];
    if (e.loader === "fabric") {
      t({ instanceId: e.instanceId, stage: "downloading", statusText: "Установка Fabric...", progress: 72 });
      try {
        const N = await dn(`https://meta.fabricmc.net/v2/versions/loader/${e.version}`);
        if (N != null && N.length) {
          const G = N[0].loader.version, V = await dn(
            `https://meta.fabricmc.net/v2/versions/loader/${e.version}/${G}/profile/json`
          );
          if (V.mainClass && (te = V.mainClass), V.libraries)
            for (const U of V.libraries) {
              const Q = U.name.split(":"), re = Q[0].replace(/\./g, "/"), z = Q[1], ie = Q[2], Se = `${re}/${z}/${ie}/${z}-${ie}.jar`;
              if (!ur(Se)) continue;
              const le = M.join(s, Se), lt = U.url ? `${U.url}${Se}` : `https://maven.fabricmc.net/${Se}`;
              if (!P.existsSync(le))
                try {
                  await St(lt, le);
                } catch {
                }
              P.existsSync(le) && B.unshift(le);
            }
        }
      } catch (N) {
        throw new Error(`Ошибка загрузки Fabric: ${N.message}`);
      }
    }
    if (e.loader === "quilt") {
      t({ instanceId: e.instanceId, stage: "downloading", statusText: "Установка Quilt...", progress: 72 });
      try {
        const N = await dn(`https://meta.quiltmc.org/v3/versions/loader/${e.version}`);
        if (N != null && N.length) {
          const G = N[0].loader.version, V = await dn(
            `https://meta.quiltmc.org/v3/versions/loader/${e.version}/${G}/profile/json`
          );
          if (V.mainClass && (te = V.mainClass), V.libraries)
            for (const U of V.libraries) {
              const Q = U.name.split(":"), re = Q[0].replace(/\./g, "/"), z = Q[1], ie = Q[2], Se = `${re}/${z}/${ie}/${z}-${ie}.jar`;
              if (!ur(Se)) continue;
              const le = M.join(s, Se), lt = U.url ? `${U.url}${Se}` : `https://maven.quiltmc.org/repository/release/${Se}`;
              if (!P.existsSync(le))
                try {
                  await St(lt, le);
                } catch {
                }
              P.existsSync(le) && B.unshift(le);
            }
        }
      } catch (N) {
        throw new Error(`Ошибка загрузки Quilt: ${N.message}`);
      }
    }
    t({ instanceId: e.instanceId, stage: "launching", statusText: "Запуск игры...", progress: 92 });
    const b = B.join(M.delimiter), k = [];
    k.push(`-Xms${e.memoryMin || 1024}M`), k.push(`-Xmx${e.memoryMax || 4096}M`), (f = e.customJvmArgs) != null && f.includes("-Djava.library.path") || k.push(`-Djava.library.path=${l}`), k.push(
      "-XX:+UseG1GC",
      "-XX:+UnlockExperimentalVMOptions",
      "-XX:G1NewSizePercent=20",
      "-XX:G1ReservePercent=20",
      "-XX:MaxGCPauseMillis=50",
      "-XX:G1HeapRegionSize=32M"
    ), e.customJvmArgs && k.push(...e.customJvmArgs.split(" ").filter(Boolean)), F.push("-cp", b, te), k.push(...F);
    const $ = (e.uuid || Ad(e.username || "Player")).replace(/-/g, "");
    if (O.minecraftArguments && typeof O.minecraftArguments == "string")
      for (const N of O.minecraftArguments.split(" "))
        k.push(
          N.replace("${auth_player_name}", e.username || "Player").replace("${version_name}", `${e.version}-${e.loader}`).replace("${game_directory}", i).replace("${assets_root}", o).replace("${assets_index_name}", ((y = O.assetIndex) == null ? void 0 : y.id) || e.version).replace("${auth_uuid}", $).replace("${auth_access_token}", "0").replace("${user_type}", "mojang").replace("${version_type}", e.loader === "vanilla" ? "release" : "release/mod")
        );
    else
      k.push(
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
    e.fullscreen && !k.includes("--fullscreen") && k.push("--fullscreen"), e.customGameArgs && k.push(...e.customGameArgs.split(" ").filter(Boolean)), n({ timestamp: Date.now(), type: "info", message: `Запуск: "${E}" ${k.slice(0, 8).join(" ")} ... [обрезано]` });
    const H = Lh(E || "javaw", k, {
      cwd: i,
      detached: !e.hideLauncher
    });
    Er.set(e.instanceId, H), H.stdout.on("data", (N) => {
      for (const G of N.toString().split(`
`))
        G.trim() && (Gc(G), n({ timestamp: Date.now(), type: "info", message: G }));
    }), H.stderr.on("data", (N) => {
      for (const G of N.toString().split(`
`))
        G.trim() && (Gc(G), n({ timestamp: Date.now(), type: "warn", message: G }));
    }), H.on("error", (N) => {
      Er.delete(e.instanceId), t({
        instanceId: e.instanceId,
        stage: "error",
        statusText: `Ошибка запуска: ${N.message}`,
        progress: 0,
        error: N.message
      }), n({ timestamp: Date.now(), type: "error", message: `Ошибка запуска: ${N.message}` });
    }), H.on("exit", (N) => {
      if (Er.delete(e.instanceId), N === 0)
        Vt = [], t({ instanceId: e.instanceId, stage: "idle", statusText: "", progress: 0 }), n({ timestamp: Date.now(), type: "info", message: "Minecraft завершён." });
      else {
        const G = Y1(Vt);
        Vt = [], t({
          instanceId: e.instanceId,
          stage: "error",
          statusText: `Игра завершилась с ошибкой (код ${N}). ${G}`,
          progress: 0,
          error: `exit ${N}`
        }), n({ timestamp: Date.now(), type: "error", message: `Minecraft завершился с кодом ${N}. ${G}` });
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
function qc(e) {
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
const Cd = 64 * 1024 * 1024, zc = 512 * 1024 * 1024, K1 = Cd;
function Q1(e) {
  return {
    format: 1,
    name: e.name,
    version: e.version,
    loader: ["vanilla", "fabric", "quilt"].includes(e.loader) ? e.loader : "vanilla",
    exportedAt: Date.now()
  };
}
function eA(e) {
  let t = 0;
  const n = [];
  for (const r of e) {
    const i = (r.entryName || "").replace(/\\/g, "/");
    if (!i) throw new Error("Архив содержит пустое имя файла");
    const o = i.replace(/\/+$/, "");
    if (M.isAbsolute(o) || /^[a-zA-Z]:/.test(o))
      throw new Error("Архив содержит абсолютный путь — импорт отклонён");
    const s = o.split("/");
    if (s.some((a) => a === "" || a === "." || a === ".."))
      throw new Error("Архив содержит небезопасный путь — импорт отклонён");
    if (o === "instance.json") {
      if (t += r.size, t > zc) throw new Error("Архив слишком большой");
      continue;
    }
    if (s[0] !== "mods" || s.length !== 2)
      throw new Error(`Неожиданный файл в архиве: ${o}`);
    if (!/\.jar(\.disabled)?$/i.test(s[1]))
      throw new Error(`В папке mods ожидаются только .jar: ${s[1]}`);
    if (r.size > Cd)
      throw new Error(`Файл мода слишком большой: ${s[1]}`);
    if (t += r.size, t > zc) throw new Error("Архив слишком большой");
    n.includes(s[1]) || n.push(s[1]);
  }
  if (!e.some((r) => (r.entryName || "").replace(/\\/g, "/").replace(/\/+$/, "") === "instance.json"))
    throw new Error("В архиве нет instance.json — это не сборка Mine Launcher");
  if (n.length === 0)
    throw new Error("В архиве нет модов — импортировать нечего");
  return n;
}
function tA(e) {
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
function nA(e, t) {
  const n = e.trim() || "Импортированная сборка";
  if (!t.includes(n)) return n;
  for (let r = 2; r < 100; r++) {
    const i = `${n} (${r})`;
    if (!t.includes(i)) return i;
  }
  return `${n} (${Date.now().toString(36)})`;
}
Wc.setApplicationMenu(null);
ht.requestSingleInstanceLock() || ht.quit();
const Dd = M.dirname(bh(import.meta.url));
process.env.APP_ROOT = M.join(Dd, "..");
const yn = process.env.VITE_DEV_SERVER_URL, Nd = M.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = yn ? M.join(process.env.APP_ROOT, "public") : Nd;
ht.setName("mine-launcher");
let X = null, rt = null;
const Re = po(), Ii = M.join(Re, "accounts.json"), Pn = M.join(Re, "instances.json"), Is = M.join(Re, "settings.json"), jt = M.join(Re, "skins");
function ha(e, t) {
  try {
    if (P.existsSync(e)) return JSON.parse(P.readFileSync(e, "utf-8"));
  } catch {
  }
  return t;
}
function _t(e, t) {
  try {
    P.writeFileSync(e, JSON.stringify(t, null, 2), "utf-8");
  } catch (n) {
    console.error(`Failed saving ${e}:`, n);
  }
}
let _e = ha(Ii, []), ge = ha(Pn, []);
const pa = Math.round(Rh.totalmem() / 1024 / 1024), ma = Math.max(2048, Math.min(4096, Math.floor(pa / 3)));
let Te = ha(Is, {
  javaPath: "",
  memoryMin: 1024,
  memoryMax: ma,
  customJvmArgs: "",
  closeLauncherOnGameStart: !1,
  fullscreen: !1,
  hideLauncher: !1
});
(!Te.memoryMax || Te.memoryMax > pa * 0.85) && (Te.memoryMax = ma);
function ga() {
  X = new Yc({
    width: 1100,
    height: 740,
    minWidth: 940,
    minHeight: 660,
    frame: !1,
    titleBarStyle: "hidden",
    backgroundColor: "#111217",
    icon: M.join(process.env.VITE_PUBLIC, "icon.png"),
    webPreferences: {
      preload: M.join(Dd, "preload.mjs"),
      nodeIntegration: !1,
      contextIsolation: !0,
      webSecurity: !0
    }
  }), yn ? X.loadURL(yn) : X.loadFile(M.join(Nd, "index.html")), X.on("closed", () => {
    X = null;
  }), X.webContents.setWindowOpenHandler(() => ({ action: "deny" })), X.webContents.on("will-navigate", (e) => e.preventDefault());
}
function rA() {
  if (rt) return rt;
  const e = M.join(process.env.VITE_PUBLIC, "icon.png");
  let t = Fa.createFromPath(e);
  t.isEmpty() && (t = Fa.createEmpty()), rt = new Dh(t), rt.setToolTip("Mine Launcher"), rt.on("click", () => {
    X == null || X.show();
  });
  const n = Wc.buildFromTemplate([
    { label: "Показать лаунчер", click: () => X == null ? void 0 : X.show() },
    { type: "separator" },
    { label: "Выход", click: () => ht.quit() }
  ]);
  return rt.setContextMenu(n), rt;
}
function Ln(e) {
  try {
    X == null || X.webContents.send("updater:state", e);
  } catch {
  }
}
function iA() {
  yn || process.platform !== "linux" && (je.autoUpdater.autoDownload = !0, je.autoUpdater.autoInstallOnAppQuit = !0, je.autoUpdater.allowDowngrade = !1, je.autoUpdater.on("checking-for-update", () => {
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
function oA() {
  rA(), rt == null || rt.setToolTip("Mine Launcher — игра запущена"), X == null || X.hide();
}
ht.on("second-instance", () => {
  X ? (X.isMinimized() && X.restore(), X.show(), X.focus()) : ga();
});
ht.on("window-all-closed", () => {
  process.platform !== "darwin" && ht.quit(), X = null;
});
ht.on("activate", () => {
  Yc.getAllWindows().length === 0 && ga();
});
function Cs(e, t) {
  return new Promise((n, r) => {
    const i = M.dirname(t);
    P.existsSync(i) || P.mkdirSync(i, { recursive: !0 });
    const o = P.createWriteStream(t);
    (e.startsWith("https") ? Ns : Os).get(e, { headers: { "User-Agent": "MineLauncher/2.0" } }, (l) => {
      if (l.statusCode && l.statusCode >= 300 && l.statusCode < 400 && l.headers.location)
        return o.close(), Cs(l.headers.location, t).then(n).catch(r);
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
function ss(e, t) {
  const n = M.relative(M.resolve(e), M.resolve(t));
  return n !== "" && !n.startsWith("..") && !M.isAbsolute(n);
}
function Ot(e) {
  if (!/^[A-Za-z0-9_-]{1,64}$/.test(e)) throw new Error("Некорректный id сборки");
  return e;
}
function wi(e) {
  if (!/^[A-Za-z0-9._ -]{1,255}$/.test(e)) throw new Error("Некорректное имя файла");
  return e;
}
function sA() {
  ne.handle("minimize-window", () => {
    X == null || X.minimize();
  }), ne.handle("maximize-window", () => X ? X.isMaximized() ? (X.unmaximize(), !1) : (X.maximize(), !0) : !1), ne.handle("close-window", () => {
    X == null || X.close();
  }), ne.handle("is-maximized", () => (X == null ? void 0 : X.isMaximized()) || !1), ne.handle("get-accounts", () => _e), ne.handle("add-account", (e, t) => {
    const n = t.trim();
    if (!n) throw new Error("Введите никнейм");
    if (n.length > 16) throw new Error("Никнейм слишком длинный (максимум 16 символов)");
    if (!/^[a-zA-Z0-9_]+$/.test(n)) throw new Error("Допустимы только латинские буквы, цифры и знак _");
    if (_e.some((i) => i.username.toLowerCase() === n.toLowerCase()))
      throw new Error(`Аккаунт «${n}» уже добавлен`);
    const r = {
      id: Date.now().toString(),
      username: n,
      uuid: Ad(n),
      type: "offline",
      isActive: _e.length === 0,
      createdAt: Date.now()
    };
    return _e.push(r), _t(Ii, _e), _e;
  }), ne.handle("set-active-account", (e, t) => (_e = _e.map((n) => ({ ...n, isActive: n.id === t })), _t(Ii, _e), _e)), ne.handle("delete-account", (e, t) => (_e = _e.filter((n) => n.id !== t), _e.length > 0 && !_e.some((n) => n.isActive) && (_e[0].isActive = !0), _t(Ii, _e), _e)), ne.handle("get-instances", () => ge), ne.handle("create-instance", (e, t) => {
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
    ge.push(n), _t(Pn, ge);
    for (const r of ["mods", "saves"]) {
      const i = M.join(Re, "instances", n.id, r);
      P.existsSync(i) || P.mkdirSync(i, { recursive: !0 });
    }
    return ge;
  }), ne.handle("rename-instance", (e, { id: t, name: n }) => {
    const r = ge.find((i) => i.id === t);
    if (!r) throw new Error("Сборка не найдена");
    return r.name = n.trim(), _t(Pn, ge), ge;
  }), ne.handle("delete-instance", (e, t) => {
    Ot(t);
    const n = ge.find((r) => r.id === t);
    return ge = ge.filter((r) => r.id !== t), _t(Pn, ge), n && P.existsSync(M.join(Re, "instances", t)) && X && sr.showMessageBox(X, {
      type: "question",
      buttons: ["Удалить", "Отмена"],
      defaultId: 1,
      title: "Удалить сборку?",
      message: `Удалить сборку «${n.name}» вместе с мирами, модами и файлами игры?`
    }).then(({ response: r }) => {
      r === 0 && P.rmSync(M.join(Re, "instances", t), { recursive: !0, force: !0 });
    }), ge;
  }), ne.handle("export-instance", async (e, t) => {
    Ot(t);
    const n = ge.find((l) => l.id === t);
    if (!n) throw new Error("Сборка не найдена");
    const r = M.join(Re, "instances", t, "mods"), i = P.existsSync(r) ? P.readdirSync(r).filter((l) => /\.jar(\.disabled)?$/i.test(l)) : [];
    if (i.length === 0) throw new Error("В этой сборке нет модов — делиться нечем");
    const o = (n.name || "instance").replace(/[\\/:*?"<>|]/g, "_").trim() || "instance", s = X ? await sr.showSaveDialog(X, {
      title: "Экспорт сборки",
      defaultPath: M.join(ht.getPath("documents"), `${o}.zip`),
      filters: [{ name: "Сборка Mine Launcher", extensions: ["zip"] }]
    }) : { canceled: !0, filePath: void 0 };
    if (s.canceled || !s.filePath) return { ok: !1, canceled: !0 };
    const a = new Ui();
    a.addFile("instance.json", Buffer.from(JSON.stringify(Q1(n), null, 2), "utf-8"));
    for (const l of i)
      a.addLocalFile(M.join(r, l), "mods");
    return a.writeZip(s.filePath), { ok: !0, path: s.filePath };
  }), ne.handle("import-instance", async () => {
    const e = X ? await sr.showOpenDialog(X, {
      title: "Импорт сборки",
      properties: ["openFile"],
      filters: [{ name: "Сборка Mine Launcher", extensions: ["zip"] }]
    }) : { canceled: !0, filePaths: [] };
    if (e.canceled || e.filePaths.length === 0) return { ok: !1, canceled: !0 };
    const t = e.filePaths[0];
    if (P.statSync(t).size > 600 * 1024 * 1024) throw new Error("Архив больше 600 МБ — отказ");
    const r = new Ui(t), i = r.getEntries().filter((h) => !h.isDirectory), o = eA(
      i.map((h) => ({ entryName: h.entryName, size: h.header.size }))
    ), s = r.getEntry("instance.json");
    if (!s) throw new Error("В архиве нет instance.json");
    const a = tA(JSON.parse(s.getData().toString("utf-8"))), l = "inst-" + Date.now().toString(36) + Math.random().toString(36).slice(2, 6), m = {
      id: l,
      name: nA(a.name, ge.map((h) => h.name)),
      version: a.version,
      loader: a.loader,
      created: Date.now(),
      memoryMin: Te.memoryMin,
      memoryMax: Te.memoryMax
    }, c = M.join(Re, "instances", l), u = M.join(c, "mods");
    try {
      P.mkdirSync(u, { recursive: !0 });
      const h = /* @__PURE__ */ new Map();
      for (const w of i) {
        const p = w.entryName.replace(/\\/g, "/").replace(/\/+$/, "");
        p.startsWith("mods/") && h.set(p.slice(5), w);
      }
      for (const w of o) {
        const p = h.get(w);
        if (!p) throw new Error(`Файл мода пропал при чтении: ${w}`);
        const f = p.getData();
        if (f.length > K1)
          throw new Error(`Файл мода распаковался больше лимита: ${w}`);
        P.writeFileSync(M.join(u, w), f);
      }
      P.mkdirSync(M.join(c, "saves"), { recursive: !0 });
    } catch (h) {
      throw P.rmSync(c, { recursive: !0, force: !0 }), h;
    }
    return ge.push(m), _t(Pn, ge), { ok: !0, instances: ge, importedId: l };
  }), ne.handle("get-versions", async () => {
    try {
      return await Id();
    } catch {
      return { latest: { release: "", snapshot: "" }, versions: [] };
    }
  }), ne.handle("get-settings", () => Te), ne.handle("set-selected-instance-id", (e, t) => (Te.selectedInstanceId = t, _t(Is, Te), !0)), ne.handle("save-settings", (e, t) => (Te = { ...Te, ...t }, _t(Is, Te), Te)), ne.handle("detect-java", async () => Td()), ne.handle("get-required-java", (e, t) => Sd(t)), ne.handle("open-launcher-folder", () => Pa.openPath(Re)), ne.handle("launch-instance", async (e, t) => {
    Ot(t);
    const n = ge.find((i) => i.id === t);
    if (!n) throw new Error("Сборка не найдена");
    const r = _e.find((i) => i.isActive) || _e[0];
    if (!r) throw new Error("Сначала добавьте аккаунт на панели слева");
    return qc(t) && await new Promise((i) => setTimeout(i, 500)), X == null || X.show(), Z1(
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
          o && (o.lastPlayed = Date.now(), _t(Pn, ge)), Te.closeLauncherOnGameStart && setTimeout(() => {
            try {
              oA();
            } catch {
            }
          }, 3e3);
        }
        ((i == null ? void 0 : i.stage) === "idle" || (i == null ? void 0 : i.stage) === "error") && (rt == null || rt.setToolTip("Mine Launcher")), X == null || X.webContents.send("launch-progress", i);
      },
      (i) => X == null ? void 0 : X.webContents.send("game-log", i)
    ), !0;
  }), ne.handle("stop-instance", (e, t) => qc(t)), ne.handle("restore-window", () => (X == null || X.show(), !0)), ne.handle("get-system-info", () => ({
    totalRamMb: pa,
    defaultMaxMemory: ma
  })), ne.handle("open-instance-folder", (e, t) => {
    Ot(t);
    const n = M.join(Re, "instances", t);
    P.existsSync(n) || P.mkdirSync(n, { recursive: !0 }), Pa.openPath(n);
  }), ne.handle("get-instance-mods", (e, t) => {
    Ot(t);
    const n = M.join(Re, "instances", t, "mods");
    if (!P.existsSync(n)) return [];
    try {
      return P.readdirSync(n).filter((r) => r.endsWith(".jar") || r.endsWith(".jar.disabled")).map((r) => {
        const i = M.join(n, r), o = P.statSync(i);
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
    const r = M.join(Re, "instances", t, "mods"), i = M.join(r, wi(n));
    if (!ss(r, i) || !P.existsSync(i)) return !1;
    const o = n.endsWith(".jar") ? n + ".disabled" : n.replace(/\.disabled$/, ""), s = M.join(r, wi(o));
    return ss(r, s) ? (P.renameSync(i, s), !0) : !1;
  }), ne.handle("delete-mod", (e, { instanceId: t, modFilename: n }) => {
    Ot(t);
    const r = M.join(Re, "instances", t, "mods"), i = M.join(r, wi(n));
    return ss(r, i) ? (P.existsSync(i) && P.unlinkSync(i), !0) : !1;
  }), ne.handle("download-mod-file", async (e, { instanceId: t, downloadUrl: n, filename: r }) => {
    Ot(t);
    const i = wi(r);
    if (!n.startsWith("https://cdn.modrinth.com/")) throw new Error("Недопустимый источник файла");
    const o = M.join(Re, "instances", t, "mods");
    return P.existsSync(o) || P.mkdirSync(o, { recursive: !0 }), await Cs(n, M.join(o, i)), !0;
  }), ne.handle("add-mod-file", async (e, t) => {
    if (Ot(t), !X) return !1;
    const n = await sr.showOpenDialog(X, {
      title: "Выберите файл мода (.jar)",
      filters: [{ name: "Minecraft Mods", extensions: ["jar"] }],
      properties: ["openFile", "multiSelections"]
    });
    if (n.canceled || !n.filePaths.length) return !1;
    const r = M.join(Re, "instances", t, "mods");
    P.existsSync(r) || P.mkdirSync(r, { recursive: !0 });
    for (const i of n.filePaths) {
      const o = M.join(r, M.basename(i));
      P.copyFileSync(i, o);
    }
    return !0;
  }), ne.handle("upload-user-skin", async (e, t) => {
    if (!X) return null;
    const n = await sr.showOpenDialog(X, {
      title: "Выберите скин Minecraft (.png)",
      filters: [{ name: "Minecraft Skin (*.png)", extensions: ["png"] }],
      properties: ["openFile"]
    });
    if (n.canceled || !n.filePaths.length) return null;
    P.existsSync(jt) || P.mkdirSync(jt, { recursive: !0 });
    const r = M.join(jt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`);
    return P.copyFileSync(n.filePaths[0], r), X.webContents.send("accounts-updated", _e), r;
  }), ne.handle("fetch-online-skin", async (e, { username: t, targetUsername: n }) => {
    P.existsSync(jt) || P.mkdirSync(jt, { recursive: !0 });
    const r = M.join(jt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`), i = [
      `https://mc-heads.net/skin/${encodeURIComponent(n)}`,
      `https://minotar.net/skin/${encodeURIComponent(n)}`
    ];
    for (const o of i)
      try {
        if (await Cs(o, r), P.existsSync(r) && P.statSync(r).size > 100)
          return !0;
      } catch {
      }
    throw new Error(`Скин для «${n}» не найден на серверах`);
  }), ne.handle("get-user-skin", (e, t) => {
    const n = M.join(jt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`);
    return P.existsSync(n) ? n : null;
  }), ne.handle("get-profile-stats", (e, t) => {
    const n = [];
    let r = 0, i = 0;
    for (const s of ge) {
      s.lastPlayed && (i = Math.max(i, s.lastPlayed));
      const a = M.join(Re, "instances", s.id, "saves");
      if (P.existsSync(a))
        try {
          for (const m of P.readdirSync(a)) {
            const c = M.join(a, m);
            if (P.statSync(c).isDirectory()) {
              let u = 0;
              const h = M.join(c, "level.dat");
              P.existsSync(h) && (u = P.statSync(h).mtimeMs), n.push({
                instanceId: s.id,
                instanceName: s.name,
                worldName: m,
                lastPlayed: u
              });
            }
          }
        } catch {
        }
      const l = M.join(Re, "instances", s.id, "mods");
      if (P.existsSync(l))
        try {
          r += P.readdirSync(l).filter((m) => m.endsWith(".jar") || m.endsWith(".jar.disabled")).length;
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
    const n = M.join(jt, `${t.replace(/[^a-zA-Z0-9_]/g, "")}.png`);
    return P.existsSync(n) ? `file://${n}` : `https://mc-heads.net/avatar/${encodeURIComponent(t)}/64`;
  }), ne.handle("updater:check", async () => {
    if (yn) return { status: "dev" };
    try {
      return await je.autoUpdater.checkForUpdates(), { ok: !0 };
    } catch (e) {
      return { ok: !1, message: e == null ? void 0 : e.message };
    }
  }), ne.handle("updater:download", async () => {
    if (yn) return { status: "dev" };
    try {
      return await je.autoUpdater.downloadUpdate(), { ok: !0 };
    } catch (e) {
      return { ok: !1, message: e == null ? void 0 : e.message };
    }
  }), ne.handle("updater:install", () => {
    if (yn) return !1;
    try {
      return setImmediate(() => {
        je.autoUpdater.quitAndInstall();
      }), !0;
    } catch {
      return !1;
    }
  });
}
ht.whenReady().then(() => {
  sA(), ga(), iA();
});
export {
  Nd as RENDERER_DIST,
  yn as VITE_DEV_SERVER_URL
};
