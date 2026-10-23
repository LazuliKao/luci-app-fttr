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
function s(e, t) {
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
    let s = {}, o = {
        ...n
    };
    for (let [e, t] of Object.entries(o))e.startsWith("on") && "function" == typeof t ? (s[e] = t, delete o[e]) : "boolean" == typeof t && (t ? o[e] = e : delete o[e]);
    let l = Object.keys(o).length > 0 ? i.length > 1 ? E(e, o, i) : E(e, o, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
    for (let [e, t] of Object.entries(s)){
        let r = e.slice(2).toLowerCase();
        l.addEventListener(r, t);
    }
    return l;
}
function o(e, t, r) {
    function n(r, n) {
        if (r._zod || Object.defineProperty(r, "_zod", {
            value: {
                def: n,
                constr: s,
                traits: new Set()
            },
            enumerable: !1
        }), r._zod.traits.has(e)) return;
        r._zod.traits.add(e), t(r, n);
        let i = s.prototype, a = Object.keys(i);
        for(let e = 0; e < a.length; e++){
            let t = a[e];
            t in r || (r[t] = i[t].bind(r));
        }
    }
    let i = r?.Parent ?? Object;
    class a extends i {
    }
    function s(e) {
        var t;
        let i = r?.Parent ? new a() : this;
        for (let r of (n(i, e), (t = i._zod).deferred ?? (t.deferred = []), i._zod.deferred))r();
        return i;
    }
    return Object.defineProperty(a, "name", {
        value: e
    }), Object.defineProperty(s, "init", {
        value: n
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
const g = Symbol("evaluating");
function h(e, t, r) {
    let n;
    Object.defineProperty(e, t, {
        get () {
            if (n !== g) return void 0 === n && (n = g, n = r()), n;
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
const y = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
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
function $(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let r = t; r < e.issues.length; r++)if (e.issues[r]?.continue !== !0) return !0;
    return !1;
}
function S(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function O(e) {
    return "string" == typeof e ? e : e?.message;
}
function M(e, t, r) {
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = O(e.inst?._zod.def?.error?.(e)) ?? O(t?.error?.(e)) ?? O(r.customError?.(e)) ?? O(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
}
const P = (e, t)=>{
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
}, C = o("$ZodError", P), N = o("$ZodError", P, {
    Parent: Error
}), A = (t = N, (e, r, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: r,
        issues: []
    }, a);
    if (s instanceof Promise) throw new l();
    if (s.issues.length) {
        let e = new (i?.Err ?? t)(s.issues.map((e)=>M(e, a, c())));
        throw y(e, i?.callee), e;
    }
    return s.value;
}), I = (r = N, async (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (i?.Err ?? r)(s.issues.map((e)=>M(e, a, c())));
        throw y(e, i?.callee), e;
    }
    return s.value;
}), T = (n = N, (e, t, r)=>{
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
        error: new (n ?? C)(a.issues.map((e)=>M(e, i, c())))
    } : {
        success: !0,
        data: a.value
    };
}), R = (i = N, async (e, t, r)=>{
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
        error: new i(a.issues.map((e)=>M(e, n, c())))
    } : {
        success: !0,
        data: a.value
    };
}), D = /^-?\d+(?:\.\d+)?$/, Z = /^(?:true|false)$/i, W = /^null$/i, B = {
    major: 4,
    minor: 3,
    patch: 6
}, V = o("$ZodType", (e, t)=>{
    var r;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = B;
    let n = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && n.unshift(e), n))for (let r of t._zod.onattach)r(e);
    if (0 === n.length) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, r)=>{
            let n, i = $(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, s = a._zod.check(e);
                if (s instanceof Promise && r?.async === !1) throw new l();
                if (n || s instanceof Promise) n = (n ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (i || (i = $(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = $(e, t));
                }
            }
            return n ? n.then(()=>e) : e;
        }, r = (r, i, a)=>{
            if ($(r)) return r.aborted = !0, r;
            let s = t(i, n, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new l();
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
                return t instanceof Promise ? t.then((e)=>r(e, i, a)) : r(t, i, a);
            }
            let s = e._zod.parse(i, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new l();
                return s.then((e)=>t(e, n, a));
            }
            return t(s, n, a);
        };
    }
    h(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = T(e, t);
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
}), q = o("$ZodString", (e, t)=>{
    var r;
    let n;
    V.init(e, t), e._zod.pattern = [
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
}), U = o("$ZodNumber", (e, t)=>{
    V.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? D, e._zod.parse = (r, n)=>{
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
}), F = o("$ZodBoolean", (e, t)=>{
    V.init(e, t), e._zod.pattern = Z, e._zod.parse = (r, n)=>{
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
}), J = o("$ZodNull", (e, t)=>{
    V.init(e, t), e._zod.pattern = W, e._zod.values = new Set([
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
}), K = o("$ZodNever", (e, t)=>{
    V.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function G(e, t, r) {
    e.issues.length && t.issues.push(...S(r, e.issues)), t.value[r] = e.value;
}
const H = o("$ZodArray", (e, t)=>{
    V.init(e, t), e._zod.parse = (r, n)=>{
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
            let s = i[e], o = t.element._zod.run({
                value: s,
                issues: []
            }, n);
            o instanceof Promise ? a.push(o.then((t)=>G(t, r, e))) : G(o, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function Q(e, t, r, n, i) {
    if (e.issues.length) {
        if (i && !(r in n)) return;
        t.issues.push(...S(r, e.issues));
    }
    void 0 === e.value ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
const X = o("$ZodObject", (e, t)=>{
    let r;
    V.init(e, t);
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
    h(e._zod, "propValues", ()=>{
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
            let r = l[e], i = "optional" === r._zod.optout, a = r._zod.run({
                value: s[e],
                issues: []
            }, n);
            a instanceof Promise ? o.push(a.then((r)=>Q(r, t, e, s, i))) : Q(a, t, e, s, i);
        }
        return a ? function(e, t, r, n, i, a) {
            let s = [], o = i.keySet, l = i.catchall._zod, d = l.def.type, c = "optional" === l.optout;
            for(let i in t){
                if (o.has(i)) continue;
                if ("never" === d) {
                    s.push(i);
                    continue;
                }
                let a = l.run({
                    value: t[i],
                    issues: []
                }, n);
                a instanceof Promise ? e.push(a.then((e)=>Q(e, r, i, t, c))) : Q(a, r, i, t, c);
            }
            return (s.length && r.issues.push({
                code: "unrecognized_keys",
                keys: s,
                input: t,
                inst: a
            }), e.length) ? Promise.all(e).then(()=>r) : r;
        }(o, s, t, n, i.value, e) : o.length ? Promise.all(o).then(()=>t) : t;
    };
});
function Y(e, t, r, n) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let i = e.filter((e)=>!$(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>M(e, n, c())))
    }), t);
}
const ee = o("$ZodUnion", (e, t)=>{
    V.init(e, t), h(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), h(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), h(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), h(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>f(e.source)).join("|")})$`);
        }
    });
    let r = 1 === t.options.length, n = t.options[0]._zod.run;
    e._zod.parse = (i, a)=>{
        if (r) return n(i, a);
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
        return s ? Promise.all(o).then((t)=>Y(t, i, e, a)) : Y(o, i, e, a);
    };
}), et = o("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, ee.init(e, t);
    let r = e._zod.parse;
    h(e._zod, "propValues", ()=>{
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
        let s = i.value;
        if (!v(s)) return i.issues.push({
            code: "invalid_type",
            expected: "object",
            input: s,
            inst: e
        }), i;
        let o = n.value.get(s?.[t.discriminator]);
        return o ? o._zod.run(i, a) : t.unionFallback ? r(i, a) : (i.issues.push({
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
}), er = o("$ZodRecord", (e, t)=>{
    V.init(e, t), e._zod.parse = (r, n)=>{
        let i = r.value;
        if (!w(i)) return r.issues.push({
            expected: "record",
            code: "invalid_type",
            input: i,
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
                    value: i[e],
                    issues: []
                }, n);
                s instanceof Promise ? a.push(s.then((t)=>{
                    t.issues.length && r.issues.push(...S(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...S(e, s.issues)), r.value[e] = s.value);
            }
            for(let e in i)l.has(e) || (o = o ?? []).push(e);
            o && o.length > 0 && r.issues.push({
                code: "unrecognized_keys",
                input: i,
                inst: e,
                keys: o
            });
        } else for (let s of (r.value = {}, Reflect.ownKeys(i))){
            if ("__proto__" === s) continue;
            let o = t.keyType._zod.run({
                value: s,
                issues: []
            }, n);
            if (o instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof s && D.test(s) && o.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(s),
                    issues: []
                }, n);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (o = e);
            }
            if (o.issues.length) {
                "loose" === t.mode ? r.value[s] = i[s] : r.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: o.issues.map((e)=>M(e, n, c())),
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
            }, n);
            l instanceof Promise ? a.push(l.then((e)=>{
                e.issues.length && r.issues.push(...S(s, e.issues)), r.value[o.value] = e.value;
            })) : (l.issues.length && r.issues.push(...S(s, l.issues)), r.value[o.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), en = o("$ZodEnum", (e, t)=>{
    var r;
    let n;
    V.init(e, t);
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
}), ei = o("$ZodLiteral", (e, t)=>{
    if (V.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
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
const es = o("$ZodOptional", (e, t)=>{
    V.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", h(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), h(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let n = t.innerType._zod.run(e, r);
            return n instanceof Promise ? n.then((t)=>ea(t, e.value)) : ea(n, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, r);
    };
}), eo = o("$ZodNullable", (e, t)=>{
    V.init(e, t), h(e._zod, "optin", ()=>t.innerType._zod.optin), h(e._zod, "optout", ()=>t.innerType._zod.optout), h(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)}|null)$`) : void 0;
    }), h(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), el = o("$ZodCatch", (e, t)=>{
    V.init(e, t), h(e._zod, "optin", ()=>t.innerType._zod.optin), h(e._zod, "optout", ()=>t.innerType._zod.optout), h(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let n = t.innerType._zod.run(e, r);
        return n instanceof Promise ? n.then((n)=>(e.value = n.value, n.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: n.issues.map((e)=>M(e, r, c()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = n.value, n.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: n.issues.map((e)=>M(e, r, c()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ed = o("$ZodLazy", (e, t)=>{
    V.init(e, t), h(e._zod, "innerType", ()=>t.getter()), h(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), h(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), h(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), h(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
const ec = o("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    V.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>A(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>T(e, t, r), e.parseAsync = async (t, r)=>I(e, t, r, {
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
        }), e.with = e.check, e.clone = (t, r)=>k(e, t, r), e.brand = ()=>e, e.register = (t, r)=>(t.add(e, r), e), e.apply = (t)=>t(e);
}), ep = o("ZodMiniString", (e, t)=>{
    q.init(e, t), ec.init(e, t);
});
function eu(e) {
    return new ep({
        type: "string",
        ...j(e)
    });
}
const ef = o("ZodMiniNumber", (e, t)=>{
    U.init(e, t), ec.init(e, t);
});
function eg(e) {
    return new ef({
        type: "number",
        checks: [],
        ...j(e)
    });
}
const eh = o("ZodMiniBoolean", (e, t)=>{
    F.init(e, t), ec.init(e, t);
});
function e_(e) {
    return new eh({
        type: "boolean",
        ...j(e)
    });
}
const eb = o("ZodMiniNull", (e, t)=>{
    J.init(e, t), ec.init(e, t);
}), em = o("ZodMiniNever", (e, t)=>{
    K.init(e, t), ec.init(e, t);
});
function ey(e) {
    return new em({
        type: "never",
        ...j(e)
    });
}
const ev = o("ZodMiniArray", (e, t)=>{
    H.init(e, t), ec.init(e, t);
});
function ew(e, t) {
    return new ev({
        type: "array",
        element: e,
        ...j(t)
    });
}
const ex = o("ZodMiniObject", (e, t)=>{
    X.init(e, t), ec.init(e, t), h(e, "shape", ()=>t.shape);
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
const e$ = o("ZodMiniDiscriminatedUnion", (e, t)=>{
    et.init(e, t), ec.init(e, t);
});
function eS(e, t, r) {
    return new e$({
        type: "union",
        options: t,
        discriminator: e,
        ...j(r)
    });
}
const eO = o("ZodMiniRecord", (e, t)=>{
    er.init(e, t), ec.init(e, t);
});
function eM(e, t, r) {
    return new eO({
        type: "record",
        keyType: e,
        valueType: t,
        ...j(r)
    });
}
const eP = o("ZodMiniEnum", (e, t)=>{
    en.init(e, t), ec.init(e, t), e.options = Object.values(t.entries);
});
function eC(e, t) {
    return new eP({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...j(t)
    });
}
const eE = o("ZodMiniLiteral", (e, t)=>{
    ei.init(e, t), ec.init(e, t);
});
function eN(e, t) {
    return new eE({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...j(t)
    });
}
const eA = o("ZodMiniOptional", (e, t)=>{
    es.init(e, t), ec.init(e, t);
});
function eI(e) {
    return new eA({
        type: "optional",
        innerType: e
    });
}
const eT = o("ZodMiniNullable", (e, t)=>{
    eo.init(e, t), ec.init(e, t);
});
function eL(e) {
    return new eT({
        type: "nullable",
        innerType: e
    });
}
const eR = o("ZodMiniCatch", (e, t)=>{
    el.init(e, t), ec.init(e, t);
}), eD = o("ZodMiniLazy", (e, t)=>{
    ed.init(e, t), ec.init(e, t);
});
function eZ() {
    let e = new eD({
        type: "lazy",
        getter: ()=>ej([
                eu(),
                eg(),
                e_(),
                new eb({
                    type: "null",
                    ...j(void 0)
                }),
                ew(e),
                eM(eu(), e)
            ])
    });
    return e;
}
let eW = ez({
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
function eV(e) {
    let t = eW.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eB("rpc", e) : new eB(e.code, e.message);
    }
    return e;
}
const eq = ez({
    status: eN("pending"),
    job: eu()
});
eS("status", [
    ez({
        status: eN("pending")
    }),
    ez({
        status: eN("ready"),
        chunk: eg(),
        chunks: eg(),
        bytes: eg(),
        data: eu()
    })
]);
let eU = eu(), eF = eg(), eJ = e_(), eK = eI(eU), eG = eI(eF), eH = eI(eJ);
const eQ = eC([
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
]), eX = eC([
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
    id: eU,
    name: eI(eL(eU)),
    kind: eC([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eU,
    state: eU,
    reason: eK,
    revision: eK,
    current_revision: eH,
    management_fresh: eH,
    operation_id: eG,
    task_id: eI(eL(eF)),
    updated_at: eG,
    changes: eI(ew(ez({
        name: eU,
        desired: eU
    })))
});
let e0 = ez({
    state: eU,
    reason: eK,
    task_id: eI(eL(eF)),
    instance: eG
});
const e1 = ez({
    cwmp_id: eU,
    state: eC([
        "online",
        "waiting_inform",
        "offline_or_stale"
    ]),
    optical_online: eJ,
    last_inform: eL(eF),
    age_seconds: eL(eF)
});
let e2 = ez({
    state: eC([
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
    mqtt_target: eL(eU),
    binding_source: eK,
    link_identity_error: eL(eU),
    mqtt_last_seen: eL(eF),
    cwmp_id: eK,
    desired_version: eK,
    generation: eG,
    inflight: eH,
    attempts: eG,
    next_retry_at: eG,
    updated_at: eG,
    settings_verified_at: eL(eF),
    last_inform: eL(eF),
    last_error: eI(eL(eU)),
    persistence_error: eI(eL(eU)),
    desired: eI(eL(ez({
        vlan: eF,
        vlans: ew(eF),
        priority: eF,
        acs_url: eU
    }))),
    listener: eI(ez({
        enabled: eJ,
        listen: eU,
        path: eU,
        error: eL(eU)
    })),
    endpoint_notice: eK,
    manual_steps: eI(ew(eU))
});
const e8 = eS("state", [
    e2,
    function(e, t) {
        if (!w(t)) throw Error("Invalid input to extend: expected a plain object");
        let r = e._zod.def.checks;
        if (r && r.length > 0) {
            let r = e._zod.def.shape;
            for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(r, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let n = m(e._zod.def, {
            get shape () {
                let r = {
                    ...e._zod.def.shape,
                    ...t
                };
                return b(this, "shape", r), r;
            }
        });
        return k(e, n);
    }(function(e) {
        var t = void 0;
        let r = e._zod.def.checks;
        if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let n = m(e._zod.def, {
            get shape () {
                let r = e._zod.def.shape, n = {
                    ...r
                };
                if (t) for(let e in t){
                    if (!(e in r)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (n[e] = eA ? new eA({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)n[e] = eA ? new eA({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return b(this, "shape", n), n;
            },
            checks: []
        });
        return k(e, n);
    }(e2), {
        state: eC([
            "pending",
            "unavailable"
        ]),
        reason: eU
    })
]), e5 = ez({
    state: eQ,
    operation_id: eG,
    device: eK,
    optical_sn: eK,
    cwmp_id: eK,
    revision: eK,
    mode: eI(eC([
        "apply",
        "plan"
    ])),
    started_at: eG,
    current_revision: eH,
    management_fresh: eH,
    reason: eK,
    error: eK,
    attempts: eG,
    next_retry_at: eG,
    reconcile_reason: eK,
    items: ew(eY),
    cwmp_contract: eI(ez({
        state: eU,
        requested: eU,
        contract: eL(eU),
        reason: eU,
        cache_hit: eJ,
        schema: eU,
        capabilities: eL(ez({
            wan: eU,
            wlan: eU,
            binding: eU
        }))
    })),
    wan_objects: eI(eM(eU, eZ())),
    wan_lifecycle: eI(eM(eU, e0)),
    wan_stage: eI(eC([
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
        owned: ew(eF),
        pending: eL(eU),
        pending_instance: eL(eF)
    })),
    wifi_lifecycle: eI(eM(eU, e0)),
    wifi_stage: eI(eC([
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
    wifi_cleanup: eI(eC([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e6 = ez({
    enabled: eJ,
    mode: eC([
        "auto",
        "manual"
    ]),
    vlan: ew(eF),
    priority: eF,
    address: eU,
    acs_url: eU,
    port: eF,
    path: eU,
    dhcp_enabled: eJ
}), e4 = ez({
    state: eC([
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
    error: eL(eU),
    inflight: eJ,
    ready: eJ,
    desired_version: eL(eU),
    applied_version: eL(eU),
    next_retry_at: eF,
    attempts: eF,
    desired: eL(e6),
    applied: eL(e6),
    previous: eL(e6),
    plan: ew(ez({
        operation: eU,
        key: eU,
        value: ew(eU)
    }))
});
const e3 = ez({
    device: eU,
    name: eL(eU),
    group: eL(eU),
    group_name: eL(eU),
    template: eL(eU),
    template_name: eL(eU),
    optical_sn: eU,
    adapter: eU,
    omci_management: ez({
        state: eU,
        reason: eK
    }),
    management: eL(e1),
    acs_bootstrap: e8,
    provisioning: e5,
    services: ew(eY),
    ssids: ew(eY),
    wifi_sync: eX
}), e7 = ez({
    enabled: eJ,
    mode: eC([
        "auto",
        "manual"
    ]),
    method: eN("diff"),
    revision: eU,
    triggers: ew(eU),
    interval_minutes: new ef({
        type: "number",
        coerce: !0,
        checks: [],
        ...j(void 0)
    }),
    error: eL(eU),
    devices: ew(e3),
    management_network: e4,
    omci_management: eZ(),
    groups: ew(ez({
        id: eU,
        name: eL(eU),
        template: eU
    })),
    pending_devices: ew(eU)
}), e9 = ej([
    ez({
        valid: eN(!0),
        revision: eU,
        devices: eF,
        error: eI(ey())
    }),
    ez({
        error: eU,
        valid: eI(ey()),
        revision: eI(ey()),
        devices: eI(ey())
    })
]);
let te = eu(), tt = eg(), tr = eL(tt), tn = eM(te, ez({
    source: te,
    unit: te,
    reason: eL(te),
    raw: eL(te),
    age_seconds: tr
}));
const ti = ez({
    phase: eC([
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
    error: eL(te)
}), ta = eC([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let ts = ez({
    model: te,
    wavelength_tx_nm: tt,
    wavelength_rx_nm: tt,
    phy_rate_downlink_gbps: tt,
    phy_rate_uplink_gbps: tt,
    tx_power_dbm: tr,
    laser_bias_current_ma: tr,
    temperature_celsius: tr,
    vcc_voltage: tr,
    cdr_locked: eL(e_()),
    tx_enabled: eL(e_()),
    measurements: tn
}), to = ez({
    equipment_id: eL(te),
    hardware_version: eL(te),
    software_images: ew(te),
    omcc_version: tr,
    errors: ew(te)
});
const tl = ez({
    onu_id: tt,
    vendor: te,
    model: te,
    serial_number: te,
    state: ta,
    business_status: ti,
    management: eL(e1),
    provisioning: eL(e5),
    services: ew(eY),
    ssids: ew(eY),
    wifi_sync: eX,
    acs_bootstrap: eI(e8),
    identity: eL(to),
    identity_age_seconds: tr,
    identity_current: e_(),
    fiber_distance_m: tr,
    ranging_delay_rtd_ns: tr,
    equalization_delay_bits: new eR({
        type: "catch",
        innerType: tr,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tr,
    optical_tx_power_dbm: tr,
    firmware_version: te,
    hardware_version: te,
    uptime_seconds: tr,
    data_path: ez({
        interface: te,
        gem_ports: eL(ew(tt)),
        vlan_id: tr,
        tx_bytes: tr,
        rx_bytes: tr,
        current_tx_kbps: tr,
        current_rx_kbps: tr,
        measurements: tn
    }),
    wifi_mesh: ez({
        channel_2g: tr,
        channel_5g: tr,
        bandwidth_5g: eL(te),
        tx_power_pct: tr,
        measurements: tn
    }),
    connected_clients: eL(ew(ez({
        mac: te,
        ip: te,
        band: te,
        rssi_dbm: tr,
        rx_rate_mbps: tr,
        tx_rate_mbps: tr
    }))),
    measurements: tn
});
let td = ez({
    port: tt,
    interface: te,
    carrier: e_(),
    status: te,
    onu_id: eI(tt),
    onu_sn: eI(te),
    link_state: te
});
const tc = ez({
    fpga_status: te,
    provisioning: eL(e7),
    optical_transceiver: ts,
    switch_ports: ew(td),
    sub_gateways: ew(tl),
    telemetry_gateways: ew(ez({
        id: te,
        last_seen_sec_ago: tt,
        last_payload_bytes: tt
    }))
});
eM(te, ez({
    carrier: eI(e_()),
    mac: eI(te),
    link: eI(ez({
        speed: eI(tt),
        duplex: eI(te),
        autoneg: eI(e_())
    })),
    stats: eI(eM(te, tt))
}));
const tp = {
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
};
let tu = L.rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: !0
}), tf = L.rpc.declare({
    object: "luci.fttr",
    method: "get_sync",
    reject: !0
}), tg = L.rpc.declare({
    object: "luci.fttr",
    method: "config_check",
    reject: !0
}), th = (L.rpc.declare({
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
}));
const t_ = async ()=>tc.parse(eV(await tu())), tb = async ()=>e7.parse(eV(await tf())), tm = async ()=>e9.parse(await tg());
ez({
    schema_version: eN(1),
    status: eC([
        "success",
        "error"
    ]),
    action: eC([
        "optical_on",
        "optical_off",
        "optical_status",
        "optical_reload",
        "optical_reinitialize",
        "optical_shutdown"
    ]),
    desired_enabled: eL(e_()),
    tx_enabled: eL(e_()),
    actor_state: eC([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: e_(),
    discovery_active: e_(),
    cleanup_pending: e_(),
    error: eL(ez({
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
});
let ty = ej([
    ez({
        operation_ids: ew(eg()),
        revision: eu()
    }),
    ez({
        started: eN(!0),
        mode: eC([
            "apply",
            "plan"
        ])
    }),
    ez({
        reset: eN(!0),
        device: eu()
    }),
    ez({
        operation_ids: ew(eg()),
        mode: eC([
            "apply",
            "plan"
        ]),
        reconcile: eI(e_()),
        retry: eI(e_())
    })
]);
const tv = async (e, t)=>ty.parse(eV(await th(e, t)));
L.rpc.declare({
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
    source: eC([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: eu(),
    size: eg(),
    sha256: eu(),
    data: eI(eu()),
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
        size: eg(),
        sha256: eu(),
        data: eu()
    }),
    error: eI(eu())
}), ez({
    success: e_(),
    path: eu(),
    size: eg(),
    sha256: eu(),
    error: eI(eu())
}), ez({
    success: e_(),
    output: eI(eu()),
    error: eI(eu())
});
let tw = eu(), tx = eg(), tz = e_(), tk = ez({
    id: tw,
    url: tw
}), tj = ez({
    name: tw,
    kind: eC([
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
    index: tx,
    mask: tx,
    size: tx,
    read: tz,
    write: tz,
    set_by_create: tz,
    avc: tz,
    optional: tz,
    deprecated: tz,
    default_hex: eL(tw),
    reference: tk
}), t$ = eS("type", [
    ez({
        type: eN("unsigned"),
        value: tx
    }),
    ez({
        type: eN("signed"),
        value: tx
    }),
    ez({
        type: eN("decimal"),
        value: tw
    }),
    ez({
        type: eN("text"),
        value: eL(tw)
    }),
    ez({
        type: eN("octets"),
        hex: tw
    }),
    ez({
        type: eN("table_length"),
        bytes: tx
    })
]), tS = ez({
    code: tw,
    message: tw,
    offset: tx,
    mask: tx
}), tO = eC([
    "layout",
    "name_only",
    "unknown"
]), tM = ez({
    raw_hex: tw,
    filter_outer_priority: tx,
    filter_outer_vid: tx,
    filter_outer_tpid_dei: tx,
    filter_inner_priority: tx,
    filter_inner_vid: tx,
    filter_inner_tpid_dei: tx,
    filter_ethertype: tx,
    tags_to_remove: tx,
    treatment_outer_priority: tx,
    treatment_outer_vid: tx,
    treatment_outer_tpid_dei: tx,
    treatment_inner_priority: tx,
    treatment_inner_vid: tx,
    treatment_inner_tpid_dei: tx,
    delete_entry: tz
}), tP = ez({
    schema_version: eN(1),
    reference_version: tw,
    onu_id: eL(tx),
    uploaded_complete: tz,
    expected_records: tx,
    received_records: tx,
    decoded_records: tx,
    partial_records: tx,
    basic_records: tx,
    tables_requested: tz,
    tables_collected: tz,
    classes: ew(ez({
        class_id: tx,
        name: eL(tw),
        entities: tx,
        records: tx,
        support: tO
    })),
    entities: ew(ez({
        class_id: tx,
        entity_id: tx,
        name: eL(tw),
        support: tO,
        reference: eL(tk),
        sequences: ew(tx),
        attributes: ew(ez({
            definition: tj,
            value: eL(t$),
            observations: ew(ez({
                raw_hex: tw,
                value: t$,
                sequences: ew(tx)
            }))
        })),
        diagnostics: ew(tS)
    })),
    records: ew(ez({
        class_id: tx,
        entity_id: tx,
        sequence: tx,
        attribute_mask: tx,
        raw_hex: tw,
        consumed: tx,
        remaining_hex: tw,
        undecoded_mask: tx
    })),
    tables: ew(ez({
        class_id: tx,
        entity_id: tx,
        attribute: tj,
        collected: tz,
        error: eL(tw),
        raw_hex: tw,
        rows: ew(tw),
        vlan_rules: ew(tM)
    })),
    diagnostics: ew(tS)
});
const tC = ez({
    status: eN("ready"),
    report: tP
});
let tE = ez({
    phase: eC([
        "starting",
        "upload",
        "tables"
    ]),
    received: tx,
    expected: eL(tx)
}), tN = eS("status", [
    ez({
        status: eN("pending"),
        progress: eI(tE)
    }),
    ez({
        status: eN("ready"),
        chunk: tx,
        chunks: tx,
        bytes: tx,
        data: tw
    })
]), tA = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_start",
    params: [
        "onu_id",
        "optical_sn",
        "tables"
    ],
    reject: !0
}), tI = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
}), tT = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_release",
    params: [
        "job"
    ],
    reject: !0
});
const tL = async (e, t, r)=>eq.parse(eV(await tA(e, t, r))), tR = async (e, t)=>tN.parse(eV(await tI(e, t))), tD = async (e)=>ez({
        released: tz
    }).parse(eV(await tT(e))), tZ = (e)=>null == e || "" === e ? "\u2014" : String(e);
function tW(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
    return null != e && Number.isFinite(e) ? `${e.toFixed(t)} dBm` : "\u2014";
}
function tB(e) {
    let t = "none" === e.tone ? "" : `fttr-badge fttr-badge-${e.tone}`, r = e.class ? ` ${e.class}` : "", n = s("span", {
        class: `${t}${r}`.trim(),
        children: e.children
    });
    return e.title && n.setAttribute("title", e.title), n;
}
const tV = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
};
function tq(e) {
    var t;
    let r = (t = e.state) ? "o5_operation" === t ? {
        tone: "success",
        label: tV.o5_operation,
        title: t
    } : {
        tone: "warning",
        label: tV[t] ?? tZ(t),
        title: t
    } : {
        tone: "none",
        label: "\u2014"
    };
    return s(tB, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
function tU(e) {
    var t;
    let r = (t = e.status) ? {
        tone: "verified" === t.phase ? "success" : t.error || "wan_bootstrap_pending" === t.phase ? "warning" : "neutral",
        label: `${tp[t.phase]} \xb7 ${t.generation}${t.error ? ` \xb7 ${t.error}` : ""}`,
        title: t.error || void 0
    } : {
        tone: "neutral",
        label: "\u2014"
    };
    return s(tB, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const tF = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
};
function tJ(e) {
    var t;
    let r, n, i, a, o, l, d = (t = e.management, r = t?.state, n = function(e) {
        if (null == e || !Number.isFinite(e) || e < 0) return null;
        let t = Math.floor(e);
        if (t < 60) return (1 === t ? _("%d second ago") : _("%d seconds ago")).replace("%d", String(t));
        let r = Math.floor(t / 60);
        if (r < 60) return (1 === r ? _("%d minute ago") : _("%d minutes ago")).replace("%d", String(r));
        let n = Math.floor(t / 3600);
        if (n < 24) return (1 === n ? _("%d hour ago") : _("%d hours ago")).replace("%d", String(n));
        let i = Math.floor(t / 86400);
        return (1 === i ? _("%d day ago") : _("%d days ago")).replace("%d", String(i));
    }(t?.age_seconds ?? (t?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - t.last_inform) : null)), a = (i = t?.last_inform ? new Date(1000 * t.last_inform).toLocaleString() : null) ? _("Last Inform: %s").replace("%s", i) : void 0, o = "\u2014", l = "none", "online" === r ? (l = "success", o = tF.online) : "waiting_inform" === r ? (l = "warning", o = tF.waiting_inform) : "offline_or_stale" === r ? (l = "danger", o = tF.offline_or_stale) : r && (l = "neutral", o = tZ(r)), {
        tone: l,
        label: n && r ? `${o} \xb7 ${n}` : o,
        title: a
    });
    return s(tB, {
        tone: d.tone,
        title: d.title,
        children: d.label
    });
}
const tK = {
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
function tG(e) {
    var t, r;
    let n, i, a, o = (t = e.provisioning, r = e.title, n = t?.state, i = t?.next_retry_at && t.next_retry_at > Math.floor(Date.now() / 1000) ? t.next_retry_at - Math.floor(Date.now() / 1000) : 0, a = r ?? (t?.current_revision === !1 ? _("Previous configuration") : t?.management_fresh === !1 ? _("Management stale") : t?.reconcile_reason ? t.reconcile_reason : i > 0 ? _("Next self-healing retry in %d seconds").replace("%d", String(i)) : t?.reason ?? t?.error), n && "not_started" !== n ? "completed" === n || "verified" === n ? {
        tone: "success",
        label: "completed" === n ? tK.completed : _("Ready"),
        title: a
    } : "wan_reconciling" === n || "wan_verifying" === n || "wifi_reconciling" === n || "discovering" === n || "reading" === n || "disabling" === n || "disabling_read" === n || "writing" === n || "verifying" === n || "settling" === n || "recovering" === n || "waiting_task" === n ? {
        tone: "info",
        label: tK[n] ?? tZ(n),
        title: a
    } : "interrupted" === n || "failed" === n || "error" === n || "blocked" === n ? {
        tone: "danger",
        label: "blocked" === n ? tK.blocked : tK.interrupted,
        title: a
    } : "waiting" === n || "pending" === n || "waiting_management" === n || "reset_pending" === n ? {
        tone: "warning",
        label: tK[n] ?? tK.waiting,
        title: a
    } : {
        tone: "neutral",
        label: tZ(n),
        title: a
    } : {
        tone: "neutral",
        label: tK.not_started,
        title: a
    });
    return s(tB, {
        tone: o.tone,
        title: o.title,
        children: o.label
    });
}
const tH = {
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
function tQ(e) {
    var t;
    let r = (t = e.state) && "not_configured" !== t ? "verified" === t ? {
        tone: "success",
        label: tH.verified
    } : "attention_required" === t ? {
        tone: "danger",
        label: tH.attention_required
    } : "stale_revision" === t || "stale_management" === t || "waiting_management" === t ? {
        tone: "warning",
        label: tH[t]
    } : "recovering" === t ? {
        tone: "info",
        label: tH.recovering
    } : "accepted_unverified" === t || "pending" === t ? {
        tone: "warning",
        label: tH[t]
    } : {
        tone: "neutral",
        label: tZ(t)
    } : {
        tone: "neutral",
        label: tH.not_configured
    };
    return s(tB, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const tX = `
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
let tY = (e)=>JSON.stringify(e, null, 2);
async function t0(e) {
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
function t1(e) {
    let t = e.reference;
    return t?.url.startsWith("https://github.com/opencord/omci-lib-go/blob/v2.2.4/") ? s("a", {
        href: t.url,
        target: "_blank",
        rel: "noopener noreferrer",
        children: t.id
    }) : s("span", {
        children: "\u2014"
    });
}
let t2 = ez({
    schema_version: eN(1),
    version: eu(),
    features: ez({
        acs: e_(),
        mqtt: e_(),
        "device-hl202": e_(),
        "device-hwtc": e_()
    }),
    functions: ez({
        optical: e_(),
        omci_mib: e_(),
        mqtt_telemetry: e_(),
        hl202_management: e_(),
        cwmp: e_()
    }),
    pages: ez({
        status: e_(),
        config: e_(),
        sync: e_(),
        hl202: e_(),
        hardware: e_(),
        calibration: e_(),
        about: e_()
    })
}), t8 = L.rpc.declare({
    object: "luci.fttr",
    method: "get_capabilities",
    reject: !0
});
const t5 = async ()=>t2.parse(eV(await t8()));
async function t6(e) {
    if (!(await t5()).pages[e]) throw Error(_("This page is not supported by the installed FTTR build."));
}
let t4 = {
    ready: {
        label: _("Ready"),
        type: "success"
    },
    verified: {
        label: _("Verified"),
        type: "success"
    },
    online: {
        label: _("Online"),
        type: "success"
    },
    completed: {
        label: _("Completed"),
        type: "success"
    },
    applied: {
        label: _("Applied"),
        type: "success"
    },
    waiting_inform: {
        label: _("Waiting Inform"),
        type: "warning"
    },
    pending: {
        label: _("Pending"),
        type: "warning"
    },
    awaiting_apply: {
        label: _("Awaiting Apply"),
        type: "warning"
    },
    syncing: {
        label: _("Syncing"),
        type: "info"
    },
    discovering: {
        label: _("Discovering"),
        type: "info"
    },
    recovering: {
        label: _("Recovering"),
        type: "info"
    },
    waiting_management: {
        label: _("Waiting Management"),
        type: "warning"
    },
    waiting_task: {
        label: _("Waiting Task"),
        type: "info"
    },
    reconcile_required: {
        label: _("Reconcile Required"),
        type: "warning"
    },
    not_started: {
        label: _("Not Started"),
        type: "neutral"
    },
    disabled: {
        label: _("Disabled"),
        type: "neutral"
    },
    enabled: {
        label: _("Enabled"),
        type: "success"
    },
    interrupted: {
        label: _("Interrupted"),
        type: "danger"
    },
    failed: {
        label: _("Failed"),
        type: "danger"
    },
    stale: {
        label: _("Stale"),
        type: "warning"
    },
    error: {
        label: _("Error"),
        type: "danger"
    },
    deleted: {
        label: _("Deleted"),
        type: "neutral"
    }
}, t3 = (e)=>null == e || "" === e ? "\u2014" : String(e), t7 = (e)=>e ? new Date(1000 * e).toLocaleString() : "\u2014";
function t9(e, t) {
    if (!e) return s("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: "\u2014"
    });
    let r = t4[e], n = r?.label || t3(e), i = r?.type || "neutral";
    return s("span", {
        class: `fttr-badge fttr-badge-${i}`,
        title: t || e,
        children: n
    });
}
function re(e) {
    var t, r, n, i, a, o;
    return o = {
        class: "table-wrapper",
        children: (a = {
            class: "table",
            children: [
                (r = {
                    children: (t = {
                        children: [
                            s("th", {
                                children: _("Configuration item")
                            }),
                            s("th", {
                                children: _("Type")
                            }),
                            s("th", {
                                children: _("State")
                            }),
                            s("th", {
                                children: _("Evidence freshness")
                            }),
                            s("th", {
                                children: _("Last update / task")
                            }),
                            s("th", {
                                children: _("Reason / desired changes")
                            })
                        ]
                    }, s("tr", t))
                }, s("thead", r)),
                (i = {
                    children: e.length ? e.map((e)=>{
                        var t, r, n, i, a, o, l, d, c, p;
                        return p = {
                            children: [
                                (n = {
                                    children: s("strong", {
                                        children: t3(e.name || e.id)
                                    })
                                }, s("td", n)),
                                (i = {
                                    children: s("span", {
                                        class: "fttr-badge fttr-badge-info",
                                        style: "font-size:80%",
                                        children: function(e, t) {
                                            switch(e){
                                                case "wifi":
                                                    return "Wi-Fi";
                                                case "wan":
                                                    return "WAN";
                                                case "internet":
                                                    return "Internet";
                                                case "iptv":
                                                    return "IPTV";
                                                case "tr069":
                                                    return "TR-069";
                                                default:
                                                    return "port_binding" === t ? _("Binding") : t3(e || t);
                                            }
                                        }(e.service_type ?? "", e.kind)
                                    })
                                }, s("td", i)),
                                s("td", {
                                    children: t9(e.state)
                                }),
                                (o = {
                                    children: (t = e.current_revision, r = e.management_fresh, a = {
                                        style: "display:flex;flex-direction:column;gap:3px;align-items:flex-start",
                                        children: [
                                            !0 === t ? s("span", {
                                                class: "fttr-badge fttr-badge-info",
                                                style: "font-size:78%",
                                                children: _("Current configuration")
                                            }) : !1 === t ? s("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                style: "font-size:78%",
                                                children: _("Previous configuration")
                                            }) : s("span", {
                                                children: "\u2014"
                                            }),
                                            !0 === r ? s("span", {
                                                class: "fttr-badge fttr-badge-success",
                                                style: "font-size:78%",
                                                children: _("Management fresh")
                                            }) : !1 === r ? s("span", {
                                                class: "fttr-badge fttr-badge-warning",
                                                style: "font-size:78%",
                                                children: _("Management stale")
                                            }) : null
                                        ]
                                    }, s("div", a))
                                }, s("td", o)),
                                (l = {
                                    children: [
                                        s("div", {
                                            children: t7(e.updated_at)
                                        }),
                                        void 0 !== e.task_id && null !== e.task_id ? s("span", {
                                            class: "fttr-badge fttr-badge-neutral",
                                            style: "font-size:75%;margin-top:2px",
                                            children: [
                                                _("Task"),
                                                " #",
                                                e.task_id
                                            ]
                                        }) : null
                                    ]
                                }, s("td", l)),
                                (c = {
                                    children: [
                                        e.reason ? s("div", {
                                            style: "margin-bottom:3px;color:#555;overflow-wrap:anywhere",
                                            children: e.reason
                                        }) : null,
                                        (e.changes ?? []).length ? (d = {
                                            style: "font-size:85%",
                                            children: (e.changes ?? []).map((e)=>{
                                                var t;
                                                return t = {
                                                    style: "overflow-wrap:anywhere;margin-top:2px",
                                                    children: [
                                                        s("code", {
                                                            children: e.name
                                                        }),
                                                        " = ",
                                                        s("code", {
                                                            children: e.desired
                                                        })
                                                    ]
                                                }, s("div", t);
                                            })
                                        }, s("div", d)) : !e.reason && "\u2014"
                                    ]
                                }, s("td", c))
                            ]
                        }, s("tr", p);
                    }) : (n = {
                        children: s("td", {
                            colSpan: 6,
                            style: "text-align:center;color:#888;padding:1em",
                            children: _("No desired items configured.")
                        })
                    }, s("tr", n))
                }, s("tbody", i))
            ]
        }, s("table", a))
    }, s("div", o);
}
let main = L.view.extend({
    load: async ()=>(await t6("sync"), Promise.all([
            tb(),
            tm()
        ])),
    render (e) {
        var t, r, n, i, o, l;
        let [d, c] = e, p = s("div", {}), u = s("p", {
            class: "alert-message warning",
            hidden: !0,
            "aria-live": "polite"
        }), f = s("div", {
            class: "fttr-sync-result",
            "aria-live": "polite",
            style: "margin:10px 0"
        }), g = (t = {
            class: "cbi-input-select",
            children: [
                s("option", {
                    value: "all",
                    children: _("All devices")
                }),
                (d.devices ?? []).map((e)=>s("option", {
                        value: e.device,
                        children: e.name || e.device
                    }))
            ]
        }, s("select", t)), h = s("div", {}), b = s("div", {}), m = d, y = c, v = !1, w = !1, x = [], z = async (e)=>{
            if (!v) {
                v = !0, R(m);
                try {
                    var t;
                    await tv("reset_state", e.device), f.replaceChildren((t = {
                        class: "alert-message info",
                        children: _("Synchronization state reset for %s. Preview differences to read the current device state.").replace("%s", e.name || e.optical_sn)
                    }, s("div", t))), R(await tb());
                } catch (e) {
                    f.replaceChildren(s("div", {
                        class: "alert-message danger",
                        children: String(e)
                    }));
                } finally{
                    v = !1, R(m);
                }
            }
        }, k = async (e)=>{
            if (!v) {
                v = !0, R(m);
                try {
                    var t;
                    let r = await tv("apply", e.device), n = "operation_ids" in r ? r.operation_ids.join(", ") : "\u2014";
                    f.replaceChildren((t = {
                        class: "alert-message info",
                        children: _("Configuration delivery started for %s. Operation IDs: %s").replace("%s", e.name || e.optical_sn).replace("%s", n || "\u2014")
                    }, s("div", t))), R(await tb());
                } catch (e) {
                    f.replaceChildren(s("div", {
                        class: "alert-message danger",
                        children: String(e)
                    }));
                } finally{
                    v = !1, R(m);
                }
            }
        }, j = async (e)=>{
            try {
                let t = (await t_()).sub_gateways.find((t)=>t.serial_number === e.optical_sn);
                if (!t) throw Error(_("Device is offline or no longer registered; refresh status and retry."));
                !function(e) {
                    var t, r, n, i, a, o, l, d, c, p, u;
                    let f = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "basic", g = !1, h = !1, b = null, m = null, y = (t = {
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
                                        s("code", {
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
                                        e.identity?.omcc_version == null ? null : s("code", {
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
                                        s(tq, {
                                            state: e.state
                                        })
                                    ],
                                    [
                                        _("Business"),
                                        s(tU, {
                                            status: e.business_status
                                        })
                                    ],
                                    [
                                        _("Receive optical power"),
                                        tW(e.optical_rx_power_dbm)
                                    ],
                                    [
                                        _("Transmit optical power"),
                                        tW(e.optical_tx_power_dbm)
                                    ],
                                    [
                                        _("Equalization delay (EQD)"),
                                        null == e.equalization_delay_bits ? "\u2014" : s("code", {
                                            style: "font-size:90%",
                                            children: [
                                                e.equalization_delay_bits,
                                                " bits"
                                            ]
                                        })
                                    ],
                                    [
                                        _("Data interface"),
                                        e.data_path?.interface ? s("code", {
                                            style: "font-size:90%",
                                            children: e.data_path.interface
                                        }) : null
                                    ],
                                    [
                                        _("Uptime"),
                                        null == e.uptime_seconds ? null : `${function(e) {
                                            if (null == e || !Number.isFinite(e) || e < 0) return "\u2014";
                                            let t = Math.floor(e), r = Math.floor(t / 86400), n = Math.floor(t % 86400 / 3600), i = Math.floor(t % 3600 / 60), a = [];
                                            return r > 0 && a.push(`${r}d`), (n > 0 || r > 0) && a.push(`${n}h`), (i > 0 || n > 0 || r > 0) && a.push(`${i}m`), a.push(`${t % 60}s`), a.join(" ");
                                        }(e.uptime_seconds)} (${Math.floor(e.uptime_seconds)} s)`
                                    ]
                                ]
                            },
                            {
                                title: _("Management & cache"),
                                rows: [
                                    [
                                        _("CWMP"),
                                        s(tJ, {
                                            management: e.management
                                        })
                                    ],
                                    [
                                        _("Last Inform"),
                                        e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
                                    ],
                                    [
                                        _("Provisioning"),
                                        s(tG, {
                                            provisioning: e.provisioning
                                        })
                                    ],
                                    [
                                        _("Wi-Fi sync"),
                                        s(tQ, {
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
                            var t, r, n;
                            return n = {
                                class: "cbi-section onu-basic-section",
                                children: [
                                    s("h3", {
                                        class: "onu-basic-title",
                                        children: e.title
                                    }),
                                    (r = {
                                        class: "table onu-basic-table",
                                        children: (t = {
                                            children: e.rows.map((e)=>{
                                                var t;
                                                let [r, n] = e;
                                                return t = {
                                                    children: [
                                                        s("th", {
                                                            style: "width:35%",
                                                            children: r
                                                        }),
                                                        s("td", {
                                                            children: n instanceof Node ? n : tZ(n)
                                                        })
                                                    ]
                                                }, s("tr", t);
                                            })
                                        }, s("tbody", t))
                                    }, s("table", r))
                                ]
                            }, s("div", n);
                        })
                    }, s("div", t)), v = (r = {
                        class: "mib-status-bar",
                        role: "status",
                        children: s("span", {
                            class: "mib-hint-text",
                            children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                        })
                    }, s("div", r)), w = (n = {
                        class: "cbi-progressbar",
                        style: "display:none;width:100%",
                        title: "0%",
                        children: s("div", {
                            style: "width:0%"
                        })
                    }, s("div", n)), x = s("div", {}), z = s("pre", {
                        class: "onu-raw-pre"
                    }), k = s("span", {
                        class: "download-status",
                        role: "status"
                    }), j = null, $ = s("button", {
                        type: "button",
                        class: "cbi-button cbi-button-action",
                        disabled: !0,
                        onclick: async ()=>{
                            if (b && !g) {
                                $.disabled = !0, k.textContent = _("Preparing JSON download\u2026");
                                try {
                                    let t = await t0(b);
                                    if (g) return;
                                    j && URL.revokeObjectURL(j), j = URL.createObjectURL(t);
                                    let r = document.createElement("a");
                                    r.href = j, r.download = `mib-${e.serial_number}.json`, r.click(), k.textContent = _("JSON download started"), window.setTimeout(()=>{
                                        URL.revokeObjectURL(r.href), j === r.href && (j = null);
                                    }, 1000);
                                } catch (e) {
                                    k.textContent = String(e);
                                } finally{
                                    $.disabled = !b || g;
                                }
                            }
                        },
                        children: _("Download JSON")
                    }), S = (a = {
                        class: "onu-raw-panel",
                        children: [
                            (i = {
                                class: "onu-raw-toolbar",
                                children: [
                                    s("span", {
                                        class: "onu-raw-hint",
                                        children: _("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")
                                    }),
                                    s("div", {
                                        class: "onu-raw-actions",
                                        children: [
                                            $,
                                            k
                                        ]
                                    })
                                ]
                            }, s("div", i)),
                            z
                        ]
                    }, s("div", a)), O = s("button", {
                        type: "button",
                        class: "cbi-button cbi-button-apply",
                        onclick: ()=>Z(!1),
                        children: _("Read MIB")
                    }), M = s("button", {
                        type: "button",
                        class: "cbi-button cbi-button-action",
                        onclick: ()=>Z(!0),
                        children: _("Read MIB and VLAN tables")
                    }), P = (d = {
                        class: "onu-mib-panel",
                        children: [
                            (l = {
                                class: "mib-controls",
                                children: [
                                    (o = {
                                        class: "mib-action-group",
                                        children: [
                                            O,
                                            M,
                                            s("small", {
                                                class: "mib-action-hint",
                                                children: _("Collecting VLAN tables queries extended filter tables and takes longer.")
                                            })
                                        ]
                                    }, s("div", o)),
                                    v,
                                    w
                                ]
                            }, s("div", l)),
                            x
                        ]
                    }, s("div", d)), C = {
                        basic: y,
                        mib: P,
                        raw: S
                    }, N = new Map();
                    function A(e) {
                        for (let [t, r] of Object.entries(C))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                        for (let [t, r] of N)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
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
                                children: s("a", {
                                    href: `#tab-${e.id}`,
                                    onclick: (t)=>{
                                        t.preventDefault(), A(e.id);
                                    },
                                    children: e.label
                                })
                            }, s("li", t));
                            return N.set(e.id, r), r;
                        })
                    }, s("ul", c)), T = s("div", {
                        class: "onu-details-header",
                        children: I
                    }), R = (u = {
                        class: "onu-details-dialog",
                        children: [
                            s("style", {
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
				${tX}
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
                            T,
                            y,
                            P,
                            S,
                            (p = {
                                class: "right onu-details-footer",
                                children: s("button", {
                                    type: "button",
                                    class: "cbi-button",
                                    onclick: ()=>{
                                        g = !0, j && URL.revokeObjectURL(j), j = null, b = null, z.textContent = "", x.replaceChildren(), L.ui.hideModal();
                                    },
                                    children: _("Close")
                                })
                            }, s("div", p))
                        ]
                    }, s("div", u)), D = ()=>!g && R.isConnected && R.getClientRects().length > 0;
                    async function Z(t) {
                        if (!h) {
                            h = !0, O.disabled = M.disabled = !0, w.style.display = "", w.title = "0%", w.firstElementChild.style.width = "0%", v.textContent = _("Reading MIB\u2026");
                            try {
                                let h = await t_(), j = h.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                if (j?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                if (!D()) return;
                                let S = await tL(j.onu_id, j.serial_number, t);
                                m = S.job;
                                let O = Date.now() + 140000;
                                for(; D();){
                                    let e = await tR(S.job, 0);
                                    if (!D()) return;
                                    if ("ready" === e.status) {
                                        var r, n, i, a, o, l, d, c, p, u, f, g, y, k;
                                        if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                        let t = new Uint8Array(e.bytes), h = 0;
                                        for(let r = 0; r < e.chunks; r++){
                                            let n = 0 === r ? e : await tR(S.job, r);
                                            if (!D()) return;
                                            if ("ready" !== n.status || n.chunk !== r || n.chunks !== e.chunks || n.bytes !== e.bytes || !n.data) throw Error(_("Invalid MIB snapshot chunk"));
                                            let i = atob(n.data);
                                            if (i.length > 32768 || h + i.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                            for(let e = 0; e < i.length; e++)t[h++] = i.charCodeAt(e);
                                            let a = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                            w.title = `${a}%`, w.firstElementChild.style.width = `${a}%`, v.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                        }
                                        if (h !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                        if (await W(), b = tC.parse(eV(JSON.parse(new TextDecoder("utf-8", {
                                            fatal: !0
                                        }).decode(t)))).report, 1 !== b.schema_version || b.onu_id !== j.onu_id) throw Error(_("Unexpected MIB response"));
                                        w.style.display = "none", v.replaceChildren((r = b, f = {
                                            class: "mib-chips",
                                            children: [
                                                (i = {
                                                    class: "mib-chip mib-chip-primary",
                                                    children: [
                                                        "ONU ",
                                                        r.onu_id
                                                    ]
                                                }, s("span", i)),
                                                (a = {
                                                    class: `mib-chip ${r.uploaded_complete ? "mib-chip-success" : "mib-chip-warning"}`,
                                                    children: r.uploaded_complete ? _("Upload complete") : _("Upload incomplete")
                                                }, s("span", a)),
                                                (o = {
                                                    class: "mib-chip mib-chip-info",
                                                    children: [
                                                        _("Records"),
                                                        ": ",
                                                        r.received_records,
                                                        r.expected_records !== r.received_records ? ` / ${r.expected_records}` : ""
                                                    ]
                                                }, s("span", o)),
                                                (l = {
                                                    class: "mib-chip",
                                                    children: [
                                                        _("Decoded"),
                                                        ": ",
                                                        r.decoded_records
                                                    ]
                                                }, s("span", l)),
                                                r.partial_records > 0 ? (d = {
                                                    class: "mib-chip mib-chip-warning",
                                                    children: [
                                                        _("Partial"),
                                                        ": ",
                                                        r.partial_records
                                                    ]
                                                }, s("span", d)) : null,
                                                (c = {
                                                    class: "mib-chip mib-chip-neutral",
                                                    children: [
                                                        _("Basic"),
                                                        ": ",
                                                        r.basic_records
                                                    ]
                                                }, s("span", c)),
                                                (p = {
                                                    class: "mib-chip",
                                                    children: r.tables_collected ? _("VLAN tables collected") : _("VLAN tables not collected")
                                                }, s("span", p)),
                                                (u = {
                                                    class: "mib-chip mib-chip-subtle",
                                                    children: new Date().toLocaleTimeString()
                                                }, s("span", u))
                                            ]
                                        }, s("div", f))), x.replaceChildren(function(e) {
                                            var t, r, n, i, a, o;
                                            let l = e.classes.length ? e.classes[0].class_id : null, d = (t = {
                                                class: "mib-content"
                                            }, s("div", t)), c = (r = {
                                                type: "search",
                                                class: "cbi-input-text mib-search-input",
                                                placeholder: _("Search ME name or Class ID\u2026")
                                            }, s("input", r)), p = (n = {
                                                class: "mib-class-list"
                                            }, s("div", n)), u = new Map();
                                            function f(t) {
                                                var r, n;
                                                for (let [e, r] of (l = t, u))e === t ? r.classList.add("active") : r.classList.remove("active");
                                                let i = e.entities.filter((e)=>e.class_id === t);
                                                i.length ? d.replaceChildren(...i.map((r, n)=>{
                                                    var i, a, o, l, d, c, p, u, f, g, h, b, m, y, v, w, x, z, k;
                                                    return k = {
                                                        open: 0 === n,
                                                        class: "mib-entity-details",
                                                        children: [
                                                            (d = {
                                                                class: "mib-entity-summary",
                                                                children: [
                                                                    (o = {
                                                                        class: "mib-entity-title",
                                                                        children: [
                                                                            (i = {
                                                                                children: tZ(r.name)
                                                                            }, s("strong", i)),
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
                                                                            }, s("span", a))
                                                                        ]
                                                                    }, s("span", o)),
                                                                    (l = {
                                                                        class: "mib-entity-support",
                                                                        children: r.support
                                                                    }, s("span", l))
                                                                ]
                                                            }, s("summary", d)),
                                                            (z = {
                                                                class: "mib-entity-body",
                                                                children: [
                                                                    r.attributes.length ? (m = {
                                                                        class: "table mib-attributes-table",
                                                                        children: [
                                                                            (h = {
                                                                                children: (g = {
                                                                                    children: [
                                                                                        (c = {
                                                                                            style: "width:28%",
                                                                                            children: _("Attribute")
                                                                                        }, s("th", c)),
                                                                                        (p = {
                                                                                            style: "width:14%",
                                                                                            children: _("Type")
                                                                                        }, s("th", p)),
                                                                                        (u = {
                                                                                            children: _("Value")
                                                                                        }, s("th", u)),
                                                                                        (f = {
                                                                                            style: "width:18%",
                                                                                            children: _("Definition")
                                                                                        }, s("th", f))
                                                                                    ]
                                                                                }, s("tr", g))
                                                                            }, s("thead", h)),
                                                                            (b = {
                                                                                children: r.attributes.map((e)=>{
                                                                                    var t, r, n, i, a, o, l, d, c, p;
                                                                                    return p = {
                                                                                        children: [
                                                                                            (t = {
                                                                                                class: "mib-attr-name",
                                                                                                children: e.definition.name
                                                                                            }, s("td", t)),
                                                                                            (n = {
                                                                                                class: "mib-attr-kind",
                                                                                                children: (r = {
                                                                                                    children: e.definition.kind
                                                                                                }, s("code", r))
                                                                                            }, s("td", n)),
                                                                                            (d = {
                                                                                                class: "mib-attr-value",
                                                                                                children: [
                                                                                                    (i = {
                                                                                                        class: "mib-val-display",
                                                                                                        children: function(e) {
                                                                                                            if (null === e) return _("Conflicting values; inspect observations");
                                                                                                            switch(e.type){
                                                                                                                case "unsigned":
                                                                                                                case "signed":
                                                                                                                case "decimal":
                                                                                                                case "text":
                                                                                                                    return tZ(e.value);
                                                                                                                case "octets":
                                                                                                                    return tZ(e.hex);
                                                                                                                case "table_length":
                                                                                                                    return tZ(e.bytes);
                                                                                                                default:
                                                                                                                    throw new eB("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                            }
                                                                                                        }(e.value)
                                                                                                    }, s("span", i)),
                                                                                                    e.observations?.length ? (l = {
                                                                                                        class: "mib-obs-details",
                                                                                                        children: [
                                                                                                            (a = {
                                                                                                                children: _("Raw data / observations")
                                                                                                            }, s("summary", a)),
                                                                                                            (o = {
                                                                                                                class: "mib-pre",
                                                                                                                children: tY(e.observations)
                                                                                                            }, s("pre", o))
                                                                                                        ]
                                                                                                    }, s("details", l)) : null
                                                                                                ]
                                                                                            }, s("td", d)),
                                                                                            (c = {
                                                                                                class: "mib-attr-ref",
                                                                                                children: t1(e.definition)
                                                                                            }, s("td", c))
                                                                                        ]
                                                                                    }, s("tr", p);
                                                                                })
                                                                            }, s("tbody", b))
                                                                        ]
                                                                    }, s("table", m)) : (y = {
                                                                        children: _("Basic display only; raw records are preserved.")
                                                                    }, s("p", y)),
                                                                    e.tables.filter((e)=>e.class_id === t && e.entity_id === r.entity_id).map((e)=>{
                                                                        var t, r, n, i, a, o, l, d, c, p, u, f, g, h, b, m;
                                                                        return m = {
                                                                            class: "mib-table-details",
                                                                            children: [
                                                                                (t = {
                                                                                    children: [
                                                                                        e.attribute.name,
                                                                                        " \xb7",
                                                                                        " ",
                                                                                        e.collected ? `${e.rows.length} ${_("rows")}` : tZ(e.error)
                                                                                    ]
                                                                                }, s("summary", t)),
                                                                                e.vlan_rules.length ? (g = {
                                                                                    class: "mib-table-overflow",
                                                                                    children: (f = {
                                                                                        class: "table",
                                                                                        children: [
                                                                                            (p = {
                                                                                                children: (c = {
                                                                                                    children: [
                                                                                                        (r = {
                                                                                                            children: _("Outer filter (priority / VID / TPID-DEI)")
                                                                                                        }, s("th", r)),
                                                                                                        (n = {
                                                                                                            children: _("Inner filter (priority / VID / TPID-DEI)")
                                                                                                        }, s("th", n)),
                                                                                                        (i = {
                                                                                                            children: _("EtherType code")
                                                                                                        }, s("th", i)),
                                                                                                        (a = {
                                                                                                            children: _("Remove tags")
                                                                                                        }, s("th", a)),
                                                                                                        (o = {
                                                                                                            children: _("Outer treatment (priority / VID / TPID-DEI)")
                                                                                                        }, s("th", o)),
                                                                                                        (l = {
                                                                                                            children: _("Inner treatment (priority / VID / TPID-DEI)")
                                                                                                        }, s("th", l)),
                                                                                                        (d = {
                                                                                                            children: _("Delete entry")
                                                                                                        }, s("th", d))
                                                                                                    ]
                                                                                                }, s("tr", c))
                                                                                            }, s("thead", p)),
                                                                                            (u = {
                                                                                                children: e.vlan_rules.map((e)=>{
                                                                                                    var t, r, n, i, a, o, l, d;
                                                                                                    return d = {
                                                                                                        children: [
                                                                                                            (t = {
                                                                                                                children: `${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`
                                                                                                            }, s("td", t)),
                                                                                                            (r = {
                                                                                                                children: `${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`
                                                                                                            }, s("td", r)),
                                                                                                            (n = {
                                                                                                                children: tZ(e.filter_ethertype)
                                                                                                            }, s("td", n)),
                                                                                                            (i = {
                                                                                                                children: tZ(e.tags_to_remove)
                                                                                                            }, s("td", i)),
                                                                                                            (a = {
                                                                                                                children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                            }, s("td", a)),
                                                                                                            (o = {
                                                                                                                children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                            }, s("td", o)),
                                                                                                            (l = {
                                                                                                                children: tZ(e.delete_entry)
                                                                                                            }, s("td", l))
                                                                                                        ]
                                                                                                    }, s("tr", d);
                                                                                                })
                                                                                            }, s("tbody", u))
                                                                                        ]
                                                                                    }, s("table", f))
                                                                                }, s("div", g)) : null,
                                                                                (h = {
                                                                                    style: "margin-top:6px",
                                                                                    children: [
                                                                                        _("G.988 encoded field values"),
                                                                                        ": ",
                                                                                        t1(e.attribute)
                                                                                    ]
                                                                                }, s("p", h)),
                                                                                (b = {
                                                                                    class: "mib-pre",
                                                                                    children: tY(e.vlan_rules.length ? e.vlan_rules : e.rows)
                                                                                }, s("pre", b))
                                                                            ]
                                                                        }, s("details", m);
                                                                    }),
                                                                    (x = {
                                                                        class: "mib-diag-details",
                                                                        children: [
                                                                            (v = {
                                                                                children: _("Records / diagnostics")
                                                                            }, s("summary", v)),
                                                                            (w = {
                                                                                class: "mib-pre",
                                                                                children: tY({
                                                                                    diagnostics: r.diagnostics,
                                                                                    records: e.records.filter((e)=>e.class_id === t && e.entity_id === r.entity_id)
                                                                                })
                                                                            }, s("pre", w))
                                                                        ]
                                                                    }, s("details", x))
                                                                ]
                                                            }, s("div", z))
                                                        ]
                                                    }, s("details", k);
                                                })) : d.replaceChildren((n = {
                                                    class: "mib-empty-content",
                                                    children: (r = {
                                                        children: _("No entities recorded for this ME class.")
                                                    }, s("p", r))
                                                }, s("div", n)));
                                            }
                                            function g() {
                                                var t;
                                                let r = c.value.trim().toLowerCase();
                                                u.clear();
                                                let n = e.classes.filter((e)=>`${e.class_id} ${e.name ?? ""}`.toLowerCase().includes(r));
                                                n.length ? p.replaceChildren(...n.map((e)=>{
                                                    var t, r, n, i;
                                                    let a = (i = {
                                                        type: "button",
                                                        class: `mib-class-btn${e.class_id === l ? " active" : ""}`,
                                                        onclick: ()=>f(e.class_id),
                                                        children: [
                                                            (t = {
                                                                class: "mib-class-id",
                                                                children: e.class_id
                                                            }, s("span", t)),
                                                            (r = {
                                                                class: "mib-class-name",
                                                                title: e.name ?? _("Unknown class"),
                                                                children: e.name ?? _("Unknown class")
                                                            }, s("span", r)),
                                                            (n = {
                                                                class: "mib-class-count",
                                                                children: e.entities
                                                            }, s("span", n))
                                                        ]
                                                    }, s("button", i));
                                                    return u.set(e.class_id, a), a;
                                                })) : p.replaceChildren((t = {
                                                    class: "mib-empty-list",
                                                    children: _("No matching ME classes")
                                                }, s("div", t)));
                                            }
                                            return c.addEventListener("input", g), g(), e.classes.length && f(e.classes[0].class_id), o = {
                                                class: "mib-browser",
                                                children: [
                                                    (a = {
                                                        class: "mib-sidebar",
                                                        children: [
                                                            (i = {
                                                                class: "mib-search-box",
                                                                children: c
                                                            }, s("div", i)),
                                                            p
                                                        ]
                                                    }, s("div", a)),
                                                    d
                                                ]
                                            }, s("div", o);
                                        }(b), (k = {
                                            class: "mib-upload-diagnostics",
                                            children: [
                                                (g = {
                                                    children: _("Upload diagnostics")
                                                }, s("summary", g)),
                                                (y = {
                                                    class: "mib-pre",
                                                    children: tY(b.diagnostics)
                                                }, s("pre", y))
                                            ]
                                        }, s("details", k))), n = b, z.textContent = tY({
                                            schema_version: n.schema_version,
                                            reference_version: n.reference_version,
                                            onu_id: n.onu_id,
                                            uploaded_complete: n.uploaded_complete,
                                            expected_records: n.expected_records,
                                            received_records: n.received_records,
                                            decoded_records: n.decoded_records,
                                            partial_records: n.partial_records,
                                            basic_records: n.basic_records,
                                            tables_requested: n.tables_requested,
                                            tables_collected: n.tables_collected,
                                            class_count: n.classes.length,
                                            classes: n.classes.slice(0, 25),
                                            additional_classes: Math.max(0, n.classes.length - 25),
                                            record_count: n.records.length,
                                            first_record: n.records[0] ?? null,
                                            table_count: n.tables.length,
                                            diagnostics_count: n.diagnostics.length
                                        }), $.disabled = !1;
                                        return;
                                    }
                                    if (e.progress) {
                                        let { phase: t, received: r, expected: n } = e.progress;
                                        if (v.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == n ? "" : `: ${r}/${n}`}` : null == n ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${n}`, n && n > 0) {
                                            let e = Math.min(100, Math.round(r / n * 100));
                                            w.title = `${e}%`, w.firstElementChild.style.width = `${e}%`;
                                        }
                                    }
                                    if (Date.now() >= O) throw Error(_("MIB query timed out; retry."));
                                    await new Promise((e)=>setTimeout(e, 1000));
                                }
                            } catch (e) {
                                D() && (w.style.display = "none", v.replaceChildren(s("span", {
                                    class: "mib-error-text",
                                    children: [
                                        String(e),
                                        b ? ` \xb7 ${_("Previous snapshot retained")}` : ""
                                    ]
                                })));
                            } finally{
                                await W(), h = !1, O.disabled = M.disabled = !1;
                            }
                        }
                    }
                    async function W() {
                        if (!m) return;
                        let e = m;
                        m = null;
                        try {
                            await tD(e);
                        } catch (e) {
                            console.warn("Failed to release MIB snapshot", e);
                        }
                    }
                    A(f), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, R, "modal-wide");
                }(t, "mib");
            } catch (e) {
                f.replaceChildren(s("div", {
                    class: "alert-message danger",
                    children: String(e)
                }));
            }
        }, $ = async (e)=>{
            if (!v) {
                for (let e of (v = !0, x))e.disabled = !0;
                R(m);
                try {
                    var t;
                    let r = await tv(e, g.value), n = e.startsWith("management_") ? _("Management operation started; status is refreshed below.") : _("Started: %s").replace("%s", "operation_ids" in r ? r.operation_ids.join(", ") : "\u2014");
                    f.replaceChildren((t = {
                        class: "alert-message info",
                        children: n
                    }, s("div", t))), R(await tb());
                } catch (e) {
                    f.replaceChildren(s("div", {
                        class: "alert-message danger",
                        children: String(e)
                    }));
                } finally{
                    v = !1, R(m);
                }
            }
        }, S = s("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: ()=>$("plan"),
            children: _("Preview differences (read-only)")
        }), O = s("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            onclick: ()=>$("apply"),
            children: _("Apply differences")
        }), M = s("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            title: _("Read current device parameters and auto-verify matching settings without writing to device"),
            onclick: ()=>$("reconcile"),
            children: _("Reconcile (read-only)")
        }), P = s("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            title: _("Clear backoff delays and retry safe difference synchronization"),
            onclick: ()=>$("retry"),
            children: _("Self-heal / retry")
        });
        x.push(S, O, M, P);
        let C = s("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: ()=>$("management_plan"),
            children: _("Check management differences (read-only)")
        }), N = s("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            onclick: ()=>$("management_apply"),
            children: _("Apply management configuration")
        });
        x.push(C, N);
        let A = (r = {
            class: "cbi-section",
            children: [
                s("h3", {
                    children: _("Isolated TR069 management network")
                }),
                b,
                s("p", {
                    style: "margin-top:10px",
                    children: [
                        C,
                        " ",
                        N
                    ]
                })
            ]
        }, s("div", r)), I = (o = {
            class: "cbi-section",
            children: [
                s("h3", {
                    children: _("Manual synchronization")
                }),
                (i = {
                    style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px",
                    children: [
                        (n = {
                            style: "display:flex;align-items:center;gap:8px",
                            children: [
                                s("span", {
                                    children: [
                                        _("Target"),
                                        ":"
                                    ]
                                }),
                                g
                            ]
                        }, s("label", n)),
                        s("div", {
                            style: "display:flex;gap:8px;flex-wrap:wrap",
                            children: [
                                S,
                                O,
                                M,
                                P
                            ]
                        })
                    ]
                }, s("div", i))
            ]
        }, s("div", o)), T = (l = {
            class: "cbi-map fttr-sync",
            children: [
                s("style", {
                    children: `
					.fttr-sync {
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
						.fttr-sync {
							--fttr-success-color: #2ecc71;
							--fttr-warning-color: #f39c12;
							--fttr-danger-color: #e74c3c;
							--fttr-info-color: #3498db;
							--fttr-neutral-color: #bdc3c7;
						}
					}

					[data-darkmode="true"] .fttr-sync,
					[data-theme="dark"] .fttr-sync {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}

					.fttr-sync .fttr-badge {
						display: inline-block;
						padding: 0.18em 0.55em;
						font-size: 85%;
						font-weight: 600;
						line-height: 1.25;
						border-radius: 3px;
						white-space: nowrap;
						text-align: center;
					}

					.fttr-sync .fttr-badge-success {
						background: var(--fttr-success-bg);
						color: var(--fttr-success-color);
						border: 1px solid var(--fttr-success-border);
					}

					.fttr-sync .fttr-badge-warning {
						background: var(--fttr-warning-bg);
						color: var(--fttr-warning-color);
						border: 1px solid var(--fttr-warning-border);
					}

					.fttr-sync .fttr-badge-danger {
						background: var(--fttr-danger-bg);
						color: var(--fttr-danger-color);
						border: 1px solid var(--fttr-danger-border);
					}

					.fttr-sync .fttr-badge-info {
						background: var(--fttr-info-bg);
						color: var(--fttr-info-color);
						border: 1px solid var(--fttr-info-border);
					}

					.fttr-sync .fttr-badge-neutral {
						background: var(--fttr-neutral-bg);
						color: var(--fttr-neutral-color);
						border: 1px solid var(--fttr-neutral-border);
					}

					.fttr-sync .fttr-grid-2 {
						display: grid;
						grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
						gap: 12px;
						margin: 8px 0;
					}

					.fttr-sync .fttr-grid-3 {
						display: grid;
						grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
						gap: 12px;
						margin: 8px 0;
					}

					.fttr-sync .fttr-card {
						padding: 10px 14px;
						border: 1px solid rgba(127, 140, 141, 0.2);
						border-radius: 6px;
						background: rgba(127, 140, 141, 0.04);
					}

					.fttr-sync .fttr-kv-row {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 4px 0;
						border-bottom: 1px dashed rgba(127, 140, 141, 0.15);
						font-size: 88%;
					}

					.fttr-sync .fttr-kv-row:last-child {
						border-bottom: none;
					}

					.fttr-sync .fttr-kv-label {
						color: #888;
					}

					.fttr-sync .fttr-pill-label {
						color: #888;
						margin-right: 4px;
						font-size: 90%;
					}

					.fttr-sync .fttr-device-card {
						position: relative;
						margin-bottom: 1.5em;
					}

					.fttr-sync .fttr-card-header {
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
						flex-wrap: wrap;
						gap: 10px;
						margin-bottom: 10px;
					}

					.fttr-sync .fttr-card-title-group {
						display: flex;
						flex-direction: column;
						gap: 4px;
					}

					.fttr-sync .fttr-card-actions {
						display: flex;
						gap: 8px;
						flex-wrap: wrap;
					}

					.fttr-sync .fttr-card-meta-tags {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 6px;
					}

					.fttr-sync .fttr-device-status-strip {
						display: flex;
						justify-content: space-between;
						align-items: center;
						flex-wrap: wrap;
						gap: 10px;
						padding: 8px 12px;
						background: rgba(127, 140, 141, 0.05);
						border: 1px solid rgba(127, 140, 141, 0.15);
						border-radius: 5px;
						margin-bottom: 12px;
					}

					.fttr-sync .fttr-status-pill-group {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 12px;
					}

					.fttr-sync .fttr-status-op-info {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 6px;
						font-size: 85%;
						color: #666;
					}

					.fttr-sync .fttr-btn-subtle {
						font-size: 80%;
						padding: 3px 8px;
						border: 1px solid rgba(127, 140, 141, 0.35);
						background: transparent;
						color: inherit;
						border-radius: 4px;
						cursor: pointer;
						transition: all 0.2s ease;
					}

					.fttr-sync .fttr-btn-subtle:hover {
						background: rgba(231, 76, 60, 0.1);
						border-color: rgba(231, 76, 60, 0.4);
						color: #c0392b;
					}

					.fttr-sync .table th {
						white-space: nowrap;
						user-select: none;
					}

					.fttr-sync .table td {
						vertical-align: middle;
					}
					`
                }),
                s("h2", {
                    children: _("FTTR synchronization")
                }),
                p,
                u,
                A,
                I,
                f,
                h
            ]
        }, s("div", l));
        function R(e) {
            var t, r, n, i, o, l, d, c, f, w, x, M, P, A, T, R, D, Z, W, B, V, q, U, F, J, K, G, H, Q, X, Y;
            m = e, p.replaceChildren((l = {
                "data-provisioning-summary": "true",
                style: "display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%",
                children: [
                    (t = {
                        children: [
                            s("strong", {
                                style: "margin-right:.4em",
                                children: [
                                    _("Provisioning"),
                                    ":"
                                ]
                            }),
                            s("span", {
                                class: `fttr-badge ${e.enabled ? "fttr-badge-success" : "fttr-badge-neutral"}`,
                                children: e.enabled ? _("Enabled") : _("Disabled")
                            })
                        ]
                    }, s("span", t)),
                    (r = {
                        children: [
                            s("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Mode"),
                                    ":"
                                ]
                            }),
                            s("span", {
                                class: "fttr-badge fttr-badge-info",
                                children: t3(e.mode)
                            })
                        ]
                    }, s("span", r)),
                    (n = {
                        children: [
                            s("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Revision"),
                                    ":"
                                ]
                            }),
                            s("code", {
                                children: t3(e.revision)
                            })
                        ]
                    }, s("span", n)),
                    (e.triggers ?? []).length ? (i = {
                        children: [
                            s("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Triggers"),
                                    ":"
                                ]
                            }),
                            s("code", {
                                children: (e.triggers ?? []).join(", ")
                            })
                        ]
                    }, s("span", i)) : null,
                    e.interval_minutes ? (o = {
                        children: [
                            s("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Interval (minutes)"),
                                    ":"
                                ]
                            }),
                            s("span", {
                                children: e.interval_minutes
                            })
                        ]
                    }, s("span", o)) : null
                ]
            }, s("div", l)));
            let ee = [
                e.error,
                y.error ? _("Committed configuration is invalid: %s").format(y.error) : y.revision && y.revision !== e.revision ? _("Committed configuration has not been loaded. Check Configuration diagnostics; an active operation may have prevented reload.") : ""
            ].filter(Boolean);
            u.hidden = !ee.length, u.textContent = ee.join(" \u2014 ");
            let et = [
                "all",
                ...Array.from(new Set((e.devices ?? []).map((e)=>e.group).filter(Boolean))).map((e)=>`group:${e}`),
                ...(e.devices ?? []).map((e)=>e.device)
            ];
            if (Array.from(g.options).map((e)=>e.value).join("\n") !== et.join("\n")) {
                let t = g.value;
                g.replaceChildren(...et.map((t)=>s("option", {
                        value: t,
                        children: "all" === t ? _("All devices") : t.startsWith("group:") ? (e.devices ?? []).find((e)=>`group:${e.group}` === t)?.group_name || t : (e.devices ?? []).find((e)=>e.device === t)?.name || t
                    }))), g.value = et.includes(t) ? t : "all";
            }
            I.hidden = "manual" !== e.mode || !L.hasViewPermission();
            let er = (e.devices ?? []).filter((e)=>"all" === g.value || e.device === g.value || `group:${e.group}` === g.value).some((e)=>![
                    "completed",
                    "not_started",
                    "interrupted"
                ].includes(e.provisioning.state ?? "not_started"));
            S.disabled = v || er || !!y.error || !!y.revision && y.revision !== e.revision || !(e.devices ?? []).length, O.disabled = S.disabled || !e.enabled;
            let en = e.management_network;
            C.disabled = v || !!en?.inflight || !!y.error || !L.hasViewPermission(), N.disabled = C.disabled;
            let ei = en.desired ?? en.applied, ea = en?.plan ?? [], es = !!en?.applied_version && !!en?.desired_version && en?.applied_version === en?.desired_version;
            b.replaceChildren((Y = {
                children: [
                    (M = {
                        style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:10px",
                        children: [
                            (d = {
                                children: [
                                    s("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            _("State"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    t9(en?.state)
                                ]
                            }, s("span", d)),
                            (c = {
                                children: [
                                    s("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            _("Desired version"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    s("code", {
                                        children: t3(en?.desired_version)
                                    })
                                ]
                            }, s("span", c)),
                            (f = {
                                children: [
                                    s("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            _("Applied version"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    s("code", {
                                        children: t3(en?.applied_version)
                                    })
                                ]
                            }, s("span", f)),
                            en?.desired_version || en?.applied_version ? (w = {
                                children: es ? s("span", {
                                    class: "fttr-badge fttr-badge-success",
                                    children: _("Synchronized")
                                }) : s("span", {
                                    class: "fttr-badge fttr-badge-warning",
                                    children: _("Pending apply")
                                })
                            }, s("span", w)) : null,
                            en?.next_retry_at ? (x = {
                                children: [
                                    s("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            _("Next retry"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    t7(en.next_retry_at)
                                ]
                            }, s("span", x)) : null
                        ]
                    }, s("div", M)),
                    (U = {
                        class: "fttr-grid-3",
                        children: [
                            (T = {
                                class: "fttr-card",
                                children: [
                                    (P = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Management interface")
                                            }),
                                            s("strong", {
                                                children: "\u2014"
                                            })
                                        ]
                                    }, s("div", P)),
                                    (A = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Management VLAN")
                                            }),
                                            s("span", {
                                                children: [
                                                    "VLAN ",
                                                    t3(ei?.vlan.join(", ")),
                                                    " (Prio ",
                                                    t3(ei?.priority),
                                                    ")"
                                                ]
                                            })
                                        ]
                                    }, s("div", A))
                                ]
                            }, s("div", T)),
                            (W = {
                                class: "fttr-card",
                                children: [
                                    (R = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Service IP / Netmask")
                                            }),
                                            s("code", {
                                                children: t3(ei?.address)
                                            })
                                        ]
                                    }, s("div", R)),
                                    (Z = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("DHCP service")
                                            }),
                                            (D = {
                                                children: null === ei ? "\u2014" : ei.dhcp_enabled ? s("span", {
                                                    class: "fttr-badge fttr-badge-success",
                                                    children: _("Enabled")
                                                }) : s("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    children: _("Disabled")
                                                })
                                            }, s("span", D))
                                        ]
                                    }, s("div", Z))
                                ]
                            }, s("div", W)),
                            (q = {
                                class: "fttr-card",
                                children: [
                                    (B = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("ACS URL")
                                            }),
                                            s("code", {
                                                style: "font-size:80%",
                                                children: t3(ei?.acs_url)
                                            })
                                        ]
                                    }, s("div", B)),
                                    (V = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Mode")
                                            }),
                                            s("span", {
                                                children: t3(ei?.mode)
                                            })
                                        ]
                                    }, s("div", V))
                                ]
                            }, s("div", q))
                        ]
                    }, s("div", U)),
                    ea.length ? (Q = {
                        style: "margin-top:10px",
                        children: [
                            s("h5", {
                                style: "margin-bottom:4px;font-size:90%",
                                children: _("Pending configuration changes")
                            }),
                            (H = {
                                class: "table-wrapper",
                                children: (G = {
                                    class: "table",
                                    style: "font-size:85%",
                                    children: [
                                        (J = {
                                            children: (F = {
                                                children: [
                                                    s("th", {
                                                        children: _("Operation")
                                                    }),
                                                    s("th", {
                                                        children: _("Configuration item")
                                                    }),
                                                    s("th", {
                                                        children: _("Reason / desired changes")
                                                    })
                                                ]
                                            }, s("tr", F))
                                        }, s("thead", J)),
                                        (K = {
                                            children: ea.map((e)=>{
                                                var t, r, n, i;
                                                return i = {
                                                    children: [
                                                        (t = {
                                                            children: s("span", {
                                                                class: "fttr-badge fttr-badge-info",
                                                                children: e.operation
                                                            })
                                                        }, s("td", t)),
                                                        (r = {
                                                            children: s("code", {
                                                                children: e.key
                                                            })
                                                        }, s("td", r)),
                                                        (n = {
                                                            children: s("code", {
                                                                children: (e.value ?? []).join(", ")
                                                            })
                                                        }, s("td", n))
                                                    ]
                                                }, s("tr", i);
                                            })
                                        }, s("tbody", K))
                                    ]
                                }, s("table", G))
                            }, s("div", H))
                        ]
                    }, s("div", Q)) : null,
                    en?.error ? s("div", {
                        class: "alert-message warning",
                        style: "margin-top:8px",
                        children: en.error
                    }) : null,
                    s("p", {
                        style: "font-size:85%;color:#888;margin-top:8px;margin-bottom:8px",
                        children: _("Saving in manual mode does not create interfaces, change firewall rules or configure child devices. Apply explicitly to authorize the current management configuration.")
                    }),
                    (X = {
                        style: "margin-top:6px;margin-bottom:10px",
                        children: [
                            s("summary", {
                                style: "cursor:pointer;user-select:none;font-size:85%;color:#666",
                                children: _("Advanced diagnostics / Raw configuration (JSON)")
                            }),
                            s("pre", {
                                style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px",
                                children: JSON.stringify({
                                    desired: en?.desired,
                                    applied: en?.applied,
                                    plan: en?.plan ?? []
                                }, null, 2)
                            })
                        ]
                    }, s("details", X))
                ]
            }, s("div", Y)));
            let eo = new Set(Array.from(h.querySelectorAll("details[open]")).map((e)=>e.getAttribute("data-device")));
            h.replaceChildren(...(e.devices ?? []).map((t)=>{
                var r, n, i, o, l, d, c, p, u, f, g, h, b, m, y, w, x, S, O, M, P, C, A, I, T, R, D, Z, W, B, V, q, U, F, J, K, G, H, Q, X, Y, ee, et, er, en, ei, ea, es, el, ed, ec, ep, eu, ef, eg, eh, e_, eb, em, ey, ev;
                let ew, ex, ez;
                return r = eo.has(t.device), n = ()=>$("management_apply"), i = N.disabled, o = e.enabled, l = v, ex = ![
                    "completed",
                    "not_started",
                    "interrupted"
                ].includes((ew = t.provisioning).state), ez = [
                    ...Object.entries(ew.wan_lifecycle ?? {}).map((e)=>{
                        let [t, r] = e;
                        return {
                            ...r,
                            id: `WAN ${t}`,
                            kind: "wan_activation",
                            service_type: "wan"
                        };
                    }),
                    ...Object.entries(ew.wifi_lifecycle ?? {}).map((e)=>{
                        let [t, r] = e;
                        return {
                            ...r,
                            id: `WLAN ${t}`,
                            kind: "ssid",
                            service_type: "wifi"
                        };
                    })
                ], ev = {
                    class: "cbi-section fttr-device-card",
                    children: [
                        (h = {
                            class: "fttr-card-header",
                            children: [
                                (f = {
                                    class: "fttr-card-title-group",
                                    children: [
                                        (c = {
                                            style: "margin:0",
                                            children: [
                                                t.name || t.optical_sn,
                                                " ",
                                                s("small", {
                                                    style: "font-size:75%;font-weight:normal;color:#888",
                                                    children: [
                                                        "(",
                                                        t.adapter,
                                                        ")"
                                                    ]
                                                })
                                            ]
                                        }, s("h3", c)),
                                        (u = {
                                            class: "fttr-card-meta-tags",
                                            children: [
                                                t.group_name ? s("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    title: _("Group"),
                                                    children: t.group_name
                                                }) : null,
                                                t.template_name ? s("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    title: _("Template"),
                                                    children: t.template_name
                                                }) : null,
                                                (p = {
                                                    style: "font-size:85%;color:#666",
                                                    children: [
                                                        "OMCI: ",
                                                        t9(t.omci_management?.state),
                                                        t.omci_management?.reason ? s("span", {
                                                            style: "margin-left:4px;color:#888",
                                                            title: t.omci_management.reason,
                                                            children: [
                                                                "(",
                                                                t.omci_management.reason,
                                                                ")"
                                                            ]
                                                        }) : null
                                                    ]
                                                }, s("span", p))
                                            ]
                                        }, s("div", u))
                                    ]
                                }, s("div", f)),
                                L.hasViewPermission() ? (g = {
                                    class: "fttr-card-actions",
                                    children: [
                                        s("button", {
                                            type: "button",
                                            class: "cbi-button cbi-button-action",
                                            onclick: ()=>j(t),
                                            children: _("View OMCI / MIB details")
                                        }),
                                        s("button", {
                                            type: "button",
                                            class: "cbi-button cbi-button-positive",
                                            disabled: l || ex || !o,
                                            title: o ? ex ? _("This device already has an active synchronization operation") : _("Start configuration delivery for this device") : _("Provisioning is disabled"),
                                            onclick: ()=>k(t),
                                            children: _("Sync now")
                                        }),
                                        s("button", {
                                            type: "button",
                                            class: "cbi-button cbi-button-positive",
                                            disabled: l,
                                            title: _("Clear old tasks and managed-object records after a device factory reset. The next preview or apply reads the device again."),
                                            onclick: ()=>{
                                                let e = t.name || t.optical_sn;
                                                window.confirm(_("Are you sure you want to reset the synchronization state for %s?").replace("%s", e)) && z(t);
                                            },
                                            children: _("Reset synchronization state")
                                        })
                                    ]
                                }, s("div", g)) : null
                            ]
                        }, s("div", h)),
                        (A = {
                            class: "fttr-device-status-strip",
                            children: [
                                (w = {
                                    class: "fttr-status-pill-group",
                                    children: [
                                        (b = {
                                            children: [
                                                s("span", {
                                                    class: "fttr-pill-label",
                                                    children: "CWMP:"
                                                }),
                                                " ",
                                                t9(t.management?.state, t.management?.last_inform ? `${_("Last Inform: %s").replace("%s", t7(t.management.last_inform))}${null != t.management.age_seconds ? ` (${function(e) {
                                                    if (null == e || e < 0) return null;
                                                    if (e < 60) return (1 === e ? _("%d second ago") : _("%d seconds ago")).replace("%d", String(e));
                                                    let t = Math.floor(e / 60);
                                                    if (t < 60) return (1 === t ? _("%d minute ago") : _("%d minutes ago")).replace("%d", String(t));
                                                    let r = Math.floor(e / 3600);
                                                    if (r < 24) return (1 === r ? _("%d hour ago") : _("%d hours ago")).replace("%d", String(r));
                                                    let n = Math.floor(e / 86400);
                                                    return (1 === n ? _("%d day ago") : _("%d days ago")).replace("%d", String(n));
                                                }(t.management.age_seconds)})` : ""}` : void 0)
                                            ]
                                        }, s("span", b)),
                                        (m = {
                                            children: [
                                                s("span", {
                                                    class: "fttr-pill-label",
                                                    children: [
                                                        _("Synchronization"),
                                                        ":"
                                                    ]
                                                }),
                                                " ",
                                                t9(ew.state)
                                            ]
                                        }, s("span", m)),
                                        (y = {
                                            children: [
                                                s("span", {
                                                    class: "fttr-pill-label",
                                                    children: "Wi-Fi:"
                                                }),
                                                " ",
                                                t9(t.wifi_sync)
                                            ]
                                        }, s("span", y))
                                    ]
                                }, s("div", w)),
                                (C = {
                                    class: "fttr-status-op-info",
                                    children: [
                                        (x = {
                                            children: [
                                                _("Operation"),
                                                ": ",
                                                s("strong", {
                                                    children: t3(ew.operation_id)
                                                }),
                                                " (",
                                                t3(ew.mode),
                                                ")"
                                            ]
                                        }, s("span", x)),
                                        s("span", {
                                            children: "\xb7"
                                        }),
                                        s("span", {
                                            children: [
                                                _("Started"),
                                                ": ",
                                                t7(ew.started_at)
                                            ]
                                        }),
                                        s("span", {
                                            children: "\xb7"
                                        }),
                                        (S = {
                                            children: [
                                                _("Revision"),
                                                ": ",
                                                s("code", {
                                                    children: t3(ew.revision)
                                                })
                                            ]
                                        }, s("span", S)),
                                        ew.attempts ? (M = {
                                            children: [
                                                s("span", {
                                                    children: "\xb7"
                                                }),
                                                (O = {
                                                    style: "color:#e67e22",
                                                    children: [
                                                        _("Attempts"),
                                                        ": ",
                                                        s("strong", {
                                                            children: ew.attempts
                                                        })
                                                    ]
                                                }, s("span", O))
                                            ]
                                        }, s(a, M)) : null,
                                        ew.next_retry_at && ew.next_retry_at > Math.floor(Date.now() / 1000) ? (P = {
                                            children: [
                                                s("span", {
                                                    children: "\xb7"
                                                }),
                                                s("span", {
                                                    style: "color:#d35400",
                                                    children: _("Next self-healing retry in %d seconds").replace("%d", String(ew.next_retry_at - Math.floor(Date.now() / 1000)))
                                                })
                                            ]
                                        }, s(a, P)) : null
                                    ]
                                }, s("div", C))
                            ]
                        }, s("div", A)),
                        ew.reconcile_reason ? s("div", {
                            class: "alert-message info",
                            style: "margin:8px 0;font-size:85%",
                            children: ew.reconcile_reason
                        }) : null,
                        re(ew.items ?? []),
                        ew.cwmp_contract ? (U = {
                            style: "margin-top:1.2em",
                            children: [
                                s("h4", {
                                    style: "margin-bottom:0.5em",
                                    children: _("CWMP contract")
                                }),
                                (q = {
                                    class: "fttr-card",
                                    children: [
                                        (T = {
                                            style: "display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                                            children: [
                                                (I = {
                                                    children: [
                                                        s("span", {
                                                            children: t3(ew.cwmp_contract.requested)
                                                        }),
                                                        " \u2192",
                                                        " ",
                                                        s("code", {
                                                            children: t3(ew.cwmp_contract.contract)
                                                        })
                                                    ]
                                                }, s("div", I)),
                                                s("div", {
                                                    children: t9(ew.cwmp_contract.state)
                                                })
                                            ]
                                        }, s("div", T)),
                                        (B = {
                                            style: "display:flex;flex-wrap:wrap;gap:12px;margin-bottom:6px;font-size:90%",
                                            children: [
                                                (R = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: "WAN:"
                                                        }),
                                                        " ",
                                                        t9(ew.cwmp_contract.capabilities?.wan)
                                                    ]
                                                }, s("span", R)),
                                                (D = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: "WLAN:"
                                                        }),
                                                        " ",
                                                        t9(ew.cwmp_contract.capabilities?.wlan)
                                                    ]
                                                }, s("span", D)),
                                                (Z = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                _("Bindings"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        t9(ew.cwmp_contract.capabilities?.binding)
                                                    ]
                                                }, s("span", Z)),
                                                (W = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                _("Cache"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        s("span", {
                                                            class: "fttr-badge fttr-badge-info",
                                                            style: "font-size:80%",
                                                            children: ew.cwmp_contract.cache_hit ? _("Matched") : _("Fresh discovery")
                                                        })
                                                    ]
                                                }, s("span", W))
                                            ]
                                        }, s("div", B)),
                                        ew.cwmp_contract.schema ? (V = {
                                            style: "font-size:85%;color:#666",
                                            children: [
                                                _("Schema"),
                                                ": ",
                                                s("code", {
                                                    children: ew.cwmp_contract.schema
                                                })
                                            ]
                                        }, s("div", V)) : null,
                                        ew.cwmp_contract.reason ? s("div", {
                                            style: "font-size:85%;margin-top:4px;color:#e67e22",
                                            children: ew.cwmp_contract.reason
                                        }) : null
                                    ]
                                }, s("div", q))
                            ]
                        }, s("div", U)) : null,
                        (d = t.acs_bootstrap) ? (ef = {
                            style: "margin-top:1.2em",
                            children: [
                                (J = {
                                    style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:0.5em",
                                    children: [
                                        s("h4", {
                                            style: "margin:0",
                                            children: _("ACS bootstrap")
                                        }),
                                        (F = {
                                            style: "display:flex;align-items:center;gap:6px",
                                            children: [
                                                t9(d.state),
                                                d.inflight ? s("span", {
                                                    class: "fttr-badge fttr-badge-info",
                                                    children: _("Command in progress")
                                                }) : null
                                            ]
                                        }, s("div", F))
                                    ]
                                }, s("div", J)),
                                (ec = {
                                    class: "fttr-card",
                                    children: [
                                        (es = {
                                            class: "fttr-grid-3",
                                            children: [
                                                (Q = {
                                                    children: [
                                                        (K = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Method")
                                                                }),
                                                                s("code", {
                                                                    children: t3(d.method)
                                                                })
                                                            ]
                                                        }, s("div", K)),
                                                        (G = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Attempts")
                                                                }),
                                                                s("span", {
                                                                    children: t3(d.attempts)
                                                                })
                                                            ]
                                                        }, s("div", G)),
                                                        (H = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Identity source")
                                                                }),
                                                                s("span", {
                                                                    children: t3(d.binding_source)
                                                                })
                                                            ]
                                                        }, s("div", H))
                                                    ]
                                                }, s("div", Q)),
                                                (et = {
                                                    children: [
                                                        (X = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Management VLAN")
                                                                }),
                                                                s("span", {
                                                                    children: d.desired?.vlan !== void 0 ? `VLAN ${d.desired.vlan} (Prio ${d.desired.priority ?? 0})` : "\u2014"
                                                                })
                                                            ]
                                                        }, s("div", X)),
                                                        (Y = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("ACS URL")
                                                                }),
                                                                s("code", {
                                                                    style: "font-size:80%",
                                                                    children: t3(d.desired?.acs_url)
                                                                })
                                                            ]
                                                        }, s("div", Y)),
                                                        (ee = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Local ACS listener")
                                                                }),
                                                                s("code", {
                                                                    style: "font-size:80%",
                                                                    children: d.listener?.listen ? `${d.listener.listen}${d.listener.path || ""}` : "\u2014"
                                                                })
                                                            ]
                                                        }, s("div", ee))
                                                    ]
                                                }, s("div", et)),
                                                (ea = {
                                                    children: [
                                                        (er = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Last telemetry")
                                                                }),
                                                                s("span", {
                                                                    style: "font-size:85%",
                                                                    children: t7(d.mqtt_last_seen)
                                                                })
                                                            ]
                                                        }, s("div", er)),
                                                        (en = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Last Inform")
                                                                }),
                                                                s("span", {
                                                                    style: "font-size:85%",
                                                                    children: t7(d.last_inform)
                                                                })
                                                            ]
                                                        }, s("div", en)),
                                                        (ei = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                s("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Settings verified")
                                                                }),
                                                                s("span", {
                                                                    style: "font-size:85%",
                                                                    children: t7(d.settings_verified_at)
                                                                })
                                                            ]
                                                        }, s("div", ei))
                                                    ]
                                                }, s("div", ea))
                                            ]
                                        }, s("div", es)),
                                        d.mqtt_target ? (el = {
                                            style: "font-size:85%;color:#666;margin-top:6px;border-top:1px dashed rgba(127,140,141,0.15);padding-top:6px",
                                            children: [
                                                s("span", {
                                                    style: "color:#888",
                                                    children: [
                                                        _("MQTT target"),
                                                        ":"
                                                    ]
                                                }),
                                                " ",
                                                s("code", {
                                                    children: d.mqtt_target
                                                })
                                            ]
                                        }, s("div", el)) : null,
                                        d.reason ? s("div", {
                                            style: "font-size:85%;color:#d35400;margin-top:6px;overflow-wrap:anywhere",
                                            children: d.reason
                                        }) : null,
                                        "awaiting_apply" === d.state ? (ed = {
                                            style: "margin-top:10px;padding:8px;background:rgba(243,156,18,0.1);border-radius:4px;border:1px solid rgba(243,156,18,0.3)",
                                            children: [
                                                s("button", {
                                                    type: "button",
                                                    class: "cbi-button cbi-button-positive",
                                                    disabled: i,
                                                    onclick: n,
                                                    children: _("Authorize and apply management settings")
                                                }),
                                                " ",
                                                s("span", {
                                                    style: "font-size:85%;color:#666",
                                                    children: _("Required after management drift or service restart; verifies the child ACS settings before business synchronization.")
                                                })
                                            ]
                                        }, s("div", ed)) : null
                                    ]
                                }, s("div", ec)),
                                [
                                    d.last_error,
                                    d.link_identity_error,
                                    d.persistence_error,
                                    d.listener?.error,
                                    d.endpoint_notice
                                ].filter(Boolean).map((e)=>s("div", {
                                        class: "alert-message warning",
                                        style: "overflow-wrap:anywhere;margin-top:8px",
                                        children: e
                                    })),
                                d.manual_steps?.length ? (eu = {
                                    style: "margin-top:8px",
                                    children: [
                                        s("summary", {
                                            style: "cursor:pointer;user-select:none;font-weight:600",
                                            children: _("Management setup / reachability guidance")
                                        }),
                                        (ep = {
                                            style: "padding:6px 0",
                                            children: d.manual_steps.map((e, t)=>s("p", {
                                                    style: "margin:4px 0;font-size:90%",
                                                    children: [
                                                        t + 1,
                                                        ". ",
                                                        e
                                                    ]
                                                }))
                                        }, s("div", ep))
                                    ]
                                }, s("details", eu)) : null
                            ]
                        }, s("div", ef)) : null,
                        ez.length ? (eg = {
                            style: "margin-top:1.2em",
                            children: [
                                s("h4", {
                                    style: "margin-bottom:0.5em",
                                    children: _("WAN / WLAN lifecycle results")
                                }),
                                re(ez)
                            ]
                        }, s("div", eg)) : null,
                        (ey = {
                            "data-device": t.device,
                            open: r,
                            style: "margin-top:1em",
                            children: [
                                s("summary", {
                                    style: "cursor:pointer;user-select:none;font-weight:600",
                                    children: _("Managed objects and lifecycle intent")
                                }),
                                (em = {
                                    style: "padding:8px 0",
                                    children: [
                                        (eb = {
                                            style: "display:flex;gap:16px;flex-wrap:wrap;font-size:90%;margin-bottom:6px",
                                            children: [
                                                (eh = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                _("Wi-Fi cleanup policy"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        t3(ew.wifi_cleanup)
                                                    ]
                                                }, s("span", eh)),
                                                (e_ = {
                                                    children: [
                                                        s("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                _("Wi-Fi stage"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        t3(ew.wifi_stage)
                                                    ]
                                                }, s("span", e_))
                                            ]
                                        }, s("div", eb)),
                                        s("pre", {
                                            style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:85%;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px;max-height:240px;overflow-y:auto",
                                            children: JSON.stringify({
                                                wan_objects: ew.wan_objects ?? {},
                                                wifi_objects: ew.wifi_objects ?? {}
                                            }, null, 2)
                                        })
                                    ]
                                }, s("div", em))
                            ]
                        }, s("details", ey))
                    ]
                }, s("div", ev);
            }));
        }
        return g.addEventListener("change", ()=>R(m)), R(d), L.Poll.add(async ()=>{
            if (T.isConnected && !w) {
                w = !0;
                try {
                    let [e, t] = await Promise.all([
                        tb(),
                        tm()
                    ]);
                    y = t, R(e);
                } catch (e) {
                    u.hidden = !1, u.textContent = _("Status refresh failed: %s").format(String(e));
                } finally{
                    w = !1;
                }
            }
        }, 5), T;
    },
    handleSave: null,
    handleSaveApply: null,
    handleReset: null
});

return main;