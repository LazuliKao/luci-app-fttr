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
const l = (e)=>null == e || "" === e ? "\u2014" : String(e);
function d(e) {
    return e ? new Date(1000 * e).toLocaleString() : "\u2014";
}
function c(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
    return null != e && Number.isFinite(e) ? `${e.toFixed(t)} dBm` : "\u2014";
}
function p(e) {
    if (null == e || !Number.isFinite(e) || e < 0) return null;
    let t = Math.floor(e);
    if (t < 60) return (1 === t ? _("%d second ago") : _("%d seconds ago")).replace("%d", String(t));
    let r = Math.floor(t / 60);
    if (r < 60) return (1 === r ? _("%d minute ago") : _("%d minutes ago")).replace("%d", String(r));
    let n = Math.floor(t / 3600);
    if (n < 24) return (1 === n ? _("%d hour ago") : _("%d hours ago")).replace("%d", String(n));
    let i = Math.floor(t / 86400);
    return (1 === i ? _("%d day ago") : _("%d days ago")).replace("%d", String(i));
}
function u(e, t, r) {
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
class f extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const g = {};
function b(e) {
    return e && Object.assign(g, e), g;
}
function h(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function m(e) {
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
function v(e) {
    let t = +!!e.startsWith("^"), r = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, r);
}
const y = Symbol("evaluating");
function w(e, t, r) {
    let n;
    Object.defineProperty(e, t, {
        get () {
            if (n !== y) return void 0 === n && (n = y, n = r()), n;
        },
        set (r) {
            Object.defineProperty(e, t, {
                value: r
            });
        },
        configurable: !0
    });
}
function x(e, t, r) {
    Object.defineProperty(e, t, {
        value: r,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
}
function k(...e) {
    let t = {};
    for (let r of e)Object.assign(t, Object.getOwnPropertyDescriptors(r));
    return Object.defineProperties({}, t);
}
const z = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function j(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function S(e) {
    if (!1 === j(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let r = t.prototype;
    return !1 !== j(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
}
const $ = new Set([
    "string",
    "number",
    "symbol"
]);
function C(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function O(e, t, r) {
    let n = new e._zod.constr(t ?? e._zod.def);
    return (!t || r?.parent) && (n._zod.parent = e), n;
}
function M(e) {
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
    for(let r = t; r < e.issues.length; r++)if (e.issues[r]?.continue !== !0) return !0;
    return !1;
}
function R(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function A(e) {
    return "string" == typeof e ? e : e?.message;
}
function N(e, t, r) {
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = A(e.inst?._zod.def?.error?.(e)) ?? A(t?.error?.(e)) ?? A(r.customError?.(e)) ?? A(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
}
const I = (e, t)=>{
    e.name = "$ZodError", Object.defineProperty(e, "_zod", {
        value: e._zod,
        enumerable: !1
    }), Object.defineProperty(e, "issues", {
        value: t,
        enumerable: !1
    }), e.message = JSON.stringify(t, h, 2), Object.defineProperty(e, "toString", {
        value: ()=>e.message,
        enumerable: !1
    });
}, T = u("$ZodError", I), D = u("$ZodError", I, {
    Parent: Error
}), Z = (r = D, (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise) throw new f();
    if (s.issues.length) {
        let e = new (i?.Err ?? r)(s.issues.map((e)=>N(e, a, b())));
        throw z(e, i?.callee), e;
    }
    return s.value;
}), q = (n = D, async (e, t, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (i?.Err ?? n)(s.issues.map((e)=>N(e, a, b())));
        throw z(e, i?.callee), e;
    }
    return s.value;
}), U = (i = D, (e, t, r)=>{
    let n = r ? {
        ...r,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, n);
    if (a instanceof Promise) throw new f();
    return a.issues.length ? {
        success: !1,
        error: new (i ?? T)(a.issues.map((e)=>N(e, n, b())))
    } : {
        success: !0,
        data: a.value
    };
}), W = (a = D, async (e, t, r)=>{
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
        error: new a(i.issues.map((e)=>N(e, n, b())))
    } : {
        success: !0,
        data: i.value
    };
}), B = /^-?\d+(?:\.\d+)?$/, V = /^(?:true|false)$/i, F = /^null$/i, J = {
    major: 4,
    minor: 3,
    patch: 6
}, K = u("$ZodType", (e, t)=>{
    var r;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = J;
    let n = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && n.unshift(e), n))for (let r of t._zod.onattach)r(e);
    if (0 === n.length) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, r)=>{
            let n, i = P(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, s = a._zod.check(e);
                if (s instanceof Promise && r?.async === !1) throw new f();
                if (n || s instanceof Promise) n = (n ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (i || (i = P(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = P(e, t));
                }
            }
            return n ? n.then(()=>e) : e;
        }, r = (r, i, a)=>{
            if (P(r)) return r.aborted = !0, r;
            let s = t(i, n, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new f();
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
                if (!1 === a.async) throw new f();
                return s.then((e)=>t(e, n, a));
            }
            return t(s, n, a);
        };
    }
    w(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = U(e, t);
                    return r.success ? {
                        value: r.data
                    } : {
                        issues: r.error?.issues
                    };
                } catch (r) {
                    return W(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), G = u("$ZodString", (e, t)=>{
    var r;
    let n;
    K.init(e, t), e._zod.pattern = [
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
}), H = u("$ZodNumber", (e, t)=>{
    K.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? B, e._zod.parse = (r, n)=>{
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
}), Q = u("$ZodBoolean", (e, t)=>{
    K.init(e, t), e._zod.pattern = V, e._zod.parse = (r, n)=>{
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
}), X = u("$ZodNull", (e, t)=>{
    K.init(e, t), e._zod.pattern = F, e._zod.values = new Set([
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
}), Y = u("$ZodUnknown", (e, t)=>{
    K.init(e, t), e._zod.parse = (e)=>e;
}), ee = u("$ZodNever", (e, t)=>{
    K.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function et(e, t, r) {
    e.issues.length && t.issues.push(...R(r, e.issues)), t.value[r] = e.value;
}
const er = u("$ZodArray", (e, t)=>{
    K.init(e, t), e._zod.parse = (r, n)=>{
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
            o instanceof Promise ? a.push(o.then((t)=>et(t, r, e))) : et(o, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function en(e, t, r, n, i) {
    if (e.issues.length) {
        if (i && !(r in n)) return;
        t.issues.push(...R(r, e.issues));
    }
    void 0 === e.value ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
const ei = u("$ZodObject", (e, t)=>{
    let r;
    K.init(e, t);
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
    let i = m(()=>(function(e) {
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
    w(e._zod, "propValues", ()=>{
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
        if (!j(s)) return t.issues.push({
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
            a instanceof Promise ? o.push(a.then((r)=>en(r, t, e, s, i))) : en(a, t, e, s, i);
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
                a instanceof Promise ? e.push(a.then((e)=>en(e, r, i, t, c))) : en(a, r, i, t, c);
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
function ea(e, t, r, n) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let i = e.filter((e)=>!P(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>N(e, n, b())))
    }), t);
}
const es = u("$ZodUnion", (e, t)=>{
    K.init(e, t), w(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), w(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), w(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), w(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>v(e.source)).join("|")})$`);
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
        return s ? Promise.all(o).then((t)=>ea(t, i, e, a)) : ea(o, i, e, a);
    };
}), eo = u("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, es.init(e, t);
    let r = e._zod.parse;
    w(e._zod, "propValues", ()=>{
        let e = {};
        for (let r of t.options){
            let n = r._zod.propValues;
            if (!n || 0 === Object.keys(n).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
            for (let [t, r] of Object.entries(n))for (let n of (e[t] || (e[t] = new Set()), r))e[t].add(n);
        }
        return e;
    });
    let n = m(()=>{
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
        if (!j(s)) return i.issues.push({
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
}), el = u("$ZodRecord", (e, t)=>{
    K.init(e, t), e._zod.parse = (r, n)=>{
        let i = r.value;
        if (!S(i)) return r.issues.push({
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
                    t.issues.length && r.issues.push(...R(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...R(e, s.issues)), r.value[e] = s.value);
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
            if ("string" == typeof s && B.test(s) && o.issues.length) {
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
                    issues: o.issues.map((e)=>N(e, n, b())),
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
                e.issues.length && r.issues.push(...R(s, e.issues)), r.value[o.value] = e.value;
            })) : (l.issues.length && r.issues.push(...R(s, l.issues)), r.value[o.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), ed = u("$ZodEnum", (e, t)=>{
    var r;
    let n;
    K.init(e, t);
    let i = (n = Object.values(r = t.entries).filter((e)=>"number" == typeof e), Object.entries(r).filter(([e, t])=>-1 === n.indexOf(+e)).map(([e, t])=>t)), a = new Set(i);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${i.filter((e)=>$.has(typeof e)).map((e)=>"string" == typeof e ? C(e) : e.toString()).join("|")})$`), e._zod.parse = (t, r)=>{
        let n = t.value;
        return a.has(n) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: n,
            inst: e
        }), t;
    };
}), ec = u("$ZodLiteral", (e, t)=>{
    if (K.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? C(e) : e ? C(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (n, i)=>{
        let a = n.value;
        return r.has(a) || n.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
            inst: e
        }), n;
    };
});
function ep(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const eu = u("$ZodOptional", (e, t)=>{
    K.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", w(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), w(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${v(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let n = t.innerType._zod.run(e, r);
            return n instanceof Promise ? n.then((t)=>ep(t, e.value)) : ep(n, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, r);
    };
}), e_ = u("$ZodNullable", (e, t)=>{
    K.init(e, t), w(e._zod, "optin", ()=>t.innerType._zod.optin), w(e._zod, "optout", ()=>t.innerType._zod.optout), w(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${v(e.source)}|null)$`) : void 0;
    }), w(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), ef = u("$ZodCatch", (e, t)=>{
    K.init(e, t), w(e._zod, "optin", ()=>t.innerType._zod.optin), w(e._zod, "optout", ()=>t.innerType._zod.optout), w(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let n = t.innerType._zod.run(e, r);
        return n instanceof Promise ? n.then((n)=>(e.value = n.value, n.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: n.issues.map((e)=>N(e, r, b()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = n.value, n.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: n.issues.map((e)=>N(e, r, b()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), eg = u("$ZodLazy", (e, t)=>{
    K.init(e, t), w(e._zod, "innerType", ()=>t.getter()), w(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), w(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), w(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), w(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
const eb = u("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    K.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>Z(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>U(e, t, r), e.parseAsync = async (t, r)=>q(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>W(e, t, r), e.check = (...r)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, r)=>O(e, t, r), e.brand = ()=>e, e.register = (t, r)=>(t.add(e, r), e), e.apply = (t)=>t(e);
}), eh = u("ZodMiniString", (e, t)=>{
    G.init(e, t), eb.init(e, t);
});
function em(e) {
    return new eh({
        type: "string",
        ...M(e)
    });
}
const ev = u("ZodMiniNumber", (e, t)=>{
    H.init(e, t), eb.init(e, t);
});
function ey(e) {
    return new ev({
        type: "number",
        checks: [],
        ...M(e)
    });
}
const ew = u("ZodMiniBoolean", (e, t)=>{
    Q.init(e, t), eb.init(e, t);
});
function ex(e) {
    return new ew({
        type: "boolean",
        ...M(e)
    });
}
const ek = u("ZodMiniNull", (e, t)=>{
    X.init(e, t), eb.init(e, t);
});
function ez(e) {
    return new ek({
        type: "null",
        ...M(e)
    });
}
const ej = u("ZodMiniUnknown", (e, t)=>{
    Y.init(e, t), eb.init(e, t);
});
function eS() {
    return new ej({
        type: "unknown"
    });
}
const e$ = u("ZodMiniNever", (e, t)=>{
    ee.init(e, t), eb.init(e, t);
});
function eC(e) {
    return new e$({
        type: "never",
        ...M(e)
    });
}
const eO = u("ZodMiniArray", (e, t)=>{
    er.init(e, t), eb.init(e, t);
});
function eM(e, t) {
    return new eO({
        type: "array",
        element: e,
        ...M(t)
    });
}
const eP = u("ZodMiniObject", (e, t)=>{
    ei.init(e, t), eb.init(e, t), w(e, "shape", ()=>t.shape);
});
function eE(e, t) {
    return new eP({
        type: "object",
        shape: e ?? {},
        ...M(t)
    });
}
const eR = u("ZodMiniUnion", (e, t)=>{
    es.init(e, t), eb.init(e, t);
});
function eA(e, t) {
    return new eR({
        type: "union",
        options: e,
        ...M(t)
    });
}
const eN = u("ZodMiniDiscriminatedUnion", (e, t)=>{
    eo.init(e, t), eb.init(e, t);
});
function eI(e, t, r) {
    return new eN({
        type: "union",
        options: t,
        discriminator: e,
        ...M(r)
    });
}
const eT = u("ZodMiniRecord", (e, t)=>{
    el.init(e, t), eb.init(e, t);
});
function eD(e, t, r) {
    return new eT({
        type: "record",
        keyType: e,
        valueType: t,
        ...M(r)
    });
}
const eL = u("ZodMiniEnum", (e, t)=>{
    ed.init(e, t), eb.init(e, t), e.options = Object.values(t.entries);
});
function eZ(e, t) {
    return new eL({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...M(t)
    });
}
const eq = u("ZodMiniLiteral", (e, t)=>{
    ec.init(e, t), eb.init(e, t);
});
function eU(e, t) {
    return new eq({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...M(t)
    });
}
const eW = u("ZodMiniOptional", (e, t)=>{
    eu.init(e, t), eb.init(e, t);
});
function eB(e) {
    return new eW({
        type: "optional",
        innerType: e
    });
}
const eV = u("ZodMiniNullable", (e, t)=>{
    e_.init(e, t), eb.init(e, t);
});
function eF(e) {
    return new eV({
        type: "nullable",
        innerType: e
    });
}
const eJ = u("ZodMiniCatch", (e, t)=>{
    ef.init(e, t), eb.init(e, t);
}), eK = u("ZodMiniLazy", (e, t)=>{
    eg.init(e, t), eb.init(e, t);
});
function eG() {
    let e = new eK({
        type: "lazy",
        getter: ()=>eA([
                em(),
                ey(),
                ex(),
                ez(),
                eM(e),
                eD(em(), e)
            ])
    });
    return e;
}
const eH = eA([
    eU("account_set_password"),
    eU("account_set_active")
]), eQ = eE({
    id: em(),
    name: em()
});
eE({
    success: ex(),
    output: eB(em()),
    error: eB(em())
});
const eX = eA([
    eU("factory"),
    eU("firmware"),
    eU("builtin")
]), eY = eE({
    detected: ex(),
    device: em(),
    has_data: ex(),
    sha256: em(),
    data: em()
}), e0 = eE({
    exists: ex(),
    path: em(),
    size: ey(),
    sha256: em(),
    data: em()
}), e1 = eE({
    source: eX,
    active_path: em(),
    size: ey(),
    sha256: em(),
    data: em(),
    factory: eY,
    firmware: e0
}), e2 = eE({
    error: em()
});
eA([
    e1,
    e2
]);
const e8 = eE({
    success: ex(),
    path: em(),
    size: ey(),
    sha256: em()
});
eA([
    e8,
    e2
]), eE({
    data: em()
});
const e5 = eE({
    acs: ex(),
    mqtt: ex(),
    npu: ex(),
    "device-hl202": ex(),
    "device-hwtc": ex(),
    "device-star": ex(),
    "device-zte": ex()
}), e4 = eE({
    optical: ex(),
    bridge_offload: ex(),
    omci_mib: ex(),
    mqtt_telemetry: ex(),
    hl202_management: ex(),
    cwmp: ex(),
    command_provisioning: ex()
}), e3 = eE({
    status: ex(),
    config: ex(),
    sync: ex(),
    hardware: ex(),
    calibration: ex(),
    hl202: ex(),
    about: ex()
}), e6 = eE({
    schema_version: eU(1),
    version: em(),
    features: e5,
    functions: e4,
    pages: e3,
    adapters: eM(eQ)
});
eA([
    eE({
        valid: ex(),
        revision: em(),
        devices: ey()
    }),
    eE({
        error: em()
    })
]);
const e7 = eA([
    eU("auto"),
    eU("manual")
]), e9 = eU("diff"), te = eE({
    id: em(),
    name: eA([
        em(),
        ez()
    ]),
    template: em()
}), tt = eE({
    enabled: ex(),
    mode: e7,
    method: e9,
    revision: em(),
    triggers: eM(em()),
    interval_minutes: ey(),
    error: eA([
        em(),
        ez()
    ]),
    devices: eM(eS()),
    management_network: eS(),
    omci_management: eS(),
    groups: eM(te),
    pending_devices: eM(em())
});
eA([
    tt,
    e2
]), eE({});
const tr = eA([
    eE({
        optical_sn: em(),
        onu_id: ey(),
        binding_generation: em()
    }),
    eE({
        mqtt_mac: em(),
        binding_generation: em()
    })
]);
eE({
    target: tr
});
const tn = eE({
    mqtt_mac: em(),
    optical_sn: eA([
        em(),
        ez()
    ]),
    onu_id: eA([
        ey(),
        ez()
    ]),
    binding_generation: em(),
    last_seen: ey(),
    reason: em()
}), ti = eE({
    optical_sn: em(),
    onu_id: ey(),
    model: em(),
    optical_online: ex(),
    can_execute: ex(),
    mqtt: eA([
        tn,
        ez()
    ]),
    report_revision: eA([
        ey(),
        ez()
    ])
});
eE({
    target: tr,
    script: em(),
    timeout_seconds: ey()
});
const ta = eE({
    code: em(),
    message: em()
});
eA([
    eE({
        schema_version: eU(1),
        devices: eM(ti),
        sources: eM(tn)
    }),
    eE({
        schema_version: ey(),
        error: ta
    })
]), eE({
    target: tr
}), eE({
    target: tr,
    kind: eH,
    entry: ey(),
    password: em(),
    active: ex()
});
const ts = eU("pending"), to = eE({
    phase: eA([
        eU("starting"),
        eU("upload"),
        eU("tables")
    ]),
    received: ey(),
    expected: eA([
        ey(),
        ez()
    ])
}), tl = eU("ready"), td = eA([
    eE({
        status: ts,
        progress: eB(to)
    }),
    eE({
        status: tl,
        chunk: ey(),
        chunks: ey(),
        bytes: ey(),
        data: em()
    })
]);
eA([
    td,
    e2
]);
const tc = eE({
    status: ts,
    job: em()
}), tp = eE({
    released: ex()
});
eE({
    job: em()
}), eE({
    job: em(),
    chunk: ey()
}), eA([
    tc,
    e2
]);
const tu = eE({
    accepting: ex(),
    running: ey(),
    stored: ey(),
    bytes: ey(),
    running_limit: ey(),
    stored_limit: ey(),
    bytes_limit: ey(),
    result_bytes_limit: ey()
});
eE({
    onu_id: ey(),
    optical_sn: em(),
    tables: ex()
});
const t_ = eA([
    eE({
        status: eU("success"),
        enabled: ex()
    }),
    eE({
        status: eU("error"),
        error: em()
    })
]);
eE({
    enabled: ex(),
    bridge: em()
});
const tf = eE({
    index: em(),
    state: em(),
    pkt_type: em(),
    orig_tuple: em(),
    new_tuple: em(),
    eth: em(),
    vlan: em(),
    packets: ey(),
    bytes: ey(),
    counters_valid: ex(),
    packets_exact: em(),
    bytes_exact: em()
}), tg = eE({
    sampled_at_ms: ey(),
    errors: eM(em()),
    config_valid: ex(),
    engine_valid: ex(),
    mask_valid: ex(),
    routed_mask_valid: ex(),
    debug_valid: ex(),
    flows_valid: ex(),
    entries_valid: ex(),
    counters_valid: ex(),
    hooks_valid: ex(),
    total_packets_exact: em(),
    total_bytes_exact: em(),
    supported: ex(),
    engine_attached: ex(),
    bridge_offload_enabled: ex(),
    bridge_offload_mask: ey(),
    routed_offload_mask: ey(),
    bridge_offload_debug: ex(),
    bridge: em(),
    active_ports: eM(em()),
    fw4_hooks_ready: ex(),
    total_entries: ey(),
    bound_entries: ey(),
    bound_ipv4_entries: ey(),
    bound_ipv6_entries: ey(),
    total_packets: ey(),
    total_bytes: ey(),
    bound_flows: eM(tf)
}), tb = eA([
    eU("plan"),
    eU("apply")
]), th = eA([
    eU("optical_on"),
    eU("optical_off"),
    eU("optical_status"),
    eU("optical_reload"),
    eU("optical_reinitialize"),
    eU("optical_shutdown")
]), tm = eA([
    eU("success"),
    eU("error")
]), tv = eA([
    eU("enabled"),
    eU("disabled"),
    eU("unknown")
]), ty = eE({
    schema_version: eU(1),
    status: tm,
    action: th,
    desired_enabled: eA([
        ex(),
        ez()
    ]),
    tx_enabled: eA([
        ex(),
        ez()
    ]),
    actor_state: tv,
    hardware_ready: ex(),
    discovery_active: ex(),
    cleanup_pending: ex(),
    error: eA([
        ta,
        ez()
    ])
});
eE({
    enabled: ex()
}), eE({
    restarting: ex()
});
const tw = eE({
    calls: ey(),
    failures: ey(),
    last_us: ey(),
    max_us: ey(),
    total_us: ey()
});
eE({
    ubus: eB(eD(em(), tw)),
    jobs: eB(tu),
    onu_pinning: eB(eS()),
    fpga_status: em(),
    provisioning: eS(),
    optical_transceiver: eS(),
    switch_ports: eM(eS()),
    sub_gateways: eM(eS()),
    telemetry_gateways: eM(eS()),
    npu: eB(eS()),
    ipc: eB(eS())
});
const tx = eA([
    eU("plan"),
    eU("apply"),
    eU("management_plan"),
    eU("management_apply"),
    eU("reset_state"),
    eU("reconcile"),
    eU("retry")
]);
eA([
    eE({
        operation_ids: eM(ey()),
        revision: em()
    }),
    eE({
        started: ex(),
        mode: tb
    }),
    eE({
        reset: ex(),
        device: em()
    }),
    eE({
        operation_ids: eM(ey()),
        mode: tb,
        reconcile: eB(ex()),
        retry: eB(ex())
    }),
    e2
]), eE({
    action: tx,
    target: em(),
    management: eB(ex()),
    item: eB(em())
});
let tk = eE({
    error: eA([
        em(),
        eE({
            code: em(),
            message: em()
        })
    ])
});
class tz extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function tj(e) {
    let t = tk.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new tz("rpc", e) : new tz(e.code, e.message);
    }
    return e;
}
let tS = em(), t$ = ey(), tC = ex();
eE({
    optical_sn: tS,
    onu_id: t$,
    binding_generation: tS
}), eE({
    mqtt_mac: tS,
    binding_generation: tS
});
let tO = eE({
    mqtt_mac: tS,
    optical_sn: eF(tS),
    onu_id: eF(t$),
    binding_generation: tS,
    last_seen: t$,
    reason: tS
}), tM = {
    target: tS,
    request_id: eB(tS),
    output: eB(tS),
    output_truncated: tC,
    error: eB(tS)
};
const tP = eI("status", [
    eE({
        ...tM,
        status: eU("executed"),
        exit_code: eF(t$)
    }),
    eE({
        ...tM,
        status: eU("dispatched"),
        exit_code: eB(eC())
    }),
    eE({
        ...tM,
        status: eU("timeout"),
        exit_code: eB(eC())
    }),
    eE({
        ...tM,
        status: eU("error"),
        exit_code: eB(eC())
    })
]);
let tE = eE({
    target: tO,
    result: tP,
    binding_current: tC
}), tR = eE({
    schema_version: t$,
    compressed_bytes: t$,
    decompressed_bytes: t$,
    fields: eD(tS, eE({
        value: eG(),
        member: tS,
        unit: eF(tS)
    })),
    members: eM(eE({
        name: tS,
        bytes: t$,
        encoding: tS,
        text: eF(tS),
        text_omitted: tC
    })),
    errors: eM(tS)
}), tA = eE({
    revision: t$,
    last_received: t$,
    last_processed_receipt: eF(t$),
    last_good: eF(t$),
    error: eF(tS),
    report: eF(tR)
}), tN = {
    schema_version: eU(1),
    target: tO,
    report: eF(tA)
};
eA([
    eE({
        ...tN,
        state: eZ([
            "received",
            "report_unavailable"
        ])
    }),
    eE({
        ...tN,
        read_only: eU(!0)
    })
]);
const tI = eE({
    schema_version: eU(1),
    devices: eM(eE({
        optical_sn: tS,
        onu_id: t$,
        model: tS,
        optical_online: tC,
        can_execute: tC,
        mqtt: eF(tO),
        report_revision: eF(t$)
    })),
    sources: eM(tO)
});
eE({
    schema_version: eU(1),
    operation: tE,
    accounts: eF(eM(eE({
        entry: eA([
            eU(0),
            eU(1),
            eU(2)
        ]),
        username: tS,
        active: tC
    }))),
    write_status: eZ([
        "not_applicable",
        "accepted_and_saved",
        "unconfirmed"
    ])
}), eE({
    schema_version: eU(1),
    operation: tE
});
let tT = em(), tD = ey(), tL = ex(), tZ = eB(tT), tq = eB(tD), tU = eB(tL);
const tW = eZ([
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
]), tB = eZ([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), tV = eE({
    id: tT,
    name: eB(eF(tT)),
    kind: eZ([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: tT,
    state: tT,
    reason: tZ,
    revision: tZ,
    current_revision: tU,
    management_fresh: tU,
    operation_id: tq,
    task_id: eB(eF(tD)),
    updated_at: tq,
    changes: eB(eM(eE({
        name: tT,
        desired: tT
    })))
});
let tF = eE({
    state: tT,
    reason: tZ,
    task_id: eB(eF(tD)),
    instance: tq
});
const tJ = eE({
    cwmp_id: tT,
    state: eZ([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: tL,
    last_inform: eF(tD),
    age_seconds: eF(tD)
});
let tK = eE({
    state: eZ([
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
    mqtt_target: eF(tT),
    binding_source: tZ,
    link_identity_error: eF(tT),
    mqtt_last_seen: eF(tD),
    cwmp_id: tZ,
    desired_version: tZ,
    generation: tq,
    inflight: tU,
    attempts: tq,
    next_retry_at: tq,
    updated_at: tq,
    settings_verified_at: eF(tD),
    last_inform: eF(tD),
    last_error: eB(eF(tT)),
    persistence_error: eB(eF(tT)),
    desired: eB(eF(eE({
        vlan: tD,
        vlans: eM(tD),
        priority: tD,
        acs_url: tT
    }))),
    listener: eB(eE({
        enabled: tL,
        listen: tT,
        path: tT,
        error: eF(tT)
    })),
    endpoint_notice: tZ,
    manual_steps: eB(eM(tT))
});
const tG = eI("state", [
    tK,
    function(e, t) {
        if (!S(t)) throw Error("Invalid input to extend: expected a plain object");
        let r = e._zod.def.checks;
        if (r && r.length > 0) {
            let r = e._zod.def.shape;
            for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(r, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let n = k(e._zod.def, {
            get shape () {
                let r = {
                    ...e._zod.def.shape,
                    ...t
                };
                return x(this, "shape", r), r;
            }
        });
        return O(e, n);
    }(function(e) {
        var t = void 0;
        let r = e._zod.def.checks;
        if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let n = k(e._zod.def, {
            get shape () {
                let r = e._zod.def.shape, n = {
                    ...r
                };
                if (t) for(let e in t){
                    if (!(e in r)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (n[e] = eW ? new eW({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)n[e] = eW ? new eW({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return x(this, "shape", n), n;
            },
            checks: []
        });
        return O(e, n);
    }(tK), {
        state: eZ([
            "pending",
            "unavailable"
        ]),
        reason: tT
    })
]), tH = eE({
    backend: eB(eE({
        configured: tT,
        effective: tT,
        available: eM(tT),
        reason: tT
    })),
    state: tW,
    operation_id: tq,
    device: tZ,
    optical_sn: tZ,
    cwmp_id: tZ,
    revision: tZ,
    mode: eB(eZ([
        "apply",
        "plan"
    ])),
    started_at: tq,
    current_revision: tU,
    management_fresh: tU,
    reason: tZ,
    error: tZ,
    attempts: tq,
    next_retry_at: tq,
    reconcile_reason: tZ,
    items: eM(tV),
    cwmp_contract: eB(eE({
        state: tT,
        requested: tT,
        contract: eF(tT),
        reason: tT,
        cache_hit: tL,
        schema: tT,
        capabilities: eF(eE({
            wan: tT,
            wlan: tT,
            binding: tT
        }))
    })),
    wan_objects: eB(eD(tT, eG())),
    wan_lifecycle: eB(eD(tT, tF)),
    wan_stage: eB(eZ([
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
    wifi_objects: eB(eE({
        owned: eM(tD),
        pending: eF(tT),
        pending_instance: eF(tD)
    })),
    wifi_lifecycle: eB(eD(tT, tF)),
    wifi_stage: eB(eZ([
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
    wifi_cleanup: eB(eZ([
        "disable",
        "preserve",
        "delete"
    ]))
});
let tQ = eE({
    enabled: tL,
    mode: eZ([
        "auto",
        "manual"
    ]),
    vlan: eM(tD),
    priority: tD,
    address: tT,
    acs_url: tT,
    port: tD,
    path: tT,
    dhcp_enabled: tL
}), tX = eE({
    state: eZ([
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
    error: eF(tT),
    inflight: tL,
    ready: tL,
    desired_version: eF(tT),
    applied_version: eF(tT),
    next_retry_at: tD,
    attempts: tD,
    desired: eF(tQ),
    applied: eF(tQ),
    previous: eF(tQ),
    plan: eM(eE({
        operation: tT,
        key: tT,
        value: eM(tT)
    }))
});
const tY = eE({
    device: tT,
    name: eF(tT),
    group: eF(tT),
    group_name: eF(tT),
    template: eF(tT),
    template_name: eF(tT),
    optical_sn: tT,
    adapter: tT,
    omci_management: eE({
        state: tT,
        reason: eB(eF(tT))
    }),
    management: eF(tJ),
    acs_bootstrap: tG,
    provisioning: tH,
    services: eM(tV),
    ssids: eM(tV),
    wifi_sync: tB
}), t0 = eE({
    enabled: tL,
    mode: eZ([
        "auto",
        "manual"
    ]),
    method: eU("diff"),
    revision: tT,
    triggers: eM(tT),
    interval_minutes: new ev({
        type: "number",
        coerce: !0,
        checks: [],
        ...M(void 0)
    }),
    error: eF(tT),
    devices: eM(tY),
    management_network: tX,
    omci_management: eG(),
    groups: eM(eE({
        id: tT,
        name: eF(tT),
        template: tT
    })),
    pending_devices: eM(tT)
}), t1 = eA([
    eE({
        valid: eU(!0),
        revision: tT,
        devices: tD,
        error: eB(eC())
    }),
    eE({
        error: tT,
        valid: eB(eC()),
        revision: eB(eC()),
        devices: eB(eC())
    })
]), t2 = eE({
    restarting: eU(!0)
}), t8 = eA([
    eE({
        operation_ids: eM(tD),
        revision: tT
    }),
    eE({
        started: eU(!0),
        mode: eZ([
            "apply",
            "plan"
        ])
    }),
    eE({
        reset: eU(!0),
        device: tT
    }),
    eE({
        operation_ids: eM(tD),
        mode: eZ([
            "apply",
            "plan"
        ]),
        reconcile: tU,
        retry: tU
    })
]);
let t5 = em(), t4 = ey(), t3 = eF(t4), t6 = eD(t5, eE({
    source: t5,
    unit: t5,
    reason: eF(t5),
    raw: eF(t5),
    age_seconds: t3
}));
const t7 = eE({
    phase: eZ([
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
    generation: t4,
    error: eF(t5)
}), t9 = eZ([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let re = eE({
    model: t5,
    wavelength_tx_nm: t4,
    wavelength_rx_nm: t4,
    phy_rate_downlink_gbps: t4,
    phy_rate_uplink_gbps: t4,
    tx_power_dbm: t3,
    laser_bias_current_ma: t3,
    temperature_celsius: t3,
    vcc_voltage: t3,
    cdr_locked: eF(ex()),
    tx_enabled: eF(ex()),
    measurements: t6
}), rt = eE({
    equipment_id: eF(t5),
    hardware_version: eF(t5),
    software_images: eM(t5),
    omcc_version: t3,
    errors: eM(t5)
});
const rr = eE({
    onu_id: t4,
    vendor: t5,
    model: t5,
    serial_number: t5,
    state: t9,
    business_status: t7,
    management: eF(tJ),
    provisioning: eF(tH),
    services: eM(tV),
    ssids: eM(tV),
    wifi_sync: tB,
    acs_bootstrap: eB(tG),
    identity: eF(rt),
    identity_age_seconds: t3,
    identity_current: ex(),
    fiber_distance_m: t3,
    ranging_delay_rtd_ns: t3,
    equalization_delay_bits: new eJ({
        type: "catch",
        innerType: t3,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: t3,
    optical_tx_power_dbm: t3,
    firmware_version: t5,
    hardware_version: t5,
    uptime_seconds: t3,
    data_path: eE({
        interface: t5,
        gem_ports: eF(eM(t4)),
        vlan_id: t3,
        tx_bytes: t3,
        rx_bytes: t3,
        current_tx_kbps: t3,
        current_rx_kbps: t3,
        offload: eB(eE({
            enabled: eB(eF(ex())),
            routed_enabled: eB(eF(ex())),
            bridge_enabled: eB(eF(ex())),
            engine_attached: eB(eF(ex())),
            forwarding_verified: eB(eF(ex()))
        })),
        measurements: t6
    }),
    wifi_mesh: eE({
        channel_2g: t3,
        channel_5g: t3,
        bandwidth_5g: eF(t5),
        tx_power_pct: t3,
        measurements: t6
    }),
    connected_clients: eF(eM(eE({
        mac: t5,
        ip: t5,
        band: t5,
        rssi_dbm: t3,
        rx_rate_mbps: t3,
        tx_rate_mbps: t3
    }))),
    measurements: t6
});
let rn = eE({
    reserved_sn: eB(t5),
    port: t4,
    interface: t5,
    carrier: ex(),
    status: t5,
    onu_id: eB(t4),
    onu_sn: eB(t5),
    link_state: t5
});
const ri = eE({
    counters_valid: eB(ex()),
    packets_exact: eB(t5),
    bytes_exact: eB(t5),
    index: t5,
    state: t5,
    pkt_type: t5,
    orig_tuple: t5,
    new_tuple: t5,
    eth: t5,
    vlan: t5,
    packets: t4,
    bytes: t4
}), ra = eE({
    sampled_at_ms: eB(t4),
    errors: eB(eM(t5)),
    config_valid: eB(ex()),
    engine_valid: eB(ex()),
    mask_valid: eB(ex()),
    routed_mask_valid: eB(ex()),
    debug_valid: eB(ex()),
    flows_valid: eB(ex()),
    entries_valid: eB(ex()),
    counters_valid: eB(ex()),
    hooks_valid: eB(ex()),
    total_packets_exact: eB(t5),
    total_bytes_exact: eB(t5),
    supported: ex(),
    engine_attached: ex(),
    bridge_offload_enabled: ex(),
    bridge_offload_mask: t4,
    routed_offload_mask: t4,
    bridge_offload_debug: ex(),
    bridge: t5,
    active_ports: eM(t5),
    fw4_hooks_ready: ex(),
    total_entries: t4,
    bound_entries: t4,
    total_packets: t4,
    total_bytes: t4,
    bound_flows: eM(ri)
}), rs = eE({
    ubus: eB(eD(t5, tw)),
    jobs: eB(tu),
    onu_pinning: eB(eE({
        desired: eD(t5, t4),
        active: eD(t5, t4),
        pending_restart: ex(),
        allocation_blocked: ex(),
        startup_error: eF(t5),
        config_error: eF(t5)
    })),
    fpga_status: t5,
    provisioning: eF(t0),
    optical_transceiver: re,
    switch_ports: eM(rn),
    sub_gateways: eM(rr),
    telemetry_gateways: eM(eE({
        id: t5,
        last_seen_sec_ago: t4,
        last_payload_bytes: t4
    })),
    npu: eB(eF(ra))
});
eD(t5, eE({
    carrier: eB(ex()),
    mac: eB(t5),
    link: eB(eE({
        speed: eB(t4),
        duplex: eB(t5),
        autoneg: eB(ex())
    })),
    stats: eB(eD(t5, t4))
}));
const ro = {
    getCapabilities: {
        parse: (e)=>e6.parse(tj(e))
    },
    opticalStatus: ty,
    opticalSet: ty,
    getStatus: {
        parse: (e)=>rs.parse(tj(e))
    },
    getSync: {
        parse: (e)=>t0.parse(tj(e))
    },
    configCheck: t1,
    npuStatus: tg,
    configReload: {
        parse: (e)=>t0.parse(tj(e))
    },
    restartService: {
        parse: (e)=>t2.parse(tj(e))
    },
    sync: {
        parse: (e)=>t8.parse(tj(e))
    },
    npuSet: t_,
    mibStart: {
        parse: (e)=>tc.parse(tj(e))
    },
    mibResult: {
        parse: (e)=>td.parse(tj(e))
    },
    jobRelease: {
        parse: (e)=>tp.parse(tj(e))
    },
    hl202List: {
        parse: (e)=>tI.parse(tj(e))
    },
    hl202Report: {
        parse: (e)=>tc.parse(tj(e))
    },
    hl202AccountsStart: {
        parse: (e)=>tc.parse(tj(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>tc.parse(tj(e))
    },
    hl202ExecStart: {
        parse: (e)=>tc.parse(tj(e))
    },
    jobResult: {
        parse: (e)=>td.parse(tj(e))
    },
    getCalibration: {
        parse: (e)=>e1.parse(tj(e))
    },
    saveCalibration: {
        parse: (e)=>e8.parse(tj(e))
    },
    applyCalibration: {
        parse: (e)=>tc.parse(tj(e))
    }
};
function rl() {
    var e;
    let r, n, i, a, s, o, l, d, c, p, u, f, g, b, h, m, v, y, w, x, k, z, j;
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
    }), g = e.declare({
        object: "fttr",
        method: "mib_result",
        params: [
            "job",
            "chunk"
        ],
        reject: !0
    }), b = e.declare({
        object: "fttr",
        method: "job_release",
        params: [
            "job"
        ],
        reject: !0
    }), h = e.declare({
        object: "fttr",
        method: "hl202_list",
        reject: !0
    }), m = e.declare({
        object: "fttr",
        method: "hl202_report",
        params: [
            "target"
        ],
        reject: !0
    }), v = e.declare({
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
    }), x = e.declare({
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
    }), z = e.declare({
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
        getCapabilities: async ()=>ro.getCapabilities.parse(await r()),
        opticalStatus: async ()=>ro.opticalStatus.parse(await n()),
        opticalSet: async (e)=>ro.opticalSet.parse(await i(e.enabled)),
        getStatus: async ()=>ro.getStatus.parse(await a()),
        getSync: async ()=>ro.getSync.parse(await s()),
        configCheck: async ()=>ro.configCheck.parse(await o()),
        npuStatus: async ()=>ro.npuStatus.parse(await l()),
        configReload: async ()=>ro.configReload.parse(await d()),
        restartService: async ()=>ro.restartService.parse(await c()),
        sync: async (e)=>ro.sync.parse(await p(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>ro.npuSet.parse(await u(e.enabled, e.bridge)),
        mibStart: async (e)=>ro.mibStart.parse(await f(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>ro.mibResult.parse(await g(e.job, e.chunk)),
        jobRelease: async (e)=>ro.jobRelease.parse(await b(e.job)),
        hl202List: async ()=>ro.hl202List.parse(await h()),
        hl202Report: async (e)=>ro.hl202Report.parse(await m(e.target)),
        hl202AccountsStart: async (e)=>ro.hl202AccountsStart.parse(await v(e.target)),
        hl202AccountUpdate: async (e)=>ro.hl202AccountUpdate.parse(await y(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>ro.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>ro.jobResult.parse(await x(e.job, e.chunk)),
        getCalibration: async ()=>ro.getCalibration.parse(await k()),
        saveCalibration: async (e)=>ro.saveCalibration.parse(await z(e.data)),
        applyCalibration: async ()=>ro.applyCalibration.parse(await j())
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
const rd = async ()=>rl().getStatus(), rc = async ()=>rl().getSync(), rp = async ()=>rl().configCheck(), ru = async (e, t)=>rl().sync({
        action: e,
        target: t
    });
let r_ = em(), rf = ey(), rg = ex(), rb = eE({
    id: r_,
    url: r_
}), rh = eE({
    name: r_,
    kind: eZ([
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
    index: rf,
    mask: rf,
    size: rf,
    read: rg,
    write: rg,
    set_by_create: rg,
    avc: rg,
    optional: rg,
    deprecated: rg,
    default_hex: eF(r_),
    reference: rb
}), rm = eI("type", [
    eE({
        type: eU("unsigned"),
        value: rf
    }),
    eE({
        type: eU("signed"),
        value: rf
    }),
    eE({
        type: eU("decimal"),
        value: r_
    }),
    eE({
        type: eU("text"),
        value: eF(r_)
    }),
    eE({
        type: eU("octets"),
        hex: r_
    }),
    eE({
        type: eU("table_length"),
        bytes: rf
    })
]), rv = eE({
    code: r_,
    message: r_,
    offset: rf,
    mask: rf
}), ry = eZ([
    "layout",
    "name_only",
    "unknown"
]), rw = eE({
    raw_hex: r_,
    filter_outer_priority: rf,
    filter_outer_vid: rf,
    filter_outer_tpid_dei: rf,
    filter_inner_priority: rf,
    filter_inner_vid: rf,
    filter_inner_tpid_dei: rf,
    filter_ethertype: rf,
    tags_to_remove: rf,
    treatment_outer_priority: rf,
    treatment_outer_vid: rf,
    treatment_outer_tpid_dei: rf,
    treatment_inner_priority: rf,
    treatment_inner_vid: rf,
    treatment_inner_tpid_dei: rf,
    delete_entry: rg
}), rx = eE({
    schema_version: eU(1),
    reference_version: r_,
    onu_id: eF(rf),
    uploaded_complete: rg,
    expected_records: rf,
    received_records: rf,
    decoded_records: rf,
    partial_records: rf,
    basic_records: rf,
    tables_requested: rg,
    tables_collected: rg,
    classes: eM(eE({
        class_id: rf,
        name: eF(r_),
        entities: rf,
        records: rf,
        support: ry
    })),
    entities: eM(eE({
        class_id: rf,
        entity_id: rf,
        name: eF(r_),
        support: ry,
        reference: eF(rb),
        sequences: eM(rf),
        attributes: eM(eE({
            definition: rh,
            value: eF(rm),
            observations: eM(eE({
                raw_hex: r_,
                value: rm,
                sequences: eM(rf)
            }))
        })),
        diagnostics: eM(rv)
    })),
    records: eM(eE({
        class_id: rf,
        entity_id: rf,
        sequence: rf,
        attribute_mask: rf,
        raw_hex: r_,
        consumed: rf,
        remaining_hex: r_,
        undecoded_mask: rf
    })),
    tables: eM(eE({
        class_id: rf,
        entity_id: rf,
        attribute: rh,
        collected: rg,
        error: eF(r_),
        raw_hex: r_,
        rows: eM(r_),
        vlan_rules: eM(rw)
    })),
    diagnostics: eM(rv)
});
const rk = eE({
    status: eU("ready"),
    report: rx
}), rz = async (e, t, r)=>rl().mibStart({
        onu_id: e,
        optical_sn: t,
        tables: r
    }), rj = async (e, t)=>rl().mibResult({
        job: e,
        chunk: t
    }), rS = async (e)=>rl().jobRelease({
        job: e
    });
function r$(e) {
    let t = "none" === e.tone ? "" : `fttr-badge fttr-badge-${e.tone}`, r = e.class ? ` ${e.class}` : "", n = o("span", {
        class: `${t}${r}`.trim(),
        children: e.children
    });
    return e.title && n.setAttribute("title", e.title), n;
}
const rC = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
};
function rO(e) {
    var t;
    let r = (t = e.state) ? "o5_operation" === t ? {
        tone: "success",
        label: rC.o5_operation,
        title: t
    } : {
        tone: "warning",
        label: rC[t] ?? l(t),
        title: t
    } : {
        tone: "none",
        label: "\u2014"
    };
    return o(r$, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
function rM(e) {
    var t;
    let r = (t = e.status) ? {
        tone: "verified" === t.phase ? "success" : t.error || "wan_bootstrap_pending" === t.phase ? "warning" : "neutral",
        label: `${({
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
        })[t.phase]} \xb7 ${t.generation}${t.error ? ` \xb7 ${t.error}` : ""}`,
        title: t.error || void 0
    } : {
        tone: "neutral",
        label: "\u2014"
    };
    return o(r$, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const rP = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
};
function rE(e) {
    var t;
    let r, n, i, a, s, d, c = (t = e.management, r = t?.state, n = p(t?.age_seconds ?? (t?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - t.last_inform) : null)), a = (i = t?.last_inform ? new Date(1000 * t.last_inform).toLocaleString() : null) ? _("Last Inform: %s").replace("%s", i) : void 0, s = "\u2014", d = "none", "online" === r ? (d = "success", s = rP.online) : "waiting_inform" === r ? (d = "warning", s = rP.waiting_inform) : "offline_or_stale" === r ? (d = "danger", s = rP.offline_or_stale) : r && (d = "neutral", s = l(r)), {
        tone: d,
        label: n && r ? `${s} \xb7 ${n}` : s,
        title: a
    });
    return o(r$, {
        tone: c.tone,
        title: c.title,
        children: c.label
    });
}
const rR = {
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
function rA(e) {
    var t, r;
    let n, i, a, s = (t = e.provisioning, r = e.title, n = t?.state, i = t?.next_retry_at && t.next_retry_at > Math.floor(Date.now() / 1000) ? t.next_retry_at - Math.floor(Date.now() / 1000) : 0, a = r ?? (t?.current_revision === !1 ? _("Previous configuration") : t?.management_fresh === !1 ? _("Management stale") : t?.reconcile_reason ? t.reconcile_reason : i > 0 ? _("Next self-healing retry in %d seconds").replace("%d", String(i)) : t?.reason ?? t?.error), n && "not_started" !== n ? "completed" === n || "verified" === n ? {
        tone: "success",
        label: "completed" === n ? rR.completed : _("Ready"),
        title: a
    } : "wan_reconciling" === n || "wan_verifying" === n || "wifi_reconciling" === n || "discovering" === n || "reading" === n || "disabling" === n || "disabling_read" === n || "writing" === n || "verifying" === n || "settling" === n || "recovering" === n || "waiting_task" === n ? {
        tone: "info",
        label: rR[n] ?? l(n),
        title: a
    } : "interrupted" === n || "failed" === n || "error" === n || "blocked" === n ? {
        tone: "danger",
        label: "blocked" === n ? rR.blocked : rR.interrupted,
        title: a
    } : "waiting" === n || "pending" === n || "waiting_management" === n || "reset_pending" === n ? {
        tone: "warning",
        label: rR[n] ?? rR.waiting,
        title: a
    } : {
        tone: "neutral",
        label: l(n),
        title: a
    } : {
        tone: "neutral",
        label: rR.not_started,
        title: a
    });
    return o(r$, {
        tone: s.tone,
        title: s.title,
        children: s.label
    });
}
const rN = {
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
function rI(e) {
    var t;
    let r = (t = e.state) && "not_configured" !== t ? "verified" === t ? {
        tone: "success",
        label: rN.verified
    } : "attention_required" === t ? {
        tone: "danger",
        label: rN.attention_required
    } : "stale_revision" === t || "stale_management" === t || "waiting_management" === t ? {
        tone: "warning",
        label: rN[t]
    } : "recovering" === t ? {
        tone: "info",
        label: rN.recovering
    } : "accepted_unverified" === t || "pending" === t ? {
        tone: "warning",
        label: rN[t]
    } : {
        tone: "neutral",
        label: l(t)
    } : {
        tone: "neutral",
        label: rN.not_configured
    };
    return o(r$, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const rT = `
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
let rD = (e)=>JSON.stringify(e, null, 2);
async function rL(e) {
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
function rZ(e) {
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
const rq = async ()=>rl().getCapabilities();
async function rU(e) {
    if (!(await rq()).pages[e]) throw Error(_("This page is not supported by the installed FTTR build."));
}
let rW = {
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
};
function rB(e, t) {
    if (!e) return o("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: "\u2014"
    });
    let r = rW[e], n = r?.label || l(e), i = r?.type || "neutral";
    return o("span", {
        class: `fttr-badge fttr-badge-${i}`,
        title: t || e,
        children: n
    });
}
function rV(e) {
    var t, r, n, i, a, s;
    return s = {
        class: "table-wrapper",
        children: (a = {
            class: "table",
            children: [
                (r = {
                    children: (t = {
                        children: [
                            o("th", {
                                children: _("Configuration item")
                            }),
                            o("th", {
                                children: _("Type")
                            }),
                            o("th", {
                                children: _("State")
                            }),
                            o("th", {
                                children: _("Evidence freshness")
                            }),
                            o("th", {
                                children: _("Last update / task")
                            }),
                            o("th", {
                                children: _("Reason / desired changes")
                            })
                        ]
                    }, o("tr", t))
                }, o("thead", r)),
                (i = {
                    children: e.length ? e.map((e)=>{
                        var t, r, n, i, a, s, c, p, u, f;
                        return f = {
                            children: [
                                (n = {
                                    children: o("strong", {
                                        children: l(e.name || e.id)
                                    })
                                }, o("td", n)),
                                (i = {
                                    children: o("span", {
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
                                                    return "port_binding" === t ? _("Binding") : l(e || t);
                                            }
                                        }(e.service_type ?? "", e.kind)
                                    })
                                }, o("td", i)),
                                o("td", {
                                    children: rB(e.state)
                                }),
                                (s = {
                                    children: (t = e.current_revision, r = e.management_fresh, a = {
                                        style: "display:flex;flex-direction:column;gap:3px;align-items:flex-start",
                                        children: [
                                            !0 === t ? o("span", {
                                                class: "fttr-badge fttr-badge-info",
                                                style: "font-size:78%",
                                                children: _("Current configuration")
                                            }) : !1 === t ? o("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                style: "font-size:78%",
                                                children: _("Previous configuration")
                                            }) : o("span", {
                                                children: "\u2014"
                                            }),
                                            !0 === r ? o("span", {
                                                class: "fttr-badge fttr-badge-success",
                                                style: "font-size:78%",
                                                children: _("Management fresh")
                                            }) : !1 === r ? o("span", {
                                                class: "fttr-badge fttr-badge-warning",
                                                style: "font-size:78%",
                                                children: _("Management stale")
                                            }) : null
                                        ]
                                    }, o("div", a))
                                }, o("td", s)),
                                (c = {
                                    children: [
                                        o("div", {
                                            children: d(e.updated_at)
                                        }),
                                        void 0 !== e.task_id && null !== e.task_id ? o("span", {
                                            class: "fttr-badge fttr-badge-neutral",
                                            style: "font-size:75%;margin-top:2px",
                                            children: [
                                                _("Task"),
                                                " #",
                                                e.task_id
                                            ]
                                        }) : null
                                    ]
                                }, o("td", c)),
                                (u = {
                                    children: [
                                        e.reason ? o("div", {
                                            style: "margin-bottom:3px;color:#555;overflow-wrap:anywhere",
                                            children: e.reason
                                        }) : null,
                                        (e.changes ?? []).length ? (p = {
                                            style: "font-size:85%",
                                            children: (e.changes ?? []).map((e)=>{
                                                var t;
                                                return t = {
                                                    style: "overflow-wrap:anywhere;margin-top:2px",
                                                    children: [
                                                        o("code", {
                                                            children: e.name
                                                        }),
                                                        " = ",
                                                        o("code", {
                                                            children: e.desired
                                                        })
                                                    ]
                                                }, o("div", t);
                                            })
                                        }, o("div", p)) : !e.reason && "\u2014"
                                    ]
                                }, o("td", u))
                            ]
                        }, o("tr", f);
                    }) : (n = {
                        children: o("td", {
                            colSpan: 6,
                            style: "text-align:center;color:#888;padding:1em",
                            children: _("No desired items configured.")
                        })
                    }, o("tr", n))
                }, o("tbody", i))
            ]
        }, o("table", a))
    }, o("div", s);
}
let main = L.view.extend({
    load: async ()=>(await rU("sync"), Promise.all([
            rc(),
            rp()
        ])),
    render (e) {
        var t, r, n, i, a, u;
        let [f, g] = e, b = o("div", {}), h = o("p", {
            class: "alert-message warning",
            hidden: !0,
            "aria-live": "polite"
        }), m = o("div", {
            class: "fttr-sync-result",
            "aria-live": "polite",
            style: "margin:10px 0"
        }), v = (t = {
            class: "cbi-input-select",
            children: [
                o("option", {
                    value: "all",
                    children: _("All devices")
                }),
                (f.devices ?? []).map((e)=>o("option", {
                        value: e.device,
                        children: e.name || e.device
                    }))
            ]
        }, o("select", t)), y = o("div", {}), w = o("div", {}), x = f, k = g, z = !1, j = !1, S = [], $ = async (e)=>{
            if (!z) {
                z = !0, U(x);
                try {
                    var t;
                    await ru("reset_state", e.device), m.replaceChildren((t = {
                        class: "alert-message info",
                        children: _("Synchronization state reset for %s. Preview differences to read the current device state.").replace("%s", e.name || e.optical_sn)
                    }, o("div", t))), U(await rc());
                } catch (e) {
                    m.replaceChildren(o("div", {
                        class: "alert-message danger",
                        children: String(e)
                    }));
                } finally{
                    z = !1, U(x);
                }
            }
        }, C = async (e)=>{
            if (!z) {
                z = !0, U(x);
                try {
                    var t;
                    let r = await ru("apply", e.device), n = "operation_ids" in r ? r.operation_ids.join(", ") : "\u2014";
                    m.replaceChildren((t = {
                        class: "alert-message info",
                        children: _("Configuration delivery started for %s. Operation IDs: %s").replace("%s", e.name || e.optical_sn).replace("%s", n || "\u2014")
                    }, o("div", t))), U(await rc());
                } catch (e) {
                    m.replaceChildren(o("div", {
                        class: "alert-message danger",
                        children: String(e)
                    }));
                } finally{
                    z = !1, U(x);
                }
            }
        }, O = async (e)=>{
            try {
                let t = (await rd()).sub_gateways.find((t)=>t.serial_number === e.optical_sn);
                if (!t) throw Error(_("Device is offline or no longer registered; refresh status and retry."));
                !function(e) {
                    var t, r, n, i, a, d, p, u, f, g, b, h;
                    let m = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "basic", v = !1, y = !1, w = null, x = null, k = (t = {
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
                                        o("code", {
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
                                        e.identity?.omcc_version == null ? null : o("code", {
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
                                        o(rO, {
                                            state: e.state
                                        })
                                    ],
                                    [
                                        _("Business"),
                                        o(rM, {
                                            status: e.business_status
                                        })
                                    ],
                                    [
                                        _("Receive optical power"),
                                        c(e.optical_rx_power_dbm)
                                    ],
                                    [
                                        _("Transmit optical power"),
                                        c(e.optical_tx_power_dbm)
                                    ],
                                    [
                                        _("Equalization delay (EQD)"),
                                        null == e.equalization_delay_bits ? "\u2014" : o("code", {
                                            style: "font-size:90%",
                                            children: [
                                                e.equalization_delay_bits,
                                                " bits"
                                            ]
                                        })
                                    ],
                                    [
                                        _("Data interface"),
                                        e.data_path?.interface ? o("code", {
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
                                        o(rE, {
                                            management: e.management
                                        })
                                    ],
                                    [
                                        _("Last Inform"),
                                        e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
                                    ],
                                    [
                                        _("Provisioning"),
                                        o(rA, {
                                            provisioning: e.provisioning
                                        })
                                    ],
                                    [
                                        _("Wi-Fi sync"),
                                        o(rI, {
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
                                    o("h3", {
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
                                                        o("th", {
                                                            style: "width:35%",
                                                            children: r
                                                        }),
                                                        o("td", {
                                                            children: n instanceof Node ? n : l(n)
                                                        })
                                                    ]
                                                }, o("tr", t);
                                            })
                                        }, o("tbody", t))
                                    }, o("table", r))
                                ]
                            }, o("div", n);
                        })
                    }, o("div", t)), z = (r = {
                        class: "mib-status-bar",
                        role: "status",
                        children: o("span", {
                            class: "mib-hint-text",
                            children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                        })
                    }, o("div", r)), j = (n = {
                        class: "cbi-progressbar",
                        style: "display:none;width:100%",
                        title: "0%",
                        children: o("div", {
                            style: "width:0%"
                        })
                    }, o("div", n)), S = o("div", {}), $ = o("pre", {
                        class: "onu-raw-pre"
                    }), C = o("span", {
                        class: "download-status",
                        role: "status"
                    }), O = null, M = o("button", {
                        type: "button",
                        class: "cbi-button cbi-button-action",
                        disabled: !0,
                        onclick: async ()=>{
                            if (w && !v) {
                                M.disabled = !0, C.textContent = _("Preparing JSON download\u2026");
                                try {
                                    let t = await rL(w);
                                    if (v) return;
                                    O && URL.revokeObjectURL(O), O = URL.createObjectURL(t);
                                    let r = document.createElement("a");
                                    r.href = O, r.download = `mib-${e.serial_number}.json`, r.click(), C.textContent = _("JSON download started"), window.setTimeout(()=>{
                                        URL.revokeObjectURL(r.href), O === r.href && (O = null);
                                    }, 1000);
                                } catch (e) {
                                    C.textContent = String(e);
                                } finally{
                                    M.disabled = !w || v;
                                }
                            }
                        },
                        children: _("Download JSON")
                    }), P = (a = {
                        class: "onu-raw-panel",
                        children: [
                            (i = {
                                class: "onu-raw-toolbar",
                                children: [
                                    o("span", {
                                        class: "onu-raw-hint",
                                        children: _("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")
                                    }),
                                    o("div", {
                                        class: "onu-raw-actions",
                                        children: [
                                            M,
                                            C
                                        ]
                                    })
                                ]
                            }, o("div", i)),
                            $
                        ]
                    }, o("div", a)), R = o("button", {
                        type: "button",
                        class: "cbi-button cbi-button-apply",
                        onclick: ()=>W(!1),
                        children: _("Read MIB")
                    }), A = o("button", {
                        type: "button",
                        class: "cbi-button cbi-button-action",
                        onclick: ()=>W(!0),
                        children: _("Read MIB and VLAN tables")
                    }), N = (u = {
                        class: "onu-mib-panel",
                        children: [
                            (p = {
                                class: "mib-controls",
                                children: [
                                    (d = {
                                        class: "mib-action-group",
                                        children: [
                                            R,
                                            A,
                                            o("small", {
                                                class: "mib-action-hint",
                                                children: _("Collecting VLAN tables queries extended filter tables and takes longer.")
                                            })
                                        ]
                                    }, o("div", d)),
                                    z,
                                    j
                                ]
                            }, o("div", p)),
                            S
                        ]
                    }, o("div", u)), I = {
                        basic: k,
                        mib: N,
                        raw: P
                    }, T = new Map();
                    function D(e) {
                        for (let [t, r] of Object.entries(I))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                        for (let [t, r] of T)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
                    }
                    let Z = (f = {
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
                                class: e.id === m ? "cbi-tab" : "cbi-tab-disabled",
                                "data-tab": e.id,
                                children: o("a", {
                                    href: `#tab-${e.id}`,
                                    onclick: (t)=>{
                                        t.preventDefault(), D(e.id);
                                    },
                                    children: e.label
                                })
                            }, o("li", t));
                            return T.set(e.id, r), r;
                        })
                    }, o("ul", f)), q = (h = {
                        children: [
                            o("div", {
                                class: "onu-details-header",
                                children: Z
                            }),
                            (g = {
                                class: "onu-details-dialog",
                                children: [
                                    o("style", {
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
				${rT}
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
                                    k,
                                    N,
                                    P
                                ]
                            }, o("div", g)),
                            (b = {
                                class: "right onu-details-footer",
                                children: o("button", {
                                    type: "button",
                                    class: "cbi-button",
                                    onclick: ()=>{
                                        v = !0, O && URL.revokeObjectURL(O), O = null, w = null, $.textContent = "", S.replaceChildren(), L.ui.hideModal();
                                    },
                                    children: _("Close")
                                })
                            }, o("div", b))
                        ]
                    }, o(s, h)), U = ()=>!v && q.isConnected && q.getClientRects().length > 0;
                    async function W(t) {
                        if (!y) {
                            y = !0, R.disabled = A.disabled = !0, j.style.display = "", j.title = "0%", j.firstElementChild.style.width = "0%", z.textContent = _("Reading MIB\u2026");
                            try {
                                let v = await rd(), y = v.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                if (y?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                if (!U()) return;
                                let k = await rz(y.onu_id, y.serial_number, t);
                                x = k.job;
                                let C = Date.now() + 140000;
                                for(; U();){
                                    let e = await rj(k.job, 0);
                                    if (!U()) return;
                                    if ("ready" === e.status) {
                                        var r, n, i, a, s, d, c, p, u, f, g, b, h, m;
                                        if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                        let t = new Uint8Array(e.bytes), v = 0;
                                        for(let r = 0; r < e.chunks; r++){
                                            let n = 0 === r ? e : await rj(k.job, r);
                                            if (!U()) return;
                                            if ("ready" !== n.status || n.chunk !== r || n.chunks !== e.chunks || n.bytes !== e.bytes || !n.data) throw Error(_("Invalid MIB snapshot chunk"));
                                            let i = atob(n.data);
                                            if (i.length > 32768 || v + i.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                            for(let e = 0; e < i.length; e++)t[v++] = i.charCodeAt(e);
                                            let a = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                            j.title = `${a}%`, j.firstElementChild.style.width = `${a}%`, z.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                        }
                                        if (v !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                        if (await B(), w = rk.parse(tj(JSON.parse(new TextDecoder("utf-8", {
                                            fatal: !0
                                        }).decode(t)))).report, 1 !== w.schema_version || w.onu_id !== y.onu_id) throw Error(_("Unexpected MIB response"));
                                        j.style.display = "none", z.replaceChildren((r = w, g = {
                                            class: "mib-chips",
                                            children: [
                                                (i = {
                                                    class: "mib-chip mib-chip-primary",
                                                    children: [
                                                        "ONU ",
                                                        r.onu_id
                                                    ]
                                                }, o("span", i)),
                                                (a = {
                                                    class: `mib-chip ${r.uploaded_complete ? "mib-chip-success" : "mib-chip-warning"}`,
                                                    children: r.uploaded_complete ? _("Upload complete") : _("Upload incomplete")
                                                }, o("span", a)),
                                                (s = {
                                                    class: "mib-chip mib-chip-info",
                                                    children: [
                                                        _("Records"),
                                                        ": ",
                                                        r.received_records,
                                                        r.expected_records !== r.received_records ? ` / ${r.expected_records}` : ""
                                                    ]
                                                }, o("span", s)),
                                                (d = {
                                                    class: "mib-chip",
                                                    children: [
                                                        _("Decoded"),
                                                        ": ",
                                                        r.decoded_records
                                                    ]
                                                }, o("span", d)),
                                                r.partial_records > 0 ? (c = {
                                                    class: "mib-chip mib-chip-warning",
                                                    children: [
                                                        _("Partial"),
                                                        ": ",
                                                        r.partial_records
                                                    ]
                                                }, o("span", c)) : null,
                                                (p = {
                                                    class: "mib-chip mib-chip-neutral",
                                                    children: [
                                                        _("Basic"),
                                                        ": ",
                                                        r.basic_records
                                                    ]
                                                }, o("span", p)),
                                                (u = {
                                                    class: "mib-chip",
                                                    children: r.tables_collected ? _("VLAN tables collected") : _("VLAN tables not collected")
                                                }, o("span", u)),
                                                (f = {
                                                    class: "mib-chip mib-chip-subtle",
                                                    children: new Date().toLocaleTimeString()
                                                }, o("span", f))
                                            ]
                                        }, o("div", g))), S.replaceChildren(function(e) {
                                            var t, r, n, i, a, s;
                                            let d = e.classes.length ? e.classes[0].class_id : null, c = (t = {
                                                class: "mib-content"
                                            }, o("div", t)), p = (r = {
                                                type: "search",
                                                class: "cbi-input-text mib-search-input",
                                                placeholder: _("Search ME name or Class ID\u2026")
                                            }, o("input", r)), u = (n = {
                                                class: "mib-class-list"
                                            }, o("div", n)), f = new Map();
                                            function g(t) {
                                                var r, n;
                                                for (let [e, r] of (d = t, f))e === t ? r.classList.add("active") : r.classList.remove("active");
                                                let i = e.entities.filter((e)=>e.class_id === t);
                                                i.length ? c.replaceChildren(...i.map((r, n)=>{
                                                    var i, a, s, d, c, p, u, f, g, b, h, m, v, y, w, x, k, z, j;
                                                    return j = {
                                                        open: 0 === n,
                                                        class: "mib-entity-details",
                                                        children: [
                                                            (c = {
                                                                class: "mib-entity-summary",
                                                                children: [
                                                                    (s = {
                                                                        class: "mib-entity-title",
                                                                        children: [
                                                                            (i = {
                                                                                children: l(r.name)
                                                                            }, o("strong", i)),
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
                                                                            }, o("span", a))
                                                                        ]
                                                                    }, o("span", s)),
                                                                    (d = {
                                                                        class: "mib-entity-support",
                                                                        children: r.support
                                                                    }, o("span", d))
                                                                ]
                                                            }, o("summary", c)),
                                                            (z = {
                                                                class: "mib-entity-body",
                                                                children: [
                                                                    r.attributes.length ? (v = {
                                                                        class: "table mib-attributes-table",
                                                                        children: [
                                                                            (h = {
                                                                                children: (b = {
                                                                                    children: [
                                                                                        (p = {
                                                                                            style: "width:28%",
                                                                                            children: _("Attribute")
                                                                                        }, o("th", p)),
                                                                                        (u = {
                                                                                            style: "width:14%",
                                                                                            children: _("Type")
                                                                                        }, o("th", u)),
                                                                                        (f = {
                                                                                            children: _("Value")
                                                                                        }, o("th", f)),
                                                                                        (g = {
                                                                                            style: "width:18%",
                                                                                            children: _("Definition")
                                                                                        }, o("th", g))
                                                                                    ]
                                                                                }, o("tr", b))
                                                                            }, o("thead", h)),
                                                                            (m = {
                                                                                children: r.attributes.map((e)=>{
                                                                                    var t, r, n, i, a, s, d, c, p, u;
                                                                                    return u = {
                                                                                        children: [
                                                                                            (t = {
                                                                                                class: "mib-attr-name",
                                                                                                children: e.definition.name
                                                                                            }, o("td", t)),
                                                                                            (n = {
                                                                                                class: "mib-attr-kind",
                                                                                                children: (r = {
                                                                                                    children: e.definition.kind
                                                                                                }, o("code", r))
                                                                                            }, o("td", n)),
                                                                                            (c = {
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
                                                                                                                    return l(e.value);
                                                                                                                case "octets":
                                                                                                                    return l(e.hex);
                                                                                                                case "table_length":
                                                                                                                    return l(e.bytes);
                                                                                                                default:
                                                                                                                    throw new tz("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                            }
                                                                                                        }(e.value)
                                                                                                    }, o("span", i)),
                                                                                                    e.observations?.length ? (d = {
                                                                                                        class: "mib-obs-details",
                                                                                                        children: [
                                                                                                            (a = {
                                                                                                                children: _("Raw data / observations")
                                                                                                            }, o("summary", a)),
                                                                                                            (s = {
                                                                                                                class: "mib-pre",
                                                                                                                children: rD(e.observations)
                                                                                                            }, o("pre", s))
                                                                                                        ]
                                                                                                    }, o("details", d)) : null
                                                                                                ]
                                                                                            }, o("td", c)),
                                                                                            (p = {
                                                                                                class: "mib-attr-ref",
                                                                                                children: rZ(e.definition)
                                                                                            }, o("td", p))
                                                                                        ]
                                                                                    }, o("tr", u);
                                                                                })
                                                                            }, o("tbody", m))
                                                                        ]
                                                                    }, o("table", v)) : (y = {
                                                                        children: _("Basic display only; raw records are preserved.")
                                                                    }, o("p", y)),
                                                                    e.tables.filter((e)=>e.class_id === t && e.entity_id === r.entity_id).map((e)=>{
                                                                        var t, r, n, i, a, s, d, c, p, u, f, g, b, h, m, v;
                                                                        return v = {
                                                                            class: "mib-table-details",
                                                                            children: [
                                                                                (t = {
                                                                                    children: [
                                                                                        e.attribute.name,
                                                                                        " \xb7",
                                                                                        " ",
                                                                                        e.collected ? `${e.rows.length} ${_("rows")}` : l(e.error)
                                                                                    ]
                                                                                }, o("summary", t)),
                                                                                e.vlan_rules.length ? (b = {
                                                                                    class: "mib-table-overflow",
                                                                                    children: (g = {
                                                                                        class: "table",
                                                                                        children: [
                                                                                            (u = {
                                                                                                children: (p = {
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
                                                                                                        (d = {
                                                                                                            children: _("Inner treatment (priority / VID / TPID-DEI)")
                                                                                                        }, o("th", d)),
                                                                                                        (c = {
                                                                                                            children: _("Delete entry")
                                                                                                        }, o("th", c))
                                                                                                    ]
                                                                                                }, o("tr", p))
                                                                                            }, o("thead", u)),
                                                                                            (f = {
                                                                                                children: e.vlan_rules.map((e)=>{
                                                                                                    var t, r, n, i, a, s, d, c;
                                                                                                    return c = {
                                                                                                        children: [
                                                                                                            (t = {
                                                                                                                children: `${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`
                                                                                                            }, o("td", t)),
                                                                                                            (r = {
                                                                                                                children: `${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`
                                                                                                            }, o("td", r)),
                                                                                                            (n = {
                                                                                                                children: l(e.filter_ethertype)
                                                                                                            }, o("td", n)),
                                                                                                            (i = {
                                                                                                                children: l(e.tags_to_remove)
                                                                                                            }, o("td", i)),
                                                                                                            (a = {
                                                                                                                children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                            }, o("td", a)),
                                                                                                            (s = {
                                                                                                                children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                            }, o("td", s)),
                                                                                                            (d = {
                                                                                                                children: l(e.delete_entry)
                                                                                                            }, o("td", d))
                                                                                                        ]
                                                                                                    }, o("tr", c);
                                                                                                })
                                                                                            }, o("tbody", f))
                                                                                        ]
                                                                                    }, o("table", g))
                                                                                }, o("div", b)) : null,
                                                                                (h = {
                                                                                    style: "margin-top:6px",
                                                                                    children: [
                                                                                        _("G.988 encoded field values"),
                                                                                        ": ",
                                                                                        rZ(e.attribute)
                                                                                    ]
                                                                                }, o("p", h)),
                                                                                (m = {
                                                                                    class: "mib-pre",
                                                                                    children: rD(e.vlan_rules.length ? e.vlan_rules : e.rows)
                                                                                }, o("pre", m))
                                                                            ]
                                                                        }, o("details", v);
                                                                    }),
                                                                    (k = {
                                                                        class: "mib-diag-details",
                                                                        children: [
                                                                            (w = {
                                                                                children: _("Records / diagnostics")
                                                                            }, o("summary", w)),
                                                                            (x = {
                                                                                class: "mib-pre",
                                                                                children: rD({
                                                                                    diagnostics: r.diagnostics,
                                                                                    records: e.records.filter((e)=>e.class_id === t && e.entity_id === r.entity_id)
                                                                                })
                                                                            }, o("pre", x))
                                                                        ]
                                                                    }, o("details", k))
                                                                ]
                                                            }, o("div", z))
                                                        ]
                                                    }, o("details", j);
                                                })) : c.replaceChildren((n = {
                                                    class: "mib-empty-content",
                                                    children: (r = {
                                                        children: _("No entities recorded for this ME class.")
                                                    }, o("p", r))
                                                }, o("div", n)));
                                            }
                                            function b() {
                                                var t;
                                                let r = p.value.trim().toLowerCase();
                                                f.clear();
                                                let n = e.classes.filter((e)=>`${e.class_id} ${e.name ?? ""}`.toLowerCase().includes(r));
                                                n.length ? u.replaceChildren(...n.map((e)=>{
                                                    var t, r, n, i;
                                                    let a = (i = {
                                                        type: "button",
                                                        class: `mib-class-btn${e.class_id === d ? " active" : ""}`,
                                                        onclick: ()=>g(e.class_id),
                                                        children: [
                                                            (t = {
                                                                class: "mib-class-id",
                                                                children: e.class_id
                                                            }, o("span", t)),
                                                            (r = {
                                                                class: "mib-class-name",
                                                                title: e.name ?? _("Unknown class"),
                                                                children: e.name ?? _("Unknown class")
                                                            }, o("span", r)),
                                                            (n = {
                                                                class: "mib-class-count",
                                                                children: e.entities
                                                            }, o("span", n))
                                                        ]
                                                    }, o("button", i));
                                                    return f.set(e.class_id, a), a;
                                                })) : u.replaceChildren((t = {
                                                    class: "mib-empty-list",
                                                    children: _("No matching ME classes")
                                                }, o("div", t)));
                                            }
                                            return p.addEventListener("input", b), b(), e.classes.length && g(e.classes[0].class_id), s = {
                                                class: "mib-browser",
                                                children: [
                                                    (a = {
                                                        class: "mib-sidebar",
                                                        children: [
                                                            (i = {
                                                                class: "mib-search-box",
                                                                children: p
                                                            }, o("div", i)),
                                                            u
                                                        ]
                                                    }, o("div", a)),
                                                    c
                                                ]
                                            }, o("div", s);
                                        }(w), (m = {
                                            class: "mib-upload-diagnostics",
                                            children: [
                                                (b = {
                                                    children: _("Upload diagnostics")
                                                }, o("summary", b)),
                                                (h = {
                                                    class: "mib-pre",
                                                    children: rD(w.diagnostics)
                                                }, o("pre", h))
                                            ]
                                        }, o("details", m))), n = w, $.textContent = rD({
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
                                        }), M.disabled = !1;
                                        return;
                                    }
                                    if (e.progress) {
                                        let { phase: t, received: r, expected: n } = e.progress;
                                        if (z.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == n ? "" : `: ${r}/${n}`}` : null == n ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${n}`, n && n > 0) {
                                            let e = Math.min(100, Math.round(r / n * 100));
                                            j.title = `${e}%`, j.firstElementChild.style.width = `${e}%`;
                                        }
                                    }
                                    if (Date.now() >= C) throw Error(_("MIB query timed out; retry."));
                                    await new Promise((e)=>setTimeout(e, 1000));
                                }
                            } catch (e) {
                                U() && (j.style.display = "none", z.replaceChildren(o("span", {
                                    class: "mib-error-text",
                                    children: [
                                        String(e),
                                        w ? ` \xb7 ${_("Previous snapshot retained")}` : ""
                                    ]
                                })));
                            } finally{
                                await B(), y = !1, R.disabled = A.disabled = !1;
                            }
                        }
                    }
                    async function B() {
                        if (!x) return;
                        let e = x;
                        x = null;
                        try {
                            await rS(e);
                        } catch (e) {
                            console.warn("Failed to release MIB snapshot", e);
                        }
                    }
                    D(m), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, q, "modal-wide");
                }(t, "mib");
            } catch (e) {
                m.replaceChildren(o("div", {
                    class: "alert-message danger",
                    children: String(e)
                }));
            }
        }, M = async (e)=>{
            if (!z) {
                for (let e of (z = !0, S))e.disabled = !0;
                U(x);
                try {
                    var t;
                    let r = await ru(e, v.value), n = e.startsWith("management_") ? _("Management operation started; status is refreshed below.") : _("Started: %s").replace("%s", "operation_ids" in r ? r.operation_ids.join(", ") : "\u2014");
                    m.replaceChildren((t = {
                        class: "alert-message info",
                        children: n
                    }, o("div", t))), U(await rc());
                } catch (e) {
                    m.replaceChildren(o("div", {
                        class: "alert-message danger",
                        children: String(e)
                    }));
                } finally{
                    z = !1, U(x);
                }
            }
        }, P = o("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: ()=>M("plan"),
            children: _("Preview differences (read-only)")
        }), R = o("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            onclick: ()=>M("apply"),
            children: _("Apply differences")
        }), A = o("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            title: _("Read current device parameters and auto-verify matching settings without writing to device"),
            onclick: ()=>M("reconcile"),
            children: _("Reconcile (read-only)")
        }), N = o("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            title: _("Clear backoff delays and retry safe difference synchronization"),
            onclick: ()=>M("retry"),
            children: _("Self-heal / retry")
        });
        S.push(P, R, A, N);
        let I = o("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: ()=>M("management_plan"),
            children: _("Check management differences (read-only)")
        }), T = o("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            onclick: ()=>M("management_apply"),
            children: _("Apply management configuration")
        });
        S.push(I, T);
        let D = (r = {
            class: "cbi-section",
            children: [
                o("h3", {
                    children: _("Isolated TR069 management network")
                }),
                w,
                o("p", {
                    style: "margin-top:10px",
                    children: [
                        I,
                        " ",
                        T
                    ]
                })
            ]
        }, o("div", r)), Z = (a = {
            class: "cbi-section",
            children: [
                o("h3", {
                    children: _("Manual synchronization")
                }),
                (i = {
                    style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px",
                    children: [
                        (n = {
                            style: "display:flex;align-items:center;gap:8px",
                            children: [
                                o("span", {
                                    children: [
                                        _("Target"),
                                        ":"
                                    ]
                                }),
                                v
                            ]
                        }, o("label", n)),
                        o("div", {
                            style: "display:flex;gap:8px;flex-wrap:wrap",
                            children: [
                                P,
                                R,
                                A,
                                N
                            ]
                        })
                    ]
                }, o("div", i))
            ]
        }, o("div", a)), q = (u = {
            class: "cbi-map fttr-sync",
            children: [
                o("style", {
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
                o("h2", {
                    children: _("FTTR synchronization")
                }),
                b,
                h,
                D,
                Z,
                m,
                y
            ]
        }, o("div", u));
        function U(e) {
            var t, r, n, i, a, c, u, f, g, m, j, S, A, N, D, q, U, W, B, V, F, J, K, G, H, Q, X, Y, ee, et, er;
            x = e, b.replaceChildren((c = {
                "data-provisioning-summary": "true",
                style: "display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%",
                children: [
                    (t = {
                        children: [
                            o("strong", {
                                style: "margin-right:.4em",
                                children: [
                                    _("Provisioning"),
                                    ":"
                                ]
                            }),
                            o("span", {
                                class: `fttr-badge ${e.enabled ? "fttr-badge-success" : "fttr-badge-neutral"}`,
                                children: e.enabled ? _("Enabled") : _("Disabled")
                            })
                        ]
                    }, o("span", t)),
                    (r = {
                        children: [
                            o("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Mode"),
                                    ":"
                                ]
                            }),
                            o("span", {
                                class: "fttr-badge fttr-badge-info",
                                children: l(e.mode)
                            })
                        ]
                    }, o("span", r)),
                    (n = {
                        children: [
                            o("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Revision"),
                                    ":"
                                ]
                            }),
                            o("code", {
                                children: l(e.revision)
                            })
                        ]
                    }, o("span", n)),
                    (e.triggers ?? []).length ? (i = {
                        children: [
                            o("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Triggers"),
                                    ":"
                                ]
                            }),
                            o("code", {
                                children: (e.triggers ?? []).join(", ")
                            })
                        ]
                    }, o("span", i)) : null,
                    e.interval_minutes ? (a = {
                        children: [
                            o("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Interval (minutes)"),
                                    ":"
                                ]
                            }),
                            o("span", {
                                children: e.interval_minutes
                            })
                        ]
                    }, o("span", a)) : null
                ]
            }, o("div", c)));
            let en = [
                e.error,
                k.error ? _("Committed configuration is invalid: %s").format(k.error) : k.revision && k.revision !== e.revision ? _("Committed configuration has not been loaded. Check Configuration diagnostics; an active operation may have prevented reload.") : ""
            ].filter(Boolean);
            h.hidden = !en.length, h.textContent = en.join(" \u2014 ");
            let ei = [
                "all",
                ...Array.from(new Set((e.devices ?? []).map((e)=>e.group).filter(Boolean))).map((e)=>`group:${e}`),
                ...(e.devices ?? []).map((e)=>e.device)
            ];
            if (Array.from(v.options).map((e)=>e.value).join("\n") !== ei.join("\n")) {
                let t = v.value;
                v.replaceChildren(...ei.map((t)=>o("option", {
                        value: t,
                        children: "all" === t ? _("All devices") : t.startsWith("group:") ? (e.devices ?? []).find((e)=>`group:${e.group}` === t)?.group_name || t : (e.devices ?? []).find((e)=>e.device === t)?.name || t
                    }))), v.value = ei.includes(t) ? t : "all";
            }
            Z.hidden = "manual" !== e.mode || !L.hasViewPermission();
            let ea = (e.devices ?? []).filter((e)=>"all" === v.value || e.device === v.value || `group:${e.group}` === v.value).some((e)=>![
                    "completed",
                    "not_started",
                    "interrupted"
                ].includes(e.provisioning.state ?? "not_started"));
            P.disabled = z || ea || !!k.error || !!k.revision && k.revision !== e.revision || !(e.devices ?? []).length, R.disabled = P.disabled || !e.enabled;
            let es = e.management_network;
            I.disabled = z || !!es?.inflight || !!k.error || !L.hasViewPermission(), T.disabled = I.disabled;
            let eo = es.desired ?? es.applied, el = es?.plan ?? [], ed = !!es?.applied_version && !!es?.desired_version && es?.applied_version === es?.desired_version;
            w.replaceChildren((er = {
                children: [
                    (S = {
                        style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:10px",
                        children: [
                            (u = {
                                children: [
                                    o("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            _("State"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    rB(es?.state)
                                ]
                            }, o("span", u)),
                            (f = {
                                children: [
                                    o("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            _("Desired version"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    o("code", {
                                        children: l(es?.desired_version)
                                    })
                                ]
                            }, o("span", f)),
                            (g = {
                                children: [
                                    o("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            _("Applied version"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    o("code", {
                                        children: l(es?.applied_version)
                                    })
                                ]
                            }, o("span", g)),
                            es?.desired_version || es?.applied_version ? (m = {
                                children: ed ? o("span", {
                                    class: "fttr-badge fttr-badge-success",
                                    children: _("Synchronized")
                                }) : o("span", {
                                    class: "fttr-badge fttr-badge-warning",
                                    children: _("Pending apply")
                                })
                            }, o("span", m)) : null,
                            es?.next_retry_at ? (j = {
                                children: [
                                    o("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            _("Next retry"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    d(es.next_retry_at)
                                ]
                            }, o("span", j)) : null
                        ]
                    }, o("div", S)),
                    (K = {
                        class: "fttr-grid-3",
                        children: [
                            (D = {
                                class: "fttr-card",
                                children: [
                                    (A = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Management interface")
                                            }),
                                            o("strong", {
                                                children: "\u2014"
                                            })
                                        ]
                                    }, o("div", A)),
                                    (N = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Management VLAN")
                                            }),
                                            o("span", {
                                                children: [
                                                    "VLAN ",
                                                    l(eo?.vlan.join(", ")),
                                                    " (Prio ",
                                                    l(eo?.priority),
                                                    ")"
                                                ]
                                            })
                                        ]
                                    }, o("div", N))
                                ]
                            }, o("div", D)),
                            (B = {
                                class: "fttr-card",
                                children: [
                                    (q = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Service IP / Netmask")
                                            }),
                                            o("code", {
                                                children: l(eo?.address)
                                            })
                                        ]
                                    }, o("div", q)),
                                    (W = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("DHCP service")
                                            }),
                                            (U = {
                                                children: null === eo ? "\u2014" : eo.dhcp_enabled ? o("span", {
                                                    class: "fttr-badge fttr-badge-success",
                                                    children: _("Enabled")
                                                }) : o("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    children: _("Disabled")
                                                })
                                            }, o("span", U))
                                        ]
                                    }, o("div", W))
                                ]
                            }, o("div", B)),
                            (J = {
                                class: "fttr-card",
                                children: [
                                    (V = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("ACS URL")
                                            }),
                                            o("code", {
                                                style: "font-size:80%",
                                                children: l(eo?.acs_url)
                                            })
                                        ]
                                    }, o("div", V)),
                                    (F = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Mode")
                                            }),
                                            o("span", {
                                                children: l(eo?.mode)
                                            })
                                        ]
                                    }, o("div", F))
                                ]
                            }, o("div", J))
                        ]
                    }, o("div", K)),
                    el.length ? (ee = {
                        style: "margin-top:10px",
                        children: [
                            o("h5", {
                                style: "margin-bottom:4px;font-size:90%",
                                children: _("Pending configuration changes")
                            }),
                            (Y = {
                                class: "table-wrapper",
                                children: (X = {
                                    class: "table",
                                    style: "font-size:85%",
                                    children: [
                                        (H = {
                                            children: (G = {
                                                children: [
                                                    o("th", {
                                                        children: _("Operation")
                                                    }),
                                                    o("th", {
                                                        children: _("Configuration item")
                                                    }),
                                                    o("th", {
                                                        children: _("Reason / desired changes")
                                                    })
                                                ]
                                            }, o("tr", G))
                                        }, o("thead", H)),
                                        (Q = {
                                            children: el.map((e)=>{
                                                var t, r, n, i;
                                                return i = {
                                                    children: [
                                                        (t = {
                                                            children: o("span", {
                                                                class: "fttr-badge fttr-badge-info",
                                                                children: e.operation
                                                            })
                                                        }, o("td", t)),
                                                        (r = {
                                                            children: o("code", {
                                                                children: e.key
                                                            })
                                                        }, o("td", r)),
                                                        (n = {
                                                            children: o("code", {
                                                                children: (e.value ?? []).join(", ")
                                                            })
                                                        }, o("td", n))
                                                    ]
                                                }, o("tr", i);
                                            })
                                        }, o("tbody", Q))
                                    ]
                                }, o("table", X))
                            }, o("div", Y))
                        ]
                    }, o("div", ee)) : null,
                    es?.error ? o("div", {
                        class: "alert-message warning",
                        style: "margin-top:8px",
                        children: es.error
                    }) : null,
                    o("p", {
                        style: "font-size:85%;color:#888;margin-top:8px;margin-bottom:8px",
                        children: _("Saving in manual mode does not create interfaces, change firewall rules or configure child devices. Apply explicitly to authorize the current management configuration.")
                    }),
                    (et = {
                        style: "margin-top:6px;margin-bottom:10px",
                        children: [
                            o("summary", {
                                style: "cursor:pointer;user-select:none;font-size:85%;color:#666",
                                children: _("Advanced diagnostics / Raw configuration (JSON)")
                            }),
                            o("pre", {
                                style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px",
                                children: JSON.stringify({
                                    desired: es?.desired,
                                    applied: es?.applied,
                                    plan: es?.plan ?? []
                                }, null, 2)
                            })
                        ]
                    }, o("details", et))
                ]
            }, o("div", er)));
            let ec = new Set(Array.from(y.querySelectorAll("details[open]")).map((e)=>e.getAttribute("data-device")));
            y.replaceChildren(...(e.devices ?? []).map((t)=>{
                var r, n, i, a, c, u, f, g, b, h, m, v, y, w, x, k, j, S, P, R, A, N, I, D, Z, q, U, W, B, V, F, J, K, G, H, Q, X, Y, ee, et, er, en, ei, ea, es, eo, el, ed, ep, eu, e_, ef, eg, eb, eh, em, ev, ey, ew, ex, ek;
                let ez, ej, eS;
                return r = ec.has(t.device), n = ()=>M("management_apply"), i = T.disabled, a = e.enabled, c = z, ej = ![
                    "completed",
                    "not_started",
                    "interrupted"
                ].includes((ez = t.provisioning).state), eS = [
                    ...Object.entries(ez.wan_lifecycle ?? {}).map((e)=>{
                        let [t, r] = e;
                        return {
                            ...r,
                            id: `WAN ${t}`,
                            kind: "wan_activation",
                            service_type: "wan"
                        };
                    }),
                    ...Object.entries(ez.wifi_lifecycle ?? {}).map((e)=>{
                        let [t, r] = e;
                        return {
                            ...r,
                            id: `WLAN ${t}`,
                            kind: "ssid",
                            service_type: "wifi"
                        };
                    })
                ], ek = {
                    class: "cbi-section fttr-device-card",
                    children: [
                        (v = {
                            class: "fttr-card-header",
                            children: [
                                (h = {
                                    class: "fttr-card-title-group",
                                    children: [
                                        (f = {
                                            style: "margin:0",
                                            children: [
                                                t.name || t.optical_sn,
                                                " ",
                                                o("small", {
                                                    style: "font-size:75%;font-weight:normal;color:#888",
                                                    children: [
                                                        "(",
                                                        t.adapter,
                                                        ")"
                                                    ]
                                                })
                                            ]
                                        }, o("h3", f)),
                                        (b = {
                                            class: "fttr-card-meta-tags",
                                            children: [
                                                ez.backend ? o("span", {
                                                    class: "fttr-badge fttr-badge-info",
                                                    title: ez.backend.reason,
                                                    children: [
                                                        _("Provisioning method"),
                                                        ": ",
                                                        ez.backend.configured,
                                                        " \u2192 ",
                                                        ez.backend.effective
                                                    ]
                                                }) : null,
                                                t.group_name ? o("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    title: _("Group"),
                                                    children: t.group_name
                                                }) : null,
                                                t.template_name ? o("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    title: _("Template"),
                                                    children: t.template_name
                                                }) : null,
                                                (g = {
                                                    style: "font-size:85%;color:#666",
                                                    children: [
                                                        "OMCI: ",
                                                        rB(t.omci_management?.state),
                                                        t.omci_management?.reason ? o("span", {
                                                            style: "margin-left:4px;color:#888",
                                                            title: t.omci_management.reason,
                                                            children: [
                                                                "(",
                                                                t.omci_management.reason,
                                                                ")"
                                                            ]
                                                        }) : null
                                                    ]
                                                }, o("span", g))
                                            ]
                                        }, o("div", b))
                                    ]
                                }, o("div", h)),
                                L.hasViewPermission() ? (m = {
                                    class: "fttr-card-actions",
                                    children: [
                                        o("button", {
                                            type: "button",
                                            class: "cbi-button cbi-button-action",
                                            onclick: ()=>O(t),
                                            children: _("View OMCI / MIB details")
                                        }),
                                        o("button", {
                                            type: "button",
                                            class: "cbi-button cbi-button-positive",
                                            disabled: c || ej || !a,
                                            title: a ? ej ? _("This device already has an active synchronization operation") : _("Start configuration delivery for this device") : _("Provisioning is disabled"),
                                            onclick: ()=>C(t),
                                            children: _("Sync now")
                                        }),
                                        o("button", {
                                            type: "button",
                                            class: "cbi-button cbi-button-positive",
                                            disabled: c,
                                            title: _("Clear old tasks and managed-object records after a device factory reset. The next preview or apply reads the device again."),
                                            onclick: ()=>{
                                                let e = t.name || t.optical_sn;
                                                window.confirm(_("Are you sure you want to reset the synchronization state for %s?").replace("%s", e)) && $(t);
                                            },
                                            children: _("Reset synchronization state")
                                        })
                                    ]
                                }, o("div", m)) : null
                            ]
                        }, o("div", v)),
                        (I = {
                            class: "fttr-device-status-strip",
                            children: [
                                (k = {
                                    class: "fttr-status-pill-group",
                                    children: [
                                        (y = {
                                            children: [
                                                o("span", {
                                                    class: "fttr-pill-label",
                                                    children: "CWMP:"
                                                }),
                                                " ",
                                                rB(t.management?.state, t.management?.last_inform ? `${_("Last Inform: %s").replace("%s", d(t.management.last_inform))}${null != t.management.age_seconds ? ` (${p(t.management.age_seconds)})` : ""}` : void 0)
                                            ]
                                        }, o("span", y)),
                                        (w = {
                                            children: [
                                                o("span", {
                                                    class: "fttr-pill-label",
                                                    children: [
                                                        _("Synchronization"),
                                                        ":"
                                                    ]
                                                }),
                                                " ",
                                                rB(ez.state)
                                            ]
                                        }, o("span", w)),
                                        (x = {
                                            children: [
                                                o("span", {
                                                    class: "fttr-pill-label",
                                                    children: "Wi-Fi:"
                                                }),
                                                " ",
                                                rB(t.wifi_sync)
                                            ]
                                        }, o("span", x))
                                    ]
                                }, o("div", k)),
                                (N = {
                                    class: "fttr-status-op-info",
                                    children: [
                                        (j = {
                                            children: [
                                                _("Operation"),
                                                ": ",
                                                o("strong", {
                                                    children: l(ez.operation_id)
                                                }),
                                                " (",
                                                l(ez.mode),
                                                ")"
                                            ]
                                        }, o("span", j)),
                                        o("span", {
                                            children: "\xb7"
                                        }),
                                        o("span", {
                                            children: [
                                                _("Started"),
                                                ": ",
                                                d(ez.started_at)
                                            ]
                                        }),
                                        o("span", {
                                            children: "\xb7"
                                        }),
                                        (S = {
                                            children: [
                                                _("Revision"),
                                                ": ",
                                                o("code", {
                                                    children: l(ez.revision)
                                                })
                                            ]
                                        }, o("span", S)),
                                        ez.attempts ? (R = {
                                            children: [
                                                o("span", {
                                                    children: "\xb7"
                                                }),
                                                (P = {
                                                    style: "color:#e67e22",
                                                    children: [
                                                        _("Attempts"),
                                                        ": ",
                                                        o("strong", {
                                                            children: ez.attempts
                                                        })
                                                    ]
                                                }, o("span", P))
                                            ]
                                        }, o(s, R)) : null,
                                        ez.next_retry_at && ez.next_retry_at > Math.floor(Date.now() / 1000) ? (A = {
                                            children: [
                                                o("span", {
                                                    children: "\xb7"
                                                }),
                                                o("span", {
                                                    style: "color:#d35400",
                                                    children: _("Next self-healing retry in %d seconds").replace("%d", String(ez.next_retry_at - Math.floor(Date.now() / 1000)))
                                                })
                                            ]
                                        }, o(s, A)) : null
                                    ]
                                }, o("div", N))
                            ]
                        }, o("div", I)),
                        ez.reconcile_reason ? o("div", {
                            class: "alert-message info",
                            style: "margin:8px 0;font-size:85%",
                            children: ez.reconcile_reason
                        }) : null,
                        rV(ez.items ?? []),
                        ez.cwmp_contract ? (K = {
                            style: "margin-top:1.2em",
                            children: [
                                o("h4", {
                                    style: "margin-bottom:0.5em",
                                    children: _("CWMP contract")
                                }),
                                (J = {
                                    class: "fttr-card",
                                    children: [
                                        (Z = {
                                            style: "display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                                            children: [
                                                (D = {
                                                    children: [
                                                        o("span", {
                                                            children: l(ez.cwmp_contract.requested)
                                                        }),
                                                        " \u2192",
                                                        " ",
                                                        o("code", {
                                                            children: l(ez.cwmp_contract.contract)
                                                        })
                                                    ]
                                                }, o("div", D)),
                                                o("div", {
                                                    children: rB(ez.cwmp_contract.state)
                                                })
                                            ]
                                        }, o("div", Z)),
                                        (V = {
                                            style: "display:flex;flex-wrap:wrap;gap:12px;margin-bottom:6px;font-size:90%",
                                            children: [
                                                (q = {
                                                    children: [
                                                        o("span", {
                                                            style: "color:#888",
                                                            children: "WAN:"
                                                        }),
                                                        " ",
                                                        rB(ez.cwmp_contract.capabilities?.wan)
                                                    ]
                                                }, o("span", q)),
                                                (U = {
                                                    children: [
                                                        o("span", {
                                                            style: "color:#888",
                                                            children: "WLAN:"
                                                        }),
                                                        " ",
                                                        rB(ez.cwmp_contract.capabilities?.wlan)
                                                    ]
                                                }, o("span", U)),
                                                (W = {
                                                    children: [
                                                        o("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                _("Bindings"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        rB(ez.cwmp_contract.capabilities?.binding)
                                                    ]
                                                }, o("span", W)),
                                                (B = {
                                                    children: [
                                                        o("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                _("Cache"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        o("span", {
                                                            class: "fttr-badge fttr-badge-info",
                                                            style: "font-size:80%",
                                                            children: ez.cwmp_contract.cache_hit ? _("Matched") : _("Fresh discovery")
                                                        })
                                                    ]
                                                }, o("span", B))
                                            ]
                                        }, o("div", V)),
                                        ez.cwmp_contract.schema ? (F = {
                                            style: "font-size:85%;color:#666",
                                            children: [
                                                _("Schema"),
                                                ": ",
                                                o("code", {
                                                    children: ez.cwmp_contract.schema
                                                })
                                            ]
                                        }, o("div", F)) : null,
                                        ez.cwmp_contract.reason ? o("div", {
                                            style: "font-size:85%;margin-top:4px;color:#e67e22",
                                            children: ez.cwmp_contract.reason
                                        }) : null
                                    ]
                                }, o("div", J))
                            ]
                        }, o("div", K)) : null,
                        ez.backend?.effective === "command" ? null : (u = t.acs_bootstrap) ? (eb = {
                            style: "margin-top:1.2em",
                            children: [
                                (H = {
                                    style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:0.5em",
                                    children: [
                                        o("h4", {
                                            style: "margin:0",
                                            children: _("ACS bootstrap")
                                        }),
                                        (G = {
                                            style: "display:flex;align-items:center;gap:6px",
                                            children: [
                                                rB(u.state),
                                                u.inflight ? o("span", {
                                                    class: "fttr-badge fttr-badge-info",
                                                    children: _("Command in progress")
                                                }) : null
                                            ]
                                        }, o("div", G))
                                    ]
                                }, o("div", H)),
                                (e_ = {
                                    class: "fttr-card",
                                    children: [
                                        (ed = {
                                            class: "fttr-grid-3",
                                            children: [
                                                (ee = {
                                                    children: [
                                                        (Q = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Method")
                                                                }),
                                                                o("code", {
                                                                    children: l(u.method)
                                                                })
                                                            ]
                                                        }, o("div", Q)),
                                                        (X = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Attempts")
                                                                }),
                                                                o("span", {
                                                                    children: l(u.attempts)
                                                                })
                                                            ]
                                                        }, o("div", X)),
                                                        (Y = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Identity source")
                                                                }),
                                                                o("span", {
                                                                    children: l(u.binding_source)
                                                                })
                                                            ]
                                                        }, o("div", Y))
                                                    ]
                                                }, o("div", ee)),
                                                (ei = {
                                                    children: [
                                                        (et = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Management VLAN")
                                                                }),
                                                                o("span", {
                                                                    children: u.desired?.vlan !== void 0 ? `VLAN ${u.desired.vlan} (Prio ${u.desired.priority ?? 0})` : "\u2014"
                                                                })
                                                            ]
                                                        }, o("div", et)),
                                                        (er = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("ACS URL")
                                                                }),
                                                                o("code", {
                                                                    style: "font-size:80%",
                                                                    children: l(u.desired?.acs_url)
                                                                })
                                                            ]
                                                        }, o("div", er)),
                                                        (en = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Local ACS listener")
                                                                }),
                                                                o("code", {
                                                                    style: "font-size:80%",
                                                                    children: u.listener?.listen ? `${u.listener.listen}${u.listener.path || ""}` : "\u2014"
                                                                })
                                                            ]
                                                        }, o("div", en))
                                                    ]
                                                }, o("div", ei)),
                                                (el = {
                                                    children: [
                                                        (ea = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Last telemetry")
                                                                }),
                                                                o("span", {
                                                                    style: "font-size:85%",
                                                                    children: d(u.mqtt_last_seen)
                                                                })
                                                            ]
                                                        }, o("div", ea)),
                                                        (es = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Last Inform")
                                                                }),
                                                                o("span", {
                                                                    style: "font-size:85%",
                                                                    children: d(u.last_inform)
                                                                })
                                                            ]
                                                        }, o("div", es)),
                                                        (eo = {
                                                            class: "fttr-kv-row",
                                                            children: [
                                                                o("span", {
                                                                    class: "fttr-kv-label",
                                                                    children: _("Settings verified")
                                                                }),
                                                                o("span", {
                                                                    style: "font-size:85%",
                                                                    children: d(u.settings_verified_at)
                                                                })
                                                            ]
                                                        }, o("div", eo))
                                                    ]
                                                }, o("div", el))
                                            ]
                                        }, o("div", ed)),
                                        u.mqtt_target ? (ep = {
                                            style: "font-size:85%;color:#666;margin-top:6px;border-top:1px dashed rgba(127,140,141,0.15);padding-top:6px",
                                            children: [
                                                o("span", {
                                                    style: "color:#888",
                                                    children: [
                                                        _("MQTT target"),
                                                        ":"
                                                    ]
                                                }),
                                                " ",
                                                o("code", {
                                                    children: u.mqtt_target
                                                })
                                            ]
                                        }, o("div", ep)) : null,
                                        u.reason ? o("div", {
                                            style: "font-size:85%;color:#d35400;margin-top:6px;overflow-wrap:anywhere",
                                            children: u.reason
                                        }) : null,
                                        "awaiting_apply" === u.state ? (eu = {
                                            style: "margin-top:10px;padding:8px;background:rgba(243,156,18,0.1);border-radius:4px;border:1px solid rgba(243,156,18,0.3)",
                                            children: [
                                                o("button", {
                                                    type: "button",
                                                    class: "cbi-button cbi-button-positive",
                                                    disabled: i,
                                                    onclick: n,
                                                    children: _("Authorize and apply management settings")
                                                }),
                                                " ",
                                                o("span", {
                                                    style: "font-size:85%;color:#666",
                                                    children: _("Required after management drift or service restart; verifies the child ACS settings before business synchronization.")
                                                })
                                            ]
                                        }, o("div", eu)) : null
                                    ]
                                }, o("div", e_)),
                                [
                                    u.last_error,
                                    u.link_identity_error,
                                    u.persistence_error,
                                    u.listener?.error,
                                    u.endpoint_notice
                                ].filter(Boolean).map((e)=>o("div", {
                                        class: "alert-message warning",
                                        style: "overflow-wrap:anywhere;margin-top:8px",
                                        children: e
                                    })),
                                u.manual_steps?.length ? (eg = {
                                    style: "margin-top:8px",
                                    children: [
                                        o("summary", {
                                            style: "cursor:pointer;user-select:none;font-weight:600",
                                            children: _("Management setup / reachability guidance")
                                        }),
                                        (ef = {
                                            style: "padding:6px 0",
                                            children: u.manual_steps.map((e, t)=>o("p", {
                                                    style: "margin:4px 0;font-size:90%",
                                                    children: [
                                                        t + 1,
                                                        ". ",
                                                        e
                                                    ]
                                                }))
                                        }, o("div", ef))
                                    ]
                                }, o("details", eg)) : null
                            ]
                        }, o("div", eb)) : null,
                        eS.length ? (eh = {
                            style: "margin-top:1.2em",
                            children: [
                                o("h4", {
                                    style: "margin-bottom:0.5em",
                                    children: _("WAN / WLAN lifecycle results")
                                }),
                                rV(eS)
                            ]
                        }, o("div", eh)) : null,
                        (ex = {
                            "data-device": t.device,
                            open: r,
                            style: "margin-top:1em",
                            children: [
                                o("summary", {
                                    style: "cursor:pointer;user-select:none;font-weight:600",
                                    children: _("Managed objects and lifecycle intent")
                                }),
                                (ew = {
                                    style: "padding:8px 0",
                                    children: [
                                        (ey = {
                                            style: "display:flex;gap:16px;flex-wrap:wrap;font-size:90%;margin-bottom:6px",
                                            children: [
                                                (em = {
                                                    children: [
                                                        o("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                _("Wi-Fi cleanup policy"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        l(ez.wifi_cleanup)
                                                    ]
                                                }, o("span", em)),
                                                (ev = {
                                                    children: [
                                                        o("span", {
                                                            style: "color:#888",
                                                            children: [
                                                                _("Wi-Fi stage"),
                                                                ":"
                                                            ]
                                                        }),
                                                        " ",
                                                        l(ez.wifi_stage)
                                                    ]
                                                }, o("span", ev))
                                            ]
                                        }, o("div", ey)),
                                        o("pre", {
                                            style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:85%;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px;max-height:240px;overflow-y:auto",
                                            children: JSON.stringify({
                                                wan_objects: ez.wan_objects ?? {},
                                                wifi_objects: ez.wifi_objects ?? {}
                                            }, null, 2)
                                        })
                                    ]
                                }, o("div", ew))
                            ]
                        }, o("details", ex))
                    ]
                }, o("div", ek);
            }));
        }
        return v.addEventListener("change", ()=>U(x)), U(f), L.Poll.add(async ()=>{
            if (q.isConnected && !j) {
                j = !0;
                try {
                    let [e, t] = await Promise.all([
                        rc(),
                        rp()
                    ]);
                    k = t, U(e);
                } catch (e) {
                    h.hidden = !1, h.textContent = _("Status refresh failed: %s").format(String(e));
                } finally{
                    j = !1;
                }
            }
        }, 5), q;
    },
    handleSave: null,
    handleSaveApply: null,
    handleReset: null
});

return main;