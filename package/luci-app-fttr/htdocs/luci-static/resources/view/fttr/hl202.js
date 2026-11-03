'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, n, r, i, a;
const s = Symbol.for("jsx.fragment");
function o(e, t) {
    let { children: n, ...r } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, i = function e(t) {
        let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let r of t)null != r && "boolean" != typeof r && (Array.isArray(r) ? e(r, n) : n.push(r instanceof Node ? r : String(r)));
        return n;
    }(null == n ? [] : Array.isArray(n) ? n : [
        n
    ]);
    if (e === s) {
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
    let a = {}, o = {
        ...r
    };
    for (let [e, t] of Object.entries(o))e.startsWith("on") && "function" == typeof t ? (a[e] = t, delete o[e]) : "boolean" == typeof t && (t ? o[e] = e : delete o[e]);
    let l = Object.keys(o).length > 0 ? i.length > 1 ? E(e, o, i) : E(e, o, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
    for (let [e, t] of Object.entries(a)){
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
        let i = s.prototype, a = Object.keys(i);
        for(let e = 0; e < a.length; e++){
            let t = a[e];
            t in n || (n[t] = i[t].bind(n));
        }
    }
    let i = n?.Parent ?? Object;
    class a extends i {
    }
    function s(e) {
        var t;
        let i = n?.Parent ? new a() : this;
        for (let n of (r(i, e), (t = i._zod).deferred ?? (t.deferred = []), i._zod.deferred))n();
        return i;
    }
    return Object.defineProperty(a, "name", {
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
function h(e) {
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const g = Symbol("evaluating");
function m(e, t, n) {
    let r;
    Object.defineProperty(e, t, {
        get () {
            if (r !== g) return void 0 === r && (r = g, r = n()), r;
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
}), T = (n = S, (e, t, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise) throw new c();
    if (s.issues.length) {
        let e = new (i?.Err ?? n)(s.issues.map((e)=>z(e, a, p())));
        throw f(e, i?.callee), e;
    }
    return s.value;
}), $ = (r = S, async (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (i?.Err ?? r)(s.issues.map((e)=>z(e, a, p())));
        throw f(e, i?.callee), e;
    }
    return s.value;
}), O = (i = S, (e, t, n)=>{
    let r = n ? {
        ...n,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, r);
    if (a instanceof Promise) throw new c();
    return a.issues.length ? {
        success: !1,
        error: new (i ?? C)(a.issues.map((e)=>z(e, r, p())))
    } : {
        success: !0,
        data: a.value
    };
}), N = (a = S, async (e, t, n)=>{
    let r = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, i = e._zod.run({
        value: t,
        issues: []
    }, r);
    return i instanceof Promise && (i = await i), i.issues.length ? {
        success: !1,
        error: new a(i.issues.map((e)=>z(e, r, p())))
    } : {
        success: !0,
        data: i.value
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
            let r, i = w(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, s = a._zod.check(e);
                if (s instanceof Promise && n?.async === !1) throw new c();
                if (r || s instanceof Promise) r = (r ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (i || (i = w(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = w(e, t));
                }
            }
            return r ? r.then(()=>e) : e;
        }, n = (n, i, a)=>{
            if (w(n)) return n.aborted = !0, n;
            let s = t(i, r, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new c();
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
                return t instanceof Promise ? t.then((e)=>n(e, i, a)) : n(t, i, a);
            }
            let s = e._zod.parse(i, a);
            if (s instanceof Promise) {
                if (!1 === a.async) throw new c();
                return s.then((e)=>t(e, r, a));
            }
            return t(s, r, a);
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
        let i = n.value;
        if ("number" == typeof i && !Number.isNaN(i) && Number.isFinite(i)) return n;
        let a = "number" == typeof i ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : "Infinity" : void 0;
        return n.issues.push({
            expected: "number",
            code: "invalid_type",
            input: i,
            inst: e,
            ...a ? {
                received: a
            } : {}
        }), n;
    };
}), D = l("$ZodBoolean", (e, t)=>{
    A.init(e, t), e._zod.pattern = R, e._zod.parse = (n, r)=>{
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
        let i = n.value;
        if (!Array.isArray(i)) return n.issues.push({
            expected: "array",
            code: "invalid_type",
            input: i,
            inst: e
        }), n;
        n.value = Array(i.length);
        let a = [];
        for(let e = 0; e < i.length; e++){
            let s = i[e], o = t.element._zod.run({
                value: s,
                issues: []
            }, r);
            o instanceof Promise ? a.push(o.then((t)=>I(t, n, e))) : I(o, n, e);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
});
function V(e, t, n, r, i) {
    if (e.issues.length) {
        if (i && !(n in r)) return;
        t.issues.push(...x(n, e.issues));
    }
    void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const W = l("$ZodObject", (e, t)=>{
    var n;
    let r;
    A.init(e, t);
    let i = Object.getOwnPropertyDescriptor(t, "shape");
    if (!i?.get) {
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
    let a = (n = ()=>(function(e) {
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
        r ?? (r = a.value);
        let i = t.value;
        if (!b(i)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: i,
            inst: e
        }), t;
        t.value = {};
        let o = [], l = r.shape;
        for (let e of r.keys){
            let r = l[e], a = "optional" === r._zod.optout, s = r._zod.run({
                value: i[e],
                issues: []
            }, n);
            s instanceof Promise ? o.push(s.then((n)=>V(n, t, e, i, a))) : V(s, t, e, i, a);
        }
        return s ? function(e, t, n, r, i, a) {
            let s = [], o = i.keySet, l = i.catchall._zod, c = l.def.type, d = "optional" === l.optout;
            for(let i in t){
                if (o.has(i)) continue;
                if ("never" === c) {
                    s.push(i);
                    continue;
                }
                let a = l.run({
                    value: t[i],
                    issues: []
                }, r);
                a instanceof Promise ? e.push(a.then((e)=>V(e, n, i, t, d))) : V(a, n, i, t, d);
            }
            return (s.length && n.issues.push({
                code: "unrecognized_keys",
                keys: s,
                input: t,
                inst: a
            }), e.length) ? Promise.all(e).then(()=>n) : n;
        }(o, i, t, n, a.value, e) : o.length ? Promise.all(o).then(()=>t) : t;
    };
});
function H(e, t, n, r) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let i = e.filter((e)=>!w(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
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
            return RegExp(`^(${e.map((e)=>h(e.source)).join("|")})$`);
        }
    });
    let n = 1 === t.options.length, r = t.options[0]._zod.run;
    e._zod.parse = (i, a)=>{
        if (n) return r(i, a);
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
        return s ? Promise.all(o).then((t)=>H(t, i, e, a)) : H(o, i, e, a);
    };
}), B = l("$ZodRecord", (e, t)=>{
    A.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!function(e) {
            if (!1 === b(e)) return !1;
            let t = e.constructor;
            if (void 0 === t || "function" != typeof t) return !0;
            let n = t.prototype;
            return !1 !== b(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
        }(i)) return n.issues.push({
            expected: "record",
            code: "invalid_type",
            input: i,
            inst: e
        }), n;
        let a = [], s = t.keyType._zod.values;
        if (s) {
            let o;
            n.value = {};
            let l = new Set();
            for (let e of s)if ("string" == typeof e || "number" == typeof e || "symbol" == typeof e) {
                l.add("number" == typeof e ? e.toString() : e);
                let s = t.valueType._zod.run({
                    value: i[e],
                    issues: []
                }, r);
                s instanceof Promise ? a.push(s.then((t)=>{
                    t.issues.length && n.issues.push(...x(e, t.issues)), n.value[e] = t.value;
                })) : (s.issues.length && n.issues.push(...x(e, s.issues)), n.value[e] = s.value);
            }
            for(let e in i)l.has(e) || (o = o ?? []).push(e);
            o && o.length > 0 && n.issues.push({
                code: "unrecognized_keys",
                input: i,
                inst: e,
                keys: o
            });
        } else for (let s of (n.value = {}, Reflect.ownKeys(i))){
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
                "loose" === t.mode ? n.value[s] = i[s] : n.issues.push({
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
                value: i[s],
                issues: []
            }, r);
            l instanceof Promise ? a.push(l.then((e)=>{
                e.issues.length && n.issues.push(...x(s, e.issues)), n.value[o.value] = e.value;
            })) : (l.issues.length && n.issues.push(...x(s, l.issues)), n.value[o.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
}), X = l("$ZodLiteral", (e, t)=>{
    if (A.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? y(e) : e ? y(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i)=>{
        let a = r.value;
        return n.has(a) || r.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
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
        return e ? RegExp(`^(${h(e.source)})?$`) : void 0;
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
function ei(e) {
    return new er({
        type: "number",
        checks: [],
        ...v(e)
    });
}
const ea = l("ZodMiniBoolean", (e, t)=>{
    D.init(e, t), ee.init(e, t);
});
function es(e) {
    return new ea({
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
const eh = l("ZodMiniUnion", (e, t)=>{
    K.init(e, t), ee.init(e, t);
});
function eg(e, t) {
    return new eh({
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
const ex = eg([
    ey("account_set_password"),
    ey("account_set_active")
]), ek = eg([
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
    listen: eg([
        en(),
        el()
    ]),
    path: eg([
        en(),
        el()
    ]),
    error: eg([
        en(),
        el()
    ])
}), ej = e_({
    vlan: ei(),
    vlans: ep(ei()),
    priority: ei(),
    acs_url: en()
}), eC = e_({
    state: ek,
    optical_sn: en(),
    cwmp_id: en(),
    mqtt_target: eg([
        en(),
        el()
    ]),
    binding_source: en(),
    method: en(),
    desired_version: en(),
    generation: ei(),
    reason: en(),
    attempts: ei(),
    next_retry_at: ei(),
    updated_at: ei(),
    settings_verified_at: eg([
        ei(),
        el()
    ]),
    selected_vlan: eg([
        ei(),
        el()
    ]),
    last_inform: eg([
        ei(),
        el()
    ]),
    expected_acs_url: en(),
    last_error: eg([
        en(),
        el()
    ]),
    transport_epoch: ei(),
    completed_authorization: ei(),
    connection_request_enabled: eg([
        es(),
        el()
    ]),
    inflight: es(),
    persistence_error: eg([
        en(),
        el()
    ]),
    link_identity_error: eg([
        en(),
        el()
    ]),
    listener: ez,
    mqtt_last_seen: eg([
        ei(),
        el()
    ]),
    desired: ew(ej),
    endpoint_notice: ew(en()),
    manual_steps: ew(ep(en()))
}), eS = eg([
    ey("pending"),
    ey("unavailable")
]), eT = eg([
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
    phase: eg([
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
    generation: ei(),
    error: eg([
        en(),
        el()
    ])
});
e_({
    success: es(),
    output: ew(en()),
    error: ew(en())
});
const eN = eg([
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
    size: ei(),
    sha256: en(),
    data: en()
}), eM = e_({
    source: eN,
    active_path: en(),
    size: ei(),
    sha256: en(),
    data: en(),
    factory: eP,
    firmware: eR
}), eL = e_({
    error: en()
});
eg([
    eM,
    eL
]);
const eq = e_({
    success: es(),
    path: en(),
    size: ei(),
    sha256: en()
});
eg([
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
    "device-zte": es()
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
}), eU = eg([
    e_({
        valid: ey(!0),
        revision: en(),
        devices: ei()
    }),
    e_({
        error: en()
    })
]), eQ = eg([
    ey("auto"),
    ey("manual")
]), eI = ey("diff"), eF = e_({
    state: en(),
    enabled: es(),
    reason: ew(eg([
        en(),
        el()
    ])),
    revision: ew(en()),
    vlan: ew(ei()),
    updated_at: ew(ei())
}), eV = eg([
    ey("online"),
    ey("waiting_inform"),
    ey("offline_or_stale"),
    ey("waiting_transport")
]), eW = e_({
    cwmp_id: en(),
    state: eV,
    optical_online: es(),
    last_inform: eg([
        ei(),
        el()
    ]),
    age_seconds: eg([
        ei(),
        el()
    ])
}), eH = eg([
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
]), eK = eg([
    ey("device_service"),
    ey("ssid"),
    ey("port_binding"),
    ey("wan_activation")
]), eB = e_({
    name: en(),
    desired: en()
}), eX = e_({
    id: en(),
    name: ew(eg([
        en(),
        el()
    ])),
    kind: eK,
    service_type: en(),
    state: en(),
    reason: ew(en()),
    revision: ew(en()),
    current_revision: ew(es()),
    management_fresh: ew(es()),
    operation_id: ew(ei()),
    task_id: ew(eg([
        ei(),
        el()
    ])),
    updated_at: ew(ei()),
    changes: ew(ep(eB))
}), eG = eg([
    ey("plan"),
    ey("apply")
]), eY = e_({
    wan: en(),
    wlan: en(),
    binding: en()
}), e0 = e_({
    state: en(),
    requested: en(),
    contract: eg([
        en(),
        el()
    ]),
    reason: en(),
    cache_hit: es(),
    schema: en(),
    capabilities: eg([
        eY,
        el()
    ])
}), e2 = e_({
    parent: ei(),
    connection: ei(),
    state: en(),
    service_list: en(),
    kind: en(),
    baseline: eg([
        ep(ei()),
        el()
    ])
}), e1 = e_({
    state: en(),
    reason: ew(en()),
    task_id: ew(eg([
        ei(),
        el()
    ])),
    instance: ew(ei()),
    cwmp_id: ew(en())
}), e8 = eg([
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
]), e4 = e_({
    owned: ep(ei()),
    pending: eg([
        en(),
        el()
    ]),
    pending_instance: eg([
        ei(),
        el()
    ])
}), e5 = eg([
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
]), e3 = eg([
    ey("disable"),
    ey("preserve"),
    ey("delete")
]), e6 = e_({
    parent: ei(),
    child: ei(),
    service: en(),
    vlan: en()
}), e7 = e_({
    state: eH,
    items: ep(eX),
    backend: ew(eE),
    operation_id: ew(ei()),
    device: ew(en()),
    optical_sn: ew(en()),
    cwmp_id: ew(en()),
    revision: ew(en()),
    mode: ew(eG),
    started_at: ew(ei()),
    completed_at: ew(eg([
        ei(),
        el()
    ])),
    current_revision: ew(es()),
    management_fresh: ew(es()),
    reason: ew(en()),
    error: ew(en()),
    attempts: ew(ei()),
    next_retry_at: ew(ei()),
    reconcile_reason: ew(en()),
    cwmp_contract: ew(e0),
    wan_objects: ew(ef(en(), e2)),
    wan_lifecycle: ew(ef(en(), e1)),
    wan_stage: ew(e8),
    wifi_objects: ew(e4),
    wifi_lifecycle: ew(ef(en(), e1)),
    wifi_stage: ew(e5),
    wifi_cleanup: ew(e3),
    native_ownership: ew(ef(en(), e6)),
    write_performed: ew(es()),
    readback_verified: ew(es())
}), e9 = eg([
    ey("not_configured"),
    ey("stale_revision"),
    ey("stale_management"),
    ey("verified"),
    ey("attention_required"),
    ey("accepted_unverified"),
    ey("pending"),
    ey("recovering"),
    ey("waiting_management")
]), te = e_({
    device: en(),
    name: eg([
        en(),
        el()
    ]),
    group: eg([
        en(),
        el()
    ]),
    group_name: eg([
        en(),
        el()
    ]),
    template: eg([
        en(),
        el()
    ]),
    template_name: eg([
        en(),
        el()
    ]),
    optical_sn: en(),
    adapter: en(),
    omci_management: eF,
    management: eg([
        eW,
        el()
    ]),
    acs_bootstrap: eT,
    provisioning: e7,
    services: ep(eX),
    ssids: ep(eX),
    wifi_sync: e9
}), tt = eg([
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
]), tn = e_({
    enabled: es(),
    mode: eQ,
    vlan: ep(ei()),
    priority: ei(),
    address: en(),
    acs_url: en(),
    port: ei(),
    path: en(),
    dhcp_enabled: es()
}), tr = e_({
    operation: en(),
    key: en(),
    value: ep(en())
}), ti = e_({
    state: tt,
    error: eg([
        en(),
        el()
    ]),
    inflight: es(),
    ready: es(),
    desired_version: eg([
        en(),
        el()
    ]),
    applied_version: eg([
        en(),
        el()
    ]),
    next_retry_at: ei(),
    attempts: ei(),
    desired: eg([
        tn,
        el()
    ]),
    applied: eg([
        tn,
        el()
    ]),
    previous: eg([
        tn,
        el()
    ]),
    plan: ep(tr)
}), ta = e_({
    desired: eg([
        ej,
        el()
    ]),
    state: en()
}), ts = e_({
    id: en(),
    name: eg([
        en(),
        el()
    ]),
    template: en()
}), to = e_({
    enabled: es(),
    mode: eQ,
    method: eI,
    revision: en(),
    triggers: ep(en()),
    interval_minutes: ei(),
    error: eg([
        en(),
        el()
    ]),
    devices: ep(te),
    management_network: ti,
    omci_management: ta,
    groups: ep(ts),
    pending_devices: ep(en()),
    onu_pins: ew(ef(en(), ei())),
    config_error: ew(eg([
        en(),
        el()
    ]))
});
eg([
    to,
    eL
]);
const tl = e_({
    enabled: eg([
        es(),
        el()
    ]),
    routed_enabled: eg([
        es(),
        el()
    ]),
    bridge_enabled: eg([
        es(),
        el()
    ]),
    engine_attached: eg([
        es(),
        el()
    ]),
    forwarding_verified: eg([
        es(),
        el()
    ])
}), tc = e_({
    entity_id: ei(),
    port_id: eg([
        ei(),
        el()
    ])
}), td = e_({
    entity_id: ei(),
    filter_list_hex: eg([
        en(),
        el()
    ]),
    forward_operation: eg([
        ei(),
        el()
    ]),
    number_of_entries: eg([
        ei(),
        el()
    ])
}), tp = e_({
    entity_id: ei(),
    received_frame_rules_hex: eg([
        ep(en()),
        el()
    ]),
    error: eg([
        en(),
        el()
    ])
}), tu = e_({
    age_seconds: ei(),
    gem_ports: ep(tc),
    vlan_filters: ep(td),
    vlan_operations: ep(tp)
}), t_ = e_({
    source: en(),
    unit: en(),
    reason: eg([
        en(),
        el()
    ]),
    raw: eg([
        en(),
        el()
    ]),
    age_seconds: eg([
        ei(),
        el()
    ])
}), th = e_({
    interface: en(),
    gem_ports: eg([
        ep(ei()),
        el()
    ]),
    vlan_id: eg([
        ei(),
        el()
    ]),
    onu_inventory: eg([
        tu,
        el()
    ]),
    tx_bytes: eg([
        ei(),
        el()
    ]),
    rx_bytes: eg([
        ei(),
        el()
    ]),
    current_tx_kbps: eg([
        ei(),
        el()
    ]),
    current_rx_kbps: eg([
        ei(),
        el()
    ]),
    olt_channel_gem: ew(ei()),
    forwarding_verified: ew(es()),
    offload: tl,
    measurements: ef(en(), t_)
});
e_({});
const tg = e_({
    entry: eg([
        ey(0),
        ey(1),
        ey(2)
    ]),
    username: en(),
    active: es()
}), tm = e_({
    mqtt_mac: en(),
    optical_sn: eg([
        en(),
        el()
    ]),
    onu_id: eg([
        ei(),
        el()
    ]),
    binding_generation: en(),
    last_seen: ei(),
    reason: en()
}), tf = eg([
    ey("executed"),
    ey("dispatched"),
    ey("timeout"),
    ey("error")
]), tb = e_({
    target: en(),
    status: tf,
    request_id: ew(en()),
    exit_code: ew(ei()),
    output: ew(en()),
    output_truncated: es(),
    error: ew(en())
}), ty = e_({
    target: tm,
    result: tb,
    binding_current: es()
}), tv = eg([
    ey("not_applicable"),
    ey("accepted_and_saved"),
    ey("unconfirmed")
]), tw = e_({
    code: en(),
    message: en()
}), tx = eg([
    e_({
        schema_version: ey(1),
        operation: ty,
        accounts: eg([
            ep(tg),
            el()
        ]),
        write_status: tv
    }),
    e_({
        schema_version: ei(),
        error: tw
    })
]), tk = e_({
    optical_sn: en(),
    onu_id: ei(),
    binding_generation: en()
}), tz = e_({
    mqtt_mac: en(),
    binding_generation: en()
}), tj = eg([
    tk,
    tz
]);
e_({
    target: tj
});
const tC = eg([
    e_({
        kind: ey("exec"),
        script: en(),
        timeout_seconds: ei()
    }),
    e_({
        kind: ey("accounts_read")
    }),
    e_({
        kind: ey("account_set_password"),
        entry: ei(),
        password: en()
    }),
    e_({
        kind: ey("account_set_active"),
        entry: ei(),
        active: es()
    })
]), tS = e_({
    schema_version: ei(),
    target: tk,
    action: tC
}), tT = e_({
    optical_sn: en(),
    onu_id: ei(),
    model: en(),
    optical_online: es(),
    can_execute: es(),
    mqtt: eg([
        tm,
        el()
    ]),
    report_revision: eg([
        ei(),
        el()
    ])
}), t$ = eg([
    e_({
        schema_version: ey(1),
        operation: ty
    }),
    e_({
        schema_version: ei(),
        error: tw
    })
]);
e_({
    target: tj,
    script: en(),
    timeout_seconds: ei()
});
const tE = eg([
    e_({
        schema_version: ey(1),
        devices: ep(tT),
        sources: ep(tm)
    }),
    e_({
        schema_version: ei(),
        error: tw
    })
]);
eg([
    e_({
        method: ey("list")
    }),
    e_({
        method: ey("report"),
        target: tk
    }),
    e_({
        method: ey("source_report"),
        target: tz
    }),
    e_({
        method: ey("run"),
        request: tS
    })
]);
const tO = eg([
    ey("received"),
    ey("report_unavailable")
]), tN = e_({
    value: new ec({
        type: "unknown"
    }),
    member: en(),
    unit: eg([
        en(),
        el()
    ])
}), tP = e_({
    name: en(),
    bytes: ei(),
    encoding: en(),
    text: eg([
        en(),
        el()
    ]),
    text_omitted: es()
}), tR = e_({
    schema_version: ei(),
    compressed_bytes: ei(),
    decompressed_bytes: ei(),
    fields: ef(en(), tN),
    members: ep(tP),
    errors: ep(en())
}), tM = e_({
    revision: ei(),
    last_received: ei(),
    last_processed_receipt: eg([
        ei(),
        el()
    ]),
    last_good: eg([
        ei(),
        el()
    ]),
    error: eg([
        en(),
        el()
    ]),
    report: eg([
        tR,
        el()
    ])
}), tL = eg([
    e_({
        schema_version: ey(1),
        target: tm,
        report: eg([
            tM,
            el()
        ]),
        state: tO
    }),
    e_({
        schema_version: ey(1),
        target: tm,
        report: eg([
            tM,
            el()
        ]),
        read_only: ey(!0)
    }),
    e_({
        schema_version: ei(),
        error: tw
    })
]);
e_({
    target: tj
}), e_({
    target: tj,
    kind: ex,
    entry: ei(),
    password: en(),
    active: es()
});
const tq = e_({
    accepted: ei(),
    rejected: ei(),
    read_errors: ei(),
    handled: ei(),
    max_intake_us: ei(),
    max_handler_us: ei()
}), tA = ey("pending"), tZ = e_({
    phase: eg([
        ey("starting"),
        ey("upload"),
        ey("tables")
    ]),
    received: ei(),
    expected: eg([
        ei(),
        el()
    ])
}), tJ = ey("ready"), tD = eg([
    e_({
        status: tA,
        progress: ew(tZ)
    }),
    e_({
        status: tJ,
        chunk: ei(),
        chunks: ei(),
        bytes: ei(),
        data: en()
    })
]);
eg([
    tD,
    eL
]);
const tU = e_({
    status: tA,
    job: en()
}), tQ = e_({
    released: es()
});
e_({
    job: en()
}), e_({
    job: en(),
    chunk: ei()
}), eg([
    tU,
    eL
]);
const tI = e_({
    accepting: es(),
    running: ei(),
    stored: ei(),
    bytes: ei(),
    running_limit: ei(),
    stored_limit: ei(),
    bytes_limit: ei(),
    result_bytes_limit: ei()
}), tF = e_({
    mac: en(),
    ip: en(),
    band: en(),
    rssi_dbm: eg([
        ei(),
        el()
    ]),
    rx_rate_mbps: eg([
        ei(),
        el()
    ]),
    tx_rate_mbps: eg([
        ei(),
        el()
    ])
}), tV = eg([
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
]), tW = e_({
    id: en(),
    url: en()
}), tH = e_({
    name: en(),
    kind: tV,
    index: ei(),
    mask: ei(),
    size: ei(),
    read: es(),
    write: es(),
    set_by_create: es(),
    avc: es(),
    optional: es(),
    deprecated: es(),
    default_hex: eg([
        en(),
        el()
    ]),
    reference: tW
}), tK = eg([
    e_({
        type: ey("unsigned"),
        value: ei()
    }),
    e_({
        type: ey("signed"),
        value: ei()
    }),
    e_({
        type: ey("decimal"),
        value: en()
    }),
    e_({
        type: ey("text"),
        value: eg([
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
        bytes: ei()
    })
]), tB = e_({
    raw_hex: en(),
    value: tK,
    sequences: ep(ei())
}), tX = e_({
    definition: tH,
    value: eg([
        tK,
        el()
    ]),
    observations: ep(tB)
}), tG = eg([
    ey("layout"),
    ey("name_only"),
    ey("unknown")
]), tY = e_({
    class_id: ei(),
    name: eg([
        en(),
        el()
    ]),
    entities: ei(),
    records: ei(),
    support: tG
}), t0 = e_({
    code: en(),
    message: en(),
    offset: ei(),
    mask: ei()
}), t2 = e_({
    class_id: ei(),
    entity_id: ei(),
    name: eg([
        en(),
        el()
    ]),
    support: tG,
    reference: eg([
        tW,
        el()
    ]),
    sequences: ep(ei()),
    attributes: ep(tX),
    diagnostics: ep(t0)
}), t1 = ey("ready"), t8 = e_({
    class_id: ei(),
    entity_id: ei(),
    sequence: ei(),
    attribute_mask: ei(),
    raw_hex: en(),
    consumed: ei(),
    remaining_hex: en(),
    undecoded_mask: ei()
}), t4 = e_({
    raw_hex: en(),
    filter_outer_priority: ei(),
    filter_outer_vid: ei(),
    filter_outer_tpid_dei: ei(),
    filter_inner_priority: ei(),
    filter_inner_vid: ei(),
    filter_inner_tpid_dei: ei(),
    filter_ethertype: ei(),
    tags_to_remove: ei(),
    treatment_outer_priority: ei(),
    treatment_outer_vid: ei(),
    treatment_outer_tpid_dei: ei(),
    treatment_inner_priority: ei(),
    treatment_inner_vid: ei(),
    treatment_inner_tpid_dei: ei(),
    delete_entry: es()
}), t5 = e_({
    class_id: ei(),
    entity_id: ei(),
    attribute: tH,
    collected: es(),
    error: eg([
        en(),
        el()
    ]),
    raw_hex: en(),
    rows: ep(en()),
    vlan_rules: ep(t4)
}), t3 = e_({
    schema_version: ey(1),
    reference_version: en(),
    onu_id: eg([
        ei(),
        el()
    ]),
    uploaded_complete: es(),
    expected_records: ei(),
    received_records: ei(),
    decoded_records: ei(),
    partial_records: ei(),
    basic_records: ei(),
    tables_requested: es(),
    tables_collected: es(),
    classes: ep(tY),
    entities: ep(t2),
    records: ep(t8),
    tables: ep(t5),
    diagnostics: ep(t0)
});
e_({
    status: t1,
    report: t3
}), e_({
    onu_id: ei(),
    optical_sn: en(),
    tables: es()
});
const t6 = eg([
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
    bridge: en()
});
const t7 = e_({
    index: en(),
    state: en(),
    pkt_type: en(),
    orig_tuple: en(),
    new_tuple: en(),
    eth: en(),
    vlan: en(),
    packets: ei(),
    bytes: ei(),
    counters_valid: es(),
    packets_exact: en(),
    bytes_exact: en()
}), t9 = e_({
    sampled_at_ms: ei(),
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
    bridge_offload_mask: ei(),
    routed_offload_mask: ei(),
    bridge_offload_debug: es(),
    bridge: en(),
    active_ports: ep(en()),
    fw4_hooks_ready: es(),
    total_entries: ei(),
    bound_entries: ei(),
    bound_ipv4_entries: ei(),
    bound_ipv6_entries: ei(),
    total_packets: ei(),
    total_bytes: ei(),
    bound_flows: ep(t7)
}), ne = e_({
    equipment_id: eg([
        en(),
        el()
    ]),
    hardware_version: eg([
        en(),
        el()
    ]),
    software_images: ep(en()),
    omcc_version: eg([
        ei(),
        el()
    ]),
    errors: ep(en())
}), nt = e_({
    desired: ef(en(), ei()),
    active: ef(en(), ei()),
    pending_restart: es(),
    allocation_blocked: es(),
    startup_error: eg([
        en(),
        el()
    ]),
    config_error: eg([
        en(),
        el()
    ])
}), nn = eg([
    ey("optical_on"),
    ey("optical_off"),
    ey("optical_status"),
    ey("optical_reload"),
    ey("optical_reinitialize"),
    ey("optical_shutdown")
]), nr = eg([
    ey("success"),
    ey("error")
]), ni = eg([
    ey("enabled"),
    ey("disabled"),
    ey("unknown")
]), na = e_({
    schema_version: ey(1),
    status: nr,
    action: nn,
    desired_enabled: eg([
        es(),
        el()
    ]),
    tx_enabled: eg([
        es(),
        el()
    ]),
    actor_state: ni,
    hardware_ready: es(),
    discovery_active: es(),
    cleanup_pending: es(),
    error: eg([
        tw,
        el()
    ])
});
e_({
    enabled: es()
});
const ns = e_({
    model: en(),
    wavelength_tx_nm: ei(),
    wavelength_rx_nm: ei(),
    phy_rate_downlink_gbps: ei(),
    phy_rate_uplink_gbps: ei(),
    tx_power_dbm: eg([
        ei(),
        el()
    ]),
    laser_bias_current_ma: eg([
        ei(),
        el()
    ]),
    temperature_celsius: eg([
        ei(),
        el()
    ]),
    vcc_voltage: eg([
        ei(),
        el()
    ]),
    cdr_locked: eg([
        es(),
        el()
    ]),
    tx_enabled: ew(es()),
    measurements: ef(en(), t_)
}), no = eg([
    ey("o1_initial"),
    ey("o2_standby"),
    ey("o3_serial_number"),
    ey("o4_ranging"),
    ey("o5_operation"),
    ey("o6_intermittent_lods"),
    ey("o7_emergency_stop")
]), nl = e_({
    restarting: ey(!0)
}), nc = e_({
    calls: ei(),
    failures: ei(),
    last_us: ei(),
    max_us: ei(),
    total_us: ei()
}), nd = e_({
    port: ei(),
    interface: en(),
    carrier: es(),
    status: en(),
    onu_id: ew(ei()),
    onu_sn: ew(en()),
    link_state: en(),
    reserved_sn: ew(en())
}), np = e_({
    channel_2g: eg([
        ei(),
        el()
    ]),
    channel_5g: eg([
        ei(),
        el()
    ]),
    bandwidth_5g: eg([
        en(),
        el()
    ]),
    tx_power_pct: eg([
        ei(),
        el()
    ]),
    measurements: ef(en(), t_)
}), nu = e_({
    onu_id: ei(),
    vendor: en(),
    model: en(),
    serial_number: en(),
    state: no,
    business_status: eO,
    management: eg([
        eW,
        el()
    ]),
    provisioning: eg([
        e7,
        el()
    ]),
    services: ep(eX),
    ssids: ep(eX),
    wifi_sync: e9,
    identity: eg([
        ne,
        el()
    ]),
    identity_age_seconds: eg([
        ei(),
        el()
    ]),
    identity_current: es(),
    fiber_distance_m: eg([
        ei(),
        el()
    ]),
    ranging_delay_rtd_ns: eg([
        ei(),
        el()
    ]),
    equalization_delay_bits: eg([
        ei(),
        el()
    ]),
    optical_rx_power_dbm: eg([
        ei(),
        el()
    ]),
    optical_tx_power_dbm: eg([
        ei(),
        el()
    ]),
    firmware_version: en(),
    hardware_version: en(),
    uptime_seconds: eg([
        ei(),
        el()
    ]),
    data_path: th,
    wifi_mesh: np,
    connected_clients: eg([
        ep(tF),
        el()
    ]),
    measurements: ef(en(), t_)
}), n_ = e_({
    id: en(),
    last_seen_sec_ago: ei(),
    last_payload_bytes: ei()
}), nh = e_({
    ubus: ew(ef(en(), nc)),
    jobs: ew(tI),
    onu_pinning: ew(nt),
    fpga_status: en(),
    provisioning: eg([
        to,
        el()
    ]),
    optical_transceiver: ns,
    switch_ports: ep(nd),
    sub_gateways: ep(nu),
    telemetry_gateways: ep(n_),
    npu: ew(t9),
    ipc: ew(tq)
}), ng = eg([
    ey("plan"),
    ey("apply"),
    ey("management_plan"),
    ey("management_apply"),
    ey("reset_state"),
    ey("reconcile"),
    ey("retry")
]), nm = eg([
    e_({
        operation_ids: ep(ei()),
        revision: en()
    }),
    e_({
        started: ey(!0),
        mode: eG
    }),
    e_({
        reset: ey(!0),
        device: en()
    }),
    e_({
        operation_ids: ep(ei()),
        mode: eG,
        reconcile: ew(es()),
        retry: ew(es())
    }),
    eL
]);
e_({
    action: ng,
    target: en(),
    management: ew(es()),
    item: ew(en())
});
let nf = e_({
    error: eg([
        en(),
        e_({
            code: en(),
            message: en()
        })
    ])
});
class nb extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function ny(e) {
    let t = nf.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new nb("rpc", e) : new nb(e.code, e.message);
    }
    return e;
}
function nv(e) {
    return {
        parse (t) {
            let n = e.parse(ny(t));
            if ("object" == typeof n && null !== n && "error" in n) throw ny(n), Error("Unexpected RPC error");
            return n;
        }
    };
}
const nw = nv(tE), nx = nv(tL), nk = nv(tx), nz = nv(t$), nj = {
    parse (e) {
        let t = nm.parse(ny(e));
        if ("error" in t) throw Error(t.error);
        return t;
    }
};
ef(en(), e_({
    carrier: ew(es()),
    mac: ew(en()),
    link: ew(e_({
        speed: ew(ei()),
        duplex: ew(en()),
        autoneg: ew(es())
    })),
    stats: ew(ef(en(), ei()))
}));
const nC = {
    getCapabilities: {
        parse: (e)=>eD.parse(ny(e))
    },
    opticalStatus: na,
    opticalSet: na,
    getStatus: {
        parse: (e)=>nh.parse(ny(e))
    },
    getSync: {
        parse: (e)=>to.parse(ny(e))
    },
    configCheck: {
        parse (e) {
            if ("object" == typeof e && null !== e && "error" in e && ("valid" in e || "revision" in e || "devices" in e)) throw Error("Mixed configuration check result");
            return eU.parse(e);
        }
    },
    npuStatus: t9,
    configReload: {
        parse: (e)=>to.parse(ny(e))
    },
    restartService: {
        parse: (e)=>nl.parse(ny(e))
    },
    sync: {
        parse: (e)=>nj.parse(ny(e))
    },
    npuSet: t6,
    mibStart: {
        parse: (e)=>tU.parse(ny(e))
    },
    mibResult: {
        parse: (e)=>tD.parse(ny(e))
    },
    jobRelease: {
        parse: (e)=>tQ.parse(ny(e))
    },
    hl202List: {
        parse: (e)=>nw.parse(ny(e))
    },
    hl202Report: {
        parse: (e)=>tU.parse(ny(e))
    },
    hl202AccountsStart: {
        parse: (e)=>tU.parse(ny(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>tU.parse(ny(e))
    },
    hl202ExecStart: {
        parse: (e)=>tU.parse(ny(e))
    },
    jobResult: {
        parse: (e)=>tD.parse(ny(e))
    },
    getCalibration: {
        parse: (e)=>eM.parse(ny(e))
    },
    saveCalibration: {
        parse: (e)=>eq.parse(ny(e))
    },
    applyCalibration: {
        parse: (e)=>tU.parse(ny(e))
    }
};
function nS() {
    var e;
    let n, r, i, a, s, o, l, c, d, p, u, h, g, m, f, b, y, v, w, x, k, z, j;
    return t ??= (e = L.rpc, n = e.declare({
        object: "fttr",
        method: "get_capabilities",
        reject: !0
    }), r = e.declare({
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
            "bridge"
        ],
        reject: !0
    }), h = e.declare({
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
        getCapabilities: async ()=>nC.getCapabilities.parse(await n()),
        opticalStatus: async ()=>nC.opticalStatus.parse(await r()),
        opticalSet: async (e)=>nC.opticalSet.parse(await i(e.enabled)),
        getStatus: async ()=>nC.getStatus.parse(await a()),
        getSync: async ()=>nC.getSync.parse(await s()),
        configCheck: async ()=>nC.configCheck.parse(await o()),
        npuStatus: async ()=>nC.npuStatus.parse(await l()),
        configReload: async ()=>nC.configReload.parse(await c()),
        restartService: async ()=>nC.restartService.parse(await d()),
        sync: async (e)=>nC.sync.parse(await p(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>nC.npuSet.parse(await u(e.enabled, e.bridge)),
        mibStart: async (e)=>nC.mibStart.parse(await h(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>nC.mibResult.parse(await g(e.job, e.chunk)),
        jobRelease: async (e)=>nC.jobRelease.parse(await m(e.job)),
        hl202List: async ()=>nC.hl202List.parse(await f()),
        hl202Report: async (e)=>nC.hl202Report.parse(await b(e.target)),
        hl202AccountsStart: async (e)=>nC.hl202AccountsStart.parse(await y(e.target)),
        hl202AccountUpdate: async (e)=>nC.hl202AccountUpdate.parse(await v(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>nC.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>nC.jobResult.parse(await x(e.job, e.chunk)),
        getCalibration: async ()=>nC.getCalibration.parse(await k()),
        saveCalibration: async (e)=>nC.saveCalibration.parse(await z(e.data)),
        applyCalibration: async ()=>nC.applyCalibration.parse(await j())
    });
}
const nT = async ()=>nS().getCapabilities();
async function n$(e) {
    if (!(await nT()).pages[e]) throw Error(_("This page is not supported by the installed FTTR build."));
}
_("Ready"), _("Online"), _("Success"), _("Offline"), _("Error"), _("Failed"), _("Timeout"), _("Pending"), _("Running"), _("Unavailable"), _("Disabled"), _("Enabled");
const nE = (e)=>null == e || "" === e ? "\u2014" : String(e), nO = (e)=>e ? new Date(1000 * e).toLocaleString() : "\u2014";
function nN(e, t, n) {
    return o("span", {
        class: `hl202-badge hl202-badge-${e}`,
        title: n,
        children: t
    });
}
async function nP(e) {
    let t, n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ny, r = tU.parse(ny(e)), i = Date.now() + 330000, a = window.location.pathname, s = [], o = 0;
    try {
        for(let e = 0; e < 128;){
            if (window.location.pathname !== a) throw new nb("navigation", _("Result polling stopped after leaving the page. The backend job is not cancelled."));
            if (Date.now() > i) throw new nb("timeout", _("Job polling timed out; execution outcome is unknown. Do not automatically retry."));
            let l = await nS().jobResult({
                job: r.job,
                chunk: e
            });
            if ("pending" === l.status) {
                await new Promise((e)=>window.setTimeout(e, 1000));
                continue;
            }
            if (!Number.isInteger(l.chunks) || l.chunks < 1 || l.chunks > 128 || l.chunk !== e || !Number.isInteger(l.bytes) || l.bytes < 1 || l.bytes > 4194304 || l.data.length > 43692) throw new nb("transport", _("Invalid job result"));
            if (t && (l.chunks !== t.chunks || l.bytes !== t.bytes)) throw new nb("transport", _("Inconsistent job result chunks"));
            t = {
                chunks: l.chunks,
                bytes: l.bytes
            };
            let c = Uint8Array.from(atob(l.data), (e)=>e.charCodeAt(0));
            if (c.length > 32768 || o + c.length > l.bytes) throw new nb("transport", _("Job result exceeds the transport limit"));
            if (s.push(c), o += c.length, ++e === l.chunks) {
                if (o !== l.bytes) throw new nb("transport", _("Incomplete job result"));
                let e = new Uint8Array(o), t = 0;
                for (let n of s)e.set(n, t), t += n.length;
                return n(JSON.parse(new TextDecoder("utf-8", {
                    fatal: !0
                }).decode(e)));
            }
        }
        throw new nb("transport", _("Too many result chunks"));
    } finally{
        await nS().jobRelease({
            job: r.job
        }).catch(()=>{});
    }
}
const nR = async ()=>nS().hl202List(), nM = async (e)=>nx.parse(await nP(await nS().hl202Report({
        target: e
    }))), nL = async (e)=>nk.parse(await nP(await nS().hl202AccountsStart({
        target: e
    }))), nq = async (e, t)=>nk.parse(await nP(await nS().hl202AccountUpdate({
        target: e,
        kind: "password" === t.kind ? "account_set_password" : "account_set_active",
        entry: t.entry,
        password: t.password,
        active: t.active
    }))), nA = async (e, t, n)=>nz.parse(await nP(await nS().hl202ExecStart({
        target: e,
        script: t,
        timeout_seconds: n
    })));
let nZ = !1;
function nJ() {
    var e, t;
    let n = null, r = o("div", {
        style: "margin:8px 0;display:flex;align-items:center;flex-wrap:wrap;gap:10px"
    }), i = o("div", {
        style: "overflow-x:auto;margin:8px 0"
    }), a = o("div", {
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
        if (nZ) {
            s.textContent = _("Another operation is in progress.");
            return;
        }
        nZ = !0, l.disabled = !0, s.textContent = _("Waiting for device result\u2026");
        try {
            var c, d, p, u, h, g, m, f, b, y, v, w, x, k, z, j, C, S, T, $, O, N;
            let e = await nM(t);
            if (JSON.stringify(t) !== JSON.stringify(n)) return;
            if (!e.report) {
                r.replaceChildren(), i.replaceChildren(), a.replaceChildren(), s.textContent = _("No MQTT report has been parsed yet.");
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
                    nN("info", `#${String(l.revision)}`)
                ]
            }, o("span", d)), (h = {
                children: [
                    (p = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Last received"),
                            ":"
                        ]
                    }, o("span", p)),
                    (u = {
                        children: nO("number" == typeof l.last_received ? l.last_received : void 0)
                    }, o("strong", u))
                ]
            }, o("span", h)), (f = {
                children: [
                    (g = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            _("Last good report"),
                            ":"
                        ]
                    }, o("span", g)),
                    (m = {
                        children: nO("number" == typeof l.last_good ? l.last_good : void 0)
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
                i.replaceChildren((j = {
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
                                var t, n, r, i, a, s, l;
                                let [c, d] = e, p = d.value, u = null === p ? "\u2014" : `${"object" == typeof p ? JSON.stringify(p) : String(p)}${d.unit ? ` ${d.unit}` : ""}`;
                                return "uptime_seconds" === c && "number" == typeof p && (u = function(e) {
                                    if (void 0 === e || !Number.isFinite(e) || e < 0) return "\u2014";
                                    let t = Math.floor(e / 86400), n = Math.floor(e % 86400 / 3600), r = Math.floor(e % 3600 / 60), i = [];
                                    return t > 0 && i.push(_("%d days").replace("%d", String(t))), (n > 0 || t > 0) && i.push(_("%d hours").replace("%d", String(n))), (r > 0 || n > 0 || t > 0) && i.push(_("%d minutes").replace("%d", String(r))), i.push(_("%d seconds").replace("%d", String(e % 60))), `${i.join(" ")} (${e} s)`;
                                }(p)), l = {
                                    children: [
                                        (n = {
                                            children: (t = {
                                                children: c
                                            }, o("code", t))
                                        }, o("td", n)),
                                        (i = {
                                            children: (r = {
                                                children: u
                                            }, o("strong", r))
                                        }, o("td", i)),
                                        (s = {
                                            children: (a = {
                                                class: "hl202-badge hl202-badge-neutral",
                                                children: nE(d.member)
                                            }, o("span", a))
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
                a.replaceChildren(...e.errors.map((e)=>{
                    var t;
                    return t = {
                        class: "alert-message warning",
                        children: e
                    }, o("div", t);
                }), ...n);
            } else i.replaceChildren(), a.replaceChildren();
            s.textContent = "";
        } catch (e) {
            s.textContent = e instanceof Error ? e.message : _("Request failed");
        } finally{
            nZ = !1, l.disabled = !n;
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
                i,
                a
            ]
        }, o("div", t)),
        setTarget (e) {
            JSON.stringify(e) !== JSON.stringify(n) && (r.replaceChildren(), i.replaceChildren(), a.replaceChildren(), s.textContent = ""), n = e, l.disabled = !e;
        },
        refresh: (e)=>c(e)
    };
}
let nD = L.view;
if (!("extend" in nD) || "function" != typeof nD.extend) throw Error("LuCI view extension is unavailable");
let main = Reflect.apply(nD.extend, nD, [
    {
        load: ()=>n$("hl202"),
        render: function() {
            var e, t, n, r, i, a, s, l, c, d, p, u, h;
            let g, m, f, b, y, v = o("select", {
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
            }, o("div", n)), O = nJ(), N = (g = null, m = o("div", {
                style: "font-size:88%;color:#888;margin:6px 0",
                "aria-live": "polite"
            }), f = o("div", {
                style: "margin-top:10px;display:flex;flex-direction:column;gap:10px"
            }), (b = o("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                children: _("Read users")
            })).disabled = !L.hasViewPermission(), y = async ()=>{
                if (!g) {
                    m.textContent = _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
                    return;
                }
                if (nZ) {
                    m.textContent = _("Another operation is in progress.");
                    return;
                }
                nZ = !0, b.disabled = !0, m.textContent = _("Waiting for device result\u2026");
                let e = g;
                try {
                    let h = await nL(e);
                    if (JSON.stringify(e) !== JSON.stringify(g)) return;
                    f.replaceChildren();
                    let b = h.operation, y = b.result;
                    if ("timeout" === y.status ? m.textContent = _("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.") : m.textContent = b.binding_current ? y.error ?? (null === h.accounts ? _("Account data is unavailable.") : "") : _("Device binding changed; this result is stale."), h.accounts && b.binding_current) {
                        let m = [];
                        for (let f of h.accounts){
                            var t, n, r, i, a, s, l, c, d, p, u;
                            let h = f.entry, b = f.active, y = (t = {
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
                            }, o("button", r)), x = (i = {
                                type: "button",
                                class: `cbi-button ${b ? "cbi-button-neutral" : "cbi-button-apply"}`,
                                children: b ? _("Disable") : _("Enable")
                            }, o("button", i));
                            w.disabled = x.disabled = !L.hasViewPermission();
                            let k = (a = {
                                style: "font-size:82%;margin-top:4px",
                                "aria-live": "polite"
                            }, o("div", a));
                            w.addEventListener("click", async ()=>{
                                if (!g || nZ || JSON.stringify(e) !== JSON.stringify(g)) return;
                                let t = v.value;
                                if (!t) {
                                    k.textContent = _("Enter a non-empty password.");
                                    return;
                                }
                                v.value = "", nZ = !0, w.disabled = x.disabled = !0, k.textContent = _("Waiting for device result\u2026");
                                try {
                                    let n = await nq(e, {
                                        entry: h,
                                        kind: "password",
                                        password: t,
                                        active: b
                                    });
                                    if (JSON.stringify(e) !== JSON.stringify(g)) return;
                                    let r = n.operation, i = r.result;
                                    r.binding_current && "accepted_and_saved" === n.write_status ? k.textContent = _("Password accepted and saved; web login permission is not verified.") : k.textContent = i.error ?? _("Execution outcome is unknown. Do not automatically retry.");
                                } catch (e) {
                                    k.textContent = e instanceof Error ? e.message : _("Request failed");
                                } finally{
                                    nZ = !1, w.disabled = x.disabled = !L.hasViewPermission();
                                }
                            }), x.addEventListener("click", async ()=>{
                                if (g && !nZ && JSON.stringify(e) === JSON.stringify(g)) {
                                    nZ = !0, w.disabled = x.disabled = !0, k.textContent = _("Waiting for device result\u2026");
                                    try {
                                        let t = !b, n = await nq(e, {
                                            entry: h,
                                            kind: "active",
                                            password: "",
                                            active: t
                                        });
                                        if (JSON.stringify(e) !== JSON.stringify(g)) return;
                                        let r = n.accounts?.find((e)=>e.entry === h);
                                        if (!n.operation.binding_current || "accepted_and_saved" !== n.write_status || !r) {
                                            k.textContent = n.operation.result.error ?? _("Execution outcome is unknown. Refresh users before retrying.");
                                            return;
                                        }
                                        b = r.active, y.className = `hl202-badge ${b ? "hl202-badge-success" : "hl202-badge-neutral"}`, y.textContent = b ? _("Enabled") : _("Disabled"), x.className = `cbi-button ${b ? "cbi-button-neutral" : "cbi-button-apply"}`, x.textContent = b ? _("Disable") : _("Enable"), k.textContent = `${String(n.write_status)}; ${_("Refresh users to read the current state.")}`;
                                    } catch (e) {
                                        k.textContent = e instanceof Error ? e.message : _("Request failed");
                                    } finally{
                                        nZ = !1, w.disabled = x.disabled = !L.hasViewPermission();
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
                                                        children: _("(Entry %s)").replace("%s", String(h))
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
                    nZ = !1, b.disabled = !g || !L.hasViewPermission();
                }
            }, b.addEventListener("click", ()=>{
                y();
            }), {
                element: (h = {
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
                }, o("div", h)),
                setTarget (e) {
                    JSON.stringify(e) !== JSON.stringify(g) && (f.replaceChildren(), m.textContent = ""), g = e, b.disabled = !e || !L.hasViewPermission();
                },
                refresh: ()=>y()
            }), P = function() {
                var e, t, n, r;
                let i = null, a = o("div", {
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
                }), h = o("button", {
                    type: "button",
                    class: "fttr-btn-subtle",
                    onclick: ()=>{
                        p.textContent = "", p.style.display = "none", d.replaceChildren();
                    },
                    children: _("Clear output")
                }), g = async ()=>{
                    var e, t, n, r, a, g, m, f, b, y, v;
                    if (!i) return void d.replaceChildren(o("div", {
                        class: "alert-message warning",
                        children: _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
                    }));
                    if (nZ) return void d.replaceChildren(o("div", {
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
                    nZ = !0, c.disabled = !0, p.style.display = "block", p.textContent = `# [${new Date().toLocaleTimeString()}] ${_("Dispatching to %s (timeout: %s s)...").format(i.optical_sn, String(w))}\n`, d.replaceChildren(nN("info", _("Waiting for device result\u2026")));
                    let k = Date.now(), z = i;
                    try {
                        let l = await nA(z, s.value, w);
                        if (JSON.stringify(z) !== JSON.stringify(i)) return;
                        let c = ((Date.now() - k) / 1000).toFixed(2), v = l.operation, x = v.result, j = x.status, C = x.exit_code, S = v.binding_current && !x.error && "executed" === j && 0 === C, T = nN(S ? "success" : "timeout" === j ? "warning" : "danger", S ? _("Success") : "timeout" === j ? _("Timeout") : `${_("Exit code")} ${String(C ?? j)}`);
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
                        }, o("span", n)), (g = {
                            children: [
                                (r = {
                                    style: "color:#888",
                                    children: [
                                        _("Duration"),
                                        ":"
                                    ]
                                }, o("span", r)),
                                " ",
                                (a = {
                                    children: [
                                        c,
                                        " s"
                                    ]
                                }, o("strong", a))
                            ]
                        }, o("span", g)), (b = {
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
                                h
                            ]
                        }, o("div", y)));
                        let $ = [];
                        v.binding_current || $.push(_("Device binding changed; this result is stale.")), ("timeout" === j || "dispatched" === j) && $.push(_("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.")), "string" == typeof x.output && x.output.length && $.push(x.output), "string" == typeof x.error && x.error.length && $.push(`[STDERR]\n${x.error}`), !0 === x.output_truncated && $.push(`\n[!] ${_("Output was truncated at the byte limit.")}`), 0 === $.length && $.push(_("No output returned.")), p.textContent = $.join("\n");
                    } catch (t) {
                        let e = ((Date.now() - k) / 1000).toFixed(2);
                        d.replaceChildren(nN("danger", _("Failed")), (v = {
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
                                h
                            ]
                        })), p.textContent = `[ERROR] ${t instanceof Error ? t.message : _("Request failed")}`;
                    } finally{
                        nZ = !1, c.disabled = !i || !L.hasViewPermission();
                    }
                };
                c.addEventListener("click", ()=>{
                    g();
                }), s.addEventListener("keydown", (e)=>{
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
                            a,
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
                        JSON.stringify(e) !== JSON.stringify(i) && (d.replaceChildren(), p.textContent = "", p.style.display = "none"), i = e, c.disabled = !e || !L.hasViewPermission(), e ? a.replaceChildren((t = {
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
                        }, o("span", t))) : a.replaceChildren(o("span", {
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
            }), J = (a = {
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
                    (i = {
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
                    }, o("details", i))
                ]
            }, o("div", a)), D = "report", U = [
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
                    let t = await nR(), n = t.devices;
                    V = n;
                    let r = n.map((e)=>`${e.optical_sn}:${e.onu_id}:${e.optical_online}:${e.can_execute}:${e.report_revision}:${e.mqtt?.binding_generation}`).join("|");
                    if (r !== W) {
                        W = r;
                        let e = v.value;
                        v.replaceChildren(...n.map((e)=>{
                            var t;
                            return t = {
                                value: e.optical_sn,
                                children: nE(`${e.model} / ${e.optical_sn} / ONU ${e.onu_id} \u{2014} ${e.can_execute ? _("MQTT ready") : _("MQTT unavailable")}; ${e.optical_online ? _("Optical online") : _("Optical offline")}`)
                            }, o("option", t);
                        })), n.some((t)=>t.optical_sn === e) && (v.value = e);
                    }
                    x.textContent = n.length ? _("Select a device to inspect reports and run operations.") : _("No HL202 optical devices were found."), Z.textContent = JSON.stringify(t.sources, null, 2);
                    let i = R.value, a = [];
                    for (let n of (R.replaceChildren(), t.sources)){
                        var e;
                        a.push({
                            mqtt_mac: n.mqtt_mac,
                            binding_generation: n.binding_generation
                        }), R.append((e = {
                            value: n.mqtt_mac,
                            children: nE(`${n.mqtt_mac} \u{2014} ${String(n.reason)}`)
                        }, o("option", e)));
                    }
                    A = a, a.some((e)=>e.mqtt_mac === i) && (R.value = i), M.disabled = 0 === a.length, K();
                    let s = n.find((e)=>e.optical_sn === v.value);
                    s?.can_execute && null !== s.report_revision && `${s.optical_sn}:${s.mqtt?.binding_generation}:${s.report_revision}` !== H && !nZ && (H = `${s.optical_sn}:${s.mqtt?.binding_generation}:${s.report_revision}`, O.refresh());
                } catch (e) {
                    V = [], K(), x.textContent = e instanceof Error ? e.message : _("Request failed");
                } finally{
                    w.disabled = !1;
                }
            };
            v.addEventListener("change", K), M.addEventListener("click", ()=>{
                let e = A.find((e)=>e.mqtt_mac === R.value);
                if (q.replaceChildren(), e) {
                    let t = nJ();
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