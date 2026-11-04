'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, r, n, i, a;
const s = Symbol.for("jsx.fragment");
function o(e, t) {
    let { children: r, ...n } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, i = function e(t) {
        let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let n of t)null != n && "boolean" != typeof n && (Array.isArray(n) ? e(n, r) : r.push(n instanceof Node ? n : String(n)));
        return r;
    }(null == r ? [] : Array.isArray(r) ? r : [
        r
    ]);
    if (e === s) {
        let e = document.createDocumentFragment();
        return e.append(...i), e;
    }
    if ("function" == typeof e) {
        let t = Reflect.apply(e, void 0, [
            {
                ...n,
                children: i
            }
        ]);
        if (!(t instanceof Node)) throw TypeError("JSX components must return a DOM Node");
        return t;
    }
    if ("string" != typeof e) throw TypeError("JSX element types must be tag names or component functions");
    let a = {}, o = {
        ...n
    };
    for (let [e, t] of Object.entries(o))e.startsWith("on") && "function" == typeof t ? (a[e] = t, delete o[e]) : "boolean" == typeof t && (t ? o[e] = e : delete o[e]);
    let l = Object.keys(o).length > 0 ? i.length > 1 ? E(e, o, i) : E(e, o, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
    for (let [e, t] of Object.entries(a)){
        let r = e.slice(2).toLowerCase();
        l.addEventListener(r, t);
    }
    return l;
}
const l = (e)=>null == e || "" === e ? "\u2014" : String(e);
function c(e) {
    return e ? new Date(1000 * e).toLocaleString() : "\u2014";
}
function d(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
    return null != e && Number.isFinite(e) ? `${e.toFixed(t)} dBm` : "\u2014";
}
function p(e) {
    if (null == e || !Number.isFinite(e) || e < 0) return null;
    let t = Math.floor(e);
    if (t < 60) return (1 === t ? _("%d second ago") : _("%d seconds ago")).replace("%d", String(t));
    let r = Math.floor(t / 60);
    if (r < 60) return (1 === r ? _("%d minute ago") : _("%d minutes ago")).replace("%d", String(r));
    let n = Math.floor(t / 3600);
    if (n < 24) return (1 === n ? _("%d hour ago") : _("%d hours ago")).replace("%d", String(n));
    let i = Math.floor(t / 86400);
    return (1 === i ? _("%d day ago") : _("%d days ago")).replace("%d", String(i));
}
function u(e, t, r) {
    function n(r, n) {
        if (r._zod || Object.defineProperty(r, "_zod", {
            value: {
                def: n,
                constr: s,
                traits: new Set()
            },
            enumerable: !1
        }), r._zod.traits.has(e)) return;
        r._zod.traits.add(e), t(r, n);
        let i = s.prototype, a = Object.keys(i);
        for(let e = 0; e < a.length; e++){
            let t = a[e];
            t in r || (r[t] = i[t].bind(r));
        }
    }
    let i = r?.Parent ?? Object;
    class a extends i {
    }
    function s(e) {
        var t;
        let i = r?.Parent ? new a() : this;
        for (let r of (n(i, e), (t = i._zod).deferred ?? (t.deferred = []), i._zod.deferred))r();
        return i;
    }
    return Object.defineProperty(a, "name", {
        value: e
    }), Object.defineProperty(s, "init", {
        value: n
    }), Object.defineProperty(s, Symbol.hasInstance, {
        value: (t)=>!!r?.Parent && t instanceof r.Parent || t?._zod?.traits?.has(e)
    }), Object.defineProperty(s, "name", {
        value: e
    }), s;
}
Object.freeze({
    status: "aborted"
}), Symbol("zod_brand");
class g extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const f = {};
function b(e) {
    return e && Object.assign(f, e), f;
}
function h(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function m(e) {
    let t = +!!e.startsWith("^"), r = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, r);
}
const v = Symbol("evaluating");
function y(e, t, r) {
    let n;
    Object.defineProperty(e, t, {
        get () {
            if (n !== v) return void 0 === n && (n = v, n = r()), n;
        },
        set (r) {
            Object.defineProperty(e, t, {
                value: r
            });
        },
        configurable: !0
    });
}
const w = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function x(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function k(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function z(e) {
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
function j(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let r = t; r < e.issues.length; r++)if (e.issues[r]?.continue !== !0) return !0;
    return !1;
}
function S(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function $(e) {
    return "string" == typeof e ? e : e?.message;
}
function C(e, t, r) {
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = $(e.inst?._zod.def?.error?.(e)) ?? $(t?.error?.(e)) ?? $(r.customError?.(e)) ?? $(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
}
const M = (e, t)=>{
    e.name = "$ZodError", Object.defineProperty(e, "_zod", {
        value: e._zod,
        enumerable: !1
    }), Object.defineProperty(e, "issues", {
        value: t,
        enumerable: !1
    }), e.message = JSON.stringify(t, h, 2), Object.defineProperty(e, "toString", {
        value: ()=>e.message,
        enumerable: !1
    });
}, O = u("$ZodError", M), P = u("$ZodError", M, {
    Parent: Error
}), A = (r = P, (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise) throw new g();
    if (s.issues.length) {
        let e = new (i?.Err ?? r)(s.issues.map((e)=>C(e, a, b())));
        throw w(e, i?.callee), e;
    }
    return s.value;
}), R = (n = P, async (e, t, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (i?.Err ?? n)(s.issues.map((e)=>C(e, a, b())));
        throw w(e, i?.callee), e;
    }
    return s.value;
}), N = (i = P, (e, t, r)=>{
    let n = r ? {
        ...r,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, n);
    if (a instanceof Promise) throw new g();
    return a.issues.length ? {
        success: !1,
        error: new (i ?? O)(a.issues.map((e)=>C(e, n, b())))
    } : {
        success: !0,
        data: a.value
    };
}), I = (a = P, async (e, t, r)=>{
    let n = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, i = e._zod.run({
        value: t,
        issues: []
    }, n);
    return i instanceof Promise && (i = await i), i.issues.length ? {
        success: !1,
        error: new a(i.issues.map((e)=>C(e, n, b())))
    } : {
        success: !0,
        data: i.value
    };
}), D = /^-?\d+(?:\.\d+)?$/, T = /^(?:true|false)$/i, q = /^null$/i, W = {
    major: 4,
    minor: 3,
    patch: 6
}, B = u("$ZodType", (e, t)=>{
    var r;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = W;
    let n = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && n.unshift(e), n))for (let r of t._zod.onattach)r(e);
    if (0 === n.length) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, r)=>{
            let n, i = j(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, s = a._zod.check(e);
                if (s instanceof Promise && r?.async === !1) throw new g();
                if (n || s instanceof Promise) n = (n ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (i || (i = j(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = j(e, t));
                }
            }
            return n ? n.then(()=>e) : e;
        }, r = (r, i, a)=>{
            if (j(r)) return r.aborted = !0, r;
            let s = t(i, n, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new g();
                return s.then((t)=>e._zod.parse(t, a));
            }
            return e._zod.parse(s, a);
        };
        e._zod.run = (i, a)=>{
            if (a.skipChecks) return e._zod.parse(i, a);
            if ("backward" === a.direction) {
                let t = e._zod.parse({
                    value: i.value,
                    issues: []
                }, {
                    ...a,
                    skipChecks: !0
                });
                return t instanceof Promise ? t.then((e)=>r(e, i, a)) : r(t, i, a);
            }
            let s = e._zod.parse(i, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new g();
                return s.then((e)=>t(e, n, a));
            }
            return t(s, n, a);
        };
    }
    y(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = N(e, t);
                    return r.success ? {
                        value: r.data
                    } : {
                        issues: r.error?.issues
                    };
                } catch (r) {
                    return I(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), U = u("$ZodString", (e, t)=>{
    var r;
    let n;
    B.init(e, t), e._zod.pattern = [
        ...e?._zod.bag?.patterns ?? []
    ].pop() ?? (n = (r = e._zod.bag) ? `[\\s\\S]{${r?.minimum ?? 0},${r?.maximum ?? ""}}` : "[\\s\\S]*", RegExp(`^${n}$`)), e._zod.parse = (r, n)=>{
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
}), Z = u("$ZodNumber", (e, t)=>{
    B.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? D, e._zod.parse = (r, n)=>{
        if (t.coerce) try {
            r.value = Number(r.value);
        } catch (e) {}
        let i = r.value;
        if ("number" == typeof i && !Number.isNaN(i) && Number.isFinite(i)) return r;
        let a = "number" == typeof i ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : "Infinity" : void 0;
        return r.issues.push({
            expected: "number",
            code: "invalid_type",
            input: i,
            inst: e,
            ...a ? {
                received: a
            } : {}
        }), r;
    };
}), V = u("$ZodBoolean", (e, t)=>{
    B.init(e, t), e._zod.pattern = T, e._zod.parse = (r, n)=>{
        if (t.coerce) try {
            r.value = !!r.value;
        } catch (e) {}
        let i = r.value;
        return "boolean" == typeof i || r.issues.push({
            expected: "boolean",
            code: "invalid_type",
            input: i,
            inst: e
        }), r;
    };
}), F = u("$ZodNull", (e, t)=>{
    B.init(e, t), e._zod.pattern = q, e._zod.values = new Set([
        null
    ]), e._zod.parse = (t, r)=>{
        let n = t.value;
        return null === n || t.issues.push({
            expected: "null",
            code: "invalid_type",
            input: n,
            inst: e
        }), t;
    };
}), J = u("$ZodUnknown", (e, t)=>{
    B.init(e, t), e._zod.parse = (e)=>e;
});
function K(e, t, r) {
    e.issues.length && t.issues.push(...S(r, e.issues)), t.value[r] = e.value;
}
const G = u("$ZodArray", (e, t)=>{
    B.init(e, t), e._zod.parse = (r, n)=>{
        let i = r.value;
        if (!Array.isArray(i)) return r.issues.push({
            expected: "array",
            code: "invalid_type",
            input: i,
            inst: e
        }), r;
        r.value = Array(i.length);
        let a = [];
        for(let e = 0; e < i.length; e++){
            let s = i[e], o = t.element._zod.run({
                value: s,
                issues: []
            }, n);
            o instanceof Promise ? a.push(o.then((t)=>K(t, r, e))) : K(o, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function H(e, t, r, n, i) {
    if (e.issues.length) {
        if (i && !(r in n)) return;
        t.issues.push(...S(r, e.issues));
    }
    void 0 === e.value ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
const Q = u("$ZodObject", (e, t)=>{
    var r;
    let n;
    B.init(e, t);
    let i = Object.getOwnPropertyDescriptor(t, "shape");
    if (!i?.get) {
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
    let a = (r = ()=>(function(e) {
            var t;
            let r = Object.keys(e.shape);
            for (let t of r)if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${t}": expected a Zod schema`);
            let n = Object.keys(t = e.shape).filter((e)=>"optional" === t[e]._zod.optin && "optional" === t[e]._zod.optout);
            return {
                ...e,
                keys: r,
                keySet: new Set(r),
                numKeys: r.length,
                optionalKeys: new Set(n)
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
    y(e._zod, "propValues", ()=>{
        let e = t.shape, r = {};
        for(let t in e){
            let n = e[t]._zod;
            if (n.values) for (let e of (r[t] ?? (r[t] = new Set()), n.values))r[t].add(e);
        }
        return r;
    });
    let s = t.catchall;
    e._zod.parse = (t, r)=>{
        n ?? (n = a.value);
        let i = t.value;
        if (!x(i)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: i,
            inst: e
        }), t;
        t.value = {};
        let o = [], l = n.shape;
        for (let e of n.keys){
            let n = l[e], a = "optional" === n._zod.optout, s = n._zod.run({
                value: i[e],
                issues: []
            }, r);
            s instanceof Promise ? o.push(s.then((r)=>H(r, t, e, i, a))) : H(s, t, e, i, a);
        }
        return s ? function(e, t, r, n, i, a) {
            let s = [], o = i.keySet, l = i.catchall._zod, c = l.def.type, d = "optional" === l.optout;
            for(let i in t){
                if (o.has(i)) continue;
                if ("never" === c) {
                    s.push(i);
                    continue;
                }
                let a = l.run({
                    value: t[i],
                    issues: []
                }, n);
                a instanceof Promise ? e.push(a.then((e)=>H(e, r, i, t, d))) : H(a, r, i, t, d);
            }
            return (s.length && r.issues.push({
                code: "unrecognized_keys",
                keys: s,
                input: t,
                inst: a
            }), e.length) ? Promise.all(e).then(()=>r) : r;
        }(o, i, t, r, a.value, e) : o.length ? Promise.all(o).then(()=>t) : t;
    };
});
function X(e, t, r, n) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let i = e.filter((e)=>!j(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>C(e, n, b())))
    }), t);
}
const Y = u("$ZodUnion", (e, t)=>{
    B.init(e, t), y(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), y(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), y(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), y(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>m(e.source)).join("|")})$`);
        }
    });
    let r = 1 === t.options.length, n = t.options[0]._zod.run;
    e._zod.parse = (i, a)=>{
        if (r) return n(i, a);
        let s = !1, o = [];
        for (let e of t.options){
            let t = e._zod.run({
                value: i.value,
                issues: []
            }, a);
            if (t instanceof Promise) o.push(t), s = !0;
            else {
                if (0 === t.issues.length) return t;
                o.push(t);
            }
        }
        return s ? Promise.all(o).then((t)=>X(t, i, e, a)) : X(o, i, e, a);
    };
}), ee = u("$ZodRecord", (e, t)=>{
    B.init(e, t), e._zod.parse = (r, n)=>{
        let i = r.value;
        if (!function(e) {
            if (!1 === x(e)) return !1;
            let t = e.constructor;
            if (void 0 === t || "function" != typeof t) return !0;
            let r = t.prototype;
            return !1 !== x(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
        }(i)) return r.issues.push({
            expected: "record",
            code: "invalid_type",
            input: i,
            inst: e
        }), r;
        let a = [], s = t.keyType._zod.values;
        if (s) {
            let o;
            r.value = {};
            let l = new Set();
            for (let e of s)if ("string" == typeof e || "number" == typeof e || "symbol" == typeof e) {
                l.add("number" == typeof e ? e.toString() : e);
                let s = t.valueType._zod.run({
                    value: i[e],
                    issues: []
                }, n);
                s instanceof Promise ? a.push(s.then((t)=>{
                    t.issues.length && r.issues.push(...S(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...S(e, s.issues)), r.value[e] = s.value);
            }
            for(let e in i)l.has(e) || (o = o ?? []).push(e);
            o && o.length > 0 && r.issues.push({
                code: "unrecognized_keys",
                input: i,
                inst: e,
                keys: o
            });
        } else for (let s of (r.value = {}, Reflect.ownKeys(i))){
            if ("__proto__" === s) continue;
            let o = t.keyType._zod.run({
                value: s,
                issues: []
            }, n);
            if (o instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof s && D.test(s) && o.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(s),
                    issues: []
                }, n);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (o = e);
            }
            if (o.issues.length) {
                "loose" === t.mode ? r.value[s] = i[s] : r.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: o.issues.map((e)=>C(e, n, b())),
                    input: s,
                    path: [
                        s
                    ],
                    inst: e
                });
                continue;
            }
            let l = t.valueType._zod.run({
                value: i[s],
                issues: []
            }, n);
            l instanceof Promise ? a.push(l.then((e)=>{
                e.issues.length && r.issues.push(...S(s, e.issues)), r.value[o.value] = e.value;
            })) : (l.issues.length && r.issues.push(...S(s, l.issues)), r.value[o.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), et = u("$ZodLiteral", (e, t)=>{
    if (B.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? k(e) : e ? k(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (n, i)=>{
        let a = n.value;
        return r.has(a) || n.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
            inst: e
        }), n;
    };
});
function er(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const en = u("$ZodOptional", (e, t)=>{
    B.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", y(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), y(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${m(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let n = t.innerType._zod.run(e, r);
            return n instanceof Promise ? n.then((t)=>er(t, e.value)) : er(n, e.value);
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
            let n = {
                ...r,
                ...this._map.get(e)
            };
            return Object.keys(n).length ? n : void 0;
        }
        return this._map.get(e);
    }
    has(e) {
        return this._map.has(e);
    }
}());
const ei = u("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    B.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>A(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>N(e, t, r), e.parseAsync = async (t, r)=>R(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>I(e, t, r), e.check = (...r)=>e.clone({
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
        let n;
        return n = new e._zod.constr(t ?? e._zod.def), (!t || r?.parent) && (n._zod.parent = e), n;
    }, e.brand = ()=>e, e.register = (t, r)=>(t.add(e, r), e), e.apply = (t)=>t(e);
}), ea = u("ZodMiniString", (e, t)=>{
    U.init(e, t), ei.init(e, t);
});
function es(e) {
    return new ea({
        type: "string",
        ...z(e)
    });
}
const eo = u("ZodMiniNumber", (e, t)=>{
    Z.init(e, t), ei.init(e, t);
});
function el(e) {
    return new eo({
        type: "number",
        checks: [],
        ...z(e)
    });
}
const ec = u("ZodMiniBoolean", (e, t)=>{
    V.init(e, t), ei.init(e, t);
});
function ed(e) {
    return new ec({
        type: "boolean",
        ...z(e)
    });
}
const ep = u("ZodMiniNull", (e, t)=>{
    F.init(e, t), ei.init(e, t);
});
function eu(e) {
    return new ep({
        type: "null",
        ...z(e)
    });
}
const e_ = u("ZodMiniUnknown", (e, t)=>{
    J.init(e, t), ei.init(e, t);
}), eg = u("ZodMiniArray", (e, t)=>{
    G.init(e, t), ei.init(e, t);
});
function ef(e, t) {
    return new eg({
        type: "array",
        element: e,
        ...z(t)
    });
}
const eb = u("ZodMiniObject", (e, t)=>{
    Q.init(e, t), ei.init(e, t), y(e, "shape", ()=>t.shape);
});
function eh(e, t) {
    return new eb({
        type: "object",
        shape: e ?? {},
        ...z(t)
    });
}
const em = u("ZodMiniUnion", (e, t)=>{
    Y.init(e, t), ei.init(e, t);
});
function ev(e, t) {
    return new em({
        type: "union",
        options: e,
        ...z(t)
    });
}
const ey = u("ZodMiniRecord", (e, t)=>{
    ee.init(e, t), ei.init(e, t);
});
function ew(e, t, r) {
    return new ey({
        type: "record",
        keyType: e,
        valueType: t,
        ...z(r)
    });
}
const ex = u("ZodMiniLiteral", (e, t)=>{
    et.init(e, t), ei.init(e, t);
});
function ek(e, t) {
    return new ex({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...z(t)
    });
}
const ez = u("ZodMiniOptional", (e, t)=>{
    en.init(e, t), ei.init(e, t);
});
function ej(e) {
    return new ez({
        type: "optional",
        innerType: e
    });
}
const eS = ev([
    ek("account_set_password"),
    ek("account_set_active")
]), e$ = ev([
    ek("waiting_transport"),
    ek("waiting_identity"),
    ek("reading"),
    ek("configuring"),
    ek("verifying"),
    ek("waiting_inform"),
    ek("ready"),
    ek("retry_wait"),
    ek("manual_required"),
    ek("not_configured"),
    ek("waiting_acs"),
    ek("awaiting_apply"),
    ek("discovering_management_wan"),
    ek("configuring_management_wan"),
    ek("verifying_management_wan")
]), eC = eh({
    enabled: ed(),
    listen: ev([
        es(),
        eu()
    ]),
    path: ev([
        es(),
        eu()
    ]),
    error: ev([
        es(),
        eu()
    ])
}), eM = eh({
    vlan: el(),
    vlans: ef(el()),
    priority: el(),
    acs_url: es()
}), eO = eh({
    state: e$,
    optical_sn: es(),
    cwmp_id: es(),
    mqtt_target: ev([
        es(),
        eu()
    ]),
    binding_source: es(),
    method: es(),
    desired_version: es(),
    generation: el(),
    reason: es(),
    attempts: el(),
    next_retry_at: el(),
    updated_at: el(),
    settings_verified_at: ev([
        el(),
        eu()
    ]),
    selected_vlan: ev([
        el(),
        eu()
    ]),
    last_inform: ev([
        el(),
        eu()
    ]),
    expected_acs_url: es(),
    last_error: ev([
        es(),
        eu()
    ]),
    transport_epoch: el(),
    completed_authorization: el(),
    connection_request_enabled: ev([
        ed(),
        eu()
    ]),
    inflight: ed(),
    persistence_error: ev([
        es(),
        eu()
    ]),
    link_identity_error: ev([
        es(),
        eu()
    ]),
    listener: eC,
    mqtt_last_seen: ev([
        el(),
        eu()
    ]),
    desired: ej(eM),
    endpoint_notice: ej(es()),
    manual_steps: ej(ef(es()))
}), eP = ev([
    ek("pending"),
    ek("unavailable")
]), eA = ev([
    eO,
    eh({
        state: eP,
        reason: es()
    })
]), eR = eh({
    id: es(),
    name: es()
}), eN = eh({
    configured: es(),
    effective: es(),
    available: ef(es()),
    reason: es()
}), eE = eh({
    phase: ev([
        ek("not_started"),
        ek("collecting_identity"),
        ek("retrying_identity"),
        ek("unsupported"),
        ek("configuring"),
        ek("verifying"),
        ek("wan_bootstrap_pending"),
        ek("verified"),
        ek("retrying"),
        ek("offline")
    ]),
    generation: el(),
    error: ev([
        es(),
        eu()
    ])
});
eh({
    success: ed(),
    output: ej(es()),
    error: ej(es())
});
const eI = ev([
    ek("factory"),
    ek("firmware"),
    ek("builtin")
]), eL = eh({
    detected: ed(),
    device: es(),
    has_data: ed(),
    sha256: es(),
    data: es()
}), eD = eh({
    exists: ed(),
    path: es(),
    size: el(),
    sha256: es(),
    data: es()
}), eT = eh({
    source: eI,
    active_path: es(),
    size: el(),
    sha256: es(),
    data: es(),
    factory: eL,
    firmware: eD
}), eq = eh({
    error: es()
});
ev([
    eT,
    eq
]);
const eW = eh({
    success: ed(),
    path: es(),
    size: el(),
    sha256: es()
});
ev([
    eW,
    eq
]), eh({
    data: es()
});
const eB = eh({
    acs: ed(),
    mqtt: ed(),
    npu: ed(),
    "device-hl202": ed(),
    "device-hwtc": ed(),
    "device-star": ed(),
    "device-zte": ed(),
    "device-scty": ed()
}), eU = eh({
    optical: ed(),
    bridge_offload: ed(),
    omci_mib: ed(),
    mqtt_telemetry: ed(),
    hl202_management: ed(),
    cwmp: ed(),
    command_provisioning: ed()
}), eZ = eh({
    status: ed(),
    config: ed(),
    sync: ed(),
    hardware: ed(),
    calibration: ed(),
    hl202: ed(),
    about: ed()
}), eV = eh({
    schema_version: ek(1),
    version: es(),
    features: eB,
    functions: eU,
    pages: eZ,
    adapters: ef(eR)
}), eF = ev([
    eh({
        valid: ek(!0),
        revision: es(),
        devices: el()
    }),
    eh({
        error: es()
    })
]), eJ = ev([
    ek("waiting"),
    ek("wan_reconciling"),
    ek("wan_verifying"),
    ek("wifi_reconciling"),
    ek("discovering"),
    ek("reading"),
    ek("disabling"),
    ek("disabling_read"),
    ek("writing"),
    ek("verifying"),
    ek("settling"),
    ek("completed"),
    ek("not_started"),
    ek("reset_pending"),
    ek("interrupted"),
    ek("recovering"),
    ek("waiting_management"),
    ek("waiting_task")
]), eK = eh({
    operation_id: el(),
    device: es(),
    state: eJ,
    started_at: el()
}), eG = eh({
    state: ev([
        ek("waiting"),
        ek("applied")
    ]),
    requested_revision: es(),
    requested_at: ev([
        el(),
        eu()
    ]),
    blocking_operations: ef(eK),
    reset_pending: ed()
}), eH = ev([
    ek("auto"),
    ek("manual")
]), eQ = ek("diff"), eX = eh({
    state: es(),
    enabled: ed(),
    reason: ej(ev([
        es(),
        eu()
    ])),
    revision: ej(es()),
    vlan: ej(el()),
    updated_at: ej(el())
}), eY = ev([
    ek("online"),
    ek("waiting_inform"),
    ek("offline_or_stale"),
    ek("waiting_transport")
]), e0 = eh({
    cwmp_id: es(),
    state: eY,
    optical_online: ed(),
    last_inform: ev([
        el(),
        eu()
    ]),
    age_seconds: ev([
        el(),
        eu()
    ])
}), e1 = ev([
    ek("device_service"),
    ek("ssid"),
    ek("port_binding"),
    ek("wan_activation")
]), e2 = eh({
    name: es(),
    desired: es()
}), e8 = eh({
    id: es(),
    name: ej(ev([
        es(),
        eu()
    ])),
    kind: e1,
    service_type: es(),
    state: es(),
    reason: ej(es()),
    revision: ej(es()),
    current_revision: ej(ed()),
    management_fresh: ej(ed()),
    operation_id: ej(el()),
    task_id: ej(ev([
        el(),
        eu()
    ])),
    updated_at: ej(el()),
    changes: ej(ef(e2))
}), e5 = ev([
    ek("plan"),
    ek("apply")
]), e4 = eh({
    wan: es(),
    wlan: es(),
    binding: es()
}), e3 = eh({
    state: es(),
    requested: es(),
    contract: ev([
        es(),
        eu()
    ]),
    reason: es(),
    cache_hit: ed(),
    schema: es(),
    capabilities: ev([
        e4,
        eu()
    ])
}), e6 = eh({
    parent: el(),
    connection: el(),
    state: es(),
    service_list: es(),
    kind: es(),
    baseline: ev([
        ef(el()),
        eu()
    ])
}), e7 = eh({
    state: es(),
    reason: ej(es()),
    task_id: ej(ev([
        el(),
        eu()
    ])),
    instance: ej(el()),
    cwmp_id: ej(es())
}), e9 = ev([
    ek("waiting"),
    ek("inventory"),
    ek("classifying"),
    ek("adding_parent"),
    ek("child_names"),
    ek("adding_child"),
    ek("delete_guard"),
    ek("deleting"),
    ek("verify_delete"),
    ek("empty_parent"),
    ek("deleting_parent"),
    ek("verify_parent_delete"),
    ek("next"),
    ek("done")
]), te = eh({
    owned: ef(el()),
    pending: ev([
        es(),
        eu()
    ]),
    pending_instance: ev([
        el(),
        eu()
    ])
}), tt = ev([
    ek("waiting"),
    ek("inventory"),
    ek("adding"),
    ek("verify_add"),
    ek("deleting"),
    ek("verify_delete"),
    ek("reading_disable"),
    ek("disabling"),
    ek("verifying_disable"),
    ek("next"),
    ek("done")
]), tr = ev([
    ek("disable"),
    ek("preserve"),
    ek("delete")
]), tn = eh({
    parent: el(),
    child: el(),
    service: es(),
    vlan: es()
}), ti = eh({
    state: eJ,
    items: ef(e8),
    backend: ej(eN),
    operation_id: ej(el()),
    device: ej(es()),
    optical_sn: ej(es()),
    cwmp_id: ej(es()),
    revision: ej(es()),
    mode: ej(e5),
    started_at: ej(el()),
    completed_at: ej(ev([
        el(),
        eu()
    ])),
    current_revision: ej(ed()),
    management_fresh: ej(ed()),
    reason: ej(es()),
    error: ej(es()),
    attempts: ej(el()),
    next_retry_at: ej(el()),
    reconcile_reason: ej(es()),
    cwmp_contract: ej(e3),
    wan_objects: ej(ew(es(), e6)),
    wan_lifecycle: ej(ew(es(), e7)),
    wan_stage: ej(e9),
    wifi_objects: ej(te),
    wifi_lifecycle: ej(ew(es(), e7)),
    wifi_stage: ej(tt),
    wifi_cleanup: ej(tr),
    native_ownership: ej(ew(es(), tn)),
    write_performed: ej(ed()),
    readback_verified: ej(ed())
}), ta = ev([
    ek("not_configured"),
    ek("stale_revision"),
    ek("stale_management"),
    ek("verified"),
    ek("attention_required"),
    ek("accepted_unverified"),
    ek("pending"),
    ek("recovering"),
    ek("waiting_management")
]), ts = eh({
    device: es(),
    name: ev([
        es(),
        eu()
    ]),
    group: ev([
        es(),
        eu()
    ]),
    group_name: ev([
        es(),
        eu()
    ]),
    template: ev([
        es(),
        eu()
    ]),
    template_name: ev([
        es(),
        eu()
    ]),
    optical_sn: es(),
    adapter: es(),
    omci_management: eX,
    management: ev([
        e0,
        eu()
    ]),
    acs_bootstrap: eA,
    provisioning: ti,
    services: ef(e8),
    ssids: ef(e8),
    wifi_sync: ta
}), to = ev([
    ek("discovering"),
    ek("comparing"),
    ek("planning"),
    ek("applying"),
    ek("verifying"),
    ek("configuring_listener"),
    ek("cleaning_previous"),
    ek("waiting_devices"),
    ek("ready"),
    ek("awaiting_apply"),
    ek("verified"),
    ek("blocked"),
    ek("retry_wait")
]), tl = eh({
    enabled: ed(),
    mode: eH,
    vlan: ef(el()),
    priority: el(),
    address: es(),
    acs_url: es(),
    port: el(),
    path: es(),
    dhcp_enabled: ed()
}), tc = eh({
    operation: es(),
    key: es(),
    value: ef(es())
}), td = eh({
    state: to,
    error: ev([
        es(),
        eu()
    ]),
    inflight: ed(),
    ready: ed(),
    desired_version: ev([
        es(),
        eu()
    ]),
    applied_version: ev([
        es(),
        eu()
    ]),
    next_retry_at: el(),
    attempts: el(),
    desired: ev([
        tl,
        eu()
    ]),
    applied: ev([
        tl,
        eu()
    ]),
    previous: ev([
        tl,
        eu()
    ]),
    plan: ef(tc)
}), tp = eh({
    desired: ev([
        eM,
        eu()
    ]),
    state: es()
}), tu = eh({
    id: es(),
    name: ev([
        es(),
        eu()
    ]),
    template: es()
}), t_ = eh({
    enabled: ed(),
    mode: eH,
    method: eQ,
    revision: es(),
    triggers: ef(es()),
    interval_minutes: el(),
    error: ev([
        es(),
        eu()
    ]),
    devices: ef(ts),
    management_network: td,
    omci_management: tp,
    groups: ef(tu),
    pending_devices: ef(es()),
    onu_pins: ej(ew(es(), el())),
    config_error: ej(ev([
        es(),
        eu()
    ])),
    config_load: ej(eG)
});
ev([
    t_,
    eq
]);
const tg = eh({
    enabled: ev([
        ed(),
        eu()
    ]),
    routed_enabled: ev([
        ed(),
        eu()
    ]),
    bridge_enabled: ev([
        ed(),
        eu()
    ]),
    engine_attached: ev([
        ed(),
        eu()
    ]),
    forwarding_verified: ev([
        ed(),
        eu()
    ])
}), tf = eh({
    entity_id: el(),
    port_id: ev([
        el(),
        eu()
    ])
}), tb = eh({
    entity_id: el(),
    filter_list_hex: ev([
        es(),
        eu()
    ]),
    forward_operation: ev([
        el(),
        eu()
    ]),
    number_of_entries: ev([
        el(),
        eu()
    ])
}), th = eh({
    entity_id: el(),
    received_frame_rules_hex: ev([
        ef(es()),
        eu()
    ]),
    error: ev([
        es(),
        eu()
    ])
}), tm = eh({
    age_seconds: el(),
    gem_ports: ef(tf),
    vlan_filters: ef(tb),
    vlan_operations: ef(th)
}), tv = eh({
    source: es(),
    unit: es(),
    reason: ev([
        es(),
        eu()
    ]),
    raw: ev([
        es(),
        eu()
    ]),
    age_seconds: ev([
        el(),
        eu()
    ])
}), ty = eh({
    interface: es(),
    gem_ports: ev([
        ef(el()),
        eu()
    ]),
    vlan_id: ev([
        el(),
        eu()
    ]),
    onu_inventory: ev([
        tm,
        eu()
    ]),
    tx_bytes: ev([
        el(),
        eu()
    ]),
    rx_bytes: ev([
        el(),
        eu()
    ]),
    current_tx_kbps: ev([
        el(),
        eu()
    ]),
    current_rx_kbps: ev([
        el(),
        eu()
    ]),
    olt_channel_gem: ej(el()),
    forwarding_verified: ej(ed()),
    offload: tg,
    measurements: ew(es(), tv)
});
eh({});
const tw = eh({
    entity_id: el(),
    interval_end_time: el(),
    corrected_bytes: el(),
    corrected_code_words: el(),
    uncorrectable_code_words: el(),
    total_code_words: el(),
    fec_seconds: el()
}), tx = eh({
    ani_entity_id: ev([
        el(),
        eu()
    ]),
    control_supported: ed(),
    downstream_enabled: ev([
        ed(),
        eu()
    ]),
    upstream_enabled: ev([
        ed(),
        eu()
    ]),
    downstream_pm: ev([
        tw,
        eu()
    ]),
    measurement: tv
}), tk = eh({
    entry: ev([
        ek(0),
        ek(1),
        ek(2)
    ]),
    username: es(),
    active: ed()
}), tz = eh({
    mqtt_mac: es(),
    optical_sn: ev([
        es(),
        eu()
    ]),
    onu_id: ev([
        el(),
        eu()
    ]),
    binding_generation: es(),
    last_seen: el(),
    reason: es()
}), tj = ev([
    ek("executed"),
    ek("dispatched"),
    ek("timeout"),
    ek("error")
]), tS = eh({
    target: es(),
    status: tj,
    request_id: ej(es()),
    exit_code: ej(el()),
    output: ej(es()),
    output_truncated: ed(),
    error: ej(es())
}), t$ = eh({
    target: tz,
    result: tS,
    binding_current: ed()
}), tC = ev([
    ek("not_applicable"),
    ek("accepted_and_saved"),
    ek("unconfirmed")
]), tM = eh({
    code: es(),
    message: es()
});
ev([
    eh({
        schema_version: ek(1),
        operation: t$,
        accounts: ev([
            ef(tk),
            eu()
        ]),
        write_status: tC
    }),
    eh({
        schema_version: el(),
        error: tM
    })
]);
const tO = eh({
    optical_sn: es(),
    onu_id: el(),
    binding_generation: es()
}), tP = eh({
    mqtt_mac: es(),
    binding_generation: es()
}), tA = ev([
    tO,
    tP
]);
eh({
    target: tA
});
const tR = ev([
    eh({
        kind: ek("exec"),
        script: es(),
        timeout_seconds: el()
    }),
    eh({
        kind: ek("accounts_read")
    }),
    eh({
        kind: ek("account_set_password"),
        entry: el(),
        password: es()
    }),
    eh({
        kind: ek("account_set_active"),
        entry: el(),
        active: ed()
    })
]), tN = eh({
    schema_version: el(),
    target: tO,
    action: tR
}), tE = eh({
    optical_sn: es(),
    onu_id: el(),
    model: es(),
    optical_online: ed(),
    can_execute: ed(),
    mqtt: ev([
        tz,
        eu()
    ]),
    report_revision: ev([
        el(),
        eu()
    ])
});
ev([
    eh({
        schema_version: ek(1),
        operation: t$
    }),
    eh({
        schema_version: el(),
        error: tM
    })
]), eh({
    target: tA,
    script: es(),
    timeout_seconds: el()
});
const tI = ev([
    eh({
        schema_version: ek(1),
        devices: ef(tE),
        sources: ef(tz)
    }),
    eh({
        schema_version: el(),
        error: tM
    })
]);
ev([
    eh({
        method: ek("list")
    }),
    eh({
        method: ek("report"),
        target: tO
    }),
    eh({
        method: ek("source_report"),
        target: tP
    }),
    eh({
        method: ek("run"),
        request: tN
    })
]);
const tL = ev([
    ek("received"),
    ek("report_unavailable")
]), tD = eh({
    value: new e_({
        type: "unknown"
    }),
    member: es(),
    unit: ev([
        es(),
        eu()
    ])
}), tT = eh({
    name: es(),
    bytes: el(),
    encoding: es(),
    text: ev([
        es(),
        eu()
    ]),
    text_omitted: ed()
}), tq = eh({
    schema_version: el(),
    compressed_bytes: el(),
    decompressed_bytes: el(),
    fields: ew(es(), tD),
    members: ef(tT),
    errors: ef(es())
}), tW = eh({
    revision: el(),
    last_received: el(),
    last_processed_receipt: ev([
        el(),
        eu()
    ]),
    last_good: ev([
        el(),
        eu()
    ]),
    error: ev([
        es(),
        eu()
    ]),
    report: ev([
        tq,
        eu()
    ])
});
ev([
    eh({
        schema_version: ek(1),
        target: tz,
        report: ev([
            tW,
            eu()
        ]),
        state: tL
    }),
    eh({
        schema_version: ek(1),
        target: tz,
        report: ev([
            tW,
            eu()
        ]),
        read_only: ek(!0)
    }),
    eh({
        schema_version: el(),
        error: tM
    })
]), eh({
    target: tA
}), eh({
    target: tA,
    kind: eS,
    entry: el(),
    password: es(),
    active: ed()
});
const tB = eh({
    accepted: el(),
    rejected: el(),
    read_errors: el(),
    handled: el(),
    max_intake_us: el(),
    max_handler_us: el()
}), tU = ek("pending"), tZ = eh({
    phase: ev([
        ek("starting"),
        ek("upload"),
        ek("tables")
    ]),
    received: el(),
    expected: ev([
        el(),
        eu()
    ])
}), tV = ek("ready"), tF = ev([
    eh({
        status: tU,
        progress: ej(tZ)
    }),
    eh({
        status: tV,
        chunk: el(),
        chunks: el(),
        bytes: el(),
        data: es()
    })
]);
ev([
    tF,
    eq
]);
const tJ = eh({
    status: tU,
    job: es()
}), tK = eh({
    released: ed()
});
eh({
    job: es()
}), eh({
    job: es(),
    chunk: el()
}), ev([
    tJ,
    eq
]);
const tG = eh({
    accepting: ed(),
    running: el(),
    stored: el(),
    bytes: el(),
    running_limit: el(),
    stored_limit: el(),
    bytes_limit: el(),
    result_bytes_limit: el()
}), tH = eh({
    mac: es(),
    ip: es(),
    band: es(),
    rssi_dbm: ev([
        el(),
        eu()
    ]),
    rx_rate_mbps: ev([
        el(),
        eu()
    ]),
    tx_rate_mbps: ev([
        el(),
        eu()
    ])
}), tQ = ev([
    ek("unknown"),
    ek("octets"),
    ek("string"),
    ek("unsigned_integer"),
    ek("table"),
    ek("signed_integer"),
    ek("pointer"),
    ek("bit_field"),
    ek("enumeration"),
    ek("counter")
]), tX = eh({
    id: es(),
    url: es()
}), tY = eh({
    name: es(),
    kind: tQ,
    index: el(),
    mask: el(),
    size: el(),
    read: ed(),
    write: ed(),
    set_by_create: ed(),
    avc: ed(),
    optional: ed(),
    deprecated: ed(),
    default_hex: ev([
        es(),
        eu()
    ]),
    reference: tX
}), t0 = ev([
    eh({
        type: ek("unsigned"),
        value: el()
    }),
    eh({
        type: ek("signed"),
        value: el()
    }),
    eh({
        type: ek("decimal"),
        value: es()
    }),
    eh({
        type: ek("text"),
        value: ev([
            es(),
            eu()
        ])
    }),
    eh({
        type: ek("octets"),
        hex: es()
    }),
    eh({
        type: ek("table_length"),
        bytes: el()
    })
]), t1 = eh({
    raw_hex: es(),
    value: t0,
    sequences: ef(el())
}), t2 = eh({
    definition: tY,
    value: ev([
        t0,
        eu()
    ]),
    observations: ef(t1)
}), t8 = ev([
    ek("layout"),
    ek("name_only"),
    ek("unknown")
]), t5 = eh({
    class_id: el(),
    name: ev([
        es(),
        eu()
    ]),
    entities: el(),
    records: el(),
    support: t8
}), t4 = eh({
    code: es(),
    message: es(),
    offset: el(),
    mask: el()
}), t3 = eh({
    class_id: el(),
    entity_id: el(),
    name: ev([
        es(),
        eu()
    ]),
    support: t8,
    reference: ev([
        tX,
        eu()
    ]),
    sequences: ef(el()),
    attributes: ef(t2),
    diagnostics: ef(t4)
}), t6 = ek("ready"), t7 = eh({
    class_id: el(),
    entity_id: el(),
    sequence: el(),
    attribute_mask: el(),
    raw_hex: es(),
    consumed: el(),
    remaining_hex: es(),
    undecoded_mask: el()
}), t9 = eh({
    raw_hex: es(),
    filter_outer_priority: el(),
    filter_outer_vid: el(),
    filter_outer_tpid_dei: el(),
    filter_inner_priority: el(),
    filter_inner_vid: el(),
    filter_inner_tpid_dei: el(),
    filter_ethertype: el(),
    tags_to_remove: el(),
    treatment_outer_priority: el(),
    treatment_outer_vid: el(),
    treatment_outer_tpid_dei: el(),
    treatment_inner_priority: el(),
    treatment_inner_vid: el(),
    treatment_inner_tpid_dei: el(),
    delete_entry: ed()
}), re = eh({
    class_id: el(),
    entity_id: el(),
    attribute: tY,
    collected: ed(),
    error: ev([
        es(),
        eu()
    ]),
    raw_hex: es(),
    rows: ef(es()),
    vlan_rules: ef(t9)
}), rt = eh({
    schema_version: ek(1),
    reference_version: es(),
    onu_id: ev([
        el(),
        eu()
    ]),
    uploaded_complete: ed(),
    expected_records: el(),
    received_records: el(),
    decoded_records: el(),
    partial_records: el(),
    basic_records: el(),
    tables_requested: ed(),
    tables_collected: ed(),
    classes: ef(t5),
    entities: ef(t3),
    records: ef(t7),
    tables: ef(re),
    diagnostics: ef(t4)
}), rr = eh({
    status: t6,
    report: rt
});
eh({
    onu_id: el(),
    optical_sn: es(),
    tables: ed()
});
const rn = ev([
    eh({
        status: ek("success"),
        enabled: ed()
    }),
    eh({
        status: ek("error"),
        error: es()
    })
]);
eh({
    enabled: ed(),
    bridge: es(),
    wan_upstream: ed(),
    wan_downstream: ed(),
    onu_bridge: ed()
});
const ri = eh({
    index: es(),
    state: es(),
    pkt_type: es(),
    orig_tuple: es(),
    new_tuple: es(),
    eth: es(),
    vlan: es(),
    packets: el(),
    bytes: el(),
    counters_valid: ed(),
    packets_exact: es(),
    bytes_exact: es()
}), ra = eh({
    sampled_at_ms: el(),
    errors: ef(es()),
    config_valid: ed(),
    engine_valid: ed(),
    mask_valid: ed(),
    routed_mask_valid: ed(),
    debug_valid: ed(),
    flows_valid: ed(),
    entries_valid: ed(),
    counters_valid: ed(),
    hooks_valid: ed(),
    total_packets_exact: es(),
    total_bytes_exact: es(),
    supported: ed(),
    engine_attached: ed(),
    bridge_offload_enabled: ed(),
    wan_upstream: ed(),
    wan_downstream: ed(),
    onu_bridge: ed(),
    bridge_offload_mask: el(),
    routed_offload_mask: el(),
    bridge_offload_debug: ed(),
    bridge: es(),
    active_ports: ef(es()),
    fw4_hooks_ready: ed(),
    total_entries: el(),
    bound_entries: el(),
    bound_ipv4_entries: el(),
    bound_ipv6_entries: el(),
    total_packets: el(),
    total_bytes: el(),
    bound_flows: ef(ri)
}), rs = eh({
    equipment_id: ev([
        es(),
        eu()
    ]),
    hardware_version: ev([
        es(),
        eu()
    ]),
    software_images: ef(es()),
    omcc_version: ev([
        el(),
        eu()
    ]),
    errors: ef(es())
}), ro = eh({
    desired: ew(es(), el()),
    active: ew(es(), el()),
    pending_restart: ed(),
    allocation_blocked: ed(),
    startup_error: ev([
        es(),
        eu()
    ]),
    config_error: ev([
        es(),
        eu()
    ])
}), rl = ev([
    ek("optical_on"),
    ek("optical_off"),
    ek("optical_status"),
    ek("optical_reload"),
    ek("optical_reinitialize"),
    ek("optical_shutdown")
]), rc = eh({
    enabled: ed(),
    downstream_tx_enabled: ed(),
    fec_enabled: ed()
}), rd = eh({
    desired_tx_enabled: ed(),
    desired_fec_enabled: ed(),
    register: ev([
        el(),
        eu()
    ]),
    tx_enabled: ev([
        ed(),
        eu()
    ]),
    fec_enabled: ev([
        ed(),
        eu()
    ]),
    error: ev([
        es(),
        eu()
    ])
}), rp = ev([
    ek("success"),
    ek("error")
]), ru = ev([
    ek("enabled"),
    ek("disabled"),
    ek("unknown")
]), r_ = eh({
    settings: ej(rc),
    pon_mac: ej(rd),
    schema_version: ek(1),
    status: rp,
    action: rl,
    desired_enabled: ev([
        ed(),
        eu()
    ]),
    tx_enabled: ev([
        ed(),
        eu()
    ]),
    actor_state: ru,
    hardware_ready: ed(),
    discovery_active: ed(),
    cleanup_pending: ed(),
    error: ev([
        tM,
        eu()
    ])
}), rg = eh({
    model: es(),
    wavelength_tx_nm: el(),
    wavelength_rx_nm: el(),
    phy_rate_downlink_gbps: el(),
    phy_rate_uplink_gbps: el(),
    tx_power_dbm: ev([
        el(),
        eu()
    ]),
    laser_bias_current_ma: ev([
        el(),
        eu()
    ]),
    temperature_celsius: ev([
        el(),
        eu()
    ]),
    vcc_voltage: ev([
        el(),
        eu()
    ]),
    cdr_locked: ev([
        ed(),
        eu()
    ]),
    tx_enabled: ej(ed()),
    measurements: ew(es(), tv)
}), rf = ev([
    ek("o1_initial"),
    ek("o2_standby"),
    ek("o3_serial_number"),
    ek("o4_ranging"),
    ek("o5_operation"),
    ek("o6_intermittent_lods"),
    ek("o7_emergency_stop")
]), rb = eh({
    restarting: ek(!0)
}), rh = eh({
    calls: el(),
    failures: el(),
    last_us: el(),
    max_us: el(),
    total_us: el()
}), rm = eh({
    port: el(),
    interface: es(),
    carrier: ed(),
    status: es(),
    onu_id: ej(el()),
    onu_sn: ej(es()),
    link_state: es(),
    reserved_sn: ej(es())
}), rv = eh({
    channel_2g: ev([
        el(),
        eu()
    ]),
    channel_5g: ev([
        el(),
        eu()
    ]),
    bandwidth_5g: ev([
        es(),
        eu()
    ]),
    tx_power_pct: ev([
        el(),
        eu()
    ]),
    measurements: ew(es(), tv)
}), ry = eh({
    onu_id: el(),
    vendor: es(),
    model: es(),
    serial_number: es(),
    state: rf,
    business_status: eE,
    management: ev([
        e0,
        eu()
    ]),
    provisioning: ev([
        ti,
        eu()
    ]),
    services: ef(e8),
    ssids: ef(e8),
    wifi_sync: ta,
    identity: ev([
        rs,
        eu()
    ]),
    identity_age_seconds: ev([
        el(),
        eu()
    ]),
    identity_current: ed(),
    fiber_distance_m: ev([
        el(),
        eu()
    ]),
    ranging_delay_rtd_ns: ev([
        el(),
        eu()
    ]),
    equalization_delay_bits: ev([
        el(),
        eu()
    ]),
    optical_rx_power_dbm: ev([
        el(),
        eu()
    ]),
    optical_tx_power_dbm: ev([
        el(),
        eu()
    ]),
    firmware_version: es(),
    hardware_version: es(),
    uptime_seconds: ev([
        el(),
        eu()
    ]),
    fec: ej(tx),
    data_path: ty,
    wifi_mesh: rv,
    connected_clients: ev([
        ef(tH),
        eu()
    ]),
    measurements: ew(es(), tv)
}), rw = eh({
    id: es(),
    last_seen_sec_ago: el(),
    last_payload_bytes: el()
}), rx = eh({
    ubus: ej(ew(es(), rh)),
    jobs: ej(tG),
    onu_pinning: ej(ro),
    fpga_status: es(),
    pon_mac: ej(rd),
    provisioning: ev([
        t_,
        eu()
    ]),
    optical_transceiver: rg,
    switch_ports: ef(rm),
    sub_gateways: ef(ry),
    telemetry_gateways: ef(rw),
    npu: ej(ra),
    ipc: ej(tB)
}), rk = ev([
    ek("plan"),
    ek("apply"),
    ek("management_plan"),
    ek("management_apply"),
    ek("reset_state"),
    ek("reconcile"),
    ek("retry")
]), rz = ev([
    eh({
        operation_ids: ef(el()),
        revision: es()
    }),
    eh({
        started: ek(!0),
        mode: e5
    }),
    eh({
        reset: ek(!0),
        device: es()
    }),
    eh({
        operation_ids: ef(el()),
        mode: e5,
        reconcile: ej(ed()),
        retry: ej(ed())
    }),
    eq
]);
eh({
    action: rk,
    target: es(),
    management: ej(ed()),
    item: ej(es())
});
let rj = eh({
    error: ev([
        es(),
        eh({
            code: es(),
            message: es()
        })
    ])
});
class rS extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function r$(e) {
    let t = rj.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new rS("rpc", e) : new rS(e.code, e.message);
    }
    return e;
}
const rC = {
    parse (e) {
        let t = tI.parse(r$(e));
        if ("object" == typeof t && null !== t && "error" in t) throw r$(t), Error("Unexpected RPC error");
        return t;
    }
}, rM = {
    parse (e) {
        let t = rz.parse(r$(e));
        if ("error" in t) throw Error(t.error);
        return t;
    }
};
ew(es(), eh({
    carrier: ej(ed()),
    mac: ej(es()),
    link: ej(eh({
        speed: ej(el()),
        duplex: ej(es()),
        autoneg: ej(ed())
    })),
    stats: ej(ew(es(), el()))
}));
const rO = {
    getCapabilities: {
        parse: (e)=>eV.parse(r$(e))
    },
    opticalStatus: r_,
    opticalSet: r_,
    getStatus: {
        parse: (e)=>rx.parse(r$(e))
    },
    getSync: {
        parse: (e)=>t_.parse(r$(e))
    },
    configCheck: {
        parse (e) {
            if ("object" == typeof e && null !== e && "error" in e && ("valid" in e || "revision" in e || "devices" in e)) throw Error("Mixed configuration check result");
            return eF.parse(e);
        }
    },
    npuStatus: ra,
    configReload: {
        parse: (e)=>t_.parse(r$(e))
    },
    restartService: {
        parse: (e)=>rb.parse(r$(e))
    },
    sync: {
        parse: (e)=>rM.parse(r$(e))
    },
    npuSet: rn,
    mibStart: {
        parse: (e)=>tJ.parse(r$(e))
    },
    mibResult: {
        parse: (e)=>tF.parse(r$(e))
    },
    jobRelease: {
        parse: (e)=>tK.parse(r$(e))
    },
    hl202List: {
        parse: (e)=>rC.parse(r$(e))
    },
    hl202Report: {
        parse: (e)=>tJ.parse(r$(e))
    },
    hl202AccountsStart: {
        parse: (e)=>tJ.parse(r$(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>tJ.parse(r$(e))
    },
    hl202ExecStart: {
        parse: (e)=>tJ.parse(r$(e))
    },
    jobResult: {
        parse: (e)=>tF.parse(r$(e))
    },
    getCalibration: {
        parse: (e)=>eT.parse(r$(e))
    },
    saveCalibration: {
        parse: (e)=>eW.parse(r$(e))
    },
    applyCalibration: {
        parse: (e)=>tJ.parse(r$(e))
    }
};
function rP() {
    var e;
    let r, n, i, a, s, o, l, c, d, p, u, g, f, b, h, m, v, y, w, x, k, z, j;
    return t ??= (e = L.rpc, r = e.declare({
        object: "fttr",
        method: "get_capabilities",
        reject: !0
    }), n = e.declare({
        object: "fttr",
        method: "optical_status",
        reject: !0
    }), i = e.declare({
        object: "fttr",
        method: "optical_set",
        params: [
            "enabled",
            "downstream_tx_enabled",
            "fec_enabled"
        ],
        reject: !0
    }), a = e.declare({
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
    }), c = e.declare({
        object: "fttr",
        method: "config_reload",
        reject: !0
    }), d = e.declare({
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
    }), g = e.declare({
        object: "fttr",
        method: "mib_start",
        params: [
            "onu_id",
            "optical_sn",
            "tables"
        ],
        reject: !0
    }), f = e.declare({
        object: "fttr",
        method: "mib_result",
        params: [
            "job",
            "chunk"
        ],
        reject: !0
    }), b = e.declare({
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
        getCapabilities: async ()=>rO.getCapabilities.parse(await r()),
        opticalStatus: async ()=>rO.opticalStatus.parse(await n()),
        opticalSet: async (e)=>rO.opticalSet.parse(await i(e.enabled, e.downstream_tx_enabled, e.fec_enabled)),
        getStatus: async ()=>rO.getStatus.parse(await a()),
        getSync: async ()=>rO.getSync.parse(await s()),
        configCheck: async ()=>rO.configCheck.parse(await o()),
        npuStatus: async ()=>rO.npuStatus.parse(await l()),
        configReload: async ()=>rO.configReload.parse(await c()),
        restartService: async ()=>rO.restartService.parse(await d()),
        sync: async (e)=>rO.sync.parse(await p(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>rO.npuSet.parse(await u(e.enabled, e.bridge, e.wan_upstream, e.wan_downstream, e.onu_bridge)),
        mibStart: async (e)=>rO.mibStart.parse(await g(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>rO.mibResult.parse(await f(e.job, e.chunk)),
        jobRelease: async (e)=>rO.jobRelease.parse(await b(e.job)),
        hl202List: async ()=>rO.hl202List.parse(await h()),
        hl202Report: async (e)=>rO.hl202Report.parse(await m(e.target)),
        hl202AccountsStart: async (e)=>rO.hl202AccountsStart.parse(await v(e.target)),
        hl202AccountUpdate: async (e)=>rO.hl202AccountUpdate.parse(await y(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>rO.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>rO.jobResult.parse(await x(e.job, e.chunk)),
        getCalibration: async ()=>rO.getCalibration.parse(await k()),
        saveCalibration: async (e)=>rO.saveCalibration.parse(await z(e.data)),
        applyCalibration: async ()=>rO.applyCalibration.parse(await j())
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
const rA = async ()=>rP().getStatus(), rR = async ()=>rP().getSync(), rN = async ()=>rP().configCheck(), rE = async (e, t)=>rP().sync({
        action: e,
        target: t
    }), rI = async (e, t, r)=>rP().mibStart({
        onu_id: e,
        optical_sn: t,
        tables: r
    }), rL = async (e, t)=>rP().mibResult({
        job: e,
        chunk: t
    }), rD = async (e)=>rP().jobRelease({
        job: e
    });
function rT(e) {
    let t = "none" === e.tone ? "" : `fttr-badge fttr-badge-${e.tone}`, r = e.class ? ` ${e.class}` : "", n = o("span", {
        class: `${t}${r}`.trim(),
        children: e.children
    });
    return e.title && n.setAttribute("title", e.title), n;
}
const rq = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
};
function rW(e) {
    var t;
    let r = (t = e.state) ? "o5_operation" === t ? {
        tone: "success",
        label: rq.o5_operation,
        title: t
    } : {
        tone: "warning",
        label: rq[t] ?? l(t),
        title: t
    } : {
        tone: "none",
        label: "\u2014"
    };
    return o(rT, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
function rB(e) {
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
    return o(rT, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const rU = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
};
function rZ(e) {
    var t;
    let r, n, i, a, s, c, d = (t = e.management, r = t?.state, n = p(t?.age_seconds ?? (t?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - t.last_inform) : null)), a = (i = t?.last_inform ? new Date(1000 * t.last_inform).toLocaleString() : null) ? _("Last Inform: %s").replace("%s", i) : void 0, s = "\u2014", c = "none", "online" === r ? (c = "success", s = rU.online) : "waiting_inform" === r ? (c = "warning", s = rU.waiting_inform) : "offline_or_stale" === r ? (c = "danger", s = rU.offline_or_stale) : r && (c = "neutral", s = l(r)), {
        tone: c,
        label: n && r ? `${s} \xb7 ${n}` : s,
        title: a
    });
    return o(rT, {
        tone: d.tone,
        title: d.title,
        children: d.label
    });
}
const rV = {
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
function rF(e) {
    var t, r;
    let n, i, a, s = (t = e.provisioning, r = e.title, n = t?.state, i = t?.next_retry_at && t.next_retry_at > Math.floor(Date.now() / 1000) ? t.next_retry_at - Math.floor(Date.now() / 1000) : 0, a = r ?? (t?.current_revision === !1 ? _("Previous configuration") : t?.management_fresh === !1 ? _("Management stale") : t?.reconcile_reason ? t.reconcile_reason : i > 0 ? _("Next self-healing retry in %d seconds").replace("%d", String(i)) : t?.reason ?? t?.error), n && "not_started" !== n ? "completed" === n || "verified" === n ? {
        tone: "success",
        label: "completed" === n ? rV.completed : _("Ready"),
        title: a
    } : "wan_reconciling" === n || "wan_verifying" === n || "wifi_reconciling" === n || "discovering" === n || "reading" === n || "disabling" === n || "disabling_read" === n || "writing" === n || "verifying" === n || "settling" === n || "recovering" === n || "waiting_task" === n ? {
        tone: "info",
        label: rV[n] ?? l(n),
        title: a
    } : "interrupted" === n || "failed" === n || "error" === n || "blocked" === n ? {
        tone: "danger",
        label: "blocked" === n ? rV.blocked : rV.interrupted,
        title: a
    } : "waiting" === n || "pending" === n || "waiting_management" === n || "reset_pending" === n ? {
        tone: "warning",
        label: rV[n] ?? rV.waiting,
        title: a
    } : {
        tone: "neutral",
        label: l(n),
        title: a
    } : {
        tone: "neutral",
        label: rV.not_started,
        title: a
    });
    return o(rT, {
        tone: s.tone,
        title: s.title,
        children: s.label
    });
}
const rJ = {
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
function rK(e) {
    var t;
    let r = (t = e.state) && "not_configured" !== t ? "verified" === t ? {
        tone: "success",
        label: rJ.verified
    } : "attention_required" === t ? {
        tone: "danger",
        label: rJ.attention_required
    } : "stale_revision" === t || "stale_management" === t || "waiting_management" === t ? {
        tone: "warning",
        label: rJ[t]
    } : "recovering" === t ? {
        tone: "info",
        label: rJ.recovering
    } : "accepted_unverified" === t || "pending" === t ? {
        tone: "warning",
        label: rJ[t]
    } : {
        tone: "neutral",
        label: l(t)
    } : {
        tone: "neutral",
        label: rJ.not_configured
    };
    return o(rT, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const rG = `
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
let rH = (e)=>JSON.stringify(e, null, 2);
async function rQ(e) {
    let t = [
        "{"
    ], r = !0;
    for (let [n, i] of Object.entries(e))if (r || t.push(","), r = !1, t.push(JSON.stringify(n), ":"), Array.isArray(i)) {
        t.push("[");
        for(let e = 0; e < i.length; e++){
            e && t.push(",");
            let r = JSON.stringify(i[e]);
            if (void 0 === r) throw Error(_("MIB snapshot cannot be serialized"));
            t.push(r), e % 32 == 31 && await new Promise((e)=>setTimeout(e, 0));
        }
        t.push("]");
    } else {
        let e = JSON.stringify(i);
        if (void 0 === e) throw Error(_("MIB snapshot cannot be serialized"));
        t.push(e);
    }
    return t.push("}"), new Blob(t, {
        type: "application/json"
    });
}
function rX(e) {
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
const rY = async ()=>rP().getCapabilities();
async function r0(e) {
    if (!(await rY()).pages[e]) throw Error(_("This page is not supported by the installed FTTR build."));
}
let r1 = {
    ready: {
        label: _("Ready"),
        type: "success"
    },
    verified: {
        label: _("Verified"),
        type: "success"
    },
    online: {
        label: _("Online"),
        type: "success"
    },
    completed: {
        label: _("Completed"),
        type: "success"
    },
    applied: {
        label: _("Applied"),
        type: "success"
    },
    waiting_inform: {
        label: _("Waiting Inform"),
        type: "warning"
    },
    pending: {
        label: _("Pending"),
        type: "warning"
    },
    awaiting_apply: {
        label: _("Awaiting Apply"),
        type: "warning"
    },
    syncing: {
        label: _("Syncing"),
        type: "info"
    },
    discovering: {
        label: _("Discovering"),
        type: "info"
    },
    recovering: {
        label: _("Recovering"),
        type: "info"
    },
    waiting_management: {
        label: _("Waiting Management"),
        type: "warning"
    },
    waiting_task: {
        label: _("Waiting Task"),
        type: "info"
    },
    reconcile_required: {
        label: _("Reconcile Required"),
        type: "warning"
    },
    not_started: {
        label: _("Not Started"),
        type: "neutral"
    },
    disabled: {
        label: _("Disabled"),
        type: "neutral"
    },
    enabled: {
        label: _("Enabled"),
        type: "success"
    },
    interrupted: {
        label: _("Interrupted"),
        type: "danger"
    },
    failed: {
        label: _("Failed"),
        type: "danger"
    },
    stale: {
        label: _("Stale"),
        type: "warning"
    },
    error: {
        label: _("Error"),
        type: "danger"
    },
    deleted: {
        label: _("Deleted"),
        type: "neutral"
    }
};
function r2(e, t) {
    if (!e) return o("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: "\u2014"
    });
    let r = r1[e], n = r?.label || l(e), i = r?.type || "neutral";
    return o("span", {
        class: `fttr-badge fttr-badge-${i}`,
        title: t || e,
        children: n
    });
}
function r8(e) {
    var t, r, n, i, a, s;
    return s = {
        class: "table-wrapper",
        children: (a = {
            class: "table",
            children: [
                (r = {
                    children: (t = {
                        children: [
                            o("th", {
                                children: _("Configuration item")
                            }),
                            o("th", {
                                children: _("Type")
                            }),
                            o("th", {
                                children: _("State")
                            }),
                            o("th", {
                                children: _("Evidence freshness")
                            }),
                            o("th", {
                                children: _("Last update / task")
                            }),
                            o("th", {
                                children: _("Reason / desired changes")
                            })
                        ]
                    }, o("tr", t))
                }, o("thead", r)),
                (i = {
                    children: e.length ? e.map((e)=>{
                        var t, r, n, i, a, s, d, p, u, g;
                        return g = {
                            children: [
                                (n = {
                                    children: o("strong", {
                                        children: l(e.name || e.id)
                                    })
                                }, o("td", n)),
                                (i = {
                                    children: o("span", {
                                        class: "fttr-badge fttr-badge-info",
                                        style: "font-size:80%",
                                        children: function(e, t) {
                                            switch(e){
                                                case "wifi":
                                                    return "Wi-Fi";
                                                case "wan":
                                                    return "WAN";
                                                case "internet":
                                                    return "Internet";
                                                case "iptv":
                                                    return "IPTV";
                                                case "tr069":
                                                    return "TR-069";
                                                default:
                                                    return "port_binding" === t ? _("Binding") : l(e || t);
                                            }
                                        }(e.service_type ?? "", e.kind)
                                    })
                                }, o("td", i)),
                                o("td", {
                                    children: r2(e.state)
                                }),
                                (s = {
                                    children: (t = e.current_revision, r = e.management_fresh, a = {
                                        style: "display:flex;flex-direction:column;gap:3px;align-items:flex-start",
                                        children: [
                                            !0 === t ? o("span", {
                                                class: "fttr-badge fttr-badge-info",
                                                style: "font-size:78%",
                                                children: _("Current configuration")
                                            }) : !1 === t ? o("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                style: "font-size:78%",
                                                children: _("Previous configuration")
                                            }) : o("span", {
                                                children: "\u2014"
                                            }),
                                            !0 === r ? o("span", {
                                                class: "fttr-badge fttr-badge-success",
                                                style: "font-size:78%",
                                                children: _("Management fresh")
                                            }) : !1 === r ? o("span", {
                                                class: "fttr-badge fttr-badge-warning",
                                                style: "font-size:78%",
                                                children: _("Management stale")
                                            }) : null
                                        ]
                                    }, o("div", a))
                                }, o("td", s)),
                                (d = {
                                    children: [
                                        o("div", {
                                            children: c(e.updated_at)
                                        }),
                                        void 0 !== e.task_id && null !== e.task_id ? o("span", {
                                            class: "fttr-badge fttr-badge-neutral",
                                            style: "font-size:75%;margin-top:2px",
                                            children: [
                                                _("Task"),
                                                " #",
                                                e.task_id
                                            ]
                                        }) : null
                                    ]
                                }, o("td", d)),
                                (u = {
                                    children: [
                                        e.reason ? o("div", {
                                            style: "margin-bottom:3px;color:#555;overflow-wrap:anywhere",
                                            children: e.reason
                                        }) : null,
                                        (e.changes ?? []).length ? (p = {
                                            style: "font-size:85%",
                                            children: (e.changes ?? []).map((e)=>{
                                                var t;
                                                return t = {
                                                    style: "overflow-wrap:anywhere;margin-top:2px",
                                                    children: [
                                                        o("code", {
                                                            children: e.name
                                                        }),
                                                        " = ",
                                                        o("code", {
                                                            children: e.desired
                                                        })
                                                    ]
                                                }, o("div", t);
                                            })
                                        }, o("div", p)) : !e.reason && "\u2014"
                                    ]
                                }, o("td", u))
                            ]
                        }, o("tr", g);
                    }) : (n = {
                        children: o("td", {
                            colSpan: 6,
                            style: "text-align:center;color:#888;padding:1em",
                            children: _("No desired items configured.")
                        })
                    }, o("tr", n))
                }, o("tbody", i))
            ]
        }, o("table", a))
    }, o("div", s);
}
let main = L.view.extend({
    load: async ()=>(await r0("sync"), Promise.all([
            rR(),
            rN()
        ])),
    render (e) {
        var t, r, n, i, a, u;
        let [g, f] = e, b = o("div", {}), h = o("p", {
            class: "alert-message warning",
            hidden: !0,
            "aria-live": "polite"
        }), m = o("div", {
            class: "fttr-sync-result",
            "aria-live": "polite",
            style: "margin:10px 0"
        }), v = (t = {
            class: "cbi-input-select",
            children: [
                o("option", {
                    value: "all",
                    children: _("All devices")
                }),
                (g.devices ?? []).map((e)=>o("option", {
                        value: e.device,
                        children: e.name || e.device
                    }))
            ]
        }, o("select", t)), y = o("div", {}), w = o("div", {}), x = g, k = f, z = !1, j = !1, S = [], $ = async (e)=>{
            if (!z) {
                z = !0, B(x);
                try {
                    var t;
                    await rE("reset_state", e.device), m.replaceChildren((t = {
                        class: "alert-message info",
                        children: _("Synchronization state reset for %s. Preview differences to read the current device state.").replace("%s", e.name || e.optical_sn)
                    }, o("div", t))), B(await rR());
                } catch (e) {
                    m.replaceChildren(o("div", {
                        class: "alert-message danger",
                        children: String(e)
                    }));
                } finally{
                    z = !1, B(x);
                }
            }
        }, C = async (e)=>{
            if (!z) {
                z = !0, B(x);
                try {
                    var t;
                    let r = await rE("apply", e.device), n = "operation_ids" in r ? r.operation_ids.join(", ") : "\u2014";
                    m.replaceChildren((t = {
                        class: "alert-message info",
                        children: _("Configuration delivery started for %s. Operation IDs: %s").replace("%s", e.name || e.optical_sn).replace("%s", n || "\u2014")
                    }, o("div", t))), B(await rR());
                } catch (e) {
                    m.replaceChildren(o("div", {
                        class: "alert-message danger",
                        children: String(e)
                    }));
                } finally{
                    z = !1, B(x);
                }
            }
        }, M = async (e)=>{
            try {
                let t = (await rA()).sub_gateways.find((t)=>t.serial_number === e.optical_sn);
                if (!t) throw Error(_("Device is offline or no longer registered; refresh status and retry."));
                !function(e) {
                    var t, r, n, i, a, c, p, u, g, f, b, h;
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
                                        o(rW, {
                                            state: e.state
                                        })
                                    ],
                                    [
                                        _("Business"),
                                        o(rB, {
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
                                            let t = Math.floor(e), r = Math.floor(t / 86400), n = Math.floor(t % 86400 / 3600), i = Math.floor(t % 3600 / 60), a = [];
                                            return r > 0 && a.push(`${r}d`), (n > 0 || r > 0) && a.push(`${n}h`), (i > 0 || n > 0 || r > 0) && a.push(`${i}m`), a.push(`${t % 60}s`), a.join(" ");
                                        }(e.uptime_seconds)} (${Math.floor(e.uptime_seconds)} s)`
                                    ]
                                ]
                            },
                            {
                                title: _("Management & cache"),
                                rows: [
                                    [
                                        _("CWMP"),
                                        o(rZ, {
                                            management: e.management
                                        })
                                    ],
                                    [
                                        _("Last Inform"),
                                        e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
                                    ],
                                    [
                                        _("Provisioning"),
                                        o(rF, {
                                            provisioning: e.provisioning
                                        })
                                    ],
                                    [
                                        _("Wi-Fi sync"),
                                        o(rK, {
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
                            var t, r, n;
                            return n = {
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
                                                let [r, n] = e;
                                                return t = {
                                                    children: [
                                                        o("th", {
                                                            style: "width:35%",
                                                            children: r
                                                        }),
                                                        o("td", {
                                                            children: n instanceof Node ? n : l(n)
                                                        })
                                                    ]
                                                }, o("tr", t);
                                            })
                                        }, o("tbody", t))
                                    }, o("table", r))
                                ]
                            }, o("div", n);
                        })
                    }, o("div", t)), z = (r = {
                        class: "mib-status-bar",
                        role: "status",
                        children: o("span", {
                            class: "mib-hint-text",
                            children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                        })
                    }, o("div", r)), j = (n = {
                        class: "cbi-progressbar",
                        style: "display:none;width:100%",
                        title: "0%",
                        children: o("div", {
                            style: "width:0%"
                        })
                    }, o("div", n)), S = o("div", {}), $ = o("pre", {
                        class: "onu-raw-pre"
                    }), C = o("span", {
                        class: "download-status",
                        role: "status"
                    }), M = null, O = o("button", {
                        type: "button",
                        class: "cbi-button cbi-button-action",
                        disabled: !0,
                        onclick: async ()=>{
                            if (w && !v) {
                                O.disabled = !0, C.textContent = _("Preparing JSON download\u2026");
                                try {
                                    let t = await rQ(w);
                                    if (v) return;
                                    M && URL.revokeObjectURL(M), M = URL.createObjectURL(t);
                                    let r = document.createElement("a");
                                    r.href = M, r.download = `mib-${e.serial_number}.json`, r.click(), C.textContent = _("JSON download started"), window.setTimeout(()=>{
                                        URL.revokeObjectURL(r.href), M === r.href && (M = null);
                                    }, 1000);
                                } catch (e) {
                                    C.textContent = String(e);
                                } finally{
                                    O.disabled = !w || v;
                                }
                            }
                        },
                        children: _("Download JSON")
                    }), P = (a = {
                        class: "onu-raw-panel",
                        children: [
                            (i = {
                                class: "onu-raw-toolbar",
                                children: [
                                    o("span", {
                                        class: "onu-raw-hint",
                                        children: _("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")
                                    }),
                                    o("div", {
                                        class: "onu-raw-actions",
                                        children: [
                                            O,
                                            C
                                        ]
                                    })
                                ]
                            }, o("div", i)),
                            $
                        ]
                    }, o("div", a)), A = o("button", {
                        type: "button",
                        class: "cbi-button cbi-button-apply",
                        onclick: ()=>U(!1),
                        children: _("Read MIB")
                    }), R = o("button", {
                        type: "button",
                        class: "cbi-button cbi-button-action",
                        onclick: ()=>U(!0),
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
                                            A,
                                            R,
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
                    }, o("div", u)), I = {
                        basic: k,
                        mib: N,
                        raw: P
                    }, D = new Map();
                    function T(e) {
                        for (let [t, r] of Object.entries(I))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                        for (let [t, r] of D)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
                    }
                    let q = (g = {
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
                                        t.preventDefault(), T(e.id);
                                    },
                                    children: e.label
                                })
                            }, o("li", t));
                            return D.set(e.id, r), r;
                        })
                    }, o("ul", g)), W = (h = {
                        children: [
                            o("div", {
                                class: "onu-details-header",
                                children: q
                            }),
                            (f = {
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
				${rG}
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
                            }, o("div", f)),
                            (b = {
                                class: "right onu-details-footer",
                                children: o("button", {
                                    type: "button",
                                    class: "cbi-button",
                                    onclick: ()=>{
                                        v = !0, M && URL.revokeObjectURL(M), M = null, w = null, $.textContent = "", S.replaceChildren(), L.ui.hideModal();
                                    },
                                    children: _("Close")
                                })
                            }, o("div", b))
                        ]
                    }, o(s, h)), B = ()=>!v && W.isConnected && W.getClientRects().length > 0;
                    async function U(t) {
                        if (!y) {
                            y = !0, A.disabled = R.disabled = !0, j.style.display = "", j.title = "0%", j.firstElementChild.style.width = "0%", z.textContent = _("Reading MIB\u2026");
                            try {
                                let v = await rA(), y = v.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                if (y?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                if (!B()) return;
                                let k = await rI(y.onu_id, y.serial_number, t);
                                x = k.job;
                                let C = Date.now() + 140000;
                                for(; B();){
                                    let e = await rL(k.job, 0);
                                    if (!B()) return;
                                    if ("ready" === e.status) {
                                        var r, n, i, a, s, c, d, p, u, g, f, b, h, m;
                                        if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                        let t = new Uint8Array(e.bytes), v = 0;
                                        for(let r = 0; r < e.chunks; r++){
                                            let n = 0 === r ? e : await rL(k.job, r);
                                            if (!B()) return;
                                            if ("ready" !== n.status || n.chunk !== r || n.chunks !== e.chunks || n.bytes !== e.bytes || !n.data) throw Error(_("Invalid MIB snapshot chunk"));
                                            let i = atob(n.data);
                                            if (i.length > 32768 || v + i.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                            for(let e = 0; e < i.length; e++)t[v++] = i.charCodeAt(e);
                                            let a = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                            j.title = `${a}%`, j.firstElementChild.style.width = `${a}%`, z.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                        }
                                        if (v !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                        if (await Z(), w = rr.parse(r$(JSON.parse(new TextDecoder("utf-8", {
                                            fatal: !0
                                        }).decode(t)))).report, 1 !== w.schema_version || w.onu_id !== y.onu_id) throw Error(_("Unexpected MIB response"));
                                        j.style.display = "none", z.replaceChildren((r = w, f = {
                                            class: "mib-chips",
                                            children: [
                                                (i = {
                                                    class: "mib-chip mib-chip-primary",
                                                    children: [
                                                        "ONU ",
                                                        r.onu_id
                                                    ]
                                                }, o("span", i)),
                                                (a = {
                                                    class: `mib-chip ${r.uploaded_complete ? "mib-chip-success" : "mib-chip-warning"}`,
                                                    children: r.uploaded_complete ? _("Upload complete") : _("Upload incomplete")
                                                }, o("span", a)),
                                                (s = {
                                                    class: "mib-chip mib-chip-info",
                                                    children: [
                                                        _("Records"),
                                                        ": ",
                                                        r.received_records,
                                                        r.expected_records !== r.received_records ? ` / ${r.expected_records}` : ""
                                                    ]
                                                }, o("span", s)),
                                                (c = {
                                                    class: "mib-chip",
                                                    children: [
                                                        _("Decoded"),
                                                        ": ",
                                                        r.decoded_records
                                                    ]
                                                }, o("span", c)),
                                                r.partial_records > 0 ? (d = {
                                                    class: "mib-chip mib-chip-warning",
                                                    children: [
                                                        _("Partial"),
                                                        ": ",
                                                        r.partial_records
                                                    ]
                                                }, o("span", d)) : null,
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
                                                (g = {
                                                    class: "mib-chip mib-chip-subtle",
                                                    children: new Date().toLocaleTimeString()
                                                }, o("span", g))
                                            ]
                                        }, o("div", f))), S.replaceChildren(function(e) {
                                            var t, r, n, i, a, s;
                                            let c = e.classes.length ? e.classes[0].class_id : null, d = (t = {
                                                class: "mib-content"
                                            }, o("div", t)), p = (r = {
                                                type: "search",
                                                class: "cbi-input-text mib-search-input",
                                                placeholder: _("Search ME name or Class ID\u2026")
                                            }, o("input", r)), u = (n = {
                                                class: "mib-class-list"
                                            }, o("div", n)), g = new Map();
                                            function f(t) {
                                                var r, n;
                                                for (let [e, r] of (c = t, g))e === t ? r.classList.add("active") : r.classList.remove("active");
                                                let i = e.entities.filter((e)=>e.class_id === t);
                                                i.length ? d.replaceChildren(...i.map((r, n)=>{
                                                    var i, a, s, c, d, p, u, g, f, b, h, m, v, y, w, x, k, z, j;
                                                    return j = {
                                                        open: 0 === n,
                                                        class: "mib-entity-details",
                                                        children: [
                                                            (d = {
                                                                class: "mib-entity-summary",
                                                                children: [
                                                                    (s = {
                                                                        class: "mib-entity-title",
                                                                        children: [
                                                                            (i = {
                                                                                children: l(r.name)
                                                                            }, o("strong", i)),
                                                                            (a = {
                                                                                class: "mib-entity-id-tag",
                                                                                children: [
                                                                                    _("Entity"),
                                                                                    " ",
                                                                                    r.entity_id,
                                                                                    " (0x",
                                                                                    r.entity_id.toString(16),
                                                                                    ")"
                                                                                ]
                                                                            }, o("span", a))
                                                                        ]
                                                                    }, o("span", s)),
                                                                    (c = {
                                                                        class: "mib-entity-support",
                                                                        children: r.support
                                                                    }, o("span", c))
                                                                ]
                                                            }, o("summary", d)),
                                                            (z = {
                                                                class: "mib-entity-body",
                                                                children: [
                                                                    r.attributes.length ? (v = {
                                                                        class: "table mib-attributes-table",
                                                                        children: [
                                                                            (h = {
                                                                                children: (b = {
                                                                                    children: [
                                                                                        (p = {
                                                                                            style: "width:28%",
                                                                                            children: _("Attribute")
                                                                                        }, o("th", p)),
                                                                                        (u = {
                                                                                            style: "width:14%",
                                                                                            children: _("Type")
                                                                                        }, o("th", u)),
                                                                                        (g = {
                                                                                            children: _("Value")
                                                                                        }, o("th", g)),
                                                                                        (f = {
                                                                                            style: "width:18%",
                                                                                            children: _("Definition")
                                                                                        }, o("th", f))
                                                                                    ]
                                                                                }, o("tr", b))
                                                                            }, o("thead", h)),
                                                                            (m = {
                                                                                children: r.attributes.map((e)=>{
                                                                                    var t, r, n, i, a, s, c, d, p, u;
                                                                                    return u = {
                                                                                        children: [
                                                                                            (t = {
                                                                                                class: "mib-attr-name",
                                                                                                children: e.definition.name
                                                                                            }, o("td", t)),
                                                                                            (n = {
                                                                                                class: "mib-attr-kind",
                                                                                                children: (r = {
                                                                                                    children: e.definition.kind
                                                                                                }, o("code", r))
                                                                                            }, o("td", n)),
                                                                                            (d = {
                                                                                                class: "mib-attr-value",
                                                                                                children: [
                                                                                                    (i = {
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
                                                                                                                    throw new rS("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                            }
                                                                                                        }(e.value)
                                                                                                    }, o("span", i)),
                                                                                                    e.observations?.length ? (c = {
                                                                                                        class: "mib-obs-details",
                                                                                                        children: [
                                                                                                            (a = {
                                                                                                                children: _("Raw data / observations")
                                                                                                            }, o("summary", a)),
                                                                                                            (s = {
                                                                                                                class: "mib-pre",
                                                                                                                children: rH(e.observations)
                                                                                                            }, o("pre", s))
                                                                                                        ]
                                                                                                    }, o("details", c)) : null
                                                                                                ]
                                                                                            }, o("td", d)),
                                                                                            (p = {
                                                                                                class: "mib-attr-ref",
                                                                                                children: rX(e.definition)
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
                                                                        var t, r, n, i, a, s, c, d, p, u, g, f, b, h, m, v;
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
                                                                                e.vlan_rules.length ? (b = {
                                                                                    class: "mib-table-overflow",
                                                                                    children: (f = {
                                                                                        class: "table",
                                                                                        children: [
                                                                                            (u = {
                                                                                                children: (p = {
                                                                                                    children: [
                                                                                                        (r = {
                                                                                                            children: _("Outer filter (priority / VID / TPID-DEI)")
                                                                                                        }, o("th", r)),
                                                                                                        (n = {
                                                                                                            children: _("Inner filter (priority / VID / TPID-DEI)")
                                                                                                        }, o("th", n)),
                                                                                                        (i = {
                                                                                                            children: _("EtherType code")
                                                                                                        }, o("th", i)),
                                                                                                        (a = {
                                                                                                            children: _("Remove tags")
                                                                                                        }, o("th", a)),
                                                                                                        (s = {
                                                                                                            children: _("Outer treatment (priority / VID / TPID-DEI)")
                                                                                                        }, o("th", s)),
                                                                                                        (c = {
                                                                                                            children: _("Inner treatment (priority / VID / TPID-DEI)")
                                                                                                        }, o("th", c)),
                                                                                                        (d = {
                                                                                                            children: _("Delete entry")
                                                                                                        }, o("th", d))
                                                                                                    ]
                                                                                                }, o("tr", p))
                                                                                            }, o("thead", u)),
                                                                                            (g = {
                                                                                                children: e.vlan_rules.map((e)=>{
                                                                                                    var t, r, n, i, a, s, c, d;
                                                                                                    return d = {
                                                                                                        children: [
                                                                                                            (t = {
                                                                                                                children: `${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`
                                                                                                            }, o("td", t)),
                                                                                                            (r = {
                                                                                                                children: `${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`
                                                                                                            }, o("td", r)),
                                                                                                            (n = {
                                                                                                                children: l(e.filter_ethertype)
                                                                                                            }, o("td", n)),
                                                                                                            (i = {
                                                                                                                children: l(e.tags_to_remove)
                                                                                                            }, o("td", i)),
                                                                                                            (a = {
                                                                                                                children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                            }, o("td", a)),
                                                                                                            (s = {
                                                                                                                children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                            }, o("td", s)),
                                                                                                            (c = {
                                                                                                                children: l(e.delete_entry)
                                                                                                            }, o("td", c))
                                                                                                        ]
                                                                                                    }, o("tr", d);
                                                                                                })
                                                                                            }, o("tbody", g))
                                                                                        ]
                                                                                    }, o("table", f))
                                                                                }, o("div", b)) : null,
                                                                                (h = {
                                                                                    style: "margin-top:6px",
                                                                                    children: [
                                                                                        _("G.988 encoded field values"),
                                                                                        ": ",
                                                                                        rX(e.attribute)
                                                                                    ]
                                                                                }, o("p", h)),
                                                                                (m = {
                                                                                    class: "mib-pre",
                                                                                    children: rH(e.vlan_rules.length ? e.vlan_rules : e.rows)
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
                                                                                children: rH({
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
                                                })) : d.replaceChildren((n = {
                                                    class: "mib-empty-content",
                                                    children: (r = {
                                                        children: _("No entities recorded for this ME class.")
                                                    }, o("p", r))
                                                }, o("div", n)));
                                            }
                                            function b() {
                                                var t;
                                                let r = p.value.trim().toLowerCase();
                                                g.clear();
                                                let n = e.classes.filter((e)=>`${e.class_id} ${e.name ?? ""}`.toLowerCase().includes(r));
                                                n.length ? u.replaceChildren(...n.map((e)=>{
                                                    var t, r, n, i;
                                                    let a = (i = {
                                                        type: "button",
                                                        class: `mib-class-btn${e.class_id === c ? " active" : ""}`,
                                                        onclick: ()=>f(e.class_id),
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
                                                            (n = {
                                                                class: "mib-class-count",
                                                                children: e.entities
                                                            }, o("span", n))
                                                        ]
                                                    }, o("button", i));
                                                    return g.set(e.class_id, a), a;
                                                })) : u.replaceChildren((t = {
                                                    class: "mib-empty-list",
                                                    children: _("No matching ME classes")
                                                }, o("div", t)));
                                            }
                                            return p.addEventListener("input", b), b(), e.classes.length && f(e.classes[0].class_id), s = {
                                                class: "mib-browser",
                                                children: [
                                                    (a = {
                                                        class: "mib-sidebar",
                                                        children: [
                                                            (i = {
                                                                class: "mib-search-box",
                                                                children: p
                                                            }, o("div", i)),
                                                            u
                                                        ]
                                                    }, o("div", a)),
                                                    d
                                                ]
                                            }, o("div", s);
                                        }(w), (m = {
                                            class: "mib-upload-diagnostics",
                                            children: [
                                                (b = {
                                                    children: _("Upload diagnostics")
                                                }, o("summary", b)),
                                                (h = {
                                                    class: "mib-pre",
                                                    children: rH(w.diagnostics)
                                                }, o("pre", h))
                                            ]
                                        }, o("details", m))), n = w, $.textContent = rH({
                                            schema_version: n.schema_version,
                                            reference_version: n.reference_version,
                                            onu_id: n.onu_id,
                                            uploaded_complete: n.uploaded_complete,
                                            expected_records: n.expected_records,
                                            received_records: n.received_records,
                                            decoded_records: n.decoded_records,
                                            partial_records: n.partial_records,
                                            basic_records: n.basic_records,
                                            tables_requested: n.tables_requested,
                                            tables_collected: n.tables_collected,
                                            class_count: n.classes.length,
                                            classes: n.classes.slice(0, 25),
                                            additional_classes: Math.max(0, n.classes.length - 25),
                                            record_count: n.records.length,
                                            first_record: n.records[0] ?? null,
                                            table_count: n.tables.length,
                                            diagnostics_count: n.diagnostics.length
                                        }), O.disabled = !1;
                                        return;
                                    }
                                    if (e.progress) {
                                        let { phase: t, received: r, expected: n } = e.progress;
                                        if (z.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == n ? "" : `: ${r}/${n}`}` : null == n ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${n}`, n && n > 0) {
                                            let e = Math.min(100, Math.round(r / n * 100));
                                            j.title = `${e}%`, j.firstElementChild.style.width = `${e}%`;
                                        }
                                    }
                                    if (Date.now() >= C) throw Error(_("MIB query timed out; retry."));
                                    await new Promise((e)=>setTimeout(e, 1000));
                                }
                            } catch (e) {
                                B() && (j.style.display = "none", z.replaceChildren(o("span", {
                                    class: "mib-error-text",
                                    children: [
                                        String(e),
                                        w ? ` \xb7 ${_("Previous snapshot retained")}` : ""
                                    ]
                                })));
                            } finally{
                                await Z(), y = !1, A.disabled = R.disabled = !1;
                            }
                        }
                    }
                    async function Z() {
                        if (!x) return;
                        let e = x;
                        x = null;
                        try {
                            await rD(e);
                        } catch (e) {
                            console.warn("Failed to release MIB snapshot", e);
                        }
                    }
                    T(m), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, W, "modal-wide");
                }(t, "mib");
            } catch (e) {
                m.replaceChildren(o("div", {
                    class: "alert-message danger",
                    children: String(e)
                }));
            }
        }, O = async (e)=>{
            if (!z) {
                for (let e of (z = !0, S))e.disabled = !0;
                B(x);
                try {
                    var t;
                    let r = await rE(e, v.value), n = e.startsWith("management_") ? _("Management operation started; status is refreshed below.") : _("Started: %s").replace("%s", "operation_ids" in r ? r.operation_ids.join(", ") : "\u2014");
                    m.replaceChildren((t = {
                        class: "alert-message info",
                        children: n
                    }, o("div", t))), B(await rR());
                } catch (e) {
                    m.replaceChildren(o("div", {
                        class: "alert-message danger",
                        children: String(e)
                    }));
                } finally{
                    z = !1, B(x);
                }
            }
        }, P = o("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: ()=>O("plan"),
            children: _("Preview differences (read-only)")
        }), A = o("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            onclick: ()=>O("apply"),
            children: _("Apply differences")
        }), R = o("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            title: _("Read current device parameters and auto-verify matching settings without writing to device"),
            onclick: ()=>O("reconcile"),
            children: _("Reconcile (read-only)")
        }), N = o("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            title: _("Clear backoff delays and retry safe difference synchronization"),
            onclick: ()=>O("retry"),
            children: _("Self-heal / retry")
        });
        S.push(P, A, R, N);
        let I = o("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: ()=>O("management_plan"),
            children: _("Check management differences (read-only)")
        }), D = o("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            onclick: ()=>O("management_apply"),
            children: _("Apply management configuration")
        });
        S.push(I, D);
        let T = (r = {
            class: "cbi-section",
            children: [
                o("h3", {
                    children: _("Isolated TR069 management network")
                }),
                w,
                o("p", {
                    style: "margin-top:10px",
                    children: [
                        I,
                        " ",
                        D
                    ]
                })
            ]
        }, o("div", r)), q = (a = {
            class: "cbi-section",
            children: [
                o("h3", {
                    children: _("Manual synchronization")
                }),
                (i = {
                    style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px",
                    children: [
                        (n = {
                            style: "display:flex;align-items:center;gap:8px",
                            children: [
                                o("span", {
                                    children: [
                                        _("Target"),
                                        ":"
                                    ]
                                }),
                                v
                            ]
                        }, o("label", n)),
                        o("div", {
                            style: "display:flex;gap:8px;flex-wrap:wrap",
                            children: [
                                P,
                                A,
                                R,
                                N
                            ]
                        })
                    ]
                }, o("div", i))
            ]
        }, o("div", a)), W = (u = {
            class: "cbi-map fttr-sync",
            children: [
                o("style", {
                    children: `
					.fttr-sync {
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
						.fttr-sync {
							--fttr-success-color: #2ecc71;
							--fttr-warning-color: #f39c12;
							--fttr-danger-color: #e74c3c;
							--fttr-info-color: #3498db;
							--fttr-neutral-color: #bdc3c7;
						}
					}

					[data-darkmode="true"] .fttr-sync,
					[data-theme="dark"] .fttr-sync {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}

					.fttr-sync .fttr-badge {
						display: inline-block;
						padding: 0.18em 0.55em;
						font-size: 85%;
						font-weight: 600;
						line-height: 1.25;
						border-radius: 3px;
						white-space: nowrap;
						text-align: center;
					}

					.fttr-sync .fttr-badge-success {
						background: var(--fttr-success-bg);
						color: var(--fttr-success-color);
						border: 1px solid var(--fttr-success-border);
					}

					.fttr-sync .fttr-badge-warning {
						background: var(--fttr-warning-bg);
						color: var(--fttr-warning-color);
						border: 1px solid var(--fttr-warning-border);
					}

					.fttr-sync .fttr-badge-danger {
						background: var(--fttr-danger-bg);
						color: var(--fttr-danger-color);
						border: 1px solid var(--fttr-danger-border);
					}

					.fttr-sync .fttr-badge-info {
						background: var(--fttr-info-bg);
						color: var(--fttr-info-color);
						border: 1px solid var(--fttr-info-border);
					}

					.fttr-sync .fttr-badge-neutral {
						background: var(--fttr-neutral-bg);
						color: var(--fttr-neutral-color);
						border: 1px solid var(--fttr-neutral-border);
					}

					.fttr-sync .fttr-grid-2 {
						display: grid;
						grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
						gap: 12px;
						margin: 8px 0;
					}

					.fttr-sync .fttr-grid-3 {
						display: grid;
						grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
						gap: 12px;
						margin: 8px 0;
					}

					.fttr-sync .fttr-card {
						padding: 10px 14px;
						border: 1px solid rgba(127, 140, 141, 0.2);
						border-radius: 6px;
						background: rgba(127, 140, 141, 0.04);
					}

					.fttr-sync .fttr-kv-row {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 4px 0;
						border-bottom: 1px dashed rgba(127, 140, 141, 0.15);
						font-size: 88%;
					}

					.fttr-sync .fttr-kv-row:last-child {
						border-bottom: none;
					}

					.fttr-sync .fttr-kv-label {
						color: #888;
					}

					.fttr-sync .fttr-pill-label {
						color: #888;
						margin-right: 4px;
						font-size: 90%;
					}

					.fttr-sync .fttr-device-card {
						position: relative;
						margin-bottom: 1.5em;
					}

					.fttr-sync .fttr-card-header {
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
						flex-wrap: wrap;
						gap: 10px;
						margin-bottom: 10px;
					}

					.fttr-sync .fttr-card-title-group {
						display: flex;
						flex-direction: column;
						gap: 4px;
					}

					.fttr-sync .fttr-card-actions {
						display: flex;
						gap: 8px;
						flex-wrap: wrap;
					}

					.fttr-sync .fttr-card-meta-tags {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 6px;
					}

					.fttr-sync .fttr-device-status-strip {
						display: flex;
						justify-content: space-between;
						align-items: center;
						flex-wrap: wrap;
						gap: 10px;
						padding: 8px 12px;
						background: rgba(127, 140, 141, 0.05);
						border: 1px solid rgba(127, 140, 141, 0.15);
						border-radius: 5px;
						margin-bottom: 12px;
					}

					.fttr-sync .fttr-status-pill-group {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 12px;
					}

					.fttr-sync .fttr-status-op-info {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 6px;
						font-size: 85%;
						color: #666;
					}

					.fttr-sync .fttr-btn-subtle {
						font-size: 80%;
						padding: 3px 8px;
						border: 1px solid rgba(127, 140, 141, 0.35);
						background: transparent;
						color: inherit;
						border-radius: 4px;
						cursor: pointer;
						transition: all 0.2s ease;
					}

					.fttr-sync .fttr-btn-subtle:hover {
						background: rgba(231, 76, 60, 0.1);
						border-color: rgba(231, 76, 60, 0.4);
						color: #c0392b;
					}

					.fttr-sync .table th {
						white-space: nowrap;
						user-select: none;
					}

					.fttr-sync .table td {
						vertical-align: middle;
					}
					`
                }),
                o("h2", {
                    children: _("FTTR synchronization")
                }),
                b,
                h,
                T,
                q,
                m,
                y
            ]
        }, o("div", u));
        function B(e) {
            var t, r, n, i, a, d, u, g, f, m, j, S, R, N, T, W, B, U, Z, V, F, J, K, G, H, Q, X, Y, ee, et, er, en, ei;
            x = e, b.replaceChildren((g = {
                "data-provisioning-summary": "true",
                style: "display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%",
                children: [
                    (t = {
                        children: [
                            o("strong", {
                                style: "margin-right:.4em",
                                children: [
                                    _("Provisioning"),
                                    ":"
                                ]
                            }),
                            o("span", {
                                class: `fttr-badge ${e.enabled ? "fttr-badge-success" : "fttr-badge-neutral"}`,
                                children: e.enabled ? _("Enabled") : _("Disabled")
                            })
                        ]
                    }, o("span", t)),
                    (r = {
                        children: [
                            o("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Mode"),
                                    ":"
                                ]
                            }),
                            o("span", {
                                class: "fttr-badge fttr-badge-info",
                                children: l(e.mode)
                            })
                        ]
                    }, o("span", r)),
                    (n = {
                        children: [
                            o("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Revision"),
                                    ":"
                                ]
                            }),
                            o("code", {
                                children: l(e.revision)
                            })
                        ]
                    }, o("span", n)),
                    e.config_load ? (a = {
                        children: [
                            "waiting" === e.config_load.state ? _("Saved; waiting to load automatically") : _("Configuration loaded; device synchronization is tracked below"),
                            "waiting" === e.config_load.state ? (i = {
                                children: [
                                    " ",
                                    o("code", {
                                        children: e.config_load.requested_revision
                                    }),
                                    e.config_load.blocking_operations.map((e)=>o("span", {
                                            style: "margin-left:.5em",
                                            children: `${e.device} #${e.operation_id}: ${l(e.state)} (${p(Math.max(0, Date.now() / 1000 - e.started_at))})`
                                        })),
                                    e.config_load.reset_pending ? _("Waiting for device reset recovery") : null
                                ]
                            }, o("span", i)) : null
                        ]
                    }, o("span", a)) : null,
                    (e.triggers ?? []).length ? (d = {
                        children: [
                            o("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Triggers"),
                                    ":"
                                ]
                            }),
                            o("code", {
                                children: (e.triggers ?? []).join(", ")
                            })
                        ]
                    }, o("span", d)) : null,
                    e.interval_minutes ? (u = {
                        children: [
                            o("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Interval (minutes)"),
                                    ":"
                                ]
                            }),
                            o("span", {
                                children: e.interval_minutes
                            })
                        ]
                    }, o("span", u)) : null
                ]
            }, o("div", g)));
            let ea = [
                e.error,
                e.config_error,
                "error" in k ? _("Committed configuration is invalid: %s").format(k.error) : k.revision && k.revision !== e.revision && (e.config_load?.state !== "waiting" || e.config_load.requested_revision !== k.revision) ? _("Committed configuration has not been requested for loading. Apply the configuration to load it.") : ""
            ].filter(Boolean);
            h.hidden = !ea.length, h.textContent = ea.join(" \u2014 ");
            let es = [
                "all",
                ...Array.from(new Set((e.devices ?? []).map((e)=>e.group).filter(Boolean))).map((e)=>`group:${e}`),
                ...(e.devices ?? []).map((e)=>e.device)
            ];
            if (Array.from(v.options).map((e)=>e.value).join("\n") !== es.join("\n")) {
                let t = v.value;
                v.replaceChildren(...es.map((t)=>o("option", {
                        value: t,
                        children: "all" === t ? _("All devices") : t.startsWith("group:") ? (e.devices ?? []).find((e)=>`group:${e.group}` === t)?.group_name || t : (e.devices ?? []).find((e)=>e.device === t)?.name || t
                    }))), v.value = es.includes(t) ? t : "all";
            }
            q.hidden = "manual" !== e.mode || !L.hasViewPermission();
            let eo = (e.devices ?? []).filter((e)=>"all" === v.value || e.device === v.value || `group:${e.group}` === v.value).some((e)=>![
                    "completed",
                    "not_started",
                    "interrupted"
                ].includes(e.provisioning.state ?? "not_started"));
            P.disabled = z || eo || e.config_load?.state === "waiting" || "error" in k || !!k.revision && k.revision !== e.revision || !(e.devices ?? []).length, A.disabled = P.disabled || !e.enabled;
            let el = e.management_network;
            I.disabled = z || e.config_load?.state === "waiting" || !!el?.inflight || "error" in k || !L.hasViewPermission(), D.disabled = I.disabled;
            let ec = el.desired ?? el.applied, ed = el?.plan ?? [], ep = !!el?.applied_version && !!el?.desired_version && el?.applied_version === el?.desired_version;
            w.replaceChildren((ei = {
                children: [
                    (N = {
                        style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:10px",
                        children: [
                            (f = {
                                children: [
                                    o("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            _("State"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    r2(el?.state)
                                ]
                            }, o("span", f)),
                            (m = {
                                children: [
                                    o("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            _("Desired version"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    o("code", {
                                        children: l(el?.desired_version)
                                    })
                                ]
                            }, o("span", m)),
                            (j = {
                                children: [
                                    o("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            _("Applied version"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    o("code", {
                                        children: l(el?.applied_version)
                                    })
                                ]
                            }, o("span", j)),
                            el?.desired_version || el?.applied_version ? (S = {
                                children: ep ? o("span", {
                                    class: "fttr-badge fttr-badge-success",
                                    children: _("Synchronized")
                                }) : o("span", {
                                    class: "fttr-badge fttr-badge-warning",
                                    children: _("Pending apply")
                                })
                            }, o("span", S)) : null,
                            el?.next_retry_at ? (R = {
                                children: [
                                    o("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            _("Next retry"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    c(el.next_retry_at)
                                ]
                            }, o("span", R)) : null
                        ]
                    }, o("div", N)),
                    (H = {
                        class: "fttr-grid-3",
                        children: [
                            (B = {
                                class: "fttr-card",
                                children: [
                                    (T = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Management interface")
                                            }),
                                            o("strong", {
                                                children: "\u2014"
                                            })
                                        ]
                                    }, o("div", T)),
                                    (W = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Management VLAN")
                                            }),
                                            o("span", {
                                                children: [
                                                    "VLAN ",
                                                    l(ec?.vlan.join(", ")),
                                                    " (Prio ",
                                                    l(ec?.priority),
                                                    ")"
                                                ]
                                            })
                                        ]
                                    }, o("div", W))
                                ]
                            }, o("div", B)),
                            (F = {
                                class: "fttr-card",
                                children: [
                                    (U = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Service IP / Netmask")
                                            }),
                                            o("code", {
                                                children: l(ec?.address)
                                            })
                                        ]
                                    }, o("div", U)),
                                    (V = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("DHCP service")
                                            }),
                                            (Z = {
                                                children: null === ec ? "\u2014" : ec.dhcp_enabled ? o("span", {
                                                    class: "fttr-badge fttr-badge-success",
                                                    children: _("Enabled")
                                                }) : o("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    children: _("Disabled")
                                                })
                                            }, o("span", Z))
                                        ]
                                    }, o("div", V))
                                ]
                            }, o("div", F)),
                            (G = {
                                class: "fttr-card",
                                children: [
                                    (J = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("ACS URL")
                                            }),
                                            o("code", {
                                                style: "font-size:80%",
                                                children: l(ec?.acs_url)
                                            })
                                        ]
                                    }, o("div", J)),
                                    (K = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Mode")
                                            }),
                                            o("span", {
                                                children: l(ec?.mode)
                                            })
                                        ]
                                    }, o("div", K))
                                ]
                            }, o("div", G))
                        ]
                    }, o("div", H)),
                    ed.length ? (er = {
                        style: "margin-top:10px",
                        children: [
                            o("h5", {
                                style: "margin-bottom:4px;font-size:90%",
                                children: _("Pending configuration changes")
                            }),
                            (et = {
                                class: "table-wrapper",
                                children: (ee = {
                                    class: "table",
                                    style: "font-size:85%",
                                    children: [
                                        (X = {
                                            children: (Q = {
                                                children: [
                                                    o("th", {
                                                        children: _("Operation")
                                                    }),
                                                    o("th", {
                                                        children: _("Configuration item")
                                                    }),
                                                    o("th", {
                                                        children: _("Reason / desired changes")
                                                    })
                                                ]
                                            }, o("tr", Q))
                                        }, o("thead", X)),
                                        (Y = {
                                            children: ed.map((e)=>{
                                                var t, r, n, i;
                                                return i = {
                                                    children: [
                                                        (t = {
                                                            children: o("span", {
                                                                class: "fttr-badge fttr-badge-info",
                                                                children: e.operation
                                                            })
                                                        }, o("td", t)),
                                                        (r = {
                                                            children: o("code", {
                                                                children: e.key
                                                            })
                                                        }, o("td", r)),
                                                        (n = {
                                                            children: o("code", {
                                                                children: (e.value ?? []).join(", ")
                                                            })
                                                        }, o("td", n))
                                                    ]
                                                }, o("tr", i);
                                            })
                                        }, o("tbody", Y))
                                    ]
                                }, o("table", ee))
                            }, o("div", et))
                        ]
                    }, o("div", er)) : null,
                    el?.error ? o("div", {
                        class: "alert-message warning",
                        style: "margin-top:8px",
                        children: el.error
                    }) : null,
                    o("p", {
                        style: "font-size:85%;color:#888;margin-top:8px;margin-bottom:8px",
                        children: _("Saving in manual mode does not create interfaces, change firewall rules or configure child devices. Apply explicitly to authorize the current management configuration.")
                    }),
                    (en = {
                        style: "margin-top:6px;margin-bottom:10px",
                        children: [
                            o("summary", {
                                style: "cursor:pointer;user-select:none;font-size:85%;color:#666",
                                children: _("Advanced diagnostics / Raw configuration (JSON)")
                            }),
                            o("pre", {
                                style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px",
                                children: JSON.stringify({
                                    desired: el?.desired,
                                    applied: el?.applied,
                                    plan: el?.plan ?? []
                                }, null, 2)
                            })
                        ]
                    }, o("details", en))
                ]
            }, o("div", ei)));
            let eu = new Set(Array.from(y.querySelectorAll("details[open]")).map((e)=>e.getAttribute("data-device")));
            y.replaceChildren(...(e.devices ?? []).map((t)=>{
                var r, n, i, a, d, u, g, f, b, h, m, v, y, w, x, k, j, S, P, A, R, N, I, T, q, W, B, U, Z, V, F, J, K, G, H, Q, X, Y, ee, et, er, en, ei, ea, es, eo, el, ec, ed, ep, e_, eg, ef, eb, eh, em, ev, ey, ew, ex, ek, ez;
                let ej, eS, e$;
                return r = eu.has(t.device), n = ()=>O("management_apply"), i = D.disabled, a = e.enabled, d = z, eS = ![
                    "completed",
                    "not_started",
                    "interrupted"
                ].includes((ej = t.provisioning).state), e$ = [
                    ...Object.entries(ej.wan_lifecycle ?? {}).map((e)=>{
                        let [t, r] = e;
                        return {
                            ...r,
                            id: `WAN ${t}`,
                            kind: "wan_activation",
                            service_type: "wan"
                        };
                    }),
                    ...Object.entries(ej.wifi_lifecycle ?? {}).map((e)=>{
                        let [t, r] = e;
                        return {
                            ...r,
                            id: `WLAN ${t}`,
                            kind: "ssid",
                            service_type: "wifi"
                        };
                    })
                ], ez = {
                    class: "cbi-section fttr-device-card",
                    children: [
                        (v = {
                            class: "fttr-card-header",
                            children: [
                                (h = {
                                    class: "fttr-card-title-group",
                                    children: [
                                        (g = {
                                            style: "margin:0",
                                            children: [
                                                t.name || t.optical_sn,
                                                " ",
                                                o("small", {
                                                    style: "font-size:75%;font-weight:normal;color:#888",
                                                    children: [
                                                        "(",
                                                        t.adapter,
                                                        ")"
                                                    ]
                                                })
                                            ]
                                        }, o("h3", g)),
                                        (b = {
                                            class: "fttr-card-meta-tags",
                                            children: [
                                                ej.backend ? o("span", {
                                                    class: "fttr-badge fttr-badge-info",
                                                    title: ej.backend.reason,
                                                    children: [
                                                        _("Provisioning method"),
                                                        ": ",
                                                        ej.backend.configured,
                                                        " \u2192 ",
                                                        ej.backend.effective
                                                    ]
                                                }) : null,
                                                t.group_name ? o("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    title: _("Group"),
                                                    children: t.group_name
                                                }) : null,
                                                t.template_name ? o("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    title: _("Template"),
                                                    children: t.template_name
                                                }) : null,
                                                (f = {
                                                    style: "font-size:85%;color:#666",
                                                    children: [
                                                        "OMCI: ",
                                                        r2(t.omci_management?.state),
                                                        t.omci_management?.reason ? o("span", {
                                                            style: "margin-left:4px;color:#888",
                                                            title: t.omci_management.reason,
                                                            children: [
                                                                "(",
                                                                t.omci_management.reason,
                                                                ")"
                                                            ]
                                                        }) : null
                                                    ]
                                                }, o("span", f))
                                            ]
                                        }, o("div", b))
                                    ]
                                }, o("div", h)),
                                L.hasViewPermission() ? (m = {
                                    class: "fttr-card-actions",
                                    children: [
                                        o("button", {
                                            type: "button",
                                            class: "cbi-button cbi-button-action",
                                            onclick: ()=>M(t),
                                            children: _("View OMCI / MIB details")
                                        }),
                                        o("button", {
                                            type: "button",
                                            class: "cbi-button cbi-button-positive",
                                            disabled: d || eS || !a,
                                            title: a ? eS ? _("This device already has an active synchronization operation") : _("Start configuration delivery for this device") : _("Provisioning is disabled"),
                                            onclick: ()=>C(t),
                                            children: _("Sync now")
                                        }),
                                        o("button", {
                                            type: "button",
                                            class: "cbi-button cbi-button-positive",
                                            disabled: d,
                                            title: _("Clear old tasks and managed-object records after a device factory reset. The next preview or apply reads the device again."),
                                            onclick: ()=>{
                                                let e = t.name || t.optical_sn;
                                                window.confirm(_("Are you sure you want to reset the synchronization state for %s?").replace("%s", e)) && $(t);
                                            },
                                            children: _("Reset synchronization state")
                                        })
                                    ]
                                }, o("div", m)) : null
                            ]
                        }, o("div", v)),
                        (I = {
                            class: "fttr-device-status-strip",
                            children: [
                                (k = {
                                    class: "fttr-status-pill-group",
                                    children: [
                                        (y = {
                                            children: [
                                                o("span", {
                                                    class: "fttr-pill-label",
                                                    children: "CWMP:"
                                                }),
                                                " ",
                                                r2(t.management?.state, t.management?.last_inform ? `${_("Last Inform: %s").replace("%s", c(t.management.last_inform))}${null != t.management.age_seconds ? ` (${p(t.management.age_seconds)})` : ""}` : void 0)
                                            ]
                                        }, o("span", y)),
                                        (w = {
                                            children: [
                                                o("span", {
                                                    class: "fttr-pill-label",
                                                    children: [
                                                        _("Synchronization"),
                                                        ":"
                                                    ]
                                                }),
                                                " ",
                                                r2(ej.state)
                                            ]
                                        }, o("span", w)),
                                        (x = {
                                            children: [
                                                o("span", {
                                                    class: "fttr-pill-label",
                                                    children: "Wi-Fi:"
                                                }),
                                                " ",
                                                r2(t.wifi_sync)
                                            ]
                                        }, o("span", x))
                                    ]
                                }, o("div", k)),
                                (N = {
                                    class: "fttr-status-op-info",
                                    children: [
                                        (j = {
                                            children: [
                                                _("Operation"),
                                                ": ",
                                                o("strong", {
                                                    children: l(ej.operation_id)
                                                }),
                                                " (",
                                                l(ej.mode),
                                                ")"
                                            ]
                                        }, o("span", j)),
                                        o("span", {
                                            children: "\xb7"
                                        }),
                                        o("span", {
                                            children: [
                                                _("Started"),
                                                ": ",
                                                c(ej.started_at)
                                            ]
                                        }),
                                        o("span", {
                                            children: "\xb7"
                                        }),
                                        (S = {
                                            children: [
                                                _("Revision"),
                                                ": ",
                                                o("code", {
                                                    children: l(ej.revision)
                                                })
                                            ]
                                        }, o("span", S)),
                                        ej.attempts ? (A = {
                                            children: [
                                                o("span", {
                                                    children: "\xb7"
                                                }),
                                                (P = {
                                                    style: "color:#e67e22",
                                                    children: [
                                                        _("Attempts"),
                                                        ": ",
                                                        o("strong", {
                                                            children: ej.attempts
                                                        })
                                                    ]
                                                }, o("span", P))
                                            ]
                                        }, o(s, A)) : null,
                                        ej.next_retry_at && ej.next_retry_at > Math.floor(Date.now() / 1000) ? (R = {
                                            children: [
                                                o("span", {
                                                    children: "\xb7"
                                                }),
                                                o("span", {
                                                    style: "color:#d35400",
                                                    children: _("Next self-healing retry in %d seconds").replace("%d", String(ej.next_retry_at - Math.floor(Date.now() / 1000)))
                                                })
                                            ]
                                        }, o(s, R)) : null
                                    ]
                                }, o("div", N))
                            ]
                        }, o("div", I)),
                        ej.reconcile_reason ? o("div", {
                            class: "alert-message info",
                            style: "margin:8px 0;font-size:85%",
                            children: ej.reconcile_reason
                        }) : null,
                        r8(ej.items ?? []),
                        ej.cwmp_contract ? (K = {
                            style: "margin-top:1.2em",
                            children: [
                                o("h4", {
                                    style: "margin-bottom:0.5em",
                                    children: _("CWMP contract")
                                }),
                                (J = {
                                    class: "fttr-card",
                                    children: [
                                        (q = {
                                            style: "display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                                            children: [
                                                (T = {
                                                    children: [
                                                        o("span", {
                                                            children: l(ej.cwmp_contract.requested)
                                                        }),
                                                        " \u2192",
                                                        " ",
                                                        o("code", {
                                                            children: l(ej.cwmp_contract.contract)
                                                        })
                                                    ]
                                                }, o("div", T)),
                                                o("div", {
                                                    children: r2(ej.cwmp_contract.state)
                                                })
                                            ]
                                        }, o("div", q)),
                                        (V = {
                                            style: "display:flex;flex-wrap:wrap;gap:12px;margin-bottom:6px;font-size:90%",
                                            children: [
                                                (W = {
                                                    children: [
                                                        o("span", {
                                                            style: "color:#888",
                                                            children: "WAN:"
                                                        }),
                                                        " ",
                                                        r2(ej.cwmp_contract.capabilities?.wan)
                                                    ]
                                                }, o("span", W)),
                                                (B = {
                                                    children: [
                                                        o("span", {
                                                            style: "color:#888",
                                                            children: "WLAN:"
                                                        }),
                                                        " ",
                                                        r2(ej.cwmp_contract.capabilities?.wlan)
                                                    ]
                                                }, o("span", B)),
                                                (U = {
                                                    children: [
                                                        o("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                _("Bindings"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        r2(ej.cwmp_contract.capabilities?.binding)
                                                    ]
                                                }, o("span", U)),
                                                (Z = {
                                                    children: [
                                                        o("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                _("Cache"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        o("span", {
                                                            class: "fttr-badge fttr-badge-info",
                                                            style: "font-size:80%",
                                                            children: ej.cwmp_contract.cache_hit ? _("Matched") : _("Fresh discovery")
                                                        })
                                                    ]
                                                }, o("span", Z))
                                            ]
                                        }, o("div", V)),
                                        ej.cwmp_contract.schema ? (F = {
                                            style: "font-size:85%;color:#666",
                                            children: [
                                                _("Schema"),
                                                ": ",
                                                o("code", {
                                                    children: ej.cwmp_contract.schema
                                                })
                                            ]
                                        }, o("div", F)) : null,
                                        ej.cwmp_contract.reason ? o("div", {
                                            style: "font-size:85%;margin-top:4px;color:#e67e22",
                                            children: ej.cwmp_contract.reason
                                        }) : null
                                    ]
                                }, o("div", J))
                            ]
                        }, o("div", K)) : null,
                        ej.backend?.effective === "command" ? null : (u = t.acs_bootstrap) ? "inflight" in u ? (eb = {
                            style: "margin-top:1.2em",
                            children: [
                                (H = {
                                    style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:0.5em",
                                    children: [
                                        o("h4", {
                                            style: "margin:0",
                                            children: _("ACS bootstrap")
                                        }),
                                        (G = {
                                            style: "display:flex;align-items:center;gap:6px",
                                            children: [
                                                r2(u.state),
                                                u.inflight ? o("span", {
                                                    class: "fttr-badge fttr-badge-info",
                                                    children: _("Command in progress")
                                                }) : null
                                            ]
                                        }, o("div", G))
                                    ]
                                }, o("div", H)),
                                (e_ = {
                                    class: "fttr-card",
                                    children: [
                                        (ec = {
                                            class: "fttr-grid-3",
                                            children: [
                                                (ee = {
                                                    children: [
                                                        (Q = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Method")
                                                                }),
                                                                o("code", {
                                                                    children: l(u.method)
                                                                })
                                                            ]
                                                        }, o("div", Q)),
                                                        (X = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Attempts")
                                                                }),
                                                                o("span", {
                                                                    children: l(u.attempts)
                                                                })
                                                            ]
                                                        }, o("div", X)),
                                                        (Y = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Identity source")
                                                                }),
                                                                o("span", {
                                                                    children: l(u.binding_source)
                                                                })
                                                            ]
                                                        }, o("div", Y))
                                                    ]
                                                }, o("div", ee)),
                                                (ei = {
                                                    children: [
                                                        (et = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Management VLAN")
                                                                }),
                                                                o("span", {
                                                                    children: u.desired?.vlan !== void 0 ? `VLAN ${u.desired.vlan} (Prio ${u.desired.priority ?? 0})` : "\u2014"
                                                                })
                                                            ]
                                                        }, o("div", et)),
                                                        (er = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("ACS URL")
                                                                }),
                                                                o("code", {
                                                                    style: "font-size:80%",
                                                                    children: l(u.desired?.acs_url)
                                                                })
                                                            ]
                                                        }, o("div", er)),
                                                        (en = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Local ACS listener")
                                                                }),
                                                                o("code", {
                                                                    style: "font-size:80%",
                                                                    children: u.listener?.listen ? `${u.listener.listen}${u.listener.path || ""}` : "\u2014"
                                                                })
                                                            ]
                                                        }, o("div", en))
                                                    ]
                                                }, o("div", ei)),
                                                (el = {
                                                    children: [
                                                        (ea = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Last telemetry")
                                                                }),
                                                                o("span", {
                                                                    style: "font-size:85%",
                                                                    children: c(u.mqtt_last_seen)
                                                                })
                                                            ]
                                                        }, o("div", ea)),
                                                        (es = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Last Inform")
                                                                }),
                                                                o("span", {
                                                                    style: "font-size:85%",
                                                                    children: c(u.last_inform)
                                                                })
                                                            ]
                                                        }, o("div", es)),
                                                        (eo = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Settings verified")
                                                                }),
                                                                o("span", {
                                                                    style: "font-size:85%",
                                                                    children: c(u.settings_verified_at)
                                                                })
                                                            ]
                                                        }, o("div", eo))
                                                    ]
                                                }, o("div", el))
                                            ]
                                        }, o("div", ec)),
                                        u.mqtt_target ? (ed = {
                                            style: "font-size:85%;color:#666;margin-top:6px;border-top:1px dashed rgba(127,140,141,0.15);padding-top:6px",
                                            children: [
                                                o("span", {
                                                    style: "color:#888",
                                                    children: [
                                                        _("MQTT target"),
                                                        ":"
                                                    ]
                                                }),
                                                " ",
                                                o("code", {
                                                    children: u.mqtt_target
                                                })
                                            ]
                                        }, o("div", ed)) : null,
                                        u.reason ? o("div", {
                                            style: "font-size:85%;color:#d35400;margin-top:6px;overflow-wrap:anywhere",
                                            children: u.reason
                                        }) : null,
                                        "awaiting_apply" === u.state ? (ep = {
                                            style: "margin-top:10px;padding:8px;background:rgba(243,156,18,0.1);border-radius:4px;border:1px solid rgba(243,156,18,0.3)",
                                            children: [
                                                o("button", {
                                                    type: "button",
                                                    class: "cbi-button cbi-button-positive",
                                                    disabled: i,
                                                    onclick: n,
                                                    children: _("Authorize and apply management settings")
                                                }),
                                                " ",
                                                o("span", {
                                                    style: "font-size:85%;color:#666",
                                                    children: _("Required after management drift or service restart; verifies the child ACS settings before business synchronization.")
                                                })
                                            ]
                                        }, o("div", ep)) : null
                                    ]
                                }, o("div", e_)),
                                [
                                    u.last_error,
                                    u.link_identity_error,
                                    u.persistence_error,
                                    u.listener?.error,
                                    u.endpoint_notice
                                ].filter(Boolean).map((e)=>o("div", {
                                        class: "alert-message warning",
                                        style: "overflow-wrap:anywhere;margin-top:8px",
                                        children: e
                                    })),
                                u.manual_steps?.length ? (ef = {
                                    style: "margin-top:8px",
                                    children: [
                                        o("summary", {
                                            style: "cursor:pointer;user-select:none;font-weight:600",
                                            children: _("Management setup / reachability guidance")
                                        }),
                                        (eg = {
                                            style: "padding:6px 0",
                                            children: u.manual_steps.map((e, t)=>o("p", {
                                                    style: "margin:4px 0;font-size:90%",
                                                    children: [
                                                        t + 1,
                                                        ". ",
                                                        e
                                                    ]
                                                }))
                                        }, o("div", eg))
                                    ]
                                }, o("details", ef)) : null
                            ]
                        }, o("div", eb)) : (eh = {
                            class: "fttr-card",
                            children: [
                                o("h4", {
                                    children: _("ACS bootstrap")
                                }),
                                r2(u.state),
                                o("p", {
                                    children: u.reason
                                })
                            ]
                        }, o("div", eh)) : null,
                        e$.length ? (em = {
                            style: "margin-top:1.2em",
                            children: [
                                o("h4", {
                                    style: "margin-bottom:0.5em",
                                    children: _("WAN / WLAN lifecycle results")
                                }),
                                r8(e$)
                            ]
                        }, o("div", em)) : null,
                        (ek = {
                            "data-device": t.device,
                            open: r,
                            style: "margin-top:1em",
                            children: [
                                o("summary", {
                                    style: "cursor:pointer;user-select:none;font-weight:600",
                                    children: _("Managed objects and lifecycle intent")
                                }),
                                (ex = {
                                    style: "padding:8px 0",
                                    children: [
                                        (ew = {
                                            style: "display:flex;gap:16px;flex-wrap:wrap;font-size:90%;margin-bottom:6px",
                                            children: [
                                                (ev = {
                                                    children: [
                                                        o("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                _("Wi-Fi cleanup policy"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        l(ej.wifi_cleanup)
                                                    ]
                                                }, o("span", ev)),
                                                (ey = {
                                                    children: [
                                                        o("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                _("Wi-Fi stage"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        l(ej.wifi_stage)
                                                    ]
                                                }, o("span", ey))
                                            ]
                                        }, o("div", ew)),
                                        o("pre", {
                                            style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:85%;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px;max-height:240px;overflow-y:auto",
                                            children: JSON.stringify({
                                                wan_objects: ej.wan_objects ?? {},
                                                wifi_objects: ej.wifi_objects ?? {}
                                            }, null, 2)
                                        })
                                    ]
                                }, o("div", ex))
                            ]
                        }, o("details", ek))
                    ]
                }, o("div", ez);
            }));
        }
        return v.addEventListener("change", ()=>B(x)), B(g), L.Poll.add(async ()=>{
            if (W.isConnected && !j) {
                j = !0;
                try {
                    let [e, t] = await Promise.all([
                        rR(),
                        rN()
                    ]);
                    k = t, B(e);
                } catch (e) {
                    h.hidden = !1, h.textContent = _("Status refresh failed: %s").format(String(e));
                } finally{
                    j = !1;
                }
            }
        }, 5), W;
    },
    handleSave: null,
    handleSaveApply: null,
    handleReset: null
});

return main;