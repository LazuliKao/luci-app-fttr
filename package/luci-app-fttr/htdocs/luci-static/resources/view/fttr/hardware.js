'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, r, n, a, i;
const s = Symbol.for("jsx.fragment");
function o(e, t) {
    let { children: r, ...n } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, a = function e(t) {
        let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let n of t)null != n && "boolean" != typeof n && (Array.isArray(n) ? e(n, r) : r.push(n instanceof Node ? n : String(n)));
        return r;
    }(null == r ? [] : Array.isArray(r) ? r : [
        r
    ]);
    if (e === s) {
        let e = document.createDocumentFragment();
        return e.append(...a), e;
    }
    if ("function" == typeof e) {
        let t = Reflect.apply(e, void 0, [
            {
                ...n,
                children: a
            }
        ]);
        if (!(t instanceof Node)) throw TypeError("JSX components must return a DOM Node");
        return t;
    }
    if ("string" != typeof e) throw TypeError("JSX element types must be tag names or component functions");
    let i = {}, o = {
        ...n
    };
    for (let [e, t] of Object.entries(o))e.startsWith("on") && "function" == typeof t ? (i[e] = t, delete o[e]) : "boolean" == typeof t && (t ? o[e] = e : delete o[e]);
    let l = Object.keys(o).length > 0 ? a.length > 1 ? E(e, o, a) : E(e, o, a[0]) : a.length > 1 ? E(e, {}, a) : E(e, {}, a[0]);
    for (let [e, t] of Object.entries(i)){
        let r = e.slice(2).toLowerCase();
        l.addEventListener(r, t);
    }
    return l;
}
const l = (e)=>null == e || "" === e ? "\u2014" : String(e);
function d(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
    return null != e && Number.isFinite(e) ? `${e.toFixed(t)} dBm` : "\u2014";
}
function c(e) {
    if (null == e || !Number.isFinite(e) || e < 0) return null;
    let t = Math.floor(e);
    if (t < 60) return (1 === t ? _("%d second ago") : _("%d seconds ago")).replace("%d", String(t));
    let r = Math.floor(t / 60);
    if (r < 60) return (1 === r ? _("%d minute ago") : _("%d minutes ago")).replace("%d", String(r));
    let n = Math.floor(t / 3600);
    if (n < 24) return (1 === n ? _("%d hour ago") : _("%d hours ago")).replace("%d", String(n));
    let a = Math.floor(t / 86400);
    return (1 === a ? _("%d day ago") : _("%d days ago")).replace("%d", String(a));
}
function p(e, t, r) {
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
        let a = s.prototype, i = Object.keys(a);
        for(let e = 0; e < i.length; e++){
            let t = i[e];
            t in r || (r[t] = a[t].bind(r));
        }
    }
    let a = r?.Parent ?? Object;
    class i extends a {
    }
    function s(e) {
        var t;
        let a = r?.Parent ? new i() : this;
        for (let r of (n(a, e), (t = a._zod).deferred ?? (t.deferred = []), a._zod.deferred))r();
        return a;
    }
    return Object.defineProperty(i, "name", {
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
class u extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const f = {};
function b(e) {
    return e && Object.assign(f, e), f;
}
function g(e, t) {
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
function m(e) {
    let t = +!!e.startsWith("^"), r = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, r);
}
const v = Symbol("evaluating");
function y(e, t, r) {
    let n;
    Object.defineProperty(e, t, {
        get () {
            if (n !== v) return void 0 === n && (n = v, n = r()), n;
        },
        set (r) {
            Object.defineProperty(e, t, {
                value: r
            });
        },
        configurable: !0
    });
}
function w(e, t, r) {
    Object.defineProperty(e, t, {
        value: r,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
}
function x(...e) {
    let t = {};
    for (let r of e)Object.assign(t, Object.getOwnPropertyDescriptors(r));
    return Object.defineProperties({}, t);
}
const k = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function z(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function j(e) {
    if (!1 === z(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let r = t.prototype;
    return !1 !== z(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
}
const $ = new Set([
    "string",
    "number",
    "symbol"
]);
function S(e) {
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
function C(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let r = t; r < e.issues.length; r++)if (e.issues[r]?.continue !== !0) return !0;
    return !1;
}
function P(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function T(e) {
    return "string" == typeof e ? e : e?.message;
}
function R(e, t, r) {
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = T(e.inst?._zod.def?.error?.(e)) ?? T(t?.error?.(e)) ?? T(r.customError?.(e)) ?? T(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
}
const I = (e, t)=>{
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
}, N = p("$ZodError", I), D = p("$ZodError", I, {
    Parent: Error
}), A = (r = D, (e, t, n, a)=>{
    let i = n ? Object.assign(n, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (s instanceof Promise) throw new u();
    if (s.issues.length) {
        let e = new (a?.Err ?? r)(s.issues.map((e)=>R(e, i, b())));
        throw k(e, a?.callee), e;
    }
    return s.value;
}), Z = (n = D, async (e, t, r, a)=>{
    let i = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (a?.Err ?? n)(s.issues.map((e)=>R(e, i, b())));
        throw k(e, a?.callee), e;
    }
    return s.value;
}), U = (a = D, (e, t, r)=>{
    let n = r ? {
        ...r,
        async: !1
    } : {
        async: !1
    }, i = e._zod.run({
        value: t,
        issues: []
    }, n);
    if (i instanceof Promise) throw new u();
    return i.issues.length ? {
        success: !1,
        error: new (a ?? N)(i.issues.map((e)=>R(e, n, b())))
    } : {
        success: !0,
        data: i.value
    };
}), q = (i = D, async (e, t, r)=>{
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
        error: new i(a.issues.map((e)=>R(e, n, b())))
    } : {
        success: !0,
        data: a.value
    };
}), B = /^-?\d+(?:\.\d+)?$/, V = /^(?:true|false)$/i, W = /^null$/i, F = {
    major: 4,
    minor: 3,
    patch: 6
}, J = p("$ZodType", (e, t)=>{
    var r;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = F;
    let n = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && n.unshift(e), n))for (let r of t._zod.onattach)r(e);
    if (0 === n.length) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, r)=>{
            let n, a = C(e);
            for (let i of t){
                if (i._zod.def.when) {
                    if (!i._zod.def.when(e)) continue;
                } else if (a) continue;
                let t = e.issues.length, s = i._zod.check(e);
                if (s instanceof Promise && r?.async === !1) throw new u();
                if (n || s instanceof Promise) n = (n ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (a || (a = C(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    a || (a = C(e, t));
                }
            }
            return n ? n.then(()=>e) : e;
        }, r = (r, a, i)=>{
            if (C(r)) return r.aborted = !0, r;
            let s = t(a, n, i);
            if (s instanceof Promise) {
                if (!1 === i.async) throw new u();
                return s.then((t)=>e._zod.parse(t, i));
            }
            return e._zod.parse(s, i);
        };
        e._zod.run = (a, i)=>{
            if (i.skipChecks) return e._zod.parse(a, i);
            if ("backward" === i.direction) {
                let t = e._zod.parse({
                    value: a.value,
                    issues: []
                }, {
                    ...i,
                    skipChecks: !0
                });
                return t instanceof Promise ? t.then((e)=>r(e, a, i)) : r(t, a, i);
            }
            let s = e._zod.parse(a, i);
            if (s instanceof Promise) {
                if (!1 === i.async) throw new u();
                return s.then((e)=>t(e, n, i));
            }
            return t(s, n, i);
        };
    }
    y(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = U(e, t);
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
}), X = p("$ZodString", (e, t)=>{
    var r;
    let n;
    J.init(e, t), e._zod.pattern = [
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
}), H = p("$ZodNumber", (e, t)=>{
    J.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? B, e._zod.parse = (r, n)=>{
        if (t.coerce) try {
            r.value = Number(r.value);
        } catch (e) {}
        let a = r.value;
        if ("number" == typeof a && !Number.isNaN(a) && Number.isFinite(a)) return r;
        let i = "number" == typeof a ? Number.isNaN(a) ? "NaN" : Number.isFinite(a) ? void 0 : "Infinity" : void 0;
        return r.issues.push({
            expected: "number",
            code: "invalid_type",
            input: a,
            inst: e,
            ...i ? {
                received: i
            } : {}
        }), r;
    };
}), G = p("$ZodBoolean", (e, t)=>{
    J.init(e, t), e._zod.pattern = V, e._zod.parse = (r, n)=>{
        if (t.coerce) try {
            r.value = !!r.value;
        } catch (e) {}
        let a = r.value;
        return "boolean" == typeof a || r.issues.push({
            expected: "boolean",
            code: "invalid_type",
            input: a,
            inst: e
        }), r;
    };
}), K = p("$ZodNull", (e, t)=>{
    J.init(e, t), e._zod.pattern = W, e._zod.values = new Set([
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
}), Q = p("$ZodNever", (e, t)=>{
    J.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function Y(e, t, r) {
    e.issues.length && t.issues.push(...P(r, e.issues)), t.value[r] = e.value;
}
const ee = p("$ZodArray", (e, t)=>{
    J.init(e, t), e._zod.parse = (r, n)=>{
        let a = r.value;
        if (!Array.isArray(a)) return r.issues.push({
            expected: "array",
            code: "invalid_type",
            input: a,
            inst: e
        }), r;
        r.value = Array(a.length);
        let i = [];
        for(let e = 0; e < a.length; e++){
            let s = a[e], o = t.element._zod.run({
                value: s,
                issues: []
            }, n);
            o instanceof Promise ? i.push(o.then((t)=>Y(t, r, e))) : Y(o, r, e);
        }
        return i.length ? Promise.all(i).then(()=>r) : r;
    };
});
function et(e, t, r, n, a) {
    if (e.issues.length) {
        if (a && !(r in n)) return;
        t.issues.push(...P(r, e.issues));
    }
    void 0 === e.value ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
const er = p("$ZodObject", (e, t)=>{
    let r;
    J.init(e, t);
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
    let a = h(()=>(function(e) {
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
    y(e._zod, "propValues", ()=>{
        let e = t.shape, r = {};
        for(let t in e){
            let n = e[t]._zod;
            if (n.values) for (let e of (r[t] ?? (r[t] = new Set()), n.values))r[t].add(e);
        }
        return r;
    });
    let i = t.catchall;
    e._zod.parse = (t, n)=>{
        r ?? (r = a.value);
        let s = t.value;
        if (!z(s)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: s,
            inst: e
        }), t;
        t.value = {};
        let o = [], l = r.shape;
        for (let e of r.keys){
            let r = l[e], a = "optional" === r._zod.optout, i = r._zod.run({
                value: s[e],
                issues: []
            }, n);
            i instanceof Promise ? o.push(i.then((r)=>et(r, t, e, s, a))) : et(i, t, e, s, a);
        }
        return i ? function(e, t, r, n, a, i) {
            let s = [], o = a.keySet, l = a.catchall._zod, d = l.def.type, c = "optional" === l.optout;
            for(let a in t){
                if (o.has(a)) continue;
                if ("never" === d) {
                    s.push(a);
                    continue;
                }
                let i = l.run({
                    value: t[a],
                    issues: []
                }, n);
                i instanceof Promise ? e.push(i.then((e)=>et(e, r, a, t, c))) : et(i, r, a, t, c);
            }
            return (s.length && r.issues.push({
                code: "unrecognized_keys",
                keys: s,
                input: t,
                inst: i
            }), e.length) ? Promise.all(e).then(()=>r) : r;
        }(o, s, t, n, a.value, e) : o.length ? Promise.all(o).then(()=>t) : t;
    };
});
function en(e, t, r, n) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let a = e.filter((e)=>!C(e));
    return 1 === a.length ? (t.value = a[0].value, a[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>R(e, n, b())))
    }), t);
}
const ea = p("$ZodUnion", (e, t)=>{
    J.init(e, t), y(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), y(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), y(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), y(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>m(e.source)).join("|")})$`);
        }
    });
    let r = 1 === t.options.length, n = t.options[0]._zod.run;
    e._zod.parse = (a, i)=>{
        if (r) return n(a, i);
        let s = !1, o = [];
        for (let e of t.options){
            let t = e._zod.run({
                value: a.value,
                issues: []
            }, i);
            if (t instanceof Promise) o.push(t), s = !0;
            else {
                if (0 === t.issues.length) return t;
                o.push(t);
            }
        }
        return s ? Promise.all(o).then((t)=>en(t, a, e, i)) : en(o, a, e, i);
    };
}), ei = p("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, ea.init(e, t);
    let r = e._zod.parse;
    y(e._zod, "propValues", ()=>{
        let e = {};
        for (let r of t.options){
            let n = r._zod.propValues;
            if (!n || 0 === Object.keys(n).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
            for (let [t, r] of Object.entries(n))for (let n of (e[t] || (e[t] = new Set()), r))e[t].add(n);
        }
        return e;
    });
    let n = h(()=>{
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
    e._zod.parse = (a, i)=>{
        let s = a.value;
        if (!z(s)) return a.issues.push({
            code: "invalid_type",
            expected: "object",
            input: s,
            inst: e
        }), a;
        let o = n.value.get(s?.[t.discriminator]);
        return o ? o._zod.run(a, i) : t.unionFallback ? r(a, i) : (a.issues.push({
            code: "invalid_union",
            errors: [],
            note: "No matching discriminator",
            discriminator: t.discriminator,
            input: s,
            path: [
                t.discriminator
            ],
            inst: e
        }), a);
    };
}), es = p("$ZodRecord", (e, t)=>{
    J.init(e, t), e._zod.parse = (r, n)=>{
        let a = r.value;
        if (!j(a)) return r.issues.push({
            expected: "record",
            code: "invalid_type",
            input: a,
            inst: e
        }), r;
        let i = [], s = t.keyType._zod.values;
        if (s) {
            let o;
            r.value = {};
            let l = new Set();
            for (let e of s)if ("string" == typeof e || "number" == typeof e || "symbol" == typeof e) {
                l.add("number" == typeof e ? e.toString() : e);
                let s = t.valueType._zod.run({
                    value: a[e],
                    issues: []
                }, n);
                s instanceof Promise ? i.push(s.then((t)=>{
                    t.issues.length && r.issues.push(...P(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...P(e, s.issues)), r.value[e] = s.value);
            }
            for(let e in a)l.has(e) || (o = o ?? []).push(e);
            o && o.length > 0 && r.issues.push({
                code: "unrecognized_keys",
                input: a,
                inst: e,
                keys: o
            });
        } else for (let s of (r.value = {}, Reflect.ownKeys(a))){
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
                "loose" === t.mode ? r.value[s] = a[s] : r.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: o.issues.map((e)=>R(e, n, b())),
                    input: s,
                    path: [
                        s
                    ],
                    inst: e
                });
                continue;
            }
            let l = t.valueType._zod.run({
                value: a[s],
                issues: []
            }, n);
            l instanceof Promise ? i.push(l.then((e)=>{
                e.issues.length && r.issues.push(...P(s, e.issues)), r.value[o.value] = e.value;
            })) : (l.issues.length && r.issues.push(...P(s, l.issues)), r.value[o.value] = l.value);
        }
        return i.length ? Promise.all(i).then(()=>r) : r;
    };
}), eo = p("$ZodEnum", (e, t)=>{
    var r;
    let n;
    J.init(e, t);
    let a = (n = Object.values(r = t.entries).filter((e)=>"number" == typeof e), Object.entries(r).filter(([e, t])=>-1 === n.indexOf(+e)).map(([e, t])=>t)), i = new Set(a);
    e._zod.values = i, e._zod.pattern = RegExp(`^(${a.filter((e)=>$.has(typeof e)).map((e)=>"string" == typeof e ? S(e) : e.toString()).join("|")})$`), e._zod.parse = (t, r)=>{
        let n = t.value;
        return i.has(n) || t.issues.push({
            code: "invalid_value",
            values: a,
            input: n,
            inst: e
        }), t;
    };
}), el = p("$ZodLiteral", (e, t)=>{
    if (J.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? S(e) : e ? S(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (n, a)=>{
        let i = n.value;
        return r.has(i) || n.issues.push({
            code: "invalid_value",
            values: t.values,
            input: i,
            inst: e
        }), n;
    };
});
function ed(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const ec = p("$ZodOptional", (e, t)=>{
    J.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", y(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), y(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${m(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let n = t.innerType._zod.run(e, r);
            return n instanceof Promise ? n.then((t)=>ed(t, e.value)) : ed(n, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, r);
    };
}), ep = p("$ZodNullable", (e, t)=>{
    J.init(e, t), y(e._zod, "optin", ()=>t.innerType._zod.optin), y(e._zod, "optout", ()=>t.innerType._zod.optout), y(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${m(e.source)}|null)$`) : void 0;
    }), y(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), eu = p("$ZodCatch", (e, t)=>{
    J.init(e, t), y(e._zod, "optin", ()=>t.innerType._zod.optin), y(e._zod, "optout", ()=>t.innerType._zod.optout), y(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let n = t.innerType._zod.run(e, r);
        return n instanceof Promise ? n.then((n)=>(e.value = n.value, n.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: n.issues.map((e)=>R(e, r, b()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = n.value, n.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: n.issues.map((e)=>R(e, r, b()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), e_ = p("$ZodLazy", (e, t)=>{
    J.init(e, t), y(e._zod, "innerType", ()=>t.getter()), y(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), y(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), y(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), y(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
const ef = p("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    J.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>A(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>U(e, t, r), e.parseAsync = async (t, r)=>Z(e, t, r, {
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
        }), e.with = e.check, e.clone = (t, r)=>O(e, t, r), e.brand = ()=>e, e.register = (t, r)=>(t.add(e, r), e), e.apply = (t)=>t(e);
}), eb = p("ZodMiniString", (e, t)=>{
    X.init(e, t), ef.init(e, t);
});
function eg(e) {
    return new eb({
        type: "string",
        ...M(e)
    });
}
const eh = p("ZodMiniNumber", (e, t)=>{
    H.init(e, t), ef.init(e, t);
});
function em(e) {
    return new eh({
        type: "number",
        checks: [],
        ...M(e)
    });
}
const ev = p("ZodMiniBoolean", (e, t)=>{
    G.init(e, t), ef.init(e, t);
});
function ey(e) {
    return new ev({
        type: "boolean",
        ...M(e)
    });
}
const ew = p("ZodMiniNull", (e, t)=>{
    K.init(e, t), ef.init(e, t);
}), ex = p("ZodMiniNever", (e, t)=>{
    Q.init(e, t), ef.init(e, t);
});
function ek(e) {
    return new ex({
        type: "never",
        ...M(e)
    });
}
const ez = p("ZodMiniArray", (e, t)=>{
    ee.init(e, t), ef.init(e, t);
});
function ej(e, t) {
    return new ez({
        type: "array",
        element: e,
        ...M(t)
    });
}
const e$ = p("ZodMiniObject", (e, t)=>{
    er.init(e, t), ef.init(e, t), y(e, "shape", ()=>t.shape);
});
function eS(e, t) {
    return new e$({
        type: "object",
        shape: e ?? {},
        ...M(t)
    });
}
function eO(e, t) {
    if (!j(t)) throw Error("Invalid input to extend: expected a plain object");
    let r = e._zod.def.checks;
    if (r && r.length > 0) {
        let r = e._zod.def.shape;
        for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(r, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
    }
    let n = x(e._zod.def, {
        get shape () {
            let r = {
                ...e._zod.def.shape,
                ...t
            };
            return w(this, "shape", r), r;
        }
    });
    return O(e, n);
}
const eM = p("ZodMiniUnion", (e, t)=>{
    ea.init(e, t), ef.init(e, t);
});
function eE(e, t) {
    return new eM({
        type: "union",
        options: e,
        ...M(t)
    });
}
const eC = p("ZodMiniDiscriminatedUnion", (e, t)=>{
    ei.init(e, t), ef.init(e, t);
});
function eP(e, t, r) {
    return new eC({
        type: "union",
        options: t,
        discriminator: e,
        ...M(r)
    });
}
const eT = p("ZodMiniRecord", (e, t)=>{
    es.init(e, t), ef.init(e, t);
});
function eR(e, t, r) {
    return new eT({
        type: "record",
        keyType: e,
        valueType: t,
        ...M(r)
    });
}
const eI = p("ZodMiniEnum", (e, t)=>{
    eo.init(e, t), ef.init(e, t), e.options = Object.values(t.entries);
});
function eN(e, t) {
    return new eI({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...M(t)
    });
}
const eD = p("ZodMiniLiteral", (e, t)=>{
    el.init(e, t), ef.init(e, t);
});
function eA(e, t) {
    return new eD({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...M(t)
    });
}
const eL = p("ZodMiniOptional", (e, t)=>{
    ec.init(e, t), ef.init(e, t);
});
function eZ(e) {
    return new eL({
        type: "optional",
        innerType: e
    });
}
const eU = p("ZodMiniNullable", (e, t)=>{
    ep.init(e, t), ef.init(e, t);
});
function eq(e) {
    return new eU({
        type: "nullable",
        innerType: e
    });
}
const eB = p("ZodMiniCatch", (e, t)=>{
    eu.init(e, t), ef.init(e, t);
}), eV = p("ZodMiniLazy", (e, t)=>{
    e_.init(e, t), ef.init(e, t);
});
function eW() {
    let e = new eV({
        type: "lazy",
        getter: ()=>eE([
                eg(),
                em(),
                ey(),
                new ew({
                    type: "null",
                    ...M(void 0)
                }),
                ej(e),
                eR(eg(), e)
            ])
    });
    return e;
}
let eF = eS({
    error: eE([
        eg(),
        eS({
            code: eg(),
            message: eg()
        })
    ])
});
class eJ extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eX(e) {
    let t = eF.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eJ("rpc", e) : new eJ(e.code, e.message);
    }
    return e;
}
const eH = eS({
    status: eA("pending"),
    job: eg()
}), eG = eP("status", [
    eS({
        status: eA("pending")
    }),
    eS({
        status: eA("ready"),
        chunk: em(),
        chunks: em(),
        bytes: em(),
        data: eg()
    })
]);
let eK = eg(), eQ = em(), eY = ey();
eS({
    optical_sn: eK,
    onu_id: eQ,
    binding_generation: eK
}), eS({
    mqtt_mac: eK,
    binding_generation: eK
});
let e0 = eS({
    mqtt_mac: eK,
    optical_sn: eq(eK),
    onu_id: eq(eQ),
    binding_generation: eK,
    last_seen: eQ,
    reason: eK
}), e1 = {
    target: eK,
    request_id: eZ(eK),
    output: eZ(eK),
    output_truncated: eY,
    error: eZ(eK)
};
const e2 = eP("status", [
    eS({
        ...e1,
        status: eA("executed"),
        exit_code: eq(eQ)
    }),
    eS({
        ...e1,
        status: eA("dispatched"),
        exit_code: eZ(ek())
    }),
    eS({
        ...e1,
        status: eA("timeout"),
        exit_code: eZ(ek())
    }),
    eS({
        ...e1,
        status: eA("error"),
        exit_code: eZ(ek())
    })
]);
let e5 = eS({
    target: e0,
    result: e2,
    binding_current: eY
}), e4 = eS({
    schema_version: eQ,
    compressed_bytes: eQ,
    decompressed_bytes: eQ,
    fields: eR(eK, eS({
        value: eW(),
        member: eK,
        unit: eq(eK)
    })),
    members: ej(eS({
        name: eK,
        bytes: eQ,
        encoding: eK,
        text: eq(eK),
        text_omitted: eY
    })),
    errors: ej(eK)
}), e8 = eS({
    revision: eQ,
    last_received: eQ,
    last_processed_receipt: eq(eQ),
    last_good: eq(eQ),
    error: eq(eK),
    report: eq(e4)
}), e3 = {
    schema_version: eA(1),
    target: e0,
    report: eq(e8)
};
eE([
    eS({
        ...e3,
        state: eN([
            "received",
            "report_unavailable"
        ])
    }),
    eS({
        ...e3,
        read_only: eA(!0)
    })
]);
const e6 = eS({
    schema_version: eA(1),
    devices: ej(eS({
        optical_sn: eK,
        onu_id: eQ,
        model: eK,
        optical_online: eY,
        can_execute: eY,
        mqtt: eq(e0),
        report_revision: eq(eQ)
    })),
    sources: ej(e0)
});
eS({
    schema_version: eA(1),
    operation: e5,
    accounts: eq(ej(eS({
        entry: eE([
            eA(0),
            eA(1),
            eA(2)
        ]),
        username: eK,
        active: eY
    }))),
    write_status: eN([
        "not_applicable",
        "accepted_and_saved",
        "unconfirmed"
    ])
}), eS({
    schema_version: eA(1),
    operation: e5
});
let e7 = eg(), e9 = em(), te = ey(), tt = eZ(e7), tr = eZ(e9), tn = eZ(te);
const ta = eN([
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
]), ti = eN([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), ts = eS({
    id: e7,
    name: eZ(eq(e7)),
    kind: eN([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: e7,
    state: e7,
    reason: tt,
    revision: tt,
    current_revision: tn,
    management_fresh: tn,
    operation_id: tr,
    task_id: eZ(eq(e9)),
    updated_at: tr,
    changes: eZ(ej(eS({
        name: e7,
        desired: e7
    })))
});
let to = eS({
    state: e7,
    reason: tt,
    task_id: eZ(eq(e9)),
    instance: tr
});
const tl = eS({
    cwmp_id: e7,
    state: eN([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: te,
    last_inform: eq(e9),
    age_seconds: eq(e9)
});
let td = eS({
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
    method: tt,
    reason: tt,
    mqtt_target: eq(e7),
    binding_source: tt,
    link_identity_error: eq(e7),
    mqtt_last_seen: eq(e9),
    cwmp_id: tt,
    desired_version: tt,
    generation: tr,
    inflight: tn,
    attempts: tr,
    next_retry_at: tr,
    updated_at: tr,
    settings_verified_at: eq(e9),
    last_inform: eq(e9),
    last_error: eZ(eq(e7)),
    persistence_error: eZ(eq(e7)),
    desired: eZ(eq(eS({
        vlan: e9,
        vlans: ej(e9),
        priority: e9,
        acs_url: e7
    }))),
    listener: eZ(eS({
        enabled: te,
        listen: e7,
        path: e7,
        error: eq(e7)
    })),
    endpoint_notice: tt,
    manual_steps: eZ(ej(e7))
});
const tc = eP("state", [
    td,
    eO(function(e) {
        var t = void 0;
        let r = e._zod.def.checks;
        if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let n = x(e._zod.def, {
            get shape () {
                let r = e._zod.def.shape, n = {
                    ...r
                };
                if (t) for(let e in t){
                    if (!(e in r)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (n[e] = eL ? new eL({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)n[e] = eL ? new eL({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return w(this, "shape", n), n;
            },
            checks: []
        });
        return O(e, n);
    }(td), {
        state: eN([
            "pending",
            "unavailable"
        ]),
        reason: e7
    })
]), tp = eS({
    backend: eZ(eS({
        configured: e7,
        effective: e7,
        available: ej(e7),
        reason: e7
    })),
    state: ta,
    operation_id: tr,
    device: tt,
    optical_sn: tt,
    cwmp_id: tt,
    revision: tt,
    mode: eZ(eN([
        "apply",
        "plan"
    ])),
    started_at: tr,
    current_revision: tn,
    management_fresh: tn,
    reason: tt,
    error: tt,
    attempts: tr,
    next_retry_at: tr,
    reconcile_reason: tt,
    items: ej(ts),
    cwmp_contract: eZ(eS({
        state: e7,
        requested: e7,
        contract: eq(e7),
        reason: e7,
        cache_hit: te,
        schema: e7,
        capabilities: eq(eS({
            wan: e7,
            wlan: e7,
            binding: e7
        }))
    })),
    wan_objects: eZ(eR(e7, eW())),
    wan_lifecycle: eZ(eR(e7, to)),
    wan_stage: eZ(eN([
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
    wifi_objects: eZ(eS({
        owned: ej(e9),
        pending: eq(e7),
        pending_instance: eq(e9)
    })),
    wifi_lifecycle: eZ(eR(e7, to)),
    wifi_stage: eZ(eN([
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
    wifi_cleanup: eZ(eN([
        "disable",
        "preserve",
        "delete"
    ]))
});
let tu = eS({
    enabled: te,
    mode: eN([
        "auto",
        "manual"
    ]),
    vlan: ej(e9),
    priority: e9,
    address: e7,
    acs_url: e7,
    port: e9,
    path: e7,
    dhcp_enabled: te
}), t_ = eS({
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
    plan: ej(eS({
        operation: e7,
        key: e7,
        value: ej(e7)
    }))
});
const tf = eS({
    device: e7,
    name: eq(e7),
    group: eq(e7),
    group_name: eq(e7),
    template: eq(e7),
    template_name: eq(e7),
    optical_sn: e7,
    adapter: e7,
    omci_management: eS({
        state: e7,
        reason: eZ(eq(e7))
    }),
    management: eq(tl),
    acs_bootstrap: tc,
    provisioning: tp,
    services: ej(ts),
    ssids: ej(ts),
    wifi_sync: ti
}), tb = eS({
    enabled: te,
    mode: eN([
        "auto",
        "manual"
    ]),
    method: eA("diff"),
    revision: e7,
    triggers: ej(e7),
    interval_minutes: new eh({
        type: "number",
        coerce: !0,
        checks: [],
        ...M(void 0)
    }),
    error: eq(e7),
    devices: ej(tf),
    management_network: t_,
    omci_management: eW(),
    groups: ej(eS({
        id: e7,
        name: eq(e7),
        template: e7
    })),
    pending_devices: ej(e7)
}), tg = eE([
    eS({
        valid: eA(!0),
        revision: e7,
        devices: e9,
        error: eZ(ek())
    }),
    eS({
        error: e7,
        valid: eZ(ek()),
        revision: eZ(ek()),
        devices: eZ(ek())
    })
]), th = eS({
    restarting: eA(!0)
}), tm = eE([
    eS({
        operation_ids: ej(e9),
        revision: e7
    }),
    eS({
        started: eA(!0),
        mode: eN([
            "apply",
            "plan"
        ])
    }),
    eS({
        reset: eA(!0),
        device: e7
    }),
    eS({
        operation_ids: ej(e9),
        mode: eN([
            "apply",
            "plan"
        ]),
        reconcile: tn,
        retry: tn
    })
]);
let tv = eg(), ty = em(), tw = eq(ty), tx = eR(tv, eS({
    source: tv,
    unit: tv,
    reason: eq(tv),
    raw: eq(tv),
    age_seconds: tw
}));
const tk = eS({
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
    generation: ty,
    error: eq(tv)
}), tz = eN([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tj = eS({
    model: tv,
    wavelength_tx_nm: ty,
    wavelength_rx_nm: ty,
    phy_rate_downlink_gbps: ty,
    phy_rate_uplink_gbps: ty,
    tx_power_dbm: tw,
    laser_bias_current_ma: tw,
    temperature_celsius: tw,
    vcc_voltage: tw,
    cdr_locked: eq(ey()),
    tx_enabled: eq(ey()),
    measurements: tx
}), t$ = eS({
    equipment_id: eq(tv),
    hardware_version: eq(tv),
    software_images: ej(tv),
    omcc_version: tw,
    errors: ej(tv)
});
const tS = eS({
    onu_id: ty,
    vendor: tv,
    model: tv,
    serial_number: tv,
    state: tz,
    business_status: tk,
    management: eq(tl),
    provisioning: eq(tp),
    services: ej(ts),
    ssids: ej(ts),
    wifi_sync: ti,
    acs_bootstrap: eZ(tc),
    identity: eq(t$),
    identity_age_seconds: tw,
    identity_current: ey(),
    fiber_distance_m: tw,
    ranging_delay_rtd_ns: tw,
    equalization_delay_bits: new eB({
        type: "catch",
        innerType: tw,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tw,
    optical_tx_power_dbm: tw,
    firmware_version: tv,
    hardware_version: tv,
    uptime_seconds: tw,
    data_path: eS({
        interface: tv,
        gem_ports: eq(ej(ty)),
        vlan_id: tw,
        tx_bytes: tw,
        rx_bytes: tw,
        current_tx_kbps: tw,
        current_rx_kbps: tw,
        offload: eZ(eS({
            enabled: eZ(eq(ey())),
            routed_enabled: eZ(eq(ey())),
            bridge_enabled: eZ(eq(ey())),
            engine_attached: eZ(eq(ey())),
            forwarding_verified: eZ(eq(ey()))
        })),
        measurements: tx
    }),
    wifi_mesh: eS({
        channel_2g: tw,
        channel_5g: tw,
        bandwidth_5g: eq(tv),
        tx_power_pct: tw,
        measurements: tx
    }),
    connected_clients: eq(ej(eS({
        mac: tv,
        ip: tv,
        band: tv,
        rssi_dbm: tw,
        rx_rate_mbps: tw,
        tx_rate_mbps: tw
    }))),
    measurements: tx
});
let tO = eS({
    reserved_sn: eZ(tv),
    port: ty,
    interface: tv,
    carrier: ey(),
    status: tv,
    onu_id: eZ(ty),
    onu_sn: eZ(tv),
    link_state: tv
});
const tM = eS({
    counters_valid: eZ(ey()),
    packets_exact: eZ(tv),
    bytes_exact: eZ(tv),
    index: tv,
    state: tv,
    pkt_type: tv,
    orig_tuple: tv,
    new_tuple: tv,
    eth: tv,
    vlan: tv,
    packets: ty,
    bytes: ty
}), tE = eS({
    sampled_at_ms: eZ(ty),
    errors: eZ(ej(tv)),
    config_valid: eZ(ey()),
    engine_valid: eZ(ey()),
    mask_valid: eZ(ey()),
    routed_mask_valid: eZ(ey()),
    debug_valid: eZ(ey()),
    flows_valid: eZ(ey()),
    entries_valid: eZ(ey()),
    counters_valid: eZ(ey()),
    hooks_valid: eZ(ey()),
    total_packets_exact: eZ(tv),
    total_bytes_exact: eZ(tv),
    supported: ey(),
    engine_attached: ey(),
    bridge_offload_enabled: ey(),
    bridge_offload_mask: ty,
    routed_offload_mask: ty,
    bridge_offload_debug: ey(),
    bridge: tv,
    active_ports: ej(tv),
    fw4_hooks_ready: ey(),
    total_entries: ty,
    bound_entries: ty,
    total_packets: ty,
    total_bytes: ty,
    bound_flows: ej(tM)
}), tC = eO(tE, {
    sampled_at_ms: ty,
    errors: ej(tv),
    config_valid: ey(),
    engine_valid: ey(),
    mask_valid: ey(),
    routed_mask_valid: ey(),
    debug_valid: ey(),
    flows_valid: ey(),
    entries_valid: ey(),
    counters_valid: ey(),
    hooks_valid: ey(),
    total_packets_exact: tv,
    total_bytes_exact: tv,
    bound_ipv4_entries: ty,
    bound_ipv6_entries: ty,
    bound_flows: ej(eO(tM, {
        counters_valid: ey(),
        packets_exact: tv,
        bytes_exact: tv
    }))
}), tP = eS({
    ubus: eZ(eR(tv, eS({
        calls: ty,
        failures: ty,
        last_us: ty,
        max_us: ty,
        total_us: ty
    }))),
    jobs: eZ(eS({
        accepting: ey(),
        running: ty,
        stored: ty,
        bytes: ty,
        running_limit: ty,
        stored_limit: ty,
        bytes_limit: ty,
        result_bytes_limit: ty
    })),
    onu_pinning: eZ(eS({
        desired: eR(tv, ty),
        active: eR(tv, ty),
        pending_restart: ey(),
        allocation_blocked: ey(),
        startup_error: eq(tv),
        config_error: eq(tv)
    })),
    fpga_status: tv,
    provisioning: eq(tb),
    optical_transceiver: tj,
    switch_ports: ej(tO),
    sub_gateways: ej(tS),
    telemetry_gateways: ej(eS({
        id: tv,
        last_seen_sec_ago: ty,
        last_payload_bytes: ty
    })),
    npu: eZ(eq(tE))
});
eR(tv, eS({
    carrier: eZ(ey()),
    mac: eZ(tv),
    link: eZ(eS({
        speed: eZ(ty),
        duplex: eZ(tv),
        autoneg: eZ(ey())
    })),
    stats: eZ(eR(tv, ty))
}));
const tT = eP("status", [
    eS({
        status: eA("success"),
        enabled: ey()
    }),
    eS({
        status: eA("error"),
        error: eg()
    })
]), tR = eS({
    source: eN([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: eg(),
    size: em(),
    sha256: eg(),
    data: eg(),
    factory: eS({
        detected: ey(),
        device: eg(),
        has_data: ey(),
        sha256: eg(),
        data: eg()
    }),
    firmware: eS({
        exists: ey(),
        path: eg(),
        size: em(),
        sha256: eg(),
        data: eg()
    }),
    error: eZ(eg())
}), tI = eS({
    success: ey(),
    path: eg(),
    size: em(),
    sha256: eg(),
    error: eZ(eg())
});
eS({
    success: ey(),
    output: eZ(eg()),
    error: eZ(eg())
});
const tN = eP("status", [
    eS({
        status: eA("pending"),
        progress: eZ(eS({
            phase: eN([
                "starting",
                "upload",
                "tables"
            ]),
            received: em(),
            expected: eq(em())
        }))
    }),
    eS({
        status: eA("ready"),
        chunk: em(),
        chunks: em(),
        bytes: em(),
        data: eg()
    })
]), tD = eS({
    released: ey()
}), tA = eS({
    schema_version: eA(1),
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
    desired_enabled: eq(ey()),
    tx_enabled: eq(ey()),
    actor_state: eN([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: ey(),
    discovery_active: ey(),
    cleanup_pending: ey(),
    error: eq(eS({
        code: eg(),
        message: eg()
    }))
}), tL = eS({
    schema_version: eA(1),
    version: eg(),
    features: eR(eg(), ey()),
    functions: eS({
        optical: ey(),
        omci_mib: ey(),
        mqtt_telemetry: ey(),
        hl202_management: ey(),
        cwmp: ey()
    }),
    pages: eS({
        status: ey(),
        config: ey(),
        sync: ey(),
        hl202: ey(),
        hardware: ey(),
        calibration: ey(),
        about: ey()
    }),
    adapters: ej(eS({
        id: eg(),
        name: eg()
    }))
}), tZ = {
    getCapabilities: {
        parse: (e)=>tL.parse(eX(e))
    },
    opticalStatus: tA,
    opticalSet: tA,
    getStatus: {
        parse: (e)=>tP.parse(eX(e))
    },
    getSync: {
        parse: (e)=>tb.parse(eX(e))
    },
    configCheck: tg,
    npuStatus: tC,
    configReload: {
        parse: (e)=>tb.parse(eX(e))
    },
    restartService: {
        parse: (e)=>th.parse(eX(e))
    },
    sync: {
        parse: (e)=>tm.parse(eX(e))
    },
    npuSet: tT,
    mibStart: {
        parse: (e)=>eH.parse(eX(e))
    },
    mibResult: {
        parse: (e)=>tN.parse(eX(e))
    },
    jobRelease: {
        parse: (e)=>tD.parse(eX(e))
    },
    hl202List: {
        parse: (e)=>e6.parse(eX(e))
    },
    hl202Report: {
        parse: (e)=>eH.parse(eX(e))
    },
    hl202AccountsStart: {
        parse: (e)=>eH.parse(eX(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>eH.parse(eX(e))
    },
    hl202ExecStart: {
        parse: (e)=>eH.parse(eX(e))
    },
    jobResult: {
        parse: (e)=>eG.parse(eX(e))
    },
    getCalibration: {
        parse: (e)=>tR.parse(eX(e))
    },
    saveCalibration: {
        parse: (e)=>tI.parse(eX(e))
    },
    applyCalibration: {
        parse: (e)=>eH.parse(eX(e))
    }
};
function tU() {
    var e;
    let r, n, a, i, s, o, l, d, c, p, u, f, b, g, h, m, v, y, w, x, k, z, j;
    return t ??= (e = L.rpc, r = e.declare({
        object: "fttr",
        method: "get_capabilities",
        reject: !0
    }), n = e.declare({
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
    }), i = e.declare({
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
    }), b = e.declare({
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
        getCapabilities: async ()=>tZ.getCapabilities.parse(await r()),
        opticalStatus: async ()=>tZ.opticalStatus.parse(await n()),
        opticalSet: async (e)=>tZ.opticalSet.parse(await a(e.enabled)),
        getStatus: async ()=>tZ.getStatus.parse(await i()),
        getSync: async ()=>tZ.getSync.parse(await s()),
        configCheck: async ()=>tZ.configCheck.parse(await o()),
        npuStatus: async ()=>tZ.npuStatus.parse(await l()),
        configReload: async ()=>tZ.configReload.parse(await d()),
        restartService: async ()=>tZ.restartService.parse(await c()),
        sync: async (e)=>tZ.sync.parse(await p(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>tZ.npuSet.parse(await u(e.enabled, e.bridge)),
        mibStart: async (e)=>tZ.mibStart.parse(await f(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>tZ.mibResult.parse(await b(e.job, e.chunk)),
        jobRelease: async (e)=>tZ.jobRelease.parse(await g(e.job)),
        hl202List: async ()=>tZ.hl202List.parse(await h()),
        hl202Report: async (e)=>tZ.hl202Report.parse(await m(e.target)),
        hl202AccountsStart: async (e)=>tZ.hl202AccountsStart.parse(await v(e.target)),
        hl202AccountUpdate: async (e)=>tZ.hl202AccountUpdate.parse(await y(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>tZ.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>tZ.jobResult.parse(await x(e.job, e.chunk)),
        getCalibration: async ()=>tZ.getCalibration.parse(await k()),
        saveCalibration: async (e)=>tZ.saveCalibration.parse(await z(e.data)),
        applyCalibration: async ()=>tZ.applyCalibration.parse(await j())
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
const tq = async ()=>tU().getStatus(), tB = async ()=>tU().opticalStatus(), tV = async (e)=>tU().opticalSet({
        enabled: e
    });
let tW = eg(), tF = em(), tJ = ey(), tX = eS({
    id: tW,
    url: tW
}), tH = eS({
    name: tW,
    kind: eN([
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
    index: tF,
    mask: tF,
    size: tF,
    read: tJ,
    write: tJ,
    set_by_create: tJ,
    avc: tJ,
    optional: tJ,
    deprecated: tJ,
    default_hex: eq(tW),
    reference: tX
}), tG = eP("type", [
    eS({
        type: eA("unsigned"),
        value: tF
    }),
    eS({
        type: eA("signed"),
        value: tF
    }),
    eS({
        type: eA("decimal"),
        value: tW
    }),
    eS({
        type: eA("text"),
        value: eq(tW)
    }),
    eS({
        type: eA("octets"),
        hex: tW
    }),
    eS({
        type: eA("table_length"),
        bytes: tF
    })
]), tK = eS({
    code: tW,
    message: tW,
    offset: tF,
    mask: tF
}), tQ = eN([
    "layout",
    "name_only",
    "unknown"
]), tY = eS({
    raw_hex: tW,
    filter_outer_priority: tF,
    filter_outer_vid: tF,
    filter_outer_tpid_dei: tF,
    filter_inner_priority: tF,
    filter_inner_vid: tF,
    filter_inner_tpid_dei: tF,
    filter_ethertype: tF,
    tags_to_remove: tF,
    treatment_outer_priority: tF,
    treatment_outer_vid: tF,
    treatment_outer_tpid_dei: tF,
    treatment_inner_priority: tF,
    treatment_inner_vid: tF,
    treatment_inner_tpid_dei: tF,
    delete_entry: tJ
}), t0 = eS({
    schema_version: eA(1),
    reference_version: tW,
    onu_id: eq(tF),
    uploaded_complete: tJ,
    expected_records: tF,
    received_records: tF,
    decoded_records: tF,
    partial_records: tF,
    basic_records: tF,
    tables_requested: tJ,
    tables_collected: tJ,
    classes: ej(eS({
        class_id: tF,
        name: eq(tW),
        entities: tF,
        records: tF,
        support: tQ
    })),
    entities: ej(eS({
        class_id: tF,
        entity_id: tF,
        name: eq(tW),
        support: tQ,
        reference: eq(tX),
        sequences: ej(tF),
        attributes: ej(eS({
            definition: tH,
            value: eq(tG),
            observations: ej(eS({
                raw_hex: tW,
                value: tG,
                sequences: ej(tF)
            }))
        })),
        diagnostics: ej(tK)
    })),
    records: ej(eS({
        class_id: tF,
        entity_id: tF,
        sequence: tF,
        attribute_mask: tF,
        raw_hex: tW,
        consumed: tF,
        remaining_hex: tW,
        undecoded_mask: tF
    })),
    tables: ej(eS({
        class_id: tF,
        entity_id: tF,
        attribute: tH,
        collected: tJ,
        error: eq(tW),
        raw_hex: tW,
        rows: ej(tW),
        vlan_rules: ej(tY)
    })),
    diagnostics: ej(tK)
});
const t1 = eS({
    status: eA("ready"),
    report: t0
}), t2 = async (e, t, r)=>tU().mibStart({
        onu_id: e,
        optical_sn: t,
        tables: r
    }), t5 = async (e, t)=>tU().mibResult({
        job: e,
        chunk: t
    }), t4 = async (e)=>tU().jobRelease({
        job: e
    });
function t8(e) {
    let t = "none" === e.tone ? "" : `fttr-badge fttr-badge-${e.tone}`, r = e.class ? ` ${e.class}` : "", n = o("span", {
        class: `${t}${r}`.trim(),
        children: e.children
    });
    return e.title && n.setAttribute("title", e.title), n;
}
const t3 = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
};
function t6(e) {
    var t;
    let r = (t = e.state) ? "o5_operation" === t ? {
        tone: "success",
        label: t3.o5_operation,
        title: t
    } : {
        tone: "warning",
        label: t3[t] ?? l(t),
        title: t
    } : {
        tone: "none",
        label: "\u2014"
    };
    return o(t8, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
function t7(e) {
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
    return o(t8, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const t9 = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
};
function re(e) {
    var t;
    let r, n, a, i, s, d, p = (t = e.management, r = t?.state, n = c(t?.age_seconds ?? (t?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - t.last_inform) : null)), i = (a = t?.last_inform ? new Date(1000 * t.last_inform).toLocaleString() : null) ? _("Last Inform: %s").replace("%s", a) : void 0, s = "\u2014", d = "none", "online" === r ? (d = "success", s = t9.online) : "waiting_inform" === r ? (d = "warning", s = t9.waiting_inform) : "offline_or_stale" === r ? (d = "danger", s = t9.offline_or_stale) : r && (d = "neutral", s = l(r)), {
        tone: d,
        label: n && r ? `${s} \xb7 ${n}` : s,
        title: i
    });
    return o(t8, {
        tone: p.tone,
        title: p.title,
        children: p.label
    });
}
const rt = {
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
function rr(e) {
    var t, r;
    let n, a, i, s = (t = e.provisioning, r = e.title, n = t?.state, a = t?.next_retry_at && t.next_retry_at > Math.floor(Date.now() / 1000) ? t.next_retry_at - Math.floor(Date.now() / 1000) : 0, i = r ?? (t?.current_revision === !1 ? _("Previous configuration") : t?.management_fresh === !1 ? _("Management stale") : t?.reconcile_reason ? t.reconcile_reason : a > 0 ? _("Next self-healing retry in %d seconds").replace("%d", String(a)) : t?.reason ?? t?.error), n && "not_started" !== n ? "completed" === n || "verified" === n ? {
        tone: "success",
        label: "completed" === n ? rt.completed : _("Ready"),
        title: i
    } : "wan_reconciling" === n || "wan_verifying" === n || "wifi_reconciling" === n || "discovering" === n || "reading" === n || "disabling" === n || "disabling_read" === n || "writing" === n || "verifying" === n || "settling" === n || "recovering" === n || "waiting_task" === n ? {
        tone: "info",
        label: rt[n] ?? l(n),
        title: i
    } : "interrupted" === n || "failed" === n || "error" === n || "blocked" === n ? {
        tone: "danger",
        label: "blocked" === n ? rt.blocked : rt.interrupted,
        title: i
    } : "waiting" === n || "pending" === n || "waiting_management" === n || "reset_pending" === n ? {
        tone: "warning",
        label: rt[n] ?? rt.waiting,
        title: i
    } : {
        tone: "neutral",
        label: l(n),
        title: i
    } : {
        tone: "neutral",
        label: rt.not_started,
        title: i
    });
    return o(t8, {
        tone: s.tone,
        title: s.title,
        children: s.label
    });
}
const rn = {
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
function ra(e) {
    var t;
    let r = (t = e.state) && "not_configured" !== t ? "verified" === t ? {
        tone: "success",
        label: rn.verified
    } : "attention_required" === t ? {
        tone: "danger",
        label: rn.attention_required
    } : "stale_revision" === t || "stale_management" === t || "waiting_management" === t ? {
        tone: "warning",
        label: rn[t]
    } : "recovering" === t ? {
        tone: "info",
        label: rn.recovering
    } : "accepted_unverified" === t || "pending" === t ? {
        tone: "warning",
        label: rn[t]
    } : {
        tone: "neutral",
        label: l(t)
    } : {
        tone: "neutral",
        label: rn.not_configured
    };
    return o(t8, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const ri = `
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
let rs = (e)=>JSON.stringify(e, null, 2);
async function ro(e) {
    let t = [
        "{"
    ], r = !0;
    for (let [n, a] of Object.entries(e))if (r || t.push(","), r = !1, t.push(JSON.stringify(n), ":"), Array.isArray(a)) {
        t.push("[");
        for(let e = 0; e < a.length; e++){
            e && t.push(",");
            let r = JSON.stringify(a[e]);
            if (void 0 === r) throw Error(_("MIB snapshot cannot be serialized"));
            t.push(r), e % 32 == 31 && await new Promise((e)=>setTimeout(e, 0));
        }
        t.push("]");
    } else {
        let e = JSON.stringify(a);
        if (void 0 === e) throw Error(_("MIB snapshot cannot be serialized"));
        t.push(e);
    }
    return t.push("}"), new Blob(t, {
        type: "application/json"
    });
}
function rl(e) {
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
let rd = L.view, rc = null, rp = null, ru = null, r_ = !1, rf = 0;
function rb(e) {
    let t = ru;
    if (!t) return;
    let r = t.querySelector('[data-fttr="laser-state"]'), n = t.querySelector('[data-fttr="laser-toggle"]');
    if (!(r instanceof HTMLElement) || !(n instanceof HTMLButtonElement)) return;
    !0 === e ? (r.textContent = _("TX enabled (reset readback)"), r.className = "fttr-badge fttr-badge-success") : !1 === e ? (r.textContent = _("Off (TX disabled)"), r.className = "fttr-badge fttr-badge-warning") : (r.textContent = _("Unknown"), r.className = "fttr-badge fttr-badge-neutral"), n.textContent = !1 === e ? _("Turn laser on") : _("Turn laser off"), n.disabled = r_, n.onclick = async ()=>{
        if (r_) return;
        let e = !1 === rc, t = e ? _("Re-enable the 1490nm downlink laser? Discovery resumes and sub-gateways can register again.") : _("Turn off the 1490nm downlink laser? All sub-gateways are gracefully disconnected and cannot register until the laser is re-enabled. This setting is saved and reapplied after a reboot.");
        if (window.confirm(t)) {
            r_ = !0, rf++, rb(rc);
            try {
                let t = await tV(e);
                if (rp = t, rc = t.tx_enabled, "error" === t.status) return void window.alert(`${_("Failed to change laser output")}: ${t.error?.message ?? _("unknown error")}`);
            } catch (e) {
                rc = null, rp = null, window.alert(`${_("Failed to change laser output")}: ${String(e)}`);
            } finally{
                r_ = !1, rb(rc);
            }
        }
    };
    let a = t.querySelector('[data-fttr="laser-detail"]');
    if (a instanceof HTMLElement) {
        let e = rp?.desired_enabled;
        a.textContent = [
            !0 === e ? _("Saved setting: on") : !1 === e ? _("Saved setting: off") : _("Saved setting: unknown"),
            rp ? rp.discovery_active ? _("Discovery active") : _("Discovery paused") : _("Discovery state: unknown"),
            rp?.cleanup_pending ? _("ONU cleanup pending") : "",
            rp?.error?.message ?? ""
        ].filter(Boolean).join(" \xb7 ");
    }
}
function rg(e) {
    var t, r, n, a, i, s, c, p, u, f, b, g, h, m, v, y, w, x, k, z, j;
    let $ = e.optical_transceiver, S = o("span", {
        class: `fttr-badge ${"ready" === e.fpga_status ? "fttr-badge-success" : "fttr-badge-neutral"}`,
        style: "font-size:95%",
        children: "ready" === e.fpga_status ? _("Ready") : l(e.fpga_status)
    }), O = null === (t = $.cdr_locked) ? o("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: _("Unknown")
    }) : t ? o("span", {
        class: "fttr-badge fttr-badge-success",
        children: _("Locked")
    }) : o("span", {
        class: "fttr-badge fttr-badge-warning",
        children: _("Unlocked")
    });
    return j = {
        class: "cbi-section fttr-panel-controller",
        children: [
            o("h3", {
                style: "margin-bottom:12px",
                children: _("Controller hardware")
            }),
            (x = {
                class: "fttr-grid-3",
                children: [
                    (i = {
                        class: "fttr-card",
                        children: [
                            o("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: _("FPGA status")
                            }),
                            (r = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("FPGA status")
                                    }),
                                    o("span", {
                                        children: S
                                    })
                                ]
                            }, o("div", r)),
                            (n = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("FPGA identifier")
                                    }),
                                    o("code", {
                                        children: l(e.fpga_status)
                                    })
                                ]
                            }, o("div", n)),
                            (a = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("CDR lock")
                                    }),
                                    o("span", {
                                        children: O
                                    })
                                ]
                            }, o("div", a))
                        ]
                    }, o("div", i)),
                    (f = {
                        class: "fttr-card",
                        children: [
                            o("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: _("Optical transceiver")
                            }),
                            (s = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("Module model")
                                    }),
                                    o("strong", {
                                        children: l($.model)
                                    })
                                ]
                            }, o("div", s)),
                            (c = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("TX wavelength")
                                    }),
                                    o("span", {
                                        children: $.wavelength_tx_nm ? `${$.wavelength_tx_nm} nm` : "\u2014"
                                    })
                                ]
                            }, o("div", c)),
                            (p = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("RX wavelength")
                                    }),
                                    o("span", {
                                        children: $.wavelength_rx_nm ? `${$.wavelength_rx_nm} nm` : "\u2014"
                                    })
                                ]
                            }, o("div", p)),
                            (u = {
                                class: "fttr-kv-row",
                                "data-fttr": "laser-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("Laser output")
                                    }),
                                    o("span", {
                                        class: "fttr-badge fttr-badge-neutral",
                                        "data-fttr": "laser-state",
                                        children: _("Loading\u2026")
                                    })
                                ]
                            }, o("div", u)),
                            o("div", {
                                "data-fttr": "laser-detail",
                                style: "font-size:85%;margin-top:8px"
                            })
                        ]
                    }, o("div", f)),
                    (w = {
                        class: "fttr-card",
                        children: [
                            o("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: _("Physical rates and diagnostics")
                            }),
                            (b = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("Downlink PHY rate")
                                    }),
                                    o("span", {
                                        children: $.phy_rate_downlink_gbps ? `${$.phy_rate_downlink_gbps} Gbps` : "\u2014"
                                    })
                                ]
                            }, o("div", b)),
                            (g = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("Uplink PHY rate")
                                    }),
                                    o("span", {
                                        children: $.phy_rate_uplink_gbps ? `${$.phy_rate_uplink_gbps} Gbps` : "\u2014"
                                    })
                                ]
                            }, o("div", g)),
                            (h = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("Temperature")
                                    }),
                                    o("span", {
                                        children: null == $.temperature_celsius ? "\u2014" : `${$.temperature_celsius} \xb0C`
                                    })
                                ]
                            }, o("div", h)),
                            (m = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("TX power")
                                    }),
                                    o("span", {
                                        children: d($.tx_power_dbm)
                                    })
                                ]
                            }, o("div", m)),
                            (v = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("Voltage")
                                    }),
                                    o("span", {
                                        children: null == $.vcc_voltage ? "\u2014" : `${$.vcc_voltage} V`
                                    })
                                ]
                            }, o("div", v)),
                            (y = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("Bias current")
                                    }),
                                    o("span", {
                                        children: null == $.laser_bias_current_ma ? "\u2014" : `${$.laser_bias_current_ma} mA`
                                    })
                                ]
                            }, o("div", y))
                        ]
                    }, o("div", w))
                ]
            }, o("div", x)),
            (z = {
                class: "fttr-kv-row",
                style: "margin-top:10px",
                children: [
                    o("span", {
                        class: "fttr-kv-label",
                        children: _("Laser control")
                    }),
                    (k = {
                        children: o("button", {
                            class: "fttr-btn-subtle",
                            "data-fttr": "laser-toggle",
                            type: "button",
                            disabled: !0,
                            children: _("Loading\u2026")
                        })
                    }, o("span", k))
                ]
            }, o("div", z))
        ]
    }, o("div", j);
}
function rh(e) {
    var t, r;
    return e.length ? (t = {
        class: "fttr-panel-subgateways",
        children: e.map((e)=>{
            var t, r, n, a, i, p, u, f, b, g, h, m, v, y, w, x, k, z, j, $, S, O, M;
            let C = e.identity, P = C?.software_images ?? [], T = function(e) {
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
            }(e.firmware_version), R = e.identity ? e.identity_current ? _("Current registration") : _("Cached identity") : _("Not collected"), I = o("span", {
                class: `fttr-badge ${e.identity_current ? "fttr-badge-info" : "fttr-badge-neutral"}`,
                style: "font-size:80%",
                children: R
            });
            return M = {
                class: "cbi-section fttr-onu-card",
                children: [
                    (p = {
                        class: "fttr-card-header",
                        children: [
                            (n = {
                                class: "fttr-card-title-group",
                                children: [
                                    o("h3", {
                                        style: "margin:0",
                                        children: _("Sub-gateway %s \u2014 %s").replace("%s", String(e.onu_id)).replace("%s", l(e.model))
                                    }),
                                    (r = {
                                        class: "fttr-card-meta-tags",
                                        children: [
                                            o("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                children: e.vendor
                                            }),
                                            o("code", {
                                                children: e.serial_number
                                            }),
                                            (t = e.state) ? "o5_operation" === t || "online" === t || "ready" === t || "connected" === t ? o("span", {
                                                class: "fttr-badge fttr-badge-success",
                                                title: t,
                                                children: "o5_operation" === t ? _("Connected") : _("Ready")
                                            }) : t.includes("O4") || t.includes("ranging") || t.includes("sync") ? o("span", {
                                                class: "fttr-badge fttr-badge-warning",
                                                title: t,
                                                children: t
                                            }) : o("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                title: t,
                                                children: t
                                            }) : o("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                children: "\u2014"
                                            }),
                                            I
                                        ]
                                    }, o("div", r))
                                ]
                            }, o("div", n)),
                            (i = {
                                children: (a = {
                                    type: "button",
                                    class: "fttr-btn-subtle",
                                    onclick: ()=>(function(e) {
                                            var t, r, n, a, i, c, p, u, f, b, g, h;
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
                                                                o(t6, {
                                                                    state: e.state
                                                                })
                                                            ],
                                                            [
                                                                _("Business"),
                                                                o(t7, {
                                                                    status: e.business_status
                                                                })
                                                            ],
                                                            [
                                                                _("Receive optical power"),
                                                                d(e.optical_rx_power_dbm)
                                                            ],
                                                            [
                                                                _("Transmit optical power"),
                                                                d(e.optical_tx_power_dbm)
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
                                                                    let t = Math.floor(e), r = Math.floor(t / 86400), n = Math.floor(t % 86400 / 3600), a = Math.floor(t % 3600 / 60), i = [];
                                                                    return r > 0 && i.push(`${r}d`), (n > 0 || r > 0) && i.push(`${n}h`), (a > 0 || n > 0 || r > 0) && i.push(`${a}m`), i.push(`${t % 60}s`), i.join(" ");
                                                                }(e.uptime_seconds)} (${Math.floor(e.uptime_seconds)} s)`
                                                            ]
                                                        ]
                                                    },
                                                    {
                                                        title: _("Management & cache"),
                                                        rows: [
                                                            [
                                                                _("CWMP"),
                                                                o(re, {
                                                                    management: e.management
                                                                })
                                                            ],
                                                            [
                                                                _("Last Inform"),
                                                                e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
                                                            ],
                                                            [
                                                                _("Provisioning"),
                                                                o(rr, {
                                                                    provisioning: e.provisioning
                                                                })
                                                            ],
                                                            [
                                                                _("Wi-Fi sync"),
                                                                o(ra, {
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
                                            }, o("div", n)), $ = o("div", {}), S = o("pre", {
                                                class: "onu-raw-pre"
                                            }), O = o("span", {
                                                class: "download-status",
                                                role: "status"
                                            }), M = null, C = o("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                disabled: !0,
                                                onclick: async ()=>{
                                                    if (w && !v) {
                                                        C.disabled = !0, O.textContent = _("Preparing JSON download\u2026");
                                                        try {
                                                            let t = await ro(w);
                                                            if (v) return;
                                                            M && URL.revokeObjectURL(M), M = URL.createObjectURL(t);
                                                            let r = document.createElement("a");
                                                            r.href = M, r.download = `mib-${e.serial_number}.json`, r.click(), O.textContent = _("JSON download started"), window.setTimeout(()=>{
                                                                URL.revokeObjectURL(r.href), M === r.href && (M = null);
                                                            }, 1000);
                                                        } catch (e) {
                                                            O.textContent = String(e);
                                                        } finally{
                                                            C.disabled = !w || v;
                                                        }
                                                    }
                                                },
                                                children: _("Download JSON")
                                            }), P = (i = {
                                                class: "onu-raw-panel",
                                                children: [
                                                    (a = {
                                                        class: "onu-raw-toolbar",
                                                        children: [
                                                            o("span", {
                                                                class: "onu-raw-hint",
                                                                children: _("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")
                                                            }),
                                                            o("div", {
                                                                class: "onu-raw-actions",
                                                                children: [
                                                                    C,
                                                                    O
                                                                ]
                                                            })
                                                        ]
                                                    }, o("div", a)),
                                                    S
                                                ]
                                            }, o("div", i)), T = o("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-apply",
                                                onclick: ()=>B(!1),
                                                children: _("Read MIB")
                                            }), R = o("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                onclick: ()=>B(!0),
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
                                                                    R,
                                                                    o("small", {
                                                                        class: "mib-action-hint",
                                                                        children: _("Collecting VLAN tables queries extended filter tables and takes longer.")
                                                                    })
                                                                ]
                                                            }, o("div", c)),
                                                            z,
                                                            j
                                                        ]
                                                    }, o("div", p)),
                                                    $
                                                ]
                                            }, o("div", u)), N = {
                                                basic: k,
                                                mib: I,
                                                raw: P
                                            }, D = new Map();
                                            function A(e) {
                                                for (let [t, r] of Object.entries(N))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                                                for (let [t, r] of D)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
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
                                                                t.preventDefault(), A(e.id);
                                                            },
                                                            children: e.label
                                                        })
                                                    }, o("li", t));
                                                    return D.set(e.id, r), r;
                                                })
                                            }, o("ul", f)), U = (h = {
                                                children: [
                                                    o("div", {
                                                        class: "onu-details-header",
                                                        children: Z
                                                    }),
                                                    (b = {
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
				${ri}
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
                                                            P
                                                        ]
                                                    }, o("div", b)),
                                                    (g = {
                                                        class: "right onu-details-footer",
                                                        children: o("button", {
                                                            type: "button",
                                                            class: "cbi-button",
                                                            onclick: ()=>{
                                                                v = !0, M && URL.revokeObjectURL(M), M = null, w = null, S.textContent = "", $.replaceChildren(), L.ui.hideModal();
                                                            },
                                                            children: _("Close")
                                                        })
                                                    }, o("div", g))
                                                ]
                                            }, o(s, h)), q = ()=>!v && U.isConnected && U.getClientRects().length > 0;
                                            async function B(t) {
                                                if (!y) {
                                                    y = !0, T.disabled = R.disabled = !0, j.style.display = "", j.title = "0%", j.firstElementChild.style.width = "0%", z.textContent = _("Reading MIB\u2026");
                                                    try {
                                                        let v = await tq(), y = v.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                                        if (y?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                                        if (!q()) return;
                                                        let k = await t2(y.onu_id, y.serial_number, t);
                                                        x = k.job;
                                                        let O = Date.now() + 140000;
                                                        for(; q();){
                                                            let e = await t5(k.job, 0);
                                                            if (!q()) return;
                                                            if ("ready" === e.status) {
                                                                var r, n, a, i, s, d, c, p, u, f, b, g, h, m;
                                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                                let t = new Uint8Array(e.bytes), v = 0;
                                                                for(let r = 0; r < e.chunks; r++){
                                                                    let n = 0 === r ? e : await t5(k.job, r);
                                                                    if (!q()) return;
                                                                    if ("ready" !== n.status || n.chunk !== r || n.chunks !== e.chunks || n.bytes !== e.bytes || !n.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                                    let a = atob(n.data);
                                                                    if (a.length > 32768 || v + a.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                                    for(let e = 0; e < a.length; e++)t[v++] = a.charCodeAt(e);
                                                                    let i = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                                                    j.title = `${i}%`, j.firstElementChild.style.width = `${i}%`, z.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                                                }
                                                                if (v !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                                if (await V(), w = t1.parse(eX(JSON.parse(new TextDecoder("utf-8", {
                                                                    fatal: !0
                                                                }).decode(t)))).report, 1 !== w.schema_version || w.onu_id !== y.onu_id) throw Error(_("Unexpected MIB response"));
                                                                j.style.display = "none", z.replaceChildren((r = w, b = {
                                                                    class: "mib-chips",
                                                                    children: [
                                                                        (a = {
                                                                            class: "mib-chip mib-chip-primary",
                                                                            children: [
                                                                                "ONU ",
                                                                                r.onu_id
                                                                            ]
                                                                        }, o("span", a)),
                                                                        (i = {
                                                                            class: `mib-chip ${r.uploaded_complete ? "mib-chip-success" : "mib-chip-warning"}`,
                                                                            children: r.uploaded_complete ? _("Upload complete") : _("Upload incomplete")
                                                                        }, o("span", i)),
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
                                                                }, o("div", b))), $.replaceChildren(function(e) {
                                                                    var t, r, n, a, i, s;
                                                                    let d = e.classes.length ? e.classes[0].class_id : null, c = (t = {
                                                                        class: "mib-content"
                                                                    }, o("div", t)), p = (r = {
                                                                        type: "search",
                                                                        class: "cbi-input-text mib-search-input",
                                                                        placeholder: _("Search ME name or Class ID\u2026")
                                                                    }, o("input", r)), u = (n = {
                                                                        class: "mib-class-list"
                                                                    }, o("div", n)), f = new Map();
                                                                    function b(t) {
                                                                        var r, n;
                                                                        for (let [e, r] of (d = t, f))e === t ? r.classList.add("active") : r.classList.remove("active");
                                                                        let a = e.entities.filter((e)=>e.class_id === t);
                                                                        a.length ? c.replaceChildren(...a.map((r, n)=>{
                                                                            var a, i, s, d, c, p, u, f, b, g, h, m, v, y, w, x, k, z, j;
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
                                                                                                    (a = {
                                                                                                        children: l(r.name)
                                                                                                    }, o("strong", a)),
                                                                                                    (i = {
                                                                                                        class: "mib-entity-id-tag",
                                                                                                        children: [
                                                                                                            _("Entity"),
                                                                                                            " ",
                                                                                                            r.entity_id,
                                                                                                            " (0x",
                                                                                                            r.entity_id.toString(16),
                                                                                                            ")"
                                                                                                        ]
                                                                                                    }, o("span", i))
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
                                                                                                        children: (g = {
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
                                                                                                                (b = {
                                                                                                                    style: "width:18%",
                                                                                                                    children: _("Definition")
                                                                                                                }, o("th", b))
                                                                                                            ]
                                                                                                        }, o("tr", g))
                                                                                                    }, o("thead", h)),
                                                                                                    (m = {
                                                                                                        children: r.attributes.map((e)=>{
                                                                                                            var t, r, n, a, i, s, d, c, p, u;
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
                                                                                                                            (a = {
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
                                                                                                                                            throw new eJ("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                                                    }
                                                                                                                                }(e.value)
                                                                                                                            }, o("span", a)),
                                                                                                                            e.observations?.length ? (d = {
                                                                                                                                class: "mib-obs-details",
                                                                                                                                children: [
                                                                                                                                    (i = {
                                                                                                                                        children: _("Raw data / observations")
                                                                                                                                    }, o("summary", i)),
                                                                                                                                    (s = {
                                                                                                                                        class: "mib-pre",
                                                                                                                                        children: rs(e.observations)
                                                                                                                                    }, o("pre", s))
                                                                                                                                ]
                                                                                                                            }, o("details", d)) : null
                                                                                                                        ]
                                                                                                                    }, o("td", c)),
                                                                                                                    (p = {
                                                                                                                        class: "mib-attr-ref",
                                                                                                                        children: rl(e.definition)
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
                                                                                                var t, r, n, a, i, s, d, c, p, u, f, b, g, h, m, v;
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
                                                                                                                                }, o("th", r)),
                                                                                                                                (n = {
                                                                                                                                    children: _("Inner filter (priority / VID / TPID-DEI)")
                                                                                                                                }, o("th", n)),
                                                                                                                                (a = {
                                                                                                                                    children: _("EtherType code")
                                                                                                                                }, o("th", a)),
                                                                                                                                (i = {
                                                                                                                                    children: _("Remove tags")
                                                                                                                                }, o("th", i)),
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
                                                                                                                            var t, r, n, a, i, s, d, c;
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
                                                                                                                                    (a = {
                                                                                                                                        children: l(e.tags_to_remove)
                                                                                                                                    }, o("td", a)),
                                                                                                                                    (i = {
                                                                                                                                        children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                                                    }, o("td", i)),
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
                                                                                                            }, o("table", b))
                                                                                                        }, o("div", g)) : null,
                                                                                                        (h = {
                                                                                                            style: "margin-top:6px",
                                                                                                            children: [
                                                                                                                _("G.988 encoded field values"),
                                                                                                                ": ",
                                                                                                                rl(e.attribute)
                                                                                                            ]
                                                                                                        }, o("p", h)),
                                                                                                        (m = {
                                                                                                            class: "mib-pre",
                                                                                                            children: rs(e.vlan_rules.length ? e.vlan_rules : e.rows)
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
                                                                                                        children: rs({
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
                                                                    function g() {
                                                                        var t;
                                                                        let r = p.value.trim().toLowerCase();
                                                                        f.clear();
                                                                        let n = e.classes.filter((e)=>`${e.class_id} ${e.name ?? ""}`.toLowerCase().includes(r));
                                                                        n.length ? u.replaceChildren(...n.map((e)=>{
                                                                            var t, r, n, a;
                                                                            let i = (a = {
                                                                                type: "button",
                                                                                class: `mib-class-btn${e.class_id === d ? " active" : ""}`,
                                                                                onclick: ()=>b(e.class_id),
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
                                                                            }, o("button", a));
                                                                            return f.set(e.class_id, i), i;
                                                                        })) : u.replaceChildren((t = {
                                                                            class: "mib-empty-list",
                                                                            children: _("No matching ME classes")
                                                                        }, o("div", t)));
                                                                    }
                                                                    return p.addEventListener("input", g), g(), e.classes.length && b(e.classes[0].class_id), s = {
                                                                        class: "mib-browser",
                                                                        children: [
                                                                            (i = {
                                                                                class: "mib-sidebar",
                                                                                children: [
                                                                                    (a = {
                                                                                        class: "mib-search-box",
                                                                                        children: p
                                                                                    }, o("div", a)),
                                                                                    u
                                                                                ]
                                                                            }, o("div", i)),
                                                                            c
                                                                        ]
                                                                    }, o("div", s);
                                                                }(w), (m = {
                                                                    class: "mib-upload-diagnostics",
                                                                    children: [
                                                                        (g = {
                                                                            children: _("Upload diagnostics")
                                                                        }, o("summary", g)),
                                                                        (h = {
                                                                            class: "mib-pre",
                                                                            children: rs(w.diagnostics)
                                                                        }, o("pre", h))
                                                                    ]
                                                                }, o("details", m))), n = w, S.textContent = rs({
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
                                                                }), C.disabled = !1;
                                                                return;
                                                            }
                                                            if (e.progress) {
                                                                let { phase: t, received: r, expected: n } = e.progress;
                                                                if (z.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == n ? "" : `: ${r}/${n}`}` : null == n ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${n}`, n && n > 0) {
                                                                    let e = Math.min(100, Math.round(r / n * 100));
                                                                    j.title = `${e}%`, j.firstElementChild.style.width = `${e}%`;
                                                                }
                                                            }
                                                            if (Date.now() >= O) throw Error(_("MIB query timed out; retry."));
                                                            await new Promise((e)=>setTimeout(e, 1000));
                                                        }
                                                    } catch (e) {
                                                        q() && (j.style.display = "none", z.replaceChildren(o("span", {
                                                            class: "mib-error-text",
                                                            children: [
                                                                String(e),
                                                                w ? ` \xb7 ${_("Previous snapshot retained")}` : ""
                                                            ]
                                                        })));
                                                    } finally{
                                                        await V(), y = !1, T.disabled = R.disabled = !1;
                                                    }
                                                }
                                            }
                                            async function V() {
                                                if (!x) return;
                                                let e = x;
                                                x = null;
                                                try {
                                                    await t4(e);
                                                } catch (e) {
                                                    console.warn("Failed to release MIB snapshot", e);
                                                }
                                            }
                                            A(m), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, U, "modal-wide");
                                        })(e, "mib"),
                                    children: [
                                        _("View OMCI / MIB details"),
                                        " \u2192"
                                    ]
                                }, o("button", a))
                            }, o("div", i))
                        ]
                    }, o("div", p)),
                    (O = {
                        class: "fttr-grid-2",
                        children: [
                            (v = {
                                class: "fttr-card",
                                children: [
                                    o("h4", {
                                        style: "margin-top:0;margin-bottom:6px;font-size:92%;color:#888",
                                        children: _("Optical physical layer and link parameters")
                                    }),
                                    (u = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Optical RX power")
                                            }),
                                            o("strong", {
                                                children: d(e.optical_rx_power_dbm)
                                            })
                                        ]
                                    }, o("div", u)),
                                    (f = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Optical TX power")
                                            }),
                                            o("strong", {
                                                children: d(e.optical_tx_power_dbm)
                                            })
                                        ]
                                    }, o("div", f)),
                                    (g = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Equalization delay (EQD)")
                                            }),
                                            o("span", {
                                                children: null === (b = e.equalization_delay_bits) ? "\u2014" : `${b} bits`
                                            })
                                        ]
                                    }, o("div", g)),
                                    (h = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Data interface")
                                            }),
                                            o("code", {
                                                children: l(e.data_path?.interface)
                                            })
                                        ]
                                    }, o("div", h)),
                                    (m = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Identity age")
                                            }),
                                            o("span", {
                                                children: c(e.identity_age_seconds) ?? "\u2014"
                                            })
                                        ]
                                    }, o("div", m))
                                ]
                            }, o("div", v)),
                            (S = {
                                class: "fttr-card",
                                children: [
                                    o("h4", {
                                        style: "margin-top:0;margin-bottom:6px;font-size:92%;color:#888",
                                        children: _("Hardware specifications and firmware images")
                                    }),
                                    (y = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Equipment ID")
                                            }),
                                            o("span", {
                                                children: l(C?.equipment_id ?? e.model)
                                            })
                                        ]
                                    }, o("div", y)),
                                    (w = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Hardware version")
                                            }),
                                            o("code", {
                                                children: l(C?.hardware_version ?? e.hardware_version)
                                            })
                                        ]
                                    }, o("div", w)),
                                    (k = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Firmware version")
                                            }),
                                            (x = {
                                                title: T.full || T.display,
                                                children: o("strong", {
                                                    children: T.display
                                                })
                                            }, o("span", x))
                                        ]
                                    }, o("div", k)),
                                    (z = {
                                        class: "fttr-kv-row",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("OMCC version")
                                            }),
                                            o("span", {
                                                children: C?.omcc_version != null ? `0x${C.omcc_version.toString(16).padStart(2, "0")} (${C.omcc_version})` : "\u2014"
                                            })
                                        ]
                                    }, o("div", z)),
                                    C?.errors.length ? (j = {
                                        class: "fttr-kv-row",
                                        style: "color:#e74c3c",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Identity read errors")
                                            }),
                                            o("span", {
                                                children: C.errors.join("; ")
                                            })
                                        ]
                                    }, o("div", j)) : null,
                                    P.length > 1 ? ($ = {
                                        class: "fttr-kv-row",
                                        style: "font-size:80%;color:#888",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Software images")
                                            }),
                                            o("span", {
                                                children: P.join(" \xb7 ")
                                            })
                                        ]
                                    }, o("div", $)) : null
                                ]
                            }, o("div", S))
                        ]
                    }, o("div", O))
                ]
            }, o("div", M);
        })
    }, o("div", t)) : (r = {
        class: "cbi-section fttr-panel-subgateways",
        children: o("p", {
            style: "text-align:center;color:#888;padding:2em 0",
            children: _("No sub-gateways are currently registered.")
        })
    }, o("div", r));
}
let main = rd.extend({
    load: ()=>tq(),
    render: (e)=>{
        var t, r;
        let n, a, i, s, l, d, c, p, u, f;
        return n = "controller", r_ = !1, a = [
            {
                id: "controller",
                label: _("Controller & optical transceiver")
            },
            {
                id: "subgateways",
                label: _("Sub-gateways & optical links")
            }
        ], i = new Map(), s = rg(e), l = rh(e.sub_gateways ?? []), t = {
            class: "cbi-tabmenu",
            style: "margin-top:14px;margin-bottom:0",
            children: a.map((e)=>{
                var t;
                let r = (t = {
                    class: n === e.id ? "cbi-tab" : "cbi-tab-disabled",
                    "data-tab": e.id,
                    children: o("a", {
                        href: `#tab-${e.id}`,
                        onclick: (t)=>{
                            t.preventDefault();
                            var r = e.id;
                            for (let [e, t] of (n = r, i))t.className = e === r ? "cbi-tab" : "cbi-tab-disabled";
                            s.hidden = "controller" !== r, l.hidden = "subgateways" !== r, window.dispatchEvent(new Event("resize"));
                        },
                        children: e.label
                    })
                }, o("li", t));
                return i.set(e.id, r), r;
            })
        }, d = o("ul", t), s.hidden = !1, l.hidden = !0, rc = e.optical_transceiver.tx_enabled, rp = null, c = rf, tB().then((e)=>{
            r_ || c !== rf || (rp = e, rb(rc = e.tx_enabled));
        }).catch(()=>{
            r_ || c !== rf || rb(rc = null);
        }), ru = s, rb(rc), p = o("div", {
            id: "fttr-panels-container",
            children: [
                s,
                l
            ]
        }), r = {
            class: "cbi-map fttr-hardware",
            children: [
                o("style", {
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
                o("h2", {
                    children: _("FTTR hardware status")
                }),
                d,
                p,
                o("p", {
                    class: "cbi-footer",
                    style: "margin-top:1.5em;font-size:85%;color:#888",
                    children: _("Identity information is read-only and limited to fields provided by fttrctl status.")
                })
            ]
        }, u = o("div", r), f = !1, L.Poll.add(async ()=>{
            if (!u.isConnected || f) return;
            f = !0;
            let e = rf;
            try {
                if (r_) return;
                let [t, r] = await Promise.all([
                    tq(),
                    tB()
                ]);
                if (r_ || e !== rf) return;
                let a = rg(t), i = rh(t.sub_gateways ?? []);
                a.hidden = "controller" !== n, i.hidden = "subgateways" !== n, s.replaceWith(a), l.replaceWith(i), s = a, l = i, ru = a, rp = r, rc = r.tx_enabled, rb(rc);
            } catch  {
                if (r_ || e !== rf) return;
                rp = null, rb(rc = null);
            } finally{
                f = !1;
            }
        }, 10), u;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;