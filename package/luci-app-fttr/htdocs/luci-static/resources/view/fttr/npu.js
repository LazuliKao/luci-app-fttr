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
function o(e, t) {
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
    let o = {}, s = {
        ...r
    };
    for (let [e, t] of Object.entries(s))e.startsWith("on") && "function" == typeof t ? (o[e] = t, delete s[e]) : "boolean" == typeof t && (t ? s[e] = e : delete s[e]);
    let l = Object.keys(s).length > 0 ? i.length > 1 ? E(e, s, i) : E(e, s, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
    for (let [e, t] of Object.entries(o)){
        let n = e.slice(2).toLowerCase();
        l.addEventListener(n, t);
    }
    return l;
}
function s(e, t, n) {
    function r(n, r) {
        if (n._zod || Object.defineProperty(n, "_zod", {
            value: {
                def: r,
                constr: o,
                traits: new Set()
            },
            enumerable: !1
        }), n._zod.traits.has(e)) return;
        n._zod.traits.add(e), t(n, r);
        let i = o.prototype, a = Object.keys(i);
        for(let e = 0; e < a.length; e++){
            let t = a[e];
            t in n || (n[t] = i[t].bind(n));
        }
    }
    let i = n?.Parent ?? Object;
    class a extends i {
    }
    function o(e) {
        var t;
        let i = n?.Parent ? new a() : this;
        for (let n of (r(i, e), (t = i._zod).deferred ?? (t.deferred = []), i._zod.deferred))n();
        return i;
    }
    return Object.defineProperty(a, "name", {
        value: e
    }), Object.defineProperty(o, "init", {
        value: r
    }), Object.defineProperty(o, Symbol.hasInstance, {
        value: (t)=>!!n?.Parent && t instanceof n.Parent || t?._zod?.traits?.has(e)
    }), Object.defineProperty(o, "name", {
        value: e
    }), o;
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
function u(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function p(e) {
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
function v(e, t, n) {
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
const m = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
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
function k(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function x(e, t, n) {
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
function P(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let n = t; n < e.issues.length; n++)if (e.issues[n]?.continue !== !0) return !0;
    return !1;
}
function $(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function O(e) {
    return "string" == typeof e ? e : e?.message;
}
function T(e, t, n) {
    let r = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (r.message = O(e.inst?._zod.def?.error?.(e)) ?? O(t?.error?.(e)) ?? O(n.customError?.(e)) ?? O(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
const S = (e, t)=>{
    e.name = "$ZodError", Object.defineProperty(e, "_zod", {
        value: e._zod,
        enumerable: !1
    }), Object.defineProperty(e, "issues", {
        value: t,
        enumerable: !1
    }), e.message = JSON.stringify(t, u, 2), Object.defineProperty(e, "toString", {
        value: ()=>e.message,
        enumerable: !1
    });
}, N = s("$ZodError", S), Z = s("$ZodError", S, {
    Parent: Error
}), A = (t = Z, (e, n, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !1
    }) : {
        async: !1
    }, o = e._zod.run({
        value: n,
        issues: []
    }, a);
    if (o instanceof Promise) throw new l();
    if (o.issues.length) {
        let e = new (i?.Err ?? t)(o.issues.map((e)=>T(e, a, c())));
        throw m(e, i?.callee), e;
    }
    return o.value;
}), C = (n = Z, async (e, t, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (i?.Err ?? n)(o.issues.map((e)=>T(e, a, c())));
        throw m(e, i?.callee), e;
    }
    return o.value;
}), M = (r = Z, (e, t, n)=>{
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
        error: new (r ?? N)(a.issues.map((e)=>T(e, i, c())))
    } : {
        success: !0,
        data: a.value
    };
}), R = (i = Z, async (e, t, n)=>{
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
        error: new i(a.issues.map((e)=>T(e, r, c())))
    } : {
        success: !0,
        data: a.value
    };
}), U = /^-?\d+(?:\.\d+)?$/, D = /^(?:true|false)$/i, F = /^null$/i, V = {
    major: 4,
    minor: 3,
    patch: 6
}, I = s("$ZodType", (e, t)=>{
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
            let r, i = P(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, o = a._zod.check(e);
                if (o instanceof Promise && n?.async === !1) throw new l();
                if (r || o instanceof Promise) r = (r ?? Promise.resolve()).then(async ()=>{
                    await o, e.issues.length !== t && (i || (i = P(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = P(e, t));
                }
            }
            return r ? r.then(()=>e) : e;
        }, n = (n, i, a)=>{
            if (P(n)) return n.aborted = !0, n;
            let o = t(i, r, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new l();
                return o.then((t)=>e._zod.parse(t, a));
            }
            return e._zod.parse(o, a);
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
            let o = e._zod.parse(i, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new l();
                return o.then((e)=>t(e, r, a));
            }
            return t(o, r, a);
        };
    }
    g(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = M(e, t);
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
}), q = s("$ZodString", (e, t)=>{
    var n;
    let r;
    I.init(e, t), e._zod.pattern = [
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
}), B = s("$ZodNumber", (e, t)=>{
    I.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? U, e._zod.parse = (n, r)=>{
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
}), W = s("$ZodBoolean", (e, t)=>{
    I.init(e, t), e._zod.pattern = D, e._zod.parse = (n, r)=>{
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
}), J = s("$ZodNull", (e, t)=>{
    I.init(e, t), e._zod.pattern = F, e._zod.values = new Set([
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
}), K = s("$ZodNever", (e, t)=>{
    I.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function X(e, t, n) {
    e.issues.length && t.issues.push(...$(n, e.issues)), t.value[n] = e.value;
}
const G = s("$ZodArray", (e, t)=>{
    I.init(e, t), e._zod.parse = (n, r)=>{
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
            let o = i[e], s = t.element._zod.run({
                value: o,
                issues: []
            }, r);
            s instanceof Promise ? a.push(s.then((t)=>X(t, n, e))) : X(s, n, e);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
});
function H(e, t, n, r, i) {
    if (e.issues.length) {
        if (i && !(n in r)) return;
        t.issues.push(...$(n, e.issues));
    }
    void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const Q = s("$ZodObject", (e, t)=>{
    let n;
    I.init(e, t);
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
    let i = p(()=>(function(e) {
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
        let o = t.value;
        if (!b(o)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: o,
            inst: e
        }), t;
        t.value = {};
        let s = [], l = n.shape;
        for (let e of n.keys){
            let n = l[e], i = "optional" === n._zod.optout, a = n._zod.run({
                value: o[e],
                issues: []
            }, r);
            a instanceof Promise ? s.push(a.then((n)=>H(n, t, e, o, i))) : H(a, t, e, o, i);
        }
        return a ? function(e, t, n, r, i, a) {
            let o = [], s = i.keySet, l = i.catchall._zod, d = l.def.type, c = "optional" === l.optout;
            for(let i in t){
                if (s.has(i)) continue;
                if ("never" === d) {
                    o.push(i);
                    continue;
                }
                let a = l.run({
                    value: t[i],
                    issues: []
                }, r);
                a instanceof Promise ? e.push(a.then((e)=>H(e, n, i, t, c))) : H(a, n, i, t, c);
            }
            return (o.length && n.issues.push({
                code: "unrecognized_keys",
                keys: o,
                input: t,
                inst: a
            }), e.length) ? Promise.all(e).then(()=>n) : n;
        }(s, o, t, r, i.value, e) : s.length ? Promise.all(s).then(()=>t) : t;
    };
});
function Y(e, t, n, r) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let i = e.filter((e)=>!P(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>T(e, r, c())))
    }), t);
}
const ee = s("$ZodUnion", (e, t)=>{
    I.init(e, t), g(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), g(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), g(e._zod, "values", ()=>{
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
        let o = !1, s = [];
        for (let e of t.options){
            let t = e._zod.run({
                value: i.value,
                issues: []
            }, a);
            if (t instanceof Promise) s.push(t), o = !0;
            else {
                if (0 === t.issues.length) return t;
                s.push(t);
            }
        }
        return o ? Promise.all(s).then((t)=>Y(t, i, e, a)) : Y(s, i, e, a);
    };
}), et = s("$ZodDiscriminatedUnion", (e, t)=>{
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
    let r = p(()=>{
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
        let o = i.value;
        if (!b(o)) return i.issues.push({
            code: "invalid_type",
            expected: "object",
            input: o,
            inst: e
        }), i;
        let s = r.value.get(o?.[t.discriminator]);
        return s ? s._zod.run(i, a) : t.unionFallback ? n(i, a) : (i.issues.push({
            code: "invalid_union",
            errors: [],
            note: "No matching discriminator",
            discriminator: t.discriminator,
            input: o,
            path: [
                t.discriminator
            ],
            inst: e
        }), i);
    };
}), en = s("$ZodRecord", (e, t)=>{
    I.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!w(i)) return n.issues.push({
            expected: "record",
            code: "invalid_type",
            input: i,
            inst: e
        }), n;
        let a = [], o = t.keyType._zod.values;
        if (o) {
            let s;
            n.value = {};
            let l = new Set();
            for (let e of o)if ("string" == typeof e || "number" == typeof e || "symbol" == typeof e) {
                l.add("number" == typeof e ? e.toString() : e);
                let o = t.valueType._zod.run({
                    value: i[e],
                    issues: []
                }, r);
                o instanceof Promise ? a.push(o.then((t)=>{
                    t.issues.length && n.issues.push(...$(e, t.issues)), n.value[e] = t.value;
                })) : (o.issues.length && n.issues.push(...$(e, o.issues)), n.value[e] = o.value);
            }
            for(let e in i)l.has(e) || (s = s ?? []).push(e);
            s && s.length > 0 && n.issues.push({
                code: "unrecognized_keys",
                input: i,
                inst: e,
                keys: s
            });
        } else for (let o of (n.value = {}, Reflect.ownKeys(i))){
            if ("__proto__" === o) continue;
            let s = t.keyType._zod.run({
                value: o,
                issues: []
            }, r);
            if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof o && U.test(o) && s.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(o),
                    issues: []
                }, r);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (s = e);
            }
            if (s.issues.length) {
                "loose" === t.mode ? n.value[o] = i[o] : n.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: s.issues.map((e)=>T(e, r, c())),
                    input: o,
                    path: [
                        o
                    ],
                    inst: e
                });
                continue;
            }
            let l = t.valueType._zod.run({
                value: i[o],
                issues: []
            }, r);
            l instanceof Promise ? a.push(l.then((e)=>{
                e.issues.length && n.issues.push(...$(o, e.issues)), n.value[s.value] = e.value;
            })) : (l.issues.length && n.issues.push(...$(o, l.issues)), n.value[s.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
}), er = s("$ZodEnum", (e, t)=>{
    var n;
    let r;
    I.init(e, t);
    let i = (r = Object.values(n = t.entries).filter((e)=>"number" == typeof e), Object.entries(n).filter(([e, t])=>-1 === r.indexOf(+e)).map(([e, t])=>t)), a = new Set(i);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${i.filter((e)=>z.has(typeof e)).map((e)=>"string" == typeof e ? k(e) : e.toString()).join("|")})$`), e._zod.parse = (t, n)=>{
        let r = t.value;
        return a.has(r) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: r,
            inst: e
        }), t;
    };
}), ei = s("$ZodLiteral", (e, t)=>{
    if (I.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? k(e) : e ? k(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i)=>{
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
const eo = s("$ZodOptional", (e, t)=>{
    I.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
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
}), es = s("$ZodNullable", (e, t)=>{
    I.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)}|null)$`) : void 0;
    }), g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), el = s("$ZodCatch", (e, t)=>{
    I.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, n)=>{
        if ("backward" === n.direction) return t.innerType._zod.run(e, n);
        let r = t.innerType._zod.run(e, n);
        return r instanceof Promise ? r.then((r)=>(e.value = r.value, r.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: r.issues.map((e)=>T(e, n, c()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = r.value, r.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: r.issues.map((e)=>T(e, n, c()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ed = s("$ZodLazy", (e, t)=>{
    I.init(e, t), g(e._zod, "innerType", ()=>t.getter()), g(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), g(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), g(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), g(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n)=>e._zod.innerType._zod.run(t, n);
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
const ec = s("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    I.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>A(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>M(e, t, n), e.parseAsync = async (t, n)=>C(e, t, n, {
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
        }), e.with = e.check, e.clone = (t, n)=>x(e, t, n), e.brand = ()=>e, e.register = (t, n)=>(t.add(e, n), e), e.apply = (t)=>t(e);
}), eu = s("ZodMiniString", (e, t)=>{
    q.init(e, t), ec.init(e, t);
});
function ep(e) {
    return new eu({
        type: "string",
        ...j(e)
    });
}
const e_ = s("ZodMiniNumber", (e, t)=>{
    B.init(e, t), ec.init(e, t);
});
function ef(e) {
    return new e_({
        type: "number",
        checks: [],
        ...j(e)
    });
}
const eh = s("ZodMiniBoolean", (e, t)=>{
    W.init(e, t), ec.init(e, t);
});
function eg(e) {
    return new eh({
        type: "boolean",
        ...j(e)
    });
}
const ev = s("ZodMiniNull", (e, t)=>{
    J.init(e, t), ec.init(e, t);
}), ey = s("ZodMiniNever", (e, t)=>{
    K.init(e, t), ec.init(e, t);
});
function em(e) {
    return new ey({
        type: "never",
        ...j(e)
    });
}
const eb = s("ZodMiniArray", (e, t)=>{
    G.init(e, t), ec.init(e, t);
});
function ew(e, t) {
    return new eb({
        type: "array",
        element: e,
        ...j(t)
    });
}
const ez = s("ZodMiniObject", (e, t)=>{
    Q.init(e, t), ec.init(e, t), g(e, "shape", ()=>t.shape);
});
function ek(e, t) {
    return new ez({
        type: "object",
        shape: e ?? {},
        ...j(t)
    });
}
const ex = s("ZodMiniUnion", (e, t)=>{
    ee.init(e, t), ec.init(e, t);
});
function ej(e, t) {
    return new ex({
        type: "union",
        options: e,
        ...j(t)
    });
}
const eP = s("ZodMiniDiscriminatedUnion", (e, t)=>{
    et.init(e, t), ec.init(e, t);
});
function e$(e, t, n) {
    return new eP({
        type: "union",
        options: t,
        discriminator: e,
        ...j(n)
    });
}
const eO = s("ZodMiniRecord", (e, t)=>{
    en.init(e, t), ec.init(e, t);
});
function eE(e, t, n) {
    return new eO({
        type: "record",
        keyType: e,
        valueType: t,
        ...j(n)
    });
}
const eT = s("ZodMiniEnum", (e, t)=>{
    er.init(e, t), ec.init(e, t), e.options = Object.values(t.entries);
});
function eS(e, t) {
    return new eT({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...j(t)
    });
}
const eN = s("ZodMiniLiteral", (e, t)=>{
    ei.init(e, t), ec.init(e, t);
});
function eZ(e, t) {
    return new eN({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...j(t)
    });
}
const eA = s("ZodMiniOptional", (e, t)=>{
    eo.init(e, t), ec.init(e, t);
});
function eL(e) {
    return new eA({
        type: "optional",
        innerType: e
    });
}
const eC = s("ZodMiniNullable", (e, t)=>{
    es.init(e, t), ec.init(e, t);
});
function eM(e) {
    return new eC({
        type: "nullable",
        innerType: e
    });
}
const eR = s("ZodMiniCatch", (e, t)=>{
    el.init(e, t), ec.init(e, t);
}), eU = s("ZodMiniLazy", (e, t)=>{
    ed.init(e, t), ec.init(e, t);
});
function eD() {
    let e = new eU({
        type: "lazy",
        getter: ()=>ej([
                ep(),
                ef(),
                eg(),
                new ev({
                    type: "null",
                    ...j(void 0)
                }),
                ew(e),
                eE(ep(), e)
            ])
    });
    return e;
}
ek({
    error: ej([
        ep(),
        ek({
            code: ep(),
            message: ep()
        })
    ])
}), ek({
    status: eZ("pending"),
    job: ep()
}), e$("status", [
    ek({
        status: eZ("pending")
    }),
    ek({
        status: eZ("ready"),
        chunk: ef(),
        chunks: ef(),
        bytes: ef(),
        data: ep()
    })
]);
let eF = ep(), eV = ef(), eI = eg(), eq = eL(eF), eB = eL(eV), eW = eL(eI);
const eJ = eS([
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
]), eK = eS([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), eX = ek({
    id: eF,
    name: eL(eM(eF)),
    kind: eS([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eF,
    state: eF,
    reason: eq,
    revision: eq,
    current_revision: eW,
    management_fresh: eW,
    operation_id: eB,
    task_id: eL(eM(eV)),
    updated_at: eB,
    changes: eL(ew(ek({
        name: eF,
        desired: eF
    })))
});
let eG = ek({
    state: eF,
    reason: eq,
    task_id: eL(eM(eV)),
    instance: eB
});
const eH = ek({
    cwmp_id: eF,
    state: eS([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: eI,
    last_inform: eM(eV),
    age_seconds: eM(eV)
});
let eQ = ek({
    state: eS([
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
    method: eq,
    reason: eq,
    mqtt_target: eM(eF),
    binding_source: eq,
    link_identity_error: eM(eF),
    mqtt_last_seen: eM(eV),
    cwmp_id: eq,
    desired_version: eq,
    generation: eB,
    inflight: eW,
    attempts: eB,
    next_retry_at: eB,
    updated_at: eB,
    settings_verified_at: eM(eV),
    last_inform: eM(eV),
    last_error: eL(eM(eF)),
    persistence_error: eL(eM(eF)),
    desired: eL(eM(ek({
        vlan: eV,
        vlans: ew(eV),
        priority: eV,
        acs_url: eF
    }))),
    listener: eL(ek({
        enabled: eI,
        listen: eF,
        path: eF,
        error: eM(eF)
    })),
    endpoint_notice: eq,
    manual_steps: eL(ew(eF))
});
const eY = e$("state", [
    eQ,
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
                return v(this, "shape", n), n;
            }
        });
        return x(e, r);
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
                    t[e] && (r[e] = eA ? new eA({
                        type: "optional",
                        innerType: n[e]
                    }) : n[e]);
                }
                else for(let e in n)r[e] = eA ? new eA({
                    type: "optional",
                    innerType: n[e]
                }) : n[e];
                return v(this, "shape", r), r;
            },
            checks: []
        });
        return x(e, r);
    }(eQ), {
        state: eS([
            "pending",
            "unavailable"
        ]),
        reason: eF
    })
]), e0 = ek({
    backend: eL(ek({
        configured: eF,
        effective: eF,
        available: ew(eF),
        reason: eF
    })),
    state: eJ,
    operation_id: eB,
    device: eq,
    optical_sn: eq,
    cwmp_id: eq,
    revision: eq,
    mode: eL(eS([
        "apply",
        "plan"
    ])),
    started_at: eB,
    current_revision: eW,
    management_fresh: eW,
    reason: eq,
    error: eq,
    attempts: eB,
    next_retry_at: eB,
    reconcile_reason: eq,
    items: ew(eX),
    cwmp_contract: eL(ek({
        state: eF,
        requested: eF,
        contract: eM(eF),
        reason: eF,
        cache_hit: eI,
        schema: eF,
        capabilities: eM(ek({
            wan: eF,
            wlan: eF,
            binding: eF
        }))
    })),
    wan_objects: eL(eE(eF, eD())),
    wan_lifecycle: eL(eE(eF, eG)),
    wan_stage: eL(eS([
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
    wifi_objects: eL(ek({
        owned: ew(eV),
        pending: eM(eF),
        pending_instance: eM(eV)
    })),
    wifi_lifecycle: eL(eE(eF, eG)),
    wifi_stage: eL(eS([
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
    wifi_cleanup: eL(eS([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e1 = ek({
    enabled: eI,
    mode: eS([
        "auto",
        "manual"
    ]),
    vlan: ew(eV),
    priority: eV,
    address: eF,
    acs_url: eF,
    port: eV,
    path: eF,
    dhcp_enabled: eI
}), e2 = ek({
    state: eS([
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
    error: eM(eF),
    inflight: eI,
    ready: eI,
    desired_version: eM(eF),
    applied_version: eM(eF),
    next_retry_at: eV,
    attempts: eV,
    desired: eM(e1),
    applied: eM(e1),
    previous: eM(e1),
    plan: ew(ek({
        operation: eF,
        key: eF,
        value: ew(eF)
    }))
});
const e5 = ek({
    device: eF,
    name: eM(eF),
    group: eM(eF),
    group_name: eM(eF),
    template: eM(eF),
    template_name: eM(eF),
    optical_sn: eF,
    adapter: eF,
    omci_management: ek({
        state: eF,
        reason: eL(eM(eF))
    }),
    management: eM(eH),
    acs_bootstrap: eY,
    provisioning: e0,
    services: ew(eX),
    ssids: ew(eX),
    wifi_sync: eK
}), e6 = ek({
    enabled: eI,
    mode: eS([
        "auto",
        "manual"
    ]),
    method: eZ("diff"),
    revision: eF,
    triggers: ew(eF),
    interval_minutes: new e_({
        type: "number",
        coerce: !0,
        checks: [],
        ...j(void 0)
    }),
    error: eM(eF),
    devices: ew(e5),
    management_network: e2,
    omci_management: eD(),
    groups: ew(ek({
        id: eF,
        name: eM(eF),
        template: eF
    })),
    pending_devices: ew(eF)
});
ej([
    ek({
        valid: eZ(!0),
        revision: eF,
        devices: eV,
        error: eL(em())
    }),
    ek({
        error: eF,
        valid: eL(em()),
        revision: eL(em()),
        devices: eL(em())
    })
]);
let e8 = ep(), e3 = ef(), e4 = eM(e3), e9 = eE(e8, ek({
    source: e8,
    unit: e8,
    reason: eM(e8),
    raw: eM(e8),
    age_seconds: e4
}));
const e7 = ek({
    phase: eS([
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
    generation: e3,
    error: eM(e8)
}), te = eS([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tt = ek({
    model: e8,
    wavelength_tx_nm: e3,
    wavelength_rx_nm: e3,
    phy_rate_downlink_gbps: e3,
    phy_rate_uplink_gbps: e3,
    tx_power_dbm: e4,
    laser_bias_current_ma: e4,
    temperature_celsius: e4,
    vcc_voltage: e4,
    cdr_locked: eM(eg()),
    tx_enabled: eM(eg()),
    measurements: e9
}), tn = ek({
    equipment_id: eM(e8),
    hardware_version: eM(e8),
    software_images: ew(e8),
    omcc_version: e4,
    errors: ew(e8)
});
const tr = ek({
    onu_id: e3,
    vendor: e8,
    model: e8,
    serial_number: e8,
    state: te,
    business_status: e7,
    management: eM(eH),
    provisioning: eM(e0),
    services: ew(eX),
    ssids: ew(eX),
    wifi_sync: eK,
    acs_bootstrap: eL(eY),
    identity: eM(tn),
    identity_age_seconds: e4,
    identity_current: eg(),
    fiber_distance_m: e4,
    ranging_delay_rtd_ns: e4,
    equalization_delay_bits: new eR({
        type: "catch",
        innerType: e4,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: e4,
    optical_tx_power_dbm: e4,
    firmware_version: e8,
    hardware_version: e8,
    uptime_seconds: e4,
    data_path: ek({
        interface: e8,
        gem_ports: eM(ew(e3)),
        vlan_id: e4,
        tx_bytes: e4,
        rx_bytes: e4,
        current_tx_kbps: e4,
        current_rx_kbps: e4,
        offload: eL(ek({
            enabled: eL(eM(eg())),
            routed_enabled: eL(eM(eg())),
            bridge_enabled: eL(eM(eg())),
            engine_attached: eL(eM(eg())),
            forwarding_verified: eL(eM(eg()))
        })),
        measurements: e9
    }),
    wifi_mesh: ek({
        channel_2g: e4,
        channel_5g: e4,
        bandwidth_5g: eM(e8),
        tx_power_pct: e4,
        measurements: e9
    }),
    connected_clients: eM(ew(ek({
        mac: e8,
        ip: e8,
        band: e8,
        rssi_dbm: e4,
        rx_rate_mbps: e4,
        tx_rate_mbps: e4
    }))),
    measurements: e9
});
let ti = ek({
    reserved_sn: eL(e8),
    port: e3,
    interface: e8,
    carrier: eg(),
    status: e8,
    onu_id: eL(e3),
    onu_sn: eL(e8),
    link_state: e8
});
const ta = ek({
    counters_valid: eL(eg()),
    packets_exact: eL(e8),
    bytes_exact: eL(e8),
    index: e8,
    state: e8,
    pkt_type: e8,
    orig_tuple: e8,
    new_tuple: e8,
    eth: e8,
    vlan: e8,
    packets: e3,
    bytes: e3
}), to = ek({
    sampled_at_ms: eL(e3),
    errors: eL(ew(e8)),
    config_valid: eL(eg()),
    engine_valid: eL(eg()),
    mask_valid: eL(eg()),
    routed_mask_valid: eL(eg()),
    debug_valid: eL(eg()),
    flows_valid: eL(eg()),
    entries_valid: eL(eg()),
    counters_valid: eL(eg()),
    hooks_valid: eL(eg()),
    total_packets_exact: eL(e8),
    total_bytes_exact: eL(e8),
    supported: eg(),
    engine_attached: eg(),
    bridge_offload_enabled: eg(),
    bridge_offload_mask: e3,
    routed_offload_mask: e3,
    bridge_offload_debug: eg(),
    bridge: e8,
    active_ports: ew(e8),
    fw4_hooks_ready: eg(),
    total_entries: e3,
    bound_entries: e3,
    total_packets: e3,
    total_bytes: e3,
    bound_flows: ew(ta)
});
ek({
    onu_pinning: eL(ek({
        desired: eE(e8, e3),
        active: eE(e8, e3),
        pending_restart: eg(),
        allocation_blocked: eg(),
        startup_error: eM(e8),
        config_error: eM(e8)
    })),
    fpga_status: e8,
    provisioning: eM(e6),
    optical_transceiver: tt,
    switch_ports: ew(ti),
    sub_gateways: ew(tr),
    telemetry_gateways: ew(ek({
        id: e8,
        last_seen_sec_ago: e3,
        last_payload_bytes: e3
    })),
    npu: eL(eM(to))
}), eE(e8, ek({
    carrier: eL(eg()),
    mac: eL(e8),
    link: eL(ek({
        speed: eL(e3),
        duplex: eL(e8),
        autoneg: eL(eg())
    })),
    stats: eL(eE(e8, e3))
})), _("Not started"), _("Collecting identity"), _("Retrying identity"), _("Unsupported"), _("Configuring"), _("Verifying"), _("WAN pending"), _("Verified"), _("Retrying"), _("Offline"), L.rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: !0
}), L.rpc.declare({
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
}), ek({
    schema_version: eZ(1),
    status: eS([
        "success",
        "error"
    ]),
    action: eS([
        "optical_on",
        "optical_off",
        "optical_status",
        "optical_reload",
        "optical_reinitialize",
        "optical_shutdown"
    ]),
    desired_enabled: eM(eg()),
    tx_enabled: eM(eg()),
    actor_state: eS([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: eg(),
    discovery_active: eg(),
    cleanup_pending: eg(),
    error: eM(ek({
        code: ep(),
        message: ep()
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
const ts = ek({
    status: eS([
        "success",
        "error"
    ]),
    enabled: eL(eg()),
    error: eL(ep())
});
let tl = L.rpc.declare({
    object: "luci.fttr",
    method: "npu_status",
    reject: !0
}), td = L.rpc.declare({
    object: "luci.fttr",
    method: "npu_set",
    params: [
        "enabled",
        "bridge"
    ],
    reject: !0
});
const tc = async ()=>to.parse(await tl()), tu = async function(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    return ts.parse(await td(e, t));
};
function tp(e, t) {
    return !0 === t && void 0 !== e && /^(0|[1-9][0-9]*)$/.test(e) ? BigInt(e).toLocaleString() : "\u2014";
}
function t_(e, t) {
    return !0 === t ? `0x${e.toString(16).padStart(4, "0")} (${e})` : "\u2014";
}
function tf(e, t) {
    var n;
    return n = {
        class: "fttr-npu-row",
        children: [
            o("span", {
                children: e
            }),
            o("strong", {
                children: t
            })
        ]
    }, o("div", n);
}
function th(e, t, n, r) {
    return o("span", {
        class: `fttr-npu-state ${!0 === t ? e ? "ready" : "pending" : ""}`,
        children: !0 === t ? e ? n : r : _("Unknown")
    });
}
ej([
    ek({
        operation_ids: ew(ef()),
        revision: ep()
    }),
    ek({
        started: eZ(!0),
        mode: eS([
            "apply",
            "plan"
        ])
    }),
    ek({
        reset: eZ(!0),
        device: ep()
    }),
    ek({
        operation_ids: ew(ef()),
        mode: eS([
            "apply",
            "plan"
        ]),
        reconcile: eL(eg()),
        retry: eL(eg())
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
}), ek({
    source: eS([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: ep(),
    size: ef(),
    sha256: ep(),
    data: eL(ep()),
    factory: ek({
        detected: eg(),
        device: ep(),
        has_data: eg(),
        sha256: ep(),
        data: ep()
    }),
    firmware: ek({
        exists: eg(),
        path: ep(),
        size: ef(),
        sha256: ep(),
        data: ep()
    }),
    error: eL(ep())
}), ek({
    success: eg(),
    path: ep(),
    size: ef(),
    sha256: ep(),
    error: eL(ep())
}), ek({
    success: eg(),
    output: eL(ep()),
    error: eL(ep())
});
let main = L.view.extend({
    render: function() {
        var e, t;
        let n, r, i = !1, a = !1, s = 0, l = 0, d = o("input", {
            id: "fttr-npu-enabled",
            type: "checkbox",
            disabled: !0,
            onchange: ()=>{
                a = !0;
            }
        }), c = o("input", {
            id: "fttr-npu-bridge",
            type: "text",
            maxLength: 15,
            disabled: !0,
            oninput: ()=>{
                a = !0;
            }
        }), u = o("p", {
            "aria-live": "polite"
        }), p = o("p", {
            "aria-live": "polite",
            children: _("Loading\u2026")
        }), f = o("div", {}), h = o("button", {
            type: "button",
            class: "cbi-button cbi-button-apply",
            disabled: !0,
            children: _("Save NPU configuration")
        }), g = o("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            children: _("Refresh")
        }), v = ()=>{
            d.disabled = c.disabled = h.disabled = i || !L.hasViewPermission() || !n?.supported || !0 !== n.config_valid || !l || Date.now() - l > 12000, g.disabled = i || !!r;
        }, y = async ()=>{
            if (r || i) return r;
            let e = s;
            return r = (async ()=>{
                try {
                    var t, u, h, g, y, m, b, w, z, k, x, j, P, $, O, T, S, N, Z, A, C, M, R;
                    let r, v = await Promise.race([
                        tc(),
                        new Promise((e, t)=>{
                            r = setTimeout(()=>t(Error(_("NPU status request timed out"))), 10000);
                        })
                    ]).finally(()=>clearTimeout(r));
                    if (e !== s || i) return;
                    n = v, l = Date.now(), !a && v.config_valid && (d.checked = v.bridge_offload_enabled, c.value = v.bridge), f.replaceChildren(v.supported ? (M = {
                        children: [
                            void 0 === v.sampled_at_ms ? (t = {
                                class: "alert-message warning",
                                children: _("Backend reliability metadata is unavailable. Update fttrctl before trusting these readings.")
                            }, o("p", t)) : null,
                            v.errors?.length ? (g = {
                                class: "alert-message warning",
                                children: [
                                    (u = {
                                        children: _("Some data sources are unavailable")
                                    }, o("strong", u)),
                                    (h = {
                                        children: v.errors.map((e)=>{
                                            var t;
                                            return t = {
                                                children: e
                                            }, o("li", t);
                                        })
                                    }, o("ul", h))
                                ]
                            }, o("div", g)) : null,
                            (j = {
                                class: "fttr-npu-grid",
                                children: [
                                    (b = {
                                        class: "cbi-section",
                                        children: [
                                            (y = {
                                                children: _("Engine and admission status")
                                            }, o("h3", y)),
                                            tf(_("Saved configuration"), th(v.bridge_offload_enabled, v.config_valid, _("Enabled"), _("Disabled"))),
                                            tf(_("NPU engine"), th(v.engine_attached, v.engine_valid, _("Attached"), _("Detached"))),
                                            tf(_("Port admission"), th(0 !== v.bridge_offload_mask, v.mask_valid, _("Admitted"), _("Not admitted"))),
                                            tf(_("Managed bridge"), v.config_valid ? v.bridge : "\u2014"),
                                            tf(_("Bridge offload mask"), t_(v.bridge_offload_mask, v.mask_valid)),
                                            tf(_("Admitted ports"), v.mask_valid ? v.active_ports.join(", ") || _("None") : "\u2014"),
                                            tf(_("Firewall hooks"), th(v.fw4_hooks_ready, v.hooks_valid, _("Ready"), _("Not ready"))),
                                            tf(_("Routed offload mask"), t_(v.routed_offload_mask, v.routed_mask_valid)),
                                            tf(_("Driver debug logging"), th(v.bridge_offload_debug, v.debug_valid, _("Enabled"), _("Disabled"))),
                                            (m = {
                                                class: "fttr-npu-note",
                                                children: _("Admission allows eligible traffic to bind; it does not prove that packets are currently hardware-forwarded. The switch controls FTTR bridge admission, not the entire NPU or global routed offload policy.")
                                            }, o("p", m))
                                        ]
                                    }, o("div", b)),
                                    (x = {
                                        class: "cbi-section",
                                        children: [
                                            (w = {
                                                children: _("PPE flow snapshot")
                                            }, o("h3", w)),
                                            tf(_("Bound hardware flows"), v.flows_valid ? v.bound_entries : "\u2014"),
                                            tf(_("Current non-empty FOE entries"), v.entries_valid ? v.total_entries : "\u2014"),
                                            tf(_("Current bound-flow packets"), tp(v.total_packets_exact, v.counters_valid)),
                                            tf(_("Current bound-flow bytes"), tp(v.total_bytes_exact, v.counters_valid)),
                                            (z = {
                                                class: "fttr-npu-note",
                                                children: _("Source: PPE debugfs bind/entries and driver sysfs. These are global PPE snapshots, not FTTR-only totals or table capacity. Reads are sequential, not atomic.")
                                            }, o("p", z)),
                                            (k = {
                                                class: "fttr-npu-note",
                                                children: _("Counters cover only currently bound flows and may decrease when flows expire. Driver-exported zeroes are not proof of no traffic. AN7581 native L2B counters are unavailable; \u2014 means unavailable, not zero.")
                                            }, o("p", k))
                                        ]
                                    }, o("div", x))
                                ]
                            }, o("div", j)),
                            (C = {
                                class: "cbi-section",
                                children: [
                                    (P = {
                                        children: _("Active hardware offload flows (PPE FOE Bound)")
                                    }, o("h3", P)),
                                    v.flows_valid ? 0 === v.bound_flows.length ? ($ = {
                                        children: _("No bound hardware flows in this snapshot.")
                                    }, o("p", $)) : (Z = {
                                        style: "overflow-x:auto",
                                        children: (N = {
                                            class: "table fttr-npu-flows",
                                            children: [
                                                (T = {
                                                    children: (O = {
                                                        children: [
                                                            _("Index"),
                                                            _("Type"),
                                                            _("Original endpoints"),
                                                            _("Translated endpoints"),
                                                            _("Ethernet / MAC"),
                                                            _("VLAN"),
                                                            _("Packets"),
                                                            _("Bytes")
                                                        ].map((e)=>{
                                                            var t;
                                                            return t = {
                                                                children: e
                                                            }, o("th", t);
                                                        })
                                                    }, o("tr", O))
                                                }, o("thead", T)),
                                                (S = {
                                                    children: v.bound_flows.map((e)=>{
                                                        var t, n, r, i, a, s, l, d, c, u, p, f, h;
                                                        return h = {
                                                            children: [
                                                                (n = {
                                                                    children: (t = {
                                                                        children: e.index
                                                                    }, o("code", t))
                                                                }, o("td", n)),
                                                                (r = {
                                                                    children: e.pkt_type
                                                                }, o("td", r)),
                                                                (a = {
                                                                    children: (i = {
                                                                        children: e.orig_tuple || "\u2014"
                                                                    }, o("code", i))
                                                                }, o("td", a)),
                                                                (l = {
                                                                    children: (s = {
                                                                        children: e.new_tuple || "\u2014"
                                                                    }, o("code", s))
                                                                }, o("td", l)),
                                                                (c = {
                                                                    children: (d = {
                                                                        children: e.eth || "\u2014"
                                                                    }, o("code", d))
                                                                }, o("td", c)),
                                                                (u = {
                                                                    children: e.vlan || "\u2014"
                                                                }, o("td", u)),
                                                                (p = {
                                                                    children: tp(e.packets_exact, e.counters_valid && v.engine_valid && v.engine_attached)
                                                                }, o("td", p)),
                                                                (f = {
                                                                    children: tp(e.bytes_exact, e.counters_valid && v.engine_valid && v.engine_attached)
                                                                }, o("td", f))
                                                            ]
                                                        }, o("tr", h);
                                                    })
                                                }, o("tbody", S))
                                            ]
                                        }, o("table", N))
                                    }, o("div", Z)) : (A = {
                                        children: _("Flow table is unavailable. A failed read must not be interpreted as an empty table.")
                                    }, o("p", A))
                                ]
                            }, o("div", C))
                        ]
                    }, o("div", M)) : (R = {
                        class: "cbi-section",
                        children: _("NPU hardware acceleration is not compiled or unsupported on this target.")
                    }, o("div", R))), p.textContent = `${_("Last successful sample")}: ${v.sampled_at_ms ? new Date(v.sampled_at_ms).toLocaleString() : _("Unknown")} \xb7 ${_("Refresh interval: 3 seconds")}`;
                } catch (t) {
                    if (e !== s || i) return;
                    l = 0, f.replaceChildren(o("p", {
                        class: "alert-message warning",
                        children: _("Live NPU data is unavailable. Previous readings are stale.")
                    })), p.textContent = `${_("Refresh failed")}: ${String(t)}`;
                } finally{
                    r = void 0, v();
                }
            })(), v(), r;
        };
        g.onclick = ()=>{
            y();
        }, h.onclick = async ()=>{
            if (h.disabled || i) return;
            let e = c.value.trim(), t = d.checked, o = !1;
            if (!/^[a-zA-Z0-9_.-]{1,15}$/.test(e)) {
                u.textContent = _("Use a bridge interface name of 1\u201315 letters, digits, dots, underscores or hyphens.");
                return;
            }
            i = !0, s++, v(), u.textContent = _("Saving\u2026");
            try {
                let n = await tu(t, e);
                if ("success" !== n.status) throw Error(n.error || _("Failed to save NPU configuration"));
                a = !1, o = !0, u.textContent = _("Configuration saved. Waiting for driver admission readback; enabling may take several seconds and requires eligible ports and firewall policy.");
            } catch (e) {
                u.textContent = `${_("NPU configuration failed")}: ${String(e)}`;
            } finally{
                await r, i = !1, await y(), !o || l && n?.config_valid && n.bridge === e && n.bridge_offload_enabled === t || (u.textContent = _("Save returned success, but configuration readback could not be confirmed. Refresh before retrying.")), v();
            }
        };
        let m = (t = {
            class: "cbi-map fttr-npu",
            children: [
                o("style", {
                    children: ".fttr-npu-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px}.fttr-npu-row{display:flex;justify-content:space-between;gap:16px;padding:7px 0;border-bottom:1px dashed #8884}.fttr-npu-row strong{text-align:right;overflow-wrap:anywhere}.fttr-npu-note{opacity:.75;font-size:90%;line-height:1.5}.fttr-npu-state{padding:2px 6px;border:1px solid #8886;border-radius:4px}.fttr-npu-state.ready{color:#2b8;border-color:#2b86}.fttr-npu-state.pending{color:#d90;border-color:#d906}.fttr-npu label{display:inline-flex;gap:8px;align-items:center;margin:8px 20px 8px 0}.fttr-npu-flows{font-size:85%}.fttr-npu-flows td{overflow-wrap:anywhere}"
                }),
                o("h2", {
                    children: _("NPU hardware acceleration")
                }),
                (e = {
                    class: "cbi-section",
                    children: [
                        o("h3", {
                            children: _("NPU configuration")
                        }),
                        o("label", {
                            htmlFor: "fttr-npu-enabled",
                            children: [
                                d,
                                _("Enable FTTR bridge hardware offload")
                            ]
                        }),
                        o("label", {
                            htmlFor: "fttr-npu-bridge",
                            children: [
                                _("Bridge interface"),
                                c
                            ]
                        }),
                        o("div", {
                            children: [
                                h,
                                " ",
                                g
                            ]
                        }),
                        u
                    ]
                }, o("div", e)),
                p,
                f
            ]
        }, o("div", t));
        return y(), L.Poll.add(async ()=>{
            m.isConnected && (l && Date.now() - l > 12000 && (l = 0, f.replaceChildren(o("p", {
                class: "alert-message warning",
                children: _("Live NPU data is unavailable. Previous readings are stale.")
            })), v()), await y());
        }, 3), m;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;