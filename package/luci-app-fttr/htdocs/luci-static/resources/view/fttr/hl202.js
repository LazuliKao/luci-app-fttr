'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, n, r, a, i;
const s = Symbol.for("jsx.fragment");
function o(e, t) {
    let { children: n, ...r } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, a = function e(t) {
        let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let r of t)null != r && "boolean" != typeof r && (Array.isArray(r) ? e(r, n) : n.push(r instanceof Node ? r : String(r)));
        return n;
    }(null == n ? [] : Array.isArray(n) ? n : [
        n
    ]);
    if (e === s) {
        let e = document.createDocumentFragment();
        return e.append(...a), e;
    }
    if ("function" == typeof e) {
        let t = Reflect.apply(e, void 0, [
            {
                ...r,
                children: a
            }
        ]);
        if (!(t instanceof Node)) throw TypeError("JSX components must return a DOM Node");
        return t;
    }
    if ("string" != typeof e) throw TypeError("JSX element types must be tag names or component functions");
    let i = {}, o = {
        ...r
    };
    for (let [e, t] of Object.entries(o))e.startsWith("on") && "function" == typeof t ? (i[e] = t, delete o[e]) : "boolean" == typeof t && (t ? o[e] = e : delete o[e]);
    let l = Object.keys(o).length > 0 ? a.length > 1 ? E(e, o, a) : E(e, o, a[0]) : a.length > 1 ? E(e, {}, a) : E(e, {}, a[0]);
    for (let [e, t] of Object.entries(i)){
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
        let a = s.prototype, i = Object.keys(a);
        for(let e = 0; e < i.length; e++){
            let t = i[e];
            t in n || (n[t] = a[t].bind(n));
        }
    }
    let a = n?.Parent ?? Object;
    class i extends a {
    }
    function s(e) {
        var t;
        let a = n?.Parent ? new i() : this;
        for (let n of (r(a, e), (t = a._zod).deferred ?? (t.deferred = []), a._zod.deferred))n();
        return a;
    }
    return Object.defineProperty(i, "name", {
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
class c extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const d = {};
function p(e) {
    return e && Object.assign(d, e), d;
}
function u(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function g(e) {
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const h = Symbol("evaluating");
function m(e, t, n) {
    let r;
    Object.defineProperty(e, t, {
        get () {
            if (r !== h) return void 0 === r && (r = h, r = n()), r;
        },
        set (n) {
            Object.defineProperty(e, t, {
                value: n
            });
        },
        configurable: !0
    });
}
const f = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function b(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function y(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function v(e) {
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
function w(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let n = t; n < e.issues.length; n++)if (e.issues[n]?.continue !== !0) return !0;
    return !1;
}
function x(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function k(e) {
    return "string" == typeof e ? e : e?.message;
}
function z(e, t, n) {
    let r = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (r.message = k(e.inst?._zod.def?.error?.(e)) ?? k(t?.error?.(e)) ?? k(n.customError?.(e)) ?? k(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
const j = (e, t)=>{
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
}, C = l("$ZodError", j), S = l("$ZodError", j, {
    Parent: Error
}), T = (n = S, (e, t, r, a)=>{
    let i = r ? Object.assign(r, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (s instanceof Promise) throw new c();
    if (s.issues.length) {
        let e = new (a?.Err ?? n)(s.issues.map((e)=>z(e, i, p())));
        throw f(e, a?.callee), e;
    }
    return s.value;
}), $ = (r = S, async (e, t, n, a)=>{
    let i = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (a?.Err ?? r)(s.issues.map((e)=>z(e, i, p())));
        throw f(e, a?.callee), e;
    }
    return s.value;
}), O = (a = S, (e, t, n)=>{
    let r = n ? {
        ...n,
        async: !1
    } : {
        async: !1
    }, i = e._zod.run({
        value: t,
        issues: []
    }, r);
    if (i instanceof Promise) throw new c();
    return i.issues.length ? {
        success: !1,
        error: new (a ?? C)(i.issues.map((e)=>z(e, r, p())))
    } : {
        success: !0,
        data: i.value
    };
}), N = (i = S, async (e, t, n)=>{
    let r = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, a = e._zod.run({
        value: t,
        issues: []
    }, r);
    return a instanceof Promise && (a = await a), a.issues.length ? {
        success: !1,
        error: new i(a.issues.map((e)=>z(e, r, p())))
    } : {
        success: !0,
        data: a.value
    };
}), P = /^-?\d+(?:\.\d+)?$/, R = /^(?:true|false)$/i, M = /^null$/i, q = {
    major: 4,
    minor: 3,
    patch: 6
}, A = l("$ZodType", (e, t)=>{
    var n;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = q;
    let r = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && r.unshift(e), r))for (let n of t._zod.onattach)n(e);
    if (0 === r.length) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, n)=>{
            let r, a = w(e);
            for (let i of t){
                if (i._zod.def.when) {
                    if (!i._zod.def.when(e)) continue;
                } else if (a) continue;
                let t = e.issues.length, s = i._zod.check(e);
                if (s instanceof Promise && n?.async === !1) throw new c();
                if (r || s instanceof Promise) r = (r ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (a || (a = w(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    a || (a = w(e, t));
                }
            }
            return r ? r.then(()=>e) : e;
        }, n = (n, a, i)=>{
            if (w(n)) return n.aborted = !0, n;
            let s = t(a, r, i);
            if (s instanceof Promise) {
                if (!1 === i.async) throw new c();
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
                return t instanceof Promise ? t.then((e)=>n(e, a, i)) : n(t, a, i);
            }
            let s = e._zod.parse(a, i);
            if (s instanceof Promise) {
                if (!1 === i.async) throw new c();
                return s.then((e)=>t(e, r, i));
            }
            return t(s, r, i);
        };
    }
    m(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = O(e, t);
                    return n.success ? {
                        value: n.data
                    } : {
                        issues: n.error?.issues
                    };
                } catch (n) {
                    return N(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), Z = l("$ZodString", (e, t)=>{
    var n;
    let r;
    A.init(e, t), e._zod.pattern = [
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
}), J = l("$ZodNumber", (e, t)=>{
    A.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? P, e._zod.parse = (n, r)=>{
        if (t.coerce) try {
            n.value = Number(n.value);
        } catch (e) {}
        let a = n.value;
        if ("number" == typeof a && !Number.isNaN(a) && Number.isFinite(a)) return n;
        let i = "number" == typeof a ? Number.isNaN(a) ? "NaN" : Number.isFinite(a) ? void 0 : "Infinity" : void 0;
        return n.issues.push({
            expected: "number",
            code: "invalid_type",
            input: a,
            inst: e,
            ...i ? {
                received: i
            } : {}
        }), n;
    };
}), D = l("$ZodBoolean", (e, t)=>{
    A.init(e, t), e._zod.pattern = R, e._zod.parse = (n, r)=>{
        if (t.coerce) try {
            n.value = !!n.value;
        } catch (e) {}
        let a = n.value;
        return "boolean" == typeof a || n.issues.push({
            expected: "boolean",
            code: "invalid_type",
            input: a,
            inst: e
        }), n;
    };
}), U = l("$ZodNull", (e, t)=>{
    A.init(e, t), e._zod.pattern = M, e._zod.values = new Set([
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
}), Q = l("$ZodUnknown", (e, t)=>{
    A.init(e, t), e._zod.parse = (e)=>e;
});
function I(e, t, n) {
    e.issues.length && t.issues.push(...x(n, e.issues)), t.value[n] = e.value;
}
const F = l("$ZodArray", (e, t)=>{
    A.init(e, t), e._zod.parse = (n, r)=>{
        let a = n.value;
        if (!Array.isArray(a)) return n.issues.push({
            expected: "array",
            code: "invalid_type",
            input: a,
            inst: e
        }), n;
        n.value = Array(a.length);
        let i = [];
        for(let e = 0; e < a.length; e++){
            let s = a[e], o = t.element._zod.run({
                value: s,
                issues: []
            }, r);
            o instanceof Promise ? i.push(o.then((t)=>I(t, n, e))) : I(o, n, e);
        }
        return i.length ? Promise.all(i).then(()=>n) : n;
    };
});
function V(e, t, n, r, a) {
    if (e.issues.length) {
        if (a && !(n in r)) return;
        t.issues.push(...x(n, e.issues));
    }
    void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const W = l("$ZodObject", (e, t)=>{
    var n;
    let r;
    A.init(e, t);
    let a = Object.getOwnPropertyDescriptor(t, "shape");
    if (!a?.get) {
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
    let i = (n = ()=>(function(e) {
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
        })(t), {
        get value () {
            {
                let e = n();
                return Object.defineProperty(this, "value", {
                    value: e
                }), e;
            }
        }
    });
    m(e._zod, "propValues", ()=>{
        let e = t.shape, n = {};
        for(let t in e){
            let r = e[t]._zod;
            if (r.values) for (let e of (n[t] ?? (n[t] = new Set()), r.values))n[t].add(e);
        }
        return n;
    });
    let s = t.catchall;
    e._zod.parse = (t, n)=>{
        r ?? (r = i.value);
        let a = t.value;
        if (!b(a)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: a,
            inst: e
        }), t;
        t.value = {};
        let o = [], l = r.shape;
        for (let e of r.keys){
            let r = l[e], i = "optional" === r._zod.optout, s = r._zod.run({
                value: a[e],
                issues: []
            }, n);
            s instanceof Promise ? o.push(s.then((n)=>V(n, t, e, a, i))) : V(s, t, e, a, i);
        }
        return s ? function(e, t, n, r, a, i) {
            let s = [], o = a.keySet, l = a.catchall._zod, c = l.def.type, d = "optional" === l.optout;
            for(let a in t){
                if (o.has(a)) continue;
                if ("never" === c) {
                    s.push(a);
                    continue;
                }
                let i = l.run({
                    value: t[a],
                    issues: []
                }, r);
                i instanceof Promise ? e.push(i.then((e)=>V(e, n, a, t, d))) : V(i, n, a, t, d);
            }
            return (s.length && n.issues.push({
                code: "unrecognized_keys",
                keys: s,
                input: t,
                inst: i
            }), e.length) ? Promise.all(e).then(()=>n) : n;
        }(o, a, t, n, i.value, e) : o.length ? Promise.all(o).then(()=>t) : t;
    };
});
function H(e, t, n, r) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let a = e.filter((e)=>!w(e));
    return 1 === a.length ? (t.value = a[0].value, a[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>z(e, r, p())))
    }), t);
}
const K = l("$ZodUnion", (e, t)=>{
    A.init(e, t), m(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), m(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), m(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), m(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>g(e.source)).join("|")})$`);
        }
    });
    let n = 1 === t.options.length, r = t.options[0]._zod.run;
    e._zod.parse = (a, i)=>{
        if (n) return r(a, i);
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
        return s ? Promise.all(o).then((t)=>H(t, a, e, i)) : H(o, a, e, i);
    };
}), B = l("$ZodRecord", (e, t)=>{
    A.init(e, t), e._zod.parse = (n, r)=>{
        let a = n.value;
        if (!function(e) {
            if (!1 === b(e)) return !1;
            let t = e.constructor;
            if (void 0 === t || "function" != typeof t) return !0;
            let n = t.prototype;
            return !1 !== b(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
        }(a)) return n.issues.push({
            expected: "record",
            code: "invalid_type",
            input: a,
            inst: e
        }), n;
        let i = [], s = t.keyType._zod.values;
        if (s) {
            let o;
            n.value = {};
            let l = new Set();
            for (let e of s)if ("string" == typeof e || "number" == typeof e || "symbol" == typeof e) {
                l.add("number" == typeof e ? e.toString() : e);
                let s = t.valueType._zod.run({
                    value: a[e],
                    issues: []
                }, r);
                s instanceof Promise ? i.push(s.then((t)=>{
                    t.issues.length && n.issues.push(...x(e, t.issues)), n.value[e] = t.value;
                })) : (s.issues.length && n.issues.push(...x(e, s.issues)), n.value[e] = s.value);
            }
            for(let e in a)l.has(e) || (o = o ?? []).push(e);
            o && o.length > 0 && n.issues.push({
                code: "unrecognized_keys",
                input: a,
                inst: e,
                keys: o
            });
        } else for (let s of (n.value = {}, Reflect.ownKeys(a))){
            if ("__proto__" === s) continue;
            let o = t.keyType._zod.run({
                value: s,
                issues: []
            }, r);
            if (o instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof s && P.test(s) && o.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(s),
                    issues: []
                }, r);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (o = e);
            }
            if (o.issues.length) {
                "loose" === t.mode ? n.value[s] = a[s] : n.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: o.issues.map((e)=>z(e, r, p())),
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
            }, r);
            l instanceof Promise ? i.push(l.then((e)=>{
                e.issues.length && n.issues.push(...x(s, e.issues)), n.value[o.value] = e.value;
            })) : (l.issues.length && n.issues.push(...x(s, l.issues)), n.value[o.value] = l.value);
        }
        return i.length ? Promise.all(i).then(()=>n) : n;
    };
}), X = l("$ZodLiteral", (e, t)=>{
    if (A.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? y(e) : e ? y(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, a)=>{
        let i = r.value;
        return n.has(i) || r.issues.push({
            code: "invalid_value",
            values: t.values,
            input: i,
            inst: e
        }), r;
    };
});
function G(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const Y = l("$ZodOptional", (e, t)=>{
    A.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", m(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), m(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${g(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let r = t.innerType._zod.run(e, n);
            return r instanceof Promise ? r.then((t)=>G(t, e.value)) : G(r, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, n);
    };
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
const ee = l("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    A.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>T(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>O(e, t, n), e.parseAsync = async (t, n)=>$(e, t, n, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, n)=>N(e, t, n), e.check = (...n)=>e.clone({
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
}), et = l("ZodMiniString", (e, t)=>{
    Z.init(e, t), ee.init(e, t);
});
function en(e) {
    return new et({
        type: "string",
        ...v(e)
    });
}
const er = l("ZodMiniNumber", (e, t)=>{
    J.init(e, t), ee.init(e, t);
});
function ea(e) {
    return new er({
        type: "number",
        checks: [],
        ...v(e)
    });
}
const ei = l("ZodMiniBoolean", (e, t)=>{
    D.init(e, t), ee.init(e, t);
});
function es(e) {
    return new ei({
        type: "boolean",
        ...v(e)
    });
}
const eo = l("ZodMiniNull", (e, t)=>{
    U.init(e, t), ee.init(e, t);
});
function el(e) {
    return new eo({
        type: "null",
        ...v(e)
    });
}
const ec = l("ZodMiniUnknown", (e, t)=>{
    Q.init(e, t), ee.init(e, t);
}), ed = l("ZodMiniArray", (e, t)=>{
    F.init(e, t), ee.init(e, t);
});
function ep(e, t) {
    return new ed({
        type: "array",
        element: e,
        ...v(t)
    });
}
const eu = l("ZodMiniObject", (e, t)=>{
    W.init(e, t), ee.init(e, t), m(e, "shape", ()=>t.shape);
});
function e_(e, t) {
    return new eu({
        type: "object",
        shape: e ?? {},
        ...v(t)
    });
}
const eg = l("ZodMiniUnion", (e, t)=>{
    K.init(e, t), ee.init(e, t);
});
function eh(e, t) {
    return new eg({
        type: "union",
        options: e,
        ...v(t)
    });
}
const em = l("ZodMiniRecord", (e, t)=>{
    B.init(e, t), ee.init(e, t);
});
function ef(e, t, n) {
    return new em({
        type: "record",
        keyType: e,
        valueType: t,
        ...v(n)
    });
}
const eb = l("ZodMiniLiteral", (e, t)=>{
    X.init(e, t), ee.init(e, t);
});
function ey(e, t) {
    return new eb({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...v(t)
    });
}
const ev = l("ZodMiniOptional", (e, t)=>{
    Y.init(e, t), ee.init(e, t);
});
function ew(e) {
    return new ev({
        type: "optional",
        innerType: e
    });
}
const ex = eh([
    ey("account_set_password"),
    ey("account_set_active")
]), ek = eh([
    ey("waiting_transport"),
    ey("waiting_identity"),
    ey("reading"),
    ey("configuring"),
    ey("verifying"),
    ey("waiting_inform"),
    ey("ready"),
    ey("retry_wait"),
    ey("manual_required"),
    ey("not_configured"),
    ey("waiting_acs"),
    ey("awaiting_apply"),
    ey("discovering_management_wan"),
    ey("configuring_management_wan"),
    ey("verifying_management_wan")
]), ez = e_({
    enabled: es(),
    listen: eh([
        en(),
        el()
    ]),
    path: eh([
        en(),
        el()
    ]),
    error: eh([
        en(),
        el()
    ])
}), ej = e_({
    vlan: ea(),
    vlans: ep(ea()),
    priority: ea(),
    acs_url: en()
}), eC = e_({
    state: ek,
    optical_sn: en(),
    cwmp_id: en(),
    mqtt_target: eh([
        en(),
        el()
    ]),
    binding_source: en(),
    method: en(),
    desired_version: en(),
    generation: ea(),
    reason: en(),
    attempts: ea(),
    next_retry_at: ea(),
    updated_at: ea(),
    settings_verified_at: eh([
        ea(),
        el()
    ]),
    selected_vlan: eh([
        ea(),
        el()
    ]),
    last_inform: eh([
        ea(),
        el()
    ]),
    expected_acs_url: en(),
    last_error: eh([
        en(),
        el()
    ]),
    transport_epoch: ea(),
    completed_authorization: ea(),
    connection_request_enabled: eh([
        es(),
        el()
    ]),
    inflight: es(),
    persistence_error: eh([
        en(),
        el()
    ]),
    link_identity_error: eh([
        en(),
        el()
    ]),
    listener: ez,
    mqtt_last_seen: eh([
        ea(),
        el()
    ]),
    desired: ew(ej),
    endpoint_notice: ew(en()),
    manual_steps: ew(ep(en()))
}), eS = eh([
    ey("pending"),
    ey("unavailable")
]), eT = eh([
    eC,
    e_({
        state: eS,
        reason: en()
    })
]), e$ = e_({
    id: en(),
    name: en()
}), eE = e_({
    configured: en(),
    effective: en(),
    available: ep(en()),
    reason: en()
}), eO = e_({
    phase: eh([
        ey("not_started"),
        ey("collecting_identity"),
        ey("retrying_identity"),
        ey("unsupported"),
        ey("configuring"),
        ey("verifying"),
        ey("wan_bootstrap_pending"),
        ey("verified"),
        ey("retrying"),
        ey("offline")
    ]),
    generation: ea(),
    error: eh([
        en(),
        el()
    ])
});
e_({
    success: es(),
    output: ew(en()),
    error: ew(en())
});
const eN = eh([
    ey("factory"),
    ey("firmware"),
    ey("builtin")
]), eP = e_({
    detected: es(),
    device: en(),
    has_data: es(),
    sha256: en(),
    data: en()
}), eR = e_({
    exists: es(),
    path: en(),
    size: ea(),
    sha256: en(),
    data: en()
}), eM = e_({
    source: eN,
    active_path: en(),
    size: ea(),
    sha256: en(),
    data: en(),
    factory: eP,
    firmware: eR
}), eL = e_({
    error: en()
});
eh([
    eM,
    eL
]);
const eq = e_({
    success: es(),
    path: en(),
    size: ea(),
    sha256: en()
});
eh([
    eq,
    eL
]), e_({
    data: en()
});
const eA = e_({
    acs: es(),
    mqtt: es(),
    npu: es(),
    "device-hl202": es(),
    "device-hwtc": es(),
    "device-star": es(),
    "device-zte": es(),
    "device-scty": es()
}), eZ = e_({
    optical: es(),
    bridge_offload: es(),
    omci_mib: es(),
    mqtt_telemetry: es(),
    hl202_management: es(),
    cwmp: es(),
    command_provisioning: es()
}), eJ = e_({
    status: es(),
    config: es(),
    sync: es(),
    hardware: es(),
    calibration: es(),
    hl202: es(),
    about: es()
}), eD = e_({
    schema_version: ey(1),
    version: en(),
    features: eA,
    functions: eZ,
    pages: eJ,
    adapters: ep(e$)
}), eU = eh([
    e_({
        valid: ey(!0),
        revision: en(),
        devices: ea()
    }),
    e_({
        error: en()
    })
]), eQ = eh([
    ey("waiting"),
    ey("wan_reconciling"),
    ey("wan_verifying"),
    ey("wifi_reconciling"),
    ey("discovering"),
    ey("reading"),
    ey("disabling"),
    ey("disabling_read"),
    ey("writing"),
    ey("verifying"),
    ey("settling"),
    ey("completed"),
    ey("not_started"),
    ey("reset_pending"),
    ey("interrupted"),
    ey("recovering"),
    ey("waiting_management"),
    ey("waiting_task")
]), eI = e_({
    operation_id: ea(),
    device: en(),
    state: eQ,
    started_at: ea()
}), eF = e_({
    state: eh([
        ey("waiting"),
        ey("applied")
    ]),
    requested_revision: en(),
    requested_at: eh([
        ea(),
        el()
    ]),
    blocking_operations: ep(eI),
    reset_pending: es()
}), eV = eh([
    ey("auto"),
    ey("manual")
]), eW = ey("diff"), eH = e_({
    state: en(),
    enabled: es(),
    reason: ew(eh([
        en(),
        el()
    ])),
    revision: ew(en()),
    vlan: ew(ea()),
    updated_at: ew(ea())
}), eK = eh([
    ey("online"),
    ey("waiting_inform"),
    ey("offline_or_stale"),
    ey("waiting_transport")
]), eB = e_({
    cwmp_id: en(),
    state: eK,
    optical_online: es(),
    last_inform: eh([
        ea(),
        el()
    ]),
    age_seconds: eh([
        ea(),
        el()
    ])
}), eX = eh([
    ey("device_service"),
    ey("ssid"),
    ey("port_binding"),
    ey("wan_activation")
]), eG = e_({
    name: en(),
    desired: en()
}), eY = e_({
    id: en(),
    name: ew(eh([
        en(),
        el()
    ])),
    kind: eX,
    service_type: en(),
    state: en(),
    reason: ew(en()),
    revision: ew(en()),
    current_revision: ew(es()),
    management_fresh: ew(es()),
    operation_id: ew(ea()),
    task_id: ew(eh([
        ea(),
        el()
    ])),
    updated_at: ew(ea()),
    changes: ew(ep(eG))
}), e0 = eh([
    ey("plan"),
    ey("apply")
]), e2 = e_({
    wan: en(),
    wlan: en(),
    binding: en()
}), e1 = e_({
    state: en(),
    requested: en(),
    contract: eh([
        en(),
        el()
    ]),
    reason: en(),
    cache_hit: es(),
    schema: en(),
    capabilities: eh([
        e2,
        el()
    ])
}), e8 = e_({
    parent: ea(),
    connection: ea(),
    state: en(),
    service_list: en(),
    kind: en(),
    baseline: eh([
        ep(ea()),
        el()
    ])
}), e4 = e_({
    state: en(),
    reason: ew(en()),
    task_id: ew(eh([
        ea(),
        el()
    ])),
    instance: ew(ea()),
    cwmp_id: ew(en())
}), e5 = eh([
    ey("waiting"),
    ey("inventory"),
    ey("classifying"),
    ey("adding_parent"),
    ey("child_names"),
    ey("adding_child"),
    ey("delete_guard"),
    ey("deleting"),
    ey("verify_delete"),
    ey("empty_parent"),
    ey("deleting_parent"),
    ey("verify_parent_delete"),
    ey("next"),
    ey("done")
]), e3 = e_({
    owned: ep(ea()),
    pending: eh([
        en(),
        el()
    ]),
    pending_instance: eh([
        ea(),
        el()
    ])
}), e6 = eh([
    ey("waiting"),
    ey("inventory"),
    ey("adding"),
    ey("verify_add"),
    ey("deleting"),
    ey("verify_delete"),
    ey("reading_disable"),
    ey("disabling"),
    ey("verifying_disable"),
    ey("next"),
    ey("done")
]), e7 = eh([
    ey("disable"),
    ey("preserve"),
    ey("delete")
]), e9 = e_({
    parent: ea(),
    child: ea(),
    service: en(),
    vlan: en()
}), te = e_({
    state: eQ,
    items: ep(eY),
    backend: ew(eE),
    operation_id: ew(ea()),
    device: ew(en()),
    optical_sn: ew(en()),
    cwmp_id: ew(en()),
    revision: ew(en()),
    mode: ew(e0),
    started_at: ew(ea()),
    completed_at: ew(eh([
        ea(),
        el()
    ])),
    current_revision: ew(es()),
    management_fresh: ew(es()),
    reason: ew(en()),
    error: ew(en()),
    attempts: ew(ea()),
    next_retry_at: ew(ea()),
    reconcile_reason: ew(en()),
    cwmp_contract: ew(e1),
    wan_objects: ew(ef(en(), e8)),
    wan_lifecycle: ew(ef(en(), e4)),
    wan_stage: ew(e5),
    wifi_objects: ew(e3),
    wifi_lifecycle: ew(ef(en(), e4)),
    wifi_stage: ew(e6),
    wifi_cleanup: ew(e7),
    native_ownership: ew(ef(en(), e9)),
    write_performed: ew(es()),
    readback_verified: ew(es())
}), tt = eh([
    ey("not_configured"),
    ey("stale_revision"),
    ey("stale_management"),
    ey("verified"),
    ey("attention_required"),
    ey("accepted_unverified"),
    ey("pending"),
    ey("recovering"),
    ey("waiting_management")
]), tn = e_({
    device: en(),
    name: eh([
        en(),
        el()
    ]),
    group: eh([
        en(),
        el()
    ]),
    group_name: eh([
        en(),
        el()
    ]),
    template: eh([
        en(),
        el()
    ]),
    template_name: eh([
        en(),
        el()
    ]),
    optical_sn: en(),
    adapter: en(),
    omci_management: eH,
    management: eh([
        eB,
        el()
    ]),
    acs_bootstrap: eT,
    provisioning: te,
    services: ep(eY),
    ssids: ep(eY),
    wifi_sync: tt
}), tr = eh([
    ey("discovering"),
    ey("comparing"),
    ey("planning"),
    ey("applying"),
    ey("verifying"),
    ey("configuring_listener"),
    ey("cleaning_previous"),
    ey("waiting_devices"),
    ey("ready"),
    ey("awaiting_apply"),
    ey("verified"),
    ey("blocked"),
    ey("retry_wait")
]), ta = e_({
    enabled: es(),
    mode: eV,
    vlan: ep(ea()),
    priority: ea(),
    address: en(),
    acs_url: en(),
    port: ea(),
    path: en(),
    dhcp_enabled: es()
}), ti = e_({
    operation: en(),
    key: en(),
    value: ep(en())
}), ts = e_({
    state: tr,
    error: eh([
        en(),
        el()
    ]),
    inflight: es(),
    ready: es(),
    desired_version: eh([
        en(),
        el()
    ]),
    applied_version: eh([
        en(),
        el()
    ]),
    next_retry_at: ea(),
    attempts: ea(),
    desired: eh([
        ta,
        el()
    ]),
    applied: eh([
        ta,
        el()
    ]),
    previous: eh([
        ta,
        el()
    ]),
    plan: ep(ti)
}), to = e_({
    desired: eh([
        ej,
        el()
    ]),
    state: en()
}), tl = e_({
    id: en(),
    name: eh([
        en(),
        el()
    ]),
    template: en()
}), tc = e_({
    enabled: es(),
    mode: eV,
    method: eW,
    revision: en(),
    triggers: ep(en()),
    interval_minutes: ea(),
    error: eh([
        en(),
        el()
    ]),
    devices: ep(tn),
    management_network: ts,
    omci_management: to,
    groups: ep(tl),
    pending_devices: ep(en()),
    onu_pins: ew(ef(en(), ea())),
    config_error: ew(eh([
        en(),
        el()
    ])),
    config_load: ew(eF)
});
eh([
    tc,
    eL
]);
const td = e_({
    enabled: eh([
        es(),
        el()
    ]),
    routed_enabled: eh([
        es(),
        el()
    ]),
    bridge_enabled: eh([
        es(),
        el()
    ]),
    engine_attached: eh([
        es(),
        el()
    ]),
    forwarding_verified: eh([
        es(),
        el()
    ])
}), tp = e_({
    entity_id: ea(),
    port_id: eh([
        ea(),
        el()
    ])
}), tu = e_({
    entity_id: ea(),
    filter_list_hex: eh([
        en(),
        el()
    ]),
    forward_operation: eh([
        ea(),
        el()
    ]),
    number_of_entries: eh([
        ea(),
        el()
    ])
}), t_ = e_({
    entity_id: ea(),
    received_frame_rules_hex: eh([
        ep(en()),
        el()
    ]),
    error: eh([
        en(),
        el()
    ])
}), tg = e_({
    age_seconds: ea(),
    gem_ports: ep(tp),
    vlan_filters: ep(tu),
    vlan_operations: ep(t_)
}), th = e_({
    source: en(),
    unit: en(),
    reason: eh([
        en(),
        el()
    ]),
    raw: eh([
        en(),
        el()
    ]),
    age_seconds: eh([
        ea(),
        el()
    ])
}), tm = e_({
    interface: en(),
    gem_ports: eh([
        ep(ea()),
        el()
    ]),
    vlan_id: eh([
        ea(),
        el()
    ]),
    onu_inventory: eh([
        tg,
        el()
    ]),
    tx_bytes: eh([
        ea(),
        el()
    ]),
    rx_bytes: eh([
        ea(),
        el()
    ]),
    current_tx_kbps: eh([
        ea(),
        el()
    ]),
    current_rx_kbps: eh([
        ea(),
        el()
    ]),
    olt_channel_gem: ew(ea()),
    forwarding_verified: ew(es()),
    offload: td,
    measurements: ef(en(), th)
});
e_({});
const tf = e_({
    entity_id: ea(),
    interval_end_time: ea(),
    corrected_bytes: ea(),
    corrected_code_words: ea(),
    uncorrectable_code_words: ea(),
    total_code_words: ea(),
    fec_seconds: ea()
}), tb = e_({
    ani_entity_id: eh([
        ea(),
        el()
    ]),
    control_supported: es(),
    downstream_enabled: eh([
        es(),
        el()
    ]),
    upstream_enabled: eh([
        es(),
        el()
    ]),
    downstream_pm: eh([
        tf,
        el()
    ]),
    measurement: th
}), ty = e_({
    entry: eh([
        ey(0),
        ey(1),
        ey(2)
    ]),
    username: en(),
    active: es()
}), tv = e_({
    mqtt_mac: en(),
    optical_sn: eh([
        en(),
        el()
    ]),
    onu_id: eh([
        ea(),
        el()
    ]),
    binding_generation: en(),
    last_seen: ea(),
    reason: en()
}), tw = eh([
    ey("executed"),
    ey("dispatched"),
    ey("timeout"),
    ey("error")
]), tx = e_({
    target: en(),
    status: tw,
    request_id: ew(en()),
    exit_code: ew(ea()),
    output: ew(en()),
    output_truncated: es(),
    error: ew(en())
}), tk = e_({
    target: tv,
    result: tx,
    binding_current: es()
}), tz = eh([
    ey("not_applicable"),
    ey("accepted_and_saved"),
    ey("unconfirmed")
]), tj = e_({
    code: en(),
    message: en()
}), tC = eh([
    e_({
        schema_version: ey(1),
        operation: tk,
        accounts: eh([
            ep(ty),
            el()
        ]),
        write_status: tz
    }),
    e_({
        schema_version: ea(),
        error: tj
    })
]), tS = e_({
    optical_sn: en(),
    onu_id: ea(),
    binding_generation: en()
}), tT = e_({
    mqtt_mac: en(),
    binding_generation: en()
}), t$ = eh([
    tS,
    tT
]);
e_({
    target: t$
});
const tE = eh([
    e_({
        kind: ey("exec"),
        script: en(),
        timeout_seconds: ea()
    }),
    e_({
        kind: ey("accounts_read")
    }),
    e_({
        kind: ey("account_set_password"),
        entry: ea(),
        password: en()
    }),
    e_({
        kind: ey("account_set_active"),
        entry: ea(),
        active: es()
    })
]), tO = e_({
    schema_version: ea(),
    target: tS,
    action: tE
}), tN = e_({
    optical_sn: en(),
    onu_id: ea(),
    model: en(),
    optical_online: es(),
    can_execute: es(),
    mqtt: eh([
        tv,
        el()
    ]),
    report_revision: eh([
        ea(),
        el()
    ])
}), tP = eh([
    e_({
        schema_version: ey(1),
        operation: tk
    }),
    e_({
        schema_version: ea(),
        error: tj
    })
]);
e_({
    target: t$,
    script: en(),
    timeout_seconds: ea()
});
const tR = eh([
    e_({
        schema_version: ey(1),
        devices: ep(tN),
        sources: ep(tv)
    }),
    e_({
        schema_version: ea(),
        error: tj
    })
]);
eh([
    e_({
        method: ey("list")
    }),
    e_({
        method: ey("report"),
        target: tS
    }),
    e_({
        method: ey("source_report"),
        target: tT
    }),
    e_({
        method: ey("run"),
        request: tO
    })
]);
const tM = eh([
    ey("received"),
    ey("report_unavailable")
]), tL = e_({
    value: new ec({
        type: "unknown"
    }),
    member: en(),
    unit: eh([
        en(),
        el()
    ])
}), tq = e_({
    name: en(),
    bytes: ea(),
    encoding: en(),
    text: eh([
        en(),
        el()
    ]),
    text_omitted: es()
}), tA = e_({
    schema_version: ea(),
    compressed_bytes: ea(),
    decompressed_bytes: ea(),
    fields: ef(en(), tL),
    members: ep(tq),
    errors: ep(en())
}), tZ = e_({
    revision: ea(),
    last_received: ea(),
    last_processed_receipt: eh([
        ea(),
        el()
    ]),
    last_good: eh([
        ea(),
        el()
    ]),
    error: eh([
        en(),
        el()
    ]),
    report: eh([
        tA,
        el()
    ])
}), tJ = eh([
    e_({
        schema_version: ey(1),
        target: tv,
        report: eh([
            tZ,
            el()
        ]),
        state: tM
    }),
    e_({
        schema_version: ey(1),
        target: tv,
        report: eh([
            tZ,
            el()
        ]),
        read_only: ey(!0)
    }),
    e_({
        schema_version: ea(),
        error: tj
    })
]);
e_({
    target: t$
}), e_({
    target: t$,
    kind: ex,
    entry: ea(),
    password: en(),
    active: es()
});
const tD = e_({
    accepted: ea(),
    rejected: ea(),
    read_errors: ea(),
    handled: ea(),
    max_intake_us: ea(),
    max_handler_us: ea()
}), tU = ey("pending"), tQ = e_({
    phase: eh([
        ey("starting"),
        ey("upload"),
        ey("tables")
    ]),
    received: ea(),
    expected: eh([
        ea(),
        el()
    ])
}), tI = ey("ready"), tF = eh([
    e_({
        status: tU,
        progress: ew(tQ)
    }),
    e_({
        status: tI,
        chunk: ea(),
        chunks: ea(),
        bytes: ea(),
        data: en()
    })
]);
eh([
    tF,
    eL
]);
const tV = e_({
    status: tU,
    job: en()
}), tW = e_({
    released: es()
});
e_({
    job: en()
}), e_({
    job: en(),
    chunk: ea()
}), eh([
    tV,
    eL
]);
const tH = e_({
    accepting: es(),
    running: ea(),
    stored: ea(),
    bytes: ea(),
    running_limit: ea(),
    stored_limit: ea(),
    bytes_limit: ea(),
    result_bytes_limit: ea()
}), tK = e_({
    mac: en(),
    ip: en(),
    band: en(),
    rssi_dbm: eh([
        ea(),
        el()
    ]),
    rx_rate_mbps: eh([
        ea(),
        el()
    ]),
    tx_rate_mbps: eh([
        ea(),
        el()
    ])
}), tB = eh([
    ey("unknown"),
    ey("octets"),
    ey("string"),
    ey("unsigned_integer"),
    ey("table"),
    ey("signed_integer"),
    ey("pointer"),
    ey("bit_field"),
    ey("enumeration"),
    ey("counter")
]), tX = e_({
    id: en(),
    url: en()
}), tG = e_({
    name: en(),
    kind: tB,
    index: ea(),
    mask: ea(),
    size: ea(),
    read: es(),
    write: es(),
    set_by_create: es(),
    avc: es(),
    optional: es(),
    deprecated: es(),
    default_hex: eh([
        en(),
        el()
    ]),
    reference: tX
}), tY = eh([
    e_({
        type: ey("unsigned"),
        value: ea()
    }),
    e_({
        type: ey("signed"),
        value: ea()
    }),
    e_({
        type: ey("decimal"),
        value: en()
    }),
    e_({
        type: ey("text"),
        value: eh([
            en(),
            el()
        ])
    }),
    e_({
        type: ey("octets"),
        hex: en()
    }),
    e_({
        type: ey("table_length"),
        bytes: ea()
    })
]), t0 = e_({
    raw_hex: en(),
    value: tY,
    sequences: ep(ea())
}), t2 = e_({
    definition: tG,
    value: eh([
        tY,
        el()
    ]),
    observations: ep(t0)
}), t1 = eh([
    ey("layout"),
    ey("name_only"),
    ey("unknown")
]), t8 = e_({
    class_id: ea(),
    name: eh([
        en(),
        el()
    ]),
    entities: ea(),
    records: ea(),
    support: t1
}), t4 = e_({
    code: en(),
    message: en(),
    offset: ea(),
    mask: ea()
}), t5 = e_({
    class_id: ea(),
    entity_id: ea(),
    name: eh([
        en(),
        el()
    ]),
    support: t1,
    reference: eh([
        tX,
        el()
    ]),
    sequences: ep(ea()),
    attributes: ep(t2),
    diagnostics: ep(t4)
}), t3 = ey("ready"), t6 = e_({
    class_id: ea(),
    entity_id: ea(),
    sequence: ea(),
    attribute_mask: ea(),
    raw_hex: en(),
    consumed: ea(),
    remaining_hex: en(),
    undecoded_mask: ea()
}), t7 = e_({
    raw_hex: en(),
    filter_outer_priority: ea(),
    filter_outer_vid: ea(),
    filter_outer_tpid_dei: ea(),
    filter_inner_priority: ea(),
    filter_inner_vid: ea(),
    filter_inner_tpid_dei: ea(),
    filter_ethertype: ea(),
    tags_to_remove: ea(),
    treatment_outer_priority: ea(),
    treatment_outer_vid: ea(),
    treatment_outer_tpid_dei: ea(),
    treatment_inner_priority: ea(),
    treatment_inner_vid: ea(),
    treatment_inner_tpid_dei: ea(),
    delete_entry: es()
}), t9 = e_({
    class_id: ea(),
    entity_id: ea(),
    attribute: tG,
    collected: es(),
    error: eh([
        en(),
        el()
    ]),
    raw_hex: en(),
    rows: ep(en()),
    vlan_rules: ep(t7)
}), ne = e_({
    schema_version: ey(1),
    reference_version: en(),
    onu_id: eh([
        ea(),
        el()
    ]),
    uploaded_complete: es(),
    expected_records: ea(),
    received_records: ea(),
    decoded_records: ea(),
    partial_records: ea(),
    basic_records: ea(),
    tables_requested: es(),
    tables_collected: es(),
    classes: ep(t8),
    entities: ep(t5),
    records: ep(t6),
    tables: ep(t9),
    diagnostics: ep(t4)
});
e_({
    status: t3,
    report: ne
}), e_({
    onu_id: ea(),
    optical_sn: en(),
    tables: es()
});
const nt = eh([
    e_({
        status: ey("success"),
        enabled: es()
    }),
    e_({
        status: ey("error"),
        error: en()
    })
]);
e_({
    enabled: es(),
    bridge: en(),
    wan_upstream: es(),
    wan_downstream: es(),
    onu_bridge: es()
});
const nn = e_({
    index: en(),
    state: en(),
    pkt_type: en(),
    orig_tuple: en(),
    new_tuple: en(),
    eth: en(),
    vlan: en(),
    packets: ea(),
    bytes: ea(),
    counters_valid: es(),
    packets_exact: en(),
    bytes_exact: en()
}), nr = e_({
    sampled_at_ms: ea(),
    errors: ep(en()),
    config_valid: es(),
    engine_valid: es(),
    mask_valid: es(),
    routed_mask_valid: es(),
    debug_valid: es(),
    flows_valid: es(),
    entries_valid: es(),
    counters_valid: es(),
    hooks_valid: es(),
    total_packets_exact: en(),
    total_bytes_exact: en(),
    supported: es(),
    engine_attached: es(),
    bridge_offload_enabled: es(),
    wan_upstream: es(),
    wan_downstream: es(),
    onu_bridge: es(),
    bridge_offload_mask: ea(),
    routed_offload_mask: ea(),
    bridge_offload_debug: es(),
    bridge: en(),
    active_ports: ep(en()),
    fw4_hooks_ready: es(),
    total_entries: ea(),
    bound_entries: ea(),
    bound_ipv4_entries: ea(),
    bound_ipv6_entries: ea(),
    total_packets: ea(),
    total_bytes: ea(),
    bound_flows: ep(nn)
}), na = e_({
    equipment_id: eh([
        en(),
        el()
    ]),
    hardware_version: eh([
        en(),
        el()
    ]),
    software_images: ep(en()),
    omcc_version: eh([
        ea(),
        el()
    ]),
    errors: ep(en())
}), ni = e_({
    desired: ef(en(), ea()),
    active: ef(en(), ea()),
    pending_restart: es(),
    allocation_blocked: es(),
    startup_error: eh([
        en(),
        el()
    ]),
    config_error: eh([
        en(),
        el()
    ])
}), ns = eh([
    ey("optical_on"),
    ey("optical_off"),
    ey("optical_status"),
    ey("optical_reload"),
    ey("optical_reinitialize"),
    ey("optical_shutdown")
]), no = e_({
    enabled: es(),
    downstream_tx_enabled: es(),
    fec_enabled: es()
}), nl = e_({
    desired_tx_enabled: es(),
    desired_fec_enabled: es(),
    register: eh([
        ea(),
        el()
    ]),
    tx_enabled: eh([
        es(),
        el()
    ]),
    fec_enabled: eh([
        es(),
        el()
    ]),
    error: eh([
        en(),
        el()
    ])
}), nc = eh([
    ey("success"),
    ey("error")
]), nd = eh([
    ey("enabled"),
    ey("disabled"),
    ey("unknown")
]), np = e_({
    settings: ew(no),
    pon_mac: ew(nl),
    schema_version: ey(1),
    status: nc,
    action: ns,
    desired_enabled: eh([
        es(),
        el()
    ]),
    tx_enabled: eh([
        es(),
        el()
    ]),
    actor_state: nd,
    hardware_ready: es(),
    discovery_active: es(),
    cleanup_pending: es(),
    error: eh([
        tj,
        el()
    ])
}), nu = e_({
    model: en(),
    wavelength_tx_nm: ea(),
    wavelength_rx_nm: ea(),
    phy_rate_downlink_gbps: ea(),
    phy_rate_uplink_gbps: ea(),
    tx_power_dbm: eh([
        ea(),
        el()
    ]),
    laser_bias_current_ma: eh([
        ea(),
        el()
    ]),
    temperature_celsius: eh([
        ea(),
        el()
    ]),
    vcc_voltage: eh([
        ea(),
        el()
    ]),
    cdr_locked: eh([
        es(),
        el()
    ]),
    tx_enabled: ew(es()),
    measurements: ef(en(), th)
}), n_ = eh([
    ey("o1_initial"),
    ey("o2_standby"),
    ey("o3_serial_number"),
    ey("o4_ranging"),
    ey("o5_operation"),
    ey("o6_intermittent_lods"),
    ey("o7_emergency_stop")
]), ng = e_({
    restarting: ey(!0)
}), nh = e_({
    calls: ea(),
    failures: ea(),
    last_us: ea(),
    max_us: ea(),
    total_us: ea()
}), nm = e_({
    port: ea(),
    interface: en(),
    carrier: es(),
    status: en(),
    onu_id: ew(ea()),
    onu_sn: ew(en()),
    link_state: en(),
    reserved_sn: ew(en())
}), nf = e_({
    channel_2g: eh([
        ea(),
        el()
    ]),
    channel_5g: eh([
        ea(),
        el()
    ]),
    bandwidth_5g: eh([
        en(),
        el()
    ]),
    tx_power_pct: eh([
        ea(),
        el()
    ]),
    measurements: ef(en(), th)
}), nb = e_({
    onu_id: ea(),
    vendor: en(),
    model: en(),
    serial_number: en(),
    state: n_,
    business_status: eO,
    management: eh([
        eB,
        el()
    ]),
    provisioning: eh([
        te,
        el()
    ]),
    services: ep(eY),
    ssids: ep(eY),
    wifi_sync: tt,
    identity: eh([
        na,
        el()
    ]),
    identity_age_seconds: eh([
        ea(),
        el()
    ]),
    identity_current: es(),
    fiber_distance_m: eh([
        ea(),
        el()
    ]),
    ranging_delay_rtd_ns: eh([
        ea(),
        el()
    ]),
    equalization_delay_bits: eh([
        ea(),
        el()
    ]),
    optical_rx_power_dbm: eh([
        ea(),
        el()
    ]),
    optical_tx_power_dbm: eh([
        ea(),
        el()
    ]),
    firmware_version: en(),
    hardware_version: en(),
    uptime_seconds: eh([
        ea(),
        el()
    ]),
    fec: ew(tb),
    data_path: tm,
    wifi_mesh: nf,
    connected_clients: eh([
        ep(tK),
        el()
    ]),
    measurements: ef(en(), th)
}), ny = e_({
    id: en(),
    last_seen_sec_ago: ea(),
    last_payload_bytes: ea()
}), nv = e_({
    ubus: ew(ef(en(), nh)),
    jobs: ew(tH),
    onu_pinning: ew(ni),
    fpga_status: en(),
    pon_mac: ew(nl),
    provisioning: eh([
        tc,
        el()
    ]),
    optical_transceiver: nu,
    switch_ports: ep(nm),
    sub_gateways: ep(nb),
    telemetry_gateways: ep(ny),
    npu: ew(nr),
    ipc: ew(tD)
}), nw = eh([
    ey("plan"),
    ey("apply"),
    ey("management_plan"),
    ey("management_apply"),
    ey("reset_state"),
    ey("reconcile"),
    ey("retry")
]), nx = eh([
    e_({
        operation_ids: ep(ea()),
        revision: en()
    }),
    e_({
        started: ey(!0),
        mode: e0
    }),
    e_({
        reset: ey(!0),
        device: en()
    }),
    e_({
        operation_ids: ep(ea()),
        mode: e0,
        reconcile: ew(es()),
        retry: ew(es())
    }),
    eL
]);
e_({
    action: nw,
    target: en(),
    management: ew(es()),
    item: ew(en())
});
let nk = e_({
    error: eh([
        en(),
        e_({
            code: en(),
            message: en()
        })
    ])
});
class nz extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function nj(e) {
    let t = nk.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new nz("rpc", e) : new nz(e.code, e.message);
    }
    return e;
}
function nC(e) {
    return {
        parse (t) {
            let n = e.parse(nj(t));
            if ("object" == typeof n && null !== n && "error" in n) throw nj(n), Error("Unexpected RPC error");
            return n;
        }
    };
}
const nS = nC(tR), nT = nC(tJ), n$ = nC(tC), nE = nC(tP), nO = {
    parse (e) {
        let t = nx.parse(nj(e));
        if ("error" in t) throw Error(t.error);
        return t;
    }
};
ef(en(), e_({
    carrier: ew(es()),
    mac: ew(en()),
    link: ew(e_({
        speed: ew(ea()),
        duplex: ew(en()),
        autoneg: ew(es())
    })),
    stats: ew(ef(en(), ea()))
}));
const nN = {
    getCapabilities: {
        parse: (e)=>eD.parse(nj(e))
    },
    opticalStatus: np,
    opticalSet: np,
    getStatus: {
        parse: (e)=>nv.parse(nj(e))
    },
    getSync: {
        parse: (e)=>tc.parse(nj(e))
    },
    configCheck: {
        parse (e) {
            if ("object" == typeof e && null !== e && "error" in e && ("valid" in e || "revision" in e || "devices" in e)) throw Error("Mixed configuration check result");
            return eU.parse(e);
        }
    },
    npuStatus: nr,
    configReload: {
        parse: (e)=>tc.parse(nj(e))
    },
    restartService: {
        parse: (e)=>ng.parse(nj(e))
    },
    sync: {
        parse: (e)=>nO.parse(nj(e))
    },
    npuSet: nt,
    mibStart: {
        parse: (e)=>tV.parse(nj(e))
    },
    mibResult: {
        parse: (e)=>tF.parse(nj(e))
    },
    jobRelease: {
        parse: (e)=>tW.parse(nj(e))
    },
    hl202List: {
        parse: (e)=>nS.parse(nj(e))
    },
    hl202Report: {
        parse: (e)=>tV.parse(nj(e))
    },
    hl202AccountsStart: {
        parse: (e)=>tV.parse(nj(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>tV.parse(nj(e))
    },
    hl202ExecStart: {
        parse: (e)=>tV.parse(nj(e))
    },
    jobResult: {
        parse: (e)=>tF.parse(nj(e))
    },
    getCalibration: {
        parse: (e)=>eM.parse(nj(e))
    },
    saveCalibration: {
        parse: (e)=>eq.parse(nj(e))
    },
    applyCalibration: {
        parse: (e)=>tV.parse(nj(e))
    }
};
function nP() {
    var e;
    let n, r, a, i, s, o, l, c, d, p, u, g, h, m, f, b, y, v, w, x, k, z, j;
    return t ??= (e = L.rpc, n = e.declare({
        object: "fttr",
        method: "get_capabilities",
        reject: !0
    }), r = e.declare({
        object: "fttr",
        method: "optical_status",
        reject: !0
    }), a = e.declare({
        object: "fttr",
        method: "optical_set",
        params: [
            "enabled",
            "downstream_tx_enabled",
            "fec_enabled"
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
    }), c = e.declare({
        object: "fttr",
        method: "config_reload",
        reject: !0
    }), d = e.declare({
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
            "bridge",
            "wan_upstream",
            "wan_downstream",
            "onu_bridge"
        ],
        reject: !0
    }), g = e.declare({
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
    }), m = e.declare({
        object: "fttr",
        method: "job_release",
        params: [
            "job"
        ],
        reject: !0
    }), f = e.declare({
        object: "fttr",
        method: "hl202_list",
        reject: !0
    }), b = e.declare({
        object: "fttr",
        method: "hl202_report",
        params: [
            "target"
        ],
        reject: !0
    }), y = e.declare({
        object: "fttr",
        method: "hl202_accounts_start",
        params: [
            "target"
        ],
        reject: !0
    }), v = e.declare({
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
        getCapabilities: async ()=>nN.getCapabilities.parse(await n()),
        opticalStatus: async ()=>nN.opticalStatus.parse(await r()),
        opticalSet: async (e)=>nN.opticalSet.parse(await a(e.enabled, e.downstream_tx_enabled, e.fec_enabled)),
        getStatus: async ()=>nN.getStatus.parse(await i()),
        getSync: async ()=>nN.getSync.parse(await s()),
        configCheck: async ()=>nN.configCheck.parse(await o()),
        npuStatus: async ()=>nN.npuStatus.parse(await l()),
        configReload: async ()=>nN.configReload.parse(await c()),
        restartService: async ()=>nN.restartService.parse(await d()),
        sync: async (e)=>nN.sync.parse(await p(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>nN.npuSet.parse(await u(e.enabled, e.bridge, e.wan_upstream, e.wan_downstream, e.onu_bridge)),
        mibStart: async (e)=>nN.mibStart.parse(await g(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>nN.mibResult.parse(await h(e.job, e.chunk)),
        jobRelease: async (e)=>nN.jobRelease.parse(await m(e.job)),
        hl202List: async ()=>nN.hl202List.parse(await f()),
        hl202Report: async (e)=>nN.hl202Report.parse(await b(e.target)),
        hl202AccountsStart: async (e)=>nN.hl202AccountsStart.parse(await y(e.target)),
        hl202AccountUpdate: async (e)=>nN.hl202AccountUpdate.parse(await v(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>nN.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>nN.jobResult.parse(await x(e.job, e.chunk)),
        getCalibration: async ()=>nN.getCalibration.parse(await k()),
        saveCalibration: async (e)=>nN.saveCalibration.parse(await z(e.data)),
        applyCalibration: async ()=>nN.applyCalibration.parse(await j())
    });
}
const nR = async ()=>nP().getCapabilities();
async function nM(e) {
    if (!(await nR()).pages[e]) throw Error(_("This page is not supported by the installed FTTR build."));
}
_("Ready"), _("Online"), _("Success"), _("Offline"), _("Error"), _("Failed"), _("Timeout"), _("Pending"), _("Running"), _("Unavailable"), _("Disabled"), _("Enabled");
const nL = (e)=>null == e || "" === e ? "\u2014" : String(e), nq = (e)=>e ? new Date(1000 * e).toLocaleString() : "\u2014";
function nA(e, t, n) {
    return o("span", {
        class: `hl202-badge hl202-badge-${e}`,
        title: n,
        children: t
    });
}
async function nZ(e) {
    let t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : nj, r = tV.parse(nj(e)), a = Date.now() + 330000, i = window.location.pathname, s = [], o = 0;
    try {
        for(let e = 0; e < 128;){
            if (window.location.pathname !== i) throw new nz("navigation", _("Result polling stopped after leaving the page. The backend job is not cancelled."));
            if (Date.now() > a) throw new nz("timeout", _("Job polling timed out; execution outcome is unknown. Do not automatically retry."));
            let l = await nP().jobResult({
                job: r.job,
                chunk: e
            });
            if ("pending" === l.status) {
                await new Promise((e)=>window.setTimeout(e, 1000));
                continue;
            }
            if (!Number.isInteger(l.chunks) || l.chunks < 1 || l.chunks > 128 || l.chunk !== e || !Number.isInteger(l.bytes) || l.bytes < 1 || l.bytes > 4194304 || l.data.length > 43692) throw new nz("transport", _("Invalid job result"));
            if (t && (l.chunks !== t.chunks || l.bytes !== t.bytes)) throw new nz("transport", _("Inconsistent job result chunks"));
            t = {
                chunks: l.chunks,
                bytes: l.bytes
            };
            let c = Uint8Array.from(atob(l.data), (e)=>e.charCodeAt(0));
            if (c.length > 32768 || o + c.length > l.bytes) throw new nz("transport", _("Job result exceeds the transport limit"));
            if (s.push(c), o += c.length, ++e === l.chunks) {
                if (o !== l.bytes) throw new nz("transport", _("Incomplete job result"));
                let e = new Uint8Array(o), t = 0;
                for (let n of s)e.set(n, t), t += n.length;
                return n(JSON.parse(new TextDecoder("utf-8", {
                    fatal: !0
                }).decode(e)));
            }
        }
        throw new nz("transport", _("Too many result chunks"));
    } finally{
        await nP().jobRelease({
            job: r.job
        }).catch(()=>{});
    }
}
const nJ = async ()=>nP().hl202List(), nD = async (e)=>nT.parse(await nZ(await nP().hl202Report({
        target: e
    }))), nU = async (e)=>n$.parse(await nZ(await nP().hl202AccountsStart({
        target: e
    }))), nQ = async (e, t)=>n$.parse(await nZ(await nP().hl202AccountUpdate({
        target: e,
        kind: "password" === t.kind ? "account_set_password" : "account_set_active",
        entry: t.entry,
        password: t.password,
        active: t.active
    }))), nI = async (e, t, n)=>nE.parse(await nZ(await nP().hl202ExecStart({
        target: e,
        script: t,
        timeout_seconds: n
    })));
let nF = !1;
function nV() {
    var e, t;
    let n = null, r = o("div", {
        style: "margin:8px 0;display:flex;align-items:center;flex-wrap:wrap;gap:10px"
    }), a = o("div", {
        style: "overflow-x:auto;margin:8px 0"
    }), i = o("div", {
        style: "margin-top:10px"
    }), s = o("div", {
        style: "font-size:88%;color:#888;margin:6px 0",
        "aria-live": "polite"
    }), l = o("button", {
        type: "button",
        class: "cbi-button cbi-button-action",
        children: _("Read MQTT report")
    }), c = async (e)=>{
        let t = e || n;
        if (!t) {
            s.textContent = _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
            return;
        }
        if (nF) {
            s.textContent = _("Another operation is in progress.");
            return;
        }
        nF = !0, l.disabled = !0, s.textContent = _("Waiting for device result\u2026");
        try {
            var c, d, p, u, g, h, m, f, b, y, v, w, x, k, z, j, C, S, T, $, O, N;
            let e = await nD(t);
            if (JSON.stringify(t) !== JSON.stringify(n)) return;
            if (!e.report) {
                r.replaceChildren(), a.replaceChildren(), i.replaceChildren(), s.textContent = _("No MQTT report has been parsed yet.");
                return;
            }
            let l = e.report;
            if (r.replaceChildren((d = {
                children: [
                    (c = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Revision"),
                            ":"
                        ]
                    }, o("span", c)),
                    nA("info", `#${String(l.revision)}`)
                ]
            }, o("span", d)), (g = {
                children: [
                    (p = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Last received"),
                            ":"
                        ]
                    }, o("span", p)),
                    (u = {
                        children: nq("number" == typeof l.last_received ? l.last_received : void 0)
                    }, o("strong", u))
                ]
            }, o("span", g)), (f = {
                children: [
                    (h = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Last good report"),
                            ":"
                        ]
                    }, o("span", h)),
                    (m = {
                        children: nq("number" == typeof l.last_good ? l.last_good : void 0)
                    }, o("strong", m))
                ]
            }, o("span", f))), "string" == typeof l.error && r.append((b = {
                class: "alert-message warning",
                style: "width:100%;margin-top:6px",
                children: [
                    _("Latest report error"),
                    ": ",
                    l.error
                ]
            }, o("div", b))), l.report) {
                let e = l.report, t = e.fields;
                a.replaceChildren((j = {
                    class: "table",
                    style: "font-size:90%",
                    children: [
                        (k = {
                            children: (x = {
                                children: [
                                    (y = {
                                        children: _("Field")
                                    }, o("th", y)),
                                    (v = {
                                        children: _("Value")
                                    }, o("th", v)),
                                    (w = {
                                        children: _("Source member")
                                    }, o("th", w))
                                ]
                            }, o("tr", x))
                        }, o("thead", k)),
                        (z = {
                            children: Object.entries(t).map((e)=>{
                                var t, n, r, a, i, s, l;
                                let [c, d] = e, p = d.value, u = null === p ? "\u2014" : `${"object" == typeof p ? JSON.stringify(p) : String(p)}${d.unit ? ` ${d.unit}` : ""}`;
                                return "uptime_seconds" === c && "number" == typeof p && (u = function(e) {
                                    if (void 0 === e || !Number.isFinite(e) || e < 0) return "\u2014";
                                    let t = Math.floor(e / 86400), n = Math.floor(e % 86400 / 3600), r = Math.floor(e % 3600 / 60), a = [];
                                    return t > 0 && a.push(_("%d days").replace("%d", String(t))), (n > 0 || t > 0) && a.push(_("%d hours").replace("%d", String(n))), (r > 0 || n > 0 || t > 0) && a.push(_("%d minutes").replace("%d", String(r))), a.push(_("%d seconds").replace("%d", String(e % 60))), `${a.join(" ")} (${e} s)`;
                                }(p)), l = {
                                    children: [
                                        (n = {
                                            children: (t = {
                                                children: c
                                            }, o("code", t))
                                        }, o("td", n)),
                                        (a = {
                                            children: (r = {
                                                children: u
                                            }, o("strong", r))
                                        }, o("td", a)),
                                        (s = {
                                            children: (i = {
                                                class: "hl202-badge hl202-badge-neutral",
                                                children: nL(d.member)
                                            }, o("span", i))
                                        }, o("td", s))
                                    ]
                                }, o("tr", l);
                            })
                        }, o("tbody", z))
                    ]
                }, o("table", j)));
                let n = [];
                for (let t of e.members){
                    let e = (C = {
                        type: "button",
                        class: "fttr-btn-subtle",
                        style: "margin-left:8px",
                        onclick: (n)=>{
                            n.stopPropagation(), "string" == typeof t.text && (navigator.clipboard?.writeText(t.text), e.textContent = _("Copied to clipboard"), setTimeout(()=>{
                                e.textContent = _("Copy member text");
                            }, 1500));
                        },
                        children: _("Copy member text")
                    }, o("button", C));
                    n.push((N = {
                        style: "margin:6px 0;border:1px solid rgba(127,140,141,0.15);border-radius:4px;padding:4px 8px",
                        children: [
                            (S = {
                                style: "cursor:pointer;user-select:none;font-weight:600;font-size:90%",
                                children: [
                                    _("%s (%s bytes, %s)").format(String(t.name), String(t.bytes), String(t.encoding)),
                                    "string" == typeof t.text ? e : null
                                ]
                            }, o("summary", S)),
                            (O = {
                                style: "margin-top:6px",
                                children: "string" == typeof t.text ? (T = {
                                    class: "hl202-terminal-output",
                                    style: "max-height:16rem",
                                    children: t.text
                                }, o("pre", T)) : ($ = {
                                    style: "font-size:85%;color:#888;margin:4px 0",
                                    children: t.text_omitted ? _("Text omitted at the shared byte limit.") : _("Binary member; text is unavailable.")
                                }, o("p", $))
                            }, o("div", O))
                        ]
                    }, o("details", N)));
                }
                i.replaceChildren(...e.errors.map((e)=>{
                    var t;
                    return t = {
                        class: "alert-message warning",
                        children: e
                    }, o("div", t);
                }), ...n);
            } else a.replaceChildren(), i.replaceChildren();
            s.textContent = "";
        } catch (e) {
            s.textContent = e instanceof Error ? e.message : _("Request failed");
        } finally{
            nF = !1, l.disabled = !n;
        }
    };
    return l.addEventListener("click", ()=>{
        c();
    }), {
        element: (t = {
            class: "cbi-section hl202-panel-report",
            children: [
                (e = {
                    style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                    children: [
                        o("h3", {
                            style: "margin:0",
                            children: _("MQTT report")
                        }),
                        l
                    ]
                }, o("div", e)),
                s,
                r,
                a,
                i
            ]
        }, o("div", t)),
        setTarget (e) {
            JSON.stringify(e) !== JSON.stringify(n) && (r.replaceChildren(), a.replaceChildren(), i.replaceChildren(), s.textContent = ""), n = e, l.disabled = !e;
        },
        refresh: (e)=>c(e)
    };
}
let nW = L.view;
if (!("extend" in nW) || "function" != typeof nW.extend) throw Error("LuCI view extension is unavailable");
let main = Reflect.apply(nW.extend, nW, [
    {
        load: ()=>nM("hl202"),
        render: function() {
            var e, t, n, r, a, i, s, l, c, d, p, u, g;
            let h, m, f, b, y, v = o("select", {
                id: "hl202-device",
                class: "cbi-input-select",
                "aria-label": _("HL202 device"),
                style: "min-width:320px"
            }), w = o("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                children: _("Refresh devices")
            }), x = o("div", {
                style: "font-size:88%;color:#888;margin:6px 0",
                "aria-live": "polite"
            }), k = o("strong", {
                children: "\u2014"
            }), z = o("span", {
                class: "hl202-badge hl202-badge-neutral",
                style: "font-size:80%",
                children: "\u2014"
            }), j = o("span", {
                class: "hl202-badge hl202-badge-neutral",
                children: "\u2014"
            }), C = o("span", {
                class: "hl202-badge hl202-badge-neutral",
                children: "\u2014"
            }), S = o("span", {
                class: "hl202-badge hl202-badge-info",
                style: "font-size:80%",
                children: "\u2014"
            }), T = o("div", {
                class: "alert-message warning",
                style: "margin-top:8px",
                hidden: !0,
                children: _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
            }), $ = (n = {
                class: "cbi-section hl202-device-card",
                style: "margin-bottom:0",
                children: [
                    (t = {
                        class: "hl202-card-header",
                        children: [
                            o("div", {
                                class: "hl202-device-title",
                                children: [
                                    k,
                                    z
                                ]
                            }),
                            o("div", {
                                class: "hl202-device-badges",
                                children: [
                                    j,
                                    C,
                                    S
                                ]
                            }),
                            (e = {
                                class: "hl202-device-links",
                                children: o("a", {
                                    href: L.url("admin", "network", "fttr", "hardware"),
                                    class: "fttr-btn-subtle",
                                    children: [
                                        _("Open optical status and ONU/MIB details"),
                                        " \u2192"
                                    ]
                                })
                            }, o("div", e))
                        ]
                    }, o("div", t)),
                    T
                ]
            }, o("div", n)), O = nV(), N = (h = null, m = o("div", {
                style: "font-size:88%;color:#888;margin:6px 0",
                "aria-live": "polite"
            }), f = o("div", {
                style: "margin-top:10px;display:flex;flex-direction:column;gap:10px"
            }), (b = o("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                children: _("Read users")
            })).disabled = !L.hasViewPermission(), y = async ()=>{
                if (!h) {
                    m.textContent = _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
                    return;
                }
                if (nF) {
                    m.textContent = _("Another operation is in progress.");
                    return;
                }
                nF = !0, b.disabled = !0, m.textContent = _("Waiting for device result\u2026");
                let e = h;
                try {
                    let g = await nU(e);
                    if (JSON.stringify(e) !== JSON.stringify(h)) return;
                    f.replaceChildren();
                    let b = g.operation, y = b.result;
                    if ("timeout" === y.status ? m.textContent = _("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.") : m.textContent = b.binding_current ? y.error ?? (null === g.accounts ? _("Account data is unavailable.") : "") : _("Device binding changed; this result is stale."), g.accounts && b.binding_current) {
                        let m = [];
                        for (let f of g.accounts){
                            var t, n, r, a, i, s, l, c, d, p, u;
                            let g = f.entry, b = f.active, y = (t = {
                                class: `hl202-badge ${b ? "hl202-badge-success" : "hl202-badge-neutral"}`,
                                style: "font-size:80%",
                                children: b ? _("Enabled") : _("Disabled")
                            }, o("span", t)), v = (n = {
                                type: "password",
                                class: "cbi-input-text",
                                placeholder: _("New password"),
                                autocomplete: "new-password",
                                style: "width:180px"
                            }, o("input", n)), w = (r = {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                children: _("Set password")
                            }, o("button", r)), x = (a = {
                                type: "button",
                                class: `cbi-button ${b ? "cbi-button-neutral" : "cbi-button-apply"}`,
                                children: b ? _("Disable") : _("Enable")
                            }, o("button", a));
                            w.disabled = x.disabled = !L.hasViewPermission();
                            let k = (i = {
                                style: "font-size:82%;margin-top:4px",
                                "aria-live": "polite"
                            }, o("div", i));
                            w.addEventListener("click", async ()=>{
                                if (!h || nF || JSON.stringify(e) !== JSON.stringify(h)) return;
                                let t = v.value;
                                if (!t) {
                                    k.textContent = _("Enter a non-empty password.");
                                    return;
                                }
                                v.value = "", nF = !0, w.disabled = x.disabled = !0, k.textContent = _("Waiting for device result\u2026");
                                try {
                                    let n = await nQ(e, {
                                        entry: g,
                                        kind: "password",
                                        password: t,
                                        active: b
                                    });
                                    if (JSON.stringify(e) !== JSON.stringify(h)) return;
                                    let r = n.operation, a = r.result;
                                    r.binding_current && "accepted_and_saved" === n.write_status ? k.textContent = _("Password accepted and saved; web login permission is not verified.") : k.textContent = a.error ?? _("Execution outcome is unknown. Do not automatically retry.");
                                } catch (e) {
                                    k.textContent = e instanceof Error ? e.message : _("Request failed");
                                } finally{
                                    nF = !1, w.disabled = x.disabled = !L.hasViewPermission();
                                }
                            }), x.addEventListener("click", async ()=>{
                                if (h && !nF && JSON.stringify(e) === JSON.stringify(h)) {
                                    nF = !0, w.disabled = x.disabled = !0, k.textContent = _("Waiting for device result\u2026");
                                    try {
                                        let t = !b, n = await nQ(e, {
                                            entry: g,
                                            kind: "active",
                                            password: "",
                                            active: t
                                        });
                                        if (JSON.stringify(e) !== JSON.stringify(h)) return;
                                        let r = n.accounts?.find((e)=>e.entry === g);
                                        if (!n.operation.binding_current || "accepted_and_saved" !== n.write_status || !r) {
                                            k.textContent = n.operation.result.error ?? _("Execution outcome is unknown. Refresh users before retrying.");
                                            return;
                                        }
                                        b = r.active, y.className = `hl202-badge ${b ? "hl202-badge-success" : "hl202-badge-neutral"}`, y.textContent = b ? _("Enabled") : _("Disabled"), x.className = `cbi-button ${b ? "cbi-button-neutral" : "cbi-button-apply"}`, x.textContent = b ? _("Disable") : _("Enable"), k.textContent = `${String(n.write_status)}; ${_("Refresh users to read the current state.")}`;
                                    } catch (e) {
                                        k.textContent = e instanceof Error ? e.message : _("Request failed");
                                    } finally{
                                        nF = !1, w.disabled = x.disabled = !L.hasViewPermission();
                                    }
                                }
                            }), m.push((u = {
                                class: "cbi-section",
                                style: "margin:0;padding:10px 14px;border:1px solid rgba(127,140,141,0.2);border-radius:5px",
                                children: [
                                    (p = {
                                        style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                                        children: [
                                            (c = {
                                                style: "display:flex;align-items:center;gap:8px",
                                                children: [
                                                    (s = {
                                                        style: "font-size:105%",
                                                        children: f.username
                                                    }, o("strong", s)),
                                                    (l = {
                                                        style: "font-size:80%;color:#888",
                                                        children: _("(Entry %s)").replace("%s", String(g))
                                                    }, o("span", l)),
                                                    y
                                                ]
                                            }, o("div", c)),
                                            (d = {
                                                style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px",
                                                children: [
                                                    v,
                                                    w,
                                                    x
                                                ]
                                            }, o("div", d))
                                        ]
                                    }, o("div", p)),
                                    k
                                ]
                            }, o("div", u)));
                        }
                        f.replaceChildren(...m);
                    }
                } catch (e) {
                    m.textContent = e instanceof Error ? e.message : _("Request failed");
                } finally{
                    nF = !1, b.disabled = !h || !L.hasViewPermission();
                }
            }, b.addEventListener("click", ()=>{
                y();
            }), {
                element: (g = {
                    class: "cbi-section hl202-panel-accounts",
                    children: [
                        (u = {
                            style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:6px",
                            children: [
                                o("h3", {
                                    style: "margin:0",
                                    children: _("User management")
                                }),
                                b
                            ]
                        }, o("div", u)),
                        o("p", {
                            style: "font-size:85%;color:#888;margin:4px 0",
                            children: _("Password writes are accepted and saved by the device; this does not prove web login permission. Existing permission masks are preserved.")
                        }),
                        m,
                        f
                    ]
                }, o("div", g)),
                setTarget (e) {
                    JSON.stringify(e) !== JSON.stringify(h) && (f.replaceChildren(), m.textContent = ""), h = e, b.disabled = !e || !L.hasViewPermission();
                },
                refresh: ()=>y()
            }), P = function() {
                var e, t, n, r;
                let a = null, i = o("div", {
                    style: "font-size:88%;color:#666;margin:4px 0"
                }), s = o("textarea", {
                    id: "hl202-script",
                    rows: 8,
                    class: "hl202-terminal-textarea",
                    spellcheck: !1,
                    "aria-label": _("Remote shell command"),
                    placeholder: _("# Enter shell commands to execute on the selected sub-gateway (Ctrl + Enter to execute)...")
                }), l = o("input", {
                    type: "number",
                    id: "hl202-timeout",
                    min: "1",
                    max: "300",
                    value: "20",
                    class: "cbi-input-text",
                    style: "width:70px;text-align:center",
                    "aria-label": _("Timeout in seconds")
                }), c = o("button", {
                    type: "button",
                    class: "cbi-button cbi-button-apply",
                    style: "font-weight:600",
                    children: _("Execute on selected HL202")
                });
                c.disabled = !L.hasViewPermission();
                let d = o("div", {
                    style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px"
                }), p = o("pre", {
                    class: "hl202-terminal-output",
                    style: "min-height:4rem;display:none",
                    children: _("# Waiting for commands...")
                }), u = o("button", {
                    type: "button",
                    class: "fttr-btn-subtle",
                    onclick: ()=>{
                        p.textContent && (navigator.clipboard?.writeText(p.textContent), u.textContent = _("Copied to clipboard"), setTimeout(()=>{
                            u.textContent = _("Copy output");
                        }, 1500));
                    },
                    children: _("Copy output")
                }), g = o("button", {
                    type: "button",
                    class: "fttr-btn-subtle",
                    onclick: ()=>{
                        p.textContent = "", p.style.display = "none", d.replaceChildren();
                    },
                    children: _("Clear output")
                }), h = async ()=>{
                    var e, t, n, r, i, h, m, f, b, y, v;
                    if (!a) return void d.replaceChildren(o("div", {
                        class: "alert-message warning",
                        children: _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
                    }));
                    if (nF) return void d.replaceChildren(o("div", {
                        class: "alert-message warning",
                        children: _("Another operation is in progress.")
                    }));
                    let w = Number(l.value);
                    if (!Number.isInteger(w) || w < 1 || w > 300) return void d.replaceChildren(o("div", {
                        class: "alert-message warning",
                        children: _("Timeout must be 1\u2013300 seconds.")
                    }));
                    let x = s.value.trim();
                    if (!x || x.includes("\0") || new TextEncoder().encode(x).length > 65536) return void d.replaceChildren(o("div", {
                        class: "alert-message warning",
                        children: _("Enter a non-empty UTF-8 script up to 64 KiB without NUL characters.")
                    }));
                    nF = !0, c.disabled = !0, p.style.display = "block", p.textContent = `# [${new Date().toLocaleTimeString()}] ${_("Dispatching to %s (timeout: %s s)...").format(a.optical_sn, String(w))}\n`, d.replaceChildren(nA("info", _("Waiting for device result\u2026")));
                    let k = Date.now(), z = a;
                    try {
                        let l = await nI(z, s.value, w);
                        if (JSON.stringify(z) !== JSON.stringify(a)) return;
                        let c = ((Date.now() - k) / 1000).toFixed(2), v = l.operation, x = v.result, j = x.status, C = x.exit_code, S = v.binding_current && !x.error && "executed" === j && 0 === C, T = nA(S ? "success" : "timeout" === j ? "warning" : "danger", S ? _("Success") : "timeout" === j ? _("Timeout") : `${_("Exit code")} ${String(C ?? j)}`);
                        d.replaceChildren(T, (n = {
                            children: [
                                (e = {
                                    style: "color:#888",
                                    children: [
                                        _("Exit code"),
                                        ":"
                                    ]
                                }, o("span", e)),
                                " ",
                                (t = {
                                    children: String(C ?? "\u2014")
                                }, o("code", t))
                            ]
                        }, o("span", n)), (h = {
                            children: [
                                (r = {
                                    style: "color:#888",
                                    children: [
                                        _("Duration"),
                                        ":"
                                    ]
                                }, o("span", r)),
                                " ",
                                (i = {
                                    children: [
                                        c,
                                        " s"
                                    ]
                                }, o("strong", i))
                            ]
                        }, o("span", h)), (b = {
                            children: [
                                (m = {
                                    style: "color:#888",
                                    children: [
                                        _("Request ID"),
                                        ":"
                                    ]
                                }, o("span", m)),
                                " ",
                                (f = {
                                    children: String(x.request_id ?? "\u2014")
                                }, o("code", f))
                            ]
                        }, o("span", b)), (y = {
                            style: "margin-left:auto;display:flex;gap:6px",
                            children: [
                                u,
                                g
                            ]
                        }, o("div", y)));
                        let $ = [];
                        v.binding_current || $.push(_("Device binding changed; this result is stale.")), ("timeout" === j || "dispatched" === j) && $.push(_("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.")), "string" == typeof x.output && x.output.length && $.push(x.output), "string" == typeof x.error && x.error.length && $.push(`[STDERR]\n${x.error}`), !0 === x.output_truncated && $.push(`\n[!] ${_("Output was truncated at the byte limit.")}`), 0 === $.length && $.push(_("No output returned.")), p.textContent = $.join("\n");
                    } catch (t) {
                        let e = ((Date.now() - k) / 1000).toFixed(2);
                        d.replaceChildren(nA("danger", _("Failed")), (v = {
                            children: [
                                o("span", {
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
                        }, o("span", v)), o("div", {
                            style: "margin-left:auto;display:flex;gap:6px",
                            children: [
                                u,
                                g
                            ]
                        })), p.textContent = `[ERROR] ${t instanceof Error ? t.message : _("Request failed")}`;
                    } finally{
                        nF = !1, c.disabled = !a || !L.hasViewPermission();
                    }
                };
                c.addEventListener("click", ()=>{
                    h();
                }), s.addEventListener("keydown", (e)=>{
                    (e.ctrlKey || e.metaKey) && "Enter" === e.key && (e.preventDefault(), h());
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
                ], f = (e = {
                    class: "hl202-snippets",
                    children: [
                        o("span", {
                            style: "font-size:80%;color:#888;margin-right:2px",
                            children: [
                                _("Quick diagnostic commands"),
                                ":"
                            ]
                        }),
                        m.map((e)=>o("button", {
                                type: "button",
                                class: "hl202-snippet-tag",
                                onclick: ()=>{
                                    s.value = e.cmd, s.focus();
                                },
                                children: e.label
                            }))
                    ]
                }, o("div", e));
                return {
                    element: (r = {
                        class: "cbi-section hl202-panel-console",
                        children: [
                            o("h3", {
                                style: "margin-bottom:4px",
                                children: _("Raw command console")
                            }),
                            o("p", {
                                style: "font-size:85%;color:#888;margin-top:0;margin-bottom:6px",
                                children: _("Shell executes on the selected ONU. Timeout does not cancel execution. Raw output can contain secrets.")
                            }),
                            i,
                            f,
                            o("div", {
                                class: "hl202-terminal",
                                style: "margin-bottom:8px",
                                children: s
                            }),
                            (n = {
                                style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:8px",
                                children: [
                                    (t = {
                                        htmlFor: "hl202-timeout",
                                        style: "display:flex;align-items:center;gap:6px;font-size:90%",
                                        children: [
                                            o("span", {
                                                children: [
                                                    _("Timeout in seconds"),
                                                    ":"
                                                ]
                                            }),
                                            l
                                        ]
                                    }, o("label", t)),
                                    o("span", {
                                        style: "font-size:82%;color:#888",
                                        children: _("(Shortcut: %s)").replace("%s", "Ctrl + Enter")
                                    }),
                                    o("div", {
                                        style: "margin-left:auto",
                                        children: c
                                    })
                                ]
                            }, o("div", n)),
                            o("div", {
                                style: "margin-top:10px",
                                children: [
                                    d,
                                    p
                                ]
                            })
                        ]
                    }, o("div", r)),
                    setTarget (e) {
                        var t;
                        JSON.stringify(e) !== JSON.stringify(a) && (d.replaceChildren(), p.textContent = "", p.style.display = "none"), a = e, c.disabled = !e || !L.hasViewPermission(), e ? i.replaceChildren((t = {
                            children: [
                                o("span", {
                                    style: "color:#888",
                                    children: [
                                        _("Target"),
                                        ":"
                                    ]
                                }),
                                " ",
                                o("strong", {
                                    children: e.optical_sn
                                }),
                                " (ONU",
                                " ",
                                e.onu_id,
                                ") \xb7 ",
                                o("code", {
                                    children: [
                                        "gen: ",
                                        e.binding_generation
                                    ]
                                })
                            ]
                        }, o("span", t))) : i.replaceChildren(o("span", {
                            style: "color:#e74c3c",
                            children: _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
                        }));
                    }
                };
            }(), R = o("select", {
                id: "hl202-source",
                class: "cbi-input-select",
                "aria-label": _("Read-only MQTT source"),
                style: "min-width:240px"
            }), M = o("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                style: "margin-left:8px",
                children: _("Inspect source report (read-only)")
            }), q = o("div", {
                style: "margin-top:10px"
            }), A = [], Z = o("pre", {
                style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto"
            }), J = (i = {
                class: "cbi-section hl202-panel-sources",
                children: [
                    o("h3", {
                        style: "margin-bottom:4px",
                        children: _("MQTT source identity")
                    }),
                    o("p", {
                        style: "font-size:85%;color:#888;margin-top:0;margin-bottom:8px",
                        children: _("Inspect read-only MQTT source reports and diagnostics for unbound or unselected devices.")
                    }),
                    (r = {
                        style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                        children: [
                            o("label", {
                                htmlFor: "hl202-source",
                                children: [
                                    _("Read-only MQTT source"),
                                    ": ",
                                    R
                                ]
                            }),
                            M
                        ]
                    }, o("div", r)),
                    q,
                    (a = {
                        style: "margin-top:10px",
                        children: [
                            o("summary", {
                                style: "cursor:pointer;font-size:85%;color:#888;font-weight:600",
                                children: _("Raw source observations (JSON)")
                            }),
                            o("div", {
                                style: "margin-top:6px",
                                children: Z
                            })
                        ]
                    }, o("details", a))
                ]
            }, o("div", i)), D = "report", U = [
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
            ], Q = new Map(), I = (s = {
                class: "cbi-tabmenu",
                style: "margin-top:14px;margin-bottom:0",
                children: U.map((e)=>{
                    var t;
                    let n = (t = {
                        class: D === e.id ? "cbi-tab" : "cbi-tab-disabled",
                        "data-tab": e.id,
                        children: o("a", {
                            href: `#tab-${e.id}`,
                            onclick: (t)=>{
                                t.preventDefault();
                                var n = e.id;
                                for (let [e, t] of (D = n, Q))t.className = e === n ? "cbi-tab" : "cbi-tab-disabled";
                                O.element.hidden = "report" !== n, N.element.hidden = "accounts" !== n, P.element.hidden = "console" !== n, J.hidden = "sources" !== n, window.dispatchEvent(new Event("resize"));
                            },
                            children: e.label
                        })
                    }, o("li", t));
                    return Q.set(e.id, n), n;
                })
            }, o("ul", s));
            O.element.hidden = !1, N.element.hidden = !0, P.element.hidden = !0, J.hidden = !0;
            let F = o("div", {
                id: "hl202-panels-container",
                children: [
                    O.element,
                    N.element,
                    P.element,
                    J
                ]
            }), V = [], W = "", H = "", K = ()=>{
                let e = v.value, t = V.find((t)=>t.optical_sn === e);
                if (!t) {
                    k.textContent = _("No HL202 optical devices were found."), z.textContent = "\u2014", j.textContent = "\u2014", C.textContent = "\u2014", S.textContent = "\u2014", T.hidden = !0, O.setTarget(null), N.setTarget(null), P.setTarget(null);
                    return;
                }
                if (k.textContent = `${t.optical_sn} (ONU ${t.onu_id})`, z.textContent = t.model || "HL202", t.optical_online ? (j.className = "hl202-badge hl202-badge-success", j.textContent = _("Optical online")) : (j.className = "hl202-badge hl202-badge-danger", j.textContent = _("Optical offline")), t.can_execute && t.mqtt) {
                    C.className = "hl202-badge hl202-badge-success", C.textContent = _("MQTT ready"), S.textContent = `gen: ${t.mqtt.binding_generation}`, S.hidden = !1, T.hidden = !0;
                    let e = {
                        optical_sn: t.optical_sn,
                        onu_id: t.onu_id,
                        binding_generation: t.mqtt.binding_generation
                    };
                    O.setTarget(e), N.setTarget(e), P.setTarget(e);
                } else C.className = "hl202-badge hl202-badge-warning", C.textContent = _("MQTT unavailable"), S.hidden = !0, T.hidden = !1, O.setTarget(null), N.setTarget(null), P.setTarget(null);
            }, B = async ()=>{
                w.disabled = !0, x.textContent = _("Loading devices\u2026");
                try {
                    let t = await nJ(), n = t.devices;
                    V = n;
                    let r = n.map((e)=>`${e.optical_sn}:${e.onu_id}:${e.optical_online}:${e.can_execute}:${e.report_revision}:${e.mqtt?.binding_generation}`).join("|");
                    if (r !== W) {
                        W = r;
                        let e = v.value;
                        v.replaceChildren(...n.map((e)=>{
                            var t;
                            return t = {
                                value: e.optical_sn,
                                children: nL(`${e.model} / ${e.optical_sn} / ONU ${e.onu_id} \u{2014} ${e.can_execute ? _("MQTT ready") : _("MQTT unavailable")}; ${e.optical_online ? _("Optical online") : _("Optical offline")}`)
                            }, o("option", t);
                        })), n.some((t)=>t.optical_sn === e) && (v.value = e);
                    }
                    x.textContent = n.length ? _("Select a device to inspect reports and run operations.") : _("No HL202 optical devices were found."), Z.textContent = JSON.stringify(t.sources, null, 2);
                    let a = R.value, i = [];
                    for (let n of (R.replaceChildren(), t.sources)){
                        var e;
                        i.push({
                            mqtt_mac: n.mqtt_mac,
                            binding_generation: n.binding_generation
                        }), R.append((e = {
                            value: n.mqtt_mac,
                            children: nL(`${n.mqtt_mac} \u{2014} ${String(n.reason)}`)
                        }, o("option", e)));
                    }
                    A = i, i.some((e)=>e.mqtt_mac === a) && (R.value = a), M.disabled = 0 === i.length, K();
                    let s = n.find((e)=>e.optical_sn === v.value);
                    s?.can_execute && null !== s.report_revision && `${s.optical_sn}:${s.mqtt?.binding_generation}:${s.report_revision}` !== H && !nF && (H = `${s.optical_sn}:${s.mqtt?.binding_generation}:${s.report_revision}`, O.refresh());
                } catch (e) {
                    V = [], K(), x.textContent = e instanceof Error ? e.message : _("Request failed");
                } finally{
                    w.disabled = !1;
                }
            };
            v.addEventListener("change", K), M.addEventListener("click", ()=>{
                let e = A.find((e)=>e.mqtt_mac === R.value);
                if (q.replaceChildren(), e) {
                    let t = nV();
                    t.setTarget(e), q.append(t.element), t.refresh(e);
                }
            }), w.addEventListener("click", ()=>{
                B();
            }), B();
            let X = (p = {
                class: "cbi-map hl202-management",
                children: [
                    o("style", {
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
                    o("h2", {
                        children: _("HL202 sub-gateway management")
                    }),
                    (d = {
                        class: "cbi-section",
                        children: [
                            (c = {
                                style: "display:flex;align-items:center;flex-wrap:wrap;gap:10px",
                                children: [
                                    (l = {
                                        htmlFor: "hl202-device",
                                        style: "display:flex;align-items:center;gap:8px",
                                        children: [
                                            o("strong", {
                                                children: [
                                                    _("HL202 device"),
                                                    ":"
                                                ]
                                            }),
                                            v
                                        ]
                                    }, o("label", l)),
                                    w
                                ]
                            }, o("div", c)),
                            x,
                            $
                        ]
                    }, o("div", d)),
                    I,
                    F
                ]
            }, o("div", p)), G = async ()=>{
                X.isConnected && (await B(), X.isConnected && window.setTimeout(()=>void G(), 5000));
            };
            return window.setTimeout(()=>void G(), 5000), X;
        },
        handleSave: null,
        handleSaveApply: null,
        handleReset: null
    }
]);

return main;