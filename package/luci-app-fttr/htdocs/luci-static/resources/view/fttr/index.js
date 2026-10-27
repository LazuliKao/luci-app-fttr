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
function o(e, t) {
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
    let o = {}, s = {
        ...i
    };
    for (let [e, t] of Object.entries(s))e.startsWith("on") && "function" == typeof t ? (o[e] = t, delete s[e]) : "boolean" == typeof t && (t ? s[e] = e : delete s[e]);
    let l = Object.keys(s).length > 0 ? n.length > 1 ? E(e, s, n) : E(e, s, n[0]) : n.length > 1 ? E(e, {}, n) : E(e, {}, n[0]);
    for (let [e, t] of Object.entries(o)){
        let r = e.slice(2).toLowerCase();
        l.addEventListener(r, t);
    }
    return l;
}
function s(e, t, r) {
    function i(r, i) {
        if (r._zod || Object.defineProperty(r, "_zod", {
            value: {
                def: i,
                constr: o,
                traits: new Set()
            },
            enumerable: !1
        }), r._zod.traits.has(e)) return;
        r._zod.traits.add(e), t(r, i);
        let n = o.prototype, a = Object.keys(n);
        for(let e = 0; e < a.length; e++){
            let t = a[e];
            t in r || (r[t] = n[t].bind(r));
        }
    }
    let n = r?.Parent ?? Object;
    class a extends n {
    }
    function o(e) {
        var t;
        let n = r?.Parent ? new a() : this;
        for (let r of (i(n, e), (t = n._zod).deferred ?? (t.deferred = []), n._zod.deferred))r();
        return n;
    }
    return Object.defineProperty(a, "name", {
        value: e
    }), Object.defineProperty(o, "init", {
        value: i
    }), Object.defineProperty(o, Symbol.hasInstance, {
        value: (t)=>!!r?.Parent && t instanceof r.Parent || t?._zod?.traits?.has(e)
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
    let t = +!!e.startsWith("^"), r = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, r);
}
const h = Symbol("evaluating");
function g(e, t, r) {
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
function b(e, t, r) {
    Object.defineProperty(e, t, {
        value: r,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
}
function m(...e) {
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
function C(e) {
    return "string" == typeof e ? e : e?.message;
}
function S(e, t, r) {
    let i = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (i.message = C(e.inst?._zod.def?.error?.(e)) ?? C(t?.error?.(e)) ?? C(r.customError?.(e)) ?? C(r.localeError?.(e)) ?? "Invalid input"), delete i.inst, delete i.continue, t?.reportInput || delete i.input, i;
}
const M = (e, t)=>{
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
}, P = s("$ZodError", M), T = s("$ZodError", M, {
    Parent: Error
}), N = (t = T, (e, r, i, n)=>{
    let a = i ? Object.assign(i, {
        async: !1
    }) : {
        async: !1
    }, o = e._zod.run({
        value: r,
        issues: []
    }, a);
    if (o instanceof Promise) throw new l();
    if (o.issues.length) {
        let e = new (n?.Err ?? t)(o.issues.map((e)=>S(e, a, c())));
        throw v(e, n?.callee), e;
    }
    return o.value;
}), I = (r = T, async (e, t, i, n)=>{
    let a = i ? Object.assign(i, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (n?.Err ?? r)(o.issues.map((e)=>S(e, a, c())));
        throw v(e, n?.callee), e;
    }
    return o.value;
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
        error: new (i ?? P)(a.issues.map((e)=>S(e, n, c())))
    } : {
        success: !0,
        data: a.value
    };
}), A = (n = T, async (e, t, r)=>{
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
        error: new n(a.issues.map((e)=>S(e, i, c())))
    } : {
        success: !0,
        data: a.value
    };
}), D = /^-?\d+(?:\.\d+)?$/, U = /^(?:true|false)$/i, Z = /^null$/i, B = {
    major: 4,
    minor: 3,
    patch: 6
}, F = s("$ZodType", (e, t)=>{
    var r;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = B;
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
                let t = e.issues.length, o = a._zod.check(e);
                if (o instanceof Promise && r?.async === !1) throw new l();
                if (i || o instanceof Promise) i = (i ?? Promise.resolve()).then(async ()=>{
                    await o, e.issues.length !== t && (n || (n = j(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    n || (n = j(e, t));
                }
            }
            return i ? i.then(()=>e) : e;
        }, r = (r, n, a)=>{
            if (j(r)) return r.aborted = !0, r;
            let o = t(n, i, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new l();
                return o.then((t)=>e._zod.parse(t, a));
            }
            return e._zod.parse(o, a);
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
            let o = e._zod.parse(n, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new l();
                return o.then((e)=>t(e, i, a));
            }
            return t(o, i, a);
        };
    }
    g(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = R(e, t);
                    return r.success ? {
                        value: r.data
                    } : {
                        issues: r.error?.issues
                    };
                } catch (r) {
                    return A(e, t).then((e)=>e.success ? {
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
    var r;
    let i;
    F.init(e, t), e._zod.pattern = [
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
}), V = s("$ZodNumber", (e, t)=>{
    F.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? D, e._zod.parse = (r, i)=>{
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
}), W = s("$ZodBoolean", (e, t)=>{
    F.init(e, t), e._zod.pattern = U, e._zod.parse = (r, i)=>{
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
}), J = s("$ZodNull", (e, t)=>{
    F.init(e, t), e._zod.pattern = Z, e._zod.values = new Set([
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
}), K = s("$ZodNever", (e, t)=>{
    F.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function G(e, t, r) {
    e.issues.length && t.issues.push(...O(r, e.issues)), t.value[r] = e.value;
}
const X = s("$ZodArray", (e, t)=>{
    F.init(e, t), e._zod.parse = (r, i)=>{
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
            let o = n[e], s = t.element._zod.run({
                value: o,
                issues: []
            }, i);
            s instanceof Promise ? a.push(s.then((t)=>G(t, r, e))) : G(s, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function H(e, t, r, i, n) {
    if (e.issues.length) {
        if (n && !(r in i)) return;
        t.issues.push(...O(r, e.issues));
    }
    void 0 === e.value ? r in i && (t.value[r] = void 0) : t.value[r] = e.value;
}
const Q = s("$ZodObject", (e, t)=>{
    let r;
    F.init(e, t);
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
    let n = p(()=>(function(e) {
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
    g(e._zod, "propValues", ()=>{
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
        let o = t.value;
        if (!y(o)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: o,
            inst: e
        }), t;
        t.value = {};
        let s = [], l = r.shape;
        for (let e of r.keys){
            let r = l[e], n = "optional" === r._zod.optout, a = r._zod.run({
                value: o[e],
                issues: []
            }, i);
            a instanceof Promise ? s.push(a.then((r)=>H(r, t, e, o, n))) : H(a, t, e, o, n);
        }
        return a ? function(e, t, r, i, n, a) {
            let o = [], s = n.keySet, l = n.catchall._zod, d = l.def.type, c = "optional" === l.optout;
            for(let n in t){
                if (s.has(n)) continue;
                if ("never" === d) {
                    o.push(n);
                    continue;
                }
                let a = l.run({
                    value: t[n],
                    issues: []
                }, i);
                a instanceof Promise ? e.push(a.then((e)=>H(e, r, n, t, c))) : H(a, r, n, t, c);
            }
            return (o.length && r.issues.push({
                code: "unrecognized_keys",
                keys: o,
                input: t,
                inst: a
            }), e.length) ? Promise.all(e).then(()=>r) : r;
        }(s, o, t, i, n.value, e) : s.length ? Promise.all(s).then(()=>t) : t;
    };
});
function Y(e, t, r, i) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let n = e.filter((e)=>!j(e));
    return 1 === n.length ? (t.value = n[0].value, n[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>S(e, i, c())))
    }), t);
}
const ee = s("$ZodUnion", (e, t)=>{
    F.init(e, t), g(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), g(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), g(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), g(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>f(e.source)).join("|")})$`);
        }
    });
    let r = 1 === t.options.length, i = t.options[0]._zod.run;
    e._zod.parse = (n, a)=>{
        if (r) return i(n, a);
        let o = !1, s = [];
        for (let e of t.options){
            let t = e._zod.run({
                value: n.value,
                issues: []
            }, a);
            if (t instanceof Promise) s.push(t), o = !0;
            else {
                if (0 === t.issues.length) return t;
                s.push(t);
            }
        }
        return o ? Promise.all(s).then((t)=>Y(t, n, e, a)) : Y(s, n, e, a);
    };
}), et = s("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, ee.init(e, t);
    let r = e._zod.parse;
    g(e._zod, "propValues", ()=>{
        let e = {};
        for (let r of t.options){
            let i = r._zod.propValues;
            if (!i || 0 === Object.keys(i).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
            for (let [t, r] of Object.entries(i))for (let i of (e[t] || (e[t] = new Set()), r))e[t].add(i);
        }
        return e;
    });
    let i = p(()=>{
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
        let o = n.value;
        if (!y(o)) return n.issues.push({
            code: "invalid_type",
            expected: "object",
            input: o,
            inst: e
        }), n;
        let s = i.value.get(o?.[t.discriminator]);
        return s ? s._zod.run(n, a) : t.unionFallback ? r(n, a) : (n.issues.push({
            code: "invalid_union",
            errors: [],
            note: "No matching discriminator",
            discriminator: t.discriminator,
            input: o,
            path: [
                t.discriminator
            ],
            inst: e
        }), n);
    };
}), er = s("$ZodRecord", (e, t)=>{
    F.init(e, t), e._zod.parse = (r, i)=>{
        let n = r.value;
        if (!w(n)) return r.issues.push({
            expected: "record",
            code: "invalid_type",
            input: n,
            inst: e
        }), r;
        let a = [], o = t.keyType._zod.values;
        if (o) {
            let s;
            r.value = {};
            let l = new Set();
            for (let e of o)if ("string" == typeof e || "number" == typeof e || "symbol" == typeof e) {
                l.add("number" == typeof e ? e.toString() : e);
                let o = t.valueType._zod.run({
                    value: n[e],
                    issues: []
                }, i);
                o instanceof Promise ? a.push(o.then((t)=>{
                    t.issues.length && r.issues.push(...O(e, t.issues)), r.value[e] = t.value;
                })) : (o.issues.length && r.issues.push(...O(e, o.issues)), r.value[e] = o.value);
            }
            for(let e in n)l.has(e) || (s = s ?? []).push(e);
            s && s.length > 0 && r.issues.push({
                code: "unrecognized_keys",
                input: n,
                inst: e,
                keys: s
            });
        } else for (let o of (r.value = {}, Reflect.ownKeys(n))){
            if ("__proto__" === o) continue;
            let s = t.keyType._zod.run({
                value: o,
                issues: []
            }, i);
            if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof o && D.test(o) && s.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(o),
                    issues: []
                }, i);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (s = e);
            }
            if (s.issues.length) {
                "loose" === t.mode ? r.value[o] = n[o] : r.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: s.issues.map((e)=>S(e, i, c())),
                    input: o,
                    path: [
                        o
                    ],
                    inst: e
                });
                continue;
            }
            let l = t.valueType._zod.run({
                value: n[o],
                issues: []
            }, i);
            l instanceof Promise ? a.push(l.then((e)=>{
                e.issues.length && r.issues.push(...O(o, e.issues)), r.value[s.value] = e.value;
            })) : (l.issues.length && r.issues.push(...O(o, l.issues)), r.value[s.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), ei = s("$ZodEnum", (e, t)=>{
    var r;
    let i;
    F.init(e, t);
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
}), en = s("$ZodLiteral", (e, t)=>{
    if (F.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
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
const eo = s("$ZodOptional", (e, t)=>{
    F.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let i = t.innerType._zod.run(e, r);
            return i instanceof Promise ? i.then((t)=>ea(t, e.value)) : ea(i, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, r);
    };
}), es = s("$ZodNullable", (e, t)=>{
    F.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)}|null)$`) : void 0;
    }), g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), el = s("$ZodCatch", (e, t)=>{
    F.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let i = t.innerType._zod.run(e, r);
        return i instanceof Promise ? i.then((i)=>(e.value = i.value, i.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: i.issues.map((e)=>S(e, r, c()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = i.value, i.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: i.issues.map((e)=>S(e, r, c()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ed = s("$ZodLazy", (e, t)=>{
    F.init(e, t), g(e._zod, "innerType", ()=>t.getter()), g(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), g(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), g(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), g(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
const ec = s("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    F.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>N(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>R(e, t, r), e.parseAsync = async (t, r)=>I(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>A(e, t, r), e.check = (...r)=>e.clone({
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
}), eu = s("ZodMiniString", (e, t)=>{
    q.init(e, t), ec.init(e, t);
});
function ep(e) {
    return new eu({
        type: "string",
        ...$(e)
    });
}
const ef = s("ZodMiniNumber", (e, t)=>{
    V.init(e, t), ec.init(e, t);
});
function e_(e) {
    return new ef({
        type: "number",
        checks: [],
        ...$(e)
    });
}
const eh = s("ZodMiniBoolean", (e, t)=>{
    W.init(e, t), ec.init(e, t);
});
function eg(e) {
    return new eh({
        type: "boolean",
        ...$(e)
    });
}
const eb = s("ZodMiniNull", (e, t)=>{
    J.init(e, t), ec.init(e, t);
}), em = s("ZodMiniNever", (e, t)=>{
    K.init(e, t), ec.init(e, t);
});
function ev(e) {
    return new em({
        type: "never",
        ...$(e)
    });
}
const ey = s("ZodMiniArray", (e, t)=>{
    X.init(e, t), ec.init(e, t);
});
function ew(e, t) {
    return new ey({
        type: "array",
        element: e,
        ...$(t)
    });
}
const ex = s("ZodMiniObject", (e, t)=>{
    Q.init(e, t), ec.init(e, t), g(e, "shape", ()=>t.shape);
});
function ez(e, t) {
    return new ex({
        type: "object",
        shape: e ?? {},
        ...$(t)
    });
}
const ek = s("ZodMiniUnion", (e, t)=>{
    ee.init(e, t), ec.init(e, t);
});
function e$(e, t) {
    return new ek({
        type: "union",
        options: e,
        ...$(t)
    });
}
const ej = s("ZodMiniDiscriminatedUnion", (e, t)=>{
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
const eC = s("ZodMiniRecord", (e, t)=>{
    er.init(e, t), ec.init(e, t);
});
function eS(e, t, r) {
    return new eC({
        type: "record",
        keyType: e,
        valueType: t,
        ...$(r)
    });
}
const eM = s("ZodMiniEnum", (e, t)=>{
    ei.init(e, t), ec.init(e, t), e.options = Object.values(t.entries);
});
function eP(e, t) {
    return new eM({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...$(t)
    });
}
const eE = s("ZodMiniLiteral", (e, t)=>{
    en.init(e, t), ec.init(e, t);
});
function eL(e, t) {
    return new eE({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...$(t)
    });
}
const eT = s("ZodMiniOptional", (e, t)=>{
    eo.init(e, t), ec.init(e, t);
});
function eN(e) {
    return new eT({
        type: "optional",
        innerType: e
    });
}
const eI = s("ZodMiniNullable", (e, t)=>{
    es.init(e, t), ec.init(e, t);
});
function eR(e) {
    return new eI({
        type: "nullable",
        innerType: e
    });
}
const eA = s("ZodMiniCatch", (e, t)=>{
    el.init(e, t), ec.init(e, t);
}), eD = s("ZodMiniLazy", (e, t)=>{
    ed.init(e, t), ec.init(e, t);
});
function eU() {
    let e = new eD({
        type: "lazy",
        getter: ()=>e$([
                ep(),
                e_(),
                eg(),
                new eb({
                    type: "null",
                    ...$(void 0)
                }),
                ew(e),
                eS(ep(), e)
            ])
    });
    return e;
}
let eZ = ep(), eB = e_(), eF = eg(), eq = eN(eZ), eV = eN(eB), eW = eN(eF);
const eJ = eP([
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
]), eK = eP([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), eG = ez({
    id: eZ,
    name: eN(eR(eZ)),
    kind: eP([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eZ,
    state: eZ,
    reason: eq,
    revision: eq,
    current_revision: eW,
    management_fresh: eW,
    operation_id: eV,
    task_id: eN(eR(eB)),
    updated_at: eV,
    changes: eN(ew(ez({
        name: eZ,
        desired: eZ
    })))
});
let eX = ez({
    state: eZ,
    reason: eq,
    task_id: eN(eR(eB)),
    instance: eV
});
const eH = ez({
    cwmp_id: eZ,
    state: eP([
        "online",
        "waiting_inform",
        "offline_or_stale"
    ]),
    optical_online: eF,
    last_inform: eR(eB),
    age_seconds: eR(eB)
});
let eQ = ez({
    state: eP([
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
    mqtt_target: eR(eZ),
    binding_source: eq,
    link_identity_error: eR(eZ),
    mqtt_last_seen: eR(eB),
    cwmp_id: eq,
    desired_version: eq,
    generation: eV,
    inflight: eW,
    attempts: eV,
    next_retry_at: eV,
    updated_at: eV,
    settings_verified_at: eR(eB),
    last_inform: eR(eB),
    last_error: eN(eR(eZ)),
    persistence_error: eN(eR(eZ)),
    desired: eN(eR(ez({
        vlan: eB,
        vlans: ew(eB),
        priority: eB,
        acs_url: eZ
    }))),
    listener: eN(ez({
        enabled: eF,
        listen: eZ,
        path: eZ,
        error: eR(eZ)
    })),
    endpoint_notice: eq,
    manual_steps: eN(ew(eZ))
});
const eY = eO("state", [
    eQ,
    function(e, t) {
        if (!w(t)) throw Error("Invalid input to extend: expected a plain object");
        let r = e._zod.def.checks;
        if (r && r.length > 0) {
            let r = e._zod.def.shape;
            for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(r, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let i = m(e._zod.def, {
            get shape () {
                let r = {
                    ...e._zod.def.shape,
                    ...t
                };
                return b(this, "shape", r), r;
            }
        });
        return k(e, i);
    }(function(e) {
        var t = void 0;
        let r = e._zod.def.checks;
        if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let i = m(e._zod.def, {
            get shape () {
                let r = e._zod.def.shape, i = {
                    ...r
                };
                if (t) for(let e in t){
                    if (!(e in r)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (i[e] = eT ? new eT({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)i[e] = eT ? new eT({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return b(this, "shape", i), i;
            },
            checks: []
        });
        return k(e, i);
    }(eQ), {
        state: eP([
            "pending",
            "unavailable"
        ]),
        reason: eZ
    })
]), e0 = ez({
    state: eJ,
    operation_id: eV,
    device: eq,
    optical_sn: eq,
    cwmp_id: eq,
    revision: eq,
    mode: eN(eP([
        "apply",
        "plan"
    ])),
    started_at: eV,
    current_revision: eW,
    management_fresh: eW,
    reason: eq,
    error: eq,
    attempts: eV,
    next_retry_at: eV,
    reconcile_reason: eq,
    items: ew(eG),
    cwmp_contract: eN(ez({
        state: eZ,
        requested: eZ,
        contract: eR(eZ),
        reason: eZ,
        cache_hit: eF,
        schema: eZ,
        capabilities: eR(ez({
            wan: eZ,
            wlan: eZ,
            binding: eZ
        }))
    })),
    wan_objects: eN(eS(eZ, eU())),
    wan_lifecycle: eN(eS(eZ, eX)),
    wan_stage: eN(eP([
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
        owned: ew(eB),
        pending: eR(eZ),
        pending_instance: eR(eB)
    })),
    wifi_lifecycle: eN(eS(eZ, eX)),
    wifi_stage: eN(eP([
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
    wifi_cleanup: eN(eP([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e1 = ez({
    enabled: eF,
    mode: eP([
        "auto",
        "manual"
    ]),
    vlan: ew(eB),
    priority: eB,
    address: eZ,
    acs_url: eZ,
    port: eB,
    path: eZ,
    dhcp_enabled: eF
}), e2 = ez({
    state: eP([
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
    error: eR(eZ),
    inflight: eF,
    ready: eF,
    desired_version: eR(eZ),
    applied_version: eR(eZ),
    next_retry_at: eB,
    attempts: eB,
    desired: eR(e1),
    applied: eR(e1),
    previous: eR(e1),
    plan: ew(ez({
        operation: eZ,
        key: eZ,
        value: ew(eZ)
    }))
});
const e5 = ez({
    device: eZ,
    name: eR(eZ),
    group: eR(eZ),
    group_name: eR(eZ),
    template: eR(eZ),
    template_name: eR(eZ),
    optical_sn: eZ,
    adapter: eZ,
    omci_management: ez({
        state: eZ,
        reason: eN(eR(eZ))
    }),
    management: eR(eH),
    acs_bootstrap: eY,
    provisioning: e0,
    services: ew(eG),
    ssids: ew(eG),
    wifi_sync: eK
}), e3 = ez({
    enabled: eF,
    mode: eP([
        "auto",
        "manual"
    ]),
    method: eL("diff"),
    revision: eZ,
    triggers: ew(eZ),
    interval_minutes: new ef({
        type: "number",
        coerce: !0,
        checks: [],
        ...$(void 0)
    }),
    error: eR(eZ),
    devices: ew(e5),
    management_network: e2,
    omci_management: eU(),
    groups: ew(ez({
        id: eZ,
        name: eR(eZ),
        template: eZ
    })),
    pending_devices: ew(eZ)
});
e$([
    ez({
        valid: eL(!0),
        revision: eZ,
        devices: eB,
        error: eN(ev())
    }),
    ez({
        error: eZ,
        valid: eN(ev()),
        revision: eN(ev()),
        devices: eN(ev())
    })
]);
let e4 = ep(), e8 = e_(), e6 = eR(e8), e7 = eS(e4, ez({
    source: e4,
    unit: e4,
    reason: eR(e4),
    raw: eR(e4),
    age_seconds: e6
}));
const e9 = ez({
    phase: eP([
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
    generation: e8,
    error: eR(e4)
}), te = eP([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tt = ez({
    model: e4,
    wavelength_tx_nm: e8,
    wavelength_rx_nm: e8,
    phy_rate_downlink_gbps: e8,
    phy_rate_uplink_gbps: e8,
    tx_power_dbm: e6,
    laser_bias_current_ma: e6,
    temperature_celsius: e6,
    vcc_voltage: e6,
    cdr_locked: eR(eg()),
    tx_enabled: eR(eg()),
    measurements: e7
}), tr = ez({
    equipment_id: eR(e4),
    hardware_version: eR(e4),
    software_images: ew(e4),
    omcc_version: e6,
    errors: ew(e4)
});
const ti = ez({
    onu_id: e8,
    vendor: e4,
    model: e4,
    serial_number: e4,
    state: te,
    business_status: e9,
    management: eR(eH),
    provisioning: eR(e0),
    services: ew(eG),
    ssids: ew(eG),
    wifi_sync: eK,
    acs_bootstrap: eN(eY),
    identity: eR(tr),
    identity_age_seconds: e6,
    identity_current: eg(),
    fiber_distance_m: e6,
    ranging_delay_rtd_ns: e6,
    equalization_delay_bits: new eA({
        type: "catch",
        innerType: e6,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: e6,
    optical_tx_power_dbm: e6,
    firmware_version: e4,
    hardware_version: e4,
    uptime_seconds: e6,
    data_path: ez({
        interface: e4,
        gem_ports: eR(ew(e8)),
        vlan_id: e6,
        tx_bytes: e6,
        rx_bytes: e6,
        current_tx_kbps: e6,
        current_rx_kbps: e6,
        measurements: e7
    }),
    wifi_mesh: ez({
        channel_2g: e6,
        channel_5g: e6,
        bandwidth_5g: eR(e4),
        tx_power_pct: e6,
        measurements: e7
    }),
    connected_clients: eR(ew(ez({
        mac: e4,
        ip: e4,
        band: e4,
        rssi_dbm: e6,
        rx_rate_mbps: e6,
        tx_rate_mbps: e6
    }))),
    measurements: e7
});
let tn = ez({
    reserved_sn: eN(e4),
    port: e8,
    interface: e4,
    carrier: eg(),
    status: e4,
    onu_id: eN(e8),
    onu_sn: eN(e4),
    link_state: e4
});
const ta = ez({
    onu_pinning: eN(ez({
        desired: eS(e4, e8),
        active: eS(e4, e8),
        pending_restart: eg(),
        allocation_blocked: eg(),
        startup_error: eR(e4),
        config_error: eR(e4)
    })),
    fpga_status: e4,
    provisioning: eR(e3),
    optical_transceiver: tt,
    switch_ports: ew(tn),
    sub_gateways: ew(ti),
    telemetry_gateways: ew(ez({
        id: e4,
        last_seen_sec_ago: e8,
        last_payload_bytes: e8
    }))
}), to = eS(e4, ez({
    carrier: eN(eg()),
    mac: eN(e4),
    link: eN(ez({
        speed: eN(e8),
        duplex: eN(e4),
        autoneg: eN(eg())
    })),
    stats: eN(eS(e4, e8))
})), ts = {
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
}, tl = (e)=>null == e || "" === e ? "\u2014" : String(e);
function td(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
    return null != e && Number.isFinite(e) ? `${e.toFixed(t)} dBm` : "\u2014";
}
function tc(e) {
    if (void 0 === e || !Number.isFinite(e) || e < 0) return "\u2014";
    if (e < 1024) return `${e} B`;
    let t = [
        "KiB",
        "MiB",
        "GiB",
        "TiB"
    ], r = e / 1024, i = 0;
    for(; r >= 1024 && i < t.length - 1;)r /= 1024, i++;
    return `${r.toFixed(1)} ${t[i]}`;
}
function tu(e) {
    return void 0 === e || !Number.isFinite(e) || e < 0 ? "\u2014" : e < 1000 ? `${e} Pkts.` : `${(e / 1000).toFixed(2)} KPkts.`;
}
function tp(e) {
    let t = "none" === e.tone ? "" : `fttr-badge fttr-badge-${e.tone}`, r = e.class ? ` ${e.class}` : "", i = o("span", {
        class: `${t}${r}`.trim(),
        children: e.children
    });
    return e.title && i.setAttribute("title", e.title), i;
}
function tf(e, t, r, i) {
    e.textContent = r, "none" === t ? e.className = "" : e.className = `fttr-badge fttr-badge-${t}`, i ? e.setAttribute("title", i) : e.removeAttribute("title");
}
const t_ = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
};
function th(e) {
    return e ? "o5_operation" === e ? {
        tone: "success",
        label: t_.o5_operation,
        title: e
    } : {
        tone: "warning",
        label: t_[e] ?? tl(e),
        title: e
    } : {
        tone: "none",
        label: "\u2014"
    };
}
function tg(e) {
    let t = th(e.state);
    return o(tp, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
function tb(e) {
    return e ? {
        tone: "verified" === e.phase ? "success" : e.error || "wan_bootstrap_pending" === e.phase ? "warning" : "neutral",
        label: `${ts[e.phase]} \xb7 ${e.generation}${e.error ? ` \xb7 ${e.error}` : ""}`,
        title: e.error || void 0
    } : {
        tone: "neutral",
        label: "\u2014"
    };
}
function tm(e) {
    let t = tb(e.status);
    return o(tp, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
const tv = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
};
function ty(e) {
    let t = e?.state, r = function(e) {
        if (null == e || !Number.isFinite(e) || e < 0) return null;
        let t = Math.floor(e);
        if (t < 60) return (1 === t ? _("%d second ago") : _("%d seconds ago")).replace("%d", String(t));
        let r = Math.floor(t / 60);
        if (r < 60) return (1 === r ? _("%d minute ago") : _("%d minutes ago")).replace("%d", String(r));
        let i = Math.floor(t / 3600);
        if (i < 24) return (1 === i ? _("%d hour ago") : _("%d hours ago")).replace("%d", String(i));
        let n = Math.floor(t / 86400);
        return (1 === n ? _("%d day ago") : _("%d days ago")).replace("%d", String(n));
    }(e?.age_seconds ?? (e?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - e.last_inform) : null)), i = e?.last_inform ? new Date(1000 * e.last_inform).toLocaleString() : null, n = i ? _("Last Inform: %s").replace("%s", i) : void 0, a = "\u2014", o = "none";
    return "online" === t ? (o = "success", a = tv.online) : "waiting_inform" === t ? (o = "warning", a = tv.waiting_inform) : "offline_or_stale" === t ? (o = "danger", a = tv.offline_or_stale) : t && (o = "neutral", a = tl(t)), {
        tone: o,
        label: r && t ? `${a} \xb7 ${r}` : a,
        title: n
    };
}
function tw(e) {
    let t = ty(e.management);
    return o(tp, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
const tx = {
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
function tz(e, t) {
    let r = e?.state, i = e?.next_retry_at && e.next_retry_at > Math.floor(Date.now() / 1000) ? e.next_retry_at - Math.floor(Date.now() / 1000) : 0, n = t ?? (e?.current_revision === !1 ? _("Previous configuration") : e?.management_fresh === !1 ? _("Management stale") : e?.reconcile_reason ? e.reconcile_reason : i > 0 ? _("Next self-healing retry in %d seconds").replace("%d", String(i)) : e?.reason ?? e?.error);
    return r && "not_started" !== r ? "completed" === r || "verified" === r ? {
        tone: "success",
        label: "completed" === r ? tx.completed : _("Ready"),
        title: n
    } : "wan_reconciling" === r || "wan_verifying" === r || "wifi_reconciling" === r || "discovering" === r || "reading" === r || "disabling" === r || "disabling_read" === r || "writing" === r || "verifying" === r || "settling" === r || "recovering" === r || "waiting_task" === r ? {
        tone: "info",
        label: tx[r] ?? tl(r),
        title: n
    } : "interrupted" === r || "failed" === r || "error" === r || "blocked" === r ? {
        tone: "danger",
        label: "blocked" === r ? tx.blocked : tx.interrupted,
        title: n
    } : "waiting" === r || "pending" === r || "waiting_management" === r || "reset_pending" === r ? {
        tone: "warning",
        label: tx[r] ?? tx.waiting,
        title: n
    } : {
        tone: "neutral",
        label: tl(r),
        title: n
    } : {
        tone: "neutral",
        label: tx.not_started,
        title: n
    };
}
function tk(e) {
    let t = tz(e.provisioning, e.title);
    return o(tp, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
const t$ = {
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
function tj(e) {
    return e && "not_configured" !== e ? "verified" === e ? {
        tone: "success",
        label: t$.verified
    } : "attention_required" === e ? {
        tone: "danger",
        label: t$.attention_required
    } : "stale_revision" === e || "stale_management" === e || "waiting_management" === e ? {
        tone: "warning",
        label: t$[e]
    } : "recovering" === e ? {
        tone: "info",
        label: t$.recovering
    } : "accepted_unverified" === e || "pending" === e ? {
        tone: "warning",
        label: t$[e]
    } : {
        tone: "neutral",
        label: tl(e)
    } : {
        tone: "neutral",
        label: t$.not_configured
    };
}
function tO(e) {
    let t = tj(e.state);
    return o(tp, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
const tC = `
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
let tS = ez({
    error: e$([
        ep(),
        ez({
            code: ep(),
            message: ep()
        })
    ])
});
class tM extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function tP(e) {
    let t = tS.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new tM("rpc", e) : new tM(e.code, e.message);
    }
    return e;
}
const tE = ez({
    status: eL("pending"),
    job: ep()
});
eO("status", [
    ez({
        status: eL("pending")
    }),
    ez({
        status: eL("ready"),
        chunk: e_(),
        chunks: e_(),
        bytes: e_(),
        data: ep()
    })
]);
let tL = L.rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: !0
}), tT = (L.rpc.declare({
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
})), tN = (L.rpc.declare({
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
}));
L.rpc.declare({
    object: "luci.fttr",
    method: "sync",
    params: [
        "action",
        "target"
    ],
    reject: !0
});
const tI = async ()=>ta.parse(tP(await tL())), tR = async ()=>e3.parse(tP(await tT())), tA = async ()=>to.parse(tP(await tN()));
ez({
    schema_version: eL(1),
    status: eP([
        "success",
        "error"
    ]),
    action: eP([
        "optical_on",
        "optical_off",
        "optical_status",
        "optical_reload",
        "optical_reinitialize",
        "optical_shutdown"
    ]),
    desired_enabled: eR(eg()),
    tx_enabled: eR(eg()),
    actor_state: eP([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: eg(),
    discovery_active: eg(),
    cleanup_pending: eg(),
    error: eR(ez({
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
}), e$([
    ez({
        operation_ids: ew(e_()),
        revision: ep()
    }),
    ez({
        started: eL(!0),
        mode: eP([
            "apply",
            "plan"
        ])
    }),
    ez({
        reset: eL(!0),
        device: ep()
    }),
    ez({
        operation_ids: ew(e_()),
        mode: eP([
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
}), ez({
    source: eP([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: ep(),
    size: e_(),
    sha256: ep(),
    data: eN(ep()),
    factory: ez({
        detected: eg(),
        device: ep(),
        has_data: eg(),
        sha256: ep(),
        data: ep()
    }),
    firmware: ez({
        exists: eg(),
        path: ep(),
        size: e_(),
        sha256: ep(),
        data: ep()
    }),
    error: eN(ep())
}), ez({
    success: eg(),
    path: ep(),
    size: e_(),
    sha256: ep(),
    error: eN(ep())
}), ez({
    success: eg(),
    output: eN(ep()),
    error: eN(ep())
});
let tD = ep(), tU = e_(), tZ = eg(), tB = ez({
    id: tD,
    url: tD
}), tF = ez({
    name: tD,
    kind: eP([
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
    index: tU,
    mask: tU,
    size: tU,
    read: tZ,
    write: tZ,
    set_by_create: tZ,
    avc: tZ,
    optional: tZ,
    deprecated: tZ,
    default_hex: eR(tD),
    reference: tB
}), tq = eO("type", [
    ez({
        type: eL("unsigned"),
        value: tU
    }),
    ez({
        type: eL("signed"),
        value: tU
    }),
    ez({
        type: eL("decimal"),
        value: tD
    }),
    ez({
        type: eL("text"),
        value: eR(tD)
    }),
    ez({
        type: eL("octets"),
        hex: tD
    }),
    ez({
        type: eL("table_length"),
        bytes: tU
    })
]), tV = ez({
    code: tD,
    message: tD,
    offset: tU,
    mask: tU
}), tW = eP([
    "layout",
    "name_only",
    "unknown"
]), tJ = ez({
    raw_hex: tD,
    filter_outer_priority: tU,
    filter_outer_vid: tU,
    filter_outer_tpid_dei: tU,
    filter_inner_priority: tU,
    filter_inner_vid: tU,
    filter_inner_tpid_dei: tU,
    filter_ethertype: tU,
    tags_to_remove: tU,
    treatment_outer_priority: tU,
    treatment_outer_vid: tU,
    treatment_outer_tpid_dei: tU,
    treatment_inner_priority: tU,
    treatment_inner_vid: tU,
    treatment_inner_tpid_dei: tU,
    delete_entry: tZ
}), tK = ez({
    schema_version: eL(1),
    reference_version: tD,
    onu_id: eR(tU),
    uploaded_complete: tZ,
    expected_records: tU,
    received_records: tU,
    decoded_records: tU,
    partial_records: tU,
    basic_records: tU,
    tables_requested: tZ,
    tables_collected: tZ,
    classes: ew(ez({
        class_id: tU,
        name: eR(tD),
        entities: tU,
        records: tU,
        support: tW
    })),
    entities: ew(ez({
        class_id: tU,
        entity_id: tU,
        name: eR(tD),
        support: tW,
        reference: eR(tB),
        sequences: ew(tU),
        attributes: ew(ez({
            definition: tF,
            value: eR(tq),
            observations: ew(ez({
                raw_hex: tD,
                value: tq,
                sequences: ew(tU)
            }))
        })),
        diagnostics: ew(tV)
    })),
    records: ew(ez({
        class_id: tU,
        entity_id: tU,
        sequence: tU,
        attribute_mask: tU,
        raw_hex: tD,
        consumed: tU,
        remaining_hex: tD,
        undecoded_mask: tU
    })),
    tables: ew(ez({
        class_id: tU,
        entity_id: tU,
        attribute: tF,
        collected: tZ,
        error: eR(tD),
        raw_hex: tD,
        rows: ew(tD),
        vlan_rules: ew(tJ)
    })),
    diagnostics: ew(tV)
});
const tG = ez({
    status: eL("ready"),
    report: tK
});
let tX = ez({
    phase: eP([
        "starting",
        "upload",
        "tables"
    ]),
    received: tU,
    expected: eR(tU)
}), tH = eO("status", [
    ez({
        status: eL("pending"),
        progress: eN(tX)
    }),
    ez({
        status: eL("ready"),
        chunk: tU,
        chunks: tU,
        bytes: tU,
        data: tD
    })
]), tQ = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_start",
    params: [
        "onu_id",
        "optical_sn",
        "tables"
    ],
    reject: !0
}), tY = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
}), t0 = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_release",
    params: [
        "job"
    ],
    reject: !0
});
const t1 = async (e, t, r)=>tE.parse(tP(await tQ(e, t, r))), t2 = async (e, t)=>tH.parse(tP(await tY(e, t))), t5 = async (e)=>ez({
        released: tZ
    }).parse(tP(await t0(e)));
let t3 = (e)=>JSON.stringify(e, null, 2);
async function t4(e) {
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
function t8(e) {
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
let t6 = L.rpc.declare({
    object: "uci",
    method: "get",
    params: [
        "config",
        "type"
    ],
    reject: !0
}), t7 = L.rpc.declare({
    object: "uci",
    method: "changes",
    params: [
        "config"
    ],
    reject: !0
}), t9 = L.rpc.declare({
    object: "uci",
    method: "set",
    params: [
        "config",
        "section",
        "values"
    ],
    reject: !0
}), re = L.rpc.declare({
    object: "uci",
    method: "delete",
    params: [
        "config",
        "section",
        "option"
    ],
    reject: !0
}), rt = L.rpc.declare({
    object: "uci",
    method: "commit",
    params: [
        "config"
    ],
    reject: !0
}), rr = !1;
async function ri(e, t, r) {
    if (!L.hasViewPermission() || !t || rr) return;
    let i = e.serial_number.toUpperCase(), n = t.desired[i], a = void 0 !== n, s = a ? n : e.onu_id, l = a ? _("Unpin interface") : _("Pin interface");
    try {
        var d, c, u, p, f, h, g, b, m, v, y, w, x, z, k, $;
        let { values: e } = await t6("fttr", "device"), t = (e)=>Object.entries(e).find((e)=>{
                let [, t] = e;
                return "device" === t[".type"] && t.optical_sn?.toUpperCase() === i;
            }), j = t(e);
        if (!j) return void L.ui.showModal(l, (g = {
            children: [
                (d = {
                    children: _("Add this device on the configuration page before fixing its interface.")
                }, o("p", d)),
                (u = {
                    children: (c = {
                        children: i
                    }, o("code", c))
                }, o("p", u)),
                (h = {
                    class: "right",
                    children: [
                        (p = {
                            type: "button",
                            class: "cbi-button",
                            onclick: ()=>L.ui.hideModal(),
                            children: _("Cancel")
                        }, o("button", p)),
                        " ",
                        (f = {
                            class: "cbi-button cbi-button-action",
                            href: L.url("admin", "network", "fttr", "config"),
                            children: _("Configuration")
                        }, o("a", f))
                    ]
                }, o("div", h))
            ]
        }, o("div", g)));
        let O = (b = {
            class: "error",
            role: "alert"
        }, o("p", b)), C = (m = {
            type: "button",
            class: "cbi-button",
            onclick: ()=>L.ui.hideModal(),
            children: _("Cancel")
        }, o("button", m)), S = (v = {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: async ()=>{
                if (rr) return;
                rr = !0, S.disabled = C.disabled = !0, O.textContent = "";
                let e = !1;
                try {
                    var i;
                    if ((await t7("fttr")).changes.length) throw Error(_("Apply or discard pending FTTR configuration changes first."));
                    let l = (await t6("fttr", "device")).values, d = t(l);
                    if (!d || d[0] !== j[0] || d[1].onu_id !== j[1].onu_id || (null == d[1].onu_id ? void 0 : Number(d[1].onu_id)) !== n) throw Error(_("Interface configuration changed. Refresh the page and try again."));
                    if (!a && Object.entries(l).some((e)=>{
                        let [t, r] = e;
                        return t !== d[0] && "device" === r[".type"] && null != r.onu_id && Number(r.onu_id) === s;
                    })) throw Error(_("Interface already reserved by another device."));
                    a ? await re("fttr", d[0], "onu_id") : await t9("fttr", d[0], {
                        onu_id: String(s)
                    }), await rt("fttr"), e = !0, await tR(), r(await tI()), L.ui.hideModal(), L.ui.addNotification(null, (i = {
                        children: _("Interface setting saved. Restart FTTR for it to take effect.")
                    }, o("p", i)), "info");
                } catch (t) {
                    O.textContent = `${e ? _("Saved, but configuration reload or status refresh failed:") : _("Failed to save interface setting:")} ${String(t)}`;
                } finally{
                    rr = !1, S.disabled = e, C.disabled = !1;
                }
            },
            children: _("Confirm")
        }, o("button", v));
        L.ui.showModal(l, ($ = {
            children: [
                (y = {
                    children: a ? _("Cancel the fixed interface for this device?") : _("Fix this device to its current interface?")
                }, o("p", y)),
                (x = {
                    children: [
                        (w = {
                            children: i
                        }, o("code", w)),
                        ` \xb7 fttr${s + 1} \xb7 ONU-ID ${s}`
                    ]
                }, o("p", x)),
                (z = {
                    children: _("This saves the configuration only. The current allocation stays unchanged until FTTR is restarted.")
                }, o("p", z)),
                O,
                (k = {
                    class: "right",
                    children: [
                        C,
                        " ",
                        S
                    ]
                }, o("div", k))
            ]
        }, o("div", $)));
    } catch (e) {
        L.ui.addNotification(null, o("p", {
            children: String(e)
        }), "error");
    }
}
let rn = L.view, ra = L.Poll;
function ro(e, t) {
    var r, i, n;
    let a, s = e, l = o("button", {
        type: "button",
        class: "cbi-button cbi-button-neutral",
        style: "padding:0 .4em;min-height:1.5em;font-size:85%;margin-left:.5em",
        onclick: ()=>ri(s, a, t)
    }), d = o("span", {}), c = o("span", {}), u = o("span", {}), p = o("code", {
        style: "font-size:90%"
    }), f = o("span", {
        class: "fttr-badge"
    }), h = o("span", {
        class: "fttr-badge"
    }), g = o("span", {
        style: "font-size:90%"
    }), b = o("code", {
        style: "font-size:90%"
    }), m = o("span", {
        class: "fttr-badge"
    }), v = o("span", {
        class: "fttr-badge"
    }), y = o("span", {
        class: "fttr-badge"
    }), w = (n = {
        "data-fttr-onu-id": String(e.onu_id),
        children: [
            o("td", {
                children: [
                    d,
                    l
                ]
            }),
            o("td", {
                children: c
            }),
            o("td", {
                children: u
            }),
            o("td", {
                children: p
            }),
            o("td", {
                children: f
            }),
            o("td", {
                children: h
            }),
            o("td", {
                children: g
            }),
            o("td", {
                children: b
            }),
            o("td", {
                children: m
            }),
            o("td", {
                children: v
            }),
            o("td", {
                children: y
            }),
            (i = {
                style: "text-align:right",
                children: (r = {
                    type: "button",
                    class: "cbi-button cbi-button-neutral",
                    onclick: ()=>(function(e) {
                            var t, r, i, n, a, s, l, d, c, u, p;
                            let f = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "basic", h = !1, g = !1, b = null, m = null, v = (t = {
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
                                                o(tg, {
                                                    state: e.state
                                                })
                                            ],
                                            [
                                                _("Business"),
                                                o(tm, {
                                                    status: e.business_status
                                                })
                                            ],
                                            [
                                                _("Receive optical power"),
                                                td(e.optical_rx_power_dbm)
                                            ],
                                            [
                                                _("Transmit optical power"),
                                                td(e.optical_tx_power_dbm)
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
                                                    let t = Math.floor(e), r = Math.floor(t / 86400), i = Math.floor(t % 86400 / 3600), n = Math.floor(t % 3600 / 60), a = [];
                                                    return r > 0 && a.push(`${r}d`), (i > 0 || r > 0) && a.push(`${i}h`), (n > 0 || i > 0 || r > 0) && a.push(`${n}m`), a.push(`${t % 60}s`), a.join(" ");
                                                }(e.uptime_seconds)} (${Math.floor(e.uptime_seconds)} s)`
                                            ]
                                        ]
                                    },
                                    {
                                        title: _("Management & cache"),
                                        rows: [
                                            [
                                                _("CWMP"),
                                                o(tw, {
                                                    management: e.management
                                                })
                                            ],
                                            [
                                                _("Last Inform"),
                                                e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
                                            ],
                                            [
                                                _("Provisioning"),
                                                o(tk, {
                                                    provisioning: e.provisioning
                                                })
                                            ],
                                            [
                                                _("Wi-Fi sync"),
                                                o(tO, {
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
                                    var t, r, i;
                                    return i = {
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
                                                        let [r, i] = e;
                                                        return t = {
                                                            children: [
                                                                o("th", {
                                                                    style: "width:35%",
                                                                    children: r
                                                                }),
                                                                o("td", {
                                                                    children: i instanceof Node ? i : tl(i)
                                                                })
                                                            ]
                                                        }, o("tr", t);
                                                    })
                                                }, o("tbody", t))
                                            }, o("table", r))
                                        ]
                                    }, o("div", i);
                                })
                            }, o("div", t)), y = (r = {
                                class: "mib-status-bar",
                                role: "status",
                                children: o("span", {
                                    class: "mib-hint-text",
                                    children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                                })
                            }, o("div", r)), w = (i = {
                                class: "cbi-progressbar",
                                style: "display:none;width:100%",
                                title: "0%",
                                children: o("div", {
                                    style: "width:0%"
                                })
                            }, o("div", i)), x = o("div", {}), z = o("pre", {
                                class: "onu-raw-pre"
                            }), k = o("span", {
                                class: "download-status",
                                role: "status"
                            }), $ = null, j = o("button", {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                disabled: !0,
                                onclick: async ()=>{
                                    if (b && !h) {
                                        j.disabled = !0, k.textContent = _("Preparing JSON download\u2026");
                                        try {
                                            let t = await t4(b);
                                            if (h) return;
                                            $ && URL.revokeObjectURL($), $ = URL.createObjectURL(t);
                                            let r = document.createElement("a");
                                            r.href = $, r.download = `mib-${e.serial_number}.json`, r.click(), k.textContent = _("JSON download started"), window.setTimeout(()=>{
                                                URL.revokeObjectURL(r.href), $ === r.href && ($ = null);
                                            }, 1000);
                                        } catch (e) {
                                            k.textContent = String(e);
                                        } finally{
                                            j.disabled = !b || h;
                                        }
                                    }
                                },
                                children: _("Download JSON")
                            }), O = (a = {
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
                                                    j,
                                                    k
                                                ]
                                            })
                                        ]
                                    }, o("div", n)),
                                    z
                                ]
                            }, o("div", a)), C = o("button", {
                                type: "button",
                                class: "cbi-button cbi-button-apply",
                                onclick: ()=>U(!1),
                                children: _("Read MIB")
                            }), S = o("button", {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                onclick: ()=>U(!0),
                                children: _("Read MIB and VLAN tables")
                            }), M = (d = {
                                class: "onu-mib-panel",
                                children: [
                                    (l = {
                                        class: "mib-controls",
                                        children: [
                                            (s = {
                                                class: "mib-action-group",
                                                children: [
                                                    C,
                                                    S,
                                                    o("small", {
                                                        class: "mib-action-hint",
                                                        children: _("Collecting VLAN tables queries extended filter tables and takes longer.")
                                                    })
                                                ]
                                            }, o("div", s)),
                                            y,
                                            w
                                        ]
                                    }, o("div", l)),
                                    x
                                ]
                            }, o("div", d)), P = {
                                basic: v,
                                mib: M,
                                raw: O
                            }, T = new Map();
                            function N(e) {
                                for (let [t, r] of Object.entries(P))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                                for (let [t, r] of T)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
                            }
                            let I = (c = {
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
                                        class: e.id === f ? "cbi-tab" : "cbi-tab-disabled",
                                        "data-tab": e.id,
                                        children: o("a", {
                                            href: `#tab-${e.id}`,
                                            onclick: (t)=>{
                                                t.preventDefault(), N(e.id);
                                            },
                                            children: e.label
                                        })
                                    }, o("li", t));
                                    return T.set(e.id, r), r;
                                })
                            }, o("ul", c)), R = o("div", {
                                class: "onu-details-header",
                                children: I
                            }), A = (p = {
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
				${tC}
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
                                    R,
                                    v,
                                    M,
                                    O,
                                    (u = {
                                        class: "right onu-details-footer",
                                        children: o("button", {
                                            type: "button",
                                            class: "cbi-button",
                                            onclick: ()=>{
                                                h = !0, $ && URL.revokeObjectURL($), $ = null, b = null, z.textContent = "", x.replaceChildren(), L.ui.hideModal();
                                            },
                                            children: _("Close")
                                        })
                                    }, o("div", u))
                                ]
                            }, o("div", p)), D = ()=>!h && A.isConnected && A.getClientRects().length > 0;
                            async function U(t) {
                                if (!g) {
                                    g = !0, C.disabled = S.disabled = !0, w.style.display = "", w.title = "0%", w.firstElementChild.style.width = "0%", y.textContent = _("Reading MIB\u2026");
                                    try {
                                        let g = await tI(), $ = g.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                        if ($?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                        if (!D()) return;
                                        let O = await t1($.onu_id, $.serial_number, t);
                                        m = O.job;
                                        let C = Date.now() + 140000;
                                        for(; D();){
                                            let e = await t2(O.job, 0);
                                            if (!D()) return;
                                            if ("ready" === e.status) {
                                                var r, i, n, a, s, l, d, c, u, p, f, h, v, k;
                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                let t = new Uint8Array(e.bytes), g = 0;
                                                for(let r = 0; r < e.chunks; r++){
                                                    let i = 0 === r ? e : await t2(O.job, r);
                                                    if (!D()) return;
                                                    if ("ready" !== i.status || i.chunk !== r || i.chunks !== e.chunks || i.bytes !== e.bytes || !i.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                    let n = atob(i.data);
                                                    if (n.length > 32768 || g + n.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                    for(let e = 0; e < n.length; e++)t[g++] = n.charCodeAt(e);
                                                    let a = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                                    w.title = `${a}%`, w.firstElementChild.style.width = `${a}%`, y.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                                }
                                                if (g !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                if (await Z(), b = tG.parse(tP(JSON.parse(new TextDecoder("utf-8", {
                                                    fatal: !0
                                                }).decode(t)))).report, 1 !== b.schema_version || b.onu_id !== $.onu_id) throw Error(_("Unexpected MIB response"));
                                                w.style.display = "none", y.replaceChildren((r = b, f = {
                                                    class: "mib-chips",
                                                    children: [
                                                        (n = {
                                                            class: "mib-chip mib-chip-primary",
                                                            children: [
                                                                "ONU ",
                                                                r.onu_id
                                                            ]
                                                        }, o("span", n)),
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
                                                        (l = {
                                                            class: "mib-chip",
                                                            children: [
                                                                _("Decoded"),
                                                                ": ",
                                                                r.decoded_records
                                                            ]
                                                        }, o("span", l)),
                                                        r.partial_records > 0 ? (d = {
                                                            class: "mib-chip mib-chip-warning",
                                                            children: [
                                                                _("Partial"),
                                                                ": ",
                                                                r.partial_records
                                                            ]
                                                        }, o("span", d)) : null,
                                                        (c = {
                                                            class: "mib-chip mib-chip-neutral",
                                                            children: [
                                                                _("Basic"),
                                                                ": ",
                                                                r.basic_records
                                                            ]
                                                        }, o("span", c)),
                                                        (u = {
                                                            class: "mib-chip",
                                                            children: r.tables_collected ? _("VLAN tables collected") : _("VLAN tables not collected")
                                                        }, o("span", u)),
                                                        (p = {
                                                            class: "mib-chip mib-chip-subtle",
                                                            children: new Date().toLocaleTimeString()
                                                        }, o("span", p))
                                                    ]
                                                }, o("div", f))), x.replaceChildren(function(e) {
                                                    var t, r, i, n, a, s;
                                                    let l = e.classes.length ? e.classes[0].class_id : null, d = (t = {
                                                        class: "mib-content"
                                                    }, o("div", t)), c = (r = {
                                                        type: "search",
                                                        class: "cbi-input-text mib-search-input",
                                                        placeholder: _("Search ME name or Class ID\u2026")
                                                    }, o("input", r)), u = (i = {
                                                        class: "mib-class-list"
                                                    }, o("div", i)), p = new Map();
                                                    function f(t) {
                                                        var r, i;
                                                        for (let [e, r] of (l = t, p))e === t ? r.classList.add("active") : r.classList.remove("active");
                                                        let n = e.entities.filter((e)=>e.class_id === t);
                                                        n.length ? d.replaceChildren(...n.map((r, i)=>{
                                                            var n, a, s, l, d, c, u, p, f, h, g, b, m, v, y, w, x, z, k;
                                                            return k = {
                                                                open: 0 === i,
                                                                class: "mib-entity-details",
                                                                children: [
                                                                    (d = {
                                                                        class: "mib-entity-summary",
                                                                        children: [
                                                                            (s = {
                                                                                class: "mib-entity-title",
                                                                                children: [
                                                                                    (n = {
                                                                                        children: tl(r.name)
                                                                                    }, o("strong", n)),
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
                                                                            (l = {
                                                                                class: "mib-entity-support",
                                                                                children: r.support
                                                                            }, o("span", l))
                                                                        ]
                                                                    }, o("summary", d)),
                                                                    (z = {
                                                                        class: "mib-entity-body",
                                                                        children: [
                                                                            r.attributes.length ? (m = {
                                                                                class: "table mib-attributes-table",
                                                                                children: [
                                                                                    (g = {
                                                                                        children: (h = {
                                                                                            children: [
                                                                                                (c = {
                                                                                                    style: "width:28%",
                                                                                                    children: _("Attribute")
                                                                                                }, o("th", c)),
                                                                                                (u = {
                                                                                                    style: "width:14%",
                                                                                                    children: _("Type")
                                                                                                }, o("th", u)),
                                                                                                (p = {
                                                                                                    children: _("Value")
                                                                                                }, o("th", p)),
                                                                                                (f = {
                                                                                                    style: "width:18%",
                                                                                                    children: _("Definition")
                                                                                                }, o("th", f))
                                                                                            ]
                                                                                        }, o("tr", h))
                                                                                    }, o("thead", g)),
                                                                                    (b = {
                                                                                        children: r.attributes.map((e)=>{
                                                                                            var t, r, i, n, a, s, l, d, c, u;
                                                                                            return u = {
                                                                                                children: [
                                                                                                    (t = {
                                                                                                        class: "mib-attr-name",
                                                                                                        children: e.definition.name
                                                                                                    }, o("td", t)),
                                                                                                    (i = {
                                                                                                        class: "mib-attr-kind",
                                                                                                        children: (r = {
                                                                                                            children: e.definition.kind
                                                                                                        }, o("code", r))
                                                                                                    }, o("td", i)),
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
                                                                                                                            return tl(e.value);
                                                                                                                        case "octets":
                                                                                                                            return tl(e.hex);
                                                                                                                        case "table_length":
                                                                                                                            return tl(e.bytes);
                                                                                                                        default:
                                                                                                                            throw new tM("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                                    }
                                                                                                                }(e.value)
                                                                                                            }, o("span", n)),
                                                                                                            e.observations?.length ? (l = {
                                                                                                                class: "mib-obs-details",
                                                                                                                children: [
                                                                                                                    (a = {
                                                                                                                        children: _("Raw data / observations")
                                                                                                                    }, o("summary", a)),
                                                                                                                    (s = {
                                                                                                                        class: "mib-pre",
                                                                                                                        children: t3(e.observations)
                                                                                                                    }, o("pre", s))
                                                                                                                ]
                                                                                                            }, o("details", l)) : null
                                                                                                        ]
                                                                                                    }, o("td", d)),
                                                                                                    (c = {
                                                                                                        class: "mib-attr-ref",
                                                                                                        children: t8(e.definition)
                                                                                                    }, o("td", c))
                                                                                                ]
                                                                                            }, o("tr", u);
                                                                                        })
                                                                                    }, o("tbody", b))
                                                                                ]
                                                                            }, o("table", m)) : (v = {
                                                                                children: _("Basic display only; raw records are preserved.")
                                                                            }, o("p", v)),
                                                                            e.tables.filter((e)=>e.class_id === t && e.entity_id === r.entity_id).map((e)=>{
                                                                                var t, r, i, n, a, s, l, d, c, u, p, f, h, g, b, m;
                                                                                return m = {
                                                                                    class: "mib-table-details",
                                                                                    children: [
                                                                                        (t = {
                                                                                            children: [
                                                                                                e.attribute.name,
                                                                                                " \xb7",
                                                                                                " ",
                                                                                                e.collected ? `${e.rows.length} ${_("rows")}` : tl(e.error)
                                                                                            ]
                                                                                        }, o("summary", t)),
                                                                                        e.vlan_rules.length ? (h = {
                                                                                            class: "mib-table-overflow",
                                                                                            children: (f = {
                                                                                                class: "table",
                                                                                                children: [
                                                                                                    (u = {
                                                                                                        children: (c = {
                                                                                                            children: [
                                                                                                                (r = {
                                                                                                                    children: _("Outer filter (priority / VID / TPID-DEI)")
                                                                                                                }, o("th", r)),
                                                                                                                (i = {
                                                                                                                    children: _("Inner filter (priority / VID / TPID-DEI)")
                                                                                                                }, o("th", i)),
                                                                                                                (n = {
                                                                                                                    children: _("EtherType code")
                                                                                                                }, o("th", n)),
                                                                                                                (a = {
                                                                                                                    children: _("Remove tags")
                                                                                                                }, o("th", a)),
                                                                                                                (s = {
                                                                                                                    children: _("Outer treatment (priority / VID / TPID-DEI)")
                                                                                                                }, o("th", s)),
                                                                                                                (l = {
                                                                                                                    children: _("Inner treatment (priority / VID / TPID-DEI)")
                                                                                                                }, o("th", l)),
                                                                                                                (d = {
                                                                                                                    children: _("Delete entry")
                                                                                                                }, o("th", d))
                                                                                                            ]
                                                                                                        }, o("tr", c))
                                                                                                    }, o("thead", u)),
                                                                                                    (p = {
                                                                                                        children: e.vlan_rules.map((e)=>{
                                                                                                            var t, r, i, n, a, s, l, d;
                                                                                                            return d = {
                                                                                                                children: [
                                                                                                                    (t = {
                                                                                                                        children: `${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`
                                                                                                                    }, o("td", t)),
                                                                                                                    (r = {
                                                                                                                        children: `${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`
                                                                                                                    }, o("td", r)),
                                                                                                                    (i = {
                                                                                                                        children: tl(e.filter_ethertype)
                                                                                                                    }, o("td", i)),
                                                                                                                    (n = {
                                                                                                                        children: tl(e.tags_to_remove)
                                                                                                                    }, o("td", n)),
                                                                                                                    (a = {
                                                                                                                        children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                                    }, o("td", a)),
                                                                                                                    (s = {
                                                                                                                        children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                                    }, o("td", s)),
                                                                                                                    (l = {
                                                                                                                        children: tl(e.delete_entry)
                                                                                                                    }, o("td", l))
                                                                                                                ]
                                                                                                            }, o("tr", d);
                                                                                                        })
                                                                                                    }, o("tbody", p))
                                                                                                ]
                                                                                            }, o("table", f))
                                                                                        }, o("div", h)) : null,
                                                                                        (g = {
                                                                                            style: "margin-top:6px",
                                                                                            children: [
                                                                                                _("G.988 encoded field values"),
                                                                                                ": ",
                                                                                                t8(e.attribute)
                                                                                            ]
                                                                                        }, o("p", g)),
                                                                                        (b = {
                                                                                            class: "mib-pre",
                                                                                            children: t3(e.vlan_rules.length ? e.vlan_rules : e.rows)
                                                                                        }, o("pre", b))
                                                                                    ]
                                                                                }, o("details", m);
                                                                            }),
                                                                            (x = {
                                                                                class: "mib-diag-details",
                                                                                children: [
                                                                                    (y = {
                                                                                        children: _("Records / diagnostics")
                                                                                    }, o("summary", y)),
                                                                                    (w = {
                                                                                        class: "mib-pre",
                                                                                        children: t3({
                                                                                            diagnostics: r.diagnostics,
                                                                                            records: e.records.filter((e)=>e.class_id === t && e.entity_id === r.entity_id)
                                                                                        })
                                                                                    }, o("pre", w))
                                                                                ]
                                                                            }, o("details", x))
                                                                        ]
                                                                    }, o("div", z))
                                                                ]
                                                            }, o("details", k);
                                                        })) : d.replaceChildren((i = {
                                                            class: "mib-empty-content",
                                                            children: (r = {
                                                                children: _("No entities recorded for this ME class.")
                                                            }, o("p", r))
                                                        }, o("div", i)));
                                                    }
                                                    function h() {
                                                        var t;
                                                        let r = c.value.trim().toLowerCase();
                                                        p.clear();
                                                        let i = e.classes.filter((e)=>`${e.class_id} ${e.name ?? ""}`.toLowerCase().includes(r));
                                                        i.length ? u.replaceChildren(...i.map((e)=>{
                                                            var t, r, i, n;
                                                            let a = (n = {
                                                                type: "button",
                                                                class: `mib-class-btn${e.class_id === l ? " active" : ""}`,
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
                                                                    (i = {
                                                                        class: "mib-class-count",
                                                                        children: e.entities
                                                                    }, o("span", i))
                                                                ]
                                                            }, o("button", n));
                                                            return p.set(e.class_id, a), a;
                                                        })) : u.replaceChildren((t = {
                                                            class: "mib-empty-list",
                                                            children: _("No matching ME classes")
                                                        }, o("div", t)));
                                                    }
                                                    return c.addEventListener("input", h), h(), e.classes.length && f(e.classes[0].class_id), s = {
                                                        class: "mib-browser",
                                                        children: [
                                                            (a = {
                                                                class: "mib-sidebar",
                                                                children: [
                                                                    (n = {
                                                                        class: "mib-search-box",
                                                                        children: c
                                                                    }, o("div", n)),
                                                                    u
                                                                ]
                                                            }, o("div", a)),
                                                            d
                                                        ]
                                                    }, o("div", s);
                                                }(b), (k = {
                                                    class: "mib-upload-diagnostics",
                                                    children: [
                                                        (h = {
                                                            children: _("Upload diagnostics")
                                                        }, o("summary", h)),
                                                        (v = {
                                                            class: "mib-pre",
                                                            children: t3(b.diagnostics)
                                                        }, o("pre", v))
                                                    ]
                                                }, o("details", k))), i = b, z.textContent = t3({
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
                                                }), j.disabled = !1;
                                                return;
                                            }
                                            if (e.progress) {
                                                let { phase: t, received: r, expected: i } = e.progress;
                                                if (y.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == i ? "" : `: ${r}/${i}`}` : null == i ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${i}`, i && i > 0) {
                                                    let e = Math.min(100, Math.round(r / i * 100));
                                                    w.title = `${e}%`, w.firstElementChild.style.width = `${e}%`;
                                                }
                                            }
                                            if (Date.now() >= C) throw Error(_("MIB query timed out; retry."));
                                            await new Promise((e)=>setTimeout(e, 1000));
                                        }
                                    } catch (e) {
                                        D() && (w.style.display = "none", y.replaceChildren(o("span", {
                                            class: "mib-error-text",
                                            children: [
                                                String(e),
                                                b ? ` \xb7 ${_("Previous snapshot retained")}` : ""
                                            ]
                                        })));
                                    } finally{
                                        await Z(), g = !1, C.disabled = S.disabled = !1;
                                    }
                                }
                            }
                            async function Z() {
                                if (!m) return;
                                let e = m;
                                m = null;
                                try {
                                    await t5(e);
                                } catch (e) {
                                    console.warn("Failed to release MIB snapshot", e);
                                }
                            }
                            N(f), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, A, "modal-wide");
                        })(s),
                    children: _("Details")
                }, o("button", r))
            }, o("td", i))
        ]
    }, o("tr", n));
    w.addEventListener("mouseenter", ()=>{
        let e = s.data_path?.interface;
        if (e) {
            let t = e.match(/fttr(\d+)/);
            if (t) {
                let e = document.querySelector(`[data-fttr-port="${t[1]}"]`);
                e?.classList.add("fttr-port-highlight");
            }
        }
    }), w.addEventListener("mouseleave", ()=>{
        document.querySelectorAll(".fttr-port-highlight").forEach((e)=>{
            e.classList.remove("fttr-port-highlight");
        });
    });
    let x = {
        element: w,
        update (e, t) {
            s = e, a = t;
            let r = e.serial_number.toUpperCase(), i = t?.desired[r];
            l.textContent = void 0 !== i ? _("Unpin") : _("Pin"), l.hidden = !t, l.disabled = !L.hasViewPermission(), l.title = i !== t?.active[r] ? _("Pending restart") : void 0 !== i ? _("Fixed interface") : _("Pin interface"), w.setAttribute("data-fttr-onu-id", String(e.onu_id)), d.textContent = String(e.onu_id), c.textContent = tl(e.vendor), u.textContent = tl(e.identity?.equipment_id ?? e.model), p.textContent = tl(e.serial_number);
            let n = th(e.state);
            tf(f, n.tone, n.label, n.title);
            let o = tb(e.business_status);
            tf(h, o.tone, o.label, o.title);
            let x = function(e) {
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
            }(e.firmware_version || e.identity?.software_images?.join("; "));
            g.textContent = x.display, x.full ? g.setAttribute("title", x.full) : g.removeAttribute("title"), b.textContent = tl(e.data_path?.interface);
            let z = ty(e.management);
            tf(m, z.tone, z.label, z.title);
            let k = tz(e.provisioning);
            tf(v, k.tone, k.label, k.title);
            let $ = tj(e.wifi_sync);
            tf(y, $.tone, $.label, $.title);
        }
    };
    return x.update(e), x;
}
let rs = null, rl = null, rd = !1;
const main = rn.extend({
    async load () {
        let [e, t] = await Promise.all([
            tI(),
            tA().catch((e)=>(console.warn("Failed to load network device details", e), {}))
        ]);
        return {
            status: e,
            devices: t
        };
    },
    render (e) {
        var t, r, i, n, a, s, l, d, c, u, p, f, h, g;
        let b, m, v, y, w, x, z, k, $, j, O, C, S, M, P;
        return t = e.status, r = e.devices, b = t.optical_transceiver ?? {}, m = r, v = function(e, t) {
            var r, i, n, a, s;
            let l = new Map();
            for (let r of e)l.set(r.onu_id, ro(r, t));
            let d = (r = {
                children: o("td", {
                    colSpan: 12,
                    children: _("No registered sub-gateways.")
                })
            }, o("tr", r)), c = 0 === e.length, u = o("tbody", {
                children: c ? d : [
                    ...l.values()
                ].map((e)=>e.element)
            });
            return {
                element: (s = {
                    class: "table-wrapper",
                    children: (a = {
                        class: "table",
                        children: [
                            (n = {
                                children: (i = {
                                    children: [
                                        o("th", {
                                            children: _("ONU ID")
                                        }),
                                        o("th", {
                                            children: _("Vendor")
                                        }),
                                        o("th", {
                                            children: _("Model")
                                        }),
                                        o("th", {
                                            children: _("Optical serial")
                                        }),
                                        o("th", {
                                            children: _("Registration")
                                        }),
                                        o("th", {
                                            children: _("Business")
                                        }),
                                        o("th", {
                                            children: _("Firmware")
                                        }),
                                        o("th", {
                                            children: _("Data interface")
                                        }),
                                        o("th", {
                                            children: _("CWMP")
                                        }),
                                        o("th", {
                                            children: _("Synchronization")
                                        }),
                                        o("th", {
                                            children: _("Wi-Fi sync")
                                        }),
                                        o("th", {
                                            style: "text-align:right",
                                            children: _("Details")
                                        })
                                    ]
                                }, o("tr", i))
                            }, o("thead", n)),
                            u
                        ]
                    }, o("table", a))
                }, o("div", s)),
                update (e, r) {
                    let i = new Set(e.map((e)=>e.onu_id));
                    for (let [e, t] of l)i.has(e) || (t.element.remove(), l.delete(e));
                    if (0 === e.length) {
                        c || u.append(d), c = !0;
                        return;
                    }
                    for (let [i, n] of (c && (d.remove(), c = !1), e.entries())){
                        let e = l.get(n.onu_id);
                        e || (e = ro(n, t), l.set(n.onu_id, e)), e.update(n, r);
                        let a = u.children.item(i);
                        a !== e.element && u.insertBefore(e.element, a);
                    }
                }
            };
        }(t.sub_gateways ?? [], (e)=>P(e, m)), y = Array.from({
            length: 16
        }, (e, t)=>{
            var r, i, n, a, s, l, d, c, u, p, f, h, g, b, m, v, y, w;
            let x, z, k, $, j, O, C, S, M, P, T, N, I, R, A, D, U, Z, B;
            return r = t + 1, x = o("span", {}), z = o("span", {
                style: "display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:90%",
                children: _("Unknown")
            }), k = o("img", {
                src: "/luci-static/resources/icons/port_down.svg",
                alt: "",
                "aria-hidden": "true"
            }), $ = o("div", {
                style: "flex:1;height:3px;opacity:0.25;background-color:rgb(240, 144, 144)"
            }), j = o("span", {}), O = o("span", {}), C = o("span", {}), S = o("span", {}), M = o("span", {}), P = o("span", {}), T = o("span", {}), N = o("span", {}), I = o("span", {}), R = o("span", {}), A = o("span", {}), D = o("span", {}), U = o("span", {}), Z = o("span", {}), (w = {
                class: "ifacebox fttr-port-card",
                "data-fttr-port": String(r),
                style: "box-sizing:border-box;margin:0;cursor:pointer",
                children: [
                    o("div", {
                        class: "ifacebox-head fttr-port-name",
                        style: "font-weight:bold",
                        children: x
                    }),
                    o("div", {
                        class: "ifacebox-body fttr-port-identity",
                        children: [
                            k,
                            z
                        ]
                    }),
                    (n = {
                        class: "ifacebox-head cbi-tooltip-container",
                        style: "display:flex",
                        children: [
                            $,
                            (i = {
                                class: "cbi-tooltip left",
                                children: [
                                    o("strong", {
                                        children: [
                                            _("Port status"),
                                            ": "
                                        ]
                                    }),
                                    j,
                                    o("br", {}),
                                    o("strong", {
                                        children: [
                                            _("ONU"),
                                            ": "
                                        ]
                                    }),
                                    O,
                                    o("br", {}),
                                    o("strong", {
                                        children: [
                                            _("MAC address"),
                                            ": "
                                        ]
                                    }),
                                    C
                                ]
                            }, o("span", i))
                        ]
                    }, o("div", n)),
                    (y = {
                        class: "ifacebox-body",
                        children: (v = {
                            class: "cbi-tooltip-container fttr-port-stats",
                            style: "display:flex;flex-direction:column;align-items:center;font-size:80%;line-height:1.4;cursor:pointer;width:100%",
                            children: [
                                (a = {
                                    style: "display:flex;flex-direction:column;align-items:center",
                                    children: [
                                        o("div", {
                                            style: "white-space:nowrap",
                                            children: [
                                                "\u25B2\u202F",
                                                S
                                            ]
                                        }),
                                        o("div", {
                                            style: "white-space:nowrap",
                                            children: [
                                                "\u25BC\u202F",
                                                M
                                            ]
                                        })
                                    ]
                                }, o("div", a)),
                                (m = {
                                    class: "cbi-tooltip",
                                    children: (b = {
                                        children: [
                                            (s = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            _("Received bytes"),
                                                            ": "
                                                        ]
                                                    }),
                                                    P
                                                ]
                                            }, o("span", s)),
                                            o("br", {}),
                                            (l = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            _("Received packets"),
                                                            ": "
                                                        ]
                                                    }),
                                                    T
                                                ]
                                            }, o("span", l)),
                                            o("br", {}),
                                            (d = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            _("Received multicast"),
                                                            ": "
                                                        ]
                                                    }),
                                                    N
                                                ]
                                            }, o("span", d)),
                                            o("br", {}),
                                            (c = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            _("Receive errors"),
                                                            ": "
                                                        ]
                                                    }),
                                                    I
                                                ]
                                            }, o("span", c)),
                                            o("br", {}),
                                            (u = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            _("Receive dropped"),
                                                            ": "
                                                        ]
                                                    }),
                                                    R
                                                ]
                                            }, o("span", u)),
                                            o("br", {}),
                                            (p = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            _("Transmitted bytes"),
                                                            ": "
                                                        ]
                                                    }),
                                                    A
                                                ]
                                            }, o("span", p)),
                                            o("br", {}),
                                            (f = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            _("Transmitted packets"),
                                                            ": "
                                                        ]
                                                    }),
                                                    D
                                                ]
                                            }, o("span", f)),
                                            o("br", {}),
                                            (h = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            _("Transmit errors"),
                                                            ": "
                                                        ]
                                                    }),
                                                    U
                                                ]
                                            }, o("span", h)),
                                            o("br", {}),
                                            (g = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            _("Transmit dropped"),
                                                            ": "
                                                        ]
                                                    }),
                                                    Z
                                                ]
                                            }, o("span", g))
                                        ]
                                    }, o("span", b))
                                }, o("span", m))
                            ]
                        }, o("div", v))
                    }, o("div", y))
                ]
            }, B = o("div", w)).addEventListener("mouseenter", ()=>{
                let e = B.getAttribute("data-active-onu-id");
                if (e) {
                    let t = document.querySelector(`[data-fttr-onu-id="${e}"]`);
                    t?.classList.add("fttr-row-highlight");
                }
            }), B.addEventListener("mouseleave", ()=>{
                document.querySelectorAll(".fttr-row-highlight").forEach((e)=>{
                    e.classList.remove("fttr-row-highlight");
                });
            }), B.addEventListener("click", ()=>{
                let e = B.getAttribute("data-active-onu-id");
                if (e) {
                    let t = document.querySelector(`[data-fttr-onu-id="${e}"]`);
                    t && (t.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    }), t.classList.add("fttr-row-highlight"), window.setTimeout(()=>t.classList.remove("fttr-row-highlight"), 1500));
                }
            }), {
                element: B,
                update (e, t) {
                    var i;
                    let n = (e.switch_ports ?? []).find((e)=>e.port === r), a = n?.interface ?? `fttr${r}`, o = t[a], s = o?.stats, l = n?.carrier ?? o?.carrier ?? (o?.link?.speed !== void 0 || void 0), d = (e.sub_gateways ?? []).find((e)=>e.onu_id === n?.onu_id), c = !0 === l, u = s?.rx_bytes, p = s?.tx_bytes;
                    n?.onu_id !== void 0 ? B.setAttribute("data-active-onu-id", String(n.onu_id)) : B.removeAttribute("data-active-onu-id"), c ? (B.classList.add("port-up"), B.classList.remove("port-down")) : (B.classList.add("port-down"), B.classList.remove("port-up")), x.textContent = a, k.setAttribute("src", `/luci-static/resources/icons/${c ? "port_up.svg" : "port_down.svg"}`), z.textContent = c ? o?.link?.speed !== void 0 ? void 0 === (i = o.link.speed) || !Number.isFinite(i) || i <= 0 ? _("Unknown") : i >= 1000 ? `${i / 1000}\u{202F}GbE` : `${i}\u{202F}MbE` : _("Connected") : !1 === l ? _("Disconnected") : _("Unknown"), z.setAttribute("title", _("\u901F\u5EA6\uFF1A%s Mbit/s\uFF0C\u53CC\u5DE5\uFF1A%s").format(tl(o?.link?.speed), tl(o?.link?.duplex))), $.style.opacity = c ? "1" : "0.25", $.style.backgroundColor = c ? "rgb(46, 204, 113)" : "rgba(200, 200, 200, 0.4)", j.textContent = tl((n?.reserved_sn && void 0 === n.onu_id ? _("Reserved (offline)") : n?.link_state) ?? n?.status ?? (o ? l ? _("Link up") : _("Link down") : _("Unavailable"))), n?.reserved_sn && void 0 !== n.onu_id && (j.textContent += ` \xb7 ${_("Fixed interface")}`), O.textContent = tl(n?.onu_sn ?? d?.serial_number ?? n?.reserved_sn ?? n?.onu_id), B.title = n?.reserved_sn ? `${_("Reserved")}: ${n.reserved_sn}` : "", C.textContent = tl(o?.mac), S.textContent = c || p ? tc(p) : "\u2014", M.textContent = c || u ? tc(u) : "\u2014", P.textContent = tc(u), T.textContent = tu(s?.rx_packets), N.textContent = tu(s?.rx_multicast ?? s?.multicast), I.textContent = tu(s?.rx_errors), R.textContent = tu(s?.rx_dropped), A.textContent = tc(p), D.textContent = tu(s?.tx_packets), U.textContent = tu(s?.tx_errors), Z.textContent = tu(s?.tx_dropped);
                }
            };
        }), w = o("span", {
            class: "fttr-badge"
        }), x = o("span", {
            class: "fttr-badge fttr-badge-info"
        }), z = o("code", {
            style: "font-size:90%"
        }), k = o("span", {
            class: "fttr-badge fttr-badge-danger",
            style: "margin-left:.5em"
        }), s = {
            "data-provisioning-summary": "true",
            style: "display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%",
            children: [
                (i = {
                    children: [
                        o("strong", {
                            style: "margin-right:.4em",
                            children: [
                                _("Provisioning"),
                                ":"
                            ]
                        }),
                        w
                    ]
                }, o("span", i)),
                (n = {
                    children: [
                        o("span", {
                            style: "color:#888;margin-right:.3em",
                            children: [
                                _("Mode"),
                                ":"
                            ]
                        }),
                        x
                    ]
                }, o("span", n)),
                (a = {
                    children: [
                        o("span", {
                            style: "color:#888;margin-right:.3em",
                            children: [
                                _("Revision"),
                                ":"
                            ]
                        }),
                        z
                    ]
                }, o("span", a)),
                k
            ]
        }, $ = o("div", s), j = o("span", {
            class: "fttr-badge"
        }), O = o("span", {
            children: tl(b.model)
        }), C = o("span", {
            class: "fttr-badge"
        }), S = o("p", {
            role: "status"
        }), g = {
            class: "cbi-map fttr-overview",
            children: [
                o("style", {
                    children: `
				.fttr-overview {
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
					.fttr-overview {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .fttr-overview,
				[data-theme="dark"] .fttr-overview {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-danger-color: #e74c3c;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				${tC}

				.fttr-overview .fttr-ports-grid {
					display: grid;
					grid-template-columns: repeat(8, 100px);
					gap: 8px;
					margin-bottom: 1em;
					margin-inline: auto;
					width: fit-content;
					max-width: 100%;
				}

				@media (max-width: 1100px) {
					.fttr-overview .fttr-ports-grid {
						grid-template-columns: repeat(4, 100px);
					}
				}

				@media (max-width: 520px) {
					.fttr-overview .fttr-ports-grid {
						grid-template-columns: repeat(2, 100px);
					}
				}

				.fttr-overview .fttr-port-card {
					box-sizing: border-box;
					width: 100px;
					margin: 0;
					cursor: pointer;
					text-align: center;
					transition: opacity 0.2s, box-shadow 0.2s, transform 0.2s;
				}

				.fttr-overview .fttr-port-name {
					text-align: center;
				}

				.fttr-overview .fttr-port-identity {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.fttr-overview .fttr-port-identity > span {
					text-align: center;
				}

				.fttr-overview .fttr-port-stats {
					display: flex !important;
					flex-direction: column !important;
					align-items: center;
					font-size: 80%;
					line-height: 1.4;
					width: 100%;
					box-sizing: border-box;
				}

				.fttr-overview .fttr-port-stats > div {
					white-space: nowrap;
				}

				.fttr-overview .fttr-port-card.port-down {
					opacity: 0.65;
				}

				.fttr-overview .fttr-port-card.port-down:hover {
					opacity: 1 !important;
				}

				.fttr-overview .fttr-row-highlight {
					background-color: rgba(52, 152, 219, 0.12) !important;
					outline: 1px solid rgba(52, 152, 219, 0.4);
				}

				.fttr-overview .fttr-port-highlight {
					box-shadow: 0 0 0 2px #3498db !important;
					transform: translateY(-2px);
				}

				.fttr-overview table.table th {
					white-space: nowrap;
					padding: 0.5em 0.7em;
				}

				.fttr-overview table.table td {
					white-space: nowrap;
					padding: 0.5em 0.7em;
					vertical-align: middle;
				}
				`
                }),
                o("h2", {
                    children: _("FTTR overview")
                }),
                $,
                S,
                (p = {
                    class: "cbi-section",
                    children: [
                        o("h3", {
                            children: _("Controller")
                        }),
                        (u = {
                            class: "table",
                            children: (c = {
                                children: [
                                    (l = {
                                        children: [
                                            o("th", {
                                                style: "width:15%",
                                                children: _("FPGA status")
                                            }),
                                            o("td", {
                                                style: "width:35%",
                                                children: j
                                            }),
                                            o("th", {
                                                style: "width:15%",
                                                children: _("CDR lock")
                                            }),
                                            o("td", {
                                                style: "width:35%",
                                                children: C
                                            })
                                        ]
                                    }, o("tr", l)),
                                    (d = {
                                        children: [
                                            o("th", {
                                                children: _("Optical module")
                                            }),
                                            o("td", {
                                                colSpan: 3,
                                                children: O
                                            })
                                        ]
                                    }, o("tr", d))
                                ]
                            }, o("tbody", c))
                        }, o("table", u))
                    ]
                }, o("div", p)),
                (f = {
                    class: "cbi-section",
                    children: [
                        o("h3", {
                            children: _("Sub-gateways")
                        }),
                        v.element
                    ]
                }, o("div", f)),
                (h = {
                    class: "cbi-section",
                    children: [
                        o("h3", {
                            children: _("Downstream ports")
                        }),
                        o("div", {
                            class: "fttr-ports-grid",
                            children: y.map((e)=>e.element)
                        })
                    ]
                }, o("div", h))
            ]
        }, M = o("div", g), (P = (e, t)=>{
            m = t;
            let r = e.optical_transceiver, i = e.provisioning, n = e.onu_pinning;
            for (let a of (S.textContent = n ? [
                n.allocation_blocked ? _("ONU allocation blocked by invalid startup configuration.") : "",
                n.pending_restart ? _("Fixed interface changes pending FTTR restart.") : "",
                n.startup_error || n.config_error || ""
            ].filter(Boolean).join(" ") : "", S.hidden = !S.textContent, i ? (tf(w, i.enabled ? "success" : "neutral", i.enabled ? _("Enabled") : _("Disabled")), x.textContent = tl(i.mode), z.textContent = tl(i.revision), i.error ? (k.textContent = i.error, k.style.display = "") : k.style.display = "none", $.style.display = "") : $.textContent = _("Provisioning status unavailable"), "ready" === e.fpga_status ? tf(j, "success", _("Ready")) : e.fpga_status ? tf(j, "neutral", tl(e.fpga_status)) : tf(j, "none", "\u2014"), O.textContent = tl(r.model), null == r.cdr_locked ? tf(C, "none", _("Unknown")) : r.cdr_locked ? tf(C, "success", _("Locked")) : tf(C, "warning", _("Unlocked")), v.update(e.sub_gateways ?? [], e.onu_pinning), y))a.update(e, t);
        })(t, r), rs = (rl = {
            element: M,
            update: P
        }).element, ra.add(async ()=>{
            if (rd || !rs?.isConnected || !rl) return;
            let e = rl;
            rd = !0;
            try {
                let [t, r] = await Promise.all([
                    tI(),
                    tA().catch(()=>({}))
                ]);
                rl === e && e.element.isConnected && e.update(t, r);
            } catch (e) {
                console.error("Failed to refresh FTTR status", e);
            } finally{
                rd = !1;
            }
        }, 10), rs;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;