'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, r, a, n, i;
const s = Symbol.for("jsx.fragment");
function o(e, t) {
    let { children: r, ...a } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, n = function e(t) {
        let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let a of t)null != a && "boolean" != typeof a && (Array.isArray(a) ? e(a, r) : r.push(a instanceof Node ? a : String(a)));
        return r;
    }(null == r ? [] : Array.isArray(r) ? r : [
        r
    ]);
    if (e === s) {
        let e = document.createDocumentFragment();
        return e.append(...n), e;
    }
    if ("function" == typeof e) {
        let t = Reflect.apply(e, void 0, [
            {
                ...a,
                children: n
            }
        ]);
        if (!(t instanceof Node)) throw TypeError("JSX components must return a DOM Node");
        return t;
    }
    if ("string" != typeof e) throw TypeError("JSX element types must be tag names or component functions");
    let i = {}, o = {
        ...a
    };
    for (let [e, t] of Object.entries(o))e.startsWith("on") && "function" == typeof t ? (i[e] = t, delete o[e]) : "boolean" == typeof t && (t ? o[e] = e : delete o[e]);
    let l = Object.keys(o).length > 0 ? n.length > 1 ? E(e, o, n) : E(e, o, n[0]) : n.length > 1 ? E(e, {}, n) : E(e, {}, n[0]);
    for (let [e, t] of Object.entries(i)){
        let r = e.slice(2).toLowerCase();
        l.addEventListener(r, t);
    }
    return l;
}
const l = (e)=>null == e || "" === e ? "\u2014" : String(e);
function d(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
    return null != e && Number.isFinite(e) ? `${e.toFixed(t)} dBm` : "\u2014";
}
function c(e) {
    if (null == e || !Number.isFinite(e) || e < 0) return null;
    let t = Math.floor(e);
    if (t < 60) return (1 === t ? _("%d second ago") : _("%d seconds ago")).replace("%d", String(t));
    let r = Math.floor(t / 60);
    if (r < 60) return (1 === r ? _("%d minute ago") : _("%d minutes ago")).replace("%d", String(r));
    let a = Math.floor(t / 3600);
    if (a < 24) return (1 === a ? _("%d hour ago") : _("%d hours ago")).replace("%d", String(a));
    let n = Math.floor(t / 86400);
    return (1 === n ? _("%d day ago") : _("%d days ago")).replace("%d", String(n));
}
function p(e, t, r) {
    function a(r, a) {
        if (r._zod || Object.defineProperty(r, "_zod", {
            value: {
                def: a,
                constr: s,
                traits: new Set()
            },
            enumerable: !1
        }), r._zod.traits.has(e)) return;
        r._zod.traits.add(e), t(r, a);
        let n = s.prototype, i = Object.keys(n);
        for(let e = 0; e < i.length; e++){
            let t = i[e];
            t in r || (r[t] = n[t].bind(r));
        }
    }
    let n = r?.Parent ?? Object;
    class i extends n {
    }
    function s(e) {
        var t;
        let n = r?.Parent ? new i() : this;
        for (let r of (a(n, e), (t = n._zod).deferred ?? (t.deferred = []), n._zod.deferred))r();
        return n;
    }
    return Object.defineProperty(i, "name", {
        value: e
    }), Object.defineProperty(s, "init", {
        value: a
    }), Object.defineProperty(s, Symbol.hasInstance, {
        value: (t)=>!!r?.Parent && t instanceof r.Parent || t?._zod?.traits?.has(e)
    }), Object.defineProperty(s, "name", {
        value: e
    }), s;
}
Object.freeze({
    status: "aborted"
}), Symbol("zod_brand");
class u extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const f = {};
function b(e) {
    return e && Object.assign(f, e), f;
}
function g(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function h(e) {
    let t = +!!e.startsWith("^"), r = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, r);
}
const m = Symbol("evaluating");
function v(e, t, r) {
    let a;
    Object.defineProperty(e, t, {
        get () {
            if (a !== m) return void 0 === a && (a = m, a = r()), a;
        },
        set (r) {
            Object.defineProperty(e, t, {
                value: r
            });
        },
        configurable: !0
    });
}
const y = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function w(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function x(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function k(e) {
    if (!e) return {};
    if ("string" == typeof e) return {
        error: ()=>e
    };
    if (e?.message !== void 0) {
        if (e?.error !== void 0) throw Error("Cannot specify both `message` and `error` params");
        e.error = e.message;
    }
    return (delete e.message, "string" == typeof e.error) ? {
        ...e,
        error: ()=>e.error
    } : e;
}
function z(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let r = t; r < e.issues.length; r++)if (e.issues[r]?.continue !== !0) return !0;
    return !1;
}
function j(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function S(e) {
    return "string" == typeof e ? e : e?.message;
}
function $(e, t, r) {
    let a = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (a.message = S(e.inst?._zod.def?.error?.(e)) ?? S(t?.error?.(e)) ?? S(r.customError?.(e)) ?? S(r.localeError?.(e)) ?? "Invalid input"), delete a.inst, delete a.continue, t?.reportInput || delete a.input, a;
}
const O = (e, t)=>{
    e.name = "$ZodError", Object.defineProperty(e, "_zod", {
        value: e._zod,
        enumerable: !1
    }), Object.defineProperty(e, "issues", {
        value: t,
        enumerable: !1
    }), e.message = JSON.stringify(t, g, 2), Object.defineProperty(e, "toString", {
        value: ()=>e.message,
        enumerable: !1
    });
}, M = p("$ZodError", O), C = p("$ZodError", O, {
    Parent: Error
}), P = (r = C, (e, t, a, n)=>{
    let i = a ? Object.assign(a, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (s instanceof Promise) throw new u();
    if (s.issues.length) {
        let e = new (n?.Err ?? r)(s.issues.map((e)=>$(e, i, b())));
        throw y(e, n?.callee), e;
    }
    return s.value;
}), R = (a = C, async (e, t, r, n)=>{
    let i = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (n?.Err ?? a)(s.issues.map((e)=>$(e, i, b())));
        throw y(e, n?.callee), e;
    }
    return s.value;
}), I = (n = C, (e, t, r)=>{
    let a = r ? {
        ...r,
        async: !1
    } : {
        async: !1
    }, i = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (i instanceof Promise) throw new u();
    return i.issues.length ? {
        success: !1,
        error: new (n ?? M)(i.issues.map((e)=>$(e, a, b())))
    } : {
        success: !0,
        data: i.value
    };
}), N = (i = C, async (e, t, r)=>{
    let a = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, n = e._zod.run({
        value: t,
        issues: []
    }, a);
    return n instanceof Promise && (n = await n), n.issues.length ? {
        success: !1,
        error: new i(n.issues.map((e)=>$(e, a, b())))
    } : {
        success: !0,
        data: n.value
    };
}), D = /^-?\d+(?:\.\d+)?$/, T = /^(?:true|false)$/i, A = /^null$/i, q = {
    major: 4,
    minor: 3,
    patch: 6
}, U = p("$ZodType", (e, t)=>{
    var r;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = q;
    let a = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && a.unshift(e), a))for (let r of t._zod.onattach)r(e);
    if (0 === a.length) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, r)=>{
            let a, n = z(e);
            for (let i of t){
                if (i._zod.def.when) {
                    if (!i._zod.def.when(e)) continue;
                } else if (n) continue;
                let t = e.issues.length, s = i._zod.check(e);
                if (s instanceof Promise && r?.async === !1) throw new u();
                if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (n || (n = z(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    n || (n = z(e, t));
                }
            }
            return a ? a.then(()=>e) : e;
        }, r = (r, n, i)=>{
            if (z(r)) return r.aborted = !0, r;
            let s = t(n, a, i);
            if (s instanceof Promise) {
                if (!1 === i.async) throw new u();
                return s.then((t)=>e._zod.parse(t, i));
            }
            return e._zod.parse(s, i);
        };
        e._zod.run = (n, i)=>{
            if (i.skipChecks) return e._zod.parse(n, i);
            if ("backward" === i.direction) {
                let t = e._zod.parse({
                    value: n.value,
                    issues: []
                }, {
                    ...i,
                    skipChecks: !0
                });
                return t instanceof Promise ? t.then((e)=>r(e, n, i)) : r(t, n, i);
            }
            let s = e._zod.parse(n, i);
            if (s instanceof Promise) {
                if (!1 === i.async) throw new u();
                return s.then((e)=>t(e, a, i));
            }
            return t(s, a, i);
        };
    }
    v(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = I(e, t);
                    return r.success ? {
                        value: r.data
                    } : {
                        issues: r.error?.issues
                    };
                } catch (r) {
                    return N(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), Z = p("$ZodString", (e, t)=>{
    var r;
    let a;
    U.init(e, t), e._zod.pattern = [
        ...e?._zod.bag?.patterns ?? []
    ].pop() ?? (a = (r = e._zod.bag) ? `[\\s\\S]{${r?.minimum ?? 0},${r?.maximum ?? ""}}` : "[\\s\\S]*", RegExp(`^${a}$`)), e._zod.parse = (r, a)=>{
        if (t.coerce) try {
            r.value = String(r.value);
        } catch (e) {}
        return "string" == typeof r.value || r.issues.push({
            expected: "string",
            code: "invalid_type",
            input: r.value,
            inst: e
        }), r;
    };
}), B = p("$ZodNumber", (e, t)=>{
    U.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? D, e._zod.parse = (r, a)=>{
        if (t.coerce) try {
            r.value = Number(r.value);
        } catch (e) {}
        let n = r.value;
        if ("number" == typeof n && !Number.isNaN(n) && Number.isFinite(n)) return r;
        let i = "number" == typeof n ? Number.isNaN(n) ? "NaN" : Number.isFinite(n) ? void 0 : "Infinity" : void 0;
        return r.issues.push({
            expected: "number",
            code: "invalid_type",
            input: n,
            inst: e,
            ...i ? {
                received: i
            } : {}
        }), r;
    };
}), W = p("$ZodBoolean", (e, t)=>{
    U.init(e, t), e._zod.pattern = T, e._zod.parse = (r, a)=>{
        if (t.coerce) try {
            r.value = !!r.value;
        } catch (e) {}
        let n = r.value;
        return "boolean" == typeof n || r.issues.push({
            expected: "boolean",
            code: "invalid_type",
            input: n,
            inst: e
        }), r;
    };
}), V = p("$ZodNull", (e, t)=>{
    U.init(e, t), e._zod.pattern = A, e._zod.values = new Set([
        null
    ]), e._zod.parse = (t, r)=>{
        let a = t.value;
        return null === a || t.issues.push({
            expected: "null",
            code: "invalid_type",
            input: a,
            inst: e
        }), t;
    };
}), F = p("$ZodUnknown", (e, t)=>{
    U.init(e, t), e._zod.parse = (e)=>e;
});
function J(e, t, r) {
    e.issues.length && t.issues.push(...j(r, e.issues)), t.value[r] = e.value;
}
const X = p("$ZodArray", (e, t)=>{
    U.init(e, t), e._zod.parse = (r, a)=>{
        let n = r.value;
        if (!Array.isArray(n)) return r.issues.push({
            expected: "array",
            code: "invalid_type",
            input: n,
            inst: e
        }), r;
        r.value = Array(n.length);
        let i = [];
        for(let e = 0; e < n.length; e++){
            let s = n[e], o = t.element._zod.run({
                value: s,
                issues: []
            }, a);
            o instanceof Promise ? i.push(o.then((t)=>J(t, r, e))) : J(o, r, e);
        }
        return i.length ? Promise.all(i).then(()=>r) : r;
    };
});
function H(e, t, r, a, n) {
    if (e.issues.length) {
        if (n && !(r in a)) return;
        t.issues.push(...j(r, e.issues));
    }
    void 0 === e.value ? r in a && (t.value[r] = void 0) : t.value[r] = e.value;
}
const G = p("$ZodObject", (e, t)=>{
    var r;
    let a;
    U.init(e, t);
    let n = Object.getOwnPropertyDescriptor(t, "shape");
    if (!n?.get) {
        let e = t.shape;
        Object.defineProperty(t, "shape", {
            get: ()=>{
                let r = {
                    ...e
                };
                return Object.defineProperty(t, "shape", {
                    value: r
                }), r;
            }
        });
    }
    let i = (r = ()=>(function(e) {
            var t;
            let r = Object.keys(e.shape);
            for (let t of r)if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${t}": expected a Zod schema`);
            let a = Object.keys(t = e.shape).filter((e)=>"optional" === t[e]._zod.optin && "optional" === t[e]._zod.optout);
            return {
                ...e,
                keys: r,
                keySet: new Set(r),
                numKeys: r.length,
                optionalKeys: new Set(a)
            };
        })(t), {
        get value () {
            {
                let e = r();
                return Object.defineProperty(this, "value", {
                    value: e
                }), e;
            }
        }
    });
    v(e._zod, "propValues", ()=>{
        let e = t.shape, r = {};
        for(let t in e){
            let a = e[t]._zod;
            if (a.values) for (let e of (r[t] ?? (r[t] = new Set()), a.values))r[t].add(e);
        }
        return r;
    });
    let s = t.catchall;
    e._zod.parse = (t, r)=>{
        a ?? (a = i.value);
        let n = t.value;
        if (!w(n)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: n,
            inst: e
        }), t;
        t.value = {};
        let o = [], l = a.shape;
        for (let e of a.keys){
            let a = l[e], i = "optional" === a._zod.optout, s = a._zod.run({
                value: n[e],
                issues: []
            }, r);
            s instanceof Promise ? o.push(s.then((r)=>H(r, t, e, n, i))) : H(s, t, e, n, i);
        }
        return s ? function(e, t, r, a, n, i) {
            let s = [], o = n.keySet, l = n.catchall._zod, d = l.def.type, c = "optional" === l.optout;
            for(let n in t){
                if (o.has(n)) continue;
                if ("never" === d) {
                    s.push(n);
                    continue;
                }
                let i = l.run({
                    value: t[n],
                    issues: []
                }, a);
                i instanceof Promise ? e.push(i.then((e)=>H(e, r, n, t, c))) : H(i, r, n, t, c);
            }
            return (s.length && r.issues.push({
                code: "unrecognized_keys",
                keys: s,
                input: t,
                inst: i
            }), e.length) ? Promise.all(e).then(()=>r) : r;
        }(o, n, t, r, i.value, e) : o.length ? Promise.all(o).then(()=>t) : t;
    };
});
function K(e, t, r, a) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let n = e.filter((e)=>!z(e));
    return 1 === n.length ? (t.value = n[0].value, n[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>$(e, a, b())))
    }), t);
}
const Q = p("$ZodUnion", (e, t)=>{
    U.init(e, t), v(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), v(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), v(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), v(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>h(e.source)).join("|")})$`);
        }
    });
    let r = 1 === t.options.length, a = t.options[0]._zod.run;
    e._zod.parse = (n, i)=>{
        if (r) return a(n, i);
        let s = !1, o = [];
        for (let e of t.options){
            let t = e._zod.run({
                value: n.value,
                issues: []
            }, i);
            if (t instanceof Promise) o.push(t), s = !0;
            else {
                if (0 === t.issues.length) return t;
                o.push(t);
            }
        }
        return s ? Promise.all(o).then((t)=>K(t, n, e, i)) : K(o, n, e, i);
    };
}), Y = p("$ZodRecord", (e, t)=>{
    U.init(e, t), e._zod.parse = (r, a)=>{
        let n = r.value;
        if (!function(e) {
            if (!1 === w(e)) return !1;
            let t = e.constructor;
            if (void 0 === t || "function" != typeof t) return !0;
            let r = t.prototype;
            return !1 !== w(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
        }(n)) return r.issues.push({
            expected: "record",
            code: "invalid_type",
            input: n,
            inst: e
        }), r;
        let i = [], s = t.keyType._zod.values;
        if (s) {
            let o;
            r.value = {};
            let l = new Set();
            for (let e of s)if ("string" == typeof e || "number" == typeof e || "symbol" == typeof e) {
                l.add("number" == typeof e ? e.toString() : e);
                let s = t.valueType._zod.run({
                    value: n[e],
                    issues: []
                }, a);
                s instanceof Promise ? i.push(s.then((t)=>{
                    t.issues.length && r.issues.push(...j(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...j(e, s.issues)), r.value[e] = s.value);
            }
            for(let e in n)l.has(e) || (o = o ?? []).push(e);
            o && o.length > 0 && r.issues.push({
                code: "unrecognized_keys",
                input: n,
                inst: e,
                keys: o
            });
        } else for (let s of (r.value = {}, Reflect.ownKeys(n))){
            if ("__proto__" === s) continue;
            let o = t.keyType._zod.run({
                value: s,
                issues: []
            }, a);
            if (o instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof s && D.test(s) && o.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(s),
                    issues: []
                }, a);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (o = e);
            }
            if (o.issues.length) {
                "loose" === t.mode ? r.value[s] = n[s] : r.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: o.issues.map((e)=>$(e, a, b())),
                    input: s,
                    path: [
                        s
                    ],
                    inst: e
                });
                continue;
            }
            let l = t.valueType._zod.run({
                value: n[s],
                issues: []
            }, a);
            l instanceof Promise ? i.push(l.then((e)=>{
                e.issues.length && r.issues.push(...j(s, e.issues)), r.value[o.value] = e.value;
            })) : (l.issues.length && r.issues.push(...j(s, l.issues)), r.value[o.value] = l.value);
        }
        return i.length ? Promise.all(i).then(()=>r) : r;
    };
}), ee = p("$ZodLiteral", (e, t)=>{
    if (U.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? x(e) : e ? x(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (a, n)=>{
        let i = a.value;
        return r.has(i) || a.issues.push({
            code: "invalid_value",
            values: t.values,
            input: i,
            inst: e
        }), a;
    };
});
function et(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const er = p("$ZodOptional", (e, t)=>{
    U.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", v(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), v(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${h(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let a = t.innerType._zod.run(e, r);
            return a instanceof Promise ? a.then((t)=>et(t, e.value)) : et(a, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, r);
    };
});
Symbol("ZodOutput"), Symbol("ZodInput");
(e = globalThis).__zod_globalRegistry ?? (e.__zod_globalRegistry = new class e {
    constructor(){
        this._map = new WeakMap(), this._idmap = new Map();
    }
    add(e, ...t) {
        let r = t[0];
        return this._map.set(e, r), r && "object" == typeof r && "id" in r && this._idmap.set(r.id, e), this;
    }
    clear() {
        return this._map = new WeakMap(), this._idmap = new Map(), this;
    }
    remove(e) {
        let t = this._map.get(e);
        return t && "object" == typeof t && "id" in t && this._idmap.delete(t.id), this._map.delete(e), this;
    }
    get(e) {
        let t = e._zod.parent;
        if (t) {
            let r = {
                ...this.get(t) ?? {}
            };
            delete r.id;
            let a = {
                ...r,
                ...this._map.get(e)
            };
            return Object.keys(a).length ? a : void 0;
        }
        return this._map.get(e);
    }
    has(e) {
        return this._map.has(e);
    }
}());
const ea = p("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    U.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>P(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>I(e, t, r), e.parseAsync = async (t, r)=>R(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>N(e, t, r), e.check = (...r)=>e.clone({
            ...t,
            checks: [
                ...t.checks ?? [],
                ...r.map((e)=>"function" == typeof e ? {
                        _zod: {
                            check: e,
                            def: {
                                check: "custom"
                            },
                            onattach: []
                        }
                    } : e)
            ]
        }, {
            parent: !0
        }), e.with = e.check, e.clone = (t, r)=>{
        let a;
        return a = new e._zod.constr(t ?? e._zod.def), (!t || r?.parent) && (a._zod.parent = e), a;
    }, e.brand = ()=>e, e.register = (t, r)=>(t.add(e, r), e), e.apply = (t)=>t(e);
}), en = p("ZodMiniString", (e, t)=>{
    Z.init(e, t), ea.init(e, t);
});
function ei(e) {
    return new en({
        type: "string",
        ...k(e)
    });
}
const es = p("ZodMiniNumber", (e, t)=>{
    B.init(e, t), ea.init(e, t);
});
function eo(e) {
    return new es({
        type: "number",
        checks: [],
        ...k(e)
    });
}
const el = p("ZodMiniBoolean", (e, t)=>{
    W.init(e, t), ea.init(e, t);
});
function ed(e) {
    return new el({
        type: "boolean",
        ...k(e)
    });
}
const ec = p("ZodMiniNull", (e, t)=>{
    V.init(e, t), ea.init(e, t);
});
function ep(e) {
    return new ec({
        type: "null",
        ...k(e)
    });
}
const eu = p("ZodMiniUnknown", (e, t)=>{
    F.init(e, t), ea.init(e, t);
}), e_ = p("ZodMiniArray", (e, t)=>{
    X.init(e, t), ea.init(e, t);
});
function ef(e, t) {
    return new e_({
        type: "array",
        element: e,
        ...k(t)
    });
}
const eb = p("ZodMiniObject", (e, t)=>{
    G.init(e, t), ea.init(e, t), v(e, "shape", ()=>t.shape);
});
function eg(e, t) {
    return new eb({
        type: "object",
        shape: e ?? {},
        ...k(t)
    });
}
const eh = p("ZodMiniUnion", (e, t)=>{
    Q.init(e, t), ea.init(e, t);
});
function em(e, t) {
    return new eh({
        type: "union",
        options: e,
        ...k(t)
    });
}
const ev = p("ZodMiniRecord", (e, t)=>{
    Y.init(e, t), ea.init(e, t);
});
function ey(e, t, r) {
    return new ev({
        type: "record",
        keyType: e,
        valueType: t,
        ...k(r)
    });
}
const ew = p("ZodMiniLiteral", (e, t)=>{
    ee.init(e, t), ea.init(e, t);
});
function ex(e, t) {
    return new ew({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...k(t)
    });
}
const ek = p("ZodMiniOptional", (e, t)=>{
    er.init(e, t), ea.init(e, t);
});
function ez(e) {
    return new ek({
        type: "optional",
        innerType: e
    });
}
const ej = em([
    ex("account_set_password"),
    ex("account_set_active")
]), eS = em([
    ex("waiting_transport"),
    ex("waiting_identity"),
    ex("reading"),
    ex("configuring"),
    ex("verifying"),
    ex("waiting_inform"),
    ex("ready"),
    ex("retry_wait"),
    ex("manual_required"),
    ex("not_configured"),
    ex("waiting_acs"),
    ex("awaiting_apply"),
    ex("discovering_management_wan"),
    ex("configuring_management_wan"),
    ex("verifying_management_wan")
]), e$ = eg({
    enabled: ed(),
    listen: em([
        ei(),
        ep()
    ]),
    path: em([
        ei(),
        ep()
    ]),
    error: em([
        ei(),
        ep()
    ])
}), eO = eg({
    vlan: eo(),
    vlans: ef(eo()),
    priority: eo(),
    acs_url: ei()
}), eM = eg({
    state: eS,
    optical_sn: ei(),
    cwmp_id: ei(),
    mqtt_target: em([
        ei(),
        ep()
    ]),
    binding_source: ei(),
    method: ei(),
    desired_version: ei(),
    generation: eo(),
    reason: ei(),
    attempts: eo(),
    next_retry_at: eo(),
    updated_at: eo(),
    settings_verified_at: em([
        eo(),
        ep()
    ]),
    selected_vlan: em([
        eo(),
        ep()
    ]),
    last_inform: em([
        eo(),
        ep()
    ]),
    expected_acs_url: ei(),
    last_error: em([
        ei(),
        ep()
    ]),
    transport_epoch: eo(),
    completed_authorization: eo(),
    connection_request_enabled: em([
        ed(),
        ep()
    ]),
    inflight: ed(),
    persistence_error: em([
        ei(),
        ep()
    ]),
    link_identity_error: em([
        ei(),
        ep()
    ]),
    listener: e$,
    mqtt_last_seen: em([
        eo(),
        ep()
    ]),
    desired: ez(eO),
    endpoint_notice: ez(ei()),
    manual_steps: ez(ef(ei()))
}), eC = em([
    ex("pending"),
    ex("unavailable")
]), eP = em([
    eM,
    eg({
        state: eC,
        reason: ei()
    })
]), eE = eg({
    id: ei(),
    name: ei()
}), eR = eg({
    configured: ei(),
    effective: ei(),
    available: ef(ei()),
    reason: ei()
}), eI = eg({
    phase: em([
        ex("not_started"),
        ex("collecting_identity"),
        ex("retrying_identity"),
        ex("unsupported"),
        ex("configuring"),
        ex("verifying"),
        ex("wan_bootstrap_pending"),
        ex("verified"),
        ex("retrying"),
        ex("offline")
    ]),
    generation: eo(),
    error: em([
        ei(),
        ep()
    ])
});
eg({
    success: ed(),
    output: ez(ei()),
    error: ez(ei())
});
const eN = em([
    ex("factory"),
    ex("firmware"),
    ex("builtin")
]), eD = eg({
    detected: ed(),
    device: ei(),
    has_data: ed(),
    sha256: ei(),
    data: ei()
}), eT = eg({
    exists: ed(),
    path: ei(),
    size: eo(),
    sha256: ei(),
    data: ei()
}), eA = eg({
    source: eN,
    active_path: ei(),
    size: eo(),
    sha256: ei(),
    data: ei(),
    factory: eD,
    firmware: eT
}), eL = eg({
    error: ei()
});
em([
    eA,
    eL
]);
const eq = eg({
    success: ed(),
    path: ei(),
    size: eo(),
    sha256: ei()
});
em([
    eq,
    eL
]), eg({
    data: ei()
});
const eU = eg({
    acs: ed(),
    mqtt: ed(),
    npu: ed(),
    "device-hl202": ed(),
    "device-hwtc": ed(),
    "device-star": ed(),
    "device-zte": ed()
}), eZ = eg({
    optical: ed(),
    bridge_offload: ed(),
    omci_mib: ed(),
    mqtt_telemetry: ed(),
    hl202_management: ed(),
    cwmp: ed(),
    command_provisioning: ed()
}), eB = eg({
    status: ed(),
    config: ed(),
    sync: ed(),
    hardware: ed(),
    calibration: ed(),
    hl202: ed(),
    about: ed()
}), eW = eg({
    schema_version: ex(1),
    version: ei(),
    features: eU,
    functions: eZ,
    pages: eB,
    adapters: ef(eE)
}), eV = em([
    eg({
        valid: ex(!0),
        revision: ei(),
        devices: eo()
    }),
    eg({
        error: ei()
    })
]), eF = em([
    ex("auto"),
    ex("manual")
]), eJ = ex("diff"), eX = eg({
    state: ei(),
    enabled: ed(),
    reason: ez(em([
        ei(),
        ep()
    ])),
    revision: ez(ei()),
    vlan: ez(eo()),
    updated_at: ez(eo())
}), eH = em([
    ex("online"),
    ex("waiting_inform"),
    ex("offline_or_stale"),
    ex("waiting_transport")
]), eG = eg({
    cwmp_id: ei(),
    state: eH,
    optical_online: ed(),
    last_inform: em([
        eo(),
        ep()
    ]),
    age_seconds: em([
        eo(),
        ep()
    ])
}), eK = em([
    ex("waiting"),
    ex("wan_reconciling"),
    ex("wan_verifying"),
    ex("wifi_reconciling"),
    ex("discovering"),
    ex("reading"),
    ex("disabling"),
    ex("disabling_read"),
    ex("writing"),
    ex("verifying"),
    ex("settling"),
    ex("completed"),
    ex("not_started"),
    ex("reset_pending"),
    ex("interrupted"),
    ex("recovering"),
    ex("waiting_management"),
    ex("waiting_task")
]), eQ = em([
    ex("device_service"),
    ex("ssid"),
    ex("port_binding"),
    ex("wan_activation")
]), eY = eg({
    name: ei(),
    desired: ei()
}), e0 = eg({
    id: ei(),
    name: ez(em([
        ei(),
        ep()
    ])),
    kind: eQ,
    service_type: ei(),
    state: ei(),
    reason: ez(ei()),
    revision: ez(ei()),
    current_revision: ez(ed()),
    management_fresh: ez(ed()),
    operation_id: ez(eo()),
    task_id: ez(em([
        eo(),
        ep()
    ])),
    updated_at: ez(eo()),
    changes: ez(ef(eY))
}), e1 = em([
    ex("plan"),
    ex("apply")
]), e2 = eg({
    wan: ei(),
    wlan: ei(),
    binding: ei()
}), e5 = eg({
    state: ei(),
    requested: ei(),
    contract: em([
        ei(),
        ep()
    ]),
    reason: ei(),
    cache_hit: ed(),
    schema: ei(),
    capabilities: em([
        e2,
        ep()
    ])
}), e4 = eg({
    parent: eo(),
    connection: eo(),
    state: ei(),
    service_list: ei(),
    kind: ei(),
    baseline: em([
        ef(eo()),
        ep()
    ])
}), e8 = eg({
    state: ei(),
    reason: ez(ei()),
    task_id: ez(em([
        eo(),
        ep()
    ])),
    instance: ez(eo()),
    cwmp_id: ez(ei())
}), e3 = em([
    ex("waiting"),
    ex("inventory"),
    ex("classifying"),
    ex("adding_parent"),
    ex("child_names"),
    ex("adding_child"),
    ex("delete_guard"),
    ex("deleting"),
    ex("verify_delete"),
    ex("empty_parent"),
    ex("deleting_parent"),
    ex("verify_parent_delete"),
    ex("next"),
    ex("done")
]), e6 = eg({
    owned: ef(eo()),
    pending: em([
        ei(),
        ep()
    ]),
    pending_instance: em([
        eo(),
        ep()
    ])
}), e7 = em([
    ex("waiting"),
    ex("inventory"),
    ex("adding"),
    ex("verify_add"),
    ex("deleting"),
    ex("verify_delete"),
    ex("reading_disable"),
    ex("disabling"),
    ex("verifying_disable"),
    ex("next"),
    ex("done")
]), e9 = em([
    ex("disable"),
    ex("preserve"),
    ex("delete")
]), te = eg({
    parent: eo(),
    child: eo(),
    service: ei(),
    vlan: ei()
}), tt = eg({
    state: eK,
    items: ef(e0),
    backend: ez(eR),
    operation_id: ez(eo()),
    device: ez(ei()),
    optical_sn: ez(ei()),
    cwmp_id: ez(ei()),
    revision: ez(ei()),
    mode: ez(e1),
    started_at: ez(eo()),
    completed_at: ez(em([
        eo(),
        ep()
    ])),
    current_revision: ez(ed()),
    management_fresh: ez(ed()),
    reason: ez(ei()),
    error: ez(ei()),
    attempts: ez(eo()),
    next_retry_at: ez(eo()),
    reconcile_reason: ez(ei()),
    cwmp_contract: ez(e5),
    wan_objects: ez(ey(ei(), e4)),
    wan_lifecycle: ez(ey(ei(), e8)),
    wan_stage: ez(e3),
    wifi_objects: ez(e6),
    wifi_lifecycle: ez(ey(ei(), e8)),
    wifi_stage: ez(e7),
    wifi_cleanup: ez(e9),
    native_ownership: ez(ey(ei(), te)),
    write_performed: ez(ed()),
    readback_verified: ez(ed())
}), tr = em([
    ex("not_configured"),
    ex("stale_revision"),
    ex("stale_management"),
    ex("verified"),
    ex("attention_required"),
    ex("accepted_unverified"),
    ex("pending"),
    ex("recovering"),
    ex("waiting_management")
]), ta = eg({
    device: ei(),
    name: em([
        ei(),
        ep()
    ]),
    group: em([
        ei(),
        ep()
    ]),
    group_name: em([
        ei(),
        ep()
    ]),
    template: em([
        ei(),
        ep()
    ]),
    template_name: em([
        ei(),
        ep()
    ]),
    optical_sn: ei(),
    adapter: ei(),
    omci_management: eX,
    management: em([
        eG,
        ep()
    ]),
    acs_bootstrap: eP,
    provisioning: tt,
    services: ef(e0),
    ssids: ef(e0),
    wifi_sync: tr
}), tn = em([
    ex("discovering"),
    ex("comparing"),
    ex("planning"),
    ex("applying"),
    ex("verifying"),
    ex("configuring_listener"),
    ex("cleaning_previous"),
    ex("waiting_devices"),
    ex("ready"),
    ex("awaiting_apply"),
    ex("verified"),
    ex("blocked"),
    ex("retry_wait")
]), ti = eg({
    enabled: ed(),
    mode: eF,
    vlan: ef(eo()),
    priority: eo(),
    address: ei(),
    acs_url: ei(),
    port: eo(),
    path: ei(),
    dhcp_enabled: ed()
}), ts = eg({
    operation: ei(),
    key: ei(),
    value: ef(ei())
}), to = eg({
    state: tn,
    error: em([
        ei(),
        ep()
    ]),
    inflight: ed(),
    ready: ed(),
    desired_version: em([
        ei(),
        ep()
    ]),
    applied_version: em([
        ei(),
        ep()
    ]),
    next_retry_at: eo(),
    attempts: eo(),
    desired: em([
        ti,
        ep()
    ]),
    applied: em([
        ti,
        ep()
    ]),
    previous: em([
        ti,
        ep()
    ]),
    plan: ef(ts)
}), tl = eg({
    desired: em([
        eO,
        ep()
    ]),
    state: ei()
}), td = eg({
    id: ei(),
    name: em([
        ei(),
        ep()
    ]),
    template: ei()
}), tc = eg({
    enabled: ed(),
    mode: eF,
    method: eJ,
    revision: ei(),
    triggers: ef(ei()),
    interval_minutes: eo(),
    error: em([
        ei(),
        ep()
    ]),
    devices: ef(ta),
    management_network: to,
    omci_management: tl,
    groups: ef(td),
    pending_devices: ef(ei()),
    onu_pins: ez(ey(ei(), eo())),
    config_error: ez(em([
        ei(),
        ep()
    ]))
});
em([
    tc,
    eL
]);
const tp = eg({
    enabled: em([
        ed(),
        ep()
    ]),
    routed_enabled: em([
        ed(),
        ep()
    ]),
    bridge_enabled: em([
        ed(),
        ep()
    ]),
    engine_attached: em([
        ed(),
        ep()
    ]),
    forwarding_verified: em([
        ed(),
        ep()
    ])
}), tu = eg({
    entity_id: eo(),
    port_id: em([
        eo(),
        ep()
    ])
}), t_ = eg({
    entity_id: eo(),
    filter_list_hex: em([
        ei(),
        ep()
    ]),
    forward_operation: em([
        eo(),
        ep()
    ]),
    number_of_entries: em([
        eo(),
        ep()
    ])
}), tf = eg({
    entity_id: eo(),
    received_frame_rules_hex: em([
        ef(ei()),
        ep()
    ]),
    error: em([
        ei(),
        ep()
    ])
}), tb = eg({
    age_seconds: eo(),
    gem_ports: ef(tu),
    vlan_filters: ef(t_),
    vlan_operations: ef(tf)
}), tg = eg({
    source: ei(),
    unit: ei(),
    reason: em([
        ei(),
        ep()
    ]),
    raw: em([
        ei(),
        ep()
    ]),
    age_seconds: em([
        eo(),
        ep()
    ])
}), th = eg({
    interface: ei(),
    gem_ports: em([
        ef(eo()),
        ep()
    ]),
    vlan_id: em([
        eo(),
        ep()
    ]),
    onu_inventory: em([
        tb,
        ep()
    ]),
    tx_bytes: em([
        eo(),
        ep()
    ]),
    rx_bytes: em([
        eo(),
        ep()
    ]),
    current_tx_kbps: em([
        eo(),
        ep()
    ]),
    current_rx_kbps: em([
        eo(),
        ep()
    ]),
    olt_channel_gem: ez(eo()),
    forwarding_verified: ez(ed()),
    offload: tp,
    measurements: ey(ei(), tg)
});
eg({});
const tm = eg({
    entry: em([
        ex(0),
        ex(1),
        ex(2)
    ]),
    username: ei(),
    active: ed()
}), tv = eg({
    mqtt_mac: ei(),
    optical_sn: em([
        ei(),
        ep()
    ]),
    onu_id: em([
        eo(),
        ep()
    ]),
    binding_generation: ei(),
    last_seen: eo(),
    reason: ei()
}), ty = em([
    ex("executed"),
    ex("dispatched"),
    ex("timeout"),
    ex("error")
]), tw = eg({
    target: ei(),
    status: ty,
    request_id: ez(ei()),
    exit_code: ez(eo()),
    output: ez(ei()),
    output_truncated: ed(),
    error: ez(ei())
}), tx = eg({
    target: tv,
    result: tw,
    binding_current: ed()
}), tk = em([
    ex("not_applicable"),
    ex("accepted_and_saved"),
    ex("unconfirmed")
]), tz = eg({
    code: ei(),
    message: ei()
});
em([
    eg({
        schema_version: ex(1),
        operation: tx,
        accounts: em([
            ef(tm),
            ep()
        ]),
        write_status: tk
    }),
    eg({
        schema_version: eo(),
        error: tz
    })
]);
const tj = eg({
    optical_sn: ei(),
    onu_id: eo(),
    binding_generation: ei()
}), tS = eg({
    mqtt_mac: ei(),
    binding_generation: ei()
}), t$ = em([
    tj,
    tS
]);
eg({
    target: t$
});
const tO = em([
    eg({
        kind: ex("exec"),
        script: ei(),
        timeout_seconds: eo()
    }),
    eg({
        kind: ex("accounts_read")
    }),
    eg({
        kind: ex("account_set_password"),
        entry: eo(),
        password: ei()
    }),
    eg({
        kind: ex("account_set_active"),
        entry: eo(),
        active: ed()
    })
]), tM = eg({
    schema_version: eo(),
    target: tj,
    action: tO
}), tC = eg({
    optical_sn: ei(),
    onu_id: eo(),
    model: ei(),
    optical_online: ed(),
    can_execute: ed(),
    mqtt: em([
        tv,
        ep()
    ]),
    report_revision: em([
        eo(),
        ep()
    ])
});
em([
    eg({
        schema_version: ex(1),
        operation: tx
    }),
    eg({
        schema_version: eo(),
        error: tz
    })
]), eg({
    target: t$,
    script: ei(),
    timeout_seconds: eo()
});
const tP = em([
    eg({
        schema_version: ex(1),
        devices: ef(tC),
        sources: ef(tv)
    }),
    eg({
        schema_version: eo(),
        error: tz
    })
]);
em([
    eg({
        method: ex("list")
    }),
    eg({
        method: ex("report"),
        target: tj
    }),
    eg({
        method: ex("source_report"),
        target: tS
    }),
    eg({
        method: ex("run"),
        request: tM
    })
]);
const tE = em([
    ex("received"),
    ex("report_unavailable")
]), tR = eg({
    value: new eu({
        type: "unknown"
    }),
    member: ei(),
    unit: em([
        ei(),
        ep()
    ])
}), tI = eg({
    name: ei(),
    bytes: eo(),
    encoding: ei(),
    text: em([
        ei(),
        ep()
    ]),
    text_omitted: ed()
}), tN = eg({
    schema_version: eo(),
    compressed_bytes: eo(),
    decompressed_bytes: eo(),
    fields: ey(ei(), tR),
    members: ef(tI),
    errors: ef(ei())
}), tD = eg({
    revision: eo(),
    last_received: eo(),
    last_processed_receipt: em([
        eo(),
        ep()
    ]),
    last_good: em([
        eo(),
        ep()
    ]),
    error: em([
        ei(),
        ep()
    ]),
    report: em([
        tN,
        ep()
    ])
});
em([
    eg({
        schema_version: ex(1),
        target: tv,
        report: em([
            tD,
            ep()
        ]),
        state: tE
    }),
    eg({
        schema_version: ex(1),
        target: tv,
        report: em([
            tD,
            ep()
        ]),
        read_only: ex(!0)
    }),
    eg({
        schema_version: eo(),
        error: tz
    })
]), eg({
    target: t$
}), eg({
    target: t$,
    kind: ej,
    entry: eo(),
    password: ei(),
    active: ed()
});
const tT = eg({
    accepted: eo(),
    rejected: eo(),
    read_errors: eo(),
    handled: eo(),
    max_intake_us: eo(),
    max_handler_us: eo()
}), tA = ex("pending"), tL = eg({
    phase: em([
        ex("starting"),
        ex("upload"),
        ex("tables")
    ]),
    received: eo(),
    expected: em([
        eo(),
        ep()
    ])
}), tq = ex("ready"), tU = em([
    eg({
        status: tA,
        progress: ez(tL)
    }),
    eg({
        status: tq,
        chunk: eo(),
        chunks: eo(),
        bytes: eo(),
        data: ei()
    })
]);
em([
    tU,
    eL
]);
const tZ = eg({
    status: tA,
    job: ei()
}), tB = eg({
    released: ed()
});
eg({
    job: ei()
}), eg({
    job: ei(),
    chunk: eo()
}), em([
    tZ,
    eL
]);
const tW = eg({
    accepting: ed(),
    running: eo(),
    stored: eo(),
    bytes: eo(),
    running_limit: eo(),
    stored_limit: eo(),
    bytes_limit: eo(),
    result_bytes_limit: eo()
}), tV = eg({
    mac: ei(),
    ip: ei(),
    band: ei(),
    rssi_dbm: em([
        eo(),
        ep()
    ]),
    rx_rate_mbps: em([
        eo(),
        ep()
    ]),
    tx_rate_mbps: em([
        eo(),
        ep()
    ])
}), tF = em([
    ex("unknown"),
    ex("octets"),
    ex("string"),
    ex("unsigned_integer"),
    ex("table"),
    ex("signed_integer"),
    ex("pointer"),
    ex("bit_field"),
    ex("enumeration"),
    ex("counter")
]), tJ = eg({
    id: ei(),
    url: ei()
}), tX = eg({
    name: ei(),
    kind: tF,
    index: eo(),
    mask: eo(),
    size: eo(),
    read: ed(),
    write: ed(),
    set_by_create: ed(),
    avc: ed(),
    optional: ed(),
    deprecated: ed(),
    default_hex: em([
        ei(),
        ep()
    ]),
    reference: tJ
}), tH = em([
    eg({
        type: ex("unsigned"),
        value: eo()
    }),
    eg({
        type: ex("signed"),
        value: eo()
    }),
    eg({
        type: ex("decimal"),
        value: ei()
    }),
    eg({
        type: ex("text"),
        value: em([
            ei(),
            ep()
        ])
    }),
    eg({
        type: ex("octets"),
        hex: ei()
    }),
    eg({
        type: ex("table_length"),
        bytes: eo()
    })
]), tG = eg({
    raw_hex: ei(),
    value: tH,
    sequences: ef(eo())
}), tK = eg({
    definition: tX,
    value: em([
        tH,
        ep()
    ]),
    observations: ef(tG)
}), tQ = em([
    ex("layout"),
    ex("name_only"),
    ex("unknown")
]), tY = eg({
    class_id: eo(),
    name: em([
        ei(),
        ep()
    ]),
    entities: eo(),
    records: eo(),
    support: tQ
}), t0 = eg({
    code: ei(),
    message: ei(),
    offset: eo(),
    mask: eo()
}), t1 = eg({
    class_id: eo(),
    entity_id: eo(),
    name: em([
        ei(),
        ep()
    ]),
    support: tQ,
    reference: em([
        tJ,
        ep()
    ]),
    sequences: ef(eo()),
    attributes: ef(tK),
    diagnostics: ef(t0)
}), t2 = ex("ready"), t5 = eg({
    class_id: eo(),
    entity_id: eo(),
    sequence: eo(),
    attribute_mask: eo(),
    raw_hex: ei(),
    consumed: eo(),
    remaining_hex: ei(),
    undecoded_mask: eo()
}), t4 = eg({
    raw_hex: ei(),
    filter_outer_priority: eo(),
    filter_outer_vid: eo(),
    filter_outer_tpid_dei: eo(),
    filter_inner_priority: eo(),
    filter_inner_vid: eo(),
    filter_inner_tpid_dei: eo(),
    filter_ethertype: eo(),
    tags_to_remove: eo(),
    treatment_outer_priority: eo(),
    treatment_outer_vid: eo(),
    treatment_outer_tpid_dei: eo(),
    treatment_inner_priority: eo(),
    treatment_inner_vid: eo(),
    treatment_inner_tpid_dei: eo(),
    delete_entry: ed()
}), t8 = eg({
    class_id: eo(),
    entity_id: eo(),
    attribute: tX,
    collected: ed(),
    error: em([
        ei(),
        ep()
    ]),
    raw_hex: ei(),
    rows: ef(ei()),
    vlan_rules: ef(t4)
}), t3 = eg({
    schema_version: ex(1),
    reference_version: ei(),
    onu_id: em([
        eo(),
        ep()
    ]),
    uploaded_complete: ed(),
    expected_records: eo(),
    received_records: eo(),
    decoded_records: eo(),
    partial_records: eo(),
    basic_records: eo(),
    tables_requested: ed(),
    tables_collected: ed(),
    classes: ef(tY),
    entities: ef(t1),
    records: ef(t5),
    tables: ef(t8),
    diagnostics: ef(t0)
}), t6 = eg({
    status: t2,
    report: t3
});
eg({
    onu_id: eo(),
    optical_sn: ei(),
    tables: ed()
});
const t7 = em([
    eg({
        status: ex("success"),
        enabled: ed()
    }),
    eg({
        status: ex("error"),
        error: ei()
    })
]);
eg({
    enabled: ed(),
    bridge: ei(),
    wan_upstream: ed(),
    wan_downstream: ed(),
    onu_bridge: ed()
});
const t9 = eg({
    index: ei(),
    state: ei(),
    pkt_type: ei(),
    orig_tuple: ei(),
    new_tuple: ei(),
    eth: ei(),
    vlan: ei(),
    packets: eo(),
    bytes: eo(),
    counters_valid: ed(),
    packets_exact: ei(),
    bytes_exact: ei()
}), re = eg({
    sampled_at_ms: eo(),
    errors: ef(ei()),
    config_valid: ed(),
    engine_valid: ed(),
    mask_valid: ed(),
    routed_mask_valid: ed(),
    debug_valid: ed(),
    flows_valid: ed(),
    entries_valid: ed(),
    counters_valid: ed(),
    hooks_valid: ed(),
    total_packets_exact: ei(),
    total_bytes_exact: ei(),
    supported: ed(),
    engine_attached: ed(),
    bridge_offload_enabled: ed(),
    wan_upstream: ed(),
    wan_downstream: ed(),
    onu_bridge: ed(),
    bridge_offload_mask: eo(),
    routed_offload_mask: eo(),
    bridge_offload_debug: ed(),
    bridge: ei(),
    active_ports: ef(ei()),
    fw4_hooks_ready: ed(),
    total_entries: eo(),
    bound_entries: eo(),
    bound_ipv4_entries: eo(),
    bound_ipv6_entries: eo(),
    total_packets: eo(),
    total_bytes: eo(),
    bound_flows: ef(t9)
}), rt = eg({
    equipment_id: em([
        ei(),
        ep()
    ]),
    hardware_version: em([
        ei(),
        ep()
    ]),
    software_images: ef(ei()),
    omcc_version: em([
        eo(),
        ep()
    ]),
    errors: ef(ei())
}), rr = eg({
    desired: ey(ei(), eo()),
    active: ey(ei(), eo()),
    pending_restart: ed(),
    allocation_blocked: ed(),
    startup_error: em([
        ei(),
        ep()
    ]),
    config_error: em([
        ei(),
        ep()
    ])
}), ra = em([
    ex("optical_on"),
    ex("optical_off"),
    ex("optical_status"),
    ex("optical_reload"),
    ex("optical_reinitialize"),
    ex("optical_shutdown")
]), rn = em([
    ex("success"),
    ex("error")
]), ri = em([
    ex("enabled"),
    ex("disabled"),
    ex("unknown")
]), rs = eg({
    schema_version: ex(1),
    status: rn,
    action: ra,
    desired_enabled: em([
        ed(),
        ep()
    ]),
    tx_enabled: em([
        ed(),
        ep()
    ]),
    actor_state: ri,
    hardware_ready: ed(),
    discovery_active: ed(),
    cleanup_pending: ed(),
    error: em([
        tz,
        ep()
    ])
});
eg({
    enabled: ed()
});
const ro = eg({
    model: ei(),
    wavelength_tx_nm: eo(),
    wavelength_rx_nm: eo(),
    phy_rate_downlink_gbps: eo(),
    phy_rate_uplink_gbps: eo(),
    tx_power_dbm: em([
        eo(),
        ep()
    ]),
    laser_bias_current_ma: em([
        eo(),
        ep()
    ]),
    temperature_celsius: em([
        eo(),
        ep()
    ]),
    vcc_voltage: em([
        eo(),
        ep()
    ]),
    cdr_locked: em([
        ed(),
        ep()
    ]),
    tx_enabled: ez(ed()),
    measurements: ey(ei(), tg)
}), rl = em([
    ex("o1_initial"),
    ex("o2_standby"),
    ex("o3_serial_number"),
    ex("o4_ranging"),
    ex("o5_operation"),
    ex("o6_intermittent_lods"),
    ex("o7_emergency_stop")
]), rd = eg({
    restarting: ex(!0)
}), rc = eg({
    calls: eo(),
    failures: eo(),
    last_us: eo(),
    max_us: eo(),
    total_us: eo()
}), rp = eg({
    port: eo(),
    interface: ei(),
    carrier: ed(),
    status: ei(),
    onu_id: ez(eo()),
    onu_sn: ez(ei()),
    link_state: ei(),
    reserved_sn: ez(ei())
}), ru = eg({
    channel_2g: em([
        eo(),
        ep()
    ]),
    channel_5g: em([
        eo(),
        ep()
    ]),
    bandwidth_5g: em([
        ei(),
        ep()
    ]),
    tx_power_pct: em([
        eo(),
        ep()
    ]),
    measurements: ey(ei(), tg)
}), r_ = eg({
    onu_id: eo(),
    vendor: ei(),
    model: ei(),
    serial_number: ei(),
    state: rl,
    business_status: eI,
    management: em([
        eG,
        ep()
    ]),
    provisioning: em([
        tt,
        ep()
    ]),
    services: ef(e0),
    ssids: ef(e0),
    wifi_sync: tr,
    identity: em([
        rt,
        ep()
    ]),
    identity_age_seconds: em([
        eo(),
        ep()
    ]),
    identity_current: ed(),
    fiber_distance_m: em([
        eo(),
        ep()
    ]),
    ranging_delay_rtd_ns: em([
        eo(),
        ep()
    ]),
    equalization_delay_bits: em([
        eo(),
        ep()
    ]),
    optical_rx_power_dbm: em([
        eo(),
        ep()
    ]),
    optical_tx_power_dbm: em([
        eo(),
        ep()
    ]),
    firmware_version: ei(),
    hardware_version: ei(),
    uptime_seconds: em([
        eo(),
        ep()
    ]),
    data_path: th,
    wifi_mesh: ru,
    connected_clients: em([
        ef(tV),
        ep()
    ]),
    measurements: ey(ei(), tg)
}), rf = eg({
    id: ei(),
    last_seen_sec_ago: eo(),
    last_payload_bytes: eo()
}), rb = eg({
    ubus: ez(ey(ei(), rc)),
    jobs: ez(tW),
    onu_pinning: ez(rr),
    fpga_status: ei(),
    provisioning: em([
        tc,
        ep()
    ]),
    optical_transceiver: ro,
    switch_ports: ef(rp),
    sub_gateways: ef(r_),
    telemetry_gateways: ef(rf),
    npu: ez(re),
    ipc: ez(tT)
}), rg = em([
    ex("plan"),
    ex("apply"),
    ex("management_plan"),
    ex("management_apply"),
    ex("reset_state"),
    ex("reconcile"),
    ex("retry")
]), rh = em([
    eg({
        operation_ids: ef(eo()),
        revision: ei()
    }),
    eg({
        started: ex(!0),
        mode: e1
    }),
    eg({
        reset: ex(!0),
        device: ei()
    }),
    eg({
        operation_ids: ef(eo()),
        mode: e1,
        reconcile: ez(ed()),
        retry: ez(ed())
    }),
    eL
]);
eg({
    action: rg,
    target: ei(),
    management: ez(ed()),
    item: ez(ei())
});
let rm = eg({
    error: em([
        ei(),
        eg({
            code: ei(),
            message: ei()
        })
    ])
});
class rv extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function ry(e) {
    let t = rm.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new rv("rpc", e) : new rv(e.code, e.message);
    }
    return e;
}
const rw = {
    parse (e) {
        let t = tP.parse(ry(e));
        if ("object" == typeof t && null !== t && "error" in t) throw ry(t), Error("Unexpected RPC error");
        return t;
    }
}, rx = {
    parse (e) {
        let t = rh.parse(ry(e));
        if ("error" in t) throw Error(t.error);
        return t;
    }
};
ey(ei(), eg({
    carrier: ez(ed()),
    mac: ez(ei()),
    link: ez(eg({
        speed: ez(eo()),
        duplex: ez(ei()),
        autoneg: ez(ed())
    })),
    stats: ez(ey(ei(), eo()))
}));
const rk = {
    getCapabilities: {
        parse: (e)=>eW.parse(ry(e))
    },
    opticalStatus: rs,
    opticalSet: rs,
    getStatus: {
        parse: (e)=>rb.parse(ry(e))
    },
    getSync: {
        parse: (e)=>tc.parse(ry(e))
    },
    configCheck: {
        parse (e) {
            if ("object" == typeof e && null !== e && "error" in e && ("valid" in e || "revision" in e || "devices" in e)) throw Error("Mixed configuration check result");
            return eV.parse(e);
        }
    },
    npuStatus: re,
    configReload: {
        parse: (e)=>tc.parse(ry(e))
    },
    restartService: {
        parse: (e)=>rd.parse(ry(e))
    },
    sync: {
        parse: (e)=>rx.parse(ry(e))
    },
    npuSet: t7,
    mibStart: {
        parse: (e)=>tZ.parse(ry(e))
    },
    mibResult: {
        parse: (e)=>tU.parse(ry(e))
    },
    jobRelease: {
        parse: (e)=>tB.parse(ry(e))
    },
    hl202List: {
        parse: (e)=>rw.parse(ry(e))
    },
    hl202Report: {
        parse: (e)=>tZ.parse(ry(e))
    },
    hl202AccountsStart: {
        parse: (e)=>tZ.parse(ry(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>tZ.parse(ry(e))
    },
    hl202ExecStart: {
        parse: (e)=>tZ.parse(ry(e))
    },
    jobResult: {
        parse: (e)=>tU.parse(ry(e))
    },
    getCalibration: {
        parse: (e)=>eA.parse(ry(e))
    },
    saveCalibration: {
        parse: (e)=>eq.parse(ry(e))
    },
    applyCalibration: {
        parse: (e)=>tZ.parse(ry(e))
    }
};
function rz() {
    var e;
    let r, a, n, i, s, o, l, d, c, p, u, f, b, g, h, m, v, y, w, x, k, z, j;
    return t ??= (e = L.rpc, r = e.declare({
        object: "fttr",
        method: "get_capabilities",
        reject: !0
    }), a = e.declare({
        object: "fttr",
        method: "optical_status",
        reject: !0
    }), n = e.declare({
        object: "fttr",
        method: "optical_set",
        params: [
            "enabled"
        ],
        reject: !0
    }), i = e.declare({
        object: "fttr",
        method: "get_status",
        reject: !0
    }), s = e.declare({
        object: "fttr",
        method: "get_sync",
        reject: !0
    }), o = e.declare({
        object: "fttr",
        method: "config_check",
        reject: !0
    }), l = e.declare({
        object: "fttr",
        method: "npu_status",
        reject: !0
    }), d = e.declare({
        object: "fttr",
        method: "config_reload",
        reject: !0
    }), c = e.declare({
        object: "fttr",
        method: "restart_service",
        reject: !0
    }), p = e.declare({
        object: "fttr",
        method: "sync",
        params: [
            "action",
            "target",
            "management",
            "item"
        ],
        reject: !0
    }), u = e.declare({
        object: "fttr",
        method: "npu_set",
        params: [
            "enabled",
            "bridge",
            "wan_upstream",
            "wan_downstream",
            "onu_bridge"
        ],
        reject: !0
    }), f = e.declare({
        object: "fttr",
        method: "mib_start",
        params: [
            "onu_id",
            "optical_sn",
            "tables"
        ],
        reject: !0
    }), b = e.declare({
        object: "fttr",
        method: "mib_result",
        params: [
            "job",
            "chunk"
        ],
        reject: !0
    }), g = e.declare({
        object: "fttr",
        method: "job_release",
        params: [
            "job"
        ],
        reject: !0
    }), h = e.declare({
        object: "fttr",
        method: "hl202_list",
        reject: !0
    }), m = e.declare({
        object: "fttr",
        method: "hl202_report",
        params: [
            "target"
        ],
        reject: !0
    }), v = e.declare({
        object: "fttr",
        method: "hl202_accounts_start",
        params: [
            "target"
        ],
        reject: !0
    }), y = e.declare({
        object: "fttr",
        method: "hl202_account_update",
        params: [
            "target",
            "kind",
            "entry",
            "password",
            "active"
        ],
        reject: !0
    }), w = e.declare({
        object: "fttr",
        method: "hl202_exec_start",
        params: [
            "target",
            "script",
            "timeout_seconds"
        ],
        reject: !0
    }), x = e.declare({
        object: "fttr",
        method: "job_result",
        params: [
            "job",
            "chunk"
        ],
        reject: !0
    }), k = e.declare({
        object: "fttr",
        method: "get_calibration",
        reject: !0
    }), z = e.declare({
        object: "fttr",
        method: "save_calibration",
        params: [
            "data"
        ],
        reject: !0
    }), j = e.declare({
        object: "fttr",
        method: "apply_calibration",
        reject: !0
    }), {
        getCapabilities: async ()=>rk.getCapabilities.parse(await r()),
        opticalStatus: async ()=>rk.opticalStatus.parse(await a()),
        opticalSet: async (e)=>rk.opticalSet.parse(await n(e.enabled)),
        getStatus: async ()=>rk.getStatus.parse(await i()),
        getSync: async ()=>rk.getSync.parse(await s()),
        configCheck: async ()=>rk.configCheck.parse(await o()),
        npuStatus: async ()=>rk.npuStatus.parse(await l()),
        configReload: async ()=>rk.configReload.parse(await d()),
        restartService: async ()=>rk.restartService.parse(await c()),
        sync: async (e)=>rk.sync.parse(await p(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>rk.npuSet.parse(await u(e.enabled, e.bridge, e.wan_upstream, e.wan_downstream, e.onu_bridge)),
        mibStart: async (e)=>rk.mibStart.parse(await f(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>rk.mibResult.parse(await b(e.job, e.chunk)),
        jobRelease: async (e)=>rk.jobRelease.parse(await g(e.job)),
        hl202List: async ()=>rk.hl202List.parse(await h()),
        hl202Report: async (e)=>rk.hl202Report.parse(await m(e.target)),
        hl202AccountsStart: async (e)=>rk.hl202AccountsStart.parse(await v(e.target)),
        hl202AccountUpdate: async (e)=>rk.hl202AccountUpdate.parse(await y(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>rk.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>rk.jobResult.parse(await x(e.job, e.chunk)),
        getCalibration: async ()=>rk.getCalibration.parse(await k()),
        saveCalibration: async (e)=>rk.saveCalibration.parse(await z(e.data)),
        applyCalibration: async ()=>rk.applyCalibration.parse(await j())
    });
}
L.rpc.declare({
    object: "luci-rpc",
    method: "getNetworkDevices",
    expect: {
        "": {}
    },
    reject: !0
});
const rj = async ()=>rz().getStatus(), rS = async ()=>rz().opticalStatus(), r$ = async (e)=>rz().opticalSet({
        enabled: e
    }), rO = async (e, t, r)=>rz().mibStart({
        onu_id: e,
        optical_sn: t,
        tables: r
    }), rM = async (e, t)=>rz().mibResult({
        job: e,
        chunk: t
    }), rC = async (e)=>rz().jobRelease({
        job: e
    });
function rP(e) {
    let t = "none" === e.tone ? "" : `fttr-badge fttr-badge-${e.tone}`, r = e.class ? ` ${e.class}` : "", a = o("span", {
        class: `${t}${r}`.trim(),
        children: e.children
    });
    return e.title && a.setAttribute("title", e.title), a;
}
const rE = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
};
function rR(e) {
    var t;
    let r = (t = e.state) ? "o5_operation" === t ? {
        tone: "success",
        label: rE.o5_operation,
        title: t
    } : {
        tone: "warning",
        label: rE[t] ?? l(t),
        title: t
    } : {
        tone: "none",
        label: "\u2014"
    };
    return o(rP, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
function rI(e) {
    var t;
    let r = (t = e.status) ? {
        tone: "verified" === t.phase ? "success" : t.error || "wan_bootstrap_pending" === t.phase ? "warning" : "neutral",
        label: `${({
            not_started: _("Not started"),
            collecting_identity: _("Collecting identity"),
            retrying_identity: _("Retrying identity"),
            unsupported: _("Unsupported"),
            configuring: _("Configuring"),
            verifying: _("Verifying"),
            wan_bootstrap_pending: _("WAN pending"),
            verified: _("Verified"),
            retrying: _("Retrying"),
            offline: _("Offline")
        })[t.phase]} \xb7 ${t.generation}${t.error ? ` \xb7 ${t.error}` : ""}`,
        title: t.error || void 0
    } : {
        tone: "neutral",
        label: "\u2014"
    };
    return o(rP, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const rN = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
};
function rD(e) {
    var t;
    let r, a, n, i, s, d, p = (t = e.management, r = t?.state, a = c(t?.age_seconds ?? (t?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - t.last_inform) : null)), i = (n = t?.last_inform ? new Date(1000 * t.last_inform).toLocaleString() : null) ? _("Last Inform: %s").replace("%s", n) : void 0, s = "\u2014", d = "none", "online" === r ? (d = "success", s = rN.online) : "waiting_inform" === r ? (d = "warning", s = rN.waiting_inform) : "offline_or_stale" === r ? (d = "danger", s = rN.offline_or_stale) : r && (d = "neutral", s = l(r)), {
        tone: d,
        label: a && r ? `${s} \xb7 ${a}` : s,
        title: i
    });
    return o(rP, {
        tone: p.tone,
        title: p.title,
        children: p.label
    });
}
const rT = {
    waiting: _("Waiting"),
    wan_reconciling: _("WAN reconciling"),
    wan_verifying: _("WAN verifying"),
    wifi_reconciling: _("Wi-Fi reconciling"),
    discovering: _("Discovering"),
    reading: _("Reading"),
    disabling: _("Disabling"),
    disabling_read: _("Disabling read"),
    writing: _("Writing"),
    verifying: _("Verifying"),
    settling: _("Settling"),
    completed: _("Completed"),
    interrupted: _("Interrupted"),
    recovering: _("Recovering"),
    waiting_management: _("Waiting management"),
    waiting_task: _("Waiting task"),
    reset_pending: _("Reset pending"),
    failed: _("Failed"),
    error: _("Error"),
    blocked: _("Blocked"),
    not_started: _("Not started")
};
function rA(e) {
    var t, r;
    let a, n, i, s = (t = e.provisioning, r = e.title, a = t?.state, n = t?.next_retry_at && t.next_retry_at > Math.floor(Date.now() / 1000) ? t.next_retry_at - Math.floor(Date.now() / 1000) : 0, i = r ?? (t?.current_revision === !1 ? _("Previous configuration") : t?.management_fresh === !1 ? _("Management stale") : t?.reconcile_reason ? t.reconcile_reason : n > 0 ? _("Next self-healing retry in %d seconds").replace("%d", String(n)) : t?.reason ?? t?.error), a && "not_started" !== a ? "completed" === a || "verified" === a ? {
        tone: "success",
        label: "completed" === a ? rT.completed : _("Ready"),
        title: i
    } : "wan_reconciling" === a || "wan_verifying" === a || "wifi_reconciling" === a || "discovering" === a || "reading" === a || "disabling" === a || "disabling_read" === a || "writing" === a || "verifying" === a || "settling" === a || "recovering" === a || "waiting_task" === a ? {
        tone: "info",
        label: rT[a] ?? l(a),
        title: i
    } : "interrupted" === a || "failed" === a || "error" === a || "blocked" === a ? {
        tone: "danger",
        label: "blocked" === a ? rT.blocked : rT.interrupted,
        title: i
    } : "waiting" === a || "pending" === a || "waiting_management" === a || "reset_pending" === a ? {
        tone: "warning",
        label: rT[a] ?? rT.waiting,
        title: i
    } : {
        tone: "neutral",
        label: l(a),
        title: i
    } : {
        tone: "neutral",
        label: rT.not_started,
        title: i
    });
    return o(rP, {
        tone: s.tone,
        title: s.title,
        children: s.label
    });
}
const rL = {
    not_configured: _("Not configured"),
    stale_revision: _("Stale revision"),
    stale_management: _("Stale management"),
    verified: _("Verified"),
    attention_required: _("Attention required"),
    accepted_unverified: _("Unverified"),
    pending: _("Pending"),
    recovering: _("Recovering"),
    waiting_management: _("Waiting management")
};
function rq(e) {
    var t;
    let r = (t = e.state) && "not_configured" !== t ? "verified" === t ? {
        tone: "success",
        label: rL.verified
    } : "attention_required" === t ? {
        tone: "danger",
        label: rL.attention_required
    } : "stale_revision" === t || "stale_management" === t || "waiting_management" === t ? {
        tone: "warning",
        label: rL[t]
    } : "recovering" === t ? {
        tone: "info",
        label: rL.recovering
    } : "accepted_unverified" === t || "pending" === t ? {
        tone: "warning",
        label: rL[t]
    } : {
        tone: "neutral",
        label: l(t)
    } : {
        tone: "neutral",
        label: rL.not_configured
    };
    return o(rP, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const rU = `
.fttr-badge {
	display: inline-block;
	padding: 0.18em 0.55em;
	font-size: 85%;
	font-weight: 600;
	line-height: 1.25;
	border-radius: 3px;
	white-space: nowrap;
	text-align: center;
}

.fttr-badge-success {
	background: var(--fttr-success-bg, rgba(46, 204, 113, 0.15));
	color: var(--fttr-success-color, #27ae60);
	border: 1px solid var(--fttr-success-border, rgba(46, 204, 113, 0.35));
}

.fttr-badge-warning {
	background: var(--fttr-warning-bg, rgba(243, 156, 18, 0.15));
	color: var(--fttr-warning-color, #d35400);
	border: 1px solid var(--fttr-warning-border, rgba(243, 156, 18, 0.35));
}

.fttr-badge-danger {
	background: var(--fttr-danger-bg, rgba(231, 76, 60, 0.15));
	color: var(--fttr-danger-color, #c0392b);
	border: 1px solid var(--fttr-danger-border, rgba(231, 76, 60, 0.35));
}

.fttr-badge-info {
	background: var(--fttr-info-bg, rgba(52, 152, 219, 0.15));
	color: var(--fttr-info-color, #2980b9);
	border: 1px solid var(--fttr-info-border, rgba(52, 152, 219, 0.35));
}

.fttr-badge-neutral {
	background: var(--fttr-neutral-bg, rgba(127, 140, 141, 0.12));
	color: var(--fttr-neutral-color, #7f8c8d);
	border: 1px solid var(--fttr-neutral-border, rgba(127, 140, 141, 0.25));
}

@media (prefers-color-scheme: dark) {
	.fttr-badge-success {
		color: var(--fttr-success-color, #2ecc71);
	}
	.fttr-badge-warning {
		color: var(--fttr-warning-color, #f39c12);
	}
	.fttr-badge-danger {
		color: var(--fttr-danger-color, #e74c3c);
	}
	.fttr-badge-info {
		color: var(--fttr-info-color, #3498db);
	}
	.fttr-badge-neutral {
		color: var(--fttr-neutral-color, #bdc3c7);
	}
}

[data-darkmode="true"] .fttr-badge-success,
[data-theme="dark"] .fttr-badge-success {
	color: var(--fttr-success-color, #2ecc71);
}
[data-darkmode="true"] .fttr-badge-warning,
[data-theme="dark"] .fttr-badge-warning {
	color: var(--fttr-warning-color, #f39c12);
}
[data-darkmode="true"] .fttr-badge-danger,
[data-theme="dark"] .fttr-badge-danger {
	color: var(--fttr-danger-color, #e74c3c);
}
[data-darkmode="true"] .fttr-badge-info,
[data-theme="dark"] .fttr-badge-info {
	color: var(--fttr-info-color, #3498db);
}
[data-darkmode="true"] .fttr-badge-neutral,
[data-theme="dark"] .fttr-badge-neutral {
	color: var(--fttr-neutral-color, #bdc3c7);
}
`;
let rZ = (e)=>JSON.stringify(e, null, 2);
async function rB(e) {
    let t = [
        "{"
    ], r = !0;
    for (let [a, n] of Object.entries(e))if (r || t.push(","), r = !1, t.push(JSON.stringify(a), ":"), Array.isArray(n)) {
        t.push("[");
        for(let e = 0; e < n.length; e++){
            e && t.push(",");
            let r = JSON.stringify(n[e]);
            if (void 0 === r) throw Error(_("MIB snapshot cannot be serialized"));
            t.push(r), e % 32 == 31 && await new Promise((e)=>setTimeout(e, 0));
        }
        t.push("]");
    } else {
        let e = JSON.stringify(n);
        if (void 0 === e) throw Error(_("MIB snapshot cannot be serialized"));
        t.push(e);
    }
    return t.push("}"), new Blob(t, {
        type: "application/json"
    });
}
function rW(e) {
    let t = e.reference;
    return t?.url.startsWith("https://github.com/opencord/omci-lib-go/blob/v2.2.4/") ? o("a", {
        href: t.url,
        target: "_blank",
        rel: "noopener noreferrer",
        children: t.id
    }) : o("span", {
        children: "\u2014"
    });
}
let rV = L.view, rF = null, rJ = null, rX = null, rH = !1, rG = 0;
function rK(e) {
    let t = rX;
    if (!t) return;
    let r = t.querySelector('[data-fttr="laser-state"]'), a = t.querySelector('[data-fttr="laser-toggle"]');
    if (!(r instanceof HTMLElement) || !(a instanceof HTMLButtonElement)) return;
    !0 === e ? (r.textContent = _("TX enabled (reset readback)"), r.className = "fttr-badge fttr-badge-success") : !1 === e ? (r.textContent = _("Off (TX disabled)"), r.className = "fttr-badge fttr-badge-warning") : (r.textContent = _("Unknown"), r.className = "fttr-badge fttr-badge-neutral"), a.textContent = !1 === e ? _("Turn laser on") : _("Turn laser off"), a.disabled = rH, a.onclick = async ()=>{
        if (rH) return;
        let e = !1 === rF, t = e ? _("Re-enable the 1490nm downlink laser? Discovery resumes and sub-gateways can register again.") : _("Turn off the 1490nm downlink laser? All sub-gateways are gracefully disconnected and cannot register until the laser is re-enabled. This setting is saved and reapplied after a reboot.");
        if (window.confirm(t)) {
            rH = !0, rG++, rK(rF);
            try {
                let t = await r$(e);
                if (rJ = t, rF = t.tx_enabled, "error" === t.status) return void window.alert(`${_("Failed to change laser output")}: ${t.error?.message ?? _("unknown error")}`);
            } catch (e) {
                rF = null, rJ = null, window.alert(`${_("Failed to change laser output")}: ${String(e)}`);
            } finally{
                rH = !1, rK(rF);
            }
        }
    };
    let n = t.querySelector('[data-fttr="laser-detail"]');
    if (n instanceof HTMLElement) {
        let e = rJ?.desired_enabled;
        n.textContent = [
            !0 === e ? _("Saved setting: on") : !1 === e ? _("Saved setting: off") : _("Saved setting: unknown"),
            rJ ? rJ.discovery_active ? _("Discovery active") : _("Discovery paused") : _("Discovery state: unknown"),
            rJ?.cleanup_pending ? _("ONU cleanup pending") : "",
            rJ?.error?.message ?? ""
        ].filter(Boolean).join(" \xb7 ");
    }
}
function rQ(e) {
    var t, r, a, n, i, s, c, p, u, f, b, g, h, m, v, y, w, x, k, z, j;
    let S = e.optical_transceiver, $ = o("span", {
        class: `fttr-badge ${"ready" === e.fpga_status ? "fttr-badge-success" : "fttr-badge-neutral"}`,
        style: "font-size:95%",
        children: "ready" === e.fpga_status ? _("Ready") : l(e.fpga_status)
    }), O = null === (t = S.cdr_locked) ? o("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: _("Unknown")
    }) : t ? o("span", {
        class: "fttr-badge fttr-badge-success",
        children: _("Locked")
    }) : o("span", {
        class: "fttr-badge fttr-badge-warning",
        children: _("Unlocked")
    });
    return j = {
        class: "cbi-section fttr-panel-controller",
        children: [
            o("h3", {
                style: "margin-bottom:12px",
                children: _("Controller hardware")
            }),
            (x = {
                class: "fttr-grid-3",
                children: [
                    (i = {
                        class: "fttr-card",
                        children: [
                            o("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: _("FPGA status")
                            }),
                            (r = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("FPGA status")
                                    }),
                                    o("span", {
                                        children: $
                                    })
                                ]
                            }, o("div", r)),
                            (a = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("FPGA identifier")
                                    }),
                                    o("code", {
                                        children: l(e.fpga_status)
                                    })
                                ]
                            }, o("div", a)),
                            (n = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("CDR lock")
                                    }),
                                    o("span", {
                                        children: O
                                    })
                                ]
                            }, o("div", n))
                        ]
                    }, o("div", i)),
                    (f = {
                        class: "fttr-card",
                        children: [
                            o("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: _("Optical transceiver")
                            }),
                            (s = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("Module model")
                                    }),
                                    o("strong", {
                                        children: l(S.model)
                                    })
                                ]
                            }, o("div", s)),
                            (c = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("TX wavelength")
                                    }),
                                    o("span", {
                                        children: S.wavelength_tx_nm ? `${S.wavelength_tx_nm} nm` : "\u2014"
                                    })
                                ]
                            }, o("div", c)),
                            (p = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("RX wavelength")
                                    }),
                                    o("span", {
                                        children: S.wavelength_rx_nm ? `${S.wavelength_rx_nm} nm` : "\u2014"
                                    })
                                ]
                            }, o("div", p)),
                            (u = {
                                class: "fttr-kv-row",
                                "data-fttr": "laser-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("Laser output")
                                    }),
                                    o("span", {
                                        class: "fttr-badge fttr-badge-neutral",
                                        "data-fttr": "laser-state",
                                        children: _("Loading\u2026")
                                    })
                                ]
                            }, o("div", u)),
                            o("div", {
                                "data-fttr": "laser-detail",
                                style: "font-size:85%;margin-top:8px"
                            })
                        ]
                    }, o("div", f)),
                    (w = {
                        class: "fttr-card",
                        children: [
                            o("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: _("Physical rates and diagnostics")
                            }),
                            (b = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("Downlink PHY rate")
                                    }),
                                    o("span", {
                                        children: S.phy_rate_downlink_gbps ? `${S.phy_rate_downlink_gbps} Gbps` : "\u2014"
                                    })
                                ]
                            }, o("div", b)),
                            (g = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("Uplink PHY rate")
                                    }),
                                    o("span", {
                                        children: S.phy_rate_uplink_gbps ? `${S.phy_rate_uplink_gbps} Gbps` : "\u2014"
                                    })
                                ]
                            }, o("div", g)),
                            (h = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("Temperature")
                                    }),
                                    o("span", {
                                        children: null == S.temperature_celsius ? "\u2014" : `${S.temperature_celsius} \xb0C`
                                    })
                                ]
                            }, o("div", h)),
                            (m = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("TX power")
                                    }),
                                    o("span", {
                                        children: d(S.tx_power_dbm)
                                    })
                                ]
                            }, o("div", m)),
                            (v = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("Voltage")
                                    }),
                                    o("span", {
                                        children: null == S.vcc_voltage ? "\u2014" : `${S.vcc_voltage} V`
                                    })
                                ]
                            }, o("div", v)),
                            (y = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("Bias current")
                                    }),
                                    o("span", {
                                        children: null == S.laser_bias_current_ma ? "\u2014" : `${S.laser_bias_current_ma} mA`
                                    })
                                ]
                            }, o("div", y))
                        ]
                    }, o("div", w))
                ]
            }, o("div", x)),
            (z = {
                class: "fttr-kv-row",
                style: "margin-top:10px",
                children: [
                    o("span", {
                        class: "fttr-kv-label",
                        children: _("Laser control")
                    }),
                    (k = {
                        children: o("button", {
                            class: "fttr-btn-subtle",
                            "data-fttr": "laser-toggle",
                            type: "button",
                            disabled: !0,
                            children: _("Loading\u2026")
                        })
                    }, o("span", k))
                ]
            }, o("div", z))
        ]
    }, o("div", j);
}
function rY(e) {
    var t, r;
    return e.length ? (t = {
        class: "fttr-panel-subgateways",
        children: e.map((e)=>{
            var t, r, a, n, i, p, u, f, b, g, h, m, v, y, w, x, k, z, j, S, $, O, M;
            let C = e.identity, P = C?.software_images ?? [], R = function(e) {
                if (!e) return {
                    display: "\u2014"
                };
                let t = e.match(/image\s*\d+:\s*([^;,\s]+)/i);
                return t?.[1] ? {
                    display: t[1],
                    full: e.replace(/;\s*/g, "\n")
                } : {
                    display: e
                };
            }(e.firmware_version), I = e.identity ? e.identity_current ? _("Current registration") : _("Cached identity") : _("Not collected"), N = o("span", {
                class: `fttr-badge ${e.identity_current ? "fttr-badge-info" : "fttr-badge-neutral"}`,
                style: "font-size:80%",
                children: I
            });
            return M = {
                class: "cbi-section fttr-onu-card",
                children: [
                    (p = {
                        class: "fttr-card-header",
                        children: [
                            (a = {
                                class: "fttr-card-title-group",
                                children: [
                                    o("h3", {
                                        style: "margin:0",
                                        children: _("Sub-gateway %s \u2014 %s").replace("%s", String(e.onu_id)).replace("%s", l(e.model))
                                    }),
                                    (r = {
                                        class: "fttr-card-meta-tags",
                                        children: [
                                            o("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                children: e.vendor
                                            }),
                                            o("code", {
                                                children: e.serial_number
                                            }),
                                            (t = e.state) ? "o5_operation" === t || "online" === t || "ready" === t || "connected" === t ? o("span", {
                                                class: "fttr-badge fttr-badge-success",
                                                title: t,
                                                children: "o5_operation" === t ? _("Connected") : _("Ready")
                                            }) : t.includes("O4") || t.includes("ranging") || t.includes("sync") ? o("span", {
                                                class: "fttr-badge fttr-badge-warning",
                                                title: t,
                                                children: t
                                            }) : o("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                title: t,
                                                children: t
                                            }) : o("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                children: "\u2014"
                                            }),
                                            N
                                        ]
                                    }, o("div", r))
                                ]
                            }, o("div", a)),
                            (i = {
                                children: (n = {
                                    type: "button",
                                    class: "fttr-btn-subtle",
                                    onclick: ()=>(function(e) {
                                            var t, r, a, n, i, c, p, u, f, b, g, h;
                                            let m = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "basic", v = !1, y = !1, w = null, x = null, k = (t = {
                                                class: "onu-basic-container",
                                                children: [
                                                    {
                                                        title: _("Device identification"),
                                                        rows: [
                                                            [
                                                                _("Vendor"),
                                                                e.vendor
                                                            ],
                                                            [
                                                                _("Model"),
                                                                e.identity?.equipment_id ?? e.model
                                                            ],
                                                            [
                                                                _("Optical serial"),
                                                                o("code", {
                                                                    style: "font-size:90%",
                                                                    children: e.serial_number
                                                                })
                                                            ],
                                                            [
                                                                _("ONU ID"),
                                                                e.onu_id
                                                            ],
                                                            [
                                                                _("Hardware version"),
                                                                e.identity?.hardware_version ?? e.hardware_version
                                                            ],
                                                            [
                                                                _("Software images"),
                                                                e.identity?.software_images?.join(", ") ?? e.firmware_version
                                                            ],
                                                            [
                                                                _("OMCC version"),
                                                                e.identity?.omcc_version == null ? null : o("code", {
                                                                    style: "font-size:90%",
                                                                    children: [
                                                                        "0x",
                                                                        e.identity.omcc_version.toString(16)
                                                                    ]
                                                                })
                                                            ]
                                                        ]
                                                    },
                                                    {
                                                        title: _("Optical & link status"),
                                                        rows: [
                                                            [
                                                                _("Registration"),
                                                                o(rR, {
                                                                    state: e.state
                                                                })
                                                            ],
                                                            [
                                                                _("Business"),
                                                                o(rI, {
                                                                    status: e.business_status
                                                                })
                                                            ],
                                                            [
                                                                _("Receive optical power"),
                                                                d(e.optical_rx_power_dbm)
                                                            ],
                                                            [
                                                                _("Transmit optical power"),
                                                                d(e.optical_tx_power_dbm)
                                                            ],
                                                            [
                                                                _("Equalization delay (EQD)"),
                                                                null == e.equalization_delay_bits ? "\u2014" : o("code", {
                                                                    style: "font-size:90%",
                                                                    children: [
                                                                        e.equalization_delay_bits,
                                                                        " bits"
                                                                    ]
                                                                })
                                                            ],
                                                            [
                                                                _("Data interface"),
                                                                e.data_path?.interface ? o("code", {
                                                                    style: "font-size:90%",
                                                                    children: e.data_path.interface
                                                                }) : null
                                                            ],
                                                            [
                                                                _("Uptime"),
                                                                null == e.uptime_seconds ? null : `${function(e) {
                                                                    if (null == e || !Number.isFinite(e) || e < 0) return "\u2014";
                                                                    let t = Math.floor(e), r = Math.floor(t / 86400), a = Math.floor(t % 86400 / 3600), n = Math.floor(t % 3600 / 60), i = [];
                                                                    return r > 0 && i.push(`${r}d`), (a > 0 || r > 0) && i.push(`${a}h`), (n > 0 || a > 0 || r > 0) && i.push(`${n}m`), i.push(`${t % 60}s`), i.join(" ");
                                                                }(e.uptime_seconds)} (${Math.floor(e.uptime_seconds)} s)`
                                                            ]
                                                        ]
                                                    },
                                                    {
                                                        title: _("Management & cache"),
                                                        rows: [
                                                            [
                                                                _("CWMP"),
                                                                o(rD, {
                                                                    management: e.management
                                                                })
                                                            ],
                                                            [
                                                                _("Last Inform"),
                                                                e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
                                                            ],
                                                            [
                                                                _("Provisioning"),
                                                                o(rA, {
                                                                    provisioning: e.provisioning
                                                                })
                                                            ],
                                                            [
                                                                _("Wi-Fi sync"),
                                                                o(rq, {
                                                                    state: e.wifi_sync
                                                                })
                                                            ],
                                                            [
                                                                _("Identity source"),
                                                                e.identity ? !1 === e.identity_current ? _("Cached identity") : !0 === e.identity_current ? _("Current registration") : _("Registration freshness unavailable") : _("Not collected")
                                                            ],
                                                            [
                                                                _("Identity age"),
                                                                null == e.identity_age_seconds ? null : `${e.identity_age_seconds} s`
                                                            ],
                                                            [
                                                                _("Identity read errors"),
                                                                e.identity?.errors?.join("; ")
                                                            ]
                                                        ]
                                                    }
                                                ].map((e)=>{
                                                    var t, r, a;
                                                    return a = {
                                                        class: "cbi-section onu-basic-section",
                                                        children: [
                                                            o("h3", {
                                                                class: "onu-basic-title",
                                                                children: e.title
                                                            }),
                                                            (r = {
                                                                class: "table onu-basic-table",
                                                                children: (t = {
                                                                    children: e.rows.map((e)=>{
                                                                        var t;
                                                                        let [r, a] = e;
                                                                        return t = {
                                                                            children: [
                                                                                o("th", {
                                                                                    style: "width:35%",
                                                                                    children: r
                                                                                }),
                                                                                o("td", {
                                                                                    children: a instanceof Node ? a : l(a)
                                                                                })
                                                                            ]
                                                                        }, o("tr", t);
                                                                    })
                                                                }, o("tbody", t))
                                                            }, o("table", r))
                                                        ]
                                                    }, o("div", a);
                                                })
                                            }, o("div", t)), z = (r = {
                                                class: "mib-status-bar",
                                                role: "status",
                                                children: o("span", {
                                                    class: "mib-hint-text",
                                                    children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                                                })
                                            }, o("div", r)), j = (a = {
                                                class: "cbi-progressbar",
                                                style: "display:none;width:100%",
                                                title: "0%",
                                                children: o("div", {
                                                    style: "width:0%"
                                                })
                                            }, o("div", a)), S = o("div", {}), $ = o("pre", {
                                                class: "onu-raw-pre"
                                            }), O = o("span", {
                                                class: "download-status",
                                                role: "status"
                                            }), M = null, C = o("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                disabled: !0,
                                                onclick: async ()=>{
                                                    if (w && !v) {
                                                        C.disabled = !0, O.textContent = _("Preparing JSON download\u2026");
                                                        try {
                                                            let t = await rB(w);
                                                            if (v) return;
                                                            M && URL.revokeObjectURL(M), M = URL.createObjectURL(t);
                                                            let r = document.createElement("a");
                                                            r.href = M, r.download = `mib-${e.serial_number}.json`, r.click(), O.textContent = _("JSON download started"), window.setTimeout(()=>{
                                                                URL.revokeObjectURL(r.href), M === r.href && (M = null);
                                                            }, 1000);
                                                        } catch (e) {
                                                            O.textContent = String(e);
                                                        } finally{
                                                            C.disabled = !w || v;
                                                        }
                                                    }
                                                },
                                                children: _("Download JSON")
                                            }), P = (i = {
                                                class: "onu-raw-panel",
                                                children: [
                                                    (n = {
                                                        class: "onu-raw-toolbar",
                                                        children: [
                                                            o("span", {
                                                                class: "onu-raw-hint",
                                                                children: _("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")
                                                            }),
                                                            o("div", {
                                                                class: "onu-raw-actions",
                                                                children: [
                                                                    C,
                                                                    O
                                                                ]
                                                            })
                                                        ]
                                                    }, o("div", n)),
                                                    $
                                                ]
                                            }, o("div", i)), R = o("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-apply",
                                                onclick: ()=>B(!1),
                                                children: _("Read MIB")
                                            }), I = o("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                onclick: ()=>B(!0),
                                                children: _("Read MIB and VLAN tables")
                                            }), N = (u = {
                                                class: "onu-mib-panel",
                                                children: [
                                                    (p = {
                                                        class: "mib-controls",
                                                        children: [
                                                            (c = {
                                                                class: "mib-action-group",
                                                                children: [
                                                                    R,
                                                                    I,
                                                                    o("small", {
                                                                        class: "mib-action-hint",
                                                                        children: _("Collecting VLAN tables queries extended filter tables and takes longer.")
                                                                    })
                                                                ]
                                                            }, o("div", c)),
                                                            z,
                                                            j
                                                        ]
                                                    }, o("div", p)),
                                                    S
                                                ]
                                            }, o("div", u)), D = {
                                                basic: k,
                                                mib: N,
                                                raw: P
                                            }, T = new Map();
                                            function A(e) {
                                                for (let [t, r] of Object.entries(D))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                                                for (let [t, r] of T)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
                                            }
                                            let q = (f = {
                                                class: "cbi-tabmenu",
                                                style: "margin:0;padding-left:0;display:flex;flex-wrap:wrap",
                                                children: [
                                                    {
                                                        id: "basic",
                                                        label: _("Basic information")
                                                    },
                                                    {
                                                        id: "mib",
                                                        label: "OMCI / MIB"
                                                    },
                                                    {
                                                        id: "raw",
                                                        label: _("Raw JSON")
                                                    }
                                                ].map((e)=>{
                                                    var t;
                                                    let r = (t = {
                                                        class: e.id === m ? "cbi-tab" : "cbi-tab-disabled",
                                                        "data-tab": e.id,
                                                        children: o("a", {
                                                            href: `#tab-${e.id}`,
                                                            onclick: (t)=>{
                                                                t.preventDefault(), A(e.id);
                                                            },
                                                            children: e.label
                                                        })
                                                    }, o("li", t));
                                                    return T.set(e.id, r), r;
                                                })
                                            }, o("ul", f)), U = (h = {
                                                children: [
                                                    o("div", {
                                                        class: "onu-details-header",
                                                        children: q
                                                    }),
                                                    (b = {
                                                        class: "onu-details-dialog",
                                                        children: [
                                                            o("style", {
                                                                children: `
				.onu-details-dialog {
					--fttr-border: rgba(127, 127, 127, 0.22);
					--fttr-card-bg: rgba(127, 127, 127, 0.04);
					--fttr-hover-bg: rgba(127, 127, 127, 0.1);
					--fttr-active-bg: rgba(52, 152, 219, 0.16);
					--fttr-active-color: #3498db;

					--fttr-success-bg: rgba(46, 204, 113, 0.15);
					--fttr-success-color: #27ae60;
					--fttr-success-border: rgba(46, 204, 113, 0.35);

					--fttr-warning-bg: rgba(243, 156, 18, 0.15);
					--fttr-warning-color: #d35400;
					--fttr-warning-border: rgba(243, 156, 18, 0.35);

					--fttr-danger-bg: rgba(231, 76, 60, 0.15);
					--fttr-danger-color: #c0392b;
					--fttr-danger-border: rgba(231, 76, 60, 0.35);

					--fttr-info-bg: rgba(52, 152, 219, 0.15);
					--fttr-info-color: #2980b9;
					--fttr-info-border: rgba(52, 152, 219, 0.35);

					--fttr-neutral-bg: rgba(127, 140, 141, 0.12);
					--fttr-neutral-color: #7f8c8d;
					--fttr-neutral-border: rgba(127, 140, 141, 0.25);

					display: flex;
					flex-direction: column;
				}
				@media (prefers-color-scheme: dark) {
					.onu-details-dialog {
						--fttr-border: rgba(255, 255, 255, 0.14);
						--fttr-card-bg: rgba(255, 255, 255, 0.03);
						--fttr-hover-bg: rgba(255, 255, 255, 0.08);
						--fttr-active-bg: rgba(52, 152, 219, 0.25);
						--fttr-active-color: #5dade2;

						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}
				${rU}
				.onu-details-header {
					margin-bottom: 12px;
					border-bottom: 1px solid var(--fttr-border);
					padding-bottom: 4px;
				}
				.onu-details-header .cbi-tabmenu {
					border-bottom: none;
					margin: 0;
				}
				.onu-raw-toolbar {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: wrap;
					gap: 12px;
					margin-bottom: 10px;
				}
				.onu-raw-hint {
					font-size: 0.9em;
					opacity: 0.8;
				}
				.onu-raw-actions {
					display: flex;
					align-items: center;
					gap: 8px;
				}
				.onu-raw-actions .download-status {
					font-size: 0.85em;
					opacity: 0.8;
				}
				.mib-controls {
					margin-bottom: 12px;
					display: flex;
					flex-direction: column;
					gap: 8px;
				}
				.mib-action-group {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					gap: 8px;
				}
				.mib-action-hint {
					opacity: 0.7;
					font-size: 0.85em;
				}
				.mib-status-bar {
					min-height: 26px;
					display: flex;
					align-items: center;
					font-size: 0.9em;
				}
				.mib-hint-text {
					opacity: 0.75;
					font-style: italic;
				}
				.mib-error-text {
					color: #e74c3c;
				}
				.mib-chips {
					display: flex;
					flex-wrap: wrap;
					gap: 6px;
					align-items: center;
				}
				.mib-chip {
					display: inline-flex;
					align-items: center;
					font-size: 0.82em;
					padding: 2px 8px;
					border-radius: 4px;
					background: var(--fttr-hover-bg);
					border: 1px solid var(--fttr-border);
				}
				.mib-chip-primary {
					background: rgba(52, 152, 219, 0.15);
					border-color: rgba(52, 152, 219, 0.35);
					color: var(--fttr-active-color);
					font-weight: 600;
				}
				.mib-chip-success {
					background: rgba(46, 204, 113, 0.15);
					border-color: rgba(46, 204, 113, 0.35);
					color: #27ae60;
				}
				.mib-chip-warning {
					background: rgba(243, 156, 18, 0.15);
					border-color: rgba(243, 156, 18, 0.35);
					color: #d35400;
				}
				.mib-chip-info {
					background: rgba(155, 89, 182, 0.15);
					border-color: rgba(155, 89, 182, 0.35);
					color: #8e44ad;
				}
				.mib-chip-neutral {
					opacity: 0.85;
				}
				.mib-chip-subtle {
					opacity: 0.65;
					font-size: 0.8em;
				}
				.mib-browser {
					display: flex;
					height: 520px;
					border: 1px solid var(--fttr-border);
					border-radius: 6px;
					overflow: hidden;
					background: var(--fttr-card-bg);
				}
				.mib-sidebar {
					width: 270px;
					min-width: 240px;
					display: flex;
					flex-direction: column;
					border-right: 1px solid var(--fttr-border);
					background: var(--fttr-card-bg);
				}
				.mib-search-box {
					padding: 8px;
					border-bottom: 1px solid var(--fttr-border);
				}
				.mib-search-input {
					width: 100% !important;
					box-sizing: border-box;
					height: 32px;
					font-size: 0.9em;
				}
				.mib-class-list {
					flex: 1;
					overflow-y: auto;
					padding: 4px;
				}
				.mib-class-btn {
					display: flex;
					align-items: center;
					width: 100%;
					padding: 6px 8px;
					margin-bottom: 2px;
					border: none;
					border-left: 3px solid transparent;
					border-radius: 3px;
					background: transparent;
					color: inherit;
					font-size: 0.88em;
					text-align: left;
					cursor: pointer;
					box-sizing: border-box;
				}
				.mib-class-btn:hover {
					background: var(--fttr-hover-bg);
				}
				.mib-class-btn.active {
					background: var(--fttr-active-bg);
					color: var(--fttr-active-color);
					font-weight: 600;
					border-left-color: var(--fttr-active-color);
				}
				.mib-class-id {
					font-family: monospace;
					margin-right: 6px;
					opacity: 0.7;
					min-width: 24px;
					text-align: right;
				}
				.mib-class-name {
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding: 0 4px;
				}
				.mib-class-count {
					font-size: 0.78em;
					padding: 1px 6px;
					border-radius: 10px;
					background: var(--fttr-hover-bg);
					opacity: 0.8;
				}
				.mib-content {
					flex: 1;
					min-width: 0;
					overflow-y: auto;
					padding: 12px 16px;
				}
				.mib-empty-list, .mib-empty-content {
					padding: 20px;
					text-align: center;
					opacity: 0.7;
					font-style: italic;
				}
				.mib-entity-details {
					margin-bottom: 12px;
					border: 1px solid var(--fttr-border);
					border-radius: 5px;
					overflow: hidden;
				}
				.mib-entity-details > summary {
					padding: 8px 12px;
					background: var(--fttr-hover-bg);
					cursor: pointer;
					display: flex;
					justify-content: space-between;
					align-items: center;
					user-select: none;
					font-size: 0.95em;
				}
				.mib-entity-title {
					display: flex;
					align-items: center;
					gap: 8px;
				}
				.mib-entity-id-tag {
					font-size: 0.85em;
					opacity: 0.75;
					font-family: monospace;
				}
				.mib-entity-support {
					font-size: 0.8em;
					padding: 2px 6px;
					border-radius: 3px;
					background: var(--fttr-card-bg);
					border: 1px solid var(--fttr-border);
					opacity: 0.85;
				}
				.mib-entity-body {
					padding: 10px 12px;
				}
				.mib-attributes-table {
					width: 100%;
					margin-bottom: 10px;
					font-size: 0.9em;
				}
				.mib-attr-name {
					font-weight: 500;
					word-break: break-word;
				}
				.mib-attr-kind code {
					font-size: 0.85em;
				}
				.mib-attr-value {
					word-break: break-all;
				}
				.mib-val-display {
					font-family: monospace;
				}
				.mib-obs-details {
					margin-top: 4px;
					font-size: 0.85em;
				}
				.mib-obs-details summary {
					cursor: pointer;
					color: var(--fttr-active-color);
				}
				.mib-pre {
					white-space: pre-wrap;
					overflow-wrap: anywhere;
					max-height: 180px;
					overflow-y: auto;
					padding: 6px 8px;
					background: var(--fttr-card-bg);
					border-radius: 4px;
					font-size: 0.85em;
				}
				.mib-table-overflow {
					overflow-x: auto;
					max-width: 100%;
					margin-top: 8px;
					margin-bottom: 8px;
				}
				.mib-table-details {
					margin-top: 10px;
					border: 1px solid var(--fttr-border);
					border-radius: 4px;
					padding: 6px 10px;
				}
				.mib-table-details summary {
					cursor: pointer;
					font-weight: 500;
				}
				.mib-diag-details {
					margin-top: 10px;
					font-size: 0.9em;
				}
				.mib-diag-details summary {
					cursor: pointer;
					opacity: 0.75;
				}
				.mib-upload-diagnostics {
					margin-top: 12px;
					border: 1px solid var(--fttr-border);
					border-radius: 4px;
					padding: 6px 10px;
				}
				.mib-upload-diagnostics summary {
					cursor: pointer;
					font-weight: 500;
				}
				.onu-basic-container {
					display: flex;
					flex-direction: column;
					gap: 14px;
					max-height: 60vh;
					overflow-y: auto;
					padding-right: 4px;
				}
				.onu-basic-section {
					margin-bottom: 0 !important;
					padding: 10px 14px;
					border: 1px solid var(--fttr-border);
					border-radius: 6px;
					background: var(--fttr-card-bg);
				}
				.onu-basic-title {
					margin-top: 0.2em;
					margin-bottom: 0.6em;
					font-size: 1.05em;
				}
				.onu-basic-table {
					width: 100%;
					margin-bottom: 0;
				}
				.onu-basic-table th {
					opacity: 0.75;
					font-weight: normal;
				}
				.onu-raw-panel {
					max-height: 60vh;
					display: flex;
					flex-direction: column;
					gap: 8px;
				}
				.onu-raw-pre {
					flex: 1;
					max-height: 50vh;
					overflow: auto;
					white-space: pre-wrap;
					overflow-wrap: anywhere;
					padding: 10px;
					background: var(--fttr-card-bg);
					border: 1px solid var(--fttr-border);
					border-radius: 4px;
				}
				.onu-details-footer {
					margin-top: 14px;
					display: flex;
					justify-content: flex-end;
				}
				`
                                                            }),
                                                            k,
                                                            N,
                                                            P
                                                        ]
                                                    }, o("div", b)),
                                                    (g = {
                                                        class: "right onu-details-footer",
                                                        children: o("button", {
                                                            type: "button",
                                                            class: "cbi-button",
                                                            onclick: ()=>{
                                                                v = !0, M && URL.revokeObjectURL(M), M = null, w = null, $.textContent = "", S.replaceChildren(), L.ui.hideModal();
                                                            },
                                                            children: _("Close")
                                                        })
                                                    }, o("div", g))
                                                ]
                                            }, o(s, h)), Z = ()=>!v && U.isConnected && U.getClientRects().length > 0;
                                            async function B(t) {
                                                if (!y) {
                                                    y = !0, R.disabled = I.disabled = !0, j.style.display = "", j.title = "0%", j.firstElementChild.style.width = "0%", z.textContent = _("Reading MIB\u2026");
                                                    try {
                                                        let v = await rj(), y = v.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                                        if (y?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                                        if (!Z()) return;
                                                        let k = await rO(y.onu_id, y.serial_number, t);
                                                        x = k.job;
                                                        let O = Date.now() + 140000;
                                                        for(; Z();){
                                                            let e = await rM(k.job, 0);
                                                            if (!Z()) return;
                                                            if ("ready" === e.status) {
                                                                var r, a, n, i, s, d, c, p, u, f, b, g, h, m;
                                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                                let t = new Uint8Array(e.bytes), v = 0;
                                                                for(let r = 0; r < e.chunks; r++){
                                                                    let a = 0 === r ? e : await rM(k.job, r);
                                                                    if (!Z()) return;
                                                                    if ("ready" !== a.status || a.chunk !== r || a.chunks !== e.chunks || a.bytes !== e.bytes || !a.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                                    let n = atob(a.data);
                                                                    if (n.length > 32768 || v + n.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                                    for(let e = 0; e < n.length; e++)t[v++] = n.charCodeAt(e);
                                                                    let i = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                                                    j.title = `${i}%`, j.firstElementChild.style.width = `${i}%`, z.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                                                }
                                                                if (v !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                                if (await W(), w = t6.parse(ry(JSON.parse(new TextDecoder("utf-8", {
                                                                    fatal: !0
                                                                }).decode(t)))).report, 1 !== w.schema_version || w.onu_id !== y.onu_id) throw Error(_("Unexpected MIB response"));
                                                                j.style.display = "none", z.replaceChildren((r = w, b = {
                                                                    class: "mib-chips",
                                                                    children: [
                                                                        (n = {
                                                                            class: "mib-chip mib-chip-primary",
                                                                            children: [
                                                                                "ONU ",
                                                                                r.onu_id
                                                                            ]
                                                                        }, o("span", n)),
                                                                        (i = {
                                                                            class: `mib-chip ${r.uploaded_complete ? "mib-chip-success" : "mib-chip-warning"}`,
                                                                            children: r.uploaded_complete ? _("Upload complete") : _("Upload incomplete")
                                                                        }, o("span", i)),
                                                                        (s = {
                                                                            class: "mib-chip mib-chip-info",
                                                                            children: [
                                                                                _("Records"),
                                                                                ": ",
                                                                                r.received_records,
                                                                                r.expected_records !== r.received_records ? ` / ${r.expected_records}` : ""
                                                                            ]
                                                                        }, o("span", s)),
                                                                        (d = {
                                                                            class: "mib-chip",
                                                                            children: [
                                                                                _("Decoded"),
                                                                                ": ",
                                                                                r.decoded_records
                                                                            ]
                                                                        }, o("span", d)),
                                                                        r.partial_records > 0 ? (c = {
                                                                            class: "mib-chip mib-chip-warning",
                                                                            children: [
                                                                                _("Partial"),
                                                                                ": ",
                                                                                r.partial_records
                                                                            ]
                                                                        }, o("span", c)) : null,
                                                                        (p = {
                                                                            class: "mib-chip mib-chip-neutral",
                                                                            children: [
                                                                                _("Basic"),
                                                                                ": ",
                                                                                r.basic_records
                                                                            ]
                                                                        }, o("span", p)),
                                                                        (u = {
                                                                            class: "mib-chip",
                                                                            children: r.tables_collected ? _("VLAN tables collected") : _("VLAN tables not collected")
                                                                        }, o("span", u)),
                                                                        (f = {
                                                                            class: "mib-chip mib-chip-subtle",
                                                                            children: new Date().toLocaleTimeString()
                                                                        }, o("span", f))
                                                                    ]
                                                                }, o("div", b))), S.replaceChildren(function(e) {
                                                                    var t, r, a, n, i, s;
                                                                    let d = e.classes.length ? e.classes[0].class_id : null, c = (t = {
                                                                        class: "mib-content"
                                                                    }, o("div", t)), p = (r = {
                                                                        type: "search",
                                                                        class: "cbi-input-text mib-search-input",
                                                                        placeholder: _("Search ME name or Class ID\u2026")
                                                                    }, o("input", r)), u = (a = {
                                                                        class: "mib-class-list"
                                                                    }, o("div", a)), f = new Map();
                                                                    function b(t) {
                                                                        var r, a;
                                                                        for (let [e, r] of (d = t, f))e === t ? r.classList.add("active") : r.classList.remove("active");
                                                                        let n = e.entities.filter((e)=>e.class_id === t);
                                                                        n.length ? c.replaceChildren(...n.map((r, a)=>{
                                                                            var n, i, s, d, c, p, u, f, b, g, h, m, v, y, w, x, k, z, j;
                                                                            return j = {
                                                                                open: 0 === a,
                                                                                class: "mib-entity-details",
                                                                                children: [
                                                                                    (c = {
                                                                                        class: "mib-entity-summary",
                                                                                        children: [
                                                                                            (s = {
                                                                                                class: "mib-entity-title",
                                                                                                children: [
                                                                                                    (n = {
                                                                                                        children: l(r.name)
                                                                                                    }, o("strong", n)),
                                                                                                    (i = {
                                                                                                        class: "mib-entity-id-tag",
                                                                                                        children: [
                                                                                                            _("Entity"),
                                                                                                            " ",
                                                                                                            r.entity_id,
                                                                                                            " (0x",
                                                                                                            r.entity_id.toString(16),
                                                                                                            ")"
                                                                                                        ]
                                                                                                    }, o("span", i))
                                                                                                ]
                                                                                            }, o("span", s)),
                                                                                            (d = {
                                                                                                class: "mib-entity-support",
                                                                                                children: r.support
                                                                                            }, o("span", d))
                                                                                        ]
                                                                                    }, o("summary", c)),
                                                                                    (z = {
                                                                                        class: "mib-entity-body",
                                                                                        children: [
                                                                                            r.attributes.length ? (v = {
                                                                                                class: "table mib-attributes-table",
                                                                                                children: [
                                                                                                    (h = {
                                                                                                        children: (g = {
                                                                                                            children: [
                                                                                                                (p = {
                                                                                                                    style: "width:28%",
                                                                                                                    children: _("Attribute")
                                                                                                                }, o("th", p)),
                                                                                                                (u = {
                                                                                                                    style: "width:14%",
                                                                                                                    children: _("Type")
                                                                                                                }, o("th", u)),
                                                                                                                (f = {
                                                                                                                    children: _("Value")
                                                                                                                }, o("th", f)),
                                                                                                                (b = {
                                                                                                                    style: "width:18%",
                                                                                                                    children: _("Definition")
                                                                                                                }, o("th", b))
                                                                                                            ]
                                                                                                        }, o("tr", g))
                                                                                                    }, o("thead", h)),
                                                                                                    (m = {
                                                                                                        children: r.attributes.map((e)=>{
                                                                                                            var t, r, a, n, i, s, d, c, p, u;
                                                                                                            return u = {
                                                                                                                children: [
                                                                                                                    (t = {
                                                                                                                        class: "mib-attr-name",
                                                                                                                        children: e.definition.name
                                                                                                                    }, o("td", t)),
                                                                                                                    (a = {
                                                                                                                        class: "mib-attr-kind",
                                                                                                                        children: (r = {
                                                                                                                            children: e.definition.kind
                                                                                                                        }, o("code", r))
                                                                                                                    }, o("td", a)),
                                                                                                                    (c = {
                                                                                                                        class: "mib-attr-value",
                                                                                                                        children: [
                                                                                                                            (n = {
                                                                                                                                class: "mib-val-display",
                                                                                                                                children: function(e) {
                                                                                                                                    if (null === e) return _("Conflicting values; inspect observations");
                                                                                                                                    switch(e.type){
                                                                                                                                        case "unsigned":
                                                                                                                                        case "signed":
                                                                                                                                        case "decimal":
                                                                                                                                        case "text":
                                                                                                                                            return l(e.value);
                                                                                                                                        case "octets":
                                                                                                                                            return l(e.hex);
                                                                                                                                        case "table_length":
                                                                                                                                            return l(e.bytes);
                                                                                                                                        default:
                                                                                                                                            throw new rv("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                                                    }
                                                                                                                                }(e.value)
                                                                                                                            }, o("span", n)),
                                                                                                                            e.observations?.length ? (d = {
                                                                                                                                class: "mib-obs-details",
                                                                                                                                children: [
                                                                                                                                    (i = {
                                                                                                                                        children: _("Raw data / observations")
                                                                                                                                    }, o("summary", i)),
                                                                                                                                    (s = {
                                                                                                                                        class: "mib-pre",
                                                                                                                                        children: rZ(e.observations)
                                                                                                                                    }, o("pre", s))
                                                                                                                                ]
                                                                                                                            }, o("details", d)) : null
                                                                                                                        ]
                                                                                                                    }, o("td", c)),
                                                                                                                    (p = {
                                                                                                                        class: "mib-attr-ref",
                                                                                                                        children: rW(e.definition)
                                                                                                                    }, o("td", p))
                                                                                                                ]
                                                                                                            }, o("tr", u);
                                                                                                        })
                                                                                                    }, o("tbody", m))
                                                                                                ]
                                                                                            }, o("table", v)) : (y = {
                                                                                                children: _("Basic display only; raw records are preserved.")
                                                                                            }, o("p", y)),
                                                                                            e.tables.filter((e)=>e.class_id === t && e.entity_id === r.entity_id).map((e)=>{
                                                                                                var t, r, a, n, i, s, d, c, p, u, f, b, g, h, m, v;
                                                                                                return v = {
                                                                                                    class: "mib-table-details",
                                                                                                    children: [
                                                                                                        (t = {
                                                                                                            children: [
                                                                                                                e.attribute.name,
                                                                                                                " \xb7",
                                                                                                                " ",
                                                                                                                e.collected ? `${e.rows.length} ${_("rows")}` : l(e.error)
                                                                                                            ]
                                                                                                        }, o("summary", t)),
                                                                                                        e.vlan_rules.length ? (g = {
                                                                                                            class: "mib-table-overflow",
                                                                                                            children: (b = {
                                                                                                                class: "table",
                                                                                                                children: [
                                                                                                                    (u = {
                                                                                                                        children: (p = {
                                                                                                                            children: [
                                                                                                                                (r = {
                                                                                                                                    children: _("Outer filter (priority / VID / TPID-DEI)")
                                                                                                                                }, o("th", r)),
                                                                                                                                (a = {
                                                                                                                                    children: _("Inner filter (priority / VID / TPID-DEI)")
                                                                                                                                }, o("th", a)),
                                                                                                                                (n = {
                                                                                                                                    children: _("EtherType code")
                                                                                                                                }, o("th", n)),
                                                                                                                                (i = {
                                                                                                                                    children: _("Remove tags")
                                                                                                                                }, o("th", i)),
                                                                                                                                (s = {
                                                                                                                                    children: _("Outer treatment (priority / VID / TPID-DEI)")
                                                                                                                                }, o("th", s)),
                                                                                                                                (d = {
                                                                                                                                    children: _("Inner treatment (priority / VID / TPID-DEI)")
                                                                                                                                }, o("th", d)),
                                                                                                                                (c = {
                                                                                                                                    children: _("Delete entry")
                                                                                                                                }, o("th", c))
                                                                                                                            ]
                                                                                                                        }, o("tr", p))
                                                                                                                    }, o("thead", u)),
                                                                                                                    (f = {
                                                                                                                        children: e.vlan_rules.map((e)=>{
                                                                                                                            var t, r, a, n, i, s, d, c;
                                                                                                                            return c = {
                                                                                                                                children: [
                                                                                                                                    (t = {
                                                                                                                                        children: `${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`
                                                                                                                                    }, o("td", t)),
                                                                                                                                    (r = {
                                                                                                                                        children: `${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`
                                                                                                                                    }, o("td", r)),
                                                                                                                                    (a = {
                                                                                                                                        children: l(e.filter_ethertype)
                                                                                                                                    }, o("td", a)),
                                                                                                                                    (n = {
                                                                                                                                        children: l(e.tags_to_remove)
                                                                                                                                    }, o("td", n)),
                                                                                                                                    (i = {
                                                                                                                                        children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                                                    }, o("td", i)),
                                                                                                                                    (s = {
                                                                                                                                        children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                                                    }, o("td", s)),
                                                                                                                                    (d = {
                                                                                                                                        children: l(e.delete_entry)
                                                                                                                                    }, o("td", d))
                                                                                                                                ]
                                                                                                                            }, o("tr", c);
                                                                                                                        })
                                                                                                                    }, o("tbody", f))
                                                                                                                ]
                                                                                                            }, o("table", b))
                                                                                                        }, o("div", g)) : null,
                                                                                                        (h = {
                                                                                                            style: "margin-top:6px",
                                                                                                            children: [
                                                                                                                _("G.988 encoded field values"),
                                                                                                                ": ",
                                                                                                                rW(e.attribute)
                                                                                                            ]
                                                                                                        }, o("p", h)),
                                                                                                        (m = {
                                                                                                            class: "mib-pre",
                                                                                                            children: rZ(e.vlan_rules.length ? e.vlan_rules : e.rows)
                                                                                                        }, o("pre", m))
                                                                                                    ]
                                                                                                }, o("details", v);
                                                                                            }),
                                                                                            (k = {
                                                                                                class: "mib-diag-details",
                                                                                                children: [
                                                                                                    (w = {
                                                                                                        children: _("Records / diagnostics")
                                                                                                    }, o("summary", w)),
                                                                                                    (x = {
                                                                                                        class: "mib-pre",
                                                                                                        children: rZ({
                                                                                                            diagnostics: r.diagnostics,
                                                                                                            records: e.records.filter((e)=>e.class_id === t && e.entity_id === r.entity_id)
                                                                                                        })
                                                                                                    }, o("pre", x))
                                                                                                ]
                                                                                            }, o("details", k))
                                                                                        ]
                                                                                    }, o("div", z))
                                                                                ]
                                                                            }, o("details", j);
                                                                        })) : c.replaceChildren((a = {
                                                                            class: "mib-empty-content",
                                                                            children: (r = {
                                                                                children: _("No entities recorded for this ME class.")
                                                                            }, o("p", r))
                                                                        }, o("div", a)));
                                                                    }
                                                                    function g() {
                                                                        var t;
                                                                        let r = p.value.trim().toLowerCase();
                                                                        f.clear();
                                                                        let a = e.classes.filter((e)=>`${e.class_id} ${e.name ?? ""}`.toLowerCase().includes(r));
                                                                        a.length ? u.replaceChildren(...a.map((e)=>{
                                                                            var t, r, a, n;
                                                                            let i = (n = {
                                                                                type: "button",
                                                                                class: `mib-class-btn${e.class_id === d ? " active" : ""}`,
                                                                                onclick: ()=>b(e.class_id),
                                                                                children: [
                                                                                    (t = {
                                                                                        class: "mib-class-id",
                                                                                        children: e.class_id
                                                                                    }, o("span", t)),
                                                                                    (r = {
                                                                                        class: "mib-class-name",
                                                                                        title: e.name ?? _("Unknown class"),
                                                                                        children: e.name ?? _("Unknown class")
                                                                                    }, o("span", r)),
                                                                                    (a = {
                                                                                        class: "mib-class-count",
                                                                                        children: e.entities
                                                                                    }, o("span", a))
                                                                                ]
                                                                            }, o("button", n));
                                                                            return f.set(e.class_id, i), i;
                                                                        })) : u.replaceChildren((t = {
                                                                            class: "mib-empty-list",
                                                                            children: _("No matching ME classes")
                                                                        }, o("div", t)));
                                                                    }
                                                                    return p.addEventListener("input", g), g(), e.classes.length && b(e.classes[0].class_id), s = {
                                                                        class: "mib-browser",
                                                                        children: [
                                                                            (i = {
                                                                                class: "mib-sidebar",
                                                                                children: [
                                                                                    (n = {
                                                                                        class: "mib-search-box",
                                                                                        children: p
                                                                                    }, o("div", n)),
                                                                                    u
                                                                                ]
                                                                            }, o("div", i)),
                                                                            c
                                                                        ]
                                                                    }, o("div", s);
                                                                }(w), (m = {
                                                                    class: "mib-upload-diagnostics",
                                                                    children: [
                                                                        (g = {
                                                                            children: _("Upload diagnostics")
                                                                        }, o("summary", g)),
                                                                        (h = {
                                                                            class: "mib-pre",
                                                                            children: rZ(w.diagnostics)
                                                                        }, o("pre", h))
                                                                    ]
                                                                }, o("details", m))), a = w, $.textContent = rZ({
                                                                    schema_version: a.schema_version,
                                                                    reference_version: a.reference_version,
                                                                    onu_id: a.onu_id,
                                                                    uploaded_complete: a.uploaded_complete,
                                                                    expected_records: a.expected_records,
                                                                    received_records: a.received_records,
                                                                    decoded_records: a.decoded_records,
                                                                    partial_records: a.partial_records,
                                                                    basic_records: a.basic_records,
                                                                    tables_requested: a.tables_requested,
                                                                    tables_collected: a.tables_collected,
                                                                    class_count: a.classes.length,
                                                                    classes: a.classes.slice(0, 25),
                                                                    additional_classes: Math.max(0, a.classes.length - 25),
                                                                    record_count: a.records.length,
                                                                    first_record: a.records[0] ?? null,
                                                                    table_count: a.tables.length,
                                                                    diagnostics_count: a.diagnostics.length
                                                                }), C.disabled = !1;
                                                                return;
                                                            }
                                                            if (e.progress) {
                                                                let { phase: t, received: r, expected: a } = e.progress;
                                                                if (z.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == a ? "" : `: ${r}/${a}`}` : null == a ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${a}`, a && a > 0) {
                                                                    let e = Math.min(100, Math.round(r / a * 100));
                                                                    j.title = `${e}%`, j.firstElementChild.style.width = `${e}%`;
                                                                }
                                                            }
                                                            if (Date.now() >= O) throw Error(_("MIB query timed out; retry."));
                                                            await new Promise((e)=>setTimeout(e, 1000));
                                                        }
                                                    } catch (e) {
                                                        Z() && (j.style.display = "none", z.replaceChildren(o("span", {
                                                            class: "mib-error-text",
                                                            children: [
                                                                String(e),
                                                                w ? ` \xb7 ${_("Previous snapshot retained")}` : ""
                                                            ]
                                                        })));
                                                    } finally{
                                                        await W(), y = !1, R.disabled = I.disabled = !1;
                                                    }
                                                }
                                            }
                                            async function W() {
                                                if (!x) return;
                                                let e = x;
                                                x = null;
                                                try {
                                                    await rC(e);
                                                } catch (e) {
                                                    console.warn("Failed to release MIB snapshot", e);
                                                }
                                            }
                                            A(m), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, U, "modal-wide");
                                        })(e, "mib"),
                                    children: [
                                        _("View OMCI / MIB details"),
                                        " \u2192"
                                    ]
                                }, o("button", n))
                            }, o("div", i))
                        ]
                    }, o("div", p)),
                    (O = {
                        class: "fttr-grid-2",
                        children: [
                            (v = {
                                class: "fttr-card",
                                children: [
                                    o("h4", {
                                        style: "margin-top:0;margin-bottom:6px;font-size:92%;color:#888",
                                        children: _("Optical physical layer and link parameters")
                                    }),
                                    (u = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Optical RX power")
                                            }),
                                            o("strong", {
                                                children: d(e.optical_rx_power_dbm)
                                            })
                                        ]
                                    }, o("div", u)),
                                    (f = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Optical TX power")
                                            }),
                                            o("strong", {
                                                children: d(e.optical_tx_power_dbm)
                                            })
                                        ]
                                    }, o("div", f)),
                                    (g = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Equalization delay (EQD)")
                                            }),
                                            o("span", {
                                                children: null === (b = e.equalization_delay_bits) ? "\u2014" : `${b} bits`
                                            })
                                        ]
                                    }, o("div", g)),
                                    (h = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Data interface")
                                            }),
                                            o("code", {
                                                children: l(e.data_path?.interface)
                                            })
                                        ]
                                    }, o("div", h)),
                                    (m = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Identity age")
                                            }),
                                            o("span", {
                                                children: c(e.identity_age_seconds) ?? "\u2014"
                                            })
                                        ]
                                    }, o("div", m))
                                ]
                            }, o("div", v)),
                            ($ = {
                                class: "fttr-card",
                                children: [
                                    o("h4", {
                                        style: "margin-top:0;margin-bottom:6px;font-size:92%;color:#888",
                                        children: _("Hardware specifications and firmware images")
                                    }),
                                    (y = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Equipment ID")
                                            }),
                                            o("span", {
                                                children: l(C?.equipment_id ?? e.model)
                                            })
                                        ]
                                    }, o("div", y)),
                                    (w = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Hardware version")
                                            }),
                                            o("code", {
                                                children: l(C?.hardware_version ?? e.hardware_version)
                                            })
                                        ]
                                    }, o("div", w)),
                                    (k = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Firmware version")
                                            }),
                                            (x = {
                                                title: R.full || R.display,
                                                children: o("strong", {
                                                    children: R.display
                                                })
                                            }, o("span", x))
                                        ]
                                    }, o("div", k)),
                                    (z = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("OMCC version")
                                            }),
                                            o("span", {
                                                children: C?.omcc_version != null ? `0x${C.omcc_version.toString(16).padStart(2, "0")} (${C.omcc_version})` : "\u2014"
                                            })
                                        ]
                                    }, o("div", z)),
                                    C?.errors.length ? (j = {
                                        class: "fttr-kv-row",
                                        style: "color:#e74c3c",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Identity read errors")
                                            }),
                                            o("span", {
                                                children: C.errors.join("; ")
                                            })
                                        ]
                                    }, o("div", j)) : null,
                                    P.length > 1 ? (S = {
                                        class: "fttr-kv-row",
                                        style: "font-size:80%;color:#888",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Software images")
                                            }),
                                            o("span", {
                                                children: P.join(" \xb7 ")
                                            })
                                        ]
                                    }, o("div", S)) : null
                                ]
                            }, o("div", $))
                        ]
                    }, o("div", O))
                ]
            }, o("div", M);
        })
    }, o("div", t)) : (r = {
        class: "cbi-section fttr-panel-subgateways",
        children: o("p", {
            style: "text-align:center;color:#888;padding:2em 0",
            children: _("No sub-gateways are currently registered.")
        })
    }, o("div", r));
}
let main = rV.extend({
    load: ()=>rj(),
    render: (e)=>{
        var t, r;
        let a, n, i, s, l, d, c, p, u, f;
        return a = "controller", rH = !1, n = [
            {
                id: "controller",
                label: _("Controller & optical transceiver")
            },
            {
                id: "subgateways",
                label: _("Sub-gateways & optical links")
            }
        ], i = new Map(), s = rQ(e), l = rY(e.sub_gateways ?? []), t = {
            class: "cbi-tabmenu",
            style: "margin-top:14px;margin-bottom:0",
            children: n.map((e)=>{
                var t;
                let r = (t = {
                    class: a === e.id ? "cbi-tab" : "cbi-tab-disabled",
                    "data-tab": e.id,
                    children: o("a", {
                        href: `#tab-${e.id}`,
                        onclick: (t)=>{
                            t.preventDefault();
                            var r = e.id;
                            for (let [e, t] of (a = r, i))t.className = e === r ? "cbi-tab" : "cbi-tab-disabled";
                            s.hidden = "controller" !== r, l.hidden = "subgateways" !== r, window.dispatchEvent(new Event("resize"));
                        },
                        children: e.label
                    })
                }, o("li", t));
                return i.set(e.id, r), r;
            })
        }, d = o("ul", t), s.hidden = !1, l.hidden = !0, rF = e.optical_transceiver.tx_enabled ?? null, rJ = null, c = rG, rS().then((e)=>{
            rH || c !== rG || (rJ = e, rK(rF = e.tx_enabled));
        }).catch(()=>{
            rH || c !== rG || rK(rF = null);
        }), rX = s, rK(rF), p = o("div", {
            id: "fttr-panels-container",
            children: [
                s,
                l
            ]
        }), r = {
            class: "cbi-map fttr-hardware",
            children: [
                o("style", {
                    children: `
				.fttr-hardware {
					--fttr-success-bg: rgba(46, 204, 113, 0.15);
					--fttr-success-color: #27ae60;
					--fttr-success-border: rgba(46, 204, 113, 0.35);

					--fttr-warning-bg: rgba(243, 156, 18, 0.15);
					--fttr-warning-color: #d35400;
					--fttr-warning-border: rgba(243, 156, 18, 0.35);

					--fttr-danger-bg: rgba(231, 76, 60, 0.15);
					--fttr-danger-color: #c0392b;
					--fttr-danger-border: rgba(231, 76, 60, 0.35);

					--fttr-info-bg: rgba(52, 152, 219, 0.15);
					--fttr-info-color: #2980b9;
					--fttr-info-border: rgba(52, 152, 219, 0.35);

					--fttr-neutral-bg: rgba(127, 140, 141, 0.12);
					--fttr-neutral-color: #7f8c8d;
					--fttr-neutral-border: rgba(127, 140, 141, 0.25);
				}

				@media (prefers-color-scheme: dark) {
					.fttr-hardware {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .fttr-hardware,
				[data-theme="dark"] .fttr-hardware {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-danger-color: #e74c3c;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				.fttr-hardware .fttr-badge {
					display: inline-block;
					padding: 0.18em 0.55em;
					font-size: 85%;
					font-weight: 600;
					line-height: 1.25;
					border-radius: 3px;
					white-space: nowrap;
					text-align: center;
				}

				.fttr-hardware .fttr-badge-success {
					background: var(--fttr-success-bg);
					color: var(--fttr-success-color);
					border: 1px solid var(--fttr-success-border);
				}

				.fttr-hardware .fttr-badge-warning {
					background: var(--fttr-warning-bg);
					color: var(--fttr-warning-color);
					border: 1px solid var(--fttr-warning-border);
				}

				.fttr-hardware .fttr-badge-danger {
					background: var(--fttr-danger-bg);
					color: var(--fttr-danger-color);
					border: 1px solid var(--fttr-danger-border);
				}

				.fttr-hardware .fttr-badge-info {
					background: var(--fttr-info-bg);
					color: var(--fttr-info-color);
					border: 1px solid var(--fttr-info-border);
				}

				.fttr-hardware .fttr-badge-neutral {
					background: var(--fttr-neutral-bg);
					color: var(--fttr-neutral-color);
					border: 1px solid var(--fttr-neutral-border);
				}

				.fttr-hardware .fttr-grid-2 {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
					gap: 12px;
					margin: 8px 0;
				}

				.fttr-hardware .fttr-grid-3 {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
					gap: 12px;
					margin: 8px 0;
				}

				.fttr-hardware .fttr-card {
					padding: 12px 14px;
					border: 1px solid rgba(127, 140, 141, 0.2);
					border-radius: 6px;
					background: rgba(127, 140, 141, 0.04);
				}

				.fttr-hardware .fttr-kv-row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 5px 0;
					border-bottom: 1px dashed rgba(127, 140, 141, 0.15);
					font-size: 88%;
				}

				.fttr-hardware .fttr-kv-row:last-child {
					border-bottom: none;
				}

				.fttr-hardware .fttr-kv-label {
					color: #888;
				}

				.fttr-hardware .fttr-onu-card {
					position: relative;
					margin-bottom: 1.2em;
				}

				.fttr-hardware .fttr-card-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: wrap;
					gap: 10px;
					margin-bottom: 10px;
				}

				.fttr-hardware .fttr-card-title-group {
					display: flex;
					align-items: center;
					gap: 10px;
					flex-wrap: wrap;
				}

				.fttr-hardware .fttr-card-meta-tags {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					gap: 6px;
				}

				.fttr-hardware .fttr-btn-subtle {
					font-size: 82%;
					padding: 3px 10px;
					border: 1px solid rgba(127, 140, 141, 0.35);
					background: transparent;
					color: inherit;
					border-radius: 4px;
					cursor: pointer;
					text-decoration: none;
					transition: all 0.2s ease;
				}

				.fttr-hardware .fttr-btn-subtle:hover {
					background: rgba(52, 152, 219, 0.1);
					border-color: rgba(52, 152, 219, 0.4);
					color: #2980b9;
				}

				.fttr-hardware .cbi-tabmenu {
					margin-top: 14px;
					margin-bottom: 0;
					user-select: none;
				}

				.fttr-hardware #fttr-panels-container > .cbi-section {
					margin-top: 0;
					border-top-left-radius: 0;
				}
				`
                }),
                o("h2", {
                    children: _("FTTR hardware status")
                }),
                d,
                p,
                o("p", {
                    class: "cbi-footer",
                    style: "margin-top:1.5em;font-size:85%;color:#888",
                    children: _("Identity information is read-only and limited to fields provided by fttrctl status.")
                })
            ]
        }, u = o("div", r), f = !1, L.Poll.add(async ()=>{
            if (!u.isConnected || f) return;
            f = !0;
            let e = rG;
            try {
                if (rH) return;
                let [t, r] = await Promise.all([
                    rj(),
                    rS()
                ]);
                if (rH || e !== rG) return;
                let n = rQ(t), i = rY(t.sub_gateways ?? []);
                n.hidden = "controller" !== a, i.hidden = "subgateways" !== a, s.replaceWith(n), l.replaceWith(i), s = n, l = i, rX = n, rJ = r, rF = r.tx_enabled, rK(rF);
            } catch  {
                if (rH || e !== rG) return;
                rJ = null, rK(rF = null);
            } finally{
                f = !1;
            }
        }, 10), u;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;