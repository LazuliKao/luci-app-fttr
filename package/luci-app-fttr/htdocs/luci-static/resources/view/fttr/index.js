'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, r, i, n, a;
const o = Symbol.for("jsx.fragment");
function s(e, t) {
    let { children: r, ...i } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, n = function e(t) {
        let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let i of t)null != i && "boolean" != typeof i && (Array.isArray(i) ? e(i, r) : r.push(i instanceof Node ? i : String(i)));
        return r;
    }(null == r ? [] : Array.isArray(r) ? r : [
        r
    ]);
    if (e === o) {
        let e = document.createDocumentFragment();
        return e.append(...n), e;
    }
    if ("function" == typeof e) {
        let t = Reflect.apply(e, void 0, [
            {
                ...i,
                children: n
            }
        ]);
        if (!(t instanceof Node)) throw TypeError("JSX components must return a DOM Node");
        return t;
    }
    if ("string" != typeof e) throw TypeError("JSX element types must be tag names or component functions");
    let a = {}, s = {
        ...i
    };
    for (let [e, t] of Object.entries(s))e.startsWith("on") && "function" == typeof t ? (a[e] = t, delete s[e]) : "boolean" == typeof t && (t ? s[e] = e : delete s[e]);
    let l = Object.keys(s).length > 0 ? n.length > 1 ? E(e, s, n) : E(e, s, n[0]) : n.length > 1 ? E(e, {}, n) : E(e, {}, n[0]);
    for (let [e, t] of Object.entries(a)){
        let r = e.slice(2).toLowerCase();
        l.addEventListener(r, t);
    }
    return l;
}
function l(e, t, r) {
    function i(r, i) {
        if (r._zod || Object.defineProperty(r, "_zod", {
            value: {
                def: i,
                constr: o,
                traits: new Set()
            },
            enumerable: !1
        }), r._zod.traits.has(e)) return;
        r._zod.traits.add(e), t(r, i);
        let n = o.prototype, a = Object.keys(n);
        for(let e = 0; e < a.length; e++){
            let t = a[e];
            t in r || (r[t] = n[t].bind(r));
        }
    }
    let n = r?.Parent ?? Object;
    class a extends n {
    }
    function o(e) {
        var t;
        let n = r?.Parent ? new a() : this;
        for (let r of (i(n, e), (t = n._zod).deferred ?? (t.deferred = []), n._zod.deferred))r();
        return n;
    }
    return Object.defineProperty(a, "name", {
        value: e
    }), Object.defineProperty(o, "init", {
        value: i
    }), Object.defineProperty(o, Symbol.hasInstance, {
        value: (t)=>!!r?.Parent && t instanceof r.Parent || t?._zod?.traits?.has(e)
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
function g(e) {
    let t = +!!e.startsWith("^"), r = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, r);
}
const b = Symbol("evaluating");
function h(e, t, r) {
    let i;
    Object.defineProperty(e, t, {
        get () {
            if (i !== b) return void 0 === i && (i = b, i = r()), i;
        },
        set (r) {
            Object.defineProperty(e, t, {
                value: r
            });
        },
        configurable: !0
    });
}
function m(e, t, r) {
    Object.defineProperty(e, t, {
        value: r,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
}
function v(...e) {
    let t = {};
    for (let r of e)Object.assign(t, Object.getOwnPropertyDescriptors(r));
    return Object.defineProperties({}, t);
}
const y = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function w(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function x(e) {
    if (!1 === w(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let r = t.prototype;
    return !1 !== w(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
}
const k = new Set([
    "string",
    "number",
    "symbol"
]);
function z(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function j(e, t, r) {
    let i = new e._zod.constr(t ?? e._zod.def);
    return (!t || r?.parent) && (i._zod.parent = e), i;
}
function $(e) {
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
    for(let r = t; r < e.issues.length; r++)if (e.issues[r]?.continue !== !0) return !0;
    return !1;
}
function C(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function O(e) {
    return "string" == typeof e ? e : e?.message;
}
function M(e, t, r) {
    let i = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (i.message = O(e.inst?._zod.def?.error?.(e)) ?? O(t?.error?.(e)) ?? O(r.customError?.(e)) ?? O(r.localeError?.(e)) ?? "Invalid input"), delete i.inst, delete i.continue, t?.reportInput || delete i.input, i;
}
const P = (e, t)=>{
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
}, T = l("$ZodError", P), N = l("$ZodError", P, {
    Parent: Error
}), I = (r = N, (e, t, i, n)=>{
    let a = i ? Object.assign(i, {
        async: !1
    }) : {
        async: !1
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise) throw new d();
    if (o.issues.length) {
        let e = new (n?.Err ?? r)(o.issues.map((e)=>M(e, a, u())));
        throw y(e, n?.callee), e;
    }
    return o.value;
}), R = (i = N, async (e, t, r, n)=>{
    let a = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (n?.Err ?? i)(o.issues.map((e)=>M(e, a, u())));
        throw y(e, n?.callee), e;
    }
    return o.value;
}), A = (n = N, (e, t, r)=>{
    let i = r ? {
        ...r,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (a instanceof Promise) throw new d();
    return a.issues.length ? {
        success: !1,
        error: new (n ?? T)(a.issues.map((e)=>M(e, i, u())))
    } : {
        success: !0,
        data: a.value
    };
}), D = (a = N, async (e, t, r)=>{
    let i = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, n = e._zod.run({
        value: t,
        issues: []
    }, i);
    return n instanceof Promise && (n = await n), n.issues.length ? {
        success: !1,
        error: new a(n.issues.map((e)=>M(e, i, u())))
    } : {
        success: !0,
        data: n.value
    };
}), U = /^-?\d+(?:\.\d+)?$/, Z = /^(?:true|false)$/i, B = /^null$/i, F = {
    major: 4,
    minor: 3,
    patch: 6
}, q = l("$ZodType", (e, t)=>{
    var r;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = F;
    let i = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && i.unshift(e), i))for (let r of t._zod.onattach)r(e);
    if (0 === i.length) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, r)=>{
            let i, n = S(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (n) continue;
                let t = e.issues.length, o = a._zod.check(e);
                if (o instanceof Promise && r?.async === !1) throw new d();
                if (i || o instanceof Promise) i = (i ?? Promise.resolve()).then(async ()=>{
                    await o, e.issues.length !== t && (n || (n = S(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    n || (n = S(e, t));
                }
            }
            return i ? i.then(()=>e) : e;
        }, r = (r, n, a)=>{
            if (S(r)) return r.aborted = !0, r;
            let o = t(n, i, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new d();
                return o.then((t)=>e._zod.parse(t, a));
            }
            return e._zod.parse(o, a);
        };
        e._zod.run = (n, a)=>{
            if (a.skipChecks) return e._zod.parse(n, a);
            if ("backward" === a.direction) {
                let t = e._zod.parse({
                    value: n.value,
                    issues: []
                }, {
                    ...a,
                    skipChecks: !0
                });
                return t instanceof Promise ? t.then((e)=>r(e, n, a)) : r(t, n, a);
            }
            let o = e._zod.parse(n, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new d();
                return o.then((e)=>t(e, i, a));
            }
            return t(o, i, a);
        };
    }
    h(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = A(e, t);
                    return r.success ? {
                        value: r.data
                    } : {
                        issues: r.error?.issues
                    };
                } catch (r) {
                    return D(e, t).then((e)=>e.success ? {
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
    var r;
    let i;
    q.init(e, t), e._zod.pattern = [
        ...e?._zod.bag?.patterns ?? []
    ].pop() ?? (i = (r = e._zod.bag) ? `[\\s\\S]{${r?.minimum ?? 0},${r?.maximum ?? ""}}` : "[\\s\\S]*", RegExp(`^${i}$`)), e._zod.parse = (r, i)=>{
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
}), W = l("$ZodNumber", (e, t)=>{
    q.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? U, e._zod.parse = (r, i)=>{
        if (t.coerce) try {
            r.value = Number(r.value);
        } catch (e) {}
        let n = r.value;
        if ("number" == typeof n && !Number.isNaN(n) && Number.isFinite(n)) return r;
        let a = "number" == typeof n ? Number.isNaN(n) ? "NaN" : Number.isFinite(n) ? void 0 : "Infinity" : void 0;
        return r.issues.push({
            expected: "number",
            code: "invalid_type",
            input: n,
            inst: e,
            ...a ? {
                received: a
            } : {}
        }), r;
    };
}), J = l("$ZodBoolean", (e, t)=>{
    q.init(e, t), e._zod.pattern = Z, e._zod.parse = (r, i)=>{
        if (t.coerce) try {
            r.value = !!r.value;
        } catch (e) {}
        let n = r.value;
        return "boolean" == typeof n || r.issues.push({
            expected: "boolean",
            code: "invalid_type",
            input: n,
            inst: e
        }), r;
    };
}), K = l("$ZodNull", (e, t)=>{
    q.init(e, t), e._zod.pattern = B, e._zod.values = new Set([
        null
    ]), e._zod.parse = (t, r)=>{
        let i = t.value;
        return null === i || t.issues.push({
            expected: "null",
            code: "invalid_type",
            input: i,
            inst: e
        }), t;
    };
}), G = l("$ZodNever", (e, t)=>{
    q.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function X(e, t, r) {
    e.issues.length && t.issues.push(...C(r, e.issues)), t.value[r] = e.value;
}
const H = l("$ZodArray", (e, t)=>{
    q.init(e, t), e._zod.parse = (r, i)=>{
        let n = r.value;
        if (!Array.isArray(n)) return r.issues.push({
            expected: "array",
            code: "invalid_type",
            input: n,
            inst: e
        }), r;
        r.value = Array(n.length);
        let a = [];
        for(let e = 0; e < n.length; e++){
            let o = n[e], s = t.element._zod.run({
                value: o,
                issues: []
            }, i);
            s instanceof Promise ? a.push(s.then((t)=>X(t, r, e))) : X(s, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function Q(e, t, r, i, n) {
    if (e.issues.length) {
        if (n && !(r in i)) return;
        t.issues.push(...C(r, e.issues));
    }
    void 0 === e.value ? r in i && (t.value[r] = void 0) : t.value[r] = e.value;
}
const Y = l("$ZodObject", (e, t)=>{
    let r;
    q.init(e, t);
    let i = Object.getOwnPropertyDescriptor(t, "shape");
    if (!i?.get) {
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
    let n = f(()=>(function(e) {
            var t;
            let r = Object.keys(e.shape);
            for (let t of r)if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${t}": expected a Zod schema`);
            let i = Object.keys(t = e.shape).filter((e)=>"optional" === t[e]._zod.optin && "optional" === t[e]._zod.optout);
            return {
                ...e,
                keys: r,
                keySet: new Set(r),
                numKeys: r.length,
                optionalKeys: new Set(i)
            };
        })(t));
    h(e._zod, "propValues", ()=>{
        let e = t.shape, r = {};
        for(let t in e){
            let i = e[t]._zod;
            if (i.values) for (let e of (r[t] ?? (r[t] = new Set()), i.values))r[t].add(e);
        }
        return r;
    });
    let a = t.catchall;
    e._zod.parse = (t, i)=>{
        r ?? (r = n.value);
        let o = t.value;
        if (!w(o)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: o,
            inst: e
        }), t;
        t.value = {};
        let s = [], l = r.shape;
        for (let e of r.keys){
            let r = l[e], n = "optional" === r._zod.optout, a = r._zod.run({
                value: o[e],
                issues: []
            }, i);
            a instanceof Promise ? s.push(a.then((r)=>Q(r, t, e, o, n))) : Q(a, t, e, o, n);
        }
        return a ? function(e, t, r, i, n, a) {
            let o = [], s = n.keySet, l = n.catchall._zod, d = l.def.type, c = "optional" === l.optout;
            for(let n in t){
                if (s.has(n)) continue;
                if ("never" === d) {
                    o.push(n);
                    continue;
                }
                let a = l.run({
                    value: t[n],
                    issues: []
                }, i);
                a instanceof Promise ? e.push(a.then((e)=>Q(e, r, n, t, c))) : Q(a, r, n, t, c);
            }
            return (o.length && r.issues.push({
                code: "unrecognized_keys",
                keys: o,
                input: t,
                inst: a
            }), e.length) ? Promise.all(e).then(()=>r) : r;
        }(s, o, t, i, n.value, e) : s.length ? Promise.all(s).then(()=>t) : t;
    };
});
function ee(e, t, r, i) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let n = e.filter((e)=>!S(e));
    return 1 === n.length ? (t.value = n[0].value, n[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>M(e, i, u())))
    }), t);
}
const et = l("$ZodUnion", (e, t)=>{
    q.init(e, t), h(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), h(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), h(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), h(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>g(e.source)).join("|")})$`);
        }
    });
    let r = 1 === t.options.length, i = t.options[0]._zod.run;
    e._zod.parse = (n, a)=>{
        if (r) return i(n, a);
        let o = !1, s = [];
        for (let e of t.options){
            let t = e._zod.run({
                value: n.value,
                issues: []
            }, a);
            if (t instanceof Promise) s.push(t), o = !0;
            else {
                if (0 === t.issues.length) return t;
                s.push(t);
            }
        }
        return o ? Promise.all(s).then((t)=>ee(t, n, e, a)) : ee(s, n, e, a);
    };
}), er = l("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, et.init(e, t);
    let r = e._zod.parse;
    h(e._zod, "propValues", ()=>{
        let e = {};
        for (let r of t.options){
            let i = r._zod.propValues;
            if (!i || 0 === Object.keys(i).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
            for (let [t, r] of Object.entries(i))for (let i of (e[t] || (e[t] = new Set()), r))e[t].add(i);
        }
        return e;
    });
    let i = f(()=>{
        let e = t.options, r = new Map();
        for (let i of e){
            let e = i._zod.propValues?.[t.discriminator];
            if (!e || 0 === e.size) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(i)}"`);
            for (let t of e){
                if (r.has(t)) throw Error(`Duplicate discriminator value "${String(t)}"`);
                r.set(t, i);
            }
        }
        return r;
    });
    e._zod.parse = (n, a)=>{
        let o = n.value;
        if (!w(o)) return n.issues.push({
            code: "invalid_type",
            expected: "object",
            input: o,
            inst: e
        }), n;
        let s = i.value.get(o?.[t.discriminator]);
        return s ? s._zod.run(n, a) : t.unionFallback ? r(n, a) : (n.issues.push({
            code: "invalid_union",
            errors: [],
            note: "No matching discriminator",
            discriminator: t.discriminator,
            input: o,
            path: [
                t.discriminator
            ],
            inst: e
        }), n);
    };
}), ei = l("$ZodRecord", (e, t)=>{
    q.init(e, t), e._zod.parse = (r, i)=>{
        let n = r.value;
        if (!x(n)) return r.issues.push({
            expected: "record",
            code: "invalid_type",
            input: n,
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
                    value: n[e],
                    issues: []
                }, i);
                o instanceof Promise ? a.push(o.then((t)=>{
                    t.issues.length && r.issues.push(...C(e, t.issues)), r.value[e] = t.value;
                })) : (o.issues.length && r.issues.push(...C(e, o.issues)), r.value[e] = o.value);
            }
            for(let e in n)l.has(e) || (s = s ?? []).push(e);
            s && s.length > 0 && r.issues.push({
                code: "unrecognized_keys",
                input: n,
                inst: e,
                keys: s
            });
        } else for (let o of (r.value = {}, Reflect.ownKeys(n))){
            if ("__proto__" === o) continue;
            let s = t.keyType._zod.run({
                value: o,
                issues: []
            }, i);
            if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof o && U.test(o) && s.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(o),
                    issues: []
                }, i);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (s = e);
            }
            if (s.issues.length) {
                "loose" === t.mode ? r.value[o] = n[o] : r.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: s.issues.map((e)=>M(e, i, u())),
                    input: o,
                    path: [
                        o
                    ],
                    inst: e
                });
                continue;
            }
            let l = t.valueType._zod.run({
                value: n[o],
                issues: []
            }, i);
            l instanceof Promise ? a.push(l.then((e)=>{
                e.issues.length && r.issues.push(...C(o, e.issues)), r.value[s.value] = e.value;
            })) : (l.issues.length && r.issues.push(...C(o, l.issues)), r.value[s.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), en = l("$ZodEnum", (e, t)=>{
    var r;
    let i;
    q.init(e, t);
    let n = (i = Object.values(r = t.entries).filter((e)=>"number" == typeof e), Object.entries(r).filter(([e, t])=>-1 === i.indexOf(+e)).map(([e, t])=>t)), a = new Set(n);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${n.filter((e)=>k.has(typeof e)).map((e)=>"string" == typeof e ? z(e) : e.toString()).join("|")})$`), e._zod.parse = (t, r)=>{
        let i = t.value;
        return a.has(i) || t.issues.push({
            code: "invalid_value",
            values: n,
            input: i,
            inst: e
        }), t;
    };
}), ea = l("$ZodLiteral", (e, t)=>{
    if (q.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? z(e) : e ? z(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (i, n)=>{
        let a = i.value;
        return r.has(a) || i.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
            inst: e
        }), i;
    };
});
function eo(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const es = l("$ZodOptional", (e, t)=>{
    q.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", h(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), h(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${g(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let i = t.innerType._zod.run(e, r);
            return i instanceof Promise ? i.then((t)=>eo(t, e.value)) : eo(i, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, r);
    };
}), el = l("$ZodNullable", (e, t)=>{
    q.init(e, t), h(e._zod, "optin", ()=>t.innerType._zod.optin), h(e._zod, "optout", ()=>t.innerType._zod.optout), h(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${g(e.source)}|null)$`) : void 0;
    }), h(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), ed = l("$ZodCatch", (e, t)=>{
    q.init(e, t), h(e._zod, "optin", ()=>t.innerType._zod.optin), h(e._zod, "optout", ()=>t.innerType._zod.optout), h(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let i = t.innerType._zod.run(e, r);
        return i instanceof Promise ? i.then((i)=>(e.value = i.value, i.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: i.issues.map((e)=>M(e, r, u()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = i.value, i.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: i.issues.map((e)=>M(e, r, u()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ec = l("$ZodLazy", (e, t)=>{
    q.init(e, t), h(e._zod, "innerType", ()=>t.getter()), h(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), h(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), h(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), h(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
            let i = {
                ...r,
                ...this._map.get(e)
            };
            return Object.keys(i).length ? i : void 0;
        }
        return this._map.get(e);
    }
    has(e) {
        return this._map.has(e);
    }
}());
const eu = l("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    q.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>I(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>A(e, t, r), e.parseAsync = async (t, r)=>R(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>D(e, t, r), e.check = (...r)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, r)=>j(e, t, r), e.brand = ()=>e, e.register = (t, r)=>(t.add(e, r), e), e.apply = (t)=>t(e);
}), ep = l("ZodMiniString", (e, t)=>{
    V.init(e, t), eu.init(e, t);
});
function e_(e) {
    return new ep({
        type: "string",
        ...$(e)
    });
}
const ef = l("ZodMiniNumber", (e, t)=>{
    W.init(e, t), eu.init(e, t);
});
function eg(e) {
    return new ef({
        type: "number",
        checks: [],
        ...$(e)
    });
}
const eb = l("ZodMiniBoolean", (e, t)=>{
    J.init(e, t), eu.init(e, t);
});
function eh(e) {
    return new eb({
        type: "boolean",
        ...$(e)
    });
}
const em = l("ZodMiniNull", (e, t)=>{
    K.init(e, t), eu.init(e, t);
}), ev = l("ZodMiniNever", (e, t)=>{
    G.init(e, t), eu.init(e, t);
});
function ey(e) {
    return new ev({
        type: "never",
        ...$(e)
    });
}
const ew = l("ZodMiniArray", (e, t)=>{
    H.init(e, t), eu.init(e, t);
});
function ex(e, t) {
    return new ew({
        type: "array",
        element: e,
        ...$(t)
    });
}
const ek = l("ZodMiniObject", (e, t)=>{
    Y.init(e, t), eu.init(e, t), h(e, "shape", ()=>t.shape);
});
function ez(e, t) {
    return new ek({
        type: "object",
        shape: e ?? {},
        ...$(t)
    });
}
function ej(e, t) {
    if (!x(t)) throw Error("Invalid input to extend: expected a plain object");
    let r = e._zod.def.checks;
    if (r && r.length > 0) {
        let r = e._zod.def.shape;
        for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(r, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
    }
    let i = v(e._zod.def, {
        get shape () {
            let r = {
                ...e._zod.def.shape,
                ...t
            };
            return m(this, "shape", r), r;
        }
    });
    return j(e, i);
}
const e$ = l("ZodMiniUnion", (e, t)=>{
    et.init(e, t), eu.init(e, t);
});
function eS(e, t) {
    return new e$({
        type: "union",
        options: e,
        ...$(t)
    });
}
const eC = l("ZodMiniDiscriminatedUnion", (e, t)=>{
    er.init(e, t), eu.init(e, t);
});
function eO(e, t, r) {
    return new eC({
        type: "union",
        options: t,
        discriminator: e,
        ...$(r)
    });
}
const eM = l("ZodMiniRecord", (e, t)=>{
    ei.init(e, t), eu.init(e, t);
});
function eP(e, t, r) {
    return new eM({
        type: "record",
        keyType: e,
        valueType: t,
        ...$(r)
    });
}
const eE = l("ZodMiniEnum", (e, t)=>{
    en.init(e, t), eu.init(e, t), e.options = Object.values(t.entries);
});
function eL(e, t) {
    return new eE({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...$(t)
    });
}
const eT = l("ZodMiniLiteral", (e, t)=>{
    ea.init(e, t), eu.init(e, t);
});
function eN(e, t) {
    return new eT({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...$(t)
    });
}
const eI = l("ZodMiniOptional", (e, t)=>{
    es.init(e, t), eu.init(e, t);
});
function eR(e) {
    return new eI({
        type: "optional",
        innerType: e
    });
}
const eA = l("ZodMiniNullable", (e, t)=>{
    el.init(e, t), eu.init(e, t);
});
function eD(e) {
    return new eA({
        type: "nullable",
        innerType: e
    });
}
const eU = l("ZodMiniCatch", (e, t)=>{
    ed.init(e, t), eu.init(e, t);
}), eZ = l("ZodMiniLazy", (e, t)=>{
    ec.init(e, t), eu.init(e, t);
});
function eB() {
    let e = new eZ({
        type: "lazy",
        getter: ()=>eS([
                e_(),
                eg(),
                eh(),
                new em({
                    type: "null",
                    ...$(void 0)
                }),
                ex(e),
                eP(e_(), e)
            ])
    });
    return e;
}
let eF = e_(), eq = eg(), eV = eh(), eW = eR(eF), eJ = eR(eq), eK = eR(eV);
const eG = eL([
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
]), eX = eL([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), eH = ez({
    id: eF,
    name: eR(eD(eF)),
    kind: eL([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eF,
    state: eF,
    reason: eW,
    revision: eW,
    current_revision: eK,
    management_fresh: eK,
    operation_id: eJ,
    task_id: eR(eD(eq)),
    updated_at: eJ,
    changes: eR(ex(ez({
        name: eF,
        desired: eF
    })))
});
let eQ = ez({
    state: eF,
    reason: eW,
    task_id: eR(eD(eq)),
    instance: eJ
});
const eY = ez({
    cwmp_id: eF,
    state: eL([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: eV,
    last_inform: eD(eq),
    age_seconds: eD(eq)
});
let e0 = ez({
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
    method: eW,
    reason: eW,
    mqtt_target: eD(eF),
    binding_source: eW,
    link_identity_error: eD(eF),
    mqtt_last_seen: eD(eq),
    cwmp_id: eW,
    desired_version: eW,
    generation: eJ,
    inflight: eK,
    attempts: eJ,
    next_retry_at: eJ,
    updated_at: eJ,
    settings_verified_at: eD(eq),
    last_inform: eD(eq),
    last_error: eR(eD(eF)),
    persistence_error: eR(eD(eF)),
    desired: eR(eD(ez({
        vlan: eq,
        vlans: ex(eq),
        priority: eq,
        acs_url: eF
    }))),
    listener: eR(ez({
        enabled: eV,
        listen: eF,
        path: eF,
        error: eD(eF)
    })),
    endpoint_notice: eW,
    manual_steps: eR(ex(eF))
});
const e1 = eO("state", [
    e0,
    ej(function(e) {
        var t = void 0;
        let r = e._zod.def.checks;
        if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let i = v(e._zod.def, {
            get shape () {
                let r = e._zod.def.shape, i = {
                    ...r
                };
                if (t) for(let e in t){
                    if (!(e in r)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (i[e] = eI ? new eI({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)i[e] = eI ? new eI({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return m(this, "shape", i), i;
            },
            checks: []
        });
        return j(e, i);
    }(e0), {
        state: eL([
            "pending",
            "unavailable"
        ]),
        reason: eF
    })
]), e2 = ez({
    backend: eR(ez({
        configured: eF,
        effective: eF,
        available: ex(eF),
        reason: eF
    })),
    state: eG,
    operation_id: eJ,
    device: eW,
    optical_sn: eW,
    cwmp_id: eW,
    revision: eW,
    mode: eR(eL([
        "apply",
        "plan"
    ])),
    started_at: eJ,
    current_revision: eK,
    management_fresh: eK,
    reason: eW,
    error: eW,
    attempts: eJ,
    next_retry_at: eJ,
    reconcile_reason: eW,
    items: ex(eH),
    cwmp_contract: eR(ez({
        state: eF,
        requested: eF,
        contract: eD(eF),
        reason: eF,
        cache_hit: eV,
        schema: eF,
        capabilities: eD(ez({
            wan: eF,
            wlan: eF,
            binding: eF
        }))
    })),
    wan_objects: eR(eP(eF, eB())),
    wan_lifecycle: eR(eP(eF, eQ)),
    wan_stage: eR(eL([
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
    wifi_objects: eR(ez({
        owned: ex(eq),
        pending: eD(eF),
        pending_instance: eD(eq)
    })),
    wifi_lifecycle: eR(eP(eF, eQ)),
    wifi_stage: eR(eL([
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
    wifi_cleanup: eR(eL([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e5 = ez({
    enabled: eV,
    mode: eL([
        "auto",
        "manual"
    ]),
    vlan: ex(eq),
    priority: eq,
    address: eF,
    acs_url: eF,
    port: eq,
    path: eF,
    dhcp_enabled: eV
}), e3 = ez({
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
    error: eD(eF),
    inflight: eV,
    ready: eV,
    desired_version: eD(eF),
    applied_version: eD(eF),
    next_retry_at: eq,
    attempts: eq,
    desired: eD(e5),
    applied: eD(e5),
    previous: eD(e5),
    plan: ex(ez({
        operation: eF,
        key: eF,
        value: ex(eF)
    }))
});
const e4 = ez({
    device: eF,
    name: eD(eF),
    group: eD(eF),
    group_name: eD(eF),
    template: eD(eF),
    template_name: eD(eF),
    optical_sn: eF,
    adapter: eF,
    omci_management: ez({
        state: eF,
        reason: eR(eD(eF))
    }),
    management: eD(eY),
    acs_bootstrap: e1,
    provisioning: e2,
    services: ex(eH),
    ssids: ex(eH),
    wifi_sync: eX
}), e8 = ez({
    enabled: eV,
    mode: eL([
        "auto",
        "manual"
    ]),
    method: eN("diff"),
    revision: eF,
    triggers: ex(eF),
    interval_minutes: new ef({
        type: "number",
        coerce: !0,
        checks: [],
        ...$(void 0)
    }),
    error: eD(eF),
    devices: ex(e4),
    management_network: e3,
    omci_management: eB(),
    groups: ex(ez({
        id: eF,
        name: eD(eF),
        template: eF
    })),
    pending_devices: ex(eF)
}), e6 = eS([
    ez({
        valid: eN(!0),
        revision: eF,
        devices: eq,
        error: eR(ey())
    }),
    ez({
        error: eF,
        valid: eR(ey()),
        revision: eR(ey()),
        devices: eR(ey())
    })
]);
let e7 = e_(), e9 = eg(), te = eD(e9), tt = eP(e7, ez({
    source: e7,
    unit: e7,
    reason: eD(e7),
    raw: eD(e7),
    age_seconds: te
}));
const tr = ez({
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
    generation: e9,
    error: eD(e7)
}), ti = eL([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tn = ez({
    model: e7,
    wavelength_tx_nm: e9,
    wavelength_rx_nm: e9,
    phy_rate_downlink_gbps: e9,
    phy_rate_uplink_gbps: e9,
    tx_power_dbm: te,
    laser_bias_current_ma: te,
    temperature_celsius: te,
    vcc_voltage: te,
    cdr_locked: eD(eh()),
    tx_enabled: eD(eh()),
    measurements: tt
}), ta = ez({
    equipment_id: eD(e7),
    hardware_version: eD(e7),
    software_images: ex(e7),
    omcc_version: te,
    errors: ex(e7)
});
const to = ez({
    onu_id: e9,
    vendor: e7,
    model: e7,
    serial_number: e7,
    state: ti,
    business_status: tr,
    management: eD(eY),
    provisioning: eD(e2),
    services: ex(eH),
    ssids: ex(eH),
    wifi_sync: eX,
    acs_bootstrap: eR(e1),
    identity: eD(ta),
    identity_age_seconds: te,
    identity_current: eh(),
    fiber_distance_m: te,
    ranging_delay_rtd_ns: te,
    equalization_delay_bits: new eU({
        type: "catch",
        innerType: te,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: te,
    optical_tx_power_dbm: te,
    firmware_version: e7,
    hardware_version: e7,
    uptime_seconds: te,
    data_path: ez({
        interface: e7,
        gem_ports: eD(ex(e9)),
        vlan_id: te,
        tx_bytes: te,
        rx_bytes: te,
        current_tx_kbps: te,
        current_rx_kbps: te,
        offload: eR(ez({
            enabled: eR(eD(eh())),
            routed_enabled: eR(eD(eh())),
            bridge_enabled: eR(eD(eh())),
            engine_attached: eR(eD(eh())),
            forwarding_verified: eR(eD(eh()))
        })),
        measurements: tt
    }),
    wifi_mesh: ez({
        channel_2g: te,
        channel_5g: te,
        bandwidth_5g: eD(e7),
        tx_power_pct: te,
        measurements: tt
    }),
    connected_clients: eD(ex(ez({
        mac: e7,
        ip: e7,
        band: e7,
        rssi_dbm: te,
        rx_rate_mbps: te,
        tx_rate_mbps: te
    }))),
    measurements: tt
});
let ts = ez({
    reserved_sn: eR(e7),
    port: e9,
    interface: e7,
    carrier: eh(),
    status: e7,
    onu_id: eR(e9),
    onu_sn: eR(e7),
    link_state: e7
});
const tl = ez({
    counters_valid: eR(eh()),
    packets_exact: eR(e7),
    bytes_exact: eR(e7),
    index: e7,
    state: e7,
    pkt_type: e7,
    orig_tuple: e7,
    new_tuple: e7,
    eth: e7,
    vlan: e7,
    packets: e9,
    bytes: e9
}), td = ez({
    sampled_at_ms: eR(e9),
    errors: eR(ex(e7)),
    config_valid: eR(eh()),
    engine_valid: eR(eh()),
    mask_valid: eR(eh()),
    routed_mask_valid: eR(eh()),
    debug_valid: eR(eh()),
    flows_valid: eR(eh()),
    entries_valid: eR(eh()),
    counters_valid: eR(eh()),
    hooks_valid: eR(eh()),
    total_packets_exact: eR(e7),
    total_bytes_exact: eR(e7),
    supported: eh(),
    engine_attached: eh(),
    bridge_offload_enabled: eh(),
    bridge_offload_mask: e9,
    routed_offload_mask: e9,
    bridge_offload_debug: eh(),
    bridge: e7,
    active_ports: ex(e7),
    fw4_hooks_ready: eh(),
    total_entries: e9,
    bound_entries: e9,
    total_packets: e9,
    total_bytes: e9,
    bound_flows: ex(tl)
}), tc = ej(td, {
    sampled_at_ms: e9,
    errors: ex(e7),
    config_valid: eh(),
    engine_valid: eh(),
    mask_valid: eh(),
    routed_mask_valid: eh(),
    debug_valid: eh(),
    flows_valid: eh(),
    entries_valid: eh(),
    counters_valid: eh(),
    hooks_valid: eh(),
    total_packets_exact: e7,
    total_bytes_exact: e7,
    bound_ipv4_entries: e9,
    bound_ipv6_entries: e9,
    bound_flows: ex(ej(tl, {
        counters_valid: eh(),
        packets_exact: e7,
        bytes_exact: e7
    }))
}), tu = ez({
    onu_pinning: eR(ez({
        desired: eP(e7, e9),
        active: eP(e7, e9),
        pending_restart: eh(),
        allocation_blocked: eh(),
        startup_error: eD(e7),
        config_error: eD(e7)
    })),
    fpga_status: e7,
    provisioning: eD(e8),
    optical_transceiver: tn,
    switch_ports: ex(ts),
    sub_gateways: ex(to),
    telemetry_gateways: ex(ez({
        id: e7,
        last_seen_sec_ago: e9,
        last_payload_bytes: e9
    })),
    npu: eR(eD(td))
}), tp = eP(e7, ez({
    carrier: eR(eh()),
    mac: eR(e7),
    link: eR(ez({
        speed: eR(e9),
        duplex: eR(e7),
        autoneg: eR(eh())
    })),
    stats: eR(eP(e7, e9))
})), t_ = (e)=>null == e || "" === e ? "\u2014" : String(e);
function tf(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
    return null != e && Number.isFinite(e) ? `${e.toFixed(t)} dBm` : "\u2014";
}
function tg(e) {
    if (void 0 === e || !Number.isFinite(e) || e < 0) return "\u2014";
    if (e < 1024) return `${e} B`;
    let t = [
        "KiB",
        "MiB",
        "GiB",
        "TiB"
    ], r = e / 1024, i = 0;
    for(; r >= 1024 && i < t.length - 1;)r /= 1024, i++;
    return `${r.toFixed(1)} ${t[i]}`;
}
function tb(e) {
    return void 0 === e || !Number.isFinite(e) || e < 0 ? "\u2014" : e < 1000 ? `${e} Pkts.` : `${(e / 1000).toFixed(2)} KPkts.`;
}
function th(e) {
    let t = "none" === e.tone ? "" : `fttr-badge fttr-badge-${e.tone}`, r = e.class ? ` ${e.class}` : "", i = s("span", {
        class: `${t}${r}`.trim(),
        children: e.children
    });
    return e.title && i.setAttribute("title", e.title), i;
}
function tm(e, t, r, i) {
    e.textContent = r, "none" === t ? e.className = "" : e.className = `fttr-badge fttr-badge-${t}`, i ? e.setAttribute("title", i) : e.removeAttribute("title");
}
const tv = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
};
function ty(e) {
    return e ? "o5_operation" === e ? {
        tone: "success",
        label: tv.o5_operation,
        title: e
    } : {
        tone: "warning",
        label: tv[e] ?? t_(e),
        title: e
    } : {
        tone: "none",
        label: "\u2014"
    };
}
function tw(e) {
    let t = ty(e.state);
    return s(th, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
function tx(e) {
    return e ? {
        tone: "verified" === e.phase ? "success" : e.error || "wan_bootstrap_pending" === e.phase ? "warning" : "neutral",
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
        })[e.phase]} \xb7 ${e.generation}${e.error ? ` \xb7 ${e.error}` : ""}`,
        title: e.error || void 0
    } : {
        tone: "neutral",
        label: "\u2014"
    };
}
function tk(e) {
    let t = tx(e.status);
    return s(th, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
const tz = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
};
function tj(e) {
    let t = e?.state, r = function(e) {
        if (null == e || !Number.isFinite(e) || e < 0) return null;
        let t = Math.floor(e);
        if (t < 60) return (1 === t ? _("%d second ago") : _("%d seconds ago")).replace("%d", String(t));
        let r = Math.floor(t / 60);
        if (r < 60) return (1 === r ? _("%d minute ago") : _("%d minutes ago")).replace("%d", String(r));
        let i = Math.floor(t / 3600);
        if (i < 24) return (1 === i ? _("%d hour ago") : _("%d hours ago")).replace("%d", String(i));
        let n = Math.floor(t / 86400);
        return (1 === n ? _("%d day ago") : _("%d days ago")).replace("%d", String(n));
    }(e?.age_seconds ?? (e?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - e.last_inform) : null)), i = e?.last_inform ? new Date(1000 * e.last_inform).toLocaleString() : null, n = i ? _("Last Inform: %s").replace("%s", i) : void 0, a = "\u2014", o = "none";
    return "online" === t ? (o = "success", a = tz.online) : "waiting_inform" === t ? (o = "warning", a = tz.waiting_inform) : "offline_or_stale" === t ? (o = "danger", a = tz.offline_or_stale) : t && (o = "neutral", a = t_(t)), {
        tone: o,
        label: r && t ? `${a} \xb7 ${r}` : a,
        title: n
    };
}
function t$(e) {
    let t = tj(e.management);
    return s(th, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
const tS = {
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
function tC(e, t) {
    let r = e?.state, i = e?.next_retry_at && e.next_retry_at > Math.floor(Date.now() / 1000) ? e.next_retry_at - Math.floor(Date.now() / 1000) : 0, n = t ?? (e?.current_revision === !1 ? _("Previous configuration") : e?.management_fresh === !1 ? _("Management stale") : e?.reconcile_reason ? e.reconcile_reason : i > 0 ? _("Next self-healing retry in %d seconds").replace("%d", String(i)) : e?.reason ?? e?.error);
    return r && "not_started" !== r ? "completed" === r || "verified" === r ? {
        tone: "success",
        label: "completed" === r ? tS.completed : _("Ready"),
        title: n
    } : "wan_reconciling" === r || "wan_verifying" === r || "wifi_reconciling" === r || "discovering" === r || "reading" === r || "disabling" === r || "disabling_read" === r || "writing" === r || "verifying" === r || "settling" === r || "recovering" === r || "waiting_task" === r ? {
        tone: "info",
        label: tS[r] ?? t_(r),
        title: n
    } : "interrupted" === r || "failed" === r || "error" === r || "blocked" === r ? {
        tone: "danger",
        label: "blocked" === r ? tS.blocked : tS.interrupted,
        title: n
    } : "waiting" === r || "pending" === r || "waiting_management" === r || "reset_pending" === r ? {
        tone: "warning",
        label: tS[r] ?? tS.waiting,
        title: n
    } : {
        tone: "neutral",
        label: t_(r),
        title: n
    } : {
        tone: "neutral",
        label: tS.not_started,
        title: n
    };
}
function tO(e) {
    let t = tC(e.provisioning, e.title);
    return s(th, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
const tM = {
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
function tP(e) {
    return e && "not_configured" !== e ? "verified" === e ? {
        tone: "success",
        label: tM.verified
    } : "attention_required" === e ? {
        tone: "danger",
        label: tM.attention_required
    } : "stale_revision" === e || "stale_management" === e || "waiting_management" === e ? {
        tone: "warning",
        label: tM[e]
    } : "recovering" === e ? {
        tone: "info",
        label: tM.recovering
    } : "accepted_unverified" === e || "pending" === e ? {
        tone: "warning",
        label: tM[e]
    } : {
        tone: "neutral",
        label: t_(e)
    } : {
        tone: "neutral",
        label: tM.not_configured
    };
}
function tE(e) {
    let t = tP(e.state);
    return s(th, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
const tL = `
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
let tT = ez({
    error: eS([
        e_(),
        ez({
            code: e_(),
            message: e_()
        })
    ])
});
class tN extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function tI(e) {
    let t = tT.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new tN("rpc", e) : new tN(e.code, e.message);
    }
    return e;
}
const tR = ez({
    status: eN("pending"),
    job: e_()
});
eO("status", [
    ez({
        status: eN("pending")
    }),
    ez({
        status: eN("ready"),
        chunk: eg(),
        chunks: eg(),
        bytes: eg(),
        data: e_()
    })
]);
const tA = ez({
    schema_version: eN(1),
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
    desired_enabled: eD(eh()),
    tx_enabled: eD(eh()),
    actor_state: eL([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: eh(),
    discovery_active: eh(),
    cleanup_pending: eh(),
    error: eD(ez({
        code: e_(),
        message: e_()
    }))
}), tD = ez({
    schema_version: eN(1),
    version: e_(),
    features: eP(e_(), eh()),
    functions: ez({
        optical: eh(),
        omci_mib: eh(),
        mqtt_telemetry: eh(),
        hl202_management: eh(),
        cwmp: eh()
    }),
    pages: ez({
        status: eh(),
        config: eh(),
        sync: eh(),
        hl202: eh(),
        hardware: eh(),
        calibration: eh(),
        about: eh()
    }),
    adapters: ex(ez({
        id: e_(),
        name: e_()
    }))
});
let tU = L.rpc.declare({
    object: "luci.fttr",
    method: "config_reload",
    reject: !0
}), tZ = (L.rpc.declare({
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
}));
L.rpc.declare({
    object: "luci.fttr",
    method: "sync",
    params: [
        "action",
        "target"
    ],
    reject: !0
});
const tB = async ()=>{
    var e, r;
    let i, n, a, o, s, l, d;
    return (t ??= (e = L.rpc, r = {
        getCapabilities: {
            parse: (e)=>tD.parse(tI(e))
        },
        opticalStatus: tA,
        opticalSet: tA,
        getStatus: {
            parse: (e)=>tu.parse(tI(e))
        },
        getSync: {
            parse: (e)=>e8.parse(tI(e))
        },
        configCheck: e6,
        npuStatus: tc
    }, i = e.declare({
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
        getCapabilities: async ()=>r.getCapabilities.parse(await i()),
        opticalStatus: async ()=>r.opticalStatus.parse(await n()),
        opticalSet: async (e)=>r.opticalSet.parse(await a(e.enabled)),
        getStatus: async ()=>r.getStatus.parse(await o()),
        getSync: async ()=>r.getSync.parse(await s()),
        configCheck: async ()=>r.configCheck.parse(await l()),
        npuStatus: async ()=>r.npuStatus.parse(await d())
    })).getStatus();
}, tF = async ()=>e8.parse(tI(await tU())), tq = async ()=>tp.parse(tI(await tZ()));
ez({
    status: eL([
        "success",
        "error"
    ]),
    enabled: eR(eh()),
    error: eR(e_())
}), L.rpc.declare({
    object: "luci.fttr",
    method: "npu_set",
    params: [
        "enabled",
        "bridge"
    ],
    reject: !0
}), eS([
    ez({
        operation_ids: ex(eg()),
        revision: e_()
    }),
    ez({
        started: eN(!0),
        mode: eL([
            "apply",
            "plan"
        ])
    }),
    ez({
        reset: eN(!0),
        device: e_()
    }),
    ez({
        operation_ids: ex(eg()),
        mode: eL([
            "apply",
            "plan"
        ]),
        reconcile: eR(eh()),
        retry: eR(eh())
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
}), ez({
    source: eL([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: e_(),
    size: eg(),
    sha256: e_(),
    data: eR(e_()),
    factory: ez({
        detected: eh(),
        device: e_(),
        has_data: eh(),
        sha256: e_(),
        data: e_()
    }),
    firmware: ez({
        exists: eh(),
        path: e_(),
        size: eg(),
        sha256: e_(),
        data: e_()
    }),
    error: eR(e_())
}), ez({
    success: eh(),
    path: e_(),
    size: eg(),
    sha256: e_(),
    error: eR(e_())
}), ez({
    success: eh(),
    output: eR(e_()),
    error: eR(e_())
});
let tV = e_(), tW = eg(), tJ = eh(), tK = ez({
    id: tV,
    url: tV
}), tG = ez({
    name: tV,
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
    index: tW,
    mask: tW,
    size: tW,
    read: tJ,
    write: tJ,
    set_by_create: tJ,
    avc: tJ,
    optional: tJ,
    deprecated: tJ,
    default_hex: eD(tV),
    reference: tK
}), tX = eO("type", [
    ez({
        type: eN("unsigned"),
        value: tW
    }),
    ez({
        type: eN("signed"),
        value: tW
    }),
    ez({
        type: eN("decimal"),
        value: tV
    }),
    ez({
        type: eN("text"),
        value: eD(tV)
    }),
    ez({
        type: eN("octets"),
        hex: tV
    }),
    ez({
        type: eN("table_length"),
        bytes: tW
    })
]), tH = ez({
    code: tV,
    message: tV,
    offset: tW,
    mask: tW
}), tQ = eL([
    "layout",
    "name_only",
    "unknown"
]), tY = ez({
    raw_hex: tV,
    filter_outer_priority: tW,
    filter_outer_vid: tW,
    filter_outer_tpid_dei: tW,
    filter_inner_priority: tW,
    filter_inner_vid: tW,
    filter_inner_tpid_dei: tW,
    filter_ethertype: tW,
    tags_to_remove: tW,
    treatment_outer_priority: tW,
    treatment_outer_vid: tW,
    treatment_outer_tpid_dei: tW,
    treatment_inner_priority: tW,
    treatment_inner_vid: tW,
    treatment_inner_tpid_dei: tW,
    delete_entry: tJ
}), t0 = ez({
    schema_version: eN(1),
    reference_version: tV,
    onu_id: eD(tW),
    uploaded_complete: tJ,
    expected_records: tW,
    received_records: tW,
    decoded_records: tW,
    partial_records: tW,
    basic_records: tW,
    tables_requested: tJ,
    tables_collected: tJ,
    classes: ex(ez({
        class_id: tW,
        name: eD(tV),
        entities: tW,
        records: tW,
        support: tQ
    })),
    entities: ex(ez({
        class_id: tW,
        entity_id: tW,
        name: eD(tV),
        support: tQ,
        reference: eD(tK),
        sequences: ex(tW),
        attributes: ex(ez({
            definition: tG,
            value: eD(tX),
            observations: ex(ez({
                raw_hex: tV,
                value: tX,
                sequences: ex(tW)
            }))
        })),
        diagnostics: ex(tH)
    })),
    records: ex(ez({
        class_id: tW,
        entity_id: tW,
        sequence: tW,
        attribute_mask: tW,
        raw_hex: tV,
        consumed: tW,
        remaining_hex: tV,
        undecoded_mask: tW
    })),
    tables: ex(ez({
        class_id: tW,
        entity_id: tW,
        attribute: tG,
        collected: tJ,
        error: eD(tV),
        raw_hex: tV,
        rows: ex(tV),
        vlan_rules: ex(tY)
    })),
    diagnostics: ex(tH)
});
const t1 = ez({
    status: eN("ready"),
    report: t0
});
let t2 = ez({
    phase: eL([
        "starting",
        "upload",
        "tables"
    ]),
    received: tW,
    expected: eD(tW)
}), t5 = eO("status", [
    ez({
        status: eN("pending"),
        progress: eR(t2)
    }),
    ez({
        status: eN("ready"),
        chunk: tW,
        chunks: tW,
        bytes: tW,
        data: tV
    })
]), t3 = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_start",
    params: [
        "onu_id",
        "optical_sn",
        "tables"
    ],
    reject: !0
}), t4 = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
}), t8 = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_release",
    params: [
        "job"
    ],
    reject: !0
});
const t6 = async (e, t, r)=>tR.parse(tI(await t3(e, t, r))), t7 = async (e, t)=>t5.parse(tI(await t4(e, t))), t9 = async (e)=>ez({
        released: tJ
    }).parse(tI(await t8(e)));
let re = (e)=>JSON.stringify(e, null, 2);
async function rt(e) {
    let t = [
        "{"
    ], r = !0;
    for (let [i, n] of Object.entries(e))if (r || t.push(","), r = !1, t.push(JSON.stringify(i), ":"), Array.isArray(n)) {
        t.push("[");
        for(let e = 0; e < n.length; e++){
            e && t.push(",");
            let r = JSON.stringify(n[e]);
            if (void 0 === r) throw Error(_("MIB snapshot cannot be serialized"));
            t.push(r), e % 32 == 31 && await new Promise((e)=>setTimeout(e, 0));
        }
        t.push("]");
    } else {
        let e = JSON.stringify(n);
        if (void 0 === e) throw Error(_("MIB snapshot cannot be serialized"));
        t.push(e);
    }
    return t.push("}"), new Blob(t, {
        type: "application/json"
    });
}
function rr(e) {
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
let ri = L.rpc.declare({
    object: "uci",
    method: "get",
    params: [
        "config",
        "type"
    ],
    reject: !0
}), rn = L.rpc.declare({
    object: "uci",
    method: "changes",
    params: [
        "config"
    ],
    reject: !0
}), ra = L.rpc.declare({
    object: "uci",
    method: "set",
    params: [
        "config",
        "section",
        "values"
    ],
    reject: !0
}), ro = L.rpc.declare({
    object: "uci",
    method: "delete",
    params: [
        "config",
        "section",
        "option"
    ],
    reject: !0
}), rs = L.rpc.declare({
    object: "uci",
    method: "commit",
    params: [
        "config"
    ],
    reject: !0
}), rl = !1;
async function rd(e, t, r) {
    if (!L.hasViewPermission() || !t || rl) return;
    let i = e.serial_number.toUpperCase(), n = t.desired[i], a = void 0 !== n, o = a ? n : e.onu_id, l = a ? _("Unpin interface") : _("Pin interface");
    try {
        var d, c, u, p, f, g, b, h, m, v, y, w, x, k, z, j;
        let { values: e } = await ri("fttr", "device"), t = (e)=>Object.entries(e).find((e)=>{
                let [, t] = e;
                return "device" === t[".type"] && t.optical_sn?.toUpperCase() === i;
            }), $ = t(e);
        if (!$) return void L.ui.showModal(l, (b = {
            children: [
                (d = {
                    children: _("Add this device on the configuration page before fixing its interface.")
                }, s("p", d)),
                (u = {
                    children: (c = {
                        children: i
                    }, s("code", c))
                }, s("p", u)),
                (g = {
                    class: "right",
                    children: [
                        (p = {
                            type: "button",
                            class: "cbi-button",
                            onclick: ()=>L.ui.hideModal(),
                            children: _("Cancel")
                        }, s("button", p)),
                        " ",
                        (f = {
                            class: "cbi-button cbi-button-action",
                            href: L.url("admin", "network", "fttr", "config"),
                            children: _("Configuration")
                        }, s("a", f))
                    ]
                }, s("div", g))
            ]
        }, s("div", b)));
        let S = (h = {
            class: "error",
            role: "alert"
        }, s("p", h)), C = (m = {
            type: "button",
            class: "cbi-button",
            onclick: ()=>L.ui.hideModal(),
            children: _("Cancel")
        }, s("button", m)), O = (v = {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: async ()=>{
                if (rl) return;
                rl = !0, O.disabled = C.disabled = !0, S.textContent = "";
                let e = !1;
                try {
                    var i;
                    if ((await rn("fttr")).changes.length) throw Error(_("Apply or discard pending FTTR configuration changes first."));
                    let l = (await ri("fttr", "device")).values, d = t(l);
                    if (!d || d[0] !== $[0] || d[1].onu_id !== $[1].onu_id || (null == d[1].onu_id ? void 0 : Number(d[1].onu_id)) !== n) throw Error(_("Interface configuration changed. Refresh the page and try again."));
                    if (!a && Object.entries(l).some((e)=>{
                        let [t, r] = e;
                        return t !== d[0] && "device" === r[".type"] && null != r.onu_id && Number(r.onu_id) === o;
                    })) throw Error(_("Interface already reserved by another device."));
                    a ? await ro("fttr", d[0], "onu_id") : await ra("fttr", d[0], {
                        onu_id: String(o)
                    }), await rs("fttr"), e = !0, await tF(), r(await tB()), L.ui.hideModal(), L.ui.addNotification(null, (i = {
                        children: _("Interface setting saved. Restart FTTR for it to take effect.")
                    }, s("p", i)), "info");
                } catch (t) {
                    S.textContent = `${e ? _("Saved, but configuration reload or status refresh failed:") : _("Failed to save interface setting:")} ${String(t)}`;
                } finally{
                    rl = !1, O.disabled = e, C.disabled = !1;
                }
            },
            children: _("Confirm")
        }, s("button", v));
        L.ui.showModal(l, (j = {
            children: [
                (y = {
                    children: a ? _("Cancel the fixed interface for this device?") : _("Fix this device to its current interface?")
                }, s("p", y)),
                (x = {
                    children: [
                        (w = {
                            children: i
                        }, s("code", w)),
                        ` \xb7 fttr${o + 1} \xb7 ONU-ID ${o}`
                    ]
                }, s("p", x)),
                (k = {
                    children: _("This saves the configuration only. The current allocation stays unchanged until FTTR is restarted.")
                }, s("p", k)),
                S,
                (z = {
                    class: "right",
                    children: [
                        C,
                        " ",
                        O
                    ]
                }, s("div", z))
            ]
        }, s("div", j)));
    } catch (e) {
        L.ui.addNotification(null, s("p", {
            children: String(e)
        }), "error");
    }
}
let rc = L.view, ru = L.Poll;
function rp(e, t) {
    var r, i, n;
    let a, l = e, d = s("button", {
        type: "button",
        class: "cbi-button cbi-button-neutral",
        style: "padding:0 .4em;min-height:1.5em;font-size:85%;margin-left:.5em",
        onclick: ()=>rd(l, a, t)
    }), c = s("span", {}), u = s("span", {}), p = s("span", {}), f = s("code", {
        style: "font-size:90%"
    }), g = s("span", {
        class: "fttr-badge"
    }), b = s("span", {
        class: "fttr-badge"
    }), h = s("span", {
        style: "font-size:90%"
    }), m = s("code", {
        style: "font-size:90%"
    }), v = s("span", {
        class: "fttr-badge"
    }), y = s("span", {
        class: "fttr-badge"
    }), w = s("span", {
        class: "fttr-badge"
    }), x = (n = {
        "data-fttr-onu-id": String(e.onu_id),
        children: [
            s("td", {
                children: [
                    c,
                    d
                ]
            }),
            s("td", {
                children: u
            }),
            s("td", {
                children: p
            }),
            s("td", {
                children: f
            }),
            s("td", {
                children: g
            }),
            s("td", {
                children: b
            }),
            s("td", {
                children: h
            }),
            s("td", {
                children: m
            }),
            s("td", {
                children: v
            }),
            s("td", {
                children: y
            }),
            s("td", {
                children: w
            }),
            (i = {
                style: "text-align:right",
                children: (r = {
                    type: "button",
                    class: "cbi-button cbi-button-neutral",
                    onclick: ()=>(function(e) {
                            var t, r, i, n, a, l, d, c, u, p, f, g;
                            let b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "basic", h = !1, m = !1, v = null, y = null, w = (t = {
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
                                                s(tw, {
                                                    state: e.state
                                                })
                                            ],
                                            [
                                                _("Business"),
                                                s(tk, {
                                                    status: e.business_status
                                                })
                                            ],
                                            [
                                                _("Receive optical power"),
                                                tf(e.optical_rx_power_dbm)
                                            ],
                                            [
                                                _("Transmit optical power"),
                                                tf(e.optical_tx_power_dbm)
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
                                                    let t = Math.floor(e), r = Math.floor(t / 86400), i = Math.floor(t % 86400 / 3600), n = Math.floor(t % 3600 / 60), a = [];
                                                    return r > 0 && a.push(`${r}d`), (i > 0 || r > 0) && a.push(`${i}h`), (n > 0 || i > 0 || r > 0) && a.push(`${n}m`), a.push(`${t % 60}s`), a.join(" ");
                                                }(e.uptime_seconds)} (${Math.floor(e.uptime_seconds)} s)`
                                            ]
                                        ]
                                    },
                                    {
                                        title: _("Management & cache"),
                                        rows: [
                                            [
                                                _("CWMP"),
                                                s(t$, {
                                                    management: e.management
                                                })
                                            ],
                                            [
                                                _("Last Inform"),
                                                e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
                                            ],
                                            [
                                                _("Provisioning"),
                                                s(tO, {
                                                    provisioning: e.provisioning
                                                })
                                            ],
                                            [
                                                _("Wi-Fi sync"),
                                                s(tE, {
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
                                    var t, r, i;
                                    return i = {
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
                                                        let [r, i] = e;
                                                        return t = {
                                                            children: [
                                                                s("th", {
                                                                    style: "width:35%",
                                                                    children: r
                                                                }),
                                                                s("td", {
                                                                    children: i instanceof Node ? i : t_(i)
                                                                })
                                                            ]
                                                        }, s("tr", t);
                                                    })
                                                }, s("tbody", t))
                                            }, s("table", r))
                                        ]
                                    }, s("div", i);
                                })
                            }, s("div", t)), x = (r = {
                                class: "mib-status-bar",
                                role: "status",
                                children: s("span", {
                                    class: "mib-hint-text",
                                    children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                                })
                            }, s("div", r)), k = (i = {
                                class: "cbi-progressbar",
                                style: "display:none;width:100%",
                                title: "0%",
                                children: s("div", {
                                    style: "width:0%"
                                })
                            }, s("div", i)), z = s("div", {}), j = s("pre", {
                                class: "onu-raw-pre"
                            }), $ = s("span", {
                                class: "download-status",
                                role: "status"
                            }), S = null, C = s("button", {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                disabled: !0,
                                onclick: async ()=>{
                                    if (v && !h) {
                                        C.disabled = !0, $.textContent = _("Preparing JSON download\u2026");
                                        try {
                                            let t = await rt(v);
                                            if (h) return;
                                            S && URL.revokeObjectURL(S), S = URL.createObjectURL(t);
                                            let r = document.createElement("a");
                                            r.href = S, r.download = `mib-${e.serial_number}.json`, r.click(), $.textContent = _("JSON download started"), window.setTimeout(()=>{
                                                URL.revokeObjectURL(r.href), S === r.href && (S = null);
                                            }, 1000);
                                        } catch (e) {
                                            $.textContent = String(e);
                                        } finally{
                                            C.disabled = !v || h;
                                        }
                                    }
                                },
                                children: _("Download JSON")
                            }), O = (a = {
                                class: "onu-raw-panel",
                                children: [
                                    (n = {
                                        class: "onu-raw-toolbar",
                                        children: [
                                            s("span", {
                                                class: "onu-raw-hint",
                                                children: _("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")
                                            }),
                                            s("div", {
                                                class: "onu-raw-actions",
                                                children: [
                                                    C,
                                                    $
                                                ]
                                            })
                                        ]
                                    }, s("div", n)),
                                    j
                                ]
                            }, s("div", a)), M = s("button", {
                                type: "button",
                                class: "cbi-button cbi-button-apply",
                                onclick: ()=>Z(!1),
                                children: _("Read MIB")
                            }), P = s("button", {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                onclick: ()=>Z(!0),
                                children: _("Read MIB and VLAN tables")
                            }), T = (c = {
                                class: "onu-mib-panel",
                                children: [
                                    (d = {
                                        class: "mib-controls",
                                        children: [
                                            (l = {
                                                class: "mib-action-group",
                                                children: [
                                                    M,
                                                    P,
                                                    s("small", {
                                                        class: "mib-action-hint",
                                                        children: _("Collecting VLAN tables queries extended filter tables and takes longer.")
                                                    })
                                                ]
                                            }, s("div", l)),
                                            x,
                                            k
                                        ]
                                    }, s("div", d)),
                                    z
                                ]
                            }, s("div", c)), N = {
                                basic: w,
                                mib: T,
                                raw: O
                            }, I = new Map();
                            function R(e) {
                                for (let [t, r] of Object.entries(N))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                                for (let [t, r] of I)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
                            }
                            let A = (u = {
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
                                        class: e.id === b ? "cbi-tab" : "cbi-tab-disabled",
                                        "data-tab": e.id,
                                        children: s("a", {
                                            href: `#tab-${e.id}`,
                                            onclick: (t)=>{
                                                t.preventDefault(), R(e.id);
                                            },
                                            children: e.label
                                        })
                                    }, s("li", t));
                                    return I.set(e.id, r), r;
                                })
                            }, s("ul", u)), D = (g = {
                                children: [
                                    s("div", {
                                        class: "onu-details-header",
                                        children: A
                                    }),
                                    (p = {
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
				${tL}
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
                                            w,
                                            T,
                                            O
                                        ]
                                    }, s("div", p)),
                                    (f = {
                                        class: "right onu-details-footer",
                                        children: s("button", {
                                            type: "button",
                                            class: "cbi-button",
                                            onclick: ()=>{
                                                h = !0, S && URL.revokeObjectURL(S), S = null, v = null, j.textContent = "", z.replaceChildren(), L.ui.hideModal();
                                            },
                                            children: _("Close")
                                        })
                                    }, s("div", f))
                                ]
                            }, s(o, g)), U = ()=>!h && D.isConnected && D.getClientRects().length > 0;
                            async function Z(t) {
                                if (!m) {
                                    m = !0, M.disabled = P.disabled = !0, k.style.display = "", k.title = "0%", k.firstElementChild.style.width = "0%", x.textContent = _("Reading MIB\u2026");
                                    try {
                                        let m = await tB(), w = m.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                        if (w?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                        if (!U()) return;
                                        let $ = await t6(w.onu_id, w.serial_number, t);
                                        y = $.job;
                                        let S = Date.now() + 140000;
                                        for(; U();){
                                            let e = await t7($.job, 0);
                                            if (!U()) return;
                                            if ("ready" === e.status) {
                                                var r, i, n, a, o, l, d, c, u, p, f, g, b, h;
                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                let t = new Uint8Array(e.bytes), m = 0;
                                                for(let r = 0; r < e.chunks; r++){
                                                    let i = 0 === r ? e : await t7($.job, r);
                                                    if (!U()) return;
                                                    if ("ready" !== i.status || i.chunk !== r || i.chunks !== e.chunks || i.bytes !== e.bytes || !i.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                    let n = atob(i.data);
                                                    if (n.length > 32768 || m + n.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                    for(let e = 0; e < n.length; e++)t[m++] = n.charCodeAt(e);
                                                    let a = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                                    k.title = `${a}%`, k.firstElementChild.style.width = `${a}%`, x.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                                }
                                                if (m !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                if (await B(), v = t1.parse(tI(JSON.parse(new TextDecoder("utf-8", {
                                                    fatal: !0
                                                }).decode(t)))).report, 1 !== v.schema_version || v.onu_id !== w.onu_id) throw Error(_("Unexpected MIB response"));
                                                k.style.display = "none", x.replaceChildren((r = v, f = {
                                                    class: "mib-chips",
                                                    children: [
                                                        (n = {
                                                            class: "mib-chip mib-chip-primary",
                                                            children: [
                                                                "ONU ",
                                                                r.onu_id
                                                            ]
                                                        }, s("span", n)),
                                                        (a = {
                                                            class: `mib-chip ${r.uploaded_complete ? "mib-chip-success" : "mib-chip-warning"}`,
                                                            children: r.uploaded_complete ? _("Upload complete") : _("Upload incomplete")
                                                        }, s("span", a)),
                                                        (o = {
                                                            class: "mib-chip mib-chip-info",
                                                            children: [
                                                                _("Records"),
                                                                ": ",
                                                                r.received_records,
                                                                r.expected_records !== r.received_records ? ` / ${r.expected_records}` : ""
                                                            ]
                                                        }, s("span", o)),
                                                        (l = {
                                                            class: "mib-chip",
                                                            children: [
                                                                _("Decoded"),
                                                                ": ",
                                                                r.decoded_records
                                                            ]
                                                        }, s("span", l)),
                                                        r.partial_records > 0 ? (d = {
                                                            class: "mib-chip mib-chip-warning",
                                                            children: [
                                                                _("Partial"),
                                                                ": ",
                                                                r.partial_records
                                                            ]
                                                        }, s("span", d)) : null,
                                                        (c = {
                                                            class: "mib-chip mib-chip-neutral",
                                                            children: [
                                                                _("Basic"),
                                                                ": ",
                                                                r.basic_records
                                                            ]
                                                        }, s("span", c)),
                                                        (u = {
                                                            class: "mib-chip",
                                                            children: r.tables_collected ? _("VLAN tables collected") : _("VLAN tables not collected")
                                                        }, s("span", u)),
                                                        (p = {
                                                            class: "mib-chip mib-chip-subtle",
                                                            children: new Date().toLocaleTimeString()
                                                        }, s("span", p))
                                                    ]
                                                }, s("div", f))), z.replaceChildren(function(e) {
                                                    var t, r, i, n, a, o;
                                                    let l = e.classes.length ? e.classes[0].class_id : null, d = (t = {
                                                        class: "mib-content"
                                                    }, s("div", t)), c = (r = {
                                                        type: "search",
                                                        class: "cbi-input-text mib-search-input",
                                                        placeholder: _("Search ME name or Class ID\u2026")
                                                    }, s("input", r)), u = (i = {
                                                        class: "mib-class-list"
                                                    }, s("div", i)), p = new Map();
                                                    function f(t) {
                                                        var r, i;
                                                        for (let [e, r] of (l = t, p))e === t ? r.classList.add("active") : r.classList.remove("active");
                                                        let n = e.entities.filter((e)=>e.class_id === t);
                                                        n.length ? d.replaceChildren(...n.map((r, i)=>{
                                                            var n, a, o, l, d, c, u, p, f, g, b, h, m, v, y, w, x, k, z;
                                                            return z = {
                                                                open: 0 === i,
                                                                class: "mib-entity-details",
                                                                children: [
                                                                    (d = {
                                                                        class: "mib-entity-summary",
                                                                        children: [
                                                                            (o = {
                                                                                class: "mib-entity-title",
                                                                                children: [
                                                                                    (n = {
                                                                                        children: t_(r.name)
                                                                                    }, s("strong", n)),
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
                                                                            }, s("span", o)),
                                                                            (l = {
                                                                                class: "mib-entity-support",
                                                                                children: r.support
                                                                            }, s("span", l))
                                                                        ]
                                                                    }, s("summary", d)),
                                                                    (k = {
                                                                        class: "mib-entity-body",
                                                                        children: [
                                                                            r.attributes.length ? (m = {
                                                                                class: "table mib-attributes-table",
                                                                                children: [
                                                                                    (b = {
                                                                                        children: (g = {
                                                                                            children: [
                                                                                                (c = {
                                                                                                    style: "width:28%",
                                                                                                    children: _("Attribute")
                                                                                                }, s("th", c)),
                                                                                                (u = {
                                                                                                    style: "width:14%",
                                                                                                    children: _("Type")
                                                                                                }, s("th", u)),
                                                                                                (p = {
                                                                                                    children: _("Value")
                                                                                                }, s("th", p)),
                                                                                                (f = {
                                                                                                    style: "width:18%",
                                                                                                    children: _("Definition")
                                                                                                }, s("th", f))
                                                                                            ]
                                                                                        }, s("tr", g))
                                                                                    }, s("thead", b)),
                                                                                    (h = {
                                                                                        children: r.attributes.map((e)=>{
                                                                                            var t, r, i, n, a, o, l, d, c, u;
                                                                                            return u = {
                                                                                                children: [
                                                                                                    (t = {
                                                                                                        class: "mib-attr-name",
                                                                                                        children: e.definition.name
                                                                                                    }, s("td", t)),
                                                                                                    (i = {
                                                                                                        class: "mib-attr-kind",
                                                                                                        children: (r = {
                                                                                                            children: e.definition.kind
                                                                                                        }, s("code", r))
                                                                                                    }, s("td", i)),
                                                                                                    (d = {
                                                                                                        class: "mib-attr-value",
                                                                                                        children: [
                                                                                                            (n = {
                                                                                                                class: "mib-val-display",
                                                                                                                children: function(e) {
                                                                                                                    if (null === e) return _("Conflicting values; inspect observations");
                                                                                                                    switch(e.type){
                                                                                                                        case "unsigned":
                                                                                                                        case "signed":
                                                                                                                        case "decimal":
                                                                                                                        case "text":
                                                                                                                            return t_(e.value);
                                                                                                                        case "octets":
                                                                                                                            return t_(e.hex);
                                                                                                                        case "table_length":
                                                                                                                            return t_(e.bytes);
                                                                                                                        default:
                                                                                                                            throw new tN("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                                    }
                                                                                                                }(e.value)
                                                                                                            }, s("span", n)),
                                                                                                            e.observations?.length ? (l = {
                                                                                                                class: "mib-obs-details",
                                                                                                                children: [
                                                                                                                    (a = {
                                                                                                                        children: _("Raw data / observations")
                                                                                                                    }, s("summary", a)),
                                                                                                                    (o = {
                                                                                                                        class: "mib-pre",
                                                                                                                        children: re(e.observations)
                                                                                                                    }, s("pre", o))
                                                                                                                ]
                                                                                                            }, s("details", l)) : null
                                                                                                        ]
                                                                                                    }, s("td", d)),
                                                                                                    (c = {
                                                                                                        class: "mib-attr-ref",
                                                                                                        children: rr(e.definition)
                                                                                                    }, s("td", c))
                                                                                                ]
                                                                                            }, s("tr", u);
                                                                                        })
                                                                                    }, s("tbody", h))
                                                                                ]
                                                                            }, s("table", m)) : (v = {
                                                                                children: _("Basic display only; raw records are preserved.")
                                                                            }, s("p", v)),
                                                                            e.tables.filter((e)=>e.class_id === t && e.entity_id === r.entity_id).map((e)=>{
                                                                                var t, r, i, n, a, o, l, d, c, u, p, f, g, b, h, m;
                                                                                return m = {
                                                                                    class: "mib-table-details",
                                                                                    children: [
                                                                                        (t = {
                                                                                            children: [
                                                                                                e.attribute.name,
                                                                                                " \xb7",
                                                                                                " ",
                                                                                                e.collected ? `${e.rows.length} ${_("rows")}` : t_(e.error)
                                                                                            ]
                                                                                        }, s("summary", t)),
                                                                                        e.vlan_rules.length ? (g = {
                                                                                            class: "mib-table-overflow",
                                                                                            children: (f = {
                                                                                                class: "table",
                                                                                                children: [
                                                                                                    (u = {
                                                                                                        children: (c = {
                                                                                                            children: [
                                                                                                                (r = {
                                                                                                                    children: _("Outer filter (priority / VID / TPID-DEI)")
                                                                                                                }, s("th", r)),
                                                                                                                (i = {
                                                                                                                    children: _("Inner filter (priority / VID / TPID-DEI)")
                                                                                                                }, s("th", i)),
                                                                                                                (n = {
                                                                                                                    children: _("EtherType code")
                                                                                                                }, s("th", n)),
                                                                                                                (a = {
                                                                                                                    children: _("Remove tags")
                                                                                                                }, s("th", a)),
                                                                                                                (o = {
                                                                                                                    children: _("Outer treatment (priority / VID / TPID-DEI)")
                                                                                                                }, s("th", o)),
                                                                                                                (l = {
                                                                                                                    children: _("Inner treatment (priority / VID / TPID-DEI)")
                                                                                                                }, s("th", l)),
                                                                                                                (d = {
                                                                                                                    children: _("Delete entry")
                                                                                                                }, s("th", d))
                                                                                                            ]
                                                                                                        }, s("tr", c))
                                                                                                    }, s("thead", u)),
                                                                                                    (p = {
                                                                                                        children: e.vlan_rules.map((e)=>{
                                                                                                            var t, r, i, n, a, o, l, d;
                                                                                                            return d = {
                                                                                                                children: [
                                                                                                                    (t = {
                                                                                                                        children: `${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`
                                                                                                                    }, s("td", t)),
                                                                                                                    (r = {
                                                                                                                        children: `${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`
                                                                                                                    }, s("td", r)),
                                                                                                                    (i = {
                                                                                                                        children: t_(e.filter_ethertype)
                                                                                                                    }, s("td", i)),
                                                                                                                    (n = {
                                                                                                                        children: t_(e.tags_to_remove)
                                                                                                                    }, s("td", n)),
                                                                                                                    (a = {
                                                                                                                        children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                                    }, s("td", a)),
                                                                                                                    (o = {
                                                                                                                        children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                                    }, s("td", o)),
                                                                                                                    (l = {
                                                                                                                        children: t_(e.delete_entry)
                                                                                                                    }, s("td", l))
                                                                                                                ]
                                                                                                            }, s("tr", d);
                                                                                                        })
                                                                                                    }, s("tbody", p))
                                                                                                ]
                                                                                            }, s("table", f))
                                                                                        }, s("div", g)) : null,
                                                                                        (b = {
                                                                                            style: "margin-top:6px",
                                                                                            children: [
                                                                                                _("G.988 encoded field values"),
                                                                                                ": ",
                                                                                                rr(e.attribute)
                                                                                            ]
                                                                                        }, s("p", b)),
                                                                                        (h = {
                                                                                            class: "mib-pre",
                                                                                            children: re(e.vlan_rules.length ? e.vlan_rules : e.rows)
                                                                                        }, s("pre", h))
                                                                                    ]
                                                                                }, s("details", m);
                                                                            }),
                                                                            (x = {
                                                                                class: "mib-diag-details",
                                                                                children: [
                                                                                    (y = {
                                                                                        children: _("Records / diagnostics")
                                                                                    }, s("summary", y)),
                                                                                    (w = {
                                                                                        class: "mib-pre",
                                                                                        children: re({
                                                                                            diagnostics: r.diagnostics,
                                                                                            records: e.records.filter((e)=>e.class_id === t && e.entity_id === r.entity_id)
                                                                                        })
                                                                                    }, s("pre", w))
                                                                                ]
                                                                            }, s("details", x))
                                                                        ]
                                                                    }, s("div", k))
                                                                ]
                                                            }, s("details", z);
                                                        })) : d.replaceChildren((i = {
                                                            class: "mib-empty-content",
                                                            children: (r = {
                                                                children: _("No entities recorded for this ME class.")
                                                            }, s("p", r))
                                                        }, s("div", i)));
                                                    }
                                                    function g() {
                                                        var t;
                                                        let r = c.value.trim().toLowerCase();
                                                        p.clear();
                                                        let i = e.classes.filter((e)=>`${e.class_id} ${e.name ?? ""}`.toLowerCase().includes(r));
                                                        i.length ? u.replaceChildren(...i.map((e)=>{
                                                            var t, r, i, n;
                                                            let a = (n = {
                                                                type: "button",
                                                                class: `mib-class-btn${e.class_id === l ? " active" : ""}`,
                                                                onclick: ()=>f(e.class_id),
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
                                                                    (i = {
                                                                        class: "mib-class-count",
                                                                        children: e.entities
                                                                    }, s("span", i))
                                                                ]
                                                            }, s("button", n));
                                                            return p.set(e.class_id, a), a;
                                                        })) : u.replaceChildren((t = {
                                                            class: "mib-empty-list",
                                                            children: _("No matching ME classes")
                                                        }, s("div", t)));
                                                    }
                                                    return c.addEventListener("input", g), g(), e.classes.length && f(e.classes[0].class_id), o = {
                                                        class: "mib-browser",
                                                        children: [
                                                            (a = {
                                                                class: "mib-sidebar",
                                                                children: [
                                                                    (n = {
                                                                        class: "mib-search-box",
                                                                        children: c
                                                                    }, s("div", n)),
                                                                    u
                                                                ]
                                                            }, s("div", a)),
                                                            d
                                                        ]
                                                    }, s("div", o);
                                                }(v), (h = {
                                                    class: "mib-upload-diagnostics",
                                                    children: [
                                                        (g = {
                                                            children: _("Upload diagnostics")
                                                        }, s("summary", g)),
                                                        (b = {
                                                            class: "mib-pre",
                                                            children: re(v.diagnostics)
                                                        }, s("pre", b))
                                                    ]
                                                }, s("details", h))), i = v, j.textContent = re({
                                                    schema_version: i.schema_version,
                                                    reference_version: i.reference_version,
                                                    onu_id: i.onu_id,
                                                    uploaded_complete: i.uploaded_complete,
                                                    expected_records: i.expected_records,
                                                    received_records: i.received_records,
                                                    decoded_records: i.decoded_records,
                                                    partial_records: i.partial_records,
                                                    basic_records: i.basic_records,
                                                    tables_requested: i.tables_requested,
                                                    tables_collected: i.tables_collected,
                                                    class_count: i.classes.length,
                                                    classes: i.classes.slice(0, 25),
                                                    additional_classes: Math.max(0, i.classes.length - 25),
                                                    record_count: i.records.length,
                                                    first_record: i.records[0] ?? null,
                                                    table_count: i.tables.length,
                                                    diagnostics_count: i.diagnostics.length
                                                }), C.disabled = !1;
                                                return;
                                            }
                                            if (e.progress) {
                                                let { phase: t, received: r, expected: i } = e.progress;
                                                if (x.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == i ? "" : `: ${r}/${i}`}` : null == i ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${i}`, i && i > 0) {
                                                    let e = Math.min(100, Math.round(r / i * 100));
                                                    k.title = `${e}%`, k.firstElementChild.style.width = `${e}%`;
                                                }
                                            }
                                            if (Date.now() >= S) throw Error(_("MIB query timed out; retry."));
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
                                        await B(), m = !1, M.disabled = P.disabled = !1;
                                    }
                                }
                            }
                            async function B() {
                                if (!y) return;
                                let e = y;
                                y = null;
                                try {
                                    await t9(e);
                                } catch (e) {
                                    console.warn("Failed to release MIB snapshot", e);
                                }
                            }
                            R(b), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, D, "modal-wide");
                        })(l),
                    children: _("Details")
                }, s("button", r))
            }, s("td", i))
        ]
    }, s("tr", n));
    x.addEventListener("mouseenter", ()=>{
        let e = l.data_path?.interface;
        if (e) {
            let t = e.match(/fttr(\d+)/);
            if (t) {
                let e = document.querySelector(`[data-fttr-port="${t[1]}"]`);
                e?.classList.add("fttr-port-highlight");
            }
        }
    }), x.addEventListener("mouseleave", ()=>{
        document.querySelectorAll(".fttr-port-highlight").forEach((e)=>{
            e.classList.remove("fttr-port-highlight");
        });
    });
    let k = {
        element: x,
        update (e, t) {
            l = e, a = t;
            let r = e.serial_number.toUpperCase(), i = t?.desired[r];
            d.textContent = void 0 !== i ? _("Unpin") : _("Pin"), d.hidden = !t, d.disabled = !L.hasViewPermission(), d.title = i !== t?.active[r] ? _("Pending restart") : void 0 !== i ? _("Fixed interface") : _("Pin interface"), x.setAttribute("data-fttr-onu-id", String(e.onu_id)), c.textContent = String(e.onu_id), u.textContent = t_(e.vendor), p.textContent = t_(e.identity?.equipment_id ?? e.model), f.textContent = t_(e.serial_number);
            let n = ty(e.state);
            tm(g, n.tone, n.label, n.title);
            let o = tx(e.business_status);
            tm(b, o.tone, o.label, o.title);
            let s = function(e) {
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
            }(e.firmware_version || e.identity?.software_images?.join("; "));
            h.textContent = s.display, s.full ? h.setAttribute("title", s.full) : h.removeAttribute("title"), m.textContent = t_(e.data_path?.interface);
            let k = tj(e.management);
            tm(v, k.tone, k.label, k.title);
            let z = tC(e.provisioning);
            tm(y, z.tone, z.label, z.title);
            let j = tP(e.wifi_sync);
            tm(w, j.tone, j.label, j.title);
        }
    };
    return k.update(e), k;
}
let r_ = null, rf = null, rg = !1;
const main = rc.extend({
    async load () {
        let [e, t] = await Promise.all([
            tB(),
            tq().catch((e)=>(console.warn("Failed to load network device details", e), {}))
        ]);
        return {
            status: e,
            devices: t
        };
    },
    render (e) {
        var t, r, i, n, a, o, l, d, c, u, p, f, g, b;
        let h, m, v, y, w, x, k, z, j, $, S, C, O, M, P;
        return t = e.status, r = e.devices, h = t.optical_transceiver ?? {}, m = r, v = function(e, t) {
            var r, i, n, a, o;
            let l = new Map();
            for (let r of e)l.set(r.onu_id, rp(r, t));
            let d = (r = {
                children: s("td", {
                    colSpan: 12,
                    children: _("No registered sub-gateways.")
                })
            }, s("tr", r)), c = 0 === e.length, u = s("tbody", {
                children: c ? d : [
                    ...l.values()
                ].map((e)=>e.element)
            });
            return {
                element: (o = {
                    class: "table-wrapper",
                    children: (a = {
                        class: "table",
                        children: [
                            (n = {
                                children: (i = {
                                    children: [
                                        s("th", {
                                            children: _("ONU ID")
                                        }),
                                        s("th", {
                                            children: _("Vendor")
                                        }),
                                        s("th", {
                                            children: _("Model")
                                        }),
                                        s("th", {
                                            children: _("Optical serial")
                                        }),
                                        s("th", {
                                            children: _("Registration")
                                        }),
                                        s("th", {
                                            children: _("Business")
                                        }),
                                        s("th", {
                                            children: _("Firmware")
                                        }),
                                        s("th", {
                                            children: _("Data interface")
                                        }),
                                        s("th", {
                                            children: _("CWMP")
                                        }),
                                        s("th", {
                                            children: _("Synchronization")
                                        }),
                                        s("th", {
                                            children: _("Wi-Fi sync")
                                        }),
                                        s("th", {
                                            style: "text-align:right",
                                            children: _("Details")
                                        })
                                    ]
                                }, s("tr", i))
                            }, s("thead", n)),
                            u
                        ]
                    }, s("table", a))
                }, s("div", o)),
                update (e, r) {
                    let i = new Set(e.map((e)=>e.onu_id));
                    for (let [e, t] of l)i.has(e) || (t.element.remove(), l.delete(e));
                    if (0 === e.length) {
                        c || u.append(d), c = !0;
                        return;
                    }
                    for (let [i, n] of (c && (d.remove(), c = !1), e.entries())){
                        let e = l.get(n.onu_id);
                        e || (e = rp(n, t), l.set(n.onu_id, e)), e.update(n, r);
                        let a = u.children.item(i);
                        a !== e.element && u.insertBefore(e.element, a);
                    }
                }
            };
        }(t.sub_gateways ?? [], (e)=>P(e, m)), y = Array.from({
            length: 16
        }, (e, t)=>{
            var r, i, n, a, o, l, d, c, u, p, f, g, b, h, m, v, y, w;
            let x, k, z, j, $, S, C, O, M, P, T, N, I, R, A, D, U, Z, B;
            return r = t + 1, x = s("span", {}), k = s("span", {
                style: "display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:90%",
                children: _("Unknown")
            }), z = s("img", {
                src: "/luci-static/resources/icons/port_down.svg",
                alt: "",
                "aria-hidden": "true"
            }), j = s("div", {
                style: "flex:1;height:3px;opacity:0.25;background-color:rgb(240, 144, 144)"
            }), $ = s("span", {}), S = s("span", {}), C = s("span", {}), O = s("span", {}), M = s("span", {}), P = s("span", {}), T = s("span", {}), N = s("span", {}), I = s("span", {}), R = s("span", {}), A = s("span", {}), D = s("span", {}), U = s("span", {}), Z = s("span", {}), (w = {
                class: "ifacebox fttr-port-card",
                "data-fttr-port": String(r),
                style: "box-sizing:border-box;margin:0;cursor:pointer",
                children: [
                    s("div", {
                        class: "ifacebox-head fttr-port-name",
                        style: "font-weight:bold",
                        children: x
                    }),
                    s("div", {
                        class: "ifacebox-body fttr-port-identity",
                        children: [
                            z,
                            k
                        ]
                    }),
                    (n = {
                        class: "ifacebox-head cbi-tooltip-container",
                        style: "display:flex",
                        children: [
                            j,
                            (i = {
                                class: "cbi-tooltip left",
                                children: [
                                    s("strong", {
                                        children: [
                                            _("Port status"),
                                            ": "
                                        ]
                                    }),
                                    $,
                                    s("br", {}),
                                    s("strong", {
                                        children: [
                                            _("ONU"),
                                            ": "
                                        ]
                                    }),
                                    S,
                                    s("br", {}),
                                    s("strong", {
                                        children: [
                                            _("MAC address"),
                                            ": "
                                        ]
                                    }),
                                    C
                                ]
                            }, s("span", i))
                        ]
                    }, s("div", n)),
                    (y = {
                        class: "ifacebox-body",
                        children: (v = {
                            class: "cbi-tooltip-container fttr-port-stats",
                            style: "display:flex;flex-direction:column;align-items:center;font-size:80%;line-height:1.4;cursor:pointer;width:100%",
                            children: [
                                (a = {
                                    style: "display:flex;flex-direction:column;align-items:center",
                                    children: [
                                        s("div", {
                                            style: "white-space:nowrap",
                                            children: [
                                                "\u25B2\u202F",
                                                O
                                            ]
                                        }),
                                        s("div", {
                                            style: "white-space:nowrap",
                                            children: [
                                                "\u25BC\u202F",
                                                M
                                            ]
                                        })
                                    ]
                                }, s("div", a)),
                                (m = {
                                    class: "cbi-tooltip",
                                    children: (h = {
                                        children: [
                                            (o = {
                                                class: "nowrap",
                                                children: [
                                                    s("strong", {
                                                        children: [
                                                            _("Received bytes"),
                                                            ": "
                                                        ]
                                                    }),
                                                    P
                                                ]
                                            }, s("span", o)),
                                            s("br", {}),
                                            (l = {
                                                class: "nowrap",
                                                children: [
                                                    s("strong", {
                                                        children: [
                                                            _("Received packets"),
                                                            ": "
                                                        ]
                                                    }),
                                                    T
                                                ]
                                            }, s("span", l)),
                                            s("br", {}),
                                            (d = {
                                                class: "nowrap",
                                                children: [
                                                    s("strong", {
                                                        children: [
                                                            _("Received multicast"),
                                                            ": "
                                                        ]
                                                    }),
                                                    N
                                                ]
                                            }, s("span", d)),
                                            s("br", {}),
                                            (c = {
                                                class: "nowrap",
                                                children: [
                                                    s("strong", {
                                                        children: [
                                                            _("Receive errors"),
                                                            ": "
                                                        ]
                                                    }),
                                                    I
                                                ]
                                            }, s("span", c)),
                                            s("br", {}),
                                            (u = {
                                                class: "nowrap",
                                                children: [
                                                    s("strong", {
                                                        children: [
                                                            _("Receive dropped"),
                                                            ": "
                                                        ]
                                                    }),
                                                    R
                                                ]
                                            }, s("span", u)),
                                            s("br", {}),
                                            (p = {
                                                class: "nowrap",
                                                children: [
                                                    s("strong", {
                                                        children: [
                                                            _("Transmitted bytes"),
                                                            ": "
                                                        ]
                                                    }),
                                                    A
                                                ]
                                            }, s("span", p)),
                                            s("br", {}),
                                            (f = {
                                                class: "nowrap",
                                                children: [
                                                    s("strong", {
                                                        children: [
                                                            _("Transmitted packets"),
                                                            ": "
                                                        ]
                                                    }),
                                                    D
                                                ]
                                            }, s("span", f)),
                                            s("br", {}),
                                            (g = {
                                                class: "nowrap",
                                                children: [
                                                    s("strong", {
                                                        children: [
                                                            _("Transmit errors"),
                                                            ": "
                                                        ]
                                                    }),
                                                    U
                                                ]
                                            }, s("span", g)),
                                            s("br", {}),
                                            (b = {
                                                class: "nowrap",
                                                children: [
                                                    s("strong", {
                                                        children: [
                                                            _("Transmit dropped"),
                                                            ": "
                                                        ]
                                                    }),
                                                    Z
                                                ]
                                            }, s("span", b))
                                        ]
                                    }, s("span", h))
                                }, s("span", m))
                            ]
                        }, s("div", v))
                    }, s("div", y))
                ]
            }, B = s("div", w)).addEventListener("mouseenter", ()=>{
                let e = B.getAttribute("data-active-onu-id");
                if (e) {
                    let t = document.querySelector(`[data-fttr-onu-id="${e}"]`);
                    t?.classList.add("fttr-row-highlight");
                }
            }), B.addEventListener("mouseleave", ()=>{
                document.querySelectorAll(".fttr-row-highlight").forEach((e)=>{
                    e.classList.remove("fttr-row-highlight");
                });
            }), B.addEventListener("click", ()=>{
                let e = B.getAttribute("data-active-onu-id");
                if (e) {
                    let t = document.querySelector(`[data-fttr-onu-id="${e}"]`);
                    t && (t.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    }), t.classList.add("fttr-row-highlight"), window.setTimeout(()=>t.classList.remove("fttr-row-highlight"), 1500));
                }
            }), {
                element: B,
                update (e, t) {
                    var i;
                    let n = (e.switch_ports ?? []).find((e)=>e.port === r), a = n?.interface ?? `fttr${r}`, o = t[a], s = o?.stats, l = n?.carrier ?? o?.carrier ?? (o?.link?.speed !== void 0 || void 0), d = (e.sub_gateways ?? []).find((e)=>e.onu_id === n?.onu_id), c = !0 === l, u = s?.rx_bytes, p = s?.tx_bytes;
                    n?.onu_id !== void 0 ? B.setAttribute("data-active-onu-id", String(n.onu_id)) : B.removeAttribute("data-active-onu-id"), c ? (B.classList.add("port-up"), B.classList.remove("port-down")) : (B.classList.add("port-down"), B.classList.remove("port-up")), x.textContent = a, z.setAttribute("src", `/luci-static/resources/icons/${c ? "port_up.svg" : "port_down.svg"}`), k.textContent = c ? o?.link?.speed !== void 0 ? void 0 === (i = o.link.speed) || !Number.isFinite(i) || i <= 0 ? _("Unknown") : i >= 1000 ? `${i / 1000}\u{202F}GbE` : `${i}\u{202F}MbE` : _("Connected") : !1 === l ? _("Disconnected") : _("Unknown"), k.setAttribute("title", _("\u901F\u5EA6\uFF1A%s Mbit/s\uFF0C\u53CC\u5DE5\uFF1A%s").format(t_(o?.link?.speed), t_(o?.link?.duplex))), j.style.opacity = c ? "1" : "0.25", j.style.backgroundColor = c ? "rgb(46, 204, 113)" : "rgba(200, 200, 200, 0.4)", $.textContent = t_((n?.reserved_sn && void 0 === n.onu_id ? _("Reserved (offline)") : n?.link_state) ?? n?.status ?? (o ? l ? _("Link up") : _("Link down") : _("Unavailable"))), n?.reserved_sn && void 0 !== n.onu_id && ($.textContent += ` \xb7 ${_("Fixed interface")}`), S.textContent = t_(n?.onu_sn ?? d?.serial_number ?? n?.reserved_sn ?? n?.onu_id), B.title = n?.reserved_sn ? `${_("Reserved")}: ${n.reserved_sn}` : "", C.textContent = t_(o?.mac), O.textContent = c || p ? tg(p) : "\u2014", M.textContent = c || u ? tg(u) : "\u2014", P.textContent = tg(u), T.textContent = tb(s?.rx_packets), N.textContent = tb(s?.rx_multicast ?? s?.multicast), I.textContent = tb(s?.rx_errors), R.textContent = tb(s?.rx_dropped), A.textContent = tg(p), D.textContent = tb(s?.tx_packets), U.textContent = tb(s?.tx_errors), Z.textContent = tb(s?.tx_dropped);
                }
            };
        }), w = s("span", {
            class: "fttr-badge"
        }), x = s("span", {
            class: "fttr-badge fttr-badge-info"
        }), k = s("code", {
            style: "font-size:90%"
        }), z = s("span", {
            class: "fttr-badge fttr-badge-danger",
            style: "margin-left:.5em"
        }), o = {
            "data-provisioning-summary": "true",
            style: "display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%",
            children: [
                (i = {
                    children: [
                        s("strong", {
                            style: "margin-right:.4em",
                            children: [
                                _("Provisioning"),
                                ":"
                            ]
                        }),
                        w
                    ]
                }, s("span", i)),
                (n = {
                    children: [
                        s("span", {
                            style: "color:#888;margin-right:.3em",
                            children: [
                                _("Mode"),
                                ":"
                            ]
                        }),
                        x
                    ]
                }, s("span", n)),
                (a = {
                    children: [
                        s("span", {
                            style: "color:#888;margin-right:.3em",
                            children: [
                                _("Revision"),
                                ":"
                            ]
                        }),
                        k
                    ]
                }, s("span", a)),
                z
            ]
        }, j = s("div", o), $ = s("span", {
            class: "fttr-badge"
        }), S = s("span", {
            children: t_(h.model)
        }), C = s("span", {
            class: "fttr-badge"
        }), O = s("p", {
            role: "status"
        }), b = {
            class: "cbi-map fttr-overview",
            children: [
                s("style", {
                    children: `
				.fttr-overview {
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
					.fttr-overview {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .fttr-overview,
				[data-theme="dark"] .fttr-overview {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-danger-color: #e74c3c;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				${tL}

				.fttr-overview .fttr-ports-grid {
					display: grid;
					grid-template-columns: repeat(8, 100px);
					gap: 8px;
					margin-bottom: 1em;
					margin-inline: auto;
					width: fit-content;
					max-width: 100%;
				}

				@media (max-width: 1100px) {
					.fttr-overview .fttr-ports-grid {
						grid-template-columns: repeat(4, 100px);
					}
				}

				@media (max-width: 520px) {
					.fttr-overview .fttr-ports-grid {
						grid-template-columns: repeat(2, 100px);
					}
				}

				.fttr-overview .fttr-port-card {
					box-sizing: border-box;
					width: 100px;
					margin: 0;
					cursor: pointer;
					text-align: center;
					transition: opacity 0.2s, box-shadow 0.2s, transform 0.2s;
				}

				.fttr-overview .fttr-port-name {
					text-align: center;
				}

				.fttr-overview .fttr-port-identity {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.fttr-overview .fttr-port-identity > span {
					text-align: center;
				}

				.fttr-overview .fttr-port-stats {
					display: flex !important;
					flex-direction: column !important;
					align-items: center;
					font-size: 80%;
					line-height: 1.4;
					width: 100%;
					box-sizing: border-box;
				}

				.fttr-overview .fttr-port-stats > div {
					white-space: nowrap;
				}

				.fttr-overview .fttr-port-card.port-down {
					opacity: 0.65;
				}

				.fttr-overview .fttr-port-card.port-down:hover {
					opacity: 1 !important;
				}

				.fttr-overview .fttr-row-highlight {
					background-color: rgba(52, 152, 219, 0.12) !important;
					outline: 1px solid rgba(52, 152, 219, 0.4);
				}

				.fttr-overview .fttr-port-highlight {
					box-shadow: 0 0 0 2px #3498db !important;
					transform: translateY(-2px);
				}

				.fttr-overview table.table th {
					white-space: nowrap;
					padding: 0.5em 0.7em;
				}

				.fttr-overview table.table td {
					white-space: nowrap;
					padding: 0.5em 0.7em;
					vertical-align: middle;
				}
				`
                }),
                s("h2", {
                    children: _("FTTR overview")
                }),
                j,
                O,
                (p = {
                    class: "cbi-section",
                    children: [
                        s("h3", {
                            children: _("Controller")
                        }),
                        (u = {
                            class: "table",
                            children: (c = {
                                children: [
                                    (l = {
                                        children: [
                                            s("th", {
                                                style: "width:15%",
                                                children: _("FPGA status")
                                            }),
                                            s("td", {
                                                style: "width:35%",
                                                children: $
                                            }),
                                            s("th", {
                                                style: "width:15%",
                                                children: _("CDR lock")
                                            }),
                                            s("td", {
                                                style: "width:35%",
                                                children: C
                                            })
                                        ]
                                    }, s("tr", l)),
                                    (d = {
                                        children: [
                                            s("th", {
                                                children: _("Optical module")
                                            }),
                                            s("td", {
                                                colSpan: 3,
                                                children: S
                                            })
                                        ]
                                    }, s("tr", d))
                                ]
                            }, s("tbody", c))
                        }, s("table", u))
                    ]
                }, s("div", p)),
                (f = {
                    class: "cbi-section",
                    children: [
                        s("h3", {
                            children: _("Sub-gateways")
                        }),
                        v.element
                    ]
                }, s("div", f)),
                (g = {
                    class: "cbi-section",
                    children: [
                        s("h3", {
                            children: _("Downstream ports")
                        }),
                        s("div", {
                            class: "fttr-ports-grid",
                            children: y.map((e)=>e.element)
                        })
                    ]
                }, s("div", g))
            ]
        }, M = s("div", b), (P = (e, t)=>{
            m = t;
            let r = e.optical_transceiver, i = e.provisioning, n = e.onu_pinning;
            for (let a of (O.textContent = n ? [
                n.allocation_blocked ? _("ONU allocation blocked by invalid startup configuration.") : "",
                n.pending_restart ? _("Fixed interface changes pending FTTR restart.") : "",
                n.startup_error || n.config_error || ""
            ].filter(Boolean).join(" ") : "", O.hidden = !O.textContent, i ? (tm(w, i.enabled ? "success" : "neutral", i.enabled ? _("Enabled") : _("Disabled")), x.textContent = t_(i.mode), k.textContent = t_(i.revision), i.error ? (z.textContent = i.error, z.style.display = "") : z.style.display = "none", j.style.display = "") : j.textContent = _("Provisioning status unavailable"), "ready" === e.fpga_status ? tm($, "success", _("Ready")) : e.fpga_status ? tm($, "neutral", t_(e.fpga_status)) : tm($, "none", "\u2014"), S.textContent = t_(r.model), null == r.cdr_locked ? tm(C, "none", _("Unknown")) : r.cdr_locked ? tm(C, "success", _("Locked")) : tm(C, "warning", _("Unlocked")), v.update(e.sub_gateways ?? [], e.onu_pinning), y))a.update(e, t);
        })(t, r), r_ = (rf = {
            element: M,
            update: P
        }).element, ru.add(async ()=>{
            if (rg || !r_?.isConnected || !rf) return;
            let e = rf;
            rg = !0;
            try {
                let [t, r] = await Promise.all([
                    tB(),
                    tq().catch(()=>({}))
                ]);
                rf === e && e.element.isConnected && e.update(t, r);
            } catch (e) {
                console.error("Failed to refresh FTTR status", e);
            } finally{
                rg = !1;
            }
        }, 10), r_;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;