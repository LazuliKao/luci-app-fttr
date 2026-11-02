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
    let n = Math.floor(t / 3600);
    if (n < 24) return (1 === n ? _("%d hour ago") : _("%d hours ago")).replace("%d", String(n));
    let i = Math.floor(t / 86400);
    return (1 === i ? _("%d day ago") : _("%d days ago")).replace("%d", String(i));
}
function p(e, t, r) {
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
    return {
        get value () {
            {
                let t = e();
                return Object.defineProperty(this, "value", {
                    value: t
                }), t;
            }
        }
    };
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
function w(e, t, r) {
    Object.defineProperty(e, t, {
        value: r,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
}
function x(...e) {
    let t = {};
    for (let r of e)Object.assign(t, Object.getOwnPropertyDescriptors(r));
    return Object.defineProperties({}, t);
}
const k = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function z(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function $(e) {
    if (!1 === z(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let r = t.prototype;
    return !1 !== z(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
}
const j = new Set([
    "string",
    "number",
    "symbol"
]);
function O(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function S(e, t, r) {
    let n = new e._zod.constr(t ?? e._zod.def);
    return (!t || r?.parent) && (n._zod.parent = e), n;
}
function M(e) {
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
function P(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let r = t; r < e.issues.length; r++)if (e.issues[r]?.continue !== !0) return !0;
    return !1;
}
function T(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function C(e) {
    return "string" == typeof e ? e : e?.message;
}
function I(e, t, r) {
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = C(e.inst?._zod.def?.error?.(e)) ?? C(t?.error?.(e)) ?? C(r.customError?.(e)) ?? C(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
}
const N = (e, t)=>{
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
}, D = p("$ZodError", N), R = p("$ZodError", N, {
    Parent: Error
}), A = (r = R, (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise) throw new u();
    if (s.issues.length) {
        let e = new (i?.Err ?? r)(s.issues.map((e)=>I(e, a, b())));
        throw k(e, i?.callee), e;
    }
    return s.value;
}), Z = (n = R, async (e, t, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (i?.Err ?? n)(s.issues.map((e)=>I(e, a, b())));
        throw k(e, i?.callee), e;
    }
    return s.value;
}), U = (i = R, (e, t, r)=>{
    let n = r ? {
        ...r,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, n);
    if (a instanceof Promise) throw new u();
    return a.issues.length ? {
        success: !1,
        error: new (i ?? D)(a.issues.map((e)=>I(e, n, b())))
    } : {
        success: !0,
        data: a.value
    };
}), B = (a = R, async (e, t, r)=>{
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
        error: new a(i.issues.map((e)=>I(e, n, b())))
    } : {
        success: !0,
        data: i.value
    };
}), q = /^-?\d+(?:\.\d+)?$/, V = /^(?:true|false)$/i, W = /^null$/i, F = {
    major: 4,
    minor: 3,
    patch: 6
}, J = p("$ZodType", (e, t)=>{
    var r;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = F;
    let n = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && n.unshift(e), n))for (let r of t._zod.onattach)r(e);
    if (0 === n.length) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, r)=>{
            let n, i = P(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, s = a._zod.check(e);
                if (s instanceof Promise && r?.async === !1) throw new u();
                if (n || s instanceof Promise) n = (n ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (i || (i = P(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = P(e, t));
                }
            }
            return n ? n.then(()=>e) : e;
        }, r = (r, i, a)=>{
            if (P(r)) return r.aborted = !0, r;
            let s = t(i, n, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new u();
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
                if (!1 === a.async) throw new u();
                return s.then((e)=>t(e, n, a));
            }
            return t(s, n, a);
        };
    }
    y(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = U(e, t);
                    return r.success ? {
                        value: r.data
                    } : {
                        issues: r.error?.issues
                    };
                } catch (r) {
                    return B(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), X = p("$ZodString", (e, t)=>{
    var r;
    let n;
    J.init(e, t), e._zod.pattern = [
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
}), H = p("$ZodNumber", (e, t)=>{
    J.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? q, e._zod.parse = (r, n)=>{
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
}), G = p("$ZodBoolean", (e, t)=>{
    J.init(e, t), e._zod.pattern = V, e._zod.parse = (r, n)=>{
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
}), K = p("$ZodNull", (e, t)=>{
    J.init(e, t), e._zod.pattern = W, e._zod.values = new Set([
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
}), Q = p("$ZodNever", (e, t)=>{
    J.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function Y(e, t, r) {
    e.issues.length && t.issues.push(...T(r, e.issues)), t.value[r] = e.value;
}
const ee = p("$ZodArray", (e, t)=>{
    J.init(e, t), e._zod.parse = (r, n)=>{
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
            o instanceof Promise ? a.push(o.then((t)=>Y(t, r, e))) : Y(o, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function et(e, t, r, n, i) {
    if (e.issues.length) {
        if (i && !(r in n)) return;
        t.issues.push(...T(r, e.issues));
    }
    void 0 === e.value ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
const er = p("$ZodObject", (e, t)=>{
    let r;
    J.init(e, t);
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
    let i = h(()=>(function(e) {
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
        })(t));
    y(e._zod, "propValues", ()=>{
        let e = t.shape, r = {};
        for(let t in e){
            let n = e[t]._zod;
            if (n.values) for (let e of (r[t] ?? (r[t] = new Set()), n.values))r[t].add(e);
        }
        return r;
    });
    let a = t.catchall;
    e._zod.parse = (t, n)=>{
        r ?? (r = i.value);
        let s = t.value;
        if (!z(s)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: s,
            inst: e
        }), t;
        t.value = {};
        let o = [], l = r.shape;
        for (let e of r.keys){
            let r = l[e], i = "optional" === r._zod.optout, a = r._zod.run({
                value: s[e],
                issues: []
            }, n);
            a instanceof Promise ? o.push(a.then((r)=>et(r, t, e, s, i))) : et(a, t, e, s, i);
        }
        return a ? function(e, t, r, n, i, a) {
            let s = [], o = i.keySet, l = i.catchall._zod, d = l.def.type, c = "optional" === l.optout;
            for(let i in t){
                if (o.has(i)) continue;
                if ("never" === d) {
                    s.push(i);
                    continue;
                }
                let a = l.run({
                    value: t[i],
                    issues: []
                }, n);
                a instanceof Promise ? e.push(a.then((e)=>et(e, r, i, t, c))) : et(a, r, i, t, c);
            }
            return (s.length && r.issues.push({
                code: "unrecognized_keys",
                keys: s,
                input: t,
                inst: a
            }), e.length) ? Promise.all(e).then(()=>r) : r;
        }(o, s, t, n, i.value, e) : o.length ? Promise.all(o).then(()=>t) : t;
    };
});
function en(e, t, r, n) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let i = e.filter((e)=>!P(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>I(e, n, b())))
    }), t);
}
const ei = p("$ZodUnion", (e, t)=>{
    J.init(e, t), y(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), y(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), y(e._zod, "values", ()=>{
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
        return s ? Promise.all(o).then((t)=>en(t, i, e, a)) : en(o, i, e, a);
    };
}), ea = p("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, ei.init(e, t);
    let r = e._zod.parse;
    y(e._zod, "propValues", ()=>{
        let e = {};
        for (let r of t.options){
            let n = r._zod.propValues;
            if (!n || 0 === Object.keys(n).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
            for (let [t, r] of Object.entries(n))for (let n of (e[t] || (e[t] = new Set()), r))e[t].add(n);
        }
        return e;
    });
    let n = h(()=>{
        let e = t.options, r = new Map();
        for (let n of e){
            let e = n._zod.propValues?.[t.discriminator];
            if (!e || 0 === e.size) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
            for (let t of e){
                if (r.has(t)) throw Error(`Duplicate discriminator value "${String(t)}"`);
                r.set(t, n);
            }
        }
        return r;
    });
    e._zod.parse = (i, a)=>{
        let s = i.value;
        if (!z(s)) return i.issues.push({
            code: "invalid_type",
            expected: "object",
            input: s,
            inst: e
        }), i;
        let o = n.value.get(s?.[t.discriminator]);
        return o ? o._zod.run(i, a) : t.unionFallback ? r(i, a) : (i.issues.push({
            code: "invalid_union",
            errors: [],
            note: "No matching discriminator",
            discriminator: t.discriminator,
            input: s,
            path: [
                t.discriminator
            ],
            inst: e
        }), i);
    };
}), es = p("$ZodRecord", (e, t)=>{
    J.init(e, t), e._zod.parse = (r, n)=>{
        let i = r.value;
        if (!$(i)) return r.issues.push({
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
                    t.issues.length && r.issues.push(...T(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...T(e, s.issues)), r.value[e] = s.value);
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
            if ("string" == typeof s && q.test(s) && o.issues.length) {
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
                    issues: o.issues.map((e)=>I(e, n, b())),
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
                e.issues.length && r.issues.push(...T(s, e.issues)), r.value[o.value] = e.value;
            })) : (l.issues.length && r.issues.push(...T(s, l.issues)), r.value[o.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), eo = p("$ZodEnum", (e, t)=>{
    var r;
    let n;
    J.init(e, t);
    let i = (n = Object.values(r = t.entries).filter((e)=>"number" == typeof e), Object.entries(r).filter(([e, t])=>-1 === n.indexOf(+e)).map(([e, t])=>t)), a = new Set(i);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${i.filter((e)=>j.has(typeof e)).map((e)=>"string" == typeof e ? O(e) : e.toString()).join("|")})$`), e._zod.parse = (t, r)=>{
        let n = t.value;
        return a.has(n) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: n,
            inst: e
        }), t;
    };
}), el = p("$ZodLiteral", (e, t)=>{
    if (J.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? O(e) : e ? O(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (n, i)=>{
        let a = n.value;
        return r.has(a) || n.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
            inst: e
        }), n;
    };
});
function ed(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const ec = p("$ZodOptional", (e, t)=>{
    J.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", y(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), y(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${m(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let n = t.innerType._zod.run(e, r);
            return n instanceof Promise ? n.then((t)=>ed(t, e.value)) : ed(n, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, r);
    };
}), ep = p("$ZodNullable", (e, t)=>{
    J.init(e, t), y(e._zod, "optin", ()=>t.innerType._zod.optin), y(e._zod, "optout", ()=>t.innerType._zod.optout), y(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${m(e.source)}|null)$`) : void 0;
    }), y(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), eu = p("$ZodCatch", (e, t)=>{
    J.init(e, t), y(e._zod, "optin", ()=>t.innerType._zod.optin), y(e._zod, "optout", ()=>t.innerType._zod.optout), y(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let n = t.innerType._zod.run(e, r);
        return n instanceof Promise ? n.then((n)=>(e.value = n.value, n.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: n.issues.map((e)=>I(e, r, b()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = n.value, n.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: n.issues.map((e)=>I(e, r, b()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ef = p("$ZodLazy", (e, t)=>{
    J.init(e, t), y(e._zod, "innerType", ()=>t.getter()), y(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), y(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), y(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), y(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
const e_ = p("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    J.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>A(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>U(e, t, r), e.parseAsync = async (t, r)=>Z(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>B(e, t, r), e.check = (...r)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, r)=>S(e, t, r), e.brand = ()=>e, e.register = (t, r)=>(t.add(e, r), e), e.apply = (t)=>t(e);
}), eb = p("ZodMiniString", (e, t)=>{
    X.init(e, t), e_.init(e, t);
});
function eg(e) {
    return new eb({
        type: "string",
        ...M(e)
    });
}
const eh = p("ZodMiniNumber", (e, t)=>{
    H.init(e, t), e_.init(e, t);
});
function em(e) {
    return new eh({
        type: "number",
        checks: [],
        ...M(e)
    });
}
const ev = p("ZodMiniBoolean", (e, t)=>{
    G.init(e, t), e_.init(e, t);
});
function ey(e) {
    return new ev({
        type: "boolean",
        ...M(e)
    });
}
const ew = p("ZodMiniNull", (e, t)=>{
    K.init(e, t), e_.init(e, t);
}), ex = p("ZodMiniNever", (e, t)=>{
    Q.init(e, t), e_.init(e, t);
});
function ek(e) {
    return new ex({
        type: "never",
        ...M(e)
    });
}
const ez = p("ZodMiniArray", (e, t)=>{
    ee.init(e, t), e_.init(e, t);
});
function e$(e, t) {
    return new ez({
        type: "array",
        element: e,
        ...M(t)
    });
}
const ej = p("ZodMiniObject", (e, t)=>{
    er.init(e, t), e_.init(e, t), y(e, "shape", ()=>t.shape);
});
function eO(e, t) {
    return new ej({
        type: "object",
        shape: e ?? {},
        ...M(t)
    });
}
const eS = p("ZodMiniUnion", (e, t)=>{
    ei.init(e, t), e_.init(e, t);
});
function eM(e, t) {
    return new eS({
        type: "union",
        options: e,
        ...M(t)
    });
}
const eE = p("ZodMiniDiscriminatedUnion", (e, t)=>{
    ea.init(e, t), e_.init(e, t);
});
function eP(e, t, r) {
    return new eE({
        type: "union",
        options: t,
        discriminator: e,
        ...M(r)
    });
}
const eT = p("ZodMiniRecord", (e, t)=>{
    es.init(e, t), e_.init(e, t);
});
function eC(e, t, r) {
    return new eT({
        type: "record",
        keyType: e,
        valueType: t,
        ...M(r)
    });
}
const eI = p("ZodMiniEnum", (e, t)=>{
    eo.init(e, t), e_.init(e, t), e.options = Object.values(t.entries);
});
function eN(e, t) {
    return new eI({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...M(t)
    });
}
const eL = p("ZodMiniLiteral", (e, t)=>{
    el.init(e, t), e_.init(e, t);
});
function eD(e, t) {
    return new eL({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...M(t)
    });
}
const eR = p("ZodMiniOptional", (e, t)=>{
    ec.init(e, t), e_.init(e, t);
});
function eA(e) {
    return new eR({
        type: "optional",
        innerType: e
    });
}
const eZ = p("ZodMiniNullable", (e, t)=>{
    ep.init(e, t), e_.init(e, t);
});
function eU(e) {
    return new eZ({
        type: "nullable",
        innerType: e
    });
}
const eB = p("ZodMiniCatch", (e, t)=>{
    eu.init(e, t), e_.init(e, t);
}), eq = p("ZodMiniLazy", (e, t)=>{
    ef.init(e, t), e_.init(e, t);
});
function eV() {
    let e = new eq({
        type: "lazy",
        getter: ()=>eM([
                eg(),
                em(),
                ey(),
                new ew({
                    type: "null",
                    ...M(void 0)
                }),
                e$(e),
                eC(eg(), e)
            ])
    });
    return e;
}
let eW = eO({
    error: eM([
        eg(),
        eO({
            code: eg(),
            message: eg()
        })
    ])
});
class eF extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eJ(e) {
    let t = eW.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eF("rpc", e) : new eF(e.code, e.message);
    }
    return e;
}
const eX = eO({
    status: eD("pending"),
    job: eg()
});
eP("status", [
    eO({
        status: eD("pending")
    }),
    eO({
        status: eD("ready"),
        chunk: em(),
        chunks: em(),
        bytes: em(),
        data: eg()
    })
]);
const eH = eO({
    schema_version: eD(1),
    status: eN([
        "success",
        "error"
    ]),
    action: eN([
        "optical_on",
        "optical_off",
        "optical_status",
        "optical_reload",
        "optical_reinitialize",
        "optical_shutdown"
    ]),
    desired_enabled: eU(ey()),
    tx_enabled: eU(ey()),
    actor_state: eN([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: ey(),
    discovery_active: ey(),
    cleanup_pending: ey(),
    error: eU(eO({
        code: eg(),
        message: eg()
    }))
}), eG = eO({
    schema_version: eD(1),
    version: eg(),
    features: eC(eg(), ey()),
    functions: eO({
        optical: ey(),
        omci_mib: ey(),
        mqtt_telemetry: ey(),
        hl202_management: ey(),
        cwmp: ey()
    }),
    pages: eO({
        status: ey(),
        config: ey(),
        sync: ey(),
        hl202: ey(),
        hardware: ey(),
        calibration: ey(),
        about: ey()
    }),
    adapters: e$(eO({
        id: eg(),
        name: eg()
    }))
});
function eK() {
    var e, r;
    let n, i, a;
    return t ??= (e = L.rpc, r = {
        getCapabilities: {
            parse: (e)=>eG.parse(eJ(e))
        },
        opticalStatus: eH,
        opticalSet: eH
    }, n = e.declare({
        object: "fttr",
        method: "get_capabilities",
        reject: !0
    }), i = e.declare({
        object: "fttr",
        method: "optical_status",
        reject: !0
    }), a = e.declare({
        object: "fttr",
        method: "optical_set",
        params: [
            "enabled"
        ],
        reject: !0
    }), {
        getCapabilities: async ()=>r.getCapabilities.parse(await n()),
        opticalStatus: async ()=>r.opticalStatus.parse(await i()),
        opticalSet: async (e)=>r.opticalSet.parse(await a(e.enabled))
    });
}
let eQ = eg(), eY = em(), e0 = ey(), e1 = eA(eQ), e2 = eA(eY), e5 = eA(e0);
const e4 = eN([
    "waiting",
    "wan_reconciling",
    "wan_verifying",
    "wifi_reconciling",
    "discovering",
    "reading",
    "disabling",
    "disabling_read",
    "writing",
    "verifying",
    "settling",
    "completed",
    "not_started",
    "reset_pending",
    "interrupted",
    "recovering",
    "waiting_management",
    "waiting_task"
]), e8 = eN([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), e3 = eO({
    id: eQ,
    name: eA(eU(eQ)),
    kind: eN([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eQ,
    state: eQ,
    reason: e1,
    revision: e1,
    current_revision: e5,
    management_fresh: e5,
    operation_id: e2,
    task_id: eA(eU(eY)),
    updated_at: e2,
    changes: eA(e$(eO({
        name: eQ,
        desired: eQ
    })))
});
let e6 = eO({
    state: eQ,
    reason: e1,
    task_id: eA(eU(eY)),
    instance: e2
});
const e7 = eO({
    cwmp_id: eQ,
    state: eN([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: e0,
    last_inform: eU(eY),
    age_seconds: eU(eY)
});
let e9 = eO({
    state: eN([
        "waiting_transport",
        "waiting_identity",
        "reading",
        "configuring",
        "verifying",
        "waiting_inform",
        "ready",
        "retry_wait",
        "manual_required",
        "not_configured",
        "waiting_acs",
        "awaiting_apply",
        "discovering_management_wan",
        "configuring_management_wan",
        "verifying_management_wan"
    ]),
    method: e1,
    reason: e1,
    mqtt_target: eU(eQ),
    binding_source: e1,
    link_identity_error: eU(eQ),
    mqtt_last_seen: eU(eY),
    cwmp_id: e1,
    desired_version: e1,
    generation: e2,
    inflight: e5,
    attempts: e2,
    next_retry_at: e2,
    updated_at: e2,
    settings_verified_at: eU(eY),
    last_inform: eU(eY),
    last_error: eA(eU(eQ)),
    persistence_error: eA(eU(eQ)),
    desired: eA(eU(eO({
        vlan: eY,
        vlans: e$(eY),
        priority: eY,
        acs_url: eQ
    }))),
    listener: eA(eO({
        enabled: e0,
        listen: eQ,
        path: eQ,
        error: eU(eQ)
    })),
    endpoint_notice: e1,
    manual_steps: eA(e$(eQ))
});
const te = eP("state", [
    e9,
    function(e, t) {
        if (!$(t)) throw Error("Invalid input to extend: expected a plain object");
        let r = e._zod.def.checks;
        if (r && r.length > 0) {
            let r = e._zod.def.shape;
            for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(r, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let n = x(e._zod.def, {
            get shape () {
                let r = {
                    ...e._zod.def.shape,
                    ...t
                };
                return w(this, "shape", r), r;
            }
        });
        return S(e, n);
    }(function(e) {
        var t = void 0;
        let r = e._zod.def.checks;
        if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let n = x(e._zod.def, {
            get shape () {
                let r = e._zod.def.shape, n = {
                    ...r
                };
                if (t) for(let e in t){
                    if (!(e in r)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (n[e] = eR ? new eR({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)n[e] = eR ? new eR({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return w(this, "shape", n), n;
            },
            checks: []
        });
        return S(e, n);
    }(e9), {
        state: eN([
            "pending",
            "unavailable"
        ]),
        reason: eQ
    })
]), tt = eO({
    backend: eA(eO({
        configured: eQ,
        effective: eQ,
        available: e$(eQ),
        reason: eQ
    })),
    state: e4,
    operation_id: e2,
    device: e1,
    optical_sn: e1,
    cwmp_id: e1,
    revision: e1,
    mode: eA(eN([
        "apply",
        "plan"
    ])),
    started_at: e2,
    current_revision: e5,
    management_fresh: e5,
    reason: e1,
    error: e1,
    attempts: e2,
    next_retry_at: e2,
    reconcile_reason: e1,
    items: e$(e3),
    cwmp_contract: eA(eO({
        state: eQ,
        requested: eQ,
        contract: eU(eQ),
        reason: eQ,
        cache_hit: e0,
        schema: eQ,
        capabilities: eU(eO({
            wan: eQ,
            wlan: eQ,
            binding: eQ
        }))
    })),
    wan_objects: eA(eC(eQ, eV())),
    wan_lifecycle: eA(eC(eQ, e6)),
    wan_stage: eA(eN([
        "waiting",
        "inventory",
        "classifying",
        "adding_parent",
        "child_names",
        "adding_child",
        "delete_guard",
        "deleting",
        "verify_delete",
        "empty_parent",
        "deleting_parent",
        "verify_parent_delete",
        "next",
        "done"
    ])),
    wifi_objects: eA(eO({
        owned: e$(eY),
        pending: eU(eQ),
        pending_instance: eU(eY)
    })),
    wifi_lifecycle: eA(eC(eQ, e6)),
    wifi_stage: eA(eN([
        "waiting",
        "inventory",
        "adding",
        "verify_add",
        "deleting",
        "verify_delete",
        "reading_disable",
        "disabling",
        "verifying_disable",
        "next",
        "done"
    ])),
    wifi_cleanup: eA(eN([
        "disable",
        "preserve",
        "delete"
    ]))
});
let tr = eO({
    enabled: e0,
    mode: eN([
        "auto",
        "manual"
    ]),
    vlan: e$(eY),
    priority: eY,
    address: eQ,
    acs_url: eQ,
    port: eY,
    path: eQ,
    dhcp_enabled: e0
}), tn = eO({
    state: eN([
        "discovering",
        "comparing",
        "planning",
        "applying",
        "verifying",
        "configuring_listener",
        "cleaning_previous",
        "waiting_devices",
        "ready",
        "awaiting_apply",
        "verified",
        "blocked",
        "retry_wait"
    ]),
    error: eU(eQ),
    inflight: e0,
    ready: e0,
    desired_version: eU(eQ),
    applied_version: eU(eQ),
    next_retry_at: eY,
    attempts: eY,
    desired: eU(tr),
    applied: eU(tr),
    previous: eU(tr),
    plan: e$(eO({
        operation: eQ,
        key: eQ,
        value: e$(eQ)
    }))
});
const ti = eO({
    device: eQ,
    name: eU(eQ),
    group: eU(eQ),
    group_name: eU(eQ),
    template: eU(eQ),
    template_name: eU(eQ),
    optical_sn: eQ,
    adapter: eQ,
    omci_management: eO({
        state: eQ,
        reason: eA(eU(eQ))
    }),
    management: eU(e7),
    acs_bootstrap: te,
    provisioning: tt,
    services: e$(e3),
    ssids: e$(e3),
    wifi_sync: e8
}), ta = eO({
    enabled: e0,
    mode: eN([
        "auto",
        "manual"
    ]),
    method: eD("diff"),
    revision: eQ,
    triggers: e$(eQ),
    interval_minutes: new eh({
        type: "number",
        coerce: !0,
        checks: [],
        ...M(void 0)
    }),
    error: eU(eQ),
    devices: e$(ti),
    management_network: tn,
    omci_management: eV(),
    groups: e$(eO({
        id: eQ,
        name: eU(eQ),
        template: eQ
    })),
    pending_devices: e$(eQ)
});
eM([
    eO({
        valid: eD(!0),
        revision: eQ,
        devices: eY,
        error: eA(ek())
    }),
    eO({
        error: eQ,
        valid: eA(ek()),
        revision: eA(ek()),
        devices: eA(ek())
    })
]);
let ts = eg(), to = em(), tl = eU(to), td = eC(ts, eO({
    source: ts,
    unit: ts,
    reason: eU(ts),
    raw: eU(ts),
    age_seconds: tl
}));
const tc = eO({
    phase: eN([
        "not_started",
        "collecting_identity",
        "retrying_identity",
        "unsupported",
        "configuring",
        "verifying",
        "wan_bootstrap_pending",
        "verified",
        "retrying",
        "offline"
    ]),
    generation: to,
    error: eU(ts)
}), tp = eN([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tu = eO({
    model: ts,
    wavelength_tx_nm: to,
    wavelength_rx_nm: to,
    phy_rate_downlink_gbps: to,
    phy_rate_uplink_gbps: to,
    tx_power_dbm: tl,
    laser_bias_current_ma: tl,
    temperature_celsius: tl,
    vcc_voltage: tl,
    cdr_locked: eU(ey()),
    tx_enabled: eU(ey()),
    measurements: td
}), tf = eO({
    equipment_id: eU(ts),
    hardware_version: eU(ts),
    software_images: e$(ts),
    omcc_version: tl,
    errors: e$(ts)
});
const t_ = eO({
    onu_id: to,
    vendor: ts,
    model: ts,
    serial_number: ts,
    state: tp,
    business_status: tc,
    management: eU(e7),
    provisioning: eU(tt),
    services: e$(e3),
    ssids: e$(e3),
    wifi_sync: e8,
    acs_bootstrap: eA(te),
    identity: eU(tf),
    identity_age_seconds: tl,
    identity_current: ey(),
    fiber_distance_m: tl,
    ranging_delay_rtd_ns: tl,
    equalization_delay_bits: new eB({
        type: "catch",
        innerType: tl,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tl,
    optical_tx_power_dbm: tl,
    firmware_version: ts,
    hardware_version: ts,
    uptime_seconds: tl,
    data_path: eO({
        interface: ts,
        gem_ports: eU(e$(to)),
        vlan_id: tl,
        tx_bytes: tl,
        rx_bytes: tl,
        current_tx_kbps: tl,
        current_rx_kbps: tl,
        offload: eA(eO({
            enabled: eA(eU(ey())),
            routed_enabled: eA(eU(ey())),
            bridge_enabled: eA(eU(ey())),
            engine_attached: eA(eU(ey())),
            forwarding_verified: eA(eU(ey()))
        })),
        measurements: td
    }),
    wifi_mesh: eO({
        channel_2g: tl,
        channel_5g: tl,
        bandwidth_5g: eU(ts),
        tx_power_pct: tl,
        measurements: td
    }),
    connected_clients: eU(e$(eO({
        mac: ts,
        ip: ts,
        band: ts,
        rssi_dbm: tl,
        rx_rate_mbps: tl,
        tx_rate_mbps: tl
    }))),
    measurements: td
});
let tb = eO({
    reserved_sn: eA(ts),
    port: to,
    interface: ts,
    carrier: ey(),
    status: ts,
    onu_id: eA(to),
    onu_sn: eA(ts),
    link_state: ts
});
const tg = eO({
    counters_valid: eA(ey()),
    packets_exact: eA(ts),
    bytes_exact: eA(ts),
    index: ts,
    state: ts,
    pkt_type: ts,
    orig_tuple: ts,
    new_tuple: ts,
    eth: ts,
    vlan: ts,
    packets: to,
    bytes: to
}), th = eO({
    sampled_at_ms: eA(to),
    errors: eA(e$(ts)),
    config_valid: eA(ey()),
    engine_valid: eA(ey()),
    mask_valid: eA(ey()),
    routed_mask_valid: eA(ey()),
    debug_valid: eA(ey()),
    flows_valid: eA(ey()),
    entries_valid: eA(ey()),
    counters_valid: eA(ey()),
    hooks_valid: eA(ey()),
    total_packets_exact: eA(ts),
    total_bytes_exact: eA(ts),
    supported: ey(),
    engine_attached: ey(),
    bridge_offload_enabled: ey(),
    bridge_offload_mask: to,
    routed_offload_mask: to,
    bridge_offload_debug: ey(),
    bridge: ts,
    active_ports: e$(ts),
    fw4_hooks_ready: ey(),
    total_entries: to,
    bound_entries: to,
    total_packets: to,
    total_bytes: to,
    bound_flows: e$(tg)
}), tm = eO({
    onu_pinning: eA(eO({
        desired: eC(ts, to),
        active: eC(ts, to),
        pending_restart: ey(),
        allocation_blocked: ey(),
        startup_error: eU(ts),
        config_error: eU(ts)
    })),
    fpga_status: ts,
    provisioning: eU(ta),
    optical_transceiver: tu,
    switch_ports: e$(tb),
    sub_gateways: e$(t_),
    telemetry_gateways: e$(eO({
        id: ts,
        last_seen_sec_ago: to,
        last_payload_bytes: to
    })),
    npu: eA(eU(th))
});
eC(ts, eO({
    carrier: eA(ey()),
    mac: eA(ts),
    link: eA(eO({
        speed: eA(to),
        duplex: eA(ts),
        autoneg: eA(ey())
    })),
    stats: eA(eC(ts, to))
}));
const tv = {
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
};
let ty = L.rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: !0
});
L.rpc.declare({
    object: "luci.fttr",
    method: "get_sync",
    reject: !0
}), L.rpc.declare({
    object: "luci.fttr",
    method: "config_check",
    reject: !0
}), L.rpc.declare({
    object: "luci.fttr",
    method: "config_reload",
    reject: !0
}), L.rpc.declare({
    object: "luci.fttr",
    method: "restart_service",
    reject: !0
}), L.rpc.declare({
    object: "luci-rpc",
    method: "getNetworkDevices",
    expect: {
        "": {}
    },
    reject: !0
}), L.rpc.declare({
    object: "luci.fttr",
    method: "sync",
    params: [
        "action",
        "target"
    ],
    reject: !0
});
const tw = async ()=>tm.parse(eJ(await ty())), tx = async ()=>eK().opticalStatus(), tk = async (e)=>eK().opticalSet({
        enabled: e
    });
eO({
    status: eN([
        "success",
        "error"
    ]),
    enabled: eA(ey()),
    error: eA(eg())
}), L.rpc.declare({
    object: "luci.fttr",
    method: "npu_status",
    reject: !0
}), L.rpc.declare({
    object: "luci.fttr",
    method: "npu_set",
    params: [
        "enabled",
        "bridge"
    ],
    reject: !0
}), eM([
    eO({
        operation_ids: e$(em()),
        revision: eg()
    }),
    eO({
        started: eD(!0),
        mode: eN([
            "apply",
            "plan"
        ])
    }),
    eO({
        reset: eD(!0),
        device: eg()
    }),
    eO({
        operation_ids: e$(em()),
        mode: eN([
            "apply",
            "plan"
        ]),
        reconcile: eA(ey()),
        retry: eA(ey())
    })
]), L.rpc.declare({
    object: "luci.fttr",
    method: "get_calibration",
    reject: !0
}), L.rpc.declare({
    object: "luci.fttr",
    method: "save_calibration",
    params: [
        "path",
        "data"
    ],
    reject: !0
}), L.rpc.declare({
    object: "luci.fttr",
    method: "apply_calibration",
    reject: !0
}), eO({
    source: eN([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: eg(),
    size: em(),
    sha256: eg(),
    data: eA(eg()),
    factory: eO({
        detected: ey(),
        device: eg(),
        has_data: ey(),
        sha256: eg(),
        data: eg()
    }),
    firmware: eO({
        exists: ey(),
        path: eg(),
        size: em(),
        sha256: eg(),
        data: eg()
    }),
    error: eA(eg())
}), eO({
    success: ey(),
    path: eg(),
    size: em(),
    sha256: eg(),
    error: eA(eg())
}), eO({
    success: ey(),
    output: eA(eg()),
    error: eA(eg())
});
let tz = eg(), t$ = em(), tj = ey(), tO = eO({
    id: tz,
    url: tz
}), tS = eO({
    name: tz,
    kind: eN([
        "unknown",
        "octets",
        "string",
        "unsigned_integer",
        "table",
        "signed_integer",
        "pointer",
        "bit_field",
        "enumeration",
        "counter"
    ]),
    index: t$,
    mask: t$,
    size: t$,
    read: tj,
    write: tj,
    set_by_create: tj,
    avc: tj,
    optional: tj,
    deprecated: tj,
    default_hex: eU(tz),
    reference: tO
}), tM = eP("type", [
    eO({
        type: eD("unsigned"),
        value: t$
    }),
    eO({
        type: eD("signed"),
        value: t$
    }),
    eO({
        type: eD("decimal"),
        value: tz
    }),
    eO({
        type: eD("text"),
        value: eU(tz)
    }),
    eO({
        type: eD("octets"),
        hex: tz
    }),
    eO({
        type: eD("table_length"),
        bytes: t$
    })
]), tE = eO({
    code: tz,
    message: tz,
    offset: t$,
    mask: t$
}), tP = eN([
    "layout",
    "name_only",
    "unknown"
]), tT = eO({
    raw_hex: tz,
    filter_outer_priority: t$,
    filter_outer_vid: t$,
    filter_outer_tpid_dei: t$,
    filter_inner_priority: t$,
    filter_inner_vid: t$,
    filter_inner_tpid_dei: t$,
    filter_ethertype: t$,
    tags_to_remove: t$,
    treatment_outer_priority: t$,
    treatment_outer_vid: t$,
    treatment_outer_tpid_dei: t$,
    treatment_inner_priority: t$,
    treatment_inner_vid: t$,
    treatment_inner_tpid_dei: t$,
    delete_entry: tj
}), tC = eO({
    schema_version: eD(1),
    reference_version: tz,
    onu_id: eU(t$),
    uploaded_complete: tj,
    expected_records: t$,
    received_records: t$,
    decoded_records: t$,
    partial_records: t$,
    basic_records: t$,
    tables_requested: tj,
    tables_collected: tj,
    classes: e$(eO({
        class_id: t$,
        name: eU(tz),
        entities: t$,
        records: t$,
        support: tP
    })),
    entities: e$(eO({
        class_id: t$,
        entity_id: t$,
        name: eU(tz),
        support: tP,
        reference: eU(tO),
        sequences: e$(t$),
        attributes: e$(eO({
            definition: tS,
            value: eU(tM),
            observations: e$(eO({
                raw_hex: tz,
                value: tM,
                sequences: e$(t$)
            }))
        })),
        diagnostics: e$(tE)
    })),
    records: e$(eO({
        class_id: t$,
        entity_id: t$,
        sequence: t$,
        attribute_mask: t$,
        raw_hex: tz,
        consumed: t$,
        remaining_hex: tz,
        undecoded_mask: t$
    })),
    tables: e$(eO({
        class_id: t$,
        entity_id: t$,
        attribute: tS,
        collected: tj,
        error: eU(tz),
        raw_hex: tz,
        rows: e$(tz),
        vlan_rules: e$(tT)
    })),
    diagnostics: e$(tE)
});
const tI = eO({
    status: eD("ready"),
    report: tC
});
let tN = eO({
    phase: eN([
        "starting",
        "upload",
        "tables"
    ]),
    received: t$,
    expected: eU(t$)
}), tL = eP("status", [
    eO({
        status: eD("pending"),
        progress: eA(tN)
    }),
    eO({
        status: eD("ready"),
        chunk: t$,
        chunks: t$,
        bytes: t$,
        data: tz
    })
]), tD = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_start",
    params: [
        "onu_id",
        "optical_sn",
        "tables"
    ],
    reject: !0
}), tR = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
}), tA = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_release",
    params: [
        "job"
    ],
    reject: !0
});
const tZ = async (e, t, r)=>eX.parse(eJ(await tD(e, t, r))), tU = async (e, t)=>tL.parse(eJ(await tR(e, t))), tB = async (e)=>eO({
        released: tj
    }).parse(eJ(await tA(e)));
function tq(e) {
    let t = "none" === e.tone ? "" : `fttr-badge fttr-badge-${e.tone}`, r = e.class ? ` ${e.class}` : "", n = o("span", {
        class: `${t}${r}`.trim(),
        children: e.children
    });
    return e.title && n.setAttribute("title", e.title), n;
}
const tV = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
};
function tW(e) {
    var t;
    let r = (t = e.state) ? "o5_operation" === t ? {
        tone: "success",
        label: tV.o5_operation,
        title: t
    } : {
        tone: "warning",
        label: tV[t] ?? l(t),
        title: t
    } : {
        tone: "none",
        label: "\u2014"
    };
    return o(tq, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
function tF(e) {
    var t;
    let r = (t = e.status) ? {
        tone: "verified" === t.phase ? "success" : t.error || "wan_bootstrap_pending" === t.phase ? "warning" : "neutral",
        label: `${tv[t.phase]} \xb7 ${t.generation}${t.error ? ` \xb7 ${t.error}` : ""}`,
        title: t.error || void 0
    } : {
        tone: "neutral",
        label: "\u2014"
    };
    return o(tq, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const tJ = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
};
function tX(e) {
    var t;
    let r, n, i, a, s, d, p = (t = e.management, r = t?.state, n = c(t?.age_seconds ?? (t?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - t.last_inform) : null)), a = (i = t?.last_inform ? new Date(1000 * t.last_inform).toLocaleString() : null) ? _("Last Inform: %s").replace("%s", i) : void 0, s = "\u2014", d = "none", "online" === r ? (d = "success", s = tJ.online) : "waiting_inform" === r ? (d = "warning", s = tJ.waiting_inform) : "offline_or_stale" === r ? (d = "danger", s = tJ.offline_or_stale) : r && (d = "neutral", s = l(r)), {
        tone: d,
        label: n && r ? `${s} \xb7 ${n}` : s,
        title: a
    });
    return o(tq, {
        tone: p.tone,
        title: p.title,
        children: p.label
    });
}
const tH = {
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
function tG(e) {
    var t, r;
    let n, i, a, s = (t = e.provisioning, r = e.title, n = t?.state, i = t?.next_retry_at && t.next_retry_at > Math.floor(Date.now() / 1000) ? t.next_retry_at - Math.floor(Date.now() / 1000) : 0, a = r ?? (t?.current_revision === !1 ? _("Previous configuration") : t?.management_fresh === !1 ? _("Management stale") : t?.reconcile_reason ? t.reconcile_reason : i > 0 ? _("Next self-healing retry in %d seconds").replace("%d", String(i)) : t?.reason ?? t?.error), n && "not_started" !== n ? "completed" === n || "verified" === n ? {
        tone: "success",
        label: "completed" === n ? tH.completed : _("Ready"),
        title: a
    } : "wan_reconciling" === n || "wan_verifying" === n || "wifi_reconciling" === n || "discovering" === n || "reading" === n || "disabling" === n || "disabling_read" === n || "writing" === n || "verifying" === n || "settling" === n || "recovering" === n || "waiting_task" === n ? {
        tone: "info",
        label: tH[n] ?? l(n),
        title: a
    } : "interrupted" === n || "failed" === n || "error" === n || "blocked" === n ? {
        tone: "danger",
        label: "blocked" === n ? tH.blocked : tH.interrupted,
        title: a
    } : "waiting" === n || "pending" === n || "waiting_management" === n || "reset_pending" === n ? {
        tone: "warning",
        label: tH[n] ?? tH.waiting,
        title: a
    } : {
        tone: "neutral",
        label: l(n),
        title: a
    } : {
        tone: "neutral",
        label: tH.not_started,
        title: a
    });
    return o(tq, {
        tone: s.tone,
        title: s.title,
        children: s.label
    });
}
const tK = {
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
function tQ(e) {
    var t;
    let r = (t = e.state) && "not_configured" !== t ? "verified" === t ? {
        tone: "success",
        label: tK.verified
    } : "attention_required" === t ? {
        tone: "danger",
        label: tK.attention_required
    } : "stale_revision" === t || "stale_management" === t || "waiting_management" === t ? {
        tone: "warning",
        label: tK[t]
    } : "recovering" === t ? {
        tone: "info",
        label: tK.recovering
    } : "accepted_unverified" === t || "pending" === t ? {
        tone: "warning",
        label: tK[t]
    } : {
        tone: "neutral",
        label: l(t)
    } : {
        tone: "neutral",
        label: tK.not_configured
    };
    return o(tq, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const tY = `
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
let t0 = (e)=>JSON.stringify(e, null, 2);
async function t1(e) {
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
function t2(e) {
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
let t5 = L.view, t4 = null, t8 = null, t3 = null, t6 = !1, t7 = 0;
function t9(e) {
    let t = t3;
    if (!t) return;
    let r = t.querySelector('[data-fttr="laser-state"]'), n = t.querySelector('[data-fttr="laser-toggle"]');
    if (!(r instanceof HTMLElement) || !(n instanceof HTMLButtonElement)) return;
    !0 === e ? (r.textContent = _("TX enabled (reset readback)"), r.className = "fttr-badge fttr-badge-success") : !1 === e ? (r.textContent = _("Off (TX disabled)"), r.className = "fttr-badge fttr-badge-warning") : (r.textContent = _("Unknown"), r.className = "fttr-badge fttr-badge-neutral"), n.textContent = !1 === e ? _("Turn laser on") : _("Turn laser off"), n.disabled = t6, n.onclick = async ()=>{
        if (t6) return;
        let e = !1 === t4, t = e ? _("Re-enable the 1490nm downlink laser? Discovery resumes and sub-gateways can register again.") : _("Turn off the 1490nm downlink laser? All sub-gateways are gracefully disconnected and cannot register until the laser is re-enabled. This setting is saved and reapplied after a reboot.");
        if (window.confirm(t)) {
            t6 = !0, t7++, t9(t4);
            try {
                let t = await tk(e);
                if (t8 = t, t4 = t.tx_enabled, "error" === t.status) return void window.alert(`${_("Failed to change laser output")}: ${t.error?.message ?? _("unknown error")}`);
            } catch (e) {
                t4 = null, t8 = null, window.alert(`${_("Failed to change laser output")}: ${String(e)}`);
            } finally{
                t6 = !1, t9(t4);
            }
        }
    };
    let i = t.querySelector('[data-fttr="laser-detail"]');
    if (i instanceof HTMLElement) {
        let e = t8?.desired_enabled;
        i.textContent = [
            !0 === e ? _("Saved setting: on") : !1 === e ? _("Saved setting: off") : _("Saved setting: unknown"),
            t8 ? t8.discovery_active ? _("Discovery active") : _("Discovery paused") : _("Discovery state: unknown"),
            t8?.cleanup_pending ? _("ONU cleanup pending") : "",
            t8?.error?.message ?? ""
        ].filter(Boolean).join(" \xb7 ");
    }
}
function re(e) {
    var t, r, n, i, a, s, c, p, u, f, b, g, h, m, v, y, w, x, k, z, $;
    let j = e.optical_transceiver, O = o("span", {
        class: `fttr-badge ${"ready" === e.fpga_status ? "fttr-badge-success" : "fttr-badge-neutral"}`,
        style: "font-size:95%",
        children: "ready" === e.fpga_status ? _("Ready") : l(e.fpga_status)
    }), S = null === (t = j.cdr_locked) ? o("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: _("Unknown")
    }) : t ? o("span", {
        class: "fttr-badge fttr-badge-success",
        children: _("Locked")
    }) : o("span", {
        class: "fttr-badge fttr-badge-warning",
        children: _("Unlocked")
    });
    return $ = {
        class: "cbi-section fttr-panel-controller",
        children: [
            o("h3", {
                style: "margin-bottom:12px",
                children: _("Controller hardware")
            }),
            (x = {
                class: "fttr-grid-3",
                children: [
                    (a = {
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
                                        children: O
                                    })
                                ]
                            }, o("div", r)),
                            (n = {
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
                            }, o("div", n)),
                            (i = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("CDR lock")
                                    }),
                                    o("span", {
                                        children: S
                                    })
                                ]
                            }, o("div", i))
                        ]
                    }, o("div", a)),
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
                                        children: l(j.model)
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
                                        children: j.wavelength_tx_nm ? `${j.wavelength_tx_nm} nm` : "\u2014"
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
                                        children: j.wavelength_rx_nm ? `${j.wavelength_rx_nm} nm` : "\u2014"
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
                                        children: j.phy_rate_downlink_gbps ? `${j.phy_rate_downlink_gbps} Gbps` : "\u2014"
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
                                        children: j.phy_rate_uplink_gbps ? `${j.phy_rate_uplink_gbps} Gbps` : "\u2014"
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
                                        children: null == j.temperature_celsius ? "\u2014" : `${j.temperature_celsius} \xb0C`
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
                                        children: d(j.tx_power_dbm)
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
                                        children: null == j.vcc_voltage ? "\u2014" : `${j.vcc_voltage} V`
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
                                        children: null == j.laser_bias_current_ma ? "\u2014" : `${j.laser_bias_current_ma} mA`
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
    }, o("div", $);
}
function rt(e) {
    var t, r;
    return e.length ? (t = {
        class: "fttr-panel-subgateways",
        children: e.map((e)=>{
            var t, r, n, i, a, p, u, f, b, g, h, m, v, y, w, x, k, z, $, j, O, S, M;
            let P = e.identity, T = P?.software_images ?? [], C = function(e) {
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
                            (n = {
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
                            }, o("div", n)),
                            (a = {
                                children: (i = {
                                    type: "button",
                                    class: "fttr-btn-subtle",
                                    onclick: ()=>(function(e) {
                                            var t, r, n, i, a, c, p, u, f, b, g, h;
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
                                                                o(tW, {
                                                                    state: e.state
                                                                })
                                                            ],
                                                            [
                                                                _("Business"),
                                                                o(tF, {
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
                                                                o(tX, {
                                                                    management: e.management
                                                                })
                                                            ],
                                                            [
                                                                _("Last Inform"),
                                                                e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
                                                            ],
                                                            [
                                                                _("Provisioning"),
                                                                o(tG, {
                                                                    provisioning: e.provisioning
                                                                })
                                                            ],
                                                            [
                                                                _("Wi-Fi sync"),
                                                                o(tQ, {
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
                                            }, o("div", r)), $ = (n = {
                                                class: "cbi-progressbar",
                                                style: "display:none;width:100%",
                                                title: "0%",
                                                children: o("div", {
                                                    style: "width:0%"
                                                })
                                            }, o("div", n)), j = o("div", {}), O = o("pre", {
                                                class: "onu-raw-pre"
                                            }), S = o("span", {
                                                class: "download-status",
                                                role: "status"
                                            }), M = null, P = o("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                disabled: !0,
                                                onclick: async ()=>{
                                                    if (w && !v) {
                                                        P.disabled = !0, S.textContent = _("Preparing JSON download\u2026");
                                                        try {
                                                            let t = await t1(w);
                                                            if (v) return;
                                                            M && URL.revokeObjectURL(M), M = URL.createObjectURL(t);
                                                            let r = document.createElement("a");
                                                            r.href = M, r.download = `mib-${e.serial_number}.json`, r.click(), S.textContent = _("JSON download started"), window.setTimeout(()=>{
                                                                URL.revokeObjectURL(r.href), M === r.href && (M = null);
                                                            }, 1000);
                                                        } catch (e) {
                                                            S.textContent = String(e);
                                                        } finally{
                                                            P.disabled = !w || v;
                                                        }
                                                    }
                                                },
                                                children: _("Download JSON")
                                            }), T = (a = {
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
                                                                    P,
                                                                    S
                                                                ]
                                                            })
                                                        ]
                                                    }, o("div", i)),
                                                    O
                                                ]
                                            }, o("div", a)), C = o("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-apply",
                                                onclick: ()=>q(!1),
                                                children: _("Read MIB")
                                            }), I = o("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                onclick: ()=>q(!0),
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
                                                                    C,
                                                                    I,
                                                                    o("small", {
                                                                        class: "mib-action-hint",
                                                                        children: _("Collecting VLAN tables queries extended filter tables and takes longer.")
                                                                    })
                                                                ]
                                                            }, o("div", c)),
                                                            z,
                                                            $
                                                        ]
                                                    }, o("div", p)),
                                                    j
                                                ]
                                            }, o("div", u)), D = {
                                                basic: k,
                                                mib: N,
                                                raw: T
                                            }, R = new Map();
                                            function A(e) {
                                                for (let [t, r] of Object.entries(D))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                                                for (let [t, r] of R)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
                                            }
                                            let Z = (f = {
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
                                                    return R.set(e.id, r), r;
                                                })
                                            }, o("ul", f)), U = (h = {
                                                children: [
                                                    o("div", {
                                                        class: "onu-details-header",
                                                        children: Z
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
				${tY}
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
                                                            T
                                                        ]
                                                    }, o("div", b)),
                                                    (g = {
                                                        class: "right onu-details-footer",
                                                        children: o("button", {
                                                            type: "button",
                                                            class: "cbi-button",
                                                            onclick: ()=>{
                                                                v = !0, M && URL.revokeObjectURL(M), M = null, w = null, O.textContent = "", j.replaceChildren(), L.ui.hideModal();
                                                            },
                                                            children: _("Close")
                                                        })
                                                    }, o("div", g))
                                                ]
                                            }, o(s, h)), B = ()=>!v && U.isConnected && U.getClientRects().length > 0;
                                            async function q(t) {
                                                if (!y) {
                                                    y = !0, C.disabled = I.disabled = !0, $.style.display = "", $.title = "0%", $.firstElementChild.style.width = "0%", z.textContent = _("Reading MIB\u2026");
                                                    try {
                                                        let v = await tw(), y = v.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                                        if (y?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                                        if (!B()) return;
                                                        let k = await tZ(y.onu_id, y.serial_number, t);
                                                        x = k.job;
                                                        let S = Date.now() + 140000;
                                                        for(; B();){
                                                            let e = await tU(k.job, 0);
                                                            if (!B()) return;
                                                            if ("ready" === e.status) {
                                                                var r, n, i, a, s, d, c, p, u, f, b, g, h, m;
                                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                                let t = new Uint8Array(e.bytes), v = 0;
                                                                for(let r = 0; r < e.chunks; r++){
                                                                    let n = 0 === r ? e : await tU(k.job, r);
                                                                    if (!B()) return;
                                                                    if ("ready" !== n.status || n.chunk !== r || n.chunks !== e.chunks || n.bytes !== e.bytes || !n.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                                    let i = atob(n.data);
                                                                    if (i.length > 32768 || v + i.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                                    for(let e = 0; e < i.length; e++)t[v++] = i.charCodeAt(e);
                                                                    let a = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                                                    $.title = `${a}%`, $.firstElementChild.style.width = `${a}%`, z.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                                                }
                                                                if (v !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                                if (await V(), w = tI.parse(eJ(JSON.parse(new TextDecoder("utf-8", {
                                                                    fatal: !0
                                                                }).decode(t)))).report, 1 !== w.schema_version || w.onu_id !== y.onu_id) throw Error(_("Unexpected MIB response"));
                                                                $.style.display = "none", z.replaceChildren((r = w, b = {
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
                                                                }, o("div", b))), j.replaceChildren(function(e) {
                                                                    var t, r, n, i, a, s;
                                                                    let d = e.classes.length ? e.classes[0].class_id : null, c = (t = {
                                                                        class: "mib-content"
                                                                    }, o("div", t)), p = (r = {
                                                                        type: "search",
                                                                        class: "cbi-input-text mib-search-input",
                                                                        placeholder: _("Search ME name or Class ID\u2026")
                                                                    }, o("input", r)), u = (n = {
                                                                        class: "mib-class-list"
                                                                    }, o("div", n)), f = new Map();
                                                                    function b(t) {
                                                                        var r, n;
                                                                        for (let [e, r] of (d = t, f))e === t ? r.classList.add("active") : r.classList.remove("active");
                                                                        let i = e.entities.filter((e)=>e.class_id === t);
                                                                        i.length ? c.replaceChildren(...i.map((r, n)=>{
                                                                            var i, a, s, d, c, p, u, f, b, g, h, m, v, y, w, x, k, z, $;
                                                                            return $ = {
                                                                                open: 0 === n,
                                                                                class: "mib-entity-details",
                                                                                children: [
                                                                                    (c = {
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
                                                                                                            var t, r, n, i, a, s, d, c, p, u;
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
                                                                                                                    (c = {
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
                                                                                                                                            throw new eF("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                                                    }
                                                                                                                                }(e.value)
                                                                                                                            }, o("span", i)),
                                                                                                                            e.observations?.length ? (d = {
                                                                                                                                class: "mib-obs-details",
                                                                                                                                children: [
                                                                                                                                    (a = {
                                                                                                                                        children: _("Raw data / observations")
                                                                                                                                    }, o("summary", a)),
                                                                                                                                    (s = {
                                                                                                                                        class: "mib-pre",
                                                                                                                                        children: t0(e.observations)
                                                                                                                                    }, o("pre", s))
                                                                                                                                ]
                                                                                                                            }, o("details", d)) : null
                                                                                                                        ]
                                                                                                                    }, o("td", c)),
                                                                                                                    (p = {
                                                                                                                        class: "mib-attr-ref",
                                                                                                                        children: t2(e.definition)
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
                                                                                                var t, r, n, i, a, s, d, c, p, u, f, b, g, h, m, v;
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
                                                                                                                            var t, r, n, i, a, s, d, c;
                                                                                                                            return c = {
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
                                                                                                                t2(e.attribute)
                                                                                                            ]
                                                                                                        }, o("p", h)),
                                                                                                        (m = {
                                                                                                            class: "mib-pre",
                                                                                                            children: t0(e.vlan_rules.length ? e.vlan_rules : e.rows)
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
                                                                                                        children: t0({
                                                                                                            diagnostics: r.diagnostics,
                                                                                                            records: e.records.filter((e)=>e.class_id === t && e.entity_id === r.entity_id)
                                                                                                        })
                                                                                                    }, o("pre", x))
                                                                                                ]
                                                                                            }, o("details", k))
                                                                                        ]
                                                                                    }, o("div", z))
                                                                                ]
                                                                            }, o("details", $);
                                                                        })) : c.replaceChildren((n = {
                                                                            class: "mib-empty-content",
                                                                            children: (r = {
                                                                                children: _("No entities recorded for this ME class.")
                                                                            }, o("p", r))
                                                                        }, o("div", n)));
                                                                    }
                                                                    function g() {
                                                                        var t;
                                                                        let r = p.value.trim().toLowerCase();
                                                                        f.clear();
                                                                        let n = e.classes.filter((e)=>`${e.class_id} ${e.name ?? ""}`.toLowerCase().includes(r));
                                                                        n.length ? u.replaceChildren(...n.map((e)=>{
                                                                            var t, r, n, i;
                                                                            let a = (i = {
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
                                                                                    (n = {
                                                                                        class: "mib-class-count",
                                                                                        children: e.entities
                                                                                    }, o("span", n))
                                                                                ]
                                                                            }, o("button", i));
                                                                            return f.set(e.class_id, a), a;
                                                                        })) : u.replaceChildren((t = {
                                                                            class: "mib-empty-list",
                                                                            children: _("No matching ME classes")
                                                                        }, o("div", t)));
                                                                    }
                                                                    return p.addEventListener("input", g), g(), e.classes.length && b(e.classes[0].class_id), s = {
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
                                                                            children: t0(w.diagnostics)
                                                                        }, o("pre", h))
                                                                    ]
                                                                }, o("details", m))), n = w, O.textContent = t0({
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
                                                                }), P.disabled = !1;
                                                                return;
                                                            }
                                                            if (e.progress) {
                                                                let { phase: t, received: r, expected: n } = e.progress;
                                                                if (z.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == n ? "" : `: ${r}/${n}`}` : null == n ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${n}`, n && n > 0) {
                                                                    let e = Math.min(100, Math.round(r / n * 100));
                                                                    $.title = `${e}%`, $.firstElementChild.style.width = `${e}%`;
                                                                }
                                                            }
                                                            if (Date.now() >= S) throw Error(_("MIB query timed out; retry."));
                                                            await new Promise((e)=>setTimeout(e, 1000));
                                                        }
                                                    } catch (e) {
                                                        B() && ($.style.display = "none", z.replaceChildren(o("span", {
                                                            class: "mib-error-text",
                                                            children: [
                                                                String(e),
                                                                w ? ` \xb7 ${_("Previous snapshot retained")}` : ""
                                                            ]
                                                        })));
                                                    } finally{
                                                        await V(), y = !1, C.disabled = I.disabled = !1;
                                                    }
                                                }
                                            }
                                            async function V() {
                                                if (!x) return;
                                                let e = x;
                                                x = null;
                                                try {
                                                    await tB(e);
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
                                }, o("button", i))
                            }, o("div", a))
                        ]
                    }, o("div", p)),
                    (S = {
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
                            (O = {
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
                                                children: l(P?.equipment_id ?? e.model)
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
                                                children: l(P?.hardware_version ?? e.hardware_version)
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
                                                title: C.full || C.display,
                                                children: o("strong", {
                                                    children: C.display
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
                                                children: P?.omcc_version != null ? `0x${P.omcc_version.toString(16).padStart(2, "0")} (${P.omcc_version})` : "\u2014"
                                            })
                                        ]
                                    }, o("div", z)),
                                    P?.errors.length ? ($ = {
                                        class: "fttr-kv-row",
                                        style: "color:#e74c3c",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Identity read errors")
                                            }),
                                            o("span", {
                                                children: P.errors.join("; ")
                                            })
                                        ]
                                    }, o("div", $)) : null,
                                    T.length > 1 ? (j = {
                                        class: "fttr-kv-row",
                                        style: "font-size:80%;color:#888",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Software images")
                                            }),
                                            o("span", {
                                                children: T.join(" \xb7 ")
                                            })
                                        ]
                                    }, o("div", j)) : null
                                ]
                            }, o("div", O))
                        ]
                    }, o("div", S))
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
let main = t5.extend({
    load: ()=>tw(),
    render: (e)=>{
        var t, r;
        let n, i, a, s, l, d, c, p, u, f;
        return n = "controller", t6 = !1, i = [
            {
                id: "controller",
                label: _("Controller & optical transceiver")
            },
            {
                id: "subgateways",
                label: _("Sub-gateways & optical links")
            }
        ], a = new Map(), s = re(e), l = rt(e.sub_gateways ?? []), t = {
            class: "cbi-tabmenu",
            style: "margin-top:14px;margin-bottom:0",
            children: i.map((e)=>{
                var t;
                let r = (t = {
                    class: n === e.id ? "cbi-tab" : "cbi-tab-disabled",
                    "data-tab": e.id,
                    children: o("a", {
                        href: `#tab-${e.id}`,
                        onclick: (t)=>{
                            t.preventDefault();
                            var r = e.id;
                            for (let [e, t] of (n = r, a))t.className = e === r ? "cbi-tab" : "cbi-tab-disabled";
                            s.hidden = "controller" !== r, l.hidden = "subgateways" !== r, window.dispatchEvent(new Event("resize"));
                        },
                        children: e.label
                    })
                }, o("li", t));
                return a.set(e.id, r), r;
            })
        }, d = o("ul", t), s.hidden = !1, l.hidden = !0, t4 = e.optical_transceiver.tx_enabled, t8 = null, c = t7, tx().then((e)=>{
            t6 || c !== t7 || (t8 = e, t9(t4 = e.tx_enabled));
        }).catch(()=>{
            t6 || c !== t7 || t9(t4 = null);
        }), t3 = s, t9(t4), p = o("div", {
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
            let e = t7;
            try {
                if (t6) return;
                let [t, r] = await Promise.all([
                    tw(),
                    tx()
                ]);
                if (t6 || e !== t7) return;
                let i = re(t), a = rt(t.sub_gateways ?? []);
                i.hidden = "controller" !== n, a.hidden = "subgateways" !== n, s.replaceWith(i), l.replaceWith(a), s = i, l = a, t3 = i, t8 = r, t4 = r.tx_enabled, t9(t4);
            } catch  {
                if (t6 || e !== t7) return;
                t8 = null, t9(t4 = null);
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