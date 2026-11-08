'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var main, e = {};
e.d = (t, r, n)=>{
    var i = (r, n)=>{
        for(var i in r)e.o(r, i) && !e.o(t, i) && Object.defineProperty(t, i, {
            enumerable: !0,
            [n]: r[i]
        });
    };
    i(r, "get"), i(n, "value");
}, e.o = (e, t)=>Object.prototype.hasOwnProperty.call(e, t);
var t = {};
(()=>{
    var r;
    let n, i, a, o, s;
    e.d(t, {
        main: ()=>main
    });
    let l = Symbol.for("jsx.fragment");
    function d(e, t) {
        let { children: r, ...n } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, i = function e(t) {
            let r = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
            for (let n of t)null != n && "boolean" != typeof n && (Array.isArray(n) ? e(n, r) : r.push(n instanceof Node ? n : String(n)));
            return r;
        }(null == r ? [] : Array.isArray(r) ? r : [
            r
        ]);
        if (e === l) {
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
        let a = {}, o = {
            ...n
        };
        for (let [e, t] of Object.entries(o))e.startsWith("on") && "function" == typeof t ? (a[e] = t, delete o[e]) : "boolean" == typeof t && (t ? o[e] = e : delete o[e]);
        let s = Object.keys(o).length > 0 ? i.length > 1 ? E(e, o, i) : E(e, o, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
        for (let [e, t] of Object.entries(a)){
            let r = e.slice(2).toLowerCase();
            s.addEventListener(r, t);
        }
        return s;
    }
    function c(e, t, r) {
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
    class p extends Error {
        constructor(){
            super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
        }
    }
    let u = {};
    function f(e) {
        return e && Object.assign(u, e), u;
    }
    function g(e, t) {
        return "bigint" == typeof t ? t.toString() : t;
    }
    function b(e) {
        let t = +!!e.startsWith("^"), r = e.endsWith("$") ? e.length - 1 : e.length;
        return e.slice(t, r);
    }
    let m = Symbol("evaluating");
    function h(e, t, r) {
        let n;
        Object.defineProperty(e, t, {
            get () {
                if (n !== m) return void 0 === n && (n = m, n = r()), n;
            },
            set (r) {
                Object.defineProperty(e, t, {
                    value: r
                });
            },
            configurable: !0
        });
    }
    let v = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
    function y(e) {
        return "object" == typeof e && null !== e && !Array.isArray(e);
    }
    function w(e) {
        if (!1 === y(e)) return !1;
        let t = e.constructor;
        if (void 0 === t || "function" != typeof t) return !0;
        let r = t.prototype;
        return !1 !== y(r) && !1 !== Object.prototype.hasOwnProperty.call(r, "isPrototypeOf");
    }
    function x(e) {
        return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    }
    function k(e) {
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
    function z(e, t = 0) {
        if (!0 === e.aborted) return !0;
        for(let r = t; r < e.issues.length; r++)if (e.issues[r]?.continue !== !0) return !0;
        return !1;
    }
    function j(e, t) {
        return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
    }
    function C(e) {
        return "string" == typeof e ? e : e?.message;
    }
    function S(e, t, r) {
        let n = {
            ...e,
            path: e.path ?? []
        };
        return e.message || (n.message = C(e.inst?._zod.def?.error?.(e)) ?? C(t?.error?.(e)) ?? C(r.customError?.(e)) ?? C(r.localeError?.(e)) ?? "Invalid input"), delete n.inst, delete n.continue, t?.reportInput || delete n.input, n;
    }
    let $ = (e, t)=>{
        e.name = "$ZodError", Object.defineProperty(e, "_zod", {
            value: e._zod,
            enumerable: !1
        }), Object.defineProperty(e, "issues", {
            value: t,
            enumerable: !1
        }), e.message = JSON.stringify(t, g, 2), Object.defineProperty(e, "toString", {
            value: ()=>e.message,
            enumerable: !1
        });
    }, O = c("$ZodError", $), P = c("$ZodError", $, {
        Parent: Error
    }), M = (i = P, (e, t, r, n)=>{
        let a = r ? Object.assign(r, {
            async: !1
        }) : {
            async: !1
        }, o = e._zod.run({
            value: t,
            issues: []
        }, a);
        if (o instanceof Promise) throw new p();
        if (o.issues.length) {
            let e = new (n?.Err ?? i)(o.issues.map((e)=>S(e, a, f())));
            throw v(e, n?.callee), e;
        }
        return o.value;
    }), N = (a = P, async (e, t, r, n)=>{
        let i = r ? Object.assign(r, {
            async: !0
        }) : {
            async: !0
        }, o = e._zod.run({
            value: t,
            issues: []
        }, i);
        if (o instanceof Promise && (o = await o), o.issues.length) {
            let e = new (n?.Err ?? a)(o.issues.map((e)=>S(e, i, f())));
            throw v(e, n?.callee), e;
        }
        return o.value;
    }), R = (o = P, (e, t, r)=>{
        let n = r ? {
            ...r,
            async: !1
        } : {
            async: !1
        }, i = e._zod.run({
            value: t,
            issues: []
        }, n);
        if (i instanceof Promise) throw new p();
        return i.issues.length ? {
            success: !1,
            error: new (o ?? O)(i.issues.map((e)=>S(e, n, f())))
        } : {
            success: !0,
            data: i.value
        };
    }), A = (s = P, async (e, t, r)=>{
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
            error: new s(i.issues.map((e)=>S(e, n, f())))
        } : {
            success: !0,
            data: i.value
        };
    }), I = /^-?\d+(?:\.\d+)?$/, T = /^(?:true|false)$/i, D = /^null$/i, U = {
        major: 4,
        minor: 3,
        patch: 6
    }, q = c("$ZodType", (e, t)=>{
        var r;
        e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = U;
        let n = [
            ...e._zod.def.checks ?? []
        ];
        for (let t of (e._zod.traits.has("$ZodCheck") && n.unshift(e), n))for (let r of t._zod.onattach)r(e);
        if (0 === n.length) (r = e._zod).deferred ?? (r.deferred = []), e._zod.deferred?.push(()=>{
            e._zod.run = e._zod.parse;
        });
        else {
            let t = (e, t, r)=>{
                let n, i = z(e);
                for (let a of t){
                    if (a._zod.def.when) {
                        if (!a._zod.def.when(e)) continue;
                    } else if (i) continue;
                    let t = e.issues.length, o = a._zod.check(e);
                    if (o instanceof Promise && r?.async === !1) throw new p();
                    if (n || o instanceof Promise) n = (n ?? Promise.resolve()).then(async ()=>{
                        await o, e.issues.length !== t && (i || (i = z(e, t)));
                    });
                    else {
                        if (e.issues.length === t) continue;
                        i || (i = z(e, t));
                    }
                }
                return n ? n.then(()=>e) : e;
            }, r = (r, i, a)=>{
                if (z(r)) return r.aborted = !0, r;
                let o = t(i, n, a);
                if (o instanceof Promise) {
                    if (!1 === a.async) throw new p();
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
                    if (!1 === a.async) throw new p();
                    return o.then((e)=>t(e, n, a));
                }
                return t(o, n, a);
            };
        }
        h(e, "~standard", ()=>({
                validate: (t)=>{
                    try {
                        let r = R(e, t);
                        return r.success ? {
                            value: r.data
                        } : {
                            issues: r.error?.issues
                        };
                    } catch (r) {
                        return A(e, t).then((e)=>e.success ? {
                                value: e.data
                            } : {
                                issues: e.error?.issues
                            });
                    }
                },
                vendor: "zod",
                version: 1
            }));
    }), F = c("$ZodString", (e, t)=>{
        var r;
        let n;
        q.init(e, t), e._zod.pattern = [
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
    }), B = c("$ZodNumber", (e, t)=>{
        q.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? I, e._zod.parse = (r, n)=>{
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
    }), Z = c("$ZodBoolean", (e, t)=>{
        q.init(e, t), e._zod.pattern = T, e._zod.parse = (r, n)=>{
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
    }), V = c("$ZodNull", (e, t)=>{
        q.init(e, t), e._zod.pattern = D, e._zod.values = new Set([
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
    }), W = c("$ZodUnknown", (e, t)=>{
        q.init(e, t), e._zod.parse = (e)=>e;
    });
    function J(e, t, r) {
        e.issues.length && t.issues.push(...j(r, e.issues)), t.value[r] = e.value;
    }
    let G = c("$ZodArray", (e, t)=>{
        q.init(e, t), e._zod.parse = (r, n)=>{
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
                s instanceof Promise ? a.push(s.then((t)=>J(t, r, e))) : J(s, r, e);
            }
            return a.length ? Promise.all(a).then(()=>r) : r;
        };
    });
    function K(e, t, r, n, i) {
        if (e.issues.length) {
            if (i && !(r in n)) return;
            t.issues.push(...j(r, e.issues));
        }
        void 0 === e.value ? r in n && (t.value[r] = void 0) : t.value[r] = e.value;
    }
    let H = c("$ZodObject", (e, t)=>{
        var r;
        let n;
        q.init(e, t);
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
        h(e._zod, "propValues", ()=>{
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
            if (!y(i)) return t.issues.push({
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
                o instanceof Promise ? s.push(o.then((r)=>K(r, t, e, i, a))) : K(o, t, e, i, a);
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
                    a instanceof Promise ? e.push(a.then((e)=>K(e, r, i, t, c))) : K(a, r, i, t, c);
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
    function X(e, t, r, n) {
        for (let r of e)if (0 === r.issues.length) return t.value = r.value, t;
        let i = e.filter((e)=>!z(e));
        return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
            code: "invalid_union",
            input: t.value,
            inst: r,
            errors: e.map((e)=>e.issues.map((e)=>S(e, n, f())))
        }), t);
    }
    let Q = c("$ZodUnion", (e, t)=>{
        q.init(e, t), h(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), h(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), h(e._zod, "values", ()=>{
            if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
        }), h(e._zod, "pattern", ()=>{
            if (t.options.every((e)=>e._zod.pattern)) {
                let e = t.options.map((e)=>e._zod.pattern);
                return RegExp(`^(${e.map((e)=>b(e.source)).join("|")})$`);
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
            return o ? Promise.all(s).then((t)=>X(t, i, e, a)) : X(s, i, e, a);
        };
    }), Y = c("$ZodIntersection", (e, t)=>{
        q.init(e, t), e._zod.parse = (e, r)=>{
            let n = e.value, i = t.left._zod.run({
                value: n,
                issues: []
            }, r), a = t.right._zod.run({
                value: n,
                issues: []
            }, r);
            return i instanceof Promise || a instanceof Promise ? Promise.all([
                i,
                a
            ]).then(([t, r])=>ee(e, t, r)) : ee(e, i, a);
        };
    });
    function ee(e, t, r) {
        let n, i = new Map();
        for (let r of t.issues)if ("unrecognized_keys" === r.code) for (let e of (n ?? (n = r), r.keys))i.has(e) || i.set(e, {}), i.get(e).l = !0;
        else e.issues.push(r);
        for (let t of r.issues)if ("unrecognized_keys" === t.code) for (let e of t.keys)i.has(e) || i.set(e, {}), i.get(e).r = !0;
        else e.issues.push(t);
        let a = [
            ...i
        ].filter(([, e])=>e.l && e.r).map(([e])=>e);
        if (a.length && n && e.issues.push({
            ...n,
            keys: a
        }), z(e)) return e;
        let o = function e(t, r) {
            if (t === r || t instanceof Date && r instanceof Date && +t == +r) return {
                valid: !0,
                data: t
            };
            if (w(t) && w(r)) {
                let n = Object.keys(r), i = Object.keys(t).filter((e)=>-1 !== n.indexOf(e)), a = {
                    ...t,
                    ...r
                };
                for (let n of i){
                    let i = e(t[n], r[n]);
                    if (!i.valid) return {
                        valid: !1,
                        mergeErrorPath: [
                            n,
                            ...i.mergeErrorPath
                        ]
                    };
                    a[n] = i.data;
                }
                return {
                    valid: !0,
                    data: a
                };
            }
            if (Array.isArray(t) && Array.isArray(r)) {
                if (t.length !== r.length) return {
                    valid: !1,
                    mergeErrorPath: []
                };
                let n = [];
                for(let i = 0; i < t.length; i++){
                    let a = e(t[i], r[i]);
                    if (!a.valid) return {
                        valid: !1,
                        mergeErrorPath: [
                            i,
                            ...a.mergeErrorPath
                        ]
                    };
                    n.push(a.data);
                }
                return {
                    valid: !0,
                    data: n
                };
            }
            return {
                valid: !1,
                mergeErrorPath: []
            };
        }(t.value, r.value);
        if (!o.valid) throw Error(`Unmergable intersection. Error path: ${JSON.stringify(o.mergeErrorPath)}`);
        return e.value = o.data, e;
    }
    let et = c("$ZodRecord", (e, t)=>{
        q.init(e, t), e._zod.parse = (r, n)=>{
            let i = r.value;
            if (!w(i)) return r.issues.push({
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
                        t.issues.length && r.issues.push(...j(e, t.issues)), r.value[e] = t.value;
                    })) : (o.issues.length && r.issues.push(...j(e, o.issues)), r.value[e] = o.value);
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
                if ("string" == typeof o && I.test(o) && s.issues.length) {
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
                        issues: s.issues.map((e)=>S(e, n, f())),
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
                    e.issues.length && r.issues.push(...j(o, e.issues)), r.value[s.value] = e.value;
                })) : (l.issues.length && r.issues.push(...j(o, l.issues)), r.value[s.value] = l.value);
            }
            return a.length ? Promise.all(a).then(()=>r) : r;
        };
    }), er = c("$ZodLiteral", (e, t)=>{
        if (q.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
        let r = new Set(t.values);
        e._zod.values = r, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? x(e) : e ? x(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (n, i)=>{
            let a = n.value;
            return r.has(a) || n.issues.push({
                code: "invalid_value",
                values: t.values,
                input: a,
                inst: e
            }), n;
        };
    });
    function en(e, t) {
        return e.issues.length && void 0 === t ? {
            issues: [],
            value: void 0
        } : e;
    }
    let ei = c("$ZodOptional", (e, t)=>{
        q.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", h(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
                ...t.innerType._zod.values,
                void 0
            ]) : void 0), h(e._zod, "pattern", ()=>{
            let e = t.innerType._zod.pattern;
            return e ? RegExp(`^(${b(e.source)})?$`) : void 0;
        }), e._zod.parse = (e, r)=>{
            if ("optional" === t.innerType._zod.optin) {
                let n = t.innerType._zod.run(e, r);
                return n instanceof Promise ? n.then((t)=>en(t, e.value)) : en(n, e.value);
            }
            return void 0 === e.value ? e : t.innerType._zod.run(e, r);
        };
    });
    Symbol("ZodOutput"), Symbol("ZodInput");
    (r = globalThis).__zod_globalRegistry ?? (r.__zod_globalRegistry = new class e {
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
    let ea = c("ZodMiniType", (e, t)=>{
        if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
        q.init(e, t), e.def = t, e.type = t.type, e.parse = (t, r)=>M(e, t, r, {
                callee: e.parse
            }), e.safeParse = (t, r)=>R(e, t, r), e.parseAsync = async (t, r)=>N(e, t, r, {
                callee: e.parseAsync
            }), e.safeParseAsync = async (t, r)=>A(e, t, r), e.check = (...r)=>e.clone({
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
    }), eo = c("ZodMiniString", (e, t)=>{
        F.init(e, t), ea.init(e, t);
    });
    function es(e) {
        return new eo({
            type: "string",
            ...k(e)
        });
    }
    let el = c("ZodMiniNumber", (e, t)=>{
        B.init(e, t), ea.init(e, t);
    });
    function ed(e) {
        return new el({
            type: "number",
            checks: [],
            ...k(e)
        });
    }
    let ec = c("ZodMiniBoolean", (e, t)=>{
        Z.init(e, t), ea.init(e, t);
    });
    function ep(e) {
        return new ec({
            type: "boolean",
            ...k(e)
        });
    }
    let eu = c("ZodMiniNull", (e, t)=>{
        V.init(e, t), ea.init(e, t);
    });
    function e_(e) {
        return new eu({
            type: "null",
            ...k(e)
        });
    }
    let ef = c("ZodMiniUnknown", (e, t)=>{
        W.init(e, t), ea.init(e, t);
    }), eg = c("ZodMiniArray", (e, t)=>{
        G.init(e, t), ea.init(e, t);
    });
    function eb(e, t) {
        return new eg({
            type: "array",
            element: e,
            ...k(t)
        });
    }
    let em = c("ZodMiniObject", (e, t)=>{
        H.init(e, t), ea.init(e, t), h(e, "shape", ()=>t.shape);
    });
    function eh(e, t) {
        return new em({
            type: "object",
            shape: e ?? {},
            ...k(t)
        });
    }
    let ev = c("ZodMiniUnion", (e, t)=>{
        Q.init(e, t), ea.init(e, t);
    });
    function ey(e, t) {
        return new ev({
            type: "union",
            options: e,
            ...k(t)
        });
    }
    let ew = c("ZodMiniIntersection", (e, t)=>{
        Y.init(e, t), ea.init(e, t);
    });
    function ex(e, t) {
        return new ew({
            type: "intersection",
            left: e,
            right: t
        });
    }
    let ek = c("ZodMiniRecord", (e, t)=>{
        et.init(e, t), ea.init(e, t);
    });
    function ez(e, t, r) {
        return new ek({
            type: "record",
            keyType: e,
            valueType: t,
            ...k(r)
        });
    }
    let ej = c("ZodMiniLiteral", (e, t)=>{
        er.init(e, t), ea.init(e, t);
    });
    function eC(e, t) {
        return new ej({
            type: "literal",
            values: Array.isArray(e) ? e : [
                e
            ],
            ...k(t)
        });
    }
    let eS = c("ZodMiniOptional", (e, t)=>{
        ei.init(e, t), ea.init(e, t);
    });
    function e$(e) {
        return new eS({
            type: "optional",
            innerType: e
        });
    }
    let eO = ey([
        eC("account_set_password"),
        eC("account_set_active")
    ]), eP = ey([
        eC("waiting_transport"),
        eC("waiting_identity"),
        eC("reading"),
        eC("configuring"),
        eC("verifying"),
        eC("waiting_inform"),
        eC("ready"),
        eC("retry_wait"),
        eC("manual_required"),
        eC("not_configured"),
        eC("waiting_acs"),
        eC("awaiting_apply"),
        eC("discovering_management_wan"),
        eC("configuring_management_wan"),
        eC("verifying_management_wan")
    ]), eM = eh({
        enabled: ep(),
        listen: ey([
            es(),
            e_()
        ]),
        path: ey([
            es(),
            e_()
        ]),
        error: ey([
            es(),
            e_()
        ])
    }), eE = eh({
        vlan: ed(),
        vlans: eb(ed()),
        priority: ed(),
        acs_url: es()
    }), eN = eh({
        state: eP,
        optical_sn: es(),
        cwmp_id: es(),
        mqtt_target: ey([
            es(),
            e_()
        ]),
        binding_source: es(),
        method: es(),
        desired_version: es(),
        generation: ed(),
        reason: es(),
        attempts: ed(),
        next_retry_at: ed(),
        updated_at: ed(),
        settings_verified_at: ey([
            ed(),
            e_()
        ]),
        selected_vlan: ey([
            ed(),
            e_()
        ]),
        last_inform: ey([
            ed(),
            e_()
        ]),
        expected_acs_url: es(),
        last_error: ey([
            es(),
            e_()
        ]),
        transport_epoch: ed(),
        completed_authorization: ed(),
        connection_request_enabled: ey([
            ep(),
            e_()
        ]),
        inflight: ep(),
        persistence_error: ey([
            es(),
            e_()
        ]),
        link_identity_error: ey([
            es(),
            e_()
        ]),
        listener: eM,
        mqtt_last_seen: ey([
            ed(),
            e_()
        ]),
        desired: e$(eE),
        endpoint_notice: e$(es()),
        manual_steps: e$(eb(es()))
    }), eR = ey([
        eC("pending"),
        eC("unavailable")
    ]), eL = ey([
        eN,
        eh({
            state: eR,
            reason: es()
        })
    ]), eA = eh({
        id: es(),
        name: es()
    }), eI = eh({
        configured: es(),
        effective: es(),
        available: eb(es()),
        reason: es()
    }), eT = eh({
        phase: ey([
            eC("not_started"),
            eC("collecting_identity"),
            eC("retrying_identity"),
            eC("unsupported"),
            eC("configuring"),
            eC("verifying"),
            eC("wan_bootstrap_pending"),
            eC("verified"),
            eC("retrying"),
            eC("offline")
        ]),
        generation: ed(),
        error: ey([
            es(),
            e_()
        ])
    });
    eh({
        success: ep(),
        output: e$(es()),
        error: e$(es())
    });
    let eD = ey([
        eC("factory"),
        eC("firmware"),
        eC("builtin")
    ]), eU = eh({
        detected: ep(),
        device: es(),
        has_data: ep(),
        sha256: es(),
        data: es()
    }), eq = eh({
        exists: ep(),
        path: es(),
        size: ed(),
        sha256: es(),
        data: es()
    }), eF = eh({
        source: eD,
        active_path: es(),
        size: ed(),
        sha256: es(),
        data: es(),
        factory: eU,
        firmware: eq
    }), eB = eh({
        error: es()
    });
    ey([
        eF,
        eB
    ]);
    let eZ = eh({
        success: ep(),
        path: es(),
        size: ed(),
        sha256: es()
    });
    ey([
        eZ,
        eB
    ]), eh({
        data: es()
    });
    let eV = eh({
        acs: ep(),
        mqtt: ep(),
        npu: ep(),
        "device-hl202": ep(),
        "device-hwtc": ep(),
        "device-star": ep(),
        "device-zte": ep(),
        "device-scty": ep()
    }), eW = eh({
        optical: ep(),
        bridge_offload: ep(),
        omci_mib: ep(),
        mqtt_telemetry: ep(),
        hl202_management: ep(),
        cwmp: ep(),
        command_provisioning: ep()
    }), eJ = eh({
        status: ep(),
        config: ep(),
        sync: ep(),
        hardware: ep(),
        calibration: ep(),
        hl202: ep(),
        about: ep()
    }), eG = eh({
        schema_version: eC(1),
        version: es(),
        features: eV,
        functions: eW,
        pages: eJ,
        adapters: eb(eA)
    }), eK = ey([
        eh({
            valid: eC(!0),
            revision: es(),
            devices: ed()
        }),
        eh({
            error: es()
        })
    ]), eH = ey([
        eC("waiting"),
        eC("wan_reconciling"),
        eC("wan_verifying"),
        eC("wifi_reconciling"),
        eC("discovering"),
        eC("reading"),
        eC("disabling"),
        eC("disabling_read"),
        eC("writing"),
        eC("verifying"),
        eC("settling"),
        eC("completed"),
        eC("not_started"),
        eC("reset_pending"),
        eC("interrupted"),
        eC("recovering"),
        eC("waiting_management"),
        eC("waiting_task")
    ]), eX = eh({
        operation_id: ed(),
        device: es(),
        state: eH,
        started_at: ed()
    }), eQ = eh({
        state: ey([
            eC("waiting"),
            eC("applied")
        ]),
        requested_revision: es(),
        requested_at: ey([
            ed(),
            e_()
        ]),
        blocking_operations: eb(eX),
        reset_pending: ep()
    }), eY = ey([
        eC("auto"),
        eC("manual")
    ]), e0 = eC("diff"), e1 = eh({
        state: es(),
        enabled: ep(),
        reason: e$(ey([
            es(),
            e_()
        ])),
        revision: e$(es()),
        vlan: e$(ed()),
        updated_at: e$(ed())
    }), e2 = ey([
        eC("online"),
        eC("waiting_inform"),
        eC("offline_or_stale"),
        eC("waiting_transport")
    ]), e5 = eh({
        cwmp_id: es(),
        state: e2,
        optical_online: ep(),
        last_inform: ey([
            ed(),
            e_()
        ]),
        age_seconds: ey([
            ed(),
            e_()
        ])
    }), e3 = ey([
        eC("device_service"),
        eC("ssid"),
        eC("port_binding"),
        eC("wan_activation")
    ]), e4 = eh({
        name: es(),
        desired: es()
    }), e8 = eh({
        id: es(),
        name: e$(ey([
            es(),
            e_()
        ])),
        kind: e3,
        service_type: es(),
        state: es(),
        reason: e$(es()),
        revision: e$(es()),
        current_revision: e$(ep()),
        management_fresh: e$(ep()),
        operation_id: e$(ed()),
        task_id: e$(ey([
            ed(),
            e_()
        ])),
        updated_at: e$(ed()),
        changes: e$(eb(e4))
    }), e6 = ey([
        eC("plan"),
        eC("apply")
    ]), e7 = eh({
        wan: es(),
        wlan: es(),
        binding: es()
    }), e9 = eh({
        state: es(),
        requested: es(),
        contract: ey([
            es(),
            e_()
        ]),
        reason: es(),
        cache_hit: ep(),
        schema: es(),
        capabilities: ey([
            e7,
            e_()
        ])
    }), te = eh({
        parent: ed(),
        connection: ed(),
        state: es(),
        service_list: es(),
        kind: es(),
        baseline: ey([
            eb(ed()),
            e_()
        ])
    }), tt = eh({
        state: es(),
        reason: e$(es()),
        task_id: e$(ey([
            ed(),
            e_()
        ])),
        instance: e$(ed()),
        cwmp_id: e$(es())
    }), tr = ey([
        eC("waiting"),
        eC("inventory"),
        eC("classifying"),
        eC("adding_parent"),
        eC("child_names"),
        eC("adding_child"),
        eC("delete_guard"),
        eC("deleting"),
        eC("verify_delete"),
        eC("empty_parent"),
        eC("deleting_parent"),
        eC("verify_parent_delete"),
        eC("next"),
        eC("done")
    ]), tn = eh({
        owned: eb(ed()),
        pending: ey([
            es(),
            e_()
        ]),
        pending_instance: ey([
            ed(),
            e_()
        ])
    }), ti = ey([
        eC("waiting"),
        eC("inventory"),
        eC("adding"),
        eC("verify_add"),
        eC("deleting"),
        eC("verify_delete"),
        eC("reading_disable"),
        eC("disabling"),
        eC("verifying_disable"),
        eC("next"),
        eC("done")
    ]), ta = ey([
        eC("disable"),
        eC("preserve"),
        eC("delete")
    ]), to = eh({
        parent: ed(),
        child: ed(),
        service: es(),
        vlan: es()
    }), ts = eh({
        state: eH,
        items: eb(e8),
        backend: e$(eI),
        operation_id: e$(ed()),
        device: e$(es()),
        optical_sn: e$(es()),
        cwmp_id: e$(es()),
        revision: e$(es()),
        mode: e$(e6),
        started_at: e$(ed()),
        completed_at: e$(ey([
            ed(),
            e_()
        ])),
        current_revision: e$(ep()),
        management_fresh: e$(ep()),
        reason: e$(es()),
        error: e$(es()),
        attempts: e$(ed()),
        next_retry_at: e$(ed()),
        reconcile_reason: e$(es()),
        cwmp_contract: e$(e9),
        wan_objects: e$(ez(es(), te)),
        wan_lifecycle: e$(ez(es(), tt)),
        wan_stage: e$(tr),
        wifi_objects: e$(tn),
        wifi_lifecycle: e$(ez(es(), tt)),
        wifi_stage: e$(ti),
        wifi_cleanup: e$(ta),
        native_ownership: e$(ez(es(), to)),
        write_performed: e$(ep()),
        readback_verified: e$(ep())
    }), tl = ey([
        eC("not_configured"),
        eC("stale_revision"),
        eC("stale_management"),
        eC("verified"),
        eC("attention_required"),
        eC("accepted_unverified"),
        eC("pending"),
        eC("recovering"),
        eC("waiting_management")
    ]), td = eh({
        device: es(),
        name: ey([
            es(),
            e_()
        ]),
        group: ey([
            es(),
            e_()
        ]),
        group_name: ey([
            es(),
            e_()
        ]),
        template: ey([
            es(),
            e_()
        ]),
        template_name: ey([
            es(),
            e_()
        ]),
        optical_sn: es(),
        adapter: es(),
        omci_management: e1,
        management: ey([
            e5,
            e_()
        ]),
        acs_bootstrap: eL,
        provisioning: ts,
        services: eb(e8),
        ssids: eb(e8),
        wifi_sync: tl
    }), tc = ey([
        eC("discovering"),
        eC("comparing"),
        eC("planning"),
        eC("applying"),
        eC("verifying"),
        eC("configuring_listener"),
        eC("cleaning_previous"),
        eC("waiting_devices"),
        eC("ready"),
        eC("awaiting_apply"),
        eC("verified"),
        eC("blocked"),
        eC("retry_wait")
    ]), tp = eh({
        enabled: ep(),
        mode: eY,
        vlan: eb(ed()),
        priority: ed(),
        address: es(),
        acs_url: es(),
        port: ed(),
        path: es(),
        dhcp_enabled: ep()
    }), tu = eh({
        operation: es(),
        key: es(),
        value: eb(es())
    }), t_ = eh({
        state: tc,
        error: ey([
            es(),
            e_()
        ]),
        inflight: ep(),
        ready: ep(),
        desired_version: ey([
            es(),
            e_()
        ]),
        applied_version: ey([
            es(),
            e_()
        ]),
        next_retry_at: ed(),
        attempts: ed(),
        desired: ey([
            tp,
            e_()
        ]),
        applied: ey([
            tp,
            e_()
        ]),
        previous: ey([
            tp,
            e_()
        ]),
        plan: eb(tu)
    }), tf = eh({
        desired: ey([
            eE,
            e_()
        ]),
        state: es()
    }), tg = eh({
        id: es(),
        name: ey([
            es(),
            e_()
        ]),
        template: es()
    }), tb = eh({
        enabled: ep(),
        mode: eY,
        method: e0,
        revision: es(),
        triggers: eb(es()),
        interval_minutes: ed(),
        error: ey([
            es(),
            e_()
        ]),
        devices: eb(td),
        management_network: t_,
        omci_management: tf,
        groups: eb(tg),
        pending_devices: eb(es()),
        onu_pins: e$(ez(es(), ed())),
        config_error: e$(ey([
            es(),
            e_()
        ])),
        config_load: e$(eQ)
    });
    ey([
        tb,
        eB
    ]);
    let tm = eh({
        enabled: ey([
            ep(),
            e_()
        ]),
        routed_enabled: ey([
            ep(),
            e_()
        ]),
        bridge_enabled: ey([
            ep(),
            e_()
        ]),
        engine_attached: ey([
            ep(),
            e_()
        ]),
        forwarding_verified: ey([
            ep(),
            e_()
        ])
    }), th = eh({
        entity_id: ed(),
        port_id: ey([
            ed(),
            e_()
        ])
    }), tv = eh({
        entity_id: ed(),
        filter_list_hex: ey([
            es(),
            e_()
        ]),
        forward_operation: ey([
            ed(),
            e_()
        ]),
        number_of_entries: ey([
            ed(),
            e_()
        ])
    }), ty = eh({
        entity_id: ed(),
        received_frame_rules_hex: ey([
            eb(es()),
            e_()
        ]),
        error: ey([
            es(),
            e_()
        ])
    }), tw = eh({
        age_seconds: ed(),
        gem_ports: eb(th),
        vlan_filters: eb(tv),
        vlan_operations: eb(ty)
    }), tx = eh({
        source: es(),
        unit: es(),
        reason: ey([
            es(),
            e_()
        ]),
        raw: ey([
            es(),
            e_()
        ]),
        age_seconds: ey([
            ed(),
            e_()
        ])
    }), tk = eh({
        interface: es(),
        gem_ports: ey([
            eb(ed()),
            e_()
        ]),
        vlan_id: ey([
            ed(),
            e_()
        ]),
        onu_inventory: ey([
            tw,
            e_()
        ]),
        tx_bytes: ey([
            ed(),
            e_()
        ]),
        rx_bytes: ey([
            ed(),
            e_()
        ]),
        current_tx_kbps: ey([
            ed(),
            e_()
        ]),
        current_rx_kbps: ey([
            ed(),
            e_()
        ]),
        olt_channel_gem: e$(ed()),
        forwarding_verified: e$(ep()),
        offload: tm,
        measurements: ez(es(), tx)
    });
    eh({});
    let tz = eh({
        entity_id: ed(),
        interval_end_time: ed(),
        corrected_bytes: ed(),
        corrected_code_words: ed(),
        uncorrectable_code_words: ed(),
        total_code_words: ed(),
        fec_seconds: ed()
    }), tj = eh({
        ani_entity_id: ey([
            ed(),
            e_()
        ]),
        control_supported: ep(),
        downstream_enabled: ey([
            ep(),
            e_()
        ]),
        upstream_enabled: ey([
            ep(),
            e_()
        ]),
        downstream_pm: ey([
            tz,
            e_()
        ]),
        measurement: tx
    }), tC = eh({
        entry: ey([
            eC(0),
            eC(1),
            eC(2)
        ]),
        username: es(),
        active: ep()
    }), tS = eh({
        mqtt_mac: es(),
        optical_sn: ey([
            es(),
            e_()
        ]),
        onu_id: ey([
            ed(),
            e_()
        ]),
        binding_generation: es(),
        last_seen: ed(),
        reason: es()
    }), t$ = ey([
        eC("executed"),
        eC("dispatched"),
        eC("timeout"),
        eC("error")
    ]), tO = eh({
        target: es(),
        status: t$,
        request_id: e$(es()),
        exit_code: e$(ed()),
        output: e$(es()),
        output_truncated: ep(),
        error: e$(es())
    }), tP = eh({
        target: tS,
        result: tO,
        binding_current: ep()
    }), tM = ey([
        eC("not_applicable"),
        eC("accepted_and_saved"),
        eC("unconfirmed")
    ]), tE = eh({
        code: es(),
        message: es()
    });
    ey([
        eh({
            schema_version: eC(1),
            operation: tP,
            accounts: ey([
                eb(tC),
                e_()
            ]),
            write_status: tM
        }),
        eh({
            schema_version: ed(),
            error: tE
        })
    ]);
    let tN = eh({
        optical_sn: es(),
        onu_id: ed(),
        binding_generation: es()
    }), tR = eh({
        mqtt_mac: es(),
        binding_generation: es()
    }), tL = ey([
        tN,
        tR
    ]);
    eh({
        target: tL
    });
    let tA = ey([
        eh({
            kind: eC("exec"),
            script: es(),
            timeout_seconds: ed()
        }),
        eh({
            kind: eC("accounts_read")
        }),
        eh({
            kind: eC("account_set_password"),
            entry: ed(),
            password: es()
        }),
        eh({
            kind: eC("account_set_active"),
            entry: ed(),
            active: ep()
        })
    ]), tI = eh({
        schema_version: ed(),
        target: tN,
        action: tA
    }), tT = eh({
        optical_sn: es(),
        onu_id: ed(),
        model: es(),
        optical_online: ep(),
        can_execute: ep(),
        mqtt: ey([
            tS,
            e_()
        ]),
        report_revision: ey([
            ed(),
            e_()
        ])
    });
    ey([
        eh({
            schema_version: eC(1),
            operation: tP
        }),
        eh({
            schema_version: ed(),
            error: tE
        })
    ]), eh({
        target: tL,
        script: es(),
        timeout_seconds: ed()
    });
    let tD = ey([
        eh({
            schema_version: eC(1),
            devices: eb(tT),
            sources: eb(tS)
        }),
        eh({
            schema_version: ed(),
            error: tE
        })
    ]);
    ey([
        eh({
            method: eC("list")
        }),
        eh({
            method: eC("report"),
            target: tN
        }),
        eh({
            method: eC("source_report"),
            target: tR
        }),
        eh({
            method: eC("run"),
            request: tI
        })
    ]);
    let tU = ey([
        eC("received"),
        eC("report_unavailable")
    ]), tq = eh({
        value: new ef({
            type: "unknown"
        }),
        member: es(),
        unit: ey([
            es(),
            e_()
        ])
    }), tF = eh({
        name: es(),
        bytes: ed(),
        encoding: es(),
        text: ey([
            es(),
            e_()
        ]),
        text_omitted: ep()
    }), tB = eh({
        schema_version: ed(),
        compressed_bytes: ed(),
        decompressed_bytes: ed(),
        fields: ez(es(), tq),
        members: eb(tF),
        errors: eb(es())
    }), tZ = eh({
        revision: ed(),
        last_received: ed(),
        last_processed_receipt: ey([
            ed(),
            e_()
        ]),
        last_good: ey([
            ed(),
            e_()
        ]),
        error: ey([
            es(),
            e_()
        ]),
        report: ey([
            tB,
            e_()
        ])
    });
    ey([
        eh({
            schema_version: eC(1),
            target: tS,
            report: ey([
                tZ,
                e_()
            ]),
            state: tU
        }),
        eh({
            schema_version: eC(1),
            target: tS,
            report: ey([
                tZ,
                e_()
            ]),
            read_only: eC(!0)
        }),
        eh({
            schema_version: ed(),
            error: tE
        })
    ]), eh({
        target: tL
    }), eh({
        target: tL,
        kind: eO,
        entry: ed(),
        password: es(),
        active: ep()
    });
    let tV = eh({
        accepted: ed(),
        rejected: ed(),
        read_errors: ed(),
        handled: ed(),
        max_intake_us: ed(),
        max_handler_us: ed()
    }), tW = eC("pending"), tJ = eh({
        phase: ey([
            eC("starting"),
            eC("upload"),
            eC("tables")
        ]),
        received: ed(),
        expected: ey([
            ed(),
            e_()
        ])
    }), tG = eC("ready"), tK = ey([
        eh({
            status: tW,
            progress: e$(tJ)
        }),
        eh({
            status: tG,
            chunk: ed(),
            chunks: ed(),
            bytes: ed(),
            data: es()
        })
    ]);
    ey([
        tK,
        eB
    ]);
    let tH = eh({
        status: tW,
        job: es()
    }), tX = eh({
        released: ep()
    });
    eh({
        job: es()
    }), eh({
        job: es(),
        chunk: ed()
    }), ey([
        tH,
        eB
    ]);
    let tQ = eh({
        accepting: ep(),
        running: ed(),
        stored: ed(),
        bytes: ed(),
        running_limit: ed(),
        stored_limit: ed(),
        bytes_limit: ed(),
        result_bytes_limit: ed()
    }), tY = eh({
        mac: es(),
        ip: es(),
        band: es(),
        rssi_dbm: ey([
            ed(),
            e_()
        ]),
        rx_rate_mbps: ey([
            ed(),
            e_()
        ]),
        tx_rate_mbps: ey([
            ed(),
            e_()
        ])
    }), t0 = ey([
        eC("unknown"),
        eC("octets"),
        eC("string"),
        eC("unsigned_integer"),
        eC("table"),
        eC("signed_integer"),
        eC("pointer"),
        eC("bit_field"),
        eC("enumeration"),
        eC("counter")
    ]), t1 = eh({
        id: es(),
        url: es()
    }), t2 = eh({
        name: es(),
        kind: t0,
        index: ed(),
        mask: ed(),
        size: ed(),
        read: ep(),
        write: ep(),
        set_by_create: ep(),
        avc: ep(),
        optional: ep(),
        deprecated: ep(),
        default_hex: ey([
            es(),
            e_()
        ]),
        reference: t1
    }), t5 = ey([
        eh({
            type: eC("unsigned"),
            value: ed()
        }),
        eh({
            type: eC("signed"),
            value: ed()
        }),
        eh({
            type: eC("decimal"),
            value: es()
        }),
        eh({
            type: eC("text"),
            value: ey([
                es(),
                e_()
            ])
        }),
        eh({
            type: eC("octets"),
            hex: es()
        }),
        eh({
            type: eC("table_length"),
            bytes: ed()
        })
    ]), t3 = eh({
        raw_hex: es(),
        value: t5,
        sequences: eb(ed())
    }), t4 = eh({
        definition: t2,
        value: ey([
            t5,
            e_()
        ]),
        observations: eb(t3)
    }), t8 = ey([
        eC("layout"),
        eC("name_only"),
        eC("unknown")
    ]), t6 = eh({
        class_id: ed(),
        name: ey([
            es(),
            e_()
        ]),
        entities: ed(),
        records: ed(),
        support: t8
    }), t7 = eh({
        code: es(),
        message: es(),
        offset: ed(),
        mask: ed()
    }), t9 = eh({
        class_id: ed(),
        entity_id: ed(),
        name: ey([
            es(),
            e_()
        ]),
        support: t8,
        reference: ey([
            t1,
            e_()
        ]),
        sequences: eb(ed()),
        attributes: eb(t4),
        diagnostics: eb(t7)
    }), re = eC("ready"), rt = eh({
        class_id: ed(),
        entity_id: ed(),
        sequence: ed(),
        attribute_mask: ed(),
        raw_hex: es(),
        consumed: ed(),
        remaining_hex: es(),
        undecoded_mask: ed()
    }), rr = eh({
        raw_hex: es(),
        filter_outer_priority: ed(),
        filter_outer_vid: ed(),
        filter_outer_tpid_dei: ed(),
        filter_inner_priority: ed(),
        filter_inner_vid: ed(),
        filter_inner_tpid_dei: ed(),
        filter_ethertype: ed(),
        tags_to_remove: ed(),
        treatment_outer_priority: ed(),
        treatment_outer_vid: ed(),
        treatment_outer_tpid_dei: ed(),
        treatment_inner_priority: ed(),
        treatment_inner_vid: ed(),
        treatment_inner_tpid_dei: ed(),
        delete_entry: ep()
    }), rn = eh({
        class_id: ed(),
        entity_id: ed(),
        attribute: t2,
        collected: ep(),
        error: ey([
            es(),
            e_()
        ]),
        raw_hex: es(),
        rows: eb(es()),
        vlan_rules: eb(rr)
    }), ri = eh({
        schema_version: eC(1),
        reference_version: es(),
        onu_id: ey([
            ed(),
            e_()
        ]),
        uploaded_complete: ep(),
        expected_records: ed(),
        received_records: ed(),
        decoded_records: ed(),
        partial_records: ed(),
        basic_records: ed(),
        tables_requested: ep(),
        tables_collected: ep(),
        classes: eb(t6),
        entities: eb(t9),
        records: eb(rt),
        tables: eb(rn),
        diagnostics: eb(t7)
    }), ra = eh({
        status: re,
        report: ri
    });
    eh({
        onu_id: ed(),
        optical_sn: es(),
        tables: ep()
    });
    let ro = ey([
        eh({
            status: eC("success"),
            enabled: ep()
        }),
        eh({
            status: eC("error"),
            error: es()
        })
    ]);
    eh({
        enabled: ep(),
        bridge: es(),
        wan_upstream: ep(),
        wan_downstream: ep(),
        onu_bridge: ep()
    });
    let rs = eh({
        index: es(),
        state: es(),
        pkt_type: es(),
        orig_tuple: es(),
        new_tuple: es(),
        eth: es(),
        vlan: es(),
        packets: ed(),
        bytes: ed(),
        counters_valid: ep(),
        packets_exact: es(),
        bytes_exact: es()
    }), rl = eh({
        sampled_at_ms: ed(),
        errors: eb(es()),
        config_valid: ep(),
        engine_valid: ep(),
        mask_valid: ep(),
        routed_mask_valid: ep(),
        debug_valid: ep(),
        flows_valid: ep(),
        entries_valid: ep(),
        counters_valid: ep(),
        hooks_valid: ep(),
        total_packets_exact: es(),
        total_bytes_exact: es(),
        supported: ep(),
        engine_attached: ep(),
        bridge_offload_enabled: ep(),
        wan_upstream: ep(),
        wan_downstream: ep(),
        onu_bridge: ep(),
        bridge_offload_mask: ed(),
        routed_offload_mask: ed(),
        bridge_offload_debug: ep(),
        bridge: es(),
        active_ports: eb(es()),
        fw4_hooks_ready: ep(),
        total_entries: ed(),
        bound_entries: ed(),
        bound_ipv4_entries: ed(),
        bound_ipv6_entries: ed(),
        total_packets: ed(),
        total_bytes: ed(),
        bound_flows: eb(rs)
    }), rd = eh({
        equipment_id: ey([
            es(),
            e_()
        ]),
        hardware_version: ey([
            es(),
            e_()
        ]),
        software_images: eb(es()),
        omcc_version: ey([
            ed(),
            e_()
        ]),
        errors: eb(es())
    }), rc = eh({
        desired: ez(es(), ed()),
        active: ez(es(), ed()),
        pending_restart: ep(),
        allocation_blocked: ep(),
        startup_error: ey([
            es(),
            e_()
        ]),
        config_error: ey([
            es(),
            e_()
        ])
    }), rp = ey([
        eC("optical_on"),
        eC("optical_off"),
        eC("optical_status"),
        eC("optical_reload"),
        eC("optical_reinitialize"),
        eC("optical_shutdown")
    ]), ru = eh({
        enabled: ep(),
        downstream_tx_enabled: ep(),
        fec_enabled: ep()
    }), r_ = eh({
        desired_tx_enabled: ep(),
        desired_fec_enabled: ep(),
        register: ey([
            ed(),
            e_()
        ]),
        tx_enabled: ey([
            ep(),
            e_()
        ]),
        fec_enabled: ey([
            ep(),
            e_()
        ]),
        error: ey([
            es(),
            e_()
        ])
    }), rf = ey([
        eC("success"),
        eC("error")
    ]), rg = ey([
        eC("enabled"),
        eC("disabled"),
        eC("unknown")
    ]), rb = eh({
        settings: e$(ru),
        pon_mac: e$(r_),
        schema_version: eC(1),
        status: rf,
        action: rp,
        desired_enabled: ey([
            ep(),
            e_()
        ]),
        tx_enabled: ey([
            ep(),
            e_()
        ]),
        actor_state: rg,
        hardware_ready: ep(),
        discovery_active: ep(),
        cleanup_pending: ep(),
        error: ey([
            tE,
            e_()
        ])
    }), rm = eh({
        model: es(),
        wavelength_tx_nm: ed(),
        wavelength_rx_nm: ed(),
        phy_rate_downlink_gbps: ed(),
        phy_rate_uplink_gbps: ed(),
        tx_power_dbm: ey([
            ed(),
            e_()
        ]),
        laser_bias_current_ma: ey([
            ed(),
            e_()
        ]),
        temperature_celsius: ey([
            ed(),
            e_()
        ]),
        vcc_voltage: ey([
            ed(),
            e_()
        ]),
        cdr_locked: ey([
            ep(),
            e_()
        ]),
        tx_enabled: e$(ep()),
        measurements: ez(es(), tx)
    }), rh = ey([
        eC("o1_initial"),
        eC("o2_standby"),
        eC("o3_serial_number"),
        eC("o4_ranging"),
        eC("o5_operation"),
        eC("o6_intermittent_lods"),
        eC("o7_emergency_stop")
    ]), rv = eh({
        restarting: eC(!0)
    }), ry = eh({
        calls: ed(),
        failures: ed(),
        last_us: ed(),
        max_us: ed(),
        total_us: ed()
    }), rw = eh({
        port: ed(),
        interface: es(),
        carrier: ep(),
        status: es(),
        onu_id: e$(ed()),
        onu_sn: e$(es()),
        link_state: es(),
        reserved_sn: e$(es())
    }), rx = eh({
        channel_2g: ey([
            ed(),
            e_()
        ]),
        channel_5g: ey([
            ed(),
            e_()
        ]),
        bandwidth_5g: ey([
            es(),
            e_()
        ]),
        tx_power_pct: ey([
            ed(),
            e_()
        ]),
        measurements: ez(es(), tx)
    }), rk = eh({
        onu_id: ed(),
        vendor: es(),
        model: es(),
        serial_number: es(),
        state: rh,
        business_status: eT,
        management: ey([
            e5,
            e_()
        ]),
        provisioning: ey([
            ts,
            e_()
        ]),
        services: eb(e8),
        ssids: eb(e8),
        wifi_sync: tl,
        identity: ey([
            rd,
            e_()
        ]),
        identity_age_seconds: ey([
            ed(),
            e_()
        ]),
        identity_current: ep(),
        fiber_distance_m: ey([
            ed(),
            e_()
        ]),
        ranging_delay_rtd_ns: ey([
            ed(),
            e_()
        ]),
        equalization_delay_bits: ey([
            ed(),
            e_()
        ]),
        optical_rx_power_dbm: ey([
            ed(),
            e_()
        ]),
        optical_tx_power_dbm: ey([
            ed(),
            e_()
        ]),
        firmware_version: es(),
        hardware_version: es(),
        uptime_seconds: ey([
            ed(),
            e_()
        ]),
        fec: e$(tj),
        data_path: tk,
        wifi_mesh: rx,
        connected_clients: ey([
            eb(tY),
            e_()
        ]),
        measurements: ez(es(), tx)
    }), rz = eh({
        id: es(),
        last_seen_sec_ago: ed(),
        last_payload_bytes: ed()
    }), rj = eh({
        ubus: e$(ez(es(), ry)),
        jobs: e$(tQ),
        onu_pinning: e$(rc),
        fpga_status: es(),
        pon_mac: e$(r_),
        provisioning: ey([
            tb,
            e_()
        ]),
        optical_transceiver: rm,
        switch_ports: eb(rw),
        sub_gateways: eb(rk),
        telemetry_gateways: eb(rz),
        npu: e$(rl),
        ipc: e$(tV)
    }), rC = ey([
        eC("plan"),
        eC("apply"),
        eC("management_plan"),
        eC("management_apply"),
        eC("reset_state"),
        eC("reconcile"),
        eC("retry")
    ]), rS = ey([
        eh({
            operation_ids: eb(ed()),
            revision: es()
        }),
        eh({
            started: eC(!0),
            mode: e6
        }),
        eh({
            reset: eC(!0),
            device: es()
        }),
        eh({
            operation_ids: eb(ed()),
            mode: e6,
            reconcile: e$(ep()),
            retry: e$(ep())
        }),
        eB
    ]);
    eh({
        action: rC,
        target: es(),
        management: e$(ep()),
        item: e$(es())
    });
    let r$ = ey([
        eC("none"),
        eC("effective"),
        eC("pending_add"),
        eC("pending_change"),
        eC("pending_remove")
    ]), rO = eh({
        active_onu_id: ey([
            ed(),
            e_()
        ]),
        desired_onu_id: ey([
            ed(),
            e_()
        ]),
        state: r$,
        pending_restart: ep()
    }), rP = ey([
        eC("pon_logical"),
        eC("associated_with"),
        eC("learned_behind")
    ]), rM = eh({
        id: es(),
        mac: es(),
        hostname: ey([
            es(),
            e_()
        ]),
        addresses: eb(es()),
        relation: rP,
        source: es(),
        interface: ey([
            es(),
            e_()
        ])
    }), rE = ey([
        eC("ok"),
        eC("partial"),
        eC("unavailable")
    ]), rN = eh({
        id: es(),
        state: rE,
        sampled_at: ed(),
        reason: ey([
            es(),
            e_()
        ])
    }), rR = ey([
        eC("snapshot_expired"),
        eC("node_not_found"),
        eC("invalid_cursor")
    ]), rL = ey([
        eh({
            status: eC("ok"),
            snapshot_id: es(),
            parent_node_id: es(),
            clients: eb(rM),
            associated_client_count: ey([
                ed(),
                e_()
            ]),
            learned_host_count: ey([
                ed(),
                e_()
            ]),
            complete: ep(),
            next_cursor: ey([
                es(),
                e_()
            ]),
            sources: eb(rN)
        }),
        eh({
            status: eC("error"),
            code: rR
        })
    ]);
    eh({
        node_id: es(),
        snapshot_id: e$(es()),
        cursor: e$(es()),
        limit: e$(ed())
    });
    let rA = eh({
        model: es(),
        wavelength_tx_nm: ed(),
        wavelength_rx_nm: ed(),
        nominal_downlink_gbps: ed(),
        nominal_uplink_gbps: ed(),
        tx_power_dbm: ey([
            ed(),
            e_()
        ]),
        laser_bias_current_ma: ey([
            ed(),
            e_()
        ]),
        temperature_celsius: ey([
            ed(),
            e_()
        ]),
        vcc_voltage: ey([
            ed(),
            e_()
        ]),
        tx_enabled: ey([
            ep(),
            e_()
        ]),
        measurements: ez(es(), tx)
    }), rI = eh({
        name: es(),
        mac: ey([
            es(),
            e_()
        ]),
        carrier: ey([
            ep(),
            e_()
        ]),
        speed_mbps: ey([
            ed(),
            e_()
        ]),
        duplex: ey([
            es(),
            e_()
        ]),
        bridge_members: eb(es()),
        addresses: eb(es())
    }), rT = eh({
        interface: es(),
        device: ey([
            es(),
            e_()
        ]),
        protocol: ey([
            es(),
            e_()
        ]),
        up: ep(),
        addresses: eb(es())
    }), rD = eh({
        model: ey([
            es(),
            e_()
        ]),
        firmware_version: ey([
            es(),
            e_()
        ]),
        uptime_seconds: ey([
            ed(),
            e_()
        ]),
        fpga_status: es(),
        optical: rA,
        interfaces: eb(rI),
        uplinks: eb(rT)
    }), rU = eh({
        observer_node_id: es(),
        rx_bytes: ey([
            ed(),
            e_()
        ]),
        tx_bytes: ey([
            ed(),
            e_()
        ]),
        current_rx_kbps: ey([
            ed(),
            e_()
        ]),
        current_tx_kbps: ey([
            ed(),
            e_()
        ]),
        onu_inventory: ey([
            tw,
            e_()
        ]),
        offload: tm,
        measurements: ez(es(), tx)
    }), rq = eh({
        report_revision: ed(),
        binding_generation: es(),
        age_seconds: ed(),
        ip: ey([
            es(),
            e_()
        ]),
        bridge_ip: ey([
            es(),
            e_()
        ]),
        mac: ey([
            es(),
            e_()
        ]),
        connection_type_raw: ey([
            es(),
            e_()
        ]),
        uptime_seconds: ey([
            ed(),
            e_()
        ]),
        cpu_usage_raw: ey([
            ed(),
            e_()
        ]),
        memory_usage_raw: ey([
            ed(),
            e_()
        ])
    }), rF = eh({
        hl202: ey([
            rq,
            e_()
        ])
    }), rB = eh({
        code: es(),
        node_id: ey([
            es(),
            e_()
        ])
    }), rZ = eh({
        id: es(),
        source: es(),
        target: es(),
        relation: rP,
        data_interface: ey([
            es(),
            e_()
        ]),
        carrier: ey([
            ep(),
            e_()
        ]),
        onu_rx_power_dbm: ey([
            ed(),
            e_()
        ]),
        onu_tx_power_dbm: ey([
            ed(),
            e_()
        ]),
        equalization_delay_bits: ey([
            ed(),
            e_()
        ]),
        data_path: ey([
            rU,
            e_()
        ]),
        measurements: ez(es(), tx)
    }), rV = eh({
        serial_number: ey([
            es(),
            e_()
        ]),
        onu_id: ey([
            ed(),
            e_()
        ]),
        vendor: ey([
            es(),
            e_()
        ]),
        model: ey([
            es(),
            e_()
        ]),
        hardware_version: ey([
            es(),
            e_()
        ]),
        firmware_version: ey([
            es(),
            e_()
        ]),
        registration: ey([
            rh,
            e_()
        ]),
        business: ey([
            eT,
            e_()
        ]),
        management: ey([
            e5,
            e_()
        ]),
        provisioning: ey([
            ts,
            e_()
        ]),
        services: eb(e8),
        ssids: eb(e8),
        wifi_sync: ey([
            tl,
            e_()
        ]),
        identity: ey([
            rd,
            e_()
        ]),
        identity_current: ep(),
        identity_age_seconds: ey([
            ed(),
            e_()
        ]),
        uptime_seconds: ey([
            ed(),
            e_()
        ]),
        fec: ey([
            tj,
            e_()
        ]),
        binding: rO,
        extensions: rF,
        measurements: ez(es(), tx)
    }), rW = ey([
        ex(eh({
            kind: eC("controller")
        }), rD),
        ex(eh({
            kind: eC("onu")
        }), rV)
    ]), rJ = eh({
        id: es(),
        label: es(),
        detail: rW
    }), rG = ey([
        eh({
            status: eC("ok"),
            snapshot_id: es(),
            node: rJ
        }),
        eh({
            status: eC("error"),
            code: rR
        })
    ]);
    eh({
        node_id: es(),
        snapshot_id: e$(es())
    });
    let rK = eh({
        schema_version: eC(1),
        snapshot_id: es(),
        generated_at: ed(),
        snapshot_ttl_seconds: ed(),
        nodes: eb(rJ),
        links: eb(rZ),
        sources: eb(rN),
        issues: eb(rB)
    }), rH = ez(es(), eh({
        carrier: e$(ep()),
        mac: e$(es()),
        link: e$(eh({
            speed: e$(ed()),
            duplex: e$(es()),
            autoneg: e$(ep())
        })),
        stats: e$(ez(es(), ed()))
    })), rX = (e)=>null == e || "" === e ? "\u2014" : String(e);
    function rQ(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 3;
        return null != e && Number.isFinite(e) ? `${e.toFixed(t)} dBm` : "\u2014";
    }
    function rY(e) {
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
    function r0(e) {
        return void 0 === e || !Number.isFinite(e) || e < 0 ? "\u2014" : e < 1000 ? `${e} Pkts.` : `${(e / 1000).toFixed(2)} KPkts.`;
    }
    function r1(e) {
        let t = "none" === e.tone ? "" : `fttr-badge fttr-badge-${e.tone}`, r = e.class ? ` ${e.class}` : "", n = d("span", {
            class: `${t}${r}`.trim(),
            children: e.children
        });
        return e.title && n.setAttribute("title", e.title), n;
    }
    function r2(e, t, r, n) {
        e.textContent = r, "none" === t ? e.className = "" : e.className = `fttr-badge fttr-badge-${t}`, n ? e.setAttribute("title", n) : e.removeAttribute("title");
    }
    let r5 = {
        o1_initial: _("O1 Initial"),
        o2_standby: _("O2 Standby"),
        o3_serial_number: _("O3 Serial Number"),
        o4_ranging: _("O4 Ranging"),
        o5_operation: _("O5 (Operation)"),
        o6_intermittent_lods: _("O6 Intermittent LODS"),
        o7_emergency_stop: _("O7 Emergency Stop")
    };
    function r3(e) {
        return e ? "o5_operation" === e ? {
            tone: "success",
            label: r5.o5_operation,
            title: e
        } : {
            tone: "warning",
            label: r5[e] ?? rX(e),
            title: e
        } : {
            tone: "none",
            label: "\u2014"
        };
    }
    function r4(e) {
        let t = r3(e.state);
        return d(r1, {
            tone: t.tone,
            title: t.title,
            children: t.label
        });
    }
    function r8(e) {
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
    function r6(e) {
        let t = r8(e.status);
        return d(r1, {
            tone: t.tone,
            title: t.title,
            children: t.label
        });
    }
    let r7 = {
        online: _("Online"),
        waiting_inform: _("Waiting Inform"),
        offline_or_stale: _("Offline or stale")
    };
    function r9(e) {
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
        return "online" === t ? (o = "success", a = r7.online) : "waiting_inform" === t ? (o = "warning", a = r7.waiting_inform) : "offline_or_stale" === t ? (o = "danger", a = r7.offline_or_stale) : t && (o = "neutral", a = rX(t)), {
            tone: o,
            label: r && t ? `${a} \xb7 ${r}` : a,
            title: i
        };
    }
    function ne(e) {
        let t = r9(e.management);
        return d(r1, {
            tone: t.tone,
            title: t.title,
            children: t.label
        });
    }
    let nt = {
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
    function nr(e, t) {
        let r = e?.state, n = e?.next_retry_at && e.next_retry_at > Math.floor(Date.now() / 1000) ? e.next_retry_at - Math.floor(Date.now() / 1000) : 0, i = t ?? (e?.current_revision === !1 ? _("Previous configuration") : e?.management_fresh === !1 ? _("Management stale") : e?.reconcile_reason ? e.reconcile_reason : n > 0 ? _("Next self-healing retry in %d seconds").replace("%d", String(n)) : e?.reason ?? e?.error);
        return r && "not_started" !== r ? "completed" === r || "verified" === r ? {
            tone: "success",
            label: "completed" === r ? nt.completed : _("Ready"),
            title: i
        } : "wan_reconciling" === r || "wan_verifying" === r || "wifi_reconciling" === r || "discovering" === r || "reading" === r || "disabling" === r || "disabling_read" === r || "writing" === r || "verifying" === r || "settling" === r || "recovering" === r || "waiting_task" === r ? {
            tone: "info",
            label: nt[r] ?? rX(r),
            title: i
        } : "interrupted" === r || "failed" === r || "error" === r || "blocked" === r ? {
            tone: "danger",
            label: "blocked" === r ? nt.blocked : nt.interrupted,
            title: i
        } : "waiting" === r || "pending" === r || "waiting_management" === r || "reset_pending" === r ? {
            tone: "warning",
            label: nt[r] ?? nt.waiting,
            title: i
        } : {
            tone: "neutral",
            label: rX(r),
            title: i
        } : {
            tone: "neutral",
            label: nt.not_started,
            title: i
        };
    }
    function nn(e) {
        let t = nr(e.provisioning, e.title);
        return d(r1, {
            tone: t.tone,
            title: t.title,
            children: t.label
        });
    }
    let ni = {
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
    function na(e) {
        return e && "not_configured" !== e ? "verified" === e ? {
            tone: "success",
            label: ni.verified
        } : "attention_required" === e ? {
            tone: "danger",
            label: ni.attention_required
        } : "stale_revision" === e || "stale_management" === e || "waiting_management" === e ? {
            tone: "warning",
            label: ni[e]
        } : "recovering" === e ? {
            tone: "info",
            label: ni.recovering
        } : "accepted_unverified" === e || "pending" === e ? {
            tone: "warning",
            label: ni[e]
        } : {
            tone: "neutral",
            label: rX(e)
        } : {
            tone: "neutral",
            label: ni.not_configured
        };
    }
    function no(e) {
        let t = na(e.state);
        return d(r1, {
            tone: t.tone,
            title: t.title,
            children: t.label
        });
    }
    let ns = `
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
`, nl = eh({
        error: ey([
            es(),
            eh({
                code: es(),
                message: es()
            })
        ])
    });
    class nd extends Error {
        code;
        constructor(e, t){
            super(t), this.code = e, this.name = "RpcError";
        }
    }
    function nc(e) {
        let t = nl.safeParse(e);
        if (t.success) {
            let e = t.data.error;
            throw "string" == typeof e ? new nd("rpc", e) : new nd(e.code, e.message);
        }
        return e;
    }
    let np = {
        parse (e) {
            let t = tD.parse(nc(e));
            if ("object" == typeof t && null !== t && "error" in t) throw nc(t), Error("Unexpected RPC error");
            return t;
        }
    }, nu = {
        parse (e) {
            let t = rS.parse(nc(e));
            if ("error" in t) throw Error(t.error);
            return t;
        }
    }, n_ = {
        getCapabilities: {
            parse: (e)=>eG.parse(nc(e))
        },
        opticalStatus: rb,
        opticalSet: rb,
        getStatus: {
            parse: (e)=>rj.parse(nc(e))
        },
        getTopology: {
            parse: (e)=>rK.parse(nc(e))
        },
        getTopologyNode: {
            parse: (e)=>rG.parse(nc(e))
        },
        getTopologyClients: {
            parse: (e)=>rL.parse(nc(e))
        },
        getSync: {
            parse: (e)=>tb.parse(nc(e))
        },
        configCheck: {
            parse (e) {
                if ("object" == typeof e && null !== e && "error" in e && ("valid" in e || "revision" in e || "devices" in e)) throw Error("Mixed configuration check result");
                return eK.parse(e);
            }
        },
        npuStatus: rl,
        configReload: {
            parse: (e)=>tb.parse(nc(e))
        },
        restartService: {
            parse: (e)=>rv.parse(nc(e))
        },
        sync: {
            parse: (e)=>nu.parse(nc(e))
        },
        npuSet: ro,
        mibStart: {
            parse: (e)=>tH.parse(nc(e))
        },
        mibResult: {
            parse: (e)=>tK.parse(nc(e))
        },
        jobRelease: {
            parse: (e)=>tX.parse(nc(e))
        },
        hl202List: {
            parse: (e)=>np.parse(nc(e))
        },
        hl202Report: {
            parse: (e)=>tH.parse(nc(e))
        },
        hl202AccountsStart: {
            parse: (e)=>tH.parse(nc(e))
        },
        hl202AccountUpdate: {
            parse: (e)=>tH.parse(nc(e))
        },
        hl202ExecStart: {
            parse: (e)=>tH.parse(nc(e))
        },
        jobResult: {
            parse: (e)=>tK.parse(nc(e))
        },
        getCalibration: {
            parse: (e)=>eF.parse(nc(e))
        },
        saveCalibration: {
            parse: (e)=>eZ.parse(nc(e))
        },
        applyCalibration: {
            parse: (e)=>tH.parse(nc(e))
        }
    };
    function nf() {
        var e;
        let t, r, i, a, o, s, l, d, c, p, u, f, g, b, m, h, v, y, w, x, k, z, j, C, S, $;
        return n ??= (e = L.rpc, t = e.declare({
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
        }), p = e.declare({
            object: "fttr",
            method: "npu_status",
            reject: !0
        }), u = e.declare({
            object: "fttr",
            method: "config_reload",
            reject: !0
        }), f = e.declare({
            object: "fttr",
            method: "restart_service",
            reject: !0
        }), g = e.declare({
            object: "fttr",
            method: "sync",
            params: [
                "action",
                "target",
                "management",
                "item"
            ],
            reject: !0
        }), b = e.declare({
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
        }), h = e.declare({
            object: "fttr",
            method: "mib_result",
            params: [
                "job",
                "chunk"
            ],
            reject: !0
        }), v = e.declare({
            object: "fttr",
            method: "job_release",
            params: [
                "job"
            ],
            reject: !0
        }), y = e.declare({
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
        }), x = e.declare({
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
        }), z = e.declare({
            object: "fttr",
            method: "hl202_exec_start",
            params: [
                "target",
                "script",
                "timeout_seconds"
            ],
            reject: !0
        }), j = e.declare({
            object: "fttr",
            method: "job_result",
            params: [
                "job",
                "chunk"
            ],
            reject: !0
        }), C = e.declare({
            object: "fttr",
            method: "get_calibration",
            reject: !0
        }), S = e.declare({
            object: "fttr",
            method: "save_calibration",
            params: [
                "data"
            ],
            reject: !0
        }), $ = e.declare({
            object: "fttr",
            method: "apply_calibration",
            reject: !0
        }), {
            getCapabilities: async ()=>n_.getCapabilities.parse(await t()),
            opticalStatus: async ()=>n_.opticalStatus.parse(await r()),
            opticalSet: async (e)=>n_.opticalSet.parse(await i(e.enabled, e.downstream_tx_enabled, e.fec_enabled)),
            getStatus: async ()=>n_.getStatus.parse(await a()),
            getTopology: async ()=>n_.getTopology.parse(await o()),
            getTopologyNode: async (e)=>n_.getTopologyNode.parse(await s(e.node_id, e.snapshot_id)),
            getTopologyClients: async (e)=>n_.getTopologyClients.parse(await l(e.node_id, e.snapshot_id, e.cursor, e.limit)),
            getSync: async ()=>n_.getSync.parse(await d()),
            configCheck: async ()=>n_.configCheck.parse(await c()),
            npuStatus: async ()=>n_.npuStatus.parse(await p()),
            configReload: async ()=>n_.configReload.parse(await u()),
            restartService: async ()=>n_.restartService.parse(await f()),
            sync: async (e)=>n_.sync.parse(await g(e.action, e.target, e.management, e.item)),
            npuSet: async (e)=>n_.npuSet.parse(await b(e.enabled, e.bridge, e.wan_upstream, e.wan_downstream, e.onu_bridge)),
            mibStart: async (e)=>n_.mibStart.parse(await m(e.onu_id, e.optical_sn, e.tables)),
            mibResult: async (e)=>n_.mibResult.parse(await h(e.job, e.chunk)),
            jobRelease: async (e)=>n_.jobRelease.parse(await v(e.job)),
            hl202List: async ()=>n_.hl202List.parse(await y()),
            hl202Report: async (e)=>n_.hl202Report.parse(await w(e.target)),
            hl202AccountsStart: async (e)=>n_.hl202AccountsStart.parse(await x(e.target)),
            hl202AccountUpdate: async (e)=>n_.hl202AccountUpdate.parse(await k(e.target, e.kind, e.entry, e.password, e.active)),
            hl202ExecStart: async (e)=>n_.hl202ExecStart.parse(await z(e.target, e.script, e.timeout_seconds)),
            jobResult: async (e)=>n_.jobResult.parse(await j(e.job, e.chunk)),
            getCalibration: async ()=>n_.getCalibration.parse(await C()),
            saveCalibration: async (e)=>n_.saveCalibration.parse(await S(e.data)),
            applyCalibration: async ()=>n_.applyCalibration.parse(await $())
        });
    }
    let ng = L.rpc.declare({
        object: "luci-rpc",
        method: "getNetworkDevices",
        expect: {
            "": {}
        },
        reject: !0
    }), nb = async ()=>nf().getStatus(), nm = async ()=>nf().configReload(), nh = async ()=>rH.parse(nc(await ng())), nv = async ()=>nf().opticalStatus(), ny = async (e)=>nf().opticalSet(e), nw = async (e, t, r)=>nf().mibStart({
            onu_id: e,
            optical_sn: t,
            tables: r
        }), nx = async (e, t)=>nf().mibResult({
            job: e,
            chunk: t
        }), nk = async (e)=>nf().jobRelease({
            job: e
        }), nz = (e)=>JSON.stringify(e, null, 2);
    async function nj(e) {
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
    function nC(e) {
        let t = e.reference;
        return t?.url.startsWith("https://github.com/opencord/omci-lib-go/blob/v2.2.4/") ? d("a", {
            href: t.url,
            target: "_blank",
            rel: "noopener noreferrer",
            children: t.id
        }) : d("span", {
            children: "\u2014"
        });
    }
    let nS = L.rpc.declare({
        object: "uci",
        method: "get",
        params: [
            "config",
            "type"
        ],
        reject: !0
    }), n$ = L.rpc.declare({
        object: "uci",
        method: "changes",
        params: [
            "config"
        ],
        reject: !0
    }), nO = L.rpc.declare({
        object: "uci",
        method: "set",
        params: [
            "config",
            "section",
            "values"
        ],
        reject: !0
    }), nP = L.rpc.declare({
        object: "uci",
        method: "delete",
        params: [
            "config",
            "section",
            "option"
        ],
        reject: !0
    }), nM = L.rpc.declare({
        object: "uci",
        method: "commit",
        params: [
            "config"
        ],
        reject: !0
    }), nE = !1;
    async function nN(e, t, r) {
        if (!L.hasViewPermission() || !t || nE) return;
        let n = e.serial_number.toUpperCase(), i = t.desired[n], a = void 0 !== i, o = a ? i : e.onu_id, s = a ? _("Unpin interface") : _("Pin interface");
        try {
            var l, c, p, u, f, g, b, m, h, v, y, w, x, k, z, j;
            let { values: e } = await nS("fttr", "device"), t = (e)=>Object.entries(e).find((e)=>{
                    let [, t] = e;
                    return "device" === t[".type"] && t.optical_sn?.toUpperCase() === n;
                }), C = t(e);
            if (!C) return void L.ui.showModal(s, (b = {
                children: [
                    (l = {
                        children: _("Add this device on the configuration page before fixing its interface.")
                    }, d("p", l)),
                    (p = {
                        children: (c = {
                            children: n
                        }, d("code", c))
                    }, d("p", p)),
                    (g = {
                        class: "right",
                        children: [
                            (u = {
                                type: "button",
                                class: "cbi-button",
                                onclick: ()=>L.ui.hideModal(),
                                children: _("Cancel")
                            }, d("button", u)),
                            " ",
                            (f = {
                                class: "cbi-button cbi-button-action",
                                href: L.url("admin", "network", "fttr", "config"),
                                children: _("Configuration")
                            }, d("a", f))
                        ]
                    }, d("div", g))
                ]
            }, d("div", b)));
            let S = (m = {
                class: "error",
                role: "alert"
            }, d("p", m)), $ = (h = {
                type: "button",
                class: "cbi-button",
                onclick: ()=>L.ui.hideModal(),
                children: _("Cancel")
            }, d("button", h)), O = (v = {
                type: "button",
                class: "cbi-button cbi-button-action",
                onclick: async ()=>{
                    if (nE) return;
                    nE = !0, O.disabled = $.disabled = !0, S.textContent = "";
                    let e = !1;
                    try {
                        var n;
                        if ((await n$("fttr")).changes.length) throw Error(_("Apply or discard pending FTTR configuration changes first."));
                        let s = (await nS("fttr", "device")).values, l = t(s);
                        if (!l || l[0] !== C[0] || l[1].onu_id !== C[1].onu_id || (null == l[1].onu_id ? void 0 : Number(l[1].onu_id)) !== i) throw Error(_("Interface configuration changed. Refresh the page and try again."));
                        if (!a && Object.entries(s).some((e)=>{
                            let [t, r] = e;
                            return t !== l[0] && "device" === r[".type"] && null != r.onu_id && Number(r.onu_id) === o;
                        })) throw Error(_("Interface already reserved by another device."));
                        a ? await nP("fttr", l[0], "onu_id") : await nO("fttr", l[0], {
                            onu_id: String(o)
                        }), await nM("fttr"), e = !0, await nm(), r(await nb()), L.ui.hideModal(), L.ui.addNotification(null, (n = {
                            children: _("Interface setting saved. Restart FTTR for it to take effect.")
                        }, d("p", n)), "info");
                    } catch (t) {
                        S.textContent = `${e ? _("Saved, but configuration reload or status refresh failed:") : _("Failed to save interface setting:")} ${String(t)}`;
                    } finally{
                        nE = !1, O.disabled = e, $.disabled = !1;
                    }
                },
                children: _("Confirm")
            }, d("button", v));
            L.ui.showModal(s, (j = {
                children: [
                    (y = {
                        children: a ? _("Cancel the fixed interface for this device?") : _("Fix this device to its current interface?")
                    }, d("p", y)),
                    (x = {
                        children: [
                            (w = {
                                children: n
                            }, d("code", w)),
                            ` \xb7 fttr${o + 1} \xb7 ONU-ID ${o}`
                        ]
                    }, d("p", x)),
                    (k = {
                        children: _("This saves the configuration only. The current allocation stays unchanged until FTTR is restarted.")
                    }, d("p", k)),
                    S,
                    (z = {
                        class: "right",
                        children: [
                            $,
                            " ",
                            O
                        ]
                    }, d("div", z))
                ]
            }, d("div", j)));
        } catch (e) {
            L.ui.addNotification(null, d("p", {
                children: String(e)
            }), "error");
        }
    }
    let nR = L.view, nL = L.Poll;
    function nA(e, t) {
        var r, n, i;
        let a, o = e, s = d("button", {
            type: "button",
            class: "cbi-button cbi-button-neutral",
            style: "padding:0 .4em;min-height:1.5em;font-size:85%;margin-left:.5em",
            onclick: ()=>nN(o, a, t)
        }), c = d("span", {}), p = d("span", {}), u = d("span", {}), f = d("code", {
            style: "font-size:90%"
        }), g = d("span", {
            class: "fttr-badge"
        }), b = d("span", {
            class: "fttr-badge"
        }), m = d("span", {
            style: "font-size:90%"
        }), h = d("code", {
            style: "font-size:90%"
        }), v = d("span", {
            class: "fttr-badge"
        }), y = d("span", {
            class: "fttr-badge"
        }), w = d("span", {
            class: "fttr-badge"
        }), x = (i = {
            "data-fttr-onu-id": String(e.onu_id),
            children: [
                d("td", {
                    children: [
                        c,
                        s
                    ]
                }),
                d("td", {
                    children: p
                }),
                d("td", {
                    children: u
                }),
                d("td", {
                    children: f
                }),
                d("td", {
                    children: g
                }),
                d("td", {
                    children: b
                }),
                d("td", {
                    children: m
                }),
                d("td", {
                    children: h
                }),
                d("td", {
                    children: v
                }),
                d("td", {
                    children: y
                }),
                d("td", {
                    children: w
                }),
                (n = {
                    style: "text-align:right",
                    children: (r = {
                        type: "button",
                        class: "cbi-button cbi-button-neutral",
                        onclick: ()=>(function(e) {
                                var t, r, n, i, a, o, s, c, p, u, f, g;
                                let b = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "basic", m = !1, h = !1, v = null, y = null, w = (t = {
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
                                                    d("code", {
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
                                                    e.identity?.omcc_version == null ? null : d("code", {
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
                                                    d(r4, {
                                                        state: e.state
                                                    })
                                                ],
                                                [
                                                    _("Business"),
                                                    d(r6, {
                                                        status: e.business_status
                                                    })
                                                ],
                                                [
                                                    _("Receive optical power"),
                                                    rQ(e.optical_rx_power_dbm)
                                                ],
                                                [
                                                    _("Transmit optical power"),
                                                    rQ(e.optical_tx_power_dbm)
                                                ],
                                                [
                                                    _("Equalization delay (EQD)"),
                                                    null == e.equalization_delay_bits ? "\u2014" : d("code", {
                                                        style: "font-size:90%",
                                                        children: [
                                                            e.equalization_delay_bits,
                                                            " bits"
                                                        ]
                                                    })
                                                ],
                                                [
                                                    _("Data interface"),
                                                    e.data_path?.interface ? d("code", {
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
                                                    d(ne, {
                                                        management: e.management
                                                    })
                                                ],
                                                [
                                                    _("Last Inform"),
                                                    e.management?.last_inform ? `${new Date(1000 * e.management.last_inform).toLocaleString()}${null != e.management.age_seconds ? ` (${e.management.age_seconds} s)` : ""}` : null
                                                ],
                                                [
                                                    _("Provisioning"),
                                                    d(nn, {
                                                        provisioning: e.provisioning
                                                    })
                                                ],
                                                [
                                                    _("Wi-Fi sync"),
                                                    d(no, {
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
                                                d("h3", {
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
                                                                    d("th", {
                                                                        style: "width:35%",
                                                                        children: r
                                                                    }),
                                                                    d("td", {
                                                                        children: n instanceof Node ? n : rX(n)
                                                                    })
                                                                ]
                                                            }, d("tr", t);
                                                        })
                                                    }, d("tbody", t))
                                                }, d("table", r))
                                            ]
                                        }, d("div", n);
                                    })
                                }, d("div", t)), x = (r = {
                                    class: "mib-status-bar",
                                    role: "status",
                                    children: d("span", {
                                        class: "mib-hint-text",
                                        children: _("Read MIB on demand. Results are a snapshot, not live polling.")
                                    })
                                }, d("div", r)), k = (n = {
                                    class: "cbi-progressbar",
                                    style: "display:none;width:100%",
                                    title: "0%",
                                    children: d("div", {
                                        style: "width:0%"
                                    })
                                }, d("div", n)), z = d("div", {}), j = d("pre", {
                                    class: "onu-raw-pre"
                                }), C = d("span", {
                                    class: "download-status",
                                    role: "status"
                                }), S = null, $ = d("button", {
                                    type: "button",
                                    class: "cbi-button cbi-button-action",
                                    disabled: !0,
                                    onclick: async ()=>{
                                        if (v && !m) {
                                            $.disabled = !0, C.textContent = _("Preparing JSON download\u2026");
                                            try {
                                                let t = await nj(v);
                                                if (m) return;
                                                S && URL.revokeObjectURL(S), S = URL.createObjectURL(t);
                                                let r = document.createElement("a");
                                                r.href = S, r.download = `mib-${e.serial_number}.json`, r.click(), C.textContent = _("JSON download started"), window.setTimeout(()=>{
                                                    URL.revokeObjectURL(r.href), S === r.href && (S = null);
                                                }, 1000);
                                            } catch (e) {
                                                C.textContent = String(e);
                                            } finally{
                                                $.disabled = !v || m;
                                            }
                                        }
                                    },
                                    children: _("Download JSON")
                                }), O = (a = {
                                    class: "onu-raw-panel",
                                    children: [
                                        (i = {
                                            class: "onu-raw-toolbar",
                                            children: [
                                                d("span", {
                                                    class: "onu-raw-hint",
                                                    children: _("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")
                                                }),
                                                d("div", {
                                                    class: "onu-raw-actions",
                                                    children: [
                                                        $,
                                                        C
                                                    ]
                                                })
                                            ]
                                        }, d("div", i)),
                                        j
                                    ]
                                }, d("div", a)), P = d("button", {
                                    type: "button",
                                    class: "cbi-button cbi-button-apply",
                                    onclick: ()=>q(!1),
                                    children: _("Read MIB")
                                }), M = d("button", {
                                    type: "button",
                                    class: "cbi-button cbi-button-action",
                                    onclick: ()=>q(!0),
                                    children: _("Read MIB and VLAN tables")
                                }), N = (c = {
                                    class: "onu-mib-panel",
                                    children: [
                                        (s = {
                                            class: "mib-controls",
                                            children: [
                                                (o = {
                                                    class: "mib-action-group",
                                                    children: [
                                                        P,
                                                        M,
                                                        d("small", {
                                                            class: "mib-action-hint",
                                                            children: _("Collecting VLAN tables queries extended filter tables and takes longer.")
                                                        })
                                                    ]
                                                }, d("div", o)),
                                                x,
                                                k
                                            ]
                                        }, d("div", s)),
                                        z
                                    ]
                                }, d("div", c)), R = {
                                    basic: w,
                                    mib: N,
                                    raw: O
                                }, A = new Map();
                                function I(e) {
                                    for (let [t, r] of Object.entries(R))t === e ? r.style.removeProperty("display") : r.style.setProperty("display", "none", "important");
                                    for (let [t, r] of A)r.className = t === e ? "cbi-tab" : "cbi-tab-disabled";
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
                                            class: e.id === b ? "cbi-tab" : "cbi-tab-disabled",
                                            "data-tab": e.id,
                                            children: d("a", {
                                                href: `#tab-${e.id}`,
                                                onclick: (t)=>{
                                                    t.preventDefault(), I(e.id);
                                                },
                                                children: e.label
                                            })
                                        }, d("li", t));
                                        return A.set(e.id, r), r;
                                    })
                                }, d("ul", p)), D = (g = {
                                    children: [
                                        d("div", {
                                            class: "onu-details-header",
                                            children: T
                                        }),
                                        (u = {
                                            class: "onu-details-dialog",
                                            children: [
                                                d("style", {
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
				${ns}
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
                                                N,
                                                O
                                            ]
                                        }, d("div", u)),
                                        (f = {
                                            class: "right onu-details-footer",
                                            children: d("button", {
                                                type: "button",
                                                class: "cbi-button",
                                                onclick: ()=>{
                                                    m = !0, S && URL.revokeObjectURL(S), S = null, v = null, j.textContent = "", z.replaceChildren(), L.ui.hideModal();
                                                },
                                                children: _("Close")
                                            })
                                        }, d("div", f))
                                    ]
                                }, d(l, g)), U = ()=>!m && D.isConnected && D.getClientRects().length > 0;
                                async function q(t) {
                                    if (!h) {
                                        h = !0, P.disabled = M.disabled = !0, k.style.display = "", k.title = "0%", k.firstElementChild.style.width = "0%", x.textContent = _("Reading MIB\u2026");
                                        try {
                                            let h = await nb(), w = h.sub_gateways?.find((t)=>t.serial_number === e.serial_number);
                                            if (w?.state !== "o5_operation") throw Error(_("Device is offline; reopen details after registration."));
                                            if (!U()) return;
                                            let C = await nw(w.onu_id, w.serial_number, t);
                                            y = C.job;
                                            let S = Date.now() + 140000;
                                            for(; U();){
                                                let e = await nx(C.job, 0);
                                                if (!U()) return;
                                                if ("ready" === e.status) {
                                                    var r, n, i, a, o, s, l, c, p, u, f, g, b, m;
                                                    if (!e.chunks || e.chunks > 1024 || !e.bytes || e.bytes > 33554432 || 0 !== e.chunk || !e.data) throw Error(_("Invalid MIB snapshot"));
                                                    let t = new Uint8Array(e.bytes), h = 0;
                                                    for(let r = 0; r < e.chunks; r++){
                                                        let n = 0 === r ? e : await nx(C.job, r);
                                                        if (!U()) return;
                                                        if ("ready" !== n.status || n.chunk !== r || n.chunks !== e.chunks || n.bytes !== e.bytes || !n.data) throw Error(_("Invalid MIB snapshot chunk"));
                                                        let i = atob(n.data);
                                                        if (i.length > 32768 || h + i.length > t.length) throw Error(_("Invalid MIB snapshot size"));
                                                        for(let e = 0; e < i.length; e++)t[h++] = i.charCodeAt(e);
                                                        let a = Math.min(100, Math.round((r + 1) / e.chunks * 100));
                                                        k.title = `${a}%`, k.firstElementChild.style.width = `${a}%`, x.textContent = `${_("Downloading MIB snapshot")}: ${r + 1}/${e.chunks}`;
                                                    }
                                                    if (h !== t.length) throw Error(_("Incomplete MIB snapshot"));
                                                    if (await F(), v = ra.parse(nc(JSON.parse(new TextDecoder("utf-8", {
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
                                                            }, d("span", i)),
                                                            (a = {
                                                                class: `mib-chip ${r.uploaded_complete ? "mib-chip-success" : "mib-chip-warning"}`,
                                                                children: r.uploaded_complete ? _("Upload complete") : _("Upload incomplete")
                                                            }, d("span", a)),
                                                            (o = {
                                                                class: "mib-chip mib-chip-info",
                                                                children: [
                                                                    _("Records"),
                                                                    ": ",
                                                                    r.received_records,
                                                                    r.expected_records !== r.received_records ? ` / ${r.expected_records}` : ""
                                                                ]
                                                            }, d("span", o)),
                                                            (s = {
                                                                class: "mib-chip",
                                                                children: [
                                                                    _("Decoded"),
                                                                    ": ",
                                                                    r.decoded_records
                                                                ]
                                                            }, d("span", s)),
                                                            r.partial_records > 0 ? (l = {
                                                                class: "mib-chip mib-chip-warning",
                                                                children: [
                                                                    _("Partial"),
                                                                    ": ",
                                                                    r.partial_records
                                                                ]
                                                            }, d("span", l)) : null,
                                                            (c = {
                                                                class: "mib-chip mib-chip-neutral",
                                                                children: [
                                                                    _("Basic"),
                                                                    ": ",
                                                                    r.basic_records
                                                                ]
                                                            }, d("span", c)),
                                                            (p = {
                                                                class: "mib-chip",
                                                                children: r.tables_collected ? _("VLAN tables collected") : _("VLAN tables not collected")
                                                            }, d("span", p)),
                                                            (u = {
                                                                class: "mib-chip mib-chip-subtle",
                                                                children: new Date().toLocaleTimeString()
                                                            }, d("span", u))
                                                        ]
                                                    }, d("div", f))), z.replaceChildren(function(e) {
                                                        var t, r, n, i, a, o;
                                                        let s = e.classes.length ? e.classes[0].class_id : null, l = (t = {
                                                            class: "mib-content"
                                                        }, d("div", t)), c = (r = {
                                                            type: "search",
                                                            class: "cbi-input-text mib-search-input",
                                                            placeholder: _("Search ME name or Class ID\u2026")
                                                        }, d("input", r)), p = (n = {
                                                            class: "mib-class-list"
                                                        }, d("div", n)), u = new Map();
                                                        function f(t) {
                                                            var r, n;
                                                            for (let [e, r] of (s = t, u))e === t ? r.classList.add("active") : r.classList.remove("active");
                                                            let i = e.entities.filter((e)=>e.class_id === t);
                                                            i.length ? l.replaceChildren(...i.map((r, n)=>{
                                                                var i, a, o, s, l, c, p, u, f, g, b, m, h, v, y, w, x, k, z;
                                                                return z = {
                                                                    open: 0 === n,
                                                                    class: "mib-entity-details",
                                                                    children: [
                                                                        (l = {
                                                                            class: "mib-entity-summary",
                                                                            children: [
                                                                                (o = {
                                                                                    class: "mib-entity-title",
                                                                                    children: [
                                                                                        (i = {
                                                                                            children: rX(r.name)
                                                                                        }, d("strong", i)),
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
                                                                                        }, d("span", a))
                                                                                    ]
                                                                                }, d("span", o)),
                                                                                (s = {
                                                                                    class: "mib-entity-support",
                                                                                    children: r.support
                                                                                }, d("span", s))
                                                                            ]
                                                                        }, d("summary", l)),
                                                                        (k = {
                                                                            class: "mib-entity-body",
                                                                            children: [
                                                                                r.attributes.length ? (h = {
                                                                                    class: "table mib-attributes-table",
                                                                                    children: [
                                                                                        (b = {
                                                                                            children: (g = {
                                                                                                children: [
                                                                                                    (c = {
                                                                                                        style: "width:28%",
                                                                                                        children: _("Attribute")
                                                                                                    }, d("th", c)),
                                                                                                    (p = {
                                                                                                        style: "width:14%",
                                                                                                        children: _("Type")
                                                                                                    }, d("th", p)),
                                                                                                    (u = {
                                                                                                        children: _("Value")
                                                                                                    }, d("th", u)),
                                                                                                    (f = {
                                                                                                        style: "width:18%",
                                                                                                        children: _("Definition")
                                                                                                    }, d("th", f))
                                                                                                ]
                                                                                            }, d("tr", g))
                                                                                        }, d("thead", b)),
                                                                                        (m = {
                                                                                            children: r.attributes.map((e)=>{
                                                                                                var t, r, n, i, a, o, s, l, c, p;
                                                                                                return p = {
                                                                                                    children: [
                                                                                                        (t = {
                                                                                                            class: "mib-attr-name",
                                                                                                            children: e.definition.name
                                                                                                        }, d("td", t)),
                                                                                                        (n = {
                                                                                                            class: "mib-attr-kind",
                                                                                                            children: (r = {
                                                                                                                children: e.definition.kind
                                                                                                            }, d("code", r))
                                                                                                        }, d("td", n)),
                                                                                                        (l = {
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
                                                                                                                                return rX(e.value);
                                                                                                                            case "octets":
                                                                                                                                return rX(e.hex);
                                                                                                                            case "table_length":
                                                                                                                                return rX(e.bytes);
                                                                                                                            default:
                                                                                                                                throw new nd("unexpected_variant", `Unexpected variant: ${String(e)}`);
                                                                                                                        }
                                                                                                                    }(e.value)
                                                                                                                }, d("span", i)),
                                                                                                                e.observations?.length ? (s = {
                                                                                                                    class: "mib-obs-details",
                                                                                                                    children: [
                                                                                                                        (a = {
                                                                                                                            children: _("Raw data / observations")
                                                                                                                        }, d("summary", a)),
                                                                                                                        (o = {
                                                                                                                            class: "mib-pre",
                                                                                                                            children: nz(e.observations)
                                                                                                                        }, d("pre", o))
                                                                                                                    ]
                                                                                                                }, d("details", s)) : null
                                                                                                            ]
                                                                                                        }, d("td", l)),
                                                                                                        (c = {
                                                                                                            class: "mib-attr-ref",
                                                                                                            children: nC(e.definition)
                                                                                                        }, d("td", c))
                                                                                                    ]
                                                                                                }, d("tr", p);
                                                                                            })
                                                                                        }, d("tbody", m))
                                                                                    ]
                                                                                }, d("table", h)) : (v = {
                                                                                    children: _("Basic display only; raw records are preserved.")
                                                                                }, d("p", v)),
                                                                                e.tables.filter((e)=>e.class_id === t && e.entity_id === r.entity_id).map((e)=>{
                                                                                    var t, r, n, i, a, o, s, l, c, p, u, f, g, b, m, h;
                                                                                    return h = {
                                                                                        class: "mib-table-details",
                                                                                        children: [
                                                                                            (t = {
                                                                                                children: [
                                                                                                    e.attribute.name,
                                                                                                    " \xb7",
                                                                                                    " ",
                                                                                                    e.collected ? `${e.rows.length} ${_("rows")}` : rX(e.error)
                                                                                                ]
                                                                                            }, d("summary", t)),
                                                                                            e.vlan_rules.length ? (g = {
                                                                                                class: "mib-table-overflow",
                                                                                                children: (f = {
                                                                                                    class: "table",
                                                                                                    children: [
                                                                                                        (p = {
                                                                                                            children: (c = {
                                                                                                                children: [
                                                                                                                    (r = {
                                                                                                                        children: _("Outer filter (priority / VID / TPID-DEI)")
                                                                                                                    }, d("th", r)),
                                                                                                                    (n = {
                                                                                                                        children: _("Inner filter (priority / VID / TPID-DEI)")
                                                                                                                    }, d("th", n)),
                                                                                                                    (i = {
                                                                                                                        children: _("EtherType code")
                                                                                                                    }, d("th", i)),
                                                                                                                    (a = {
                                                                                                                        children: _("Remove tags")
                                                                                                                    }, d("th", a)),
                                                                                                                    (o = {
                                                                                                                        children: _("Outer treatment (priority / VID / TPID-DEI)")
                                                                                                                    }, d("th", o)),
                                                                                                                    (s = {
                                                                                                                        children: _("Inner treatment (priority / VID / TPID-DEI)")
                                                                                                                    }, d("th", s)),
                                                                                                                    (l = {
                                                                                                                        children: _("Delete entry")
                                                                                                                    }, d("th", l))
                                                                                                                ]
                                                                                                            }, d("tr", c))
                                                                                                        }, d("thead", p)),
                                                                                                        (u = {
                                                                                                            children: e.vlan_rules.map((e)=>{
                                                                                                                var t, r, n, i, a, o, s, l;
                                                                                                                return l = {
                                                                                                                    children: [
                                                                                                                        (t = {
                                                                                                                            children: `${e.filter_outer_priority} / ${e.filter_outer_vid} / ${e.filter_outer_tpid_dei}`
                                                                                                                        }, d("td", t)),
                                                                                                                        (r = {
                                                                                                                            children: `${e.filter_inner_priority} / ${e.filter_inner_vid} / ${e.filter_inner_tpid_dei}`
                                                                                                                        }, d("td", r)),
                                                                                                                        (n = {
                                                                                                                            children: rX(e.filter_ethertype)
                                                                                                                        }, d("td", n)),
                                                                                                                        (i = {
                                                                                                                            children: rX(e.tags_to_remove)
                                                                                                                        }, d("td", i)),
                                                                                                                        (a = {
                                                                                                                            children: `${e.treatment_outer_priority} / ${e.treatment_outer_vid} / ${e.treatment_outer_tpid_dei}`
                                                                                                                        }, d("td", a)),
                                                                                                                        (o = {
                                                                                                                            children: `${e.treatment_inner_priority} / ${e.treatment_inner_vid} / ${e.treatment_inner_tpid_dei}`
                                                                                                                        }, d("td", o)),
                                                                                                                        (s = {
                                                                                                                            children: rX(e.delete_entry)
                                                                                                                        }, d("td", s))
                                                                                                                    ]
                                                                                                                }, d("tr", l);
                                                                                                            })
                                                                                                        }, d("tbody", u))
                                                                                                    ]
                                                                                                }, d("table", f))
                                                                                            }, d("div", g)) : null,
                                                                                            (b = {
                                                                                                style: "margin-top:6px",
                                                                                                children: [
                                                                                                    _("G.988 encoded field values"),
                                                                                                    ": ",
                                                                                                    nC(e.attribute)
                                                                                                ]
                                                                                            }, d("p", b)),
                                                                                            (m = {
                                                                                                class: "mib-pre",
                                                                                                children: nz(e.vlan_rules.length ? e.vlan_rules : e.rows)
                                                                                            }, d("pre", m))
                                                                                        ]
                                                                                    }, d("details", h);
                                                                                }),
                                                                                (x = {
                                                                                    class: "mib-diag-details",
                                                                                    children: [
                                                                                        (y = {
                                                                                            children: _("Records / diagnostics")
                                                                                        }, d("summary", y)),
                                                                                        (w = {
                                                                                            class: "mib-pre",
                                                                                            children: nz({
                                                                                                diagnostics: r.diagnostics,
                                                                                                records: e.records.filter((e)=>e.class_id === t && e.entity_id === r.entity_id)
                                                                                            })
                                                                                        }, d("pre", w))
                                                                                    ]
                                                                                }, d("details", x))
                                                                            ]
                                                                        }, d("div", k))
                                                                    ]
                                                                }, d("details", z);
                                                            })) : l.replaceChildren((n = {
                                                                class: "mib-empty-content",
                                                                children: (r = {
                                                                    children: _("No entities recorded for this ME class.")
                                                                }, d("p", r))
                                                            }, d("div", n)));
                                                        }
                                                        function g() {
                                                            var t;
                                                            let r = c.value.trim().toLowerCase();
                                                            u.clear();
                                                            let n = e.classes.filter((e)=>`${e.class_id} ${e.name ?? ""}`.toLowerCase().includes(r));
                                                            n.length ? p.replaceChildren(...n.map((e)=>{
                                                                var t, r, n, i;
                                                                let a = (i = {
                                                                    type: "button",
                                                                    class: `mib-class-btn${e.class_id === s ? " active" : ""}`,
                                                                    onclick: ()=>f(e.class_id),
                                                                    children: [
                                                                        (t = {
                                                                            class: "mib-class-id",
                                                                            children: e.class_id
                                                                        }, d("span", t)),
                                                                        (r = {
                                                                            class: "mib-class-name",
                                                                            title: e.name ?? _("Unknown class"),
                                                                            children: e.name ?? _("Unknown class")
                                                                        }, d("span", r)),
                                                                        (n = {
                                                                            class: "mib-class-count",
                                                                            children: e.entities
                                                                        }, d("span", n))
                                                                    ]
                                                                }, d("button", i));
                                                                return u.set(e.class_id, a), a;
                                                            })) : p.replaceChildren((t = {
                                                                class: "mib-empty-list",
                                                                children: _("No matching ME classes")
                                                            }, d("div", t)));
                                                        }
                                                        return c.addEventListener("input", g), g(), e.classes.length && f(e.classes[0].class_id), o = {
                                                            class: "mib-browser",
                                                            children: [
                                                                (a = {
                                                                    class: "mib-sidebar",
                                                                    children: [
                                                                        (i = {
                                                                            class: "mib-search-box",
                                                                            children: c
                                                                        }, d("div", i)),
                                                                        p
                                                                    ]
                                                                }, d("div", a)),
                                                                l
                                                            ]
                                                        }, d("div", o);
                                                    }(v), (m = {
                                                        class: "mib-upload-diagnostics",
                                                        children: [
                                                            (g = {
                                                                children: _("Upload diagnostics")
                                                            }, d("summary", g)),
                                                            (b = {
                                                                class: "mib-pre",
                                                                children: nz(v.diagnostics)
                                                            }, d("pre", b))
                                                        ]
                                                    }, d("details", m))), n = v, j.textContent = nz({
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
                                                    }), $.disabled = !1;
                                                    return;
                                                }
                                                if (e.progress) {
                                                    let { phase: t, received: r, expected: n } = e.progress;
                                                    if (x.textContent = "starting" === t ? _("Starting OMCI MIB read\u2026") : "tables" === t ? `${_("Collecting VLAN tables")}${null == n ? "" : `: ${r}/${n}`}` : null == n ? _("Reading OMCI MIB records\u2026") : `${_("Reading OMCI MIB records")}: ${r}/${n}`, n && n > 0) {
                                                        let e = Math.min(100, Math.round(r / n * 100));
                                                        k.title = `${e}%`, k.firstElementChild.style.width = `${e}%`;
                                                    }
                                                }
                                                if (Date.now() >= S) throw Error(_("MIB query timed out; retry."));
                                                await new Promise((e)=>setTimeout(e, 1000));
                                            }
                                        } catch (e) {
                                            U() && (k.style.display = "none", x.replaceChildren(d("span", {
                                                class: "mib-error-text",
                                                children: [
                                                    String(e),
                                                    v ? ` \xb7 ${_("Previous snapshot retained")}` : ""
                                                ]
                                            })));
                                        } finally{
                                            await F(), h = !1, P.disabled = M.disabled = !1;
                                        }
                                    }
                                }
                                async function F() {
                                    if (!y) return;
                                    let e = y;
                                    y = null;
                                    try {
                                        await nk(e);
                                    } catch (e) {
                                        console.warn("Failed to release MIB snapshot", e);
                                    }
                                }
                                I(b), L.ui.showModal(`${e.model} \u{2014} ${e.serial_number}`, D, "modal-wide");
                            })(o),
                        children: _("Details")
                    }, d("button", r))
                }, d("td", n))
            ]
        }, d("tr", i));
        x.addEventListener("mouseenter", ()=>{
            let e = o.data_path?.interface;
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
                o = e, a = t;
                let r = e.serial_number.toUpperCase(), n = t?.desired[r];
                s.textContent = void 0 !== n ? _("Unpin") : _("Pin"), s.hidden = !t, s.disabled = !L.hasViewPermission(), s.title = n !== t?.active[r] ? _("Pending restart") : void 0 !== n ? _("Fixed interface") : _("Pin interface"), x.setAttribute("data-fttr-onu-id", String(e.onu_id)), c.textContent = String(e.onu_id), p.textContent = rX(e.vendor), u.textContent = rX(e.identity?.equipment_id ?? e.model), f.textContent = rX(e.serial_number);
                let i = r3(e.state);
                r2(g, i.tone, i.label, i.title);
                let l = r8(e.business_status);
                r2(b, l.tone, l.label, l.title);
                let d = function(e) {
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
                m.textContent = d.display, d.full ? m.setAttribute("title", d.full) : m.removeAttribute("title"), h.textContent = rX(e.data_path?.interface);
                let k = r9(e.management);
                r2(v, k.tone, k.label, k.title);
                let z = nr(e.provisioning);
                r2(y, z.tone, z.label, z.title);
                let j = na(e.wifi_sync);
                r2(w, j.tone, j.label, j.title);
            }
        };
        return k.update(e), k;
    }
    let nI = null, nT = null, nD = !1, main = nR.extend({
        async load () {
            let [e, t] = await Promise.all([
                nb(),
                nh().catch((e)=>(console.warn("Failed to load network device details", e), {}))
            ]);
            return {
                status: e,
                devices: t
            };
        },
        render (e) {
            var t, r, n, i, a, o, s, l, c, p, u, f, g, b, m, h;
            let v, y, w, x, k, z, j, C, S, $, O, P, M, N, R, A, I, T, D, U, q, F, B, Z, V, W, J, G, K, H, X, Q;
            return t = e.status, r = e.devices, v = t.optical_transceiver ?? {}, y = r, w = function(e, t) {
                var r, n, i, a, o;
                let s = new Map();
                for (let r of e)s.set(r.onu_id, nA(r, t));
                let l = (r = {
                    children: d("td", {
                        colSpan: 12,
                        children: _("No registered sub-gateways.")
                    })
                }, d("tr", r)), c = 0 === e.length, p = d("tbody", {
                    children: c ? l : [
                        ...s.values()
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
                                            d("th", {
                                                children: _("ONU ID")
                                            }),
                                            d("th", {
                                                children: _("Vendor")
                                            }),
                                            d("th", {
                                                children: _("Model")
                                            }),
                                            d("th", {
                                                children: _("Optical serial")
                                            }),
                                            d("th", {
                                                children: _("Registration")
                                            }),
                                            d("th", {
                                                children: _("Business")
                                            }),
                                            d("th", {
                                                children: _("Firmware")
                                            }),
                                            d("th", {
                                                children: _("Data interface")
                                            }),
                                            d("th", {
                                                children: _("CWMP")
                                            }),
                                            d("th", {
                                                children: _("Synchronization")
                                            }),
                                            d("th", {
                                                children: _("Wi-Fi sync")
                                            }),
                                            d("th", {
                                                style: "text-align:right",
                                                children: _("Details")
                                            })
                                        ]
                                    }, d("tr", n))
                                }, d("thead", i)),
                                p
                            ]
                        }, d("table", a))
                    }, d("div", o)),
                    update (e, r) {
                        let n = new Set(e.map((e)=>e.onu_id));
                        for (let [e, t] of s)n.has(e) || (t.element.remove(), s.delete(e));
                        if (0 === e.length) {
                            c || p.append(l), c = !0;
                            return;
                        }
                        for (let [n, i] of (c && (l.remove(), c = !1), e.entries())){
                            let e = s.get(i.onu_id);
                            e || (e = nA(i, t), s.set(i.onu_id, e)), e.update(i, r);
                            let a = p.children.item(n);
                            a !== e.element && p.insertBefore(e.element, a);
                        }
                    }
                };
            }(t.sub_gateways ?? [], (e)=>A(e, y)), x = Array.from({
                length: 16
            }, (e, t)=>{
                var r, n, i, a, o, s, l, c, p, u, f, g, b, m, h, v, y, w;
                let x, k, z, j, C, S, $, O, P, M, N, R, A, I, T, D, U, q, F;
                return r = t + 1, x = d("span", {}), k = d("span", {
                    style: "display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:90%",
                    children: _("Unknown")
                }), z = d("img", {
                    src: "/luci-static/resources/icons/port_down.svg",
                    alt: "",
                    "aria-hidden": "true"
                }), j = d("div", {
                    style: "flex:1;height:3px;opacity:0.25;background-color:rgb(240, 144, 144)"
                }), C = d("span", {}), S = d("span", {}), $ = d("span", {}), O = d("span", {}), P = d("span", {}), M = d("span", {}), N = d("span", {}), R = d("span", {}), A = d("span", {}), I = d("span", {}), T = d("span", {}), D = d("span", {}), U = d("span", {}), q = d("span", {}), (w = {
                    class: "ifacebox fttr-port-card",
                    "data-fttr-port": String(r),
                    style: "box-sizing:border-box;margin:0;cursor:pointer",
                    children: [
                        d("div", {
                            class: "ifacebox-head fttr-port-name",
                            style: "font-weight:bold",
                            children: x
                        }),
                        d("div", {
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
                                        d("strong", {
                                            children: [
                                                _("Port status"),
                                                ": "
                                            ]
                                        }),
                                        C,
                                        d("br", {}),
                                        d("strong", {
                                            children: [
                                                _("ONU"),
                                                ": "
                                            ]
                                        }),
                                        S,
                                        d("br", {}),
                                        d("strong", {
                                            children: [
                                                _("MAC address"),
                                                ": "
                                            ]
                                        }),
                                        $
                                    ]
                                }, d("span", n))
                            ]
                        }, d("div", i)),
                        (y = {
                            class: "ifacebox-body",
                            children: (v = {
                                class: "cbi-tooltip-container fttr-port-stats",
                                style: "display:flex;flex-direction:column;align-items:center;font-size:80%;line-height:1.4;cursor:pointer;width:100%",
                                children: [
                                    (a = {
                                        style: "display:flex;flex-direction:column;align-items:center",
                                        children: [
                                            d("div", {
                                                style: "white-space:nowrap",
                                                children: [
                                                    "\u25B2\u202F",
                                                    O
                                                ]
                                            }),
                                            d("div", {
                                                style: "white-space:nowrap",
                                                children: [
                                                    "\u25BC\u202F",
                                                    P
                                                ]
                                            })
                                        ]
                                    }, d("div", a)),
                                    (h = {
                                        class: "cbi-tooltip",
                                        children: (m = {
                                            children: [
                                                (o = {
                                                    class: "nowrap",
                                                    children: [
                                                        d("strong", {
                                                            children: [
                                                                _("Received bytes"),
                                                                ": "
                                                            ]
                                                        }),
                                                        M
                                                    ]
                                                }, d("span", o)),
                                                d("br", {}),
                                                (s = {
                                                    class: "nowrap",
                                                    children: [
                                                        d("strong", {
                                                            children: [
                                                                _("Received packets"),
                                                                ": "
                                                            ]
                                                        }),
                                                        N
                                                    ]
                                                }, d("span", s)),
                                                d("br", {}),
                                                (l = {
                                                    class: "nowrap",
                                                    children: [
                                                        d("strong", {
                                                            children: [
                                                                _("Received multicast"),
                                                                ": "
                                                            ]
                                                        }),
                                                        R
                                                    ]
                                                }, d("span", l)),
                                                d("br", {}),
                                                (c = {
                                                    class: "nowrap",
                                                    children: [
                                                        d("strong", {
                                                            children: [
                                                                _("Receive errors"),
                                                                ": "
                                                            ]
                                                        }),
                                                        A
                                                    ]
                                                }, d("span", c)),
                                                d("br", {}),
                                                (p = {
                                                    class: "nowrap",
                                                    children: [
                                                        d("strong", {
                                                            children: [
                                                                _("Receive dropped"),
                                                                ": "
                                                            ]
                                                        }),
                                                        I
                                                    ]
                                                }, d("span", p)),
                                                d("br", {}),
                                                (u = {
                                                    class: "nowrap",
                                                    children: [
                                                        d("strong", {
                                                            children: [
                                                                _("Transmitted bytes"),
                                                                ": "
                                                            ]
                                                        }),
                                                        T
                                                    ]
                                                }, d("span", u)),
                                                d("br", {}),
                                                (f = {
                                                    class: "nowrap",
                                                    children: [
                                                        d("strong", {
                                                            children: [
                                                                _("Transmitted packets"),
                                                                ": "
                                                            ]
                                                        }),
                                                        D
                                                    ]
                                                }, d("span", f)),
                                                d("br", {}),
                                                (g = {
                                                    class: "nowrap",
                                                    children: [
                                                        d("strong", {
                                                            children: [
                                                                _("Transmit errors"),
                                                                ": "
                                                            ]
                                                        }),
                                                        U
                                                    ]
                                                }, d("span", g)),
                                                d("br", {}),
                                                (b = {
                                                    class: "nowrap",
                                                    children: [
                                                        d("strong", {
                                                            children: [
                                                                _("Transmit dropped"),
                                                                ": "
                                                            ]
                                                        }),
                                                        q
                                                    ]
                                                }, d("span", b))
                                            ]
                                        }, d("span", m))
                                    }, d("span", h))
                                ]
                            }, d("div", v))
                        }, d("div", y))
                    ]
                }, F = d("div", w)).addEventListener("mouseenter", ()=>{
                    let e = F.getAttribute("data-active-onu-id");
                    if (e) {
                        let t = document.querySelector(`[data-fttr-onu-id="${e}"]`);
                        t?.classList.add("fttr-row-highlight");
                    }
                }), F.addEventListener("mouseleave", ()=>{
                    document.querySelectorAll(".fttr-row-highlight").forEach((e)=>{
                        e.classList.remove("fttr-row-highlight");
                    });
                }), F.addEventListener("click", ()=>{
                    let e = F.getAttribute("data-active-onu-id");
                    if (e) {
                        let t = document.querySelector(`[data-fttr-onu-id="${e}"]`);
                        t && (t.scrollIntoView({
                            behavior: "smooth",
                            block: "nearest"
                        }), t.classList.add("fttr-row-highlight"), window.setTimeout(()=>t.classList.remove("fttr-row-highlight"), 1500));
                    }
                }), {
                    element: F,
                    update (e, t) {
                        var n;
                        let i = (e.switch_ports ?? []).find((e)=>e.port === r), a = i?.interface ?? `fttr${r}`, o = t[a], s = o?.stats, l = i?.carrier ?? o?.carrier ?? (o?.link?.speed !== void 0 || void 0), d = (e.sub_gateways ?? []).find((e)=>e.onu_id === i?.onu_id), c = !0 === l, p = s?.rx_bytes, u = s?.tx_bytes;
                        i?.onu_id !== void 0 ? F.setAttribute("data-active-onu-id", String(i.onu_id)) : F.removeAttribute("data-active-onu-id"), c ? (F.classList.add("port-up"), F.classList.remove("port-down")) : (F.classList.add("port-down"), F.classList.remove("port-up")), x.textContent = a, z.setAttribute("src", `/luci-static/resources/icons/${c ? "port_up.svg" : "port_down.svg"}`), k.textContent = c ? o?.link?.speed !== void 0 ? void 0 === (n = o.link.speed) || !Number.isFinite(n) || n <= 0 ? _("Unknown") : n >= 1000 ? `${n / 1000}\u{202F}GbE` : `${n}\u{202F}MbE` : _("Connected") : !1 === l ? _("Disconnected") : _("Unknown"), k.setAttribute("title", _("\u901F\u5EA6\uFF1A%s Mbit/s\uFF0C\u53CC\u5DE5\uFF1A%s").format(rX(o?.link?.speed), rX(o?.link?.duplex))), j.style.opacity = c ? "1" : "0.25", j.style.backgroundColor = c ? "rgb(46, 204, 113)" : "rgba(200, 200, 200, 0.4)", C.textContent = rX((i?.reserved_sn && void 0 === i.onu_id ? _("Reserved (offline)") : i?.link_state) ?? i?.status ?? (o ? l ? _("Link up") : _("Link down") : _("Unavailable"))), i?.reserved_sn && void 0 !== i.onu_id && (C.textContent += ` \xb7 ${_("Fixed interface")}`), S.textContent = rX(i?.onu_sn ?? d?.serial_number ?? i?.reserved_sn ?? i?.onu_id), F.title = i?.reserved_sn ? `${_("Reserved")}: ${i.reserved_sn}` : "", $.textContent = rX(o?.mac), O.textContent = c || u ? rY(u) : "\u2014", P.textContent = c || p ? rY(p) : "\u2014", M.textContent = rY(p), N.textContent = r0(s?.rx_packets), R.textContent = r0(s?.rx_multicast ?? s?.multicast), A.textContent = r0(s?.rx_errors), I.textContent = r0(s?.rx_dropped), T.textContent = rY(u), D.textContent = r0(s?.tx_packets), U.textContent = r0(s?.tx_errors), q.textContent = r0(s?.tx_dropped);
                    }
                };
            }), k = d("span", {
                class: "fttr-badge"
            }), z = d("span", {
                class: "fttr-badge fttr-badge-info"
            }), j = d("code", {
                style: "font-size:90%"
            }), C = d("span", {
                class: "fttr-badge fttr-badge-danger",
                style: "margin-left:.5em"
            }), o = {
                "data-provisioning-summary": "true",
                style: "display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%",
                children: [
                    (n = {
                        children: [
                            d("strong", {
                                style: "margin-right:.4em",
                                children: [
                                    _("Provisioning"),
                                    ":"
                                ]
                            }),
                            k
                        ]
                    }, d("span", n)),
                    (i = {
                        children: [
                            d("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Mode"),
                                    ":"
                                ]
                            }),
                            z
                        ]
                    }, d("span", i)),
                    (a = {
                        children: [
                            d("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    _("Revision"),
                                    ":"
                                ]
                            }),
                            j
                        ]
                    }, d("span", a)),
                    C
                ]
            }, S = d("div", o), $ = d("span", {
                class: "fttr-badge"
            }), O = d("span", {
                children: rX(v.model)
            }), P = d("span", {
                class: "fttr-badge"
            }), M = d("p", {
                role: "status"
            }), I = [
                [
                    "enabled",
                    _("FPGA master switch"),
                    _("Controls optical module reset and ONU discovery. Turning it off resets the module and disconnects all ONUs.")
                ],
                [
                    "downstream_tx_enabled",
                    _("GPON downstream optical emission"),
                    _("Controls GPON downstream 1490 nm optical emission. Turning it off removes the downstream optical signal and disconnects ONUs.")
                ],
                [
                    "fec_enabled",
                    _("GPON downstream FEC encoding"),
                    _("Controls GPON downstream FEC encoding. When downstream transmission is enabled, ONU-side OMCI FEC performance monitoring is also enabled.")
                ]
            ], T = null, D = null, U = !1, q = !1, F = !1, B = 0, Z = !0, V = new Map(), W = new Map(), J = d("p", {
                role: "status",
                "aria-live": "polite"
            }), G = (e)=>null == e ? _("Unknown") : e ? _("Enabled") : _("Disabled"), K = d("button", {
                class: "cbi-button cbi-button-apply",
                type: "button",
                disabled: !0,
                children: _("Save & Apply")
            }), H = ()=>{
                for (let [e] of I){
                    let t = V.get(e);
                    t.disabled = U || Z || !T || !L.hasViewPermission(), !F && T && (t.checked = T[e]);
                    let r = "enabled" === e ? D?.tx_enabled : "downstream_tx_enabled" === e ? D?.pon_mac?.tx_enabled : D?.pon_mac?.fec_enabled;
                    W.get(e).textContent = `${_("Saved")}: ${G(T?.[e])} \xb7 ${_("Hardware")}: ${G(r)}`;
                }
                K.disabled = U || Z || !T || !L.hasViewPermission() || !F && !D?.error && !D?.pon_mac?.error;
            }, X = (h = {
                class: "cbi-section",
                "data-fttr": "optical-control",
                children: [
                    (m = {
                        style: "display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:10px",
                        children: I.map((e)=>{
                            var t, r;
                            let [n, i, a] = e, o = d("input", {
                                type: "checkbox",
                                id: `fttr-optical-${n}`,
                                disabled: !0
                            });
                            V.set(n, o), o.onchange = ()=>{
                                F = !0, H();
                            };
                            let s = d("span", {
                                style: "margin-inline-start:1em"
                            });
                            return W.set(n, s), r = {
                                style: "padding:10px 12px;border:1px solid rgba(127,140,141,.25);border-radius:5px;min-width:0",
                                children: [
                                    (t = {
                                        style: "display:flex;align-items:center;justify-content:space-between;gap:8px",
                                        children: [
                                            d("label", {
                                                style: "font-weight:600",
                                                htmlFor: `fttr-optical-${n}`,
                                                children: i
                                            }),
                                            o
                                        ]
                                    }, d("div", t)),
                                    d("div", {
                                        style: "font-size:82%;margin-top:6px",
                                        class: "cbi-value-description",
                                        children: a
                                    }),
                                    d("div", {
                                        style: "font-size:82%;margin-top:5px",
                                        role: "status",
                                        children: s
                                    })
                                ]
                            }, d("div", r);
                        })
                    }, d("div", m)),
                    d("div", {
                        style: "display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:10px",
                        children: [
                            K,
                            J
                        ]
                    })
                ]
            }, d("div", h)), Q = (e)=>{
                Z = !1, D = e, T = e.settings ?? null;
                let t = e.pon_mac, r = T && e.tx_enabled === T.enabled && t && t.tx_enabled === (T.enabled && T.downstream_tx_enabled) && t.fec_enabled === (T.enabled && T.fec_enabled) && !e.cleanup_pending;
                J.textContent = e.error?.message || t?.error || (r ? "" : _("Saved; applying hardware configuration")), H();
            }, K.onclick = async ()=>{
                if (U || Z || !T || !L.hasViewPermission()) return;
                let e = {
                    enabled: V.get("enabled").checked,
                    downstream_tx_enabled: V.get("downstream_tx_enabled").checked,
                    fec_enabled: V.get("fec_enabled").checked
                };
                if ((e.enabled || !T.enabled) && (e.downstream_tx_enabled || !T.downstream_tx_enabled) || window.confirm(_("This disconnects all ONUs on this PON. Apply these settings?"))) {
                    U = !0, B++, H();
                    try {
                        let t = await ny(e);
                        "success" === t.status && (F = !1), Q(t);
                    } catch (e) {
                        J.textContent = String(e);
                    } finally{
                        U = !1, H();
                    }
                }
            }, N = {
                element: X,
                async refresh () {
                    if (U || q) return;
                    let e = B;
                    q = !0;
                    try {
                        let t = await nv();
                        U || e !== B || Q(t);
                    } catch (t) {
                        U || e !== B || (Z = !0, J.textContent = String(t), H());
                    } finally{
                        q = !1;
                    }
                }
            }, nL.add(async ()=>{
                N.element.isConnected && await N.refresh();
            }, 2), b = {
                class: "cbi-map fttr-overview",
                children: [
                    d("style", {
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

				${ns}

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
                    d("h2", {
                        children: _("FTTR overview")
                    }),
                    N.element,
                    S,
                    M,
                    (u = {
                        class: "cbi-section",
                        children: [
                            d("h3", {
                                children: _("Controller")
                            }),
                            (p = {
                                class: "table",
                                children: (c = {
                                    children: [
                                        (s = {
                                            children: [
                                                d("th", {
                                                    style: "width:15%",
                                                    children: _("FPGA status")
                                                }),
                                                d("td", {
                                                    style: "width:35%",
                                                    children: $
                                                }),
                                                d("th", {
                                                    style: "width:15%",
                                                    children: _("CDR lock")
                                                }),
                                                d("td", {
                                                    style: "width:35%",
                                                    children: P
                                                })
                                            ]
                                        }, d("tr", s)),
                                        (l = {
                                            children: [
                                                d("th", {
                                                    children: _("Optical module")
                                                }),
                                                d("td", {
                                                    colSpan: 3,
                                                    children: O
                                                })
                                            ]
                                        }, d("tr", l))
                                    ]
                                }, d("tbody", c))
                            }, d("table", p))
                        ]
                    }, d("div", u)),
                    (f = {
                        class: "cbi-section",
                        children: [
                            d("h3", {
                                children: _("Sub-gateways")
                            }),
                            w.element
                        ]
                    }, d("div", f)),
                    (g = {
                        class: "cbi-section",
                        children: [
                            d("h3", {
                                children: _("Downstream ports")
                            }),
                            d("div", {
                                class: "fttr-ports-grid",
                                children: x.map((e)=>e.element)
                            })
                        ]
                    }, d("div", g))
                ]
            }, R = d("div", b), (A = (e, t)=>{
                y = t;
                let r = e.optical_transceiver, n = e.provisioning, i = e.onu_pinning;
                for (let a of (M.textContent = i ? [
                    i.allocation_blocked ? _("ONU allocation blocked by invalid startup configuration.") : "",
                    i.pending_restart ? _("Fixed interface changes pending FTTR restart.") : "",
                    i.startup_error || i.config_error || ""
                ].filter(Boolean).join(" ") : "", M.hidden = !M.textContent, n ? (r2(k, n.enabled ? "success" : "neutral", n.enabled ? _("Enabled") : _("Disabled")), z.textContent = rX(n.mode), j.textContent = rX(n.revision), n.error ? (C.textContent = n.error, C.style.display = "") : C.style.display = "none", S.style.display = "") : S.textContent = _("Provisioning status unavailable"), "ready" === e.fpga_status ? r2($, "success", _("Ready")) : e.fpga_status ? r2($, "neutral", rX(e.fpga_status)) : r2($, "none", "\u2014"), O.textContent = rX(r.model), null == r.cdr_locked ? r2(P, "none", _("Unknown")) : r.cdr_locked ? r2(P, "success", _("Locked")) : r2(P, "warning", _("Unlocked")), w.update(e.sub_gateways ?? [], e.onu_pinning), x))a.update(e, t);
            })(t, r), nI = (nT = {
                element: R,
                update: A
            }).element, nL.add(async ()=>{
                if (nD || !nI?.isConnected || !nT) return;
                let e = nT;
                nD = !0;
                try {
                    let [t, r] = await Promise.all([
                        nb(),
                        nh().catch(()=>({}))
                    ]);
                    nT === e && e.element.isConnected && e.update(t, r);
                } catch (e) {
                    console.error("Failed to refresh FTTR status", e);
                } finally{
                    nD = !1;
                }
            }, 10), nI;
        },
        handleSaveApply: null,
        handleSave: null,
        handleReset: null
    });
})(), main = t.main;

return main;