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
    let d = Object.keys(o).length > 0 ? a.length > 1 ? E(e, o, a) : E(e, o, a[0]) : a.length > 1 ? E(e, {}, a) : E(e, {}, a[0]);
    for (let [e, t] of Object.entries(i)){
        let r = e.slice(2).toLowerCase();
        d.addEventListener(r, t);
    }
    return d;
}
function d(e, t, r) {
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
class l extends Error {
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
    let t = +!!e.startsWith("^"), r = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, r);
}
const h = Symbol("evaluating");
function g(e, t, r) {
    let n;
    Object.defineProperty(e, t, {
        get () {
            if (n !== h) return void 0 === n && (n = h, n = r()), n;
        },
        set (r) {
            Object.defineProperty(e, t, {
                value: r
            });
        },
        configurable: !0
    });
}
const m = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function b(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function v(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function y(e) {
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
    for(let r = t; r < e.issues.length; r++)if (e.issues[r]?.continue !== !0) return !0;
    return !1;
}
function k(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function z(e) {
    return "string" == typeof e ? e : e?.message;
}
function x(e, t, r) {
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = z(e.inst?._zod.def?.error?.(e)) ?? z(t?.error?.(e)) ?? z(r.customError?.(e)) ?? z(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
}
const j = (e, t)=>{
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
}, S = d("$ZodError", j), P = d("$ZodError", j, {
    Parent: Error
}), N = (r = P, (e, t, n, a)=>{
    let i = n ? Object.assign(n, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (s instanceof Promise) throw new l();
    if (s.issues.length) {
        let e = new (a?.Err ?? r)(s.issues.map((e)=>x(e, i, u())));
        throw m(e, a?.callee), e;
    }
    return s.value;
}), A = (n = P, async (e, t, r, a)=>{
    let i = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (a?.Err ?? n)(s.issues.map((e)=>x(e, i, u())));
        throw m(e, a?.callee), e;
    }
    return s.value;
}), O = (a = P, (e, t, r)=>{
    let n = r ? {
        ...r,
        async: !1
    } : {
        async: !1
    }, i = e._zod.run({
        value: t,
        issues: []
    }, n);
    if (i instanceof Promise) throw new l();
    return i.issues.length ? {
        success: !1,
        error: new (a ?? S)(i.issues.map((e)=>x(e, n, u())))
    } : {
        success: !0,
        data: i.value
    };
}), $ = (i = P, async (e, t, r)=>{
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
        error: new i(a.issues.map((e)=>x(e, n, u())))
    } : {
        success: !0,
        data: a.value
    };
}), C = /^-?\d+(?:\.\d+)?$/, R = /^(?:true|false)$/i, T = /^null$/i, Z = {
    major: 4,
    minor: 3,
    patch: 6
}, U = d("$ZodType", (e, t)=>{
    var r;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Z;
    let n = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && n.unshift(e), n))for (let r of t._zod.onattach)r(e);
    if (0 === n.length) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, r)=>{
            let n, a = w(e);
            for (let i of t){
                if (i._zod.def.when) {
                    if (!i._zod.def.when(e)) continue;
                } else if (a) continue;
                let t = e.issues.length, s = i._zod.check(e);
                if (s instanceof Promise && r?.async === !1) throw new l();
                if (n || s instanceof Promise) n = (n ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (a || (a = w(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    a || (a = w(e, t));
                }
            }
            return n ? n.then(()=>e) : e;
        }, r = (r, a, i)=>{
            if (w(r)) return r.aborted = !0, r;
            let s = t(a, n, i);
            if (s instanceof Promise) {
                if (!1 === i.async) throw new l();
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
                if (!1 === i.async) throw new l();
                return s.then((e)=>t(e, n, i));
            }
            return t(s, n, i);
        };
    }
    g(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = O(e, t);
                    return r.success ? {
                        value: r.data
                    } : {
                        issues: r.error?.issues
                    };
                } catch (r) {
                    return $(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), q = d("$ZodString", (e, t)=>{
    var r;
    let n;
    U.init(e, t), e._zod.pattern = [
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
}), M = d("$ZodNumber", (e, t)=>{
    U.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? C, e._zod.parse = (r, n)=>{
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
}), F = d("$ZodBoolean", (e, t)=>{
    U.init(e, t), e._zod.pattern = R, e._zod.parse = (r, n)=>{
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
}), D = d("$ZodNull", (e, t)=>{
    U.init(e, t), e._zod.pattern = T, e._zod.values = new Set([
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
}), W = d("$ZodUnknown", (e, t)=>{
    U.init(e, t), e._zod.parse = (e)=>e;
});
function B(e, t, r) {
    e.issues.length && t.issues.push(...k(r, e.issues)), t.value[r] = e.value;
}
const I = d("$ZodArray", (e, t)=>{
    U.init(e, t), e._zod.parse = (r, n)=>{
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
            o instanceof Promise ? i.push(o.then((t)=>B(t, r, e))) : B(o, r, e);
        }
        return i.length ? Promise.all(i).then(()=>r) : r;
    };
});
function J(e, t, r, n, a) {
    if (e.issues.length) {
        if (a && !(r in n)) return;
        t.issues.push(...k(r, e.issues));
    }
    void 0 === e.value ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
const K = d("$ZodObject", (e, t)=>{
    var r;
    let n;
    U.init(e, t);
    let a = Object.getOwnPropertyDescriptor(t, "shape");
    if (!a?.get) {
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
    let i = (r = ()=>(function(e) {
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
        })(t), {
        get value () {
            {
                let e = r();
                return Object.defineProperty(this, "value", {
                    value: e
                }), e;
            }
        }
    });
    g(e._zod, "propValues", ()=>{
        let e = t.shape, r = {};
        for(let t in e){
            let n = e[t]._zod;
            if (n.values) for (let e of (r[t] ?? (r[t] = new Set()), n.values))r[t].add(e);
        }
        return r;
    });
    let s = t.catchall;
    e._zod.parse = (t, r)=>{
        n ?? (n = i.value);
        let a = t.value;
        if (!b(a)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: a,
            inst: e
        }), t;
        t.value = {};
        let o = [], d = n.shape;
        for (let e of n.keys){
            let n = d[e], i = "optional" === n._zod.optout, s = n._zod.run({
                value: a[e],
                issues: []
            }, r);
            s instanceof Promise ? o.push(s.then((r)=>J(r, t, e, a, i))) : J(s, t, e, a, i);
        }
        return s ? function(e, t, r, n, a, i) {
            let s = [], o = a.keySet, d = a.catchall._zod, l = d.def.type, c = "optional" === d.optout;
            for(let a in t){
                if (o.has(a)) continue;
                if ("never" === l) {
                    s.push(a);
                    continue;
                }
                let i = d.run({
                    value: t[a],
                    issues: []
                }, n);
                i instanceof Promise ? e.push(i.then((e)=>J(e, r, a, t, c))) : J(i, r, a, t, c);
            }
            return (s.length && r.issues.push({
                code: "unrecognized_keys",
                keys: s,
                input: t,
                inst: i
            }), e.length) ? Promise.all(e).then(()=>r) : r;
        }(o, a, t, r, i.value, e) : o.length ? Promise.all(o).then(()=>t) : t;
    };
});
function V(e, t, r, n) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let a = e.filter((e)=>!w(e));
    return 1 === a.length ? (t.value = a[0].value, a[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>x(e, n, u())))
    }), t);
}
const X = d("$ZodUnion", (e, t)=>{
    U.init(e, t), g(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), g(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), g(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), g(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>f(e.source)).join("|")})$`);
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
        return s ? Promise.all(o).then((t)=>V(t, a, e, i)) : V(o, a, e, i);
    };
}), G = d("$ZodRecord", (e, t)=>{
    U.init(e, t), e._zod.parse = (r, n)=>{
        let a = r.value;
        if (!function(e) {
            if (!1 === b(e)) return !1;
            let t = e.constructor;
            if (void 0 === t || "function" != typeof t) return !0;
            let r = t.prototype;
            return !1 !== b(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
        }(a)) return r.issues.push({
            expected: "record",
            code: "invalid_type",
            input: a,
            inst: e
        }), r;
        let i = [], s = t.keyType._zod.values;
        if (s) {
            let o;
            r.value = {};
            let d = new Set();
            for (let e of s)if ("string" == typeof e || "number" == typeof e || "symbol" == typeof e) {
                d.add("number" == typeof e ? e.toString() : e);
                let s = t.valueType._zod.run({
                    value: a[e],
                    issues: []
                }, n);
                s instanceof Promise ? i.push(s.then((t)=>{
                    t.issues.length && r.issues.push(...k(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...k(e, s.issues)), r.value[e] = s.value);
            }
            for(let e in a)d.has(e) || (o = o ?? []).push(e);
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
            if ("string" == typeof s && C.test(s) && o.issues.length) {
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
                    issues: o.issues.map((e)=>x(e, n, u())),
                    input: s,
                    path: [
                        s
                    ],
                    inst: e
                });
                continue;
            }
            let d = t.valueType._zod.run({
                value: a[s],
                issues: []
            }, n);
            d instanceof Promise ? i.push(d.then((e)=>{
                e.issues.length && r.issues.push(...k(s, e.issues)), r.value[o.value] = e.value;
            })) : (d.issues.length && r.issues.push(...k(s, d.issues)), r.value[o.value] = d.value);
        }
        return i.length ? Promise.all(i).then(()=>r) : r;
    };
}), H = d("$ZodLiteral", (e, t)=>{
    if (U.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? v(e) : e ? v(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (n, a)=>{
        let i = n.value;
        return r.has(i) || n.issues.push({
            code: "invalid_value",
            values: t.values,
            input: i,
            inst: e
        }), n;
    };
});
function Q(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const Y = d("$ZodOptional", (e, t)=>{
    U.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), g(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let n = t.innerType._zod.run(e, r);
            return n instanceof Promise ? n.then((t)=>Q(t, e.value)) : Q(n, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, r);
    };
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
const ee = d("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    U.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>N(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>O(e, t, r), e.parseAsync = async (t, r)=>A(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>$(e, t, r), e.check = (...r)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, r)=>{
        let n;
        return n = new e._zod.constr(t ?? e._zod.def), (!t || r?.parent) && (n._zod.parent = e), n;
    }, e.brand = ()=>e, e.register = (t, r)=>(t.add(e, r), e), e.apply = (t)=>t(e);
}), et = d("ZodMiniString", (e, t)=>{
    q.init(e, t), ee.init(e, t);
});
function er(e) {
    return new et({
        type: "string",
        ...y(e)
    });
}
const en = d("ZodMiniNumber", (e, t)=>{
    M.init(e, t), ee.init(e, t);
});
function ea(e) {
    return new en({
        type: "number",
        checks: [],
        ...y(e)
    });
}
const ei = d("ZodMiniBoolean", (e, t)=>{
    F.init(e, t), ee.init(e, t);
});
function es(e) {
    return new ei({
        type: "boolean",
        ...y(e)
    });
}
const eo = d("ZodMiniNull", (e, t)=>{
    D.init(e, t), ee.init(e, t);
});
function ed(e) {
    return new eo({
        type: "null",
        ...y(e)
    });
}
const el = d("ZodMiniUnknown", (e, t)=>{
    W.init(e, t), ee.init(e, t);
}), ec = d("ZodMiniArray", (e, t)=>{
    I.init(e, t), ee.init(e, t);
});
function eu(e, t) {
    return new ec({
        type: "array",
        element: e,
        ...y(t)
    });
}
const e_ = d("ZodMiniObject", (e, t)=>{
    K.init(e, t), ee.init(e, t), g(e, "shape", ()=>t.shape);
});
function ep(e, t) {
    return new e_({
        type: "object",
        shape: e ?? {},
        ...y(t)
    });
}
const ef = d("ZodMiniUnion", (e, t)=>{
    X.init(e, t), ee.init(e, t);
});
function eh(e, t) {
    return new ef({
        type: "union",
        options: e,
        ...y(t)
    });
}
const eg = d("ZodMiniRecord", (e, t)=>{
    G.init(e, t), ee.init(e, t);
});
function em(e, t, r) {
    return new eg({
        type: "record",
        keyType: e,
        valueType: t,
        ...y(r)
    });
}
const eb = d("ZodMiniLiteral", (e, t)=>{
    H.init(e, t), ee.init(e, t);
});
function ev(e, t) {
    return new eb({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...y(t)
    });
}
const ey = d("ZodMiniOptional", (e, t)=>{
    Y.init(e, t), ee.init(e, t);
});
function ew(e) {
    return new ey({
        type: "optional",
        innerType: e
    });
}
const ek = eh([
    ev("account_set_password"),
    ev("account_set_active")
]), ez = eh([
    ev("waiting_transport"),
    ev("waiting_identity"),
    ev("reading"),
    ev("configuring"),
    ev("verifying"),
    ev("waiting_inform"),
    ev("ready"),
    ev("retry_wait"),
    ev("manual_required"),
    ev("not_configured"),
    ev("waiting_acs"),
    ev("awaiting_apply"),
    ev("discovering_management_wan"),
    ev("configuring_management_wan"),
    ev("verifying_management_wan")
]), ex = ep({
    enabled: es(),
    listen: eh([
        er(),
        ed()
    ]),
    path: eh([
        er(),
        ed()
    ]),
    error: eh([
        er(),
        ed()
    ])
}), ej = ep({
    vlan: ea(),
    vlans: eu(ea()),
    priority: ea(),
    acs_url: er()
}), eS = ep({
    state: ez,
    optical_sn: er(),
    cwmp_id: er(),
    mqtt_target: eh([
        er(),
        ed()
    ]),
    binding_source: er(),
    method: er(),
    desired_version: er(),
    generation: ea(),
    reason: er(),
    attempts: ea(),
    next_retry_at: ea(),
    updated_at: ea(),
    settings_verified_at: eh([
        ea(),
        ed()
    ]),
    selected_vlan: eh([
        ea(),
        ed()
    ]),
    last_inform: eh([
        ea(),
        ed()
    ]),
    expected_acs_url: er(),
    last_error: eh([
        er(),
        ed()
    ]),
    transport_epoch: ea(),
    completed_authorization: ea(),
    connection_request_enabled: eh([
        es(),
        ed()
    ]),
    inflight: es(),
    persistence_error: eh([
        er(),
        ed()
    ]),
    link_identity_error: eh([
        er(),
        ed()
    ]),
    listener: ex,
    mqtt_last_seen: eh([
        ea(),
        ed()
    ]),
    desired: ew(ej),
    endpoint_notice: ew(er()),
    manual_steps: ew(eu(er()))
}), eP = eh([
    ev("pending"),
    ev("unavailable")
]), eE = eh([
    eS,
    ep({
        state: eP,
        reason: er()
    })
]), eN = ep({
    id: er(),
    name: er()
}), eA = ep({
    configured: er(),
    effective: er(),
    available: eu(er()),
    reason: er()
}), eO = ep({
    phase: eh([
        ev("not_started"),
        ev("collecting_identity"),
        ev("retrying_identity"),
        ev("unsupported"),
        ev("configuring"),
        ev("verifying"),
        ev("wan_bootstrap_pending"),
        ev("verified"),
        ev("retrying"),
        ev("offline")
    ]),
    generation: ea(),
    error: eh([
        er(),
        ed()
    ])
});
ep({
    success: es(),
    output: ew(er()),
    error: ew(er())
});
const e$ = eh([
    ev("factory"),
    ev("firmware"),
    ev("builtin")
]), eC = ep({
    detected: es(),
    device: er(),
    has_data: es(),
    sha256: er(),
    data: er()
}), eR = ep({
    exists: es(),
    path: er(),
    size: ea(),
    sha256: er(),
    data: er()
}), eT = ep({
    source: e$,
    active_path: er(),
    size: ea(),
    sha256: er(),
    data: er(),
    factory: eC,
    firmware: eR
}), eZ = ep({
    error: er()
});
eh([
    eT,
    eZ
]);
const eU = ep({
    success: es(),
    path: er(),
    size: ea(),
    sha256: er()
});
eh([
    eU,
    eZ
]), ep({
    data: er()
});
const eq = ep({
    acs: es(),
    mqtt: es(),
    npu: es(),
    "device-hl202": es(),
    "device-hwtc": es(),
    "device-star": es(),
    "device-zte": es(),
    "device-scty": es()
}), eM = ep({
    optical: es(),
    bridge_offload: es(),
    omci_mib: es(),
    mqtt_telemetry: es(),
    hl202_management: es(),
    cwmp: es(),
    command_provisioning: es()
}), eL = ep({
    status: es(),
    config: es(),
    sync: es(),
    hardware: es(),
    calibration: es(),
    hl202: es(),
    about: es()
}), eF = ep({
    schema_version: ev(1),
    version: er(),
    features: eq,
    functions: eM,
    pages: eL,
    adapters: eu(eN)
}), eD = eh([
    ep({
        valid: ev(!0),
        revision: er(),
        devices: ea()
    }),
    ep({
        error: er()
    })
]), eW = eh([
    ev("auto"),
    ev("manual")
]), eB = ev("diff"), eI = ep({
    state: er(),
    enabled: es(),
    reason: ew(eh([
        er(),
        ed()
    ])),
    revision: ew(er()),
    vlan: ew(ea()),
    updated_at: ew(ea())
}), eJ = eh([
    ev("online"),
    ev("waiting_inform"),
    ev("offline_or_stale"),
    ev("waiting_transport")
]), eK = ep({
    cwmp_id: er(),
    state: eJ,
    optical_online: es(),
    last_inform: eh([
        ea(),
        ed()
    ]),
    age_seconds: eh([
        ea(),
        ed()
    ])
}), eV = eh([
    ev("waiting"),
    ev("wan_reconciling"),
    ev("wan_verifying"),
    ev("wifi_reconciling"),
    ev("discovering"),
    ev("reading"),
    ev("disabling"),
    ev("disabling_read"),
    ev("writing"),
    ev("verifying"),
    ev("settling"),
    ev("completed"),
    ev("not_started"),
    ev("reset_pending"),
    ev("interrupted"),
    ev("recovering"),
    ev("waiting_management"),
    ev("waiting_task")
]), eX = eh([
    ev("device_service"),
    ev("ssid"),
    ev("port_binding"),
    ev("wan_activation")
]), eG = ep({
    name: er(),
    desired: er()
}), eH = ep({
    id: er(),
    name: ew(eh([
        er(),
        ed()
    ])),
    kind: eX,
    service_type: er(),
    state: er(),
    reason: ew(er()),
    revision: ew(er()),
    current_revision: ew(es()),
    management_fresh: ew(es()),
    operation_id: ew(ea()),
    task_id: ew(eh([
        ea(),
        ed()
    ])),
    updated_at: ew(ea()),
    changes: ew(eu(eG))
}), eQ = eh([
    ev("plan"),
    ev("apply")
]), eY = ep({
    wan: er(),
    wlan: er(),
    binding: er()
}), e0 = ep({
    state: er(),
    requested: er(),
    contract: eh([
        er(),
        ed()
    ]),
    reason: er(),
    cache_hit: es(),
    schema: er(),
    capabilities: eh([
        eY,
        ed()
    ])
}), e2 = ep({
    parent: ea(),
    connection: ea(),
    state: er(),
    service_list: er(),
    kind: er(),
    baseline: eh([
        eu(ea()),
        ed()
    ])
}), e1 = ep({
    state: er(),
    reason: ew(er()),
    task_id: ew(eh([
        ea(),
        ed()
    ])),
    instance: ew(ea()),
    cwmp_id: ew(er())
}), e5 = eh([
    ev("waiting"),
    ev("inventory"),
    ev("classifying"),
    ev("adding_parent"),
    ev("child_names"),
    ev("adding_child"),
    ev("delete_guard"),
    ev("deleting"),
    ev("verify_delete"),
    ev("empty_parent"),
    ev("deleting_parent"),
    ev("verify_parent_delete"),
    ev("next"),
    ev("done")
]), e6 = ep({
    owned: eu(ea()),
    pending: eh([
        er(),
        ed()
    ]),
    pending_instance: eh([
        ea(),
        ed()
    ])
}), e8 = eh([
    ev("waiting"),
    ev("inventory"),
    ev("adding"),
    ev("verify_add"),
    ev("deleting"),
    ev("verify_delete"),
    ev("reading_disable"),
    ev("disabling"),
    ev("verifying_disable"),
    ev("next"),
    ev("done")
]), e3 = eh([
    ev("disable"),
    ev("preserve"),
    ev("delete")
]), e4 = ep({
    parent: ea(),
    child: ea(),
    service: er(),
    vlan: er()
}), e9 = ep({
    state: eV,
    items: eu(eH),
    backend: ew(eA),
    operation_id: ew(ea()),
    device: ew(er()),
    optical_sn: ew(er()),
    cwmp_id: ew(er()),
    revision: ew(er()),
    mode: ew(eQ),
    started_at: ew(ea()),
    completed_at: ew(eh([
        ea(),
        ed()
    ])),
    current_revision: ew(es()),
    management_fresh: ew(es()),
    reason: ew(er()),
    error: ew(er()),
    attempts: ew(ea()),
    next_retry_at: ew(ea()),
    reconcile_reason: ew(er()),
    cwmp_contract: ew(e0),
    wan_objects: ew(em(er(), e2)),
    wan_lifecycle: ew(em(er(), e1)),
    wan_stage: ew(e5),
    wifi_objects: ew(e6),
    wifi_lifecycle: ew(em(er(), e1)),
    wifi_stage: ew(e8),
    wifi_cleanup: ew(e3),
    native_ownership: ew(em(er(), e4)),
    write_performed: ew(es()),
    readback_verified: ew(es())
}), e7 = eh([
    ev("not_configured"),
    ev("stale_revision"),
    ev("stale_management"),
    ev("verified"),
    ev("attention_required"),
    ev("accepted_unverified"),
    ev("pending"),
    ev("recovering"),
    ev("waiting_management")
]), te = ep({
    device: er(),
    name: eh([
        er(),
        ed()
    ]),
    group: eh([
        er(),
        ed()
    ]),
    group_name: eh([
        er(),
        ed()
    ]),
    template: eh([
        er(),
        ed()
    ]),
    template_name: eh([
        er(),
        ed()
    ]),
    optical_sn: er(),
    adapter: er(),
    omci_management: eI,
    management: eh([
        eK,
        ed()
    ]),
    acs_bootstrap: eE,
    provisioning: e9,
    services: eu(eH),
    ssids: eu(eH),
    wifi_sync: e7
}), tt = eh([
    ev("discovering"),
    ev("comparing"),
    ev("planning"),
    ev("applying"),
    ev("verifying"),
    ev("configuring_listener"),
    ev("cleaning_previous"),
    ev("waiting_devices"),
    ev("ready"),
    ev("awaiting_apply"),
    ev("verified"),
    ev("blocked"),
    ev("retry_wait")
]), tr = ep({
    enabled: es(),
    mode: eW,
    vlan: eu(ea()),
    priority: ea(),
    address: er(),
    acs_url: er(),
    port: ea(),
    path: er(),
    dhcp_enabled: es()
}), tn = ep({
    operation: er(),
    key: er(),
    value: eu(er())
}), ta = ep({
    state: tt,
    error: eh([
        er(),
        ed()
    ]),
    inflight: es(),
    ready: es(),
    desired_version: eh([
        er(),
        ed()
    ]),
    applied_version: eh([
        er(),
        ed()
    ]),
    next_retry_at: ea(),
    attempts: ea(),
    desired: eh([
        tr,
        ed()
    ]),
    applied: eh([
        tr,
        ed()
    ]),
    previous: eh([
        tr,
        ed()
    ]),
    plan: eu(tn)
}), ti = ep({
    desired: eh([
        ej,
        ed()
    ]),
    state: er()
}), ts = ep({
    id: er(),
    name: eh([
        er(),
        ed()
    ]),
    template: er()
}), to = ep({
    enabled: es(),
    mode: eW,
    method: eB,
    revision: er(),
    triggers: eu(er()),
    interval_minutes: ea(),
    error: eh([
        er(),
        ed()
    ]),
    devices: eu(te),
    management_network: ta,
    omci_management: ti,
    groups: eu(ts),
    pending_devices: eu(er()),
    onu_pins: ew(em(er(), ea())),
    config_error: ew(eh([
        er(),
        ed()
    ]))
});
eh([
    to,
    eZ
]);
const td = ep({
    enabled: eh([
        es(),
        ed()
    ]),
    routed_enabled: eh([
        es(),
        ed()
    ]),
    bridge_enabled: eh([
        es(),
        ed()
    ]),
    engine_attached: eh([
        es(),
        ed()
    ]),
    forwarding_verified: eh([
        es(),
        ed()
    ])
}), tl = ep({
    entity_id: ea(),
    port_id: eh([
        ea(),
        ed()
    ])
}), tc = ep({
    entity_id: ea(),
    filter_list_hex: eh([
        er(),
        ed()
    ]),
    forward_operation: eh([
        ea(),
        ed()
    ]),
    number_of_entries: eh([
        ea(),
        ed()
    ])
}), tu = ep({
    entity_id: ea(),
    received_frame_rules_hex: eh([
        eu(er()),
        ed()
    ]),
    error: eh([
        er(),
        ed()
    ])
}), t_ = ep({
    age_seconds: ea(),
    gem_ports: eu(tl),
    vlan_filters: eu(tc),
    vlan_operations: eu(tu)
}), tp = ep({
    source: er(),
    unit: er(),
    reason: eh([
        er(),
        ed()
    ]),
    raw: eh([
        er(),
        ed()
    ]),
    age_seconds: eh([
        ea(),
        ed()
    ])
}), tf = ep({
    interface: er(),
    gem_ports: eh([
        eu(ea()),
        ed()
    ]),
    vlan_id: eh([
        ea(),
        ed()
    ]),
    onu_inventory: eh([
        t_,
        ed()
    ]),
    tx_bytes: eh([
        ea(),
        ed()
    ]),
    rx_bytes: eh([
        ea(),
        ed()
    ]),
    current_tx_kbps: eh([
        ea(),
        ed()
    ]),
    current_rx_kbps: eh([
        ea(),
        ed()
    ]),
    olt_channel_gem: ew(ea()),
    forwarding_verified: ew(es()),
    offload: td,
    measurements: em(er(), tp)
});
ep({});
const th = ep({
    entity_id: ea(),
    interval_end_time: ea(),
    corrected_bytes: ea(),
    corrected_code_words: ea(),
    uncorrectable_code_words: ea(),
    total_code_words: ea(),
    fec_seconds: ea()
}), tg = ep({
    ani_entity_id: eh([
        ea(),
        ed()
    ]),
    control_supported: es(),
    downstream_enabled: eh([
        es(),
        ed()
    ]),
    upstream_enabled: eh([
        es(),
        ed()
    ]),
    downstream_pm: eh([
        th,
        ed()
    ]),
    measurement: tp
}), tm = ep({
    entry: eh([
        ev(0),
        ev(1),
        ev(2)
    ]),
    username: er(),
    active: es()
}), tb = ep({
    mqtt_mac: er(),
    optical_sn: eh([
        er(),
        ed()
    ]),
    onu_id: eh([
        ea(),
        ed()
    ]),
    binding_generation: er(),
    last_seen: ea(),
    reason: er()
}), tv = eh([
    ev("executed"),
    ev("dispatched"),
    ev("timeout"),
    ev("error")
]), ty = ep({
    target: er(),
    status: tv,
    request_id: ew(er()),
    exit_code: ew(ea()),
    output: ew(er()),
    output_truncated: es(),
    error: ew(er())
}), tw = ep({
    target: tb,
    result: ty,
    binding_current: es()
}), tk = eh([
    ev("not_applicable"),
    ev("accepted_and_saved"),
    ev("unconfirmed")
]), tz = ep({
    code: er(),
    message: er()
});
eh([
    ep({
        schema_version: ev(1),
        operation: tw,
        accounts: eh([
            eu(tm),
            ed()
        ]),
        write_status: tk
    }),
    ep({
        schema_version: ea(),
        error: tz
    })
]);
const tx = ep({
    optical_sn: er(),
    onu_id: ea(),
    binding_generation: er()
}), tj = ep({
    mqtt_mac: er(),
    binding_generation: er()
}), tS = eh([
    tx,
    tj
]);
ep({
    target: tS
});
const tP = eh([
    ep({
        kind: ev("exec"),
        script: er(),
        timeout_seconds: ea()
    }),
    ep({
        kind: ev("accounts_read")
    }),
    ep({
        kind: ev("account_set_password"),
        entry: ea(),
        password: er()
    }),
    ep({
        kind: ev("account_set_active"),
        entry: ea(),
        active: es()
    })
]), tE = ep({
    schema_version: ea(),
    target: tx,
    action: tP
}), tN = ep({
    optical_sn: er(),
    onu_id: ea(),
    model: er(),
    optical_online: es(),
    can_execute: es(),
    mqtt: eh([
        tb,
        ed()
    ]),
    report_revision: eh([
        ea(),
        ed()
    ])
});
eh([
    ep({
        schema_version: ev(1),
        operation: tw
    }),
    ep({
        schema_version: ea(),
        error: tz
    })
]), ep({
    target: tS,
    script: er(),
    timeout_seconds: ea()
});
const tA = eh([
    ep({
        schema_version: ev(1),
        devices: eu(tN),
        sources: eu(tb)
    }),
    ep({
        schema_version: ea(),
        error: tz
    })
]);
eh([
    ep({
        method: ev("list")
    }),
    ep({
        method: ev("report"),
        target: tx
    }),
    ep({
        method: ev("source_report"),
        target: tj
    }),
    ep({
        method: ev("run"),
        request: tE
    })
]);
const tO = eh([
    ev("received"),
    ev("report_unavailable")
]), t$ = ep({
    value: new el({
        type: "unknown"
    }),
    member: er(),
    unit: eh([
        er(),
        ed()
    ])
}), tC = ep({
    name: er(),
    bytes: ea(),
    encoding: er(),
    text: eh([
        er(),
        ed()
    ]),
    text_omitted: es()
}), tR = ep({
    schema_version: ea(),
    compressed_bytes: ea(),
    decompressed_bytes: ea(),
    fields: em(er(), t$),
    members: eu(tC),
    errors: eu(er())
}), tT = ep({
    revision: ea(),
    last_received: ea(),
    last_processed_receipt: eh([
        ea(),
        ed()
    ]),
    last_good: eh([
        ea(),
        ed()
    ]),
    error: eh([
        er(),
        ed()
    ]),
    report: eh([
        tR,
        ed()
    ])
});
eh([
    ep({
        schema_version: ev(1),
        target: tb,
        report: eh([
            tT,
            ed()
        ]),
        state: tO
    }),
    ep({
        schema_version: ev(1),
        target: tb,
        report: eh([
            tT,
            ed()
        ]),
        read_only: ev(!0)
    }),
    ep({
        schema_version: ea(),
        error: tz
    })
]), ep({
    target: tS
}), ep({
    target: tS,
    kind: ek,
    entry: ea(),
    password: er(),
    active: es()
});
const tZ = ep({
    accepted: ea(),
    rejected: ea(),
    read_errors: ea(),
    handled: ea(),
    max_intake_us: ea(),
    max_handler_us: ea()
}), tU = ev("pending"), tq = ep({
    phase: eh([
        ev("starting"),
        ev("upload"),
        ev("tables")
    ]),
    received: ea(),
    expected: eh([
        ea(),
        ed()
    ])
}), tM = ev("ready"), tL = eh([
    ep({
        status: tU,
        progress: ew(tq)
    }),
    ep({
        status: tM,
        chunk: ea(),
        chunks: ea(),
        bytes: ea(),
        data: er()
    })
]);
eh([
    tL,
    eZ
]);
const tF = ep({
    status: tU,
    job: er()
}), tD = ep({
    released: es()
});
ep({
    job: er()
}), ep({
    job: er(),
    chunk: ea()
}), eh([
    tF,
    eZ
]);
const tW = ep({
    accepting: es(),
    running: ea(),
    stored: ea(),
    bytes: ea(),
    running_limit: ea(),
    stored_limit: ea(),
    bytes_limit: ea(),
    result_bytes_limit: ea()
}), tB = ep({
    mac: er(),
    ip: er(),
    band: er(),
    rssi_dbm: eh([
        ea(),
        ed()
    ]),
    rx_rate_mbps: eh([
        ea(),
        ed()
    ]),
    tx_rate_mbps: eh([
        ea(),
        ed()
    ])
}), tI = eh([
    ev("unknown"),
    ev("octets"),
    ev("string"),
    ev("unsigned_integer"),
    ev("table"),
    ev("signed_integer"),
    ev("pointer"),
    ev("bit_field"),
    ev("enumeration"),
    ev("counter")
]), tJ = ep({
    id: er(),
    url: er()
}), tK = ep({
    name: er(),
    kind: tI,
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
        er(),
        ed()
    ]),
    reference: tJ
}), tV = eh([
    ep({
        type: ev("unsigned"),
        value: ea()
    }),
    ep({
        type: ev("signed"),
        value: ea()
    }),
    ep({
        type: ev("decimal"),
        value: er()
    }),
    ep({
        type: ev("text"),
        value: eh([
            er(),
            ed()
        ])
    }),
    ep({
        type: ev("octets"),
        hex: er()
    }),
    ep({
        type: ev("table_length"),
        bytes: ea()
    })
]), tX = ep({
    raw_hex: er(),
    value: tV,
    sequences: eu(ea())
}), tG = ep({
    definition: tK,
    value: eh([
        tV,
        ed()
    ]),
    observations: eu(tX)
}), tH = eh([
    ev("layout"),
    ev("name_only"),
    ev("unknown")
]), tQ = ep({
    class_id: ea(),
    name: eh([
        er(),
        ed()
    ]),
    entities: ea(),
    records: ea(),
    support: tH
}), tY = ep({
    code: er(),
    message: er(),
    offset: ea(),
    mask: ea()
}), t0 = ep({
    class_id: ea(),
    entity_id: ea(),
    name: eh([
        er(),
        ed()
    ]),
    support: tH,
    reference: eh([
        tJ,
        ed()
    ]),
    sequences: eu(ea()),
    attributes: eu(tG),
    diagnostics: eu(tY)
}), t2 = ev("ready"), t1 = ep({
    class_id: ea(),
    entity_id: ea(),
    sequence: ea(),
    attribute_mask: ea(),
    raw_hex: er(),
    consumed: ea(),
    remaining_hex: er(),
    undecoded_mask: ea()
}), t5 = ep({
    raw_hex: er(),
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
}), t6 = ep({
    class_id: ea(),
    entity_id: ea(),
    attribute: tK,
    collected: es(),
    error: eh([
        er(),
        ed()
    ]),
    raw_hex: er(),
    rows: eu(er()),
    vlan_rules: eu(t5)
}), t8 = ep({
    schema_version: ev(1),
    reference_version: er(),
    onu_id: eh([
        ea(),
        ed()
    ]),
    uploaded_complete: es(),
    expected_records: ea(),
    received_records: ea(),
    decoded_records: ea(),
    partial_records: ea(),
    basic_records: ea(),
    tables_requested: es(),
    tables_collected: es(),
    classes: eu(tQ),
    entities: eu(t0),
    records: eu(t1),
    tables: eu(t6),
    diagnostics: eu(tY)
});
ep({
    status: t2,
    report: t8
}), ep({
    onu_id: ea(),
    optical_sn: er(),
    tables: es()
});
const t3 = eh([
    ep({
        status: ev("success"),
        enabled: es()
    }),
    ep({
        status: ev("error"),
        error: er()
    })
]);
ep({
    enabled: es(),
    bridge: er(),
    wan_upstream: es(),
    wan_downstream: es(),
    onu_bridge: es()
});
const t4 = ep({
    index: er(),
    state: er(),
    pkt_type: er(),
    orig_tuple: er(),
    new_tuple: er(),
    eth: er(),
    vlan: er(),
    packets: ea(),
    bytes: ea(),
    counters_valid: es(),
    packets_exact: er(),
    bytes_exact: er()
}), t9 = ep({
    sampled_at_ms: ea(),
    errors: eu(er()),
    config_valid: es(),
    engine_valid: es(),
    mask_valid: es(),
    routed_mask_valid: es(),
    debug_valid: es(),
    flows_valid: es(),
    entries_valid: es(),
    counters_valid: es(),
    hooks_valid: es(),
    total_packets_exact: er(),
    total_bytes_exact: er(),
    supported: es(),
    engine_attached: es(),
    bridge_offload_enabled: es(),
    wan_upstream: es(),
    wan_downstream: es(),
    onu_bridge: es(),
    bridge_offload_mask: ea(),
    routed_offload_mask: ea(),
    bridge_offload_debug: es(),
    bridge: er(),
    active_ports: eu(er()),
    fw4_hooks_ready: es(),
    total_entries: ea(),
    bound_entries: ea(),
    bound_ipv4_entries: ea(),
    bound_ipv6_entries: ea(),
    total_packets: ea(),
    total_bytes: ea(),
    bound_flows: eu(t4)
}), t7 = ep({
    equipment_id: eh([
        er(),
        ed()
    ]),
    hardware_version: eh([
        er(),
        ed()
    ]),
    software_images: eu(er()),
    omcc_version: eh([
        ea(),
        ed()
    ]),
    errors: eu(er())
}), re = ep({
    desired: em(er(), ea()),
    active: em(er(), ea()),
    pending_restart: es(),
    allocation_blocked: es(),
    startup_error: eh([
        er(),
        ed()
    ]),
    config_error: eh([
        er(),
        ed()
    ])
}), rt = eh([
    ev("optical_on"),
    ev("optical_off"),
    ev("optical_status"),
    ev("optical_reload"),
    ev("optical_reinitialize"),
    ev("optical_shutdown")
]), rr = eh([
    ev("success"),
    ev("error")
]), rn = eh([
    ev("enabled"),
    ev("disabled"),
    ev("unknown")
]), ra = ep({
    schema_version: ev(1),
    status: rr,
    action: rt,
    desired_enabled: eh([
        es(),
        ed()
    ]),
    tx_enabled: eh([
        es(),
        ed()
    ]),
    actor_state: rn,
    hardware_ready: es(),
    discovery_active: es(),
    cleanup_pending: es(),
    error: eh([
        tz,
        ed()
    ])
});
ep({
    enabled: es()
});
const ri = ep({
    model: er(),
    wavelength_tx_nm: ea(),
    wavelength_rx_nm: ea(),
    phy_rate_downlink_gbps: ea(),
    phy_rate_uplink_gbps: ea(),
    tx_power_dbm: eh([
        ea(),
        ed()
    ]),
    laser_bias_current_ma: eh([
        ea(),
        ed()
    ]),
    temperature_celsius: eh([
        ea(),
        ed()
    ]),
    vcc_voltage: eh([
        ea(),
        ed()
    ]),
    cdr_locked: eh([
        es(),
        ed()
    ]),
    tx_enabled: ew(es()),
    measurements: em(er(), tp)
}), rs = eh([
    ev("o1_initial"),
    ev("o2_standby"),
    ev("o3_serial_number"),
    ev("o4_ranging"),
    ev("o5_operation"),
    ev("o6_intermittent_lods"),
    ev("o7_emergency_stop")
]), ro = ep({
    restarting: ev(!0)
}), rd = ep({
    calls: ea(),
    failures: ea(),
    last_us: ea(),
    max_us: ea(),
    total_us: ea()
}), rl = ep({
    port: ea(),
    interface: er(),
    carrier: es(),
    status: er(),
    onu_id: ew(ea()),
    onu_sn: ew(er()),
    link_state: er(),
    reserved_sn: ew(er())
}), rc = ep({
    channel_2g: eh([
        ea(),
        ed()
    ]),
    channel_5g: eh([
        ea(),
        ed()
    ]),
    bandwidth_5g: eh([
        er(),
        ed()
    ]),
    tx_power_pct: eh([
        ea(),
        ed()
    ]),
    measurements: em(er(), tp)
}), ru = ep({
    onu_id: ea(),
    vendor: er(),
    model: er(),
    serial_number: er(),
    state: rs,
    business_status: eO,
    management: eh([
        eK,
        ed()
    ]),
    provisioning: eh([
        e9,
        ed()
    ]),
    services: eu(eH),
    ssids: eu(eH),
    wifi_sync: e7,
    identity: eh([
        t7,
        ed()
    ]),
    identity_age_seconds: eh([
        ea(),
        ed()
    ]),
    identity_current: es(),
    fiber_distance_m: eh([
        ea(),
        ed()
    ]),
    ranging_delay_rtd_ns: eh([
        ea(),
        ed()
    ]),
    equalization_delay_bits: eh([
        ea(),
        ed()
    ]),
    optical_rx_power_dbm: eh([
        ea(),
        ed()
    ]),
    optical_tx_power_dbm: eh([
        ea(),
        ed()
    ]),
    firmware_version: er(),
    hardware_version: er(),
    uptime_seconds: eh([
        ea(),
        ed()
    ]),
    fec: ew(tg),
    data_path: tf,
    wifi_mesh: rc,
    connected_clients: eh([
        eu(tB),
        ed()
    ]),
    measurements: em(er(), tp)
}), r_ = ep({
    id: er(),
    last_seen_sec_ago: ea(),
    last_payload_bytes: ea()
}), rp = ep({
    ubus: ew(em(er(), rd)),
    jobs: ew(tW),
    onu_pinning: ew(re),
    fpga_status: er(),
    provisioning: eh([
        to,
        ed()
    ]),
    optical_transceiver: ri,
    switch_ports: eu(rl),
    sub_gateways: eu(ru),
    telemetry_gateways: eu(r_),
    npu: ew(t9),
    ipc: ew(tZ)
}), rf = eh([
    ev("plan"),
    ev("apply"),
    ev("management_plan"),
    ev("management_apply"),
    ev("reset_state"),
    ev("reconcile"),
    ev("retry")
]), rh = eh([
    ep({
        operation_ids: eu(ea()),
        revision: er()
    }),
    ep({
        started: ev(!0),
        mode: eQ
    }),
    ep({
        reset: ev(!0),
        device: er()
    }),
    ep({
        operation_ids: eu(ea()),
        mode: eQ,
        reconcile: ew(es()),
        retry: ew(es())
    }),
    eZ
]);
ep({
    action: rf,
    target: er(),
    management: ew(es()),
    item: ew(er())
});
let rg = ep({
    error: eh([
        er(),
        ep({
            code: er(),
            message: er()
        })
    ])
});
class rm extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function rb(e) {
    let t = rg.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new rm("rpc", e) : new rm(e.code, e.message);
    }
    return e;
}
const rv = {
    parse (e) {
        let t = tA.parse(rb(e));
        if ("object" == typeof t && null !== t && "error" in t) throw rb(t), Error("Unexpected RPC error");
        return t;
    }
}, ry = {
    parse (e) {
        let t = rh.parse(rb(e));
        if ("error" in t) throw Error(t.error);
        return t;
    }
};
em(er(), ep({
    carrier: ew(es()),
    mac: ew(er()),
    link: ew(ep({
        speed: ew(ea()),
        duplex: ew(er()),
        autoneg: ew(es())
    })),
    stats: ew(em(er(), ea()))
}));
const rw = {
    getCapabilities: {
        parse: (e)=>eF.parse(rb(e))
    },
    opticalStatus: ra,
    opticalSet: ra,
    getStatus: {
        parse: (e)=>rp.parse(rb(e))
    },
    getSync: {
        parse: (e)=>to.parse(rb(e))
    },
    configCheck: {
        parse (e) {
            if ("object" == typeof e && null !== e && "error" in e && ("valid" in e || "revision" in e || "devices" in e)) throw Error("Mixed configuration check result");
            return eD.parse(e);
        }
    },
    npuStatus: t9,
    configReload: {
        parse: (e)=>to.parse(rb(e))
    },
    restartService: {
        parse: (e)=>ro.parse(rb(e))
    },
    sync: {
        parse: (e)=>ry.parse(rb(e))
    },
    npuSet: t3,
    mibStart: {
        parse: (e)=>tF.parse(rb(e))
    },
    mibResult: {
        parse: (e)=>tL.parse(rb(e))
    },
    jobRelease: {
        parse: (e)=>tD.parse(rb(e))
    },
    hl202List: {
        parse: (e)=>rv.parse(rb(e))
    },
    hl202Report: {
        parse: (e)=>tF.parse(rb(e))
    },
    hl202AccountsStart: {
        parse: (e)=>tF.parse(rb(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>tF.parse(rb(e))
    },
    hl202ExecStart: {
        parse: (e)=>tF.parse(rb(e))
    },
    jobResult: {
        parse: (e)=>tL.parse(rb(e))
    },
    getCalibration: {
        parse: (e)=>eT.parse(rb(e))
    },
    saveCalibration: {
        parse: (e)=>eU.parse(rb(e))
    },
    applyCalibration: {
        parse: (e)=>tF.parse(rb(e))
    }
};
function rk() {
    var e;
    let r, n, a, i, s, o, d, l, c, u, p, f, h, g, m, b, v, y, w, k, z, x, j;
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
    }), d = e.declare({
        object: "fttr",
        method: "npu_status",
        reject: !0
    }), l = e.declare({
        object: "fttr",
        method: "config_reload",
        reject: !0
    }), c = e.declare({
        object: "fttr",
        method: "restart_service",
        reject: !0
    }), u = e.declare({
        object: "fttr",
        method: "sync",
        params: [
            "action",
            "target",
            "management",
            "item"
        ],
        reject: !0
    }), p = e.declare({
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
    }), f = e.declare({
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
    }), g = e.declare({
        object: "fttr",
        method: "job_release",
        params: [
            "job"
        ],
        reject: !0
    }), m = e.declare({
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
    }), k = e.declare({
        object: "fttr",
        method: "job_result",
        params: [
            "job",
            "chunk"
        ],
        reject: !0
    }), z = e.declare({
        object: "fttr",
        method: "get_calibration",
        reject: !0
    }), x = e.declare({
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
        getCapabilities: async ()=>rw.getCapabilities.parse(await r()),
        opticalStatus: async ()=>rw.opticalStatus.parse(await n()),
        opticalSet: async (e)=>rw.opticalSet.parse(await a(e.enabled)),
        getStatus: async ()=>rw.getStatus.parse(await i()),
        getSync: async ()=>rw.getSync.parse(await s()),
        configCheck: async ()=>rw.configCheck.parse(await o()),
        npuStatus: async ()=>rw.npuStatus.parse(await d()),
        configReload: async ()=>rw.configReload.parse(await l()),
        restartService: async ()=>rw.restartService.parse(await c()),
        sync: async (e)=>rw.sync.parse(await u(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>rw.npuSet.parse(await p(e.enabled, e.bridge, e.wan_upstream, e.wan_downstream, e.onu_bridge)),
        mibStart: async (e)=>rw.mibStart.parse(await f(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>rw.mibResult.parse(await h(e.job, e.chunk)),
        jobRelease: async (e)=>rw.jobRelease.parse(await g(e.job)),
        hl202List: async ()=>rw.hl202List.parse(await m()),
        hl202Report: async (e)=>rw.hl202Report.parse(await b(e.target)),
        hl202AccountsStart: async (e)=>rw.hl202AccountsStart.parse(await v(e.target)),
        hl202AccountUpdate: async (e)=>rw.hl202AccountUpdate.parse(await y(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>rw.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>rw.jobResult.parse(await k(e.job, e.chunk)),
        getCalibration: async ()=>rw.getCalibration.parse(await z()),
        saveCalibration: async (e)=>rw.saveCalibration.parse(await x(e.data)),
        applyCalibration: async ()=>rw.applyCalibration.parse(await j())
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
const rz = async ()=>rk().npuStatus(), rx = async (e)=>rk().npuSet(e);
function rj(e, t) {
    return !0 === t && void 0 !== e && /^(0|[1-9][0-9]*)$/.test(e) ? BigInt(e).toLocaleString() : "\u2014";
}
function rS(e, t) {
    return !0 === t ? `0x${e.toString(16).padStart(4, "0")} (${e})` : "\u2014";
}
function rP(e, t) {
    var r;
    return r = {
        class: "fttr-npu-row",
        children: [
            o("span", {
                children: e
            }),
            o("strong", {
                children: t
            })
        ]
    }, o("div", r);
}
function rE(e, t, r, n) {
    return o("span", {
        class: `fttr-npu-state ${!0 === t ? e ? "ready" : "pending" : ""}`,
        children: !0 === t ? e ? r : n : _("Unknown")
    });
}
let main = L.view.extend({
    render: function() {
        var e, t;
        let r, n, a = !1, i = !1, s = 0, d = 0, l = o("input", {
            id: "fttr-npu-enabled",
            type: "checkbox",
            disabled: !0,
            onchange: ()=>{
                i = !0;
            }
        }), c = o("input", {
            id: "fttr-npu-bridge",
            type: "text",
            maxLength: 15,
            disabled: !0,
            oninput: ()=>{
                i = !0;
            }
        }), u = o("p", {
            "aria-live": "polite"
        }), p = (e)=>o("input", {
                id: e,
                type: "checkbox",
                disabled: !0,
                onchange: ()=>{
                    i = !0;
                }
            }), f = p("fttr-npu-wan-upstream"), h = p("fttr-npu-wan-downstream"), g = p("fttr-npu-onu-bridge"), m = o("p", {
            "aria-live": "polite",
            children: _("Loading\u2026")
        }), b = o("div", {}), v = o("button", {
            type: "button",
            class: "cbi-button cbi-button-apply",
            disabled: !0,
            children: _("Save NPU configuration")
        }), y = o("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            children: _("Refresh")
        }), w = ()=>{
            let e = a || !L.hasViewPermission() || !r?.supported || !0 !== r.config_valid || !d || Date.now() - d > 12000;
            l.disabled = c.disabled = v.disabled = e, f.disabled = h.disabled = g.disabled = e, y.disabled = a || !!n;
        }, k = async ()=>{
            if (n || a) return n;
            let e = s;
            return n = (async ()=>{
                try {
                    let t, n = await Promise.race([
                        rz(),
                        new Promise((e, r)=>{
                            t = setTimeout(()=>r(Error(_("NPU status request timed out"))), 10000);
                        })
                    ]).finally(()=>clearTimeout(t));
                    if (e !== s || a) return;
                    r = n, d = Date.now(), !i && n.config_valid && (l.checked = n.bridge_offload_enabled, c.value = n.bridge, f.checked = n.wan_upstream, h.checked = n.wan_downstream, g.checked = n.onu_bridge), b.replaceChildren(function(e) {
                        var t, r, n, a, i, s, d, l, c, u, p, f, h, g, m, b, v, y, w, k, z, x, j;
                        if (!e.supported) return t = {
                            class: "cbi-section",
                            children: _("NPU hardware acceleration is not compiled or unsupported on this target.")
                        }, o("div", t);
                        let S = e.wan_upstream || e.wan_downstream, P = S ? e.routed_offload_mask : e.bridge_offload_mask, N = S ? e.routed_mask_valid : e.mask_valid;
                        return j = {
                            children: [
                                void 0 === e.sampled_at_ms ? (r = {
                                    class: "alert-message warning",
                                    children: _("Backend reliability metadata is unavailable. Update fttrctl before trusting these readings.")
                                }, o("p", r)) : null,
                                e.errors?.length ? (i = {
                                    class: "alert-message warning",
                                    children: [
                                        (n = {
                                            children: _("Some data sources are unavailable")
                                        }, o("strong", n)),
                                        (a = {
                                            children: e.errors.map((e)=>{
                                                var t;
                                                return t = {
                                                    children: e
                                                }, o("li", t);
                                            })
                                        }, o("ul", a))
                                    ]
                                }, o("div", i)) : null,
                                (h = {
                                    class: "fttr-npu-grid",
                                    children: [
                                        (l = {
                                            class: "cbi-section",
                                            children: [
                                                (s = {
                                                    children: _("Engine and admission status")
                                                }, o("h3", s)),
                                                rP(_("Saved configuration"), rE(e.bridge_offload_enabled, e.config_valid, _("Enabled"), _("Disabled"))),
                                                rP(_("NPU engine"), rE(e.engine_attached, e.engine_valid, _("Attached"), _("Detached"))),
                                                rP(_("Port admission"), rE(0 !== P, N, _("Admitted"), _("Not admitted"))),
                                                rP(_("Configured mode"), S ? _("WAN routed offload") : _("ONU bridge offload")),
                                                rP(_("Managed bridge"), e.config_valid ? e.bridge : "\u2014"),
                                                rP(_("Bridge offload mask"), rS(e.bridge_offload_mask, e.mask_valid)),
                                                rP(_("Admitted ports"), N ? e.active_ports.join(", ") || _("None") : "\u2014"),
                                                rP(_("Firewall hooks"), rE(e.fw4_hooks_ready, e.hooks_valid, _("Ready"), _("Not ready"))),
                                                rP(_("Routed offload mask"), rS(e.routed_offload_mask, e.routed_mask_valid)),
                                                rP(_("Driver debug logging"), rE(e.bridge_offload_debug, e.debug_valid, _("Enabled"), _("Disabled"))),
                                                (d = {
                                                    class: "fttr-npu-note",
                                                    children: _("Admission allows eligible traffic to bind; it does not prove that packets are currently hardware-forwarded. The switch controls FTTR bridge and WAN admission, not the entire NPU or firewall offloading for other interfaces.")
                                                }, o("p", d))
                                            ]
                                        }, o("div", l)),
                                        (f = {
                                            class: "cbi-section",
                                            children: [
                                                (c = {
                                                    children: _("PPE flow snapshot")
                                                }, o("h3", c)),
                                                rP(_("Bound hardware flows"), e.flows_valid ? e.bound_entries : "\u2014"),
                                                rP(_("Current non-empty FOE entries"), e.entries_valid ? e.total_entries : "\u2014"),
                                                rP(_("Current bound-flow packets"), rj(e.total_packets_exact, e.counters_valid)),
                                                rP(_("Current bound-flow bytes"), rj(e.total_bytes_exact, e.counters_valid)),
                                                (u = {
                                                    class: "fttr-npu-note",
                                                    children: _("Source: PPE debugfs bind/entries and driver sysfs. These are global PPE snapshots, not FTTR-only totals or table capacity. Reads are sequential, not atomic.")
                                                }, o("p", u)),
                                                (p = {
                                                    class: "fttr-npu-note",
                                                    children: _("Counters cover only currently bound flows and may decrease when flows expire. Driver-exported zeroes are not proof of no traffic. AN7581 native L2B counters are unavailable; \u2014 means unavailable, not zero.")
                                                }, o("p", p))
                                            ]
                                        }, o("div", f))
                                    ]
                                }, o("div", h)),
                                (x = {
                                    class: "cbi-section",
                                    children: [
                                        (g = {
                                            children: _("Active hardware offload flows (PPE FOE Bound)")
                                        }, o("h3", g)),
                                        e.flows_valid ? 0 === e.bound_flows.length ? (m = {
                                            children: _("No bound hardware flows in this snapshot.")
                                        }, o("p", m)) : (k = {
                                            style: "overflow-x:auto",
                                            children: (w = {
                                                class: "table fttr-npu-flows",
                                                children: [
                                                    (v = {
                                                        children: (b = {
                                                            children: [
                                                                _("Index"),
                                                                _("Type"),
                                                                _("Original endpoints"),
                                                                _("Translated endpoints"),
                                                                _("Ethernet / MAC"),
                                                                _("VLAN"),
                                                                _("Packets"),
                                                                _("Bytes")
                                                            ].map((e)=>{
                                                                var t;
                                                                return t = {
                                                                    children: e
                                                                }, o("th", t);
                                                            })
                                                        }, o("tr", b))
                                                    }, o("thead", v)),
                                                    (y = {
                                                        children: e.bound_flows.map((t)=>{
                                                            var r, n, a, i, s, d, l, c, u, p, f, h, g;
                                                            return g = {
                                                                children: [
                                                                    (n = {
                                                                        children: (r = {
                                                                            children: t.index
                                                                        }, o("code", r))
                                                                    }, o("td", n)),
                                                                    (a = {
                                                                        children: t.pkt_type
                                                                    }, o("td", a)),
                                                                    (s = {
                                                                        children: (i = {
                                                                            children: t.orig_tuple || "\u2014"
                                                                        }, o("code", i))
                                                                    }, o("td", s)),
                                                                    (l = {
                                                                        children: (d = {
                                                                            children: t.new_tuple || "\u2014"
                                                                        }, o("code", d))
                                                                    }, o("td", l)),
                                                                    (u = {
                                                                        children: (c = {
                                                                            children: t.eth || "\u2014"
                                                                        }, o("code", c))
                                                                    }, o("td", u)),
                                                                    (p = {
                                                                        children: t.vlan || "\u2014"
                                                                    }, o("td", p)),
                                                                    (f = {
                                                                        children: rj(t.packets_exact, t.counters_valid && e.engine_valid && e.engine_attached)
                                                                    }, o("td", f)),
                                                                    (h = {
                                                                        children: rj(t.bytes_exact, t.counters_valid && e.engine_valid && e.engine_attached)
                                                                    }, o("td", h))
                                                                ]
                                                            }, o("tr", g);
                                                        })
                                                    }, o("tbody", y))
                                                ]
                                            }, o("table", w))
                                        }, o("div", k)) : (z = {
                                            children: _("Flow table is unavailable. A failed read must not be interpreted as an empty table.")
                                        }, o("p", z))
                                    ]
                                }, o("div", x))
                            ]
                        }, o("div", j);
                    }(n)), m.textContent = `${_("Last successful sample")}: ${n.sampled_at_ms ? new Date(n.sampled_at_ms).toLocaleString() : _("Unknown")} \xb7 ${_("Refresh interval: 3 seconds")}`;
                } catch (t) {
                    if (e !== s || a) return;
                    d = 0, b.replaceChildren(o("p", {
                        class: "alert-message warning",
                        children: _("Live NPU data is unavailable. Previous readings are stale.")
                    })), m.textContent = `${_("Refresh failed")}: ${String(t)}`;
                } finally{
                    n = void 0, w();
                }
            })(), w(), n;
        };
        y.onclick = ()=>{
            k();
        }, v.onclick = async ()=>{
            if (v.disabled || a) return;
            let e = c.value.trim(), t = l.checked, o = f.checked, p = h.checked, m = g.checked, b = !1;
            if (t && m && (o || p)) {
                u.textContent = _("WAN and ONU bridge offload cannot be enabled together. Disable ONU bridge offload before enabling WAN directions.");
                return;
            }
            if (!/^[a-zA-Z0-9_.-]{1,15}$/.test(e)) {
                u.textContent = _("Use a bridge interface name of 1\u201315 letters, digits, dots, underscores or hyphens.");
                return;
            }
            a = !0, s++, w(), u.textContent = _("Saving\u2026");
            try {
                let r = await rx({
                    enabled: t,
                    bridge: e,
                    wan_upstream: o,
                    wan_downstream: p,
                    onu_bridge: m
                });
                if ("success" !== r.status) throw Error(r.error || _("Failed to save NPU configuration"));
                i = !1, b = !0, u.textContent = _("Configuration saved. Waiting for driver admission readback; enabling may take several seconds and requires eligible ports and firewall policy.");
            } catch (e) {
                u.textContent = `${_("NPU configuration failed")}: ${String(e)}`;
            } finally{
                await n, a = !1, await k(), !b || d && r?.config_valid && r.bridge === e && r.bridge_offload_enabled === t && r.wan_upstream === o && r.wan_downstream === p && r.onu_bridge === m || (u.textContent = _("Save returned success, but configuration readback could not be confirmed. Refresh before retrying.")), w();
            }
        };
        let z = (t = {
            class: "cbi-map fttr-npu",
            children: [
                o("style", {
                    children: ".fttr-npu-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px}.fttr-npu-row{display:flex;justify-content:space-between;gap:16px;padding:7px 0;border-bottom:1px dashed #8884}.fttr-npu-row strong{text-align:right;overflow-wrap:anywhere}.fttr-npu-note{opacity:.75;font-size:90%;line-height:1.5}.fttr-npu-state{padding:2px 6px;border:1px solid #8886;border-radius:4px}.fttr-npu-state.ready{color:#2b8;border-color:#2b86}.fttr-npu-state.pending{color:#d90;border-color:#d906}.fttr-npu label{display:inline-flex;gap:8px;align-items:center;margin:8px 20px 8px 0}.fttr-npu-flows{font-size:85%}.fttr-npu-flows td{overflow-wrap:anywhere}"
                }),
                o("h2", {
                    children: _("NPU hardware acceleration")
                }),
                (e = {
                    class: "cbi-section",
                    children: [
                        o("h3", {
                            children: _("NPU configuration")
                        }),
                        o("label", {
                            htmlFor: "fttr-npu-enabled",
                            children: [
                                l,
                                _("Enable FTTR hardware offload")
                            ]
                        }),
                        o("label", {
                            htmlFor: "fttr-npu-bridge",
                            children: [
                                _("Bridge interface"),
                                c
                            ]
                        }),
                        o("label", {
                            htmlFor: "fttr-npu-wan-upstream",
                            children: [
                                f,
                                _("Enable WAN upstream offload (experimental)")
                            ]
                        }),
                        o("label", {
                            htmlFor: "fttr-npu-wan-downstream",
                            children: [
                                h,
                                _("Enable WAN downstream offload (experimental)")
                            ]
                        }),
                        o("label", {
                            htmlFor: "fttr-npu-onu-bridge",
                            children: [
                                g,
                                _("Enable ONU bridge offload")
                            ]
                        }),
                        o("p", {
                            class: "fttr-npu-note",
                            children: _("WAN and ONU bridge offload use exclusive port modes. Disable ONU bridge offload before enabling either WAN direction.")
                        }),
                        o("p", {
                            class: "fttr-npu-note",
                            children: _("WAN directions require software and hardware flow offloading in the firewall settings. Saving here does not change those global settings.")
                        }),
                        o("div", {
                            children: [
                                v,
                                " ",
                                y
                            ]
                        }),
                        u
                    ]
                }, o("div", e)),
                m,
                b
            ]
        }, o("div", t));
        return k(), L.Poll.add(async ()=>{
            z.isConnected && (d && Date.now() - d > 12000 && (d = 0, b.replaceChildren(o("p", {
                class: "alert-message warning",
                children: _("Live NPU data is unavailable. Previous readings are stale.")
            })), w()), await k());
        }, 3), z;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;