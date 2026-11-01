'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, r, n, i;
const a = Symbol.for("jsx.fragment");
function s(e, t) {
    let { children: r, ...n } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, i = function e(t) {
        let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let n of t)null != n && "boolean" != typeof n && (Array.isArray(n) ? e(n, r) : r.push(n instanceof Node ? n : String(n)));
        return r;
    }(null == r ? [] : Array.isArray(r) ? r : [
        r
    ]);
    if (e === a) {
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
    let s = {}, o = {
        ...n
    };
    for (let [e, t] of Object.entries(o))e.startsWith("on") && "function" == typeof t ? (s[e] = t, delete o[e]) : "boolean" == typeof t && (t ? o[e] = e : delete o[e]);
    let l = Object.keys(o).length > 0 ? i.length > 1 ? E(e, o, i) : E(e, o, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
    for (let [e, t] of Object.entries(s)){
        let r = e.slice(2).toLowerCase();
        l.addEventListener(r, t);
    }
    return l;
}
const o = (e)=>null == e || "" === e ? "\u2014" : String(e);
function l(e) {
    return e ? new Date(1000 * e).toLocaleString() : "\u2014";
}
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
function g(e) {
    return e && Object.assign(f, e), f;
}
function h(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function b(e) {
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
const y = Symbol("evaluating");
function v(e, t, r) {
    let n;
    Object.defineProperty(e, t, {
        get () {
            if (n !== y) return void 0 === n && (n = y, n = r()), n;
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
const z = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function k(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function j(e) {
    if (!1 === k(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let r = t.prototype;
    return !1 !== k(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
}
const $ = new Set([
    "string",
    "number",
    "symbol"
]);
function S(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function O(e, t, r) {
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
function C(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function N(e) {
    return "string" == typeof e ? e : e?.message;
}
function A(e, t, r) {
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = N(e.inst?._zod.def?.error?.(e)) ?? N(t?.error?.(e)) ?? N(r.customError?.(e)) ?? N(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
}
const I = (e, t)=>{
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
}, T = p("$ZodError", I), R = p("$ZodError", I, {
    Parent: Error
}), D = (t = R, (e, r, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: r,
        issues: []
    }, a);
    if (s instanceof Promise) throw new u();
    if (s.issues.length) {
        let e = new (i?.Err ?? t)(s.issues.map((e)=>A(e, a, g())));
        throw z(e, i?.callee), e;
    }
    return s.value;
}), Z = (r = R, async (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (i?.Err ?? r)(s.issues.map((e)=>A(e, a, g())));
        throw z(e, i?.callee), e;
    }
    return s.value;
}), W = (n = R, (e, t, r)=>{
    let i = r ? {
        ...r,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (a instanceof Promise) throw new u();
    return a.issues.length ? {
        success: !1,
        error: new (n ?? T)(a.issues.map((e)=>A(e, i, g())))
    } : {
        success: !0,
        data: a.value
    };
}), B = (i = R, async (e, t, r)=>{
    let n = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, a = e._zod.run({
        value: t,
        issues: []
    }, n);
    return a instanceof Promise && (a = await a), a.issues.length ? {
        success: !1,
        error: new i(a.issues.map((e)=>A(e, n, g())))
    } : {
        success: !0,
        data: a.value
    };
}), V = /^-?\d+(?:\.\d+)?$/, q = /^(?:true|false)$/i, U = /^null$/i, F = {
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
    v(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = W(e, t);
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
}), K = p("$ZodString", (e, t)=>{
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
}), G = p("$ZodNumber", (e, t)=>{
    J.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? V, e._zod.parse = (r, n)=>{
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
}), H = p("$ZodBoolean", (e, t)=>{
    J.init(e, t), e._zod.pattern = q, e._zod.parse = (r, n)=>{
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
}), Q = p("$ZodNull", (e, t)=>{
    J.init(e, t), e._zod.pattern = U, e._zod.values = new Set([
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
}), X = p("$ZodNever", (e, t)=>{
    J.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function Y(e, t, r) {
    e.issues.length && t.issues.push(...C(r, e.issues)), t.value[r] = e.value;
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
        t.issues.push(...C(r, e.issues));
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
    let i = b(()=>(function(e) {
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
    v(e._zod, "propValues", ()=>{
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
        if (!k(s)) return t.issues.push({
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
        errors: e.map((e)=>e.issues.map((e)=>A(e, n, g())))
    }), t);
}
const ei = p("$ZodUnion", (e, t)=>{
    J.init(e, t), v(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), v(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), v(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), v(e._zod, "pattern", ()=>{
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
    v(e._zod, "propValues", ()=>{
        let e = {};
        for (let r of t.options){
            let n = r._zod.propValues;
            if (!n || 0 === Object.keys(n).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
            for (let [t, r] of Object.entries(n))for (let n of (e[t] || (e[t] = new Set()), r))e[t].add(n);
        }
        return e;
    });
    let n = b(()=>{
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
        if (!k(s)) return i.issues.push({
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
        if (!j(i)) return r.issues.push({
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
                    t.issues.length && r.issues.push(...C(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...C(e, s.issues)), r.value[e] = s.value);
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
            if ("string" == typeof s && V.test(s) && o.issues.length) {
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
                    issues: o.issues.map((e)=>A(e, n, g())),
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
                e.issues.length && r.issues.push(...C(s, e.issues)), r.value[o.value] = e.value;
            })) : (l.issues.length && r.issues.push(...C(s, l.issues)), r.value[o.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), eo = p("$ZodEnum", (e, t)=>{
    var r;
    let n;
    J.init(e, t);
    let i = (n = Object.values(r = t.entries).filter((e)=>"number" == typeof e), Object.entries(r).filter(([e, t])=>-1 === n.indexOf(+e)).map(([e, t])=>t)), a = new Set(i);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${i.filter((e)=>$.has(typeof e)).map((e)=>"string" == typeof e ? S(e) : e.toString()).join("|")})$`), e._zod.parse = (t, r)=>{
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
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? S(e) : e ? S(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (n, i)=>{
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
    J.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", v(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), v(e._zod, "pattern", ()=>{
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
    J.init(e, t), v(e._zod, "optin", ()=>t.innerType._zod.optin), v(e._zod, "optout", ()=>t.innerType._zod.optout), v(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${m(e.source)}|null)$`) : void 0;
    }), v(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), eu = p("$ZodCatch", (e, t)=>{
    J.init(e, t), v(e._zod, "optin", ()=>t.innerType._zod.optin), v(e._zod, "optout", ()=>t.innerType._zod.optout), v(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let n = t.innerType._zod.run(e, r);
        return n instanceof Promise ? n.then((n)=>(e.value = n.value, n.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: n.issues.map((e)=>A(e, r, g()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = n.value, n.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: n.issues.map((e)=>A(e, r, g()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ef = p("$ZodLazy", (e, t)=>{
    J.init(e, t), v(e._zod, "innerType", ()=>t.getter()), v(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), v(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), v(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), v(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
const eg = p("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    J.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>D(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>W(e, t, r), e.parseAsync = async (t, r)=>Z(e, t, r, {
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
        }), e.with = e.check, e.clone = (t, r)=>O(e, t, r), e.brand = ()=>e, e.register = (t, r)=>(t.add(e, r), e), e.apply = (t)=>t(e);
}), eh = p("ZodMiniString", (e, t)=>{
    K.init(e, t), eg.init(e, t);
});
function e_(e) {
    return new eh({
        type: "string",
        ...M(e)
    });
}
const eb = p("ZodMiniNumber", (e, t)=>{
    G.init(e, t), eg.init(e, t);
});
function em(e) {
    return new eb({
        type: "number",
        checks: [],
        ...M(e)
    });
}
const ey = p("ZodMiniBoolean", (e, t)=>{
    H.init(e, t), eg.init(e, t);
});
function ev(e) {
    return new ey({
        type: "boolean",
        ...M(e)
    });
}
const ew = p("ZodMiniNull", (e, t)=>{
    Q.init(e, t), eg.init(e, t);
}), ex = p("ZodMiniNever", (e, t)=>{
    X.init(e, t), eg.init(e, t);
});
function ez(e) {
    return new ex({
        type: "never",
        ...M(e)
    });
}
const ek = p("ZodMiniArray", (e, t)=>{
    ee.init(e, t), eg.init(e, t);
});
function ej(e, t) {
    return new ek({
        type: "array",
        element: e,
        ...M(t)
    });
}
const e$ = p("ZodMiniObject", (e, t)=>{
    er.init(e, t), eg.init(e, t), v(e, "shape", ()=>t.shape);
});
function eS(e, t) {
    return new e$({
        type: "object",
        shape: e ?? {},
        ...M(t)
    });
}
const eO = p("ZodMiniUnion", (e, t)=>{
    ei.init(e, t), eg.init(e, t);
});
function eM(e, t) {
    return new eO({
        type: "union",
        options: e,
        ...M(t)
    });
}
const eP = p("ZodMiniDiscriminatedUnion", (e, t)=>{
    ea.init(e, t), eg.init(e, t);
});
function eC(e, t, r) {
    return new eP({
        type: "union",
        options: t,
        discriminator: e,
        ...M(r)
    });
}
const eE = p("ZodMiniRecord", (e, t)=>{
    es.init(e, t), eg.init(e, t);
});
function eN(e, t, r) {
    return new eE({
        type: "record",
        keyType: e,
        valueType: t,
        ...M(r)
    });
}
const eA = p("ZodMiniEnum", (e, t)=>{
    eo.init(e, t), eg.init(e, t), e.options = Object.values(t.entries);
});
function eI(e, t) {
    return new eA({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...M(t)
    });
}
const eT = p("ZodMiniLiteral", (e, t)=>{
    el.init(e, t), eg.init(e, t);
});
function eL(e, t) {
    return new eT({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...M(t)
    });
}
const eR = p("ZodMiniOptional", (e, t)=>{
    ec.init(e, t), eg.init(e, t);
});
function eD(e) {
    return new eR({
        type: "optional",
        innerType: e
    });
}
const eZ = p("ZodMiniNullable", (e, t)=>{
    ep.init(e, t), eg.init(e, t);
});
function eW(e) {
    return new eZ({
        type: "nullable",
        innerType: e
    });
}
const eB = p("ZodMiniCatch", (e, t)=>{
    eu.init(e, t), eg.init(e, t);
}), eV = p("ZodMiniLazy", (e, t)=>{
    ef.init(e, t), eg.init(e, t);
});
function eq() {
    let e = new eV({
        type: "lazy",
        getter: ()=>eM([
                e_(),
                em(),
                ev(),
                new ew({
                    type: "null",
                    ...M(void 0)
                }),
                ej(e),
                eN(e_(), e)
            ])
    });
    return e;
}
let eU = eS({
    error: eM([
        e_(),
        eS({
            code: e_(),
            message: e_()
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
    let t = eU.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eF("rpc", e) : new eF(e.code, e.message);
    }
    return e;
}
const eK = eS({
    status: eL("pending"),
    job: e_()
});
eC("status", [
    eS({
        status: eL("pending")
    }),
    eS({
        status: eL("ready"),
        chunk: em(),
        chunks: em(),
        bytes: em(),
        data: e_()
    })
]);
let eG = e_(), eH = em(), eQ = ev(), eX = eD(eG), eY = eD(eH), e0 = eD(eQ);
const e1 = eI([
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
]), e2 = eI([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), e8 = eS({
    id: eG,
    name: eD(eW(eG)),
    kind: eI([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eG,
    state: eG,
    reason: eX,
    revision: eX,
    current_revision: e0,
    management_fresh: e0,
    operation_id: eY,
    task_id: eD(eW(eH)),
    updated_at: eY,
    changes: eD(ej(eS({
        name: eG,
        desired: eG
    })))
});
let e5 = eS({
    state: eG,
    reason: eX,
    task_id: eD(eW(eH)),
    instance: eY
});
const e3 = eS({
    cwmp_id: eG,
    state: eI([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: eQ,
    last_inform: eW(eH),
    age_seconds: eW(eH)
});
let e4 = eS({
    state: eI([
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
    method: eX,
    reason: eX,
    mqtt_target: eW(eG),
    binding_source: eX,
    link_identity_error: eW(eG),
    mqtt_last_seen: eW(eH),
    cwmp_id: eX,
    desired_version: eX,
    generation: eY,
    inflight: e0,
    attempts: eY,
    next_retry_at: eY,
    updated_at: eY,
    settings_verified_at: eW(eH),
    last_inform: eW(eH),
    last_error: eD(eW(eG)),
    persistence_error: eD(eW(eG)),
    desired: eD(eW(eS({
        vlan: eH,
        vlans: ej(eH),
        priority: eH,
        acs_url: eG
    }))),
    listener: eD(eS({
        enabled: eQ,
        listen: eG,
        path: eG,
        error: eW(eG)
    })),
    endpoint_notice: eX,
    manual_steps: eD(ej(eG))
});
const e6 = eC("state", [
    e4,
    function(e, t) {
        if (!j(t)) throw Error("Invalid input to extend: expected a plain object");
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
        return O(e, n);
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
        return O(e, n);
    }(e4), {
        state: eI([
            "pending",
            "unavailable"
        ]),
        reason: eG
    })
]), e7 = eS({
    backend: eD(eS({
        configured: eG,
        effective: eG,
        available: ej(eG),
        reason: eG
    })),
    state: e1,
    operation_id: eY,
    device: eX,
    optical_sn: eX,
    cwmp_id: eX,
    revision: eX,
    mode: eD(eI([
        "apply",
        "plan"
    ])),
    started_at: eY,
    current_revision: e0,
    management_fresh: e0,
    reason: eX,
    error: eX,
    attempts: eY,
    next_retry_at: eY,
    reconcile_reason: eX,
    items: ej(e8),
    cwmp_contract: eD(eS({
        state: eG,
        requested: eG,
        contract: eW(eG),
        reason: eG,
        cache_hit: eQ,
        schema: eG,
        capabilities: eW(eS({
            wan: eG,
            wlan: eG,
            binding: eG
        }))
    })),
    wan_objects: eD(eN(eG, eq())),
    wan_lifecycle: eD(eN(eG, e5)),
    wan_stage: eD(eI([
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
    wifi_objects: eD(eS({
        owned: ej(eH),
        pending: eW(eG),
        pending_instance: eW(eH)
    })),
    wifi_lifecycle: eD(eN(eG, e5)),
    wifi_stage: eD(eI([
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
    wifi_cleanup: eD(eI([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e9 = eS({
    enabled: eQ,
    mode: eI([
        "auto",
        "manual"
    ]),
    vlan: ej(eH),
    priority: eH,
    address: eG,
    acs_url: eG,
    port: eH,
    path: eG,
    dhcp_enabled: eQ
}), te = eS({
    state: eI([
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
    error: eW(eG),
    inflight: eQ,
    ready: eQ,
    desired_version: eW(eG),
    applied_version: eW(eG),
    next_retry_at: eH,
    attempts: eH,
    desired: eW(e9),
    applied: eW(e9),
    previous: eW(e9),
    plan: ej(eS({
        operation: eG,
        key: eG,
        value: ej(eG)
    }))
});
const tt = eS({
    device: eG,
    name: eW(eG),
    group: eW(eG),
    group_name: eW(eG),
    template: eW(eG),
    template_name: eW(eG),
    optical_sn: eG,
    adapter: eG,
    omci_management: eS({
        state: eG,
        reason: eD(eW(eG))
    }),
    management: eW(e3),
    acs_bootstrap: e6,
    provisioning: e7,
    services: ej(e8),
    ssids: ej(e8),
    wifi_sync: e2
}), tr = eS({
    enabled: eQ,
    mode: eI([
        "auto",
        "manual"
    ]),
    method: eL("diff"),
    revision: eG,
    triggers: ej(eG),
    interval_minutes: new eb({
        type: "number",
        coerce: !0,
        checks: [],
        ...M(void 0)
    }),
    error: eW(eG),
    devices: ej(tt),
    management_network: te,
    omci_management: eq(),
    groups: ej(eS({
        id: eG,
        name: eW(eG),
        template: eG
    })),
    pending_devices: ej(eG)
}), tn = eM([
    eS({
        valid: eL(!0),
        revision: eG,
        devices: eH,
        error: eD(ez())
    }),
    eS({
        error: eG,
        valid: eD(ez()),
        revision: eD(ez()),
        devices: eD(ez())
    })
]);
let ti = e_(), ta = em(), ts = eW(ta), to = eN(ti, eS({
    source: ti,
    unit: ti,
    reason: eW(ti),
    raw: eW(ti),
    age_seconds: ts
}));
const tl = eS({
    phase: eI([
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
    generation: ta,
    error: eW(ti)
}), td = eI([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tc = eS({
    model: ti,
    wavelength_tx_nm: ta,
    wavelength_rx_nm: ta,
    phy_rate_downlink_gbps: ta,
    phy_rate_uplink_gbps: ta,
    tx_power_dbm: ts,
    laser_bias_current_ma: ts,
    temperature_celsius: ts,
    vcc_voltage: ts,
    cdr_locked: eW(ev()),
    tx_enabled: eW(ev()),
    measurements: to
}), tp = eS({
    equipment_id: eW(ti),
    hardware_version: eW(ti),
    software_images: ej(ti),
    omcc_version: ts,
    errors: ej(ti)
});
const tu = eS({
    onu_id: ta,
    vendor: ti,
    model: ti,
    serial_number: ti,
    state: td,
    business_status: tl,
    management: eW(e3),
    provisioning: eW(e7),
    services: ej(e8),
    ssids: ej(e8),
    wifi_sync: e2,
    acs_bootstrap: eD(e6),
    identity: eW(tp),
    identity_age_seconds: ts,
    identity_current: ev(),
    fiber_distance_m: ts,
    ranging_delay_rtd_ns: ts,
    equalization_delay_bits: new eB({
        type: "catch",
        innerType: ts,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: ts,
    optical_tx_power_dbm: ts,
    firmware_version: ti,
    hardware_version: ti,
    uptime_seconds: ts,
    data_path: eS({
        interface: ti,
        gem_ports: eW(ej(ta)),
        vlan_id: ts,
        tx_bytes: ts,
        rx_bytes: ts,
        current_tx_kbps: ts,
        current_rx_kbps: ts,
        measurements: to
    }),
    wifi_mesh: eS({
        channel_2g: ts,
        channel_5g: ts,
        bandwidth_5g: eW(ti),
        tx_power_pct: ts,
        measurements: to
    }),
    connected_clients: eW(ej(eS({
        mac: ti,
        ip: ti,
        band: ti,
        rssi_dbm: ts,
        rx_rate_mbps: ts,
        tx_rate_mbps: ts
    }))),
    measurements: to
});
let tf = eS({
    reserved_sn: eD(ti),
    port: ta,
    interface: ti,
    carrier: ev(),
    status: ti,
    onu_id: eD(ta),
    onu_sn: eD(ti),
    link_state: ti
});
const tg = eS({
    onu_pinning: eD(eS({
        desired: eN(ti, ta),
        active: eN(ti, ta),
        pending_restart: ev(),
        allocation_blocked: ev(),
        startup_error: eW(ti),
        config_error: eW(ti)
    })),
    fpga_status: ti,
    provisioning: eW(tr),
    optical_transceiver: tc,
    switch_ports: ej(tf),
    sub_gateways: ej(tu),
    telemetry_gateways: ej(eS({
        id: ti,
        last_seen_sec_ago: ta,
        last_payload_bytes: ta
    }))
});
eN(ti, eS({
    carrier: eD(ev()),
    mac: eD(ti),
    link: eD(eS({
        speed: eD(ta),
        duplex: eD(ti),
        autoneg: eD(ev())
    })),
    stats: eD(eN(ti, ta))
}));
const th = {
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
let t_ = L.rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: !0
}), tb = L.rpc.declare({
    object: "luci.fttr",
    method: "get_sync",
    reject: !0
}), tm = L.rpc.declare({
    object: "luci.fttr",
    method: "config_check",
    reject: !0
}), ty = (L.rpc.declare({
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
}));
const tv = async ()=>tg.parse(eJ(await t_())), tw = async ()=>tr.parse(eJ(await tb())), tx = async ()=>tn.parse(await tm());
eS({
    schema_version: eL(1),
    status: eI([
        "success",
        "error"
    ]),
    action: eI([
        "optical_on",
        "optical_off",
        "optical_status",
        "optical_reload",
        "optical_reinitialize",
        "optical_shutdown"
    ]),
    desired_enabled: eW(ev()),
    tx_enabled: eW(ev()),
    actor_state: eI([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: ev(),
    discovery_active: ev(),
    cleanup_pending: ev(),
    error: eW(eS({
        code: e_(),
        message: e_()
    }))
}), L.rpc.declare({
    object: "luci.fttr",
    method: "optical_status",
    reject: !0
}), L.rpc.declare({
    object: "luci.fttr",
    method: "optical_set",
    params: [
        "enabled"
    ],
    reject: !0
});
let tz = eM([
    eS({
        operation_ids: ej(em()),
        revision: e_()
    }),
    eS({
        started: eL(!0),
        mode: eI([
            "apply",
            "plan"
        ])
    }),
    eS({
        reset: eL(!0),
        device: e_()
    }),
    eS({
        operation_ids: ej(em()),
        mode: eI([
            "apply",
            "plan"
        ]),
        reconcile: eD(ev()),
        retry: eD(ev())
    })
]);
const tk = async (e, t)=>tz.parse(eJ(await ty(e, t)));
L.rpc.declare({
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
}), eS({
    source: eI([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: e_(),
    size: em(),
    sha256: e_(),
    data: eD(e_()),
    factory: eS({
        detected: ev(),
        device: e_(),
        has_data: ev(),
        sha256: e_(),
        data: e_()
    }),
    firmware: eS({
        exists: ev(),
        path: e_(),
        size: em(),
        sha256: e_(),
        data: e_()
    }),
    error: eD(e_())
}), eS({
    success: ev(),
    path: e_(),
    size: em(),
    sha256: e_(),
    error: eD(e_())
}), eS({
    success: ev(),
    output: eD(e_()),
    error: eD(e_())
});
let tj = e_(), t$ = em(), tS = ev(), tO = eS({
    id: tj,
    url: tj
}), tM = eS({
    name: tj,
    kind: eI([
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
    read: tS,
    write: tS,
    set_by_create: tS,
    avc: tS,
    optional: tS,
    deprecated: tS,
    default_hex: eW(tj),
    reference: tO
}), tP = eC("type", [
    eS({
        type: eL("unsigned"),
        value: t$
    }),
    eS({
        type: eL("signed"),
        value: t$
    }),
    eS({
        type: eL("decimal"),
        value: tj
    }),
    eS({
        type: eL("text"),
        value: eW(tj)
    }),
    eS({
        type: eL("octets"),
        hex: tj
    }),
    eS({
        type: eL("table_length"),
        bytes: t$
    })
]), tC = eS({
    code: tj,
    message: tj,
    offset: t$,
    mask: t$
}), tE = eI([
    "layout",
    "name_only",
    "unknown"
]), tN = eS({
    raw_hex: tj,
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
    delete_entry: tS
}), tA = eS({
    schema_version: eL(1),
    reference_version: tj,
    onu_id: eW(t$),
    uploaded_complete: tS,
    expected_records: t$,
    received_records: t$,
    decoded_records: t$,
    partial_records: t$,
    basic_records: t$,
    tables_requested: tS,
    tables_collected: tS,
    classes: ej(eS({
        class_id: t$,
        name: eW(tj),
        entities: t$,
        records: t$,
        support: tE
    })),
    entities: ej(eS({
        class_id: t$,
        entity_id: t$,
        name: eW(tj),
        support: tE,
        reference: eW(tO),
        sequences: ej(t$),
        attributes: ej(eS({
            definition: tM,
            value: eW(tP),
            observations: ej(eS({
                raw_hex: tj,
                value: tP,
                sequences: ej(t$)
            }))
        })),
        diagnostics: ej(tC)
    })),
    records: ej(eS({
        class_id: t$,
        entity_id: t$,
        sequence: t$,
        attribute_mask: t$,
        raw_hex: tj,
        consumed: t$,
        remaining_hex: tj,
        undecoded_mask: t$
    })),
    tables: ej(eS({
        class_id: t$,
        entity_id: t$,
        attribute: tM,
        collected: tS,
        error: eW(tj),
        raw_hex: tj,
        rows: ej(tj),
        vlan_rules: ej(tN)
    })),
    diagnostics: ej(tC)
});
const tI = eS({
    status: eL("ready"),
    report: tA
});
let tT = eS({
    phase: eI([
        "starting",
        "upload",
        "tables"
    ]),
    received: t$,
    expected: eW(t$)
}), tL = eC("status", [
    eS({
        status: eL("pending"),
        progress: eD(tT)
    }),
    eS({
        status: eL("ready"),
        chunk: t$,
        chunks: t$,
        bytes: t$,
        data: tj
    })
]), tR = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_start",
    params: [
        "onu_id",
        "optical_sn",
        "tables"
    ],
    reject: !0
}), tD = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
}), tZ = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_release",
    params: [
        "job"
    ],
    reject: !0
});
const tW = async (e, t, r)=>eK.parse(eJ(await tR(e, t, r))), tB = async (e, t)=>tL.parse(eJ(await tD(e, t))), tV = async (e)=>eS({
        released: tS
    }).parse(eJ(await tZ(e)));
function tq(e) {
    let t = "none" === e.tone ? "" : `fttr-badge fttr-badge-${e.tone}`, r = e.class ? ` ${e.class}` : "", n = s("span", {
        class: `${t}${r}`.trim(),
        children: e.children
    });
    return e.title && n.setAttribute("title", e.title), n;
}
const tU = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
};
function tF(e) {
    var t;
    let r = (t = e.state) ? "o5_operation" === t ? {
        tone: "success",
        label: tU.o5_operation,
        title: t
    } : {
        tone: "warning",
        label: tU[t] ?? o(t),
        title: t
    } : {
        tone: "none",
        label: "\u2014"
    };
    return s(tq, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
function tJ(e) {
    var t;
    let r = (t = e.status) ? {
        tone: "verified" === t.phase ? "success" : t.error || "wan_bootstrap_pending" === t.phase ? "warning" : "neutral",
        label: `${th[t.phase]} \xb7 ${t.generation}${t.error ? ` \xb7 ${t.error}` : ""}`,
        title: t.error || void 0
    } : {
        tone: "neutral",
        label: "\u2014"
    };
    return s(tq, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const tK = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
};
function tG(e) {
    var t;
    let r, n, i, a, l, d, p = (t = e.management, r = t?.state, n = c(t?.age_seconds ?? (t?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - t.last_inform) : null)), a = (i = t?.last_inform ? new Date(1000 * t.last_inform).toLocaleString() : null) ? _("Last Inform: %s").replace("%s", i) : void 0, l = "\u2014", d = "none", "online" === r ? (d = "success", l = tK.online) : "waiting_inform" === r ? (d = "warning", l = tK.waiting_inform) : "offline_or_stale" === r ? (d = "danger", l = tK.offline_or_stale) : r && (d = "neutral", l = o(r)), {
        tone: d,
        label: n && r ? `${l} \xb7 ${n}` : l,
        title: a
    });
    return s(tq, {
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
function tQ(e) {
    var t, r;
    let n, i, a, l = (t = e.provisioning, r = e.title, n = t?.state, i = t?.next_retry_at && t.next_retry_at > Math.floor(Date.now() / 1000) ? t.next_retry_at - Math.floor(Date.now() / 1000) : 0, a = r ?? (t?.current_revision === !1 ? _("Previous configuration") : t?.management_fresh === !1 ? _("Management stale") : t?.reconcile_reason ? t.reconcile_reason : i > 0 ? _("Next self-healing retry in %d seconds").replace("%d", String(i)) : t?.reason ?? t?.error), n && "not_started" !== n ? "completed" === n || "verified" === n ? {
        tone: "success",
        label: "completed" === n ? tH.completed : _("Ready"),
        title: a
    } : "wan_reconciling" === n || "wan_verifying" === n || "wifi_reconciling" === n || "discovering" === n || "reading" === n || "disabling" === n || "disabling_read" === n || "writing" === n || "verifying" === n || "settling" === n || "recovering" === n || "waiting_task" === n ? {
        tone: "info",
        label: tH[n] ?? o(n),
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
        label: o(n),
        title: a
    } : {
        tone: "neutral",
        label: tH.not_started,
        title: a
    });
    return s(tq, {
        tone: l.tone,
        title: l.title,
        children: l.label
    });
}
const tX = {
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
function tY(e) {
    var t;
    let r = (t = e.state) && "not_configured" !== t ? "verified" === t ? {
        tone: "success",
        label: tX.verified
    } : "attention_required" === t ? {
        tone: "danger",
        label: tX.attention_required
    } : "stale_revision" === t || "stale_management" === t || "waiting_management" === t ? {
        tone: "warning",
        label: tX[t]
    } : "recovering" === t ? {
        tone: "info",
        label: tX.recovering
    } : "accepted_unverified" === t || "pending" === t ? {
        tone: "warning",
        label: tX[t]
    } : {
        tone: "neutral",
        label: o(t)
    } : {
        tone: "neutral",
        label: tX.not_configured
    };
    return s(tq, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const t0 = `
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
let t1 = (e)=>JSON.stringify(e, null, 2);
async function t2(e) {
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
function t8(e) {
    let t = e.reference;
    return t?.url.startsWith("https://github.com/opencord/omci-lib-go/blob/v2.2.4/") ? s("a", {
        href: t.url,
        target: "_blank",
        rel: "noopener noreferrer",
        children: t.id
    }) : s("span", {
        children: "\u2014"
    });
}
let t5 = eS({
    schema_version: eL(1),
    version: e_(),
    features: eS({
        acs: ev(),
        mqtt: ev(),
        "device-hl202": ev(),
        "device-hwtc": ev()
    }),
    functions: eS({
        optical: ev(),
        omci_mib: ev(),
        mqtt_telemetry: ev(),
        hl202_management: ev(),
        cwmp: ev()
    }),
    pages: eS({
        status: ev(),
        config: ev(),
        sync: ev(),
        hl202: ev(),
        hardware: ev(),
        calibration: ev(),
        about: ev()
    })
}), t3 = L.rpc.declare({
    object: "luci.fttr",
    method: "get_capabilities",
    reject: !0
});
const t4 = async ()=>t5.parse(eJ(await t3()));
async function t6(e) {
    if (!(await t4()).pages[e]) throw Error(_("This page is not supported by the installed FTTR build."));
}
let t7 = {
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
function t9(e, t) {
    if (!e) return s("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: "\u2014"
    });
    let r = t7[e], n = r?.label || o(e), i = r?.type || "neutral";
    return s("span", {
        class: `fttr-badge fttr-badge-${i}`,
        title: t || e,
        children: n
    });
}
function re(e) {
    var t, r, n, i, a, d;
    return d = {
        class: "table-wrapper",
        children: (a = {
            class: "table",
            children: [
                (r = {
                    children: (t = {
                        children: [
                            s("th", {
                                children: _("Configuration item")
                            }),
                            s("th", {
                                children: _("Type")
                            }),
                            s("th", {
                                children: _("State")
                            }),
                            s("th", {
                                children: _("Evidence freshness")
                            }),
                            s("th", {
                                children: _("Last update / task")
                            }),
                            s("th", {
                                children: _("Reason / desired changes")
                            })
                        ]
                    }, s("tr", t))
                }, s("thead", r)),
                (i = {
                    children: e.length ? e.map((e)=>{
                        var t, r, n, i, a, d, c, p, u, f;
                        return f = {
                            children: [
                                (n = {
                                    children: s("strong", {
                                        children: o(e.name || e.id)
                                    })
                                }, s("td", n)),
                                (i = {
                                    children: s("span", {
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
                                                    return "port_binding" === t ? _("Binding") : o(e || t);
                                            }
                                        }(e.service_type ?? "", e.kind)
                                    })
                                }, s("td", i)),
                                s("td", {
                                    children: t9(e.state)
                                }),
                                (d = {
                                    children: (t = e.current_revision, r = e.management_fresh, a = {
                                        style: "display:flex;flex-direction:column;gap:3px;align-items:flex-start",
                                        children: [
                                            !0 === t ? s("span", {
                                                class: "fttr-badge fttr-badge-info",
                                                style: "font-size:78%",
                                                children: _("Current configuration")
                                            }) : !1 === t ? s("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                style: "font-size:78%",
                                                children: _("Previous configuration")
                                            }) : s("span", {
                                                children: "\u2014"
                                            }),
                                            !0 === r ? s("span", {
                                                class: "fttr-badge fttr-badge-success",
                                                style: "font-size:78%",
                                                children: _("Management fresh")
                                            }) : !1 === r ? s("span", {
                                                class: "fttr-badge fttr-badge-warning",
                                                style: "font-size:78%",
                                                children: _("Management stale")
                                            }) : null
                                        ]
                                    }, s("div", a))
                                }, s("td", d)),
                                (c = {
                                    children: [
                                        s("div", {
                                            children: l(e.updated_at)
                                        }),
                                        void 0 !== e.task_id && null !== e.task_id ? s("span", {
                                            class: "fttr-badge fttr-badge-neutral",
                                            style: "font-size:75%;margin-top:2px",
                                            children: [
                                                _("Task"),
                                                " #",
                                                e.task_id
                                            ]
                                        }) : null
                                    ]
                                }, s("td", c)),
                                (u = {
                                    children: [
                                        e.reason ? s("div", {
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
                                                        s("code", {
                                                            children: e.name
                                                        }),
                                                        " = ",
                                                        s("code", {
                                                            children: e.desired
                                                        })
                                                    ]
                                                }, s("div", t);
                                            })
                                        }, s("div", p)) : !e.reason && "\u2014"
                                    ]
                                }, s("td", u))
                            ]
                        }, s("tr", f);
                    }) : (n = {
                        children: s("td", {
                            colSpan: 6,
                            style: "text-align:center;color:#888;padding:1em",
                            children: _("No desired items configured.")
                        })
                    }, s("tr", n))
                }, s("tbody", i))
            ]
        }, s("table", a))
    }, s("div", d);
}
let main = L.view.extend({
    load: async ()=>(await t6("sync"), Promise.all([
            tw(),
            tx()
        ])),
    render (e) {
        var t, r, n, i, p, u;
        let [f, g] = e, h = s("div", {}), b = s("p", {
            class: "alert-message warning",
            hidden: !0,
            "aria-live": "polite"
        }), m = s("div", {
            class: "fttr-sync-result",
            "aria-live": "polite",
            style: "margin:10px 0"
        }), y = (t = {
            class: "cbi-input-select",
            children: [
                s("option", {
                    value: "all",
                    children: _("All devices")
                }),
                (f.devices ?? []).map((e)=>s("option", {
                        value: e.device,
                        children: e.name || e.device
                    }))
            ]
        }, s("select", t)), v = s("div", {}), w = s("div", {}), x = f, z = g, k = !1, j = !1, $ = [], S = async (e)=>{
            if (!k) {
                k = !0, B(x);
                try {
                    var t;
                    await tk("reset_state", e.device), m.replaceChildren((t = {
                        class: "alert-message info",
                        children: _("Synchronization state reset for %s. Preview differences to read the current device state.").replace("%s", e.name || e.optical_sn)
                    }, s("div", t))), B(await tw());
                } catch (e) {
                    m.replaceChildren(s("div", {
                        class: "alert-message danger",
                        children: String(e)
                    }));
                } finally{
                    k = !1, B(x);
                }
            }
        }, O = async (e)=>{
            if (!k) {
                k = !0, B(x);
                try {
                    var t;
                    let r = await tk("apply", e.device), n = "operation_ids" in r ? r.operation_ids.join(", ") : "\u2014";
                    m.replaceChildren((t = {
                        class: "alert-message info",
                        children: _("Configuration delivery started for %s. Operation IDs: %s").replace("%s", e.name || e.optical_sn).replace("%s", n || "\u2014")
                    }, s("div", t))), B(await tw());
                } catch (e) {
                    m.replaceChildren(s("div", {
                        class: "alert-message danger",
                        children: String(e)
                    }));
                } finally{
                    k = !1, B(x);
                }
            }
        }, M = async (e)=>{
            try {
                let t = (await tv()).sub_gateways.find((t)=>t.serial_number === e.optical_sn);
                if (!t) throw Error(_("Device is offline or no longer registered; refresh status and retry."));
                !function(e) {
                    var t, r, n, i, l, c, p, u, f, g, h, b;
                    let m = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "basic", y = !1, v = !1, w = null, x = null, z = (t = {
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
                                        s("code", {
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
                                        e.identity?.omcc_version == null ? null : s("code", {
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
                                        s(tF, {
                                            state: e.state
                                        })
                                    ],
                                    [
                                        _("Business"),
                                        s(tJ, {
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
                                        null == e.equalization_delay_bits ? "\u2014" : s("code", {
                                            style: "font-size:90%",
                                            children: [
                                                e.equalization_delay_bits,
                                                " bits"
                                            ]
                                        })
                                    ],
                                    [
                                        _("Data interface"),
                                        e.data_path?.interface ? s("code", {
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
                                        s(tG, {
                                            management: e.management
                                        })
                                    ],
                                    [
                                        _("Last Inform"),
                                        e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
                                    ],
                                    [
                                        _("Provisioning"),
                                        s(tQ, {
                                            provisioning: e.provisioning
                                        })
                                    ],
                                    [
                                        _("Wi-Fi sync"),
                                        s(tY, {
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
                                    s("h3", {
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
                                                        s("th", {
                                                            style: "width:35%",
                                                            children: r
                                                        }),
                                                        s("td", {
                                                            children: n instanceof Node ? n : o(n)
                                                        })
                                                    ]
                                                }, s("tr", t);
                                            })
                                        }, s("tbody", t))
                                    }, s("table", r))
                                ]
                            }, s("div", n);
                        })
                    }, s("div", t)), k = (r = {
                        class: "mib-status-bar",
                        role: "status",
                        children: s("span", {
                            class: "mib-hint-text",
                            children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                        })
                    }, s("div", r)), j = (n = {
                        class: "cbi-progressbar",
                        style: "display:none;width:100%",
                        title: "0%",
                        children: s("div", {
                            style: "width:0%"
                        })
                    }, s("div", n)), $ = s("div", {}), S = s("pre", {
                        class: "onu-raw-pre"
                    }), O = s("span", {
                        class: "download-status",
                        role: "status"
                    }), M = null, P = s("button", {
                        type: "button",
                        class: "cbi-button cbi-button-action",
                        disabled: !0,
                        onclick: async ()=>{
                            if (w && !y) {
                                P.disabled = !0, O.textContent = _("Preparing JSON download\u2026");
                                try {
                                    let t = await t2(w);
                                    if (y) return;
                                    M && URL.revokeObjectURL(M), M = URL.createObjectURL(t);
                                    let r = document.createElement("a");
                                    r.href = M, r.download = `mib-${e.serial_number}.json`, r.click(), O.textContent = _("JSON download started"), window.setTimeout(()=>{
                                        URL.revokeObjectURL(r.href), M === r.href && (M = null);
                                    }, 1000);
                                } catch (e) {
                                    O.textContent = String(e);
                                } finally{
                                    P.disabled = !w || y;
                                }
                            }
                        },
                        children: _("Download JSON")
                    }), C = (l = {
                        class: "onu-raw-panel",
                        children: [
                            (i = {
                                class: "onu-raw-toolbar",
                                children: [
                                    s("span", {
                                        class: "onu-raw-hint",
                                        children: _("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")
                                    }),
                                    s("div", {
                                        class: "onu-raw-actions",
                                        children: [
                                            P,
                                            O
                                        ]
                                    })
                                ]
                            }, s("div", i)),
                            S
                        ]
                    }, s("div", l)), N = s("button", {
                        type: "button",
                        class: "cbi-button cbi-button-apply",
                        onclick: ()=>V(!1),
                        children: _("Read MIB")
                    }), A = s("button", {
                        type: "button",
                        class: "cbi-button cbi-button-action",
                        onclick: ()=>V(!0),
                        children: _("Read MIB and VLAN tables")
                    }), I = (u = {
                        class: "onu-mib-panel",
                        children: [
                            (p = {
                                class: "mib-controls",
                                children: [
                                    (c = {
                                        class: "mib-action-group",
                                        children: [
                                            N,
                                            A,
                                            s("small", {
                                                class: "mib-action-hint",
                                                children: _("Collecting VLAN tables queries extended filter tables and takes longer.")
                                            })
                                        ]
                                    }, s("div", c)),
                                    k,
                                    j
                                ]
                            }, s("div", p)),
                            $
                        ]
                    }, s("div", u)), T = {
                        basic: z,
                        mib: I,
                        raw: C
                    }, R = new Map();
                    function D(e) {
                        for (let [t, r] of Object.entries(T))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
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
                                children: s("a", {
                                    href: `#tab-${e.id}`,
                                    onclick: (t)=>{
                                        t.preventDefault(), D(e.id);
                                    },
                                    children: e.label
                                })
                            }, s("li", t));
                            return R.set(e.id, r), r;
                        })
                    }, s("ul", f)), W = (b = {
                        children: [
                            s("div", {
                                class: "onu-details-header",
                                children: Z
                            }),
                            (g = {
                                class: "onu-details-dialog",
                                children: [
                                    s("style", {
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
				${t0}
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
                                    z,
                                    I,
                                    C
                                ]
                            }, s("div", g)),
                            (h = {
                                class: "right onu-details-footer",
                                children: s("button", {
                                    type: "button",
                                    class: "cbi-button",
                                    onclick: ()=>{
                                        y = !0, M && URL.revokeObjectURL(M), M = null, w = null, S.textContent = "", $.replaceChildren(), L.ui.hideModal();
                                    },
                                    children: _("Close")
                                })
                            }, s("div", h))
                        ]
                    }, s(a, b)), B = ()=>!y && W.isConnected && W.getClientRects().length > 0;
                    async function V(t) {
                        if (!v) {
                            v = !0, N.disabled = A.disabled = !0, j.style.display = "", j.title = "0%", j.firstElementChild.style.width = "0%", k.textContent = _("Reading MIB\u2026");
                            try {
                                let y = await tv(), v = y.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                if (v?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                if (!B()) return;
                                let z = await tW(v.onu_id, v.serial_number, t);
                                x = z.job;
                                let O = Date.now() + 140000;
                                for(; B();){
                                    let e = await tB(z.job, 0);
                                    if (!B()) return;
                                    if ("ready" === e.status) {
                                        var r, n, i, a, l, d, c, p, u, f, g, h, b, m;
                                        if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                        let t = new Uint8Array(e.bytes), y = 0;
                                        for(let r = 0; r < e.chunks; r++){
                                            let n = 0 === r ? e : await tB(z.job, r);
                                            if (!B()) return;
                                            if ("ready" !== n.status || n.chunk !== r || n.chunks !== e.chunks || n.bytes !== e.bytes || !n.data) throw Error(_("Invalid MIB snapshot chunk"));
                                            let i = atob(n.data);
                                            if (i.length > 32768 || y + i.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                            for(let e = 0; e < i.length; e++)t[y++] = i.charCodeAt(e);
                                            let a = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                            j.title = `${a}%`, j.firstElementChild.style.width = `${a}%`, k.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                        }
                                        if (y !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                        if (await q(), w = tI.parse(eJ(JSON.parse(new TextDecoder("utf-8", {
                                            fatal: !0
                                        }).decode(t)))).report, 1 !== w.schema_version || w.onu_id !== v.onu_id) throw Error(_("Unexpected MIB response"));
                                        j.style.display = "none", k.replaceChildren((r = w, g = {
                                            class: "mib-chips",
                                            children: [
                                                (i = {
                                                    class: "mib-chip mib-chip-primary",
                                                    children: [
                                                        "ONU ",
                                                        r.onu_id
                                                    ]
                                                }, s("span", i)),
                                                (a = {
                                                    class: `mib-chip ${r.uploaded_complete ? "mib-chip-success" : "mib-chip-warning"}`,
                                                    children: r.uploaded_complete ? _("Upload complete") : _("Upload incomplete")
                                                }, s("span", a)),
                                                (l = {
                                                    class: "mib-chip mib-chip-info",
                                                    children: [
                                                        _("Records"),
                                                        ": ",
                                                        r.received_records,
                                                        r.expected_records !== r.received_records ? ` / ${r.expected_records}` : ""
                                                    ]
                                                }, s("span", l)),
                                                (d = {
                                                    class: "mib-chip",
                                                    children: [
                                                        _("Decoded"),
                                                        ": ",
                                                        r.decoded_records
                                                    ]
                                                }, s("span", d)),
                                                r.partial_records > 0 ? (c = {
                                                    class: "mib-chip mib-chip-warning",
                                                    children: [
                                                        _("Partial"),
                                                        ": ",
                                                        r.partial_records
                                                    ]
                                                }, s("span", c)) : null,
                                                (p = {
                                                    class: "mib-chip mib-chip-neutral",
                                                    children: [
                                                        _("Basic"),
                                                        ": ",
                                                        r.basic_records
                                                    ]
                                                }, s("span", p)),
                                                (u = {
                                                    class: "mib-chip",
                                                    children: r.tables_collected ? _("VLAN tables collected") : _("VLAN tables not collected")
                                                }, s("span", u)),
                                                (f = {
                                                    class: "mib-chip mib-chip-subtle",
                                                    children: new Date().toLocaleTimeString()
                                                }, s("span", f))
                                            ]
                                        }, s("div", g))), $.replaceChildren(function(e) {
                                            var t, r, n, i, a, l;
                                            let d = e.classes.length ? e.classes[0].class_id : null, c = (t = {
                                                class: "mib-content"
                                            }, s("div", t)), p = (r = {
                                                type: "search",
                                                class: "cbi-input-text mib-search-input",
                                                placeholder: _("Search ME name or Class ID\u2026")
                                            }, s("input", r)), u = (n = {
                                                class: "mib-class-list"
                                            }, s("div", n)), f = new Map();
                                            function g(t) {
                                                var r, n;
                                                for (let [e, r] of (d = t, f))e === t ? r.classList.add("active") : r.classList.remove("active");
                                                let i = e.entities.filter((e)=>e.class_id === t);
                                                i.length ? c.replaceChildren(...i.map((r, n)=>{
                                                    var i, a, l, d, c, p, u, f, g, h, b, m, y, v, w, x, z, k, j;
                                                    return j = {
                                                        open: 0 === n,
                                                        class: "mib-entity-details",
                                                        children: [
                                                            (c = {
                                                                class: "mib-entity-summary",
                                                                children: [
                                                                    (l = {
                                                                        class: "mib-entity-title",
                                                                        children: [
                                                                            (i = {
                                                                                children: o(r.name)
                                                                            }, s("strong", i)),
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
                                                                            }, s("span", a))
                                                                        ]
                                                                    }, s("span", l)),
                                                                    (d = {
                                                                        class: "mib-entity-support",
                                                                        children: r.support
                                                                    }, s("span", d))
                                                                ]
                                                            }, s("summary", c)),
                                                            (k = {
                                                                class: "mib-entity-body",
                                                                children: [
                                                                    r.attributes.length ? (y = {
                                                                        class: "table mib-attributes-table",
                                                                        children: [
                                                                            (b = {
                                                                                children: (h = {
                                                                                    children: [
                                                                                        (p = {
                                                                                            style: "width:28%",
                                                                                            children: _("Attribute")
                                                                                        }, s("th", p)),
                                                                                        (u = {
                                                                                            style: "width:14%",
                                                                                            children: _("Type")
                                                                                        }, s("th", u)),
                                                                                        (f = {
                                                                                            children: _("Value")
                                                                                        }, s("th", f)),
                                                                                        (g = {
                                                                                            style: "width:18%",
                                                                                            children: _("Definition")
                                                                                        }, s("th", g))
                                                                                    ]
                                                                                }, s("tr", h))
                                                                            }, s("thead", b)),
                                                                            (m = {
                                                                                children: r.attributes.map((e)=>{
                                                                                    var t, r, n, i, a, l, d, c, p, u;
                                                                                    return u = {
                                                                                        children: [
                                                                                            (t = {
                                                                                                class: "mib-attr-name",
                                                                                                children: e.definition.name
                                                                                            }, s("td", t)),
                                                                                            (n = {
                                                                                                class: "mib-attr-kind",
                                                                                                children: (r = {
                                                                                                    children: e.definition.kind
                                                                                                }, s("code", r))
                                                                                            }, s("td", n)),
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
                                                                                                                    return o(e.value);
                                                                                                                case "octets":
                                                                                                                    return o(e.hex);
                                                                                                                case "table_length":
                                                                                                                    return o(e.bytes);
                                                                                                                default:
                                                                                                                    throw new eF("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                            }
                                                                                                        }(e.value)
                                                                                                    }, s("span", i)),
                                                                                                    e.observations?.length ? (d = {
                                                                                                        class: "mib-obs-details",
                                                                                                        children: [
                                                                                                            (a = {
                                                                                                                children: _("Raw data / observations")
                                                                                                            }, s("summary", a)),
                                                                                                            (l = {
                                                                                                                class: "mib-pre",
                                                                                                                children: t1(e.observations)
                                                                                                            }, s("pre", l))
                                                                                                        ]
                                                                                                    }, s("details", d)) : null
                                                                                                ]
                                                                                            }, s("td", c)),
                                                                                            (p = {
                                                                                                class: "mib-attr-ref",
                                                                                                children: t8(e.definition)
                                                                                            }, s("td", p))
                                                                                        ]
                                                                                    }, s("tr", u);
                                                                                })
                                                                            }, s("tbody", m))
                                                                        ]
                                                                    }, s("table", y)) : (v = {
                                                                        children: _("Basic display only; raw records are preserved.")
                                                                    }, s("p", v)),
                                                                    e.tables.filter((e)=>e.class_id === t && e.entity_id === r.entity_id).map((e)=>{
                                                                        var t, r, n, i, a, l, d, c, p, u, f, g, h, b, m, y;
                                                                        return y = {
                                                                            class: "mib-table-details",
                                                                            children: [
                                                                                (t = {
                                                                                    children: [
                                                                                        e.attribute.name,
                                                                                        " \xb7",
                                                                                        " ",
                                                                                        e.collected ? `${e.rows.length} ${_("rows")}` : o(e.error)
                                                                                    ]
                                                                                }, s("summary", t)),
                                                                                e.vlan_rules.length ? (h = {
                                                                                    class: "mib-table-overflow",
                                                                                    children: (g = {
                                                                                        class: "table",
                                                                                        children: [
                                                                                            (u = {
                                                                                                children: (p = {
                                                                                                    children: [
                                                                                                        (r = {
                                                                                                            children: _("Outer filter (priority / VID / TPID-DEI)")
                                                                                                        }, s("th", r)),
                                                                                                        (n = {
                                                                                                            children: _("Inner filter (priority / VID / TPID-DEI)")
                                                                                                        }, s("th", n)),
                                                                                                        (i = {
                                                                                                            children: _("EtherType code")
                                                                                                        }, s("th", i)),
                                                                                                        (a = {
                                                                                                            children: _("Remove tags")
                                                                                                        }, s("th", a)),
                                                                                                        (l = {
                                                                                                            children: _("Outer treatment (priority / VID / TPID-DEI)")
                                                                                                        }, s("th", l)),
                                                                                                        (d = {
                                                                                                            children: _("Inner treatment (priority / VID / TPID-DEI)")
                                                                                                        }, s("th", d)),
                                                                                                        (c = {
                                                                                                            children: _("Delete entry")
                                                                                                        }, s("th", c))
                                                                                                    ]
                                                                                                }, s("tr", p))
                                                                                            }, s("thead", u)),
                                                                                            (f = {
                                                                                                children: e.vlan_rules.map((e)=>{
                                                                                                    var t, r, n, i, a, l, d, c;
                                                                                                    return c = {
                                                                                                        children: [
                                                                                                            (t = {
                                                                                                                children: `${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`
                                                                                                            }, s("td", t)),
                                                                                                            (r = {
                                                                                                                children: `${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`
                                                                                                            }, s("td", r)),
                                                                                                            (n = {
                                                                                                                children: o(e.filter_ethertype)
                                                                                                            }, s("td", n)),
                                                                                                            (i = {
                                                                                                                children: o(e.tags_to_remove)
                                                                                                            }, s("td", i)),
                                                                                                            (a = {
                                                                                                                children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                            }, s("td", a)),
                                                                                                            (l = {
                                                                                                                children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                            }, s("td", l)),
                                                                                                            (d = {
                                                                                                                children: o(e.delete_entry)
                                                                                                            }, s("td", d))
                                                                                                        ]
                                                                                                    }, s("tr", c);
                                                                                                })
                                                                                            }, s("tbody", f))
                                                                                        ]
                                                                                    }, s("table", g))
                                                                                }, s("div", h)) : null,
                                                                                (b = {
                                                                                    style: "margin-top:6px",
                                                                                    children: [
                                                                                        _("G.988 encoded field values"),
                                                                                        ": ",
                                                                                        t8(e.attribute)
                                                                                    ]
                                                                                }, s("p", b)),
                                                                                (m = {
                                                                                    class: "mib-pre",
                                                                                    children: t1(e.vlan_rules.length ? e.vlan_rules : e.rows)
                                                                                }, s("pre", m))
                                                                            ]
                                                                        }, s("details", y);
                                                                    }),
                                                                    (z = {
                                                                        class: "mib-diag-details",
                                                                        children: [
                                                                            (w = {
                                                                                children: _("Records / diagnostics")
                                                                            }, s("summary", w)),
                                                                            (x = {
                                                                                class: "mib-pre",
                                                                                children: t1({
                                                                                    diagnostics: r.diagnostics,
                                                                                    records: e.records.filter((e)=>e.class_id === t && e.entity_id === r.entity_id)
                                                                                })
                                                                            }, s("pre", x))
                                                                        ]
                                                                    }, s("details", z))
                                                                ]
                                                            }, s("div", k))
                                                        ]
                                                    }, s("details", j);
                                                })) : c.replaceChildren((n = {
                                                    class: "mib-empty-content",
                                                    children: (r = {
                                                        children: _("No entities recorded for this ME class.")
                                                    }, s("p", r))
                                                }, s("div", n)));
                                            }
                                            function h() {
                                                var t;
                                                let r = p.value.trim().toLowerCase();
                                                f.clear();
                                                let n = e.classes.filter((e)=>`${e.class_id} ${e.name ?? ""}`.toLowerCase().includes(r));
                                                n.length ? u.replaceChildren(...n.map((e)=>{
                                                    var t, r, n, i;
                                                    let a = (i = {
                                                        type: "button",
                                                        class: `mib-class-btn${e.class_id === d ? " active" : ""}`,
                                                        onclick: ()=>g(e.class_id),
                                                        children: [
                                                            (t = {
                                                                class: "mib-class-id",
                                                                children: e.class_id
                                                            }, s("span", t)),
                                                            (r = {
                                                                class: "mib-class-name",
                                                                title: e.name ?? _("Unknown class"),
                                                                children: e.name ?? _("Unknown class")
                                                            }, s("span", r)),
                                                            (n = {
                                                                class: "mib-class-count",
                                                                children: e.entities
                                                            }, s("span", n))
                                                        ]
                                                    }, s("button", i));
                                                    return f.set(e.class_id, a), a;
                                                })) : u.replaceChildren((t = {
                                                    class: "mib-empty-list",
                                                    children: _("No matching ME classes")
                                                }, s("div", t)));
                                            }
                                            return p.addEventListener("input", h), h(), e.classes.length && g(e.classes[0].class_id), l = {
                                                class: "mib-browser",
                                                children: [
                                                    (a = {
                                                        class: "mib-sidebar",
                                                        children: [
                                                            (i = {
                                                                class: "mib-search-box",
                                                                children: p
                                                            }, s("div", i)),
                                                            u
                                                        ]
                                                    }, s("div", a)),
                                                    c
                                                ]
                                            }, s("div", l);
                                        }(w), (m = {
                                            class: "mib-upload-diagnostics",
                                            children: [
                                                (h = {
                                                    children: _("Upload diagnostics")
                                                }, s("summary", h)),
                                                (b = {
                                                    class: "mib-pre",
                                                    children: t1(w.diagnostics)
                                                }, s("pre", b))
                                            ]
                                        }, s("details", m))), n = w, S.textContent = t1({
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
                                        if (k.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == n ? "" : `: ${r}/${n}`}` : null == n ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${n}`, n && n > 0) {
                                            let e = Math.min(100, Math.round(r / n * 100));
                                            j.title = `${e}%`, j.firstElementChild.style.width = `${e}%`;
                                        }
                                    }
                                    if (Date.now() >= O) throw Error(_("MIB query timed out; retry."));
                                    await new Promise((e)=>setTimeout(e, 1000));
                                }
                            } catch (e) {
                                B() && (j.style.display = "none", k.replaceChildren(s("span", {
                                    class: "mib-error-text",
                                    children: [
                                        String(e),
                                        w ? ` \xb7 ${_("Previous snapshot retained")}` : ""
                                    ]
                                })));
                            } finally{
                                await q(), v = !1, N.disabled = A.disabled = !1;
                            }
                        }
                    }
                    async function q() {
                        if (!x) return;
                        let e = x;
                        x = null;
                        try {
                            await tV(e);
                        } catch (e) {
                            console.warn("Failed to release MIB snapshot", e);
                        }
                    }
                    D(m), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, W, "modal-wide");
                }(t, "mib");
            } catch (e) {
                m.replaceChildren(s("div", {
                    class: "alert-message danger",
                    children: String(e)
                }));
            }
        }, P = async (e)=>{
            if (!k) {
                for (let e of (k = !0, $))e.disabled = !0;
                B(x);
                try {
                    var t;
                    let r = await tk(e, y.value), n = e.startsWith("management_") ? _("Management operation started; status is refreshed below.") : _("Started: %s").replace("%s", "operation_ids" in r ? r.operation_ids.join(", ") : "\u2014");
                    m.replaceChildren((t = {
                        class: "alert-message info",
                        children: n
                    }, s("div", t))), B(await tw());
                } catch (e) {
                    m.replaceChildren(s("div", {
                        class: "alert-message danger",
                        children: String(e)
                    }));
                } finally{
                    k = !1, B(x);
                }
            }
        }, C = s("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: ()=>P("plan"),
            children: _("Preview differences (read-only)")
        }), N = s("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            onclick: ()=>P("apply"),
            children: _("Apply differences")
        }), A = s("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            title: _("Read current device parameters and auto-verify matching settings without writing to device"),
            onclick: ()=>P("reconcile"),
            children: _("Reconcile (read-only)")
        }), I = s("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            title: _("Clear backoff delays and retry safe difference synchronization"),
            onclick: ()=>P("retry"),
            children: _("Self-heal / retry")
        });
        $.push(C, N, A, I);
        let T = s("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: ()=>P("management_plan"),
            children: _("Check management differences (read-only)")
        }), R = s("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            onclick: ()=>P("management_apply"),
            children: _("Apply management configuration")
        });
        $.push(T, R);
        let D = (r = {
            class: "cbi-section",
            children: [
                s("h3", {
                    children: _("Isolated TR069 management network")
                }),
                w,
                s("p", {
                    style: "margin-top:10px",
                    children: [
                        T,
                        " ",
                        R
                    ]
                })
            ]
        }, s("div", r)), Z = (p = {
            class: "cbi-section",
            children: [
                s("h3", {
                    children: _("Manual synchronization")
                }),
                (i = {
                    style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px",
                    children: [
                        (n = {
                            style: "display:flex;align-items:center;gap:8px",
                            children: [
                                s("span", {
                                    children: [
                                        _("Target"),
                                        ":"
                                    ]
                                }),
                                y
                            ]
                        }, s("label", n)),
                        s("div", {
                            style: "display:flex;gap:8px;flex-wrap:wrap",
                            children: [
                                C,
                                N,
                                A,
                                I
                            ]
                        })
                    ]
                }, s("div", i))
            ]
        }, s("div", p)), W = (u = {
            class: "cbi-map fttr-sync",
            children: [
                s("style", {
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
                s("h2", {
                    children: _("FTTR synchronization")
                }),
                h,
                b,
                D,
                Z,
                m,
                v
            ]
        }, s("div", u));
        function B(e) {
            var t, r, n, i, d, p, u, f, g, m, j, $, A, I, D, W, B, V, q, U, F, J, K, G, H, Q, X, Y, ee, et, er;
            x = e, h.replaceChildren((p = {
                "data-provisioning-summary": "true",
                style: "display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%",
                children: [
                    (t = {
                        children: [
                            s("strong", {
                                style: "margin-right:.4em",
                                children: [
                                    _("Provisioning"),
                                    ":"
                                ]
                            }),
                            s("span", {
                                class: `fttr-badge ${e.enabled ? "fttr-badge-success" : "fttr-badge-neutral"}`,
                                children: e.enabled ? _("Enabled") : _("Disabled")
                            })
                        ]
                    }, s("span", t)),
                    (r = {
                        children: [
                            s("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Mode"),
                                    ":"
                                ]
                            }),
                            s("span", {
                                class: "fttr-badge fttr-badge-info",
                                children: o(e.mode)
                            })
                        ]
                    }, s("span", r)),
                    (n = {
                        children: [
                            s("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Revision"),
                                    ":"
                                ]
                            }),
                            s("code", {
                                children: o(e.revision)
                            })
                        ]
                    }, s("span", n)),
                    (e.triggers ?? []).length ? (i = {
                        children: [
                            s("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Triggers"),
                                    ":"
                                ]
                            }),
                            s("code", {
                                children: (e.triggers ?? []).join(", ")
                            })
                        ]
                    }, s("span", i)) : null,
                    e.interval_minutes ? (d = {
                        children: [
                            s("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Interval (minutes)"),
                                    ":"
                                ]
                            }),
                            s("span", {
                                children: e.interval_minutes
                            })
                        ]
                    }, s("span", d)) : null
                ]
            }, s("div", p)));
            let en = [
                e.error,
                z.error ? _("Committed configuration is invalid: %s").format(z.error) : z.revision && z.revision !== e.revision ? _("Committed configuration has not been loaded. Check Configuration diagnostics; an active operation may have prevented reload.") : ""
            ].filter(Boolean);
            b.hidden = !en.length, b.textContent = en.join(" \u2014 ");
            let ei = [
                "all",
                ...Array.from(new Set((e.devices ?? []).map((e)=>e.group).filter(Boolean))).map((e)=>`group:${e}`),
                ...(e.devices ?? []).map((e)=>e.device)
            ];
            if (Array.from(y.options).map((e)=>e.value).join("\n") !== ei.join("\n")) {
                let t = y.value;
                y.replaceChildren(...ei.map((t)=>s("option", {
                        value: t,
                        children: "all" === t ? _("All devices") : t.startsWith("group:") ? (e.devices ?? []).find((e)=>`group:${e.group}` === t)?.group_name || t : (e.devices ?? []).find((e)=>e.device === t)?.name || t
                    }))), y.value = ei.includes(t) ? t : "all";
            }
            Z.hidden = "manual" !== e.mode || !L.hasViewPermission();
            let ea = (e.devices ?? []).filter((e)=>"all" === y.value || e.device === y.value || `group:${e.group}` === y.value).some((e)=>![
                    "completed",
                    "not_started",
                    "interrupted"
                ].includes(e.provisioning.state ?? "not_started"));
            C.disabled = k || ea || !!z.error || !!z.revision && z.revision !== e.revision || !(e.devices ?? []).length, N.disabled = C.disabled || !e.enabled;
            let es = e.management_network;
            T.disabled = k || !!es?.inflight || !!z.error || !L.hasViewPermission(), R.disabled = T.disabled;
            let eo = es.desired ?? es.applied, el = es?.plan ?? [], ed = !!es?.applied_version && !!es?.desired_version && es?.applied_version === es?.desired_version;
            w.replaceChildren((er = {
                children: [
                    ($ = {
                        style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:10px",
                        children: [
                            (u = {
                                children: [
                                    s("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            _("State"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    t9(es?.state)
                                ]
                            }, s("span", u)),
                            (f = {
                                children: [
                                    s("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            _("Desired version"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    s("code", {
                                        children: o(es?.desired_version)
                                    })
                                ]
                            }, s("span", f)),
                            (g = {
                                children: [
                                    s("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            _("Applied version"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    s("code", {
                                        children: o(es?.applied_version)
                                    })
                                ]
                            }, s("span", g)),
                            es?.desired_version || es?.applied_version ? (m = {
                                children: ed ? s("span", {
                                    class: "fttr-badge fttr-badge-success",
                                    children: _("Synchronized")
                                }) : s("span", {
                                    class: "fttr-badge fttr-badge-warning",
                                    children: _("Pending apply")
                                })
                            }, s("span", m)) : null,
                            es?.next_retry_at ? (j = {
                                children: [
                                    s("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            _("Next retry"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    l(es.next_retry_at)
                                ]
                            }, s("span", j)) : null
                        ]
                    }, s("div", $)),
                    (K = {
                        class: "fttr-grid-3",
                        children: [
                            (D = {
                                class: "fttr-card",
                                children: [
                                    (A = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Management interface")
                                            }),
                                            s("strong", {
                                                children: "\u2014"
                                            })
                                        ]
                                    }, s("div", A)),
                                    (I = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Management VLAN")
                                            }),
                                            s("span", {
                                                children: [
                                                    "VLAN ",
                                                    o(eo?.vlan.join(", ")),
                                                    " (Prio ",
                                                    o(eo?.priority),
                                                    ")"
                                                ]
                                            })
                                        ]
                                    }, s("div", I))
                                ]
                            }, s("div", D)),
                            (q = {
                                class: "fttr-card",
                                children: [
                                    (W = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Service IP / Netmask")
                                            }),
                                            s("code", {
                                                children: o(eo?.address)
                                            })
                                        ]
                                    }, s("div", W)),
                                    (V = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("DHCP service")
                                            }),
                                            (B = {
                                                children: null === eo ? "\u2014" : eo.dhcp_enabled ? s("span", {
                                                    class: "fttr-badge fttr-badge-success",
                                                    children: _("Enabled")
                                                }) : s("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    children: _("Disabled")
                                                })
                                            }, s("span", B))
                                        ]
                                    }, s("div", V))
                                ]
                            }, s("div", q)),
                            (J = {
                                class: "fttr-card",
                                children: [
                                    (U = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("ACS URL")
                                            }),
                                            s("code", {
                                                style: "font-size:80%",
                                                children: o(eo?.acs_url)
                                            })
                                        ]
                                    }, s("div", U)),
                                    (F = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Mode")
                                            }),
                                            s("span", {
                                                children: o(eo?.mode)
                                            })
                                        ]
                                    }, s("div", F))
                                ]
                            }, s("div", J))
                        ]
                    }, s("div", K)),
                    el.length ? (ee = {
                        style: "margin-top:10px",
                        children: [
                            s("h5", {
                                style: "margin-bottom:4px;font-size:90%",
                                children: _("Pending configuration changes")
                            }),
                            (Y = {
                                class: "table-wrapper",
                                children: (X = {
                                    class: "table",
                                    style: "font-size:85%",
                                    children: [
                                        (H = {
                                            children: (G = {
                                                children: [
                                                    s("th", {
                                                        children: _("Operation")
                                                    }),
                                                    s("th", {
                                                        children: _("Configuration item")
                                                    }),
                                                    s("th", {
                                                        children: _("Reason / desired changes")
                                                    })
                                                ]
                                            }, s("tr", G))
                                        }, s("thead", H)),
                                        (Q = {
                                            children: el.map((e)=>{
                                                var t, r, n, i;
                                                return i = {
                                                    children: [
                                                        (t = {
                                                            children: s("span", {
                                                                class: "fttr-badge fttr-badge-info",
                                                                children: e.operation
                                                            })
                                                        }, s("td", t)),
                                                        (r = {
                                                            children: s("code", {
                                                                children: e.key
                                                            })
                                                        }, s("td", r)),
                                                        (n = {
                                                            children: s("code", {
                                                                children: (e.value ?? []).join(", ")
                                                            })
                                                        }, s("td", n))
                                                    ]
                                                }, s("tr", i);
                                            })
                                        }, s("tbody", Q))
                                    ]
                                }, s("table", X))
                            }, s("div", Y))
                        ]
                    }, s("div", ee)) : null,
                    es?.error ? s("div", {
                        class: "alert-message warning",
                        style: "margin-top:8px",
                        children: es.error
                    }) : null,
                    s("p", {
                        style: "font-size:85%;color:#888;margin-top:8px;margin-bottom:8px",
                        children: _("Saving in manual mode does not create interfaces, change firewall rules or configure child devices. Apply explicitly to authorize the current management configuration.")
                    }),
                    (et = {
                        style: "margin-top:6px;margin-bottom:10px",
                        children: [
                            s("summary", {
                                style: "cursor:pointer;user-select:none;font-size:85%;color:#666",
                                children: _("Advanced diagnostics / Raw configuration (JSON)")
                            }),
                            s("pre", {
                                style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px",
                                children: JSON.stringify({
                                    desired: es?.desired,
                                    applied: es?.applied,
                                    plan: es?.plan ?? []
                                }, null, 2)
                            })
                        ]
                    }, s("details", et))
                ]
            }, s("div", er)));
            let ec = new Set(Array.from(v.querySelectorAll("details[open]")).map((e)=>e.getAttribute("data-device")));
            v.replaceChildren(...(e.devices ?? []).map((t)=>{
                var r, n, i, d, p, u, f, g, h, b, m, y, v, w, x, z, j, $, C, N, A, I, T, D, Z, W, B, V, q, U, F, J, K, G, H, Q, X, Y, ee, et, er, en, ei, ea, es, eo, el, ed, ep, eu, ef, eg, eh, e_, eb, em, ey, ev, ew, ex, ez;
                let ek, ej, e$;
                return r = ec.has(t.device), n = ()=>P("management_apply"), i = R.disabled, d = e.enabled, p = k, ej = ![
                    "completed",
                    "not_started",
                    "interrupted"
                ].includes((ek = t.provisioning).state), e$ = [
                    ...Object.entries(ek.wan_lifecycle ?? {}).map((e)=>{
                        let [t, r] = e;
                        return {
                            ...r,
                            id: `WAN ${t}`,
                            kind: "wan_activation",
                            service_type: "wan"
                        };
                    }),
                    ...Object.entries(ek.wifi_lifecycle ?? {}).map((e)=>{
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
                        (y = {
                            class: "fttr-card-header",
                            children: [
                                (b = {
                                    class: "fttr-card-title-group",
                                    children: [
                                        (f = {
                                            style: "margin:0",
                                            children: [
                                                t.name || t.optical_sn,
                                                " ",
                                                s("small", {
                                                    style: "font-size:75%;font-weight:normal;color:#888",
                                                    children: [
                                                        "(",
                                                        t.adapter,
                                                        ")"
                                                    ]
                                                })
                                            ]
                                        }, s("h3", f)),
                                        (h = {
                                            class: "fttr-card-meta-tags",
                                            children: [
                                                ek.backend ? s("span", {
                                                    class: "fttr-badge fttr-badge-info",
                                                    title: ek.backend.reason,
                                                    children: [
                                                        _("Provisioning method"),
                                                        ": ",
                                                        ek.backend.configured,
                                                        " \u2192 ",
                                                        ek.backend.effective
                                                    ]
                                                }) : null,
                                                t.group_name ? s("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    title: _("Group"),
                                                    children: t.group_name
                                                }) : null,
                                                t.template_name ? s("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    title: _("Template"),
                                                    children: t.template_name
                                                }) : null,
                                                (g = {
                                                    style: "font-size:85%;color:#666",
                                                    children: [
                                                        "OMCI: ",
                                                        t9(t.omci_management?.state),
                                                        t.omci_management?.reason ? s("span", {
                                                            style: "margin-left:4px;color:#888",
                                                            title: t.omci_management.reason,
                                                            children: [
                                                                "(",
                                                                t.omci_management.reason,
                                                                ")"
                                                            ]
                                                        }) : null
                                                    ]
                                                }, s("span", g))
                                            ]
                                        }, s("div", h))
                                    ]
                                }, s("div", b)),
                                L.hasViewPermission() ? (m = {
                                    class: "fttr-card-actions",
                                    children: [
                                        s("button", {
                                            type: "button",
                                            class: "cbi-button cbi-button-action",
                                            onclick: ()=>M(t),
                                            children: _("View OMCI / MIB details")
                                        }),
                                        s("button", {
                                            type: "button",
                                            class: "cbi-button cbi-button-positive",
                                            disabled: p || ej || !d,
                                            title: d ? ej ? _("This device already has an active synchronization operation") : _("Start configuration delivery for this device") : _("Provisioning is disabled"),
                                            onclick: ()=>O(t),
                                            children: _("Sync now")
                                        }),
                                        s("button", {
                                            type: "button",
                                            class: "cbi-button cbi-button-positive",
                                            disabled: p,
                                            title: _("Clear old tasks and managed-object records after a device factory reset. The next preview or apply reads the device again."),
                                            onclick: ()=>{
                                                let e = t.name || t.optical_sn;
                                                window.confirm(_("Are you sure you want to reset the synchronization state for %s?").replace("%s", e)) && S(t);
                                            },
                                            children: _("Reset synchronization state")
                                        })
                                    ]
                                }, s("div", m)) : null
                            ]
                        }, s("div", y)),
                        (T = {
                            class: "fttr-device-status-strip",
                            children: [
                                (z = {
                                    class: "fttr-status-pill-group",
                                    children: [
                                        (v = {
                                            children: [
                                                s("span", {
                                                    class: "fttr-pill-label",
                                                    children: "CWMP:"
                                                }),
                                                " ",
                                                t9(t.management?.state, t.management?.last_inform ? `${_("Last Inform: %s").replace("%s", l(t.management.last_inform))}${null != t.management.age_seconds ? ` (${c(t.management.age_seconds)})` : ""}` : void 0)
                                            ]
                                        }, s("span", v)),
                                        (w = {
                                            children: [
                                                s("span", {
                                                    class: "fttr-pill-label",
                                                    children: [
                                                        _("Synchronization"),
                                                        ":"
                                                    ]
                                                }),
                                                " ",
                                                t9(ek.state)
                                            ]
                                        }, s("span", w)),
                                        (x = {
                                            children: [
                                                s("span", {
                                                    class: "fttr-pill-label",
                                                    children: "Wi-Fi:"
                                                }),
                                                " ",
                                                t9(t.wifi_sync)
                                            ]
                                        }, s("span", x))
                                    ]
                                }, s("div", z)),
                                (I = {
                                    class: "fttr-status-op-info",
                                    children: [
                                        (j = {
                                            children: [
                                                _("Operation"),
                                                ": ",
                                                s("strong", {
                                                    children: o(ek.operation_id)
                                                }),
                                                " (",
                                                o(ek.mode),
                                                ")"
                                            ]
                                        }, s("span", j)),
                                        s("span", {
                                            children: "\xb7"
                                        }),
                                        s("span", {
                                            children: [
                                                _("Started"),
                                                ": ",
                                                l(ek.started_at)
                                            ]
                                        }),
                                        s("span", {
                                            children: "\xb7"
                                        }),
                                        ($ = {
                                            children: [
                                                _("Revision"),
                                                ": ",
                                                s("code", {
                                                    children: o(ek.revision)
                                                })
                                            ]
                                        }, s("span", $)),
                                        ek.attempts ? (N = {
                                            children: [
                                                s("span", {
                                                    children: "\xb7"
                                                }),
                                                (C = {
                                                    style: "color:#e67e22",
                                                    children: [
                                                        _("Attempts"),
                                                        ": ",
                                                        s("strong", {
                                                            children: ek.attempts
                                                        })
                                                    ]
                                                }, s("span", C))
                                            ]
                                        }, s(a, N)) : null,
                                        ek.next_retry_at && ek.next_retry_at > Math.floor(Date.now() / 1000) ? (A = {
                                            children: [
                                                s("span", {
                                                    children: "\xb7"
                                                }),
                                                s("span", {
                                                    style: "color:#d35400",
                                                    children: _("Next self-healing retry in %d seconds").replace("%d", String(ek.next_retry_at - Math.floor(Date.now() / 1000)))
                                                })
                                            ]
                                        }, s(a, A)) : null
                                    ]
                                }, s("div", I))
                            ]
                        }, s("div", T)),
                        ek.reconcile_reason ? s("div", {
                            class: "alert-message info",
                            style: "margin:8px 0;font-size:85%",
                            children: ek.reconcile_reason
                        }) : null,
                        re(ek.items ?? []),
                        ek.cwmp_contract ? (K = {
                            style: "margin-top:1.2em",
                            children: [
                                s("h4", {
                                    style: "margin-bottom:0.5em",
                                    children: _("CWMP contract")
                                }),
                                (J = {
                                    class: "fttr-card",
                                    children: [
                                        (Z = {
                                            style: "display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                                            children: [
                                                (D = {
                                                    children: [
                                                        s("span", {
                                                            children: o(ek.cwmp_contract.requested)
                                                        }),
                                                        " \u2192",
                                                        " ",
                                                        s("code", {
                                                            children: o(ek.cwmp_contract.contract)
                                                        })
                                                    ]
                                                }, s("div", D)),
                                                s("div", {
                                                    children: t9(ek.cwmp_contract.state)
                                                })
                                            ]
                                        }, s("div", Z)),
                                        (U = {
                                            style: "display:flex;flex-wrap:wrap;gap:12px;margin-bottom:6px;font-size:90%",
                                            children: [
                                                (W = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: "WAN:"
                                                        }),
                                                        " ",
                                                        t9(ek.cwmp_contract.capabilities?.wan)
                                                    ]
                                                }, s("span", W)),
                                                (B = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: "WLAN:"
                                                        }),
                                                        " ",
                                                        t9(ek.cwmp_contract.capabilities?.wlan)
                                                    ]
                                                }, s("span", B)),
                                                (V = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                _("Bindings"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        t9(ek.cwmp_contract.capabilities?.binding)
                                                    ]
                                                }, s("span", V)),
                                                (q = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                _("Cache"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        s("span", {
                                                            class: "fttr-badge fttr-badge-info",
                                                            style: "font-size:80%",
                                                            children: ek.cwmp_contract.cache_hit ? _("Matched") : _("Fresh discovery")
                                                        })
                                                    ]
                                                }, s("span", q))
                                            ]
                                        }, s("div", U)),
                                        ek.cwmp_contract.schema ? (F = {
                                            style: "font-size:85%;color:#666",
                                            children: [
                                                _("Schema"),
                                                ": ",
                                                s("code", {
                                                    children: ek.cwmp_contract.schema
                                                })
                                            ]
                                        }, s("div", F)) : null,
                                        ek.cwmp_contract.reason ? s("div", {
                                            style: "font-size:85%;margin-top:4px;color:#e67e22",
                                            children: ek.cwmp_contract.reason
                                        }) : null
                                    ]
                                }, s("div", J))
                            ]
                        }, s("div", K)) : null,
                        ek.backend?.effective === "command" ? null : (u = t.acs_bootstrap) ? (e_ = {
                            style: "margin-top:1.2em",
                            children: [
                                (H = {
                                    style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:0.5em",
                                    children: [
                                        s("h4", {
                                            style: "margin:0",
                                            children: _("ACS bootstrap")
                                        }),
                                        (G = {
                                            style: "display:flex;align-items:center;gap:6px",
                                            children: [
                                                t9(u.state),
                                                u.inflight ? s("span", {
                                                    class: "fttr-badge fttr-badge-info",
                                                    children: _("Command in progress")
                                                }) : null
                                            ]
                                        }, s("div", G))
                                    ]
                                }, s("div", H)),
                                (ef = {
                                    class: "fttr-card",
                                    children: [
                                        (ed = {
                                            class: "fttr-grid-3",
                                            children: [
                                                (ee = {
                                                    children: [
                                                        (Q = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Method")
                                                                }),
                                                                s("code", {
                                                                    children: o(u.method)
                                                                })
                                                            ]
                                                        }, s("div", Q)),
                                                        (X = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Attempts")
                                                                }),
                                                                s("span", {
                                                                    children: o(u.attempts)
                                                                })
                                                            ]
                                                        }, s("div", X)),
                                                        (Y = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Identity source")
                                                                }),
                                                                s("span", {
                                                                    children: o(u.binding_source)
                                                                })
                                                            ]
                                                        }, s("div", Y))
                                                    ]
                                                }, s("div", ee)),
                                                (ei = {
                                                    children: [
                                                        (et = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Management VLAN")
                                                                }),
                                                                s("span", {
                                                                    children: u.desired?.vlan !== void 0 ? `VLAN ${u.desired.vlan} (Prio ${u.desired.priority ?? 0})` : "\u2014"
                                                                })
                                                            ]
                                                        }, s("div", et)),
                                                        (er = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("ACS URL")
                                                                }),
                                                                s("code", {
                                                                    style: "font-size:80%",
                                                                    children: o(u.desired?.acs_url)
                                                                })
                                                            ]
                                                        }, s("div", er)),
                                                        (en = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Local ACS listener")
                                                                }),
                                                                s("code", {
                                                                    style: "font-size:80%",
                                                                    children: u.listener?.listen ? `${u.listener.listen}${u.listener.path || ""}` : "\u2014"
                                                                })
                                                            ]
                                                        }, s("div", en))
                                                    ]
                                                }, s("div", ei)),
                                                (el = {
                                                    children: [
                                                        (ea = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Last telemetry")
                                                                }),
                                                                s("span", {
                                                                    style: "font-size:85%",
                                                                    children: l(u.mqtt_last_seen)
                                                                })
                                                            ]
                                                        }, s("div", ea)),
                                                        (es = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Last Inform")
                                                                }),
                                                                s("span", {
                                                                    style: "font-size:85%",
                                                                    children: l(u.last_inform)
                                                                })
                                                            ]
                                                        }, s("div", es)),
                                                        (eo = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Settings verified")
                                                                }),
                                                                s("span", {
                                                                    style: "font-size:85%",
                                                                    children: l(u.settings_verified_at)
                                                                })
                                                            ]
                                                        }, s("div", eo))
                                                    ]
                                                }, s("div", el))
                                            ]
                                        }, s("div", ed)),
                                        u.mqtt_target ? (ep = {
                                            style: "font-size:85%;color:#666;margin-top:6px;border-top:1px dashed rgba(127,140,141,0.15);padding-top:6px",
                                            children: [
                                                s("span", {
                                                    style: "color:#888",
                                                    children: [
                                                        _("MQTT target"),
                                                        ":"
                                                    ]
                                                }),
                                                " ",
                                                s("code", {
                                                    children: u.mqtt_target
                                                })
                                            ]
                                        }, s("div", ep)) : null,
                                        u.reason ? s("div", {
                                            style: "font-size:85%;color:#d35400;margin-top:6px;overflow-wrap:anywhere",
                                            children: u.reason
                                        }) : null,
                                        "awaiting_apply" === u.state ? (eu = {
                                            style: "margin-top:10px;padding:8px;background:rgba(243,156,18,0.1);border-radius:4px;border:1px solid rgba(243,156,18,0.3)",
                                            children: [
                                                s("button", {
                                                    type: "button",
                                                    class: "cbi-button cbi-button-positive",
                                                    disabled: i,
                                                    onclick: n,
                                                    children: _("Authorize and apply management settings")
                                                }),
                                                " ",
                                                s("span", {
                                                    style: "font-size:85%;color:#666",
                                                    children: _("Required after management drift or service restart; verifies the child ACS settings before business synchronization.")
                                                })
                                            ]
                                        }, s("div", eu)) : null
                                    ]
                                }, s("div", ef)),
                                [
                                    u.last_error,
                                    u.link_identity_error,
                                    u.persistence_error,
                                    u.listener?.error,
                                    u.endpoint_notice
                                ].filter(Boolean).map((e)=>s("div", {
                                        class: "alert-message warning",
                                        style: "overflow-wrap:anywhere;margin-top:8px",
                                        children: e
                                    })),
                                u.manual_steps?.length ? (eh = {
                                    style: "margin-top:8px",
                                    children: [
                                        s("summary", {
                                            style: "cursor:pointer;user-select:none;font-weight:600",
                                            children: _("Management setup / reachability guidance")
                                        }),
                                        (eg = {
                                            style: "padding:6px 0",
                                            children: u.manual_steps.map((e, t)=>s("p", {
                                                    style: "margin:4px 0;font-size:90%",
                                                    children: [
                                                        t + 1,
                                                        ". ",
                                                        e
                                                    ]
                                                }))
                                        }, s("div", eg))
                                    ]
                                }, s("details", eh)) : null
                            ]
                        }, s("div", e_)) : null,
                        e$.length ? (eb = {
                            style: "margin-top:1.2em",
                            children: [
                                s("h4", {
                                    style: "margin-bottom:0.5em",
                                    children: _("WAN / WLAN lifecycle results")
                                }),
                                re(e$)
                            ]
                        }, s("div", eb)) : null,
                        (ex = {
                            "data-device": t.device,
                            open: r,
                            style: "margin-top:1em",
                            children: [
                                s("summary", {
                                    style: "cursor:pointer;user-select:none;font-weight:600",
                                    children: _("Managed objects and lifecycle intent")
                                }),
                                (ew = {
                                    style: "padding:8px 0",
                                    children: [
                                        (ev = {
                                            style: "display:flex;gap:16px;flex-wrap:wrap;font-size:90%;margin-bottom:6px",
                                            children: [
                                                (em = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                _("Wi-Fi cleanup policy"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        o(ek.wifi_cleanup)
                                                    ]
                                                }, s("span", em)),
                                                (ey = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                _("Wi-Fi stage"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        o(ek.wifi_stage)
                                                    ]
                                                }, s("span", ey))
                                            ]
                                        }, s("div", ev)),
                                        s("pre", {
                                            style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:85%;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px;max-height:240px;overflow-y:auto",
                                            children: JSON.stringify({
                                                wan_objects: ek.wan_objects ?? {},
                                                wifi_objects: ek.wifi_objects ?? {}
                                            }, null, 2)
                                        })
                                    ]
                                }, s("div", ew))
                            ]
                        }, s("details", ex))
                    ]
                }, s("div", ez);
            }));
        }
        return y.addEventListener("change", ()=>B(x)), B(f), L.Poll.add(async ()=>{
            if (W.isConnected && !j) {
                j = !0;
                try {
                    let [e, t] = await Promise.all([
                        tw(),
                        tx()
                    ]);
                    z = t, B(e);
                } catch (e) {
                    b.hidden = !1, b.textContent = _("Status refresh failed: %s").format(String(e));
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