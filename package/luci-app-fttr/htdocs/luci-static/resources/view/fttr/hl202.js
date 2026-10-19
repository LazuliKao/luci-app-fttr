'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';
var e;
let t, n, r, i, o;
const a = Symbol.for("jsx.fragment");
function s(e, t) {
    let { children: n, ...r } = null === t || "object" != typeof t || Array.isArray(t) ? {} : t, i = function e(t) {
        let n = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        for (let r of t)null != r && "boolean" != typeof r && (Array.isArray(r) ? e(r, n) : n.push(r instanceof Node ? r : String(r)));
        return n;
    }(null == n ? [] : Array.isArray(n) ? n : [
        n
    ]);
    if (e === a) {
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
    let o = {}, s = {
        ...r
    };
    for (let [e, t] of Object.entries(s))e.startsWith("on") && "function" == typeof t ? (o[e] = t, delete s[e]) : "boolean" == typeof t && (t ? s[e] = e : delete s[e]);
    let l = Object.keys(s).length > 0 ? i.length > 1 ? E(e, s, i) : E(e, s, i[0]) : i.length > 1 ? E(e, {}, i) : E(e, {}, i[0]);
    for (let [e, t] of Object.entries(o)){
        let n = e.slice(2).toLowerCase();
        l.addEventListener(n, t);
    }
    return l;
}
const l = {
    "HL202 sub-gateway management": "HL202 \u5B50\u7F51\u5173\u7BA1\u7406",
    "HL202 device": "HL202 \u8BBE\u5907",
    "Refresh devices": "\u5237\u65B0\u8BBE\u5907\u5217\u8868",
    "Select a device to inspect reports and run operations.": "\u9009\u62E9\u4E00\u4E2A\u5B50\u7F51\u5173\u8BBE\u5907\u4EE5\u67E5\u770B\u9065\u6D4B\u62A5\u544A\u548C\u6267\u884C\u8FD0\u7EF4\u6307\u4EE4\u3002",
    "No HL202 optical devices were found.": "\u672A\u53D1\u73B0 HL202 \u5149\u8BBE\u5907\u3002",
    "Loading devices\u2026": "\u6B63\u5728\u52A0\u8F7D\u8BBE\u5907\u5217\u8868\u2026",
    "Invalid device list": "\u8BBE\u5907\u5217\u8868\u683C\u5F0F\u65E0\u6548",
    "Invalid device identity": "\u8BBE\u5907\u6807\u8BC6\u4FE1\u606F\u65E0\u6548",
    "MQTT ready": "MQTT \u5C31\u7EEA",
    "MQTT unavailable": "MQTT \u4E0D\u53EF\u7528",
    "Optical online": "\u5149\u7EA4\u5728\u7EBF",
    "Optical offline": "\u5149\u7EA4\u79BB\u7EBF",
    "Invalid binding generation": "\u7ED1\u5B9A\u4EE3\u6570\u65E0\u6548",
    "MQTT source identity": "MQTT \u6570\u636E\u6E90\u8EAB\u4EFD\u8BCA\u65AD",
    "Read-only MQTT source": "\u53EA\u8BFB MQTT \u6E90",
    "Inspect source report (read-only)": "\u67E5\u770B\u6E90\u62A5\u544A\uFF08\u53EA\u8BFB\uFF09",
    "Invalid source observation": "\u6E90\u89C2\u6D4B\u6570\u636E\u65E0\u6548",
    "Open optical status and ONU/MIB details": "\u6253\u5F00\u5149\u6A21\u5757\u72B6\u6001\u4E0E ONU/MIB \u8BE6\u60C5",
    "This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.": "\u8BE5\u5149\u8BBE\u5907\u6CA1\u6709\u6700\u65B0\u4E14\u786E\u5B9A\u7684 MQTT \u7ED1\u5B9A\uFF0C\u8FD0\u7EF4\u6307\u4EE4\u6682\u4E0D\u53EF\u7528\u3002",
    "MQTT report": "MQTT \u9065\u6D4B\u62A5\u544A",
    "Read MQTT report": "\u8BFB\u53D6 MQTT \u62A5\u544A",
    "No MQTT report has been parsed yet.": "\u5C1A\u672A\u89E3\u6790\u5230\u4EFB\u4F55 MQTT \u62A5\u544A\u6570\u636E\u3002",
    Revision: "\u4FEE\u8BA2\u7248\u672C",
    "Last received": "\u6700\u540E\u63A5\u6536\u65F6\u95F4",
    "Last good report": "\u6700\u540E\u6B63\u5E38\u62A5\u544A\u65F6\u95F4",
    "Latest report error": "\u6700\u65B0\u62A5\u544A\u9519\u8BEF",
    Field: "\u6307\u6807\u5B57\u6BB5",
    Value: "\u6570\u503C",
    "Source member": "\u6765\u6E90\u7EC4\u4EF6",
    "Text omitted at the shared byte limit.": "\u6587\u672C\u8D85\u8FC7\u5171\u4EAB\u5B57\u8282\u4E0A\u9650\u5DF2\u7701\u7565\u3002",
    "Binary member; text is unavailable.": "\u4E8C\u8FDB\u5236\u6570\u636E\uFF0C\u65E0\u6CD5\u663E\u793A\u7EAF\u6587\u672C\u3002",
    "User management": "\u7528\u6237\u7BA1\u7406",
    "Read users": "\u8BFB\u53D6\u7528\u6237\u5217\u8868",
    "Password writes are accepted and saved by the device; this does not prove web login permission. Existing permission masks are preserved.": "\u5BC6\u7801\u5199\u5165\u7531\u8BBE\u5907\u63A5\u53D7\u5E76\u4FDD\u5B58\uFF1B\u8FD9\u5E76\u4E0D\u8BC1\u660E\u5177\u5907 Web \u767B\u5F55\u6743\u9650\uFF0C\u73B0\u6709\u6743\u9650\u63A9\u7801\u4E88\u4EE5\u4FDD\u7559\u3002",
    "Invalid account metadata": "\u7528\u6237\u5143\u6570\u636E\u65E0\u6548",
    "New password": "\u65B0\u5BC6\u7801",
    "Set password": "\u4FEE\u6539\u5BC6\u7801",
    Disable: "\u7981\u7528",
    Enable: "\u542F\u7528",
    Enabled: "\u5DF2\u542F\u7528",
    Disabled: "\u5DF2\u7981\u7528",
    "Refresh users to read the current state.": "\u8BF7\u5237\u65B0\u7528\u6237\u5217\u8868\u4EE5\u8BFB\u53D6\u6700\u65B0\u72B6\u6001\u3002",
    "Raw command console": "\u539F\u751F\u547D\u4EE4\u63A7\u5236\u53F0",
    "Shell executes on the selected ONU. Timeout does not cancel execution. Raw output can contain secrets.": "Shell \u811A\u672C\u76F4\u63A5\u5728\u6240\u9009 ONU \u4E0A\u6267\u884C\u3002\u8D85\u65F6\u4E0D\u4F1A\u53D6\u6D88\u6267\u884C\u3002\u539F\u59CB\u8F93\u51FA\u53EF\u80FD\u5305\u542B\u654F\u611F\u4FE1\u606F\u3002",
    Target: "\u76EE\u6807\u8BBE\u5907",
    "Remote shell command": "\u8FDC\u7A0B Shell \u811A\u672C",
    "Timeout in seconds": "\u8D85\u65F6\u65F6\u95F4\uFF08\u79D2\uFF09",
    "Execute on selected HL202": "\u5728\u6240\u9009 HL202 \u4E0A\u6267\u884C",
    "Timeout must be 1\u2013300 seconds.": "\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u5728 1\u2013300 \u79D2\u4E4B\u95F4\u3002",
    "Enter a non-empty UTF-8 script up to 64 KiB without NUL characters.": "\u8BF7\u8F93\u5165 64 KiB \u4EE5\u5185\u3001\u4E0D\u542B NUL \u7A7A\u5B57\u7B26\u7684\u975E\u7A7A UTF-8 \u811A\u672C\u3002",
    "Waiting for device result\u2026": "\u6B63\u5728\u7B49\u5F85\u8BBE\u5907\u8FD4\u56DE\u7ED3\u679C\u2026",
    "Another operation is in progress.": "\u53E6\u4E00\u4E2A\u64CD\u4F5C\u6B63\u5728\u8FDB\u884C\u4E2D\uFF0C\u8BF7\u7A0D\u5019\u3002",
    "Request failed": "\u8BF7\u6C42\u5931\u8D25",
    Unknown: "\u672A\u77E5",
    State: "\u72B6\u6001",
    "Exit code": "\u9000\u51FA\u7801",
    "Request ID": "\u8BF7\u6C42 ID",
    "Device binding changed after submission. This result belongs to the original target.": "\u63D0\u4EA4\u540E\u8BBE\u5907\u7ED1\u5B9A\u5DF2\u53D1\u751F\u53D8\u5316\uFF0C\u6B64\u7ED3\u679C\u5C5E\u4E8E\u539F\u76EE\u6807\u8BBE\u5907\u3002",
    "Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.": "\u6267\u884C\u7ED3\u679C\u672A\u77E5\u3002\u8D85\u65F6\u4E0D\u4F1A\u4E2D\u65AD\u8FDC\u7AEF\u547D\u4EE4\uFF1B\u8BF7\u52FF\u81EA\u52A8\u91CD\u8BD5\u3002",
    "Output was truncated at the byte limit.": "\u8F93\u51FA\u5185\u5BB9\u5DF2\u8FBE\u5230\u5B57\u8282\u4E0A\u9650\u5E76\u88AB\u622A\u65AD\u3002",
    "Copy output": "\u590D\u5236\u8F93\u51FA",
    "Clear output": "\u6E05\u7A7A\u8F93\u51FA",
    "Copied to clipboard": "\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F",
    "Quick diagnostic commands": "\u5FEB\u6377\u8BCA\u65AD\u547D\u4EE4",
    Execution: "\u6267\u884C\u7ED3\u679C",
    Duration: "\u6267\u884C\u8017\u65F6",
    "Copy member text": "\u590D\u5236\u6587\u672C",
    "Password updated successfully": "\u5BC6\u7801\u4FEE\u6539\u6210\u529F",
    "Inspect read-only MQTT source reports and diagnostics for unbound or unselected devices.": "\u67E5\u770B\u672A\u7ED1\u5B9A\u6216\u672A\u9009\u5B9A\u8BBE\u5907\u7684\u53EA\u8BFB MQTT \u9065\u6D4B\u62A5\u544A\u4E0E\u6570\u636E\u6E90\u8BCA\u65AD\u3002",
    "Raw source observations (JSON)": "\u539F\u59CB\u6E90\u89C2\u6D4B\u6570\u636E (JSON)"
};
function d(e) {
    let t = _(e);
    return /zh/i.test(document.documentElement.getAttribute("lang") || window.L?.env?.lang || navigator.language || "") && l[e] ? l[e] : t || e;
}
const c = (e)=>null == e || "" === e ? "\u2014" : String(e), u = (e)=>e ? new Date(1000 * e).toLocaleString() : "\u2014";
function p(e, t, n) {
    return s("span", {
        class: `hl202-badge hl202-badge-${e}`,
        title: n,
        children: t
    });
}
function h(e, t, n) {
    function r(n, r) {
        if (n._zod || Object.defineProperty(n, "_zod", {
            value: {
                def: r,
                constr: a,
                traits: new Set()
            },
            enumerable: !1
        }), n._zod.traits.has(e)) return;
        n._zod.traits.add(e), t(n, r);
        let i = a.prototype, o = Object.keys(i);
        for(let e = 0; e < o.length; e++){
            let t = o[e];
            t in n || (n[t] = i[t].bind(n));
        }
    }
    let i = n?.Parent ?? Object;
    class o extends i {
    }
    function a(e) {
        var t;
        let i = n?.Parent ? new o() : this;
        for (let n of (r(i, e), (t = i._zod).deferred ?? (t.deferred = []), i._zod.deferred))n();
        return i;
    }
    return Object.defineProperty(o, "name", {
        value: e
    }), Object.defineProperty(a, "init", {
        value: r
    }), Object.defineProperty(a, Symbol.hasInstance, {
        value: (t)=>!!n?.Parent && t instanceof n.Parent || t?._zod?.traits?.has(e)
    }), Object.defineProperty(a, "name", {
        value: e
    }), a;
}
Object.freeze({
    status: "aborted"
}), Symbol("zod_brand");
class m extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const g = {};
function f(e) {
    return e && Object.assign(g, e), g;
}
function b(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function y(e) {
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
function v(e) {
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const w = Symbol("evaluating");
function x(e, t, n) {
    let r;
    Object.defineProperty(e, t, {
        get () {
            if (r !== w) return void 0 === r && (r = w, r = n()), r;
        },
        set (n) {
            Object.defineProperty(e, t, {
                value: n
            });
        },
        configurable: !0
    });
}
const z = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function T(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
const C = new Set([
    "string",
    "number",
    "symbol"
]);
function k(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
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
function O(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let n = t; n < e.issues.length; n++)if (e.issues[n]?.continue !== !0) return !0;
    return !1;
}
function S(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function N(e) {
    return "string" == typeof e ? e : e?.message;
}
function j(e, t, n) {
    let r = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (r.message = N(e.inst?._zod.def?.error?.(e)) ?? N(t?.error?.(e)) ?? N(n.customError?.(e)) ?? N(n.localeError?.(e)) ?? "Invalid input"), delete r.inst, delete r.continue, t?.reportInput || delete r.input, r;
}
const M = (e, t)=>{
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
}, P = h("$ZodError", M), R = h("$ZodError", M, {
    Parent: Error
}), Z = (t = R, (e, n, r, i)=>{
    let o = r ? Object.assign(r, {
        async: !1
    }) : {
        async: !1
    }, a = e._zod.run({
        value: n,
        issues: []
    }, o);
    if (a instanceof Promise) throw new m();
    if (a.issues.length) {
        let e = new (i?.Err ?? t)(a.issues.map((e)=>j(e, o, f())));
        throw z(e, i?.callee), e;
    }
    return a.value;
}), Q = (n = R, async (e, t, r, i)=>{
    let o = r ? Object.assign(r, {
        async: !0
    }) : {
        async: !0
    }, a = e._zod.run({
        value: t,
        issues: []
    }, o);
    if (a instanceof Promise && (a = await a), a.issues.length) {
        let e = new (i?.Err ?? n)(a.issues.map((e)=>j(e, o, f())));
        throw z(e, i?.callee), e;
    }
    return a.value;
}), A = (r = R, (e, t, n)=>{
    let i = n ? {
        ...n,
        async: !1
    } : {
        async: !1
    }, o = e._zod.run({
        value: t,
        issues: []
    }, i);
    if (o instanceof Promise) throw new m();
    return o.issues.length ? {
        success: !1,
        error: new (r ?? P)(o.issues.map((e)=>j(e, i, f())))
    } : {
        success: !0,
        data: o.value
    };
}), D = (i = R, async (e, t, n)=>{
    let r = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, r);
    return o instanceof Promise && (o = await o), o.issues.length ? {
        success: !1,
        error: new i(o.issues.map((e)=>j(e, r, f())))
    } : {
        success: !0,
        data: o.value
    };
}), J = /^-?\d+(?:\.\d+)?$/, I = /^(?:true|false)$/i, U = /^null$/i, q = {
    major: 4,
    minor: 3,
    patch: 6
}, V = h("$ZodType", (e, t)=>{
    var n;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = q;
    let r = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && r.unshift(e), r))for (let n of t._zod.onattach)n(e);
    if (0 === r.length) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, n)=>{
            let r, i = O(e);
            for (let o of t){
                if (o._zod.def.when) {
                    if (!o._zod.def.when(e)) continue;
                } else if (i) continue;
                let t = e.issues.length, a = o._zod.check(e);
                if (a instanceof Promise && n?.async === !1) throw new m();
                if (r || a instanceof Promise) r = (r ?? Promise.resolve()).then(async ()=>{
                    await a, e.issues.length !== t && (i || (i = O(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    i || (i = O(e, t));
                }
            }
            return r ? r.then(()=>e) : e;
        }, n = (n, i, o)=>{
            if (O(n)) return n.aborted = !0, n;
            let a = t(i, r, o);
            if (a instanceof Promise) {
                if (!1 === o.async) throw new m();
                return a.then((t)=>e._zod.parse(t, o));
            }
            return e._zod.parse(a, o);
        };
        e._zod.run = (i, o)=>{
            if (o.skipChecks) return e._zod.parse(i, o);
            if ("backward" === o.direction) {
                let t = e._zod.parse({
                    value: i.value,
                    issues: []
                }, {
                    ...o,
                    skipChecks: !0
                });
                return t instanceof Promise ? t.then((e)=>n(e, i, o)) : n(t, i, o);
            }
            let a = e._zod.parse(i, o);
            if (a instanceof Promise) {
                if (!1 === o.async) throw new m();
                return a.then((e)=>t(e, r, o));
            }
            return t(a, r, o);
        };
    }
    x(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = A(e, t);
                    return n.success ? {
                        value: n.data
                    } : {
                        issues: n.error?.issues
                    };
                } catch (n) {
                    return D(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), F = h("$ZodString", (e, t)=>{
    var n;
    let r;
    V.init(e, t), e._zod.pattern = [
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
}), H = h("$ZodNumber", (e, t)=>{
    V.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? J, e._zod.parse = (n, r)=>{
        if (t.coerce) try {
            n.value = Number(n.value);
        } catch (e) {}
        let i = n.value;
        if ("number" == typeof i && !Number.isNaN(i) && Number.isFinite(i)) return n;
        let o = "number" == typeof i ? Number.isNaN(i) ? "NaN" : Number.isFinite(i) ? void 0 : "Infinity" : void 0;
        return n.issues.push({
            expected: "number",
            code: "invalid_type",
            input: i,
            inst: e,
            ...o ? {
                received: o
            } : {}
        }), n;
    };
}), W = h("$ZodBoolean", (e, t)=>{
    V.init(e, t), e._zod.pattern = I, e._zod.parse = (n, r)=>{
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
}), B = h("$ZodNull", (e, t)=>{
    V.init(e, t), e._zod.pattern = U, e._zod.values = new Set([
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
}), K = h("$ZodNever", (e, t)=>{
    V.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function X(e, t, n) {
    e.issues.length && t.issues.push(...S(n, e.issues)), t.value[n] = e.value;
}
const G = h("$ZodArray", (e, t)=>{
    V.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!Array.isArray(i)) return n.issues.push({
            expected: "array",
            code: "invalid_type",
            input: i,
            inst: e
        }), n;
        n.value = Array(i.length);
        let o = [];
        for(let e = 0; e < i.length; e++){
            let a = i[e], s = t.element._zod.run({
                value: a,
                issues: []
            }, r);
            s instanceof Promise ? o.push(s.then((t)=>X(t, n, e))) : X(s, n, e);
        }
        return o.length ? Promise.all(o).then(()=>n) : n;
    };
});
function Y(e, t, n, r, i) {
    if (e.issues.length) {
        if (i && !(n in r)) return;
        t.issues.push(...S(n, e.issues));
    }
    void 0 === e.value ? n in r && (t.value[n] = void 0) : t.value[n] = e.value;
}
const ee = h("$ZodObject", (e, t)=>{
    let n;
    V.init(e, t);
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
    let i = y(()=>(function(e) {
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
        })(t));
    x(e._zod, "propValues", ()=>{
        let e = t.shape, n = {};
        for(let t in e){
            let r = e[t]._zod;
            if (r.values) for (let e of (n[t] ?? (n[t] = new Set()), r.values))n[t].add(e);
        }
        return n;
    });
    let o = t.catchall;
    e._zod.parse = (t, r)=>{
        n ?? (n = i.value);
        let a = t.value;
        if (!T(a)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: a,
            inst: e
        }), t;
        t.value = {};
        let s = [], l = n.shape;
        for (let e of n.keys){
            let n = l[e], i = "optional" === n._zod.optout, o = n._zod.run({
                value: a[e],
                issues: []
            }, r);
            o instanceof Promise ? s.push(o.then((n)=>Y(n, t, e, a, i))) : Y(o, t, e, a, i);
        }
        return o ? function(e, t, n, r, i, o) {
            let a = [], s = i.keySet, l = i.catchall._zod, d = l.def.type, c = "optional" === l.optout;
            for(let i in t){
                if (s.has(i)) continue;
                if ("never" === d) {
                    a.push(i);
                    continue;
                }
                let o = l.run({
                    value: t[i],
                    issues: []
                }, r);
                o instanceof Promise ? e.push(o.then((e)=>Y(e, n, i, t, c))) : Y(o, n, i, t, c);
            }
            return (a.length && n.issues.push({
                code: "unrecognized_keys",
                keys: a,
                input: t,
                inst: o
            }), e.length) ? Promise.all(e).then(()=>n) : n;
        }(s, a, t, r, i.value, e) : s.length ? Promise.all(s).then(()=>t) : t;
    };
});
function et(e, t, n, r) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let i = e.filter((e)=>!O(e));
    return 1 === i.length ? (t.value = i[0].value, i[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>j(e, r, f())))
    }), t);
}
const en = h("$ZodUnion", (e, t)=>{
    V.init(e, t), x(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), x(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), x(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), x(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>v(e.source)).join("|")})$`);
        }
    });
    let n = 1 === t.options.length, r = t.options[0]._zod.run;
    e._zod.parse = (i, o)=>{
        if (n) return r(i, o);
        let a = !1, s = [];
        for (let e of t.options){
            let t = e._zod.run({
                value: i.value,
                issues: []
            }, o);
            if (t instanceof Promise) s.push(t), a = !0;
            else {
                if (0 === t.issues.length) return t;
                s.push(t);
            }
        }
        return a ? Promise.all(s).then((t)=>et(t, i, e, o)) : et(s, i, e, o);
    };
}), er = h("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, en.init(e, t);
    let n = e._zod.parse;
    x(e._zod, "propValues", ()=>{
        let e = {};
        for (let n of t.options){
            let r = n._zod.propValues;
            if (!r || 0 === Object.keys(r).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
            for (let [t, n] of Object.entries(r))for (let r of (e[t] || (e[t] = new Set()), n))e[t].add(r);
        }
        return e;
    });
    let r = y(()=>{
        let e = t.options, n = new Map();
        for (let r of e){
            let e = r._zod.propValues?.[t.discriminator];
            if (!e || 0 === e.size) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(r)}"`);
            for (let t of e){
                if (n.has(t)) throw Error(`Duplicate discriminator value "${String(t)}"`);
                n.set(t, r);
            }
        }
        return n;
    });
    e._zod.parse = (i, o)=>{
        let a = i.value;
        if (!T(a)) return i.issues.push({
            code: "invalid_type",
            expected: "object",
            input: a,
            inst: e
        }), i;
        let s = r.value.get(a?.[t.discriminator]);
        return s ? s._zod.run(i, o) : t.unionFallback ? n(i, o) : (i.issues.push({
            code: "invalid_union",
            errors: [],
            note: "No matching discriminator",
            discriminator: t.discriminator,
            input: a,
            path: [
                t.discriminator
            ],
            inst: e
        }), i);
    };
}), ei = h("$ZodRecord", (e, t)=>{
    V.init(e, t), e._zod.parse = (n, r)=>{
        let i = n.value;
        if (!function(e) {
            if (!1 === T(e)) return !1;
            let t = e.constructor;
            if (void 0 === t || "function" != typeof t) return !0;
            let n = t.prototype;
            return !1 !== T(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
        }(i)) return n.issues.push({
            expected: "record",
            code: "invalid_type",
            input: i,
            inst: e
        }), n;
        let o = [], a = t.keyType._zod.values;
        if (a) {
            let s;
            n.value = {};
            let l = new Set();
            for (let e of a)if ("string" == typeof e || "number" == typeof e || "symbol" == typeof e) {
                l.add("number" == typeof e ? e.toString() : e);
                let a = t.valueType._zod.run({
                    value: i[e],
                    issues: []
                }, r);
                a instanceof Promise ? o.push(a.then((t)=>{
                    t.issues.length && n.issues.push(...S(e, t.issues)), n.value[e] = t.value;
                })) : (a.issues.length && n.issues.push(...S(e, a.issues)), n.value[e] = a.value);
            }
            for(let e in i)l.has(e) || (s = s ?? []).push(e);
            s && s.length > 0 && n.issues.push({
                code: "unrecognized_keys",
                input: i,
                inst: e,
                keys: s
            });
        } else for (let a of (n.value = {}, Reflect.ownKeys(i))){
            if ("__proto__" === a) continue;
            let s = t.keyType._zod.run({
                value: a,
                issues: []
            }, r);
            if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof a && J.test(a) && s.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(a),
                    issues: []
                }, r);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (s = e);
            }
            if (s.issues.length) {
                "loose" === t.mode ? n.value[a] = i[a] : n.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: s.issues.map((e)=>j(e, r, f())),
                    input: a,
                    path: [
                        a
                    ],
                    inst: e
                });
                continue;
            }
            let l = t.valueType._zod.run({
                value: i[a],
                issues: []
            }, r);
            l instanceof Promise ? o.push(l.then((e)=>{
                e.issues.length && n.issues.push(...S(a, e.issues)), n.value[s.value] = e.value;
            })) : (l.issues.length && n.issues.push(...S(a, l.issues)), n.value[s.value] = l.value);
        }
        return o.length ? Promise.all(o).then(()=>n) : n;
    };
}), eo = h("$ZodEnum", (e, t)=>{
    var n;
    let r;
    V.init(e, t);
    let i = (r = Object.values(n = t.entries).filter((e)=>"number" == typeof e), Object.entries(n).filter(([e, t])=>-1 === r.indexOf(+e)).map(([e, t])=>t)), o = new Set(i);
    e._zod.values = o, e._zod.pattern = RegExp(`^(${i.filter((e)=>C.has(typeof e)).map((e)=>"string" == typeof e ? k(e) : e.toString()).join("|")})$`), e._zod.parse = (t, n)=>{
        let r = t.value;
        return o.has(r) || t.issues.push({
            code: "invalid_value",
            values: i,
            input: r,
            inst: e
        }), t;
    };
}), ea = h("$ZodLiteral", (e, t)=>{
    if (V.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? k(e) : e ? k(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (r, i)=>{
        let o = r.value;
        return n.has(o) || r.issues.push({
            code: "invalid_value",
            values: t.values,
            input: o,
            inst: e
        }), r;
    };
});
function es(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const el = h("$ZodOptional", (e, t)=>{
    V.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", x(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), x(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${v(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let r = t.innerType._zod.run(e, n);
            return r instanceof Promise ? r.then((t)=>es(t, e.value)) : es(r, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, n);
    };
}), ed = h("$ZodNullable", (e, t)=>{
    V.init(e, t), x(e._zod, "optin", ()=>t.innerType._zod.optin), x(e._zod, "optout", ()=>t.innerType._zod.optout), x(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${v(e.source)}|null)$`) : void 0;
    }), x(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), ec = h("$ZodLazy", (e, t)=>{
    V.init(e, t), x(e._zod, "innerType", ()=>t.getter()), x(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), x(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), x(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), x(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n)=>e._zod.innerType._zod.run(t, n);
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
const eu = h("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    V.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>Z(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>A(e, t, n), e.parseAsync = async (t, n)=>Q(e, t, n, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, n)=>D(e, t, n), e.check = (...n)=>e.clone({
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
}), ep = h("ZodMiniString", (e, t)=>{
    F.init(e, t), eu.init(e, t);
});
function eh(e) {
    return new ep({
        type: "string",
        ...$(e)
    });
}
const em = h("ZodMiniNumber", (e, t)=>{
    H.init(e, t), eu.init(e, t);
});
function eg(e) {
    return new em({
        type: "number",
        checks: [],
        ...$(e)
    });
}
const ef = h("ZodMiniBoolean", (e, t)=>{
    W.init(e, t), eu.init(e, t);
});
function eb(e) {
    return new ef({
        type: "boolean",
        ...$(e)
    });
}
const ey = h("ZodMiniNull", (e, t)=>{
    B.init(e, t), eu.init(e, t);
}), ev = h("ZodMiniNever", (e, t)=>{
    K.init(e, t), eu.init(e, t);
});
function e_(e) {
    return new ev({
        type: "never",
        ...$(e)
    });
}
const ew = h("ZodMiniArray", (e, t)=>{
    G.init(e, t), eu.init(e, t);
});
function ex(e, t) {
    return new ew({
        type: "array",
        element: e,
        ...$(t)
    });
}
const ez = h("ZodMiniObject", (e, t)=>{
    ee.init(e, t), eu.init(e, t), x(e, "shape", ()=>t.shape);
});
function eT(e, t) {
    return new ez({
        type: "object",
        shape: e ?? {},
        ...$(t)
    });
}
const eC = h("ZodMiniUnion", (e, t)=>{
    en.init(e, t), eu.init(e, t);
});
function ek(e, t) {
    return new eC({
        type: "union",
        options: e,
        ...$(t)
    });
}
const e$ = h("ZodMiniDiscriminatedUnion", (e, t)=>{
    er.init(e, t), eu.init(e, t);
});
function eO(e, t, n) {
    return new e$({
        type: "union",
        options: t,
        discriminator: e,
        ...$(n)
    });
}
const eS = h("ZodMiniRecord", (e, t)=>{
    ei.init(e, t), eu.init(e, t);
});
function eE(e, t, n) {
    return new eS({
        type: "record",
        keyType: e,
        valueType: t,
        ...$(n)
    });
}
const eN = h("ZodMiniEnum", (e, t)=>{
    eo.init(e, t), eu.init(e, t), e.options = Object.values(t.entries);
});
function ej(e, t) {
    return new eN({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...$(t)
    });
}
const eM = h("ZodMiniLiteral", (e, t)=>{
    ea.init(e, t), eu.init(e, t);
});
function eP(e, t) {
    return new eM({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...$(t)
    });
}
const eL = h("ZodMiniOptional", (e, t)=>{
    el.init(e, t), eu.init(e, t);
});
function eR(e) {
    return new eL({
        type: "optional",
        innerType: e
    });
}
const eZ = h("ZodMiniNullable", (e, t)=>{
    ed.init(e, t), eu.init(e, t);
});
function eQ(e) {
    return new eZ({
        type: "nullable",
        innerType: e
    });
}
const eA = h("ZodMiniLazy", (e, t)=>{
    ec.init(e, t), eu.init(e, t);
});
let eD = eT({
    error: ek([
        eh(),
        eT({
            code: eh(),
            message: eh()
        })
    ])
});
class eJ extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function eI(e) {
    let t = eD.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new eJ("rpc", e) : new eJ(e.code, e.message);
    }
    return e;
}
const eU = eT({
    status: eP("pending"),
    job: eh()
}), eq = eO("status", [
    eT({
        status: eP("pending")
    }),
    eT({
        status: eP("ready"),
        chunk: eg(),
        chunks: eg(),
        bytes: eg(),
        data: eh()
    })
]);
let eV = eh(), eF = eg(), eH = eb();
eT({
    optical_sn: eV,
    onu_id: eF,
    binding_generation: eV
}), eT({
    mqtt_mac: eV,
    binding_generation: eV
});
let eW = eT({
    mqtt_mac: eV,
    optical_sn: eQ(eV),
    onu_id: eQ(eF),
    binding_generation: eV,
    last_seen: eF,
    reason: eV
}), eB = {
    target: eV,
    request_id: eR(eV),
    output: eR(eV),
    output_truncated: eH,
    error: eR(eV)
};
const eK = eO("status", [
    eT({
        ...eB,
        status: eP("executed"),
        exit_code: eQ(eF)
    }),
    eT({
        ...eB,
        status: eP("dispatched"),
        exit_code: eR(e_())
    }),
    eT({
        ...eB,
        status: eP("timeout"),
        exit_code: eR(e_())
    }),
    eT({
        ...eB,
        status: eP("error"),
        exit_code: eR(e_())
    })
]);
let eX = eT({
    target: eW,
    result: eK,
    binding_current: eH
}), eG = eT({
    schema_version: eF,
    compressed_bytes: eF,
    decompressed_bytes: eF,
    fields: eE(eV, eT({
        value: o = new eA({
            type: "lazy",
            getter: ()=>ek([
                    eh(),
                    eg(),
                    eb(),
                    new ey({
                        type: "null",
                        ...$(void 0)
                    }),
                    ex(o),
                    eE(eh(), o)
                ])
        }),
        member: eV,
        unit: eQ(eV)
    })),
    members: ex(eT({
        name: eV,
        bytes: eF,
        encoding: eV,
        text: eQ(eV),
        text_omitted: eH
    })),
    errors: ex(eV)
}), eY = eT({
    revision: eF,
    last_received: eF,
    last_processed_receipt: eQ(eF),
    last_good: eQ(eF),
    error: eQ(eV),
    report: eQ(eG)
}), e0 = {
    schema_version: eP(1),
    target: eW,
    report: eQ(eY)
};
const e2 = ek([
    eT({
        ...e0,
        state: ej([
            "received",
            "report_unavailable"
        ])
    }),
    eT({
        ...e0,
        read_only: eP(!0)
    })
]), e1 = eT({
    schema_version: eP(1),
    devices: ex(eT({
        optical_sn: eV,
        onu_id: eF,
        model: eV,
        optical_online: eH,
        can_execute: eH,
        mqtt: eQ(eW),
        report_revision: eQ(eF)
    })),
    sources: ex(eW)
}), e8 = eT({
    schema_version: eP(1),
    operation: eX,
    accounts: eQ(ex(eT({
        entry: ek([
            eP(0),
            eP(1),
            eP(2)
        ]),
        username: eV,
        active: eH
    }))),
    write_status: ej([
        "not_applicable",
        "accepted_and_saved",
        "unconfirmed"
    ])
}), e4 = eT({
    schema_version: eP(1),
    operation: eX
});
let e3 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_list",
    reject: !0
}), e5 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_job_result",
    params: [
        "job",
        "chunk"
    ],
    reject: !0
}), e6 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_report",
    params: [
        "target"
    ],
    reject: !0
}), e7 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_accounts_start",
    params: [
        "target"
    ],
    reject: !0
}), e9 = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_account_update",
    params: [
        "target",
        "kind",
        "entry",
        "password",
        "active"
    ],
    reject: !0
}), te = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_exec_start",
    params: [
        "target",
        "script",
        "timeout_seconds"
    ],
    reject: !0
});
async function tt(e) {
    let t = eU.parse(eI(e)), n = Date.now() + 330000, r = window.location.pathname, i = [], o = 0, a = null;
    for(let e = 0; e < 128;){
        if (window.location.pathname !== r) throw new eJ("navigation", _("Result polling stopped after leaving the page. The backend job is not cancelled."));
        if (Date.now() > n) throw new eJ("timeout", _("Job polling timed out; execution outcome is unknown. Do not automatically retry."));
        let s = eq.parse(eI(await e5(t.job, e)));
        switch(s.status){
            case "pending":
                await new Promise((e)=>window.setTimeout(e, 1000));
                continue;
            case "ready":
                {
                    if (!Number.isInteger(s.chunks) || s.chunks < 1 || s.chunks > 128 || s.chunk !== e || !Number.isInteger(s.bytes) || s.bytes < 1 || s.bytes > 4194304 || s.data.length > 43692) throw new eJ("transport", _("Invalid job result"));
                    if (a && (s.chunks !== a.chunks || s.bytes !== a.bytes)) throw new eJ("transport", _("Inconsistent job result chunks"));
                    a = {
                        chunks: s.chunks,
                        bytes: s.bytes
                    };
                    let t = Uint8Array.from(atob(s.data), (e)=>e.charCodeAt(0));
                    if (t.length > 32768 || o + t.length > s.bytes) throw new eJ("transport", _("Job result exceeds the transport limit"));
                    if (i.push(t), o += t.length, ++e === s.chunks) {
                        if (o !== s.bytes) throw new eJ("transport", _("Incomplete job result"));
                        let e = new Uint8Array(o), t = 0;
                        for (let n of i)e.set(n, t), t += n.length;
                        return eI(JSON.parse(new TextDecoder("utf-8", {
                            fatal: !0
                        }).decode(e)));
                    }
                }
        }
    }
    throw new eJ("transport", _("Too many result chunks"));
}
const tn = async ()=>e1.parse(eI(await e3())), tr = async (e)=>e2.parse(await tt(await e6(e))), ti = async (e)=>e8.parse(await tt(await e7(e))), to = async (e, t)=>e8.parse(await tt(await e9(e, `account_set_${t.kind}`, t.entry, t.password, t.active))), ta = async (e, t, n)=>e4.parse(await tt(await te(e, t, n)));
let ts = !1;
function tl() {
    var e, t;
    let n = null, r = s("div", {
        style: "margin:8px 0;display:flex;align-items:center;flex-wrap:wrap;gap:10px"
    }), i = s("div", {
        style: "overflow-x:auto;margin:8px 0"
    }), o = s("div", {
        style: "margin-top:10px"
    }), a = s("div", {
        style: "font-size:88%;color:#888;margin:6px 0",
        "aria-live": "polite"
    }), l = s("button", {
        type: "button",
        class: "cbi-button cbi-button-action",
        children: d("Read MQTT report")
    }), h = async (e)=>{
        let t = e || n;
        if (!t) {
            a.textContent = d("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
            return;
        }
        if (ts) {
            a.textContent = d("Another operation is in progress.");
            return;
        }
        ts = !0, l.disabled = !0, a.textContent = d("Waiting for device result\u2026");
        try {
            var h, m, g, f, b, y, v, w, x, z, T, C, k, $, O, S, N, j, M, P, R, Z;
            let e = await tr(t);
            if (JSON.stringify(t) !== JSON.stringify(n)) return;
            if (!e.report) {
                r.replaceChildren(), i.replaceChildren(), o.replaceChildren(), a.textContent = d("No MQTT report has been parsed yet.");
                return;
            }
            let l = e.report;
            if (r.replaceChildren((m = {
                children: [
                    (h = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            d("Revision"),
                            ":"
                        ]
                    }, s("span", h)),
                    p("info", `#${String(l.revision)}`)
                ]
            }, s("span", m)), (b = {
                children: [
                    (g = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            d("Last received"),
                            ":"
                        ]
                    }, s("span", g)),
                    (f = {
                        children: u("number" == typeof l.last_received ? l.last_received : void 0)
                    }, s("strong", f))
                ]
            }, s("span", b)), (w = {
                children: [
                    (y = {
                        style: "color:#888;margin-right:4px",
                        children: [
                            d("Last good report"),
                            ":"
                        ]
                    }, s("span", y)),
                    (v = {
                        children: u("number" == typeof l.last_good ? l.last_good : void 0)
                    }, s("strong", v))
                ]
            }, s("span", w))), "string" == typeof l.error && r.append((x = {
                class: "alert-message warning",
                style: "width:100%;margin-top:6px",
                children: [
                    d("Latest report error"),
                    ": ",
                    l.error
                ]
            }, s("div", x))), l.report) {
                let e = l.report, t = e.fields;
                i.replaceChildren((S = {
                    class: "table",
                    style: "font-size:90%",
                    children: [
                        ($ = {
                            children: (k = {
                                children: [
                                    (z = {
                                        children: d("Field")
                                    }, s("th", z)),
                                    (T = {
                                        children: d("Value")
                                    }, s("th", T)),
                                    (C = {
                                        children: d("Source member")
                                    }, s("th", C))
                                ]
                            }, s("tr", k))
                        }, s("thead", $)),
                        (O = {
                            children: Object.entries(t).map((e)=>{
                                var t, n, r, i, o, a, l;
                                let [d, u] = e, p = u.value, h = null === p ? "\u2014" : `${"object" == typeof p ? JSON.stringify(p) : String(p)}${u.unit ? ` ${u.unit}` : ""}`;
                                return "uptime_seconds" === d && "number" == typeof p && (h = function(e) {
                                    if (void 0 === e || !Number.isFinite(e) || e < 0) return "\u2014";
                                    let t = Math.floor(e / 86400), n = Math.floor(e % 86400 / 3600), r = Math.floor(e % 3600 / 60), i = [];
                                    return t > 0 && i.push(`${t}\u{5929}`), (n > 0 || t > 0) && i.push(`${n}\u{5C0F}\u{65F6}`), (r > 0 || n > 0 || t > 0) && i.push(`${r}\u{5206}\u{949F}`), i.push(`${e % 60}\u{79D2}`), `${i.join(" ")} (${e} s)`;
                                }(p)), l = {
                                    children: [
                                        (n = {
                                            children: (t = {
                                                children: d
                                            }, s("code", t))
                                        }, s("td", n)),
                                        (i = {
                                            children: (r = {
                                                children: h
                                            }, s("strong", r))
                                        }, s("td", i)),
                                        (a = {
                                            children: (o = {
                                                class: "hl202-badge hl202-badge-neutral",
                                                children: c(u.member)
                                            }, s("span", o))
                                        }, s("td", a))
                                    ]
                                }, s("tr", l);
                            })
                        }, s("tbody", O))
                    ]
                }, s("table", S)));
                let n = [];
                for (let t of e.members){
                    let e = (N = {
                        type: "button",
                        class: "fttr-btn-subtle",
                        style: "margin-left:8px",
                        onclick: (n)=>{
                            n.stopPropagation(), "string" == typeof t.text && (navigator.clipboard?.writeText(t.text), e.textContent = d("Copied to clipboard"), setTimeout(()=>{
                                e.textContent = d("Copy member text");
                            }, 1500));
                        },
                        children: d("Copy member text")
                    }, s("button", N));
                    n.push((Z = {
                        style: "margin:6px 0;border:1px solid rgba(127,140,141,0.15);border-radius:4px;padding:4px 8px",
                        children: [
                            (j = {
                                style: "cursor:pointer;user-select:none;font-weight:600;font-size:90%",
                                children: [
                                    c(`${String(t.name)} (${String(t.bytes)} bytes, ${String(t.encoding)})`),
                                    "string" == typeof t.text ? e : null
                                ]
                            }, s("summary", j)),
                            (R = {
                                style: "margin-top:6px",
                                children: "string" == typeof t.text ? (M = {
                                    class: "hl202-terminal-output",
                                    style: "max-height:16rem",
                                    children: t.text
                                }, s("pre", M)) : (P = {
                                    style: "font-size:85%;color:#888;margin:4px 0",
                                    children: t.text_omitted ? d("Text omitted at the shared byte limit.") : d("Binary member; text is unavailable.")
                                }, s("p", P))
                            }, s("div", R))
                        ]
                    }, s("details", Z)));
                }
                o.replaceChildren(...e.errors.map((e)=>{
                    var t;
                    return t = {
                        class: "alert-message warning",
                        children: e
                    }, s("div", t);
                }), ...n);
            } else i.replaceChildren(), o.replaceChildren();
            a.textContent = "";
        } catch (e) {
            a.textContent = e instanceof Error ? e.message : d("Request failed");
        } finally{
            ts = !1, l.disabled = !n;
        }
    };
    return l.addEventListener("click", ()=>{
        h();
    }), {
        element: (t = {
            class: "cbi-section hl202-panel-report",
            children: [
                (e = {
                    style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                    children: [
                        s("h3", {
                            style: "margin:0",
                            children: d("MQTT report")
                        }),
                        l
                    ]
                }, s("div", e)),
                a,
                r,
                i,
                o
            ]
        }, s("div", t)),
        setTarget (e) {
            JSON.stringify(e) !== JSON.stringify(n) && (r.replaceChildren(), i.replaceChildren(), o.replaceChildren(), a.textContent = ""), n = e, l.disabled = !e;
        },
        refresh: (e)=>h(e)
    };
}
let td = L.view;
if (!("extend" in td) || "function" != typeof td.extend) throw Error("LuCI view extension is unavailable");
let main = Reflect.apply(td.extend, td, [
    {
        render: function() {
            var e, t, n, r, i, o, a, l, u, h, m, g, f;
            let b, y, v, w, x, z = s("select", {
                id: "hl202-device",
                class: "cbi-input-select",
                "aria-label": d("HL202 device"),
                style: "min-width:320px"
            }), T = s("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                children: d("Refresh devices")
            }), C = s("div", {
                style: "font-size:88%;color:#888;margin:6px 0",
                "aria-live": "polite"
            }), k = s("strong", {
                children: "\u2014"
            }), $ = s("span", {
                class: "hl202-badge hl202-badge-neutral",
                style: "font-size:80%",
                children: "\u2014"
            }), O = s("span", {
                class: "hl202-badge hl202-badge-neutral",
                children: "\u2014"
            }), S = s("span", {
                class: "hl202-badge hl202-badge-neutral",
                children: "\u2014"
            }), N = s("span", {
                class: "hl202-badge hl202-badge-info",
                style: "font-size:80%",
                children: "\u2014"
            }), j = s("div", {
                class: "alert-message warning",
                style: "margin-top:8px",
                hidden: !0,
                children: d("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
            }), M = (n = {
                class: "cbi-section hl202-device-card",
                style: "margin-bottom:0",
                children: [
                    (t = {
                        class: "hl202-card-header",
                        children: [
                            s("div", {
                                class: "hl202-device-title",
                                children: [
                                    k,
                                    $
                                ]
                            }),
                            s("div", {
                                class: "hl202-device-badges",
                                children: [
                                    O,
                                    S,
                                    N
                                ]
                            }),
                            (e = {
                                class: "hl202-device-links",
                                children: s("a", {
                                    href: L.url("admin", "network", "fttr", "hardware"),
                                    class: "fttr-btn-subtle",
                                    children: [
                                        d("Open optical status and ONU/MIB details"),
                                        " \u2192"
                                    ]
                                })
                            }, s("div", e))
                        ]
                    }, s("div", t)),
                    j
                ]
            }, s("div", n)), P = tl(), R = (b = null, y = s("div", {
                style: "font-size:88%;color:#888;margin:6px 0",
                "aria-live": "polite"
            }), v = s("div", {
                style: "margin-top:10px;display:flex;flex-direction:column;gap:10px"
            }), (w = s("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                children: d("Read users")
            })).disabled = !L.hasViewPermission(), x = async ()=>{
                if (!b) {
                    y.textContent = d("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
                    return;
                }
                if (ts) {
                    y.textContent = d("Another operation is in progress.");
                    return;
                }
                ts = !0, w.disabled = !0, y.textContent = d("Waiting for device result\u2026");
                let e = b;
                try {
                    let m = await ti(e);
                    if (JSON.stringify(e) !== JSON.stringify(b)) return;
                    v.replaceChildren();
                    let g = m.operation, f = g.result;
                    if ("timeout" === f.status ? y.textContent = d("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.") : y.textContent = g.binding_current ? f.error ?? (null === m.accounts ? d("Account data is unavailable.") : "") : d("Device binding changed; this result is stale."), m.accounts && g.binding_current) {
                        let g = [];
                        for (let f of m.accounts){
                            var t, n, r, i, o, a, l, c, u, p, h;
                            let m = f.entry, y = f.active, v = (t = {
                                class: `hl202-badge ${y ? "hl202-badge-success" : "hl202-badge-neutral"}`,
                                style: "font-size:80%",
                                children: y ? d("Enabled") : d("Disabled")
                            }, s("span", t)), w = (n = {
                                type: "password",
                                class: "cbi-input-text",
                                placeholder: d("New password"),
                                autocomplete: "new-password",
                                style: "width:180px"
                            }, s("input", n)), x = (r = {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                children: d("Set password")
                            }, s("button", r)), z = (i = {
                                type: "button",
                                class: `cbi-button ${y ? "cbi-button-neutral" : "cbi-button-apply"}`,
                                children: y ? d("Disable") : d("Enable")
                            }, s("button", i));
                            x.disabled = z.disabled = !L.hasViewPermission();
                            let T = (o = {
                                style: "font-size:82%;margin-top:4px",
                                "aria-live": "polite"
                            }, s("div", o));
                            x.addEventListener("click", async ()=>{
                                if (!b || ts || JSON.stringify(e) !== JSON.stringify(b)) return;
                                let t = w.value;
                                if (!t) {
                                    T.textContent = d("Enter a non-empty password.");
                                    return;
                                }
                                w.value = "", ts = !0, x.disabled = z.disabled = !0, T.textContent = d("Waiting for device result\u2026");
                                try {
                                    let n = await to(e, {
                                        entry: m,
                                        kind: "password",
                                        password: t,
                                        active: y
                                    });
                                    if (JSON.stringify(e) !== JSON.stringify(b)) return;
                                    let r = n.operation, i = r.result;
                                    r.binding_current && "accepted_and_saved" === n.write_status ? T.textContent = d("Password accepted and saved; web login permission is not verified.") : T.textContent = i.error ?? d("Execution outcome is unknown. Do not automatically retry.");
                                } catch (e) {
                                    T.textContent = e instanceof Error ? e.message : d("Request failed");
                                } finally{
                                    ts = !1, x.disabled = z.disabled = !L.hasViewPermission();
                                }
                            }), z.addEventListener("click", async ()=>{
                                if (b && !ts && JSON.stringify(e) === JSON.stringify(b)) {
                                    ts = !0, x.disabled = z.disabled = !0, T.textContent = d("Waiting for device result\u2026");
                                    try {
                                        let t = !y, n = await to(e, {
                                            entry: m,
                                            kind: "active",
                                            password: "",
                                            active: t
                                        });
                                        if (JSON.stringify(e) !== JSON.stringify(b)) return;
                                        let r = n.accounts?.find((e)=>e.entry === m);
                                        if (!n.operation.binding_current || "accepted_and_saved" !== n.write_status || !r) {
                                            T.textContent = n.operation.result.error ?? d("Execution outcome is unknown. Refresh users before retrying.");
                                            return;
                                        }
                                        y = r.active, v.className = `hl202-badge ${y ? "hl202-badge-success" : "hl202-badge-neutral"}`, v.textContent = y ? d("Enabled") : d("Disabled"), z.className = `cbi-button ${y ? "cbi-button-neutral" : "cbi-button-apply"}`, z.textContent = y ? d("Disable") : d("Enable"), T.textContent = `${String(n.write_status)}; ${d("Refresh users to read the current state.")}`;
                                    } catch (e) {
                                        T.textContent = e instanceof Error ? e.message : d("Request failed");
                                    } finally{
                                        ts = !1, x.disabled = z.disabled = !L.hasViewPermission();
                                    }
                                }
                            }), g.push((h = {
                                class: "cbi-section",
                                style: "margin:0;padding:10px 14px;border:1px solid rgba(127,140,141,0.2);border-radius:5px",
                                children: [
                                    (p = {
                                        style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                                        children: [
                                            (c = {
                                                style: "display:flex;align-items:center;gap:8px",
                                                children: [
                                                    (a = {
                                                        style: "font-size:105%",
                                                        children: f.username
                                                    }, s("strong", a)),
                                                    (l = {
                                                        style: "font-size:80%;color:#888",
                                                        children: [
                                                            "(Entry ",
                                                            m,
                                                            ")"
                                                        ]
                                                    }, s("span", l)),
                                                    v
                                                ]
                                            }, s("div", c)),
                                            (u = {
                                                style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px",
                                                children: [
                                                    w,
                                                    x,
                                                    z
                                                ]
                                            }, s("div", u))
                                        ]
                                    }, s("div", p)),
                                    T
                                ]
                            }, s("div", h)));
                        }
                        v.replaceChildren(...g);
                    }
                } catch (e) {
                    y.textContent = e instanceof Error ? e.message : d("Request failed");
                } finally{
                    ts = !1, w.disabled = !b || !L.hasViewPermission();
                }
            }, w.addEventListener("click", ()=>{
                x();
            }), {
                element: (f = {
                    class: "cbi-section hl202-panel-accounts",
                    children: [
                        (g = {
                            style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:6px",
                            children: [
                                s("h3", {
                                    style: "margin:0",
                                    children: d("User management")
                                }),
                                w
                            ]
                        }, s("div", g)),
                        s("p", {
                            style: "font-size:85%;color:#888;margin:4px 0",
                            children: d("Password writes are accepted and saved by the device; this does not prove web login permission. Existing permission masks are preserved.")
                        }),
                        y,
                        v
                    ]
                }, s("div", f)),
                setTarget (e) {
                    JSON.stringify(e) !== JSON.stringify(b) && (v.replaceChildren(), y.textContent = ""), b = e, w.disabled = !e || !L.hasViewPermission();
                },
                refresh: ()=>x()
            }), Z = function() {
                var e, t, n, r;
                let i = null, o = s("div", {
                    style: "font-size:88%;color:#666;margin:4px 0"
                }), a = s("textarea", {
                    id: "hl202-script",
                    rows: 8,
                    class: "hl202-terminal-textarea",
                    spellcheck: !1,
                    "aria-label": d("Remote shell command"),
                    placeholder: "# \u8F93\u5165\u5728\u6240\u9009\u5B50\u7F51\u5173\u4E0A\u6267\u884C\u7684 Shell \u547D\u4EE4 (\u652F\u6301 Ctrl + Enter \u5FEB\u6377\u6267\u884C)..."
                }), l = s("input", {
                    type: "number",
                    id: "hl202-timeout",
                    min: "1",
                    max: "300",
                    value: "20",
                    class: "cbi-input-text",
                    style: "width:70px;text-align:center",
                    "aria-label": d("Timeout in seconds")
                }), c = s("button", {
                    type: "button",
                    class: "cbi-button cbi-button-apply",
                    style: "font-weight:600",
                    children: d("Execute on selected HL202")
                });
                c.disabled = !L.hasViewPermission();
                let u = s("div", {
                    style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px"
                }), h = s("pre", {
                    class: "hl202-terminal-output",
                    style: "min-height:4rem;display:none",
                    children: "# \u7B49\u5F85\u6267\u884C\u6307\u4EE4..."
                }), m = s("button", {
                    type: "button",
                    class: "fttr-btn-subtle",
                    onclick: ()=>{
                        h.textContent && (navigator.clipboard?.writeText(h.textContent), m.textContent = d("Copied to clipboard"), setTimeout(()=>{
                            m.textContent = d("Copy output");
                        }, 1500));
                    },
                    children: d("Copy output")
                }), g = s("button", {
                    type: "button",
                    class: "fttr-btn-subtle",
                    onclick: ()=>{
                        h.textContent = "", h.style.display = "none", u.replaceChildren();
                    },
                    children: d("Clear output")
                }), f = async ()=>{
                    var e, t, n, r, o, f, b, y, v, w, x;
                    if (!i) return void u.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: d("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
                    }));
                    if (ts) return void u.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: d("Another operation is in progress.")
                    }));
                    let z = Number(l.value);
                    if (!Number.isInteger(z) || z < 1 || z > 300) return void u.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: d("Timeout must be 1\u2013300 seconds.")
                    }));
                    let T = a.value.trim();
                    if (!T || T.includes("\0") || new TextEncoder().encode(T).length > 65536) return void u.replaceChildren(s("div", {
                        class: "alert-message warning",
                        children: d("Enter a non-empty UTF-8 script up to 64 KiB without NUL characters.")
                    }));
                    ts = !0, c.disabled = !0, h.style.display = "block", h.textContent = `# [${new Date().toLocaleTimeString()}] \u{6B63}\u{5728}\u{4E0B}\u{53D1}\u{81F3} ${i.optical_sn} (\u{8D85}\u{65F6}: ${z}s)...\n`, u.replaceChildren(p("info", d("Waiting for device result\u2026")));
                    let C = Date.now(), k = i;
                    try {
                        let l = await ta(k, a.value, z);
                        if (JSON.stringify(k) !== JSON.stringify(i)) return;
                        let c = ((Date.now() - C) / 1000).toFixed(2), x = l.operation, T = x.result, $ = T.status, O = T.exit_code, S = x.binding_current && !T.error && "executed" === $ && 0 === O, N = p(S ? "success" : "timeout" === $ ? "warning" : "danger", S ? d("Success") : "timeout" === $ ? d("Timeout") : `${d("Exit code")} ${String(O ?? $)}`);
                        u.replaceChildren(N, (n = {
                            children: [
                                (e = {
                                    style: "color:#888",
                                    children: [
                                        d("Exit code"),
                                        ":"
                                    ]
                                }, s("span", e)),
                                " ",
                                (t = {
                                    children: String(O ?? "\u2014")
                                }, s("code", t))
                            ]
                        }, s("span", n)), (f = {
                            children: [
                                (r = {
                                    style: "color:#888",
                                    children: [
                                        d("Duration"),
                                        ":"
                                    ]
                                }, s("span", r)),
                                " ",
                                (o = {
                                    children: [
                                        c,
                                        " s"
                                    ]
                                }, s("strong", o))
                            ]
                        }, s("span", f)), (v = {
                            children: [
                                (b = {
                                    style: "color:#888",
                                    children: [
                                        d("Request ID"),
                                        ":"
                                    ]
                                }, s("span", b)),
                                " ",
                                (y = {
                                    children: String(T.request_id ?? "\u2014")
                                }, s("code", y))
                            ]
                        }, s("span", v)), (w = {
                            style: "margin-left:auto;display:flex;gap:6px",
                            children: [
                                m,
                                g
                            ]
                        }, s("div", w)));
                        let j = [];
                        x.binding_current || j.push(d("Device binding changed; this result is stale.")), ("timeout" === $ || "dispatched" === $) && j.push(d("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.")), "string" == typeof T.output && T.output.length && j.push(T.output), "string" == typeof T.error && T.error.length && j.push(`[STDERR]\n${T.error}`), !0 === T.output_truncated && j.push(`\n[!] ${d("Output was truncated at the byte limit.")}`), 0 === j.length && j.push(d("No output returned.")), h.textContent = j.join("\n");
                    } catch (t) {
                        let e = ((Date.now() - C) / 1000).toFixed(2);
                        u.replaceChildren(p("danger", d("Failed")), (x = {
                            children: [
                                s("span", {
                                    style: "color:#888",
                                    children: [
                                        d("Duration"),
                                        ":"
                                    ]
                                }),
                                " ",
                                e,
                                " s"
                            ]
                        }, s("span", x)), s("div", {
                            style: "margin-left:auto;display:flex;gap:6px",
                            children: [
                                m,
                                g
                            ]
                        })), h.textContent = `[ERROR] ${t instanceof Error ? t.message : d("Request failed")}`;
                    } finally{
                        ts = !1, c.disabled = !i || !L.hasViewPermission();
                    }
                };
                c.addEventListener("click", ()=>{
                    f();
                }), a.addEventListener("keydown", (e)=>{
                    (e.ctrlKey || e.metaKey) && "Enter" === e.key && (e.preventDefault(), f());
                });
                let b = (e = {
                    class: "hl202-snippets",
                    children: [
                        s("span", {
                            style: "font-size:80%;color:#888;margin-right:2px",
                            children: [
                                d("Quick diagnostic commands"),
                                ":"
                            ]
                        }),
                        [
                            {
                                label: "uptime (\u8D1F\u8F7D)",
                                cmd: "uptime"
                            },
                            {
                                label: "meminfo (\u5185\u5B58)",
                                cmd: "cat /proc/meminfo | head -n 10"
                            },
                            {
                                label: "cpuinfo (CPU)",
                                cmd: "cat /proc/cpuinfo | grep 'model name\\|processor'"
                            },
                            {
                                label: "ifconfig (\u7F51\u7EDC)",
                                cmd: "ifconfig"
                            },
                            {
                                label: "ps (\u8FDB\u7A0B)",
                                cmd: "ps"
                            },
                            {
                                label: "dmesg (\u5185\u6838\u65E5\u5FD7)",
                                cmd: "dmesg | tail -n 25"
                            }
                        ].map((e)=>s("button", {
                                type: "button",
                                class: "hl202-snippet-tag",
                                onclick: ()=>{
                                    a.value = e.cmd, a.focus();
                                },
                                children: e.label
                            }))
                    ]
                }, s("div", e));
                return {
                    element: (r = {
                        class: "cbi-section hl202-panel-console",
                        children: [
                            s("h3", {
                                style: "margin-bottom:4px",
                                children: d("Raw command console")
                            }),
                            s("p", {
                                style: "font-size:85%;color:#888;margin-top:0;margin-bottom:6px",
                                children: d("Shell executes on the selected ONU. Timeout does not cancel execution. Raw output can contain secrets.")
                            }),
                            o,
                            b,
                            s("div", {
                                class: "hl202-terminal",
                                style: "margin-bottom:8px",
                                children: a
                            }),
                            (n = {
                                style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:8px",
                                children: [
                                    (t = {
                                        htmlFor: "hl202-timeout",
                                        style: "display:flex;align-items:center;gap:6px;font-size:90%",
                                        children: [
                                            s("span", {
                                                children: [
                                                    d("Timeout in seconds"),
                                                    ":"
                                                ]
                                            }),
                                            l
                                        ]
                                    }, s("label", t)),
                                    s("span", {
                                        style: "font-size:82%;color:#888",
                                        children: "(\u5FEB\u6377\u952E: Ctrl + Enter)"
                                    }),
                                    s("div", {
                                        style: "margin-left:auto",
                                        children: c
                                    })
                                ]
                            }, s("div", n)),
                            s("div", {
                                style: "margin-top:10px",
                                children: [
                                    u,
                                    h
                                ]
                            })
                        ]
                    }, s("div", r)),
                    setTarget (e) {
                        var t;
                        JSON.stringify(e) !== JSON.stringify(i) && (u.replaceChildren(), h.textContent = "", h.style.display = "none"), i = e, c.disabled = !e || !L.hasViewPermission(), e ? o.replaceChildren((t = {
                            children: [
                                s("span", {
                                    style: "color:#888",
                                    children: [
                                        d("Target"),
                                        ":"
                                    ]
                                }),
                                " ",
                                s("strong", {
                                    children: e.optical_sn
                                }),
                                " (ONU",
                                " ",
                                e.onu_id,
                                ") \xb7 ",
                                s("code", {
                                    children: [
                                        "gen: ",
                                        e.binding_generation
                                    ]
                                })
                            ]
                        }, s("span", t))) : o.replaceChildren(s("span", {
                            style: "color:#e74c3c",
                            children: d("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
                        }));
                    }
                };
            }(), Q = s("select", {
                id: "hl202-source",
                class: "cbi-input-select",
                "aria-label": d("Read-only MQTT source"),
                style: "min-width:240px"
            }), A = s("button", {
                type: "button",
                class: "cbi-button cbi-button-action",
                style: "margin-left:8px",
                children: d("Inspect source report (read-only)")
            }), D = s("div", {
                style: "margin-top:10px"
            }), J = [], I = s("pre", {
                style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto"
            }), U = (o = {
                class: "cbi-section hl202-panel-sources",
                children: [
                    s("h3", {
                        style: "margin-bottom:4px",
                        children: d("MQTT source identity")
                    }),
                    s("p", {
                        style: "font-size:85%;color:#888;margin-top:0;margin-bottom:8px",
                        children: d("Inspect read-only MQTT source reports and diagnostics for unbound or unselected devices.")
                    }),
                    (r = {
                        style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                        children: [
                            s("label", {
                                htmlFor: "hl202-source",
                                children: [
                                    d("Read-only MQTT source"),
                                    ": ",
                                    Q
                                ]
                            }),
                            A
                        ]
                    }, s("div", r)),
                    D,
                    (i = {
                        style: "margin-top:10px",
                        children: [
                            s("summary", {
                                style: "cursor:pointer;font-size:85%;color:#888;font-weight:600",
                                children: d("Raw source observations (JSON)")
                            }),
                            s("div", {
                                style: "margin-top:6px",
                                children: I
                            })
                        ]
                    }, s("details", i))
                ]
            }, s("div", o)), q = "report", V = [
                {
                    id: "report",
                    label: d("MQTT report")
                },
                {
                    id: "accounts",
                    label: d("User management")
                },
                {
                    id: "console",
                    label: d("Raw command console")
                },
                {
                    id: "sources",
                    label: d("MQTT source identity")
                }
            ], F = new Map(), H = (a = {
                class: "cbi-tabmenu",
                style: "margin-top:14px;margin-bottom:0",
                children: V.map((e)=>{
                    var t;
                    let n = (t = {
                        class: q === e.id ? "cbi-tab" : "cbi-tab-disabled",
                        "data-tab": e.id,
                        children: s("a", {
                            href: `#tab-${e.id}`,
                            onclick: (t)=>{
                                t.preventDefault();
                                var n = e.id;
                                for (let [e, t] of (q = n, F))t.className = e === n ? "cbi-tab" : "cbi-tab-disabled";
                                P.element.hidden = "report" !== n, R.element.hidden = "accounts" !== n, Z.element.hidden = "console" !== n, U.hidden = "sources" !== n, window.dispatchEvent(new Event("resize"));
                            },
                            children: e.label
                        })
                    }, s("li", t));
                    return F.set(e.id, n), n;
                })
            }, s("ul", a));
            P.element.hidden = !1, R.element.hidden = !0, Z.element.hidden = !0, U.hidden = !0;
            let W = s("div", {
                id: "hl202-panels-container",
                children: [
                    P.element,
                    R.element,
                    Z.element,
                    U
                ]
            }), B = [], K = "", X = "", G = ()=>{
                let e = z.value, t = B.find((t)=>t.optical_sn === e);
                if (!t) {
                    k.textContent = d("No HL202 optical devices were found."), $.textContent = "\u2014", O.textContent = "\u2014", S.textContent = "\u2014", N.textContent = "\u2014", j.hidden = !0, P.setTarget(null), R.setTarget(null), Z.setTarget(null);
                    return;
                }
                if (k.textContent = `${t.optical_sn} (ONU ${t.onu_id})`, $.textContent = t.model || "HL202", t.optical_online ? (O.className = "hl202-badge hl202-badge-success", O.textContent = d("Optical online")) : (O.className = "hl202-badge hl202-badge-danger", O.textContent = d("Optical offline")), t.can_execute && t.mqtt) {
                    S.className = "hl202-badge hl202-badge-success", S.textContent = d("MQTT ready"), N.textContent = `gen: ${t.mqtt.binding_generation}`, N.hidden = !1, j.hidden = !0;
                    let e = {
                        optical_sn: t.optical_sn,
                        onu_id: t.onu_id,
                        binding_generation: t.mqtt.binding_generation
                    };
                    P.setTarget(e), R.setTarget(e), Z.setTarget(e);
                } else S.className = "hl202-badge hl202-badge-warning", S.textContent = d("MQTT unavailable"), N.hidden = !0, j.hidden = !1, P.setTarget(null), R.setTarget(null), Z.setTarget(null);
            }, Y = async ()=>{
                T.disabled = !0, C.textContent = d("Loading devices\u2026");
                try {
                    let t = await tn(), n = t.devices;
                    B = n;
                    let r = n.map((e)=>`${e.optical_sn}:${e.onu_id}:${e.optical_online}:${e.can_execute}:${e.report_revision}:${e.mqtt?.binding_generation}`).join("|");
                    if (r !== K) {
                        K = r;
                        let e = z.value;
                        z.replaceChildren(...n.map((e)=>{
                            var t;
                            return t = {
                                value: e.optical_sn,
                                children: c(`${e.model} / ${e.optical_sn} / ONU ${e.onu_id} \u{2014} ${e.can_execute ? d("MQTT ready") : d("MQTT unavailable")}; ${e.optical_online ? d("Optical online") : d("Optical offline")}`)
                            }, s("option", t);
                        })), n.some((t)=>t.optical_sn === e) && (z.value = e);
                    }
                    C.textContent = n.length ? d("Select a device to inspect reports and run operations.") : d("No HL202 optical devices were found."), I.textContent = JSON.stringify(t.sources, null, 2);
                    let i = Q.value, o = [];
                    for (let n of (Q.replaceChildren(), t.sources)){
                        var e;
                        o.push({
                            mqtt_mac: n.mqtt_mac,
                            binding_generation: n.binding_generation
                        }), Q.append((e = {
                            value: n.mqtt_mac,
                            children: c(`${n.mqtt_mac} \u{2014} ${String(n.reason)}`)
                        }, s("option", e)));
                    }
                    J = o, o.some((e)=>e.mqtt_mac === i) && (Q.value = i), A.disabled = 0 === o.length, G();
                    let a = n.find((e)=>e.optical_sn === z.value);
                    a?.can_execute && null !== a.report_revision && `${a.optical_sn}:${a.mqtt?.binding_generation}:${a.report_revision}` !== X && !ts && (X = `${a.optical_sn}:${a.mqtt?.binding_generation}:${a.report_revision}`, P.refresh());
                } catch (e) {
                    B = [], G(), C.textContent = e instanceof Error ? e.message : d("Request failed");
                } finally{
                    T.disabled = !1;
                }
            };
            z.addEventListener("change", G), A.addEventListener("click", ()=>{
                let e = J.find((e)=>e.mqtt_mac === Q.value);
                if (D.replaceChildren(), e) {
                    let t = tl();
                    t.setTarget(e), D.append(t.element), t.refresh(e);
                }
            }), T.addEventListener("click", ()=>{
                Y();
            }), Y();
            let ee = (m = {
                class: "cbi-map hl202-management",
                children: [
                    s("style", {
                        children: `
				.hl202-management {
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
					.hl202-management {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .hl202-management,
				[data-theme="dark"] .hl202-management {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-danger-color: #e74c3c;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				.hl202-management .hl202-badge {
					display: inline-block;
					padding: 0.18em 0.55em;
					font-size: 85%;
					font-weight: 600;
					line-height: 1.25;
					border-radius: 3px;
					white-space: nowrap;
					text-align: center;
				}

				.hl202-management .hl202-badge-success {
					background: var(--fttr-success-bg);
					color: var(--fttr-success-color);
					border: 1px solid var(--fttr-success-border);
				}

				.hl202-management .hl202-badge-warning {
					background: var(--fttr-warning-bg);
					color: var(--fttr-warning-color);
					border: 1px solid var(--fttr-warning-border);
				}

				.hl202-management .hl202-badge-danger {
					background: var(--fttr-danger-bg);
					color: var(--fttr-danger-color);
					border: 1px solid var(--fttr-danger-border);
				}

				.hl202-management .hl202-badge-info {
					background: var(--fttr-info-bg);
					color: var(--fttr-info-color);
					border: 1px solid var(--fttr-info-border);
				}

				.hl202-management .hl202-badge-neutral {
					background: var(--fttr-neutral-bg);
					color: var(--fttr-neutral-color);
					border: 1px solid var(--fttr-neutral-border);
				}

				.hl202-management .hl202-device-card {
					padding: 12px 16px;
					border: 1px solid rgba(127, 140, 141, 0.2);
					border-radius: 6px;
					background: rgba(127, 140, 141, 0.04);
					margin-top: 10px;
					margin-bottom: 0;
				}

				.hl202-management .hl202-card-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-wrap: wrap;
					gap: 12px;
				}

				.hl202-management .hl202-device-title {
					display: flex;
					align-items: center;
					gap: 8px;
				}

				.hl202-management .hl202-device-badges {
					display: flex;
					align-items: center;
					gap: 8px;
					flex-wrap: wrap;
				}

				.hl202-management .cbi-tabmenu {
					margin-top: 14px;
					margin-bottom: 0;
					user-select: none;
				}

				.hl202-management #hl202-panels-container > .cbi-section {
					margin-top: 0;
					border-top-left-radius: 0;
				}

				.hl202-management .hl202-terminal {
					background: #1e1e1e;
					color: #d4d4d4;
					font-family: Consolas, Monaco, "Courier New", monospace;
					border: 1px solid #333;
					border-radius: 4px;
					box-sizing: border-box;
				}

				.hl202-management .hl202-terminal-textarea {
					width: 100%;
					padding: 10px 12px;
					background: transparent;
					color: inherit;
					font-family: inherit;
					font-size: 90%;
					border: none;
					resize: vertical;
					outline: none;
					line-height: 1.45;
				}

				.hl202-management .hl202-terminal-output {
					background: #141414;
					color: #38ef7d;
					font-family: Consolas, Monaco, "Courier New", monospace;
					font-size: 88%;
					padding: 12px 14px;
					border-radius: 4px;
					border: 1px solid #2a2a2a;
					max-height: 28rem;
					overflow: auto;
					white-space: pre-wrap;
					word-break: break-all;
					line-height: 1.4;
					margin-top: 8px;
				}

				.hl202-management .hl202-snippets {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					gap: 6px;
					margin-bottom: 8px;
				}

				.hl202-management .hl202-snippet-tag {
					font-size: 80%;
					padding: 2px 8px;
					border-radius: 3px;
					border: 1px solid rgba(127, 140, 141, 0.35);
					background: rgba(127, 140, 141, 0.08);
					color: inherit;
					cursor: pointer;
					transition: all 0.15s ease;
				}

				.hl202-management .hl202-snippet-tag:hover {
					background: rgba(52, 152, 219, 0.15);
					border-color: rgba(52, 152, 219, 0.4);
					color: #2980b9;
				}

				.hl202-management .fttr-btn-subtle {
					font-size: 82%;
					padding: 2px 8px;
					border: 1px solid rgba(127, 140, 141, 0.35);
					background: transparent;
					color: inherit;
					border-radius: 4px;
					cursor: pointer;
					text-decoration: none;
				}

				.hl202-management .fttr-btn-subtle:hover {
					background: rgba(52, 152, 219, 0.1);
					border-color: rgba(52, 152, 219, 0.4);
					color: #2980b9;
				}

				.hl202-management :is(.cbi-dropdown,.fluent-custom-select) {
					width: 100%;
					max-width: 100%;
					min-width: 0 !important;
					box-sizing: border-box;
				}

				.hl202-management :is(.cbi-dropdown,.fluent-custom-select) > ul > li {
					white-space: normal;
					overflow-wrap: anywhere;
				}
				`
                    }),
                    s("h2", {
                        children: d("HL202 sub-gateway management")
                    }),
                    (h = {
                        class: "cbi-section",
                        children: [
                            (u = {
                                style: "display:flex;align-items:center;flex-wrap:wrap;gap:10px",
                                children: [
                                    (l = {
                                        htmlFor: "hl202-device",
                                        style: "display:flex;align-items:center;gap:8px",
                                        children: [
                                            s("strong", {
                                                children: [
                                                    d("HL202 device"),
                                                    ":"
                                                ]
                                            }),
                                            z
                                        ]
                                    }, s("label", l)),
                                    T
                                ]
                            }, s("div", u)),
                            C,
                            M
                        ]
                    }, s("div", h)),
                    H,
                    W
                ]
            }, s("div", m)), et = async ()=>{
                ee.isConnected && (await Y(), ee.isConnected && window.setTimeout(()=>void et(), 5000));
            };
            return window.setTimeout(()=>void et(), 5000), ee;
        },
        handleSave: null,
        handleSaveApply: null,
        handleReset: null
    }
]);

return main;