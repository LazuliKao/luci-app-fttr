'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, n, i, r;
const a = Symbol.for("jsx.fragment");
function o(e, t) {
    let { children: n, ...i } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, r = function e(t) {
        let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let i of t)null != i && "boolean" != typeof i && (Array.isArray(i) ? e(i, n) : n.push(i instanceof Node ? i : String(i)));
        return n;
    }(null == n ? [] : Array.isArray(n) ? n : [
        n
    ]);
    if (e === a) {
        let e = document.createDocumentFragment();
        return e.append(...r), e;
    }
    if ("function" == typeof e) {
        let t = Reflect.apply(e, void 0, [
            {
                ...i,
                children: r
            }
        ]);
        if (!(t instanceof Node)) throw TypeError("JSX components must return a DOM Node");
        return t;
    }
    if ("string" != typeof e) throw TypeError("JSX element types must be tag names or component functions");
    let o = {}, s = {
        ...i
    };
    for (let [e, t] of Object.entries(s))e.startsWith("on") && "function" == typeof t ? (o[e] = t, delete s[e]) : "boolean" == typeof t && (t ? s[e] = e : delete s[e]);
    let l = Object.keys(s).length > 0 ? r.length > 1 ? E(e, s, r) : E(e, s, r[0]) : r.length > 1 ? E(e, {}, r) : E(e, {}, r[0]);
    for (let [e, t] of Object.entries(o)){
        let n = e.slice(2).toLowerCase();
        l.addEventListener(n, t);
    }
    return l;
}
let s = L.form;
function l(e, t, n, i, r) {
    let a = e.option(t, n, i);
    return r && (a.datatype = r.startsWith("range(") ? `and(uinteger,${r})` : r), a;
}
function d(e, t, n, i) {
    let r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], a = l(e, s.ListValue, t, n);
    for (let [e, t] of i)a.value(e, t);
    return a.rmempty = r, a;
}
function c(e, t, n, i) {
    let r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], a = l(e, s.ListValue, t, n);
    for (let e of (r && a.value("", _("None")), L.uci.sections("fttr", i)))a.value(e[".name"], String(e.name || e.ssid || e.optical_sn || e[".name"]));
    a.rmempty = r;
    let o = a.renderWidget;
    return a.renderWidget = function() {
        for(var e = arguments.length, t = Array(e), n = 0; n < e; n++)t[n] = arguments[n];
        for (let e of (this.keylist = [], this.vallist = [], r && this.value("", _("None")), L.uci.sections("fttr", i)))this.value(e[".name"], String(e.name || e.ssid || e.optical_sn || e[".name"]));
        return o.apply(this, t);
    }, a;
}
function u(e, t, n, i, r, a) {
    let o = e.taboption(t, s.SectionValue, n, s.GridSection, i, r).subsection;
    return o.anonymous = !0, o.addremove = !0, o.modaltitle = (e)=>String(L.uci.get("fttr", e, "name") || L.uci.get("fttr", e, "ssid") || r), a(o), o;
}
function p(e, t, n, i) {
    let r = e.option(L.form.DummyValue, t, n);
    r.modalonly = !1, r.textvalue = i;
}
function f(e, t, n, i, r, a, o) {
    let s = u(e, t, n, i, r, o);
    return s.filter = (e)=>L.uci.get("fttr", e, "template") === a, s.handleAdd = function() {
        let e = L.uci.add("fttr", i);
        return L.uci.set("fttr", e, "template", a), this.renderMoreOptionsModal(e);
    }, s;
}
function m(e) {
    return "HWTC" === (e?.vendor || e?.serial_number.slice(0, 4)) ? "hwtc" : e?.model?.startsWith("HL202") ? "hl202" : "generic";
}
function g(e, t, n) {
    function i(n, i) {
        if (n._zod || Object.defineProperty(n, "_zod", {
            value: {
                def: i,
                constr: o,
                traits: new Set()
            },
            enumerable: !1
        }), n._zod.traits.has(e)) return;
        n._zod.traits.add(e), t(n, i);
        let r = o.prototype, a = Object.keys(r);
        for(let e = 0; e < a.length; e++){
            let t = a[e];
            t in n || (n[t] = r[t].bind(n));
        }
    }
    let r = n?.Parent ?? Object;
    class a extends r {
    }
    function o(e) {
        var t;
        let r = n?.Parent ? new a() : this;
        for (let n of (i(r, e), (t = r._zod).deferred ?? (t.deferred = []), r._zod.deferred))n();
        return r;
    }
    return Object.defineProperty(a, "name", {
        value: e
    }), Object.defineProperty(o, "init", {
        value: i
    }), Object.defineProperty(o, Symbol.hasInstance, {
        value: (t)=>!!n?.Parent && t instanceof n.Parent || t?._zod?.traits?.has(e)
    }), Object.defineProperty(o, "name", {
        value: e
    }), o;
}
Object.freeze({
    status: "aborted"
}), Symbol("zod_brand");
class h extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const y = {};
function v(e) {
    return e && Object.assign(y, e), y;
}
function b(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function w(e) {
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
function z(e) {
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const S = Symbol("evaluating");
function P(e, t, n) {
    let i;
    Object.defineProperty(e, t, {
        get () {
            if (i !== S) return void 0 === i && (i = S, i = n()), i;
        },
        set (n) {
            Object.defineProperty(e, t, {
                value: n
            });
        },
        configurable: !0
    });
}
function k(e, t, n) {
    Object.defineProperty(e, t, {
        value: n,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
}
function j(...e) {
    let t = {};
    for (let n of e)Object.assign(t, Object.getOwnPropertyDescriptors(n));
    return Object.defineProperties({}, t);
}
const T = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function A(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function N(e) {
    if (!1 === A(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let n = t.prototype;
    return !1 !== A(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
}
const O = new Set([
    "string",
    "number",
    "symbol"
]);
function x(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function C(e, t, n) {
    let i = new e._zod.constr(t ?? e._zod.def);
    return (!t || n?.parent) && (i._zod.parent = e), i;
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
function V(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let n = t; n < e.issues.length; n++)if (e.issues[n]?.continue !== !0) return !0;
    return !1;
}
function M(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function R(e) {
    return "string" == typeof e ? e : e?.message;
}
function D(e, t, n) {
    let i = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (i.message = R(e.inst?._zod.def?.error?.(e)) ?? R(t?.error?.(e)) ?? R(n.customError?.(e)) ?? R(n.localeError?.(e)) ?? "Invalid input"), delete i.inst, delete i.continue, t?.reportInput || delete i.input, i;
}
const Z = (e, t)=>{
    e.name = "$ZodError", Object.defineProperty(e, "_zod", {
        value: e._zod,
        enumerable: !1
    }), Object.defineProperty(e, "issues", {
        value: t,
        enumerable: !1
    }), e.message = JSON.stringify(t, b, 2), Object.defineProperty(e, "toString", {
        value: ()=>e.message,
        enumerable: !1
    });
}, I = g("$ZodError", Z), W = g("$ZodError", Z, {
    Parent: Error
}), q = (t = W, (e, n, i, r)=>{
    let a = i ? Object.assign(i, {
        async: !1
    }) : {
        async: !1
    }, o = e._zod.run({
        value: n,
        issues: []
    }, a);
    if (o instanceof Promise) throw new h();
    if (o.issues.length) {
        let e = new (r?.Err ?? t)(o.issues.map((e)=>D(e, a, v())));
        throw T(e, r?.callee), e;
    }
    return o.value;
}), U = (n = W, async (e, t, i, r)=>{
    let a = i ? Object.assign(i, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (r?.Err ?? n)(o.issues.map((e)=>D(e, a, v())));
        throw T(e, r?.callee), e;
    }
    return o.value;
}), H = (i = W, (e, t, n)=>{
    let r = n ? {
        ...n,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, r);
    if (a instanceof Promise) throw new h();
    return a.issues.length ? {
        success: !1,
        error: new (i ?? I)(a.issues.map((e)=>D(e, r, v())))
    } : {
        success: !0,
        data: a.value
    };
}), F = (r = W, async (e, t, n)=>{
    let i = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, a = e._zod.run({
        value: t,
        issues: []
    }, i);
    return a instanceof Promise && (a = await a), a.issues.length ? {
        success: !1,
        error: new r(a.issues.map((e)=>D(e, i, v())))
    } : {
        success: !0,
        data: a.value
    };
}), G = /^-?\d+(?:\.\d+)?$/, B = /^(?:true|false)$/i, K = /^null$/i, J = {
    major: 4,
    minor: 3,
    patch: 6
}, X = g("$ZodType", (e, t)=>{
    var n;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = J;
    let i = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && i.unshift(e), i))for (let n of t._zod.onattach)n(e);
    if (0 === i.length) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, n)=>{
            let i, r = V(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (r) continue;
                let t = e.issues.length, o = a._zod.check(e);
                if (o instanceof Promise && n?.async === !1) throw new h();
                if (i || o instanceof Promise) i = (i ?? Promise.resolve()).then(async ()=>{
                    await o, e.issues.length !== t && (r || (r = V(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    r || (r = V(e, t));
                }
            }
            return i ? i.then(()=>e) : e;
        }, n = (n, r, a)=>{
            if (V(n)) return n.aborted = !0, n;
            let o = t(r, i, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new h();
                return o.then((t)=>e._zod.parse(t, a));
            }
            return e._zod.parse(o, a);
        };
        e._zod.run = (r, a)=>{
            if (a.skipChecks) return e._zod.parse(r, a);
            if ("backward" === a.direction) {
                let t = e._zod.parse({
                    value: r.value,
                    issues: []
                }, {
                    ...a,
                    skipChecks: !0
                });
                return t instanceof Promise ? t.then((e)=>n(e, r, a)) : n(t, r, a);
            }
            let o = e._zod.parse(r, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new h();
                return o.then((e)=>t(e, i, a));
            }
            return t(o, i, a);
        };
    }
    P(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = H(e, t);
                    return n.success ? {
                        value: n.data
                    } : {
                        issues: n.error?.issues
                    };
                } catch (n) {
                    return F(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), Q = g("$ZodString", (e, t)=>{
    var n;
    let i;
    X.init(e, t), e._zod.pattern = [
        ...e?._zod.bag?.patterns ?? []
    ].pop() ?? (i = (n = e._zod.bag) ? `[\\s\\S]{${n?.minimum ?? 0},${n?.maximum ?? ""}}` : "[\\s\\S]*", RegExp(`^${i}$`)), e._zod.parse = (n, i)=>{
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
}), Y = g("$ZodNumber", (e, t)=>{
    X.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? G, e._zod.parse = (n, i)=>{
        if (t.coerce) try {
            n.value = Number(n.value);
        } catch (e) {}
        let r = n.value;
        if ("number" == typeof r && !Number.isNaN(r) && Number.isFinite(r)) return n;
        let a = "number" == typeof r ? Number.isNaN(r) ? "NaN" : Number.isFinite(r) ? void 0 : "Infinity" : void 0;
        return n.issues.push({
            expected: "number",
            code: "invalid_type",
            input: r,
            inst: e,
            ...a ? {
                received: a
            } : {}
        }), n;
    };
}), ee = g("$ZodBoolean", (e, t)=>{
    X.init(e, t), e._zod.pattern = B, e._zod.parse = (n, i)=>{
        if (t.coerce) try {
            n.value = !!n.value;
        } catch (e) {}
        let r = n.value;
        return "boolean" == typeof r || n.issues.push({
            expected: "boolean",
            code: "invalid_type",
            input: r,
            inst: e
        }), n;
    };
}), et = g("$ZodNull", (e, t)=>{
    X.init(e, t), e._zod.pattern = K, e._zod.values = new Set([
        null
    ]), e._zod.parse = (t, n)=>{
        let i = t.value;
        return null === i || t.issues.push({
            expected: "null",
            code: "invalid_type",
            input: i,
            inst: e
        }), t;
    };
}), en = g("$ZodNever", (e, t)=>{
    X.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function ei(e, t, n) {
    e.issues.length && t.issues.push(...M(n, e.issues)), t.value[n] = e.value;
}
const er = g("$ZodArray", (e, t)=>{
    X.init(e, t), e._zod.parse = (n, i)=>{
        let r = n.value;
        if (!Array.isArray(r)) return n.issues.push({
            expected: "array",
            code: "invalid_type",
            input: r,
            inst: e
        }), n;
        n.value = Array(r.length);
        let a = [];
        for(let e = 0; e < r.length; e++){
            let o = r[e], s = t.element._zod.run({
                value: o,
                issues: []
            }, i);
            s instanceof Promise ? a.push(s.then((t)=>ei(t, n, e))) : ei(s, n, e);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
});
function ea(e, t, n, i, r) {
    if (e.issues.length) {
        if (r && !(n in i)) return;
        t.issues.push(...M(n, e.issues));
    }
    void 0 === e.value ? n in i && (t.value[n] = void 0) : t.value[n] = e.value;
}
const eo = g("$ZodObject", (e, t)=>{
    let n;
    X.init(e, t);
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
    let r = w(()=>(function(e) {
            var t;
            let n = Object.keys(e.shape);
            for (let t of n)if (!e.shape?.[t]?._zod?.traits?.has("$ZodType")) throw Error(`Invalid element at key "${t}": expected a Zod schema`);
            let i = Object.keys(t = e.shape).filter((e)=>"optional" === t[e]._zod.optin && "optional" === t[e]._zod.optout);
            return {
                ...e,
                keys: n,
                keySet: new Set(n),
                numKeys: n.length,
                optionalKeys: new Set(i)
            };
        })(t));
    P(e._zod, "propValues", ()=>{
        let e = t.shape, n = {};
        for(let t in e){
            let i = e[t]._zod;
            if (i.values) for (let e of (n[t] ?? (n[t] = new Set()), i.values))n[t].add(e);
        }
        return n;
    });
    let a = t.catchall;
    e._zod.parse = (t, i)=>{
        n ?? (n = r.value);
        let o = t.value;
        if (!A(o)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: o,
            inst: e
        }), t;
        t.value = {};
        let s = [], l = n.shape;
        for (let e of n.keys){
            let n = l[e], r = "optional" === n._zod.optout, a = n._zod.run({
                value: o[e],
                issues: []
            }, i);
            a instanceof Promise ? s.push(a.then((n)=>ea(n, t, e, o, r))) : ea(a, t, e, o, r);
        }
        return a ? function(e, t, n, i, r, a) {
            let o = [], s = r.keySet, l = r.catchall._zod, d = l.def.type, c = "optional" === l.optout;
            for(let r in t){
                if (s.has(r)) continue;
                if ("never" === d) {
                    o.push(r);
                    continue;
                }
                let a = l.run({
                    value: t[r],
                    issues: []
                }, i);
                a instanceof Promise ? e.push(a.then((e)=>ea(e, n, r, t, c))) : ea(a, n, r, t, c);
            }
            return (o.length && n.issues.push({
                code: "unrecognized_keys",
                keys: o,
                input: t,
                inst: a
            }), e.length) ? Promise.all(e).then(()=>n) : n;
        }(s, o, t, i, r.value, e) : s.length ? Promise.all(s).then(()=>t) : t;
    };
});
function es(e, t, n, i) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let r = e.filter((e)=>!V(e));
    return 1 === r.length ? (t.value = r[0].value, r[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>D(e, i, v())))
    }), t);
}
const el = g("$ZodUnion", (e, t)=>{
    X.init(e, t), P(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), P(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), P(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), P(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>z(e.source)).join("|")})$`);
        }
    });
    let n = 1 === t.options.length, i = t.options[0]._zod.run;
    e._zod.parse = (r, a)=>{
        if (n) return i(r, a);
        let o = !1, s = [];
        for (let e of t.options){
            let t = e._zod.run({
                value: r.value,
                issues: []
            }, a);
            if (t instanceof Promise) s.push(t), o = !0;
            else {
                if (0 === t.issues.length) return t;
                s.push(t);
            }
        }
        return o ? Promise.all(s).then((t)=>es(t, r, e, a)) : es(s, r, e, a);
    };
}), ed = g("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, el.init(e, t);
    let n = e._zod.parse;
    P(e._zod, "propValues", ()=>{
        let e = {};
        for (let n of t.options){
            let i = n._zod.propValues;
            if (!i || 0 === Object.keys(i).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
            for (let [t, n] of Object.entries(i))for (let i of (e[t] || (e[t] = new Set()), n))e[t].add(i);
        }
        return e;
    });
    let i = w(()=>{
        let e = t.options, n = new Map();
        for (let i of e){
            let e = i._zod.propValues?.[t.discriminator];
            if (!e || 0 === e.size) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(i)}"`);
            for (let t of e){
                if (n.has(t)) throw Error(`Duplicate discriminator value "${String(t)}"`);
                n.set(t, i);
            }
        }
        return n;
    });
    e._zod.parse = (r, a)=>{
        let o = r.value;
        if (!A(o)) return r.issues.push({
            code: "invalid_type",
            expected: "object",
            input: o,
            inst: e
        }), r;
        let s = i.value.get(o?.[t.discriminator]);
        return s ? s._zod.run(r, a) : t.unionFallback ? n(r, a) : (r.issues.push({
            code: "invalid_union",
            errors: [],
            note: "No matching discriminator",
            discriminator: t.discriminator,
            input: o,
            path: [
                t.discriminator
            ],
            inst: e
        }), r);
    };
}), ec = g("$ZodRecord", (e, t)=>{
    X.init(e, t), e._zod.parse = (n, i)=>{
        let r = n.value;
        if (!N(r)) return n.issues.push({
            expected: "record",
            code: "invalid_type",
            input: r,
            inst: e
        }), n;
        let a = [], o = t.keyType._zod.values;
        if (o) {
            let s;
            n.value = {};
            let l = new Set();
            for (let e of o)if ("string" == typeof e || "number" == typeof e || "symbol" == typeof e) {
                l.add("number" == typeof e ? e.toString() : e);
                let o = t.valueType._zod.run({
                    value: r[e],
                    issues: []
                }, i);
                o instanceof Promise ? a.push(o.then((t)=>{
                    t.issues.length && n.issues.push(...M(e, t.issues)), n.value[e] = t.value;
                })) : (o.issues.length && n.issues.push(...M(e, o.issues)), n.value[e] = o.value);
            }
            for(let e in r)l.has(e) || (s = s ?? []).push(e);
            s && s.length > 0 && n.issues.push({
                code: "unrecognized_keys",
                input: r,
                inst: e,
                keys: s
            });
        } else for (let o of (n.value = {}, Reflect.ownKeys(r))){
            if ("__proto__" === o) continue;
            let s = t.keyType._zod.run({
                value: o,
                issues: []
            }, i);
            if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof o && G.test(o) && s.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(o),
                    issues: []
                }, i);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (s = e);
            }
            if (s.issues.length) {
                "loose" === t.mode ? n.value[o] = r[o] : n.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: s.issues.map((e)=>D(e, i, v())),
                    input: o,
                    path: [
                        o
                    ],
                    inst: e
                });
                continue;
            }
            let l = t.valueType._zod.run({
                value: r[o],
                issues: []
            }, i);
            l instanceof Promise ? a.push(l.then((e)=>{
                e.issues.length && n.issues.push(...M(o, e.issues)), n.value[s.value] = e.value;
            })) : (l.issues.length && n.issues.push(...M(o, l.issues)), n.value[s.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
}), eu = g("$ZodEnum", (e, t)=>{
    var n;
    let i;
    X.init(e, t);
    let r = (i = Object.values(n = t.entries).filter((e)=>"number" == typeof e), Object.entries(n).filter(([e, t])=>-1 === i.indexOf(+e)).map(([e, t])=>t)), a = new Set(r);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${r.filter((e)=>O.has(typeof e)).map((e)=>"string" == typeof e ? x(e) : e.toString()).join("|")})$`), e._zod.parse = (t, n)=>{
        let i = t.value;
        return a.has(i) || t.issues.push({
            code: "invalid_value",
            values: r,
            input: i,
            inst: e
        }), t;
    };
}), ep = g("$ZodLiteral", (e, t)=>{
    if (X.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? x(e) : e ? x(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (i, r)=>{
        let a = i.value;
        return n.has(a) || i.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
            inst: e
        }), i;
    };
});
function e_(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const ef = g("$ZodOptional", (e, t)=>{
    X.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", P(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), P(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${z(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let i = t.innerType._zod.run(e, n);
            return i instanceof Promise ? i.then((t)=>e_(t, e.value)) : e_(i, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, n);
    };
}), em = g("$ZodNullable", (e, t)=>{
    X.init(e, t), P(e._zod, "optin", ()=>t.innerType._zod.optin), P(e._zod, "optout", ()=>t.innerType._zod.optout), P(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${z(e.source)}|null)$`) : void 0;
    }), P(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), eg = g("$ZodCatch", (e, t)=>{
    X.init(e, t), P(e._zod, "optin", ()=>t.innerType._zod.optin), P(e._zod, "optout", ()=>t.innerType._zod.optout), P(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, n)=>{
        if ("backward" === n.direction) return t.innerType._zod.run(e, n);
        let i = t.innerType._zod.run(e, n);
        return i instanceof Promise ? i.then((i)=>(e.value = i.value, i.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: i.issues.map((e)=>D(e, n, v()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = i.value, i.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: i.issues.map((e)=>D(e, n, v()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), eh = g("$ZodLazy", (e, t)=>{
    X.init(e, t), P(e._zod, "innerType", ()=>t.getter()), P(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), P(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), P(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), P(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n)=>e._zod.innerType._zod.run(t, n);
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
            let i = {
                ...n,
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
const ey = g("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    X.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>q(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>H(e, t, n), e.parseAsync = async (t, n)=>U(e, t, n, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, n)=>F(e, t, n), e.check = (...n)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, n)=>C(e, t, n), e.brand = ()=>e, e.register = (t, n)=>(t.add(e, n), e), e.apply = (t)=>t(e);
}), ev = g("ZodMiniString", (e, t)=>{
    Q.init(e, t), ey.init(e, t);
});
function eb(e) {
    return new ev({
        type: "string",
        ...$(e)
    });
}
const ew = g("ZodMiniNumber", (e, t)=>{
    Y.init(e, t), ey.init(e, t);
});
function ez(e) {
    return new ew({
        type: "number",
        checks: [],
        ...$(e)
    });
}
const eL = g("ZodMiniBoolean", (e, t)=>{
    ee.init(e, t), ey.init(e, t);
});
function eS(e) {
    return new eL({
        type: "boolean",
        ...$(e)
    });
}
const eP = g("ZodMiniNull", (e, t)=>{
    et.init(e, t), ey.init(e, t);
}), ek = g("ZodMiniNever", (e, t)=>{
    en.init(e, t), ey.init(e, t);
});
function ej(e) {
    return new ek({
        type: "never",
        ...$(e)
    });
}
const eT = g("ZodMiniArray", (e, t)=>{
    er.init(e, t), ey.init(e, t);
});
function eA(e, t) {
    return new eT({
        type: "array",
        element: e,
        ...$(t)
    });
}
const eN = g("ZodMiniObject", (e, t)=>{
    eo.init(e, t), ey.init(e, t), P(e, "shape", ()=>t.shape);
});
function eO(e, t) {
    return new eN({
        type: "object",
        shape: e ?? {},
        ...$(t)
    });
}
const eE = g("ZodMiniUnion", (e, t)=>{
    el.init(e, t), ey.init(e, t);
});
function ex(e, t) {
    return new eE({
        type: "union",
        options: e,
        ...$(t)
    });
}
const eC = g("ZodMiniDiscriminatedUnion", (e, t)=>{
    ed.init(e, t), ey.init(e, t);
});
function e$(e, t, n) {
    return new eC({
        type: "union",
        options: t,
        discriminator: e,
        ...$(n)
    });
}
const eV = g("ZodMiniRecord", (e, t)=>{
    ec.init(e, t), ey.init(e, t);
});
function eM(e, t, n) {
    return new eV({
        type: "record",
        keyType: e,
        valueType: t,
        ...$(n)
    });
}
const eR = g("ZodMiniEnum", (e, t)=>{
    eu.init(e, t), ey.init(e, t), e.options = Object.values(t.entries);
});
function eD(e, t) {
    return new eR({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...$(t)
    });
}
const eZ = g("ZodMiniLiteral", (e, t)=>{
    ep.init(e, t), ey.init(e, t);
});
function eI(e, t) {
    return new eZ({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...$(t)
    });
}
const eW = g("ZodMiniOptional", (e, t)=>{
    ef.init(e, t), ey.init(e, t);
});
function eq(e) {
    return new eW({
        type: "optional",
        innerType: e
    });
}
const eU = g("ZodMiniNullable", (e, t)=>{
    em.init(e, t), ey.init(e, t);
});
function eH(e) {
    return new eU({
        type: "nullable",
        innerType: e
    });
}
const eF = g("ZodMiniCatch", (e, t)=>{
    eg.init(e, t), ey.init(e, t);
}), eG = g("ZodMiniLazy", (e, t)=>{
    eh.init(e, t), ey.init(e, t);
});
function eB() {
    let e = new eG({
        type: "lazy",
        getter: ()=>ex([
                eb(),
                ez(),
                eS(),
                new eP({
                    type: "null",
                    ...$(void 0)
                }),
                eA(e),
                eM(eb(), e)
            ])
    });
    return e;
}
let eK = eO({
    error: ex([
        eb(),
        eO({
            code: eb(),
            message: eb()
        })
    ])
});
class eJ extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eX(e) {
    let t = eK.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eJ("rpc", e) : new eJ(e.code, e.message);
    }
    return e;
}
eO({
    status: eI("pending"),
    job: eb()
}), e$("status", [
    eO({
        status: eI("pending")
    }),
    eO({
        status: eI("ready"),
        chunk: ez(),
        chunks: ez(),
        bytes: ez(),
        data: eb()
    })
]);
let eQ = eb(), eY = ez(), e0 = eS(), e1 = eq(eQ), e2 = eq(eY), e4 = eq(e0);
const e5 = eD([
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
]), e6 = eD([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), e7 = eO({
    id: eQ,
    name: eq(eH(eQ)),
    kind: eD([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: eQ,
    state: eQ,
    reason: e1,
    revision: e1,
    current_revision: e4,
    management_fresh: e4,
    operation_id: e2,
    task_id: eq(eH(eY)),
    updated_at: e2,
    changes: eq(eA(eO({
        name: eQ,
        desired: eQ
    })))
});
let e3 = eO({
    state: eQ,
    reason: e1,
    task_id: eq(eH(eY)),
    instance: e2
});
const e9 = eO({
    cwmp_id: eQ,
    state: eD([
        "online",
        "waiting_inform",
        "offline_or_stale"
    ]),
    optical_online: e0,
    last_inform: eH(eY),
    age_seconds: eH(eY)
});
let e8 = eO({
    state: eD([
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
    method: e1,
    reason: e1,
    mqtt_target: eH(eQ),
    binding_source: e1,
    link_identity_error: eH(eQ),
    mqtt_last_seen: eH(eY),
    cwmp_id: e1,
    desired_version: e1,
    generation: e2,
    inflight: e4,
    attempts: e2,
    next_retry_at: e2,
    updated_at: e2,
    settings_verified_at: eH(eY),
    last_inform: eH(eY),
    last_error: eq(eH(eQ)),
    persistence_error: eq(eH(eQ)),
    desired: eq(eH(eO({
        vlan: eY,
        vlans: eA(eY),
        priority: eY,
        acs_url: eQ
    }))),
    listener: eq(eO({
        enabled: e0,
        listen: eQ,
        path: eQ,
        error: eH(eQ)
    })),
    endpoint_notice: e1,
    manual_steps: eq(eA(eQ))
});
const te = e$("state", [
    e8,
    function(e, t) {
        if (!N(t)) throw Error("Invalid input to extend: expected a plain object");
        let n = e._zod.def.checks;
        if (n && n.length > 0) {
            let n = e._zod.def.shape;
            for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(n, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let i = j(e._zod.def, {
            get shape () {
                let n = {
                    ...e._zod.def.shape,
                    ...t
                };
                return k(this, "shape", n), n;
            }
        });
        return C(e, i);
    }(function(e) {
        var t = void 0;
        let n = e._zod.def.checks;
        if (n && n.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let i = j(e._zod.def, {
            get shape () {
                let n = e._zod.def.shape, i = {
                    ...n
                };
                if (t) for(let e in t){
                    if (!(e in n)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (i[e] = eW ? new eW({
                        type: "optional",
                        innerType: n[e]
                    }) : n[e]);
                }
                else for(let e in n)i[e] = eW ? new eW({
                    type: "optional",
                    innerType: n[e]
                }) : n[e];
                return k(this, "shape", i), i;
            },
            checks: []
        });
        return C(e, i);
    }(e8), {
        state: eD([
            "pending",
            "unavailable"
        ]),
        reason: eQ
    })
]), tt = eO({
    state: e5,
    operation_id: e2,
    device: e1,
    optical_sn: e1,
    cwmp_id: e1,
    revision: e1,
    mode: eq(eD([
        "apply",
        "plan"
    ])),
    started_at: e2,
    current_revision: e4,
    management_fresh: e4,
    reason: e1,
    error: e1,
    attempts: e2,
    next_retry_at: e2,
    reconcile_reason: e1,
    items: eA(e7),
    cwmp_contract: eq(eO({
        state: eQ,
        requested: eQ,
        contract: eH(eQ),
        reason: eQ,
        cache_hit: e0,
        schema: eQ,
        capabilities: eH(eO({
            wan: eQ,
            wlan: eQ,
            binding: eQ
        }))
    })),
    wan_objects: eq(eM(eQ, eB())),
    wan_lifecycle: eq(eM(eQ, e3)),
    wan_stage: eq(eD([
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
    wifi_objects: eq(eO({
        owned: eA(eY),
        pending: eH(eQ),
        pending_instance: eH(eY)
    })),
    wifi_lifecycle: eq(eM(eQ, e3)),
    wifi_stage: eq(eD([
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
    wifi_cleanup: eq(eD([
        "disable",
        "preserve",
        "delete"
    ]))
});
let tn = eO({
    enabled: e0,
    mode: eD([
        "auto",
        "manual"
    ]),
    vlan: eA(eY),
    priority: eY,
    address: eQ,
    acs_url: eQ,
    port: eY,
    path: eQ,
    dhcp_enabled: e0
}), ti = eO({
    state: eD([
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
    error: eH(eQ),
    inflight: e0,
    ready: e0,
    desired_version: eH(eQ),
    applied_version: eH(eQ),
    next_retry_at: eY,
    attempts: eY,
    desired: eH(tn),
    applied: eH(tn),
    previous: eH(tn),
    plan: eA(eO({
        operation: eQ,
        key: eQ,
        value: eA(eQ)
    }))
});
const tr = eO({
    device: eQ,
    name: eH(eQ),
    group: eH(eQ),
    group_name: eH(eQ),
    template: eH(eQ),
    template_name: eH(eQ),
    optical_sn: eQ,
    adapter: eQ,
    omci_management: eO({
        state: eQ,
        reason: e1
    }),
    management: eH(e9),
    acs_bootstrap: te,
    provisioning: tt,
    services: eA(e7),
    ssids: eA(e7),
    wifi_sync: e6
}), ta = eO({
    enabled: e0,
    mode: eD([
        "auto",
        "manual"
    ]),
    method: eI("diff"),
    revision: eQ,
    triggers: eA(eQ),
    interval_minutes: new ew({
        type: "number",
        coerce: !0,
        checks: [],
        ...$(void 0)
    }),
    error: eH(eQ),
    devices: eA(tr),
    management_network: ti,
    omci_management: eB(),
    groups: eA(eO({
        id: eQ,
        name: eH(eQ),
        template: eQ
    })),
    pending_devices: eA(eQ)
}), to = ex([
    eO({
        valid: eI(!0),
        revision: eQ,
        devices: eY,
        error: eq(ej())
    }),
    eO({
        error: eQ,
        valid: eq(ej()),
        revision: eq(ej()),
        devices: eq(ej())
    })
]);
let ts = eb(), tl = ez(), td = eH(tl), tc = eM(ts, eO({
    source: ts,
    unit: ts,
    reason: eH(ts),
    raw: eH(ts),
    age_seconds: td
}));
const tu = eO({
    phase: eD([
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
    generation: tl,
    error: eH(ts)
}), tp = eD([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let t_ = eO({
    model: ts,
    wavelength_tx_nm: tl,
    wavelength_rx_nm: tl,
    phy_rate_downlink_gbps: tl,
    phy_rate_uplink_gbps: tl,
    tx_power_dbm: td,
    laser_bias_current_ma: td,
    temperature_celsius: td,
    vcc_voltage: td,
    cdr_locked: eH(eS()),
    tx_enabled: eH(eS()),
    measurements: tc
}), tf = eO({
    equipment_id: eH(ts),
    hardware_version: eH(ts),
    software_images: eA(ts),
    omcc_version: td,
    errors: eA(ts)
});
const tm = eO({
    onu_id: tl,
    vendor: ts,
    model: ts,
    serial_number: ts,
    state: tp,
    business_status: tu,
    management: eH(e9),
    provisioning: eH(tt),
    services: eA(e7),
    ssids: eA(e7),
    wifi_sync: e6,
    acs_bootstrap: eq(te),
    identity: eH(tf),
    identity_age_seconds: td,
    identity_current: eS(),
    fiber_distance_m: td,
    ranging_delay_rtd_ns: td,
    equalization_delay_bits: new eF({
        type: "catch",
        innerType: td,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: td,
    optical_tx_power_dbm: td,
    firmware_version: ts,
    hardware_version: ts,
    uptime_seconds: td,
    data_path: eO({
        interface: ts,
        gem_ports: eH(eA(tl)),
        vlan_id: td,
        tx_bytes: td,
        rx_bytes: td,
        current_tx_kbps: td,
        current_rx_kbps: td,
        measurements: tc
    }),
    wifi_mesh: eO({
        channel_2g: td,
        channel_5g: td,
        bandwidth_5g: eH(ts),
        tx_power_pct: td,
        measurements: tc
    }),
    connected_clients: eH(eA(eO({
        mac: ts,
        ip: ts,
        band: ts,
        rssi_dbm: td,
        rx_rate_mbps: td,
        tx_rate_mbps: td
    }))),
    measurements: tc
});
let tg = eO({
    port: tl,
    interface: ts,
    carrier: eS(),
    status: ts,
    onu_id: eq(tl),
    onu_sn: eq(ts),
    link_state: ts
});
const th = eO({
    fpga_status: ts,
    provisioning: eH(ta),
    optical_transceiver: t_,
    switch_ports: eA(tg),
    sub_gateways: eA(tm),
    telemetry_gateways: eA(eO({
        id: ts,
        last_seen_sec_ago: tl,
        last_payload_bytes: tl
    }))
});
eM(ts, eO({
    carrier: eq(eS()),
    mac: eq(ts),
    link: eq(eO({
        speed: eq(tl),
        duplex: eq(ts),
        autoneg: eq(eS())
    })),
    stats: eq(eM(ts, tl))
})), _("Not started"), _("Collecting identity"), _("Retrying identity"), _("Unsupported"), _("Configuring"), _("Verifying"), _("WAN pending"), _("Verified"), _("Retrying"), _("Offline");
let ty = L.rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: !0
}), tv = (L.rpc.declare({
    object: "luci.fttr",
    method: "get_sync",
    reject: !0
}), L.rpc.declare({
    object: "luci.fttr",
    method: "config_check",
    reject: !0
})), tb = L.rpc.declare({
    object: "luci.fttr",
    method: "config_reload",
    reject: !0
}), tw = L.rpc.declare({
    object: "luci.fttr",
    method: "restart_service",
    reject: !0
});
L.rpc.declare({
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
const tz = async ()=>th.parse(eX(await ty())), tL = async ()=>to.parse(await tv()), tS = async ()=>ta.parse(eX(await tb())), tP = async ()=>eO({
        restarting: eI(!0)
    }).parse(eX(await tw()));
eO({
    schema_version: eI(1),
    status: eD([
        "success",
        "error"
    ]),
    action: eD([
        "optical_on",
        "optical_off",
        "optical_status",
        "optical_reload",
        "optical_reinitialize",
        "optical_shutdown"
    ]),
    desired_enabled: eH(eS()),
    tx_enabled: eH(eS()),
    actor_state: eD([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: eS(),
    discovery_active: eS(),
    cleanup_pending: eS(),
    error: eH(eO({
        code: eb(),
        message: eb()
    }))
}), L.rpc.declare({
    object: "luci.fttr",
    method: "optical_status",
    reject: !0
}), L.rpc.declare({
    object: "luci.fttr",
    method: "optical_set",
    params: [
        "enabled"
    ],
    reject: !0
}), ex([
    eO({
        operation_ids: eA(ez()),
        revision: eb()
    }),
    eO({
        started: eI(!0),
        mode: eD([
            "apply",
            "plan"
        ])
    }),
    eO({
        reset: eI(!0),
        device: eb()
    }),
    eO({
        operation_ids: eA(ez()),
        mode: eD([
            "apply",
            "plan"
        ]),
        reconcile: eq(eS()),
        retry: eq(eS())
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
}), eO({
    source: eD([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: eb(),
    size: ez(),
    sha256: eb(),
    data: eq(eb()),
    factory: eO({
        detected: eS(),
        device: eb(),
        has_data: eS(),
        sha256: eb(),
        data: eb()
    }),
    firmware: eO({
        exists: eS(),
        path: eb(),
        size: ez(),
        sha256: eb(),
        data: eb()
    }),
    error: eq(eb())
}), eO({
    success: eS(),
    path: eb(),
    size: ez(),
    sha256: eb(),
    error: eq(eb())
}), eO({
    success: eS(),
    output: eq(eb()),
    error: eq(eb())
});
let tk = eO({
    schema_version: eI(1),
    version: eb(),
    features: eO({
        acs: eS(),
        mqtt: eS(),
        "device-hl202": eS(),
        "device-hwtc": eS()
    }),
    functions: eO({
        optical: eS(),
        omci_mib: eS(),
        mqtt_telemetry: eS(),
        hl202_management: eS(),
        cwmp: eS()
    }),
    pages: eO({
        status: eS(),
        config: eS(),
        sync: eS(),
        hl202: eS(),
        hardware: eS(),
        calibration: eS(),
        about: eS()
    })
}), tj = L.rpc.declare({
    object: "luci.fttr",
    method: "get_capabilities",
    reject: !0
});
const tT = async ()=>tk.parse(eX(await tj()));
async function tA(e) {
    if (!(await tT()).pages[e]) throw Error(_("This page is not supported by the installed FTTR build."));
}
let tN = L.view, tO = L.uci, tE = L.form;
async function tx(e, t, n) {
    try {
        let i = await e();
        t.textContent = JSON.stringify(i, null, 2), n?.(i);
    } catch (e) {
        t.textContent = String(e), n?.({
            error: String(e)
        });
    }
}
let main = tN.extend({
    async load () {
        await tA("config"), await tO.load("fttr"), tO.sections("fttr", "provisioning").length || tO.add("fttr", "provisioning", "provisioning"), tO.sections("fttr", "management").length || tO.add("fttr", "management", "management");
        let [e, t] = await Promise.all([
            tL().catch((e)=>({
                    error: String(e)
                })),
            tz().catch((e)=>({
                    error: String(e),
                    sub_gateways: []
                }))
        ]);
        return {
            error: e.error || ("error" in t ? t.error : void 0),
            connectedDevices: t.sub_gateways
        };
    },
    render (e) {
        var t, n, i;
        let r, a, s, g, h = new tE.Map("fttr", _("FTTR configuration")), y = h.section(tE.NamedSection, "acs", "acs");
        y.addremove = !1, y.anonymous = !1;
        let v = tO.sections("fttr", "provisioning")[0]?.[".name"] ?? "provisioning";
        (function(e, t, n) {
            e.tab("basic", t);
            let i = e.taboption("basic", L.form.SectionValue, "_acs", L.form.NamedSection, "acs", "acs").subsection;
            i.addremove = !1, i.anonymous = !1;
            let r = l(i, L.form.Flag, "enabled", _("Enable ACS"));
            r.default = "1", r.rmempty = !1, (r = l(i, L.form.Value, "port", _("Listen port"), "port")).default = "7547", r.rmempty = !1, (r = l(i, L.form.Value, "path", _("CWMP path"))).default = "/cwmp", r.rmempty = !1, r.validate = (e, t)=>!!t.startsWith("/") || _("The path must start with '/'."), (r = l(i, L.form.Value, "state_file", _("ACS state file"))).default = "/var/lib/fttr/acs-state.json", r.rmempty = !1, r.validate = (e, t)=>!!t.startsWith("/") || _("The state file path must be absolute."), (r = l(i, L.form.Value, "username", _("HTTP Basic username"))).optional = !0, r.rmempty = !0, (r = l(i, L.form.Value, "password", _("HTTP Basic password"))).password = !0, r.optional = !0, r.rmempty = !0;
            let a = e.taboption("basic", L.form.SectionValue, "_management", L.form.NamedSection, "management", "management").subsection;
            a.addremove = !1, (r = l(a, L.form.Flag, "enabled", _("Enable management network"))).default = "1", r.rmempty = !1, (r = d(a, "mode", _("Management application mode"), [
                [
                    "manual",
                    _("Manual")
                ],
                [
                    "auto",
                    _("Automatic")
                ]
            ])).default = "auto", r.rmempty = !1, r.description = _("Manual mode only discovers and plans. Use Apply management configuration on the Synchronization page to create or update the isolated network, ACS listener and child TR069 settings."), (r = l(a, L.form.Value, "address", _("Management IPv4 address/prefix"), "cidr4")).default = "192.168.46.1/24", r.rmempty = !1, r.description = _("The local ACS binds to this address. The child ACS URL is generated from this address, the ACS port and CWMP path."), (r = l(a, L.form.DummyValue, "_generated_acs_url", _("Generated ACS URL"))).cfgvalue = ()=>{
                let t = e.map.data, n = String(t.get("fttr", "management", "address") || "192.168.46.1/24").split("/")[0];
                return `http://${n}:${t.get("fttr", "acs", "port") || "7547"}${t.get("fttr", "acs", "path") || "/cwmp"}`;
            }, (r = l(a, L.form.DynamicList, "vlan", _("TR069 VLANs"), "range(1,4094)")).default = [
                "46"
            ], r.rmempty = !1, r.description = _("All listed VLANs share one management bridge and DHCP pool. Retain an existing listed management VLAN; the first VLAN is the fallback."), r.validate = (e, t)=>!!("" === t || /^\d+$/.test(t) && Number(t) >= 1 && 4094 >= Number(t)) || _("Enter a VLAN ID in 1\u20134094.");
            let o = r.parse;
            for (let [e, t, n] of (r.parse = function(e) {
                let t = this.formvalue(e) || [];
                return t.length ? new Set(t.map(Number)).size !== t.length ? Promise.reject(Error(_("Duplicate VLAN IDs are not allowed."))) : o.call(this, e) : Promise.reject(Error(_("Enter at least one VLAN ID in 1\u20134094.")));
            }, (r = l(a, L.form.Value, "priority", _("Priority"), "range(0,7)")).default = "0", r.rmempty = !1, (r = l(a, L.form.Flag, "dhcp_enabled", _("Enable management DHCP"))).default = "1", r.rmempty = !1, [
                [
                    "dhcp_start",
                    _("DHCP start offset"),
                    "100"
                ],
                [
                    "dhcp_limit",
                    _("DHCP address count"),
                    "100"
                ],
                [
                    "dhcp_leasetime",
                    _("DHCP lease time"),
                    "12h"
                ]
            ]))(r = l(a, L.form.Value, e, t)).default = n, r.rmempty = !1, r.depends("dhcp_enabled", "1");
            let s = e.taboption("basic", L.form.SectionValue, "_policy", L.form.NamedSection, n, "provisioning").subsection;
            for (let [e, t] of (s.addremove = !1, s.anonymous = !1, (r = l(s, L.form.Flag, "enabled", _("Enable provisioning"))).default = "1", r.rmempty = !1, (r = l(s, L.form.Flag, "allow_unsupported_as_bridge", _("Allow unsupported ONUs as bridge"))).default = "0", r.rmempty = !1, r.description = _("Automatically provision standard G.988 transparent Layer 2 bridge for unrecognized or third-party GPON ONUs in O5 state."), (r = d(s, "mode", _("Synchronization mode"), [
                [
                    "auto",
                    _("Automatic")
                ],
                [
                    "manual",
                    _("Manual")
                ]
            ])).default = "auto", r.description = _("Manual mode only saves configuration; use Apply differences on the Synchronization page to send it to devices. Automatic mode synchronizes after Save & Apply when Configuration changed is selected."), r = l(s, L.form.MultiValue, "trigger", _("Automatic triggers")), [
                [
                    "config_change",
                    _("Configuration changed")
                ],
                [
                    "device_online",
                    _("Device online")
                ],
                [
                    "cwmp_boot",
                    _("CWMP boot")
                ],
                [
                    "program_start",
                    _("Program start")
                ],
                [
                    "periodic",
                    _("Periodic")
                ]
            ]))r.value(e, t);
            r.default = [
                "config_change",
                "device_online",
                "cwmp_boot",
                "program_start",
                "periodic"
            ], r.retain = !0, r.depends("mode", "auto"), (r = l(s, L.form.Value, "interval_minutes", _("Periodic synchronization interval (minutes)"))).default = "30", r.retain = !0, r.depends("mode", "auto"), r.validate = (e, t)=>!!(/^(0|[1-9][0-9]*)$/.test(t) && (0 === Number(t) || Number(t) >= 1 && 1440 >= Number(t))) || _("Use 0 to disable, or 1\u20131440 minutes."), (r = l(s, L.form.Value, "freshness", _("CWMP freshness (seconds)"), "range(1,86400)")).default = "180";
        })(y, _("Basic"), v), r = new Map((t = e.connectedDevices ?? []).map((e)=>[
                e.serial_number,
                e
            ])), a = (e)=>{
            let t = r.get(e), n = L.uci.sections("fttr", "device").find((t)=>t.optical_sn === e), i = t?.model || String(n?.adapter || _("Unknown model"));
            return `${i} \xb7 ${e} \xb7 ${t?.state === "o5_operation" ? _("Connected") : _("Offline")}${t?.onu_id != null ? ` \xb7 ONU ${t.onu_id}` : ""}`;
        }, y.tab("devices", _("Devices & groups")), u(y, "devices", "_groups", "group", _("Groups"), (e)=>{
            p(e, "_name", _("Group"), (e)=>String(L.uci.get("fttr", e, "name") || e)), l(e, L.form.Value, "name", _("Name")).modalonly = !0, c(e, "template", _("Template"), "template").modalonly = !0;
        }), u(y, "devices", "_devices", "device", _("Devices"), (e)=>{
            p(e, "_device", _("Device"), (e)=>{
                let t = String(L.uci.get("fttr", e, "optical_sn") || "");
                return t ? a(t) : _("New device");
            });
            let n = l(e, L.form.ListValue, "optical_sn", _("Connected device"));
            n.modalonly = !0, n.rmempty = !1, n.description = _("Lists supported devices registered on the optical link, including devices that have not sent an ACS Inform. Devices already configured are omitted when adding a new device.");
            let i = n.renderWidget;
            n.renderWidget = function(e, n, r) {
                this.keylist = [], this.vallist = [];
                let o = String(L.uci.get("fttr", e, "optical_sn") || ""), s = new Set(L.uci.sections("fttr", "device").filter((t)=>t[".name"] !== e).map((e)=>e.optical_sn));
                for (let e of t)"o5_operation" === e.state && m(e) && !s.has(e.serial_number) && this.value(e.serial_number, a(e.serial_number));
                o && !this.keylist.includes(o) && this.value(o, a(o));
                let l = r || o || this.keylist[0] || "";
                return i.call(this, e, n, l);
            }, n.validate = (e, t)=>t ? !L.uci.sections("fttr", "device").some((n)=>n[".name"] !== e && n.optical_sn === t) || _("Device already configured.") : _("Select device."), n.write = (e, t)=>{
                L.uci.set("fttr", e, "optical_sn", t);
                let n = m(r.get(t));
                n && !L.uci.get("fttr", e, "adapter") && L.uci.set("fttr", e, "adapter", n);
            };
            let o = d(e, "adapter", _("Device adapter"), [
                [
                    "hl202",
                    "H3C HL202"
                ],
                [
                    "hwtc",
                    "Huawei HWTC"
                ],
                [
                    "generic",
                    _("Generic G.988 Bridge")
                ]
            ]);
            o.modalonly = !0, o.default = "generic", o.rmempty = !1, c(e, "group", _("Group"), "group").modalonly = !0;
            let s = d(e, "cwmp_contract", _("CWMP contract"), [
                [
                    "auto",
                    _("Automatic (read-only capability discovery)")
                ],
                [
                    "hl202-cu",
                    "HL202 \xb7 CU"
                ],
                [
                    "hwtc-hw",
                    "HWTC \xb7 HW"
                ],
                [
                    "vendor-cu-parent-vlan",
                    `CU \xb7 ${_("Unverified candidate")}`
                ],
                [
                    "vendor-hw-connection-vlan",
                    `HW \xb7 ${_("Unverified candidate")}`
                ],
                [
                    "vendor-cm-candidate",
                    `CM \xb7 ${_("Unverified candidate")}`
                ],
                [
                    "vendor-ct-candidate",
                    `CT \xb7 ${_("Unverified candidate")}`
                ]
            ]);
            s.modalonly = !0, s.default = "auto", s.rmempty = !1, s.description = _("Independent of the optical adapter. Parameter paths, types and writable evidence are discovered before synchronization. Unverified candidates do not authorize writes.");
            let u = l(e, L.form.Flag, "connection_request", _("Supports Connection Request"));
            u.modalonly = !0, u.default = "1", u.rmempty = !1, u.description = _("Independent per device; enabled by default for all adapters. Enabled: on-demand sessions with periodic Inform enabled and an interval of at most 12 hours (backend default: 43200 seconds). Disabled: manually set PeriodicInformEnable to true and PeriodicInformInterval to at most 180 seconds; no interval is written automatically. Requires reachable CWMP, verified standard parameters, HTTP Digest support, a prior Inform with a ConnectionRequestURL and valid CPE credentials. Firmware support is not guaranteed. Acceptance is not proof of a session or completed RPCs.");
            let f = l(e, L.form.Flag, "connection_request_defaults", _("Use backend Connection Request defaults"));
            f.modalonly = !0, f.default = "1", f.rmempty = !1, f.retain = !0, f.depends("connection_request", "1"), f.cfgvalue = (e)=>{
                let t = L.uci.get("fttr", e, "connection_request_defaults");
                return null != t ? String(t) : L.uci.get("fttr", e, "connection_request_username") && L.uci.get("fttr", e, "connection_request_password") ? "0" : "1";
            }, f.description = _("Uses a backend-reserved profile; factory credentials are not yet verified. Disable to enter this CPE's existing credentials and port. Saved custom values are retained while hidden.");
            let g = l(e, L.form.Value, "connection_request_username", _("CPE Connection Request username"));
            g.modalonly = !0, g.optional = !0, g.rmempty = !0, g.retain = !0, g.depends({
                connection_request: "1",
                connection_request_defaults: "0"
            }), g.description = _("Enter this CPE's existing Connection Request credentials, not the ACS inbound HTTP Basic credentials. No custom credential defaults are assumed.");
            let h = l(e, L.form.Value, "connection_request_password", _("CPE Connection Request password"));
            h.modalonly = !0, h.password = !0, h.optional = !0, h.rmempty = !0, h.retain = !0, h.depends({
                connection_request: "1",
                connection_request_defaults: "0"
            }), h.description = _("Saved custom values are retained when Connection Requests are disabled or backend defaults are selected. Leave these fields unchanged to preserve their saved values.");
            let y = l(e, L.form.Value, "connection_request_port", _("CPE Connection Request port"), "port");
            y.modalonly = !0, y.default = "7547", y.rmempty = !1, y.retain = !0, y.depends({
                connection_request: "1",
                connection_request_defaults: "0"
            });
            let v = l(e, L.form.Flag, "omci_management", _("Provision management VLAN and ACS via OMCI"));
            v.modalonly = !0, v.default = "0", v.rmempty = !1, v.description = _("Disabled by default. Uses the global management VLAN, priority and ACS URL for this device only, subject to management application authorization. Disabling skips future OMCI management writes and retains existing ONU settings. ME readback does not prove WAN creation or successful Inform; K155 may clear its local ACS URL when enabled.");
            let b = d(e, "wifi_cleanup", _("Unconfigured WLANs"), [
                [
                    "disable",
                    _("Disable (keep the WLAN object)")
                ],
                [
                    "preserve",
                    _("Leave unchanged")
                ],
                [
                    "delete",
                    _("Delete the WLAN object")
                ]
            ]);
            b.modalonly = !0, b.default = "disable", b.description = _("By default, extra WLANs are disabled and retained. Deleting objects is destructive and should only be selected deliberately.");
        }), y.tab("templates", _("Templates")), g = (s = u(y, "templates", "_templates", "template", _("Templates"), (e)=>{
            p(e, "_name", _("Template"), (e)=>String(L.uci.get("fttr", e, "name") || _("New template")));
            let t = l(e, L.form.Value, "name", _("Name"));
            t.modalonly = !0, t.rmempty = !1;
        })).handleRemove, s.handleRemove = function(e, t) {
            if (L.uci.sections("fttr", "group").some((t)=>t.template === e)) return L.ui.addNotification(null, o("p", {
                children: _("Template is in use.")
            }), "error"), Promise.resolve();
            for (let t of [
                "network",
                "wifi"
            ])for (let n of L.uci.sections("fttr", t))n.template === e && L.uci.remove("fttr", n[".name"]);
            return g.call(this, e, t);
        }, s.addModalOptions = (e, t)=>{
            let n, i;
            e.tab("general", _("General")), e.getOption("name").tab = "general", e.tab("wifi", _("SSIDs")), e.tab("networks", _("Networks")), i = (n = f(e, "wifi", "_wifi", "wifi", _("SSIDs"), t, (e)=>{
                p(e, "_ssid", _("SSID"), (e)=>String(L.uci.get("fttr", e, "ssid") || e));
                let t = l(e, L.form.Value, "ssid", _("SSID"));
                t.modalonly = !0, t.rmempty = !1, t.validate = (e, t)=>new TextEncoder().encode(t).length >= 1 && new TextEncoder().encode(t).length <= 32 || _("SSID must be 1\u201332 bytes."), d(e, "radio", _("Band"), [
                    [
                        "2g",
                        "2.4 GHz"
                    ],
                    [
                        "5g",
                        "5 GHz"
                    ]
                ]).modalonly = !0, d(e, "security", _("Security"), [
                    [
                        "",
                        _("Keep current key")
                    ],
                    [
                        "wpa2-psk",
                        "WPA2-PSK"
                    ],
                    [
                        "wpa3-sae",
                        "WPA3-SAE"
                    ],
                    [
                        "wpa2-psk/wpa3-sae",
                        "WPA2-PSK / WPA3-SAE"
                    ],
                    [
                        "wpa-psk/wpa2-psk",
                        "WPA-PSK / WPA2-PSK"
                    ],
                    [
                        "none",
                        _("None (Open)")
                    ]
                ], !0).modalonly = !0;
                let n = l(e, L.form.Value, "key", _("Password"));
                n.password = !0, n.modalonly = !0, n.depends("security", "wpa2-psk"), n.depends("security", "wpa3-sae"), n.depends("security", "wpa2-psk/wpa3-sae"), n.depends("security", "wpa-psk/wpa2-psk"), n.rmempty = !1, n.validate = (e, t)=>{
                    let n = new TextEncoder().encode(t).length;
                    return n >= 8 && n <= 63 || _("Password must be 8\u201363 bytes.");
                };
            })).handleRemove, n.handleRemove = function(e, t) {
                for (let t of L.uci.sections("fttr", "network")){
                    let n = null == t.ssid ? [] : Array.isArray(t.ssid) ? t.ssid : [
                        t.ssid
                    ];
                    n.includes(e) && L.uci.set("fttr", t[".name"], "ssid", n.filter((t)=>t !== e).map(String));
                }
                return i.call(this, e, t);
            }, f(e, "networks", "_networks", "network", _("Networks"), t, (e)=>{
                p(e, "_name", _("Network"), (e)=>`${String(L.uci.get("fttr", e, "name") || _("New network"))} \xb7 VLAN ${String(L.uci.get("fttr", e, "vlan") || "0")}`);
                let n = l(e, L.form.Value, "name", _("Name"));
                n.modalonly = !0, n.rmempty = !1;
                let i = l(e, L.form.MultiValue, "service_list", _("WAN Service List (multi-select)"));
                for (let e of (i.modalonly = !0, i.description = _("For custom VLANs, select any combination of INTERNET, OTHER, IPTV, and VOIP. TR069 is reserved for OMCI."), [
                    "INTERNET",
                    "OTHER",
                    "IPTV",
                    "VOIP"
                ]))i.value(e, e);
                for (let [t, n, i] of [
                    [
                        "vlan",
                        _("VLAN"),
                        "range(0,4094)"
                    ],
                    [
                        "priority",
                        _("Priority"),
                        "range(0,7)"
                    ]
                ]){
                    let r = l(e, L.form.Value, t, n, i);
                    r.default = "0", r.rmempty = !1, r.modalonly = !0;
                }
                let r = l(e, L.form.MultiValue, "ssid", _("SSIDs"));
                for (let e of (r.modalonly = !0, L.uci.sections("fttr", "wifi")))e.template === t && r.value(e[".name"], String(e.ssid || _("SSID")));
                let a = l(e, L.form.MultiValue, "port", _("Ports"));
                a.modalonly = !0;
                for(let e = 1; e <= 4; e++)a.value(`lan${e}`, `LAN${e}`);
            });
        };
        let b = h.save;
        h.save = function(e, t) {
            return tO.unset("fttr", "acs", "listen"), tO.unset("fttr", "management", "acs_url"), b.call(this, e, t);
        };
        let w = o("pre", {
            style: "white-space:pre-wrap;overflow-wrap:anywhere",
            "aria-live": "polite"
        }), z = null, S = (e)=>{
            z?.parentNode?.removeChild(z), z = null, e?.error && (z = L.ui.addNotification(_("FTTR configuration check failed"), o("p", {
                children: String(e.error)
            }), "error"));
        };
        S(e);
        let P = (i = {
            class: "cbi-section",
            children: [
                (n = {
                    children: [
                        _("Saving configuration does not synchronize devices in Manual mode. After Save & Apply, open Synchronization and choose Apply differences. Preview differences is read-only."),
                        " ",
                        o("a", {
                            href: L.url("admin", "network", "fttr", "sync"),
                            children: _("Open Synchronization")
                        })
                    ]
                }, o("p", n)),
                o("h3", {
                    children: _("Configuration diagnostics")
                }),
                o("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    onclick: ()=>tx(tL, w, S),
                    children: _("Check")
                }),
                " ",
                o("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    disabled: !L.hasViewPermission(),
                    onclick: ()=>tx(async ()=>(await tS(), await tL()), w, S),
                    children: _("Reload")
                }),
                " ",
                o("button", {
                    class: "cbi-button cbi-button-negative",
                    type: "button",
                    disabled: !L.hasViewPermission(),
                    onclick: ()=>tx(tP, w),
                    children: _("Restart")
                }),
                w
            ]
        }, o("div", i));
        return h.render().then((e)=>o("div", {
                children: [
                    e,
                    P
                ]
            }));
    }
});

return main;