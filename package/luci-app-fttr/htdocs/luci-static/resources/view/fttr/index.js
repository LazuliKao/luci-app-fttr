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
function m(e, t, r) {
    Object.defineProperty(e, t, {
        value: r,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
}
function b(...e) {
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
function S(e) {
    return "string" == typeof e ? e : e?.message;
}
function C(e, t, r) {
    let i = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (i.message = S(e.inst?._zod.def?.error?.(e)) ?? S(t?.error?.(e)) ?? S(r.customError?.(e)) ?? S(r.localeError?.(e)) ?? "Invalid input"), delete i.inst, delete i.continue, t?.reportInput || delete i.input, i;
}
const M = (e, t)=>{
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
}, P = s("$ZodError", M), T = s("$ZodError", M, {
    Parent: Error
}), I = (t = T, (e, r, i, n)=>{
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
        let e = new (n?.Err ?? t)(o.issues.map((e)=>C(e, a, c())));
        throw v(e, n?.callee), e;
    }
    return o.value;
}), N = (r = T, async (e, t, i, n)=>{
    let a = i ? Object.assign(i, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (n?.Err ?? r)(o.issues.map((e)=>C(e, a, c())));
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
        error: new (i ?? P)(a.issues.map((e)=>C(e, n, c())))
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
        error: new n(a.issues.map((e)=>C(e, i, c())))
    } : {
        success: !0,
        data: a.value
    };
}), D = /^-?\d+(?:\.\d+)?$/, Z = /^(?:true|false)$/i, U = /^null$/i, B = {
    major: 4,
    minor: 3,
    patch: 6
}, q = s("$ZodType", (e, t)=>{
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
}), V = s("$ZodString", (e, t)=>{
    var r;
    let i;
    q.init(e, t), e._zod.pattern = [
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
}), F = s("$ZodNumber", (e, t)=>{
    q.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? D, e._zod.parse = (r, i)=>{
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
    q.init(e, t), e._zod.pattern = Z, e._zod.parse = (r, i)=>{
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
    q.init(e, t), e._zod.pattern = U, e._zod.values = new Set([
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
    q.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
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
    q.init(e, t), e._zod.parse = (r, i)=>{
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
    q.init(e, t);
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
        errors: e.map((e)=>e.issues.map((e)=>C(e, i, c())))
    }), t);
}
const ee = s("$ZodUnion", (e, t)=>{
    q.init(e, t), g(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), g(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), g(e._zod, "values", ()=>{
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
    q.init(e, t), e._zod.parse = (r, i)=>{
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
                    issues: s.issues.map((e)=>C(e, i, c())),
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
    q.init(e, t);
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
    if (q.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
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
    q.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
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
    q.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)}|null)$`) : void 0;
    }), g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), el = s("$ZodCatch", (e, t)=>{
    q.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let i = t.innerType._zod.run(e, r);
        return i instanceof Promise ? i.then((i)=>(e.value = i.value, i.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: i.issues.map((e)=>C(e, r, c()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = i.value, i.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: i.issues.map((e)=>C(e, r, c()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ed = s("$ZodLazy", (e, t)=>{
    q.init(e, t), g(e._zod, "innerType", ()=>t.getter()), g(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), g(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), g(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), g(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
    q.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>I(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>R(e, t, r), e.parseAsync = async (t, r)=>N(e, t, r, {
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
}), ep = s("ZodMiniString", (e, t)=>{
    V.init(e, t), ec.init(e, t);
});
function eu(e) {
    return new ep({
        type: "string",
        ...$(e)
    });
}
const ef = s("ZodMiniNumber", (e, t)=>{
    F.init(e, t), ec.init(e, t);
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
const em = s("ZodMiniNull", (e, t)=>{
    J.init(e, t), ec.init(e, t);
}), eb = s("ZodMiniNever", (e, t)=>{
    K.init(e, t), ec.init(e, t);
});
function ev(e) {
    return new eb({
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
const eS = s("ZodMiniRecord", (e, t)=>{
    er.init(e, t), ec.init(e, t);
});
function eC(e, t, r) {
    return new eS({
        type: "record",
        keyType: e,
        valueType: t,
        ...$(r)
    });
}
const eE = s("ZodMiniEnum", (e, t)=>{
    ei.init(e, t), ec.init(e, t), e.options = Object.values(t.entries);
});
function eM(e, t) {
    return new eE({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...$(t)
    });
}
const eP = s("ZodMiniLiteral", (e, t)=>{
    en.init(e, t), ec.init(e, t);
});
function eT(e, t) {
    return new eP({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...$(t)
    });
}
const eL = s("ZodMiniOptional", (e, t)=>{
    eo.init(e, t), ec.init(e, t);
});
function eI(e) {
    return new eL({
        type: "optional",
        innerType: e
    });
}
const eN = s("ZodMiniNullable", (e, t)=>{
    es.init(e, t), ec.init(e, t);
});
function eR(e) {
    return new eN({
        type: "nullable",
        innerType: e
    });
}
const eA = s("ZodMiniCatch", (e, t)=>{
    el.init(e, t), ec.init(e, t);
}), eD = s("ZodMiniLazy", (e, t)=>{
    ed.init(e, t), ec.init(e, t);
});
function eZ() {
    let e = new eD({
        type: "lazy",
        getter: ()=>e$([
                eu(),
                e_(),
                eg(),
                new em({
                    type: "null",
                    ...$(void 0)
                }),
                ew(e),
                eC(eu(), e)
            ])
    });
    return e;
}
let eU = ez({
    error: e$([
        eu(),
        ez({
            code: eu(),
            message: eu()
        })
    ])
});
class eB extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eq(e) {
    let t = eU.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eB("rpc", e) : new eB(e.code, e.message);
    }
    return e;
}
const eV = ez({
    status: eT("pending"),
    job: eu()
});
eO("status", [
    ez({
        status: eT("pending")
    }),
    ez({
        status: eT("ready"),
        chunk: e_(),
        chunks: e_(),
        bytes: e_(),
        data: eu()
    })
]);
let eF = eu(), eW = e_(), eJ = eg(), eK = eI(eF), eG = eI(eW), eX = eI(eJ);
const eH = eM([
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
]), eQ = eM([
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
    name: eI(eR(eF)),
    kind: eM([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eF,
    state: eF,
    reason: eK,
    revision: eK,
    current_revision: eX,
    management_fresh: eX,
    operation_id: eG,
    task_id: eI(eR(eW)),
    updated_at: eG,
    changes: eI(ew(ez({
        name: eF,
        desired: eF
    })))
});
let e0 = ez({
    state: eF,
    reason: eK,
    task_id: eI(eR(eW)),
    instance: eG
});
const e1 = ez({
    cwmp_id: eF,
    state: eM([
        "online",
        "waiting_inform",
        "offline_or_stale"
    ]),
    optical_online: eJ,
    last_inform: eR(eW),
    age_seconds: eR(eW)
});
let e2 = ez({
    state: eM([
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
    method: eK,
    reason: eK,
    mqtt_target: eR(eF),
    binding_source: eK,
    link_identity_error: eR(eF),
    mqtt_last_seen: eR(eW),
    cwmp_id: eK,
    desired_version: eK,
    generation: eG,
    inflight: eX,
    attempts: eG,
    next_retry_at: eG,
    updated_at: eG,
    settings_verified_at: eR(eW),
    last_inform: eR(eW),
    last_error: eI(eR(eF)),
    persistence_error: eI(eR(eF)),
    desired: eI(eR(ez({
        vlan: eW,
        vlans: ew(eW),
        priority: eW,
        acs_url: eF
    }))),
    listener: eI(ez({
        enabled: eJ,
        listen: eF,
        path: eF,
        error: eR(eF)
    })),
    endpoint_notice: eK,
    manual_steps: eI(ew(eF))
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
        let i = b(e._zod.def, {
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
        let i = b(e._zod.def, {
            get shape () {
                let r = e._zod.def.shape, i = {
                    ...r
                };
                if (t) for(let e in t){
                    if (!(e in r)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (i[e] = eL ? new eL({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)i[e] = eL ? new eL({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return m(this, "shape", i), i;
            },
            checks: []
        });
        return k(e, i);
    }(e2), {
        state: eM([
            "pending",
            "unavailable"
        ]),
        reason: eF
    })
]), e4 = ez({
    state: eH,
    operation_id: eG,
    device: eK,
    optical_sn: eK,
    cwmp_id: eK,
    revision: eK,
    mode: eI(eM([
        "apply",
        "plan"
    ])),
    started_at: eG,
    current_revision: eX,
    management_fresh: eX,
    reason: eK,
    error: eK,
    attempts: eG,
    next_retry_at: eG,
    reconcile_reason: eK,
    items: ew(eY),
    cwmp_contract: eI(ez({
        state: eF,
        requested: eF,
        contract: eR(eF),
        reason: eF,
        cache_hit: eJ,
        schema: eF,
        capabilities: eR(ez({
            wan: eF,
            wlan: eF,
            binding: eF
        }))
    })),
    wan_objects: eI(eC(eF, eZ())),
    wan_lifecycle: eI(eC(eF, e0)),
    wan_stage: eI(eM([
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
    wifi_objects: eI(ez({
        owned: ew(eW),
        pending: eR(eF),
        pending_instance: eR(eW)
    })),
    wifi_lifecycle: eI(eC(eF, e0)),
    wifi_stage: eI(eM([
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
    wifi_cleanup: eI(eM([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e3 = ez({
    enabled: eJ,
    mode: eM([
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
}), e8 = ez({
    state: eM([
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
    desired: eR(e3),
    applied: eR(e3),
    previous: eR(e3),
    plan: ew(ez({
        operation: eF,
        key: eF,
        value: ew(eF)
    }))
});
const e6 = ez({
    device: eF,
    name: eR(eF),
    group: eR(eF),
    group_name: eR(eF),
    template: eR(eF),
    template_name: eR(eF),
    optical_sn: eF,
    adapter: eF,
    omci_management: ez({
        state: eF,
        reason: eK
    }),
    management: eR(e1),
    acs_bootstrap: e5,
    provisioning: e4,
    services: ew(eY),
    ssids: ew(eY),
    wifi_sync: eQ
}), e7 = ez({
    enabled: eJ,
    mode: eM([
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
    error: eR(eF),
    devices: ew(e6),
    management_network: e8,
    omci_management: eZ(),
    groups: ew(ez({
        id: eF,
        name: eR(eF),
        template: eF
    })),
    pending_devices: ew(eF)
});
e$([
    ez({
        valid: eT(!0),
        revision: eF,
        devices: eW,
        error: eI(ev())
    }),
    ez({
        error: eF,
        valid: eI(ev()),
        revision: eI(ev()),
        devices: eI(ev())
    })
]);
let e9 = eu(), te = e_(), tt = eR(te), tr = eC(e9, ez({
    source: e9,
    unit: e9,
    reason: eR(e9),
    raw: eR(e9),
    age_seconds: tt
}));
const ti = ez({
    phase: eM([
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
}), tn = eM([
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
    cdr_locked: eR(eg()),
    measurements: tr
}), to = ez({
    equipment_id: eR(e9),
    hardware_version: eR(e9),
    software_images: ew(e9),
    omcc_version: tt,
    errors: ew(e9)
});
const ts = ez({
    onu_id: te,
    vendor: e9,
    model: e9,
    serial_number: e9,
    state: tn,
    business_status: ti,
    management: eR(e1),
    provisioning: eR(e4),
    services: ew(eY),
    ssids: ew(eY),
    wifi_sync: eQ,
    acs_bootstrap: eI(e5),
    identity: eR(to),
    identity_age_seconds: tt,
    identity_current: eg(),
    fiber_distance_m: tt,
    ranging_delay_rtd_ns: tt,
    equalization_delay_bits: new eA({
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
        gem_ports: eR(ew(te)),
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
        bandwidth_5g: eR(e9),
        tx_power_pct: tt,
        measurements: tr
    }),
    connected_clients: eR(ew(ez({
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
    carrier: eg(),
    status: e9,
    onu_id: eI(te),
    onu_sn: eI(e9),
    link_state: e9
});
const td = ez({
    fpga_status: e9,
    provisioning: eR(e7),
    optical_transceiver: ta,
    switch_ports: ew(tl),
    sub_gateways: ew(ts),
    telemetry_gateways: ew(ez({
        id: e9,
        last_seen_sec_ago: te,
        last_payload_bytes: te
    }))
}), tc = eC(e9, ez({
    carrier: eI(eg()),
    mac: eI(e9),
    link: eI(ez({
        speed: eI(te),
        duplex: eI(e9),
        autoneg: eI(eg())
    })),
    stats: eI(eC(e9, te))
})), tp = {
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
    return `${_(tp[e.phase])} \xb7 ${e.generation}${e.error ? ` \xb7 ${e.error}` : ""}`;
}
let tf = L.rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: !0
}), t_ = (L.rpc.declare({
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
const th = async ()=>td.parse(eq(await tf())), tg = async ()=>tc.parse(eq(await t_()));
e$([
    ez({
        operation_ids: ew(e_()),
        revision: eu()
    }),
    ez({
        started: eT(!0),
        mode: eM([
            "apply",
            "plan"
        ])
    }),
    ez({
        reset: eT(!0),
        device: eu()
    }),
    ez({
        operation_ids: ew(e_()),
        mode: eM([
            "apply",
            "plan"
        ]),
        reconcile: eI(eg()),
        retry: eI(eg())
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
    source: eM([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: eu(),
    size: e_(),
    sha256: eu(),
    data: eI(eu()),
    factory: ez({
        detected: eg(),
        device: eu(),
        has_data: eg(),
        sha256: eu(),
        data: eu()
    }),
    firmware: ez({
        exists: eg(),
        path: eu(),
        size: e_(),
        sha256: eu(),
        data: eu()
    }),
    error: eI(eu())
}), ez({
    success: eg(),
    path: eu(),
    size: e_(),
    sha256: eu(),
    error: eI(eu())
}), ez({
    success: eg(),
    output: eI(eu()),
    error: eI(eu())
});
let tm = eu(), tb = e_(), tv = eg(), ty = ez({
    id: tm,
    url: tm
}), tw = ez({
    name: tm,
    kind: eM([
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
    read: tv,
    write: tv,
    set_by_create: tv,
    avc: tv,
    optional: tv,
    deprecated: tv,
    default_hex: eR(tm),
    reference: ty
}), tx = eO("type", [
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
        value: tm
    }),
    ez({
        type: eT("text"),
        value: eR(tm)
    }),
    ez({
        type: eT("octets"),
        hex: tm
    }),
    ez({
        type: eT("table_length"),
        bytes: tb
    })
]), tz = ez({
    code: tm,
    message: tm,
    offset: tb,
    mask: tb
}), tk = eM([
    "layout",
    "name_only",
    "unknown"
]), t$ = ez({
    raw_hex: tm,
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
    delete_entry: tv
}), tj = ez({
    schema_version: eT(1),
    reference_version: tm,
    onu_id: eR(tb),
    uploaded_complete: tv,
    expected_records: tb,
    received_records: tb,
    decoded_records: tb,
    partial_records: tb,
    basic_records: tb,
    tables_requested: tv,
    tables_collected: tv,
    classes: ew(ez({
        class_id: tb,
        name: eR(tm),
        entities: tb,
        records: tb,
        support: tk
    })),
    entities: ew(ez({
        class_id: tb,
        entity_id: tb,
        name: eR(tm),
        support: tk,
        reference: eR(ty),
        sequences: ew(tb),
        attributes: ew(ez({
            definition: tw,
            value: eR(tx),
            observations: ew(ez({
                raw_hex: tm,
                value: tx,
                sequences: ew(tb)
            }))
        })),
        diagnostics: ew(tz)
    })),
    records: ew(ez({
        class_id: tb,
        entity_id: tb,
        sequence: tb,
        attribute_mask: tb,
        raw_hex: tm,
        consumed: tb,
        remaining_hex: tm,
        undecoded_mask: tb
    })),
    tables: ew(ez({
        class_id: tb,
        entity_id: tb,
        attribute: tw,
        collected: tv,
        error: eR(tm),
        raw_hex: tm,
        rows: ew(tm),
        vlan_rules: ew(t$)
    })),
    diagnostics: ew(tz)
});
const tO = ez({
    status: eT("ready"),
    report: tj
});
let tS = ez({
    phase: eM([
        "starting",
        "upload",
        "tables"
    ]),
    received: tb,
    expected: eR(tb)
}), tC = eO("status", [
    ez({
        status: eT("pending"),
        progress: eI(tS)
    }),
    ez({
        status: eT("ready"),
        chunk: tb,
        chunks: tb,
        bytes: tb,
        data: tm
    })
]), tE = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_start",
    params: [
        "onu_id",
        "optical_sn",
        "tables"
    ],
    reject: !0
}), tM = L.rpc.declare({
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
const tT = async (e, t, r)=>eV.parse(eq(await tE(e, t, r))), tL = async (e, t)=>tC.parse(eq(await tM(e, t))), tI = async (e)=>ez({
        released: tv
    }).parse(eq(await tP(e)));
let tN = (e)=>null == e || "" === e ? "\u2014" : String(e), tR = (e)=>JSON.stringify(e, null, 2);
async function tA(e) {
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
function tD(e) {
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
let tZ = L.view, tU = L.Poll;
function tB(e) {
    return _(e) || e;
}
let tq = (e)=>null == e || "" === e ? "\u2014" : String(e);
function tV(e, t, r, i) {
    e.textContent = r, "none" === t ? e.className = "" : e.className = `fttr-badge fttr-badge-${t}`, i ? e.setAttribute("title", i) : e.removeAttribute("title");
}
function tF(e) {
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
function tW(e) {
    return void 0 === e || !Number.isFinite(e) || e < 0 ? "\u2014" : e < 1000 ? `${e} ${tB("Received packets").includes("\u5305") ? "\u5305" : "Pkts."}` : `${(e / 1000).toFixed(2)} K${tB("Received packets").includes("\u5305") ? "\u5305" : "Pkts."}`;
}
let tJ = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
}, tK = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
}, tG = {
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
    failed: _("Failed"),
    error: _("Error"),
    blocked: _("Blocked"),
    not_started: _("Not started")
}, tX = {
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
function tH(e) {
    var t, r, i;
    let n = e, a = o("span", {}), s = o("span", {}), l = o("span", {}), d = o("code", {
        style: "font-size:90%"
    }), c = o("span", {
        class: "fttr-badge"
    }), p = o("span", {
        class: "fttr-badge"
    }), u = o("span", {
        style: "font-size:90%"
    }), f = o("code", {
        style: "font-size:90%"
    }), h = o("span", {
        class: "fttr-badge"
    }), g = o("span", {
        class: "fttr-badge"
    }), m = o("span", {
        class: "fttr-badge"
    }), b = (i = {
        "data-fttr-onu-id": String(e.onu_id),
        children: [
            o("td", {
                children: a
            }),
            o("td", {
                children: s
            }),
            o("td", {
                children: l
            }),
            o("td", {
                children: d
            }),
            o("td", {
                children: c
            }),
            o("td", {
                children: p
            }),
            o("td", {
                children: u
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
                children: m
            }),
            (r = {
                style: "text-align:right",
                children: (t = {
                    type: "button",
                    class: "cbi-button cbi-button-neutral",
                    onclick: ()=>(function(e) {
                            var t, r, i, n, a, s, l, d, c, p, u, f;
                            let h = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "basic", g = !1, m = !1, b = null, v = null, y = (r = {
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
                                                tu(e.business_status)
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
                                                null === (t = e.equalization_delay_bits) ? "\u2014" : `${t} bits`
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
                                                                    children: tN(i)
                                                                })
                                                            ]
                                                        }, o("tr", t);
                                                    })
                                                }, o("tbody", t))
                                            }, o("table", r))
                                        ]
                                    }, o("div", i);
                                })
                            }, o("div", r)), w = (i = {
                                class: "mib-status-bar",
                                role: "status",
                                children: o("span", {
                                    class: "mib-hint-text",
                                    children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                                })
                            }, o("div", i)), x = (n = {
                                class: "cbi-progressbar",
                                style: "display:none;width:100%",
                                title: "0%",
                                children: o("div", {
                                    style: "width:0%"
                                })
                            }, o("div", n)), z = o("div", {}), k = o("pre", {
                                class: "onu-raw-pre"
                            }), $ = o("span", {
                                class: "download-status",
                                role: "status"
                            }), j = null, O = o("button", {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                disabled: !0,
                                onclick: async ()=>{
                                    if (b && !g) {
                                        O.disabled = !0, $.textContent = _("Preparing JSON download\u2026");
                                        try {
                                            let t = await tA(b);
                                            if (g) return;
                                            j && URL.revokeObjectURL(j), j = URL.createObjectURL(t);
                                            let r = document.createElement("a");
                                            r.href = j, r.download = `mib-${e.serial_number}.json`, r.click(), $.textContent = _("JSON download started"), window.setTimeout(()=>{
                                                URL.revokeObjectURL(r.href), j === r.href && (j = null);
                                            }, 1000);
                                        } catch (e) {
                                            $.textContent = String(e);
                                        } finally{
                                            O.disabled = !b || g;
                                        }
                                    }
                                },
                                children: _("Download JSON")
                            }), S = (s = {
                                class: "onu-raw-panel",
                                children: [
                                    (a = {
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
                                                    $
                                                ]
                                            })
                                        ]
                                    }, o("div", a)),
                                    k
                                ]
                            }, o("div", s)), C = o("button", {
                                type: "button",
                                class: "cbi-button cbi-button-apply",
                                onclick: ()=>U(!1),
                                children: _("Read MIB")
                            }), M = o("button", {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                onclick: ()=>U(!0),
                                children: _("Read MIB and VLAN tables")
                            }), P = (c = {
                                class: "onu-mib-panel",
                                children: [
                                    (d = {
                                        class: "mib-controls",
                                        children: [
                                            (l = {
                                                class: "mib-action-group",
                                                children: [
                                                    C,
                                                    M,
                                                    o("small", {
                                                        class: "mib-action-hint",
                                                        children: _("Collecting VLAN tables queries extended filter tables and takes longer.")
                                                    })
                                                ]
                                            }, o("div", l)),
                                            w,
                                            x
                                        ]
                                    }, o("div", d)),
                                    z
                                ]
                            }, o("div", c)), T = {
                                basic: y,
                                mib: P,
                                raw: S
                            }, I = new Map();
                            function N(e) {
                                for (let [t, r] of Object.entries(T))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                                for (let [t, r] of I)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
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
                                        children: o("a", {
                                            href: `#tab-${e.id}`,
                                            onclick: (t)=>{
                                                t.preventDefault(), N(e.id);
                                            },
                                            children: e.label
                                        })
                                    }, o("li", t));
                                    return I.set(e.id, r), r;
                                })
                            }, o("ul", p)), A = o("div", {
                                class: "onu-details-header",
                                children: R
                            }), D = (f = {
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
                                    A,
                                    y,
                                    P,
                                    S,
                                    (u = {
                                        class: "right onu-details-footer",
                                        children: o("button", {
                                            type: "button",
                                            class: "cbi-button",
                                            onclick: ()=>{
                                                g = !0, j && URL.revokeObjectURL(j), j = null, b = null, k.textContent = "", z.replaceChildren(), L.ui.hideModal();
                                            },
                                            children: _("Close")
                                        })
                                    }, o("div", u))
                                ]
                            }, o("div", f)), Z = ()=>!g && D.isConnected && D.getClientRects().length > 0;
                            async function U(t) {
                                if (!m) {
                                    m = !0, C.disabled = M.disabled = !0, x.style.display = "", x.title = "0%", x.firstElementChild.style.width = "0%", w.textContent = _("Reading MIB\u2026");
                                    try {
                                        let m = await th(), $ = m.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                        if ($?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                        if (!Z()) return;
                                        let j = await tT($.onu_id, $.serial_number, t);
                                        v = j.job;
                                        let S = Date.now() + 140000;
                                        for(; Z();){
                                            let e = await tL(j.job, 0);
                                            if (!Z()) return;
                                            if ("ready" === e.status) {
                                                var r, i, n, a, s, l, d, c, p, u, f, h, g, y;
                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                let t = new Uint8Array(e.bytes), m = 0;
                                                for(let r = 0; r < e.chunks; r++){
                                                    let i = 0 === r ? e : await tL(j.job, r);
                                                    if (!Z()) return;
                                                    if ("ready" !== i.status || i.chunk !== r || i.chunks !== e.chunks || i.bytes !== e.bytes || !i.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                    let n = atob(i.data);
                                                    if (n.length > 32768 || m + n.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                    for(let e = 0; e < n.length; e++)t[m++] = n.charCodeAt(e);
                                                    let a = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                                    x.title = `${a}%`, x.firstElementChild.style.width = `${a}%`, w.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                                }
                                                if (m !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                if (await B(), b = tO.parse(eq(JSON.parse(new TextDecoder("utf-8", {
                                                    fatal: !0
                                                }).decode(t)))).report, 1 !== b.schema_version || b.onu_id !== $.onu_id) throw Error(_("Unexpected MIB response"));
                                                x.style.display = "none", w.replaceChildren((r = b, f = {
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
                                                        (p = {
                                                            class: "mib-chip",
                                                            children: r.tables_collected ? _("VLAN tables collected") : _("VLAN tables not collected")
                                                        }, o("span", p)),
                                                        (u = {
                                                            class: "mib-chip mib-chip-subtle",
                                                            children: new Date().toLocaleTimeString()
                                                        }, o("span", u))
                                                    ]
                                                }, o("div", f))), z.replaceChildren(function(e) {
                                                    var t, r, i, n, a, s;
                                                    let l = e.classes.length ? e.classes[0].class_id : null, d = (t = {
                                                        class: "mib-content"
                                                    }, o("div", t)), c = (r = {
                                                        type: "search",
                                                        class: "cbi-input-text mib-search-input",
                                                        placeholder: _("Search ME name or Class ID\u2026")
                                                    }, o("input", r)), p = (i = {
                                                        class: "mib-class-list"
                                                    }, o("div", i)), u = new Map();
                                                    function f(t) {
                                                        var r, i;
                                                        for (let [e, r] of (l = t, u))e === t ? r.classList.add("active") : r.classList.remove("active");
                                                        let n = e.entities.filter((e)=>e.class_id === t);
                                                        n.length ? d.replaceChildren(...n.map((r, i)=>{
                                                            var n, a, s, l, d, c, p, u, f, h, g, m, b, v, y, w, x, z, k;
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
                                                                                        children: tN(r.name)
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
                                                                            r.attributes.length ? (b = {
                                                                                class: "table mib-attributes-table",
                                                                                children: [
                                                                                    (g = {
                                                                                        children: (h = {
                                                                                            children: [
                                                                                                (c = {
                                                                                                    style: "width:28%",
                                                                                                    children: _("Attribute")
                                                                                                }, o("th", c)),
                                                                                                (p = {
                                                                                                    style: "width:14%",
                                                                                                    children: _("Type")
                                                                                                }, o("th", p)),
                                                                                                (u = {
                                                                                                    children: _("Value")
                                                                                                }, o("th", u)),
                                                                                                (f = {
                                                                                                    style: "width:18%",
                                                                                                    children: _("Definition")
                                                                                                }, o("th", f))
                                                                                            ]
                                                                                        }, o("tr", h))
                                                                                    }, o("thead", g)),
                                                                                    (m = {
                                                                                        children: r.attributes.map((e)=>{
                                                                                            var t, r, i, n, a, s, l, d, c, p;
                                                                                            return p = {
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
                                                                                                                            return tN(e.value);
                                                                                                                        case "octets":
                                                                                                                            return tN(e.hex);
                                                                                                                        case "table_length":
                                                                                                                            return tN(e.bytes);
                                                                                                                        default:
                                                                                                                            throw new eB("unexpected_variant", `Unexpected variant: ${String(e)}`);
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
                                                                                                                        children: tR(e.observations)
                                                                                                                    }, o("pre", s))
                                                                                                                ]
                                                                                                            }, o("details", l)) : null
                                                                                                        ]
                                                                                                    }, o("td", d)),
                                                                                                    (c = {
                                                                                                        class: "mib-attr-ref",
                                                                                                        children: tD(e.definition)
                                                                                                    }, o("td", c))
                                                                                                ]
                                                                                            }, o("tr", p);
                                                                                        })
                                                                                    }, o("tbody", m))
                                                                                ]
                                                                            }, o("table", b)) : (v = {
                                                                                children: _("Basic display only; raw records are preserved.")
                                                                            }, o("p", v)),
                                                                            e.tables.filter((e)=>e.class_id === t && e.entity_id === r.entity_id).map((e)=>{
                                                                                var t, r, i, n, a, s, l, d, c, p, u, f, h, g, m, b;
                                                                                return b = {
                                                                                    class: "mib-table-details",
                                                                                    children: [
                                                                                        (t = {
                                                                                            children: [
                                                                                                e.attribute.name,
                                                                                                " \xb7",
                                                                                                " ",
                                                                                                e.collected ? `${e.rows.length} ${_("rows")}` : tN(e.error)
                                                                                            ]
                                                                                        }, o("summary", t)),
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
                                                                                                    }, o("thead", p)),
                                                                                                    (u = {
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
                                                                                                                        children: tN(e.filter_ethertype)
                                                                                                                    }, o("td", i)),
                                                                                                                    (n = {
                                                                                                                        children: tN(e.tags_to_remove)
                                                                                                                    }, o("td", n)),
                                                                                                                    (a = {
                                                                                                                        children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                                    }, o("td", a)),
                                                                                                                    (s = {
                                                                                                                        children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                                    }, o("td", s)),
                                                                                                                    (l = {
                                                                                                                        children: tN(e.delete_entry)
                                                                                                                    }, o("td", l))
                                                                                                                ]
                                                                                                            }, o("tr", d);
                                                                                                        })
                                                                                                    }, o("tbody", u))
                                                                                                ]
                                                                                            }, o("table", f))
                                                                                        }, o("div", h)) : null,
                                                                                        (g = {
                                                                                            style: "margin-top:6px",
                                                                                            children: [
                                                                                                _("G.988 encoded field values"),
                                                                                                ": ",
                                                                                                tD(e.attribute)
                                                                                            ]
                                                                                        }, o("p", g)),
                                                                                        (m = {
                                                                                            class: "mib-pre",
                                                                                            children: tR(e.vlan_rules.length ? e.vlan_rules : e.rows)
                                                                                        }, o("pre", m))
                                                                                    ]
                                                                                }, o("details", b);
                                                                            }),
                                                                            (x = {
                                                                                class: "mib-diag-details",
                                                                                children: [
                                                                                    (y = {
                                                                                        children: _("Records / diagnostics")
                                                                                    }, o("summary", y)),
                                                                                    (w = {
                                                                                        class: "mib-pre",
                                                                                        children: tR({
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
                                                            return u.set(e.class_id, a), a;
                                                        })) : p.replaceChildren((t = {
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
                                                                    p
                                                                ]
                                                            }, o("div", a)),
                                                            d
                                                        ]
                                                    }, o("div", s);
                                                }(b), (y = {
                                                    class: "mib-upload-diagnostics",
                                                    children: [
                                                        (h = {
                                                            children: _("Upload diagnostics")
                                                        }, o("summary", h)),
                                                        (g = {
                                                            class: "mib-pre",
                                                            children: tR(b.diagnostics)
                                                        }, o("pre", g))
                                                    ]
                                                }, o("details", y))), i = b, k.textContent = tR({
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
                                            if (Date.now() >= S) throw Error(_("MIB query timed out; retry."));
                                            await new Promise((e)=>setTimeout(e, 1000));
                                        }
                                    } catch (e) {
                                        Z() && (x.style.display = "none", w.replaceChildren(o("span", {
                                            class: "mib-error-text",
                                            children: [
                                                String(e),
                                                b ? ` \xb7 ${_("Previous snapshot retained")}` : ""
                                            ]
                                        })));
                                    } finally{
                                        await B(), m = !1, C.disabled = M.disabled = !1;
                                    }
                                }
                            }
                            async function B() {
                                if (!v) return;
                                let e = v;
                                v = null;
                                try {
                                    await tI(e);
                                } catch (e) {
                                    console.warn("Failed to release MIB snapshot", e);
                                }
                            }
                            N(h), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, D, "modal-wide");
                        })(n),
                    children: tB("Details")
                }, o("button", t))
            }, o("td", r))
        ]
    }, o("tr", i));
    b.addEventListener("mouseenter", ()=>{
        let e = n.data_path?.interface;
        if (e) {
            let t = e.match(/fttr(\d+)/);
            if (t) {
                let e = document.querySelector(`[data-fttr-port="${t[1]}"]`);
                e?.classList.add("fttr-port-highlight");
            }
        }
    }), b.addEventListener("mouseleave", ()=>{
        document.querySelectorAll(".fttr-port-highlight").forEach((e)=>{
            e.classList.remove("fttr-port-highlight");
        });
    });
    let v = {
        element: b,
        update (e) {
            var t, r;
            let i, o, v, y, w, x;
            n = e, b.setAttribute("data-fttr-onu-id", String(e.onu_id)), a.textContent = String(e.onu_id), s.textContent = tq(e.vendor), l.textContent = tq(e.identity?.equipment_id ?? e.model), d.textContent = tq(e.serial_number), "o5_operation" === e.state ? tV(c, "success", tB(tJ.o5_operation), e.state) : e.state ? tV(c, "warning", tB(tJ[e.state] ?? e.state)) : tV(c, "none", "\u2014");
            let z = e.business_status;
            tV(p, "verified" === z.phase ? "success" : z.error || "wan_bootstrap_pending" === z.phase ? "warning" : "neutral", tu(z));
            let k = function(e) {
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
            u.textContent = k.display, k.full ? u.setAttribute("title", k.full) : u.removeAttribute("title"), f.textContent = tq(e.data_path?.interface), t = e.management, i = t?.state, o = function(e) {
                if (null == e || e < 0) return null;
                if (e < 60) return tB(1 === e ? "%d second ago" : "%d seconds ago").replace("%d", String(e));
                let t = Math.floor(e / 60);
                if (t < 60) return tB(1 === t ? "%d minute ago" : "%d minutes ago").replace("%d", String(t));
                let r = Math.floor(e / 3600);
                if (r < 24) return tB(1 === r ? "%d hour ago" : "%d hours ago").replace("%d", String(r));
                let i = Math.floor(e / 86400);
                return tB(1 === i ? "%d day ago" : "%d days ago").replace("%d", String(i));
            }(t?.age_seconds ?? (t?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - t.last_inform) : null)), y = (v = t?.last_inform ? new Date(1000 * t.last_inform).toLocaleString() : null) ? tB("Last Inform: %s").replace("%s", v) : void 0, w = "\u2014", x = "none", "online" === i ? (x = "success", w = tB(tK.online)) : "waiting_inform" === i ? (x = "warning", w = tB(tK.waiting_inform)) : "offline_or_stale" === i ? (x = "danger", w = tB(tK.offline_or_stale)) : i && (x = "neutral", w = tq(i)), tV(h, x, o && i ? `${w} \xb7 ${o}` : w, y);
            let $ = e.provisioning?.state, j = e.provisioning, O = j?.next_retry_at && j.next_retry_at > Math.floor(Date.now() / 1000) ? j.next_retry_at - Math.floor(Date.now() / 1000) : 0, S = j?.current_revision === !1 ? tB("Previous configuration") : j?.management_fresh === !1 ? tB("Management stale") : j?.reconcile_reason ? tB(j.reconcile_reason) : O > 0 ? tB("Next self-healing retry in %d seconds").replace("%d", String(O)) : j?.reason ?? j?.error;
            $ && "not_started" !== $ ? "completed" === $ || "verified" === $ ? tV(g, "success", "completed" === $ ? tB(tG.completed) : tB("Ready"), S) : "wan_reconciling" === $ || "wan_verifying" === $ || "wifi_reconciling" === $ || "discovering" === $ || "reading" === $ || "disabling" === $ || "disabling_read" === $ || "writing" === $ || "verifying" === $ || "settling" === $ || "recovering" === $ || "waiting_task" === $ ? tV(g, "info", tB(tG[$] ?? $), S) : "interrupted" === $ || "failed" === $ || "error" === $ || "blocked" === $ ? tV(g, "danger", tB("blocked" === $ ? tG.blocked : tG.interrupted), S) : "waiting" === $ || "pending" === $ || "waiting_management" === $ ? tV(g, "warning", tB(tG[$] ?? tG.waiting), S) : tV(g, "neutral", tq($), S) : tV(g, "neutral", tB(tG.not_started), S), (r = e.wifi_sync) && "not_configured" !== r ? "verified" === r ? tV(m, "success", tB(tX.verified)) : "attention_required" === r ? tV(m, "danger", tB(tX.attention_required)) : "stale_revision" === r || "stale_management" === r || "waiting_management" === r ? tV(m, "warning", tB(tX[r])) : "recovering" === r ? tV(m, "info", tB(tX.recovering)) : "accepted_unverified" === r || "pending" === r ? tV(m, "warning", tB(tX[r])) : tV(m, "neutral", tq(r)) : tV(m, "neutral", tB(tX.not_configured));
        }
    };
    return v.update(e), v;
}
let tQ = null, tY = null, t0 = !1;
const main = tZ.extend({
    async load () {
        let [e, t] = await Promise.all([
            th(),
            tg().catch((e)=>(console.warn("Failed to load network device details", e), {}))
        ]);
        return {
            status: e,
            devices: t
        };
    },
    render (e) {
        var t, r, i, n, a, s, l, d, c, p, u, f, h, g;
        let m, b, v, y, w, x, z, k, $, j, O, S, C;
        return t = e.status, r = e.devices, m = t.optical_transceiver ?? {}, b = function(e) {
            var t, r, i, n, a;
            let s = new Map();
            for (let t of e)s.set(t.onu_id, tH(t));
            let l = (t = {
                children: o("td", {
                    colSpan: 12,
                    children: tB("No registered sub-gateways.")
                })
            }, o("tr", t)), d = 0 === e.length, c = o("tbody", {
                children: d ? l : [
                    ...s.values()
                ].map((e)=>e.element)
            });
            return {
                element: (a = {
                    class: "table-wrapper",
                    children: (n = {
                        class: "table",
                        children: [
                            (i = {
                                children: (r = {
                                    children: [
                                        o("th", {
                                            children: tB("ONU ID")
                                        }),
                                        o("th", {
                                            children: tB("Vendor")
                                        }),
                                        o("th", {
                                            children: tB("Model")
                                        }),
                                        o("th", {
                                            children: tB("Optical serial")
                                        }),
                                        o("th", {
                                            children: tB("Registration")
                                        }),
                                        o("th", {
                                            children: tB("Business")
                                        }),
                                        o("th", {
                                            children: tB("Firmware")
                                        }),
                                        o("th", {
                                            children: tB("Data interface")
                                        }),
                                        o("th", {
                                            children: tB("CWMP")
                                        }),
                                        o("th", {
                                            children: tB("Synchronization")
                                        }),
                                        o("th", {
                                            children: tB("Wi-Fi sync")
                                        }),
                                        o("th", {
                                            style: "text-align:right",
                                            children: tB("Details")
                                        })
                                    ]
                                }, o("tr", r))
                            }, o("thead", i)),
                            c
                        ]
                    }, o("table", n))
                }, o("div", a)),
                update (e) {
                    let t = new Set(e.map((e)=>e.onu_id));
                    for (let [e, r] of s)t.has(e) || (r.element.remove(), s.delete(e));
                    if (0 === e.length) {
                        d || c.append(l), d = !0;
                        return;
                    }
                    for (let [t, r] of (d && (l.remove(), d = !1), e.entries())){
                        let e = s.get(r.onu_id);
                        e || (e = tH(r), s.set(r.onu_id, e)), e.update(r);
                        let i = c.children.item(t);
                        i !== e.element && c.insertBefore(e.element, i);
                    }
                }
            };
        }(t.sub_gateways ?? []), v = Array.from({
            length: 16
        }, (e, t)=>{
            var r, i, n, a, s, l, d, c, p, u, f, h, g, m, b, v, y, w;
            let x, z, k, $, j, O, S, C, M, P, T, I, N, R, A, D, Z, U, B;
            return r = t + 1, x = o("span", {}), z = o("span", {
                style: "display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:90%",
                children: tB("Unknown")
            }), k = o("img", {
                src: "/luci-static/resources/icons/port_down.svg",
                alt: "",
                "aria-hidden": "true"
            }), $ = o("div", {
                style: "flex:1;height:3px;opacity:0.25;background-color:rgb(240, 144, 144)"
            }), j = o("span", {}), O = o("span", {}), S = o("span", {}), C = o("span", {}), M = o("span", {}), P = o("span", {}), T = o("span", {}), I = o("span", {}), N = o("span", {}), R = o("span", {}), A = o("span", {}), D = o("span", {}), Z = o("span", {}), U = o("span", {}), (w = {
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
                                            tB("Port status"),
                                            ": "
                                        ]
                                    }),
                                    j,
                                    o("br", {}),
                                    o("strong", {
                                        children: [
                                            tB("ONU"),
                                            ": "
                                        ]
                                    }),
                                    O,
                                    o("br", {}),
                                    o("strong", {
                                        children: [
                                            tB("MAC address"),
                                            ": "
                                        ]
                                    }),
                                    S
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
                                                C
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
                                (b = {
                                    class: "cbi-tooltip",
                                    children: (m = {
                                        children: [
                                            (s = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            tB("Received bytes"),
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
                                                            tB("Received packets"),
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
                                                            tB("Received multicast"),
                                                            ": "
                                                        ]
                                                    }),
                                                    I
                                                ]
                                            }, o("span", d)),
                                            o("br", {}),
                                            (c = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            tB("Receive errors"),
                                                            ": "
                                                        ]
                                                    }),
                                                    N
                                                ]
                                            }, o("span", c)),
                                            o("br", {}),
                                            (p = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            tB("Receive dropped"),
                                                            ": "
                                                        ]
                                                    }),
                                                    R
                                                ]
                                            }, o("span", p)),
                                            o("br", {}),
                                            (u = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            tB("Transmitted bytes"),
                                                            ": "
                                                        ]
                                                    }),
                                                    A
                                                ]
                                            }, o("span", u)),
                                            o("br", {}),
                                            (f = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            tB("Transmitted packets"),
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
                                                            tB("Transmit errors"),
                                                            ": "
                                                        ]
                                                    }),
                                                    Z
                                                ]
                                            }, o("span", h)),
                                            o("br", {}),
                                            (g = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            tB("Transmit dropped"),
                                                            ": "
                                                        ]
                                                    }),
                                                    U
                                                ]
                                            }, o("span", g))
                                        ]
                                    }, o("span", m))
                                }, o("span", b))
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
                    let n = (e.switch_ports ?? []).find((e)=>e.port === r), a = n?.interface ?? `fttr${r}`, o = t[a], s = o?.stats, l = n?.carrier ?? o?.carrier ?? (o?.link?.speed !== void 0 || void 0), d = (e.sub_gateways ?? []).find((e)=>e.onu_id === n?.onu_id), c = !0 === l, p = s?.rx_bytes, u = s?.tx_bytes;
                    n?.onu_id !== void 0 ? B.setAttribute("data-active-onu-id", String(n.onu_id)) : B.removeAttribute("data-active-onu-id"), c ? (B.classList.add("port-up"), B.classList.remove("port-down")) : (B.classList.add("port-down"), B.classList.remove("port-up")), x.textContent = a, k.setAttribute("src", `/luci-static/resources/icons/${c ? "port_up.svg" : "port_down.svg"}`), z.textContent = c ? o?.link?.speed !== void 0 ? void 0 === (i = o.link.speed) || !Number.isFinite(i) || i <= 0 ? tB("Unknown") : i >= 1000 ? `${i / 1000}\u{202F}GbE` : `${i}\u{202F}MbE` : tB("Connected") : !1 === l ? tB("Disconnected") : tB("Unknown"), z.setAttribute("title", _("\u901F\u5EA6\uFF1A%s Mbit/s\uFF0C\u53CC\u5DE5\uFF1A%s").format(tq(o?.link?.speed), tq(o?.link?.duplex))), $.style.opacity = c ? "1" : "0.25", $.style.backgroundColor = c ? "rgb(46, 204, 113)" : "rgba(200, 200, 200, 0.4)", j.textContent = tq(n?.link_state ?? n?.status ?? (o ? l ? tB("Link up") : tB("Link down") : tB("Unavailable"))), O.textContent = tq(n?.onu_sn ?? d?.serial_number ?? n?.onu_id), S.textContent = tq(o?.mac), C.textContent = c || u ? tF(u) : "\u2014", M.textContent = c || p ? tF(p) : "\u2014", P.textContent = tF(p), T.textContent = tW(s?.rx_packets), I.textContent = tW(s?.rx_multicast ?? s?.multicast), N.textContent = tW(s?.rx_errors), R.textContent = tW(s?.rx_dropped), A.textContent = tF(u), D.textContent = tW(s?.tx_packets), Z.textContent = tW(s?.tx_errors), U.textContent = tW(s?.tx_dropped);
                }
            };
        }), y = o("span", {
            class: "fttr-badge"
        }), w = o("span", {
            class: "fttr-badge fttr-badge-info"
        }), x = o("code", {
            style: "font-size:90%"
        }), z = o("span", {
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
                                tB("Provisioning"),
                                ":"
                            ]
                        }),
                        y
                    ]
                }, o("span", i)),
                (n = {
                    children: [
                        o("span", {
                            style: "color:#888;margin-right:.3em",
                            children: [
                                tB("Mode"),
                                ":"
                            ]
                        }),
                        w
                    ]
                }, o("span", n)),
                (a = {
                    children: [
                        o("span", {
                            style: "color:#888;margin-right:.3em",
                            children: [
                                tB("Revision"),
                                ":"
                            ]
                        }),
                        x
                    ]
                }, o("span", a)),
                z
            ]
        }, k = o("div", s), $ = o("span", {
            class: "fttr-badge"
        }), j = o("span", {
            children: tq(m.model)
        }), O = o("span", {
            class: "fttr-badge"
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

				.fttr-overview .fttr-badge {
					display: inline-block;
					padding: 0.18em 0.55em;
					font-size: 85%;
					font-weight: 600;
					line-height: 1.25;
					border-radius: 3px;
					white-space: nowrap;
					text-align: center;
				}

				.fttr-overview .fttr-badge-success {
					background: var(--fttr-success-bg);
					color: var(--fttr-success-color);
					border: 1px solid var(--fttr-success-border);
				}

				.fttr-overview .fttr-badge-warning {
					background: var(--fttr-warning-bg);
					color: var(--fttr-warning-color);
					border: 1px solid var(--fttr-warning-border);
				}

				.fttr-overview .fttr-badge-danger {
					background: var(--fttr-danger-bg);
					color: var(--fttr-danger-color);
					border: 1px solid var(--fttr-danger-border);
				}

				.fttr-overview .fttr-badge-info {
					background: var(--fttr-info-bg);
					color: var(--fttr-info-color);
					border: 1px solid var(--fttr-info-border);
				}

				.fttr-overview .fttr-badge-neutral {
					background: var(--fttr-neutral-bg);
					color: var(--fttr-neutral-color);
					border: 1px solid var(--fttr-neutral-border);
				}

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
                    children: tB("FTTR overview")
                }),
                k,
                (u = {
                    class: "cbi-section",
                    children: [
                        o("h3", {
                            children: tB("Controller")
                        }),
                        (p = {
                            class: "table",
                            children: (c = {
                                children: [
                                    (l = {
                                        children: [
                                            o("th", {
                                                style: "width:15%",
                                                children: tB("FPGA status")
                                            }),
                                            o("td", {
                                                style: "width:35%",
                                                children: $
                                            }),
                                            o("th", {
                                                style: "width:15%",
                                                children: tB("CDR lock")
                                            }),
                                            o("td", {
                                                style: "width:35%",
                                                children: O
                                            })
                                        ]
                                    }, o("tr", l)),
                                    (d = {
                                        children: [
                                            o("th", {
                                                children: tB("Optical module")
                                            }),
                                            o("td", {
                                                colSpan: 3,
                                                children: j
                                            })
                                        ]
                                    }, o("tr", d))
                                ]
                            }, o("tbody", c))
                        }, o("table", p))
                    ]
                }, o("div", u)),
                (f = {
                    class: "cbi-section",
                    children: [
                        o("h3", {
                            children: tB("Sub-gateways")
                        }),
                        b.element
                    ]
                }, o("div", f)),
                (h = {
                    class: "cbi-section",
                    children: [
                        o("h3", {
                            children: tB("Downstream ports")
                        }),
                        o("div", {
                            class: "fttr-ports-grid",
                            children: v.map((e)=>e.element)
                        })
                    ]
                }, o("div", h))
            ]
        }, S = o("div", g), (C = (e, t)=>{
            let r = e.optical_transceiver, i = e.provisioning;
            for (let n of (i ? (tV(y, i.enabled ? "success" : "neutral", i.enabled ? tB("Enabled") : tB("Disabled")), w.textContent = tq(i.mode), x.textContent = tq(i.revision), i.error ? (z.textContent = i.error, z.style.display = "") : z.style.display = "none", k.style.display = "") : k.textContent = tB("Provisioning status unavailable"), "ready" === e.fpga_status ? tV($, "success", tB("Ready")) : e.fpga_status ? tV($, "neutral", tq(e.fpga_status)) : tV($, "none", "\u2014"), j.textContent = tq(r.model), null == r.cdr_locked ? tV(O, "none", tB("Unknown")) : r.cdr_locked ? tV(O, "success", tB("Locked")) : tV(O, "warning", tB("Unlocked")), b.update(e.sub_gateways ?? []), v))n.update(e, t);
        })(t, r), tQ = (tY = {
            element: S,
            update: C
        }).element, tU.add(async ()=>{
            if (t0 || !tQ?.isConnected || !tY) return;
            let e = tY;
            t0 = !0;
            try {
                let [t, r] = await Promise.all([
                    th(),
                    tg().catch(()=>({}))
                ]);
                tY === e && e.element.isConnected && e.update(t, r);
            } catch (e) {
                console.error("Failed to refresh FTTR status", e);
            } finally{
                t0 = !1;
            }
        }, 10), tQ;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;