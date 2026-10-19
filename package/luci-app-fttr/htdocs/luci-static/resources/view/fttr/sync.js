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
const g = Symbol("evaluating");
function h(e, t, n) {
    let r;
    Object.defineProperty(e, t, {
        get () {
            if (r !== g) return void 0 === r && (r = g, r = n()), r;
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
function A(e) {
    return "string" == typeof e ? e : e?.message;
}
function T(e, t, n) {
    let r = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (r.message = A(e.inst?._zod.def?.error?.(e)) ?? A(t?.error?.(e)) ?? A(n.customError?.(e)) ?? A(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
const O = (e, t)=>{
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
}, C = o("$ZodError", O), M = o("$ZodError", O, {
    Parent: Error
}), $ = (t = M, (e, n, r, i)=>{
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
        let e = new (i?.Err ?? t)(s.issues.map((e)=>T(e, a, c())));
        throw v(e, i?.callee), e;
    }
    return s.value;
}), N = (n = M, async (e, t, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (i?.Err ?? n)(s.issues.map((e)=>T(e, a, c())));
        throw v(e, i?.callee), e;
    }
    return s.value;
}), Z = (r = M, (e, t, n)=>{
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
        error: new (r ?? C)(a.issues.map((e)=>T(e, i, c())))
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
        error: new i(a.issues.map((e)=>T(e, r, c())))
    } : {
        success: !0,
        data: a.value
    };
}), W = /^-?\d+(?:\.\d+)?$/, I = /^(?:true|false)$/i, D = /^null$/i, V = {
    major: 4,
    minor: 3,
    patch: 6
}, F = o("$ZodType", (e, t)=>{
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
    h(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = Z(e, t);
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
}), q = o("$ZodString", (e, t)=>{
    var n;
    let r;
    F.init(e, t), e._zod.pattern = [
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
    F.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? W, e._zod.parse = (n, r)=>{
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
    F.init(e, t), e._zod.pattern = I, e._zod.parse = (n, r)=>{
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
    F.init(e, t), e._zod.pattern = D, e._zod.values = new Set([
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
}), G = o("$ZodNever", (e, t)=>{
    F.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function H(e, t, n) {
    e.issues.length && t.issues.push(...P(n, e.issues)), t.value[n] = e.value;
}
const K = o("$ZodArray", (e, t)=>{
    F.init(e, t), e._zod.parse = (n, r)=>{
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
            o instanceof Promise ? a.push(o.then((t)=>H(t, n, e))) : H(o, n, e);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
});
function Q(e, t, n, r, i) {
    if (e.issues.length) {
        if (i && !(n in r)) return;
        t.issues.push(...P(n, e.issues));
    }
    void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const X = o("$ZodObject", (e, t)=>{
    let n;
    F.init(e, t);
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
    h(e._zod, "propValues", ()=>{
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
            a instanceof Promise ? o.push(a.then((n)=>Q(n, t, e, s, i))) : Q(a, t, e, s, i);
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
                a instanceof Promise ? e.push(a.then((e)=>Q(e, n, i, t, c))) : Q(a, n, i, t, c);
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
        errors: e.map((e)=>e.issues.map((e)=>T(e, r, c())))
    }), t);
}
const ee = o("$ZodUnion", (e, t)=>{
    F.init(e, t), h(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), h(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), h(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), h(e._zod, "pattern", ()=>{
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
    h(e._zod, "propValues", ()=>{
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
    F.init(e, t), e._zod.parse = (n, r)=>{
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
                    issues: o.issues.map((e)=>T(e, r, c())),
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
    F.init(e, t);
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
    if (F.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
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
    F.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", h(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), h(e._zod, "pattern", ()=>{
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
    F.init(e, t), h(e._zod, "optin", ()=>t.innerType._zod.optin), h(e._zod, "optout", ()=>t.innerType._zod.optout), h(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)}|null)$`) : void 0;
    }), h(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), el = o("$ZodCatch", (e, t)=>{
    F.init(e, t), h(e._zod, "optin", ()=>t.innerType._zod.optin), h(e._zod, "optout", ()=>t.innerType._zod.optout), h(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, n)=>{
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
}), ed = o("$ZodLazy", (e, t)=>{
    F.init(e, t), h(e._zod, "innerType", ()=>t.getter()), h(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), h(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), h(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), h(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n)=>e._zod.innerType._zod.run(t, n);
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
    F.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>$(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>Z(e, t, n), e.parseAsync = async (t, n)=>N(e, t, n, {
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
    q.init(e, t), ec.init(e, t);
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
function eg(e) {
    return new ef({
        type: "number",
        checks: [],
        ...j(e)
    });
}
const eh = o("ZodMiniBoolean", (e, t)=>{
    B.init(e, t), ec.init(e, t);
});
function em(e) {
    return new eh({
        type: "boolean",
        ...j(e)
    });
}
const ey = o("ZodMiniNull", (e, t)=>{
    J.init(e, t), ec.init(e, t);
}), ev = o("ZodMiniNever", (e, t)=>{
    G.init(e, t), ec.init(e, t);
});
function e_(e) {
    return new ev({
        type: "never",
        ...j(e)
    });
}
const eb = o("ZodMiniArray", (e, t)=>{
    K.init(e, t), ec.init(e, t);
});
function ew(e, t) {
    return new eb({
        type: "array",
        element: e,
        ...j(t)
    });
}
const ez = o("ZodMiniObject", (e, t)=>{
    X.init(e, t), ec.init(e, t), h(e, "shape", ()=>t.shape);
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
const eA = o("ZodMiniRecord", (e, t)=>{
    en.init(e, t), ec.init(e, t);
});
function eT(e, t, n) {
    return new eA({
        type: "record",
        keyType: e,
        valueType: t,
        ...j(n)
    });
}
const eO = o("ZodMiniEnum", (e, t)=>{
    er.init(e, t), ec.init(e, t), e.options = Object.values(t.entries);
});
function eC(e, t) {
    return new eO({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...j(t)
    });
}
const eM = o("ZodMiniLiteral", (e, t)=>{
    ei.init(e, t), ec.init(e, t);
});
function e$(e, t) {
    return new eM({
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
function eE(e) {
    return new eN({
        type: "optional",
        innerType: e
    });
}
const eL = o("ZodMiniNullable", (e, t)=>{
    eo.init(e, t), ec.init(e, t);
});
function eZ(e) {
    return new eL({
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
                eg(),
                em(),
                new ey({
                    type: "null",
                    ...j(void 0)
                }),
                ew(e),
                eT(eu(), e)
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
function eF(e) {
    let t = eD.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eV("rpc", e) : new eV(e.code, e.message);
    }
    return e;
}
ex({
    status: e$("pending"),
    job: eu()
}), eP("status", [
    ex({
        status: e$("pending")
    }),
    ex({
        status: e$("ready"),
        chunk: eg(),
        chunks: eg(),
        bytes: eg(),
        data: eu()
    })
]);
let eq = eu(), eU = eg(), eB = em(), eJ = eE(eq), eG = eE(eU), eH = eE(eB);
const eK = eC([
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
    "interrupted"
]), eQ = eC([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending"
]), eX = ex({
    id: eq,
    name: eE(eZ(eq)),
    kind: eC([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eq,
    state: eq,
    reason: eJ,
    revision: eJ,
    current_revision: eH,
    management_fresh: eH,
    operation_id: eG,
    task_id: eE(eZ(eU)),
    updated_at: eG,
    changes: eE(ew(ex({
        name: eq,
        desired: eq
    })))
});
let eY = ex({
    state: eq,
    reason: eJ,
    task_id: eE(eZ(eU)),
    instance: eG
});
const e0 = ex({
    cwmp_id: eq,
    state: eC([
        "online",
        "waiting_inform",
        "offline_or_stale"
    ]),
    optical_online: eB,
    last_inform: eZ(eU),
    age_seconds: eZ(eU)
});
let e1 = ex({
    state: eC([
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
    mqtt_target: eZ(eq),
    binding_source: eJ,
    link_identity_error: eZ(eq),
    mqtt_last_seen: eZ(eU),
    cwmp_id: eJ,
    desired_version: eJ,
    generation: eG,
    inflight: eH,
    attempts: eG,
    next_retry_at: eG,
    updated_at: eG,
    settings_verified_at: eZ(eU),
    last_inform: eZ(eU),
    last_error: eE(eZ(eq)),
    persistence_error: eE(eZ(eq)),
    desired: eE(eZ(ex({
        vlan: eU,
        vlans: ew(eU),
        priority: eU,
        acs_url: eq
    }))),
    listener: eE(ex({
        enabled: eB,
        listen: eq,
        path: eq,
        error: eZ(eq)
    })),
    endpoint_notice: eJ,
    manual_steps: eE(ew(eq))
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
        state: eC([
            "pending",
            "unavailable"
        ]),
        reason: eq
    })
]), e2 = ex({
    state: eK,
    operation_id: eG,
    device: eJ,
    optical_sn: eJ,
    cwmp_id: eJ,
    revision: eJ,
    mode: eE(eC([
        "apply",
        "plan"
    ])),
    started_at: eG,
    current_revision: eH,
    management_fresh: eH,
    reason: eJ,
    error: eJ,
    items: ew(eX),
    cwmp_contract: eE(ex({
        state: eq,
        requested: eq,
        contract: eZ(eq),
        reason: eq,
        cache_hit: eB,
        schema: eq,
        capabilities: eZ(ex({
            wan: eq,
            wlan: eq,
            binding: eq
        }))
    })),
    wan_objects: eE(eT(eq, eI())),
    wan_lifecycle: eE(eT(eq, eY)),
    wan_stage: eE(eC([
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
    wifi_objects: eE(ex({
        owned: ew(eU),
        pending: eZ(eq),
        pending_instance: eZ(eU)
    })),
    wifi_lifecycle: eE(eT(eq, eY)),
    wifi_stage: eE(eC([
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
    wifi_cleanup: eE(eC([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e5 = ex({
    enabled: eB,
    mode: eC([
        "auto",
        "manual"
    ]),
    vlan: ew(eU),
    priority: eU,
    address: eq,
    acs_url: eq,
    port: eU,
    path: eq,
    dhcp_enabled: eB
}), e6 = ex({
    state: eC([
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
    error: eZ(eq),
    inflight: eB,
    ready: eB,
    desired_version: eZ(eq),
    applied_version: eZ(eq),
    next_retry_at: eU,
    attempts: eU,
    desired: eZ(e5),
    applied: eZ(e5),
    previous: eZ(e5),
    plan: ew(ex({
        operation: eq,
        key: eq,
        value: ew(eq)
    }))
});
const e4 = ex({
    device: eq,
    name: eZ(eq),
    group: eZ(eq),
    group_name: eZ(eq),
    template: eZ(eq),
    template_name: eZ(eq),
    optical_sn: eq,
    adapter: eq,
    omci_management: ex({
        state: eq,
        reason: eJ
    }),
    management: eZ(e0),
    acs_bootstrap: e8,
    provisioning: e2,
    services: ew(eX),
    ssids: ew(eX),
    wifi_sync: eQ
}), e3 = ex({
    enabled: eB,
    mode: eC([
        "auto",
        "manual"
    ]),
    method: e$("diff"),
    revision: eq,
    triggers: ew(eq),
    interval: eU,
    error: eZ(eq),
    devices: ew(e4),
    management_network: e6,
    omci_management: eI(),
    groups: ew(ex({
        id: eq,
        name: eZ(eq),
        template: eq
    })),
    pending_devices: ew(eq)
}), e7 = ej([
    ex({
        valid: e$(!0),
        revision: eq,
        devices: eU,
        error: eE(e_())
    }),
    ex({
        error: eq,
        valid: eE(e_()),
        revision: eE(e_()),
        devices: eE(e_())
    })
]);
let e9 = eu(), te = eg(), tt = eZ(te), tn = eT(e9, ex({
    source: e9,
    unit: e9,
    reason: eZ(e9),
    raw: eZ(e9),
    age_seconds: tt
}));
const tr = ex({
    phase: eC([
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
    error: eZ(e9)
}), ti = eC([
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
    cdr_locked: eZ(em()),
    measurements: tn
}), ts = ex({
    equipment_id: eZ(e9),
    hardware_version: eZ(e9),
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
    management: eZ(e0),
    provisioning: eZ(e2),
    services: ew(eX),
    ssids: ew(eX),
    wifi_sync: eQ,
    acs_bootstrap: eE(e8),
    identity: eZ(ts),
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
        gem_ports: eZ(ew(te)),
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
        bandwidth_5g: eZ(e9),
        tx_power_pct: tt,
        measurements: tn
    }),
    connected_clients: eZ(ew(ex({
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
    onu_id: eE(te),
    onu_sn: eE(e9),
    link_state: e9
});
ex({
    fpga_status: e9,
    provisioning: eZ(e3),
    optical_transceiver: ta,
    switch_ports: ew(tl),
    sub_gateways: ew(to),
    telemetry_gateways: ew(ex({
        id: e9,
        last_seen_sec_ago: te,
        last_payload_bytes: te
    }))
}), eT(e9, ex({
    carrier: eE(em()),
    mac: eE(e9),
    link: eE(ex({
        speed: eE(te),
        duplex: eE(e9),
        autoneg: eE(em())
    })),
    stats: eE(eT(e9, te))
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
const tu = async ()=>e3.parse(eF(await td())), tf = async ()=>e7.parse(await tc());
let tg = ej([
    ex({
        operation_ids: ew(eg()),
        revision: eu()
    }),
    ex({
        started: e$(!0),
        mode: eC([
            "apply",
            "plan"
        ])
    }),
    ex({
        reset: e$(!0),
        device: eu()
    })
]);
const th = async (e, t)=>tg.parse(eF(await tp(e, t)));
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
}, tv = {
    "FTTR synchronization": "FTTR \u914D\u7F6E\u540C\u6B65",
    Provisioning: "\u914D\u7F6E\u4E0B\u53D1\u5F15\u64CE",
    Mode: "\u5DE5\u4F5C\u6A21\u5F0F",
    Revision: "\u7248\u672C\u53F7",
    Triggers: "\u89E6\u53D1\u4E8B\u4EF6",
    Interval: "\u8F6E\u8BE2\u95F4\u9694",
    Enabled: "\u5DF2\u542F\u7528",
    Disabled: "\u5DF2\u7981\u7528",
    "Isolated TR069 management network": "TR069 \u9694\u79BB\u7BA1\u7406\u7F51\u7EDC",
    "Management network": "\u7BA1\u7406\u7F51\u7EDC",
    "Management interface": "\u7BA1\u7406\u63A5\u53E3",
    "Management VLAN": "\u7BA1\u7406 VLAN",
    Priority: "\u4F18\u5148\u7EA7",
    "Service IP / Netmask": "\u670D\u52A1 IP / \u63A9\u7801",
    "ACS URL": "ACS \u670D\u52A1\u5730\u5740",
    "DHCP service": "DHCP \u670D\u52A1",
    "Desired version": "\u671F\u671B\u7248\u672C",
    "Applied version": "\u5DF2\u5E94\u7528\u7248\u672C",
    "Next retry": "\u4E0B\u6B21\u91CD\u8BD5",
    Synchronized: "\u5DF2\u540C\u6B65",
    "Pending apply": "\u5F85\u5E94\u7528",
    "Check management differences (read-only)": "\u68C0\u67E5\u7BA1\u7406\u5DEE\u5F02\uFF08\u53EA\u8BFB\uFF09",
    "Apply management configuration": "\u5E94\u7528\u7BA1\u7406\u7F51\u7EDC\u914D\u7F6E",
    "Saving in manual mode does not create interfaces, change firewall rules or configure child devices. Apply explicitly to authorize the current management configuration.": "\u624B\u52A8\u6A21\u5F0F\u4E0B\u4FDD\u5B58\u4E0D\u4F1A\u81EA\u52A8\u521B\u5EFA\u63A5\u53E3\u3001\u4FEE\u6539\u9632\u706B\u5899\u89C4\u5219\u6216\u914D\u7F6E\u5B50\u7F51\u5173\u3002\u8BF7\u663E\u5F0F\u70B9\u51FB\u5E94\u7528\u4EE5\u6388\u6743\u5E76\u751F\u6548\u5F53\u524D\u7BA1\u7406\u914D\u7F6E\u3002",
    "Pending configuration changes": "\u5F85\u751F\u6548\u914D\u7F6E\u53D8\u66F4",
    "No pending changes. Management network is in sync.": "\u65E0\u5F85\u751F\u6548\u53D8\u66F4\uFF0C\u7BA1\u7406\u7F51\u7EDC\u5904\u4E8E\u540C\u6B65\u72B6\u6001\u3002",
    "Advanced diagnostics / Raw configuration (JSON)": "\u9AD8\u7EA7\u8BCA\u65AD / \u539F\u59CB\u914D\u7F6E\u5DEE\u5F02 (JSON)",
    "Manual synchronization": "\u624B\u52A8\u540C\u6B65\u64CD\u4F5C",
    Target: "\u76EE\u6807\u5BF9\u8C61",
    "All devices": "\u5168\u90E8\u5B50\u7F51\u5173",
    "Preview differences (read-only)": "\u9884\u89C8\u5DEE\u5F02\uFF08\u53EA\u8BFB\uFF09",
    "Apply differences": "\u4E0B\u53D1\u5DEE\u5F02\u914D\u7F6E",
    "Reset synchronization state": "\u91CD\u7F6E\u540C\u6B65\u72B6\u6001",
    "Clear old tasks and managed-object records after a device factory reset. The next preview or apply reads the device again.": "\u5728\u5B50\u7F51\u5173\u6062\u590D\u51FA\u5382\u8BBE\u7F6E\u540E\u6E05\u9664\u5386\u53F2\u4EFB\u52A1\u548C\u6258\u7BA1\u5BF9\u8C61\u8BB0\u5F55\uFF0C\u4E0B\u6B21\u9884\u89C8\u6216\u4E0B\u53D1\u5C06\u91CD\u65B0\u8BFB\u53D6\u8BE5\u8BBE\u5907\u72B6\u6001\u3002",
    "Are you sure you want to reset the synchronization state for %s?": "\u786E\u5B9A\u8981\u91CD\u7F6E %s \u7684\u540C\u6B65\u72B6\u6001\u5417\uFF1F\u91CD\u7F6E\u540E\u5C06\u6E05\u9664\u5386\u53F2\u4EFB\u52A1\u8BB0\u5F55\uFF0C\u91CD\u65B0\u540C\u6B65\u3002",
    "Configuration item": "\u914D\u7F6E\u9879",
    Type: "\u7C7B\u578B",
    State: "\u72B6\u6001",
    "Evidence freshness": "\u8BC1\u636E\u65F6\u6548",
    "Last update / task": "\u6700\u540E\u66F4\u65B0 / \u4EFB\u52A1",
    "Reason / desired changes": "\u539F\u56E0 / \u671F\u671B\u53D8\u66F4",
    "Current configuration": "\u5F53\u524D\u4FEE\u8BA2",
    "Previous configuration": "\u5386\u53F2\u4FEE\u8BA2",
    "Management fresh": "\u6709\u6548",
    "Management stale": "\u5931\u6548",
    Task: "\u4EFB\u52A1",
    "No desired items configured.": "\u672A\u914D\u7F6E\u671F\u671B\u540C\u6B65\u9879\u3002",
    "CWMP contract": "CWMP \u5951\u7EA6\u80FD\u529B",
    Capabilities: "\u80FD\u529B\u96C6",
    Bindings: "\u7ED1\u5B9A\u5173\u7CFB",
    Schema: "\u6570\u636E\u6A21\u578B",
    Cache: "\u5951\u7EA6\u7F13\u5B58",
    Matched: "\u5DF2\u547D\u4E2D\u7F13\u5B58",
    "Fresh discovery": "\u5168\u65B0\u63A2\u6D4B\u53D1\u73B0",
    "ACS bootstrap": "ACS \u5F15\u5BFC\u4E0E\u63A5\u5165",
    Method: "\u5F15\u5BFC\u65B9\u5F0F",
    Attempts: "\u91CD\u8BD5\u6B21\u6570",
    "Command in progress": "\u6307\u4EE4\u6267\u884C\u4E2D",
    "Authorize and apply management settings": "\u6388\u6743\u5E76\u5E94\u7528\u7BA1\u7406\u8BBE\u7F6E",
    "Required after management drift or service restart; verifies the child ACS settings before business synchronization.": "\u7BA1\u7406\u7F51\u7EDC\u914D\u7F6E\u6F02\u79FB\u6216\u670D\u52A1\u91CD\u542F\u540E\u5FC5\u9700\uFF1B\u5728\u4E1A\u52A1\u540C\u6B65\u524D\u6821\u9A8C\u5B50\u7F51\u5173 ACS \u8BBE\u7F6E\u3002",
    "MQTT target": "MQTT \u4E3B\u9898",
    "Last telemetry": "\u6700\u540E\u9065\u6D4B",
    "Identity source": "\u6807\u8BC6\u6765\u6E90",
    "Settings verified": "\u8BBE\u7F6E\u6821\u9A8C\u65F6\u95F4",
    "Last Inform": "\u6700\u540E Inform",
    Generation: "\u8FED\u4EE3\u4EE3\u6570",
    Updated: "\u66F4\u65B0\u65F6\u95F4",
    "Local ACS listener": "\u672C\u5730 ACS \u76D1\u542C\u5668",
    "Management setup / reachability guidance": "\u7BA1\u7406\u7F51\u7EDC\u914D\u7F6E\u4E0E\u53EF\u8FBE\u6027\u6392\u969C\u6307\u5F15",
    "WAN / WLAN lifecycle results": "WAN / WLAN \u751F\u547D\u5468\u671F\u7ED3\u679C",
    "Managed objects and lifecycle intent": "\u6258\u7BA1\u5BF9\u8C61\u4E0E\u751F\u547D\u5468\u671F\u610F\u56FE",
    "Wi-Fi cleanup policy": "Wi-Fi \u6E05\u7406\u7B56\u7565",
    "Wi-Fi stage": "Wi-Fi \u9636\u6BB5",
    Operation: "\u64CD\u4F5C ID",
    Started: "\u542F\u52A8\u65F6\u95F4",
    Group: "\u5206\u7EC4",
    Template: "\u6A21\u677F",
    "Synchronization state reset for %s. Preview differences to read the current device state.": "\u5DF2\u91CD\u7F6E %s \u7684\u540C\u6B65\u72B6\u6001\u3002\u8BF7\u70B9\u51FB\u201C\u9884\u89C8\u5DEE\u5F02\u201D\u4EE5\u8BFB\u53D6\u8BE5\u8BBE\u5907\u7684\u6700\u65B0\u72B6\u6001\u3002",
    "Management operation started; status is refreshed below.": "\u7BA1\u7406\u7F51\u7EDC\u64CD\u4F5C\u5DF2\u542F\u52A8\uFF0C\u6700\u65B0\u72B6\u6001\u5C06\u5728\u4E0B\u65B9\u5237\u65B0\u3002",
    "Started: %s": "\u5DF2\u542F\u52A8\u64CD\u4F5C\uFF1A%s",
    "Status refresh failed: %s": "\u72B6\u6001\u5237\u65B0\u5931\u8D25\uFF1A%s",
    None: "\u65E0"
};
function t_(e) {
    let t = _(e);
    return /zh/i.test(document.documentElement.getAttribute("lang") || window.L?.env?.lang || navigator.language || "") && tv[e] ? tv[e] : t || e;
}
let tb = (e)=>null == e || "" === e ? "\u2014" : String(e), tw = (e)=>e ? new Date(1000 * e).toLocaleString() : "\u2014";
function tz(e) {
    if (!e) return s("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: "\u2014"
    });
    let t = /zh/i.test(document.documentElement.getAttribute("lang") || window.L?.env?.lang || navigator.language || ""), n = tm[e], r = t ? n?.label || e : ty[e] || e, i = n?.type || "neutral";
    return s("span", {
        class: `fttr-badge fttr-badge-${i}`,
        title: e,
        children: r
    });
}
function tx(e) {
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
                                        children: tb(e.name || e.id)
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
                                                    return "port_binding" === t ? t_("Binding") : tb(e || t);
                                            }
                                        }(e.service_type ?? "", e.kind)
                                    })
                                }, s("td", i)),
                                s("td", {
                                    children: tz(e.state)
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
                                            children: tw(e.updated_at)
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
        var t, n, r, i, a, o;
        let [l, d] = e, c = s("div", {}), p = s("p", {
            class: "alert-message warning",
            hidden: !0,
            "aria-live": "polite"
        }), u = s("div", {
            class: "fttr-sync-result",
            "aria-live": "polite",
            style: "margin:10px 0"
        }), f = (t = {
            class: "cbi-input-select",
            children: [
                s("option", {
                    value: "all",
                    children: t_("All devices")
                }),
                (l.devices ?? []).map((e)=>s("option", {
                        value: e.device,
                        children: e.name || e.device
                    }))
            ]
        }, s("select", t)), g = s("div", {}), h = s("div", {}), m = l, y = d, v = !1, b = !1, w = [], z = async (e)=>{
            if (!v) {
                v = !0, C(m);
                try {
                    var t;
                    await th("reset_state", e.device), u.replaceChildren((t = {
                        class: "alert-message info",
                        children: t_("Synchronization state reset for %s. Preview differences to read the current device state.").replace("%s", e.name || e.optical_sn)
                    }, s("div", t))), C(await tu());
                } catch (e) {
                    u.replaceChildren(s("div", {
                        class: "alert-message danger",
                        children: String(e)
                    }));
                } finally{
                    v = !1, C(m);
                }
            }
        }, x = async (e)=>{
            if (!v) {
                for (let e of (v = !0, w))e.disabled = !0;
                C(m);
                try {
                    var t;
                    let n = await th(e, f.value), r = e.startsWith("management_") ? t_("Management operation started; status is refreshed below.") : t_("Started: %s").replace("%s", "operation_ids" in n ? n.operation_ids.join(", ") : "\u2014");
                    u.replaceChildren((t = {
                        class: "alert-message info",
                        children: r
                    }, s("div", t))), C(await tu());
                } catch (e) {
                    u.replaceChildren(s("div", {
                        class: "alert-message danger",
                        children: String(e)
                    }));
                } finally{
                    v = !1, C(m);
                }
            }
        }, k = s("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: ()=>x("plan"),
            children: t_("Preview differences (read-only)")
        }), j = s("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            onclick: ()=>x("apply"),
            children: t_("Apply differences")
        });
        w.push(k, j);
        let S = s("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: ()=>x("management_plan"),
            children: t_("Check management differences (read-only)")
        }), P = s("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            onclick: ()=>x("management_apply"),
            children: t_("Apply management configuration")
        });
        w.push(S, P);
        let A = (n = {
            class: "cbi-section",
            children: [
                s("h3", {
                    children: t_("Isolated TR069 management network")
                }),
                h,
                s("p", {
                    style: "margin-top:10px",
                    children: [
                        S,
                        " ",
                        P
                    ]
                })
            ]
        }, s("div", n)), T = (a = {
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
                                f
                            ]
                        }, s("label", r)),
                        s("div", {
                            style: "display:flex;gap:8px",
                            children: [
                                k,
                                j
                            ]
                        })
                    ]
                }, s("div", i))
            ]
        }, s("div", a)), O = (o = {
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
                c,
                p,
                A,
                T,
                u,
                g
            ]
        }, s("div", o));
        function C(e) {
            var t, n, r, i, a, o, l, d, u, b, w, A, O, C, M, $, N, Z, R, W, I, D, V, F, q, U, B, J, G, H, K;
            m = e, c.replaceChildren((o = {
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
                                children: tb(e.mode)
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
                                children: tb(e.revision)
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
                    e.interval ? (a = {
                        children: [
                            s("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    t_("Interval"),
                                    ":"
                                ]
                            }),
                            s("span", {
                                children: [
                                    e.interval,
                                    " s"
                                ]
                            })
                        ]
                    }, s("span", a)) : null
                ]
            }, s("div", o)));
            let Q = [
                e.error,
                y.error ? _("Committed configuration is invalid: %s").format(y.error) : y.revision && y.revision !== e.revision ? _("Committed configuration has not been loaded. Check Configuration diagnostics; an active operation may have prevented reload.") : ""
            ].filter(Boolean);
            p.hidden = !Q.length, p.textContent = Q.join(" \u2014 ");
            let X = [
                "all",
                ...Array.from(new Set((e.devices ?? []).map((e)=>e.group).filter(Boolean))).map((e)=>`group:${e}`),
                ...(e.devices ?? []).map((e)=>e.device)
            ];
            if (Array.from(f.options).map((e)=>e.value).join("\n") !== X.join("\n")) {
                let t = f.value;
                f.replaceChildren(...X.map((t)=>s("option", {
                        value: t,
                        children: "all" === t ? t_("All devices") : t.startsWith("group:") ? (e.devices ?? []).find((e)=>`group:${e.group}` === t)?.group_name || t : (e.devices ?? []).find((e)=>e.device === t)?.name || t
                    }))), f.value = X.includes(t) ? t : "all";
            }
            T.hidden = "manual" !== e.mode || !L.hasViewPermission();
            let Y = (e.devices ?? []).filter((e)=>"all" === f.value || e.device === f.value || `group:${e.group}` === f.value).some((e)=>![
                    "completed",
                    "not_started",
                    "interrupted"
                ].includes(e.provisioning.state ?? "not_started"));
            k.disabled = v || Y || !!y.error || !!y.revision && y.revision !== e.revision || !(e.devices ?? []).length, j.disabled = k.disabled || !e.enabled;
            let ee = e.management_network;
            S.disabled = v || !!ee?.inflight || !!y.error || !L.hasViewPermission(), P.disabled = S.disabled;
            let et = ee.desired ?? ee.applied, en = ee?.plan ?? [], er = !!ee?.applied_version && !!ee?.desired_version && ee?.applied_version === ee?.desired_version;
            h.replaceChildren((K = {
                children: [
                    (A = {
                        style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:10px",
                        children: [
                            (l = {
                                children: [
                                    s("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            t_("State"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    tz(ee?.state)
                                ]
                            }, s("span", l)),
                            (d = {
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
                                        children: tb(ee?.desired_version)
                                    })
                                ]
                            }, s("span", d)),
                            (u = {
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
                                        children: tb(ee?.applied_version)
                                    })
                                ]
                            }, s("span", u)),
                            ee?.desired_version || ee?.applied_version ? (b = {
                                children: er ? s("span", {
                                    class: "fttr-badge fttr-badge-success",
                                    children: t_("Synchronized")
                                }) : s("span", {
                                    class: "fttr-badge fttr-badge-warning",
                                    children: t_("Pending apply")
                                })
                            }, s("span", b)) : null,
                            ee?.next_retry_at ? (w = {
                                children: [
                                    s("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            t_("Next retry"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    tw(ee.next_retry_at)
                                ]
                            }, s("span", w)) : null
                        ]
                    }, s("div", A)),
                    (V = {
                        class: "fttr-grid-3",
                        children: [
                            (M = {
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
                                    (C = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: t_("Management VLAN")
                                            }),
                                            s("span", {
                                                children: [
                                                    "VLAN ",
                                                    tb(et?.vlan.join(", ")),
                                                    " (Prio ",
                                                    tb(et?.priority),
                                                    ")"
                                                ]
                                            })
                                        ]
                                    }, s("div", C))
                                ]
                            }, s("div", M)),
                            (R = {
                                class: "fttr-card",
                                children: [
                                    ($ = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: t_("Service IP / Netmask")
                                            }),
                                            s("code", {
                                                children: tb(et?.address)
                                            })
                                        ]
                                    }, s("div", $)),
                                    (Z = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: t_("DHCP service")
                                            }),
                                            (N = {
                                                children: null === et ? "\u2014" : et.dhcp_enabled ? s("span", {
                                                    class: "fttr-badge fttr-badge-success",
                                                    children: t_("Enabled")
                                                }) : s("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    children: t_("Disabled")
                                                })
                                            }, s("span", N))
                                        ]
                                    }, s("div", Z))
                                ]
                            }, s("div", R)),
                            (D = {
                                class: "fttr-card",
                                children: [
                                    (W = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: t_("ACS URL")
                                            }),
                                            s("code", {
                                                style: "font-size:80%",
                                                children: tb(et?.acs_url)
                                            })
                                        ]
                                    }, s("div", W)),
                                    (I = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: t_("Mode")
                                            }),
                                            s("span", {
                                                children: tb(et?.mode)
                                            })
                                        ]
                                    }, s("div", I))
                                ]
                            }, s("div", D))
                        ]
                    }, s("div", V)),
                    en.length ? (G = {
                        style: "margin-top:10px",
                        children: [
                            s("h5", {
                                style: "margin-bottom:4px;font-size:90%",
                                children: t_("Pending configuration changes")
                            }),
                            (J = {
                                class: "table-wrapper",
                                children: (B = {
                                    class: "table",
                                    style: "font-size:85%",
                                    children: [
                                        (q = {
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
                                        }, s("thead", q)),
                                        (U = {
                                            children: en.map((e)=>{
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
                                        }, s("tbody", U))
                                    ]
                                }, s("table", B))
                            }, s("div", J))
                        ]
                    }, s("div", G)) : null,
                    ee?.error ? s("div", {
                        class: "alert-message warning",
                        style: "margin-top:8px",
                        children: ee.error
                    }) : null,
                    s("p", {
                        style: "font-size:85%;color:#888;margin-top:8px;margin-bottom:8px",
                        children: t_("Saving in manual mode does not create interfaces, change firewall rules or configure child devices. Apply explicitly to authorize the current management configuration.")
                    }),
                    (H = {
                        style: "margin-top:6px;margin-bottom:10px",
                        children: [
                            s("summary", {
                                style: "cursor:pointer;user-select:none;font-size:85%;color:#666",
                                children: t_("Advanced diagnostics / Raw configuration (JSON)")
                            }),
                            s("pre", {
                                style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px",
                                children: JSON.stringify({
                                    desired: ee?.desired,
                                    applied: ee?.applied,
                                    plan: ee?.plan ?? []
                                }, null, 2)
                            })
                        ]
                    }, s("details", H))
                ]
            }, s("div", K)));
            let ei = new Set(Array.from(g.querySelectorAll("details[open]")).map((e)=>e.getAttribute("data-device")));
            g.replaceChildren(...(e.devices ?? []).map((e)=>{
                var t, n, r, i, a, o, l, d, c, p, u, f, g, h, m, y, b, w, k, j, S, A, T, O, C, M, $, N, Z, R, W, I, D, V, F, q, U, B, J, G, H, K, Q, X, Y, ee, et, en, er, ea, es, eo, el, ed, ec, ep, eu;
                let ef, eg;
                return t = ei.has(e.device), n = ()=>x("management_apply"), r = P.disabled, i = v, eg = [
                    ...Object.entries((ef = e.provisioning).wan_lifecycle ?? {}).map((e)=>{
                        let [t, n] = e;
                        return {
                            ...n,
                            id: `WAN ${t}`,
                            kind: "wan_activation",
                            service_type: "wan"
                        };
                    }),
                    ...Object.entries(ef.wifi_lifecycle ?? {}).map((e)=>{
                        let [t, n] = e;
                        return {
                            ...n,
                            id: `WLAN ${t}`,
                            kind: "ssid",
                            service_type: "wifi"
                        };
                    })
                ], eu = {
                    class: "cbi-section fttr-device-card",
                    children: [
                        (u = {
                            class: "fttr-card-header",
                            children: [
                                (c = {
                                    class: "fttr-card-title-group",
                                    children: [
                                        (o = {
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
                                        }, s("h3", o)),
                                        (d = {
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
                                                (l = {
                                                    style: "font-size:85%;color:#666",
                                                    children: [
                                                        "OMCI: ",
                                                        tz(e.omci_management?.state),
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
                                                }, s("span", l))
                                            ]
                                        }, s("div", d))
                                    ]
                                }, s("div", c)),
                                L.hasViewPermission() ? (p = {
                                    class: "fttr-card-actions",
                                    children: s("button", {
                                        type: "button",
                                        class: "fttr-btn-subtle",
                                        disabled: i,
                                        title: t_("Clear old tasks and managed-object records after a device factory reset. The next preview or apply reads the device again."),
                                        onclick: ()=>{
                                            let t = e.name || e.optical_sn;
                                            window.confirm(t_("Are you sure you want to reset the synchronization state for %s?").replace("%s", t)) && z(e);
                                        },
                                        children: t_("Reset synchronization state")
                                    })
                                }, s("div", p)) : null
                            ]
                        }, s("div", u)),
                        (k = {
                            class: "fttr-device-status-strip",
                            children: [
                                (m = {
                                    class: "fttr-status-pill-group",
                                    children: [
                                        (f = {
                                            children: [
                                                s("span", {
                                                    class: "fttr-pill-label",
                                                    children: "CWMP:"
                                                }),
                                                " ",
                                                tz(e.management?.state)
                                            ]
                                        }, s("span", f)),
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
                                                tz(ef.state)
                                            ]
                                        }, s("span", g)),
                                        (h = {
                                            children: [
                                                s("span", {
                                                    class: "fttr-pill-label",
                                                    children: "Wi-Fi:"
                                                }),
                                                " ",
                                                tz(e.wifi_sync)
                                            ]
                                        }, s("span", h))
                                    ]
                                }, s("div", m)),
                                (w = {
                                    class: "fttr-status-op-info",
                                    children: [
                                        (y = {
                                            children: [
                                                t_("Operation"),
                                                ": ",
                                                s("strong", {
                                                    children: tb(ef.operation_id)
                                                }),
                                                " (",
                                                tb(ef.mode),
                                                ")"
                                            ]
                                        }, s("span", y)),
                                        s("span", {
                                            children: "\xb7"
                                        }),
                                        s("span", {
                                            children: [
                                                t_("Started"),
                                                ": ",
                                                tw(ef.started_at)
                                            ]
                                        }),
                                        s("span", {
                                            children: "\xb7"
                                        }),
                                        (b = {
                                            children: [
                                                t_("Revision"),
                                                ": ",
                                                s("code", {
                                                    children: tb(ef.revision)
                                                })
                                            ]
                                        }, s("span", b))
                                    ]
                                }, s("div", w))
                            ]
                        }, s("div", k)),
                        tx(ef.items ?? []),
                        ef.cwmp_contract ? (Z = {
                            style: "margin-top:1.2em",
                            children: [
                                s("h4", {
                                    style: "margin-bottom:0.5em",
                                    children: t_("CWMP contract")
                                }),
                                (N = {
                                    class: "fttr-card",
                                    children: [
                                        (S = {
                                            style: "display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                                            children: [
                                                (j = {
                                                    children: [
                                                        s("span", {
                                                            children: tb(ef.cwmp_contract.requested)
                                                        }),
                                                        " \u2192",
                                                        " ",
                                                        s("code", {
                                                            children: tb(ef.cwmp_contract.contract)
                                                        })
                                                    ]
                                                }, s("div", j)),
                                                s("div", {
                                                    children: tz(ef.cwmp_contract.state)
                                                })
                                            ]
                                        }, s("div", S)),
                                        (M = {
                                            style: "display:flex;flex-wrap:wrap;gap:12px;margin-bottom:6px;font-size:90%",
                                            children: [
                                                (A = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: "WAN:"
                                                        }),
                                                        " ",
                                                        tz(ef.cwmp_contract.capabilities?.wan)
                                                    ]
                                                }, s("span", A)),
                                                (T = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: "WLAN:"
                                                        }),
                                                        " ",
                                                        tz(ef.cwmp_contract.capabilities?.wlan)
                                                    ]
                                                }, s("span", T)),
                                                (O = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                t_("Bindings"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        tz(ef.cwmp_contract.capabilities?.binding)
                                                    ]
                                                }, s("span", O)),
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
                                                            children: ef.cwmp_contract.cache_hit ? t_("Matched") : t_("Fresh discovery")
                                                        })
                                                    ]
                                                }, s("span", C))
                                            ]
                                        }, s("div", M)),
                                        ef.cwmp_contract.schema ? ($ = {
                                            style: "font-size:85%;color:#666",
                                            children: [
                                                t_("Schema"),
                                                ": ",
                                                s("code", {
                                                    children: ef.cwmp_contract.schema
                                                })
                                            ]
                                        }, s("div", $)) : null,
                                        ef.cwmp_contract.reason ? s("div", {
                                            style: "font-size:85%;margin-top:4px;color:#e67e22",
                                            children: ef.cwmp_contract.reason
                                        }) : null
                                    ]
                                }, s("div", N))
                            ]
                        }, s("div", Z)) : null,
                        (a = e.acs_bootstrap) ? (ea = {
                            style: "margin-top:1.2em",
                            children: [
                                (W = {
                                    style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:0.5em",
                                    children: [
                                        s("h4", {
                                            style: "margin:0",
                                            children: t_("ACS bootstrap")
                                        }),
                                        (R = {
                                            style: "display:flex;align-items:center;gap:6px",
                                            children: [
                                                tz(a.state),
                                                a.inflight ? s("span", {
                                                    class: "fttr-badge fttr-badge-info",
                                                    children: t_("Command in progress")
                                                }) : null
                                            ]
                                        }, s("div", R))
                                    ]
                                }, s("div", W)),
                                (et = {
                                    class: "fttr-card",
                                    children: [
                                        (X = {
                                            class: "fttr-grid-3",
                                            children: [
                                                (F = {
                                                    children: [
                                                        (I = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("Method")
                                                                }),
                                                                s("code", {
                                                                    children: tb(a.method)
                                                                })
                                                            ]
                                                        }, s("div", I)),
                                                        (D = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("Attempts")
                                                                }),
                                                                s("span", {
                                                                    children: tb(a.attempts)
                                                                })
                                                            ]
                                                        }, s("div", D)),
                                                        (V = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("Identity source")
                                                                }),
                                                                s("span", {
                                                                    children: tb(a.binding_source)
                                                                })
                                                            ]
                                                        }, s("div", V))
                                                    ]
                                                }, s("div", F)),
                                                (J = {
                                                    children: [
                                                        (q = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("Management VLAN")
                                                                }),
                                                                s("span", {
                                                                    children: a.desired?.vlan !== void 0 ? `VLAN ${a.desired.vlan} (Prio ${a.desired.priority ?? 0})` : "\u2014"
                                                                })
                                                            ]
                                                        }, s("div", q)),
                                                        (U = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("ACS URL")
                                                                }),
                                                                s("code", {
                                                                    style: "font-size:80%",
                                                                    children: tb(a.desired?.acs_url)
                                                                })
                                                            ]
                                                        }, s("div", U)),
                                                        (B = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("Local ACS listener")
                                                                }),
                                                                s("code", {
                                                                    style: "font-size:80%",
                                                                    children: a.listener?.listen ? `${a.listener.listen}${a.listener.path || ""}` : "\u2014"
                                                                })
                                                            ]
                                                        }, s("div", B))
                                                    ]
                                                }, s("div", J)),
                                                (Q = {
                                                    children: [
                                                        (G = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("Last telemetry")
                                                                }),
                                                                s("span", {
                                                                    style: "font-size:85%",
                                                                    children: tw(a.mqtt_last_seen)
                                                                })
                                                            ]
                                                        }, s("div", G)),
                                                        (H = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("Last Inform")
                                                                }),
                                                                s("span", {
                                                                    style: "font-size:85%",
                                                                    children: tw(a.last_inform)
                                                                })
                                                            ]
                                                        }, s("div", H)),
                                                        (K = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: t_("Settings verified")
                                                                }),
                                                                s("span", {
                                                                    style: "font-size:85%",
                                                                    children: tw(a.settings_verified_at)
                                                                })
                                                            ]
                                                        }, s("div", K))
                                                    ]
                                                }, s("div", Q))
                                            ]
                                        }, s("div", X)),
                                        a.mqtt_target ? (Y = {
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
                                                    children: a.mqtt_target
                                                })
                                            ]
                                        }, s("div", Y)) : null,
                                        a.reason ? s("div", {
                                            style: "font-size:85%;color:#d35400;margin-top:6px;overflow-wrap:anywhere",
                                            children: a.reason
                                        }) : null,
                                        "awaiting_apply" === a.state ? (ee = {
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
                                        }, s("div", ee)) : null
                                    ]
                                }, s("div", et)),
                                [
                                    a.last_error,
                                    a.link_identity_error,
                                    a.persistence_error,
                                    a.listener?.error,
                                    a.endpoint_notice
                                ].filter(Boolean).map((e)=>s("div", {
                                        class: "alert-message warning",
                                        style: "overflow-wrap:anywhere;margin-top:8px",
                                        children: e
                                    })),
                                a.manual_steps?.length ? (er = {
                                    style: "margin-top:8px",
                                    children: [
                                        s("summary", {
                                            style: "cursor:pointer;user-select:none;font-weight:600",
                                            children: t_("Management setup / reachability guidance")
                                        }),
                                        (en = {
                                            style: "padding:6px 0",
                                            children: a.manual_steps.map((e, t)=>s("p", {
                                                    style: "margin:4px 0;font-size:90%",
                                                    children: [
                                                        t + 1,
                                                        ". ",
                                                        e
                                                    ]
                                                }))
                                        }, s("div", en))
                                    ]
                                }, s("details", er)) : null
                            ]
                        }, s("div", ea)) : null,
                        eg.length ? (es = {
                            style: "margin-top:1.2em",
                            children: [
                                s("h4", {
                                    style: "margin-bottom:0.5em",
                                    children: t_("WAN / WLAN lifecycle results")
                                }),
                                tx(eg)
                            ]
                        }, s("div", es)) : null,
                        (ep = {
                            "data-device": e.device,
                            open: t,
                            style: "margin-top:1em",
                            children: [
                                s("summary", {
                                    style: "cursor:pointer;user-select:none;font-weight:600",
                                    children: t_("Managed objects and lifecycle intent")
                                }),
                                (ec = {
                                    style: "padding:8px 0",
                                    children: [
                                        (ed = {
                                            style: "display:flex;gap:16px;flex-wrap:wrap;font-size:90%;margin-bottom:6px",
                                            children: [
                                                (eo = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                t_("Wi-Fi cleanup policy"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        tb(ef.wifi_cleanup)
                                                    ]
                                                }, s("span", eo)),
                                                (el = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                t_("Wi-Fi stage"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        tb(ef.wifi_stage)
                                                    ]
                                                }, s("span", el))
                                            ]
                                        }, s("div", ed)),
                                        s("pre", {
                                            style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:85%;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px;max-height:240px;overflow-y:auto",
                                            children: JSON.stringify({
                                                wan_objects: ef.wan_objects ?? {},
                                                wifi_objects: ef.wifi_objects ?? {}
                                            }, null, 2)
                                        })
                                    ]
                                }, s("div", ec))
                            ]
                        }, s("details", ep))
                    ]
                }, s("div", eu);
            }));
        }
        return f.addEventListener("change", ()=>C(m)), C(l), L.Poll.add(async ()=>{
            if (O.isConnected && !b) {
                b = !0;
                try {
                    let [e, t] = await Promise.all([
                        tu(),
                        tf()
                    ]);
                    y = t, C(e);
                } catch (e) {
                    p.hidden = !1, p.textContent = _("Status refresh failed: %s").format(String(e));
                } finally{
                    b = !1;
                }
            }
        }, 5), O;
    },
    handleSave: null,
    handleSaveApply: null,
    handleReset: null
});

return main;