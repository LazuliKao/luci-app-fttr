'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var main, e = {};
e.d = (t, n, r)=>{
    var i = (n, r)=>{
        for(var i in n)e.o(n, i) && !e.o(t, i) && Object.defineProperty(t, i, {
            enumerable: !0,
            [r]: n[i]
        });
    };
    i(n, "get"), i(r, "value");
}, e.o = (e, t)=>Object.prototype.hasOwnProperty.call(e, t);
var t = {};
(()=>{
    var n;
    let r, i, a, o, s;
    e.d(t, {
        main: ()=>main
    });
    let l = Symbol.for("jsx.fragment");
    function d(e, t) {
        let { children: n, ...r } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, i = function e(t) {
            let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            for (let r of t)null != r && "boolean" != typeof r && (Array.isArray(r) ? e(r, n) : n.push(r instanceof Node ? r : String(r)));
            return n;
        }(null == n ? [] : Array.isArray(n) ? n : [
            n
        ]);
        if (e === l) {
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
        let s = Object.keys(o).length > 0 ? i.length > 1 ? E(e, o, i) : E(e, o, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
        for (let [e, t] of Object.entries(a)){
            let n = e.slice(2).toLowerCase();
            s.addEventListener(n, t);
        }
        return s;
    }
    let c = L.form;
    function u(e, t, n, r, i) {
        let a = e.option(t, n, r);
        return i && (a.datatype = i.startsWith("range(") ? `and(uinteger,${i})` : i), a;
    }
    function p(e, t, n, r, i, a) {
        let o = e.taboption(t, n, r, i);
        return a && (o.datatype = a.startsWith("range(") ? `and(uinteger,${a})` : a), o;
    }
    function m(e, t, n, r) {
        let i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], a = u(e, c.ListValue, t, n);
        for (let [e, t] of r)a.value(e, t);
        return a.rmempty = i, a;
    }
    function f(e, t, n, r, i) {
        let a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5], o = p(e, t, c.ListValue, n, r);
        for (let [e, t] of i)o.value(e, t);
        return o.rmempty = a, o;
    }
    function g(e, t, n, r) {
        let i = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], a = u(e, c.RichListValue, t, n);
        return a.rmempty = i, a.optional = i, a.default = "", h(a, ()=>[
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
    function h(e, t) {
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
    function v(e, t, n, r, i, a) {
        let o = e.taboption(t, c.SectionValue, n, c.GridSection, r, i).subsection;
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
    function y(e, t, n, r) {
        let i = e.option(L.form.DummyValue, t, n);
        i.modalonly = !1, i.textvalue = r;
    }
    function b(e) {
        y(e, "_template", _("Template"), (e)=>{
            let t = String(L.uci.get("fttr", e, "template") || "");
            return String(L.uci.get("fttr", t, "name") || t || _("Missing template"));
        });
        let t = g(e, "template", _("Template"), "template");
        return t.modalonly = !0, t;
    }
    function w(e, t) {
        let n = e.handleRemove;
        e.handleRemove = async function(e, r) {
            try {
                t(e), await n.call(this, e, r);
            } catch (e) {
                L.ui.addNotification(null, d("p", {
                    children: String(e instanceof Error ? e.message : e)
                }), "error");
            }
        };
    }
    function S(e, t, n) {
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
    class k extends Error {
        constructor(){
            super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
        }
    }
    let j = {};
    function z(e) {
        return e && Object.assign(j, e), j;
    }
    function P(e, t) {
        return "bigint" == typeof t ? t.toString() : t;
    }
    function x(e) {
        let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
        return e.slice(t, n);
    }
    let A = Symbol("evaluating");
    function C(e, t, n) {
        let r;
        Object.defineProperty(e, t, {
            get () {
                if (r !== A) return void 0 === r && (r = A, r = n()), r;
            },
            set (n) {
                Object.defineProperty(e, t, {
                    value: n
                });
            },
            configurable: !0
        });
    }
    let N = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
    function T(e) {
        return "object" == typeof e && null !== e && !Array.isArray(e);
    }
    function I(e) {
        if (!1 === T(e)) return !1;
        let t = e.constructor;
        if (void 0 === t || "function" != typeof t) return !0;
        let n = t.prototype;
        return !1 !== T(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
    }
    function O(e) {
        return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function R(e) {
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
    function $(e, t) {
        return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
    }
    function D(e) {
        return "string" == typeof e ? e : e?.message;
    }
    function M(e, t, n) {
        let r = {
            ...e,
            path: e.path ?? []
        };
        return e.message || (r.message = D(e.inst?._zod.def?.error?.(e)) ?? D(t?.error?.(e)) ?? D(n.customError?.(e)) ?? D(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
    }
    let q = (e, t)=>{
        e.name = "$ZodError", Object.defineProperty(e, "_zod", {
            value: e._zod,
            enumerable: !1
        }), Object.defineProperty(e, "issues", {
            value: t,
            enumerable: !1
        }), e.message = JSON.stringify(t, P, 2), Object.defineProperty(e, "toString", {
            value: ()=>e.message,
            enumerable: !1
        });
    }, U = S("$ZodError", q), W = S("$ZodError", q, {
        Parent: Error
    }), Z = (i = W, (e, t, n, r)=>{
        let a = n ? Object.assign(n, {
            async: !1
        }) : {
            async: !1
        }, o = e._zod.run({
            value: t,
            issues: []
        }, a);
        if (o instanceof Promise) throw new k();
        if (o.issues.length) {
            let e = new (r?.Err ?? i)(o.issues.map((e)=>M(e, a, z())));
            throw N(e, r?.callee), e;
        }
        return o.value;
    }), H = (a = W, async (e, t, n, r)=>{
        let i = n ? Object.assign(n, {
            async: !0
        }) : {
            async: !0
        }, o = e._zod.run({
            value: t,
            issues: []
        }, i);
        if (o instanceof Promise && (o = await o), o.issues.length) {
            let e = new (r?.Err ?? a)(o.issues.map((e)=>M(e, i, z())));
            throw N(e, r?.callee), e;
        }
        return o.value;
    }), G = (o = W, (e, t, n)=>{
        let r = n ? {
            ...n,
            async: !1
        } : {
            async: !1
        }, i = e._zod.run({
            value: t,
            issues: []
        }, r);
        if (i instanceof Promise) throw new k();
        return i.issues.length ? {
            success: !1,
            error: new (o ?? U)(i.issues.map((e)=>M(e, r, z())))
        } : {
            success: !0,
            data: i.value
        };
    }), F = (s = W, async (e, t, n)=>{
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
            error: new s(i.issues.map((e)=>M(e, r, z())))
        } : {
            success: !0,
            data: i.value
        };
    }), B = /^-?\d+(?:\.\d+)?$/, K = /^(?:true|false)$/i, J = /^null$/i, Q = {
        major: 4,
        minor: 3,
        patch: 6
    }, X = S("$ZodType", (e, t)=>{
        var n;
        e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = Q;
        let r = [
            ...e._zod.def.checks ?? []
        ];
        for (let t of (e._zod.traits.has("$ZodCheck") && r.unshift(e), r))for (let n of t._zod.onattach)n(e);
        if (0 === r.length) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(()=>{
            e._zod.run = e._zod.parse;
        });
        else {
            let t = (e, t, n)=>{
                let r, i = V(e);
                for (let a of t){
                    if (a._zod.def.when) {
                        if (!a._zod.def.when(e)) continue;
                    } else if (i) continue;
                    let t = e.issues.length, o = a._zod.check(e);
                    if (o instanceof Promise && n?.async === !1) throw new k();
                    if (r || o instanceof Promise) r = (r ?? Promise.resolve()).then(async ()=>{
                        await o, e.issues.length !== t && (i || (i = V(e, t)));
                    });
                    else {
                        if (e.issues.length === t) continue;
                        i || (i = V(e, t));
                    }
                }
                return r ? r.then(()=>e) : e;
            }, n = (n, i, a)=>{
                if (V(n)) return n.aborted = !0, n;
                let o = t(i, r, a);
                if (o instanceof Promise) {
                    if (!1 === a.async) throw new k();
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
                    if (!1 === a.async) throw new k();
                    return o.then((e)=>t(e, r, a));
                }
                return t(o, r, a);
            };
        }
        C(e, "~standard", ()=>({
                validate: (t)=>{
                    try {
                        let n = G(e, t);
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
    }), Y = S("$ZodString", (e, t)=>{
        var n;
        let r;
        X.init(e, t), e._zod.pattern = [
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
    }), ee = S("$ZodNumber", (e, t)=>{
        X.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? B, e._zod.parse = (n, r)=>{
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
    }), et = S("$ZodBoolean", (e, t)=>{
        X.init(e, t), e._zod.pattern = K, e._zod.parse = (n, r)=>{
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
    }), en = S("$ZodNull", (e, t)=>{
        X.init(e, t), e._zod.pattern = J, e._zod.values = new Set([
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
    }), er = S("$ZodUnknown", (e, t)=>{
        X.init(e, t), e._zod.parse = (e)=>e;
    });
    function ei(e, t, n) {
        e.issues.length && t.issues.push(...$(n, e.issues)), t.value[n] = e.value;
    }
    let ea = S("$ZodArray", (e, t)=>{
        X.init(e, t), e._zod.parse = (n, r)=>{
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
                s instanceof Promise ? a.push(s.then((t)=>ei(t, n, e))) : ei(s, n, e);
            }
            return a.length ? Promise.all(a).then(()=>n) : n;
        };
    });
    function eo(e, t, n, r, i) {
        if (e.issues.length) {
            if (i && !(n in r)) return;
            t.issues.push(...$(n, e.issues));
        }
        void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
    }
    let es = S("$ZodObject", (e, t)=>{
        var n;
        let r;
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
        C(e._zod, "propValues", ()=>{
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
            if (!T(i)) return t.issues.push({
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
                o instanceof Promise ? s.push(o.then((n)=>eo(n, t, e, i, a))) : eo(o, t, e, i, a);
            }
            return o ? function(e, t, n, r, i, a) {
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
                    }, r);
                    a instanceof Promise ? e.push(a.then((e)=>eo(e, n, i, t, c))) : eo(a, n, i, t, c);
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
    function el(e, t, n, r) {
        for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
        let i = e.filter((e)=>!V(e));
        return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
            code: "invalid_union",
            input: t.value,
            inst: n,
            errors: e.map((e)=>e.issues.map((e)=>M(e, r, z())))
        }), t);
    }
    let ed = S("$ZodUnion", (e, t)=>{
        X.init(e, t), C(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), C(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), C(e._zod, "values", ()=>{
            if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
        }), C(e._zod, "pattern", ()=>{
            if (t.options.every((e)=>e._zod.pattern)) {
                let e = t.options.map((e)=>e._zod.pattern);
                return RegExp(`^(${e.map((e)=>x(e.source)).join("|")})$`);
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
            return o ? Promise.all(s).then((t)=>el(t, i, e, a)) : el(s, i, e, a);
        };
    }), ec = S("$ZodIntersection", (e, t)=>{
        X.init(e, t), e._zod.parse = (e, n)=>{
            let r = e.value, i = t.left._zod.run({
                value: r,
                issues: []
            }, n), a = t.right._zod.run({
                value: r,
                issues: []
            }, n);
            return i instanceof Promise || a instanceof Promise ? Promise.all([
                i,
                a
            ]).then(([t, n])=>eu(e, t, n)) : eu(e, i, a);
        };
    });
    function eu(e, t, n) {
        let r, i = new Map();
        for (let n of t.issues)if ("unrecognized_keys" === n.code) for (let e of (r ?? (r = n), n.keys))i.has(e) || i.set(e, {}), i.get(e).l = !0;
        else e.issues.push(n);
        for (let t of n.issues)if ("unrecognized_keys" === t.code) for (let e of t.keys)i.has(e) || i.set(e, {}), i.get(e).r = !0;
        else e.issues.push(t);
        let a = [
            ...i
        ].filter(([, e])=>e.l && e.r).map(([e])=>e);
        if (a.length && r && e.issues.push({
            ...r,
            keys: a
        }), V(e)) return e;
        let o = function e(t, n) {
            if (t === n || t instanceof Date && n instanceof Date && +t == +n) return {
                valid: !0,
                data: t
            };
            if (I(t) && I(n)) {
                let r = Object.keys(n), i = Object.keys(t).filter((e)=>-1 !== r.indexOf(e)), a = {
                    ...t,
                    ...n
                };
                for (let r of i){
                    let i = e(t[r], n[r]);
                    if (!i.valid) return {
                        valid: !1,
                        mergeErrorPath: [
                            r,
                            ...i.mergeErrorPath
                        ]
                    };
                    a[r] = i.data;
                }
                return {
                    valid: !0,
                    data: a
                };
            }
            if (Array.isArray(t) && Array.isArray(n)) {
                if (t.length !== n.length) return {
                    valid: !1,
                    mergeErrorPath: []
                };
                let r = [];
                for(let i = 0; i < t.length; i++){
                    let a = e(t[i], n[i]);
                    if (!a.valid) return {
                        valid: !1,
                        mergeErrorPath: [
                            i,
                            ...a.mergeErrorPath
                        ]
                    };
                    r.push(a.data);
                }
                return {
                    valid: !0,
                    data: r
                };
            }
            return {
                valid: !1,
                mergeErrorPath: []
            };
        }(t.value, n.value);
        if (!o.valid) throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
        return e.value = o.data, e;
    }
    let ep = S("$ZodRecord", (e, t)=>{
        X.init(e, t), e._zod.parse = (n, r)=>{
            let i = n.value;
            if (!I(i)) return n.issues.push({
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
                        t.issues.length && n.issues.push(...$(e, t.issues)), n.value[e] = t.value;
                    })) : (o.issues.length && n.issues.push(...$(e, o.issues)), n.value[e] = o.value);
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
                if ("string" == typeof o && B.test(o) && s.issues.length) {
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
                        issues: s.issues.map((e)=>M(e, r, z())),
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
                    e.issues.length && n.issues.push(...$(o, e.issues)), n.value[s.value] = e.value;
                })) : (l.issues.length && n.issues.push(...$(o, l.issues)), n.value[s.value] = l.value);
            }
            return a.length ? Promise.all(a).then(()=>n) : n;
        };
    }), e_ = S("$ZodLiteral", (e, t)=>{
        if (X.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
        let n = new Set(t.values);
        e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? O(e) : e ? O(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i)=>{
            let a = r.value;
            return n.has(a) || r.issues.push({
                code: "invalid_value",
                values: t.values,
                input: a,
                inst: e
            }), r;
        };
    });
    function em(e, t) {
        return e.issues.length && void 0 === t ? {
            issues: [],
            value: void 0
        } : e;
    }
    let ef = S("$ZodOptional", (e, t)=>{
        X.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", C(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
                ...t.innerType._zod.values,
                void 0
            ]) : void 0), C(e._zod, "pattern", ()=>{
            let e = t.innerType._zod.pattern;
            return e ? RegExp(`^(${x(e.source)})?$`) : void 0;
        }), e._zod.parse = (e, n)=>{
            if ("optional" === t.innerType._zod.optin) {
                let r = t.innerType._zod.run(e, n);
                return r instanceof Promise ? r.then((t)=>em(t, e.value)) : em(r, e.value);
            }
            return void 0 === e.value ? e : t.innerType._zod.run(e, n);
        };
    });
    Symbol("ZodOutput"), Symbol("ZodInput");
    (n = globalThis).__zod_globalRegistry ?? (n.__zod_globalRegistry = new class e {
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
    let eg = S("ZodMiniType", (e, t)=>{
        if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
        X.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>Z(e, t, n, {
                callee: e.parse
            }), e.safeParse = (t, n)=>G(e, t, n), e.parseAsync = async (t, n)=>H(e, t, n, {
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
            }), e.with = e.check, e.clone = (t, n)=>{
            let r;
            return r = new e._zod.constr(t ?? e._zod.def), (!t || n?.parent) && (r._zod.parent = e), r;
        }, e.brand = ()=>e, e.register = (t, n)=>(t.add(e, n), e), e.apply = (t)=>t(e);
    }), eh = S("ZodMiniString", (e, t)=>{
        Y.init(e, t), eg.init(e, t);
    });
    function ev(e) {
        return new eh({
            type: "string",
            ...R(e)
        });
    }
    let ey = S("ZodMiniNumber", (e, t)=>{
        ee.init(e, t), eg.init(e, t);
    });
    function eb(e) {
        return new ey({
            type: "number",
            checks: [],
            ...R(e)
        });
    }
    let ew = S("ZodMiniBoolean", (e, t)=>{
        et.init(e, t), eg.init(e, t);
    });
    function eS(e) {
        return new ew({
            type: "boolean",
            ...R(e)
        });
    }
    let ek = S("ZodMiniNull", (e, t)=>{
        en.init(e, t), eg.init(e, t);
    });
    function eL(e) {
        return new ek({
            type: "null",
            ...R(e)
        });
    }
    let ej = S("ZodMiniUnknown", (e, t)=>{
        er.init(e, t), eg.init(e, t);
    }), ez = S("ZodMiniArray", (e, t)=>{
        ea.init(e, t), eg.init(e, t);
    });
    function eP(e, t) {
        return new ez({
            type: "array",
            element: e,
            ...R(t)
        });
    }
    let ex = S("ZodMiniObject", (e, t)=>{
        es.init(e, t), eg.init(e, t), C(e, "shape", ()=>t.shape);
    });
    function eA(e, t) {
        return new ex({
            type: "object",
            shape: e ?? {},
            ...R(t)
        });
    }
    let eC = S("ZodMiniUnion", (e, t)=>{
        ed.init(e, t), eg.init(e, t);
    });
    function eN(e, t) {
        return new eC({
            type: "union",
            options: e,
            ...R(t)
        });
    }
    let eE = S("ZodMiniIntersection", (e, t)=>{
        ec.init(e, t), eg.init(e, t);
    });
    function eT(e, t) {
        return new eE({
            type: "intersection",
            left: e,
            right: t
        });
    }
    let eI = S("ZodMiniRecord", (e, t)=>{
        ep.init(e, t), eg.init(e, t);
    });
    function eO(e, t, n) {
        return new eI({
            type: "record",
            keyType: e,
            valueType: t,
            ...R(n)
        });
    }
    let eR = S("ZodMiniLiteral", (e, t)=>{
        e_.init(e, t), eg.init(e, t);
    });
    function eV(e, t) {
        return new eR({
            type: "literal",
            values: Array.isArray(e) ? e : [
                e
            ],
            ...R(t)
        });
    }
    let e$ = S("ZodMiniOptional", (e, t)=>{
        ef.init(e, t), eg.init(e, t);
    });
    function eD(e) {
        return new e$({
            type: "optional",
            innerType: e
        });
    }
    let eM = eN([
        eV("account_set_password"),
        eV("account_set_active")
    ]), eq = eN([
        eV("waiting_transport"),
        eV("waiting_identity"),
        eV("reading"),
        eV("configuring"),
        eV("verifying"),
        eV("waiting_inform"),
        eV("ready"),
        eV("retry_wait"),
        eV("manual_required"),
        eV("not_configured"),
        eV("waiting_acs"),
        eV("awaiting_apply"),
        eV("discovering_management_wan"),
        eV("configuring_management_wan"),
        eV("verifying_management_wan")
    ]), eU = eA({
        enabled: eS(),
        listen: eN([
            ev(),
            eL()
        ]),
        path: eN([
            ev(),
            eL()
        ]),
        error: eN([
            ev(),
            eL()
        ])
    }), eW = eA({
        vlan: eb(),
        vlans: eP(eb()),
        priority: eb(),
        acs_url: ev()
    }), eZ = eA({
        state: eq,
        optical_sn: ev(),
        cwmp_id: ev(),
        mqtt_target: eN([
            ev(),
            eL()
        ]),
        binding_source: ev(),
        method: ev(),
        desired_version: ev(),
        generation: eb(),
        reason: ev(),
        attempts: eb(),
        next_retry_at: eb(),
        updated_at: eb(),
        settings_verified_at: eN([
            eb(),
            eL()
        ]),
        selected_vlan: eN([
            eb(),
            eL()
        ]),
        last_inform: eN([
            eb(),
            eL()
        ]),
        expected_acs_url: ev(),
        last_error: eN([
            ev(),
            eL()
        ]),
        transport_epoch: eb(),
        completed_authorization: eb(),
        connection_request_enabled: eN([
            eS(),
            eL()
        ]),
        inflight: eS(),
        persistence_error: eN([
            ev(),
            eL()
        ]),
        link_identity_error: eN([
            ev(),
            eL()
        ]),
        listener: eU,
        mqtt_last_seen: eN([
            eb(),
            eL()
        ]),
        desired: eD(eW),
        endpoint_notice: eD(ev()),
        manual_steps: eD(eP(ev()))
    }), eH = eN([
        eV("pending"),
        eV("unavailable")
    ]), eG = eN([
        eZ,
        eA({
            state: eH,
            reason: ev()
        })
    ]), eF = eA({
        id: ev(),
        name: ev()
    }), eB = eA({
        configured: ev(),
        effective: ev(),
        available: eP(ev()),
        reason: ev()
    }), eK = eA({
        phase: eN([
            eV("not_started"),
            eV("collecting_identity"),
            eV("retrying_identity"),
            eV("unsupported"),
            eV("configuring"),
            eV("verifying"),
            eV("wan_bootstrap_pending"),
            eV("verified"),
            eV("retrying"),
            eV("offline")
        ]),
        generation: eb(),
        error: eN([
            ev(),
            eL()
        ])
    });
    eA({
        success: eS(),
        output: eD(ev()),
        error: eD(ev())
    });
    let eJ = eN([
        eV("factory"),
        eV("firmware"),
        eV("builtin")
    ]), eQ = eA({
        detected: eS(),
        device: ev(),
        has_data: eS(),
        sha256: ev(),
        data: ev()
    }), eX = eA({
        exists: eS(),
        path: ev(),
        size: eb(),
        sha256: ev(),
        data: ev()
    }), eY = eA({
        source: eJ,
        active_path: ev(),
        size: eb(),
        sha256: ev(),
        data: ev(),
        factory: eQ,
        firmware: eX
    }), e0 = eA({
        error: ev()
    });
    eN([
        eY,
        e0
    ]);
    let e1 = eA({
        success: eS(),
        path: ev(),
        size: eb(),
        sha256: ev()
    });
    eN([
        e1,
        e0
    ]), eA({
        data: ev()
    });
    let e2 = eA({
        acs: eS(),
        mqtt: eS(),
        npu: eS(),
        "device-hl202": eS(),
        "device-hwtc": eS(),
        "device-star": eS(),
        "device-zte": eS(),
        "device-scty": eS()
    }), e4 = eA({
        optical: eS(),
        bridge_offload: eS(),
        omci_mib: eS(),
        mqtt_telemetry: eS(),
        hl202_management: eS(),
        cwmp: eS(),
        command_provisioning: eS()
    }), e5 = eA({
        status: eS(),
        config: eS(),
        sync: eS(),
        hardware: eS(),
        calibration: eS(),
        hl202: eS(),
        about: eS()
    }), e6 = eA({
        schema_version: eV(1),
        version: ev(),
        features: e2,
        functions: e4,
        pages: e5,
        adapters: eP(eF)
    }), e3 = eN([
        eA({
            valid: eV(!0),
            revision: ev(),
            devices: eb()
        }),
        eA({
            error: ev()
        })
    ]), e7 = eN([
        eV("waiting"),
        eV("wan_reconciling"),
        eV("wan_verifying"),
        eV("wifi_reconciling"),
        eV("discovering"),
        eV("reading"),
        eV("disabling"),
        eV("disabling_read"),
        eV("writing"),
        eV("verifying"),
        eV("settling"),
        eV("completed"),
        eV("not_started"),
        eV("reset_pending"),
        eV("interrupted"),
        eV("recovering"),
        eV("waiting_management"),
        eV("waiting_task")
    ]), e9 = eA({
        operation_id: eb(),
        device: ev(),
        state: e7,
        started_at: eb()
    }), e8 = eA({
        state: eN([
            eV("waiting"),
            eV("applied")
        ]),
        requested_revision: ev(),
        requested_at: eN([
            eb(),
            eL()
        ]),
        blocking_operations: eP(e9),
        reset_pending: eS()
    }), te = eN([
        eV("auto"),
        eV("manual")
    ]), tt = eV("diff"), tn = eA({
        state: ev(),
        enabled: eS(),
        reason: eD(eN([
            ev(),
            eL()
        ])),
        revision: eD(ev()),
        vlan: eD(eb()),
        updated_at: eD(eb())
    }), tr = eN([
        eV("online"),
        eV("waiting_inform"),
        eV("offline_or_stale"),
        eV("waiting_transport")
    ]), ti = eA({
        cwmp_id: ev(),
        state: tr,
        optical_online: eS(),
        last_inform: eN([
            eb(),
            eL()
        ]),
        age_seconds: eN([
            eb(),
            eL()
        ])
    }), ta = eN([
        eV("device_service"),
        eV("ssid"),
        eV("port_binding"),
        eV("wan_activation")
    ]), to = eA({
        name: ev(),
        desired: ev()
    }), ts = eA({
        id: ev(),
        name: eD(eN([
            ev(),
            eL()
        ])),
        kind: ta,
        service_type: ev(),
        state: ev(),
        reason: eD(ev()),
        revision: eD(ev()),
        current_revision: eD(eS()),
        management_fresh: eD(eS()),
        operation_id: eD(eb()),
        task_id: eD(eN([
            eb(),
            eL()
        ])),
        updated_at: eD(eb()),
        changes: eD(eP(to))
    }), tl = eN([
        eV("plan"),
        eV("apply")
    ]), td = eA({
        wan: ev(),
        wlan: ev(),
        binding: ev()
    }), tc = eA({
        state: ev(),
        requested: ev(),
        contract: eN([
            ev(),
            eL()
        ]),
        reason: ev(),
        cache_hit: eS(),
        schema: ev(),
        capabilities: eN([
            td,
            eL()
        ])
    }), tu = eA({
        parent: eb(),
        connection: eb(),
        state: ev(),
        service_list: ev(),
        kind: ev(),
        baseline: eN([
            eP(eb()),
            eL()
        ])
    }), tp = eA({
        state: ev(),
        reason: eD(ev()),
        task_id: eD(eN([
            eb(),
            eL()
        ])),
        instance: eD(eb()),
        cwmp_id: eD(ev())
    }), t_ = eN([
        eV("waiting"),
        eV("inventory"),
        eV("classifying"),
        eV("adding_parent"),
        eV("child_names"),
        eV("adding_child"),
        eV("delete_guard"),
        eV("deleting"),
        eV("verify_delete"),
        eV("empty_parent"),
        eV("deleting_parent"),
        eV("verify_parent_delete"),
        eV("next"),
        eV("done")
    ]), tm = eA({
        owned: eP(eb()),
        pending: eN([
            ev(),
            eL()
        ]),
        pending_instance: eN([
            eb(),
            eL()
        ])
    }), tf = eN([
        eV("waiting"),
        eV("inventory"),
        eV("adding"),
        eV("verify_add"),
        eV("deleting"),
        eV("verify_delete"),
        eV("reading_disable"),
        eV("disabling"),
        eV("verifying_disable"),
        eV("next"),
        eV("done")
    ]), tg = eN([
        eV("disable"),
        eV("preserve"),
        eV("delete")
    ]), th = eA({
        parent: eb(),
        child: eb(),
        service: ev(),
        vlan: ev()
    }), tv = eA({
        state: e7,
        items: eP(ts),
        backend: eD(eB),
        operation_id: eD(eb()),
        device: eD(ev()),
        optical_sn: eD(ev()),
        cwmp_id: eD(ev()),
        revision: eD(ev()),
        mode: eD(tl),
        started_at: eD(eb()),
        completed_at: eD(eN([
            eb(),
            eL()
        ])),
        current_revision: eD(eS()),
        management_fresh: eD(eS()),
        reason: eD(ev()),
        error: eD(ev()),
        attempts: eD(eb()),
        next_retry_at: eD(eb()),
        reconcile_reason: eD(ev()),
        cwmp_contract: eD(tc),
        wan_objects: eD(eO(ev(), tu)),
        wan_lifecycle: eD(eO(ev(), tp)),
        wan_stage: eD(t_),
        wifi_objects: eD(tm),
        wifi_lifecycle: eD(eO(ev(), tp)),
        wifi_stage: eD(tf),
        wifi_cleanup: eD(tg),
        native_ownership: eD(eO(ev(), th)),
        write_performed: eD(eS()),
        readback_verified: eD(eS())
    }), ty = eN([
        eV("not_configured"),
        eV("stale_revision"),
        eV("stale_management"),
        eV("verified"),
        eV("attention_required"),
        eV("accepted_unverified"),
        eV("pending"),
        eV("recovering"),
        eV("waiting_management")
    ]), tb = eA({
        device: ev(),
        name: eN([
            ev(),
            eL()
        ]),
        group: eN([
            ev(),
            eL()
        ]),
        group_name: eN([
            ev(),
            eL()
        ]),
        template: eN([
            ev(),
            eL()
        ]),
        template_name: eN([
            ev(),
            eL()
        ]),
        optical_sn: ev(),
        adapter: ev(),
        omci_management: tn,
        management: eN([
            ti,
            eL()
        ]),
        acs_bootstrap: eG,
        provisioning: tv,
        services: eP(ts),
        ssids: eP(ts),
        wifi_sync: ty
    }), tw = eN([
        eV("discovering"),
        eV("comparing"),
        eV("planning"),
        eV("applying"),
        eV("verifying"),
        eV("configuring_listener"),
        eV("cleaning_previous"),
        eV("waiting_devices"),
        eV("ready"),
        eV("awaiting_apply"),
        eV("verified"),
        eV("blocked"),
        eV("retry_wait")
    ]), tS = eA({
        enabled: eS(),
        mode: te,
        vlan: eP(eb()),
        priority: eb(),
        address: ev(),
        acs_url: ev(),
        port: eb(),
        path: ev(),
        dhcp_enabled: eS()
    }), tk = eA({
        operation: ev(),
        key: ev(),
        value: eP(ev())
    }), tL = eA({
        state: tw,
        error: eN([
            ev(),
            eL()
        ]),
        inflight: eS(),
        ready: eS(),
        desired_version: eN([
            ev(),
            eL()
        ]),
        applied_version: eN([
            ev(),
            eL()
        ]),
        next_retry_at: eb(),
        attempts: eb(),
        desired: eN([
            tS,
            eL()
        ]),
        applied: eN([
            tS,
            eL()
        ]),
        previous: eN([
            tS,
            eL()
        ]),
        plan: eP(tk)
    }), tj = eA({
        desired: eN([
            eW,
            eL()
        ]),
        state: ev()
    }), tz = eA({
        id: ev(),
        name: eN([
            ev(),
            eL()
        ]),
        template: ev()
    }), tP = eA({
        enabled: eS(),
        mode: te,
        method: tt,
        revision: ev(),
        triggers: eP(ev()),
        interval_minutes: eb(),
        error: eN([
            ev(),
            eL()
        ]),
        devices: eP(tb),
        management_network: tL,
        omci_management: tj,
        groups: eP(tz),
        pending_devices: eP(ev()),
        onu_pins: eD(eO(ev(), eb())),
        config_error: eD(eN([
            ev(),
            eL()
        ])),
        config_load: eD(e8)
    });
    eN([
        tP,
        e0
    ]);
    let tx = eA({
        enabled: eN([
            eS(),
            eL()
        ]),
        routed_enabled: eN([
            eS(),
            eL()
        ]),
        bridge_enabled: eN([
            eS(),
            eL()
        ]),
        engine_attached: eN([
            eS(),
            eL()
        ]),
        forwarding_verified: eN([
            eS(),
            eL()
        ])
    }), tA = eA({
        entity_id: eb(),
        port_id: eN([
            eb(),
            eL()
        ])
    }), tC = eA({
        entity_id: eb(),
        filter_list_hex: eN([
            ev(),
            eL()
        ]),
        forward_operation: eN([
            eb(),
            eL()
        ]),
        number_of_entries: eN([
            eb(),
            eL()
        ])
    }), tN = eA({
        entity_id: eb(),
        received_frame_rules_hex: eN([
            eP(ev()),
            eL()
        ]),
        error: eN([
            ev(),
            eL()
        ])
    }), tE = eA({
        age_seconds: eb(),
        gem_ports: eP(tA),
        vlan_filters: eP(tC),
        vlan_operations: eP(tN)
    }), tT = eA({
        source: ev(),
        unit: ev(),
        reason: eN([
            ev(),
            eL()
        ]),
        raw: eN([
            ev(),
            eL()
        ]),
        age_seconds: eN([
            eb(),
            eL()
        ])
    }), tI = eA({
        interface: ev(),
        gem_ports: eN([
            eP(eb()),
            eL()
        ]),
        vlan_id: eN([
            eb(),
            eL()
        ]),
        onu_inventory: eN([
            tE,
            eL()
        ]),
        tx_bytes: eN([
            eb(),
            eL()
        ]),
        rx_bytes: eN([
            eb(),
            eL()
        ]),
        current_tx_kbps: eN([
            eb(),
            eL()
        ]),
        current_rx_kbps: eN([
            eb(),
            eL()
        ]),
        olt_channel_gem: eD(eb()),
        forwarding_verified: eD(eS()),
        offload: tx,
        measurements: eO(ev(), tT)
    });
    eA({});
    let tO = eA({
        entity_id: eb(),
        interval_end_time: eb(),
        corrected_bytes: eb(),
        corrected_code_words: eb(),
        uncorrectable_code_words: eb(),
        total_code_words: eb(),
        fec_seconds: eb()
    }), tR = eA({
        ani_entity_id: eN([
            eb(),
            eL()
        ]),
        control_supported: eS(),
        downstream_enabled: eN([
            eS(),
            eL()
        ]),
        upstream_enabled: eN([
            eS(),
            eL()
        ]),
        downstream_pm: eN([
            tO,
            eL()
        ]),
        measurement: tT
    }), tV = eA({
        entry: eN([
            eV(0),
            eV(1),
            eV(2)
        ]),
        username: ev(),
        active: eS()
    }), t$ = eA({
        mqtt_mac: ev(),
        optical_sn: eN([
            ev(),
            eL()
        ]),
        onu_id: eN([
            eb(),
            eL()
        ]),
        binding_generation: ev(),
        last_seen: eb(),
        reason: ev()
    }), tD = eN([
        eV("executed"),
        eV("dispatched"),
        eV("timeout"),
        eV("error")
    ]), tM = eA({
        target: ev(),
        status: tD,
        request_id: eD(ev()),
        exit_code: eD(eb()),
        output: eD(ev()),
        output_truncated: eS(),
        error: eD(ev())
    }), tq = eA({
        target: t$,
        result: tM,
        binding_current: eS()
    }), tU = eN([
        eV("not_applicable"),
        eV("accepted_and_saved"),
        eV("unconfirmed")
    ]), tW = eA({
        code: ev(),
        message: ev()
    });
    eN([
        eA({
            schema_version: eV(1),
            operation: tq,
            accounts: eN([
                eP(tV),
                eL()
            ]),
            write_status: tU
        }),
        eA({
            schema_version: eb(),
            error: tW
        })
    ]);
    let tZ = eA({
        optical_sn: ev(),
        onu_id: eb(),
        binding_generation: ev()
    }), tH = eA({
        mqtt_mac: ev(),
        binding_generation: ev()
    }), tG = eN([
        tZ,
        tH
    ]);
    eA({
        target: tG
    });
    let tF = eN([
        eA({
            kind: eV("exec"),
            script: ev(),
            timeout_seconds: eb()
        }),
        eA({
            kind: eV("accounts_read")
        }),
        eA({
            kind: eV("account_set_password"),
            entry: eb(),
            password: ev()
        }),
        eA({
            kind: eV("account_set_active"),
            entry: eb(),
            active: eS()
        })
    ]), tB = eA({
        schema_version: eb(),
        target: tZ,
        action: tF
    }), tK = eA({
        optical_sn: ev(),
        onu_id: eb(),
        model: ev(),
        optical_online: eS(),
        can_execute: eS(),
        mqtt: eN([
            t$,
            eL()
        ]),
        report_revision: eN([
            eb(),
            eL()
        ])
    });
    eN([
        eA({
            schema_version: eV(1),
            operation: tq
        }),
        eA({
            schema_version: eb(),
            error: tW
        })
    ]), eA({
        target: tG,
        script: ev(),
        timeout_seconds: eb()
    });
    let tJ = eN([
        eA({
            schema_version: eV(1),
            devices: eP(tK),
            sources: eP(t$)
        }),
        eA({
            schema_version: eb(),
            error: tW
        })
    ]);
    eN([
        eA({
            method: eV("list")
        }),
        eA({
            method: eV("report"),
            target: tZ
        }),
        eA({
            method: eV("source_report"),
            target: tH
        }),
        eA({
            method: eV("run"),
            request: tB
        })
    ]);
    let tQ = eN([
        eV("received"),
        eV("report_unavailable")
    ]), tX = eA({
        value: new ej({
            type: "unknown"
        }),
        member: ev(),
        unit: eN([
            ev(),
            eL()
        ])
    }), tY = eA({
        name: ev(),
        bytes: eb(),
        encoding: ev(),
        text: eN([
            ev(),
            eL()
        ]),
        text_omitted: eS()
    }), t0 = eA({
        schema_version: eb(),
        compressed_bytes: eb(),
        decompressed_bytes: eb(),
        fields: eO(ev(), tX),
        members: eP(tY),
        errors: eP(ev())
    }), t1 = eA({
        revision: eb(),
        last_received: eb(),
        last_processed_receipt: eN([
            eb(),
            eL()
        ]),
        last_good: eN([
            eb(),
            eL()
        ]),
        error: eN([
            ev(),
            eL()
        ]),
        report: eN([
            t0,
            eL()
        ])
    });
    eN([
        eA({
            schema_version: eV(1),
            target: t$,
            report: eN([
                t1,
                eL()
            ]),
            state: tQ
        }),
        eA({
            schema_version: eV(1),
            target: t$,
            report: eN([
                t1,
                eL()
            ]),
            read_only: eV(!0)
        }),
        eA({
            schema_version: eb(),
            error: tW
        })
    ]), eA({
        target: tG
    }), eA({
        target: tG,
        kind: eM,
        entry: eb(),
        password: ev(),
        active: eS()
    });
    let t2 = eA({
        accepted: eb(),
        rejected: eb(),
        read_errors: eb(),
        handled: eb(),
        max_intake_us: eb(),
        max_handler_us: eb()
    }), t4 = eV("pending"), t5 = eA({
        phase: eN([
            eV("starting"),
            eV("upload"),
            eV("tables")
        ]),
        received: eb(),
        expected: eN([
            eb(),
            eL()
        ])
    }), t6 = eV("ready"), t3 = eN([
        eA({
            status: t4,
            progress: eD(t5)
        }),
        eA({
            status: t6,
            chunk: eb(),
            chunks: eb(),
            bytes: eb(),
            data: ev()
        })
    ]);
    eN([
        t3,
        e0
    ]);
    let t7 = eA({
        status: t4,
        job: ev()
    }), t9 = eA({
        released: eS()
    });
    eA({
        job: ev()
    }), eA({
        job: ev(),
        chunk: eb()
    }), eN([
        t7,
        e0
    ]);
    let t8 = eA({
        accepting: eS(),
        running: eb(),
        stored: eb(),
        bytes: eb(),
        running_limit: eb(),
        stored_limit: eb(),
        bytes_limit: eb(),
        result_bytes_limit: eb()
    }), ne = eA({
        mac: ev(),
        ip: ev(),
        band: ev(),
        rssi_dbm: eN([
            eb(),
            eL()
        ]),
        rx_rate_mbps: eN([
            eb(),
            eL()
        ]),
        tx_rate_mbps: eN([
            eb(),
            eL()
        ])
    }), nt = eN([
        eV("unknown"),
        eV("octets"),
        eV("string"),
        eV("unsigned_integer"),
        eV("table"),
        eV("signed_integer"),
        eV("pointer"),
        eV("bit_field"),
        eV("enumeration"),
        eV("counter")
    ]), nn = eA({
        id: ev(),
        url: ev()
    }), nr = eA({
        name: ev(),
        kind: nt,
        index: eb(),
        mask: eb(),
        size: eb(),
        read: eS(),
        write: eS(),
        set_by_create: eS(),
        avc: eS(),
        optional: eS(),
        deprecated: eS(),
        default_hex: eN([
            ev(),
            eL()
        ]),
        reference: nn
    }), ni = eN([
        eA({
            type: eV("unsigned"),
            value: eb()
        }),
        eA({
            type: eV("signed"),
            value: eb()
        }),
        eA({
            type: eV("decimal"),
            value: ev()
        }),
        eA({
            type: eV("text"),
            value: eN([
                ev(),
                eL()
            ])
        }),
        eA({
            type: eV("octets"),
            hex: ev()
        }),
        eA({
            type: eV("table_length"),
            bytes: eb()
        })
    ]), na = eA({
        raw_hex: ev(),
        value: ni,
        sequences: eP(eb())
    }), no = eA({
        definition: nr,
        value: eN([
            ni,
            eL()
        ]),
        observations: eP(na)
    }), ns = eN([
        eV("layout"),
        eV("name_only"),
        eV("unknown")
    ]), nl = eA({
        class_id: eb(),
        name: eN([
            ev(),
            eL()
        ]),
        entities: eb(),
        records: eb(),
        support: ns
    }), nd = eA({
        code: ev(),
        message: ev(),
        offset: eb(),
        mask: eb()
    }), nc = eA({
        class_id: eb(),
        entity_id: eb(),
        name: eN([
            ev(),
            eL()
        ]),
        support: ns,
        reference: eN([
            nn,
            eL()
        ]),
        sequences: eP(eb()),
        attributes: eP(no),
        diagnostics: eP(nd)
    }), nu = eV("ready"), np = eA({
        class_id: eb(),
        entity_id: eb(),
        sequence: eb(),
        attribute_mask: eb(),
        raw_hex: ev(),
        consumed: eb(),
        remaining_hex: ev(),
        undecoded_mask: eb()
    }), n_ = eA({
        raw_hex: ev(),
        filter_outer_priority: eb(),
        filter_outer_vid: eb(),
        filter_outer_tpid_dei: eb(),
        filter_inner_priority: eb(),
        filter_inner_vid: eb(),
        filter_inner_tpid_dei: eb(),
        filter_ethertype: eb(),
        tags_to_remove: eb(),
        treatment_outer_priority: eb(),
        treatment_outer_vid: eb(),
        treatment_outer_tpid_dei: eb(),
        treatment_inner_priority: eb(),
        treatment_inner_vid: eb(),
        treatment_inner_tpid_dei: eb(),
        delete_entry: eS()
    }), nm = eA({
        class_id: eb(),
        entity_id: eb(),
        attribute: nr,
        collected: eS(),
        error: eN([
            ev(),
            eL()
        ]),
        raw_hex: ev(),
        rows: eP(ev()),
        vlan_rules: eP(n_)
    }), nf = eA({
        schema_version: eV(1),
        reference_version: ev(),
        onu_id: eN([
            eb(),
            eL()
        ]),
        uploaded_complete: eS(),
        expected_records: eb(),
        received_records: eb(),
        decoded_records: eb(),
        partial_records: eb(),
        basic_records: eb(),
        tables_requested: eS(),
        tables_collected: eS(),
        classes: eP(nl),
        entities: eP(nc),
        records: eP(np),
        tables: eP(nm),
        diagnostics: eP(nd)
    });
    eA({
        status: nu,
        report: nf
    }), eA({
        onu_id: eb(),
        optical_sn: ev(),
        tables: eS()
    });
    let ng = eN([
        eA({
            status: eV("success"),
            enabled: eS()
        }),
        eA({
            status: eV("error"),
            error: ev()
        })
    ]);
    eA({
        enabled: eS(),
        bridge: ev(),
        wan_upstream: eS(),
        wan_downstream: eS(),
        onu_bridge: eS()
    });
    let nh = eA({
        index: ev(),
        state: ev(),
        pkt_type: ev(),
        orig_tuple: ev(),
        new_tuple: ev(),
        eth: ev(),
        vlan: ev(),
        packets: eb(),
        bytes: eb(),
        counters_valid: eS(),
        packets_exact: ev(),
        bytes_exact: ev()
    }), nv = eA({
        sampled_at_ms: eb(),
        errors: eP(ev()),
        config_valid: eS(),
        engine_valid: eS(),
        mask_valid: eS(),
        routed_mask_valid: eS(),
        debug_valid: eS(),
        flows_valid: eS(),
        entries_valid: eS(),
        counters_valid: eS(),
        hooks_valid: eS(),
        total_packets_exact: ev(),
        total_bytes_exact: ev(),
        supported: eS(),
        engine_attached: eS(),
        bridge_offload_enabled: eS(),
        wan_upstream: eS(),
        wan_downstream: eS(),
        onu_bridge: eS(),
        bridge_offload_mask: eb(),
        routed_offload_mask: eb(),
        bridge_offload_debug: eS(),
        bridge: ev(),
        active_ports: eP(ev()),
        fw4_hooks_ready: eS(),
        total_entries: eb(),
        bound_entries: eb(),
        bound_ipv4_entries: eb(),
        bound_ipv6_entries: eb(),
        total_packets: eb(),
        total_bytes: eb(),
        bound_flows: eP(nh)
    }), ny = eA({
        equipment_id: eN([
            ev(),
            eL()
        ]),
        hardware_version: eN([
            ev(),
            eL()
        ]),
        software_images: eP(ev()),
        omcc_version: eN([
            eb(),
            eL()
        ]),
        errors: eP(ev())
    }), nb = eA({
        desired: eO(ev(), eb()),
        active: eO(ev(), eb()),
        pending_restart: eS(),
        allocation_blocked: eS(),
        startup_error: eN([
            ev(),
            eL()
        ]),
        config_error: eN([
            ev(),
            eL()
        ])
    }), nw = eN([
        eV("optical_on"),
        eV("optical_off"),
        eV("optical_status"),
        eV("optical_reload"),
        eV("optical_reinitialize"),
        eV("optical_shutdown")
    ]), nS = eA({
        enabled: eS(),
        downstream_tx_enabled: eS(),
        fec_enabled: eS()
    }), nk = eA({
        desired_tx_enabled: eS(),
        desired_fec_enabled: eS(),
        register: eN([
            eb(),
            eL()
        ]),
        tx_enabled: eN([
            eS(),
            eL()
        ]),
        fec_enabled: eN([
            eS(),
            eL()
        ]),
        error: eN([
            ev(),
            eL()
        ])
    }), nL = eN([
        eV("success"),
        eV("error")
    ]), nj = eN([
        eV("enabled"),
        eV("disabled"),
        eV("unknown")
    ]), nz = eA({
        settings: eD(nS),
        pon_mac: eD(nk),
        schema_version: eV(1),
        status: nL,
        action: nw,
        desired_enabled: eN([
            eS(),
            eL()
        ]),
        tx_enabled: eN([
            eS(),
            eL()
        ]),
        actor_state: nj,
        hardware_ready: eS(),
        discovery_active: eS(),
        cleanup_pending: eS(),
        error: eN([
            tW,
            eL()
        ])
    }), nP = eA({
        model: ev(),
        wavelength_tx_nm: eb(),
        wavelength_rx_nm: eb(),
        phy_rate_downlink_gbps: eb(),
        phy_rate_uplink_gbps: eb(),
        tx_power_dbm: eN([
            eb(),
            eL()
        ]),
        laser_bias_current_ma: eN([
            eb(),
            eL()
        ]),
        temperature_celsius: eN([
            eb(),
            eL()
        ]),
        vcc_voltage: eN([
            eb(),
            eL()
        ]),
        cdr_locked: eN([
            eS(),
            eL()
        ]),
        tx_enabled: eD(eS()),
        measurements: eO(ev(), tT)
    }), nx = eN([
        eV("o1_initial"),
        eV("o2_standby"),
        eV("o3_serial_number"),
        eV("o4_ranging"),
        eV("o5_operation"),
        eV("o6_intermittent_lods"),
        eV("o7_emergency_stop")
    ]), nA = eA({
        restarting: eV(!0)
    }), nC = eA({
        calls: eb(),
        failures: eb(),
        last_us: eb(),
        max_us: eb(),
        total_us: eb()
    }), nN = eA({
        port: eb(),
        interface: ev(),
        carrier: eS(),
        status: ev(),
        onu_id: eD(eb()),
        onu_sn: eD(ev()),
        link_state: ev(),
        reserved_sn: eD(ev())
    }), nE = eA({
        channel_2g: eN([
            eb(),
            eL()
        ]),
        channel_5g: eN([
            eb(),
            eL()
        ]),
        bandwidth_5g: eN([
            ev(),
            eL()
        ]),
        tx_power_pct: eN([
            eb(),
            eL()
        ]),
        measurements: eO(ev(), tT)
    }), nT = eA({
        onu_id: eb(),
        vendor: ev(),
        model: ev(),
        serial_number: ev(),
        state: nx,
        business_status: eK,
        management: eN([
            ti,
            eL()
        ]),
        provisioning: eN([
            tv,
            eL()
        ]),
        services: eP(ts),
        ssids: eP(ts),
        wifi_sync: ty,
        identity: eN([
            ny,
            eL()
        ]),
        identity_age_seconds: eN([
            eb(),
            eL()
        ]),
        identity_current: eS(),
        fiber_distance_m: eN([
            eb(),
            eL()
        ]),
        ranging_delay_rtd_ns: eN([
            eb(),
            eL()
        ]),
        equalization_delay_bits: eN([
            eb(),
            eL()
        ]),
        optical_rx_power_dbm: eN([
            eb(),
            eL()
        ]),
        optical_tx_power_dbm: eN([
            eb(),
            eL()
        ]),
        firmware_version: ev(),
        hardware_version: ev(),
        uptime_seconds: eN([
            eb(),
            eL()
        ]),
        fec: eD(tR),
        data_path: tI,
        wifi_mesh: nE,
        connected_clients: eN([
            eP(ne),
            eL()
        ]),
        measurements: eO(ev(), tT)
    }), nI = eA({
        id: ev(),
        last_seen_sec_ago: eb(),
        last_payload_bytes: eb()
    }), nO = eA({
        ubus: eD(eO(ev(), nC)),
        jobs: eD(t8),
        onu_pinning: eD(nb),
        fpga_status: ev(),
        pon_mac: eD(nk),
        provisioning: eN([
            tP,
            eL()
        ]),
        optical_transceiver: nP,
        switch_ports: eP(nN),
        sub_gateways: eP(nT),
        telemetry_gateways: eP(nI),
        npu: eD(nv),
        ipc: eD(t2)
    }), nR = eN([
        eV("plan"),
        eV("apply"),
        eV("management_plan"),
        eV("management_apply"),
        eV("reset_state"),
        eV("reconcile"),
        eV("retry")
    ]), nV = eN([
        eA({
            operation_ids: eP(eb()),
            revision: ev()
        }),
        eA({
            started: eV(!0),
            mode: tl
        }),
        eA({
            reset: eV(!0),
            device: ev()
        }),
        eA({
            operation_ids: eP(eb()),
            mode: tl,
            reconcile: eD(eS()),
            retry: eD(eS())
        }),
        e0
    ]);
    eA({
        action: nR,
        target: ev(),
        management: eD(eS()),
        item: eD(ev())
    });
    let n$ = eN([
        eV("none"),
        eV("effective"),
        eV("pending_add"),
        eV("pending_change"),
        eV("pending_remove")
    ]), nD = eA({
        active_onu_id: eN([
            eb(),
            eL()
        ]),
        desired_onu_id: eN([
            eb(),
            eL()
        ]),
        state: n$,
        pending_restart: eS()
    }), nM = eN([
        eV("pon_logical"),
        eV("associated_with"),
        eV("learned_behind")
    ]), nq = eA({
        id: ev(),
        mac: ev(),
        hostname: eN([
            ev(),
            eL()
        ]),
        addresses: eP(ev()),
        relation: nM,
        source: ev(),
        interface: eN([
            ev(),
            eL()
        ])
    }), nU = eN([
        eV("ok"),
        eV("partial"),
        eV("unavailable")
    ]), nW = eA({
        id: ev(),
        state: nU,
        sampled_at: eb(),
        reason: eN([
            ev(),
            eL()
        ])
    }), nZ = eN([
        eV("snapshot_expired"),
        eV("node_not_found"),
        eV("invalid_cursor")
    ]), nH = eN([
        eA({
            status: eV("ok"),
            snapshot_id: ev(),
            parent_node_id: ev(),
            clients: eP(nq),
            associated_client_count: eN([
                eb(),
                eL()
            ]),
            learned_host_count: eN([
                eb(),
                eL()
            ]),
            complete: eS(),
            next_cursor: eN([
                ev(),
                eL()
            ]),
            sources: eP(nW)
        }),
        eA({
            status: eV("error"),
            code: nZ
        })
    ]);
    eA({
        node_id: ev(),
        snapshot_id: eD(ev()),
        cursor: eD(ev()),
        limit: eD(eb())
    });
    let nG = eA({
        model: ev(),
        wavelength_tx_nm: eb(),
        wavelength_rx_nm: eb(),
        nominal_downlink_gbps: eb(),
        nominal_uplink_gbps: eb(),
        tx_power_dbm: eN([
            eb(),
            eL()
        ]),
        laser_bias_current_ma: eN([
            eb(),
            eL()
        ]),
        temperature_celsius: eN([
            eb(),
            eL()
        ]),
        vcc_voltage: eN([
            eb(),
            eL()
        ]),
        tx_enabled: eN([
            eS(),
            eL()
        ]),
        measurements: eO(ev(), tT)
    }), nF = eA({
        name: ev(),
        mac: eN([
            ev(),
            eL()
        ]),
        carrier: eN([
            eS(),
            eL()
        ]),
        speed_mbps: eN([
            eb(),
            eL()
        ]),
        duplex: eN([
            ev(),
            eL()
        ]),
        bridge_members: eP(ev()),
        addresses: eP(ev())
    }), nB = eA({
        interface: ev(),
        device: eN([
            ev(),
            eL()
        ]),
        protocol: eN([
            ev(),
            eL()
        ]),
        up: eS(),
        addresses: eP(ev())
    }), nK = eA({
        model: eN([
            ev(),
            eL()
        ]),
        firmware_version: eN([
            ev(),
            eL()
        ]),
        uptime_seconds: eN([
            eb(),
            eL()
        ]),
        fpga_status: ev(),
        optical: nG,
        interfaces: eP(nF),
        uplinks: eP(nB)
    }), nJ = eA({
        observer_node_id: ev(),
        rx_bytes: eN([
            eb(),
            eL()
        ]),
        tx_bytes: eN([
            eb(),
            eL()
        ]),
        current_rx_kbps: eN([
            eb(),
            eL()
        ]),
        current_tx_kbps: eN([
            eb(),
            eL()
        ]),
        onu_inventory: eN([
            tE,
            eL()
        ]),
        offload: tx,
        measurements: eO(ev(), tT)
    }), nQ = eA({
        report_revision: eb(),
        binding_generation: ev(),
        age_seconds: eb(),
        ip: eN([
            ev(),
            eL()
        ]),
        bridge_ip: eN([
            ev(),
            eL()
        ]),
        mac: eN([
            ev(),
            eL()
        ]),
        connection_type_raw: eN([
            ev(),
            eL()
        ]),
        uptime_seconds: eN([
            eb(),
            eL()
        ]),
        cpu_usage_raw: eN([
            eb(),
            eL()
        ]),
        memory_usage_raw: eN([
            eb(),
            eL()
        ])
    }), nX = eA({
        hl202: eN([
            nQ,
            eL()
        ])
    }), nY = eA({
        code: ev(),
        node_id: eN([
            ev(),
            eL()
        ])
    }), n0 = eA({
        id: ev(),
        source: ev(),
        target: ev(),
        relation: nM,
        data_interface: eN([
            ev(),
            eL()
        ]),
        carrier: eN([
            eS(),
            eL()
        ]),
        onu_rx_power_dbm: eN([
            eb(),
            eL()
        ]),
        onu_tx_power_dbm: eN([
            eb(),
            eL()
        ]),
        equalization_delay_bits: eN([
            eb(),
            eL()
        ]),
        data_path: eN([
            nJ,
            eL()
        ]),
        measurements: eO(ev(), tT)
    }), n1 = eA({
        serial_number: eN([
            ev(),
            eL()
        ]),
        onu_id: eN([
            eb(),
            eL()
        ]),
        vendor: eN([
            ev(),
            eL()
        ]),
        model: eN([
            ev(),
            eL()
        ]),
        hardware_version: eN([
            ev(),
            eL()
        ]),
        firmware_version: eN([
            ev(),
            eL()
        ]),
        registration: eN([
            nx,
            eL()
        ]),
        business: eN([
            eK,
            eL()
        ]),
        management: eN([
            ti,
            eL()
        ]),
        provisioning: eN([
            tv,
            eL()
        ]),
        services: eP(ts),
        ssids: eP(ts),
        wifi_sync: eN([
            ty,
            eL()
        ]),
        identity: eN([
            ny,
            eL()
        ]),
        identity_current: eS(),
        identity_age_seconds: eN([
            eb(),
            eL()
        ]),
        uptime_seconds: eN([
            eb(),
            eL()
        ]),
        fec: eN([
            tR,
            eL()
        ]),
        binding: nD,
        extensions: nX,
        measurements: eO(ev(), tT)
    }), n2 = eN([
        eT(eA({
            kind: eV("controller")
        }), nK),
        eT(eA({
            kind: eV("onu")
        }), n1)
    ]), n4 = eA({
        id: ev(),
        label: ev(),
        detail: n2
    }), n5 = eN([
        eA({
            status: eV("ok"),
            snapshot_id: ev(),
            node: n4
        }),
        eA({
            status: eV("error"),
            code: nZ
        })
    ]);
    eA({
        node_id: ev(),
        snapshot_id: eD(ev())
    });
    let n6 = eA({
        schema_version: eV(1),
        snapshot_id: ev(),
        generated_at: eb(),
        snapshot_ttl_seconds: eb(),
        nodes: eP(n4),
        links: eP(n0),
        sources: eP(nW),
        issues: eP(nY)
    }), n3 = eA({
        error: eN([
            ev(),
            eA({
                code: ev(),
                message: ev()
            })
        ])
    });
    class n7 extends Error {
        code;
        constructor(e, t){
            super(t), this.code = e, this.name = "RpcError";
        }
    }
    function n9(e) {
        let t = n3.safeParse(e);
        if (t.success) {
            let e = t.data.error;
            throw "string" == typeof e ? new n7("rpc", e) : new n7(e.code, e.message);
        }
        return e;
    }
    let n8 = {
        parse (e) {
            let t = tJ.parse(n9(e));
            if ("object" == typeof t && null !== t && "error" in t) throw n9(t), Error("Unexpected RPC error");
            return t;
        }
    }, re = {
        parse (e) {
            let t = nV.parse(n9(e));
            if ("error" in t) throw Error(t.error);
            return t;
        }
    };
    eO(ev(), eA({
        carrier: eD(eS()),
        mac: eD(ev()),
        link: eD(eA({
            speed: eD(eb()),
            duplex: eD(ev()),
            autoneg: eD(eS())
        })),
        stats: eD(eO(ev(), eb()))
    }));
    let rt = {
        getCapabilities: {
            parse: (e)=>e6.parse(n9(e))
        },
        opticalStatus: nz,
        opticalSet: nz,
        getStatus: {
            parse: (e)=>nO.parse(n9(e))
        },
        getTopology: {
            parse: (e)=>n6.parse(n9(e))
        },
        getTopologyNode: {
            parse: (e)=>n5.parse(n9(e))
        },
        getTopologyClients: {
            parse: (e)=>nH.parse(n9(e))
        },
        getSync: {
            parse: (e)=>tP.parse(n9(e))
        },
        configCheck: {
            parse (e) {
                if ("object" == typeof e && null !== e && "error" in e && ("valid" in e || "revision" in e || "devices" in e)) throw Error("Mixed configuration check result");
                return e3.parse(e);
            }
        },
        npuStatus: nv,
        configReload: {
            parse: (e)=>tP.parse(n9(e))
        },
        restartService: {
            parse: (e)=>nA.parse(n9(e))
        },
        sync: {
            parse: (e)=>re.parse(n9(e))
        },
        npuSet: ng,
        mibStart: {
            parse: (e)=>t7.parse(n9(e))
        },
        mibResult: {
            parse: (e)=>t3.parse(n9(e))
        },
        jobRelease: {
            parse: (e)=>t9.parse(n9(e))
        },
        hl202List: {
            parse: (e)=>n8.parse(n9(e))
        },
        hl202Report: {
            parse: (e)=>t7.parse(n9(e))
        },
        hl202AccountsStart: {
            parse: (e)=>t7.parse(n9(e))
        },
        hl202AccountUpdate: {
            parse: (e)=>t7.parse(n9(e))
        },
        hl202ExecStart: {
            parse: (e)=>t7.parse(n9(e))
        },
        jobResult: {
            parse: (e)=>t3.parse(n9(e))
        },
        getCalibration: {
            parse: (e)=>eY.parse(n9(e))
        },
        saveCalibration: {
            parse: (e)=>e1.parse(n9(e))
        },
        applyCalibration: {
            parse: (e)=>t7.parse(n9(e))
        }
    };
    function rn() {
        var e;
        let t, n, i, a, o, s, l, d, c, u, p, m, f, g, h, v, y, b, w, S, k, j, z, P, x, A;
        return r ??= (e = L.rpc, t = e.declare({
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
            method: "get_topology",
            reject: !0
        }), s = e.declare({
            object: "fttr",
            method: "get_topology_node",
            params: [
                "node_id",
                "snapshot_id"
            ],
            reject: !0
        }), l = e.declare({
            object: "fttr",
            method: "get_topology_clients",
            params: [
                "node_id",
                "snapshot_id",
                "cursor",
                "limit"
            ],
            reject: !0
        }), d = e.declare({
            object: "fttr",
            method: "get_sync",
            reject: !0
        }), c = e.declare({
            object: "fttr",
            method: "config_check",
            reject: !0
        }), u = e.declare({
            object: "fttr",
            method: "npu_status",
            reject: !0
        }), p = e.declare({
            object: "fttr",
            method: "config_reload",
            reject: !0
        }), m = e.declare({
            object: "fttr",
            method: "restart_service",
            reject: !0
        }), f = e.declare({
            object: "fttr",
            method: "sync",
            params: [
                "action",
                "target",
                "management",
                "item"
            ],
            reject: !0
        }), g = e.declare({
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
        }), h = e.declare({
            object: "fttr",
            method: "mib_start",
            params: [
                "onu_id",
                "optical_sn",
                "tables"
            ],
            reject: !0
        }), v = e.declare({
            object: "fttr",
            method: "mib_result",
            params: [
                "job",
                "chunk"
            ],
            reject: !0
        }), y = e.declare({
            object: "fttr",
            method: "job_release",
            params: [
                "job"
            ],
            reject: !0
        }), b = e.declare({
            object: "fttr",
            method: "hl202_list",
            reject: !0
        }), w = e.declare({
            object: "fttr",
            method: "hl202_report",
            params: [
                "target"
            ],
            reject: !0
        }), S = e.declare({
            object: "fttr",
            method: "hl202_accounts_start",
            params: [
                "target"
            ],
            reject: !0
        }), k = e.declare({
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
        }), j = e.declare({
            object: "fttr",
            method: "hl202_exec_start",
            params: [
                "target",
                "script",
                "timeout_seconds"
            ],
            reject: !0
        }), z = e.declare({
            object: "fttr",
            method: "job_result",
            params: [
                "job",
                "chunk"
            ],
            reject: !0
        }), P = e.declare({
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
        }), A = e.declare({
            object: "fttr",
            method: "apply_calibration",
            reject: !0
        }), {
            getCapabilities: async ()=>rt.getCapabilities.parse(await t()),
            opticalStatus: async ()=>rt.opticalStatus.parse(await n()),
            opticalSet: async (e)=>rt.opticalSet.parse(await i(e.enabled, e.downstream_tx_enabled, e.fec_enabled)),
            getStatus: async ()=>rt.getStatus.parse(await a()),
            getTopology: async ()=>rt.getTopology.parse(await o()),
            getTopologyNode: async (e)=>rt.getTopologyNode.parse(await s(e.node_id, e.snapshot_id)),
            getTopologyClients: async (e)=>rt.getTopologyClients.parse(await l(e.node_id, e.snapshot_id, e.cursor, e.limit)),
            getSync: async ()=>rt.getSync.parse(await d()),
            configCheck: async ()=>rt.configCheck.parse(await c()),
            npuStatus: async ()=>rt.npuStatus.parse(await u()),
            configReload: async ()=>rt.configReload.parse(await p()),
            restartService: async ()=>rt.restartService.parse(await m()),
            sync: async (e)=>rt.sync.parse(await f(e.action, e.target, e.management, e.item)),
            npuSet: async (e)=>rt.npuSet.parse(await g(e.enabled, e.bridge, e.wan_upstream, e.wan_downstream, e.onu_bridge)),
            mibStart: async (e)=>rt.mibStart.parse(await h(e.onu_id, e.optical_sn, e.tables)),
            mibResult: async (e)=>rt.mibResult.parse(await v(e.job, e.chunk)),
            jobRelease: async (e)=>rt.jobRelease.parse(await y(e.job)),
            hl202List: async ()=>rt.hl202List.parse(await b()),
            hl202Report: async (e)=>rt.hl202Report.parse(await w(e.target)),
            hl202AccountsStart: async (e)=>rt.hl202AccountsStart.parse(await S(e.target)),
            hl202AccountUpdate: async (e)=>rt.hl202AccountUpdate.parse(await k(e.target, e.kind, e.entry, e.password, e.active)),
            hl202ExecStart: async (e)=>rt.hl202ExecStart.parse(await j(e.target, e.script, e.timeout_seconds)),
            jobResult: async (e)=>rt.jobResult.parse(await z(e.job, e.chunk)),
            getCalibration: async ()=>rt.getCalibration.parse(await P()),
            saveCalibration: async (e)=>rt.saveCalibration.parse(await x(e.data)),
            applyCalibration: async ()=>rt.applyCalibration.parse(await A())
        });
    }
    let rr = async ()=>rn().getCapabilities(), ri = [
        "INTERNET",
        "OTHER",
        "IPTV",
        "VOIP"
    ];
    function ra(e) {
        return Array.isArray(e) ? e.map(String) : String(e ?? "").split(/\s+/).filter(Boolean);
    }
    function ro() {
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
    function rs(e) {
        return String(e.name || e.ssid || e.optical_sn || e[".name"]);
    }
    function rl(e, t) {
        return e.wifi.filter((e)=>e.template === t).map((e)=>[
                e[".name"],
                rs(e)
            ]);
    }
    function rd(e) {
        let t = ro();
        if (t.group.some((t)=>t.template === e)) throw Error(_("Template is in use."));
        for (let n of t.wifi)n.template === e && ru(n[".name"]);
        for (let n of [
            ...t.network,
            ...t.wifi
        ])n.template === e && L.uci.remove("fttr", n[".name"]);
    }
    function rc(e) {
        if (ro().device.some((t)=>t.group === e)) throw Error(_("Group is used by devices. Reassign those devices before deleting it."));
    }
    function ru(e) {
        for (let t of ro().network){
            let n = ra(t.ssid);
            if (n.includes(e)) {
                let r = n.filter((t)=>t !== e);
                r.length ? L.uci.set("fttr", t[".name"], "ssid", r) : L.uci.unset("fttr", t[".name"], "ssid");
            }
        }
    }
    function rp(e, t) {
        let n = e?.vendor || e?.serial_number.slice(0, 4);
        return "HWTC" === n && (!t || t.has("hwtc")) ? "hwtc" : e?.model?.startsWith("HL202") && (!t || t.has("hl202")) ? "hl202" : ("STAR" === n || e?.model?.includes("SG631") || e?.serial_number.startsWith("STAR")) && (!t || t.has("star")) ? "star" : "generic";
    }
    function r_(e) {
        let t = ra(e);
        return t.length ? !!t.every((e)=>ri.includes(e)) || _("WAN Service List may only contain INTERNET, OTHER, IPTV, and VOIP.") : _("Select at least one WAN Service List label.");
    }
    function rm(e) {
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
            let e = r_(t.service_list);
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
            for (let e of ra(t.ssid)){
                let n = i.get(e);
                n && n.template === t.template || a("network", t, "ssid", _("Select SSIDs belonging to this network's template."));
            }
        }
        for (let t of e.device)r.has(String(t.group || "")) || a("device", t, "group", _("Select an existing group."));
        return t;
    }
    function rf(e, t) {
        return e.children.find((e)=>e.subsection?.sectiontype === t)?.subsection;
    }
    function rg(e) {
        return ({
            device: _("Device"),
            group: _("Group"),
            template: _("Template"),
            wifi: _("SSID"),
            network: _("Network")
        })[e];
    }
    async function rh(e, t) {
        let n = e.currentTarget;
        n.disabled = !0;
        try {
            await t();
        } catch (e) {
            L.ui.addNotification(null, d("p", {
                children: String(e instanceof Error ? e.message : e)
            }), "error");
        } finally{
            n.disabled = !L.hasViewPermission();
        }
    }
    function rv(e, t) {
        var n, r, i;
        let a = function(e) {
            let t = new Map();
            for (let n of rm(e)){
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
        }(ro());
        L.ui.showModal(_("Review and repair configuration"), (i = {
            children: [
                d("p", {
                    children: _("Each item below identifies a configuration problem. Choose Edit to keep the item and correct its fields, or delete it if it is no longer needed.")
                }),
                d("p", {
                    children: _("A missing group means a device points to a deleted group. Edit the device and select an existing group. If no suitable group exists, close this dialog and create a group first.")
                }),
                d("p", {
                    children: _("Repairs are staged in LuCI. Close this dialog, use Save & Apply, then run Check again to verify the applied configuration.")
                }),
                ...a.length ? a.map((n)=>{
                    var r, i, a, o, s;
                    return s = {
                        class: "cbi-section",
                        children: [
                            (i = {
                                children: [
                                    rg(n.kind),
                                    ": ",
                                    rs(n.row),
                                    " ",
                                    (r = {
                                        children: d("code", {
                                            children: n.sectionId
                                        })
                                    }, d("small", r))
                                ]
                            }, d("h4", i)),
                            (a = {
                                children: n.issues.map((e)=>{
                                    var t, r, i;
                                    return i = {
                                        children: [
                                            d("strong", {
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
                                            ].includes(e.field) && ra(n.row[e.field]).length ? (r = {
                                                children: [
                                                    " ",
                                                    d("code", {
                                                        children: ra(n.row[e.field]).join(", ")
                                                    })
                                                ]
                                            }, d(l, r)) : null
                                        ]
                                    }, d("li", i);
                                })
                            }, d("ul", a)),
                            d("button", {
                                class: "cbi-button cbi-button-action",
                                type: "button",
                                disabled: !L.hasViewPermission(),
                                onclick: (t)=>rh(t, async ()=>{
                                        if (!L.hasViewPermission()) return;
                                        let t = rf(e, n.kind);
                                        if (!t) throw Error(_("Configuration editor is unavailable."));
                                        L.ui.hideModal(), await t.renderMoreOptionsModal(n.sectionId);
                                    }),
                                children: _("Edit to repair")
                            }),
                            " ",
                            (o = {
                                class: "cbi-button cbi-button-negative",
                                type: "button",
                                disabled: !L.hasViewPermission(),
                                onclick: ()=>{
                                    var r, i, a;
                                    L.ui.showModal(_("Delete this configuration?"), (a = {
                                        children: [
                                            (r = {
                                                children: [
                                                    d("strong", {
                                                        children: [
                                                            rg(n.kind),
                                                            ": ",
                                                            rs(n.row)
                                                        ]
                                                    }),
                                                    " ",
                                                    d("code", {
                                                        children: n.sectionId
                                                    })
                                                ]
                                            }, d("p", r)),
                                            d("p", {
                                                children: "template" === n.kind ? _("This also deletes the template's SSIDs and networks. Templates used by groups cannot be deleted.") : "device" === n.kind ? _("This removes the device's FTTR configuration and stops managing it. It does not delete the physical device.") : _("This removes the selected configuration entry. Existing reference checks and binding cleanup still apply.")
                                            }),
                                            (i = {
                                                class: "right",
                                                children: [
                                                    d("button", {
                                                        class: "cbi-button",
                                                        type: "button",
                                                        onclick: ()=>rv(e, t),
                                                        children: _("Cancel")
                                                    }),
                                                    " ",
                                                    d("button", {
                                                        class: "cbi-button cbi-button-negative",
                                                        type: "button",
                                                        disabled: !L.hasViewPermission(),
                                                        onclick: (r)=>rh(r, async ()=>{
                                                                if (!L.hasViewPermission()) return;
                                                                let i = rf(e, n.kind);
                                                                if (!i) throw Error(_("Configuration editor is unavailable."));
                                                                await i.handleRemove(n.sectionId, r), rv(e, t);
                                                            }),
                                                        children: _("Delete this configuration")
                                                    })
                                                ]
                                            }, d("div", i))
                                        ]
                                    }, d("div", a)));
                                },
                                children: _("Delete this configuration")
                            }, d("button", o))
                        ]
                    }, d("div", s);
                }) : [
                    d("p", {
                        children: _("No problems were found by the local configuration checks. Use Check to see the backend result after Save & Apply.")
                    })
                ],
                ...t ? [
                    (n = {
                        children: [
                            d("summary", {
                                children: _("Last backend check result")
                            }),
                            d("pre", {
                                style: "white-space:pre-wrap;overflow-wrap:anywhere",
                                children: t
                            })
                        ]
                    }, d("details", n))
                ] : [],
                (r = {
                    class: "right",
                    children: d("button", {
                        class: "cbi-button",
                        type: "button",
                        onclick: ()=>L.ui.hideModal(),
                        children: _("Close")
                    })
                }, d("div", r))
            ]
        }, d("div", i)));
    }
    L.rpc.declare({
        object: "luci-rpc",
        method: "getNetworkDevices",
        expect: {
            "": {}
        },
        reject: !0
    });
    let ry = async ()=>rn().getStatus(), rb = async ()=>rn().configCheck(), rw = async ()=>rn().configReload(), rS = async ()=>rn().restartService(), rk = L.view, rL = L.uci, rj = L.form;
    async function rz(e, t, n) {
        try {
            let r = await e();
            t.textContent = JSON.stringify(r, null, 2), n?.(r);
        } catch (e) {
            t.textContent = String(e), n?.({
                error: String(e)
            });
        }
    }
    let main = rk.extend({
        async load () {
            let e = await rr();
            if (!e.pages.config) throw Error(_("This page is not supported by the installed FTTR build."));
            await rL.load("fttr"), rL.sections("fttr", "provisioning").length || rL.add("fttr", "provisioning", "provisioning"), rL.sections("fttr", "management").length || rL.add("fttr", "management", "management");
            let [t, n] = await Promise.all([
                rb().catch((e)=>({
                        error: String(e)
                    })),
                ry().catch((e)=>({
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
            let o, s, l, S, k, j = new rj.Map("fttr", _("FTTR configuration")), z = j.section(rj.NamedSection, "acs", "acs");
            z.addremove = !1, z.anonymous = !1;
            let P = rL.sections("fttr", "provisioning")[0]?.[".name"] ?? "provisioning";
            (function(e, t, n) {
                e.tab("basic", t);
                let r = e.taboption("basic", L.form.SectionValue, "_acs", L.form.NamedSection, "acs", "acs").subsection;
                r.addremove = !1, r.anonymous = !1;
                let i = u(r, L.form.Flag, "enabled", _("Enable ACS"));
                i.default = "1", i.rmempty = !1, (i = u(r, L.form.Value, "port", _("Listen port"), "port")).default = "7547", i.rmempty = !1, (i = u(r, L.form.Value, "path", _("CWMP path"))).default = "/cwmp", i.rmempty = !1, i.validate = (e, t)=>!!t.startsWith("/") || _("The path must start with '/'."), (i = u(r, L.form.Value, "state_file", _("ACS state file"))).default = "/var/lib/fttr/acs-state.json", i.rmempty = !1, i.validate = (e, t)=>!!t.startsWith("/") || _("The state file path must be absolute."), (i = u(r, L.form.Value, "username", _("HTTP Basic username"))).optional = !0, i.rmempty = !0, (i = u(r, L.form.Value, "password", _("HTTP Basic password"))).password = !0, i.optional = !0, i.rmempty = !0;
                let a = e.taboption("basic", L.form.SectionValue, "_management", L.form.NamedSection, "management", "management").subsection;
                a.addremove = !1, (i = u(a, L.form.Flag, "enabled", _("Enable management network"))).default = "1", i.rmempty = !1, (i = m(a, "mode", _("Management application mode"), [
                    [
                        "manual",
                        _("Manual")
                    ],
                    [
                        "auto",
                        _("Automatic")
                    ]
                ])).default = "auto", i.rmempty = !1, i.description = _("Manual mode only discovers and plans. Use Apply management configuration on the Synchronization page to create or update the isolated network, ACS listener and child TR069 settings."), (i = u(a, L.form.Value, "address", _("Management IPv4 address/prefix"), "cidr4")).default = "192.168.46.1/24", i.rmempty = !1, i.description = _("The local ACS binds to this address. The child ACS URL is generated from this address, the ACS port and CWMP path."), (i = u(a, L.form.DummyValue, "_generated_acs_url", _("Generated ACS URL"))).cfgvalue = ()=>{
                    let t = e.map.data, n = String(t.get("fttr", "management", "address") || "192.168.46.1/24").split("/")[0];
                    return `http://${n}:${t.get("fttr", "acs", "port") || "7547"}${t.get("fttr", "acs", "path") || "/cwmp"}`;
                }, (i = u(a, L.form.DynamicList, "vlan", _("TR069 VLANs"), "range(1,4094)")).default = [
                    "46"
                ], i.rmempty = !1, i.description = _("All listed VLANs share one management bridge and DHCP pool. Retain an existing listed management VLAN; the first VLAN is the fallback."), i.validate = (e, t)=>!!("" === t || /^\d+$/.test(t) && Number(t) >= 1 && 4094 >= Number(t)) || _("Enter a VLAN ID in 1\u20134094.");
                let o = i.parse;
                for (let [e, t, n] of (i.parse = function(e) {
                    let t = this.formvalue(e) || [];
                    return t.length ? new Set(t.map(Number)).size !== t.length ? Promise.reject(Error(_("Duplicate VLAN IDs are not allowed."))) : o.call(this, e) : Promise.reject(Error(_("Enter at least one VLAN ID in 1\u20134094.")));
                }, (i = u(a, L.form.Value, "priority", _("Priority"), "range(0,7)")).default = "0", i.rmempty = !1, (i = u(a, L.form.Flag, "dhcp_enabled", _("Enable management DHCP"))).default = "1", i.rmempty = !1, [
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
                ]))(i = u(a, L.form.Value, e, t)).default = n, i.rmempty = !1, i.depends("dhcp_enabled", "1");
                let s = e.taboption("basic", L.form.SectionValue, "_policy", L.form.NamedSection, n, "provisioning").subsection;
                for (let [e, t] of (s.addremove = !1, s.anonymous = !1, (i = u(s, L.form.Flag, "enabled", _("Enable provisioning"))).default = "1", i.rmempty = !1, (i = u(s, L.form.Flag, "allow_unsupported_as_bridge", _("Allow unsupported ONUs as bridge"))).default = "1", i.rmempty = !1, i.description = _("Automatically provision standard G.988 transparent Layer 2 bridge for unrecognized or third-party GPON ONUs in O5 state."), (i = m(s, "mode", _("Synchronization mode"), [
                    [
                        "auto",
                        _("Automatic")
                    ],
                    [
                        "manual",
                        _("Manual")
                    ]
                ])).default = "auto", i.description = _("Manual mode only saves configuration; use Apply differences on the Synchronization page to send it to devices. Automatic mode synchronizes after Save & Apply when Configuration changed is selected."), i = u(s, L.form.MultiValue, "trigger", _("Automatic triggers")), [
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
                ], i.retain = !0, i.depends("mode", "auto"), (i = u(s, L.form.Value, "interval_minutes", _("Periodic synchronization interval (minutes)"))).default = "30", i.retain = !0, i.depends("mode", "auto"), i.validate = (e, t)=>!!(/^(0|[1-9][0-9]*)$/.test(t) && (0 === Number(t) || Number(t) >= 1 && 1440 >= Number(t))) || _("Use 0 to disable, or 1\u20131440 minutes."), (i = u(s, L.form.Value, "freshness", _("CWMP freshness (seconds)"), "range(1,86400)")).default = "180";
            })(z, _("Basic"), P), t = e.connectedDevices ?? [], n = e.pinning, r = e.capabilities, o = new Map(t.map((e)=>[
                    e.serial_number,
                    e
                ])), l = new Set((s = (r?.adapters ?? []).map((e)=>[
                    e.id,
                    "generic" === e.id ? _("Generic G.988 Bridge") : e.name
                ])).map((e)=>{
                let [t] = e;
                return t;
            })), S = (e)=>{
                let t = o.get(e), n = L.uci.sections("fttr", "device").find((t)=>t.optical_sn === e), r = t?.model || String(n?.adapter || _("Unknown model"));
                return `${r} \xb7 ${e} \xb7 ${t?.state === "o5_operation" ? _("Connected") : _("Offline")}${t?.onu_id != null ? ` \xb7 ONU ${t.onu_id}` : ""}`;
            }, z.tab("devices", _("Devices & groups")), w(v(z, "devices", "_groups", "group", _("Groups"), (e)=>{
                y(e, "_name", _("Group"), (e)=>String(L.uci.get("fttr", e, "name") || e)), u(e, L.form.Value, "name", _("Name")).modalonly = !0, g(e, "template", _("Template"), "template").modalonly = !0;
            }), rc), v(z, "devices", "_devices", "device", _("Devices"), (e)=>{
                y(e, "_device", _("Device"), (e)=>{
                    let t = String(L.uci.get("fttr", e, "optical_sn") || "");
                    return t ? S(t) : _("New device");
                }), y(e, "_active_pin", _("Active allocation"), (e)=>{
                    let r = String(L.uci.get("fttr", e, "optical_sn") || ""), i = n?.active[r.toUpperCase()], a = t.find((e)=>e.serial_number.toUpperCase() === r.toUpperCase())?.onu_id, o = L.uci.get("fttr", e, "onu_id"), s = (null == o || "" === o ? void 0 : Number(o)) !== i;
                    return [
                        null != a ? `fttr${a + 1}` : _("Not registered"),
                        null != i ? `${_("Reserved")}: fttr${i + 1}` : _("Automatic allocation"),
                        s ? _("Pending restart") : ""
                    ].filter(Boolean).join(" \xb7 ");
                }), e.tab("general", _("General Settings")), e.tab("cwmp", _("CWMP Settings")), e.tab("advanced", _("Advanced Settings"));
                let r = p(e, "general", L.form.ListValue, "optical_sn", _("Connected device"));
                r.modalonly = !0, r.rmempty = !1, r.description = _("Lists supported devices registered on the optical link, including devices that have not sent an ACS Inform. Devices already configured are omitted when adding a new device.");
                let i = r.renderWidget;
                r.renderWidget = function(e, n, r) {
                    this.keylist = [], this.vallist = [];
                    let a = String(L.uci.get("fttr", e, "optical_sn") || ""), o = new Set(L.uci.sections("fttr", "device").filter((t)=>t[".name"] !== e).map((e)=>e.optical_sn));
                    for (let e of t)"o5_operation" === e.state && rp(e, l) && !o.has(e.serial_number) && this.value(e.serial_number, S(e.serial_number));
                    a && !this.keylist.includes(a) && this.value(a, S(a));
                    let s = r || a || this.keylist[0] || "";
                    return i.call(this, e, n, s);
                }, r.onchange = (e, t, n)=>{
                    let r = rp(o.get(n), l);
                    a.getUIElement(t)?.setValue(r);
                }, r.validate = (e, t)=>t ? !L.uci.sections("fttr", "device").some((n)=>n[".name"] !== e && n.optical_sn === t) || _("Device already configured.") : _("Select device."), r.write = (e, t)=>{
                    L.uci.set("fttr", e, "optical_sn", t);
                    let n = rp(o.get(t), l);
                    L.uci.get("fttr", e, "adapter") || L.uci.set("fttr", e, "adapter", n);
                };
                let a = f(e, "general", "adapter", _("Device adapter"), s);
                a.modalonly = !0, a.default = "generic", a.rmempty = !1;
                let u = a.renderWidget;
                a.renderWidget = function(e, t, n) {
                    let r = String(L.uci.get("fttr", e, "optical_sn") || ""), i = rp(o.get(r), l), a = n || L.uci.get("fttr", e, "adapter") || i;
                    return a && !this.keylist.includes(a) && this.value(a, a), u.call(this, e, t, a);
                }, a.write = (e, t)=>{
                    let n = String(L.uci.get("fttr", e, "optical_sn") || ""), r = rp(o.get(n), l);
                    L.uci.set("fttr", e, "adapter", t || r || "generic");
                };
                let m = f(e, "general", "provisioning_method", _("Provisioning method"), [
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
                m.modalonly = !0, m.retain = !0, m.depends("adapter", "hl202"), m.description = _("HL202 defaults to native command provisioning with readback verification. Builds without MQTT use ACS. Transport failures require reconciliation and do not switch to ACS automatically."), function(e, t, n, r, i) {
                    let a = arguments.length > 5 && void 0 !== arguments[5] && arguments[5], o = p(e, t, c.RichListValue, n, r);
                    return o.rmempty = a, o.optional = a, o.default = "", h(o, ()=>[
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
                let g = f(e, "general", "onu_id", _("Fixed interface"), [
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
                g.modalonly = !0, g.description = _("Reserves this interface by optical serial number, even while offline. Changes take effect after restarting FTTR; Reload does not move registered devices.");
                let v = e.taboption("general", L.form.Button, "_pin_current", _("Use current interface"));
                v.modalonly = !0, v.inputtitle = _("Pin current interface"), v.inputstyle = "apply", v.onclick = (e, n)=>{
                    let i = String(r.formvalue(n) ?? L.uci.get("fttr", n, "optical_sn") ?? ""), a = t.find((e)=>e.serial_number.toUpperCase() === i.toUpperCase());
                    a?.state !== "o5_operation" || null == a.onu_id ? L.ui.addNotification(null, d("p", {
                        children: _("Select a registered O5 device first.")
                    }), "warning") : g.getUIElement(n)?.setValue(String(a.onu_id));
                }, g.validate = (e, t)=>!t || (/^(?:[0-9]|1[0-5])$/.test(t) ? !L.uci.sections("fttr", "device").some((n)=>{
                        if (n[".name"] === e) return !1;
                        let r = g.formvalue(n[".name"]) ?? n.onu_id;
                        return null != r && String(r) === t;
                    }) || _("Interface already reserved by another device.") : _("Select an interface from fttr1 to fttr16."));
                let b = f(e, "cwmp", "cwmp_contract", _("CWMP contract"), [
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
                b.modalonly = !0, b.default = "auto", b.rmempty = !1, b.description = _("Independent of the optical adapter. Parameter paths, types and writable evidence are discovered before synchronization. Unverified candidates do not authorize writes.");
                let w = p(e, "cwmp", L.form.Flag, "connection_request", _("Supports Connection Request"));
                w.modalonly = !0, w.default = "1", w.rmempty = !1, w.description = _("Independent per device; enabled by default for all adapters. Enabled: on-demand sessions with periodic Inform enabled and an interval of at most 12 hours (backend default: 43200 seconds). Disabled: manually set PeriodicInformEnable to true and PeriodicInformInterval to at most 180 seconds; no interval is written automatically. Requires reachable CWMP, verified standard parameters, HTTP Digest support, a prior Inform with a ConnectionRequestURL and valid CPE credentials. Firmware support is not guaranteed. Acceptance is not proof of a session or completed RPCs.");
                let k = p(e, "cwmp", L.form.Flag, "connection_request_defaults", _("Use backend Connection Request defaults"));
                k.modalonly = !0, k.default = "1", k.rmempty = !1, k.retain = !0, k.depends("connection_request", "1"), k.cfgvalue = (e)=>{
                    let t = L.uci.get("fttr", e, "connection_request_defaults");
                    return null != t ? String(t) : L.uci.get("fttr", e, "connection_request_username") && L.uci.get("fttr", e, "connection_request_password") ? "0" : "1";
                }, k.description = _("Uses a backend-reserved profile; factory credentials are not yet verified. Disable to enter this CPE's existing credentials and port. Saved custom values are retained while hidden.");
                let j = p(e, "cwmp", L.form.Value, "connection_request_username", _("CPE Connection Request username"));
                j.modalonly = !0, j.optional = !0, j.rmempty = !0, j.retain = !0, j.depends({
                    connection_request: "1",
                    connection_request_defaults: "0"
                }), j.description = _("Enter this CPE's existing Connection Request credentials, not the ACS inbound HTTP Basic credentials. No custom credential defaults are assumed.");
                let z = p(e, "cwmp", L.form.Value, "connection_request_password", _("CPE Connection Request password"));
                z.modalonly = !0, z.password = !0, z.optional = !0, z.rmempty = !0, z.retain = !0, z.depends({
                    connection_request: "1",
                    connection_request_defaults: "0"
                }), z.description = _("Saved custom values are retained when Connection Requests are disabled or backend defaults are selected. Leave these fields unchanged to preserve their saved values.");
                let P = p(e, "cwmp", L.form.Value, "connection_request_port", _("CPE Connection Request port"), "port");
                P.modalonly = !0, P.default = "7547", P.rmempty = !1, P.retain = !0, P.depends({
                    connection_request: "1",
                    connection_request_defaults: "0"
                });
                let x = p(e, "advanced", L.form.Flag, "omci_management", _("Provision management VLAN and ACS via OMCI"));
                x.modalonly = !0, x.default = "0", x.rmempty = !1, x.description = _("Disabled by default. Uses the global management VLAN, priority and ACS URL for this device only, subject to management application authorization. Disabling skips future OMCI management writes and retains existing ONU settings. ME readback does not prove WAN creation or successful Inform; K155 may clear its local ACS URL when enabled.");
                let A = f(e, "advanced", "wifi_cleanup", _("Unconfigured WLANs"), [
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
                A.modalonly = !0, A.default = "disable", A.description = _("By default, extra WLANs are disabled and retained. Deleting objects is destructive and should only be selected deliberately.");
            }), z.tab("templates", _("Templates")), w(v(z, "templates", "_templates", "template", _("Templates"), (e)=>{
                for (let [t, n] of (e.description = _("Create a template first, then add its SSIDs and networks in their tabs. Each editor changes one item. Confirm stages changes; Save & Apply applies the page configuration.") + " " + _("Deleting an unused template also deletes its SSIDs and networks."), y(e, "_name", _("Template"), (e)=>String(L.uci.get("fttr", e, "name") || _("New template"))), [
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
                ]))y(e, `_${t}_count`, n, (e)=>String(L.uci.sections("fttr", t).filter((t)=>t.template === e).length));
                let t = u(e, L.form.Value, "name", _("Name"));
                t.modalonly = !0, t.rmempty = !1;
            }), rd), z.tab("wifi", _("SSIDs")), w(v(z, "wifi", "_wifi", "wifi", _("SSIDs"), (e)=>{
                e.description = _("Create SSIDs here before selecting them in a network. Every SSID belongs to one template.");
                let t = b(e), n = t.validate;
                t.validate = function(e, t) {
                    let r = n.call(this, e, t);
                    return !0 !== r ? r : !ro().network.some((n)=>ra(n.ssid).includes(e) && n.template !== t) || _("This SSID is bound to a network. Remove its network bindings before changing the template.");
                }, y(e, "_ssid", _("SSID"), (e)=>String(L.uci.get("fttr", e, "ssid") || e)), y(e, "_radio", _("Band"), (e)=>"2g" === L.uci.get("fttr", e, "radio") ? "2.4 GHz" : "5 GHz"), y(e, "_security", _("Security"), (e)=>{
                    let t = String(L.uci.get("fttr", e, "security") || "");
                    return "none" === t ? _("None (Open)") : t || _("Keep current key");
                });
                let r = u(e, L.form.Value, "ssid", _("SSID"));
                r.modalonly = !0, r.rmempty = !1, r.validate = (e, t)=>new TextEncoder().encode(t).length >= 1 && new TextEncoder().encode(t).length <= 32 || _("SSID must be 1\u201332 bytes.");
                let i = m(e, "radio", _("Band"), [
                    [
                        "2g",
                        "2.4 GHz"
                    ],
                    [
                        "5g",
                        "5 GHz"
                    ]
                ]);
                i.modalonly = !0, i.default = "2g", m(e, "security", _("Security"), [
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
                let a = u(e, L.form.Value, "key", _("Password"));
                a.password = !0, a.modalonly = !0, a.depends("security", "wpa2-psk"), a.depends("security", "wpa3-sae"), a.depends("security", "wpa2-psk/wpa3-sae"), a.depends("security", "wpa-psk/wpa2-psk"), a.rmempty = !1, a.validate = (e, t)=>{
                    let n = new TextEncoder().encode(t).length;
                    return n >= 8 && n <= 63 || _("Password must be 8\u201363 bytes.");
                };
            }), ru), z.tab("networks", _("Networks")), v(z, "networks", "_networks", "network", _("Networks"), (e)=>{
                e.description = _("Networks bind VLAN services to wired ports and optional SSIDs within one template.");
                let t = b(e);
                y(e, "_name", _("Network"), (e)=>String(L.uci.get("fttr", e, "name") || _("New network"))), y(e, "_vlan", _("VLAN"), (e)=>String(L.uci.get("fttr", e, "vlan") || "0")), y(e, "_services", _("WAN Service List (multi-select)"), (e)=>ra(L.uci.get("fttr", e, "service_list")).join(", ")), y(e, "_bindings", _("LAN / WLAN port bindings"), (e)=>[
                        ...ra(L.uci.get("fttr", e, "port")).map((e)=>e.toUpperCase()),
                        ...ra(L.uci.get("fttr", e, "ssid")).map((e)=>String(L.uci.get("fttr", e, "ssid") || e))
                    ].join(", "));
                let n = u(e, L.form.Value, "name", _("Name"));
                n.modalonly = !0, n.rmempty = !1;
                let r = u(e, L.form.MultiValue, "service_list", _("WAN Service List (multi-select)"));
                for (let e of (r.modalonly = !0, r.rmempty = !1, r.validate = (e, t)=>r_(t), r.description = _("Select at least one of INTERNET, OTHER, IPTV, and VOIP for each custom VLAN. TR069 is reserved for OMCI."), ri))r.value(e, e);
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
                    let i = u(e, L.form.Value, t, n, r);
                    i.default = "0", i.rmempty = !1, i.modalonly = !0;
                }
                let i = u(e, L.form.MultiValue, "ssid", _("SSIDs"));
                i.modalonly = !0, i.rmempty = !0, i.placeholder = _("No SSIDs selected"), i.description = _("Optional for wired-only networks. Only SSIDs from the selected template are listed. Changing the template clears the SSID selection."), h(i, function(e) {
                    let t = this.section.getOption("template");
                    return rl(ro(), String(t?.formvalue(e) ?? L.uci.get("fttr", e, "template") ?? ""));
                }), i.validate = function(e, t) {
                    let n = String(this.section.getOption("template").formvalue(e) ?? L.uci.get("fttr", e, "template") ?? ""), r = new Set(rl(ro(), n).map((e)=>{
                        let [t] = e;
                        return t;
                    }));
                    return !!ra(t).every((e)=>r.has(e)) || _("Select SSIDs belonging to this network's template.");
                }, t.onchange = function(e, t, n) {
                    let r = this.section.getOption("ssid").getUIElement(t);
                    if (!r) return;
                    let i = rl(ro(), n);
                    r.clearChoices(!0), r.addChoices(i.map((e)=>{
                        let [t] = e;
                        return t;
                    }), Object.fromEntries(i));
                };
                let a = u(e, L.form.MultiValue, "port", _("Ports"));
                a.modalonly = !0;
                for(let e = 1; e <= 4; e++)a.value(`lan${e}`, `LAN${e}`);
            }), this.handleSave = ()=>j.save(()=>{
                    let e = ro(), t = rm(e);
                    if (t.length) throw Error(t.map((t)=>{
                        let n = e[t.kind].find((e)=>e[".name"] === t.sectionId), r = e.template.find((e)=>e[".name"] === n?.template), i = [
                            r && rs(r),
                            n ? rs(n) : t.sectionId
                        ].filter(Boolean).join(" / ");
                        return `${i} [${t.sectionId}.${t.field}]: ${t.message}`;
                    }).join("\n"));
                    L.uci.unset("fttr", "acs", "listen"), L.uci.unset("fttr", "management", "acs_url");
                });
            let x = d("pre", {
                style: "white-space:pre-wrap;overflow-wrap:anywhere",
                "aria-live": "polite"
            }), A = null, C = (e)=>{
                var t;
                k = "error" in e ? e.error : void 0, A?.parentNode?.removeChild(A), A = null, k && (A = L.ui.addNotification(_("FTTR configuration check failed"), (t = {
                    children: [
                        d("p", {
                            children: k
                        }),
                        d("button", {
                            class: "cbi-button cbi-button-action",
                            type: "button",
                            onclick: ()=>rv(z, k),
                            children: _("Review and repair configuration")
                        })
                    ]
                }, d("div", t)), "error"));
            };
            C(e);
            let N = (a = {
                class: "cbi-section",
                children: [
                    (i = {
                        children: [
                            _("Saving configuration does not synchronize devices in Manual mode. After Save & Apply, open Synchronization and choose Apply differences. Preview differences is read-only."),
                            " ",
                            d("a", {
                                href: L.url("admin", "network", "fttr", "sync"),
                                children: _("Open Synchronization")
                            })
                        ]
                    }, d("p", i)),
                    d("h3", {
                        children: _("Configuration diagnostics")
                    }),
                    d("button", {
                        class: "cbi-button cbi-button-action",
                        type: "button",
                        onclick: ()=>rv(z, k),
                        children: _("Review and repair configuration")
                    }),
                    " ",
                    d("button", {
                        class: "cbi-button cbi-button-action",
                        type: "button",
                        onclick: ()=>rz(rb, x, C),
                        children: _("Check")
                    }),
                    " ",
                    d("button", {
                        class: "cbi-button cbi-button-action",
                        type: "button",
                        disabled: !L.hasViewPermission(),
                        onclick: ()=>rz(async ()=>(await rw(), await rb()), x, C),
                        children: _("Reload")
                    }),
                    " ",
                    d("button", {
                        class: "cbi-button cbi-button-negative",
                        type: "button",
                        disabled: !L.hasViewPermission(),
                        onclick: ()=>rz(rS, x),
                        children: _("Restart")
                    }),
                    x
                ]
            }, d("div", a));
            return z.tab("diagnostics", _("Configuration diagnostics")), z.taboption("diagnostics", rj.DummyValue, "_diagnostics", "").render = ()=>Promise.resolve(N), j.render();
        }
    });
})(), main = t.main;

return main;