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
function g(e) {
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
}), K = l("$ZodNever", (e, t)=>{
    Q.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function B(e, t, n) {
    e.issues.length && t.issues.push(...T(n, e.issues)), t.value[n] = e.value;
}
const X = l("$ZodArray", (e, t)=>{
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
            o instanceof Promise ? a.push(o.then((t)=>B(t, n, e))) : B(o, n, e);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
});
function G(e, t, n, r, i) {
    if (e.issues.length) {
        if (i && !(n in r)) return;
        t.issues.push(...T(n, e.issues));
    }
    void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const Y = l("$ZodObject", (e, t)=>{
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
            a instanceof Promise ? o.push(a.then((n)=>G(n, t, e, s, i))) : G(a, t, e, s, i);
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
                a instanceof Promise ? e.push(a.then((e)=>G(e, n, i, t, d))) : G(a, n, i, t, d);
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
function ee(e, t, n, r) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let i = e.filter((e)=>!S(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>O(e, r, p())))
    }), t);
}
const et = l("$ZodUnion", (e, t)=>{
    Q.init(e, t), f(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), f(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), f(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), f(e._zod, "pattern", ()=>{
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
        return s ? Promise.all(o).then((t)=>ee(t, i, e, a)) : ee(o, i, e, a);
    };
}), en = l("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, et.init(e, t);
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
}), er = l("$ZodRecord", (e, t)=>{
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
}), ei = l("$ZodEnum", (e, t)=>{
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
}), ea = l("$ZodLiteral", (e, t)=>{
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
function es(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const eo = l("$ZodOptional", (e, t)=>{
    Q.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", f(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), f(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${g(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let r = t.innerType._zod.run(e, n);
            return r instanceof Promise ? r.then((t)=>es(t, e.value)) : es(r, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, n);
    };
}), el = l("$ZodNullable", (e, t)=>{
    Q.init(e, t), f(e._zod, "optin", ()=>t.innerType._zod.optin), f(e._zod, "optout", ()=>t.innerType._zod.optout), f(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${g(e.source)}|null)$`) : void 0;
    }), f(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), ec = l("$ZodCatch", (e, t)=>{
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
}), ed = l("$ZodLazy", (e, t)=>{
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
const ep = l("ZodMiniType", (e, t)=>{
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
}), eu = l("ZodMiniString", (e, t)=>{
    V.init(e, t), ep.init(e, t);
});
function eh(e) {
    return new eu({
        type: "string",
        ...C(e)
    });
}
const e_ = l("ZodMiniNumber", (e, t)=>{
    F.init(e, t), ep.init(e, t);
});
function eg(e) {
    return new e_({
        type: "number",
        checks: [],
        ...C(e)
    });
}
const em = l("ZodMiniBoolean", (e, t)=>{
    W.init(e, t), ep.init(e, t);
});
function ef(e) {
    return new em({
        type: "boolean",
        ...C(e)
    });
}
const eb = l("ZodMiniNull", (e, t)=>{
    H.init(e, t), ep.init(e, t);
}), ey = l("ZodMiniNever", (e, t)=>{
    K.init(e, t), ep.init(e, t);
});
function ev(e) {
    return new ey({
        type: "never",
        ...C(e)
    });
}
const ew = l("ZodMiniArray", (e, t)=>{
    X.init(e, t), ep.init(e, t);
});
function ex(e, t) {
    return new ew({
        type: "array",
        element: e,
        ...C(t)
    });
}
const ez = l("ZodMiniObject", (e, t)=>{
    Y.init(e, t), ep.init(e, t), f(e, "shape", ()=>t.shape);
});
function ek(e, t) {
    return new ez({
        type: "object",
        shape: e ?? {},
        ...C(t)
    });
}
function ej(e, t) {
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
}
const eC = l("ZodMiniUnion", (e, t)=>{
    et.init(e, t), ep.init(e, t);
});
function eS(e, t) {
    return new eC({
        type: "union",
        options: e,
        ...C(t)
    });
}
const eT = l("ZodMiniDiscriminatedUnion", (e, t)=>{
    en.init(e, t), ep.init(e, t);
});
function e$(e, t, n) {
    return new eT({
        type: "union",
        options: t,
        discriminator: e,
        ...C(n)
    });
}
const eO = l("ZodMiniRecord", (e, t)=>{
    er.init(e, t), ep.init(e, t);
});
function eE(e, t, n) {
    return new eO({
        type: "record",
        keyType: e,
        valueType: t,
        ...C(n)
    });
}
const eN = l("ZodMiniEnum", (e, t)=>{
    ei.init(e, t), ep.init(e, t), e.options = Object.values(t.entries);
});
function eP(e, t) {
    return new eN({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...C(t)
    });
}
const eR = l("ZodMiniLiteral", (e, t)=>{
    ea.init(e, t), ep.init(e, t);
});
function eM(e, t) {
    return new eR({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...C(t)
    });
}
const eL = l("ZodMiniOptional", (e, t)=>{
    eo.init(e, t), ep.init(e, t);
});
function eZ(e) {
    return new eL({
        type: "optional",
        innerType: e
    });
}
const eA = l("ZodMiniNullable", (e, t)=>{
    el.init(e, t), ep.init(e, t);
});
function eq(e) {
    return new eA({
        type: "nullable",
        innerType: e
    });
}
const eD = l("ZodMiniCatch", (e, t)=>{
    ec.init(e, t), ep.init(e, t);
}), eJ = l("ZodMiniLazy", (e, t)=>{
    ed.init(e, t), ep.init(e, t);
});
function eU() {
    let e = new eJ({
        type: "lazy",
        getter: ()=>eS([
                eh(),
                eg(),
                ef(),
                new eb({
                    type: "null",
                    ...C(void 0)
                }),
                ex(e),
                eE(eh(), e)
            ])
    });
    return e;
}
let eI = ek({
    error: eS([
        eh(),
        ek({
            code: eh(),
            message: eh()
        })
    ])
});
class eQ extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eV(e) {
    let t = eI.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eQ("rpc", e) : new eQ(e.code, e.message);
    }
    return e;
}
const eF = ek({
    status: eM("pending"),
    job: eh()
}), eW = e$("status", [
    ek({
        status: eM("pending")
    }),
    ek({
        status: eM("ready"),
        chunk: eg(),
        chunks: eg(),
        bytes: eg(),
        data: eh()
    })
]);
let eH = eh(), eK = eg(), eB = ef();
ek({
    optical_sn: eH,
    onu_id: eK,
    binding_generation: eH
}), ek({
    mqtt_mac: eH,
    binding_generation: eH
});
let eX = ek({
    mqtt_mac: eH,
    optical_sn: eq(eH),
    onu_id: eq(eK),
    binding_generation: eH,
    last_seen: eK,
    reason: eH
}), eG = {
    target: eH,
    request_id: eZ(eH),
    output: eZ(eH),
    output_truncated: eB,
    error: eZ(eH)
};
const eY = e$("status", [
    ek({
        ...eG,
        status: eM("executed"),
        exit_code: eq(eK)
    }),
    ek({
        ...eG,
        status: eM("dispatched"),
        exit_code: eZ(ev())
    }),
    ek({
        ...eG,
        status: eM("timeout"),
        exit_code: eZ(ev())
    }),
    ek({
        ...eG,
        status: eM("error"),
        exit_code: eZ(ev())
    })
]);
let e0 = ek({
    target: eX,
    result: eY,
    binding_current: eB
}), e2 = ek({
    schema_version: eK,
    compressed_bytes: eK,
    decompressed_bytes: eK,
    fields: eE(eH, ek({
        value: eU(),
        member: eH,
        unit: eq(eH)
    })),
    members: ex(ek({
        name: eH,
        bytes: eK,
        encoding: eH,
        text: eq(eH),
        text_omitted: eB
    })),
    errors: ex(eH)
}), e1 = ek({
    revision: eK,
    last_received: eK,
    last_processed_receipt: eq(eK),
    last_good: eq(eK),
    error: eq(eH),
    report: eq(e2)
}), e8 = {
    schema_version: eM(1),
    target: eX,
    report: eq(e1)
};
const e4 = eS([
    ek({
        ...e8,
        state: eP([
            "received",
            "report_unavailable"
        ])
    }),
    ek({
        ...e8,
        read_only: eM(!0)
    })
]), e5 = ek({
    schema_version: eM(1),
    devices: ex(ek({
        optical_sn: eH,
        onu_id: eK,
        model: eH,
        optical_online: eB,
        can_execute: eB,
        mqtt: eq(eX),
        report_revision: eq(eK)
    })),
    sources: ex(eX)
}), e3 = ek({
    schema_version: eM(1),
    operation: e0,
    accounts: eq(ex(ek({
        entry: eS([
            eM(0),
            eM(1),
            eM(2)
        ]),
        username: eH,
        active: eB
    }))),
    write_status: eP([
        "not_applicable",
        "accepted_and_saved",
        "unconfirmed"
    ])
}), e6 = ek({
    schema_version: eM(1),
    operation: e0
});
let e7 = eh(), e9 = eg(), te = ef(), tt = eZ(e7), tn = eZ(e9), tr = eZ(te);
const ti = eP([
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
]), ta = eP([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), ts = ek({
    id: e7,
    name: eZ(eq(e7)),
    kind: eP([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: e7,
    state: e7,
    reason: tt,
    revision: tt,
    current_revision: tr,
    management_fresh: tr,
    operation_id: tn,
    task_id: eZ(eq(e9)),
    updated_at: tn,
    changes: eZ(ex(ek({
        name: e7,
        desired: e7
    })))
});
let to = ek({
    state: e7,
    reason: tt,
    task_id: eZ(eq(e9)),
    instance: tn
});
const tl = ek({
    cwmp_id: e7,
    state: eP([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: te,
    last_inform: eq(e9),
    age_seconds: eq(e9)
});
let tc = ek({
    state: eP([
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
    method: tt,
    reason: tt,
    mqtt_target: eq(e7),
    binding_source: tt,
    link_identity_error: eq(e7),
    mqtt_last_seen: eq(e9),
    cwmp_id: tt,
    desired_version: tt,
    generation: tn,
    inflight: tr,
    attempts: tn,
    next_retry_at: tn,
    updated_at: tn,
    settings_verified_at: eq(e9),
    last_inform: eq(e9),
    last_error: eZ(eq(e7)),
    persistence_error: eZ(eq(e7)),
    desired: eZ(eq(ek({
        vlan: e9,
        vlans: ex(e9),
        priority: e9,
        acs_url: e7
    }))),
    listener: eZ(ek({
        enabled: te,
        listen: e7,
        path: e7,
        error: eq(e7)
    })),
    endpoint_notice: tt,
    manual_steps: eZ(ex(e7))
});
const td = e$("state", [
    tc,
    ej(function(e) {
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
                    t[e] && (r[e] = eL ? new eL({
                        type: "optional",
                        innerType: n[e]
                    }) : n[e]);
                }
                else for(let e in n)r[e] = eL ? new eL({
                    type: "optional",
                    innerType: n[e]
                }) : n[e];
                return b(this, "shape", r), r;
            },
            checks: []
        });
        return j(e, r);
    }(tc), {
        state: eP([
            "pending",
            "unavailable"
        ]),
        reason: e7
    })
]), tp = ek({
    backend: eZ(ek({
        configured: e7,
        effective: e7,
        available: ex(e7),
        reason: e7
    })),
    state: ti,
    operation_id: tn,
    device: tt,
    optical_sn: tt,
    cwmp_id: tt,
    revision: tt,
    mode: eZ(eP([
        "apply",
        "plan"
    ])),
    started_at: tn,
    current_revision: tr,
    management_fresh: tr,
    reason: tt,
    error: tt,
    attempts: tn,
    next_retry_at: tn,
    reconcile_reason: tt,
    items: ex(ts),
    cwmp_contract: eZ(ek({
        state: e7,
        requested: e7,
        contract: eq(e7),
        reason: e7,
        cache_hit: te,
        schema: e7,
        capabilities: eq(ek({
            wan: e7,
            wlan: e7,
            binding: e7
        }))
    })),
    wan_objects: eZ(eE(e7, eU())),
    wan_lifecycle: eZ(eE(e7, to)),
    wan_stage: eZ(eP([
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
        owned: ex(e9),
        pending: eq(e7),
        pending_instance: eq(e9)
    })),
    wifi_lifecycle: eZ(eE(e7, to)),
    wifi_stage: eZ(eP([
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
    wifi_cleanup: eZ(eP([
        "disable",
        "preserve",
        "delete"
    ]))
});
let tu = ek({
    enabled: te,
    mode: eP([
        "auto",
        "manual"
    ]),
    vlan: ex(e9),
    priority: e9,
    address: e7,
    acs_url: e7,
    port: e9,
    path: e7,
    dhcp_enabled: te
}), th = ek({
    state: eP([
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
    error: eq(e7),
    inflight: te,
    ready: te,
    desired_version: eq(e7),
    applied_version: eq(e7),
    next_retry_at: e9,
    attempts: e9,
    desired: eq(tu),
    applied: eq(tu),
    previous: eq(tu),
    plan: ex(ek({
        operation: e7,
        key: e7,
        value: ex(e7)
    }))
});
const t_ = ek({
    device: e7,
    name: eq(e7),
    group: eq(e7),
    group_name: eq(e7),
    template: eq(e7),
    template_name: eq(e7),
    optical_sn: e7,
    adapter: e7,
    omci_management: ek({
        state: e7,
        reason: eZ(eq(e7))
    }),
    management: eq(tl),
    acs_bootstrap: td,
    provisioning: tp,
    services: ex(ts),
    ssids: ex(ts),
    wifi_sync: ta
}), tg = ek({
    enabled: te,
    mode: eP([
        "auto",
        "manual"
    ]),
    method: eM("diff"),
    revision: e7,
    triggers: ex(e7),
    interval_minutes: new e_({
        type: "number",
        coerce: !0,
        checks: [],
        ...C(void 0)
    }),
    error: eq(e7),
    devices: ex(t_),
    management_network: th,
    omci_management: eU(),
    groups: ex(ek({
        id: e7,
        name: eq(e7),
        template: e7
    })),
    pending_devices: ex(e7)
}), tm = eS([
    ek({
        valid: eM(!0),
        revision: e7,
        devices: e9,
        error: eZ(ev())
    }),
    ek({
        error: e7,
        valid: eZ(ev()),
        revision: eZ(ev()),
        devices: eZ(ev())
    })
]), tf = ek({
    restarting: eM(!0)
}), tb = eS([
    ek({
        operation_ids: ex(e9),
        revision: e7
    }),
    ek({
        started: eM(!0),
        mode: eP([
            "apply",
            "plan"
        ])
    }),
    ek({
        reset: eM(!0),
        device: e7
    }),
    ek({
        operation_ids: ex(e9),
        mode: eP([
            "apply",
            "plan"
        ]),
        reconcile: tr,
        retry: tr
    })
]);
let ty = eh(), tv = eg(), tw = eq(tv), tx = eE(ty, ek({
    source: ty,
    unit: ty,
    reason: eq(ty),
    raw: eq(ty),
    age_seconds: tw
}));
const tz = ek({
    phase: eP([
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
    generation: tv,
    error: eq(ty)
}), tk = eP([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tj = ek({
    model: ty,
    wavelength_tx_nm: tv,
    wavelength_rx_nm: tv,
    phy_rate_downlink_gbps: tv,
    phy_rate_uplink_gbps: tv,
    tx_power_dbm: tw,
    laser_bias_current_ma: tw,
    temperature_celsius: tw,
    vcc_voltage: tw,
    cdr_locked: eq(ef()),
    tx_enabled: eq(ef()),
    measurements: tx
}), tC = ek({
    equipment_id: eq(ty),
    hardware_version: eq(ty),
    software_images: ex(ty),
    omcc_version: tw,
    errors: ex(ty)
});
const tS = ek({
    onu_id: tv,
    vendor: ty,
    model: ty,
    serial_number: ty,
    state: tk,
    business_status: tz,
    management: eq(tl),
    provisioning: eq(tp),
    services: ex(ts),
    ssids: ex(ts),
    wifi_sync: ta,
    acs_bootstrap: eZ(td),
    identity: eq(tC),
    identity_age_seconds: tw,
    identity_current: ef(),
    fiber_distance_m: tw,
    ranging_delay_rtd_ns: tw,
    equalization_delay_bits: new eD({
        type: "catch",
        innerType: tw,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tw,
    optical_tx_power_dbm: tw,
    firmware_version: ty,
    hardware_version: ty,
    uptime_seconds: tw,
    data_path: ek({
        interface: ty,
        gem_ports: eq(ex(tv)),
        vlan_id: tw,
        tx_bytes: tw,
        rx_bytes: tw,
        current_tx_kbps: tw,
        current_rx_kbps: tw,
        offload: eZ(ek({
            enabled: eZ(eq(ef())),
            routed_enabled: eZ(eq(ef())),
            bridge_enabled: eZ(eq(ef())),
            engine_attached: eZ(eq(ef())),
            forwarding_verified: eZ(eq(ef()))
        })),
        measurements: tx
    }),
    wifi_mesh: ek({
        channel_2g: tw,
        channel_5g: tw,
        bandwidth_5g: eq(ty),
        tx_power_pct: tw,
        measurements: tx
    }),
    connected_clients: eq(ex(ek({
        mac: ty,
        ip: ty,
        band: ty,
        rssi_dbm: tw,
        rx_rate_mbps: tw,
        tx_rate_mbps: tw
    }))),
    measurements: tx
});
let tT = ek({
    reserved_sn: eZ(ty),
    port: tv,
    interface: ty,
    carrier: ef(),
    status: ty,
    onu_id: eZ(tv),
    onu_sn: eZ(ty),
    link_state: ty
});
const t$ = ek({
    counters_valid: eZ(ef()),
    packets_exact: eZ(ty),
    bytes_exact: eZ(ty),
    index: ty,
    state: ty,
    pkt_type: ty,
    orig_tuple: ty,
    new_tuple: ty,
    eth: ty,
    vlan: ty,
    packets: tv,
    bytes: tv
}), tO = ek({
    sampled_at_ms: eZ(tv),
    errors: eZ(ex(ty)),
    config_valid: eZ(ef()),
    engine_valid: eZ(ef()),
    mask_valid: eZ(ef()),
    routed_mask_valid: eZ(ef()),
    debug_valid: eZ(ef()),
    flows_valid: eZ(ef()),
    entries_valid: eZ(ef()),
    counters_valid: eZ(ef()),
    hooks_valid: eZ(ef()),
    total_packets_exact: eZ(ty),
    total_bytes_exact: eZ(ty),
    supported: ef(),
    engine_attached: ef(),
    bridge_offload_enabled: ef(),
    bridge_offload_mask: tv,
    routed_offload_mask: tv,
    bridge_offload_debug: ef(),
    bridge: ty,
    active_ports: ex(ty),
    fw4_hooks_ready: ef(),
    total_entries: tv,
    bound_entries: tv,
    total_packets: tv,
    total_bytes: tv,
    bound_flows: ex(t$)
}), tE = ej(tO, {
    sampled_at_ms: tv,
    errors: ex(ty),
    config_valid: ef(),
    engine_valid: ef(),
    mask_valid: ef(),
    routed_mask_valid: ef(),
    debug_valid: ef(),
    flows_valid: ef(),
    entries_valid: ef(),
    counters_valid: ef(),
    hooks_valid: ef(),
    total_packets_exact: ty,
    total_bytes_exact: ty,
    bound_ipv4_entries: tv,
    bound_ipv6_entries: tv,
    bound_flows: ex(ej(t$, {
        counters_valid: ef(),
        packets_exact: ty,
        bytes_exact: ty
    }))
}), tN = ek({
    ubus: eZ(eE(ty, ek({
        calls: tv,
        failures: tv,
        last_us: tv,
        max_us: tv,
        total_us: tv
    }))),
    jobs: eZ(ek({
        accepting: ef(),
        running: tv,
        stored: tv,
        bytes: tv,
        running_limit: tv,
        stored_limit: tv,
        bytes_limit: tv,
        result_bytes_limit: tv
    })),
    onu_pinning: eZ(ek({
        desired: eE(ty, tv),
        active: eE(ty, tv),
        pending_restart: ef(),
        allocation_blocked: ef(),
        startup_error: eq(ty),
        config_error: eq(ty)
    })),
    fpga_status: ty,
    provisioning: eq(tg),
    optical_transceiver: tj,
    switch_ports: ex(tT),
    sub_gateways: ex(tS),
    telemetry_gateways: ex(ek({
        id: ty,
        last_seen_sec_ago: tv,
        last_payload_bytes: tv
    })),
    npu: eZ(eq(tO))
});
eE(ty, ek({
    carrier: eZ(ef()),
    mac: eZ(ty),
    link: eZ(ek({
        speed: eZ(tv),
        duplex: eZ(ty),
        autoneg: eZ(ef())
    })),
    stats: eZ(eE(ty, tv))
}));
const tP = e$("status", [
    ek({
        status: eM("success"),
        enabled: ef()
    }),
    ek({
        status: eM("error"),
        error: eh()
    })
]), tR = ek({
    source: eP([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: eh(),
    size: eg(),
    sha256: eh(),
    data: eh(),
    factory: ek({
        detected: ef(),
        device: eh(),
        has_data: ef(),
        sha256: eh(),
        data: eh()
    }),
    firmware: ek({
        exists: ef(),
        path: eh(),
        size: eg(),
        sha256: eh(),
        data: eh()
    }),
    error: eZ(eh())
}), tM = ek({
    success: ef(),
    path: eh(),
    size: eg(),
    sha256: eh(),
    error: eZ(eh())
});
ek({
    success: ef(),
    output: eZ(eh()),
    error: eZ(eh())
});
const tL = e$("status", [
    ek({
        status: eM("pending"),
        progress: eZ(ek({
            phase: eP([
                "starting",
                "upload",
                "tables"
            ]),
            received: eg(),
            expected: eq(eg())
        }))
    }),
    ek({
        status: eM("ready"),
        chunk: eg(),
        chunks: eg(),
        bytes: eg(),
        data: eh()
    })
]), tZ = ek({
    released: ef()
}), tA = ek({
    schema_version: eM(1),
    status: eP([
        "success",
        "error"
    ]),
    action: eP([
        "optical_on",
        "optical_off",
        "optical_status",
        "optical_reload",
        "optical_reinitialize",
        "optical_shutdown"
    ]),
    desired_enabled: eq(ef()),
    tx_enabled: eq(ef()),
    actor_state: eP([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: ef(),
    discovery_active: ef(),
    cleanup_pending: ef(),
    error: eq(ek({
        code: eh(),
        message: eh()
    }))
}), tq = ek({
    schema_version: eM(1),
    version: eh(),
    features: eE(eh(), ef()),
    functions: ek({
        optical: ef(),
        omci_mib: ef(),
        mqtt_telemetry: ef(),
        hl202_management: ef(),
        cwmp: ef()
    }),
    pages: ek({
        status: ef(),
        config: ef(),
        sync: ef(),
        hl202: ef(),
        hardware: ef(),
        calibration: ef(),
        about: ef()
    }),
    adapters: ex(ek({
        id: eh(),
        name: eh()
    }))
}), tD = {
    getCapabilities: {
        parse: (e)=>tq.parse(eV(e))
    },
    opticalStatus: tA,
    opticalSet: tA,
    getStatus: {
        parse: (e)=>tN.parse(eV(e))
    },
    getSync: {
        parse: (e)=>tg.parse(eV(e))
    },
    configCheck: tm,
    npuStatus: tE,
    configReload: {
        parse: (e)=>tg.parse(eV(e))
    },
    restartService: {
        parse: (e)=>tf.parse(eV(e))
    },
    sync: {
        parse: (e)=>tb.parse(eV(e))
    },
    npuSet: tP,
    mibStart: {
        parse: (e)=>eF.parse(eV(e))
    },
    mibResult: {
        parse: (e)=>tL.parse(eV(e))
    },
    jobRelease: {
        parse: (e)=>tZ.parse(eV(e))
    },
    hl202List: {
        parse: (e)=>e5.parse(eV(e))
    },
    hl202Report: {
        parse: (e)=>eF.parse(eV(e))
    },
    hl202AccountsStart: {
        parse: (e)=>eF.parse(eV(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>eF.parse(eV(e))
    },
    hl202ExecStart: {
        parse: (e)=>eF.parse(eV(e))
    },
    jobResult: {
        parse: (e)=>eW.parse(eV(e))
    },
    getCalibration: {
        parse: (e)=>tR.parse(eV(e))
    },
    saveCalibration: {
        parse: (e)=>tM.parse(eV(e))
    },
    applyCalibration: {
        parse: (e)=>eF.parse(eV(e))
    }
};
function tJ() {
    var e;
    let n, r, i, a, s, o, l, c, d, p, u, h, g, m, f, b, y, v, w, x, z, k, j;
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
    }), h = e.declare({
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
        getCapabilities: async ()=>tD.getCapabilities.parse(await n()),
        opticalStatus: async ()=>tD.opticalStatus.parse(await r()),
        opticalSet: async (e)=>tD.opticalSet.parse(await i(e.enabled)),
        getStatus: async ()=>tD.getStatus.parse(await a()),
        getSync: async ()=>tD.getSync.parse(await s()),
        configCheck: async ()=>tD.configCheck.parse(await o()),
        npuStatus: async ()=>tD.npuStatus.parse(await l()),
        configReload: async ()=>tD.configReload.parse(await c()),
        restartService: async ()=>tD.restartService.parse(await d()),
        sync: async (e)=>tD.sync.parse(await p(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>tD.npuSet.parse(await u(e.enabled, e.bridge)),
        mibStart: async (e)=>tD.mibStart.parse(await h(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>tD.mibResult.parse(await g(e.job, e.chunk)),
        jobRelease: async (e)=>tD.jobRelease.parse(await m(e.job)),
        hl202List: async ()=>tD.hl202List.parse(await f()),
        hl202Report: async (e)=>tD.hl202Report.parse(await b(e.target)),
        hl202AccountsStart: async (e)=>tD.hl202AccountsStart.parse(await y(e.target)),
        hl202AccountUpdate: async (e)=>tD.hl202AccountUpdate.parse(await v(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>tD.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>tD.jobResult.parse(await x(e.job, e.chunk)),
        getCalibration: async ()=>tD.getCalibration.parse(await z()),
        saveCalibration: async (e)=>tD.saveCalibration.parse(await k(e.data)),
        applyCalibration: async ()=>tD.applyCalibration.parse(await j())
    });
}
const tU = async ()=>tJ().getCapabilities();
async function tI(e) {
    if (!(await tU()).pages[e]) throw Error(_("This page is not supported by the installed FTTR build."));
}
_("Ready"), _("Online"), _("Success"), _("Offline"), _("Error"), _("Failed"), _("Timeout"), _("Pending"), _("Running"), _("Unavailable"), _("Disabled"), _("Enabled");
const tQ = (e)=>null == e || "" === e ? "\u2014" : String(e), tV = (e)=>e ? new Date(1000 * e).toLocaleString() : "\u2014";
function tF(e, t, n) {
    return o("span", {
        class: `hl202-badge hl202-badge-${e}`,
        title: n,
        children: t
    });
}
async function tW(e) {
    let t, n = eF.parse(eV(e)), r = Date.now() + 330000, i = window.location.pathname, a = [], s = 0;
    try {
        for(let e = 0; e < 128;){
            if (window.location.pathname !== i) throw new eQ("navigation", _("Result polling stopped after leaving the page. The backend job is not cancelled."));
            if (Date.now() > r) throw new eQ("timeout", _("Job polling timed out; execution outcome is unknown. Do not automatically retry."));
            let o = await tJ().jobResult({
                job: n.job,
                chunk: e
            });
            if ("pending" === o.status) {
                await new Promise((e)=>window.setTimeout(e, 1000));
                continue;
            }
            if (!Number.isInteger(o.chunks) || o.chunks < 1 || o.chunks > 128 || o.chunk !== e || !Number.isInteger(o.bytes) || o.bytes < 1 || o.bytes > 4194304 || o.data.length > 43692) throw new eQ("transport", _("Invalid job result"));
            if (t && (o.chunks !== t.chunks || o.bytes !== t.bytes)) throw new eQ("transport", _("Inconsistent job result chunks"));
            t = {
                chunks: o.chunks,
                bytes: o.bytes
            };
            let l = Uint8Array.from(atob(o.data), (e)=>e.charCodeAt(0));
            if (l.length > 32768 || s + l.length > o.bytes) throw new eQ("transport", _("Job result exceeds the transport limit"));
            if (a.push(l), s += l.length, ++e === o.chunks) {
                if (s !== o.bytes) throw new eQ("transport", _("Incomplete job result"));
                let e = new Uint8Array(s), t = 0;
                for (let n of a)e.set(n, t), t += n.length;
                return eV(JSON.parse(new TextDecoder("utf-8", {
                    fatal: !0
                }).decode(e)));
            }
        }
        throw new eQ("transport", _("Too many result chunks"));
    } finally{
        await tJ().jobRelease({
            job: n.job
        }).catch(()=>{});
    }
}
const tH = async ()=>tJ().hl202List(), tK = async (e)=>e4.parse(await tW(await tJ().hl202Report({
        target: e
    }))), tB = async (e)=>e3.parse(await tW(await tJ().hl202AccountsStart({
        target: e
    }))), tX = async (e, t)=>e3.parse(await tW(await tJ().hl202AccountUpdate({
        target: e,
        kind: "password" === t.kind ? "account_set_password" : "account_set_active",
        entry: t.entry,
        password: t.password,
        active: t.active
    }))), tG = async (e, t, n)=>e6.parse(await tW(await tJ().hl202ExecStart({
        target: e,
        script: t,
        timeout_seconds: n
    })));
let tY = !1;
function t0() {
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
        if (tY) {
            s.textContent = _("Another operation is in progress.");
            return;
        }
        tY = !0, l.disabled = !0, s.textContent = _("Waiting for device result\u2026");
        try {
            var c, d, p, u, h, g, m, f, b, y, v, w, x, z, k, j, C, S, T, $, O, N;
            let e = await tK(t);
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
                    tF("info", `#${String(l.revision)}`)
                ]
            }, o("span", d)), (h = {
                children: [
                    (p = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Last received"),
                            ":"
                        ]
                    }, o("span", p)),
                    (u = {
                        children: tV("number" == typeof l.last_received ? l.last_received : void 0)
                    }, o("strong", u))
                ]
            }, o("span", h)), (f = {
                children: [
                    (g = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Last good report"),
                            ":"
                        ]
                    }, o("span", g)),
                    (m = {
                        children: tV("number" == typeof l.last_good ? l.last_good : void 0)
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
                                                children: tQ(d.member)
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
            tY = !1, l.disabled = !n;
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
let t2 = L.view;
if (!("extend" in t2) || "function" != typeof t2.extend) throw Error("LuCI view extension is unavailable");
let main = Reflect.apply(t2.extend, t2, [
    {
        load: ()=>tI("hl202"),
        render: function() {
            var e, t, n, r, i, a, s, l, c, d, p, u, h;
            let g, m, f, b, y, v = o("select", {
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
            }, o("div", n)), O = t0(), N = (g = null, m = o("div", {
                style: "font-size:88%;color:#888;margin:6px 0",
                "aria-live": "polite"
            }), f = o("div", {
                style: "margin-top:10px;display:flex;flex-direction:column;gap:10px"
            }), (b = o("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                children: _("Read users")
            })).disabled = !L.hasViewPermission(), y = async ()=>{
                if (!g) {
                    m.textContent = _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
                    return;
                }
                if (tY) {
                    m.textContent = _("Another operation is in progress.");
                    return;
                }
                tY = !0, b.disabled = !0, m.textContent = _("Waiting for device result\u2026");
                let e = g;
                try {
                    let h = await tB(e);
                    if (JSON.stringify(e) !== JSON.stringify(g)) return;
                    f.replaceChildren();
                    let b = h.operation, y = b.result;
                    if ("timeout" === y.status ? m.textContent = _("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.") : m.textContent = b.binding_current ? y.error ?? (null === h.accounts ? _("Account data is unavailable.") : "") : _("Device binding changed; this result is stale."), h.accounts && b.binding_current) {
                        let m = [];
                        for (let f of h.accounts){
                            var t, n, r, i, a, s, l, c, d, p, u;
                            let h = f.entry, b = f.active, y = (t = {
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
                                if (!g || tY || JSON.stringify(e) !== JSON.stringify(g)) return;
                                let t = v.value;
                                if (!t) {
                                    z.textContent = _("Enter a non-empty password.");
                                    return;
                                }
                                v.value = "", tY = !0, w.disabled = x.disabled = !0, z.textContent = _("Waiting for device result\u2026");
                                try {
                                    let n = await tX(e, {
                                        entry: h,
                                        kind: "password",
                                        password: t,
                                        active: b
                                    });
                                    if (JSON.stringify(e) !== JSON.stringify(g)) return;
                                    let r = n.operation, i = r.result;
                                    r.binding_current && "accepted_and_saved" === n.write_status ? z.textContent = _("Password accepted and saved; web login permission is not verified.") : z.textContent = i.error ?? _("Execution outcome is unknown. Do not automatically retry.");
                                } catch (e) {
                                    z.textContent = e instanceof Error ? e.message : _("Request failed");
                                } finally{
                                    tY = !1, w.disabled = x.disabled = !L.hasViewPermission();
                                }
                            }), x.addEventListener("click", async ()=>{
                                if (g && !tY && JSON.stringify(e) === JSON.stringify(g)) {
                                    tY = !0, w.disabled = x.disabled = !0, z.textContent = _("Waiting for device result\u2026");
                                    try {
                                        let t = !b, n = await tX(e, {
                                            entry: h,
                                            kind: "active",
                                            password: "",
                                            active: t
                                        });
                                        if (JSON.stringify(e) !== JSON.stringify(g)) return;
                                        let r = n.accounts?.find((e)=>e.entry === h);
                                        if (!n.operation.binding_current || "accepted_and_saved" !== n.write_status || !r) {
                                            z.textContent = n.operation.result.error ?? _("Execution outcome is unknown. Refresh users before retrying.");
                                            return;
                                        }
                                        b = r.active, y.className = `hl202-badge ${b ? "hl202-badge-success" : "hl202-badge-neutral"}`, y.textContent = b ? _("Enabled") : _("Disabled"), x.className = `cbi-button ${b ? "cbi-button-neutral" : "cbi-button-apply"}`, x.textContent = b ? _("Disable") : _("Enable"), z.textContent = `${String(n.write_status)}; ${_("Refresh users to read the current state.")}`;
                                    } catch (e) {
                                        z.textContent = e instanceof Error ? e.message : _("Request failed");
                                    } finally{
                                        tY = !1, w.disabled = x.disabled = !L.hasViewPermission();
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
                                                        children: _("(Entry %s)").replace("%s", String(h))
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
                    tY = !1, b.disabled = !g || !L.hasViewPermission();
                }
            }, b.addEventListener("click", ()=>{
                y();
            }), {
                element: (h = {
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
                }, o("div", h)),
                setTarget (e) {
                    JSON.stringify(e) !== JSON.stringify(g) && (f.replaceChildren(), m.textContent = ""), g = e, b.disabled = !e || !L.hasViewPermission();
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
                }), h = o("button", {
                    type: "button",
                    class: "fttr-btn-subtle",
                    onclick: ()=>{
                        p.textContent = "", p.style.display = "none", d.replaceChildren();
                    },
                    children: _("Clear output")
                }), g = async ()=>{
                    var e, t, n, r, a, g, m, f, b, y, v;
                    if (!i) return void d.replaceChildren(o("div", {
                        class: "alert-message warning",
                        children: _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
                    }));
                    if (tY) return void d.replaceChildren(o("div", {
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
                    tY = !0, c.disabled = !0, p.style.display = "block", p.textContent = `# [${new Date().toLocaleTimeString()}] ${_("Dispatching to %s (timeout: %s s)...").format(i.optical_sn, String(w))}\n`, d.replaceChildren(tF("info", _("Waiting for device result\u2026")));
                    let z = Date.now(), k = i;
                    try {
                        let l = await tG(k, s.value, w);
                        if (JSON.stringify(k) !== JSON.stringify(i)) return;
                        let c = ((Date.now() - z) / 1000).toFixed(2), v = l.operation, x = v.result, j = x.status, C = x.exit_code, S = v.binding_current && !x.error && "executed" === j && 0 === C, T = tF(S ? "success" : "timeout" === j ? "warning" : "danger", S ? _("Success") : "timeout" === j ? _("Timeout") : `${_("Exit code")} ${String(C ?? j)}`);
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
                        }, o("span", n)), (g = {
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
                        }, o("span", g)), (b = {
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
                                h
                            ]
                        }, o("div", y)));
                        let $ = [];
                        v.binding_current || $.push(_("Device binding changed; this result is stale.")), ("timeout" === j || "dispatched" === j) && $.push(_("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.")), "string" == typeof x.output && x.output.length && $.push(x.output), "string" == typeof x.error && x.error.length && $.push(`[STDERR]\n${x.error}`), !0 === x.output_truncated && $.push(`\n[!] ${_("Output was truncated at the byte limit.")}`), 0 === $.length && $.push(_("No output returned.")), p.textContent = $.join("\n");
                    } catch (t) {
                        let e = ((Date.now() - z) / 1000).toFixed(2);
                        d.replaceChildren(tF("danger", _("Failed")), (v = {
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
                                h
                            ]
                        })), p.textContent = `[ERROR] ${t instanceof Error ? t.message : _("Request failed")}`;
                    } finally{
                        tY = !1, c.disabled = !i || !L.hasViewPermission();
                    }
                };
                c.addEventListener("click", ()=>{
                    g();
                }), s.addEventListener("keydown", (e)=>{
                    (e.ctrlKey || e.metaKey) && "Enter" === e.key && (e.preventDefault(), g());
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
                    let t = await tH(), n = t.devices;
                    F = n;
                    let r = n.map((e)=>`${e.optical_sn}:${e.onu_id}:${e.optical_online}:${e.can_execute}:${e.report_revision}:${e.mqtt?.binding_generation}`).join("|");
                    if (r !== W) {
                        W = r;
                        let e = v.value;
                        v.replaceChildren(...n.map((e)=>{
                            var t;
                            return t = {
                                value: e.optical_sn,
                                children: tQ(`${e.model} / ${e.optical_sn} / ONU ${e.onu_id} \u{2014} ${e.can_execute ? _("MQTT ready") : _("MQTT unavailable")}; ${e.optical_online ? _("Optical online") : _("Optical offline")}`)
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
                            children: tQ(`${n.mqtt_mac} \u{2014} ${String(n.reason)}`)
                        }, o("option", e)));
                    }
                    A = a, a.some((e)=>e.mqtt_mac === i) && (R.value = i), M.disabled = 0 === a.length, K();
                    let s = n.find((e)=>e.optical_sn === v.value);
                    s?.can_execute && null !== s.report_revision && `${s.optical_sn}:${s.mqtt?.binding_generation}:${s.report_revision}` !== H && !tY && (H = `${s.optical_sn}:${s.mqtt?.binding_generation}:${s.report_revision}`, O.refresh());
                } catch (e) {
                    F = [], K(), x.textContent = e instanceof Error ? e.message : _("Request failed");
                } finally{
                    w.disabled = !1;
                }
            };
            v.addEventListener("change", K), M.addEventListener("click", ()=>{
                let e = A.find((e)=>e.mqtt_mac === R.value);
                if (Z.replaceChildren(), e) {
                    let t = t0();
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