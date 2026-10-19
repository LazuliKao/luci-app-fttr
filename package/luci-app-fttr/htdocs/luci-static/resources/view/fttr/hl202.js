'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, n, r, i, o;
const a = Symbol.for("jsx.fragment");
function s(e, t) {
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
function l(e) {
    return _(e) || e;
}
const d = (e)=>null == e || "" === e ? "\u2014" : String(e), c = (e)=>e ? new Date(1000 * e).toLocaleString() : "\u2014";
function u(e, t, n) {
    return s("span", {
        class: `hl202-badge hl202-badge-${e}`,
        title: n,
        children: t
    });
}
function p(e, t, n) {
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
class h extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const f = {};
function m(e) {
    return e && Object.assign(f, e), f;
}
function g(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function b(e) {
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
function y(e) {
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const v = Symbol("evaluating");
function x(e, t, n) {
    let r;
    Object.defineProperty(e, t, {
        get () {
            if (r !== v) return void 0 === r && (r = v, r = n()), r;
        },
        set (n) {
            Object.defineProperty(e, t, {
                value: n
            });
        },
        configurable: !0
    });
}
const w = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function z(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
const T = new Set([
    "string",
    "number",
    "symbol"
]);
function C(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function k(e) {
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
    for(let n = t; n < e.issues.length; n++)if (e.issues[n]?.continue !== !0) return !0;
    return !1;
}
function S(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function O(e) {
    return "string" == typeof e ? e : e?.message;
}
function j(e, t, n) {
    let r = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (r.message = O(e.inst?._zod.def?.error?.(e)) ?? O(t?.error?.(e)) ?? O(n.customError?.(e)) ?? O(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
const N = (e, t)=>{
    e.name = "$ZodError", Object.defineProperty(e, "_zod", {
        value: e._zod,
        enumerable: !1
    }), Object.defineProperty(e, "issues", {
        value: t,
        enumerable: !1
    }), e.message = JSON.stringify(t, g, 2), Object.defineProperty(e, "toString", {
        value: ()=>e.message,
        enumerable: !1
    });
}, P = p("$ZodError", N), M = p("$ZodError", N, {
    Parent: Error
}), R = (t = M, (e, n, r, i)=>{
    let o = r ? Object.assign(r, {
        async: !1
    }) : {
        async: !1
    }, a = e._zod.run({
        value: n,
        issues: []
    }, o);
    if (a instanceof Promise) throw new h();
    if (a.issues.length) {
        let e = new (i?.Err ?? t)(a.issues.map((e)=>j(e, o, m())));
        throw w(e, i?.callee), e;
    }
    return a.value;
}), Z = (n = M, async (e, t, r, i)=>{
    let o = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, a = e._zod.run({
        value: t,
        issues: []
    }, o);
    if (a instanceof Promise && (a = await a), a.issues.length) {
        let e = new (i?.Err ?? n)(a.issues.map((e)=>j(e, o, m())));
        throw w(e, i?.callee), e;
    }
    return a.value;
}), A = (r = M, (e, t, n)=>{
    let i = n ? {
        ...n,
        async: !1
    } : {
        async: !1
    }, o = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (o instanceof Promise) throw new h();
    return o.issues.length ? {
        success: !1,
        error: new (r ?? P)(o.issues.map((e)=>j(e, i, m())))
    } : {
        success: !0,
        data: o.value
    };
}), J = (i = M, async (e, t, n)=>{
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
        error: new i(o.issues.map((e)=>j(e, r, m())))
    } : {
        success: !0,
        data: o.value
    };
}), D = /^-?\d+(?:\.\d+)?$/, q = /^(?:true|false)$/i, I = /^null$/i, Q = {
    major: 4,
    minor: 3,
    patch: 6
}, U = p("$ZodType", (e, t)=>{
    var n;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Q;
    let r = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && r.unshift(e), r))for (let n of t._zod.onattach)n(e);
    if (0 === r.length) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, n)=>{
            let r, i = $(e);
            for (let o of t){
                if (o._zod.def.when) {
                    if (!o._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, a = o._zod.check(e);
                if (a instanceof Promise && n?.async === !1) throw new h();
                if (r || a instanceof Promise) r = (r ?? Promise.resolve()).then(async ()=>{
                    await a, e.issues.length !== t && (i || (i = $(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = $(e, t));
                }
            }
            return r ? r.then(()=>e) : e;
        }, n = (n, i, o)=>{
            if ($(n)) return n.aborted = !0, n;
            let a = t(i, r, o);
            if (a instanceof Promise) {
                if (!1 === o.async) throw new h();
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
                if (!1 === o.async) throw new h();
                return a.then((e)=>t(e, r, o));
            }
            return t(a, r, o);
        };
    }
    x(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = A(e, t);
                    return n.success ? {
                        value: n.data
                    } : {
                        issues: n.error?.issues
                    };
                } catch (n) {
                    return J(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), V = p("$ZodString", (e, t)=>{
    var n;
    let r;
    U.init(e, t), e._zod.pattern = [
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
}), F = p("$ZodNumber", (e, t)=>{
    U.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? D, e._zod.parse = (n, r)=>{
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
}), W = p("$ZodBoolean", (e, t)=>{
    U.init(e, t), e._zod.pattern = q, e._zod.parse = (n, r)=>{
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
}), H = p("$ZodNull", (e, t)=>{
    U.init(e, t), e._zod.pattern = I, e._zod.values = new Set([
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
}), K = p("$ZodNever", (e, t)=>{
    U.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function B(e, t, n) {
    e.issues.length && t.issues.push(...S(n, e.issues)), t.value[n] = e.value;
}
const X = p("$ZodArray", (e, t)=>{
    U.init(e, t), e._zod.parse = (n, r)=>{
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
            s instanceof Promise ? o.push(s.then((t)=>B(t, n, e))) : B(s, n, e);
        }
        return o.length ? Promise.all(o).then(()=>n) : n;
    };
});
function G(e, t, n, r, i) {
    if (e.issues.length) {
        if (i && !(n in r)) return;
        t.issues.push(...S(n, e.issues));
    }
    void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const Y = p("$ZodObject", (e, t)=>{
    let n;
    U.init(e, t);
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
    let i = b(()=>(function(e) {
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
    x(e._zod, "propValues", ()=>{
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
        if (!z(a)) return t.issues.push({
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
            o instanceof Promise ? s.push(o.then((n)=>G(n, t, e, a, i))) : G(o, t, e, a, i);
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
                o instanceof Promise ? e.push(o.then((e)=>G(e, n, i, t, c))) : G(o, n, i, t, c);
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
function ee(e, t, n, r) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let i = e.filter((e)=>!$(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>j(e, r, m())))
    }), t);
}
const et = p("$ZodUnion", (e, t)=>{
    U.init(e, t), x(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), x(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), x(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), x(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>y(e.source)).join("|")})$`);
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
        return a ? Promise.all(s).then((t)=>ee(t, i, e, o)) : ee(s, i, e, o);
    };
}), en = p("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, et.init(e, t);
    let n = e._zod.parse;
    x(e._zod, "propValues", ()=>{
        let e = {};
        for (let n of t.options){
            let r = n._zod.propValues;
            if (!r || 0 === Object.keys(r).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
            for (let [t, n] of Object.entries(r))for (let r of (e[t] || (e[t] = new Set()), n))e[t].add(r);
        }
        return e;
    });
    let r = b(()=>{
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
        if (!z(a)) return i.issues.push({
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
}), er = p("$ZodRecord", (e, t)=>{
    U.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!function(e) {
            if (!1 === z(e)) return !1;
            let t = e.constructor;
            if (void 0 === t || "function" != typeof t) return !0;
            let n = t.prototype;
            return !1 !== z(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
        }(i)) return n.issues.push({
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
                    t.issues.length && n.issues.push(...S(e, t.issues)), n.value[e] = t.value;
                })) : (a.issues.length && n.issues.push(...S(e, a.issues)), n.value[e] = a.value);
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
            if ("string" == typeof a && D.test(a) && s.issues.length) {
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
                    issues: s.issues.map((e)=>j(e, r, m())),
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
                e.issues.length && n.issues.push(...S(a, e.issues)), n.value[s.value] = e.value;
            })) : (l.issues.length && n.issues.push(...S(a, l.issues)), n.value[s.value] = l.value);
        }
        return o.length ? Promise.all(o).then(()=>n) : n;
    };
}), ei = p("$ZodEnum", (e, t)=>{
    var n;
    let r;
    U.init(e, t);
    let i = (r = Object.values(n = t.entries).filter((e)=>"number" == typeof e), Object.entries(n).filter(([e, t])=>-1 === r.indexOf(+e)).map(([e, t])=>t)), o = new Set(i);
    e._zod.values = o, e._zod.pattern = RegExp(`^(${i.filter((e)=>T.has(typeof e)).map((e)=>"string" == typeof e ? C(e) : e.toString()).join("|")})$`), e._zod.parse = (t, n)=>{
        let r = t.value;
        return o.has(r) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: r,
            inst: e
        }), t;
    };
}), eo = p("$ZodLiteral", (e, t)=>{
    if (U.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? C(e) : e ? C(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i)=>{
        let o = r.value;
        return n.has(o) || r.issues.push({
            code: "invalid_value",
            values: t.values,
            input: o,
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
const es = p("$ZodOptional", (e, t)=>{
    U.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", x(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), x(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${y(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let r = t.innerType._zod.run(e, n);
            return r instanceof Promise ? r.then((t)=>ea(t, e.value)) : ea(r, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, n);
    };
}), el = p("$ZodNullable", (e, t)=>{
    U.init(e, t), x(e._zod, "optin", ()=>t.innerType._zod.optin), x(e._zod, "optout", ()=>t.innerType._zod.optout), x(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${y(e.source)}|null)$`) : void 0;
    }), x(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), ed = p("$ZodLazy", (e, t)=>{
    U.init(e, t), x(e._zod, "innerType", ()=>t.getter()), x(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), x(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), x(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), x(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n)=>e._zod.innerType._zod.run(t, n);
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
const ec = p("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    U.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>R(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>A(e, t, n), e.parseAsync = async (t, n)=>Z(e, t, n, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, n)=>J(e, t, n), e.check = (...n)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, n)=>{
        let r;
        return r = new e._zod.constr(t ?? e._zod.def), (!t || n?.parent) && (r._zod.parent = e), r;
    }, e.brand = ()=>e, e.register = (t, n)=>(t.add(e, n), e), e.apply = (t)=>t(e);
}), eu = p("ZodMiniString", (e, t)=>{
    V.init(e, t), ec.init(e, t);
});
function ep(e) {
    return new eu({
        type: "string",
        ...k(e)
    });
}
const eh = p("ZodMiniNumber", (e, t)=>{
    F.init(e, t), ec.init(e, t);
});
function ef(e) {
    return new eh({
        type: "number",
        checks: [],
        ...k(e)
    });
}
const em = p("ZodMiniBoolean", (e, t)=>{
    W.init(e, t), ec.init(e, t);
});
function eg(e) {
    return new em({
        type: "boolean",
        ...k(e)
    });
}
const eb = p("ZodMiniNull", (e, t)=>{
    H.init(e, t), ec.init(e, t);
}), ey = p("ZodMiniNever", (e, t)=>{
    K.init(e, t), ec.init(e, t);
});
function ev(e) {
    return new ey({
        type: "never",
        ...k(e)
    });
}
const e_ = p("ZodMiniArray", (e, t)=>{
    X.init(e, t), ec.init(e, t);
});
function ex(e, t) {
    return new e_({
        type: "array",
        element: e,
        ...k(t)
    });
}
const ew = p("ZodMiniObject", (e, t)=>{
    Y.init(e, t), ec.init(e, t), x(e, "shape", ()=>t.shape);
});
function ez(e, t) {
    return new ew({
        type: "object",
        shape: e ?? {},
        ...k(t)
    });
}
const eT = p("ZodMiniUnion", (e, t)=>{
    et.init(e, t), ec.init(e, t);
});
function eC(e, t) {
    return new eT({
        type: "union",
        options: e,
        ...k(t)
    });
}
const ek = p("ZodMiniDiscriminatedUnion", (e, t)=>{
    en.init(e, t), ec.init(e, t);
});
function e$(e, t, n) {
    return new ek({
        type: "union",
        options: t,
        discriminator: e,
        ...k(n)
    });
}
const eS = p("ZodMiniRecord", (e, t)=>{
    er.init(e, t), ec.init(e, t);
});
function eO(e, t, n) {
    return new eS({
        type: "record",
        keyType: e,
        valueType: t,
        ...k(n)
    });
}
const ej = p("ZodMiniEnum", (e, t)=>{
    ei.init(e, t), ec.init(e, t), e.options = Object.values(t.entries);
});
function eE(e, t) {
    return new ej({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...k(t)
    });
}
const eN = p("ZodMiniLiteral", (e, t)=>{
    eo.init(e, t), ec.init(e, t);
});
function eP(e, t) {
    return new eN({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...k(t)
    });
}
const eM = p("ZodMiniOptional", (e, t)=>{
    es.init(e, t), ec.init(e, t);
});
function eL(e) {
    return new eM({
        type: "optional",
        innerType: e
    });
}
const eR = p("ZodMiniNullable", (e, t)=>{
    el.init(e, t), ec.init(e, t);
});
function eZ(e) {
    return new eR({
        type: "nullable",
        innerType: e
    });
}
const eA = p("ZodMiniLazy", (e, t)=>{
    ed.init(e, t), ec.init(e, t);
});
let eJ = ez({
    error: eC([
        ep(),
        ez({
            code: ep(),
            message: ep()
        })
    ])
});
class eD extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eq(e) {
    let t = eJ.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eD("rpc", e) : new eD(e.code, e.message);
    }
    return e;
}
const eI = ez({
    status: eP("pending"),
    job: ep()
}), eQ = e$("status", [
    ez({
        status: eP("pending")
    }),
    ez({
        status: eP("ready"),
        chunk: ef(),
        chunks: ef(),
        bytes: ef(),
        data: ep()
    })
]);
let eU = ep(), eV = ef(), eF = eg();
ez({
    optical_sn: eU,
    onu_id: eV,
    binding_generation: eU
}), ez({
    mqtt_mac: eU,
    binding_generation: eU
});
let eW = ez({
    mqtt_mac: eU,
    optical_sn: eZ(eU),
    onu_id: eZ(eV),
    binding_generation: eU,
    last_seen: eV,
    reason: eU
}), eH = {
    target: eU,
    request_id: eL(eU),
    output: eL(eU),
    output_truncated: eF,
    error: eL(eU)
};
const eK = e$("status", [
    ez({
        ...eH,
        status: eP("executed"),
        exit_code: eZ(eV)
    }),
    ez({
        ...eH,
        status: eP("dispatched"),
        exit_code: eL(ev())
    }),
    ez({
        ...eH,
        status: eP("timeout"),
        exit_code: eL(ev())
    }),
    ez({
        ...eH,
        status: eP("error"),
        exit_code: eL(ev())
    })
]);
let eB = ez({
    target: eW,
    result: eK,
    binding_current: eF
}), eX = ez({
    schema_version: eV,
    compressed_bytes: eV,
    decompressed_bytes: eV,
    fields: eO(eU, ez({
        value: o = new eA({
            type: "lazy",
            getter: ()=>eC([
                    ep(),
                    ef(),
                    eg(),
                    new eb({
                        type: "null",
                        ...k(void 0)
                    }),
                    ex(o),
                    eO(ep(), o)
                ])
        }),
        member: eU,
        unit: eZ(eU)
    })),
    members: ex(ez({
        name: eU,
        bytes: eV,
        encoding: eU,
        text: eZ(eU),
        text_omitted: eF
    })),
    errors: ex(eU)
}), eG = ez({
    revision: eV,
    last_received: eV,
    last_processed_receipt: eZ(eV),
    last_good: eZ(eV),
    error: eZ(eU),
    report: eZ(eX)
}), eY = {
    schema_version: eP(1),
    target: eW,
    report: eZ(eG)
};
const e0 = eC([
    ez({
        ...eY,
        state: eE([
            "received",
            "report_unavailable"
        ])
    }),
    ez({
        ...eY,
        read_only: eP(!0)
    })
]), e2 = ez({
    schema_version: eP(1),
    devices: ex(ez({
        optical_sn: eU,
        onu_id: eV,
        model: eU,
        optical_online: eF,
        can_execute: eF,
        mqtt: eZ(eW),
        report_revision: eZ(eV)
    })),
    sources: ex(eW)
}), e1 = ez({
    schema_version: eP(1),
    operation: eB,
    accounts: eZ(ex(ez({
        entry: eC([
            eP(0),
            eP(1),
            eP(2)
        ]),
        username: eU,
        active: eF
    }))),
    write_status: eE([
        "not_applicable",
        "accepted_and_saved",
        "unconfirmed"
    ])
}), e8 = ez({
    schema_version: eP(1),
    operation: eB
});
let e4 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_list",
    reject: !0
}), e3 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_job_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
}), e5 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_report",
    params: [
        "target"
    ],
    reject: !0
}), e6 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_accounts_start",
    params: [
        "target"
    ],
    reject: !0
}), e7 = L.rpc.declare({
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
}), e9 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_exec_start",
    params: [
        "target",
        "script",
        "timeout_seconds"
    ],
    reject: !0
});
async function te(e) {
    let t = eI.parse(eq(e)), n = Date.now() + 330000, r = window.location.pathname, i = [], o = 0, a = null;
    for(let e = 0; e < 128;){
        if (window.location.pathname !== r) throw new eD("navigation", _("Result polling stopped after leaving the page. The backend job is not cancelled."));
        if (Date.now() > n) throw new eD("timeout", _("Job polling timed out; execution outcome is unknown. Do not automatically retry."));
        let s = eQ.parse(eq(await e3(t.job, e)));
        switch(s.status){
            case "pending":
                await new Promise((e)=>window.setTimeout(e, 1000));
                continue;
            case "ready":
                {
                    if (!Number.isInteger(s.chunks) || s.chunks < 1 || s.chunks > 128 || s.chunk !== e || !Number.isInteger(s.bytes) || s.bytes < 1 || s.bytes > 4194304 || s.data.length > 43692) throw new eD("transport", _("Invalid job result"));
                    if (a && (s.chunks !== a.chunks || s.bytes !== a.bytes)) throw new eD("transport", _("Inconsistent job result chunks"));
                    a = {
                        chunks: s.chunks,
                        bytes: s.bytes
                    };
                    let t = Uint8Array.from(atob(s.data), (e)=>e.charCodeAt(0));
                    if (t.length > 32768 || o + t.length > s.bytes) throw new eD("transport", _("Job result exceeds the transport limit"));
                    if (i.push(t), o += t.length, ++e === s.chunks) {
                        if (o !== s.bytes) throw new eD("transport", _("Incomplete job result"));
                        let e = new Uint8Array(o), t = 0;
                        for (let n of i)e.set(n, t), t += n.length;
                        return eq(JSON.parse(new TextDecoder("utf-8", {
                            fatal: !0
                        }).decode(e)));
                    }
                }
        }
    }
    throw new eD("transport", _("Too many result chunks"));
}
const tt = async ()=>e2.parse(eq(await e4())), tn = async (e)=>e0.parse(await te(await e5(e))), tr = async (e)=>e1.parse(await te(await e6(e))), ti = async (e, t)=>e1.parse(await te(await e7(e, `account_set_${t.kind}`, t.entry, t.password, t.active))), to = async (e, t, n)=>e8.parse(await te(await e9(e, t, n)));
let ta = !1;
function ts() {
    var e, t;
    let n = null, r = s("div", {
        style: "margin:8px 0;display:flex;align-items:center;flex-wrap:wrap;gap:10px"
    }), i = s("div", {
        style: "overflow-x:auto;margin:8px 0"
    }), o = s("div", {
        style: "margin-top:10px"
    }), a = s("div", {
        style: "font-size:88%;color:#888;margin:6px 0",
        "aria-live": "polite"
    }), p = s("button", {
        type: "button",
        class: "cbi-button cbi-button-action",
        children: l("Read MQTT report")
    }), h = async (e)=>{
        let t = e || n;
        if (!t) {
            a.textContent = l("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
            return;
        }
        if (ta) {
            a.textContent = l("Another operation is in progress.");
            return;
        }
        ta = !0, p.disabled = !0, a.textContent = l("Waiting for device result\u2026");
        try {
            var h, f, m, g, b, y, v, x, w, z, T, C, k, $, S, O, j, N, P, M, R, Z;
            let e = await tn(t);
            if (JSON.stringify(t) !== JSON.stringify(n)) return;
            if (!e.report) {
                r.replaceChildren(), i.replaceChildren(), o.replaceChildren(), a.textContent = l("No MQTT report has been parsed yet.");
                return;
            }
            let p = e.report;
            if (r.replaceChildren((f = {
                children: [
                    (h = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            l("Revision"),
                            ":"
                        ]
                    }, s("span", h)),
                    u("info", `#${String(p.revision)}`)
                ]
            }, s("span", f)), (b = {
                children: [
                    (m = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            l("Last received"),
                            ":"
                        ]
                    }, s("span", m)),
                    (g = {
                        children: c("number" == typeof p.last_received ? p.last_received : void 0)
                    }, s("strong", g))
                ]
            }, s("span", b)), (x = {
                children: [
                    (y = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            l("Last good report"),
                            ":"
                        ]
                    }, s("span", y)),
                    (v = {
                        children: c("number" == typeof p.last_good ? p.last_good : void 0)
                    }, s("strong", v))
                ]
            }, s("span", x))), "string" == typeof p.error && r.append((w = {
                class: "alert-message warning",
                style: "width:100%;margin-top:6px",
                children: [
                    l("Latest report error"),
                    ": ",
                    p.error
                ]
            }, s("div", w))), p.report) {
                let e = p.report, t = e.fields;
                i.replaceChildren((O = {
                    class: "table",
                    style: "font-size:90%",
                    children: [
                        ($ = {
                            children: (k = {
                                children: [
                                    (z = {
                                        children: l("Field")
                                    }, s("th", z)),
                                    (T = {
                                        children: l("Value")
                                    }, s("th", T)),
                                    (C = {
                                        children: l("Source member")
                                    }, s("th", C))
                                ]
                            }, s("tr", k))
                        }, s("thead", $)),
                        (S = {
                            children: Object.entries(t).map((e)=>{
                                var t, n, r, i, o, a, l;
                                let [c, u] = e, p = u.value, h = null === p ? "\u2014" : `${"object" == typeof p ? JSON.stringify(p) : String(p)}${u.unit ? ` ${u.unit}` : ""}`;
                                return "uptime_seconds" === c && "number" == typeof p && (h = function(e) {
                                    if (void 0 === e || !Number.isFinite(e) || e < 0) return "\u2014";
                                    let t = Math.floor(e / 86400), n = Math.floor(e % 86400 / 3600), r = Math.floor(e % 3600 / 60), i = [];
                                    return t > 0 && i.push(`${t}\u{5929}`), (n > 0 || t > 0) && i.push(`${n}\u{5C0F}\u{65F6}`), (r > 0 || n > 0 || t > 0) && i.push(`${r}\u{5206}\u{949F}`), i.push(`${e % 60}\u{79D2}`), `${i.join(" ")} (${e} s)`;
                                }(p)), l = {
                                    children: [
                                        (n = {
                                            children: (t = {
                                                children: c
                                            }, s("code", t))
                                        }, s("td", n)),
                                        (i = {
                                            children: (r = {
                                                children: h
                                            }, s("strong", r))
                                        }, s("td", i)),
                                        (a = {
                                            children: (o = {
                                                class: "hl202-badge hl202-badge-neutral",
                                                children: d(u.member)
                                            }, s("span", o))
                                        }, s("td", a))
                                    ]
                                }, s("tr", l);
                            })
                        }, s("tbody", S))
                    ]
                }, s("table", O)));
                let n = [];
                for (let t of e.members){
                    let e = (j = {
                        type: "button",
                        class: "fttr-btn-subtle",
                        style: "margin-left:8px",
                        onclick: (n)=>{
                            n.stopPropagation(), "string" == typeof t.text && (navigator.clipboard?.writeText(t.text), e.textContent = l("Copied to clipboard"), setTimeout(()=>{
                                e.textContent = l("Copy member text");
                            }, 1500));
                        },
                        children: l("Copy member text")
                    }, s("button", j));
                    n.push((Z = {
                        style: "margin:6px 0;border:1px solid rgba(127,140,141,0.15);border-radius:4px;padding:4px 8px",
                        children: [
                            (N = {
                                style: "cursor:pointer;user-select:none;font-weight:600;font-size:90%",
                                children: [
                                    d(`${String(t.name)} (${String(t.bytes)} bytes, ${String(t.encoding)})`),
                                    "string" == typeof t.text ? e : null
                                ]
                            }, s("summary", N)),
                            (R = {
                                style: "margin-top:6px",
                                children: "string" == typeof t.text ? (P = {
                                    class: "hl202-terminal-output",
                                    style: "max-height:16rem",
                                    children: t.text
                                }, s("pre", P)) : (M = {
                                    style: "font-size:85%;color:#888;margin:4px 0",
                                    children: t.text_omitted ? l("Text omitted at the shared byte limit.") : l("Binary member; text is unavailable.")
                                }, s("p", M))
                            }, s("div", R))
                        ]
                    }, s("details", Z)));
                }
                o.replaceChildren(...e.errors.map((e)=>{
                    var t;
                    return t = {
                        class: "alert-message warning",
                        children: e
                    }, s("div", t);
                }), ...n);
            } else i.replaceChildren(), o.replaceChildren();
            a.textContent = "";
        } catch (e) {
            a.textContent = e instanceof Error ? e.message : l("Request failed");
        } finally{
            ta = !1, p.disabled = !n;
        }
    };
    return p.addEventListener("click", ()=>{
        h();
    }), {
        element: (t = {
            class: "cbi-section hl202-panel-report",
            children: [
                (e = {
                    style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                    children: [
                        s("h3", {
                            style: "margin:0",
                            children: l("MQTT report")
                        }),
                        p
                    ]
                }, s("div", e)),
                a,
                r,
                i,
                o
            ]
        }, s("div", t)),
        setTarget (e) {
            JSON.stringify(e) !== JSON.stringify(n) && (r.replaceChildren(), i.replaceChildren(), o.replaceChildren(), a.textContent = ""), n = e, p.disabled = !e;
        },
        refresh: (e)=>h(e)
    };
}
let tl = L.view;
if (!("extend" in tl) || "function" != typeof tl.extend) throw Error("LuCI view extension is unavailable");
let main = Reflect.apply(tl.extend, tl, [
    {
        render: function() {
            var e, t, n, r, i, o, a, c, p, h, f, m, g;
            let b, y, v, x, w, z = s("select", {
                id: "hl202-device",
                class: "cbi-input-select",
                "aria-label": l("HL202 device"),
                style: "min-width:320px"
            }), T = s("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                children: l("Refresh devices")
            }), C = s("div", {
                style: "font-size:88%;color:#888;margin:6px 0",
                "aria-live": "polite"
            }), k = s("strong", {
                children: "\u2014"
            }), $ = s("span", {
                class: "hl202-badge hl202-badge-neutral",
                style: "font-size:80%",
                children: "\u2014"
            }), S = s("span", {
                class: "hl202-badge hl202-badge-neutral",
                children: "\u2014"
            }), O = s("span", {
                class: "hl202-badge hl202-badge-neutral",
                children: "\u2014"
            }), j = s("span", {
                class: "hl202-badge hl202-badge-info",
                style: "font-size:80%",
                children: "\u2014"
            }), N = s("div", {
                class: "alert-message warning",
                style: "margin-top:8px",
                hidden: !0,
                children: l("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
            }), P = (n = {
                class: "cbi-section hl202-device-card",
                style: "margin-bottom:0",
                children: [
                    (t = {
                        class: "hl202-card-header",
                        children: [
                            s("div", {
                                class: "hl202-device-title",
                                children: [
                                    k,
                                    $
                                ]
                            }),
                            s("div", {
                                class: "hl202-device-badges",
                                children: [
                                    S,
                                    O,
                                    j
                                ]
                            }),
                            (e = {
                                class: "hl202-device-links",
                                children: s("a", {
                                    href: L.url("admin", "network", "fttr", "hardware"),
                                    class: "fttr-btn-subtle",
                                    children: [
                                        l("Open optical status and ONU/MIB details"),
                                        " \u2192"
                                    ]
                                })
                            }, s("div", e))
                        ]
                    }, s("div", t)),
                    N
                ]
            }, s("div", n)), M = ts(), R = (b = null, y = s("div", {
                style: "font-size:88%;color:#888;margin:6px 0",
                "aria-live": "polite"
            }), v = s("div", {
                style: "margin-top:10px;display:flex;flex-direction:column;gap:10px"
            }), (x = s("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                children: l("Read users")
            })).disabled = !L.hasViewPermission(), w = async ()=>{
                if (!b) {
                    y.textContent = l("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
                    return;
                }
                if (ta) {
                    y.textContent = l("Another operation is in progress.");
                    return;
                }
                ta = !0, x.disabled = !0, y.textContent = l("Waiting for device result\u2026");
                let e = b;
                try {
                    let f = await tr(e);
                    if (JSON.stringify(e) !== JSON.stringify(b)) return;
                    v.replaceChildren();
                    let m = f.operation, g = m.result;
                    if ("timeout" === g.status ? y.textContent = l("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.") : y.textContent = m.binding_current ? g.error ?? (null === f.accounts ? l("Account data is unavailable.") : "") : l("Device binding changed; this result is stale."), f.accounts && m.binding_current) {
                        let m = [];
                        for (let g of f.accounts){
                            var t, n, r, i, o, a, d, c, u, p, h;
                            let f = g.entry, y = g.active, v = (t = {
                                class: `hl202-badge ${y ? "hl202-badge-success" : "hl202-badge-neutral"}`,
                                style: "font-size:80%",
                                children: y ? l("Enabled") : l("Disabled")
                            }, s("span", t)), x = (n = {
                                type: "password",
                                class: "cbi-input-text",
                                placeholder: l("New password"),
                                autocomplete: "new-password",
                                style: "width:180px"
                            }, s("input", n)), w = (r = {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                children: l("Set password")
                            }, s("button", r)), z = (i = {
                                type: "button",
                                class: `cbi-button ${y ? "cbi-button-neutral" : "cbi-button-apply"}`,
                                children: y ? l("Disable") : l("Enable")
                            }, s("button", i));
                            w.disabled = z.disabled = !L.hasViewPermission();
                            let T = (o = {
                                style: "font-size:82%;margin-top:4px",
                                "aria-live": "polite"
                            }, s("div", o));
                            w.addEventListener("click", async ()=>{
                                if (!b || ta || JSON.stringify(e) !== JSON.stringify(b)) return;
                                let t = x.value;
                                if (!t) {
                                    T.textContent = l("Enter a non-empty password.");
                                    return;
                                }
                                x.value = "", ta = !0, w.disabled = z.disabled = !0, T.textContent = l("Waiting for device result\u2026");
                                try {
                                    let n = await ti(e, {
                                        entry: f,
                                        kind: "password",
                                        password: t,
                                        active: y
                                    });
                                    if (JSON.stringify(e) !== JSON.stringify(b)) return;
                                    let r = n.operation, i = r.result;
                                    r.binding_current && "accepted_and_saved" === n.write_status ? T.textContent = l("Password accepted and saved; web login permission is not verified.") : T.textContent = i.error ?? l("Execution outcome is unknown. Do not automatically retry.");
                                } catch (e) {
                                    T.textContent = e instanceof Error ? e.message : l("Request failed");
                                } finally{
                                    ta = !1, w.disabled = z.disabled = !L.hasViewPermission();
                                }
                            }), z.addEventListener("click", async ()=>{
                                if (b && !ta && JSON.stringify(e) === JSON.stringify(b)) {
                                    ta = !0, w.disabled = z.disabled = !0, T.textContent = l("Waiting for device result\u2026");
                                    try {
                                        let t = !y, n = await ti(e, {
                                            entry: f,
                                            kind: "active",
                                            password: "",
                                            active: t
                                        });
                                        if (JSON.stringify(e) !== JSON.stringify(b)) return;
                                        let r = n.accounts?.find((e)=>e.entry === f);
                                        if (!n.operation.binding_current || "accepted_and_saved" !== n.write_status || !r) {
                                            T.textContent = n.operation.result.error ?? l("Execution outcome is unknown. Refresh users before retrying.");
                                            return;
                                        }
                                        y = r.active, v.className = `hl202-badge ${y ? "hl202-badge-success" : "hl202-badge-neutral"}`, v.textContent = y ? l("Enabled") : l("Disabled"), z.className = `cbi-button ${y ? "cbi-button-neutral" : "cbi-button-apply"}`, z.textContent = y ? l("Disable") : l("Enable"), T.textContent = `${String(n.write_status)}; ${l("Refresh users to read the current state.")}`;
                                    } catch (e) {
                                        T.textContent = e instanceof Error ? e.message : l("Request failed");
                                    } finally{
                                        ta = !1, w.disabled = z.disabled = !L.hasViewPermission();
                                    }
                                }
                            }), m.push((h = {
                                class: "cbi-section",
                                style: "margin:0;padding:10px 14px;border:1px solid rgba(127,140,141,0.2);border-radius:5px",
                                children: [
                                    (p = {
                                        style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                                        children: [
                                            (c = {
                                                style: "display:flex;align-items:center;gap:8px",
                                                children: [
                                                    (a = {
                                                        style: "font-size:105%",
                                                        children: g.username
                                                    }, s("strong", a)),
                                                    (d = {
                                                        style: "font-size:80%;color:#888",
                                                        children: [
                                                            "(Entry ",
                                                            f,
                                                            ")"
                                                        ]
                                                    }, s("span", d)),
                                                    v
                                                ]
                                            }, s("div", c)),
                                            (u = {
                                                style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px",
                                                children: [
                                                    x,
                                                    w,
                                                    z
                                                ]
                                            }, s("div", u))
                                        ]
                                    }, s("div", p)),
                                    T
                                ]
                            }, s("div", h)));
                        }
                        v.replaceChildren(...m);
                    }
                } catch (e) {
                    y.textContent = e instanceof Error ? e.message : l("Request failed");
                } finally{
                    ta = !1, x.disabled = !b || !L.hasViewPermission();
                }
            }, x.addEventListener("click", ()=>{
                w();
            }), {
                element: (g = {
                    class: "cbi-section hl202-panel-accounts",
                    children: [
                        (m = {
                            style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:6px",
                            children: [
                                s("h3", {
                                    style: "margin:0",
                                    children: l("User management")
                                }),
                                x
                            ]
                        }, s("div", m)),
                        s("p", {
                            style: "font-size:85%;color:#888;margin:4px 0",
                            children: l("Password writes are accepted and saved by the device; this does not prove web login permission. Existing permission masks are preserved.")
                        }),
                        y,
                        v
                    ]
                }, s("div", g)),
                setTarget (e) {
                    JSON.stringify(e) !== JSON.stringify(b) && (v.replaceChildren(), y.textContent = ""), b = e, x.disabled = !e || !L.hasViewPermission();
                },
                refresh: ()=>w()
            }), Z = function() {
                var e, t, n, r;
                let i = null, o = s("div", {
                    style: "font-size:88%;color:#666;margin:4px 0"
                }), a = s("textarea", {
                    id: "hl202-script",
                    rows: 8,
                    class: "hl202-terminal-textarea",
                    spellcheck: !1,
                    "aria-label": l("Remote shell command"),
                    placeholder: "# \u8F93\u5165\u5728\u6240\u9009\u5B50\u7F51\u5173\u4E0A\u6267\u884C\u7684 Shell \u547D\u4EE4 (\u652F\u6301 Ctrl + Enter \u5FEB\u6377\u6267\u884C)..."
                }), d = s("input", {
                    type: "number",
                    id: "hl202-timeout",
                    min: "1",
                    max: "300",
                    value: "20",
                    class: "cbi-input-text",
                    style: "width:70px;text-align:center",
                    "aria-label": l("Timeout in seconds")
                }), c = s("button", {
                    type: "button",
                    class: "cbi-button cbi-button-apply",
                    style: "font-weight:600",
                    children: l("Execute on selected HL202")
                });
                c.disabled = !L.hasViewPermission();
                let p = s("div", {
                    style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px"
                }), h = s("pre", {
                    class: "hl202-terminal-output",
                    style: "min-height:4rem;display:none",
                    children: "# \u7B49\u5F85\u6267\u884C\u6307\u4EE4..."
                }), f = s("button", {
                    type: "button",
                    class: "fttr-btn-subtle",
                    onclick: ()=>{
                        h.textContent && (navigator.clipboard?.writeText(h.textContent), f.textContent = l("Copied to clipboard"), setTimeout(()=>{
                            f.textContent = l("Copy output");
                        }, 1500));
                    },
                    children: l("Copy output")
                }), m = s("button", {
                    type: "button",
                    class: "fttr-btn-subtle",
                    onclick: ()=>{
                        h.textContent = "", h.style.display = "none", p.replaceChildren();
                    },
                    children: l("Clear output")
                }), g = async ()=>{
                    var e, t, n, r, o, g, b, y, v, x, w;
                    if (!i) return void p.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: l("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
                    }));
                    if (ta) return void p.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: l("Another operation is in progress.")
                    }));
                    let z = Number(d.value);
                    if (!Number.isInteger(z) || z < 1 || z > 300) return void p.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: l("Timeout must be 1\u2013300 seconds.")
                    }));
                    let T = a.value.trim();
                    if (!T || T.includes("\0") || new TextEncoder().encode(T).length > 65536) return void p.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: l("Enter a non-empty UTF-8 script up to 64 KiB without NUL characters.")
                    }));
                    ta = !0, c.disabled = !0, h.style.display = "block", h.textContent = `# [${new Date().toLocaleTimeString()}] \u{6B63}\u{5728}\u{4E0B}\u{53D1}\u{81F3} ${i.optical_sn} (\u{8D85}\u{65F6}: ${z}s)...\n`, p.replaceChildren(u("info", l("Waiting for device result\u2026")));
                    let C = Date.now(), k = i;
                    try {
                        let d = await to(k, a.value, z);
                        if (JSON.stringify(k) !== JSON.stringify(i)) return;
                        let c = ((Date.now() - C) / 1000).toFixed(2), w = d.operation, T = w.result, $ = T.status, S = T.exit_code, O = w.binding_current && !T.error && "executed" === $ && 0 === S, j = u(O ? "success" : "timeout" === $ ? "warning" : "danger", O ? l("Success") : "timeout" === $ ? l("Timeout") : `${l("Exit code")} ${String(S ?? $)}`);
                        p.replaceChildren(j, (n = {
                            children: [
                                (e = {
                                    style: "color:#888",
                                    children: [
                                        l("Exit code"),
                                        ":"
                                    ]
                                }, s("span", e)),
                                " ",
                                (t = {
                                    children: String(S ?? "\u2014")
                                }, s("code", t))
                            ]
                        }, s("span", n)), (g = {
                            children: [
                                (r = {
                                    style: "color:#888",
                                    children: [
                                        l("Duration"),
                                        ":"
                                    ]
                                }, s("span", r)),
                                " ",
                                (o = {
                                    children: [
                                        c,
                                        " s"
                                    ]
                                }, s("strong", o))
                            ]
                        }, s("span", g)), (v = {
                            children: [
                                (b = {
                                    style: "color:#888",
                                    children: [
                                        l("Request ID"),
                                        ":"
                                    ]
                                }, s("span", b)),
                                " ",
                                (y = {
                                    children: String(T.request_id ?? "\u2014")
                                }, s("code", y))
                            ]
                        }, s("span", v)), (x = {
                            style: "margin-left:auto;display:flex;gap:6px",
                            children: [
                                f,
                                m
                            ]
                        }, s("div", x)));
                        let N = [];
                        w.binding_current || N.push(l("Device binding changed; this result is stale.")), ("timeout" === $ || "dispatched" === $) && N.push(l("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.")), "string" == typeof T.output && T.output.length && N.push(T.output), "string" == typeof T.error && T.error.length && N.push(`[STDERR]\n${T.error}`), !0 === T.output_truncated && N.push(`\n[!] ${l("Output was truncated at the byte limit.")}`), 0 === N.length && N.push(l("No output returned.")), h.textContent = N.join("\n");
                    } catch (t) {
                        let e = ((Date.now() - C) / 1000).toFixed(2);
                        p.replaceChildren(u("danger", l("Failed")), (w = {
                            children: [
                                s("span", {
                                    style: "color:#888",
                                    children: [
                                        l("Duration"),
                                        ":"
                                    ]
                                }),
                                " ",
                                e,
                                " s"
                            ]
                        }, s("span", w)), s("div", {
                            style: "margin-left:auto;display:flex;gap:6px",
                            children: [
                                f,
                                m
                            ]
                        })), h.textContent = `[ERROR] ${t instanceof Error ? t.message : l("Request failed")}`;
                    } finally{
                        ta = !1, c.disabled = !i || !L.hasViewPermission();
                    }
                };
                c.addEventListener("click", ()=>{
                    g();
                }), a.addEventListener("keydown", (e)=>{
                    (e.ctrlKey || e.metaKey) && "Enter" === e.key && (e.preventDefault(), g());
                });
                let b = (e = {
                    class: "hl202-snippets",
                    children: [
                        s("span", {
                            style: "font-size:80%;color:#888;margin-right:2px",
                            children: [
                                l("Quick diagnostic commands"),
                                ":"
                            ]
                        }),
                        [
                            {
                                label: "uptime (\u8D1F\u8F7D)",
                                cmd: "uptime"
                            },
                            {
                                label: "meminfo (\u5185\u5B58)",
                                cmd: "cat /proc/meminfo | head -n 10"
                            },
                            {
                                label: "cpuinfo (CPU)",
                                cmd: "cat /proc/cpuinfo | grep 'model name\\|processor'"
                            },
                            {
                                label: "ifconfig (\u7F51\u7EDC)",
                                cmd: "ifconfig"
                            },
                            {
                                label: "ps (\u8FDB\u7A0B)",
                                cmd: "ps"
                            },
                            {
                                label: "dmesg (\u5185\u6838\u65E5\u5FD7)",
                                cmd: "dmesg | tail -n 25"
                            }
                        ].map((e)=>s("button", {
                                type: "button",
                                class: "hl202-snippet-tag",
                                onclick: ()=>{
                                    a.value = e.cmd, a.focus();
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
                                children: l("Raw command console")
                            }),
                            s("p", {
                                style: "font-size:85%;color:#888;margin-top:0;margin-bottom:6px",
                                children: l("Shell executes on the selected ONU. Timeout does not cancel execution. Raw output can contain secrets.")
                            }),
                            o,
                            b,
                            s("div", {
                                class: "hl202-terminal",
                                style: "margin-bottom:8px",
                                children: a
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
                                                    l("Timeout in seconds"),
                                                    ":"
                                                ]
                                            }),
                                            d
                                        ]
                                    }, s("label", t)),
                                    s("span", {
                                        style: "font-size:82%;color:#888",
                                        children: "(\u5FEB\u6377\u952E: Ctrl + Enter)"
                                    }),
                                    s("div", {
                                        style: "margin-left:auto",
                                        children: c
                                    })
                                ]
                            }, s("div", n)),
                            s("div", {
                                style: "margin-top:10px",
                                children: [
                                    p,
                                    h
                                ]
                            })
                        ]
                    }, s("div", r)),
                    setTarget (e) {
                        var t;
                        JSON.stringify(e) !== JSON.stringify(i) && (p.replaceChildren(), h.textContent = "", h.style.display = "none"), i = e, c.disabled = !e || !L.hasViewPermission(), e ? o.replaceChildren((t = {
                            children: [
                                s("span", {
                                    style: "color:#888",
                                    children: [
                                        l("Target"),
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
                        }, s("span", t))) : o.replaceChildren(s("span", {
                            style: "color:#e74c3c",
                            children: l("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
                        }));
                    }
                };
            }(), A = s("select", {
                id: "hl202-source",
                class: "cbi-input-select",
                "aria-label": l("Read-only MQTT source"),
                style: "min-width:240px"
            }), J = s("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                style: "margin-left:8px",
                children: l("Inspect source report (read-only)")
            }), D = s("div", {
                style: "margin-top:10px"
            }), q = [], I = s("pre", {
                style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto"
            }), Q = (o = {
                class: "cbi-section hl202-panel-sources",
                children: [
                    s("h3", {
                        style: "margin-bottom:4px",
                        children: l("MQTT source identity")
                    }),
                    s("p", {
                        style: "font-size:85%;color:#888;margin-top:0;margin-bottom:8px",
                        children: l("Inspect read-only MQTT source reports and diagnostics for unbound or unselected devices.")
                    }),
                    (r = {
                        style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                        children: [
                            s("label", {
                                htmlFor: "hl202-source",
                                children: [
                                    l("Read-only MQTT source"),
                                    ": ",
                                    A
                                ]
                            }),
                            J
                        ]
                    }, s("div", r)),
                    D,
                    (i = {
                        style: "margin-top:10px",
                        children: [
                            s("summary", {
                                style: "cursor:pointer;font-size:85%;color:#888;font-weight:600",
                                children: l("Raw source observations (JSON)")
                            }),
                            s("div", {
                                style: "margin-top:6px",
                                children: I
                            })
                        ]
                    }, s("details", i))
                ]
            }, s("div", o)), U = "report", V = [
                {
                    id: "report",
                    label: l("MQTT report")
                },
                {
                    id: "accounts",
                    label: l("User management")
                },
                {
                    id: "console",
                    label: l("Raw command console")
                },
                {
                    id: "sources",
                    label: l("MQTT source identity")
                }
            ], F = new Map(), W = (a = {
                class: "cbi-tabmenu",
                style: "margin-top:14px;margin-bottom:0",
                children: V.map((e)=>{
                    var t;
                    let n = (t = {
                        class: U === e.id ? "cbi-tab" : "cbi-tab-disabled",
                        "data-tab": e.id,
                        children: s("a", {
                            href: `#tab-${e.id}`,
                            onclick: (t)=>{
                                t.preventDefault();
                                var n = e.id;
                                for (let [e, t] of (U = n, F))t.className = e === n ? "cbi-tab" : "cbi-tab-disabled";
                                M.element.hidden = "report" !== n, R.element.hidden = "accounts" !== n, Z.element.hidden = "console" !== n, Q.hidden = "sources" !== n, window.dispatchEvent(new Event("resize"));
                            },
                            children: e.label
                        })
                    }, s("li", t));
                    return F.set(e.id, n), n;
                })
            }, s("ul", a));
            M.element.hidden = !1, R.element.hidden = !0, Z.element.hidden = !0, Q.hidden = !0;
            let H = s("div", {
                id: "hl202-panels-container",
                children: [
                    M.element,
                    R.element,
                    Z.element,
                    Q
                ]
            }), K = [], B = "", X = "", G = ()=>{
                let e = z.value, t = K.find((t)=>t.optical_sn === e);
                if (!t) {
                    k.textContent = l("No HL202 optical devices were found."), $.textContent = "\u2014", S.textContent = "\u2014", O.textContent = "\u2014", j.textContent = "\u2014", N.hidden = !0, M.setTarget(null), R.setTarget(null), Z.setTarget(null);
                    return;
                }
                if (k.textContent = `${t.optical_sn} (ONU ${t.onu_id})`, $.textContent = t.model || "HL202", t.optical_online ? (S.className = "hl202-badge hl202-badge-success", S.textContent = l("Optical online")) : (S.className = "hl202-badge hl202-badge-danger", S.textContent = l("Optical offline")), t.can_execute && t.mqtt) {
                    O.className = "hl202-badge hl202-badge-success", O.textContent = l("MQTT ready"), j.textContent = `gen: ${t.mqtt.binding_generation}`, j.hidden = !1, N.hidden = !0;
                    let e = {
                        optical_sn: t.optical_sn,
                        onu_id: t.onu_id,
                        binding_generation: t.mqtt.binding_generation
                    };
                    M.setTarget(e), R.setTarget(e), Z.setTarget(e);
                } else O.className = "hl202-badge hl202-badge-warning", O.textContent = l("MQTT unavailable"), j.hidden = !0, N.hidden = !1, M.setTarget(null), R.setTarget(null), Z.setTarget(null);
            }, Y = async ()=>{
                T.disabled = !0, C.textContent = l("Loading devices\u2026");
                try {
                    let t = await tt(), n = t.devices;
                    K = n;
                    let r = n.map((e)=>`${e.optical_sn}:${e.onu_id}:${e.optical_online}:${e.can_execute}:${e.report_revision}:${e.mqtt?.binding_generation}`).join("|");
                    if (r !== B) {
                        B = r;
                        let e = z.value;
                        z.replaceChildren(...n.map((e)=>{
                            var t;
                            return t = {
                                value: e.optical_sn,
                                children: d(`${e.model} / ${e.optical_sn} / ONU ${e.onu_id} \u{2014} ${e.can_execute ? l("MQTT ready") : l("MQTT unavailable")}; ${e.optical_online ? l("Optical online") : l("Optical offline")}`)
                            }, s("option", t);
                        })), n.some((t)=>t.optical_sn === e) && (z.value = e);
                    }
                    C.textContent = n.length ? l("Select a device to inspect reports and run operations.") : l("No HL202 optical devices were found."), I.textContent = JSON.stringify(t.sources, null, 2);
                    let i = A.value, o = [];
                    for (let n of (A.replaceChildren(), t.sources)){
                        var e;
                        o.push({
                            mqtt_mac: n.mqtt_mac,
                            binding_generation: n.binding_generation
                        }), A.append((e = {
                            value: n.mqtt_mac,
                            children: d(`${n.mqtt_mac} \u{2014} ${String(n.reason)}`)
                        }, s("option", e)));
                    }
                    q = o, o.some((e)=>e.mqtt_mac === i) && (A.value = i), J.disabled = 0 === o.length, G();
                    let a = n.find((e)=>e.optical_sn === z.value);
                    a?.can_execute && null !== a.report_revision && `${a.optical_sn}:${a.mqtt?.binding_generation}:${a.report_revision}` !== X && !ta && (X = `${a.optical_sn}:${a.mqtt?.binding_generation}:${a.report_revision}`, M.refresh());
                } catch (e) {
                    K = [], G(), C.textContent = e instanceof Error ? e.message : l("Request failed");
                } finally{
                    T.disabled = !1;
                }
            };
            z.addEventListener("change", G), J.addEventListener("click", ()=>{
                let e = q.find((e)=>e.mqtt_mac === A.value);
                if (D.replaceChildren(), e) {
                    let t = ts();
                    t.setTarget(e), D.append(t.element), t.refresh(e);
                }
            }), T.addEventListener("click", ()=>{
                Y();
            }), Y();
            let ee = (f = {
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
                        children: l("HL202 sub-gateway management")
                    }),
                    (h = {
                        class: "cbi-section",
                        children: [
                            (p = {
                                style: "display:flex;align-items:center;flex-wrap:wrap;gap:10px",
                                children: [
                                    (c = {
                                        htmlFor: "hl202-device",
                                        style: "display:flex;align-items:center;gap:8px",
                                        children: [
                                            s("strong", {
                                                children: [
                                                    l("HL202 device"),
                                                    ":"
                                                ]
                                            }),
                                            z
                                        ]
                                    }, s("label", c)),
                                    T
                                ]
                            }, s("div", p)),
                            C,
                            P
                        ]
                    }, s("div", h)),
                    W,
                    H
                ]
            }, s("div", f)), et = async ()=>{
                ee.isConnected && (await Y(), ee.isConnected && window.setTimeout(()=>void et(), 5000));
            };
            return window.setTimeout(()=>void et(), 5000), ee;
        },
        handleSave: null,
        handleSaveApply: null,
        handleReset: null
    }
]);

return main;