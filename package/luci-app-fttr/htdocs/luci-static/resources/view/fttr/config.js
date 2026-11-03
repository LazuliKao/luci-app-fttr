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
function j(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function z(e) {
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const P = Symbol("evaluating");
function A(e, t, n) {
    let i;
    Object.defineProperty(e, t, {
        get () {
            if (i !== P) return void 0 === i && (i = P, i = n()), i;
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
    let i = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (i.message = O(e.inst?._zod.def?.error?.(e)) ?? O(t?.error?.(e)) ?? O(n.customError?.(e)) ?? O(n.localeError?.(e)) ?? "Invalid input"), delete i.inst, delete i.continue, t?.reportInput || delete i.input, i;
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
}), q = (n = M, (e, t, i, r)=>{
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
        let e = new (r?.Err ?? n)(o.issues.map((e)=>V(e, a, k())));
        throw C(e, r?.callee), e;
    }
    return o.value;
}), U = (i = M, async (e, t, n, r)=>{
    let a = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, a);
    if (o instanceof Promise && (o = await o), o.issues.length) {
        let e = new (r?.Err ?? i)(o.issues.map((e)=>V(e, a, k())));
        throw C(e, r?.callee), e;
    }
    return o.value;
}), W = (r = M, (e, t, n)=>{
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
        error: new (r ?? D)(a.issues.map((e)=>V(e, i, k())))
    } : {
        success: !0,
        data: a.value
    };
}), Z = (a = M, async (e, t, n)=>{
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
        error: new a(r.issues.map((e)=>V(e, i, k())))
    } : {
        success: !0,
        data: r.value
    };
}), H = /^-?\d+(?:\.\d+)?$/, G = /^(?:true|false)$/i, F = /^null$/i, B = {
    major: 4,
    minor: 3,
    patch: 6
}, K = b("$ZodType", (e, t)=>{
    var n;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = B;
    let i = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && i.unshift(e), i))for (let n of t._zod.onattach)n(e);
    if (0 === i.length) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, n)=>{
            let i, r = R(e);
            for (let a of t){
                if (a._zod.def.when) {
                    if (!a._zod.def.when(e)) continue;
                } else if (r) continue;
                let t = e.issues.length, o = a._zod.check(e);
                if (o instanceof Promise && n?.async === !1) throw new w();
                if (i || o instanceof Promise) i = (i ?? Promise.resolve()).then(async ()=>{
                    await o, e.issues.length !== t && (r || (r = R(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    r || (r = R(e, t));
                }
            }
            return i ? i.then(()=>e) : e;
        }, n = (n, r, a)=>{
            if (R(n)) return n.aborted = !0, n;
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
    let i;
    K.init(e, t), e._zod.pattern = [
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
}), Q = b("$ZodNumber", (e, t)=>{
    K.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? H, e._zod.parse = (n, i)=>{
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
}), X = b("$ZodBoolean", (e, t)=>{
    K.init(e, t), e._zod.pattern = G, e._zod.parse = (n, i)=>{
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
}), Y = b("$ZodNull", (e, t)=>{
    K.init(e, t), e._zod.pattern = F, e._zod.values = new Set([
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
}), ee = b("$ZodUnknown", (e, t)=>{
    K.init(e, t), e._zod.parse = (e)=>e;
});
function et(e, t, n) {
    e.issues.length && t.issues.push(...I(n, e.issues)), t.value[n] = e.value;
}
const en = b("$ZodArray", (e, t)=>{
    K.init(e, t), e._zod.parse = (n, i)=>{
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
            s instanceof Promise ? a.push(s.then((t)=>et(t, n, e))) : et(s, n, e);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
});
function ei(e, t, n, i, r) {
    if (e.issues.length) {
        if (r && !(n in i)) return;
        t.issues.push(...I(n, e.issues));
    }
    void 0 === e.value ? n in i && (t.value[n] = void 0) : t.value[n] = e.value;
}
const er = b("$ZodObject", (e, t)=>{
    var n;
    let i;
    K.init(e, t);
    let r = Object.getOwnPropertyDescriptor(t, "shape");
    if (!r?.get) {
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
            let i = Object.keys(t = e.shape).filter((e)=>"optional" === t[e]._zod.optin && "optional" === t[e]._zod.optout);
            return {
                ...e,
                keys: n,
                keySet: new Set(n),
                numKeys: n.length,
                optionalKeys: new Set(i)
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
            let i = e[t]._zod;
            if (i.values) for (let e of (n[t] ?? (n[t] = new Set()), i.values))n[t].add(e);
        }
        return n;
    });
    let o = t.catchall;
    e._zod.parse = (t, n)=>{
        i ?? (i = a.value);
        let r = t.value;
        if (!x(r)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: r,
            inst: e
        }), t;
        t.value = {};
        let s = [], l = i.shape;
        for (let e of i.keys){
            let i = l[e], a = "optional" === i._zod.optout, o = i._zod.run({
                value: r[e],
                issues: []
            }, n);
            o instanceof Promise ? s.push(o.then((n)=>ei(n, t, e, r, a))) : ei(o, t, e, r, a);
        }
        return o ? function(e, t, n, i, r, a) {
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
                a instanceof Promise ? e.push(a.then((e)=>ei(e, n, r, t, d))) : ei(a, n, r, t, d);
            }
            return (o.length && n.issues.push({
                code: "unrecognized_keys",
                keys: o,
                input: t,
                inst: a
            }), e.length) ? Promise.all(e).then(()=>n) : n;
        }(s, r, t, n, a.value, e) : s.length ? Promise.all(s).then(()=>t) : t;
    };
});
function ea(e, t, n, i) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let r = e.filter((e)=>!R(e));
    return 1 === r.length ? (t.value = r[0].value, r[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>V(e, i, k())))
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
        return o ? Promise.all(s).then((t)=>ea(t, r, e, a)) : ea(s, r, e, a);
    };
}), es = b("$ZodRecord", (e, t)=>{
    K.init(e, t), e._zod.parse = (n, i)=>{
        let r = n.value;
        if (!function(e) {
            if (!1 === x(e)) return !1;
            let t = e.constructor;
            if (void 0 === t || "function" != typeof t) return !0;
            let n = t.prototype;
            return !1 !== x(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
        }(r)) return n.issues.push({
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
                    t.issues.length && n.issues.push(...I(e, t.issues)), n.value[e] = t.value;
                })) : (o.issues.length && n.issues.push(...I(e, o.issues)), n.value[e] = o.value);
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
            if ("string" == typeof o && H.test(o) && s.issues.length) {
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
                    issues: s.issues.map((e)=>V(e, i, k())),
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
                e.issues.length && n.issues.push(...I(o, e.issues)), n.value[s.value] = e.value;
            })) : (l.issues.length && n.issues.push(...I(o, l.issues)), n.value[s.value] = l.value);
        }
        return a.length ? Promise.all(a).then(()=>n) : n;
    };
}), el = b("$ZodLiteral", (e, t)=>{
    if (K.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? N(e) : e ? N(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (i, r)=>{
        let a = i.value;
        return n.has(a) || i.issues.push({
            code: "invalid_value",
            values: t.values,
            input: a,
            inst: e
        }), i;
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
            let i = t.innerType._zod.run(e, n);
            return i instanceof Promise ? i.then((t)=>ec(t, e.value)) : ec(i, e.value);
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
        let i;
        return i = new e._zod.constr(t ?? e._zod.def), (!t || n?.parent) && (i._zod.parent = e), i;
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
    er.init(e, t), eu.init(e, t), A(e, "shape", ()=>t.shape);
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
    "device-zte": eh()
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
    ex("auto"),
    ex("manual")
]), e1 = ex("diff"), e2 = eL({
    state: e_(),
    enabled: eh(),
    reason: eE(ez([
        e_(),
        ey()
    ])),
    revision: eE(e_()),
    vlan: eE(ef()),
    updated_at: eE(ef())
}), e4 = ez([
    ex("online"),
    ex("waiting_inform"),
    ex("offline_or_stale"),
    ex("waiting_transport")
]), e5 = eL({
    cwmp_id: e_(),
    state: e4,
    optical_online: eh(),
    last_inform: ez([
        ef(),
        ey()
    ]),
    age_seconds: ez([
        ef(),
        ey()
    ])
}), e6 = ez([
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
]), e3 = ez([
    ex("device_service"),
    ex("ssid"),
    ex("port_binding"),
    ex("wan_activation")
]), e7 = eL({
    name: e_(),
    desired: e_()
}), e9 = eL({
    id: e_(),
    name: eE(ez([
        e_(),
        ey()
    ])),
    kind: e3,
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
    changes: eE(eS(e7))
}), e8 = ez([
    ex("plan"),
    ex("apply")
]), te = eL({
    wan: e_(),
    wlan: e_(),
    binding: e_()
}), tt = eL({
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
        te,
        ey()
    ])
}), tn = eL({
    parent: ef(),
    connection: ef(),
    state: e_(),
    service_list: e_(),
    kind: e_(),
    baseline: ez([
        eS(ef()),
        ey()
    ])
}), ti = eL({
    state: e_(),
    reason: eE(e_()),
    task_id: eE(ez([
        ef(),
        ey()
    ])),
    instance: eE(ef()),
    cwmp_id: eE(e_())
}), tr = ez([
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
]), ta = eL({
    owned: eS(ef()),
    pending: ez([
        e_(),
        ey()
    ]),
    pending_instance: ez([
        ef(),
        ey()
    ])
}), to = ez([
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
]), ts = ez([
    ex("disable"),
    ex("preserve"),
    ex("delete")
]), tl = eL({
    parent: ef(),
    child: ef(),
    service: e_(),
    vlan: e_()
}), tc = eL({
    state: e6,
    items: eS(e9),
    backend: eE(eq),
    operation_id: eE(ef()),
    device: eE(e_()),
    optical_sn: eE(e_()),
    cwmp_id: eE(e_()),
    revision: eE(e_()),
    mode: eE(e8),
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
    cwmp_contract: eE(tt),
    wan_objects: eE(eA(e_(), tn)),
    wan_lifecycle: eE(eA(e_(), ti)),
    wan_stage: eE(tr),
    wifi_objects: eE(ta),
    wifi_lifecycle: eE(eA(e_(), ti)),
    wifi_stage: eE(to),
    wifi_cleanup: eE(ts),
    native_ownership: eE(eA(e_(), tl)),
    write_performed: eE(eh()),
    readback_verified: eE(eh())
}), td = ez([
    ex("not_configured"),
    ex("stale_revision"),
    ex("stale_management"),
    ex("verified"),
    ex("attention_required"),
    ex("accepted_unverified"),
    ex("pending"),
    ex("recovering"),
    ex("waiting_management")
]), tu = eL({
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
    omci_management: e2,
    management: ez([
        e5,
        ey()
    ]),
    acs_bootstrap: eD,
    provisioning: tc,
    services: eS(e9),
    ssids: eS(e9),
    wifi_sync: td
}), tp = ez([
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
]), t_ = eL({
    enabled: eh(),
    mode: e0,
    vlan: eS(ef()),
    priority: ef(),
    address: e_(),
    acs_url: e_(),
    port: ef(),
    path: e_(),
    dhcp_enabled: eh()
}), tm = eL({
    operation: e_(),
    key: e_(),
    value: eS(e_())
}), tf = eL({
    state: tp,
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
        t_,
        ey()
    ]),
    applied: ez([
        t_,
        ey()
    ]),
    previous: ez([
        t_,
        ey()
    ]),
    plan: eS(tm)
}), tg = eL({
    desired: ez([
        eO,
        ey()
    ]),
    state: e_()
}), th = eL({
    id: e_(),
    name: ez([
        e_(),
        ey()
    ]),
    template: e_()
}), tv = eL({
    enabled: eh(),
    mode: e0,
    method: e1,
    revision: e_(),
    triggers: eS(e_()),
    interval_minutes: ef(),
    error: ez([
        e_(),
        ey()
    ]),
    devices: eS(tu),
    management_network: tf,
    omci_management: tg,
    groups: eS(th),
    pending_devices: eS(e_()),
    onu_pins: eE(eA(e_(), ef())),
    config_error: eE(ez([
        e_(),
        ey()
    ]))
});
ez([
    tv,
    eF
]);
const ty = eL({
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
}), tb = eL({
    entity_id: ef(),
    port_id: ez([
        ef(),
        ey()
    ])
}), tw = eL({
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
}), tS = eL({
    entity_id: ef(),
    received_frame_rules_hex: ez([
        eS(e_()),
        ey()
    ]),
    error: ez([
        e_(),
        ey()
    ])
}), tk = eL({
    age_seconds: ef(),
    gem_ports: eS(tb),
    vlan_filters: eS(tw),
    vlan_operations: eS(tS)
}), tL = eL({
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
}), tj = eL({
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
        tk,
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
    offload: ty,
    measurements: eA(e_(), tL)
});
eL({});
const tz = eL({
    entry: ez([
        ex(0),
        ex(1),
        ex(2)
    ]),
    username: e_(),
    active: eh()
}), tP = eL({
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
}), tA = ez([
    ex("executed"),
    ex("dispatched"),
    ex("timeout"),
    ex("error")
]), tC = eL({
    target: e_(),
    status: tA,
    request_id: eE(e_()),
    exit_code: eE(ef()),
    output: eE(e_()),
    output_truncated: eh(),
    error: eE(e_())
}), tx = eL({
    target: tP,
    result: tC,
    binding_current: eh()
}), tN = ez([
    ex("not_applicable"),
    ex("accepted_and_saved"),
    ex("unconfirmed")
]), tE = eL({
    code: e_(),
    message: e_()
});
ez([
    eL({
        schema_version: ex(1),
        operation: tx,
        accounts: ez([
            eS(tz),
            ey()
        ]),
        write_status: tN
    }),
    eL({
        schema_version: ef(),
        error: tE
    })
]);
const tT = eL({
    optical_sn: e_(),
    onu_id: ef(),
    binding_generation: e_()
}), tR = eL({
    mqtt_mac: e_(),
    binding_generation: e_()
}), tI = ez([
    tT,
    tR
]);
eL({
    target: tI
});
const tO = ez([
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
]), tV = eL({
    schema_version: ef(),
    target: tT,
    action: tO
}), t$ = eL({
    optical_sn: e_(),
    onu_id: ef(),
    model: e_(),
    optical_online: eh(),
    can_execute: eh(),
    mqtt: ez([
        tP,
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
        operation: tx
    }),
    eL({
        schema_version: ef(),
        error: tE
    })
]), eL({
    target: tI,
    script: e_(),
    timeout_seconds: ef()
});
const tD = ez([
    eL({
        schema_version: ex(1),
        devices: eS(t$),
        sources: eS(tP)
    }),
    eL({
        schema_version: ef(),
        error: tE
    })
]);
ez([
    eL({
        method: ex("list")
    }),
    eL({
        method: ex("report"),
        target: tT
    }),
    eL({
        method: ex("source_report"),
        target: tR
    }),
    eL({
        method: ex("run"),
        request: tV
    })
]);
const tM = ez([
    ex("received"),
    ex("report_unavailable")
]), tq = eL({
    value: new eb({
        type: "unknown"
    }),
    member: e_(),
    unit: ez([
        e_(),
        ey()
    ])
}), tU = eL({
    name: e_(),
    bytes: ef(),
    encoding: e_(),
    text: ez([
        e_(),
        ey()
    ]),
    text_omitted: eh()
}), tW = eL({
    schema_version: ef(),
    compressed_bytes: ef(),
    decompressed_bytes: ef(),
    fields: eA(e_(), tq),
    members: eS(tU),
    errors: eS(e_())
}), tZ = eL({
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
        tW,
        ey()
    ])
});
ez([
    eL({
        schema_version: ex(1),
        target: tP,
        report: ez([
            tZ,
            ey()
        ]),
        state: tM
    }),
    eL({
        schema_version: ex(1),
        target: tP,
        report: ez([
            tZ,
            ey()
        ]),
        read_only: ex(!0)
    }),
    eL({
        schema_version: ef(),
        error: tE
    })
]), eL({
    target: tI
}), eL({
    target: tI,
    kind: eT,
    entry: ef(),
    password: e_(),
    active: eh()
});
const tH = eL({
    accepted: ef(),
    rejected: ef(),
    read_errors: ef(),
    handled: ef(),
    max_intake_us: ef(),
    max_handler_us: ef()
}), tG = ex("pending"), tF = eL({
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
}), tB = ex("ready"), tK = ez([
    eL({
        status: tG,
        progress: eE(tF)
    }),
    eL({
        status: tB,
        chunk: ef(),
        chunks: ef(),
        bytes: ef(),
        data: e_()
    })
]);
ez([
    tK,
    eF
]);
const tJ = eL({
    status: tG,
    job: e_()
}), tQ = eL({
    released: eh()
});
eL({
    job: e_()
}), eL({
    job: e_(),
    chunk: ef()
}), ez([
    tJ,
    eF
]);
const tX = eL({
    accepting: eh(),
    running: ef(),
    stored: ef(),
    bytes: ef(),
    running_limit: ef(),
    stored_limit: ef(),
    bytes_limit: ef(),
    result_bytes_limit: ef()
}), tY = eL({
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
}), t0 = ez([
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
]), t1 = eL({
    id: e_(),
    url: e_()
}), t2 = eL({
    name: e_(),
    kind: t0,
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
    reference: t1
}), t4 = ez([
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
]), t5 = eL({
    raw_hex: e_(),
    value: t4,
    sequences: eS(ef())
}), t6 = eL({
    definition: t2,
    value: ez([
        t4,
        ey()
    ]),
    observations: eS(t5)
}), t3 = ez([
    ex("layout"),
    ex("name_only"),
    ex("unknown")
]), t7 = eL({
    class_id: ef(),
    name: ez([
        e_(),
        ey()
    ]),
    entities: ef(),
    records: ef(),
    support: t3
}), t9 = eL({
    code: e_(),
    message: e_(),
    offset: ef(),
    mask: ef()
}), t8 = eL({
    class_id: ef(),
    entity_id: ef(),
    name: ez([
        e_(),
        ey()
    ]),
    support: t3,
    reference: ez([
        t1,
        ey()
    ]),
    sequences: eS(ef()),
    attributes: eS(t6),
    diagnostics: eS(t9)
}), ne = ex("ready"), nt = eL({
    class_id: ef(),
    entity_id: ef(),
    sequence: ef(),
    attribute_mask: ef(),
    raw_hex: e_(),
    consumed: ef(),
    remaining_hex: e_(),
    undecoded_mask: ef()
}), nn = eL({
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
}), ni = eL({
    class_id: ef(),
    entity_id: ef(),
    attribute: t2,
    collected: eh(),
    error: ez([
        e_(),
        ey()
    ]),
    raw_hex: e_(),
    rows: eS(e_()),
    vlan_rules: eS(nn)
}), nr = eL({
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
    classes: eS(t7),
    entities: eS(t8),
    records: eS(nt),
    tables: eS(ni),
    diagnostics: eS(t9)
});
eL({
    status: ne,
    report: nr
}), eL({
    onu_id: ef(),
    optical_sn: e_(),
    tables: eh()
});
const na = ez([
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
const no = eL({
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
}), ns = eL({
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
    bound_flows: eS(no)
}), nl = eL({
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
}), nc = eL({
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
}), nd = ez([
    ex("optical_on"),
    ex("optical_off"),
    ex("optical_status"),
    ex("optical_reload"),
    ex("optical_reinitialize"),
    ex("optical_shutdown")
]), nu = ez([
    ex("success"),
    ex("error")
]), np = ez([
    ex("enabled"),
    ex("disabled"),
    ex("unknown")
]), n_ = eL({
    schema_version: ex(1),
    status: nu,
    action: nd,
    desired_enabled: ez([
        eh(),
        ey()
    ]),
    tx_enabled: ez([
        eh(),
        ey()
    ]),
    actor_state: np,
    hardware_ready: eh(),
    discovery_active: eh(),
    cleanup_pending: eh(),
    error: ez([
        tE,
        ey()
    ])
});
eL({
    enabled: eh()
});
const nm = eL({
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
    measurements: eA(e_(), tL)
}), nf = ez([
    ex("o1_initial"),
    ex("o2_standby"),
    ex("o3_serial_number"),
    ex("o4_ranging"),
    ex("o5_operation"),
    ex("o6_intermittent_lods"),
    ex("o7_emergency_stop")
]), ng = eL({
    restarting: ex(!0)
}), nh = eL({
    calls: ef(),
    failures: ef(),
    last_us: ef(),
    max_us: ef(),
    total_us: ef()
}), nv = eL({
    port: ef(),
    interface: e_(),
    carrier: eh(),
    status: e_(),
    onu_id: eE(ef()),
    onu_sn: eE(e_()),
    link_state: e_(),
    reserved_sn: eE(e_())
}), ny = eL({
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
    measurements: eA(e_(), tL)
}), nb = eL({
    onu_id: ef(),
    vendor: e_(),
    model: e_(),
    serial_number: e_(),
    state: nf,
    business_status: eU,
    management: ez([
        e5,
        ey()
    ]),
    provisioning: ez([
        tc,
        ey()
    ]),
    services: eS(e9),
    ssids: eS(e9),
    wifi_sync: td,
    identity: ez([
        nl,
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
    data_path: tj,
    wifi_mesh: ny,
    connected_clients: ez([
        eS(tY),
        ey()
    ]),
    measurements: eA(e_(), tL)
}), nw = eL({
    id: e_(),
    last_seen_sec_ago: ef(),
    last_payload_bytes: ef()
}), nS = eL({
    ubus: eE(eA(e_(), nh)),
    jobs: eE(tX),
    onu_pinning: eE(nc),
    fpga_status: e_(),
    provisioning: ez([
        tv,
        ey()
    ]),
    optical_transceiver: nm,
    switch_ports: eS(nv),
    sub_gateways: eS(nb),
    telemetry_gateways: eS(nw),
    npu: eE(ns),
    ipc: eE(tH)
}), nk = ez([
    ex("plan"),
    ex("apply"),
    ex("management_plan"),
    ex("management_apply"),
    ex("reset_state"),
    ex("reconcile"),
    ex("retry")
]), nL = ez([
    eL({
        operation_ids: eS(ef()),
        revision: e_()
    }),
    eL({
        started: ex(!0),
        mode: e8
    }),
    eL({
        reset: ex(!0),
        device: e_()
    }),
    eL({
        operation_ids: eS(ef()),
        mode: e8,
        reconcile: eE(eh()),
        retry: eE(eh())
    }),
    eF
]);
eL({
    action: nk,
    target: e_(),
    management: eE(eh()),
    item: eE(e_())
});
let nj = eL({
    error: ez([
        e_(),
        eL({
            code: e_(),
            message: e_()
        })
    ])
});
class nz extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function nP(e) {
    let t = nj.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new nz("rpc", e) : new nz(e.code, e.message);
    }
    return e;
}
const nA = {
    parse (e) {
        let t = tD.parse(nP(e));
        if ("object" == typeof t && null !== t && "error" in t) throw nP(t), Error("Unexpected RPC error");
        return t;
    }
}, nC = {
    parse (e) {
        let t = nL.parse(nP(e));
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
const nx = {
    getCapabilities: {
        parse: (e)=>eX.parse(nP(e))
    },
    opticalStatus: n_,
    opticalSet: n_,
    getStatus: {
        parse: (e)=>nS.parse(nP(e))
    },
    getSync: {
        parse: (e)=>tv.parse(nP(e))
    },
    configCheck: {
        parse (e) {
            if ("object" == typeof e && null !== e && "error" in e && ("valid" in e || "revision" in e || "devices" in e)) throw Error("Mixed configuration check result");
            return eY.parse(e);
        }
    },
    npuStatus: ns,
    configReload: {
        parse: (e)=>tv.parse(nP(e))
    },
    restartService: {
        parse: (e)=>ng.parse(nP(e))
    },
    sync: {
        parse: (e)=>nC.parse(nP(e))
    },
    npuSet: na,
    mibStart: {
        parse: (e)=>tJ.parse(nP(e))
    },
    mibResult: {
        parse: (e)=>tK.parse(nP(e))
    },
    jobRelease: {
        parse: (e)=>tQ.parse(nP(e))
    },
    hl202List: {
        parse: (e)=>nA.parse(nP(e))
    },
    hl202Report: {
        parse: (e)=>tJ.parse(nP(e))
    },
    hl202AccountsStart: {
        parse: (e)=>tJ.parse(nP(e))
    },
    hl202AccountUpdate: {
        parse: (e)=>tJ.parse(nP(e))
    },
    hl202ExecStart: {
        parse: (e)=>tJ.parse(nP(e))
    },
    jobResult: {
        parse: (e)=>tK.parse(nP(e))
    },
    getCalibration: {
        parse: (e)=>eG.parse(nP(e))
    },
    saveCalibration: {
        parse: (e)=>eB.parse(nP(e))
    },
    applyCalibration: {
        parse: (e)=>tJ.parse(nP(e))
    }
};
function nN() {
    var e;
    let n, i, r, a, o, s, l, c, d, u, p, m, f, g, h, v, y, b, w, S, k, j, z;
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
        getCapabilities: async ()=>nx.getCapabilities.parse(await n()),
        opticalStatus: async ()=>nx.opticalStatus.parse(await i()),
        opticalSet: async (e)=>nx.opticalSet.parse(await r(e.enabled)),
        getStatus: async ()=>nx.getStatus.parse(await a()),
        getSync: async ()=>nx.getSync.parse(await o()),
        configCheck: async ()=>nx.configCheck.parse(await s()),
        npuStatus: async ()=>nx.npuStatus.parse(await l()),
        configReload: async ()=>nx.configReload.parse(await c()),
        restartService: async ()=>nx.restartService.parse(await d()),
        sync: async (e)=>nx.sync.parse(await u(e.action, e.target, e.management, e.item)),
        npuSet: async (e)=>nx.npuSet.parse(await p(e.enabled, e.bridge, e.wan_upstream, e.wan_downstream, e.onu_bridge)),
        mibStart: async (e)=>nx.mibStart.parse(await m(e.onu_id, e.optical_sn, e.tables)),
        mibResult: async (e)=>nx.mibResult.parse(await f(e.job, e.chunk)),
        jobRelease: async (e)=>nx.jobRelease.parse(await g(e.job)),
        hl202List: async ()=>nx.hl202List.parse(await h()),
        hl202Report: async (e)=>nx.hl202Report.parse(await v(e.target)),
        hl202AccountsStart: async (e)=>nx.hl202AccountsStart.parse(await y(e.target)),
        hl202AccountUpdate: async (e)=>nx.hl202AccountUpdate.parse(await b(e.target, e.kind, e.entry, e.password, e.active)),
        hl202ExecStart: async (e)=>nx.hl202ExecStart.parse(await w(e.target, e.script, e.timeout_seconds)),
        jobResult: async (e)=>nx.jobResult.parse(await S(e.job, e.chunk)),
        getCalibration: async ()=>nx.getCalibration.parse(await k()),
        saveCalibration: async (e)=>nx.saveCalibration.parse(await j(e.data)),
        applyCalibration: async ()=>nx.applyCalibration.parse(await z())
    });
}
const nE = async ()=>nN().getCapabilities(), nT = [
    "INTERNET",
    "OTHER",
    "IPTV",
    "VOIP"
];
function nR(e) {
    return Array.isArray(e) ? e.map(String) : String(e ?? "").split(/\s+/).filter(Boolean);
}
function nI() {
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
function nO(e) {
    return String(e.name || e.ssid || e.optical_sn || e[".name"]);
}
function nV(e, t) {
    return e.wifi.filter((e)=>e.template === t).map((e)=>[
            e[".name"],
            nO(e)
        ]);
}
function n$(e) {
    let t = nI();
    if (t.group.some((t)=>t.template === e)) throw Error(_("Template is in use."));
    for (let n of t.wifi)n.template === e && nM(n[".name"]);
    for (let n of [
        ...t.network,
        ...t.wifi
    ])n.template === e && L.uci.remove("fttr", n[".name"]);
}
function nD(e) {
    if (nI().device.some((t)=>t.group === e)) throw Error(_("Group is used by devices. Reassign those devices before deleting it."));
}
function nM(e) {
    for (let t of nI().network){
        let n = nR(t.ssid);
        if (n.includes(e)) {
            let i = n.filter((t)=>t !== e);
            i.length ? L.uci.set("fttr", t[".name"], "ssid", i) : L.uci.unset("fttr", t[".name"], "ssid");
        }
    }
}
function nq(e, t) {
    let n = e?.vendor || e?.serial_number.slice(0, 4);
    return "HWTC" === n && (!t || t.has("hwtc")) ? "hwtc" : e?.model?.startsWith("HL202") && (!t || t.has("hl202")) ? "hl202" : ("STAR" === n || e?.model?.includes("SG631") || e?.serial_number.startsWith("STAR")) && (!t || t.has("star")) ? "star" : "generic";
}
function nU(e) {
    let t = nR(e);
    return t.length ? !!t.every((e)=>nT.includes(e)) || _("WAN Service List may only contain INTERNET, OTHER, IPTV, and VOIP.") : _("Select at least one WAN Service List label.");
}
function nW(e) {
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
        let e = nU(t.service_list);
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
        for (let e of nR(t.ssid)){
            let n = r.get(e);
            n && n.template === t.template || a("network", t, "ssid", _("Select SSIDs belonging to this network's template."));
        }
    }
    for (let t of e.device)i.has(String(t.group || "")) || a("device", t, "group", _("Select an existing group."));
    return t;
}
function nZ(e, t) {
    return e.children.find((e)=>e.subsection?.sectiontype === t)?.subsection;
}
function nH(e) {
    return ({
        device: _("Device"),
        group: _("Group"),
        template: _("Template"),
        wifi: _("SSID"),
        network: _("Network")
    })[e];
}
async function nG(e, t) {
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
function nF(e, t) {
    var n, i, r;
    let a = function(e) {
        let t = new Map();
        for (let n of nW(e)){
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
    }(nI());
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
                                nH(n.kind),
                                ": ",
                                nO(n.row),
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
                                        ].includes(e.field) && nR(n.row[e.field]).length ? (i = {
                                            children: [
                                                " ",
                                                s("code", {
                                                    children: nR(n.row[e.field]).join(", ")
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
                            onclick: (t)=>nG(t, async ()=>{
                                    if (!L.hasViewPermission()) return;
                                    let t = nZ(e, n.kind);
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
                                                        nH(n.kind),
                                                        ": ",
                                                        nO(n.row)
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
                                                    onclick: ()=>nF(e, t),
                                                    children: _("Cancel")
                                                }),
                                                " ",
                                                s("button", {
                                                    class: "cbi-button cbi-button-negative",
                                                    type: "button",
                                                    disabled: !L.hasViewPermission(),
                                                    onclick: (i)=>nG(i, async ()=>{
                                                            if (!L.hasViewPermission()) return;
                                                            let r = nZ(e, n.kind);
                                                            if (!r) throw Error(_("Configuration editor is unavailable."));
                                                            await r.handleRemove(n.sectionId, i), nF(e, t);
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
const nB = async ()=>nN().getStatus(), nK = async ()=>nN().configCheck(), nJ = async ()=>nN().configReload(), nQ = async ()=>nN().restartService();
let nX = L.view, nY = L.uci, n0 = L.form;
async function n1(e, t, n) {
    try {
        let i = await e();
        t.textContent = JSON.stringify(i, null, 2), n?.(i);
    } catch (e) {
        t.textContent = String(e), n?.({
            error: String(e)
        });
    }
}
let main = nX.extend({
    async load () {
        let e = await nE();
        if (!e.pages.config) throw Error(_("This page is not supported by the installed FTTR build."));
        await nY.load("fttr"), nY.sections("fttr", "provisioning").length || nY.add("fttr", "provisioning", "provisioning"), nY.sections("fttr", "management").length || nY.add("fttr", "management", "management");
        let [t, n] = await Promise.all([
            nK().catch((e)=>({
                    error: String(e)
                })),
            nB().catch((e)=>({
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
        var t, n, i, r, a;
        let o, b, w, S, k, j = new n0.Map("fttr", _("FTTR configuration")), z = j.section(n0.NamedSection, "acs", "acs");
        z.addremove = !1, z.anonymous = !1;
        let P = nY.sections("fttr", "provisioning")[0]?.[".name"] ?? "provisioning";
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
        })(z, _("Basic"), P), t = e.connectedDevices ?? [], n = e.pinning, i = e.capabilities, o = new Map(t.map((e)=>[
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
        }, z.tab("devices", _("Devices & groups")), y(g(z, "devices", "_groups", "group", _("Groups"), (e)=>{
            h(e, "_name", _("Group"), (e)=>String(L.uci.get("fttr", e, "name") || e)), c(e, L.form.Value, "name", _("Name")).modalonly = !0, m(e, "template", _("Template"), "template").modalonly = !0;
        }), nD), g(z, "devices", "_devices", "device", _("Devices"), (e)=>{
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
                for (let e of t)"o5_operation" === e.state && nq(e, w) && !o.has(e.serial_number) && this.value(e.serial_number, S(e.serial_number));
                a && !this.keylist.includes(a) && this.value(a, S(a));
                let s = i || a || this.keylist[0] || "";
                return r.call(this, e, n, s);
            }, i.onchange = (e, t, n)=>{
                let i = nq(o.get(n), w);
                a.getUIElement(t)?.setValue(i);
            }, i.validate = (e, t)=>t ? !L.uci.sections("fttr", "device").some((n)=>n[".name"] !== e && n.optical_sn === t) || _("Device already configured.") : _("Select device."), i.write = (e, t)=>{
                L.uci.set("fttr", e, "optical_sn", t);
                let n = nq(o.get(t), w);
                L.uci.get("fttr", e, "adapter") || L.uci.set("fttr", e, "adapter", n);
            };
            let a = p(e, "general", "adapter", _("Device adapter"), b);
            a.modalonly = !0, a.default = "generic", a.rmempty = !1;
            let c = a.renderWidget;
            a.renderWidget = function(e, t, n) {
                let i = String(L.uci.get("fttr", e, "optical_sn") || ""), r = nq(o.get(i), w), a = n || L.uci.get("fttr", e, "adapter") || r;
                return a && !this.keylist.includes(a) && this.value(a, a), c.call(this, e, t, a);
            }, a.write = (e, t)=>{
                let n = String(L.uci.get("fttr", e, "optical_sn") || ""), i = nq(o.get(n), w);
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
        }), n$), z.tab("wifi", _("SSIDs")), y(g(z, "wifi", "_wifi", "wifi", _("SSIDs"), (e)=>{
            e.description = _("Create SSIDs here before selecting them in a network. Every SSID belongs to one template.");
            let t = v(e), n = t.validate;
            t.validate = function(e, t) {
                let i = n.call(this, e, t);
                return !0 !== i ? i : !nI().network.some((n)=>nR(n.ssid).includes(e) && n.template !== t) || _("This SSID is bound to a network. Remove its network bindings before changing the template.");
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
        }), nM), z.tab("networks", _("Networks")), g(z, "networks", "_networks", "network", _("Networks"), (e)=>{
            e.description = _("Networks bind VLAN services to wired ports and optional SSIDs within one template.");
            let t = v(e);
            h(e, "_name", _("Network"), (e)=>String(L.uci.get("fttr", e, "name") || _("New network"))), h(e, "_vlan", _("VLAN"), (e)=>String(L.uci.get("fttr", e, "vlan") || "0")), h(e, "_services", _("WAN Service List (multi-select)"), (e)=>nR(L.uci.get("fttr", e, "service_list")).join(", ")), h(e, "_bindings", _("LAN / WLAN port bindings"), (e)=>[
                    ...nR(L.uci.get("fttr", e, "port")).map((e)=>e.toUpperCase()),
                    ...nR(L.uci.get("fttr", e, "ssid")).map((e)=>String(L.uci.get("fttr", e, "ssid") || e))
                ].join(", "));
            let n = c(e, L.form.Value, "name", _("Name"));
            n.modalonly = !0, n.rmempty = !1;
            let i = c(e, L.form.MultiValue, "service_list", _("WAN Service List (multi-select)"));
            for (let e of (i.modalonly = !0, i.rmempty = !1, i.validate = (e, t)=>nU(t), i.description = _("Select at least one of INTERNET, OTHER, IPTV, and VOIP for each custom VLAN. TR069 is reserved for OMCI."), nT))i.value(e, e);
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
                return nV(nI(), String(t?.formvalue(e) ?? L.uci.get("fttr", e, "template") ?? ""));
            }), r.validate = function(e, t) {
                let n = String(this.section.getOption("template").formvalue(e) ?? L.uci.get("fttr", e, "template") ?? ""), i = new Set(nV(nI(), n).map((e)=>{
                    let [t] = e;
                    return t;
                }));
                return !!nR(t).every((e)=>i.has(e)) || _("Select SSIDs belonging to this network's template.");
            }, t.onchange = function(e, t, n) {
                let i = this.section.getOption("ssid").getUIElement(t);
                if (!i) return;
                let r = nV(nI(), n);
                i.clearChoices(!0), i.addChoices(r.map((e)=>{
                    let [t] = e;
                    return t;
                }), Object.fromEntries(r));
            };
            let a = c(e, L.form.MultiValue, "port", _("Ports"));
            a.modalonly = !0;
            for(let e = 1; e <= 4; e++)a.value(`lan${e}`, `LAN${e}`);
        }), this.handleSave = ()=>j.save(()=>{
                let e = nI(), t = nW(e);
                if (t.length) throw Error(t.map((t)=>{
                    let n = e[t.kind].find((e)=>e[".name"] === t.sectionId), i = e.template.find((e)=>e[".name"] === n?.template), r = [
                        i && nO(i),
                        n ? nO(n) : t.sectionId
                    ].filter(Boolean).join(" / ");
                    return `${r} [${t.sectionId}.${t.field}]: ${t.message}`;
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
                        onclick: ()=>nF(z, k),
                        children: _("Review and repair configuration")
                    })
                ]
            }, s("div", t)), "error"));
        };
        x(e);
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
                    onclick: ()=>nF(z, k),
                    children: _("Review and repair configuration")
                }),
                " ",
                s("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    onclick: ()=>n1(nK, A, x),
                    children: _("Check")
                }),
                " ",
                s("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    disabled: !L.hasViewPermission(),
                    onclick: ()=>n1(async ()=>(await nJ(), await nK()), A, x),
                    children: _("Reload")
                }),
                " ",
                s("button", {
                    class: "cbi-button cbi-button-negative",
                    type: "button",
                    disabled: !L.hasViewPermission(),
                    onclick: ()=>n1(nQ, A),
                    children: _("Restart")
                }),
                A
            ]
        }, s("div", a));
        return z.tab("diagnostics", _("Configuration diagnostics")), z.taboption("diagnostics", n0.DummyValue, "_diagnostics", "").render = ()=>Promise.resolve(N), j.render();
    }
});

return main;