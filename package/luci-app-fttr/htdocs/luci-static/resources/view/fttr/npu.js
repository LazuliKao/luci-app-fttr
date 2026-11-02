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
function h(e) {
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const g = Symbol("evaluating");
function v(e, t, n) {
    let r;
    Object.defineProperty(e, t, {
        get () {
            if (r !== g) return void 0 === r && (r = g, r = n()), r;
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
function y(...e) {
    let t = {};
    for (let n of e)Object.assign(t, Object.getOwnPropertyDescriptors(n));
    return Object.defineProperties({}, t);
}
const b = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
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
function x(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function j(e, t, n) {
    let r = new e._zod.constr(t ?? e._zod.def);
    return (!t || n?.parent) && (r._zod.parent = e), r;
}
function P(e) {
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
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise) throw new d();
    if (o.issues.length) {
        let e = new (i?.Err ?? n)(o.issues.map((e)=>T(e, a, u())));
        throw b(e, i?.callee), e;
    }
    return o.value;
}), M = (r = A, async (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (i?.Err ?? r)(o.issues.map((e)=>T(e, a, u())));
        throw b(e, i?.callee), e;
    }
    return o.value;
}), R = (i = A, (e, t, n)=>{
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
}), D = /^-?\d+(?:\.\d+)?$/, F = /^(?:true|false)$/i, q = /^null$/i, I = {
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
    v(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = R(e, t);
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
    V.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? D, e._zod.parse = (n, r)=>{
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
    V.init(e, t), e._zod.pattern = F, e._zod.parse = (n, r)=>{
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
    V.init(e, t), e._zod.pattern = q, e._zod.values = new Set([
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
}), X = l("$ZodNever", (e, t)=>{
    V.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function G(e, t, n) {
    e.issues.length && t.issues.push(...$(n, e.issues)), t.value[n] = e.value;
}
const H = l("$ZodArray", (e, t)=>{
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
            let o = i[e], s = t.element._zod.run({
                value: o,
                issues: []
            }, r);
            s instanceof Promise ? a.push(s.then((t)=>G(t, n, e))) : G(s, n, e);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
});
function Q(e, t, n, r, i) {
    if (e.issues.length) {
        if (i && !(n in r)) return;
        t.issues.push(...$(n, e.issues));
    }
    void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const Y = l("$ZodObject", (e, t)=>{
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
    v(e._zod, "propValues", ()=>{
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
            a instanceof Promise ? s.push(a.then((n)=>Q(n, t, e, o, i))) : Q(a, t, e, o, i);
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
                a instanceof Promise ? e.push(a.then((e)=>Q(e, n, i, t, c))) : Q(a, n, i, t, c);
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
        errors: e.map((e)=>e.issues.map((e)=>T(e, r, u())))
    }), t);
}
const et = l("$ZodUnion", (e, t)=>{
    V.init(e, t), v(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), v(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), v(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), v(e._zod, "pattern", ()=>{
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
    v(e._zod, "propValues", ()=>{
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
    V.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!z(i)) return n.issues.push({
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
                    t.issues.length && n.issues.push(...$(e, t.issues)), n.value[e] = t.value;
                })) : (o.issues.length && n.issues.push(...$(e, o.issues)), n.value[e] = o.value);
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
                    issues: s.issues.map((e)=>T(e, r, u())),
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
                e.issues.length && n.issues.push(...$(o, e.issues)), n.value[s.value] = e.value;
            })) : (l.issues.length && n.issues.push(...$(o, l.issues)), n.value[s.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
}), ei = l("$ZodEnum", (e, t)=>{
    var n;
    let r;
    V.init(e, t);
    let i = (r = Object.values(n = t.entries).filter((e)=>"number" == typeof e), Object.entries(n).filter(([e, t])=>-1 === r.indexOf(+e)).map(([e, t])=>t)), a = new Set(i);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${i.filter((e)=>k.has(typeof e)).map((e)=>"string" == typeof e ? x(e) : e.toString()).join("|")})$`), e._zod.parse = (t, n)=>{
        let r = t.value;
        return a.has(r) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: r,
            inst: e
        }), t;
    };
}), ea = l("$ZodLiteral", (e, t)=>{
    if (V.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? x(e) : e ? x(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i)=>{
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
    V.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", v(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), v(e._zod, "pattern", ()=>{
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
    V.init(e, t), v(e._zod, "optin", ()=>t.innerType._zod.optin), v(e._zod, "optout", ()=>t.innerType._zod.optout), v(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${h(e.source)}|null)$`) : void 0;
    }), v(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), ed = l("$ZodCatch", (e, t)=>{
    V.init(e, t), v(e._zod, "optin", ()=>t.innerType._zod.optin), v(e._zod, "optout", ()=>t.innerType._zod.optout), v(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, n)=>{
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
}), ec = l("$ZodLazy", (e, t)=>{
    V.init(e, t), v(e._zod, "innerType", ()=>t.getter()), v(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), v(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), v(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), v(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n)=>e._zod.innerType._zod.run(t, n);
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
const eu = l("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    V.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>C(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>R(e, t, n), e.parseAsync = async (t, n)=>M(e, t, n, {
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
        }), e.with = e.check, e.clone = (t, n)=>j(e, t, n), e.brand = ()=>e, e.register = (t, n)=>(t.add(e, n), e), e.apply = (t)=>t(e);
}), ep = l("ZodMiniString", (e, t)=>{
    B.init(e, t), eu.init(e, t);
});
function e_(e) {
    return new ep({
        type: "string",
        ...P(e)
    });
}
const ef = l("ZodMiniNumber", (e, t)=>{
    W.init(e, t), eu.init(e, t);
});
function eh(e) {
    return new ef({
        type: "number",
        checks: [],
        ...P(e)
    });
}
const eg = l("ZodMiniBoolean", (e, t)=>{
    J.init(e, t), eu.init(e, t);
});
function ev(e) {
    return new eg({
        type: "boolean",
        ...P(e)
    });
}
const em = l("ZodMiniNull", (e, t)=>{
    K.init(e, t), eu.init(e, t);
}), ey = l("ZodMiniNever", (e, t)=>{
    X.init(e, t), eu.init(e, t);
});
function eb(e) {
    return new ey({
        type: "never",
        ...P(e)
    });
}
const ew = l("ZodMiniArray", (e, t)=>{
    H.init(e, t), eu.init(e, t);
});
function ez(e, t) {
    return new ew({
        type: "array",
        element: e,
        ...P(t)
    });
}
const ek = l("ZodMiniObject", (e, t)=>{
    Y.init(e, t), eu.init(e, t), v(e, "shape", ()=>t.shape);
});
function ex(e, t) {
    return new ek({
        type: "object",
        shape: e ?? {},
        ...P(t)
    });
}
function ej(e, t) {
    if (!z(t)) throw Error("Invalid input to extend: expected a plain object");
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
            return m(this, "shape", n), n;
        }
    });
    return j(e, r);
}
const eP = l("ZodMiniUnion", (e, t)=>{
    et.init(e, t), eu.init(e, t);
});
function eS(e, t) {
    return new eP({
        type: "union",
        options: e,
        ...P(t)
    });
}
const e$ = l("ZodMiniDiscriminatedUnion", (e, t)=>{
    en.init(e, t), eu.init(e, t);
});
function eE(e, t, n) {
    return new e$({
        type: "union",
        options: t,
        discriminator: e,
        ...P(n)
    });
}
const eO = l("ZodMiniRecord", (e, t)=>{
    er.init(e, t), eu.init(e, t);
});
function eT(e, t, n) {
    return new eO({
        type: "record",
        keyType: e,
        valueType: t,
        ...P(n)
    });
}
const eZ = l("ZodMiniEnum", (e, t)=>{
    ei.init(e, t), eu.init(e, t), e.options = Object.values(t.entries);
});
function eN(e, t) {
    return new eZ({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...P(t)
    });
}
const eA = l("ZodMiniLiteral", (e, t)=>{
    ea.init(e, t), eu.init(e, t);
});
function eC(e, t) {
    return new eA({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...P(t)
    });
}
const eL = l("ZodMiniOptional", (e, t)=>{
    es.init(e, t), eu.init(e, t);
});
function eM(e) {
    return new eL({
        type: "optional",
        innerType: e
    });
}
const eR = l("ZodMiniNullable", (e, t)=>{
    el.init(e, t), eu.init(e, t);
});
function eU(e) {
    return new eR({
        type: "nullable",
        innerType: e
    });
}
const eD = l("ZodMiniCatch", (e, t)=>{
    ed.init(e, t), eu.init(e, t);
}), eF = l("ZodMiniLazy", (e, t)=>{
    ec.init(e, t), eu.init(e, t);
});
function eq() {
    let e = new eF({
        type: "lazy",
        getter: ()=>eS([
                e_(),
                eh(),
                ev(),
                new em({
                    type: "null",
                    ...P(void 0)
                }),
                ez(e),
                eT(e_(), e)
            ])
    });
    return e;
}
let eI = ex({
    error: eS([
        e_(),
        ex({
            code: e_(),
            message: e_()
        })
    ])
});
class eV extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eB(e) {
    let t = eI.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eV("rpc", e) : new eV(e.code, e.message);
    }
    return e;
}
ex({
    status: eC("pending"),
    job: e_()
}), eE("status", [
    ex({
        status: eC("pending")
    }),
    ex({
        status: eC("ready"),
        chunk: eh(),
        chunks: eh(),
        bytes: eh(),
        data: e_()
    })
]);
let eW = e_(), eJ = eh(), eK = ev(), eX = eM(eW), eG = eM(eJ), eH = eM(eK);
const eQ = eN([
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
]), eY = eN([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), e0 = ex({
    id: eW,
    name: eM(eU(eW)),
    kind: eN([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eW,
    state: eW,
    reason: eX,
    revision: eX,
    current_revision: eH,
    management_fresh: eH,
    operation_id: eG,
    task_id: eM(eU(eJ)),
    updated_at: eG,
    changes: eM(ez(ex({
        name: eW,
        desired: eW
    })))
});
let e1 = ex({
    state: eW,
    reason: eX,
    task_id: eM(eU(eJ)),
    instance: eG
});
const e2 = ex({
    cwmp_id: eW,
    state: eN([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: eK,
    last_inform: eU(eJ),
    age_seconds: eU(eJ)
});
let e5 = ex({
    state: eN([
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
    mqtt_target: eU(eW),
    binding_source: eX,
    link_identity_error: eU(eW),
    mqtt_last_seen: eU(eJ),
    cwmp_id: eX,
    desired_version: eX,
    generation: eG,
    inflight: eH,
    attempts: eG,
    next_retry_at: eG,
    updated_at: eG,
    settings_verified_at: eU(eJ),
    last_inform: eU(eJ),
    last_error: eM(eU(eW)),
    persistence_error: eM(eU(eW)),
    desired: eM(eU(ex({
        vlan: eJ,
        vlans: ez(eJ),
        priority: eJ,
        acs_url: eW
    }))),
    listener: eM(ex({
        enabled: eK,
        listen: eW,
        path: eW,
        error: eU(eW)
    })),
    endpoint_notice: eX,
    manual_steps: eM(ez(eW))
});
const e6 = eE("state", [
    e5,
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
                return m(this, "shape", r), r;
            },
            checks: []
        });
        return j(e, r);
    }(e5), {
        state: eN([
            "pending",
            "unavailable"
        ]),
        reason: eW
    })
]), e8 = ex({
    backend: eM(ex({
        configured: eW,
        effective: eW,
        available: ez(eW),
        reason: eW
    })),
    state: eQ,
    operation_id: eG,
    device: eX,
    optical_sn: eX,
    cwmp_id: eX,
    revision: eX,
    mode: eM(eN([
        "apply",
        "plan"
    ])),
    started_at: eG,
    current_revision: eH,
    management_fresh: eH,
    reason: eX,
    error: eX,
    attempts: eG,
    next_retry_at: eG,
    reconcile_reason: eX,
    items: ez(e0),
    cwmp_contract: eM(ex({
        state: eW,
        requested: eW,
        contract: eU(eW),
        reason: eW,
        cache_hit: eK,
        schema: eW,
        capabilities: eU(ex({
            wan: eW,
            wlan: eW,
            binding: eW
        }))
    })),
    wan_objects: eM(eT(eW, eq())),
    wan_lifecycle: eM(eT(eW, e1)),
    wan_stage: eM(eN([
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
        owned: ez(eJ),
        pending: eU(eW),
        pending_instance: eU(eJ)
    })),
    wifi_lifecycle: eM(eT(eW, e1)),
    wifi_stage: eM(eN([
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
    wifi_cleanup: eM(eN([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e3 = ex({
    enabled: eK,
    mode: eN([
        "auto",
        "manual"
    ]),
    vlan: ez(eJ),
    priority: eJ,
    address: eW,
    acs_url: eW,
    port: eJ,
    path: eW,
    dhcp_enabled: eK
}), e4 = ex({
    state: eN([
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
    error: eU(eW),
    inflight: eK,
    ready: eK,
    desired_version: eU(eW),
    applied_version: eU(eW),
    next_retry_at: eJ,
    attempts: eJ,
    desired: eU(e3),
    applied: eU(e3),
    previous: eU(e3),
    plan: ez(ex({
        operation: eW,
        key: eW,
        value: ez(eW)
    }))
});
const e9 = ex({
    device: eW,
    name: eU(eW),
    group: eU(eW),
    group_name: eU(eW),
    template: eU(eW),
    template_name: eU(eW),
    optical_sn: eW,
    adapter: eW,
    omci_management: ex({
        state: eW,
        reason: eM(eU(eW))
    }),
    management: eU(e2),
    acs_bootstrap: e6,
    provisioning: e8,
    services: ez(e0),
    ssids: ez(e0),
    wifi_sync: eY
}), e7 = ex({
    enabled: eK,
    mode: eN([
        "auto",
        "manual"
    ]),
    method: eC("diff"),
    revision: eW,
    triggers: ez(eW),
    interval_minutes: new ef({
        type: "number",
        coerce: !0,
        checks: [],
        ...P(void 0)
    }),
    error: eU(eW),
    devices: ez(e9),
    management_network: e4,
    omci_management: eq(),
    groups: ez(ex({
        id: eW,
        name: eU(eW),
        template: eW
    })),
    pending_devices: ez(eW)
}), te = eS([
    ex({
        valid: eC(!0),
        revision: eW,
        devices: eJ,
        error: eM(eb())
    }),
    ex({
        error: eW,
        valid: eM(eb()),
        revision: eM(eb()),
        devices: eM(eb())
    })
]);
let tt = e_(), tn = eh(), tr = eU(tn), ti = eT(tt, ex({
    source: tt,
    unit: tt,
    reason: eU(tt),
    raw: eU(tt),
    age_seconds: tr
}));
const ta = ex({
    phase: eN([
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
    generation: tn,
    error: eU(tt)
}), to = eN([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let ts = ex({
    model: tt,
    wavelength_tx_nm: tn,
    wavelength_rx_nm: tn,
    phy_rate_downlink_gbps: tn,
    phy_rate_uplink_gbps: tn,
    tx_power_dbm: tr,
    laser_bias_current_ma: tr,
    temperature_celsius: tr,
    vcc_voltage: tr,
    cdr_locked: eU(ev()),
    tx_enabled: eU(ev()),
    measurements: ti
}), tl = ex({
    equipment_id: eU(tt),
    hardware_version: eU(tt),
    software_images: ez(tt),
    omcc_version: tr,
    errors: ez(tt)
});
const td = ex({
    onu_id: tn,
    vendor: tt,
    model: tt,
    serial_number: tt,
    state: to,
    business_status: ta,
    management: eU(e2),
    provisioning: eU(e8),
    services: ez(e0),
    ssids: ez(e0),
    wifi_sync: eY,
    acs_bootstrap: eM(e6),
    identity: eU(tl),
    identity_age_seconds: tr,
    identity_current: ev(),
    fiber_distance_m: tr,
    ranging_delay_rtd_ns: tr,
    equalization_delay_bits: new eD({
        type: "catch",
        innerType: tr,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tr,
    optical_tx_power_dbm: tr,
    firmware_version: tt,
    hardware_version: tt,
    uptime_seconds: tr,
    data_path: ex({
        interface: tt,
        gem_ports: eU(ez(tn)),
        vlan_id: tr,
        tx_bytes: tr,
        rx_bytes: tr,
        current_tx_kbps: tr,
        current_rx_kbps: tr,
        offload: eM(ex({
            enabled: eM(eU(ev())),
            routed_enabled: eM(eU(ev())),
            bridge_enabled: eM(eU(ev())),
            engine_attached: eM(eU(ev())),
            forwarding_verified: eM(eU(ev()))
        })),
        measurements: ti
    }),
    wifi_mesh: ex({
        channel_2g: tr,
        channel_5g: tr,
        bandwidth_5g: eU(tt),
        tx_power_pct: tr,
        measurements: ti
    }),
    connected_clients: eU(ez(ex({
        mac: tt,
        ip: tt,
        band: tt,
        rssi_dbm: tr,
        rx_rate_mbps: tr,
        tx_rate_mbps: tr
    }))),
    measurements: ti
});
let tc = ex({
    reserved_sn: eM(tt),
    port: tn,
    interface: tt,
    carrier: ev(),
    status: tt,
    onu_id: eM(tn),
    onu_sn: eM(tt),
    link_state: tt
});
const tu = ex({
    counters_valid: eM(ev()),
    packets_exact: eM(tt),
    bytes_exact: eM(tt),
    index: tt,
    state: tt,
    pkt_type: tt,
    orig_tuple: tt,
    new_tuple: tt,
    eth: tt,
    vlan: tt,
    packets: tn,
    bytes: tn
}), tp = ex({
    sampled_at_ms: eM(tn),
    errors: eM(ez(tt)),
    config_valid: eM(ev()),
    engine_valid: eM(ev()),
    mask_valid: eM(ev()),
    routed_mask_valid: eM(ev()),
    debug_valid: eM(ev()),
    flows_valid: eM(ev()),
    entries_valid: eM(ev()),
    counters_valid: eM(ev()),
    hooks_valid: eM(ev()),
    total_packets_exact: eM(tt),
    total_bytes_exact: eM(tt),
    supported: ev(),
    engine_attached: ev(),
    bridge_offload_enabled: ev(),
    bridge_offload_mask: tn,
    routed_offload_mask: tn,
    bridge_offload_debug: ev(),
    bridge: tt,
    active_ports: ez(tt),
    fw4_hooks_ready: ev(),
    total_entries: tn,
    bound_entries: tn,
    total_packets: tn,
    total_bytes: tn,
    bound_flows: ez(tu)
}), t_ = ej(tp, {
    sampled_at_ms: tn,
    errors: ez(tt),
    config_valid: ev(),
    engine_valid: ev(),
    mask_valid: ev(),
    routed_mask_valid: ev(),
    debug_valid: ev(),
    flows_valid: ev(),
    entries_valid: ev(),
    counters_valid: ev(),
    hooks_valid: ev(),
    total_packets_exact: tt,
    total_bytes_exact: tt,
    bound_ipv4_entries: tn,
    bound_ipv6_entries: tn,
    bound_flows: ez(ej(tu, {
        counters_valid: ev(),
        packets_exact: tt,
        bytes_exact: tt
    }))
}), tf = ex({
    onu_pinning: eM(ex({
        desired: eT(tt, tn),
        active: eT(tt, tn),
        pending_restart: ev(),
        allocation_blocked: ev(),
        startup_error: eU(tt),
        config_error: eU(tt)
    })),
    fpga_status: tt,
    provisioning: eU(e7),
    optical_transceiver: ts,
    switch_ports: ez(tc),
    sub_gateways: ez(td),
    telemetry_gateways: ez(ex({
        id: tt,
        last_seen_sec_ago: tn,
        last_payload_bytes: tn
    })),
    npu: eM(eU(tp))
});
eT(tt, ex({
    carrier: eM(ev()),
    mac: eM(tt),
    link: eM(ex({
        speed: eM(tn),
        duplex: eM(tt),
        autoneg: eM(ev())
    })),
    stats: eM(eT(tt, tn))
}));
const th = ex({
    schema_version: eC(1),
    status: eN([
        "success",
        "error"
    ]),
    action: eN([
        "optical_on",
        "optical_off",
        "optical_status",
        "optical_reload",
        "optical_reinitialize",
        "optical_shutdown"
    ]),
    desired_enabled: eU(ev()),
    tx_enabled: eU(ev()),
    actor_state: eN([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: ev(),
    discovery_active: ev(),
    cleanup_pending: ev(),
    error: eU(ex({
        code: e_(),
        message: e_()
    }))
}), tg = ex({
    schema_version: eC(1),
    version: e_(),
    features: eT(e_(), ev()),
    functions: ex({
        optical: ev(),
        omci_mib: ev(),
        mqtt_telemetry: ev(),
        hl202_management: ev(),
        cwmp: ev()
    }),
    pages: ex({
        status: ev(),
        config: ev(),
        sync: ev(),
        hl202: ev(),
        hardware: ev(),
        calibration: ev(),
        about: ev()
    }),
    adapters: ez(ex({
        id: e_(),
        name: e_()
    }))
});
L.rpc.declare({
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
});
const tv = ex({
    status: eN([
        "success",
        "error"
    ]),
    enabled: eM(ev()),
    error: eM(e_())
});
let tm = L.rpc.declare({
    object: "luci.fttr",
    method: "npu_set",
    params: [
        "enabled",
        "bridge"
    ],
    reject: !0
});
const ty = async ()=>{
    var e, n;
    let r, i, a, o, s, l, d;
    return (t ??= (e = L.rpc, n = {
        getCapabilities: {
            parse: (e)=>tg.parse(eB(e))
        },
        opticalStatus: th,
        opticalSet: th,
        getStatus: {
            parse: (e)=>tf.parse(eB(e))
        },
        getSync: {
            parse: (e)=>e7.parse(eB(e))
        },
        configCheck: te,
        npuStatus: t_
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
    }), {
        getCapabilities: async ()=>n.getCapabilities.parse(await r()),
        opticalStatus: async ()=>n.opticalStatus.parse(await i()),
        opticalSet: async (e)=>n.opticalSet.parse(await a(e.enabled)),
        getStatus: async ()=>n.getStatus.parse(await o()),
        getSync: async ()=>n.getSync.parse(await s()),
        configCheck: async ()=>n.configCheck.parse(await l()),
        npuStatus: async ()=>n.npuStatus.parse(await d())
    })).npuStatus();
}, tb = async function(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    return tv.parse(await tm(e, t));
};
function tw(e, t) {
    return !0 === t && void 0 !== e && /^(0|[1-9][0-9]*)$/.test(e) ? BigInt(e).toLocaleString() : "\u2014";
}
function tz(e, t) {
    return !0 === t ? `0x${e.toString(16).padStart(4, "0")} (${e})` : "\u2014";
}
function tk(e, t) {
    var n;
    return n = {
        class: "fttr-npu-row",
        children: [
            s("span", {
                children: e
            }),
            s("strong", {
                children: t
            })
        ]
    }, s("div", n);
}
function tx(e, t, n, r) {
    return s("span", {
        class: `fttr-npu-state ${!0 === t ? e ? "ready" : "pending" : ""}`,
        children: !0 === t ? e ? n : r : _("Unknown")
    });
}
eS([
    ex({
        operation_ids: ez(eh()),
        revision: e_()
    }),
    ex({
        started: eC(!0),
        mode: eN([
            "apply",
            "plan"
        ])
    }),
    ex({
        reset: eC(!0),
        device: e_()
    }),
    ex({
        operation_ids: ez(eh()),
        mode: eN([
            "apply",
            "plan"
        ]),
        reconcile: eM(ev()),
        retry: eM(ev())
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
}), ex({
    source: eN([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: e_(),
    size: eh(),
    sha256: e_(),
    data: eM(e_()),
    factory: ex({
        detected: ev(),
        device: e_(),
        has_data: ev(),
        sha256: e_(),
        data: e_()
    }),
    firmware: ex({
        exists: ev(),
        path: e_(),
        size: eh(),
        sha256: e_(),
        data: e_()
    }),
    error: eM(e_())
}), ex({
    success: ev(),
    path: e_(),
    size: eh(),
    sha256: e_(),
    error: eM(e_())
}), ex({
    success: ev(),
    output: eM(e_()),
    error: eM(e_())
});
let main = L.view.extend({
    render: function() {
        var e, t;
        let n, r, i = !1, a = !1, o = 0, l = 0, d = s("input", {
            id: "fttr-npu-enabled",
            type: "checkbox",
            disabled: !0,
            onchange: ()=>{
                a = !0;
            }
        }), c = s("input", {
            id: "fttr-npu-bridge",
            type: "text",
            maxLength: 15,
            disabled: !0,
            oninput: ()=>{
                a = !0;
            }
        }), u = s("p", {
            "aria-live": "polite"
        }), p = s("p", {
            "aria-live": "polite",
            children: _("Loading\u2026")
        }), f = s("div", {}), h = s("button", {
            type: "button",
            class: "cbi-button cbi-button-apply",
            disabled: !0,
            children: _("Save NPU configuration")
        }), g = s("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            children: _("Refresh")
        }), v = ()=>{
            d.disabled = c.disabled = h.disabled = i || !L.hasViewPermission() || !n?.supported || !0 !== n.config_valid || !l || Date.now() - l > 12000, g.disabled = i || !!r;
        }, m = async ()=>{
            if (r || i) return r;
            let e = o;
            return r = (async ()=>{
                try {
                    var t, u, h, g, m, y, b, w, z, k, x, j, P, S, $, O, T, Z, N, A, C, M, R;
                    let r, v = await Promise.race([
                        ty(),
                        new Promise((e, t)=>{
                            r = setTimeout(()=>t(Error(_("NPU status request timed out"))), 10000);
                        })
                    ]).finally(()=>clearTimeout(r));
                    if (e !== o || i) return;
                    n = v, l = Date.now(), !a && v.config_valid && (d.checked = v.bridge_offload_enabled, c.value = v.bridge), f.replaceChildren(v.supported ? (M = {
                        children: [
                            void 0 === v.sampled_at_ms ? (t = {
                                class: "alert-message warning",
                                children: _("Backend reliability metadata is unavailable. Update fttrctl before trusting these readings.")
                            }, s("p", t)) : null,
                            v.errors?.length ? (g = {
                                class: "alert-message warning",
                                children: [
                                    (u = {
                                        children: _("Some data sources are unavailable")
                                    }, s("strong", u)),
                                    (h = {
                                        children: v.errors.map((e)=>{
                                            var t;
                                            return t = {
                                                children: e
                                            }, s("li", t);
                                        })
                                    }, s("ul", h))
                                ]
                            }, s("div", g)) : null,
                            (j = {
                                class: "fttr-npu-grid",
                                children: [
                                    (b = {
                                        class: "cbi-section",
                                        children: [
                                            (m = {
                                                children: _("Engine and admission status")
                                            }, s("h3", m)),
                                            tk(_("Saved configuration"), tx(v.bridge_offload_enabled, v.config_valid, _("Enabled"), _("Disabled"))),
                                            tk(_("NPU engine"), tx(v.engine_attached, v.engine_valid, _("Attached"), _("Detached"))),
                                            tk(_("Port admission"), tx(0 !== v.bridge_offload_mask, v.mask_valid, _("Admitted"), _("Not admitted"))),
                                            tk(_("Managed bridge"), v.config_valid ? v.bridge : "\u2014"),
                                            tk(_("Bridge offload mask"), tz(v.bridge_offload_mask, v.mask_valid)),
                                            tk(_("Admitted ports"), v.mask_valid ? v.active_ports.join(", ") || _("None") : "\u2014"),
                                            tk(_("Firewall hooks"), tx(v.fw4_hooks_ready, v.hooks_valid, _("Ready"), _("Not ready"))),
                                            tk(_("Routed offload mask"), tz(v.routed_offload_mask, v.routed_mask_valid)),
                                            tk(_("Driver debug logging"), tx(v.bridge_offload_debug, v.debug_valid, _("Enabled"), _("Disabled"))),
                                            (y = {
                                                class: "fttr-npu-note",
                                                children: _("Admission allows eligible traffic to bind; it does not prove that packets are currently hardware-forwarded. The switch controls FTTR bridge admission, not the entire NPU or global routed offload policy.")
                                            }, s("p", y))
                                        ]
                                    }, s("div", b)),
                                    (x = {
                                        class: "cbi-section",
                                        children: [
                                            (w = {
                                                children: _("PPE flow snapshot")
                                            }, s("h3", w)),
                                            tk(_("Bound hardware flows"), v.flows_valid ? v.bound_entries : "\u2014"),
                                            tk(_("Current non-empty FOE entries"), v.entries_valid ? v.total_entries : "\u2014"),
                                            tk(_("Current bound-flow packets"), tw(v.total_packets_exact, v.counters_valid)),
                                            tk(_("Current bound-flow bytes"), tw(v.total_bytes_exact, v.counters_valid)),
                                            (z = {
                                                class: "fttr-npu-note",
                                                children: _("Source: PPE debugfs bind/entries and driver sysfs. These are global PPE snapshots, not FTTR-only totals or table capacity. Reads are sequential, not atomic.")
                                            }, s("p", z)),
                                            (k = {
                                                class: "fttr-npu-note",
                                                children: _("Counters cover only currently bound flows and may decrease when flows expire. Driver-exported zeroes are not proof of no traffic. AN7581 native L2B counters are unavailable; \u2014 means unavailable, not zero.")
                                            }, s("p", k))
                                        ]
                                    }, s("div", x))
                                ]
                            }, s("div", j)),
                            (C = {
                                class: "cbi-section",
                                children: [
                                    (P = {
                                        children: _("Active hardware offload flows (PPE FOE Bound)")
                                    }, s("h3", P)),
                                    v.flows_valid ? 0 === v.bound_flows.length ? (S = {
                                        children: _("No bound hardware flows in this snapshot.")
                                    }, s("p", S)) : (N = {
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
                                                            }, s("th", t);
                                                        })
                                                    }, s("tr", $))
                                                }, s("thead", O)),
                                                (T = {
                                                    children: v.bound_flows.map((e)=>{
                                                        var t, n, r, i, a, o, l, d, c, u, p, f, h;
                                                        return h = {
                                                            children: [
                                                                (n = {
                                                                    children: (t = {
                                                                        children: e.index
                                                                    }, s("code", t))
                                                                }, s("td", n)),
                                                                (r = {
                                                                    children: e.pkt_type
                                                                }, s("td", r)),
                                                                (a = {
                                                                    children: (i = {
                                                                        children: e.orig_tuple || "\u2014"
                                                                    }, s("code", i))
                                                                }, s("td", a)),
                                                                (l = {
                                                                    children: (o = {
                                                                        children: e.new_tuple || "\u2014"
                                                                    }, s("code", o))
                                                                }, s("td", l)),
                                                                (c = {
                                                                    children: (d = {
                                                                        children: e.eth || "\u2014"
                                                                    }, s("code", d))
                                                                }, s("td", c)),
                                                                (u = {
                                                                    children: e.vlan || "\u2014"
                                                                }, s("td", u)),
                                                                (p = {
                                                                    children: tw(e.packets_exact, e.counters_valid && v.engine_valid && v.engine_attached)
                                                                }, s("td", p)),
                                                                (f = {
                                                                    children: tw(e.bytes_exact, e.counters_valid && v.engine_valid && v.engine_attached)
                                                                }, s("td", f))
                                                            ]
                                                        }, s("tr", h);
                                                    })
                                                }, s("tbody", T))
                                            ]
                                        }, s("table", Z))
                                    }, s("div", N)) : (A = {
                                        children: _("Flow table is unavailable. A failed read must not be interpreted as an empty table.")
                                    }, s("p", A))
                                ]
                            }, s("div", C))
                        ]
                    }, s("div", M)) : (R = {
                        class: "cbi-section",
                        children: _("NPU hardware acceleration is not compiled or unsupported on this target.")
                    }, s("div", R))), p.textContent = `${_("Last successful sample")}: ${v.sampled_at_ms ? new Date(v.sampled_at_ms).toLocaleString() : _("Unknown")} \xb7 ${_("Refresh interval: 3 seconds")}`;
                } catch (t) {
                    if (e !== o || i) return;
                    l = 0, f.replaceChildren(s("p", {
                        class: "alert-message warning",
                        children: _("Live NPU data is unavailable. Previous readings are stale.")
                    })), p.textContent = `${_("Refresh failed")}: ${String(t)}`;
                } finally{
                    r = void 0, v();
                }
            })(), v(), r;
        };
        g.onclick = ()=>{
            m();
        }, h.onclick = async ()=>{
            if (h.disabled || i) return;
            let e = c.value.trim(), t = d.checked, s = !1;
            if (!/^[a-zA-Z0-9_.-]{1,15}$/.test(e)) {
                u.textContent = _("Use a bridge interface name of 1\u201315 letters, digits, dots, underscores or hyphens.");
                return;
            }
            i = !0, o++, v(), u.textContent = _("Saving\u2026");
            try {
                let n = await tb(t, e);
                if ("success" !== n.status) throw Error(n.error || _("Failed to save NPU configuration"));
                a = !1, s = !0, u.textContent = _("Configuration saved. Waiting for driver admission readback; enabling may take several seconds and requires eligible ports and firewall policy.");
            } catch (e) {
                u.textContent = `${_("NPU configuration failed")}: ${String(e)}`;
            } finally{
                await r, i = !1, await m(), !s || l && n?.config_valid && n.bridge === e && n.bridge_offload_enabled === t || (u.textContent = _("Save returned success, but configuration readback could not be confirmed. Refresh before retrying.")), v();
            }
        };
        let y = (t = {
            class: "cbi-map fttr-npu",
            children: [
                s("style", {
                    children: ".fttr-npu-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px}.fttr-npu-row{display:flex;justify-content:space-between;gap:16px;padding:7px 0;border-bottom:1px dashed #8884}.fttr-npu-row strong{text-align:right;overflow-wrap:anywhere}.fttr-npu-note{opacity:.75;font-size:90%;line-height:1.5}.fttr-npu-state{padding:2px 6px;border:1px solid #8886;border-radius:4px}.fttr-npu-state.ready{color:#2b8;border-color:#2b86}.fttr-npu-state.pending{color:#d90;border-color:#d906}.fttr-npu label{display:inline-flex;gap:8px;align-items:center;margin:8px 20px 8px 0}.fttr-npu-flows{font-size:85%}.fttr-npu-flows td{overflow-wrap:anywhere}"
                }),
                s("h2", {
                    children: _("NPU hardware acceleration")
                }),
                (e = {
                    class: "cbi-section",
                    children: [
                        s("h3", {
                            children: _("NPU configuration")
                        }),
                        s("label", {
                            htmlFor: "fttr-npu-enabled",
                            children: [
                                d,
                                _("Enable FTTR bridge hardware offload")
                            ]
                        }),
                        s("label", {
                            htmlFor: "fttr-npu-bridge",
                            children: [
                                _("Bridge interface"),
                                c
                            ]
                        }),
                        s("div", {
                            children: [
                                h,
                                " ",
                                g
                            ]
                        }),
                        u
                    ]
                }, s("div", e)),
                p,
                f
            ]
        }, s("div", t));
        return m(), L.Poll.add(async ()=>{
            y.isConnected && (l && Date.now() - l > 12000 && (l = 0, f.replaceChildren(s("p", {
                class: "alert-message warning",
                children: _("Live NPU data is unavailable. Previous readings are stale.")
            })), v()), await m());
        }, 3), y;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;