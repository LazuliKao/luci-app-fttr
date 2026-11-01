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
const o = (e)=>null == e || "" === e ? "\u2014" : String(e);
function l(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
    return null != e && Number.isFinite(e) ? `${e.toFixed(t)} dBm` : "\u2014";
}
function d(e) {
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
function c(e) {
    if (void 0 === e || !Number.isFinite(e) || e < 0) return "\u2014";
    if (e < 1024) return `${e} B`;
    let t = [
        "KiB",
        "MiB",
        "GiB",
        "TiB"
    ], r = e / 1024, n = 0;
    for(; r >= 1024 && n < t.length - 1;)r /= 1024, n++;
    return `${r.toFixed(1)} ${t[n]}`;
}
function p(e) {
    return void 0 === e || !Number.isFinite(e) || e < 0 ? "\u2014" : e < 1000 ? `${e} Pkts.` : `${(e / 1000).toFixed(2)} KPkts.`;
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
const b = {};
function g(e) {
    return e && Object.assign(b, e), b;
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
function $(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function j(e) {
    if (!1 === $(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let r = t.prototype;
    return !1 !== $(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
}
const O = new Set([
    "string",
    "number",
    "symbol"
]);
function P(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function S(e, t, r) {
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
function N(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let r = t; r < e.issues.length; r++)if (e.issues[r]?.continue !== !0) return !0;
    return !1;
}
function T(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function C(e) {
    return "string" == typeof e ? e : e?.message;
}
function I(e, t, r) {
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = C(e.inst?._zod.def?.error?.(e)) ?? C(t?.error?.(e)) ?? C(r.customError?.(e)) ?? C(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
}
const D = (e, t)=>{
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
}, R = u("$ZodError", D), A = u("$ZodError", D, {
    Parent: Error
}), U = (t = A, (e, r, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: r,
        issues: []
    }, a);
    if (s instanceof Promise) throw new f();
    if (s.issues.length) {
        let e = new (i?.Err ?? t)(s.issues.map((e)=>I(e, a, g())));
        throw z(e, i?.callee), e;
    }
    return s.value;
}), Z = (r = A, async (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (i?.Err ?? r)(s.issues.map((e)=>I(e, a, g())));
        throw z(e, i?.callee), e;
    }
    return s.value;
}), B = (n = A, (e, t, r)=>{
    let i = r ? {
        ...r,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (a instanceof Promise) throw new f();
    return a.issues.length ? {
        success: !1,
        error: new (n ?? R)(a.issues.map((e)=>I(e, i, g())))
    } : {
        success: !0,
        data: a.value
    };
}), q = (i = A, async (e, t, r)=>{
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
        error: new i(a.issues.map((e)=>I(e, n, g())))
    } : {
        success: !0,
        data: a.value
    };
}), F = /^-?\d+(?:\.\d+)?$/, V = /^(?:true|false)$/i, W = /^null$/i, J = {
    major: 4,
    minor: 3,
    patch: 6
}, H = u("$ZodType", (e, t)=>{
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
            let n, i = N(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, s = a._zod.check(e);
                if (s instanceof Promise && r?.async === !1) throw new f();
                if (n || s instanceof Promise) n = (n ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (i || (i = N(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = N(e, t));
                }
            }
            return n ? n.then(()=>e) : e;
        }, r = (r, i, a)=>{
            if (N(r)) return r.aborted = !0, r;
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
                    let r = B(e, t);
                    return r.success ? {
                        value: r.data
                    } : {
                        issues: r.error?.issues
                    };
                } catch (r) {
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
}), X = u("$ZodString", (e, t)=>{
    var r;
    let n;
    H.init(e, t), e._zod.pattern = [
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
}), G = u("$ZodNumber", (e, t)=>{
    H.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? F, e._zod.parse = (r, n)=>{
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
}), K = u("$ZodBoolean", (e, t)=>{
    H.init(e, t), e._zod.pattern = V, e._zod.parse = (r, n)=>{
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
}), Q = u("$ZodNull", (e, t)=>{
    H.init(e, t), e._zod.pattern = W, e._zod.values = new Set([
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
}), Y = u("$ZodNever", (e, t)=>{
    H.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function ee(e, t, r) {
    e.issues.length && t.issues.push(...T(r, e.issues)), t.value[r] = e.value;
}
const et = u("$ZodArray", (e, t)=>{
    H.init(e, t), e._zod.parse = (r, n)=>{
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
            o instanceof Promise ? a.push(o.then((t)=>ee(t, r, e))) : ee(o, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function er(e, t, r, n, i) {
    if (e.issues.length) {
        if (i && !(r in n)) return;
        t.issues.push(...T(r, e.issues));
    }
    void 0 === e.value ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
const en = u("$ZodObject", (e, t)=>{
    let r;
    H.init(e, t);
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
        if (!$(s)) return t.issues.push({
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
            a instanceof Promise ? o.push(a.then((r)=>er(r, t, e, s, i))) : er(a, t, e, s, i);
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
                a instanceof Promise ? e.push(a.then((e)=>er(e, r, i, t, c))) : er(a, r, i, t, c);
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
function ei(e, t, r, n) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let i = e.filter((e)=>!N(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>I(e, n, g())))
    }), t);
}
const ea = u("$ZodUnion", (e, t)=>{
    H.init(e, t), w(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), w(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), w(e._zod, "values", ()=>{
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
        return s ? Promise.all(o).then((t)=>ei(t, i, e, a)) : ei(o, i, e, a);
    };
}), es = u("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, ea.init(e, t);
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
        if (!$(s)) return i.issues.push({
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
}), eo = u("$ZodRecord", (e, t)=>{
    H.init(e, t), e._zod.parse = (r, n)=>{
        let i = r.value;
        if (!j(i)) return r.issues.push({
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
                    t.issues.length && r.issues.push(...T(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...T(e, s.issues)), r.value[e] = s.value);
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
            if ("string" == typeof s && F.test(s) && o.issues.length) {
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
                    issues: o.issues.map((e)=>I(e, n, g())),
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
                e.issues.length && r.issues.push(...T(s, e.issues)), r.value[o.value] = e.value;
            })) : (l.issues.length && r.issues.push(...T(s, l.issues)), r.value[o.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), el = u("$ZodEnum", (e, t)=>{
    var r;
    let n;
    H.init(e, t);
    let i = (n = Object.values(r = t.entries).filter((e)=>"number" == typeof e), Object.entries(r).filter(([e, t])=>-1 === n.indexOf(+e)).map(([e, t])=>t)), a = new Set(i);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${i.filter((e)=>O.has(typeof e)).map((e)=>"string" == typeof e ? P(e) : e.toString()).join("|")})$`), e._zod.parse = (t, r)=>{
        let n = t.value;
        return a.has(n) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: n,
            inst: e
        }), t;
    };
}), ed = u("$ZodLiteral", (e, t)=>{
    if (H.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? P(e) : e ? P(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (n, i)=>{
        let a = n.value;
        return r.has(a) || n.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
            inst: e
        }), n;
    };
});
function ec(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const ep = u("$ZodOptional", (e, t)=>{
    H.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", w(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), w(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${v(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let n = t.innerType._zod.run(e, r);
            return n instanceof Promise ? n.then((t)=>ec(t, e.value)) : ec(n, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, r);
    };
}), eu = u("$ZodNullable", (e, t)=>{
    H.init(e, t), w(e._zod, "optin", ()=>t.innerType._zod.optin), w(e._zod, "optout", ()=>t.innerType._zod.optout), w(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${v(e.source)}|null)$`) : void 0;
    }), w(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), ef = u("$ZodCatch", (e, t)=>{
    H.init(e, t), w(e._zod, "optin", ()=>t.innerType._zod.optin), w(e._zod, "optout", ()=>t.innerType._zod.optout), w(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let n = t.innerType._zod.run(e, r);
        return n instanceof Promise ? n.then((n)=>(e.value = n.value, n.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: n.issues.map((e)=>I(e, r, g()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = n.value, n.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: n.issues.map((e)=>I(e, r, g()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), e_ = u("$ZodLazy", (e, t)=>{
    H.init(e, t), w(e._zod, "innerType", ()=>t.getter()), w(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), w(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), w(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), w(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
    H.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>U(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>B(e, t, r), e.parseAsync = async (t, r)=>Z(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>q(e, t, r), e.check = (...r)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, r)=>S(e, t, r), e.brand = ()=>e, e.register = (t, r)=>(t.add(e, r), e), e.apply = (t)=>t(e);
}), eg = u("ZodMiniString", (e, t)=>{
    X.init(e, t), eb.init(e, t);
});
function eh(e) {
    return new eg({
        type: "string",
        ...M(e)
    });
}
const em = u("ZodMiniNumber", (e, t)=>{
    G.init(e, t), eb.init(e, t);
});
function ev(e) {
    return new em({
        type: "number",
        checks: [],
        ...M(e)
    });
}
const ey = u("ZodMiniBoolean", (e, t)=>{
    K.init(e, t), eb.init(e, t);
});
function ew(e) {
    return new ey({
        type: "boolean",
        ...M(e)
    });
}
const ex = u("ZodMiniNull", (e, t)=>{
    Q.init(e, t), eb.init(e, t);
}), ek = u("ZodMiniNever", (e, t)=>{
    Y.init(e, t), eb.init(e, t);
});
function ez(e) {
    return new ek({
        type: "never",
        ...M(e)
    });
}
const e$ = u("ZodMiniArray", (e, t)=>{
    et.init(e, t), eb.init(e, t);
});
function ej(e, t) {
    return new e$({
        type: "array",
        element: e,
        ...M(t)
    });
}
const eO = u("ZodMiniObject", (e, t)=>{
    en.init(e, t), eb.init(e, t), w(e, "shape", ()=>t.shape);
});
function eP(e, t) {
    return new eO({
        type: "object",
        shape: e ?? {},
        ...M(t)
    });
}
const eS = u("ZodMiniUnion", (e, t)=>{
    ea.init(e, t), eb.init(e, t);
});
function eE(e, t) {
    return new eS({
        type: "union",
        options: e,
        ...M(t)
    });
}
const eM = u("ZodMiniDiscriminatedUnion", (e, t)=>{
    es.init(e, t), eb.init(e, t);
});
function eN(e, t, r) {
    return new eM({
        type: "union",
        options: t,
        discriminator: e,
        ...M(r)
    });
}
const eT = u("ZodMiniRecord", (e, t)=>{
    eo.init(e, t), eb.init(e, t);
});
function eC(e, t, r) {
    return new eT({
        type: "record",
        keyType: e,
        valueType: t,
        ...M(r)
    });
}
const eI = u("ZodMiniEnum", (e, t)=>{
    el.init(e, t), eb.init(e, t), e.options = Object.values(t.entries);
});
function eL(e, t) {
    return new eI({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...M(t)
    });
}
const eD = u("ZodMiniLiteral", (e, t)=>{
    ed.init(e, t), eb.init(e, t);
});
function eR(e, t) {
    return new eD({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...M(t)
    });
}
const eA = u("ZodMiniOptional", (e, t)=>{
    ep.init(e, t), eb.init(e, t);
});
function eU(e) {
    return new eA({
        type: "optional",
        innerType: e
    });
}
const eZ = u("ZodMiniNullable", (e, t)=>{
    eu.init(e, t), eb.init(e, t);
});
function eB(e) {
    return new eZ({
        type: "nullable",
        innerType: e
    });
}
const eq = u("ZodMiniCatch", (e, t)=>{
    ef.init(e, t), eb.init(e, t);
}), eF = u("ZodMiniLazy", (e, t)=>{
    e_.init(e, t), eb.init(e, t);
});
function eV() {
    let e = new eF({
        type: "lazy",
        getter: ()=>eE([
                eh(),
                ev(),
                ew(),
                new ex({
                    type: "null",
                    ...M(void 0)
                }),
                ej(e),
                eC(eh(), e)
            ])
    });
    return e;
}
let eW = eP({
    error: eE([
        eh(),
        eP({
            code: eh(),
            message: eh()
        })
    ])
});
class eJ extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eH(e) {
    let t = eW.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eJ("rpc", e) : new eJ(e.code, e.message);
    }
    return e;
}
const eX = eP({
    status: eR("pending"),
    job: eh()
});
eN("status", [
    eP({
        status: eR("pending")
    }),
    eP({
        status: eR("ready"),
        chunk: ev(),
        chunks: ev(),
        bytes: ev(),
        data: eh()
    })
]);
let eG = eh(), eK = ev(), eQ = ew(), eY = eU(eG), e0 = eU(eK), e1 = eU(eQ);
const e2 = eL([
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
]), e5 = eL([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), e8 = eP({
    id: eG,
    name: eU(eB(eG)),
    kind: eL([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eG,
    state: eG,
    reason: eY,
    revision: eY,
    current_revision: e1,
    management_fresh: e1,
    operation_id: e0,
    task_id: eU(eB(eK)),
    updated_at: e0,
    changes: eU(ej(eP({
        name: eG,
        desired: eG
    })))
});
let e4 = eP({
    state: eG,
    reason: eY,
    task_id: eU(eB(eK)),
    instance: e0
});
const e3 = eP({
    cwmp_id: eG,
    state: eL([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: eQ,
    last_inform: eB(eK),
    age_seconds: eB(eK)
});
let e6 = eP({
    state: eL([
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
    method: eY,
    reason: eY,
    mqtt_target: eB(eG),
    binding_source: eY,
    link_identity_error: eB(eG),
    mqtt_last_seen: eB(eK),
    cwmp_id: eY,
    desired_version: eY,
    generation: e0,
    inflight: e1,
    attempts: e0,
    next_retry_at: e0,
    updated_at: e0,
    settings_verified_at: eB(eK),
    last_inform: eB(eK),
    last_error: eU(eB(eG)),
    persistence_error: eU(eB(eG)),
    desired: eU(eB(eP({
        vlan: eK,
        vlans: ej(eK),
        priority: eK,
        acs_url: eG
    }))),
    listener: eU(eP({
        enabled: eQ,
        listen: eG,
        path: eG,
        error: eB(eG)
    })),
    endpoint_notice: eY,
    manual_steps: eU(ej(eG))
});
const e7 = eN("state", [
    e6,
    function(e, t) {
        if (!j(t)) throw Error("Invalid input to extend: expected a plain object");
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
        return S(e, n);
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
                    t[e] && (n[e] = eA ? new eA({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)n[e] = eA ? new eA({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return x(this, "shape", n), n;
            },
            checks: []
        });
        return S(e, n);
    }(e6), {
        state: eL([
            "pending",
            "unavailable"
        ]),
        reason: eG
    })
]), e9 = eP({
    backend: eU(eP({
        configured: eG,
        effective: eG,
        available: ej(eG),
        reason: eG
    })),
    state: e2,
    operation_id: e0,
    device: eY,
    optical_sn: eY,
    cwmp_id: eY,
    revision: eY,
    mode: eU(eL([
        "apply",
        "plan"
    ])),
    started_at: e0,
    current_revision: e1,
    management_fresh: e1,
    reason: eY,
    error: eY,
    attempts: e0,
    next_retry_at: e0,
    reconcile_reason: eY,
    items: ej(e8),
    cwmp_contract: eU(eP({
        state: eG,
        requested: eG,
        contract: eB(eG),
        reason: eG,
        cache_hit: eQ,
        schema: eG,
        capabilities: eB(eP({
            wan: eG,
            wlan: eG,
            binding: eG
        }))
    })),
    wan_objects: eU(eC(eG, eV())),
    wan_lifecycle: eU(eC(eG, e4)),
    wan_stage: eU(eL([
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
    wifi_objects: eU(eP({
        owned: ej(eK),
        pending: eB(eG),
        pending_instance: eB(eK)
    })),
    wifi_lifecycle: eU(eC(eG, e4)),
    wifi_stage: eU(eL([
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
    wifi_cleanup: eU(eL([
        "disable",
        "preserve",
        "delete"
    ]))
});
let te = eP({
    enabled: eQ,
    mode: eL([
        "auto",
        "manual"
    ]),
    vlan: ej(eK),
    priority: eK,
    address: eG,
    acs_url: eG,
    port: eK,
    path: eG,
    dhcp_enabled: eQ
}), tt = eP({
    state: eL([
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
    error: eB(eG),
    inflight: eQ,
    ready: eQ,
    desired_version: eB(eG),
    applied_version: eB(eG),
    next_retry_at: eK,
    attempts: eK,
    desired: eB(te),
    applied: eB(te),
    previous: eB(te),
    plan: ej(eP({
        operation: eG,
        key: eG,
        value: ej(eG)
    }))
});
const tr = eP({
    device: eG,
    name: eB(eG),
    group: eB(eG),
    group_name: eB(eG),
    template: eB(eG),
    template_name: eB(eG),
    optical_sn: eG,
    adapter: eG,
    omci_management: eP({
        state: eG,
        reason: eU(eB(eG))
    }),
    management: eB(e3),
    acs_bootstrap: e7,
    provisioning: e9,
    services: ej(e8),
    ssids: ej(e8),
    wifi_sync: e5
}), tn = eP({
    enabled: eQ,
    mode: eL([
        "auto",
        "manual"
    ]),
    method: eR("diff"),
    revision: eG,
    triggers: ej(eG),
    interval_minutes: new em({
        type: "number",
        coerce: !0,
        checks: [],
        ...M(void 0)
    }),
    error: eB(eG),
    devices: ej(tr),
    management_network: tt,
    omci_management: eV(),
    groups: ej(eP({
        id: eG,
        name: eB(eG),
        template: eG
    })),
    pending_devices: ej(eG)
});
eE([
    eP({
        valid: eR(!0),
        revision: eG,
        devices: eK,
        error: eU(ez())
    }),
    eP({
        error: eG,
        valid: eU(ez()),
        revision: eU(ez()),
        devices: eU(ez())
    })
]);
let ti = eh(), ta = ev(), ts = eB(ta), to = eC(ti, eP({
    source: ti,
    unit: ti,
    reason: eB(ti),
    raw: eB(ti),
    age_seconds: ts
}));
const tl = eP({
    phase: eL([
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
    generation: ta,
    error: eB(ti)
}), td = eL([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tc = eP({
    model: ti,
    wavelength_tx_nm: ta,
    wavelength_rx_nm: ta,
    phy_rate_downlink_gbps: ta,
    phy_rate_uplink_gbps: ta,
    tx_power_dbm: ts,
    laser_bias_current_ma: ts,
    temperature_celsius: ts,
    vcc_voltage: ts,
    cdr_locked: eB(ew()),
    tx_enabled: eB(ew()),
    measurements: to
}), tp = eP({
    equipment_id: eB(ti),
    hardware_version: eB(ti),
    software_images: ej(ti),
    omcc_version: ts,
    errors: ej(ti)
});
const tu = eP({
    onu_id: ta,
    vendor: ti,
    model: ti,
    serial_number: ti,
    state: td,
    business_status: tl,
    management: eB(e3),
    provisioning: eB(e9),
    services: ej(e8),
    ssids: ej(e8),
    wifi_sync: e5,
    acs_bootstrap: eU(e7),
    identity: eB(tp),
    identity_age_seconds: ts,
    identity_current: ew(),
    fiber_distance_m: ts,
    ranging_delay_rtd_ns: ts,
    equalization_delay_bits: new eq({
        type: "catch",
        innerType: ts,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: ts,
    optical_tx_power_dbm: ts,
    firmware_version: ti,
    hardware_version: ti,
    uptime_seconds: ts,
    data_path: eP({
        interface: ti,
        gem_ports: eB(ej(ta)),
        vlan_id: ts,
        tx_bytes: ts,
        rx_bytes: ts,
        current_tx_kbps: ts,
        current_rx_kbps: ts,
        offload: eU(eP({
            enabled: eU(eB(ew())),
            routed_enabled: eU(eB(ew())),
            bridge_enabled: eU(eB(ew())),
            engine_attached: eU(eB(ew())),
            forwarding_verified: eU(eB(ew()))
        })),
        measurements: to
    }),
    wifi_mesh: eP({
        channel_2g: ts,
        channel_5g: ts,
        bandwidth_5g: eB(ti),
        tx_power_pct: ts,
        measurements: to
    }),
    connected_clients: eB(ej(eP({
        mac: ti,
        ip: ti,
        band: ti,
        rssi_dbm: ts,
        rx_rate_mbps: ts,
        tx_rate_mbps: ts
    }))),
    measurements: to
});
let tf = eP({
    reserved_sn: eU(ti),
    port: ta,
    interface: ti,
    carrier: ew(),
    status: ti,
    onu_id: eU(ta),
    onu_sn: eU(ti),
    link_state: ti
});
const t_ = eP({
    index: ti,
    state: ti,
    pkt_type: ti,
    orig_tuple: ti,
    new_tuple: ti,
    eth: ti,
    vlan: ti,
    packets: ta,
    bytes: ta
}), tb = eP({
    supported: ew(),
    engine_attached: ew(),
    bridge_offload_enabled: ew(),
    bridge_offload_mask: ta,
    routed_offload_mask: ta,
    bridge_offload_debug: ew(),
    bridge: ti,
    active_ports: ej(ti),
    fw4_hooks_ready: ew(),
    total_entries: ta,
    bound_entries: ta,
    total_packets: ta,
    total_bytes: ta,
    bound_flows: ej(t_)
}), tg = eP({
    onu_pinning: eU(eP({
        desired: eC(ti, ta),
        active: eC(ti, ta),
        pending_restart: ew(),
        allocation_blocked: ew(),
        startup_error: eB(ti),
        config_error: eB(ti)
    })),
    fpga_status: ti,
    provisioning: eB(tn),
    optical_transceiver: tc,
    switch_ports: ej(tf),
    sub_gateways: ej(tu),
    telemetry_gateways: ej(eP({
        id: ti,
        last_seen_sec_ago: ta,
        last_payload_bytes: ta
    })),
    npu: eU(eB(tb))
});
eC(ti, eP({
    carrier: eU(ew()),
    mac: eU(ti),
    link: eU(eP({
        speed: eU(ta),
        duplex: eU(ti),
        autoneg: eU(ew())
    })),
    stats: eU(eC(ti, ta))
}));
const th = {
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
let tm = L.rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: !0
});
L.rpc.declare({
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
});
const tv = async ()=>tg.parse(eH(await tm())), ty = eP({
    schema_version: eR(1),
    status: eL([
        "success",
        "error"
    ]),
    action: eL([
        "optical_on",
        "optical_off",
        "optical_status",
        "optical_reload",
        "optical_reinitialize",
        "optical_shutdown"
    ]),
    desired_enabled: eB(ew()),
    tx_enabled: eB(ew()),
    actor_state: eL([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: ew(),
    discovery_active: ew(),
    cleanup_pending: ew(),
    error: eB(eP({
        code: eh(),
        message: eh()
    }))
});
let tw = L.rpc.declare({
    object: "luci.fttr",
    method: "optical_status",
    reject: !0
}), tx = L.rpc.declare({
    object: "luci.fttr",
    method: "optical_set",
    params: [
        "enabled"
    ],
    reject: !0
});
const tk = async ()=>ty.parse(await tw()), tz = async (e)=>ty.parse(await tx(e)), t$ = eP({
    status: eL([
        "success",
        "error"
    ]),
    enabled: eU(ew()),
    error: eU(eh())
});
L.rpc.declare({
    object: "luci.fttr",
    method: "npu_status",
    reject: !0
});
let tj = L.rpc.declare({
    object: "luci.fttr",
    method: "npu_set",
    params: [
        "enabled"
    ],
    reject: !0
});
const tO = async (e)=>t$.parse(await tj(e));
eE([
    eP({
        operation_ids: ej(ev()),
        revision: eh()
    }),
    eP({
        started: eR(!0),
        mode: eL([
            "apply",
            "plan"
        ])
    }),
    eP({
        reset: eR(!0),
        device: eh()
    }),
    eP({
        operation_ids: ej(ev()),
        mode: eL([
            "apply",
            "plan"
        ]),
        reconcile: eU(ew()),
        retry: eU(ew())
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
}), eP({
    source: eL([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: eh(),
    size: ev(),
    sha256: eh(),
    data: eU(eh()),
    factory: eP({
        detected: ew(),
        device: eh(),
        has_data: ew(),
        sha256: eh(),
        data: eh()
    }),
    firmware: eP({
        exists: ew(),
        path: eh(),
        size: ev(),
        sha256: eh(),
        data: eh()
    }),
    error: eU(eh())
}), eP({
    success: ew(),
    path: eh(),
    size: ev(),
    sha256: eh(),
    error: eU(eh())
}), eP({
    success: ew(),
    output: eU(eh()),
    error: eU(eh())
});
let tP = eh(), tS = ev(), tE = ew(), tM = eP({
    id: tP,
    url: tP
}), tN = eP({
    name: tP,
    kind: eL([
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
    index: tS,
    mask: tS,
    size: tS,
    read: tE,
    write: tE,
    set_by_create: tE,
    avc: tE,
    optional: tE,
    deprecated: tE,
    default_hex: eB(tP),
    reference: tM
}), tT = eN("type", [
    eP({
        type: eR("unsigned"),
        value: tS
    }),
    eP({
        type: eR("signed"),
        value: tS
    }),
    eP({
        type: eR("decimal"),
        value: tP
    }),
    eP({
        type: eR("text"),
        value: eB(tP)
    }),
    eP({
        type: eR("octets"),
        hex: tP
    }),
    eP({
        type: eR("table_length"),
        bytes: tS
    })
]), tC = eP({
    code: tP,
    message: tP,
    offset: tS,
    mask: tS
}), tI = eL([
    "layout",
    "name_only",
    "unknown"
]), tL = eP({
    raw_hex: tP,
    filter_outer_priority: tS,
    filter_outer_vid: tS,
    filter_outer_tpid_dei: tS,
    filter_inner_priority: tS,
    filter_inner_vid: tS,
    filter_inner_tpid_dei: tS,
    filter_ethertype: tS,
    tags_to_remove: tS,
    treatment_outer_priority: tS,
    treatment_outer_vid: tS,
    treatment_outer_tpid_dei: tS,
    treatment_inner_priority: tS,
    treatment_inner_vid: tS,
    treatment_inner_tpid_dei: tS,
    delete_entry: tE
}), tD = eP({
    schema_version: eR(1),
    reference_version: tP,
    onu_id: eB(tS),
    uploaded_complete: tE,
    expected_records: tS,
    received_records: tS,
    decoded_records: tS,
    partial_records: tS,
    basic_records: tS,
    tables_requested: tE,
    tables_collected: tE,
    classes: ej(eP({
        class_id: tS,
        name: eB(tP),
        entities: tS,
        records: tS,
        support: tI
    })),
    entities: ej(eP({
        class_id: tS,
        entity_id: tS,
        name: eB(tP),
        support: tI,
        reference: eB(tM),
        sequences: ej(tS),
        attributes: ej(eP({
            definition: tN,
            value: eB(tT),
            observations: ej(eP({
                raw_hex: tP,
                value: tT,
                sequences: ej(tS)
            }))
        })),
        diagnostics: ej(tC)
    })),
    records: ej(eP({
        class_id: tS,
        entity_id: tS,
        sequence: tS,
        attribute_mask: tS,
        raw_hex: tP,
        consumed: tS,
        remaining_hex: tP,
        undecoded_mask: tS
    })),
    tables: ej(eP({
        class_id: tS,
        entity_id: tS,
        attribute: tN,
        collected: tE,
        error: eB(tP),
        raw_hex: tP,
        rows: ej(tP),
        vlan_rules: ej(tL)
    })),
    diagnostics: ej(tC)
});
const tR = eP({
    status: eR("ready"),
    report: tD
});
let tA = eP({
    phase: eL([
        "starting",
        "upload",
        "tables"
    ]),
    received: tS,
    expected: eB(tS)
}), tU = eN("status", [
    eP({
        status: eR("pending"),
        progress: eU(tA)
    }),
    eP({
        status: eR("ready"),
        chunk: tS,
        chunks: tS,
        bytes: tS,
        data: tP
    })
]), tZ = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_start",
    params: [
        "onu_id",
        "optical_sn",
        "tables"
    ],
    reject: !0
}), tB = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
}), tq = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_release",
    params: [
        "job"
    ],
    reject: !0
});
const tF = async (e, t, r)=>eX.parse(eH(await tZ(e, t, r))), tV = async (e, t)=>tU.parse(eH(await tB(e, t))), tW = async (e)=>eP({
        released: tE
    }).parse(eH(await tq(e)));
function tJ(e) {
    let t = "none" === e.tone ? "" : `fttr-badge fttr-badge-${e.tone}`, r = e.class ? ` ${e.class}` : "", n = s("span", {
        class: `${t}${r}`.trim(),
        children: e.children
    });
    return e.title && n.setAttribute("title", e.title), n;
}
const tH = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
};
function tX(e) {
    var t;
    let r = (t = e.state) ? "o5_operation" === t ? {
        tone: "success",
        label: tH.o5_operation,
        title: t
    } : {
        tone: "warning",
        label: tH[t] ?? o(t),
        title: t
    } : {
        tone: "none",
        label: "\u2014"
    };
    return s(tJ, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
function tG(e) {
    var t;
    let r = (t = e.status) ? {
        tone: "verified" === t.phase ? "success" : t.error || "wan_bootstrap_pending" === t.phase ? "warning" : "neutral",
        label: `${th[t.phase]} \xb7 ${t.generation}${t.error ? ` \xb7 ${t.error}` : ""}`,
        title: t.error || void 0
    } : {
        tone: "neutral",
        label: "\u2014"
    };
    return s(tJ, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const tK = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
};
function tQ(e) {
    var t;
    let r, n, i, a, l, c, p = (t = e.management, r = t?.state, n = d(t?.age_seconds ?? (t?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - t.last_inform) : null)), a = (i = t?.last_inform ? new Date(1000 * t.last_inform).toLocaleString() : null) ? _("Last Inform: %s").replace("%s", i) : void 0, l = "\u2014", c = "none", "online" === r ? (c = "success", l = tK.online) : "waiting_inform" === r ? (c = "warning", l = tK.waiting_inform) : "offline_or_stale" === r ? (c = "danger", l = tK.offline_or_stale) : r && (c = "neutral", l = o(r)), {
        tone: c,
        label: n && r ? `${l} \xb7 ${n}` : l,
        title: a
    });
    return s(tJ, {
        tone: p.tone,
        title: p.title,
        children: p.label
    });
}
const tY = {
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
function t0(e) {
    var t, r;
    let n, i, a, l = (t = e.provisioning, r = e.title, n = t?.state, i = t?.next_retry_at && t.next_retry_at > Math.floor(Date.now() / 1000) ? t.next_retry_at - Math.floor(Date.now() / 1000) : 0, a = r ?? (t?.current_revision === !1 ? _("Previous configuration") : t?.management_fresh === !1 ? _("Management stale") : t?.reconcile_reason ? t.reconcile_reason : i > 0 ? _("Next self-healing retry in %d seconds").replace("%d", String(i)) : t?.reason ?? t?.error), n && "not_started" !== n ? "completed" === n || "verified" === n ? {
        tone: "success",
        label: "completed" === n ? tY.completed : _("Ready"),
        title: a
    } : "wan_reconciling" === n || "wan_verifying" === n || "wifi_reconciling" === n || "discovering" === n || "reading" === n || "disabling" === n || "disabling_read" === n || "writing" === n || "verifying" === n || "settling" === n || "recovering" === n || "waiting_task" === n ? {
        tone: "info",
        label: tY[n] ?? o(n),
        title: a
    } : "interrupted" === n || "failed" === n || "error" === n || "blocked" === n ? {
        tone: "danger",
        label: "blocked" === n ? tY.blocked : tY.interrupted,
        title: a
    } : "waiting" === n || "pending" === n || "waiting_management" === n || "reset_pending" === n ? {
        tone: "warning",
        label: tY[n] ?? tY.waiting,
        title: a
    } : {
        tone: "neutral",
        label: o(n),
        title: a
    } : {
        tone: "neutral",
        label: tY.not_started,
        title: a
    });
    return s(tJ, {
        tone: l.tone,
        title: l.title,
        children: l.label
    });
}
const t1 = {
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
function t2(e) {
    var t;
    let r = (t = e.state) && "not_configured" !== t ? "verified" === t ? {
        tone: "success",
        label: t1.verified
    } : "attention_required" === t ? {
        tone: "danger",
        label: t1.attention_required
    } : "stale_revision" === t || "stale_management" === t || "waiting_management" === t ? {
        tone: "warning",
        label: t1[t]
    } : "recovering" === t ? {
        tone: "info",
        label: t1.recovering
    } : "accepted_unverified" === t || "pending" === t ? {
        tone: "warning",
        label: t1[t]
    } : {
        tone: "neutral",
        label: o(t)
    } : {
        tone: "neutral",
        label: t1.not_configured
    };
    return s(tJ, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const t5 = `
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
let t8 = (e)=>JSON.stringify(e, null, 2);
async function t4(e) {
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
function t3(e) {
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
let t6 = L.view, t7 = null, t9 = null, re = null, rt = !1, rr = 0;
function rn(e) {
    let t = re;
    if (!t) return;
    let r = t.querySelector('[data-fttr="laser-state"]'), n = t.querySelector('[data-fttr="laser-toggle"]');
    if (!(r instanceof HTMLElement) || !(n instanceof HTMLButtonElement)) return;
    !0 === e ? (r.textContent = _("TX enabled (reset readback)"), r.className = "fttr-badge fttr-badge-success") : !1 === e ? (r.textContent = _("Off (TX disabled)"), r.className = "fttr-badge fttr-badge-warning") : (r.textContent = _("Unknown"), r.className = "fttr-badge fttr-badge-neutral"), n.textContent = !1 === e ? _("Turn laser on") : _("Turn laser off"), n.disabled = rt, n.onclick = async ()=>{
        if (rt) return;
        let e = !1 === t7, t = e ? _("Re-enable the 1490nm downlink laser? Discovery resumes and sub-gateways can register again.") : _("Turn off the 1490nm downlink laser? All sub-gateways are gracefully disconnected and cannot register until the laser is re-enabled. This setting is saved and reapplied after a reboot.");
        if (window.confirm(t)) {
            rt = !0, rr++, rn(t7);
            try {
                let t = await tz(e);
                if (t9 = t, t7 = t.tx_enabled, "error" === t.status) return void window.alert(`${_("Failed to change laser output")}: ${t.error?.message ?? _("unknown error")}`);
            } catch (e) {
                t7 = null, t9 = null, window.alert(`${_("Failed to change laser output")}: ${String(e)}`);
            } finally{
                rt = !1, rn(t7);
            }
        }
    };
    let i = t.querySelector('[data-fttr="laser-detail"]');
    if (i instanceof HTMLElement) {
        let e = t9?.desired_enabled;
        i.textContent = [
            !0 === e ? _("Saved setting: on") : !1 === e ? _("Saved setting: off") : _("Saved setting: unknown"),
            t9 ? t9.discovery_active ? _("Discovery active") : _("Discovery paused") : _("Discovery state: unknown"),
            t9?.cleanup_pending ? _("ONU cleanup pending") : "",
            t9?.error?.message ?? ""
        ].filter(Boolean).join(" \xb7 ");
    }
}
let ri = null, ra = null, rs = !1, ro = 0;
function rl(e) {
    let t = ra;
    if (!t) return;
    let r = t.querySelector('[data-fttr="npu-state"]'), n = t.querySelector('[data-fttr="npu-toggle"]');
    r instanceof HTMLElement && n instanceof HTMLButtonElement && (!0 === e ? (r.textContent = _("Enabled"), r.className = "fttr-badge fttr-badge-success") : !1 === e ? (r.textContent = _("Disabled"), r.className = "fttr-badge fttr-badge-warning") : (r.textContent = _("Unknown"), r.className = "fttr-badge fttr-badge-neutral"), n.textContent = !1 === e ? _("Turn NPU offload on") : _("Turn NPU offload off"), n.disabled = rs, n.onclick = async ()=>{
        if (rs) return;
        let e = !1 === ri, t = e ? _("Enable NPU / PPE hardware offload for FTTR bridge traffic?") : _("Disable NPU / PPE hardware offload? Traffic will fall back to Linux software bridge.");
        if (window.confirm(t)) {
            rs = !0, ro++, rl(ri);
            try {
                let t = await tO(e);
                if (ri = t.enabled ?? e, "error" === t.status) return void window.alert(`${_("Failed to change NPU offload state")}: ${t.error ?? _("unknown error")}`);
            } catch (e) {
                ri = null, window.alert(`${_("Failed to change NPU offload state")}: ${String(e)}`);
            } finally{
                rs = !1, rl(ri);
            }
        }
    });
}
function rd(e) {
    var t, r, n, i, a, d, c, p, u, f, b, g, h, m, v, y, w, x, k, z, $;
    let j = e.optical_transceiver, O = s("span", {
        class: `fttr-badge ${"ready" === e.fpga_status ? "fttr-badge-success" : "fttr-badge-neutral"}`,
        style: "font-size:95%",
        children: "ready" === e.fpga_status ? _("Ready") : o(e.fpga_status)
    }), P = null === (t = j.cdr_locked) ? s("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: _("Unknown")
    }) : t ? s("span", {
        class: "fttr-badge fttr-badge-success",
        children: _("Locked")
    }) : s("span", {
        class: "fttr-badge fttr-badge-warning",
        children: _("Unlocked")
    });
    return $ = {
        class: "cbi-section fttr-panel-controller",
        children: [
            s("h3", {
                style: "margin-bottom:12px",
                children: _("Controller hardware")
            }),
            (x = {
                class: "fttr-grid-3",
                children: [
                    (a = {
                        class: "fttr-card",
                        children: [
                            s("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: _("FPGA status")
                            }),
                            (r = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("FPGA status")
                                    }),
                                    s("span", {
                                        children: O
                                    })
                                ]
                            }, s("div", r)),
                            (n = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("FPGA identifier")
                                    }),
                                    s("code", {
                                        children: o(e.fpga_status)
                                    })
                                ]
                            }, s("div", n)),
                            (i = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("CDR lock")
                                    }),
                                    s("span", {
                                        children: P
                                    })
                                ]
                            }, s("div", i))
                        ]
                    }, s("div", a)),
                    (f = {
                        class: "fttr-card",
                        children: [
                            s("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: _("Optical transceiver")
                            }),
                            (d = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Module model")
                                    }),
                                    s("strong", {
                                        children: o(j.model)
                                    })
                                ]
                            }, s("div", d)),
                            (c = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("TX wavelength")
                                    }),
                                    s("span", {
                                        children: j.wavelength_tx_nm ? `${j.wavelength_tx_nm} nm` : "\u2014"
                                    })
                                ]
                            }, s("div", c)),
                            (p = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("RX wavelength")
                                    }),
                                    s("span", {
                                        children: j.wavelength_rx_nm ? `${j.wavelength_rx_nm} nm` : "\u2014"
                                    })
                                ]
                            }, s("div", p)),
                            (u = {
                                class: "fttr-kv-row",
                                "data-fttr": "laser-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Laser output")
                                    }),
                                    s("span", {
                                        class: "fttr-badge fttr-badge-neutral",
                                        "data-fttr": "laser-state",
                                        children: _("Loading\u2026")
                                    })
                                ]
                            }, s("div", u)),
                            s("div", {
                                "data-fttr": "laser-detail",
                                style: "font-size:85%;margin-top:8px"
                            })
                        ]
                    }, s("div", f)),
                    (w = {
                        class: "fttr-card",
                        children: [
                            s("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: _("Physical rates and diagnostics")
                            }),
                            (b = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Downlink PHY rate")
                                    }),
                                    s("span", {
                                        children: j.phy_rate_downlink_gbps ? `${j.phy_rate_downlink_gbps} Gbps` : "\u2014"
                                    })
                                ]
                            }, s("div", b)),
                            (g = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Uplink PHY rate")
                                    }),
                                    s("span", {
                                        children: j.phy_rate_uplink_gbps ? `${j.phy_rate_uplink_gbps} Gbps` : "\u2014"
                                    })
                                ]
                            }, s("div", g)),
                            (h = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Temperature")
                                    }),
                                    s("span", {
                                        children: null == j.temperature_celsius ? "\u2014" : `${j.temperature_celsius} \xb0C`
                                    })
                                ]
                            }, s("div", h)),
                            (m = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("TX power")
                                    }),
                                    s("span", {
                                        children: l(j.tx_power_dbm)
                                    })
                                ]
                            }, s("div", m)),
                            (v = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Voltage")
                                    }),
                                    s("span", {
                                        children: null == j.vcc_voltage ? "\u2014" : `${j.vcc_voltage} V`
                                    })
                                ]
                            }, s("div", v)),
                            (y = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Bias current")
                                    }),
                                    s("span", {
                                        children: null == j.laser_bias_current_ma ? "\u2014" : `${j.laser_bias_current_ma} mA`
                                    })
                                ]
                            }, s("div", y))
                        ]
                    }, s("div", w))
                ]
            }, s("div", x)),
            (z = {
                class: "fttr-kv-row",
                style: "margin-top:10px",
                children: [
                    s("span", {
                        class: "fttr-kv-label",
                        children: _("Laser control")
                    }),
                    (k = {
                        children: s("button", {
                            class: "fttr-btn-subtle",
                            "data-fttr": "laser-toggle",
                            type: "button",
                            disabled: !0,
                            children: _("Loading\u2026")
                        })
                    }, s("span", k))
                ]
            }, s("div", z))
        ]
    }, s("div", $);
}
function rc(e) {
    var t, r;
    return e.length ? (t = {
        class: "fttr-panel-subgateways",
        children: e.map((e)=>{
            var t, r, n, i, c, p, u, f, b, g, h, m, v, y, w, x, k, z, $, j, O, P, S;
            let M = e.identity, N = M?.software_images ?? [], T = function(e) {
                if (!e) return {
                    display: "\u2014"
                };
                let t = e.match(/image\s*\d+:\s*([^;,\s]+)/i);
                return t?.[1] ? {
                    display: t[1],
                    full: e.replace(/;\s*/g, "\n")
                } : {
                    display: e
                };
            }(e.firmware_version), C = e.identity ? e.identity_current ? _("Current registration") : _("Cached identity") : _("Not collected"), I = s("span", {
                class: `fttr-badge ${e.identity_current ? "fttr-badge-info" : "fttr-badge-neutral"}`,
                style: "font-size:80%",
                children: C
            }), D = e.data_path?.offload?.bridge_enabled === !0 ? s("span", {
                class: "fttr-badge fttr-badge-success",
                title: _("NPU hardware offload admitted"),
                style: "font-size:80%",
                children: _("NPU Offloaded")
            }) : s("span", {
                class: "fttr-badge fttr-badge-neutral",
                title: _("Standard software forwarding"),
                style: "font-size:80%",
                children: _("Software")
            });
            return S = {
                class: "cbi-section fttr-onu-card",
                children: [
                    (p = {
                        class: "fttr-card-header",
                        children: [
                            (n = {
                                class: "fttr-card-title-group",
                                children: [
                                    s("h3", {
                                        style: "margin:0",
                                        children: _("Sub-gateway %s \u2014 %s").replace("%s", String(e.onu_id)).replace("%s", o(e.model))
                                    }),
                                    (r = {
                                        class: "fttr-card-meta-tags",
                                        children: [
                                            s("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                children: e.vendor
                                            }),
                                            s("code", {
                                                children: e.serial_number
                                            }),
                                            (t = e.state) ? "o5_operation" === t || "online" === t || "ready" === t || "connected" === t ? s("span", {
                                                class: "fttr-badge fttr-badge-success",
                                                title: t,
                                                children: "o5_operation" === t ? _("Connected") : _("Ready")
                                            }) : t.includes("O4") || t.includes("ranging") || t.includes("sync") ? s("span", {
                                                class: "fttr-badge fttr-badge-warning",
                                                title: t,
                                                children: t
                                            }) : s("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                title: t,
                                                children: t
                                            }) : s("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                children: "\u2014"
                                            }),
                                            I,
                                            D
                                        ]
                                    }, s("div", r))
                                ]
                            }, s("div", n)),
                            (c = {
                                children: (i = {
                                    type: "button",
                                    class: "fttr-btn-subtle",
                                    onclick: ()=>(function(e) {
                                            var t, r, n, i, d, c, p, u, f, b, g, h;
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
                                                                s(tX, {
                                                                    state: e.state
                                                                })
                                                            ],
                                                            [
                                                                _("Business"),
                                                                s(tG, {
                                                                    status: e.business_status
                                                                })
                                                            ],
                                                            [
                                                                _("Receive optical power"),
                                                                l(e.optical_rx_power_dbm)
                                                            ],
                                                            [
                                                                _("Transmit optical power"),
                                                                l(e.optical_tx_power_dbm)
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
                                                                s(tQ, {
                                                                    management: e.management
                                                                })
                                                            ],
                                                            [
                                                                _("Last Inform"),
                                                                e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
                                                            ],
                                                            [
                                                                _("Provisioning"),
                                                                s(t0, {
                                                                    provisioning: e.provisioning
                                                                })
                                                            ],
                                                            [
                                                                _("Wi-Fi sync"),
                                                                s(t2, {
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
                                                                                    children: n instanceof Node ? n : o(n)
                                                                                })
                                                                            ]
                                                                        }, s("tr", t);
                                                                    })
                                                                }, s("tbody", t))
                                                            }, s("table", r))
                                                        ]
                                                    }, s("div", n);
                                                })
                                            }, s("div", t)), z = (r = {
                                                class: "mib-status-bar",
                                                role: "status",
                                                children: s("span", {
                                                    class: "mib-hint-text",
                                                    children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                                                })
                                            }, s("div", r)), $ = (n = {
                                                class: "cbi-progressbar",
                                                style: "display:none;width:100%",
                                                title: "0%",
                                                children: s("div", {
                                                    style: "width:0%"
                                                })
                                            }, s("div", n)), j = s("div", {}), O = s("pre", {
                                                class: "onu-raw-pre"
                                            }), P = s("span", {
                                                class: "download-status",
                                                role: "status"
                                            }), S = null, M = s("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                disabled: !0,
                                                onclick: async ()=>{
                                                    if (w && !v) {
                                                        M.disabled = !0, P.textContent = _("Preparing JSON download\u2026");
                                                        try {
                                                            let t = await t4(w);
                                                            if (v) return;
                                                            S && URL.revokeObjectURL(S), S = URL.createObjectURL(t);
                                                            let r = document.createElement("a");
                                                            r.href = S, r.download = `mib-${e.serial_number}.json`, r.click(), P.textContent = _("JSON download started"), window.setTimeout(()=>{
                                                                URL.revokeObjectURL(r.href), S === r.href && (S = null);
                                                            }, 1000);
                                                        } catch (e) {
                                                            P.textContent = String(e);
                                                        } finally{
                                                            M.disabled = !w || v;
                                                        }
                                                    }
                                                },
                                                children: _("Download JSON")
                                            }), N = (d = {
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
                                                                    M,
                                                                    P
                                                                ]
                                                            })
                                                        ]
                                                    }, s("div", i)),
                                                    O
                                                ]
                                            }, s("div", d)), T = s("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-apply",
                                                onclick: ()=>q(!1),
                                                children: _("Read MIB")
                                            }), C = s("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                onclick: ()=>q(!0),
                                                children: _("Read MIB and VLAN tables")
                                            }), I = (u = {
                                                class: "onu-mib-panel",
                                                children: [
                                                    (p = {
                                                        class: "mib-controls",
                                                        children: [
                                                            (c = {
                                                                class: "mib-action-group",
                                                                children: [
                                                                    T,
                                                                    C,
                                                                    s("small", {
                                                                        class: "mib-action-hint",
                                                                        children: _("Collecting VLAN tables queries extended filter tables and takes longer.")
                                                                    })
                                                                ]
                                                            }, s("div", c)),
                                                            z,
                                                            $
                                                        ]
                                                    }, s("div", p)),
                                                    j
                                                ]
                                            }, s("div", u)), D = {
                                                basic: k,
                                                mib: I,
                                                raw: N
                                            }, R = new Map();
                                            function A(e) {
                                                for (let [t, r] of Object.entries(D))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                                                for (let [t, r] of R)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
                                            }
                                            let U = (f = {
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
                                                        children: s("a", {
                                                            href: `#tab-${e.id}`,
                                                            onclick: (t)=>{
                                                                t.preventDefault(), A(e.id);
                                                            },
                                                            children: e.label
                                                        })
                                                    }, s("li", t));
                                                    return R.set(e.id, r), r;
                                                })
                                            }, s("ul", f)), Z = (h = {
                                                children: [
                                                    s("div", {
                                                        class: "onu-details-header",
                                                        children: U
                                                    }),
                                                    (b = {
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
				${t5}
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
                                                            I,
                                                            N
                                                        ]
                                                    }, s("div", b)),
                                                    (g = {
                                                        class: "right onu-details-footer",
                                                        children: s("button", {
                                                            type: "button",
                                                            class: "cbi-button",
                                                            onclick: ()=>{
                                                                v = !0, S && URL.revokeObjectURL(S), S = null, w = null, O.textContent = "", j.replaceChildren(), L.ui.hideModal();
                                                            },
                                                            children: _("Close")
                                                        })
                                                    }, s("div", g))
                                                ]
                                            }, s(a, h)), B = ()=>!v && Z.isConnected && Z.getClientRects().length > 0;
                                            async function q(t) {
                                                if (!y) {
                                                    y = !0, T.disabled = C.disabled = !0, $.style.display = "", $.title = "0%", $.firstElementChild.style.width = "0%", z.textContent = _("Reading MIB\u2026");
                                                    try {
                                                        let v = await tv(), y = v.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                                        if (y?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                                        if (!B()) return;
                                                        let k = await tF(y.onu_id, y.serial_number, t);
                                                        x = k.job;
                                                        let P = Date.now() + 140000;
                                                        for(; B();){
                                                            let e = await tV(k.job, 0);
                                                            if (!B()) return;
                                                            if ("ready" === e.status) {
                                                                var r, n, i, a, l, d, c, p, u, f, b, g, h, m;
                                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                                let t = new Uint8Array(e.bytes), v = 0;
                                                                for(let r = 0; r < e.chunks; r++){
                                                                    let n = 0 === r ? e : await tV(k.job, r);
                                                                    if (!B()) return;
                                                                    if ("ready" !== n.status || n.chunk !== r || n.chunks !== e.chunks || n.bytes !== e.bytes || !n.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                                    let i = atob(n.data);
                                                                    if (i.length > 32768 || v + i.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                                    for(let e = 0; e < i.length; e++)t[v++] = i.charCodeAt(e);
                                                                    let a = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                                                    $.title = `${a}%`, $.firstElementChild.style.width = `${a}%`, z.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                                                }
                                                                if (v !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                                if (await F(), w = tR.parse(eH(JSON.parse(new TextDecoder("utf-8", {
                                                                    fatal: !0
                                                                }).decode(t)))).report, 1 !== w.schema_version || w.onu_id !== y.onu_id) throw Error(_("Unexpected MIB response"));
                                                                $.style.display = "none", z.replaceChildren((r = w, b = {
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
                                                                        (l = {
                                                                            class: "mib-chip mib-chip-info",
                                                                            children: [
                                                                                _("Records"),
                                                                                ": ",
                                                                                r.received_records,
                                                                                r.expected_records !== r.received_records ? ` / ${r.expected_records}` : ""
                                                                            ]
                                                                        }, s("span", l)),
                                                                        (d = {
                                                                            class: "mib-chip",
                                                                            children: [
                                                                                _("Decoded"),
                                                                                ": ",
                                                                                r.decoded_records
                                                                            ]
                                                                        }, s("span", d)),
                                                                        r.partial_records > 0 ? (c = {
                                                                            class: "mib-chip mib-chip-warning",
                                                                            children: [
                                                                                _("Partial"),
                                                                                ": ",
                                                                                r.partial_records
                                                                            ]
                                                                        }, s("span", c)) : null,
                                                                        (p = {
                                                                            class: "mib-chip mib-chip-neutral",
                                                                            children: [
                                                                                _("Basic"),
                                                                                ": ",
                                                                                r.basic_records
                                                                            ]
                                                                        }, s("span", p)),
                                                                        (u = {
                                                                            class: "mib-chip",
                                                                            children: r.tables_collected ? _("VLAN tables collected") : _("VLAN tables not collected")
                                                                        }, s("span", u)),
                                                                        (f = {
                                                                            class: "mib-chip mib-chip-subtle",
                                                                            children: new Date().toLocaleTimeString()
                                                                        }, s("span", f))
                                                                    ]
                                                                }, s("div", b))), j.replaceChildren(function(e) {
                                                                    var t, r, n, i, a, l;
                                                                    let d = e.classes.length ? e.classes[0].class_id : null, c = (t = {
                                                                        class: "mib-content"
                                                                    }, s("div", t)), p = (r = {
                                                                        type: "search",
                                                                        class: "cbi-input-text mib-search-input",
                                                                        placeholder: _("Search ME name or Class ID\u2026")
                                                                    }, s("input", r)), u = (n = {
                                                                        class: "mib-class-list"
                                                                    }, s("div", n)), f = new Map();
                                                                    function b(t) {
                                                                        var r, n;
                                                                        for (let [e, r] of (d = t, f))e === t ? r.classList.add("active") : r.classList.remove("active");
                                                                        let i = e.entities.filter((e)=>e.class_id === t);
                                                                        i.length ? c.replaceChildren(...i.map((r, n)=>{
                                                                            var i, a, l, d, c, p, u, f, b, g, h, m, v, y, w, x, k, z, $;
                                                                            return $ = {
                                                                                open: 0 === n,
                                                                                class: "mib-entity-details",
                                                                                children: [
                                                                                    (c = {
                                                                                        class: "mib-entity-summary",
                                                                                        children: [
                                                                                            (l = {
                                                                                                class: "mib-entity-title",
                                                                                                children: [
                                                                                                    (i = {
                                                                                                        children: o(r.name)
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
                                                                                            }, s("span", l)),
                                                                                            (d = {
                                                                                                class: "mib-entity-support",
                                                                                                children: r.support
                                                                                            }, s("span", d))
                                                                                        ]
                                                                                    }, s("summary", c)),
                                                                                    (z = {
                                                                                        class: "mib-entity-body",
                                                                                        children: [
                                                                                            r.attributes.length ? (v = {
                                                                                                class: "table mib-attributes-table",
                                                                                                children: [
                                                                                                    (h = {
                                                                                                        children: (g = {
                                                                                                            children: [
                                                                                                                (p = {
                                                                                                                    style: "width:28%",
                                                                                                                    children: _("Attribute")
                                                                                                                }, s("th", p)),
                                                                                                                (u = {
                                                                                                                    style: "width:14%",
                                                                                                                    children: _("Type")
                                                                                                                }, s("th", u)),
                                                                                                                (f = {
                                                                                                                    children: _("Value")
                                                                                                                }, s("th", f)),
                                                                                                                (b = {
                                                                                                                    style: "width:18%",
                                                                                                                    children: _("Definition")
                                                                                                                }, s("th", b))
                                                                                                            ]
                                                                                                        }, s("tr", g))
                                                                                                    }, s("thead", h)),
                                                                                                    (m = {
                                                                                                        children: r.attributes.map((e)=>{
                                                                                                            var t, r, n, i, a, l, d, c, p, u;
                                                                                                            return u = {
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
                                                                                                                                            return o(e.value);
                                                                                                                                        case "octets":
                                                                                                                                            return o(e.hex);
                                                                                                                                        case "table_length":
                                                                                                                                            return o(e.bytes);
                                                                                                                                        default:
                                                                                                                                            throw new eJ("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                                                    }
                                                                                                                                }(e.value)
                                                                                                                            }, s("span", i)),
                                                                                                                            e.observations?.length ? (d = {
                                                                                                                                class: "mib-obs-details",
                                                                                                                                children: [
                                                                                                                                    (a = {
                                                                                                                                        children: _("Raw data / observations")
                                                                                                                                    }, s("summary", a)),
                                                                                                                                    (l = {
                                                                                                                                        class: "mib-pre",
                                                                                                                                        children: t8(e.observations)
                                                                                                                                    }, s("pre", l))
                                                                                                                                ]
                                                                                                                            }, s("details", d)) : null
                                                                                                                        ]
                                                                                                                    }, s("td", c)),
                                                                                                                    (p = {
                                                                                                                        class: "mib-attr-ref",
                                                                                                                        children: t3(e.definition)
                                                                                                                    }, s("td", p))
                                                                                                                ]
                                                                                                            }, s("tr", u);
                                                                                                        })
                                                                                                    }, s("tbody", m))
                                                                                                ]
                                                                                            }, s("table", v)) : (y = {
                                                                                                children: _("Basic display only; raw records are preserved.")
                                                                                            }, s("p", y)),
                                                                                            e.tables.filter((e)=>e.class_id === t && e.entity_id === r.entity_id).map((e)=>{
                                                                                                var t, r, n, i, a, l, d, c, p, u, f, b, g, h, m, v;
                                                                                                return v = {
                                                                                                    class: "mib-table-details",
                                                                                                    children: [
                                                                                                        (t = {
                                                                                                            children: [
                                                                                                                e.attribute.name,
                                                                                                                " \xb7",
                                                                                                                " ",
                                                                                                                e.collected ? `${e.rows.length} ${_("rows")}` : o(e.error)
                                                                                                            ]
                                                                                                        }, s("summary", t)),
                                                                                                        e.vlan_rules.length ? (g = {
                                                                                                            class: "mib-table-overflow",
                                                                                                            children: (b = {
                                                                                                                class: "table",
                                                                                                                children: [
                                                                                                                    (u = {
                                                                                                                        children: (p = {
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
                                                                                                                                (l = {
                                                                                                                                    children: _("Outer treatment (priority / VID / TPID-DEI)")
                                                                                                                                }, s("th", l)),
                                                                                                                                (d = {
                                                                                                                                    children: _("Inner treatment (priority / VID / TPID-DEI)")
                                                                                                                                }, s("th", d)),
                                                                                                                                (c = {
                                                                                                                                    children: _("Delete entry")
                                                                                                                                }, s("th", c))
                                                                                                                            ]
                                                                                                                        }, s("tr", p))
                                                                                                                    }, s("thead", u)),
                                                                                                                    (f = {
                                                                                                                        children: e.vlan_rules.map((e)=>{
                                                                                                                            var t, r, n, i, a, l, d, c;
                                                                                                                            return c = {
                                                                                                                                children: [
                                                                                                                                    (t = {
                                                                                                                                        children: `${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`
                                                                                                                                    }, s("td", t)),
                                                                                                                                    (r = {
                                                                                                                                        children: `${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`
                                                                                                                                    }, s("td", r)),
                                                                                                                                    (n = {
                                                                                                                                        children: o(e.filter_ethertype)
                                                                                                                                    }, s("td", n)),
                                                                                                                                    (i = {
                                                                                                                                        children: o(e.tags_to_remove)
                                                                                                                                    }, s("td", i)),
                                                                                                                                    (a = {
                                                                                                                                        children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                                                    }, s("td", a)),
                                                                                                                                    (l = {
                                                                                                                                        children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                                                    }, s("td", l)),
                                                                                                                                    (d = {
                                                                                                                                        children: o(e.delete_entry)
                                                                                                                                    }, s("td", d))
                                                                                                                                ]
                                                                                                                            }, s("tr", c);
                                                                                                                        })
                                                                                                                    }, s("tbody", f))
                                                                                                                ]
                                                                                                            }, s("table", b))
                                                                                                        }, s("div", g)) : null,
                                                                                                        (h = {
                                                                                                            style: "margin-top:6px",
                                                                                                            children: [
                                                                                                                _("G.988 encoded field values"),
                                                                                                                ": ",
                                                                                                                t3(e.attribute)
                                                                                                            ]
                                                                                                        }, s("p", h)),
                                                                                                        (m = {
                                                                                                            class: "mib-pre",
                                                                                                            children: t8(e.vlan_rules.length ? e.vlan_rules : e.rows)
                                                                                                        }, s("pre", m))
                                                                                                    ]
                                                                                                }, s("details", v);
                                                                                            }),
                                                                                            (k = {
                                                                                                class: "mib-diag-details",
                                                                                                children: [
                                                                                                    (w = {
                                                                                                        children: _("Records / diagnostics")
                                                                                                    }, s("summary", w)),
                                                                                                    (x = {
                                                                                                        class: "mib-pre",
                                                                                                        children: t8({
                                                                                                            diagnostics: r.diagnostics,
                                                                                                            records: e.records.filter((e)=>e.class_id === t && e.entity_id === r.entity_id)
                                                                                                        })
                                                                                                    }, s("pre", x))
                                                                                                ]
                                                                                            }, s("details", k))
                                                                                        ]
                                                                                    }, s("div", z))
                                                                                ]
                                                                            }, s("details", $);
                                                                        })) : c.replaceChildren((n = {
                                                                            class: "mib-empty-content",
                                                                            children: (r = {
                                                                                children: _("No entities recorded for this ME class.")
                                                                            }, s("p", r))
                                                                        }, s("div", n)));
                                                                    }
                                                                    function g() {
                                                                        var t;
                                                                        let r = p.value.trim().toLowerCase();
                                                                        f.clear();
                                                                        let n = e.classes.filter((e)=>`${e.class_id} ${e.name ?? ""}`.toLowerCase().includes(r));
                                                                        n.length ? u.replaceChildren(...n.map((e)=>{
                                                                            var t, r, n, i;
                                                                            let a = (i = {
                                                                                type: "button",
                                                                                class: `mib-class-btn${e.class_id === d ? " active" : ""}`,
                                                                                onclick: ()=>b(e.class_id),
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
                                                                            return f.set(e.class_id, a), a;
                                                                        })) : u.replaceChildren((t = {
                                                                            class: "mib-empty-list",
                                                                            children: _("No matching ME classes")
                                                                        }, s("div", t)));
                                                                    }
                                                                    return p.addEventListener("input", g), g(), e.classes.length && b(e.classes[0].class_id), l = {
                                                                        class: "mib-browser",
                                                                        children: [
                                                                            (a = {
                                                                                class: "mib-sidebar",
                                                                                children: [
                                                                                    (i = {
                                                                                        class: "mib-search-box",
                                                                                        children: p
                                                                                    }, s("div", i)),
                                                                                    u
                                                                                ]
                                                                            }, s("div", a)),
                                                                            c
                                                                        ]
                                                                    }, s("div", l);
                                                                }(w), (m = {
                                                                    class: "mib-upload-diagnostics",
                                                                    children: [
                                                                        (g = {
                                                                            children: _("Upload diagnostics")
                                                                        }, s("summary", g)),
                                                                        (h = {
                                                                            class: "mib-pre",
                                                                            children: t8(w.diagnostics)
                                                                        }, s("pre", h))
                                                                    ]
                                                                }, s("details", m))), n = w, O.textContent = t8({
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
                                                                    $.title = `${e}%`, $.firstElementChild.style.width = `${e}%`;
                                                                }
                                                            }
                                                            if (Date.now() >= P) throw Error(_("MIB query timed out; retry."));
                                                            await new Promise((e)=>setTimeout(e, 1000));
                                                        }
                                                    } catch (e) {
                                                        B() && ($.style.display = "none", z.replaceChildren(s("span", {
                                                            class: "mib-error-text",
                                                            children: [
                                                                String(e),
                                                                w ? ` \xb7 ${_("Previous snapshot retained")}` : ""
                                                            ]
                                                        })));
                                                    } finally{
                                                        await F(), y = !1, T.disabled = C.disabled = !1;
                                                    }
                                                }
                                            }
                                            async function F() {
                                                if (!x) return;
                                                let e = x;
                                                x = null;
                                                try {
                                                    await tW(e);
                                                } catch (e) {
                                                    console.warn("Failed to release MIB snapshot", e);
                                                }
                                            }
                                            A(m), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, Z, "modal-wide");
                                        })(e, "mib"),
                                    children: [
                                        _("View OMCI / MIB details"),
                                        " \u2192"
                                    ]
                                }, s("button", i))
                            }, s("div", c))
                        ]
                    }, s("div", p)),
                    (P = {
                        class: "fttr-grid-2",
                        children: [
                            (v = {
                                class: "fttr-card",
                                children: [
                                    s("h4", {
                                        style: "margin-top:0;margin-bottom:6px;font-size:92%;color:#888",
                                        children: _("Optical physical layer and link parameters")
                                    }),
                                    (u = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Optical RX power")
                                            }),
                                            s("strong", {
                                                children: l(e.optical_rx_power_dbm)
                                            })
                                        ]
                                    }, s("div", u)),
                                    (f = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Optical TX power")
                                            }),
                                            s("strong", {
                                                children: l(e.optical_tx_power_dbm)
                                            })
                                        ]
                                    }, s("div", f)),
                                    (g = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Equalization delay (EQD)")
                                            }),
                                            s("span", {
                                                children: null === (b = e.equalization_delay_bits) ? "\u2014" : `${b} bits`
                                            })
                                        ]
                                    }, s("div", g)),
                                    (h = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Data interface")
                                            }),
                                            s("code", {
                                                children: o(e.data_path?.interface)
                                            })
                                        ]
                                    }, s("div", h)),
                                    (m = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Identity age")
                                            }),
                                            s("span", {
                                                children: d(e.identity_age_seconds) ?? "\u2014"
                                            })
                                        ]
                                    }, s("div", m))
                                ]
                            }, s("div", v)),
                            (O = {
                                class: "fttr-card",
                                children: [
                                    s("h4", {
                                        style: "margin-top:0;margin-bottom:6px;font-size:92%;color:#888",
                                        children: _("Hardware specifications and firmware images")
                                    }),
                                    (y = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Equipment ID")
                                            }),
                                            s("span", {
                                                children: o(M?.equipment_id ?? e.model)
                                            })
                                        ]
                                    }, s("div", y)),
                                    (w = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Hardware version")
                                            }),
                                            s("code", {
                                                children: o(M?.hardware_version ?? e.hardware_version)
                                            })
                                        ]
                                    }, s("div", w)),
                                    (k = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Firmware version")
                                            }),
                                            (x = {
                                                title: T.full || T.display,
                                                children: s("strong", {
                                                    children: T.display
                                                })
                                            }, s("span", x))
                                        ]
                                    }, s("div", k)),
                                    (z = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("OMCC version")
                                            }),
                                            s("span", {
                                                children: M?.omcc_version != null ? `0x${M.omcc_version.toString(16).padStart(2, "0")} (${M.omcc_version})` : "\u2014"
                                            })
                                        ]
                                    }, s("div", z)),
                                    M?.errors.length ? ($ = {
                                        class: "fttr-kv-row",
                                        style: "color:#e74c3c",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Identity read errors")
                                            }),
                                            s("span", {
                                                children: M.errors.join("; ")
                                            })
                                        ]
                                    }, s("div", $)) : null,
                                    N.length > 1 ? (j = {
                                        class: "fttr-kv-row",
                                        style: "font-size:80%;color:#888",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Software images")
                                            }),
                                            s("span", {
                                                children: N.join(" \xb7 ")
                                            })
                                        ]
                                    }, s("div", j)) : null
                                ]
                            }, s("div", O))
                        ]
                    }, s("div", P))
                ]
            }, s("div", S);
        })
    }, s("div", t)) : (r = {
        class: "cbi-section fttr-panel-subgateways",
        children: s("p", {
            style: "text-align:center;color:#888;padding:2em 0",
            children: _("No sub-gateways are currently registered.")
        })
    }, s("div", r));
}
function rp(e) {
    var t, r, n, i, a, o, l, d, u, f, b, g, h, m, v, y, w, x, k, z, $, j, O, P, S;
    let M = e.npu;
    if (!M?.supported) return t = {
        class: "cbi-section fttr-panel-npu",
        children: s("p", {
            style: "text-align:center;color:#888;padding:2em 0",
            children: _("NPU hardware acceleration is not compiled or unsupported on this target.")
        })
    }, s("div", t);
    let N = M.engine_attached ? s("span", {
        class: "fttr-badge fttr-badge-success",
        children: _("Attached (Ready)")
    }) : s("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: _("Detached")
    }), T = M.fw4_hooks_ready ? s("span", {
        class: "fttr-badge fttr-badge-success",
        children: _("Ready")
    }) : s("span", {
        class: "fttr-badge fttr-badge-warning",
        children: _("Pending")
    }), C = M.bridge_offload_debug ? s("span", {
        class: "fttr-badge fttr-badge-warning",
        children: _("Active")
    }) : s("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: _("Disabled")
    }), I = M.active_ports.length > 0 ? M.active_ports.join(", ") : _("None");
    return S = {
        class: "cbi-section fttr-panel-npu",
        children: [
            s("h3", {
                style: "margin-bottom:12px",
                children: _("NPU hardware offload & PPE flow tables")
            }),
            (x = {
                class: "fttr-grid-3",
                children: [
                    (d = {
                        class: "fttr-card",
                        children: [
                            s("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: _("Engine and admission status")
                            }),
                            (r = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("NPU engine")
                                    }),
                                    s("span", {
                                        children: N
                                    })
                                ]
                            }, s("div", r)),
                            (n = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Hardware offload")
                                    }),
                                    s("span", {
                                        class: "fttr-badge fttr-badge-neutral",
                                        "data-fttr": "npu-state",
                                        children: _("Loading\u2026")
                                    })
                                ]
                            }, s("div", n)),
                            (i = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Managed bridge")
                                    }),
                                    s("code", {
                                        children: M.bridge
                                    })
                                ]
                            }, s("div", i)),
                            (a = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Bridge offload mask")
                                    }),
                                    s("code", {
                                        children: `0x${M.bridge_offload_mask.toString(16).padStart(4, "0")} (${M.bridge_offload_mask})`
                                    })
                                ]
                            }, s("div", a)),
                            (o = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Active offload ports")
                                    }),
                                    s("span", {
                                        children: I
                                    })
                                ]
                            }, s("div", o)),
                            (l = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Firewall hooks")
                                    }),
                                    s("span", {
                                        children: T
                                    })
                                ]
                            }, s("div", l))
                        ]
                    }, s("div", d)),
                    (v = {
                        class: "fttr-card",
                        children: [
                            s("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: _("Traffic counters & flow capacity")
                            }),
                            (u = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Bound hardware flows")
                                    }),
                                    s("strong", {
                                        children: M.bound_entries
                                    })
                                ]
                            }, s("div", u)),
                            (f = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Total FOE entries")
                                    }),
                                    s("span", {
                                        children: M.total_entries
                                    })
                                ]
                            }, s("div", f)),
                            (b = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Offloaded packets")
                                    }),
                                    s("strong", {
                                        children: p(M.total_packets)
                                    })
                                ]
                            }, s("div", b)),
                            (g = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Offloaded traffic")
                                    }),
                                    s("strong", {
                                        children: c(M.total_bytes)
                                    })
                                ]
                            }, s("div", g)),
                            (h = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Routed offload mask")
                                    }),
                                    s("code", {
                                        children: `0x${M.routed_offload_mask.toString(16).padStart(4, "0")}`
                                    })
                                ]
                            }, s("div", h)),
                            (m = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Driver debug logging")
                                    }),
                                    s("span", {
                                        children: C
                                    })
                                ]
                            }, s("div", m))
                        ]
                    }, s("div", v)),
                    (w = {
                        class: "fttr-card",
                        children: [
                            s("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: _("NPU control")
                            }),
                            s("p", {
                                style: "font-size:85%;color:#888;margin:6px 0 12px 0",
                                children: _("Toggle hardware-level flow offloading on Airoha PPE. Disabling falls back to standard Linux software bridge forwarding.")
                            }),
                            (y = {
                                style: "margin-top:10px",
                                children: s("button", {
                                    class: "fttr-btn-subtle",
                                    "data-fttr": "npu-toggle",
                                    type: "button",
                                    disabled: !0,
                                    children: _("Loading\u2026")
                                })
                            }, s("div", y))
                        ]
                    }, s("div", w))
                ]
            }, s("div", x)),
            (P = {
                style: "margin-top:16px",
                children: [
                    s("h4", {
                        style: "margin-bottom:8px",
                        children: _("Active hardware offload flows (PPE FOE Bound)")
                    }),
                    0 === M.bound_flows.length ? s("p", {
                        style: "color:#888;font-size:90%;font-style:italic",
                        children: _("No active hardware-offloaded flows in PPE table. Flows bind automatically during continuous inter-ONU traffic.")
                    }) : (O = {
                        style: "overflow-x:auto",
                        children: (j = {
                            class: "table",
                            style: "font-size:85%;width:100%",
                            children: [
                                (z = {
                                    children: (k = {
                                        children: [
                                            s("th", {
                                                children: _("Index")
                                            }),
                                            s("th", {
                                                children: _("Type")
                                            }),
                                            s("th", {
                                                children: _("Tuple / Endpoints")
                                            }),
                                            s("th", {
                                                children: _("Ethernet / MAC")
                                            }),
                                            s("th", {
                                                children: _("VLAN")
                                            }),
                                            s("th", {
                                                children: _("Packets")
                                            }),
                                            s("th", {
                                                children: _("Bytes")
                                            })
                                        ]
                                    }, s("tr", k))
                                }, s("thead", z)),
                                ($ = {
                                    children: M.bound_flows.map((e)=>{
                                        var t, r, n, i, a, o, l;
                                        return l = {
                                            children: [
                                                (t = {
                                                    children: s("code", {
                                                        children: e.index
                                                    })
                                                }, s("td", t)),
                                                (r = {
                                                    children: s("span", {
                                                        class: "fttr-badge fttr-badge-info",
                                                        children: e.pkt_type
                                                    })
                                                }, s("td", r)),
                                                (n = {
                                                    children: s("code", {
                                                        children: e.orig_tuple || "\u2014"
                                                    })
                                                }, s("td", n)),
                                                (i = {
                                                    style: "font-size:85%",
                                                    children: s("code", {
                                                        children: e.eth || "\u2014"
                                                    })
                                                }, s("td", i)),
                                                s("td", {
                                                    children: e.vlan || "0,0"
                                                }),
                                                (a = {
                                                    children: s("strong", {
                                                        children: p(e.packets)
                                                    })
                                                }, s("td", a)),
                                                (o = {
                                                    children: s("strong", {
                                                        children: c(e.bytes)
                                                    })
                                                }, s("td", o))
                                            ]
                                        }, s("tr", l);
                                    })
                                }, s("tbody", $))
                            ]
                        }, s("table", j))
                    }, s("div", O))
                ]
            }, s("div", P))
        ]
    }, s("div", S);
}
let main = t6.extend({
    load: ()=>tv(),
    render: (e)=>{
        var t, r;
        let n, i, a, o, l, d, c, p, u, f, b;
        return n = "controller", rt = !1, rs = !1, i = [
            {
                id: "controller",
                label: _("Controller & optical transceiver")
            },
            {
                id: "subgateways",
                label: _("Sub-gateways & optical links")
            },
            {
                id: "npu",
                label: _("NPU & hardware offload")
            }
        ], a = new Map(), o = rd(e), l = rc(e.sub_gateways ?? []), d = rp(e), t = {
            class: "cbi-tabmenu",
            style: "margin-top:14px;margin-bottom:0",
            children: i.map((e)=>{
                var t;
                let r = (t = {
                    class: n === e.id ? "cbi-tab" : "cbi-tab-disabled",
                    "data-tab": e.id,
                    children: s("a", {
                        href: `#tab-${e.id}`,
                        onclick: (t)=>{
                            t.preventDefault();
                            var r = e.id;
                            for (let [e, t] of (n = r, a))t.className = e === r ? "cbi-tab" : "cbi-tab-disabled";
                            o.hidden = "controller" !== r, l.hidden = "subgateways" !== r, d.hidden = "npu" !== r, window.dispatchEvent(new Event("resize"));
                        },
                        children: e.label
                    })
                }, s("li", t));
                return a.set(e.id, r), r;
            })
        }, c = s("ul", t), o.hidden = !1, l.hidden = !0, d.hidden = !0, t7 = e.optical_transceiver.tx_enabled, t9 = null, p = rr, tk().then((e)=>{
            rt || p !== rr || (t9 = e, rn(t7 = e.tx_enabled));
        }).catch(()=>{
            rt || p !== rr || rn(t7 = null);
        }), re = o, rn(t7), ra = d, rl(ri = e.npu?.bridge_offload_enabled ?? null), u = s("div", {
            id: "fttr-panels-container",
            children: [
                o,
                l,
                d
            ]
        }), r = {
            class: "cbi-map fttr-hardware",
            children: [
                s("style", {
                    children: `
				.fttr-hardware {
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
					.fttr-hardware {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .fttr-hardware,
				[data-theme="dark"] .fttr-hardware {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-danger-color: #e74c3c;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				.fttr-hardware .fttr-badge {
					display: inline-block;
					padding: 0.18em 0.55em;
					font-size: 85%;
					font-weight: 600;
					line-height: 1.25;
					border-radius: 3px;
					white-space: nowrap;
					text-align: center;
				}

				.fttr-hardware .fttr-badge-success {
					background: var(--fttr-success-bg);
					color: var(--fttr-success-color);
					border: 1px solid var(--fttr-success-border);
				}

				.fttr-hardware .fttr-badge-warning {
					background: var(--fttr-warning-bg);
					color: var(--fttr-warning-color);
					border: 1px solid var(--fttr-warning-border);
				}

				.fttr-hardware .fttr-badge-danger {
					background: var(--fttr-danger-bg);
					color: var(--fttr-danger-color);
					border: 1px solid var(--fttr-danger-border);
				}

				.fttr-hardware .fttr-badge-info {
					background: var(--fttr-info-bg);
					color: var(--fttr-info-color);
					border: 1px solid var(--fttr-info-border);
				}

				.fttr-hardware .fttr-badge-neutral {
					background: var(--fttr-neutral-bg);
					color: var(--fttr-neutral-color);
					border: 1px solid var(--fttr-neutral-border);
				}

				.fttr-hardware .fttr-grid-2 {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
					gap: 12px;
					margin: 8px 0;
				}

				.fttr-hardware .fttr-grid-3 {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
					gap: 12px;
					margin: 8px 0;
				}

				.fttr-hardware .fttr-card {
					padding: 12px 14px;
					border: 1px solid rgba(127, 140, 141, 0.2);
					border-radius: 6px;
					background: rgba(127, 140, 141, 0.04);
				}

				.fttr-hardware .fttr-kv-row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 5px 0;
					border-bottom: 1px dashed rgba(127, 140, 141, 0.15);
					font-size: 88%;
				}

				.fttr-hardware .fttr-kv-row:last-child {
					border-bottom: none;
				}

				.fttr-hardware .fttr-kv-label {
					color: #888;
				}

				.fttr-hardware .fttr-onu-card {
					position: relative;
					margin-bottom: 1.2em;
				}

				.fttr-hardware .fttr-card-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: wrap;
					gap: 10px;
					margin-bottom: 10px;
				}

				.fttr-hardware .fttr-card-title-group {
					display: flex;
					align-items: center;
					gap: 10px;
					flex-wrap: wrap;
				}

				.fttr-hardware .fttr-card-meta-tags {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					gap: 6px;
				}

				.fttr-hardware .fttr-btn-subtle {
					font-size: 82%;
					padding: 3px 10px;
					border: 1px solid rgba(127, 140, 141, 0.35);
					background: transparent;
					color: inherit;
					border-radius: 4px;
					cursor: pointer;
					text-decoration: none;
					transition: all 0.2s ease;
				}

				.fttr-hardware .fttr-btn-subtle:hover {
					background: rgba(52, 152, 219, 0.1);
					border-color: rgba(52, 152, 219, 0.4);
					color: #2980b9;
				}

				.fttr-hardware .cbi-tabmenu {
					margin-top: 14px;
					margin-bottom: 0;
					user-select: none;
				}

				.fttr-hardware #fttr-panels-container > .cbi-section {
					margin-top: 0;
					border-top-left-radius: 0;
				}
				`
                }),
                s("h2", {
                    children: _("FTTR hardware status")
                }),
                c,
                u,
                s("p", {
                    class: "cbi-footer",
                    style: "margin-top:1.5em;font-size:85%;color:#888",
                    children: _("Identity information is read-only and limited to fields provided by fttrctl status.")
                })
            ]
        }, f = s("div", r), b = !1, L.Poll.add(async ()=>{
            if (!f.isConnected || b) return;
            b = !0;
            let e = rr, t = ro;
            try {
                if (rt || rs) return;
                let [r, i] = await Promise.all([
                    tv(),
                    tk()
                ]);
                if (rt || rs || e !== rr || t !== ro) return;
                let a = rd(r), s = rc(r.sub_gateways ?? []), c = rp(r);
                a.hidden = "controller" !== n, s.hidden = "subgateways" !== n, c.hidden = "npu" !== n, o.replaceWith(a), l.replaceWith(s), d.replaceWith(c), o = a, l = s, d = c, re = a, ra = c, t9 = i, t7 = i.tx_enabled, rn(t7), ri = r.npu?.bridge_offload_enabled ?? null, rl(ri);
            } catch  {
                if (rt || rs || e !== rr || t !== ro) return;
                t9 = null, rn(t7 = null), rl(ri = null);
            } finally{
                b = !1;
            }
        }, 10), f;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;