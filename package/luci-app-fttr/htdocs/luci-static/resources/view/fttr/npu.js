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
class d extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const c = {};
function u(e) {
    return e && Object.assign(c, e), c;
}
function p(e, t) {
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
function g(e) {
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const h = Symbol("evaluating");
function m(e, t, n) {
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
function b(...e) {
    let t = {};
    for (let n of e)Object.assign(t, Object.getOwnPropertyDescriptors(n));
    return Object.defineProperties({}, t);
}
const y = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function w(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function z(e) {
    if (!1 === w(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let n = t.prototype;
    return !1 !== w(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
}
const k = new Set([
    "string",
    "number",
    "symbol"
]);
function j(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function x(e, t, n) {
    let r = new e._zod.constr(t ?? e._zod.def);
    return (!t || n?.parent) && (r._zod.parent = e), r;
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
function P(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let n = t; n < e.issues.length; n++)if (e.issues[n]?.continue !== !0) return !0;
    return !1;
}
function $(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function O(e) {
    return "string" == typeof e ? e : e?.message;
}
function T(e, t, n) {
    let r = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (r.message = O(e.inst?._zod.def?.error?.(e)) ?? O(t?.error?.(e)) ?? O(n.customError?.(e)) ?? O(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
const Z = (e, t)=>{
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
}, N = l("$ZodError", Z), A = l("$ZodError", Z, {
    Parent: Error
}), C = (n = A, (e, t, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise) throw new d();
    if (s.issues.length) {
        let e = new (i?.Err ?? n)(s.issues.map((e)=>T(e, a, u())));
        throw y(e, i?.callee), e;
    }
    return s.value;
}), R = (r = A, async (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (i?.Err ?? r)(s.issues.map((e)=>T(e, a, u())));
        throw y(e, i?.callee), e;
    }
    return s.value;
}), M = (i = A, (e, t, n)=>{
    let r = n ? {
        ...n,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, r);
    if (a instanceof Promise) throw new d();
    return a.issues.length ? {
        success: !1,
        error: new (i ?? N)(a.issues.map((e)=>T(e, r, u())))
    } : {
        success: !0,
        data: a.value
    };
}), U = (a = A, async (e, t, n)=>{
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
        error: new a(i.issues.map((e)=>T(e, r, u())))
    } : {
        success: !0,
        data: i.value
    };
}), q = /^-?\d+(?:\.\d+)?$/, D = /^(?:true|false)$/i, F = /^null$/i, I = {
    major: 4,
    minor: 3,
    patch: 6
}, V = l("$ZodType", (e, t)=>{
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
            let r, i = P(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, s = a._zod.check(e);
                if (s instanceof Promise && n?.async === !1) throw new d();
                if (r || s instanceof Promise) r = (r ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (i || (i = P(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = P(e, t));
                }
            }
            return r ? r.then(()=>e) : e;
        }, n = (n, i, a)=>{
            if (P(n)) return n.aborted = !0, n;
            let s = t(i, r, a);
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
                return t instanceof Promise ? t.then((e)=>n(e, i, a)) : n(t, i, a);
            }
            let s = e._zod.parse(i, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new d();
                return s.then((e)=>t(e, r, a));
            }
            return t(s, r, a);
        };
    }
    m(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = M(e, t);
                    return n.success ? {
                        value: n.data
                    } : {
                        issues: n.error?.issues
                    };
                } catch (n) {
                    return U(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), B = l("$ZodString", (e, t)=>{
    var n;
    let r;
    V.init(e, t), e._zod.pattern = [
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
}), W = l("$ZodNumber", (e, t)=>{
    V.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? q, e._zod.parse = (n, r)=>{
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
}), J = l("$ZodBoolean", (e, t)=>{
    V.init(e, t), e._zod.pattern = D, e._zod.parse = (n, r)=>{
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
}), K = l("$ZodNull", (e, t)=>{
    V.init(e, t), e._zod.pattern = F, e._zod.values = new Set([
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
}), X = l("$ZodUnknown", (e, t)=>{
    V.init(e, t), e._zod.parse = (e)=>e;
}), G = l("$ZodNever", (e, t)=>{
    V.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function H(e, t, n) {
    e.issues.length && t.issues.push(...$(n, e.issues)), t.value[n] = e.value;
}
const Q = l("$ZodArray", (e, t)=>{
    V.init(e, t), e._zod.parse = (n, r)=>{
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
            o instanceof Promise ? a.push(o.then((t)=>H(t, n, e))) : H(o, n, e);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
});
function Y(e, t, n, r, i) {
    if (e.issues.length) {
        if (i && !(n in r)) return;
        t.issues.push(...$(n, e.issues));
    }
    void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const ee = l("$ZodObject", (e, t)=>{
    let n;
    V.init(e, t);
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
    let i = f(()=>(function(e) {
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
    m(e._zod, "propValues", ()=>{
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
                }, r);
                a instanceof Promise ? e.push(a.then((e)=>Y(e, n, i, t, c))) : Y(a, n, i, t, c);
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
    let i = e.filter((e)=>!P(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>T(e, r, u())))
    }), t);
}
const en = l("$ZodUnion", (e, t)=>{
    V.init(e, t), m(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), m(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), m(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), m(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>g(e.source)).join("|")})$`);
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
    m(e._zod, "propValues", ()=>{
        let e = {};
        for (let n of t.options){
            let r = n._zod.propValues;
            if (!r || 0 === Object.keys(r).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
            for (let [t, n] of Object.entries(r))for (let r of (e[t] || (e[t] = new Set()), n))e[t].add(r);
        }
        return e;
    });
    let r = f(()=>{
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
    V.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!z(i)) return n.issues.push({
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
                    t.issues.length && n.issues.push(...$(e, t.issues)), n.value[e] = t.value;
                })) : (s.issues.length && n.issues.push(...$(e, s.issues)), n.value[e] = s.value);
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
            if ("string" == typeof s && q.test(s) && o.issues.length) {
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
                    issues: o.issues.map((e)=>T(e, r, u())),
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
                e.issues.length && n.issues.push(...$(s, e.issues)), n.value[o.value] = e.value;
            })) : (l.issues.length && n.issues.push(...$(s, l.issues)), n.value[o.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
}), ea = l("$ZodEnum", (e, t)=>{
    var n;
    let r;
    V.init(e, t);
    let i = (r = Object.values(n = t.entries).filter((e)=>"number" == typeof e), Object.entries(n).filter(([e, t])=>-1 === r.indexOf(+e)).map(([e, t])=>t)), a = new Set(i);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${i.filter((e)=>k.has(typeof e)).map((e)=>"string" == typeof e ? j(e) : e.toString()).join("|")})$`), e._zod.parse = (t, n)=>{
        let r = t.value;
        return a.has(r) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: r,
            inst: e
        }), t;
    };
}), es = l("$ZodLiteral", (e, t)=>{
    if (V.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? j(e) : e ? j(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i)=>{
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
    V.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", m(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), m(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${g(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let r = t.innerType._zod.run(e, n);
            return r instanceof Promise ? r.then((t)=>eo(t, e.value)) : eo(r, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, n);
    };
}), ed = l("$ZodNullable", (e, t)=>{
    V.init(e, t), m(e._zod, "optin", ()=>t.innerType._zod.optin), m(e._zod, "optout", ()=>t.innerType._zod.optout), m(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${g(e.source)}|null)$`) : void 0;
    }), m(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), ec = l("$ZodCatch", (e, t)=>{
    V.init(e, t), m(e._zod, "optin", ()=>t.innerType._zod.optin), m(e._zod, "optout", ()=>t.innerType._zod.optout), m(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, n)=>{
        if ("backward" === n.direction) return t.innerType._zod.run(e, n);
        let r = t.innerType._zod.run(e, n);
        return r instanceof Promise ? r.then((r)=>(e.value = r.value, r.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: r.issues.map((e)=>T(e, n, u()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = r.value, r.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: r.issues.map((e)=>T(e, n, u()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), eu = l("$ZodLazy", (e, t)=>{
    V.init(e, t), m(e._zod, "innerType", ()=>t.getter()), m(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), m(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), m(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), m(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n)=>e._zod.innerType._zod.run(t, n);
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
const ep = l("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    V.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>C(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>M(e, t, n), e.parseAsync = async (t, n)=>R(e, t, n, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, n)=>U(e, t, n), e.check = (...n)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, n)=>x(e, t, n), e.brand = ()=>e, e.register = (t, n)=>(t.add(e, n), e), e.apply = (t)=>t(e);
}), e_ = l("ZodMiniString", (e, t)=>{
    B.init(e, t), ep.init(e, t);
});
function ef(e) {
    return new e_({
        type: "string",
        ...S(e)
    });
}
const eg = l("ZodMiniNumber", (e, t)=>{
    W.init(e, t), ep.init(e, t);
});
function eh(e) {
    return new eg({
        type: "number",
        checks: [],
        ...S(e)
    });
}
const em = l("ZodMiniBoolean", (e, t)=>{
    J.init(e, t), ep.init(e, t);
});
function ev(e) {
    return new em({
        type: "boolean",
        ...S(e)
    });
}
const eb = l("ZodMiniNull", (e, t)=>{
    K.init(e, t), ep.init(e, t);
});
function ey(e) {
    return new eb({
        type: "null",
        ...S(e)
    });
}
const ew = l("ZodMiniUnknown", (e, t)=>{
    X.init(e, t), ep.init(e, t);
});
function ez() {
    return new ew({
        type: "unknown"
    });
}
const ek = l("ZodMiniNever", (e, t)=>{
    G.init(e, t), ep.init(e, t);
});
function ej(e) {
    return new ek({
        type: "never",
        ...S(e)
    });
}
const ex = l("ZodMiniArray", (e, t)=>{
    Q.init(e, t), ep.init(e, t);
});
function eS(e, t) {
    return new ex({
        type: "array",
        element: e,
        ...S(t)
    });
}
const eP = l("ZodMiniObject", (e, t)=>{
    ee.init(e, t), ep.init(e, t), m(e, "shape", ()=>t.shape);
});
function eE(e, t) {
    return new eP({
        type: "object",
        shape: e ?? {},
        ...S(t)
    });
}
const e$ = l("ZodMiniUnion", (e, t)=>{
    en.init(e, t), ep.init(e, t);
});
function eO(e, t) {
    return new e$({
        type: "union",
        options: e,
        ...S(t)
    });
}
const eT = l("ZodMiniDiscriminatedUnion", (e, t)=>{
    er.init(e, t), ep.init(e, t);
});
function eZ(e, t, n) {
    return new eT({
        type: "union",
        options: t,
        discriminator: e,
        ...S(n)
    });
}
const eN = l("ZodMiniRecord", (e, t)=>{
    ei.init(e, t), ep.init(e, t);
});
function eA(e, t, n) {
    return new eN({
        type: "record",
        keyType: e,
        valueType: t,
        ...S(n)
    });
}
const eC = l("ZodMiniEnum", (e, t)=>{
    ea.init(e, t), ep.init(e, t), e.options = Object.values(t.entries);
});
function eR(e, t) {
    return new eC({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...S(t)
    });
}
const eM = l("ZodMiniLiteral", (e, t)=>{
    es.init(e, t), ep.init(e, t);
});
function eU(e, t) {
    return new eM({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...S(t)
    });
}
const eL = l("ZodMiniOptional", (e, t)=>{
    el.init(e, t), ep.init(e, t);
});
function eq(e) {
    return new eL({
        type: "optional",
        innerType: e
    });
}
const eD = l("ZodMiniNullable", (e, t)=>{
    ed.init(e, t), ep.init(e, t);
});
function eF(e) {
    return new eD({
        type: "nullable",
        innerType: e
    });
}
const eI = l("ZodMiniCatch", (e, t)=>{
    ec.init(e, t), ep.init(e, t);
}), eV = l("ZodMiniLazy", (e, t)=>{
    eu.init(e, t), ep.init(e, t);
});
function eB() {
    let e = new eV({
        type: "lazy",
        getter: ()=>eO([
                ef(),
                eh(),
                ev(),
                ey(),
                eS(e),
                eA(ef(), e)
            ])
    });
    return e;
}
const eW = eO([
    eU("account_set_password"),
    eU("account_set_active")
]), eJ = eE({
    id: ef(),
    name: ef()
});
eE({
    success: ev(),
    output: eq(ef()),
    error: eq(ef())
});
const eK = eO([
    eU("factory"),
    eU("firmware"),
    eU("builtin")
]), eX = eE({
    detected: ev(),
    device: ef(),
    has_data: ev(),
    sha256: ef(),
    data: ef()
}), eG = eE({
    exists: ev(),
    path: ef(),
    size: eh(),
    sha256: ef(),
    data: ef()
}), eH = eE({
    source: eK,
    active_path: ef(),
    size: eh(),
    sha256: ef(),
    data: ef(),
    factory: eX,
    firmware: eG
}), eQ = eE({
    error: ef()
});
eO([
    eH,
    eQ
]);
const eY = eE({
    success: ev(),
    path: ef(),
    size: eh(),
    sha256: ef()
});
eO([
    eY,
    eQ
]), eE({
    data: ef()
});
const e0 = eE({
    acs: ev(),
    mqtt: ev(),
    npu: ev(),
    "device-hl202": ev(),
    "device-hwtc": ev(),
    "device-star": ev(),
    "device-zte": ev()
}), e1 = eE({
    optical: ev(),
    bridge_offload: ev(),
    omci_mib: ev(),
    mqtt_telemetry: ev(),
    hl202_management: ev(),
    cwmp: ev(),
    command_provisioning: ev()
}), e2 = eE({
    status: ev(),
    config: ev(),
    sync: ev(),
    hardware: ev(),
    calibration: ev(),
    hl202: ev(),
    about: ev()
}), e5 = eE({
    schema_version: eU(1),
    version: ef(),
    features: e0,
    functions: e1,
    pages: e2,
    adapters: eS(eJ)
});
eO([
    eE({
        valid: ev(),
        revision: ef(),
        devices: eh()
    }),
    eE({
        error: ef()
    })
]);
const e6 = eO([
    eU("auto"),
    eU("manual")
]), e8 = eU("diff"), e3 = eE({
    id: ef(),
    name: eO([
        ef(),
        ey()
    ]),
    template: ef()
}), e4 = eE({
    enabled: ev(),
    mode: e6,
    method: e8,
    revision: ef(),
    triggers: eS(ef()),
    interval_minutes: eh(),
    error: eO([
        ef(),
        ey()
    ]),
    devices: eS(ez()),
    management_network: ez(),
    omci_management: ez(),
    groups: eS(e3),
    pending_devices: eS(ef())
});
eO([
    e4,
    eQ
]), eE({});
const e9 = eO([
    eE({
        optical_sn: ef(),
        onu_id: eh(),
        binding_generation: ef()
    }),
    eE({
        mqtt_mac: ef(),
        binding_generation: ef()
    })
]);
eE({
    target: e9
});
const e7 = eE({
    mqtt_mac: ef(),
    optical_sn: eO([
        ef(),
        ey()
    ]),
    onu_id: eO([
        eh(),
        ey()
    ]),
    binding_generation: ef(),
    last_seen: eh(),
    reason: ef()
}), te = eE({
    optical_sn: ef(),
    onu_id: eh(),
    model: ef(),
    optical_online: ev(),
    can_execute: ev(),
    mqtt: eO([
        e7,
        ey()
    ]),
    report_revision: eO([
        eh(),
        ey()
    ])
});
eE({
    target: e9,
    script: ef(),
    timeout_seconds: eh()
});
const tt = eE({
    code: ef(),
    message: ef()
});
eO([
    eE({
        schema_version: eU(1),
        devices: eS(te),
        sources: eS(e7)
    }),
    eE({
        schema_version: eh(),
        error: tt
    })
]), eE({
    target: e9
}), eE({
    target: e9,
    kind: eW,
    entry: eh(),
    password: ef(),
    active: ev()
});
const tn = eU("pending"), tr = eE({
    phase: eO([
        eU("starting"),
        eU("upload"),
        eU("tables")
    ]),
    received: eh(),
    expected: eO([
        eh(),
        ey()
    ])
}), ti = eU("ready"), ta = eO([
    eE({
        status: tn,
        progress: eq(tr)
    }),
    eE({
        status: ti,
        chunk: eh(),
        chunks: eh(),
        bytes: eh(),
        data: ef()
    })
]);
eO([
    ta,
    eQ
]);
const ts = eE({
    status: tn,
    job: ef()
}), to = eE({
    released: ev()
});
eE({
    job: ef()
}), eE({
    job: ef(),
    chunk: eh()
}), eO([
    ts,
    eQ
]);
const tl = eE({
    accepting: ev(),
    running: eh(),
    stored: eh(),
    bytes: eh(),
    running_limit: eh(),
    stored_limit: eh(),
    bytes_limit: eh(),
    result_bytes_limit: eh()
});
eE({
    onu_id: eh(),
    optical_sn: ef(),
    tables: ev()
});
const td = eO([
    eE({
        status: eU("success"),
        enabled: ev()
    }),
    eE({
        status: eU("error"),
        error: ef()
    })
]);
eE({
    enabled: ev(),
    bridge: ef()
});
const tc = eE({
    index: ef(),
    state: ef(),
    pkt_type: ef(),
    orig_tuple: ef(),
    new_tuple: ef(),
    eth: ef(),
    vlan: ef(),
    packets: eh(),
    bytes: eh(),
    counters_valid: ev(),
    packets_exact: ef(),
    bytes_exact: ef()
}), tu = eE({
    sampled_at_ms: eh(),
    errors: eS(ef()),
    config_valid: ev(),
    engine_valid: ev(),
    mask_valid: ev(),
    routed_mask_valid: ev(),
    debug_valid: ev(),
    flows_valid: ev(),
    entries_valid: ev(),
    counters_valid: ev(),
    hooks_valid: ev(),
    total_packets_exact: ef(),
    total_bytes_exact: ef(),
    supported: ev(),
    engine_attached: ev(),
    bridge_offload_enabled: ev(),
    bridge_offload_mask: eh(),
    routed_offload_mask: eh(),
    bridge_offload_debug: ev(),
    bridge: ef(),
    active_ports: eS(ef()),
    fw4_hooks_ready: ev(),
    total_entries: eh(),
    bound_entries: eh(),
    bound_ipv4_entries: eh(),
    bound_ipv6_entries: eh(),
    total_packets: eh(),
    total_bytes: eh(),
    bound_flows: eS(tc)
}), tp = eO([
    eU("plan"),
    eU("apply")
]), t_ = eO([
    eU("optical_on"),
    eU("optical_off"),
    eU("optical_status"),
    eU("optical_reload"),
    eU("optical_reinitialize"),
    eU("optical_shutdown")
]), tf = eO([
    eU("success"),
    eU("error")
]), tg = eO([
    eU("enabled"),
    eU("disabled"),
    eU("unknown")
]), th = eE({
    schema_version: eU(1),
    status: tf,
    action: t_,
    desired_enabled: eO([
        ev(),
        ey()
    ]),
    tx_enabled: eO([
        ev(),
        ey()
    ]),
    actor_state: tg,
    hardware_ready: ev(),
    discovery_active: ev(),
    cleanup_pending: ev(),
    error: eO([
        tt,
        ey()
    ])
});
eE({
    enabled: ev()
}), eE({
    restarting: ev()
});
const tm = eE({
    calls: eh(),
    failures: eh(),
    last_us: eh(),
    max_us: eh(),
    total_us: eh()
});
eE({
    ubus: eq(eA(ef(), tm)),
    jobs: eq(tl),
    onu_pinning: eq(ez()),
    fpga_status: ef(),
    provisioning: ez(),
    optical_transceiver: ez(),
    switch_ports: eS(ez()),
    sub_gateways: eS(ez()),
    telemetry_gateways: eS(ez()),
    npu: eq(ez()),
    ipc: eq(ez())
});
const tv = eO([
    eU("plan"),
    eU("apply"),
    eU("management_plan"),
    eU("management_apply"),
    eU("reset_state"),
    eU("reconcile"),
    eU("retry")
]);
eO([
    eE({
        operation_ids: eS(eh()),
        revision: ef()
    }),
    eE({
        started: ev(),
        mode: tp
    }),
    eE({
        reset: ev(),
        device: ef()
    }),
    eE({
        operation_ids: eS(eh()),
        mode: tp,
        reconcile: eq(ev()),
        retry: eq(ev())
    }),
    eQ
]), eE({
    action: tv,
    target: ef(),
    management: eq(ev()),
    item: eq(ef())
});
let tb = eE({
    error: eO([
        ef(),
        eE({
            code: ef(),
            message: ef()
        })
    ])
});
class ty extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function tw(e) {
    let t = tb.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new ty("rpc", e) : new ty(e.code, e.message);
    }
    return e;
}
let tz = ef(), tk = eh(), tj = ev();
eE({
    optical_sn: tz,
    onu_id: tk,
    binding_generation: tz
}), eE({
    mqtt_mac: tz,
    binding_generation: tz
});
let tx = eE({
    mqtt_mac: tz,
    optical_sn: eF(tz),
    onu_id: eF(tk),
    binding_generation: tz,
    last_seen: tk,
    reason: tz
}), tS = {
    target: tz,
    request_id: eq(tz),
    output: eq(tz),
    output_truncated: tj,
    error: eq(tz)
};
const tP = eZ("status", [
    eE({
        ...tS,
        status: eU("executed"),
        exit_code: eF(tk)
    }),
    eE({
        ...tS,
        status: eU("dispatched"),
        exit_code: eq(ej())
    }),
    eE({
        ...tS,
        status: eU("timeout"),
        exit_code: eq(ej())
    }),
    eE({
        ...tS,
        status: eU("error"),
        exit_code: eq(ej())
    })
]);
let tE = eE({
    target: tx,
    result: tP,
    binding_current: tj
}), t$ = eE({
    schema_version: tk,
    compressed_bytes: tk,
    decompressed_bytes: tk,
    fields: eA(tz, eE({
        value: eB(),
        member: tz,
        unit: eF(tz)
    })),
    members: eS(eE({
        name: tz,
        bytes: tk,
        encoding: tz,
        text: eF(tz),
        text_omitted: tj
    })),
    errors: eS(tz)
}), tO = eE({
    revision: tk,
    last_received: tk,
    last_processed_receipt: eF(tk),
    last_good: eF(tk),
    error: eF(tz),
    report: eF(t$)
}), tT = {
    schema_version: eU(1),
    target: tx,
    report: eF(tO)
};
eO([
    eE({
        ...tT,
        state: eR([
            "received",
            "report_unavailable"
        ])
    }),
    eE({
        ...tT,
        read_only: eU(!0)
    })
]);
const tZ = eE({
    schema_version: eU(1),
    devices: eS(eE({
        optical_sn: tz,
        onu_id: tk,
        model: tz,
        optical_online: tj,
        can_execute: tj,
        mqtt: eF(tx),
        report_revision: eF(tk)
    })),
    sources: eS(tx)
});
eE({
    schema_version: eU(1),
    operation: tE,
    accounts: eF(eS(eE({
        entry: eO([
            eU(0),
            eU(1),
            eU(2)
        ]),
        username: tz,
        active: tj
    }))),
    write_status: eR([
        "not_applicable",
        "accepted_and_saved",
        "unconfirmed"
    ])
}), eE({
    schema_version: eU(1),
    operation: tE
});
let tN = ef(), tA = eh(), tC = ev(), tR = eq(tN), tM = eq(tA), tU = eq(tC);
const tL = eR([
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
]), tq = eR([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), tD = eE({
    id: tN,
    name: eq(eF(tN)),
    kind: eR([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: tN,
    state: tN,
    reason: tR,
    revision: tR,
    current_revision: tU,
    management_fresh: tU,
    operation_id: tM,
    task_id: eq(eF(tA)),
    updated_at: tM,
    changes: eq(eS(eE({
        name: tN,
        desired: tN
    })))
});
let tF = eE({
    state: tN,
    reason: tR,
    task_id: eq(eF(tA)),
    instance: tM
});
const tI = eE({
    cwmp_id: tN,
    state: eR([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: tC,
    last_inform: eF(tA),
    age_seconds: eF(tA)
});
let tV = eE({
    state: eR([
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
    method: tR,
    reason: tR,
    mqtt_target: eF(tN),
    binding_source: tR,
    link_identity_error: eF(tN),
    mqtt_last_seen: eF(tA),
    cwmp_id: tR,
    desired_version: tR,
    generation: tM,
    inflight: tU,
    attempts: tM,
    next_retry_at: tM,
    updated_at: tM,
    settings_verified_at: eF(tA),
    last_inform: eF(tA),
    last_error: eq(eF(tN)),
    persistence_error: eq(eF(tN)),
    desired: eq(eF(eE({
        vlan: tA,
        vlans: eS(tA),
        priority: tA,
        acs_url: tN
    }))),
    listener: eq(eE({
        enabled: tC,
        listen: tN,
        path: tN,
        error: eF(tN)
    })),
    endpoint_notice: tR,
    manual_steps: eq(eS(tN))
});
const tB = eZ("state", [
    tV,
    function(e, t) {
        if (!z(t)) throw Error("Invalid input to extend: expected a plain object");
        let n = e._zod.def.checks;
        if (n && n.length > 0) {
            let n = e._zod.def.shape;
            for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(n, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let r = b(e._zod.def, {
            get shape () {
                let n = {
                    ...e._zod.def.shape,
                    ...t
                };
                return v(this, "shape", n), n;
            }
        });
        return x(e, r);
    }(function(e) {
        var t = void 0;
        let n = e._zod.def.checks;
        if (n && n.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let r = b(e._zod.def, {
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
                return v(this, "shape", r), r;
            },
            checks: []
        });
        return x(e, r);
    }(tV), {
        state: eR([
            "pending",
            "unavailable"
        ]),
        reason: tN
    })
]), tW = eE({
    backend: eq(eE({
        configured: tN,
        effective: tN,
        available: eS(tN),
        reason: tN
    })),
    state: tL,
    operation_id: tM,
    device: tR,
    optical_sn: tR,
    cwmp_id: tR,
    revision: tR,
    mode: eq(eR([
        "apply",
        "plan"
    ])),
    started_at: tM,
    current_revision: tU,
    management_fresh: tU,
    reason: tR,
    error: tR,
    attempts: tM,
    next_retry_at: tM,
    reconcile_reason: tR,
    items: eS(tD),
    cwmp_contract: eq(eE({
        state: tN,
        requested: tN,
        contract: eF(tN),
        reason: tN,
        cache_hit: tC,
        schema: tN,
        capabilities: eF(eE({
            wan: tN,
            wlan: tN,
            binding: tN
        }))
    })),
    wan_objects: eq(eA(tN, eB())),
    wan_lifecycle: eq(eA(tN, tF)),
    wan_stage: eq(eR([
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
    wifi_objects: eq(eE({
        owned: eS(tA),
        pending: eF(tN),
        pending_instance: eF(tA)
    })),
    wifi_lifecycle: eq(eA(tN, tF)),
    wifi_stage: eq(eR([
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
    wifi_cleanup: eq(eR([
        "disable",
        "preserve",
        "delete"
    ]))
});
let tJ = eE({
    enabled: tC,
    mode: eR([
        "auto",
        "manual"
    ]),
    vlan: eS(tA),
    priority: tA,
    address: tN,
    acs_url: tN,
    port: tA,
    path: tN,
    dhcp_enabled: tC
}), tK = eE({
    state: eR([
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
    error: eF(tN),
    inflight: tC,
    ready: tC,
    desired_version: eF(tN),
    applied_version: eF(tN),
    next_retry_at: tA,
    attempts: tA,
    desired: eF(tJ),
    applied: eF(tJ),
    previous: eF(tJ),
    plan: eS(eE({
        operation: tN,
        key: tN,
        value: eS(tN)
    }))
});
const tX = eE({
    device: tN,
    name: eF(tN),
    group: eF(tN),
    group_name: eF(tN),
    template: eF(tN),
    template_name: eF(tN),
    optical_sn: tN,
    adapter: tN,
    omci_management: eE({
        state: tN,
        reason: eq(eF(tN))
    }),
    management: eF(tI),
    acs_bootstrap: tB,
    provisioning: tW,
    services: eS(tD),
    ssids: eS(tD),
    wifi_sync: tq
}), tG = eE({
    enabled: tC,
    mode: eR([
        "auto",
        "manual"
    ]),
    method: eU("diff"),
    revision: tN,
    triggers: eS(tN),
    interval_minutes: new eg({
        type: "number",
        coerce: !0,
        checks: [],
        ...S(void 0)
    }),
    error: eF(tN),
    devices: eS(tX),
    management_network: tK,
    omci_management: eB(),
    groups: eS(eE({
        id: tN,
        name: eF(tN),
        template: tN
    })),
    pending_devices: eS(tN)
}), tH = eO([
    eE({
        valid: eU(!0),
        revision: tN,
        devices: tA,
        error: eq(ej())
    }),
    eE({
        error: tN,
        valid: eq(ej()),
        revision: eq(ej()),
        devices: eq(ej())
    })
]), tQ = eE({
    restarting: eU(!0)
}), tY = eO([
    eE({
        operation_ids: eS(tA),
        revision: tN
    }),
    eE({
        started: eU(!0),
        mode: eR([
            "apply",
            "plan"
        ])
    }),
    eE({
        reset: eU(!0),
        device: tN
    }),
    eE({
        operation_ids: eS(tA),
        mode: eR([
            "apply",
            "plan"
        ]),
        reconcile: tU,
        retry: tU
    })
]);
let t0 = ef(), t1 = eh(), t2 = eF(t1), t5 = eA(t0, eE({
    source: t0,
    unit: t0,
    reason: eF(t0),
    raw: eF(t0),
    age_seconds: t2
}));
const t6 = eE({
    phase: eR([
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
    generation: t1,
    error: eF(t0)
}), t8 = eR([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let t3 = eE({
    model: t0,
    wavelength_tx_nm: t1,
    wavelength_rx_nm: t1,
    phy_rate_downlink_gbps: t1,
    phy_rate_uplink_gbps: t1,
    tx_power_dbm: t2,
    laser_bias_current_ma: t2,
    temperature_celsius: t2,
    vcc_voltage: t2,
    cdr_locked: eF(ev()),
    tx_enabled: eF(ev()),
    measurements: t5
}), t4 = eE({
    equipment_id: eF(t0),
    hardware_version: eF(t0),
    software_images: eS(t0),
    omcc_version: t2,
    errors: eS(t0)
});
const t9 = eE({
    onu_id: t1,
    vendor: t0,
    model: t0,
    serial_number: t0,
    state: t8,
    business_status: t6,
    management: eF(tI),
    provisioning: eF(tW),
    services: eS(tD),
    ssids: eS(tD),
    wifi_sync: tq,
    acs_bootstrap: eq(tB),
    identity: eF(t4),
    identity_age_seconds: t2,
    identity_current: ev(),
    fiber_distance_m: t2,
    ranging_delay_rtd_ns: t2,
    equalization_delay_bits: new eI({
        type: "catch",
        innerType: t2,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: t2,
    optical_tx_power_dbm: t2,
    firmware_version: t0,
    hardware_version: t0,
    uptime_seconds: t2,
    data_path: eE({
        interface: t0,
        gem_ports: eF(eS(t1)),
        vlan_id: t2,
        tx_bytes: t2,
        rx_bytes: t2,
        current_tx_kbps: t2,
        current_rx_kbps: t2,
        offload: eq(eE({
            enabled: eq(eF(ev())),
            routed_enabled: eq(eF(ev())),
            bridge_enabled: eq(eF(ev())),
            engine_attached: eq(eF(ev())),
            forwarding_verified: eq(eF(ev()))
        })),
        measurements: t5
    }),
    wifi_mesh: eE({
        channel_2g: t2,
        channel_5g: t2,
        bandwidth_5g: eF(t0),
        tx_power_pct: t2,
        measurements: t5
    }),
    connected_clients: eF(eS(eE({
        mac: t0,
        ip: t0,
        band: t0,
        rssi_dbm: t2,
        rx_rate_mbps: t2,
        tx_rate_mbps: t2
    }))),
    measurements: t5
});
let t7 = eE({
    reserved_sn: eq(t0),
    port: t1,
    interface: t0,
    carrier: ev(),
    status: t0,
    onu_id: eq(t1),
    onu_sn: eq(t0),
    link_state: t0
});
const ne = eE({
    counters_valid: eq(ev()),
    packets_exact: eq(t0),
    bytes_exact: eq(t0),
    index: t0,
    state: t0,
    pkt_type: t0,
    orig_tuple: t0,
    new_tuple: t0,
    eth: t0,
    vlan: t0,
    packets: t1,
    bytes: t1
}), nt = eE({
    sampled_at_ms: eq(t1),
    errors: eq(eS(t0)),
    config_valid: eq(ev()),
    engine_valid: eq(ev()),
    mask_valid: eq(ev()),
    routed_mask_valid: eq(ev()),
    debug_valid: eq(ev()),
    flows_valid: eq(ev()),
    entries_valid: eq(ev()),
    counters_valid: eq(ev()),
    hooks_valid: eq(ev()),
    total_packets_exact: eq(t0),
    total_bytes_exact: eq(t0),
    supported: ev(),
    engine_attached: ev(),
    bridge_offload_enabled: ev(),
    bridge_offload_mask: t1,
    routed_offload_mask: t1,
    bridge_offload_debug: ev(),
    bridge: t0,
    active_ports: eS(t0),
    fw4_hooks_ready: ev(),
    total_entries: t1,
    bound_entries: t1,
    total_packets: t1,
    total_bytes: t1,
    bound_flows: eS(ne)
}), nn = eE({
    ubus: eq(eA(t0, tm)),
    jobs: eq(tl),
    onu_pinning: eq(eE({
        desired: eA(t0, t1),
        active: eA(t0, t1),
        pending_restart: ev(),
        allocation_blocked: ev(),
        startup_error: eF(t0),
        config_error: eF(t0)
    })),
    fpga_status: t0,
    provisioning: eF(tG),
    optical_transceiver: t3,
    switch_ports: eS(t7),
    sub_gateways: eS(t9),
    telemetry_gateways: eS(eE({
        id: t0,
        last_seen_sec_ago: t1,
        last_payload_bytes: t1
    })),
    npu: eq(eF(nt))
});
eA(t0, eE({
    carrier: eq(ev()),
    mac: eq(t0),
    link: eq(eE({
        speed: eq(t1),
        duplex: eq(t0),
        autoneg: eq(ev())
    })),
    stats: eq(eA(t0, t1))
}));
const nr = {
    getCapabilities: {
        parse: (e)=>e5.parse(tw(e))
    },
    opticalStatus: th,
    opticalSet: th,
    getStatus: {
        parse: (e)=>nn.parse(tw(e))
    },
    getSync: {
        parse: (e)=>tG.parse(tw(e))
    },
    configCheck: tH,
    npuStatus: tu,
    configReload: {
        parse: (e)=>tG.parse(tw(e))
    },
    restartService: {
        parse: (e)=>tQ.parse(tw(e))
    },
    sync: {
        parse: (e)=>tY.parse(tw(e))
    },
    npuSet: td,
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
        parse: (e)=>tZ.parse(tw(e))
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
        parse: (e)=>eH.parse(tw(e))
    },
    saveCalibration: {
        parse: (e)=>eY.parse(tw(e))
    },
    applyCalibration: {
        parse: (e)=>ts.parse(tw(e))
    }
};
function ni() {
    var e;
    let n, r, i, a, s, o, l, d, c, u, p, f, g, h, m, v, b, y, w, z, k, j, x;
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
    }), d = e.declare({
        object: "fttr",
        method: "config_reload",
        reject: !0
    }), c = e.declare({
        object: "fttr",
        method: "restart_service",
        reject: !0
    }), u = e.declare({
        object: "fttr",
        method: "sync",
        params: [
            "action",
            "target",
            "management",
            "item"
        ],
        reject: !0
    }), p = e.declare({
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
    }), g = e.declare({
        object: "fttr",
        method: "mib_result",
        params: [
            "job",
            "chunk"
        ],
        reject: !0
    }), h = e.declare({
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
    }), v = e.declare({
        object: "fttr",
        method: "hl202_report",
        params: [
            "target"
        ],
        reject: !0
    }), b = e.declare({
        object: "fttr",
        method: "hl202_accounts_start",
        params: [
            "target"
        ],
        reject: !0
    }), y = e.declare({
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
    }), z = e.declare({
        object: "fttr",
        method: "job_result",
        params: [
            "job",
            "chunk"
        ],
        reject: !0
    }), k = e.declare({
        object: "fttr",
        method: "get_calibration",
        reject: !0
    }), j = e.declare({
        object: "fttr",
        method: "save_calibration",
        params: [
            "data"
        ],
        reject: !0
    }), x = e.declare({
        object: "fttr",
        method: "apply_calibration",
        reject: !0
    }), {
        getCapabilities: async ()=>nr.getCapabilities.parse(await n()),
        opticalStatus: async ()=>nr.opticalStatus.parse(await r()),
        opticalSet: async (e)=>nr.opticalSet.parse(await i(e.enabled)),
        getStatus: async ()=>nr.getStatus.parse(await a()),
        getSync: async ()=>nr.getSync.parse(await s()),
        configCheck: async ()=>nr.configCheck.parse(await o()),
        npuStatus: async ()=>nr.npuStatus.parse(await l()),
        configReload: async ()=>nr.configReload.parse(await d()),
        restartService: async ()=>nr.restartService.parse(await c()),
        sync: async (e)=>nr.sync.parse(await u(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>nr.npuSet.parse(await p(e.enabled, e.bridge)),
        mibStart: async (e)=>nr.mibStart.parse(await f(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>nr.mibResult.parse(await g(e.job, e.chunk)),
        jobRelease: async (e)=>nr.jobRelease.parse(await h(e.job)),
        hl202List: async ()=>nr.hl202List.parse(await m()),
        hl202Report: async (e)=>nr.hl202Report.parse(await v(e.target)),
        hl202AccountsStart: async (e)=>nr.hl202AccountsStart.parse(await b(e.target)),
        hl202AccountUpdate: async (e)=>nr.hl202AccountUpdate.parse(await y(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>nr.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>nr.jobResult.parse(await z(e.job, e.chunk)),
        getCalibration: async ()=>nr.getCalibration.parse(await k()),
        saveCalibration: async (e)=>nr.saveCalibration.parse(await j(e.data)),
        applyCalibration: async ()=>nr.applyCalibration.parse(await x())
    });
}
L.rpc.declare({
    object: "luci-rpc",
    method: "getNetworkDevices",
    expect: {
        "": {}
    },
    reject: !0
});
const na = async ()=>ni().npuStatus(), ns = async function(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    return ni().npuSet({
        enabled: e,
        bridge: t
    });
};
function no(e, t) {
    return !0 === t && void 0 !== e && /^(0|[1-9][0-9]*)$/.test(e) ? BigInt(e).toLocaleString() : "\u2014";
}
function nl(e, t) {
    return !0 === t ? `0x${e.toString(16).padStart(4, "0")} (${e})` : "\u2014";
}
function nd(e, t) {
    var n;
    return n = {
        class: "fttr-npu-row",
        children: [
            o("span", {
                children: e
            }),
            o("strong", {
                children: t
            })
        ]
    }, o("div", n);
}
function nc(e, t, n, r) {
    return o("span", {
        class: `fttr-npu-state ${!0 === t ? e ? "ready" : "pending" : ""}`,
        children: !0 === t ? e ? n : r : _("Unknown")
    });
}
let main = L.view.extend({
    render: function() {
        var e, t;
        let n, r, i = !1, a = !1, s = 0, l = 0, d = o("input", {
            id: "fttr-npu-enabled",
            type: "checkbox",
            disabled: !0,
            onchange: ()=>{
                a = !0;
            }
        }), c = o("input", {
            id: "fttr-npu-bridge",
            type: "text",
            maxLength: 15,
            disabled: !0,
            oninput: ()=>{
                a = !0;
            }
        }), u = o("p", {
            "aria-live": "polite"
        }), p = o("p", {
            "aria-live": "polite",
            children: _("Loading\u2026")
        }), f = o("div", {}), g = o("button", {
            type: "button",
            class: "cbi-button cbi-button-apply",
            disabled: !0,
            children: _("Save NPU configuration")
        }), h = o("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            children: _("Refresh")
        }), m = ()=>{
            d.disabled = c.disabled = g.disabled = i || !L.hasViewPermission() || !n?.supported || !0 !== n.config_valid || !l || Date.now() - l > 12000, h.disabled = i || !!r;
        }, v = async ()=>{
            if (r || i) return r;
            let e = s;
            return r = (async ()=>{
                try {
                    var t, u, g, h, v, b, y, w, z, k, j, x, S, P, $, O, T, Z, N, A, C, R, M;
                    let r, m = await Promise.race([
                        na(),
                        new Promise((e, t)=>{
                            r = setTimeout(()=>t(Error(_("NPU status request timed out"))), 10000);
                        })
                    ]).finally(()=>clearTimeout(r));
                    if (e !== s || i) return;
                    n = m, l = Date.now(), !a && m.config_valid && (d.checked = m.bridge_offload_enabled, c.value = m.bridge), f.replaceChildren(m.supported ? (R = {
                        children: [
                            void 0 === m.sampled_at_ms ? (t = {
                                class: "alert-message warning",
                                children: _("Backend reliability metadata is unavailable. Update fttrctl before trusting these readings.")
                            }, o("p", t)) : null,
                            m.errors?.length ? (h = {
                                class: "alert-message warning",
                                children: [
                                    (u = {
                                        children: _("Some data sources are unavailable")
                                    }, o("strong", u)),
                                    (g = {
                                        children: m.errors.map((e)=>{
                                            var t;
                                            return t = {
                                                children: e
                                            }, o("li", t);
                                        })
                                    }, o("ul", g))
                                ]
                            }, o("div", h)) : null,
                            (x = {
                                class: "fttr-npu-grid",
                                children: [
                                    (y = {
                                        class: "cbi-section",
                                        children: [
                                            (v = {
                                                children: _("Engine and admission status")
                                            }, o("h3", v)),
                                            nd(_("Saved configuration"), nc(m.bridge_offload_enabled, m.config_valid, _("Enabled"), _("Disabled"))),
                                            nd(_("NPU engine"), nc(m.engine_attached, m.engine_valid, _("Attached"), _("Detached"))),
                                            nd(_("Port admission"), nc(0 !== m.bridge_offload_mask, m.mask_valid, _("Admitted"), _("Not admitted"))),
                                            nd(_("Managed bridge"), m.config_valid ? m.bridge : "\u2014"),
                                            nd(_("Bridge offload mask"), nl(m.bridge_offload_mask, m.mask_valid)),
                                            nd(_("Admitted ports"), m.mask_valid ? m.active_ports.join(", ") || _("None") : "\u2014"),
                                            nd(_("Firewall hooks"), nc(m.fw4_hooks_ready, m.hooks_valid, _("Ready"), _("Not ready"))),
                                            nd(_("Routed offload mask"), nl(m.routed_offload_mask, m.routed_mask_valid)),
                                            nd(_("Driver debug logging"), nc(m.bridge_offload_debug, m.debug_valid, _("Enabled"), _("Disabled"))),
                                            (b = {
                                                class: "fttr-npu-note",
                                                children: _("Admission allows eligible traffic to bind; it does not prove that packets are currently hardware-forwarded. The switch controls FTTR bridge admission, not the entire NPU or global routed offload policy.")
                                            }, o("p", b))
                                        ]
                                    }, o("div", y)),
                                    (j = {
                                        class: "cbi-section",
                                        children: [
                                            (w = {
                                                children: _("PPE flow snapshot")
                                            }, o("h3", w)),
                                            nd(_("Bound hardware flows"), m.flows_valid ? m.bound_entries : "\u2014"),
                                            nd(_("Current non-empty FOE entries"), m.entries_valid ? m.total_entries : "\u2014"),
                                            nd(_("Current bound-flow packets"), no(m.total_packets_exact, m.counters_valid)),
                                            nd(_("Current bound-flow bytes"), no(m.total_bytes_exact, m.counters_valid)),
                                            (z = {
                                                class: "fttr-npu-note",
                                                children: _("Source: PPE debugfs bind/entries and driver sysfs. These are global PPE snapshots, not FTTR-only totals or table capacity. Reads are sequential, not atomic.")
                                            }, o("p", z)),
                                            (k = {
                                                class: "fttr-npu-note",
                                                children: _("Counters cover only currently bound flows and may decrease when flows expire. Driver-exported zeroes are not proof of no traffic. AN7581 native L2B counters are unavailable; \u2014 means unavailable, not zero.")
                                            }, o("p", k))
                                        ]
                                    }, o("div", j))
                                ]
                            }, o("div", x)),
                            (C = {
                                class: "cbi-section",
                                children: [
                                    (S = {
                                        children: _("Active hardware offload flows (PPE FOE Bound)")
                                    }, o("h3", S)),
                                    m.flows_valid ? 0 === m.bound_flows.length ? (P = {
                                        children: _("No bound hardware flows in this snapshot.")
                                    }, o("p", P)) : (N = {
                                        style: "overflow-x:auto",
                                        children: (Z = {
                                            class: "table fttr-npu-flows",
                                            children: [
                                                (O = {
                                                    children: ($ = {
                                                        children: [
                                                            _("Index"),
                                                            _("Type"),
                                                            _("Original endpoints"),
                                                            _("Translated endpoints"),
                                                            _("Ethernet / MAC"),
                                                            _("VLAN"),
                                                            _("Packets"),
                                                            _("Bytes")
                                                        ].map((e)=>{
                                                            var t;
                                                            return t = {
                                                                children: e
                                                            }, o("th", t);
                                                        })
                                                    }, o("tr", $))
                                                }, o("thead", O)),
                                                (T = {
                                                    children: m.bound_flows.map((e)=>{
                                                        var t, n, r, i, a, s, l, d, c, u, p, f, g;
                                                        return g = {
                                                            children: [
                                                                (n = {
                                                                    children: (t = {
                                                                        children: e.index
                                                                    }, o("code", t))
                                                                }, o("td", n)),
                                                                (r = {
                                                                    children: e.pkt_type
                                                                }, o("td", r)),
                                                                (a = {
                                                                    children: (i = {
                                                                        children: e.orig_tuple || "\u2014"
                                                                    }, o("code", i))
                                                                }, o("td", a)),
                                                                (l = {
                                                                    children: (s = {
                                                                        children: e.new_tuple || "\u2014"
                                                                    }, o("code", s))
                                                                }, o("td", l)),
                                                                (c = {
                                                                    children: (d = {
                                                                        children: e.eth || "\u2014"
                                                                    }, o("code", d))
                                                                }, o("td", c)),
                                                                (u = {
                                                                    children: e.vlan || "\u2014"
                                                                }, o("td", u)),
                                                                (p = {
                                                                    children: no(e.packets_exact, e.counters_valid && m.engine_valid && m.engine_attached)
                                                                }, o("td", p)),
                                                                (f = {
                                                                    children: no(e.bytes_exact, e.counters_valid && m.engine_valid && m.engine_attached)
                                                                }, o("td", f))
                                                            ]
                                                        }, o("tr", g);
                                                    })
                                                }, o("tbody", T))
                                            ]
                                        }, o("table", Z))
                                    }, o("div", N)) : (A = {
                                        children: _("Flow table is unavailable. A failed read must not be interpreted as an empty table.")
                                    }, o("p", A))
                                ]
                            }, o("div", C))
                        ]
                    }, o("div", R)) : (M = {
                        class: "cbi-section",
                        children: _("NPU hardware acceleration is not compiled or unsupported on this target.")
                    }, o("div", M))), p.textContent = `${_("Last successful sample")}: ${m.sampled_at_ms ? new Date(m.sampled_at_ms).toLocaleString() : _("Unknown")} \xb7 ${_("Refresh interval: 3 seconds")}`;
                } catch (t) {
                    if (e !== s || i) return;
                    l = 0, f.replaceChildren(o("p", {
                        class: "alert-message warning",
                        children: _("Live NPU data is unavailable. Previous readings are stale.")
                    })), p.textContent = `${_("Refresh failed")}: ${String(t)}`;
                } finally{
                    r = void 0, m();
                }
            })(), m(), r;
        };
        h.onclick = ()=>{
            v();
        }, g.onclick = async ()=>{
            if (g.disabled || i) return;
            let e = c.value.trim(), t = d.checked, o = !1;
            if (!/^[a-zA-Z0-9_.-]{1,15}$/.test(e)) {
                u.textContent = _("Use a bridge interface name of 1\u201315 letters, digits, dots, underscores or hyphens.");
                return;
            }
            i = !0, s++, m(), u.textContent = _("Saving\u2026");
            try {
                let n = await ns(t, e);
                if ("success" !== n.status) throw Error(n.error || _("Failed to save NPU configuration"));
                a = !1, o = !0, u.textContent = _("Configuration saved. Waiting for driver admission readback; enabling may take several seconds and requires eligible ports and firewall policy.");
            } catch (e) {
                u.textContent = `${_("NPU configuration failed")}: ${String(e)}`;
            } finally{
                await r, i = !1, await v(), !o || l && n?.config_valid && n.bridge === e && n.bridge_offload_enabled === t || (u.textContent = _("Save returned success, but configuration readback could not be confirmed. Refresh before retrying.")), m();
            }
        };
        let b = (t = {
            class: "cbi-map fttr-npu",
            children: [
                o("style", {
                    children: ".fttr-npu-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px}.fttr-npu-row{display:flex;justify-content:space-between;gap:16px;padding:7px 0;border-bottom:1px dashed #8884}.fttr-npu-row strong{text-align:right;overflow-wrap:anywhere}.fttr-npu-note{opacity:.75;font-size:90%;line-height:1.5}.fttr-npu-state{padding:2px 6px;border:1px solid #8886;border-radius:4px}.fttr-npu-state.ready{color:#2b8;border-color:#2b86}.fttr-npu-state.pending{color:#d90;border-color:#d906}.fttr-npu label{display:inline-flex;gap:8px;align-items:center;margin:8px 20px 8px 0}.fttr-npu-flows{font-size:85%}.fttr-npu-flows td{overflow-wrap:anywhere}"
                }),
                o("h2", {
                    children: _("NPU hardware acceleration")
                }),
                (e = {
                    class: "cbi-section",
                    children: [
                        o("h3", {
                            children: _("NPU configuration")
                        }),
                        o("label", {
                            htmlFor: "fttr-npu-enabled",
                            children: [
                                d,
                                _("Enable FTTR bridge hardware offload")
                            ]
                        }),
                        o("label", {
                            htmlFor: "fttr-npu-bridge",
                            children: [
                                _("Bridge interface"),
                                c
                            ]
                        }),
                        o("div", {
                            children: [
                                g,
                                " ",
                                h
                            ]
                        }),
                        u
                    ]
                }, o("div", e)),
                p,
                f
            ]
        }, o("div", t));
        return v(), L.Poll.add(async ()=>{
            b.isConnected && (l && Date.now() - l > 12000 && (l = 0, f.replaceChildren(o("p", {
                class: "alert-message warning",
                children: _("Live NPU data is unavailable. Previous readings are stale.")
            })), m()), await v());
        }, 3), b;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;