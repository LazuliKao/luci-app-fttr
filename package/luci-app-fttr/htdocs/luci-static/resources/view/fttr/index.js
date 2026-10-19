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
function o(e, t) {
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
function s(e, t, n) {
    function r(n, r) {
        if (n._zod || Object.defineProperty(n, "_zod", {
            value: {
                def: r,
                constr: o,
                traits: new Set()
            },
            enumerable: !1
        }), n._zod.traits.has(e)) return;
        n._zod.traits.add(e), t(n, r);
        let i = o.prototype, a = Object.keys(i);
        for(let e = 0; e < a.length; e++){
            let t = a[e];
            t in n || (n[t] = i[t].bind(n));
        }
    }
    let i = n?.Parent ?? Object;
    class a extends i {
    }
    function o(e) {
        var t;
        let i = n?.Parent ? new a() : this;
        for (let n of (r(i, e), (t = i._zod).deferred ?? (t.deferred = []), i._zod.deferred))n();
        return i;
    }
    return Object.defineProperty(a, "name", {
        value: e
    }), Object.defineProperty(o, "init", {
        value: r
    }), Object.defineProperty(o, Symbol.hasInstance, {
        value: (t)=>!!n?.Parent && t instanceof n.Parent || t?._zod?.traits?.has(e)
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
function m(e, t, n) {
    Object.defineProperty(e, t, {
        value: n,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
}
function v(...e) {
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
const x = new Set([
    "string",
    "number",
    "symbol"
]);
function z(e) {
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
function j(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let n = t; n < e.issues.length; n++)if (e.issues[n]?.continue !== !0) return !0;
    return !1;
}
function O(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function S(e) {
    return "string" == typeof e ? e : e?.message;
}
function P(e, t, n) {
    let r = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (r.message = S(e.inst?._zod.def?.error?.(e)) ?? S(t?.error?.(e)) ?? S(n.customError?.(e)) ?? S(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
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
}, T = s("$ZodError", C), M = s("$ZodError", C, {
    Parent: Error
}), D = (t = M, (e, n, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !1
    }) : {
        async: !1
    }, o = e._zod.run({
        value: n,
        issues: []
    }, a);
    if (o instanceof Promise) throw new l();
    if (o.issues.length) {
        let e = new (i?.Err ?? t)(o.issues.map((e)=>P(e, a, c())));
        throw y(e, i?.callee), e;
    }
    return o.value;
}), I = (n = M, async (e, t, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (i?.Err ?? n)(o.issues.map((e)=>P(e, a, c())));
        throw y(e, i?.callee), e;
    }
    return o.value;
}), R = (r = M, (e, t, n)=>{
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
        error: new (r ?? T)(a.issues.map((e)=>P(e, i, c())))
    } : {
        success: !0,
        data: a.value
    };
}), N = (i = M, async (e, t, n)=>{
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
        error: new i(a.issues.map((e)=>P(e, r, c())))
    } : {
        success: !0,
        data: a.value
    };
}), A = /^-?\d+(?:\.\d+)?$/, Z = /^(?:true|false)$/i, U = /^null$/i, B = {
    major: 4,
    minor: 3,
    patch: 6
}, q = s("$ZodType", (e, t)=>{
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
            let r, i = j(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, o = a._zod.check(e);
                if (o instanceof Promise && n?.async === !1) throw new l();
                if (r || o instanceof Promise) r = (r ?? Promise.resolve()).then(async ()=>{
                    await o, e.issues.length !== t && (i || (i = j(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = j(e, t));
                }
            }
            return r ? r.then(()=>e) : e;
        }, n = (n, i, a)=>{
            if (j(n)) return n.aborted = !0, n;
            let o = t(i, r, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new l();
                return o.then((t)=>e._zod.parse(t, a));
            }
            return e._zod.parse(o, a);
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
            let o = e._zod.parse(i, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new l();
                return o.then((e)=>t(e, r, a));
            }
            return t(o, r, a);
        };
    }
    g(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = R(e, t);
                    return n.success ? {
                        value: n.data
                    } : {
                        issues: n.error?.issues
                    };
                } catch (n) {
                    return N(e, t).then((e)=>e.success ? {
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
    var n;
    let r;
    q.init(e, t), e._zod.pattern = [
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
}), F = s("$ZodNumber", (e, t)=>{
    q.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? A, e._zod.parse = (n, r)=>{
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
}), W = s("$ZodBoolean", (e, t)=>{
    q.init(e, t), e._zod.pattern = Z, e._zod.parse = (n, r)=>{
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
    q.init(e, t), e._zod.pattern = U, e._zod.values = new Set([
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
}), K = s("$ZodNever", (e, t)=>{
    q.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function G(e, t, n) {
    e.issues.length && t.issues.push(...O(n, e.issues)), t.value[n] = e.value;
}
const X = s("$ZodArray", (e, t)=>{
    q.init(e, t), e._zod.parse = (n, r)=>{
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
            let o = i[e], s = t.element._zod.run({
                value: o,
                issues: []
            }, r);
            s instanceof Promise ? a.push(s.then((t)=>G(t, n, e))) : G(s, n, e);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
});
function H(e, t, n, r, i) {
    if (e.issues.length) {
        if (i && !(n in r)) return;
        t.issues.push(...O(n, e.issues));
    }
    void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const Q = s("$ZodObject", (e, t)=>{
    let n;
    q.init(e, t);
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
    let a = t.catchall;
    e._zod.parse = (t, r)=>{
        n ?? (n = i.value);
        let o = t.value;
        if (!b(o)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: o,
            inst: e
        }), t;
        t.value = {};
        let s = [], l = n.shape;
        for (let e of n.keys){
            let n = l[e], i = "optional" === n._zod.optout, a = n._zod.run({
                value: o[e],
                issues: []
            }, r);
            a instanceof Promise ? s.push(a.then((n)=>H(n, t, e, o, i))) : H(a, t, e, o, i);
        }
        return a ? function(e, t, n, r, i, a) {
            let o = [], s = i.keySet, l = i.catchall._zod, d = l.def.type, c = "optional" === l.optout;
            for(let i in t){
                if (s.has(i)) continue;
                if ("never" === d) {
                    o.push(i);
                    continue;
                }
                let a = l.run({
                    value: t[i],
                    issues: []
                }, r);
                a instanceof Promise ? e.push(a.then((e)=>H(e, n, i, t, c))) : H(a, n, i, t, c);
            }
            return (o.length && n.issues.push({
                code: "unrecognized_keys",
                keys: o,
                input: t,
                inst: a
            }), e.length) ? Promise.all(e).then(()=>n) : n;
        }(s, o, t, r, i.value, e) : s.length ? Promise.all(s).then(()=>t) : t;
    };
});
function Y(e, t, n, r) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let i = e.filter((e)=>!j(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>P(e, r, c())))
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
    let n = 1 === t.options.length, r = t.options[0]._zod.run;
    e._zod.parse = (i, a)=>{
        if (n) return r(i, a);
        let o = !1, s = [];
        for (let e of t.options){
            let t = e._zod.run({
                value: i.value,
                issues: []
            }, a);
            if (t instanceof Promise) s.push(t), o = !0;
            else {
                if (0 === t.issues.length) return t;
                s.push(t);
            }
        }
        return o ? Promise.all(s).then((t)=>Y(t, i, e, a)) : Y(s, i, e, a);
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
    e._zod.parse = (i, a)=>{
        let o = i.value;
        if (!b(o)) return i.issues.push({
            code: "invalid_type",
            expected: "object",
            input: o,
            inst: e
        }), i;
        let s = r.value.get(o?.[t.discriminator]);
        return s ? s._zod.run(i, a) : t.unionFallback ? n(i, a) : (i.issues.push({
            code: "invalid_union",
            errors: [],
            note: "No matching discriminator",
            discriminator: t.discriminator,
            input: o,
            path: [
                t.discriminator
            ],
            inst: e
        }), i);
    };
}), en = s("$ZodRecord", (e, t)=>{
    q.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!w(i)) return n.issues.push({
            expected: "record",
            code: "invalid_type",
            input: i,
            inst: e
        }), n;
        let a = [], o = t.keyType._zod.values;
        if (o) {
            let s;
            n.value = {};
            let l = new Set();
            for (let e of o)if ("string" == typeof e || "number" == typeof e || "symbol" == typeof e) {
                l.add("number" == typeof e ? e.toString() : e);
                let o = t.valueType._zod.run({
                    value: i[e],
                    issues: []
                }, r);
                o instanceof Promise ? a.push(o.then((t)=>{
                    t.issues.length && n.issues.push(...O(e, t.issues)), n.value[e] = t.value;
                })) : (o.issues.length && n.issues.push(...O(e, o.issues)), n.value[e] = o.value);
            }
            for(let e in i)l.has(e) || (s = s ?? []).push(e);
            s && s.length > 0 && n.issues.push({
                code: "unrecognized_keys",
                input: i,
                inst: e,
                keys: s
            });
        } else for (let o of (n.value = {}, Reflect.ownKeys(i))){
            if ("__proto__" === o) continue;
            let s = t.keyType._zod.run({
                value: o,
                issues: []
            }, r);
            if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof o && A.test(o) && s.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(o),
                    issues: []
                }, r);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (s = e);
            }
            if (s.issues.length) {
                "loose" === t.mode ? n.value[o] = i[o] : n.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: s.issues.map((e)=>P(e, r, c())),
                    input: o,
                    path: [
                        o
                    ],
                    inst: e
                });
                continue;
            }
            let l = t.valueType._zod.run({
                value: i[o],
                issues: []
            }, r);
            l instanceof Promise ? a.push(l.then((e)=>{
                e.issues.length && n.issues.push(...O(o, e.issues)), n.value[s.value] = e.value;
            })) : (l.issues.length && n.issues.push(...O(o, l.issues)), n.value[s.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
}), er = s("$ZodEnum", (e, t)=>{
    var n;
    let r;
    q.init(e, t);
    let i = (r = Object.values(n = t.entries).filter((e)=>"number" == typeof e), Object.entries(n).filter(([e, t])=>-1 === r.indexOf(+e)).map(([e, t])=>t)), a = new Set(i);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${i.filter((e)=>x.has(typeof e)).map((e)=>"string" == typeof e ? z(e) : e.toString()).join("|")})$`), e._zod.parse = (t, n)=>{
        let r = t.value;
        return a.has(r) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: r,
            inst: e
        }), t;
    };
}), ei = s("$ZodLiteral", (e, t)=>{
    if (q.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? z(e) : e ? z(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i)=>{
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
const eo = s("$ZodOptional", (e, t)=>{
    q.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let r = t.innerType._zod.run(e, n);
            return r instanceof Promise ? r.then((t)=>ea(t, e.value)) : ea(r, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, n);
    };
}), es = s("$ZodNullable", (e, t)=>{
    q.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)}|null)$`) : void 0;
    }), g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), el = s("$ZodCatch", (e, t)=>{
    q.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, n)=>{
        if ("backward" === n.direction) return t.innerType._zod.run(e, n);
        let r = t.innerType._zod.run(e, n);
        return r instanceof Promise ? r.then((r)=>(e.value = r.value, r.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: r.issues.map((e)=>P(e, n, c()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = r.value, r.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: r.issues.map((e)=>P(e, n, c()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ed = s("$ZodLazy", (e, t)=>{
    q.init(e, t), g(e._zod, "innerType", ()=>t.getter()), g(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), g(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), g(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), g(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n)=>e._zod.innerType._zod.run(t, n);
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
    q.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>D(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>R(e, t, n), e.parseAsync = async (t, n)=>I(e, t, n, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, n)=>N(e, t, n), e.check = (...n)=>e.clone({
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
    V.init(e, t), ec.init(e, t);
});
function ep(e) {
    return new eu({
        type: "string",
        ...$(e)
    });
}
const e_ = s("ZodMiniNumber", (e, t)=>{
    F.init(e, t), ec.init(e, t);
});
function ef(e) {
    return new e_({
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
}), ev = s("ZodMiniNever", (e, t)=>{
    K.init(e, t), ec.init(e, t);
});
function ey(e) {
    return new ev({
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
function eO(e, t, n) {
    return new ej({
        type: "union",
        options: t,
        discriminator: e,
        ...$(n)
    });
}
const eS = s("ZodMiniRecord", (e, t)=>{
    en.init(e, t), ec.init(e, t);
});
function eP(e, t, n) {
    return new eS({
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
function eM(e, t) {
    return new eT({
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
function eD(e) {
    return new eL({
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
const eN = s("ZodMiniCatch", (e, t)=>{
    el.init(e, t), ec.init(e, t);
}), eA = s("ZodMiniLazy", (e, t)=>{
    ed.init(e, t), ec.init(e, t);
});
function eZ() {
    let e = new eA({
        type: "lazy",
        getter: ()=>e$([
                ep(),
                ef(),
                eg(),
                new em({
                    type: "null",
                    ...$(void 0)
                }),
                ew(e),
                eP(ep(), e)
            ])
    });
    return e;
}
let eU = ez({
    error: e$([
        ep(),
        ez({
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
function eq(e) {
    let t = eU.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eB("rpc", e) : new eB(e.code, e.message);
    }
    return e;
}
const eV = ez({
    status: eM("pending"),
    job: ep()
}), eF = eO("status", [
    ez({
        status: eM("pending")
    }),
    ez({
        status: eM("ready"),
        chunk: ef(),
        chunks: ef(),
        bytes: ef(),
        data: ep()
    })
]);
let eW = ep(), eJ = ef(), eK = eg(), eG = eD(eW), eX = eD(eJ), eH = eD(eK);
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
    "interrupted",
    "recovering",
    "waiting_management",
    "waiting_task"
]), eY = eE([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), e0 = ez({
    id: eW,
    name: eD(eR(eW)),
    kind: eE([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eW,
    state: eW,
    reason: eG,
    revision: eG,
    current_revision: eH,
    management_fresh: eH,
    operation_id: eX,
    task_id: eD(eR(eJ)),
    updated_at: eX,
    changes: eD(ew(ez({
        name: eW,
        desired: eW
    })))
});
let e1 = ez({
    state: eW,
    reason: eG,
    task_id: eD(eR(eJ)),
    instance: eX
});
const e2 = ez({
    cwmp_id: eW,
    state: eE([
        "online",
        "waiting_inform",
        "offline_or_stale"
    ]),
    optical_online: eK,
    last_inform: eR(eJ),
    age_seconds: eR(eJ)
});
let e3 = ez({
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
    method: eG,
    reason: eG,
    mqtt_target: eR(eW),
    binding_source: eG,
    link_identity_error: eR(eW),
    mqtt_last_seen: eR(eJ),
    cwmp_id: eG,
    desired_version: eG,
    generation: eX,
    inflight: eH,
    attempts: eX,
    next_retry_at: eX,
    updated_at: eX,
    settings_verified_at: eR(eJ),
    last_inform: eR(eJ),
    last_error: eD(eR(eW)),
    persistence_error: eD(eR(eW)),
    desired: eD(eR(ez({
        vlan: eJ,
        vlans: ew(eJ),
        priority: eJ,
        acs_url: eW
    }))),
    listener: eD(ez({
        enabled: eK,
        listen: eW,
        path: eW,
        error: eR(eW)
    })),
    endpoint_notice: eG,
    manual_steps: eD(ew(eW))
});
const e5 = eO("state", [
    e3,
    function(e, t) {
        if (!w(t)) throw Error("Invalid input to extend: expected a plain object");
        let n = e._zod.def.checks;
        if (n && n.length > 0) {
            let n = e._zod.def.shape;
            for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(n, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let r = v(e._zod.def, {
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
        let r = v(e._zod.def, {
            get shape () {
                let n = e._zod.def.shape, r = {
                    ...n
                };
                if (t) for(let e in t){
                    if (!(e in n)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (r[e] = eL ? new eL({
                        type: "optional",
                        innerType: n[e]
                    }) : n[e]);
                }
                else for(let e in n)r[e] = eL ? new eL({
                    type: "optional",
                    innerType: n[e]
                }) : n[e];
                return m(this, "shape", r), r;
            },
            checks: []
        });
        return k(e, r);
    }(e3), {
        state: eE([
            "pending",
            "unavailable"
        ]),
        reason: eW
    })
]), e4 = ez({
    state: eQ,
    operation_id: eX,
    device: eG,
    optical_sn: eG,
    cwmp_id: eG,
    revision: eG,
    mode: eD(eE([
        "apply",
        "plan"
    ])),
    started_at: eX,
    current_revision: eH,
    management_fresh: eH,
    reason: eG,
    error: eG,
    attempts: eX,
    next_retry_at: eX,
    reconcile_reason: eG,
    items: ew(e0),
    cwmp_contract: eD(ez({
        state: eW,
        requested: eW,
        contract: eR(eW),
        reason: eW,
        cache_hit: eK,
        schema: eW,
        capabilities: eR(ez({
            wan: eW,
            wlan: eW,
            binding: eW
        }))
    })),
    wan_objects: eD(eP(eW, eZ())),
    wan_lifecycle: eD(eP(eW, e1)),
    wan_stage: eD(eE([
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
    wifi_objects: eD(ez({
        owned: ew(eJ),
        pending: eR(eW),
        pending_instance: eR(eJ)
    })),
    wifi_lifecycle: eD(eP(eW, e1)),
    wifi_stage: eD(eE([
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
    wifi_cleanup: eD(eE([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e6 = ez({
    enabled: eK,
    mode: eE([
        "auto",
        "manual"
    ]),
    vlan: ew(eJ),
    priority: eJ,
    address: eW,
    acs_url: eW,
    port: eJ,
    path: eW,
    dhcp_enabled: eK
}), e7 = ez({
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
    error: eR(eW),
    inflight: eK,
    ready: eK,
    desired_version: eR(eW),
    applied_version: eR(eW),
    next_retry_at: eJ,
    attempts: eJ,
    desired: eR(e6),
    applied: eR(e6),
    previous: eR(e6),
    plan: ew(ez({
        operation: eW,
        key: eW,
        value: ew(eW)
    }))
});
const e8 = ez({
    device: eW,
    name: eR(eW),
    group: eR(eW),
    group_name: eR(eW),
    template: eR(eW),
    template_name: eR(eW),
    optical_sn: eW,
    adapter: eW,
    omci_management: ez({
        state: eW,
        reason: eG
    }),
    management: eR(e2),
    acs_bootstrap: e5,
    provisioning: e4,
    services: ew(e0),
    ssids: ew(e0),
    wifi_sync: eY
}), e9 = ez({
    enabled: eK,
    mode: eE([
        "auto",
        "manual"
    ]),
    method: eM("diff"),
    revision: eW,
    triggers: ew(eW),
    interval: eJ,
    error: eR(eW),
    devices: ew(e8),
    management_network: e7,
    omci_management: eZ(),
    groups: ew(ez({
        id: eW,
        name: eR(eW),
        template: eW
    })),
    pending_devices: ew(eW)
});
e$([
    ez({
        valid: eM(!0),
        revision: eW,
        devices: eJ,
        error: eD(ey())
    }),
    ez({
        error: eW,
        valid: eD(ey()),
        revision: eD(ey()),
        devices: eD(ey())
    })
]);
let te = ep(), tt = ef(), tn = eR(tt), tr = eP(te, ez({
    source: te,
    unit: te,
    reason: eR(te),
    raw: eR(te),
    age_seconds: tn
}));
const ti = ez({
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
    error: eR(te)
}), ta = eE([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let to = ez({
    model: te,
    wavelength_tx_nm: tt,
    wavelength_rx_nm: tt,
    phy_rate_downlink_gbps: tt,
    phy_rate_uplink_gbps: tt,
    tx_power_dbm: tn,
    laser_bias_current_ma: tn,
    temperature_celsius: tn,
    vcc_voltage: tn,
    cdr_locked: eR(eg()),
    measurements: tr
}), ts = ez({
    equipment_id: eR(te),
    hardware_version: eR(te),
    software_images: ew(te),
    omcc_version: tn,
    errors: ew(te)
});
const tl = ez({
    onu_id: tt,
    vendor: te,
    model: te,
    serial_number: te,
    state: ta,
    business_status: ti,
    management: eR(e2),
    provisioning: eR(e4),
    services: ew(e0),
    ssids: ew(e0),
    wifi_sync: eY,
    acs_bootstrap: eD(e5),
    identity: eR(ts),
    identity_age_seconds: tn,
    identity_current: eg(),
    fiber_distance_m: tn,
    ranging_delay_rtd_ns: tn,
    equalization_delay_bits: new eN({
        type: "catch",
        innerType: tn,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tn,
    optical_tx_power_dbm: tn,
    firmware_version: te,
    hardware_version: te,
    uptime_seconds: tn,
    data_path: ez({
        interface: te,
        gem_ports: eR(ew(tt)),
        vlan_id: tn,
        tx_bytes: tn,
        rx_bytes: tn,
        current_tx_kbps: tn,
        current_rx_kbps: tn,
        measurements: tr
    }),
    wifi_mesh: ez({
        channel_2g: tn,
        channel_5g: tn,
        bandwidth_5g: eR(te),
        tx_power_pct: tn,
        measurements: tr
    }),
    connected_clients: eR(ew(ez({
        mac: te,
        ip: te,
        band: te,
        rssi_dbm: tn,
        rx_rate_mbps: tn,
        tx_rate_mbps: tn
    }))),
    measurements: tr
});
let td = ez({
    port: tt,
    interface: te,
    carrier: eg(),
    status: te,
    onu_id: eD(tt),
    onu_sn: eD(te),
    link_state: te
});
const tc = ez({
    fpga_status: te,
    provisioning: eR(e9),
    optical_transceiver: to,
    switch_ports: ew(td),
    sub_gateways: ew(tl),
    telemetry_gateways: ew(ez({
        id: te,
        last_seen_sec_ago: tt,
        last_payload_bytes: tt
    }))
}), tu = eP(te, ez({
    carrier: eD(eg()),
    mac: eD(te),
    link: eD(ez({
        speed: eD(tt),
        duplex: eD(te),
        autoneg: eD(eg())
    })),
    stats: eD(eP(te, tt))
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
const tg = async ()=>tc.parse(eq(await tf())), tm = async ()=>tu.parse(eq(await th()));
e$([
    ez({
        operation_ids: ew(ef()),
        revision: ep()
    }),
    ez({
        started: eM(!0),
        mode: eE([
            "apply",
            "plan"
        ])
    }),
    ez({
        reset: eM(!0),
        device: ep()
    }),
    ez({
        operation_ids: ew(ef()),
        mode: eE([
            "apply",
            "plan"
        ]),
        reconcile: eD(eg()),
        retry: eD(eg())
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
    source: eE([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: ep(),
    size: ef(),
    sha256: ep(),
    data: eD(ep()),
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
        size: ef(),
        sha256: ep(),
        data: ep()
    }),
    error: eD(ep())
}), ez({
    success: eg(),
    path: ep(),
    size: ef(),
    sha256: ep(),
    error: eD(ep())
}), ez({
    success: eg(),
    output: eD(ep()),
    error: eD(ep())
});
let tv = ep(), ty = ef(), tb = eg(), tw = ez({
    id: tv,
    url: tv
}), tx = ez({
    name: tv,
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
    default_hex: eR(tv),
    reference: tw
}), tz = eO("type", [
    ez({
        type: eM("unsigned"),
        value: ty
    }),
    ez({
        type: eM("signed"),
        value: ty
    }),
    ez({
        type: eM("decimal"),
        value: tv
    }),
    ez({
        type: eM("text"),
        value: eR(tv)
    }),
    ez({
        type: eM("octets"),
        hex: tv
    }),
    ez({
        type: eM("table_length"),
        bytes: ty
    })
]), tk = ez({
    code: tv,
    message: tv,
    offset: ty,
    mask: ty
}), t$ = eE([
    "layout",
    "name_only",
    "unknown"
]), tj = ez({
    raw_hex: tv,
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
}), tO = ez({
    schema_version: eM(1),
    reference_version: tv,
    onu_id: eR(ty),
    uploaded_complete: tb,
    expected_records: ty,
    received_records: ty,
    decoded_records: ty,
    partial_records: ty,
    basic_records: ty,
    tables_requested: tb,
    tables_collected: tb,
    classes: ew(ez({
        class_id: ty,
        name: eR(tv),
        entities: ty,
        records: ty,
        support: t$
    })),
    entities: ew(ez({
        class_id: ty,
        entity_id: ty,
        name: eR(tv),
        support: t$,
        reference: eR(tw),
        sequences: ew(ty),
        attributes: ew(ez({
            definition: tx,
            value: eR(tz),
            observations: ew(ez({
                raw_hex: tv,
                value: tz,
                sequences: ew(ty)
            }))
        })),
        diagnostics: ew(tk)
    })),
    records: ew(ez({
        class_id: ty,
        entity_id: ty,
        sequence: ty,
        attribute_mask: ty,
        raw_hex: tv,
        consumed: ty,
        remaining_hex: tv,
        undecoded_mask: ty
    })),
    tables: ew(ez({
        class_id: ty,
        entity_id: ty,
        attribute: tx,
        collected: tb,
        error: eR(tv),
        raw_hex: tv,
        rows: ew(tv),
        vlan_rules: ew(tj)
    })),
    diagnostics: ew(tk)
});
const tS = ez({
    status: eM("ready"),
    report: tO
});
let tP = L.rpc.declare({
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
const tE = async (e, t, n)=>eV.parse(eq(await tP(e, t, n))), tT = async (e, t)=>eF.parse(eq(await tC(e, t)));
let tM = (e)=>null == e || "" === e ? "\u2014" : String(e), tL = (e)=>JSON.stringify(e, null, 2);
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
let tI = L.view, tR = L.Poll;
function tN(e) {
    return _(e) || e;
}
let tA = (e)=>null == e || "" === e ? "\u2014" : String(e);
function tZ(e, t, n, r) {
    e.textContent = n, "none" === t ? e.className = "" : e.className = `fttr-badge fttr-badge-${t}`, r ? e.setAttribute("title", r) : e.removeAttribute("title");
}
function tU(e) {
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
function tB(e) {
    return void 0 === e || !Number.isFinite(e) || e < 0 ? "\u2014" : e < 1000 ? `${e} ${tN("Received packets").includes("\u5305") ? "\u5305" : "Pkts."}` : `${(e / 1000).toFixed(2)} K${tN("Received packets").includes("\u5305") ? "\u5305" : "Pkts."}`;
}
let tq = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
}, tV = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
}, tF = {
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
}, tW = {
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
function tJ(e) {
    var t, n, r;
    let i = e, s = o("span", {}), l = o("span", {}), d = o("span", {}), c = o("code", {
        style: "font-size:90%"
    }), u = o("span", {
        class: "fttr-badge"
    }), p = o("span", {
        class: "fttr-badge"
    }), f = o("span", {
        style: "font-size:90%"
    }), h = o("code", {
        style: "font-size:90%"
    }), g = o("span", {
        class: "fttr-badge"
    }), m = o("span", {
        class: "fttr-badge"
    }), v = o("span", {
        class: "fttr-badge"
    }), y = (r = {
        "data-fttr-onu-id": String(e.onu_id),
        children: [
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
                children: m
            }),
            o("td", {
                children: v
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
                                        let [n, r] = e;
                                        return t = {
                                            children: [
                                                o("th", {
                                                    children: n
                                                }),
                                                o("td", {
                                                    children: tM(r)
                                                })
                                            ]
                                        }, o("tr", t);
                                    })
                                }, o("tbody", n))
                            }, o("table", r)), m = o("p", {
                                role: "status",
                                children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                            }), v = o("div", {}), y = o("textarea", {
                                readOnly: !0,
                                rows: 20,
                                style: "width:100%;font-family:monospace"
                            }), b = o("span", {
                                role: "status"
                            }), w = o("button", {
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
                            }), x = o("a", {
                                href: "data:application/json,%7B%7D",
                                class: "cbi-button",
                                download: `mib-${e.serial_number}.json`,
                                children: _("Download JSON")
                            }), z = null, k = (i = {
                                children: [
                                    o("p", {
                                        children: [
                                            w,
                                            " ",
                                            x,
                                            " ",
                                            b
                                        ]
                                    }),
                                    y
                                ]
                            }, o("div", i)), $ = o("button", {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                onclick: ()=>I(!1),
                                children: _("Read MIB")
                            }), j = o("button", {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                onclick: ()=>I(!0),
                                children: _("Read MIB and VLAN tables")
                            }), O = (s = {
                                children: [
                                    o("p", {
                                        children: [
                                            $,
                                            " ",
                                            j
                                        ]
                                    }),
                                    m,
                                    v
                                ]
                            }, o("div", s)), S = {
                                basic: g,
                                mib: O,
                                raw: k
                            }, P = new Map();
                            function C(e) {
                                for (let [t, n] of Object.entries(S))t === e ? n.style.removeProperty("display") : n.style.setProperty("display", "none", "important");
                                for (let [t, n] of P)n.disabled = t === e;
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
                                    let [t, n] = e, r = o("button", {
                                        type: "button",
                                        class: "cbi-button",
                                        onclick: ()=>C(t),
                                        children: n
                                    });
                                    return P.set(t, r), r;
                                })
                            }, o("p", l)), M = (c = {
                                children: [
                                    T,
                                    g,
                                    O,
                                    k,
                                    (d = {
                                        class: "right",
                                        children: o("button", {
                                            type: "button",
                                            class: "cbi-button",
                                            onclick: ()=>{
                                                p = !0, z && URL.revokeObjectURL(z), L.ui.hideModal();
                                            },
                                            children: _("Close")
                                        })
                                    }, o("div", d))
                                ]
                            }, o(a, c)), D = ()=>!p && T.isConnected && T.getClientRects().length > 0;
                            async function I(t) {
                                if (!f) {
                                    f = !0, $.disabled = j.disabled = !0, m.textContent = _("Reading MIB\u2026");
                                    try {
                                        let a = await tg(), s = a.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                        if (s?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                        if (!D()) return;
                                        let l = await tE(s.onu_id, s.serial_number, t), d = Date.now() + 140000;
                                        for(; D();){
                                            let e = await tT(l.job, 0);
                                            if (!D()) return;
                                            if ("ready" === e.status) {
                                                var n, r, i;
                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                let t = new Uint8Array(e.bytes), a = 0;
                                                for(let n = 0; n < e.chunks; n++){
                                                    let r = 0 === n ? e : await tT(l.job, n);
                                                    if (!D()) return;
                                                    if ("ready" !== r.status || r.chunk !== n || r.chunks !== e.chunks || r.bytes !== e.bytes || !r.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                    let i = atob(r.data);
                                                    if (i.length > 32768 || a + i.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                    for(let e = 0; e < i.length; e++)t[a++] = i.charCodeAt(e);
                                                    m.textContent = `${_("Downloading MIB snapshot")}: ${n + 1}/${e.chunks}`;
                                                }
                                                if (a !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                if (h = tS.parse(eq(JSON.parse(new TextDecoder("utf-8", {
                                                    fatal: !0
                                                }).decode(t)))).report, 1 !== h.schema_version || h.onu_id !== s.onu_id) throw Error(_("Unexpected MIB response"));
                                                m.textContent = `${new Date().toLocaleString()} \xb7 ONU ${h.onu_id} \xb7 ${_("Upload complete")}: ${h.uploaded_complete} \xb7 ${h.received_records}/${h.expected_records} \xb7 ${_("Decoded / partial / basic")}: ${h.decoded_records}/${h.partial_records}/${h.basic_records} \xb7 ${_("Tables requested / collected")}: ${h.tables_requested}/${h.tables_collected}`, v.replaceChildren(function(e) {
                                                    var t, n, r, i, a;
                                                    let s = (t = {
                                                        style: "min-width:0;flex:1"
                                                    }, o("div", t)), l = (n = {
                                                        type: "search",
                                                        placeholder: _("Search ME name or Class ID")
                                                    }, o("input", n)), d = (r = {}, o("div", r));
                                                    function c(t) {
                                                        s.replaceChildren(...e.entities.filter((e)=>e.class_id === t).map((n)=>{
                                                            var r, i, a, s, l, d, c, u, p, f, h, g, m, v;
                                                            return v = {
                                                                children: [
                                                                    (r = {
                                                                        children: [
                                                                            tM(n.name),
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
                                                                    }, o("summary", r)),
                                                                    (p = {
                                                                        class: "table",
                                                                        children: [
                                                                            (c = {
                                                                                children: (d = {
                                                                                    children: [
                                                                                        (i = {
                                                                                            children: _("Attribute")
                                                                                        }, o("th", i)),
                                                                                        (a = {
                                                                                            children: _("Type")
                                                                                        }, o("th", a)),
                                                                                        (s = {
                                                                                            children: _("Value")
                                                                                        }, o("th", s)),
                                                                                        (l = {
                                                                                            children: _("Definition")
                                                                                        }, o("th", l))
                                                                                    ]
                                                                                }, o("tr", d))
                                                                            }, o("thead", c)),
                                                                            (u = {
                                                                                children: n.attributes.map((e)=>{
                                                                                    var t, n, r, i, a, s, l, d;
                                                                                    return d = {
                                                                                        children: [
                                                                                            (t = {
                                                                                                children: e.definition.name
                                                                                            }, o("td", t)),
                                                                                            (n = {
                                                                                                children: e.definition.kind
                                                                                            }, o("td", n)),
                                                                                            (s = {
                                                                                                children: [
                                                                                                    function(e) {
                                                                                                        if (null === e) return _("Conflicting values; inspect observations");
                                                                                                        switch(e.type){
                                                                                                            case "unsigned":
                                                                                                            case "signed":
                                                                                                            case "decimal":
                                                                                                            case "text":
                                                                                                                return tM(e.value);
                                                                                                            case "octets":
                                                                                                                return tM(e.hex);
                                                                                                            case "table_length":
                                                                                                                return tM(e.bytes);
                                                                                                            default:
                                                                                                                throw new eB("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                        }
                                                                                                    }(e.value),
                                                                                                    (a = {
                                                                                                        children: [
                                                                                                            (r = {
                                                                                                                children: _("Raw data / observations")
                                                                                                            }, o("summary", r)),
                                                                                                            (i = {
                                                                                                                style: "white-space:pre-wrap;overflow-wrap:anywhere",
                                                                                                                children: tL(e.observations)
                                                                                                            }, o("pre", i))
                                                                                                        ]
                                                                                                    }, o("details", a))
                                                                                                ]
                                                                                            }, o("td", s)),
                                                                                            (l = {
                                                                                                children: tD(e.definition)
                                                                                            }, o("td", l))
                                                                                        ]
                                                                                    }, o("tr", d);
                                                                                })
                                                                            }, o("tbody", u))
                                                                        ]
                                                                    }, o("table", p)),
                                                                    n.attributes.length ? null : (f = {
                                                                        children: _("Basic display only; raw records are preserved.")
                                                                    }, o("p", f)),
                                                                    e.tables.filter((e)=>e.class_id === t && e.entity_id === n.entity_id).map((e)=>{
                                                                        var t, n, r, i, a, s, l, d, c, u, p, f, h, g, m;
                                                                        return m = {
                                                                            children: [
                                                                                (t = {
                                                                                    children: [
                                                                                        e.attribute.name,
                                                                                        " \xb7",
                                                                                        " ",
                                                                                        e.collected ? `${e.rows.length} ${_("rows")}` : tM(e.error)
                                                                                    ]
                                                                                }, o("summary", t)),
                                                                                e.vlan_rules.length ? (f = {
                                                                                    class: "table",
                                                                                    children: [
                                                                                        (u = {
                                                                                            children: (c = {
                                                                                                children: [
                                                                                                    (n = {
                                                                                                        children: _("Outer filter (priority / VID / TPID-DEI)")
                                                                                                    }, o("th", n)),
                                                                                                    (r = {
                                                                                                        children: _("Inner filter (priority / VID / TPID-DEI)")
                                                                                                    }, o("th", r)),
                                                                                                    (i = {
                                                                                                        children: _("EtherType code")
                                                                                                    }, o("th", i)),
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
                                                                                                var t, n, r, i, a, s, l, d;
                                                                                                return d = {
                                                                                                    children: [
                                                                                                        (t = {
                                                                                                            children: `${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`
                                                                                                        }, o("td", t)),
                                                                                                        (n = {
                                                                                                            children: `${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`
                                                                                                        }, o("td", n)),
                                                                                                        (r = {
                                                                                                            children: tM(e.filter_ethertype)
                                                                                                        }, o("td", r)),
                                                                                                        (i = {
                                                                                                            children: tM(e.tags_to_remove)
                                                                                                        }, o("td", i)),
                                                                                                        (a = {
                                                                                                            children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                        }, o("td", a)),
                                                                                                        (s = {
                                                                                                            children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                        }, o("td", s)),
                                                                                                        (l = {
                                                                                                            children: tM(e.delete_entry)
                                                                                                        }, o("td", l))
                                                                                                    ]
                                                                                                }, o("tr", d);
                                                                                            })
                                                                                        }, o("tbody", p))
                                                                                    ]
                                                                                }, o("table", f)) : null,
                                                                                (h = {
                                                                                    children: [
                                                                                        _("G.988 encoded field values"),
                                                                                        ": ",
                                                                                        tD(e.attribute)
                                                                                    ]
                                                                                }, o("p", h)),
                                                                                (g = {
                                                                                    style: "white-space:pre-wrap;overflow-wrap:anywhere",
                                                                                    children: tL(e.vlan_rules.length ? e.vlan_rules : e.rows)
                                                                                }, o("pre", g))
                                                                            ]
                                                                        }, o("details", m);
                                                                    }),
                                                                    (m = {
                                                                        children: [
                                                                            (h = {
                                                                                children: _("Records / diagnostics")
                                                                            }, o("summary", h)),
                                                                            (g = {
                                                                                style: "white-space:pre-wrap;overflow-wrap:anywhere",
                                                                                children: tL({
                                                                                    diagnostics: n.diagnostics,
                                                                                    records: e.records.filter((e)=>e.class_id === t && e.entity_id === n.entity_id)
                                                                                })
                                                                            }, o("pre", g))
                                                                        ]
                                                                    }, o("details", m))
                                                                ]
                                                            }, o("details", v);
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
                                                                }, o("button", t))
                                                            }, o("div", n);
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
                                                            }, o("div", i)),
                                                            s
                                                        ]
                                                    }, o("div", a);
                                                }(h), (i = {
                                                    children: [
                                                        (n = {
                                                            children: _("Upload diagnostics")
                                                        }, o("summary", n)),
                                                        (r = {
                                                            children: tL(h.diagnostics)
                                                        }, o("pre", r))
                                                    ]
                                                }, o("details", i))), y.value = tL(h), z && URL.revokeObjectURL(z), x.href = z = URL.createObjectURL(new Blob([
                                                    y.value
                                                ], {
                                                    type: "application/json"
                                                })), w.disabled = !1, x.style.display = "";
                                                return;
                                            }
                                            if (Date.now() >= d) throw Error(_("MIB query timed out; retry."));
                                            await new Promise((e)=>setTimeout(e, 1000));
                                        }
                                    } catch (e) {
                                        D() && (m.textContent = `${String(e)}${h ? ` \xb7 ${_("Previous snapshot retained")}` : ""}`);
                                    } finally{
                                        f = !1, $.disabled = j.disabled = !1;
                                    }
                                }
                            }
                            w.disabled = !0, x.style.display = "none", C(u), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, M);
                        })(i),
                    children: tN("Details")
                }, o("button", t))
            }, o("td", n))
        ]
    }, o("tr", r));
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
            let r, a, o, b, w, x;
            i = e, y.setAttribute("data-fttr-onu-id", String(e.onu_id)), s.textContent = String(e.onu_id), l.textContent = tA(e.vendor), d.textContent = tA(e.identity?.equipment_id ?? e.model), c.textContent = tA(e.serial_number), "o5_operation" === e.state ? tZ(u, "success", tN(tq.o5_operation), e.state) : e.state ? tZ(u, "warning", tN(tq[e.state] ?? e.state)) : tZ(u, "none", "\u2014");
            let z = e.business_status;
            tZ(p, "verified" === z.phase ? "success" : z.error || "wan_bootstrap_pending" === z.phase ? "warning" : "neutral", t_(z));
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
            f.textContent = k.display, k.full ? f.setAttribute("title", k.full) : f.removeAttribute("title"), h.textContent = tA(e.data_path?.interface), t = e.management, r = t?.state, a = function(e) {
                if (null == e || e < 0) return null;
                if (e < 60) return tN(1 === e ? "%d second ago" : "%d seconds ago").replace("%d", String(e));
                let t = Math.floor(e / 60);
                if (t < 60) return tN(1 === t ? "%d minute ago" : "%d minutes ago").replace("%d", String(t));
                let n = Math.floor(e / 3600);
                if (n < 24) return tN(1 === n ? "%d hour ago" : "%d hours ago").replace("%d", String(n));
                let r = Math.floor(e / 86400);
                return tN(1 === r ? "%d day ago" : "%d days ago").replace("%d", String(r));
            }(t?.age_seconds ?? (t?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - t.last_inform) : null)), b = (o = t?.last_inform ? new Date(1000 * t.last_inform).toLocaleString() : null) ? tN("Last Inform: %s").replace("%s", o) : void 0, w = "\u2014", x = "none", "online" === r ? (x = "success", w = tN(tV.online)) : "waiting_inform" === r ? (x = "warning", w = tN(tV.waiting_inform)) : "offline_or_stale" === r ? (x = "danger", w = tN(tV.offline_or_stale)) : r && (x = "neutral", w = tA(r)), tZ(g, x, a && r ? `${w} \xb7 ${a}` : w, b);
            let $ = e.provisioning?.state, j = e.provisioning, O = j?.next_retry_at && j.next_retry_at > Math.floor(Date.now() / 1000) ? j.next_retry_at - Math.floor(Date.now() / 1000) : 0, S = j?.current_revision === !1 ? tN("Previous configuration") : j?.management_fresh === !1 ? tN("Management stale") : j?.reconcile_reason ? tN(j.reconcile_reason) : O > 0 ? tN("Next self-healing retry in %d seconds").replace("%d", String(O)) : j?.reason ?? j?.error;
            $ && "not_started" !== $ ? "completed" === $ || "verified" === $ ? tZ(m, "success", "completed" === $ ? tN(tF.completed) : tN("Ready"), S) : "wan_reconciling" === $ || "wan_verifying" === $ || "wifi_reconciling" === $ || "discovering" === $ || "reading" === $ || "disabling" === $ || "disabling_read" === $ || "writing" === $ || "verifying" === $ || "settling" === $ || "recovering" === $ || "waiting_task" === $ ? tZ(m, "info", tN(tF[$] ?? $), S) : "interrupted" === $ || "failed" === $ || "error" === $ || "blocked" === $ ? tZ(m, "danger", tN("blocked" === $ ? tF.blocked : tF.interrupted), S) : "waiting" === $ || "pending" === $ || "waiting_management" === $ ? tZ(m, "warning", tN(tF[$] ?? tF.waiting), S) : tZ(m, "neutral", tA($), S) : tZ(m, "neutral", tN(tF.not_started), S), (n = e.wifi_sync) && "not_configured" !== n ? "verified" === n ? tZ(v, "success", tN(tW.verified)) : "attention_required" === n ? tZ(v, "danger", tN(tW.attention_required)) : "stale_revision" === n || "stale_management" === n || "waiting_management" === n ? tZ(v, "warning", tN(tW[n])) : "recovering" === n ? tZ(v, "info", tN(tW.recovering)) : "accepted_unverified" === n || "pending" === n ? tZ(v, "warning", tN(tW[n])) : tZ(v, "neutral", tA(n)) : tZ(v, "neutral", tN(tW.not_configured));
        }
    };
    return b.update(e), b;
}
let tK = null, tG = null, tX = !1;
const main = tI.extend({
    async load () {
        let [e, t] = await Promise.all([
            tg(),
            tm().catch((e)=>(console.warn("Failed to load network device details", e), {}))
        ]);
        return {
            status: e,
            devices: t
        };
    },
    render (e) {
        var t, n, r, i, a, s, l, d, c, u, p, f, h, g;
        let m, v, y, b, w, x, z, k, $, j, O, S, P;
        return t = e.status, n = e.devices, m = t.optical_transceiver ?? {}, v = function(e) {
            var t, n, r, i, a;
            let s = new Map();
            for (let t of e)s.set(t.onu_id, tJ(t));
            let l = (t = {
                children: o("td", {
                    colSpan: 12,
                    children: tN("No registered sub-gateways.")
                })
            }, o("tr", t)), d = 0 === e.length, c = o("tbody", {
                children: d ? l : [
                    ...s.values()
                ].map((e)=>e.element)
            });
            return {
                element: (a = {
                    class: "table-wrapper",
                    children: (i = {
                        class: "table",
                        children: [
                            (r = {
                                children: (n = {
                                    children: [
                                        o("th", {
                                            children: tN("ONU ID")
                                        }),
                                        o("th", {
                                            children: tN("Vendor")
                                        }),
                                        o("th", {
                                            children: tN("Model")
                                        }),
                                        o("th", {
                                            children: tN("Optical serial")
                                        }),
                                        o("th", {
                                            children: tN("Registration")
                                        }),
                                        o("th", {
                                            children: tN("Business")
                                        }),
                                        o("th", {
                                            children: tN("Firmware")
                                        }),
                                        o("th", {
                                            children: tN("Data interface")
                                        }),
                                        o("th", {
                                            children: tN("CWMP")
                                        }),
                                        o("th", {
                                            children: tN("Synchronization")
                                        }),
                                        o("th", {
                                            children: tN("Wi-Fi sync")
                                        }),
                                        o("th", {
                                            style: "text-align:right",
                                            children: tN("Details")
                                        })
                                    ]
                                }, o("tr", n))
                            }, o("thead", r)),
                            c
                        ]
                    }, o("table", i))
                }, o("div", a)),
                update (e) {
                    let t = new Set(e.map((e)=>e.onu_id));
                    for (let [e, n] of s)t.has(e) || (n.element.remove(), s.delete(e));
                    if (0 === e.length) {
                        d || c.append(l), d = !0;
                        return;
                    }
                    for (let [t, n] of (d && (l.remove(), d = !1), e.entries())){
                        let e = s.get(n.onu_id);
                        e || (e = tJ(n), s.set(n.onu_id, e)), e.update(n);
                        let r = c.children.item(t);
                        r !== e.element && c.insertBefore(e.element, r);
                    }
                }
            };
        }(t.sub_gateways ?? []), y = Array.from({
            length: 16
        }, (e, t)=>{
            var n, r, i, a, s, l, d, c, u, p, f, h, g, m, v, y, b, w;
            let x, z, k, $, j, O, S, P, C, T, M, D, I, R, N, A, Z, U, B;
            return n = t + 1, x = o("span", {}), z = o("span", {
                children: tN("Unknown")
            }), k = o("img", {
                src: "/luci-static/resources/icons/port_down.svg",
                alt: "",
                "aria-hidden": "true"
            }), $ = o("div", {
                style: "flex:1;height:3px;opacity:0.25;background-color:rgb(240, 144, 144)"
            }), j = o("span", {}), O = o("span", {}), S = o("span", {}), P = o("span", {}), C = o("span", {}), T = o("span", {}), M = o("span", {}), D = o("span", {}), I = o("span", {}), R = o("span", {}), N = o("span", {}), A = o("span", {}), Z = o("span", {}), U = o("span", {}), (w = {
                class: "ifacebox fttr-port-card",
                "data-fttr-port": String(n),
                style: "box-sizing:border-box;width:100%;margin:0;cursor:pointer",
                children: [
                    o("div", {
                        class: "ifacebox-head",
                        style: "font-weight:bold",
                        children: x
                    }),
                    (r = {
                        class: "ifacebox-body",
                        children: [
                            k,
                            o("br", {}),
                            z
                        ]
                    }, o("div", r)),
                    (a = {
                        class: "ifacebox-head cbi-tooltip-container",
                        style: "display:flex",
                        children: [
                            $,
                            (i = {
                                class: "cbi-tooltip left",
                                children: [
                                    o("strong", {
                                        children: [
                                            tN("Port status"),
                                            ": "
                                        ]
                                    }),
                                    j,
                                    o("br", {}),
                                    o("strong", {
                                        children: [
                                            tN("ONU"),
                                            ": "
                                        ]
                                    }),
                                    O,
                                    o("br", {}),
                                    o("strong", {
                                        children: [
                                            tN("MAC address"),
                                            ": "
                                        ]
                                    }),
                                    S
                                ]
                            }, o("span", i))
                        ]
                    }, o("div", a)),
                    (b = {
                        class: "ifacebox-body",
                        children: (y = {
                            class: "cbi-tooltip-container",
                            style: "text-align:left;font-size:80%;line-height:1.4",
                            children: [
                                o("div", {
                                    style: "white-space:nowrap",
                                    children: [
                                        "\u25B2\u202F",
                                        P
                                    ]
                                }),
                                o("div", {
                                    style: "white-space:nowrap",
                                    children: [
                                        "\u25BC\u202F",
                                        C
                                    ]
                                }),
                                (v = {
                                    class: "cbi-tooltip",
                                    children: (m = {
                                        children: [
                                            (s = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            tN("Received bytes"),
                                                            ": "
                                                        ]
                                                    }),
                                                    T
                                                ]
                                            }, o("span", s)),
                                            o("br", {}),
                                            (l = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            tN("Received packets"),
                                                            ": "
                                                        ]
                                                    }),
                                                    M
                                                ]
                                            }, o("span", l)),
                                            o("br", {}),
                                            (d = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            tN("Received multicast"),
                                                            ": "
                                                        ]
                                                    }),
                                                    D
                                                ]
                                            }, o("span", d)),
                                            o("br", {}),
                                            (c = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            tN("Receive errors"),
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
                                                            tN("Receive dropped"),
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
                                                            tN("Transmitted bytes"),
                                                            ": "
                                                        ]
                                                    }),
                                                    N
                                                ]
                                            }, o("span", p)),
                                            o("br", {}),
                                            (f = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            tN("Transmitted packets"),
                                                            ": "
                                                        ]
                                                    }),
                                                    A
                                                ]
                                            }, o("span", f)),
                                            o("br", {}),
                                            (h = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            tN("Transmit errors"),
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
                                                            tN("Transmit dropped"),
                                                            ": "
                                                        ]
                                                    }),
                                                    U
                                                ]
                                            }, o("span", g))
                                        ]
                                    }, o("span", m))
                                }, o("span", v))
                            ]
                        }, o("div", y))
                    }, o("div", b))
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
                    var r;
                    let i = (e.switch_ports ?? []).find((e)=>e.port === n), a = i?.interface ?? `fttr${n}`, o = t[a], s = o?.stats, l = i?.carrier ?? o?.carrier ?? (o?.link?.speed !== void 0 || void 0), d = (e.sub_gateways ?? []).find((e)=>e.onu_id === i?.onu_id), c = !0 === l, u = s?.rx_bytes, p = s?.tx_bytes;
                    i?.onu_id !== void 0 ? B.setAttribute("data-active-onu-id", String(i.onu_id)) : B.removeAttribute("data-active-onu-id"), c ? (B.classList.add("port-up"), B.classList.remove("port-down")) : (B.classList.add("port-down"), B.classList.remove("port-up")), x.textContent = a, k.setAttribute("src", `/luci-static/resources/icons/${c ? "port_up.svg" : "port_down.svg"}`), z.textContent = c ? o?.link?.speed !== void 0 ? void 0 === (r = o.link.speed) || !Number.isFinite(r) || r <= 0 ? tN("Unknown") : r >= 1000 ? `${r / 1000}\u{202F}GbE` : `${r}\u{202F}MbE` : tN("Connected") : !1 === l ? tN("Disconnected") : tN("Unknown"), z.setAttribute("title", _("\u901F\u5EA6\uFF1A%s Mbit/s\uFF0C\u53CC\u5DE5\uFF1A%s").format(tA(o?.link?.speed), tA(o?.link?.duplex))), $.style.opacity = c ? "1" : "0.25", $.style.backgroundColor = c ? "rgb(46, 204, 113)" : "rgba(200, 200, 200, 0.4)", j.textContent = tA(i?.link_state ?? i?.status ?? (o ? l ? tN("Link up") : tN("Link down") : tN("Unavailable"))), O.textContent = tA(i?.onu_sn ?? d?.serial_number ?? i?.onu_id), S.textContent = tA(o?.mac), P.textContent = c || p ? tU(p) : "\u2014", C.textContent = c || u ? tU(u) : "\u2014", T.textContent = tU(u), M.textContent = tB(s?.rx_packets), D.textContent = tB(s?.rx_multicast ?? s?.multicast), I.textContent = tB(s?.rx_errors), R.textContent = tB(s?.rx_dropped), N.textContent = tU(p), A.textContent = tB(s?.tx_packets), Z.textContent = tB(s?.tx_errors), U.textContent = tB(s?.tx_dropped);
                }
            };
        }), b = o("span", {
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
                (r = {
                    children: [
                        o("strong", {
                            style: "margin-right:.4em",
                            children: [
                                tN("Provisioning"),
                                ":"
                            ]
                        }),
                        b
                    ]
                }, o("span", r)),
                (i = {
                    children: [
                        o("span", {
                            style: "color:#888;margin-right:.3em",
                            children: [
                                tN("Mode"),
                                ":"
                            ]
                        }),
                        w
                    ]
                }, o("span", i)),
                (a = {
                    children: [
                        o("span", {
                            style: "color:#888;margin-right:.3em",
                            children: [
                                tN("Revision"),
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
            children: tA(m.model)
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
                o("h2", {
                    children: tN("FTTR overview")
                }),
                k,
                (p = {
                    class: "cbi-section",
                    children: [
                        o("h3", {
                            children: tN("Controller")
                        }),
                        (u = {
                            class: "table",
                            children: (c = {
                                children: [
                                    (l = {
                                        children: [
                                            o("th", {
                                                style: "width:15%",
                                                children: tN("FPGA status")
                                            }),
                                            o("td", {
                                                style: "width:35%",
                                                children: $
                                            }),
                                            o("th", {
                                                style: "width:15%",
                                                children: tN("CDR lock")
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
                                                children: tN("Optical module")
                                            }),
                                            o("td", {
                                                colSpan: 3,
                                                children: j
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
                            children: tN("Sub-gateways")
                        }),
                        v.element
                    ]
                }, o("div", f)),
                (h = {
                    class: "cbi-section",
                    children: [
                        o("h3", {
                            children: tN("Downstream ports")
                        }),
                        o("div", {
                            class: "fttr-ports-grid",
                            children: y.map((e)=>e.element)
                        })
                    ]
                }, o("div", h))
            ]
        }, S = o("div", g), (P = (e, t)=>{
            let n = e.optical_transceiver, r = e.provisioning;
            for (let i of (r ? (tZ(b, r.enabled ? "success" : "neutral", r.enabled ? tN("Enabled") : tN("Disabled")), w.textContent = tA(r.mode), x.textContent = tA(r.revision), r.error ? (z.textContent = r.error, z.style.display = "") : z.style.display = "none", k.style.display = "") : k.textContent = tN("Provisioning status unavailable"), "ready" === e.fpga_status ? tZ($, "success", tN("Ready")) : e.fpga_status ? tZ($, "neutral", tA(e.fpga_status)) : tZ($, "none", "\u2014"), j.textContent = tA(n.model), null == n.cdr_locked ? tZ(O, "none", tN("Unknown")) : n.cdr_locked ? tZ(O, "success", tN("Locked")) : tZ(O, "warning", tN("Unlocked")), v.update(e.sub_gateways ?? []), y))i.update(e, t);
        })(t, n), tK = (tG = {
            element: S,
            update: P
        }).element, tR.add(async ()=>{
            if (tX || !tK?.isConnected || !tG) return;
            let e = tG;
            tX = !0;
            try {
                let [t, n] = await Promise.all([
                    tg(),
                    tm().catch(()=>({}))
                ]);
                tG === e && e.element.isConnected && e.update(t, n);
            } catch (e) {
                console.error("Failed to refresh FTTR status", e);
            } finally{
                tX = !1;
            }
        }, 10), tK;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;