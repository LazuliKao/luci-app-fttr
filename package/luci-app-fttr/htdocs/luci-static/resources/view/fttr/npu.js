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
function l(e, t, r) {
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
function v(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function b(e) {
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
function j(e, t, r) {
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = z(e.inst?._zod.def?.error?.(e)) ?? z(t?.error?.(e)) ?? z(r.customError?.(e)) ?? z(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
}
const x = (e, t)=>{
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
}, S = l("$ZodError", x), P = l("$ZodError", x, {
    Parent: Error
}), $ = (r = P, (e, t, n, a)=>{
    let i = n ? Object.assign(n, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (s instanceof Promise) throw new d();
    if (s.issues.length) {
        let e = new (a?.Err ?? r)(s.issues.map((e)=>j(e, i, u())));
        throw m(e, a?.callee), e;
    }
    return s.value;
}), O = (n = P, async (e, t, r, a)=>{
    let i = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (a?.Err ?? n)(s.issues.map((e)=>j(e, i, u())));
        throw m(e, a?.callee), e;
    }
    return s.value;
}), A = (a = P, (e, t, r)=>{
    let n = r ? {
        ...r,
        async: !1
    } : {
        async: !1
    }, i = e._zod.run({
        value: t,
        issues: []
    }, n);
    if (i instanceof Promise) throw new d();
    return i.issues.length ? {
        success: !1,
        error: new (a ?? S)(i.issues.map((e)=>j(e, n, u())))
    } : {
        success: !0,
        data: i.value
    };
}), C = (i = P, async (e, t, r)=>{
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
        error: new i(a.issues.map((e)=>j(e, n, u())))
    } : {
        success: !0,
        data: a.value
    };
}), N = /^-?\d+(?:\.\d+)?$/, R = /^(?:true|false)$/i, T = /^null$/i, Z = {
    major: 4,
    minor: 3,
    patch: 6
}, U = l("$ZodType", (e, t)=>{
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
                if (s instanceof Promise && r?.async === !1) throw new d();
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
                if (!1 === i.async) throw new d();
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
                if (!1 === i.async) throw new d();
                return s.then((e)=>t(e, n, i));
            }
            return t(s, n, i);
        };
    }
    g(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = A(e, t);
                    return r.success ? {
                        value: r.data
                    } : {
                        issues: r.error?.issues
                    };
                } catch (r) {
                    return C(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), M = l("$ZodString", (e, t)=>{
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
}), q = l("$ZodNumber", (e, t)=>{
    U.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? N, e._zod.parse = (r, n)=>{
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
}), D = l("$ZodBoolean", (e, t)=>{
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
}), F = l("$ZodNull", (e, t)=>{
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
}), B = l("$ZodUnknown", (e, t)=>{
    U.init(e, t), e._zod.parse = (e)=>e;
});
function I(e, t, r) {
    e.issues.length && t.issues.push(...k(r, e.issues)), t.value[r] = e.value;
}
const W = l("$ZodArray", (e, t)=>{
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
            o instanceof Promise ? i.push(o.then((t)=>I(t, r, e))) : I(o, r, e);
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
const K = l("$ZodObject", (e, t)=>{
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
        if (!v(a)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: a,
            inst: e
        }), t;
        t.value = {};
        let o = [], l = n.shape;
        for (let e of n.keys){
            let n = l[e], i = "optional" === n._zod.optout, s = n._zod.run({
                value: a[e],
                issues: []
            }, r);
            s instanceof Promise ? o.push(s.then((r)=>J(r, t, e, a, i))) : J(s, t, e, a, i);
        }
        return s ? function(e, t, r, n, a, i) {
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
        errors: e.map((e)=>e.issues.map((e)=>j(e, n, u())))
    }), t);
}
const X = l("$ZodUnion", (e, t)=>{
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
}), G = l("$ZodRecord", (e, t)=>{
    U.init(e, t), e._zod.parse = (r, n)=>{
        let a = r.value;
        if (!function(e) {
            if (!1 === v(e)) return !1;
            let t = e.constructor;
            if (void 0 === t || "function" != typeof t) return !0;
            let r = t.prototype;
            return !1 !== v(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
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
            let l = new Set();
            for (let e of s)if ("string" == typeof e || "number" == typeof e || "symbol" == typeof e) {
                l.add("number" == typeof e ? e.toString() : e);
                let s = t.valueType._zod.run({
                    value: a[e],
                    issues: []
                }, n);
                s instanceof Promise ? i.push(s.then((t)=>{
                    t.issues.length && r.issues.push(...k(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...k(e, s.issues)), r.value[e] = s.value);
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
            if ("string" == typeof s && N.test(s) && o.issues.length) {
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
                    issues: o.issues.map((e)=>j(e, n, u())),
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
                e.issues.length && r.issues.push(...k(s, e.issues)), r.value[o.value] = e.value;
            })) : (l.issues.length && r.issues.push(...k(s, l.issues)), r.value[o.value] = l.value);
        }
        return i.length ? Promise.all(i).then(()=>r) : r;
    };
}), H = l("$ZodLiteral", (e, t)=>{
    if (U.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? b(e) : e ? b(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (n, a)=>{
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
const Y = l("$ZodOptional", (e, t)=>{
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
const ee = l("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    U.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>$(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>A(e, t, r), e.parseAsync = async (t, r)=>O(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>C(e, t, r), e.check = (...r)=>e.clone({
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
}), et = l("ZodMiniString", (e, t)=>{
    M.init(e, t), ee.init(e, t);
});
function er(e) {
    return new et({
        type: "string",
        ...y(e)
    });
}
const en = l("ZodMiniNumber", (e, t)=>{
    q.init(e, t), ee.init(e, t);
});
function ea(e) {
    return new en({
        type: "number",
        checks: [],
        ...y(e)
    });
}
const ei = l("ZodMiniBoolean", (e, t)=>{
    D.init(e, t), ee.init(e, t);
});
function es(e) {
    return new ei({
        type: "boolean",
        ...y(e)
    });
}
const eo = l("ZodMiniNull", (e, t)=>{
    F.init(e, t), ee.init(e, t);
});
function el(e) {
    return new eo({
        type: "null",
        ...y(e)
    });
}
const ed = l("ZodMiniUnknown", (e, t)=>{
    B.init(e, t), ee.init(e, t);
}), ec = l("ZodMiniArray", (e, t)=>{
    W.init(e, t), ee.init(e, t);
});
function eu(e, t) {
    return new ec({
        type: "array",
        element: e,
        ...y(t)
    });
}
const ep = l("ZodMiniObject", (e, t)=>{
    K.init(e, t), ee.init(e, t), g(e, "shape", ()=>t.shape);
});
function e_(e, t) {
    return new ep({
        type: "object",
        shape: e ?? {},
        ...y(t)
    });
}
const ef = l("ZodMiniUnion", (e, t)=>{
    X.init(e, t), ee.init(e, t);
});
function eh(e, t) {
    return new ef({
        type: "union",
        options: e,
        ...y(t)
    });
}
const eg = l("ZodMiniRecord", (e, t)=>{
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
const ev = l("ZodMiniLiteral", (e, t)=>{
    H.init(e, t), ee.init(e, t);
});
function eb(e, t) {
    return new ev({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...y(t)
    });
}
const ey = l("ZodMiniOptional", (e, t)=>{
    Y.init(e, t), ee.init(e, t);
});
function ew(e) {
    return new ey({
        type: "optional",
        innerType: e
    });
}
const ek = eh([
    eb("account_set_password"),
    eb("account_set_active")
]), ez = eh([
    eb("waiting_transport"),
    eb("waiting_identity"),
    eb("reading"),
    eb("configuring"),
    eb("verifying"),
    eb("waiting_inform"),
    eb("ready"),
    eb("retry_wait"),
    eb("manual_required"),
    eb("not_configured"),
    eb("waiting_acs"),
    eb("awaiting_apply"),
    eb("discovering_management_wan"),
    eb("configuring_management_wan"),
    eb("verifying_management_wan")
]), ej = e_({
    enabled: es(),
    listen: eh([
        er(),
        el()
    ]),
    path: eh([
        er(),
        el()
    ]),
    error: eh([
        er(),
        el()
    ])
}), ex = e_({
    vlan: ea(),
    vlans: eu(ea()),
    priority: ea(),
    acs_url: er()
}), eS = e_({
    state: ez,
    optical_sn: er(),
    cwmp_id: er(),
    mqtt_target: eh([
        er(),
        el()
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
    expected_acs_url: er(),
    last_error: eh([
        er(),
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
        er(),
        el()
    ]),
    link_identity_error: eh([
        er(),
        el()
    ]),
    listener: ej,
    mqtt_last_seen: eh([
        ea(),
        el()
    ]),
    desired: ew(ex),
    endpoint_notice: ew(er()),
    manual_steps: ew(eu(er()))
}), eP = eh([
    eb("pending"),
    eb("unavailable")
]), eE = eh([
    eS,
    e_({
        state: eP,
        reason: er()
    })
]), e$ = e_({
    id: er(),
    name: er()
}), eO = e_({
    configured: er(),
    effective: er(),
    available: eu(er()),
    reason: er()
}), eA = e_({
    phase: eh([
        eb("not_started"),
        eb("collecting_identity"),
        eb("retrying_identity"),
        eb("unsupported"),
        eb("configuring"),
        eb("verifying"),
        eb("wan_bootstrap_pending"),
        eb("verified"),
        eb("retrying"),
        eb("offline")
    ]),
    generation: ea(),
    error: eh([
        er(),
        el()
    ])
});
e_({
    success: es(),
    output: ew(er()),
    error: ew(er())
});
const eC = eh([
    eb("factory"),
    eb("firmware"),
    eb("builtin")
]), eN = e_({
    detected: es(),
    device: er(),
    has_data: es(),
    sha256: er(),
    data: er()
}), eR = e_({
    exists: es(),
    path: er(),
    size: ea(),
    sha256: er(),
    data: er()
}), eT = e_({
    source: eC,
    active_path: er(),
    size: ea(),
    sha256: er(),
    data: er(),
    factory: eN,
    firmware: eR
}), eZ = e_({
    error: er()
});
eh([
    eT,
    eZ
]);
const eU = e_({
    success: es(),
    path: er(),
    size: ea(),
    sha256: er()
});
eh([
    eU,
    eZ
]), e_({
    data: er()
});
const eM = e_({
    acs: es(),
    mqtt: es(),
    npu: es(),
    "device-hl202": es(),
    "device-hwtc": es(),
    "device-star": es(),
    "device-zte": es()
}), eq = e_({
    optical: es(),
    bridge_offload: es(),
    omci_mib: es(),
    mqtt_telemetry: es(),
    hl202_management: es(),
    cwmp: es(),
    command_provisioning: es()
}), eL = e_({
    status: es(),
    config: es(),
    sync: es(),
    hardware: es(),
    calibration: es(),
    hl202: es(),
    about: es()
}), eD = e_({
    schema_version: eb(1),
    version: er(),
    features: eM,
    functions: eq,
    pages: eL,
    adapters: eu(e$)
}), eF = eh([
    e_({
        valid: eb(!0),
        revision: er(),
        devices: ea()
    }),
    e_({
        error: er()
    })
]), eB = eh([
    eb("auto"),
    eb("manual")
]), eI = eb("diff"), eW = e_({
    state: er(),
    enabled: es(),
    reason: ew(eh([
        er(),
        el()
    ])),
    revision: ew(er()),
    vlan: ew(ea()),
    updated_at: ew(ea())
}), eJ = eh([
    eb("online"),
    eb("waiting_inform"),
    eb("offline_or_stale"),
    eb("waiting_transport")
]), eK = e_({
    cwmp_id: er(),
    state: eJ,
    optical_online: es(),
    last_inform: eh([
        ea(),
        el()
    ]),
    age_seconds: eh([
        ea(),
        el()
    ])
}), eV = eh([
    eb("waiting"),
    eb("wan_reconciling"),
    eb("wan_verifying"),
    eb("wifi_reconciling"),
    eb("discovering"),
    eb("reading"),
    eb("disabling"),
    eb("disabling_read"),
    eb("writing"),
    eb("verifying"),
    eb("settling"),
    eb("completed"),
    eb("not_started"),
    eb("reset_pending"),
    eb("interrupted"),
    eb("recovering"),
    eb("waiting_management"),
    eb("waiting_task")
]), eX = eh([
    eb("device_service"),
    eb("ssid"),
    eb("port_binding"),
    eb("wan_activation")
]), eG = e_({
    name: er(),
    desired: er()
}), eH = e_({
    id: er(),
    name: ew(eh([
        er(),
        el()
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
        el()
    ])),
    updated_at: ew(ea()),
    changes: ew(eu(eG))
}), eQ = eh([
    eb("plan"),
    eb("apply")
]), eY = e_({
    wan: er(),
    wlan: er(),
    binding: er()
}), e0 = e_({
    state: er(),
    requested: er(),
    contract: eh([
        er(),
        el()
    ]),
    reason: er(),
    cache_hit: es(),
    schema: er(),
    capabilities: eh([
        eY,
        el()
    ])
}), e1 = e_({
    parent: ea(),
    connection: ea(),
    state: er(),
    service_list: er(),
    kind: er(),
    baseline: eh([
        eu(ea()),
        el()
    ])
}), e2 = e_({
    state: er(),
    reason: ew(er()),
    task_id: ew(eh([
        ea(),
        el()
    ])),
    instance: ew(ea()),
    cwmp_id: ew(er())
}), e5 = eh([
    eb("waiting"),
    eb("inventory"),
    eb("classifying"),
    eb("adding_parent"),
    eb("child_names"),
    eb("adding_child"),
    eb("delete_guard"),
    eb("deleting"),
    eb("verify_delete"),
    eb("empty_parent"),
    eb("deleting_parent"),
    eb("verify_parent_delete"),
    eb("next"),
    eb("done")
]), e6 = e_({
    owned: eu(ea()),
    pending: eh([
        er(),
        el()
    ]),
    pending_instance: eh([
        ea(),
        el()
    ])
}), e8 = eh([
    eb("waiting"),
    eb("inventory"),
    eb("adding"),
    eb("verify_add"),
    eb("deleting"),
    eb("verify_delete"),
    eb("reading_disable"),
    eb("disabling"),
    eb("verifying_disable"),
    eb("next"),
    eb("done")
]), e3 = eh([
    eb("disable"),
    eb("preserve"),
    eb("delete")
]), e4 = e_({
    parent: ea(),
    child: ea(),
    service: er(),
    vlan: er()
}), e9 = e_({
    state: eV,
    items: eu(eH),
    backend: ew(eO),
    operation_id: ew(ea()),
    device: ew(er()),
    optical_sn: ew(er()),
    cwmp_id: ew(er()),
    revision: ew(er()),
    mode: ew(eQ),
    started_at: ew(ea()),
    completed_at: ew(eh([
        ea(),
        el()
    ])),
    current_revision: ew(es()),
    management_fresh: ew(es()),
    reason: ew(er()),
    error: ew(er()),
    attempts: ew(ea()),
    next_retry_at: ew(ea()),
    reconcile_reason: ew(er()),
    cwmp_contract: ew(e0),
    wan_objects: ew(em(er(), e1)),
    wan_lifecycle: ew(em(er(), e2)),
    wan_stage: ew(e5),
    wifi_objects: ew(e6),
    wifi_lifecycle: ew(em(er(), e2)),
    wifi_stage: ew(e8),
    wifi_cleanup: ew(e3),
    native_ownership: ew(em(er(), e4)),
    write_performed: ew(es()),
    readback_verified: ew(es())
}), e7 = eh([
    eb("not_configured"),
    eb("stale_revision"),
    eb("stale_management"),
    eb("verified"),
    eb("attention_required"),
    eb("accepted_unverified"),
    eb("pending"),
    eb("recovering"),
    eb("waiting_management")
]), te = e_({
    device: er(),
    name: eh([
        er(),
        el()
    ]),
    group: eh([
        er(),
        el()
    ]),
    group_name: eh([
        er(),
        el()
    ]),
    template: eh([
        er(),
        el()
    ]),
    template_name: eh([
        er(),
        el()
    ]),
    optical_sn: er(),
    adapter: er(),
    omci_management: eW,
    management: eh([
        eK,
        el()
    ]),
    acs_bootstrap: eE,
    provisioning: e9,
    services: eu(eH),
    ssids: eu(eH),
    wifi_sync: e7
}), tt = eh([
    eb("discovering"),
    eb("comparing"),
    eb("planning"),
    eb("applying"),
    eb("verifying"),
    eb("configuring_listener"),
    eb("cleaning_previous"),
    eb("waiting_devices"),
    eb("ready"),
    eb("awaiting_apply"),
    eb("verified"),
    eb("blocked"),
    eb("retry_wait")
]), tr = e_({
    enabled: es(),
    mode: eB,
    vlan: eu(ea()),
    priority: ea(),
    address: er(),
    acs_url: er(),
    port: ea(),
    path: er(),
    dhcp_enabled: es()
}), tn = e_({
    operation: er(),
    key: er(),
    value: eu(er())
}), ta = e_({
    state: tt,
    error: eh([
        er(),
        el()
    ]),
    inflight: es(),
    ready: es(),
    desired_version: eh([
        er(),
        el()
    ]),
    applied_version: eh([
        er(),
        el()
    ]),
    next_retry_at: ea(),
    attempts: ea(),
    desired: eh([
        tr,
        el()
    ]),
    applied: eh([
        tr,
        el()
    ]),
    previous: eh([
        tr,
        el()
    ]),
    plan: eu(tn)
}), ti = e_({
    desired: eh([
        ex,
        el()
    ]),
    state: er()
}), ts = e_({
    id: er(),
    name: eh([
        er(),
        el()
    ]),
    template: er()
}), to = e_({
    enabled: es(),
    mode: eB,
    method: eI,
    revision: er(),
    triggers: eu(er()),
    interval_minutes: ea(),
    error: eh([
        er(),
        el()
    ]),
    devices: eu(te),
    management_network: ta,
    omci_management: ti,
    groups: eu(ts),
    pending_devices: eu(er()),
    onu_pins: ew(em(er(), ea())),
    config_error: ew(eh([
        er(),
        el()
    ]))
});
eh([
    to,
    eZ
]);
const tl = e_({
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
}), td = e_({
    entity_id: ea(),
    port_id: eh([
        ea(),
        el()
    ])
}), tc = e_({
    entity_id: ea(),
    filter_list_hex: eh([
        er(),
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
}), tu = e_({
    entity_id: ea(),
    received_frame_rules_hex: eh([
        eu(er()),
        el()
    ]),
    error: eh([
        er(),
        el()
    ])
}), tp = e_({
    age_seconds: ea(),
    gem_ports: eu(td),
    vlan_filters: eu(tc),
    vlan_operations: eu(tu)
}), t_ = e_({
    source: er(),
    unit: er(),
    reason: eh([
        er(),
        el()
    ]),
    raw: eh([
        er(),
        el()
    ]),
    age_seconds: eh([
        ea(),
        el()
    ])
}), tf = e_({
    interface: er(),
    gem_ports: eh([
        eu(ea()),
        el()
    ]),
    vlan_id: eh([
        ea(),
        el()
    ]),
    onu_inventory: eh([
        tp,
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
    offload: tl,
    measurements: em(er(), t_)
});
e_({});
const th = e_({
    entry: eh([
        eb(0),
        eb(1),
        eb(2)
    ]),
    username: er(),
    active: es()
}), tg = e_({
    mqtt_mac: er(),
    optical_sn: eh([
        er(),
        el()
    ]),
    onu_id: eh([
        ea(),
        el()
    ]),
    binding_generation: er(),
    last_seen: ea(),
    reason: er()
}), tm = eh([
    eb("executed"),
    eb("dispatched"),
    eb("timeout"),
    eb("error")
]), tv = e_({
    target: er(),
    status: tm,
    request_id: ew(er()),
    exit_code: ew(ea()),
    output: ew(er()),
    output_truncated: es(),
    error: ew(er())
}), tb = e_({
    target: tg,
    result: tv,
    binding_current: es()
}), ty = eh([
    eb("not_applicable"),
    eb("accepted_and_saved"),
    eb("unconfirmed")
]), tw = e_({
    code: er(),
    message: er()
});
eh([
    e_({
        schema_version: eb(1),
        operation: tb,
        accounts: eh([
            eu(th),
            el()
        ]),
        write_status: ty
    }),
    e_({
        schema_version: ea(),
        error: tw
    })
]);
const tk = eh([
    e_({
        optical_sn: er(),
        onu_id: ea(),
        binding_generation: er()
    }),
    e_({
        mqtt_mac: er(),
        binding_generation: er()
    })
]);
e_({
    target: tk
});
const tz = e_({
    optical_sn: er(),
    onu_id: ea(),
    model: er(),
    optical_online: es(),
    can_execute: es(),
    mqtt: eh([
        tg,
        el()
    ]),
    report_revision: eh([
        ea(),
        el()
    ])
});
eh([
    e_({
        schema_version: eb(1),
        operation: tb
    }),
    e_({
        schema_version: ea(),
        error: tw
    })
]), e_({
    target: tk,
    script: er(),
    timeout_seconds: ea()
});
const tj = eh([
    e_({
        schema_version: eb(1),
        devices: eu(tz),
        sources: eu(tg)
    }),
    e_({
        schema_version: ea(),
        error: tw
    })
]), tx = eh([
    eb("received"),
    eb("report_unavailable")
]), tS = e_({
    value: new ed({
        type: "unknown"
    }),
    member: er(),
    unit: eh([
        er(),
        el()
    ])
}), tP = e_({
    name: er(),
    bytes: ea(),
    encoding: er(),
    text: eh([
        er(),
        el()
    ]),
    text_omitted: es()
}), tE = e_({
    schema_version: ea(),
    compressed_bytes: ea(),
    decompressed_bytes: ea(),
    fields: em(er(), tS),
    members: eu(tP),
    errors: eu(er())
}), t$ = e_({
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
        er(),
        el()
    ]),
    report: eh([
        tE,
        el()
    ])
});
eh([
    e_({
        schema_version: eb(1),
        target: tg,
        report: eh([
            t$,
            el()
        ]),
        state: tx
    }),
    e_({
        schema_version: eb(1),
        target: tg,
        report: eh([
            t$,
            el()
        ]),
        read_only: eb(!0)
    }),
    e_({
        schema_version: ea(),
        error: tw
    })
]), e_({
    target: tk
}), e_({
    target: tk,
    kind: ek,
    entry: ea(),
    password: er(),
    active: es()
});
const tO = e_({
    accepted: ea(),
    rejected: ea(),
    read_errors: ea(),
    handled: ea(),
    max_intake_us: ea(),
    max_handler_us: ea()
}), tA = eb("pending"), tC = e_({
    phase: eh([
        eb("starting"),
        eb("upload"),
        eb("tables")
    ]),
    received: ea(),
    expected: eh([
        ea(),
        el()
    ])
}), tN = eb("ready"), tR = eh([
    e_({
        status: tA,
        progress: ew(tC)
    }),
    e_({
        status: tN,
        chunk: ea(),
        chunks: ea(),
        bytes: ea(),
        data: er()
    })
]);
eh([
    tR,
    eZ
]);
const tT = e_({
    status: tA,
    job: er()
}), tZ = e_({
    released: es()
});
e_({
    job: er()
}), e_({
    job: er(),
    chunk: ea()
}), eh([
    tT,
    eZ
]);
const tU = e_({
    accepting: es(),
    running: ea(),
    stored: ea(),
    bytes: ea(),
    running_limit: ea(),
    stored_limit: ea(),
    bytes_limit: ea(),
    result_bytes_limit: ea()
}), tM = e_({
    mac: er(),
    ip: er(),
    band: er(),
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
}), tq = eh([
    eb("unknown"),
    eb("octets"),
    eb("string"),
    eb("unsigned_integer"),
    eb("table"),
    eb("signed_integer"),
    eb("pointer"),
    eb("bit_field"),
    eb("enumeration"),
    eb("counter")
]), tL = e_({
    id: er(),
    url: er()
}), tD = e_({
    name: er(),
    kind: tq,
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
        el()
    ]),
    reference: tL
}), tF = eh([
    e_({
        type: eb("unsigned"),
        value: ea()
    }),
    e_({
        type: eb("signed"),
        value: ea()
    }),
    e_({
        type: eb("decimal"),
        value: er()
    }),
    e_({
        type: eb("text"),
        value: eh([
            er(),
            el()
        ])
    }),
    e_({
        type: eb("octets"),
        hex: er()
    }),
    e_({
        type: eb("table_length"),
        bytes: ea()
    })
]), tB = e_({
    raw_hex: er(),
    value: tF,
    sequences: eu(ea())
}), tI = e_({
    definition: tD,
    value: eh([
        tF,
        el()
    ]),
    observations: eu(tB)
}), tW = eh([
    eb("layout"),
    eb("name_only"),
    eb("unknown")
]), tJ = e_({
    class_id: ea(),
    name: eh([
        er(),
        el()
    ]),
    entities: ea(),
    records: ea(),
    support: tW
}), tK = e_({
    code: er(),
    message: er(),
    offset: ea(),
    mask: ea()
}), tV = e_({
    class_id: ea(),
    entity_id: ea(),
    name: eh([
        er(),
        el()
    ]),
    support: tW,
    reference: eh([
        tL,
        el()
    ]),
    sequences: eu(ea()),
    attributes: eu(tI),
    diagnostics: eu(tK)
}), tX = eb("ready"), tG = e_({
    class_id: ea(),
    entity_id: ea(),
    sequence: ea(),
    attribute_mask: ea(),
    raw_hex: er(),
    consumed: ea(),
    remaining_hex: er(),
    undecoded_mask: ea()
}), tH = e_({
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
}), tQ = e_({
    class_id: ea(),
    entity_id: ea(),
    attribute: tD,
    collected: es(),
    error: eh([
        er(),
        el()
    ]),
    raw_hex: er(),
    rows: eu(er()),
    vlan_rules: eu(tH)
}), tY = e_({
    schema_version: eb(1),
    reference_version: er(),
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
    classes: eu(tJ),
    entities: eu(tV),
    records: eu(tG),
    tables: eu(tQ),
    diagnostics: eu(tK)
});
e_({
    status: tX,
    report: tY
}), e_({
    onu_id: ea(),
    optical_sn: er(),
    tables: es()
});
const t0 = eh([
    e_({
        status: eb("success"),
        enabled: es()
    }),
    e_({
        status: eb("error"),
        error: er()
    })
]);
e_({
    enabled: es(),
    bridge: er()
});
const t1 = e_({
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
}), t2 = e_({
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
    bound_flows: eu(t1)
}), t5 = e_({
    equipment_id: eh([
        er(),
        el()
    ]),
    hardware_version: eh([
        er(),
        el()
    ]),
    software_images: eu(er()),
    omcc_version: eh([
        ea(),
        el()
    ]),
    errors: eu(er())
}), t6 = e_({
    desired: em(er(), ea()),
    active: em(er(), ea()),
    pending_restart: es(),
    allocation_blocked: es(),
    startup_error: eh([
        er(),
        el()
    ]),
    config_error: eh([
        er(),
        el()
    ])
}), t8 = eh([
    eb("optical_on"),
    eb("optical_off"),
    eb("optical_status"),
    eb("optical_reload"),
    eb("optical_reinitialize"),
    eb("optical_shutdown")
]), t3 = eh([
    eb("success"),
    eb("error")
]), t4 = eh([
    eb("enabled"),
    eb("disabled"),
    eb("unknown")
]), t9 = e_({
    schema_version: eb(1),
    status: t3,
    action: t8,
    desired_enabled: eh([
        es(),
        el()
    ]),
    tx_enabled: eh([
        es(),
        el()
    ]),
    actor_state: t4,
    hardware_ready: es(),
    discovery_active: es(),
    cleanup_pending: es(),
    error: eh([
        tw,
        el()
    ])
});
e_({
    enabled: es()
});
const t7 = e_({
    model: er(),
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
    measurements: em(er(), t_)
}), re = eh([
    eb("o1_initial"),
    eb("o2_standby"),
    eb("o3_serial_number"),
    eb("o4_ranging"),
    eb("o5_operation"),
    eb("o6_intermittent_lods"),
    eb("o7_emergency_stop")
]), rt = e_({
    restarting: eb(!0)
}), rr = e_({
    calls: ea(),
    failures: ea(),
    last_us: ea(),
    max_us: ea(),
    total_us: ea()
}), rn = e_({
    port: ea(),
    interface: er(),
    carrier: es(),
    status: er(),
    onu_id: ew(ea()),
    onu_sn: ew(er()),
    link_state: er(),
    reserved_sn: ew(er())
}), ra = e_({
    channel_2g: eh([
        ea(),
        el()
    ]),
    channel_5g: eh([
        ea(),
        el()
    ]),
    bandwidth_5g: eh([
        er(),
        el()
    ]),
    tx_power_pct: eh([
        ea(),
        el()
    ]),
    measurements: em(er(), t_)
}), ri = e_({
    onu_id: ea(),
    vendor: er(),
    model: er(),
    serial_number: er(),
    state: re,
    business_status: eA,
    management: eh([
        eK,
        el()
    ]),
    provisioning: eh([
        e9,
        el()
    ]),
    services: eu(eH),
    ssids: eu(eH),
    wifi_sync: e7,
    identity: eh([
        t5,
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
    firmware_version: er(),
    hardware_version: er(),
    uptime_seconds: eh([
        ea(),
        el()
    ]),
    data_path: tf,
    wifi_mesh: ra,
    connected_clients: eh([
        eu(tM),
        el()
    ]),
    measurements: em(er(), t_)
}), rs = e_({
    id: er(),
    last_seen_sec_ago: ea(),
    last_payload_bytes: ea()
}), ro = e_({
    ubus: ew(em(er(), rr)),
    jobs: ew(tU),
    onu_pinning: ew(t6),
    fpga_status: er(),
    provisioning: eh([
        to,
        el()
    ]),
    optical_transceiver: t7,
    switch_ports: eu(rn),
    sub_gateways: eu(ri),
    telemetry_gateways: eu(rs),
    npu: ew(t2),
    ipc: ew(tO)
}), rl = eh([
    eb("plan"),
    eb("apply"),
    eb("management_plan"),
    eb("management_apply"),
    eb("reset_state"),
    eb("reconcile"),
    eb("retry")
]), rd = eh([
    e_({
        operation_ids: eu(ea()),
        revision: er()
    }),
    e_({
        started: eb(!0),
        mode: eQ
    }),
    e_({
        reset: eb(!0),
        device: er()
    }),
    e_({
        operation_ids: eu(ea()),
        mode: eQ,
        reconcile: ew(es()),
        retry: ew(es())
    }),
    eZ
]);
e_({
    action: rl,
    target: er(),
    management: ew(es()),
    item: ew(er())
});
let rc = e_({
    error: eh([
        er(),
        e_({
            code: er(),
            message: er()
        })
    ])
});
class ru extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function rp(e) {
    let t = rc.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new ru("rpc", e) : new ru(e.code, e.message);
    }
    return e;
}
const r_ = {
    parse (e) {
        let t = tj.parse(rp(e));
        if ("object" == typeof t && null !== t && "error" in t) throw rp(t), Error("Unexpected RPC error");
        return t;
    }
}, rf = {
    parse (e) {
        let t = rd.parse(rp(e));
        if ("error" in t) throw Error(t.error);
        return t;
    }
};
em(er(), e_({
    carrier: ew(es()),
    mac: ew(er()),
    link: ew(e_({
        speed: ew(ea()),
        duplex: ew(er()),
        autoneg: ew(es())
    })),
    stats: ew(em(er(), ea()))
}));
const rh = {
    getCapabilities: {
        parse: (e)=>eD.parse(rp(e))
    },
    opticalStatus: t9,
    opticalSet: t9,
    getStatus: {
        parse: (e)=>ro.parse(rp(e))
    },
    getSync: {
        parse: (e)=>to.parse(rp(e))
    },
    configCheck: {
        parse (e) {
            if ("object" == typeof e && null !== e && "error" in e && ("valid" in e || "revision" in e || "devices" in e)) throw Error("Mixed configuration check result");
            return eF.parse(e);
        }
    },
    npuStatus: t2,
    configReload: {
        parse: (e)=>to.parse(rp(e))
    },
    restartService: {
        parse: (e)=>rt.parse(rp(e))
    },
    sync: {
        parse: (e)=>rf.parse(rp(e))
    },
    npuSet: t0,
    mibStart: {
        parse: (e)=>tT.parse(rp(e))
    },
    mibResult: {
        parse: (e)=>tR.parse(rp(e))
    },
    jobRelease: {
        parse: (e)=>tZ.parse(rp(e))
    },
    hl202List: {
        parse: (e)=>r_.parse(rp(e))
    },
    hl202Report: {
        parse: (e)=>tT.parse(rp(e))
    },
    hl202AccountsStart: {
        parse: (e)=>tT.parse(rp(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>tT.parse(rp(e))
    },
    hl202ExecStart: {
        parse: (e)=>tT.parse(rp(e))
    },
    jobResult: {
        parse: (e)=>tR.parse(rp(e))
    },
    getCalibration: {
        parse: (e)=>eT.parse(rp(e))
    },
    saveCalibration: {
        parse: (e)=>eU.parse(rp(e))
    },
    applyCalibration: {
        parse: (e)=>tT.parse(rp(e))
    }
};
function rg() {
    var e;
    let r, n, a, i, s, o, l, d, c, u, p, f, h, g, m, v, b, y, w, k, z, j, x;
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
    }), v = e.declare({
        object: "fttr",
        method: "hl202_report",
        params: [
            "target"
        ],
        reject: !0
    }), b = e.declare({
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
    }), j = e.declare({
        object: "fttr",
        method: "save_calibration",
        params: [
            "data"
        ],
        reject: !0
    }), x = e.declare({
        object: "fttr",
        method: "apply_calibration",
        reject: !0
    }), {
        getCapabilities: async ()=>rh.getCapabilities.parse(await r()),
        opticalStatus: async ()=>rh.opticalStatus.parse(await n()),
        opticalSet: async (e)=>rh.opticalSet.parse(await a(e.enabled)),
        getStatus: async ()=>rh.getStatus.parse(await i()),
        getSync: async ()=>rh.getSync.parse(await s()),
        configCheck: async ()=>rh.configCheck.parse(await o()),
        npuStatus: async ()=>rh.npuStatus.parse(await l()),
        configReload: async ()=>rh.configReload.parse(await d()),
        restartService: async ()=>rh.restartService.parse(await c()),
        sync: async (e)=>rh.sync.parse(await u(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>rh.npuSet.parse(await p(e.enabled, e.bridge)),
        mibStart: async (e)=>rh.mibStart.parse(await f(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>rh.mibResult.parse(await h(e.job, e.chunk)),
        jobRelease: async (e)=>rh.jobRelease.parse(await g(e.job)),
        hl202List: async ()=>rh.hl202List.parse(await m()),
        hl202Report: async (e)=>rh.hl202Report.parse(await v(e.target)),
        hl202AccountsStart: async (e)=>rh.hl202AccountsStart.parse(await b(e.target)),
        hl202AccountUpdate: async (e)=>rh.hl202AccountUpdate.parse(await y(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>rh.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>rh.jobResult.parse(await k(e.job, e.chunk)),
        getCalibration: async ()=>rh.getCalibration.parse(await z()),
        saveCalibration: async (e)=>rh.saveCalibration.parse(await j(e.data)),
        applyCalibration: async ()=>rh.applyCalibration.parse(await x())
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
const rm = async ()=>rg().npuStatus(), rv = async function(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "";
    return rg().npuSet({
        enabled: e,
        bridge: t
    });
};
function rb(e, t) {
    return !0 === t && void 0 !== e && /^(0|[1-9][0-9]*)$/.test(e) ? BigInt(e).toLocaleString() : "\u2014";
}
function ry(e, t) {
    return !0 === t ? `0x${e.toString(16).padStart(4, "0")} (${e})` : "\u2014";
}
function rw(e, t) {
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
function rk(e, t, r, n) {
    return o("span", {
        class: `fttr-npu-state ${!0 === t ? e ? "ready" : "pending" : ""}`,
        children: !0 === t ? e ? r : n : _("Unknown")
    });
}
let main = L.view.extend({
    render: function() {
        var e, t;
        let r, n, a = !1, i = !1, s = 0, l = 0, d = o("input", {
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
        }), p = o("p", {
            "aria-live": "polite",
            children: _("Loading\u2026")
        }), f = o("div", {}), h = o("button", {
            type: "button",
            class: "cbi-button cbi-button-apply",
            disabled: !0,
            children: _("Save NPU configuration")
        }), g = o("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            children: _("Refresh")
        }), m = ()=>{
            d.disabled = c.disabled = h.disabled = a || !L.hasViewPermission() || !r?.supported || !0 !== r.config_valid || !l || Date.now() - l > 12000, g.disabled = a || !!n;
        }, v = async ()=>{
            if (n || a) return n;
            let e = s;
            return n = (async ()=>{
                try {
                    var t, u, h, g, v, b, y, w, k, z, j, x, S, P, $, O, A, C, N, R, T, Z, U;
                    let n, m = await Promise.race([
                        rm(),
                        new Promise((e, t)=>{
                            n = setTimeout(()=>t(Error(_("NPU status request timed out"))), 10000);
                        })
                    ]).finally(()=>clearTimeout(n));
                    if (e !== s || a) return;
                    r = m, l = Date.now(), !i && m.config_valid && (d.checked = m.bridge_offload_enabled, c.value = m.bridge), f.replaceChildren(m.supported ? (Z = {
                        children: [
                            void 0 === m.sampled_at_ms ? (t = {
                                class: "alert-message warning",
                                children: _("Backend reliability metadata is unavailable. Update fttrctl before trusting these readings.")
                            }, o("p", t)) : null,
                            m.errors?.length ? (g = {
                                class: "alert-message warning",
                                children: [
                                    (u = {
                                        children: _("Some data sources are unavailable")
                                    }, o("strong", u)),
                                    (h = {
                                        children: m.errors.map((e)=>{
                                            var t;
                                            return t = {
                                                children: e
                                            }, o("li", t);
                                        })
                                    }, o("ul", h))
                                ]
                            }, o("div", g)) : null,
                            (x = {
                                class: "fttr-npu-grid",
                                children: [
                                    (y = {
                                        class: "cbi-section",
                                        children: [
                                            (v = {
                                                children: _("Engine and admission status")
                                            }, o("h3", v)),
                                            rw(_("Saved configuration"), rk(m.bridge_offload_enabled, m.config_valid, _("Enabled"), _("Disabled"))),
                                            rw(_("NPU engine"), rk(m.engine_attached, m.engine_valid, _("Attached"), _("Detached"))),
                                            rw(_("Port admission"), rk(0 !== m.bridge_offload_mask, m.mask_valid, _("Admitted"), _("Not admitted"))),
                                            rw(_("Managed bridge"), m.config_valid ? m.bridge : "\u2014"),
                                            rw(_("Bridge offload mask"), ry(m.bridge_offload_mask, m.mask_valid)),
                                            rw(_("Admitted ports"), m.mask_valid ? m.active_ports.join(", ") || _("None") : "\u2014"),
                                            rw(_("Firewall hooks"), rk(m.fw4_hooks_ready, m.hooks_valid, _("Ready"), _("Not ready"))),
                                            rw(_("Routed offload mask"), ry(m.routed_offload_mask, m.routed_mask_valid)),
                                            rw(_("Driver debug logging"), rk(m.bridge_offload_debug, m.debug_valid, _("Enabled"), _("Disabled"))),
                                            (b = {
                                                class: "fttr-npu-note",
                                                children: _("Admission allows eligible traffic to bind; it does not prove that packets are currently hardware-forwarded. The switch controls FTTR bridge admission, not the entire NPU or global routed offload policy.")
                                            }, o("p", b))
                                        ]
                                    }, o("div", y)),
                                    (j = {
                                        class: "cbi-section",
                                        children: [
                                            (w = {
                                                children: _("PPE flow snapshot")
                                            }, o("h3", w)),
                                            rw(_("Bound hardware flows"), m.flows_valid ? m.bound_entries : "\u2014"),
                                            rw(_("Current non-empty FOE entries"), m.entries_valid ? m.total_entries : "\u2014"),
                                            rw(_("Current bound-flow packets"), rb(m.total_packets_exact, m.counters_valid)),
                                            rw(_("Current bound-flow bytes"), rb(m.total_bytes_exact, m.counters_valid)),
                                            (k = {
                                                class: "fttr-npu-note",
                                                children: _("Source: PPE debugfs bind/entries and driver sysfs. These are global PPE snapshots, not FTTR-only totals or table capacity. Reads are sequential, not atomic.")
                                            }, o("p", k)),
                                            (z = {
                                                class: "fttr-npu-note",
                                                children: _("Counters cover only currently bound flows and may decrease when flows expire. Driver-exported zeroes are not proof of no traffic. AN7581 native L2B counters are unavailable; \u2014 means unavailable, not zero.")
                                            }, o("p", z))
                                        ]
                                    }, o("div", j))
                                ]
                            }, o("div", x)),
                            (T = {
                                class: "cbi-section",
                                children: [
                                    (S = {
                                        children: _("Active hardware offload flows (PPE FOE Bound)")
                                    }, o("h3", S)),
                                    m.flows_valid ? 0 === m.bound_flows.length ? (P = {
                                        children: _("No bound hardware flows in this snapshot.")
                                    }, o("p", P)) : (N = {
                                        style: "overflow-x:auto",
                                        children: (C = {
                                            class: "table fttr-npu-flows",
                                            children: [
                                                (O = {
                                                    children: ($ = {
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
                                                    }, o("tr", $))
                                                }, o("thead", O)),
                                                (A = {
                                                    children: m.bound_flows.map((e)=>{
                                                        var t, r, n, a, i, s, l, d, c, u, p, f, h;
                                                        return h = {
                                                            children: [
                                                                (r = {
                                                                    children: (t = {
                                                                        children: e.index
                                                                    }, o("code", t))
                                                                }, o("td", r)),
                                                                (n = {
                                                                    children: e.pkt_type
                                                                }, o("td", n)),
                                                                (i = {
                                                                    children: (a = {
                                                                        children: e.orig_tuple || "\u2014"
                                                                    }, o("code", a))
                                                                }, o("td", i)),
                                                                (l = {
                                                                    children: (s = {
                                                                        children: e.new_tuple || "\u2014"
                                                                    }, o("code", s))
                                                                }, o("td", l)),
                                                                (c = {
                                                                    children: (d = {
                                                                        children: e.eth || "\u2014"
                                                                    }, o("code", d))
                                                                }, o("td", c)),
                                                                (u = {
                                                                    children: e.vlan || "\u2014"
                                                                }, o("td", u)),
                                                                (p = {
                                                                    children: rb(e.packets_exact, e.counters_valid && m.engine_valid && m.engine_attached)
                                                                }, o("td", p)),
                                                                (f = {
                                                                    children: rb(e.bytes_exact, e.counters_valid && m.engine_valid && m.engine_attached)
                                                                }, o("td", f))
                                                            ]
                                                        }, o("tr", h);
                                                    })
                                                }, o("tbody", A))
                                            ]
                                        }, o("table", C))
                                    }, o("div", N)) : (R = {
                                        children: _("Flow table is unavailable. A failed read must not be interpreted as an empty table.")
                                    }, o("p", R))
                                ]
                            }, o("div", T))
                        ]
                    }, o("div", Z)) : (U = {
                        class: "cbi-section",
                        children: _("NPU hardware acceleration is not compiled or unsupported on this target.")
                    }, o("div", U))), p.textContent = `${_("Last successful sample")}: ${m.sampled_at_ms ? new Date(m.sampled_at_ms).toLocaleString() : _("Unknown")} \xb7 ${_("Refresh interval: 3 seconds")}`;
                } catch (t) {
                    if (e !== s || a) return;
                    l = 0, f.replaceChildren(o("p", {
                        class: "alert-message warning",
                        children: _("Live NPU data is unavailable. Previous readings are stale.")
                    })), p.textContent = `${_("Refresh failed")}: ${String(t)}`;
                } finally{
                    n = void 0, m();
                }
            })(), m(), n;
        };
        g.onclick = ()=>{
            v();
        }, h.onclick = async ()=>{
            if (h.disabled || a) return;
            let e = c.value.trim(), t = d.checked, o = !1;
            if (!/^[a-zA-Z0-9_.-]{1,15}$/.test(e)) {
                u.textContent = _("Use a bridge interface name of 1\u201315 letters, digits, dots, underscores or hyphens.");
                return;
            }
            a = !0, s++, m(), u.textContent = _("Saving\u2026");
            try {
                let r = await rv(t, e);
                if ("success" !== r.status) throw Error(r.error || _("Failed to save NPU configuration"));
                i = !1, o = !0, u.textContent = _("Configuration saved. Waiting for driver admission readback; enabling may take several seconds and requires eligible ports and firewall policy.");
            } catch (e) {
                u.textContent = `${_("NPU configuration failed")}: ${String(e)}`;
            } finally{
                await n, a = !1, await v(), !o || l && r?.config_valid && r.bridge === e && r.bridge_offload_enabled === t || (u.textContent = _("Save returned success, but configuration readback could not be confirmed. Refresh before retrying.")), m();
            }
        };
        let b = (t = {
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
                                d,
                                _("Enable FTTR bridge hardware offload")
                            ]
                        }),
                        o("label", {
                            htmlFor: "fttr-npu-bridge",
                            children: [
                                _("Bridge interface"),
                                c
                            ]
                        }),
                        o("div", {
                            children: [
                                h,
                                " ",
                                g
                            ]
                        }),
                        u
                    ]
                }, o("div", e)),
                p,
                f
            ]
        }, o("div", t));
        return v(), L.Poll.add(async ()=>{
            b.isConnected && (l && Date.now() - l > 12000 && (l = 0, f.replaceChildren(o("p", {
                class: "alert-message warning",
                children: _("Live NPU data is unavailable. Previous readings are stale.")
            })), m()), await v());
        }, 3), b;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;