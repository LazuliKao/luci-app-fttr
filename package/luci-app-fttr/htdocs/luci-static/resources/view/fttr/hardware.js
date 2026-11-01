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
function c(e, t, r) {
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
class p extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const u = {};
function f(e) {
    return e && Object.assign(u, e), u;
}
function b(e, t) {
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
    let t = +!!e.startsWith("^"), r = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, r);
}
const m = Symbol("evaluating");
function v(e, t, r) {
    let n;
    Object.defineProperty(e, t, {
        get () {
            if (n !== m) return void 0 === n && (n = m, n = r()), n;
        },
        set (r) {
            Object.defineProperty(e, t, {
                value: r
            });
        },
        configurable: !0
    });
}
function y(e, t, r) {
    Object.defineProperty(e, t, {
        value: r,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
}
function w(...e) {
    let t = {};
    for (let r of e)Object.assign(t, Object.getOwnPropertyDescriptors(r));
    return Object.defineProperties({}, t);
}
const x = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function k(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function z(e) {
    if (!1 === k(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let r = t.prototype;
    return !1 !== k(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
}
const $ = new Set([
    "string",
    "number",
    "symbol"
]);
function j(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function O(e, t, r) {
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
function M(e, t = 0) {
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
function I(e, t, r) {
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = T(e.inst?._zod.def?.error?.(e)) ?? T(t?.error?.(e)) ?? T(r.customError?.(e)) ?? T(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
}
const C = (e, t)=>{
    e.name = "$ZodError", Object.defineProperty(e, "_zod", {
        value: e._zod,
        enumerable: !1
    }), Object.defineProperty(e, "issues", {
        value: t,
        enumerable: !1
    }), e.message = JSON.stringify(t, b, 2), Object.defineProperty(e, "toString", {
        value: ()=>e.message,
        enumerable: !1
    });
}, N = c("$ZodError", C), D = c("$ZodError", C, {
    Parent: Error
}), R = (t = D, (e, r, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: r,
        issues: []
    }, a);
    if (s instanceof Promise) throw new p();
    if (s.issues.length) {
        let e = new (i?.Err ?? t)(s.issues.map((e)=>I(e, a, f())));
        throw x(e, i?.callee), e;
    }
    return s.value;
}), A = (r = D, async (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (i?.Err ?? r)(s.issues.map((e)=>I(e, a, f())));
        throw x(e, i?.callee), e;
    }
    return s.value;
}), Z = (n = D, (e, t, r)=>{
    let i = r ? {
        ...r,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (a instanceof Promise) throw new p();
    return a.issues.length ? {
        success: !1,
        error: new (n ?? N)(a.issues.map((e)=>I(e, i, f())))
    } : {
        success: !0,
        data: a.value
    };
}), U = (i = D, async (e, t, r)=>{
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
        error: new i(a.issues.map((e)=>I(e, n, f())))
    } : {
        success: !0,
        data: a.value
    };
}), B = /^-?\d+(?:\.\d+)?$/, q = /^(?:true|false)$/i, V = /^null$/i, W = {
    major: 4,
    minor: 3,
    patch: 6
}, F = c("$ZodType", (e, t)=>{
    var r;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = W;
    let n = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && n.unshift(e), n))for (let r of t._zod.onattach)r(e);
    if (0 === n.length) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, r)=>{
            let n, i = M(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, s = a._zod.check(e);
                if (s instanceof Promise && r?.async === !1) throw new p();
                if (n || s instanceof Promise) n = (n ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (i || (i = M(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = M(e, t));
                }
            }
            return n ? n.then(()=>e) : e;
        }, r = (r, i, a)=>{
            if (M(r)) return r.aborted = !0, r;
            let s = t(i, n, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new p();
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
                if (!1 === a.async) throw new p();
                return s.then((e)=>t(e, n, a));
            }
            return t(s, n, a);
        };
    }
    v(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = Z(e, t);
                    return r.success ? {
                        value: r.data
                    } : {
                        issues: r.error?.issues
                    };
                } catch (r) {
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
}), J = c("$ZodString", (e, t)=>{
    var r;
    let n;
    F.init(e, t), e._zod.pattern = [
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
}), X = c("$ZodNumber", (e, t)=>{
    F.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? B, e._zod.parse = (r, n)=>{
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
}), H = c("$ZodBoolean", (e, t)=>{
    F.init(e, t), e._zod.pattern = q, e._zod.parse = (r, n)=>{
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
}), G = c("$ZodNull", (e, t)=>{
    F.init(e, t), e._zod.pattern = V, e._zod.values = new Set([
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
}), K = c("$ZodNever", (e, t)=>{
    F.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function Q(e, t, r) {
    e.issues.length && t.issues.push(...P(r, e.issues)), t.value[r] = e.value;
}
const Y = c("$ZodArray", (e, t)=>{
    F.init(e, t), e._zod.parse = (r, n)=>{
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
            o instanceof Promise ? a.push(o.then((t)=>Q(t, r, e))) : Q(o, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function ee(e, t, r, n, i) {
    if (e.issues.length) {
        if (i && !(r in n)) return;
        t.issues.push(...P(r, e.issues));
    }
    void 0 === e.value ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
const et = c("$ZodObject", (e, t)=>{
    let r;
    F.init(e, t);
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
    let i = g(()=>(function(e) {
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
    v(e._zod, "propValues", ()=>{
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
        if (!k(s)) return t.issues.push({
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
            a instanceof Promise ? o.push(a.then((r)=>ee(r, t, e, s, i))) : ee(a, t, e, s, i);
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
                a instanceof Promise ? e.push(a.then((e)=>ee(e, r, i, t, c))) : ee(a, r, i, t, c);
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
function er(e, t, r, n) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let i = e.filter((e)=>!M(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>I(e, n, f())))
    }), t);
}
const en = c("$ZodUnion", (e, t)=>{
    F.init(e, t), v(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), v(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), v(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), v(e._zod, "pattern", ()=>{
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
        return s ? Promise.all(o).then((t)=>er(t, i, e, a)) : er(o, i, e, a);
    };
}), ei = c("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, en.init(e, t);
    let r = e._zod.parse;
    v(e._zod, "propValues", ()=>{
        let e = {};
        for (let r of t.options){
            let n = r._zod.propValues;
            if (!n || 0 === Object.keys(n).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
            for (let [t, r] of Object.entries(n))for (let n of (e[t] || (e[t] = new Set()), r))e[t].add(n);
        }
        return e;
    });
    let n = g(()=>{
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
        if (!k(s)) return i.issues.push({
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
}), ea = c("$ZodRecord", (e, t)=>{
    F.init(e, t), e._zod.parse = (r, n)=>{
        let i = r.value;
        if (!z(i)) return r.issues.push({
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
                    t.issues.length && r.issues.push(...P(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...P(e, s.issues)), r.value[e] = s.value);
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
                    issues: o.issues.map((e)=>I(e, n, f())),
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
                e.issues.length && r.issues.push(...P(s, e.issues)), r.value[o.value] = e.value;
            })) : (l.issues.length && r.issues.push(...P(s, l.issues)), r.value[o.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), es = c("$ZodEnum", (e, t)=>{
    var r;
    let n;
    F.init(e, t);
    let i = (n = Object.values(r = t.entries).filter((e)=>"number" == typeof e), Object.entries(r).filter(([e, t])=>-1 === n.indexOf(+e)).map(([e, t])=>t)), a = new Set(i);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${i.filter((e)=>$.has(typeof e)).map((e)=>"string" == typeof e ? j(e) : e.toString()).join("|")})$`), e._zod.parse = (t, r)=>{
        let n = t.value;
        return a.has(n) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: n,
            inst: e
        }), t;
    };
}), eo = c("$ZodLiteral", (e, t)=>{
    if (F.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? j(e) : e ? j(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (n, i)=>{
        let a = n.value;
        return r.has(a) || n.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
            inst: e
        }), n;
    };
});
function el(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const ed = c("$ZodOptional", (e, t)=>{
    F.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", v(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), v(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${h(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let n = t.innerType._zod.run(e, r);
            return n instanceof Promise ? n.then((t)=>el(t, e.value)) : el(n, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, r);
    };
}), ec = c("$ZodNullable", (e, t)=>{
    F.init(e, t), v(e._zod, "optin", ()=>t.innerType._zod.optin), v(e._zod, "optout", ()=>t.innerType._zod.optout), v(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${h(e.source)}|null)$`) : void 0;
    }), v(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), ep = c("$ZodCatch", (e, t)=>{
    F.init(e, t), v(e._zod, "optin", ()=>t.innerType._zod.optin), v(e._zod, "optout", ()=>t.innerType._zod.optout), v(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let n = t.innerType._zod.run(e, r);
        return n instanceof Promise ? n.then((n)=>(e.value = n.value, n.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: n.issues.map((e)=>I(e, r, f()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = n.value, n.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: n.issues.map((e)=>I(e, r, f()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), eu = c("$ZodLazy", (e, t)=>{
    F.init(e, t), v(e._zod, "innerType", ()=>t.getter()), v(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), v(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), v(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), v(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
const ef = c("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    F.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>R(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>Z(e, t, r), e.parseAsync = async (t, r)=>A(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>U(e, t, r), e.check = (...r)=>e.clone({
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
}), e_ = c("ZodMiniString", (e, t)=>{
    J.init(e, t), ef.init(e, t);
});
function eb(e) {
    return new e_({
        type: "string",
        ...S(e)
    });
}
const eg = c("ZodMiniNumber", (e, t)=>{
    X.init(e, t), ef.init(e, t);
});
function eh(e) {
    return new eg({
        type: "number",
        checks: [],
        ...S(e)
    });
}
const em = c("ZodMiniBoolean", (e, t)=>{
    H.init(e, t), ef.init(e, t);
});
function ev(e) {
    return new em({
        type: "boolean",
        ...S(e)
    });
}
const ey = c("ZodMiniNull", (e, t)=>{
    G.init(e, t), ef.init(e, t);
}), ew = c("ZodMiniNever", (e, t)=>{
    K.init(e, t), ef.init(e, t);
});
function ex(e) {
    return new ew({
        type: "never",
        ...S(e)
    });
}
const ek = c("ZodMiniArray", (e, t)=>{
    Y.init(e, t), ef.init(e, t);
});
function ez(e, t) {
    return new ek({
        type: "array",
        element: e,
        ...S(t)
    });
}
const e$ = c("ZodMiniObject", (e, t)=>{
    et.init(e, t), ef.init(e, t), v(e, "shape", ()=>t.shape);
});
function ej(e, t) {
    return new e$({
        type: "object",
        shape: e ?? {},
        ...S(t)
    });
}
const eO = c("ZodMiniUnion", (e, t)=>{
    en.init(e, t), ef.init(e, t);
});
function eS(e, t) {
    return new eO({
        type: "union",
        options: e,
        ...S(t)
    });
}
const eM = c("ZodMiniDiscriminatedUnion", (e, t)=>{
    ei.init(e, t), ef.init(e, t);
});
function eE(e, t, r) {
    return new eM({
        type: "union",
        options: t,
        discriminator: e,
        ...S(r)
    });
}
const eP = c("ZodMiniRecord", (e, t)=>{
    ea.init(e, t), ef.init(e, t);
});
function eT(e, t, r) {
    return new eP({
        type: "record",
        keyType: e,
        valueType: t,
        ...S(r)
    });
}
const eI = c("ZodMiniEnum", (e, t)=>{
    es.init(e, t), ef.init(e, t), e.options = Object.values(t.entries);
});
function eC(e, t) {
    return new eI({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...S(t)
    });
}
const eN = c("ZodMiniLiteral", (e, t)=>{
    eo.init(e, t), ef.init(e, t);
});
function eD(e, t) {
    return new eN({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...S(t)
    });
}
const eL = c("ZodMiniOptional", (e, t)=>{
    ed.init(e, t), ef.init(e, t);
});
function eR(e) {
    return new eL({
        type: "optional",
        innerType: e
    });
}
const eA = c("ZodMiniNullable", (e, t)=>{
    ec.init(e, t), ef.init(e, t);
});
function eZ(e) {
    return new eA({
        type: "nullable",
        innerType: e
    });
}
const eU = c("ZodMiniCatch", (e, t)=>{
    ep.init(e, t), ef.init(e, t);
}), eB = c("ZodMiniLazy", (e, t)=>{
    eu.init(e, t), ef.init(e, t);
});
function eq() {
    let e = new eB({
        type: "lazy",
        getter: ()=>eS([
                eb(),
                eh(),
                ev(),
                new ey({
                    type: "null",
                    ...S(void 0)
                }),
                ez(e),
                eT(eb(), e)
            ])
    });
    return e;
}
let eV = ej({
    error: eS([
        eb(),
        ej({
            code: eb(),
            message: eb()
        })
    ])
});
class eW extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eF(e) {
    let t = eV.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eW("rpc", e) : new eW(e.code, e.message);
    }
    return e;
}
const eJ = ej({
    status: eD("pending"),
    job: eb()
});
eE("status", [
    ej({
        status: eD("pending")
    }),
    ej({
        status: eD("ready"),
        chunk: eh(),
        chunks: eh(),
        bytes: eh(),
        data: eb()
    })
]);
let eX = eb(), eH = eh(), eG = ev(), eK = eR(eX), eQ = eR(eH), eY = eR(eG);
const e0 = eC([
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
]), e1 = eC([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), e2 = ej({
    id: eX,
    name: eR(eZ(eX)),
    kind: eC([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eX,
    state: eX,
    reason: eK,
    revision: eK,
    current_revision: eY,
    management_fresh: eY,
    operation_id: eQ,
    task_id: eR(eZ(eH)),
    updated_at: eQ,
    changes: eR(ez(ej({
        name: eX,
        desired: eX
    })))
});
let e5 = ej({
    state: eX,
    reason: eK,
    task_id: eR(eZ(eH)),
    instance: eQ
});
const e4 = ej({
    cwmp_id: eX,
    state: eC([
        "online",
        "waiting_inform",
        "offline_or_stale"
    ]),
    optical_online: eG,
    last_inform: eZ(eH),
    age_seconds: eZ(eH)
});
let e8 = ej({
    state: eC([
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
    method: eK,
    reason: eK,
    mqtt_target: eZ(eX),
    binding_source: eK,
    link_identity_error: eZ(eX),
    mqtt_last_seen: eZ(eH),
    cwmp_id: eK,
    desired_version: eK,
    generation: eQ,
    inflight: eY,
    attempts: eQ,
    next_retry_at: eQ,
    updated_at: eQ,
    settings_verified_at: eZ(eH),
    last_inform: eZ(eH),
    last_error: eR(eZ(eX)),
    persistence_error: eR(eZ(eX)),
    desired: eR(eZ(ej({
        vlan: eH,
        vlans: ez(eH),
        priority: eH,
        acs_url: eX
    }))),
    listener: eR(ej({
        enabled: eG,
        listen: eX,
        path: eX,
        error: eZ(eX)
    })),
    endpoint_notice: eK,
    manual_steps: eR(ez(eX))
});
const e3 = eE("state", [
    e8,
    function(e, t) {
        if (!z(t)) throw Error("Invalid input to extend: expected a plain object");
        let r = e._zod.def.checks;
        if (r && r.length > 0) {
            let r = e._zod.def.shape;
            for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(r, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let n = w(e._zod.def, {
            get shape () {
                let r = {
                    ...e._zod.def.shape,
                    ...t
                };
                return y(this, "shape", r), r;
            }
        });
        return O(e, n);
    }(function(e) {
        var t = void 0;
        let r = e._zod.def.checks;
        if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let n = w(e._zod.def, {
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
                return y(this, "shape", n), n;
            },
            checks: []
        });
        return O(e, n);
    }(e8), {
        state: eC([
            "pending",
            "unavailable"
        ]),
        reason: eX
    })
]), e6 = ej({
    state: e0,
    operation_id: eQ,
    device: eK,
    optical_sn: eK,
    cwmp_id: eK,
    revision: eK,
    mode: eR(eC([
        "apply",
        "plan"
    ])),
    started_at: eQ,
    current_revision: eY,
    management_fresh: eY,
    reason: eK,
    error: eK,
    attempts: eQ,
    next_retry_at: eQ,
    reconcile_reason: eK,
    items: ez(e2),
    cwmp_contract: eR(ej({
        state: eX,
        requested: eX,
        contract: eZ(eX),
        reason: eX,
        cache_hit: eG,
        schema: eX,
        capabilities: eZ(ej({
            wan: eX,
            wlan: eX,
            binding: eX
        }))
    })),
    wan_objects: eR(eT(eX, eq())),
    wan_lifecycle: eR(eT(eX, e5)),
    wan_stage: eR(eC([
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
    wifi_objects: eR(ej({
        owned: ez(eH),
        pending: eZ(eX),
        pending_instance: eZ(eH)
    })),
    wifi_lifecycle: eR(eT(eX, e5)),
    wifi_stage: eR(eC([
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
    wifi_cleanup: eR(eC([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e7 = ej({
    enabled: eG,
    mode: eC([
        "auto",
        "manual"
    ]),
    vlan: ez(eH),
    priority: eH,
    address: eX,
    acs_url: eX,
    port: eH,
    path: eX,
    dhcp_enabled: eG
}), e9 = ej({
    state: eC([
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
    error: eZ(eX),
    inflight: eG,
    ready: eG,
    desired_version: eZ(eX),
    applied_version: eZ(eX),
    next_retry_at: eH,
    attempts: eH,
    desired: eZ(e7),
    applied: eZ(e7),
    previous: eZ(e7),
    plan: ez(ej({
        operation: eX,
        key: eX,
        value: ez(eX)
    }))
});
const te = ej({
    device: eX,
    name: eZ(eX),
    group: eZ(eX),
    group_name: eZ(eX),
    template: eZ(eX),
    template_name: eZ(eX),
    optical_sn: eX,
    adapter: eX,
    omci_management: ej({
        state: eX,
        reason: eR(eZ(eX))
    }),
    management: eZ(e4),
    acs_bootstrap: e3,
    provisioning: e6,
    services: ez(e2),
    ssids: ez(e2),
    wifi_sync: e1
}), tt = ej({
    enabled: eG,
    mode: eC([
        "auto",
        "manual"
    ]),
    method: eD("diff"),
    revision: eX,
    triggers: ez(eX),
    interval_minutes: new eg({
        type: "number",
        coerce: !0,
        checks: [],
        ...S(void 0)
    }),
    error: eZ(eX),
    devices: ez(te),
    management_network: e9,
    omci_management: eq(),
    groups: ez(ej({
        id: eX,
        name: eZ(eX),
        template: eX
    })),
    pending_devices: ez(eX)
});
eS([
    ej({
        valid: eD(!0),
        revision: eX,
        devices: eH,
        error: eR(ex())
    }),
    ej({
        error: eX,
        valid: eR(ex()),
        revision: eR(ex()),
        devices: eR(ex())
    })
]);
let tr = eb(), tn = eh(), ti = eZ(tn), ta = eT(tr, ej({
    source: tr,
    unit: tr,
    reason: eZ(tr),
    raw: eZ(tr),
    age_seconds: ti
}));
const ts = ej({
    phase: eC([
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
    error: eZ(tr)
}), to = eC([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tl = ej({
    model: tr,
    wavelength_tx_nm: tn,
    wavelength_rx_nm: tn,
    phy_rate_downlink_gbps: tn,
    phy_rate_uplink_gbps: tn,
    tx_power_dbm: ti,
    laser_bias_current_ma: ti,
    temperature_celsius: ti,
    vcc_voltage: ti,
    cdr_locked: eZ(ev()),
    tx_enabled: eZ(ev()),
    measurements: ta
}), td = ej({
    equipment_id: eZ(tr),
    hardware_version: eZ(tr),
    software_images: ez(tr),
    omcc_version: ti,
    errors: ez(tr)
});
const tc = ej({
    onu_id: tn,
    vendor: tr,
    model: tr,
    serial_number: tr,
    state: to,
    business_status: ts,
    management: eZ(e4),
    provisioning: eZ(e6),
    services: ez(e2),
    ssids: ez(e2),
    wifi_sync: e1,
    acs_bootstrap: eR(e3),
    identity: eZ(td),
    identity_age_seconds: ti,
    identity_current: ev(),
    fiber_distance_m: ti,
    ranging_delay_rtd_ns: ti,
    equalization_delay_bits: new eU({
        type: "catch",
        innerType: ti,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: ti,
    optical_tx_power_dbm: ti,
    firmware_version: tr,
    hardware_version: tr,
    uptime_seconds: ti,
    data_path: ej({
        interface: tr,
        gem_ports: eZ(ez(tn)),
        vlan_id: ti,
        tx_bytes: ti,
        rx_bytes: ti,
        current_tx_kbps: ti,
        current_rx_kbps: ti,
        measurements: ta
    }),
    wifi_mesh: ej({
        channel_2g: ti,
        channel_5g: ti,
        bandwidth_5g: eZ(tr),
        tx_power_pct: ti,
        measurements: ta
    }),
    connected_clients: eZ(ez(ej({
        mac: tr,
        ip: tr,
        band: tr,
        rssi_dbm: ti,
        rx_rate_mbps: ti,
        tx_rate_mbps: ti
    }))),
    measurements: ta
});
let tp = ej({
    reserved_sn: eR(tr),
    port: tn,
    interface: tr,
    carrier: ev(),
    status: tr,
    onu_id: eR(tn),
    onu_sn: eR(tr),
    link_state: tr
});
const tu = ej({
    onu_pinning: eR(ej({
        desired: eT(tr, tn),
        active: eT(tr, tn),
        pending_restart: ev(),
        allocation_blocked: ev(),
        startup_error: eZ(tr),
        config_error: eZ(tr)
    })),
    fpga_status: tr,
    provisioning: eZ(tt),
    optical_transceiver: tl,
    switch_ports: ez(tp),
    sub_gateways: ez(tc),
    telemetry_gateways: ez(ej({
        id: tr,
        last_seen_sec_ago: tn,
        last_payload_bytes: tn
    }))
});
eT(tr, ej({
    carrier: eR(ev()),
    mac: eR(tr),
    link: eR(ej({
        speed: eR(tn),
        duplex: eR(tr),
        autoneg: eR(ev())
    })),
    stats: eR(eT(tr, tn))
}));
const tf = {
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
let t_ = L.rpc.declare({
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
const tb = async ()=>tu.parse(eF(await t_())), tg = ej({
    schema_version: eD(1),
    status: eC([
        "success",
        "error"
    ]),
    action: eC([
        "optical_on",
        "optical_off",
        "optical_status",
        "optical_reload",
        "optical_reinitialize",
        "optical_shutdown"
    ]),
    desired_enabled: eZ(ev()),
    tx_enabled: eZ(ev()),
    actor_state: eC([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: ev(),
    discovery_active: ev(),
    cleanup_pending: ev(),
    error: eZ(ej({
        code: eb(),
        message: eb()
    }))
});
let th = L.rpc.declare({
    object: "luci.fttr",
    method: "optical_status",
    reject: !0
}), tm = L.rpc.declare({
    object: "luci.fttr",
    method: "optical_set",
    params: [
        "enabled"
    ],
    reject: !0
});
const tv = async ()=>tg.parse(await th()), ty = async (e)=>tg.parse(await tm(e));
eS([
    ej({
        operation_ids: ez(eh()),
        revision: eb()
    }),
    ej({
        started: eD(!0),
        mode: eC([
            "apply",
            "plan"
        ])
    }),
    ej({
        reset: eD(!0),
        device: eb()
    }),
    ej({
        operation_ids: ez(eh()),
        mode: eC([
            "apply",
            "plan"
        ]),
        reconcile: eR(ev()),
        retry: eR(ev())
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
}), ej({
    source: eC([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: eb(),
    size: eh(),
    sha256: eb(),
    data: eR(eb()),
    factory: ej({
        detected: ev(),
        device: eb(),
        has_data: ev(),
        sha256: eb(),
        data: eb()
    }),
    firmware: ej({
        exists: ev(),
        path: eb(),
        size: eh(),
        sha256: eb(),
        data: eb()
    }),
    error: eR(eb())
}), ej({
    success: ev(),
    path: eb(),
    size: eh(),
    sha256: eb(),
    error: eR(eb())
}), ej({
    success: ev(),
    output: eR(eb()),
    error: eR(eb())
});
let tw = eb(), tx = eh(), tk = ev(), tz = ej({
    id: tw,
    url: tw
}), t$ = ej({
    name: tw,
    kind: eC([
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
    index: tx,
    mask: tx,
    size: tx,
    read: tk,
    write: tk,
    set_by_create: tk,
    avc: tk,
    optional: tk,
    deprecated: tk,
    default_hex: eZ(tw),
    reference: tz
}), tj = eE("type", [
    ej({
        type: eD("unsigned"),
        value: tx
    }),
    ej({
        type: eD("signed"),
        value: tx
    }),
    ej({
        type: eD("decimal"),
        value: tw
    }),
    ej({
        type: eD("text"),
        value: eZ(tw)
    }),
    ej({
        type: eD("octets"),
        hex: tw
    }),
    ej({
        type: eD("table_length"),
        bytes: tx
    })
]), tO = ej({
    code: tw,
    message: tw,
    offset: tx,
    mask: tx
}), tS = eC([
    "layout",
    "name_only",
    "unknown"
]), tM = ej({
    raw_hex: tw,
    filter_outer_priority: tx,
    filter_outer_vid: tx,
    filter_outer_tpid_dei: tx,
    filter_inner_priority: tx,
    filter_inner_vid: tx,
    filter_inner_tpid_dei: tx,
    filter_ethertype: tx,
    tags_to_remove: tx,
    treatment_outer_priority: tx,
    treatment_outer_vid: tx,
    treatment_outer_tpid_dei: tx,
    treatment_inner_priority: tx,
    treatment_inner_vid: tx,
    treatment_inner_tpid_dei: tx,
    delete_entry: tk
}), tE = ej({
    schema_version: eD(1),
    reference_version: tw,
    onu_id: eZ(tx),
    uploaded_complete: tk,
    expected_records: tx,
    received_records: tx,
    decoded_records: tx,
    partial_records: tx,
    basic_records: tx,
    tables_requested: tk,
    tables_collected: tk,
    classes: ez(ej({
        class_id: tx,
        name: eZ(tw),
        entities: tx,
        records: tx,
        support: tS
    })),
    entities: ez(ej({
        class_id: tx,
        entity_id: tx,
        name: eZ(tw),
        support: tS,
        reference: eZ(tz),
        sequences: ez(tx),
        attributes: ez(ej({
            definition: t$,
            value: eZ(tj),
            observations: ez(ej({
                raw_hex: tw,
                value: tj,
                sequences: ez(tx)
            }))
        })),
        diagnostics: ez(tO)
    })),
    records: ez(ej({
        class_id: tx,
        entity_id: tx,
        sequence: tx,
        attribute_mask: tx,
        raw_hex: tw,
        consumed: tx,
        remaining_hex: tw,
        undecoded_mask: tx
    })),
    tables: ez(ej({
        class_id: tx,
        entity_id: tx,
        attribute: t$,
        collected: tk,
        error: eZ(tw),
        raw_hex: tw,
        rows: ez(tw),
        vlan_rules: ez(tM)
    })),
    diagnostics: ez(tO)
});
const tP = ej({
    status: eD("ready"),
    report: tE
});
let tT = ej({
    phase: eC([
        "starting",
        "upload",
        "tables"
    ]),
    received: tx,
    expected: eZ(tx)
}), tI = eE("status", [
    ej({
        status: eD("pending"),
        progress: eR(tT)
    }),
    ej({
        status: eD("ready"),
        chunk: tx,
        chunks: tx,
        bytes: tx,
        data: tw
    })
]), tC = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_start",
    params: [
        "onu_id",
        "optical_sn",
        "tables"
    ],
    reject: !0
}), tN = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
}), tD = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_release",
    params: [
        "job"
    ],
    reject: !0
});
const tL = async (e, t, r)=>eJ.parse(eF(await tC(e, t, r))), tR = async (e, t)=>tI.parse(eF(await tN(e, t))), tA = async (e)=>ej({
        released: tk
    }).parse(eF(await tD(e)));
function tZ(e) {
    let t = "none" === e.tone ? "" : `fttr-badge fttr-badge-${e.tone}`, r = e.class ? ` ${e.class}` : "", n = s("span", {
        class: `${t}${r}`.trim(),
        children: e.children
    });
    return e.title && n.setAttribute("title", e.title), n;
}
const tU = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
};
function tB(e) {
    var t;
    let r = (t = e.state) ? "o5_operation" === t ? {
        tone: "success",
        label: tU.o5_operation,
        title: t
    } : {
        tone: "warning",
        label: tU[t] ?? o(t),
        title: t
    } : {
        tone: "none",
        label: "\u2014"
    };
    return s(tZ, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
function tq(e) {
    var t;
    let r = (t = e.status) ? {
        tone: "verified" === t.phase ? "success" : t.error || "wan_bootstrap_pending" === t.phase ? "warning" : "neutral",
        label: `${tf[t.phase]} \xb7 ${t.generation}${t.error ? ` \xb7 ${t.error}` : ""}`,
        title: t.error || void 0
    } : {
        tone: "neutral",
        label: "\u2014"
    };
    return s(tZ, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const tV = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
};
function tW(e) {
    var t;
    let r, n, i, a, l, c, p = (t = e.management, r = t?.state, n = d(t?.age_seconds ?? (t?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - t.last_inform) : null)), a = (i = t?.last_inform ? new Date(1000 * t.last_inform).toLocaleString() : null) ? _("Last Inform: %s").replace("%s", i) : void 0, l = "\u2014", c = "none", "online" === r ? (c = "success", l = tV.online) : "waiting_inform" === r ? (c = "warning", l = tV.waiting_inform) : "offline_or_stale" === r ? (c = "danger", l = tV.offline_or_stale) : r && (c = "neutral", l = o(r)), {
        tone: c,
        label: n && r ? `${l} \xb7 ${n}` : l,
        title: a
    });
    return s(tZ, {
        tone: p.tone,
        title: p.title,
        children: p.label
    });
}
const tF = {
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
function tJ(e) {
    var t, r;
    let n, i, a, l = (t = e.provisioning, r = e.title, n = t?.state, i = t?.next_retry_at && t.next_retry_at > Math.floor(Date.now() / 1000) ? t.next_retry_at - Math.floor(Date.now() / 1000) : 0, a = r ?? (t?.current_revision === !1 ? _("Previous configuration") : t?.management_fresh === !1 ? _("Management stale") : t?.reconcile_reason ? t.reconcile_reason : i > 0 ? _("Next self-healing retry in %d seconds").replace("%d", String(i)) : t?.reason ?? t?.error), n && "not_started" !== n ? "completed" === n || "verified" === n ? {
        tone: "success",
        label: "completed" === n ? tF.completed : _("Ready"),
        title: a
    } : "wan_reconciling" === n || "wan_verifying" === n || "wifi_reconciling" === n || "discovering" === n || "reading" === n || "disabling" === n || "disabling_read" === n || "writing" === n || "verifying" === n || "settling" === n || "recovering" === n || "waiting_task" === n ? {
        tone: "info",
        label: tF[n] ?? o(n),
        title: a
    } : "interrupted" === n || "failed" === n || "error" === n || "blocked" === n ? {
        tone: "danger",
        label: "blocked" === n ? tF.blocked : tF.interrupted,
        title: a
    } : "waiting" === n || "pending" === n || "waiting_management" === n || "reset_pending" === n ? {
        tone: "warning",
        label: tF[n] ?? tF.waiting,
        title: a
    } : {
        tone: "neutral",
        label: o(n),
        title: a
    } : {
        tone: "neutral",
        label: tF.not_started,
        title: a
    });
    return s(tZ, {
        tone: l.tone,
        title: l.title,
        children: l.label
    });
}
const tX = {
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
function tH(e) {
    var t;
    let r = (t = e.state) && "not_configured" !== t ? "verified" === t ? {
        tone: "success",
        label: tX.verified
    } : "attention_required" === t ? {
        tone: "danger",
        label: tX.attention_required
    } : "stale_revision" === t || "stale_management" === t || "waiting_management" === t ? {
        tone: "warning",
        label: tX[t]
    } : "recovering" === t ? {
        tone: "info",
        label: tX.recovering
    } : "accepted_unverified" === t || "pending" === t ? {
        tone: "warning",
        label: tX[t]
    } : {
        tone: "neutral",
        label: o(t)
    } : {
        tone: "neutral",
        label: tX.not_configured
    };
    return s(tZ, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const tG = `
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
let tK = (e)=>JSON.stringify(e, null, 2);
async function tQ(e) {
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
function tY(e) {
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
let t0 = L.view, t1 = null, t2 = null, t5 = null, t4 = !1, t8 = 0;
function t3(e) {
    let t = t5;
    if (!t) return;
    let r = t.querySelector('[data-fttr="laser-state"]'), n = t.querySelector('[data-fttr="laser-toggle"]');
    if (!(r instanceof HTMLElement) || !(n instanceof HTMLButtonElement)) return;
    !0 === e ? (r.textContent = _("TX enabled (reset readback)"), r.className = "fttr-badge fttr-badge-success") : !1 === e ? (r.textContent = _("Off (TX disabled)"), r.className = "fttr-badge fttr-badge-warning") : (r.textContent = _("Unknown"), r.className = "fttr-badge fttr-badge-neutral"), n.textContent = !1 === e ? _("Turn laser on") : _("Turn laser off"), n.disabled = t4, n.onclick = async ()=>{
        if (t4) return;
        let e = !1 === t1, t = e ? _("Re-enable the 1490nm downlink laser? Discovery resumes and sub-gateways can register again.") : _("Turn off the 1490nm downlink laser? All sub-gateways are gracefully disconnected and cannot register until the laser is re-enabled. This setting is saved and reapplied after a reboot.");
        if (window.confirm(t)) {
            t4 = !0, t8++, t3(t1);
            try {
                let t = await ty(e);
                if (t2 = t, t1 = t.tx_enabled, "error" === t.status) return void window.alert(`${_("Failed to change laser output")}: ${t.error?.message ?? _("unknown error")}`);
            } catch (e) {
                t1 = null, t2 = null, window.alert(`${_("Failed to change laser output")}: ${String(e)}`);
            } finally{
                t4 = !1, t3(t1);
            }
        }
    };
    let i = t.querySelector('[data-fttr="laser-detail"]');
    if (i instanceof HTMLElement) {
        let e = t2?.desired_enabled;
        i.textContent = [
            !0 === e ? _("Saved setting: on") : !1 === e ? _("Saved setting: off") : _("Saved setting: unknown"),
            t2 ? t2.discovery_active ? _("Discovery active") : _("Discovery paused") : _("Discovery state: unknown"),
            t2?.cleanup_pending ? _("ONU cleanup pending") : "",
            t2?.error?.message ?? ""
        ].filter(Boolean).join(" \xb7 ");
    }
}
function t6(e) {
    var t, r, n, i, a, d, c, p, u, f, b, g, h, m, v, y, w, x, k, z, $;
    let j = e.optical_transceiver, O = s("span", {
        class: `fttr-badge ${"ready" === e.fpga_status ? "fttr-badge-success" : "fttr-badge-neutral"}`,
        style: "font-size:95%",
        children: "ready" === e.fpga_status ? _("Ready") : o(e.fpga_status)
    }), S = null === (t = j.cdr_locked) ? s("span", {
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
                                        children: S
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
function t7(e) {
    var t, r;
    return e.length ? (t = {
        class: "fttr-panel-subgateways",
        children: e.map((e)=>{
            var t, r, n, i, a, c, p, u, f, b, g, h, m, v, y, w, x, k, z, $, j, O, S;
            let M = e.identity, P = M?.software_images ?? [], T = function(e) {
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
            }(e.firmware_version), I = e.identity ? e.identity_current ? _("Current registration") : _("Cached identity") : _("Not collected"), C = s("span", {
                class: `fttr-badge ${e.identity_current ? "fttr-badge-info" : "fttr-badge-neutral"}`,
                style: "font-size:80%",
                children: I
            });
            return S = {
                class: "cbi-section fttr-onu-card",
                children: [
                    (c = {
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
                                            C
                                        ]
                                    }, s("div", r))
                                ]
                            }, s("div", n)),
                            (a = {
                                children: (i = {
                                    type: "button",
                                    class: "fttr-btn-subtle",
                                    onclick: ()=>(function(e) {
                                            var t, r, n, i, a, d, c, p, u, f, b;
                                            let g = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "basic", h = !1, m = !1, v = null, y = null, w = (t = {
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
                                                                s(tB, {
                                                                    state: e.state
                                                                })
                                                            ],
                                                            [
                                                                _("Business"),
                                                                s(tq, {
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
                                                                s(tW, {
                                                                    management: e.management
                                                                })
                                                            ],
                                                            [
                                                                _("Last Inform"),
                                                                e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
                                                            ],
                                                            [
                                                                _("Provisioning"),
                                                                s(tJ, {
                                                                    provisioning: e.provisioning
                                                                })
                                                            ],
                                                            [
                                                                _("Wi-Fi sync"),
                                                                s(tH, {
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
                                            }, s("div", t)), x = (r = {
                                                class: "mib-status-bar",
                                                role: "status",
                                                children: s("span", {
                                                    class: "mib-hint-text",
                                                    children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                                                })
                                            }, s("div", r)), k = (n = {
                                                class: "cbi-progressbar",
                                                style: "display:none;width:100%",
                                                title: "0%",
                                                children: s("div", {
                                                    style: "width:0%"
                                                })
                                            }, s("div", n)), z = s("div", {}), $ = s("pre", {
                                                class: "onu-raw-pre"
                                            }), j = s("span", {
                                                class: "download-status",
                                                role: "status"
                                            }), O = null, S = s("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                disabled: !0,
                                                onclick: async ()=>{
                                                    if (v && !h) {
                                                        S.disabled = !0, j.textContent = _("Preparing JSON download\u2026");
                                                        try {
                                                            let t = await tQ(v);
                                                            if (h) return;
                                                            O && URL.revokeObjectURL(O), O = URL.createObjectURL(t);
                                                            let r = document.createElement("a");
                                                            r.href = O, r.download = `mib-${e.serial_number}.json`, r.click(), j.textContent = _("JSON download started"), window.setTimeout(()=>{
                                                                URL.revokeObjectURL(r.href), O === r.href && (O = null);
                                                            }, 1000);
                                                        } catch (e) {
                                                            j.textContent = String(e);
                                                        } finally{
                                                            S.disabled = !v || h;
                                                        }
                                                    }
                                                },
                                                children: _("Download JSON")
                                            }), M = (a = {
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
                                                                    S,
                                                                    j
                                                                ]
                                                            })
                                                        ]
                                                    }, s("div", i)),
                                                    $
                                                ]
                                            }, s("div", a)), P = s("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-apply",
                                                onclick: ()=>B(!1),
                                                children: _("Read MIB")
                                            }), T = s("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                onclick: ()=>B(!0),
                                                children: _("Read MIB and VLAN tables")
                                            }), I = (p = {
                                                class: "onu-mib-panel",
                                                children: [
                                                    (c = {
                                                        class: "mib-controls",
                                                        children: [
                                                            (d = {
                                                                class: "mib-action-group",
                                                                children: [
                                                                    P,
                                                                    T,
                                                                    s("small", {
                                                                        class: "mib-action-hint",
                                                                        children: _("Collecting VLAN tables queries extended filter tables and takes longer.")
                                                                    })
                                                                ]
                                                            }, s("div", d)),
                                                            x,
                                                            k
                                                        ]
                                                    }, s("div", c)),
                                                    z
                                                ]
                                            }, s("div", p)), C = {
                                                basic: w,
                                                mib: I,
                                                raw: M
                                            }, N = new Map();
                                            function D(e) {
                                                for (let [t, r] of Object.entries(C))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                                                for (let [t, r] of N)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
                                            }
                                            let R = (u = {
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
                                                        class: e.id === g ? "cbi-tab" : "cbi-tab-disabled",
                                                        "data-tab": e.id,
                                                        children: s("a", {
                                                            href: `#tab-${e.id}`,
                                                            onclick: (t)=>{
                                                                t.preventDefault(), D(e.id);
                                                            },
                                                            children: e.label
                                                        })
                                                    }, s("li", t));
                                                    return N.set(e.id, r), r;
                                                })
                                            }, s("ul", u)), A = s("div", {
                                                class: "onu-details-header",
                                                children: R
                                            }), Z = (b = {
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
				${tG}
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
                                                    A,
                                                    w,
                                                    I,
                                                    M,
                                                    (f = {
                                                        class: "right onu-details-footer",
                                                        children: s("button", {
                                                            type: "button",
                                                            class: "cbi-button",
                                                            onclick: ()=>{
                                                                h = !0, O && URL.revokeObjectURL(O), O = null, v = null, $.textContent = "", z.replaceChildren(), L.ui.hideModal();
                                                            },
                                                            children: _("Close")
                                                        })
                                                    }, s("div", f))
                                                ]
                                            }, s("div", b)), U = ()=>!h && Z.isConnected && Z.getClientRects().length > 0;
                                            async function B(t) {
                                                if (!m) {
                                                    m = !0, P.disabled = T.disabled = !0, k.style.display = "", k.title = "0%", k.firstElementChild.style.width = "0%", x.textContent = _("Reading MIB\u2026");
                                                    try {
                                                        let m = await tb(), j = m.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                                        if (j?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                                        if (!U()) return;
                                                        let O = await tL(j.onu_id, j.serial_number, t);
                                                        y = O.job;
                                                        let M = Date.now() + 140000;
                                                        for(; U();){
                                                            let e = await tR(O.job, 0);
                                                            if (!U()) return;
                                                            if ("ready" === e.status) {
                                                                var r, n, i, a, l, d, c, p, u, f, b, g, h, w;
                                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                                let t = new Uint8Array(e.bytes), m = 0;
                                                                for(let r = 0; r < e.chunks; r++){
                                                                    let n = 0 === r ? e : await tR(O.job, r);
                                                                    if (!U()) return;
                                                                    if ("ready" !== n.status || n.chunk !== r || n.chunks !== e.chunks || n.bytes !== e.bytes || !n.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                                    let i = atob(n.data);
                                                                    if (i.length > 32768 || m + i.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                                    for(let e = 0; e < i.length; e++)t[m++] = i.charCodeAt(e);
                                                                    let a = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                                                    k.title = `${a}%`, k.firstElementChild.style.width = `${a}%`, x.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                                                }
                                                                if (m !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                                if (await q(), v = tP.parse(eF(JSON.parse(new TextDecoder("utf-8", {
                                                                    fatal: !0
                                                                }).decode(t)))).report, 1 !== v.schema_version || v.onu_id !== j.onu_id) throw Error(_("Unexpected MIB response"));
                                                                k.style.display = "none", x.replaceChildren((r = v, b = {
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
                                                                }, s("div", b))), z.replaceChildren(function(e) {
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
                                                                                                                                            throw new eW("unexpected_variant", `Unexpected variant: ${String(e)}`);
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
                                                                                                                                        children: tK(e.observations)
                                                                                                                                    }, s("pre", l))
                                                                                                                                ]
                                                                                                                            }, s("details", d)) : null
                                                                                                                        ]
                                                                                                                    }, s("td", c)),
                                                                                                                    (p = {
                                                                                                                        class: "mib-attr-ref",
                                                                                                                        children: tY(e.definition)
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
                                                                                                                tY(e.attribute)
                                                                                                            ]
                                                                                                        }, s("p", h)),
                                                                                                        (m = {
                                                                                                            class: "mib-pre",
                                                                                                            children: tK(e.vlan_rules.length ? e.vlan_rules : e.rows)
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
                                                                                                        children: tK({
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
                                                                }(v), (w = {
                                                                    class: "mib-upload-diagnostics",
                                                                    children: [
                                                                        (g = {
                                                                            children: _("Upload diagnostics")
                                                                        }, s("summary", g)),
                                                                        (h = {
                                                                            class: "mib-pre",
                                                                            children: tK(v.diagnostics)
                                                                        }, s("pre", h))
                                                                    ]
                                                                }, s("details", w))), n = v, $.textContent = tK({
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
                                                                }), S.disabled = !1;
                                                                return;
                                                            }
                                                            if (e.progress) {
                                                                let { phase: t, received: r, expected: n } = e.progress;
                                                                if (x.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == n ? "" : `: ${r}/${n}`}` : null == n ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${n}`, n && n > 0) {
                                                                    let e = Math.min(100, Math.round(r / n * 100));
                                                                    k.title = `${e}%`, k.firstElementChild.style.width = `${e}%`;
                                                                }
                                                            }
                                                            if (Date.now() >= M) throw Error(_("MIB query timed out; retry."));
                                                            await new Promise((e)=>setTimeout(e, 1000));
                                                        }
                                                    } catch (e) {
                                                        U() && (k.style.display = "none", x.replaceChildren(s("span", {
                                                            class: "mib-error-text",
                                                            children: [
                                                                String(e),
                                                                v ? ` \xb7 ${_("Previous snapshot retained")}` : ""
                                                            ]
                                                        })));
                                                    } finally{
                                                        await q(), m = !1, P.disabled = T.disabled = !1;
                                                    }
                                                }
                                            }
                                            async function q() {
                                                if (!y) return;
                                                let e = y;
                                                y = null;
                                                try {
                                                    await tA(e);
                                                } catch (e) {
                                                    console.warn("Failed to release MIB snapshot", e);
                                                }
                                            }
                                            D(g), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, Z, "modal-wide");
                                        })(e, "mib"),
                                    children: [
                                        _("View OMCI / MIB details"),
                                        " \u2192"
                                    ]
                                }, s("button", i))
                            }, s("div", a))
                        ]
                    }, s("div", c)),
                    (O = {
                        class: "fttr-grid-2",
                        children: [
                            (m = {
                                class: "fttr-card",
                                children: [
                                    s("h4", {
                                        style: "margin-top:0;margin-bottom:6px;font-size:92%;color:#888",
                                        children: _("Optical physical layer and link parameters")
                                    }),
                                    (p = {
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
                                    }, s("div", p)),
                                    (u = {
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
                                    }, s("div", u)),
                                    (b = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Equalization delay (EQD)")
                                            }),
                                            s("span", {
                                                children: null === (f = e.equalization_delay_bits) ? "\u2014" : `${f} bits`
                                            })
                                        ]
                                    }, s("div", b)),
                                    (g = {
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
                                    }, s("div", g)),
                                    (h = {
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
                                    }, s("div", h))
                                ]
                            }, s("div", m)),
                            (j = {
                                class: "fttr-card",
                                children: [
                                    s("h4", {
                                        style: "margin-top:0;margin-bottom:6px;font-size:92%;color:#888",
                                        children: _("Hardware specifications and firmware images")
                                    }),
                                    (v = {
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
                                    }, s("div", v)),
                                    (y = {
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
                                    }, s("div", y)),
                                    (x = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Firmware version")
                                            }),
                                            (w = {
                                                title: T.full || T.display,
                                                children: s("strong", {
                                                    children: T.display
                                                })
                                            }, s("span", w))
                                        ]
                                    }, s("div", x)),
                                    (k = {
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
                                    }, s("div", k)),
                                    M?.errors.length ? (z = {
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
                                    }, s("div", z)) : null,
                                    P.length > 1 ? ($ = {
                                        class: "fttr-kv-row",
                                        style: "font-size:80%;color:#888",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Software images")
                                            }),
                                            s("span", {
                                                children: P.join(" \xb7 ")
                                            })
                                        ]
                                    }, s("div", $)) : null
                                ]
                            }, s("div", j))
                        ]
                    }, s("div", O))
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
let main = t0.extend({
    load: ()=>tb(),
    render: (e)=>{
        var t, r;
        let n, i, a, o, l, d, c, p, u, f;
        return n = "controller", t4 = !1, i = [
            {
                id: "controller",
                label: _("Controller & optical transceiver")
            },
            {
                id: "subgateways",
                label: _("Sub-gateways & optical links")
            }
        ], a = new Map(), o = t6(e), l = t7(e.sub_gateways ?? []), t = {
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
                            o.hidden = "controller" !== r, l.hidden = "subgateways" !== r, window.dispatchEvent(new Event("resize"));
                        },
                        children: e.label
                    })
                }, s("li", t));
                return a.set(e.id, r), r;
            })
        }, d = s("ul", t), o.hidden = !1, l.hidden = !0, t1 = e.optical_transceiver.tx_enabled, t2 = null, c = t8, tv().then((e)=>{
            t4 || c !== t8 || (t2 = e, t3(t1 = e.tx_enabled));
        }).catch(()=>{
            t4 || c !== t8 || t3(t1 = null);
        }), t5 = o, t3(t1), p = s("div", {
            id: "fttr-panels-container",
            children: [
                o,
                l
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
                d,
                p,
                s("p", {
                    class: "cbi-footer",
                    style: "margin-top:1.5em;font-size:85%;color:#888",
                    children: _("Identity information is read-only and limited to fields provided by fttrctl status.")
                })
            ]
        }, u = s("div", r), f = !1, L.Poll.add(async ()=>{
            if (!u.isConnected || f) return;
            f = !0;
            let e = t8;
            try {
                if (t4) return;
                let [t, r] = await Promise.all([
                    tb(),
                    tv()
                ]);
                if (t4 || e !== t8) return;
                let i = t6(t), a = t7(t.sub_gateways ?? []);
                i.hidden = "controller" !== n, a.hidden = "subgateways" !== n, o.replaceWith(i), l.replaceWith(a), o = i, l = a, t5 = i, t2 = r, t1 = r.tx_enabled, t3(t1);
            } catch  {
                if (t4 || e !== t8) return;
                t2 = null, t3(t1 = null);
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