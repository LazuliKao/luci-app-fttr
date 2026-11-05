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
const o = Symbol.for("jsx.fragment");
function s(e, t) {
    let { children: n, ...r } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, i = function e(t) {
        let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let r of t)null != r && "boolean" != typeof r && (Array.isArray(r) ? e(r, n) : n.push(r instanceof Node ? r : String(r)));
        return n;
    }(null == n ? [] : Array.isArray(n) ? n : [
        n
    ]);
    if (e === o) {
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
    let a = {}, s = {
        ...r
    };
    for (let [e, t] of Object.entries(s))e.startsWith("on") && "function" == typeof t ? (a[e] = t, delete s[e]) : "boolean" == typeof t && (t ? s[e] = e : delete s[e]);
    let l = Object.keys(s).length > 0 ? i.length > 1 ? E(e, s, i) : E(e, s, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
    for (let [e, t] of Object.entries(a)){
        let n = e.slice(2).toLowerCase();
        l.addEventListener(n, t);
    }
    return l;
}
let l = L.form;
function c(e, t, n, r, i) {
    let a = e.option(t, n, r);
    return i && (a.datatype = i.startsWith("range(") ? `and(uinteger,${i})` : i), a;
}
function d(e, t, n, r, i, a) {
    let o = e.taboption(t, n, r, i);
    return a && (o.datatype = a.startsWith("range(") ? `and(uinteger,${a})` : a), o;
}
function u(e, t, n, r) {
    let i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], a = c(e, l.ListValue, t, n);
    for (let [e, t] of r)a.value(e, t);
    return a.rmempty = i, a;
}
function p(e, t, n, r, i) {
    let a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5], o = d(e, t, l.ListValue, n, r);
    for (let [e, t] of i)o.value(e, t);
    return o.rmempty = a, o;
}
function m(e, t, n, r) {
    let i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], a = c(e, l.RichListValue, t, n);
    return a.rmempty = i, a.optional = i, a.default = "", f(a, ()=>[
            ...i ? [
                [
                    "",
                    _("None")
                ]
            ] : [],
            ...L.uci.sections("fttr", r).map((e)=>[
                    e[".name"],
                    String(e.name || e.ssid || e.optical_sn || e[".name"])
                ])
        ]), a.validate = (e, t)=>!!(i && !t || L.uci.sections("fttr", r).some((e)=>e[".name"] === t)) || _("Select an existing item."), a;
}
function f(e, t) {
    let n = e.transformChoices;
    e.transformChoices = function() {
        return n.call(this) ?? {};
    };
    let r = e.renderWidget;
    e.renderWidget = function() {
        for(var e = arguments.length, n = Array(e), i = 0; i < e; i++)n[i] = arguments[i];
        for (let [e, r] of (this.keylist = [], this.vallist = [], t.call(this, String(n[0]))))this.value(e, r);
        return r.apply(this, n);
    };
}
function g(e, t, n, r, i, a) {
    let o = e.taboption(t, l.SectionValue, n, l.GridSection, r, i).subsection;
    return o.anonymous = !0, o.addremove = !0, o.modaltitle = (e)=>String(L.uci.get("fttr", e, "name") || L.uci.get("fttr", e, "ssid") || i), a(o), o.addModalOptions = (e, t)=>{
        let n = e.map.parse;
        e.map.parse = function() {
            let r = !0;
            for (let n of e.children){
                if (!n.isActive(t)) continue;
                n.triggerValidation(t), n.isValid(t) || (r = !1);
                let e = n.formvalue(t);
                !n.rmempty && !n.optional && (null == e || "" === e || Array.isArray(e) && !e.length) && (n.getUIElement(t)?.setInvalid(_("This field is required.")), r = !1);
            }
            return r ? n.call(this) : Promise.reject(Error(_("Correct the invalid fields before saving.")));
        };
    }, o;
}
function h(e, t, n, r) {
    let i = e.option(L.form.DummyValue, t, n);
    i.modalonly = !1, i.textvalue = r;
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
    e.handleRemove = async function(e, r) {
        try {
            t(e), await n.call(this, e, r);
        } catch (e) {
            L.ui.addNotification(null, s("p", {
                children: String(e instanceof Error ? e.message : e)
            }), "error");
        }
    };
}
function b(e, t, n) {
    function r(n, r) {
        if (n._zod || Object.defineProperty(n, "_zod", {
            value: {
                def: r,
                constr: o,
                traits: new Set()
            },
            enumerable: !1
        }), n._zod.traits.has(e)) return;
        n._zod.traits.add(e), t(n, r);
        let i = o.prototype, a = Object.keys(i);
        for(let e = 0; e < a.length; e++){
            let t = a[e];
            t in n || (n[t] = i[t].bind(n));
        }
    }
    let i = n?.Parent ?? Object;
    class a extends i {
    }
    function o(e) {
        var t;
        let i = n?.Parent ? new a() : this;
        for (let n of (r(i, e), (t = i._zod).deferred ?? (t.deferred = []), i._zod.deferred))n();
        return i;
    }
    return Object.defineProperty(a, "name", {
        value: e
    }), Object.defineProperty(o, "init", {
        value: r
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
function j(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function z(e) {
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const P = Symbol("evaluating");
function A(e, t, n) {
    let r;
    Object.defineProperty(e, t, {
        get () {
            if (r !== P) return void 0 === r && (r = P, r = n()), r;
        },
        set (n) {
            Object.defineProperty(e, t, {
                value: n
            });
        },
        configurable: !0
    });
}
const C = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function x(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function N(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function T(e) {
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
function R(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let n = t; n < e.issues.length; n++)if (e.issues[n]?.continue !== !0) return !0;
    return !1;
}
function I(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function O(e) {
    return "string" == typeof e ? e : e?.message;
}
function V(e, t, n) {
    let r = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (r.message = O(e.inst?._zod.def?.error?.(e)) ?? O(t?.error?.(e)) ?? O(n.customError?.(e)) ?? O(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
const $ = (e, t)=>{
    e.name = "$ZodError", Object.defineProperty(e, "_zod", {
        value: e._zod,
        enumerable: !1
    }), Object.defineProperty(e, "issues", {
        value: t,
        enumerable: !1
    }), e.message = JSON.stringify(t, j, 2), Object.defineProperty(e, "toString", {
        value: ()=>e.message,
        enumerable: !1
    });
}, D = b("$ZodError", $), M = b("$ZodError", $, {
    Parent: Error
}), q = (n = M, (e, t, r, i)=>{
    let a = r ? Object.assign(r, {
        async: !1
    }) : {
        async: !1
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise) throw new w();
    if (o.issues.length) {
        let e = new (i?.Err ?? n)(o.issues.map((e)=>V(e, a, k())));
        throw C(e, i?.callee), e;
    }
    return o.value;
}), U = (r = M, async (e, t, n, i)=>{
    let a = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (i?.Err ?? r)(o.issues.map((e)=>V(e, a, k())));
        throw C(e, i?.callee), e;
    }
    return o.value;
}), W = (i = M, (e, t, n)=>{
    let r = n ? {
        ...n,
        async: !1
    } : {
        async: !1
    }, a = e._zod.run({
        value: t,
        issues: []
    }, r);
    if (a instanceof Promise) throw new w();
    return a.issues.length ? {
        success: !1,
        error: new (i ?? D)(a.issues.map((e)=>V(e, r, k())))
    } : {
        success: !0,
        data: a.value
    };
}), Z = (a = M, async (e, t, n)=>{
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
        error: new a(i.issues.map((e)=>V(e, r, k())))
    } : {
        success: !0,
        data: i.value
    };
}), H = /^-?\d+(?:\.\d+)?$/, G = /^(?:true|false)$/i, F = /^null$/i, B = {
    major: 4,
    minor: 3,
    patch: 6
}, K = b("$ZodType", (e, t)=>{
    var n;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = B;
    let r = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && r.unshift(e), r))for (let n of t._zod.onattach)n(e);
    if (0 === r.length) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, n)=>{
            let r, i = R(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, o = a._zod.check(e);
                if (o instanceof Promise && n?.async === !1) throw new w();
                if (r || o instanceof Promise) r = (r ?? Promise.resolve()).then(async ()=>{
                    await o, e.issues.length !== t && (i || (i = R(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = R(e, t));
                }
            }
            return r ? r.then(()=>e) : e;
        }, n = (n, i, a)=>{
            if (R(n)) return n.aborted = !0, n;
            let o = t(i, r, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new w();
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
                return t instanceof Promise ? t.then((e)=>n(e, i, a)) : n(t, i, a);
            }
            let o = e._zod.parse(i, a);
            if (o instanceof Promise) {
                if (!1 === a.async) throw new w();
                return o.then((e)=>t(e, r, a));
            }
            return t(o, r, a);
        };
    }
    A(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = W(e, t);
                    return n.success ? {
                        value: n.data
                    } : {
                        issues: n.error?.issues
                    };
                } catch (n) {
                    return Z(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), J = b("$ZodString", (e, t)=>{
    var n;
    let r;
    K.init(e, t), e._zod.pattern = [
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
}), Q = b("$ZodNumber", (e, t)=>{
    K.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? H, e._zod.parse = (n, r)=>{
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
}), X = b("$ZodBoolean", (e, t)=>{
    K.init(e, t), e._zod.pattern = G, e._zod.parse = (n, r)=>{
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
}), Y = b("$ZodNull", (e, t)=>{
    K.init(e, t), e._zod.pattern = F, e._zod.values = new Set([
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
}), ee = b("$ZodUnknown", (e, t)=>{
    K.init(e, t), e._zod.parse = (e)=>e;
});
function et(e, t, n) {
    e.issues.length && t.issues.push(...I(n, e.issues)), t.value[n] = e.value;
}
const en = b("$ZodArray", (e, t)=>{
    K.init(e, t), e._zod.parse = (n, r)=>{
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
            let o = i[e], s = t.element._zod.run({
                value: o,
                issues: []
            }, r);
            s instanceof Promise ? a.push(s.then((t)=>et(t, n, e))) : et(s, n, e);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
});
function er(e, t, n, r, i) {
    if (e.issues.length) {
        if (i && !(n in r)) return;
        t.issues.push(...I(n, e.issues));
    }
    void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const ei = b("$ZodObject", (e, t)=>{
    var n;
    let r;
    K.init(e, t);
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
    A(e._zod, "propValues", ()=>{
        let e = t.shape, n = {};
        for(let t in e){
            let r = e[t]._zod;
            if (r.values) for (let e of (n[t] ?? (n[t] = new Set()), r.values))n[t].add(e);
        }
        return n;
    });
    let o = t.catchall;
    e._zod.parse = (t, n)=>{
        r ?? (r = a.value);
        let i = t.value;
        if (!x(i)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: i,
            inst: e
        }), t;
        t.value = {};
        let s = [], l = r.shape;
        for (let e of r.keys){
            let r = l[e], a = "optional" === r._zod.optout, o = r._zod.run({
                value: i[e],
                issues: []
            }, n);
            o instanceof Promise ? s.push(o.then((n)=>er(n, t, e, i, a))) : er(o, t, e, i, a);
        }
        return o ? function(e, t, n, r, i, a) {
            let o = [], s = i.keySet, l = i.catchall._zod, c = l.def.type, d = "optional" === l.optout;
            for(let i in t){
                if (s.has(i)) continue;
                if ("never" === c) {
                    o.push(i);
                    continue;
                }
                let a = l.run({
                    value: t[i],
                    issues: []
                }, r);
                a instanceof Promise ? e.push(a.then((e)=>er(e, n, i, t, d))) : er(a, n, i, t, d);
            }
            return (o.length && n.issues.push({
                code: "unrecognized_keys",
                keys: o,
                input: t,
                inst: a
            }), e.length) ? Promise.all(e).then(()=>n) : n;
        }(s, i, t, n, a.value, e) : s.length ? Promise.all(s).then(()=>t) : t;
    };
});
function ea(e, t, n, r) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let i = e.filter((e)=>!R(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>V(e, r, k())))
    }), t);
}
const eo = b("$ZodUnion", (e, t)=>{
    K.init(e, t), A(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), A(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), A(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), A(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>z(e.source)).join("|")})$`);
        }
    });
    let n = 1 === t.options.length, r = t.options[0]._zod.run;
    e._zod.parse = (i, a)=>{
        if (n) return r(i, a);
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
        return o ? Promise.all(s).then((t)=>ea(t, i, e, a)) : ea(s, i, e, a);
    };
}), es = b("$ZodRecord", (e, t)=>{
    K.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!function(e) {
            if (!1 === x(e)) return !1;
            let t = e.constructor;
            if (void 0 === t || "function" != typeof t) return !0;
            let n = t.prototype;
            return !1 !== x(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
        }(i)) return n.issues.push({
            expected: "record",
            code: "invalid_type",
            input: i,
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
                    value: i[e],
                    issues: []
                }, r);
                o instanceof Promise ? a.push(o.then((t)=>{
                    t.issues.length && n.issues.push(...I(e, t.issues)), n.value[e] = t.value;
                })) : (o.issues.length && n.issues.push(...I(e, o.issues)), n.value[e] = o.value);
            }
            for(let e in i)l.has(e) || (s = s ?? []).push(e);
            s && s.length > 0 && n.issues.push({
                code: "unrecognized_keys",
                input: i,
                inst: e,
                keys: s
            });
        } else for (let o of (n.value = {}, Reflect.ownKeys(i))){
            if ("__proto__" === o) continue;
            let s = t.keyType._zod.run({
                value: o,
                issues: []
            }, r);
            if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof o && H.test(o) && s.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(o),
                    issues: []
                }, r);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (s = e);
            }
            if (s.issues.length) {
                "loose" === t.mode ? n.value[o] = i[o] : n.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: s.issues.map((e)=>V(e, r, k())),
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
            }, r);
            l instanceof Promise ? a.push(l.then((e)=>{
                e.issues.length && n.issues.push(...I(o, e.issues)), n.value[s.value] = e.value;
            })) : (l.issues.length && n.issues.push(...I(o, l.issues)), n.value[s.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
}), el = b("$ZodLiteral", (e, t)=>{
    if (K.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? N(e) : e ? N(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i)=>{
        let a = r.value;
        return n.has(a) || r.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
            inst: e
        }), r;
    };
});
function ec(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const ed = b("$ZodOptional", (e, t)=>{
    K.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", A(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), A(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${z(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let r = t.innerType._zod.run(e, n);
            return r instanceof Promise ? r.then((t)=>ec(t, e.value)) : ec(r, e.value);
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
const eu = b("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    K.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>q(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>W(e, t, n), e.parseAsync = async (t, n)=>U(e, t, n, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, n)=>Z(e, t, n), e.check = (...n)=>e.clone({
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
}), ep = b("ZodMiniString", (e, t)=>{
    J.init(e, t), eu.init(e, t);
});
function e_(e) {
    return new ep({
        type: "string",
        ...T(e)
    });
}
const em = b("ZodMiniNumber", (e, t)=>{
    Q.init(e, t), eu.init(e, t);
});
function ef(e) {
    return new em({
        type: "number",
        checks: [],
        ...T(e)
    });
}
const eg = b("ZodMiniBoolean", (e, t)=>{
    X.init(e, t), eu.init(e, t);
});
function eh(e) {
    return new eg({
        type: "boolean",
        ...T(e)
    });
}
const ev = b("ZodMiniNull", (e, t)=>{
    Y.init(e, t), eu.init(e, t);
});
function ey(e) {
    return new ev({
        type: "null",
        ...T(e)
    });
}
const eb = b("ZodMiniUnknown", (e, t)=>{
    ee.init(e, t), eu.init(e, t);
}), ew = b("ZodMiniArray", (e, t)=>{
    en.init(e, t), eu.init(e, t);
});
function eS(e, t) {
    return new ew({
        type: "array",
        element: e,
        ...T(t)
    });
}
const ek = b("ZodMiniObject", (e, t)=>{
    ei.init(e, t), eu.init(e, t), A(e, "shape", ()=>t.shape);
});
function eL(e, t) {
    return new ek({
        type: "object",
        shape: e ?? {},
        ...T(t)
    });
}
const ej = b("ZodMiniUnion", (e, t)=>{
    eo.init(e, t), eu.init(e, t);
});
function ez(e, t) {
    return new ej({
        type: "union",
        options: e,
        ...T(t)
    });
}
const eP = b("ZodMiniRecord", (e, t)=>{
    es.init(e, t), eu.init(e, t);
});
function eA(e, t, n) {
    return new eP({
        type: "record",
        keyType: e,
        valueType: t,
        ...T(n)
    });
}
const eC = b("ZodMiniLiteral", (e, t)=>{
    el.init(e, t), eu.init(e, t);
});
function ex(e, t) {
    return new eC({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...T(t)
    });
}
const eN = b("ZodMiniOptional", (e, t)=>{
    ed.init(e, t), eu.init(e, t);
});
function eE(e) {
    return new eN({
        type: "optional",
        innerType: e
    });
}
const eT = ez([
    ex("account_set_password"),
    ex("account_set_active")
]), eR = ez([
    ex("waiting_transport"),
    ex("waiting_identity"),
    ex("reading"),
    ex("configuring"),
    ex("verifying"),
    ex("waiting_inform"),
    ex("ready"),
    ex("retry_wait"),
    ex("manual_required"),
    ex("not_configured"),
    ex("waiting_acs"),
    ex("awaiting_apply"),
    ex("discovering_management_wan"),
    ex("configuring_management_wan"),
    ex("verifying_management_wan")
]), eI = eL({
    enabled: eh(),
    listen: ez([
        e_(),
        ey()
    ]),
    path: ez([
        e_(),
        ey()
    ]),
    error: ez([
        e_(),
        ey()
    ])
}), eO = eL({
    vlan: ef(),
    vlans: eS(ef()),
    priority: ef(),
    acs_url: e_()
}), eV = eL({
    state: eR,
    optical_sn: e_(),
    cwmp_id: e_(),
    mqtt_target: ez([
        e_(),
        ey()
    ]),
    binding_source: e_(),
    method: e_(),
    desired_version: e_(),
    generation: ef(),
    reason: e_(),
    attempts: ef(),
    next_retry_at: ef(),
    updated_at: ef(),
    settings_verified_at: ez([
        ef(),
        ey()
    ]),
    selected_vlan: ez([
        ef(),
        ey()
    ]),
    last_inform: ez([
        ef(),
        ey()
    ]),
    expected_acs_url: e_(),
    last_error: ez([
        e_(),
        ey()
    ]),
    transport_epoch: ef(),
    completed_authorization: ef(),
    connection_request_enabled: ez([
        eh(),
        ey()
    ]),
    inflight: eh(),
    persistence_error: ez([
        e_(),
        ey()
    ]),
    link_identity_error: ez([
        e_(),
        ey()
    ]),
    listener: eI,
    mqtt_last_seen: ez([
        ef(),
        ey()
    ]),
    desired: eE(eO),
    endpoint_notice: eE(e_()),
    manual_steps: eE(eS(e_()))
}), e$ = ez([
    ex("pending"),
    ex("unavailable")
]), eD = ez([
    eV,
    eL({
        state: e$,
        reason: e_()
    })
]), eM = eL({
    id: e_(),
    name: e_()
}), eq = eL({
    configured: e_(),
    effective: e_(),
    available: eS(e_()),
    reason: e_()
}), eU = eL({
    phase: ez([
        ex("not_started"),
        ex("collecting_identity"),
        ex("retrying_identity"),
        ex("unsupported"),
        ex("configuring"),
        ex("verifying"),
        ex("wan_bootstrap_pending"),
        ex("verified"),
        ex("retrying"),
        ex("offline")
    ]),
    generation: ef(),
    error: ez([
        e_(),
        ey()
    ])
});
eL({
    success: eh(),
    output: eE(e_()),
    error: eE(e_())
});
const eW = ez([
    ex("factory"),
    ex("firmware"),
    ex("builtin")
]), eZ = eL({
    detected: eh(),
    device: e_(),
    has_data: eh(),
    sha256: e_(),
    data: e_()
}), eH = eL({
    exists: eh(),
    path: e_(),
    size: ef(),
    sha256: e_(),
    data: e_()
}), eG = eL({
    source: eW,
    active_path: e_(),
    size: ef(),
    sha256: e_(),
    data: e_(),
    factory: eZ,
    firmware: eH
}), eF = eL({
    error: e_()
});
ez([
    eG,
    eF
]);
const eB = eL({
    success: eh(),
    path: e_(),
    size: ef(),
    sha256: e_()
});
ez([
    eB,
    eF
]), eL({
    data: e_()
});
const eK = eL({
    acs: eh(),
    mqtt: eh(),
    npu: eh(),
    "device-hl202": eh(),
    "device-hwtc": eh(),
    "device-star": eh(),
    "device-zte": eh(),
    "device-scty": eh()
}), eJ = eL({
    optical: eh(),
    bridge_offload: eh(),
    omci_mib: eh(),
    mqtt_telemetry: eh(),
    hl202_management: eh(),
    cwmp: eh(),
    command_provisioning: eh()
}), eQ = eL({
    status: eh(),
    config: eh(),
    sync: eh(),
    hardware: eh(),
    calibration: eh(),
    hl202: eh(),
    about: eh()
}), eX = eL({
    schema_version: ex(1),
    version: e_(),
    features: eK,
    functions: eJ,
    pages: eQ,
    adapters: eS(eM)
}), eY = ez([
    eL({
        valid: ex(!0),
        revision: e_(),
        devices: ef()
    }),
    eL({
        error: e_()
    })
]), e0 = ez([
    ex("waiting"),
    ex("wan_reconciling"),
    ex("wan_verifying"),
    ex("wifi_reconciling"),
    ex("discovering"),
    ex("reading"),
    ex("disabling"),
    ex("disabling_read"),
    ex("writing"),
    ex("verifying"),
    ex("settling"),
    ex("completed"),
    ex("not_started"),
    ex("reset_pending"),
    ex("interrupted"),
    ex("recovering"),
    ex("waiting_management"),
    ex("waiting_task")
]), e1 = eL({
    operation_id: ef(),
    device: e_(),
    state: e0,
    started_at: ef()
}), e2 = eL({
    state: ez([
        ex("waiting"),
        ex("applied")
    ]),
    requested_revision: e_(),
    requested_at: ez([
        ef(),
        ey()
    ]),
    blocking_operations: eS(e1),
    reset_pending: eh()
}), e4 = ez([
    ex("auto"),
    ex("manual")
]), e5 = ex("diff"), e6 = eL({
    state: e_(),
    enabled: eh(),
    reason: eE(ez([
        e_(),
        ey()
    ])),
    revision: eE(e_()),
    vlan: eE(ef()),
    updated_at: eE(ef())
}), e3 = ez([
    ex("online"),
    ex("waiting_inform"),
    ex("offline_or_stale"),
    ex("waiting_transport")
]), e7 = eL({
    cwmp_id: e_(),
    state: e3,
    optical_online: eh(),
    last_inform: ez([
        ef(),
        ey()
    ]),
    age_seconds: ez([
        ef(),
        ey()
    ])
}), e9 = ez([
    ex("device_service"),
    ex("ssid"),
    ex("port_binding"),
    ex("wan_activation")
]), e8 = eL({
    name: e_(),
    desired: e_()
}), te = eL({
    id: e_(),
    name: eE(ez([
        e_(),
        ey()
    ])),
    kind: e9,
    service_type: e_(),
    state: e_(),
    reason: eE(e_()),
    revision: eE(e_()),
    current_revision: eE(eh()),
    management_fresh: eE(eh()),
    operation_id: eE(ef()),
    task_id: eE(ez([
        ef(),
        ey()
    ])),
    updated_at: eE(ef()),
    changes: eE(eS(e8))
}), tt = ez([
    ex("plan"),
    ex("apply")
]), tn = eL({
    wan: e_(),
    wlan: e_(),
    binding: e_()
}), tr = eL({
    state: e_(),
    requested: e_(),
    contract: ez([
        e_(),
        ey()
    ]),
    reason: e_(),
    cache_hit: eh(),
    schema: e_(),
    capabilities: ez([
        tn,
        ey()
    ])
}), ti = eL({
    parent: ef(),
    connection: ef(),
    state: e_(),
    service_list: e_(),
    kind: e_(),
    baseline: ez([
        eS(ef()),
        ey()
    ])
}), ta = eL({
    state: e_(),
    reason: eE(e_()),
    task_id: eE(ez([
        ef(),
        ey()
    ])),
    instance: eE(ef()),
    cwmp_id: eE(e_())
}), to = ez([
    ex("waiting"),
    ex("inventory"),
    ex("classifying"),
    ex("adding_parent"),
    ex("child_names"),
    ex("adding_child"),
    ex("delete_guard"),
    ex("deleting"),
    ex("verify_delete"),
    ex("empty_parent"),
    ex("deleting_parent"),
    ex("verify_parent_delete"),
    ex("next"),
    ex("done")
]), ts = eL({
    owned: eS(ef()),
    pending: ez([
        e_(),
        ey()
    ]),
    pending_instance: ez([
        ef(),
        ey()
    ])
}), tl = ez([
    ex("waiting"),
    ex("inventory"),
    ex("adding"),
    ex("verify_add"),
    ex("deleting"),
    ex("verify_delete"),
    ex("reading_disable"),
    ex("disabling"),
    ex("verifying_disable"),
    ex("next"),
    ex("done")
]), tc = ez([
    ex("disable"),
    ex("preserve"),
    ex("delete")
]), td = eL({
    parent: ef(),
    child: ef(),
    service: e_(),
    vlan: e_()
}), tu = eL({
    state: e0,
    items: eS(te),
    backend: eE(eq),
    operation_id: eE(ef()),
    device: eE(e_()),
    optical_sn: eE(e_()),
    cwmp_id: eE(e_()),
    revision: eE(e_()),
    mode: eE(tt),
    started_at: eE(ef()),
    completed_at: eE(ez([
        ef(),
        ey()
    ])),
    current_revision: eE(eh()),
    management_fresh: eE(eh()),
    reason: eE(e_()),
    error: eE(e_()),
    attempts: eE(ef()),
    next_retry_at: eE(ef()),
    reconcile_reason: eE(e_()),
    cwmp_contract: eE(tr),
    wan_objects: eE(eA(e_(), ti)),
    wan_lifecycle: eE(eA(e_(), ta)),
    wan_stage: eE(to),
    wifi_objects: eE(ts),
    wifi_lifecycle: eE(eA(e_(), ta)),
    wifi_stage: eE(tl),
    wifi_cleanup: eE(tc),
    native_ownership: eE(eA(e_(), td)),
    write_performed: eE(eh()),
    readback_verified: eE(eh())
}), tp = ez([
    ex("not_configured"),
    ex("stale_revision"),
    ex("stale_management"),
    ex("verified"),
    ex("attention_required"),
    ex("accepted_unverified"),
    ex("pending"),
    ex("recovering"),
    ex("waiting_management")
]), t_ = eL({
    device: e_(),
    name: ez([
        e_(),
        ey()
    ]),
    group: ez([
        e_(),
        ey()
    ]),
    group_name: ez([
        e_(),
        ey()
    ]),
    template: ez([
        e_(),
        ey()
    ]),
    template_name: ez([
        e_(),
        ey()
    ]),
    optical_sn: e_(),
    adapter: e_(),
    omci_management: e6,
    management: ez([
        e7,
        ey()
    ]),
    acs_bootstrap: eD,
    provisioning: tu,
    services: eS(te),
    ssids: eS(te),
    wifi_sync: tp
}), tm = ez([
    ex("discovering"),
    ex("comparing"),
    ex("planning"),
    ex("applying"),
    ex("verifying"),
    ex("configuring_listener"),
    ex("cleaning_previous"),
    ex("waiting_devices"),
    ex("ready"),
    ex("awaiting_apply"),
    ex("verified"),
    ex("blocked"),
    ex("retry_wait")
]), tf = eL({
    enabled: eh(),
    mode: e4,
    vlan: eS(ef()),
    priority: ef(),
    address: e_(),
    acs_url: e_(),
    port: ef(),
    path: e_(),
    dhcp_enabled: eh()
}), tg = eL({
    operation: e_(),
    key: e_(),
    value: eS(e_())
}), th = eL({
    state: tm,
    error: ez([
        e_(),
        ey()
    ]),
    inflight: eh(),
    ready: eh(),
    desired_version: ez([
        e_(),
        ey()
    ]),
    applied_version: ez([
        e_(),
        ey()
    ]),
    next_retry_at: ef(),
    attempts: ef(),
    desired: ez([
        tf,
        ey()
    ]),
    applied: ez([
        tf,
        ey()
    ]),
    previous: ez([
        tf,
        ey()
    ]),
    plan: eS(tg)
}), tv = eL({
    desired: ez([
        eO,
        ey()
    ]),
    state: e_()
}), ty = eL({
    id: e_(),
    name: ez([
        e_(),
        ey()
    ]),
    template: e_()
}), tb = eL({
    enabled: eh(),
    mode: e4,
    method: e5,
    revision: e_(),
    triggers: eS(e_()),
    interval_minutes: ef(),
    error: ez([
        e_(),
        ey()
    ]),
    devices: eS(t_),
    management_network: th,
    omci_management: tv,
    groups: eS(ty),
    pending_devices: eS(e_()),
    onu_pins: eE(eA(e_(), ef())),
    config_error: eE(ez([
        e_(),
        ey()
    ])),
    config_load: eE(e2)
});
ez([
    tb,
    eF
]);
const tw = eL({
    enabled: ez([
        eh(),
        ey()
    ]),
    routed_enabled: ez([
        eh(),
        ey()
    ]),
    bridge_enabled: ez([
        eh(),
        ey()
    ]),
    engine_attached: ez([
        eh(),
        ey()
    ]),
    forwarding_verified: ez([
        eh(),
        ey()
    ])
}), tS = eL({
    entity_id: ef(),
    port_id: ez([
        ef(),
        ey()
    ])
}), tk = eL({
    entity_id: ef(),
    filter_list_hex: ez([
        e_(),
        ey()
    ]),
    forward_operation: ez([
        ef(),
        ey()
    ]),
    number_of_entries: ez([
        ef(),
        ey()
    ])
}), tL = eL({
    entity_id: ef(),
    received_frame_rules_hex: ez([
        eS(e_()),
        ey()
    ]),
    error: ez([
        e_(),
        ey()
    ])
}), tj = eL({
    age_seconds: ef(),
    gem_ports: eS(tS),
    vlan_filters: eS(tk),
    vlan_operations: eS(tL)
}), tz = eL({
    source: e_(),
    unit: e_(),
    reason: ez([
        e_(),
        ey()
    ]),
    raw: ez([
        e_(),
        ey()
    ]),
    age_seconds: ez([
        ef(),
        ey()
    ])
}), tP = eL({
    interface: e_(),
    gem_ports: ez([
        eS(ef()),
        ey()
    ]),
    vlan_id: ez([
        ef(),
        ey()
    ]),
    onu_inventory: ez([
        tj,
        ey()
    ]),
    tx_bytes: ez([
        ef(),
        ey()
    ]),
    rx_bytes: ez([
        ef(),
        ey()
    ]),
    current_tx_kbps: ez([
        ef(),
        ey()
    ]),
    current_rx_kbps: ez([
        ef(),
        ey()
    ]),
    olt_channel_gem: eE(ef()),
    forwarding_verified: eE(eh()),
    offload: tw,
    measurements: eA(e_(), tz)
});
eL({});
const tA = eL({
    entity_id: ef(),
    interval_end_time: ef(),
    corrected_bytes: ef(),
    corrected_code_words: ef(),
    uncorrectable_code_words: ef(),
    total_code_words: ef(),
    fec_seconds: ef()
}), tC = eL({
    ani_entity_id: ez([
        ef(),
        ey()
    ]),
    control_supported: eh(),
    downstream_enabled: ez([
        eh(),
        ey()
    ]),
    upstream_enabled: ez([
        eh(),
        ey()
    ]),
    downstream_pm: ez([
        tA,
        ey()
    ]),
    measurement: tz
}), tx = eL({
    entry: ez([
        ex(0),
        ex(1),
        ex(2)
    ]),
    username: e_(),
    active: eh()
}), tN = eL({
    mqtt_mac: e_(),
    optical_sn: ez([
        e_(),
        ey()
    ]),
    onu_id: ez([
        ef(),
        ey()
    ]),
    binding_generation: e_(),
    last_seen: ef(),
    reason: e_()
}), tE = ez([
    ex("executed"),
    ex("dispatched"),
    ex("timeout"),
    ex("error")
]), tT = eL({
    target: e_(),
    status: tE,
    request_id: eE(e_()),
    exit_code: eE(ef()),
    output: eE(e_()),
    output_truncated: eh(),
    error: eE(e_())
}), tR = eL({
    target: tN,
    result: tT,
    binding_current: eh()
}), tI = ez([
    ex("not_applicable"),
    ex("accepted_and_saved"),
    ex("unconfirmed")
]), tO = eL({
    code: e_(),
    message: e_()
});
ez([
    eL({
        schema_version: ex(1),
        operation: tR,
        accounts: ez([
            eS(tx),
            ey()
        ]),
        write_status: tI
    }),
    eL({
        schema_version: ef(),
        error: tO
    })
]);
const tV = eL({
    optical_sn: e_(),
    onu_id: ef(),
    binding_generation: e_()
}), t$ = eL({
    mqtt_mac: e_(),
    binding_generation: e_()
}), tD = ez([
    tV,
    t$
]);
eL({
    target: tD
});
const tM = ez([
    eL({
        kind: ex("exec"),
        script: e_(),
        timeout_seconds: ef()
    }),
    eL({
        kind: ex("accounts_read")
    }),
    eL({
        kind: ex("account_set_password"),
        entry: ef(),
        password: e_()
    }),
    eL({
        kind: ex("account_set_active"),
        entry: ef(),
        active: eh()
    })
]), tq = eL({
    schema_version: ef(),
    target: tV,
    action: tM
}), tU = eL({
    optical_sn: e_(),
    onu_id: ef(),
    model: e_(),
    optical_online: eh(),
    can_execute: eh(),
    mqtt: ez([
        tN,
        ey()
    ]),
    report_revision: ez([
        ef(),
        ey()
    ])
});
ez([
    eL({
        schema_version: ex(1),
        operation: tR
    }),
    eL({
        schema_version: ef(),
        error: tO
    })
]), eL({
    target: tD,
    script: e_(),
    timeout_seconds: ef()
});
const tW = ez([
    eL({
        schema_version: ex(1),
        devices: eS(tU),
        sources: eS(tN)
    }),
    eL({
        schema_version: ef(),
        error: tO
    })
]);
ez([
    eL({
        method: ex("list")
    }),
    eL({
        method: ex("report"),
        target: tV
    }),
    eL({
        method: ex("source_report"),
        target: t$
    }),
    eL({
        method: ex("run"),
        request: tq
    })
]);
const tZ = ez([
    ex("received"),
    ex("report_unavailable")
]), tH = eL({
    value: new eb({
        type: "unknown"
    }),
    member: e_(),
    unit: ez([
        e_(),
        ey()
    ])
}), tG = eL({
    name: e_(),
    bytes: ef(),
    encoding: e_(),
    text: ez([
        e_(),
        ey()
    ]),
    text_omitted: eh()
}), tF = eL({
    schema_version: ef(),
    compressed_bytes: ef(),
    decompressed_bytes: ef(),
    fields: eA(e_(), tH),
    members: eS(tG),
    errors: eS(e_())
}), tB = eL({
    revision: ef(),
    last_received: ef(),
    last_processed_receipt: ez([
        ef(),
        ey()
    ]),
    last_good: ez([
        ef(),
        ey()
    ]),
    error: ez([
        e_(),
        ey()
    ]),
    report: ez([
        tF,
        ey()
    ])
});
ez([
    eL({
        schema_version: ex(1),
        target: tN,
        report: ez([
            tB,
            ey()
        ]),
        state: tZ
    }),
    eL({
        schema_version: ex(1),
        target: tN,
        report: ez([
            tB,
            ey()
        ]),
        read_only: ex(!0)
    }),
    eL({
        schema_version: ef(),
        error: tO
    })
]), eL({
    target: tD
}), eL({
    target: tD,
    kind: eT,
    entry: ef(),
    password: e_(),
    active: eh()
});
const tK = eL({
    accepted: ef(),
    rejected: ef(),
    read_errors: ef(),
    handled: ef(),
    max_intake_us: ef(),
    max_handler_us: ef()
}), tJ = ex("pending"), tQ = eL({
    phase: ez([
        ex("starting"),
        ex("upload"),
        ex("tables")
    ]),
    received: ef(),
    expected: ez([
        ef(),
        ey()
    ])
}), tX = ex("ready"), tY = ez([
    eL({
        status: tJ,
        progress: eE(tQ)
    }),
    eL({
        status: tX,
        chunk: ef(),
        chunks: ef(),
        bytes: ef(),
        data: e_()
    })
]);
ez([
    tY,
    eF
]);
const t0 = eL({
    status: tJ,
    job: e_()
}), t1 = eL({
    released: eh()
});
eL({
    job: e_()
}), eL({
    job: e_(),
    chunk: ef()
}), ez([
    t0,
    eF
]);
const t2 = eL({
    accepting: eh(),
    running: ef(),
    stored: ef(),
    bytes: ef(),
    running_limit: ef(),
    stored_limit: ef(),
    bytes_limit: ef(),
    result_bytes_limit: ef()
}), t4 = eL({
    mac: e_(),
    ip: e_(),
    band: e_(),
    rssi_dbm: ez([
        ef(),
        ey()
    ]),
    rx_rate_mbps: ez([
        ef(),
        ey()
    ]),
    tx_rate_mbps: ez([
        ef(),
        ey()
    ])
}), t5 = ez([
    ex("unknown"),
    ex("octets"),
    ex("string"),
    ex("unsigned_integer"),
    ex("table"),
    ex("signed_integer"),
    ex("pointer"),
    ex("bit_field"),
    ex("enumeration"),
    ex("counter")
]), t6 = eL({
    id: e_(),
    url: e_()
}), t3 = eL({
    name: e_(),
    kind: t5,
    index: ef(),
    mask: ef(),
    size: ef(),
    read: eh(),
    write: eh(),
    set_by_create: eh(),
    avc: eh(),
    optional: eh(),
    deprecated: eh(),
    default_hex: ez([
        e_(),
        ey()
    ]),
    reference: t6
}), t7 = ez([
    eL({
        type: ex("unsigned"),
        value: ef()
    }),
    eL({
        type: ex("signed"),
        value: ef()
    }),
    eL({
        type: ex("decimal"),
        value: e_()
    }),
    eL({
        type: ex("text"),
        value: ez([
            e_(),
            ey()
        ])
    }),
    eL({
        type: ex("octets"),
        hex: e_()
    }),
    eL({
        type: ex("table_length"),
        bytes: ef()
    })
]), t9 = eL({
    raw_hex: e_(),
    value: t7,
    sequences: eS(ef())
}), t8 = eL({
    definition: t3,
    value: ez([
        t7,
        ey()
    ]),
    observations: eS(t9)
}), ne = ez([
    ex("layout"),
    ex("name_only"),
    ex("unknown")
]), nt = eL({
    class_id: ef(),
    name: ez([
        e_(),
        ey()
    ]),
    entities: ef(),
    records: ef(),
    support: ne
}), nn = eL({
    code: e_(),
    message: e_(),
    offset: ef(),
    mask: ef()
}), nr = eL({
    class_id: ef(),
    entity_id: ef(),
    name: ez([
        e_(),
        ey()
    ]),
    support: ne,
    reference: ez([
        t6,
        ey()
    ]),
    sequences: eS(ef()),
    attributes: eS(t8),
    diagnostics: eS(nn)
}), ni = ex("ready"), na = eL({
    class_id: ef(),
    entity_id: ef(),
    sequence: ef(),
    attribute_mask: ef(),
    raw_hex: e_(),
    consumed: ef(),
    remaining_hex: e_(),
    undecoded_mask: ef()
}), no = eL({
    raw_hex: e_(),
    filter_outer_priority: ef(),
    filter_outer_vid: ef(),
    filter_outer_tpid_dei: ef(),
    filter_inner_priority: ef(),
    filter_inner_vid: ef(),
    filter_inner_tpid_dei: ef(),
    filter_ethertype: ef(),
    tags_to_remove: ef(),
    treatment_outer_priority: ef(),
    treatment_outer_vid: ef(),
    treatment_outer_tpid_dei: ef(),
    treatment_inner_priority: ef(),
    treatment_inner_vid: ef(),
    treatment_inner_tpid_dei: ef(),
    delete_entry: eh()
}), ns = eL({
    class_id: ef(),
    entity_id: ef(),
    attribute: t3,
    collected: eh(),
    error: ez([
        e_(),
        ey()
    ]),
    raw_hex: e_(),
    rows: eS(e_()),
    vlan_rules: eS(no)
}), nl = eL({
    schema_version: ex(1),
    reference_version: e_(),
    onu_id: ez([
        ef(),
        ey()
    ]),
    uploaded_complete: eh(),
    expected_records: ef(),
    received_records: ef(),
    decoded_records: ef(),
    partial_records: ef(),
    basic_records: ef(),
    tables_requested: eh(),
    tables_collected: eh(),
    classes: eS(nt),
    entities: eS(nr),
    records: eS(na),
    tables: eS(ns),
    diagnostics: eS(nn)
});
eL({
    status: ni,
    report: nl
}), eL({
    onu_id: ef(),
    optical_sn: e_(),
    tables: eh()
});
const nc = ez([
    eL({
        status: ex("success"),
        enabled: eh()
    }),
    eL({
        status: ex("error"),
        error: e_()
    })
]);
eL({
    enabled: eh(),
    bridge: e_(),
    wan_upstream: eh(),
    wan_downstream: eh(),
    onu_bridge: eh()
});
const nd = eL({
    index: e_(),
    state: e_(),
    pkt_type: e_(),
    orig_tuple: e_(),
    new_tuple: e_(),
    eth: e_(),
    vlan: e_(),
    packets: ef(),
    bytes: ef(),
    counters_valid: eh(),
    packets_exact: e_(),
    bytes_exact: e_()
}), nu = eL({
    sampled_at_ms: ef(),
    errors: eS(e_()),
    config_valid: eh(),
    engine_valid: eh(),
    mask_valid: eh(),
    routed_mask_valid: eh(),
    debug_valid: eh(),
    flows_valid: eh(),
    entries_valid: eh(),
    counters_valid: eh(),
    hooks_valid: eh(),
    total_packets_exact: e_(),
    total_bytes_exact: e_(),
    supported: eh(),
    engine_attached: eh(),
    bridge_offload_enabled: eh(),
    wan_upstream: eh(),
    wan_downstream: eh(),
    onu_bridge: eh(),
    bridge_offload_mask: ef(),
    routed_offload_mask: ef(),
    bridge_offload_debug: eh(),
    bridge: e_(),
    active_ports: eS(e_()),
    fw4_hooks_ready: eh(),
    total_entries: ef(),
    bound_entries: ef(),
    bound_ipv4_entries: ef(),
    bound_ipv6_entries: ef(),
    total_packets: ef(),
    total_bytes: ef(),
    bound_flows: eS(nd)
}), np = eL({
    equipment_id: ez([
        e_(),
        ey()
    ]),
    hardware_version: ez([
        e_(),
        ey()
    ]),
    software_images: eS(e_()),
    omcc_version: ez([
        ef(),
        ey()
    ]),
    errors: eS(e_())
}), n_ = eL({
    desired: eA(e_(), ef()),
    active: eA(e_(), ef()),
    pending_restart: eh(),
    allocation_blocked: eh(),
    startup_error: ez([
        e_(),
        ey()
    ]),
    config_error: ez([
        e_(),
        ey()
    ])
}), nm = ez([
    ex("optical_on"),
    ex("optical_off"),
    ex("optical_status"),
    ex("optical_reload"),
    ex("optical_reinitialize"),
    ex("optical_shutdown")
]), nf = eL({
    enabled: eh(),
    downstream_tx_enabled: eh(),
    fec_enabled: eh()
}), ng = eL({
    desired_tx_enabled: eh(),
    desired_fec_enabled: eh(),
    register: ez([
        ef(),
        ey()
    ]),
    tx_enabled: ez([
        eh(),
        ey()
    ]),
    fec_enabled: ez([
        eh(),
        ey()
    ]),
    error: ez([
        e_(),
        ey()
    ])
}), nh = ez([
    ex("success"),
    ex("error")
]), nv = ez([
    ex("enabled"),
    ex("disabled"),
    ex("unknown")
]), ny = eL({
    settings: eE(nf),
    pon_mac: eE(ng),
    schema_version: ex(1),
    status: nh,
    action: nm,
    desired_enabled: ez([
        eh(),
        ey()
    ]),
    tx_enabled: ez([
        eh(),
        ey()
    ]),
    actor_state: nv,
    hardware_ready: eh(),
    discovery_active: eh(),
    cleanup_pending: eh(),
    error: ez([
        tO,
        ey()
    ])
}), nb = eL({
    model: e_(),
    wavelength_tx_nm: ef(),
    wavelength_rx_nm: ef(),
    phy_rate_downlink_gbps: ef(),
    phy_rate_uplink_gbps: ef(),
    tx_power_dbm: ez([
        ef(),
        ey()
    ]),
    laser_bias_current_ma: ez([
        ef(),
        ey()
    ]),
    temperature_celsius: ez([
        ef(),
        ey()
    ]),
    vcc_voltage: ez([
        ef(),
        ey()
    ]),
    cdr_locked: ez([
        eh(),
        ey()
    ]),
    tx_enabled: eE(eh()),
    measurements: eA(e_(), tz)
}), nw = ez([
    ex("o1_initial"),
    ex("o2_standby"),
    ex("o3_serial_number"),
    ex("o4_ranging"),
    ex("o5_operation"),
    ex("o6_intermittent_lods"),
    ex("o7_emergency_stop")
]), nS = eL({
    restarting: ex(!0)
}), nk = eL({
    calls: ef(),
    failures: ef(),
    last_us: ef(),
    max_us: ef(),
    total_us: ef()
}), nL = eL({
    port: ef(),
    interface: e_(),
    carrier: eh(),
    status: e_(),
    onu_id: eE(ef()),
    onu_sn: eE(e_()),
    link_state: e_(),
    reserved_sn: eE(e_())
}), nj = eL({
    channel_2g: ez([
        ef(),
        ey()
    ]),
    channel_5g: ez([
        ef(),
        ey()
    ]),
    bandwidth_5g: ez([
        e_(),
        ey()
    ]),
    tx_power_pct: ez([
        ef(),
        ey()
    ]),
    measurements: eA(e_(), tz)
}), nz = eL({
    onu_id: ef(),
    vendor: e_(),
    model: e_(),
    serial_number: e_(),
    state: nw,
    business_status: eU,
    management: ez([
        e7,
        ey()
    ]),
    provisioning: ez([
        tu,
        ey()
    ]),
    services: eS(te),
    ssids: eS(te),
    wifi_sync: tp,
    identity: ez([
        np,
        ey()
    ]),
    identity_age_seconds: ez([
        ef(),
        ey()
    ]),
    identity_current: eh(),
    fiber_distance_m: ez([
        ef(),
        ey()
    ]),
    ranging_delay_rtd_ns: ez([
        ef(),
        ey()
    ]),
    equalization_delay_bits: ez([
        ef(),
        ey()
    ]),
    optical_rx_power_dbm: ez([
        ef(),
        ey()
    ]),
    optical_tx_power_dbm: ez([
        ef(),
        ey()
    ]),
    firmware_version: e_(),
    hardware_version: e_(),
    uptime_seconds: ez([
        ef(),
        ey()
    ]),
    fec: eE(tC),
    data_path: tP,
    wifi_mesh: nj,
    connected_clients: ez([
        eS(t4),
        ey()
    ]),
    measurements: eA(e_(), tz)
}), nP = eL({
    id: e_(),
    last_seen_sec_ago: ef(),
    last_payload_bytes: ef()
}), nA = eL({
    ubus: eE(eA(e_(), nk)),
    jobs: eE(t2),
    onu_pinning: eE(n_),
    fpga_status: e_(),
    pon_mac: eE(ng),
    provisioning: ez([
        tb,
        ey()
    ]),
    optical_transceiver: nb,
    switch_ports: eS(nL),
    sub_gateways: eS(nz),
    telemetry_gateways: eS(nP),
    npu: eE(nu),
    ipc: eE(tK)
}), nC = ez([
    ex("plan"),
    ex("apply"),
    ex("management_plan"),
    ex("management_apply"),
    ex("reset_state"),
    ex("reconcile"),
    ex("retry")
]), nx = ez([
    eL({
        operation_ids: eS(ef()),
        revision: e_()
    }),
    eL({
        started: ex(!0),
        mode: tt
    }),
    eL({
        reset: ex(!0),
        device: e_()
    }),
    eL({
        operation_ids: eS(ef()),
        mode: tt,
        reconcile: eE(eh()),
        retry: eE(eh())
    }),
    eF
]);
eL({
    action: nC,
    target: e_(),
    management: eE(eh()),
    item: eE(e_())
});
let nN = eL({
    error: ez([
        e_(),
        eL({
            code: e_(),
            message: e_()
        })
    ])
});
class nE extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function nT(e) {
    let t = nN.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new nE("rpc", e) : new nE(e.code, e.message);
    }
    return e;
}
const nR = {
    parse (e) {
        let t = tW.parse(nT(e));
        if ("object" == typeof t && null !== t && "error" in t) throw nT(t), Error("Unexpected RPC error");
        return t;
    }
}, nI = {
    parse (e) {
        let t = nx.parse(nT(e));
        if ("error" in t) throw Error(t.error);
        return t;
    }
};
eA(e_(), eL({
    carrier: eE(eh()),
    mac: eE(e_()),
    link: eE(eL({
        speed: eE(ef()),
        duplex: eE(e_()),
        autoneg: eE(eh())
    })),
    stats: eE(eA(e_(), ef()))
}));
const nO = {
    getCapabilities: {
        parse: (e)=>eX.parse(nT(e))
    },
    opticalStatus: ny,
    opticalSet: ny,
    getStatus: {
        parse: (e)=>nA.parse(nT(e))
    },
    getSync: {
        parse: (e)=>tb.parse(nT(e))
    },
    configCheck: {
        parse (e) {
            if ("object" == typeof e && null !== e && "error" in e && ("valid" in e || "revision" in e || "devices" in e)) throw Error("Mixed configuration check result");
            return eY.parse(e);
        }
    },
    npuStatus: nu,
    configReload: {
        parse: (e)=>tb.parse(nT(e))
    },
    restartService: {
        parse: (e)=>nS.parse(nT(e))
    },
    sync: {
        parse: (e)=>nI.parse(nT(e))
    },
    npuSet: nc,
    mibStart: {
        parse: (e)=>t0.parse(nT(e))
    },
    mibResult: {
        parse: (e)=>tY.parse(nT(e))
    },
    jobRelease: {
        parse: (e)=>t1.parse(nT(e))
    },
    hl202List: {
        parse: (e)=>nR.parse(nT(e))
    },
    hl202Report: {
        parse: (e)=>t0.parse(nT(e))
    },
    hl202AccountsStart: {
        parse: (e)=>t0.parse(nT(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>t0.parse(nT(e))
    },
    hl202ExecStart: {
        parse: (e)=>t0.parse(nT(e))
    },
    jobResult: {
        parse: (e)=>tY.parse(nT(e))
    },
    getCalibration: {
        parse: (e)=>eG.parse(nT(e))
    },
    saveCalibration: {
        parse: (e)=>eB.parse(nT(e))
    },
    applyCalibration: {
        parse: (e)=>t0.parse(nT(e))
    }
};
function nV() {
    var e;
    let n, r, i, a, o, s, l, c, d, u, p, m, f, g, h, v, y, b, w, S, k, j, z;
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
            "enabled",
            "downstream_tx_enabled",
            "fec_enabled"
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
            "bridge",
            "wan_upstream",
            "wan_downstream",
            "onu_bridge"
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
    }), j = e.declare({
        object: "fttr",
        method: "save_calibration",
        params: [
            "data"
        ],
        reject: !0
    }), z = e.declare({
        object: "fttr",
        method: "apply_calibration",
        reject: !0
    }), {
        getCapabilities: async ()=>nO.getCapabilities.parse(await n()),
        opticalStatus: async ()=>nO.opticalStatus.parse(await r()),
        opticalSet: async (e)=>nO.opticalSet.parse(await i(e.enabled, e.downstream_tx_enabled, e.fec_enabled)),
        getStatus: async ()=>nO.getStatus.parse(await a()),
        getSync: async ()=>nO.getSync.parse(await o()),
        configCheck: async ()=>nO.configCheck.parse(await s()),
        npuStatus: async ()=>nO.npuStatus.parse(await l()),
        configReload: async ()=>nO.configReload.parse(await c()),
        restartService: async ()=>nO.restartService.parse(await d()),
        sync: async (e)=>nO.sync.parse(await u(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>nO.npuSet.parse(await p(e.enabled, e.bridge, e.wan_upstream, e.wan_downstream, e.onu_bridge)),
        mibStart: async (e)=>nO.mibStart.parse(await m(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>nO.mibResult.parse(await f(e.job, e.chunk)),
        jobRelease: async (e)=>nO.jobRelease.parse(await g(e.job)),
        hl202List: async ()=>nO.hl202List.parse(await h()),
        hl202Report: async (e)=>nO.hl202Report.parse(await v(e.target)),
        hl202AccountsStart: async (e)=>nO.hl202AccountsStart.parse(await y(e.target)),
        hl202AccountUpdate: async (e)=>nO.hl202AccountUpdate.parse(await b(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>nO.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>nO.jobResult.parse(await S(e.job, e.chunk)),
        getCalibration: async ()=>nO.getCalibration.parse(await k()),
        saveCalibration: async (e)=>nO.saveCalibration.parse(await j(e.data)),
        applyCalibration: async ()=>nO.applyCalibration.parse(await z())
    });
}
const n$ = async ()=>nV().getCapabilities(), nD = [
    "INTERNET",
    "OTHER",
    "IPTV",
    "VOIP"
];
function nM(e) {
    return Array.isArray(e) ? e.map(String) : String(e ?? "").split(/\s+/).filter(Boolean);
}
function nq() {
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
function nU(e) {
    return String(e.name || e.ssid || e.optical_sn || e[".name"]);
}
function nW(e, t) {
    return e.wifi.filter((e)=>e.template === t).map((e)=>[
            e[".name"],
            nU(e)
        ]);
}
function nZ(e) {
    let t = nq();
    if (t.group.some((t)=>t.template === e)) throw Error(_("Template is in use."));
    for (let n of t.wifi)n.template === e && nG(n[".name"]);
    for (let n of [
        ...t.network,
        ...t.wifi
    ])n.template === e && L.uci.remove("fttr", n[".name"]);
}
function nH(e) {
    if (nq().device.some((t)=>t.group === e)) throw Error(_("Group is used by devices. Reassign those devices before deleting it."));
}
function nG(e) {
    for (let t of nq().network){
        let n = nM(t.ssid);
        if (n.includes(e)) {
            let r = n.filter((t)=>t !== e);
            r.length ? L.uci.set("fttr", t[".name"], "ssid", r) : L.uci.unset("fttr", t[".name"], "ssid");
        }
    }
}
function nF(e, t) {
    let n = e?.vendor || e?.serial_number.slice(0, 4);
    return "HWTC" === n && (!t || t.has("hwtc")) ? "hwtc" : e?.model?.startsWith("HL202") && (!t || t.has("hl202")) ? "hl202" : ("STAR" === n || e?.model?.includes("SG631") || e?.serial_number.startsWith("STAR")) && (!t || t.has("star")) ? "star" : "generic";
}
function nB(e) {
    let t = nM(e);
    return t.length ? !!t.every((e)=>nD.includes(e)) || _("WAN Service List may only contain INTERNET, OTHER, IPTV, and VOIP.") : _("Select at least one WAN Service List label.");
}
function nK(e) {
    let t = [], n = new Set(e.template.map((e)=>e[".name"])), r = new Set(e.group.map((e)=>e[".name"])), i = new Map(e.wifi.map((e)=>[
            e[".name"],
            e
        ])), a = (e, n, r, i)=>{
        t.push({
            kind: e,
            sectionId: n[".name"],
            field: r,
            message: i
        });
    };
    for (let t of e.template)String(t.name || "").trim() || a("template", t, "name", _("Name is required."));
    for (let t of [
        "wifi",
        "network",
        "group"
    ])for (let r of e[t])n.has(String(r.template || "")) || a(t, r, "template", _("Select an existing template."));
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
        let e = nB(t.service_list);
        for (let [n, r] of (!0 !== e && a("network", t, "service_list", e), [
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
            (!/^\d+$/.test(e) || Number(e) > r) && a("network", t, n, _("Value is outside the allowed range."));
        }
        for (let e of nM(t.ssid)){
            let n = i.get(e);
            n && n.template === t.template || a("network", t, "ssid", _("Select SSIDs belonging to this network's template."));
        }
    }
    for (let t of e.device)r.has(String(t.group || "")) || a("device", t, "group", _("Select an existing group."));
    return t;
}
function nJ(e, t) {
    return e.children.find((e)=>e.subsection?.sectiontype === t)?.subsection;
}
function nQ(e) {
    return ({
        device: _("Device"),
        group: _("Group"),
        template: _("Template"),
        wifi: _("SSID"),
        network: _("Network")
    })[e];
}
async function nX(e, t) {
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
function nY(e, t) {
    var n, r, i;
    let a = function(e) {
        let t = new Map();
        for (let n of nK(e)){
            let r = `${n.kind}/${n.sectionId}`, i = t.get(r);
            if (!i) {
                let a = e[n.kind].find((e)=>e[".name"] === n.sectionId);
                if (!a) continue;
                i = {
                    kind: n.kind,
                    sectionId: n.sectionId,
                    row: a,
                    issues: []
                }, t.set(r, i);
            }
            i.issues.some((e)=>e.field === n.field && e.message === n.message) || i.issues.push(n);
        }
        return [
            ...t.values()
        ];
    }(nq());
    L.ui.showModal(_("Review and repair configuration"), (i = {
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
                var r, i, a, l, c;
                return c = {
                    class: "cbi-section",
                    children: [
                        (i = {
                            children: [
                                nQ(n.kind),
                                ": ",
                                nU(n.row),
                                " ",
                                (r = {
                                    children: s("code", {
                                        children: n.sectionId
                                    })
                                }, s("small", r))
                            ]
                        }, s("h4", i)),
                        (a = {
                            children: n.issues.map((e)=>{
                                var t, r, i;
                                return i = {
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
                                        ].includes(e.field) && nM(n.row[e.field]).length ? (r = {
                                            children: [
                                                " ",
                                                s("code", {
                                                    children: nM(n.row[e.field]).join(", ")
                                                })
                                            ]
                                        }, s(o, r)) : null
                                    ]
                                }, s("li", i);
                            })
                        }, s("ul", a)),
                        s("button", {
                            class: "cbi-button cbi-button-action",
                            type: "button",
                            disabled: !L.hasViewPermission(),
                            onclick: (t)=>nX(t, async ()=>{
                                    if (!L.hasViewPermission()) return;
                                    let t = nJ(e, n.kind);
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
                                var r, i, a;
                                L.ui.showModal(_("Delete this configuration?"), (a = {
                                    children: [
                                        (r = {
                                            children: [
                                                s("strong", {
                                                    children: [
                                                        nQ(n.kind),
                                                        ": ",
                                                        nU(n.row)
                                                    ]
                                                }),
                                                " ",
                                                s("code", {
                                                    children: n.sectionId
                                                })
                                            ]
                                        }, s("p", r)),
                                        s("p", {
                                            children: "template" === n.kind ? _("This also deletes the template's SSIDs and networks. Templates used by groups cannot be deleted.") : "device" === n.kind ? _("This removes the device's FTTR configuration and stops managing it. It does not delete the physical device.") : _("This removes the selected configuration entry. Existing reference checks and binding cleanup still apply.")
                                        }),
                                        (i = {
                                            class: "right",
                                            children: [
                                                s("button", {
                                                    class: "cbi-button",
                                                    type: "button",
                                                    onclick: ()=>nY(e, t),
                                                    children: _("Cancel")
                                                }),
                                                " ",
                                                s("button", {
                                                    class: "cbi-button cbi-button-negative",
                                                    type: "button",
                                                    disabled: !L.hasViewPermission(),
                                                    onclick: (r)=>nX(r, async ()=>{
                                                            if (!L.hasViewPermission()) return;
                                                            let i = nJ(e, n.kind);
                                                            if (!i) throw Error(_("Configuration editor is unavailable."));
                                                            await i.handleRemove(n.sectionId, r), nY(e, t);
                                                        }),
                                                    children: _("Delete this configuration")
                                                })
                                            ]
                                        }, s("div", i))
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
            (r = {
                class: "right",
                children: s("button", {
                    class: "cbi-button",
                    type: "button",
                    onclick: ()=>L.ui.hideModal(),
                    children: _("Close")
                })
            }, s("div", r))
        ]
    }, s("div", i)));
}
L.rpc.declare({
    object: "luci-rpc",
    method: "getNetworkDevices",
    expect: {
        "": {}
    },
    reject: !0
});
const n0 = async ()=>nV().getStatus(), n1 = async ()=>nV().configCheck(), n2 = async ()=>nV().configReload(), n4 = async ()=>nV().restartService();
let n5 = L.view, n6 = L.uci, n3 = L.form;
async function n7(e, t, n) {
    try {
        let r = await e();
        t.textContent = JSON.stringify(r, null, 2), n?.(r);
    } catch (e) {
        t.textContent = String(e), n?.({
            error: String(e)
        });
    }
}
let main = n5.extend({
    async load () {
        let e = await n$();
        if (!e.pages.config) throw Error(_("This page is not supported by the installed FTTR build."));
        await n6.load("fttr"), n6.sections("fttr", "provisioning").length || n6.add("fttr", "provisioning", "provisioning"), n6.sections("fttr", "management").length || n6.add("fttr", "management", "management");
        let [t, n] = await Promise.all([
            n1().catch((e)=>({
                    error: String(e)
                })),
            n0().catch((e)=>({
                    error: String(e),
                    sub_gateways: []
                }))
        ]);
        return {
            error: ("error" in t ? t.error : void 0) || ("error" in n ? n.error : void 0),
            connectedDevices: n.sub_gateways,
            pinning: "onu_pinning" in n ? n.onu_pinning : void 0,
            capabilities: e
        };
    },
    render (e) {
        var t, n, r, i, a;
        let o, b, w, S, k, j = new n3.Map("fttr", _("FTTR configuration")), z = j.section(n3.NamedSection, "acs", "acs");
        z.addremove = !1, z.anonymous = !1;
        let P = n6.sections("fttr", "provisioning")[0]?.[".name"] ?? "provisioning";
        (function(e, t, n) {
            e.tab("basic", t);
            let r = e.taboption("basic", L.form.SectionValue, "_acs", L.form.NamedSection, "acs", "acs").subsection;
            r.addremove = !1, r.anonymous = !1;
            let i = c(r, L.form.Flag, "enabled", _("Enable ACS"));
            i.default = "1", i.rmempty = !1, (i = c(r, L.form.Value, "port", _("Listen port"), "port")).default = "7547", i.rmempty = !1, (i = c(r, L.form.Value, "path", _("CWMP path"))).default = "/cwmp", i.rmempty = !1, i.validate = (e, t)=>!!t.startsWith("/") || _("The path must start with '/'."), (i = c(r, L.form.Value, "state_file", _("ACS state file"))).default = "/var/lib/fttr/acs-state.json", i.rmempty = !1, i.validate = (e, t)=>!!t.startsWith("/") || _("The state file path must be absolute."), (i = c(r, L.form.Value, "username", _("HTTP Basic username"))).optional = !0, i.rmempty = !0, (i = c(r, L.form.Value, "password", _("HTTP Basic password"))).password = !0, i.optional = !0, i.rmempty = !0;
            let a = e.taboption("basic", L.form.SectionValue, "_management", L.form.NamedSection, "management", "management").subsection;
            a.addremove = !1, (i = c(a, L.form.Flag, "enabled", _("Enable management network"))).default = "1", i.rmempty = !1, (i = u(a, "mode", _("Management application mode"), [
                [
                    "manual",
                    _("Manual")
                ],
                [
                    "auto",
                    _("Automatic")
                ]
            ])).default = "auto", i.rmempty = !1, i.description = _("Manual mode only discovers and plans. Use Apply management configuration on the Synchronization page to create or update the isolated network, ACS listener and child TR069 settings."), (i = c(a, L.form.Value, "address", _("Management IPv4 address/prefix"), "cidr4")).default = "192.168.46.1/24", i.rmempty = !1, i.description = _("The local ACS binds to this address. The child ACS URL is generated from this address, the ACS port and CWMP path."), (i = c(a, L.form.DummyValue, "_generated_acs_url", _("Generated ACS URL"))).cfgvalue = ()=>{
                let t = e.map.data, n = String(t.get("fttr", "management", "address") || "192.168.46.1/24").split("/")[0];
                return `http://${n}:${t.get("fttr", "acs", "port") || "7547"}${t.get("fttr", "acs", "path") || "/cwmp"}`;
            }, (i = c(a, L.form.DynamicList, "vlan", _("TR069 VLANs"), "range(1,4094)")).default = [
                "46"
            ], i.rmempty = !1, i.description = _("All listed VLANs share one management bridge and DHCP pool. Retain an existing listed management VLAN; the first VLAN is the fallback."), i.validate = (e, t)=>!!("" === t || /^\d+$/.test(t) && Number(t) >= 1 && 4094 >= Number(t)) || _("Enter a VLAN ID in 1\u20134094.");
            let o = i.parse;
            for (let [e, t, n] of (i.parse = function(e) {
                let t = this.formvalue(e) || [];
                return t.length ? new Set(t.map(Number)).size !== t.length ? Promise.reject(Error(_("Duplicate VLAN IDs are not allowed."))) : o.call(this, e) : Promise.reject(Error(_("Enter at least one VLAN ID in 1\u20134094.")));
            }, (i = c(a, L.form.Value, "priority", _("Priority"), "range(0,7)")).default = "0", i.rmempty = !1, (i = c(a, L.form.Flag, "dhcp_enabled", _("Enable management DHCP"))).default = "1", i.rmempty = !1, [
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
            ]))(i = c(a, L.form.Value, e, t)).default = n, i.rmempty = !1, i.depends("dhcp_enabled", "1");
            let s = e.taboption("basic", L.form.SectionValue, "_policy", L.form.NamedSection, n, "provisioning").subsection;
            for (let [e, t] of (s.addremove = !1, s.anonymous = !1, (i = c(s, L.form.Flag, "enabled", _("Enable provisioning"))).default = "1", i.rmempty = !1, (i = c(s, L.form.Flag, "allow_unsupported_as_bridge", _("Allow unsupported ONUs as bridge"))).default = "1", i.rmempty = !1, i.description = _("Automatically provision standard G.988 transparent Layer 2 bridge for unrecognized or third-party GPON ONUs in O5 state."), (i = u(s, "mode", _("Synchronization mode"), [
                [
                    "auto",
                    _("Automatic")
                ],
                [
                    "manual",
                    _("Manual")
                ]
            ])).default = "auto", i.description = _("Manual mode only saves configuration; use Apply differences on the Synchronization page to send it to devices. Automatic mode synchronizes after Save & Apply when Configuration changed is selected."), i = c(s, L.form.MultiValue, "trigger", _("Automatic triggers")), [
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
            ]))i.value(e, t);
            i.default = [
                "config_change",
                "device_online",
                "cwmp_boot",
                "program_start",
                "periodic"
            ], i.retain = !0, i.depends("mode", "auto"), (i = c(s, L.form.Value, "interval_minutes", _("Periodic synchronization interval (minutes)"))).default = "30", i.retain = !0, i.depends("mode", "auto"), i.validate = (e, t)=>!!(/^(0|[1-9][0-9]*)$/.test(t) && (0 === Number(t) || Number(t) >= 1 && 1440 >= Number(t))) || _("Use 0 to disable, or 1\u20131440 minutes."), (i = c(s, L.form.Value, "freshness", _("CWMP freshness (seconds)"), "range(1,86400)")).default = "180";
        })(z, _("Basic"), P), t = e.connectedDevices ?? [], n = e.pinning, r = e.capabilities, o = new Map(t.map((e)=>[
                e.serial_number,
                e
            ])), w = new Set((b = (r?.adapters ?? []).map((e)=>[
                e.id,
                "generic" === e.id ? _("Generic G.988 Bridge") : e.name
            ])).map((e)=>{
            let [t] = e;
            return t;
        })), S = (e)=>{
            let t = o.get(e), n = L.uci.sections("fttr", "device").find((t)=>t.optical_sn === e), r = t?.model || String(n?.adapter || _("Unknown model"));
            return `${r} \xb7 ${e} \xb7 ${t?.state === "o5_operation" ? _("Connected") : _("Offline")}${t?.onu_id != null ? ` \xb7 ONU ${t.onu_id}` : ""}`;
        }, z.tab("devices", _("Devices & groups")), y(g(z, "devices", "_groups", "group", _("Groups"), (e)=>{
            h(e, "_name", _("Group"), (e)=>String(L.uci.get("fttr", e, "name") || e)), c(e, L.form.Value, "name", _("Name")).modalonly = !0, m(e, "template", _("Template"), "template").modalonly = !0;
        }), nH), g(z, "devices", "_devices", "device", _("Devices"), (e)=>{
            h(e, "_device", _("Device"), (e)=>{
                let t = String(L.uci.get("fttr", e, "optical_sn") || "");
                return t ? S(t) : _("New device");
            }), h(e, "_active_pin", _("Active allocation"), (e)=>{
                let r = String(L.uci.get("fttr", e, "optical_sn") || ""), i = n?.active[r.toUpperCase()], a = t.find((e)=>e.serial_number.toUpperCase() === r.toUpperCase())?.onu_id, o = L.uci.get("fttr", e, "onu_id"), s = (null == o || "" === o ? void 0 : Number(o)) !== i;
                return [
                    null != a ? `fttr${a + 1}` : _("Not registered"),
                    null != i ? `${_("Reserved")}: fttr${i + 1}` : _("Automatic allocation"),
                    s ? _("Pending restart") : ""
                ].filter(Boolean).join(" \xb7 ");
            }), e.tab("general", _("General Settings")), e.tab("cwmp", _("CWMP Settings")), e.tab("advanced", _("Advanced Settings"));
            let r = d(e, "general", L.form.ListValue, "optical_sn", _("Connected device"));
            r.modalonly = !0, r.rmempty = !1, r.description = _("Lists supported devices registered on the optical link, including devices that have not sent an ACS Inform. Devices already configured are omitted when adding a new device.");
            let i = r.renderWidget;
            r.renderWidget = function(e, n, r) {
                this.keylist = [], this.vallist = [];
                let a = String(L.uci.get("fttr", e, "optical_sn") || ""), o = new Set(L.uci.sections("fttr", "device").filter((t)=>t[".name"] !== e).map((e)=>e.optical_sn));
                for (let e of t)"o5_operation" === e.state && nF(e, w) && !o.has(e.serial_number) && this.value(e.serial_number, S(e.serial_number));
                a && !this.keylist.includes(a) && this.value(a, S(a));
                let s = r || a || this.keylist[0] || "";
                return i.call(this, e, n, s);
            }, r.onchange = (e, t, n)=>{
                let r = nF(o.get(n), w);
                a.getUIElement(t)?.setValue(r);
            }, r.validate = (e, t)=>t ? !L.uci.sections("fttr", "device").some((n)=>n[".name"] !== e && n.optical_sn === t) || _("Device already configured.") : _("Select device."), r.write = (e, t)=>{
                L.uci.set("fttr", e, "optical_sn", t);
                let n = nF(o.get(t), w);
                L.uci.get("fttr", e, "adapter") || L.uci.set("fttr", e, "adapter", n);
            };
            let a = p(e, "general", "adapter", _("Device adapter"), b);
            a.modalonly = !0, a.default = "generic", a.rmempty = !1;
            let c = a.renderWidget;
            a.renderWidget = function(e, t, n) {
                let r = String(L.uci.get("fttr", e, "optical_sn") || ""), i = nF(o.get(r), w), a = n || L.uci.get("fttr", e, "adapter") || i;
                return a && !this.keylist.includes(a) && this.value(a, a), c.call(this, e, t, a);
            }, a.write = (e, t)=>{
                let n = String(L.uci.get("fttr", e, "optical_sn") || ""), r = nF(o.get(n), w);
                L.uci.set("fttr", e, "adapter", t || r || "generic");
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
            u.modalonly = !0, u.retain = !0, u.depends("adapter", "hl202"), u.description = _("HL202 defaults to native command provisioning with readback verification. Builds without MQTT use ACS. Transport failures require reconciliation and do not switch to ACS automatically."), function(e, t, n, r, i) {
                let a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5], o = d(e, t, l.RichListValue, n, r);
                return o.rmempty = a, o.optional = a, o.default = "", f(o, ()=>[
                        ...a ? [
                            [
                                "",
                                _("None")
                            ]
                        ] : [],
                        ...L.uci.sections("fttr", i).map((e)=>[
                                e[".name"],
                                String(e.name || e.ssid || e.optical_sn || e[".name"])
                            ])
                    ]), o.validate = (e, t)=>!!(a && !t || L.uci.sections("fttr", i).some((e)=>e[".name"] === t)) || _("Select an existing item."), o;
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
                let i = String(r.formvalue(n) ?? L.uci.get("fttr", n, "optical_sn") ?? ""), a = t.find((e)=>e.serial_number.toUpperCase() === i.toUpperCase());
                a?.state !== "o5_operation" || null == a.onu_id ? L.ui.addNotification(null, s("p", {
                    children: _("Select a registered O5 device first.")
                }), "warning") : m.getUIElement(n)?.setValue(String(a.onu_id));
            }, m.validate = (e, t)=>!t || (/^(?:[0-9]|1[0-5])$/.test(t) ? !L.uci.sections("fttr", "device").some((n)=>{
                    if (n[".name"] === e) return !1;
                    let r = m.formvalue(n[".name"]) ?? n.onu_id;
                    return null != r && String(r) === t;
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
            let j = d(e, "cwmp", L.form.Value, "connection_request_username", _("CPE Connection Request username"));
            j.modalonly = !0, j.optional = !0, j.rmempty = !0, j.retain = !0, j.depends({
                connection_request: "1",
                connection_request_defaults: "0"
            }), j.description = _("Enter this CPE's existing Connection Request credentials, not the ACS inbound HTTP Basic credentials. No custom credential defaults are assumed.");
            let z = d(e, "cwmp", L.form.Value, "connection_request_password", _("CPE Connection Request password"));
            z.modalonly = !0, z.password = !0, z.optional = !0, z.rmempty = !0, z.retain = !0, z.depends({
                connection_request: "1",
                connection_request_defaults: "0"
            }), z.description = _("Saved custom values are retained when Connection Requests are disabled or backend defaults are selected. Leave these fields unchanged to preserve their saved values.");
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
        }), z.tab("templates", _("Templates")), y(g(z, "templates", "_templates", "template", _("Templates"), (e)=>{
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
        }), nZ), z.tab("wifi", _("SSIDs")), y(g(z, "wifi", "_wifi", "wifi", _("SSIDs"), (e)=>{
            e.description = _("Create SSIDs here before selecting them in a network. Every SSID belongs to one template.");
            let t = v(e), n = t.validate;
            t.validate = function(e, t) {
                let r = n.call(this, e, t);
                return !0 !== r ? r : !nq().network.some((n)=>nM(n.ssid).includes(e) && n.template !== t) || _("This SSID is bound to a network. Remove its network bindings before changing the template.");
            }, h(e, "_ssid", _("SSID"), (e)=>String(L.uci.get("fttr", e, "ssid") || e)), h(e, "_radio", _("Band"), (e)=>"2g" === L.uci.get("fttr", e, "radio") ? "2.4 GHz" : "5 GHz"), h(e, "_security", _("Security"), (e)=>{
                let t = String(L.uci.get("fttr", e, "security") || "");
                return "none" === t ? _("None (Open)") : t || _("Keep current key");
            });
            let r = c(e, L.form.Value, "ssid", _("SSID"));
            r.modalonly = !0, r.rmempty = !1, r.validate = (e, t)=>new TextEncoder().encode(t).length >= 1 && new TextEncoder().encode(t).length <= 32 || _("SSID must be 1\u201332 bytes.");
            let i = u(e, "radio", _("Band"), [
                [
                    "2g",
                    "2.4 GHz"
                ],
                [
                    "5g",
                    "5 GHz"
                ]
            ]);
            i.modalonly = !0, i.default = "2g", u(e, "security", _("Security"), [
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
        }), nG), z.tab("networks", _("Networks")), g(z, "networks", "_networks", "network", _("Networks"), (e)=>{
            e.description = _("Networks bind VLAN services to wired ports and optional SSIDs within one template.");
            let t = v(e);
            h(e, "_name", _("Network"), (e)=>String(L.uci.get("fttr", e, "name") || _("New network"))), h(e, "_vlan", _("VLAN"), (e)=>String(L.uci.get("fttr", e, "vlan") || "0")), h(e, "_services", _("WAN Service List (multi-select)"), (e)=>nM(L.uci.get("fttr", e, "service_list")).join(", ")), h(e, "_bindings", _("LAN / WLAN port bindings"), (e)=>[
                    ...nM(L.uci.get("fttr", e, "port")).map((e)=>e.toUpperCase()),
                    ...nM(L.uci.get("fttr", e, "ssid")).map((e)=>String(L.uci.get("fttr", e, "ssid") || e))
                ].join(", "));
            let n = c(e, L.form.Value, "name", _("Name"));
            n.modalonly = !0, n.rmempty = !1;
            let r = c(e, L.form.MultiValue, "service_list", _("WAN Service List (multi-select)"));
            for (let e of (r.modalonly = !0, r.rmempty = !1, r.validate = (e, t)=>nB(t), r.description = _("Select at least one of INTERNET, OTHER, IPTV, and VOIP for each custom VLAN. TR069 is reserved for OMCI."), nD))r.value(e, e);
            for (let [t, n, r] of [
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
                let i = c(e, L.form.Value, t, n, r);
                i.default = "0", i.rmempty = !1, i.modalonly = !0;
            }
            let i = c(e, L.form.MultiValue, "ssid", _("SSIDs"));
            i.modalonly = !0, i.rmempty = !0, i.placeholder = _("No SSIDs selected"), i.description = _("Optional for wired-only networks. Only SSIDs from the selected template are listed. Changing the template clears the SSID selection."), f(i, function(e) {
                let t = this.section.getOption("template");
                return nW(nq(), String(t?.formvalue(e) ?? L.uci.get("fttr", e, "template") ?? ""));
            }), i.validate = function(e, t) {
                let n = String(this.section.getOption("template").formvalue(e) ?? L.uci.get("fttr", e, "template") ?? ""), r = new Set(nW(nq(), n).map((e)=>{
                    let [t] = e;
                    return t;
                }));
                return !!nM(t).every((e)=>r.has(e)) || _("Select SSIDs belonging to this network's template.");
            }, t.onchange = function(e, t, n) {
                let r = this.section.getOption("ssid").getUIElement(t);
                if (!r) return;
                let i = nW(nq(), n);
                r.clearChoices(!0), r.addChoices(i.map((e)=>{
                    let [t] = e;
                    return t;
                }), Object.fromEntries(i));
            };
            let a = c(e, L.form.MultiValue, "port", _("Ports"));
            a.modalonly = !0;
            for(let e = 1; e <= 4; e++)a.value(`lan${e}`, `LAN${e}`);
        }), this.handleSave = ()=>j.save(()=>{
                let e = nq(), t = nK(e);
                if (t.length) throw Error(t.map((t)=>{
                    let n = e[t.kind].find((e)=>e[".name"] === t.sectionId), r = e.template.find((e)=>e[".name"] === n?.template), i = [
                        r && nU(r),
                        n ? nU(n) : t.sectionId
                    ].filter(Boolean).join(" / ");
                    return `${i} [${t.sectionId}.${t.field}]: ${t.message}`;
                }).join("\n"));
                L.uci.unset("fttr", "acs", "listen"), L.uci.unset("fttr", "management", "acs_url");
            });
        let A = s("pre", {
            style: "white-space:pre-wrap;overflow-wrap:anywhere",
            "aria-live": "polite"
        }), C = null, x = (e)=>{
            var t;
            k = "error" in e ? e.error : void 0, C?.parentNode?.removeChild(C), C = null, k && (C = L.ui.addNotification(_("FTTR configuration check failed"), (t = {
                children: [
                    s("p", {
                        children: k
                    }),
                    s("button", {
                        class: "cbi-button cbi-button-action",
                        type: "button",
                        onclick: ()=>nY(z, k),
                        children: _("Review and repair configuration")
                    })
                ]
            }, s("div", t)), "error"));
        };
        x(e);
        let N = (a = {
            class: "cbi-section",
            children: [
                (i = {
                    children: [
                        _("Saving configuration does not synchronize devices in Manual mode. After Save & Apply, open Synchronization and choose Apply differences. Preview differences is read-only."),
                        " ",
                        s("a", {
                            href: L.url("admin", "network", "fttr", "sync"),
                            children: _("Open Synchronization")
                        })
                    ]
                }, s("p", i)),
                s("h3", {
                    children: _("Configuration diagnostics")
                }),
                s("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    onclick: ()=>nY(z, k),
                    children: _("Review and repair configuration")
                }),
                " ",
                s("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    onclick: ()=>n7(n1, A, x),
                    children: _("Check")
                }),
                " ",
                s("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    disabled: !L.hasViewPermission(),
                    onclick: ()=>n7(async ()=>(await n2(), await n1()), A, x),
                    children: _("Reload")
                }),
                " ",
                s("button", {
                    class: "cbi-button cbi-button-negative",
                    type: "button",
                    disabled: !L.hasViewPermission(),
                    onclick: ()=>n7(n4, A),
                    children: _("Restart")
                }),
                A
            ]
        }, s("div", a));
        return z.tab("diagnostics", _("Configuration diagnostics")), z.taboption("diagnostics", n3.DummyValue, "_diagnostics", "").render = ()=>Promise.resolve(N), j.render();
    }
});

return main;