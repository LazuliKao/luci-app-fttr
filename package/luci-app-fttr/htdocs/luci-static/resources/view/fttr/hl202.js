'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, n, r, i, o;
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
function l(e, t, n) {
    function r(n, r) {
        if (n._zod || Object.defineProperty(n, "_zod", {
            value: {
                def: r,
                constr: a,
                traits: new Set()
            },
            enumerable: !1
        }), n._zod.traits.has(e)) return;
        n._zod.traits.add(e), t(n, r);
        let i = a.prototype, o = Object.keys(i);
        for(let e = 0; e < o.length; e++){
            let t = o[e];
            t in n || (n[t] = i[t].bind(n));
        }
    }
    let i = n?.Parent ?? Object;
    class o extends i {
    }
    function a(e) {
        var t;
        let i = n?.Parent ? new o() : this;
        for (let n of (r(i, e), (t = i._zod).deferred ?? (t.deferred = []), i._zod.deferred))n();
        return i;
    }
    return Object.defineProperty(o, "name", {
        value: e
    }), Object.defineProperty(a, "init", {
        value: r
    }), Object.defineProperty(a, Symbol.hasInstance, {
        value: (t)=>!!n?.Parent && t instanceof n.Parent || t?._zod?.traits?.has(e)
    }), Object.defineProperty(a, "name", {
        value: e
    }), a;
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
function u(e) {
    return e && Object.assign(d, e), d;
}
function p(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function h(e) {
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
function m(e) {
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const f = Symbol("evaluating");
function g(e, t, n) {
    let r;
    Object.defineProperty(e, t, {
        get () {
            if (r !== f) return void 0 === r && (r = f, r = n()), r;
        },
        set (n) {
            Object.defineProperty(e, t, {
                value: n
            });
        },
        configurable: !0
    });
}
const b = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function y(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
const v = new Set([
    "string",
    "number",
    "symbol"
]);
function w(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function x(e) {
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
function z(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let n = t; n < e.issues.length; n++)if (e.issues[n]?.continue !== !0) return !0;
    return !1;
}
function T(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function C(e) {
    return "string" == typeof e ? e : e?.message;
}
function k(e, t, n) {
    let r = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (r.message = C(e.inst?._zod.def?.error?.(e)) ?? C(t?.error?.(e)) ?? C(n.customError?.(e)) ?? C(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
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
}, S = l("$ZodError", $), O = l("$ZodError", $, {
    Parent: Error
}), j = (t = O, (e, n, r, i)=>{
    let o = r ? Object.assign(r, {
        async: !1
    }) : {
        async: !1
    }, a = e._zod.run({
        value: n,
        issues: []
    }, o);
    if (a instanceof Promise) throw new c();
    if (a.issues.length) {
        let e = new (i?.Err ?? t)(a.issues.map((e)=>k(e, o, u())));
        throw b(e, i?.callee), e;
    }
    return a.value;
}), N = (n = O, async (e, t, r, i)=>{
    let o = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, a = e._zod.run({
        value: t,
        issues: []
    }, o);
    if (a instanceof Promise && (a = await a), a.issues.length) {
        let e = new (i?.Err ?? n)(a.issues.map((e)=>k(e, o, u())));
        throw b(e, i?.callee), e;
    }
    return a.value;
}), P = (r = O, (e, t, n)=>{
    let i = n ? {
        ...n,
        async: !1
    } : {
        async: !1
    }, o = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (o instanceof Promise) throw new c();
    return o.issues.length ? {
        success: !1,
        error: new (r ?? S)(o.issues.map((e)=>k(e, i, u())))
    } : {
        success: !0,
        data: o.value
    };
}), M = (i = O, async (e, t, n)=>{
    let r = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, r);
    return o instanceof Promise && (o = await o), o.issues.length ? {
        success: !1,
        error: new i(o.issues.map((e)=>k(e, r, u())))
    } : {
        success: !0,
        data: o.value
    };
}), R = /^-?\d+(?:\.\d+)?$/, Z = /^(?:true|false)$/i, A = /^null$/i, D = {
    major: 4,
    minor: 3,
    patch: 6
}, J = l("$ZodType", (e, t)=>{
    var n;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = D;
    let r = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && r.unshift(e), r))for (let n of t._zod.onattach)n(e);
    if (0 === r.length) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, n)=>{
            let r, i = z(e);
            for (let o of t){
                if (o._zod.def.when) {
                    if (!o._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, a = o._zod.check(e);
                if (a instanceof Promise && n?.async === !1) throw new c();
                if (r || a instanceof Promise) r = (r ?? Promise.resolve()).then(async ()=>{
                    await a, e.issues.length !== t && (i || (i = z(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = z(e, t));
                }
            }
            return r ? r.then(()=>e) : e;
        }, n = (n, i, o)=>{
            if (z(n)) return n.aborted = !0, n;
            let a = t(i, r, o);
            if (a instanceof Promise) {
                if (!1 === o.async) throw new c();
                return a.then((t)=>e._zod.parse(t, o));
            }
            return e._zod.parse(a, o);
        };
        e._zod.run = (i, o)=>{
            if (o.skipChecks) return e._zod.parse(i, o);
            if ("backward" === o.direction) {
                let t = e._zod.parse({
                    value: i.value,
                    issues: []
                }, {
                    ...o,
                    skipChecks: !0
                });
                return t instanceof Promise ? t.then((e)=>n(e, i, o)) : n(t, i, o);
            }
            let a = e._zod.parse(i, o);
            if (a instanceof Promise) {
                if (!1 === o.async) throw new c();
                return a.then((e)=>t(e, r, o));
            }
            return t(a, r, o);
        };
    }
    g(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = P(e, t);
                    return n.success ? {
                        value: n.data
                    } : {
                        issues: n.error?.issues
                    };
                } catch (n) {
                    return M(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), q = l("$ZodString", (e, t)=>{
    var n;
    let r;
    J.init(e, t), e._zod.pattern = [
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
}), I = l("$ZodNumber", (e, t)=>{
    J.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? R, e._zod.parse = (n, r)=>{
        if (t.coerce) try {
            n.value = Number(n.value);
        } catch (e) {}
        let i = n.value;
        if ("number" == typeof i && !Number.isNaN(i) && Number.isFinite(i)) return n;
        let o = "number" == typeof i ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : "Infinity" : void 0;
        return n.issues.push({
            expected: "number",
            code: "invalid_type",
            input: i,
            inst: e,
            ...o ? {
                received: o
            } : {}
        }), n;
    };
}), Q = l("$ZodBoolean", (e, t)=>{
    J.init(e, t), e._zod.pattern = Z, e._zod.parse = (n, r)=>{
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
}), U = l("$ZodNull", (e, t)=>{
    J.init(e, t), e._zod.pattern = A, e._zod.values = new Set([
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
}), V = l("$ZodNever", (e, t)=>{
    J.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function F(e, t, n) {
    e.issues.length && t.issues.push(...T(n, e.issues)), t.value[n] = e.value;
}
const W = l("$ZodArray", (e, t)=>{
    J.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!Array.isArray(i)) return n.issues.push({
            expected: "array",
            code: "invalid_type",
            input: i,
            inst: e
        }), n;
        n.value = Array(i.length);
        let o = [];
        for(let e = 0; e < i.length; e++){
            let a = i[e], s = t.element._zod.run({
                value: a,
                issues: []
            }, r);
            s instanceof Promise ? o.push(s.then((t)=>F(t, n, e))) : F(s, n, e);
        }
        return o.length ? Promise.all(o).then(()=>n) : n;
    };
});
function H(e, t, n, r, i) {
    if (e.issues.length) {
        if (i && !(n in r)) return;
        t.issues.push(...T(n, e.issues));
    }
    void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const K = l("$ZodObject", (e, t)=>{
    let n;
    J.init(e, t);
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
    let i = h(()=>(function(e) {
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
    let o = t.catchall;
    e._zod.parse = (t, r)=>{
        n ?? (n = i.value);
        let a = t.value;
        if (!y(a)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: a,
            inst: e
        }), t;
        t.value = {};
        let s = [], l = n.shape;
        for (let e of n.keys){
            let n = l[e], i = "optional" === n._zod.optout, o = n._zod.run({
                value: a[e],
                issues: []
            }, r);
            o instanceof Promise ? s.push(o.then((n)=>H(n, t, e, a, i))) : H(o, t, e, a, i);
        }
        return o ? function(e, t, n, r, i, o) {
            let a = [], s = i.keySet, l = i.catchall._zod, c = l.def.type, d = "optional" === l.optout;
            for(let i in t){
                if (s.has(i)) continue;
                if ("never" === c) {
                    a.push(i);
                    continue;
                }
                let o = l.run({
                    value: t[i],
                    issues: []
                }, r);
                o instanceof Promise ? e.push(o.then((e)=>H(e, n, i, t, d))) : H(o, n, i, t, d);
            }
            return (a.length && n.issues.push({
                code: "unrecognized_keys",
                keys: a,
                input: t,
                inst: o
            }), e.length) ? Promise.all(e).then(()=>n) : n;
        }(s, a, t, r, i.value, e) : s.length ? Promise.all(s).then(()=>t) : t;
    };
});
function B(e, t, n, r) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let i = e.filter((e)=>!z(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>k(e, r, u())))
    }), t);
}
const X = l("$ZodUnion", (e, t)=>{
    J.init(e, t), g(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), g(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), g(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), g(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>m(e.source)).join("|")})$`);
        }
    });
    let n = 1 === t.options.length, r = t.options[0]._zod.run;
    e._zod.parse = (i, o)=>{
        if (n) return r(i, o);
        let a = !1, s = [];
        for (let e of t.options){
            let t = e._zod.run({
                value: i.value,
                issues: []
            }, o);
            if (t instanceof Promise) s.push(t), a = !0;
            else {
                if (0 === t.issues.length) return t;
                s.push(t);
            }
        }
        return a ? Promise.all(s).then((t)=>B(t, i, e, o)) : B(s, i, e, o);
    };
}), G = l("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, X.init(e, t);
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
    let r = h(()=>{
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
    e._zod.parse = (i, o)=>{
        let a = i.value;
        if (!y(a)) return i.issues.push({
            code: "invalid_type",
            expected: "object",
            input: a,
            inst: e
        }), i;
        let s = r.value.get(a?.[t.discriminator]);
        return s ? s._zod.run(i, o) : t.unionFallback ? n(i, o) : (i.issues.push({
            code: "invalid_union",
            errors: [],
            note: "No matching discriminator",
            discriminator: t.discriminator,
            input: a,
            path: [
                t.discriminator
            ],
            inst: e
        }), i);
    };
}), Y = l("$ZodRecord", (e, t)=>{
    J.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!function(e) {
            if (!1 === y(e)) return !1;
            let t = e.constructor;
            if (void 0 === t || "function" != typeof t) return !0;
            let n = t.prototype;
            return !1 !== y(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
        }(i)) return n.issues.push({
            expected: "record",
            code: "invalid_type",
            input: i,
            inst: e
        }), n;
        let o = [], a = t.keyType._zod.values;
        if (a) {
            let s;
            n.value = {};
            let l = new Set();
            for (let e of a)if ("string" == typeof e || "number" == typeof e || "symbol" == typeof e) {
                l.add("number" == typeof e ? e.toString() : e);
                let a = t.valueType._zod.run({
                    value: i[e],
                    issues: []
                }, r);
                a instanceof Promise ? o.push(a.then((t)=>{
                    t.issues.length && n.issues.push(...T(e, t.issues)), n.value[e] = t.value;
                })) : (a.issues.length && n.issues.push(...T(e, a.issues)), n.value[e] = a.value);
            }
            for(let e in i)l.has(e) || (s = s ?? []).push(e);
            s && s.length > 0 && n.issues.push({
                code: "unrecognized_keys",
                input: i,
                inst: e,
                keys: s
            });
        } else for (let a of (n.value = {}, Reflect.ownKeys(i))){
            if ("__proto__" === a) continue;
            let s = t.keyType._zod.run({
                value: a,
                issues: []
            }, r);
            if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof a && R.test(a) && s.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(a),
                    issues: []
                }, r);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (s = e);
            }
            if (s.issues.length) {
                "loose" === t.mode ? n.value[a] = i[a] : n.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: s.issues.map((e)=>k(e, r, u())),
                    input: a,
                    path: [
                        a
                    ],
                    inst: e
                });
                continue;
            }
            let l = t.valueType._zod.run({
                value: i[a],
                issues: []
            }, r);
            l instanceof Promise ? o.push(l.then((e)=>{
                e.issues.length && n.issues.push(...T(a, e.issues)), n.value[s.value] = e.value;
            })) : (l.issues.length && n.issues.push(...T(a, l.issues)), n.value[s.value] = l.value);
        }
        return o.length ? Promise.all(o).then(()=>n) : n;
    };
}), ee = l("$ZodEnum", (e, t)=>{
    var n;
    let r;
    J.init(e, t);
    let i = (r = Object.values(n = t.entries).filter((e)=>"number" == typeof e), Object.entries(n).filter(([e, t])=>-1 === r.indexOf(+e)).map(([e, t])=>t)), o = new Set(i);
    e._zod.values = o, e._zod.pattern = RegExp(`^(${i.filter((e)=>v.has(typeof e)).map((e)=>"string" == typeof e ? w(e) : e.toString()).join("|")})$`), e._zod.parse = (t, n)=>{
        let r = t.value;
        return o.has(r) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: r,
            inst: e
        }), t;
    };
}), et = l("$ZodLiteral", (e, t)=>{
    if (J.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? w(e) : e ? w(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i)=>{
        let o = r.value;
        return n.has(o) || r.issues.push({
            code: "invalid_value",
            values: t.values,
            input: o,
            inst: e
        }), r;
    };
});
function en(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const er = l("$ZodOptional", (e, t)=>{
    J.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${m(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let r = t.innerType._zod.run(e, n);
            return r instanceof Promise ? r.then((t)=>en(t, e.value)) : en(r, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, n);
    };
}), ei = l("$ZodNullable", (e, t)=>{
    J.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${m(e.source)}|null)$`) : void 0;
    }), g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), eo = l("$ZodLazy", (e, t)=>{
    J.init(e, t), g(e._zod, "innerType", ()=>t.getter()), g(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), g(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), g(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), g(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n)=>e._zod.innerType._zod.run(t, n);
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
const ea = l("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    J.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>j(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>P(e, t, n), e.parseAsync = async (t, n)=>N(e, t, n, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, n)=>M(e, t, n), e.check = (...n)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, n)=>{
        let r;
        return r = new e._zod.constr(t ?? e._zod.def), (!t || n?.parent) && (r._zod.parent = e), r;
    }, e.brand = ()=>e, e.register = (t, n)=>(t.add(e, n), e), e.apply = (t)=>t(e);
}), es = l("ZodMiniString", (e, t)=>{
    q.init(e, t), ea.init(e, t);
});
function el(e) {
    return new es({
        type: "string",
        ...x(e)
    });
}
const ec = l("ZodMiniNumber", (e, t)=>{
    I.init(e, t), ea.init(e, t);
});
function ed(e) {
    return new ec({
        type: "number",
        checks: [],
        ...x(e)
    });
}
const eu = l("ZodMiniBoolean", (e, t)=>{
    Q.init(e, t), ea.init(e, t);
});
function ep(e) {
    return new eu({
        type: "boolean",
        ...x(e)
    });
}
const eh = l("ZodMiniNull", (e, t)=>{
    U.init(e, t), ea.init(e, t);
}), em = l("ZodMiniNever", (e, t)=>{
    V.init(e, t), ea.init(e, t);
});
function ef(e) {
    return new em({
        type: "never",
        ...x(e)
    });
}
const eg = l("ZodMiniArray", (e, t)=>{
    W.init(e, t), ea.init(e, t);
});
function eb(e, t) {
    return new eg({
        type: "array",
        element: e,
        ...x(t)
    });
}
const ey = l("ZodMiniObject", (e, t)=>{
    K.init(e, t), ea.init(e, t), g(e, "shape", ()=>t.shape);
});
function e_(e, t) {
    return new ey({
        type: "object",
        shape: e ?? {},
        ...x(t)
    });
}
const ev = l("ZodMiniUnion", (e, t)=>{
    X.init(e, t), ea.init(e, t);
});
function ew(e, t) {
    return new ev({
        type: "union",
        options: e,
        ...x(t)
    });
}
const ex = l("ZodMiniDiscriminatedUnion", (e, t)=>{
    G.init(e, t), ea.init(e, t);
});
function ez(e, t, n) {
    return new ex({
        type: "union",
        options: t,
        discriminator: e,
        ...x(n)
    });
}
const eT = l("ZodMiniRecord", (e, t)=>{
    Y.init(e, t), ea.init(e, t);
});
function eC(e, t, n) {
    return new eT({
        type: "record",
        keyType: e,
        valueType: t,
        ...x(n)
    });
}
const ek = l("ZodMiniEnum", (e, t)=>{
    ee.init(e, t), ea.init(e, t), e.options = Object.values(t.entries);
});
function e$(e, t) {
    return new ek({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...x(t)
    });
}
const eS = l("ZodMiniLiteral", (e, t)=>{
    et.init(e, t), ea.init(e, t);
});
function eO(e, t) {
    return new eS({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...x(t)
    });
}
const eE = l("ZodMiniOptional", (e, t)=>{
    er.init(e, t), ea.init(e, t);
});
function ej(e) {
    return new eE({
        type: "optional",
        innerType: e
    });
}
const eN = l("ZodMiniNullable", (e, t)=>{
    ei.init(e, t), ea.init(e, t);
});
function eP(e) {
    return new eN({
        type: "nullable",
        innerType: e
    });
}
const eM = l("ZodMiniLazy", (e, t)=>{
    eo.init(e, t), ea.init(e, t);
});
let eL = e_({
    error: ew([
        el(),
        e_({
            code: el(),
            message: el()
        })
    ])
});
class eR extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eZ(e) {
    let t = eL.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eR("rpc", e) : new eR(e.code, e.message);
    }
    return e;
}
const eA = e_({
    status: eO("pending"),
    job: el()
}), eD = ez("status", [
    e_({
        status: eO("pending")
    }),
    e_({
        status: eO("ready"),
        chunk: ed(),
        chunks: ed(),
        bytes: ed(),
        data: el()
    })
]);
let eJ = e_({
    schema_version: eO(1),
    version: el(),
    features: e_({
        acs: ep(),
        mqtt: ep(),
        "device-hl202": ep(),
        "device-hwtc": ep()
    }),
    functions: e_({
        optical: ep(),
        omci_mib: ep(),
        mqtt_telemetry: ep(),
        hl202_management: ep(),
        cwmp: ep()
    }),
    pages: e_({
        status: ep(),
        config: ep(),
        sync: ep(),
        hl202: ep(),
        hardware: ep(),
        calibration: ep(),
        about: ep()
    })
}), eq = L.rpc.declare({
    object: "luci.fttr",
    method: "get_capabilities",
    reject: !0
});
const eI = async ()=>eJ.parse(eZ(await eq()));
async function eQ(e) {
    if (!(await eI()).pages[e]) throw Error(_("This page is not supported by the installed FTTR build."));
}
_("Ready"), _("Online"), _("Success"), _("Offline"), _("Error"), _("Failed"), _("Timeout"), _("Pending"), _("Running"), _("Unavailable"), _("Disabled"), _("Enabled");
const eU = (e)=>null == e || "" === e ? "\u2014" : String(e), eV = (e)=>e ? new Date(1000 * e).toLocaleString() : "\u2014";
function eF(e, t, n) {
    return s("span", {
        class: `hl202-badge hl202-badge-${e}`,
        title: n,
        children: t
    });
}
let eW = el(), eH = ed(), eK = ep();
e_({
    optical_sn: eW,
    onu_id: eH,
    binding_generation: eW
}), e_({
    mqtt_mac: eW,
    binding_generation: eW
});
let eB = e_({
    mqtt_mac: eW,
    optical_sn: eP(eW),
    onu_id: eP(eH),
    binding_generation: eW,
    last_seen: eH,
    reason: eW
}), eX = {
    target: eW,
    request_id: ej(eW),
    output: ej(eW),
    output_truncated: eK,
    error: ej(eW)
};
const eG = ez("status", [
    e_({
        ...eX,
        status: eO("executed"),
        exit_code: eP(eH)
    }),
    e_({
        ...eX,
        status: eO("dispatched"),
        exit_code: ej(ef())
    }),
    e_({
        ...eX,
        status: eO("timeout"),
        exit_code: ej(ef())
    }),
    e_({
        ...eX,
        status: eO("error"),
        exit_code: ej(ef())
    })
]);
let eY = e_({
    target: eB,
    result: eG,
    binding_current: eK
}), e0 = e_({
    schema_version: eH,
    compressed_bytes: eH,
    decompressed_bytes: eH,
    fields: eC(eW, e_({
        value: o = new eM({
            type: "lazy",
            getter: ()=>ew([
                    el(),
                    ed(),
                    ep(),
                    new eh({
                        type: "null",
                        ...x(void 0)
                    }),
                    eb(o),
                    eC(el(), o)
                ])
        }),
        member: eW,
        unit: eP(eW)
    })),
    members: eb(e_({
        name: eW,
        bytes: eH,
        encoding: eW,
        text: eP(eW),
        text_omitted: eK
    })),
    errors: eb(eW)
}), e2 = e_({
    revision: eH,
    last_received: eH,
    last_processed_receipt: eP(eH),
    last_good: eP(eH),
    error: eP(eW),
    report: eP(e0)
}), e1 = {
    schema_version: eO(1),
    target: eB,
    report: eP(e2)
};
const e8 = ew([
    e_({
        ...e1,
        state: e$([
            "received",
            "report_unavailable"
        ])
    }),
    e_({
        ...e1,
        read_only: eO(!0)
    })
]), e4 = e_({
    schema_version: eO(1),
    devices: eb(e_({
        optical_sn: eW,
        onu_id: eH,
        model: eW,
        optical_online: eK,
        can_execute: eK,
        mqtt: eP(eB),
        report_revision: eP(eH)
    })),
    sources: eb(eB)
}), e3 = e_({
    schema_version: eO(1),
    operation: eY,
    accounts: eP(eb(e_({
        entry: ew([
            eO(0),
            eO(1),
            eO(2)
        ]),
        username: eW,
        active: eK
    }))),
    write_status: e$([
        "not_applicable",
        "accepted_and_saved",
        "unconfirmed"
    ])
}), e5 = e_({
    schema_version: eO(1),
    operation: eY
});
let e6 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_list",
    reject: !0
}), e7 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_job_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
}), e9 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_report",
    params: [
        "target"
    ],
    reject: !0
}), te = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_accounts_start",
    params: [
        "target"
    ],
    reject: !0
}), tt = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_account_update",
    params: [
        "target",
        "kind",
        "entry",
        "password",
        "active"
    ],
    reject: !0
}), tn = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_exec_start",
    params: [
        "target",
        "script",
        "timeout_seconds"
    ],
    reject: !0
});
async function tr(e) {
    let t = eA.parse(eZ(e)), n = Date.now() + 330000, r = window.location.pathname, i = [], o = 0, a = null;
    for(let e = 0; e < 128;){
        if (window.location.pathname !== r) throw new eR("navigation", _("Result polling stopped after leaving the page. The backend job is not cancelled."));
        if (Date.now() > n) throw new eR("timeout", _("Job polling timed out; execution outcome is unknown. Do not automatically retry."));
        let s = eD.parse(eZ(await e7(t.job, e)));
        switch(s.status){
            case "pending":
                await new Promise((e)=>window.setTimeout(e, 1000));
                continue;
            case "ready":
                {
                    if (!Number.isInteger(s.chunks) || s.chunks < 1 || s.chunks > 128 || s.chunk !== e || !Number.isInteger(s.bytes) || s.bytes < 1 || s.bytes > 4194304 || s.data.length > 43692) throw new eR("transport", _("Invalid job result"));
                    if (a && (s.chunks !== a.chunks || s.bytes !== a.bytes)) throw new eR("transport", _("Inconsistent job result chunks"));
                    a = {
                        chunks: s.chunks,
                        bytes: s.bytes
                    };
                    let t = Uint8Array.from(atob(s.data), (e)=>e.charCodeAt(0));
                    if (t.length > 32768 || o + t.length > s.bytes) throw new eR("transport", _("Job result exceeds the transport limit"));
                    if (i.push(t), o += t.length, ++e === s.chunks) {
                        if (o !== s.bytes) throw new eR("transport", _("Incomplete job result"));
                        let e = new Uint8Array(o), t = 0;
                        for (let n of i)e.set(n, t), t += n.length;
                        return eZ(JSON.parse(new TextDecoder("utf-8", {
                            fatal: !0
                        }).decode(e)));
                    }
                }
        }
    }
    throw new eR("transport", _("Too many result chunks"));
}
const ti = async ()=>e4.parse(eZ(await e6())), to = async (e)=>e8.parse(await tr(await e9(e))), ta = async (e)=>e3.parse(await tr(await te(e))), ts = async (e, t)=>e3.parse(await tr(await tt(e, `account_set_${t.kind}`, t.entry, t.password, t.active))), tl = async (e, t, n)=>e5.parse(await tr(await tn(e, t, n)));
let tc = !1;
function td() {
    var e, t;
    let n = null, r = s("div", {
        style: "margin:8px 0;display:flex;align-items:center;flex-wrap:wrap;gap:10px"
    }), i = s("div", {
        style: "overflow-x:auto;margin:8px 0"
    }), o = s("div", {
        style: "margin-top:10px"
    }), a = s("div", {
        style: "font-size:88%;color:#888;margin:6px 0",
        "aria-live": "polite"
    }), l = s("button", {
        type: "button",
        class: "cbi-button cbi-button-action",
        children: _("Read MQTT report")
    }), c = async (e)=>{
        let t = e || n;
        if (!t) {
            a.textContent = _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
            return;
        }
        if (tc) {
            a.textContent = _("Another operation is in progress.");
            return;
        }
        tc = !0, l.disabled = !0, a.textContent = _("Waiting for device result\u2026");
        try {
            var c, d, u, p, h, m, f, g, b, y, v, w, x, z, T, C, k, $, S, O, j, N;
            let e = await to(t);
            if (JSON.stringify(t) !== JSON.stringify(n)) return;
            if (!e.report) {
                r.replaceChildren(), i.replaceChildren(), o.replaceChildren(), a.textContent = _("No MQTT report has been parsed yet.");
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
                    }, s("span", c)),
                    eF("info", `#${String(l.revision)}`)
                ]
            }, s("span", d)), (h = {
                children: [
                    (u = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Last received"),
                            ":"
                        ]
                    }, s("span", u)),
                    (p = {
                        children: eV("number" == typeof l.last_received ? l.last_received : void 0)
                    }, s("strong", p))
                ]
            }, s("span", h)), (g = {
                children: [
                    (m = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Last good report"),
                            ":"
                        ]
                    }, s("span", m)),
                    (f = {
                        children: eV("number" == typeof l.last_good ? l.last_good : void 0)
                    }, s("strong", f))
                ]
            }, s("span", g))), "string" == typeof l.error && r.append((b = {
                class: "alert-message warning",
                style: "width:100%;margin-top:6px",
                children: [
                    _("Latest report error"),
                    ": ",
                    l.error
                ]
            }, s("div", b))), l.report) {
                let e = l.report, t = e.fields;
                i.replaceChildren((C = {
                    class: "table",
                    style: "font-size:90%",
                    children: [
                        (z = {
                            children: (x = {
                                children: [
                                    (y = {
                                        children: _("Field")
                                    }, s("th", y)),
                                    (v = {
                                        children: _("Value")
                                    }, s("th", v)),
                                    (w = {
                                        children: _("Source member")
                                    }, s("th", w))
                                ]
                            }, s("tr", x))
                        }, s("thead", z)),
                        (T = {
                            children: Object.entries(t).map((e)=>{
                                var t, n, r, i, o, a, l;
                                let [c, d] = e, u = d.value, p = null === u ? "\u2014" : `${"object" == typeof u ? JSON.stringify(u) : String(u)}${d.unit ? ` ${d.unit}` : ""}`;
                                return "uptime_seconds" === c && "number" == typeof u && (p = function(e) {
                                    if (void 0 === e || !Number.isFinite(e) || e < 0) return "\u2014";
                                    let t = Math.floor(e / 86400), n = Math.floor(e % 86400 / 3600), r = Math.floor(e % 3600 / 60), i = [];
                                    return t > 0 && i.push(_("%d days").replace("%d", String(t))), (n > 0 || t > 0) && i.push(_("%d hours").replace("%d", String(n))), (r > 0 || n > 0 || t > 0) && i.push(_("%d minutes").replace("%d", String(r))), i.push(_("%d seconds").replace("%d", String(e % 60))), `${i.join(" ")} (${e} s)`;
                                }(u)), l = {
                                    children: [
                                        (n = {
                                            children: (t = {
                                                children: c
                                            }, s("code", t))
                                        }, s("td", n)),
                                        (i = {
                                            children: (r = {
                                                children: p
                                            }, s("strong", r))
                                        }, s("td", i)),
                                        (a = {
                                            children: (o = {
                                                class: "hl202-badge hl202-badge-neutral",
                                                children: eU(d.member)
                                            }, s("span", o))
                                        }, s("td", a))
                                    ]
                                }, s("tr", l);
                            })
                        }, s("tbody", T))
                    ]
                }, s("table", C)));
                let n = [];
                for (let t of e.members){
                    let e = (k = {
                        type: "button",
                        class: "fttr-btn-subtle",
                        style: "margin-left:8px",
                        onclick: (n)=>{
                            n.stopPropagation(), "string" == typeof t.text && (navigator.clipboard?.writeText(t.text), e.textContent = _("Copied to clipboard"), setTimeout(()=>{
                                e.textContent = _("Copy member text");
                            }, 1500));
                        },
                        children: _("Copy member text")
                    }, s("button", k));
                    n.push((N = {
                        style: "margin:6px 0;border:1px solid rgba(127,140,141,0.15);border-radius:4px;padding:4px 8px",
                        children: [
                            ($ = {
                                style: "cursor:pointer;user-select:none;font-weight:600;font-size:90%",
                                children: [
                                    _("%s (%s bytes, %s)").format(String(t.name), String(t.bytes), String(t.encoding)),
                                    "string" == typeof t.text ? e : null
                                ]
                            }, s("summary", $)),
                            (j = {
                                style: "margin-top:6px",
                                children: "string" == typeof t.text ? (S = {
                                    class: "hl202-terminal-output",
                                    style: "max-height:16rem",
                                    children: t.text
                                }, s("pre", S)) : (O = {
                                    style: "font-size:85%;color:#888;margin:4px 0",
                                    children: t.text_omitted ? _("Text omitted at the shared byte limit.") : _("Binary member; text is unavailable.")
                                }, s("p", O))
                            }, s("div", j))
                        ]
                    }, s("details", N)));
                }
                o.replaceChildren(...e.errors.map((e)=>{
                    var t;
                    return t = {
                        class: "alert-message warning",
                        children: e
                    }, s("div", t);
                }), ...n);
            } else i.replaceChildren(), o.replaceChildren();
            a.textContent = "";
        } catch (e) {
            a.textContent = e instanceof Error ? e.message : _("Request failed");
        } finally{
            tc = !1, l.disabled = !n;
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
                        s("h3", {
                            style: "margin:0",
                            children: _("MQTT report")
                        }),
                        l
                    ]
                }, s("div", e)),
                a,
                r,
                i,
                o
            ]
        }, s("div", t)),
        setTarget (e) {
            JSON.stringify(e) !== JSON.stringify(n) && (r.replaceChildren(), i.replaceChildren(), o.replaceChildren(), a.textContent = ""), n = e, l.disabled = !e;
        },
        refresh: (e)=>c(e)
    };
}
let tu = L.view;
if (!("extend" in tu) || "function" != typeof tu.extend) throw Error("LuCI view extension is unavailable");
let main = Reflect.apply(tu.extend, tu, [
    {
        load: ()=>eQ("hl202"),
        render: function() {
            var e, t, n, r, i, o, a, l, c, d, u, p, h;
            let m, f, g, b, y, v = s("select", {
                id: "hl202-device",
                class: "cbi-input-select",
                "aria-label": _("HL202 device"),
                style: "min-width:320px"
            }), w = s("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                children: _("Refresh devices")
            }), x = s("div", {
                style: "font-size:88%;color:#888;margin:6px 0",
                "aria-live": "polite"
            }), z = s("strong", {
                children: "\u2014"
            }), T = s("span", {
                class: "hl202-badge hl202-badge-neutral",
                style: "font-size:80%",
                children: "\u2014"
            }), C = s("span", {
                class: "hl202-badge hl202-badge-neutral",
                children: "\u2014"
            }), k = s("span", {
                class: "hl202-badge hl202-badge-neutral",
                children: "\u2014"
            }), $ = s("span", {
                class: "hl202-badge hl202-badge-info",
                style: "font-size:80%",
                children: "\u2014"
            }), S = s("div", {
                class: "alert-message warning",
                style: "margin-top:8px",
                hidden: !0,
                children: _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
            }), O = (n = {
                class: "cbi-section hl202-device-card",
                style: "margin-bottom:0",
                children: [
                    (t = {
                        class: "hl202-card-header",
                        children: [
                            s("div", {
                                class: "hl202-device-title",
                                children: [
                                    z,
                                    T
                                ]
                            }),
                            s("div", {
                                class: "hl202-device-badges",
                                children: [
                                    C,
                                    k,
                                    $
                                ]
                            }),
                            (e = {
                                class: "hl202-device-links",
                                children: s("a", {
                                    href: L.url("admin", "network", "fttr", "hardware"),
                                    class: "fttr-btn-subtle",
                                    children: [
                                        _("Open optical status and ONU/MIB details"),
                                        " \u2192"
                                    ]
                                })
                            }, s("div", e))
                        ]
                    }, s("div", t)),
                    S
                ]
            }, s("div", n)), j = td(), N = (m = null, f = s("div", {
                style: "font-size:88%;color:#888;margin:6px 0",
                "aria-live": "polite"
            }), g = s("div", {
                style: "margin-top:10px;display:flex;flex-direction:column;gap:10px"
            }), (b = s("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                children: _("Read users")
            })).disabled = !L.hasViewPermission(), y = async ()=>{
                if (!m) {
                    f.textContent = _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
                    return;
                }
                if (tc) {
                    f.textContent = _("Another operation is in progress.");
                    return;
                }
                tc = !0, b.disabled = !0, f.textContent = _("Waiting for device result\u2026");
                let e = m;
                try {
                    let h = await ta(e);
                    if (JSON.stringify(e) !== JSON.stringify(m)) return;
                    g.replaceChildren();
                    let b = h.operation, y = b.result;
                    if ("timeout" === y.status ? f.textContent = _("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.") : f.textContent = b.binding_current ? y.error ?? (null === h.accounts ? _("Account data is unavailable.") : "") : _("Device binding changed; this result is stale."), h.accounts && b.binding_current) {
                        let f = [];
                        for (let g of h.accounts){
                            var t, n, r, i, o, a, l, c, d, u, p;
                            let h = g.entry, b = g.active, y = (t = {
                                class: `hl202-badge ${b ? "hl202-badge-success" : "hl202-badge-neutral"}`,
                                style: "font-size:80%",
                                children: b ? _("Enabled") : _("Disabled")
                            }, s("span", t)), v = (n = {
                                type: "password",
                                class: "cbi-input-text",
                                placeholder: _("New password"),
                                autocomplete: "new-password",
                                style: "width:180px"
                            }, s("input", n)), w = (r = {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                children: _("Set password")
                            }, s("button", r)), x = (i = {
                                type: "button",
                                class: `cbi-button ${b ? "cbi-button-neutral" : "cbi-button-apply"}`,
                                children: b ? _("Disable") : _("Enable")
                            }, s("button", i));
                            w.disabled = x.disabled = !L.hasViewPermission();
                            let z = (o = {
                                style: "font-size:82%;margin-top:4px",
                                "aria-live": "polite"
                            }, s("div", o));
                            w.addEventListener("click", async ()=>{
                                if (!m || tc || JSON.stringify(e) !== JSON.stringify(m)) return;
                                let t = v.value;
                                if (!t) {
                                    z.textContent = _("Enter a non-empty password.");
                                    return;
                                }
                                v.value = "", tc = !0, w.disabled = x.disabled = !0, z.textContent = _("Waiting for device result\u2026");
                                try {
                                    let n = await ts(e, {
                                        entry: h,
                                        kind: "password",
                                        password: t,
                                        active: b
                                    });
                                    if (JSON.stringify(e) !== JSON.stringify(m)) return;
                                    let r = n.operation, i = r.result;
                                    r.binding_current && "accepted_and_saved" === n.write_status ? z.textContent = _("Password accepted and saved; web login permission is not verified.") : z.textContent = i.error ?? _("Execution outcome is unknown. Do not automatically retry.");
                                } catch (e) {
                                    z.textContent = e instanceof Error ? e.message : _("Request failed");
                                } finally{
                                    tc = !1, w.disabled = x.disabled = !L.hasViewPermission();
                                }
                            }), x.addEventListener("click", async ()=>{
                                if (m && !tc && JSON.stringify(e) === JSON.stringify(m)) {
                                    tc = !0, w.disabled = x.disabled = !0, z.textContent = _("Waiting for device result\u2026");
                                    try {
                                        let t = !b, n = await ts(e, {
                                            entry: h,
                                            kind: "active",
                                            password: "",
                                            active: t
                                        });
                                        if (JSON.stringify(e) !== JSON.stringify(m)) return;
                                        let r = n.accounts?.find((e)=>e.entry === h);
                                        if (!n.operation.binding_current || "accepted_and_saved" !== n.write_status || !r) {
                                            z.textContent = n.operation.result.error ?? _("Execution outcome is unknown. Refresh users before retrying.");
                                            return;
                                        }
                                        b = r.active, y.className = `hl202-badge ${b ? "hl202-badge-success" : "hl202-badge-neutral"}`, y.textContent = b ? _("Enabled") : _("Disabled"), x.className = `cbi-button ${b ? "cbi-button-neutral" : "cbi-button-apply"}`, x.textContent = b ? _("Disable") : _("Enable"), z.textContent = `${String(n.write_status)}; ${_("Refresh users to read the current state.")}`;
                                    } catch (e) {
                                        z.textContent = e instanceof Error ? e.message : _("Request failed");
                                    } finally{
                                        tc = !1, w.disabled = x.disabled = !L.hasViewPermission();
                                    }
                                }
                            }), f.push((p = {
                                class: "cbi-section",
                                style: "margin:0;padding:10px 14px;border:1px solid rgba(127,140,141,0.2);border-radius:5px",
                                children: [
                                    (u = {
                                        style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                                        children: [
                                            (c = {
                                                style: "display:flex;align-items:center;gap:8px",
                                                children: [
                                                    (a = {
                                                        style: "font-size:105%",
                                                        children: g.username
                                                    }, s("strong", a)),
                                                    (l = {
                                                        style: "font-size:80%;color:#888",
                                                        children: _("(Entry %s)").replace("%s", String(h))
                                                    }, s("span", l)),
                                                    y
                                                ]
                                            }, s("div", c)),
                                            (d = {
                                                style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px",
                                                children: [
                                                    v,
                                                    w,
                                                    x
                                                ]
                                            }, s("div", d))
                                        ]
                                    }, s("div", u)),
                                    z
                                ]
                            }, s("div", p)));
                        }
                        g.replaceChildren(...f);
                    }
                } catch (e) {
                    f.textContent = e instanceof Error ? e.message : _("Request failed");
                } finally{
                    tc = !1, b.disabled = !m || !L.hasViewPermission();
                }
            }, b.addEventListener("click", ()=>{
                y();
            }), {
                element: (h = {
                    class: "cbi-section hl202-panel-accounts",
                    children: [
                        (p = {
                            style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:6px",
                            children: [
                                s("h3", {
                                    style: "margin:0",
                                    children: _("User management")
                                }),
                                b
                            ]
                        }, s("div", p)),
                        s("p", {
                            style: "font-size:85%;color:#888;margin:4px 0",
                            children: _("Password writes are accepted and saved by the device; this does not prove web login permission. Existing permission masks are preserved.")
                        }),
                        f,
                        g
                    ]
                }, s("div", h)),
                setTarget (e) {
                    JSON.stringify(e) !== JSON.stringify(m) && (g.replaceChildren(), f.textContent = ""), m = e, b.disabled = !e || !L.hasViewPermission();
                },
                refresh: ()=>y()
            }), P = function() {
                var e, t, n, r;
                let i = null, o = s("div", {
                    style: "font-size:88%;color:#666;margin:4px 0"
                }), a = s("textarea", {
                    id: "hl202-script",
                    rows: 8,
                    class: "hl202-terminal-textarea",
                    spellcheck: !1,
                    "aria-label": _("Remote shell command"),
                    placeholder: _("# Enter shell commands to execute on the selected sub-gateway (Ctrl + Enter to execute)...")
                }), l = s("input", {
                    type: "number",
                    id: "hl202-timeout",
                    min: "1",
                    max: "300",
                    value: "20",
                    class: "cbi-input-text",
                    style: "width:70px;text-align:center",
                    "aria-label": _("Timeout in seconds")
                }), c = s("button", {
                    type: "button",
                    class: "cbi-button cbi-button-apply",
                    style: "font-weight:600",
                    children: _("Execute on selected HL202")
                });
                c.disabled = !L.hasViewPermission();
                let d = s("div", {
                    style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px"
                }), u = s("pre", {
                    class: "hl202-terminal-output",
                    style: "min-height:4rem;display:none",
                    children: _("# Waiting for commands...")
                }), p = s("button", {
                    type: "button",
                    class: "fttr-btn-subtle",
                    onclick: ()=>{
                        u.textContent && (navigator.clipboard?.writeText(u.textContent), p.textContent = _("Copied to clipboard"), setTimeout(()=>{
                            p.textContent = _("Copy output");
                        }, 1500));
                    },
                    children: _("Copy output")
                }), h = s("button", {
                    type: "button",
                    class: "fttr-btn-subtle",
                    onclick: ()=>{
                        u.textContent = "", u.style.display = "none", d.replaceChildren();
                    },
                    children: _("Clear output")
                }), m = async ()=>{
                    var e, t, n, r, o, m, f, g, b, y, v;
                    if (!i) return void d.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
                    }));
                    if (tc) return void d.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: _("Another operation is in progress.")
                    }));
                    let w = Number(l.value);
                    if (!Number.isInteger(w) || w < 1 || w > 300) return void d.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: _("Timeout must be 1\u2013300 seconds.")
                    }));
                    let x = a.value.trim();
                    if (!x || x.includes("\0") || new TextEncoder().encode(x).length > 65536) return void d.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: _("Enter a non-empty UTF-8 script up to 64 KiB without NUL characters.")
                    }));
                    tc = !0, c.disabled = !0, u.style.display = "block", u.textContent = `# [${new Date().toLocaleTimeString()}] ${_("Dispatching to %s (timeout: %s s)...").format(i.optical_sn, String(w))}\n`, d.replaceChildren(eF("info", _("Waiting for device result\u2026")));
                    let z = Date.now(), T = i;
                    try {
                        let l = await tl(T, a.value, w);
                        if (JSON.stringify(T) !== JSON.stringify(i)) return;
                        let c = ((Date.now() - z) / 1000).toFixed(2), v = l.operation, x = v.result, C = x.status, k = x.exit_code, $ = v.binding_current && !x.error && "executed" === C && 0 === k, S = eF($ ? "success" : "timeout" === C ? "warning" : "danger", $ ? _("Success") : "timeout" === C ? _("Timeout") : `${_("Exit code")} ${String(k ?? C)}`);
                        d.replaceChildren(S, (n = {
                            children: [
                                (e = {
                                    style: "color:#888",
                                    children: [
                                        _("Exit code"),
                                        ":"
                                    ]
                                }, s("span", e)),
                                " ",
                                (t = {
                                    children: String(k ?? "\u2014")
                                }, s("code", t))
                            ]
                        }, s("span", n)), (m = {
                            children: [
                                (r = {
                                    style: "color:#888",
                                    children: [
                                        _("Duration"),
                                        ":"
                                    ]
                                }, s("span", r)),
                                " ",
                                (o = {
                                    children: [
                                        c,
                                        " s"
                                    ]
                                }, s("strong", o))
                            ]
                        }, s("span", m)), (b = {
                            children: [
                                (f = {
                                    style: "color:#888",
                                    children: [
                                        _("Request ID"),
                                        ":"
                                    ]
                                }, s("span", f)),
                                " ",
                                (g = {
                                    children: String(x.request_id ?? "\u2014")
                                }, s("code", g))
                            ]
                        }, s("span", b)), (y = {
                            style: "margin-left:auto;display:flex;gap:6px",
                            children: [
                                p,
                                h
                            ]
                        }, s("div", y)));
                        let O = [];
                        v.binding_current || O.push(_("Device binding changed; this result is stale.")), ("timeout" === C || "dispatched" === C) && O.push(_("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.")), "string" == typeof x.output && x.output.length && O.push(x.output), "string" == typeof x.error && x.error.length && O.push(`[STDERR]\n${x.error}`), !0 === x.output_truncated && O.push(`\n[!] ${_("Output was truncated at the byte limit.")}`), 0 === O.length && O.push(_("No output returned.")), u.textContent = O.join("\n");
                    } catch (t) {
                        let e = ((Date.now() - z) / 1000).toFixed(2);
                        d.replaceChildren(eF("danger", _("Failed")), (v = {
                            children: [
                                s("span", {
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
                        }, s("span", v)), s("div", {
                            style: "margin-left:auto;display:flex;gap:6px",
                            children: [
                                p,
                                h
                            ]
                        })), u.textContent = `[ERROR] ${t instanceof Error ? t.message : _("Request failed")}`;
                    } finally{
                        tc = !1, c.disabled = !i || !L.hasViewPermission();
                    }
                };
                c.addEventListener("click", ()=>{
                    m();
                }), a.addEventListener("keydown", (e)=>{
                    (e.ctrlKey || e.metaKey) && "Enter" === e.key && (e.preventDefault(), m());
                });
                let f = [
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
                ], g = (e = {
                    class: "hl202-snippets",
                    children: [
                        s("span", {
                            style: "font-size:80%;color:#888;margin-right:2px",
                            children: [
                                _("Quick diagnostic commands"),
                                ":"
                            ]
                        }),
                        f.map((e)=>s("button", {
                                type: "button",
                                class: "hl202-snippet-tag",
                                onclick: ()=>{
                                    a.value = e.cmd, a.focus();
                                },
                                children: e.label
                            }))
                    ]
                }, s("div", e));
                return {
                    element: (r = {
                        class: "cbi-section hl202-panel-console",
                        children: [
                            s("h3", {
                                style: "margin-bottom:4px",
                                children: _("Raw command console")
                            }),
                            s("p", {
                                style: "font-size:85%;color:#888;margin-top:0;margin-bottom:6px",
                                children: _("Shell executes on the selected ONU. Timeout does not cancel execution. Raw output can contain secrets.")
                            }),
                            o,
                            g,
                            s("div", {
                                class: "hl202-terminal",
                                style: "margin-bottom:8px",
                                children: a
                            }),
                            (n = {
                                style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:8px",
                                children: [
                                    (t = {
                                        htmlFor: "hl202-timeout",
                                        style: "display:flex;align-items:center;gap:6px;font-size:90%",
                                        children: [
                                            s("span", {
                                                children: [
                                                    _("Timeout in seconds"),
                                                    ":"
                                                ]
                                            }),
                                            l
                                        ]
                                    }, s("label", t)),
                                    s("span", {
                                        style: "font-size:82%;color:#888",
                                        children: _("(Shortcut: %s)").replace("%s", "Ctrl + Enter")
                                    }),
                                    s("div", {
                                        style: "margin-left:auto",
                                        children: c
                                    })
                                ]
                            }, s("div", n)),
                            s("div", {
                                style: "margin-top:10px",
                                children: [
                                    d,
                                    u
                                ]
                            })
                        ]
                    }, s("div", r)),
                    setTarget (e) {
                        var t;
                        JSON.stringify(e) !== JSON.stringify(i) && (d.replaceChildren(), u.textContent = "", u.style.display = "none"), i = e, c.disabled = !e || !L.hasViewPermission(), e ? o.replaceChildren((t = {
                            children: [
                                s("span", {
                                    style: "color:#888",
                                    children: [
                                        _("Target"),
                                        ":"
                                    ]
                                }),
                                " ",
                                s("strong", {
                                    children: e.optical_sn
                                }),
                                " (ONU",
                                " ",
                                e.onu_id,
                                ") \xb7 ",
                                s("code", {
                                    children: [
                                        "gen: ",
                                        e.binding_generation
                                    ]
                                })
                            ]
                        }, s("span", t))) : o.replaceChildren(s("span", {
                            style: "color:#e74c3c",
                            children: _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
                        }));
                    }
                };
            }(), M = s("select", {
                id: "hl202-source",
                class: "cbi-input-select",
                "aria-label": _("Read-only MQTT source"),
                style: "min-width:240px"
            }), R = s("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                style: "margin-left:8px",
                children: _("Inspect source report (read-only)")
            }), Z = s("div", {
                style: "margin-top:10px"
            }), A = [], D = s("pre", {
                style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto"
            }), J = (o = {
                class: "cbi-section hl202-panel-sources",
                children: [
                    s("h3", {
                        style: "margin-bottom:4px",
                        children: _("MQTT source identity")
                    }),
                    s("p", {
                        style: "font-size:85%;color:#888;margin-top:0;margin-bottom:8px",
                        children: _("Inspect read-only MQTT source reports and diagnostics for unbound or unselected devices.")
                    }),
                    (r = {
                        style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                        children: [
                            s("label", {
                                htmlFor: "hl202-source",
                                children: [
                                    _("Read-only MQTT source"),
                                    ": ",
                                    M
                                ]
                            }),
                            R
                        ]
                    }, s("div", r)),
                    Z,
                    (i = {
                        style: "margin-top:10px",
                        children: [
                            s("summary", {
                                style: "cursor:pointer;font-size:85%;color:#888;font-weight:600",
                                children: _("Raw source observations (JSON)")
                            }),
                            s("div", {
                                style: "margin-top:6px",
                                children: D
                            })
                        ]
                    }, s("details", i))
                ]
            }, s("div", o)), q = "report", I = [
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
            ], Q = new Map(), U = (a = {
                class: "cbi-tabmenu",
                style: "margin-top:14px;margin-bottom:0",
                children: I.map((e)=>{
                    var t;
                    let n = (t = {
                        class: q === e.id ? "cbi-tab" : "cbi-tab-disabled",
                        "data-tab": e.id,
                        children: s("a", {
                            href: `#tab-${e.id}`,
                            onclick: (t)=>{
                                t.preventDefault();
                                var n = e.id;
                                for (let [e, t] of (q = n, Q))t.className = e === n ? "cbi-tab" : "cbi-tab-disabled";
                                j.element.hidden = "report" !== n, N.element.hidden = "accounts" !== n, P.element.hidden = "console" !== n, J.hidden = "sources" !== n, window.dispatchEvent(new Event("resize"));
                            },
                            children: e.label
                        })
                    }, s("li", t));
                    return Q.set(e.id, n), n;
                })
            }, s("ul", a));
            j.element.hidden = !1, N.element.hidden = !0, P.element.hidden = !0, J.hidden = !0;
            let V = s("div", {
                id: "hl202-panels-container",
                children: [
                    j.element,
                    N.element,
                    P.element,
                    J
                ]
            }), F = [], W = "", H = "", K = ()=>{
                let e = v.value, t = F.find((t)=>t.optical_sn === e);
                if (!t) {
                    z.textContent = _("No HL202 optical devices were found."), T.textContent = "\u2014", C.textContent = "\u2014", k.textContent = "\u2014", $.textContent = "\u2014", S.hidden = !0, j.setTarget(null), N.setTarget(null), P.setTarget(null);
                    return;
                }
                if (z.textContent = `${t.optical_sn} (ONU ${t.onu_id})`, T.textContent = t.model || "HL202", t.optical_online ? (C.className = "hl202-badge hl202-badge-success", C.textContent = _("Optical online")) : (C.className = "hl202-badge hl202-badge-danger", C.textContent = _("Optical offline")), t.can_execute && t.mqtt) {
                    k.className = "hl202-badge hl202-badge-success", k.textContent = _("MQTT ready"), $.textContent = `gen: ${t.mqtt.binding_generation}`, $.hidden = !1, S.hidden = !0;
                    let e = {
                        optical_sn: t.optical_sn,
                        onu_id: t.onu_id,
                        binding_generation: t.mqtt.binding_generation
                    };
                    j.setTarget(e), N.setTarget(e), P.setTarget(e);
                } else k.className = "hl202-badge hl202-badge-warning", k.textContent = _("MQTT unavailable"), $.hidden = !0, S.hidden = !1, j.setTarget(null), N.setTarget(null), P.setTarget(null);
            }, B = async ()=>{
                w.disabled = !0, x.textContent = _("Loading devices\u2026");
                try {
                    let t = await ti(), n = t.devices;
                    F = n;
                    let r = n.map((e)=>`${e.optical_sn}:${e.onu_id}:${e.optical_online}:${e.can_execute}:${e.report_revision}:${e.mqtt?.binding_generation}`).join("|");
                    if (r !== W) {
                        W = r;
                        let e = v.value;
                        v.replaceChildren(...n.map((e)=>{
                            var t;
                            return t = {
                                value: e.optical_sn,
                                children: eU(`${e.model} / ${e.optical_sn} / ONU ${e.onu_id} \u{2014} ${e.can_execute ? _("MQTT ready") : _("MQTT unavailable")}; ${e.optical_online ? _("Optical online") : _("Optical offline")}`)
                            }, s("option", t);
                        })), n.some((t)=>t.optical_sn === e) && (v.value = e);
                    }
                    x.textContent = n.length ? _("Select a device to inspect reports and run operations.") : _("No HL202 optical devices were found."), D.textContent = JSON.stringify(t.sources, null, 2);
                    let i = M.value, o = [];
                    for (let n of (M.replaceChildren(), t.sources)){
                        var e;
                        o.push({
                            mqtt_mac: n.mqtt_mac,
                            binding_generation: n.binding_generation
                        }), M.append((e = {
                            value: n.mqtt_mac,
                            children: eU(`${n.mqtt_mac} \u{2014} ${String(n.reason)}`)
                        }, s("option", e)));
                    }
                    A = o, o.some((e)=>e.mqtt_mac === i) && (M.value = i), R.disabled = 0 === o.length, K();
                    let a = n.find((e)=>e.optical_sn === v.value);
                    a?.can_execute && null !== a.report_revision && `${a.optical_sn}:${a.mqtt?.binding_generation}:${a.report_revision}` !== H && !tc && (H = `${a.optical_sn}:${a.mqtt?.binding_generation}:${a.report_revision}`, j.refresh());
                } catch (e) {
                    F = [], K(), x.textContent = e instanceof Error ? e.message : _("Request failed");
                } finally{
                    w.disabled = !1;
                }
            };
            v.addEventListener("change", K), R.addEventListener("click", ()=>{
                let e = A.find((e)=>e.mqtt_mac === M.value);
                if (Z.replaceChildren(), e) {
                    let t = td();
                    t.setTarget(e), Z.append(t.element), t.refresh(e);
                }
            }), w.addEventListener("click", ()=>{
                B();
            }), B();
            let X = (u = {
                class: "cbi-map hl202-management",
                children: [
                    s("style", {
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
                    s("h2", {
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
                                            s("strong", {
                                                children: [
                                                    _("HL202 device"),
                                                    ":"
                                                ]
                                            }),
                                            v
                                        ]
                                    }, s("label", l)),
                                    w
                                ]
                            }, s("div", c)),
                            x,
                            O
                        ]
                    }, s("div", d)),
                    U,
                    V
                ]
            }, s("div", u)), G = async ()=>{
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