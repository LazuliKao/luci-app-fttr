'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, n, i, r, a;
const o = Symbol.for("jsx.fragment");
function s(e, t) {
    let { children: n, ...i } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, r = function e(t) {
        let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let i of t)null != i && "boolean" != typeof i && (Array.isArray(i) ? e(i, n) : n.push(i instanceof Node ? i : String(i)));
        return n;
    }(null == n ? [] : Array.isArray(n) ? n : [
        n
    ]);
    if (e === o) {
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
    let a = {}, s = {
        ...i
    };
    for (let [e, t] of Object.entries(s))e.startsWith("on") && "function" == typeof t ? (a[e] = t, delete s[e]) : "boolean" == typeof t && (t ? s[e] = e : delete s[e]);
    let l = Object.keys(s).length > 0 ? r.length > 1 ? E(e, s, r) : E(e, s, r[0]) : r.length > 1 ? E(e, {}, r) : E(e, {}, r[0]);
    for (let [e, t] of Object.entries(a)){
        let n = e.slice(2).toLowerCase();
        l.addEventListener(n, t);
    }
    return l;
}
let l = L.form;
function c(e, t, n, i, r) {
    let a = e.option(t, n, i);
    return r && (a.datatype = r.startsWith("range(") ? `and(uinteger,${r})` : r), a;
}
function d(e, t, n, i, r, a) {
    let o = e.taboption(t, n, i, r);
    return a && (o.datatype = a.startsWith("range(") ? `and(uinteger,${a})` : a), o;
}
function u(e, t, n, i) {
    let r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], a = c(e, l.ListValue, t, n);
    for (let [e, t] of i)a.value(e, t);
    return a.rmempty = r, a;
}
function p(e, t, n, i, r) {
    let a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5], o = d(e, t, l.ListValue, n, i);
    for (let [e, t] of r)o.value(e, t);
    return o.rmempty = a, o;
}
function m(e, t, n, i) {
    let r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], a = c(e, l.RichListValue, t, n);
    return a.rmempty = r, a.optional = r, a.default = "", f(a, ()=>[
            ...r ? [
                [
                    "",
                    _("None")
                ]
            ] : [],
            ...L.uci.sections("fttr", i).map((e)=>[
                    e[".name"],
                    String(e.name || e.ssid || e.optical_sn || e[".name"])
                ])
        ]), a.validate = (e, t)=>!!(r && !t || L.uci.sections("fttr", i).some((e)=>e[".name"] === t)) || _("Select an existing item."), a;
}
function f(e, t) {
    let n = e.transformChoices;
    e.transformChoices = function() {
        return n.call(this) ?? {};
    };
    let i = e.renderWidget;
    e.renderWidget = function() {
        for(var e = arguments.length, n = Array(e), r = 0; r < e; r++)n[r] = arguments[r];
        for (let [e, i] of (this.keylist = [], this.vallist = [], t.call(this, String(n[0]))))this.value(e, i);
        return i.apply(this, n);
    };
}
function g(e, t, n, i, r, a) {
    let o = e.taboption(t, l.SectionValue, n, l.GridSection, i, r).subsection;
    return o.anonymous = !0, o.addremove = !0, o.modaltitle = (e)=>String(L.uci.get("fttr", e, "name") || L.uci.get("fttr", e, "ssid") || r), a(o), o.addModalOptions = (e, t)=>{
        let n = e.map.parse;
        e.map.parse = function() {
            let i = !0;
            for (let n of e.children){
                if (!n.isActive(t)) continue;
                n.triggerValidation(t), n.isValid(t) || (i = !1);
                let e = n.formvalue(t);
                !n.rmempty && !n.optional && (null == e || "" === e || Array.isArray(e) && !e.length) && (n.getUIElement(t)?.setInvalid(_("This field is required.")), i = !1);
            }
            return i ? n.call(this) : Promise.reject(Error(_("Correct the invalid fields before saving.")));
        };
    }, o;
}
function h(e, t, n, i) {
    let r = e.option(L.form.DummyValue, t, n);
    r.modalonly = !1, r.textvalue = i;
}
function v(e) {
    h(e, "_template", _("Template"), (e)=>{
        let t = String(L.uci.get("fttr", e, "template") || "");
        return String(L.uci.get("fttr", t, "name") || t || _("Missing template"));
    });
    let t = m(e, "template", _("Template"), "template");
    return t.modalonly = !0, t;
}
function y(e, t) {
    let n = e.handleRemove;
    e.handleRemove = async function(e, i) {
        try {
            t(e), await n.call(this, e, i);
        } catch (e) {
            L.ui.addNotification(null, s("p", {
                children: String(e instanceof Error ? e.message : e)
            }), "error");
        }
    };
}
function b(e, t, n) {
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
class w extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const S = {};
function k(e) {
    return e && Object.assign(S, e), S;
}
function z(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function j(e) {
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
function P(e) {
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const A = Symbol("evaluating");
function C(e, t, n) {
    let i;
    Object.defineProperty(e, t, {
        get () {
            if (i !== A) return void 0 === i && (i = A, i = n()), i;
        },
        set (n) {
            Object.defineProperty(e, t, {
                value: n
            });
        },
        configurable: !0
    });
}
function T(e, t, n) {
    Object.defineProperty(e, t, {
        value: n,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
}
function N(...e) {
    let t = {};
    for (let n of e)Object.assign(t, Object.getOwnPropertyDescriptors(n));
    return Object.defineProperties({}, t);
}
const x = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function O(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function $(e) {
    if (!1 === O(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let n = t.prototype;
    return !1 !== O(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
}
const I = new Set([
    "string",
    "number",
    "symbol"
]);
function R(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function V(e, t, n) {
    let i = new e._zod.constr(t ?? e._zod.def);
    return (!t || n?.parent) && (i._zod.parent = e), i;
}
function D(e) {
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
function M(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let n = t; n < e.issues.length; n++)if (e.issues[n]?.continue !== !0) return !0;
    return !1;
}
function U(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function W(e) {
    return "string" == typeof e ? e : e?.message;
}
function Z(e, t, n) {
    let i = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (i.message = W(e.inst?._zod.def?.error?.(e)) ?? W(t?.error?.(e)) ?? W(n.customError?.(e)) ?? W(n.localeError?.(e)) ?? "Invalid input"), delete i.inst, delete i.continue, t?.reportInput || delete i.input, i;
}
const q = (e, t)=>{
    e.name = "$ZodError", Object.defineProperty(e, "_zod", {
        value: e._zod,
        enumerable: !1
    }), Object.defineProperty(e, "issues", {
        value: t,
        enumerable: !1
    }), e.message = JSON.stringify(t, z, 2), Object.defineProperty(e, "toString", {
        value: ()=>e.message,
        enumerable: !1
    });
}, H = b("$ZodError", q), F = b("$ZodError", q, {
    Parent: Error
}), G = (n = F, (e, t, i, r)=>{
    let a = i ? Object.assign(i, {
        async: !1
    }) : {
        async: !1
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise) throw new w();
    if (o.issues.length) {
        let e = new (r?.Err ?? n)(o.issues.map((e)=>Z(e, a, k())));
        throw x(e, r?.callee), e;
    }
    return o.value;
}), B = (i = F, async (e, t, n, r)=>{
    let a = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (r?.Err ?? i)(o.issues.map((e)=>Z(e, a, k())));
        throw x(e, r?.callee), e;
    }
    return o.value;
}), K = (r = F, (e, t, n)=>{
    let i = n ? {
        ...n,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (a instanceof Promise) throw new w();
    return a.issues.length ? {
        success: !1,
        error: new (r ?? H)(a.issues.map((e)=>Z(e, i, k())))
    } : {
        success: !0,
        data: a.value
    };
}), J = (a = F, async (e, t, n)=>{
    let i = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, r = e._zod.run({
        value: t,
        issues: []
    }, i);
    return r instanceof Promise && (r = await r), r.issues.length ? {
        success: !1,
        error: new a(r.issues.map((e)=>Z(e, i, k())))
    } : {
        success: !0,
        data: r.value
    };
}), Q = /^-?\d+(?:\.\d+)?$/, X = /^(?:true|false)$/i, Y = /^null$/i, ee = {
    major: 4,
    minor: 3,
    patch: 6
}, et = b("$ZodType", (e, t)=>{
    var n;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = ee;
    let i = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && i.unshift(e), i))for (let n of t._zod.onattach)n(e);
    if (0 === i.length) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, n)=>{
            let i, r = M(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (r) continue;
                let t = e.issues.length, o = a._zod.check(e);
                if (o instanceof Promise && n?.async === !1) throw new w();
                if (i || o instanceof Promise) i = (i ?? Promise.resolve()).then(async ()=>{
                    await o, e.issues.length !== t && (r || (r = M(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    r || (r = M(e, t));
                }
            }
            return i ? i.then(()=>e) : e;
        }, n = (n, r, a)=>{
            if (M(n)) return n.aborted = !0, n;
            let o = t(r, i, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new w();
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
                if (!1 === a.async) throw new w();
                return o.then((e)=>t(e, i, a));
            }
            return t(o, i, a);
        };
    }
    C(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = K(e, t);
                    return n.success ? {
                        value: n.data
                    } : {
                        issues: n.error?.issues
                    };
                } catch (n) {
                    return J(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), en = b("$ZodString", (e, t)=>{
    var n;
    let i;
    et.init(e, t), e._zod.pattern = [
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
}), ei = b("$ZodNumber", (e, t)=>{
    et.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? Q, e._zod.parse = (n, i)=>{
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
}), er = b("$ZodBoolean", (e, t)=>{
    et.init(e, t), e._zod.pattern = X, e._zod.parse = (n, i)=>{
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
}), ea = b("$ZodNull", (e, t)=>{
    et.init(e, t), e._zod.pattern = Y, e._zod.values = new Set([
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
}), eo = b("$ZodNever", (e, t)=>{
    et.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function es(e, t, n) {
    e.issues.length && t.issues.push(...U(n, e.issues)), t.value[n] = e.value;
}
const el = b("$ZodArray", (e, t)=>{
    et.init(e, t), e._zod.parse = (n, i)=>{
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
            s instanceof Promise ? a.push(s.then((t)=>es(t, n, e))) : es(s, n, e);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
});
function ec(e, t, n, i, r) {
    if (e.issues.length) {
        if (r && !(n in i)) return;
        t.issues.push(...U(n, e.issues));
    }
    void 0 === e.value ? n in i && (t.value[n] = void 0) : t.value[n] = e.value;
}
const ed = b("$ZodObject", (e, t)=>{
    let n;
    et.init(e, t);
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
    let r = j(()=>(function(e) {
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
    C(e._zod, "propValues", ()=>{
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
        if (!O(o)) return t.issues.push({
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
            a instanceof Promise ? s.push(a.then((n)=>ec(n, t, e, o, r))) : ec(a, t, e, o, r);
        }
        return a ? function(e, t, n, i, r, a) {
            let o = [], s = r.keySet, l = r.catchall._zod, c = l.def.type, d = "optional" === l.optout;
            for(let r in t){
                if (s.has(r)) continue;
                if ("never" === c) {
                    o.push(r);
                    continue;
                }
                let a = l.run({
                    value: t[r],
                    issues: []
                }, i);
                a instanceof Promise ? e.push(a.then((e)=>ec(e, n, r, t, d))) : ec(a, n, r, t, d);
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
function eu(e, t, n, i) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let r = e.filter((e)=>!M(e));
    return 1 === r.length ? (t.value = r[0].value, r[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>Z(e, i, k())))
    }), t);
}
const ep = b("$ZodUnion", (e, t)=>{
    et.init(e, t), C(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), C(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), C(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), C(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>P(e.source)).join("|")})$`);
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
        return o ? Promise.all(s).then((t)=>eu(t, r, e, a)) : eu(s, r, e, a);
    };
}), e_ = b("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, ep.init(e, t);
    let n = e._zod.parse;
    C(e._zod, "propValues", ()=>{
        let e = {};
        for (let n of t.options){
            let i = n._zod.propValues;
            if (!i || 0 === Object.keys(i).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
            for (let [t, n] of Object.entries(i))for (let i of (e[t] || (e[t] = new Set()), n))e[t].add(i);
        }
        return e;
    });
    let i = j(()=>{
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
        if (!O(o)) return r.issues.push({
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
}), em = b("$ZodRecord", (e, t)=>{
    et.init(e, t), e._zod.parse = (n, i)=>{
        let r = n.value;
        if (!$(r)) return n.issues.push({
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
                    t.issues.length && n.issues.push(...U(e, t.issues)), n.value[e] = t.value;
                })) : (o.issues.length && n.issues.push(...U(e, o.issues)), n.value[e] = o.value);
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
            if ("string" == typeof o && Q.test(o) && s.issues.length) {
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
                    issues: s.issues.map((e)=>Z(e, i, k())),
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
                e.issues.length && n.issues.push(...U(o, e.issues)), n.value[s.value] = e.value;
            })) : (l.issues.length && n.issues.push(...U(o, l.issues)), n.value[s.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
}), ef = b("$ZodEnum", (e, t)=>{
    var n;
    let i;
    et.init(e, t);
    let r = (i = Object.values(n = t.entries).filter((e)=>"number" == typeof e), Object.entries(n).filter(([e, t])=>-1 === i.indexOf(+e)).map(([e, t])=>t)), a = new Set(r);
    e._zod.values = a, e._zod.pattern = RegExp(`^(${r.filter((e)=>I.has(typeof e)).map((e)=>"string" == typeof e ? R(e) : e.toString()).join("|")})$`), e._zod.parse = (t, n)=>{
        let i = t.value;
        return a.has(i) || t.issues.push({
            code: "invalid_value",
            values: r,
            input: i,
            inst: e
        }), t;
    };
}), eg = b("$ZodLiteral", (e, t)=>{
    if (et.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? R(e) : e ? R(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (i, r)=>{
        let a = i.value;
        return n.has(a) || i.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
            inst: e
        }), i;
    };
});
function eh(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const ev = b("$ZodOptional", (e, t)=>{
    et.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", C(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), C(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${P(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let i = t.innerType._zod.run(e, n);
            return i instanceof Promise ? i.then((t)=>eh(t, e.value)) : eh(i, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, n);
    };
}), ey = b("$ZodNullable", (e, t)=>{
    et.init(e, t), C(e._zod, "optin", ()=>t.innerType._zod.optin), C(e._zod, "optout", ()=>t.innerType._zod.optout), C(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${P(e.source)}|null)$`) : void 0;
    }), C(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), eb = b("$ZodCatch", (e, t)=>{
    et.init(e, t), C(e._zod, "optin", ()=>t.innerType._zod.optin), C(e._zod, "optout", ()=>t.innerType._zod.optout), C(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, n)=>{
        if ("backward" === n.direction) return t.innerType._zod.run(e, n);
        let i = t.innerType._zod.run(e, n);
        return i instanceof Promise ? i.then((i)=>(e.value = i.value, i.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: i.issues.map((e)=>Z(e, n, k()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = i.value, i.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: i.issues.map((e)=>Z(e, n, k()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), ew = b("$ZodLazy", (e, t)=>{
    et.init(e, t), C(e._zod, "innerType", ()=>t.getter()), C(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), C(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), C(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), C(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n)=>e._zod.innerType._zod.run(t, n);
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
const eS = b("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    et.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>G(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>K(e, t, n), e.parseAsync = async (t, n)=>B(e, t, n, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, n)=>J(e, t, n), e.check = (...n)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, n)=>V(e, t, n), e.brand = ()=>e, e.register = (t, n)=>(t.add(e, n), e), e.apply = (t)=>t(e);
}), ek = b("ZodMiniString", (e, t)=>{
    en.init(e, t), eS.init(e, t);
});
function ez(e) {
    return new ek({
        type: "string",
        ...D(e)
    });
}
const eL = b("ZodMiniNumber", (e, t)=>{
    ei.init(e, t), eS.init(e, t);
});
function ej(e) {
    return new eL({
        type: "number",
        checks: [],
        ...D(e)
    });
}
const eP = b("ZodMiniBoolean", (e, t)=>{
    er.init(e, t), eS.init(e, t);
});
function eA(e) {
    return new eP({
        type: "boolean",
        ...D(e)
    });
}
const eC = b("ZodMiniNull", (e, t)=>{
    ea.init(e, t), eS.init(e, t);
}), eT = b("ZodMiniNever", (e, t)=>{
    eo.init(e, t), eS.init(e, t);
});
function eN(e) {
    return new eT({
        type: "never",
        ...D(e)
    });
}
const ex = b("ZodMiniArray", (e, t)=>{
    el.init(e, t), eS.init(e, t);
});
function eE(e, t) {
    return new ex({
        type: "array",
        element: e,
        ...D(t)
    });
}
const eO = b("ZodMiniObject", (e, t)=>{
    ed.init(e, t), eS.init(e, t), C(e, "shape", ()=>t.shape);
});
function e$(e, t) {
    return new eO({
        type: "object",
        shape: e ?? {},
        ...D(t)
    });
}
function eI(e, t) {
    if (!$(t)) throw Error("Invalid input to extend: expected a plain object");
    let n = e._zod.def.checks;
    if (n && n.length > 0) {
        let n = e._zod.def.shape;
        for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(n, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
    }
    let i = N(e._zod.def, {
        get shape () {
            let n = {
                ...e._zod.def.shape,
                ...t
            };
            return T(this, "shape", n), n;
        }
    });
    return V(e, i);
}
const eR = b("ZodMiniUnion", (e, t)=>{
    ep.init(e, t), eS.init(e, t);
});
function eV(e, t) {
    return new eR({
        type: "union",
        options: e,
        ...D(t)
    });
}
const eD = b("ZodMiniDiscriminatedUnion", (e, t)=>{
    e_.init(e, t), eS.init(e, t);
});
function eM(e, t, n) {
    return new eD({
        type: "union",
        options: t,
        discriminator: e,
        ...D(n)
    });
}
const eU = b("ZodMiniRecord", (e, t)=>{
    em.init(e, t), eS.init(e, t);
});
function eW(e, t, n) {
    return new eU({
        type: "record",
        keyType: e,
        valueType: t,
        ...D(n)
    });
}
const eZ = b("ZodMiniEnum", (e, t)=>{
    ef.init(e, t), eS.init(e, t), e.options = Object.values(t.entries);
});
function eq(e, t) {
    return new eZ({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...D(t)
    });
}
const eH = b("ZodMiniLiteral", (e, t)=>{
    eg.init(e, t), eS.init(e, t);
});
function eF(e, t) {
    return new eH({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...D(t)
    });
}
const eG = b("ZodMiniOptional", (e, t)=>{
    ev.init(e, t), eS.init(e, t);
});
function eB(e) {
    return new eG({
        type: "optional",
        innerType: e
    });
}
const eK = b("ZodMiniNullable", (e, t)=>{
    ey.init(e, t), eS.init(e, t);
});
function eJ(e) {
    return new eK({
        type: "nullable",
        innerType: e
    });
}
const eQ = b("ZodMiniCatch", (e, t)=>{
    eb.init(e, t), eS.init(e, t);
}), eX = b("ZodMiniLazy", (e, t)=>{
    ew.init(e, t), eS.init(e, t);
});
function eY() {
    let e = new eX({
        type: "lazy",
        getter: ()=>eV([
                ez(),
                ej(),
                eA(),
                new eC({
                    type: "null",
                    ...D(void 0)
                }),
                eE(e),
                eW(ez(), e)
            ])
    });
    return e;
}
let e0 = e$({
    error: eV([
        ez(),
        e$({
            code: ez(),
            message: ez()
        })
    ])
});
class e1 extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function e2(e) {
    let t = e0.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new e1("rpc", e) : new e1(e.code, e.message);
    }
    return e;
}
const e4 = e$({
    status: eF("pending"),
    job: ez()
}), e5 = eM("status", [
    e$({
        status: eF("pending")
    }),
    e$({
        status: eF("ready"),
        chunk: ej(),
        chunks: ej(),
        bytes: ej(),
        data: ez()
    })
]);
let e6 = ez(), e3 = ej(), e7 = eA();
e$({
    optical_sn: e6,
    onu_id: e3,
    binding_generation: e6
}), e$({
    mqtt_mac: e6,
    binding_generation: e6
});
let e9 = e$({
    mqtt_mac: e6,
    optical_sn: eJ(e6),
    onu_id: eJ(e3),
    binding_generation: e6,
    last_seen: e3,
    reason: e6
}), e8 = {
    target: e6,
    request_id: eB(e6),
    output: eB(e6),
    output_truncated: e7,
    error: eB(e6)
};
const te = eM("status", [
    e$({
        ...e8,
        status: eF("executed"),
        exit_code: eJ(e3)
    }),
    e$({
        ...e8,
        status: eF("dispatched"),
        exit_code: eB(eN())
    }),
    e$({
        ...e8,
        status: eF("timeout"),
        exit_code: eB(eN())
    }),
    e$({
        ...e8,
        status: eF("error"),
        exit_code: eB(eN())
    })
]);
let tt = e$({
    target: e9,
    result: te,
    binding_current: e7
}), tn = e$({
    schema_version: e3,
    compressed_bytes: e3,
    decompressed_bytes: e3,
    fields: eW(e6, e$({
        value: eY(),
        member: e6,
        unit: eJ(e6)
    })),
    members: eE(e$({
        name: e6,
        bytes: e3,
        encoding: e6,
        text: eJ(e6),
        text_omitted: e7
    })),
    errors: eE(e6)
}), ti = e$({
    revision: e3,
    last_received: e3,
    last_processed_receipt: eJ(e3),
    last_good: eJ(e3),
    error: eJ(e6),
    report: eJ(tn)
}), tr = {
    schema_version: eF(1),
    target: e9,
    report: eJ(ti)
};
eV([
    e$({
        ...tr,
        state: eq([
            "received",
            "report_unavailable"
        ])
    }),
    e$({
        ...tr,
        read_only: eF(!0)
    })
]);
const ta = e$({
    schema_version: eF(1),
    devices: eE(e$({
        optical_sn: e6,
        onu_id: e3,
        model: e6,
        optical_online: e7,
        can_execute: e7,
        mqtt: eJ(e9),
        report_revision: eJ(e3)
    })),
    sources: eE(e9)
});
e$({
    schema_version: eF(1),
    operation: tt,
    accounts: eJ(eE(e$({
        entry: eV([
            eF(0),
            eF(1),
            eF(2)
        ]),
        username: e6,
        active: e7
    }))),
    write_status: eq([
        "not_applicable",
        "accepted_and_saved",
        "unconfirmed"
    ])
}), e$({
    schema_version: eF(1),
    operation: tt
});
let to = ez(), ts = ej(), tl = eA(), tc = eB(to), td = eB(ts), tu = eB(tl);
const tp = eq([
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
]), t_ = eq([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), tm = e$({
    id: to,
    name: eB(eJ(to)),
    kind: eq([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: to,
    state: to,
    reason: tc,
    revision: tc,
    current_revision: tu,
    management_fresh: tu,
    operation_id: td,
    task_id: eB(eJ(ts)),
    updated_at: td,
    changes: eB(eE(e$({
        name: to,
        desired: to
    })))
});
let tf = e$({
    state: to,
    reason: tc,
    task_id: eB(eJ(ts)),
    instance: td
});
const tg = e$({
    cwmp_id: to,
    state: eq([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: tl,
    last_inform: eJ(ts),
    age_seconds: eJ(ts)
});
let th = e$({
    state: eq([
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
    method: tc,
    reason: tc,
    mqtt_target: eJ(to),
    binding_source: tc,
    link_identity_error: eJ(to),
    mqtt_last_seen: eJ(ts),
    cwmp_id: tc,
    desired_version: tc,
    generation: td,
    inflight: tu,
    attempts: td,
    next_retry_at: td,
    updated_at: td,
    settings_verified_at: eJ(ts),
    last_inform: eJ(ts),
    last_error: eB(eJ(to)),
    persistence_error: eB(eJ(to)),
    desired: eB(eJ(e$({
        vlan: ts,
        vlans: eE(ts),
        priority: ts,
        acs_url: to
    }))),
    listener: eB(e$({
        enabled: tl,
        listen: to,
        path: to,
        error: eJ(to)
    })),
    endpoint_notice: tc,
    manual_steps: eB(eE(to))
});
const tv = eM("state", [
    th,
    eI(function(e) {
        var t = void 0;
        let n = e._zod.def.checks;
        if (n && n.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let i = N(e._zod.def, {
            get shape () {
                let n = e._zod.def.shape, i = {
                    ...n
                };
                if (t) for(let e in t){
                    if (!(e in n)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (i[e] = eG ? new eG({
                        type: "optional",
                        innerType: n[e]
                    }) : n[e]);
                }
                else for(let e in n)i[e] = eG ? new eG({
                    type: "optional",
                    innerType: n[e]
                }) : n[e];
                return T(this, "shape", i), i;
            },
            checks: []
        });
        return V(e, i);
    }(th), {
        state: eq([
            "pending",
            "unavailable"
        ]),
        reason: to
    })
]), ty = e$({
    backend: eB(e$({
        configured: to,
        effective: to,
        available: eE(to),
        reason: to
    })),
    state: tp,
    operation_id: td,
    device: tc,
    optical_sn: tc,
    cwmp_id: tc,
    revision: tc,
    mode: eB(eq([
        "apply",
        "plan"
    ])),
    started_at: td,
    current_revision: tu,
    management_fresh: tu,
    reason: tc,
    error: tc,
    attempts: td,
    next_retry_at: td,
    reconcile_reason: tc,
    items: eE(tm),
    cwmp_contract: eB(e$({
        state: to,
        requested: to,
        contract: eJ(to),
        reason: to,
        cache_hit: tl,
        schema: to,
        capabilities: eJ(e$({
            wan: to,
            wlan: to,
            binding: to
        }))
    })),
    wan_objects: eB(eW(to, eY())),
    wan_lifecycle: eB(eW(to, tf)),
    wan_stage: eB(eq([
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
    wifi_objects: eB(e$({
        owned: eE(ts),
        pending: eJ(to),
        pending_instance: eJ(ts)
    })),
    wifi_lifecycle: eB(eW(to, tf)),
    wifi_stage: eB(eq([
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
    wifi_cleanup: eB(eq([
        "disable",
        "preserve",
        "delete"
    ]))
});
let tb = e$({
    enabled: tl,
    mode: eq([
        "auto",
        "manual"
    ]),
    vlan: eE(ts),
    priority: ts,
    address: to,
    acs_url: to,
    port: ts,
    path: to,
    dhcp_enabled: tl
}), tw = e$({
    state: eq([
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
    error: eJ(to),
    inflight: tl,
    ready: tl,
    desired_version: eJ(to),
    applied_version: eJ(to),
    next_retry_at: ts,
    attempts: ts,
    desired: eJ(tb),
    applied: eJ(tb),
    previous: eJ(tb),
    plan: eE(e$({
        operation: to,
        key: to,
        value: eE(to)
    }))
});
const tS = e$({
    device: to,
    name: eJ(to),
    group: eJ(to),
    group_name: eJ(to),
    template: eJ(to),
    template_name: eJ(to),
    optical_sn: to,
    adapter: to,
    omci_management: e$({
        state: to,
        reason: eB(eJ(to))
    }),
    management: eJ(tg),
    acs_bootstrap: tv,
    provisioning: ty,
    services: eE(tm),
    ssids: eE(tm),
    wifi_sync: t_
}), tk = e$({
    enabled: tl,
    mode: eq([
        "auto",
        "manual"
    ]),
    method: eF("diff"),
    revision: to,
    triggers: eE(to),
    interval_minutes: new eL({
        type: "number",
        coerce: !0,
        checks: [],
        ...D(void 0)
    }),
    error: eJ(to),
    devices: eE(tS),
    management_network: tw,
    omci_management: eY(),
    groups: eE(e$({
        id: to,
        name: eJ(to),
        template: to
    })),
    pending_devices: eE(to)
}), tz = eV([
    e$({
        valid: eF(!0),
        revision: to,
        devices: ts,
        error: eB(eN())
    }),
    e$({
        error: to,
        valid: eB(eN()),
        revision: eB(eN()),
        devices: eB(eN())
    })
]), tL = e$({
    restarting: eF(!0)
}), tj = eV([
    e$({
        operation_ids: eE(ts),
        revision: to
    }),
    e$({
        started: eF(!0),
        mode: eq([
            "apply",
            "plan"
        ])
    }),
    e$({
        reset: eF(!0),
        device: to
    }),
    e$({
        operation_ids: eE(ts),
        mode: eq([
            "apply",
            "plan"
        ]),
        reconcile: tu,
        retry: tu
    })
]);
let tP = ez(), tA = ej(), tC = eJ(tA), tT = eW(tP, e$({
    source: tP,
    unit: tP,
    reason: eJ(tP),
    raw: eJ(tP),
    age_seconds: tC
}));
const tN = e$({
    phase: eq([
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
    generation: tA,
    error: eJ(tP)
}), tx = eq([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tE = e$({
    model: tP,
    wavelength_tx_nm: tA,
    wavelength_rx_nm: tA,
    phy_rate_downlink_gbps: tA,
    phy_rate_uplink_gbps: tA,
    tx_power_dbm: tC,
    laser_bias_current_ma: tC,
    temperature_celsius: tC,
    vcc_voltage: tC,
    cdr_locked: eJ(eA()),
    tx_enabled: eJ(eA()),
    measurements: tT
}), tO = e$({
    equipment_id: eJ(tP),
    hardware_version: eJ(tP),
    software_images: eE(tP),
    omcc_version: tC,
    errors: eE(tP)
});
const t$ = e$({
    onu_id: tA,
    vendor: tP,
    model: tP,
    serial_number: tP,
    state: tx,
    business_status: tN,
    management: eJ(tg),
    provisioning: eJ(ty),
    services: eE(tm),
    ssids: eE(tm),
    wifi_sync: t_,
    acs_bootstrap: eB(tv),
    identity: eJ(tO),
    identity_age_seconds: tC,
    identity_current: eA(),
    fiber_distance_m: tC,
    ranging_delay_rtd_ns: tC,
    equalization_delay_bits: new eQ({
        type: "catch",
        innerType: tC,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tC,
    optical_tx_power_dbm: tC,
    firmware_version: tP,
    hardware_version: tP,
    uptime_seconds: tC,
    data_path: e$({
        interface: tP,
        gem_ports: eJ(eE(tA)),
        vlan_id: tC,
        tx_bytes: tC,
        rx_bytes: tC,
        current_tx_kbps: tC,
        current_rx_kbps: tC,
        offload: eB(e$({
            enabled: eB(eJ(eA())),
            routed_enabled: eB(eJ(eA())),
            bridge_enabled: eB(eJ(eA())),
            engine_attached: eB(eJ(eA())),
            forwarding_verified: eB(eJ(eA()))
        })),
        measurements: tT
    }),
    wifi_mesh: e$({
        channel_2g: tC,
        channel_5g: tC,
        bandwidth_5g: eJ(tP),
        tx_power_pct: tC,
        measurements: tT
    }),
    connected_clients: eJ(eE(e$({
        mac: tP,
        ip: tP,
        band: tP,
        rssi_dbm: tC,
        rx_rate_mbps: tC,
        tx_rate_mbps: tC
    }))),
    measurements: tT
});
let tI = e$({
    reserved_sn: eB(tP),
    port: tA,
    interface: tP,
    carrier: eA(),
    status: tP,
    onu_id: eB(tA),
    onu_sn: eB(tP),
    link_state: tP
});
const tR = e$({
    counters_valid: eB(eA()),
    packets_exact: eB(tP),
    bytes_exact: eB(tP),
    index: tP,
    state: tP,
    pkt_type: tP,
    orig_tuple: tP,
    new_tuple: tP,
    eth: tP,
    vlan: tP,
    packets: tA,
    bytes: tA
}), tV = e$({
    sampled_at_ms: eB(tA),
    errors: eB(eE(tP)),
    config_valid: eB(eA()),
    engine_valid: eB(eA()),
    mask_valid: eB(eA()),
    routed_mask_valid: eB(eA()),
    debug_valid: eB(eA()),
    flows_valid: eB(eA()),
    entries_valid: eB(eA()),
    counters_valid: eB(eA()),
    hooks_valid: eB(eA()),
    total_packets_exact: eB(tP),
    total_bytes_exact: eB(tP),
    supported: eA(),
    engine_attached: eA(),
    bridge_offload_enabled: eA(),
    bridge_offload_mask: tA,
    routed_offload_mask: tA,
    bridge_offload_debug: eA(),
    bridge: tP,
    active_ports: eE(tP),
    fw4_hooks_ready: eA(),
    total_entries: tA,
    bound_entries: tA,
    total_packets: tA,
    total_bytes: tA,
    bound_flows: eE(tR)
}), tD = eI(tV, {
    sampled_at_ms: tA,
    errors: eE(tP),
    config_valid: eA(),
    engine_valid: eA(),
    mask_valid: eA(),
    routed_mask_valid: eA(),
    debug_valid: eA(),
    flows_valid: eA(),
    entries_valid: eA(),
    counters_valid: eA(),
    hooks_valid: eA(),
    total_packets_exact: tP,
    total_bytes_exact: tP,
    bound_ipv4_entries: tA,
    bound_ipv6_entries: tA,
    bound_flows: eE(eI(tR, {
        counters_valid: eA(),
        packets_exact: tP,
        bytes_exact: tP
    }))
}), tM = e$({
    ubus: eB(eW(tP, e$({
        calls: tA,
        failures: tA,
        last_us: tA,
        max_us: tA,
        total_us: tA
    }))),
    jobs: eB(e$({
        accepting: eA(),
        running: tA,
        stored: tA,
        bytes: tA,
        running_limit: tA,
        stored_limit: tA,
        bytes_limit: tA,
        result_bytes_limit: tA
    })),
    onu_pinning: eB(e$({
        desired: eW(tP, tA),
        active: eW(tP, tA),
        pending_restart: eA(),
        allocation_blocked: eA(),
        startup_error: eJ(tP),
        config_error: eJ(tP)
    })),
    fpga_status: tP,
    provisioning: eJ(tk),
    optical_transceiver: tE,
    switch_ports: eE(tI),
    sub_gateways: eE(t$),
    telemetry_gateways: eE(e$({
        id: tP,
        last_seen_sec_ago: tA,
        last_payload_bytes: tA
    })),
    npu: eB(eJ(tV))
});
eW(tP, e$({
    carrier: eB(eA()),
    mac: eB(tP),
    link: eB(e$({
        speed: eB(tA),
        duplex: eB(tP),
        autoneg: eB(eA())
    })),
    stats: eB(eW(tP, tA))
}));
const tU = eM("status", [
    e$({
        status: eF("success"),
        enabled: eA()
    }),
    e$({
        status: eF("error"),
        error: ez()
    })
]), tW = e$({
    source: eq([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: ez(),
    size: ej(),
    sha256: ez(),
    data: ez(),
    factory: e$({
        detected: eA(),
        device: ez(),
        has_data: eA(),
        sha256: ez(),
        data: ez()
    }),
    firmware: e$({
        exists: eA(),
        path: ez(),
        size: ej(),
        sha256: ez(),
        data: ez()
    }),
    error: eB(ez())
}), tZ = e$({
    success: eA(),
    path: ez(),
    size: ej(),
    sha256: ez(),
    error: eB(ez())
});
e$({
    success: eA(),
    output: eB(ez()),
    error: eB(ez())
});
const tq = eM("status", [
    e$({
        status: eF("pending"),
        progress: eB(e$({
            phase: eq([
                "starting",
                "upload",
                "tables"
            ]),
            received: ej(),
            expected: eJ(ej())
        }))
    }),
    e$({
        status: eF("ready"),
        chunk: ej(),
        chunks: ej(),
        bytes: ej(),
        data: ez()
    })
]), tH = e$({
    released: eA()
}), tF = e$({
    schema_version: eF(1),
    status: eq([
        "success",
        "error"
    ]),
    action: eq([
        "optical_on",
        "optical_off",
        "optical_status",
        "optical_reload",
        "optical_reinitialize",
        "optical_shutdown"
    ]),
    desired_enabled: eJ(eA()),
    tx_enabled: eJ(eA()),
    actor_state: eq([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: eA(),
    discovery_active: eA(),
    cleanup_pending: eA(),
    error: eJ(e$({
        code: ez(),
        message: ez()
    }))
}), tG = e$({
    schema_version: eF(1),
    version: ez(),
    features: eW(ez(), eA()),
    functions: e$({
        optical: eA(),
        omci_mib: eA(),
        mqtt_telemetry: eA(),
        hl202_management: eA(),
        cwmp: eA()
    }),
    pages: e$({
        status: eA(),
        config: eA(),
        sync: eA(),
        hl202: eA(),
        hardware: eA(),
        calibration: eA(),
        about: eA()
    }),
    adapters: eE(e$({
        id: ez(),
        name: ez()
    }))
}), tB = {
    getCapabilities: {
        parse: (e)=>tG.parse(e2(e))
    },
    opticalStatus: tF,
    opticalSet: tF,
    getStatus: {
        parse: (e)=>tM.parse(e2(e))
    },
    getSync: {
        parse: (e)=>tk.parse(e2(e))
    },
    configCheck: tz,
    npuStatus: tD,
    configReload: {
        parse: (e)=>tk.parse(e2(e))
    },
    restartService: {
        parse: (e)=>tL.parse(e2(e))
    },
    sync: {
        parse: (e)=>tj.parse(e2(e))
    },
    npuSet: tU,
    mibStart: {
        parse: (e)=>e4.parse(e2(e))
    },
    mibResult: {
        parse: (e)=>tq.parse(e2(e))
    },
    jobRelease: {
        parse: (e)=>tH.parse(e2(e))
    },
    hl202List: {
        parse: (e)=>ta.parse(e2(e))
    },
    hl202Report: {
        parse: (e)=>e4.parse(e2(e))
    },
    hl202AccountsStart: {
        parse: (e)=>e4.parse(e2(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>e4.parse(e2(e))
    },
    hl202ExecStart: {
        parse: (e)=>e4.parse(e2(e))
    },
    jobResult: {
        parse: (e)=>e5.parse(e2(e))
    },
    getCalibration: {
        parse: (e)=>tW.parse(e2(e))
    },
    saveCalibration: {
        parse: (e)=>tZ.parse(e2(e))
    },
    applyCalibration: {
        parse: (e)=>e4.parse(e2(e))
    }
};
function tK() {
    var e;
    let n, i, r, a, o, s, l, c, d, u, p, m, f, g, h, v, y, b, w, S, k, z, j;
    return t ??= (e = L.rpc, n = e.declare({
        object: "fttr",
        method: "get_capabilities",
        reject: !0
    }), i = e.declare({
        object: "fttr",
        method: "optical_status",
        reject: !0
    }), r = e.declare({
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
    }), c = e.declare({
        object: "fttr",
        method: "config_reload",
        reject: !0
    }), d = e.declare({
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
    }), m = e.declare({
        object: "fttr",
        method: "mib_start",
        params: [
            "onu_id",
            "optical_sn",
            "tables"
        ],
        reject: !0
    }), f = e.declare({
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
    }), v = e.declare({
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
    }), b = e.declare({
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
    }), S = e.declare({
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
        getCapabilities: async ()=>tB.getCapabilities.parse(await n()),
        opticalStatus: async ()=>tB.opticalStatus.parse(await i()),
        opticalSet: async (e)=>tB.opticalSet.parse(await r(e.enabled)),
        getStatus: async ()=>tB.getStatus.parse(await a()),
        getSync: async ()=>tB.getSync.parse(await o()),
        configCheck: async ()=>tB.configCheck.parse(await s()),
        npuStatus: async ()=>tB.npuStatus.parse(await l()),
        configReload: async ()=>tB.configReload.parse(await c()),
        restartService: async ()=>tB.restartService.parse(await d()),
        sync: async (e)=>tB.sync.parse(await u(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>tB.npuSet.parse(await p(e.enabled, e.bridge)),
        mibStart: async (e)=>tB.mibStart.parse(await m(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>tB.mibResult.parse(await f(e.job, e.chunk)),
        jobRelease: async (e)=>tB.jobRelease.parse(await g(e.job)),
        hl202List: async ()=>tB.hl202List.parse(await h()),
        hl202Report: async (e)=>tB.hl202Report.parse(await v(e.target)),
        hl202AccountsStart: async (e)=>tB.hl202AccountsStart.parse(await y(e.target)),
        hl202AccountUpdate: async (e)=>tB.hl202AccountUpdate.parse(await b(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>tB.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>tB.jobResult.parse(await S(e.job, e.chunk)),
        getCalibration: async ()=>tB.getCalibration.parse(await k()),
        saveCalibration: async (e)=>tB.saveCalibration.parse(await z(e.data)),
        applyCalibration: async ()=>tB.applyCalibration.parse(await j())
    });
}
const tJ = async ()=>tK().getCapabilities(), tQ = [
    "INTERNET",
    "OTHER",
    "IPTV",
    "VOIP"
];
function tX(e) {
    return Array.isArray(e) ? e.map(String) : String(e ?? "").split(/\s+/).filter(Boolean);
}
function tY() {
    let e = (e)=>L.uci.sections("fttr", e).map((e)=>Object.fromEntries(Object.entries(e).map((e)=>{
                let [t, n] = e;
                return [
                    t,
                    Array.isArray(n) ? [
                        ...n
                    ] : n
                ];
            })));
    return {
        template: e("template"),
        wifi: e("wifi"),
        network: e("network"),
        group: e("group"),
        device: e("device")
    };
}
function t0(e) {
    return String(e.name || e.ssid || e.optical_sn || e[".name"]);
}
function t1(e, t) {
    return e.wifi.filter((e)=>e.template === t).map((e)=>[
            e[".name"],
            t0(e)
        ]);
}
function t2(e) {
    let t = tY();
    if (t.group.some((t)=>t.template === e)) throw Error(_("Template is in use."));
    for (let n of t.wifi)n.template === e && t5(n[".name"]);
    for (let n of [
        ...t.network,
        ...t.wifi
    ])n.template === e && L.uci.remove("fttr", n[".name"]);
}
function t4(e) {
    if (tY().device.some((t)=>t.group === e)) throw Error(_("Group is used by devices. Reassign those devices before deleting it."));
}
function t5(e) {
    for (let t of tY().network){
        let n = tX(t.ssid);
        if (n.includes(e)) {
            let i = n.filter((t)=>t !== e);
            i.length ? L.uci.set("fttr", t[".name"], "ssid", i) : L.uci.unset("fttr", t[".name"], "ssid");
        }
    }
}
function t6(e, t) {
    let n = e?.vendor || e?.serial_number.slice(0, 4);
    return "HWTC" === n && (!t || t.has("hwtc")) ? "hwtc" : e?.model?.startsWith("HL202") && (!t || t.has("hl202")) ? "hl202" : ("STAR" === n || e?.model?.includes("SG631") || e?.serial_number.startsWith("STAR")) && (!t || t.has("star")) ? "star" : "generic";
}
function t3(e) {
    let t = tX(e);
    return t.length ? !!t.every((e)=>tQ.includes(e)) || _("WAN Service List may only contain INTERNET, OTHER, IPTV, and VOIP.") : _("Select at least one WAN Service List label.");
}
function t7(e) {
    let t = [], n = new Set(e.template.map((e)=>e[".name"])), i = new Set(e.group.map((e)=>e[".name"])), r = new Map(e.wifi.map((e)=>[
            e[".name"],
            e
        ])), a = (e, n, i, r)=>{
        t.push({
            kind: e,
            sectionId: n[".name"],
            field: i,
            message: r
        });
    };
    for (let t of e.template)String(t.name || "").trim() || a("template", t, "name", _("Name is required."));
    for (let t of [
        "wifi",
        "network",
        "group"
    ])for (let i of e[t])n.has(String(i.template || "")) || a(t, i, "template", _("Select an existing template."));
    for (let t of e.wifi){
        let e = new TextEncoder().encode(String(t.ssid || "")).length;
        if ((e < 1 || e > 32) && a("wifi", t, "ssid", _("SSID must be 1\u201332 bytes.")), "2g" !== t.radio && "5g" !== t.radio && a("wifi", t, "radio", _("Select a wireless band.")), [
            "wpa2-psk",
            "wpa3-sae",
            "wpa2-psk/wpa3-sae",
            "wpa-psk/wpa2-psk"
        ].includes(String(t.security))) {
            let e = new TextEncoder().encode(String(t.key || "")).length;
            (e < 8 || e > 63) && a("wifi", t, "key", _("Password must be 8\u201363 bytes."));
        }
    }
    for (let t of e.network){
        String(t.name || "").trim() || a("network", t, "name", _("Name is required."));
        let e = t3(t.service_list);
        for (let [n, i] of (!0 !== e && a("network", t, "service_list", e), [
            [
                "vlan",
                4094
            ],
            [
                "priority",
                7
            ]
        ])){
            let e = String(t[n] ?? "0");
            (!/^\d+$/.test(e) || Number(e) > i) && a("network", t, n, _("Value is outside the allowed range."));
        }
        for (let e of tX(t.ssid)){
            let n = r.get(e);
            n && n.template === t.template || a("network", t, "ssid", _("Select SSIDs belonging to this network's template."));
        }
    }
    for (let t of e.device)i.has(String(t.group || "")) || a("device", t, "group", _("Select an existing group."));
    return t;
}
function t9(e, t) {
    return e.children.find((e)=>e.subsection?.sectiontype === t)?.subsection;
}
function t8(e) {
    return ({
        device: _("Device"),
        group: _("Group"),
        template: _("Template"),
        wifi: _("SSID"),
        network: _("Network")
    })[e];
}
async function ne(e, t) {
    let n = e.currentTarget;
    n.disabled = !0;
    try {
        await t();
    } catch (e) {
        L.ui.addNotification(null, s("p", {
            children: String(e instanceof Error ? e.message : e)
        }), "error");
    } finally{
        n.disabled = !L.hasViewPermission();
    }
}
function nt(e, t) {
    var n, i, r;
    let a = function(e) {
        let t = new Map();
        for (let n of t7(e)){
            let i = `${n.kind}/${n.sectionId}`, r = t.get(i);
            if (!r) {
                let a = e[n.kind].find((e)=>e[".name"] === n.sectionId);
                if (!a) continue;
                r = {
                    kind: n.kind,
                    sectionId: n.sectionId,
                    row: a,
                    issues: []
                }, t.set(i, r);
            }
            r.issues.some((e)=>e.field === n.field && e.message === n.message) || r.issues.push(n);
        }
        return [
            ...t.values()
        ];
    }(tY());
    L.ui.showModal(_("Review and repair configuration"), (r = {
        children: [
            s("p", {
                children: _("Each item below identifies a configuration problem. Choose Edit to keep the item and correct its fields, or delete it if it is no longer needed.")
            }),
            s("p", {
                children: _("A missing group means a device points to a deleted group. Edit the device and select an existing group. If no suitable group exists, close this dialog and create a group first.")
            }),
            s("p", {
                children: _("Repairs are staged in LuCI. Close this dialog, use Save & Apply, then run Check again to verify the applied configuration.")
            }),
            ...a.length ? a.map((n)=>{
                var i, r, a, l, c;
                return c = {
                    class: "cbi-section",
                    children: [
                        (r = {
                            children: [
                                t8(n.kind),
                                ": ",
                                t0(n.row),
                                " ",
                                (i = {
                                    children: s("code", {
                                        children: n.sectionId
                                    })
                                }, s("small", i))
                            ]
                        }, s("h4", r)),
                        (a = {
                            children: n.issues.map((e)=>{
                                var t, i, r;
                                return r = {
                                    children: [
                                        s("strong", {
                                            children: [
                                                (t = e.field, ({
                                                    name: _("Name"),
                                                    template: _("Template"),
                                                    group: _("Group"),
                                                    ssid: _("SSID"),
                                                    radio: _("Band"),
                                                    key: _("Password"),
                                                    service_list: _("WAN Service List (multi-select)"),
                                                    vlan: _("VLAN"),
                                                    priority: _("Priority")
                                                })[t] || t),
                                                ": "
                                            ]
                                        }),
                                        e.message,
                                        [
                                            "group",
                                            "template",
                                            "ssid"
                                        ].includes(e.field) && tX(n.row[e.field]).length ? (i = {
                                            children: [
                                                " ",
                                                s("code", {
                                                    children: tX(n.row[e.field]).join(", ")
                                                })
                                            ]
                                        }, s(o, i)) : null
                                    ]
                                }, s("li", r);
                            })
                        }, s("ul", a)),
                        s("button", {
                            class: "cbi-button cbi-button-action",
                            type: "button",
                            disabled: !L.hasViewPermission(),
                            onclick: (t)=>ne(t, async ()=>{
                                    if (!L.hasViewPermission()) return;
                                    let t = t9(e, n.kind);
                                    if (!t) throw Error(_("Configuration editor is unavailable."));
                                    L.ui.hideModal(), await t.renderMoreOptionsModal(n.sectionId);
                                }),
                            children: _("Edit to repair")
                        }),
                        " ",
                        (l = {
                            class: "cbi-button cbi-button-negative",
                            type: "button",
                            disabled: !L.hasViewPermission(),
                            onclick: ()=>{
                                var i, r, a;
                                L.ui.showModal(_("Delete this configuration?"), (a = {
                                    children: [
                                        (i = {
                                            children: [
                                                s("strong", {
                                                    children: [
                                                        t8(n.kind),
                                                        ": ",
                                                        t0(n.row)
                                                    ]
                                                }),
                                                " ",
                                                s("code", {
                                                    children: n.sectionId
                                                })
                                            ]
                                        }, s("p", i)),
                                        s("p", {
                                            children: "template" === n.kind ? _("This also deletes the template's SSIDs and networks. Templates used by groups cannot be deleted.") : "device" === n.kind ? _("This removes the device's FTTR configuration and stops managing it. It does not delete the physical device.") : _("This removes the selected configuration entry. Existing reference checks and binding cleanup still apply.")
                                        }),
                                        (r = {
                                            class: "right",
                                            children: [
                                                s("button", {
                                                    class: "cbi-button",
                                                    type: "button",
                                                    onclick: ()=>nt(e, t),
                                                    children: _("Cancel")
                                                }),
                                                " ",
                                                s("button", {
                                                    class: "cbi-button cbi-button-negative",
                                                    type: "button",
                                                    disabled: !L.hasViewPermission(),
                                                    onclick: (i)=>ne(i, async ()=>{
                                                            if (!L.hasViewPermission()) return;
                                                            let r = t9(e, n.kind);
                                                            if (!r) throw Error(_("Configuration editor is unavailable."));
                                                            await r.handleRemove(n.sectionId, i), nt(e, t);
                                                        }),
                                                    children: _("Delete this configuration")
                                                })
                                            ]
                                        }, s("div", r))
                                    ]
                                }, s("div", a)));
                            },
                            children: _("Delete this configuration")
                        }, s("button", l))
                    ]
                }, s("div", c);
            }) : [
                s("p", {
                    children: _("No problems were found by the local configuration checks. Use Check to see the backend result after Save & Apply.")
                })
            ],
            ...t ? [
                (n = {
                    children: [
                        s("summary", {
                            children: _("Last backend check result")
                        }),
                        s("pre", {
                            style: "white-space:pre-wrap;overflow-wrap:anywhere",
                            children: t
                        })
                    ]
                }, s("details", n))
            ] : [],
            (i = {
                class: "right",
                children: s("button", {
                    class: "cbi-button",
                    type: "button",
                    onclick: ()=>L.ui.hideModal(),
                    children: _("Close")
                })
            }, s("div", i))
        ]
    }, s("div", r)));
}
L.rpc.declare({
    object: "luci-rpc",
    method: "getNetworkDevices",
    expect: {
        "": {}
    },
    reject: !0
});
const nn = async ()=>tK().getStatus(), ni = async ()=>tK().configCheck(), nr = async ()=>tK().configReload(), na = async ()=>tK().restartService();
let no = L.view, ns = L.uci, nl = L.form;
async function nc(e, t, n) {
    try {
        let i = await e();
        t.textContent = JSON.stringify(i, null, 2), n?.(i);
    } catch (e) {
        t.textContent = String(e), n?.({
            error: String(e)
        });
    }
}
let main = no.extend({
    async load () {
        let e = await tJ();
        if (!e.pages.config) throw Error(_("This page is not supported by the installed FTTR build."));
        await ns.load("fttr"), ns.sections("fttr", "provisioning").length || ns.add("fttr", "provisioning", "provisioning"), ns.sections("fttr", "management").length || ns.add("fttr", "management", "management");
        let [t, n] = await Promise.all([
            ni().catch((e)=>({
                    error: String(e)
                })),
            nn().catch((e)=>({
                    error: String(e),
                    sub_gateways: []
                }))
        ]);
        return {
            error: t.error || ("error" in n ? n.error : void 0),
            connectedDevices: n.sub_gateways,
            pinning: "onu_pinning" in n ? n.onu_pinning : void 0,
            capabilities: e
        };
    },
    render (e) {
        var t, n, i, r, a;
        let o, b, w, S, k, z = new nl.Map("fttr", _("FTTR configuration")), j = z.section(nl.NamedSection, "acs", "acs");
        j.addremove = !1, j.anonymous = !1;
        let P = ns.sections("fttr", "provisioning")[0]?.[".name"] ?? "provisioning";
        (function(e, t, n) {
            e.tab("basic", t);
            let i = e.taboption("basic", L.form.SectionValue, "_acs", L.form.NamedSection, "acs", "acs").subsection;
            i.addremove = !1, i.anonymous = !1;
            let r = c(i, L.form.Flag, "enabled", _("Enable ACS"));
            r.default = "1", r.rmempty = !1, (r = c(i, L.form.Value, "port", _("Listen port"), "port")).default = "7547", r.rmempty = !1, (r = c(i, L.form.Value, "path", _("CWMP path"))).default = "/cwmp", r.rmempty = !1, r.validate = (e, t)=>!!t.startsWith("/") || _("The path must start with '/'."), (r = c(i, L.form.Value, "state_file", _("ACS state file"))).default = "/var/lib/fttr/acs-state.json", r.rmempty = !1, r.validate = (e, t)=>!!t.startsWith("/") || _("The state file path must be absolute."), (r = c(i, L.form.Value, "username", _("HTTP Basic username"))).optional = !0, r.rmempty = !0, (r = c(i, L.form.Value, "password", _("HTTP Basic password"))).password = !0, r.optional = !0, r.rmempty = !0;
            let a = e.taboption("basic", L.form.SectionValue, "_management", L.form.NamedSection, "management", "management").subsection;
            a.addremove = !1, (r = c(a, L.form.Flag, "enabled", _("Enable management network"))).default = "1", r.rmempty = !1, (r = u(a, "mode", _("Management application mode"), [
                [
                    "manual",
                    _("Manual")
                ],
                [
                    "auto",
                    _("Automatic")
                ]
            ])).default = "auto", r.rmempty = !1, r.description = _("Manual mode only discovers and plans. Use Apply management configuration on the Synchronization page to create or update the isolated network, ACS listener and child TR069 settings."), (r = c(a, L.form.Value, "address", _("Management IPv4 address/prefix"), "cidr4")).default = "192.168.46.1/24", r.rmempty = !1, r.description = _("The local ACS binds to this address. The child ACS URL is generated from this address, the ACS port and CWMP path."), (r = c(a, L.form.DummyValue, "_generated_acs_url", _("Generated ACS URL"))).cfgvalue = ()=>{
                let t = e.map.data, n = String(t.get("fttr", "management", "address") || "192.168.46.1/24").split("/")[0];
                return `http://${n}:${t.get("fttr", "acs", "port") || "7547"}${t.get("fttr", "acs", "path") || "/cwmp"}`;
            }, (r = c(a, L.form.DynamicList, "vlan", _("TR069 VLANs"), "range(1,4094)")).default = [
                "46"
            ], r.rmempty = !1, r.description = _("All listed VLANs share one management bridge and DHCP pool. Retain an existing listed management VLAN; the first VLAN is the fallback."), r.validate = (e, t)=>!!("" === t || /^\d+$/.test(t) && Number(t) >= 1 && 4094 >= Number(t)) || _("Enter a VLAN ID in 1\u20134094.");
            let o = r.parse;
            for (let [e, t, n] of (r.parse = function(e) {
                let t = this.formvalue(e) || [];
                return t.length ? new Set(t.map(Number)).size !== t.length ? Promise.reject(Error(_("Duplicate VLAN IDs are not allowed."))) : o.call(this, e) : Promise.reject(Error(_("Enter at least one VLAN ID in 1\u20134094.")));
            }, (r = c(a, L.form.Value, "priority", _("Priority"), "range(0,7)")).default = "0", r.rmempty = !1, (r = c(a, L.form.Flag, "dhcp_enabled", _("Enable management DHCP"))).default = "1", r.rmempty = !1, [
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
            ]))(r = c(a, L.form.Value, e, t)).default = n, r.rmempty = !1, r.depends("dhcp_enabled", "1");
            let s = e.taboption("basic", L.form.SectionValue, "_policy", L.form.NamedSection, n, "provisioning").subsection;
            for (let [e, t] of (s.addremove = !1, s.anonymous = !1, (r = c(s, L.form.Flag, "enabled", _("Enable provisioning"))).default = "1", r.rmempty = !1, (r = c(s, L.form.Flag, "allow_unsupported_as_bridge", _("Allow unsupported ONUs as bridge"))).default = "0", r.rmempty = !1, r.description = _("Automatically provision standard G.988 transparent Layer 2 bridge for unrecognized or third-party GPON ONUs in O5 state."), (r = u(s, "mode", _("Synchronization mode"), [
                [
                    "auto",
                    _("Automatic")
                ],
                [
                    "manual",
                    _("Manual")
                ]
            ])).default = "auto", r.description = _("Manual mode only saves configuration; use Apply differences on the Synchronization page to send it to devices. Automatic mode synchronizes after Save & Apply when Configuration changed is selected."), r = c(s, L.form.MultiValue, "trigger", _("Automatic triggers")), [
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
            ], r.retain = !0, r.depends("mode", "auto"), (r = c(s, L.form.Value, "interval_minutes", _("Periodic synchronization interval (minutes)"))).default = "30", r.retain = !0, r.depends("mode", "auto"), r.validate = (e, t)=>!!(/^(0|[1-9][0-9]*)$/.test(t) && (0 === Number(t) || Number(t) >= 1 && 1440 >= Number(t))) || _("Use 0 to disable, or 1\u20131440 minutes."), (r = c(s, L.form.Value, "freshness", _("CWMP freshness (seconds)"), "range(1,86400)")).default = "180";
        })(j, _("Basic"), P), t = e.connectedDevices ?? [], n = e.pinning, i = e.capabilities, o = new Map(t.map((e)=>[
                e.serial_number,
                e
            ])), w = new Set((b = (i?.adapters ?? []).map((e)=>[
                e.id,
                "generic" === e.id ? _("Generic G.988 Bridge") : e.name
            ])).map((e)=>{
            let [t] = e;
            return t;
        })), S = (e)=>{
            let t = o.get(e), n = L.uci.sections("fttr", "device").find((t)=>t.optical_sn === e), i = t?.model || String(n?.adapter || _("Unknown model"));
            return `${i} \xb7 ${e} \xb7 ${t?.state === "o5_operation" ? _("Connected") : _("Offline")}${t?.onu_id != null ? ` \xb7 ONU ${t.onu_id}` : ""}`;
        }, j.tab("devices", _("Devices & groups")), y(g(j, "devices", "_groups", "group", _("Groups"), (e)=>{
            h(e, "_name", _("Group"), (e)=>String(L.uci.get("fttr", e, "name") || e)), c(e, L.form.Value, "name", _("Name")).modalonly = !0, m(e, "template", _("Template"), "template").modalonly = !0;
        }), t4), g(j, "devices", "_devices", "device", _("Devices"), (e)=>{
            h(e, "_device", _("Device"), (e)=>{
                let t = String(L.uci.get("fttr", e, "optical_sn") || "");
                return t ? S(t) : _("New device");
            }), h(e, "_active_pin", _("Active allocation"), (e)=>{
                let i = String(L.uci.get("fttr", e, "optical_sn") || ""), r = n?.active[i.toUpperCase()], a = t.find((e)=>e.serial_number.toUpperCase() === i.toUpperCase())?.onu_id, o = L.uci.get("fttr", e, "onu_id"), s = (null == o || "" === o ? void 0 : Number(o)) !== r;
                return [
                    null != a ? `fttr${a + 1}` : _("Not registered"),
                    null != r ? `${_("Reserved")}: fttr${r + 1}` : _("Automatic allocation"),
                    s ? _("Pending restart") : ""
                ].filter(Boolean).join(" \xb7 ");
            }), e.tab("general", _("General Settings")), e.tab("cwmp", _("CWMP Settings")), e.tab("advanced", _("Advanced Settings"));
            let i = d(e, "general", L.form.ListValue, "optical_sn", _("Connected device"));
            i.modalonly = !0, i.rmempty = !1, i.description = _("Lists supported devices registered on the optical link, including devices that have not sent an ACS Inform. Devices already configured are omitted when adding a new device.");
            let r = i.renderWidget;
            i.renderWidget = function(e, n, i) {
                this.keylist = [], this.vallist = [];
                let a = String(L.uci.get("fttr", e, "optical_sn") || ""), o = new Set(L.uci.sections("fttr", "device").filter((t)=>t[".name"] !== e).map((e)=>e.optical_sn));
                for (let e of t)"o5_operation" === e.state && t6(e, w) && !o.has(e.serial_number) && this.value(e.serial_number, S(e.serial_number));
                a && !this.keylist.includes(a) && this.value(a, S(a));
                let s = i || a || this.keylist[0] || "";
                return r.call(this, e, n, s);
            }, i.onchange = (e, t, n)=>{
                let i = t6(o.get(n), w);
                a.getUIElement(t)?.setValue(i);
            }, i.validate = (e, t)=>t ? !L.uci.sections("fttr", "device").some((n)=>n[".name"] !== e && n.optical_sn === t) || _("Device already configured.") : _("Select device."), i.write = (e, t)=>{
                L.uci.set("fttr", e, "optical_sn", t);
                let n = t6(o.get(t), w);
                L.uci.get("fttr", e, "adapter") || L.uci.set("fttr", e, "adapter", n);
            };
            let a = p(e, "general", "adapter", _("Device adapter"), b);
            a.modalonly = !0, a.default = "generic", a.rmempty = !1;
            let c = a.renderWidget;
            a.renderWidget = function(e, t, n) {
                let i = String(L.uci.get("fttr", e, "optical_sn") || ""), r = t6(o.get(i), w), a = n || L.uci.get("fttr", e, "adapter") || r;
                return a && !this.keylist.includes(a) && this.value(a, a), c.call(this, e, t, a);
            }, a.write = (e, t)=>{
                let n = String(L.uci.get("fttr", e, "optical_sn") || ""), i = t6(o.get(n), w);
                L.uci.set("fttr", e, "adapter", t || i || "generic");
            };
            let u = p(e, "general", "provisioning_method", _("Provisioning method"), [
                [
                    "",
                    _("Automatic (HL202 command, otherwise ACS)")
                ],
                [
                    "command",
                    _("Command (MQTT / tcapi)")
                ],
                [
                    "acs",
                    _("ACS (CWMP)")
                ]
            ]);
            u.modalonly = !0, u.retain = !0, u.depends("adapter", "hl202"), u.description = _("HL202 defaults to native command provisioning with readback verification. Builds without MQTT use ACS. Transport failures require reconciliation and do not switch to ACS automatically."), function(e, t, n, i, r) {
                let a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5], o = d(e, t, l.RichListValue, n, i);
                return o.rmempty = a, o.optional = a, o.default = "", f(o, ()=>[
                        ...a ? [
                            [
                                "",
                                _("None")
                            ]
                        ] : [],
                        ...L.uci.sections("fttr", r).map((e)=>[
                                e[".name"],
                                String(e.name || e.ssid || e.optical_sn || e[".name"])
                            ])
                    ]), o.validate = (e, t)=>!!(a && !t || L.uci.sections("fttr", r).some((e)=>e[".name"] === t)) || _("Select an existing item."), o;
            }(e, "general", "group", _("Group"), "group").modalonly = !0;
            let m = p(e, "general", "onu_id", _("Fixed interface"), [
                [
                    "",
                    _("Automatic allocation")
                ],
                ...Array.from({
                    length: 16
                }, (e, t)=>[
                        String(t),
                        `fttr${t + 1} \xb7 ONU-ID ${t}`
                    ])
            ], !0);
            m.modalonly = !0, m.description = _("Reserves this interface by optical serial number, even while offline. Changes take effect after restarting FTTR; Reload does not move registered devices.");
            let g = e.taboption("general", L.form.Button, "_pin_current", _("Use current interface"));
            g.modalonly = !0, g.inputtitle = _("Pin current interface"), g.inputstyle = "apply", g.onclick = (e, n)=>{
                let r = String(i.formvalue(n) ?? L.uci.get("fttr", n, "optical_sn") ?? ""), a = t.find((e)=>e.serial_number.toUpperCase() === r.toUpperCase());
                a?.state !== "o5_operation" || null == a.onu_id ? L.ui.addNotification(null, s("p", {
                    children: _("Select a registered O5 device first.")
                }), "warning") : m.getUIElement(n)?.setValue(String(a.onu_id));
            }, m.validate = (e, t)=>!t || (/^(?:[0-9]|1[0-5])$/.test(t) ? !L.uci.sections("fttr", "device").some((n)=>{
                    if (n[".name"] === e) return !1;
                    let i = m.formvalue(n[".name"]) ?? n.onu_id;
                    return null != i && String(i) === t;
                }) || _("Interface already reserved by another device.") : _("Select an interface from fttr1 to fttr16."));
            let v = p(e, "cwmp", "cwmp_contract", _("CWMP contract"), [
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
            v.modalonly = !0, v.default = "auto", v.rmempty = !1, v.description = _("Independent of the optical adapter. Parameter paths, types and writable evidence are discovered before synchronization. Unverified candidates do not authorize writes.");
            let y = d(e, "cwmp", L.form.Flag, "connection_request", _("Supports Connection Request"));
            y.modalonly = !0, y.default = "1", y.rmempty = !1, y.description = _("Independent per device; enabled by default for all adapters. Enabled: on-demand sessions with periodic Inform enabled and an interval of at most 12 hours (backend default: 43200 seconds). Disabled: manually set PeriodicInformEnable to true and PeriodicInformInterval to at most 180 seconds; no interval is written automatically. Requires reachable CWMP, verified standard parameters, HTTP Digest support, a prior Inform with a ConnectionRequestURL and valid CPE credentials. Firmware support is not guaranteed. Acceptance is not proof of a session or completed RPCs.");
            let k = d(e, "cwmp", L.form.Flag, "connection_request_defaults", _("Use backend Connection Request defaults"));
            k.modalonly = !0, k.default = "1", k.rmempty = !1, k.retain = !0, k.depends("connection_request", "1"), k.cfgvalue = (e)=>{
                let t = L.uci.get("fttr", e, "connection_request_defaults");
                return null != t ? String(t) : L.uci.get("fttr", e, "connection_request_username") && L.uci.get("fttr", e, "connection_request_password") ? "0" : "1";
            }, k.description = _("Uses a backend-reserved profile; factory credentials are not yet verified. Disable to enter this CPE's existing credentials and port. Saved custom values are retained while hidden.");
            let z = d(e, "cwmp", L.form.Value, "connection_request_username", _("CPE Connection Request username"));
            z.modalonly = !0, z.optional = !0, z.rmempty = !0, z.retain = !0, z.depends({
                connection_request: "1",
                connection_request_defaults: "0"
            }), z.description = _("Enter this CPE's existing Connection Request credentials, not the ACS inbound HTTP Basic credentials. No custom credential defaults are assumed.");
            let j = d(e, "cwmp", L.form.Value, "connection_request_password", _("CPE Connection Request password"));
            j.modalonly = !0, j.password = !0, j.optional = !0, j.rmempty = !0, j.retain = !0, j.depends({
                connection_request: "1",
                connection_request_defaults: "0"
            }), j.description = _("Saved custom values are retained when Connection Requests are disabled or backend defaults are selected. Leave these fields unchanged to preserve their saved values.");
            let P = d(e, "cwmp", L.form.Value, "connection_request_port", _("CPE Connection Request port"), "port");
            P.modalonly = !0, P.default = "7547", P.rmempty = !1, P.retain = !0, P.depends({
                connection_request: "1",
                connection_request_defaults: "0"
            });
            let A = d(e, "advanced", L.form.Flag, "omci_management", _("Provision management VLAN and ACS via OMCI"));
            A.modalonly = !0, A.default = "0", A.rmempty = !1, A.description = _("Disabled by default. Uses the global management VLAN, priority and ACS URL for this device only, subject to management application authorization. Disabling skips future OMCI management writes and retains existing ONU settings. ME readback does not prove WAN creation or successful Inform; K155 may clear its local ACS URL when enabled.");
            let C = p(e, "advanced", "wifi_cleanup", _("Unconfigured WLANs"), [
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
            C.modalonly = !0, C.default = "disable", C.description = _("By default, extra WLANs are disabled and retained. Deleting objects is destructive and should only be selected deliberately.");
        }), j.tab("templates", _("Templates")), y(g(j, "templates", "_templates", "template", _("Templates"), (e)=>{
            for (let [t, n] of (e.description = _("Create a template first, then add its SSIDs and networks in their tabs. Each editor changes one item. Confirm stages changes; Save & Apply applies the page configuration.") + " " + _("Deleting an unused template also deletes its SSIDs and networks."), h(e, "_name", _("Template"), (e)=>String(L.uci.get("fttr", e, "name") || _("New template"))), [
                [
                    "wifi",
                    _("SSIDs")
                ],
                [
                    "network",
                    _("Networks")
                ],
                [
                    "group",
                    _("Groups")
                ]
            ]))h(e, `_${t}_count`, n, (e)=>String(L.uci.sections("fttr", t).filter((t)=>t.template === e).length));
            let t = c(e, L.form.Value, "name", _("Name"));
            t.modalonly = !0, t.rmempty = !1;
        }), t2), j.tab("wifi", _("SSIDs")), y(g(j, "wifi", "_wifi", "wifi", _("SSIDs"), (e)=>{
            e.description = _("Create SSIDs here before selecting them in a network. Every SSID belongs to one template.");
            let t = v(e), n = t.validate;
            t.validate = function(e, t) {
                let i = n.call(this, e, t);
                return !0 !== i ? i : !tY().network.some((n)=>tX(n.ssid).includes(e) && n.template !== t) || _("This SSID is bound to a network. Remove its network bindings before changing the template.");
            }, h(e, "_ssid", _("SSID"), (e)=>String(L.uci.get("fttr", e, "ssid") || e)), h(e, "_radio", _("Band"), (e)=>"2g" === L.uci.get("fttr", e, "radio") ? "2.4 GHz" : "5 GHz"), h(e, "_security", _("Security"), (e)=>{
                let t = String(L.uci.get("fttr", e, "security") || "");
                return "none" === t ? _("None (Open)") : t || _("Keep current key");
            });
            let i = c(e, L.form.Value, "ssid", _("SSID"));
            i.modalonly = !0, i.rmempty = !1, i.validate = (e, t)=>new TextEncoder().encode(t).length >= 1 && new TextEncoder().encode(t).length <= 32 || _("SSID must be 1\u201332 bytes.");
            let r = u(e, "radio", _("Band"), [
                [
                    "2g",
                    "2.4 GHz"
                ],
                [
                    "5g",
                    "5 GHz"
                ]
            ]);
            r.modalonly = !0, r.default = "2g", u(e, "security", _("Security"), [
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
            let a = c(e, L.form.Value, "key", _("Password"));
            a.password = !0, a.modalonly = !0, a.depends("security", "wpa2-psk"), a.depends("security", "wpa3-sae"), a.depends("security", "wpa2-psk/wpa3-sae"), a.depends("security", "wpa-psk/wpa2-psk"), a.rmempty = !1, a.validate = (e, t)=>{
                let n = new TextEncoder().encode(t).length;
                return n >= 8 && n <= 63 || _("Password must be 8\u201363 bytes.");
            };
        }), t5), j.tab("networks", _("Networks")), g(j, "networks", "_networks", "network", _("Networks"), (e)=>{
            e.description = _("Networks bind VLAN services to wired ports and optional SSIDs within one template.");
            let t = v(e);
            h(e, "_name", _("Network"), (e)=>String(L.uci.get("fttr", e, "name") || _("New network"))), h(e, "_vlan", _("VLAN"), (e)=>String(L.uci.get("fttr", e, "vlan") || "0")), h(e, "_services", _("WAN Service List (multi-select)"), (e)=>tX(L.uci.get("fttr", e, "service_list")).join(", ")), h(e, "_bindings", _("LAN / WLAN port bindings"), (e)=>[
                    ...tX(L.uci.get("fttr", e, "port")).map((e)=>e.toUpperCase()),
                    ...tX(L.uci.get("fttr", e, "ssid")).map((e)=>String(L.uci.get("fttr", e, "ssid") || e))
                ].join(", "));
            let n = c(e, L.form.Value, "name", _("Name"));
            n.modalonly = !0, n.rmempty = !1;
            let i = c(e, L.form.MultiValue, "service_list", _("WAN Service List (multi-select)"));
            for (let e of (i.modalonly = !0, i.rmempty = !1, i.validate = (e, t)=>t3(t), i.description = _("Select at least one of INTERNET, OTHER, IPTV, and VOIP for each custom VLAN. TR069 is reserved for OMCI."), tQ))i.value(e, e);
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
                let r = c(e, L.form.Value, t, n, i);
                r.default = "0", r.rmempty = !1, r.modalonly = !0;
            }
            let r = c(e, L.form.MultiValue, "ssid", _("SSIDs"));
            r.modalonly = !0, r.rmempty = !0, r.placeholder = _("No SSIDs selected"), r.description = _("Optional for wired-only networks. Only SSIDs from the selected template are listed. Changing the template clears the SSID selection."), f(r, function(e) {
                let t = this.section.getOption("template");
                return t1(tY(), String(t?.formvalue(e) ?? L.uci.get("fttr", e, "template") ?? ""));
            }), r.validate = function(e, t) {
                let n = String(this.section.getOption("template").formvalue(e) ?? L.uci.get("fttr", e, "template") ?? ""), i = new Set(t1(tY(), n).map((e)=>{
                    let [t] = e;
                    return t;
                }));
                return !!tX(t).every((e)=>i.has(e)) || _("Select SSIDs belonging to this network's template.");
            }, t.onchange = function(e, t, n) {
                let i = this.section.getOption("ssid").getUIElement(t);
                if (!i) return;
                let r = t1(tY(), n);
                i.clearChoices(!0), i.addChoices(r.map((e)=>{
                    let [t] = e;
                    return t;
                }), Object.fromEntries(r));
            };
            let a = c(e, L.form.MultiValue, "port", _("Ports"));
            a.modalonly = !0;
            for(let e = 1; e <= 4; e++)a.value(`lan${e}`, `LAN${e}`);
        }), this.handleSave = ()=>z.save(()=>{
                let e = tY(), t = t7(e);
                if (t.length) throw Error(t.map((t)=>{
                    let n = e[t.kind].find((e)=>e[".name"] === t.sectionId), i = e.template.find((e)=>e[".name"] === n?.template), r = [
                        i && t0(i),
                        n ? t0(n) : t.sectionId
                    ].filter(Boolean).join(" / ");
                    return `${r} [${t.sectionId}.${t.field}]: ${t.message}`;
                }).join("\n"));
                L.uci.unset("fttr", "acs", "listen"), L.uci.unset("fttr", "management", "acs_url");
            });
        let A = s("pre", {
            style: "white-space:pre-wrap;overflow-wrap:anywhere",
            "aria-live": "polite"
        }), C = null, T = (e)=>{
            var t;
            k = e?.error, C?.parentNode?.removeChild(C), C = null, e?.error && (C = L.ui.addNotification(_("FTTR configuration check failed"), (t = {
                children: [
                    s("p", {
                        children: String(e.error)
                    }),
                    s("button", {
                        class: "cbi-button cbi-button-action",
                        type: "button",
                        onclick: ()=>nt(j, k),
                        children: _("Review and repair configuration")
                    })
                ]
            }, s("div", t)), "error"));
        };
        T(e);
        let N = (a = {
            class: "cbi-section",
            children: [
                (r = {
                    children: [
                        _("Saving configuration does not synchronize devices in Manual mode. After Save & Apply, open Synchronization and choose Apply differences. Preview differences is read-only."),
                        " ",
                        s("a", {
                            href: L.url("admin", "network", "fttr", "sync"),
                            children: _("Open Synchronization")
                        })
                    ]
                }, s("p", r)),
                s("h3", {
                    children: _("Configuration diagnostics")
                }),
                s("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    onclick: ()=>nt(j, k),
                    children: _("Review and repair configuration")
                }),
                " ",
                s("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    onclick: ()=>nc(ni, A, T),
                    children: _("Check")
                }),
                " ",
                s("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    disabled: !L.hasViewPermission(),
                    onclick: ()=>nc(async ()=>(await nr(), await ni()), A, T),
                    children: _("Reload")
                }),
                " ",
                s("button", {
                    class: "cbi-button cbi-button-negative",
                    type: "button",
                    disabled: !L.hasViewPermission(),
                    onclick: ()=>nc(na, A),
                    children: _("Restart")
                }),
                A
            ]
        }, s("div", a));
        return j.tab("diagnostics", _("Configuration diagnostics")), j.taboption("diagnostics", nl.DummyValue, "_diagnostics", "").render = ()=>Promise.resolve(N), z.render();
    }
});

return main;