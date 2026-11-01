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
function o(e, t) {
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
    let o = {}, s = {
        ...n
    };
    for (let [e, t] of Object.entries(s))e.startsWith("on") && "function" == typeof t ? (o[e] = t, delete s[e]) : "boolean" == typeof t && (t ? s[e] = e : delete s[e]);
    let l = Object.keys(s).length > 0 ? i.length > 1 ? E(e, s, i) : E(e, s, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
    for (let [e, t] of Object.entries(o)){
        let r = e.slice(2).toLowerCase();
        l.addEventListener(r, t);
    }
    return l;
}
const s = (e)=>null == e || "" === e ? "\u2014" : String(e);
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
                constr: o,
                traits: new Set()
            },
            enumerable: !1
        }), r._zod.traits.has(e)) return;
        r._zod.traits.add(e), t(r, n);
        let i = o.prototype, a = Object.keys(i);
        for(let e = 0; e < a.length; e++){
            let t = a[e];
            t in r || (r[t] = i[t].bind(r));
        }
    }
    let i = r?.Parent ?? Object;
    class a extends i {
    }
    function o(e) {
        var t;
        let i = r?.Parent ? new a() : this;
        for (let r of (n(i, e), (t = i._zod).deferred ?? (t.deferred = []), i._zod.deferred))r();
        return i;
    }
    return Object.defineProperty(a, "name", {
        value: e
    }), Object.defineProperty(o, "init", {
        value: n
    }), Object.defineProperty(o, Symbol.hasInstance, {
        value: (t)=>!!r?.Parent && t instanceof r.Parent || t?._zod?.traits?.has(e)
    }), Object.defineProperty(o, "name", {
        value: e
    }), o;
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
    }, o = e._zod.run({
        value: r,
        issues: []
    }, a);
    if (o instanceof Promise) throw new p();
    if (o.issues.length) {
        let e = new (i?.Err ?? t)(o.issues.map((e)=>I(e, a, f())));
        throw x(e, i?.callee), e;
    }
    return o.value;
}), A = (r = D, async (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (i?.Err ?? r)(o.issues.map((e)=>I(e, a, f())));
        throw x(e, i?.callee), e;
    }
    return o.value;
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
                let t = e.issues.length, o = a._zod.check(e);
                if (o instanceof Promise && r?.async === !1) throw new p();
                if (n || o instanceof Promise) n = (n ?? Promise.resolve()).then(async ()=>{
                    await o, e.issues.length !== t && (i || (i = M(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = M(e, t));
                }
            }
            return n ? n.then(()=>e) : e;
        }, r = (r, i, a)=>{
            if (M(r)) return r.aborted = !0, r;
            let o = t(i, n, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new p();
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
                return t instanceof Promise ? t.then((e)=>r(e, i, a)) : r(t, i, a);
            }
            let o = e._zod.parse(i, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new p();
                return o.then((e)=>t(e, n, a));
            }
            return t(o, n, a);
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
            let o = i[e], s = t.element._zod.run({
                value: o,
                issues: []
            }, n);
            s instanceof Promise ? a.push(s.then((t)=>Q(t, r, e))) : Q(s, r, e);
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
        let o = t.value;
        if (!k(o)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: o,
            inst: e
        }), t;
        t.value = {};
        let s = [], l = r.shape;
        for (let e of r.keys){
            let r = l[e], i = "optional" === r._zod.optout, a = r._zod.run({
                value: o[e],
                issues: []
            }, n);
            a instanceof Promise ? s.push(a.then((r)=>ee(r, t, e, o, i))) : ee(a, t, e, o, i);
        }
        return a ? function(e, t, r, n, i, a) {
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
                }, n);
                a instanceof Promise ? e.push(a.then((e)=>ee(e, r, i, t, c))) : ee(a, r, i, t, c);
            }
            return (o.length && r.issues.push({
                code: "unrecognized_keys",
                keys: o,
                input: t,
                inst: a
            }), e.length) ? Promise.all(e).then(()=>r) : r;
        }(s, o, t, n, i.value, e) : s.length ? Promise.all(s).then(()=>t) : t;
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
        return o ? Promise.all(s).then((t)=>er(t, i, e, a)) : er(s, i, e, a);
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
        let o = i.value;
        if (!k(o)) return i.issues.push({
            code: "invalid_type",
            expected: "object",
            input: o,
            inst: e
        }), i;
        let s = n.value.get(o?.[t.discriminator]);
        return s ? s._zod.run(i, a) : t.unionFallback ? r(i, a) : (i.issues.push({
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
}), ea = c("$ZodRecord", (e, t)=>{
    F.init(e, t), e._zod.parse = (r, n)=>{
        let i = r.value;
        if (!z(i)) return r.issues.push({
            expected: "record",
            code: "invalid_type",
            input: i,
            inst: e
        }), r;
        let a = [], o = t.keyType._zod.values;
        if (o) {
            let s;
            r.value = {};
            let l = new Set();
            for (let e of o)if ("string" == typeof e || "number" == typeof e || "symbol" == typeof e) {
                l.add("number" == typeof e ? e.toString() : e);
                let o = t.valueType._zod.run({
                    value: i[e],
                    issues: []
                }, n);
                o instanceof Promise ? a.push(o.then((t)=>{
                    t.issues.length && r.issues.push(...P(e, t.issues)), r.value[e] = t.value;
                })) : (o.issues.length && r.issues.push(...P(e, o.issues)), r.value[e] = o.value);
            }
            for(let e in i)l.has(e) || (s = s ?? []).push(e);
            s && s.length > 0 && r.issues.push({
                code: "unrecognized_keys",
                input: i,
                inst: e,
                keys: s
            });
        } else for (let o of (r.value = {}, Reflect.ownKeys(i))){
            if ("__proto__" === o) continue;
            let s = t.keyType._zod.run({
                value: o,
                issues: []
            }, n);
            if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof o && B.test(o) && s.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(o),
                    issues: []
                }, n);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (s = e);
            }
            if (s.issues.length) {
                "loose" === t.mode ? r.value[o] = i[o] : r.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: s.issues.map((e)=>I(e, n, f())),
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
            }, n);
            l instanceof Promise ? a.push(l.then((e)=>{
                e.issues.length && r.issues.push(...P(o, e.issues)), r.value[s.value] = e.value;
            })) : (l.issues.length && r.issues.push(...P(o, l.issues)), r.value[s.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), eo = c("$ZodEnum", (e, t)=>{
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
}), es = c("$ZodLiteral", (e, t)=>{
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
    eo.init(e, t), ef.init(e, t), e.options = Object.values(t.entries);
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
    es.init(e, t), ef.init(e, t);
});
function eL(e, t) {
    return new eN({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...S(t)
    });
}
const eD = c("ZodMiniOptional", (e, t)=>{
    ed.init(e, t), ef.init(e, t);
});
function eR(e) {
    return new eD({
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
    status: eL("pending"),
    job: eb()
});
eE("status", [
    ej({
        status: eL("pending")
    }),
    ej({
        status: eL("ready"),
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
        "offline_or_stale",
        "waiting_transport"
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
                    t[e] && (n[e] = eD ? new eD({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)n[e] = eD ? new eD({
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
    backend: eR(ej({
        configured: eX,
        effective: eX,
        available: ez(eX),
        reason: eX
    })),
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
    method: eL("diff"),
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
        valid: eL(!0),
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
const to = ej({
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
}), ts = eC([
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
    state: ts,
    business_status: to,
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
        offload: eR(ej({
            enabled: eR(eZ(ev())),
            routed_enabled: eR(eZ(ev())),
            bridge_enabled: eR(eZ(ev())),
            engine_attached: eR(eZ(ev())),
            forwarding_verified: eR(eZ(ev()))
        })),
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
    counters_valid: eR(ev()),
    packets_exact: eR(tr),
    bytes_exact: eR(tr),
    index: tr,
    state: tr,
    pkt_type: tr,
    orig_tuple: tr,
    new_tuple: tr,
    eth: tr,
    vlan: tr,
    packets: tn,
    bytes: tn
}), tf = ej({
    sampled_at_ms: eR(tn),
    errors: eR(ez(tr)),
    config_valid: eR(ev()),
    engine_valid: eR(ev()),
    mask_valid: eR(ev()),
    routed_mask_valid: eR(ev()),
    debug_valid: eR(ev()),
    flows_valid: eR(ev()),
    entries_valid: eR(ev()),
    counters_valid: eR(ev()),
    hooks_valid: eR(ev()),
    total_packets_exact: eR(tr),
    total_bytes_exact: eR(tr),
    supported: ev(),
    engine_attached: ev(),
    bridge_offload_enabled: ev(),
    bridge_offload_mask: tn,
    routed_offload_mask: tn,
    bridge_offload_debug: ev(),
    bridge: tr,
    active_ports: ez(tr),
    fw4_hooks_ready: ev(),
    total_entries: tn,
    bound_entries: tn,
    total_packets: tn,
    total_bytes: tn,
    bound_flows: ez(tu)
}), t_ = ej({
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
    })),
    npu: eR(eZ(tf))
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
const tb = {
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
let tg = L.rpc.declare({
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
const th = async ()=>t_.parse(eF(await tg())), tm = ej({
    schema_version: eL(1),
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
let tv = L.rpc.declare({
    object: "luci.fttr",
    method: "optical_status",
    reject: !0
}), ty = L.rpc.declare({
    object: "luci.fttr",
    method: "optical_set",
    params: [
        "enabled"
    ],
    reject: !0
});
const tw = async ()=>tm.parse(await tv()), tx = async (e)=>tm.parse(await ty(e));
ej({
    status: eC([
        "success",
        "error"
    ]),
    enabled: eR(ev()),
    error: eR(eb())
}), L.rpc.declare({
    object: "luci.fttr",
    method: "npu_status",
    reject: !0
}), L.rpc.declare({
    object: "luci.fttr",
    method: "npu_set",
    params: [
        "enabled",
        "bridge"
    ],
    reject: !0
}), eS([
    ej({
        operation_ids: ez(eh()),
        revision: eb()
    }),
    ej({
        started: eL(!0),
        mode: eC([
            "apply",
            "plan"
        ])
    }),
    ej({
        reset: eL(!0),
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
let tk = eb(), tz = eh(), t$ = ev(), tj = ej({
    id: tk,
    url: tk
}), tO = ej({
    name: tk,
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
    index: tz,
    mask: tz,
    size: tz,
    read: t$,
    write: t$,
    set_by_create: t$,
    avc: t$,
    optional: t$,
    deprecated: t$,
    default_hex: eZ(tk),
    reference: tj
}), tS = eE("type", [
    ej({
        type: eL("unsigned"),
        value: tz
    }),
    ej({
        type: eL("signed"),
        value: tz
    }),
    ej({
        type: eL("decimal"),
        value: tk
    }),
    ej({
        type: eL("text"),
        value: eZ(tk)
    }),
    ej({
        type: eL("octets"),
        hex: tk
    }),
    ej({
        type: eL("table_length"),
        bytes: tz
    })
]), tM = ej({
    code: tk,
    message: tk,
    offset: tz,
    mask: tz
}), tE = eC([
    "layout",
    "name_only",
    "unknown"
]), tP = ej({
    raw_hex: tk,
    filter_outer_priority: tz,
    filter_outer_vid: tz,
    filter_outer_tpid_dei: tz,
    filter_inner_priority: tz,
    filter_inner_vid: tz,
    filter_inner_tpid_dei: tz,
    filter_ethertype: tz,
    tags_to_remove: tz,
    treatment_outer_priority: tz,
    treatment_outer_vid: tz,
    treatment_outer_tpid_dei: tz,
    treatment_inner_priority: tz,
    treatment_inner_vid: tz,
    treatment_inner_tpid_dei: tz,
    delete_entry: t$
}), tT = ej({
    schema_version: eL(1),
    reference_version: tk,
    onu_id: eZ(tz),
    uploaded_complete: t$,
    expected_records: tz,
    received_records: tz,
    decoded_records: tz,
    partial_records: tz,
    basic_records: tz,
    tables_requested: t$,
    tables_collected: t$,
    classes: ez(ej({
        class_id: tz,
        name: eZ(tk),
        entities: tz,
        records: tz,
        support: tE
    })),
    entities: ez(ej({
        class_id: tz,
        entity_id: tz,
        name: eZ(tk),
        support: tE,
        reference: eZ(tj),
        sequences: ez(tz),
        attributes: ez(ej({
            definition: tO,
            value: eZ(tS),
            observations: ez(ej({
                raw_hex: tk,
                value: tS,
                sequences: ez(tz)
            }))
        })),
        diagnostics: ez(tM)
    })),
    records: ez(ej({
        class_id: tz,
        entity_id: tz,
        sequence: tz,
        attribute_mask: tz,
        raw_hex: tk,
        consumed: tz,
        remaining_hex: tk,
        undecoded_mask: tz
    })),
    tables: ez(ej({
        class_id: tz,
        entity_id: tz,
        attribute: tO,
        collected: t$,
        error: eZ(tk),
        raw_hex: tk,
        rows: ez(tk),
        vlan_rules: ez(tP)
    })),
    diagnostics: ez(tM)
});
const tI = ej({
    status: eL("ready"),
    report: tT
});
let tC = ej({
    phase: eC([
        "starting",
        "upload",
        "tables"
    ]),
    received: tz,
    expected: eZ(tz)
}), tN = eE("status", [
    ej({
        status: eL("pending"),
        progress: eR(tC)
    }),
    ej({
        status: eL("ready"),
        chunk: tz,
        chunks: tz,
        bytes: tz,
        data: tk
    })
]), tL = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_start",
    params: [
        "onu_id",
        "optical_sn",
        "tables"
    ],
    reject: !0
}), tD = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
}), tR = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_release",
    params: [
        "job"
    ],
    reject: !0
});
const tA = async (e, t, r)=>eJ.parse(eF(await tL(e, t, r))), tZ = async (e, t)=>tN.parse(eF(await tD(e, t))), tU = async (e)=>ej({
        released: t$
    }).parse(eF(await tR(e)));
function tB(e) {
    let t = "none" === e.tone ? "" : `fttr-badge fttr-badge-${e.tone}`, r = e.class ? ` ${e.class}` : "", n = o("span", {
        class: `${t}${r}`.trim(),
        children: e.children
    });
    return e.title && n.setAttribute("title", e.title), n;
}
const tq = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
};
function tV(e) {
    var t;
    let r = (t = e.state) ? "o5_operation" === t ? {
        tone: "success",
        label: tq.o5_operation,
        title: t
    } : {
        tone: "warning",
        label: tq[t] ?? s(t),
        title: t
    } : {
        tone: "none",
        label: "\u2014"
    };
    return o(tB, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
function tW(e) {
    var t;
    let r = (t = e.status) ? {
        tone: "verified" === t.phase ? "success" : t.error || "wan_bootstrap_pending" === t.phase ? "warning" : "neutral",
        label: `${tb[t.phase]} \xb7 ${t.generation}${t.error ? ` \xb7 ${t.error}` : ""}`,
        title: t.error || void 0
    } : {
        tone: "neutral",
        label: "\u2014"
    };
    return o(tB, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const tF = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
};
function tJ(e) {
    var t;
    let r, n, i, a, l, c, p = (t = e.management, r = t?.state, n = d(t?.age_seconds ?? (t?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - t.last_inform) : null)), a = (i = t?.last_inform ? new Date(1000 * t.last_inform).toLocaleString() : null) ? _("Last Inform: %s").replace("%s", i) : void 0, l = "\u2014", c = "none", "online" === r ? (c = "success", l = tF.online) : "waiting_inform" === r ? (c = "warning", l = tF.waiting_inform) : "offline_or_stale" === r ? (c = "danger", l = tF.offline_or_stale) : r && (c = "neutral", l = s(r)), {
        tone: c,
        label: n && r ? `${l} \xb7 ${n}` : l,
        title: a
    });
    return o(tB, {
        tone: p.tone,
        title: p.title,
        children: p.label
    });
}
const tX = {
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
function tH(e) {
    var t, r;
    let n, i, a, l = (t = e.provisioning, r = e.title, n = t?.state, i = t?.next_retry_at && t.next_retry_at > Math.floor(Date.now() / 1000) ? t.next_retry_at - Math.floor(Date.now() / 1000) : 0, a = r ?? (t?.current_revision === !1 ? _("Previous configuration") : t?.management_fresh === !1 ? _("Management stale") : t?.reconcile_reason ? t.reconcile_reason : i > 0 ? _("Next self-healing retry in %d seconds").replace("%d", String(i)) : t?.reason ?? t?.error), n && "not_started" !== n ? "completed" === n || "verified" === n ? {
        tone: "success",
        label: "completed" === n ? tX.completed : _("Ready"),
        title: a
    } : "wan_reconciling" === n || "wan_verifying" === n || "wifi_reconciling" === n || "discovering" === n || "reading" === n || "disabling" === n || "disabling_read" === n || "writing" === n || "verifying" === n || "settling" === n || "recovering" === n || "waiting_task" === n ? {
        tone: "info",
        label: tX[n] ?? s(n),
        title: a
    } : "interrupted" === n || "failed" === n || "error" === n || "blocked" === n ? {
        tone: "danger",
        label: "blocked" === n ? tX.blocked : tX.interrupted,
        title: a
    } : "waiting" === n || "pending" === n || "waiting_management" === n || "reset_pending" === n ? {
        tone: "warning",
        label: tX[n] ?? tX.waiting,
        title: a
    } : {
        tone: "neutral",
        label: s(n),
        title: a
    } : {
        tone: "neutral",
        label: tX.not_started,
        title: a
    });
    return o(tB, {
        tone: l.tone,
        title: l.title,
        children: l.label
    });
}
const tG = {
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
function tK(e) {
    var t;
    let r = (t = e.state) && "not_configured" !== t ? "verified" === t ? {
        tone: "success",
        label: tG.verified
    } : "attention_required" === t ? {
        tone: "danger",
        label: tG.attention_required
    } : "stale_revision" === t || "stale_management" === t || "waiting_management" === t ? {
        tone: "warning",
        label: tG[t]
    } : "recovering" === t ? {
        tone: "info",
        label: tG.recovering
    } : "accepted_unverified" === t || "pending" === t ? {
        tone: "warning",
        label: tG[t]
    } : {
        tone: "neutral",
        label: s(t)
    } : {
        tone: "neutral",
        label: tG.not_configured
    };
    return o(tB, {
        tone: r.tone,
        title: r.title,
        children: r.label
    });
}
const tQ = `
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
let tY = (e)=>JSON.stringify(e, null, 2);
async function t0(e) {
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
function t1(e) {
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
let t2 = L.view, t5 = null, t4 = null, t8 = null, t3 = !1, t6 = 0;
function t7(e) {
    let t = t8;
    if (!t) return;
    let r = t.querySelector('[data-fttr="laser-state"]'), n = t.querySelector('[data-fttr="laser-toggle"]');
    if (!(r instanceof HTMLElement) || !(n instanceof HTMLButtonElement)) return;
    !0 === e ? (r.textContent = _("TX enabled (reset readback)"), r.className = "fttr-badge fttr-badge-success") : !1 === e ? (r.textContent = _("Off (TX disabled)"), r.className = "fttr-badge fttr-badge-warning") : (r.textContent = _("Unknown"), r.className = "fttr-badge fttr-badge-neutral"), n.textContent = !1 === e ? _("Turn laser on") : _("Turn laser off"), n.disabled = t3, n.onclick = async ()=>{
        if (t3) return;
        let e = !1 === t5, t = e ? _("Re-enable the 1490nm downlink laser? Discovery resumes and sub-gateways can register again.") : _("Turn off the 1490nm downlink laser? All sub-gateways are gracefully disconnected and cannot register until the laser is re-enabled. This setting is saved and reapplied after a reboot.");
        if (window.confirm(t)) {
            t3 = !0, t6++, t7(t5);
            try {
                let t = await tx(e);
                if (t4 = t, t5 = t.tx_enabled, "error" === t.status) return void window.alert(`${_("Failed to change laser output")}: ${t.error?.message ?? _("unknown error")}`);
            } catch (e) {
                t5 = null, t4 = null, window.alert(`${_("Failed to change laser output")}: ${String(e)}`);
            } finally{
                t3 = !1, t7(t5);
            }
        }
    };
    let i = t.querySelector('[data-fttr="laser-detail"]');
    if (i instanceof HTMLElement) {
        let e = t4?.desired_enabled;
        i.textContent = [
            !0 === e ? _("Saved setting: on") : !1 === e ? _("Saved setting: off") : _("Saved setting: unknown"),
            t4 ? t4.discovery_active ? _("Discovery active") : _("Discovery paused") : _("Discovery state: unknown"),
            t4?.cleanup_pending ? _("ONU cleanup pending") : "",
            t4?.error?.message ?? ""
        ].filter(Boolean).join(" \xb7 ");
    }
}
function t9(e) {
    var t, r, n, i, a, d, c, p, u, f, b, g, h, m, v, y, w, x, k, z, $;
    let j = e.optical_transceiver, O = o("span", {
        class: `fttr-badge ${"ready" === e.fpga_status ? "fttr-badge-success" : "fttr-badge-neutral"}`,
        style: "font-size:95%",
        children: "ready" === e.fpga_status ? _("Ready") : s(e.fpga_status)
    }), S = null === (t = j.cdr_locked) ? o("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: _("Unknown")
    }) : t ? o("span", {
        class: "fttr-badge fttr-badge-success",
        children: _("Locked")
    }) : o("span", {
        class: "fttr-badge fttr-badge-warning",
        children: _("Unlocked")
    });
    return $ = {
        class: "cbi-section fttr-panel-controller",
        children: [
            o("h3", {
                style: "margin-bottom:12px",
                children: _("Controller hardware")
            }),
            (x = {
                class: "fttr-grid-3",
                children: [
                    (a = {
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
                                        children: O
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
                                        children: s(e.fpga_status)
                                    })
                                ]
                            }, o("div", n)),
                            (i = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("CDR lock")
                                    }),
                                    o("span", {
                                        children: S
                                    })
                                ]
                            }, o("div", i))
                        ]
                    }, o("div", a)),
                    (f = {
                        class: "fttr-card",
                        children: [
                            o("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: _("Optical transceiver")
                            }),
                            (d = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("Module model")
                                    }),
                                    o("strong", {
                                        children: s(j.model)
                                    })
                                ]
                            }, o("div", d)),
                            (c = {
                                class: "fttr-kv-row",
                                children: [
                                    o("span", {
                                        class: "fttr-kv-label",
                                        children: _("TX wavelength")
                                    }),
                                    o("span", {
                                        children: j.wavelength_tx_nm ? `${j.wavelength_tx_nm} nm` : "\u2014"
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
                                        children: j.wavelength_rx_nm ? `${j.wavelength_rx_nm} nm` : "\u2014"
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
                                        children: j.phy_rate_downlink_gbps ? `${j.phy_rate_downlink_gbps} Gbps` : "\u2014"
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
                                        children: j.phy_rate_uplink_gbps ? `${j.phy_rate_uplink_gbps} Gbps` : "\u2014"
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
                                        children: null == j.temperature_celsius ? "\u2014" : `${j.temperature_celsius} \xb0C`
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
                                        children: l(j.tx_power_dbm)
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
                                        children: null == j.vcc_voltage ? "\u2014" : `${j.vcc_voltage} V`
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
                                        children: null == j.laser_bias_current_ma ? "\u2014" : `${j.laser_bias_current_ma} mA`
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
    }, o("div", $);
}
function re(e) {
    var t, r;
    return e.length ? (t = {
        class: "fttr-panel-subgateways",
        children: e.map((e)=>{
            var t, r, n, i, c, p, u, f, b, g, h, m, v, y, w, x, k, z, $, j, O, S, M;
            let P = e.identity, T = P?.software_images ?? [], I = function(e) {
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
            }(e.firmware_version), C = e.identity ? e.identity_current ? _("Current registration") : _("Cached identity") : _("Not collected"), N = o("span", {
                class: `fttr-badge ${e.identity_current ? "fttr-badge-info" : "fttr-badge-neutral"}`,
                style: "font-size:80%",
                children: C
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
                                        children: _("Sub-gateway %s \u2014 %s").replace("%s", String(e.onu_id)).replace("%s", s(e.model))
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
                                            N
                                        ]
                                    }, o("div", r))
                                ]
                            }, o("div", n)),
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
                                                                o(tV, {
                                                                    state: e.state
                                                                })
                                                            ],
                                                            [
                                                                _("Business"),
                                                                o(tW, {
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
                                                                o(tJ, {
                                                                    management: e.management
                                                                })
                                                            ],
                                                            [
                                                                _("Last Inform"),
                                                                e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
                                                            ],
                                                            [
                                                                _("Provisioning"),
                                                                o(tH, {
                                                                    provisioning: e.provisioning
                                                                })
                                                            ],
                                                            [
                                                                _("Wi-Fi sync"),
                                                                o(tK, {
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
                                                                                    children: n instanceof Node ? n : s(n)
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
                                            }, o("div", r)), $ = (n = {
                                                class: "cbi-progressbar",
                                                style: "display:none;width:100%",
                                                title: "0%",
                                                children: o("div", {
                                                    style: "width:0%"
                                                })
                                            }, o("div", n)), j = o("div", {}), O = o("pre", {
                                                class: "onu-raw-pre"
                                            }), S = o("span", {
                                                class: "download-status",
                                                role: "status"
                                            }), M = null, P = o("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                disabled: !0,
                                                onclick: async ()=>{
                                                    if (w && !v) {
                                                        P.disabled = !0, S.textContent = _("Preparing JSON download\u2026");
                                                        try {
                                                            let t = await t0(w);
                                                            if (v) return;
                                                            M && URL.revokeObjectURL(M), M = URL.createObjectURL(t);
                                                            let r = document.createElement("a");
                                                            r.href = M, r.download = `mib-${e.serial_number}.json`, r.click(), S.textContent = _("JSON download started"), window.setTimeout(()=>{
                                                                URL.revokeObjectURL(r.href), M === r.href && (M = null);
                                                            }, 1000);
                                                        } catch (e) {
                                                            S.textContent = String(e);
                                                        } finally{
                                                            P.disabled = !w || v;
                                                        }
                                                    }
                                                },
                                                children: _("Download JSON")
                                            }), T = (d = {
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
                                                                    P,
                                                                    S
                                                                ]
                                                            })
                                                        ]
                                                    }, o("div", i)),
                                                    O
                                                ]
                                            }, o("div", d)), I = o("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-apply",
                                                onclick: ()=>q(!1),
                                                children: _("Read MIB")
                                            }), C = o("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                onclick: ()=>q(!0),
                                                children: _("Read MIB and VLAN tables")
                                            }), N = (u = {
                                                class: "onu-mib-panel",
                                                children: [
                                                    (p = {
                                                        class: "mib-controls",
                                                        children: [
                                                            (c = {
                                                                class: "mib-action-group",
                                                                children: [
                                                                    I,
                                                                    C,
                                                                    o("small", {
                                                                        class: "mib-action-hint",
                                                                        children: _("Collecting VLAN tables queries extended filter tables and takes longer.")
                                                                    })
                                                                ]
                                                            }, o("div", c)),
                                                            z,
                                                            $
                                                        ]
                                                    }, o("div", p)),
                                                    j
                                                ]
                                            }, o("div", u)), D = {
                                                basic: k,
                                                mib: N,
                                                raw: T
                                            }, R = new Map();
                                            function A(e) {
                                                for (let [t, r] of Object.entries(D))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                                                for (let [t, r] of R)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
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
                                                    return R.set(e.id, r), r;
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
				${tQ}
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
                                                            T
                                                        ]
                                                    }, o("div", b)),
                                                    (g = {
                                                        class: "right onu-details-footer",
                                                        children: o("button", {
                                                            type: "button",
                                                            class: "cbi-button",
                                                            onclick: ()=>{
                                                                v = !0, M && URL.revokeObjectURL(M), M = null, w = null, O.textContent = "", j.replaceChildren(), L.ui.hideModal();
                                                            },
                                                            children: _("Close")
                                                        })
                                                    }, o("div", g))
                                                ]
                                            }, o(a, h)), B = ()=>!v && U.isConnected && U.getClientRects().length > 0;
                                            async function q(t) {
                                                if (!y) {
                                                    y = !0, I.disabled = C.disabled = !0, $.style.display = "", $.title = "0%", $.firstElementChild.style.width = "0%", z.textContent = _("Reading MIB\u2026");
                                                    try {
                                                        let v = await th(), y = v.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                                        if (y?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                                        if (!B()) return;
                                                        let k = await tA(y.onu_id, y.serial_number, t);
                                                        x = k.job;
                                                        let S = Date.now() + 140000;
                                                        for(; B();){
                                                            let e = await tZ(k.job, 0);
                                                            if (!B()) return;
                                                            if ("ready" === e.status) {
                                                                var r, n, i, a, l, d, c, p, u, f, b, g, h, m;
                                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                                let t = new Uint8Array(e.bytes), v = 0;
                                                                for(let r = 0; r < e.chunks; r++){
                                                                    let n = 0 === r ? e : await tZ(k.job, r);
                                                                    if (!B()) return;
                                                                    if ("ready" !== n.status || n.chunk !== r || n.chunks !== e.chunks || n.bytes !== e.bytes || !n.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                                    let i = atob(n.data);
                                                                    if (i.length > 32768 || v + i.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                                    for(let e = 0; e < i.length; e++)t[v++] = i.charCodeAt(e);
                                                                    let a = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                                                    $.title = `${a}%`, $.firstElementChild.style.width = `${a}%`, z.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                                                }
                                                                if (v !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                                if (await V(), w = tI.parse(eF(JSON.parse(new TextDecoder("utf-8", {
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
                                                                        }, o("span", i)),
                                                                        (a = {
                                                                            class: `mib-chip ${r.uploaded_complete ? "mib-chip-success" : "mib-chip-warning"}`,
                                                                            children: r.uploaded_complete ? _("Upload complete") : _("Upload incomplete")
                                                                        }, o("span", a)),
                                                                        (l = {
                                                                            class: "mib-chip mib-chip-info",
                                                                            children: [
                                                                                _("Records"),
                                                                                ": ",
                                                                                r.received_records,
                                                                                r.expected_records !== r.received_records ? ` / ${r.expected_records}` : ""
                                                                            ]
                                                                        }, o("span", l)),
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
                                                                }, o("div", b))), j.replaceChildren(function(e) {
                                                                    var t, r, n, i, a, l;
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
                                                                                                        children: s(r.name)
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
                                                                                            }, o("span", l)),
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
                                                                                                            var t, r, n, i, a, l, d, c, p, u;
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
                                                                                                                                            return s(e.value);
                                                                                                                                        case "octets":
                                                                                                                                            return s(e.hex);
                                                                                                                                        case "table_length":
                                                                                                                                            return s(e.bytes);
                                                                                                                                        default:
                                                                                                                                            throw new eW("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                                                    }
                                                                                                                                }(e.value)
                                                                                                                            }, o("span", i)),
                                                                                                                            e.observations?.length ? (d = {
                                                                                                                                class: "mib-obs-details",
                                                                                                                                children: [
                                                                                                                                    (a = {
                                                                                                                                        children: _("Raw data / observations")
                                                                                                                                    }, o("summary", a)),
                                                                                                                                    (l = {
                                                                                                                                        class: "mib-pre",
                                                                                                                                        children: tY(e.observations)
                                                                                                                                    }, o("pre", l))
                                                                                                                                ]
                                                                                                                            }, o("details", d)) : null
                                                                                                                        ]
                                                                                                                    }, o("td", c)),
                                                                                                                    (p = {
                                                                                                                        class: "mib-attr-ref",
                                                                                                                        children: t1(e.definition)
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
                                                                                                var t, r, n, i, a, l, d, c, p, u, f, b, g, h, m, v;
                                                                                                return v = {
                                                                                                    class: "mib-table-details",
                                                                                                    children: [
                                                                                                        (t = {
                                                                                                            children: [
                                                                                                                e.attribute.name,
                                                                                                                " \xb7",
                                                                                                                " ",
                                                                                                                e.collected ? `${e.rows.length} ${_("rows")}` : s(e.error)
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
                                                                                                                                (i = {
                                                                                                                                    children: _("EtherType code")
                                                                                                                                }, o("th", i)),
                                                                                                                                (a = {
                                                                                                                                    children: _("Remove tags")
                                                                                                                                }, o("th", a)),
                                                                                                                                (l = {
                                                                                                                                    children: _("Outer treatment (priority / VID / TPID-DEI)")
                                                                                                                                }, o("th", l)),
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
                                                                                                                            var t, r, n, i, a, l, d, c;
                                                                                                                            return c = {
                                                                                                                                children: [
                                                                                                                                    (t = {
                                                                                                                                        children: `${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`
                                                                                                                                    }, o("td", t)),
                                                                                                                                    (r = {
                                                                                                                                        children: `${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`
                                                                                                                                    }, o("td", r)),
                                                                                                                                    (n = {
                                                                                                                                        children: s(e.filter_ethertype)
                                                                                                                                    }, o("td", n)),
                                                                                                                                    (i = {
                                                                                                                                        children: s(e.tags_to_remove)
                                                                                                                                    }, o("td", i)),
                                                                                                                                    (a = {
                                                                                                                                        children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                                                    }, o("td", a)),
                                                                                                                                    (l = {
                                                                                                                                        children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                                                    }, o("td", l)),
                                                                                                                                    (d = {
                                                                                                                                        children: s(e.delete_entry)
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
                                                                                                                t1(e.attribute)
                                                                                                            ]
                                                                                                        }, o("p", h)),
                                                                                                        (m = {
                                                                                                            class: "mib-pre",
                                                                                                            children: tY(e.vlan_rules.length ? e.vlan_rules : e.rows)
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
                                                                                                        children: tY({
                                                                                                            diagnostics: r.diagnostics,
                                                                                                            records: e.records.filter((e)=>e.class_id === t && e.entity_id === r.entity_id)
                                                                                                        })
                                                                                                    }, o("pre", x))
                                                                                                ]
                                                                                            }, o("details", k))
                                                                                        ]
                                                                                    }, o("div", z))
                                                                                ]
                                                                            }, o("details", $);
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
                                                                            var t, r, n, i;
                                                                            let a = (i = {
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
                                                                            }, o("button", i));
                                                                            return f.set(e.class_id, a), a;
                                                                        })) : u.replaceChildren((t = {
                                                                            class: "mib-empty-list",
                                                                            children: _("No matching ME classes")
                                                                        }, o("div", t)));
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
                                                                                    }, o("div", i)),
                                                                                    u
                                                                                ]
                                                                            }, o("div", a)),
                                                                            c
                                                                        ]
                                                                    }, o("div", l);
                                                                }(w), (m = {
                                                                    class: "mib-upload-diagnostics",
                                                                    children: [
                                                                        (g = {
                                                                            children: _("Upload diagnostics")
                                                                        }, o("summary", g)),
                                                                        (h = {
                                                                            class: "mib-pre",
                                                                            children: tY(w.diagnostics)
                                                                        }, o("pre", h))
                                                                    ]
                                                                }, o("details", m))), n = w, O.textContent = tY({
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
                                                                }), P.disabled = !1;
                                                                return;
                                                            }
                                                            if (e.progress) {
                                                                let { phase: t, received: r, expected: n } = e.progress;
                                                                if (z.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == n ? "" : `: ${r}/${n}`}` : null == n ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${n}`, n && n > 0) {
                                                                    let e = Math.min(100, Math.round(r / n * 100));
                                                                    $.title = `${e}%`, $.firstElementChild.style.width = `${e}%`;
                                                                }
                                                            }
                                                            if (Date.now() >= S) throw Error(_("MIB query timed out; retry."));
                                                            await new Promise((e)=>setTimeout(e, 1000));
                                                        }
                                                    } catch (e) {
                                                        B() && ($.style.display = "none", z.replaceChildren(o("span", {
                                                            class: "mib-error-text",
                                                            children: [
                                                                String(e),
                                                                w ? ` \xb7 ${_("Previous snapshot retained")}` : ""
                                                            ]
                                                        })));
                                                    } finally{
                                                        await V(), y = !1, I.disabled = C.disabled = !1;
                                                    }
                                                }
                                            }
                                            async function V() {
                                                if (!x) return;
                                                let e = x;
                                                x = null;
                                                try {
                                                    await tU(e);
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
                                }, o("button", i))
                            }, o("div", c))
                        ]
                    }, o("div", p)),
                    (S = {
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
                                                children: l(e.optical_rx_power_dbm)
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
                                                children: l(e.optical_tx_power_dbm)
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
                                                children: s(e.data_path?.interface)
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
                                                children: d(e.identity_age_seconds) ?? "\u2014"
                                            })
                                        ]
                                    }, o("div", m))
                                ]
                            }, o("div", v)),
                            (O = {
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
                                                children: s(P?.equipment_id ?? e.model)
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
                                                children: s(P?.hardware_version ?? e.hardware_version)
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
                                                title: I.full || I.display,
                                                children: o("strong", {
                                                    children: I.display
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
                                                children: P?.omcc_version != null ? `0x${P.omcc_version.toString(16).padStart(2, "0")} (${P.omcc_version})` : "\u2014"
                                            })
                                        ]
                                    }, o("div", z)),
                                    P?.errors.length ? ($ = {
                                        class: "fttr-kv-row",
                                        style: "color:#e74c3c",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Identity read errors")
                                            }),
                                            o("span", {
                                                children: P.errors.join("; ")
                                            })
                                        ]
                                    }, o("div", $)) : null,
                                    T.length > 1 ? (j = {
                                        class: "fttr-kv-row",
                                        style: "font-size:80%;color:#888",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                children: _("Software images")
                                            }),
                                            o("span", {
                                                children: T.join(" \xb7 ")
                                            })
                                        ]
                                    }, o("div", j)) : null
                                ]
                            }, o("div", O))
                        ]
                    }, o("div", S))
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
let main = t2.extend({
    load: ()=>th(),
    render: (e)=>{
        var t, r;
        let n, i, a, s, l, d, c, p, u, f;
        return n = "controller", t3 = !1, i = [
            {
                id: "controller",
                label: _("Controller & optical transceiver")
            },
            {
                id: "subgateways",
                label: _("Sub-gateways & optical links")
            }
        ], a = new Map(), s = t9(e), l = re(e.sub_gateways ?? []), t = {
            class: "cbi-tabmenu",
            style: "margin-top:14px;margin-bottom:0",
            children: i.map((e)=>{
                var t;
                let r = (t = {
                    class: n === e.id ? "cbi-tab" : "cbi-tab-disabled",
                    "data-tab": e.id,
                    children: o("a", {
                        href: `#tab-${e.id}`,
                        onclick: (t)=>{
                            t.preventDefault();
                            var r = e.id;
                            for (let [e, t] of (n = r, a))t.className = e === r ? "cbi-tab" : "cbi-tab-disabled";
                            s.hidden = "controller" !== r, l.hidden = "subgateways" !== r, window.dispatchEvent(new Event("resize"));
                        },
                        children: e.label
                    })
                }, o("li", t));
                return a.set(e.id, r), r;
            })
        }, d = o("ul", t), s.hidden = !1, l.hidden = !0, t5 = e.optical_transceiver.tx_enabled, t4 = null, c = t6, tw().then((e)=>{
            t3 || c !== t6 || (t4 = e, t7(t5 = e.tx_enabled));
        }).catch(()=>{
            t3 || c !== t6 || t7(t5 = null);
        }), t8 = s, t7(t5), p = o("div", {
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
            let e = t6;
            try {
                if (t3) return;
                let [t, r] = await Promise.all([
                    th(),
                    tw()
                ]);
                if (t3 || e !== t6) return;
                let i = t9(t), a = re(t.sub_gateways ?? []);
                i.hidden = "controller" !== n, a.hidden = "subgateways" !== n, s.replaceWith(i), l.replaceWith(a), s = i, l = a, t8 = i, t4 = r, t5 = r.tx_enabled, t7(t5);
            } catch  {
                if (t3 || e !== t6) return;
                t4 = null, t7(t5 = null);
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