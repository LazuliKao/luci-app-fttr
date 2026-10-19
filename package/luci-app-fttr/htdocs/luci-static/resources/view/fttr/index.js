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
const o = Symbol.for("jsx.fragment");
function a(e, t) {
    let { children: n, ...r } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, i = function e(t) {
        let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let r of t)null != r && "boolean" != typeof r && (Array.isArray(r) ? e(r, n) : n.push(r instanceof Node ? r : String(r)));
        return n;
    }(null == n ? [] : Array.isArray(n) ? n : [
        n
    ]);
    if (e === o) {
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
    let a = {}, s = {
        ...r
    };
    for (let [e, t] of Object.entries(s))e.startsWith("on") && "function" == typeof t ? (a[e] = t, delete s[e]) : "boolean" == typeof t && (t ? s[e] = e : delete s[e]);
    let l = Object.keys(s).length > 0 ? i.length > 1 ? E(e, s, i) : E(e, s, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
    for (let [e, t] of Object.entries(a)){
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
function m(...e) {
    let t = {};
    for (let n of e)Object.assign(t, Object.getOwnPropertyDescriptors(n));
    return Object.defineProperties({}, t);
}
const y = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
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
function O(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let n = t; n < e.issues.length; n++)if (e.issues[n]?.continue !== !0) return !0;
    return !1;
}
function j(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function P(e) {
    return "string" == typeof e ? e : e?.message;
}
function S(e, t, n) {
    let r = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (r.message = P(e.inst?._zod.def?.error?.(e)) ?? P(t?.error?.(e)) ?? P(n.customError?.(e)) ?? P(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
const C = (e, t)=>{
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
}, T = s("$ZodError", C), R = s("$ZodError", C, {
    Parent: Error
}), N = (t = R, (e, n, r, i)=>{
    let o = r ? Object.assign(r, {
        async: !1
    }) : {
        async: !1
    }, a = e._zod.run({
        value: n,
        issues: []
    }, o);
    if (a instanceof Promise) throw new l();
    if (a.issues.length) {
        let e = new (i?.Err ?? t)(a.issues.map((e)=>S(e, o, c())));
        throw y(e, i?.callee), e;
    }
    return a.value;
}), A = (n = R, async (e, t, r, i)=>{
    let o = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, a = e._zod.run({
        value: t,
        issues: []
    }, o);
    if (a instanceof Promise && (a = await a), a.issues.length) {
        let e = new (i?.Err ?? n)(a.issues.map((e)=>S(e, o, c())));
        throw y(e, i?.callee), e;
    }
    return a.value;
}), M = (r = R, (e, t, n)=>{
    let i = n ? {
        ...n,
        async: !1
    } : {
        async: !1
    }, o = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (o instanceof Promise) throw new l();
    return o.issues.length ? {
        success: !1,
        error: new (r ?? T)(o.issues.map((e)=>S(e, i, c())))
    } : {
        success: !0,
        data: o.value
    };
}), D = (i = R, async (e, t, n)=>{
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
        error: new i(o.issues.map((e)=>S(e, r, c())))
    } : {
        success: !0,
        data: o.value
    };
}), I = /^-?\d+(?:\.\d+)?$/, Z = /^(?:true|false)$/i, U = /^null$/i, B = {
    major: 4,
    minor: 3,
    patch: 6
}, F = s("$ZodType", (e, t)=>{
    var n;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = B;
    let r = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && r.unshift(e), r))for (let n of t._zod.onattach)n(e);
    if (0 === r.length) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, n)=>{
            let r, i = O(e);
            for (let o of t){
                if (o._zod.def.when) {
                    if (!o._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, a = o._zod.check(e);
                if (a instanceof Promise && n?.async === !1) throw new l();
                if (r || a instanceof Promise) r = (r ?? Promise.resolve()).then(async ()=>{
                    await a, e.issues.length !== t && (i || (i = O(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = O(e, t));
                }
            }
            return r ? r.then(()=>e) : e;
        }, n = (n, i, o)=>{
            if (O(n)) return n.aborted = !0, n;
            let a = t(i, r, o);
            if (a instanceof Promise) {
                if (!1 === o.async) throw new l();
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
                if (!1 === o.async) throw new l();
                return a.then((e)=>t(e, r, o));
            }
            return t(a, r, o);
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
}), q = s("$ZodString", (e, t)=>{
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
}), W = s("$ZodNumber", (e, t)=>{
    F.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? I, e._zod.parse = (n, r)=>{
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
}), V = s("$ZodBoolean", (e, t)=>{
    F.init(e, t), e._zod.pattern = Z, e._zod.parse = (n, r)=>{
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
    F.init(e, t), e._zod.pattern = U, e._zod.values = new Set([
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
}), G = s("$ZodNever", (e, t)=>{
    F.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function K(e, t, n) {
    e.issues.length && t.issues.push(...j(n, e.issues)), t.value[n] = e.value;
}
const X = s("$ZodArray", (e, t)=>{
    F.init(e, t), e._zod.parse = (n, r)=>{
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
            s instanceof Promise ? o.push(s.then((t)=>K(t, n, e))) : K(s, n, e);
        }
        return o.length ? Promise.all(o).then(()=>n) : n;
    };
});
function H(e, t, n, r, i) {
    if (e.issues.length) {
        if (i && !(n in r)) return;
        t.issues.push(...j(n, e.issues));
    }
    void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const Q = s("$ZodObject", (e, t)=>{
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
    let o = t.catchall;
    e._zod.parse = (t, r)=>{
        n ?? (n = i.value);
        let a = t.value;
        if (!b(a)) return t.issues.push({
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
            let a = [], s = i.keySet, l = i.catchall._zod, d = l.def.type, c = "optional" === l.optout;
            for(let i in t){
                if (s.has(i)) continue;
                if ("never" === d) {
                    a.push(i);
                    continue;
                }
                let o = l.run({
                    value: t[i],
                    issues: []
                }, r);
                o instanceof Promise ? e.push(o.then((e)=>H(e, n, i, t, c))) : H(o, n, i, t, c);
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
function Y(e, t, n, r) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let i = e.filter((e)=>!O(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>S(e, r, c())))
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
        return a ? Promise.all(s).then((t)=>Y(t, i, e, o)) : Y(s, i, e, o);
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
    e._zod.parse = (i, o)=>{
        let a = i.value;
        if (!b(a)) return i.issues.push({
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
}), en = s("$ZodRecord", (e, t)=>{
    F.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!w(i)) return n.issues.push({
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
                    t.issues.length && n.issues.push(...j(e, t.issues)), n.value[e] = t.value;
                })) : (a.issues.length && n.issues.push(...j(e, a.issues)), n.value[e] = a.value);
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
            if ("string" == typeof a && I.test(a) && s.issues.length) {
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
                    issues: s.issues.map((e)=>S(e, r, c())),
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
                e.issues.length && n.issues.push(...j(a, e.issues)), n.value[s.value] = e.value;
            })) : (l.issues.length && n.issues.push(...j(a, l.issues)), n.value[s.value] = l.value);
        }
        return o.length ? Promise.all(o).then(()=>n) : n;
    };
}), er = s("$ZodEnum", (e, t)=>{
    var n;
    let r;
    F.init(e, t);
    let i = (r = Object.values(n = t.entries).filter((e)=>"number" == typeof e), Object.entries(n).filter(([e, t])=>-1 === r.indexOf(+e)).map(([e, t])=>t)), o = new Set(i);
    e._zod.values = o, e._zod.pattern = RegExp(`^(${i.filter((e)=>z.has(typeof e)).map((e)=>"string" == typeof e ? x(e) : e.toString()).join("|")})$`), e._zod.parse = (t, n)=>{
        let r = t.value;
        return o.has(r) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: r,
            inst: e
        }), t;
    };
}), ei = s("$ZodLiteral", (e, t)=>{
    if (F.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? x(e) : e ? x(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i)=>{
        let o = r.value;
        return n.has(o) || r.issues.push({
            code: "invalid_value",
            values: t.values,
            input: o,
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
const ea = s("$ZodOptional", (e, t)=>{
    F.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let r = t.innerType._zod.run(e, n);
            return r instanceof Promise ? r.then((t)=>eo(t, e.value)) : eo(r, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, n);
    };
}), es = s("$ZodNullable", (e, t)=>{
    F.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)}|null)$`) : void 0;
    }), g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), el = s("$ZodCatch", (e, t)=>{
    F.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, n)=>{
        if ("backward" === n.direction) return t.innerType._zod.run(e, n);
        let r = t.innerType._zod.run(e, n);
        return r instanceof Promise ? r.then((r)=>(e.value = r.value, r.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: r.issues.map((e)=>S(e, n, c()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = r.value, r.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: r.issues.map((e)=>S(e, n, c()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ed = s("$ZodLazy", (e, t)=>{
    F.init(e, t), g(e._zod, "innerType", ()=>t.getter()), g(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), g(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), g(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), g(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n)=>e._zod.innerType._zod.run(t, n);
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
    F.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>N(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>M(e, t, n), e.parseAsync = async (t, n)=>A(e, t, n, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, n)=>D(e, t, n), e.check = (...n)=>e.clone({
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
}), eu = s("ZodMiniString", (e, t)=>{
    q.init(e, t), ec.init(e, t);
});
function ep(e) {
    return new eu({
        type: "string",
        ...$(e)
    });
}
const e_ = s("ZodMiniNumber", (e, t)=>{
    W.init(e, t), ec.init(e, t);
});
function ef(e) {
    return new e_({
        type: "number",
        checks: [],
        ...$(e)
    });
}
const eh = s("ZodMiniBoolean", (e, t)=>{
    V.init(e, t), ec.init(e, t);
});
function eg(e) {
    return new eh({
        type: "boolean",
        ...$(e)
    });
}
const ev = s("ZodMiniNull", (e, t)=>{
    J.init(e, t), ec.init(e, t);
}), em = s("ZodMiniNever", (e, t)=>{
    G.init(e, t), ec.init(e, t);
});
function ey(e) {
    return new em({
        type: "never",
        ...$(e)
    });
}
const eb = s("ZodMiniArray", (e, t)=>{
    X.init(e, t), ec.init(e, t);
});
function ew(e, t) {
    return new eb({
        type: "array",
        element: e,
        ...$(t)
    });
}
const ez = s("ZodMiniObject", (e, t)=>{
    Q.init(e, t), ec.init(e, t), g(e, "shape", ()=>t.shape);
});
function ex(e, t) {
    return new ez({
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
const eO = s("ZodMiniDiscriminatedUnion", (e, t)=>{
    et.init(e, t), ec.init(e, t);
});
function ej(e, t, n) {
    return new eO({
        type: "union",
        options: t,
        discriminator: e,
        ...$(n)
    });
}
const eP = s("ZodMiniRecord", (e, t)=>{
    en.init(e, t), ec.init(e, t);
});
function eS(e, t, n) {
    return new eP({
        type: "record",
        keyType: e,
        valueType: t,
        ...$(n)
    });
}
const eC = s("ZodMiniEnum", (e, t)=>{
    er.init(e, t), ec.init(e, t), e.options = Object.values(t.entries);
});
function eE(e, t) {
    return new eC({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...$(t)
    });
}
const eT = s("ZodMiniLiteral", (e, t)=>{
    ei.init(e, t), ec.init(e, t);
});
function eR(e, t) {
    return new eT({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...$(t)
    });
}
const eN = s("ZodMiniOptional", (e, t)=>{
    ea.init(e, t), ec.init(e, t);
});
function eA(e) {
    return new eN({
        type: "optional",
        innerType: e
    });
}
const eM = s("ZodMiniNullable", (e, t)=>{
    es.init(e, t), ec.init(e, t);
});
function eD(e) {
    return new eM({
        type: "nullable",
        innerType: e
    });
}
const eI = s("ZodMiniCatch", (e, t)=>{
    el.init(e, t), ec.init(e, t);
}), eL = s("ZodMiniLazy", (e, t)=>{
    ed.init(e, t), ec.init(e, t);
});
function eZ() {
    let e = new eL({
        type: "lazy",
        getter: ()=>e$([
                ep(),
                ef(),
                eg(),
                new ev({
                    type: "null",
                    ...$(void 0)
                }),
                ew(e),
                eS(ep(), e)
            ])
    });
    return e;
}
let eU = ex({
    error: e$([
        ep(),
        ex({
            code: ep(),
            message: ep()
        })
    ])
});
class eB extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eF(e) {
    let t = eU.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eB("rpc", e) : new eB(e.code, e.message);
    }
    return e;
}
const eq = ex({
    status: eR("pending"),
    job: ep()
}), eW = ej("status", [
    ex({
        status: eR("pending")
    }),
    ex({
        status: eR("ready"),
        chunk: ef(),
        chunks: ef(),
        bytes: ef(),
        data: ep()
    })
]);
let eV = ep(), eJ = ef(), eG = eg(), eK = eA(eV), eX = eA(eJ), eH = eA(eG);
const eQ = eE([
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
]), eY = eE([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending"
]), e0 = ex({
    id: eV,
    name: eA(eD(eV)),
    kind: eE([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eV,
    state: eV,
    reason: eK,
    revision: eK,
    current_revision: eH,
    management_fresh: eH,
    operation_id: eX,
    task_id: eA(eD(eJ)),
    updated_at: eX,
    changes: eA(ew(ex({
        name: eV,
        desired: eV
    })))
});
let e1 = ex({
    state: eV,
    reason: eK,
    task_id: eA(eD(eJ)),
    instance: eX
});
const e2 = ex({
    cwmp_id: eV,
    state: eE([
        "online",
        "waiting_inform",
        "offline_or_stale"
    ]),
    optical_online: eG,
    last_inform: eD(eJ),
    age_seconds: eD(eJ)
});
let e5 = ex({
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
    method: eK,
    reason: eK,
    mqtt_target: eD(eV),
    binding_source: eK,
    link_identity_error: eD(eV),
    mqtt_last_seen: eD(eJ),
    cwmp_id: eK,
    desired_version: eK,
    generation: eX,
    inflight: eH,
    attempts: eX,
    next_retry_at: eX,
    updated_at: eX,
    settings_verified_at: eD(eJ),
    last_inform: eD(eJ),
    last_error: eA(eD(eV)),
    persistence_error: eA(eD(eV)),
    desired: eA(eD(ex({
        vlan: eJ,
        vlans: ew(eJ),
        priority: eJ,
        acs_url: eV
    }))),
    listener: eA(ex({
        enabled: eG,
        listen: eV,
        path: eV,
        error: eD(eV)
    })),
    endpoint_notice: eK,
    manual_steps: eA(ew(eV))
});
const e3 = ej("state", [
    e5,
    function(e, t) {
        if (!w(t)) throw Error("Invalid input to extend: expected a plain object");
        let n = e._zod.def.checks;
        if (n && n.length > 0) {
            let n = e._zod.def.shape;
            for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(n, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let r = m(e._zod.def, {
            get shape () {
                let n = {
                    ...e._zod.def.shape,
                    ...t
                };
                return v(this, "shape", n), n;
            }
        });
        return k(e, r);
    }(function(e) {
        var t = void 0;
        let n = e._zod.def.checks;
        if (n && n.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let r = m(e._zod.def, {
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
                return v(this, "shape", r), r;
            },
            checks: []
        });
        return k(e, r);
    }(e5), {
        state: eE([
            "pending",
            "unavailable"
        ]),
        reason: eV
    })
]), e4 = ex({
    state: eQ,
    operation_id: eX,
    device: eK,
    optical_sn: eK,
    cwmp_id: eK,
    revision: eK,
    mode: eA(eE([
        "apply",
        "plan"
    ])),
    started_at: eX,
    current_revision: eH,
    management_fresh: eH,
    reason: eK,
    error: eK,
    items: ew(e0),
    cwmp_contract: eA(ex({
        state: eV,
        requested: eV,
        contract: eD(eV),
        reason: eV,
        cache_hit: eG,
        schema: eV,
        capabilities: eD(ex({
            wan: eV,
            wlan: eV,
            binding: eV
        }))
    })),
    wan_objects: eA(eS(eV, eZ())),
    wan_lifecycle: eA(eS(eV, e1)),
    wan_stage: eA(eE([
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
    wifi_objects: eA(ex({
        owned: ew(eJ),
        pending: eD(eV),
        pending_instance: eD(eJ)
    })),
    wifi_lifecycle: eA(eS(eV, e1)),
    wifi_stage: eA(eE([
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
    wifi_cleanup: eA(eE([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e7 = ex({
    enabled: eG,
    mode: eE([
        "auto",
        "manual"
    ]),
    vlan: ew(eJ),
    priority: eJ,
    address: eV,
    acs_url: eV,
    port: eJ,
    path: eV,
    dhcp_enabled: eG
}), e8 = ex({
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
    error: eD(eV),
    inflight: eG,
    ready: eG,
    desired_version: eD(eV),
    applied_version: eD(eV),
    next_retry_at: eJ,
    attempts: eJ,
    desired: eD(e7),
    applied: eD(e7),
    previous: eD(e7),
    plan: ew(ex({
        operation: eV,
        key: eV,
        value: ew(eV)
    }))
});
const e6 = ex({
    device: eV,
    name: eD(eV),
    group: eD(eV),
    group_name: eD(eV),
    template: eD(eV),
    template_name: eD(eV),
    optical_sn: eV,
    adapter: eV,
    omci_management: ex({
        state: eV,
        reason: eK
    }),
    management: eD(e2),
    acs_bootstrap: e3,
    provisioning: e4,
    services: ew(e0),
    ssids: ew(e0),
    wifi_sync: eY
}), e9 = ex({
    enabled: eG,
    mode: eE([
        "auto",
        "manual"
    ]),
    method: eR("diff"),
    revision: eV,
    triggers: ew(eV),
    interval: eJ,
    error: eD(eV),
    devices: ew(e6),
    management_network: e8,
    omci_management: eZ(),
    groups: ew(ex({
        id: eV,
        name: eD(eV),
        template: eV
    })),
    pending_devices: ew(eV)
});
e$([
    ex({
        valid: eR(!0),
        revision: eV,
        devices: eJ,
        error: eA(ey())
    }),
    ex({
        error: eV,
        valid: eA(ey()),
        revision: eA(ey()),
        devices: eA(ey())
    })
]);
let te = ep(), tt = ef(), tn = eD(tt), tr = eS(te, ex({
    source: te,
    unit: te,
    reason: eD(te),
    raw: eD(te),
    age_seconds: tn
}));
const ti = ex({
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
    generation: tt,
    error: eD(te)
}), to = eE([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let ta = ex({
    model: te,
    wavelength_tx_nm: tt,
    wavelength_rx_nm: tt,
    phy_rate_downlink_gbps: tt,
    phy_rate_uplink_gbps: tt,
    tx_power_dbm: tn,
    laser_bias_current_ma: tn,
    temperature_celsius: tn,
    vcc_voltage: tn,
    cdr_locked: eD(eg()),
    measurements: tr
}), ts = ex({
    equipment_id: eD(te),
    hardware_version: eD(te),
    software_images: ew(te),
    omcc_version: tn,
    errors: ew(te)
});
const tl = ex({
    onu_id: tt,
    vendor: te,
    model: te,
    serial_number: te,
    state: to,
    business_status: ti,
    management: eD(e2),
    provisioning: eD(e4),
    services: ew(e0),
    ssids: ew(e0),
    wifi_sync: eY,
    acs_bootstrap: eA(e3),
    identity: eD(ts),
    identity_age_seconds: tn,
    identity_current: eg(),
    fiber_distance_m: tn,
    ranging_delay_rtd_ns: tn,
    equalization_delay_bits: new eI({
        type: "catch",
        innerType: tn,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tn,
    optical_tx_power_dbm: tn,
    firmware_version: te,
    hardware_version: te,
    uptime_seconds: tn,
    data_path: ex({
        interface: te,
        gem_ports: eD(ew(tt)),
        vlan_id: tn,
        tx_bytes: tn,
        rx_bytes: tn,
        current_tx_kbps: tn,
        current_rx_kbps: tn,
        measurements: tr
    }),
    wifi_mesh: ex({
        channel_2g: tn,
        channel_5g: tn,
        bandwidth_5g: eD(te),
        tx_power_pct: tn,
        measurements: tr
    }),
    connected_clients: eD(ew(ex({
        mac: te,
        ip: te,
        band: te,
        rssi_dbm: tn,
        rx_rate_mbps: tn,
        tx_rate_mbps: tn
    }))),
    measurements: tr
});
let td = ex({
    port: tt,
    interface: te,
    carrier: eg(),
    status: te,
    onu_id: eA(tt),
    onu_sn: eA(te),
    link_state: te
});
const tc = ex({
    fpga_status: te,
    provisioning: eD(e9),
    optical_transceiver: ta,
    switch_ports: ew(td),
    sub_gateways: ew(tl),
    telemetry_gateways: ew(ex({
        id: te,
        last_seen_sec_ago: tt,
        last_payload_bytes: tt
    }))
}), tu = eS(te, ex({
    carrier: eA(eg()),
    mac: eA(te),
    link: eA(ex({
        speed: eA(tt),
        duplex: eA(te),
        autoneg: eA(eg())
    })),
    stats: eA(eS(te, tt))
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
function t_(e) {
    return `${_(tp[e.phase])} \xb7 ${e.generation}${e.error ? ` \xb7 ${e.error}` : ""}`;
}
let tf = L.rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: !0
}), th = (L.rpc.declare({
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
const tg = async ()=>tc.parse(eF(await tf())), tv = async ()=>tu.parse(eF(await th()));
e$([
    ex({
        operation_ids: ew(ef()),
        revision: ep()
    }),
    ex({
        started: eR(!0),
        mode: eE([
            "apply",
            "plan"
        ])
    }),
    ex({
        reset: eR(!0),
        device: ep()
    })
]);
let tm = ep(), ty = ef(), tb = eg(), tw = ex({
    id: tm,
    url: tm
}), tz = ex({
    name: tm,
    kind: eE([
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
    index: ty,
    mask: ty,
    size: ty,
    read: tb,
    write: tb,
    set_by_create: tb,
    avc: tb,
    optional: tb,
    deprecated: tb,
    default_hex: eD(tm),
    reference: tw
}), tx = ej("type", [
    ex({
        type: eR("unsigned"),
        value: ty
    }),
    ex({
        type: eR("signed"),
        value: ty
    }),
    ex({
        type: eR("decimal"),
        value: tm
    }),
    ex({
        type: eR("text"),
        value: eD(tm)
    }),
    ex({
        type: eR("octets"),
        hex: tm
    }),
    ex({
        type: eR("table_length"),
        bytes: ty
    })
]), tk = ex({
    code: tm,
    message: tm,
    offset: ty,
    mask: ty
}), t$ = eE([
    "layout",
    "name_only",
    "unknown"
]), tO = ex({
    raw_hex: tm,
    filter_outer_priority: ty,
    filter_outer_vid: ty,
    filter_outer_tpid_dei: ty,
    filter_inner_priority: ty,
    filter_inner_vid: ty,
    filter_inner_tpid_dei: ty,
    filter_ethertype: ty,
    tags_to_remove: ty,
    treatment_outer_priority: ty,
    treatment_outer_vid: ty,
    treatment_outer_tpid_dei: ty,
    treatment_inner_priority: ty,
    treatment_inner_vid: ty,
    treatment_inner_tpid_dei: ty,
    delete_entry: tb
}), tj = ex({
    schema_version: eR(1),
    reference_version: tm,
    onu_id: eD(ty),
    uploaded_complete: tb,
    expected_records: ty,
    received_records: ty,
    decoded_records: ty,
    partial_records: ty,
    basic_records: ty,
    tables_requested: tb,
    tables_collected: tb,
    classes: ew(ex({
        class_id: ty,
        name: eD(tm),
        entities: ty,
        records: ty,
        support: t$
    })),
    entities: ew(ex({
        class_id: ty,
        entity_id: ty,
        name: eD(tm),
        support: t$,
        reference: eD(tw),
        sequences: ew(ty),
        attributes: ew(ex({
            definition: tz,
            value: eD(tx),
            observations: ew(ex({
                raw_hex: tm,
                value: tx,
                sequences: ew(ty)
            }))
        })),
        diagnostics: ew(tk)
    })),
    records: ew(ex({
        class_id: ty,
        entity_id: ty,
        sequence: ty,
        attribute_mask: ty,
        raw_hex: tm,
        consumed: ty,
        remaining_hex: tm,
        undecoded_mask: ty
    })),
    tables: ew(ex({
        class_id: ty,
        entity_id: ty,
        attribute: tz,
        collected: tb,
        error: eD(tm),
        raw_hex: tm,
        rows: ew(tm),
        vlan_rules: ew(tO)
    })),
    diagnostics: ew(tk)
});
const tP = ex({
    status: eR("ready"),
    report: tj
});
let tS = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_start",
    params: [
        "onu_id",
        "optical_sn",
        "tables"
    ],
    reject: !0
}), tC = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
});
const tE = async (e, t, n)=>eq.parse(eF(await tS(e, t, n))), tT = async (e, t)=>eW.parse(eF(await tC(e, t)));
let tR = (e)=>null == e || "" === e ? "\u2014" : String(e), tN = (e)=>JSON.stringify(e, null, 2);
function tA(e) {
    let t = e.reference;
    return t?.url.startsWith("https://github.com/opencord/omci-lib-go/blob/v2.2.4/") ? a("a", {
        href: t.url,
        target: "_blank",
        rel: "noopener noreferrer",
        children: t.id
    }) : a("span", {
        children: "\u2014"
    });
}
let tM = L.view, tD = L.Poll, tI = {
    "FTTR overview": "FTTR \u603B\u89C8",
    Controller: "\u4E3B\u63A7\u5236\u5668",
    FPGA: "FPGA",
    "FPGA status": "FPGA \u72B6\u6001",
    "Optical module": "\u5149\u6A21\u5757",
    "CDR lock": "CDR \u9501\u5B9A",
    "Sub-gateways": "\u4ECE\u7F51\u5173\u5217\u8868",
    "Downstream ports": "\u4E0B\u884C\u7AEF\u53E3",
    "ONU ID": "ONU ID",
    Vendor: "\u4F9B\u5E94\u5546",
    Model: "\u578B\u53F7",
    "Optical serial": "\u5149\u7EA4 SN",
    Registration: "\u6CE8\u518C\u72B6\u6001",
    Business: "\u4E1A\u52A1\u72B6\u6001",
    Firmware: "\u56FA\u4EF6\u7248\u672C",
    "Data interface": "\u6570\u636E\u63A5\u53E3",
    CWMP: "CWMP",
    Synchronization: "\u914D\u7F6E\u540C\u6B65",
    "Wi-Fi sync": "Wi-Fi \u540C\u6B65",
    Details: "\u8BE6\u60C5",
    "Port status": "\u7AEF\u53E3\u72B6\u6001",
    ONU: "ONU",
    "MAC address": "MAC \u5730\u5740",
    Locked: "\u5DF2\u9501\u5B9A",
    Unlocked: "\u672A\u9501\u5B9A",
    Connected: "\u5DF2\u8FDE\u63A5",
    Disconnected: "\u672A\u8FDE\u63A5",
    Ready: "\u5DF2\u5C31\u7EEA",
    Online: "\u5728\u7EBF",
    Offline: "\u79BB\u7EBF",
    "Waiting Inform": "\u7B49\u5F85 Inform",
    "Offline or stale": "\u79BB\u7EBF\u6216\u8FC7\u671F",
    Discovering: "\u53D1\u73B0\u4E2D",
    Completed: "\u5DF2\u5B8C\u6210",
    Interrupted: "\u5DF2\u4E2D\u65AD",
    Blocked: "\u5DF2\u963B\u585E",
    Reconciling: "\u8C03\u8C10\u4E2D",
    Pending: "\u7B49\u5F85\u4E2D",
    "Not started": "\u672A\u5F00\u59CB",
    Verified: "\u5DF2\u6821\u9A8C",
    "WAN pending": "WAN \u5F15\u5BFC\u4E2D",
    Synced: "\u5DF2\u540C\u6B65",
    "Not configured": "\u672A\u914D\u7F6E",
    "Attention required": "\u9700\u6CE8\u610F",
    "Stale revision": "\u7248\u672C\u8FC7\u671F",
    "Stale management": "\u7BA1\u7406\u8FC7\u671F",
    Unverified: "\u4E0B\u53D1\u672A\u6821\u9A8C",
    Enabled: "\u5DF2\u542F\u7528",
    Disabled: "\u5DF2\u7981\u7528",
    Provisioning: "\u914D\u7F6E\u4E0B\u53D1",
    Mode: "\u6A21\u5F0F",
    Revision: "\u7248\u672C\u53F7",
    "No registered sub-gateways.": "\u65E0\u5DF2\u6CE8\u518C\u4ECE\u7F51\u5173\u3002",
    "O5 (Operation)": "O5 \u8FD0\u884C",
    "Link up": "\u5DF2\u8FDE\u901A",
    "Link down": "\u5DF2\u65AD\u5F00",
    Unavailable: "\u4E0D\u53EF\u7528",
    Unknown: "\u672A\u77E5",
    "Received bytes": "\u63A5\u6536\u5B57\u8282\u6570",
    "Received packets": "\u63A5\u6536\u6570\u636E\u5305",
    "Received multicast": "\u63A5\u6536\u7EC4\u64AD\u5305",
    "Receive errors": "\u63A5\u6536\u9519\u8BEF",
    "Receive dropped": "\u63A5\u6536\u4E22\u5F03",
    "Transmitted bytes": "\u53D1\u9001\u5B57\u8282\u6570",
    "Transmitted packets": "\u53D1\u9001\u6570\u636E\u5305",
    "Transmit errors": "\u53D1\u9001\u9519\u8BEF",
    "Transmit dropped": "\u53D1\u9001\u4E22\u5F03",
    "Previous configuration": "\u5386\u53F2\u914D\u7F6E",
    "Management stale": "\u7BA1\u7406\u4FE1\u606F\u8FC7\u671F",
    "Provisioning status unavailable": "\u914D\u7F6E\u4E0B\u53D1\u72B6\u6001\u4E0D\u53EF\u7528",
    wan_reconciling: "WAN \u8C03\u8C10\u4E2D",
    wan_verifying: "WAN \u6821\u9A8C\u4E2D",
    wifi_reconciling: "Wi-Fi \u8C03\u8C10\u4E2D",
    discovering: "\u53D1\u73B0\u4E2D",
    reading: "\u8BFB\u53D6\u4E2D",
    disabling: "\u7981\u7528\u4E2D",
    disabling_read: "\u7981\u7528\u6821\u9A8C\u4E2D",
    writing: "\u5199\u5165\u4E2D",
    verifying: "\u6821\u9A8C\u4E2D",
    settling: "\u7A33\u5B9A\u4E2D"
};
function tL(e) {
    let t = _(e);
    return t && t !== e ? t : /zh/i.test(document.documentElement.getAttribute("lang") || window.L?.env?.lang || navigator.language || "") && tI[e] ? tI[e] : t || e;
}
let tZ = (e)=>null == e || "" === e ? "\u2014" : String(e);
function tU(e, t, n, r) {
    e.textContent = n, "none" === t ? e.className = "" : e.className = `fttr-badge fttr-badge-${t}`, r ? e.setAttribute("title", r) : e.removeAttribute("title");
}
function tB(e) {
    if (void 0 === e || !Number.isFinite(e) || e < 0) return "\u2014";
    if (e < 1024) return `${e} B`;
    let t = [
        "KiB",
        "MiB",
        "GiB",
        "TiB"
    ], n = e / 1024, r = 0;
    for(; n >= 1024 && r < t.length - 1;)n /= 1024, r++;
    return `${n.toFixed(1)} ${t[r]}`;
}
function tF(e) {
    return void 0 === e || !Number.isFinite(e) || e < 0 ? "\u2014" : e < 1000 ? `${e} ${tL("Received packets").includes("\u5305") ? "\u5305" : "Pkts."}` : `${(e / 1000).toFixed(2)} K${tL("Received packets").includes("\u5305") ? "\u5305" : "Pkts."}`;
}
let tq = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
}, tW = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
}, tV = {
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
    failed: _("Failed"),
    error: _("Error"),
    blocked: _("Blocked"),
    not_started: _("Not started")
}, tJ = {
    not_configured: _("Not configured"),
    stale_revision: _("Stale revision"),
    stale_management: _("Stale management"),
    verified: _("Verified"),
    attention_required: _("Attention required"),
    accepted_unverified: _("Unverified"),
    pending: _("Pending")
};
function tG(e) {
    var t, n, r;
    let i = e, s = a("span", {}), l = a("span", {}), d = a("span", {}), c = a("code", {
        style: "font-size:90%"
    }), u = a("span", {
        class: "fttr-badge"
    }), p = a("span", {
        class: "fttr-badge"
    }), f = a("span", {
        style: "font-size:90%"
    }), h = a("code", {
        style: "font-size:90%"
    }), g = a("span", {
        class: "fttr-badge"
    }), v = a("span", {
        class: "fttr-badge"
    }), m = a("span", {
        class: "fttr-badge"
    }), y = (r = {
        "data-fttr-onu-id": String(e.onu_id),
        children: [
            a("td", {
                children: s
            }),
            a("td", {
                children: l
            }),
            a("td", {
                children: d
            }),
            a("td", {
                children: c
            }),
            a("td", {
                children: u
            }),
            a("td", {
                children: p
            }),
            a("td", {
                children: f
            }),
            a("td", {
                children: h
            }),
            a("td", {
                children: g
            }),
            a("td", {
                children: v
            }),
            a("td", {
                children: m
            }),
            (n = {
                style: "text-align:right",
                children: (t = {
                    type: "button",
                    class: "cbi-button cbi-button-neutral",
                    onclick: ()=>(function(e) {
                            var t, n, r, i, s, l, d, c;
                            let u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "basic", p = !1, f = !1, h = null, g = (r = {
                                class: "table",
                                children: (n = {
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
                                            t_(e.business_status)
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
                                            null === (t = e.equalization_delay_bits) ? "\u2014" : `${t} bits`
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
                                        ]
                                    ].map((e)=>{
                                        var t;
                                        let [n, r] = e;
                                        return t = {
                                            children: [
                                                a("th", {
                                                    children: n
                                                }),
                                                a("td", {
                                                    children: tR(r)
                                                })
                                            ]
                                        }, a("tr", t);
                                    })
                                }, a("tbody", n))
                            }, a("table", r)), v = a("p", {
                                role: "status",
                                children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                            }), m = a("div", {}), y = a("textarea", {
                                readOnly: !0,
                                rows: 20,
                                style: "width:100%;font-family:monospace"
                            }), b = a("span", {
                                role: "status"
                            }), w = a("button", {
                                type: "button",
                                class: "cbi-button",
                                onclick: async ()=>{
                                    try {
                                        await navigator.clipboard.writeText(y.value), b.textContent = _("Copied");
                                    } catch  {
                                        y.focus(), y.select(), b.textContent = _("Select and copy the JSON manually.");
                                    }
                                },
                                children: _("Copy JSON")
                            }), z = a("a", {
                                href: "data:application/json,%7B%7D",
                                class: "cbi-button",
                                download: `mib-${e.serial_number}.json`,
                                children: _("Download JSON")
                            }), x = null, k = (i = {
                                children: [
                                    a("p", {
                                        children: [
                                            w,
                                            " ",
                                            z,
                                            " ",
                                            b
                                        ]
                                    }),
                                    y
                                ]
                            }, a("div", i)), $ = a("button", {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                onclick: ()=>A(!1),
                                children: _("Read MIB")
                            }), O = a("button", {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                onclick: ()=>A(!0),
                                children: _("Read MIB and VLAN tables")
                            }), j = (s = {
                                children: [
                                    a("p", {
                                        children: [
                                            $,
                                            " ",
                                            O
                                        ]
                                    }),
                                    v,
                                    m
                                ]
                            }, a("div", s)), P = {
                                basic: g,
                                mib: j,
                                raw: k
                            }, S = new Map();
                            function C(e) {
                                for (let [t, n] of Object.entries(P))t === e ? n.style.removeProperty("display") : n.style.setProperty("display", "none", "important");
                                for (let [t, n] of S)n.disabled = t === e;
                            }
                            let T = (l = {
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
                                    let [t, n] = e, r = a("button", {
                                        type: "button",
                                        class: "cbi-button",
                                        onclick: ()=>C(t),
                                        children: n
                                    });
                                    return S.set(t, r), r;
                                })
                            }, a("p", l)), R = (c = {
                                children: [
                                    T,
                                    g,
                                    j,
                                    k,
                                    (d = {
                                        class: "right",
                                        children: a("button", {
                                            type: "button",
                                            class: "cbi-button",
                                            onclick: ()=>{
                                                p = !0, x && URL.revokeObjectURL(x), L.ui.hideModal();
                                            },
                                            children: _("Close")
                                        })
                                    }, a("div", d))
                                ]
                            }, a(o, c)), N = ()=>!p && T.isConnected && T.getClientRects().length > 0;
                            async function A(t) {
                                if (!f) {
                                    f = !0, $.disabled = O.disabled = !0, v.textContent = _("Reading MIB\u2026");
                                    try {
                                        let o = await tg(), s = o.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                        if (s?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                        if (!N()) return;
                                        let l = await tE(s.onu_id, s.serial_number, t), d = Date.now() + 140000;
                                        for(; N();){
                                            let e = await tT(l.job, 0);
                                            if (!N()) return;
                                            if ("ready" === e.status) {
                                                var n, r, i;
                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                let t = new Uint8Array(e.bytes), o = 0;
                                                for(let n = 0; n < e.chunks; n++){
                                                    let r = 0 === n ? e : await tT(l.job, n);
                                                    if (!N()) return;
                                                    if ("ready" !== r.status || r.chunk !== n || r.chunks !== e.chunks || r.bytes !== e.bytes || !r.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                    let i = atob(r.data);
                                                    if (i.length > 32768 || o + i.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                    for(let e = 0; e < i.length; e++)t[o++] = i.charCodeAt(e);
                                                    v.textContent = `${_("Downloading MIB snapshot")}: ${n + 1}/${e.chunks}`;
                                                }
                                                if (o !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                if (h = tP.parse(eF(JSON.parse(new TextDecoder("utf-8", {
                                                    fatal: !0
                                                }).decode(t)))).report, 1 !== h.schema_version || h.onu_id !== s.onu_id) throw Error(_("Unexpected MIB response"));
                                                v.textContent = `${new Date().toLocaleString()} \xb7 ONU ${h.onu_id} \xb7 ${_("Upload complete")}: ${h.uploaded_complete} \xb7 ${h.received_records}/${h.expected_records} \xb7 ${_("Decoded / partial / basic")}: ${h.decoded_records}/${h.partial_records}/${h.basic_records} \xb7 ${_("Tables requested / collected")}: ${h.tables_requested}/${h.tables_collected}`, m.replaceChildren(function(e) {
                                                    var t, n, r, i, o;
                                                    let s = (t = {
                                                        style: "min-width:0;flex:1"
                                                    }, a("div", t)), l = (n = {
                                                        type: "search",
                                                        placeholder: _("Search ME name or Class ID")
                                                    }, a("input", n)), d = (r = {}, a("div", r));
                                                    function c(t) {
                                                        s.replaceChildren(...e.entities.filter((e)=>e.class_id === t).map((n)=>{
                                                            var r, i, o, s, l, d, c, u, p, f, h, g, v, m;
                                                            return m = {
                                                                children: [
                                                                    (r = {
                                                                        children: [
                                                                            tR(n.name),
                                                                            " \xb7 ",
                                                                            _("Entity"),
                                                                            " ",
                                                                            n.entity_id,
                                                                            " (0x",
                                                                            n.entity_id.toString(16),
                                                                            ") \xb7",
                                                                            " ",
                                                                            n.support
                                                                        ]
                                                                    }, a("summary", r)),
                                                                    (p = {
                                                                        class: "table",
                                                                        children: [
                                                                            (c = {
                                                                                children: (d = {
                                                                                    children: [
                                                                                        (i = {
                                                                                            children: _("Attribute")
                                                                                        }, a("th", i)),
                                                                                        (o = {
                                                                                            children: _("Type")
                                                                                        }, a("th", o)),
                                                                                        (s = {
                                                                                            children: _("Value")
                                                                                        }, a("th", s)),
                                                                                        (l = {
                                                                                            children: _("Definition")
                                                                                        }, a("th", l))
                                                                                    ]
                                                                                }, a("tr", d))
                                                                            }, a("thead", c)),
                                                                            (u = {
                                                                                children: n.attributes.map((e)=>{
                                                                                    var t, n, r, i, o, s, l, d;
                                                                                    return d = {
                                                                                        children: [
                                                                                            (t = {
                                                                                                children: e.definition.name
                                                                                            }, a("td", t)),
                                                                                            (n = {
                                                                                                children: e.definition.kind
                                                                                            }, a("td", n)),
                                                                                            (s = {
                                                                                                children: [
                                                                                                    function(e) {
                                                                                                        if (null === e) return _("Conflicting values; inspect observations");
                                                                                                        switch(e.type){
                                                                                                            case "unsigned":
                                                                                                            case "signed":
                                                                                                            case "decimal":
                                                                                                            case "text":
                                                                                                                return tR(e.value);
                                                                                                            case "octets":
                                                                                                                return tR(e.hex);
                                                                                                            case "table_length":
                                                                                                                return tR(e.bytes);
                                                                                                            default:
                                                                                                                throw new eB("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                        }
                                                                                                    }(e.value),
                                                                                                    (o = {
                                                                                                        children: [
                                                                                                            (r = {
                                                                                                                children: _("Raw data / observations")
                                                                                                            }, a("summary", r)),
                                                                                                            (i = {
                                                                                                                style: "white-space:pre-wrap;overflow-wrap:anywhere",
                                                                                                                children: tN(e.observations)
                                                                                                            }, a("pre", i))
                                                                                                        ]
                                                                                                    }, a("details", o))
                                                                                                ]
                                                                                            }, a("td", s)),
                                                                                            (l = {
                                                                                                children: tA(e.definition)
                                                                                            }, a("td", l))
                                                                                        ]
                                                                                    }, a("tr", d);
                                                                                })
                                                                            }, a("tbody", u))
                                                                        ]
                                                                    }, a("table", p)),
                                                                    n.attributes.length ? null : (f = {
                                                                        children: _("Basic display only; raw records are preserved.")
                                                                    }, a("p", f)),
                                                                    e.tables.filter((e)=>e.class_id === t && e.entity_id === n.entity_id).map((e)=>{
                                                                        var t, n, r, i, o, s, l, d, c, u, p, f, h, g, v;
                                                                        return v = {
                                                                            children: [
                                                                                (t = {
                                                                                    children: [
                                                                                        e.attribute.name,
                                                                                        " \xb7",
                                                                                        " ",
                                                                                        e.collected ? `${e.rows.length} ${_("rows")}` : tR(e.error)
                                                                                    ]
                                                                                }, a("summary", t)),
                                                                                e.vlan_rules.length ? (f = {
                                                                                    class: "table",
                                                                                    children: [
                                                                                        (u = {
                                                                                            children: (c = {
                                                                                                children: [
                                                                                                    (n = {
                                                                                                        children: _("Outer filter (priority / VID / TPID-DEI)")
                                                                                                    }, a("th", n)),
                                                                                                    (r = {
                                                                                                        children: _("Inner filter (priority / VID / TPID-DEI)")
                                                                                                    }, a("th", r)),
                                                                                                    (i = {
                                                                                                        children: _("EtherType code")
                                                                                                    }, a("th", i)),
                                                                                                    (o = {
                                                                                                        children: _("Remove tags")
                                                                                                    }, a("th", o)),
                                                                                                    (s = {
                                                                                                        children: _("Outer treatment (priority / VID / TPID-DEI)")
                                                                                                    }, a("th", s)),
                                                                                                    (l = {
                                                                                                        children: _("Inner treatment (priority / VID / TPID-DEI)")
                                                                                                    }, a("th", l)),
                                                                                                    (d = {
                                                                                                        children: _("Delete entry")
                                                                                                    }, a("th", d))
                                                                                                ]
                                                                                            }, a("tr", c))
                                                                                        }, a("thead", u)),
                                                                                        (p = {
                                                                                            children: e.vlan_rules.map((e)=>{
                                                                                                var t, n, r, i, o, s, l, d;
                                                                                                return d = {
                                                                                                    children: [
                                                                                                        (t = {
                                                                                                            children: `${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`
                                                                                                        }, a("td", t)),
                                                                                                        (n = {
                                                                                                            children: `${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`
                                                                                                        }, a("td", n)),
                                                                                                        (r = {
                                                                                                            children: tR(e.filter_ethertype)
                                                                                                        }, a("td", r)),
                                                                                                        (i = {
                                                                                                            children: tR(e.tags_to_remove)
                                                                                                        }, a("td", i)),
                                                                                                        (o = {
                                                                                                            children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                        }, a("td", o)),
                                                                                                        (s = {
                                                                                                            children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                        }, a("td", s)),
                                                                                                        (l = {
                                                                                                            children: tR(e.delete_entry)
                                                                                                        }, a("td", l))
                                                                                                    ]
                                                                                                }, a("tr", d);
                                                                                            })
                                                                                        }, a("tbody", p))
                                                                                    ]
                                                                                }, a("table", f)) : null,
                                                                                (h = {
                                                                                    children: [
                                                                                        _("G.988 encoded field values"),
                                                                                        ": ",
                                                                                        tA(e.attribute)
                                                                                    ]
                                                                                }, a("p", h)),
                                                                                (g = {
                                                                                    style: "white-space:pre-wrap;overflow-wrap:anywhere",
                                                                                    children: tN(e.vlan_rules.length ? e.vlan_rules : e.rows)
                                                                                }, a("pre", g))
                                                                            ]
                                                                        }, a("details", v);
                                                                    }),
                                                                    (v = {
                                                                        children: [
                                                                            (h = {
                                                                                children: _("Records / diagnostics")
                                                                            }, a("summary", h)),
                                                                            (g = {
                                                                                style: "white-space:pre-wrap;overflow-wrap:anywhere",
                                                                                children: tN({
                                                                                    diagnostics: n.diagnostics,
                                                                                    records: e.records.filter((e)=>e.class_id === t && e.entity_id === n.entity_id)
                                                                                })
                                                                            }, a("pre", g))
                                                                        ]
                                                                    }, a("details", v))
                                                                ]
                                                            }, a("details", m);
                                                        }));
                                                    }
                                                    function u() {
                                                        let t = l.value.toLowerCase();
                                                        d.replaceChildren(...e.classes.filter((e)=>`${e.class_id} ${e.name ?? ""}`.toLowerCase().includes(t)).map((e)=>{
                                                            var t, n;
                                                            return n = {
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
                                                                }, a("button", t))
                                                            }, a("div", n);
                                                        }));
                                                    }
                                                    return l.addEventListener("input", u), u(), e.classes.length && c(e.classes[0].class_id), o = {
                                                        style: "display:flex;gap:1em;flex-wrap:wrap",
                                                        children: [
                                                            (i = {
                                                                style: "flex:0 1 240px",
                                                                children: [
                                                                    l,
                                                                    d
                                                                ]
                                                            }, a("div", i)),
                                                            s
                                                        ]
                                                    }, a("div", o);
                                                }(h), (i = {
                                                    children: [
                                                        (n = {
                                                            children: _("Upload diagnostics")
                                                        }, a("summary", n)),
                                                        (r = {
                                                            children: tN(h.diagnostics)
                                                        }, a("pre", r))
                                                    ]
                                                }, a("details", i))), y.value = tN(h), x && URL.revokeObjectURL(x), z.href = x = URL.createObjectURL(new Blob([
                                                    y.value
                                                ], {
                                                    type: "application/json"
                                                })), w.disabled = !1, z.style.display = "";
                                                return;
                                            }
                                            if (Date.now() >= d) throw Error(_("MIB query timed out; retry."));
                                            await new Promise((e)=>setTimeout(e, 1000));
                                        }
                                    } catch (e) {
                                        N() && (v.textContent = `${String(e)}${h ? ` \xb7 ${_("Previous snapshot retained")}` : ""}`);
                                    } finally{
                                        f = !1, $.disabled = O.disabled = !1;
                                    }
                                }
                            }
                            w.disabled = !0, z.style.display = "none", C(u), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, R);
                        })(i),
                    children: tL("Details")
                }, a("button", t))
            }, a("td", n))
        ]
    }, a("tr", r));
    y.addEventListener("mouseenter", ()=>{
        let e = i.data_path?.interface;
        if (e) {
            let t = e.match(/fttr(\d+)/);
            if (t) {
                let e = document.querySelector(`[data-fttr-port="${t[1]}"]`);
                e?.classList.add("fttr-port-highlight");
            }
        }
    }), y.addEventListener("mouseleave", ()=>{
        document.querySelectorAll(".fttr-port-highlight").forEach((e)=>{
            e.classList.remove("fttr-port-highlight");
        });
    });
    let b = {
        element: y,
        update (e) {
            var t, n;
            i = e, y.setAttribute("data-fttr-onu-id", String(e.onu_id)), s.textContent = String(e.onu_id), l.textContent = tZ(e.vendor), d.textContent = tZ(e.identity?.equipment_id ?? e.model), c.textContent = tZ(e.serial_number), "o5_operation" === e.state ? tU(u, "success", tL(tq.o5_operation), e.state) : e.state ? tU(u, "warning", tL(tq[e.state] ?? e.state)) : tU(u, "none", "\u2014");
            let r = e.business_status;
            tU(p, "verified" === r.phase ? "success" : r.error || "wan_bootstrap_pending" === r.phase ? "warning" : "neutral", t_(r));
            let o = function(e) {
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
            f.textContent = o.display, o.full ? f.setAttribute("title", o.full) : f.removeAttribute("title"), h.textContent = tZ(e.data_path?.interface), (t = e.management?.state) ? "online" === t ? tU(g, "success", tL(tW.online)) : "waiting_inform" === t ? tU(g, "warning", tL(tW.waiting_inform)) : "offline_or_stale" === t ? tU(g, "danger", tL(tW.offline_or_stale)) : tU(g, "neutral", tZ(t)) : tU(g, "none", "\u2014");
            let a = e.provisioning?.state, b = e.provisioning?.current_revision === !1 ? tL("Previous configuration") : e.provisioning?.management_fresh === !1 ? tL("Management stale") : e.provisioning?.error;
            a && "not_started" !== a ? "completed" === a || "verified" === a ? tU(v, "success", "completed" === a ? tL(tV.completed) : tL("Ready"), b) : "wan_reconciling" === a || "wan_verifying" === a || "wifi_reconciling" === a || "discovering" === a || "reading" === a || "disabling" === a || "disabling_read" === a || "writing" === a || "verifying" === a || "settling" === a ? tU(v, "info", tL(tV[a] ?? a), b) : "interrupted" === a || "failed" === a || "error" === a || "blocked" === a ? tU(v, "danger", tL("blocked" === a ? tV.blocked : tV.interrupted), b) : "waiting" === a || "pending" === a ? tU(v, "warning", tL(tV.waiting), b) : tU(v, "neutral", tZ(a), b) : tU(v, "neutral", tL(tV.not_started), b), (n = e.wifi_sync) && "not_configured" !== n ? "verified" === n ? tU(m, "success", tL(tJ.verified)) : "attention_required" === n ? tU(m, "danger", tL(tJ.attention_required)) : "stale_revision" === n || "stale_management" === n || "accepted_unverified" === n || "pending" === n ? tU(m, "warning", tL(tJ[n])) : tU(m, "neutral", tZ(n)) : tU(m, "neutral", tL(tJ.not_configured));
        }
    };
    return b.update(e), b;
}
let tK = null, tX = null, tH = !1;
const main = tM.extend({
    async load () {
        let [e, t] = await Promise.all([
            tg(),
            tv().catch((e)=>(console.warn("Failed to load network device details", e), {}))
        ]);
        return {
            status: e,
            devices: t
        };
    },
    render (e) {
        var t, n, r, i, o, s, l, d, c, u, p, f, h, g;
        let v, m, y, b, w, z, x, k, $, O, j, P, S;
        return t = e.status, n = e.devices, v = t.optical_transceiver ?? {}, m = function(e) {
            var t, n, r, i, o;
            let s = new Map();
            for (let t of e)s.set(t.onu_id, tG(t));
            let l = (t = {
                children: a("td", {
                    colSpan: 12,
                    children: tL("No registered sub-gateways.")
                })
            }, a("tr", t)), d = 0 === e.length, c = a("tbody", {
                children: d ? l : [
                    ...s.values()
                ].map((e)=>e.element)
            });
            return {
                element: (o = {
                    class: "table-wrapper",
                    children: (i = {
                        class: "table",
                        children: [
                            (r = {
                                children: (n = {
                                    children: [
                                        a("th", {
                                            children: tL("ONU ID")
                                        }),
                                        a("th", {
                                            children: tL("Vendor")
                                        }),
                                        a("th", {
                                            children: tL("Model")
                                        }),
                                        a("th", {
                                            children: tL("Optical serial")
                                        }),
                                        a("th", {
                                            children: tL("Registration")
                                        }),
                                        a("th", {
                                            children: tL("Business")
                                        }),
                                        a("th", {
                                            children: tL("Firmware")
                                        }),
                                        a("th", {
                                            children: tL("Data interface")
                                        }),
                                        a("th", {
                                            children: tL("CWMP")
                                        }),
                                        a("th", {
                                            children: tL("Synchronization")
                                        }),
                                        a("th", {
                                            children: tL("Wi-Fi sync")
                                        }),
                                        a("th", {
                                            style: "text-align:right",
                                            children: tL("Details")
                                        })
                                    ]
                                }, a("tr", n))
                            }, a("thead", r)),
                            c
                        ]
                    }, a("table", i))
                }, a("div", o)),
                update (e) {
                    let t = new Set(e.map((e)=>e.onu_id));
                    for (let [e, n] of s)t.has(e) || (n.element.remove(), s.delete(e));
                    if (0 === e.length) {
                        d || c.append(l), d = !0;
                        return;
                    }
                    for (let [t, n] of (d && (l.remove(), d = !1), e.entries())){
                        let e = s.get(n.onu_id);
                        e || (e = tG(n), s.set(n.onu_id, e)), e.update(n);
                        let r = c.children.item(t);
                        r !== e.element && c.insertBefore(e.element, r);
                    }
                }
            };
        }(t.sub_gateways ?? []), y = Array.from({
            length: 16
        }, (e, t)=>{
            var n, r, i, o, s, l, d, c, u, p, f, h, g, v, m, y, b, w;
            let z, x, k, $, O, j, P, S, C, T, R, N, A, M, D, I, Z, U, B;
            return n = t + 1, z = a("span", {}), x = a("span", {
                children: tL("Unknown")
            }), k = a("img", {
                src: "/luci-static/resources/icons/port_down.svg",
                alt: "",
                "aria-hidden": "true"
            }), $ = a("div", {
                style: "flex:1;height:3px;opacity:0.25;background-color:rgb(240, 144, 144)"
            }), O = a("span", {}), j = a("span", {}), P = a("span", {}), S = a("span", {}), C = a("span", {}), T = a("span", {}), R = a("span", {}), N = a("span", {}), A = a("span", {}), M = a("span", {}), D = a("span", {}), I = a("span", {}), Z = a("span", {}), U = a("span", {}), (w = {
                class: "ifacebox fttr-port-card",
                "data-fttr-port": String(n),
                style: "box-sizing:border-box;width:100%;margin:0;cursor:pointer",
                children: [
                    a("div", {
                        class: "ifacebox-head",
                        style: "font-weight:bold",
                        children: z
                    }),
                    (r = {
                        class: "ifacebox-body",
                        children: [
                            k,
                            a("br", {}),
                            x
                        ]
                    }, a("div", r)),
                    (o = {
                        class: "ifacebox-head cbi-tooltip-container",
                        style: "display:flex",
                        children: [
                            $,
                            (i = {
                                class: "cbi-tooltip left",
                                children: [
                                    a("strong", {
                                        children: [
                                            tL("Port status"),
                                            ": "
                                        ]
                                    }),
                                    O,
                                    a("br", {}),
                                    a("strong", {
                                        children: [
                                            tL("ONU"),
                                            ": "
                                        ]
                                    }),
                                    j,
                                    a("br", {}),
                                    a("strong", {
                                        children: [
                                            tL("MAC address"),
                                            ": "
                                        ]
                                    }),
                                    P
                                ]
                            }, a("span", i))
                        ]
                    }, a("div", o)),
                    (b = {
                        class: "ifacebox-body",
                        children: (y = {
                            class: "cbi-tooltip-container",
                            style: "text-align:left;font-size:80%;line-height:1.4",
                            children: [
                                a("div", {
                                    style: "white-space:nowrap",
                                    children: [
                                        "\u25B2\u202F",
                                        S
                                    ]
                                }),
                                a("div", {
                                    style: "white-space:nowrap",
                                    children: [
                                        "\u25BC\u202F",
                                        C
                                    ]
                                }),
                                (m = {
                                    class: "cbi-tooltip",
                                    children: (v = {
                                        children: [
                                            (s = {
                                                class: "nowrap",
                                                children: [
                                                    a("strong", {
                                                        children: [
                                                            tL("Received bytes"),
                                                            ": "
                                                        ]
                                                    }),
                                                    T
                                                ]
                                            }, a("span", s)),
                                            a("br", {}),
                                            (l = {
                                                class: "nowrap",
                                                children: [
                                                    a("strong", {
                                                        children: [
                                                            tL("Received packets"),
                                                            ": "
                                                        ]
                                                    }),
                                                    R
                                                ]
                                            }, a("span", l)),
                                            a("br", {}),
                                            (d = {
                                                class: "nowrap",
                                                children: [
                                                    a("strong", {
                                                        children: [
                                                            tL("Received multicast"),
                                                            ": "
                                                        ]
                                                    }),
                                                    N
                                                ]
                                            }, a("span", d)),
                                            a("br", {}),
                                            (c = {
                                                class: "nowrap",
                                                children: [
                                                    a("strong", {
                                                        children: [
                                                            tL("Receive errors"),
                                                            ": "
                                                        ]
                                                    }),
                                                    A
                                                ]
                                            }, a("span", c)),
                                            a("br", {}),
                                            (u = {
                                                class: "nowrap",
                                                children: [
                                                    a("strong", {
                                                        children: [
                                                            tL("Receive dropped"),
                                                            ": "
                                                        ]
                                                    }),
                                                    M
                                                ]
                                            }, a("span", u)),
                                            a("br", {}),
                                            (p = {
                                                class: "nowrap",
                                                children: [
                                                    a("strong", {
                                                        children: [
                                                            tL("Transmitted bytes"),
                                                            ": "
                                                        ]
                                                    }),
                                                    D
                                                ]
                                            }, a("span", p)),
                                            a("br", {}),
                                            (f = {
                                                class: "nowrap",
                                                children: [
                                                    a("strong", {
                                                        children: [
                                                            tL("Transmitted packets"),
                                                            ": "
                                                        ]
                                                    }),
                                                    I
                                                ]
                                            }, a("span", f)),
                                            a("br", {}),
                                            (h = {
                                                class: "nowrap",
                                                children: [
                                                    a("strong", {
                                                        children: [
                                                            tL("Transmit errors"),
                                                            ": "
                                                        ]
                                                    }),
                                                    Z
                                                ]
                                            }, a("span", h)),
                                            a("br", {}),
                                            (g = {
                                                class: "nowrap",
                                                children: [
                                                    a("strong", {
                                                        children: [
                                                            tL("Transmit dropped"),
                                                            ": "
                                                        ]
                                                    }),
                                                    U
                                                ]
                                            }, a("span", g))
                                        ]
                                    }, a("span", v))
                                }, a("span", m))
                            ]
                        }, a("div", y))
                    }, a("div", b))
                ]
            }, B = a("div", w)).addEventListener("mouseenter", ()=>{
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
                    var r;
                    let i = (e.switch_ports ?? []).find((e)=>e.port === n), o = i?.interface ?? `fttr${n}`, a = t[o], s = a?.stats, l = i?.carrier ?? a?.carrier ?? (a?.link?.speed !== void 0 || void 0), d = (e.sub_gateways ?? []).find((e)=>e.onu_id === i?.onu_id), c = !0 === l, u = s?.rx_bytes, p = s?.tx_bytes;
                    i?.onu_id !== void 0 ? B.setAttribute("data-active-onu-id", String(i.onu_id)) : B.removeAttribute("data-active-onu-id"), c ? (B.classList.add("port-up"), B.classList.remove("port-down")) : (B.classList.add("port-down"), B.classList.remove("port-up")), z.textContent = o, k.setAttribute("src", `/luci-static/resources/icons/${c ? "port_up.svg" : "port_down.svg"}`), x.textContent = c ? a?.link?.speed !== void 0 ? void 0 === (r = a.link.speed) || !Number.isFinite(r) || r <= 0 ? tL("Unknown") : r >= 1000 ? `${r / 1000}\u{202F}GbE` : `${r}\u{202F}MbE` : tL("Connected") : !1 === l ? tL("Disconnected") : tL("Unknown"), x.setAttribute("title", _("\u901F\u5EA6\uFF1A%s Mbit/s\uFF0C\u53CC\u5DE5\uFF1A%s").format(tZ(a?.link?.speed), tZ(a?.link?.duplex))), $.style.opacity = c ? "1" : "0.25", $.style.backgroundColor = c ? "rgb(46, 204, 113)" : "rgba(200, 200, 200, 0.4)", O.textContent = tZ(i?.link_state ?? i?.status ?? (a ? l ? tL("Link up") : tL("Link down") : tL("Unavailable"))), j.textContent = tZ(i?.onu_sn ?? d?.serial_number ?? i?.onu_id), P.textContent = tZ(a?.mac), S.textContent = c || p ? tB(p) : "\u2014", C.textContent = c || u ? tB(u) : "\u2014", T.textContent = tB(u), R.textContent = tF(s?.rx_packets), N.textContent = tF(s?.rx_multicast ?? s?.multicast), A.textContent = tF(s?.rx_errors), M.textContent = tF(s?.rx_dropped), D.textContent = tB(p), I.textContent = tF(s?.tx_packets), Z.textContent = tF(s?.tx_errors), U.textContent = tF(s?.tx_dropped);
                }
            };
        }), b = a("span", {
            class: "fttr-badge"
        }), w = a("span", {
            class: "fttr-badge fttr-badge-info"
        }), z = a("code", {
            style: "font-size:90%"
        }), x = a("span", {
            class: "fttr-badge fttr-badge-danger",
            style: "margin-left:.5em"
        }), s = {
            "data-provisioning-summary": "true",
            style: "display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%",
            children: [
                (r = {
                    children: [
                        a("strong", {
                            style: "margin-right:.4em",
                            children: [
                                tL("Provisioning"),
                                ":"
                            ]
                        }),
                        b
                    ]
                }, a("span", r)),
                (i = {
                    children: [
                        a("span", {
                            style: "color:#888;margin-right:.3em",
                            children: [
                                tL("Mode"),
                                ":"
                            ]
                        }),
                        w
                    ]
                }, a("span", i)),
                (o = {
                    children: [
                        a("span", {
                            style: "color:#888;margin-right:.3em",
                            children: [
                                tL("Revision"),
                                ":"
                            ]
                        }),
                        z
                    ]
                }, a("span", o)),
                x
            ]
        }, k = a("div", s), $ = a("span", {
            class: "fttr-badge"
        }), O = a("span", {
            children: tZ(v.model)
        }), j = a("span", {
            class: "fttr-badge"
        }), g = {
            class: "cbi-map fttr-overview",
            children: [
                a("style", {
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
					grid-template-columns: repeat(8, minmax(0, 1fr));
					gap: 8px;
					margin-bottom: 1em;
				}

				@media (max-width: 1200px) {
					.fttr-overview .fttr-ports-grid {
						grid-template-columns: repeat(4, minmax(0, 1fr));
					}
				}

				@media (max-width: 600px) {
					.fttr-overview .fttr-ports-grid {
						grid-template-columns: repeat(2, minmax(0, 1fr));
					}
				}

				.fttr-overview .fttr-port-card {
					box-sizing: border-box;
					width: 100%;
					margin: 0;
					cursor: pointer;
					transition: opacity 0.2s, box-shadow 0.2s, transform 0.2s;
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
                a("h2", {
                    children: tL("FTTR overview")
                }),
                k,
                (p = {
                    class: "cbi-section",
                    children: [
                        a("h3", {
                            children: tL("Controller")
                        }),
                        (u = {
                            class: "table",
                            children: (c = {
                                children: [
                                    (l = {
                                        children: [
                                            a("th", {
                                                style: "width:15%",
                                                children: tL("FPGA status")
                                            }),
                                            a("td", {
                                                style: "width:35%",
                                                children: $
                                            }),
                                            a("th", {
                                                style: "width:15%",
                                                children: tL("CDR lock")
                                            }),
                                            a("td", {
                                                style: "width:35%",
                                                children: j
                                            })
                                        ]
                                    }, a("tr", l)),
                                    (d = {
                                        children: [
                                            a("th", {
                                                children: tL("Optical module")
                                            }),
                                            a("td", {
                                                colSpan: 3,
                                                children: O
                                            })
                                        ]
                                    }, a("tr", d))
                                ]
                            }, a("tbody", c))
                        }, a("table", u))
                    ]
                }, a("div", p)),
                (f = {
                    class: "cbi-section",
                    children: [
                        a("h3", {
                            children: tL("Sub-gateways")
                        }),
                        m.element
                    ]
                }, a("div", f)),
                (h = {
                    class: "cbi-section",
                    children: [
                        a("h3", {
                            children: tL("Downstream ports")
                        }),
                        a("div", {
                            class: "fttr-ports-grid",
                            children: y.map((e)=>e.element)
                        })
                    ]
                }, a("div", h))
            ]
        }, P = a("div", g), (S = (e, t)=>{
            let n = e.optical_transceiver, r = e.provisioning;
            for (let i of (r ? (tU(b, r.enabled ? "success" : "neutral", r.enabled ? tL("Enabled") : tL("Disabled")), w.textContent = tZ(r.mode), z.textContent = tZ(r.revision), r.error ? (x.textContent = r.error, x.style.display = "") : x.style.display = "none", k.style.display = "") : k.textContent = tL("Provisioning status unavailable"), "ready" === e.fpga_status ? tU($, "success", tL("Ready")) : e.fpga_status ? tU($, "neutral", tZ(e.fpga_status)) : tU($, "none", "\u2014"), O.textContent = tZ(n.model), null == n.cdr_locked ? tU(j, "none", tL("Unknown")) : n.cdr_locked ? tU(j, "success", tL("Locked")) : tU(j, "warning", tL("Unlocked")), m.update(e.sub_gateways ?? []), y))i.update(e, t);
        })(t, n), tK = (tX = {
            element: P,
            update: S
        }).element, tD.add(async ()=>{
            if (tH || !tK?.isConnected || !tX) return;
            let e = tX;
            tH = !0;
            try {
                let [t, n] = await Promise.all([
                    tg(),
                    tv().catch(()=>({}))
                ]);
                tX === e && e.element.isConnected && e.update(t, n);
            } catch (e) {
                console.error("Failed to refresh FTTR status", e);
            } finally{
                tH = !1;
            }
        }, 10), tK;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;