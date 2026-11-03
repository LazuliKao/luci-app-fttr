'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, r, n, i, a;
const s = Symbol.for("jsx.fragment");
function o(e, t) {
    let { children: r, ...n } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, i = function e(t) {
        let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let n of t)null != n && "boolean" != typeof n && (Array.isArray(n) ? e(n, r) : r.push(n instanceof Node ? n : String(n)));
        return r;
    }(null == r ? [] : Array.isArray(r) ? r : [
        r
    ]);
    if (e === s) {
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
    let a = {}, o = {
        ...n
    };
    for (let [e, t] of Object.entries(o))e.startsWith("on") && "function" == typeof t ? (a[e] = t, delete o[e]) : "boolean" == typeof t && (t ? o[e] = e : delete o[e]);
    let l = Object.keys(o).length > 0 ? i.length > 1 ? E(e, o, i) : E(e, o, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
    for (let [e, t] of Object.entries(a)){
        let r = e.slice(2).toLowerCase();
        l.addEventListener(r, t);
    }
    return l;
}
function l(e, t, r) {
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
    let n = new e._zod.constr(t ?? e._zod.def);
    return (!t || r?.parent) && (n._zod.parent = e), n;
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
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = P(e.inst?._zod.def?.error?.(e)) ?? P(t?.error?.(e)) ?? P(r.customError?.(e)) ?? P(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
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
}), N = (r = $, (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise) throw new d();
    if (s.issues.length) {
        let e = new (i?.Err ?? r)(s.issues.map((e)=>O(e, a, p())));
        throw v(e, i?.callee), e;
    }
    return s.value;
}), M = (n = $, async (e, t, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (i?.Err ?? n)(s.issues.map((e)=>O(e, a, p())));
        throw v(e, i?.callee), e;
    }
    return s.value;
}), Z = (i = $, (e, t, r)=>{
    let n = r ? {
        ...r,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, n);
    if (a instanceof Promise) throw new d();
    return a.issues.length ? {
        success: !1,
        error: new (i ?? U)(a.issues.map((e)=>O(e, n, p())))
    } : {
        success: !0,
        data: a.value
    };
}), R = (a = $, async (e, t, r)=>{
    let n = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, i = e._zod.run({
        value: t,
        issues: []
    }, n);
    return i instanceof Promise && (i = await i), i.issues.length ? {
        success: !1,
        error: new a(i.issues.map((e)=>O(e, n, p())))
    } : {
        success: !0,
        data: i.value
    };
}), D = /^-?\d+(?:\.\d+)?$/, F = /^(?:true|false)$/i, I = /^null$/i, B = {
    major: 4,
    minor: 3,
    patch: 6
}, X = l("$ZodType", (e, t)=>{
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
            let n, i = C(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, s = a._zod.check(e);
                if (s instanceof Promise && r?.async === !1) throw new d();
                if (n || s instanceof Promise) n = (n ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (i || (i = C(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = C(e, t));
                }
            }
            return n ? n.then(()=>e) : e;
        }, r = (r, i, a)=>{
            if (C(r)) return r.aborted = !0, r;
            let s = t(i, n, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new d();
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
                if (!1 === a.async) throw new d();
                return s.then((e)=>t(e, n, a));
            }
            return t(s, n, a);
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
}), q = l("$ZodString", (e, t)=>{
    var r;
    let n;
    X.init(e, t), e._zod.pattern = [
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
}), V = l("$ZodNumber", (e, t)=>{
    X.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? D, e._zod.parse = (r, n)=>{
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
}), H = l("$ZodBoolean", (e, t)=>{
    X.init(e, t), e._zod.pattern = F, e._zod.parse = (r, n)=>{
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
}), W = l("$ZodNull", (e, t)=>{
    X.init(e, t), e._zod.pattern = I, e._zod.values = new Set([
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
}), J = l("$ZodUnknown", (e, t)=>{
    X.init(e, t), e._zod.parse = (e)=>e;
}), K = l("$ZodNever", (e, t)=>{
    X.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function G(e, t, r) {
    e.issues.length && t.issues.push(...A(r, e.issues)), t.value[r] = e.value;
}
const Q = l("$ZodArray", (e, t)=>{
    X.init(e, t), e._zod.parse = (r, n)=>{
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
function Y(e, t, r, n, i) {
    if (e.issues.length) {
        if (i && !(r in n)) return;
        t.issues.push(...A(r, e.issues));
    }
    void 0 === e.value ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
const ee = l("$ZodObject", (e, t)=>{
    let r;
    X.init(e, t);
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
    let i = f(()=>(function(e) {
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
    m(e._zod, "propValues", ()=>{
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
        if (!w(s)) return t.issues.push({
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
            a instanceof Promise ? o.push(a.then((r)=>Y(r, t, e, s, i))) : Y(a, t, e, s, i);
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
                a instanceof Promise ? e.push(a.then((e)=>Y(e, r, i, t, c))) : Y(a, r, i, t, c);
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
function et(e, t, r, n) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let i = e.filter((e)=>!C(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>O(e, n, p())))
    }), t);
}
const er = l("$ZodUnion", (e, t)=>{
    X.init(e, t), m(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), m(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), m(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), m(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>h(e.source)).join("|")})$`);
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
        return s ? Promise.all(o).then((t)=>et(t, i, e, a)) : et(o, i, e, a);
    };
}), en = l("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, er.init(e, t);
    let r = e._zod.parse;
    m(e._zod, "propValues", ()=>{
        let e = {};
        for (let r of t.options){
            let n = r._zod.propValues;
            if (!n || 0 === Object.keys(n).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
            for (let [t, r] of Object.entries(n))for (let n of (e[t] || (e[t] = new Set()), r))e[t].add(n);
        }
        return e;
    });
    let n = f(()=>{
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
        if (!w(s)) return i.issues.push({
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
}), ei = l("$ZodRecord", (e, t)=>{
    X.init(e, t), e._zod.parse = (r, n)=>{
        let i = r.value;
        if (!x(i)) return r.issues.push({
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
                    t.issues.length && r.issues.push(...A(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...A(e, s.issues)), r.value[e] = s.value);
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
                    issues: o.issues.map((e)=>O(e, n, p())),
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
                e.issues.length && r.issues.push(...A(s, e.issues)), r.value[o.value] = e.value;
            })) : (l.issues.length && r.issues.push(...A(s, l.issues)), r.value[o.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), ea = l("$ZodEnum", (e, t)=>{
    var r;
    let n;
    X.init(e, t);
    let i = (n = Object.values(r = t.entries).filter((e)=>"number" == typeof e), Object.entries(r).filter(([e, t])=>-1 === n.indexOf(+e)).map(([e, t])=>t)), a = new Set(i);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${i.filter((e)=>z.has(typeof e)).map((e)=>"string" == typeof e ? k(e) : e.toString()).join("|")})$`), e._zod.parse = (t, r)=>{
        let n = t.value;
        return a.has(n) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: n,
            inst: e
        }), t;
    };
}), es = l("$ZodLiteral", (e, t)=>{
    if (X.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? k(e) : e ? k(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (n, i)=>{
        let a = n.value;
        return r.has(a) || n.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
            inst: e
        }), n;
    };
});
function eo(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const el = l("$ZodOptional", (e, t)=>{
    X.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", m(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), m(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${h(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let n = t.innerType._zod.run(e, r);
            return n instanceof Promise ? n.then((t)=>eo(t, e.value)) : eo(n, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, r);
    };
}), ed = l("$ZodNullable", (e, t)=>{
    X.init(e, t), m(e._zod, "optin", ()=>t.innerType._zod.optin), m(e._zod, "optout", ()=>t.innerType._zod.optout), m(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${h(e.source)}|null)$`) : void 0;
    }), m(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), ec = l("$ZodCatch", (e, t)=>{
    X.init(e, t), m(e._zod, "optin", ()=>t.innerType._zod.optin), m(e._zod, "optout", ()=>t.innerType._zod.optout), m(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let n = t.innerType._zod.run(e, r);
        return n instanceof Promise ? n.then((n)=>(e.value = n.value, n.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: n.issues.map((e)=>O(e, r, p()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = n.value, n.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: n.issues.map((e)=>O(e, r, p()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ep = l("$ZodLazy", (e, t)=>{
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
const eu = l("ZodMiniType", (e, t)=>{
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
}), ef = l("ZodMiniString", (e, t)=>{
    q.init(e, t), eu.init(e, t);
});
function eh(e) {
    return new ef({
        type: "string",
        ...S(e)
    });
}
const e_ = l("ZodMiniNumber", (e, t)=>{
    V.init(e, t), eu.init(e, t);
});
function eg(e) {
    return new e_({
        type: "number",
        checks: [],
        ...S(e)
    });
}
const em = l("ZodMiniBoolean", (e, t)=>{
    H.init(e, t), eu.init(e, t);
});
function eb(e) {
    return new em({
        type: "boolean",
        ...S(e)
    });
}
const ey = l("ZodMiniNull", (e, t)=>{
    W.init(e, t), eu.init(e, t);
});
function ev(e) {
    return new ey({
        type: "null",
        ...S(e)
    });
}
const ew = l("ZodMiniUnknown", (e, t)=>{
    J.init(e, t), eu.init(e, t);
});
function ex() {
    return new ew({
        type: "unknown"
    });
}
const ez = l("ZodMiniNever", (e, t)=>{
    K.init(e, t), eu.init(e, t);
});
function ek(e) {
    return new ez({
        type: "never",
        ...S(e)
    });
}
const ej = l("ZodMiniArray", (e, t)=>{
    Q.init(e, t), eu.init(e, t);
});
function eS(e, t) {
    return new ej({
        type: "array",
        element: e,
        ...S(t)
    });
}
const eC = l("ZodMiniObject", (e, t)=>{
    ee.init(e, t), eu.init(e, t), m(e, "shape", ()=>t.shape);
});
function eA(e, t) {
    return new eC({
        type: "object",
        shape: e ?? {},
        ...S(t)
    });
}
const eP = l("ZodMiniUnion", (e, t)=>{
    er.init(e, t), eu.init(e, t);
});
function eO(e, t) {
    return new eP({
        type: "union",
        options: e,
        ...S(t)
    });
}
const eT = l("ZodMiniDiscriminatedUnion", (e, t)=>{
    en.init(e, t), eu.init(e, t);
});
function eU(e, t, r) {
    return new eT({
        type: "union",
        options: t,
        discriminator: e,
        ...S(r)
    });
}
const eE = l("ZodMiniRecord", (e, t)=>{
    ei.init(e, t), eu.init(e, t);
});
function e$(e, t, r) {
    return new eE({
        type: "record",
        keyType: e,
        valueType: t,
        ...S(r)
    });
}
const eN = l("ZodMiniEnum", (e, t)=>{
    ea.init(e, t), eu.init(e, t), e.options = Object.values(t.entries);
});
function eM(e, t) {
    return new eN({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...S(t)
    });
}
const eZ = l("ZodMiniLiteral", (e, t)=>{
    es.init(e, t), eu.init(e, t);
});
function eR(e, t) {
    return new eZ({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...S(t)
    });
}
const eD = l("ZodMiniOptional", (e, t)=>{
    el.init(e, t), eu.init(e, t);
});
function eF(e) {
    return new eD({
        type: "optional",
        innerType: e
    });
}
const eL = l("ZodMiniNullable", (e, t)=>{
    ed.init(e, t), eu.init(e, t);
});
function eI(e) {
    return new eL({
        type: "nullable",
        innerType: e
    });
}
const eB = l("ZodMiniCatch", (e, t)=>{
    ec.init(e, t), eu.init(e, t);
}), eX = l("ZodMiniLazy", (e, t)=>{
    ep.init(e, t), eu.init(e, t);
});
function eq() {
    let e = new eX({
        type: "lazy",
        getter: ()=>eO([
                eh(),
                eg(),
                eb(),
                ev(),
                eS(e),
                e$(eh(), e)
            ])
    });
    return e;
}
const eV = eO([
    eR("account_set_password"),
    eR("account_set_active")
]), eH = eA({
    id: eh(),
    name: eh()
}), eW = eA({
    success: eb(),
    output: eF(eh()),
    error: eF(eh())
}), eJ = eO([
    eR("factory"),
    eR("firmware"),
    eR("builtin")
]), eK = eA({
    detected: eb(),
    device: eh(),
    has_data: eb(),
    sha256: eh(),
    data: eh()
}), eG = eA({
    exists: eb(),
    path: eh(),
    size: eg(),
    sha256: eh(),
    data: eh()
}), eQ = eA({
    source: eJ,
    active_path: eh(),
    size: eg(),
    sha256: eh(),
    data: eh(),
    factory: eK,
    firmware: eG
}), eY = eA({
    error: eh()
});
eO([
    eQ,
    eY
]);
const e0 = eA({
    success: eb(),
    path: eh(),
    size: eg(),
    sha256: eh()
});
eO([
    e0,
    eY
]), eA({
    data: eh()
});
const e1 = eA({
    acs: eb(),
    mqtt: eb(),
    npu: eb(),
    "device-hl202": eb(),
    "device-hwtc": eb(),
    "device-star": eb(),
    "device-zte": eb()
}), e2 = eA({
    optical: eb(),
    bridge_offload: eb(),
    omci_mib: eb(),
    mqtt_telemetry: eb(),
    hl202_management: eb(),
    cwmp: eb(),
    command_provisioning: eb()
}), e6 = eA({
    status: eb(),
    config: eb(),
    sync: eb(),
    hardware: eb(),
    calibration: eb(),
    hl202: eb(),
    about: eb()
}), e4 = eA({
    schema_version: eR(1),
    version: eh(),
    features: e1,
    functions: e2,
    pages: e6,
    adapters: eS(eH)
});
eO([
    eA({
        valid: eb(),
        revision: eh(),
        devices: eg()
    }),
    eA({
        error: eh()
    })
]);
const e8 = eO([
    eR("auto"),
    eR("manual")
]), e5 = eR("diff"), e3 = eA({
    id: eh(),
    name: eO([
        eh(),
        ev()
    ]),
    template: eh()
}), e7 = eA({
    enabled: eb(),
    mode: e8,
    method: e5,
    revision: eh(),
    triggers: eS(eh()),
    interval_minutes: eg(),
    error: eO([
        eh(),
        ev()
    ]),
    devices: eS(ex()),
    management_network: ex(),
    omci_management: ex(),
    groups: eS(e3),
    pending_devices: eS(eh())
});
eO([
    e7,
    eY
]), eA({});
const e9 = eO([
    eA({
        optical_sn: eh(),
        onu_id: eg(),
        binding_generation: eh()
    }),
    eA({
        mqtt_mac: eh(),
        binding_generation: eh()
    })
]);
eA({
    target: e9
});
const te = eA({
    mqtt_mac: eh(),
    optical_sn: eO([
        eh(),
        ev()
    ]),
    onu_id: eO([
        eg(),
        ev()
    ]),
    binding_generation: eh(),
    last_seen: eg(),
    reason: eh()
}), tt = eA({
    optical_sn: eh(),
    onu_id: eg(),
    model: eh(),
    optical_online: eb(),
    can_execute: eb(),
    mqtt: eO([
        te,
        ev()
    ]),
    report_revision: eO([
        eg(),
        ev()
    ])
});
eA({
    target: e9,
    script: eh(),
    timeout_seconds: eg()
});
const tr = eA({
    code: eh(),
    message: eh()
});
eO([
    eA({
        schema_version: eR(1),
        devices: eS(tt),
        sources: eS(te)
    }),
    eA({
        schema_version: eg(),
        error: tr
    })
]), eA({
    target: e9
}), eA({
    target: e9,
    kind: eV,
    entry: eg(),
    password: eh(),
    active: eb()
});
const tn = eR("pending"), ti = eA({
    phase: eO([
        eR("starting"),
        eR("upload"),
        eR("tables")
    ]),
    received: eg(),
    expected: eO([
        eg(),
        ev()
    ])
}), ta = eR("ready"), ts = eO([
    eA({
        status: tn,
        progress: eF(ti)
    }),
    eA({
        status: ta,
        chunk: eg(),
        chunks: eg(),
        bytes: eg(),
        data: eh()
    })
]);
eO([
    ts,
    eY
]);
const to = eA({
    status: tn,
    job: eh()
}), tl = eA({
    released: eb()
});
eA({
    job: eh()
}), eA({
    job: eh(),
    chunk: eg()
}), eO([
    to,
    eY
]);
const td = eA({
    accepting: eb(),
    running: eg(),
    stored: eg(),
    bytes: eg(),
    running_limit: eg(),
    stored_limit: eg(),
    bytes_limit: eg(),
    result_bytes_limit: eg()
});
eA({
    onu_id: eg(),
    optical_sn: eh(),
    tables: eb()
});
const tc = eO([
    eA({
        status: eR("success"),
        enabled: eb()
    }),
    eA({
        status: eR("error"),
        error: eh()
    })
]);
eA({
    enabled: eb(),
    bridge: eh()
});
const tp = eA({
    index: eh(),
    state: eh(),
    pkt_type: eh(),
    orig_tuple: eh(),
    new_tuple: eh(),
    eth: eh(),
    vlan: eh(),
    packets: eg(),
    bytes: eg(),
    counters_valid: eb(),
    packets_exact: eh(),
    bytes_exact: eh()
}), tu = eA({
    sampled_at_ms: eg(),
    errors: eS(eh()),
    config_valid: eb(),
    engine_valid: eb(),
    mask_valid: eb(),
    routed_mask_valid: eb(),
    debug_valid: eb(),
    flows_valid: eb(),
    entries_valid: eb(),
    counters_valid: eb(),
    hooks_valid: eb(),
    total_packets_exact: eh(),
    total_bytes_exact: eh(),
    supported: eb(),
    engine_attached: eb(),
    bridge_offload_enabled: eb(),
    bridge_offload_mask: eg(),
    routed_offload_mask: eg(),
    bridge_offload_debug: eb(),
    bridge: eh(),
    active_ports: eS(eh()),
    fw4_hooks_ready: eb(),
    total_entries: eg(),
    bound_entries: eg(),
    bound_ipv4_entries: eg(),
    bound_ipv6_entries: eg(),
    total_packets: eg(),
    total_bytes: eg(),
    bound_flows: eS(tp)
}), tf = eO([
    eR("plan"),
    eR("apply")
]), th = eO([
    eR("optical_on"),
    eR("optical_off"),
    eR("optical_status"),
    eR("optical_reload"),
    eR("optical_reinitialize"),
    eR("optical_shutdown")
]), t_ = eO([
    eR("success"),
    eR("error")
]), tg = eO([
    eR("enabled"),
    eR("disabled"),
    eR("unknown")
]), tm = eA({
    schema_version: eR(1),
    status: t_,
    action: th,
    desired_enabled: eO([
        eb(),
        ev()
    ]),
    tx_enabled: eO([
        eb(),
        ev()
    ]),
    actor_state: tg,
    hardware_ready: eb(),
    discovery_active: eb(),
    cleanup_pending: eb(),
    error: eO([
        tr,
        ev()
    ])
});
eA({
    enabled: eb()
}), eA({
    restarting: eb()
});
const tb = eA({
    calls: eg(),
    failures: eg(),
    last_us: eg(),
    max_us: eg(),
    total_us: eg()
});
eA({
    ubus: eF(e$(eh(), tb)),
    jobs: eF(td),
    onu_pinning: eF(ex()),
    fpga_status: eh(),
    provisioning: ex(),
    optical_transceiver: ex(),
    switch_ports: eS(ex()),
    sub_gateways: eS(ex()),
    telemetry_gateways: eS(ex()),
    npu: eF(ex()),
    ipc: eF(ex())
});
const ty = eO([
    eR("plan"),
    eR("apply"),
    eR("management_plan"),
    eR("management_apply"),
    eR("reset_state"),
    eR("reconcile"),
    eR("retry")
]);
eO([
    eA({
        operation_ids: eS(eg()),
        revision: eh()
    }),
    eA({
        started: eb(),
        mode: tf
    }),
    eA({
        reset: eb(),
        device: eh()
    }),
    eA({
        operation_ids: eS(eg()),
        mode: tf,
        reconcile: eF(eb()),
        retry: eF(eb())
    }),
    eY
]), eA({
    action: ty,
    target: eh(),
    management: eF(eb()),
    item: eF(eh())
});
let tv = eA({
    error: eO([
        eh(),
        eA({
            code: eh(),
            message: eh()
        })
    ])
});
class tw extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function tx(e) {
    let t = tv.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new tw("rpc", e) : new tw(e.code, e.message);
    }
    return e;
}
let tz = eh(), tk = eg(), tj = eb();
eA({
    optical_sn: tz,
    onu_id: tk,
    binding_generation: tz
}), eA({
    mqtt_mac: tz,
    binding_generation: tz
});
let tS = eA({
    mqtt_mac: tz,
    optical_sn: eI(tz),
    onu_id: eI(tk),
    binding_generation: tz,
    last_seen: tk,
    reason: tz
}), tC = {
    target: tz,
    request_id: eF(tz),
    output: eF(tz),
    output_truncated: tj,
    error: eF(tz)
};
const tA = eU("status", [
    eA({
        ...tC,
        status: eR("executed"),
        exit_code: eI(tk)
    }),
    eA({
        ...tC,
        status: eR("dispatched"),
        exit_code: eF(ek())
    }),
    eA({
        ...tC,
        status: eR("timeout"),
        exit_code: eF(ek())
    }),
    eA({
        ...tC,
        status: eR("error"),
        exit_code: eF(ek())
    })
]);
let tP = eA({
    target: tS,
    result: tA,
    binding_current: tj
}), tO = eA({
    schema_version: tk,
    compressed_bytes: tk,
    decompressed_bytes: tk,
    fields: e$(tz, eA({
        value: eq(),
        member: tz,
        unit: eI(tz)
    })),
    members: eS(eA({
        name: tz,
        bytes: tk,
        encoding: tz,
        text: eI(tz),
        text_omitted: tj
    })),
    errors: eS(tz)
}), tT = eA({
    revision: tk,
    last_received: tk,
    last_processed_receipt: eI(tk),
    last_good: eI(tk),
    error: eI(tz),
    report: eI(tO)
}), tU = {
    schema_version: eR(1),
    target: tS,
    report: eI(tT)
};
eO([
    eA({
        ...tU,
        state: eM([
            "received",
            "report_unavailable"
        ])
    }),
    eA({
        ...tU,
        read_only: eR(!0)
    })
]);
const tE = eA({
    schema_version: eR(1),
    devices: eS(eA({
        optical_sn: tz,
        onu_id: tk,
        model: tz,
        optical_online: tj,
        can_execute: tj,
        mqtt: eI(tS),
        report_revision: eI(tk)
    })),
    sources: eS(tS)
});
eA({
    schema_version: eR(1),
    operation: tP,
    accounts: eI(eS(eA({
        entry: eO([
            eR(0),
            eR(1),
            eR(2)
        ]),
        username: tz,
        active: tj
    }))),
    write_status: eM([
        "not_applicable",
        "accepted_and_saved",
        "unconfirmed"
    ])
}), eA({
    schema_version: eR(1),
    operation: tP
});
let t$ = eh(), tN = eg(), tM = eb(), tZ = eF(t$), tR = eF(tN), tD = eF(tM);
const tF = eM([
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
]), tL = eM([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), tI = eA({
    id: t$,
    name: eF(eI(t$)),
    kind: eM([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: t$,
    state: t$,
    reason: tZ,
    revision: tZ,
    current_revision: tD,
    management_fresh: tD,
    operation_id: tR,
    task_id: eF(eI(tN)),
    updated_at: tR,
    changes: eF(eS(eA({
        name: t$,
        desired: t$
    })))
});
let tB = eA({
    state: t$,
    reason: tZ,
    task_id: eF(eI(tN)),
    instance: tR
});
const tX = eA({
    cwmp_id: t$,
    state: eM([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: tM,
    last_inform: eI(tN),
    age_seconds: eI(tN)
});
let tq = eA({
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
    method: tZ,
    reason: tZ,
    mqtt_target: eI(t$),
    binding_source: tZ,
    link_identity_error: eI(t$),
    mqtt_last_seen: eI(tN),
    cwmp_id: tZ,
    desired_version: tZ,
    generation: tR,
    inflight: tD,
    attempts: tR,
    next_retry_at: tR,
    updated_at: tR,
    settings_verified_at: eI(tN),
    last_inform: eI(tN),
    last_error: eF(eI(t$)),
    persistence_error: eF(eI(t$)),
    desired: eF(eI(eA({
        vlan: tN,
        vlans: eS(tN),
        priority: tN,
        acs_url: t$
    }))),
    listener: eF(eA({
        enabled: tM,
        listen: t$,
        path: t$,
        error: eI(t$)
    })),
    endpoint_notice: tZ,
    manual_steps: eF(eS(t$))
});
const tV = eU("state", [
    tq,
    function(e, t) {
        if (!x(t)) throw Error("Invalid input to extend: expected a plain object");
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
                return b(this, "shape", r), r;
            }
        });
        return j(e, n);
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
                    t[e] && (n[e] = eD ? new eD({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)n[e] = eD ? new eD({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return b(this, "shape", n), n;
            },
            checks: []
        });
        return j(e, n);
    }(tq), {
        state: eM([
            "pending",
            "unavailable"
        ]),
        reason: t$
    })
]), tH = eA({
    backend: eF(eA({
        configured: t$,
        effective: t$,
        available: eS(t$),
        reason: t$
    })),
    state: tF,
    operation_id: tR,
    device: tZ,
    optical_sn: tZ,
    cwmp_id: tZ,
    revision: tZ,
    mode: eF(eM([
        "apply",
        "plan"
    ])),
    started_at: tR,
    current_revision: tD,
    management_fresh: tD,
    reason: tZ,
    error: tZ,
    attempts: tR,
    next_retry_at: tR,
    reconcile_reason: tZ,
    items: eS(tI),
    cwmp_contract: eF(eA({
        state: t$,
        requested: t$,
        contract: eI(t$),
        reason: t$,
        cache_hit: tM,
        schema: t$,
        capabilities: eI(eA({
            wan: t$,
            wlan: t$,
            binding: t$
        }))
    })),
    wan_objects: eF(e$(t$, eq())),
    wan_lifecycle: eF(e$(t$, tB)),
    wan_stage: eF(eM([
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
    wifi_objects: eF(eA({
        owned: eS(tN),
        pending: eI(t$),
        pending_instance: eI(tN)
    })),
    wifi_lifecycle: eF(e$(t$, tB)),
    wifi_stage: eF(eM([
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
    wifi_cleanup: eF(eM([
        "disable",
        "preserve",
        "delete"
    ]))
});
let tW = eA({
    enabled: tM,
    mode: eM([
        "auto",
        "manual"
    ]),
    vlan: eS(tN),
    priority: tN,
    address: t$,
    acs_url: t$,
    port: tN,
    path: t$,
    dhcp_enabled: tM
}), tJ = eA({
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
    error: eI(t$),
    inflight: tM,
    ready: tM,
    desired_version: eI(t$),
    applied_version: eI(t$),
    next_retry_at: tN,
    attempts: tN,
    desired: eI(tW),
    applied: eI(tW),
    previous: eI(tW),
    plan: eS(eA({
        operation: t$,
        key: t$,
        value: eS(t$)
    }))
});
const tK = eA({
    device: t$,
    name: eI(t$),
    group: eI(t$),
    group_name: eI(t$),
    template: eI(t$),
    template_name: eI(t$),
    optical_sn: t$,
    adapter: t$,
    omci_management: eA({
        state: t$,
        reason: eF(eI(t$))
    }),
    management: eI(tX),
    acs_bootstrap: tV,
    provisioning: tH,
    services: eS(tI),
    ssids: eS(tI),
    wifi_sync: tL
}), tG = eA({
    enabled: tM,
    mode: eM([
        "auto",
        "manual"
    ]),
    method: eR("diff"),
    revision: t$,
    triggers: eS(t$),
    interval_minutes: new e_({
        type: "number",
        coerce: !0,
        checks: [],
        ...S(void 0)
    }),
    error: eI(t$),
    devices: eS(tK),
    management_network: tJ,
    omci_management: eq(),
    groups: eS(eA({
        id: t$,
        name: eI(t$),
        template: t$
    })),
    pending_devices: eS(t$)
}), tQ = eO([
    eA({
        valid: eR(!0),
        revision: t$,
        devices: tN,
        error: eF(ek())
    }),
    eA({
        error: t$,
        valid: eF(ek()),
        revision: eF(ek()),
        devices: eF(ek())
    })
]), tY = eA({
    restarting: eR(!0)
}), t0 = eO([
    eA({
        operation_ids: eS(tN),
        revision: t$
    }),
    eA({
        started: eR(!0),
        mode: eM([
            "apply",
            "plan"
        ])
    }),
    eA({
        reset: eR(!0),
        device: t$
    }),
    eA({
        operation_ids: eS(tN),
        mode: eM([
            "apply",
            "plan"
        ]),
        reconcile: tD,
        retry: tD
    })
]);
let t1 = eh(), t2 = eg(), t6 = eI(t2), t4 = e$(t1, eA({
    source: t1,
    unit: t1,
    reason: eI(t1),
    raw: eI(t1),
    age_seconds: t6
}));
const t8 = eA({
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
    generation: t2,
    error: eI(t1)
}), t5 = eM([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let t3 = eA({
    model: t1,
    wavelength_tx_nm: t2,
    wavelength_rx_nm: t2,
    phy_rate_downlink_gbps: t2,
    phy_rate_uplink_gbps: t2,
    tx_power_dbm: t6,
    laser_bias_current_ma: t6,
    temperature_celsius: t6,
    vcc_voltage: t6,
    cdr_locked: eI(eb()),
    tx_enabled: eI(eb()),
    measurements: t4
}), t7 = eA({
    equipment_id: eI(t1),
    hardware_version: eI(t1),
    software_images: eS(t1),
    omcc_version: t6,
    errors: eS(t1)
});
const t9 = eA({
    onu_id: t2,
    vendor: t1,
    model: t1,
    serial_number: t1,
    state: t5,
    business_status: t8,
    management: eI(tX),
    provisioning: eI(tH),
    services: eS(tI),
    ssids: eS(tI),
    wifi_sync: tL,
    acs_bootstrap: eF(tV),
    identity: eI(t7),
    identity_age_seconds: t6,
    identity_current: eb(),
    fiber_distance_m: t6,
    ranging_delay_rtd_ns: t6,
    equalization_delay_bits: new eB({
        type: "catch",
        innerType: t6,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: t6,
    optical_tx_power_dbm: t6,
    firmware_version: t1,
    hardware_version: t1,
    uptime_seconds: t6,
    data_path: eA({
        interface: t1,
        gem_ports: eI(eS(t2)),
        vlan_id: t6,
        tx_bytes: t6,
        rx_bytes: t6,
        current_tx_kbps: t6,
        current_rx_kbps: t6,
        offload: eF(eA({
            enabled: eF(eI(eb())),
            routed_enabled: eF(eI(eb())),
            bridge_enabled: eF(eI(eb())),
            engine_attached: eF(eI(eb())),
            forwarding_verified: eF(eI(eb()))
        })),
        measurements: t4
    }),
    wifi_mesh: eA({
        channel_2g: t6,
        channel_5g: t6,
        bandwidth_5g: eI(t1),
        tx_power_pct: t6,
        measurements: t4
    }),
    connected_clients: eI(eS(eA({
        mac: t1,
        ip: t1,
        band: t1,
        rssi_dbm: t6,
        rx_rate_mbps: t6,
        tx_rate_mbps: t6
    }))),
    measurements: t4
});
let re = eA({
    reserved_sn: eF(t1),
    port: t2,
    interface: t1,
    carrier: eb(),
    status: t1,
    onu_id: eF(t2),
    onu_sn: eF(t1),
    link_state: t1
});
const rt = eA({
    counters_valid: eF(eb()),
    packets_exact: eF(t1),
    bytes_exact: eF(t1),
    index: t1,
    state: t1,
    pkt_type: t1,
    orig_tuple: t1,
    new_tuple: t1,
    eth: t1,
    vlan: t1,
    packets: t2,
    bytes: t2
}), rr = eA({
    sampled_at_ms: eF(t2),
    errors: eF(eS(t1)),
    config_valid: eF(eb()),
    engine_valid: eF(eb()),
    mask_valid: eF(eb()),
    routed_mask_valid: eF(eb()),
    debug_valid: eF(eb()),
    flows_valid: eF(eb()),
    entries_valid: eF(eb()),
    counters_valid: eF(eb()),
    hooks_valid: eF(eb()),
    total_packets_exact: eF(t1),
    total_bytes_exact: eF(t1),
    supported: eb(),
    engine_attached: eb(),
    bridge_offload_enabled: eb(),
    bridge_offload_mask: t2,
    routed_offload_mask: t2,
    bridge_offload_debug: eb(),
    bridge: t1,
    active_ports: eS(t1),
    fw4_hooks_ready: eb(),
    total_entries: t2,
    bound_entries: t2,
    total_packets: t2,
    total_bytes: t2,
    bound_flows: eS(rt)
}), rn = eA({
    ubus: eF(e$(t1, tb)),
    jobs: eF(td),
    onu_pinning: eF(eA({
        desired: e$(t1, t2),
        active: e$(t1, t2),
        pending_restart: eb(),
        allocation_blocked: eb(),
        startup_error: eI(t1),
        config_error: eI(t1)
    })),
    fpga_status: t1,
    provisioning: eI(tG),
    optical_transceiver: t3,
    switch_ports: eS(re),
    sub_gateways: eS(t9),
    telemetry_gateways: eS(eA({
        id: t1,
        last_seen_sec_ago: t2,
        last_payload_bytes: t2
    })),
    npu: eF(eI(rr))
});
e$(t1, eA({
    carrier: eF(eb()),
    mac: eF(t1),
    link: eF(eA({
        speed: eF(t2),
        duplex: eF(t1),
        autoneg: eF(eb())
    })),
    stats: eF(e$(t1, t2))
}));
const ri = {
    getCapabilities: {
        parse: (e)=>e4.parse(tx(e))
    },
    opticalStatus: tm,
    opticalSet: tm,
    getStatus: {
        parse: (e)=>rn.parse(tx(e))
    },
    getSync: {
        parse: (e)=>tG.parse(tx(e))
    },
    configCheck: tQ,
    npuStatus: tu,
    configReload: {
        parse: (e)=>tG.parse(tx(e))
    },
    restartService: {
        parse: (e)=>tY.parse(tx(e))
    },
    sync: {
        parse: (e)=>t0.parse(tx(e))
    },
    npuSet: tc,
    mibStart: {
        parse: (e)=>to.parse(tx(e))
    },
    mibResult: {
        parse: (e)=>ts.parse(tx(e))
    },
    jobRelease: {
        parse: (e)=>tl.parse(tx(e))
    },
    hl202List: {
        parse: (e)=>tE.parse(tx(e))
    },
    hl202Report: {
        parse: (e)=>to.parse(tx(e))
    },
    hl202AccountsStart: {
        parse: (e)=>to.parse(tx(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>to.parse(tx(e))
    },
    hl202ExecStart: {
        parse: (e)=>to.parse(tx(e))
    },
    jobResult: {
        parse: (e)=>ts.parse(tx(e))
    },
    getCalibration: {
        parse: (e)=>eQ.parse(tx(e))
    },
    saveCalibration: {
        parse: (e)=>e0.parse(tx(e))
    },
    applyCalibration: {
        parse: (e)=>to.parse(tx(e))
    }
};
function ra() {
    var e;
    let r, n, i, a, s, o, l, d, c, p, u, f, h, g, m, b, y, v, w, x, z, k, j;
    return t ??= (e = L.rpc, r = e.declare({
        object: "fttr",
        method: "get_capabilities",
        reject: !0
    }), n = e.declare({
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
        getCapabilities: async ()=>ri.getCapabilities.parse(await r()),
        opticalStatus: async ()=>ri.opticalStatus.parse(await n()),
        opticalSet: async (e)=>ri.opticalSet.parse(await i(e.enabled)),
        getStatus: async ()=>ri.getStatus.parse(await a()),
        getSync: async ()=>ri.getSync.parse(await s()),
        configCheck: async ()=>ri.configCheck.parse(await o()),
        npuStatus: async ()=>ri.npuStatus.parse(await l()),
        configReload: async ()=>ri.configReload.parse(await d()),
        restartService: async ()=>ri.restartService.parse(await c()),
        sync: async (e)=>ri.sync.parse(await p(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>ri.npuSet.parse(await u(e.enabled, e.bridge)),
        mibStart: async (e)=>ri.mibStart.parse(await f(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>ri.mibResult.parse(await h(e.job, e.chunk)),
        jobRelease: async (e)=>ri.jobRelease.parse(await g(e.job)),
        hl202List: async ()=>ri.hl202List.parse(await m()),
        hl202Report: async (e)=>ri.hl202Report.parse(await b(e.target)),
        hl202AccountsStart: async (e)=>ri.hl202AccountsStart.parse(await y(e.target)),
        hl202AccountUpdate: async (e)=>ri.hl202AccountUpdate.parse(await v(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>ri.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>ri.jobResult.parse(await x(e.job, e.chunk)),
        getCalibration: async ()=>ri.getCalibration.parse(await z()),
        saveCalibration: async (e)=>ri.saveCalibration.parse(await k(e.data)),
        applyCalibration: async ()=>ri.applyCalibration.parse(await j())
    });
}
async function rs(e) {
    let t, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : tx, n = to.parse(tx(e)), i = Date.now() + 330000, a = window.location.pathname, s = [], o = 0;
    try {
        for(let e = 0; e < 128;){
            if (window.location.pathname !== a) throw new tw("navigation", _("Result polling stopped after leaving the page. The backend job is not cancelled."));
            if (Date.now() > i) throw new tw("timeout", _("Job polling timed out; execution outcome is unknown. Do not automatically retry."));
            let l = await ra().jobResult({
                job: n.job,
                chunk: e
            });
            if ("pending" === l.status) {
                await new Promise((e)=>window.setTimeout(e, 1000));
                continue;
            }
            if (!Number.isInteger(l.chunks) || l.chunks < 1 || l.chunks > 128 || l.chunk !== e || !Number.isInteger(l.bytes) || l.bytes < 1 || l.bytes > 4194304 || l.data.length > 43692) throw new tw("transport", _("Invalid job result"));
            if (t && (l.chunks !== t.chunks || l.bytes !== t.bytes)) throw new tw("transport", _("Inconsistent job result chunks"));
            t = {
                chunks: l.chunks,
                bytes: l.bytes
            };
            let d = Uint8Array.from(atob(l.data), (e)=>e.charCodeAt(0));
            if (d.length > 32768 || o + d.length > l.bytes) throw new tw("transport", _("Job result exceeds the transport limit"));
            if (s.push(d), o += d.length, ++e === l.chunks) {
                if (o !== l.bytes) throw new tw("transport", _("Incomplete job result"));
                let e = new Uint8Array(o), t = 0;
                for (let r of s)e.set(r, t), t += r.length;
                return r(JSON.parse(new TextDecoder("utf-8", {
                    fatal: !0
                }).decode(e)));
            }
        }
        throw new tw("transport", _("Too many result chunks"));
    } finally{
        await ra().jobRelease({
            job: n.job
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
const ro = async ()=>ra().getCalibration(), rl = async (e)=>ra().saveCalibration({
        data: e
    }), rd = async ()=>eW.parse(await rs(await ra().applyCalibration(), (e)=>{
        let t = eW.safeParse(e);
        return t.success ? t.data : tx(e);
    }));
async function rc(e) {
    return window.crypto?.subtle ? Array.from(new Uint8Array(await window.crypto.subtle.digest("SHA-256", e))).map((e)=>e.toString(16).padStart(2, "0")).join("") : _("Unavailable");
}
function rp(e) {
    let t = window.atob(e), r = t.length, n = new Uint8Array(r);
    for(let e = 0; e < r; e++)n[e] = t.charCodeAt(e);
    return n.buffer;
}
function ru(e, t) {
    let r = new Uint8Array(e), n = r.byteLength;
    if (288 !== n && 56 !== n) return null;
    let i = new DataView(e), a = [];
    for(let e = 0; e < Math.min(56, n); e++)a.push(r[e]);
    let s = n >= 0x46 ? {
        n: i.getUint16(0x40, !1),
        d: i.getUint16(0x42, !1),
        o: i.getInt16(0x44, !1)
    } : {
        n: 7142,
        d: 4096,
        o: -24780
    }, o = n >= 0x4c ? {
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
function rf(e, t, r) {
    var n, i, a, s, l, d, c, p, u, f, h, g, m, b, y, v, w, x, z, k, j, S, C, A, P, O, T, U, $, N, M, Z, R, D, F;
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
                            B,
                            I
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
                                    title: _("Register %s: %s (%s)").format(`0x${i.toString(16).padStart(2, "0").toUpperCase()}`, `0x${e.toString(16).padStart(2, "0").toUpperCase()}`, String(e)),
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
                                    children: _("\u2014")
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
                                }, o("thead", n)),
                                o("tbody", {
                                    children: l
                                })
                            ]
                        }, o("table", i)),
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
    load: ()=>ro(),
    render: (e)=>(function(e) {
            var t, r, n, i, a, s, l, d, c, p, u;
            let f = document.createElement("div");
            f.className = "fttr-calibration";
            let h = null, g = null, m = o("div", {}), b = o("div", {}), y = o("div", {}), v = o("div", {});
            function w(e) {
                var t, r, n, i, a, s, l, d, c, p, u, f, h, g, y, v, w, x, z, k, j, S;
                m.innerHTML = "", b.innerHTML = "", "builtin" === e.source && m.appendChild((n = {
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
                }, o("div", n)));
                let C = null;
                if (e.data) try {
                    let t = rp(e.data);
                    C = ru(t, e.sha256);
                } catch  {}
                let A = null;
                if (e.factory.has_data && e.factory.data) try {
                    let t = rp(e.factory.data);
                    A = ru(t, e.factory.sha256);
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
                                        (i = {
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
                            children: rf(A, _("Downstream optical calibration parameters extracted from the 1MB Factory partition (offset %s)").format("0x2200"), "factory" === e.source ? _("Device: %s, length %s bytes (currently in use by the system)").format(e.factory.device, "288") : _("Device: %s, length %s bytes").format(e.factory.device, "288"))
                        }),
                        (!e.factory.has_data || "factory" !== e.source) && C && o("div", {
                            style: "margin-top:16px",
                            children: rf(C, _("Currently active system calibration parameters (%s)").format(e.active_path), _("Active data size: %s bytes").format(String(e.size)))
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
            }, o("div", n));
            async function S(e) {
                var t, r, n, i, a, s, l, d, c, p, u, f;
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
                    let r = await rc(t), f = ru(t, r);
                    if (!f) return void v.appendChild((a = {
                        class: "alert-message danger",
                        children: [
                            (n = {
                                style: "margin:0 0 6px",
                                children: _("Failed to parse calibration file")
                            }, o("h4", n)),
                            (i = {
                                style: "margin:0",
                                children: _("Unable to parse the calibration file structure. Please check the file's integrity.")
                            }, o("p", i))
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
                    }, o("div", u))), y.appendChild(rf(f, _("Parameter preview for upload: %s").format(e.name)));
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
                    var e, t, r, n, i, a;
                    z.disabled = !0, z.textContent = _("Uploading to %s...").format("/lib/firmware/modified_UX3326.bin"), v.innerHTML = "";
                    try {
                        let a = function(e) {
                            let t = "", r = new Uint8Array(e), n = r.byteLength;
                            for(let e = 0; e < n; e++)t += String.fromCharCode(r[e]);
                            return window.btoa(t);
                        }(h), s = x.checked, l = await rl(a);
                        if (!l.success) throw Error(_("Failed to save calibration file"));
                        let d = "";
                        if (s) {
                            z.textContent = _("Configuring BOSA optical transceiver hardware...");
                            let e = await rd();
                            d = e.success ? _(", and the optical transceiver hardware was reset and the register table was latched successfully (%s succeeded)").format("bosa-init") : _(", but optical transceiver hardware initialization reported a warning: %s").format(e.error || _("Unknown error"));
                        }
                        v.appendChild((i = {
                            class: "alert-message success",
                            children: [
                                (e = {
                                    style: "margin:0 0 6px",
                                    children: _("Calibration data saved successfully!")
                                }, o("h4", e)),
                                (n = {
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
                                }, o("p", n))
                            ]
                        }, o("div", i)));
                        let c = await ro();
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
                    (i = {
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
                    }, o("p", i)),
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