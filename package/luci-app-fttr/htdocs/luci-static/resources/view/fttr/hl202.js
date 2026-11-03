'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, n, r, i, a;
const s = Symbol.for("jsx.fragment");
function o(e, t) {
    let { children: n, ...r } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, i = function e(t) {
        let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let r of t)null != r && "boolean" != typeof r && (Array.isArray(r) ? e(r, n) : n.push(r instanceof Node ? r : String(r)));
        return n;
    }(null == n ? [] : Array.isArray(n) ? n : [
        n
    ]);
    if (e === s) {
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
    let a = {}, o = {
        ...r
    };
    for (let [e, t] of Object.entries(o))e.startsWith("on") && "function" == typeof t ? (a[e] = t, delete o[e]) : "boolean" == typeof t && (t ? o[e] = e : delete o[e]);
    let l = Object.keys(o).length > 0 ? i.length > 1 ? E(e, o, i) : E(e, o, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
    for (let [e, t] of Object.entries(a)){
        let n = e.slice(2).toLowerCase();
        l.addEventListener(n, t);
    }
    return l;
}
function l(e, t, n) {
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
class c extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const d = {};
function p(e) {
    return e && Object.assign(d, e), d;
}
function u(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function g(e) {
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
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const m = Symbol("evaluating");
function f(e, t, n) {
    let r;
    Object.defineProperty(e, t, {
        get () {
            if (r !== m) return void 0 === r && (r = m, r = n()), r;
        },
        set (n) {
            Object.defineProperty(e, t, {
                value: n
            });
        },
        configurable: !0
    });
}
function b(e, t, n) {
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
function w(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function x(e) {
    if (!1 === w(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let n = t.prototype;
    return !1 !== w(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
}
const z = new Set([
    "string",
    "number",
    "symbol"
]);
function k(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function j(e, t, n) {
    let r = new e._zod.constr(t ?? e._zod.def);
    return (!t || n?.parent) && (r._zod.parent = e), r;
}
function C(e) {
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
function T(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function $(e) {
    return "string" == typeof e ? e : e?.message;
}
function O(e, t, n) {
    let r = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (r.message = $(e.inst?._zod.def?.error?.(e)) ?? $(t?.error?.(e)) ?? $(n.customError?.(e)) ?? $(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
const N = (e, t)=>{
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
}, P = l("$ZodError", N), R = l("$ZodError", N, {
    Parent: Error
}), M = (n = R, (e, t, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise) throw new c();
    if (s.issues.length) {
        let e = new (i?.Err ?? n)(s.issues.map((e)=>O(e, a, p())));
        throw v(e, i?.callee), e;
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
        let e = new (i?.Err ?? r)(s.issues.map((e)=>O(e, a, p())));
        throw v(e, i?.callee), e;
    }
    return s.value;
}), A = (i = R, (e, t, n)=>{
    let r = n ? {
        ...n,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, r);
    if (a instanceof Promise) throw new c();
    return a.issues.length ? {
        success: !1,
        error: new (i ?? P)(a.issues.map((e)=>O(e, r, p())))
    } : {
        success: !0,
        data: a.value
    };
}), q = (a = R, async (e, t, n)=>{
    let r = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, i = e._zod.run({
        value: t,
        issues: []
    }, r);
    return i instanceof Promise && (i = await i), i.issues.length ? {
        success: !1,
        error: new a(i.issues.map((e)=>O(e, r, p())))
    } : {
        success: !0,
        data: i.value
    };
}), D = /^-?\d+(?:\.\d+)?$/, J = /^(?:true|false)$/i, U = /^null$/i, I = {
    major: 4,
    minor: 3,
    patch: 6
}, Q = l("$ZodType", (e, t)=>{
    var n;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = I;
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
                if (s instanceof Promise && n?.async === !1) throw new c();
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
                if (!1 === a.async) throw new c();
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
                if (!1 === a.async) throw new c();
                return s.then((e)=>t(e, r, a));
            }
            return t(s, r, a);
        };
    }
    f(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = A(e, t);
                    return n.success ? {
                        value: n.data
                    } : {
                        issues: n.error?.issues
                    };
                } catch (n) {
                    return q(e, t).then((e)=>e.success ? {
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
    var n;
    let r;
    Q.init(e, t), e._zod.pattern = [
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
}), F = l("$ZodNumber", (e, t)=>{
    Q.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? D, e._zod.parse = (n, r)=>{
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
}), W = l("$ZodBoolean", (e, t)=>{
    Q.init(e, t), e._zod.pattern = J, e._zod.parse = (n, r)=>{
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
}), H = l("$ZodNull", (e, t)=>{
    Q.init(e, t), e._zod.pattern = U, e._zod.values = new Set([
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
}), K = l("$ZodUnknown", (e, t)=>{
    Q.init(e, t), e._zod.parse = (e)=>e;
}), B = l("$ZodNever", (e, t)=>{
    Q.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function X(e, t, n) {
    e.issues.length && t.issues.push(...T(n, e.issues)), t.value[n] = e.value;
}
const G = l("$ZodArray", (e, t)=>{
    Q.init(e, t), e._zod.parse = (n, r)=>{
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
function Y(e, t, n, r, i) {
    if (e.issues.length) {
        if (i && !(n in r)) return;
        t.issues.push(...T(n, e.issues));
    }
    void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const ee = l("$ZodObject", (e, t)=>{
    let n;
    Q.init(e, t);
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
    let i = g(()=>(function(e) {
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
    f(e._zod, "propValues", ()=>{
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
        if (!w(s)) return t.issues.push({
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
            a instanceof Promise ? o.push(a.then((n)=>Y(n, t, e, s, i))) : Y(a, t, e, s, i);
        }
        return a ? function(e, t, n, r, i, a) {
            let s = [], o = i.keySet, l = i.catchall._zod, c = l.def.type, d = "optional" === l.optout;
            for(let i in t){
                if (o.has(i)) continue;
                if ("never" === c) {
                    s.push(i);
                    continue;
                }
                let a = l.run({
                    value: t[i],
                    issues: []
                }, r);
                a instanceof Promise ? e.push(a.then((e)=>Y(e, n, i, t, d))) : Y(a, n, i, t, d);
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
function et(e, t, n, r) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let i = e.filter((e)=>!S(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>O(e, r, p())))
    }), t);
}
const en = l("$ZodUnion", (e, t)=>{
    Q.init(e, t), f(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), f(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), f(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), f(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>h(e.source)).join("|")})$`);
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
        return s ? Promise.all(o).then((t)=>et(t, i, e, a)) : et(o, i, e, a);
    };
}), er = l("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, en.init(e, t);
    let n = e._zod.parse;
    f(e._zod, "propValues", ()=>{
        let e = {};
        for (let n of t.options){
            let r = n._zod.propValues;
            if (!r || 0 === Object.keys(r).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
            for (let [t, n] of Object.entries(r))for (let r of (e[t] || (e[t] = new Set()), n))e[t].add(r);
        }
        return e;
    });
    let r = g(()=>{
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
        if (!w(s)) return i.issues.push({
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
}), ei = l("$ZodRecord", (e, t)=>{
    Q.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!x(i)) return n.issues.push({
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
                    t.issues.length && n.issues.push(...T(e, t.issues)), n.value[e] = t.value;
                })) : (s.issues.length && n.issues.push(...T(e, s.issues)), n.value[e] = s.value);
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
            if ("string" == typeof s && D.test(s) && o.issues.length) {
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
                    issues: o.issues.map((e)=>O(e, r, p())),
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
                e.issues.length && n.issues.push(...T(s, e.issues)), n.value[o.value] = e.value;
            })) : (l.issues.length && n.issues.push(...T(s, l.issues)), n.value[o.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
}), ea = l("$ZodEnum", (e, t)=>{
    var n;
    let r;
    Q.init(e, t);
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
}), es = l("$ZodLiteral", (e, t)=>{
    if (Q.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
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
function eo(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const el = l("$ZodOptional", (e, t)=>{
    Q.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", f(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), f(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${h(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let r = t.innerType._zod.run(e, n);
            return r instanceof Promise ? r.then((t)=>eo(t, e.value)) : eo(r, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, n);
    };
}), ec = l("$ZodNullable", (e, t)=>{
    Q.init(e, t), f(e._zod, "optin", ()=>t.innerType._zod.optin), f(e._zod, "optout", ()=>t.innerType._zod.optout), f(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${h(e.source)}|null)$`) : void 0;
    }), f(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), ed = l("$ZodCatch", (e, t)=>{
    Q.init(e, t), f(e._zod, "optin", ()=>t.innerType._zod.optin), f(e._zod, "optout", ()=>t.innerType._zod.optout), f(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, n)=>{
        if ("backward" === n.direction) return t.innerType._zod.run(e, n);
        let r = t.innerType._zod.run(e, n);
        return r instanceof Promise ? r.then((r)=>(e.value = r.value, r.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: r.issues.map((e)=>O(e, n, p()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = r.value, r.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: r.issues.map((e)=>O(e, n, p()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ep = l("$ZodLazy", (e, t)=>{
    Q.init(e, t), f(e._zod, "innerType", ()=>t.getter()), f(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), f(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), f(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), f(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n)=>e._zod.innerType._zod.run(t, n);
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
const eu = l("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    Q.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>M(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>A(e, t, n), e.parseAsync = async (t, n)=>Z(e, t, n, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, n)=>q(e, t, n), e.check = (...n)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, n)=>j(e, t, n), e.brand = ()=>e, e.register = (t, n)=>(t.add(e, n), e), e.apply = (t)=>t(e);
}), e_ = l("ZodMiniString", (e, t)=>{
    V.init(e, t), eu.init(e, t);
});
function eg(e) {
    return new e_({
        type: "string",
        ...C(e)
    });
}
const eh = l("ZodMiniNumber", (e, t)=>{
    F.init(e, t), eu.init(e, t);
});
function em(e) {
    return new eh({
        type: "number",
        checks: [],
        ...C(e)
    });
}
const ef = l("ZodMiniBoolean", (e, t)=>{
    W.init(e, t), eu.init(e, t);
});
function eb(e) {
    return new ef({
        type: "boolean",
        ...C(e)
    });
}
const ey = l("ZodMiniNull", (e, t)=>{
    H.init(e, t), eu.init(e, t);
});
function ev(e) {
    return new ey({
        type: "null",
        ...C(e)
    });
}
const ew = l("ZodMiniUnknown", (e, t)=>{
    K.init(e, t), eu.init(e, t);
});
function ex() {
    return new ew({
        type: "unknown"
    });
}
const ez = l("ZodMiniNever", (e, t)=>{
    B.init(e, t), eu.init(e, t);
});
function ek(e) {
    return new ez({
        type: "never",
        ...C(e)
    });
}
const ej = l("ZodMiniArray", (e, t)=>{
    G.init(e, t), eu.init(e, t);
});
function eC(e, t) {
    return new ej({
        type: "array",
        element: e,
        ...C(t)
    });
}
const eS = l("ZodMiniObject", (e, t)=>{
    ee.init(e, t), eu.init(e, t), f(e, "shape", ()=>t.shape);
});
function eT(e, t) {
    return new eS({
        type: "object",
        shape: e ?? {},
        ...C(t)
    });
}
const e$ = l("ZodMiniUnion", (e, t)=>{
    en.init(e, t), eu.init(e, t);
});
function eO(e, t) {
    return new e$({
        type: "union",
        options: e,
        ...C(t)
    });
}
const eE = l("ZodMiniDiscriminatedUnion", (e, t)=>{
    er.init(e, t), eu.init(e, t);
});
function eN(e, t, n) {
    return new eE({
        type: "union",
        options: t,
        discriminator: e,
        ...C(n)
    });
}
const eP = l("ZodMiniRecord", (e, t)=>{
    ei.init(e, t), eu.init(e, t);
});
function eR(e, t, n) {
    return new eP({
        type: "record",
        keyType: e,
        valueType: t,
        ...C(n)
    });
}
const eM = l("ZodMiniEnum", (e, t)=>{
    ea.init(e, t), eu.init(e, t), e.options = Object.values(t.entries);
});
function eL(e, t) {
    return new eM({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...C(t)
    });
}
const eZ = l("ZodMiniLiteral", (e, t)=>{
    es.init(e, t), eu.init(e, t);
});
function eA(e, t) {
    return new eZ({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...C(t)
    });
}
const eq = l("ZodMiniOptional", (e, t)=>{
    el.init(e, t), eu.init(e, t);
});
function eD(e) {
    return new eq({
        type: "optional",
        innerType: e
    });
}
const eJ = l("ZodMiniNullable", (e, t)=>{
    ec.init(e, t), eu.init(e, t);
});
function eU(e) {
    return new eJ({
        type: "nullable",
        innerType: e
    });
}
const eI = l("ZodMiniCatch", (e, t)=>{
    ed.init(e, t), eu.init(e, t);
}), eQ = l("ZodMiniLazy", (e, t)=>{
    ep.init(e, t), eu.init(e, t);
});
function eV() {
    let e = new eQ({
        type: "lazy",
        getter: ()=>eO([
                eg(),
                em(),
                eb(),
                ev(),
                eC(e),
                eR(eg(), e)
            ])
    });
    return e;
}
const eF = eO([
    eA("account_set_password"),
    eA("account_set_active")
]), eW = eT({
    id: eg(),
    name: eg()
});
eT({
    success: eb(),
    output: eD(eg()),
    error: eD(eg())
});
const eH = eO([
    eA("factory"),
    eA("firmware"),
    eA("builtin")
]), eK = eT({
    detected: eb(),
    device: eg(),
    has_data: eb(),
    sha256: eg(),
    data: eg()
}), eB = eT({
    exists: eb(),
    path: eg(),
    size: em(),
    sha256: eg(),
    data: eg()
}), eX = eT({
    source: eH,
    active_path: eg(),
    size: em(),
    sha256: eg(),
    data: eg(),
    factory: eK,
    firmware: eB
}), eG = eT({
    error: eg()
});
eO([
    eX,
    eG
]);
const eY = eT({
    success: eb(),
    path: eg(),
    size: em(),
    sha256: eg()
});
eO([
    eY,
    eG
]), eT({
    data: eg()
});
const e0 = eT({
    acs: eb(),
    mqtt: eb(),
    npu: eb(),
    "device-hl202": eb(),
    "device-hwtc": eb(),
    "device-star": eb(),
    "device-zte": eb()
}), e2 = eT({
    optical: eb(),
    bridge_offload: eb(),
    omci_mib: eb(),
    mqtt_telemetry: eb(),
    hl202_management: eb(),
    cwmp: eb(),
    command_provisioning: eb()
}), e1 = eT({
    status: eb(),
    config: eb(),
    sync: eb(),
    hardware: eb(),
    calibration: eb(),
    hl202: eb(),
    about: eb()
}), e8 = eT({
    schema_version: eA(1),
    version: eg(),
    features: e0,
    functions: e2,
    pages: e1,
    adapters: eC(eW)
});
eO([
    eT({
        valid: eb(),
        revision: eg(),
        devices: em()
    }),
    eT({
        error: eg()
    })
]);
const e4 = eO([
    eA("auto"),
    eA("manual")
]), e5 = eA("diff"), e3 = eT({
    id: eg(),
    name: eO([
        eg(),
        ev()
    ]),
    template: eg()
}), e6 = eT({
    enabled: eb(),
    mode: e4,
    method: e5,
    revision: eg(),
    triggers: eC(eg()),
    interval_minutes: em(),
    error: eO([
        eg(),
        ev()
    ]),
    devices: eC(ex()),
    management_network: ex(),
    omci_management: ex(),
    groups: eC(e3),
    pending_devices: eC(eg())
});
eO([
    e6,
    eG
]), eT({});
const e7 = eO([
    eT({
        optical_sn: eg(),
        onu_id: em(),
        binding_generation: eg()
    }),
    eT({
        mqtt_mac: eg(),
        binding_generation: eg()
    })
]);
eT({
    target: e7
});
const e9 = eT({
    mqtt_mac: eg(),
    optical_sn: eO([
        eg(),
        ev()
    ]),
    onu_id: eO([
        em(),
        ev()
    ]),
    binding_generation: eg(),
    last_seen: em(),
    reason: eg()
}), te = eT({
    optical_sn: eg(),
    onu_id: em(),
    model: eg(),
    optical_online: eb(),
    can_execute: eb(),
    mqtt: eO([
        e9,
        ev()
    ]),
    report_revision: eO([
        em(),
        ev()
    ])
});
eT({
    target: e7,
    script: eg(),
    timeout_seconds: em()
});
const tt = eT({
    code: eg(),
    message: eg()
});
eO([
    eT({
        schema_version: eA(1),
        devices: eC(te),
        sources: eC(e9)
    }),
    eT({
        schema_version: em(),
        error: tt
    })
]), eT({
    target: e7
}), eT({
    target: e7,
    kind: eF,
    entry: em(),
    password: eg(),
    active: eb()
});
const tn = eA("pending"), tr = eT({
    phase: eO([
        eA("starting"),
        eA("upload"),
        eA("tables")
    ]),
    received: em(),
    expected: eO([
        em(),
        ev()
    ])
}), ti = eA("ready"), ta = eO([
    eT({
        status: tn,
        progress: eD(tr)
    }),
    eT({
        status: ti,
        chunk: em(),
        chunks: em(),
        bytes: em(),
        data: eg()
    })
]);
eO([
    ta,
    eG
]);
const ts = eT({
    status: tn,
    job: eg()
}), to = eT({
    released: eb()
});
eT({
    job: eg()
}), eT({
    job: eg(),
    chunk: em()
}), eO([
    ts,
    eG
]);
const tl = eT({
    accepting: eb(),
    running: em(),
    stored: em(),
    bytes: em(),
    running_limit: em(),
    stored_limit: em(),
    bytes_limit: em(),
    result_bytes_limit: em()
});
eT({
    onu_id: em(),
    optical_sn: eg(),
    tables: eb()
});
const tc = eO([
    eT({
        status: eA("success"),
        enabled: eb()
    }),
    eT({
        status: eA("error"),
        error: eg()
    })
]);
eT({
    enabled: eb(),
    bridge: eg()
});
const td = eT({
    index: eg(),
    state: eg(),
    pkt_type: eg(),
    orig_tuple: eg(),
    new_tuple: eg(),
    eth: eg(),
    vlan: eg(),
    packets: em(),
    bytes: em(),
    counters_valid: eb(),
    packets_exact: eg(),
    bytes_exact: eg()
}), tp = eT({
    sampled_at_ms: em(),
    errors: eC(eg()),
    config_valid: eb(),
    engine_valid: eb(),
    mask_valid: eb(),
    routed_mask_valid: eb(),
    debug_valid: eb(),
    flows_valid: eb(),
    entries_valid: eb(),
    counters_valid: eb(),
    hooks_valid: eb(),
    total_packets_exact: eg(),
    total_bytes_exact: eg(),
    supported: eb(),
    engine_attached: eb(),
    bridge_offload_enabled: eb(),
    bridge_offload_mask: em(),
    routed_offload_mask: em(),
    bridge_offload_debug: eb(),
    bridge: eg(),
    active_ports: eC(eg()),
    fw4_hooks_ready: eb(),
    total_entries: em(),
    bound_entries: em(),
    bound_ipv4_entries: em(),
    bound_ipv6_entries: em(),
    total_packets: em(),
    total_bytes: em(),
    bound_flows: eC(td)
}), tu = eO([
    eA("plan"),
    eA("apply")
]), t_ = eO([
    eA("optical_on"),
    eA("optical_off"),
    eA("optical_status"),
    eA("optical_reload"),
    eA("optical_reinitialize"),
    eA("optical_shutdown")
]), tg = eO([
    eA("success"),
    eA("error")
]), th = eO([
    eA("enabled"),
    eA("disabled"),
    eA("unknown")
]), tm = eT({
    schema_version: eA(1),
    status: tg,
    action: t_,
    desired_enabled: eO([
        eb(),
        ev()
    ]),
    tx_enabled: eO([
        eb(),
        ev()
    ]),
    actor_state: th,
    hardware_ready: eb(),
    discovery_active: eb(),
    cleanup_pending: eb(),
    error: eO([
        tt,
        ev()
    ])
});
eT({
    enabled: eb()
}), eT({
    restarting: eb()
});
const tf = eT({
    calls: em(),
    failures: em(),
    last_us: em(),
    max_us: em(),
    total_us: em()
});
eT({
    ubus: eD(eR(eg(), tf)),
    jobs: eD(tl),
    onu_pinning: eD(ex()),
    fpga_status: eg(),
    provisioning: ex(),
    optical_transceiver: ex(),
    switch_ports: eC(ex()),
    sub_gateways: eC(ex()),
    telemetry_gateways: eC(ex()),
    npu: eD(ex()),
    ipc: eD(ex())
});
const tb = eO([
    eA("plan"),
    eA("apply"),
    eA("management_plan"),
    eA("management_apply"),
    eA("reset_state"),
    eA("reconcile"),
    eA("retry")
]);
eO([
    eT({
        operation_ids: eC(em()),
        revision: eg()
    }),
    eT({
        started: eb(),
        mode: tu
    }),
    eT({
        reset: eb(),
        device: eg()
    }),
    eT({
        operation_ids: eC(em()),
        mode: tu,
        reconcile: eD(eb()),
        retry: eD(eb())
    }),
    eG
]), eT({
    action: tb,
    target: eg(),
    management: eD(eb()),
    item: eD(eg())
});
let ty = eT({
    error: eO([
        eg(),
        eT({
            code: eg(),
            message: eg()
        })
    ])
});
class tv extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function tw(e) {
    let t = ty.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new tv("rpc", e) : new tv(e.code, e.message);
    }
    return e;
}
let tx = eg(), tz = em(), tk = eb();
eT({
    optical_sn: tx,
    onu_id: tz,
    binding_generation: tx
}), eT({
    mqtt_mac: tx,
    binding_generation: tx
});
let tj = eT({
    mqtt_mac: tx,
    optical_sn: eU(tx),
    onu_id: eU(tz),
    binding_generation: tx,
    last_seen: tz,
    reason: tx
}), tC = {
    target: tx,
    request_id: eD(tx),
    output: eD(tx),
    output_truncated: tk,
    error: eD(tx)
};
const tS = eN("status", [
    eT({
        ...tC,
        status: eA("executed"),
        exit_code: eU(tz)
    }),
    eT({
        ...tC,
        status: eA("dispatched"),
        exit_code: eD(ek())
    }),
    eT({
        ...tC,
        status: eA("timeout"),
        exit_code: eD(ek())
    }),
    eT({
        ...tC,
        status: eA("error"),
        exit_code: eD(ek())
    })
]);
let tT = eT({
    target: tj,
    result: tS,
    binding_current: tk
}), t$ = eT({
    schema_version: tz,
    compressed_bytes: tz,
    decompressed_bytes: tz,
    fields: eR(tx, eT({
        value: eV(),
        member: tx,
        unit: eU(tx)
    })),
    members: eC(eT({
        name: tx,
        bytes: tz,
        encoding: tx,
        text: eU(tx),
        text_omitted: tk
    })),
    errors: eC(tx)
}), tO = eT({
    revision: tz,
    last_received: tz,
    last_processed_receipt: eU(tz),
    last_good: eU(tz),
    error: eU(tx),
    report: eU(t$)
}), tE = {
    schema_version: eA(1),
    target: tj,
    report: eU(tO)
};
const tN = eO([
    eT({
        ...tE,
        state: eL([
            "received",
            "report_unavailable"
        ])
    }),
    eT({
        ...tE,
        read_only: eA(!0)
    })
]), tP = eT({
    schema_version: eA(1),
    devices: eC(eT({
        optical_sn: tx,
        onu_id: tz,
        model: tx,
        optical_online: tk,
        can_execute: tk,
        mqtt: eU(tj),
        report_revision: eU(tz)
    })),
    sources: eC(tj)
}), tR = eT({
    schema_version: eA(1),
    operation: tT,
    accounts: eU(eC(eT({
        entry: eO([
            eA(0),
            eA(1),
            eA(2)
        ]),
        username: tx,
        active: tk
    }))),
    write_status: eL([
        "not_applicable",
        "accepted_and_saved",
        "unconfirmed"
    ])
}), tM = eT({
    schema_version: eA(1),
    operation: tT
});
let tL = eg(), tZ = em(), tA = eb(), tq = eD(tL), tD = eD(tZ), tJ = eD(tA);
const tU = eL([
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
]), tI = eL([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), tQ = eT({
    id: tL,
    name: eD(eU(tL)),
    kind: eL([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: tL,
    state: tL,
    reason: tq,
    revision: tq,
    current_revision: tJ,
    management_fresh: tJ,
    operation_id: tD,
    task_id: eD(eU(tZ)),
    updated_at: tD,
    changes: eD(eC(eT({
        name: tL,
        desired: tL
    })))
});
let tV = eT({
    state: tL,
    reason: tq,
    task_id: eD(eU(tZ)),
    instance: tD
});
const tF = eT({
    cwmp_id: tL,
    state: eL([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: tA,
    last_inform: eU(tZ),
    age_seconds: eU(tZ)
});
let tW = eT({
    state: eL([
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
    method: tq,
    reason: tq,
    mqtt_target: eU(tL),
    binding_source: tq,
    link_identity_error: eU(tL),
    mqtt_last_seen: eU(tZ),
    cwmp_id: tq,
    desired_version: tq,
    generation: tD,
    inflight: tJ,
    attempts: tD,
    next_retry_at: tD,
    updated_at: tD,
    settings_verified_at: eU(tZ),
    last_inform: eU(tZ),
    last_error: eD(eU(tL)),
    persistence_error: eD(eU(tL)),
    desired: eD(eU(eT({
        vlan: tZ,
        vlans: eC(tZ),
        priority: tZ,
        acs_url: tL
    }))),
    listener: eD(eT({
        enabled: tA,
        listen: tL,
        path: tL,
        error: eU(tL)
    })),
    endpoint_notice: tq,
    manual_steps: eD(eC(tL))
});
const tH = eN("state", [
    tW,
    function(e, t) {
        if (!x(t)) throw Error("Invalid input to extend: expected a plain object");
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
                return b(this, "shape", n), n;
            }
        });
        return j(e, r);
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
                    t[e] && (r[e] = eq ? new eq({
                        type: "optional",
                        innerType: n[e]
                    }) : n[e]);
                }
                else for(let e in n)r[e] = eq ? new eq({
                    type: "optional",
                    innerType: n[e]
                }) : n[e];
                return b(this, "shape", r), r;
            },
            checks: []
        });
        return j(e, r);
    }(tW), {
        state: eL([
            "pending",
            "unavailable"
        ]),
        reason: tL
    })
]), tK = eT({
    backend: eD(eT({
        configured: tL,
        effective: tL,
        available: eC(tL),
        reason: tL
    })),
    state: tU,
    operation_id: tD,
    device: tq,
    optical_sn: tq,
    cwmp_id: tq,
    revision: tq,
    mode: eD(eL([
        "apply",
        "plan"
    ])),
    started_at: tD,
    current_revision: tJ,
    management_fresh: tJ,
    reason: tq,
    error: tq,
    attempts: tD,
    next_retry_at: tD,
    reconcile_reason: tq,
    items: eC(tQ),
    cwmp_contract: eD(eT({
        state: tL,
        requested: tL,
        contract: eU(tL),
        reason: tL,
        cache_hit: tA,
        schema: tL,
        capabilities: eU(eT({
            wan: tL,
            wlan: tL,
            binding: tL
        }))
    })),
    wan_objects: eD(eR(tL, eV())),
    wan_lifecycle: eD(eR(tL, tV)),
    wan_stage: eD(eL([
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
    wifi_objects: eD(eT({
        owned: eC(tZ),
        pending: eU(tL),
        pending_instance: eU(tZ)
    })),
    wifi_lifecycle: eD(eR(tL, tV)),
    wifi_stage: eD(eL([
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
    wifi_cleanup: eD(eL([
        "disable",
        "preserve",
        "delete"
    ]))
});
let tB = eT({
    enabled: tA,
    mode: eL([
        "auto",
        "manual"
    ]),
    vlan: eC(tZ),
    priority: tZ,
    address: tL,
    acs_url: tL,
    port: tZ,
    path: tL,
    dhcp_enabled: tA
}), tX = eT({
    state: eL([
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
    error: eU(tL),
    inflight: tA,
    ready: tA,
    desired_version: eU(tL),
    applied_version: eU(tL),
    next_retry_at: tZ,
    attempts: tZ,
    desired: eU(tB),
    applied: eU(tB),
    previous: eU(tB),
    plan: eC(eT({
        operation: tL,
        key: tL,
        value: eC(tL)
    }))
});
const tG = eT({
    device: tL,
    name: eU(tL),
    group: eU(tL),
    group_name: eU(tL),
    template: eU(tL),
    template_name: eU(tL),
    optical_sn: tL,
    adapter: tL,
    omci_management: eT({
        state: tL,
        reason: eD(eU(tL))
    }),
    management: eU(tF),
    acs_bootstrap: tH,
    provisioning: tK,
    services: eC(tQ),
    ssids: eC(tQ),
    wifi_sync: tI
}), tY = eT({
    enabled: tA,
    mode: eL([
        "auto",
        "manual"
    ]),
    method: eA("diff"),
    revision: tL,
    triggers: eC(tL),
    interval_minutes: new eh({
        type: "number",
        coerce: !0,
        checks: [],
        ...C(void 0)
    }),
    error: eU(tL),
    devices: eC(tG),
    management_network: tX,
    omci_management: eV(),
    groups: eC(eT({
        id: tL,
        name: eU(tL),
        template: tL
    })),
    pending_devices: eC(tL)
}), t0 = eO([
    eT({
        valid: eA(!0),
        revision: tL,
        devices: tZ,
        error: eD(ek())
    }),
    eT({
        error: tL,
        valid: eD(ek()),
        revision: eD(ek()),
        devices: eD(ek())
    })
]), t2 = eT({
    restarting: eA(!0)
}), t1 = eO([
    eT({
        operation_ids: eC(tZ),
        revision: tL
    }),
    eT({
        started: eA(!0),
        mode: eL([
            "apply",
            "plan"
        ])
    }),
    eT({
        reset: eA(!0),
        device: tL
    }),
    eT({
        operation_ids: eC(tZ),
        mode: eL([
            "apply",
            "plan"
        ]),
        reconcile: tJ,
        retry: tJ
    })
]);
let t8 = eg(), t4 = em(), t5 = eU(t4), t3 = eR(t8, eT({
    source: t8,
    unit: t8,
    reason: eU(t8),
    raw: eU(t8),
    age_seconds: t5
}));
const t6 = eT({
    phase: eL([
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
    generation: t4,
    error: eU(t8)
}), t7 = eL([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let t9 = eT({
    model: t8,
    wavelength_tx_nm: t4,
    wavelength_rx_nm: t4,
    phy_rate_downlink_gbps: t4,
    phy_rate_uplink_gbps: t4,
    tx_power_dbm: t5,
    laser_bias_current_ma: t5,
    temperature_celsius: t5,
    vcc_voltage: t5,
    cdr_locked: eU(eb()),
    tx_enabled: eU(eb()),
    measurements: t3
}), ne = eT({
    equipment_id: eU(t8),
    hardware_version: eU(t8),
    software_images: eC(t8),
    omcc_version: t5,
    errors: eC(t8)
});
const nt = eT({
    onu_id: t4,
    vendor: t8,
    model: t8,
    serial_number: t8,
    state: t7,
    business_status: t6,
    management: eU(tF),
    provisioning: eU(tK),
    services: eC(tQ),
    ssids: eC(tQ),
    wifi_sync: tI,
    acs_bootstrap: eD(tH),
    identity: eU(ne),
    identity_age_seconds: t5,
    identity_current: eb(),
    fiber_distance_m: t5,
    ranging_delay_rtd_ns: t5,
    equalization_delay_bits: new eI({
        type: "catch",
        innerType: t5,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: t5,
    optical_tx_power_dbm: t5,
    firmware_version: t8,
    hardware_version: t8,
    uptime_seconds: t5,
    data_path: eT({
        interface: t8,
        gem_ports: eU(eC(t4)),
        vlan_id: t5,
        tx_bytes: t5,
        rx_bytes: t5,
        current_tx_kbps: t5,
        current_rx_kbps: t5,
        offload: eD(eT({
            enabled: eD(eU(eb())),
            routed_enabled: eD(eU(eb())),
            bridge_enabled: eD(eU(eb())),
            engine_attached: eD(eU(eb())),
            forwarding_verified: eD(eU(eb()))
        })),
        measurements: t3
    }),
    wifi_mesh: eT({
        channel_2g: t5,
        channel_5g: t5,
        bandwidth_5g: eU(t8),
        tx_power_pct: t5,
        measurements: t3
    }),
    connected_clients: eU(eC(eT({
        mac: t8,
        ip: t8,
        band: t8,
        rssi_dbm: t5,
        rx_rate_mbps: t5,
        tx_rate_mbps: t5
    }))),
    measurements: t3
});
let nn = eT({
    reserved_sn: eD(t8),
    port: t4,
    interface: t8,
    carrier: eb(),
    status: t8,
    onu_id: eD(t4),
    onu_sn: eD(t8),
    link_state: t8
});
const nr = eT({
    counters_valid: eD(eb()),
    packets_exact: eD(t8),
    bytes_exact: eD(t8),
    index: t8,
    state: t8,
    pkt_type: t8,
    orig_tuple: t8,
    new_tuple: t8,
    eth: t8,
    vlan: t8,
    packets: t4,
    bytes: t4
}), ni = eT({
    sampled_at_ms: eD(t4),
    errors: eD(eC(t8)),
    config_valid: eD(eb()),
    engine_valid: eD(eb()),
    mask_valid: eD(eb()),
    routed_mask_valid: eD(eb()),
    debug_valid: eD(eb()),
    flows_valid: eD(eb()),
    entries_valid: eD(eb()),
    counters_valid: eD(eb()),
    hooks_valid: eD(eb()),
    total_packets_exact: eD(t8),
    total_bytes_exact: eD(t8),
    supported: eb(),
    engine_attached: eb(),
    bridge_offload_enabled: eb(),
    bridge_offload_mask: t4,
    routed_offload_mask: t4,
    bridge_offload_debug: eb(),
    bridge: t8,
    active_ports: eC(t8),
    fw4_hooks_ready: eb(),
    total_entries: t4,
    bound_entries: t4,
    total_packets: t4,
    total_bytes: t4,
    bound_flows: eC(nr)
}), na = eT({
    ubus: eD(eR(t8, tf)),
    jobs: eD(tl),
    onu_pinning: eD(eT({
        desired: eR(t8, t4),
        active: eR(t8, t4),
        pending_restart: eb(),
        allocation_blocked: eb(),
        startup_error: eU(t8),
        config_error: eU(t8)
    })),
    fpga_status: t8,
    provisioning: eU(tY),
    optical_transceiver: t9,
    switch_ports: eC(nn),
    sub_gateways: eC(nt),
    telemetry_gateways: eC(eT({
        id: t8,
        last_seen_sec_ago: t4,
        last_payload_bytes: t4
    })),
    npu: eD(eU(ni))
});
eR(t8, eT({
    carrier: eD(eb()),
    mac: eD(t8),
    link: eD(eT({
        speed: eD(t4),
        duplex: eD(t8),
        autoneg: eD(eb())
    })),
    stats: eD(eR(t8, t4))
}));
const ns = {
    getCapabilities: {
        parse: (e)=>e8.parse(tw(e))
    },
    opticalStatus: tm,
    opticalSet: tm,
    getStatus: {
        parse: (e)=>na.parse(tw(e))
    },
    getSync: {
        parse: (e)=>tY.parse(tw(e))
    },
    configCheck: t0,
    npuStatus: tp,
    configReload: {
        parse: (e)=>tY.parse(tw(e))
    },
    restartService: {
        parse: (e)=>t2.parse(tw(e))
    },
    sync: {
        parse: (e)=>t1.parse(tw(e))
    },
    npuSet: tc,
    mibStart: {
        parse: (e)=>ts.parse(tw(e))
    },
    mibResult: {
        parse: (e)=>ta.parse(tw(e))
    },
    jobRelease: {
        parse: (e)=>to.parse(tw(e))
    },
    hl202List: {
        parse: (e)=>tP.parse(tw(e))
    },
    hl202Report: {
        parse: (e)=>ts.parse(tw(e))
    },
    hl202AccountsStart: {
        parse: (e)=>ts.parse(tw(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>ts.parse(tw(e))
    },
    hl202ExecStart: {
        parse: (e)=>ts.parse(tw(e))
    },
    jobResult: {
        parse: (e)=>ta.parse(tw(e))
    },
    getCalibration: {
        parse: (e)=>eX.parse(tw(e))
    },
    saveCalibration: {
        parse: (e)=>eY.parse(tw(e))
    },
    applyCalibration: {
        parse: (e)=>ts.parse(tw(e))
    }
};
function no() {
    var e;
    let n, r, i, a, s, o, l, c, d, p, u, g, h, m, f, b, y, v, w, x, z, k, j;
    return t ??= (e = L.rpc, n = e.declare({
        object: "fttr",
        method: "get_capabilities",
        reject: !0
    }), r = e.declare({
        object: "fttr",
        method: "optical_status",
        reject: !0
    }), i = e.declare({
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
    }), c = e.declare({
        object: "fttr",
        method: "config_reload",
        reject: !0
    }), d = e.declare({
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
    }), g = e.declare({
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
    }), m = e.declare({
        object: "fttr",
        method: "job_release",
        params: [
            "job"
        ],
        reject: !0
    }), f = e.declare({
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
        getCapabilities: async ()=>ns.getCapabilities.parse(await n()),
        opticalStatus: async ()=>ns.opticalStatus.parse(await r()),
        opticalSet: async (e)=>ns.opticalSet.parse(await i(e.enabled)),
        getStatus: async ()=>ns.getStatus.parse(await a()),
        getSync: async ()=>ns.getSync.parse(await s()),
        configCheck: async ()=>ns.configCheck.parse(await o()),
        npuStatus: async ()=>ns.npuStatus.parse(await l()),
        configReload: async ()=>ns.configReload.parse(await c()),
        restartService: async ()=>ns.restartService.parse(await d()),
        sync: async (e)=>ns.sync.parse(await p(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>ns.npuSet.parse(await u(e.enabled, e.bridge)),
        mibStart: async (e)=>ns.mibStart.parse(await g(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>ns.mibResult.parse(await h(e.job, e.chunk)),
        jobRelease: async (e)=>ns.jobRelease.parse(await m(e.job)),
        hl202List: async ()=>ns.hl202List.parse(await f()),
        hl202Report: async (e)=>ns.hl202Report.parse(await b(e.target)),
        hl202AccountsStart: async (e)=>ns.hl202AccountsStart.parse(await y(e.target)),
        hl202AccountUpdate: async (e)=>ns.hl202AccountUpdate.parse(await v(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>ns.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>ns.jobResult.parse(await x(e.job, e.chunk)),
        getCalibration: async ()=>ns.getCalibration.parse(await z()),
        saveCalibration: async (e)=>ns.saveCalibration.parse(await k(e.data)),
        applyCalibration: async ()=>ns.applyCalibration.parse(await j())
    });
}
const nl = async ()=>no().getCapabilities();
async function nc(e) {
    if (!(await nl()).pages[e]) throw Error(_("This page is not supported by the installed FTTR build."));
}
_("Ready"), _("Online"), _("Success"), _("Offline"), _("Error"), _("Failed"), _("Timeout"), _("Pending"), _("Running"), _("Unavailable"), _("Disabled"), _("Enabled");
const nd = (e)=>null == e || "" === e ? "\u2014" : String(e), np = (e)=>e ? new Date(1000 * e).toLocaleString() : "\u2014";
function nu(e, t, n) {
    return o("span", {
        class: `hl202-badge hl202-badge-${e}`,
        title: n,
        children: t
    });
}
async function n_(e) {
    let t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : tw, r = ts.parse(tw(e)), i = Date.now() + 330000, a = window.location.pathname, s = [], o = 0;
    try {
        for(let e = 0; e < 128;){
            if (window.location.pathname !== a) throw new tv("navigation", _("Result polling stopped after leaving the page. The backend job is not cancelled."));
            if (Date.now() > i) throw new tv("timeout", _("Job polling timed out; execution outcome is unknown. Do not automatically retry."));
            let l = await no().jobResult({
                job: r.job,
                chunk: e
            });
            if ("pending" === l.status) {
                await new Promise((e)=>window.setTimeout(e, 1000));
                continue;
            }
            if (!Number.isInteger(l.chunks) || l.chunks < 1 || l.chunks > 128 || l.chunk !== e || !Number.isInteger(l.bytes) || l.bytes < 1 || l.bytes > 4194304 || l.data.length > 43692) throw new tv("transport", _("Invalid job result"));
            if (t && (l.chunks !== t.chunks || l.bytes !== t.bytes)) throw new tv("transport", _("Inconsistent job result chunks"));
            t = {
                chunks: l.chunks,
                bytes: l.bytes
            };
            let c = Uint8Array.from(atob(l.data), (e)=>e.charCodeAt(0));
            if (c.length > 32768 || o + c.length > l.bytes) throw new tv("transport", _("Job result exceeds the transport limit"));
            if (s.push(c), o += c.length, ++e === l.chunks) {
                if (o !== l.bytes) throw new tv("transport", _("Incomplete job result"));
                let e = new Uint8Array(o), t = 0;
                for (let n of s)e.set(n, t), t += n.length;
                return n(JSON.parse(new TextDecoder("utf-8", {
                    fatal: !0
                }).decode(e)));
            }
        }
        throw new tv("transport", _("Too many result chunks"));
    } finally{
        await no().jobRelease({
            job: r.job
        }).catch(()=>{});
    }
}
const ng = async ()=>no().hl202List(), nh = async (e)=>tN.parse(await n_(await no().hl202Report({
        target: e
    }))), nm = async (e)=>tR.parse(await n_(await no().hl202AccountsStart({
        target: e
    }))), nf = async (e, t)=>tR.parse(await n_(await no().hl202AccountUpdate({
        target: e,
        kind: "password" === t.kind ? "account_set_password" : "account_set_active",
        entry: t.entry,
        password: t.password,
        active: t.active
    }))), nb = async (e, t, n)=>tM.parse(await n_(await no().hl202ExecStart({
        target: e,
        script: t,
        timeout_seconds: n
    })));
let ny = !1;
function nv() {
    var e, t;
    let n = null, r = o("div", {
        style: "margin:8px 0;display:flex;align-items:center;flex-wrap:wrap;gap:10px"
    }), i = o("div", {
        style: "overflow-x:auto;margin:8px 0"
    }), a = o("div", {
        style: "margin-top:10px"
    }), s = o("div", {
        style: "font-size:88%;color:#888;margin:6px 0",
        "aria-live": "polite"
    }), l = o("button", {
        type: "button",
        class: "cbi-button cbi-button-action",
        children: _("Read MQTT report")
    }), c = async (e)=>{
        let t = e || n;
        if (!t) {
            s.textContent = _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
            return;
        }
        if (ny) {
            s.textContent = _("Another operation is in progress.");
            return;
        }
        ny = !0, l.disabled = !0, s.textContent = _("Waiting for device result\u2026");
        try {
            var c, d, p, u, g, h, m, f, b, y, v, w, x, z, k, j, C, S, T, $, O, N;
            let e = await nh(t);
            if (JSON.stringify(t) !== JSON.stringify(n)) return;
            if (!e.report) {
                r.replaceChildren(), i.replaceChildren(), a.replaceChildren(), s.textContent = _("No MQTT report has been parsed yet.");
                return;
            }
            let l = e.report;
            if (r.replaceChildren((d = {
                children: [
                    (c = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Revision"),
                            ":"
                        ]
                    }, o("span", c)),
                    nu("info", `#${String(l.revision)}`)
                ]
            }, o("span", d)), (g = {
                children: [
                    (p = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Last received"),
                            ":"
                        ]
                    }, o("span", p)),
                    (u = {
                        children: np("number" == typeof l.last_received ? l.last_received : void 0)
                    }, o("strong", u))
                ]
            }, o("span", g)), (f = {
                children: [
                    (h = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Last good report"),
                            ":"
                        ]
                    }, o("span", h)),
                    (m = {
                        children: np("number" == typeof l.last_good ? l.last_good : void 0)
                    }, o("strong", m))
                ]
            }, o("span", f))), "string" == typeof l.error && r.append((b = {
                class: "alert-message warning",
                style: "width:100%;margin-top:6px",
                children: [
                    _("Latest report error"),
                    ": ",
                    l.error
                ]
            }, o("div", b))), l.report) {
                let e = l.report, t = e.fields;
                i.replaceChildren((j = {
                    class: "table",
                    style: "font-size:90%",
                    children: [
                        (z = {
                            children: (x = {
                                children: [
                                    (y = {
                                        children: _("Field")
                                    }, o("th", y)),
                                    (v = {
                                        children: _("Value")
                                    }, o("th", v)),
                                    (w = {
                                        children: _("Source member")
                                    }, o("th", w))
                                ]
                            }, o("tr", x))
                        }, o("thead", z)),
                        (k = {
                            children: Object.entries(t).map((e)=>{
                                var t, n, r, i, a, s, l;
                                let [c, d] = e, p = d.value, u = null === p ? "\u2014" : `${"object" == typeof p ? JSON.stringify(p) : String(p)}${d.unit ? ` ${d.unit}` : ""}`;
                                return "uptime_seconds" === c && "number" == typeof p && (u = function(e) {
                                    if (void 0 === e || !Number.isFinite(e) || e < 0) return "\u2014";
                                    let t = Math.floor(e / 86400), n = Math.floor(e % 86400 / 3600), r = Math.floor(e % 3600 / 60), i = [];
                                    return t > 0 && i.push(_("%d days").replace("%d", String(t))), (n > 0 || t > 0) && i.push(_("%d hours").replace("%d", String(n))), (r > 0 || n > 0 || t > 0) && i.push(_("%d minutes").replace("%d", String(r))), i.push(_("%d seconds").replace("%d", String(e % 60))), `${i.join(" ")} (${e} s)`;
                                }(p)), l = {
                                    children: [
                                        (n = {
                                            children: (t = {
                                                children: c
                                            }, o("code", t))
                                        }, o("td", n)),
                                        (i = {
                                            children: (r = {
                                                children: u
                                            }, o("strong", r))
                                        }, o("td", i)),
                                        (s = {
                                            children: (a = {
                                                class: "hl202-badge hl202-badge-neutral",
                                                children: nd(d.member)
                                            }, o("span", a))
                                        }, o("td", s))
                                    ]
                                }, o("tr", l);
                            })
                        }, o("tbody", k))
                    ]
                }, o("table", j)));
                let n = [];
                for (let t of e.members){
                    let e = (C = {
                        type: "button",
                        class: "fttr-btn-subtle",
                        style: "margin-left:8px",
                        onclick: (n)=>{
                            n.stopPropagation(), "string" == typeof t.text && (navigator.clipboard?.writeText(t.text), e.textContent = _("Copied to clipboard"), setTimeout(()=>{
                                e.textContent = _("Copy member text");
                            }, 1500));
                        },
                        children: _("Copy member text")
                    }, o("button", C));
                    n.push((N = {
                        style: "margin:6px 0;border:1px solid rgba(127,140,141,0.15);border-radius:4px;padding:4px 8px",
                        children: [
                            (S = {
                                style: "cursor:pointer;user-select:none;font-weight:600;font-size:90%",
                                children: [
                                    _("%s (%s bytes, %s)").format(String(t.name), String(t.bytes), String(t.encoding)),
                                    "string" == typeof t.text ? e : null
                                ]
                            }, o("summary", S)),
                            (O = {
                                style: "margin-top:6px",
                                children: "string" == typeof t.text ? (T = {
                                    class: "hl202-terminal-output",
                                    style: "max-height:16rem",
                                    children: t.text
                                }, o("pre", T)) : ($ = {
                                    style: "font-size:85%;color:#888;margin:4px 0",
                                    children: t.text_omitted ? _("Text omitted at the shared byte limit.") : _("Binary member; text is unavailable.")
                                }, o("p", $))
                            }, o("div", O))
                        ]
                    }, o("details", N)));
                }
                a.replaceChildren(...e.errors.map((e)=>{
                    var t;
                    return t = {
                        class: "alert-message warning",
                        children: e
                    }, o("div", t);
                }), ...n);
            } else i.replaceChildren(), a.replaceChildren();
            s.textContent = "";
        } catch (e) {
            s.textContent = e instanceof Error ? e.message : _("Request failed");
        } finally{
            ny = !1, l.disabled = !n;
        }
    };
    return l.addEventListener("click", ()=>{
        c();
    }), {
        element: (t = {
            class: "cbi-section hl202-panel-report",
            children: [
                (e = {
                    style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                    children: [
                        o("h3", {
                            style: "margin:0",
                            children: _("MQTT report")
                        }),
                        l
                    ]
                }, o("div", e)),
                s,
                r,
                i,
                a
            ]
        }, o("div", t)),
        setTarget (e) {
            JSON.stringify(e) !== JSON.stringify(n) && (r.replaceChildren(), i.replaceChildren(), a.replaceChildren(), s.textContent = ""), n = e, l.disabled = !e;
        },
        refresh: (e)=>c(e)
    };
}
let nw = L.view;
if (!("extend" in nw) || "function" != typeof nw.extend) throw Error("LuCI view extension is unavailable");
let main = Reflect.apply(nw.extend, nw, [
    {
        load: ()=>nc("hl202"),
        render: function() {
            var e, t, n, r, i, a, s, l, c, d, p, u, g;
            let h, m, f, b, y, v = o("select", {
                id: "hl202-device",
                class: "cbi-input-select",
                "aria-label": _("HL202 device"),
                style: "min-width:320px"
            }), w = o("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                children: _("Refresh devices")
            }), x = o("div", {
                style: "font-size:88%;color:#888;margin:6px 0",
                "aria-live": "polite"
            }), z = o("strong", {
                children: "\u2014"
            }), k = o("span", {
                class: "hl202-badge hl202-badge-neutral",
                style: "font-size:80%",
                children: "\u2014"
            }), j = o("span", {
                class: "hl202-badge hl202-badge-neutral",
                children: "\u2014"
            }), C = o("span", {
                class: "hl202-badge hl202-badge-neutral",
                children: "\u2014"
            }), S = o("span", {
                class: "hl202-badge hl202-badge-info",
                style: "font-size:80%",
                children: "\u2014"
            }), T = o("div", {
                class: "alert-message warning",
                style: "margin-top:8px",
                hidden: !0,
                children: _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
            }), $ = (n = {
                class: "cbi-section hl202-device-card",
                style: "margin-bottom:0",
                children: [
                    (t = {
                        class: "hl202-card-header",
                        children: [
                            o("div", {
                                class: "hl202-device-title",
                                children: [
                                    z,
                                    k
                                ]
                            }),
                            o("div", {
                                class: "hl202-device-badges",
                                children: [
                                    j,
                                    C,
                                    S
                                ]
                            }),
                            (e = {
                                class: "hl202-device-links",
                                children: o("a", {
                                    href: L.url("admin", "network", "fttr", "hardware"),
                                    class: "fttr-btn-subtle",
                                    children: [
                                        _("Open optical status and ONU/MIB details"),
                                        " \u2192"
                                    ]
                                })
                            }, o("div", e))
                        ]
                    }, o("div", t)),
                    T
                ]
            }, o("div", n)), O = nv(), N = (h = null, m = o("div", {
                style: "font-size:88%;color:#888;margin:6px 0",
                "aria-live": "polite"
            }), f = o("div", {
                style: "margin-top:10px;display:flex;flex-direction:column;gap:10px"
            }), (b = o("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                children: _("Read users")
            })).disabled = !L.hasViewPermission(), y = async ()=>{
                if (!h) {
                    m.textContent = _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
                    return;
                }
                if (ny) {
                    m.textContent = _("Another operation is in progress.");
                    return;
                }
                ny = !0, b.disabled = !0, m.textContent = _("Waiting for device result\u2026");
                let e = h;
                try {
                    let g = await nm(e);
                    if (JSON.stringify(e) !== JSON.stringify(h)) return;
                    f.replaceChildren();
                    let b = g.operation, y = b.result;
                    if ("timeout" === y.status ? m.textContent = _("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.") : m.textContent = b.binding_current ? y.error ?? (null === g.accounts ? _("Account data is unavailable.") : "") : _("Device binding changed; this result is stale."), g.accounts && b.binding_current) {
                        let m = [];
                        for (let f of g.accounts){
                            var t, n, r, i, a, s, l, c, d, p, u;
                            let g = f.entry, b = f.active, y = (t = {
                                class: `hl202-badge ${b ? "hl202-badge-success" : "hl202-badge-neutral"}`,
                                style: "font-size:80%",
                                children: b ? _("Enabled") : _("Disabled")
                            }, o("span", t)), v = (n = {
                                type: "password",
                                class: "cbi-input-text",
                                placeholder: _("New password"),
                                autocomplete: "new-password",
                                style: "width:180px"
                            }, o("input", n)), w = (r = {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                children: _("Set password")
                            }, o("button", r)), x = (i = {
                                type: "button",
                                class: `cbi-button ${b ? "cbi-button-neutral" : "cbi-button-apply"}`,
                                children: b ? _("Disable") : _("Enable")
                            }, o("button", i));
                            w.disabled = x.disabled = !L.hasViewPermission();
                            let z = (a = {
                                style: "font-size:82%;margin-top:4px",
                                "aria-live": "polite"
                            }, o("div", a));
                            w.addEventListener("click", async ()=>{
                                if (!h || ny || JSON.stringify(e) !== JSON.stringify(h)) return;
                                let t = v.value;
                                if (!t) {
                                    z.textContent = _("Enter a non-empty password.");
                                    return;
                                }
                                v.value = "", ny = !0, w.disabled = x.disabled = !0, z.textContent = _("Waiting for device result\u2026");
                                try {
                                    let n = await nf(e, {
                                        entry: g,
                                        kind: "password",
                                        password: t,
                                        active: b
                                    });
                                    if (JSON.stringify(e) !== JSON.stringify(h)) return;
                                    let r = n.operation, i = r.result;
                                    r.binding_current && "accepted_and_saved" === n.write_status ? z.textContent = _("Password accepted and saved; web login permission is not verified.") : z.textContent = i.error ?? _("Execution outcome is unknown. Do not automatically retry.");
                                } catch (e) {
                                    z.textContent = e instanceof Error ? e.message : _("Request failed");
                                } finally{
                                    ny = !1, w.disabled = x.disabled = !L.hasViewPermission();
                                }
                            }), x.addEventListener("click", async ()=>{
                                if (h && !ny && JSON.stringify(e) === JSON.stringify(h)) {
                                    ny = !0, w.disabled = x.disabled = !0, z.textContent = _("Waiting for device result\u2026");
                                    try {
                                        let t = !b, n = await nf(e, {
                                            entry: g,
                                            kind: "active",
                                            password: "",
                                            active: t
                                        });
                                        if (JSON.stringify(e) !== JSON.stringify(h)) return;
                                        let r = n.accounts?.find((e)=>e.entry === g);
                                        if (!n.operation.binding_current || "accepted_and_saved" !== n.write_status || !r) {
                                            z.textContent = n.operation.result.error ?? _("Execution outcome is unknown. Refresh users before retrying.");
                                            return;
                                        }
                                        b = r.active, y.className = `hl202-badge ${b ? "hl202-badge-success" : "hl202-badge-neutral"}`, y.textContent = b ? _("Enabled") : _("Disabled"), x.className = `cbi-button ${b ? "cbi-button-neutral" : "cbi-button-apply"}`, x.textContent = b ? _("Disable") : _("Enable"), z.textContent = `${String(n.write_status)}; ${_("Refresh users to read the current state.")}`;
                                    } catch (e) {
                                        z.textContent = e instanceof Error ? e.message : _("Request failed");
                                    } finally{
                                        ny = !1, w.disabled = x.disabled = !L.hasViewPermission();
                                    }
                                }
                            }), m.push((u = {
                                class: "cbi-section",
                                style: "margin:0;padding:10px 14px;border:1px solid rgba(127,140,141,0.2);border-radius:5px",
                                children: [
                                    (p = {
                                        style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                                        children: [
                                            (c = {
                                                style: "display:flex;align-items:center;gap:8px",
                                                children: [
                                                    (s = {
                                                        style: "font-size:105%",
                                                        children: f.username
                                                    }, o("strong", s)),
                                                    (l = {
                                                        style: "font-size:80%;color:#888",
                                                        children: _("(Entry %s)").replace("%s", String(g))
                                                    }, o("span", l)),
                                                    y
                                                ]
                                            }, o("div", c)),
                                            (d = {
                                                style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px",
                                                children: [
                                                    v,
                                                    w,
                                                    x
                                                ]
                                            }, o("div", d))
                                        ]
                                    }, o("div", p)),
                                    z
                                ]
                            }, o("div", u)));
                        }
                        f.replaceChildren(...m);
                    }
                } catch (e) {
                    m.textContent = e instanceof Error ? e.message : _("Request failed");
                } finally{
                    ny = !1, b.disabled = !h || !L.hasViewPermission();
                }
            }, b.addEventListener("click", ()=>{
                y();
            }), {
                element: (g = {
                    class: "cbi-section hl202-panel-accounts",
                    children: [
                        (u = {
                            style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:6px",
                            children: [
                                o("h3", {
                                    style: "margin:0",
                                    children: _("User management")
                                }),
                                b
                            ]
                        }, o("div", u)),
                        o("p", {
                            style: "font-size:85%;color:#888;margin:4px 0",
                            children: _("Password writes are accepted and saved by the device; this does not prove web login permission. Existing permission masks are preserved.")
                        }),
                        m,
                        f
                    ]
                }, o("div", g)),
                setTarget (e) {
                    JSON.stringify(e) !== JSON.stringify(h) && (f.replaceChildren(), m.textContent = ""), h = e, b.disabled = !e || !L.hasViewPermission();
                },
                refresh: ()=>y()
            }), P = function() {
                var e, t, n, r;
                let i = null, a = o("div", {
                    style: "font-size:88%;color:#666;margin:4px 0"
                }), s = o("textarea", {
                    id: "hl202-script",
                    rows: 8,
                    class: "hl202-terminal-textarea",
                    spellcheck: !1,
                    "aria-label": _("Remote shell command"),
                    placeholder: _("# Enter shell commands to execute on the selected sub-gateway (Ctrl + Enter to execute)...")
                }), l = o("input", {
                    type: "number",
                    id: "hl202-timeout",
                    min: "1",
                    max: "300",
                    value: "20",
                    class: "cbi-input-text",
                    style: "width:70px;text-align:center",
                    "aria-label": _("Timeout in seconds")
                }), c = o("button", {
                    type: "button",
                    class: "cbi-button cbi-button-apply",
                    style: "font-weight:600",
                    children: _("Execute on selected HL202")
                });
                c.disabled = !L.hasViewPermission();
                let d = o("div", {
                    style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px"
                }), p = o("pre", {
                    class: "hl202-terminal-output",
                    style: "min-height:4rem;display:none",
                    children: _("# Waiting for commands...")
                }), u = o("button", {
                    type: "button",
                    class: "fttr-btn-subtle",
                    onclick: ()=>{
                        p.textContent && (navigator.clipboard?.writeText(p.textContent), u.textContent = _("Copied to clipboard"), setTimeout(()=>{
                            u.textContent = _("Copy output");
                        }, 1500));
                    },
                    children: _("Copy output")
                }), g = o("button", {
                    type: "button",
                    class: "fttr-btn-subtle",
                    onclick: ()=>{
                        p.textContent = "", p.style.display = "none", d.replaceChildren();
                    },
                    children: _("Clear output")
                }), h = async ()=>{
                    var e, t, n, r, a, h, m, f, b, y, v;
                    if (!i) return void d.replaceChildren(o("div", {
                        class: "alert-message warning",
                        children: _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
                    }));
                    if (ny) return void d.replaceChildren(o("div", {
                        class: "alert-message warning",
                        children: _("Another operation is in progress.")
                    }));
                    let w = Number(l.value);
                    if (!Number.isInteger(w) || w < 1 || w > 300) return void d.replaceChildren(o("div", {
                        class: "alert-message warning",
                        children: _("Timeout must be 1\u2013300 seconds.")
                    }));
                    let x = s.value.trim();
                    if (!x || x.includes("\0") || new TextEncoder().encode(x).length > 65536) return void d.replaceChildren(o("div", {
                        class: "alert-message warning",
                        children: _("Enter a non-empty UTF-8 script up to 64 KiB without NUL characters.")
                    }));
                    ny = !0, c.disabled = !0, p.style.display = "block", p.textContent = `# [${new Date().toLocaleTimeString()}] ${_("Dispatching to %s (timeout: %s s)...").format(i.optical_sn, String(w))}\n`, d.replaceChildren(nu("info", _("Waiting for device result\u2026")));
                    let z = Date.now(), k = i;
                    try {
                        let l = await nb(k, s.value, w);
                        if (JSON.stringify(k) !== JSON.stringify(i)) return;
                        let c = ((Date.now() - z) / 1000).toFixed(2), v = l.operation, x = v.result, j = x.status, C = x.exit_code, S = v.binding_current && !x.error && "executed" === j && 0 === C, T = nu(S ? "success" : "timeout" === j ? "warning" : "danger", S ? _("Success") : "timeout" === j ? _("Timeout") : `${_("Exit code")} ${String(C ?? j)}`);
                        d.replaceChildren(T, (n = {
                            children: [
                                (e = {
                                    style: "color:#888",
                                    children: [
                                        _("Exit code"),
                                        ":"
                                    ]
                                }, o("span", e)),
                                " ",
                                (t = {
                                    children: String(C ?? "\u2014")
                                }, o("code", t))
                            ]
                        }, o("span", n)), (h = {
                            children: [
                                (r = {
                                    style: "color:#888",
                                    children: [
                                        _("Duration"),
                                        ":"
                                    ]
                                }, o("span", r)),
                                " ",
                                (a = {
                                    children: [
                                        c,
                                        " s"
                                    ]
                                }, o("strong", a))
                            ]
                        }, o("span", h)), (b = {
                            children: [
                                (m = {
                                    style: "color:#888",
                                    children: [
                                        _("Request ID"),
                                        ":"
                                    ]
                                }, o("span", m)),
                                " ",
                                (f = {
                                    children: String(x.request_id ?? "\u2014")
                                }, o("code", f))
                            ]
                        }, o("span", b)), (y = {
                            style: "margin-left:auto;display:flex;gap:6px",
                            children: [
                                u,
                                g
                            ]
                        }, o("div", y)));
                        let $ = [];
                        v.binding_current || $.push(_("Device binding changed; this result is stale.")), ("timeout" === j || "dispatched" === j) && $.push(_("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.")), "string" == typeof x.output && x.output.length && $.push(x.output), "string" == typeof x.error && x.error.length && $.push(`[STDERR]\n${x.error}`), !0 === x.output_truncated && $.push(`\n[!] ${_("Output was truncated at the byte limit.")}`), 0 === $.length && $.push(_("No output returned.")), p.textContent = $.join("\n");
                    } catch (t) {
                        let e = ((Date.now() - z) / 1000).toFixed(2);
                        d.replaceChildren(nu("danger", _("Failed")), (v = {
                            children: [
                                o("span", {
                                    style: "color:#888",
                                    children: [
                                        _("Duration"),
                                        ":"
                                    ]
                                }),
                                " ",
                                e,
                                " s"
                            ]
                        }, o("span", v)), o("div", {
                            style: "margin-left:auto;display:flex;gap:6px",
                            children: [
                                u,
                                g
                            ]
                        })), p.textContent = `[ERROR] ${t instanceof Error ? t.message : _("Request failed")}`;
                    } finally{
                        ny = !1, c.disabled = !i || !L.hasViewPermission();
                    }
                };
                c.addEventListener("click", ()=>{
                    h();
                }), s.addEventListener("keydown", (e)=>{
                    (e.ctrlKey || e.metaKey) && "Enter" === e.key && (e.preventDefault(), h());
                });
                let m = [
                    {
                        label: `uptime (${_("Load")})`,
                        cmd: "uptime"
                    },
                    {
                        label: `meminfo (${_("Memory")})`,
                        cmd: "cat /proc/meminfo | head -n 10"
                    },
                    {
                        label: "cpuinfo (CPU)",
                        cmd: "cat /proc/cpuinfo | grep 'model name\\|processor'"
                    },
                    {
                        label: `ifconfig (${_("Network")})`,
                        cmd: "ifconfig"
                    },
                    {
                        label: `ps (${_("Processes")})`,
                        cmd: "ps"
                    },
                    {
                        label: `dmesg (${_("Kernel log")})`,
                        cmd: "dmesg | tail -n 25"
                    }
                ], f = (e = {
                    class: "hl202-snippets",
                    children: [
                        o("span", {
                            style: "font-size:80%;color:#888;margin-right:2px",
                            children: [
                                _("Quick diagnostic commands"),
                                ":"
                            ]
                        }),
                        m.map((e)=>o("button", {
                                type: "button",
                                class: "hl202-snippet-tag",
                                onclick: ()=>{
                                    s.value = e.cmd, s.focus();
                                },
                                children: e.label
                            }))
                    ]
                }, o("div", e));
                return {
                    element: (r = {
                        class: "cbi-section hl202-panel-console",
                        children: [
                            o("h3", {
                                style: "margin-bottom:4px",
                                children: _("Raw command console")
                            }),
                            o("p", {
                                style: "font-size:85%;color:#888;margin-top:0;margin-bottom:6px",
                                children: _("Shell executes on the selected ONU. Timeout does not cancel execution. Raw output can contain secrets.")
                            }),
                            a,
                            f,
                            o("div", {
                                class: "hl202-terminal",
                                style: "margin-bottom:8px",
                                children: s
                            }),
                            (n = {
                                style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:8px",
                                children: [
                                    (t = {
                                        htmlFor: "hl202-timeout",
                                        style: "display:flex;align-items:center;gap:6px;font-size:90%",
                                        children: [
                                            o("span", {
                                                children: [
                                                    _("Timeout in seconds"),
                                                    ":"
                                                ]
                                            }),
                                            l
                                        ]
                                    }, o("label", t)),
                                    o("span", {
                                        style: "font-size:82%;color:#888",
                                        children: _("(Shortcut: %s)").replace("%s", "Ctrl + Enter")
                                    }),
                                    o("div", {
                                        style: "margin-left:auto",
                                        children: c
                                    })
                                ]
                            }, o("div", n)),
                            o("div", {
                                style: "margin-top:10px",
                                children: [
                                    d,
                                    p
                                ]
                            })
                        ]
                    }, o("div", r)),
                    setTarget (e) {
                        var t;
                        JSON.stringify(e) !== JSON.stringify(i) && (d.replaceChildren(), p.textContent = "", p.style.display = "none"), i = e, c.disabled = !e || !L.hasViewPermission(), e ? a.replaceChildren((t = {
                            children: [
                                o("span", {
                                    style: "color:#888",
                                    children: [
                                        _("Target"),
                                        ":"
                                    ]
                                }),
                                " ",
                                o("strong", {
                                    children: e.optical_sn
                                }),
                                " (ONU",
                                " ",
                                e.onu_id,
                                ") \xb7 ",
                                o("code", {
                                    children: [
                                        "gen: ",
                                        e.binding_generation
                                    ]
                                })
                            ]
                        }, o("span", t))) : a.replaceChildren(o("span", {
                            style: "color:#e74c3c",
                            children: _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
                        }));
                    }
                };
            }(), R = o("select", {
                id: "hl202-source",
                class: "cbi-input-select",
                "aria-label": _("Read-only MQTT source"),
                style: "min-width:240px"
            }), M = o("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                style: "margin-left:8px",
                children: _("Inspect source report (read-only)")
            }), Z = o("div", {
                style: "margin-top:10px"
            }), A = [], q = o("pre", {
                style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto"
            }), D = (a = {
                class: "cbi-section hl202-panel-sources",
                children: [
                    o("h3", {
                        style: "margin-bottom:4px",
                        children: _("MQTT source identity")
                    }),
                    o("p", {
                        style: "font-size:85%;color:#888;margin-top:0;margin-bottom:8px",
                        children: _("Inspect read-only MQTT source reports and diagnostics for unbound or unselected devices.")
                    }),
                    (r = {
                        style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                        children: [
                            o("label", {
                                htmlFor: "hl202-source",
                                children: [
                                    _("Read-only MQTT source"),
                                    ": ",
                                    R
                                ]
                            }),
                            M
                        ]
                    }, o("div", r)),
                    Z,
                    (i = {
                        style: "margin-top:10px",
                        children: [
                            o("summary", {
                                style: "cursor:pointer;font-size:85%;color:#888;font-weight:600",
                                children: _("Raw source observations (JSON)")
                            }),
                            o("div", {
                                style: "margin-top:6px",
                                children: q
                            })
                        ]
                    }, o("details", i))
                ]
            }, o("div", a)), J = "report", U = [
                {
                    id: "report",
                    label: _("MQTT report")
                },
                {
                    id: "accounts",
                    label: _("User management")
                },
                {
                    id: "console",
                    label: _("Raw command console")
                },
                {
                    id: "sources",
                    label: _("MQTT source identity")
                }
            ], I = new Map(), Q = (s = {
                class: "cbi-tabmenu",
                style: "margin-top:14px;margin-bottom:0",
                children: U.map((e)=>{
                    var t;
                    let n = (t = {
                        class: J === e.id ? "cbi-tab" : "cbi-tab-disabled",
                        "data-tab": e.id,
                        children: o("a", {
                            href: `#tab-${e.id}`,
                            onclick: (t)=>{
                                t.preventDefault();
                                var n = e.id;
                                for (let [e, t] of (J = n, I))t.className = e === n ? "cbi-tab" : "cbi-tab-disabled";
                                O.element.hidden = "report" !== n, N.element.hidden = "accounts" !== n, P.element.hidden = "console" !== n, D.hidden = "sources" !== n, window.dispatchEvent(new Event("resize"));
                            },
                            children: e.label
                        })
                    }, o("li", t));
                    return I.set(e.id, n), n;
                })
            }, o("ul", s));
            O.element.hidden = !1, N.element.hidden = !0, P.element.hidden = !0, D.hidden = !0;
            let V = o("div", {
                id: "hl202-panels-container",
                children: [
                    O.element,
                    N.element,
                    P.element,
                    D
                ]
            }), F = [], W = "", H = "", K = ()=>{
                let e = v.value, t = F.find((t)=>t.optical_sn === e);
                if (!t) {
                    z.textContent = _("No HL202 optical devices were found."), k.textContent = "\u2014", j.textContent = "\u2014", C.textContent = "\u2014", S.textContent = "\u2014", T.hidden = !0, O.setTarget(null), N.setTarget(null), P.setTarget(null);
                    return;
                }
                if (z.textContent = `${t.optical_sn} (ONU ${t.onu_id})`, k.textContent = t.model || "HL202", t.optical_online ? (j.className = "hl202-badge hl202-badge-success", j.textContent = _("Optical online")) : (j.className = "hl202-badge hl202-badge-danger", j.textContent = _("Optical offline")), t.can_execute && t.mqtt) {
                    C.className = "hl202-badge hl202-badge-success", C.textContent = _("MQTT ready"), S.textContent = `gen: ${t.mqtt.binding_generation}`, S.hidden = !1, T.hidden = !0;
                    let e = {
                        optical_sn: t.optical_sn,
                        onu_id: t.onu_id,
                        binding_generation: t.mqtt.binding_generation
                    };
                    O.setTarget(e), N.setTarget(e), P.setTarget(e);
                } else C.className = "hl202-badge hl202-badge-warning", C.textContent = _("MQTT unavailable"), S.hidden = !0, T.hidden = !1, O.setTarget(null), N.setTarget(null), P.setTarget(null);
            }, B = async ()=>{
                w.disabled = !0, x.textContent = _("Loading devices\u2026");
                try {
                    let t = await ng(), n = t.devices;
                    F = n;
                    let r = n.map((e)=>`${e.optical_sn}:${e.onu_id}:${e.optical_online}:${e.can_execute}:${e.report_revision}:${e.mqtt?.binding_generation}`).join("|");
                    if (r !== W) {
                        W = r;
                        let e = v.value;
                        v.replaceChildren(...n.map((e)=>{
                            var t;
                            return t = {
                                value: e.optical_sn,
                                children: nd(`${e.model} / ${e.optical_sn} / ONU ${e.onu_id} \u{2014} ${e.can_execute ? _("MQTT ready") : _("MQTT unavailable")}; ${e.optical_online ? _("Optical online") : _("Optical offline")}`)
                            }, o("option", t);
                        })), n.some((t)=>t.optical_sn === e) && (v.value = e);
                    }
                    x.textContent = n.length ? _("Select a device to inspect reports and run operations.") : _("No HL202 optical devices were found."), q.textContent = JSON.stringify(t.sources, null, 2);
                    let i = R.value, a = [];
                    for (let n of (R.replaceChildren(), t.sources)){
                        var e;
                        a.push({
                            mqtt_mac: n.mqtt_mac,
                            binding_generation: n.binding_generation
                        }), R.append((e = {
                            value: n.mqtt_mac,
                            children: nd(`${n.mqtt_mac} \u{2014} ${String(n.reason)}`)
                        }, o("option", e)));
                    }
                    A = a, a.some((e)=>e.mqtt_mac === i) && (R.value = i), M.disabled = 0 === a.length, K();
                    let s = n.find((e)=>e.optical_sn === v.value);
                    s?.can_execute && null !== s.report_revision && `${s.optical_sn}:${s.mqtt?.binding_generation}:${s.report_revision}` !== H && !ny && (H = `${s.optical_sn}:${s.mqtt?.binding_generation}:${s.report_revision}`, O.refresh());
                } catch (e) {
                    F = [], K(), x.textContent = e instanceof Error ? e.message : _("Request failed");
                } finally{
                    w.disabled = !1;
                }
            };
            v.addEventListener("change", K), M.addEventListener("click", ()=>{
                let e = A.find((e)=>e.mqtt_mac === R.value);
                if (Z.replaceChildren(), e) {
                    let t = nv();
                    t.setTarget(e), Z.append(t.element), t.refresh(e);
                }
            }), w.addEventListener("click", ()=>{
                B();
            }), B();
            let X = (p = {
                class: "cbi-map hl202-management",
                children: [
                    o("style", {
                        children: `
				.hl202-management {
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
					.hl202-management {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .hl202-management,
				[data-theme="dark"] .hl202-management {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-danger-color: #e74c3c;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				.hl202-management .hl202-badge {
					display: inline-block;
					padding: 0.18em 0.55em;
					font-size: 85%;
					font-weight: 600;
					line-height: 1.25;
					border-radius: 3px;
					white-space: nowrap;
					text-align: center;
				}

				.hl202-management .hl202-badge-success {
					background: var(--fttr-success-bg);
					color: var(--fttr-success-color);
					border: 1px solid var(--fttr-success-border);
				}

				.hl202-management .hl202-badge-warning {
					background: var(--fttr-warning-bg);
					color: var(--fttr-warning-color);
					border: 1px solid var(--fttr-warning-border);
				}

				.hl202-management .hl202-badge-danger {
					background: var(--fttr-danger-bg);
					color: var(--fttr-danger-color);
					border: 1px solid var(--fttr-danger-border);
				}

				.hl202-management .hl202-badge-info {
					background: var(--fttr-info-bg);
					color: var(--fttr-info-color);
					border: 1px solid var(--fttr-info-border);
				}

				.hl202-management .hl202-badge-neutral {
					background: var(--fttr-neutral-bg);
					color: var(--fttr-neutral-color);
					border: 1px solid var(--fttr-neutral-border);
				}

				.hl202-management .hl202-device-card {
					padding: 12px 16px;
					border: 1px solid rgba(127, 140, 141, 0.2);
					border-radius: 6px;
					background: rgba(127, 140, 141, 0.04);
					margin-top: 10px;
					margin-bottom: 0;
				}

				.hl202-management .hl202-card-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-wrap: wrap;
					gap: 12px;
				}

				.hl202-management .hl202-device-title {
					display: flex;
					align-items: center;
					gap: 8px;
				}

				.hl202-management .hl202-device-badges {
					display: flex;
					align-items: center;
					gap: 8px;
					flex-wrap: wrap;
				}

				.hl202-management .cbi-tabmenu {
					margin-top: 14px;
					margin-bottom: 0;
					user-select: none;
				}

				.hl202-management #hl202-panels-container > .cbi-section {
					margin-top: 0;
					border-top-left-radius: 0;
				}

				.hl202-management .hl202-terminal {
					background: #1e1e1e;
					color: #d4d4d4;
					font-family: Consolas, Monaco, "Courier New", monospace;
					border: 1px solid #333;
					border-radius: 4px;
					box-sizing: border-box;
				}

				.hl202-management .hl202-terminal-textarea {
					width: 100%;
					padding: 10px 12px;
					background: transparent;
					color: inherit;
					font-family: inherit;
					font-size: 90%;
					border: none;
					resize: vertical;
					outline: none;
					line-height: 1.45;
				}

				.hl202-management .hl202-terminal-output {
					background: #141414;
					color: #38ef7d;
					font-family: Consolas, Monaco, "Courier New", monospace;
					font-size: 88%;
					padding: 12px 14px;
					border-radius: 4px;
					border: 1px solid #2a2a2a;
					max-height: 28rem;
					overflow: auto;
					white-space: pre-wrap;
					word-break: break-all;
					line-height: 1.4;
					margin-top: 8px;
				}

				.hl202-management .hl202-snippets {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					gap: 6px;
					margin-bottom: 8px;
				}

				.hl202-management .hl202-snippet-tag {
					font-size: 80%;
					padding: 2px 8px;
					border-radius: 3px;
					border: 1px solid rgba(127, 140, 141, 0.35);
					background: rgba(127, 140, 141, 0.08);
					color: inherit;
					cursor: pointer;
					transition: all 0.15s ease;
				}

				.hl202-management .hl202-snippet-tag:hover {
					background: rgba(52, 152, 219, 0.15);
					border-color: rgba(52, 152, 219, 0.4);
					color: #2980b9;
				}

				.hl202-management .fttr-btn-subtle {
					font-size: 82%;
					padding: 2px 8px;
					border: 1px solid rgba(127, 140, 141, 0.35);
					background: transparent;
					color: inherit;
					border-radius: 4px;
					cursor: pointer;
					text-decoration: none;
				}

				.hl202-management .fttr-btn-subtle:hover {
					background: rgba(52, 152, 219, 0.1);
					border-color: rgba(52, 152, 219, 0.4);
					color: #2980b9;
				}

				.hl202-management :is(.cbi-dropdown,.fluent-custom-select) {
					width: 100%;
					max-width: 100%;
					min-width: 0 !important;
					box-sizing: border-box;
				}

				.hl202-management :is(.cbi-dropdown,.fluent-custom-select) > ul > li {
					white-space: normal;
					overflow-wrap: anywhere;
				}
				`
                    }),
                    o("h2", {
                        children: _("HL202 sub-gateway management")
                    }),
                    (d = {
                        class: "cbi-section",
                        children: [
                            (c = {
                                style: "display:flex;align-items:center;flex-wrap:wrap;gap:10px",
                                children: [
                                    (l = {
                                        htmlFor: "hl202-device",
                                        style: "display:flex;align-items:center;gap:8px",
                                        children: [
                                            o("strong", {
                                                children: [
                                                    _("HL202 device"),
                                                    ":"
                                                ]
                                            }),
                                            v
                                        ]
                                    }, o("label", l)),
                                    w
                                ]
                            }, o("div", c)),
                            x,
                            $
                        ]
                    }, o("div", d)),
                    Q,
                    V
                ]
            }, o("div", p)), G = async ()=>{
                X.isConnected && (await B(), X.isConnected && window.setTimeout(()=>void G(), 5000));
            };
            return window.setTimeout(()=>void G(), 5000), X;
        },
        handleSave: null,
        handleSaveApply: null,
        handleReset: null
    }
]);

return main;