'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, n, r, i;
const a = Symbol.for("jsx.fragment");
function s(e, t) {
    let { children: n, ...r } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, i = function e(t) {
        let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let r of t)null != r && "boolean" != typeof r && (Array.isArray(r) ? e(r, n) : n.push(r instanceof Node ? r : String(r)));
        return n;
    }(null == n ? [] : Array.isArray(n) ? n : [
        n
    ]);
    if (e === a) {
        let e = document.createDocumentFragment();
        return e.append(...i), e;
    }
    if ("function" == typeof e) {
        let t = Reflect.apply(e, void 0, [
            {
                ...r,
                children: i
            }
        ]);
        if (!(t instanceof Node)) throw TypeError("JSX components must return a DOM Node");
        return t;
    }
    if ("string" != typeof e) throw TypeError("JSX element types must be tag names or component functions");
    let s = {}, o = {
        ...r
    };
    for (let [e, t] of Object.entries(o))e.startsWith("on") && "function" == typeof t ? (s[e] = t, delete o[e]) : "boolean" == typeof t && (t ? o[e] = e : delete o[e]);
    let l = Object.keys(o).length > 0 ? i.length > 1 ? E(e, o, i) : E(e, o, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
    for (let [e, t] of Object.entries(s)){
        let n = e.slice(2).toLowerCase();
        l.addEventListener(n, t);
    }
    return l;
}
function o(e, t, n) {
    function r(n, r) {
        if (n._zod || Object.defineProperty(n, "_zod", {
            value: {
                def: r,
                constr: s,
                traits: new Set()
            },
            enumerable: !1
        }), n._zod.traits.has(e)) return;
        n._zod.traits.add(e), t(n, r);
        let i = s.prototype, a = Object.keys(i);
        for(let e = 0; e < a.length; e++){
            let t = a[e];
            t in n || (n[t] = i[t].bind(n));
        }
    }
    let i = n?.Parent ?? Object;
    class a extends i {
    }
    function s(e) {
        var t;
        let i = n?.Parent ? new a() : this;
        for (let n of (r(i, e), (t = i._zod).deferred ?? (t.deferred = []), i._zod.deferred))n();
        return i;
    }
    return Object.defineProperty(a, "name", {
        value: e
    }), Object.defineProperty(s, "init", {
        value: r
    }), Object.defineProperty(s, Symbol.hasInstance, {
        value: (t)=>!!n?.Parent && t instanceof n.Parent || t?._zod?.traits?.has(e)
    }), Object.defineProperty(s, "name", {
        value: e
    }), s;
}
Object.freeze({
    status: "aborted"
}), Symbol("zod_brand");
class l extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const d = {};
function c(e) {
    return e && Object.assign(d, e), d;
}
function p(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function u(e) {
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
function f(e) {
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const h = Symbol("evaluating");
function g(e, t, n) {
    let r;
    Object.defineProperty(e, t, {
        get () {
            if (r !== h) return void 0 === r && (r = h, r = n()), r;
        },
        set (n) {
            Object.defineProperty(e, t, {
                value: n
            });
        },
        configurable: !0
    });
}
function m(e, t, n) {
    Object.defineProperty(e, t, {
        value: n,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
}
function y(...e) {
    let t = {};
    for (let n of e)Object.assign(t, Object.getOwnPropertyDescriptors(n));
    return Object.defineProperties({}, t);
}
const v = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function b(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function w(e) {
    if (!1 === b(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let n = t.prototype;
    return !1 !== b(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
}
const z = new Set([
    "string",
    "number",
    "symbol"
]);
function x(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function k(e, t, n) {
    let r = new e._zod.constr(t ?? e._zod.def);
    return (!t || n?.parent) && (r._zod.parent = e), r;
}
function j(e) {
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
function S(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let n = t; n < e.issues.length; n++)if (e.issues[n]?.continue !== !0) return !0;
    return !1;
}
function P(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function O(e) {
    return "string" == typeof e ? e : e?.message;
}
function A(e, t, n) {
    let r = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (r.message = O(e.inst?._zod.def?.error?.(e)) ?? O(t?.error?.(e)) ?? O(n.customError?.(e)) ?? O(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
const $ = (e, t)=>{
    e.name = "$ZodError", Object.defineProperty(e, "_zod", {
        value: e._zod,
        enumerable: !1
    }), Object.defineProperty(e, "issues", {
        value: t,
        enumerable: !1
    }), e.message = JSON.stringify(t, p, 2), Object.defineProperty(e, "toString", {
        value: ()=>e.message,
        enumerable: !1
    });
}, T = o("$ZodError", $), M = o("$ZodError", $, {
    Parent: Error
}), N = (t = M, (e, n, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: n,
        issues: []
    }, a);
    if (s instanceof Promise) throw new l();
    if (s.issues.length) {
        let e = new (i?.Err ?? t)(s.issues.map((e)=>A(e, a, c())));
        throw v(e, i?.callee), e;
    }
    return s.value;
}), Z = (n = M, async (e, t, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (i?.Err ?? n)(s.issues.map((e)=>A(e, a, c())));
        throw v(e, i?.callee), e;
    }
    return s.value;
}), C = (r = M, (e, t, n)=>{
    let i = n ? {
        ...n,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (a instanceof Promise) throw new l();
    return a.issues.length ? {
        success: !1,
        error: new (r ?? T)(a.issues.map((e)=>A(e, i, c())))
    } : {
        success: !0,
        data: a.value
    };
}), R = (i = M, async (e, t, n)=>{
    let r = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, a = e._zod.run({
        value: t,
        issues: []
    }, r);
    return a instanceof Promise && (a = await a), a.issues.length ? {
        success: !1,
        error: new i(a.issues.map((e)=>A(e, r, c())))
    } : {
        success: !0,
        data: a.value
    };
}), W = /^-?\d+(?:\.\d+)?$/, I = /^(?:true|false)$/i, D = /^null$/i, V = {
    major: 4,
    minor: 3,
    patch: 6
}, q = o("$ZodType", (e, t)=>{
    var n;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = V;
    let r = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && r.unshift(e), r))for (let n of t._zod.onattach)n(e);
    if (0 === r.length) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, n)=>{
            let r, i = S(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, s = a._zod.check(e);
                if (s instanceof Promise && n?.async === !1) throw new l();
                if (r || s instanceof Promise) r = (r ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (i || (i = S(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = S(e, t));
                }
            }
            return r ? r.then(()=>e) : e;
        }, n = (n, i, a)=>{
            if (S(n)) return n.aborted = !0, n;
            let s = t(i, r, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new l();
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
                return t instanceof Promise ? t.then((e)=>n(e, i, a)) : n(t, i, a);
            }
            let s = e._zod.parse(i, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new l();
                return s.then((e)=>t(e, r, a));
            }
            return t(s, r, a);
        };
    }
    g(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = C(e, t);
                    return n.success ? {
                        value: n.data
                    } : {
                        issues: n.error?.issues
                    };
                } catch (n) {
                    return R(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), F = o("$ZodString", (e, t)=>{
    var n;
    let r;
    q.init(e, t), e._zod.pattern = [
        ...e?._zod.bag?.patterns ?? []
    ].pop() ?? (r = (n = e._zod.bag) ? `[\\s\\S]{${n?.minimum ?? 0},${n?.maximum ?? ""}}` : "[\\s\\S]*", RegExp(`^${r}$`)), e._zod.parse = (n, r)=>{
        if (t.coerce) try {
            n.value = String(n.value);
        } catch (e) {}
        return "string" == typeof n.value || n.issues.push({
            expected: "string",
            code: "invalid_type",
            input: n.value,
            inst: e
        }), n;
    };
}), U = o("$ZodNumber", (e, t)=>{
    q.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? W, e._zod.parse = (n, r)=>{
        if (t.coerce) try {
            n.value = Number(n.value);
        } catch (e) {}
        let i = n.value;
        if ("number" == typeof i && !Number.isNaN(i) && Number.isFinite(i)) return n;
        let a = "number" == typeof i ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : "Infinity" : void 0;
        return n.issues.push({
            expected: "number",
            code: "invalid_type",
            input: i,
            inst: e,
            ...a ? {
                received: a
            } : {}
        }), n;
    };
}), B = o("$ZodBoolean", (e, t)=>{
    q.init(e, t), e._zod.pattern = I, e._zod.parse = (n, r)=>{
        if (t.coerce) try {
            n.value = !!n.value;
        } catch (e) {}
        let i = n.value;
        return "boolean" == typeof i || n.issues.push({
            expected: "boolean",
            code: "invalid_type",
            input: i,
            inst: e
        }), n;
    };
}), J = o("$ZodNull", (e, t)=>{
    q.init(e, t), e._zod.pattern = D, e._zod.values = new Set([
        null
    ]), e._zod.parse = (t, n)=>{
        let r = t.value;
        return null === r || t.issues.push({
            expected: "null",
            code: "invalid_type",
            input: r,
            inst: e
        }), t;
    };
}), K = o("$ZodNever", (e, t)=>{
    q.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function X(e, t, n) {
    e.issues.length && t.issues.push(...P(n, e.issues)), t.value[n] = e.value;
}
const G = o("$ZodArray", (e, t)=>{
    q.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!Array.isArray(i)) return n.issues.push({
            expected: "array",
            code: "invalid_type",
            input: i,
            inst: e
        }), n;
        n.value = Array(i.length);
        let a = [];
        for(let e = 0; e < i.length; e++){
            let s = i[e], o = t.element._zod.run({
                value: s,
                issues: []
            }, r);
            o instanceof Promise ? a.push(o.then((t)=>X(t, n, e))) : X(o, n, e);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
});
function H(e, t, n, r, i) {
    if (e.issues.length) {
        if (i && !(n in r)) return;
        t.issues.push(...P(n, e.issues));
    }
    void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const Q = o("$ZodObject", (e, t)=>{
    let n;
    q.init(e, t);
    let r = Object.getOwnPropertyDescriptor(t, "shape");
    if (!r?.get) {
        let e = t.shape;
        Object.defineProperty(t, "shape", {
            get: ()=>{
                let n = {
                    ...e
                };
                return Object.defineProperty(t, "shape", {
                    value: n
                }), n;
            }
        });
    }
    let i = u(()=>(function(e) {
            var t;
            let n = Object.keys(e.shape);
            for (let t of n)if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${t}": expected a Zod schema`);
            let r = Object.keys(t = e.shape).filter((e)=>"optional" === t[e]._zod.optin && "optional" === t[e]._zod.optout);
            return {
                ...e,
                keys: n,
                keySet: new Set(n),
                numKeys: n.length,
                optionalKeys: new Set(r)
            };
        })(t));
    g(e._zod, "propValues", ()=>{
        let e = t.shape, n = {};
        for(let t in e){
            let r = e[t]._zod;
            if (r.values) for (let e of (n[t] ?? (n[t] = new Set()), r.values))n[t].add(e);
        }
        return n;
    });
    let a = t.catchall;
    e._zod.parse = (t, r)=>{
        n ?? (n = i.value);
        let s = t.value;
        if (!b(s)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: s,
            inst: e
        }), t;
        t.value = {};
        let o = [], l = n.shape;
        for (let e of n.keys){
            let n = l[e], i = "optional" === n._zod.optout, a = n._zod.run({
                value: s[e],
                issues: []
            }, r);
            a instanceof Promise ? o.push(a.then((n)=>H(n, t, e, s, i))) : H(a, t, e, s, i);
        }
        return a ? function(e, t, n, r, i, a) {
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
                }, r);
                a instanceof Promise ? e.push(a.then((e)=>H(e, n, i, t, c))) : H(a, n, i, t, c);
            }
            return (s.length && n.issues.push({
                code: "unrecognized_keys",
                keys: s,
                input: t,
                inst: a
            }), e.length) ? Promise.all(e).then(()=>n) : n;
        }(o, s, t, r, i.value, e) : o.length ? Promise.all(o).then(()=>t) : t;
    };
});
function Y(e, t, n, r) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let i = e.filter((e)=>!S(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>A(e, r, c())))
    }), t);
}
const ee = o("$ZodUnion", (e, t)=>{
    q.init(e, t), g(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), g(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), g(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), g(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>f(e.source)).join("|")})$`);
        }
    });
    let n = 1 === t.options.length, r = t.options[0]._zod.run;
    e._zod.parse = (i, a)=>{
        if (n) return r(i, a);
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
        return s ? Promise.all(o).then((t)=>Y(t, i, e, a)) : Y(o, i, e, a);
    };
}), et = o("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, ee.init(e, t);
    let n = e._zod.parse;
    g(e._zod, "propValues", ()=>{
        let e = {};
        for (let n of t.options){
            let r = n._zod.propValues;
            if (!r || 0 === Object.keys(r).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
            for (let [t, n] of Object.entries(r))for (let r of (e[t] || (e[t] = new Set()), n))e[t].add(r);
        }
        return e;
    });
    let r = u(()=>{
        let e = t.options, n = new Map();
        for (let r of e){
            let e = r._zod.propValues?.[t.discriminator];
            if (!e || 0 === e.size) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
            for (let t of e){
                if (n.has(t)) throw Error(`Duplicate discriminator value "${String(t)}"`);
                n.set(t, r);
            }
        }
        return n;
    });
    e._zod.parse = (i, a)=>{
        let s = i.value;
        if (!b(s)) return i.issues.push({
            code: "invalid_type",
            expected: "object",
            input: s,
            inst: e
        }), i;
        let o = r.value.get(s?.[t.discriminator]);
        return o ? o._zod.run(i, a) : t.unionFallback ? n(i, a) : (i.issues.push({
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
}), en = o("$ZodRecord", (e, t)=>{
    q.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!w(i)) return n.issues.push({
            expected: "record",
            code: "invalid_type",
            input: i,
            inst: e
        }), n;
        let a = [], s = t.keyType._zod.values;
        if (s) {
            let o;
            n.value = {};
            let l = new Set();
            for (let e of s)if ("string" == typeof e || "number" == typeof e || "symbol" == typeof e) {
                l.add("number" == typeof e ? e.toString() : e);
                let s = t.valueType._zod.run({
                    value: i[e],
                    issues: []
                }, r);
                s instanceof Promise ? a.push(s.then((t)=>{
                    t.issues.length && n.issues.push(...P(e, t.issues)), n.value[e] = t.value;
                })) : (s.issues.length && n.issues.push(...P(e, s.issues)), n.value[e] = s.value);
            }
            for(let e in i)l.has(e) || (o = o ?? []).push(e);
            o && o.length > 0 && n.issues.push({
                code: "unrecognized_keys",
                input: i,
                inst: e,
                keys: o
            });
        } else for (let s of (n.value = {}, Reflect.ownKeys(i))){
            if ("__proto__" === s) continue;
            let o = t.keyType._zod.run({
                value: s,
                issues: []
            }, r);
            if (o instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof s && W.test(s) && o.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(s),
                    issues: []
                }, r);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (o = e);
            }
            if (o.issues.length) {
                "loose" === t.mode ? n.value[s] = i[s] : n.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: o.issues.map((e)=>A(e, r, c())),
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
            }, r);
            l instanceof Promise ? a.push(l.then((e)=>{
                e.issues.length && n.issues.push(...P(s, e.issues)), n.value[o.value] = e.value;
            })) : (l.issues.length && n.issues.push(...P(s, l.issues)), n.value[o.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
}), er = o("$ZodEnum", (e, t)=>{
    var n;
    let r;
    q.init(e, t);
    let i = (r = Object.values(n = t.entries).filter((e)=>"number" == typeof e), Object.entries(n).filter(([e, t])=>-1 === r.indexOf(+e)).map(([e, t])=>t)), a = new Set(i);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${i.filter((e)=>z.has(typeof e)).map((e)=>"string" == typeof e ? x(e) : e.toString()).join("|")})$`), e._zod.parse = (t, n)=>{
        let r = t.value;
        return a.has(r) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: r,
            inst: e
        }), t;
    };
}), ei = o("$ZodLiteral", (e, t)=>{
    if (q.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? x(e) : e ? x(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i)=>{
        let a = r.value;
        return n.has(a) || r.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
            inst: e
        }), r;
    };
});
function ea(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const es = o("$ZodOptional", (e, t)=>{
    q.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let r = t.innerType._zod.run(e, n);
            return r instanceof Promise ? r.then((t)=>ea(t, e.value)) : ea(r, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, n);
    };
}), eo = o("$ZodNullable", (e, t)=>{
    q.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)}|null)$`) : void 0;
    }), g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), el = o("$ZodCatch", (e, t)=>{
    q.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, n)=>{
        if ("backward" === n.direction) return t.innerType._zod.run(e, n);
        let r = t.innerType._zod.run(e, n);
        return r instanceof Promise ? r.then((r)=>(e.value = r.value, r.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: r.issues.map((e)=>A(e, n, c()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = r.value, r.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: r.issues.map((e)=>A(e, n, c()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ed = o("$ZodLazy", (e, t)=>{
    q.init(e, t), g(e._zod, "innerType", ()=>t.getter()), g(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), g(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), g(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), g(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n)=>e._zod.innerType._zod.run(t, n);
});
Symbol("ZodOutput"), Symbol("ZodInput");
(e = globalThis).__zod_globalRegistry ?? (e.__zod_globalRegistry = new class e {
    constructor(){
        this._map = new WeakMap(), this._idmap = new Map();
    }
    add(e, ...t) {
        let n = t[0];
        return this._map.set(e, n), n && "object" == typeof n && "id" in n && this._idmap.set(n.id, e), this;
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
            let n = {
                ...this.get(t) ?? {}
            };
            delete n.id;
            let r = {
                ...n,
                ...this._map.get(e)
            };
            return Object.keys(r).length ? r : void 0;
        }
        return this._map.get(e);
    }
    has(e) {
        return this._map.has(e);
    }
}());
const ec = o("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    q.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>N(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>C(e, t, n), e.parseAsync = async (t, n)=>Z(e, t, n, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, n)=>R(e, t, n), e.check = (...n)=>e.clone({
            ...t,
            checks: [
                ...t.checks ?? [],
                ...n.map((e)=>"function" == typeof e ? {
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
        }), e.with = e.check, e.clone = (t, n)=>k(e, t, n), e.brand = ()=>e, e.register = (t, n)=>(t.add(e, n), e), e.apply = (t)=>t(e);
}), ep = o("ZodMiniString", (e, t)=>{
    F.init(e, t), ec.init(e, t);
});
function eu(e) {
    return new ep({
        type: "string",
        ...j(e)
    });
}
const ef = o("ZodMiniNumber", (e, t)=>{
    U.init(e, t), ec.init(e, t);
});
function eh(e) {
    return new ef({
        type: "number",
        checks: [],
        ...j(e)
    });
}
const eg = o("ZodMiniBoolean", (e, t)=>{
    B.init(e, t), ec.init(e, t);
});
function em(e) {
    return new eg({
        type: "boolean",
        ...j(e)
    });
}
const ey = o("ZodMiniNull", (e, t)=>{
    J.init(e, t), ec.init(e, t);
}), e_ = o("ZodMiniNever", (e, t)=>{
    K.init(e, t), ec.init(e, t);
});
function ev(e) {
    return new e_({
        type: "never",
        ...j(e)
    });
}
const eb = o("ZodMiniArray", (e, t)=>{
    G.init(e, t), ec.init(e, t);
});
function ew(e, t) {
    return new eb({
        type: "array",
        element: e,
        ...j(t)
    });
}
const ez = o("ZodMiniObject", (e, t)=>{
    Q.init(e, t), ec.init(e, t), g(e, "shape", ()=>t.shape);
});
function ex(e, t) {
    return new ez({
        type: "object",
        shape: e ?? {},
        ...j(t)
    });
}
const ek = o("ZodMiniUnion", (e, t)=>{
    ee.init(e, t), ec.init(e, t);
});
function ej(e, t) {
    return new ek({
        type: "union",
        options: e,
        ...j(t)
    });
}
const eS = o("ZodMiniDiscriminatedUnion", (e, t)=>{
    et.init(e, t), ec.init(e, t);
});
function eP(e, t, n) {
    return new eS({
        type: "union",
        options: t,
        discriminator: e,
        ...j(n)
    });
}
const eO = o("ZodMiniRecord", (e, t)=>{
    en.init(e, t), ec.init(e, t);
});
function eA(e, t, n) {
    return new eO({
        type: "record",
        keyType: e,
        valueType: t,
        ...j(n)
    });
}
const e$ = o("ZodMiniEnum", (e, t)=>{
    er.init(e, t), ec.init(e, t), e.options = Object.values(t.entries);
});
function eT(e, t) {
    return new e$({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...j(t)
    });
}
const eE = o("ZodMiniLiteral", (e, t)=>{
    ei.init(e, t), ec.init(e, t);
});
function eM(e, t) {
    return new eE({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...j(t)
    });
}
const eN = o("ZodMiniOptional", (e, t)=>{
    es.init(e, t), ec.init(e, t);
});
function eZ(e) {
    return new eN({
        type: "optional",
        innerType: e
    });
}
const eC = o("ZodMiniNullable", (e, t)=>{
    eo.init(e, t), ec.init(e, t);
});
function eL(e) {
    return new eC({
        type: "nullable",
        innerType: e
    });
}
const eR = o("ZodMiniCatch", (e, t)=>{
    el.init(e, t), ec.init(e, t);
}), eW = o("ZodMiniLazy", (e, t)=>{
    ed.init(e, t), ec.init(e, t);
});
function eI() {
    let e = new eW({
        type: "lazy",
        getter: ()=>ej([
                eu(),
                eh(),
                em(),
                new ey({
                    type: "null",
                    ...j(void 0)
                }),
                ew(e),
                eA(eu(), e)
            ])
    });
    return e;
}
let eD = ex({
    error: ej([
        eu(),
        ex({
            code: eu(),
            message: eu()
        })
    ])
});
class eV extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eq(e) {
    let t = eD.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eV("rpc", e) : new eV(e.code, e.message);
    }
    return e;
}
ex({
    status: eM("pending"),
    job: eu()
}), eP("status", [
    ex({
        status: eM("pending")
    }),
    ex({
        status: eM("ready"),
        chunk: eh(),
        chunks: eh(),
        bytes: eh(),
        data: eu()
    })
]);
let eF = eu(), eU = eh(), eB = em(), eJ = eZ(eF), eK = eZ(eU), eX = eZ(eB);
const eG = eT([
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
]), eH = eT([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), eQ = ex({
    id: eF,
    name: eZ(eL(eF)),
    kind: eT([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eF,
    state: eF,
    reason: eJ,
    revision: eJ,
    current_revision: eX,
    management_fresh: eX,
    operation_id: eK,
    task_id: eZ(eL(eU)),
    updated_at: eK,
    changes: eZ(ew(ex({
        name: eF,
        desired: eF
    })))
});
let eY = ex({
    state: eF,
    reason: eJ,
    task_id: eZ(eL(eU)),
    instance: eK
});
const e0 = ex({
    cwmp_id: eF,
    state: eT([
        "online",
        "waiting_inform",
        "offline_or_stale"
    ]),
    optical_online: eB,
    last_inform: eL(eU),
    age_seconds: eL(eU)
});
let e1 = ex({
    state: eT([
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
    method: eJ,
    reason: eJ,
    mqtt_target: eL(eF),
    binding_source: eJ,
    link_identity_error: eL(eF),
    mqtt_last_seen: eL(eU),
    cwmp_id: eJ,
    desired_version: eJ,
    generation: eK,
    inflight: eX,
    attempts: eK,
    next_retry_at: eK,
    updated_at: eK,
    settings_verified_at: eL(eU),
    last_inform: eL(eU),
    last_error: eZ(eL(eF)),
    persistence_error: eZ(eL(eF)),
    desired: eZ(eL(ex({
        vlan: eU,
        vlans: ew(eU),
        priority: eU,
        acs_url: eF
    }))),
    listener: eZ(ex({
        enabled: eB,
        listen: eF,
        path: eF,
        error: eL(eF)
    })),
    endpoint_notice: eJ,
    manual_steps: eZ(ew(eF))
});
const e8 = eP("state", [
    e1,
    function(e, t) {
        if (!w(t)) throw Error("Invalid input to extend: expected a plain object");
        let n = e._zod.def.checks;
        if (n && n.length > 0) {
            let n = e._zod.def.shape;
            for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(n, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let r = y(e._zod.def, {
            get shape () {
                let n = {
                    ...e._zod.def.shape,
                    ...t
                };
                return m(this, "shape", n), n;
            }
        });
        return k(e, r);
    }(function(e) {
        var t = void 0;
        let n = e._zod.def.checks;
        if (n && n.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let r = y(e._zod.def, {
            get shape () {
                let n = e._zod.def.shape, r = {
                    ...n
                };
                if (t) for(let e in t){
                    if (!(e in n)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (r[e] = eN ? new eN({
                        type: "optional",
                        innerType: n[e]
                    }) : n[e]);
                }
                else for(let e in n)r[e] = eN ? new eN({
                    type: "optional",
                    innerType: n[e]
                }) : n[e];
                return m(this, "shape", r), r;
            },
            checks: []
        });
        return k(e, r);
    }(e1), {
        state: eT([
            "pending",
            "unavailable"
        ]),
        reason: eF
    })
]), e2 = ex({
    state: eG,
    operation_id: eK,
    device: eJ,
    optical_sn: eJ,
    cwmp_id: eJ,
    revision: eJ,
    mode: eZ(eT([
        "apply",
        "plan"
    ])),
    started_at: eK,
    current_revision: eX,
    management_fresh: eX,
    reason: eJ,
    error: eJ,
    attempts: eK,
    next_retry_at: eK,
    reconcile_reason: eJ,
    items: ew(eQ),
    cwmp_contract: eZ(ex({
        state: eF,
        requested: eF,
        contract: eL(eF),
        reason: eF,
        cache_hit: eB,
        schema: eF,
        capabilities: eL(ex({
            wan: eF,
            wlan: eF,
            binding: eF
        }))
    })),
    wan_objects: eZ(eA(eF, eI())),
    wan_lifecycle: eZ(eA(eF, eY)),
    wan_stage: eZ(eT([
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
    wifi_objects: eZ(ex({
        owned: ew(eU),
        pending: eL(eF),
        pending_instance: eL(eU)
    })),
    wifi_lifecycle: eZ(eA(eF, eY)),
    wifi_stage: eZ(eT([
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
    wifi_cleanup: eZ(eT([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e5 = ex({
    enabled: eB,
    mode: eT([
        "auto",
        "manual"
    ]),
    vlan: ew(eU),
    priority: eU,
    address: eF,
    acs_url: eF,
    port: eU,
    path: eF,
    dhcp_enabled: eB
}), e6 = ex({
    state: eT([
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
    error: eL(eF),
    inflight: eB,
    ready: eB,
    desired_version: eL(eF),
    applied_version: eL(eF),
    next_retry_at: eU,
    attempts: eU,
    desired: eL(e5),
    applied: eL(e5),
    previous: eL(e5),
    plan: ew(ex({
        operation: eF,
        key: eF,
        value: ew(eF)
    }))
});
const e4 = ex({
    device: eF,
    name: eL(eF),
    group: eL(eF),
    group_name: eL(eF),
    template: eL(eF),
    template_name: eL(eF),
    optical_sn: eF,
    adapter: eF,
    omci_management: ex({
        state: eF,
        reason: eJ
    }),
    management: eL(e0),
    acs_bootstrap: e8,
    provisioning: e2,
    services: ew(eQ),
    ssids: ew(eQ),
    wifi_sync: eH
}), e3 = ex({
    enabled: eB,
    mode: eT([
        "auto",
        "manual"
    ]),
    method: eM("diff"),
    revision: eF,
    triggers: ew(eF),
    interval_minutes: new ef({
        type: "number",
        coerce: !0,
        checks: [],
        ...j(void 0)
    }),
    error: eL(eF),
    devices: ew(e4),
    management_network: e6,
    omci_management: eI(),
    groups: ew(ex({
        id: eF,
        name: eL(eF),
        template: eF
    })),
    pending_devices: ew(eF)
}), e7 = ej([
    ex({
        valid: eM(!0),
        revision: eF,
        devices: eU,
        error: eZ(ev())
    }),
    ex({
        error: eF,
        valid: eZ(ev()),
        revision: eZ(ev()),
        devices: eZ(ev())
    })
]);
let e9 = eu(), te = eh(), tt = eL(te), tn = eA(e9, ex({
    source: e9,
    unit: e9,
    reason: eL(e9),
    raw: eL(e9),
    age_seconds: tt
}));
const tr = ex({
    phase: eT([
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
    generation: te,
    error: eL(e9)
}), ti = eT([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let ta = ex({
    model: e9,
    wavelength_tx_nm: te,
    wavelength_rx_nm: te,
    phy_rate_downlink_gbps: te,
    phy_rate_uplink_gbps: te,
    tx_power_dbm: tt,
    laser_bias_current_ma: tt,
    temperature_celsius: tt,
    vcc_voltage: tt,
    cdr_locked: eL(em()),
    measurements: tn
}), ts = ex({
    equipment_id: eL(e9),
    hardware_version: eL(e9),
    software_images: ew(e9),
    omcc_version: tt,
    errors: ew(e9)
});
const to = ex({
    onu_id: te,
    vendor: e9,
    model: e9,
    serial_number: e9,
    state: ti,
    business_status: tr,
    management: eL(e0),
    provisioning: eL(e2),
    services: ew(eQ),
    ssids: ew(eQ),
    wifi_sync: eH,
    acs_bootstrap: eZ(e8),
    identity: eL(ts),
    identity_age_seconds: tt,
    identity_current: em(),
    fiber_distance_m: tt,
    ranging_delay_rtd_ns: tt,
    equalization_delay_bits: new eR({
        type: "catch",
        innerType: tt,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tt,
    optical_tx_power_dbm: tt,
    firmware_version: e9,
    hardware_version: e9,
    uptime_seconds: tt,
    data_path: ex({
        interface: e9,
        gem_ports: eL(ew(te)),
        vlan_id: tt,
        tx_bytes: tt,
        rx_bytes: tt,
        current_tx_kbps: tt,
        current_rx_kbps: tt,
        measurements: tn
    }),
    wifi_mesh: ex({
        channel_2g: tt,
        channel_5g: tt,
        bandwidth_5g: eL(e9),
        tx_power_pct: tt,
        measurements: tn
    }),
    connected_clients: eL(ew(ex({
        mac: e9,
        ip: e9,
        band: e9,
        rssi_dbm: tt,
        rx_rate_mbps: tt,
        tx_rate_mbps: tt
    }))),
    measurements: tn
});
let tl = ex({
    port: te,
    interface: e9,
    carrier: em(),
    status: e9,
    onu_id: eZ(te),
    onu_sn: eZ(e9),
    link_state: e9
});
ex({
    fpga_status: e9,
    provisioning: eL(e3),
    optical_transceiver: ta,
    switch_ports: ew(tl),
    sub_gateways: ew(to),
    telemetry_gateways: ew(ex({
        id: e9,
        last_seen_sec_ago: te,
        last_payload_bytes: te
    }))
}), eA(e9, ex({
    carrier: eZ(em()),
    mac: eZ(e9),
    link: eZ(ex({
        speed: eZ(te),
        duplex: eZ(e9),
        autoneg: eZ(em())
    })),
    stats: eZ(eA(e9, te))
})), L.rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: !0
});
let td = L.rpc.declare({
    object: "luci.fttr",
    method: "get_sync",
    reject: !0
}), tc = L.rpc.declare({
    object: "luci.fttr",
    method: "config_check",
    reject: !0
}), tp = (L.rpc.declare({
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
const tu = async ()=>e3.parse(eq(await td())), tf = async ()=>e7.parse(await tc());
let th = ej([
    ex({
        operation_ids: ew(eh()),
        revision: eu()
    }),
    ex({
        started: eM(!0),
        mode: eT([
            "apply",
            "plan"
        ])
    }),
    ex({
        reset: eM(!0),
        device: eu()
    }),
    ex({
        operation_ids: ew(eh()),
        mode: eT([
            "apply",
            "plan"
        ]),
        reconcile: eZ(em()),
        retry: eZ(em())
    })
]);
const tg = async (e, t)=>th.parse(eq(await tp(e, t)));
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
}), ex({
    source: eT([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: eu(),
    size: eh(),
    sha256: eu(),
    data: eZ(eu()),
    factory: ex({
        detected: em(),
        device: eu(),
        has_data: em(),
        sha256: eu(),
        data: eu()
    }),
    firmware: ex({
        exists: em(),
        path: eu(),
        size: eh(),
        sha256: eu(),
        data: eu()
    }),
    error: eZ(eu())
}), ex({
    success: em(),
    path: eu(),
    size: eh(),
    sha256: eu(),
    error: eZ(eu())
}), ex({
    success: em(),
    output: eZ(eu()),
    error: eZ(eu())
});
let tm = {
    ready: {
        label: "\u5C31\u7EEA",
        type: "success"
    },
    verified: {
        label: "\u5DF2\u6821\u9A8C",
        type: "success"
    },
    online: {
        label: "\u5728\u7EBF",
        type: "success"
    },
    completed: {
        label: "\u5DF2\u5B8C\u6210",
        type: "success"
    },
    applied: {
        label: "\u5DF2\u5E94\u7528",
        type: "success"
    },
    waiting_inform: {
        label: "\u7B49\u5F85 Inform",
        type: "warning"
    },
    pending: {
        label: "\u5F85\u540C\u6B65",
        type: "warning"
    },
    awaiting_apply: {
        label: "\u5F85\u5E94\u7528\u6388\u6743",
        type: "warning"
    },
    syncing: {
        label: "\u540C\u6B65\u4E2D",
        type: "info"
    },
    discovering: {
        label: "\u63A2\u6D4B\u4E2D",
        type: "info"
    },
    recovering: {
        label: "\u6838\u5BF9\u6062\u590D\u4E2D",
        type: "info"
    },
    waiting_management: {
        label: "\u7B49\u5F85\u7BA1\u7406\u8FDE\u63A5",
        type: "warning"
    },
    waiting_task: {
        label: "\u7B49\u5F85\u4EFB\u52A1\u5B8C\u6210",
        type: "info"
    },
    reconcile_required: {
        label: "\u5F85\u6838\u5BF9\u5DEE\u5F02",
        type: "warning"
    },
    not_started: {
        label: "\u672A\u542F\u52A8",
        type: "neutral"
    },
    disabled: {
        label: "\u5DF2\u7981\u7528",
        type: "neutral"
    },
    enabled: {
        label: "\u5DF2\u542F\u7528",
        type: "success"
    },
    interrupted: {
        label: "\u5DF2\u4E2D\u65AD",
        type: "danger"
    },
    failed: {
        label: "\u5DF2\u5931\u8D25",
        type: "danger"
    },
    stale: {
        label: "\u5DF2\u5931\u6548",
        type: "warning"
    },
    error: {
        label: "\u5F02\u5E38",
        type: "danger"
    },
    deleted: {
        label: "\u5DF2\u5220\u9664",
        type: "neutral"
    }
}, ty = {
    waiting_inform: "Waiting Inform",
    waiting_management: "Waiting Management",
    waiting_task: "Waiting Task",
    recovering: "Recovering",
    reconcile_required: "Reconcile Required",
    not_started: "Not Started",
    awaiting_apply: "Awaiting Apply",
    ready: "Ready",
    verified: "Verified",
    online: "Online",
    completed: "Completed",
    applied: "Applied",
    syncing: "Syncing",
    discovering: "Discovering",
    disabled: "Disabled",
    enabled: "Enabled",
    interrupted: "Interrupted",
    failed: "Failed",
    stale: "Stale",
    error: "Error",
    deleted: "Deleted",
    pending: "Pending"
};
function t_(e) {
    return _(e) || e;
}
let tv = (e)=>null == e || "" === e ? "\u2014" : String(e), tb = (e)=>e ? new Date(1000 * e).toLocaleString() : "\u2014";
function tw(e, t) {
    if (!e) return s("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: "\u2014"
    });
    let n = /zh/i.test(document.documentElement.getAttribute("lang") || window.L?.env?.lang || navigator.language || ""), r = tm[e], i = n ? r?.label || e : ty[e] || e, a = r?.type || "neutral";
    return s("span", {
        class: `fttr-badge fttr-badge-${a}`,
        title: t || e,
        children: i
    });
}
function tz(e) {
    var t, n, r, i, a, o;
    return o = {
        class: "table-wrapper",
        children: (a = {
            class: "table",
            children: [
                (n = {
                    children: (t = {
                        children: [
                            s("th", {
                                children: t_("Configuration item")
                            }),
                            s("th", {
                                children: t_("Type")
                            }),
                            s("th", {
                                children: t_("State")
                            }),
                            s("th", {
                                children: t_("Evidence freshness")
                            }),
                            s("th", {
                                children: t_("Last update / task")
                            }),
                            s("th", {
                                children: t_("Reason / desired changes")
                            })
                        ]
                    }, s("tr", t))
                }, s("thead", n)),
                (i = {
                    children: e.length ? e.map((e)=>{
                        var t, n, r, i, a, o, l, d, c, p;
                        return p = {
                            children: [
                                (r = {
                                    children: s("strong", {
                                        children: tv(e.name || e.id)
                                    })
                                }, s("td", r)),
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
                                                    return "port_binding" === t ? t_("Binding") : tv(e || t);
                                            }
                                        }(e.service_type ?? "", e.kind)
                                    })
                                }, s("td", i)),
                                s("td", {
                                    children: tw(e.state)
                                }),
                                (o = {
                                    children: (t = e.current_revision, n = e.management_fresh, a = {
                                        style: "display:flex;flex-direction:column;gap:3px;align-items:flex-start",
                                        children: [
                                            !0 === t ? s("span", {
                                                class: "fttr-badge fttr-badge-info",
                                                style: "font-size:78%",
                                                children: t_("Current configuration")
                                            }) : !1 === t ? s("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                style: "font-size:78%",
                                                children: t_("Previous configuration")
                                            }) : s("span", {
                                                children: "\u2014"
                                            }),
                                            !0 === n ? s("span", {
                                                class: "fttr-badge fttr-badge-success",
                                                style: "font-size:78%",
                                                children: t_("Management fresh")
                                            }) : !1 === n ? s("span", {
                                                class: "fttr-badge fttr-badge-warning",
                                                style: "font-size:78%",
                                                children: t_("Management stale")
                                            }) : null
                                        ]
                                    }, s("div", a))
                                }, s("td", o)),
                                (l = {
                                    children: [
                                        s("div", {
                                            children: tb(e.updated_at)
                                        }),
                                        void 0 !== e.task_id && null !== e.task_id ? s("span", {
                                            class: "fttr-badge fttr-badge-neutral",
                                            style: "font-size:75%;margin-top:2px",
                                            children: [
                                                t_("Task"),
                                                " #",
                                                e.task_id
                                            ]
                                        }) : null
                                    ]
                                }, s("td", l)),
                                (c = {
                                    children: [
                                        e.reason ? s("div", {
                                            style: "margin-bottom:3px;color:#555;overflow-wrap:anywhere",
                                            children: e.reason
                                        }) : null,
                                        (e.changes ?? []).length ? (d = {
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
                                        }, s("div", d)) : !e.reason && "\u2014"
                                    ]
                                }, s("td", c))
                            ]
                        }, s("tr", p);
                    }) : (r = {
                        children: s("td", {
                            colSpan: 6,
                            style: "text-align:center;color:#888;padding:1em",
                            children: t_("No desired items configured.")
                        })
                    }, s("tr", r))
                }, s("tbody", i))
            ]
        }, s("table", a))
    }, s("div", o);
}
let main = L.view.extend({
    load: ()=>Promise.all([
            tu(),
            tf()
        ]),
    render (e) {
        var t, n, r, i, o, l;
        let [d, c] = e, p = s("div", {}), u = s("p", {
            class: "alert-message warning",
            hidden: !0,
            "aria-live": "polite"
        }), f = s("div", {
            class: "fttr-sync-result",
            "aria-live": "polite",
            style: "margin:10px 0"
        }), h = (t = {
            class: "cbi-input-select",
            children: [
                s("option", {
                    value: "all",
                    children: t_("All devices")
                }),
                (d.devices ?? []).map((e)=>s("option", {
                        value: e.device,
                        children: e.name || e.device
                    }))
            ]
        }, s("select", t)), g = s("div", {}), m = s("div", {}), y = d, v = c, b = !1, w = !1, z = [], x = async (e)=>{
            if (!b) {
                b = !0, Z(y);
                try {
                    var t;
                    await tg("reset_state", e.device), f.replaceChildren((t = {
                        class: "alert-message info",
                        children: t_("Synchronization state reset for %s. Preview differences to read the current device state.").replace("%s", e.name || e.optical_sn)
                    }, s("div", t))), Z(await tu());
                } catch (e) {
                    f.replaceChildren(s("div", {
                        class: "alert-message danger",
                        children: String(e)
                    }));
                } finally{
                    b = !1, Z(y);
                }
            }
        }, k = async (e)=>{
            if (!b) {
                for (let e of (b = !0, z))e.disabled = !0;
                Z(y);
                try {
                    var t;
                    let n = await tg(e, h.value), r = e.startsWith("management_") ? t_("Management operation started; status is refreshed below.") : t_("Started: %s").replace("%s", "operation_ids" in n ? n.operation_ids.join(", ") : "\u2014");
                    f.replaceChildren((t = {
                        class: "alert-message info",
                        children: r
                    }, s("div", t))), Z(await tu());
                } catch (e) {
                    f.replaceChildren(s("div", {
                        class: "alert-message danger",
                        children: String(e)
                    }));
                } finally{
                    b = !1, Z(y);
                }
            }
        }, j = s("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: ()=>k("plan"),
            children: t_("Preview differences (read-only)")
        }), S = s("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            onclick: ()=>k("apply"),
            children: t_("Apply differences")
        }), P = s("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            title: t_("Read current device parameters and auto-verify matching settings without writing to device"),
            onclick: ()=>k("reconcile"),
            children: t_("Reconcile (read-only)")
        }), O = s("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            title: t_("Clear backoff delays and retry safe difference synchronization"),
            onclick: ()=>k("retry"),
            children: t_("Self-heal / retry")
        });
        z.push(j, S, P, O);
        let A = s("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: ()=>k("management_plan"),
            children: t_("Check management differences (read-only)")
        }), $ = s("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            onclick: ()=>k("management_apply"),
            children: t_("Apply management configuration")
        });
        z.push(A, $);
        let T = (n = {
            class: "cbi-section",
            children: [
                s("h3", {
                    children: t_("Isolated TR069 management network")
                }),
                m,
                s("p", {
                    style: "margin-top:10px",
                    children: [
                        A,
                        " ",
                        $
                    ]
                })
            ]
        }, s("div", n)), M = (o = {
            class: "cbi-section",
            children: [
                s("h3", {
                    children: t_("Manual synchronization")
                }),
                (i = {
                    style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px",
                    children: [
                        (r = {
                            style: "display:flex;align-items:center;gap:8px",
                            children: [
                                s("span", {
                                    children: [
                                        t_("Target"),
                                        ":"
                                    ]
                                }),
                                h
                            ]
                        }, s("label", r)),
                        s("div", {
                            style: "display:flex;gap:8px;flex-wrap:wrap",
                            children: [
                                j,
                                S,
                                P,
                                O
                            ]
                        })
                    ]
                }, s("div", i))
            ]
        }, s("div", o)), N = (l = {
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
                    children: t_("FTTR synchronization")
                }),
                p,
                u,
                T,
                M,
                f,
                g
            ]
        }, s("div", l));
        function Z(e) {
            var t, n, r, i, o, l, d, c, f, w, z, P, O, T, N, Z, C, R, W, I, D, V, q, F, U, B, J, K, X, G, H;
            y = e, p.replaceChildren((l = {
                "data-provisioning-summary": "true",
                style: "display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%",
                children: [
                    (t = {
                        children: [
                            s("strong", {
                                style: "margin-right:.4em",
                                children: [
                                    t_("Provisioning"),
                                    ":"
                                ]
                            }),
                            s("span", {
                                class: `fttr-badge ${e.enabled ? "fttr-badge-success" : "fttr-badge-neutral"}`,
                                children: e.enabled ? t_("Enabled") : t_("Disabled")
                            })
                        ]
                    }, s("span", t)),
                    (n = {
                        children: [
                            s("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    t_("Mode"),
                                    ":"
                                ]
                            }),
                            s("span", {
                                class: "fttr-badge fttr-badge-info",
                                children: tv(e.mode)
                            })
                        ]
                    }, s("span", n)),
                    (r = {
                        children: [
                            s("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    t_("Revision"),
                                    ":"
                                ]
                            }),
                            s("code", {
                                children: tv(e.revision)
                            })
                        ]
                    }, s("span", r)),
                    (e.triggers ?? []).length ? (i = {
                        children: [
                            s("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    t_("Triggers"),
                                    ":"
                                ]
                            }),
                            s("code", {
                                children: (e.triggers ?? []).join(", ")
                            })
                        ]
                    }, s("span", i)) : null,
                    e.interval_minutes ? (o = {
                        children: [
                            s("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    t_("Interval (minutes)"),
                                    ":"
                                ]
                            }),
                            s("span", {
                                children: e.interval_minutes
                            })
                        ]
                    }, s("span", o)) : null
                ]
            }, s("div", l)));
            let Q = [
                e.error,
                v.error ? _("Committed configuration is invalid: %s").format(v.error) : v.revision && v.revision !== e.revision ? _("Committed configuration has not been loaded. Check Configuration diagnostics; an active operation may have prevented reload.") : ""
            ].filter(Boolean);
            u.hidden = !Q.length, u.textContent = Q.join(" \u2014 ");
            let Y = [
                "all",
                ...Array.from(new Set((e.devices ?? []).map((e)=>e.group).filter(Boolean))).map((e)=>`group:${e}`),
                ...(e.devices ?? []).map((e)=>e.device)
            ];
            if (Array.from(h.options).map((e)=>e.value).join("\n") !== Y.join("\n")) {
                let t = h.value;
                h.replaceChildren(...Y.map((t)=>s("option", {
                        value: t,
                        children: "all" === t ? t_("All devices") : t.startsWith("group:") ? (e.devices ?? []).find((e)=>`group:${e.group}` === t)?.group_name || t : (e.devices ?? []).find((e)=>e.device === t)?.name || t
                    }))), h.value = Y.includes(t) ? t : "all";
            }
            M.hidden = "manual" !== e.mode || !L.hasViewPermission();
            let ee = (e.devices ?? []).filter((e)=>"all" === h.value || e.device === h.value || `group:${e.group}` === h.value).some((e)=>![
                    "completed",
                    "not_started",
                    "interrupted"
                ].includes(e.provisioning.state ?? "not_started"));
            j.disabled = b || ee || !!v.error || !!v.revision && v.revision !== e.revision || !(e.devices ?? []).length, S.disabled = j.disabled || !e.enabled;
            let et = e.management_network;
            A.disabled = b || !!et?.inflight || !!v.error || !L.hasViewPermission(), $.disabled = A.disabled;
            let en = et.desired ?? et.applied, er = et?.plan ?? [], ei = !!et?.applied_version && !!et?.desired_version && et?.applied_version === et?.desired_version;
            m.replaceChildren((H = {
                children: [
                    (P = {
                        style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:10px",
                        children: [
                            (d = {
                                children: [
                                    s("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            t_("State"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    tw(et?.state)
                                ]
                            }, s("span", d)),
                            (c = {
                                children: [
                                    s("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            t_("Desired version"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    s("code", {
                                        children: tv(et?.desired_version)
                                    })
                                ]
                            }, s("span", c)),
                            (f = {
                                children: [
                                    s("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            t_("Applied version"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    s("code", {
                                        children: tv(et?.applied_version)
                                    })
                                ]
                            }, s("span", f)),
                            et?.desired_version || et?.applied_version ? (w = {
                                children: ei ? s("span", {
                                    class: "fttr-badge fttr-badge-success",
                                    children: t_("Synchronized")
                                }) : s("span", {
                                    class: "fttr-badge fttr-badge-warning",
                                    children: t_("Pending apply")
                                })
                            }, s("span", w)) : null,
                            et?.next_retry_at ? (z = {
                                children: [
                                    s("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            t_("Next retry"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    tb(et.next_retry_at)
                                ]
                            }, s("span", z)) : null
                        ]
                    }, s("div", P)),
                    (q = {
                        class: "fttr-grid-3",
                        children: [
                            (N = {
                                class: "fttr-card",
                                children: [
                                    (O = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: t_("Management interface")
                                            }),
                                            s("strong", {
                                                children: "\u2014"
                                            })
                                        ]
                                    }, s("div", O)),
                                    (T = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: t_("Management VLAN")
                                            }),
                                            s("span", {
                                                children: [
                                                    "VLAN ",
                                                    tv(en?.vlan.join(", ")),
                                                    " (Prio ",
                                                    tv(en?.priority),
                                                    ")"
                                                ]
                                            })
                                        ]
                                    }, s("div", T))
                                ]
                            }, s("div", N)),
                            (W = {
                                class: "fttr-card",
                                children: [
                                    (Z = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: t_("Service IP / Netmask")
                                            }),
                                            s("code", {
                                                children: tv(en?.address)
                                            })
                                        ]
                                    }, s("div", Z)),
                                    (R = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: t_("DHCP service")
                                            }),
                                            (C = {
                                                children: null === en ? "\u2014" : en.dhcp_enabled ? s("span", {
                                                    class: "fttr-badge fttr-badge-success",
                                                    children: t_("Enabled")
                                                }) : s("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    children: t_("Disabled")
                                                })
                                            }, s("span", C))
                                        ]
                                    }, s("div", R))
                                ]
                            }, s("div", W)),
                            (V = {
                                class: "fttr-card",
                                children: [
                                    (I = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: t_("ACS URL")
                                            }),
                                            s("code", {
                                                style: "font-size:80%",
                                                children: tv(en?.acs_url)
                                            })
                                        ]
                                    }, s("div", I)),
                                    (D = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: t_("Mode")
                                            }),
                                            s("span", {
                                                children: tv(en?.mode)
                                            })
                                        ]
                                    }, s("div", D))
                                ]
                            }, s("div", V))
                        ]
                    }, s("div", q)),
                    er.length ? (X = {
                        style: "margin-top:10px",
                        children: [
                            s("h5", {
                                style: "margin-bottom:4px;font-size:90%",
                                children: t_("Pending configuration changes")
                            }),
                            (K = {
                                class: "table-wrapper",
                                children: (J = {
                                    class: "table",
                                    style: "font-size:85%",
                                    children: [
                                        (U = {
                                            children: (F = {
                                                children: [
                                                    s("th", {
                                                        children: t_("Operation")
                                                    }),
                                                    s("th", {
                                                        children: t_("Configuration item")
                                                    }),
                                                    s("th", {
                                                        children: t_("Reason / desired changes")
                                                    })
                                                ]
                                            }, s("tr", F))
                                        }, s("thead", U)),
                                        (B = {
                                            children: er.map((e)=>{
                                                var t, n, r, i;
                                                return i = {
                                                    children: [
                                                        (t = {
                                                            children: s("span", {
                                                                class: "fttr-badge fttr-badge-info",
                                                                children: e.operation
                                                            })
                                                        }, s("td", t)),
                                                        (n = {
                                                            children: s("code", {
                                                                children: e.key
                                                            })
                                                        }, s("td", n)),
                                                        (r = {
                                                            children: s("code", {
                                                                children: (e.value ?? []).join(", ")
                                                            })
                                                        }, s("td", r))
                                                    ]
                                                }, s("tr", i);
                                            })
                                        }, s("tbody", B))
                                    ]
                                }, s("table", J))
                            }, s("div", K))
                        ]
                    }, s("div", X)) : null,
                    et?.error ? s("div", {
                        class: "alert-message warning",
                        style: "margin-top:8px",
                        children: et.error
                    }) : null,
                    s("p", {
                        style: "font-size:85%;color:#888;margin-top:8px;margin-bottom:8px",
                        children: t_("Saving in manual mode does not create interfaces, change firewall rules or configure child devices. Apply explicitly to authorize the current management configuration.")
                    }),
                    (G = {
                        style: "margin-top:6px;margin-bottom:10px",
                        children: [
                            s("summary", {
                                style: "cursor:pointer;user-select:none;font-size:85%;color:#666",
                                children: t_("Advanced diagnostics / Raw configuration (JSON)")
                            }),
                            s("pre", {
                                style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px",
                                children: JSON.stringify({
                                    desired: et?.desired,
                                    applied: et?.applied,
                                    plan: et?.plan ?? []
                                }, null, 2)
                            })
                        ]
                    }, s("details", G))
                ]
            }, s("div", H)));
            let ea = new Set(Array.from(g.querySelectorAll("details[open]")).map((e)=>e.getAttribute("data-device")));
            g.replaceChildren(...(e.devices ?? []).map((e)=>{
                var t, n, r, i, o, l, d, c, p, u, f, h, g, m, y, v, w, z, j, S, P, O, A, T, M, N, Z, C, R, W, I, D, V, q, F, U, B, J, K, X, G, H, Q, Y, ee, et, en, er, ei, es, eo, el, ed, ec, ep, eu, ef, eh, eg, em;
                let ey, e_;
                return t = ea.has(e.device), n = ()=>k("management_apply"), r = $.disabled, i = b, e_ = [
                    ...Object.entries((ey = e.provisioning).wan_lifecycle ?? {}).map((e)=>{
                        let [t, n] = e;
                        return {
                            ...n,
                            id: `WAN ${t}`,
                            kind: "wan_activation",
                            service_type: "wan"
                        };
                    }),
                    ...Object.entries(ey.wifi_lifecycle ?? {}).map((e)=>{
                        let [t, n] = e;
                        return {
                            ...n,
                            id: `WLAN ${t}`,
                            kind: "ssid",
                            service_type: "wifi"
                        };
                    })
                ], em = {
                    class: "cbi-section fttr-device-card",
                    children: [
                        (f = {
                            class: "fttr-card-header",
                            children: [
                                (p = {
                                    class: "fttr-card-title-group",
                                    children: [
                                        (l = {
                                            style: "margin:0",
                                            children: [
                                                e.name || e.optical_sn,
                                                " ",
                                                s("small", {
                                                    style: "font-size:75%;font-weight:normal;color:#888",
                                                    children: [
                                                        "(",
                                                        e.adapter,
                                                        ")"
                                                    ]
                                                })
                                            ]
                                        }, s("h3", l)),
                                        (c = {
                                            class: "fttr-card-meta-tags",
                                            children: [
                                                e.group_name ? s("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    title: t_("Group"),
                                                    children: e.group_name
                                                }) : null,
                                                e.template_name ? s("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    title: t_("Template"),
                                                    children: e.template_name
                                                }) : null,
                                                (d = {
                                                    style: "font-size:85%;color:#666",
                                                    children: [
                                                        "OMCI: ",
                                                        tw(e.omci_management?.state),
                                                        e.omci_management?.reason ? s("span", {
                                                            style: "margin-left:4px;color:#888",
                                                            title: e.omci_management.reason,
                                                            children: [
                                                                "(",
                                                                e.omci_management.reason,
                                                                ")"
                                                            ]
                                                        }) : null
                                                    ]
                                                }, s("span", d))
                                            ]
                                        }, s("div", c))
                                    ]
                                }, s("div", p)),
                                L.hasViewPermission() ? (u = {
                                    class: "fttr-card-actions",
                                    children: s("button", {
                                        type: "button",
                                        class: "fttr-btn-subtle",
                                        disabled: i,
                                        title: t_("Clear old tasks and managed-object records after a device factory reset. The next preview or apply reads the device again."),
                                        onclick: ()=>{
                                            let t = e.name || e.optical_sn;
                                            window.confirm(t_("Are you sure you want to reset the synchronization state for %s?").replace("%s", t)) && x(e);
                                        },
                                        children: t_("Reset synchronization state")
                                    })
                                }, s("div", u)) : null
                            ]
                        }, s("div", f)),
                        (O = {
                            class: "fttr-device-status-strip",
                            children: [
                                (y = {
                                    class: "fttr-status-pill-group",
                                    children: [
                                        (h = {
                                            children: [
                                                s("span", {
                                                    class: "fttr-pill-label",
                                                    children: "CWMP:"
                                                }),
                                                " ",
                                                tw(e.management?.state, e.management?.last_inform ? `${t_("Last Inform: %s").replace("%s", tb(e.management.last_inform))}${null != e.management.age_seconds ? ` (${function(e) {
                                                    if (null == e || e < 0) return null;
                                                    if (e < 60) return t_(1 === e ? "%d second ago" : "%d seconds ago").replace("%d", String(e));
                                                    let t = Math.floor(e / 60);
                                                    if (t < 60) return t_(1 === t ? "%d minute ago" : "%d minutes ago").replace("%d", String(t));
                                                    let n = Math.floor(e / 3600);
                                                    if (n < 24) return t_(1 === n ? "%d hour ago" : "%d hours ago").replace("%d", String(n));
                                                    let r = Math.floor(e / 86400);
                                                    return t_(1 === r ? "%d day ago" : "%d days ago").replace("%d", String(r));
                                                }(e.management.age_seconds)})` : ""}` : void 0)
                                            ]
                                        }, s("span", h)),
                                        (g = {
                                            children: [
                                                s("span", {
                                                    class: "fttr-pill-label",
                                                    children: [
                                                        t_("Synchronization"),
                                                        ":"
                                                    ]
                                                }),
                                                " ",
                                                tw(ey.state)
                                            ]
                                        }, s("span", g)),
                                        (m = {
                                            children: [
                                                s("span", {
                                                    class: "fttr-pill-label",
                                                    children: "Wi-Fi:"
                                                }),
                                                " ",
                                                tw(e.wifi_sync)
                                            ]
                                        }, s("span", m))
                                    ]
                                }, s("div", y)),
                                (P = {
                                    class: "fttr-status-op-info",
                                    children: [
                                        (v = {
                                            children: [
                                                t_("Operation"),
                                                ": ",
                                                s("strong", {
                                                    children: tv(ey.operation_id)
                                                }),
                                                " (",
                                                tv(ey.mode),
                                                ")"
                                            ]
                                        }, s("span", v)),
                                        s("span", {
                                            children: "\xb7"
                                        }),
                                        s("span", {
                                            children: [
                                                t_("Started"),
                                                ": ",
                                                tb(ey.started_at)
                                            ]
                                        }),
                                        s("span", {
                                            children: "\xb7"
                                        }),
                                        (w = {
                                            children: [
                                                t_("Revision"),
                                                ": ",
                                                s("code", {
                                                    children: tv(ey.revision)
                                                })
                                            ]
                                        }, s("span", w)),
                                        ey.attempts ? (j = {
                                            children: [
                                                s("span", {
                                                    children: "\xb7"
                                                }),
                                                (z = {
                                                    style: "color:#e67e22",
                                                    children: [
                                                        t_("Attempts"),
                                                        ": ",
                                                        s("strong", {
                                                            children: ey.attempts
                                                        })
                                                    ]
                                                }, s("span", z))
                                            ]
                                        }, s(a, j)) : null,
                                        ey.next_retry_at && ey.next_retry_at > Math.floor(Date.now() / 1000) ? (S = {
                                            children: [
                                                s("span", {
                                                    children: "\xb7"
                                                }),
                                                s("span", {
                                                    style: "color:#d35400",
                                                    children: t_("Next self-healing retry in %d seconds").replace("%d", String(ey.next_retry_at - Math.floor(Date.now() / 1000)))
                                                })
                                            ]
                                        }, s(a, S)) : null
                                    ]
                                }, s("div", P))
                            ]
                        }, s("div", O)),
                        ey.reconcile_reason ? s("div", {
                            class: "alert-message info",
                            style: "margin:8px 0;font-size:85%",
                            children: t_(ey.reconcile_reason)
                        }) : null,
                        tz(ey.items ?? []),
                        ey.cwmp_contract ? (D = {
                            style: "margin-top:1.2em",
                            children: [
                                s("h4", {
                                    style: "margin-bottom:0.5em",
                                    children: t_("CWMP contract")
                                }),
                                (I = {
                                    class: "fttr-card",
                                    children: [
                                        (T = {
                                            style: "display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                                            children: [
                                                (A = {
                                                    children: [
                                                        s("span", {
                                                            children: tv(ey.cwmp_contract.requested)
                                                        }),
                                                        " \u2192",
                                                        " ",
                                                        s("code", {
                                                            children: tv(ey.cwmp_contract.contract)
                                                        })
                                                    ]
                                                }, s("div", A)),
                                                s("div", {
                                                    children: tw(ey.cwmp_contract.state)
                                                })
                                            ]
                                        }, s("div", T)),
                                        (R = {
                                            style: "display:flex;flex-wrap:wrap;gap:12px;margin-bottom:6px;font-size:90%",
                                            children: [
                                                (M = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: "WAN:"
                                                        }),
                                                        " ",
                                                        tw(ey.cwmp_contract.capabilities?.wan)
                                                    ]
                                                }, s("span", M)),
                                                (N = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: "WLAN:"
                                                        }),
                                                        " ",
                                                        tw(ey.cwmp_contract.capabilities?.wlan)
                                                    ]
                                                }, s("span", N)),
                                                (Z = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                t_("Bindings"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        tw(ey.cwmp_contract.capabilities?.binding)
                                                    ]
                                                }, s("span", Z)),
                                                (C = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                t_("Cache"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        s("span", {
                                                            class: "fttr-badge fttr-badge-info",
                                                            style: "font-size:80%",
                                                            children: ey.cwmp_contract.cache_hit ? t_("Matched") : t_("Fresh discovery")
                                                        })
                                                    ]
                                                }, s("span", C))
                                            ]
                                        }, s("div", R)),
                                        ey.cwmp_contract.schema ? (W = {
                                            style: "font-size:85%;color:#666",
                                            children: [
                                                t_("Schema"),
                                                ": ",
                                                s("code", {
                                                    children: ey.cwmp_contract.schema
                                                })
                                            ]
                                        }, s("div", W)) : null,
                                        ey.cwmp_contract.reason ? s("div", {
                                            style: "font-size:85%;margin-top:4px;color:#e67e22",
                                            children: ey.cwmp_contract.reason
                                        }) : null
                                    ]
                                }, s("div", I))
                            ]
                        }, s("div", D)) : null,
                        (o = e.acs_bootstrap) ? (ed = {
                            style: "margin-top:1.2em",
                            children: [
                                (q = {
                                    style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:0.5em",
                                    children: [
                                        s("h4", {
                                            style: "margin:0",
                                            children: t_("ACS bootstrap")
                                        }),
                                        (V = {
                                            style: "display:flex;align-items:center;gap:6px",
                                            children: [
                                                tw(o.state),
                                                o.inflight ? s("span", {
                                                    class: "fttr-badge fttr-badge-info",
                                                    children: t_("Command in progress")
                                                }) : null
                                            ]
                                        }, s("div", V))
                                    ]
                                }, s("div", q)),
                                (es = {
                                    class: "fttr-card",
                                    children: [
                                        (en = {
                                            class: "fttr-grid-3",
                                            children: [
                                                (J = {
                                                    children: [
                                                        (F = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("Method")
                                                                }),
                                                                s("code", {
                                                                    children: tv(o.method)
                                                                })
                                                            ]
                                                        }, s("div", F)),
                                                        (U = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("Attempts")
                                                                }),
                                                                s("span", {
                                                                    children: tv(o.attempts)
                                                                })
                                                            ]
                                                        }, s("div", U)),
                                                        (B = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("Identity source")
                                                                }),
                                                                s("span", {
                                                                    children: tv(o.binding_source)
                                                                })
                                                            ]
                                                        }, s("div", B))
                                                    ]
                                                }, s("div", J)),
                                                (H = {
                                                    children: [
                                                        (K = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("Management VLAN")
                                                                }),
                                                                s("span", {
                                                                    children: o.desired?.vlan !== void 0 ? `VLAN ${o.desired.vlan} (Prio ${o.desired.priority ?? 0})` : "\u2014"
                                                                })
                                                            ]
                                                        }, s("div", K)),
                                                        (X = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("ACS URL")
                                                                }),
                                                                s("code", {
                                                                    style: "font-size:80%",
                                                                    children: tv(o.desired?.acs_url)
                                                                })
                                                            ]
                                                        }, s("div", X)),
                                                        (G = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("Local ACS listener")
                                                                }),
                                                                s("code", {
                                                                    style: "font-size:80%",
                                                                    children: o.listener?.listen ? `${o.listener.listen}${o.listener.path || ""}` : "\u2014"
                                                                })
                                                            ]
                                                        }, s("div", G))
                                                    ]
                                                }, s("div", H)),
                                                (et = {
                                                    children: [
                                                        (Q = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("Last telemetry")
                                                                }),
                                                                s("span", {
                                                                    style: "font-size:85%",
                                                                    children: tb(o.mqtt_last_seen)
                                                                })
                                                            ]
                                                        }, s("div", Q)),
                                                        (Y = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("Last Inform")
                                                                }),
                                                                s("span", {
                                                                    style: "font-size:85%",
                                                                    children: tb(o.last_inform)
                                                                })
                                                            ]
                                                        }, s("div", Y)),
                                                        (ee = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("Settings verified")
                                                                }),
                                                                s("span", {
                                                                    style: "font-size:85%",
                                                                    children: tb(o.settings_verified_at)
                                                                })
                                                            ]
                                                        }, s("div", ee))
                                                    ]
                                                }, s("div", et))
                                            ]
                                        }, s("div", en)),
                                        o.mqtt_target ? (er = {
                                            style: "font-size:85%;color:#666;margin-top:6px;border-top:1px dashed rgba(127,140,141,0.15);padding-top:6px",
                                            children: [
                                                s("span", {
                                                    style: "color:#888",
                                                    children: [
                                                        t_("MQTT target"),
                                                        ":"
                                                    ]
                                                }),
                                                " ",
                                                s("code", {
                                                    children: o.mqtt_target
                                                })
                                            ]
                                        }, s("div", er)) : null,
                                        o.reason ? s("div", {
                                            style: "font-size:85%;color:#d35400;margin-top:6px;overflow-wrap:anywhere",
                                            children: o.reason
                                        }) : null,
                                        "awaiting_apply" === o.state ? (ei = {
                                            style: "margin-top:10px;padding:8px;background:rgba(243,156,18,0.1);border-radius:4px;border:1px solid rgba(243,156,18,0.3)",
                                            children: [
                                                s("button", {
                                                    type: "button",
                                                    class: "cbi-button cbi-button-positive",
                                                    disabled: r,
                                                    onclick: n,
                                                    children: t_("Authorize and apply management settings")
                                                }),
                                                " ",
                                                s("span", {
                                                    style: "font-size:85%;color:#666",
                                                    children: t_("Required after management drift or service restart; verifies the child ACS settings before business synchronization.")
                                                })
                                            ]
                                        }, s("div", ei)) : null
                                    ]
                                }, s("div", es)),
                                [
                                    o.last_error,
                                    o.link_identity_error,
                                    o.persistence_error,
                                    o.listener?.error,
                                    o.endpoint_notice
                                ].filter(Boolean).map((e)=>s("div", {
                                        class: "alert-message warning",
                                        style: "overflow-wrap:anywhere;margin-top:8px",
                                        children: e
                                    })),
                                o.manual_steps?.length ? (el = {
                                    style: "margin-top:8px",
                                    children: [
                                        s("summary", {
                                            style: "cursor:pointer;user-select:none;font-weight:600",
                                            children: t_("Management setup / reachability guidance")
                                        }),
                                        (eo = {
                                            style: "padding:6px 0",
                                            children: o.manual_steps.map((e, t)=>s("p", {
                                                    style: "margin:4px 0;font-size:90%",
                                                    children: [
                                                        t + 1,
                                                        ". ",
                                                        e
                                                    ]
                                                }))
                                        }, s("div", eo))
                                    ]
                                }, s("details", el)) : null
                            ]
                        }, s("div", ed)) : null,
                        e_.length ? (ec = {
                            style: "margin-top:1.2em",
                            children: [
                                s("h4", {
                                    style: "margin-bottom:0.5em",
                                    children: t_("WAN / WLAN lifecycle results")
                                }),
                                tz(e_)
                            ]
                        }, s("div", ec)) : null,
                        (eg = {
                            "data-device": e.device,
                            open: t,
                            style: "margin-top:1em",
                            children: [
                                s("summary", {
                                    style: "cursor:pointer;user-select:none;font-weight:600",
                                    children: t_("Managed objects and lifecycle intent")
                                }),
                                (eh = {
                                    style: "padding:8px 0",
                                    children: [
                                        (ef = {
                                            style: "display:flex;gap:16px;flex-wrap:wrap;font-size:90%;margin-bottom:6px",
                                            children: [
                                                (ep = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                t_("Wi-Fi cleanup policy"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        tv(ey.wifi_cleanup)
                                                    ]
                                                }, s("span", ep)),
                                                (eu = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                t_("Wi-Fi stage"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        tv(ey.wifi_stage)
                                                    ]
                                                }, s("span", eu))
                                            ]
                                        }, s("div", ef)),
                                        s("pre", {
                                            style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:85%;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px;max-height:240px;overflow-y:auto",
                                            children: JSON.stringify({
                                                wan_objects: ey.wan_objects ?? {},
                                                wifi_objects: ey.wifi_objects ?? {}
                                            }, null, 2)
                                        })
                                    ]
                                }, s("div", eh))
                            ]
                        }, s("details", eg))
                    ]
                }, s("div", em);
            }));
        }
        return h.addEventListener("change", ()=>Z(y)), Z(d), L.Poll.add(async ()=>{
            if (N.isConnected && !w) {
                w = !0;
                try {
                    let [e, t] = await Promise.all([
                        tu(),
                        tf()
                    ]);
                    v = t, Z(e);
                } catch (e) {
                    u.hidden = !1, u.textContent = _("Status refresh failed: %s").format(String(e));
                } finally{
                    w = !1;
                }
            }
        }, 5), N;
    },
    handleSave: null,
    handleSaveApply: null,
    handleReset: null
});

return main;