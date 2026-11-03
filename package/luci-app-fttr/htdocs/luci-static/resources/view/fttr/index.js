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
function j(e, t, r) {
    let n = new e._zod.constr(t ?? e._zod.def);
    return (!t || r?.parent) && (n._zod.parent = e), n;
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
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = O(e.inst?._zod.def?.error?.(e)) ?? O(t?.error?.(e)) ?? O(r.customError?.(e)) ?? O(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
}
const P = (e, t)=>{
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
}, R = l("$ZodError", P), T = l("$ZodError", P, {
    Parent: Error
}), N = (r = T, (e, t, n, i)=>{
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
        let e = new (i?.Err ?? r)(o.issues.map((e)=>M(e, a, p())));
        throw y(e, i?.callee), e;
    }
    return o.value;
}), I = (n = T, async (e, t, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (i?.Err ?? n)(o.issues.map((e)=>M(e, a, p())));
        throw y(e, i?.callee), e;
    }
    return o.value;
}), A = (i = T, (e, t, r)=>{
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
        error: new (i ?? R)(a.issues.map((e)=>M(e, n, p())))
    } : {
        success: !0,
        data: a.value
    };
}), D = (a = T, async (e, t, r)=>{
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
        error: new a(i.issues.map((e)=>M(e, n, p())))
    } : {
        success: !0,
        data: i.value
    };
}), U = /^-?\d+(?:\.\d+)?$/, Z = /^(?:true|false)$/i, q = /^null$/i, B = {
    major: 4,
    minor: 3,
    patch: 6
}, F = l("$ZodType", (e, t)=>{
    var r;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = B;
    let n = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && n.unshift(e), n))for (let r of t._zod.onattach)r(e);
    if (0 === n.length) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, r)=>{
            let n, i = S(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, o = a._zod.check(e);
                if (o instanceof Promise && r?.async === !1) throw new d();
                if (n || o instanceof Promise) n = (n ?? Promise.resolve()).then(async ()=>{
                    await o, e.issues.length !== t && (i || (i = S(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = S(e, t));
                }
            }
            return n ? n.then(()=>e) : e;
        }, r = (r, i, a)=>{
            if (S(r)) return r.aborted = !0, r;
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
}), W = l("$ZodNumber", (e, t)=>{
    F.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? U, e._zod.parse = (r, n)=>{
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
    F.init(e, t), e._zod.pattern = Z, e._zod.parse = (r, n)=>{
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
}), K = l("$ZodNull", (e, t)=>{
    F.init(e, t), e._zod.pattern = q, e._zod.values = new Set([
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
}), G = l("$ZodUnknown", (e, t)=>{
    F.init(e, t), e._zod.parse = (e)=>e;
}), X = l("$ZodNever", (e, t)=>{
    F.init(e, t), e._zod.parse = (t, r)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function H(e, t, r) {
    e.issues.length && t.issues.push(...C(r, e.issues)), t.value[r] = e.value;
}
const Q = l("$ZodArray", (e, t)=>{
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
            s instanceof Promise ? a.push(s.then((t)=>H(t, r, e))) : H(s, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function Y(e, t, r, n, i) {
    if (e.issues.length) {
        if (i && !(r in n)) return;
        t.issues.push(...C(r, e.issues));
    }
    void 0 === e.value ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
const ee = l("$ZodObject", (e, t)=>{
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
            a instanceof Promise ? s.push(a.then((r)=>Y(r, t, e, o, i))) : Y(a, t, e, o, i);
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
                a instanceof Promise ? e.push(a.then((e)=>Y(e, r, i, t, c))) : Y(a, r, i, t, c);
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
function et(e, t, r, n) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let i = e.filter((e)=>!S(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>M(e, n, p())))
    }), t);
}
const er = l("$ZodUnion", (e, t)=>{
    F.init(e, t), h(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), h(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), h(e._zod, "values", ()=>{
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
        return o ? Promise.all(s).then((t)=>et(t, i, e, a)) : et(s, i, e, a);
    };
}), en = l("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, er.init(e, t);
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
}), ei = l("$ZodRecord", (e, t)=>{
    F.init(e, t), e._zod.parse = (r, n)=>{
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
                    t.issues.length && r.issues.push(...C(e, t.issues)), r.value[e] = t.value;
                })) : (o.issues.length && r.issues.push(...C(e, o.issues)), r.value[e] = o.value);
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
            if ("string" == typeof o && U.test(o) && s.issues.length) {
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
                    issues: s.issues.map((e)=>M(e, n, p())),
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
                e.issues.length && r.issues.push(...C(o, e.issues)), r.value[s.value] = e.value;
            })) : (l.issues.length && r.issues.push(...C(o, l.issues)), r.value[s.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), ea = l("$ZodEnum", (e, t)=>{
    var r;
    let n;
    F.init(e, t);
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
}), eo = l("$ZodLiteral", (e, t)=>{
    if (F.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
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
function es(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const el = l("$ZodOptional", (e, t)=>{
    F.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", h(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), h(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${b(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let n = t.innerType._zod.run(e, r);
            return n instanceof Promise ? n.then((t)=>es(t, e.value)) : es(n, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, r);
    };
}), ed = l("$ZodNullable", (e, t)=>{
    F.init(e, t), h(e._zod, "optin", ()=>t.innerType._zod.optin), h(e._zod, "optout", ()=>t.innerType._zod.optout), h(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${b(e.source)}|null)$`) : void 0;
    }), h(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, r)=>null === e.value ? e : t.innerType._zod.run(e, r);
}), ec = l("$ZodCatch", (e, t)=>{
    F.init(e, t), h(e._zod, "optin", ()=>t.innerType._zod.optin), h(e._zod, "optout", ()=>t.innerType._zod.optout), h(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, r)=>{
        if ("backward" === r.direction) return t.innerType._zod.run(e, r);
        let n = t.innerType._zod.run(e, r);
        return n instanceof Promise ? n.then((n)=>(e.value = n.value, n.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: n.issues.map((e)=>M(e, r, p()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = n.value, n.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: n.issues.map((e)=>M(e, r, p()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ep = l("$ZodLazy", (e, t)=>{
    F.init(e, t), h(e._zod, "innerType", ()=>t.getter()), h(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), h(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), h(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), h(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, r)=>e._zod.innerType._zod.run(t, r);
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
const eu = l("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    F.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>N(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>A(e, t, r), e.parseAsync = async (t, r)=>I(e, t, r, {
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
}), e_ = l("ZodMiniString", (e, t)=>{
    V.init(e, t), eu.init(e, t);
});
function ef(e) {
    return new e_({
        type: "string",
        ...$(e)
    });
}
const eb = l("ZodMiniNumber", (e, t)=>{
    W.init(e, t), eu.init(e, t);
});
function eg(e) {
    return new eb({
        type: "number",
        checks: [],
        ...$(e)
    });
}
const eh = l("ZodMiniBoolean", (e, t)=>{
    J.init(e, t), eu.init(e, t);
});
function em(e) {
    return new eh({
        type: "boolean",
        ...$(e)
    });
}
const ev = l("ZodMiniNull", (e, t)=>{
    K.init(e, t), eu.init(e, t);
});
function ey(e) {
    return new ev({
        type: "null",
        ...$(e)
    });
}
const ew = l("ZodMiniUnknown", (e, t)=>{
    G.init(e, t), eu.init(e, t);
});
function ex() {
    return new ew({
        type: "unknown"
    });
}
const ek = l("ZodMiniNever", (e, t)=>{
    X.init(e, t), eu.init(e, t);
});
function ez(e) {
    return new ek({
        type: "never",
        ...$(e)
    });
}
const ej = l("ZodMiniArray", (e, t)=>{
    Q.init(e, t), eu.init(e, t);
});
function e$(e, t) {
    return new ej({
        type: "array",
        element: e,
        ...$(t)
    });
}
const eS = l("ZodMiniObject", (e, t)=>{
    ee.init(e, t), eu.init(e, t), h(e, "shape", ()=>t.shape);
});
function eC(e, t) {
    return new eS({
        type: "object",
        shape: e ?? {},
        ...$(t)
    });
}
const eO = l("ZodMiniUnion", (e, t)=>{
    er.init(e, t), eu.init(e, t);
});
function eM(e, t) {
    return new eO({
        type: "union",
        options: e,
        ...$(t)
    });
}
const eE = l("ZodMiniDiscriminatedUnion", (e, t)=>{
    en.init(e, t), eu.init(e, t);
});
function eP(e, t, r) {
    return new eE({
        type: "union",
        options: t,
        discriminator: e,
        ...$(r)
    });
}
const eR = l("ZodMiniRecord", (e, t)=>{
    ei.init(e, t), eu.init(e, t);
});
function eT(e, t, r) {
    return new eR({
        type: "record",
        keyType: e,
        valueType: t,
        ...$(r)
    });
}
const eN = l("ZodMiniEnum", (e, t)=>{
    ea.init(e, t), eu.init(e, t), e.options = Object.values(t.entries);
});
function eL(e, t) {
    return new eN({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...$(t)
    });
}
const eI = l("ZodMiniLiteral", (e, t)=>{
    eo.init(e, t), eu.init(e, t);
});
function eA(e, t) {
    return new eI({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...$(t)
    });
}
const eD = l("ZodMiniOptional", (e, t)=>{
    el.init(e, t), eu.init(e, t);
});
function eU(e) {
    return new eD({
        type: "optional",
        innerType: e
    });
}
const eZ = l("ZodMiniNullable", (e, t)=>{
    ed.init(e, t), eu.init(e, t);
});
function eq(e) {
    return new eZ({
        type: "nullable",
        innerType: e
    });
}
const eB = l("ZodMiniCatch", (e, t)=>{
    ec.init(e, t), eu.init(e, t);
}), eF = l("ZodMiniLazy", (e, t)=>{
    ep.init(e, t), eu.init(e, t);
});
function eV() {
    let e = new eF({
        type: "lazy",
        getter: ()=>eM([
                ef(),
                eg(),
                em(),
                ey(),
                e$(e),
                eT(ef(), e)
            ])
    });
    return e;
}
const eW = eM([
    eA("account_set_password"),
    eA("account_set_active")
]), eJ = eC({
    id: ef(),
    name: ef()
});
eC({
    success: em(),
    output: eU(ef()),
    error: eU(ef())
});
const eK = eM([
    eA("factory"),
    eA("firmware"),
    eA("builtin")
]), eG = eC({
    detected: em(),
    device: ef(),
    has_data: em(),
    sha256: ef(),
    data: ef()
}), eX = eC({
    exists: em(),
    path: ef(),
    size: eg(),
    sha256: ef(),
    data: ef()
}), eH = eC({
    source: eK,
    active_path: ef(),
    size: eg(),
    sha256: ef(),
    data: ef(),
    factory: eG,
    firmware: eX
}), eQ = eC({
    error: ef()
});
eM([
    eH,
    eQ
]);
const eY = eC({
    success: em(),
    path: ef(),
    size: eg(),
    sha256: ef()
});
eM([
    eY,
    eQ
]), eC({
    data: ef()
});
const e0 = eC({
    acs: em(),
    mqtt: em(),
    npu: em(),
    "device-hl202": em(),
    "device-hwtc": em(),
    "device-star": em(),
    "device-zte": em()
}), e1 = eC({
    optical: em(),
    bridge_offload: em(),
    omci_mib: em(),
    mqtt_telemetry: em(),
    hl202_management: em(),
    cwmp: em(),
    command_provisioning: em()
}), e2 = eC({
    status: em(),
    config: em(),
    sync: em(),
    hardware: em(),
    calibration: em(),
    hl202: em(),
    about: em()
}), e5 = eC({
    schema_version: eA(1),
    version: ef(),
    features: e0,
    functions: e1,
    pages: e2,
    adapters: e$(eJ)
});
eM([
    eC({
        valid: em(),
        revision: ef(),
        devices: eg()
    }),
    eC({
        error: ef()
    })
]);
const e3 = eM([
    eA("auto"),
    eA("manual")
]), e4 = eA("diff"), e8 = eC({
    id: ef(),
    name: eM([
        ef(),
        ey()
    ]),
    template: ef()
}), e6 = eC({
    enabled: em(),
    mode: e3,
    method: e4,
    revision: ef(),
    triggers: e$(ef()),
    interval_minutes: eg(),
    error: eM([
        ef(),
        ey()
    ]),
    devices: e$(ex()),
    management_network: ex(),
    omci_management: ex(),
    groups: e$(e8),
    pending_devices: e$(ef())
});
eM([
    e6,
    eQ
]), eC({});
const e7 = eM([
    eC({
        optical_sn: ef(),
        onu_id: eg(),
        binding_generation: ef()
    }),
    eC({
        mqtt_mac: ef(),
        binding_generation: ef()
    })
]);
eC({
    target: e7
});
const e9 = eC({
    mqtt_mac: ef(),
    optical_sn: eM([
        ef(),
        ey()
    ]),
    onu_id: eM([
        eg(),
        ey()
    ]),
    binding_generation: ef(),
    last_seen: eg(),
    reason: ef()
}), te = eC({
    optical_sn: ef(),
    onu_id: eg(),
    model: ef(),
    optical_online: em(),
    can_execute: em(),
    mqtt: eM([
        e9,
        ey()
    ]),
    report_revision: eM([
        eg(),
        ey()
    ])
});
eC({
    target: e7,
    script: ef(),
    timeout_seconds: eg()
});
const tt = eC({
    code: ef(),
    message: ef()
});
eM([
    eC({
        schema_version: eA(1),
        devices: e$(te),
        sources: e$(e9)
    }),
    eC({
        schema_version: eg(),
        error: tt
    })
]), eC({
    target: e7
}), eC({
    target: e7,
    kind: eW,
    entry: eg(),
    password: ef(),
    active: em()
});
const tr = eA("pending"), tn = eC({
    phase: eM([
        eA("starting"),
        eA("upload"),
        eA("tables")
    ]),
    received: eg(),
    expected: eM([
        eg(),
        ey()
    ])
}), ti = eA("ready"), ta = eM([
    eC({
        status: tr,
        progress: eU(tn)
    }),
    eC({
        status: ti,
        chunk: eg(),
        chunks: eg(),
        bytes: eg(),
        data: ef()
    })
]);
eM([
    ta,
    eQ
]);
const to = eC({
    status: tr,
    job: ef()
}), ts = eC({
    released: em()
});
eC({
    job: ef()
}), eC({
    job: ef(),
    chunk: eg()
}), eM([
    to,
    eQ
]);
const tl = eC({
    accepting: em(),
    running: eg(),
    stored: eg(),
    bytes: eg(),
    running_limit: eg(),
    stored_limit: eg(),
    bytes_limit: eg(),
    result_bytes_limit: eg()
});
eC({
    onu_id: eg(),
    optical_sn: ef(),
    tables: em()
});
const td = eM([
    eC({
        status: eA("success"),
        enabled: em()
    }),
    eC({
        status: eA("error"),
        error: ef()
    })
]);
eC({
    enabled: em(),
    bridge: ef()
});
const tc = eC({
    index: ef(),
    state: ef(),
    pkt_type: ef(),
    orig_tuple: ef(),
    new_tuple: ef(),
    eth: ef(),
    vlan: ef(),
    packets: eg(),
    bytes: eg(),
    counters_valid: em(),
    packets_exact: ef(),
    bytes_exact: ef()
}), tp = eC({
    sampled_at_ms: eg(),
    errors: e$(ef()),
    config_valid: em(),
    engine_valid: em(),
    mask_valid: em(),
    routed_mask_valid: em(),
    debug_valid: em(),
    flows_valid: em(),
    entries_valid: em(),
    counters_valid: em(),
    hooks_valid: em(),
    total_packets_exact: ef(),
    total_bytes_exact: ef(),
    supported: em(),
    engine_attached: em(),
    bridge_offload_enabled: em(),
    bridge_offload_mask: eg(),
    routed_offload_mask: eg(),
    bridge_offload_debug: em(),
    bridge: ef(),
    active_ports: e$(ef()),
    fw4_hooks_ready: em(),
    total_entries: eg(),
    bound_entries: eg(),
    bound_ipv4_entries: eg(),
    bound_ipv6_entries: eg(),
    total_packets: eg(),
    total_bytes: eg(),
    bound_flows: e$(tc)
}), tu = eM([
    eA("plan"),
    eA("apply")
]), t_ = eM([
    eA("optical_on"),
    eA("optical_off"),
    eA("optical_status"),
    eA("optical_reload"),
    eA("optical_reinitialize"),
    eA("optical_shutdown")
]), tf = eM([
    eA("success"),
    eA("error")
]), tb = eM([
    eA("enabled"),
    eA("disabled"),
    eA("unknown")
]), tg = eC({
    schema_version: eA(1),
    status: tf,
    action: t_,
    desired_enabled: eM([
        em(),
        ey()
    ]),
    tx_enabled: eM([
        em(),
        ey()
    ]),
    actor_state: tb,
    hardware_ready: em(),
    discovery_active: em(),
    cleanup_pending: em(),
    error: eM([
        tt,
        ey()
    ])
});
eC({
    enabled: em()
}), eC({
    restarting: em()
});
const th = eC({
    calls: eg(),
    failures: eg(),
    last_us: eg(),
    max_us: eg(),
    total_us: eg()
});
eC({
    ubus: eU(eT(ef(), th)),
    jobs: eU(tl),
    onu_pinning: eU(ex()),
    fpga_status: ef(),
    provisioning: ex(),
    optical_transceiver: ex(),
    switch_ports: e$(ex()),
    sub_gateways: e$(ex()),
    telemetry_gateways: e$(ex()),
    npu: eU(ex()),
    ipc: eU(ex())
});
const tm = eM([
    eA("plan"),
    eA("apply"),
    eA("management_plan"),
    eA("management_apply"),
    eA("reset_state"),
    eA("reconcile"),
    eA("retry")
]);
eM([
    eC({
        operation_ids: e$(eg()),
        revision: ef()
    }),
    eC({
        started: em(),
        mode: tu
    }),
    eC({
        reset: em(),
        device: ef()
    }),
    eC({
        operation_ids: e$(eg()),
        mode: tu,
        reconcile: eU(em()),
        retry: eU(em())
    }),
    eQ
]), eC({
    action: tm,
    target: ef(),
    management: eU(em()),
    item: eU(ef())
});
let tv = ef(), ty = eg(), tw = em(), tx = eU(tv), tk = eU(ty), tz = eU(tw);
const tj = eL([
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
]), t$ = eL([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), tS = eC({
    id: tv,
    name: eU(eq(tv)),
    kind: eL([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: tv,
    state: tv,
    reason: tx,
    revision: tx,
    current_revision: tz,
    management_fresh: tz,
    operation_id: tk,
    task_id: eU(eq(ty)),
    updated_at: tk,
    changes: eU(e$(eC({
        name: tv,
        desired: tv
    })))
});
let tC = eC({
    state: tv,
    reason: tx,
    task_id: eU(eq(ty)),
    instance: tk
});
const tO = eC({
    cwmp_id: tv,
    state: eL([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: tw,
    last_inform: eq(ty),
    age_seconds: eq(ty)
});
let tM = eC({
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
    method: tx,
    reason: tx,
    mqtt_target: eq(tv),
    binding_source: tx,
    link_identity_error: eq(tv),
    mqtt_last_seen: eq(ty),
    cwmp_id: tx,
    desired_version: tx,
    generation: tk,
    inflight: tz,
    attempts: tk,
    next_retry_at: tk,
    updated_at: tk,
    settings_verified_at: eq(ty),
    last_inform: eq(ty),
    last_error: eU(eq(tv)),
    persistence_error: eU(eq(tv)),
    desired: eU(eq(eC({
        vlan: ty,
        vlans: e$(ty),
        priority: ty,
        acs_url: tv
    }))),
    listener: eU(eC({
        enabled: tw,
        listen: tv,
        path: tv,
        error: eq(tv)
    })),
    endpoint_notice: tx,
    manual_steps: eU(e$(tv))
});
const tE = eP("state", [
    tM,
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
        return j(e, n);
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
                    t[e] && (n[e] = eD ? new eD({
                        type: "optional",
                        innerType: r[e]
                    }) : r[e]);
                }
                else for(let e in r)n[e] = eD ? new eD({
                    type: "optional",
                    innerType: r[e]
                }) : r[e];
                return m(this, "shape", n), n;
            },
            checks: []
        });
        return j(e, n);
    }(tM), {
        state: eL([
            "pending",
            "unavailable"
        ]),
        reason: tv
    })
]), tP = eC({
    backend: eU(eC({
        configured: tv,
        effective: tv,
        available: e$(tv),
        reason: tv
    })),
    state: tj,
    operation_id: tk,
    device: tx,
    optical_sn: tx,
    cwmp_id: tx,
    revision: tx,
    mode: eU(eL([
        "apply",
        "plan"
    ])),
    started_at: tk,
    current_revision: tz,
    management_fresh: tz,
    reason: tx,
    error: tx,
    attempts: tk,
    next_retry_at: tk,
    reconcile_reason: tx,
    items: e$(tS),
    cwmp_contract: eU(eC({
        state: tv,
        requested: tv,
        contract: eq(tv),
        reason: tv,
        cache_hit: tw,
        schema: tv,
        capabilities: eq(eC({
            wan: tv,
            wlan: tv,
            binding: tv
        }))
    })),
    wan_objects: eU(eT(tv, eV())),
    wan_lifecycle: eU(eT(tv, tC)),
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
    wifi_objects: eU(eC({
        owned: e$(ty),
        pending: eq(tv),
        pending_instance: eq(ty)
    })),
    wifi_lifecycle: eU(eT(tv, tC)),
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
let tR = eC({
    enabled: tw,
    mode: eL([
        "auto",
        "manual"
    ]),
    vlan: e$(ty),
    priority: ty,
    address: tv,
    acs_url: tv,
    port: ty,
    path: tv,
    dhcp_enabled: tw
}), tT = eC({
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
    error: eq(tv),
    inflight: tw,
    ready: tw,
    desired_version: eq(tv),
    applied_version: eq(tv),
    next_retry_at: ty,
    attempts: ty,
    desired: eq(tR),
    applied: eq(tR),
    previous: eq(tR),
    plan: e$(eC({
        operation: tv,
        key: tv,
        value: e$(tv)
    }))
});
const tN = eC({
    device: tv,
    name: eq(tv),
    group: eq(tv),
    group_name: eq(tv),
    template: eq(tv),
    template_name: eq(tv),
    optical_sn: tv,
    adapter: tv,
    omci_management: eC({
        state: tv,
        reason: eU(eq(tv))
    }),
    management: eq(tO),
    acs_bootstrap: tE,
    provisioning: tP,
    services: e$(tS),
    ssids: e$(tS),
    wifi_sync: t$
}), tL = eC({
    enabled: tw,
    mode: eL([
        "auto",
        "manual"
    ]),
    method: eA("diff"),
    revision: tv,
    triggers: e$(tv),
    interval_minutes: new eb({
        type: "number",
        coerce: !0,
        checks: [],
        ...$(void 0)
    }),
    error: eq(tv),
    devices: e$(tN),
    management_network: tT,
    omci_management: eV(),
    groups: e$(eC({
        id: tv,
        name: eq(tv),
        template: tv
    })),
    pending_devices: e$(tv)
}), tI = eM([
    eC({
        valid: eA(!0),
        revision: tv,
        devices: ty,
        error: eU(ez())
    }),
    eC({
        error: tv,
        valid: eU(ez()),
        revision: eU(ez()),
        devices: eU(ez())
    })
]), tA = eC({
    restarting: eA(!0)
}), tD = eM([
    eC({
        operation_ids: e$(ty),
        revision: tv
    }),
    eC({
        started: eA(!0),
        mode: eL([
            "apply",
            "plan"
        ])
    }),
    eC({
        reset: eA(!0),
        device: tv
    }),
    eC({
        operation_ids: e$(ty),
        mode: eL([
            "apply",
            "plan"
        ]),
        reconcile: tz,
        retry: tz
    })
]);
let tU = ef(), tZ = eg(), tq = eq(tZ), tB = eT(tU, eC({
    source: tU,
    unit: tU,
    reason: eq(tU),
    raw: eq(tU),
    age_seconds: tq
}));
const tF = eC({
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
    generation: tZ,
    error: eq(tU)
}), tV = eL([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tW = eC({
    model: tU,
    wavelength_tx_nm: tZ,
    wavelength_rx_nm: tZ,
    phy_rate_downlink_gbps: tZ,
    phy_rate_uplink_gbps: tZ,
    tx_power_dbm: tq,
    laser_bias_current_ma: tq,
    temperature_celsius: tq,
    vcc_voltage: tq,
    cdr_locked: eq(em()),
    tx_enabled: eq(em()),
    measurements: tB
}), tJ = eC({
    equipment_id: eq(tU),
    hardware_version: eq(tU),
    software_images: e$(tU),
    omcc_version: tq,
    errors: e$(tU)
});
const tK = eC({
    onu_id: tZ,
    vendor: tU,
    model: tU,
    serial_number: tU,
    state: tV,
    business_status: tF,
    management: eq(tO),
    provisioning: eq(tP),
    services: e$(tS),
    ssids: e$(tS),
    wifi_sync: t$,
    acs_bootstrap: eU(tE),
    identity: eq(tJ),
    identity_age_seconds: tq,
    identity_current: em(),
    fiber_distance_m: tq,
    ranging_delay_rtd_ns: tq,
    equalization_delay_bits: new eB({
        type: "catch",
        innerType: tq,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tq,
    optical_tx_power_dbm: tq,
    firmware_version: tU,
    hardware_version: tU,
    uptime_seconds: tq,
    data_path: eC({
        interface: tU,
        gem_ports: eq(e$(tZ)),
        vlan_id: tq,
        tx_bytes: tq,
        rx_bytes: tq,
        current_tx_kbps: tq,
        current_rx_kbps: tq,
        offload: eU(eC({
            enabled: eU(eq(em())),
            routed_enabled: eU(eq(em())),
            bridge_enabled: eU(eq(em())),
            engine_attached: eU(eq(em())),
            forwarding_verified: eU(eq(em()))
        })),
        measurements: tB
    }),
    wifi_mesh: eC({
        channel_2g: tq,
        channel_5g: tq,
        bandwidth_5g: eq(tU),
        tx_power_pct: tq,
        measurements: tB
    }),
    connected_clients: eq(e$(eC({
        mac: tU,
        ip: tU,
        band: tU,
        rssi_dbm: tq,
        rx_rate_mbps: tq,
        tx_rate_mbps: tq
    }))),
    measurements: tB
});
let tG = eC({
    reserved_sn: eU(tU),
    port: tZ,
    interface: tU,
    carrier: em(),
    status: tU,
    onu_id: eU(tZ),
    onu_sn: eU(tU),
    link_state: tU
});
const tX = eC({
    counters_valid: eU(em()),
    packets_exact: eU(tU),
    bytes_exact: eU(tU),
    index: tU,
    state: tU,
    pkt_type: tU,
    orig_tuple: tU,
    new_tuple: tU,
    eth: tU,
    vlan: tU,
    packets: tZ,
    bytes: tZ
}), tH = eC({
    sampled_at_ms: eU(tZ),
    errors: eU(e$(tU)),
    config_valid: eU(em()),
    engine_valid: eU(em()),
    mask_valid: eU(em()),
    routed_mask_valid: eU(em()),
    debug_valid: eU(em()),
    flows_valid: eU(em()),
    entries_valid: eU(em()),
    counters_valid: eU(em()),
    hooks_valid: eU(em()),
    total_packets_exact: eU(tU),
    total_bytes_exact: eU(tU),
    supported: em(),
    engine_attached: em(),
    bridge_offload_enabled: em(),
    bridge_offload_mask: tZ,
    routed_offload_mask: tZ,
    bridge_offload_debug: em(),
    bridge: tU,
    active_ports: e$(tU),
    fw4_hooks_ready: em(),
    total_entries: tZ,
    bound_entries: tZ,
    total_packets: tZ,
    total_bytes: tZ,
    bound_flows: e$(tX)
}), tQ = eC({
    ubus: eU(eT(tU, th)),
    jobs: eU(tl),
    onu_pinning: eU(eC({
        desired: eT(tU, tZ),
        active: eT(tU, tZ),
        pending_restart: em(),
        allocation_blocked: em(),
        startup_error: eq(tU),
        config_error: eq(tU)
    })),
    fpga_status: tU,
    provisioning: eq(tL),
    optical_transceiver: tW,
    switch_ports: e$(tG),
    sub_gateways: e$(tK),
    telemetry_gateways: e$(eC({
        id: tU,
        last_seen_sec_ago: tZ,
        last_payload_bytes: tZ
    })),
    npu: eU(eq(tH))
}), tY = eT(tU, eC({
    carrier: eU(em()),
    mac: eU(tU),
    link: eU(eC({
        speed: eU(tZ),
        duplex: eU(tU),
        autoneg: eU(em())
    })),
    stats: eU(eT(tU, tZ))
})), t0 = (e)=>null == e || "" === e ? "\u2014" : String(e);
function t1(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
    return null != e && Number.isFinite(e) ? `${e.toFixed(t)} dBm` : "\u2014";
}
function t2(e) {
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
function t5(e) {
    return void 0 === e || !Number.isFinite(e) || e < 0 ? "\u2014" : e < 1000 ? `${e} Pkts.` : `${(e / 1000).toFixed(2)} KPkts.`;
}
function t3(e) {
    let t = "none" === e.tone ? "" : `fttr-badge fttr-badge-${e.tone}`, r = e.class ? ` ${e.class}` : "", n = s("span", {
        class: `${t}${r}`.trim(),
        children: e.children
    });
    return e.title && n.setAttribute("title", e.title), n;
}
function t4(e, t, r, n) {
    e.textContent = r, "none" === t ? e.className = "" : e.className = `fttr-badge fttr-badge-${t}`, n ? e.setAttribute("title", n) : e.removeAttribute("title");
}
const t8 = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
};
function t6(e) {
    return e ? "o5_operation" === e ? {
        tone: "success",
        label: t8.o5_operation,
        title: e
    } : {
        tone: "warning",
        label: t8[e] ?? t0(e),
        title: e
    } : {
        tone: "none",
        label: "\u2014"
    };
}
function t7(e) {
    let t = t6(e.state);
    return s(t3, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
function t9(e) {
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
function re(e) {
    let t = t9(e.status);
    return s(t3, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
const rt = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
};
function rr(e) {
    let t = e?.state, r = function(e) {
        if (null == e || !Number.isFinite(e) || e < 0) return null;
        let t = Math.floor(e);
        if (t < 60) return (1 === t ? _("%d second ago") : _("%d seconds ago")).replace("%d", String(t));
        let r = Math.floor(t / 60);
        if (r < 60) return (1 === r ? _("%d minute ago") : _("%d minutes ago")).replace("%d", String(r));
        let n = Math.floor(t / 3600);
        if (n < 24) return (1 === n ? _("%d hour ago") : _("%d hours ago")).replace("%d", String(n));
        let i = Math.floor(t / 86400);
        return (1 === i ? _("%d day ago") : _("%d days ago")).replace("%d", String(i));
    }(e?.age_seconds ?? (e?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - e.last_inform) : null)), n = e?.last_inform ? new Date(1000 * e.last_inform).toLocaleString() : null, i = n ? _("Last Inform: %s").replace("%s", n) : void 0, a = "\u2014", o = "none";
    return "online" === t ? (o = "success", a = rt.online) : "waiting_inform" === t ? (o = "warning", a = rt.waiting_inform) : "offline_or_stale" === t ? (o = "danger", a = rt.offline_or_stale) : t && (o = "neutral", a = t0(t)), {
        tone: o,
        label: r && t ? `${a} \xb7 ${r}` : a,
        title: i
    };
}
function rn(e) {
    let t = rr(e.management);
    return s(t3, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
const ri = {
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
function ra(e, t) {
    let r = e?.state, n = e?.next_retry_at && e.next_retry_at > Math.floor(Date.now() / 1000) ? e.next_retry_at - Math.floor(Date.now() / 1000) : 0, i = t ?? (e?.current_revision === !1 ? _("Previous configuration") : e?.management_fresh === !1 ? _("Management stale") : e?.reconcile_reason ? e.reconcile_reason : n > 0 ? _("Next self-healing retry in %d seconds").replace("%d", String(n)) : e?.reason ?? e?.error);
    return r && "not_started" !== r ? "completed" === r || "verified" === r ? {
        tone: "success",
        label: "completed" === r ? ri.completed : _("Ready"),
        title: i
    } : "wan_reconciling" === r || "wan_verifying" === r || "wifi_reconciling" === r || "discovering" === r || "reading" === r || "disabling" === r || "disabling_read" === r || "writing" === r || "verifying" === r || "settling" === r || "recovering" === r || "waiting_task" === r ? {
        tone: "info",
        label: ri[r] ?? t0(r),
        title: i
    } : "interrupted" === r || "failed" === r || "error" === r || "blocked" === r ? {
        tone: "danger",
        label: "blocked" === r ? ri.blocked : ri.interrupted,
        title: i
    } : "waiting" === r || "pending" === r || "waiting_management" === r || "reset_pending" === r ? {
        tone: "warning",
        label: ri[r] ?? ri.waiting,
        title: i
    } : {
        tone: "neutral",
        label: t0(r),
        title: i
    } : {
        tone: "neutral",
        label: ri.not_started,
        title: i
    };
}
function ro(e) {
    let t = ra(e.provisioning, e.title);
    return s(t3, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
const rs = {
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
function rl(e) {
    return e && "not_configured" !== e ? "verified" === e ? {
        tone: "success",
        label: rs.verified
    } : "attention_required" === e ? {
        tone: "danger",
        label: rs.attention_required
    } : "stale_revision" === e || "stale_management" === e || "waiting_management" === e ? {
        tone: "warning",
        label: rs[e]
    } : "recovering" === e ? {
        tone: "info",
        label: rs.recovering
    } : "accepted_unverified" === e || "pending" === e ? {
        tone: "warning",
        label: rs[e]
    } : {
        tone: "neutral",
        label: t0(e)
    } : {
        tone: "neutral",
        label: rs.not_configured
    };
}
function rd(e) {
    let t = rl(e.state);
    return s(t3, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
const rc = `
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
let rp = eC({
    error: eM([
        ef(),
        eC({
            code: ef(),
            message: ef()
        })
    ])
});
class ru extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function r_(e) {
    let t = rp.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new ru("rpc", e) : new ru(e.code, e.message);
    }
    return e;
}
let rf = ef(), rb = eg(), rg = em();
eC({
    optical_sn: rf,
    onu_id: rb,
    binding_generation: rf
}), eC({
    mqtt_mac: rf,
    binding_generation: rf
});
let rh = eC({
    mqtt_mac: rf,
    optical_sn: eq(rf),
    onu_id: eq(rb),
    binding_generation: rf,
    last_seen: rb,
    reason: rf
}), rm = {
    target: rf,
    request_id: eU(rf),
    output: eU(rf),
    output_truncated: rg,
    error: eU(rf)
};
const rv = eP("status", [
    eC({
        ...rm,
        status: eA("executed"),
        exit_code: eq(rb)
    }),
    eC({
        ...rm,
        status: eA("dispatched"),
        exit_code: eU(ez())
    }),
    eC({
        ...rm,
        status: eA("timeout"),
        exit_code: eU(ez())
    }),
    eC({
        ...rm,
        status: eA("error"),
        exit_code: eU(ez())
    })
]);
let ry = eC({
    target: rh,
    result: rv,
    binding_current: rg
}), rw = eC({
    schema_version: rb,
    compressed_bytes: rb,
    decompressed_bytes: rb,
    fields: eT(rf, eC({
        value: eV(),
        member: rf,
        unit: eq(rf)
    })),
    members: e$(eC({
        name: rf,
        bytes: rb,
        encoding: rf,
        text: eq(rf),
        text_omitted: rg
    })),
    errors: e$(rf)
}), rx = eC({
    revision: rb,
    last_received: rb,
    last_processed_receipt: eq(rb),
    last_good: eq(rb),
    error: eq(rf),
    report: eq(rw)
}), rk = {
    schema_version: eA(1),
    target: rh,
    report: eq(rx)
};
eM([
    eC({
        ...rk,
        state: eL([
            "received",
            "report_unavailable"
        ])
    }),
    eC({
        ...rk,
        read_only: eA(!0)
    })
]);
const rz = eC({
    schema_version: eA(1),
    devices: e$(eC({
        optical_sn: rf,
        onu_id: rb,
        model: rf,
        optical_online: rg,
        can_execute: rg,
        mqtt: eq(rh),
        report_revision: eq(rb)
    })),
    sources: e$(rh)
});
eC({
    schema_version: eA(1),
    operation: ry,
    accounts: eq(e$(eC({
        entry: eM([
            eA(0),
            eA(1),
            eA(2)
        ]),
        username: rf,
        active: rg
    }))),
    write_status: eL([
        "not_applicable",
        "accepted_and_saved",
        "unconfirmed"
    ])
}), eC({
    schema_version: eA(1),
    operation: ry
});
const rj = {
    getCapabilities: {
        parse: (e)=>e5.parse(r_(e))
    },
    opticalStatus: tg,
    opticalSet: tg,
    getStatus: {
        parse: (e)=>tQ.parse(r_(e))
    },
    getSync: {
        parse: (e)=>tL.parse(r_(e))
    },
    configCheck: tI,
    npuStatus: tp,
    configReload: {
        parse: (e)=>tL.parse(r_(e))
    },
    restartService: {
        parse: (e)=>tA.parse(r_(e))
    },
    sync: {
        parse: (e)=>tD.parse(r_(e))
    },
    npuSet: td,
    mibStart: {
        parse: (e)=>to.parse(r_(e))
    },
    mibResult: {
        parse: (e)=>ta.parse(r_(e))
    },
    jobRelease: {
        parse: (e)=>ts.parse(r_(e))
    },
    hl202List: {
        parse: (e)=>rz.parse(r_(e))
    },
    hl202Report: {
        parse: (e)=>to.parse(r_(e))
    },
    hl202AccountsStart: {
        parse: (e)=>to.parse(r_(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>to.parse(r_(e))
    },
    hl202ExecStart: {
        parse: (e)=>to.parse(r_(e))
    },
    jobResult: {
        parse: (e)=>ta.parse(r_(e))
    },
    getCalibration: {
        parse: (e)=>eH.parse(r_(e))
    },
    saveCalibration: {
        parse: (e)=>eY.parse(r_(e))
    },
    applyCalibration: {
        parse: (e)=>to.parse(r_(e))
    }
};
function r$() {
    var e;
    let r, n, i, a, o, s, l, d, c, p, u, f, b, g, h, m, v, y, w, x, k, z, j;
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
    }), o = e.declare({
        object: "fttr",
        method: "get_sync",
        reject: !0
    }), s = e.declare({
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
        getCapabilities: async ()=>rj.getCapabilities.parse(await r()),
        opticalStatus: async ()=>rj.opticalStatus.parse(await n()),
        opticalSet: async (e)=>rj.opticalSet.parse(await i(e.enabled)),
        getStatus: async ()=>rj.getStatus.parse(await a()),
        getSync: async ()=>rj.getSync.parse(await o()),
        configCheck: async ()=>rj.configCheck.parse(await s()),
        npuStatus: async ()=>rj.npuStatus.parse(await l()),
        configReload: async ()=>rj.configReload.parse(await d()),
        restartService: async ()=>rj.restartService.parse(await c()),
        sync: async (e)=>rj.sync.parse(await p(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>rj.npuSet.parse(await u(e.enabled, e.bridge)),
        mibStart: async (e)=>rj.mibStart.parse(await f(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>rj.mibResult.parse(await b(e.job, e.chunk)),
        jobRelease: async (e)=>rj.jobRelease.parse(await g(e.job)),
        hl202List: async ()=>rj.hl202List.parse(await h()),
        hl202Report: async (e)=>rj.hl202Report.parse(await m(e.target)),
        hl202AccountsStart: async (e)=>rj.hl202AccountsStart.parse(await v(e.target)),
        hl202AccountUpdate: async (e)=>rj.hl202AccountUpdate.parse(await y(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>rj.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>rj.jobResult.parse(await x(e.job, e.chunk)),
        getCalibration: async ()=>rj.getCalibration.parse(await k()),
        saveCalibration: async (e)=>rj.saveCalibration.parse(await z(e.data)),
        applyCalibration: async ()=>rj.applyCalibration.parse(await j())
    });
}
let rS = L.rpc.declare({
    object: "luci-rpc",
    method: "getNetworkDevices",
    expect: {
        "": {}
    },
    reject: !0
});
const rC = async ()=>r$().getStatus(), rO = async ()=>r$().configReload(), rM = async ()=>tY.parse(r_(await rS()));
let rE = ef(), rP = eg(), rR = em(), rT = eC({
    id: rE,
    url: rE
}), rN = eC({
    name: rE,
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
    index: rP,
    mask: rP,
    size: rP,
    read: rR,
    write: rR,
    set_by_create: rR,
    avc: rR,
    optional: rR,
    deprecated: rR,
    default_hex: eq(rE),
    reference: rT
}), rL = eP("type", [
    eC({
        type: eA("unsigned"),
        value: rP
    }),
    eC({
        type: eA("signed"),
        value: rP
    }),
    eC({
        type: eA("decimal"),
        value: rE
    }),
    eC({
        type: eA("text"),
        value: eq(rE)
    }),
    eC({
        type: eA("octets"),
        hex: rE
    }),
    eC({
        type: eA("table_length"),
        bytes: rP
    })
]), rI = eC({
    code: rE,
    message: rE,
    offset: rP,
    mask: rP
}), rA = eL([
    "layout",
    "name_only",
    "unknown"
]), rD = eC({
    raw_hex: rE,
    filter_outer_priority: rP,
    filter_outer_vid: rP,
    filter_outer_tpid_dei: rP,
    filter_inner_priority: rP,
    filter_inner_vid: rP,
    filter_inner_tpid_dei: rP,
    filter_ethertype: rP,
    tags_to_remove: rP,
    treatment_outer_priority: rP,
    treatment_outer_vid: rP,
    treatment_outer_tpid_dei: rP,
    treatment_inner_priority: rP,
    treatment_inner_vid: rP,
    treatment_inner_tpid_dei: rP,
    delete_entry: rR
}), rU = eC({
    schema_version: eA(1),
    reference_version: rE,
    onu_id: eq(rP),
    uploaded_complete: rR,
    expected_records: rP,
    received_records: rP,
    decoded_records: rP,
    partial_records: rP,
    basic_records: rP,
    tables_requested: rR,
    tables_collected: rR,
    classes: e$(eC({
        class_id: rP,
        name: eq(rE),
        entities: rP,
        records: rP,
        support: rA
    })),
    entities: e$(eC({
        class_id: rP,
        entity_id: rP,
        name: eq(rE),
        support: rA,
        reference: eq(rT),
        sequences: e$(rP),
        attributes: e$(eC({
            definition: rN,
            value: eq(rL),
            observations: e$(eC({
                raw_hex: rE,
                value: rL,
                sequences: e$(rP)
            }))
        })),
        diagnostics: e$(rI)
    })),
    records: e$(eC({
        class_id: rP,
        entity_id: rP,
        sequence: rP,
        attribute_mask: rP,
        raw_hex: rE,
        consumed: rP,
        remaining_hex: rE,
        undecoded_mask: rP
    })),
    tables: e$(eC({
        class_id: rP,
        entity_id: rP,
        attribute: rN,
        collected: rR,
        error: eq(rE),
        raw_hex: rE,
        rows: e$(rE),
        vlan_rules: e$(rD)
    })),
    diagnostics: e$(rI)
});
const rZ = eC({
    status: eA("ready"),
    report: rU
}), rq = async (e, t, r)=>r$().mibStart({
        onu_id: e,
        optical_sn: t,
        tables: r
    }), rB = async (e, t)=>r$().mibResult({
        job: e,
        chunk: t
    }), rF = async (e)=>r$().jobRelease({
        job: e
    });
let rV = (e)=>JSON.stringify(e, null, 2);
async function rW(e) {
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
function rJ(e) {
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
let rK = L.rpc.declare({
    object: "uci",
    method: "get",
    params: [
        "config",
        "type"
    ],
    reject: !0
}), rG = L.rpc.declare({
    object: "uci",
    method: "changes",
    params: [
        "config"
    ],
    reject: !0
}), rX = L.rpc.declare({
    object: "uci",
    method: "set",
    params: [
        "config",
        "section",
        "values"
    ],
    reject: !0
}), rH = L.rpc.declare({
    object: "uci",
    method: "delete",
    params: [
        "config",
        "section",
        "option"
    ],
    reject: !0
}), rQ = L.rpc.declare({
    object: "uci",
    method: "commit",
    params: [
        "config"
    ],
    reject: !0
}), rY = !1;
async function r0(e, t, r) {
    if (!L.hasViewPermission() || !t || rY) return;
    let n = e.serial_number.toUpperCase(), i = t.desired[n], a = void 0 !== i, o = a ? i : e.onu_id, l = a ? _("Unpin interface") : _("Pin interface");
    try {
        var d, c, p, u, f, b, g, h, m, v, y, w, x, k, z, j;
        let { values: e } = await rK("fttr", "device"), t = (e)=>Object.entries(e).find((e)=>{
                let [, t] = e;
                return "device" === t[".type"] && t.optical_sn?.toUpperCase() === n;
            }), $ = t(e);
        if (!$) return void L.ui.showModal(l, (g = {
            children: [
                (d = {
                    children: _("Add this device on the configuration page before fixing its interface.")
                }, s("p", d)),
                (p = {
                    children: (c = {
                        children: n
                    }, s("code", c))
                }, s("p", p)),
                (b = {
                    class: "right",
                    children: [
                        (u = {
                            type: "button",
                            class: "cbi-button",
                            onclick: ()=>L.ui.hideModal(),
                            children: _("Cancel")
                        }, s("button", u)),
                        " ",
                        (f = {
                            class: "cbi-button cbi-button-action",
                            href: L.url("admin", "network", "fttr", "config"),
                            children: _("Configuration")
                        }, s("a", f))
                    ]
                }, s("div", b))
            ]
        }, s("div", g)));
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
                if (rY) return;
                rY = !0, O.disabled = C.disabled = !0, S.textContent = "";
                let e = !1;
                try {
                    var n;
                    if ((await rG("fttr")).changes.length) throw Error(_("Apply or discard pending FTTR configuration changes first."));
                    let l = (await rK("fttr", "device")).values, d = t(l);
                    if (!d || d[0] !== $[0] || d[1].onu_id !== $[1].onu_id || (null == d[1].onu_id ? void 0 : Number(d[1].onu_id)) !== i) throw Error(_("Interface configuration changed. Refresh the page and try again."));
                    if (!a && Object.entries(l).some((e)=>{
                        let [t, r] = e;
                        return t !== d[0] && "device" === r[".type"] && null != r.onu_id && Number(r.onu_id) === o;
                    })) throw Error(_("Interface already reserved by another device."));
                    a ? await rH("fttr", d[0], "onu_id") : await rX("fttr", d[0], {
                        onu_id: String(o)
                    }), await rQ("fttr"), e = !0, await rO(), r(await rC()), L.ui.hideModal(), L.ui.addNotification(null, (n = {
                        children: _("Interface setting saved. Restart FTTR for it to take effect.")
                    }, s("p", n)), "info");
                } catch (t) {
                    S.textContent = `${e ? _("Saved, but configuration reload or status refresh failed:") : _("Failed to save interface setting:")} ${String(t)}`;
                } finally{
                    rY = !1, O.disabled = e, C.disabled = !1;
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
                            children: n
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
let r1 = L.view, r2 = L.Poll;
function r5(e, t) {
    var r, n, i;
    let a, l = e, d = s("button", {
        type: "button",
        class: "cbi-button cbi-button-neutral",
        style: "padding:0 .4em;min-height:1.5em;font-size:85%;margin-left:.5em",
        onclick: ()=>r0(l, a, t)
    }), c = s("span", {}), p = s("span", {}), u = s("span", {}), f = s("code", {
        style: "font-size:90%"
    }), b = s("span", {
        class: "fttr-badge"
    }), g = s("span", {
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
    }), x = (i = {
        "data-fttr-onu-id": String(e.onu_id),
        children: [
            s("td", {
                children: [
                    c,
                    d
                ]
            }),
            s("td", {
                children: p
            }),
            s("td", {
                children: u
            }),
            s("td", {
                children: f
            }),
            s("td", {
                children: b
            }),
            s("td", {
                children: g
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
            (n = {
                style: "text-align:right",
                children: (r = {
                    type: "button",
                    class: "cbi-button cbi-button-neutral",
                    onclick: ()=>(function(e) {
                            var t, r, n, i, a, l, d, c, p, u, f, b;
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
                                                s(t7, {
                                                    state: e.state
                                                })
                                            ],
                                            [
                                                _("Business"),
                                                s(re, {
                                                    status: e.business_status
                                                })
                                            ],
                                            [
                                                _("Receive optical power"),
                                                t1(e.optical_rx_power_dbm)
                                            ],
                                            [
                                                _("Transmit optical power"),
                                                t1(e.optical_tx_power_dbm)
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
                                                s(rn, {
                                                    management: e.management
                                                })
                                            ],
                                            [
                                                _("Last Inform"),
                                                e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
                                            ],
                                            [
                                                _("Provisioning"),
                                                s(ro, {
                                                    provisioning: e.provisioning
                                                })
                                            ],
                                            [
                                                _("Wi-Fi sync"),
                                                s(rd, {
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
                                                                    children: n instanceof Node ? n : t0(n)
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
                            }, s("div", n)), z = s("div", {}), j = s("pre", {
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
                                            let t = await rW(v);
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
                                                    C,
                                                    $
                                                ]
                                            })
                                        ]
                                    }, s("div", i)),
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
                            }), R = (c = {
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
                            }, s("div", c)), T = {
                                basic: w,
                                mib: R,
                                raw: O
                            }, N = new Map();
                            function I(e) {
                                for (let [t, r] of Object.entries(T))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                                for (let [t, r] of N)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
                            }
                            let A = (p = {
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
                                                t.preventDefault(), I(e.id);
                                            },
                                            children: e.label
                                        })
                                    }, s("li", t));
                                    return N.set(e.id, r), r;
                                })
                            }, s("ul", p)), D = (b = {
                                children: [
                                    s("div", {
                                        class: "onu-details-header",
                                        children: A
                                    }),
                                    (u = {
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
				${rc}
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
                                            R,
                                            O
                                        ]
                                    }, s("div", u)),
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
                            }, s(o, b)), U = ()=>!h && D.isConnected && D.getClientRects().length > 0;
                            async function Z(t) {
                                if (!m) {
                                    m = !0, M.disabled = P.disabled = !0, k.style.display = "", k.title = "0%", k.firstElementChild.style.width = "0%", x.textContent = _("Reading MIB\u2026");
                                    try {
                                        let m = await rC(), w = m.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                        if (w?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                        if (!U()) return;
                                        let $ = await rq(w.onu_id, w.serial_number, t);
                                        y = $.job;
                                        let S = Date.now() + 140000;
                                        for(; U();){
                                            let e = await rB($.job, 0);
                                            if (!U()) return;
                                            if ("ready" === e.status) {
                                                var r, n, i, a, o, l, d, c, p, u, f, b, g, h;
                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                let t = new Uint8Array(e.bytes), m = 0;
                                                for(let r = 0; r < e.chunks; r++){
                                                    let n = 0 === r ? e : await rB($.job, r);
                                                    if (!U()) return;
                                                    if ("ready" !== n.status || n.chunk !== r || n.chunks !== e.chunks || n.bytes !== e.bytes || !n.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                    let i = atob(n.data);
                                                    if (i.length > 32768 || m + i.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                    for(let e = 0; e < i.length; e++)t[m++] = i.charCodeAt(e);
                                                    let a = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                                    k.title = `${a}%`, k.firstElementChild.style.width = `${a}%`, x.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                                }
                                                if (m !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                if (await q(), v = rZ.parse(r_(JSON.parse(new TextDecoder("utf-8", {
                                                    fatal: !0
                                                }).decode(t)))).report, 1 !== v.schema_version || v.onu_id !== w.onu_id) throw Error(_("Unexpected MIB response"));
                                                k.style.display = "none", x.replaceChildren((r = v, f = {
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
                                                }, s("div", f))), z.replaceChildren(function(e) {
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
                                                                                        children: t0(r.name)
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
                                                                                                                            return t0(e.value);
                                                                                                                        case "octets":
                                                                                                                            return t0(e.hex);
                                                                                                                        case "table_length":
                                                                                                                            return t0(e.bytes);
                                                                                                                        default:
                                                                                                                            throw new ru("unexpected_variant", `Unexpected variant: ${String(e)}`);
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
                                                                                                                        children: rV(e.observations)
                                                                                                                    }, s("pre", o))
                                                                                                                ]
                                                                                                            }, s("details", l)) : null
                                                                                                        ]
                                                                                                    }, s("td", d)),
                                                                                                    (c = {
                                                                                                        class: "mib-attr-ref",
                                                                                                        children: rJ(e.definition)
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
                                                                                                e.collected ? `${e.rows.length} ${_("rows")}` : t0(e.error)
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
                                                                                                                        children: t0(e.filter_ethertype)
                                                                                                                    }, s("td", n)),
                                                                                                                    (i = {
                                                                                                                        children: t0(e.tags_to_remove)
                                                                                                                    }, s("td", i)),
                                                                                                                    (a = {
                                                                                                                        children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                                    }, s("td", a)),
                                                                                                                    (o = {
                                                                                                                        children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                                    }, s("td", o)),
                                                                                                                    (l = {
                                                                                                                        children: t0(e.delete_entry)
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
                                                                                                rJ(e.attribute)
                                                                                            ]
                                                                                        }, s("p", g)),
                                                                                        (h = {
                                                                                            class: "mib-pre",
                                                                                            children: rV(e.vlan_rules.length ? e.vlan_rules : e.rows)
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
                                                                                        children: rV({
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
                                                }(v), (h = {
                                                    class: "mib-upload-diagnostics",
                                                    children: [
                                                        (b = {
                                                            children: _("Upload diagnostics")
                                                        }, s("summary", b)),
                                                        (g = {
                                                            class: "mib-pre",
                                                            children: rV(v.diagnostics)
                                                        }, s("pre", g))
                                                    ]
                                                }, s("details", h))), n = v, j.textContent = rV({
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
                                                if (x.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == n ? "" : `: ${r}/${n}`}` : null == n ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${n}`, n && n > 0) {
                                                    let e = Math.min(100, Math.round(r / n * 100));
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
                                        await q(), m = !1, M.disabled = P.disabled = !1;
                                    }
                                }
                            }
                            async function q() {
                                if (!y) return;
                                let e = y;
                                y = null;
                                try {
                                    await rF(e);
                                } catch (e) {
                                    console.warn("Failed to release MIB snapshot", e);
                                }
                            }
                            I(g), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, D, "modal-wide");
                        })(l),
                    children: _("Details")
                }, s("button", r))
            }, s("td", n))
        ]
    }, s("tr", i));
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
            let r = e.serial_number.toUpperCase(), n = t?.desired[r];
            d.textContent = void 0 !== n ? _("Unpin") : _("Pin"), d.hidden = !t, d.disabled = !L.hasViewPermission(), d.title = n !== t?.active[r] ? _("Pending restart") : void 0 !== n ? _("Fixed interface") : _("Pin interface"), x.setAttribute("data-fttr-onu-id", String(e.onu_id)), c.textContent = String(e.onu_id), p.textContent = t0(e.vendor), u.textContent = t0(e.identity?.equipment_id ?? e.model), f.textContent = t0(e.serial_number);
            let i = t6(e.state);
            t4(b, i.tone, i.label, i.title);
            let o = t9(e.business_status);
            t4(g, o.tone, o.label, o.title);
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
            h.textContent = s.display, s.full ? h.setAttribute("title", s.full) : h.removeAttribute("title"), m.textContent = t0(e.data_path?.interface);
            let k = rr(e.management);
            t4(v, k.tone, k.label, k.title);
            let z = ra(e.provisioning);
            t4(y, z.tone, z.label, z.title);
            let j = rl(e.wifi_sync);
            t4(w, j.tone, j.label, j.title);
        }
    };
    return k.update(e), k;
}
let r3 = null, r4 = null, r8 = !1;
const main = r1.extend({
    async load () {
        let [e, t] = await Promise.all([
            rC(),
            rM().catch((e)=>(console.warn("Failed to load network device details", e), {}))
        ]);
        return {
            status: e,
            devices: t
        };
    },
    render (e) {
        var t, r, n, i, a, o, l, d, c, p, u, f, b, g;
        let h, m, v, y, w, x, k, z, j, $, S, C, O, M, P;
        return t = e.status, r = e.devices, h = t.optical_transceiver ?? {}, m = r, v = function(e, t) {
            var r, n, i, a, o;
            let l = new Map();
            for (let r of e)l.set(r.onu_id, r5(r, t));
            let d = (r = {
                children: s("td", {
                    colSpan: 12,
                    children: _("No registered sub-gateways.")
                })
            }, s("tr", r)), c = 0 === e.length, p = s("tbody", {
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
                            (i = {
                                children: (n = {
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
                                }, s("tr", n))
                            }, s("thead", i)),
                            p
                        ]
                    }, s("table", a))
                }, s("div", o)),
                update (e, r) {
                    let n = new Set(e.map((e)=>e.onu_id));
                    for (let [e, t] of l)n.has(e) || (t.element.remove(), l.delete(e));
                    if (0 === e.length) {
                        c || p.append(d), c = !0;
                        return;
                    }
                    for (let [n, i] of (c && (d.remove(), c = !1), e.entries())){
                        let e = l.get(i.onu_id);
                        e || (e = r5(i, t), l.set(i.onu_id, e)), e.update(i, r);
                        let a = p.children.item(n);
                        a !== e.element && p.insertBefore(e.element, a);
                    }
                }
            };
        }(t.sub_gateways ?? [], (e)=>P(e, m)), y = Array.from({
            length: 16
        }, (e, t)=>{
            var r, n, i, a, o, l, d, c, p, u, f, b, g, h, m, v, y, w;
            let x, k, z, j, $, S, C, O, M, P, R, T, N, I, A, D, U, Z, q;
            return r = t + 1, x = s("span", {}), k = s("span", {
                style: "display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:90%",
                children: _("Unknown")
            }), z = s("img", {
                src: "/luci-static/resources/icons/port_down.svg",
                alt: "",
                "aria-hidden": "true"
            }), j = s("div", {
                style: "flex:1;height:3px;opacity:0.25;background-color:rgb(240, 144, 144)"
            }), $ = s("span", {}), S = s("span", {}), C = s("span", {}), O = s("span", {}), M = s("span", {}), P = s("span", {}), R = s("span", {}), T = s("span", {}), N = s("span", {}), I = s("span", {}), A = s("span", {}), D = s("span", {}), U = s("span", {}), Z = s("span", {}), (w = {
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
                    (i = {
                        class: "ifacebox-head cbi-tooltip-container",
                        style: "display:flex",
                        children: [
                            j,
                            (n = {
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
                            }, s("span", n))
                        ]
                    }, s("div", i)),
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
                                                    R
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
                                                    T
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
                                                    N
                                                ]
                                            }, s("span", c)),
                                            s("br", {}),
                                            (p = {
                                                class: "nowrap",
                                                children: [
                                                    s("strong", {
                                                        children: [
                                                            _("Receive dropped"),
                                                            ": "
                                                        ]
                                                    }),
                                                    I
                                                ]
                                            }, s("span", p)),
                                            s("br", {}),
                                            (u = {
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
                                            }, s("span", u)),
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
                                            (b = {
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
                                            }, s("span", b)),
                                            s("br", {}),
                                            (g = {
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
                                            }, s("span", g))
                                        ]
                                    }, s("span", h))
                                }, s("span", m))
                            ]
                        }, s("div", v))
                    }, s("div", y))
                ]
            }, q = s("div", w)).addEventListener("mouseenter", ()=>{
                let e = q.getAttribute("data-active-onu-id");
                if (e) {
                    let t = document.querySelector(`[data-fttr-onu-id="${e}"]`);
                    t?.classList.add("fttr-row-highlight");
                }
            }), q.addEventListener("mouseleave", ()=>{
                document.querySelectorAll(".fttr-row-highlight").forEach((e)=>{
                    e.classList.remove("fttr-row-highlight");
                });
            }), q.addEventListener("click", ()=>{
                let e = q.getAttribute("data-active-onu-id");
                if (e) {
                    let t = document.querySelector(`[data-fttr-onu-id="${e}"]`);
                    t && (t.scrollIntoView({
                        behavior: "smooth",
                        block: "nearest"
                    }), t.classList.add("fttr-row-highlight"), window.setTimeout(()=>t.classList.remove("fttr-row-highlight"), 1500));
                }
            }), {
                element: q,
                update (e, t) {
                    var n;
                    let i = (e.switch_ports ?? []).find((e)=>e.port === r), a = i?.interface ?? `fttr${r}`, o = t[a], s = o?.stats, l = i?.carrier ?? o?.carrier ?? (o?.link?.speed !== void 0 || void 0), d = (e.sub_gateways ?? []).find((e)=>e.onu_id === i?.onu_id), c = !0 === l, p = s?.rx_bytes, u = s?.tx_bytes;
                    i?.onu_id !== void 0 ? q.setAttribute("data-active-onu-id", String(i.onu_id)) : q.removeAttribute("data-active-onu-id"), c ? (q.classList.add("port-up"), q.classList.remove("port-down")) : (q.classList.add("port-down"), q.classList.remove("port-up")), x.textContent = a, z.setAttribute("src", `/luci-static/resources/icons/${c ? "port_up.svg" : "port_down.svg"}`), k.textContent = c ? o?.link?.speed !== void 0 ? void 0 === (n = o.link.speed) || !Number.isFinite(n) || n <= 0 ? _("Unknown") : n >= 1000 ? `${n / 1000}\u{202F}GbE` : `${n}\u{202F}MbE` : _("Connected") : !1 === l ? _("Disconnected") : _("Unknown"), k.setAttribute("title", _("\u901F\u5EA6\uFF1A%s Mbit/s\uFF0C\u53CC\u5DE5\uFF1A%s").format(t0(o?.link?.speed), t0(o?.link?.duplex))), j.style.opacity = c ? "1" : "0.25", j.style.backgroundColor = c ? "rgb(46, 204, 113)" : "rgba(200, 200, 200, 0.4)", $.textContent = t0((i?.reserved_sn && void 0 === i.onu_id ? _("Reserved (offline)") : i?.link_state) ?? i?.status ?? (o ? l ? _("Link up") : _("Link down") : _("Unavailable"))), i?.reserved_sn && void 0 !== i.onu_id && ($.textContent += ` \xb7 ${_("Fixed interface")}`), S.textContent = t0(i?.onu_sn ?? d?.serial_number ?? i?.reserved_sn ?? i?.onu_id), q.title = i?.reserved_sn ? `${_("Reserved")}: ${i.reserved_sn}` : "", C.textContent = t0(o?.mac), O.textContent = c || u ? t2(u) : "\u2014", M.textContent = c || p ? t2(p) : "\u2014", P.textContent = t2(p), R.textContent = t5(s?.rx_packets), T.textContent = t5(s?.rx_multicast ?? s?.multicast), N.textContent = t5(s?.rx_errors), I.textContent = t5(s?.rx_dropped), A.textContent = t2(u), D.textContent = t5(s?.tx_packets), U.textContent = t5(s?.tx_errors), Z.textContent = t5(s?.tx_dropped);
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
                (n = {
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
                }, s("span", n)),
                (i = {
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
                }, s("span", i)),
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
            children: t0(h.model)
        }), C = s("span", {
            class: "fttr-badge"
        }), O = s("p", {
            role: "status"
        }), g = {
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

				${rc}

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
                (u = {
                    class: "cbi-section",
                    children: [
                        s("h3", {
                            children: _("Controller")
                        }),
                        (p = {
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
                        }, s("table", p))
                    ]
                }, s("div", u)),
                (f = {
                    class: "cbi-section",
                    children: [
                        s("h3", {
                            children: _("Sub-gateways")
                        }),
                        v.element
                    ]
                }, s("div", f)),
                (b = {
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
                }, s("div", b))
            ]
        }, M = s("div", g), (P = (e, t)=>{
            m = t;
            let r = e.optical_transceiver, n = e.provisioning, i = e.onu_pinning;
            for (let a of (O.textContent = i ? [
                i.allocation_blocked ? _("ONU allocation blocked by invalid startup configuration.") : "",
                i.pending_restart ? _("Fixed interface changes pending FTTR restart.") : "",
                i.startup_error || i.config_error || ""
            ].filter(Boolean).join(" ") : "", O.hidden = !O.textContent, n ? (t4(w, n.enabled ? "success" : "neutral", n.enabled ? _("Enabled") : _("Disabled")), x.textContent = t0(n.mode), k.textContent = t0(n.revision), n.error ? (z.textContent = n.error, z.style.display = "") : z.style.display = "none", j.style.display = "") : j.textContent = _("Provisioning status unavailable"), "ready" === e.fpga_status ? t4($, "success", _("Ready")) : e.fpga_status ? t4($, "neutral", t0(e.fpga_status)) : t4($, "none", "\u2014"), S.textContent = t0(r.model), null == r.cdr_locked ? t4(C, "none", _("Unknown")) : r.cdr_locked ? t4(C, "success", _("Locked")) : t4(C, "warning", _("Unlocked")), v.update(e.sub_gateways ?? [], e.onu_pinning), y))a.update(e, t);
        })(t, r), r3 = (r4 = {
            element: M,
            update: P
        }).element, r2.add(async ()=>{
            if (r8 || !r3?.isConnected || !r4) return;
            let e = r4;
            r8 = !0;
            try {
                let [t, r] = await Promise.all([
                    rC(),
                    rM().catch(()=>({}))
                ]);
                r4 === e && e.element.isConnected && e.update(t, r);
            } catch (e) {
                console.error("Failed to refresh FTTR status", e);
            } finally{
                r8 = !1;
            }
        }, 10), r3;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;