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
function y(...e) {
    let t = {};
    for (let r of e)Object.assign(t, Object.getOwnPropertyDescriptors(r));
    return Object.defineProperties({}, t);
}
const b = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function v(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function w(e) {
    if (!1 === v(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let r = t.prototype;
    return !1 !== v(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
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
    for(let r = t; r < e.issues.length; r++)if (e.issues[r]?.continue !== !0) return !0;
    return !1;
}
function P(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function O(e) {
    return "string" == typeof e ? e : e?.message;
}
function A(e, t, r) {
    let i = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (i.message = O(e.inst?._zod.def?.error?.(e)) ?? O(t?.error?.(e)) ?? O(r.customError?.(e)) ?? O(r.localeError?.(e)) ?? "Invalid input"), delete i.inst, delete i.continue, t?.reportInput || delete i.input, i;
}
const T = (e, t)=>{
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
}, U = o("$ZodError", T), C = o("$ZodError", T, {
    Parent: Error
}), $ = (t = C, (e, r, i, n)=>{
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
        let e = new (n?.Err ?? t)(s.issues.map((e)=>A(e, a, c())));
        throw b(e, n?.callee), e;
    }
    return s.value;
}), N = (r = C, async (e, t, i, n)=>{
    let a = i ? Object.assign(i, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (n?.Err ?? r)(s.issues.map((e)=>A(e, a, c())));
        throw b(e, n?.callee), e;
    }
    return s.value;
}), M = (i = C, (e, t, r)=>{
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
        error: new (i ?? U)(a.issues.map((e)=>A(e, n, c())))
    } : {
        success: !0,
        data: a.value
    };
}), Z = (n = C, async (e, t, r)=>{
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
        error: new n(a.issues.map((e)=>A(e, i, c())))
    } : {
        success: !0,
        data: a.value
    };
}), D = /^-?\d+(?:\.\d+)?$/, F = /^(?:true|false)$/i, R = /^null$/i, B = {
    major: 4,
    minor: 3,
    patch: 6
}, X = o("$ZodType", (e, t)=>{
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
            let i, n = S(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (n) continue;
                let t = e.issues.length, s = a._zod.check(e);
                if (s instanceof Promise && r?.async === !1) throw new l();
                if (i || s instanceof Promise) i = (i ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (n || (n = S(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    n || (n = S(e, t));
                }
            }
            return i ? i.then(()=>e) : e;
        }, r = (r, n, a)=>{
            if (S(r)) return r.aborted = !0, r;
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
    g(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = M(e, t);
                    return r.success ? {
                        value: r.data
                    } : {
                        issues: r.error?.issues
                    };
                } catch (r) {
                    return Z(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), I = o("$ZodString", (e, t)=>{
    var r;
    let i;
    X.init(e, t), e._zod.pattern = [
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
}), V = o("$ZodNumber", (e, t)=>{
    X.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? D, e._zod.parse = (r, i)=>{
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
}), H = o("$ZodBoolean", (e, t)=>{
    X.init(e, t), e._zod.pattern = F, e._zod.parse = (r, i)=>{
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
}), q = o("$ZodNull", (e, t)=>{
    X.init(e, t), e._zod.pattern = R, e._zod.values = new Set([
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
}), W = o("$ZodNever", (e, t)=>{
    X.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function J(e, t, r) {
    e.issues.length && t.issues.push(...P(r, e.issues)), t.value[r] = e.value;
}
const K = o("$ZodArray", (e, t)=>{
    X.init(e, t), e._zod.parse = (r, i)=>{
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
            o instanceof Promise ? a.push(o.then((t)=>J(t, r, e))) : J(o, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function G(e, t, r, i, n) {
    if (e.issues.length) {
        if (n && !(r in i)) return;
        t.issues.push(...P(r, e.issues));
    }
    void 0 === e.value ? r in i && (t.value[r] = void 0) : t.value[r] = e.value;
}
const Q = o("$ZodObject", (e, t)=>{
    let r;
    X.init(e, t);
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
        let s = t.value;
        if (!v(s)) return t.issues.push({
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
            a instanceof Promise ? o.push(a.then((r)=>G(r, t, e, s, n))) : G(a, t, e, s, n);
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
                a instanceof Promise ? e.push(a.then((e)=>G(e, r, n, t, c))) : G(a, r, n, t, c);
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
    let n = e.filter((e)=>!S(e));
    return 1 === n.length ? (t.value = n[0].value, n[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>A(e, i, c())))
    }), t);
}
const ee = o("$ZodUnion", (e, t)=>{
    X.init(e, t), g(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), g(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), g(e._zod, "values", ()=>{
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
        let s = n.value;
        if (!v(s)) return n.issues.push({
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
    X.init(e, t), e._zod.parse = (r, i)=>{
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
                    t.issues.length && r.issues.push(...P(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...P(e, s.issues)), r.value[e] = s.value);
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
            if ("string" == typeof s && D.test(s) && o.issues.length) {
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
                    issues: o.issues.map((e)=>A(e, i, c())),
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
                e.issues.length && r.issues.push(...P(s, e.issues)), r.value[o.value] = e.value;
            })) : (l.issues.length && r.issues.push(...P(s, l.issues)), r.value[o.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), ei = o("$ZodEnum", (e, t)=>{
    var r;
    let i;
    X.init(e, t);
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
    if (X.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
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
    X.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
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
}), eo = o("$ZodNullable", (e, t)=>{
    X.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)}|null)$`) : void 0;
    }), g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), el = o("$ZodCatch", (e, t)=>{
    X.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let i = t.innerType._zod.run(e, r);
        return i instanceof Promise ? i.then((i)=>(e.value = i.value, i.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: i.issues.map((e)=>A(e, r, c()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = i.value, i.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: i.issues.map((e)=>A(e, r, c()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ed = o("$ZodLazy", (e, t)=>{
    X.init(e, t), g(e._zod, "innerType", ()=>t.getter()), g(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), g(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), g(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), g(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
    X.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>$(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>M(e, t, r), e.parseAsync = async (t, r)=>N(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>Z(e, t, r), e.check = (...r)=>e.clone({
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
    I.init(e, t), ec.init(e, t);
});
function eu(e) {
    return new ep({
        type: "string",
        ...j(e)
    });
}
const ef = o("ZodMiniNumber", (e, t)=>{
    V.init(e, t), ec.init(e, t);
});
function eh(e) {
    return new ef({
        type: "number",
        checks: [],
        ...j(e)
    });
}
const eg = o("ZodMiniBoolean", (e, t)=>{
    H.init(e, t), ec.init(e, t);
});
function e_(e) {
    return new eg({
        type: "boolean",
        ...j(e)
    });
}
const em = o("ZodMiniNull", (e, t)=>{
    q.init(e, t), ec.init(e, t);
}), ey = o("ZodMiniNever", (e, t)=>{
    W.init(e, t), ec.init(e, t);
});
function eb(e) {
    return new ey({
        type: "never",
        ...j(e)
    });
}
const ev = o("ZodMiniArray", (e, t)=>{
    K.init(e, t), ec.init(e, t);
});
function ew(e, t) {
    return new ev({
        type: "array",
        element: e,
        ...j(t)
    });
}
const ex = o("ZodMiniObject", (e, t)=>{
    Q.init(e, t), ec.init(e, t), g(e, "shape", ()=>t.shape);
});
function ez(e, t) {
    return new ex({
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
function eP(e, t, r) {
    return new eS({
        type: "union",
        options: t,
        discriminator: e,
        ...j(r)
    });
}
const eO = o("ZodMiniRecord", (e, t)=>{
    er.init(e, t), ec.init(e, t);
});
function eA(e, t, r) {
    return new eO({
        type: "record",
        keyType: e,
        valueType: t,
        ...j(r)
    });
}
const eT = o("ZodMiniEnum", (e, t)=>{
    ei.init(e, t), ec.init(e, t), e.options = Object.values(t.entries);
});
function eU(e, t) {
    return new eT({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...j(t)
    });
}
const eC = o("ZodMiniLiteral", (e, t)=>{
    en.init(e, t), ec.init(e, t);
});
function eE(e, t) {
    return new eC({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...j(t)
    });
}
const e$ = o("ZodMiniOptional", (e, t)=>{
    es.init(e, t), ec.init(e, t);
});
function eN(e) {
    return new e$({
        type: "optional",
        innerType: e
    });
}
const eM = o("ZodMiniNullable", (e, t)=>{
    eo.init(e, t), ec.init(e, t);
});
function eZ(e) {
    return new eM({
        type: "nullable",
        innerType: e
    });
}
const eL = o("ZodMiniCatch", (e, t)=>{
    el.init(e, t), ec.init(e, t);
}), eD = o("ZodMiniLazy", (e, t)=>{
    ed.init(e, t), ec.init(e, t);
});
function eF() {
    let e = new eD({
        type: "lazy",
        getter: ()=>ej([
                eu(),
                eh(),
                e_(),
                new em({
                    type: "null",
                    ...j(void 0)
                }),
                ew(e),
                eA(eu(), e)
            ])
    });
    return e;
}
let eR = ez({
    error: ej([
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
function eX(e) {
    let t = eR.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eB("rpc", e) : new eB(e.code, e.message);
    }
    return e;
}
ez({
    status: eE("pending"),
    job: eu()
}), eP("status", [
    ez({
        status: eE("pending")
    }),
    ez({
        status: eE("ready"),
        chunk: eh(),
        chunks: eh(),
        bytes: eh(),
        data: eu()
    })
]);
let eI = eu(), eV = eh(), eH = e_(), eq = eN(eI), eW = eN(eV), eJ = eN(eH);
const eK = eU([
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
]), eG = eU([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), eQ = ez({
    id: eI,
    name: eN(eZ(eI)),
    kind: eU([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eI,
    state: eI,
    reason: eq,
    revision: eq,
    current_revision: eJ,
    management_fresh: eJ,
    operation_id: eW,
    task_id: eN(eZ(eV)),
    updated_at: eW,
    changes: eN(ew(ez({
        name: eI,
        desired: eI
    })))
});
let eY = ez({
    state: eI,
    reason: eq,
    task_id: eN(eZ(eV)),
    instance: eW
});
const e0 = ez({
    cwmp_id: eI,
    state: eU([
        "online",
        "waiting_inform",
        "offline_or_stale"
    ]),
    optical_online: eH,
    last_inform: eZ(eV),
    age_seconds: eZ(eV)
});
let e1 = ez({
    state: eU([
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
    mqtt_target: eZ(eI),
    binding_source: eq,
    link_identity_error: eZ(eI),
    mqtt_last_seen: eZ(eV),
    cwmp_id: eq,
    desired_version: eq,
    generation: eW,
    inflight: eJ,
    attempts: eW,
    next_retry_at: eW,
    updated_at: eW,
    settings_verified_at: eZ(eV),
    last_inform: eZ(eV),
    last_error: eN(eZ(eI)),
    persistence_error: eN(eZ(eI)),
    desired: eN(eZ(ez({
        vlan: eV,
        vlans: ew(eV),
        priority: eV,
        acs_url: eI
    }))),
    listener: eN(ez({
        enabled: eH,
        listen: eI,
        path: eI,
        error: eZ(eI)
    })),
    endpoint_notice: eq,
    manual_steps: eN(ew(eI))
});
const e2 = eP("state", [
    e1,
    function(e, t) {
        if (!w(t)) throw Error("Invalid input to extend: expected a plain object");
        let r = e._zod.def.checks;
        if (r && r.length > 0) {
            let r = e._zod.def.shape;
            for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(r, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let i = y(e._zod.def, {
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
        let i = y(e._zod.def, {
            get shape () {
                let r = e._zod.def.shape, i = {
                    ...r
                };
                if (t) for(let e in t){
                    if (!(e in r)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (i[e] = e$ ? new e$({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)i[e] = e$ ? new e$({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return m(this, "shape", i), i;
            },
            checks: []
        });
        return k(e, i);
    }(e1), {
        state: eU([
            "pending",
            "unavailable"
        ]),
        reason: eI
    })
]), e6 = ez({
    state: eK,
    operation_id: eW,
    device: eq,
    optical_sn: eq,
    cwmp_id: eq,
    revision: eq,
    mode: eN(eU([
        "apply",
        "plan"
    ])),
    started_at: eW,
    current_revision: eJ,
    management_fresh: eJ,
    reason: eq,
    error: eq,
    attempts: eW,
    next_retry_at: eW,
    reconcile_reason: eq,
    items: ew(eQ),
    cwmp_contract: eN(ez({
        state: eI,
        requested: eI,
        contract: eZ(eI),
        reason: eI,
        cache_hit: eH,
        schema: eI,
        capabilities: eZ(ez({
            wan: eI,
            wlan: eI,
            binding: eI
        }))
    })),
    wan_objects: eN(eA(eI, eF())),
    wan_lifecycle: eN(eA(eI, eY)),
    wan_stage: eN(eU([
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
        owned: ew(eV),
        pending: eZ(eI),
        pending_instance: eZ(eV)
    })),
    wifi_lifecycle: eN(eA(eI, eY)),
    wifi_stage: eN(eU([
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
    wifi_cleanup: eN(eU([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e5 = ez({
    enabled: eH,
    mode: eU([
        "auto",
        "manual"
    ]),
    vlan: ew(eV),
    priority: eV,
    address: eI,
    acs_url: eI,
    port: eV,
    path: eI,
    dhcp_enabled: eH
}), e4 = ez({
    state: eU([
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
    error: eZ(eI),
    inflight: eH,
    ready: eH,
    desired_version: eZ(eI),
    applied_version: eZ(eI),
    next_retry_at: eV,
    attempts: eV,
    desired: eZ(e5),
    applied: eZ(e5),
    previous: eZ(e5),
    plan: ew(ez({
        operation: eI,
        key: eI,
        value: ew(eI)
    }))
});
const e8 = ez({
    device: eI,
    name: eZ(eI),
    group: eZ(eI),
    group_name: eZ(eI),
    template: eZ(eI),
    template_name: eZ(eI),
    optical_sn: eI,
    adapter: eI,
    omci_management: ez({
        state: eI,
        reason: eN(eZ(eI))
    }),
    management: eZ(e0),
    acs_bootstrap: e2,
    provisioning: e6,
    services: ew(eQ),
    ssids: ew(eQ),
    wifi_sync: eG
}), e3 = ez({
    enabled: eH,
    mode: eU([
        "auto",
        "manual"
    ]),
    method: eE("diff"),
    revision: eI,
    triggers: ew(eI),
    interval_minutes: new ef({
        type: "number",
        coerce: !0,
        checks: [],
        ...j(void 0)
    }),
    error: eZ(eI),
    devices: ew(e8),
    management_network: e4,
    omci_management: eF(),
    groups: ew(ez({
        id: eI,
        name: eZ(eI),
        template: eI
    })),
    pending_devices: ew(eI)
});
ej([
    ez({
        valid: eE(!0),
        revision: eI,
        devices: eV,
        error: eN(eb())
    }),
    ez({
        error: eI,
        valid: eN(eb()),
        revision: eN(eb()),
        devices: eN(eb())
    })
]);
let e7 = eu(), e9 = eh(), te = eZ(e9), tt = eA(e7, ez({
    source: e7,
    unit: e7,
    reason: eZ(e7),
    raw: eZ(e7),
    age_seconds: te
}));
const tr = ez({
    phase: eU([
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
    generation: e9,
    error: eZ(e7)
}), ti = eU([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tn = ez({
    model: e7,
    wavelength_tx_nm: e9,
    wavelength_rx_nm: e9,
    phy_rate_downlink_gbps: e9,
    phy_rate_uplink_gbps: e9,
    tx_power_dbm: te,
    laser_bias_current_ma: te,
    temperature_celsius: te,
    vcc_voltage: te,
    cdr_locked: eZ(e_()),
    tx_enabled: eZ(e_()),
    measurements: tt
}), ta = ez({
    equipment_id: eZ(e7),
    hardware_version: eZ(e7),
    software_images: ew(e7),
    omcc_version: te,
    errors: ew(e7)
});
const ts = ez({
    onu_id: e9,
    vendor: e7,
    model: e7,
    serial_number: e7,
    state: ti,
    business_status: tr,
    management: eZ(e0),
    provisioning: eZ(e6),
    services: ew(eQ),
    ssids: ew(eQ),
    wifi_sync: eG,
    acs_bootstrap: eN(e2),
    identity: eZ(ta),
    identity_age_seconds: te,
    identity_current: e_(),
    fiber_distance_m: te,
    ranging_delay_rtd_ns: te,
    equalization_delay_bits: new eL({
        type: "catch",
        innerType: te,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: te,
    optical_tx_power_dbm: te,
    firmware_version: e7,
    hardware_version: e7,
    uptime_seconds: te,
    data_path: ez({
        interface: e7,
        gem_ports: eZ(ew(e9)),
        vlan_id: te,
        tx_bytes: te,
        rx_bytes: te,
        current_tx_kbps: te,
        current_rx_kbps: te,
        measurements: tt
    }),
    wifi_mesh: ez({
        channel_2g: te,
        channel_5g: te,
        bandwidth_5g: eZ(e7),
        tx_power_pct: te,
        measurements: tt
    }),
    connected_clients: eZ(ew(ez({
        mac: e7,
        ip: e7,
        band: e7,
        rssi_dbm: te,
        rx_rate_mbps: te,
        tx_rate_mbps: te
    }))),
    measurements: tt
});
let to = ez({
    port: e9,
    interface: e7,
    carrier: e_(),
    status: e7,
    onu_id: eN(e9),
    onu_sn: eN(e7),
    link_state: e7
});
ez({
    fpga_status: e7,
    provisioning: eZ(e3),
    optical_transceiver: tn,
    switch_ports: ew(to),
    sub_gateways: ew(ts),
    telemetry_gateways: ew(ez({
        id: e7,
        last_seen_sec_ago: e9,
        last_payload_bytes: e9
    }))
}), eA(e7, ez({
    carrier: eN(e_()),
    mac: eN(e7),
    link: eN(ez({
        speed: eN(e9),
        duplex: eN(e7),
        autoneg: eN(e_())
    })),
    stats: eN(eA(e7, e9))
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
}), ez({
    schema_version: eE(1),
    status: eU([
        "success",
        "error"
    ]),
    action: eU([
        "optical_on",
        "optical_off",
        "optical_status",
        "optical_reload",
        "optical_reinitialize",
        "optical_shutdown"
    ]),
    desired_enabled: eZ(e_()),
    tx_enabled: eZ(e_()),
    actor_state: eU([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: e_(),
    discovery_active: e_(),
    cleanup_pending: e_(),
    error: eZ(ez({
        code: eu(),
        message: eu()
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
}), ej([
    ez({
        operation_ids: ew(eh()),
        revision: eu()
    }),
    ez({
        started: eE(!0),
        mode: eU([
            "apply",
            "plan"
        ])
    }),
    ez({
        reset: eE(!0),
        device: eu()
    }),
    ez({
        operation_ids: ew(eh()),
        mode: eU([
            "apply",
            "plan"
        ]),
        reconcile: eN(e_()),
        retry: eN(e_())
    })
]);
let tl = L.rpc.declare({
    object: "luci.fttr",
    method: "get_calibration",
    reject: !0
}), td = L.rpc.declare({
    object: "luci.fttr",
    method: "save_calibration",
    params: [
        "path",
        "data"
    ],
    reject: !0
}), tc = L.rpc.declare({
    object: "luci.fttr",
    method: "apply_calibration",
    reject: !0
});
const tp = ez({
    source: eU([
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
}), tu = ez({
    success: e_(),
    path: eu(),
    size: eh(),
    sha256: eu(),
    error: eN(eu())
}), tf = ez({
    success: e_(),
    output: eN(eu()),
    error: eN(eu())
}), th = async ()=>tp.parse(eX(await tl())), tg = async (e)=>tu.parse(eX(await td("/lib/firmware/modified_UX3326.bin", e))), t_ = async ()=>tf.parse(eX(await tc()));
async function tm(e) {
    return window.crypto?.subtle ? Array.from(new Uint8Array(await window.crypto.subtle.digest("SHA-256", e))).map((e)=>e.toString(16).padStart(2, "0")).join("") : _("Unavailable");
}
function ty(e) {
    let t = window.atob(e), r = t.length, i = new Uint8Array(r);
    for(let e = 0; e < r; e++)i[e] = t.charCodeAt(e);
    return i.buffer;
}
function tb(e, t) {
    let r = new Uint8Array(e), i = r.byteLength;
    if (288 !== i && 56 !== i) return null;
    let n = new DataView(e), a = [];
    for(let e = 0; e < Math.min(56, i); e++)a.push(r[e]);
    let s = i >= 0x46 ? {
        n: n.getUint16(0x40, !1),
        d: n.getUint16(0x42, !1),
        o: n.getInt16(0x44, !1)
    } : {
        n: 7142,
        d: 4096,
        o: -24780
    }, o = i >= 0x4c ? {
        n: n.getUint16(0x46, !1),
        d: n.getUint16(0x48, !1),
        o: n.getInt16(0x4a, !1)
    } : {
        n: 950,
        d: 1024,
        o: 0
    }, l = i >= 0x52 ? {
        n: n.getUint16(0x4c, !1),
        d: n.getUint16(0x4e, !1),
        o: n.getInt16(0x50, !1)
    } : {
        n: 1403,
        d: 1024,
        o: 337
    }, d = i >= 0x58 ? {
        n: n.getUint16(0x52, !1),
        d: n.getUint16(0x54, !1),
        o: n.getInt16(0x56, !1)
    } : {
        n: 227,
        d: 256,
        o: 1
    }, c = i >= 0x5e ? {
        n: n.getUint16(0x58, !1),
        d: n.getUint16(0x5a, !1),
        o: n.getInt16(0x5c, !1)
    } : {
        n: 7372,
        d: 4096,
        o: -26735
    }, p = i >= 0x60 ? n.getInt16(0x5e, !1) : 35, u = {
        size: i,
        sha256: t,
        isStockHash: "a9447a85073b61016d8ef1e736e944c9942e1b138ba9a35663b48abcf47c1bd4" === t.toLowerCase(),
        registers: a,
        tempPrimary: s,
        tempAlt: c,
        tempThreshold: p,
        voltage: o,
        bias: l,
        txPower: d,
        simulated: {
            temp: 0,
            voltage: 0,
            bias: 0,
            txPower: null
        }
    };
    return u.simulated = {
        temp: function(e) {
            let { n: t, d: r, o: i } = e.tempPrimary, n = (Math.floor(0x5980 * t / (0 === r ? 4096 : r)) + i) / 256.0;
            if (n <= e.tempThreshold) {
                let { n: t, d: r, o: i } = e.tempAlt;
                return Number(((Math.floor(0x5980 * t / (0 === r ? 4096 : r)) + i) / 256.0).toFixed(2));
            }
            return Number(n.toFixed(2));
        }(u),
        voltage: function(e) {
            let { n: t, d: r, o: i } = e.voltage;
            return Number(((Math.floor(0x8880 * t / (0 === r ? 1024 : r)) + i) / 10000.0).toFixed(2));
        }(u),
        bias: function(e) {
            let { n: t, d: r, o: i } = e.bias;
            return Number(((Math.floor(0x1f40 * t / (0 === r ? 1024 : r)) + i) / 500.0).toFixed(2));
        }(u),
        txPower: function(e) {
            let { n: t, d: r, o: i } = e.txPower, n = (Math.floor(0x2440 * t / (0 === r ? 256 : r)) + i) / 10000.0;
            return n > 0 ? Number((10.0 * Math.log10(n)).toFixed(2)) : null;
        }(u)
    }, u;
}
function tv(e, t, r) {
    var i, n, a, o, l, d, c, p, u, f, h, g, m, y, b, v, w, x, z, k, j, S, P, O, A, T, U, C, $, N, M, Z, D, F, R;
    let B = e.isStockHash ? s("span", {
        class: "fttr-badge fttr-badge-success",
        children: _("Official factory baseline match")
    }) : s("span", {
        class: "fttr-badge fttr-badge-info",
        children: _("Custom calibration data")
    }), X = 288 === e.size ? s("span", {
        class: "fttr-badge fttr-badge-success",
        children: _("Standard %s bytes").format("288")
    }) : s("span", {
        class: "fttr-badge fttr-badge-warning",
        children: _("Basic %s bytes (ADC coefficients missing)").format("56")
    });
    return R = {
        class: "fttr-card",
        style: "margin-top:12px",
        children: [
            (n = {
                style: "display:flex;justify-content:space-between;align-items:center;margin-bottom:12px",
                children: [
                    (i = {
                        children: [
                            s("h4", {
                                style: "margin:0;font-size:105%",
                                children: t
                            }),
                            r && s("p", {
                                style: "margin:2px 0 0;font-size:85%;opacity:0.75",
                                children: r
                            })
                        ]
                    }, s("div", i)),
                    s("div", {
                        style: "display:flex;gap:6px",
                        children: [
                            X,
                            B
                        ]
                    })
                ]
            }, s("div", n)),
            (d = {
                class: "fttr-grid-3",
                style: "margin-bottom:12px",
                children: [
                    (a = {
                        class: "fttr-card",
                        children: [
                            s("div", {
                                class: "fttr-kv-label",
                                style: "font-size:85%",
                                children: _("Data size")
                            }),
                            s("div", {
                                style: "font-size:110%;font-weight:600;margin-top:2px",
                                children: _("%s bytes").format(String(e.size))
                            })
                        ]
                    }, s("div", a)),
                    (o = {
                        class: "fttr-card",
                        children: [
                            s("div", {
                                class: "fttr-kv-label",
                                style: "font-size:85%",
                                children: _("SHA-256 checksum")
                            }),
                            s("code", {
                                style: "font-size:80%;word-break:break-all",
                                children: e.sha256
                            })
                        ]
                    }, s("div", o)),
                    (l = {
                        class: "fttr-card",
                        children: [
                            s("div", {
                                class: "fttr-kv-label",
                                style: "font-size:85%",
                                children: _("Factory baseline consistency")
                            }),
                            s("div", {
                                style: "margin-top:2px",
                                children: e.isStockHash ? _("Exact match (%s)").format("a9447a8...") : _("Not factory default (self-calibrated)")
                            })
                        ]
                    }, s("div", l))
                ]
            }, s("div", d)),
            s("h5", {
                style: "margin:16px 0 6px;font-size:95%",
                children: _("ADC diagnostic polynomial conversion coefficients (offsets %s)").format("0x40 ~ 0x5F")
            }),
            (F = {
                style: "overflow-x:auto",
                children: (D = {
                    class: "table cbi-section-table",
                    style: "font-size:90%",
                    children: [
                        (p = {
                            children: (c = {
                                children: [
                                    s("th", {
                                        children: _("Diagnostic measurement channel")
                                    }),
                                    s("th", {
                                        children: _("Register offset")
                                    }),
                                    s("th", {
                                        children: _("Numerator N")
                                    }),
                                    s("th", {
                                        children: _("Denominator D")
                                    }),
                                    s("th", {
                                        children: _("Offset O")
                                    }),
                                    s("th", {
                                        children: _("Conversion formula")
                                    }),
                                    s("th", {
                                        children: _("Typical raw simulated value")
                                    })
                                ]
                            }, s("tr", c))
                        }, s("thead", p)),
                        (Z = {
                            children: [
                                (m = {
                                    children: [
                                        (u = {
                                            children: s("strong", {
                                                children: _("Primary temperature parameters (Temp)")
                                            })
                                        }, s("td", u)),
                                        (f = {
                                            children: s("code", {
                                                children: "0x40 / 0x42 / 0x44"
                                            })
                                        }, s("td", f)),
                                        s("td", {
                                            children: e.tempPrimary.n
                                        }),
                                        s("td", {
                                            children: e.tempPrimary.d
                                        }),
                                        s("td", {
                                            children: e.tempPrimary.o
                                        }),
                                        (h = {
                                            children: s("code", {
                                                children: "(raw * N / D + O) / 256 \xb0C"
                                            })
                                        }, s("td", h)),
                                        (g = {
                                            children: [
                                                _("Raw"),
                                                " ",
                                                s("code", {
                                                    children: "0x5980"
                                                }),
                                                " \u2192 ",
                                                s("strong", {
                                                    children: [
                                                        e.simulated.temp,
                                                        " \xb0C"
                                                    ]
                                                })
                                            ]
                                        }, s("td", g))
                                    ]
                                }, s("tr", m)),
                                (v = {
                                    children: [
                                        (y = {
                                            children: s("strong", {
                                                children: _("Alternate temperature parameters (Alt Temp)")
                                            })
                                        }, s("td", y)),
                                        (b = {
                                            children: s("code", {
                                                children: "0x58 / 0x5A / 0x5C"
                                            })
                                        }, s("td", b)),
                                        s("td", {
                                            children: e.tempAlt.n
                                        }),
                                        s("td", {
                                            children: e.tempAlt.d
                                        }),
                                        s("td", {
                                            children: e.tempAlt.o
                                        }),
                                        s("td", {
                                            children: _("Use alternate parameters when the calculated temperature is \u2264 %s \xb0C").format(String(e.tempThreshold))
                                        }),
                                        s("td", {
                                            children: _("Segment threshold: %s \xb0C").format(String(e.tempThreshold))
                                        })
                                    ]
                                }, s("tr", v)),
                                (j = {
                                    children: [
                                        (w = {
                                            children: s("strong", {
                                                children: _("Supply voltage (Vcc)")
                                            })
                                        }, s("td", w)),
                                        (x = {
                                            children: s("code", {
                                                children: "0x46 / 0x48 / 0x4A"
                                            })
                                        }, s("td", x)),
                                        s("td", {
                                            children: e.voltage.n
                                        }),
                                        s("td", {
                                            children: e.voltage.d
                                        }),
                                        s("td", {
                                            children: e.voltage.o
                                        }),
                                        (z = {
                                            children: s("code", {
                                                children: "(raw * N / D + O) / 10000 V"
                                            })
                                        }, s("td", z)),
                                        (k = {
                                            children: [
                                                _("Raw"),
                                                " ",
                                                s("code", {
                                                    children: "0x8880"
                                                }),
                                                " \u2192 ",
                                                s("strong", {
                                                    children: [
                                                        e.simulated.voltage,
                                                        " V"
                                                    ]
                                                })
                                            ]
                                        }, s("td", k))
                                    ]
                                }, s("tr", j)),
                                (T = {
                                    children: [
                                        (S = {
                                            children: s("strong", {
                                                children: _("Bias current (Bias Current)")
                                            })
                                        }, s("td", S)),
                                        (P = {
                                            children: s("code", {
                                                children: "0x4C / 0x4E / 0x50"
                                            })
                                        }, s("td", P)),
                                        s("td", {
                                            children: e.bias.n
                                        }),
                                        s("td", {
                                            children: e.bias.d
                                        }),
                                        s("td", {
                                            children: e.bias.o
                                        }),
                                        (O = {
                                            children: s("code", {
                                                children: "(raw * N / D + O) / 500 mA"
                                            })
                                        }, s("td", O)),
                                        (A = {
                                            children: [
                                                _("Raw"),
                                                " ",
                                                s("code", {
                                                    children: "0x1F40"
                                                }),
                                                " \u2192 ",
                                                s("strong", {
                                                    children: [
                                                        e.simulated.bias,
                                                        " mA"
                                                    ]
                                                })
                                            ]
                                        }, s("td", A))
                                    ]
                                }, s("tr", T)),
                                (M = {
                                    children: [
                                        (U = {
                                            children: s("strong", {
                                                children: _("Transmit optical power (Tx Power)")
                                            })
                                        }, s("td", U)),
                                        (C = {
                                            children: s("code", {
                                                children: "0x52 / 0x54 / 0x56"
                                            })
                                        }, s("td", C)),
                                        s("td", {
                                            children: e.txPower.n
                                        }),
                                        s("td", {
                                            children: e.txPower.d
                                        }),
                                        s("td", {
                                            children: e.txPower.o
                                        }),
                                        ($ = {
                                            children: s("code", {
                                                children: "p_mw = (raw*N/D+O)/10000; 10*log10(p_mw) dBm"
                                            })
                                        }, s("td", $)),
                                        (N = {
                                            children: [
                                                _("Raw"),
                                                " ",
                                                s("code", {
                                                    children: "0x2440"
                                                }),
                                                " \u2192 ",
                                                s("strong", {
                                                    children: [
                                                        e.simulated.txPower ?? _("\u2014"),
                                                        " dBm"
                                                    ]
                                                })
                                            ]
                                        }, s("td", N))
                                    ]
                                }, s("tr", M))
                            ]
                        }, s("tbody", Z))
                    ]
                }, s("table", D))
            }, s("div", F)),
            s("h5", {
                style: "margin:16px 0 6px;font-size:95%",
                children: _("BOSA hardware register initialization table (first %s bytes, %s)").format("56", "0x00 ~ 0x37")
            }),
            function(e) {
                var t, r, i, n, a, o;
                let l = [];
                for(let r = 0; r < e.length; r += 8){
                    let i = e.slice(r, r + 8);
                    l.push((t = {
                        children: [
                            s("td", {
                                style: "font-family:monospace;font-weight:600;opacity:0.75",
                                children: [
                                    "0x",
                                    r.toString(16).padStart(2, "0").toUpperCase()
                                ]
                            }),
                            i.map((e, t)=>{
                                var i;
                                let n = r + t, a = 0x27 === n;
                                return i = {
                                    style: "font-family:monospace;text-align:center",
                                    title: _("Register %s: %s (%s)").format(`0x${n.toString(16).padStart(2, "0").toUpperCase()}`, `0x${e.toString(16).padStart(2, "0").toUpperCase()}`, String(e)),
                                    children: a ? s("span", {
                                        class: "fttr-badge fttr-badge-warning",
                                        children: [
                                            "0x",
                                            e.toString(16).padStart(2, "0").toUpperCase()
                                        ]
                                    }) : s("span", {
                                        children: [
                                            "0x",
                                            e.toString(16).padStart(2, "0").toUpperCase()
                                        ]
                                    })
                                }, s("td", i);
                            }),
                            Array.from({
                                length: 8 - i.length
                            }).map(()=>s("td", {
                                    style: "text-align:center;opacity:0.35",
                                    children: _("\u2014")
                                }))
                        ]
                    }, s("tr", t)));
                }
                return o = {
                    style: "overflow-x:auto",
                    children: [
                        (n = {
                            class: "table cbi-section-table",
                            style: "font-size:90%;margin-top:8px",
                            children: [
                                (i = {
                                    children: (r = {
                                        children: [
                                            s("th", {
                                                style: "width:64px;opacity:0.8",
                                                children: _("Address")
                                            }),
                                            s("th", {
                                                style: "opacity:0.8",
                                                children: "+0"
                                            }),
                                            s("th", {
                                                style: "opacity:0.8",
                                                children: "+1"
                                            }),
                                            s("th", {
                                                style: "opacity:0.8",
                                                children: "+2"
                                            }),
                                            s("th", {
                                                style: "opacity:0.8",
                                                children: "+3"
                                            }),
                                            s("th", {
                                                style: "opacity:0.8",
                                                children: "+4"
                                            }),
                                            s("th", {
                                                style: "opacity:0.8",
                                                children: "+5"
                                            }),
                                            s("th", {
                                                style: "opacity:0.8",
                                                children: "+6"
                                            }),
                                            s("th", {
                                                style: "opacity:0.8",
                                                children: "+7"
                                            })
                                        ]
                                    }, s("tr", r))
                                }, s("thead", i)),
                                s("tbody", {
                                    children: l
                                })
                            ]
                        }, s("table", n)),
                        (a = {
                            style: "font-size:85%;opacity:0.75;margin:4px 0 0",
                            children: [
                                _("Note: Register"),
                                " ",
                                s("code", {
                                    children: "0x27"
                                }),
                                " ",
                                _("(highlighted in yellow) is the hardware latch register. It is skipped during sequential writes, then written with"),
                                " ",
                                s("code", {
                                    children: "0x55"
                                }),
                                " ",
                                _("to commit all changes.")
                            ]
                        }, s("p", a))
                    ]
                }, s("div", o);
            }(e.registers)
        ]
    }, s("div", R);
}
let main = L.view.extend({
    load: ()=>th(),
    render: (e)=>(function(e) {
            var t, r, i, n, a, o, l, d, c, p, u;
            let f = document.createElement("div");
            f.className = "fttr-calibration";
            let h = null, g = null, m = s("div", {}), y = s("div", {}), b = s("div", {}), v = s("div", {});
            function w(e) {
                var t, r, i, n, a, o, l, d, c, p, u, f, h, g, b, v, w, x, z, k, j, S;
                m.innerHTML = "", y.innerHTML = "", "builtin" === e.source && m.appendChild((i = {
                    class: "alert-message warning",
                    style: "margin-bottom:16px",
                    children: [
                        s("h4", {
                            style: "margin:0 0 6px",
                            children: _("Currently running in fallback mode with built-in static defaults")
                        }),
                        (t = {
                            style: "margin:0 0 4px",
                            children: [
                                _("No valid calibration data was found in the"),
                                " ",
                                s("strong", {
                                    children: _("1MB Factory UBI partition (offset %s)").format("0x2200")
                                }),
                                " ",
                                _("and the firmware file"),
                                " ",
                                s("code", {
                                    children: "/lib/firmware/modified_UX3326.bin"
                                }),
                                " ",
                                _("does not exist. The optical module is currently using parameters embedded in the source at compile time.")
                            ]
                        }, s("p", t)),
                        (r = {
                            style: "margin:0;font-size:90%;opacity:0.85",
                            children: [
                                _("Use the form below to upload the %s-byte").format("288"),
                                " ",
                                s("code", {
                                    children: "modified_UX3326.bin"
                                }),
                                " ",
                                _("calibration file extracted from the factory backup to"),
                                " ",
                                s("code", {
                                    children: "/lib/firmware/modified_UX3326.bin"
                                }),
                                " ",
                                _("to ensure accurate laser transmit power and ADC diagnostic readings.")
                            ]
                        }, s("p", r))
                    ]
                }, s("div", i)));
                let P = null;
                if (e.data) try {
                    let t = ty(e.data);
                    P = tb(t, e.sha256);
                } catch  {}
                let O = null;
                if (e.factory.has_data && e.factory.data) try {
                    let t = ty(e.factory.data);
                    O = tb(t, e.factory.sha256);
                } catch  {}
                y.appendChild((S = {
                    class: "cbi-section",
                    style: "margin-bottom:16px",
                    children: [
                        (j = {
                            class: "fttr-card",
                            children: [
                                (a = {
                                    style: "display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px",
                                    children: [
                                        s("h3", {
                                            style: "margin:0;font-size:110%",
                                            children: _("Currently active system calibration data")
                                        }),
                                        (n = {
                                            style: "display:flex;align-items:center;gap:8px",
                                            children: [
                                                s("span", {
                                                    class: "fttr-kv-label",
                                                    children: _("Active data source:")
                                                }),
                                                function(e) {
                                                    switch(e){
                                                        case "factory":
                                                            return s("span", {
                                                                class: "fttr-badge fttr-badge-success",
                                                                children: _("1MB Factory partition (offset %s)").format("0x2200")
                                                            });
                                                        case "firmware":
                                                            return s("span", {
                                                                class: "fttr-badge fttr-badge-info",
                                                                children: "/lib/firmware/modified_UX3326.bin"
                                                            });
                                                        case "builtin":
                                                            return s("span", {
                                                                class: "fttr-badge fttr-badge-danger",
                                                                children: _("Built-in static defaults (fallback)")
                                                            });
                                                    }
                                                }(e.source)
                                            ]
                                        }, s("div", n))
                                    ]
                                }, s("div", a)),
                                (c = {
                                    class: "fttr-grid-3",
                                    style: "margin-bottom:12px",
                                    children: [
                                        (o = {
                                            class: "fttr-card",
                                            children: [
                                                s("div", {
                                                    class: "fttr-kv-label",
                                                    style: "font-size:85%",
                                                    children: _("Currently active path")
                                                }),
                                                s("strong", {
                                                    style: "word-break:break-all;font-size:95%",
                                                    children: e.active_path
                                                })
                                            ]
                                        }, s("div", o)),
                                        (l = {
                                            class: "fttr-card",
                                            children: [
                                                s("div", {
                                                    class: "fttr-kv-label",
                                                    style: "font-size:85%",
                                                    children: _("Active data size")
                                                }),
                                                s("div", {
                                                    style: "font-size:110%;font-weight:600;margin-top:2px",
                                                    children: _("%s bytes").format(String(e.size))
                                                })
                                            ]
                                        }, s("div", l)),
                                        (d = {
                                            class: "fttr-card",
                                            children: [
                                                s("div", {
                                                    class: "fttr-kv-label",
                                                    style: "font-size:85%",
                                                    children: _("SHA-256 checksum")
                                                }),
                                                s("code", {
                                                    style: "font-size:80%;word-break:break-all",
                                                    children: e.sha256
                                                })
                                            ]
                                        }, s("div", d))
                                    ]
                                }, s("div", c)),
                                s("h4", {
                                    style: "margin:16px 0 8px;font-size:95%;border-top:1px dashed rgba(127,140,141,0.2);padding-top:12px",
                                    children: _("Calibration data source detection overview")
                                }),
                                (k = {
                                    class: "fttr-grid-2",
                                    children: [
                                        (g = {
                                            class: "fttr-card",
                                            children: [
                                                (p = {
                                                    style: "display:flex;justify-content:space-between;align-items:center;margin-bottom:6px",
                                                    children: [
                                                        s("strong", {
                                                            children: _("1. 1MB Factory partition (highest priority)")
                                                        }),
                                                        e.factory.has_data ? s("span", {
                                                            class: "fttr-badge fttr-badge-success",
                                                            children: _("Valid data (%s bytes)").format("288")
                                                        }) : s("span", {
                                                            class: "fttr-badge fttr-badge-neutral",
                                                            children: _("No valid data")
                                                        })
                                                    ]
                                                }, s("div", p)),
                                                (u = {
                                                    class: "fttr-kv-row",
                                                    children: [
                                                        s("span", {
                                                            class: "fttr-kv-label",
                                                            children: _("Device and offset")
                                                        }),
                                                        s("code", {
                                                            children: [
                                                                e.factory.device || _("No device detected"),
                                                                " @ 0x2200"
                                                            ]
                                                        })
                                                    ]
                                                }, s("div", u)),
                                                (h = {
                                                    class: "fttr-kv-row",
                                                    children: [
                                                        s("span", {
                                                            class: "fttr-kv-label",
                                                            children: _("Usage status")
                                                        }),
                                                        (f = {
                                                            children: "factory" === e.source ? s("span", {
                                                                class: "fttr-badge fttr-badge-success",
                                                                children: _("Currently in use")
                                                            }) : s("span", {
                                                                style: "opacity:0.7",
                                                                children: _("Inactive")
                                                            })
                                                        }, s("span", f))
                                                    ]
                                                }, s("div", h))
                                            ]
                                        }, s("div", g)),
                                        (z = {
                                            class: "fttr-card",
                                            children: [
                                                (b = {
                                                    style: "display:flex;justify-content:space-between;align-items:center;margin-bottom:6px",
                                                    children: [
                                                        s("strong", {
                                                            children: _("2. Firmware file path (second priority)")
                                                        }),
                                                        e.firmware.exists ? s("span", {
                                                            class: "fttr-badge fttr-badge-info",
                                                            children: _("Exists (%s bytes)").format(String(e.firmware.size))
                                                        }) : s("span", {
                                                            class: "fttr-badge fttr-badge-neutral",
                                                            children: _("File does not exist")
                                                        })
                                                    ]
                                                }, s("div", b)),
                                                (v = {
                                                    class: "fttr-kv-row",
                                                    children: [
                                                        s("span", {
                                                            class: "fttr-kv-label",
                                                            children: _("Firmware path")
                                                        }),
                                                        s("code", {
                                                            children: e.firmware.path
                                                        })
                                                    ]
                                                }, s("div", v)),
                                                (x = {
                                                    class: "fttr-kv-row",
                                                    children: [
                                                        s("span", {
                                                            class: "fttr-kv-label",
                                                            children: _("Usage status")
                                                        }),
                                                        (w = {
                                                            children: "firmware" === e.source ? s("span", {
                                                                class: "fttr-badge fttr-badge-info",
                                                                children: _("Currently in use")
                                                            }) : e.firmware.exists ? s("span", {
                                                                class: "fttr-badge fttr-badge-neutral",
                                                                children: _("Ready (overridden by Factory)")
                                                            }) : s("span", {
                                                                style: "opacity:0.7",
                                                                children: _("Not ready")
                                                            })
                                                        }, s("span", w))
                                                    ]
                                                }, s("div", x))
                                            ]
                                        }, s("div", z))
                                    ]
                                }, s("div", k))
                            ]
                        }, s("div", j)),
                        e.factory.has_data && O && s("div", {
                            style: "margin-top:16px",
                            children: tv(O, _("Downstream optical calibration parameters extracted from the 1MB Factory partition (offset %s)").format("0x2200"), "factory" === e.source ? _("Device: %s, length %s bytes (currently in use by the system)").format(e.factory.device, "288") : _("Device: %s, length %s bytes").format(e.factory.device, "288"))
                        }),
                        (!e.factory.has_data || "factory" !== e.source) && P && s("div", {
                            style: "margin-top:16px",
                            children: tv(P, _("Currently active system calibration parameters (%s)").format(e.active_path), _("Active data size: %s bytes").format(String(e.size)))
                        })
                    ]
                }, s("div", S)));
            }
            w(e);
            let x = s("input", {
                id: "fttr-cal-apply-hw",
                type: "checkbox",
                checked: !0,
                style: "margin-right:6px"
            }), z = s("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                disabled: !0,
                style: "margin-right:8px",
                children: _("Upload and save to %s").format("/lib/firmware/modified_UX3326.bin")
            }), k = s("input", {
                type: "file",
                accept: ".bin",
                style: "display:none"
            }), j = (i = {
                class: "fttr-dropzone",
                children: [
                    (t = {
                        style: "font-size:22px;margin-bottom:6px",
                        "aria-hidden": "true",
                        children: s("span", {
                            style: "display:inline-block;width:1em;height:1em;background-color:currentColor;mask:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 7V5a1 1 0 0 1 1-1h5l2 3h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z' fill='none' stroke='black' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E\") center/contain no-repeat"
                        })
                    }, s("div", t)),
                    s("div", {
                        style: "font-weight:600;margin-bottom:4px",
                        children: _("Click to select or drag a %s file here").format("UX3326.bin")
                    }),
                    (r = {
                        style: "font-size:85%;opacity:0.75",
                        children: [
                            _("Supported file:"),
                            " ",
                            s("code", {
                                children: "modified_UX3326.bin"
                            }),
                            " ",
                            _("(must be exactly %s bytes)").format("288")
                        ]
                    }, s("div", r))
                ]
            }, s("div", i));
            async function S(e) {
                var t, r, i, n, a, o, l, d, c, p, u, f;
                v.innerHTML = "", b.innerHTML = "", z.disabled = !0;
                let m = e.size;
                if (288 !== m && 56 !== m) return void v.appendChild((r = {
                    class: "alert-message danger",
                    children: [
                        s("h4", {
                            style: "margin:0 0 6px",
                            children: _("File size validation failed")
                        }),
                        (t = {
                            style: "margin:0",
                            children: [
                                _("A standard Semtech UX3326 BOSA calibration file must be exactly"),
                                " ",
                                s("strong", {
                                    children: _("%s bytes").format("288")
                                }),
                                " ",
                                _("(the first %s bytes configure registers, followed by ADC diagnostic conversion coefficients from %s).").format("56", "0x40"),
                                s("br", {}),
                                _("Selected file:"),
                                " ",
                                s("strong", {
                                    children: e.name
                                }),
                                " ",
                                _("Size:"),
                                " ",
                                s("strong", {
                                    children: _("%s bytes").format(String(m))
                                }),
                                " ",
                                _("Upload blocked.")
                            ]
                        }, s("p", t))
                    ]
                }, s("div", r)));
                try {
                    let t = await e.arrayBuffer();
                    h = t;
                    let r = await tm(t), f = tb(t, r);
                    if (!f) return void v.appendChild((a = {
                        class: "alert-message danger",
                        children: [
                            (i = {
                                style: "margin:0 0 6px",
                                children: _("Failed to parse calibration file")
                            }, s("h4", i)),
                            (n = {
                                style: "margin:0",
                                children: _("Unable to parse the calibration file structure. Please check the file's integrity.")
                            }, s("p", n))
                        ]
                    }, s("div", a)));
                    g = f, z.disabled = !1, v.appendChild((u = {
                        class: "alert-message success",
                        children: [
                            (o = {
                                style: "margin:0 0 6px",
                                children: _("File validation succeeded: %s (%s bytes)").format(e.name, String(m))
                            }, s("h4", o)),
                            (p = {
                                style: "margin:0",
                                children: [
                                    "SHA-256: ",
                                    (l = {
                                        children: r
                                    }, s("code", l)),
                                    " ",
                                    f.isStockHash ? _("(exact match with the official factory baseline)") : _("(custom/self-calibrated table)"),
                                    (d = {}, s("br", d)),
                                    _("All parameters were parsed successfully and are previewed below. Verify them, then click the button below to upload to"),
                                    " ",
                                    (c = {
                                        children: "/lib/firmware/modified_UX3326.bin"
                                    }, s("code", c)),
                                    "."
                                ]
                            }, s("p", p))
                        ]
                    }, s("div", u))), b.appendChild(tv(f, _("Parameter preview for upload: %s").format(e.name)));
                } catch (e) {
                    v.appendChild((f = {
                        class: "alert-message danger",
                        children: s("p", {
                            style: "margin:0",
                            children: _("Error reading file: %s").format(String(e))
                        })
                    }, s("div", f)));
                }
            }
            return j.addEventListener("click", ()=>k.click()), j.addEventListener("dragover", (e)=>{
                e.preventDefault(), j.style.opacity = "0.75";
            }), j.addEventListener("dragleave", ()=>{
                j.style.opacity = "1";
            }), j.addEventListener("drop", (e)=>{
                e.preventDefault(), j.style.opacity = "1", e.dataTransfer?.files.length && S(e.dataTransfer.files[0]);
            }), k.addEventListener("change", ()=>{
                k.files?.length && S(k.files[0]);
            }), z.addEventListener("click", async ()=>{
                if (h && g) {
                    var e, t, r, i, n, a;
                    z.disabled = !0, z.textContent = _("Uploading to %s...").format("/lib/firmware/modified_UX3326.bin"), v.innerHTML = "";
                    try {
                        let a = function(e) {
                            let t = "", r = new Uint8Array(e), i = r.byteLength;
                            for(let e = 0; e < i; e++)t += String.fromCharCode(r[e]);
                            return window.btoa(t);
                        }(h), o = x.checked, l = await tg(a);
                        if (!l.success) throw Error(l.error || _("Failed to save calibration file"));
                        let d = "";
                        if (o) {
                            z.textContent = _("Configuring BOSA optical transceiver hardware...");
                            let e = await t_();
                            d = e.success ? _(", and the optical transceiver hardware was reset and the register table was latched successfully (%s succeeded)").format("bosa-init") : _(", but optical transceiver hardware initialization reported a warning: %s").format(e.error || _("Unknown error"));
                        }
                        v.appendChild((n = {
                            class: "alert-message success",
                            children: [
                                (e = {
                                    style: "margin:0 0 6px",
                                    children: _("Calibration data saved successfully!")
                                }, s("h4", e)),
                                (i = {
                                    style: "margin:0",
                                    children: [
                                        _("File written to"),
                                        " ",
                                        (t = {
                                            children: l.path
                                        }, s("code", t)),
                                        " (",
                                        _("%s bytes").format(String(l.size)),
                                        ", SHA-256: ",
                                        (r = {
                                            children: l.sha256
                                        }, s("code", r)),
                                        ")",
                                        d,
                                        "."
                                    ]
                                }, s("p", i))
                            ]
                        }, s("div", n)));
                        let c = await th();
                        w(c);
                    } catch (e) {
                        v.appendChild((a = {
                            class: "alert-message danger",
                            children: [
                                s("h4", {
                                    style: "margin:0 0 6px",
                                    children: _("Upload write failed")
                                }),
                                s("p", {
                                    style: "margin:0",
                                    children: String(e)
                                })
                            ]
                        }, s("div", a)));
                    } finally{
                        z.disabled = !1, z.textContent = _("Upload and save to %s").format("/lib/firmware/modified_UX3326.bin");
                    }
                }
            }), f.appendChild((u = {
                children: [
                    s("style", {
                        children: `
				.fttr-calibration {
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
					.fttr-calibration {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .fttr-calibration,
				[data-theme="dark"] .fttr-calibration {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-danger-color: #e74c3c;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				.fttr-calibration .fttr-badge {
					display: inline-block;
					padding: 0.18em 0.55em;
					font-size: 85%;
					font-weight: 600;
					line-height: 1.25;
					border-radius: 3px;
					white-space: nowrap;
					text-align: center;
				}

				.fttr-calibration .fttr-badge-success {
					background: var(--fttr-success-bg);
					color: var(--fttr-success-color);
					border: 1px solid var(--fttr-success-border);
				}

				.fttr-calibration .fttr-badge-warning {
					background: var(--fttr-warning-bg);
					color: var(--fttr-warning-color);
					border: 1px solid var(--fttr-warning-border);
				}

				.fttr-calibration .fttr-badge-danger {
					background: var(--fttr-danger-bg);
					color: var(--fttr-danger-color);
					border: 1px solid var(--fttr-danger-border);
				}

				.fttr-calibration .fttr-badge-info {
					background: var(--fttr-info-bg);
					color: var(--fttr-info-color);
					border: 1px solid var(--fttr-info-border);
				}

				.fttr-calibration .fttr-badge-neutral {
					background: var(--fttr-neutral-bg);
					color: var(--fttr-neutral-color);
					border: 1px solid var(--fttr-neutral-border);
				}

				.fttr-calibration .fttr-grid-2 {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
					gap: 12px;
					margin: 8px 0;
				}

				.fttr-calibration .fttr-grid-3 {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
					gap: 12px;
					margin: 8px 0;
				}

				.fttr-calibration .fttr-card {
					padding: 12px 14px;
					border: 1px solid rgba(127, 140, 141, 0.2);
					border-radius: 6px;
					background: rgba(127, 140, 141, 0.04);
				}

				.fttr-calibration .fttr-kv-row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 6px 0;
					border-bottom: 1px dashed rgba(127, 140, 141, 0.15);
					font-size: 88%;
				}

				.fttr-calibration .fttr-kv-row:last-child {
					border-bottom: none;
				}

				.fttr-calibration .fttr-kv-label {
					opacity: 0.75;
				}

				.fttr-calibration .fttr-dropzone {
					border: 1px dashed rgba(127, 140, 141, 0.35);
					border-radius: 6px;
					padding: 22px;
					text-align: center;
					background: rgba(127, 140, 141, 0.03);
					cursor: pointer;
					transition: background 0.15s ease, border-color 0.15s ease;
				}

				.fttr-calibration .fttr-dropzone:hover {
					background: rgba(127, 140, 141, 0.08);
					border-color: rgba(127, 140, 141, 0.6);
				}
			`
                    }),
                    s("h2", {
                        style: "margin-bottom:6px",
                        children: _("BOSA downstream optical calibration management (UX3326)")
                    }),
                    (n = {
                        class: "cbi-section-descr",
                        style: "margin-bottom:16px",
                        children: [
                            _("Manage calibration data for the Semtech UX3326 BOSA optical transceiver attached to the HM2004-DU Micro-OLT FPGA subsystem. Calibration data is read in priority order from"),
                            " ",
                            s("strong", {
                                children: _("1MB Factory UBI partition (offset %s)").format("0x2200")
                            }),
                            ",",
                            " ",
                            s("strong", {
                                children: "/lib/firmware/modified_UX3326.bin"
                            }),
                            " ",
                            _("with automatic fallback to built-in static defaults if neither source has valid data.")
                        ]
                    }, s("p", n)),
                    m,
                    y,
                    (p = {
                        class: "cbi-section",
                        children: [
                            s("h3", {
                                children: _("Upload a new UX3326 calibration file")
                            }),
                            (a = {
                                style: "font-size:90%;opacity:0.75;margin-top:0;margin-bottom:12px",
                                children: [
                                    _("New calibration tables are always saved to"),
                                    " ",
                                    s("code", {
                                        children: "/lib/firmware/modified_UX3326.bin"
                                    }),
                                    ".",
                                    " ",
                                    _("The file must be exactly %s bytes.").format("288")
                                ]
                            }, s("p", a)),
                            j,
                            k,
                            s("div", {
                                style: "margin-top:12px",
                                children: v
                            }),
                            s("div", {
                                style: "margin-top:12px",
                                children: b
                            }),
                            (c = {
                                class: "fttr-card",
                                style: "margin-top:16px",
                                children: [
                                    s("h4", {
                                        style: "margin-top:0;margin-bottom:12px",
                                        children: _("Write settings and execution")
                                    }),
                                    (o = {
                                        class: "fttr-kv-row",
                                        style: "margin-bottom:12px",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                style: "min-width:160px",
                                                children: _("Target storage path")
                                            }),
                                            s("code", {
                                                children: "/lib/firmware/modified_UX3326.bin"
                                            })
                                        ]
                                    }, s("div", o)),
                                    (d = {
                                        class: "fttr-kv-row",
                                        style: "margin-bottom:16px",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                style: "min-width:160px",
                                                children: _("Apply to hardware immediately")
                                            }),
                                            (l = {
                                                htmlFor: "fttr-cal-apply-hw",
                                                style: "display:flex;align-items:center;cursor:pointer",
                                                children: [
                                                    x,
                                                    s("span", {
                                                        children: _("Write %s registers to the BOSA hardware and commit the latch immediately after saving (%s)").format("56", "bosa-init")
                                                    })
                                                ]
                                            }, s("label", l))
                                        ]
                                    }, s("div", d)),
                                    s("div", {
                                        children: z
                                    })
                                ]
                            }, s("div", c))
                        ]
                    }, s("div", p))
                ]
            }, s("div", u))), f;
        })(e),
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;