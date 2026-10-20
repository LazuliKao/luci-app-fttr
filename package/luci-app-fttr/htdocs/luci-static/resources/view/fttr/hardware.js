'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, r, i, n;
const a = Symbol.for("jsx.fragment");
function s(e, t) {
    let { children: r, ...i } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, n = function e(t) {
        let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let i of t)null != i && "boolean" != typeof i && (Array.isArray(i) ? e(i, r) : r.push(i instanceof Node ? i : String(i)));
        return r;
    }(null == r ? [] : Array.isArray(r) ? r : [
        r
    ]);
    if (e === a) {
        let e = document.createDocumentFragment();
        return e.append(...n), e;
    }
    if ("function" == typeof e) {
        let t = Reflect.apply(e, void 0, [
            {
                ...i,
                children: n
            }
        ]);
        if (!(t instanceof Node)) throw TypeError("JSX components must return a DOM Node");
        return t;
    }
    if ("string" != typeof e) throw TypeError("JSX element types must be tag names or component functions");
    let s = {}, o = {
        ...i
    };
    for (let [e, t] of Object.entries(o))e.startsWith("on") && "function" == typeof t ? (s[e] = t, delete o[e]) : "boolean" == typeof t && (t ? o[e] = e : delete o[e]);
    let l = Object.keys(o).length > 0 ? n.length > 1 ? E(e, o, n) : E(e, o, n[0]) : n.length > 1 ? E(e, {}, n) : E(e, {}, n[0]);
    for (let [e, t] of Object.entries(s)){
        let r = e.slice(2).toLowerCase();
        l.addEventListener(r, t);
    }
    return l;
}
function o(e, t, r) {
    function i(r, i) {
        if (r._zod || Object.defineProperty(r, "_zod", {
            value: {
                def: i,
                constr: s,
                traits: new Set()
            },
            enumerable: !1
        }), r._zod.traits.has(e)) return;
        r._zod.traits.add(e), t(r, i);
        let n = s.prototype, a = Object.keys(n);
        for(let e = 0; e < a.length; e++){
            let t = a[e];
            t in r || (r[t] = n[t].bind(r));
        }
    }
    let n = r?.Parent ?? Object;
    class a extends n {
    }
    function s(e) {
        var t;
        let n = r?.Parent ? new a() : this;
        for (let r of (i(n, e), (t = n._zod).deferred ?? (t.deferred = []), n._zod.deferred))r();
        return n;
    }
    return Object.defineProperty(a, "name", {
        value: e
    }), Object.defineProperty(s, "init", {
        value: i
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
    let t = +!!e.startsWith("^"), r = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, r);
}
const h = Symbol("evaluating");
function b(e, t, r) {
    let i;
    Object.defineProperty(e, t, {
        get () {
            if (i !== h) return void 0 === i && (i = h, i = r()), i;
        },
        set (r) {
            Object.defineProperty(e, t, {
                value: r
            });
        },
        configurable: !0
    });
}
function m(e, t, r) {
    Object.defineProperty(e, t, {
        value: r,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
}
function g(...e) {
    let t = {};
    for (let r of e)Object.assign(t, Object.getOwnPropertyDescriptors(r));
    return Object.defineProperties({}, t);
}
const v = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
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
const x = new Set([
    "string",
    "number",
    "symbol"
]);
function z(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function k(e, t, r) {
    let i = new e._zod.constr(t ?? e._zod.def);
    return (!t || r?.parent) && (i._zod.parent = e), i;
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
function M(e, t, r) {
    let i = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (i.message = P(e.inst?._zod.def?.error?.(e)) ?? P(t?.error?.(e)) ?? P(r.customError?.(e)) ?? P(r.localeError?.(e)) ?? "Invalid input"), delete i.inst, delete i.continue, t?.reportInput || delete i.input, i;
}
const S = (e, t)=>{
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
}, I = o("$ZodError", S), T = o("$ZodError", S, {
    Parent: Error
}), C = (t = T, (e, r, i, n)=>{
    let a = i ? Object.assign(i, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: r,
        issues: []
    }, a);
    if (s instanceof Promise) throw new l();
    if (s.issues.length) {
        let e = new (n?.Err ?? t)(s.issues.map((e)=>M(e, a, c())));
        throw v(e, n?.callee), e;
    }
    return s.value;
}), N = (r = T, async (e, t, i, n)=>{
    let a = i ? Object.assign(i, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (n?.Err ?? r)(s.issues.map((e)=>M(e, a, c())));
        throw v(e, n?.callee), e;
    }
    return s.value;
}), R = (i = T, (e, t, r)=>{
    let n = r ? {
        ...r,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, n);
    if (a instanceof Promise) throw new l();
    return a.issues.length ? {
        success: !1,
        error: new (i ?? I)(a.issues.map((e)=>M(e, n, c())))
    } : {
        success: !0,
        data: a.value
    };
}), D = (n = T, async (e, t, r)=>{
    let i = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, a = e._zod.run({
        value: t,
        issues: []
    }, i);
    return a instanceof Promise && (a = await a), a.issues.length ? {
        success: !1,
        error: new n(a.issues.map((e)=>M(e, i, c())))
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
    let i = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && i.unshift(e), i))for (let r of t._zod.onattach)r(e);
    if (0 === i.length) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, r)=>{
            let i, n = j(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (n) continue;
                let t = e.issues.length, s = a._zod.check(e);
                if (s instanceof Promise && r?.async === !1) throw new l();
                if (i || s instanceof Promise) i = (i ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (n || (n = j(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    n || (n = j(e, t));
                }
            }
            return i ? i.then(()=>e) : e;
        }, r = (r, n, a)=>{
            if (j(r)) return r.aborted = !0, r;
            let s = t(n, i, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new l();
                return s.then((t)=>e._zod.parse(t, a));
            }
            return e._zod.parse(s, a);
        };
        e._zod.run = (n, a)=>{
            if (a.skipChecks) return e._zod.parse(n, a);
            if ("backward" === a.direction) {
                let t = e._zod.parse({
                    value: n.value,
                    issues: []
                }, {
                    ...a,
                    skipChecks: !0
                });
                return t instanceof Promise ? t.then((e)=>r(e, n, a)) : r(t, n, a);
            }
            let s = e._zod.parse(n, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new l();
                return s.then((e)=>t(e, i, a));
            }
            return t(s, i, a);
        };
    }
    b(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = R(e, t);
                    return r.success ? {
                        value: r.data
                    } : {
                        issues: r.error?.issues
                    };
                } catch (r) {
                    return D(e, t).then((e)=>e.success ? {
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
    let i;
    V.init(e, t), e._zod.pattern = [
        ...e?._zod.bag?.patterns ?? []
    ].pop() ?? (i = (r = e._zod.bag) ? `[\\s\\S]{${r?.minimum ?? 0},${r?.maximum ?? ""}}` : "[\\s\\S]*", RegExp(`^${i}$`)), e._zod.parse = (r, i)=>{
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
    V.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? Z, e._zod.parse = (r, i)=>{
        if (t.coerce) try {
            r.value = Number(r.value);
        } catch (e) {}
        let n = r.value;
        if ("number" == typeof n && !Number.isNaN(n) && Number.isFinite(n)) return r;
        let a = "number" == typeof n ? Number.isNaN(n) ? "NaN" : Number.isFinite(n) ? void 0 : "Infinity" : void 0;
        return r.issues.push({
            expected: "number",
            code: "invalid_type",
            input: n,
            inst: e,
            ...a ? {
                received: a
            } : {}
        }), r;
    };
}), J = o("$ZodBoolean", (e, t)=>{
    V.init(e, t), e._zod.pattern = A, e._zod.parse = (r, i)=>{
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
}), W = o("$ZodNull", (e, t)=>{
    V.init(e, t), e._zod.pattern = B, e._zod.values = new Set([
        null
    ]), e._zod.parse = (t, r)=>{
        let i = t.value;
        return null === i || t.issues.push({
            expected: "null",
            code: "invalid_type",
            input: i,
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
    V.init(e, t), e._zod.parse = (r, i)=>{
        let n = r.value;
        if (!Array.isArray(n)) return r.issues.push({
            expected: "array",
            code: "invalid_type",
            input: n,
            inst: e
        }), r;
        r.value = Array(n.length);
        let a = [];
        for(let e = 0; e < n.length; e++){
            let s = n[e], o = t.element._zod.run({
                value: s,
                issues: []
            }, i);
            o instanceof Promise ? a.push(o.then((t)=>G(t, r, e))) : G(o, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function K(e, t, r, i, n) {
    if (e.issues.length) {
        if (n && !(r in i)) return;
        t.issues.push(...O(r, e.issues));
    }
    void 0 === e.value ? r in i && (t.value[r] = void 0) : t.value[r] = e.value;
}
const Q = o("$ZodObject", (e, t)=>{
    let r;
    V.init(e, t);
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
    let n = u(()=>(function(e) {
            var t;
            let r = Object.keys(e.shape);
            for (let t of r)if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${t}": expected a Zod schema`);
            let i = Object.keys(t = e.shape).filter((e)=>"optional" === t[e]._zod.optin && "optional" === t[e]._zod.optout);
            return {
                ...e,
                keys: r,
                keySet: new Set(r),
                numKeys: r.length,
                optionalKeys: new Set(i)
            };
        })(t));
    b(e._zod, "propValues", ()=>{
        let e = t.shape, r = {};
        for(let t in e){
            let i = e[t]._zod;
            if (i.values) for (let e of (r[t] ?? (r[t] = new Set()), i.values))r[t].add(e);
        }
        return r;
    });
    let a = t.catchall;
    e._zod.parse = (t, i)=>{
        r ?? (r = n.value);
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
            let r = l[e], n = "optional" === r._zod.optout, a = r._zod.run({
                value: s[e],
                issues: []
            }, i);
            a instanceof Promise ? o.push(a.then((r)=>K(r, t, e, s, n))) : K(a, t, e, s, n);
        }
        return a ? function(e, t, r, i, n, a) {
            let s = [], o = n.keySet, l = n.catchall._zod, d = l.def.type, c = "optional" === l.optout;
            for(let n in t){
                if (o.has(n)) continue;
                if ("never" === d) {
                    s.push(n);
                    continue;
                }
                let a = l.run({
                    value: t[n],
                    issues: []
                }, i);
                a instanceof Promise ? e.push(a.then((e)=>K(e, r, n, t, c))) : K(a, r, n, t, c);
            }
            return (s.length && r.issues.push({
                code: "unrecognized_keys",
                keys: s,
                input: t,
                inst: a
            }), e.length) ? Promise.all(e).then(()=>r) : r;
        }(o, s, t, i, n.value, e) : o.length ? Promise.all(o).then(()=>t) : t;
    };
});
function Y(e, t, r, i) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let n = e.filter((e)=>!j(e));
    return 1 === n.length ? (t.value = n[0].value, n[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>M(e, i, c())))
    }), t);
}
const ee = o("$ZodUnion", (e, t)=>{
    V.init(e, t), b(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), b(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), b(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), b(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>f(e.source)).join("|")})$`);
        }
    });
    let r = 1 === t.options.length, i = t.options[0]._zod.run;
    e._zod.parse = (n, a)=>{
        if (r) return i(n, a);
        let s = !1, o = [];
        for (let e of t.options){
            let t = e._zod.run({
                value: n.value,
                issues: []
            }, a);
            if (t instanceof Promise) o.push(t), s = !0;
            else {
                if (0 === t.issues.length) return t;
                o.push(t);
            }
        }
        return s ? Promise.all(o).then((t)=>Y(t, n, e, a)) : Y(o, n, e, a);
    };
}), et = o("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, ee.init(e, t);
    let r = e._zod.parse;
    b(e._zod, "propValues", ()=>{
        let e = {};
        for (let r of t.options){
            let i = r._zod.propValues;
            if (!i || 0 === Object.keys(i).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
            for (let [t, r] of Object.entries(i))for (let i of (e[t] || (e[t] = new Set()), r))e[t].add(i);
        }
        return e;
    });
    let i = u(()=>{
        let e = t.options, r = new Map();
        for (let i of e){
            let e = i._zod.propValues?.[t.discriminator];
            if (!e || 0 === e.size) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(i)}"`);
            for (let t of e){
                if (r.has(t)) throw Error(`Duplicate discriminator value "${String(t)}"`);
                r.set(t, i);
            }
        }
        return r;
    });
    e._zod.parse = (n, a)=>{
        let s = n.value;
        if (!y(s)) return n.issues.push({
            code: "invalid_type",
            expected: "object",
            input: s,
            inst: e
        }), n;
        let o = i.value.get(s?.[t.discriminator]);
        return o ? o._zod.run(n, a) : t.unionFallback ? r(n, a) : (n.issues.push({
            code: "invalid_union",
            errors: [],
            note: "No matching discriminator",
            discriminator: t.discriminator,
            input: s,
            path: [
                t.discriminator
            ],
            inst: e
        }), n);
    };
}), er = o("$ZodRecord", (e, t)=>{
    V.init(e, t), e._zod.parse = (r, i)=>{
        let n = r.value;
        if (!w(n)) return r.issues.push({
            expected: "record",
            code: "invalid_type",
            input: n,
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
                    value: n[e],
                    issues: []
                }, i);
                s instanceof Promise ? a.push(s.then((t)=>{
                    t.issues.length && r.issues.push(...O(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...O(e, s.issues)), r.value[e] = s.value);
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
            }, i);
            if (o instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof s && Z.test(s) && o.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(s),
                    issues: []
                }, i);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (o = e);
            }
            if (o.issues.length) {
                "loose" === t.mode ? r.value[s] = n[s] : r.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: o.issues.map((e)=>M(e, i, c())),
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
            }, i);
            l instanceof Promise ? a.push(l.then((e)=>{
                e.issues.length && r.issues.push(...O(s, e.issues)), r.value[o.value] = e.value;
            })) : (l.issues.length && r.issues.push(...O(s, l.issues)), r.value[o.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), ei = o("$ZodEnum", (e, t)=>{
    var r;
    let i;
    V.init(e, t);
    let n = (i = Object.values(r = t.entries).filter((e)=>"number" == typeof e), Object.entries(r).filter(([e, t])=>-1 === i.indexOf(+e)).map(([e, t])=>t)), a = new Set(n);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${n.filter((e)=>x.has(typeof e)).map((e)=>"string" == typeof e ? z(e) : e.toString()).join("|")})$`), e._zod.parse = (t, r)=>{
        let i = t.value;
        return a.has(i) || t.issues.push({
            code: "invalid_value",
            values: n,
            input: i,
            inst: e
        }), t;
    };
}), en = o("$ZodLiteral", (e, t)=>{
    if (V.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? z(e) : e ? z(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (i, n)=>{
        let a = i.value;
        return r.has(a) || i.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
            inst: e
        }), i;
    };
});
function ea(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const es = o("$ZodOptional", (e, t)=>{
    V.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", b(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), b(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let i = t.innerType._zod.run(e, r);
            return i instanceof Promise ? i.then((t)=>ea(t, e.value)) : ea(i, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, r);
    };
}), eo = o("$ZodNullable", (e, t)=>{
    V.init(e, t), b(e._zod, "optin", ()=>t.innerType._zod.optin), b(e._zod, "optout", ()=>t.innerType._zod.optout), b(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)}|null)$`) : void 0;
    }), b(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), el = o("$ZodCatch", (e, t)=>{
    V.init(e, t), b(e._zod, "optin", ()=>t.innerType._zod.optin), b(e._zod, "optout", ()=>t.innerType._zod.optout), b(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let i = t.innerType._zod.run(e, r);
        return i instanceof Promise ? i.then((i)=>(e.value = i.value, i.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: i.issues.map((e)=>M(e, r, c()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = i.value, i.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: i.issues.map((e)=>M(e, r, c()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ed = o("$ZodLazy", (e, t)=>{
    V.init(e, t), b(e._zod, "innerType", ()=>t.getter()), b(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), b(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), b(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), b(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
            let i = {
                ...r,
                ...this._map.get(e)
            };
            return Object.keys(i).length ? i : void 0;
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
        }), e.safeParse = (t, r)=>R(e, t, r), e.parseAsync = async (t, r)=>N(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>D(e, t, r), e.check = (...r)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, r)=>k(e, t, r), e.brand = ()=>e, e.register = (t, r)=>(t.add(e, r), e), e.apply = (t)=>t(e);
}), ep = o("ZodMiniString", (e, t)=>{
    q.init(e, t), ec.init(e, t);
});
function eu(e) {
    return new ep({
        type: "string",
        ...$(e)
    });
}
const ef = o("ZodMiniNumber", (e, t)=>{
    F.init(e, t), ec.init(e, t);
});
function eh(e) {
    return new ef({
        type: "number",
        checks: [],
        ...$(e)
    });
}
const eb = o("ZodMiniBoolean", (e, t)=>{
    J.init(e, t), ec.init(e, t);
});
function e_(e) {
    return new eb({
        type: "boolean",
        ...$(e)
    });
}
const em = o("ZodMiniNull", (e, t)=>{
    W.init(e, t), ec.init(e, t);
}), eg = o("ZodMiniNever", (e, t)=>{
    X.init(e, t), ec.init(e, t);
});
function ev(e) {
    return new eg({
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
const ex = o("ZodMiniObject", (e, t)=>{
    Q.init(e, t), ec.init(e, t), b(e, "shape", ()=>t.shape);
});
function ez(e, t) {
    return new ex({
        type: "object",
        shape: e ?? {},
        ...$(t)
    });
}
const ek = o("ZodMiniUnion", (e, t)=>{
    ee.init(e, t), ec.init(e, t);
});
function e$(e, t) {
    return new ek({
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
const eE = o("ZodMiniRecord", (e, t)=>{
    er.init(e, t), ec.init(e, t);
});
function eP(e, t, r) {
    return new eE({
        type: "record",
        keyType: e,
        valueType: t,
        ...$(r)
    });
}
const eM = o("ZodMiniEnum", (e, t)=>{
    ei.init(e, t), ec.init(e, t), e.options = Object.values(t.entries);
});
function eS(e, t) {
    return new eM({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...$(t)
    });
}
const eI = o("ZodMiniLiteral", (e, t)=>{
    en.init(e, t), ec.init(e, t);
});
function eT(e, t) {
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
const eR = o("ZodMiniNullable", (e, t)=>{
    eo.init(e, t), ec.init(e, t);
});
function eD(e) {
    return new eR({
        type: "nullable",
        innerType: e
    });
}
const eL = o("ZodMiniCatch", (e, t)=>{
    el.init(e, t), ec.init(e, t);
}), eZ = o("ZodMiniLazy", (e, t)=>{
    ed.init(e, t), ec.init(e, t);
});
function eA() {
    let e = new eZ({
        type: "lazy",
        getter: ()=>e$([
                eu(),
                eh(),
                e_(),
                new em({
                    type: "null",
                    ...$(void 0)
                }),
                ew(e),
                eP(eu(), e)
            ])
    });
    return e;
}
let eB = ez({
    error: e$([
        eu(),
        ez({
            code: eu(),
            message: eu()
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
const eq = ez({
    status: eT("pending"),
    job: eu()
});
eO("status", [
    ez({
        status: eT("pending")
    }),
    ez({
        status: eT("ready"),
        chunk: eh(),
        chunks: eh(),
        bytes: eh(),
        data: eu()
    })
]);
let eF = eu(), eJ = eh(), eW = e_(), eX = eN(eF), eG = eN(eJ), eH = eN(eW);
const eK = eS([
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
]), eQ = eS([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), eY = ez({
    id: eF,
    name: eN(eD(eF)),
    kind: eS([
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
    task_id: eN(eD(eJ)),
    updated_at: eG,
    changes: eN(ew(ez({
        name: eF,
        desired: eF
    })))
});
let e0 = ez({
    state: eF,
    reason: eX,
    task_id: eN(eD(eJ)),
    instance: eG
});
const e1 = ez({
    cwmp_id: eF,
    state: eS([
        "online",
        "waiting_inform",
        "offline_or_stale"
    ]),
    optical_online: eW,
    last_inform: eD(eJ),
    age_seconds: eD(eJ)
});
let e2 = ez({
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
    method: eX,
    reason: eX,
    mqtt_target: eD(eF),
    binding_source: eX,
    link_identity_error: eD(eF),
    mqtt_last_seen: eD(eJ),
    cwmp_id: eX,
    desired_version: eX,
    generation: eG,
    inflight: eH,
    attempts: eG,
    next_retry_at: eG,
    updated_at: eG,
    settings_verified_at: eD(eJ),
    last_inform: eD(eJ),
    last_error: eN(eD(eF)),
    persistence_error: eN(eD(eF)),
    desired: eN(eD(ez({
        vlan: eJ,
        vlans: ew(eJ),
        priority: eJ,
        acs_url: eF
    }))),
    listener: eN(ez({
        enabled: eW,
        listen: eF,
        path: eF,
        error: eD(eF)
    })),
    endpoint_notice: eX,
    manual_steps: eN(ew(eF))
});
const e5 = eO("state", [
    e2,
    function(e, t) {
        if (!w(t)) throw Error("Invalid input to extend: expected a plain object");
        let r = e._zod.def.checks;
        if (r && r.length > 0) {
            let r = e._zod.def.shape;
            for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(r, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let i = g(e._zod.def, {
            get shape () {
                let r = {
                    ...e._zod.def.shape,
                    ...t
                };
                return m(this, "shape", r), r;
            }
        });
        return k(e, i);
    }(function(e) {
        var t = void 0;
        let r = e._zod.def.checks;
        if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let i = g(e._zod.def, {
            get shape () {
                let r = e._zod.def.shape, i = {
                    ...r
                };
                if (t) for(let e in t){
                    if (!(e in r)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (i[e] = eC ? new eC({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)i[e] = eC ? new eC({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return m(this, "shape", i), i;
            },
            checks: []
        });
        return k(e, i);
    }(e2), {
        state: eS([
            "pending",
            "unavailable"
        ]),
        reason: eF
    })
]), e8 = ez({
    state: eK,
    operation_id: eG,
    device: eX,
    optical_sn: eX,
    cwmp_id: eX,
    revision: eX,
    mode: eN(eS([
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
    cwmp_contract: eN(ez({
        state: eF,
        requested: eF,
        contract: eD(eF),
        reason: eF,
        cache_hit: eW,
        schema: eF,
        capabilities: eD(ez({
            wan: eF,
            wlan: eF,
            binding: eF
        }))
    })),
    wan_objects: eN(eP(eF, eA())),
    wan_lifecycle: eN(eP(eF, e0)),
    wan_stage: eN(eS([
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
    wifi_objects: eN(ez({
        owned: ew(eJ),
        pending: eD(eF),
        pending_instance: eD(eJ)
    })),
    wifi_lifecycle: eN(eP(eF, e0)),
    wifi_stage: eN(eS([
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
    wifi_cleanup: eN(eS([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e4 = ez({
    enabled: eW,
    mode: eS([
        "auto",
        "manual"
    ]),
    vlan: ew(eJ),
    priority: eJ,
    address: eF,
    acs_url: eF,
    port: eJ,
    path: eF,
    dhcp_enabled: eW
}), e3 = ez({
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
    error: eD(eF),
    inflight: eW,
    ready: eW,
    desired_version: eD(eF),
    applied_version: eD(eF),
    next_retry_at: eJ,
    attempts: eJ,
    desired: eD(e4),
    applied: eD(e4),
    previous: eD(e4),
    plan: ew(ez({
        operation: eF,
        key: eF,
        value: ew(eF)
    }))
});
const e6 = ez({
    device: eF,
    name: eD(eF),
    group: eD(eF),
    group_name: eD(eF),
    template: eD(eF),
    template_name: eD(eF),
    optical_sn: eF,
    adapter: eF,
    omci_management: ez({
        state: eF,
        reason: eX
    }),
    management: eD(e1),
    acs_bootstrap: e5,
    provisioning: e8,
    services: ew(eY),
    ssids: ew(eY),
    wifi_sync: eQ
}), e7 = ez({
    enabled: eW,
    mode: eS([
        "auto",
        "manual"
    ]),
    method: eT("diff"),
    revision: eF,
    triggers: ew(eF),
    interval_minutes: new ef({
        type: "number",
        coerce: !0,
        checks: [],
        ...$(void 0)
    }),
    error: eD(eF),
    devices: ew(e6),
    management_network: e3,
    omci_management: eA(),
    groups: ew(ez({
        id: eF,
        name: eD(eF),
        template: eF
    })),
    pending_devices: ew(eF)
});
e$([
    ez({
        valid: eT(!0),
        revision: eF,
        devices: eJ,
        error: eN(ev())
    }),
    ez({
        error: eF,
        valid: eN(ev()),
        revision: eN(ev()),
        devices: eN(ev())
    })
]);
let e9 = eu(), te = eh(), tt = eD(te), tr = eP(e9, ez({
    source: e9,
    unit: e9,
    reason: eD(e9),
    raw: eD(e9),
    age_seconds: tt
}));
const ti = ez({
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
    generation: te,
    error: eD(e9)
}), tn = eS([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let ta = ez({
    model: e9,
    wavelength_tx_nm: te,
    wavelength_rx_nm: te,
    phy_rate_downlink_gbps: te,
    phy_rate_uplink_gbps: te,
    tx_power_dbm: tt,
    laser_bias_current_ma: tt,
    temperature_celsius: tt,
    vcc_voltage: tt,
    cdr_locked: eD(e_()),
    measurements: tr
}), ts = ez({
    equipment_id: eD(e9),
    hardware_version: eD(e9),
    software_images: ew(e9),
    omcc_version: tt,
    errors: ew(e9)
});
const to = ez({
    onu_id: te,
    vendor: e9,
    model: e9,
    serial_number: e9,
    state: tn,
    business_status: ti,
    management: eD(e1),
    provisioning: eD(e8),
    services: ew(eY),
    ssids: ew(eY),
    wifi_sync: eQ,
    acs_bootstrap: eN(e5),
    identity: eD(ts),
    identity_age_seconds: tt,
    identity_current: e_(),
    fiber_distance_m: tt,
    ranging_delay_rtd_ns: tt,
    equalization_delay_bits: new eL({
        type: "catch",
        innerType: tt,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tt,
    optical_tx_power_dbm: tt,
    firmware_version: e9,
    hardware_version: e9,
    uptime_seconds: tt,
    data_path: ez({
        interface: e9,
        gem_ports: eD(ew(te)),
        vlan_id: tt,
        tx_bytes: tt,
        rx_bytes: tt,
        current_tx_kbps: tt,
        current_rx_kbps: tt,
        measurements: tr
    }),
    wifi_mesh: ez({
        channel_2g: tt,
        channel_5g: tt,
        bandwidth_5g: eD(e9),
        tx_power_pct: tt,
        measurements: tr
    }),
    connected_clients: eD(ew(ez({
        mac: e9,
        ip: e9,
        band: e9,
        rssi_dbm: tt,
        rx_rate_mbps: tt,
        tx_rate_mbps: tt
    }))),
    measurements: tr
});
let tl = ez({
    port: te,
    interface: e9,
    carrier: e_(),
    status: e9,
    onu_id: eN(te),
    onu_sn: eN(e9),
    link_state: e9
});
const td = ez({
    fpga_status: e9,
    provisioning: eD(e7),
    optical_transceiver: ta,
    switch_ports: ew(tl),
    sub_gateways: ew(to),
    telemetry_gateways: ew(ez({
        id: e9,
        last_seen_sec_ago: te,
        last_payload_bytes: te
    }))
});
eP(e9, ez({
    carrier: eN(e_()),
    mac: eN(e9),
    link: eN(ez({
        speed: eN(te),
        duplex: eN(e9),
        autoneg: eN(e_())
    })),
    stats: eN(eP(e9, te))
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
function tp(e) {
    return null === e ? "\u2014" : `${e} bits`;
}
let tu = L.rpc.declare({
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
const tf = async ()=>td.parse(eV(await tu()));
e$([
    ez({
        operation_ids: ew(eh()),
        revision: eu()
    }),
    ez({
        started: eT(!0),
        mode: eS([
            "apply",
            "plan"
        ])
    }),
    ez({
        reset: eT(!0),
        device: eu()
    }),
    ez({
        operation_ids: ew(eh()),
        mode: eS([
            "apply",
            "plan"
        ]),
        reconcile: eN(e_()),
        retry: eN(e_())
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
}), ez({
    source: eS([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: eu(),
    size: eh(),
    sha256: eu(),
    data: eN(eu()),
    factory: ez({
        detected: e_(),
        device: eu(),
        has_data: e_(),
        sha256: eu(),
        data: eu()
    }),
    firmware: ez({
        exists: e_(),
        path: eu(),
        size: eh(),
        sha256: eu(),
        data: eu()
    }),
    error: eN(eu())
}), ez({
    success: e_(),
    path: eu(),
    size: eh(),
    sha256: eu(),
    error: eN(eu())
}), ez({
    success: e_(),
    output: eN(eu()),
    error: eN(eu())
});
let th = eu(), tb = eh(), t_ = e_(), tm = ez({
    id: th,
    url: th
}), tg = ez({
    name: th,
    kind: eS([
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
    index: tb,
    mask: tb,
    size: tb,
    read: t_,
    write: t_,
    set_by_create: t_,
    avc: t_,
    optional: t_,
    deprecated: t_,
    default_hex: eD(th),
    reference: tm
}), tv = eO("type", [
    ez({
        type: eT("unsigned"),
        value: tb
    }),
    ez({
        type: eT("signed"),
        value: tb
    }),
    ez({
        type: eT("decimal"),
        value: th
    }),
    ez({
        type: eT("text"),
        value: eD(th)
    }),
    ez({
        type: eT("octets"),
        hex: th
    }),
    ez({
        type: eT("table_length"),
        bytes: tb
    })
]), ty = ez({
    code: th,
    message: th,
    offset: tb,
    mask: tb
}), tw = eS([
    "layout",
    "name_only",
    "unknown"
]), tx = ez({
    raw_hex: th,
    filter_outer_priority: tb,
    filter_outer_vid: tb,
    filter_outer_tpid_dei: tb,
    filter_inner_priority: tb,
    filter_inner_vid: tb,
    filter_inner_tpid_dei: tb,
    filter_ethertype: tb,
    tags_to_remove: tb,
    treatment_outer_priority: tb,
    treatment_outer_vid: tb,
    treatment_outer_tpid_dei: tb,
    treatment_inner_priority: tb,
    treatment_inner_vid: tb,
    treatment_inner_tpid_dei: tb,
    delete_entry: t_
}), tz = ez({
    schema_version: eT(1),
    reference_version: th,
    onu_id: eD(tb),
    uploaded_complete: t_,
    expected_records: tb,
    received_records: tb,
    decoded_records: tb,
    partial_records: tb,
    basic_records: tb,
    tables_requested: t_,
    tables_collected: t_,
    classes: ew(ez({
        class_id: tb,
        name: eD(th),
        entities: tb,
        records: tb,
        support: tw
    })),
    entities: ew(ez({
        class_id: tb,
        entity_id: tb,
        name: eD(th),
        support: tw,
        reference: eD(tm),
        sequences: ew(tb),
        attributes: ew(ez({
            definition: tg,
            value: eD(tv),
            observations: ew(ez({
                raw_hex: th,
                value: tv,
                sequences: ew(tb)
            }))
        })),
        diagnostics: ew(ty)
    })),
    records: ew(ez({
        class_id: tb,
        entity_id: tb,
        sequence: tb,
        attribute_mask: tb,
        raw_hex: th,
        consumed: tb,
        remaining_hex: th,
        undecoded_mask: tb
    })),
    tables: ew(ez({
        class_id: tb,
        entity_id: tb,
        attribute: tg,
        collected: t_,
        error: eD(th),
        raw_hex: th,
        rows: ew(th),
        vlan_rules: ew(tx)
    })),
    diagnostics: ew(ty)
});
const tk = ez({
    status: eT("ready"),
    report: tz
});
let t$ = ez({
    phase: eS([
        "starting",
        "upload",
        "tables"
    ]),
    received: tb,
    expected: eD(tb)
}), tj = eO("status", [
    ez({
        status: eT("pending"),
        progress: eN(t$)
    }),
    ez({
        status: eT("ready"),
        chunk: tb,
        chunks: tb,
        bytes: tb,
        data: th
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
}), tE = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
}), tP = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_release",
    params: [
        "job"
    ],
    reject: !0
});
const tM = async (e, t, r)=>eq.parse(eV(await tO(e, t, r))), tS = async (e, t)=>tj.parse(eV(await tE(e, t))), tI = async (e)=>ez({
        released: t_
    }).parse(eV(await tP(e)));
let tT = (e)=>null == e || "" === e ? "\u2014" : String(e), tC = (e)=>JSON.stringify(e, null, 2);
async function tN(e) {
    let t = [
        "{"
    ], r = !0;
    for (let [i, n] of Object.entries(e))if (r || t.push(","), r = !1, t.push(JSON.stringify(i), ":"), Array.isArray(n)) {
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
function tR(e) {
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
let tD = L.view;
function tL(e) {
    return _(e) || e;
}
let tZ = (e)=>null == e || "" === e ? "\u2014" : String(e);
function tA(e) {
    return null !== e && Number.isFinite(e) ? `${e.toFixed(2)} dBm` : "\u2014";
}
function tB(e) {
    var t, r, i, n, a, o, l, d, c, p, u, f, h, b, m, g, v, y;
    let w = e.optical_transceiver, x = s("span", {
        class: `fttr-badge ${"ready" === e.fpga_status ? "fttr-badge-success" : "fttr-badge-neutral"}`,
        style: "font-size:95%",
        children: "ready" === e.fpga_status ? tL("Ready") : tZ(e.fpga_status)
    }), z = null === (t = w.cdr_locked) ? s("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: tL("Unknown")
    }) : t ? s("span", {
        class: "fttr-badge fttr-badge-success",
        children: tL("Locked")
    }) : s("span", {
        class: "fttr-badge fttr-badge-warning",
        children: tL("Unlocked")
    });
    return y = {
        class: "cbi-section fttr-panel-controller",
        children: [
            s("h3", {
                style: "margin-bottom:12px",
                children: tL("Controller hardware")
            }),
            (v = {
                class: "fttr-grid-3",
                children: [
                    (a = {
                        class: "fttr-card",
                        children: [
                            s("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: tL("FPGA status")
                            }),
                            (r = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tL("FPGA status")
                                    }),
                                    s("span", {
                                        children: x
                                    })
                                ]
                            }, s("div", r)),
                            (i = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: "FPGA \u6807\u8BC6"
                                    }),
                                    s("code", {
                                        children: tZ(e.fpga_status)
                                    })
                                ]
                            }, s("div", i)),
                            (n = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tL("CDR lock")
                                    }),
                                    s("span", {
                                        children: z
                                    })
                                ]
                            }, s("div", n))
                        ]
                    }, s("div", a)),
                    (c = {
                        class: "fttr-card",
                        children: [
                            s("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: tL("Optical transceiver")
                            }),
                            (o = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: "\u6A21\u5757\u578B\u53F7"
                                    }),
                                    s("strong", {
                                        children: tZ(w.model)
                                    })
                                ]
                            }, s("div", o)),
                            (l = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tL("TX wavelength")
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
                                        children: tL("RX wavelength")
                                    }),
                                    s("span", {
                                        children: w.wavelength_rx_nm ? `${w.wavelength_rx_nm} nm` : "\u2014"
                                    })
                                ]
                            }, s("div", d))
                        ]
                    }, s("div", c)),
                    (g = {
                        class: "fttr-card",
                        children: [
                            s("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: "\u7269\u7406\u901F\u7387\u4E0E\u8BCA\u65AD"
                            }),
                            (p = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tL("Downlink PHY rate")
                                    }),
                                    s("span", {
                                        children: w.phy_rate_downlink_gbps ? `${w.phy_rate_downlink_gbps} Gbps` : "\u2014"
                                    })
                                ]
                            }, s("div", p)),
                            (u = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tL("Uplink PHY rate")
                                    }),
                                    s("span", {
                                        children: w.phy_rate_uplink_gbps ? `${w.phy_rate_uplink_gbps} Gbps` : "\u2014"
                                    })
                                ]
                            }, s("div", u)),
                            (f = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tL("Temperature")
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
                                        children: tL("TX power")
                                    }),
                                    s("span", {
                                        children: tA(w.tx_power_dbm)
                                    })
                                ]
                            }, s("div", h)),
                            (b = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tL("Voltage")
                                    }),
                                    s("span", {
                                        children: null == w.vcc_voltage ? "\u2014" : `${w.vcc_voltage} V`
                                    })
                                ]
                            }, s("div", b)),
                            (m = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: tL("Bias current")
                                    }),
                                    s("span", {
                                        children: null == w.laser_bias_current_ma ? "\u2014" : `${w.laser_bias_current_ma} mA`
                                    })
                                ]
                            }, s("div", m))
                        ]
                    }, s("div", g))
                ]
            }, s("div", v))
        ]
    }, s("div", y);
}
function tU(e) {
    var t, r;
    return e.length ? (t = {
        class: "fttr-panel-subgateways",
        children: e.map((e)=>{
            var t, r, i, n, a, o, l, d, c, p, u, f, h, b, m, g, v, y, w, x, z, k;
            let $ = e.identity, j = $?.software_images ?? [], O = function(e) {
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
            }(e.firmware_version), P = e.identity ? e.identity_current ? tL("Current registration") : tL("Cached identity") : tL("Not collected"), M = s("span", {
                class: `fttr-badge ${e.identity_current ? "fttr-badge-info" : "fttr-badge-neutral"}`,
                style: "font-size:80%",
                children: P
            });
            return k = {
                class: "cbi-section fttr-onu-card",
                children: [
                    (o = {
                        class: "fttr-card-header",
                        children: [
                            (i = {
                                class: "fttr-card-title-group",
                                children: [
                                    s("h3", {
                                        style: "margin:0",
                                        children: tL("Sub-gateway %s \u2014 %s").replace("%s", String(e.onu_id)).replace("%s", tZ(e.model))
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
                                                children: "o5_operation" === t ? tL("Connected") : tL("Ready")
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
                                            M
                                        ]
                                    }, s("div", r))
                                ]
                            }, s("div", i)),
                            (a = {
                                children: (n = {
                                    type: "button",
                                    class: "fttr-btn-subtle",
                                    onclick: ()=>(function(e) {
                                            var t, r, i, n, a, o, l, d, c, p, u, f;
                                            let h = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "basic", b = !1, m = !1, g = null, v = null, y = (r = {
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
                                                                e.serial_number
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
                                                                e.identity?.omcc_version == null ? null : `0x${e.identity.omcc_version.toString(16)}`
                                                            ]
                                                        ]
                                                    },
                                                    {
                                                        title: _("Optical & link status"),
                                                        rows: [
                                                            [
                                                                _("Registration"),
                                                                e.state
                                                            ],
                                                            [
                                                                _("Business"),
                                                                (t = e.business_status, `${_(tc[t.phase])} \xb7 ${t.generation}${t.error ? ` \xb7 ${t.error}` : ""}`)
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
                                                                _("Equalization delay (EQD)"),
                                                                tp(e.equalization_delay_bits)
                                                            ],
                                                            [
                                                                _("Data interface"),
                                                                e.data_path?.interface
                                                            ],
                                                            [
                                                                _("Uptime"),
                                                                null == e.uptime_seconds ? null : `${Math.floor(e.uptime_seconds)} s`
                                                            ]
                                                        ]
                                                    },
                                                    {
                                                        title: _("Management & cache"),
                                                        rows: [
                                                            [
                                                                _("CWMP"),
                                                                e.management?.state
                                                            ],
                                                            [
                                                                _("Last Inform"),
                                                                e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
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
                                                    var t, r, i;
                                                    return i = {
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
                                                                        let [r, i] = e;
                                                                        return t = {
                                                                            children: [
                                                                                s("th", {
                                                                                    style: "width:35%",
                                                                                    children: r
                                                                                }),
                                                                                s("td", {
                                                                                    children: tT(i)
                                                                                })
                                                                            ]
                                                                        }, s("tr", t);
                                                                    })
                                                                }, s("tbody", t))
                                                            }, s("table", r))
                                                        ]
                                                    }, s("div", i);
                                                })
                                            }, s("div", r)), w = (i = {
                                                class: "mib-status-bar",
                                                role: "status",
                                                children: s("span", {
                                                    class: "mib-hint-text",
                                                    children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                                                })
                                            }, s("div", i)), x = (n = {
                                                class: "cbi-progressbar",
                                                style: "display:none;width:100%",
                                                title: "0%",
                                                children: s("div", {
                                                    style: "width:0%"
                                                })
                                            }, s("div", n)), z = s("div", {}), k = s("pre", {
                                                class: "onu-raw-pre"
                                            }), $ = s("span", {
                                                class: "download-status",
                                                role: "status"
                                            }), j = null, O = s("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                disabled: !0,
                                                onclick: async ()=>{
                                                    if (g && !b) {
                                                        O.disabled = !0, $.textContent = _("Preparing JSON download\u2026");
                                                        try {
                                                            let t = await tN(g);
                                                            if (b) return;
                                                            j && URL.revokeObjectURL(j), j = URL.createObjectURL(t);
                                                            let r = document.createElement("a");
                                                            r.href = j, r.download = `mib-${e.serial_number}.json`, r.click(), $.textContent = _("JSON download started"), window.setTimeout(()=>{
                                                                URL.revokeObjectURL(r.href), j === r.href && (j = null);
                                                            }, 1000);
                                                        } catch (e) {
                                                            $.textContent = String(e);
                                                        } finally{
                                                            O.disabled = !g || b;
                                                        }
                                                    }
                                                },
                                                children: _("Download JSON")
                                            }), P = (o = {
                                                class: "onu-raw-panel",
                                                children: [
                                                    (a = {
                                                        class: "onu-raw-toolbar",
                                                        children: [
                                                            s("span", {
                                                                class: "onu-raw-hint",
                                                                children: _("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")
                                                            }),
                                                            s("div", {
                                                                class: "onu-raw-actions",
                                                                children: [
                                                                    O,
                                                                    $
                                                                ]
                                                            })
                                                        ]
                                                    }, s("div", a)),
                                                    k
                                                ]
                                            }, s("div", o)), M = s("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-apply",
                                                onclick: ()=>B(!1),
                                                children: _("Read MIB")
                                            }), S = s("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                onclick: ()=>B(!0),
                                                children: _("Read MIB and VLAN tables")
                                            }), I = (c = {
                                                class: "onu-mib-panel",
                                                children: [
                                                    (d = {
                                                        class: "mib-controls",
                                                        children: [
                                                            (l = {
                                                                class: "mib-action-group",
                                                                children: [
                                                                    M,
                                                                    S,
                                                                    s("small", {
                                                                        class: "mib-action-hint",
                                                                        children: _("Collecting VLAN tables queries extended filter tables and takes longer.")
                                                                    })
                                                                ]
                                                            }, s("div", l)),
                                                            w,
                                                            x
                                                        ]
                                                    }, s("div", d)),
                                                    z
                                                ]
                                            }, s("div", c)), T = {
                                                basic: y,
                                                mib: I,
                                                raw: P
                                            }, C = new Map();
                                            function N(e) {
                                                for (let [t, r] of Object.entries(T))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                                                for (let [t, r] of C)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
                                            }
                                            let R = (p = {
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
                                                        class: e.id === h ? "cbi-tab" : "cbi-tab-disabled",
                                                        "data-tab": e.id,
                                                        children: s("a", {
                                                            href: `#tab-${e.id}`,
                                                            onclick: (t)=>{
                                                                t.preventDefault(), N(e.id);
                                                            },
                                                            children: e.label
                                                        })
                                                    }, s("li", t));
                                                    return C.set(e.id, r), r;
                                                })
                                            }, s("ul", p)), D = s("div", {
                                                class: "onu-details-header",
                                                children: R
                                            }), Z = (f = {
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
					}
				}
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
                                                    D,
                                                    y,
                                                    I,
                                                    P,
                                                    (u = {
                                                        class: "right onu-details-footer",
                                                        children: s("button", {
                                                            type: "button",
                                                            class: "cbi-button",
                                                            onclick: ()=>{
                                                                b = !0, j && URL.revokeObjectURL(j), j = null, g = null, k.textContent = "", z.replaceChildren(), L.ui.hideModal();
                                                            },
                                                            children: _("Close")
                                                        })
                                                    }, s("div", u))
                                                ]
                                            }, s("div", f)), A = ()=>!b && Z.isConnected && Z.getClientRects().length > 0;
                                            async function B(t) {
                                                if (!m) {
                                                    m = !0, M.disabled = S.disabled = !0, x.style.display = "", x.title = "0%", x.firstElementChild.style.width = "0%", w.textContent = _("Reading MIB\u2026");
                                                    try {
                                                        let m = await tf(), $ = m.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                                        if ($?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                                        if (!A()) return;
                                                        let j = await tM($.onu_id, $.serial_number, t);
                                                        v = j.job;
                                                        let P = Date.now() + 140000;
                                                        for(; A();){
                                                            let e = await tS(j.job, 0);
                                                            if (!A()) return;
                                                            if ("ready" === e.status) {
                                                                var r, i, n, a, o, l, d, c, p, u, f, h, b, y;
                                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                                let t = new Uint8Array(e.bytes), m = 0;
                                                                for(let r = 0; r < e.chunks; r++){
                                                                    let i = 0 === r ? e : await tS(j.job, r);
                                                                    if (!A()) return;
                                                                    if ("ready" !== i.status || i.chunk !== r || i.chunks !== e.chunks || i.bytes !== e.bytes || !i.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                                    let n = atob(i.data);
                                                                    if (n.length > 32768 || m + n.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                                    for(let e = 0; e < n.length; e++)t[m++] = n.charCodeAt(e);
                                                                    let a = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                                                    x.title = `${a}%`, x.firstElementChild.style.width = `${a}%`, w.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                                                }
                                                                if (m !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                                if (await U(), g = tk.parse(eV(JSON.parse(new TextDecoder("utf-8", {
                                                                    fatal: !0
                                                                }).decode(t)))).report, 1 !== g.schema_version || g.onu_id !== $.onu_id) throw Error(_("Unexpected MIB response"));
                                                                x.style.display = "none", w.replaceChildren((r = g, f = {
                                                                    class: "mib-chips",
                                                                    children: [
                                                                        (n = {
                                                                            class: "mib-chip mib-chip-primary",
                                                                            children: [
                                                                                "ONU ",
                                                                                r.onu_id
                                                                            ]
                                                                        }, s("span", n)),
                                                                        (a = {
                                                                            class: `mib-chip ${r.uploaded_complete ? "mib-chip-success" : "mib-chip-warning"}`,
                                                                            children: r.uploaded_complete ? _("Upload complete") : _("Upload incomplete")
                                                                        }, s("span", a)),
                                                                        (o = {
                                                                            class: "mib-chip mib-chip-info",
                                                                            children: [
                                                                                _("Records"),
                                                                                ": ",
                                                                                r.received_records,
                                                                                r.expected_records !== r.received_records ? ` / ${r.expected_records}` : ""
                                                                            ]
                                                                        }, s("span", o)),
                                                                        (l = {
                                                                            class: "mib-chip",
                                                                            children: [
                                                                                _("Decoded"),
                                                                                ": ",
                                                                                r.decoded_records
                                                                            ]
                                                                        }, s("span", l)),
                                                                        r.partial_records > 0 ? (d = {
                                                                            class: "mib-chip mib-chip-warning",
                                                                            children: [
                                                                                _("Partial"),
                                                                                ": ",
                                                                                r.partial_records
                                                                            ]
                                                                        }, s("span", d)) : null,
                                                                        (c = {
                                                                            class: "mib-chip mib-chip-neutral",
                                                                            children: [
                                                                                _("Basic"),
                                                                                ": ",
                                                                                r.basic_records
                                                                            ]
                                                                        }, s("span", c)),
                                                                        (p = {
                                                                            class: "mib-chip",
                                                                            children: r.tables_collected ? _("VLAN tables collected") : _("VLAN tables not collected")
                                                                        }, s("span", p)),
                                                                        (u = {
                                                                            class: "mib-chip mib-chip-subtle",
                                                                            children: new Date().toLocaleTimeString()
                                                                        }, s("span", u))
                                                                    ]
                                                                }, s("div", f))), z.replaceChildren(function(e) {
                                                                    var t, r, i, n, a, o;
                                                                    let l = e.classes.length ? e.classes[0].class_id : null, d = (t = {
                                                                        class: "mib-content"
                                                                    }, s("div", t)), c = (r = {
                                                                        type: "search",
                                                                        class: "cbi-input-text mib-search-input",
                                                                        placeholder: _("Search ME name or Class ID\u2026")
                                                                    }, s("input", r)), p = (i = {
                                                                        class: "mib-class-list"
                                                                    }, s("div", i)), u = new Map();
                                                                    function f(t) {
                                                                        var r, i;
                                                                        for (let [e, r] of (l = t, u))e === t ? r.classList.add("active") : r.classList.remove("active");
                                                                        let n = e.entities.filter((e)=>e.class_id === t);
                                                                        n.length ? d.replaceChildren(...n.map((r, i)=>{
                                                                            var n, a, o, l, d, c, p, u, f, h, b, m, g, v, y, w, x, z, k;
                                                                            return k = {
                                                                                open: 0 === i,
                                                                                class: "mib-entity-details",
                                                                                children: [
                                                                                    (d = {
                                                                                        class: "mib-entity-summary",
                                                                                        children: [
                                                                                            (o = {
                                                                                                class: "mib-entity-title",
                                                                                                children: [
                                                                                                    (n = {
                                                                                                        children: tT(r.name)
                                                                                                    }, s("strong", n)),
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
                                                                                            }, s("span", o)),
                                                                                            (l = {
                                                                                                class: "mib-entity-support",
                                                                                                children: r.support
                                                                                            }, s("span", l))
                                                                                        ]
                                                                                    }, s("summary", d)),
                                                                                    (z = {
                                                                                        class: "mib-entity-body",
                                                                                        children: [
                                                                                            r.attributes.length ? (g = {
                                                                                                class: "table mib-attributes-table",
                                                                                                children: [
                                                                                                    (b = {
                                                                                                        children: (h = {
                                                                                                            children: [
                                                                                                                (c = {
                                                                                                                    style: "width:28%",
                                                                                                                    children: _("Attribute")
                                                                                                                }, s("th", c)),
                                                                                                                (p = {
                                                                                                                    style: "width:14%",
                                                                                                                    children: _("Type")
                                                                                                                }, s("th", p)),
                                                                                                                (u = {
                                                                                                                    children: _("Value")
                                                                                                                }, s("th", u)),
                                                                                                                (f = {
                                                                                                                    style: "width:18%",
                                                                                                                    children: _("Definition")
                                                                                                                }, s("th", f))
                                                                                                            ]
                                                                                                        }, s("tr", h))
                                                                                                    }, s("thead", b)),
                                                                                                    (m = {
                                                                                                        children: r.attributes.map((e)=>{
                                                                                                            var t, r, i, n, a, o, l, d, c, p;
                                                                                                            return p = {
                                                                                                                children: [
                                                                                                                    (t = {
                                                                                                                        class: "mib-attr-name",
                                                                                                                        children: e.definition.name
                                                                                                                    }, s("td", t)),
                                                                                                                    (i = {
                                                                                                                        class: "mib-attr-kind",
                                                                                                                        children: (r = {
                                                                                                                            children: e.definition.kind
                                                                                                                        }, s("code", r))
                                                                                                                    }, s("td", i)),
                                                                                                                    (d = {
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
                                                                                                                                            return tT(e.value);
                                                                                                                                        case "octets":
                                                                                                                                            return tT(e.hex);
                                                                                                                                        case "table_length":
                                                                                                                                            return tT(e.bytes);
                                                                                                                                        default:
                                                                                                                                            throw new eU("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                                                    }
                                                                                                                                }(e.value)
                                                                                                                            }, s("span", n)),
                                                                                                                            e.observations?.length ? (l = {
                                                                                                                                class: "mib-obs-details",
                                                                                                                                children: [
                                                                                                                                    (a = {
                                                                                                                                        children: _("Raw data / observations")
                                                                                                                                    }, s("summary", a)),
                                                                                                                                    (o = {
                                                                                                                                        class: "mib-pre",
                                                                                                                                        children: tC(e.observations)
                                                                                                                                    }, s("pre", o))
                                                                                                                                ]
                                                                                                                            }, s("details", l)) : null
                                                                                                                        ]
                                                                                                                    }, s("td", d)),
                                                                                                                    (c = {
                                                                                                                        class: "mib-attr-ref",
                                                                                                                        children: tR(e.definition)
                                                                                                                    }, s("td", c))
                                                                                                                ]
                                                                                                            }, s("tr", p);
                                                                                                        })
                                                                                                    }, s("tbody", m))
                                                                                                ]
                                                                                            }, s("table", g)) : (v = {
                                                                                                children: _("Basic display only; raw records are preserved.")
                                                                                            }, s("p", v)),
                                                                                            e.tables.filter((e)=>e.class_id === t && e.entity_id === r.entity_id).map((e)=>{
                                                                                                var t, r, i, n, a, o, l, d, c, p, u, f, h, b, m, g;
                                                                                                return g = {
                                                                                                    class: "mib-table-details",
                                                                                                    children: [
                                                                                                        (t = {
                                                                                                            children: [
                                                                                                                e.attribute.name,
                                                                                                                " \xb7",
                                                                                                                " ",
                                                                                                                e.collected ? `${e.rows.length} ${_("rows")}` : tT(e.error)
                                                                                                            ]
                                                                                                        }, s("summary", t)),
                                                                                                        e.vlan_rules.length ? (h = {
                                                                                                            class: "mib-table-overflow",
                                                                                                            children: (f = {
                                                                                                                class: "table",
                                                                                                                children: [
                                                                                                                    (p = {
                                                                                                                        children: (c = {
                                                                                                                            children: [
                                                                                                                                (r = {
                                                                                                                                    children: _("Outer filter (priority / VID / TPID-DEI)")
                                                                                                                                }, s("th", r)),
                                                                                                                                (i = {
                                                                                                                                    children: _("Inner filter (priority / VID / TPID-DEI)")
                                                                                                                                }, s("th", i)),
                                                                                                                                (n = {
                                                                                                                                    children: _("EtherType code")
                                                                                                                                }, s("th", n)),
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
                                                                                                                    }, s("thead", p)),
                                                                                                                    (u = {
                                                                                                                        children: e.vlan_rules.map((e)=>{
                                                                                                                            var t, r, i, n, a, o, l, d;
                                                                                                                            return d = {
                                                                                                                                children: [
                                                                                                                                    (t = {
                                                                                                                                        children: `${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`
                                                                                                                                    }, s("td", t)),
                                                                                                                                    (r = {
                                                                                                                                        children: `${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`
                                                                                                                                    }, s("td", r)),
                                                                                                                                    (i = {
                                                                                                                                        children: tT(e.filter_ethertype)
                                                                                                                                    }, s("td", i)),
                                                                                                                                    (n = {
                                                                                                                                        children: tT(e.tags_to_remove)
                                                                                                                                    }, s("td", n)),
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
                                                                                                                    }, s("tbody", u))
                                                                                                                ]
                                                                                                            }, s("table", f))
                                                                                                        }, s("div", h)) : null,
                                                                                                        (b = {
                                                                                                            style: "margin-top:6px",
                                                                                                            children: [
                                                                                                                _("G.988 encoded field values"),
                                                                                                                ": ",
                                                                                                                tR(e.attribute)
                                                                                                            ]
                                                                                                        }, s("p", b)),
                                                                                                        (m = {
                                                                                                            class: "mib-pre",
                                                                                                            children: tC(e.vlan_rules.length ? e.vlan_rules : e.rows)
                                                                                                        }, s("pre", m))
                                                                                                    ]
                                                                                                }, s("details", g);
                                                                                            }),
                                                                                            (x = {
                                                                                                class: "mib-diag-details",
                                                                                                children: [
                                                                                                    (y = {
                                                                                                        children: _("Records / diagnostics")
                                                                                                    }, s("summary", y)),
                                                                                                    (w = {
                                                                                                        class: "mib-pre",
                                                                                                        children: tC({
                                                                                                            diagnostics: r.diagnostics,
                                                                                                            records: e.records.filter((e)=>e.class_id === t && e.entity_id === r.entity_id)
                                                                                                        })
                                                                                                    }, s("pre", w))
                                                                                                ]
                                                                                            }, s("details", x))
                                                                                        ]
                                                                                    }, s("div", z))
                                                                                ]
                                                                            }, s("details", k);
                                                                        })) : d.replaceChildren((i = {
                                                                            class: "mib-empty-content",
                                                                            children: (r = {
                                                                                children: _("No entities recorded for this ME class.")
                                                                            }, s("p", r))
                                                                        }, s("div", i)));
                                                                    }
                                                                    function h() {
                                                                        var t;
                                                                        let r = c.value.trim().toLowerCase();
                                                                        u.clear();
                                                                        let i = e.classes.filter((e)=>`${e.class_id} ${e.name ?? ""}`.toLowerCase().includes(r));
                                                                        i.length ? p.replaceChildren(...i.map((e)=>{
                                                                            var t, r, i, n;
                                                                            let a = (n = {
                                                                                type: "button",
                                                                                class: `mib-class-btn${e.class_id === l ? " active" : ""}`,
                                                                                onclick: ()=>f(e.class_id),
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
                                                                                    (i = {
                                                                                        class: "mib-class-count",
                                                                                        children: e.entities
                                                                                    }, s("span", i))
                                                                                ]
                                                                            }, s("button", n));
                                                                            return u.set(e.class_id, a), a;
                                                                        })) : p.replaceChildren((t = {
                                                                            class: "mib-empty-list",
                                                                            children: _("No matching ME classes")
                                                                        }, s("div", t)));
                                                                    }
                                                                    return c.addEventListener("input", h), h(), e.classes.length && f(e.classes[0].class_id), o = {
                                                                        class: "mib-browser",
                                                                        children: [
                                                                            (a = {
                                                                                class: "mib-sidebar",
                                                                                children: [
                                                                                    (n = {
                                                                                        class: "mib-search-box",
                                                                                        children: c
                                                                                    }, s("div", n)),
                                                                                    p
                                                                                ]
                                                                            }, s("div", a)),
                                                                            d
                                                                        ]
                                                                    }, s("div", o);
                                                                }(g), (y = {
                                                                    class: "mib-upload-diagnostics",
                                                                    children: [
                                                                        (h = {
                                                                            children: _("Upload diagnostics")
                                                                        }, s("summary", h)),
                                                                        (b = {
                                                                            class: "mib-pre",
                                                                            children: tC(g.diagnostics)
                                                                        }, s("pre", b))
                                                                    ]
                                                                }, s("details", y))), i = g, k.textContent = tC({
                                                                    schema_version: i.schema_version,
                                                                    reference_version: i.reference_version,
                                                                    onu_id: i.onu_id,
                                                                    uploaded_complete: i.uploaded_complete,
                                                                    expected_records: i.expected_records,
                                                                    received_records: i.received_records,
                                                                    decoded_records: i.decoded_records,
                                                                    partial_records: i.partial_records,
                                                                    basic_records: i.basic_records,
                                                                    tables_requested: i.tables_requested,
                                                                    tables_collected: i.tables_collected,
                                                                    class_count: i.classes.length,
                                                                    classes: i.classes.slice(0, 25),
                                                                    additional_classes: Math.max(0, i.classes.length - 25),
                                                                    record_count: i.records.length,
                                                                    first_record: i.records[0] ?? null,
                                                                    table_count: i.tables.length,
                                                                    diagnostics_count: i.diagnostics.length
                                                                }), O.disabled = !1;
                                                                return;
                                                            }
                                                            if (e.progress) {
                                                                let { phase: t, received: r, expected: i } = e.progress;
                                                                if (w.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == i ? "" : `: ${r}/${i}`}` : null == i ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${i}`, i && i > 0) {
                                                                    let e = Math.min(100, Math.round(r / i * 100));
                                                                    x.title = `${e}%`, x.firstElementChild.style.width = `${e}%`;
                                                                }
                                                            }
                                                            if (Date.now() >= P) throw Error(_("MIB query timed out; retry."));
                                                            await new Promise((e)=>setTimeout(e, 1000));
                                                        }
                                                    } catch (e) {
                                                        A() && (x.style.display = "none", w.replaceChildren(s("span", {
                                                            class: "mib-error-text",
                                                            children: [
                                                                String(e),
                                                                g ? ` \xb7 ${_("Previous snapshot retained")}` : ""
                                                            ]
                                                        })));
                                                    } finally{
                                                        await U(), m = !1, M.disabled = S.disabled = !1;
                                                    }
                                                }
                                            }
                                            async function U() {
                                                if (!v) return;
                                                let e = v;
                                                v = null;
                                                try {
                                                    await tI(e);
                                                } catch (e) {
                                                    console.warn("Failed to release MIB snapshot", e);
                                                }
                                            }
                                            N(h), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, Z, "modal-wide");
                                        })(e, "mib"),
                                    children: [
                                        tL("View OMCI / MIB details"),
                                        " \u2192"
                                    ]
                                }, s("button", n))
                            }, s("div", a))
                        ]
                    }, s("div", o)),
                    (z = {
                        class: "fttr-grid-2",
                        children: [
                            (f = {
                                class: "fttr-card",
                                children: [
                                    s("h4", {
                                        style: "margin-top:0;margin-bottom:6px;font-size:92%;color:#888",
                                        children: "\u5149\u7EA4\u7269\u7406\u5C42\u4E0E\u94FE\u8DEF\u53C2\u6570"
                                    }),
                                    (l = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tL("Optical RX power")
                                            }),
                                            s("strong", {
                                                children: tA(e.optical_rx_power_dbm)
                                            })
                                        ]
                                    }, s("div", l)),
                                    (d = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tL("Optical TX power")
                                            }),
                                            s("strong", {
                                                children: tA(e.optical_tx_power_dbm)
                                            })
                                        ]
                                    }, s("div", d)),
                                    (c = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tL("Equalization delay (EQD)")
                                            }),
                                            s("span", {
                                                children: tp(e.equalization_delay_bits)
                                            })
                                        ]
                                    }, s("div", c)),
                                    (p = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tL("Data interface")
                                            }),
                                            s("code", {
                                                children: tZ(e.data_path?.interface)
                                            })
                                        ]
                                    }, s("div", p)),
                                    (u = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tL("Identity age")
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
                                    }, s("div", u))
                                ]
                            }, s("div", f)),
                            (x = {
                                class: "fttr-card",
                                children: [
                                    s("h4", {
                                        style: "margin-top:0;margin-bottom:6px;font-size:92%;color:#888",
                                        children: "\u786C\u4EF6\u89C4\u683C\u4E0E\u56FA\u4EF6\u955C\u50CF"
                                    }),
                                    (h = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tL("Equipment ID")
                                            }),
                                            s("span", {
                                                children: tZ($?.equipment_id ?? e.model)
                                            })
                                        ]
                                    }, s("div", h)),
                                    (b = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tL("Hardware version")
                                            }),
                                            s("code", {
                                                children: tZ($?.hardware_version ?? e.hardware_version)
                                            })
                                        ]
                                    }, s("div", b)),
                                    (g = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tL("Firmware version")
                                            }),
                                            (m = {
                                                title: O.full || O.display,
                                                children: s("strong", {
                                                    children: O.display
                                                })
                                            }, s("span", m))
                                        ]
                                    }, s("div", g)),
                                    (v = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tL("OMCC version")
                                            }),
                                            s("span", {
                                                children: $?.omcc_version != null ? `0x${$.omcc_version.toString(16).padStart(2, "0")} (${$.omcc_version})` : "\u2014"
                                            })
                                        ]
                                    }, s("div", v)),
                                    $?.errors.length ? (y = {
                                        class: "fttr-kv-row",
                                        style: "color:#e74c3c",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tL("Identity read errors")
                                            }),
                                            s("span", {
                                                children: $.errors.join("; ")
                                            })
                                        ]
                                    }, s("div", y)) : null,
                                    j.length > 1 ? (w = {
                                        class: "fttr-kv-row",
                                        style: "font-size:80%;color:#888",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: tL("Software images")
                                            }),
                                            s("span", {
                                                children: j.join(" \xb7 ")
                                            })
                                        ]
                                    }, s("div", w)) : null
                                ]
                            }, s("div", x))
                        ]
                    }, s("div", z))
                ]
            }, s("div", k);
        })
    }, s("div", t)) : (r = {
        class: "cbi-section fttr-panel-subgateways",
        children: s("p", {
            style: "text-align:center;color:#888;padding:2em 0",
            children: tL("No sub-gateways are currently registered.")
        })
    }, s("div", r));
}
let main = tD.extend({
    load: ()=>tf(),
    render: (e)=>{
        var t, r;
        let i, n, a, o, l, d, c, p, u;
        return i = "controller", n = [
            {
                id: "controller",
                label: tL("Controller & optical transceiver")
            },
            {
                id: "subgateways",
                label: tL("Sub-gateways & optical links")
            }
        ], a = new Map(), o = tB(e), l = tU(e.sub_gateways ?? []), t = {
            class: "cbi-tabmenu",
            style: "margin-top:14px;margin-bottom:0",
            children: n.map((e)=>{
                var t;
                let r = (t = {
                    class: i === e.id ? "cbi-tab" : "cbi-tab-disabled",
                    "data-tab": e.id,
                    children: s("a", {
                        href: `#tab-${e.id}`,
                        onclick: (t)=>{
                            t.preventDefault();
                            var r = e.id;
                            for (let [e, t] of (i = r, a))t.className = e === r ? "cbi-tab" : "cbi-tab-disabled";
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
                    children: tL("FTTR hardware status")
                }),
                d,
                c,
                s("p", {
                    class: "cbi-footer",
                    style: "margin-top:1.5em;font-size:85%;color:#888",
                    children: tL("Identity information is read-only and limited to fields provided by fttrctl status.")
                })
            ]
        }, p = s("div", r), u = !1, L.Poll.add(async ()=>{
            if (p.isConnected && !u) {
                u = !0;
                try {
                    let e = await tf(), t = tB(e), r = tU(e.sub_gateways ?? []);
                    t.hidden = "controller" !== i, r.hidden = "subgateways" !== i, o.replaceWith(t), l.replaceWith(r), o = t, l = r;
                } catch  {} finally{
                    u = !1;
                }
            }
        }, 10), p;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;