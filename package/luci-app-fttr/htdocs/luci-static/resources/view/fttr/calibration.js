'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, r, i, n, a;
const s = Symbol.for("jsx.fragment");
function o(e, t) {
    let { children: r, ...i } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, n = function e(t) {
        let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let i of t)null != i && "boolean" != typeof i && (Array.isArray(i) ? e(i, r) : r.push(i instanceof Node ? i : String(i)));
        return r;
    }(null == r ? [] : Array.isArray(r) ? r : [
        r
    ]);
    if (e === s) {
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
    let a = {}, o = {
        ...i
    };
    for (let [e, t] of Object.entries(o))e.startsWith("on") && "function" == typeof t ? (a[e] = t, delete o[e]) : "boolean" == typeof t && (t ? o[e] = e : delete o[e]);
    let l = Object.keys(o).length > 0 ? n.length > 1 ? E(e, o, n) : E(e, o, n[0]) : n.length > 1 ? E(e, {}, n) : E(e, {}, n[0]);
    for (let [e, t] of Object.entries(a)){
        let r = e.slice(2).toLowerCase();
        l.addEventListener(r, t);
    }
    return l;
}
function l(e, t, r) {
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
class d extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const c = {};
function p(e) {
    return e && Object.assign(c, e), c;
}
function u(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function f(e) {
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
function h(e) {
    let t = +!!e.startsWith("^"), r = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, r);
}
const g = Symbol("evaluating");
function m(e, t, r) {
    let i;
    Object.defineProperty(e, t, {
        get () {
            if (i !== g) return void 0 === i && (i = g, i = r()), i;
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
function y(...e) {
    let t = {};
    for (let r of e)Object.assign(t, Object.getOwnPropertyDescriptors(r));
    return Object.defineProperties({}, t);
}
const v = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function w(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function x(e) {
    if (!1 === w(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let r = t.prototype;
    return !1 !== w(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
}
const z = new Set([
    "string",
    "number",
    "symbol"
]);
function k(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function j(e, t, r) {
    let i = new e._zod.constr(t ?? e._zod.def);
    return (!t || r?.parent) && (i._zod.parent = e), i;
}
function S(e) {
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
function C(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let r = t; r < e.issues.length; r++)if (e.issues[r]?.continue !== !0) return !0;
    return !1;
}
function A(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function P(e) {
    return "string" == typeof e ? e : e?.message;
}
function O(e, t, r) {
    let i = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (i.message = P(e.inst?._zod.def?.error?.(e)) ?? P(t?.error?.(e)) ?? P(r.customError?.(e)) ?? P(r.localeError?.(e)) ?? "Invalid input"), delete i.inst, delete i.continue, t?.reportInput || delete i.input, i;
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
}, U = l("$ZodError", T), $ = l("$ZodError", T, {
    Parent: Error
}), N = (r = $, (e, t, i, n)=>{
    let a = i ? Object.assign(i, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise) throw new d();
    if (s.issues.length) {
        let e = new (n?.Err ?? r)(s.issues.map((e)=>O(e, a, p())));
        throw v(e, n?.callee), e;
    }
    return s.value;
}), M = (i = $, async (e, t, r, n)=>{
    let a = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (n?.Err ?? i)(s.issues.map((e)=>O(e, a, p())));
        throw v(e, n?.callee), e;
    }
    return s.value;
}), Z = (n = $, (e, t, r)=>{
    let i = r ? {
        ...r,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (a instanceof Promise) throw new d();
    return a.issues.length ? {
        success: !1,
        error: new (n ?? U)(a.issues.map((e)=>O(e, i, p())))
    } : {
        success: !0,
        data: a.value
    };
}), R = (a = $, async (e, t, r)=>{
    let i = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, n = e._zod.run({
        value: t,
        issues: []
    }, i);
    return n instanceof Promise && (n = await n), n.issues.length ? {
        success: !1,
        error: new a(n.issues.map((e)=>O(e, i, p())))
    } : {
        success: !0,
        data: n.value
    };
}), D = /^-?\d+(?:\.\d+)?$/, F = /^(?:true|false)$/i, I = /^null$/i, B = {
    major: 4,
    minor: 3,
    patch: 6
}, X = l("$ZodType", (e, t)=>{
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
            let i, n = C(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (n) continue;
                let t = e.issues.length, s = a._zod.check(e);
                if (s instanceof Promise && r?.async === !1) throw new d();
                if (i || s instanceof Promise) i = (i ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (n || (n = C(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    n || (n = C(e, t));
                }
            }
            return i ? i.then(()=>e) : e;
        }, r = (r, n, a)=>{
            if (C(r)) return r.aborted = !0, r;
            let s = t(n, i, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new d();
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
                if (!1 === a.async) throw new d();
                return s.then((e)=>t(e, i, a));
            }
            return t(s, i, a);
        };
    }
    m(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = Z(e, t);
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
}), V = l("$ZodString", (e, t)=>{
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
}), H = l("$ZodNumber", (e, t)=>{
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
}), q = l("$ZodBoolean", (e, t)=>{
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
}), W = l("$ZodNull", (e, t)=>{
    X.init(e, t), e._zod.pattern = I, e._zod.values = new Set([
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
}), J = l("$ZodNever", (e, t)=>{
    X.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function K(e, t, r) {
    e.issues.length && t.issues.push(...A(r, e.issues)), t.value[r] = e.value;
}
const G = l("$ZodArray", (e, t)=>{
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
            o instanceof Promise ? a.push(o.then((t)=>K(t, r, e))) : K(o, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function Q(e, t, r, i, n) {
    if (e.issues.length) {
        if (n && !(r in i)) return;
        t.issues.push(...A(r, e.issues));
    }
    void 0 === e.value ? r in i && (t.value[r] = void 0) : t.value[r] = e.value;
}
const Y = l("$ZodObject", (e, t)=>{
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
    let n = f(()=>(function(e) {
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
    m(e._zod, "propValues", ()=>{
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
        if (!w(s)) return t.issues.push({
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
            a instanceof Promise ? o.push(a.then((r)=>Q(r, t, e, s, n))) : Q(a, t, e, s, n);
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
                a instanceof Promise ? e.push(a.then((e)=>Q(e, r, n, t, c))) : Q(a, r, n, t, c);
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
function ee(e, t, r, i) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let n = e.filter((e)=>!C(e));
    return 1 === n.length ? (t.value = n[0].value, n[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>O(e, i, p())))
    }), t);
}
const et = l("$ZodUnion", (e, t)=>{
    X.init(e, t), m(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), m(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), m(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), m(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>h(e.source)).join("|")})$`);
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
        return s ? Promise.all(o).then((t)=>ee(t, n, e, a)) : ee(o, n, e, a);
    };
}), er = l("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, et.init(e, t);
    let r = e._zod.parse;
    m(e._zod, "propValues", ()=>{
        let e = {};
        for (let r of t.options){
            let i = r._zod.propValues;
            if (!i || 0 === Object.keys(i).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
            for (let [t, r] of Object.entries(i))for (let i of (e[t] || (e[t] = new Set()), r))e[t].add(i);
        }
        return e;
    });
    let i = f(()=>{
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
        if (!w(s)) return n.issues.push({
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
}), ei = l("$ZodRecord", (e, t)=>{
    X.init(e, t), e._zod.parse = (r, i)=>{
        let n = r.value;
        if (!x(n)) return r.issues.push({
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
                    t.issues.length && r.issues.push(...A(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...A(e, s.issues)), r.value[e] = s.value);
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
                    issues: o.issues.map((e)=>O(e, i, p())),
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
                e.issues.length && r.issues.push(...A(s, e.issues)), r.value[o.value] = e.value;
            })) : (l.issues.length && r.issues.push(...A(s, l.issues)), r.value[o.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), en = l("$ZodEnum", (e, t)=>{
    var r;
    let i;
    X.init(e, t);
    let n = (i = Object.values(r = t.entries).filter((e)=>"number" == typeof e), Object.entries(r).filter(([e, t])=>-1 === i.indexOf(+e)).map(([e, t])=>t)), a = new Set(n);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${n.filter((e)=>z.has(typeof e)).map((e)=>"string" == typeof e ? k(e) : e.toString()).join("|")})$`), e._zod.parse = (t, r)=>{
        let i = t.value;
        return a.has(i) || t.issues.push({
            code: "invalid_value",
            values: n,
            input: i,
            inst: e
        }), t;
    };
}), ea = l("$ZodLiteral", (e, t)=>{
    if (X.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? k(e) : e ? k(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (i, n)=>{
        let a = i.value;
        return r.has(a) || i.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
            inst: e
        }), i;
    };
});
function es(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const eo = l("$ZodOptional", (e, t)=>{
    X.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", m(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), m(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${h(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let i = t.innerType._zod.run(e, r);
            return i instanceof Promise ? i.then((t)=>es(t, e.value)) : es(i, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, r);
    };
}), el = l("$ZodNullable", (e, t)=>{
    X.init(e, t), m(e._zod, "optin", ()=>t.innerType._zod.optin), m(e._zod, "optout", ()=>t.innerType._zod.optout), m(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${h(e.source)}|null)$`) : void 0;
    }), m(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), ed = l("$ZodCatch", (e, t)=>{
    X.init(e, t), m(e._zod, "optin", ()=>t.innerType._zod.optin), m(e._zod, "optout", ()=>t.innerType._zod.optout), m(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let i = t.innerType._zod.run(e, r);
        return i instanceof Promise ? i.then((i)=>(e.value = i.value, i.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: i.issues.map((e)=>O(e, r, p()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = i.value, i.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: i.issues.map((e)=>O(e, r, p()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ec = l("$ZodLazy", (e, t)=>{
    X.init(e, t), m(e._zod, "innerType", ()=>t.getter()), m(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), m(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), m(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), m(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
const ep = l("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    X.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>N(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>Z(e, t, r), e.parseAsync = async (t, r)=>M(e, t, r, {
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
        }), e.with = e.check, e.clone = (t, r)=>j(e, t, r), e.brand = ()=>e, e.register = (t, r)=>(t.add(e, r), e), e.apply = (t)=>t(e);
}), eu = l("ZodMiniString", (e, t)=>{
    V.init(e, t), ep.init(e, t);
});
function ef(e) {
    return new eu({
        type: "string",
        ...S(e)
    });
}
const eh = l("ZodMiniNumber", (e, t)=>{
    H.init(e, t), ep.init(e, t);
});
function e_(e) {
    return new eh({
        type: "number",
        checks: [],
        ...S(e)
    });
}
const eg = l("ZodMiniBoolean", (e, t)=>{
    q.init(e, t), ep.init(e, t);
});
function em(e) {
    return new eg({
        type: "boolean",
        ...S(e)
    });
}
const eb = l("ZodMiniNull", (e, t)=>{
    W.init(e, t), ep.init(e, t);
}), ey = l("ZodMiniNever", (e, t)=>{
    J.init(e, t), ep.init(e, t);
});
function ev(e) {
    return new ey({
        type: "never",
        ...S(e)
    });
}
const ew = l("ZodMiniArray", (e, t)=>{
    G.init(e, t), ep.init(e, t);
});
function ex(e, t) {
    return new ew({
        type: "array",
        element: e,
        ...S(t)
    });
}
const ez = l("ZodMiniObject", (e, t)=>{
    Y.init(e, t), ep.init(e, t), m(e, "shape", ()=>t.shape);
});
function ek(e, t) {
    return new ez({
        type: "object",
        shape: e ?? {},
        ...S(t)
    });
}
function ej(e, t) {
    if (!x(t)) throw Error("Invalid input to extend: expected a plain object");
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
            return b(this, "shape", r), r;
        }
    });
    return j(e, i);
}
const eS = l("ZodMiniUnion", (e, t)=>{
    et.init(e, t), ep.init(e, t);
});
function eC(e, t) {
    return new eS({
        type: "union",
        options: e,
        ...S(t)
    });
}
const eA = l("ZodMiniDiscriminatedUnion", (e, t)=>{
    er.init(e, t), ep.init(e, t);
});
function eP(e, t, r) {
    return new eA({
        type: "union",
        options: t,
        discriminator: e,
        ...S(r)
    });
}
const eO = l("ZodMiniRecord", (e, t)=>{
    ei.init(e, t), ep.init(e, t);
});
function eT(e, t, r) {
    return new eO({
        type: "record",
        keyType: e,
        valueType: t,
        ...S(r)
    });
}
const eU = l("ZodMiniEnum", (e, t)=>{
    en.init(e, t), ep.init(e, t), e.options = Object.values(t.entries);
});
function eE(e, t) {
    return new eU({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...S(t)
    });
}
const e$ = l("ZodMiniLiteral", (e, t)=>{
    ea.init(e, t), ep.init(e, t);
});
function eN(e, t) {
    return new e$({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...S(t)
    });
}
const eM = l("ZodMiniOptional", (e, t)=>{
    eo.init(e, t), ep.init(e, t);
});
function eZ(e) {
    return new eM({
        type: "optional",
        innerType: e
    });
}
const eR = l("ZodMiniNullable", (e, t)=>{
    el.init(e, t), ep.init(e, t);
});
function eD(e) {
    return new eR({
        type: "nullable",
        innerType: e
    });
}
const eF = l("ZodMiniCatch", (e, t)=>{
    ed.init(e, t), ep.init(e, t);
}), eL = l("ZodMiniLazy", (e, t)=>{
    ec.init(e, t), ep.init(e, t);
});
function eI() {
    let e = new eL({
        type: "lazy",
        getter: ()=>eC([
                ef(),
                e_(),
                em(),
                new eb({
                    type: "null",
                    ...S(void 0)
                }),
                ex(e),
                eT(ef(), e)
            ])
    });
    return e;
}
let eB = ek({
    error: eC([
        ef(),
        ek({
            code: ef(),
            message: ef()
        })
    ])
});
class eX extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eV(e) {
    let t = eB.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eX("rpc", e) : new eX(e.code, e.message);
    }
    return e;
}
const eH = ek({
    status: eN("pending"),
    job: ef()
}), eq = eP("status", [
    ek({
        status: eN("pending")
    }),
    ek({
        status: eN("ready"),
        chunk: e_(),
        chunks: e_(),
        bytes: e_(),
        data: ef()
    })
]);
let eW = ef(), eJ = e_(), eK = em();
ek({
    optical_sn: eW,
    onu_id: eJ,
    binding_generation: eW
}), ek({
    mqtt_mac: eW,
    binding_generation: eW
});
let eG = ek({
    mqtt_mac: eW,
    optical_sn: eD(eW),
    onu_id: eD(eJ),
    binding_generation: eW,
    last_seen: eJ,
    reason: eW
}), eQ = {
    target: eW,
    request_id: eZ(eW),
    output: eZ(eW),
    output_truncated: eK,
    error: eZ(eW)
};
const eY = eP("status", [
    ek({
        ...eQ,
        status: eN("executed"),
        exit_code: eD(eJ)
    }),
    ek({
        ...eQ,
        status: eN("dispatched"),
        exit_code: eZ(ev())
    }),
    ek({
        ...eQ,
        status: eN("timeout"),
        exit_code: eZ(ev())
    }),
    ek({
        ...eQ,
        status: eN("error"),
        exit_code: eZ(ev())
    })
]);
let e0 = ek({
    target: eG,
    result: eY,
    binding_current: eK
}), e1 = ek({
    schema_version: eJ,
    compressed_bytes: eJ,
    decompressed_bytes: eJ,
    fields: eT(eW, ek({
        value: eI(),
        member: eW,
        unit: eD(eW)
    })),
    members: ex(ek({
        name: eW,
        bytes: eJ,
        encoding: eW,
        text: eD(eW),
        text_omitted: eK
    })),
    errors: ex(eW)
}), e2 = ek({
    revision: eJ,
    last_received: eJ,
    last_processed_receipt: eD(eJ),
    last_good: eD(eJ),
    error: eD(eW),
    report: eD(e1)
}), e6 = {
    schema_version: eN(1),
    target: eG,
    report: eD(e2)
};
eC([
    ek({
        ...e6,
        state: eE([
            "received",
            "report_unavailable"
        ])
    }),
    ek({
        ...e6,
        read_only: eN(!0)
    })
]);
const e4 = ek({
    schema_version: eN(1),
    devices: ex(ek({
        optical_sn: eW,
        onu_id: eJ,
        model: eW,
        optical_online: eK,
        can_execute: eK,
        mqtt: eD(eG),
        report_revision: eD(eJ)
    })),
    sources: ex(eG)
});
ek({
    schema_version: eN(1),
    operation: e0,
    accounts: eD(ex(ek({
        entry: eC([
            eN(0),
            eN(1),
            eN(2)
        ]),
        username: eW,
        active: eK
    }))),
    write_status: eE([
        "not_applicable",
        "accepted_and_saved",
        "unconfirmed"
    ])
}), ek({
    schema_version: eN(1),
    operation: e0
});
let e8 = ef(), e5 = e_(), e3 = em(), e7 = eZ(e8), e9 = eZ(e5), te = eZ(e3);
const tt = eE([
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
]), tr = eE([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), ti = ek({
    id: e8,
    name: eZ(eD(e8)),
    kind: eE([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: e8,
    state: e8,
    reason: e7,
    revision: e7,
    current_revision: te,
    management_fresh: te,
    operation_id: e9,
    task_id: eZ(eD(e5)),
    updated_at: e9,
    changes: eZ(ex(ek({
        name: e8,
        desired: e8
    })))
});
let tn = ek({
    state: e8,
    reason: e7,
    task_id: eZ(eD(e5)),
    instance: e9
});
const ta = ek({
    cwmp_id: e8,
    state: eE([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: e3,
    last_inform: eD(e5),
    age_seconds: eD(e5)
});
let ts = ek({
    state: eE([
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
    method: e7,
    reason: e7,
    mqtt_target: eD(e8),
    binding_source: e7,
    link_identity_error: eD(e8),
    mqtt_last_seen: eD(e5),
    cwmp_id: e7,
    desired_version: e7,
    generation: e9,
    inflight: te,
    attempts: e9,
    next_retry_at: e9,
    updated_at: e9,
    settings_verified_at: eD(e5),
    last_inform: eD(e5),
    last_error: eZ(eD(e8)),
    persistence_error: eZ(eD(e8)),
    desired: eZ(eD(ek({
        vlan: e5,
        vlans: ex(e5),
        priority: e5,
        acs_url: e8
    }))),
    listener: eZ(ek({
        enabled: e3,
        listen: e8,
        path: e8,
        error: eD(e8)
    })),
    endpoint_notice: e7,
    manual_steps: eZ(ex(e8))
});
const to = eP("state", [
    ts,
    ej(function(e) {
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
                    t[e] && (i[e] = eM ? new eM({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)i[e] = eM ? new eM({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return b(this, "shape", i), i;
            },
            checks: []
        });
        return j(e, i);
    }(ts), {
        state: eE([
            "pending",
            "unavailable"
        ]),
        reason: e8
    })
]), tl = ek({
    backend: eZ(ek({
        configured: e8,
        effective: e8,
        available: ex(e8),
        reason: e8
    })),
    state: tt,
    operation_id: e9,
    device: e7,
    optical_sn: e7,
    cwmp_id: e7,
    revision: e7,
    mode: eZ(eE([
        "apply",
        "plan"
    ])),
    started_at: e9,
    current_revision: te,
    management_fresh: te,
    reason: e7,
    error: e7,
    attempts: e9,
    next_retry_at: e9,
    reconcile_reason: e7,
    items: ex(ti),
    cwmp_contract: eZ(ek({
        state: e8,
        requested: e8,
        contract: eD(e8),
        reason: e8,
        cache_hit: e3,
        schema: e8,
        capabilities: eD(ek({
            wan: e8,
            wlan: e8,
            binding: e8
        }))
    })),
    wan_objects: eZ(eT(e8, eI())),
    wan_lifecycle: eZ(eT(e8, tn)),
    wan_stage: eZ(eE([
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
    wifi_objects: eZ(ek({
        owned: ex(e5),
        pending: eD(e8),
        pending_instance: eD(e5)
    })),
    wifi_lifecycle: eZ(eT(e8, tn)),
    wifi_stage: eZ(eE([
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
    wifi_cleanup: eZ(eE([
        "disable",
        "preserve",
        "delete"
    ]))
});
let td = ek({
    enabled: e3,
    mode: eE([
        "auto",
        "manual"
    ]),
    vlan: ex(e5),
    priority: e5,
    address: e8,
    acs_url: e8,
    port: e5,
    path: e8,
    dhcp_enabled: e3
}), tc = ek({
    state: eE([
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
    error: eD(e8),
    inflight: e3,
    ready: e3,
    desired_version: eD(e8),
    applied_version: eD(e8),
    next_retry_at: e5,
    attempts: e5,
    desired: eD(td),
    applied: eD(td),
    previous: eD(td),
    plan: ex(ek({
        operation: e8,
        key: e8,
        value: ex(e8)
    }))
});
const tp = ek({
    device: e8,
    name: eD(e8),
    group: eD(e8),
    group_name: eD(e8),
    template: eD(e8),
    template_name: eD(e8),
    optical_sn: e8,
    adapter: e8,
    omci_management: ek({
        state: e8,
        reason: eZ(eD(e8))
    }),
    management: eD(ta),
    acs_bootstrap: to,
    provisioning: tl,
    services: ex(ti),
    ssids: ex(ti),
    wifi_sync: tr
}), tu = ek({
    enabled: e3,
    mode: eE([
        "auto",
        "manual"
    ]),
    method: eN("diff"),
    revision: e8,
    triggers: ex(e8),
    interval_minutes: new eh({
        type: "number",
        coerce: !0,
        checks: [],
        ...S(void 0)
    }),
    error: eD(e8),
    devices: ex(tp),
    management_network: tc,
    omci_management: eI(),
    groups: ex(ek({
        id: e8,
        name: eD(e8),
        template: e8
    })),
    pending_devices: ex(e8)
}), tf = eC([
    ek({
        valid: eN(!0),
        revision: e8,
        devices: e5,
        error: eZ(ev())
    }),
    ek({
        error: e8,
        valid: eZ(ev()),
        revision: eZ(ev()),
        devices: eZ(ev())
    })
]), th = ek({
    restarting: eN(!0)
}), t_ = eC([
    ek({
        operation_ids: ex(e5),
        revision: e8
    }),
    ek({
        started: eN(!0),
        mode: eE([
            "apply",
            "plan"
        ])
    }),
    ek({
        reset: eN(!0),
        device: e8
    }),
    ek({
        operation_ids: ex(e5),
        mode: eE([
            "apply",
            "plan"
        ]),
        reconcile: te,
        retry: te
    })
]);
let tg = ef(), tm = e_(), tb = eD(tm), ty = eT(tg, ek({
    source: tg,
    unit: tg,
    reason: eD(tg),
    raw: eD(tg),
    age_seconds: tb
}));
const tv = ek({
    phase: eE([
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
    generation: tm,
    error: eD(tg)
}), tw = eE([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tx = ek({
    model: tg,
    wavelength_tx_nm: tm,
    wavelength_rx_nm: tm,
    phy_rate_downlink_gbps: tm,
    phy_rate_uplink_gbps: tm,
    tx_power_dbm: tb,
    laser_bias_current_ma: tb,
    temperature_celsius: tb,
    vcc_voltage: tb,
    cdr_locked: eD(em()),
    tx_enabled: eD(em()),
    measurements: ty
}), tz = ek({
    equipment_id: eD(tg),
    hardware_version: eD(tg),
    software_images: ex(tg),
    omcc_version: tb,
    errors: ex(tg)
});
const tk = ek({
    onu_id: tm,
    vendor: tg,
    model: tg,
    serial_number: tg,
    state: tw,
    business_status: tv,
    management: eD(ta),
    provisioning: eD(tl),
    services: ex(ti),
    ssids: ex(ti),
    wifi_sync: tr,
    acs_bootstrap: eZ(to),
    identity: eD(tz),
    identity_age_seconds: tb,
    identity_current: em(),
    fiber_distance_m: tb,
    ranging_delay_rtd_ns: tb,
    equalization_delay_bits: new eF({
        type: "catch",
        innerType: tb,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tb,
    optical_tx_power_dbm: tb,
    firmware_version: tg,
    hardware_version: tg,
    uptime_seconds: tb,
    data_path: ek({
        interface: tg,
        gem_ports: eD(ex(tm)),
        vlan_id: tb,
        tx_bytes: tb,
        rx_bytes: tb,
        current_tx_kbps: tb,
        current_rx_kbps: tb,
        offload: eZ(ek({
            enabled: eZ(eD(em())),
            routed_enabled: eZ(eD(em())),
            bridge_enabled: eZ(eD(em())),
            engine_attached: eZ(eD(em())),
            forwarding_verified: eZ(eD(em()))
        })),
        measurements: ty
    }),
    wifi_mesh: ek({
        channel_2g: tb,
        channel_5g: tb,
        bandwidth_5g: eD(tg),
        tx_power_pct: tb,
        measurements: ty
    }),
    connected_clients: eD(ex(ek({
        mac: tg,
        ip: tg,
        band: tg,
        rssi_dbm: tb,
        rx_rate_mbps: tb,
        tx_rate_mbps: tb
    }))),
    measurements: ty
});
let tj = ek({
    reserved_sn: eZ(tg),
    port: tm,
    interface: tg,
    carrier: em(),
    status: tg,
    onu_id: eZ(tm),
    onu_sn: eZ(tg),
    link_state: tg
});
const tS = ek({
    counters_valid: eZ(em()),
    packets_exact: eZ(tg),
    bytes_exact: eZ(tg),
    index: tg,
    state: tg,
    pkt_type: tg,
    orig_tuple: tg,
    new_tuple: tg,
    eth: tg,
    vlan: tg,
    packets: tm,
    bytes: tm
}), tC = ek({
    sampled_at_ms: eZ(tm),
    errors: eZ(ex(tg)),
    config_valid: eZ(em()),
    engine_valid: eZ(em()),
    mask_valid: eZ(em()),
    routed_mask_valid: eZ(em()),
    debug_valid: eZ(em()),
    flows_valid: eZ(em()),
    entries_valid: eZ(em()),
    counters_valid: eZ(em()),
    hooks_valid: eZ(em()),
    total_packets_exact: eZ(tg),
    total_bytes_exact: eZ(tg),
    supported: em(),
    engine_attached: em(),
    bridge_offload_enabled: em(),
    bridge_offload_mask: tm,
    routed_offload_mask: tm,
    bridge_offload_debug: em(),
    bridge: tg,
    active_ports: ex(tg),
    fw4_hooks_ready: em(),
    total_entries: tm,
    bound_entries: tm,
    total_packets: tm,
    total_bytes: tm,
    bound_flows: ex(tS)
}), tA = ej(tC, {
    sampled_at_ms: tm,
    errors: ex(tg),
    config_valid: em(),
    engine_valid: em(),
    mask_valid: em(),
    routed_mask_valid: em(),
    debug_valid: em(),
    flows_valid: em(),
    entries_valid: em(),
    counters_valid: em(),
    hooks_valid: em(),
    total_packets_exact: tg,
    total_bytes_exact: tg,
    bound_ipv4_entries: tm,
    bound_ipv6_entries: tm,
    bound_flows: ex(ej(tS, {
        counters_valid: em(),
        packets_exact: tg,
        bytes_exact: tg
    }))
}), tP = ek({
    ubus: eZ(eT(tg, ek({
        calls: tm,
        failures: tm,
        last_us: tm,
        max_us: tm,
        total_us: tm
    }))),
    jobs: eZ(ek({
        accepting: em(),
        running: tm,
        stored: tm,
        bytes: tm,
        running_limit: tm,
        stored_limit: tm,
        bytes_limit: tm,
        result_bytes_limit: tm
    })),
    onu_pinning: eZ(ek({
        desired: eT(tg, tm),
        active: eT(tg, tm),
        pending_restart: em(),
        allocation_blocked: em(),
        startup_error: eD(tg),
        config_error: eD(tg)
    })),
    fpga_status: tg,
    provisioning: eD(tu),
    optical_transceiver: tx,
    switch_ports: ex(tj),
    sub_gateways: ex(tk),
    telemetry_gateways: ex(ek({
        id: tg,
        last_seen_sec_ago: tm,
        last_payload_bytes: tm
    })),
    npu: eZ(eD(tC))
});
eT(tg, ek({
    carrier: eZ(em()),
    mac: eZ(tg),
    link: eZ(ek({
        speed: eZ(tm),
        duplex: eZ(tg),
        autoneg: eZ(em())
    })),
    stats: eZ(eT(tg, tm))
}));
const tO = eP("status", [
    ek({
        status: eN("success"),
        enabled: em()
    }),
    ek({
        status: eN("error"),
        error: ef()
    })
]), tT = ek({
    source: eE([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: ef(),
    size: e_(),
    sha256: ef(),
    data: ef(),
    factory: ek({
        detected: em(),
        device: ef(),
        has_data: em(),
        sha256: ef(),
        data: ef()
    }),
    firmware: ek({
        exists: em(),
        path: ef(),
        size: e_(),
        sha256: ef(),
        data: ef()
    }),
    error: eZ(ef())
}), tU = ek({
    success: em(),
    path: ef(),
    size: e_(),
    sha256: ef(),
    error: eZ(ef())
}), tE = ek({
    success: em(),
    output: eZ(ef()),
    error: eZ(ef())
}), t$ = eP("status", [
    ek({
        status: eN("pending"),
        progress: eZ(ek({
            phase: eE([
                "starting",
                "upload",
                "tables"
            ]),
            received: e_(),
            expected: eD(e_())
        }))
    }),
    ek({
        status: eN("ready"),
        chunk: e_(),
        chunks: e_(),
        bytes: e_(),
        data: ef()
    })
]), tN = ek({
    released: em()
}), tM = ek({
    schema_version: eN(1),
    status: eE([
        "success",
        "error"
    ]),
    action: eE([
        "optical_on",
        "optical_off",
        "optical_status",
        "optical_reload",
        "optical_reinitialize",
        "optical_shutdown"
    ]),
    desired_enabled: eD(em()),
    tx_enabled: eD(em()),
    actor_state: eE([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: em(),
    discovery_active: em(),
    cleanup_pending: em(),
    error: eD(ek({
        code: ef(),
        message: ef()
    }))
}), tZ = ek({
    schema_version: eN(1),
    version: ef(),
    features: eT(ef(), em()),
    functions: ek({
        optical: em(),
        omci_mib: em(),
        mqtt_telemetry: em(),
        hl202_management: em(),
        cwmp: em()
    }),
    pages: ek({
        status: em(),
        config: em(),
        sync: em(),
        hl202: em(),
        hardware: em(),
        calibration: em(),
        about: em()
    }),
    adapters: ex(ek({
        id: ef(),
        name: ef()
    }))
}), tR = {
    getCapabilities: {
        parse: (e)=>tZ.parse(eV(e))
    },
    opticalStatus: tM,
    opticalSet: tM,
    getStatus: {
        parse: (e)=>tP.parse(eV(e))
    },
    getSync: {
        parse: (e)=>tu.parse(eV(e))
    },
    configCheck: tf,
    npuStatus: tA,
    configReload: {
        parse: (e)=>tu.parse(eV(e))
    },
    restartService: {
        parse: (e)=>th.parse(eV(e))
    },
    sync: {
        parse: (e)=>t_.parse(eV(e))
    },
    npuSet: tO,
    mibStart: {
        parse: (e)=>eH.parse(eV(e))
    },
    mibResult: {
        parse: (e)=>t$.parse(eV(e))
    },
    jobRelease: {
        parse: (e)=>tN.parse(eV(e))
    },
    hl202List: {
        parse: (e)=>e4.parse(eV(e))
    },
    hl202Report: {
        parse: (e)=>eH.parse(eV(e))
    },
    hl202AccountsStart: {
        parse: (e)=>eH.parse(eV(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>eH.parse(eV(e))
    },
    hl202ExecStart: {
        parse: (e)=>eH.parse(eV(e))
    },
    jobResult: {
        parse: (e)=>eq.parse(eV(e))
    },
    getCalibration: {
        parse: (e)=>tT.parse(eV(e))
    },
    saveCalibration: {
        parse: (e)=>tU.parse(eV(e))
    },
    applyCalibration: {
        parse: (e)=>eH.parse(eV(e))
    }
};
function tD() {
    var e;
    let r, i, n, a, s, o, l, d, c, p, u, f, h, g, m, b, y, v, w, x, z, k, j;
    return t ??= (e = L.rpc, r = e.declare({
        object: "fttr",
        method: "get_capabilities",
        reject: !0
    }), i = e.declare({
        object: "fttr",
        method: "optical_status",
        reject: !0
    }), n = e.declare({
        object: "fttr",
        method: "optical_set",
        params: [
            "enabled"
        ],
        reject: !0
    }), a = e.declare({
        object: "fttr",
        method: "get_status",
        reject: !0
    }), s = e.declare({
        object: "fttr",
        method: "get_sync",
        reject: !0
    }), o = e.declare({
        object: "fttr",
        method: "config_check",
        reject: !0
    }), l = e.declare({
        object: "fttr",
        method: "npu_status",
        reject: !0
    }), d = e.declare({
        object: "fttr",
        method: "config_reload",
        reject: !0
    }), c = e.declare({
        object: "fttr",
        method: "restart_service",
        reject: !0
    }), p = e.declare({
        object: "fttr",
        method: "sync",
        params: [
            "action",
            "target",
            "management",
            "item"
        ],
        reject: !0
    }), u = e.declare({
        object: "fttr",
        method: "npu_set",
        params: [
            "enabled",
            "bridge"
        ],
        reject: !0
    }), f = e.declare({
        object: "fttr",
        method: "mib_start",
        params: [
            "onu_id",
            "optical_sn",
            "tables"
        ],
        reject: !0
    }), h = e.declare({
        object: "fttr",
        method: "mib_result",
        params: [
            "job",
            "chunk"
        ],
        reject: !0
    }), g = e.declare({
        object: "fttr",
        method: "job_release",
        params: [
            "job"
        ],
        reject: !0
    }), m = e.declare({
        object: "fttr",
        method: "hl202_list",
        reject: !0
    }), b = e.declare({
        object: "fttr",
        method: "hl202_report",
        params: [
            "target"
        ],
        reject: !0
    }), y = e.declare({
        object: "fttr",
        method: "hl202_accounts_start",
        params: [
            "target"
        ],
        reject: !0
    }), v = e.declare({
        object: "fttr",
        method: "hl202_account_update",
        params: [
            "target",
            "kind",
            "entry",
            "password",
            "active"
        ],
        reject: !0
    }), w = e.declare({
        object: "fttr",
        method: "hl202_exec_start",
        params: [
            "target",
            "script",
            "timeout_seconds"
        ],
        reject: !0
    }), x = e.declare({
        object: "fttr",
        method: "job_result",
        params: [
            "job",
            "chunk"
        ],
        reject: !0
    }), z = e.declare({
        object: "fttr",
        method: "get_calibration",
        reject: !0
    }), k = e.declare({
        object: "fttr",
        method: "save_calibration",
        params: [
            "data"
        ],
        reject: !0
    }), j = e.declare({
        object: "fttr",
        method: "apply_calibration",
        reject: !0
    }), {
        getCapabilities: async ()=>tR.getCapabilities.parse(await r()),
        opticalStatus: async ()=>tR.opticalStatus.parse(await i()),
        opticalSet: async (e)=>tR.opticalSet.parse(await n(e.enabled)),
        getStatus: async ()=>tR.getStatus.parse(await a()),
        getSync: async ()=>tR.getSync.parse(await s()),
        configCheck: async ()=>tR.configCheck.parse(await o()),
        npuStatus: async ()=>tR.npuStatus.parse(await l()),
        configReload: async ()=>tR.configReload.parse(await d()),
        restartService: async ()=>tR.restartService.parse(await c()),
        sync: async (e)=>tR.sync.parse(await p(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>tR.npuSet.parse(await u(e.enabled, e.bridge)),
        mibStart: async (e)=>tR.mibStart.parse(await f(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>tR.mibResult.parse(await h(e.job, e.chunk)),
        jobRelease: async (e)=>tR.jobRelease.parse(await g(e.job)),
        hl202List: async ()=>tR.hl202List.parse(await m()),
        hl202Report: async (e)=>tR.hl202Report.parse(await b(e.target)),
        hl202AccountsStart: async (e)=>tR.hl202AccountsStart.parse(await y(e.target)),
        hl202AccountUpdate: async (e)=>tR.hl202AccountUpdate.parse(await v(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>tR.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>tR.jobResult.parse(await x(e.job, e.chunk)),
        getCalibration: async ()=>tR.getCalibration.parse(await z()),
        saveCalibration: async (e)=>tR.saveCalibration.parse(await k(e.data)),
        applyCalibration: async ()=>tR.applyCalibration.parse(await j())
    });
}
async function tF(e) {
    let t, r = eH.parse(eV(e)), i = Date.now() + 330000, n = window.location.pathname, a = [], s = 0;
    try {
        for(let e = 0; e < 128;){
            if (window.location.pathname !== n) throw new eX("navigation", _("Result polling stopped after leaving the page. The backend job is not cancelled."));
            if (Date.now() > i) throw new eX("timeout", _("Job polling timed out; execution outcome is unknown. Do not automatically retry."));
            let o = await tD().jobResult({
                job: r.job,
                chunk: e
            });
            if ("pending" === o.status) {
                await new Promise((e)=>window.setTimeout(e, 1000));
                continue;
            }
            if (!Number.isInteger(o.chunks) || o.chunks < 1 || o.chunks > 128 || o.chunk !== e || !Number.isInteger(o.bytes) || o.bytes < 1 || o.bytes > 4194304 || o.data.length > 43692) throw new eX("transport", _("Invalid job result"));
            if (t && (o.chunks !== t.chunks || o.bytes !== t.bytes)) throw new eX("transport", _("Inconsistent job result chunks"));
            t = {
                chunks: o.chunks,
                bytes: o.bytes
            };
            let l = Uint8Array.from(atob(o.data), (e)=>e.charCodeAt(0));
            if (l.length > 32768 || s + l.length > o.bytes) throw new eX("transport", _("Job result exceeds the transport limit"));
            if (a.push(l), s += l.length, ++e === o.chunks) {
                if (s !== o.bytes) throw new eX("transport", _("Incomplete job result"));
                let e = new Uint8Array(s), t = 0;
                for (let r of a)e.set(r, t), t += r.length;
                return eV(JSON.parse(new TextDecoder("utf-8", {
                    fatal: !0
                }).decode(e)));
            }
        }
        throw new eX("transport", _("Too many result chunks"));
    } finally{
        await tD().jobRelease({
            job: r.job
        }).catch(()=>{});
    }
}
L.rpc.declare({
    object: "luci-rpc",
    method: "getNetworkDevices",
    expect: {
        "": {}
    },
    reject: !0
});
const tL = async ()=>tD().getCalibration(), tI = async (e)=>tD().saveCalibration({
        data: e
    }), tB = async ()=>tE.parse(await tF(await tD().applyCalibration()));
async function tX(e) {
    return window.crypto?.subtle ? Array.from(new Uint8Array(await window.crypto.subtle.digest("SHA-256", e))).map((e)=>e.toString(16).padStart(2, "0")).join("") : _("Unavailable");
}
function tV(e) {
    let t = window.atob(e), r = t.length, i = new Uint8Array(r);
    for(let e = 0; e < r; e++)i[e] = t.charCodeAt(e);
    return i.buffer;
}
function tH(e, t) {
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
function tq(e, t, r) {
    var i, n, a, s, l, d, c, p, u, f, h, g, m, b, y, v, w, x, z, k, j, S, C, A, P, O, T, U, $, N, M, Z, R, D, F;
    let I = e.isStockHash ? o("span", {
        class: "fttr-badge fttr-badge-success",
        children: _("Official factory baseline match")
    }) : o("span", {
        class: "fttr-badge fttr-badge-info",
        children: _("Custom calibration data")
    }), B = 288 === e.size ? o("span", {
        class: "fttr-badge fttr-badge-success",
        children: _("Standard %s bytes").format("288")
    }) : o("span", {
        class: "fttr-badge fttr-badge-warning",
        children: _("Basic %s bytes (ADC coefficients missing)").format("56")
    });
    return F = {
        class: "fttr-card",
        style: "margin-top:12px",
        children: [
            (n = {
                style: "display:flex;justify-content:space-between;align-items:center;margin-bottom:12px",
                children: [
                    (i = {
                        children: [
                            o("h4", {
                                style: "margin:0;font-size:105%",
                                children: t
                            }),
                            r && o("p", {
                                style: "margin:2px 0 0;font-size:85%;opacity:0.75",
                                children: r
                            })
                        ]
                    }, o("div", i)),
                    o("div", {
                        style: "display:flex;gap:6px",
                        children: [
                            B,
                            I
                        ]
                    })
                ]
            }, o("div", n)),
            (d = {
                class: "fttr-grid-3",
                style: "margin-bottom:12px",
                children: [
                    (a = {
                        class: "fttr-card",
                        children: [
                            o("div", {
                                class: "fttr-kv-label",
                                style: "font-size:85%",
                                children: _("Data size")
                            }),
                            o("div", {
                                style: "font-size:110%;font-weight:600;margin-top:2px",
                                children: _("%s bytes").format(String(e.size))
                            })
                        ]
                    }, o("div", a)),
                    (s = {
                        class: "fttr-card",
                        children: [
                            o("div", {
                                class: "fttr-kv-label",
                                style: "font-size:85%",
                                children: _("SHA-256 checksum")
                            }),
                            o("code", {
                                style: "font-size:80%;word-break:break-all",
                                children: e.sha256
                            })
                        ]
                    }, o("div", s)),
                    (l = {
                        class: "fttr-card",
                        children: [
                            o("div", {
                                class: "fttr-kv-label",
                                style: "font-size:85%",
                                children: _("Factory baseline consistency")
                            }),
                            o("div", {
                                style: "margin-top:2px",
                                children: e.isStockHash ? _("Exact match (%s)").format("a9447a8...") : _("Not factory default (self-calibrated)")
                            })
                        ]
                    }, o("div", l))
                ]
            }, o("div", d)),
            o("h5", {
                style: "margin:16px 0 6px;font-size:95%",
                children: _("ADC diagnostic polynomial conversion coefficients (offsets %s)").format("0x40 ~ 0x5F")
            }),
            (D = {
                style: "overflow-x:auto",
                children: (R = {
                    class: "table cbi-section-table",
                    style: "font-size:90%",
                    children: [
                        (p = {
                            children: (c = {
                                children: [
                                    o("th", {
                                        children: _("Diagnostic measurement channel")
                                    }),
                                    o("th", {
                                        children: _("Register offset")
                                    }),
                                    o("th", {
                                        children: _("Numerator N")
                                    }),
                                    o("th", {
                                        children: _("Denominator D")
                                    }),
                                    o("th", {
                                        children: _("Offset O")
                                    }),
                                    o("th", {
                                        children: _("Conversion formula")
                                    }),
                                    o("th", {
                                        children: _("Typical raw simulated value")
                                    })
                                ]
                            }, o("tr", c))
                        }, o("thead", p)),
                        (Z = {
                            children: [
                                (m = {
                                    children: [
                                        (u = {
                                            children: o("strong", {
                                                children: _("Primary temperature parameters (Temp)")
                                            })
                                        }, o("td", u)),
                                        (f = {
                                            children: o("code", {
                                                children: "0x40 / 0x42 / 0x44"
                                            })
                                        }, o("td", f)),
                                        o("td", {
                                            children: e.tempPrimary.n
                                        }),
                                        o("td", {
                                            children: e.tempPrimary.d
                                        }),
                                        o("td", {
                                            children: e.tempPrimary.o
                                        }),
                                        (h = {
                                            children: o("code", {
                                                children: "(raw * N / D + O) / 256 \xb0C"
                                            })
                                        }, o("td", h)),
                                        (g = {
                                            children: [
                                                _("Raw"),
                                                " ",
                                                o("code", {
                                                    children: "0x5980"
                                                }),
                                                " \u2192 ",
                                                o("strong", {
                                                    children: [
                                                        e.simulated.temp,
                                                        " \xb0C"
                                                    ]
                                                })
                                            ]
                                        }, o("td", g))
                                    ]
                                }, o("tr", m)),
                                (v = {
                                    children: [
                                        (b = {
                                            children: o("strong", {
                                                children: _("Alternate temperature parameters (Alt Temp)")
                                            })
                                        }, o("td", b)),
                                        (y = {
                                            children: o("code", {
                                                children: "0x58 / 0x5A / 0x5C"
                                            })
                                        }, o("td", y)),
                                        o("td", {
                                            children: e.tempAlt.n
                                        }),
                                        o("td", {
                                            children: e.tempAlt.d
                                        }),
                                        o("td", {
                                            children: e.tempAlt.o
                                        }),
                                        o("td", {
                                            children: _("Use alternate parameters when the calculated temperature is \u2264 %s \xb0C").format(String(e.tempThreshold))
                                        }),
                                        o("td", {
                                            children: _("Segment threshold: %s \xb0C").format(String(e.tempThreshold))
                                        })
                                    ]
                                }, o("tr", v)),
                                (j = {
                                    children: [
                                        (w = {
                                            children: o("strong", {
                                                children: _("Supply voltage (Vcc)")
                                            })
                                        }, o("td", w)),
                                        (x = {
                                            children: o("code", {
                                                children: "0x46 / 0x48 / 0x4A"
                                            })
                                        }, o("td", x)),
                                        o("td", {
                                            children: e.voltage.n
                                        }),
                                        o("td", {
                                            children: e.voltage.d
                                        }),
                                        o("td", {
                                            children: e.voltage.o
                                        }),
                                        (z = {
                                            children: o("code", {
                                                children: "(raw * N / D + O) / 10000 V"
                                            })
                                        }, o("td", z)),
                                        (k = {
                                            children: [
                                                _("Raw"),
                                                " ",
                                                o("code", {
                                                    children: "0x8880"
                                                }),
                                                " \u2192 ",
                                                o("strong", {
                                                    children: [
                                                        e.simulated.voltage,
                                                        " V"
                                                    ]
                                                })
                                            ]
                                        }, o("td", k))
                                    ]
                                }, o("tr", j)),
                                (O = {
                                    children: [
                                        (S = {
                                            children: o("strong", {
                                                children: _("Bias current (Bias Current)")
                                            })
                                        }, o("td", S)),
                                        (C = {
                                            children: o("code", {
                                                children: "0x4C / 0x4E / 0x50"
                                            })
                                        }, o("td", C)),
                                        o("td", {
                                            children: e.bias.n
                                        }),
                                        o("td", {
                                            children: e.bias.d
                                        }),
                                        o("td", {
                                            children: e.bias.o
                                        }),
                                        (A = {
                                            children: o("code", {
                                                children: "(raw * N / D + O) / 500 mA"
                                            })
                                        }, o("td", A)),
                                        (P = {
                                            children: [
                                                _("Raw"),
                                                " ",
                                                o("code", {
                                                    children: "0x1F40"
                                                }),
                                                " \u2192 ",
                                                o("strong", {
                                                    children: [
                                                        e.simulated.bias,
                                                        " mA"
                                                    ]
                                                })
                                            ]
                                        }, o("td", P))
                                    ]
                                }, o("tr", O)),
                                (M = {
                                    children: [
                                        (T = {
                                            children: o("strong", {
                                                children: _("Transmit optical power (Tx Power)")
                                            })
                                        }, o("td", T)),
                                        (U = {
                                            children: o("code", {
                                                children: "0x52 / 0x54 / 0x56"
                                            })
                                        }, o("td", U)),
                                        o("td", {
                                            children: e.txPower.n
                                        }),
                                        o("td", {
                                            children: e.txPower.d
                                        }),
                                        o("td", {
                                            children: e.txPower.o
                                        }),
                                        ($ = {
                                            children: o("code", {
                                                children: "p_mw = (raw*N/D+O)/10000; 10*log10(p_mw) dBm"
                                            })
                                        }, o("td", $)),
                                        (N = {
                                            children: [
                                                _("Raw"),
                                                " ",
                                                o("code", {
                                                    children: "0x2440"
                                                }),
                                                " \u2192 ",
                                                o("strong", {
                                                    children: [
                                                        e.simulated.txPower ?? _("\u2014"),
                                                        " dBm"
                                                    ]
                                                })
                                            ]
                                        }, o("td", N))
                                    ]
                                }, o("tr", M))
                            ]
                        }, o("tbody", Z))
                    ]
                }, o("table", R))
            }, o("div", D)),
            o("h5", {
                style: "margin:16px 0 6px;font-size:95%",
                children: _("BOSA hardware register initialization table (first %s bytes, %s)").format("56", "0x00 ~ 0x37")
            }),
            function(e) {
                var t, r, i, n, a, s;
                let l = [];
                for(let r = 0; r < e.length; r += 8){
                    let i = e.slice(r, r + 8);
                    l.push((t = {
                        children: [
                            o("td", {
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
                                    children: a ? o("span", {
                                        class: "fttr-badge fttr-badge-warning",
                                        children: [
                                            "0x",
                                            e.toString(16).padStart(2, "0").toUpperCase()
                                        ]
                                    }) : o("span", {
                                        children: [
                                            "0x",
                                            e.toString(16).padStart(2, "0").toUpperCase()
                                        ]
                                    })
                                }, o("td", i);
                            }),
                            Array.from({
                                length: 8 - i.length
                            }).map(()=>o("td", {
                                    style: "text-align:center;opacity:0.35",
                                    children: _("\u2014")
                                }))
                        ]
                    }, o("tr", t)));
                }
                return s = {
                    style: "overflow-x:auto",
                    children: [
                        (n = {
                            class: "table cbi-section-table",
                            style: "font-size:90%;margin-top:8px",
                            children: [
                                (i = {
                                    children: (r = {
                                        children: [
                                            o("th", {
                                                style: "width:64px;opacity:0.8",
                                                children: _("Address")
                                            }),
                                            o("th", {
                                                style: "opacity:0.8",
                                                children: "+0"
                                            }),
                                            o("th", {
                                                style: "opacity:0.8",
                                                children: "+1"
                                            }),
                                            o("th", {
                                                style: "opacity:0.8",
                                                children: "+2"
                                            }),
                                            o("th", {
                                                style: "opacity:0.8",
                                                children: "+3"
                                            }),
                                            o("th", {
                                                style: "opacity:0.8",
                                                children: "+4"
                                            }),
                                            o("th", {
                                                style: "opacity:0.8",
                                                children: "+5"
                                            }),
                                            o("th", {
                                                style: "opacity:0.8",
                                                children: "+6"
                                            }),
                                            o("th", {
                                                style: "opacity:0.8",
                                                children: "+7"
                                            })
                                        ]
                                    }, o("tr", r))
                                }, o("thead", i)),
                                o("tbody", {
                                    children: l
                                })
                            ]
                        }, o("table", n)),
                        (a = {
                            style: "font-size:85%;opacity:0.75;margin:4px 0 0",
                            children: [
                                _("Note: Register"),
                                " ",
                                o("code", {
                                    children: "0x27"
                                }),
                                " ",
                                _("(highlighted in yellow) is the hardware latch register. It is skipped during sequential writes, then written with"),
                                " ",
                                o("code", {
                                    children: "0x55"
                                }),
                                " ",
                                _("to commit all changes.")
                            ]
                        }, o("p", a))
                    ]
                }, o("div", s);
            }(e.registers)
        ]
    }, o("div", F);
}
let main = L.view.extend({
    load: ()=>tL(),
    render: (e)=>(function(e) {
            var t, r, i, n, a, s, l, d, c, p, u;
            let f = document.createElement("div");
            f.className = "fttr-calibration";
            let h = null, g = null, m = o("div", {}), b = o("div", {}), y = o("div", {}), v = o("div", {});
            function w(e) {
                var t, r, i, n, a, s, l, d, c, p, u, f, h, g, y, v, w, x, z, k, j, S;
                m.innerHTML = "", b.innerHTML = "", "builtin" === e.source && m.appendChild((i = {
                    class: "alert-message warning",
                    style: "margin-bottom:16px",
                    children: [
                        o("h4", {
                            style: "margin:0 0 6px",
                            children: _("Currently running in fallback mode with built-in static defaults")
                        }),
                        (t = {
                            style: "margin:0 0 4px",
                            children: [
                                _("No valid calibration data was found in the"),
                                " ",
                                o("strong", {
                                    children: _("1MB Factory UBI partition (offset %s)").format("0x2200")
                                }),
                                " ",
                                _("and the firmware file"),
                                " ",
                                o("code", {
                                    children: "/lib/firmware/modified_UX3326.bin"
                                }),
                                " ",
                                _("does not exist. The optical module is currently using parameters embedded in the source at compile time.")
                            ]
                        }, o("p", t)),
                        (r = {
                            style: "margin:0;font-size:90%;opacity:0.85",
                            children: [
                                _("Use the form below to upload the %s-byte").format("288"),
                                " ",
                                o("code", {
                                    children: "modified_UX3326.bin"
                                }),
                                " ",
                                _("calibration file extracted from the factory backup to"),
                                " ",
                                o("code", {
                                    children: "/lib/firmware/modified_UX3326.bin"
                                }),
                                " ",
                                _("to ensure accurate laser transmit power and ADC diagnostic readings.")
                            ]
                        }, o("p", r))
                    ]
                }, o("div", i)));
                let C = null;
                if (e.data) try {
                    let t = tV(e.data);
                    C = tH(t, e.sha256);
                } catch  {}
                let A = null;
                if (e.factory.has_data && e.factory.data) try {
                    let t = tV(e.factory.data);
                    A = tH(t, e.factory.sha256);
                } catch  {}
                b.appendChild((S = {
                    class: "cbi-section",
                    style: "margin-bottom:16px",
                    children: [
                        (j = {
                            class: "fttr-card",
                            children: [
                                (a = {
                                    style: "display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px",
                                    children: [
                                        o("h3", {
                                            style: "margin:0;font-size:110%",
                                            children: _("Currently active system calibration data")
                                        }),
                                        (n = {
                                            style: "display:flex;align-items:center;gap:8px",
                                            children: [
                                                o("span", {
                                                    class: "fttr-kv-label",
                                                    children: _("Active data source:")
                                                }),
                                                function(e) {
                                                    switch(e){
                                                        case "factory":
                                                            return o("span", {
                                                                class: "fttr-badge fttr-badge-success",
                                                                children: _("1MB Factory partition (offset %s)").format("0x2200")
                                                            });
                                                        case "firmware":
                                                            return o("span", {
                                                                class: "fttr-badge fttr-badge-info",
                                                                children: "/lib/firmware/modified_UX3326.bin"
                                                            });
                                                        case "builtin":
                                                            return o("span", {
                                                                class: "fttr-badge fttr-badge-danger",
                                                                children: _("Built-in static defaults (fallback)")
                                                            });
                                                    }
                                                }(e.source)
                                            ]
                                        }, o("div", n))
                                    ]
                                }, o("div", a)),
                                (c = {
                                    class: "fttr-grid-3",
                                    style: "margin-bottom:12px",
                                    children: [
                                        (s = {
                                            class: "fttr-card",
                                            children: [
                                                o("div", {
                                                    class: "fttr-kv-label",
                                                    style: "font-size:85%",
                                                    children: _("Currently active path")
                                                }),
                                                o("strong", {
                                                    style: "word-break:break-all;font-size:95%",
                                                    children: e.active_path
                                                })
                                            ]
                                        }, o("div", s)),
                                        (l = {
                                            class: "fttr-card",
                                            children: [
                                                o("div", {
                                                    class: "fttr-kv-label",
                                                    style: "font-size:85%",
                                                    children: _("Active data size")
                                                }),
                                                o("div", {
                                                    style: "font-size:110%;font-weight:600;margin-top:2px",
                                                    children: _("%s bytes").format(String(e.size))
                                                })
                                            ]
                                        }, o("div", l)),
                                        (d = {
                                            class: "fttr-card",
                                            children: [
                                                o("div", {
                                                    class: "fttr-kv-label",
                                                    style: "font-size:85%",
                                                    children: _("SHA-256 checksum")
                                                }),
                                                o("code", {
                                                    style: "font-size:80%;word-break:break-all",
                                                    children: e.sha256
                                                })
                                            ]
                                        }, o("div", d))
                                    ]
                                }, o("div", c)),
                                o("h4", {
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
                                                        o("strong", {
                                                            children: _("1. 1MB Factory partition (highest priority)")
                                                        }),
                                                        e.factory.has_data ? o("span", {
                                                            class: "fttr-badge fttr-badge-success",
                                                            children: _("Valid data (%s bytes)").format("288")
                                                        }) : o("span", {
                                                            class: "fttr-badge fttr-badge-neutral",
                                                            children: _("No valid data")
                                                        })
                                                    ]
                                                }, o("div", p)),
                                                (u = {
                                                    class: "fttr-kv-row",
                                                    children: [
                                                        o("span", {
                                                            class: "fttr-kv-label",
                                                            children: _("Device and offset")
                                                        }),
                                                        o("code", {
                                                            children: [
                                                                e.factory.device || _("No device detected"),
                                                                " @ 0x2200"
                                                            ]
                                                        })
                                                    ]
                                                }, o("div", u)),
                                                (h = {
                                                    class: "fttr-kv-row",
                                                    children: [
                                                        o("span", {
                                                            class: "fttr-kv-label",
                                                            children: _("Usage status")
                                                        }),
                                                        (f = {
                                                            children: "factory" === e.source ? o("span", {
                                                                class: "fttr-badge fttr-badge-success",
                                                                children: _("Currently in use")
                                                            }) : o("span", {
                                                                style: "opacity:0.7",
                                                                children: _("Inactive")
                                                            })
                                                        }, o("span", f))
                                                    ]
                                                }, o("div", h))
                                            ]
                                        }, o("div", g)),
                                        (z = {
                                            class: "fttr-card",
                                            children: [
                                                (y = {
                                                    style: "display:flex;justify-content:space-between;align-items:center;margin-bottom:6px",
                                                    children: [
                                                        o("strong", {
                                                            children: _("2. Firmware file path (second priority)")
                                                        }),
                                                        e.firmware.exists ? o("span", {
                                                            class: "fttr-badge fttr-badge-info",
                                                            children: _("Exists (%s bytes)").format(String(e.firmware.size))
                                                        }) : o("span", {
                                                            class: "fttr-badge fttr-badge-neutral",
                                                            children: _("File does not exist")
                                                        })
                                                    ]
                                                }, o("div", y)),
                                                (v = {
                                                    class: "fttr-kv-row",
                                                    children: [
                                                        o("span", {
                                                            class: "fttr-kv-label",
                                                            children: _("Firmware path")
                                                        }),
                                                        o("code", {
                                                            children: e.firmware.path
                                                        })
                                                    ]
                                                }, o("div", v)),
                                                (x = {
                                                    class: "fttr-kv-row",
                                                    children: [
                                                        o("span", {
                                                            class: "fttr-kv-label",
                                                            children: _("Usage status")
                                                        }),
                                                        (w = {
                                                            children: "firmware" === e.source ? o("span", {
                                                                class: "fttr-badge fttr-badge-info",
                                                                children: _("Currently in use")
                                                            }) : e.firmware.exists ? o("span", {
                                                                class: "fttr-badge fttr-badge-neutral",
                                                                children: _("Ready (overridden by Factory)")
                                                            }) : o("span", {
                                                                style: "opacity:0.7",
                                                                children: _("Not ready")
                                                            })
                                                        }, o("span", w))
                                                    ]
                                                }, o("div", x))
                                            ]
                                        }, o("div", z))
                                    ]
                                }, o("div", k))
                            ]
                        }, o("div", j)),
                        e.factory.has_data && A && o("div", {
                            style: "margin-top:16px",
                            children: tq(A, _("Downstream optical calibration parameters extracted from the 1MB Factory partition (offset %s)").format("0x2200"), "factory" === e.source ? _("Device: %s, length %s bytes (currently in use by the system)").format(e.factory.device, "288") : _("Device: %s, length %s bytes").format(e.factory.device, "288"))
                        }),
                        (!e.factory.has_data || "factory" !== e.source) && C && o("div", {
                            style: "margin-top:16px",
                            children: tq(C, _("Currently active system calibration parameters (%s)").format(e.active_path), _("Active data size: %s bytes").format(String(e.size)))
                        })
                    ]
                }, o("div", S)));
            }
            w(e);
            let x = o("input", {
                id: "fttr-cal-apply-hw",
                type: "checkbox",
                checked: !0,
                style: "margin-right:6px"
            }), z = o("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                disabled: !0,
                style: "margin-right:8px",
                children: _("Upload and save to %s").format("/lib/firmware/modified_UX3326.bin")
            }), k = o("input", {
                type: "file",
                accept: ".bin",
                style: "display:none"
            }), j = (i = {
                class: "fttr-dropzone",
                children: [
                    (t = {
                        style: "font-size:22px;margin-bottom:6px",
                        "aria-hidden": "true",
                        children: o("span", {
                            style: "display:inline-block;width:1em;height:1em;background-color:currentColor;mask:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 7V5a1 1 0 0 1 1-1h5l2 3h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z' fill='none' stroke='black' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E\") center/contain no-repeat"
                        })
                    }, o("div", t)),
                    o("div", {
                        style: "font-weight:600;margin-bottom:4px",
                        children: _("Click to select or drag a %s file here").format("UX3326.bin")
                    }),
                    (r = {
                        style: "font-size:85%;opacity:0.75",
                        children: [
                            _("Supported file:"),
                            " ",
                            o("code", {
                                children: "modified_UX3326.bin"
                            }),
                            " ",
                            _("(must be exactly %s bytes)").format("288")
                        ]
                    }, o("div", r))
                ]
            }, o("div", i));
            async function S(e) {
                var t, r, i, n, a, s, l, d, c, p, u, f;
                v.innerHTML = "", y.innerHTML = "", z.disabled = !0;
                let m = e.size;
                if (288 !== m && 56 !== m) return void v.appendChild((r = {
                    class: "alert-message danger",
                    children: [
                        o("h4", {
                            style: "margin:0 0 6px",
                            children: _("File size validation failed")
                        }),
                        (t = {
                            style: "margin:0",
                            children: [
                                _("A standard Semtech UX3326 BOSA calibration file must be exactly"),
                                " ",
                                o("strong", {
                                    children: _("%s bytes").format("288")
                                }),
                                " ",
                                _("(the first %s bytes configure registers, followed by ADC diagnostic conversion coefficients from %s).").format("56", "0x40"),
                                o("br", {}),
                                _("Selected file:"),
                                " ",
                                o("strong", {
                                    children: e.name
                                }),
                                " ",
                                _("Size:"),
                                " ",
                                o("strong", {
                                    children: _("%s bytes").format(String(m))
                                }),
                                " ",
                                _("Upload blocked.")
                            ]
                        }, o("p", t))
                    ]
                }, o("div", r)));
                try {
                    let t = await e.arrayBuffer();
                    h = t;
                    let r = await tX(t), f = tH(t, r);
                    if (!f) return void v.appendChild((a = {
                        class: "alert-message danger",
                        children: [
                            (i = {
                                style: "margin:0 0 6px",
                                children: _("Failed to parse calibration file")
                            }, o("h4", i)),
                            (n = {
                                style: "margin:0",
                                children: _("Unable to parse the calibration file structure. Please check the file's integrity.")
                            }, o("p", n))
                        ]
                    }, o("div", a)));
                    g = f, z.disabled = !1, v.appendChild((u = {
                        class: "alert-message success",
                        children: [
                            (s = {
                                style: "margin:0 0 6px",
                                children: _("File validation succeeded: %s (%s bytes)").format(e.name, String(m))
                            }, o("h4", s)),
                            (p = {
                                style: "margin:0",
                                children: [
                                    "SHA-256: ",
                                    (l = {
                                        children: r
                                    }, o("code", l)),
                                    " ",
                                    f.isStockHash ? _("(exact match with the official factory baseline)") : _("(custom/self-calibrated table)"),
                                    (d = {}, o("br", d)),
                                    _("All parameters were parsed successfully and are previewed below. Verify them, then click the button below to upload to"),
                                    " ",
                                    (c = {
                                        children: "/lib/firmware/modified_UX3326.bin"
                                    }, o("code", c)),
                                    "."
                                ]
                            }, o("p", p))
                        ]
                    }, o("div", u))), y.appendChild(tq(f, _("Parameter preview for upload: %s").format(e.name)));
                } catch (e) {
                    v.appendChild((f = {
                        class: "alert-message danger",
                        children: o("p", {
                            style: "margin:0",
                            children: _("Error reading file: %s").format(String(e))
                        })
                    }, o("div", f)));
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
                        }(h), s = x.checked, l = await tI(a);
                        if (!l.success) throw Error(l.error || _("Failed to save calibration file"));
                        let d = "";
                        if (s) {
                            z.textContent = _("Configuring BOSA optical transceiver hardware...");
                            let e = await tB();
                            d = e.success ? _(", and the optical transceiver hardware was reset and the register table was latched successfully (%s succeeded)").format("bosa-init") : _(", but optical transceiver hardware initialization reported a warning: %s").format(e.error || _("Unknown error"));
                        }
                        v.appendChild((n = {
                            class: "alert-message success",
                            children: [
                                (e = {
                                    style: "margin:0 0 6px",
                                    children: _("Calibration data saved successfully!")
                                }, o("h4", e)),
                                (i = {
                                    style: "margin:0",
                                    children: [
                                        _("File written to"),
                                        " ",
                                        (t = {
                                            children: l.path
                                        }, o("code", t)),
                                        " (",
                                        _("%s bytes").format(String(l.size)),
                                        ", SHA-256: ",
                                        (r = {
                                            children: l.sha256
                                        }, o("code", r)),
                                        ")",
                                        d,
                                        "."
                                    ]
                                }, o("p", i))
                            ]
                        }, o("div", n)));
                        let c = await tL();
                        w(c);
                    } catch (e) {
                        v.appendChild((a = {
                            class: "alert-message danger",
                            children: [
                                o("h4", {
                                    style: "margin:0 0 6px",
                                    children: _("Upload write failed")
                                }),
                                o("p", {
                                    style: "margin:0",
                                    children: String(e)
                                })
                            ]
                        }, o("div", a)));
                    } finally{
                        z.disabled = !1, z.textContent = _("Upload and save to %s").format("/lib/firmware/modified_UX3326.bin");
                    }
                }
            }), f.appendChild((u = {
                children: [
                    o("style", {
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
                    o("h2", {
                        style: "margin-bottom:6px",
                        children: _("BOSA downstream optical calibration management (UX3326)")
                    }),
                    (n = {
                        class: "cbi-section-descr",
                        style: "margin-bottom:16px",
                        children: [
                            _("Manage calibration data for the Semtech UX3326 BOSA optical transceiver attached to the HM2004-DU Micro-OLT FPGA subsystem. Calibration data is read in priority order from"),
                            " ",
                            o("strong", {
                                children: _("1MB Factory UBI partition (offset %s)").format("0x2200")
                            }),
                            ",",
                            " ",
                            o("strong", {
                                children: "/lib/firmware/modified_UX3326.bin"
                            }),
                            " ",
                            _("with automatic fallback to built-in static defaults if neither source has valid data.")
                        ]
                    }, o("p", n)),
                    m,
                    b,
                    (p = {
                        class: "cbi-section",
                        children: [
                            o("h3", {
                                children: _("Upload a new UX3326 calibration file")
                            }),
                            (a = {
                                style: "font-size:90%;opacity:0.75;margin-top:0;margin-bottom:12px",
                                children: [
                                    _("New calibration tables are always saved to"),
                                    " ",
                                    o("code", {
                                        children: "/lib/firmware/modified_UX3326.bin"
                                    }),
                                    ".",
                                    " ",
                                    _("The file must be exactly %s bytes.").format("288")
                                ]
                            }, o("p", a)),
                            j,
                            k,
                            o("div", {
                                style: "margin-top:12px",
                                children: v
                            }),
                            o("div", {
                                style: "margin-top:12px",
                                children: y
                            }),
                            (c = {
                                class: "fttr-card",
                                style: "margin-top:16px",
                                children: [
                                    o("h4", {
                                        style: "margin-top:0;margin-bottom:12px",
                                        children: _("Write settings and execution")
                                    }),
                                    (s = {
                                        class: "fttr-kv-row",
                                        style: "margin-bottom:12px",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                style: "min-width:160px",
                                                children: _("Target storage path")
                                            }),
                                            o("code", {
                                                children: "/lib/firmware/modified_UX3326.bin"
                                            })
                                        ]
                                    }, o("div", s)),
                                    (d = {
                                        class: "fttr-kv-row",
                                        style: "margin-bottom:16px",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                style: "min-width:160px",
                                                children: _("Apply to hardware immediately")
                                            }),
                                            (l = {
                                                htmlFor: "fttr-cal-apply-hw",
                                                style: "display:flex;align-items:center;cursor:pointer",
                                                children: [
                                                    x,
                                                    o("span", {
                                                        children: _("Write %s registers to the BOSA hardware and commit the latch immediately after saving (%s)").format("56", "bosa-init")
                                                    })
                                                ]
                                            }, o("label", l))
                                        ]
                                    }, o("div", d)),
                                    o("div", {
                                        children: z
                                    })
                                ]
                            }, o("div", c))
                        ]
                    }, o("div", p))
                ]
            }, o("div", u))), f;
        })(e),
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;