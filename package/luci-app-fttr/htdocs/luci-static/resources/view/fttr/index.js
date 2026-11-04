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
    let t = +!!e.startsWith("^"), r = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, r);
}
const b = Symbol("evaluating");
function g(e, t, r) {
    let n;
    Object.defineProperty(e, t, {
        get () {
            if (n !== b) return void 0 === n && (n = b, n = r()), n;
        },
        set (r) {
            Object.defineProperty(e, t, {
                value: r
            });
        },
        configurable: !0
    });
}
const h = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function m(e) {
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
function x(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function k(e) {
    return "string" == typeof e ? e : e?.message;
}
function z(e, t, r) {
    let n = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (n.message = k(e.inst?._zod.def?.error?.(e)) ?? k(t?.error?.(e)) ?? k(r.customError?.(e)) ?? k(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
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
}, S = l("$ZodError", j), $ = l("$ZodError", j, {
    Parent: Error
}), C = (r = $, (e, t, n, i)=>{
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
        let e = new (i?.Err ?? r)(o.issues.map((e)=>z(e, a, p())));
        throw h(e, i?.callee), e;
    }
    return o.value;
}), M = (n = $, async (e, t, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (i?.Err ?? n)(o.issues.map((e)=>z(e, a, p())));
        throw h(e, i?.callee), e;
    }
    return o.value;
}), O = (i = $, (e, t, r)=>{
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
        error: new (i ?? S)(a.issues.map((e)=>z(e, n, p())))
    } : {
        success: !0,
        data: a.value
    };
}), R = (a = $, async (e, t, r)=>{
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
        error: new a(i.issues.map((e)=>z(e, n, p())))
    } : {
        success: !0,
        data: i.value
    };
}), P = /^-?\d+(?:\.\d+)?$/, N = /^(?:true|false)$/i, I = /^null$/i, A = {
    major: 4,
    minor: 3,
    patch: 6
}, T = l("$ZodType", (e, t)=>{
    var r;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = A;
    let n = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && n.unshift(e), n))for (let r of t._zod.onattach)r(e);
    if (0 === n.length) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, r)=>{
            let n, i = w(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, o = a._zod.check(e);
                if (o instanceof Promise && r?.async === !1) throw new d();
                if (n || o instanceof Promise) n = (n ?? Promise.resolve()).then(async ()=>{
                    await o, e.issues.length !== t && (i || (i = w(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = w(e, t));
                }
            }
            return n ? n.then(()=>e) : e;
        }, r = (r, i, a)=>{
            if (w(r)) return r.aborted = !0, r;
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
                    return R(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), D = l("$ZodString", (e, t)=>{
    var r;
    let n;
    T.init(e, t), e._zod.pattern = [
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
}), U = l("$ZodNumber", (e, t)=>{
    T.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? P, e._zod.parse = (r, n)=>{
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
}), q = l("$ZodBoolean", (e, t)=>{
    T.init(e, t), e._zod.pattern = N, e._zod.parse = (r, n)=>{
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
}), B = l("$ZodNull", (e, t)=>{
    T.init(e, t), e._zod.pattern = I, e._zod.values = new Set([
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
}), Z = l("$ZodUnknown", (e, t)=>{
    T.init(e, t), e._zod.parse = (e)=>e;
});
function F(e, t, r) {
    e.issues.length && t.issues.push(...x(r, e.issues)), t.value[r] = e.value;
}
const V = l("$ZodArray", (e, t)=>{
    T.init(e, t), e._zod.parse = (r, n)=>{
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
            s instanceof Promise ? a.push(s.then((t)=>F(t, r, e))) : F(s, r, e);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
});
function W(e, t, r, n, i) {
    if (e.issues.length) {
        if (i && !(r in n)) return;
        t.issues.push(...x(r, e.issues));
    }
    void 0 === e.value ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
}
const J = l("$ZodObject", (e, t)=>{
    var r;
    let n;
    T.init(e, t);
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
    let a = (r = ()=>(function(e) {
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
    let o = t.catchall;
    e._zod.parse = (t, r)=>{
        n ?? (n = a.value);
        let i = t.value;
        if (!m(i)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: i,
            inst: e
        }), t;
        t.value = {};
        let s = [], l = n.shape;
        for (let e of n.keys){
            let n = l[e], a = "optional" === n._zod.optout, o = n._zod.run({
                value: i[e],
                issues: []
            }, r);
            o instanceof Promise ? s.push(o.then((r)=>W(r, t, e, i, a))) : W(o, t, e, i, a);
        }
        return o ? function(e, t, r, n, i, a) {
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
                a instanceof Promise ? e.push(a.then((e)=>W(e, r, i, t, c))) : W(a, r, i, t, c);
            }
            return (o.length && r.issues.push({
                code: "unrecognized_keys",
                keys: o,
                input: t,
                inst: a
            }), e.length) ? Promise.all(e).then(()=>r) : r;
        }(s, i, t, r, a.value, e) : s.length ? Promise.all(s).then(()=>t) : t;
    };
});
function K(e, t, r, n) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let i = e.filter((e)=>!w(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>z(e, n, p())))
    }), t);
}
const G = l("$ZodUnion", (e, t)=>{
    T.init(e, t), g(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), g(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), g(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), g(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>f(e.source)).join("|")})$`);
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
        return o ? Promise.all(s).then((t)=>K(t, i, e, a)) : K(s, i, e, a);
    };
}), X = l("$ZodRecord", (e, t)=>{
    T.init(e, t), e._zod.parse = (r, n)=>{
        let i = r.value;
        if (!function(e) {
            if (!1 === m(e)) return !1;
            let t = e.constructor;
            if (void 0 === t || "function" != typeof t) return !0;
            let r = t.prototype;
            return !1 !== m(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
        }(i)) return r.issues.push({
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
                    t.issues.length && r.issues.push(...x(e, t.issues)), r.value[e] = t.value;
                })) : (o.issues.length && r.issues.push(...x(e, o.issues)), r.value[e] = o.value);
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
            if ("string" == typeof o && P.test(o) && s.issues.length) {
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
                    issues: s.issues.map((e)=>z(e, n, p())),
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
                e.issues.length && r.issues.push(...x(o, e.issues)), r.value[s.value] = e.value;
            })) : (l.issues.length && r.issues.push(...x(o, l.issues)), r.value[s.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>r) : r;
    };
}), H = l("$ZodLiteral", (e, t)=>{
    if (T.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? v(e) : e ? v(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (n, i)=>{
        let a = n.value;
        return r.has(a) || n.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
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
    T.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", g(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
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
    T.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>C(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>O(e, t, r), e.parseAsync = async (t, r)=>M(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>R(e, t, r), e.check = (...r)=>e.clone({
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
    D.init(e, t), ee.init(e, t);
});
function er(e) {
    return new et({
        type: "string",
        ...y(e)
    });
}
const en = l("ZodMiniNumber", (e, t)=>{
    U.init(e, t), ee.init(e, t);
});
function ei(e) {
    return new en({
        type: "number",
        checks: [],
        ...y(e)
    });
}
const ea = l("ZodMiniBoolean", (e, t)=>{
    q.init(e, t), ee.init(e, t);
});
function eo(e) {
    return new ea({
        type: "boolean",
        ...y(e)
    });
}
const es = l("ZodMiniNull", (e, t)=>{
    B.init(e, t), ee.init(e, t);
});
function el(e) {
    return new es({
        type: "null",
        ...y(e)
    });
}
const ed = l("ZodMiniUnknown", (e, t)=>{
    Z.init(e, t), ee.init(e, t);
}), ec = l("ZodMiniArray", (e, t)=>{
    V.init(e, t), ee.init(e, t);
});
function ep(e, t) {
    return new ec({
        type: "array",
        element: e,
        ...y(t)
    });
}
const eu = l("ZodMiniObject", (e, t)=>{
    J.init(e, t), ee.init(e, t), g(e, "shape", ()=>t.shape);
});
function e_(e, t) {
    return new eu({
        type: "object",
        shape: e ?? {},
        ...y(t)
    });
}
const ef = l("ZodMiniUnion", (e, t)=>{
    G.init(e, t), ee.init(e, t);
});
function eb(e, t) {
    return new ef({
        type: "union",
        options: e,
        ...y(t)
    });
}
const eg = l("ZodMiniRecord", (e, t)=>{
    X.init(e, t), ee.init(e, t);
});
function eh(e, t, r) {
    return new eg({
        type: "record",
        keyType: e,
        valueType: t,
        ...y(r)
    });
}
const em = l("ZodMiniLiteral", (e, t)=>{
    H.init(e, t), ee.init(e, t);
});
function ev(e, t) {
    return new em({
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
const ex = eb([
    ev("account_set_password"),
    ev("account_set_active")
]), ek = eb([
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
]), ez = e_({
    enabled: eo(),
    listen: eb([
        er(),
        el()
    ]),
    path: eb([
        er(),
        el()
    ]),
    error: eb([
        er(),
        el()
    ])
}), ej = e_({
    vlan: ei(),
    vlans: ep(ei()),
    priority: ei(),
    acs_url: er()
}), eS = e_({
    state: ek,
    optical_sn: er(),
    cwmp_id: er(),
    mqtt_target: eb([
        er(),
        el()
    ]),
    binding_source: er(),
    method: er(),
    desired_version: er(),
    generation: ei(),
    reason: er(),
    attempts: ei(),
    next_retry_at: ei(),
    updated_at: ei(),
    settings_verified_at: eb([
        ei(),
        el()
    ]),
    selected_vlan: eb([
        ei(),
        el()
    ]),
    last_inform: eb([
        ei(),
        el()
    ]),
    expected_acs_url: er(),
    last_error: eb([
        er(),
        el()
    ]),
    transport_epoch: ei(),
    completed_authorization: ei(),
    connection_request_enabled: eb([
        eo(),
        el()
    ]),
    inflight: eo(),
    persistence_error: eb([
        er(),
        el()
    ]),
    link_identity_error: eb([
        er(),
        el()
    ]),
    listener: ez,
    mqtt_last_seen: eb([
        ei(),
        el()
    ]),
    desired: ew(ej),
    endpoint_notice: ew(er()),
    manual_steps: ew(ep(er()))
}), e$ = eb([
    ev("pending"),
    ev("unavailable")
]), eC = eb([
    eS,
    e_({
        state: e$,
        reason: er()
    })
]), eM = e_({
    id: er(),
    name: er()
}), eO = e_({
    configured: er(),
    effective: er(),
    available: ep(er()),
    reason: er()
}), eR = e_({
    phase: eb([
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
    generation: ei(),
    error: eb([
        er(),
        el()
    ])
});
e_({
    success: eo(),
    output: ew(er()),
    error: ew(er())
});
const eP = eb([
    ev("factory"),
    ev("firmware"),
    ev("builtin")
]), eE = e_({
    detected: eo(),
    device: er(),
    has_data: eo(),
    sha256: er(),
    data: er()
}), eL = e_({
    exists: eo(),
    path: er(),
    size: ei(),
    sha256: er(),
    data: er()
}), eN = e_({
    source: eP,
    active_path: er(),
    size: ei(),
    sha256: er(),
    data: er(),
    factory: eE,
    firmware: eL
}), eI = e_({
    error: er()
});
eb([
    eN,
    eI
]);
const eA = e_({
    success: eo(),
    path: er(),
    size: ei(),
    sha256: er()
});
eb([
    eA,
    eI
]), e_({
    data: er()
});
const eT = e_({
    acs: eo(),
    mqtt: eo(),
    npu: eo(),
    "device-hl202": eo(),
    "device-hwtc": eo(),
    "device-star": eo(),
    "device-zte": eo(),
    "device-scty": eo()
}), eD = e_({
    optical: eo(),
    bridge_offload: eo(),
    omci_mib: eo(),
    mqtt_telemetry: eo(),
    hl202_management: eo(),
    cwmp: eo(),
    command_provisioning: eo()
}), eU = e_({
    status: eo(),
    config: eo(),
    sync: eo(),
    hardware: eo(),
    calibration: eo(),
    hl202: eo(),
    about: eo()
}), eq = e_({
    schema_version: ev(1),
    version: er(),
    features: eT,
    functions: eD,
    pages: eU,
    adapters: ep(eM)
}), eB = eb([
    e_({
        valid: ev(!0),
        revision: er(),
        devices: ei()
    }),
    e_({
        error: er()
    })
]), eZ = eb([
    ev("auto"),
    ev("manual")
]), eF = ev("diff"), eV = e_({
    state: er(),
    enabled: eo(),
    reason: ew(eb([
        er(),
        el()
    ])),
    revision: ew(er()),
    vlan: ew(ei()),
    updated_at: ew(ei())
}), eW = eb([
    ev("online"),
    ev("waiting_inform"),
    ev("offline_or_stale"),
    ev("waiting_transport")
]), eJ = e_({
    cwmp_id: er(),
    state: eW,
    optical_online: eo(),
    last_inform: eb([
        ei(),
        el()
    ]),
    age_seconds: eb([
        ei(),
        el()
    ])
}), eK = eb([
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
]), eG = eb([
    ev("device_service"),
    ev("ssid"),
    ev("port_binding"),
    ev("wan_activation")
]), eX = e_({
    name: er(),
    desired: er()
}), eH = e_({
    id: er(),
    name: ew(eb([
        er(),
        el()
    ])),
    kind: eG,
    service_type: er(),
    state: er(),
    reason: ew(er()),
    revision: ew(er()),
    current_revision: ew(eo()),
    management_fresh: ew(eo()),
    operation_id: ew(ei()),
    task_id: ew(eb([
        ei(),
        el()
    ])),
    updated_at: ew(ei()),
    changes: ew(ep(eX))
}), eQ = eb([
    ev("plan"),
    ev("apply")
]), eY = e_({
    wan: er(),
    wlan: er(),
    binding: er()
}), e0 = e_({
    state: er(),
    requested: er(),
    contract: eb([
        er(),
        el()
    ]),
    reason: er(),
    cache_hit: eo(),
    schema: er(),
    capabilities: eb([
        eY,
        el()
    ])
}), e1 = e_({
    parent: ei(),
    connection: ei(),
    state: er(),
    service_list: er(),
    kind: er(),
    baseline: eb([
        ep(ei()),
        el()
    ])
}), e2 = e_({
    state: er(),
    reason: ew(er()),
    task_id: ew(eb([
        ei(),
        el()
    ])),
    instance: ew(ei()),
    cwmp_id: ew(er())
}), e5 = eb([
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
]), e3 = e_({
    owned: ep(ei()),
    pending: eb([
        er(),
        el()
    ]),
    pending_instance: eb([
        ei(),
        el()
    ])
}), e4 = eb([
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
]), e8 = eb([
    ev("disable"),
    ev("preserve"),
    ev("delete")
]), e6 = e_({
    parent: ei(),
    child: ei(),
    service: er(),
    vlan: er()
}), e7 = e_({
    state: eK,
    items: ep(eH),
    backend: ew(eO),
    operation_id: ew(ei()),
    device: ew(er()),
    optical_sn: ew(er()),
    cwmp_id: ew(er()),
    revision: ew(er()),
    mode: ew(eQ),
    started_at: ew(ei()),
    completed_at: ew(eb([
        ei(),
        el()
    ])),
    current_revision: ew(eo()),
    management_fresh: ew(eo()),
    reason: ew(er()),
    error: ew(er()),
    attempts: ew(ei()),
    next_retry_at: ew(ei()),
    reconcile_reason: ew(er()),
    cwmp_contract: ew(e0),
    wan_objects: ew(eh(er(), e1)),
    wan_lifecycle: ew(eh(er(), e2)),
    wan_stage: ew(e5),
    wifi_objects: ew(e3),
    wifi_lifecycle: ew(eh(er(), e2)),
    wifi_stage: ew(e4),
    wifi_cleanup: ew(e8),
    native_ownership: ew(eh(er(), e6)),
    write_performed: ew(eo()),
    readback_verified: ew(eo())
}), e9 = eb([
    ev("not_configured"),
    ev("stale_revision"),
    ev("stale_management"),
    ev("verified"),
    ev("attention_required"),
    ev("accepted_unverified"),
    ev("pending"),
    ev("recovering"),
    ev("waiting_management")
]), te = e_({
    device: er(),
    name: eb([
        er(),
        el()
    ]),
    group: eb([
        er(),
        el()
    ]),
    group_name: eb([
        er(),
        el()
    ]),
    template: eb([
        er(),
        el()
    ]),
    template_name: eb([
        er(),
        el()
    ]),
    optical_sn: er(),
    adapter: er(),
    omci_management: eV,
    management: eb([
        eJ,
        el()
    ]),
    acs_bootstrap: eC,
    provisioning: e7,
    services: ep(eH),
    ssids: ep(eH),
    wifi_sync: e9
}), tt = eb([
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
]), tr = e_({
    enabled: eo(),
    mode: eZ,
    vlan: ep(ei()),
    priority: ei(),
    address: er(),
    acs_url: er(),
    port: ei(),
    path: er(),
    dhcp_enabled: eo()
}), tn = e_({
    operation: er(),
    key: er(),
    value: ep(er())
}), ti = e_({
    state: tt,
    error: eb([
        er(),
        el()
    ]),
    inflight: eo(),
    ready: eo(),
    desired_version: eb([
        er(),
        el()
    ]),
    applied_version: eb([
        er(),
        el()
    ]),
    next_retry_at: ei(),
    attempts: ei(),
    desired: eb([
        tr,
        el()
    ]),
    applied: eb([
        tr,
        el()
    ]),
    previous: eb([
        tr,
        el()
    ]),
    plan: ep(tn)
}), ta = e_({
    desired: eb([
        ej,
        el()
    ]),
    state: er()
}), to = e_({
    id: er(),
    name: eb([
        er(),
        el()
    ]),
    template: er()
}), ts = e_({
    enabled: eo(),
    mode: eZ,
    method: eF,
    revision: er(),
    triggers: ep(er()),
    interval_minutes: ei(),
    error: eb([
        er(),
        el()
    ]),
    devices: ep(te),
    management_network: ti,
    omci_management: ta,
    groups: ep(to),
    pending_devices: ep(er()),
    onu_pins: ew(eh(er(), ei())),
    config_error: ew(eb([
        er(),
        el()
    ]))
});
eb([
    ts,
    eI
]);
const tl = e_({
    enabled: eb([
        eo(),
        el()
    ]),
    routed_enabled: eb([
        eo(),
        el()
    ]),
    bridge_enabled: eb([
        eo(),
        el()
    ]),
    engine_attached: eb([
        eo(),
        el()
    ]),
    forwarding_verified: eb([
        eo(),
        el()
    ])
}), td = e_({
    entity_id: ei(),
    port_id: eb([
        ei(),
        el()
    ])
}), tc = e_({
    entity_id: ei(),
    filter_list_hex: eb([
        er(),
        el()
    ]),
    forward_operation: eb([
        ei(),
        el()
    ]),
    number_of_entries: eb([
        ei(),
        el()
    ])
}), tp = e_({
    entity_id: ei(),
    received_frame_rules_hex: eb([
        ep(er()),
        el()
    ]),
    error: eb([
        er(),
        el()
    ])
}), tu = e_({
    age_seconds: ei(),
    gem_ports: ep(td),
    vlan_filters: ep(tc),
    vlan_operations: ep(tp)
}), t_ = e_({
    source: er(),
    unit: er(),
    reason: eb([
        er(),
        el()
    ]),
    raw: eb([
        er(),
        el()
    ]),
    age_seconds: eb([
        ei(),
        el()
    ])
}), tf = e_({
    interface: er(),
    gem_ports: eb([
        ep(ei()),
        el()
    ]),
    vlan_id: eb([
        ei(),
        el()
    ]),
    onu_inventory: eb([
        tu,
        el()
    ]),
    tx_bytes: eb([
        ei(),
        el()
    ]),
    rx_bytes: eb([
        ei(),
        el()
    ]),
    current_tx_kbps: eb([
        ei(),
        el()
    ]),
    current_rx_kbps: eb([
        ei(),
        el()
    ]),
    olt_channel_gem: ew(ei()),
    forwarding_verified: ew(eo()),
    offload: tl,
    measurements: eh(er(), t_)
});
e_({});
const tb = e_({
    entity_id: ei(),
    interval_end_time: ei(),
    corrected_bytes: ei(),
    corrected_code_words: ei(),
    uncorrectable_code_words: ei(),
    total_code_words: ei(),
    fec_seconds: ei()
}), tg = e_({
    ani_entity_id: eb([
        ei(),
        el()
    ]),
    control_supported: eo(),
    downstream_enabled: eb([
        eo(),
        el()
    ]),
    upstream_enabled: eb([
        eo(),
        el()
    ]),
    downstream_pm: eb([
        tb,
        el()
    ]),
    measurement: t_
}), th = e_({
    entry: eb([
        ev(0),
        ev(1),
        ev(2)
    ]),
    username: er(),
    active: eo()
}), tm = e_({
    mqtt_mac: er(),
    optical_sn: eb([
        er(),
        el()
    ]),
    onu_id: eb([
        ei(),
        el()
    ]),
    binding_generation: er(),
    last_seen: ei(),
    reason: er()
}), tv = eb([
    ev("executed"),
    ev("dispatched"),
    ev("timeout"),
    ev("error")
]), ty = e_({
    target: er(),
    status: tv,
    request_id: ew(er()),
    exit_code: ew(ei()),
    output: ew(er()),
    output_truncated: eo(),
    error: ew(er())
}), tw = e_({
    target: tm,
    result: ty,
    binding_current: eo()
}), tx = eb([
    ev("not_applicable"),
    ev("accepted_and_saved"),
    ev("unconfirmed")
]), tk = e_({
    code: er(),
    message: er()
});
eb([
    e_({
        schema_version: ev(1),
        operation: tw,
        accounts: eb([
            ep(th),
            el()
        ]),
        write_status: tx
    }),
    e_({
        schema_version: ei(),
        error: tk
    })
]);
const tz = e_({
    optical_sn: er(),
    onu_id: ei(),
    binding_generation: er()
}), tj = e_({
    mqtt_mac: er(),
    binding_generation: er()
}), tS = eb([
    tz,
    tj
]);
e_({
    target: tS
});
const t$ = eb([
    e_({
        kind: ev("exec"),
        script: er(),
        timeout_seconds: ei()
    }),
    e_({
        kind: ev("accounts_read")
    }),
    e_({
        kind: ev("account_set_password"),
        entry: ei(),
        password: er()
    }),
    e_({
        kind: ev("account_set_active"),
        entry: ei(),
        active: eo()
    })
]), tC = e_({
    schema_version: ei(),
    target: tz,
    action: t$
}), tM = e_({
    optical_sn: er(),
    onu_id: ei(),
    model: er(),
    optical_online: eo(),
    can_execute: eo(),
    mqtt: eb([
        tm,
        el()
    ]),
    report_revision: eb([
        ei(),
        el()
    ])
});
eb([
    e_({
        schema_version: ev(1),
        operation: tw
    }),
    e_({
        schema_version: ei(),
        error: tk
    })
]), e_({
    target: tS,
    script: er(),
    timeout_seconds: ei()
});
const tO = eb([
    e_({
        schema_version: ev(1),
        devices: ep(tM),
        sources: ep(tm)
    }),
    e_({
        schema_version: ei(),
        error: tk
    })
]);
eb([
    e_({
        method: ev("list")
    }),
    e_({
        method: ev("report"),
        target: tz
    }),
    e_({
        method: ev("source_report"),
        target: tj
    }),
    e_({
        method: ev("run"),
        request: tC
    })
]);
const tR = eb([
    ev("received"),
    ev("report_unavailable")
]), tP = e_({
    value: new ed({
        type: "unknown"
    }),
    member: er(),
    unit: eb([
        er(),
        el()
    ])
}), tE = e_({
    name: er(),
    bytes: ei(),
    encoding: er(),
    text: eb([
        er(),
        el()
    ]),
    text_omitted: eo()
}), tL = e_({
    schema_version: ei(),
    compressed_bytes: ei(),
    decompressed_bytes: ei(),
    fields: eh(er(), tP),
    members: ep(tE),
    errors: ep(er())
}), tN = e_({
    revision: ei(),
    last_received: ei(),
    last_processed_receipt: eb([
        ei(),
        el()
    ]),
    last_good: eb([
        ei(),
        el()
    ]),
    error: eb([
        er(),
        el()
    ]),
    report: eb([
        tL,
        el()
    ])
});
eb([
    e_({
        schema_version: ev(1),
        target: tm,
        report: eb([
            tN,
            el()
        ]),
        state: tR
    }),
    e_({
        schema_version: ev(1),
        target: tm,
        report: eb([
            tN,
            el()
        ]),
        read_only: ev(!0)
    }),
    e_({
        schema_version: ei(),
        error: tk
    })
]), e_({
    target: tS
}), e_({
    target: tS,
    kind: ex,
    entry: ei(),
    password: er(),
    active: eo()
});
const tI = e_({
    accepted: ei(),
    rejected: ei(),
    read_errors: ei(),
    handled: ei(),
    max_intake_us: ei(),
    max_handler_us: ei()
}), tA = ev("pending"), tT = e_({
    phase: eb([
        ev("starting"),
        ev("upload"),
        ev("tables")
    ]),
    received: ei(),
    expected: eb([
        ei(),
        el()
    ])
}), tD = ev("ready"), tU = eb([
    e_({
        status: tA,
        progress: ew(tT)
    }),
    e_({
        status: tD,
        chunk: ei(),
        chunks: ei(),
        bytes: ei(),
        data: er()
    })
]);
eb([
    tU,
    eI
]);
const tq = e_({
    status: tA,
    job: er()
}), tB = e_({
    released: eo()
});
e_({
    job: er()
}), e_({
    job: er(),
    chunk: ei()
}), eb([
    tq,
    eI
]);
const tZ = e_({
    accepting: eo(),
    running: ei(),
    stored: ei(),
    bytes: ei(),
    running_limit: ei(),
    stored_limit: ei(),
    bytes_limit: ei(),
    result_bytes_limit: ei()
}), tF = e_({
    mac: er(),
    ip: er(),
    band: er(),
    rssi_dbm: eb([
        ei(),
        el()
    ]),
    rx_rate_mbps: eb([
        ei(),
        el()
    ]),
    tx_rate_mbps: eb([
        ei(),
        el()
    ])
}), tV = eb([
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
]), tW = e_({
    id: er(),
    url: er()
}), tJ = e_({
    name: er(),
    kind: tV,
    index: ei(),
    mask: ei(),
    size: ei(),
    read: eo(),
    write: eo(),
    set_by_create: eo(),
    avc: eo(),
    optional: eo(),
    deprecated: eo(),
    default_hex: eb([
        er(),
        el()
    ]),
    reference: tW
}), tK = eb([
    e_({
        type: ev("unsigned"),
        value: ei()
    }),
    e_({
        type: ev("signed"),
        value: ei()
    }),
    e_({
        type: ev("decimal"),
        value: er()
    }),
    e_({
        type: ev("text"),
        value: eb([
            er(),
            el()
        ])
    }),
    e_({
        type: ev("octets"),
        hex: er()
    }),
    e_({
        type: ev("table_length"),
        bytes: ei()
    })
]), tG = e_({
    raw_hex: er(),
    value: tK,
    sequences: ep(ei())
}), tX = e_({
    definition: tJ,
    value: eb([
        tK,
        el()
    ]),
    observations: ep(tG)
}), tH = eb([
    ev("layout"),
    ev("name_only"),
    ev("unknown")
]), tQ = e_({
    class_id: ei(),
    name: eb([
        er(),
        el()
    ]),
    entities: ei(),
    records: ei(),
    support: tH
}), tY = e_({
    code: er(),
    message: er(),
    offset: ei(),
    mask: ei()
}), t0 = e_({
    class_id: ei(),
    entity_id: ei(),
    name: eb([
        er(),
        el()
    ]),
    support: tH,
    reference: eb([
        tW,
        el()
    ]),
    sequences: ep(ei()),
    attributes: ep(tX),
    diagnostics: ep(tY)
}), t1 = ev("ready"), t2 = e_({
    class_id: ei(),
    entity_id: ei(),
    sequence: ei(),
    attribute_mask: ei(),
    raw_hex: er(),
    consumed: ei(),
    remaining_hex: er(),
    undecoded_mask: ei()
}), t5 = e_({
    raw_hex: er(),
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
    delete_entry: eo()
}), t3 = e_({
    class_id: ei(),
    entity_id: ei(),
    attribute: tJ,
    collected: eo(),
    error: eb([
        er(),
        el()
    ]),
    raw_hex: er(),
    rows: ep(er()),
    vlan_rules: ep(t5)
}), t4 = e_({
    schema_version: ev(1),
    reference_version: er(),
    onu_id: eb([
        ei(),
        el()
    ]),
    uploaded_complete: eo(),
    expected_records: ei(),
    received_records: ei(),
    decoded_records: ei(),
    partial_records: ei(),
    basic_records: ei(),
    tables_requested: eo(),
    tables_collected: eo(),
    classes: ep(tQ),
    entities: ep(t0),
    records: ep(t2),
    tables: ep(t3),
    diagnostics: ep(tY)
}), t8 = e_({
    status: t1,
    report: t4
});
e_({
    onu_id: ei(),
    optical_sn: er(),
    tables: eo()
});
const t6 = eb([
    e_({
        status: ev("success"),
        enabled: eo()
    }),
    e_({
        status: ev("error"),
        error: er()
    })
]);
e_({
    enabled: eo(),
    bridge: er(),
    wan_upstream: eo(),
    wan_downstream: eo(),
    onu_bridge: eo()
});
const t7 = e_({
    index: er(),
    state: er(),
    pkt_type: er(),
    orig_tuple: er(),
    new_tuple: er(),
    eth: er(),
    vlan: er(),
    packets: ei(),
    bytes: ei(),
    counters_valid: eo(),
    packets_exact: er(),
    bytes_exact: er()
}), t9 = e_({
    sampled_at_ms: ei(),
    errors: ep(er()),
    config_valid: eo(),
    engine_valid: eo(),
    mask_valid: eo(),
    routed_mask_valid: eo(),
    debug_valid: eo(),
    flows_valid: eo(),
    entries_valid: eo(),
    counters_valid: eo(),
    hooks_valid: eo(),
    total_packets_exact: er(),
    total_bytes_exact: er(),
    supported: eo(),
    engine_attached: eo(),
    bridge_offload_enabled: eo(),
    wan_upstream: eo(),
    wan_downstream: eo(),
    onu_bridge: eo(),
    bridge_offload_mask: ei(),
    routed_offload_mask: ei(),
    bridge_offload_debug: eo(),
    bridge: er(),
    active_ports: ep(er()),
    fw4_hooks_ready: eo(),
    total_entries: ei(),
    bound_entries: ei(),
    bound_ipv4_entries: ei(),
    bound_ipv6_entries: ei(),
    total_packets: ei(),
    total_bytes: ei(),
    bound_flows: ep(t7)
}), re = e_({
    equipment_id: eb([
        er(),
        el()
    ]),
    hardware_version: eb([
        er(),
        el()
    ]),
    software_images: ep(er()),
    omcc_version: eb([
        ei(),
        el()
    ]),
    errors: ep(er())
}), rt = e_({
    desired: eh(er(), ei()),
    active: eh(er(), ei()),
    pending_restart: eo(),
    allocation_blocked: eo(),
    startup_error: eb([
        er(),
        el()
    ]),
    config_error: eb([
        er(),
        el()
    ])
}), rr = eb([
    ev("optical_on"),
    ev("optical_off"),
    ev("optical_status"),
    ev("optical_reload"),
    ev("optical_reinitialize"),
    ev("optical_shutdown")
]), rn = eb([
    ev("success"),
    ev("error")
]), ri = eb([
    ev("enabled"),
    ev("disabled"),
    ev("unknown")
]), ra = e_({
    schema_version: ev(1),
    status: rn,
    action: rr,
    desired_enabled: eb([
        eo(),
        el()
    ]),
    tx_enabled: eb([
        eo(),
        el()
    ]),
    actor_state: ri,
    hardware_ready: eo(),
    discovery_active: eo(),
    cleanup_pending: eo(),
    error: eb([
        tk,
        el()
    ])
});
e_({
    enabled: eo()
});
const ro = e_({
    model: er(),
    wavelength_tx_nm: ei(),
    wavelength_rx_nm: ei(),
    phy_rate_downlink_gbps: ei(),
    phy_rate_uplink_gbps: ei(),
    tx_power_dbm: eb([
        ei(),
        el()
    ]),
    laser_bias_current_ma: eb([
        ei(),
        el()
    ]),
    temperature_celsius: eb([
        ei(),
        el()
    ]),
    vcc_voltage: eb([
        ei(),
        el()
    ]),
    cdr_locked: eb([
        eo(),
        el()
    ]),
    tx_enabled: ew(eo()),
    measurements: eh(er(), t_)
}), rs = eb([
    ev("o1_initial"),
    ev("o2_standby"),
    ev("o3_serial_number"),
    ev("o4_ranging"),
    ev("o5_operation"),
    ev("o6_intermittent_lods"),
    ev("o7_emergency_stop")
]), rl = e_({
    restarting: ev(!0)
}), rd = e_({
    calls: ei(),
    failures: ei(),
    last_us: ei(),
    max_us: ei(),
    total_us: ei()
}), rc = e_({
    port: ei(),
    interface: er(),
    carrier: eo(),
    status: er(),
    onu_id: ew(ei()),
    onu_sn: ew(er()),
    link_state: er(),
    reserved_sn: ew(er())
}), rp = e_({
    channel_2g: eb([
        ei(),
        el()
    ]),
    channel_5g: eb([
        ei(),
        el()
    ]),
    bandwidth_5g: eb([
        er(),
        el()
    ]),
    tx_power_pct: eb([
        ei(),
        el()
    ]),
    measurements: eh(er(), t_)
}), ru = e_({
    onu_id: ei(),
    vendor: er(),
    model: er(),
    serial_number: er(),
    state: rs,
    business_status: eR,
    management: eb([
        eJ,
        el()
    ]),
    provisioning: eb([
        e7,
        el()
    ]),
    services: ep(eH),
    ssids: ep(eH),
    wifi_sync: e9,
    identity: eb([
        re,
        el()
    ]),
    identity_age_seconds: eb([
        ei(),
        el()
    ]),
    identity_current: eo(),
    fiber_distance_m: eb([
        ei(),
        el()
    ]),
    ranging_delay_rtd_ns: eb([
        ei(),
        el()
    ]),
    equalization_delay_bits: eb([
        ei(),
        el()
    ]),
    optical_rx_power_dbm: eb([
        ei(),
        el()
    ]),
    optical_tx_power_dbm: eb([
        ei(),
        el()
    ]),
    firmware_version: er(),
    hardware_version: er(),
    uptime_seconds: eb([
        ei(),
        el()
    ]),
    fec: ew(tg),
    data_path: tf,
    wifi_mesh: rp,
    connected_clients: eb([
        ep(tF),
        el()
    ]),
    measurements: eh(er(), t_)
}), r_ = e_({
    id: er(),
    last_seen_sec_ago: ei(),
    last_payload_bytes: ei()
}), rf = e_({
    ubus: ew(eh(er(), rd)),
    jobs: ew(tZ),
    onu_pinning: ew(rt),
    fpga_status: er(),
    provisioning: eb([
        ts,
        el()
    ]),
    optical_transceiver: ro,
    switch_ports: ep(rc),
    sub_gateways: ep(ru),
    telemetry_gateways: ep(r_),
    npu: ew(t9),
    ipc: ew(tI)
}), rb = eb([
    ev("plan"),
    ev("apply"),
    ev("management_plan"),
    ev("management_apply"),
    ev("reset_state"),
    ev("reconcile"),
    ev("retry")
]), rg = eb([
    e_({
        operation_ids: ep(ei()),
        revision: er()
    }),
    e_({
        started: ev(!0),
        mode: eQ
    }),
    e_({
        reset: ev(!0),
        device: er()
    }),
    e_({
        operation_ids: ep(ei()),
        mode: eQ,
        reconcile: ew(eo()),
        retry: ew(eo())
    }),
    eI
]);
e_({
    action: rb,
    target: er(),
    management: ew(eo()),
    item: ew(er())
});
const rh = eh(er(), e_({
    carrier: ew(eo()),
    mac: ew(er()),
    link: ew(e_({
        speed: ew(ei()),
        duplex: ew(er()),
        autoneg: ew(eo())
    })),
    stats: ew(eh(er(), ei()))
})), rm = (e)=>null == e || "" === e ? "\u2014" : String(e);
function rv(e) {
    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
    return null != e && Number.isFinite(e) ? `${e.toFixed(t)} dBm` : "\u2014";
}
function ry(e) {
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
function rw(e) {
    return void 0 === e || !Number.isFinite(e) || e < 0 ? "\u2014" : e < 1000 ? `${e} Pkts.` : `${(e / 1000).toFixed(2)} KPkts.`;
}
function rx(e) {
    let t = "none" === e.tone ? "" : `fttr-badge fttr-badge-${e.tone}`, r = e.class ? ` ${e.class}` : "", n = s("span", {
        class: `${t}${r}`.trim(),
        children: e.children
    });
    return e.title && n.setAttribute("title", e.title), n;
}
function rk(e, t, r, n) {
    e.textContent = r, "none" === t ? e.className = "" : e.className = `fttr-badge fttr-badge-${t}`, n ? e.setAttribute("title", n) : e.removeAttribute("title");
}
const rz = {
    o1_initial: _("O1 Initial"),
    o2_standby: _("O2 Standby"),
    o3_serial_number: _("O3 Serial Number"),
    o4_ranging: _("O4 Ranging"),
    o5_operation: _("O5 (Operation)"),
    o6_intermittent_lods: _("O6 Intermittent LODS"),
    o7_emergency_stop: _("O7 Emergency Stop")
};
function rj(e) {
    return e ? "o5_operation" === e ? {
        tone: "success",
        label: rz.o5_operation,
        title: e
    } : {
        tone: "warning",
        label: rz[e] ?? rm(e),
        title: e
    } : {
        tone: "none",
        label: "\u2014"
    };
}
function rS(e) {
    let t = rj(e.state);
    return s(rx, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
function r$(e) {
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
function rC(e) {
    let t = r$(e.status);
    return s(rx, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
const rM = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
};
function rO(e) {
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
    return "online" === t ? (o = "success", a = rM.online) : "waiting_inform" === t ? (o = "warning", a = rM.waiting_inform) : "offline_or_stale" === t ? (o = "danger", a = rM.offline_or_stale) : t && (o = "neutral", a = rm(t)), {
        tone: o,
        label: r && t ? `${a} \xb7 ${r}` : a,
        title: i
    };
}
function rR(e) {
    let t = rO(e.management);
    return s(rx, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
const rP = {
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
function rE(e, t) {
    let r = e?.state, n = e?.next_retry_at && e.next_retry_at > Math.floor(Date.now() / 1000) ? e.next_retry_at - Math.floor(Date.now() / 1000) : 0, i = t ?? (e?.current_revision === !1 ? _("Previous configuration") : e?.management_fresh === !1 ? _("Management stale") : e?.reconcile_reason ? e.reconcile_reason : n > 0 ? _("Next self-healing retry in %d seconds").replace("%d", String(n)) : e?.reason ?? e?.error);
    return r && "not_started" !== r ? "completed" === r || "verified" === r ? {
        tone: "success",
        label: "completed" === r ? rP.completed : _("Ready"),
        title: i
    } : "wan_reconciling" === r || "wan_verifying" === r || "wifi_reconciling" === r || "discovering" === r || "reading" === r || "disabling" === r || "disabling_read" === r || "writing" === r || "verifying" === r || "settling" === r || "recovering" === r || "waiting_task" === r ? {
        tone: "info",
        label: rP[r] ?? rm(r),
        title: i
    } : "interrupted" === r || "failed" === r || "error" === r || "blocked" === r ? {
        tone: "danger",
        label: "blocked" === r ? rP.blocked : rP.interrupted,
        title: i
    } : "waiting" === r || "pending" === r || "waiting_management" === r || "reset_pending" === r ? {
        tone: "warning",
        label: rP[r] ?? rP.waiting,
        title: i
    } : {
        tone: "neutral",
        label: rm(r),
        title: i
    } : {
        tone: "neutral",
        label: rP.not_started,
        title: i
    };
}
function rL(e) {
    let t = rE(e.provisioning, e.title);
    return s(rx, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
const rN = {
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
function rI(e) {
    return e && "not_configured" !== e ? "verified" === e ? {
        tone: "success",
        label: rN.verified
    } : "attention_required" === e ? {
        tone: "danger",
        label: rN.attention_required
    } : "stale_revision" === e || "stale_management" === e || "waiting_management" === e ? {
        tone: "warning",
        label: rN[e]
    } : "recovering" === e ? {
        tone: "info",
        label: rN.recovering
    } : "accepted_unverified" === e || "pending" === e ? {
        tone: "warning",
        label: rN[e]
    } : {
        tone: "neutral",
        label: rm(e)
    } : {
        tone: "neutral",
        label: rN.not_configured
    };
}
function rA(e) {
    let t = rI(e.state);
    return s(rx, {
        tone: t.tone,
        title: t.title,
        children: t.label
    });
}
const rT = `
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
let rD = e_({
    error: eb([
        er(),
        e_({
            code: er(),
            message: er()
        })
    ])
});
class rU extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function rq(e) {
    let t = rD.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new rU("rpc", e) : new rU(e.code, e.message);
    }
    return e;
}
const rB = {
    parse (e) {
        let t = tO.parse(rq(e));
        if ("object" == typeof t && null !== t && "error" in t) throw rq(t), Error("Unexpected RPC error");
        return t;
    }
}, rZ = {
    parse (e) {
        let t = rg.parse(rq(e));
        if ("error" in t) throw Error(t.error);
        return t;
    }
}, rF = {
    getCapabilities: {
        parse: (e)=>eq.parse(rq(e))
    },
    opticalStatus: ra,
    opticalSet: ra,
    getStatus: {
        parse: (e)=>rf.parse(rq(e))
    },
    getSync: {
        parse: (e)=>ts.parse(rq(e))
    },
    configCheck: {
        parse (e) {
            if ("object" == typeof e && null !== e && "error" in e && ("valid" in e || "revision" in e || "devices" in e)) throw Error("Mixed configuration check result");
            return eB.parse(e);
        }
    },
    npuStatus: t9,
    configReload: {
        parse: (e)=>ts.parse(rq(e))
    },
    restartService: {
        parse: (e)=>rl.parse(rq(e))
    },
    sync: {
        parse: (e)=>rZ.parse(rq(e))
    },
    npuSet: t6,
    mibStart: {
        parse: (e)=>tq.parse(rq(e))
    },
    mibResult: {
        parse: (e)=>tU.parse(rq(e))
    },
    jobRelease: {
        parse: (e)=>tB.parse(rq(e))
    },
    hl202List: {
        parse: (e)=>rB.parse(rq(e))
    },
    hl202Report: {
        parse: (e)=>tq.parse(rq(e))
    },
    hl202AccountsStart: {
        parse: (e)=>tq.parse(rq(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>tq.parse(rq(e))
    },
    hl202ExecStart: {
        parse: (e)=>tq.parse(rq(e))
    },
    jobResult: {
        parse: (e)=>tU.parse(rq(e))
    },
    getCalibration: {
        parse: (e)=>eN.parse(rq(e))
    },
    saveCalibration: {
        parse: (e)=>eA.parse(rq(e))
    },
    applyCalibration: {
        parse: (e)=>tq.parse(rq(e))
    }
};
function rV() {
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
        getCapabilities: async ()=>rF.getCapabilities.parse(await r()),
        opticalStatus: async ()=>rF.opticalStatus.parse(await n()),
        opticalSet: async (e)=>rF.opticalSet.parse(await i(e.enabled)),
        getStatus: async ()=>rF.getStatus.parse(await a()),
        getSync: async ()=>rF.getSync.parse(await o()),
        configCheck: async ()=>rF.configCheck.parse(await s()),
        npuStatus: async ()=>rF.npuStatus.parse(await l()),
        configReload: async ()=>rF.configReload.parse(await d()),
        restartService: async ()=>rF.restartService.parse(await c()),
        sync: async (e)=>rF.sync.parse(await p(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>rF.npuSet.parse(await u(e.enabled, e.bridge, e.wan_upstream, e.wan_downstream, e.onu_bridge)),
        mibStart: async (e)=>rF.mibStart.parse(await f(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>rF.mibResult.parse(await b(e.job, e.chunk)),
        jobRelease: async (e)=>rF.jobRelease.parse(await g(e.job)),
        hl202List: async ()=>rF.hl202List.parse(await h()),
        hl202Report: async (e)=>rF.hl202Report.parse(await m(e.target)),
        hl202AccountsStart: async (e)=>rF.hl202AccountsStart.parse(await v(e.target)),
        hl202AccountUpdate: async (e)=>rF.hl202AccountUpdate.parse(await y(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>rF.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>rF.jobResult.parse(await x(e.job, e.chunk)),
        getCalibration: async ()=>rF.getCalibration.parse(await k()),
        saveCalibration: async (e)=>rF.saveCalibration.parse(await z(e.data)),
        applyCalibration: async ()=>rF.applyCalibration.parse(await j())
    });
}
let rW = L.rpc.declare({
    object: "luci-rpc",
    method: "getNetworkDevices",
    expect: {
        "": {}
    },
    reject: !0
});
const rJ = async ()=>rV().getStatus(), rK = async ()=>rV().configReload(), rG = async ()=>rh.parse(rq(await rW())), rX = async (e, t, r)=>rV().mibStart({
        onu_id: e,
        optical_sn: t,
        tables: r
    }), rH = async (e, t)=>rV().mibResult({
        job: e,
        chunk: t
    }), rQ = async (e)=>rV().jobRelease({
        job: e
    });
let rY = (e)=>JSON.stringify(e, null, 2);
async function r0(e) {
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
function r1(e) {
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
let r2 = L.rpc.declare({
    object: "uci",
    method: "get",
    params: [
        "config",
        "type"
    ],
    reject: !0
}), r5 = L.rpc.declare({
    object: "uci",
    method: "changes",
    params: [
        "config"
    ],
    reject: !0
}), r3 = L.rpc.declare({
    object: "uci",
    method: "set",
    params: [
        "config",
        "section",
        "values"
    ],
    reject: !0
}), r4 = L.rpc.declare({
    object: "uci",
    method: "delete",
    params: [
        "config",
        "section",
        "option"
    ],
    reject: !0
}), r8 = L.rpc.declare({
    object: "uci",
    method: "commit",
    params: [
        "config"
    ],
    reject: !0
}), r6 = !1;
async function r7(e, t, r) {
    if (!L.hasViewPermission() || !t || r6) return;
    let n = e.serial_number.toUpperCase(), i = t.desired[n], a = void 0 !== i, o = a ? i : e.onu_id, l = a ? _("Unpin interface") : _("Pin interface");
    try {
        var d, c, p, u, f, b, g, h, m, v, y, w, x, k, z, j;
        let { values: e } = await r2("fttr", "device"), t = (e)=>Object.entries(e).find((e)=>{
                let [, t] = e;
                return "device" === t[".type"] && t.optical_sn?.toUpperCase() === n;
            }), S = t(e);
        if (!S) return void L.ui.showModal(l, (g = {
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
        let $ = (h = {
            class: "error",
            role: "alert"
        }, s("p", h)), C = (m = {
            type: "button",
            class: "cbi-button",
            onclick: ()=>L.ui.hideModal(),
            children: _("Cancel")
        }, s("button", m)), M = (v = {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: async ()=>{
                if (r6) return;
                r6 = !0, M.disabled = C.disabled = !0, $.textContent = "";
                let e = !1;
                try {
                    var n;
                    if ((await r5("fttr")).changes.length) throw Error(_("Apply or discard pending FTTR configuration changes first."));
                    let l = (await r2("fttr", "device")).values, d = t(l);
                    if (!d || d[0] !== S[0] || d[1].onu_id !== S[1].onu_id || (null == d[1].onu_id ? void 0 : Number(d[1].onu_id)) !== i) throw Error(_("Interface configuration changed. Refresh the page and try again."));
                    if (!a && Object.entries(l).some((e)=>{
                        let [t, r] = e;
                        return t !== d[0] && "device" === r[".type"] && null != r.onu_id && Number(r.onu_id) === o;
                    })) throw Error(_("Interface already reserved by another device."));
                    a ? await r4("fttr", d[0], "onu_id") : await r3("fttr", d[0], {
                        onu_id: String(o)
                    }), await r8("fttr"), e = !0, await rK(), r(await rJ()), L.ui.hideModal(), L.ui.addNotification(null, (n = {
                        children: _("Interface setting saved. Restart FTTR for it to take effect.")
                    }, s("p", n)), "info");
                } catch (t) {
                    $.textContent = `${e ? _("Saved, but configuration reload or status refresh failed:") : _("Failed to save interface setting:")} ${String(t)}`;
                } finally{
                    r6 = !1, M.disabled = e, C.disabled = !1;
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
                $,
                (z = {
                    class: "right",
                    children: [
                        C,
                        " ",
                        M
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
let r9 = L.view, ne = L.Poll;
function nt(e, t) {
    var r, n, i;
    let a, l = e, d = s("button", {
        type: "button",
        class: "cbi-button cbi-button-neutral",
        style: "padding:0 .4em;min-height:1.5em;font-size:85%;margin-left:.5em",
        onclick: ()=>r7(l, a, t)
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
                                                s(rS, {
                                                    state: e.state
                                                })
                                            ],
                                            [
                                                _("Business"),
                                                s(rC, {
                                                    status: e.business_status
                                                })
                                            ],
                                            [
                                                _("Receive optical power"),
                                                rv(e.optical_rx_power_dbm)
                                            ],
                                            [
                                                _("Transmit optical power"),
                                                rv(e.optical_tx_power_dbm)
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
                                                s(rR, {
                                                    management: e.management
                                                })
                                            ],
                                            [
                                                _("Last Inform"),
                                                e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
                                            ],
                                            [
                                                _("Provisioning"),
                                                s(rL, {
                                                    provisioning: e.provisioning
                                                })
                                            ],
                                            [
                                                _("Wi-Fi sync"),
                                                s(rA, {
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
                                                                    children: n instanceof Node ? n : rm(n)
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
                            }), S = s("span", {
                                class: "download-status",
                                role: "status"
                            }), $ = null, C = s("button", {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                disabled: !0,
                                onclick: async ()=>{
                                    if (v && !h) {
                                        C.disabled = !0, S.textContent = _("Preparing JSON download\u2026");
                                        try {
                                            let t = await r0(v);
                                            if (h) return;
                                            $ && URL.revokeObjectURL($), $ = URL.createObjectURL(t);
                                            let r = document.createElement("a");
                                            r.href = $, r.download = `mib-${e.serial_number}.json`, r.click(), S.textContent = _("JSON download started"), window.setTimeout(()=>{
                                                URL.revokeObjectURL(r.href), $ === r.href && ($ = null);
                                            }, 1000);
                                        } catch (e) {
                                            S.textContent = String(e);
                                        } finally{
                                            C.disabled = !v || h;
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
                                                    C,
                                                    S
                                                ]
                                            })
                                        ]
                                    }, s("div", i)),
                                    j
                                ]
                            }, s("div", a)), O = s("button", {
                                type: "button",
                                class: "cbi-button cbi-button-apply",
                                onclick: ()=>q(!1),
                                children: _("Read MIB")
                            }), R = s("button", {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                onclick: ()=>q(!0),
                                children: _("Read MIB and VLAN tables")
                            }), P = (c = {
                                class: "onu-mib-panel",
                                children: [
                                    (d = {
                                        class: "mib-controls",
                                        children: [
                                            (l = {
                                                class: "mib-action-group",
                                                children: [
                                                    O,
                                                    R,
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
                                mib: P,
                                raw: M
                            }, I = new Map();
                            function A(e) {
                                for (let [t, r] of Object.entries(N))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                                for (let [t, r] of I)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
                            }
                            let T = (p = {
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
                                                t.preventDefault(), A(e.id);
                                            },
                                            children: e.label
                                        })
                                    }, s("li", t));
                                    return I.set(e.id, r), r;
                                })
                            }, s("ul", p)), D = (b = {
                                children: [
                                    s("div", {
                                        class: "onu-details-header",
                                        children: T
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
				${rT}
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
                                            P,
                                            M
                                        ]
                                    }, s("div", u)),
                                    (f = {
                                        class: "right onu-details-footer",
                                        children: s("button", {
                                            type: "button",
                                            class: "cbi-button",
                                            onclick: ()=>{
                                                h = !0, $ && URL.revokeObjectURL($), $ = null, v = null, j.textContent = "", z.replaceChildren(), L.ui.hideModal();
                                            },
                                            children: _("Close")
                                        })
                                    }, s("div", f))
                                ]
                            }, s(o, b)), U = ()=>!h && D.isConnected && D.getClientRects().length > 0;
                            async function q(t) {
                                if (!m) {
                                    m = !0, O.disabled = R.disabled = !0, k.style.display = "", k.title = "0%", k.firstElementChild.style.width = "0%", x.textContent = _("Reading MIB\u2026");
                                    try {
                                        let m = await rJ(), w = m.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                        if (w?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                        if (!U()) return;
                                        let S = await rX(w.onu_id, w.serial_number, t);
                                        y = S.job;
                                        let $ = Date.now() + 140000;
                                        for(; U();){
                                            let e = await rH(S.job, 0);
                                            if (!U()) return;
                                            if ("ready" === e.status) {
                                                var r, n, i, a, o, l, d, c, p, u, f, b, g, h;
                                                if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                let t = new Uint8Array(e.bytes), m = 0;
                                                for(let r = 0; r < e.chunks; r++){
                                                    let n = 0 === r ? e : await rH(S.job, r);
                                                    if (!U()) return;
                                                    if ("ready" !== n.status || n.chunk !== r || n.chunks !== e.chunks || n.bytes !== e.bytes || !n.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                    let i = atob(n.data);
                                                    if (i.length > 32768 || m + i.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                    for(let e = 0; e < i.length; e++)t[m++] = i.charCodeAt(e);
                                                    let a = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                                    k.title = `${a}%`, k.firstElementChild.style.width = `${a}%`, x.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                                }
                                                if (m !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                if (await B(), v = t8.parse(rq(JSON.parse(new TextDecoder("utf-8", {
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
                                                                                        children: rm(r.name)
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
                                                                                                                            return rm(e.value);
                                                                                                                        case "octets":
                                                                                                                            return rm(e.hex);
                                                                                                                        case "table_length":
                                                                                                                            return rm(e.bytes);
                                                                                                                        default:
                                                                                                                            throw new rU("unexpected_variant", `Unexpected variant: ${String(e)}`);
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
                                                                                                                        children: rY(e.observations)
                                                                                                                    }, s("pre", o))
                                                                                                                ]
                                                                                                            }, s("details", l)) : null
                                                                                                        ]
                                                                                                    }, s("td", d)),
                                                                                                    (c = {
                                                                                                        class: "mib-attr-ref",
                                                                                                        children: r1(e.definition)
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
                                                                                                e.collected ? `${e.rows.length} ${_("rows")}` : rm(e.error)
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
                                                                                                                        children: rm(e.filter_ethertype)
                                                                                                                    }, s("td", n)),
                                                                                                                    (i = {
                                                                                                                        children: rm(e.tags_to_remove)
                                                                                                                    }, s("td", i)),
                                                                                                                    (a = {
                                                                                                                        children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                                    }, s("td", a)),
                                                                                                                    (o = {
                                                                                                                        children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                                    }, s("td", o)),
                                                                                                                    (l = {
                                                                                                                        children: rm(e.delete_entry)
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
                                                                                                r1(e.attribute)
                                                                                            ]
                                                                                        }, s("p", g)),
                                                                                        (h = {
                                                                                            class: "mib-pre",
                                                                                            children: rY(e.vlan_rules.length ? e.vlan_rules : e.rows)
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
                                                                                        children: rY({
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
                                                            children: rY(v.diagnostics)
                                                        }, s("pre", g))
                                                    ]
                                                }, s("details", h))), n = v, j.textContent = rY({
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
                                            if (Date.now() >= $) throw Error(_("MIB query timed out; retry."));
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
                                        await B(), m = !1, O.disabled = R.disabled = !1;
                                    }
                                }
                            }
                            async function B() {
                                if (!y) return;
                                let e = y;
                                y = null;
                                try {
                                    await rQ(e);
                                } catch (e) {
                                    console.warn("Failed to release MIB snapshot", e);
                                }
                            }
                            A(g), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, D, "modal-wide");
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
            d.textContent = void 0 !== n ? _("Unpin") : _("Pin"), d.hidden = !t, d.disabled = !L.hasViewPermission(), d.title = n !== t?.active[r] ? _("Pending restart") : void 0 !== n ? _("Fixed interface") : _("Pin interface"), x.setAttribute("data-fttr-onu-id", String(e.onu_id)), c.textContent = String(e.onu_id), p.textContent = rm(e.vendor), u.textContent = rm(e.identity?.equipment_id ?? e.model), f.textContent = rm(e.serial_number);
            let i = rj(e.state);
            rk(b, i.tone, i.label, i.title);
            let o = r$(e.business_status);
            rk(g, o.tone, o.label, o.title);
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
            h.textContent = s.display, s.full ? h.setAttribute("title", s.full) : h.removeAttribute("title"), m.textContent = rm(e.data_path?.interface);
            let k = rO(e.management);
            rk(v, k.tone, k.label, k.title);
            let z = rE(e.provisioning);
            rk(y, z.tone, z.label, z.title);
            let j = rI(e.wifi_sync);
            rk(w, j.tone, j.label, j.title);
        }
    };
    return k.update(e), k;
}
let nr = null, nn = null, ni = !1;
const main = r9.extend({
    async load () {
        let [e, t] = await Promise.all([
            rJ(),
            rG().catch((e)=>(console.warn("Failed to load network device details", e), {}))
        ]);
        return {
            status: e,
            devices: t
        };
    },
    render (e) {
        var t, r, n, i, a, o, l, d, c, p, u, f, b, g;
        let h, m, v, y, w, x, k, z, j, S, $, C, M, O, R;
        return t = e.status, r = e.devices, h = t.optical_transceiver ?? {}, m = r, v = function(e, t) {
            var r, n, i, a, o;
            let l = new Map();
            for (let r of e)l.set(r.onu_id, nt(r, t));
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
                        e || (e = nt(i, t), l.set(i.onu_id, e)), e.update(i, r);
                        let a = p.children.item(n);
                        a !== e.element && p.insertBefore(e.element, a);
                    }
                }
            };
        }(t.sub_gateways ?? [], (e)=>R(e, m)), y = Array.from({
            length: 16
        }, (e, t)=>{
            var r, n, i, a, o, l, d, c, p, u, f, b, g, h, m, v, y, w;
            let x, k, z, j, S, $, C, M, O, R, P, N, I, A, T, D, U, q, B;
            return r = t + 1, x = s("span", {}), k = s("span", {
                style: "display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:90%",
                children: _("Unknown")
            }), z = s("img", {
                src: "/luci-static/resources/icons/port_down.svg",
                alt: "",
                "aria-hidden": "true"
            }), j = s("div", {
                style: "flex:1;height:3px;opacity:0.25;background-color:rgb(240, 144, 144)"
            }), S = s("span", {}), $ = s("span", {}), C = s("span", {}), M = s("span", {}), O = s("span", {}), R = s("span", {}), P = s("span", {}), N = s("span", {}), I = s("span", {}), A = s("span", {}), T = s("span", {}), D = s("span", {}), U = s("span", {}), q = s("span", {}), (w = {
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
                                    S,
                                    s("br", {}),
                                    s("strong", {
                                        children: [
                                            _("ONU"),
                                            ": "
                                        ]
                                    }),
                                    $,
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
                                                M
                                            ]
                                        }),
                                        s("div", {
                                            style: "white-space:nowrap",
                                            children: [
                                                "\u25BC\u202F",
                                                O
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
                                                    R
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
                                                    P
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
                                            (p = {
                                                class: "nowrap",
                                                children: [
                                                    s("strong", {
                                                        children: [
                                                            _("Receive dropped"),
                                                            ": "
                                                        ]
                                                    }),
                                                    A
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
                                                    T
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
                                                    q
                                                ]
                                            }, s("span", g))
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
                    var n;
                    let i = (e.switch_ports ?? []).find((e)=>e.port === r), a = i?.interface ?? `fttr${r}`, o = t[a], s = o?.stats, l = i?.carrier ?? o?.carrier ?? (o?.link?.speed !== void 0 || void 0), d = (e.sub_gateways ?? []).find((e)=>e.onu_id === i?.onu_id), c = !0 === l, p = s?.rx_bytes, u = s?.tx_bytes;
                    i?.onu_id !== void 0 ? B.setAttribute("data-active-onu-id", String(i.onu_id)) : B.removeAttribute("data-active-onu-id"), c ? (B.classList.add("port-up"), B.classList.remove("port-down")) : (B.classList.add("port-down"), B.classList.remove("port-up")), x.textContent = a, z.setAttribute("src", `/luci-static/resources/icons/${c ? "port_up.svg" : "port_down.svg"}`), k.textContent = c ? o?.link?.speed !== void 0 ? void 0 === (n = o.link.speed) || !Number.isFinite(n) || n <= 0 ? _("Unknown") : n >= 1000 ? `${n / 1000}\u{202F}GbE` : `${n}\u{202F}MbE` : _("Connected") : !1 === l ? _("Disconnected") : _("Unknown"), k.setAttribute("title", _("\u901F\u5EA6\uFF1A%s Mbit/s\uFF0C\u53CC\u5DE5\uFF1A%s").format(rm(o?.link?.speed), rm(o?.link?.duplex))), j.style.opacity = c ? "1" : "0.25", j.style.backgroundColor = c ? "rgb(46, 204, 113)" : "rgba(200, 200, 200, 0.4)", S.textContent = rm((i?.reserved_sn && void 0 === i.onu_id ? _("Reserved (offline)") : i?.link_state) ?? i?.status ?? (o ? l ? _("Link up") : _("Link down") : _("Unavailable"))), i?.reserved_sn && void 0 !== i.onu_id && (S.textContent += ` \xb7 ${_("Fixed interface")}`), $.textContent = rm(i?.onu_sn ?? d?.serial_number ?? i?.reserved_sn ?? i?.onu_id), B.title = i?.reserved_sn ? `${_("Reserved")}: ${i.reserved_sn}` : "", C.textContent = rm(o?.mac), M.textContent = c || u ? ry(u) : "\u2014", O.textContent = c || p ? ry(p) : "\u2014", R.textContent = ry(p), P.textContent = rw(s?.rx_packets), N.textContent = rw(s?.rx_multicast ?? s?.multicast), I.textContent = rw(s?.rx_errors), A.textContent = rw(s?.rx_dropped), T.textContent = ry(u), D.textContent = rw(s?.tx_packets), U.textContent = rw(s?.tx_errors), q.textContent = rw(s?.tx_dropped);
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
        }, j = s("div", o), S = s("span", {
            class: "fttr-badge"
        }), $ = s("span", {
            children: rm(h.model)
        }), C = s("span", {
            class: "fttr-badge"
        }), M = s("p", {
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

				${rT}

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
                M,
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
                                                children: S
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
                                                children: $
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
        }, O = s("div", g), (R = (e, t)=>{
            m = t;
            let r = e.optical_transceiver, n = e.provisioning, i = e.onu_pinning;
            for (let a of (M.textContent = i ? [
                i.allocation_blocked ? _("ONU allocation blocked by invalid startup configuration.") : "",
                i.pending_restart ? _("Fixed interface changes pending FTTR restart.") : "",
                i.startup_error || i.config_error || ""
            ].filter(Boolean).join(" ") : "", M.hidden = !M.textContent, n ? (rk(w, n.enabled ? "success" : "neutral", n.enabled ? _("Enabled") : _("Disabled")), x.textContent = rm(n.mode), k.textContent = rm(n.revision), n.error ? (z.textContent = n.error, z.style.display = "") : z.style.display = "none", j.style.display = "") : j.textContent = _("Provisioning status unavailable"), "ready" === e.fpga_status ? rk(S, "success", _("Ready")) : e.fpga_status ? rk(S, "neutral", rm(e.fpga_status)) : rk(S, "none", "\u2014"), $.textContent = rm(r.model), null == r.cdr_locked ? rk(C, "none", _("Unknown")) : r.cdr_locked ? rk(C, "success", _("Locked")) : rk(C, "warning", _("Unlocked")), v.update(e.sub_gateways ?? [], e.onu_pinning), y))a.update(e, t);
        })(t, r), nr = (nn = {
            element: O,
            update: R
        }).element, ne.add(async ()=>{
            if (ni || !nr?.isConnected || !nn) return;
            let e = nn;
            ni = !0;
            try {
                let [t, r] = await Promise.all([
                    rJ(),
                    rG().catch(()=>({}))
                ]);
                nn === e && e.element.isConnected && e.update(t, r);
            } catch (e) {
                console.error("Failed to refresh FTTR status", e);
            } finally{
                ni = !1;
            }
        }, 10), nr;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;