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
function h(e) {
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const g = Symbol("evaluating");
function m(e, t, n) {
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
const j = new Set([
    "string",
    "number",
    "symbol"
]);
function k(e) {
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
}), D = /^-?\d+(?:\.\d+)?$/, q = /^(?:true|false)$/i, F = /^null$/i, I = {
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
    V.init(e, t), e._zod.pattern = q, e._zod.parse = (n, r)=>{
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
            let s = i[e], o = t.element._zod.run({
                value: s,
                issues: []
            }, r);
            o instanceof Promise ? a.push(o.then((t)=>G(t, n, e))) : G(o, n, e);
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
            a instanceof Promise ? o.push(a.then((n)=>Q(n, t, e, s, i))) : Q(a, t, e, s, i);
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
                a instanceof Promise ? e.push(a.then((e)=>Q(e, n, i, t, c))) : Q(a, n, i, t, c);
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
    let i = e.filter((e)=>!P(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>T(e, r, u())))
    }), t);
}
const et = l("$ZodUnion", (e, t)=>{
    V.init(e, t), m(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), m(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), m(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), m(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>h(e.source)).join("|")})$`);
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
}), er = l("$ZodRecord", (e, t)=>{
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
}), ei = l("$ZodEnum", (e, t)=>{
    var n;
    let r;
    V.init(e, t);
    let i = (r = Object.values(n = t.entries).filter((e)=>"number" == typeof e), Object.entries(n).filter(([e, t])=>-1 === r.indexOf(+e)).map(([e, t])=>t)), a = new Set(i);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${i.filter((e)=>j.has(typeof e)).map((e)=>"string" == typeof e ? k(e) : e.toString()).join("|")})$`), e._zod.parse = (t, n)=>{
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
    V.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", m(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), m(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${h(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let r = t.innerType._zod.run(e, n);
            return r instanceof Promise ? r.then((t)=>es(t, e.value)) : es(r, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, n);
    };
}), el = l("$ZodNullable", (e, t)=>{
    V.init(e, t), m(e._zod, "optin", ()=>t.innerType._zod.optin), m(e._zod, "optout", ()=>t.innerType._zod.optout), m(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${h(e.source)}|null)$`) : void 0;
    }), m(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), ed = l("$ZodCatch", (e, t)=>{
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
}), ec = l("$ZodLazy", (e, t)=>{
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
const eu = l("ZodMiniType", (e, t)=>{
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
}), ep = l("ZodMiniString", (e, t)=>{
    B.init(e, t), eu.init(e, t);
});
function e_(e) {
    return new ep({
        type: "string",
        ...S(e)
    });
}
const ef = l("ZodMiniNumber", (e, t)=>{
    W.init(e, t), eu.init(e, t);
});
function eh(e) {
    return new ef({
        type: "number",
        checks: [],
        ...S(e)
    });
}
const eg = l("ZodMiniBoolean", (e, t)=>{
    J.init(e, t), eu.init(e, t);
});
function em(e) {
    return new eg({
        type: "boolean",
        ...S(e)
    });
}
const ev = l("ZodMiniNull", (e, t)=>{
    K.init(e, t), eu.init(e, t);
}), eb = l("ZodMiniNever", (e, t)=>{
    X.init(e, t), eu.init(e, t);
});
function ey(e) {
    return new eb({
        type: "never",
        ...S(e)
    });
}
const ew = l("ZodMiniArray", (e, t)=>{
    H.init(e, t), eu.init(e, t);
});
function ez(e, t) {
    return new ew({
        type: "array",
        element: e,
        ...S(t)
    });
}
const ej = l("ZodMiniObject", (e, t)=>{
    Y.init(e, t), eu.init(e, t), m(e, "shape", ()=>t.shape);
});
function ek(e, t) {
    return new ej({
        type: "object",
        shape: e ?? {},
        ...S(t)
    });
}
function ex(e, t) {
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
}
const eS = l("ZodMiniUnion", (e, t)=>{
    et.init(e, t), eu.init(e, t);
});
function eP(e, t) {
    return new eS({
        type: "union",
        options: e,
        ...S(t)
    });
}
const eE = l("ZodMiniDiscriminatedUnion", (e, t)=>{
    en.init(e, t), eu.init(e, t);
});
function e$(e, t, n) {
    return new eE({
        type: "union",
        options: t,
        discriminator: e,
        ...S(n)
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
        ...S(n)
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
        ...S(t)
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
        ...S(t)
    });
}
const eR = l("ZodMiniOptional", (e, t)=>{
    eo.init(e, t), eu.init(e, t);
});
function eM(e) {
    return new eR({
        type: "optional",
        innerType: e
    });
}
const eU = l("ZodMiniNullable", (e, t)=>{
    el.init(e, t), eu.init(e, t);
});
function eL(e) {
    return new eU({
        type: "nullable",
        innerType: e
    });
}
const eD = l("ZodMiniCatch", (e, t)=>{
    ed.init(e, t), eu.init(e, t);
}), eq = l("ZodMiniLazy", (e, t)=>{
    ec.init(e, t), eu.init(e, t);
});
function eF() {
    let e = new eq({
        type: "lazy",
        getter: ()=>eP([
                e_(),
                eh(),
                em(),
                new ev({
                    type: "null",
                    ...S(void 0)
                }),
                ez(e),
                eT(e_(), e)
            ])
    });
    return e;
}
let eI = ek({
    error: eP([
        e_(),
        ek({
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
const eW = ek({
    status: eC("pending"),
    job: e_()
}), eJ = e$("status", [
    ek({
        status: eC("pending")
    }),
    ek({
        status: eC("ready"),
        chunk: eh(),
        chunks: eh(),
        bytes: eh(),
        data: e_()
    })
]);
let eK = e_(), eX = eh(), eG = em();
ek({
    optical_sn: eK,
    onu_id: eX,
    binding_generation: eK
}), ek({
    mqtt_mac: eK,
    binding_generation: eK
});
let eH = ek({
    mqtt_mac: eK,
    optical_sn: eL(eK),
    onu_id: eL(eX),
    binding_generation: eK,
    last_seen: eX,
    reason: eK
}), eQ = {
    target: eK,
    request_id: eM(eK),
    output: eM(eK),
    output_truncated: eG,
    error: eM(eK)
};
const eY = e$("status", [
    ek({
        ...eQ,
        status: eC("executed"),
        exit_code: eL(eX)
    }),
    ek({
        ...eQ,
        status: eC("dispatched"),
        exit_code: eM(ey())
    }),
    ek({
        ...eQ,
        status: eC("timeout"),
        exit_code: eM(ey())
    }),
    ek({
        ...eQ,
        status: eC("error"),
        exit_code: eM(ey())
    })
]);
let e0 = ek({
    target: eH,
    result: eY,
    binding_current: eG
}), e1 = ek({
    schema_version: eX,
    compressed_bytes: eX,
    decompressed_bytes: eX,
    fields: eT(eK, ek({
        value: eF(),
        member: eK,
        unit: eL(eK)
    })),
    members: ez(ek({
        name: eK,
        bytes: eX,
        encoding: eK,
        text: eL(eK),
        text_omitted: eG
    })),
    errors: ez(eK)
}), e2 = ek({
    revision: eX,
    last_received: eX,
    last_processed_receipt: eL(eX),
    last_good: eL(eX),
    error: eL(eK),
    report: eL(e1)
}), e5 = {
    schema_version: eC(1),
    target: eH,
    report: eL(e2)
};
eP([
    ek({
        ...e5,
        state: eN([
            "received",
            "report_unavailable"
        ])
    }),
    ek({
        ...e5,
        read_only: eC(!0)
    })
]);
const e6 = ek({
    schema_version: eC(1),
    devices: ez(ek({
        optical_sn: eK,
        onu_id: eX,
        model: eK,
        optical_online: eG,
        can_execute: eG,
        mqtt: eL(eH),
        report_revision: eL(eX)
    })),
    sources: ez(eH)
});
ek({
    schema_version: eC(1),
    operation: e0,
    accounts: eL(ez(ek({
        entry: eP([
            eC(0),
            eC(1),
            eC(2)
        ]),
        username: eK,
        active: eG
    }))),
    write_status: eN([
        "not_applicable",
        "accepted_and_saved",
        "unconfirmed"
    ])
}), ek({
    schema_version: eC(1),
    operation: e0
});
let e8 = e_(), e3 = eh(), e4 = em(), e9 = eM(e8), e7 = eM(e3), te = eM(e4);
const tt = eN([
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
]), tn = eN([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), tr = ek({
    id: e8,
    name: eM(eL(e8)),
    kind: eN([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: e8,
    state: e8,
    reason: e9,
    revision: e9,
    current_revision: te,
    management_fresh: te,
    operation_id: e7,
    task_id: eM(eL(e3)),
    updated_at: e7,
    changes: eM(ez(ek({
        name: e8,
        desired: e8
    })))
});
let ti = ek({
    state: e8,
    reason: e9,
    task_id: eM(eL(e3)),
    instance: e7
});
const ta = ek({
    cwmp_id: e8,
    state: eN([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: e4,
    last_inform: eL(e3),
    age_seconds: eL(e3)
});
let ts = ek({
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
    method: e9,
    reason: e9,
    mqtt_target: eL(e8),
    binding_source: e9,
    link_identity_error: eL(e8),
    mqtt_last_seen: eL(e3),
    cwmp_id: e9,
    desired_version: e9,
    generation: e7,
    inflight: te,
    attempts: e7,
    next_retry_at: e7,
    updated_at: e7,
    settings_verified_at: eL(e3),
    last_inform: eL(e3),
    last_error: eM(eL(e8)),
    persistence_error: eM(eL(e8)),
    desired: eM(eL(ek({
        vlan: e3,
        vlans: ez(e3),
        priority: e3,
        acs_url: e8
    }))),
    listener: eM(ek({
        enabled: e4,
        listen: e8,
        path: e8,
        error: eL(e8)
    })),
    endpoint_notice: e9,
    manual_steps: eM(ez(e8))
});
const to = e$("state", [
    ts,
    ex(function(e) {
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
                    t[e] && (r[e] = eR ? new eR({
                        type: "optional",
                        innerType: n[e]
                    }) : n[e]);
                }
                else for(let e in n)r[e] = eR ? new eR({
                    type: "optional",
                    innerType: n[e]
                }) : n[e];
                return v(this, "shape", r), r;
            },
            checks: []
        });
        return x(e, r);
    }(ts), {
        state: eN([
            "pending",
            "unavailable"
        ]),
        reason: e8
    })
]), tl = ek({
    backend: eM(ek({
        configured: e8,
        effective: e8,
        available: ez(e8),
        reason: e8
    })),
    state: tt,
    operation_id: e7,
    device: e9,
    optical_sn: e9,
    cwmp_id: e9,
    revision: e9,
    mode: eM(eN([
        "apply",
        "plan"
    ])),
    started_at: e7,
    current_revision: te,
    management_fresh: te,
    reason: e9,
    error: e9,
    attempts: e7,
    next_retry_at: e7,
    reconcile_reason: e9,
    items: ez(tr),
    cwmp_contract: eM(ek({
        state: e8,
        requested: e8,
        contract: eL(e8),
        reason: e8,
        cache_hit: e4,
        schema: e8,
        capabilities: eL(ek({
            wan: e8,
            wlan: e8,
            binding: e8
        }))
    })),
    wan_objects: eM(eT(e8, eF())),
    wan_lifecycle: eM(eT(e8, ti)),
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
    wifi_objects: eM(ek({
        owned: ez(e3),
        pending: eL(e8),
        pending_instance: eL(e3)
    })),
    wifi_lifecycle: eM(eT(e8, ti)),
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
let td = ek({
    enabled: e4,
    mode: eN([
        "auto",
        "manual"
    ]),
    vlan: ez(e3),
    priority: e3,
    address: e8,
    acs_url: e8,
    port: e3,
    path: e8,
    dhcp_enabled: e4
}), tc = ek({
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
    error: eL(e8),
    inflight: e4,
    ready: e4,
    desired_version: eL(e8),
    applied_version: eL(e8),
    next_retry_at: e3,
    attempts: e3,
    desired: eL(td),
    applied: eL(td),
    previous: eL(td),
    plan: ez(ek({
        operation: e8,
        key: e8,
        value: ez(e8)
    }))
});
const tu = ek({
    device: e8,
    name: eL(e8),
    group: eL(e8),
    group_name: eL(e8),
    template: eL(e8),
    template_name: eL(e8),
    optical_sn: e8,
    adapter: e8,
    omci_management: ek({
        state: e8,
        reason: eM(eL(e8))
    }),
    management: eL(ta),
    acs_bootstrap: to,
    provisioning: tl,
    services: ez(tr),
    ssids: ez(tr),
    wifi_sync: tn
}), tp = ek({
    enabled: e4,
    mode: eN([
        "auto",
        "manual"
    ]),
    method: eC("diff"),
    revision: e8,
    triggers: ez(e8),
    interval_minutes: new ef({
        type: "number",
        coerce: !0,
        checks: [],
        ...S(void 0)
    }),
    error: eL(e8),
    devices: ez(tu),
    management_network: tc,
    omci_management: eF(),
    groups: ez(ek({
        id: e8,
        name: eL(e8),
        template: e8
    })),
    pending_devices: ez(e8)
}), t_ = eP([
    ek({
        valid: eC(!0),
        revision: e8,
        devices: e3,
        error: eM(ey())
    }),
    ek({
        error: e8,
        valid: eM(ey()),
        revision: eM(ey()),
        devices: eM(ey())
    })
]), tf = ek({
    restarting: eC(!0)
}), th = eP([
    ek({
        operation_ids: ez(e3),
        revision: e8
    }),
    ek({
        started: eC(!0),
        mode: eN([
            "apply",
            "plan"
        ])
    }),
    ek({
        reset: eC(!0),
        device: e8
    }),
    ek({
        operation_ids: ez(e3),
        mode: eN([
            "apply",
            "plan"
        ]),
        reconcile: te,
        retry: te
    })
]);
let tg = e_(), tm = eh(), tv = eL(tm), tb = eT(tg, ek({
    source: tg,
    unit: tg,
    reason: eL(tg),
    raw: eL(tg),
    age_seconds: tv
}));
const ty = ek({
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
    generation: tm,
    error: eL(tg)
}), tw = eN([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tz = ek({
    model: tg,
    wavelength_tx_nm: tm,
    wavelength_rx_nm: tm,
    phy_rate_downlink_gbps: tm,
    phy_rate_uplink_gbps: tm,
    tx_power_dbm: tv,
    laser_bias_current_ma: tv,
    temperature_celsius: tv,
    vcc_voltage: tv,
    cdr_locked: eL(em()),
    tx_enabled: eL(em()),
    measurements: tb
}), tj = ek({
    equipment_id: eL(tg),
    hardware_version: eL(tg),
    software_images: ez(tg),
    omcc_version: tv,
    errors: ez(tg)
});
const tk = ek({
    onu_id: tm,
    vendor: tg,
    model: tg,
    serial_number: tg,
    state: tw,
    business_status: ty,
    management: eL(ta),
    provisioning: eL(tl),
    services: ez(tr),
    ssids: ez(tr),
    wifi_sync: tn,
    acs_bootstrap: eM(to),
    identity: eL(tj),
    identity_age_seconds: tv,
    identity_current: em(),
    fiber_distance_m: tv,
    ranging_delay_rtd_ns: tv,
    equalization_delay_bits: new eD({
        type: "catch",
        innerType: tv,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tv,
    optical_tx_power_dbm: tv,
    firmware_version: tg,
    hardware_version: tg,
    uptime_seconds: tv,
    data_path: ek({
        interface: tg,
        gem_ports: eL(ez(tm)),
        vlan_id: tv,
        tx_bytes: tv,
        rx_bytes: tv,
        current_tx_kbps: tv,
        current_rx_kbps: tv,
        offload: eM(ek({
            enabled: eM(eL(em())),
            routed_enabled: eM(eL(em())),
            bridge_enabled: eM(eL(em())),
            engine_attached: eM(eL(em())),
            forwarding_verified: eM(eL(em()))
        })),
        measurements: tb
    }),
    wifi_mesh: ek({
        channel_2g: tv,
        channel_5g: tv,
        bandwidth_5g: eL(tg),
        tx_power_pct: tv,
        measurements: tb
    }),
    connected_clients: eL(ez(ek({
        mac: tg,
        ip: tg,
        band: tg,
        rssi_dbm: tv,
        rx_rate_mbps: tv,
        tx_rate_mbps: tv
    }))),
    measurements: tb
});
let tx = ek({
    reserved_sn: eM(tg),
    port: tm,
    interface: tg,
    carrier: em(),
    status: tg,
    onu_id: eM(tm),
    onu_sn: eM(tg),
    link_state: tg
});
const tS = ek({
    counters_valid: eM(em()),
    packets_exact: eM(tg),
    bytes_exact: eM(tg),
    index: tg,
    state: tg,
    pkt_type: tg,
    orig_tuple: tg,
    new_tuple: tg,
    eth: tg,
    vlan: tg,
    packets: tm,
    bytes: tm
}), tP = ek({
    sampled_at_ms: eM(tm),
    errors: eM(ez(tg)),
    config_valid: eM(em()),
    engine_valid: eM(em()),
    mask_valid: eM(em()),
    routed_mask_valid: eM(em()),
    debug_valid: eM(em()),
    flows_valid: eM(em()),
    entries_valid: eM(em()),
    counters_valid: eM(em()),
    hooks_valid: eM(em()),
    total_packets_exact: eM(tg),
    total_bytes_exact: eM(tg),
    supported: em(),
    engine_attached: em(),
    bridge_offload_enabled: em(),
    bridge_offload_mask: tm,
    routed_offload_mask: tm,
    bridge_offload_debug: em(),
    bridge: tg,
    active_ports: ez(tg),
    fw4_hooks_ready: em(),
    total_entries: tm,
    bound_entries: tm,
    total_packets: tm,
    total_bytes: tm,
    bound_flows: ez(tS)
}), tE = ex(tP, {
    sampled_at_ms: tm,
    errors: ez(tg),
    config_valid: em(),
    engine_valid: em(),
    mask_valid: em(),
    routed_mask_valid: em(),
    debug_valid: em(),
    flows_valid: em(),
    entries_valid: em(),
    counters_valid: em(),
    hooks_valid: em(),
    total_packets_exact: tg,
    total_bytes_exact: tg,
    bound_ipv4_entries: tm,
    bound_ipv6_entries: tm,
    bound_flows: ez(ex(tS, {
        counters_valid: em(),
        packets_exact: tg,
        bytes_exact: tg
    }))
}), t$ = ek({
    ubus: eM(eT(tg, ek({
        calls: tm,
        failures: tm,
        last_us: tm,
        max_us: tm,
        total_us: tm
    }))),
    jobs: eM(ek({
        accepting: em(),
        running: tm,
        stored: tm,
        bytes: tm,
        running_limit: tm,
        stored_limit: tm,
        bytes_limit: tm,
        result_bytes_limit: tm
    })),
    onu_pinning: eM(ek({
        desired: eT(tg, tm),
        active: eT(tg, tm),
        pending_restart: em(),
        allocation_blocked: em(),
        startup_error: eL(tg),
        config_error: eL(tg)
    })),
    fpga_status: tg,
    provisioning: eL(tp),
    optical_transceiver: tz,
    switch_ports: ez(tx),
    sub_gateways: ez(tk),
    telemetry_gateways: ez(ek({
        id: tg,
        last_seen_sec_ago: tm,
        last_payload_bytes: tm
    })),
    npu: eM(eL(tP))
});
eT(tg, ek({
    carrier: eM(em()),
    mac: eM(tg),
    link: eM(ek({
        speed: eM(tm),
        duplex: eM(tg),
        autoneg: eM(em())
    })),
    stats: eM(eT(tg, tm))
}));
const tO = e$("status", [
    ek({
        status: eC("success"),
        enabled: em()
    }),
    ek({
        status: eC("error"),
        error: e_()
    })
]), tT = ek({
    source: eN([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: e_(),
    size: eh(),
    sha256: e_(),
    data: e_(),
    factory: ek({
        detected: em(),
        device: e_(),
        has_data: em(),
        sha256: e_(),
        data: e_()
    }),
    firmware: ek({
        exists: em(),
        path: e_(),
        size: eh(),
        sha256: e_(),
        data: e_()
    }),
    error: eM(e_())
}), tZ = ek({
    success: em(),
    path: e_(),
    size: eh(),
    sha256: e_(),
    error: eM(e_())
});
ek({
    success: em(),
    output: eM(e_()),
    error: eM(e_())
});
const tN = e$("status", [
    ek({
        status: eC("pending"),
        progress: eM(ek({
            phase: eN([
                "starting",
                "upload",
                "tables"
            ]),
            received: eh(),
            expected: eL(eh())
        }))
    }),
    ek({
        status: eC("ready"),
        chunk: eh(),
        chunks: eh(),
        bytes: eh(),
        data: e_()
    })
]), tA = ek({
    released: em()
}), tC = ek({
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
    desired_enabled: eL(em()),
    tx_enabled: eL(em()),
    actor_state: eN([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: em(),
    discovery_active: em(),
    cleanup_pending: em(),
    error: eL(ek({
        code: e_(),
        message: e_()
    }))
}), tR = ek({
    schema_version: eC(1),
    version: e_(),
    features: eT(e_(), em()),
    functions: ek({
        optical: em(),
        omci_mib: em(),
        mqtt_telemetry: em(),
        hl202_management: em(),
        cwmp: em()
    }),
    pages: ek({
        status: em(),
        config: em(),
        sync: em(),
        hl202: em(),
        hardware: em(),
        calibration: em(),
        about: em()
    }),
    adapters: ez(ek({
        id: e_(),
        name: e_()
    }))
}), tM = {
    getCapabilities: {
        parse: (e)=>tR.parse(eB(e))
    },
    opticalStatus: tC,
    opticalSet: tC,
    getStatus: {
        parse: (e)=>t$.parse(eB(e))
    },
    getSync: {
        parse: (e)=>tp.parse(eB(e))
    },
    configCheck: t_,
    npuStatus: tE,
    configReload: {
        parse: (e)=>tp.parse(eB(e))
    },
    restartService: {
        parse: (e)=>tf.parse(eB(e))
    },
    sync: {
        parse: (e)=>th.parse(eB(e))
    },
    npuSet: tO,
    mibStart: {
        parse: (e)=>eW.parse(eB(e))
    },
    mibResult: {
        parse: (e)=>tN.parse(eB(e))
    },
    jobRelease: {
        parse: (e)=>tA.parse(eB(e))
    },
    hl202List: {
        parse: (e)=>e6.parse(eB(e))
    },
    hl202Report: {
        parse: (e)=>eW.parse(eB(e))
    },
    hl202AccountsStart: {
        parse: (e)=>eW.parse(eB(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>eW.parse(eB(e))
    },
    hl202ExecStart: {
        parse: (e)=>eW.parse(eB(e))
    },
    jobResult: {
        parse: (e)=>eJ.parse(eB(e))
    },
    getCalibration: {
        parse: (e)=>tT.parse(eB(e))
    },
    saveCalibration: {
        parse: (e)=>tZ.parse(eB(e))
    },
    applyCalibration: {
        parse: (e)=>eW.parse(eB(e))
    }
};
function tU() {
    var e;
    let n, r, i, a, s, o, l, d, c, u, p, f, h, g, m, v, b, y, w, z, j, k, x;
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
    }), j = e.declare({
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
    }), x = e.declare({
        object: "fttr",
        method: "apply_calibration",
        reject: !0
    }), {
        getCapabilities: async ()=>tM.getCapabilities.parse(await n()),
        opticalStatus: async ()=>tM.opticalStatus.parse(await r()),
        opticalSet: async (e)=>tM.opticalSet.parse(await i(e.enabled)),
        getStatus: async ()=>tM.getStatus.parse(await a()),
        getSync: async ()=>tM.getSync.parse(await s()),
        configCheck: async ()=>tM.configCheck.parse(await o()),
        npuStatus: async ()=>tM.npuStatus.parse(await l()),
        configReload: async ()=>tM.configReload.parse(await d()),
        restartService: async ()=>tM.restartService.parse(await c()),
        sync: async (e)=>tM.sync.parse(await u(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>tM.npuSet.parse(await p(e.enabled, e.bridge)),
        mibStart: async (e)=>tM.mibStart.parse(await f(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>tM.mibResult.parse(await h(e.job, e.chunk)),
        jobRelease: async (e)=>tM.jobRelease.parse(await g(e.job)),
        hl202List: async ()=>tM.hl202List.parse(await m()),
        hl202Report: async (e)=>tM.hl202Report.parse(await v(e.target)),
        hl202AccountsStart: async (e)=>tM.hl202AccountsStart.parse(await b(e.target)),
        hl202AccountUpdate: async (e)=>tM.hl202AccountUpdate.parse(await y(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>tM.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>tM.jobResult.parse(await z(e.job, e.chunk)),
        getCalibration: async ()=>tM.getCalibration.parse(await j()),
        saveCalibration: async (e)=>tM.saveCalibration.parse(await k(e.data)),
        applyCalibration: async ()=>tM.applyCalibration.parse(await x())
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
const tL = async ()=>tU().npuStatus(), tD = async function(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    return tU().npuSet({
        enabled: e,
        bridge: t
    });
};
function tq(e, t) {
    return !0 === t && void 0 !== e && /^(0|[1-9][0-9]*)$/.test(e) ? BigInt(e).toLocaleString() : "\u2014";
}
function tF(e, t) {
    return !0 === t ? `0x${e.toString(16).padStart(4, "0")} (${e})` : "\u2014";
}
function tI(e, t) {
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
function tV(e, t, n, r) {
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
        }), f = o("div", {}), h = o("button", {
            type: "button",
            class: "cbi-button cbi-button-apply",
            disabled: !0,
            children: _("Save NPU configuration")
        }), g = o("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            children: _("Refresh")
        }), m = ()=>{
            d.disabled = c.disabled = h.disabled = i || !L.hasViewPermission() || !n?.supported || !0 !== n.config_valid || !l || Date.now() - l > 12000, g.disabled = i || !!r;
        }, v = async ()=>{
            if (r || i) return r;
            let e = s;
            return r = (async ()=>{
                try {
                    var t, u, h, g, v, b, y, w, z, j, k, x, S, P, $, O, T, Z, N, A, C, R, M;
                    let r, m = await Promise.race([
                        tL(),
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
                            m.errors?.length ? (g = {
                                class: "alert-message warning",
                                children: [
                                    (u = {
                                        children: _("Some data sources are unavailable")
                                    }, o("strong", u)),
                                    (h = {
                                        children: m.errors.map((e)=>{
                                            var t;
                                            return t = {
                                                children: e
                                            }, o("li", t);
                                        })
                                    }, o("ul", h))
                                ]
                            }, o("div", g)) : null,
                            (x = {
                                class: "fttr-npu-grid",
                                children: [
                                    (y = {
                                        class: "cbi-section",
                                        children: [
                                            (v = {
                                                children: _("Engine and admission status")
                                            }, o("h3", v)),
                                            tI(_("Saved configuration"), tV(m.bridge_offload_enabled, m.config_valid, _("Enabled"), _("Disabled"))),
                                            tI(_("NPU engine"), tV(m.engine_attached, m.engine_valid, _("Attached"), _("Detached"))),
                                            tI(_("Port admission"), tV(0 !== m.bridge_offload_mask, m.mask_valid, _("Admitted"), _("Not admitted"))),
                                            tI(_("Managed bridge"), m.config_valid ? m.bridge : "\u2014"),
                                            tI(_("Bridge offload mask"), tF(m.bridge_offload_mask, m.mask_valid)),
                                            tI(_("Admitted ports"), m.mask_valid ? m.active_ports.join(", ") || _("None") : "\u2014"),
                                            tI(_("Firewall hooks"), tV(m.fw4_hooks_ready, m.hooks_valid, _("Ready"), _("Not ready"))),
                                            tI(_("Routed offload mask"), tF(m.routed_offload_mask, m.routed_mask_valid)),
                                            tI(_("Driver debug logging"), tV(m.bridge_offload_debug, m.debug_valid, _("Enabled"), _("Disabled"))),
                                            (b = {
                                                class: "fttr-npu-note",
                                                children: _("Admission allows eligible traffic to bind; it does not prove that packets are currently hardware-forwarded. The switch controls FTTR bridge admission, not the entire NPU or global routed offload policy.")
                                            }, o("p", b))
                                        ]
                                    }, o("div", y)),
                                    (k = {
                                        class: "cbi-section",
                                        children: [
                                            (w = {
                                                children: _("PPE flow snapshot")
                                            }, o("h3", w)),
                                            tI(_("Bound hardware flows"), m.flows_valid ? m.bound_entries : "\u2014"),
                                            tI(_("Current non-empty FOE entries"), m.entries_valid ? m.total_entries : "\u2014"),
                                            tI(_("Current bound-flow packets"), tq(m.total_packets_exact, m.counters_valid)),
                                            tI(_("Current bound-flow bytes"), tq(m.total_bytes_exact, m.counters_valid)),
                                            (z = {
                                                class: "fttr-npu-note",
                                                children: _("Source: PPE debugfs bind/entries and driver sysfs. These are global PPE snapshots, not FTTR-only totals or table capacity. Reads are sequential, not atomic.")
                                            }, o("p", z)),
                                            (j = {
                                                class: "fttr-npu-note",
                                                children: _("Counters cover only currently bound flows and may decrease when flows expire. Driver-exported zeroes are not proof of no traffic. AN7581 native L2B counters are unavailable; \u2014 means unavailable, not zero.")
                                            }, o("p", j))
                                        ]
                                    }, o("div", k))
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
                                                        var t, n, r, i, a, s, l, d, c, u, p, f, h;
                                                        return h = {
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
                                                                    children: tq(e.packets_exact, e.counters_valid && m.engine_valid && m.engine_attached)
                                                                }, o("td", p)),
                                                                (f = {
                                                                    children: tq(e.bytes_exact, e.counters_valid && m.engine_valid && m.engine_attached)
                                                                }, o("td", f))
                                                            ]
                                                        }, o("tr", h);
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
        g.onclick = ()=>{
            v();
        }, h.onclick = async ()=>{
            if (h.disabled || i) return;
            let e = c.value.trim(), t = d.checked, o = !1;
            if (!/^[a-zA-Z0-9_.-]{1,15}$/.test(e)) {
                u.textContent = _("Use a bridge interface name of 1\u201315 letters, digits, dots, underscores or hyphens.");
                return;
            }
            i = !0, s++, m(), u.textContent = _("Saving\u2026");
            try {
                let n = await tD(t, e);
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
                                h,
                                " ",
                                g
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