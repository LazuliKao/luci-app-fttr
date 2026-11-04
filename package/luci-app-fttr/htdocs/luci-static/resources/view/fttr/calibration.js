'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, r, a, i, n;
const s = Symbol.for("jsx.fragment");
function o(e, t) {
    let { children: r, ...a } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, i = function e(t) {
        let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let a of t)null != a && "boolean" != typeof a && (Array.isArray(a) ? e(a, r) : r.push(a instanceof Node ? a : String(a)));
        return r;
    }(null == r ? [] : Array.isArray(r) ? r : [
        r
    ]);
    if (e === s) {
        let e = document.createDocumentFragment();
        return e.append(...i), e;
    }
    if ("function" == typeof e) {
        let t = Reflect.apply(e, void 0, [
            {
                ...a,
                children: i
            }
        ]);
        if (!(t instanceof Node)) throw TypeError("JSX components must return a DOM Node");
        return t;
    }
    if ("string" != typeof e) throw TypeError("JSX element types must be tag names or component functions");
    let n = {}, o = {
        ...a
    };
    for (let [e, t] of Object.entries(o))e.startsWith("on") && "function" == typeof t ? (n[e] = t, delete o[e]) : "boolean" == typeof t && (t ? o[e] = e : delete o[e]);
    let l = Object.keys(o).length > 0 ? i.length > 1 ? E(e, o, i) : E(e, o, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
    for (let [e, t] of Object.entries(n)){
        let r = e.slice(2).toLowerCase();
        l.addEventListener(r, t);
    }
    return l;
}
function l(e, t, r) {
    function a(r, a) {
        if (r._zod || Object.defineProperty(r, "_zod", {
            value: {
                def: a,
                constr: s,
                traits: new Set()
            },
            enumerable: !1
        }), r._zod.traits.has(e)) return;
        r._zod.traits.add(e), t(r, a);
        let i = s.prototype, n = Object.keys(i);
        for(let e = 0; e < n.length; e++){
            let t = n[e];
            t in r || (r[t] = i[t].bind(r));
        }
    }
    let i = r?.Parent ?? Object;
    class n extends i {
    }
    function s(e) {
        var t;
        let i = r?.Parent ? new n() : this;
        for (let r of (a(i, e), (t = i._zod).deferred ?? (t.deferred = []), i._zod.deferred))r();
        return i;
    }
    return Object.defineProperty(n, "name", {
        value: e
    }), Object.defineProperty(s, "init", {
        value: a
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
const h = Symbol("evaluating");
function m(e, t, r) {
    let a;
    Object.defineProperty(e, t, {
        get () {
            if (a !== h) return void 0 === a && (a = h, a = r()), a;
        },
        set (r) {
            Object.defineProperty(e, t, {
                value: r
            });
        },
        configurable: !0
    });
}
const g = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
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
    let a = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (a.message = k(e.inst?._zod.def?.error?.(e)) ?? k(t?.error?.(e)) ?? k(r.customError?.(e)) ?? k(r.localeError?.(e)) ?? "Invalid input"), delete a.inst, delete a.continue, t?.reportInput || delete a.input, a;
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
}, S = l("$ZodError", j), C = l("$ZodError", j, {
    Parent: Error
}), A = (r = C, (e, t, a, i)=>{
    let n = a ? Object.assign(a, {
        async: !1
    }) : {
        async: !1
    }, s = e._zod.run({
        value: t,
        issues: []
    }, n);
    if (s instanceof Promise) throw new d();
    if (s.issues.length) {
        let e = new (i?.Err ?? r)(s.issues.map((e)=>z(e, n, p())));
        throw g(e, i?.callee), e;
    }
    return s.value;
}), P = (a = C, async (e, t, r, i)=>{
    let n = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, s = e._zod.run({
        value: t,
        issues: []
    }, n);
    if (s instanceof Promise && (s = await s), s.issues.length) {
        let e = new (i?.Err ?? a)(s.issues.map((e)=>z(e, n, p())));
        throw g(e, i?.callee), e;
    }
    return s.value;
}), U = (i = C, (e, t, r)=>{
    let a = r ? {
        ...r,
        async: !1
    } : {
        async: !1
    }, n = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (n instanceof Promise) throw new d();
    return n.issues.length ? {
        success: !1,
        error: new (i ?? S)(n.issues.map((e)=>z(e, a, p())))
    } : {
        success: !0,
        data: n.value
    };
}), O = (n = C, async (e, t, r)=>{
    let a = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, i = e._zod.run({
        value: t,
        issues: []
    }, a);
    return i instanceof Promise && (i = await i), i.issues.length ? {
        success: !1,
        error: new n(i.issues.map((e)=>z(e, a, p())))
    } : {
        success: !0,
        data: i.value
    };
}), T = /^-?\d+(?:\.\d+)?$/, N = /^(?:true|false)$/i, M = /^null$/i, R = {
    major: 4,
    minor: 3,
    patch: 6
}, $ = l("$ZodType", (e, t)=>{
    var r;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = R;
    let a = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && a.unshift(e), a))for (let r of t._zod.onattach)r(e);
    if (0 === a.length) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, r)=>{
            let a, i = w(e);
            for (let n of t){
                if (n._zod.def.when) {
                    if (!n._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, s = n._zod.check(e);
                if (s instanceof Promise && r?.async === !1) throw new d();
                if (a || s instanceof Promise) a = (a ?? Promise.resolve()).then(async ()=>{
                    await s, e.issues.length !== t && (i || (i = w(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = w(e, t));
                }
            }
            return a ? a.then(()=>e) : e;
        }, r = (r, i, n)=>{
            if (w(r)) return r.aborted = !0, r;
            let s = t(i, a, n);
            if (s instanceof Promise) {
                if (!1 === n.async) throw new d();
                return s.then((t)=>e._zod.parse(t, n));
            }
            return e._zod.parse(s, n);
        };
        e._zod.run = (i, n)=>{
            if (n.skipChecks) return e._zod.parse(i, n);
            if ("backward" === n.direction) {
                let t = e._zod.parse({
                    value: i.value,
                    issues: []
                }, {
                    ...n,
                    skipChecks: !0
                });
                return t instanceof Promise ? t.then((e)=>r(e, i, n)) : r(t, i, n);
            }
            let s = e._zod.parse(i, n);
            if (s instanceof Promise) {
                if (!1 === n.async) throw new d();
                return s.then((e)=>t(e, a, n));
            }
            return t(s, a, n);
        };
    }
    m(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let r = U(e, t);
                    return r.success ? {
                        value: r.data
                    } : {
                        issues: r.error?.issues
                    };
                } catch (r) {
                    return O(e, t).then((e)=>e.success ? {
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
    var r;
    let a;
    $.init(e, t), e._zod.pattern = [
        ...e?._zod.bag?.patterns ?? []
    ].pop() ?? (a = (r = e._zod.bag) ? `[\\s\\S]{${r?.minimum ?? 0},${r?.maximum ?? ""}}` : "[\\s\\S]*", RegExp(`^${a}$`)), e._zod.parse = (r, a)=>{
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
}), D = l("$ZodNumber", (e, t)=>{
    $.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? T, e._zod.parse = (r, a)=>{
        if (t.coerce) try {
            r.value = Number(r.value);
        } catch (e) {}
        let i = r.value;
        if ("number" == typeof i && !Number.isNaN(i) && Number.isFinite(i)) return r;
        let n = "number" == typeof i ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : "Infinity" : void 0;
        return r.issues.push({
            expected: "number",
            code: "invalid_type",
            input: i,
            inst: e,
            ...n ? {
                received: n
            } : {}
        }), r;
    };
}), F = l("$ZodBoolean", (e, t)=>{
    $.init(e, t), e._zod.pattern = N, e._zod.parse = (r, a)=>{
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
    $.init(e, t), e._zod.pattern = M, e._zod.values = new Set([
        null
    ]), e._zod.parse = (t, r)=>{
        let a = t.value;
        return null === a || t.issues.push({
            expected: "null",
            code: "invalid_type",
            input: a,
            inst: e
        }), t;
    };
}), I = l("$ZodUnknown", (e, t)=>{
    $.init(e, t), e._zod.parse = (e)=>e;
});
function q(e, t, r) {
    e.issues.length && t.issues.push(...x(r, e.issues)), t.value[r] = e.value;
}
const X = l("$ZodArray", (e, t)=>{
    $.init(e, t), e._zod.parse = (r, a)=>{
        let i = r.value;
        if (!Array.isArray(i)) return r.issues.push({
            expected: "array",
            code: "invalid_type",
            input: i,
            inst: e
        }), r;
        r.value = Array(i.length);
        let n = [];
        for(let e = 0; e < i.length; e++){
            let s = i[e], o = t.element._zod.run({
                value: s,
                issues: []
            }, a);
            o instanceof Promise ? n.push(o.then((t)=>q(t, r, e))) : q(o, r, e);
        }
        return n.length ? Promise.all(n).then(()=>r) : r;
    };
});
function H(e, t, r, a, i) {
    if (e.issues.length) {
        if (i && !(r in a)) return;
        t.issues.push(...x(r, e.issues));
    }
    void 0 === e.value ? r in a && (t.value[r] = void 0) : t.value[r] = e.value;
}
const V = l("$ZodObject", (e, t)=>{
    var r;
    let a;
    $.init(e, t);
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
    let n = (r = ()=>(function(e) {
            var t;
            let r = Object.keys(e.shape);
            for (let t of r)if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${t}": expected a Zod schema`);
            let a = Object.keys(t = e.shape).filter((e)=>"optional" === t[e]._zod.optin && "optional" === t[e]._zod.optout);
            return {
                ...e,
                keys: r,
                keySet: new Set(r),
                numKeys: r.length,
                optionalKeys: new Set(a)
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
    m(e._zod, "propValues", ()=>{
        let e = t.shape, r = {};
        for(let t in e){
            let a = e[t]._zod;
            if (a.values) for (let e of (r[t] ?? (r[t] = new Set()), a.values))r[t].add(e);
        }
        return r;
    });
    let s = t.catchall;
    e._zod.parse = (t, r)=>{
        a ?? (a = n.value);
        let i = t.value;
        if (!b(i)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: i,
            inst: e
        }), t;
        t.value = {};
        let o = [], l = a.shape;
        for (let e of a.keys){
            let a = l[e], n = "optional" === a._zod.optout, s = a._zod.run({
                value: i[e],
                issues: []
            }, r);
            s instanceof Promise ? o.push(s.then((r)=>H(r, t, e, i, n))) : H(s, t, e, i, n);
        }
        return s ? function(e, t, r, a, i, n) {
            let s = [], o = i.keySet, l = i.catchall._zod, d = l.def.type, c = "optional" === l.optout;
            for(let i in t){
                if (o.has(i)) continue;
                if ("never" === d) {
                    s.push(i);
                    continue;
                }
                let n = l.run({
                    value: t[i],
                    issues: []
                }, a);
                n instanceof Promise ? e.push(n.then((e)=>H(e, r, i, t, c))) : H(n, r, i, t, c);
            }
            return (s.length && r.issues.push({
                code: "unrecognized_keys",
                keys: s,
                input: t,
                inst: n
            }), e.length) ? Promise.all(e).then(()=>r) : r;
        }(o, i, t, r, n.value, e) : o.length ? Promise.all(o).then(()=>t) : t;
    };
});
function W(e, t, r, a) {
    for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
    let i = e.filter((e)=>!w(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: r,
        errors: e.map((e)=>e.issues.map((e)=>z(e, a, p())))
    }), t);
}
const J = l("$ZodUnion", (e, t)=>{
    $.init(e, t), m(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), m(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), m(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), m(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>f(e.source)).join("|")})$`);
        }
    });
    let r = 1 === t.options.length, a = t.options[0]._zod.run;
    e._zod.parse = (i, n)=>{
        if (r) return a(i, n);
        let s = !1, o = [];
        for (let e of t.options){
            let t = e._zod.run({
                value: i.value,
                issues: []
            }, n);
            if (t instanceof Promise) o.push(t), s = !0;
            else {
                if (0 === t.issues.length) return t;
                o.push(t);
            }
        }
        return s ? Promise.all(o).then((t)=>W(t, i, e, n)) : W(o, i, e, n);
    };
}), K = l("$ZodRecord", (e, t)=>{
    $.init(e, t), e._zod.parse = (r, a)=>{
        let i = r.value;
        if (!function(e) {
            if (!1 === b(e)) return !1;
            let t = e.constructor;
            if (void 0 === t || "function" != typeof t) return !0;
            let r = t.prototype;
            return !1 !== b(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
        }(i)) return r.issues.push({
            expected: "record",
            code: "invalid_type",
            input: i,
            inst: e
        }), r;
        let n = [], s = t.keyType._zod.values;
        if (s) {
            let o;
            r.value = {};
            let l = new Set();
            for (let e of s)if ("string" == typeof e || "number" == typeof e || "symbol" == typeof e) {
                l.add("number" == typeof e ? e.toString() : e);
                let s = t.valueType._zod.run({
                    value: i[e],
                    issues: []
                }, a);
                s instanceof Promise ? n.push(s.then((t)=>{
                    t.issues.length && r.issues.push(...x(e, t.issues)), r.value[e] = t.value;
                })) : (s.issues.length && r.issues.push(...x(e, s.issues)), r.value[e] = s.value);
            }
            for(let e in i)l.has(e) || (o = o ?? []).push(e);
            o && o.length > 0 && r.issues.push({
                code: "unrecognized_keys",
                input: i,
                inst: e,
                keys: o
            });
        } else for (let s of (r.value = {}, Reflect.ownKeys(i))){
            if ("__proto__" === s) continue;
            let o = t.keyType._zod.run({
                value: s,
                issues: []
            }, a);
            if (o instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof s && T.test(s) && o.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(s),
                    issues: []
                }, a);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (o = e);
            }
            if (o.issues.length) {
                "loose" === t.mode ? r.value[s] = i[s] : r.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: o.issues.map((e)=>z(e, a, p())),
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
            }, a);
            l instanceof Promise ? n.push(l.then((e)=>{
                e.issues.length && r.issues.push(...x(s, e.issues)), r.value[o.value] = e.value;
            })) : (l.issues.length && r.issues.push(...x(s, l.issues)), r.value[o.value] = l.value);
        }
        return n.length ? Promise.all(n).then(()=>r) : r;
    };
}), G = l("$ZodLiteral", (e, t)=>{
    if ($.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let r = new Set(t.values);
    e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? y(e) : e ? y(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (a, i)=>{
        let n = a.value;
        return r.has(n) || a.issues.push({
            code: "invalid_value",
            values: t.values,
            input: n,
            inst: e
        }), a;
    };
});
function Q(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const Y = l("$ZodOptional", (e, t)=>{
    $.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", m(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), m(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${f(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, r)=>{
        if ("optional" === t.innerType._zod.optin) {
            let a = t.innerType._zod.run(e, r);
            return a instanceof Promise ? a.then((t)=>Q(t, e.value)) : Q(a, e.value);
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
            let a = {
                ...r,
                ...this._map.get(e)
            };
            return Object.keys(a).length ? a : void 0;
        }
        return this._map.get(e);
    }
    has(e) {
        return this._map.has(e);
    }
}());
const ee = l("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    $.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>A(e, t, r, {
            callee: e.parse
        }), e.safeParse = (t, r)=>U(e, t, r), e.parseAsync = async (t, r)=>P(e, t, r, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, r)=>O(e, t, r), e.check = (...r)=>e.clone({
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
        let a;
        return a = new e._zod.constr(t ?? e._zod.def), (!t || r?.parent) && (a._zod.parent = e), a;
    }, e.brand = ()=>e, e.register = (t, r)=>(t.add(e, r), e), e.apply = (t)=>t(e);
}), et = l("ZodMiniString", (e, t)=>{
    Z.init(e, t), ee.init(e, t);
});
function er(e) {
    return new et({
        type: "string",
        ...v(e)
    });
}
const ea = l("ZodMiniNumber", (e, t)=>{
    D.init(e, t), ee.init(e, t);
});
function ei(e) {
    return new ea({
        type: "number",
        checks: [],
        ...v(e)
    });
}
const en = l("ZodMiniBoolean", (e, t)=>{
    F.init(e, t), ee.init(e, t);
});
function es(e) {
    return new en({
        type: "boolean",
        ...v(e)
    });
}
const eo = l("ZodMiniNull", (e, t)=>{
    B.init(e, t), ee.init(e, t);
});
function el(e) {
    return new eo({
        type: "null",
        ...v(e)
    });
}
const ed = l("ZodMiniUnknown", (e, t)=>{
    I.init(e, t), ee.init(e, t);
}), ec = l("ZodMiniArray", (e, t)=>{
    X.init(e, t), ee.init(e, t);
});
function ep(e, t) {
    return new ec({
        type: "array",
        element: e,
        ...v(t)
    });
}
const eu = l("ZodMiniObject", (e, t)=>{
    V.init(e, t), ee.init(e, t), m(e, "shape", ()=>t.shape);
});
function ef(e, t) {
    return new eu({
        type: "object",
        shape: e ?? {},
        ...v(t)
    });
}
const e_ = l("ZodMiniUnion", (e, t)=>{
    J.init(e, t), ee.init(e, t);
});
function eh(e, t) {
    return new e_({
        type: "union",
        options: e,
        ...v(t)
    });
}
const em = l("ZodMiniRecord", (e, t)=>{
    K.init(e, t), ee.init(e, t);
});
function eg(e, t, r) {
    return new em({
        type: "record",
        keyType: e,
        valueType: t,
        ...v(r)
    });
}
const eb = l("ZodMiniLiteral", (e, t)=>{
    G.init(e, t), ee.init(e, t);
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
]), ez = ef({
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
}), ej = ef({
    vlan: ei(),
    vlans: ep(ei()),
    priority: ei(),
    acs_url: er()
}), eS = ef({
    state: ek,
    optical_sn: er(),
    cwmp_id: er(),
    mqtt_target: eh([
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
    settings_verified_at: eh([
        ei(),
        el()
    ]),
    selected_vlan: eh([
        ei(),
        el()
    ]),
    last_inform: eh([
        ei(),
        el()
    ]),
    expected_acs_url: er(),
    last_error: eh([
        er(),
        el()
    ]),
    transport_epoch: ei(),
    completed_authorization: ei(),
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
    listener: ez,
    mqtt_last_seen: eh([
        ei(),
        el()
    ]),
    desired: ew(ej),
    endpoint_notice: ew(er()),
    manual_steps: ew(ep(er()))
}), eC = eh([
    ey("pending"),
    ey("unavailable")
]), eA = eh([
    eS,
    ef({
        state: eC,
        reason: er()
    })
]), eP = ef({
    id: er(),
    name: er()
}), eU = ef({
    configured: er(),
    effective: er(),
    available: ep(er()),
    reason: er()
}), eO = ef({
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
    generation: ei(),
    error: eh([
        er(),
        el()
    ])
}), eE = ef({
    success: es(),
    output: ew(er()),
    error: ew(er())
}), eT = eh([
    ey("factory"),
    ey("firmware"),
    ey("builtin")
]), eN = ef({
    detected: es(),
    device: er(),
    has_data: es(),
    sha256: er(),
    data: er()
}), eM = ef({
    exists: es(),
    path: er(),
    size: ei(),
    sha256: er(),
    data: er()
}), eR = ef({
    source: eT,
    active_path: er(),
    size: ei(),
    sha256: er(),
    data: er(),
    factory: eN,
    firmware: eM
}), e$ = ef({
    error: er()
});
eh([
    eR,
    e$
]);
const eZ = ef({
    success: es(),
    path: er(),
    size: ei(),
    sha256: er()
});
eh([
    eZ,
    e$
]), ef({
    data: er()
});
const eD = ef({
    acs: es(),
    mqtt: es(),
    npu: es(),
    "device-hl202": es(),
    "device-hwtc": es(),
    "device-star": es(),
    "device-zte": es(),
    "device-scty": es()
}), eF = ef({
    optical: es(),
    bridge_offload: es(),
    omci_mib: es(),
    mqtt_telemetry: es(),
    hl202_management: es(),
    cwmp: es(),
    command_provisioning: es()
}), eL = ef({
    status: es(),
    config: es(),
    sync: es(),
    hardware: es(),
    calibration: es(),
    hl202: es(),
    about: es()
}), eB = ef({
    schema_version: ey(1),
    version: er(),
    features: eD,
    functions: eF,
    pages: eL,
    adapters: ep(eP)
}), eI = eh([
    ef({
        valid: ey(!0),
        revision: er(),
        devices: ei()
    }),
    ef({
        error: er()
    })
]), eq = eh([
    ey("auto"),
    ey("manual")
]), eX = ey("diff"), eH = ef({
    state: er(),
    enabled: es(),
    reason: ew(eh([
        er(),
        el()
    ])),
    revision: ew(er()),
    vlan: ew(ei()),
    updated_at: ew(ei())
}), eV = eh([
    ey("online"),
    ey("waiting_inform"),
    ey("offline_or_stale"),
    ey("waiting_transport")
]), eW = ef({
    cwmp_id: er(),
    state: eV,
    optical_online: es(),
    last_inform: eh([
        ei(),
        el()
    ]),
    age_seconds: eh([
        ei(),
        el()
    ])
}), eJ = eh([
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
]), eK = eh([
    ey("device_service"),
    ey("ssid"),
    ey("port_binding"),
    ey("wan_activation")
]), eG = ef({
    name: er(),
    desired: er()
}), eQ = ef({
    id: er(),
    name: ew(eh([
        er(),
        el()
    ])),
    kind: eK,
    service_type: er(),
    state: er(),
    reason: ew(er()),
    revision: ew(er()),
    current_revision: ew(es()),
    management_fresh: ew(es()),
    operation_id: ew(ei()),
    task_id: ew(eh([
        ei(),
        el()
    ])),
    updated_at: ew(ei()),
    changes: ew(ep(eG))
}), eY = eh([
    ey("plan"),
    ey("apply")
]), e0 = ef({
    wan: er(),
    wlan: er(),
    binding: er()
}), e1 = ef({
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
        e0,
        el()
    ])
}), e2 = ef({
    parent: ei(),
    connection: ei(),
    state: er(),
    service_list: er(),
    kind: er(),
    baseline: eh([
        ep(ei()),
        el()
    ])
}), e6 = ef({
    state: er(),
    reason: ew(er()),
    task_id: ew(eh([
        ei(),
        el()
    ])),
    instance: ew(ei()),
    cwmp_id: ew(er())
}), e4 = eh([
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
]), e8 = ef({
    owned: ep(ei()),
    pending: eh([
        er(),
        el()
    ]),
    pending_instance: eh([
        ei(),
        el()
    ])
}), e5 = eh([
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
]), e3 = eh([
    ey("disable"),
    ey("preserve"),
    ey("delete")
]), e7 = ef({
    parent: ei(),
    child: ei(),
    service: er(),
    vlan: er()
}), e9 = ef({
    state: eJ,
    items: ep(eQ),
    backend: ew(eU),
    operation_id: ew(ei()),
    device: ew(er()),
    optical_sn: ew(er()),
    cwmp_id: ew(er()),
    revision: ew(er()),
    mode: ew(eY),
    started_at: ew(ei()),
    completed_at: ew(eh([
        ei(),
        el()
    ])),
    current_revision: ew(es()),
    management_fresh: ew(es()),
    reason: ew(er()),
    error: ew(er()),
    attempts: ew(ei()),
    next_retry_at: ew(ei()),
    reconcile_reason: ew(er()),
    cwmp_contract: ew(e1),
    wan_objects: ew(eg(er(), e2)),
    wan_lifecycle: ew(eg(er(), e6)),
    wan_stage: ew(e4),
    wifi_objects: ew(e8),
    wifi_lifecycle: ew(eg(er(), e6)),
    wifi_stage: ew(e5),
    wifi_cleanup: ew(e3),
    native_ownership: ew(eg(er(), e7)),
    write_performed: ew(es()),
    readback_verified: ew(es())
}), te = eh([
    ey("not_configured"),
    ey("stale_revision"),
    ey("stale_management"),
    ey("verified"),
    ey("attention_required"),
    ey("accepted_unverified"),
    ey("pending"),
    ey("recovering"),
    ey("waiting_management")
]), tt = ef({
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
    omci_management: eH,
    management: eh([
        eW,
        el()
    ]),
    acs_bootstrap: eA,
    provisioning: e9,
    services: ep(eQ),
    ssids: ep(eQ),
    wifi_sync: te
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
]), ta = ef({
    enabled: es(),
    mode: eq,
    vlan: ep(ei()),
    priority: ei(),
    address: er(),
    acs_url: er(),
    port: ei(),
    path: er(),
    dhcp_enabled: es()
}), ti = ef({
    operation: er(),
    key: er(),
    value: ep(er())
}), tn = ef({
    state: tr,
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
    next_retry_at: ei(),
    attempts: ei(),
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
}), ts = ef({
    desired: eh([
        ej,
        el()
    ]),
    state: er()
}), to = ef({
    id: er(),
    name: eh([
        er(),
        el()
    ]),
    template: er()
}), tl = ef({
    enabled: es(),
    mode: eq,
    method: eX,
    revision: er(),
    triggers: ep(er()),
    interval_minutes: ei(),
    error: eh([
        er(),
        el()
    ]),
    devices: ep(tt),
    management_network: tn,
    omci_management: ts,
    groups: ep(to),
    pending_devices: ep(er()),
    onu_pins: ew(eg(er(), ei())),
    config_error: ew(eh([
        er(),
        el()
    ]))
});
eh([
    tl,
    e$
]);
const td = ef({
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
}), tc = ef({
    entity_id: ei(),
    port_id: eh([
        ei(),
        el()
    ])
}), tp = ef({
    entity_id: ei(),
    filter_list_hex: eh([
        er(),
        el()
    ]),
    forward_operation: eh([
        ei(),
        el()
    ]),
    number_of_entries: eh([
        ei(),
        el()
    ])
}), tu = ef({
    entity_id: ei(),
    received_frame_rules_hex: eh([
        ep(er()),
        el()
    ]),
    error: eh([
        er(),
        el()
    ])
}), tf = ef({
    age_seconds: ei(),
    gem_ports: ep(tc),
    vlan_filters: ep(tp),
    vlan_operations: ep(tu)
}), t_ = ef({
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
        ei(),
        el()
    ])
}), th = ef({
    interface: er(),
    gem_ports: eh([
        ep(ei()),
        el()
    ]),
    vlan_id: eh([
        ei(),
        el()
    ]),
    onu_inventory: eh([
        tf,
        el()
    ]),
    tx_bytes: eh([
        ei(),
        el()
    ]),
    rx_bytes: eh([
        ei(),
        el()
    ]),
    current_tx_kbps: eh([
        ei(),
        el()
    ]),
    current_rx_kbps: eh([
        ei(),
        el()
    ]),
    olt_channel_gem: ew(ei()),
    forwarding_verified: ew(es()),
    offload: td,
    measurements: eg(er(), t_)
});
ef({});
const tm = ef({
    entity_id: ei(),
    interval_end_time: ei(),
    corrected_bytes: ei(),
    corrected_code_words: ei(),
    uncorrectable_code_words: ei(),
    total_code_words: ei(),
    fec_seconds: ei()
}), tg = ef({
    ani_entity_id: eh([
        ei(),
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
        tm,
        el()
    ]),
    measurement: t_
}), tb = ef({
    entry: eh([
        ey(0),
        ey(1),
        ey(2)
    ]),
    username: er(),
    active: es()
}), ty = ef({
    mqtt_mac: er(),
    optical_sn: eh([
        er(),
        el()
    ]),
    onu_id: eh([
        ei(),
        el()
    ]),
    binding_generation: er(),
    last_seen: ei(),
    reason: er()
}), tv = eh([
    ey("executed"),
    ey("dispatched"),
    ey("timeout"),
    ey("error")
]), tw = ef({
    target: er(),
    status: tv,
    request_id: ew(er()),
    exit_code: ew(ei()),
    output: ew(er()),
    output_truncated: es(),
    error: ew(er())
}), tx = ef({
    target: ty,
    result: tw,
    binding_current: es()
}), tk = eh([
    ey("not_applicable"),
    ey("accepted_and_saved"),
    ey("unconfirmed")
]), tz = ef({
    code: er(),
    message: er()
});
eh([
    ef({
        schema_version: ey(1),
        operation: tx,
        accounts: eh([
            ep(tb),
            el()
        ]),
        write_status: tk
    }),
    ef({
        schema_version: ei(),
        error: tz
    })
]);
const tj = ef({
    optical_sn: er(),
    onu_id: ei(),
    binding_generation: er()
}), tS = ef({
    mqtt_mac: er(),
    binding_generation: er()
}), tC = eh([
    tj,
    tS
]);
ef({
    target: tC
});
const tA = eh([
    ef({
        kind: ey("exec"),
        script: er(),
        timeout_seconds: ei()
    }),
    ef({
        kind: ey("accounts_read")
    }),
    ef({
        kind: ey("account_set_password"),
        entry: ei(),
        password: er()
    }),
    ef({
        kind: ey("account_set_active"),
        entry: ei(),
        active: es()
    })
]), tP = ef({
    schema_version: ei(),
    target: tj,
    action: tA
}), tU = ef({
    optical_sn: er(),
    onu_id: ei(),
    model: er(),
    optical_online: es(),
    can_execute: es(),
    mqtt: eh([
        ty,
        el()
    ]),
    report_revision: eh([
        ei(),
        el()
    ])
});
eh([
    ef({
        schema_version: ey(1),
        operation: tx
    }),
    ef({
        schema_version: ei(),
        error: tz
    })
]), ef({
    target: tC,
    script: er(),
    timeout_seconds: ei()
});
const tO = eh([
    ef({
        schema_version: ey(1),
        devices: ep(tU),
        sources: ep(ty)
    }),
    ef({
        schema_version: ei(),
        error: tz
    })
]);
eh([
    ef({
        method: ey("list")
    }),
    ef({
        method: ey("report"),
        target: tj
    }),
    ef({
        method: ey("source_report"),
        target: tS
    }),
    ef({
        method: ey("run"),
        request: tP
    })
]);
const tE = eh([
    ey("received"),
    ey("report_unavailable")
]), tT = ef({
    value: new ed({
        type: "unknown"
    }),
    member: er(),
    unit: eh([
        er(),
        el()
    ])
}), tN = ef({
    name: er(),
    bytes: ei(),
    encoding: er(),
    text: eh([
        er(),
        el()
    ]),
    text_omitted: es()
}), tM = ef({
    schema_version: ei(),
    compressed_bytes: ei(),
    decompressed_bytes: ei(),
    fields: eg(er(), tT),
    members: ep(tN),
    errors: ep(er())
}), tR = ef({
    revision: ei(),
    last_received: ei(),
    last_processed_receipt: eh([
        ei(),
        el()
    ]),
    last_good: eh([
        ei(),
        el()
    ]),
    error: eh([
        er(),
        el()
    ]),
    report: eh([
        tM,
        el()
    ])
});
eh([
    ef({
        schema_version: ey(1),
        target: ty,
        report: eh([
            tR,
            el()
        ]),
        state: tE
    }),
    ef({
        schema_version: ey(1),
        target: ty,
        report: eh([
            tR,
            el()
        ]),
        read_only: ey(!0)
    }),
    ef({
        schema_version: ei(),
        error: tz
    })
]), ef({
    target: tC
}), ef({
    target: tC,
    kind: ex,
    entry: ei(),
    password: er(),
    active: es()
});
const t$ = ef({
    accepted: ei(),
    rejected: ei(),
    read_errors: ei(),
    handled: ei(),
    max_intake_us: ei(),
    max_handler_us: ei()
}), tZ = ey("pending"), tD = ef({
    phase: eh([
        ey("starting"),
        ey("upload"),
        ey("tables")
    ]),
    received: ei(),
    expected: eh([
        ei(),
        el()
    ])
}), tF = ey("ready"), tL = eh([
    ef({
        status: tZ,
        progress: ew(tD)
    }),
    ef({
        status: tF,
        chunk: ei(),
        chunks: ei(),
        bytes: ei(),
        data: er()
    })
]);
eh([
    tL,
    e$
]);
const tB = ef({
    status: tZ,
    job: er()
}), tI = ef({
    released: es()
});
ef({
    job: er()
}), ef({
    job: er(),
    chunk: ei()
}), eh([
    tB,
    e$
]);
const tq = ef({
    accepting: es(),
    running: ei(),
    stored: ei(),
    bytes: ei(),
    running_limit: ei(),
    stored_limit: ei(),
    bytes_limit: ei(),
    result_bytes_limit: ei()
}), tX = ef({
    mac: er(),
    ip: er(),
    band: er(),
    rssi_dbm: eh([
        ei(),
        el()
    ]),
    rx_rate_mbps: eh([
        ei(),
        el()
    ]),
    tx_rate_mbps: eh([
        ei(),
        el()
    ])
}), tH = eh([
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
]), tV = ef({
    id: er(),
    url: er()
}), tW = ef({
    name: er(),
    kind: tH,
    index: ei(),
    mask: ei(),
    size: ei(),
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
    reference: tV
}), tJ = eh([
    ef({
        type: ey("unsigned"),
        value: ei()
    }),
    ef({
        type: ey("signed"),
        value: ei()
    }),
    ef({
        type: ey("decimal"),
        value: er()
    }),
    ef({
        type: ey("text"),
        value: eh([
            er(),
            el()
        ])
    }),
    ef({
        type: ey("octets"),
        hex: er()
    }),
    ef({
        type: ey("table_length"),
        bytes: ei()
    })
]), tK = ef({
    raw_hex: er(),
    value: tJ,
    sequences: ep(ei())
}), tG = ef({
    definition: tW,
    value: eh([
        tJ,
        el()
    ]),
    observations: ep(tK)
}), tQ = eh([
    ey("layout"),
    ey("name_only"),
    ey("unknown")
]), tY = ef({
    class_id: ei(),
    name: eh([
        er(),
        el()
    ]),
    entities: ei(),
    records: ei(),
    support: tQ
}), t0 = ef({
    code: er(),
    message: er(),
    offset: ei(),
    mask: ei()
}), t1 = ef({
    class_id: ei(),
    entity_id: ei(),
    name: eh([
        er(),
        el()
    ]),
    support: tQ,
    reference: eh([
        tV,
        el()
    ]),
    sequences: ep(ei()),
    attributes: ep(tG),
    diagnostics: ep(t0)
}), t2 = ey("ready"), t6 = ef({
    class_id: ei(),
    entity_id: ei(),
    sequence: ei(),
    attribute_mask: ei(),
    raw_hex: er(),
    consumed: ei(),
    remaining_hex: er(),
    undecoded_mask: ei()
}), t4 = ef({
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
    delete_entry: es()
}), t8 = ef({
    class_id: ei(),
    entity_id: ei(),
    attribute: tW,
    collected: es(),
    error: eh([
        er(),
        el()
    ]),
    raw_hex: er(),
    rows: ep(er()),
    vlan_rules: ep(t4)
}), t5 = ef({
    schema_version: ey(1),
    reference_version: er(),
    onu_id: eh([
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
    entities: ep(t1),
    records: ep(t6),
    tables: ep(t8),
    diagnostics: ep(t0)
});
ef({
    status: t2,
    report: t5
}), ef({
    onu_id: ei(),
    optical_sn: er(),
    tables: es()
});
const t3 = eh([
    ef({
        status: ey("success"),
        enabled: es()
    }),
    ef({
        status: ey("error"),
        error: er()
    })
]);
ef({
    enabled: es(),
    bridge: er(),
    wan_upstream: es(),
    wan_downstream: es(),
    onu_bridge: es()
});
const t7 = ef({
    index: er(),
    state: er(),
    pkt_type: er(),
    orig_tuple: er(),
    new_tuple: er(),
    eth: er(),
    vlan: er(),
    packets: ei(),
    bytes: ei(),
    counters_valid: es(),
    packets_exact: er(),
    bytes_exact: er()
}), t9 = ef({
    sampled_at_ms: ei(),
    errors: ep(er()),
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
    bridge_offload_mask: ei(),
    routed_offload_mask: ei(),
    bridge_offload_debug: es(),
    bridge: er(),
    active_ports: ep(er()),
    fw4_hooks_ready: es(),
    total_entries: ei(),
    bound_entries: ei(),
    bound_ipv4_entries: ei(),
    bound_ipv6_entries: ei(),
    total_packets: ei(),
    total_bytes: ei(),
    bound_flows: ep(t7)
}), re = ef({
    equipment_id: eh([
        er(),
        el()
    ]),
    hardware_version: eh([
        er(),
        el()
    ]),
    software_images: ep(er()),
    omcc_version: eh([
        ei(),
        el()
    ]),
    errors: ep(er())
}), rt = ef({
    desired: eg(er(), ei()),
    active: eg(er(), ei()),
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
}), rr = eh([
    ey("optical_on"),
    ey("optical_off"),
    ey("optical_status"),
    ey("optical_reload"),
    ey("optical_reinitialize"),
    ey("optical_shutdown")
]), ra = eh([
    ey("success"),
    ey("error")
]), ri = eh([
    ey("enabled"),
    ey("disabled"),
    ey("unknown")
]), rn = ef({
    schema_version: ey(1),
    status: ra,
    action: rr,
    desired_enabled: eh([
        es(),
        el()
    ]),
    tx_enabled: eh([
        es(),
        el()
    ]),
    actor_state: ri,
    hardware_ready: es(),
    discovery_active: es(),
    cleanup_pending: es(),
    error: eh([
        tz,
        el()
    ])
});
ef({
    enabled: es()
});
const rs = ef({
    model: er(),
    wavelength_tx_nm: ei(),
    wavelength_rx_nm: ei(),
    phy_rate_downlink_gbps: ei(),
    phy_rate_uplink_gbps: ei(),
    tx_power_dbm: eh([
        ei(),
        el()
    ]),
    laser_bias_current_ma: eh([
        ei(),
        el()
    ]),
    temperature_celsius: eh([
        ei(),
        el()
    ]),
    vcc_voltage: eh([
        ei(),
        el()
    ]),
    cdr_locked: eh([
        es(),
        el()
    ]),
    tx_enabled: ew(es()),
    measurements: eg(er(), t_)
}), ro = eh([
    ey("o1_initial"),
    ey("o2_standby"),
    ey("o3_serial_number"),
    ey("o4_ranging"),
    ey("o5_operation"),
    ey("o6_intermittent_lods"),
    ey("o7_emergency_stop")
]), rl = ef({
    restarting: ey(!0)
}), rd = ef({
    calls: ei(),
    failures: ei(),
    last_us: ei(),
    max_us: ei(),
    total_us: ei()
}), rc = ef({
    port: ei(),
    interface: er(),
    carrier: es(),
    status: er(),
    onu_id: ew(ei()),
    onu_sn: ew(er()),
    link_state: er(),
    reserved_sn: ew(er())
}), rp = ef({
    channel_2g: eh([
        ei(),
        el()
    ]),
    channel_5g: eh([
        ei(),
        el()
    ]),
    bandwidth_5g: eh([
        er(),
        el()
    ]),
    tx_power_pct: eh([
        ei(),
        el()
    ]),
    measurements: eg(er(), t_)
}), ru = ef({
    onu_id: ei(),
    vendor: er(),
    model: er(),
    serial_number: er(),
    state: ro,
    business_status: eO,
    management: eh([
        eW,
        el()
    ]),
    provisioning: eh([
        e9,
        el()
    ]),
    services: ep(eQ),
    ssids: ep(eQ),
    wifi_sync: te,
    identity: eh([
        re,
        el()
    ]),
    identity_age_seconds: eh([
        ei(),
        el()
    ]),
    identity_current: es(),
    fiber_distance_m: eh([
        ei(),
        el()
    ]),
    ranging_delay_rtd_ns: eh([
        ei(),
        el()
    ]),
    equalization_delay_bits: eh([
        ei(),
        el()
    ]),
    optical_rx_power_dbm: eh([
        ei(),
        el()
    ]),
    optical_tx_power_dbm: eh([
        ei(),
        el()
    ]),
    firmware_version: er(),
    hardware_version: er(),
    uptime_seconds: eh([
        ei(),
        el()
    ]),
    fec: ew(tg),
    data_path: th,
    wifi_mesh: rp,
    connected_clients: eh([
        ep(tX),
        el()
    ]),
    measurements: eg(er(), t_)
}), rf = ef({
    id: er(),
    last_seen_sec_ago: ei(),
    last_payload_bytes: ei()
}), r_ = ef({
    ubus: ew(eg(er(), rd)),
    jobs: ew(tq),
    onu_pinning: ew(rt),
    fpga_status: er(),
    provisioning: eh([
        tl,
        el()
    ]),
    optical_transceiver: rs,
    switch_ports: ep(rc),
    sub_gateways: ep(ru),
    telemetry_gateways: ep(rf),
    npu: ew(t9),
    ipc: ew(t$)
}), rh = eh([
    ey("plan"),
    ey("apply"),
    ey("management_plan"),
    ey("management_apply"),
    ey("reset_state"),
    ey("reconcile"),
    ey("retry")
]), rm = eh([
    ef({
        operation_ids: ep(ei()),
        revision: er()
    }),
    ef({
        started: ey(!0),
        mode: eY
    }),
    ef({
        reset: ey(!0),
        device: er()
    }),
    ef({
        operation_ids: ep(ei()),
        mode: eY,
        reconcile: ew(es()),
        retry: ew(es())
    }),
    e$
]);
ef({
    action: rh,
    target: er(),
    management: ew(es()),
    item: ew(er())
});
let rg = ef({
    error: eh([
        er(),
        ef({
            code: er(),
            message: er()
        })
    ])
});
class rb extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function ry(e) {
    let t = rg.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new rb("rpc", e) : new rb(e.code, e.message);
    }
    return e;
}
const rv = {
    parse (e) {
        let t = tO.parse(ry(e));
        if ("object" == typeof t && null !== t && "error" in t) throw ry(t), Error("Unexpected RPC error");
        return t;
    }
}, rw = {
    parse (e) {
        let t = rm.parse(ry(e));
        if ("error" in t) throw Error(t.error);
        return t;
    }
};
eg(er(), ef({
    carrier: ew(es()),
    mac: ew(er()),
    link: ew(ef({
        speed: ew(ei()),
        duplex: ew(er()),
        autoneg: ew(es())
    })),
    stats: ew(eg(er(), ei()))
}));
const rx = {
    getCapabilities: {
        parse: (e)=>eB.parse(ry(e))
    },
    opticalStatus: rn,
    opticalSet: rn,
    getStatus: {
        parse: (e)=>r_.parse(ry(e))
    },
    getSync: {
        parse: (e)=>tl.parse(ry(e))
    },
    configCheck: {
        parse (e) {
            if ("object" == typeof e && null !== e && "error" in e && ("valid" in e || "revision" in e || "devices" in e)) throw Error("Mixed configuration check result");
            return eI.parse(e);
        }
    },
    npuStatus: t9,
    configReload: {
        parse: (e)=>tl.parse(ry(e))
    },
    restartService: {
        parse: (e)=>rl.parse(ry(e))
    },
    sync: {
        parse: (e)=>rw.parse(ry(e))
    },
    npuSet: t3,
    mibStart: {
        parse: (e)=>tB.parse(ry(e))
    },
    mibResult: {
        parse: (e)=>tL.parse(ry(e))
    },
    jobRelease: {
        parse: (e)=>tI.parse(ry(e))
    },
    hl202List: {
        parse: (e)=>rv.parse(ry(e))
    },
    hl202Report: {
        parse: (e)=>tB.parse(ry(e))
    },
    hl202AccountsStart: {
        parse: (e)=>tB.parse(ry(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>tB.parse(ry(e))
    },
    hl202ExecStart: {
        parse: (e)=>tB.parse(ry(e))
    },
    jobResult: {
        parse: (e)=>tL.parse(ry(e))
    },
    getCalibration: {
        parse: (e)=>eR.parse(ry(e))
    },
    saveCalibration: {
        parse: (e)=>eZ.parse(ry(e))
    },
    applyCalibration: {
        parse: (e)=>tB.parse(ry(e))
    }
};
function rk() {
    var e;
    let r, a, i, n, s, o, l, d, c, p, u, f, h, m, g, b, y, v, w, x, k, z, j;
    return t ??= (e = L.rpc, r = e.declare({
        object: "fttr",
        method: "get_capabilities",
        reject: !0
    }), a = e.declare({
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
    }), n = e.declare({
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
    }), g = e.declare({
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
        getCapabilities: async ()=>rx.getCapabilities.parse(await r()),
        opticalStatus: async ()=>rx.opticalStatus.parse(await a()),
        opticalSet: async (e)=>rx.opticalSet.parse(await i(e.enabled)),
        getStatus: async ()=>rx.getStatus.parse(await n()),
        getSync: async ()=>rx.getSync.parse(await s()),
        configCheck: async ()=>rx.configCheck.parse(await o()),
        npuStatus: async ()=>rx.npuStatus.parse(await l()),
        configReload: async ()=>rx.configReload.parse(await d()),
        restartService: async ()=>rx.restartService.parse(await c()),
        sync: async (e)=>rx.sync.parse(await p(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>rx.npuSet.parse(await u(e.enabled, e.bridge, e.wan_upstream, e.wan_downstream, e.onu_bridge)),
        mibStart: async (e)=>rx.mibStart.parse(await f(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>rx.mibResult.parse(await h(e.job, e.chunk)),
        jobRelease: async (e)=>rx.jobRelease.parse(await m(e.job)),
        hl202List: async ()=>rx.hl202List.parse(await g()),
        hl202Report: async (e)=>rx.hl202Report.parse(await b(e.target)),
        hl202AccountsStart: async (e)=>rx.hl202AccountsStart.parse(await y(e.target)),
        hl202AccountUpdate: async (e)=>rx.hl202AccountUpdate.parse(await v(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>rx.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>rx.jobResult.parse(await x(e.job, e.chunk)),
        getCalibration: async ()=>rx.getCalibration.parse(await k()),
        saveCalibration: async (e)=>rx.saveCalibration.parse(await z(e.data)),
        applyCalibration: async ()=>rx.applyCalibration.parse(await j())
    });
}
async function rz(e) {
    let t, r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : ry, a = tB.parse(ry(e)), i = Date.now() + 330000, n = window.location.pathname, s = [], o = 0;
    try {
        for(let e = 0; e < 128;){
            if (window.location.pathname !== n) throw new rb("navigation", _("Result polling stopped after leaving the page. The backend job is not cancelled."));
            if (Date.now() > i) throw new rb("timeout", _("Job polling timed out; execution outcome is unknown. Do not automatically retry."));
            let l = await rk().jobResult({
                job: a.job,
                chunk: e
            });
            if ("pending" === l.status) {
                await new Promise((e)=>window.setTimeout(e, 1000));
                continue;
            }
            if (!Number.isInteger(l.chunks) || l.chunks < 1 || l.chunks > 128 || l.chunk !== e || !Number.isInteger(l.bytes) || l.bytes < 1 || l.bytes > 4194304 || l.data.length > 43692) throw new rb("transport", _("Invalid job result"));
            if (t && (l.chunks !== t.chunks || l.bytes !== t.bytes)) throw new rb("transport", _("Inconsistent job result chunks"));
            t = {
                chunks: l.chunks,
                bytes: l.bytes
            };
            let d = Uint8Array.from(atob(l.data), (e)=>e.charCodeAt(0));
            if (d.length > 32768 || o + d.length > l.bytes) throw new rb("transport", _("Job result exceeds the transport limit"));
            if (s.push(d), o += d.length, ++e === l.chunks) {
                if (o !== l.bytes) throw new rb("transport", _("Incomplete job result"));
                let e = new Uint8Array(o), t = 0;
                for (let r of s)e.set(r, t), t += r.length;
                return r(JSON.parse(new TextDecoder("utf-8", {
                    fatal: !0
                }).decode(e)));
            }
        }
        throw new rb("transport", _("Too many result chunks"));
    } finally{
        await rk().jobRelease({
            job: a.job
        }).catch(()=>{});
    }
}
L.rpc.declare({
    object: "luci-rpc",
    method: "getNetworkDevices",
    expect: {
        "": {}
    },
    reject: !0
});
const rj = async ()=>rk().getCalibration(), rS = async (e)=>rk().saveCalibration({
        data: e
    }), rC = async ()=>eE.parse(await rz(await rk().applyCalibration(), (e)=>{
        let t = eE.safeParse(e);
        return t.success ? t.data : ry(e);
    }));
async function rA(e) {
    return window.crypto?.subtle ? Array.from(new Uint8Array(await window.crypto.subtle.digest("SHA-256", e))).map((e)=>e.toString(16).padStart(2, "0")).join("") : _("Unavailable");
}
function rP(e) {
    let t = window.atob(e), r = t.length, a = new Uint8Array(r);
    for(let e = 0; e < r; e++)a[e] = t.charCodeAt(e);
    return a.buffer;
}
function rU(e, t) {
    let r = new Uint8Array(e), a = r.byteLength;
    if (288 !== a && 56 !== a) return null;
    let i = new DataView(e), n = [];
    for(let e = 0; e < Math.min(56, a); e++)n.push(r[e]);
    let s = a >= 0x46 ? {
        n: i.getUint16(0x40, !1),
        d: i.getUint16(0x42, !1),
        o: i.getInt16(0x44, !1)
    } : {
        n: 7142,
        d: 4096,
        o: -24780
    }, o = a >= 0x4c ? {
        n: i.getUint16(0x46, !1),
        d: i.getUint16(0x48, !1),
        o: i.getInt16(0x4a, !1)
    } : {
        n: 950,
        d: 1024,
        o: 0
    }, l = a >= 0x52 ? {
        n: i.getUint16(0x4c, !1),
        d: i.getUint16(0x4e, !1),
        o: i.getInt16(0x50, !1)
    } : {
        n: 1403,
        d: 1024,
        o: 337
    }, d = a >= 0x58 ? {
        n: i.getUint16(0x52, !1),
        d: i.getUint16(0x54, !1),
        o: i.getInt16(0x56, !1)
    } : {
        n: 227,
        d: 256,
        o: 1
    }, c = a >= 0x5e ? {
        n: i.getUint16(0x58, !1),
        d: i.getUint16(0x5a, !1),
        o: i.getInt16(0x5c, !1)
    } : {
        n: 7372,
        d: 4096,
        o: -26735
    }, p = a >= 0x60 ? i.getInt16(0x5e, !1) : 35, u = {
        size: a,
        sha256: t,
        isStockHash: "a9447a85073b61016d8ef1e736e944c9942e1b138ba9a35663b48abcf47c1bd4" === t.toLowerCase(),
        registers: n,
        tempPrimary: s,
        tempAlt: c,
        tempThreshold: p,
        voltage: o,
        bias: l,
        txPower: d,
        simulated: {
            temp: 0,
            voltage: 0,
            bias: 0,
            txPower: null
        }
    };
    return u.simulated = {
        temp: function(e) {
            let { n: t, d: r, o: a } = e.tempPrimary, i = (Math.floor(0x5980 * t / (0 === r ? 4096 : r)) + a) / 256.0;
            if (i <= e.tempThreshold) {
                let { n: t, d: r, o: a } = e.tempAlt;
                return Number(((Math.floor(0x5980 * t / (0 === r ? 4096 : r)) + a) / 256.0).toFixed(2));
            }
            return Number(i.toFixed(2));
        }(u),
        voltage: function(e) {
            let { n: t, d: r, o: a } = e.voltage;
            return Number(((Math.floor(0x8880 * t / (0 === r ? 1024 : r)) + a) / 10000.0).toFixed(2));
        }(u),
        bias: function(e) {
            let { n: t, d: r, o: a } = e.bias;
            return Number(((Math.floor(0x1f40 * t / (0 === r ? 1024 : r)) + a) / 500.0).toFixed(2));
        }(u),
        txPower: function(e) {
            let { n: t, d: r, o: a } = e.txPower, i = (Math.floor(0x2440 * t / (0 === r ? 256 : r)) + a) / 10000.0;
            return i > 0 ? Number((10.0 * Math.log10(i)).toFixed(2)) : null;
        }(u)
    }, u;
}
function rO(e, t, r) {
    var a, i, n, s, l, d, c, p, u, f, h, m, g, b, y, v, w, x, k, z, j, S, C, A, P, U, O, T, N, M, R, $, Z, D, F;
    let B = e.isStockHash ? o("span", {
        class: "fttr-badge fttr-badge-success",
        children: _("Official factory baseline match")
    }) : o("span", {
        class: "fttr-badge fttr-badge-info",
        children: _("Custom calibration data")
    }), I = 288 === e.size ? o("span", {
        class: "fttr-badge fttr-badge-success",
        children: _("Standard %s bytes").format("288")
    }) : o("span", {
        class: "fttr-badge fttr-badge-warning",
        children: _("Basic %s bytes (ADC coefficients missing)").format("56")
    });
    return F = {
        class: "fttr-card",
        style: "margin-top:12px",
        children: [
            (i = {
                style: "display:flex;justify-content:space-between;align-items:center;margin-bottom:12px",
                children: [
                    (a = {
                        children: [
                            o("h4", {
                                style: "margin:0;font-size:105%",
                                children: t
                            }),
                            r && o("p", {
                                style: "margin:2px 0 0;font-size:85%;opacity:0.75",
                                children: r
                            })
                        ]
                    }, o("div", a)),
                    o("div", {
                        style: "display:flex;gap:6px",
                        children: [
                            I,
                            B
                        ]
                    })
                ]
            }, o("div", i)),
            (d = {
                class: "fttr-grid-3",
                style: "margin-bottom:12px",
                children: [
                    (n = {
                        class: "fttr-card",
                        children: [
                            o("div", {
                                class: "fttr-kv-label",
                                style: "font-size:85%",
                                children: _("Data size")
                            }),
                            o("div", {
                                style: "font-size:110%;font-weight:600;margin-top:2px",
                                children: _("%s bytes").format(String(e.size))
                            })
                        ]
                    }, o("div", n)),
                    (s = {
                        class: "fttr-card",
                        children: [
                            o("div", {
                                class: "fttr-kv-label",
                                style: "font-size:85%",
                                children: _("SHA-256 checksum")
                            }),
                            o("code", {
                                style: "font-size:80%;word-break:break-all",
                                children: e.sha256
                            })
                        ]
                    }, o("div", s)),
                    (l = {
                        class: "fttr-card",
                        children: [
                            o("div", {
                                class: "fttr-kv-label",
                                style: "font-size:85%",
                                children: _("Factory baseline consistency")
                            }),
                            o("div", {
                                style: "margin-top:2px",
                                children: e.isStockHash ? _("Exact match (%s)").format("a9447a8...") : _("Not factory default (self-calibrated)")
                            })
                        ]
                    }, o("div", l))
                ]
            }, o("div", d)),
            o("h5", {
                style: "margin:16px 0 6px;font-size:95%",
                children: _("ADC diagnostic polynomial conversion coefficients (offsets %s)").format("0x40 ~ 0x5F")
            }),
            (D = {
                style: "overflow-x:auto",
                children: (Z = {
                    class: "table cbi-section-table",
                    style: "font-size:90%",
                    children: [
                        (p = {
                            children: (c = {
                                children: [
                                    o("th", {
                                        children: _("Diagnostic measurement channel")
                                    }),
                                    o("th", {
                                        children: _("Register offset")
                                    }),
                                    o("th", {
                                        children: _("Numerator N")
                                    }),
                                    o("th", {
                                        children: _("Denominator D")
                                    }),
                                    o("th", {
                                        children: _("Offset O")
                                    }),
                                    o("th", {
                                        children: _("Conversion formula")
                                    }),
                                    o("th", {
                                        children: _("Typical raw simulated value")
                                    })
                                ]
                            }, o("tr", c))
                        }, o("thead", p)),
                        ($ = {
                            children: [
                                (g = {
                                    children: [
                                        (u = {
                                            children: o("strong", {
                                                children: _("Primary temperature parameters (Temp)")
                                            })
                                        }, o("td", u)),
                                        (f = {
                                            children: o("code", {
                                                children: "0x40 / 0x42 / 0x44"
                                            })
                                        }, o("td", f)),
                                        o("td", {
                                            children: e.tempPrimary.n
                                        }),
                                        o("td", {
                                            children: e.tempPrimary.d
                                        }),
                                        o("td", {
                                            children: e.tempPrimary.o
                                        }),
                                        (h = {
                                            children: o("code", {
                                                children: "(raw * N / D + O) / 256 \xb0C"
                                            })
                                        }, o("td", h)),
                                        (m = {
                                            children: [
                                                _("Raw"),
                                                " ",
                                                o("code", {
                                                    children: "0x5980"
                                                }),
                                                " \u2192 ",
                                                o("strong", {
                                                    children: [
                                                        e.simulated.temp,
                                                        " \xb0C"
                                                    ]
                                                })
                                            ]
                                        }, o("td", m))
                                    ]
                                }, o("tr", g)),
                                (v = {
                                    children: [
                                        (b = {
                                            children: o("strong", {
                                                children: _("Alternate temperature parameters (Alt Temp)")
                                            })
                                        }, o("td", b)),
                                        (y = {
                                            children: o("code", {
                                                children: "0x58 / 0x5A / 0x5C"
                                            })
                                        }, o("td", y)),
                                        o("td", {
                                            children: e.tempAlt.n
                                        }),
                                        o("td", {
                                            children: e.tempAlt.d
                                        }),
                                        o("td", {
                                            children: e.tempAlt.o
                                        }),
                                        o("td", {
                                            children: _("Use alternate parameters when the calculated temperature is \u2264 %s \xb0C").format(String(e.tempThreshold))
                                        }),
                                        o("td", {
                                            children: _("Segment threshold: %s \xb0C").format(String(e.tempThreshold))
                                        })
                                    ]
                                }, o("tr", v)),
                                (j = {
                                    children: [
                                        (w = {
                                            children: o("strong", {
                                                children: _("Supply voltage (Vcc)")
                                            })
                                        }, o("td", w)),
                                        (x = {
                                            children: o("code", {
                                                children: "0x46 / 0x48 / 0x4A"
                                            })
                                        }, o("td", x)),
                                        o("td", {
                                            children: e.voltage.n
                                        }),
                                        o("td", {
                                            children: e.voltage.d
                                        }),
                                        o("td", {
                                            children: e.voltage.o
                                        }),
                                        (k = {
                                            children: o("code", {
                                                children: "(raw * N / D + O) / 10000 V"
                                            })
                                        }, o("td", k)),
                                        (z = {
                                            children: [
                                                _("Raw"),
                                                " ",
                                                o("code", {
                                                    children: "0x8880"
                                                }),
                                                " \u2192 ",
                                                o("strong", {
                                                    children: [
                                                        e.simulated.voltage,
                                                        " V"
                                                    ]
                                                })
                                            ]
                                        }, o("td", z))
                                    ]
                                }, o("tr", j)),
                                (U = {
                                    children: [
                                        (S = {
                                            children: o("strong", {
                                                children: _("Bias current (Bias Current)")
                                            })
                                        }, o("td", S)),
                                        (C = {
                                            children: o("code", {
                                                children: "0x4C / 0x4E / 0x50"
                                            })
                                        }, o("td", C)),
                                        o("td", {
                                            children: e.bias.n
                                        }),
                                        o("td", {
                                            children: e.bias.d
                                        }),
                                        o("td", {
                                            children: e.bias.o
                                        }),
                                        (A = {
                                            children: o("code", {
                                                children: "(raw * N / D + O) / 500 mA"
                                            })
                                        }, o("td", A)),
                                        (P = {
                                            children: [
                                                _("Raw"),
                                                " ",
                                                o("code", {
                                                    children: "0x1F40"
                                                }),
                                                " \u2192 ",
                                                o("strong", {
                                                    children: [
                                                        e.simulated.bias,
                                                        " mA"
                                                    ]
                                                })
                                            ]
                                        }, o("td", P))
                                    ]
                                }, o("tr", U)),
                                (R = {
                                    children: [
                                        (O = {
                                            children: o("strong", {
                                                children: _("Transmit optical power (Tx Power)")
                                            })
                                        }, o("td", O)),
                                        (T = {
                                            children: o("code", {
                                                children: "0x52 / 0x54 / 0x56"
                                            })
                                        }, o("td", T)),
                                        o("td", {
                                            children: e.txPower.n
                                        }),
                                        o("td", {
                                            children: e.txPower.d
                                        }),
                                        o("td", {
                                            children: e.txPower.o
                                        }),
                                        (N = {
                                            children: o("code", {
                                                children: "p_mw = (raw*N/D+O)/10000; 10*log10(p_mw) dBm"
                                            })
                                        }, o("td", N)),
                                        (M = {
                                            children: [
                                                _("Raw"),
                                                " ",
                                                o("code", {
                                                    children: "0x2440"
                                                }),
                                                " \u2192 ",
                                                o("strong", {
                                                    children: [
                                                        e.simulated.txPower ?? _("\u2014"),
                                                        " dBm"
                                                    ]
                                                })
                                            ]
                                        }, o("td", M))
                                    ]
                                }, o("tr", R))
                            ]
                        }, o("tbody", $))
                    ]
                }, o("table", Z))
            }, o("div", D)),
            o("h5", {
                style: "margin:16px 0 6px;font-size:95%",
                children: _("BOSA hardware register initialization table (first %s bytes, %s)").format("56", "0x00 ~ 0x37")
            }),
            function(e) {
                var t, r, a, i, n, s;
                let l = [];
                for(let r = 0; r < e.length; r += 8){
                    let a = e.slice(r, r + 8);
                    l.push((t = {
                        children: [
                            o("td", {
                                style: "font-family:monospace;font-weight:600;opacity:0.75",
                                children: [
                                    "0x",
                                    r.toString(16).padStart(2, "0").toUpperCase()
                                ]
                            }),
                            a.map((e, t)=>{
                                var a;
                                let i = r + t, n = 0x27 === i;
                                return a = {
                                    style: "font-family:monospace;text-align:center",
                                    title: _("Register %s: %s (%s)").format(`0x${i.toString(16).padStart(2, "0").toUpperCase()}`, `0x${e.toString(16).padStart(2, "0").toUpperCase()}`, String(e)),
                                    children: n ? o("span", {
                                        class: "fttr-badge fttr-badge-warning",
                                        children: [
                                            "0x",
                                            e.toString(16).padStart(2, "0").toUpperCase()
                                        ]
                                    }) : o("span", {
                                        children: [
                                            "0x",
                                            e.toString(16).padStart(2, "0").toUpperCase()
                                        ]
                                    })
                                }, o("td", a);
                            }),
                            Array.from({
                                length: 8 - a.length
                            }).map(()=>o("td", {
                                    style: "text-align:center;opacity:0.35",
                                    children: _("\u2014")
                                }))
                        ]
                    }, o("tr", t)));
                }
                return s = {
                    style: "overflow-x:auto",
                    children: [
                        (i = {
                            class: "table cbi-section-table",
                            style: "font-size:90%;margin-top:8px",
                            children: [
                                (a = {
                                    children: (r = {
                                        children: [
                                            o("th", {
                                                style: "width:64px;opacity:0.8",
                                                children: _("Address")
                                            }),
                                            o("th", {
                                                style: "opacity:0.8",
                                                children: "+0"
                                            }),
                                            o("th", {
                                                style: "opacity:0.8",
                                                children: "+1"
                                            }),
                                            o("th", {
                                                style: "opacity:0.8",
                                                children: "+2"
                                            }),
                                            o("th", {
                                                style: "opacity:0.8",
                                                children: "+3"
                                            }),
                                            o("th", {
                                                style: "opacity:0.8",
                                                children: "+4"
                                            }),
                                            o("th", {
                                                style: "opacity:0.8",
                                                children: "+5"
                                            }),
                                            o("th", {
                                                style: "opacity:0.8",
                                                children: "+6"
                                            }),
                                            o("th", {
                                                style: "opacity:0.8",
                                                children: "+7"
                                            })
                                        ]
                                    }, o("tr", r))
                                }, o("thead", a)),
                                o("tbody", {
                                    children: l
                                })
                            ]
                        }, o("table", i)),
                        (n = {
                            style: "font-size:85%;opacity:0.75;margin:4px 0 0",
                            children: [
                                _("Note: Register"),
                                " ",
                                o("code", {
                                    children: "0x27"
                                }),
                                " ",
                                _("(highlighted in yellow) is the hardware latch register. It is skipped during sequential writes, then written with"),
                                " ",
                                o("code", {
                                    children: "0x55"
                                }),
                                " ",
                                _("to commit all changes.")
                            ]
                        }, o("p", n))
                    ]
                }, o("div", s);
            }(e.registers)
        ]
    }, o("div", F);
}
let main = L.view.extend({
    load: ()=>rj(),
    render: (e)=>(function(e) {
            var t, r, a, i, n, s, l, d, c, p, u;
            let f = document.createElement("div");
            f.className = "fttr-calibration";
            let h = null, m = null, g = o("div", {}), b = o("div", {}), y = o("div", {}), v = o("div", {});
            function w(e) {
                var t, r, a, i, n, s, l, d, c, p, u, f, h, m, y, v, w, x, k, z, j, S;
                g.innerHTML = "", b.innerHTML = "", "builtin" === e.source && g.appendChild((a = {
                    class: "alert-message warning",
                    style: "margin-bottom:16px",
                    children: [
                        o("h4", {
                            style: "margin:0 0 6px",
                            children: _("Currently running in fallback mode with built-in static defaults")
                        }),
                        (t = {
                            style: "margin:0 0 4px",
                            children: [
                                _("No valid calibration data was found in the"),
                                " ",
                                o("strong", {
                                    children: _("1MB Factory UBI partition (offset %s)").format("0x2200")
                                }),
                                " ",
                                _("and the firmware file"),
                                " ",
                                o("code", {
                                    children: "/lib/firmware/modified_UX3326.bin"
                                }),
                                " ",
                                _("does not exist. The optical module is currently using parameters embedded in the source at compile time.")
                            ]
                        }, o("p", t)),
                        (r = {
                            style: "margin:0;font-size:90%;opacity:0.85",
                            children: [
                                _("Use the form below to upload the %s-byte").format("288"),
                                " ",
                                o("code", {
                                    children: "modified_UX3326.bin"
                                }),
                                " ",
                                _("calibration file extracted from the factory backup to"),
                                " ",
                                o("code", {
                                    children: "/lib/firmware/modified_UX3326.bin"
                                }),
                                " ",
                                _("to ensure accurate laser transmit power and ADC diagnostic readings.")
                            ]
                        }, o("p", r))
                    ]
                }, o("div", a)));
                let C = null;
                if (e.data) try {
                    let t = rP(e.data);
                    C = rU(t, e.sha256);
                } catch  {}
                let A = null;
                if (e.factory.has_data && e.factory.data) try {
                    let t = rP(e.factory.data);
                    A = rU(t, e.factory.sha256);
                } catch  {}
                b.appendChild((S = {
                    class: "cbi-section",
                    style: "margin-bottom:16px",
                    children: [
                        (j = {
                            class: "fttr-card",
                            children: [
                                (n = {
                                    style: "display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px",
                                    children: [
                                        o("h3", {
                                            style: "margin:0;font-size:110%",
                                            children: _("Currently active system calibration data")
                                        }),
                                        (i = {
                                            style: "display:flex;align-items:center;gap:8px",
                                            children: [
                                                o("span", {
                                                    class: "fttr-kv-label",
                                                    children: _("Active data source:")
                                                }),
                                                function(e) {
                                                    switch(e){
                                                        case "factory":
                                                            return o("span", {
                                                                class: "fttr-badge fttr-badge-success",
                                                                children: _("1MB Factory partition (offset %s)").format("0x2200")
                                                            });
                                                        case "firmware":
                                                            return o("span", {
                                                                class: "fttr-badge fttr-badge-info",
                                                                children: "/lib/firmware/modified_UX3326.bin"
                                                            });
                                                        case "builtin":
                                                            return o("span", {
                                                                class: "fttr-badge fttr-badge-danger",
                                                                children: _("Built-in static defaults (fallback)")
                                                            });
                                                    }
                                                }(e.source)
                                            ]
                                        }, o("div", i))
                                    ]
                                }, o("div", n)),
                                (c = {
                                    class: "fttr-grid-3",
                                    style: "margin-bottom:12px",
                                    children: [
                                        (s = {
                                            class: "fttr-card",
                                            children: [
                                                o("div", {
                                                    class: "fttr-kv-label",
                                                    style: "font-size:85%",
                                                    children: _("Currently active path")
                                                }),
                                                o("strong", {
                                                    style: "word-break:break-all;font-size:95%",
                                                    children: e.active_path
                                                })
                                            ]
                                        }, o("div", s)),
                                        (l = {
                                            class: "fttr-card",
                                            children: [
                                                o("div", {
                                                    class: "fttr-kv-label",
                                                    style: "font-size:85%",
                                                    children: _("Active data size")
                                                }),
                                                o("div", {
                                                    style: "font-size:110%;font-weight:600;margin-top:2px",
                                                    children: _("%s bytes").format(String(e.size))
                                                })
                                            ]
                                        }, o("div", l)),
                                        (d = {
                                            class: "fttr-card",
                                            children: [
                                                o("div", {
                                                    class: "fttr-kv-label",
                                                    style: "font-size:85%",
                                                    children: _("SHA-256 checksum")
                                                }),
                                                o("code", {
                                                    style: "font-size:80%;word-break:break-all",
                                                    children: e.sha256
                                                })
                                            ]
                                        }, o("div", d))
                                    ]
                                }, o("div", c)),
                                o("h4", {
                                    style: "margin:16px 0 8px;font-size:95%;border-top:1px dashed rgba(127,140,141,0.2);padding-top:12px",
                                    children: _("Calibration data source detection overview")
                                }),
                                (z = {
                                    class: "fttr-grid-2",
                                    children: [
                                        (m = {
                                            class: "fttr-card",
                                            children: [
                                                (p = {
                                                    style: "display:flex;justify-content:space-between;align-items:center;margin-bottom:6px",
                                                    children: [
                                                        o("strong", {
                                                            children: _("1. 1MB Factory partition (highest priority)")
                                                        }),
                                                        e.factory.has_data ? o("span", {
                                                            class: "fttr-badge fttr-badge-success",
                                                            children: _("Valid data (%s bytes)").format("288")
                                                        }) : o("span", {
                                                            class: "fttr-badge fttr-badge-neutral",
                                                            children: _("No valid data")
                                                        })
                                                    ]
                                                }, o("div", p)),
                                                (u = {
                                                    class: "fttr-kv-row",
                                                    children: [
                                                        o("span", {
                                                            class: "fttr-kv-label",
                                                            children: _("Device and offset")
                                                        }),
                                                        o("code", {
                                                            children: [
                                                                e.factory.device || _("No device detected"),
                                                                " @ 0x2200"
                                                            ]
                                                        })
                                                    ]
                                                }, o("div", u)),
                                                (h = {
                                                    class: "fttr-kv-row",
                                                    children: [
                                                        o("span", {
                                                            class: "fttr-kv-label",
                                                            children: _("Usage status")
                                                        }),
                                                        (f = {
                                                            children: "factory" === e.source ? o("span", {
                                                                class: "fttr-badge fttr-badge-success",
                                                                children: _("Currently in use")
                                                            }) : o("span", {
                                                                style: "opacity:0.7",
                                                                children: _("Inactive")
                                                            })
                                                        }, o("span", f))
                                                    ]
                                                }, o("div", h))
                                            ]
                                        }, o("div", m)),
                                        (k = {
                                            class: "fttr-card",
                                            children: [
                                                (y = {
                                                    style: "display:flex;justify-content:space-between;align-items:center;margin-bottom:6px",
                                                    children: [
                                                        o("strong", {
                                                            children: _("2. Firmware file path (second priority)")
                                                        }),
                                                        e.firmware.exists ? o("span", {
                                                            class: "fttr-badge fttr-badge-info",
                                                            children: _("Exists (%s bytes)").format(String(e.firmware.size))
                                                        }) : o("span", {
                                                            class: "fttr-badge fttr-badge-neutral",
                                                            children: _("File does not exist")
                                                        })
                                                    ]
                                                }, o("div", y)),
                                                (v = {
                                                    class: "fttr-kv-row",
                                                    children: [
                                                        o("span", {
                                                            class: "fttr-kv-label",
                                                            children: _("Firmware path")
                                                        }),
                                                        o("code", {
                                                            children: e.firmware.path
                                                        })
                                                    ]
                                                }, o("div", v)),
                                                (x = {
                                                    class: "fttr-kv-row",
                                                    children: [
                                                        o("span", {
                                                            class: "fttr-kv-label",
                                                            children: _("Usage status")
                                                        }),
                                                        (w = {
                                                            children: "firmware" === e.source ? o("span", {
                                                                class: "fttr-badge fttr-badge-info",
                                                                children: _("Currently in use")
                                                            }) : e.firmware.exists ? o("span", {
                                                                class: "fttr-badge fttr-badge-neutral",
                                                                children: _("Ready (overridden by Factory)")
                                                            }) : o("span", {
                                                                style: "opacity:0.7",
                                                                children: _("Not ready")
                                                            })
                                                        }, o("span", w))
                                                    ]
                                                }, o("div", x))
                                            ]
                                        }, o("div", k))
                                    ]
                                }, o("div", z))
                            ]
                        }, o("div", j)),
                        e.factory.has_data && A && o("div", {
                            style: "margin-top:16px",
                            children: rO(A, _("Downstream optical calibration parameters extracted from the 1MB Factory partition (offset %s)").format("0x2200"), "factory" === e.source ? _("Device: %s, length %s bytes (currently in use by the system)").format(e.factory.device, "288") : _("Device: %s, length %s bytes").format(e.factory.device, "288"))
                        }),
                        (!e.factory.has_data || "factory" !== e.source) && C && o("div", {
                            style: "margin-top:16px",
                            children: rO(C, _("Currently active system calibration parameters (%s)").format(e.active_path), _("Active data size: %s bytes").format(String(e.size)))
                        })
                    ]
                }, o("div", S)));
            }
            w(e);
            let x = o("input", {
                id: "fttr-cal-apply-hw",
                type: "checkbox",
                checked: !0,
                style: "margin-right:6px"
            }), k = o("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                disabled: !0,
                style: "margin-right:8px",
                children: _("Upload and save to %s").format("/lib/firmware/modified_UX3326.bin")
            }), z = o("input", {
                type: "file",
                accept: ".bin",
                style: "display:none"
            }), j = (a = {
                class: "fttr-dropzone",
                children: [
                    (t = {
                        style: "font-size:22px;margin-bottom:6px",
                        "aria-hidden": "true",
                        children: o("span", {
                            style: "display:inline-block;width:1em;height:1em;background-color:currentColor;mask:url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 7V5a1 1 0 0 1 1-1h5l2 3h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z' fill='none' stroke='black' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E\") center/contain no-repeat"
                        })
                    }, o("div", t)),
                    o("div", {
                        style: "font-weight:600;margin-bottom:4px",
                        children: _("Click to select or drag a %s file here").format("UX3326.bin")
                    }),
                    (r = {
                        style: "font-size:85%;opacity:0.75",
                        children: [
                            _("Supported file:"),
                            " ",
                            o("code", {
                                children: "modified_UX3326.bin"
                            }),
                            " ",
                            _("(must be exactly %s bytes)").format("288")
                        ]
                    }, o("div", r))
                ]
            }, o("div", a));
            async function S(e) {
                var t, r, a, i, n, s, l, d, c, p, u, f;
                v.innerHTML = "", y.innerHTML = "", k.disabled = !0;
                let g = e.size;
                if (288 !== g && 56 !== g) return void v.appendChild((r = {
                    class: "alert-message danger",
                    children: [
                        o("h4", {
                            style: "margin:0 0 6px",
                            children: _("File size validation failed")
                        }),
                        (t = {
                            style: "margin:0",
                            children: [
                                _("A standard Semtech UX3326 BOSA calibration file must be exactly"),
                                " ",
                                o("strong", {
                                    children: _("%s bytes").format("288")
                                }),
                                " ",
                                _("(the first %s bytes configure registers, followed by ADC diagnostic conversion coefficients from %s).").format("56", "0x40"),
                                o("br", {}),
                                _("Selected file:"),
                                " ",
                                o("strong", {
                                    children: e.name
                                }),
                                " ",
                                _("Size:"),
                                " ",
                                o("strong", {
                                    children: _("%s bytes").format(String(g))
                                }),
                                " ",
                                _("Upload blocked.")
                            ]
                        }, o("p", t))
                    ]
                }, o("div", r)));
                try {
                    let t = await e.arrayBuffer();
                    h = t;
                    let r = await rA(t), f = rU(t, r);
                    if (!f) return void v.appendChild((n = {
                        class: "alert-message danger",
                        children: [
                            (a = {
                                style: "margin:0 0 6px",
                                children: _("Failed to parse calibration file")
                            }, o("h4", a)),
                            (i = {
                                style: "margin:0",
                                children: _("Unable to parse the calibration file structure. Please check the file's integrity.")
                            }, o("p", i))
                        ]
                    }, o("div", n)));
                    m = f, k.disabled = !1, v.appendChild((u = {
                        class: "alert-message success",
                        children: [
                            (s = {
                                style: "margin:0 0 6px",
                                children: _("File validation succeeded: %s (%s bytes)").format(e.name, String(g))
                            }, o("h4", s)),
                            (p = {
                                style: "margin:0",
                                children: [
                                    "SHA-256: ",
                                    (l = {
                                        children: r
                                    }, o("code", l)),
                                    " ",
                                    f.isStockHash ? _("(exact match with the official factory baseline)") : _("(custom/self-calibrated table)"),
                                    (d = {}, o("br", d)),
                                    _("All parameters were parsed successfully and are previewed below. Verify them, then click the button below to upload to"),
                                    " ",
                                    (c = {
                                        children: "/lib/firmware/modified_UX3326.bin"
                                    }, o("code", c)),
                                    "."
                                ]
                            }, o("p", p))
                        ]
                    }, o("div", u))), y.appendChild(rO(f, _("Parameter preview for upload: %s").format(e.name)));
                } catch (e) {
                    v.appendChild((f = {
                        class: "alert-message danger",
                        children: o("p", {
                            style: "margin:0",
                            children: _("Error reading file: %s").format(String(e))
                        })
                    }, o("div", f)));
                }
            }
            return j.addEventListener("click", ()=>z.click()), j.addEventListener("dragover", (e)=>{
                e.preventDefault(), j.style.opacity = "0.75";
            }), j.addEventListener("dragleave", ()=>{
                j.style.opacity = "1";
            }), j.addEventListener("drop", (e)=>{
                e.preventDefault(), j.style.opacity = "1", e.dataTransfer?.files.length && S(e.dataTransfer.files[0]);
            }), z.addEventListener("change", ()=>{
                z.files?.length && S(z.files[0]);
            }), k.addEventListener("click", async ()=>{
                if (h && m) {
                    var e, t, r, a, i, n;
                    k.disabled = !0, k.textContent = _("Uploading to %s...").format("/lib/firmware/modified_UX3326.bin"), v.innerHTML = "";
                    try {
                        let n = function(e) {
                            let t = "", r = new Uint8Array(e), a = r.byteLength;
                            for(let e = 0; e < a; e++)t += String.fromCharCode(r[e]);
                            return window.btoa(t);
                        }(h), s = x.checked, l = await rS(n);
                        if (!l.success) throw Error(_("Failed to save calibration file"));
                        let d = "";
                        if (s) {
                            k.textContent = _("Configuring BOSA optical transceiver hardware...");
                            let e = await rC();
                            d = e.success ? _(", and the optical transceiver hardware was reset and the register table was latched successfully (%s succeeded)").format("bosa-init") : _(", but optical transceiver hardware initialization reported a warning: %s").format(e.error || _("Unknown error"));
                        }
                        v.appendChild((i = {
                            class: "alert-message success",
                            children: [
                                (e = {
                                    style: "margin:0 0 6px",
                                    children: _("Calibration data saved successfully!")
                                }, o("h4", e)),
                                (a = {
                                    style: "margin:0",
                                    children: [
                                        _("File written to"),
                                        " ",
                                        (t = {
                                            children: l.path
                                        }, o("code", t)),
                                        " (",
                                        _("%s bytes").format(String(l.size)),
                                        ", SHA-256: ",
                                        (r = {
                                            children: l.sha256
                                        }, o("code", r)),
                                        ")",
                                        d,
                                        "."
                                    ]
                                }, o("p", a))
                            ]
                        }, o("div", i)));
                        let c = await rj();
                        w(c);
                    } catch (e) {
                        v.appendChild((n = {
                            class: "alert-message danger",
                            children: [
                                o("h4", {
                                    style: "margin:0 0 6px",
                                    children: _("Upload write failed")
                                }),
                                o("p", {
                                    style: "margin:0",
                                    children: String(e)
                                })
                            ]
                        }, o("div", n)));
                    } finally{
                        k.disabled = !1, k.textContent = _("Upload and save to %s").format("/lib/firmware/modified_UX3326.bin");
                    }
                }
            }), f.appendChild((u = {
                children: [
                    o("style", {
                        children: `
				.fttr-calibration {
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
					.fttr-calibration {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .fttr-calibration,
				[data-theme="dark"] .fttr-calibration {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-danger-color: #e74c3c;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				.fttr-calibration .fttr-badge {
					display: inline-block;
					padding: 0.18em 0.55em;
					font-size: 85%;
					font-weight: 600;
					line-height: 1.25;
					border-radius: 3px;
					white-space: nowrap;
					text-align: center;
				}

				.fttr-calibration .fttr-badge-success {
					background: var(--fttr-success-bg);
					color: var(--fttr-success-color);
					border: 1px solid var(--fttr-success-border);
				}

				.fttr-calibration .fttr-badge-warning {
					background: var(--fttr-warning-bg);
					color: var(--fttr-warning-color);
					border: 1px solid var(--fttr-warning-border);
				}

				.fttr-calibration .fttr-badge-danger {
					background: var(--fttr-danger-bg);
					color: var(--fttr-danger-color);
					border: 1px solid var(--fttr-danger-border);
				}

				.fttr-calibration .fttr-badge-info {
					background: var(--fttr-info-bg);
					color: var(--fttr-info-color);
					border: 1px solid var(--fttr-info-border);
				}

				.fttr-calibration .fttr-badge-neutral {
					background: var(--fttr-neutral-bg);
					color: var(--fttr-neutral-color);
					border: 1px solid var(--fttr-neutral-border);
				}

				.fttr-calibration .fttr-grid-2 {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
					gap: 12px;
					margin: 8px 0;
				}

				.fttr-calibration .fttr-grid-3 {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
					gap: 12px;
					margin: 8px 0;
				}

				.fttr-calibration .fttr-card {
					padding: 12px 14px;
					border: 1px solid rgba(127, 140, 141, 0.2);
					border-radius: 6px;
					background: rgba(127, 140, 141, 0.04);
				}

				.fttr-calibration .fttr-kv-row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 6px 0;
					border-bottom: 1px dashed rgba(127, 140, 141, 0.15);
					font-size: 88%;
				}

				.fttr-calibration .fttr-kv-row:last-child {
					border-bottom: none;
				}

				.fttr-calibration .fttr-kv-label {
					opacity: 0.75;
				}

				.fttr-calibration .fttr-dropzone {
					border: 1px dashed rgba(127, 140, 141, 0.35);
					border-radius: 6px;
					padding: 22px;
					text-align: center;
					background: rgba(127, 140, 141, 0.03);
					cursor: pointer;
					transition: background 0.15s ease, border-color 0.15s ease;
				}

				.fttr-calibration .fttr-dropzone:hover {
					background: rgba(127, 140, 141, 0.08);
					border-color: rgba(127, 140, 141, 0.6);
				}
			`
                    }),
                    o("h2", {
                        style: "margin-bottom:6px",
                        children: _("BOSA downstream optical calibration management (UX3326)")
                    }),
                    (i = {
                        class: "cbi-section-descr",
                        style: "margin-bottom:16px",
                        children: [
                            _("Manage calibration data for the Semtech UX3326 BOSA optical transceiver attached to the HM2004-DU Micro-OLT FPGA subsystem. Calibration data is read in priority order from"),
                            " ",
                            o("strong", {
                                children: _("1MB Factory UBI partition (offset %s)").format("0x2200")
                            }),
                            ",",
                            " ",
                            o("strong", {
                                children: "/lib/firmware/modified_UX3326.bin"
                            }),
                            " ",
                            _("with automatic fallback to built-in static defaults if neither source has valid data.")
                        ]
                    }, o("p", i)),
                    g,
                    b,
                    (p = {
                        class: "cbi-section",
                        children: [
                            o("h3", {
                                children: _("Upload a new UX3326 calibration file")
                            }),
                            (n = {
                                style: "font-size:90%;opacity:0.75;margin-top:0;margin-bottom:12px",
                                children: [
                                    _("New calibration tables are always saved to"),
                                    " ",
                                    o("code", {
                                        children: "/lib/firmware/modified_UX3326.bin"
                                    }),
                                    ".",
                                    " ",
                                    _("The file must be exactly %s bytes.").format("288")
                                ]
                            }, o("p", n)),
                            j,
                            z,
                            o("div", {
                                style: "margin-top:12px",
                                children: v
                            }),
                            o("div", {
                                style: "margin-top:12px",
                                children: y
                            }),
                            (c = {
                                class: "fttr-card",
                                style: "margin-top:16px",
                                children: [
                                    o("h4", {
                                        style: "margin-top:0;margin-bottom:12px",
                                        children: _("Write settings and execution")
                                    }),
                                    (s = {
                                        class: "fttr-kv-row",
                                        style: "margin-bottom:12px",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                style: "min-width:160px",
                                                children: _("Target storage path")
                                            }),
                                            o("code", {
                                                children: "/lib/firmware/modified_UX3326.bin"
                                            })
                                        ]
                                    }, o("div", s)),
                                    (d = {
                                        class: "fttr-kv-row",
                                        style: "margin-bottom:16px",
                                        children: [
                                            o("span", {
                                                class: "fttr-kv-label",
                                                style: "min-width:160px",
                                                children: _("Apply to hardware immediately")
                                            }),
                                            (l = {
                                                htmlFor: "fttr-cal-apply-hw",
                                                style: "display:flex;align-items:center;cursor:pointer",
                                                children: [
                                                    x,
                                                    o("span", {
                                                        children: _("Write %s registers to the BOSA hardware and commit the latch immediately after saving (%s)").format("56", "bosa-init")
                                                    })
                                                ]
                                            }, o("label", l))
                                        ]
                                    }, o("div", d)),
                                    o("div", {
                                        children: k
                                    })
                                ]
                            }, o("div", c))
                        ]
                    }, o("div", p))
                ]
            }, o("div", u))), f;
        })(e),
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});

return main;