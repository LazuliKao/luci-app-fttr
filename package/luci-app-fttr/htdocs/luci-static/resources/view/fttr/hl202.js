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
const o = Symbol.for("jsx.fragment");
function s(e, t) {
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
function l(e, t, n) {
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
function T(e, t, n) {
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
function j(e, t) {
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
}, P = l("$ZodError", N), M = l("$ZodError", N, {
    Parent: Error
}), R = (n = M, (e, t, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !1
    }) : {
        async: !1
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise) throw new d();
    if (o.issues.length) {
        let e = new (i?.Err ?? n)(o.issues.map((e)=>O(e, a, p())));
        throw v(e, i?.callee), e;
    }
    return o.value;
}), Z = (r = M, async (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (i?.Err ?? r)(o.issues.map((e)=>O(e, a, p())));
        throw v(e, i?.callee), e;
    }
    return o.value;
}), q = (i = M, (e, t, n)=>{
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
        error: new (i ?? P)(a.issues.map((e)=>O(e, r, p())))
    } : {
        success: !0,
        data: a.value
    };
}), A = (a = M, async (e, t, n)=>{
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
                let t = e.issues.length, o = a._zod.check(e);
                if (o instanceof Promise && n?.async === !1) throw new d();
                if (r || o instanceof Promise) r = (r ?? Promise.resolve()).then(async ()=>{
                    await o, e.issues.length !== t && (i || (i = S(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = S(e, t));
                }
            }
            return r ? r.then(()=>e) : e;
        }, n = (n, i, a)=>{
            if (S(n)) return n.aborted = !0, n;
            let o = t(i, r, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new d();
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
                if (!1 === a.async) throw new d();
                return o.then((e)=>t(e, r, a));
            }
            return t(o, r, a);
        };
    }
    f(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = q(e, t);
                    return n.success ? {
                        value: n.data
                    } : {
                        issues: n.error?.issues
                    };
                } catch (n) {
                    return A(e, t).then((e)=>e.success ? {
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
    e.issues.length && t.issues.push(...j(n, e.issues)), t.value[n] = e.value;
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
            let o = i[e], s = t.element._zod.run({
                value: o,
                issues: []
            }, r);
            s instanceof Promise ? a.push(s.then((t)=>B(t, n, e))) : B(s, n, e);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
});
function G(e, t, n, r, i) {
    if (e.issues.length) {
        if (i && !(n in r)) return;
        t.issues.push(...j(n, e.issues));
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
        let o = t.value;
        if (!w(o)) return t.issues.push({
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
            a instanceof Promise ? s.push(a.then((n)=>G(n, t, e, o, i))) : G(a, t, e, o, i);
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
                a instanceof Promise ? e.push(a.then((e)=>G(e, n, i, t, c))) : G(a, n, i, t, c);
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
            return RegExp(`^(${e.map((e)=>h(e.source)).join("|")})$`);
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
        return o ? Promise.all(s).then((t)=>ee(t, i, e, a)) : ee(s, i, e, a);
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
        let o = i.value;
        if (!w(o)) return i.issues.push({
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
}), er = l("$ZodRecord", (e, t)=>{
    Q.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!x(i)) return n.issues.push({
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
                    t.issues.length && n.issues.push(...j(e, t.issues)), n.value[e] = t.value;
                })) : (o.issues.length && n.issues.push(...j(e, o.issues)), n.value[e] = o.value);
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
            if ("string" == typeof o && D.test(o) && s.issues.length) {
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
                    issues: s.issues.map((e)=>O(e, r, p())),
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
                e.issues.length && n.issues.push(...j(o, e.issues)), n.value[s.value] = e.value;
            })) : (l.issues.length && n.issues.push(...j(o, l.issues)), n.value[s.value] = l.value);
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
function eo(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const es = l("$ZodOptional", (e, t)=>{
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
}), el = l("$ZodNullable", (e, t)=>{
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
}), ec = l("$ZodLazy", (e, t)=>{
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
    Q.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>R(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>q(e, t, n), e.parseAsync = async (t, n)=>Z(e, t, n, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, n)=>A(e, t, n), e.check = (...n)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, n)=>T(e, t, n), e.brand = ()=>e, e.register = (t, n)=>(t.add(e, n), e), e.apply = (t)=>t(e);
}), eu = l("ZodMiniString", (e, t)=>{
    V.init(e, t), ep.init(e, t);
});
function e_(e) {
    return new eu({
        type: "string",
        ...C(e)
    });
}
const eg = l("ZodMiniNumber", (e, t)=>{
    F.init(e, t), ep.init(e, t);
});
function eh(e) {
    return new eg({
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
function eT(e, t) {
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
    return T(e, r);
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
const ej = l("ZodMiniDiscriminatedUnion", (e, t)=>{
    en.init(e, t), ep.init(e, t);
});
function e$(e, t, n) {
    return new ej({
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
const eM = l("ZodMiniLiteral", (e, t)=>{
    ea.init(e, t), ep.init(e, t);
});
function eL(e, t) {
    return new eM({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...C(t)
    });
}
const eR = l("ZodMiniOptional", (e, t)=>{
    es.init(e, t), ep.init(e, t);
});
function eZ(e) {
    return new eR({
        type: "optional",
        innerType: e
    });
}
const eq = l("ZodMiniNullable", (e, t)=>{
    el.init(e, t), ep.init(e, t);
});
function eA(e) {
    return new eq({
        type: "nullable",
        innerType: e
    });
}
const eD = l("ZodMiniCatch", (e, t)=>{
    ed.init(e, t), ep.init(e, t);
}), eJ = l("ZodMiniLazy", (e, t)=>{
    ec.init(e, t), ep.init(e, t);
});
function eU() {
    let e = new eJ({
        type: "lazy",
        getter: ()=>eS([
                e_(),
                eh(),
                ef(),
                new eb({
                    type: "null",
                    ...C(void 0)
                }),
                ex(e),
                eE(e_(), e)
            ])
    });
    return e;
}
let eI = ek({
    error: eS([
        e_(),
        ek({
            code: e_(),
            message: e_()
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
    status: eL("pending"),
    job: e_()
}), eW = e$("status", [
    ek({
        status: eL("pending")
    }),
    ek({
        status: eL("ready"),
        chunk: eh(),
        chunks: eh(),
        bytes: eh(),
        data: e_()
    })
]);
let eH = e_(), eK = eh(), eB = ef(), eX = eZ(eH), eG = eZ(eK), eY = eZ(eB);
const e0 = eP([
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
]), e2 = eP([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), e1 = ek({
    id: eH,
    name: eZ(eA(eH)),
    kind: eP([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eH,
    state: eH,
    reason: eX,
    revision: eX,
    current_revision: eY,
    management_fresh: eY,
    operation_id: eG,
    task_id: eZ(eA(eK)),
    updated_at: eG,
    changes: eZ(ex(ek({
        name: eH,
        desired: eH
    })))
});
let e8 = ek({
    state: eH,
    reason: eX,
    task_id: eZ(eA(eK)),
    instance: eG
});
const e4 = ek({
    cwmp_id: eH,
    state: eP([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: eB,
    last_inform: eA(eK),
    age_seconds: eA(eK)
});
let e3 = ek({
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
    method: eX,
    reason: eX,
    mqtt_target: eA(eH),
    binding_source: eX,
    link_identity_error: eA(eH),
    mqtt_last_seen: eA(eK),
    cwmp_id: eX,
    desired_version: eX,
    generation: eG,
    inflight: eY,
    attempts: eG,
    next_retry_at: eG,
    updated_at: eG,
    settings_verified_at: eA(eK),
    last_inform: eA(eK),
    last_error: eZ(eA(eH)),
    persistence_error: eZ(eA(eH)),
    desired: eZ(eA(ek({
        vlan: eK,
        vlans: ex(eK),
        priority: eK,
        acs_url: eH
    }))),
    listener: eZ(ek({
        enabled: eB,
        listen: eH,
        path: eH,
        error: eA(eH)
    })),
    endpoint_notice: eX,
    manual_steps: eZ(ex(eH))
});
const e5 = e$("state", [
    e3,
    eT(function(e) {
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
                    t[e] && (r[e] = eR ? new eR({
                        type: "optional",
                        innerType: n[e]
                    }) : n[e]);
                }
                else for(let e in n)r[e] = eR ? new eR({
                    type: "optional",
                    innerType: n[e]
                }) : n[e];
                return b(this, "shape", r), r;
            },
            checks: []
        });
        return T(e, r);
    }(e3), {
        state: eP([
            "pending",
            "unavailable"
        ]),
        reason: eH
    })
]), e6 = ek({
    backend: eZ(ek({
        configured: eH,
        effective: eH,
        available: ex(eH),
        reason: eH
    })),
    state: e0,
    operation_id: eG,
    device: eX,
    optical_sn: eX,
    cwmp_id: eX,
    revision: eX,
    mode: eZ(eP([
        "apply",
        "plan"
    ])),
    started_at: eG,
    current_revision: eY,
    management_fresh: eY,
    reason: eX,
    error: eX,
    attempts: eG,
    next_retry_at: eG,
    reconcile_reason: eX,
    items: ex(e1),
    cwmp_contract: eZ(ek({
        state: eH,
        requested: eH,
        contract: eA(eH),
        reason: eH,
        cache_hit: eB,
        schema: eH,
        capabilities: eA(ek({
            wan: eH,
            wlan: eH,
            binding: eH
        }))
    })),
    wan_objects: eZ(eE(eH, eU())),
    wan_lifecycle: eZ(eE(eH, e8)),
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
        owned: ex(eK),
        pending: eA(eH),
        pending_instance: eA(eK)
    })),
    wifi_lifecycle: eZ(eE(eH, e8)),
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
let e7 = ek({
    enabled: eB,
    mode: eP([
        "auto",
        "manual"
    ]),
    vlan: ex(eK),
    priority: eK,
    address: eH,
    acs_url: eH,
    port: eK,
    path: eH,
    dhcp_enabled: eB
}), e9 = ek({
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
    error: eA(eH),
    inflight: eB,
    ready: eB,
    desired_version: eA(eH),
    applied_version: eA(eH),
    next_retry_at: eK,
    attempts: eK,
    desired: eA(e7),
    applied: eA(e7),
    previous: eA(e7),
    plan: ex(ek({
        operation: eH,
        key: eH,
        value: ex(eH)
    }))
});
const te = ek({
    device: eH,
    name: eA(eH),
    group: eA(eH),
    group_name: eA(eH),
    template: eA(eH),
    template_name: eA(eH),
    optical_sn: eH,
    adapter: eH,
    omci_management: ek({
        state: eH,
        reason: eZ(eA(eH))
    }),
    management: eA(e4),
    acs_bootstrap: e5,
    provisioning: e6,
    services: ex(e1),
    ssids: ex(e1),
    wifi_sync: e2
}), tt = ek({
    enabled: eB,
    mode: eP([
        "auto",
        "manual"
    ]),
    method: eL("diff"),
    revision: eH,
    triggers: ex(eH),
    interval_minutes: new eg({
        type: "number",
        coerce: !0,
        checks: [],
        ...C(void 0)
    }),
    error: eA(eH),
    devices: ex(te),
    management_network: e9,
    omci_management: eU(),
    groups: ex(ek({
        id: eH,
        name: eA(eH),
        template: eH
    })),
    pending_devices: ex(eH)
}), tn = eS([
    ek({
        valid: eL(!0),
        revision: eH,
        devices: eK,
        error: eZ(ev())
    }),
    ek({
        error: eH,
        valid: eZ(ev()),
        revision: eZ(ev()),
        devices: eZ(ev())
    })
]), tr = ek({
    restarting: eL(!0)
}), ti = eS([
    ek({
        operation_ids: ex(eK),
        revision: eH
    }),
    ek({
        started: eL(!0),
        mode: eP([
            "apply",
            "plan"
        ])
    }),
    ek({
        reset: eL(!0),
        device: eH
    }),
    ek({
        operation_ids: ex(eK),
        mode: eP([
            "apply",
            "plan"
        ]),
        reconcile: eY,
        retry: eY
    })
]);
let ta = e_(), to = eh(), ts = eA(to), tl = eE(ta, ek({
    source: ta,
    unit: ta,
    reason: eA(ta),
    raw: eA(ta),
    age_seconds: ts
}));
const td = ek({
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
    generation: to,
    error: eA(ta)
}), tc = eP([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tp = ek({
    model: ta,
    wavelength_tx_nm: to,
    wavelength_rx_nm: to,
    phy_rate_downlink_gbps: to,
    phy_rate_uplink_gbps: to,
    tx_power_dbm: ts,
    laser_bias_current_ma: ts,
    temperature_celsius: ts,
    vcc_voltage: ts,
    cdr_locked: eA(ef()),
    tx_enabled: eA(ef()),
    measurements: tl
}), tu = ek({
    equipment_id: eA(ta),
    hardware_version: eA(ta),
    software_images: ex(ta),
    omcc_version: ts,
    errors: ex(ta)
});
const t_ = ek({
    onu_id: to,
    vendor: ta,
    model: ta,
    serial_number: ta,
    state: tc,
    business_status: td,
    management: eA(e4),
    provisioning: eA(e6),
    services: ex(e1),
    ssids: ex(e1),
    wifi_sync: e2,
    acs_bootstrap: eZ(e5),
    identity: eA(tu),
    identity_age_seconds: ts,
    identity_current: ef(),
    fiber_distance_m: ts,
    ranging_delay_rtd_ns: ts,
    equalization_delay_bits: new eD({
        type: "catch",
        innerType: ts,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: ts,
    optical_tx_power_dbm: ts,
    firmware_version: ta,
    hardware_version: ta,
    uptime_seconds: ts,
    data_path: ek({
        interface: ta,
        gem_ports: eA(ex(to)),
        vlan_id: ts,
        tx_bytes: ts,
        rx_bytes: ts,
        current_tx_kbps: ts,
        current_rx_kbps: ts,
        offload: eZ(ek({
            enabled: eZ(eA(ef())),
            routed_enabled: eZ(eA(ef())),
            bridge_enabled: eZ(eA(ef())),
            engine_attached: eZ(eA(ef())),
            forwarding_verified: eZ(eA(ef()))
        })),
        measurements: tl
    }),
    wifi_mesh: ek({
        channel_2g: ts,
        channel_5g: ts,
        bandwidth_5g: eA(ta),
        tx_power_pct: ts,
        measurements: tl
    }),
    connected_clients: eA(ex(ek({
        mac: ta,
        ip: ta,
        band: ta,
        rssi_dbm: ts,
        rx_rate_mbps: ts,
        tx_rate_mbps: ts
    }))),
    measurements: tl
});
let tg = ek({
    reserved_sn: eZ(ta),
    port: to,
    interface: ta,
    carrier: ef(),
    status: ta,
    onu_id: eZ(to),
    onu_sn: eZ(ta),
    link_state: ta
});
const th = ek({
    counters_valid: eZ(ef()),
    packets_exact: eZ(ta),
    bytes_exact: eZ(ta),
    index: ta,
    state: ta,
    pkt_type: ta,
    orig_tuple: ta,
    new_tuple: ta,
    eth: ta,
    vlan: ta,
    packets: to,
    bytes: to
}), tm = ek({
    sampled_at_ms: eZ(to),
    errors: eZ(ex(ta)),
    config_valid: eZ(ef()),
    engine_valid: eZ(ef()),
    mask_valid: eZ(ef()),
    routed_mask_valid: eZ(ef()),
    debug_valid: eZ(ef()),
    flows_valid: eZ(ef()),
    entries_valid: eZ(ef()),
    counters_valid: eZ(ef()),
    hooks_valid: eZ(ef()),
    total_packets_exact: eZ(ta),
    total_bytes_exact: eZ(ta),
    supported: ef(),
    engine_attached: ef(),
    bridge_offload_enabled: ef(),
    bridge_offload_mask: to,
    routed_offload_mask: to,
    bridge_offload_debug: ef(),
    bridge: ta,
    active_ports: ex(ta),
    fw4_hooks_ready: ef(),
    total_entries: to,
    bound_entries: to,
    total_packets: to,
    total_bytes: to,
    bound_flows: ex(th)
}), tf = eT(tm, {
    sampled_at_ms: to,
    errors: ex(ta),
    config_valid: ef(),
    engine_valid: ef(),
    mask_valid: ef(),
    routed_mask_valid: ef(),
    debug_valid: ef(),
    flows_valid: ef(),
    entries_valid: ef(),
    counters_valid: ef(),
    hooks_valid: ef(),
    total_packets_exact: ta,
    total_bytes_exact: ta,
    bound_ipv4_entries: to,
    bound_ipv6_entries: to,
    bound_flows: ex(eT(th, {
        counters_valid: ef(),
        packets_exact: ta,
        bytes_exact: ta
    }))
}), tb = ek({
    onu_pinning: eZ(ek({
        desired: eE(ta, to),
        active: eE(ta, to),
        pending_restart: ef(),
        allocation_blocked: ef(),
        startup_error: eA(ta),
        config_error: eA(ta)
    })),
    fpga_status: ta,
    provisioning: eA(tt),
    optical_transceiver: tp,
    switch_ports: ex(tg),
    sub_gateways: ex(t_),
    telemetry_gateways: ex(ek({
        id: ta,
        last_seen_sec_ago: to,
        last_payload_bytes: to
    })),
    npu: eZ(eA(tm))
});
eE(ta, ek({
    carrier: eZ(ef()),
    mac: eZ(ta),
    link: eZ(ek({
        speed: eZ(to),
        duplex: eZ(ta),
        autoneg: eZ(ef())
    })),
    stats: eZ(eE(ta, to))
}));
const ty = ek({
    schema_version: eL(1),
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
    desired_enabled: eA(ef()),
    tx_enabled: eA(ef()),
    actor_state: eP([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: ef(),
    discovery_active: ef(),
    cleanup_pending: ef(),
    error: eA(ek({
        code: e_(),
        message: e_()
    }))
}), tv = ek({
    schema_version: eL(1),
    version: e_(),
    features: eE(e_(), ef()),
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
        id: e_(),
        name: e_()
    }))
}), tw = async ()=>{
    var e, n;
    let r, i, a, o, s, l, d, c, p, u;
    return (t ??= (e = L.rpc, n = {
        getCapabilities: {
            parse: (e)=>tv.parse(eV(e))
        },
        opticalStatus: ty,
        opticalSet: ty,
        getStatus: {
            parse: (e)=>tb.parse(eV(e))
        },
        getSync: {
            parse: (e)=>tt.parse(eV(e))
        },
        configCheck: tn,
        npuStatus: tf,
        configReload: {
            parse: (e)=>tt.parse(eV(e))
        },
        restartService: {
            parse: (e)=>tr.parse(eV(e))
        },
        sync: {
            parse: (e)=>ti.parse(eV(e))
        }
    }, r = e.declare({
        object: "fttr",
        method: "get_capabilities",
        reject: !0
    }), i = e.declare({
        object: "fttr",
        method: "optical_status",
        reject: !0
    }), a = e.declare({
        object: "fttr",
        method: "optical_set",
        params: [
            "enabled"
        ],
        reject: !0
    }), o = e.declare({
        object: "fttr",
        method: "get_status",
        reject: !0
    }), s = e.declare({
        object: "fttr",
        method: "get_sync",
        reject: !0
    }), l = e.declare({
        object: "fttr",
        method: "config_check",
        reject: !0
    }), d = e.declare({
        object: "fttr",
        method: "npu_status",
        reject: !0
    }), c = e.declare({
        object: "fttr",
        method: "config_reload",
        reject: !0
    }), p = e.declare({
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
    }), {
        getCapabilities: async ()=>n.getCapabilities.parse(await r()),
        opticalStatus: async ()=>n.opticalStatus.parse(await i()),
        opticalSet: async (e)=>n.opticalSet.parse(await a(e.enabled)),
        getStatus: async ()=>n.getStatus.parse(await o()),
        getSync: async ()=>n.getSync.parse(await s()),
        configCheck: async ()=>n.configCheck.parse(await l()),
        npuStatus: async ()=>n.npuStatus.parse(await d()),
        configReload: async ()=>n.configReload.parse(await c()),
        restartService: async ()=>n.restartService.parse(await p()),
        sync: async (e)=>n.sync.parse(await u(e.action, e.target, e.management, e.item))
    })).getCapabilities();
};
async function tx(e) {
    if (!(await tw()).pages[e]) throw Error(_("This page is not supported by the installed FTTR build."));
}
_("Ready"), _("Online"), _("Success"), _("Offline"), _("Error"), _("Failed"), _("Timeout"), _("Pending"), _("Running"), _("Unavailable"), _("Disabled"), _("Enabled");
const tz = (e)=>null == e || "" === e ? "\u2014" : String(e), tk = (e)=>e ? new Date(1000 * e).toLocaleString() : "\u2014";
function tT(e, t, n) {
    return s("span", {
        class: `hl202-badge hl202-badge-${e}`,
        title: n,
        children: t
    });
}
let tC = e_(), tS = eh(), tj = ef();
ek({
    optical_sn: tC,
    onu_id: tS,
    binding_generation: tC
}), ek({
    mqtt_mac: tC,
    binding_generation: tC
});
let t$ = ek({
    mqtt_mac: tC,
    optical_sn: eA(tC),
    onu_id: eA(tS),
    binding_generation: tC,
    last_seen: tS,
    reason: tC
}), tO = {
    target: tC,
    request_id: eZ(tC),
    output: eZ(tC),
    output_truncated: tj,
    error: eZ(tC)
};
const tE = e$("status", [
    ek({
        ...tO,
        status: eL("executed"),
        exit_code: eA(tS)
    }),
    ek({
        ...tO,
        status: eL("dispatched"),
        exit_code: eZ(ev())
    }),
    ek({
        ...tO,
        status: eL("timeout"),
        exit_code: eZ(ev())
    }),
    ek({
        ...tO,
        status: eL("error"),
        exit_code: eZ(ev())
    })
]);
let tN = ek({
    target: t$,
    result: tE,
    binding_current: tj
}), tP = ek({
    schema_version: tS,
    compressed_bytes: tS,
    decompressed_bytes: tS,
    fields: eE(tC, ek({
        value: eU(),
        member: tC,
        unit: eA(tC)
    })),
    members: ex(ek({
        name: tC,
        bytes: tS,
        encoding: tC,
        text: eA(tC),
        text_omitted: tj
    })),
    errors: ex(tC)
}), tM = ek({
    revision: tS,
    last_received: tS,
    last_processed_receipt: eA(tS),
    last_good: eA(tS),
    error: eA(tC),
    report: eA(tP)
}), tL = {
    schema_version: eL(1),
    target: t$,
    report: eA(tM)
};
const tR = eS([
    ek({
        ...tL,
        state: eP([
            "received",
            "report_unavailable"
        ])
    }),
    ek({
        ...tL,
        read_only: eL(!0)
    })
]), tZ = ek({
    schema_version: eL(1),
    devices: ex(ek({
        optical_sn: tC,
        onu_id: tS,
        model: tC,
        optical_online: tj,
        can_execute: tj,
        mqtt: eA(t$),
        report_revision: eA(tS)
    })),
    sources: ex(t$)
}), tq = ek({
    schema_version: eL(1),
    operation: tN,
    accounts: eA(ex(ek({
        entry: eS([
            eL(0),
            eL(1),
            eL(2)
        ]),
        username: tC,
        active: tj
    }))),
    write_status: eP([
        "not_applicable",
        "accepted_and_saved",
        "unconfirmed"
    ])
}), tA = ek({
    schema_version: eL(1),
    operation: tN
});
let tD = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_list",
    reject: !0
}), tJ = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_job_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
}), tU = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_report",
    params: [
        "target"
    ],
    reject: !0
}), tI = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_accounts_start",
    params: [
        "target"
    ],
    reject: !0
}), tQ = L.rpc.declare({
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
}), tV = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_exec_start",
    params: [
        "target",
        "script",
        "timeout_seconds"
    ],
    reject: !0
});
async function tF(e) {
    let t = eF.parse(eV(e)), n = Date.now() + 330000, r = window.location.pathname, i = [], a = 0, o = null;
    for(let e = 0; e < 128;){
        if (window.location.pathname !== r) throw new eQ("navigation", _("Result polling stopped after leaving the page. The backend job is not cancelled."));
        if (Date.now() > n) throw new eQ("timeout", _("Job polling timed out; execution outcome is unknown. Do not automatically retry."));
        let s = eW.parse(eV(await tJ(t.job, e)));
        switch(s.status){
            case "pending":
                await new Promise((e)=>window.setTimeout(e, 1000));
                continue;
            case "ready":
                {
                    if (!Number.isInteger(s.chunks) || s.chunks < 1 || s.chunks > 128 || s.chunk !== e || !Number.isInteger(s.bytes) || s.bytes < 1 || s.bytes > 4194304 || s.data.length > 43692) throw new eQ("transport", _("Invalid job result"));
                    if (o && (s.chunks !== o.chunks || s.bytes !== o.bytes)) throw new eQ("transport", _("Inconsistent job result chunks"));
                    o = {
                        chunks: s.chunks,
                        bytes: s.bytes
                    };
                    let t = Uint8Array.from(atob(s.data), (e)=>e.charCodeAt(0));
                    if (t.length > 32768 || a + t.length > s.bytes) throw new eQ("transport", _("Job result exceeds the transport limit"));
                    if (i.push(t), a += t.length, ++e === s.chunks) {
                        if (a !== s.bytes) throw new eQ("transport", _("Incomplete job result"));
                        let e = new Uint8Array(a), t = 0;
                        for (let n of i)e.set(n, t), t += n.length;
                        return eV(JSON.parse(new TextDecoder("utf-8", {
                            fatal: !0
                        }).decode(e)));
                    }
                }
        }
    }
    throw new eQ("transport", _("Too many result chunks"));
}
const tW = async ()=>tZ.parse(eV(await tD())), tH = async (e)=>tR.parse(await tF(await tU(e))), tK = async (e)=>tq.parse(await tF(await tI(e))), tB = async (e, t)=>tq.parse(await tF(await tQ(e, `account_set_${t.kind}`, t.entry, t.password, t.active))), tX = async (e, t, n)=>tA.parse(await tF(await tV(e, t, n)));
let tG = !1;
function tY() {
    var e, t;
    let n = null, r = s("div", {
        style: "margin:8px 0;display:flex;align-items:center;flex-wrap:wrap;gap:10px"
    }), i = s("div", {
        style: "overflow-x:auto;margin:8px 0"
    }), a = s("div", {
        style: "margin-top:10px"
    }), o = s("div", {
        style: "font-size:88%;color:#888;margin:6px 0",
        "aria-live": "polite"
    }), l = s("button", {
        type: "button",
        class: "cbi-button cbi-button-action",
        children: _("Read MQTT report")
    }), d = async (e)=>{
        let t = e || n;
        if (!t) {
            o.textContent = _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
            return;
        }
        if (tG) {
            o.textContent = _("Another operation is in progress.");
            return;
        }
        tG = !0, l.disabled = !0, o.textContent = _("Waiting for device result\u2026");
        try {
            var d, c, p, u, g, h, m, f, b, y, v, w, x, z, k, T, C, S, j, $, O, N;
            let e = await tH(t);
            if (JSON.stringify(t) !== JSON.stringify(n)) return;
            if (!e.report) {
                r.replaceChildren(), i.replaceChildren(), a.replaceChildren(), o.textContent = _("No MQTT report has been parsed yet.");
                return;
            }
            let l = e.report;
            if (r.replaceChildren((c = {
                children: [
                    (d = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Revision"),
                            ":"
                        ]
                    }, s("span", d)),
                    tT("info", `#${String(l.revision)}`)
                ]
            }, s("span", c)), (g = {
                children: [
                    (p = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Last received"),
                            ":"
                        ]
                    }, s("span", p)),
                    (u = {
                        children: tk("number" == typeof l.last_received ? l.last_received : void 0)
                    }, s("strong", u))
                ]
            }, s("span", g)), (f = {
                children: [
                    (h = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Last good report"),
                            ":"
                        ]
                    }, s("span", h)),
                    (m = {
                        children: tk("number" == typeof l.last_good ? l.last_good : void 0)
                    }, s("strong", m))
                ]
            }, s("span", f))), "string" == typeof l.error && r.append((b = {
                class: "alert-message warning",
                style: "width:100%;margin-top:6px",
                children: [
                    _("Latest report error"),
                    ": ",
                    l.error
                ]
            }, s("div", b))), l.report) {
                let e = l.report, t = e.fields;
                i.replaceChildren((T = {
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
                        (k = {
                            children: Object.entries(t).map((e)=>{
                                var t, n, r, i, a, o, l;
                                let [d, c] = e, p = c.value, u = null === p ? "\u2014" : `${"object" == typeof p ? JSON.stringify(p) : String(p)}${c.unit ? ` ${c.unit}` : ""}`;
                                return "uptime_seconds" === d && "number" == typeof p && (u = function(e) {
                                    if (void 0 === e || !Number.isFinite(e) || e < 0) return "\u2014";
                                    let t = Math.floor(e / 86400), n = Math.floor(e % 86400 / 3600), r = Math.floor(e % 3600 / 60), i = [];
                                    return t > 0 && i.push(_("%d days").replace("%d", String(t))), (n > 0 || t > 0) && i.push(_("%d hours").replace("%d", String(n))), (r > 0 || n > 0 || t > 0) && i.push(_("%d minutes").replace("%d", String(r))), i.push(_("%d seconds").replace("%d", String(e % 60))), `${i.join(" ")} (${e} s)`;
                                }(p)), l = {
                                    children: [
                                        (n = {
                                            children: (t = {
                                                children: d
                                            }, s("code", t))
                                        }, s("td", n)),
                                        (i = {
                                            children: (r = {
                                                children: u
                                            }, s("strong", r))
                                        }, s("td", i)),
                                        (o = {
                                            children: (a = {
                                                class: "hl202-badge hl202-badge-neutral",
                                                children: tz(c.member)
                                            }, s("span", a))
                                        }, s("td", o))
                                    ]
                                }, s("tr", l);
                            })
                        }, s("tbody", k))
                    ]
                }, s("table", T)));
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
                    }, s("button", C));
                    n.push((N = {
                        style: "margin:6px 0;border:1px solid rgba(127,140,141,0.15);border-radius:4px;padding:4px 8px",
                        children: [
                            (S = {
                                style: "cursor:pointer;user-select:none;font-weight:600;font-size:90%",
                                children: [
                                    _("%s (%s bytes, %s)").format(String(t.name), String(t.bytes), String(t.encoding)),
                                    "string" == typeof t.text ? e : null
                                ]
                            }, s("summary", S)),
                            (O = {
                                style: "margin-top:6px",
                                children: "string" == typeof t.text ? (j = {
                                    class: "hl202-terminal-output",
                                    style: "max-height:16rem",
                                    children: t.text
                                }, s("pre", j)) : ($ = {
                                    style: "font-size:85%;color:#888;margin:4px 0",
                                    children: t.text_omitted ? _("Text omitted at the shared byte limit.") : _("Binary member; text is unavailable.")
                                }, s("p", $))
                            }, s("div", O))
                        ]
                    }, s("details", N)));
                }
                a.replaceChildren(...e.errors.map((e)=>{
                    var t;
                    return t = {
                        class: "alert-message warning",
                        children: e
                    }, s("div", t);
                }), ...n);
            } else i.replaceChildren(), a.replaceChildren();
            o.textContent = "";
        } catch (e) {
            o.textContent = e instanceof Error ? e.message : _("Request failed");
        } finally{
            tG = !1, l.disabled = !n;
        }
    };
    return l.addEventListener("click", ()=>{
        d();
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
                o,
                r,
                i,
                a
            ]
        }, s("div", t)),
        setTarget (e) {
            JSON.stringify(e) !== JSON.stringify(n) && (r.replaceChildren(), i.replaceChildren(), a.replaceChildren(), o.textContent = ""), n = e, l.disabled = !e;
        },
        refresh: (e)=>d(e)
    };
}
let t0 = L.view;
if (!("extend" in t0) || "function" != typeof t0.extend) throw Error("LuCI view extension is unavailable");
let main = Reflect.apply(t0.extend, t0, [
    {
        load: ()=>tx("hl202"),
        render: function() {
            var e, t, n, r, i, a, o, l, d, c, p, u, g;
            let h, m, f, b, y, v = s("select", {
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
            }), k = s("span", {
                class: "hl202-badge hl202-badge-neutral",
                style: "font-size:80%",
                children: "\u2014"
            }), T = s("span", {
                class: "hl202-badge hl202-badge-neutral",
                children: "\u2014"
            }), C = s("span", {
                class: "hl202-badge hl202-badge-neutral",
                children: "\u2014"
            }), S = s("span", {
                class: "hl202-badge hl202-badge-info",
                style: "font-size:80%",
                children: "\u2014"
            }), j = s("div", {
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
                            s("div", {
                                class: "hl202-device-title",
                                children: [
                                    z,
                                    k
                                ]
                            }),
                            s("div", {
                                class: "hl202-device-badges",
                                children: [
                                    T,
                                    C,
                                    S
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
                    j
                ]
            }, s("div", n)), O = tY(), N = (h = null, m = s("div", {
                style: "font-size:88%;color:#888;margin:6px 0",
                "aria-live": "polite"
            }), f = s("div", {
                style: "margin-top:10px;display:flex;flex-direction:column;gap:10px"
            }), (b = s("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                children: _("Read users")
            })).disabled = !L.hasViewPermission(), y = async ()=>{
                if (!h) {
                    m.textContent = _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
                    return;
                }
                if (tG) {
                    m.textContent = _("Another operation is in progress.");
                    return;
                }
                tG = !0, b.disabled = !0, m.textContent = _("Waiting for device result\u2026");
                let e = h;
                try {
                    let g = await tK(e);
                    if (JSON.stringify(e) !== JSON.stringify(h)) return;
                    f.replaceChildren();
                    let b = g.operation, y = b.result;
                    if ("timeout" === y.status ? m.textContent = _("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.") : m.textContent = b.binding_current ? y.error ?? (null === g.accounts ? _("Account data is unavailable.") : "") : _("Device binding changed; this result is stale."), g.accounts && b.binding_current) {
                        let m = [];
                        for (let f of g.accounts){
                            var t, n, r, i, a, o, l, d, c, p, u;
                            let g = f.entry, b = f.active, y = (t = {
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
                            let z = (a = {
                                style: "font-size:82%;margin-top:4px",
                                "aria-live": "polite"
                            }, s("div", a));
                            w.addEventListener("click", async ()=>{
                                if (!h || tG || JSON.stringify(e) !== JSON.stringify(h)) return;
                                let t = v.value;
                                if (!t) {
                                    z.textContent = _("Enter a non-empty password.");
                                    return;
                                }
                                v.value = "", tG = !0, w.disabled = x.disabled = !0, z.textContent = _("Waiting for device result\u2026");
                                try {
                                    let n = await tB(e, {
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
                                    tG = !1, w.disabled = x.disabled = !L.hasViewPermission();
                                }
                            }), x.addEventListener("click", async ()=>{
                                if (h && !tG && JSON.stringify(e) === JSON.stringify(h)) {
                                    tG = !0, w.disabled = x.disabled = !0, z.textContent = _("Waiting for device result\u2026");
                                    try {
                                        let t = !b, n = await tB(e, {
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
                                        tG = !1, w.disabled = x.disabled = !L.hasViewPermission();
                                    }
                                }
                            }), m.push((u = {
                                class: "cbi-section",
                                style: "margin:0;padding:10px 14px;border:1px solid rgba(127,140,141,0.2);border-radius:5px",
                                children: [
                                    (p = {
                                        style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                                        children: [
                                            (d = {
                                                style: "display:flex;align-items:center;gap:8px",
                                                children: [
                                                    (o = {
                                                        style: "font-size:105%",
                                                        children: f.username
                                                    }, s("strong", o)),
                                                    (l = {
                                                        style: "font-size:80%;color:#888",
                                                        children: _("(Entry %s)").replace("%s", String(g))
                                                    }, s("span", l)),
                                                    y
                                                ]
                                            }, s("div", d)),
                                            (c = {
                                                style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px",
                                                children: [
                                                    v,
                                                    w,
                                                    x
                                                ]
                                            }, s("div", c))
                                        ]
                                    }, s("div", p)),
                                    z
                                ]
                            }, s("div", u)));
                        }
                        f.replaceChildren(...m);
                    }
                } catch (e) {
                    m.textContent = e instanceof Error ? e.message : _("Request failed");
                } finally{
                    tG = !1, b.disabled = !h || !L.hasViewPermission();
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
                                s("h3", {
                                    style: "margin:0",
                                    children: _("User management")
                                }),
                                b
                            ]
                        }, s("div", u)),
                        s("p", {
                            style: "font-size:85%;color:#888;margin:4px 0",
                            children: _("Password writes are accepted and saved by the device; this does not prove web login permission. Existing permission masks are preserved.")
                        }),
                        m,
                        f
                    ]
                }, s("div", g)),
                setTarget (e) {
                    JSON.stringify(e) !== JSON.stringify(h) && (f.replaceChildren(), m.textContent = ""), h = e, b.disabled = !e || !L.hasViewPermission();
                },
                refresh: ()=>y()
            }), P = function() {
                var e, t, n, r;
                let i = null, a = s("div", {
                    style: "font-size:88%;color:#666;margin:4px 0"
                }), o = s("textarea", {
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
                }), d = s("button", {
                    type: "button",
                    class: "cbi-button cbi-button-apply",
                    style: "font-weight:600",
                    children: _("Execute on selected HL202")
                });
                d.disabled = !L.hasViewPermission();
                let c = s("div", {
                    style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px"
                }), p = s("pre", {
                    class: "hl202-terminal-output",
                    style: "min-height:4rem;display:none",
                    children: _("# Waiting for commands...")
                }), u = s("button", {
                    type: "button",
                    class: "fttr-btn-subtle",
                    onclick: ()=>{
                        p.textContent && (navigator.clipboard?.writeText(p.textContent), u.textContent = _("Copied to clipboard"), setTimeout(()=>{
                            u.textContent = _("Copy output");
                        }, 1500));
                    },
                    children: _("Copy output")
                }), g = s("button", {
                    type: "button",
                    class: "fttr-btn-subtle",
                    onclick: ()=>{
                        p.textContent = "", p.style.display = "none", c.replaceChildren();
                    },
                    children: _("Clear output")
                }), h = async ()=>{
                    var e, t, n, r, a, h, m, f, b, y, v;
                    if (!i) return void c.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
                    }));
                    if (tG) return void c.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: _("Another operation is in progress.")
                    }));
                    let w = Number(l.value);
                    if (!Number.isInteger(w) || w < 1 || w > 300) return void c.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: _("Timeout must be 1\u2013300 seconds.")
                    }));
                    let x = o.value.trim();
                    if (!x || x.includes("\0") || new TextEncoder().encode(x).length > 65536) return void c.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: _("Enter a non-empty UTF-8 script up to 64 KiB without NUL characters.")
                    }));
                    tG = !0, d.disabled = !0, p.style.display = "block", p.textContent = `# [${new Date().toLocaleTimeString()}] ${_("Dispatching to %s (timeout: %s s)...").format(i.optical_sn, String(w))}\n`, c.replaceChildren(tT("info", _("Waiting for device result\u2026")));
                    let z = Date.now(), k = i;
                    try {
                        let l = await tX(k, o.value, w);
                        if (JSON.stringify(k) !== JSON.stringify(i)) return;
                        let d = ((Date.now() - z) / 1000).toFixed(2), v = l.operation, x = v.result, T = x.status, C = x.exit_code, S = v.binding_current && !x.error && "executed" === T && 0 === C, j = tT(S ? "success" : "timeout" === T ? "warning" : "danger", S ? _("Success") : "timeout" === T ? _("Timeout") : `${_("Exit code")} ${String(C ?? T)}`);
                        c.replaceChildren(j, (n = {
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
                                    children: String(C ?? "\u2014")
                                }, s("code", t))
                            ]
                        }, s("span", n)), (h = {
                            children: [
                                (r = {
                                    style: "color:#888",
                                    children: [
                                        _("Duration"),
                                        ":"
                                    ]
                                }, s("span", r)),
                                " ",
                                (a = {
                                    children: [
                                        d,
                                        " s"
                                    ]
                                }, s("strong", a))
                            ]
                        }, s("span", h)), (b = {
                            children: [
                                (m = {
                                    style: "color:#888",
                                    children: [
                                        _("Request ID"),
                                        ":"
                                    ]
                                }, s("span", m)),
                                " ",
                                (f = {
                                    children: String(x.request_id ?? "\u2014")
                                }, s("code", f))
                            ]
                        }, s("span", b)), (y = {
                            style: "margin-left:auto;display:flex;gap:6px",
                            children: [
                                u,
                                g
                            ]
                        }, s("div", y)));
                        let $ = [];
                        v.binding_current || $.push(_("Device binding changed; this result is stale.")), ("timeout" === T || "dispatched" === T) && $.push(_("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.")), "string" == typeof x.output && x.output.length && $.push(x.output), "string" == typeof x.error && x.error.length && $.push(`[STDERR]\n${x.error}`), !0 === x.output_truncated && $.push(`\n[!] ${_("Output was truncated at the byte limit.")}`), 0 === $.length && $.push(_("No output returned.")), p.textContent = $.join("\n");
                    } catch (t) {
                        let e = ((Date.now() - z) / 1000).toFixed(2);
                        c.replaceChildren(tT("danger", _("Failed")), (v = {
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
                                u,
                                g
                            ]
                        })), p.textContent = `[ERROR] ${t instanceof Error ? t.message : _("Request failed")}`;
                    } finally{
                        tG = !1, d.disabled = !i || !L.hasViewPermission();
                    }
                };
                d.addEventListener("click", ()=>{
                    h();
                }), o.addEventListener("keydown", (e)=>{
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
                        s("span", {
                            style: "font-size:80%;color:#888;margin-right:2px",
                            children: [
                                _("Quick diagnostic commands"),
                                ":"
                            ]
                        }),
                        m.map((e)=>s("button", {
                                type: "button",
                                class: "hl202-snippet-tag",
                                onclick: ()=>{
                                    o.value = e.cmd, o.focus();
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
                            a,
                            f,
                            s("div", {
                                class: "hl202-terminal",
                                style: "margin-bottom:8px",
                                children: o
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
                                        children: d
                                    })
                                ]
                            }, s("div", n)),
                            s("div", {
                                style: "margin-top:10px",
                                children: [
                                    c,
                                    p
                                ]
                            })
                        ]
                    }, s("div", r)),
                    setTarget (e) {
                        var t;
                        JSON.stringify(e) !== JSON.stringify(i) && (c.replaceChildren(), p.textContent = "", p.style.display = "none"), i = e, d.disabled = !e || !L.hasViewPermission(), e ? a.replaceChildren((t = {
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
                        }, s("span", t))) : a.replaceChildren(s("span", {
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
            }), q = [], A = s("pre", {
                style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto"
            }), D = (a = {
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
                                children: A
                            })
                        ]
                    }, s("details", i))
                ]
            }, s("div", a)), J = "report", U = [
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
            ], I = new Map(), Q = (o = {
                class: "cbi-tabmenu",
                style: "margin-top:14px;margin-bottom:0",
                children: U.map((e)=>{
                    var t;
                    let n = (t = {
                        class: J === e.id ? "cbi-tab" : "cbi-tab-disabled",
                        "data-tab": e.id,
                        children: s("a", {
                            href: `#tab-${e.id}`,
                            onclick: (t)=>{
                                t.preventDefault();
                                var n = e.id;
                                for (let [e, t] of (J = n, I))t.className = e === n ? "cbi-tab" : "cbi-tab-disabled";
                                O.element.hidden = "report" !== n, N.element.hidden = "accounts" !== n, P.element.hidden = "console" !== n, D.hidden = "sources" !== n, window.dispatchEvent(new Event("resize"));
                            },
                            children: e.label
                        })
                    }, s("li", t));
                    return I.set(e.id, n), n;
                })
            }, s("ul", o));
            O.element.hidden = !1, N.element.hidden = !0, P.element.hidden = !0, D.hidden = !0;
            let V = s("div", {
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
                    z.textContent = _("No HL202 optical devices were found."), k.textContent = "\u2014", T.textContent = "\u2014", C.textContent = "\u2014", S.textContent = "\u2014", j.hidden = !0, O.setTarget(null), N.setTarget(null), P.setTarget(null);
                    return;
                }
                if (z.textContent = `${t.optical_sn} (ONU ${t.onu_id})`, k.textContent = t.model || "HL202", t.optical_online ? (T.className = "hl202-badge hl202-badge-success", T.textContent = _("Optical online")) : (T.className = "hl202-badge hl202-badge-danger", T.textContent = _("Optical offline")), t.can_execute && t.mqtt) {
                    C.className = "hl202-badge hl202-badge-success", C.textContent = _("MQTT ready"), S.textContent = `gen: ${t.mqtt.binding_generation}`, S.hidden = !1, j.hidden = !0;
                    let e = {
                        optical_sn: t.optical_sn,
                        onu_id: t.onu_id,
                        binding_generation: t.mqtt.binding_generation
                    };
                    O.setTarget(e), N.setTarget(e), P.setTarget(e);
                } else C.className = "hl202-badge hl202-badge-warning", C.textContent = _("MQTT unavailable"), S.hidden = !0, j.hidden = !1, O.setTarget(null), N.setTarget(null), P.setTarget(null);
            }, B = async ()=>{
                w.disabled = !0, x.textContent = _("Loading devices\u2026");
                try {
                    let t = await tW(), n = t.devices;
                    F = n;
                    let r = n.map((e)=>`${e.optical_sn}:${e.onu_id}:${e.optical_online}:${e.can_execute}:${e.report_revision}:${e.mqtt?.binding_generation}`).join("|");
                    if (r !== W) {
                        W = r;
                        let e = v.value;
                        v.replaceChildren(...n.map((e)=>{
                            var t;
                            return t = {
                                value: e.optical_sn,
                                children: tz(`${e.model} / ${e.optical_sn} / ONU ${e.onu_id} \u{2014} ${e.can_execute ? _("MQTT ready") : _("MQTT unavailable")}; ${e.optical_online ? _("Optical online") : _("Optical offline")}`)
                            }, s("option", t);
                        })), n.some((t)=>t.optical_sn === e) && (v.value = e);
                    }
                    x.textContent = n.length ? _("Select a device to inspect reports and run operations.") : _("No HL202 optical devices were found."), A.textContent = JSON.stringify(t.sources, null, 2);
                    let i = M.value, a = [];
                    for (let n of (M.replaceChildren(), t.sources)){
                        var e;
                        a.push({
                            mqtt_mac: n.mqtt_mac,
                            binding_generation: n.binding_generation
                        }), M.append((e = {
                            value: n.mqtt_mac,
                            children: tz(`${n.mqtt_mac} \u{2014} ${String(n.reason)}`)
                        }, s("option", e)));
                    }
                    q = a, a.some((e)=>e.mqtt_mac === i) && (M.value = i), R.disabled = 0 === a.length, K();
                    let o = n.find((e)=>e.optical_sn === v.value);
                    o?.can_execute && null !== o.report_revision && `${o.optical_sn}:${o.mqtt?.binding_generation}:${o.report_revision}` !== H && !tG && (H = `${o.optical_sn}:${o.mqtt?.binding_generation}:${o.report_revision}`, O.refresh());
                } catch (e) {
                    F = [], K(), x.textContent = e instanceof Error ? e.message : _("Request failed");
                } finally{
                    w.disabled = !1;
                }
            };
            v.addEventListener("change", K), R.addEventListener("click", ()=>{
                let e = q.find((e)=>e.mqtt_mac === M.value);
                if (Z.replaceChildren(), e) {
                    let t = tY();
                    t.setTarget(e), Z.append(t.element), t.refresh(e);
                }
            }), w.addEventListener("click", ()=>{
                B();
            }), B();
            let X = (p = {
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
                    (c = {
                        class: "cbi-section",
                        children: [
                            (d = {
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
                            }, s("div", d)),
                            x,
                            $
                        ]
                    }, s("div", c)),
                    Q,
                    V
                ]
            }, s("div", p)), G = async ()=>{
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