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
const z = new Set([
    "string",
    "number",
    "symbol"
]);
function x(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function k(e, t, r) {
    let n = new e._zod.constr(t ?? e._zod.def);
    return (!t || r?.parent) && (n._zod.parent = e), n;
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
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = O(e.inst?._zod.def?.error?.(e)) ?? O(t?.error?.(e)) ?? O(r.customError?.(e)) ?? O(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
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
}, $ = s("$ZodError", T), U = s("$ZodError", T, {
    Parent: Error
}), C = (t = U, (e, r, n, i)=>{
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
        let e = new (i?.Err ?? t)(o.issues.map((e)=>A(e, a, c())));
        throw b(e, i?.callee), e;
    }
    return o.value;
}), M = (r = U, async (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (i?.Err ?? r)(o.issues.map((e)=>A(e, a, c())));
        throw b(e, i?.callee), e;
    }
    return o.value;
}), Z = (n = U, (e, t, r)=>{
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
        error: new (n ?? $)(a.issues.map((e)=>A(e, i, c())))
    } : {
        success: !0,
        data: a.value
    };
}), N = (i = U, async (e, t, r)=>{
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
        error: new i(a.issues.map((e)=>A(e, n, c())))
    } : {
        success: !0,
        data: a.value
    };
}), D = /^-?\d+(?:\.\d+)?$/, X = /^(?:true|false)$/i, B = /^null$/i, F = {
    major: 4,
    minor: 3,
    patch: 6
}, R = s("$ZodType", (e, t)=>{
    var r;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = F;
    let n = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && n.unshift(e), n))for (let r of t._zod.onattach)r(e);
    if (0 === n.length) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, r)=>{
            let n, i = S(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, o = a._zod.check(e);
                if (o instanceof Promise && r?.async === !1) throw new l();
                if (n || o instanceof Promise) n = (n ?? Promise.resolve()).then(async ()=>{
                    await o, e.issues.length !== t && (i || (i = S(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = S(e, t));
                }
            }
            return n ? n.then(()=>e) : e;
        }, r = (r, i, a)=>{
            if (S(r)) return r.aborted = !0, r;
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
                    let r = Z(e, t);
                    return r.success ? {
                        value: r.data
                    } : {
                        issues: r.error?.issues
                    };
                } catch (r) {
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
}), I = s("$ZodString", (e, t)=>{
    var r;
    let n;
    R.init(e, t), e._zod.pattern = [
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
}), H = s("$ZodNumber", (e, t)=>{
    R.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? D, e._zod.parse = (r, n)=>{
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
}), V = s("$ZodBoolean", (e, t)=>{
    R.init(e, t), e._zod.pattern = X, e._zod.parse = (r, n)=>{
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
}), q = s("$ZodNull", (e, t)=>{
    R.init(e, t), e._zod.pattern = B, e._zod.values = new Set([
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
}), W = s("$ZodNever", (e, t)=>{
    R.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function J(e, t, r) {
    e.issues.length && t.issues.push(...P(r, e.issues)), t.value[r] = e.value;
}
const K = s("$ZodArray", (e, t)=>{
    R.init(e, t), e._zod.parse = (r, n)=>{
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
            s instanceof Promise ? a.push(s.then((t)=>J(t, r, e))) : J(s, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function G(e, t, r, n, i) {
    if (e.issues.length) {
        if (i && !(r in n)) return;
        t.issues.push(...P(r, e.issues));
    }
    void 0 === e.value ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
const Q = s("$ZodObject", (e, t)=>{
    let r;
    R.init(e, t);
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
    let i = u(()=>(function(e) {
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
        if (!v(o)) return t.issues.push({
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
            a instanceof Promise ? s.push(a.then((r)=>G(r, t, e, o, i))) : G(a, t, e, o, i);
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
                a instanceof Promise ? e.push(a.then((e)=>G(e, r, i, t, c))) : G(a, r, i, t, c);
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
    let i = e.filter((e)=>!S(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>A(e, n, c())))
    }), t);
}
const ee = s("$ZodUnion", (e, t)=>{
    R.init(e, t), g(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), g(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), g(e._zod, "values", ()=>{
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
    let n = u(()=>{
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
        if (!v(o)) return i.issues.push({
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
    R.init(e, t), e._zod.parse = (r, n)=>{
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
                    t.issues.length && r.issues.push(...P(e, t.issues)), r.value[e] = t.value;
                })) : (o.issues.length && r.issues.push(...P(e, o.issues)), r.value[e] = o.value);
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
            if ("string" == typeof o && D.test(o) && s.issues.length) {
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
                    issues: s.issues.map((e)=>A(e, n, c())),
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
                e.issues.length && r.issues.push(...P(o, e.issues)), r.value[s.value] = e.value;
            })) : (l.issues.length && r.issues.push(...P(o, l.issues)), r.value[s.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), en = s("$ZodEnum", (e, t)=>{
    var r;
    let n;
    R.init(e, t);
    let i = (n = Object.values(r = t.entries).filter((e)=>"number" == typeof e), Object.entries(r).filter(([e, t])=>-1 === n.indexOf(+e)).map(([e, t])=>t)), a = new Set(i);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${i.filter((e)=>z.has(typeof e)).map((e)=>"string" == typeof e ? x(e) : e.toString()).join("|")})$`), e._zod.parse = (t, r)=>{
        let n = t.value;
        return a.has(n) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: n,
            inst: e
        }), t;
    };
}), ei = s("$ZodLiteral", (e, t)=>{
    if (R.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? x(e) : e ? x(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (n, i)=>{
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
    R.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
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
    R.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)}|null)$`) : void 0;
    }), g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), el = s("$ZodCatch", (e, t)=>{
    R.init(e, t), g(e._zod, "optin", ()=>t.innerType._zod.optin), g(e._zod, "optout", ()=>t.innerType._zod.optout), g(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let n = t.innerType._zod.run(e, r);
        return n instanceof Promise ? n.then((n)=>(e.value = n.value, n.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: n.issues.map((e)=>A(e, r, c()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = n.value, n.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: n.issues.map((e)=>A(e, r, c()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ed = s("$ZodLazy", (e, t)=>{
    R.init(e, t), g(e._zod, "innerType", ()=>t.getter()), g(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), g(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), g(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), g(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
    R.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>C(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>Z(e, t, r), e.parseAsync = async (t, r)=>M(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>N(e, t, r), e.check = (...r)=>e.clone({
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
    I.init(e, t), ec.init(e, t);
});
function eu(e) {
    return new ep({
        type: "string",
        ...j(e)
    });
}
const ef = s("ZodMiniNumber", (e, t)=>{
    H.init(e, t), ec.init(e, t);
});
function eh(e) {
    return new ef({
        type: "number",
        checks: [],
        ...j(e)
    });
}
const eg = s("ZodMiniBoolean", (e, t)=>{
    V.init(e, t), ec.init(e, t);
});
function em(e) {
    return new eg({
        type: "boolean",
        ...j(e)
    });
}
const ey = s("ZodMiniNull", (e, t)=>{
    q.init(e, t), ec.init(e, t);
}), e_ = s("ZodMiniNever", (e, t)=>{
    W.init(e, t), ec.init(e, t);
});
function eb(e) {
    return new e_({
        type: "never",
        ...j(e)
    });
}
const ev = s("ZodMiniArray", (e, t)=>{
    K.init(e, t), ec.init(e, t);
});
function ew(e, t) {
    return new ev({
        type: "array",
        element: e,
        ...j(t)
    });
}
const ez = s("ZodMiniObject", (e, t)=>{
    Q.init(e, t), ec.init(e, t), g(e, "shape", ()=>t.shape);
});
function ex(e, t) {
    return new ez({
        type: "object",
        shape: e ?? {},
        ...j(t)
    });
}
const ek = s("ZodMiniUnion", (e, t)=>{
    ee.init(e, t), ec.init(e, t);
});
function ej(e, t) {
    return new ek({
        type: "union",
        options: e,
        ...j(t)
    });
}
const eS = s("ZodMiniDiscriminatedUnion", (e, t)=>{
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
const eO = s("ZodMiniRecord", (e, t)=>{
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
const eT = s("ZodMiniEnum", (e, t)=>{
    en.init(e, t), ec.init(e, t), e.options = Object.values(t.entries);
});
function eE(e, t) {
    return new eT({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...j(t)
    });
}
const e$ = s("ZodMiniLiteral", (e, t)=>{
    ei.init(e, t), ec.init(e, t);
});
function eU(e, t) {
    return new e$({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...j(t)
    });
}
const eC = s("ZodMiniOptional", (e, t)=>{
    eo.init(e, t), ec.init(e, t);
});
function eM(e) {
    return new eC({
        type: "optional",
        innerType: e
    });
}
const eZ = s("ZodMiniNullable", (e, t)=>{
    es.init(e, t), ec.init(e, t);
});
function eN(e) {
    return new eZ({
        type: "nullable",
        innerType: e
    });
}
const eL = s("ZodMiniCatch", (e, t)=>{
    el.init(e, t), ec.init(e, t);
}), eD = s("ZodMiniLazy", (e, t)=>{
    ed.init(e, t), ec.init(e, t);
});
function eX() {
    let e = new eD({
        type: "lazy",
        getter: ()=>ej([
                eu(),
                eh(),
                em(),
                new ey({
                    type: "null",
                    ...j(void 0)
                }),
                ew(e),
                eA(eu(), e)
            ])
    });
    return e;
}
let eB = ex({
    error: ej([
        eu(),
        ex({
            code: eu(),
            message: eu()
        })
    ])
});
class eF extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eR(e) {
    let t = eB.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eF("rpc", e) : new eF(e.code, e.message);
    }
    return e;
}
ex({
    status: eU("pending"),
    job: eu()
}), eP("status", [
    ex({
        status: eU("pending")
    }),
    ex({
        status: eU("ready"),
        chunk: eh(),
        chunks: eh(),
        bytes: eh(),
        data: eu()
    })
]);
let eI = eu(), eH = eh(), eV = em(), eq = eM(eI), eW = eM(eH), eJ = eM(eV);
const eK = eE([
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
]), eG = eE([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), eQ = ex({
    id: eI,
    name: eM(eN(eI)),
    kind: eE([
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
    task_id: eM(eN(eH)),
    updated_at: eW,
    changes: eM(ew(ex({
        name: eI,
        desired: eI
    })))
});
let eY = ex({
    state: eI,
    reason: eq,
    task_id: eM(eN(eH)),
    instance: eW
});
const e0 = ex({
    cwmp_id: eI,
    state: eE([
        "online",
        "waiting_inform",
        "offline_or_stale"
    ]),
    optical_online: eV,
    last_inform: eN(eH),
    age_seconds: eN(eH)
});
let e1 = ex({
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
    method: eq,
    reason: eq,
    mqtt_target: eN(eI),
    binding_source: eq,
    link_identity_error: eN(eI),
    mqtt_last_seen: eN(eH),
    cwmp_id: eq,
    desired_version: eq,
    generation: eW,
    inflight: eJ,
    attempts: eW,
    next_retry_at: eW,
    updated_at: eW,
    settings_verified_at: eN(eH),
    last_inform: eN(eH),
    last_error: eM(eN(eI)),
    persistence_error: eM(eN(eI)),
    desired: eM(eN(ex({
        vlan: eH,
        vlans: ew(eH),
        priority: eH,
        acs_url: eI
    }))),
    listener: eM(ex({
        enabled: eV,
        listen: eI,
        path: eI,
        error: eN(eI)
    })),
    endpoint_notice: eq,
    manual_steps: eM(ew(eI))
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
        let n = y(e._zod.def, {
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
        let n = y(e._zod.def, {
            get shape () {
                let r = e._zod.def.shape, n = {
                    ...r
                };
                if (t) for(let e in t){
                    if (!(e in r)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (n[e] = eC ? new eC({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)n[e] = eC ? new eC({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return m(this, "shape", n), n;
            },
            checks: []
        });
        return k(e, n);
    }(e1), {
        state: eE([
            "pending",
            "unavailable"
        ]),
        reason: eI
    })
]), e6 = ex({
    state: eK,
    operation_id: eW,
    device: eq,
    optical_sn: eq,
    cwmp_id: eq,
    revision: eq,
    mode: eM(eE([
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
    cwmp_contract: eM(ex({
        state: eI,
        requested: eI,
        contract: eN(eI),
        reason: eI,
        cache_hit: eV,
        schema: eI,
        capabilities: eN(ex({
            wan: eI,
            wlan: eI,
            binding: eI
        }))
    })),
    wan_objects: eM(eA(eI, eX())),
    wan_lifecycle: eM(eA(eI, eY)),
    wan_stage: eM(eE([
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
    wifi_objects: eM(ex({
        owned: ew(eH),
        pending: eN(eI),
        pending_instance: eN(eH)
    })),
    wifi_lifecycle: eM(eA(eI, eY)),
    wifi_stage: eM(eE([
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
    wifi_cleanup: eM(eE([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e5 = ex({
    enabled: eV,
    mode: eE([
        "auto",
        "manual"
    ]),
    vlan: ew(eH),
    priority: eH,
    address: eI,
    acs_url: eI,
    port: eH,
    path: eI,
    dhcp_enabled: eV
}), e4 = ex({
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
    error: eN(eI),
    inflight: eV,
    ready: eV,
    desired_version: eN(eI),
    applied_version: eN(eI),
    next_retry_at: eH,
    attempts: eH,
    desired: eN(e5),
    applied: eN(e5),
    previous: eN(e5),
    plan: ew(ex({
        operation: eI,
        key: eI,
        value: ew(eI)
    }))
});
const e3 = ex({
    device: eI,
    name: eN(eI),
    group: eN(eI),
    group_name: eN(eI),
    template: eN(eI),
    template_name: eN(eI),
    optical_sn: eI,
    adapter: eI,
    omci_management: ex({
        state: eI,
        reason: eq
    }),
    management: eN(e0),
    acs_bootstrap: e2,
    provisioning: e6,
    services: ew(eQ),
    ssids: ew(eQ),
    wifi_sync: eG
}), e8 = ex({
    enabled: eV,
    mode: eE([
        "auto",
        "manual"
    ]),
    method: eU("diff"),
    revision: eI,
    triggers: ew(eI),
    interval_minutes: new ef({
        type: "number",
        coerce: !0,
        checks: [],
        ...j(void 0)
    }),
    error: eN(eI),
    devices: ew(e3),
    management_network: e4,
    omci_management: eX(),
    groups: ew(ex({
        id: eI,
        name: eN(eI),
        template: eI
    })),
    pending_devices: ew(eI)
});
ej([
    ex({
        valid: eU(!0),
        revision: eI,
        devices: eH,
        error: eM(eb())
    }),
    ex({
        error: eI,
        valid: eM(eb()),
        revision: eM(eb()),
        devices: eM(eb())
    })
]);
let e7 = eu(), e9 = eh(), te = eN(e9), tt = eA(e7, ex({
    source: e7,
    unit: e7,
    reason: eN(e7),
    raw: eN(e7),
    age_seconds: te
}));
const tr = ex({
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
    generation: e9,
    error: eN(e7)
}), tn = eE([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let ti = ex({
    model: e7,
    wavelength_tx_nm: e9,
    wavelength_rx_nm: e9,
    phy_rate_downlink_gbps: e9,
    phy_rate_uplink_gbps: e9,
    tx_power_dbm: te,
    laser_bias_current_ma: te,
    temperature_celsius: te,
    vcc_voltage: te,
    cdr_locked: eN(em()),
    measurements: tt
}), ta = ex({
    equipment_id: eN(e7),
    hardware_version: eN(e7),
    software_images: ew(e7),
    omcc_version: te,
    errors: ew(e7)
});
const to = ex({
    onu_id: e9,
    vendor: e7,
    model: e7,
    serial_number: e7,
    state: tn,
    business_status: tr,
    management: eN(e0),
    provisioning: eN(e6),
    services: ew(eQ),
    ssids: ew(eQ),
    wifi_sync: eG,
    acs_bootstrap: eM(e2),
    identity: eN(ta),
    identity_age_seconds: te,
    identity_current: em(),
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
    data_path: ex({
        interface: e7,
        gem_ports: eN(ew(e9)),
        vlan_id: te,
        tx_bytes: te,
        rx_bytes: te,
        current_tx_kbps: te,
        current_rx_kbps: te,
        measurements: tt
    }),
    wifi_mesh: ex({
        channel_2g: te,
        channel_5g: te,
        bandwidth_5g: eN(e7),
        tx_power_pct: te,
        measurements: tt
    }),
    connected_clients: eN(ew(ex({
        mac: e7,
        ip: e7,
        band: e7,
        rssi_dbm: te,
        rx_rate_mbps: te,
        tx_rate_mbps: te
    }))),
    measurements: tt
});
let ts = ex({
    port: e9,
    interface: e7,
    carrier: em(),
    status: e7,
    onu_id: eM(e9),
    onu_sn: eM(e7),
    link_state: e7
});
ex({
    fpga_status: e7,
    provisioning: eN(e8),
    optical_transceiver: ti,
    switch_ports: ew(ts),
    sub_gateways: ew(to),
    telemetry_gateways: ew(ex({
        id: e7,
        last_seen_sec_ago: e9,
        last_payload_bytes: e9
    }))
}), eA(e7, ex({
    carrier: eM(em()),
    mac: eM(e7),
    link: eM(ex({
        speed: eM(e9),
        duplex: eM(e7),
        autoneg: eM(em())
    })),
    stats: eM(eA(e7, e9))
})), L.rpc.declare({
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
}), ej([
    ex({
        operation_ids: ew(eh()),
        revision: eu()
    }),
    ex({
        started: eU(!0),
        mode: eE([
            "apply",
            "plan"
        ])
    }),
    ex({
        reset: eU(!0),
        device: eu()
    }),
    ex({
        operation_ids: ew(eh()),
        mode: eE([
            "apply",
            "plan"
        ]),
        reconcile: eM(em()),
        retry: eM(em())
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
const tp = ex({
    source: eE([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: eu(),
    size: eh(),
    sha256: eu(),
    data: eM(eu()),
    factory: ex({
        detected: em(),
        device: eu(),
        has_data: em(),
        sha256: eu(),
        data: eu()
    }),
    firmware: ex({
        exists: em(),
        path: eu(),
        size: eh(),
        sha256: eu(),
        data: eu()
    }),
    error: eM(eu())
}), tu = ex({
    success: em(),
    path: eu(),
    size: eh(),
    sha256: eu(),
    error: eM(eu())
}), tf = ex({
    success: em(),
    output: eM(eu()),
    error: eM(eu())
}), th = async ()=>tp.parse(eR(await tl())), tg = async (e)=>tu.parse(eR(await td("/lib/firmware/modified_UX3326.bin", e))), tm = async ()=>tf.parse(eR(await tc()));
async function ty(e) {
    return window.crypto?.subtle ? Array.from(new Uint8Array(await window.crypto.subtle.digest("SHA-256", e))).map((e)=>e.toString(16).padStart(2, "0")).join("") : "unavailable";
}
function t_(e) {
    let t = window.atob(e), r = t.length, n = new Uint8Array(r);
    for(let e = 0; e < r; e++)n[e] = t.charCodeAt(e);
    return n.buffer;
}
function tb(e, t) {
    let r = new Uint8Array(e), n = r.byteLength;
    if (288 !== n && 56 !== n) return null;
    let i = new DataView(e), a = [];
    for(let e = 0; e < Math.min(56, n); e++)a.push(r[e]);
    let o = n >= 0x46 ? {
        n: i.getUint16(0x40, !1),
        d: i.getUint16(0x42, !1),
        o: i.getInt16(0x44, !1)
    } : {
        n: 7142,
        d: 4096,
        o: -24780
    }, s = n >= 0x4c ? {
        n: i.getUint16(0x46, !1),
        d: i.getUint16(0x48, !1),
        o: i.getInt16(0x4a, !1)
    } : {
        n: 950,
        d: 1024,
        o: 0
    }, l = n >= 0x52 ? {
        n: i.getUint16(0x4c, !1),
        d: i.getUint16(0x4e, !1),
        o: i.getInt16(0x50, !1)
    } : {
        n: 1403,
        d: 1024,
        o: 337
    }, d = n >= 0x58 ? {
        n: i.getUint16(0x52, !1),
        d: i.getUint16(0x54, !1),
        o: i.getInt16(0x56, !1)
    } : {
        n: 227,
        d: 256,
        o: 1
    }, c = n >= 0x5e ? {
        n: i.getUint16(0x58, !1),
        d: i.getUint16(0x5a, !1),
        o: i.getInt16(0x5c, !1)
    } : {
        n: 7372,
        d: 4096,
        o: -26735
    }, p = n >= 0x60 ? i.getInt16(0x5e, !1) : 35, u = {
        size: n,
        sha256: t,
        isStockHash: "a9447a85073b61016d8ef1e736e944c9942e1b138ba9a35663b48abcf47c1bd4" === t.toLowerCase(),
        registers: a,
        tempPrimary: o,
        tempAlt: c,
        tempThreshold: p,
        voltage: s,
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
            let { n: t, d: r, o: n } = e.tempPrimary, i = (Math.floor(0x5980 * t / (0 === r ? 4096 : r)) + n) / 256.0;
            if (i <= e.tempThreshold) {
                let { n: t, d: r, o: n } = e.tempAlt;
                return Number(((Math.floor(0x5980 * t / (0 === r ? 4096 : r)) + n) / 256.0).toFixed(2));
            }
            return Number(i.toFixed(2));
        }(u),
        voltage: function(e) {
            let { n: t, d: r, o: n } = e.voltage;
            return Number(((Math.floor(0x8880 * t / (0 === r ? 1024 : r)) + n) / 10000.0).toFixed(2));
        }(u),
        bias: function(e) {
            let { n: t, d: r, o: n } = e.bias;
            return Number(((Math.floor(0x1f40 * t / (0 === r ? 1024 : r)) + n) / 500.0).toFixed(2));
        }(u),
        txPower: function(e) {
            let { n: t, d: r, o: n } = e.txPower, i = (Math.floor(0x2440 * t / (0 === r ? 256 : r)) + n) / 10000.0;
            return i > 0 ? Number((10.0 * Math.log10(i)).toFixed(2)) : null;
        }(u)
    }, u;
}
function tv(e, t, r) {
    var n, i, a, s, l, d, c, p, u, f, h, g, m, y, b, v, w, z, x, k, j, S, P, O, A, T, $, U, C, M, Z, N, D, X, B;
    let F = e.isStockHash ? o("span", {
        class: "fttr-badge fttr-badge-success",
        children: "\u5B98\u65B9\u51FA\u5382\u57FA\u7EBF\u5339\u914D"
    }) : o("span", {
        class: "fttr-badge fttr-badge-info",
        children: "\u81EA\u5B9A\u4E49\u6821\u51C6\u6570\u636E"
    }), R = 288 === e.size ? o("span", {
        class: "fttr-badge fttr-badge-success",
        children: "\u6807\u51C6 288 \u5B57\u8282"
    }) : o("span", {
        class: "fttr-badge fttr-badge-warning",
        children: "\u57FA\u7840 56 \u5B57\u8282\uFF08\u7F3A ADC \u7CFB\u6570\uFF09"
    });
    return B = {
        class: "fttr-card",
        style: "margin-top:12px",
        children: [
            (i = {
                style: "display:flex;justify-content:space-between;align-items:center;margin-bottom:12px",
                children: [
                    (n = {
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
                    }, o("div", n)),
                    o("div", {
                        style: "display:flex;gap:6px",
                        children: [
                            R,
                            F
                        ]
                    })
                ]
            }, o("div", i)),
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
                                children: "\u6570\u636E\u5927\u5C0F"
                            }),
                            o("div", {
                                style: "font-size:110%;font-weight:600;margin-top:2px",
                                children: [
                                    e.size,
                                    " \u5B57\u8282"
                                ]
                            })
                        ]
                    }, o("div", a)),
                    (s = {
                        class: "fttr-card",
                        children: [
                            o("div", {
                                class: "fttr-kv-label",
                                style: "font-size:85%",
                                children: "SHA-256 \u6821\u9A8C\u548C"
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
                                children: "\u51FA\u5382\u57FA\u7EBF\u4E00\u81F4\u6027"
                            }),
                            o("div", {
                                style: "margin-top:2px",
                                children: e.isStockHash ? "\u5B8C\u5168\u543B\u5408 (a9447a8...)" : "\u975E\u539F\u5382\u9ED8\u8BA4 (\u81EA\u6807\u5B9A)"
                            })
                        ]
                    }, o("div", l))
                ]
            }, o("div", d)),
            o("h5", {
                style: "margin:16px 0 6px;font-size:95%",
                children: "ADC \u8BCA\u65AD\u591A\u9879\u5F0F\u6362\u7B97\u7CFB\u6570 (\u504F\u79FB 0x40 ~ 0x5F)"
            }),
            (X = {
                style: "overflow-x:auto",
                children: (D = {
                    class: "table cbi-section-table",
                    style: "font-size:90%",
                    children: [
                        (p = {
                            children: (c = {
                                children: [
                                    o("th", {
                                        children: "\u8BCA\u65AD\u6D4B\u91CF\u901A\u9053"
                                    }),
                                    o("th", {
                                        children: "\u5BC4\u5B58\u5668\u504F\u79FB"
                                    }),
                                    o("th", {
                                        children: "\u5206\u5B50 N"
                                    }),
                                    o("th", {
                                        children: "\u5206\u6BCD D"
                                    }),
                                    o("th", {
                                        children: "\u504F\u79FB O"
                                    }),
                                    o("th", {
                                        children: "\u6362\u7B97\u516C\u5F0F"
                                    }),
                                    o("th", {
                                        children: "\u5178\u578B Raw \u6A21\u62DF\u503C"
                                    })
                                ]
                            }, o("tr", c))
                        }, o("thead", p)),
                        (N = {
                            children: [
                                (m = {
                                    children: [
                                        (u = {
                                            children: o("strong", {
                                                children: "\u6E29\u5EA6\u4E3B\u53C2\u6570 (Temp)"
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
                                                "Raw ",
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
                                        (y = {
                                            children: o("strong", {
                                                children: "\u6E29\u5EA6\u5907\u7528\u53C2\u6570 (Alt Temp)"
                                            })
                                        }, o("td", y)),
                                        (b = {
                                            children: o("code", {
                                                children: "0x58 / 0x5A / 0x5C"
                                            })
                                        }, o("td", b)),
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
                                            children: [
                                                "\u5F53\u8BA1\u7B97\u6E29\u5EA6 \u2264 ",
                                                e.tempThreshold,
                                                " \xb0C \u65F6\u91C7\u7528\u5907\u7528\u53C2\u6570"
                                            ]
                                        }),
                                        o("td", {
                                            children: [
                                                "\u5206\u6BB5\u9608\u503C\uFF1A",
                                                e.tempThreshold,
                                                " \xb0C"
                                            ]
                                        })
                                    ]
                                }, o("tr", v)),
                                (j = {
                                    children: [
                                        (w = {
                                            children: o("strong", {
                                                children: "\u4F9B\u7535\u7535\u538B (Vcc)"
                                            })
                                        }, o("td", w)),
                                        (z = {
                                            children: o("code", {
                                                children: "0x46 / 0x48 / 0x4A"
                                            })
                                        }, o("td", z)),
                                        o("td", {
                                            children: e.voltage.n
                                        }),
                                        o("td", {
                                            children: e.voltage.d
                                        }),
                                        o("td", {
                                            children: e.voltage.o
                                        }),
                                        (x = {
                                            children: o("code", {
                                                children: "(raw * N / D + O) / 10000 V"
                                            })
                                        }, o("td", x)),
                                        (k = {
                                            children: [
                                                "Raw ",
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
                                (T = {
                                    children: [
                                        (S = {
                                            children: o("strong", {
                                                children: "\u504F\u7F6E\u7535\u6D41 (Bias Current)"
                                            })
                                        }, o("td", S)),
                                        (P = {
                                            children: o("code", {
                                                children: "0x4C / 0x4E / 0x50"
                                            })
                                        }, o("td", P)),
                                        o("td", {
                                            children: e.bias.n
                                        }),
                                        o("td", {
                                            children: e.bias.d
                                        }),
                                        o("td", {
                                            children: e.bias.o
                                        }),
                                        (O = {
                                            children: o("code", {
                                                children: "(raw * N / D + O) / 500 mA"
                                            })
                                        }, o("td", O)),
                                        (A = {
                                            children: [
                                                "Raw ",
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
                                        }, o("td", A))
                                    ]
                                }, o("tr", T)),
                                (Z = {
                                    children: [
                                        ($ = {
                                            children: o("strong", {
                                                children: "\u53D1\u5C04\u5149\u529F\u7387 (Tx Power)"
                                            })
                                        }, o("td", $)),
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
                                        (C = {
                                            children: o("code", {
                                                children: "p_mw = (raw*N/D+O)/10000; 10*log10(p_mw) dBm"
                                            })
                                        }, o("td", C)),
                                        (M = {
                                            children: [
                                                "Raw ",
                                                o("code", {
                                                    children: "0x2440"
                                                }),
                                                " \u2192 ",
                                                o("strong", {
                                                    children: [
                                                        e.simulated.txPower ?? "\u2014",
                                                        " dBm"
                                                    ]
                                                })
                                            ]
                                        }, o("td", M))
                                    ]
                                }, o("tr", Z))
                            ]
                        }, o("tbody", N))
                    ]
                }, o("table", D))
            }, o("div", X)),
            o("h5", {
                style: "margin:16px 0 6px;font-size:95%",
                children: "BOSA \u786C\u4EF6\u5BC4\u5B58\u5668\u521D\u59CB\u5316\u8868 (\u524D 56 \u5B57\u8282\uFF0C0x00 ~ 0x37)"
            }),
            function(e) {
                var t, r, n, i, a, s;
                let l = [];
                for(let r = 0; r < e.length; r += 8){
                    let n = e.slice(r, r + 8);
                    l.push((t = {
                        children: [
                            o("td", {
                                style: "font-family:monospace;font-weight:600;opacity:0.75",
                                children: [
                                    "0x",
                                    r.toString(16).padStart(2, "0").toUpperCase()
                                ]
                            }),
                            n.map((e, t)=>{
                                var n;
                                let i = r + t, a = 0x27 === i;
                                return n = {
                                    style: "font-family:monospace;text-align:center",
                                    title: `Reg 0x${i.toString(16).padStart(2, "0").toUpperCase()}: 0x${e.toString(16).padStart(2, "0").toUpperCase()} (${e})`,
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
                                }, o("td", n);
                            }),
                            Array.from({
                                length: 8 - n.length
                            }).map(()=>o("td", {
                                    style: "text-align:center;opacity:0.35",
                                    children: "\u2014"
                                }))
                        ]
                    }, o("tr", t)));
                }
                return s = {
                    style: "overflow-x:auto",
                    children: [
                        (i = {
                            class: "table cbi-section-table",
                            style: "font-size:90%;margin-top:8px",
                            children: [
                                (n = {
                                    children: (r = {
                                        children: [
                                            o("th", {
                                                style: "width:64px;opacity:0.8",
                                                children: "Addr"
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
                                }, o("thead", n)),
                                o("tbody", {
                                    children: l
                                })
                            ]
                        }, o("table", i)),
                        (a = {
                            style: "font-size:85%;opacity:0.75;margin:4px 0 0",
                            children: [
                                "\u6CE8\uFF1A\u5BC4\u5B58\u5668 ",
                                o("code", {
                                    children: "0x27"
                                }),
                                "\uFF08\u9EC4\u8272\u9AD8\u4EAE\uFF09\u4E3A\u786C\u4EF6\u751F\u6548\u9501\u5B58\u5BC4\u5B58\u5668\uFF0C\u987A\u5E8F\u5199\u5165\u65F6\u81EA\u52A8\u8DF3\u8FC7\uFF0C\u5199\u5165\u5B8C\u6210\u540E\u7EDF\u4E00\u9001\u5165",
                                " ",
                                o("code", {
                                    children: "0x55"
                                }),
                                " \u63D0\u4EA4\u751F\u6548\u3002"
                            ]
                        }, o("p", a))
                    ]
                }, o("div", s);
            }(e.registers)
        ]
    }, o("div", B);
}
let main = L.view.extend({
    load: ()=>th(),
    render: (e)=>(function(e) {
            var t, r, n, i, a, s, l, d, c, p, u;
            let f = document.createElement("div");
            f.className = "fttr-calibration";
            let h = null, g = null, m = o("div", {}), y = o("div", {}), b = o("div", {}), v = o("div", {});
            function w(e) {
                var t, r, n, i, a, s, l, d, c, p, u, f, h, g, b, v, w, z, x, k, j, S;
                m.innerHTML = "", y.innerHTML = "", "builtin" === e.source && m.appendChild((n = {
                    class: "alert-message warning",
                    style: "margin-bottom:16px",
                    children: [
                        o("h4", {
                            style: "margin:0 0 6px",
                            children: "\u5F53\u524D\u6B63\u5904\u4E8E\u3010\u5185\u7F6E\u9759\u6001\u9ED8\u8BA4\u7248\u672C\u3011\u56DE\u9000\u8FD0\u884C\u6A21\u5F0F"
                        }),
                        (t = {
                            style: "margin:0 0 4px",
                            children: [
                                "\u7CFB\u7EDF\u672A\u5728 ",
                                o("strong", {
                                    children: "1MB Factory UBI \u5206\u533A (\u504F\u79FB 0x2200)"
                                }),
                                " \u8BFB\u53D6\u5230\u6709\u6548\u6821\u51C6\u6570\u636E\uFF0C\u4E14\u76EE\u6807\u56FA\u4EF6\u76EE\u5F55",
                                " ",
                                o("code", {
                                    children: "/lib/firmware/modified_UX3326.bin"
                                }),
                                " \u4E0D\u5B58\u5728\u3002\u5F53\u524D\u5149\u6A21\u5757\u6B63\u4F7F\u7528\u7F16\u8BD1\u671F\u6E90\u7801\u5185\u5D4C\u53C2\u6570\u8FD0\u884C\u3002"
                            ]
                        }, o("p", t)),
                        (r = {
                            style: "margin:0;font-size:90%;opacity:0.85",
                            children: [
                                "\u5EFA\u8BAE\u5C06\u4ECE\u539F\u5382\u5907\u4EFD\u63D0\u53D6\u7684 288 \u5B57\u8282 ",
                                o("code", {
                                    children: "modified_UX3326.bin"
                                }),
                                " \u6821\u51C6\u6587\u4EF6\u901A\u8FC7\u4E0B\u65B9\u8868\u5355\u4E0A\u4F20\u81F3",
                                " ",
                                o("code", {
                                    children: "/lib/firmware/modified_UX3326.bin"
                                }),
                                "\uFF0C\u4EE5\u786E\u4FDD\u6FC0\u5149\u5668\u53D1\u5C04\u529F\u7387\u53CA ADC \u8BCA\u65AD\u8BFB\u6570\u7CBE\u786E\u3002"
                            ]
                        }, o("p", r))
                    ]
                }, o("div", n)));
                let P = null;
                if (e.data) try {
                    let t = t_(e.data);
                    P = tb(t, e.sha256);
                } catch  {}
                let O = null;
                if (e.factory.has_data && e.factory.data) try {
                    let t = t_(e.factory.data);
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
                                        o("h3", {
                                            style: "margin:0;font-size:110%",
                                            children: "\u5F53\u524D\u7CFB\u7EDF\u751F\u6548\u6821\u51C6\u6570\u636E"
                                        }),
                                        (i = {
                                            style: "display:flex;align-items:center;gap:8px",
                                            children: [
                                                o("span", {
                                                    class: "fttr-kv-label",
                                                    children: "\u751F\u6548\u6570\u636E\u6E90\uFF1A"
                                                }),
                                                function(e) {
                                                    switch(e){
                                                        case "factory":
                                                            return o("span", {
                                                                class: "fttr-badge fttr-badge-success",
                                                                children: "1MB Factory \u5206\u533A (\u504F\u79FB 0x2200)"
                                                            });
                                                        case "firmware":
                                                            return o("span", {
                                                                class: "fttr-badge fttr-badge-info",
                                                                children: "/lib/firmware/modified_UX3326.bin"
                                                            });
                                                        case "builtin":
                                                            return o("span", {
                                                                class: "fttr-badge fttr-badge-danger",
                                                                children: "\u5185\u7F6E\u9759\u6001\u9ED8\u8BA4\u7248\u672C (Fallback)"
                                                            });
                                                    }
                                                }(e.source)
                                            ]
                                        }, o("div", i))
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
                                                    children: "\u5F53\u524D\u751F\u6548\u8DEF\u5F84"
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
                                                    children: "\u751F\u6548\u6570\u636E\u5927\u5C0F"
                                                }),
                                                o("div", {
                                                    style: "font-size:110%;font-weight:600;margin-top:2px",
                                                    children: [
                                                        e.size,
                                                        " \u5B57\u8282"
                                                    ]
                                                })
                                            ]
                                        }, o("div", l)),
                                        (d = {
                                            class: "fttr-card",
                                            children: [
                                                o("div", {
                                                    class: "fttr-kv-label",
                                                    style: "font-size:85%",
                                                    children: "SHA-256 \u6821\u9A8C\u548C"
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
                                    children: "\u6821\u51C6\u6570\u636E\u6E90\u63A2\u6D4B\u6982\u51B5"
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
                                                            children: "1. 1MB Factory \u5206\u533A (\u6700\u9AD8\u4F18\u5148\u7EA7)"
                                                        }),
                                                        e.factory.has_data ? o("span", {
                                                            class: "fttr-badge fttr-badge-success",
                                                            children: "\u6570\u636E\u6709\u6548 (288 \u5B57\u8282)"
                                                        }) : o("span", {
                                                            class: "fttr-badge fttr-badge-neutral",
                                                            children: "\u65E0\u6709\u6548\u6570\u636E"
                                                        })
                                                    ]
                                                }, o("div", p)),
                                                (u = {
                                                    class: "fttr-kv-row",
                                                    children: [
                                                        o("span", {
                                                            class: "fttr-kv-label",
                                                            children: "\u8BBE\u5907\u4E0E\u504F\u79FB"
                                                        }),
                                                        o("code", {
                                                            children: [
                                                                e.factory.device || "\u672A\u63A2\u6D4B\u5230\u8BBE\u5907",
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
                                                            children: "\u4F7F\u7528\u72B6\u6001"
                                                        }),
                                                        (f = {
                                                            children: "factory" === e.source ? o("span", {
                                                                class: "fttr-badge fttr-badge-success",
                                                                children: "\u5F53\u524D\u6B63\u5728\u4F7F\u7528"
                                                            }) : o("span", {
                                                                style: "opacity:0.7",
                                                                children: "\u672A\u751F\u6548"
                                                            })
                                                        }, o("span", f))
                                                    ]
                                                }, o("div", h))
                                            ]
                                        }, o("div", g)),
                                        (x = {
                                            class: "fttr-card",
                                            children: [
                                                (b = {
                                                    style: "display:flex;justify-content:space-between;align-items:center;margin-bottom:6px",
                                                    children: [
                                                        o("strong", {
                                                            children: "2. \u56FA\u4EF6\u6587\u4EF6\u8DEF\u5F84 (\u6B21\u4F18\u5148\u7EA7)"
                                                        }),
                                                        e.firmware.exists ? o("span", {
                                                            class: "fttr-badge fttr-badge-info",
                                                            children: [
                                                                "\u5DF2\u5B58\u5728 (",
                                                                e.firmware.size,
                                                                " \u5B57\u8282)"
                                                            ]
                                                        }) : o("span", {
                                                            class: "fttr-badge fttr-badge-neutral",
                                                            children: "\u6587\u4EF6\u4E0D\u5B58\u5728"
                                                        })
                                                    ]
                                                }, o("div", b)),
                                                (v = {
                                                    class: "fttr-kv-row",
                                                    children: [
                                                        o("span", {
                                                            class: "fttr-kv-label",
                                                            children: "\u56FA\u4EF6\u8DEF\u5F84"
                                                        }),
                                                        o("code", {
                                                            children: e.firmware.path
                                                        })
                                                    ]
                                                }, o("div", v)),
                                                (z = {
                                                    class: "fttr-kv-row",
                                                    children: [
                                                        o("span", {
                                                            class: "fttr-kv-label",
                                                            children: "\u4F7F\u7528\u72B6\u6001"
                                                        }),
                                                        (w = {
                                                            children: "firmware" === e.source ? o("span", {
                                                                class: "fttr-badge fttr-badge-info",
                                                                children: "\u5F53\u524D\u6B63\u5728\u4F7F\u7528"
                                                            }) : e.firmware.exists ? o("span", {
                                                                class: "fttr-badge fttr-badge-neutral",
                                                                children: "\u5DF2\u5C31\u7EEA (\u88AB Factory \u8986\u76D6)"
                                                            }) : o("span", {
                                                                style: "opacity:0.7",
                                                                children: "\u672A\u5C31\u7EEA"
                                                            })
                                                        }, o("span", w))
                                                    ]
                                                }, o("div", z))
                                            ]
                                        }, o("div", x))
                                    ]
                                }, o("div", k))
                            ]
                        }, o("div", j)),
                        e.factory.has_data && O && o("div", {
                            style: "margin-top:16px",
                            children: tv(O, "1MB Factory \u5206\u533A\u63D0\u53D6\u7684\u4E0B\u884C\u5149\u6821\u51C6\u53C2\u6570 (\u504F\u79FB 0x2200)", `\u{8BBE}\u{5907}: ${e.factory.device}\u{FF0C}\u{957F}\u{5EA6} 288 \u{5B57}\u{8282}${"factory" === e.source ? " (\u5F53\u524D\u7CFB\u7EDF\u6B63\u5728\u4F7F\u7528\u8BE5\u6570\u636E)" : ""}`)
                        }),
                        (!e.factory.has_data || "factory" !== e.source) && P && o("div", {
                            style: "margin-top:16px",
                            children: tv(P, `\u{5F53}\u{524D}\u{7CFB}\u{7EDF}\u{751F}\u{6548}\u{6821}\u{51C6}\u{53C2}\u{6570} (${e.active_path})`, `\u{751F}\u{6548}\u{6570}\u{636E}\u{5927}\u{5C0F}: ${e.size} \u{5B57}\u{8282}`)
                        })
                    ]
                }, o("div", S)));
            }
            w(e);
            let z = o("input", {
                id: "fttr-cal-apply-hw",
                type: "checkbox",
                checked: !0,
                style: "margin-right:6px"
            }), x = o("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                disabled: !0,
                style: "margin-right:8px",
                children: _("\u4E0A\u4F20\u5E76\u4FDD\u5B58\u81F3 /lib/firmware/modified_UX3326.bin") || "\u4E0A\u4F20\u5E76\u4FDD\u5B58\u81F3 /lib/firmware/modified_UX3326.bin"
            }), k = o("input", {
                type: "file",
                accept: ".bin",
                style: "display:none"
            }), j = (n = {
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
                        children: "\u70B9\u51FB\u9009\u62E9\u6216\u62D6\u62FD UX3326.bin \u6587\u4EF6\u81F3\u6B64\u5904"
                    }),
                    (r = {
                        style: "font-size:85%;opacity:0.75",
                        children: [
                            "\u652F\u6301 ",
                            o("code", {
                                children: "modified_UX3326.bin"
                            }),
                            " \u6587\u4EF6\uFF1B\u5FC5\u987B\u4E25\u683C\u4E3A 288 \u5B57\u8282"
                        ]
                    }, o("div", r))
                ]
            }, o("div", n));
            async function S(e) {
                var t, r, n, i, a, s, l, d, c, p, u, f;
                v.innerHTML = "", b.innerHTML = "", x.disabled = !0;
                let m = e.size;
                if (288 !== m && 56 !== m) return void v.appendChild((r = {
                    class: "alert-message danger",
                    children: [
                        o("h4", {
                            style: "margin:0 0 6px",
                            children: "\u6587\u4EF6\u5927\u5C0F\u6821\u9A8C\u5931\u8D25"
                        }),
                        (t = {
                            style: "margin:0",
                            children: [
                                "\u6807\u51C6 Semtech UX3326 BOSA \u6821\u51C6\u6587\u4EF6\u5FC5\u987B\u4E25\u683C\u4E3A ",
                                o("strong", {
                                    children: "288 \u5B57\u8282"
                                }),
                                "\uFF08\u524D 56 \u5B57\u8282\u5BC4\u5B58\u5668\u914D\u7F6E + 0x40 \u540E\u7684 ADC \u8BCA\u65AD\u6362\u7B97\u7CFB\u6570\uFF09\u3002",
                                o("br", {}),
                                "\u5F53\u524D\u9009\u4E2D\u7684\u6587\u4EF6 ",
                                o("strong", {
                                    children: e.name
                                }),
                                " \u5927\u5C0F\u4E3A ",
                                o("strong", {
                                    children: [
                                        m,
                                        " \u5B57\u8282"
                                    ]
                                }),
                                "\uFF0C\u5DF2\u963B\u6B62\u4E0A\u4F20\u3002"
                            ]
                        }, o("p", t))
                    ]
                }, o("div", r)));
                try {
                    let t = await e.arrayBuffer();
                    h = t;
                    let r = await ty(t), f = tb(t, r);
                    if (!f) return void v.appendChild((a = {
                        class: "alert-message danger",
                        children: [
                            (n = {
                                style: "margin:0 0 6px",
                                children: "\u89E3\u6790\u6821\u51C6\u6587\u4EF6\u5931\u8D25"
                            }, o("h4", n)),
                            (i = {
                                style: "margin:0",
                                children: "\u65E0\u6CD5\u89E3\u6790\u8BE5\u6821\u51C6\u6587\u4EF6\u7684\u6570\u636E\u7ED3\u6784\uFF0C\u8BF7\u786E\u8BA4\u6587\u4EF6\u5B8C\u6574\u6027\u3002"
                            }, o("p", i))
                        ]
                    }, o("div", a)));
                    g = f, x.disabled = !1, v.appendChild((u = {
                        class: "alert-message success",
                        children: [
                            (s = {
                                style: "margin:0 0 6px",
                                children: [
                                    "\u6587\u4EF6\u6821\u9A8C\u6210\u529F\uFF1A",
                                    e.name,
                                    " (",
                                    m,
                                    " \u5B57\u8282)"
                                ]
                            }, o("h4", s)),
                            (p = {
                                style: "margin:0",
                                children: [
                                    "SHA-256: ",
                                    (l = {
                                        children: r
                                    }, o("code", l)),
                                    f.isStockHash ? " (\u4E0E\u539F\u5382\u5B98\u65B9\u51FA\u5382\u57FA\u7EBF\u5B8C\u5168\u543B\u5408)" : " (\u81EA\u5B9A\u4E49/\u81EA\u6807\u5B9A\u6821\u51C6\u8868)",
                                    (d = {}, o("br", d)),
                                    "\u5404\u9879\u53C2\u6570\u5DF2\u6210\u529F\u89E3\u6790\u5E76\u5728\u4E0B\u65B9\u9884\u89C8\uFF0C\u6838\u5BF9\u65E0\u8BEF\u540E\u70B9\u51FB\u4E0B\u65B9\u6309\u94AE\u4E0A\u4F20\u81F3",
                                    " ",
                                    (c = {
                                        children: "/lib/firmware/modified_UX3326.bin"
                                    }, o("code", c)),
                                    "\u3002"
                                ]
                            }, o("p", p))
                        ]
                    }, o("div", u))), b.appendChild(tv(f, `\u{5F85}\u{4E0A}\u{4F20}\u{6587}\u{4EF6}\u{53C2}\u{6570}\u{9884}\u{89C8}\u{FF1A}${e.name}`));
                } catch (e) {
                    v.appendChild((f = {
                        class: "alert-message danger",
                        children: o("p", {
                            style: "margin:0",
                            children: [
                                "\u8BFB\u53D6\u6587\u4EF6\u5F02\u5E38\uFF1A",
                                String(e)
                            ]
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
            }), x.addEventListener("click", async ()=>{
                if (h && g) {
                    var e, t, r, n, i, a;
                    x.disabled = !0, x.textContent = "\u6B63\u5728\u4E0A\u4F20\u81F3 /lib/firmware/modified_UX3326.bin...", v.innerHTML = "";
                    try {
                        let a = function(e) {
                            let t = "", r = new Uint8Array(e), n = r.byteLength;
                            for(let e = 0; e < n; e++)t += String.fromCharCode(r[e]);
                            return window.btoa(t);
                        }(h), s = z.checked, l = await tg(a);
                        if (!l.success) throw Error(l.error || "\u4FDD\u5B58\u6821\u51C6\u6587\u4EF6\u5931\u8D25");
                        let d = "";
                        if (s) {
                            x.textContent = "\u6B63\u5728\u914D\u7F6E BOSA \u5149\u6536\u53D1\u5668\u786C\u4EF6...";
                            let e = await tm();
                            d = e.success ? "\uFF0C\u4E14\u5149\u6536\u53D1\u5668\u786C\u4EF6\u91CD\u7F6E\u4E0E\u5BC4\u5B58\u5668\u8868\u5DF2\u6210\u529F\u9501\u5B58\u5199\u5165\uFF08bosa-init \u6210\u529F\uFF09" : `\u{FF0C}\u{4F46}\u{5149}\u{6536}\u{53D1}\u{5668}\u{786C}\u{4EF6}\u{521D}\u{59CB}\u{5316}\u{8B66}\u{544A}\u{FF1A}${e.error || "\u672A\u77E5\u5F02\u5E38"}`;
                        }
                        v.appendChild((i = {
                            class: "alert-message success",
                            children: [
                                (e = {
                                    style: "margin:0 0 6px",
                                    children: "\u6821\u51C6\u6570\u636E\u4FDD\u5B58\u6210\u529F\uFF01"
                                }, o("h4", e)),
                                (n = {
                                    style: "margin:0",
                                    children: [
                                        "\u6587\u4EF6\u5DF2\u5199\u5165\u81F3 ",
                                        (t = {
                                            children: l.path
                                        }, o("code", t)),
                                        "\uFF08",
                                        l.size,
                                        " \u5B57\u8282\uFF0CSHA-256:",
                                        " ",
                                        (r = {
                                            children: l.sha256
                                        }, o("code", r)),
                                        "\uFF09",
                                        d,
                                        "\u3002"
                                    ]
                                }, o("p", n))
                            ]
                        }, o("div", i)));
                        let c = await th();
                        w(c);
                    } catch (e) {
                        v.appendChild((a = {
                            class: "alert-message danger",
                            children: [
                                o("h4", {
                                    style: "margin:0 0 6px",
                                    children: "\u4E0A\u4F20\u5199\u5165\u5931\u8D25"
                                }),
                                o("p", {
                                    style: "margin:0",
                                    children: String(e)
                                })
                            ]
                        }, o("div", a)));
                    } finally{
                        x.disabled = !1, x.textContent = _("\u4E0A\u4F20\u5E76\u4FDD\u5B58\u81F3 /lib/firmware/modified_UX3326.bin") || "\u4E0A\u4F20\u5E76\u4FDD\u5B58\u81F3 /lib/firmware/modified_UX3326.bin";
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
                        children: "BOSA \u4E0B\u884C\u5149\u8DEF\u6821\u51C6\u7BA1\u7406 (UX3326)"
                    }),
                    (i = {
                        class: "cbi-section-descr",
                        style: "margin-bottom:16px",
                        children: [
                            "\u7BA1\u7406 HM2004-DU Micro-OLT FPGA \u5B50\u7CFB\u7EDF\u6302\u8F7D\u7684 Semtech UX3326 BOSA \u5149\u6536\u53D1\u5668\u6821\u51C6\u6570\u636E\u3002\u7CFB\u7EDF\u6309\u4F18\u5148\u7EA7\u4F9D\u6B21\u4ECE",
                            " ",
                            o("strong", {
                                children: "1MB Factory UBI \u5206\u533A (\u504F\u79FB 0x2200)"
                            }),
                            "\u3001",
                            o("strong", {
                                children: "/lib/firmware/modified_UX3326.bin"
                            }),
                            " ",
                            "\u8BFB\u53D6\u6821\u51C6\u6570\u636E\uFF1B\u82E5\u5747\u65E0\u6709\u6548\u6570\u636E\u5219\u81EA\u52A8\u56DE\u9000\u81F3\u5185\u7F6E\u9759\u6001\u9ED8\u8BA4\u7248\u672C\u3002"
                        ]
                    }, o("p", i)),
                    m,
                    y,
                    (p = {
                        class: "cbi-section",
                        children: [
                            o("h3", {
                                children: "\u4E0A\u4F20\u65B0\u7684 UX3326 \u6821\u51C6\u6587\u4EF6"
                            }),
                            (a = {
                                style: "font-size:90%;opacity:0.75;margin-top:0;margin-bottom:12px",
                                children: [
                                    "\u4E0A\u4F20\u65B0\u7684\u6821\u51C6\u8868\u5C06\u56FA\u5B9A\u4FDD\u5B58\u81F3\u56FA\u4EF6\u76EE\u5F55 ",
                                    o("code", {
                                        children: "/lib/firmware/modified_UX3326.bin"
                                    }),
                                    "\u3002\u6587\u4EF6\u5927\u5C0F\u5FC5\u987B\u4E25\u683C\u4E3A 288 \u5B57\u8282\u3002"
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
                                children: b
                            }),
                            (c = {
                                class: "fttr-card",
                                style: "margin-top:16px",
                                children: [
                                    o("h4", {
                                        style: "margin-top:0;margin-bottom:12px",
                                        children: "\u5199\u5165\u8BBE\u7F6E\u4E0E\u6267\u884C"
                                    }),
                                    (s = {
                                        class: "fttr-kv-row",
                                        style: "margin-bottom:12px",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                style: "min-width:160px",
                                                children: "\u76EE\u6807\u5B58\u50A8\u8DEF\u5F84"
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
                                                children: "\u786C\u4EF6\u7ACB\u5373\u751F\u6548"
                                            }),
                                            (l = {
                                                htmlFor: "fttr-cal-apply-hw",
                                                style: "display:flex;align-items:center;cursor:pointer",
                                                children: [
                                                    z,
                                                    o("span", {
                                                        children: "\u4FDD\u5B58\u540E\u7ACB\u5373\u5411 BOSA \u786C\u4EF6\u5199\u5165 56 \u5BC4\u5B58\u5668\u5E76\u6267\u884C\u9501\u5B58\u63D0\u4EA4 (bosa-init)"
                                                    })
                                                ]
                                            }, o("label", l))
                                        ]
                                    }, o("div", d)),
                                    o("div", {
                                        children: x
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