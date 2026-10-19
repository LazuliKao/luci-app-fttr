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
function o(e, t) {
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
    let o = {}, s = {
        ...n
    };
    for (let [e, t] of Object.entries(s))e.startsWith("on") && "function" == typeof t ? (o[e] = t, delete s[e]) : "boolean" == typeof t && (t ? s[e] = e : delete s[e]);
    let l = Object.keys(s).length > 0 ? i.length > 1 ? E(e, s, i) : E(e, s, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
    for (let [e, t] of Object.entries(o)){
        let r = e.slice(2).toLowerCase();
        l.addEventListener(r, t);
    }
    return l;
}
function s(e, t, r) {
    function n(r, n) {
        if (r._zod || Object.defineProperty(r, "_zod", {
            value: {
                def: n,
                constr: o,
                traits: new Set()
            },
            enumerable: !1
        }), r._zod.traits.has(e)) return;
        r._zod.traits.add(e), t(r, n);
        let i = o.prototype, a = Object.keys(i);
        for(let e = 0; e < a.length; e++){
            let t = a[e];
            t in r || (r[t] = i[t].bind(r));
        }
    }
    let i = r?.Parent ?? Object;
    class a extends i {
    }
    function o(e) {
        var t;
        let i = r?.Parent ? new a() : this;
        for (let r of (n(i, e), (t = i._zod).deferred ?? (t.deferred = []), i._zod.deferred))r();
        return i;
    }
    return Object.defineProperty(a, "name", {
        value: e
    }), Object.defineProperty(o, "init", {
        value: n
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
function m(e, t, r) {
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
const y = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function b(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function w(e) {
    if (!1 === b(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let r = t.prototype;
    return !1 !== b(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
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
function S(e) {
    return "string" == typeof e ? e : e?.message;
}
function C(e, t, r) {
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = S(e.inst?._zod.def?.error?.(e)) ?? S(t?.error?.(e)) ?? S(r.customError?.(e)) ?? S(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
}
const P = (e, t)=>{
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
}, M = s("$ZodError", P), T = s("$ZodError", P, {
    Parent: Error
}), I = (t = T, (e, r, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !1
    }) : {
        async: !1
    }, o = e._zod.run({
        value: r,
        issues: []
    }, a);
    if (o instanceof Promise) throw new l();
    if (o.issues.length) {
        let e = new (i?.Err ?? t)(o.issues.map((e)=>C(e, a, c())));
        throw y(e, i?.callee), e;
    }
    return o.value;
}), N = (r = T, async (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (i?.Err ?? r)(o.issues.map((e)=>C(e, a, c())));
        throw y(e, i?.callee), e;
    }
    return o.value;
}), R = (n = T, (e, t, r)=>{
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
        error: new (n ?? M)(a.issues.map((e)=>C(e, i, c())))
    } : {
        success: !0,
        data: a.value
    };
}), D = (i = T, async (e, t, r)=>{
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
        error: new i(a.issues.map((e)=>C(e, n, c())))
    } : {
        success: !0,
        data: a.value
    };
}), A = /^-?\d+(?:\.\d+)?$/, Z = /^(?:true|false)$/i, B = /^null$/i, U = {
    major: 4,
    minor: 3,
    patch: 6
}, q = s("$ZodType", (e, t)=>{
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
                let t = e.issues.length, o = a._zod.check(e);
                if (o instanceof Promise && r?.async === !1) throw new l();
                if (n || o instanceof Promise) n = (n ?? Promise.resolve()).then(async ()=>{
                    await o, e.issues.length !== t && (i || (i = j(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = j(e, t));
                }
            }
            return n ? n.then(()=>e) : e;
        }, r = (r, i, a)=>{
            if (j(r)) return r.aborted = !0, r;
            let o = t(i, n, a);
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
                return t instanceof Promise ? t.then((e)=>r(e, i, a)) : r(t, i, a);
            }
            let o = e._zod.parse(i, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new l();
                return o.then((e)=>t(e, n, a));
            }
            return t(o, n, a);
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
}), V = s("$ZodString", (e, t)=>{
    var r;
    let n;
    q.init(e, t), e._zod.pattern = [
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
}), F = s("$ZodNumber", (e, t)=>{
    q.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? A, e._zod.parse = (r, n)=>{
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
}), W = s("$ZodBoolean", (e, t)=>{
    q.init(e, t), e._zod.pattern = Z, e._zod.parse = (r, n)=>{
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
}), J = s("$ZodNull", (e, t)=>{
    q.init(e, t), e._zod.pattern = B, e._zod.values = new Set([
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
    q.init(e, t), e._zod.parse = (r, n)=>{
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
            let o = i[e], s = t.element._zod.run({
                value: o,
                issues: []
            }, n);
            s instanceof Promise ? a.push(s.then((t)=>G(t, r, e))) : G(s, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function H(e, t, r, n, i) {
    if (e.issues.length) {
        if (i && !(r in n)) return;
        t.issues.push(...O(r, e.issues));
    }
    void 0 === e.value ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
const Q = s("$ZodObject", (e, t)=>{
    let r;
    q.init(e, t);
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
        let o = t.value;
        if (!b(o)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: o,
            inst: e
        }), t;
        t.value = {};
        let s = [], l = r.shape;
        for (let e of r.keys){
            let r = l[e], i = "optional" === r._zod.optout, a = r._zod.run({
                value: o[e],
                issues: []
            }, n);
            a instanceof Promise ? s.push(a.then((r)=>H(r, t, e, o, i))) : H(a, t, e, o, i);
        }
        return a ? function(e, t, r, n, i, a) {
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
                }, n);
                a instanceof Promise ? e.push(a.then((e)=>H(e, r, i, t, c))) : H(a, r, i, t, c);
            }
            return (o.length && r.issues.push({
                code: "unrecognized_keys",
                keys: o,
                input: t,
                inst: a
            }), e.length) ? Promise.all(e).then(()=>r) : r;
        }(s, o, t, n, i.value, e) : s.length ? Promise.all(s).then(()=>t) : t;
    };
});
function Y(e, t, r, n) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let i = e.filter((e)=>!j(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>C(e, n, c())))
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
    let r = 1 === t.options.length, n = t.options[0]._zod.run;
    e._zod.parse = (i, a)=>{
        if (r) return n(i, a);
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
        let o = i.value;
        if (!b(o)) return i.issues.push({
            code: "invalid_type",
            expected: "object",
            input: o,
            inst: e
        }), i;
        let s = n.value.get(o?.[t.discriminator]);
        return s ? s._zod.run(i, a) : t.unionFallback ? r(i, a) : (i.issues.push({
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
}), er = s("$ZodRecord", (e, t)=>{
    q.init(e, t), e._zod.parse = (r, n)=>{
        let i = r.value;
        if (!w(i)) return r.issues.push({
            expected: "record",
            code: "invalid_type",
            input: i,
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
                    value: i[e],
                    issues: []
                }, n);
                o instanceof Promise ? a.push(o.then((t)=>{
                    t.issues.length && r.issues.push(...O(e, t.issues)), r.value[e] = t.value;
                })) : (o.issues.length && r.issues.push(...O(e, o.issues)), r.value[e] = o.value);
            }
            for(let e in i)l.has(e) || (s = s ?? []).push(e);
            s && s.length > 0 && r.issues.push({
                code: "unrecognized_keys",
                input: i,
                inst: e,
                keys: s
            });
        } else for (let o of (r.value = {}, Reflect.ownKeys(i))){
            if ("__proto__" === o) continue;
            let s = t.keyType._zod.run({
                value: o,
                issues: []
            }, n);
            if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof o && A.test(o) && s.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(o),
                    issues: []
                }, n);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (s = e);
            }
            if (s.issues.length) {
                "loose" === t.mode ? r.value[o] = i[o] : r.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: s.issues.map((e)=>C(e, n, c())),
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
            }, n);
            l instanceof Promise ? a.push(l.then((e)=>{
                e.issues.length && r.issues.push(...O(o, e.issues)), r.value[s.value] = e.value;
            })) : (l.issues.length && r.issues.push(...O(o, l.issues)), r.value[s.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), en = s("$ZodEnum", (e, t)=>{
    var r;
    let n;
    q.init(e, t);
    let i = (n = Object.values(r = t.entries).filter((e)=>"number" == typeof e), Object.entries(r).filter(([e, t])=>-1 === n.indexOf(+e)).map(([e, t])=>t)), a = new Set(i);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${i.filter((e)=>x.has(typeof e)).map((e)=>"string" == typeof e ? z(e) : e.toString()).join("|")})$`), e._zod.parse = (t, r)=>{
        let n = t.value;
        return a.has(n) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: n,
            inst: e
        }), t;
    };
}), ei = s("$ZodLiteral", (e, t)=>{
    if (q.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? z(e) : e ? z(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (n, i)=>{
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
const eo = s("$ZodOptional", (e, t)=>{
    q.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
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
        let n = t.innerType._zod.run(e, r);
        return n instanceof Promise ? n.then((n)=>(e.value = n.value, n.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: n.issues.map((e)=>C(e, r, c()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = n.value, n.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: n.issues.map((e)=>C(e, r, c()))
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
const ec = s("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    q.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>I(e, t, r, {
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
const eP = s("ZodMiniEnum", (e, t)=>{
    en.init(e, t), ec.init(e, t), e.options = Object.values(t.entries);
});
function eE(e, t) {
    return new eP({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...$(t)
    });
}
const eM = s("ZodMiniLiteral", (e, t)=>{
    ei.init(e, t), ec.init(e, t);
});
function eT(e, t) {
    return new eM({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...$(t)
    });
}
const eI = s("ZodMiniOptional", (e, t)=>{
    eo.init(e, t), ec.init(e, t);
});
function eL(e) {
    return new eI({
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
const eD = s("ZodMiniCatch", (e, t)=>{
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
                eC(ep(), e)
            ])
    });
    return e;
}
let eB = ez({
    error: e$([
        ep(),
        ez({
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
function eq(e) {
    let t = eB.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eU("rpc", e) : new eU(e.code, e.message);
    }
    return e;
}
const eV = ez({
    status: eT("pending"),
    job: ep()
});
eO("status", [
    ez({
        status: eT("pending")
    }),
    ez({
        status: eT("ready"),
        chunk: ef(),
        chunks: ef(),
        bytes: ef(),
        data: ep()
    })
]);
let eF = ep(), eW = ef(), eJ = eg(), eK = eL(eF), eG = eL(eW), eX = eL(eJ);
const eH = eE([
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
]), eQ = eE([
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
    name: eL(eR(eF)),
    kind: eE([
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
    task_id: eL(eR(eW)),
    updated_at: eG,
    changes: eL(ew(ez({
        name: eF,
        desired: eF
    })))
});
let e0 = ez({
    state: eF,
    reason: eK,
    task_id: eL(eR(eW)),
    instance: eG
});
const e1 = ez({
    cwmp_id: eF,
    state: eE([
        "online",
        "waiting_inform",
        "offline_or_stale"
    ]),
    optical_online: eJ,
    last_inform: eR(eW),
    age_seconds: eR(eW)
});
let e2 = ez({
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
    last_error: eL(eR(eF)),
    persistence_error: eL(eR(eF)),
    desired: eL(eR(ez({
        vlan: eW,
        vlans: ew(eW),
        priority: eW,
        acs_url: eF
    }))),
    listener: eL(ez({
        enabled: eJ,
        listen: eF,
        path: eF,
        error: eR(eF)
    })),
    endpoint_notice: eK,
    manual_steps: eL(ew(eF))
});
const e3 = eO("state", [
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
                return m(this, "shape", r), r;
            }
        });
        return k(e, n);
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
                    t[e] && (n[e] = eI ? new eI({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)n[e] = eI ? new eI({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return m(this, "shape", n), n;
            },
            checks: []
        });
        return k(e, n);
    }(e2), {
        state: eE([
            "pending",
            "unavailable"
        ]),
        reason: eF
    })
]), e5 = ez({
    state: eH,
    operation_id: eG,
    device: eK,
    optical_sn: eK,
    cwmp_id: eK,
    revision: eK,
    mode: eL(eE([
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
    cwmp_contract: eL(ez({
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
    wan_objects: eL(eC(eF, eZ())),
    wan_lifecycle: eL(eC(eF, e0)),
    wan_stage: eL(eE([
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
    wifi_objects: eL(ez({
        owned: ew(eW),
        pending: eR(eF),
        pending_instance: eR(eW)
    })),
    wifi_lifecycle: eL(eC(eF, e0)),
    wifi_stage: eL(eE([
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
    wifi_cleanup: eL(eE([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e4 = ez({
    enabled: eJ,
    mode: eE([
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
}), e6 = ez({
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
    error: eR(eF),
    inflight: eJ,
    ready: eJ,
    desired_version: eR(eF),
    applied_version: eR(eF),
    next_retry_at: eW,
    attempts: eW,
    desired: eR(e4),
    applied: eR(e4),
    previous: eR(e4),
    plan: ew(ez({
        operation: eF,
        key: eF,
        value: ew(eF)
    }))
});
const e7 = ez({
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
    acs_bootstrap: e3,
    provisioning: e5,
    services: ew(eY),
    ssids: ew(eY),
    wifi_sync: eQ
}), e8 = ez({
    enabled: eJ,
    mode: eE([
        "auto",
        "manual"
    ]),
    method: eT("diff"),
    revision: eF,
    triggers: ew(eF),
    interval_minutes: new e_({
        type: "number",
        coerce: !0,
        checks: [],
        ...$(void 0)
    }),
    error: eR(eF),
    devices: ew(e7),
    management_network: e6,
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
        error: eL(ey())
    }),
    ez({
        error: eF,
        valid: eL(ey()),
        revision: eL(ey()),
        devices: eL(ey())
    })
]);
let e9 = ep(), te = ef(), tt = eR(te), tr = eC(e9, ez({
    source: e9,
    unit: e9,
    reason: eR(e9),
    raw: eR(e9),
    age_seconds: tt
}));
const tn = ez({
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
    generation: te,
    error: eR(e9)
}), ti = eE([
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
    state: ti,
    business_status: tn,
    management: eR(e1),
    provisioning: eR(e5),
    services: ew(eY),
    ssids: ew(eY),
    wifi_sync: eQ,
    acs_bootstrap: eL(e3),
    identity: eR(to),
    identity_age_seconds: tt,
    identity_current: eg(),
    fiber_distance_m: tt,
    ranging_delay_rtd_ns: tt,
    equalization_delay_bits: new eD({
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
    onu_id: eL(te),
    onu_sn: eL(e9),
    link_state: e9
});
const td = ez({
    fpga_status: e9,
    provisioning: eR(e8),
    optical_transceiver: ta,
    switch_ports: ew(tl),
    sub_gateways: ew(ts),
    telemetry_gateways: ew(ez({
        id: e9,
        last_seen_sec_ago: te,
        last_payload_bytes: te
    }))
}), tc = eC(e9, ez({
    carrier: eL(eg()),
    mac: eL(e9),
    link: eL(ez({
        speed: eL(te),
        duplex: eL(e9),
        autoneg: eL(eg())
    })),
    stats: eL(eC(e9, te))
})), tu = {
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
    return `${_(tu[e.phase])} \xb7 ${e.generation}${e.error ? ` \xb7 ${e.error}` : ""}`;
}
let t_ = L.rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: !0
}), tf = (L.rpc.declare({
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
const th = async ()=>td.parse(eq(await t_())), tg = async ()=>tc.parse(eq(await tf()));
e$([
    ez({
        operation_ids: ew(ef()),
        revision: ep()
    }),
    ez({
        started: eT(!0),
        mode: eE([
            "apply",
            "plan"
        ])
    }),
    ez({
        reset: eT(!0),
        device: ep()
    }),
    ez({
        operation_ids: ew(ef()),
        mode: eE([
            "apply",
            "plan"
        ]),
        reconcile: eL(eg()),
        retry: eL(eg())
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
    data: eL(ep()),
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
    error: eL(ep())
}), ez({
    success: eg(),
    path: ep(),
    size: ef(),
    sha256: ep(),
    error: eL(ep())
}), ez({
    success: eg(),
    output: eL(ep()),
    error: eL(ep())
});
let tm = ep(), tv = ef(), ty = eg(), tb = ez({
    id: tm,
    url: tm
}), tw = ez({
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
    index: tv,
    mask: tv,
    size: tv,
    read: ty,
    write: ty,
    set_by_create: ty,
    avc: ty,
    optional: ty,
    deprecated: ty,
    default_hex: eR(tm),
    reference: tb
}), tx = eO("type", [
    ez({
        type: eT("unsigned"),
        value: tv
    }),
    ez({
        type: eT("signed"),
        value: tv
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
        bytes: tv
    })
]), tz = ez({
    code: tm,
    message: tm,
    offset: tv,
    mask: tv
}), tk = eE([
    "layout",
    "name_only",
    "unknown"
]), t$ = ez({
    raw_hex: tm,
    filter_outer_priority: tv,
    filter_outer_vid: tv,
    filter_outer_tpid_dei: tv,
    filter_inner_priority: tv,
    filter_inner_vid: tv,
    filter_inner_tpid_dei: tv,
    filter_ethertype: tv,
    tags_to_remove: tv,
    treatment_outer_priority: tv,
    treatment_outer_vid: tv,
    treatment_outer_tpid_dei: tv,
    treatment_inner_priority: tv,
    treatment_inner_vid: tv,
    treatment_inner_tpid_dei: tv,
    delete_entry: ty
}), tj = ez({
    schema_version: eT(1),
    reference_version: tm,
    onu_id: eR(tv),
    uploaded_complete: ty,
    expected_records: tv,
    received_records: tv,
    decoded_records: tv,
    partial_records: tv,
    basic_records: tv,
    tables_requested: ty,
    tables_collected: ty,
    classes: ew(ez({
        class_id: tv,
        name: eR(tm),
        entities: tv,
        records: tv,
        support: tk
    })),
    entities: ew(ez({
        class_id: tv,
        entity_id: tv,
        name: eR(tm),
        support: tk,
        reference: eR(tb),
        sequences: ew(tv),
        attributes: ew(ez({
            definition: tw,
            value: eR(tx),
            observations: ew(ez({
                raw_hex: tm,
                value: tx,
                sequences: ew(tv)
            }))
        })),
        diagnostics: ew(tz)
    })),
    records: ew(ez({
        class_id: tv,
        entity_id: tv,
        sequence: tv,
        attribute_mask: tv,
        raw_hex: tm,
        consumed: tv,
        remaining_hex: tm,
        undecoded_mask: tv
    })),
    tables: ew(ez({
        class_id: tv,
        entity_id: tv,
        attribute: tw,
        collected: ty,
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
    phase: eE([
        "starting",
        "upload",
        "tables"
    ]),
    received: tv,
    expected: eR(tv)
}), tC = eO("status", [
    ez({
        status: eT("pending"),
        progress: eL(tS)
    }),
    ez({
        status: eT("ready"),
        chunk: tv,
        chunks: tv,
        bytes: tv,
        data: tm
    })
]), tP = L.rpc.declare({
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
}), tM = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_release",
    params: [
        "job"
    ],
    reject: !0
});
const tT = async (e, t, r)=>eV.parse(eq(await tP(e, t, r))), tI = async (e, t)=>tC.parse(eq(await tE(e, t))), tL = async (e)=>ez({
        released: ty
    }).parse(eq(await tM(e)));
let tN = (e)=>null == e || "" === e ? "\u2014" : String(e), tR = (e)=>JSON.stringify(e, null, 2);
async function tD(e) {
    let t = [
        "{"
    ], r = !0;
    for (let [n, i] of Object.entries(e))if (r || t.push(","), r = !1, t.push(JSON.stringify(n), ":"), Array.isArray(i)) {
        t.push("[");
        for(let e = 0; e < i.length; e++){
            e && t.push(",");
            let r = JSON.stringify(i[e]);
            if (void 0 === r) throw Error(_("MIB snapshot cannot be serialized"));
            t.push(r), e % 32 == 31 && await new Promise((e)=>setTimeout(e, 0));
        }
        t.push("]");
    } else {
        let e = JSON.stringify(i);
        if (void 0 === e) throw Error(_("MIB snapshot cannot be serialized"));
        t.push(e);
    }
    return t.push("}"), new Blob(t, {
        type: "application/json"
    });
}
function tA(e) {
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
let tZ = L.view, tB = L.Poll;
function tU(e) {
    return _(e) || e;
}
let tq = (e)=>null == e || "" === e ? "\u2014" : String(e);
function tV(e, t, r, n) {
    e.textContent = r, "none" === t ? e.className = "" : e.className = `fttr-badge fttr-badge-${t}`, n ? e.setAttribute("title", n) : e.removeAttribute("title");
}
function tF(e) {
    if (void 0 === e || !Number.isFinite(e) || e < 0) return "\u2014";
    if (e < 1024) return `${e} B`;
    let t = [
        "KiB",
        "MiB",
        "GiB",
        "TiB"
    ], r = e / 1024, n = 0;
    for(; r >= 1024 && n < t.length - 1;)r /= 1024, n++;
    return `${r.toFixed(1)} ${t[n]}`;
}
function tW(e) {
    return void 0 === e || !Number.isFinite(e) || e < 0 ? "\u2014" : e < 1000 ? `${e} ${tU("Received packets").includes("\u5305") ? "\u5305" : "Pkts."}` : `${(e / 1000).toFixed(2)} K${tU("Received packets").includes("\u5305") ? "\u5305" : "Pkts."}`;
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
    var t, r, n;
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
    }), y = (n = {
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
            (r = {
                style: "text-align:right",
                children: (t = {
                    type: "button",
                    class: "cbi-button cbi-button-neutral",
                    onclick: ()=>(function(e) {
                            var t, r, n, i, s, l, d, c;
                            let u = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "basic", p = !1, f = !1, h = null, g = null, m = (n = {
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
                                            tp(e.business_status)
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
                                        let [r, n] = e;
                                        return t = {
                                            children: [
                                                o("th", {
                                                    children: r
                                                }),
                                                o("td", {
                                                    children: tN(n)
                                                })
                                            ]
                                        }, o("tr", t);
                                    })
                                }, o("tbody", r))
                            }, o("table", n)), v = o("p", {
                                role: "status",
                                children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                            }), y = o("div", {}), b = o("pre", {
                                style: "max-height:20em;overflow:auto;white-space:pre-wrap;overflow-wrap:anywhere"
                            }), w = o("span", {
                                role: "status"
                            }), x = o("button", {
                                type: "button",
                                class: "cbi-button",
                                disabled: !0,
                                onclick: async ()=>{
                                    if (h && !p) {
                                        x.disabled = !0, w.textContent = _("Preparing JSON download\u2026");
                                        try {
                                            let t = await tD(h);
                                            if (p) return;
                                            z && URL.revokeObjectURL(z), z = URL.createObjectURL(t);
                                            let r = document.createElement("a");
                                            r.href = z, r.download = `mib-${e.serial_number}.json`, r.click(), w.textContent = _("JSON download started"), window.setTimeout(()=>{
                                                URL.revokeObjectURL(r.href), z === r.href && (z = null);
                                            }, 1000);
                                        } catch (e) {
                                            w.textContent = String(e);
                                        } finally{
                                            x.disabled = !h || p;
                                        }
                                    }
                                },
                                children: _("Download JSON")
                            }), z = null, k = (i = {
                                children: [
                                    o("p", {
                                        children: _("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")
                                    }),
                                    b
                                ]
                            }, o("div", i)), $ = o("button", {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                onclick: ()=>N(!1),
                                children: _("Read MIB")
                            }), j = o("button", {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                onclick: ()=>N(!0),
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
                                    v,
                                    y
                                ]
                            }, o("div", s)), S = {
                                basic: m,
                                mib: O,
                                raw: k
                            }, C = new Map();
                            function P(e) {
                                for (let [t, r] of Object.entries(S))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                                for (let [t, r] of C)r.disabled = t === e;
                            }
                            let M = (l = {
                                children: [
                                    [
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
                                        let [t, r] = e, n = o("button", {
                                            type: "button",
                                            class: "cbi-button",
                                            onclick: ()=>P(t),
                                            children: r
                                        });
                                        return C.set(t, n), n;
                                    }),
                                    x,
                                    " ",
                                    w
                                ]
                            }, o("p", l)), T = (c = {
                                children: [
                                    M,
                                    m,
                                    O,
                                    k,
                                    (d = {
                                        class: "right",
                                        children: o("button", {
                                            type: "button",
                                            class: "cbi-button",
                                            onclick: ()=>{
                                                p = !0, z && URL.revokeObjectURL(z), z = null, h = null, b.textContent = "", y.replaceChildren(), L.ui.hideModal();
                                            },
                                            children: _("Close")
                                        })
                                    }, o("div", d))
                                ]
                            }, o(a, c)), I = ()=>!p && M.isConnected && M.getClientRects().length > 0;
                            async function N(t) {
                                if (!f) {
                                    f = !0, $.disabled = j.disabled = !0, v.textContent = _("Reading MIB\u2026");
                                    try {
                                        let s = await th(), l = s.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                        if (l?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                        if (!I()) return;
                                        let d = await tT(l.onu_id, l.serial_number, t);
                                        g = d.job;
                                        let c = Date.now() + 140000;
                                        for(; I();){
                                            let e = await tI(d.job, 0);
                                            if (!I()) return;
                                            if ("ready" === e.status) {
                                                var r, n, i, a;
                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                let t = new Uint8Array(e.bytes), s = 0;
                                                for(let r = 0; r < e.chunks; r++){
                                                    let n = 0 === r ? e : await tI(d.job, r);
                                                    if (!I()) return;
                                                    if ("ready" !== n.status || n.chunk !== r || n.chunks !== e.chunks || n.bytes !== e.bytes || !n.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                    let i = atob(n.data);
                                                    if (i.length > 32768 || s + i.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                    for(let e = 0; e < i.length; e++)t[s++] = i.charCodeAt(e);
                                                    v.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                                }
                                                if (s !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                if (await R(), h = tO.parse(eq(JSON.parse(new TextDecoder("utf-8", {
                                                    fatal: !0
                                                }).decode(t)))).report, 1 !== h.schema_version || h.onu_id !== l.onu_id) throw Error(_("Unexpected MIB response"));
                                                v.textContent = `${new Date().toLocaleString()} \xb7 ONU ${h.onu_id} \xb7 ${_("Upload complete")}: ${h.uploaded_complete} \xb7 ${h.received_records}/${h.expected_records} \xb7 ${_("Decoded / partial / basic")}: ${h.decoded_records}/${h.partial_records}/${h.basic_records} \xb7 ${_("Tables requested / collected")}: ${h.tables_requested}/${h.tables_collected}`, y.replaceChildren(function(e) {
                                                    var t, r, n, i, a;
                                                    let s = (t = {
                                                        style: "min-width:0;flex:1"
                                                    }, o("div", t)), l = (r = {
                                                        type: "search",
                                                        placeholder: _("Search ME name or Class ID")
                                                    }, o("input", r)), d = (n = {}, o("div", n));
                                                    function c(t) {
                                                        s.replaceChildren(...e.entities.filter((e)=>e.class_id === t).map((r)=>{
                                                            var n, i, a, s, l, d, c, u, p, f, h, g, m, v;
                                                            return v = {
                                                                children: [
                                                                    (n = {
                                                                        children: [
                                                                            tN(r.name),
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
                                                                    }, o("summary", n)),
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
                                                                                children: r.attributes.map((e)=>{
                                                                                    var t, r, n, i, a, s, l, d;
                                                                                    return d = {
                                                                                        children: [
                                                                                            (t = {
                                                                                                children: e.definition.name
                                                                                            }, o("td", t)),
                                                                                            (r = {
                                                                                                children: e.definition.kind
                                                                                            }, o("td", r)),
                                                                                            (s = {
                                                                                                children: [
                                                                                                    function(e) {
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
                                                                                                                throw new eU("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                        }
                                                                                                    }(e.value),
                                                                                                    (a = {
                                                                                                        children: [
                                                                                                            (n = {
                                                                                                                children: _("Raw data / observations")
                                                                                                            }, o("summary", n)),
                                                                                                            (i = {
                                                                                                                style: "white-space:pre-wrap;overflow-wrap:anywhere",
                                                                                                                children: tR(e.observations)
                                                                                                            }, o("pre", i))
                                                                                                        ]
                                                                                                    }, o("details", a))
                                                                                                ]
                                                                                            }, o("td", s)),
                                                                                            (l = {
                                                                                                children: tA(e.definition)
                                                                                            }, o("td", l))
                                                                                        ]
                                                                                    }, o("tr", d);
                                                                                })
                                                                            }, o("tbody", u))
                                                                        ]
                                                                    }, o("table", p)),
                                                                    r.attributes.length ? null : (f = {
                                                                        children: _("Basic display only; raw records are preserved.")
                                                                    }, o("p", f)),
                                                                    e.tables.filter((e)=>e.class_id === t && e.entity_id === r.entity_id).map((e)=>{
                                                                        var t, r, n, i, a, s, l, d, c, u, p, f, h, g, m;
                                                                        return m = {
                                                                            children: [
                                                                                (t = {
                                                                                    children: [
                                                                                        e.attribute.name,
                                                                                        " \xb7",
                                                                                        " ",
                                                                                        e.collected ? `${e.rows.length} ${_("rows")}` : tN(e.error)
                                                                                    ]
                                                                                }, o("summary", t)),
                                                                                e.vlan_rules.length ? (f = {
                                                                                    class: "table",
                                                                                    children: [
                                                                                        (u = {
                                                                                            children: (c = {
                                                                                                children: [
                                                                                                    (r = {
                                                                                                        children: _("Outer filter (priority / VID / TPID-DEI)")
                                                                                                    }, o("th", r)),
                                                                                                    (n = {
                                                                                                        children: _("Inner filter (priority / VID / TPID-DEI)")
                                                                                                    }, o("th", n)),
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
                                                                                                var t, r, n, i, a, s, l, d;
                                                                                                return d = {
                                                                                                    children: [
                                                                                                        (t = {
                                                                                                            children: `${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`
                                                                                                        }, o("td", t)),
                                                                                                        (r = {
                                                                                                            children: `${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`
                                                                                                        }, o("td", r)),
                                                                                                        (n = {
                                                                                                            children: tN(e.filter_ethertype)
                                                                                                        }, o("td", n)),
                                                                                                        (i = {
                                                                                                            children: tN(e.tags_to_remove)
                                                                                                        }, o("td", i)),
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
                                                                                        }, o("tbody", p))
                                                                                    ]
                                                                                }, o("table", f)) : null,
                                                                                (h = {
                                                                                    children: [
                                                                                        _("G.988 encoded field values"),
                                                                                        ": ",
                                                                                        tA(e.attribute)
                                                                                    ]
                                                                                }, o("p", h)),
                                                                                (g = {
                                                                                    style: "white-space:pre-wrap;overflow-wrap:anywhere",
                                                                                    children: tR(e.vlan_rules.length ? e.vlan_rules : e.rows)
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
                                                                                children: tR({
                                                                                    diagnostics: r.diagnostics,
                                                                                    records: e.records.filter((e)=>e.class_id === t && e.entity_id === r.entity_id)
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
                                                                }, o("button", t))
                                                            }, o("div", r);
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
                                                }(h), (a = {
                                                    children: [
                                                        (n = {
                                                            children: _("Upload diagnostics")
                                                        }, o("summary", n)),
                                                        (i = {
                                                            children: tR(h.diagnostics)
                                                        }, o("pre", i))
                                                    ]
                                                }, o("details", a))), r = h, b.textContent = tR({
                                                    schema_version: r.schema_version,
                                                    reference_version: r.reference_version,
                                                    onu_id: r.onu_id,
                                                    uploaded_complete: r.uploaded_complete,
                                                    expected_records: r.expected_records,
                                                    received_records: r.received_records,
                                                    decoded_records: r.decoded_records,
                                                    partial_records: r.partial_records,
                                                    basic_records: r.basic_records,
                                                    tables_requested: r.tables_requested,
                                                    tables_collected: r.tables_collected,
                                                    class_count: r.classes.length,
                                                    classes: r.classes.slice(0, 25),
                                                    additional_classes: Math.max(0, r.classes.length - 25),
                                                    record_count: r.records.length,
                                                    first_record: r.records[0] ?? null,
                                                    table_count: r.tables.length,
                                                    diagnostics_count: r.diagnostics.length
                                                }), x.disabled = !1;
                                                return;
                                            }
                                            if (e.progress) {
                                                let { phase: t, received: r, expected: n } = e.progress;
                                                v.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == n ? "" : `: ${r}/${n}`}` : null == n ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${n}`;
                                            }
                                            if (Date.now() >= c) throw Error(_("MIB query timed out; retry."));
                                            await new Promise((e)=>setTimeout(e, 1000));
                                        }
                                    } catch (e) {
                                        I() && (v.textContent = `${String(e)}${h ? ` \xb7 ${_("Previous snapshot retained")}` : ""}`);
                                    } finally{
                                        await R(), f = !1, $.disabled = j.disabled = !1;
                                    }
                                }
                            }
                            async function R() {
                                if (!g) return;
                                let e = g;
                                g = null;
                                try {
                                    await tL(e);
                                } catch (e) {
                                    console.warn("Failed to release MIB snapshot", e);
                                }
                            }
                            P(u), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, T);
                        })(i),
                    children: tU("Details")
                }, o("button", t))
            }, o("td", r))
        ]
    }, o("tr", n));
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
            var t, r;
            let n, a, o, b, w, x;
            i = e, y.setAttribute("data-fttr-onu-id", String(e.onu_id)), s.textContent = String(e.onu_id), l.textContent = tq(e.vendor), d.textContent = tq(e.identity?.equipment_id ?? e.model), c.textContent = tq(e.serial_number), "o5_operation" === e.state ? tV(u, "success", tU(tJ.o5_operation), e.state) : e.state ? tV(u, "warning", tU(tJ[e.state] ?? e.state)) : tV(u, "none", "\u2014");
            let z = e.business_status;
            tV(p, "verified" === z.phase ? "success" : z.error || "wan_bootstrap_pending" === z.phase ? "warning" : "neutral", tp(z));
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
            f.textContent = k.display, k.full ? f.setAttribute("title", k.full) : f.removeAttribute("title"), h.textContent = tq(e.data_path?.interface), t = e.management, n = t?.state, a = function(e) {
                if (null == e || e < 0) return null;
                if (e < 60) return tU(1 === e ? "%d second ago" : "%d seconds ago").replace("%d", String(e));
                let t = Math.floor(e / 60);
                if (t < 60) return tU(1 === t ? "%d minute ago" : "%d minutes ago").replace("%d", String(t));
                let r = Math.floor(e / 3600);
                if (r < 24) return tU(1 === r ? "%d hour ago" : "%d hours ago").replace("%d", String(r));
                let n = Math.floor(e / 86400);
                return tU(1 === n ? "%d day ago" : "%d days ago").replace("%d", String(n));
            }(t?.age_seconds ?? (t?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - t.last_inform) : null)), b = (o = t?.last_inform ? new Date(1000 * t.last_inform).toLocaleString() : null) ? tU("Last Inform: %s").replace("%s", o) : void 0, w = "\u2014", x = "none", "online" === n ? (x = "success", w = tU(tK.online)) : "waiting_inform" === n ? (x = "warning", w = tU(tK.waiting_inform)) : "offline_or_stale" === n ? (x = "danger", w = tU(tK.offline_or_stale)) : n && (x = "neutral", w = tq(n)), tV(g, x, a && n ? `${w} \xb7 ${a}` : w, b);
            let $ = e.provisioning?.state, j = e.provisioning, O = j?.next_retry_at && j.next_retry_at > Math.floor(Date.now() / 1000) ? j.next_retry_at - Math.floor(Date.now() / 1000) : 0, S = j?.current_revision === !1 ? tU("Previous configuration") : j?.management_fresh === !1 ? tU("Management stale") : j?.reconcile_reason ? tU(j.reconcile_reason) : O > 0 ? tU("Next self-healing retry in %d seconds").replace("%d", String(O)) : j?.reason ?? j?.error;
            $ && "not_started" !== $ ? "completed" === $ || "verified" === $ ? tV(m, "success", "completed" === $ ? tU(tG.completed) : tU("Ready"), S) : "wan_reconciling" === $ || "wan_verifying" === $ || "wifi_reconciling" === $ || "discovering" === $ || "reading" === $ || "disabling" === $ || "disabling_read" === $ || "writing" === $ || "verifying" === $ || "settling" === $ || "recovering" === $ || "waiting_task" === $ ? tV(m, "info", tU(tG[$] ?? $), S) : "interrupted" === $ || "failed" === $ || "error" === $ || "blocked" === $ ? tV(m, "danger", tU("blocked" === $ ? tG.blocked : tG.interrupted), S) : "waiting" === $ || "pending" === $ || "waiting_management" === $ ? tV(m, "warning", tU(tG[$] ?? tG.waiting), S) : tV(m, "neutral", tq($), S) : tV(m, "neutral", tU(tG.not_started), S), (r = e.wifi_sync) && "not_configured" !== r ? "verified" === r ? tV(v, "success", tU(tX.verified)) : "attention_required" === r ? tV(v, "danger", tU(tX.attention_required)) : "stale_revision" === r || "stale_management" === r || "waiting_management" === r ? tV(v, "warning", tU(tX[r])) : "recovering" === r ? tV(v, "info", tU(tX.recovering)) : "accepted_unverified" === r || "pending" === r ? tV(v, "warning", tU(tX[r])) : tV(v, "neutral", tq(r)) : tV(v, "neutral", tU(tX.not_configured));
        }
    };
    return b.update(e), b;
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
        var t, r, n, i, a, s, l, d, c, u, p, f, h, g;
        let m, v, y, b, w, x, z, k, $, j, O, S, C;
        return t = e.status, r = e.devices, m = t.optical_transceiver ?? {}, v = function(e) {
            var t, r, n, i, a;
            let s = new Map();
            for (let t of e)s.set(t.onu_id, tH(t));
            let l = (t = {
                children: o("td", {
                    colSpan: 12,
                    children: tU("No registered sub-gateways.")
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
                            (n = {
                                children: (r = {
                                    children: [
                                        o("th", {
                                            children: tU("ONU ID")
                                        }),
                                        o("th", {
                                            children: tU("Vendor")
                                        }),
                                        o("th", {
                                            children: tU("Model")
                                        }),
                                        o("th", {
                                            children: tU("Optical serial")
                                        }),
                                        o("th", {
                                            children: tU("Registration")
                                        }),
                                        o("th", {
                                            children: tU("Business")
                                        }),
                                        o("th", {
                                            children: tU("Firmware")
                                        }),
                                        o("th", {
                                            children: tU("Data interface")
                                        }),
                                        o("th", {
                                            children: tU("CWMP")
                                        }),
                                        o("th", {
                                            children: tU("Synchronization")
                                        }),
                                        o("th", {
                                            children: tU("Wi-Fi sync")
                                        }),
                                        o("th", {
                                            style: "text-align:right",
                                            children: tU("Details")
                                        })
                                    ]
                                }, o("tr", r))
                            }, o("thead", n)),
                            c
                        ]
                    }, o("table", i))
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
                        let n = c.children.item(t);
                        n !== e.element && c.insertBefore(e.element, n);
                    }
                }
            };
        }(t.sub_gateways ?? []), y = Array.from({
            length: 16
        }, (e, t)=>{
            var r, n, i, a, s, l, d, c, u, p, f, h, g, m, v, y, b, w;
            let x, z, k, $, j, O, S, C, P, M, T, I, N, R, D, A, Z, B, U;
            return r = t + 1, x = o("span", {}), z = o("span", {
                style: "display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:90%",
                children: tU("Unknown")
            }), k = o("img", {
                src: "/luci-static/resources/icons/port_down.svg",
                alt: "",
                "aria-hidden": "true"
            }), $ = o("div", {
                style: "flex:1;height:3px;opacity:0.25;background-color:rgb(240, 144, 144)"
            }), j = o("span", {}), O = o("span", {}), S = o("span", {}), C = o("span", {}), P = o("span", {}), M = o("span", {}), T = o("span", {}), I = o("span", {}), N = o("span", {}), R = o("span", {}), D = o("span", {}), A = o("span", {}), Z = o("span", {}), B = o("span", {}), (w = {
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
                    (i = {
                        class: "ifacebox-head cbi-tooltip-container",
                        style: "display:flex",
                        children: [
                            $,
                            (n = {
                                class: "cbi-tooltip left",
                                children: [
                                    o("strong", {
                                        children: [
                                            tU("Port status"),
                                            ": "
                                        ]
                                    }),
                                    j,
                                    o("br", {}),
                                    o("strong", {
                                        children: [
                                            tU("ONU"),
                                            ": "
                                        ]
                                    }),
                                    O,
                                    o("br", {}),
                                    o("strong", {
                                        children: [
                                            tU("MAC address"),
                                            ": "
                                        ]
                                    }),
                                    S
                                ]
                            }, o("span", n))
                        ]
                    }, o("div", i)),
                    (b = {
                        class: "ifacebox-body",
                        children: (y = {
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
                                                P
                                            ]
                                        })
                                    ]
                                }, o("div", a)),
                                (v = {
                                    class: "cbi-tooltip",
                                    children: (m = {
                                        children: [
                                            (s = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            tU("Received bytes"),
                                                            ": "
                                                        ]
                                                    }),
                                                    M
                                                ]
                                            }, o("span", s)),
                                            o("br", {}),
                                            (l = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            tU("Received packets"),
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
                                                            tU("Received multicast"),
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
                                                            tU("Receive errors"),
                                                            ": "
                                                        ]
                                                    }),
                                                    N
                                                ]
                                            }, o("span", c)),
                                            o("br", {}),
                                            (u = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            tU("Receive dropped"),
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
                                                            tU("Transmitted bytes"),
                                                            ": "
                                                        ]
                                                    }),
                                                    D
                                                ]
                                            }, o("span", p)),
                                            o("br", {}),
                                            (f = {
                                                class: "nowrap",
                                                children: [
                                                    o("strong", {
                                                        children: [
                                                            tU("Transmitted packets"),
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
                                                            tU("Transmit errors"),
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
                                                            tU("Transmit dropped"),
                                                            ": "
                                                        ]
                                                    }),
                                                    B
                                                ]
                                            }, o("span", g))
                                        ]
                                    }, o("span", m))
                                }, o("span", v))
                            ]
                        }, o("div", y))
                    }, o("div", b))
                ]
            }, U = o("div", w)).addEventListener("mouseenter", ()=>{
                let e = U.getAttribute("data-active-onu-id");
                if (e) {
                    let t = document.querySelector(`[data-fttr-onu-id="${e}"]`);
                    t?.classList.add("fttr-row-highlight");
                }
            }), U.addEventListener("mouseleave", ()=>{
                document.querySelectorAll(".fttr-row-highlight").forEach((e)=>{
                    e.classList.remove("fttr-row-highlight");
                });
            }), U.addEventListener("click", ()=>{
                let e = U.getAttribute("data-active-onu-id");
                if (e) {
                    let t = document.querySelector(`[data-fttr-onu-id="${e}"]`);
                    t && (t.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    }), t.classList.add("fttr-row-highlight"), window.setTimeout(()=>t.classList.remove("fttr-row-highlight"), 1500));
                }
            }), {
                element: U,
                update (e, t) {
                    var n;
                    let i = (e.switch_ports ?? []).find((e)=>e.port === r), a = i?.interface ?? `fttr${r}`, o = t[a], s = o?.stats, l = i?.carrier ?? o?.carrier ?? (o?.link?.speed !== void 0 || void 0), d = (e.sub_gateways ?? []).find((e)=>e.onu_id === i?.onu_id), c = !0 === l, u = s?.rx_bytes, p = s?.tx_bytes;
                    i?.onu_id !== void 0 ? U.setAttribute("data-active-onu-id", String(i.onu_id)) : U.removeAttribute("data-active-onu-id"), c ? (U.classList.add("port-up"), U.classList.remove("port-down")) : (U.classList.add("port-down"), U.classList.remove("port-up")), x.textContent = a, k.setAttribute("src", `/luci-static/resources/icons/${c ? "port_up.svg" : "port_down.svg"}`), z.textContent = c ? o?.link?.speed !== void 0 ? void 0 === (n = o.link.speed) || !Number.isFinite(n) || n <= 0 ? tU("Unknown") : n >= 1000 ? `${n / 1000}\u{202F}GbE` : `${n}\u{202F}MbE` : tU("Connected") : !1 === l ? tU("Disconnected") : tU("Unknown"), z.setAttribute("title", _("\u901F\u5EA6\uFF1A%s Mbit/s\uFF0C\u53CC\u5DE5\uFF1A%s").format(tq(o?.link?.speed), tq(o?.link?.duplex))), $.style.opacity = c ? "1" : "0.25", $.style.backgroundColor = c ? "rgb(46, 204, 113)" : "rgba(200, 200, 200, 0.4)", j.textContent = tq(i?.link_state ?? i?.status ?? (o ? l ? tU("Link up") : tU("Link down") : tU("Unavailable"))), O.textContent = tq(i?.onu_sn ?? d?.serial_number ?? i?.onu_id), S.textContent = tq(o?.mac), C.textContent = c || p ? tF(p) : "\u2014", P.textContent = c || u ? tF(u) : "\u2014", M.textContent = tF(u), T.textContent = tW(s?.rx_packets), I.textContent = tW(s?.rx_multicast ?? s?.multicast), N.textContent = tW(s?.rx_errors), R.textContent = tW(s?.rx_dropped), D.textContent = tF(p), A.textContent = tW(s?.tx_packets), Z.textContent = tW(s?.tx_errors), B.textContent = tW(s?.tx_dropped);
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
                (n = {
                    children: [
                        o("strong", {
                            style: "margin-right:.4em",
                            children: [
                                tU("Provisioning"),
                                ":"
                            ]
                        }),
                        b
                    ]
                }, o("span", n)),
                (i = {
                    children: [
                        o("span", {
                            style: "color:#888;margin-right:.3em",
                            children: [
                                tU("Mode"),
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
                                tU("Revision"),
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
                    children: tU("FTTR overview")
                }),
                k,
                (p = {
                    class: "cbi-section",
                    children: [
                        o("h3", {
                            children: tU("Controller")
                        }),
                        (u = {
                            class: "table",
                            children: (c = {
                                children: [
                                    (l = {
                                        children: [
                                            o("th", {
                                                style: "width:15%",
                                                children: tU("FPGA status")
                                            }),
                                            o("td", {
                                                style: "width:35%",
                                                children: $
                                            }),
                                            o("th", {
                                                style: "width:15%",
                                                children: tU("CDR lock")
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
                                                children: tU("Optical module")
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
                            children: tU("Sub-gateways")
                        }),
                        v.element
                    ]
                }, o("div", f)),
                (h = {
                    class: "cbi-section",
                    children: [
                        o("h3", {
                            children: tU("Downstream ports")
                        }),
                        o("div", {
                            class: "fttr-ports-grid",
                            children: y.map((e)=>e.element)
                        })
                    ]
                }, o("div", h))
            ]
        }, S = o("div", g), (C = (e, t)=>{
            let r = e.optical_transceiver, n = e.provisioning;
            for (let i of (n ? (tV(b, n.enabled ? "success" : "neutral", n.enabled ? tU("Enabled") : tU("Disabled")), w.textContent = tq(n.mode), x.textContent = tq(n.revision), n.error ? (z.textContent = n.error, z.style.display = "") : z.style.display = "none", k.style.display = "") : k.textContent = tU("Provisioning status unavailable"), "ready" === e.fpga_status ? tV($, "success", tU("Ready")) : e.fpga_status ? tV($, "neutral", tq(e.fpga_status)) : tV($, "none", "\u2014"), j.textContent = tq(r.model), null == r.cdr_locked ? tV(O, "none", tU("Unknown")) : r.cdr_locked ? tV(O, "success", tU("Locked")) : tV(O, "warning", tU("Unlocked")), v.update(e.sub_gateways ?? []), y))i.update(e, t);
        })(t, r), tQ = (tY = {
            element: S,
            update: C
        }).element, tB.add(async ()=>{
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