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
function o(e, t, r) {
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
    let t = +!!e.startsWith("^"), r = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, r);
}
const h = Symbol("evaluating");
function g(e, t, r) {
    let n;
    Object.defineProperty(e, t, {
        get () {
            if (n !== h) return void 0 === n && (n = h, n = r()), n;
        },
        set (r) {
            Object.defineProperty(e, t, {
                value: r
            });
        },
        configurable: !0
    });
}
function b(e, t, r) {
    Object.defineProperty(e, t, {
        value: r,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
}
function v(...e) {
    let t = {};
    for (let r of e)Object.assign(t, Object.getOwnPropertyDescriptors(r));
    return Object.defineProperties({}, t);
}
const m = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function y(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function w(e) {
    if (!1 === y(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let r = t.prototype;
    return !1 !== y(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
}
const z = new Set([
    "string",
    "number",
    "symbol"
]);
function k(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function x(e, t, r) {
    let n = new e._zod.constr(t ?? e._zod.def);
    return (!t || r?.parent) && (n._zod.parent = e), n;
}
function $(e) {
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
function O(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function P(e) {
    return "string" == typeof e ? e : e?.message;
}
function S(e, t, r) {
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = P(e.inst?._zod.def?.error?.(e)) ?? P(t?.error?.(e)) ?? P(r.customError?.(e)) ?? P(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
}
const T = (e, t)=>{
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
}, I = o("$ZodError", T), M = o("$ZodError", T, {
    Parent: Error
}), C = (t = M, (e, r, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: r,
        issues: []
    }, a);
    if (s instanceof Promise) throw new l();
    if (s.issues.length) {
        let e = new (i?.Err ?? t)(s.issues.map((e)=>S(e, a, c())));
        throw m(e, i?.callee), e;
    }
    return s.value;
}), N = (r = M, async (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (i?.Err ?? r)(s.issues.map((e)=>S(e, a, c())));
        throw m(e, i?.callee), e;
    }
    return s.value;
}), D = (n = M, (e, t, r)=>{
    let i = r ? {
        ...r,
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
        error: new (n ?? I)(a.issues.map((e)=>S(e, i, c())))
    } : {
        success: !0,
        data: a.value
    };
}), R = (i = M, async (e, t, r)=>{
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
        error: new i(a.issues.map((e)=>S(e, n, c())))
    } : {
        success: !0,
        data: a.value
    };
}), Z = /^-?\d+(?:\.\d+)?$/, A = /^(?:true|false)$/i, B = /^null$/i, U = {
    major: 4,
    minor: 3,
    patch: 6
}, V = o("$ZodType", (e, t)=>{
    var r;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = U;
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
                if (s instanceof Promise && r?.async === !1) throw new l();
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
                return t instanceof Promise ? t.then((e)=>r(e, i, a)) : r(t, i, a);
            }
            let s = e._zod.parse(i, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new l();
                return s.then((e)=>t(e, n, a));
            }
            return t(s, n, a);
        };
    }
    g(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = D(e, t);
                    return r.success ? {
                        value: r.data
                    } : {
                        issues: r.error?.issues
                    };
                } catch (r) {
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
    var r;
    let n;
    V.init(e, t), e._zod.pattern = [
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
}), F = o("$ZodNumber", (e, t)=>{
    V.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? Z, e._zod.parse = (r, n)=>{
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
}), W = o("$ZodBoolean", (e, t)=>{
    V.init(e, t), e._zod.pattern = A, e._zod.parse = (r, n)=>{
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
}), J = o("$ZodNull", (e, t)=>{
    V.init(e, t), e._zod.pattern = B, e._zod.values = new Set([
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
}), X = o("$ZodNever", (e, t)=>{
    V.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function G(e, t, r) {
    e.issues.length && t.issues.push(...O(r, e.issues)), t.value[r] = e.value;
}
const H = o("$ZodArray", (e, t)=>{
    V.init(e, t), e._zod.parse = (r, n)=>{
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
            o instanceof Promise ? a.push(o.then((t)=>G(t, r, e))) : G(o, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function K(e, t, r, n, i) {
    if (e.issues.length) {
        if (i && !(r in n)) return;
        t.issues.push(...O(r, e.issues));
    }
    void 0 === e.value ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
const Q = o("$ZodObject", (e, t)=>{
    let r;
    V.init(e, t);
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
    let i = p(()=>(function(e) {
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
    g(e._zod, "propValues", ()=>{
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
        if (!y(s)) return t.issues.push({
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
            a instanceof Promise ? o.push(a.then((r)=>K(r, t, e, s, i))) : K(a, t, e, s, i);
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
                a instanceof Promise ? e.push(a.then((e)=>K(e, r, i, t, c))) : K(a, r, i, t, c);
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
function Y(e, t, r, n) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let i = e.filter((e)=>!j(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>S(e, n, c())))
    }), t);
}
const ee = o("$ZodUnion", (e, t)=>{
    V.init(e, t), g(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), g(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), g(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), g(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>f(e.source)).join("|")})$`);
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
        return s ? Promise.all(o).then((t)=>Y(t, i, e, a)) : Y(o, i, e, a);
    };
}), et = o("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, ee.init(e, t);
    let r = e._zod.parse;
    g(e._zod, "propValues", ()=>{
        let e = {};
        for (let r of t.options){
            let n = r._zod.propValues;
            if (!n || 0 === Object.keys(n).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
            for (let [t, r] of Object.entries(n))for (let n of (e[t] || (e[t] = new Set()), r))e[t].add(n);
        }
        return e;
    });
    let n = p(()=>{
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
        if (!y(s)) return i.issues.push({
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
}), er = o("$ZodRecord", (e, t)=>{
    V.init(e, t), e._zod.parse = (r, n)=>{
        let i = r.value;
        if (!w(i)) return r.issues.push({
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
                    t.issues.length && r.issues.push(...O(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...O(e, s.issues)), r.value[e] = s.value);
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
            if ("string" == typeof s && Z.test(s) && o.issues.length) {
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
                    issues: o.issues.map((e)=>S(e, n, c())),
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
                e.issues.length && r.issues.push(...O(s, e.issues)), r.value[o.value] = e.value;
            })) : (l.issues.length && r.issues.push(...O(s, l.issues)), r.value[o.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), en = o("$ZodEnum", (e, t)=>{
    var r;
    let n;
    V.init(e, t);
    let i = (n = Object.values(r = t.entries).filter((e)=>"number" == typeof e), Object.entries(r).filter(([e, t])=>-1 === n.indexOf(+e)).map(([e, t])=>t)), a = new Set(i);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${i.filter((e)=>z.has(typeof e)).map((e)=>"string" == typeof e ? k(e) : e.toString()).join("|")})$`), e._zod.parse = (t, r)=>{
        let n = t.value;
        return a.has(n) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: n,
            inst: e
        }), t;
    };
}), ei = o("$ZodLiteral", (e, t)=>{
    if (V.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
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
function ea(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const es = o("$ZodOptional", (e, t)=>{
    V.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let n = t.innerType._zod.run(e, r);
            return n instanceof Promise ? n.then((t)=>ea(t, e.value)) : ea(n, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, r);
    };
}), eo = o("$ZodNullable", (e, t)=>{
    V.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)}|null)$`) : void 0;
    }), g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), el = o("$ZodCatch", (e, t)=>{
    V.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let n = t.innerType._zod.run(e, r);
        return n instanceof Promise ? n.then((n)=>(e.value = n.value, n.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: n.issues.map((e)=>S(e, r, c()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = n.value, n.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: n.issues.map((e)=>S(e, r, c()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ed = o("$ZodLazy", (e, t)=>{
    V.init(e, t), g(e._zod, "innerType", ()=>t.getter()), g(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), g(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), g(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), g(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
const ec = o("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    V.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>C(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>D(e, t, r), e.parseAsync = async (t, r)=>N(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>R(e, t, r), e.check = (...r)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, r)=>x(e, t, r), e.brand = ()=>e, e.register = (t, r)=>(t.add(e, r), e), e.apply = (t)=>t(e);
}), eu = o("ZodMiniString", (e, t)=>{
    q.init(e, t), ec.init(e, t);
});
function ep(e) {
    return new eu({
        type: "string",
        ...$(e)
    });
}
const e_ = o("ZodMiniNumber", (e, t)=>{
    F.init(e, t), ec.init(e, t);
});
function ef(e) {
    return new e_({
        type: "number",
        checks: [],
        ...$(e)
    });
}
const eh = o("ZodMiniBoolean", (e, t)=>{
    W.init(e, t), ec.init(e, t);
});
function eg(e) {
    return new eh({
        type: "boolean",
        ...$(e)
    });
}
const eb = o("ZodMiniNull", (e, t)=>{
    J.init(e, t), ec.init(e, t);
}), ev = o("ZodMiniNever", (e, t)=>{
    X.init(e, t), ec.init(e, t);
});
function em(e) {
    return new ev({
        type: "never",
        ...$(e)
    });
}
const ey = o("ZodMiniArray", (e, t)=>{
    H.init(e, t), ec.init(e, t);
});
function ew(e, t) {
    return new ey({
        type: "array",
        element: e,
        ...$(t)
    });
}
const ez = o("ZodMiniObject", (e, t)=>{
    Q.init(e, t), ec.init(e, t), g(e, "shape", ()=>t.shape);
});
function ek(e, t) {
    return new ez({
        type: "object",
        shape: e ?? {},
        ...$(t)
    });
}
const ex = o("ZodMiniUnion", (e, t)=>{
    ee.init(e, t), ec.init(e, t);
});
function e$(e, t) {
    return new ex({
        type: "union",
        options: e,
        ...$(t)
    });
}
const ej = o("ZodMiniDiscriminatedUnion", (e, t)=>{
    et.init(e, t), ec.init(e, t);
});
function eO(e, t, r) {
    return new ej({
        type: "union",
        options: t,
        discriminator: e,
        ...$(r)
    });
}
const eP = o("ZodMiniRecord", (e, t)=>{
    er.init(e, t), ec.init(e, t);
});
function eE(e, t, r) {
    return new eP({
        type: "record",
        keyType: e,
        valueType: t,
        ...$(r)
    });
}
const eS = o("ZodMiniEnum", (e, t)=>{
    en.init(e, t), ec.init(e, t), e.options = Object.values(t.entries);
});
function eT(e, t) {
    return new eS({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...$(t)
    });
}
const eI = o("ZodMiniLiteral", (e, t)=>{
    ei.init(e, t), ec.init(e, t);
});
function eM(e, t) {
    return new eI({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...$(t)
    });
}
const eC = o("ZodMiniOptional", (e, t)=>{
    es.init(e, t), ec.init(e, t);
});
function eN(e) {
    return new eC({
        type: "optional",
        innerType: e
    });
}
const eD = o("ZodMiniNullable", (e, t)=>{
    eo.init(e, t), ec.init(e, t);
});
function eR(e) {
    return new eD({
        type: "nullable",
        innerType: e
    });
}
const eZ = o("ZodMiniCatch", (e, t)=>{
    el.init(e, t), ec.init(e, t);
}), eL = o("ZodMiniLazy", (e, t)=>{
    ed.init(e, t), ec.init(e, t);
});
function eA() {
    let e = new eL({
        type: "lazy",
        getter: ()=>e$([
                ep(),
                ef(),
                eg(),
                new eb({
                    type: "null",
                    ...$(void 0)
                }),
                ew(e),
                eE(ep(), e)
            ])
    });
    return e;
}
let eB = ek({
    error: e$([
        ep(),
        ek({
            code: ep(),
            message: ep()
        })
    ])
});
class eU extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eV(e) {
    let t = eB.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eU("rpc", e) : new eU(e.code, e.message);
    }
    return e;
}
const eq = ek({
    status: eM("pending"),
    job: ep()
});
eO("status", [
    ek({
        status: eM("pending")
    }),
    ek({
        status: eM("ready"),
        chunk: ef(),
        chunks: ef(),
        bytes: ef(),
        data: ep()
    })
]);
let eF = ep(), eW = ef(), eJ = eg(), eX = eN(eF), eG = eN(eW), eH = eN(eJ);
const eK = eT([
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
]), eQ = eT([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), eY = ek({
    id: eF,
    name: eN(eR(eF)),
    kind: eT([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eF,
    state: eF,
    reason: eX,
    revision: eX,
    current_revision: eH,
    management_fresh: eH,
    operation_id: eG,
    task_id: eN(eR(eW)),
    updated_at: eG,
    changes: eN(ew(ek({
        name: eF,
        desired: eF
    })))
});
let e0 = ek({
    state: eF,
    reason: eX,
    task_id: eN(eR(eW)),
    instance: eG
});
const e1 = ek({
    cwmp_id: eF,
    state: eT([
        "online",
        "waiting_inform",
        "offline_or_stale"
    ]),
    optical_online: eJ,
    last_inform: eR(eW),
    age_seconds: eR(eW)
});
let e2 = ek({
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
    method: eX,
    reason: eX,
    mqtt_target: eR(eF),
    binding_source: eX,
    link_identity_error: eR(eF),
    mqtt_last_seen: eR(eW),
    cwmp_id: eX,
    desired_version: eX,
    generation: eG,
    inflight: eH,
    attempts: eG,
    next_retry_at: eG,
    updated_at: eG,
    settings_verified_at: eR(eW),
    last_inform: eR(eW),
    last_error: eN(eR(eF)),
    persistence_error: eN(eR(eF)),
    desired: eN(eR(ek({
        vlan: eW,
        vlans: ew(eW),
        priority: eW,
        acs_url: eF
    }))),
    listener: eN(ek({
        enabled: eJ,
        listen: eF,
        path: eF,
        error: eR(eF)
    })),
    endpoint_notice: eX,
    manual_steps: eN(ew(eF))
});
const e8 = eO("state", [
    e2,
    function(e, t) {
        if (!w(t)) throw Error("Invalid input to extend: expected a plain object");
        let r = e._zod.def.checks;
        if (r && r.length > 0) {
            let r = e._zod.def.shape;
            for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(r, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let n = v(e._zod.def, {
            get shape () {
                let r = {
                    ...e._zod.def.shape,
                    ...t
                };
                return b(this, "shape", r), r;
            }
        });
        return x(e, n);
    }(function(e) {
        var t = void 0;
        let r = e._zod.def.checks;
        if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let n = v(e._zod.def, {
            get shape () {
                let r = e._zod.def.shape, n = {
                    ...r
                };
                if (t) for(let e in t){
                    if (!(e in r)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (n[e] = eC ? new eC({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)n[e] = eC ? new eC({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return b(this, "shape", n), n;
            },
            checks: []
        });
        return x(e, n);
    }(e2), {
        state: eT([
            "pending",
            "unavailable"
        ]),
        reason: eF
    })
]), e4 = ek({
    state: eK,
    operation_id: eG,
    device: eX,
    optical_sn: eX,
    cwmp_id: eX,
    revision: eX,
    mode: eN(eT([
        "apply",
        "plan"
    ])),
    started_at: eG,
    current_revision: eH,
    management_fresh: eH,
    reason: eX,
    error: eX,
    attempts: eG,
    next_retry_at: eG,
    reconcile_reason: eX,
    items: ew(eY),
    cwmp_contract: eN(ek({
        state: eF,
        requested: eF,
        contract: eR(eF),
        reason: eF,
        cache_hit: eJ,
        schema: eF,
        capabilities: eR(ek({
            wan: eF,
            wlan: eF,
            binding: eF
        }))
    })),
    wan_objects: eN(eE(eF, eA())),
    wan_lifecycle: eN(eE(eF, e0)),
    wan_stage: eN(eT([
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
    wifi_objects: eN(ek({
        owned: ew(eW),
        pending: eR(eF),
        pending_instance: eR(eW)
    })),
    wifi_lifecycle: eN(eE(eF, e0)),
    wifi_stage: eN(eT([
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
    wifi_cleanup: eN(eT([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e5 = ek({
    enabled: eJ,
    mode: eT([
        "auto",
        "manual"
    ]),
    vlan: ew(eW),
    priority: eW,
    address: eF,
    acs_url: eF,
    port: eW,
    path: eF,
    dhcp_enabled: eJ
}), e3 = ek({
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
    error: eR(eF),
    inflight: eJ,
    ready: eJ,
    desired_version: eR(eF),
    applied_version: eR(eF),
    next_retry_at: eW,
    attempts: eW,
    desired: eR(e5),
    applied: eR(e5),
    previous: eR(e5),
    plan: ew(ek({
        operation: eF,
        key: eF,
        value: ew(eF)
    }))
});
const e6 = ek({
    device: eF,
    name: eR(eF),
    group: eR(eF),
    group_name: eR(eF),
    template: eR(eF),
    template_name: eR(eF),
    optical_sn: eF,
    adapter: eF,
    omci_management: ek({
        state: eF,
        reason: eX
    }),
    management: eR(e1),
    acs_bootstrap: e8,
    provisioning: e4,
    services: ew(eY),
    ssids: ew(eY),
    wifi_sync: eQ
}), e7 = ek({
    enabled: eJ,
    mode: eT([
        "auto",
        "manual"
    ]),
    method: eM("diff"),
    revision: eF,
    triggers: ew(eF),
    interval: eW,
    error: eR(eF),
    devices: ew(e6),
    management_network: e3,
    omci_management: eA(),
    groups: ew(ek({
        id: eF,
        name: eR(eF),
        template: eF
    })),
    pending_devices: ew(eF)
});
e$([
    ek({
        valid: eM(!0),
        revision: eF,
        devices: eW,
        error: eN(em())
    }),
    ek({
        error: eF,
        valid: eN(em()),
        revision: eN(em()),
        devices: eN(em())
    })
]);
let e9 = ep(), te = ef(), tt = eR(te), tr = eE(e9, ek({
    source: e9,
    unit: e9,
    reason: eR(e9),
    raw: eR(e9),
    age_seconds: tt
}));
const tn = ek({
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
    error: eR(e9)
}), ti = eT([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let ta = ek({
    model: e9,
    wavelength_tx_nm: te,
    wavelength_rx_nm: te,
    phy_rate_downlink_gbps: te,
    phy_rate_uplink_gbps: te,
    tx_power_dbm: tt,
    laser_bias_current_ma: tt,
    temperature_celsius: tt,
    vcc_voltage: tt,
    cdr_locked: eR(eg()),
    measurements: tr
}), ts = ek({
    equipment_id: eR(e9),
    hardware_version: eR(e9),
    software_images: ew(e9),
    omcc_version: tt,
    errors: ew(e9)
});
const to = ek({
    onu_id: te,
    vendor: e9,
    model: e9,
    serial_number: e9,
    state: ti,
    business_status: tn,
    management: eR(e1),
    provisioning: eR(e4),
    services: ew(eY),
    ssids: ew(eY),
    wifi_sync: eQ,
    acs_bootstrap: eN(e8),
    identity: eR(ts),
    identity_age_seconds: tt,
    identity_current: eg(),
    fiber_distance_m: tt,
    ranging_delay_rtd_ns: tt,
    equalization_delay_bits: new eZ({
        type: "catch",
        innerType: tt,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tt,
    optical_tx_power_dbm: tt,
    firmware_version: e9,
    hardware_version: e9,
    uptime_seconds: tt,
    data_path: ek({
        interface: e9,
        gem_ports: eR(ew(te)),
        vlan_id: tt,
        tx_bytes: tt,
        rx_bytes: tt,
        current_tx_kbps: tt,
        current_rx_kbps: tt,
        measurements: tr
    }),
    wifi_mesh: ek({
        channel_2g: tt,
        channel_5g: tt,
        bandwidth_5g: eR(e9),
        tx_power_pct: tt,
        measurements: tr
    }),
    connected_clients: eR(ew(ek({
        mac: e9,
        ip: e9,
        band: e9,
        rssi_dbm: tt,
        rx_rate_mbps: tt,
        tx_rate_mbps: tt
    }))),
    measurements: tr
});
let tl = ek({
    port: te,
    interface: e9,
    carrier: eg(),
    status: e9,
    onu_id: eN(te),
    onu_sn: eN(e9),
    link_state: e9
});
const td = ek({
    fpga_status: e9,
    provisioning: eR(e7),
    optical_transceiver: ta,
    switch_ports: ew(tl),
    sub_gateways: ew(to),
    telemetry_gateways: ew(ek({
        id: e9,
        last_seen_sec_ago: te,
        last_payload_bytes: te
    }))
});
eE(e9, ek({
    carrier: eN(eg()),
    mac: eN(e9),
    link: eN(ek({
        speed: eN(te),
        duplex: eN(e9),
        autoneg: eN(eg())
    })),
    stats: eN(eE(e9, te))
}));
const tc = {
    not_started: "Not started",
    collecting_identity: "Collecting identity",
    retrying_identity: "Retrying identity",
    unsupported: "Unsupported",
    configuring: "Configuring",
    verifying: "Verifying",
    wan_bootstrap_pending: "WAN pending",
    verified: "Verified",
    retrying: "Retrying",
    offline: "Offline"
};
function tu(e) {
    return null === e ? "\u2014" : `${e} bits`;
}
let tp = L.rpc.declare({
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
const t_ = async ()=>td.parse(eV(await tp()));
e$([
    ek({
        operation_ids: ew(ef()),
        revision: ep()
    }),
    ek({
        started: eM(!0),
        mode: eT([
            "apply",
            "plan"
        ])
    }),
    ek({
        reset: eM(!0),
        device: ep()
    }),
    ek({
        operation_ids: ew(ef()),
        mode: eT([
            "apply",
            "plan"
        ]),
        reconcile: eN(eg()),
        retry: eN(eg())
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
    source: eT([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: ep(),
    size: ef(),
    sha256: ep(),
    data: eN(ep()),
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
    error: eN(ep())
}), ek({
    success: eg(),
    path: ep(),
    size: ef(),
    sha256: ep(),
    error: eN(ep())
}), ek({
    success: eg(),
    output: eN(ep()),
    error: eN(ep())
});
let tf = ep(), th = ef(), tg = eg(), tb = ek({
    id: tf,
    url: tf
}), tv = ek({
    name: tf,
    kind: eT([
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
    index: th,
    mask: th,
    size: th,
    read: tg,
    write: tg,
    set_by_create: tg,
    avc: tg,
    optional: tg,
    deprecated: tg,
    default_hex: eR(tf),
    reference: tb
}), tm = eO("type", [
    ek({
        type: eM("unsigned"),
        value: th
    }),
    ek({
        type: eM("signed"),
        value: th
    }),
    ek({
        type: eM("decimal"),
        value: tf
    }),
    ek({
        type: eM("text"),
        value: eR(tf)
    }),
    ek({
        type: eM("octets"),
        hex: tf
    }),
    ek({
        type: eM("table_length"),
        bytes: th
    })
]), ty = ek({
    code: tf,
    message: tf,
    offset: th,
    mask: th
}), tw = eT([
    "layout",
    "name_only",
    "unknown"
]), tz = ek({
    raw_hex: tf,
    filter_outer_priority: th,
    filter_outer_vid: th,
    filter_outer_tpid_dei: th,
    filter_inner_priority: th,
    filter_inner_vid: th,
    filter_inner_tpid_dei: th,
    filter_ethertype: th,
    tags_to_remove: th,
    treatment_outer_priority: th,
    treatment_outer_vid: th,
    treatment_outer_tpid_dei: th,
    treatment_inner_priority: th,
    treatment_inner_vid: th,
    treatment_inner_tpid_dei: th,
    delete_entry: tg
}), tk = ek({
    schema_version: eM(1),
    reference_version: tf,
    onu_id: eR(th),
    uploaded_complete: tg,
    expected_records: th,
    received_records: th,
    decoded_records: th,
    partial_records: th,
    basic_records: th,
    tables_requested: tg,
    tables_collected: tg,
    classes: ew(ek({
        class_id: th,
        name: eR(tf),
        entities: th,
        records: th,
        support: tw
    })),
    entities: ew(ek({
        class_id: th,
        entity_id: th,
        name: eR(tf),
        support: tw,
        reference: eR(tb),
        sequences: ew(th),
        attributes: ew(ek({
            definition: tv,
            value: eR(tm),
            observations: ew(ek({
                raw_hex: tf,
                value: tm,
                sequences: ew(th)
            }))
        })),
        diagnostics: ew(ty)
    })),
    records: ew(ek({
        class_id: th,
        entity_id: th,
        sequence: th,
        attribute_mask: th,
        raw_hex: tf,
        consumed: th,
        remaining_hex: tf,
        undecoded_mask: th
    })),
    tables: ew(ek({
        class_id: th,
        entity_id: th,
        attribute: tv,
        collected: tg,
        error: eR(tf),
        raw_hex: tf,
        rows: ew(tf),
        vlan_rules: ew(tz)
    })),
    diagnostics: ew(ty)
});
const tx = ek({
    status: eM("ready"),
    report: tk
});
let t$ = ek({
    phase: eT([
        "starting",
        "upload",
        "tables"
    ]),
    received: th,
    expected: eR(th)
}), tj = eO("status", [
    ek({
        status: eM("pending"),
        progress: eN(t$)
    }),
    ek({
        status: eM("ready"),
        chunk: th,
        chunks: th,
        bytes: th,
        data: tf
    })
]), tO = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_start",
    params: [
        "onu_id",
        "optical_sn",
        "tables"
    ],
    reject: !0
}), tP = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
});
const tE = async (e, t, r)=>eq.parse(eV(await tO(e, t, r))), tS = async (e, t)=>tj.parse(eV(await tP(e, t)));
let tT = (e)=>null == e || "" === e ? "\u2014" : String(e), tI = (e)=>JSON.stringify(e, null, 2);
function tM(e) {
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
let tC = L.view;
function tN(e) {
    return _(e) || e;
}
let tD = (e)=>null == e || "" === e ? "\u2014" : String(e);
function tR(e) {
    return null !== e && Number.isFinite(e) ? `${e.toFixed(2)} dBm` : "\u2014";
}
function tZ(e) {
    var t, r, n, i, a, o, l, d, c, u, p, f, h, g, b, v, m, y;
    let w = e.optical_transceiver, z = s("span", {
        class: `fttr-badge ${"ready" === e.fpga_status ? "fttr-badge-success" : "fttr-badge-neutral"}`,
        style: "font-size:95%",
        children: "ready" === e.fpga_status ? tN("Ready") : tD(e.fpga_status)
    }), k = null === (t = w.cdr_locked) ? s("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: tN("Unknown")
    }) : t ? s("span", {
        class: "fttr-badge fttr-badge-success",
        children: tN("Locked")
    }) : s("span", {
        class: "fttr-badge fttr-badge-warning",
        children: tN("Unlocked")
    });
    return y = {
        class: "cbi-section fttr-panel-controller",
        children: [
            s("h3", {
                style: "margin-bottom:12px",
                children: tN("Controller hardware")
            }),
            (m = {
                class: "fttr-grid-3",
                children: [
                    (a = {
                        class: "fttr-card",
                        children: [
                            s("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: tN("FPGA status")
                            }),
                            (r = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tN("FPGA status")
                                    }),
                                    s("span", {
                                        children: z
                                    })
                                ]
                            }, s("div", r)),
                            (n = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: "FPGA \u6807\u8BC6"
                                    }),
                                    s("code", {
                                        children: tD(e.fpga_status)
                                    })
                                ]
                            }, s("div", n)),
                            (i = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tN("CDR lock")
                                    }),
                                    s("span", {
                                        children: k
                                    })
                                ]
                            }, s("div", i))
                        ]
                    }, s("div", a)),
                    (c = {
                        class: "fttr-card",
                        children: [
                            s("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: tN("Optical transceiver")
                            }),
                            (o = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: "\u6A21\u5757\u578B\u53F7"
                                    }),
                                    s("strong", {
                                        children: tD(w.model)
                                    })
                                ]
                            }, s("div", o)),
                            (l = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tN("TX wavelength")
                                    }),
                                    s("span", {
                                        children: w.wavelength_tx_nm ? `${w.wavelength_tx_nm} nm` : "\u2014"
                                    })
                                ]
                            }, s("div", l)),
                            (d = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tN("RX wavelength")
                                    }),
                                    s("span", {
                                        children: w.wavelength_rx_nm ? `${w.wavelength_rx_nm} nm` : "\u2014"
                                    })
                                ]
                            }, s("div", d))
                        ]
                    }, s("div", c)),
                    (v = {
                        class: "fttr-card",
                        children: [
                            s("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: "\u7269\u7406\u901F\u7387\u4E0E\u8BCA\u65AD"
                            }),
                            (u = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tN("Downlink PHY rate")
                                    }),
                                    s("span", {
                                        children: w.phy_rate_downlink_gbps ? `${w.phy_rate_downlink_gbps} Gbps` : "\u2014"
                                    })
                                ]
                            }, s("div", u)),
                            (p = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tN("Uplink PHY rate")
                                    }),
                                    s("span", {
                                        children: w.phy_rate_uplink_gbps ? `${w.phy_rate_uplink_gbps} Gbps` : "\u2014"
                                    })
                                ]
                            }, s("div", p)),
                            (f = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tN("Temperature")
                                    }),
                                    s("span", {
                                        children: null == w.temperature_celsius ? "\u2014" : `${w.temperature_celsius} \xb0C`
                                    })
                                ]
                            }, s("div", f)),
                            (h = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tN("TX power")
                                    }),
                                    s("span", {
                                        children: tR(w.tx_power_dbm)
                                    })
                                ]
                            }, s("div", h)),
                            (g = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tN("Voltage")
                                    }),
                                    s("span", {
                                        children: null == w.vcc_voltage ? "\u2014" : `${w.vcc_voltage} V`
                                    })
                                ]
                            }, s("div", g)),
                            (b = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tN("Bias current")
                                    }),
                                    s("span", {
                                        children: null == w.laser_bias_current_ma ? "\u2014" : `${w.laser_bias_current_ma} mA`
                                    })
                                ]
                            }, s("div", b))
                        ]
                    }, s("div", v))
                ]
            }, s("div", m))
        ]
    }, s("div", y);
}
function tL(e) {
    var t, r;
    return e.length ? (t = {
        class: "fttr-panel-subgateways",
        children: e.map((e)=>{
            var t, r, n, i, o, l, d, c, u, p, f, h, g, b, v, m, y, w, z, k, x, $;
            let j = e.identity, O = j?.software_images ?? [], P = function(e) {
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
            }(e.firmware_version), S = e.identity ? e.identity_current ? tN("Current registration") : tN("Cached identity") : tN("Not collected"), T = s("span", {
                class: `fttr-badge ${e.identity_current ? "fttr-badge-info" : "fttr-badge-neutral"}`,
                style: "font-size:80%",
                children: S
            });
            return $ = {
                class: "cbi-section fttr-onu-card",
                children: [
                    (l = {
                        class: "fttr-card-header",
                        children: [
                            (n = {
                                class: "fttr-card-title-group",
                                children: [
                                    s("h3", {
                                        style: "margin:0",
                                        children: tN("Sub-gateway %s \u2014 %s").replace("%s", String(e.onu_id)).replace("%s", tD(e.model))
                                    }),
                                    (r = {
                                        class: "fttr-card-meta-tags",
                                        children: [
                                            s("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                children: e.vendor
                                            }),
                                            s("code", {
                                                children: e.serial_number
                                            }),
                                            (t = e.state) ? "o5_operation" === t || "online" === t || "ready" === t || "connected" === t ? s("span", {
                                                class: "fttr-badge fttr-badge-success",
                                                title: t,
                                                children: "o5_operation" === t ? tN("Connected") : tN("Ready")
                                            }) : t.includes("O4") || t.includes("ranging") || t.includes("sync") ? s("span", {
                                                class: "fttr-badge fttr-badge-warning",
                                                title: t,
                                                children: t
                                            }) : s("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                title: t,
                                                children: t
                                            }) : s("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                children: "\u2014"
                                            }),
                                            T
                                        ]
                                    }, s("div", r))
                                ]
                            }, s("div", n)),
                            (o = {
                                children: (i = {
                                    type: "button",
                                    class: "fttr-btn-subtle",
                                    onclick: ()=>(function(e) {
                                            var t, r, n, i, o, l, d, c;
                                            let u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "basic", p = !1, f = !1, h = null, g = (n = {
                                                class: "table",
                                                children: (r = {
                                                    children: [
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
                                                            e.serial_number
                                                        ],
                                                        [
                                                            _("ONU ID"),
                                                            e.onu_id
                                                        ],
                                                        [
                                                            _("Registration"),
                                                            e.state
                                                        ],
                                                        [
                                                            _("Business"),
                                                            (t = e.business_status, `${_(tc[t.phase])} \xb7 ${t.generation}${t.error ? ` \xb7 ${t.error}` : ""}`)
                                                        ],
                                                        [
                                                            _("Data interface"),
                                                            e.data_path?.interface
                                                        ],
                                                        [
                                                            _("Receive optical power"),
                                                            null == e.optical_rx_power_dbm ? null : `${e.optical_rx_power_dbm.toFixed(3)} dBm`
                                                        ],
                                                        [
                                                            _("Transmit optical power"),
                                                            null == e.optical_tx_power_dbm ? null : `${e.optical_tx_power_dbm.toFixed(3)} dBm`
                                                        ],
                                                        [
                                                            _("Uptime"),
                                                            null == e.uptime_seconds ? null : `${Math.floor(e.uptime_seconds)} s`
                                                        ],
                                                        [
                                                            _("Equalization delay (EQD)"),
                                                            tu(e.equalization_delay_bits)
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
                                                            e.identity?.omcc_version == null ? null : `0x${e.identity.omcc_version.toString(16)}`
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
                                                        ],
                                                        [
                                                            _("CWMP"),
                                                            e.management?.state
                                                        ],
                                                        [
                                                            _("Last Inform"),
                                                            e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
                                                        ]
                                                    ].map((e)=>{
                                                        var t;
                                                        let [r, n] = e;
                                                        return t = {
                                                            children: [
                                                                s("th", {
                                                                    children: r
                                                                }),
                                                                s("td", {
                                                                    children: tT(n)
                                                                })
                                                            ]
                                                        }, s("tr", t);
                                                    })
                                                }, s("tbody", r))
                                            }, s("table", n)), b = s("p", {
                                                role: "status",
                                                children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                                            }), v = s("div", {}), m = s("textarea", {
                                                readOnly: !0,
                                                rows: 20,
                                                style: "width:100%;font-family:monospace"
                                            }), y = s("span", {
                                                role: "status"
                                            }), w = s("button", {
                                                type: "button",
                                                class: "cbi-button",
                                                onclick: async ()=>{
                                                    try {
                                                        await navigator.clipboard.writeText(m.value), y.textContent = _("Copied");
                                                    } catch  {
                                                        m.focus(), m.select(), y.textContent = _("Select and copy the JSON manually.");
                                                    }
                                                },
                                                children: _("Copy JSON")
                                            }), z = s("a", {
                                                href: "data:application/json,%7B%7D",
                                                class: "cbi-button",
                                                download: `mib-${e.serial_number}.json`,
                                                children: _("Download JSON")
                                            }), k = null, x = (i = {
                                                children: [
                                                    s("p", {
                                                        children: [
                                                            w,
                                                            " ",
                                                            z,
                                                            " ",
                                                            y
                                                        ]
                                                    }),
                                                    m
                                                ]
                                            }, s("div", i)), $ = s("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                onclick: ()=>N(!1),
                                                children: _("Read MIB")
                                            }), j = s("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                onclick: ()=>N(!0),
                                                children: _("Read MIB and VLAN tables")
                                            }), O = (o = {
                                                children: [
                                                    s("p", {
                                                        children: [
                                                            $,
                                                            " ",
                                                            j
                                                        ]
                                                    }),
                                                    b,
                                                    v
                                                ]
                                            }, s("div", o)), P = {
                                                basic: g,
                                                mib: O,
                                                raw: x
                                            }, S = new Map();
                                            function T(e) {
                                                for (let [t, r] of Object.entries(P))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                                                for (let [t, r] of S)r.disabled = t === e;
                                            }
                                            let I = (l = {
                                                children: [
                                                    [
                                                        "basic",
                                                        _("Basic information")
                                                    ],
                                                    [
                                                        "mib",
                                                        "OMCI / MIB"
                                                    ],
                                                    [
                                                        "raw",
                                                        _("Raw JSON")
                                                    ]
                                                ].map((e)=>{
                                                    let [t, r] = e, n = s("button", {
                                                        type: "button",
                                                        class: "cbi-button",
                                                        onclick: ()=>T(t),
                                                        children: r
                                                    });
                                                    return S.set(t, n), n;
                                                })
                                            }, s("p", l)), M = (c = {
                                                children: [
                                                    I,
                                                    g,
                                                    O,
                                                    x,
                                                    (d = {
                                                        class: "right",
                                                        children: s("button", {
                                                            type: "button",
                                                            class: "cbi-button",
                                                            onclick: ()=>{
                                                                p = !0, k && URL.revokeObjectURL(k), L.ui.hideModal();
                                                            },
                                                            children: _("Close")
                                                        })
                                                    }, s("div", d))
                                                ]
                                            }, s(a, c)), C = ()=>!p && I.isConnected && I.getClientRects().length > 0;
                                            async function N(t) {
                                                if (!f) {
                                                    f = !0, $.disabled = j.disabled = !0, b.textContent = _("Reading MIB\u2026");
                                                    try {
                                                        let a = await t_(), o = a.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                                        if (o?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                                        if (!C()) return;
                                                        let l = await tE(o.onu_id, o.serial_number, t), d = Date.now() + 140000;
                                                        for(; C();){
                                                            let e = await tS(l.job, 0);
                                                            if (!C()) return;
                                                            if ("ready" === e.status) {
                                                                var r, n, i;
                                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                                let t = new Uint8Array(e.bytes), a = 0;
                                                                for(let r = 0; r < e.chunks; r++){
                                                                    let n = 0 === r ? e : await tS(l.job, r);
                                                                    if (!C()) return;
                                                                    if ("ready" !== n.status || n.chunk !== r || n.chunks !== e.chunks || n.bytes !== e.bytes || !n.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                                    let i = atob(n.data);
                                                                    if (i.length > 32768 || a + i.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                                    for(let e = 0; e < i.length; e++)t[a++] = i.charCodeAt(e);
                                                                    b.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                                                }
                                                                if (a !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                                if (h = tx.parse(eV(JSON.parse(new TextDecoder("utf-8", {
                                                                    fatal: !0
                                                                }).decode(t)))).report, 1 !== h.schema_version || h.onu_id !== o.onu_id) throw Error(_("Unexpected MIB response"));
                                                                b.textContent = `${new Date().toLocaleString()} \xb7 ONU ${h.onu_id} \xb7 ${_("Upload complete")}: ${h.uploaded_complete} \xb7 ${h.received_records}/${h.expected_records} \xb7 ${_("Decoded / partial / basic")}: ${h.decoded_records}/${h.partial_records}/${h.basic_records} \xb7 ${_("Tables requested / collected")}: ${h.tables_requested}/${h.tables_collected}`, v.replaceChildren(function(e) {
                                                                    var t, r, n, i, a;
                                                                    let o = (t = {
                                                                        style: "min-width:0;flex:1"
                                                                    }, s("div", t)), l = (r = {
                                                                        type: "search",
                                                                        placeholder: _("Search ME name or Class ID")
                                                                    }, s("input", r)), d = (n = {}, s("div", n));
                                                                    function c(t) {
                                                                        o.replaceChildren(...e.entities.filter((e)=>e.class_id === t).map((r)=>{
                                                                            var n, i, a, o, l, d, c, u, p, f, h, g, b, v;
                                                                            return v = {
                                                                                children: [
                                                                                    (n = {
                                                                                        children: [
                                                                                            tT(r.name),
                                                                                            " \xb7 ",
                                                                                            _("Entity"),
                                                                                            " ",
                                                                                            r.entity_id,
                                                                                            " (0x",
                                                                                            r.entity_id.toString(16),
                                                                                            ") \xb7",
                                                                                            " ",
                                                                                            r.support
                                                                                        ]
                                                                                    }, s("summary", n)),
                                                                                    (p = {
                                                                                        class: "table",
                                                                                        children: [
                                                                                            (c = {
                                                                                                children: (d = {
                                                                                                    children: [
                                                                                                        (i = {
                                                                                                            children: _("Attribute")
                                                                                                        }, s("th", i)),
                                                                                                        (a = {
                                                                                                            children: _("Type")
                                                                                                        }, s("th", a)),
                                                                                                        (o = {
                                                                                                            children: _("Value")
                                                                                                        }, s("th", o)),
                                                                                                        (l = {
                                                                                                            children: _("Definition")
                                                                                                        }, s("th", l))
                                                                                                    ]
                                                                                                }, s("tr", d))
                                                                                            }, s("thead", c)),
                                                                                            (u = {
                                                                                                children: r.attributes.map((e)=>{
                                                                                                    var t, r, n, i, a, o, l, d;
                                                                                                    return d = {
                                                                                                        children: [
                                                                                                            (t = {
                                                                                                                children: e.definition.name
                                                                                                            }, s("td", t)),
                                                                                                            (r = {
                                                                                                                children: e.definition.kind
                                                                                                            }, s("td", r)),
                                                                                                            (o = {
                                                                                                                children: [
                                                                                                                    function(e) {
                                                                                                                        if (null === e) return _("Conflicting values; inspect observations");
                                                                                                                        switch(e.type){
                                                                                                                            case "unsigned":
                                                                                                                            case "signed":
                                                                                                                            case "decimal":
                                                                                                                            case "text":
                                                                                                                                return tT(e.value);
                                                                                                                            case "octets":
                                                                                                                                return tT(e.hex);
                                                                                                                            case "table_length":
                                                                                                                                return tT(e.bytes);
                                                                                                                            default:
                                                                                                                                throw new eU("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                                        }
                                                                                                                    }(e.value),
                                                                                                                    (a = {
                                                                                                                        children: [
                                                                                                                            (n = {
                                                                                                                                children: _("Raw data / observations")
                                                                                                                            }, s("summary", n)),
                                                                                                                            (i = {
                                                                                                                                style: "white-space:pre-wrap;overflow-wrap:anywhere",
                                                                                                                                children: tI(e.observations)
                                                                                                                            }, s("pre", i))
                                                                                                                        ]
                                                                                                                    }, s("details", a))
                                                                                                                ]
                                                                                                            }, s("td", o)),
                                                                                                            (l = {
                                                                                                                children: tM(e.definition)
                                                                                                            }, s("td", l))
                                                                                                        ]
                                                                                                    }, s("tr", d);
                                                                                                })
                                                                                            }, s("tbody", u))
                                                                                        ]
                                                                                    }, s("table", p)),
                                                                                    r.attributes.length ? null : (f = {
                                                                                        children: _("Basic display only; raw records are preserved.")
                                                                                    }, s("p", f)),
                                                                                    e.tables.filter((e)=>e.class_id === t && e.entity_id === r.entity_id).map((e)=>{
                                                                                        var t, r, n, i, a, o, l, d, c, u, p, f, h, g, b;
                                                                                        return b = {
                                                                                            children: [
                                                                                                (t = {
                                                                                                    children: [
                                                                                                        e.attribute.name,
                                                                                                        " \xb7",
                                                                                                        " ",
                                                                                                        e.collected ? `${e.rows.length} ${_("rows")}` : tT(e.error)
                                                                                                    ]
                                                                                                }, s("summary", t)),
                                                                                                e.vlan_rules.length ? (f = {
                                                                                                    class: "table",
                                                                                                    children: [
                                                                                                        (u = {
                                                                                                            children: (c = {
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
                                                                                                                    (o = {
                                                                                                                        children: _("Outer treatment (priority / VID / TPID-DEI)")
                                                                                                                    }, s("th", o)),
                                                                                                                    (l = {
                                                                                                                        children: _("Inner treatment (priority / VID / TPID-DEI)")
                                                                                                                    }, s("th", l)),
                                                                                                                    (d = {
                                                                                                                        children: _("Delete entry")
                                                                                                                    }, s("th", d))
                                                                                                                ]
                                                                                                            }, s("tr", c))
                                                                                                        }, s("thead", u)),
                                                                                                        (p = {
                                                                                                            children: e.vlan_rules.map((e)=>{
                                                                                                                var t, r, n, i, a, o, l, d;
                                                                                                                return d = {
                                                                                                                    children: [
                                                                                                                        (t = {
                                                                                                                            children: `${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`
                                                                                                                        }, s("td", t)),
                                                                                                                        (r = {
                                                                                                                            children: `${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`
                                                                                                                        }, s("td", r)),
                                                                                                                        (n = {
                                                                                                                            children: tT(e.filter_ethertype)
                                                                                                                        }, s("td", n)),
                                                                                                                        (i = {
                                                                                                                            children: tT(e.tags_to_remove)
                                                                                                                        }, s("td", i)),
                                                                                                                        (a = {
                                                                                                                            children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                                        }, s("td", a)),
                                                                                                                        (o = {
                                                                                                                            children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                                        }, s("td", o)),
                                                                                                                        (l = {
                                                                                                                            children: tT(e.delete_entry)
                                                                                                                        }, s("td", l))
                                                                                                                    ]
                                                                                                                }, s("tr", d);
                                                                                                            })
                                                                                                        }, s("tbody", p))
                                                                                                    ]
                                                                                                }, s("table", f)) : null,
                                                                                                (h = {
                                                                                                    children: [
                                                                                                        _("G.988 encoded field values"),
                                                                                                        ": ",
                                                                                                        tM(e.attribute)
                                                                                                    ]
                                                                                                }, s("p", h)),
                                                                                                (g = {
                                                                                                    style: "white-space:pre-wrap;overflow-wrap:anywhere",
                                                                                                    children: tI(e.vlan_rules.length ? e.vlan_rules : e.rows)
                                                                                                }, s("pre", g))
                                                                                            ]
                                                                                        }, s("details", b);
                                                                                    }),
                                                                                    (b = {
                                                                                        children: [
                                                                                            (h = {
                                                                                                children: _("Records / diagnostics")
                                                                                            }, s("summary", h)),
                                                                                            (g = {
                                                                                                style: "white-space:pre-wrap;overflow-wrap:anywhere",
                                                                                                children: tI({
                                                                                                    diagnostics: r.diagnostics,
                                                                                                    records: e.records.filter((e)=>e.class_id === t && e.entity_id === r.entity_id)
                                                                                                })
                                                                                            }, s("pre", g))
                                                                                        ]
                                                                                    }, s("details", b))
                                                                                ]
                                                                            }, s("details", v);
                                                                        }));
                                                                    }
                                                                    function u() {
                                                                        let t = l.value.toLowerCase();
                                                                        d.replaceChildren(...e.classes.filter((e)=>`${e.class_id} ${e.name ?? ""}`.toLowerCase().includes(t)).map((e)=>{
                                                                            var t, r;
                                                                            return r = {
                                                                                children: (t = {
                                                                                    type: "button",
                                                                                    class: "cbi-button",
                                                                                    style: "margin:.2em 0;white-space:normal;text-align:left",
                                                                                    onclick: ()=>c(e.class_id),
                                                                                    children: [
                                                                                        e.class_id,
                                                                                        " \xb7 ",
                                                                                        e.name ?? _("Unknown class"),
                                                                                        " (",
                                                                                        e.entities,
                                                                                        ")"
                                                                                    ]
                                                                                }, s("button", t))
                                                                            }, s("div", r);
                                                                        }));
                                                                    }
                                                                    return l.addEventListener("input", u), u(), e.classes.length && c(e.classes[0].class_id), a = {
                                                                        style: "display:flex;gap:1em;flex-wrap:wrap",
                                                                        children: [
                                                                            (i = {
                                                                                style: "flex:0 1 240px",
                                                                                children: [
                                                                                    l,
                                                                                    d
                                                                                ]
                                                                            }, s("div", i)),
                                                                            o
                                                                        ]
                                                                    }, s("div", a);
                                                                }(h), (i = {
                                                                    children: [
                                                                        (r = {
                                                                            children: _("Upload diagnostics")
                                                                        }, s("summary", r)),
                                                                        (n = {
                                                                            children: tI(h.diagnostics)
                                                                        }, s("pre", n))
                                                                    ]
                                                                }, s("details", i))), m.value = tI(h), k && URL.revokeObjectURL(k), z.href = k = URL.createObjectURL(new Blob([
                                                                    m.value
                                                                ], {
                                                                    type: "application/json"
                                                                })), w.disabled = !1, z.style.display = "";
                                                                return;
                                                            }
                                                            if (e.progress) {
                                                                let { phase: t, received: r, expected: n } = e.progress;
                                                                b.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == n ? "" : `: ${r}/${n}`}` : null == n ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${n}`;
                                                            }
                                                            if (Date.now() >= d) throw Error(_("MIB query timed out; retry."));
                                                            await new Promise((e)=>setTimeout(e, 1000));
                                                        }
                                                    } catch (e) {
                                                        C() && (b.textContent = `${String(e)}${h ? ` \xb7 ${_("Previous snapshot retained")}` : ""}`);
                                                    } finally{
                                                        f = !1, $.disabled = j.disabled = !1;
                                                    }
                                                }
                                            }
                                            w.disabled = !0, z.style.display = "none", T(u), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, M);
                                        })(e, "mib"),
                                    children: [
                                        tN("View OMCI / MIB details"),
                                        " \u2192"
                                    ]
                                }, s("button", i))
                            }, s("div", o))
                        ]
                    }, s("div", l)),
                    (x = {
                        class: "fttr-grid-2",
                        children: [
                            (h = {
                                class: "fttr-card",
                                children: [
                                    s("h4", {
                                        style: "margin-top:0;margin-bottom:6px;font-size:92%;color:#888",
                                        children: "\u5149\u7EA4\u7269\u7406\u5C42\u4E0E\u94FE\u8DEF\u53C2\u6570"
                                    }),
                                    (d = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tN("Optical RX power")
                                            }),
                                            s("strong", {
                                                children: tR(e.optical_rx_power_dbm)
                                            })
                                        ]
                                    }, s("div", d)),
                                    (c = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tN("Optical TX power")
                                            }),
                                            s("strong", {
                                                children: tR(e.optical_tx_power_dbm)
                                            })
                                        ]
                                    }, s("div", c)),
                                    (u = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tN("Equalization delay (EQD)")
                                            }),
                                            s("span", {
                                                children: tu(e.equalization_delay_bits)
                                            })
                                        ]
                                    }, s("div", u)),
                                    (p = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tN("Data interface")
                                            }),
                                            s("code", {
                                                children: tD(e.data_path?.interface)
                                            })
                                        ]
                                    }, s("div", p)),
                                    (f = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tN("Identity age")
                                            }),
                                            s("span", {
                                                children: function(e) {
                                                    if (null === e || !Number.isFinite(e) || e < 0) return "\u2014";
                                                    if (e < 60) return `${e} \u{79D2}\u{524D}`;
                                                    let t = Math.floor(e / 60);
                                                    if (t < 60) return `${t} \u{5206}\u{949F}\u{524D}`;
                                                    let r = Math.floor(t / 60);
                                                    return `${r} \u{5C0F}\u{65F6} ${t % 60} \u{5206}\u{949F}\u{524D}`;
                                                }(e.identity_age_seconds)
                                            })
                                        ]
                                    }, s("div", f))
                                ]
                            }, s("div", h)),
                            (k = {
                                class: "fttr-card",
                                children: [
                                    s("h4", {
                                        style: "margin-top:0;margin-bottom:6px;font-size:92%;color:#888",
                                        children: "\u786C\u4EF6\u89C4\u683C\u4E0E\u56FA\u4EF6\u955C\u50CF"
                                    }),
                                    (g = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tN("Equipment ID")
                                            }),
                                            s("span", {
                                                children: tD(j?.equipment_id ?? e.model)
                                            })
                                        ]
                                    }, s("div", g)),
                                    (b = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tN("Hardware version")
                                            }),
                                            s("code", {
                                                children: tD(j?.hardware_version ?? e.hardware_version)
                                            })
                                        ]
                                    }, s("div", b)),
                                    (m = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tN("Firmware version")
                                            }),
                                            (v = {
                                                title: P.full || P.display,
                                                children: s("strong", {
                                                    children: P.display
                                                })
                                            }, s("span", v))
                                        ]
                                    }, s("div", m)),
                                    (y = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tN("OMCC version")
                                            }),
                                            s("span", {
                                                children: j?.omcc_version != null ? `0x${j.omcc_version.toString(16).padStart(2, "0")} (${j.omcc_version})` : "\u2014"
                                            })
                                        ]
                                    }, s("div", y)),
                                    j?.errors.length ? (w = {
                                        class: "fttr-kv-row",
                                        style: "color:#e74c3c",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tN("Identity read errors")
                                            }),
                                            s("span", {
                                                children: j.errors.join("; ")
                                            })
                                        ]
                                    }, s("div", w)) : null,
                                    O.length > 1 ? (z = {
                                        class: "fttr-kv-row",
                                        style: "font-size:80%;color:#888",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tN("Software images")
                                            }),
                                            s("span", {
                                                children: O.join(" \xb7 ")
                                            })
                                        ]
                                    }, s("div", z)) : null
                                ]
                            }, s("div", k))
                        ]
                    }, s("div", x))
                ]
            }, s("div", $);
        })
    }, s("div", t)) : (r = {
        class: "cbi-section fttr-panel-subgateways",
        children: s("p", {
            style: "text-align:center;color:#888;padding:2em 0",
            children: tN("No sub-gateways are currently registered.")
        })
    }, s("div", r));
}
let main = tC.extend({
    load: ()=>t_(),
    render: (e)=>{
        var t, r;
        let n, i, a, o, l, d, c, u, p;
        return n = "controller", i = [
            {
                id: "controller",
                label: tN("Controller & optical transceiver")
            },
            {
                id: "subgateways",
                label: tN("Sub-gateways & optical links")
            }
        ], a = new Map(), o = tZ(e), l = tL(e.sub_gateways ?? []), t = {
            class: "cbi-tabmenu",
            style: "margin-top:14px;margin-bottom:0",
            children: i.map((e)=>{
                var t;
                let r = (t = {
                    class: n === e.id ? "cbi-tab" : "cbi-tab-disabled",
                    "data-tab": e.id,
                    children: s("a", {
                        href: `#tab-${e.id}`,
                        onclick: (t)=>{
                            t.preventDefault();
                            var r = e.id;
                            for (let [e, t] of (n = r, a))t.className = e === r ? "cbi-tab" : "cbi-tab-disabled";
                            o.hidden = "controller" !== r, l.hidden = "subgateways" !== r, window.dispatchEvent(new Event("resize"));
                        },
                        children: e.label
                    })
                }, s("li", t));
                return a.set(e.id, r), r;
            })
        }, d = s("ul", t), o.hidden = !1, l.hidden = !0, c = s("div", {
            id: "fttr-panels-container",
            children: [
                o,
                l
            ]
        }), r = {
            class: "cbi-map fttr-hardware",
            children: [
                s("style", {
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
                s("h2", {
                    children: tN("FTTR hardware status")
                }),
                d,
                c,
                s("p", {
                    class: "cbi-footer",
                    style: "margin-top:1.5em;font-size:85%;color:#888",
                    children: tN("Identity information is read-only and limited to fields provided by fttrctl status.")
                })
            ]
        }, u = s("div", r), p = !1, L.Poll.add(async ()=>{
            if (u.isConnected && !p) {
                p = !0;
                try {
                    let e = await t_(), t = tZ(e), r = tL(e.sub_gateways ?? []);
                    t.hidden = "controller" !== n, r.hidden = "subgateways" !== n, o.replaceWith(t), l.replaceWith(r), o = t, l = r;
                } catch  {} finally{
                    p = !1;
                }
            }
        }, 10), u;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;