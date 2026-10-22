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
const o = Symbol.for("jsx.fragment");
function s(e, t) {
    let { children: r, ...n } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, i = function e(t) {
        let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let n of t)null != n && "boolean" != typeof n && (Array.isArray(n) ? e(n, r) : r.push(n instanceof Node ? n : String(n)));
        return r;
    }(null == r ? [] : Array.isArray(r) ? r : [
        r
    ]);
    if (e === o) {
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
    let a = {}, s = {
        ...n
    };
    for (let [e, t] of Object.entries(s))e.startsWith("on") && "function" == typeof t ? (a[e] = t, delete s[e]) : "boolean" == typeof t && (t ? s[e] = e : delete s[e]);
    let l = Object.keys(s).length > 0 ? i.length > 1 ? E(e, s, i) : E(e, s, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
    for (let [e, t] of Object.entries(a)){
        let r = e.slice(2).toLowerCase();
        l.addEventListener(r, t);
    }
    return l;
}
function l(e, t, r) {
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
class d extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const c = {};
function p(e) {
    return e && Object.assign(c, e), c;
}
function u(e, t) {
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
function b(e) {
    let t = +!!e.startsWith("^"), r = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, r);
}
const g = Symbol("evaluating");
function h(e, t, r) {
    let n;
    Object.defineProperty(e, t, {
        get () {
            if (n !== g) return void 0 === n && (n = g, n = r()), n;
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
function $(e, t, r) {
    let n = new e._zod.constr(t ?? e._zod.def);
    return (!t || r?.parent) && (n._zod.parent = e), n;
}
function j(e) {
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
function O(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let r = t; r < e.issues.length; r++)if (e.issues[r]?.continue !== !0) return !0;
    return !1;
}
function S(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function M(e) {
    return "string" == typeof e ? e : e?.message;
}
function P(e, t, r) {
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = M(e.inst?._zod.def?.error?.(e)) ?? M(t?.error?.(e)) ?? M(r.customError?.(e)) ?? M(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
}
const T = (e, t)=>{
    e.name = "$ZodError", Object.defineProperty(e, "_zod", {
        value: e._zod,
        enumerable: !1
    }), Object.defineProperty(e, "issues", {
        value: t,
        enumerable: !1
    }), e.message = JSON.stringify(t, u, 2), Object.defineProperty(e, "toString", {
        value: ()=>e.message,
        enumerable: !1
    });
}, I = l("$ZodError", T), N = l("$ZodError", T, {
    Parent: Error
}), C = (r = N, (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !1
    }) : {
        async: !1
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise) throw new d();
    if (o.issues.length) {
        let e = new (i?.Err ?? r)(o.issues.map((e)=>P(e, a, p())));
        throw y(e, i?.callee), e;
    }
    return o.value;
}), D = (n = N, async (e, t, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (i?.Err ?? n)(o.issues.map((e)=>P(e, a, p())));
        throw y(e, i?.callee), e;
    }
    return o.value;
}), R = (i = N, (e, t, r)=>{
    let n = r ? {
        ...r,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, n);
    if (a instanceof Promise) throw new d();
    return a.issues.length ? {
        success: !1,
        error: new (i ?? I)(a.issues.map((e)=>P(e, n, p())))
    } : {
        success: !0,
        data: a.value
    };
}), A = (a = N, async (e, t, r)=>{
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
        error: new a(i.issues.map((e)=>P(e, n, p())))
    } : {
        success: !0,
        data: i.value
    };
}), Z = /^-?\d+(?:\.\d+)?$/, U = /^(?:true|false)$/i, B = /^null$/i, q = {
    major: 4,
    minor: 3,
    patch: 6
}, V = l("$ZodType", (e, t)=>{
    var r;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = q;
    let n = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && n.unshift(e), n))for (let r of t._zod.onattach)r(e);
    if (0 === n.length) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, r)=>{
            let n, i = O(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, o = a._zod.check(e);
                if (o instanceof Promise && r?.async === !1) throw new d();
                if (n || o instanceof Promise) n = (n ?? Promise.resolve()).then(async ()=>{
                    await o, e.issues.length !== t && (i || (i = O(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = O(e, t));
                }
            }
            return n ? n.then(()=>e) : e;
        }, r = (r, i, a)=>{
            if (O(r)) return r.aborted = !0, r;
            let o = t(i, n, a);
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
                return t instanceof Promise ? t.then((e)=>r(e, i, a)) : r(t, i, a);
            }
            let o = e._zod.parse(i, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new d();
                return o.then((e)=>t(e, n, a));
            }
            return t(o, n, a);
        };
    }
    h(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = R(e, t);
                    return r.success ? {
                        value: r.data
                    } : {
                        issues: r.error?.issues
                    };
                } catch (r) {
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
}), F = l("$ZodString", (e, t)=>{
    var r;
    let n;
    V.init(e, t), e._zod.pattern = [
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
}), W = l("$ZodNumber", (e, t)=>{
    V.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? Z, e._zod.parse = (r, n)=>{
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
}), J = l("$ZodBoolean", (e, t)=>{
    V.init(e, t), e._zod.pattern = U, e._zod.parse = (r, n)=>{
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
}), X = l("$ZodNull", (e, t)=>{
    V.init(e, t), e._zod.pattern = B, e._zod.values = new Set([
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
}), H = l("$ZodNever", (e, t)=>{
    V.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function G(e, t, r) {
    e.issues.length && t.issues.push(...S(r, e.issues)), t.value[r] = e.value;
}
const K = l("$ZodArray", (e, t)=>{
    V.init(e, t), e._zod.parse = (r, n)=>{
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
            s instanceof Promise ? a.push(s.then((t)=>G(t, r, e))) : G(s, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function Q(e, t, r, n, i) {
    if (e.issues.length) {
        if (i && !(r in n)) return;
        t.issues.push(...S(r, e.issues));
    }
    void 0 === e.value ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
const Y = l("$ZodObject", (e, t)=>{
    let r;
    V.init(e, t);
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
    let i = f(()=>(function(e) {
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
    h(e._zod, "propValues", ()=>{
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
        if (!w(o)) return t.issues.push({
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
            a instanceof Promise ? s.push(a.then((r)=>Q(r, t, e, o, i))) : Q(a, t, e, o, i);
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
                a instanceof Promise ? e.push(a.then((e)=>Q(e, r, i, t, c))) : Q(a, r, i, t, c);
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
function ee(e, t, r, n) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let i = e.filter((e)=>!O(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>P(e, n, p())))
    }), t);
}
const et = l("$ZodUnion", (e, t)=>{
    V.init(e, t), h(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), h(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), h(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), h(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>b(e.source)).join("|")})$`);
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
        return o ? Promise.all(s).then((t)=>ee(t, i, e, a)) : ee(s, i, e, a);
    };
}), er = l("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, et.init(e, t);
    let r = e._zod.parse;
    h(e._zod, "propValues", ()=>{
        let e = {};
        for (let r of t.options){
            let n = r._zod.propValues;
            if (!n || 0 === Object.keys(n).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
            for (let [t, r] of Object.entries(n))for (let n of (e[t] || (e[t] = new Set()), r))e[t].add(n);
        }
        return e;
    });
    let n = f(()=>{
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
        if (!w(o)) return i.issues.push({
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
}), en = l("$ZodRecord", (e, t)=>{
    V.init(e, t), e._zod.parse = (r, n)=>{
        let i = r.value;
        if (!x(i)) return r.issues.push({
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
                    t.issues.length && r.issues.push(...S(e, t.issues)), r.value[e] = t.value;
                })) : (o.issues.length && r.issues.push(...S(e, o.issues)), r.value[e] = o.value);
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
            if ("string" == typeof o && Z.test(o) && s.issues.length) {
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
                    issues: s.issues.map((e)=>P(e, n, p())),
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
                e.issues.length && r.issues.push(...S(o, e.issues)), r.value[s.value] = e.value;
            })) : (l.issues.length && r.issues.push(...S(o, l.issues)), r.value[s.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), ei = l("$ZodEnum", (e, t)=>{
    var r;
    let n;
    V.init(e, t);
    let i = (n = Object.values(r = t.entries).filter((e)=>"number" == typeof e), Object.entries(r).filter(([e, t])=>-1 === n.indexOf(+e)).map(([e, t])=>t)), a = new Set(i);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${i.filter((e)=>k.has(typeof e)).map((e)=>"string" == typeof e ? z(e) : e.toString()).join("|")})$`), e._zod.parse = (t, r)=>{
        let n = t.value;
        return a.has(n) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: n,
            inst: e
        }), t;
    };
}), ea = l("$ZodLiteral", (e, t)=>{
    if (V.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? z(e) : e ? z(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (n, i)=>{
        let a = n.value;
        return r.has(a) || n.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
            inst: e
        }), n;
    };
});
function eo(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const es = l("$ZodOptional", (e, t)=>{
    V.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", h(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), h(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${b(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let n = t.innerType._zod.run(e, r);
            return n instanceof Promise ? n.then((t)=>eo(t, e.value)) : eo(n, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, r);
    };
}), el = l("$ZodNullable", (e, t)=>{
    V.init(e, t), h(e._zod, "optin", ()=>t.innerType._zod.optin), h(e._zod, "optout", ()=>t.innerType._zod.optout), h(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${b(e.source)}|null)$`) : void 0;
    }), h(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), ed = l("$ZodCatch", (e, t)=>{
    V.init(e, t), h(e._zod, "optin", ()=>t.innerType._zod.optin), h(e._zod, "optout", ()=>t.innerType._zod.optout), h(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let n = t.innerType._zod.run(e, r);
        return n instanceof Promise ? n.then((n)=>(e.value = n.value, n.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: n.issues.map((e)=>P(e, r, p()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = n.value, n.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: n.issues.map((e)=>P(e, r, p()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ec = l("$ZodLazy", (e, t)=>{
    V.init(e, t), h(e._zod, "innerType", ()=>t.getter()), h(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), h(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), h(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), h(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
const ep = l("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    V.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>C(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>R(e, t, r), e.parseAsync = async (t, r)=>D(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>A(e, t, r), e.check = (...r)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, r)=>$(e, t, r), e.brand = ()=>e, e.register = (t, r)=>(t.add(e, r), e), e.apply = (t)=>t(e);
}), eu = l("ZodMiniString", (e, t)=>{
    F.init(e, t), ep.init(e, t);
});
function ef(e) {
    return new eu({
        type: "string",
        ...j(e)
    });
}
const e_ = l("ZodMiniNumber", (e, t)=>{
    W.init(e, t), ep.init(e, t);
});
function eb(e) {
    return new e_({
        type: "number",
        checks: [],
        ...j(e)
    });
}
const eg = l("ZodMiniBoolean", (e, t)=>{
    J.init(e, t), ep.init(e, t);
});
function eh(e) {
    return new eg({
        type: "boolean",
        ...j(e)
    });
}
const em = l("ZodMiniNull", (e, t)=>{
    X.init(e, t), ep.init(e, t);
}), ev = l("ZodMiniNever", (e, t)=>{
    H.init(e, t), ep.init(e, t);
});
function ey(e) {
    return new ev({
        type: "never",
        ...j(e)
    });
}
const ew = l("ZodMiniArray", (e, t)=>{
    K.init(e, t), ep.init(e, t);
});
function ex(e, t) {
    return new ew({
        type: "array",
        element: e,
        ...j(t)
    });
}
const ek = l("ZodMiniObject", (e, t)=>{
    Y.init(e, t), ep.init(e, t), h(e, "shape", ()=>t.shape);
});
function ez(e, t) {
    return new ek({
        type: "object",
        shape: e ?? {},
        ...j(t)
    });
}
const e$ = l("ZodMiniUnion", (e, t)=>{
    et.init(e, t), ep.init(e, t);
});
function ej(e, t) {
    return new e$({
        type: "union",
        options: e,
        ...j(t)
    });
}
const eO = l("ZodMiniDiscriminatedUnion", (e, t)=>{
    er.init(e, t), ep.init(e, t);
});
function eS(e, t, r) {
    return new eO({
        type: "union",
        options: t,
        discriminator: e,
        ...j(r)
    });
}
const eM = l("ZodMiniRecord", (e, t)=>{
    en.init(e, t), ep.init(e, t);
});
function eE(e, t, r) {
    return new eM({
        type: "record",
        keyType: e,
        valueType: t,
        ...j(r)
    });
}
const eP = l("ZodMiniEnum", (e, t)=>{
    ei.init(e, t), ep.init(e, t), e.options = Object.values(t.entries);
});
function eT(e, t) {
    return new eP({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...j(t)
    });
}
const eI = l("ZodMiniLiteral", (e, t)=>{
    ea.init(e, t), ep.init(e, t);
});
function eN(e, t) {
    return new eI({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...j(t)
    });
}
const eC = l("ZodMiniOptional", (e, t)=>{
    es.init(e, t), ep.init(e, t);
});
function eL(e) {
    return new eC({
        type: "optional",
        innerType: e
    });
}
const eD = l("ZodMiniNullable", (e, t)=>{
    el.init(e, t), ep.init(e, t);
});
function eR(e) {
    return new eD({
        type: "nullable",
        innerType: e
    });
}
const eA = l("ZodMiniCatch", (e, t)=>{
    ed.init(e, t), ep.init(e, t);
}), eZ = l("ZodMiniLazy", (e, t)=>{
    ec.init(e, t), ep.init(e, t);
});
function eU() {
    let e = new eZ({
        type: "lazy",
        getter: ()=>ej([
                ef(),
                eb(),
                eh(),
                new em({
                    type: "null",
                    ...j(void 0)
                }),
                ex(e),
                eE(ef(), e)
            ])
    });
    return e;
}
let eB = ez({
    error: ej([
        ef(),
        ez({
            code: ef(),
            message: ef()
        })
    ])
});
class eq extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eV(e) {
    let t = eB.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eq("rpc", e) : new eq(e.code, e.message);
    }
    return e;
}
const eF = ez({
    status: eN("pending"),
    job: ef()
});
eS("status", [
    ez({
        status: eN("pending")
    }),
    ez({
        status: eN("ready"),
        chunk: eb(),
        chunks: eb(),
        bytes: eb(),
        data: ef()
    })
]);
let eW = ef(), eJ = eb(), eX = eh(), eH = eL(eW), eG = eL(eJ), eK = eL(eX);
const eQ = eT([
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
]), eY = eT([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), e0 = ez({
    id: eW,
    name: eL(eR(eW)),
    kind: eT([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eW,
    state: eW,
    reason: eH,
    revision: eH,
    current_revision: eK,
    management_fresh: eK,
    operation_id: eG,
    task_id: eL(eR(eJ)),
    updated_at: eG,
    changes: eL(ex(ez({
        name: eW,
        desired: eW
    })))
});
let e1 = ez({
    state: eW,
    reason: eH,
    task_id: eL(eR(eJ)),
    instance: eG
});
const e2 = ez({
    cwmp_id: eW,
    state: eT([
        "online",
        "waiting_inform",
        "offline_or_stale"
    ]),
    optical_online: eX,
    last_inform: eR(eJ),
    age_seconds: eR(eJ)
});
let e5 = ez({
    state: eT([
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
    method: eH,
    reason: eH,
    mqtt_target: eR(eW),
    binding_source: eH,
    link_identity_error: eR(eW),
    mqtt_last_seen: eR(eJ),
    cwmp_id: eH,
    desired_version: eH,
    generation: eG,
    inflight: eK,
    attempts: eG,
    next_retry_at: eG,
    updated_at: eG,
    settings_verified_at: eR(eJ),
    last_inform: eR(eJ),
    last_error: eL(eR(eW)),
    persistence_error: eL(eR(eW)),
    desired: eL(eR(ez({
        vlan: eJ,
        vlans: ex(eJ),
        priority: eJ,
        acs_url: eW
    }))),
    listener: eL(ez({
        enabled: eX,
        listen: eW,
        path: eW,
        error: eR(eW)
    })),
    endpoint_notice: eH,
    manual_steps: eL(ex(eW))
});
const e4 = eS("state", [
    e5,
    function(e, t) {
        if (!x(t)) throw Error("Invalid input to extend: expected a plain object");
        let r = e._zod.def.checks;
        if (r && r.length > 0) {
            let r = e._zod.def.shape;
            for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(r, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let n = v(e._zod.def, {
            get shape () {
                let r = {
                    ...e._zod.def.shape,
                    ...t
                };
                return m(this, "shape", r), r;
            }
        });
        return $(e, n);
    }(function(e) {
        var t = void 0;
        let r = e._zod.def.checks;
        if (r && r.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let n = v(e._zod.def, {
            get shape () {
                let r = e._zod.def.shape, n = {
                    ...r
                };
                if (t) for(let e in t){
                    if (!(e in r)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (n[e] = eC ? new eC({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)n[e] = eC ? new eC({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return m(this, "shape", n), n;
            },
            checks: []
        });
        return $(e, n);
    }(e5), {
        state: eT([
            "pending",
            "unavailable"
        ]),
        reason: eW
    })
]), e8 = ez({
    state: eQ,
    operation_id: eG,
    device: eH,
    optical_sn: eH,
    cwmp_id: eH,
    revision: eH,
    mode: eL(eT([
        "apply",
        "plan"
    ])),
    started_at: eG,
    current_revision: eK,
    management_fresh: eK,
    reason: eH,
    error: eH,
    attempts: eG,
    next_retry_at: eG,
    reconcile_reason: eH,
    items: ex(e0),
    cwmp_contract: eL(ez({
        state: eW,
        requested: eW,
        contract: eR(eW),
        reason: eW,
        cache_hit: eX,
        schema: eW,
        capabilities: eR(ez({
            wan: eW,
            wlan: eW,
            binding: eW
        }))
    })),
    wan_objects: eL(eE(eW, eU())),
    wan_lifecycle: eL(eE(eW, e1)),
    wan_stage: eL(eT([
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
    wifi_objects: eL(ez({
        owned: ex(eJ),
        pending: eR(eW),
        pending_instance: eR(eJ)
    })),
    wifi_lifecycle: eL(eE(eW, e1)),
    wifi_stage: eL(eT([
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
    wifi_cleanup: eL(eT([
        "disable",
        "preserve",
        "delete"
    ]))
});
let e3 = ez({
    enabled: eX,
    mode: eT([
        "auto",
        "manual"
    ]),
    vlan: ex(eJ),
    priority: eJ,
    address: eW,
    acs_url: eW,
    port: eJ,
    path: eW,
    dhcp_enabled: eX
}), e6 = ez({
    state: eT([
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
    error: eR(eW),
    inflight: eX,
    ready: eX,
    desired_version: eR(eW),
    applied_version: eR(eW),
    next_retry_at: eJ,
    attempts: eJ,
    desired: eR(e3),
    applied: eR(e3),
    previous: eR(e3),
    plan: ex(ez({
        operation: eW,
        key: eW,
        value: ex(eW)
    }))
});
const e7 = ez({
    device: eW,
    name: eR(eW),
    group: eR(eW),
    group_name: eR(eW),
    template: eR(eW),
    template_name: eR(eW),
    optical_sn: eW,
    adapter: eW,
    omci_management: ez({
        state: eW,
        reason: eH
    }),
    management: eR(e2),
    acs_bootstrap: e4,
    provisioning: e8,
    services: ex(e0),
    ssids: ex(e0),
    wifi_sync: eY
}), e9 = ez({
    enabled: eX,
    mode: eT([
        "auto",
        "manual"
    ]),
    method: eN("diff"),
    revision: eW,
    triggers: ex(eW),
    interval_minutes: new e_({
        type: "number",
        coerce: !0,
        checks: [],
        ...j(void 0)
    }),
    error: eR(eW),
    devices: ex(e7),
    management_network: e6,
    omci_management: eU(),
    groups: ex(ez({
        id: eW,
        name: eR(eW),
        template: eW
    })),
    pending_devices: ex(eW)
});
ej([
    ez({
        valid: eN(!0),
        revision: eW,
        devices: eJ,
        error: eL(ey())
    }),
    ez({
        error: eW,
        valid: eL(ey()),
        revision: eL(ey()),
        devices: eL(ey())
    })
]);
let te = ef(), tt = eb(), tr = eR(tt), tn = eE(te, ez({
    source: te,
    unit: te,
    reason: eR(te),
    raw: eR(te),
    age_seconds: tr
}));
const ti = ez({
    phase: eT([
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
    generation: tt,
    error: eR(te)
}), ta = eT([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let to = ez({
    model: te,
    wavelength_tx_nm: tt,
    wavelength_rx_nm: tt,
    phy_rate_downlink_gbps: tt,
    phy_rate_uplink_gbps: tt,
    tx_power_dbm: tr,
    laser_bias_current_ma: tr,
    temperature_celsius: tr,
    vcc_voltage: tr,
    cdr_locked: eR(eh()),
    tx_enabled: eL(eR(eh())),
    measurements: tn
}), ts = ez({
    equipment_id: eR(te),
    hardware_version: eR(te),
    software_images: ex(te),
    omcc_version: tr,
    errors: ex(te)
});
const tl = ez({
    onu_id: tt,
    vendor: te,
    model: te,
    serial_number: te,
    state: ta,
    business_status: ti,
    management: eR(e2),
    provisioning: eR(e8),
    services: ex(e0),
    ssids: ex(e0),
    wifi_sync: eY,
    acs_bootstrap: eL(e4),
    identity: eR(ts),
    identity_age_seconds: tr,
    identity_current: eh(),
    fiber_distance_m: tr,
    ranging_delay_rtd_ns: tr,
    equalization_delay_bits: new eA({
        type: "catch",
        innerType: tr,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tr,
    optical_tx_power_dbm: tr,
    firmware_version: te,
    hardware_version: te,
    uptime_seconds: tr,
    data_path: ez({
        interface: te,
        gem_ports: eR(ex(tt)),
        vlan_id: tr,
        tx_bytes: tr,
        rx_bytes: tr,
        current_tx_kbps: tr,
        current_rx_kbps: tr,
        measurements: tn
    }),
    wifi_mesh: ez({
        channel_2g: tr,
        channel_5g: tr,
        bandwidth_5g: eR(te),
        tx_power_pct: tr,
        measurements: tn
    }),
    connected_clients: eR(ex(ez({
        mac: te,
        ip: te,
        band: te,
        rssi_dbm: tr,
        rx_rate_mbps: tr,
        tx_rate_mbps: tr
    }))),
    measurements: tn
});
let td = ez({
    port: tt,
    interface: te,
    carrier: eh(),
    status: te,
    onu_id: eL(tt),
    onu_sn: eL(te),
    link_state: te
});
const tc = ez({
    fpga_status: te,
    provisioning: eR(e9),
    optical_transceiver: to,
    switch_ports: ex(td),
    sub_gateways: ex(tl),
    telemetry_gateways: ex(ez({
        id: te,
        last_seen_sec_ago: tt,
        last_payload_bytes: tt
    }))
});
eE(te, ez({
    carrier: eL(eh()),
    mac: eL(te),
    link: eL(ez({
        speed: eL(tt),
        duplex: eL(te),
        autoneg: eL(eh())
    })),
    stats: eL(eE(te, tt))
}));
const tp = {
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
let tu = L.rpc.declare({
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
const tf = async ()=>tc.parse(eV(await tu())), t_ = ez({
    schema_version: eb(),
    status: eT([
        "success",
        "error"
    ]),
    action: eT([
        "optical_on",
        "optical_off",
        "optical_status"
    ]),
    tx_enabled: eR(eh()),
    actor_state: ef(),
    hardware_ready: eh(),
    discovery_active: eR(eh()),
    cleanup_pending: eh(),
    error: eR(ez({
        code: ef(),
        message: ef()
    }))
});
let tb = L.rpc.declare({
    object: "luci.fttr",
    method: "optical_status",
    reject: !0
}), tg = L.rpc.declare({
    object: "luci.fttr",
    method: "optical_set",
    params: [
        "enabled"
    ],
    reject: !0
});
const th = async ()=>t_.parse(eV(await tb())), tm = async (e)=>t_.parse(eV(await tg(e)));
ej([
    ez({
        operation_ids: ex(eb()),
        revision: ef()
    }),
    ez({
        started: eN(!0),
        mode: eT([
            "apply",
            "plan"
        ])
    }),
    ez({
        reset: eN(!0),
        device: ef()
    }),
    ez({
        operation_ids: ex(eb()),
        mode: eT([
            "apply",
            "plan"
        ]),
        reconcile: eL(eh()),
        retry: eL(eh())
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
    source: eT([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: ef(),
    size: eb(),
    sha256: ef(),
    data: eL(ef()),
    factory: ez({
        detected: eh(),
        device: ef(),
        has_data: eh(),
        sha256: ef(),
        data: ef()
    }),
    firmware: ez({
        exists: eh(),
        path: ef(),
        size: eb(),
        sha256: ef(),
        data: ef()
    }),
    error: eL(ef())
}), ez({
    success: eh(),
    path: ef(),
    size: eb(),
    sha256: ef(),
    error: eL(ef())
}), ez({
    success: eh(),
    output: eL(ef()),
    error: eL(ef())
});
let tv = ef(), ty = eb(), tw = eh(), tx = ez({
    id: tv,
    url: tv
}), tk = ez({
    name: tv,
    kind: eT([
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
    index: ty,
    mask: ty,
    size: ty,
    read: tw,
    write: tw,
    set_by_create: tw,
    avc: tw,
    optional: tw,
    deprecated: tw,
    default_hex: eR(tv),
    reference: tx
}), tz = eS("type", [
    ez({
        type: eN("unsigned"),
        value: ty
    }),
    ez({
        type: eN("signed"),
        value: ty
    }),
    ez({
        type: eN("decimal"),
        value: tv
    }),
    ez({
        type: eN("text"),
        value: eR(tv)
    }),
    ez({
        type: eN("octets"),
        hex: tv
    }),
    ez({
        type: eN("table_length"),
        bytes: ty
    })
]), t$ = ez({
    code: tv,
    message: tv,
    offset: ty,
    mask: ty
}), tj = eT([
    "layout",
    "name_only",
    "unknown"
]), tO = ez({
    raw_hex: tv,
    filter_outer_priority: ty,
    filter_outer_vid: ty,
    filter_outer_tpid_dei: ty,
    filter_inner_priority: ty,
    filter_inner_vid: ty,
    filter_inner_tpid_dei: ty,
    filter_ethertype: ty,
    tags_to_remove: ty,
    treatment_outer_priority: ty,
    treatment_outer_vid: ty,
    treatment_outer_tpid_dei: ty,
    treatment_inner_priority: ty,
    treatment_inner_vid: ty,
    treatment_inner_tpid_dei: ty,
    delete_entry: tw
}), tS = ez({
    schema_version: eN(1),
    reference_version: tv,
    onu_id: eR(ty),
    uploaded_complete: tw,
    expected_records: ty,
    received_records: ty,
    decoded_records: ty,
    partial_records: ty,
    basic_records: ty,
    tables_requested: tw,
    tables_collected: tw,
    classes: ex(ez({
        class_id: ty,
        name: eR(tv),
        entities: ty,
        records: ty,
        support: tj
    })),
    entities: ex(ez({
        class_id: ty,
        entity_id: ty,
        name: eR(tv),
        support: tj,
        reference: eR(tx),
        sequences: ex(ty),
        attributes: ex(ez({
            definition: tk,
            value: eR(tz),
            observations: ex(ez({
                raw_hex: tv,
                value: tz,
                sequences: ex(ty)
            }))
        })),
        diagnostics: ex(t$)
    })),
    records: ex(ez({
        class_id: ty,
        entity_id: ty,
        sequence: ty,
        attribute_mask: ty,
        raw_hex: tv,
        consumed: ty,
        remaining_hex: tv,
        undecoded_mask: ty
    })),
    tables: ex(ez({
        class_id: ty,
        entity_id: ty,
        attribute: tk,
        collected: tw,
        error: eR(tv),
        raw_hex: tv,
        rows: ex(tv),
        vlan_rules: ex(tO)
    })),
    diagnostics: ex(t$)
});
const tM = ez({
    status: eN("ready"),
    report: tS
});
let tE = ez({
    phase: eT([
        "starting",
        "upload",
        "tables"
    ]),
    received: ty,
    expected: eR(ty)
}), tP = eS("status", [
    ez({
        status: eN("pending"),
        progress: eL(tE)
    }),
    ez({
        status: eN("ready"),
        chunk: ty,
        chunks: ty,
        bytes: ty,
        data: tv
    })
]), tT = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_start",
    params: [
        "onu_id",
        "optical_sn",
        "tables"
    ],
    reject: !0
}), tI = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
}), tN = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_release",
    params: [
        "job"
    ],
    reject: !0
});
const tC = async (e, t, r)=>eF.parse(eV(await tT(e, t, r))), tL = async (e, t)=>tP.parse(eV(await tI(e, t))), tD = async (e)=>ez({
        released: tw
    }).parse(eV(await tN(e))), tR = (e)=>null == e || "" === e ? "\u2014" : String(e);
function tA(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
    return null != e && Number.isFinite(e) ? `${e.toFixed(t)} dBm` : "\u2014";
}
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
        label: tU[t] ?? tR(t),
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
        label: `${tp[t.phase]} \xb7 ${t.generation}${t.error ? ` \xb7 ${t.error}` : ""}`,
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
function tF(e) {
    var t;
    let r, n, i, a, o, l, d = (t = e.management, r = t?.state, n = function(e) {
        if (null == e || !Number.isFinite(e) || e < 0) return null;
        let t = Math.floor(e);
        if (t < 60) return (1 === t ? _("%d second ago") : _("%d seconds ago")).replace("%d", String(t));
        let r = Math.floor(t / 60);
        if (r < 60) return (1 === r ? _("%d minute ago") : _("%d minutes ago")).replace("%d", String(r));
        let n = Math.floor(t / 3600);
        if (n < 24) return (1 === n ? _("%d hour ago") : _("%d hours ago")).replace("%d", String(n));
        let i = Math.floor(t / 86400);
        return (1 === i ? _("%d day ago") : _("%d days ago")).replace("%d", String(i));
    }(t?.age_seconds ?? (t?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - t.last_inform) : null)), a = (i = t?.last_inform ? new Date(1000 * t.last_inform).toLocaleString() : null) ? _("Last Inform: %s").replace("%s", i) : void 0, o = "\u2014", l = "none", "online" === r ? (l = "success", o = tV.online) : "waiting_inform" === r ? (l = "warning", o = tV.waiting_inform) : "offline_or_stale" === r ? (l = "danger", o = tV.offline_or_stale) : r && (l = "neutral", o = tR(r)), {
        tone: l,
        label: n && r ? `${o} \xb7 ${n}` : o,
        title: a
    });
    return s(tZ, {
        tone: d.tone,
        title: d.title,
        children: d.label
    });
}
const tW = {
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
    let n, i, a, o = (t = e.provisioning, r = e.title, n = t?.state, i = t?.next_retry_at && t.next_retry_at > Math.floor(Date.now() / 1000) ? t.next_retry_at - Math.floor(Date.now() / 1000) : 0, a = r ?? (t?.current_revision === !1 ? _("Previous configuration") : t?.management_fresh === !1 ? _("Management stale") : t?.reconcile_reason ? t.reconcile_reason : i > 0 ? _("Next self-healing retry in %d seconds").replace("%d", String(i)) : t?.reason ?? t?.error), n && "not_started" !== n ? "completed" === n || "verified" === n ? {
        tone: "success",
        label: "completed" === n ? tW.completed : _("Ready"),
        title: a
    } : "wan_reconciling" === n || "wan_verifying" === n || "wifi_reconciling" === n || "discovering" === n || "reading" === n || "disabling" === n || "disabling_read" === n || "writing" === n || "verifying" === n || "settling" === n || "recovering" === n || "waiting_task" === n ? {
        tone: "info",
        label: tW[n] ?? tR(n),
        title: a
    } : "interrupted" === n || "failed" === n || "error" === n || "blocked" === n ? {
        tone: "danger",
        label: "blocked" === n ? tW.blocked : tW.interrupted,
        title: a
    } : "waiting" === n || "pending" === n || "waiting_management" === n || "reset_pending" === n ? {
        tone: "warning",
        label: tW[n] ?? tW.waiting,
        title: a
    } : {
        tone: "neutral",
        label: tR(n),
        title: a
    } : {
        tone: "neutral",
        label: tW.not_started,
        title: a
    });
    return s(tZ, {
        tone: o.tone,
        title: o.title,
        children: o.label
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
        label: tR(t)
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
let t0 = L.view, t1 = (e)=>null == e || "" === e ? "\u2014" : String(e);
function t2(e) {
    return null !== e && Number.isFinite(e) ? `${e.toFixed(2)} dBm` : "\u2014";
}
let t5 = null, t4 = !1;
function t8(e) {
    let r = t5;
    if (!r) return;
    let n = r.querySelector('[data-fttr="laser-state"]'), i = r.querySelector('[data-fttr="laser-toggle"]');
    n instanceof HTMLElement && i instanceof HTMLButtonElement && (!0 === e ? (n.textContent = _("Emitting"), n.className = "fttr-badge fttr-badge-success") : !1 === e ? (n.textContent = _("Off (TX disabled)"), n.className = "fttr-badge fttr-badge-warning") : (n.textContent = _("Unknown"), n.className = "fttr-badge fttr-badge-neutral"), i.textContent = !1 === e ? _("Turn laser on") : _("Turn laser off"), i.disabled = t4, i.onclick = async ()=>{
        if (t4) return;
        let e = !1 === t, r = e ? _("Re-enable the 1490nm downlink laser? Discovery resumes and sub-gateways can register again.") : _("Turn off the 1490nm downlink laser? All sub-gateways are gracefully disconnected and cannot register until the laser is re-enabled. This setting is saved and reapplied after a reboot.");
        if (window.confirm(r)) {
            t4 = !0, t8(t);
            try {
                let r = await tm(e);
                if ("error" === r.status) return void window.alert(`${_("Failed to change laser output")}: ${r.error?.message ?? _("unknown error")}`);
                t = r.tx_enabled ?? e;
            } catch (e) {
                window.alert(`${_("Failed to change laser output")}: ${String(e)}`);
            } finally{
                t4 = !1, t8(t);
            }
        }
    });
}
function t3(e) {
    var t, r, n, i, a, o, l, d, c, p, u, f, b, g, h, m, v, y, w, x, k;
    let z = e.optical_transceiver, $ = s("span", {
        class: `fttr-badge ${"ready" === e.fpga_status ? "fttr-badge-success" : "fttr-badge-neutral"}`,
        style: "font-size:95%",
        children: "ready" === e.fpga_status ? _("Ready") : t1(e.fpga_status)
    }), j = null === (t = z.cdr_locked) ? s("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: _("Unknown")
    }) : t ? s("span", {
        class: "fttr-badge fttr-badge-success",
        children: _("Locked")
    }) : s("span", {
        class: "fttr-badge fttr-badge-warning",
        children: _("Unlocked")
    });
    return k = {
        class: "cbi-section fttr-panel-controller",
        children: [
            s("h3", {
                style: "margin-bottom:12px",
                children: _("Controller hardware")
            }),
            (y = {
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
                                        children: $
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
                                        children: t1(e.fpga_status)
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
                                        children: j
                                    })
                                ]
                            }, s("div", i))
                        ]
                    }, s("div", a)),
                    (p = {
                        class: "fttr-card",
                        children: [
                            s("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: _("Optical transceiver")
                            }),
                            (o = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Module model")
                                    }),
                                    s("strong", {
                                        children: t1(z.model)
                                    })
                                ]
                            }, s("div", o)),
                            (l = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("TX wavelength")
                                    }),
                                    s("span", {
                                        children: z.wavelength_tx_nm ? `${z.wavelength_tx_nm} nm` : "\u2014"
                                    })
                                ]
                            }, s("div", l)),
                            (d = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("RX wavelength")
                                    }),
                                    s("span", {
                                        children: z.wavelength_rx_nm ? `${z.wavelength_rx_nm} nm` : "\u2014"
                                    })
                                ]
                            }, s("div", d)),
                            (c = {
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
                            }, s("div", c))
                        ]
                    }, s("div", p)),
                    (v = {
                        class: "fttr-card",
                        children: [
                            s("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: _("Physical rates and diagnostics")
                            }),
                            (u = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Downlink PHY rate")
                                    }),
                                    s("span", {
                                        children: z.phy_rate_downlink_gbps ? `${z.phy_rate_downlink_gbps} Gbps` : "\u2014"
                                    })
                                ]
                            }, s("div", u)),
                            (f = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Uplink PHY rate")
                                    }),
                                    s("span", {
                                        children: z.phy_rate_uplink_gbps ? `${z.phy_rate_uplink_gbps} Gbps` : "\u2014"
                                    })
                                ]
                            }, s("div", f)),
                            (b = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Temperature")
                                    }),
                                    s("span", {
                                        children: null == z.temperature_celsius ? "\u2014" : `${z.temperature_celsius} \xb0C`
                                    })
                                ]
                            }, s("div", b)),
                            (g = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("TX power")
                                    }),
                                    s("span", {
                                        children: t2(z.tx_power_dbm)
                                    })
                                ]
                            }, s("div", g)),
                            (h = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Voltage")
                                    }),
                                    s("span", {
                                        children: null == z.vcc_voltage ? "\u2014" : `${z.vcc_voltage} V`
                                    })
                                ]
                            }, s("div", h)),
                            (m = {
                                class: "fttr-kv-row",
                                children: [
                                    s("span", {
                                        class: "fttr-kv-label",
                                        children: _("Bias current")
                                    }),
                                    s("span", {
                                        children: null == z.laser_bias_current_ma ? "\u2014" : `${z.laser_bias_current_ma} mA`
                                    })
                                ]
                            }, s("div", m))
                        ]
                    }, s("div", v))
                ]
            }, s("div", y)),
            (x = {
                class: "fttr-kv-row",
                style: "margin-top:10px",
                children: [
                    s("span", {
                        class: "fttr-kv-label",
                        children: _("Laser control")
                    }),
                    (w = {
                        children: s("button", {
                            class: "fttr-btn-subtle",
                            "data-fttr": "laser-toggle",
                            type: "button",
                            disabled: !0,
                            children: _("Loading\u2026")
                        })
                    }, s("span", w))
                ]
            }, s("div", x))
        ]
    }, s("div", k);
}
function t6(e) {
    var t, r;
    return e.length ? (t = {
        class: "fttr-panel-subgateways",
        children: e.map((e)=>{
            var t, r, n, i, a, o, l, d, c, p, u, f, b, g, h, m, v, y, w, x, k, z, $;
            let j = e.identity, O = j?.software_images ?? [], S = function(e) {
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
            }(e.firmware_version), M = e.identity ? e.identity_current ? _("Current registration") : _("Cached identity") : _("Not collected"), P = s("span", {
                class: `fttr-badge ${e.identity_current ? "fttr-badge-info" : "fttr-badge-neutral"}`,
                style: "font-size:80%",
                children: M
            });
            return $ = {
                class: "cbi-section fttr-onu-card",
                children: [
                    (o = {
                        class: "fttr-card-header",
                        children: [
                            (n = {
                                class: "fttr-card-title-group",
                                children: [
                                    s("h3", {
                                        style: "margin:0",
                                        children: _("Sub-gateway %s \u2014 %s").replace("%s", String(e.onu_id)).replace("%s", t1(e.model))
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
                                            P
                                        ]
                                    }, s("div", r))
                                ]
                            }, s("div", n)),
                            (a = {
                                children: (i = {
                                    type: "button",
                                    class: "fttr-btn-subtle",
                                    onclick: ()=>(function(e) {
                                            var t, r, n, i, a, o, l, d, c, p, u;
                                            let f = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "basic", b = !1, g = !1, h = null, m = null, v = (t = {
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
                                                                tA(e.optical_rx_power_dbm)
                                                            ],
                                                            [
                                                                _("Transmit optical power"),
                                                                tA(e.optical_tx_power_dbm)
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
                                                                s(tF, {
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
                                                                                    children: n instanceof Node ? n : tR(n)
                                                                                })
                                                                            ]
                                                                        }, s("tr", t);
                                                                    })
                                                                }, s("tbody", t))
                                                            }, s("table", r))
                                                        ]
                                                    }, s("div", n);
                                                })
                                            }, s("div", t)), y = (r = {
                                                class: "mib-status-bar",
                                                role: "status",
                                                children: s("span", {
                                                    class: "mib-hint-text",
                                                    children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                                                })
                                            }, s("div", r)), w = (n = {
                                                class: "cbi-progressbar",
                                                style: "display:none;width:100%",
                                                title: "0%",
                                                children: s("div", {
                                                    style: "width:0%"
                                                })
                                            }, s("div", n)), x = s("div", {}), k = s("pre", {
                                                class: "onu-raw-pre"
                                            }), z = s("span", {
                                                class: "download-status",
                                                role: "status"
                                            }), $ = null, j = s("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                disabled: !0,
                                                onclick: async ()=>{
                                                    if (h && !b) {
                                                        j.disabled = !0, z.textContent = _("Preparing JSON download\u2026");
                                                        try {
                                                            let t = await tQ(h);
                                                            if (b) return;
                                                            $ && URL.revokeObjectURL($), $ = URL.createObjectURL(t);
                                                            let r = document.createElement("a");
                                                            r.href = $, r.download = `mib-${e.serial_number}.json`, r.click(), z.textContent = _("JSON download started"), window.setTimeout(()=>{
                                                                URL.revokeObjectURL(r.href), $ === r.href && ($ = null);
                                                            }, 1000);
                                                        } catch (e) {
                                                            z.textContent = String(e);
                                                        } finally{
                                                            j.disabled = !h || b;
                                                        }
                                                    }
                                                },
                                                children: _("Download JSON")
                                            }), O = (a = {
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
                                                                    j,
                                                                    z
                                                                ]
                                                            })
                                                        ]
                                                    }, s("div", i)),
                                                    k
                                                ]
                                            }, s("div", a)), S = s("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-apply",
                                                onclick: ()=>Z(!1),
                                                children: _("Read MIB")
                                            }), M = s("button", {
                                                type: "button",
                                                class: "cbi-button cbi-button-action",
                                                onclick: ()=>Z(!0),
                                                children: _("Read MIB and VLAN tables")
                                            }), P = (d = {
                                                class: "onu-mib-panel",
                                                children: [
                                                    (l = {
                                                        class: "mib-controls",
                                                        children: [
                                                            (o = {
                                                                class: "mib-action-group",
                                                                children: [
                                                                    S,
                                                                    M,
                                                                    s("small", {
                                                                        class: "mib-action-hint",
                                                                        children: _("Collecting VLAN tables queries extended filter tables and takes longer.")
                                                                    })
                                                                ]
                                                            }, s("div", o)),
                                                            y,
                                                            w
                                                        ]
                                                    }, s("div", l)),
                                                    x
                                                ]
                                            }, s("div", d)), T = {
                                                basic: v,
                                                mib: P,
                                                raw: O
                                            }, I = new Map();
                                            function N(e) {
                                                for (let [t, r] of Object.entries(T))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                                                for (let [t, r] of I)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
                                            }
                                            let C = (c = {
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
                                                        class: e.id === f ? "cbi-tab" : "cbi-tab-disabled",
                                                        "data-tab": e.id,
                                                        children: s("a", {
                                                            href: `#tab-${e.id}`,
                                                            onclick: (t)=>{
                                                                t.preventDefault(), N(e.id);
                                                            },
                                                            children: e.label
                                                        })
                                                    }, s("li", t));
                                                    return I.set(e.id, r), r;
                                                })
                                            }, s("ul", c)), D = s("div", {
                                                class: "onu-details-header",
                                                children: C
                                            }), R = (u = {
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
                                                    D,
                                                    v,
                                                    P,
                                                    O,
                                                    (p = {
                                                        class: "right onu-details-footer",
                                                        children: s("button", {
                                                            type: "button",
                                                            class: "cbi-button",
                                                            onclick: ()=>{
                                                                b = !0, $ && URL.revokeObjectURL($), $ = null, h = null, k.textContent = "", x.replaceChildren(), L.ui.hideModal();
                                                            },
                                                            children: _("Close")
                                                        })
                                                    }, s("div", p))
                                                ]
                                            }, s("div", u)), A = ()=>!b && R.isConnected && R.getClientRects().length > 0;
                                            async function Z(t) {
                                                if (!g) {
                                                    g = !0, S.disabled = M.disabled = !0, w.style.display = "", w.title = "0%", w.firstElementChild.style.width = "0%", y.textContent = _("Reading MIB\u2026");
                                                    try {
                                                        let g = await tf(), $ = g.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                                        if ($?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                                        if (!A()) return;
                                                        let O = await tC($.onu_id, $.serial_number, t);
                                                        m = O.job;
                                                        let S = Date.now() + 140000;
                                                        for(; A();){
                                                            let e = await tL(O.job, 0);
                                                            if (!A()) return;
                                                            if ("ready" === e.status) {
                                                                var r, n, i, a, o, l, d, c, p, u, f, b, v, z;
                                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                                let t = new Uint8Array(e.bytes), g = 0;
                                                                for(let r = 0; r < e.chunks; r++){
                                                                    let n = 0 === r ? e : await tL(O.job, r);
                                                                    if (!A()) return;
                                                                    if ("ready" !== n.status || n.chunk !== r || n.chunks !== e.chunks || n.bytes !== e.bytes || !n.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                                    let i = atob(n.data);
                                                                    if (i.length > 32768 || g + i.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                                    for(let e = 0; e < i.length; e++)t[g++] = i.charCodeAt(e);
                                                                    let a = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                                                    w.title = `${a}%`, w.firstElementChild.style.width = `${a}%`, y.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                                                }
                                                                if (g !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                                if (await U(), h = tM.parse(eV(JSON.parse(new TextDecoder("utf-8", {
                                                                    fatal: !0
                                                                }).decode(t)))).report, 1 !== h.schema_version || h.onu_id !== $.onu_id) throw Error(_("Unexpected MIB response"));
                                                                w.style.display = "none", y.replaceChildren((r = h, f = {
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
                                                                        (p = {
                                                                            class: "mib-chip",
                                                                            children: r.tables_collected ? _("VLAN tables collected") : _("VLAN tables not collected")
                                                                        }, s("span", p)),
                                                                        (u = {
                                                                            class: "mib-chip mib-chip-subtle",
                                                                            children: new Date().toLocaleTimeString()
                                                                        }, s("span", u))
                                                                    ]
                                                                }, s("div", f))), x.replaceChildren(function(e) {
                                                                    var t, r, n, i, a, o;
                                                                    let l = e.classes.length ? e.classes[0].class_id : null, d = (t = {
                                                                        class: "mib-content"
                                                                    }, s("div", t)), c = (r = {
                                                                        type: "search",
                                                                        class: "cbi-input-text mib-search-input",
                                                                        placeholder: _("Search ME name or Class ID\u2026")
                                                                    }, s("input", r)), p = (n = {
                                                                        class: "mib-class-list"
                                                                    }, s("div", n)), u = new Map();
                                                                    function f(t) {
                                                                        var r, n;
                                                                        for (let [e, r] of (l = t, u))e === t ? r.classList.add("active") : r.classList.remove("active");
                                                                        let i = e.entities.filter((e)=>e.class_id === t);
                                                                        i.length ? d.replaceChildren(...i.map((r, n)=>{
                                                                            var i, a, o, l, d, c, p, u, f, b, g, h, m, v, y, w, x, k, z;
                                                                            return z = {
                                                                                open: 0 === n,
                                                                                class: "mib-entity-details",
                                                                                children: [
                                                                                    (d = {
                                                                                        class: "mib-entity-summary",
                                                                                        children: [
                                                                                            (o = {
                                                                                                class: "mib-entity-title",
                                                                                                children: [
                                                                                                    (i = {
                                                                                                        children: tR(r.name)
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
                                                                                                    (g = {
                                                                                                        children: (b = {
                                                                                                            children: [
                                                                                                                (c = {
                                                                                                                    style: "width:28%",
                                                                                                                    children: _("Attribute")
                                                                                                                }, s("th", c)),
                                                                                                                (p = {
                                                                                                                    style: "width:14%",
                                                                                                                    children: _("Type")
                                                                                                                }, s("th", p)),
                                                                                                                (u = {
                                                                                                                    children: _("Value")
                                                                                                                }, s("th", u)),
                                                                                                                (f = {
                                                                                                                    style: "width:18%",
                                                                                                                    children: _("Definition")
                                                                                                                }, s("th", f))
                                                                                                            ]
                                                                                                        }, s("tr", b))
                                                                                                    }, s("thead", g)),
                                                                                                    (h = {
                                                                                                        children: r.attributes.map((e)=>{
                                                                                                            var t, r, n, i, a, o, l, d, c, p;
                                                                                                            return p = {
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
                                                                                                                    (d = {
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
                                                                                                                                            return tR(e.value);
                                                                                                                                        case "octets":
                                                                                                                                            return tR(e.hex);
                                                                                                                                        case "table_length":
                                                                                                                                            return tR(e.bytes);
                                                                                                                                        default:
                                                                                                                                            throw new eq("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                                                    }
                                                                                                                                }(e.value)
                                                                                                                            }, s("span", i)),
                                                                                                                            e.observations?.length ? (l = {
                                                                                                                                class: "mib-obs-details",
                                                                                                                                children: [
                                                                                                                                    (a = {
                                                                                                                                        children: _("Raw data / observations")
                                                                                                                                    }, s("summary", a)),
                                                                                                                                    (o = {
                                                                                                                                        class: "mib-pre",
                                                                                                                                        children: tK(e.observations)
                                                                                                                                    }, s("pre", o))
                                                                                                                                ]
                                                                                                                            }, s("details", l)) : null
                                                                                                                        ]
                                                                                                                    }, s("td", d)),
                                                                                                                    (c = {
                                                                                                                        class: "mib-attr-ref",
                                                                                                                        children: tY(e.definition)
                                                                                                                    }, s("td", c))
                                                                                                                ]
                                                                                                            }, s("tr", p);
                                                                                                        })
                                                                                                    }, s("tbody", h))
                                                                                                ]
                                                                                            }, s("table", m)) : (v = {
                                                                                                children: _("Basic display only; raw records are preserved.")
                                                                                            }, s("p", v)),
                                                                                            e.tables.filter((e)=>e.class_id === t && e.entity_id === r.entity_id).map((e)=>{
                                                                                                var t, r, n, i, a, o, l, d, c, p, u, f, b, g, h, m;
                                                                                                return m = {
                                                                                                    class: "mib-table-details",
                                                                                                    children: [
                                                                                                        (t = {
                                                                                                            children: [
                                                                                                                e.attribute.name,
                                                                                                                " \xb7",
                                                                                                                " ",
                                                                                                                e.collected ? `${e.rows.length} ${_("rows")}` : tR(e.error)
                                                                                                            ]
                                                                                                        }, s("summary", t)),
                                                                                                        e.vlan_rules.length ? (b = {
                                                                                                            class: "mib-table-overflow",
                                                                                                            children: (f = {
                                                                                                                class: "table",
                                                                                                                children: [
                                                                                                                    (p = {
                                                                                                                        children: (c = {
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
                                                                                                                    }, s("thead", p)),
                                                                                                                    (u = {
                                                                                                                        children: e.vlan_rules.map((e)=>{
                                                                                                                            var t, r, n, i, a, o, l, d;
                                                                                                                            return d = {
                                                                                                                                children: [
                                                                                                                                    (t = {
                                                                                                                                        children: `${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`
                                                                                                                                    }, s("td", t)),
                                                                                                                                    (r = {
                                                                                                                                        children: `${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`
                                                                                                                                    }, s("td", r)),
                                                                                                                                    (n = {
                                                                                                                                        children: tR(e.filter_ethertype)
                                                                                                                                    }, s("td", n)),
                                                                                                                                    (i = {
                                                                                                                                        children: tR(e.tags_to_remove)
                                                                                                                                    }, s("td", i)),
                                                                                                                                    (a = {
                                                                                                                                        children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                                                    }, s("td", a)),
                                                                                                                                    (o = {
                                                                                                                                        children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                                                    }, s("td", o)),
                                                                                                                                    (l = {
                                                                                                                                        children: tR(e.delete_entry)
                                                                                                                                    }, s("td", l))
                                                                                                                                ]
                                                                                                                            }, s("tr", d);
                                                                                                                        })
                                                                                                                    }, s("tbody", u))
                                                                                                                ]
                                                                                                            }, s("table", f))
                                                                                                        }, s("div", b)) : null,
                                                                                                        (g = {
                                                                                                            style: "margin-top:6px",
                                                                                                            children: [
                                                                                                                _("G.988 encoded field values"),
                                                                                                                ": ",
                                                                                                                tY(e.attribute)
                                                                                                            ]
                                                                                                        }, s("p", g)),
                                                                                                        (h = {
                                                                                                            class: "mib-pre",
                                                                                                            children: tK(e.vlan_rules.length ? e.vlan_rules : e.rows)
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
                                                                                                        children: tK({
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
                                                                        })) : d.replaceChildren((n = {
                                                                            class: "mib-empty-content",
                                                                            children: (r = {
                                                                                children: _("No entities recorded for this ME class.")
                                                                            }, s("p", r))
                                                                        }, s("div", n)));
                                                                    }
                                                                    function b() {
                                                                        var t;
                                                                        let r = c.value.trim().toLowerCase();
                                                                        u.clear();
                                                                        let n = e.classes.filter((e)=>`${e.class_id} ${e.name ?? ""}`.toLowerCase().includes(r));
                                                                        n.length ? p.replaceChildren(...n.map((e)=>{
                                                                            var t, r, n, i;
                                                                            let a = (i = {
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
                                                                                    (n = {
                                                                                        class: "mib-class-count",
                                                                                        children: e.entities
                                                                                    }, s("span", n))
                                                                                ]
                                                                            }, s("button", i));
                                                                            return u.set(e.class_id, a), a;
                                                                        })) : p.replaceChildren((t = {
                                                                            class: "mib-empty-list",
                                                                            children: _("No matching ME classes")
                                                                        }, s("div", t)));
                                                                    }
                                                                    return c.addEventListener("input", b), b(), e.classes.length && f(e.classes[0].class_id), o = {
                                                                        class: "mib-browser",
                                                                        children: [
                                                                            (a = {
                                                                                class: "mib-sidebar",
                                                                                children: [
                                                                                    (i = {
                                                                                        class: "mib-search-box",
                                                                                        children: c
                                                                                    }, s("div", i)),
                                                                                    p
                                                                                ]
                                                                            }, s("div", a)),
                                                                            d
                                                                        ]
                                                                    }, s("div", o);
                                                                }(h), (z = {
                                                                    class: "mib-upload-diagnostics",
                                                                    children: [
                                                                        (b = {
                                                                            children: _("Upload diagnostics")
                                                                        }, s("summary", b)),
                                                                        (v = {
                                                                            class: "mib-pre",
                                                                            children: tK(h.diagnostics)
                                                                        }, s("pre", v))
                                                                    ]
                                                                }, s("details", z))), n = h, k.textContent = tK({
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
                                                                }), j.disabled = !1;
                                                                return;
                                                            }
                                                            if (e.progress) {
                                                                let { phase: t, received: r, expected: n } = e.progress;
                                                                if (y.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == n ? "" : `: ${r}/${n}`}` : null == n ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${n}`, n && n > 0) {
                                                                    let e = Math.min(100, Math.round(r / n * 100));
                                                                    w.title = `${e}%`, w.firstElementChild.style.width = `${e}%`;
                                                                }
                                                            }
                                                            if (Date.now() >= S) throw Error(_("MIB query timed out; retry."));
                                                            await new Promise((e)=>setTimeout(e, 1000));
                                                        }
                                                    } catch (e) {
                                                        A() && (w.style.display = "none", y.replaceChildren(s("span", {
                                                            class: "mib-error-text",
                                                            children: [
                                                                String(e),
                                                                h ? ` \xb7 ${_("Previous snapshot retained")}` : ""
                                                            ]
                                                        })));
                                                    } finally{
                                                        await U(), g = !1, S.disabled = M.disabled = !1;
                                                    }
                                                }
                                            }
                                            async function U() {
                                                if (!m) return;
                                                let e = m;
                                                m = null;
                                                try {
                                                    await tD(e);
                                                } catch (e) {
                                                    console.warn("Failed to release MIB snapshot", e);
                                                }
                                            }
                                            N(f), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, R, "modal-wide");
                                        })(e, "mib"),
                                    children: [
                                        _("View OMCI / MIB details"),
                                        " \u2192"
                                    ]
                                }, s("button", i))
                            }, s("div", a))
                        ]
                    }, s("div", o)),
                    (z = {
                        class: "fttr-grid-2",
                        children: [
                            (b = {
                                class: "fttr-card",
                                children: [
                                    s("h4", {
                                        style: "margin-top:0;margin-bottom:6px;font-size:92%;color:#888",
                                        children: _("Optical physical layer and link parameters")
                                    }),
                                    (l = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Optical RX power")
                                            }),
                                            s("strong", {
                                                children: t2(e.optical_rx_power_dbm)
                                            })
                                        ]
                                    }, s("div", l)),
                                    (d = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Optical TX power")
                                            }),
                                            s("strong", {
                                                children: t2(e.optical_tx_power_dbm)
                                            })
                                        ]
                                    }, s("div", d)),
                                    (p = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Equalization delay (EQD)")
                                            }),
                                            s("span", {
                                                children: null === (c = e.equalization_delay_bits) ? "\u2014" : `${c} bits`
                                            })
                                        ]
                                    }, s("div", p)),
                                    (u = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Data interface")
                                            }),
                                            s("code", {
                                                children: t1(e.data_path?.interface)
                                            })
                                        ]
                                    }, s("div", u)),
                                    (f = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Identity age")
                                            }),
                                            s("span", {
                                                children: function(e) {
                                                    if (null === e || !Number.isFinite(e) || e < 0) return "\u2014";
                                                    if (e < 60) return _("%d seconds ago").replace("%d", String(e));
                                                    let t = Math.floor(e / 60);
                                                    if (t < 60) return _("%d minutes ago").replace("%d", String(t));
                                                    let r = Math.floor(t / 60);
                                                    return _("%d hours %d minutes ago").replace("%d", String(r)).replace("%d", String(t % 60));
                                                }(e.identity_age_seconds)
                                            })
                                        ]
                                    }, s("div", f))
                                ]
                            }, s("div", b)),
                            (k = {
                                class: "fttr-card",
                                children: [
                                    s("h4", {
                                        style: "margin-top:0;margin-bottom:6px;font-size:92%;color:#888",
                                        children: _("Hardware specifications and firmware images")
                                    }),
                                    (g = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Equipment ID")
                                            }),
                                            s("span", {
                                                children: t1(j?.equipment_id ?? e.model)
                                            })
                                        ]
                                    }, s("div", g)),
                                    (h = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Hardware version")
                                            }),
                                            s("code", {
                                                children: t1(j?.hardware_version ?? e.hardware_version)
                                            })
                                        ]
                                    }, s("div", h)),
                                    (v = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Firmware version")
                                            }),
                                            (m = {
                                                title: S.full || S.display,
                                                children: s("strong", {
                                                    children: S.display
                                                })
                                            }, s("span", m))
                                        ]
                                    }, s("div", v)),
                                    (y = {
                                        class: "fttr-kv-row",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("OMCC version")
                                            }),
                                            s("span", {
                                                children: j?.omcc_version != null ? `0x${j.omcc_version.toString(16).padStart(2, "0")} (${j.omcc_version})` : "\u2014"
                                            })
                                        ]
                                    }, s("div", y)),
                                    j?.errors.length ? (w = {
                                        class: "fttr-kv-row",
                                        style: "color:#e74c3c",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Identity read errors")
                                            }),
                                            s("span", {
                                                children: j.errors.join("; ")
                                            })
                                        ]
                                    }, s("div", w)) : null,
                                    O.length > 1 ? (x = {
                                        class: "fttr-kv-row",
                                        style: "font-size:80%;color:#888",
                                        children: [
                                            s("span", {
                                                class: "fttr-kv-label",
                                                children: _("Software images")
                                            }),
                                            s("span", {
                                                children: O.join(" \xb7 ")
                                            })
                                        ]
                                    }, s("div", x)) : null
                                ]
                            }, s("div", k))
                        ]
                    }, s("div", z))
                ]
            }, s("div", $);
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
    load: ()=>tf(),
    render: (e)=>{
        var r, n;
        let i, a, o, l, d, c, p, u, f;
        return i = "controller", t4 = !1, a = [
            {
                id: "controller",
                label: _("Controller & optical transceiver")
            },
            {
                id: "subgateways",
                label: _("Sub-gateways & optical links")
            }
        ], o = new Map(), l = t3(e), d = t6(e.sub_gateways ?? []), r = {
            class: "cbi-tabmenu",
            style: "margin-top:14px;margin-bottom:0",
            children: a.map((e)=>{
                var t;
                let r = (t = {
                    class: i === e.id ? "cbi-tab" : "cbi-tab-disabled",
                    "data-tab": e.id,
                    children: s("a", {
                        href: `#tab-${e.id}`,
                        onclick: (t)=>{
                            t.preventDefault();
                            var r = e.id;
                            for (let [e, t] of (i = r, o))t.className = e === r ? "cbi-tab" : "cbi-tab-disabled";
                            l.hidden = "controller" !== r, d.hidden = "subgateways" !== r, window.dispatchEvent(new Event("resize"));
                        },
                        children: e.label
                    })
                }, s("li", t));
                return o.set(e.id, r), r;
            })
        }, c = s("ul", r), l.hidden = !1, d.hidden = !0, void 0 !== e.optical_transceiver.tx_enabled ? t = e.optical_transceiver.tx_enabled : th().then((e)=>{
            t8(t = e.tx_enabled);
        }).catch(()=>{}), t5 = l, t8(t), p = s("div", {
            id: "fttr-panels-container",
            children: [
                l,
                d
            ]
        }), n = {
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
                p,
                s("p", {
                    class: "cbi-footer",
                    style: "margin-top:1.5em;font-size:85%;color:#888",
                    children: _("Identity information is read-only and limited to fields provided by fttrctl status.")
                })
            ]
        }, u = s("div", n), f = !1, L.Poll.add(async ()=>{
            if (u.isConnected && !f) {
                f = !0;
                try {
                    let e = await tf(), r = t3(e), n = t6(e.sub_gateways ?? []);
                    r.hidden = "controller" !== i, n.hidden = "subgateways" !== i, l.replaceWith(r), d.replaceWith(n), l = r, d = n, t5 = r, void 0 !== e.optical_transceiver.tx_enabled && (t = e.optical_transceiver.tx_enabled), t8(t);
                } catch  {} finally{
                    f = !1;
                }
            }
        }, 10), u;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;