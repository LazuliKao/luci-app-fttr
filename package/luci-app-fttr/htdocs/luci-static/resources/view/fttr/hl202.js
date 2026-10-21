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
_("Ready"), _("Online"), _("Success"), _("Offline"), _("Error"), _("Failed"), _("Timeout"), _("Pending"), _("Running"), _("Unavailable"), _("Disabled"), _("Enabled");
const l = (e)=>null == e || "" === e ? "\u2014" : String(e), d = (e)=>e ? new Date(1000 * e).toLocaleString() : "\u2014";
function c(e, t, n) {
    return s("span", {
        class: `hl202-badge hl202-badge-${e}`,
        title: n,
        children: t
    });
}
function u(e, t, n) {
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
class p extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const h = {};
function f(e) {
    return e && Object.assign(h, e), h;
}
function g(e, t) {
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
function b(e) {
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const y = Symbol("evaluating");
function v(e, t, n) {
    let r;
    Object.defineProperty(e, t, {
        get () {
            if (r !== y) return void 0 === r && (r = y, r = n()), r;
        },
        set (n) {
            Object.defineProperty(e, t, {
                value: n
            });
        },
        configurable: !0
    });
}
const x = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function w(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
const z = new Set([
    "string",
    "number",
    "symbol"
]);
function T(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
function k(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let n = t; n < e.issues.length; n++)if (e.issues[n]?.continue !== !0) return !0;
    return !1;
}
function $(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function S(e) {
    return "string" == typeof e ? e : e?.message;
}
function O(e, t, n) {
    let r = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (r.message = S(e.inst?._zod.def?.error?.(e)) ?? S(t?.error?.(e)) ?? S(n.customError?.(e)) ?? S(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
const j = (e, t)=>{
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
}, N = u("$ZodError", j), P = u("$ZodError", j, {
    Parent: Error
}), M = (t = P, (e, n, r, i)=>{
    let o = r ? Object.assign(r, {
        async: !1
    }) : {
        async: !1
    }, a = e._zod.run({
        value: n,
        issues: []
    }, o);
    if (a instanceof Promise) throw new p();
    if (a.issues.length) {
        let e = new (i?.Err ?? t)(a.issues.map((e)=>O(e, o, f())));
        throw x(e, i?.callee), e;
    }
    return a.value;
}), R = (n = P, async (e, t, r, i)=>{
    let o = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, a = e._zod.run({
        value: t,
        issues: []
    }, o);
    if (a instanceof Promise && (a = await a), a.issues.length) {
        let e = new (i?.Err ?? n)(a.issues.map((e)=>O(e, o, f())));
        throw x(e, i?.callee), e;
    }
    return a.value;
}), Z = (r = P, (e, t, n)=>{
    let i = n ? {
        ...n,
        async: !1
    } : {
        async: !1
    }, o = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (o instanceof Promise) throw new p();
    return o.issues.length ? {
        success: !1,
        error: new (r ?? N)(o.issues.map((e)=>O(e, i, f())))
    } : {
        success: !0,
        data: o.value
    };
}), A = (i = P, async (e, t, n)=>{
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
        error: new i(o.issues.map((e)=>O(e, r, f())))
    } : {
        success: !0,
        data: o.value
    };
}), D = /^-?\d+(?:\.\d+)?$/, J = /^(?:true|false)$/i, q = /^null$/i, I = {
    major: 4,
    minor: 3,
    patch: 6
}, Q = u("$ZodType", (e, t)=>{
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
            let r, i = k(e);
            for (let o of t){
                if (o._zod.def.when) {
                    if (!o._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, a = o._zod.check(e);
                if (a instanceof Promise && n?.async === !1) throw new p();
                if (r || a instanceof Promise) r = (r ?? Promise.resolve()).then(async ()=>{
                    await a, e.issues.length !== t && (i || (i = k(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = k(e, t));
                }
            }
            return r ? r.then(()=>e) : e;
        }, n = (n, i, o)=>{
            if (k(n)) return n.aborted = !0, n;
            let a = t(i, r, o);
            if (a instanceof Promise) {
                if (!1 === o.async) throw new p();
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
                if (!1 === o.async) throw new p();
                return a.then((e)=>t(e, r, o));
            }
            return t(a, r, o);
        };
    }
    v(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = Z(e, t);
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
}), U = u("$ZodString", (e, t)=>{
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
}), V = u("$ZodNumber", (e, t)=>{
    Q.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? D, e._zod.parse = (n, r)=>{
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
}), F = u("$ZodBoolean", (e, t)=>{
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
}), W = u("$ZodNull", (e, t)=>{
    Q.init(e, t), e._zod.pattern = q, e._zod.values = new Set([
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
}), H = u("$ZodNever", (e, t)=>{
    Q.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function K(e, t, n) {
    e.issues.length && t.issues.push(...$(n, e.issues)), t.value[n] = e.value;
}
const B = u("$ZodArray", (e, t)=>{
    Q.init(e, t), e._zod.parse = (n, r)=>{
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
            s instanceof Promise ? o.push(s.then((t)=>K(t, n, e))) : K(s, n, e);
        }
        return o.length ? Promise.all(o).then(()=>n) : n;
    };
});
function X(e, t, n, r, i) {
    if (e.issues.length) {
        if (i && !(n in r)) return;
        t.issues.push(...$(n, e.issues));
    }
    void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const G = u("$ZodObject", (e, t)=>{
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
    let i = m(()=>(function(e) {
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
    let o = t.catchall;
    e._zod.parse = (t, r)=>{
        n ?? (n = i.value);
        let a = t.value;
        if (!w(a)) return t.issues.push({
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
            o instanceof Promise ? s.push(o.then((n)=>X(n, t, e, a, i))) : X(o, t, e, a, i);
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
                o instanceof Promise ? e.push(o.then((e)=>X(e, n, i, t, c))) : X(o, n, i, t, c);
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
function Y(e, t, n, r) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let i = e.filter((e)=>!k(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>O(e, r, f())))
    }), t);
}
const ee = u("$ZodUnion", (e, t)=>{
    Q.init(e, t), v(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), v(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), v(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), v(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>b(e.source)).join("|")})$`);
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
        return a ? Promise.all(s).then((t)=>Y(t, i, e, o)) : Y(s, i, e, o);
    };
}), et = u("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, ee.init(e, t);
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
    let r = m(()=>{
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
        if (!w(a)) return i.issues.push({
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
}), en = u("$ZodRecord", (e, t)=>{
    Q.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!function(e) {
            if (!1 === w(e)) return !1;
            let t = e.constructor;
            if (void 0 === t || "function" != typeof t) return !0;
            let n = t.prototype;
            return !1 !== w(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
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
                    t.issues.length && n.issues.push(...$(e, t.issues)), n.value[e] = t.value;
                })) : (a.issues.length && n.issues.push(...$(e, a.issues)), n.value[e] = a.value);
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
                    issues: s.issues.map((e)=>O(e, r, f())),
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
                e.issues.length && n.issues.push(...$(a, e.issues)), n.value[s.value] = e.value;
            })) : (l.issues.length && n.issues.push(...$(a, l.issues)), n.value[s.value] = l.value);
        }
        return o.length ? Promise.all(o).then(()=>n) : n;
    };
}), er = u("$ZodEnum", (e, t)=>{
    var n;
    let r;
    Q.init(e, t);
    let i = (r = Object.values(n = t.entries).filter((e)=>"number" == typeof e), Object.entries(n).filter(([e, t])=>-1 === r.indexOf(+e)).map(([e, t])=>t)), o = new Set(i);
    e._zod.values = o, e._zod.pattern = RegExp(`^(${i.filter((e)=>z.has(typeof e)).map((e)=>"string" == typeof e ? T(e) : e.toString()).join("|")})$`), e._zod.parse = (t, n)=>{
        let r = t.value;
        return o.has(r) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: r,
            inst: e
        }), t;
    };
}), ei = u("$ZodLiteral", (e, t)=>{
    if (Q.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? T(e) : e ? T(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i)=>{
        let o = r.value;
        return n.has(o) || r.issues.push({
            code: "invalid_value",
            values: t.values,
            input: o,
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
const ea = u("$ZodOptional", (e, t)=>{
    Q.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", v(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), v(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${b(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let r = t.innerType._zod.run(e, n);
            return r instanceof Promise ? r.then((t)=>eo(t, e.value)) : eo(r, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, n);
    };
}), es = u("$ZodNullable", (e, t)=>{
    Q.init(e, t), v(e._zod, "optin", ()=>t.innerType._zod.optin), v(e._zod, "optout", ()=>t.innerType._zod.optout), v(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${b(e.source)}|null)$`) : void 0;
    }), v(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), el = u("$ZodLazy", (e, t)=>{
    Q.init(e, t), v(e._zod, "innerType", ()=>t.getter()), v(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), v(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), v(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), v(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n)=>e._zod.innerType._zod.run(t, n);
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
const ed = u("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    Q.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>M(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>Z(e, t, n), e.parseAsync = async (t, n)=>R(e, t, n, {
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
        }), e.with = e.check, e.clone = (t, n)=>{
        let r;
        return r = new e._zod.constr(t ?? e._zod.def), (!t || n?.parent) && (r._zod.parent = e), r;
    }, e.brand = ()=>e, e.register = (t, n)=>(t.add(e, n), e), e.apply = (t)=>t(e);
}), ec = u("ZodMiniString", (e, t)=>{
    U.init(e, t), ed.init(e, t);
});
function eu(e) {
    return new ec({
        type: "string",
        ...C(e)
    });
}
const ep = u("ZodMiniNumber", (e, t)=>{
    V.init(e, t), ed.init(e, t);
});
function eh(e) {
    return new ep({
        type: "number",
        checks: [],
        ...C(e)
    });
}
const ef = u("ZodMiniBoolean", (e, t)=>{
    F.init(e, t), ed.init(e, t);
});
function eg(e) {
    return new ef({
        type: "boolean",
        ...C(e)
    });
}
const em = u("ZodMiniNull", (e, t)=>{
    W.init(e, t), ed.init(e, t);
}), eb = u("ZodMiniNever", (e, t)=>{
    H.init(e, t), ed.init(e, t);
});
function ey(e) {
    return new eb({
        type: "never",
        ...C(e)
    });
}
const e_ = u("ZodMiniArray", (e, t)=>{
    B.init(e, t), ed.init(e, t);
});
function ev(e, t) {
    return new e_({
        type: "array",
        element: e,
        ...C(t)
    });
}
const ex = u("ZodMiniObject", (e, t)=>{
    G.init(e, t), ed.init(e, t), v(e, "shape", ()=>t.shape);
});
function ew(e, t) {
    return new ex({
        type: "object",
        shape: e ?? {},
        ...C(t)
    });
}
const ez = u("ZodMiniUnion", (e, t)=>{
    ee.init(e, t), ed.init(e, t);
});
function eT(e, t) {
    return new ez({
        type: "union",
        options: e,
        ...C(t)
    });
}
const eC = u("ZodMiniDiscriminatedUnion", (e, t)=>{
    et.init(e, t), ed.init(e, t);
});
function ek(e, t, n) {
    return new eC({
        type: "union",
        options: t,
        discriminator: e,
        ...C(n)
    });
}
const e$ = u("ZodMiniRecord", (e, t)=>{
    en.init(e, t), ed.init(e, t);
});
function eS(e, t, n) {
    return new e$({
        type: "record",
        keyType: e,
        valueType: t,
        ...C(n)
    });
}
const eO = u("ZodMiniEnum", (e, t)=>{
    er.init(e, t), ed.init(e, t), e.options = Object.values(t.entries);
});
function eE(e, t) {
    return new eO({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...C(t)
    });
}
const ej = u("ZodMiniLiteral", (e, t)=>{
    ei.init(e, t), ed.init(e, t);
});
function eN(e, t) {
    return new ej({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...C(t)
    });
}
const eP = u("ZodMiniOptional", (e, t)=>{
    ea.init(e, t), ed.init(e, t);
});
function eM(e) {
    return new eP({
        type: "optional",
        innerType: e
    });
}
const eL = u("ZodMiniNullable", (e, t)=>{
    es.init(e, t), ed.init(e, t);
});
function eR(e) {
    return new eL({
        type: "nullable",
        innerType: e
    });
}
const eZ = u("ZodMiniLazy", (e, t)=>{
    el.init(e, t), ed.init(e, t);
});
let eA = ew({
    error: eT([
        eu(),
        ew({
            code: eu(),
            message: eu()
        })
    ])
});
class eD extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eJ(e) {
    let t = eA.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eD("rpc", e) : new eD(e.code, e.message);
    }
    return e;
}
const eq = ew({
    status: eN("pending"),
    job: eu()
}), eI = ek("status", [
    ew({
        status: eN("pending")
    }),
    ew({
        status: eN("ready"),
        chunk: eh(),
        chunks: eh(),
        bytes: eh(),
        data: eu()
    })
]);
let eQ = eu(), eU = eh(), eV = eg();
ew({
    optical_sn: eQ,
    onu_id: eU,
    binding_generation: eQ
}), ew({
    mqtt_mac: eQ,
    binding_generation: eQ
});
let eF = ew({
    mqtt_mac: eQ,
    optical_sn: eR(eQ),
    onu_id: eR(eU),
    binding_generation: eQ,
    last_seen: eU,
    reason: eQ
}), eW = {
    target: eQ,
    request_id: eM(eQ),
    output: eM(eQ),
    output_truncated: eV,
    error: eM(eQ)
};
const eH = ek("status", [
    ew({
        ...eW,
        status: eN("executed"),
        exit_code: eR(eU)
    }),
    ew({
        ...eW,
        status: eN("dispatched"),
        exit_code: eM(ey())
    }),
    ew({
        ...eW,
        status: eN("timeout"),
        exit_code: eM(ey())
    }),
    ew({
        ...eW,
        status: eN("error"),
        exit_code: eM(ey())
    })
]);
let eK = ew({
    target: eF,
    result: eH,
    binding_current: eV
}), eB = ew({
    schema_version: eU,
    compressed_bytes: eU,
    decompressed_bytes: eU,
    fields: eS(eQ, ew({
        value: o = new eZ({
            type: "lazy",
            getter: ()=>eT([
                    eu(),
                    eh(),
                    eg(),
                    new em({
                        type: "null",
                        ...C(void 0)
                    }),
                    ev(o),
                    eS(eu(), o)
                ])
        }),
        member: eQ,
        unit: eR(eQ)
    })),
    members: ev(ew({
        name: eQ,
        bytes: eU,
        encoding: eQ,
        text: eR(eQ),
        text_omitted: eV
    })),
    errors: ev(eQ)
}), eX = ew({
    revision: eU,
    last_received: eU,
    last_processed_receipt: eR(eU),
    last_good: eR(eU),
    error: eR(eQ),
    report: eR(eB)
}), eG = {
    schema_version: eN(1),
    target: eF,
    report: eR(eX)
};
const eY = eT([
    ew({
        ...eG,
        state: eE([
            "received",
            "report_unavailable"
        ])
    }),
    ew({
        ...eG,
        read_only: eN(!0)
    })
]), e0 = ew({
    schema_version: eN(1),
    devices: ev(ew({
        optical_sn: eQ,
        onu_id: eU,
        model: eQ,
        optical_online: eV,
        can_execute: eV,
        mqtt: eR(eF),
        report_revision: eR(eU)
    })),
    sources: ev(eF)
}), e2 = ew({
    schema_version: eN(1),
    operation: eK,
    accounts: eR(ev(ew({
        entry: eT([
            eN(0),
            eN(1),
            eN(2)
        ]),
        username: eQ,
        active: eV
    }))),
    write_status: eE([
        "not_applicable",
        "accepted_and_saved",
        "unconfirmed"
    ])
}), e1 = ew({
    schema_version: eN(1),
    operation: eK
});
let e8 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_list",
    reject: !0
}), e4 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_job_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
}), e3 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_report",
    params: [
        "target"
    ],
    reject: !0
}), e5 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_accounts_start",
    params: [
        "target"
    ],
    reject: !0
}), e6 = L.rpc.declare({
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
}), e7 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_exec_start",
    params: [
        "target",
        "script",
        "timeout_seconds"
    ],
    reject: !0
});
async function e9(e) {
    let t = eq.parse(eJ(e)), n = Date.now() + 330000, r = window.location.pathname, i = [], o = 0, a = null;
    for(let e = 0; e < 128;){
        if (window.location.pathname !== r) throw new eD("navigation", _("Result polling stopped after leaving the page. The backend job is not cancelled."));
        if (Date.now() > n) throw new eD("timeout", _("Job polling timed out; execution outcome is unknown. Do not automatically retry."));
        let s = eI.parse(eJ(await e4(t.job, e)));
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
                        return eJ(JSON.parse(new TextDecoder("utf-8", {
                            fatal: !0
                        }).decode(e)));
                    }
                }
        }
    }
    throw new eD("transport", _("Too many result chunks"));
}
const te = async ()=>e0.parse(eJ(await e8())), tt = async (e)=>eY.parse(await e9(await e3(e))), tn = async (e)=>e2.parse(await e9(await e5(e))), tr = async (e, t)=>e2.parse(await e9(await e6(e, `account_set_${t.kind}`, t.entry, t.password, t.active))), ti = async (e, t, n)=>e1.parse(await e9(await e7(e, t, n)));
let to = !1;
function ta() {
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
    }), u = s("button", {
        type: "button",
        class: "cbi-button cbi-button-action",
        children: _("Read MQTT report")
    }), p = async (e)=>{
        let t = e || n;
        if (!t) {
            a.textContent = _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
            return;
        }
        if (to) {
            a.textContent = _("Another operation is in progress.");
            return;
        }
        to = !0, u.disabled = !0, a.textContent = _("Waiting for device result\u2026");
        try {
            var p, h, f, g, m, b, y, v, x, w, z, T, C, k, $, S, O, j, N, P, M, R;
            let e = await tt(t);
            if (JSON.stringify(t) !== JSON.stringify(n)) return;
            if (!e.report) {
                r.replaceChildren(), i.replaceChildren(), o.replaceChildren(), a.textContent = _("No MQTT report has been parsed yet.");
                return;
            }
            let u = e.report;
            if (r.replaceChildren((h = {
                children: [
                    (p = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Revision"),
                            ":"
                        ]
                    }, s("span", p)),
                    c("info", `#${String(u.revision)}`)
                ]
            }, s("span", h)), (m = {
                children: [
                    (f = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Last received"),
                            ":"
                        ]
                    }, s("span", f)),
                    (g = {
                        children: d("number" == typeof u.last_received ? u.last_received : void 0)
                    }, s("strong", g))
                ]
            }, s("span", m)), (v = {
                children: [
                    (b = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Last good report"),
                            ":"
                        ]
                    }, s("span", b)),
                    (y = {
                        children: d("number" == typeof u.last_good ? u.last_good : void 0)
                    }, s("strong", y))
                ]
            }, s("span", v))), "string" == typeof u.error && r.append((x = {
                class: "alert-message warning",
                style: "width:100%;margin-top:6px",
                children: [
                    _("Latest report error"),
                    ": ",
                    u.error
                ]
            }, s("div", x))), u.report) {
                let e = u.report, t = e.fields;
                i.replaceChildren((S = {
                    class: "table",
                    style: "font-size:90%",
                    children: [
                        (k = {
                            children: (C = {
                                children: [
                                    (w = {
                                        children: _("Field")
                                    }, s("th", w)),
                                    (z = {
                                        children: _("Value")
                                    }, s("th", z)),
                                    (T = {
                                        children: _("Source member")
                                    }, s("th", T))
                                ]
                            }, s("tr", C))
                        }, s("thead", k)),
                        ($ = {
                            children: Object.entries(t).map((e)=>{
                                var t, n, r, i, o, a, d;
                                let [c, u] = e, p = u.value, h = null === p ? "\u2014" : `${"object" == typeof p ? JSON.stringify(p) : String(p)}${u.unit ? ` ${u.unit}` : ""}`;
                                return "uptime_seconds" === c && "number" == typeof p && (h = function(e) {
                                    if (void 0 === e || !Number.isFinite(e) || e < 0) return "\u2014";
                                    let t = Math.floor(e / 86400), n = Math.floor(e % 86400 / 3600), r = Math.floor(e % 3600 / 60), i = [];
                                    return t > 0 && i.push(_("%d days").replace("%d", String(t))), (n > 0 || t > 0) && i.push(_("%d hours").replace("%d", String(n))), (r > 0 || n > 0 || t > 0) && i.push(_("%d minutes").replace("%d", String(r))), i.push(_("%d seconds").replace("%d", String(e % 60))), `${i.join(" ")} (${e} s)`;
                                }(p)), d = {
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
                                                children: l(u.member)
                                            }, s("span", o))
                                        }, s("td", a))
                                    ]
                                }, s("tr", d);
                            })
                        }, s("tbody", $))
                    ]
                }, s("table", S)));
                let n = [];
                for (let t of e.members){
                    let e = (O = {
                        type: "button",
                        class: "fttr-btn-subtle",
                        style: "margin-left:8px",
                        onclick: (n)=>{
                            n.stopPropagation(), "string" == typeof t.text && (navigator.clipboard?.writeText(t.text), e.textContent = _("Copied to clipboard"), setTimeout(()=>{
                                e.textContent = _("Copy member text");
                            }, 1500));
                        },
                        children: _("Copy member text")
                    }, s("button", O));
                    n.push((R = {
                        style: "margin:6px 0;border:1px solid rgba(127,140,141,0.15);border-radius:4px;padding:4px 8px",
                        children: [
                            (j = {
                                style: "cursor:pointer;user-select:none;font-weight:600;font-size:90%",
                                children: [
                                    _("%s (%s bytes, %s)").format(String(t.name), String(t.bytes), String(t.encoding)),
                                    "string" == typeof t.text ? e : null
                                ]
                            }, s("summary", j)),
                            (M = {
                                style: "margin-top:6px",
                                children: "string" == typeof t.text ? (N = {
                                    class: "hl202-terminal-output",
                                    style: "max-height:16rem",
                                    children: t.text
                                }, s("pre", N)) : (P = {
                                    style: "font-size:85%;color:#888;margin:4px 0",
                                    children: t.text_omitted ? _("Text omitted at the shared byte limit.") : _("Binary member; text is unavailable.")
                                }, s("p", P))
                            }, s("div", M))
                        ]
                    }, s("details", R)));
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
            a.textContent = e instanceof Error ? e.message : _("Request failed");
        } finally{
            to = !1, u.disabled = !n;
        }
    };
    return u.addEventListener("click", ()=>{
        p();
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
                        u
                    ]
                }, s("div", e)),
                a,
                r,
                i,
                o
            ]
        }, s("div", t)),
        setTarget (e) {
            JSON.stringify(e) !== JSON.stringify(n) && (r.replaceChildren(), i.replaceChildren(), o.replaceChildren(), a.textContent = ""), n = e, u.disabled = !e;
        },
        refresh: (e)=>p(e)
    };
}
let ts = L.view;
if (!("extend" in ts) || "function" != typeof ts.extend) throw Error("LuCI view extension is unavailable");
let main = Reflect.apply(ts.extend, ts, [
    {
        render: function() {
            var e, t, n, r, i, o, a, d, u, p, h, f, g;
            let m, b, y, v, x, w = s("select", {
                id: "hl202-device",
                class: "cbi-input-select",
                "aria-label": _("HL202 device"),
                style: "min-width:320px"
            }), z = s("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                children: _("Refresh devices")
            }), T = s("div", {
                style: "font-size:88%;color:#888;margin:6px 0",
                "aria-live": "polite"
            }), C = s("strong", {
                children: "\u2014"
            }), k = s("span", {
                class: "hl202-badge hl202-badge-neutral",
                style: "font-size:80%",
                children: "\u2014"
            }), $ = s("span", {
                class: "hl202-badge hl202-badge-neutral",
                children: "\u2014"
            }), S = s("span", {
                class: "hl202-badge hl202-badge-neutral",
                children: "\u2014"
            }), O = s("span", {
                class: "hl202-badge hl202-badge-info",
                style: "font-size:80%",
                children: "\u2014"
            }), j = s("div", {
                class: "alert-message warning",
                style: "margin-top:8px",
                hidden: !0,
                children: _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
            }), N = (n = {
                class: "cbi-section hl202-device-card",
                style: "margin-bottom:0",
                children: [
                    (t = {
                        class: "hl202-card-header",
                        children: [
                            s("div", {
                                class: "hl202-device-title",
                                children: [
                                    C,
                                    k
                                ]
                            }),
                            s("div", {
                                class: "hl202-device-badges",
                                children: [
                                    $,
                                    S,
                                    O
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
            }, s("div", n)), P = ta(), M = (m = null, b = s("div", {
                style: "font-size:88%;color:#888;margin:6px 0",
                "aria-live": "polite"
            }), y = s("div", {
                style: "margin-top:10px;display:flex;flex-direction:column;gap:10px"
            }), (v = s("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                children: _("Read users")
            })).disabled = !L.hasViewPermission(), x = async ()=>{
                if (!m) {
                    b.textContent = _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
                    return;
                }
                if (to) {
                    b.textContent = _("Another operation is in progress.");
                    return;
                }
                to = !0, v.disabled = !0, b.textContent = _("Waiting for device result\u2026");
                let e = m;
                try {
                    let h = await tn(e);
                    if (JSON.stringify(e) !== JSON.stringify(m)) return;
                    y.replaceChildren();
                    let f = h.operation, g = f.result;
                    if ("timeout" === g.status ? b.textContent = _("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.") : b.textContent = f.binding_current ? g.error ?? (null === h.accounts ? _("Account data is unavailable.") : "") : _("Device binding changed; this result is stale."), h.accounts && f.binding_current) {
                        let f = [];
                        for (let g of h.accounts){
                            var t, n, r, i, o, a, l, d, c, u, p;
                            let h = g.entry, b = g.active, y = (t = {
                                class: `hl202-badge ${b ? "hl202-badge-success" : "hl202-badge-neutral"}`,
                                style: "font-size:80%",
                                children: b ? _("Enabled") : _("Disabled")
                            }, s("span", t)), v = (n = {
                                type: "password",
                                class: "cbi-input-text",
                                placeholder: _("New password"),
                                autocomplete: "new-password",
                                style: "width:180px"
                            }, s("input", n)), x = (r = {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                children: _("Set password")
                            }, s("button", r)), w = (i = {
                                type: "button",
                                class: `cbi-button ${b ? "cbi-button-neutral" : "cbi-button-apply"}`,
                                children: b ? _("Disable") : _("Enable")
                            }, s("button", i));
                            x.disabled = w.disabled = !L.hasViewPermission();
                            let z = (o = {
                                style: "font-size:82%;margin-top:4px",
                                "aria-live": "polite"
                            }, s("div", o));
                            x.addEventListener("click", async ()=>{
                                if (!m || to || JSON.stringify(e) !== JSON.stringify(m)) return;
                                let t = v.value;
                                if (!t) {
                                    z.textContent = _("Enter a non-empty password.");
                                    return;
                                }
                                v.value = "", to = !0, x.disabled = w.disabled = !0, z.textContent = _("Waiting for device result\u2026");
                                try {
                                    let n = await tr(e, {
                                        entry: h,
                                        kind: "password",
                                        password: t,
                                        active: b
                                    });
                                    if (JSON.stringify(e) !== JSON.stringify(m)) return;
                                    let r = n.operation, i = r.result;
                                    r.binding_current && "accepted_and_saved" === n.write_status ? z.textContent = _("Password accepted and saved; web login permission is not verified.") : z.textContent = i.error ?? _("Execution outcome is unknown. Do not automatically retry.");
                                } catch (e) {
                                    z.textContent = e instanceof Error ? e.message : _("Request failed");
                                } finally{
                                    to = !1, x.disabled = w.disabled = !L.hasViewPermission();
                                }
                            }), w.addEventListener("click", async ()=>{
                                if (m && !to && JSON.stringify(e) === JSON.stringify(m)) {
                                    to = !0, x.disabled = w.disabled = !0, z.textContent = _("Waiting for device result\u2026");
                                    try {
                                        let t = !b, n = await tr(e, {
                                            entry: h,
                                            kind: "active",
                                            password: "",
                                            active: t
                                        });
                                        if (JSON.stringify(e) !== JSON.stringify(m)) return;
                                        let r = n.accounts?.find((e)=>e.entry === h);
                                        if (!n.operation.binding_current || "accepted_and_saved" !== n.write_status || !r) {
                                            z.textContent = n.operation.result.error ?? _("Execution outcome is unknown. Refresh users before retrying.");
                                            return;
                                        }
                                        b = r.active, y.className = `hl202-badge ${b ? "hl202-badge-success" : "hl202-badge-neutral"}`, y.textContent = b ? _("Enabled") : _("Disabled"), w.className = `cbi-button ${b ? "cbi-button-neutral" : "cbi-button-apply"}`, w.textContent = b ? _("Disable") : _("Enable"), z.textContent = `${String(n.write_status)}; ${_("Refresh users to read the current state.")}`;
                                    } catch (e) {
                                        z.textContent = e instanceof Error ? e.message : _("Request failed");
                                    } finally{
                                        to = !1, x.disabled = w.disabled = !L.hasViewPermission();
                                    }
                                }
                            }), f.push((p = {
                                class: "cbi-section",
                                style: "margin:0;padding:10px 14px;border:1px solid rgba(127,140,141,0.2);border-radius:5px",
                                children: [
                                    (u = {
                                        style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                                        children: [
                                            (d = {
                                                style: "display:flex;align-items:center;gap:8px",
                                                children: [
                                                    (a = {
                                                        style: "font-size:105%",
                                                        children: g.username
                                                    }, s("strong", a)),
                                                    (l = {
                                                        style: "font-size:80%;color:#888",
                                                        children: _("(Entry %s)").replace("%s", String(h))
                                                    }, s("span", l)),
                                                    y
                                                ]
                                            }, s("div", d)),
                                            (c = {
                                                style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px",
                                                children: [
                                                    v,
                                                    x,
                                                    w
                                                ]
                                            }, s("div", c))
                                        ]
                                    }, s("div", u)),
                                    z
                                ]
                            }, s("div", p)));
                        }
                        y.replaceChildren(...f);
                    }
                } catch (e) {
                    b.textContent = e instanceof Error ? e.message : _("Request failed");
                } finally{
                    to = !1, v.disabled = !m || !L.hasViewPermission();
                }
            }, v.addEventListener("click", ()=>{
                x();
            }), {
                element: (g = {
                    class: "cbi-section hl202-panel-accounts",
                    children: [
                        (f = {
                            style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:6px",
                            children: [
                                s("h3", {
                                    style: "margin:0",
                                    children: _("User management")
                                }),
                                v
                            ]
                        }, s("div", f)),
                        s("p", {
                            style: "font-size:85%;color:#888;margin:4px 0",
                            children: _("Password writes are accepted and saved by the device; this does not prove web login permission. Existing permission masks are preserved.")
                        }),
                        b,
                        y
                    ]
                }, s("div", g)),
                setTarget (e) {
                    JSON.stringify(e) !== JSON.stringify(m) && (y.replaceChildren(), b.textContent = ""), m = e, v.disabled = !e || !L.hasViewPermission();
                },
                refresh: ()=>x()
            }), R = function() {
                var e, t, n, r;
                let i = null, o = s("div", {
                    style: "font-size:88%;color:#666;margin:4px 0"
                }), a = s("textarea", {
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
                let u = s("div", {
                    style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px"
                }), p = s("pre", {
                    class: "hl202-terminal-output",
                    style: "min-height:4rem;display:none",
                    children: _("# Waiting for commands...")
                }), h = s("button", {
                    type: "button",
                    class: "fttr-btn-subtle",
                    onclick: ()=>{
                        p.textContent && (navigator.clipboard?.writeText(p.textContent), h.textContent = _("Copied to clipboard"), setTimeout(()=>{
                            h.textContent = _("Copy output");
                        }, 1500));
                    },
                    children: _("Copy output")
                }), f = s("button", {
                    type: "button",
                    class: "fttr-btn-subtle",
                    onclick: ()=>{
                        p.textContent = "", p.style.display = "none", u.replaceChildren();
                    },
                    children: _("Clear output")
                }), g = async ()=>{
                    var e, t, n, r, o, g, m, b, y, v, x;
                    if (!i) return void u.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
                    }));
                    if (to) return void u.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: _("Another operation is in progress.")
                    }));
                    let w = Number(l.value);
                    if (!Number.isInteger(w) || w < 1 || w > 300) return void u.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: _("Timeout must be 1\u2013300 seconds.")
                    }));
                    let z = a.value.trim();
                    if (!z || z.includes("\0") || new TextEncoder().encode(z).length > 65536) return void u.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: _("Enter a non-empty UTF-8 script up to 64 KiB without NUL characters.")
                    }));
                    to = !0, d.disabled = !0, p.style.display = "block", p.textContent = `# [${new Date().toLocaleTimeString()}] ${_("Dispatching to %s (timeout: %s s)...").format(i.optical_sn, String(w))}\n`, u.replaceChildren(c("info", _("Waiting for device result\u2026")));
                    let T = Date.now(), C = i;
                    try {
                        let l = await ti(C, a.value, w);
                        if (JSON.stringify(C) !== JSON.stringify(i)) return;
                        let d = ((Date.now() - T) / 1000).toFixed(2), x = l.operation, z = x.result, k = z.status, $ = z.exit_code, S = x.binding_current && !z.error && "executed" === k && 0 === $, O = c(S ? "success" : "timeout" === k ? "warning" : "danger", S ? _("Success") : "timeout" === k ? _("Timeout") : `${_("Exit code")} ${String($ ?? k)}`);
                        u.replaceChildren(O, (n = {
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
                                    children: String($ ?? "\u2014")
                                }, s("code", t))
                            ]
                        }, s("span", n)), (g = {
                            children: [
                                (r = {
                                    style: "color:#888",
                                    children: [
                                        _("Duration"),
                                        ":"
                                    ]
                                }, s("span", r)),
                                " ",
                                (o = {
                                    children: [
                                        d,
                                        " s"
                                    ]
                                }, s("strong", o))
                            ]
                        }, s("span", g)), (y = {
                            children: [
                                (m = {
                                    style: "color:#888",
                                    children: [
                                        _("Request ID"),
                                        ":"
                                    ]
                                }, s("span", m)),
                                " ",
                                (b = {
                                    children: String(z.request_id ?? "\u2014")
                                }, s("code", b))
                            ]
                        }, s("span", y)), (v = {
                            style: "margin-left:auto;display:flex;gap:6px",
                            children: [
                                h,
                                f
                            ]
                        }, s("div", v)));
                        let j = [];
                        x.binding_current || j.push(_("Device binding changed; this result is stale.")), ("timeout" === k || "dispatched" === k) && j.push(_("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.")), "string" == typeof z.output && z.output.length && j.push(z.output), "string" == typeof z.error && z.error.length && j.push(`[STDERR]\n${z.error}`), !0 === z.output_truncated && j.push(`\n[!] ${_("Output was truncated at the byte limit.")}`), 0 === j.length && j.push(_("No output returned.")), p.textContent = j.join("\n");
                    } catch (t) {
                        let e = ((Date.now() - T) / 1000).toFixed(2);
                        u.replaceChildren(c("danger", _("Failed")), (x = {
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
                        }, s("span", x)), s("div", {
                            style: "margin-left:auto;display:flex;gap:6px",
                            children: [
                                h,
                                f
                            ]
                        })), p.textContent = `[ERROR] ${t instanceof Error ? t.message : _("Request failed")}`;
                    } finally{
                        to = !1, d.disabled = !i || !L.hasViewPermission();
                    }
                };
                d.addEventListener("click", ()=>{
                    g();
                }), a.addEventListener("keydown", (e)=>{
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
                ], b = (e = {
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
                                children: _("Raw command console")
                            }),
                            s("p", {
                                style: "font-size:85%;color:#888;margin-top:0;margin-bottom:6px",
                                children: _("Shell executes on the selected ONU. Timeout does not cancel execution. Raw output can contain secrets.")
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
                                    u,
                                    p
                                ]
                            })
                        ]
                    }, s("div", r)),
                    setTarget (e) {
                        var t;
                        JSON.stringify(e) !== JSON.stringify(i) && (u.replaceChildren(), p.textContent = "", p.style.display = "none"), i = e, d.disabled = !e || !L.hasViewPermission(), e ? o.replaceChildren((t = {
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
                        }, s("span", t))) : o.replaceChildren(s("span", {
                            style: "color:#e74c3c",
                            children: _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
                        }));
                    }
                };
            }(), Z = s("select", {
                id: "hl202-source",
                class: "cbi-input-select",
                "aria-label": _("Read-only MQTT source"),
                style: "min-width:240px"
            }), A = s("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                style: "margin-left:8px",
                children: _("Inspect source report (read-only)")
            }), D = s("div", {
                style: "margin-top:10px"
            }), J = [], q = s("pre", {
                style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto"
            }), I = (o = {
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
                                    Z
                                ]
                            }),
                            A
                        ]
                    }, s("div", r)),
                    D,
                    (i = {
                        style: "margin-top:10px",
                        children: [
                            s("summary", {
                                style: "cursor:pointer;font-size:85%;color:#888;font-weight:600",
                                children: _("Raw source observations (JSON)")
                            }),
                            s("div", {
                                style: "margin-top:6px",
                                children: q
                            })
                        ]
                    }, s("details", i))
                ]
            }, s("div", o)), Q = "report", U = [
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
            ], V = new Map(), F = (a = {
                class: "cbi-tabmenu",
                style: "margin-top:14px;margin-bottom:0",
                children: U.map((e)=>{
                    var t;
                    let n = (t = {
                        class: Q === e.id ? "cbi-tab" : "cbi-tab-disabled",
                        "data-tab": e.id,
                        children: s("a", {
                            href: `#tab-${e.id}`,
                            onclick: (t)=>{
                                t.preventDefault();
                                var n = e.id;
                                for (let [e, t] of (Q = n, V))t.className = e === n ? "cbi-tab" : "cbi-tab-disabled";
                                P.element.hidden = "report" !== n, M.element.hidden = "accounts" !== n, R.element.hidden = "console" !== n, I.hidden = "sources" !== n, window.dispatchEvent(new Event("resize"));
                            },
                            children: e.label
                        })
                    }, s("li", t));
                    return V.set(e.id, n), n;
                })
            }, s("ul", a));
            P.element.hidden = !1, M.element.hidden = !0, R.element.hidden = !0, I.hidden = !0;
            let W = s("div", {
                id: "hl202-panels-container",
                children: [
                    P.element,
                    M.element,
                    R.element,
                    I
                ]
            }), H = [], K = "", B = "", X = ()=>{
                let e = w.value, t = H.find((t)=>t.optical_sn === e);
                if (!t) {
                    C.textContent = _("No HL202 optical devices were found."), k.textContent = "\u2014", $.textContent = "\u2014", S.textContent = "\u2014", O.textContent = "\u2014", j.hidden = !0, P.setTarget(null), M.setTarget(null), R.setTarget(null);
                    return;
                }
                if (C.textContent = `${t.optical_sn} (ONU ${t.onu_id})`, k.textContent = t.model || "HL202", t.optical_online ? ($.className = "hl202-badge hl202-badge-success", $.textContent = _("Optical online")) : ($.className = "hl202-badge hl202-badge-danger", $.textContent = _("Optical offline")), t.can_execute && t.mqtt) {
                    S.className = "hl202-badge hl202-badge-success", S.textContent = _("MQTT ready"), O.textContent = `gen: ${t.mqtt.binding_generation}`, O.hidden = !1, j.hidden = !0;
                    let e = {
                        optical_sn: t.optical_sn,
                        onu_id: t.onu_id,
                        binding_generation: t.mqtt.binding_generation
                    };
                    P.setTarget(e), M.setTarget(e), R.setTarget(e);
                } else S.className = "hl202-badge hl202-badge-warning", S.textContent = _("MQTT unavailable"), O.hidden = !0, j.hidden = !1, P.setTarget(null), M.setTarget(null), R.setTarget(null);
            }, G = async ()=>{
                z.disabled = !0, T.textContent = _("Loading devices\u2026");
                try {
                    let t = await te(), n = t.devices;
                    H = n;
                    let r = n.map((e)=>`${e.optical_sn}:${e.onu_id}:${e.optical_online}:${e.can_execute}:${e.report_revision}:${e.mqtt?.binding_generation}`).join("|");
                    if (r !== K) {
                        K = r;
                        let e = w.value;
                        w.replaceChildren(...n.map((e)=>{
                            var t;
                            return t = {
                                value: e.optical_sn,
                                children: l(`${e.model} / ${e.optical_sn} / ONU ${e.onu_id} \u{2014} ${e.can_execute ? _("MQTT ready") : _("MQTT unavailable")}; ${e.optical_online ? _("Optical online") : _("Optical offline")}`)
                            }, s("option", t);
                        })), n.some((t)=>t.optical_sn === e) && (w.value = e);
                    }
                    T.textContent = n.length ? _("Select a device to inspect reports and run operations.") : _("No HL202 optical devices were found."), q.textContent = JSON.stringify(t.sources, null, 2);
                    let i = Z.value, o = [];
                    for (let n of (Z.replaceChildren(), t.sources)){
                        var e;
                        o.push({
                            mqtt_mac: n.mqtt_mac,
                            binding_generation: n.binding_generation
                        }), Z.append((e = {
                            value: n.mqtt_mac,
                            children: l(`${n.mqtt_mac} \u{2014} ${String(n.reason)}`)
                        }, s("option", e)));
                    }
                    J = o, o.some((e)=>e.mqtt_mac === i) && (Z.value = i), A.disabled = 0 === o.length, X();
                    let a = n.find((e)=>e.optical_sn === w.value);
                    a?.can_execute && null !== a.report_revision && `${a.optical_sn}:${a.mqtt?.binding_generation}:${a.report_revision}` !== B && !to && (B = `${a.optical_sn}:${a.mqtt?.binding_generation}:${a.report_revision}`, P.refresh());
                } catch (e) {
                    H = [], X(), T.textContent = e instanceof Error ? e.message : _("Request failed");
                } finally{
                    z.disabled = !1;
                }
            };
            w.addEventListener("change", X), A.addEventListener("click", ()=>{
                let e = J.find((e)=>e.mqtt_mac === Z.value);
                if (D.replaceChildren(), e) {
                    let t = ta();
                    t.setTarget(e), D.append(t.element), t.refresh(e);
                }
            }), z.addEventListener("click", ()=>{
                G();
            }), G();
            let Y = (h = {
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
                    (p = {
                        class: "cbi-section",
                        children: [
                            (u = {
                                style: "display:flex;align-items:center;flex-wrap:wrap;gap:10px",
                                children: [
                                    (d = {
                                        htmlFor: "hl202-device",
                                        style: "display:flex;align-items:center;gap:8px",
                                        children: [
                                            s("strong", {
                                                children: [
                                                    _("HL202 device"),
                                                    ":"
                                                ]
                                            }),
                                            w
                                        ]
                                    }, s("label", d)),
                                    z
                                ]
                            }, s("div", u)),
                            T,
                            N
                        ]
                    }, s("div", p)),
                    F,
                    W
                ]
            }, s("div", h)), ee = async ()=>{
                Y.isConnected && (await G(), Y.isConnected && window.setTimeout(()=>void ee(), 5000));
            };
            return window.setTimeout(()=>void ee(), 5000), Y;
        },
        handleSave: null,
        handleSaveApply: null,
        handleReset: null
    }
]);

return main;