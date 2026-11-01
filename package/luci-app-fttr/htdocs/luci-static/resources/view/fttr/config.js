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
const o = Symbol.for("jsx.fragment");
function a(e, t) {
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
let s = L.form;
function l(e, t, n, i, r) {
    let o = e.option(t, n, i);
    return r && (o.datatype = r.startsWith("range(") ? `and(uinteger,${r})` : r), o;
}
function d(e, t, n, i, r, o) {
    let a = e.taboption(t, n, i, r);
    return o && (a.datatype = o.startsWith("range(") ? `and(uinteger,${o})` : o), a;
}
function c(e, t, n, i) {
    let r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], o = l(e, s.ListValue, t, n);
    for (let [e, t] of i)o.value(e, t);
    return o.rmempty = r, o;
}
function u(e, t, n, i, r) {
    let o = arguments.length > 5 && void 0 !== arguments[5] && arguments[5], a = d(e, t, s.ListValue, n, i);
    for (let [e, t] of r)a.value(e, t);
    return a.rmempty = o, a;
}
function p(e, t, n, i) {
    let r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], o = l(e, s.RichListValue, t, n);
    return o.rmempty = r, o.optional = r, o.default = "", m(o, ()=>[
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
        ]), o.validate = (e, t)=>!!(r && !t || L.uci.sections("fttr", i).some((e)=>e[".name"] === t)) || _("Select an existing item."), o;
}
function m(e, t) {
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
function f(e, t, n, i, r, o) {
    let a = e.taboption(t, s.SectionValue, n, s.GridSection, i, r).subsection;
    return a.anonymous = !0, a.addremove = !0, a.modaltitle = (e)=>String(L.uci.get("fttr", e, "name") || L.uci.get("fttr", e, "ssid") || r), o(a), a.addModalOptions = (e, t)=>{
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
    }, a;
}
function g(e, t, n, i) {
    let r = e.option(L.form.DummyValue, t, n);
    r.modalonly = !1, r.textvalue = i;
}
function h(e) {
    g(e, "_template", _("Template"), (e)=>{
        let t = String(L.uci.get("fttr", e, "template") || "");
        return String(L.uci.get("fttr", t, "name") || t || _("Missing template"));
    });
    let t = p(e, "template", _("Template"), "template");
    return t.modalonly = !0, t;
}
function v(e, t) {
    let n = e.handleRemove;
    e.handleRemove = async function(e, i) {
        try {
            t(e), await n.call(this, e, i);
        } catch (e) {
            L.ui.addNotification(null, a("p", {
                children: String(e instanceof Error ? e.message : e)
            }), "error");
        }
    };
}
const y = [
    "INTERNET",
    "OTHER",
    "IPTV",
    "VOIP"
];
function b(e) {
    return Array.isArray(e) ? e.map(String) : String(e ?? "").split(/\s+/).filter(Boolean);
}
function w() {
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
function S(e) {
    return String(e.name || e.ssid || e.optical_sn || e[".name"]);
}
function z(e, t) {
    return e.wifi.filter((e)=>e.template === t).map((e)=>[
            e[".name"],
            S(e)
        ]);
}
function k(e) {
    let t = w();
    if (t.group.some((t)=>t.template === e)) throw Error(_("Template is in use."));
    for (let n of t.wifi)n.template === e && T(n[".name"]);
    for (let n of [
        ...t.network,
        ...t.wifi
    ])n.template === e && L.uci.remove("fttr", n[".name"]);
}
function P(e) {
    if (w().device.some((t)=>t.group === e)) throw Error(_("Group is used by devices. Reassign those devices before deleting it."));
}
function T(e) {
    for (let t of w().network){
        let n = b(t.ssid);
        if (n.includes(e)) {
            let i = n.filter((t)=>t !== e);
            i.length ? L.uci.set("fttr", t[".name"], "ssid", i) : L.uci.unset("fttr", t[".name"], "ssid");
        }
    }
}
function A(e) {
    return "HWTC" === (e?.vendor || e?.serial_number.slice(0, 4)) ? "hwtc" : e?.model?.startsWith("HL202") ? "hl202" : "generic";
}
function N(e) {
    let t = b(e);
    return t.length ? !!t.every((e)=>y.includes(e)) || _("WAN Service List may only contain INTERNET, OTHER, IPTV, and VOIP.") : _("Select at least one WAN Service List label.");
}
function j(e) {
    let t = [], n = new Set(e.template.map((e)=>e[".name"])), i = new Set(e.group.map((e)=>e[".name"])), r = new Map(e.wifi.map((e)=>[
            e[".name"],
            e
        ])), o = (e, n, i, r)=>{
        t.push({
            kind: e,
            sectionId: n[".name"],
            field: i,
            message: r
        });
    };
    for (let t of e.template)String(t.name || "").trim() || o("template", t, "name", _("Name is required."));
    for (let t of [
        "wifi",
        "network",
        "group"
    ])for (let i of e[t])n.has(String(i.template || "")) || o(t, i, "template", _("Select an existing template."));
    for (let t of e.wifi){
        let e = new TextEncoder().encode(String(t.ssid || "")).length;
        if ((e < 1 || e > 32) && o("wifi", t, "ssid", _("SSID must be 1\u201332 bytes.")), "2g" !== t.radio && "5g" !== t.radio && o("wifi", t, "radio", _("Select a wireless band.")), [
            "wpa2-psk",
            "wpa3-sae",
            "wpa2-psk/wpa3-sae",
            "wpa-psk/wpa2-psk"
        ].includes(String(t.security))) {
            let e = new TextEncoder().encode(String(t.key || "")).length;
            (e < 8 || e > 63) && o("wifi", t, "key", _("Password must be 8\u201363 bytes."));
        }
    }
    for (let t of e.network){
        String(t.name || "").trim() || o("network", t, "name", _("Name is required."));
        let e = N(t.service_list);
        for (let [n, i] of (!0 !== e && o("network", t, "service_list", e), [
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
            (!/^\d+$/.test(e) || Number(e) > i) && o("network", t, n, _("Value is outside the allowed range."));
        }
        for (let e of b(t.ssid)){
            let n = r.get(e);
            n && n.template === t.template || o("network", t, "ssid", _("Select SSIDs belonging to this network's template."));
        }
    }
    for (let t of e.device)i.has(String(t.group || "")) || o("device", t, "group", _("Select an existing group."));
    return t;
}
function C(e, t) {
    return e.children.find((e)=>e.subsection?.sectiontype === t)?.subsection;
}
function O(e) {
    return ({
        device: _("Device"),
        group: _("Group"),
        template: _("Template"),
        wifi: _("SSID"),
        network: _("Network")
    })[e];
}
async function x(e, t) {
    let n = e.currentTarget;
    n.disabled = !0;
    try {
        await t();
    } catch (e) {
        L.ui.addNotification(null, a("p", {
            children: String(e instanceof Error ? e.message : e)
        }), "error");
    } finally{
        n.disabled = !L.hasViewPermission();
    }
}
function $(e, t) {
    var n, i, r;
    let s = function(e) {
        let t = new Map();
        for (let n of j(e)){
            let i = `${n.kind}/${n.sectionId}`, r = t.get(i);
            if (!r) {
                let o = e[n.kind].find((e)=>e[".name"] === n.sectionId);
                if (!o) continue;
                r = {
                    kind: n.kind,
                    sectionId: n.sectionId,
                    row: o,
                    issues: []
                }, t.set(i, r);
            }
            r.issues.some((e)=>e.field === n.field && e.message === n.message) || r.issues.push(n);
        }
        return [
            ...t.values()
        ];
    }(w());
    L.ui.showModal(_("Review and repair configuration"), (r = {
        children: [
            a("p", {
                children: _("Each item below identifies a configuration problem. Choose Edit to keep the item and correct its fields, or delete it if it is no longer needed.")
            }),
            a("p", {
                children: _("A missing group means a device points to a deleted group. Edit the device and select an existing group. If no suitable group exists, close this dialog and create a group first.")
            }),
            a("p", {
                children: _("Repairs are staged in LuCI. Close this dialog, use Save & Apply, then run Check again to verify the applied configuration.")
            }),
            ...s.length ? s.map((n)=>{
                var i, r, s, l, d;
                return d = {
                    class: "cbi-section",
                    children: [
                        (r = {
                            children: [
                                O(n.kind),
                                ": ",
                                S(n.row),
                                " ",
                                (i = {
                                    children: a("code", {
                                        children: n.sectionId
                                    })
                                }, a("small", i))
                            ]
                        }, a("h4", r)),
                        (s = {
                            children: n.issues.map((e)=>{
                                var t, i, r;
                                return r = {
                                    children: [
                                        a("strong", {
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
                                        ].includes(e.field) && b(n.row[e.field]).length ? (i = {
                                            children: [
                                                " ",
                                                a("code", {
                                                    children: b(n.row[e.field]).join(", ")
                                                })
                                            ]
                                        }, a(o, i)) : null
                                    ]
                                }, a("li", r);
                            })
                        }, a("ul", s)),
                        a("button", {
                            class: "cbi-button cbi-button-action",
                            type: "button",
                            disabled: !L.hasViewPermission(),
                            onclick: (t)=>x(t, async ()=>{
                                    if (!L.hasViewPermission()) return;
                                    let t = C(e, n.kind);
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
                                var i, r, o;
                                L.ui.showModal(_("Delete this configuration?"), (o = {
                                    children: [
                                        (i = {
                                            children: [
                                                a("strong", {
                                                    children: [
                                                        O(n.kind),
                                                        ": ",
                                                        S(n.row)
                                                    ]
                                                }),
                                                " ",
                                                a("code", {
                                                    children: n.sectionId
                                                })
                                            ]
                                        }, a("p", i)),
                                        a("p", {
                                            children: "template" === n.kind ? _("This also deletes the template's SSIDs and networks. Templates used by groups cannot be deleted.") : "device" === n.kind ? _("This removes the device's FTTR configuration and stops managing it. It does not delete the physical device.") : _("This removes the selected configuration entry. Existing reference checks and binding cleanup still apply.")
                                        }),
                                        (r = {
                                            class: "right",
                                            children: [
                                                a("button", {
                                                    class: "cbi-button",
                                                    type: "button",
                                                    onclick: ()=>$(e, t),
                                                    children: _("Cancel")
                                                }),
                                                " ",
                                                a("button", {
                                                    class: "cbi-button cbi-button-negative",
                                                    type: "button",
                                                    disabled: !L.hasViewPermission(),
                                                    onclick: (i)=>x(i, async ()=>{
                                                            if (!L.hasViewPermission()) return;
                                                            let r = C(e, n.kind);
                                                            if (!r) throw Error(_("Configuration editor is unavailable."));
                                                            await r.handleRemove(n.sectionId, i), $(e, t);
                                                        }),
                                                    children: _("Delete this configuration")
                                                })
                                            ]
                                        }, a("div", r))
                                    ]
                                }, a("div", o)));
                            },
                            children: _("Delete this configuration")
                        }, a("button", l))
                    ]
                }, a("div", d);
            }) : [
                a("p", {
                    children: _("No problems were found by the local configuration checks. Use Check to see the backend result after Save & Apply.")
                })
            ],
            ...t ? [
                (n = {
                    children: [
                        a("summary", {
                            children: _("Last backend check result")
                        }),
                        a("pre", {
                            style: "white-space:pre-wrap;overflow-wrap:anywhere",
                            children: t
                        })
                    ]
                }, a("details", n))
            ] : [],
            (i = {
                class: "right",
                children: a("button", {
                    class: "cbi-button",
                    type: "button",
                    onclick: ()=>L.ui.hideModal(),
                    children: _("Close")
                })
            }, a("div", i))
        ]
    }, a("div", r)));
}
function V(e, t, n) {
    function i(n, i) {
        if (n._zod || Object.defineProperty(n, "_zod", {
            value: {
                def: i,
                constr: a,
                traits: new Set()
            },
            enumerable: !1
        }), n._zod.traits.has(e)) return;
        n._zod.traits.add(e), t(n, i);
        let r = a.prototype, o = Object.keys(r);
        for(let e = 0; e < o.length; e++){
            let t = o[e];
            t in n || (n[t] = r[t].bind(n));
        }
    }
    let r = n?.Parent ?? Object;
    class o extends r {
    }
    function a(e) {
        var t;
        let r = n?.Parent ? new o() : this;
        for (let n of (i(r, e), (t = r._zod).deferred ?? (t.deferred = []), r._zod.deferred))n();
        return r;
    }
    return Object.defineProperty(o, "name", {
        value: e
    }), Object.defineProperty(a, "init", {
        value: i
    }), Object.defineProperty(a, Symbol.hasInstance, {
        value: (t)=>!!n?.Parent && t instanceof n.Parent || t?._zod?.traits?.has(e)
    }), Object.defineProperty(a, "name", {
        value: e
    }), a;
}
Object.freeze({
    status: "aborted"
}), Symbol("zod_brand");
class I extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const D = {};
function M(e) {
    return e && Object.assign(D, e), D;
}
function R(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function W(e) {
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
function U(e) {
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const Z = Symbol("evaluating");
function q(e, t, n) {
    let i;
    Object.defineProperty(e, t, {
        get () {
            if (i !== Z) return void 0 === i && (i = Z, i = n()), i;
        },
        set (n) {
            Object.defineProperty(e, t, {
                value: n
            });
        },
        configurable: !0
    });
}
function H(e, t, n) {
    Object.defineProperty(e, t, {
        value: n,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
}
function F(...e) {
    let t = {};
    for (let n of e)Object.assign(t, Object.getOwnPropertyDescriptors(n));
    return Object.defineProperties({}, t);
}
const G = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function B(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function K(e) {
    if (!1 === B(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let n = t.prototype;
    return !1 !== B(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
}
const J = new Set([
    "string",
    "number",
    "symbol"
]);
function Q(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function X(e, t, n) {
    let i = new e._zod.constr(t ?? e._zod.def);
    return (!t || n?.parent) && (i._zod.parent = e), i;
}
function Y(e) {
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
function ee(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let n = t; n < e.issues.length; n++)if (e.issues[n]?.continue !== !0) return !0;
    return !1;
}
function et(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function en(e) {
    return "string" == typeof e ? e : e?.message;
}
function ei(e, t, n) {
    let i = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (i.message = en(e.inst?._zod.def?.error?.(e)) ?? en(t?.error?.(e)) ?? en(n.customError?.(e)) ?? en(n.localeError?.(e)) ?? "Invalid input"), delete i.inst, delete i.continue, t?.reportInput || delete i.input, i;
}
const er = (e, t)=>{
    e.name = "$ZodError", Object.defineProperty(e, "_zod", {
        value: e._zod,
        enumerable: !1
    }), Object.defineProperty(e, "issues", {
        value: t,
        enumerable: !1
    }), e.message = JSON.stringify(t, R, 2), Object.defineProperty(e, "toString", {
        value: ()=>e.message,
        enumerable: !1
    });
}, eo = V("$ZodError", er), ea = V("$ZodError", er, {
    Parent: Error
}), es = (t = ea, (e, n, i, r)=>{
    let o = i ? Object.assign(i, {
        async: !1
    }) : {
        async: !1
    }, a = e._zod.run({
        value: n,
        issues: []
    }, o);
    if (a instanceof Promise) throw new I();
    if (a.issues.length) {
        let e = new (r?.Err ?? t)(a.issues.map((e)=>ei(e, o, M())));
        throw G(e, r?.callee), e;
    }
    return a.value;
}), el = (n = ea, async (e, t, i, r)=>{
    let o = i ? Object.assign(i, {
        async: !0
    }) : {
        async: !0
    }, a = e._zod.run({
        value: t,
        issues: []
    }, o);
    if (a instanceof Promise && (a = await a), a.issues.length) {
        let e = new (r?.Err ?? n)(a.issues.map((e)=>ei(e, o, M())));
        throw G(e, r?.callee), e;
    }
    return a.value;
}), ed = (i = ea, (e, t, n)=>{
    let r = n ? {
        ...n,
        async: !1
    } : {
        async: !1
    }, o = e._zod.run({
        value: t,
        issues: []
    }, r);
    if (o instanceof Promise) throw new I();
    return o.issues.length ? {
        success: !1,
        error: new (i ?? eo)(o.issues.map((e)=>ei(e, r, M())))
    } : {
        success: !0,
        data: o.value
    };
}), ec = (r = ea, async (e, t, n)=>{
    let i = n ? Object.assign(n, {
        async: !0
    }) : {
        async: !0
    }, o = e._zod.run({
        value: t,
        issues: []
    }, i);
    return o instanceof Promise && (o = await o), o.issues.length ? {
        success: !1,
        error: new r(o.issues.map((e)=>ei(e, i, M())))
    } : {
        success: !0,
        data: o.value
    };
}), eu = /^-?\d+(?:\.\d+)?$/, ep = /^(?:true|false)$/i, em = /^null$/i, ef = {
    major: 4,
    minor: 3,
    patch: 6
}, e_ = V("$ZodType", (e, t)=>{
    var n;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = ef;
    let i = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && i.unshift(e), i))for (let n of t._zod.onattach)n(e);
    if (0 === i.length) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, n)=>{
            let i, r = ee(e);
            for (let o of t){
                if (o._zod.def.when) {
                    if (!o._zod.def.when(e)) continue;
                } else if (r) continue;
                let t = e.issues.length, a = o._zod.check(e);
                if (a instanceof Promise && n?.async === !1) throw new I();
                if (i || a instanceof Promise) i = (i ?? Promise.resolve()).then(async ()=>{
                    await a, e.issues.length !== t && (r || (r = ee(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    r || (r = ee(e, t));
                }
            }
            return i ? i.then(()=>e) : e;
        }, n = (n, r, o)=>{
            if (ee(n)) return n.aborted = !0, n;
            let a = t(r, i, o);
            if (a instanceof Promise) {
                if (!1 === o.async) throw new I();
                return a.then((t)=>e._zod.parse(t, o));
            }
            return e._zod.parse(a, o);
        };
        e._zod.run = (r, o)=>{
            if (o.skipChecks) return e._zod.parse(r, o);
            if ("backward" === o.direction) {
                let t = e._zod.parse({
                    value: r.value,
                    issues: []
                }, {
                    ...o,
                    skipChecks: !0
                });
                return t instanceof Promise ? t.then((e)=>n(e, r, o)) : n(t, r, o);
            }
            let a = e._zod.parse(r, o);
            if (a instanceof Promise) {
                if (!1 === o.async) throw new I();
                return a.then((e)=>t(e, i, o));
            }
            return t(a, i, o);
        };
    }
    q(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = ed(e, t);
                    return n.success ? {
                        value: n.data
                    } : {
                        issues: n.error?.issues
                    };
                } catch (n) {
                    return ec(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), eg = V("$ZodString", (e, t)=>{
    var n;
    let i;
    e_.init(e, t), e._zod.pattern = [
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
}), eh = V("$ZodNumber", (e, t)=>{
    e_.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? eu, e._zod.parse = (n, i)=>{
        if (t.coerce) try {
            n.value = Number(n.value);
        } catch (e) {}
        let r = n.value;
        if ("number" == typeof r && !Number.isNaN(r) && Number.isFinite(r)) return n;
        let o = "number" == typeof r ? Number.isNaN(r) ? "NaN" : Number.isFinite(r) ? void 0 : "Infinity" : void 0;
        return n.issues.push({
            expected: "number",
            code: "invalid_type",
            input: r,
            inst: e,
            ...o ? {
                received: o
            } : {}
        }), n;
    };
}), ev = V("$ZodBoolean", (e, t)=>{
    e_.init(e, t), e._zod.pattern = ep, e._zod.parse = (n, i)=>{
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
}), ey = V("$ZodNull", (e, t)=>{
    e_.init(e, t), e._zod.pattern = em, e._zod.values = new Set([
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
}), eb = V("$ZodNever", (e, t)=>{
    e_.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function ew(e, t, n) {
    e.issues.length && t.issues.push(...et(n, e.issues)), t.value[n] = e.value;
}
const eS = V("$ZodArray", (e, t)=>{
    e_.init(e, t), e._zod.parse = (n, i)=>{
        let r = n.value;
        if (!Array.isArray(r)) return n.issues.push({
            expected: "array",
            code: "invalid_type",
            input: r,
            inst: e
        }), n;
        n.value = Array(r.length);
        let o = [];
        for(let e = 0; e < r.length; e++){
            let a = r[e], s = t.element._zod.run({
                value: a,
                issues: []
            }, i);
            s instanceof Promise ? o.push(s.then((t)=>ew(t, n, e))) : ew(s, n, e);
        }
        return o.length ? Promise.all(o).then(()=>n) : n;
    };
});
function ez(e, t, n, i, r) {
    if (e.issues.length) {
        if (r && !(n in i)) return;
        t.issues.push(...et(n, e.issues));
    }
    void 0 === e.value ? n in i && (t.value[n] = void 0) : t.value[n] = e.value;
}
const eL = V("$ZodObject", (e, t)=>{
    let n;
    e_.init(e, t);
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
    let r = W(()=>(function(e) {
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
    q(e._zod, "propValues", ()=>{
        let e = t.shape, n = {};
        for(let t in e){
            let i = e[t]._zod;
            if (i.values) for (let e of (n[t] ?? (n[t] = new Set()), i.values))n[t].add(e);
        }
        return n;
    });
    let o = t.catchall;
    e._zod.parse = (t, i)=>{
        n ?? (n = r.value);
        let a = t.value;
        if (!B(a)) return t.issues.push({
            expected: "object",
            code: "invalid_type",
            input: a,
            inst: e
        }), t;
        t.value = {};
        let s = [], l = n.shape;
        for (let e of n.keys){
            let n = l[e], r = "optional" === n._zod.optout, o = n._zod.run({
                value: a[e],
                issues: []
            }, i);
            o instanceof Promise ? s.push(o.then((n)=>ez(n, t, e, a, r))) : ez(o, t, e, a, r);
        }
        return o ? function(e, t, n, i, r, o) {
            let a = [], s = r.keySet, l = r.catchall._zod, d = l.def.type, c = "optional" === l.optout;
            for(let r in t){
                if (s.has(r)) continue;
                if ("never" === d) {
                    a.push(r);
                    continue;
                }
                let o = l.run({
                    value: t[r],
                    issues: []
                }, i);
                o instanceof Promise ? e.push(o.then((e)=>ez(e, n, r, t, c))) : ez(o, n, r, t, c);
            }
            return (a.length && n.issues.push({
                code: "unrecognized_keys",
                keys: a,
                input: t,
                inst: o
            }), e.length) ? Promise.all(e).then(()=>n) : n;
        }(s, a, t, i, r.value, e) : s.length ? Promise.all(s).then(()=>t) : t;
    };
});
function ek(e, t, n, i) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let r = e.filter((e)=>!ee(e));
    return 1 === r.length ? (t.value = r[0].value, r[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>ei(e, i, M())))
    }), t);
}
const eP = V("$ZodUnion", (e, t)=>{
    e_.init(e, t), q(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), q(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), q(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), q(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>U(e.source)).join("|")})$`);
        }
    });
    let n = 1 === t.options.length, i = t.options[0]._zod.run;
    e._zod.parse = (r, o)=>{
        if (n) return i(r, o);
        let a = !1, s = [];
        for (let e of t.options){
            let t = e._zod.run({
                value: r.value,
                issues: []
            }, o);
            if (t instanceof Promise) s.push(t), a = !0;
            else {
                if (0 === t.issues.length) return t;
                s.push(t);
            }
        }
        return a ? Promise.all(s).then((t)=>ek(t, r, e, o)) : ek(s, r, e, o);
    };
}), eT = V("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, eP.init(e, t);
    let n = e._zod.parse;
    q(e._zod, "propValues", ()=>{
        let e = {};
        for (let n of t.options){
            let i = n._zod.propValues;
            if (!i || 0 === Object.keys(i).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
            for (let [t, n] of Object.entries(i))for (let i of (e[t] || (e[t] = new Set()), n))e[t].add(i);
        }
        return e;
    });
    let i = W(()=>{
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
    e._zod.parse = (r, o)=>{
        let a = r.value;
        if (!B(a)) return r.issues.push({
            code: "invalid_type",
            expected: "object",
            input: a,
            inst: e
        }), r;
        let s = i.value.get(a?.[t.discriminator]);
        return s ? s._zod.run(r, o) : t.unionFallback ? n(r, o) : (r.issues.push({
            code: "invalid_union",
            errors: [],
            note: "No matching discriminator",
            discriminator: t.discriminator,
            input: a,
            path: [
                t.discriminator
            ],
            inst: e
        }), r);
    };
}), eA = V("$ZodRecord", (e, t)=>{
    e_.init(e, t), e._zod.parse = (n, i)=>{
        let r = n.value;
        if (!K(r)) return n.issues.push({
            expected: "record",
            code: "invalid_type",
            input: r,
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
                    value: r[e],
                    issues: []
                }, i);
                a instanceof Promise ? o.push(a.then((t)=>{
                    t.issues.length && n.issues.push(...et(e, t.issues)), n.value[e] = t.value;
                })) : (a.issues.length && n.issues.push(...et(e, a.issues)), n.value[e] = a.value);
            }
            for(let e in r)l.has(e) || (s = s ?? []).push(e);
            s && s.length > 0 && n.issues.push({
                code: "unrecognized_keys",
                input: r,
                inst: e,
                keys: s
            });
        } else for (let a of (n.value = {}, Reflect.ownKeys(r))){
            if ("__proto__" === a) continue;
            let s = t.keyType._zod.run({
                value: a,
                issues: []
            }, i);
            if (s instanceof Promise) throw Error("Async schemas not supported in object keys currently");
            if ("string" == typeof a && eu.test(a) && s.issues.length) {
                let e = t.keyType._zod.run({
                    value: Number(a),
                    issues: []
                }, i);
                if (e instanceof Promise) throw Error("Async schemas not supported in object keys currently");
                0 === e.issues.length && (s = e);
            }
            if (s.issues.length) {
                "loose" === t.mode ? n.value[a] = r[a] : n.issues.push({
                    code: "invalid_key",
                    origin: "record",
                    issues: s.issues.map((e)=>ei(e, i, M())),
                    input: a,
                    path: [
                        a
                    ],
                    inst: e
                });
                continue;
            }
            let l = t.valueType._zod.run({
                value: r[a],
                issues: []
            }, i);
            l instanceof Promise ? o.push(l.then((e)=>{
                e.issues.length && n.issues.push(...et(a, e.issues)), n.value[s.value] = e.value;
            })) : (l.issues.length && n.issues.push(...et(a, l.issues)), n.value[s.value] = l.value);
        }
        return o.length ? Promise.all(o).then(()=>n) : n;
    };
}), eN = V("$ZodEnum", (e, t)=>{
    var n;
    let i;
    e_.init(e, t);
    let r = (i = Object.values(n = t.entries).filter((e)=>"number" == typeof e), Object.entries(n).filter(([e, t])=>-1 === i.indexOf(+e)).map(([e, t])=>t)), o = new Set(r);
    e._zod.values = o, e._zod.pattern = RegExp(`^(${r.filter((e)=>J.has(typeof e)).map((e)=>"string" == typeof e ? Q(e) : e.toString()).join("|")})$`), e._zod.parse = (t, n)=>{
        let i = t.value;
        return o.has(i) || t.issues.push({
            code: "invalid_value",
            values: r,
            input: i,
            inst: e
        }), t;
    };
}), ej = V("$ZodLiteral", (e, t)=>{
    if (e_.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? Q(e) : e ? Q(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (i, r)=>{
        let o = i.value;
        return n.has(o) || i.issues.push({
            code: "invalid_value",
            values: t.values,
            input: o,
            inst: e
        }), i;
    };
});
function eC(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const eE = V("$ZodOptional", (e, t)=>{
    e_.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", q(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), q(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${U(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let i = t.innerType._zod.run(e, n);
            return i instanceof Promise ? i.then((t)=>eC(t, e.value)) : eC(i, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, n);
    };
}), eO = V("$ZodNullable", (e, t)=>{
    e_.init(e, t), q(e._zod, "optin", ()=>t.innerType._zod.optin), q(e._zod, "optout", ()=>t.innerType._zod.optout), q(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${U(e.source)}|null)$`) : void 0;
    }), q(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), ex = V("$ZodCatch", (e, t)=>{
    e_.init(e, t), q(e._zod, "optin", ()=>t.innerType._zod.optin), q(e._zod, "optout", ()=>t.innerType._zod.optout), q(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, n)=>{
        if ("backward" === n.direction) return t.innerType._zod.run(e, n);
        let i = t.innerType._zod.run(e, n);
        return i instanceof Promise ? i.then((i)=>(e.value = i.value, i.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: i.issues.map((e)=>ei(e, n, M()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = i.value, i.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: i.issues.map((e)=>ei(e, n, M()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), e$ = V("$ZodLazy", (e, t)=>{
    e_.init(e, t), q(e._zod, "innerType", ()=>t.getter()), q(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), q(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), q(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), q(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n)=>e._zod.innerType._zod.run(t, n);
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
const eV = V("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    e_.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>es(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>ed(e, t, n), e.parseAsync = async (t, n)=>el(e, t, n, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, n)=>ec(e, t, n), e.check = (...n)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, n)=>X(e, t, n), e.brand = ()=>e, e.register = (t, n)=>(t.add(e, n), e), e.apply = (t)=>t(e);
}), eI = V("ZodMiniString", (e, t)=>{
    eg.init(e, t), eV.init(e, t);
});
function eD(e) {
    return new eI({
        type: "string",
        ...Y(e)
    });
}
const eM = V("ZodMiniNumber", (e, t)=>{
    eh.init(e, t), eV.init(e, t);
});
function eR(e) {
    return new eM({
        type: "number",
        checks: [],
        ...Y(e)
    });
}
const eW = V("ZodMiniBoolean", (e, t)=>{
    ev.init(e, t), eV.init(e, t);
});
function eU(e) {
    return new eW({
        type: "boolean",
        ...Y(e)
    });
}
const eZ = V("ZodMiniNull", (e, t)=>{
    ey.init(e, t), eV.init(e, t);
}), eq = V("ZodMiniNever", (e, t)=>{
    eb.init(e, t), eV.init(e, t);
});
function eH(e) {
    return new eq({
        type: "never",
        ...Y(e)
    });
}
const eF = V("ZodMiniArray", (e, t)=>{
    eS.init(e, t), eV.init(e, t);
});
function eG(e, t) {
    return new eF({
        type: "array",
        element: e,
        ...Y(t)
    });
}
const eB = V("ZodMiniObject", (e, t)=>{
    eL.init(e, t), eV.init(e, t), q(e, "shape", ()=>t.shape);
});
function eK(e, t) {
    return new eB({
        type: "object",
        shape: e ?? {},
        ...Y(t)
    });
}
const eJ = V("ZodMiniUnion", (e, t)=>{
    eP.init(e, t), eV.init(e, t);
});
function eQ(e, t) {
    return new eJ({
        type: "union",
        options: e,
        ...Y(t)
    });
}
const eX = V("ZodMiniDiscriminatedUnion", (e, t)=>{
    eT.init(e, t), eV.init(e, t);
});
function eY(e, t, n) {
    return new eX({
        type: "union",
        options: t,
        discriminator: e,
        ...Y(n)
    });
}
const e0 = V("ZodMiniRecord", (e, t)=>{
    eA.init(e, t), eV.init(e, t);
});
function e1(e, t, n) {
    return new e0({
        type: "record",
        keyType: e,
        valueType: t,
        ...Y(n)
    });
}
const e2 = V("ZodMiniEnum", (e, t)=>{
    eN.init(e, t), eV.init(e, t), e.options = Object.values(t.entries);
});
function e4(e, t) {
    return new e2({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...Y(t)
    });
}
const e5 = V("ZodMiniLiteral", (e, t)=>{
    ej.init(e, t), eV.init(e, t);
});
function e3(e, t) {
    return new e5({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...Y(t)
    });
}
const e6 = V("ZodMiniOptional", (e, t)=>{
    eE.init(e, t), eV.init(e, t);
});
function e7(e) {
    return new e6({
        type: "optional",
        innerType: e
    });
}
const e9 = V("ZodMiniNullable", (e, t)=>{
    eO.init(e, t), eV.init(e, t);
});
function e8(e) {
    return new e9({
        type: "nullable",
        innerType: e
    });
}
const te = V("ZodMiniCatch", (e, t)=>{
    ex.init(e, t), eV.init(e, t);
}), tt = V("ZodMiniLazy", (e, t)=>{
    e$.init(e, t), eV.init(e, t);
});
function tn() {
    let e = new tt({
        type: "lazy",
        getter: ()=>eQ([
                eD(),
                eR(),
                eU(),
                new eZ({
                    type: "null",
                    ...Y(void 0)
                }),
                eG(e),
                e1(eD(), e)
            ])
    });
    return e;
}
let ti = eK({
    error: eQ([
        eD(),
        eK({
            code: eD(),
            message: eD()
        })
    ])
});
class tr extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function to(e) {
    let t = ti.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new tr("rpc", e) : new tr(e.code, e.message);
    }
    return e;
}
eK({
    status: e3("pending"),
    job: eD()
}), eY("status", [
    eK({
        status: e3("pending")
    }),
    eK({
        status: e3("ready"),
        chunk: eR(),
        chunks: eR(),
        bytes: eR(),
        data: eD()
    })
]);
let ta = eD(), ts = eR(), tl = eU(), td = e7(ta), tc = e7(ts), tu = e7(tl);
const tp = e4([
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
]), tm = e4([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), tf = eK({
    id: ta,
    name: e7(e8(ta)),
    kind: e4([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: ta,
    state: ta,
    reason: td,
    revision: td,
    current_revision: tu,
    management_fresh: tu,
    operation_id: tc,
    task_id: e7(e8(ts)),
    updated_at: tc,
    changes: e7(eG(eK({
        name: ta,
        desired: ta
    })))
});
let t_ = eK({
    state: ta,
    reason: td,
    task_id: e7(e8(ts)),
    instance: tc
});
const tg = eK({
    cwmp_id: ta,
    state: e4([
        "online",
        "waiting_inform",
        "offline_or_stale",
        "waiting_transport"
    ]),
    optical_online: tl,
    last_inform: e8(ts),
    age_seconds: e8(ts)
});
let th = eK({
    state: e4([
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
    method: td,
    reason: td,
    mqtt_target: e8(ta),
    binding_source: td,
    link_identity_error: e8(ta),
    mqtt_last_seen: e8(ts),
    cwmp_id: td,
    desired_version: td,
    generation: tc,
    inflight: tu,
    attempts: tc,
    next_retry_at: tc,
    updated_at: tc,
    settings_verified_at: e8(ts),
    last_inform: e8(ts),
    last_error: e7(e8(ta)),
    persistence_error: e7(e8(ta)),
    desired: e7(e8(eK({
        vlan: ts,
        vlans: eG(ts),
        priority: ts,
        acs_url: ta
    }))),
    listener: e7(eK({
        enabled: tl,
        listen: ta,
        path: ta,
        error: e8(ta)
    })),
    endpoint_notice: td,
    manual_steps: e7(eG(ta))
});
const tv = eY("state", [
    th,
    function(e, t) {
        if (!K(t)) throw Error("Invalid input to extend: expected a plain object");
        let n = e._zod.def.checks;
        if (n && n.length > 0) {
            let n = e._zod.def.shape;
            for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(n, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let i = F(e._zod.def, {
            get shape () {
                let n = {
                    ...e._zod.def.shape,
                    ...t
                };
                return H(this, "shape", n), n;
            }
        });
        return X(e, i);
    }(function(e) {
        var t = void 0;
        let n = e._zod.def.checks;
        if (n && n.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let i = F(e._zod.def, {
            get shape () {
                let n = e._zod.def.shape, i = {
                    ...n
                };
                if (t) for(let e in t){
                    if (!(e in n)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (i[e] = e6 ? new e6({
                        type: "optional",
                        innerType: n[e]
                    }) : n[e]);
                }
                else for(let e in n)i[e] = e6 ? new e6({
                    type: "optional",
                    innerType: n[e]
                }) : n[e];
                return H(this, "shape", i), i;
            },
            checks: []
        });
        return X(e, i);
    }(th), {
        state: e4([
            "pending",
            "unavailable"
        ]),
        reason: ta
    })
]), ty = eK({
    backend: e7(eK({
        configured: ta,
        effective: ta,
        available: eG(ta),
        reason: ta
    })),
    state: tp,
    operation_id: tc,
    device: td,
    optical_sn: td,
    cwmp_id: td,
    revision: td,
    mode: e7(e4([
        "apply",
        "plan"
    ])),
    started_at: tc,
    current_revision: tu,
    management_fresh: tu,
    reason: td,
    error: td,
    attempts: tc,
    next_retry_at: tc,
    reconcile_reason: td,
    items: eG(tf),
    cwmp_contract: e7(eK({
        state: ta,
        requested: ta,
        contract: e8(ta),
        reason: ta,
        cache_hit: tl,
        schema: ta,
        capabilities: e8(eK({
            wan: ta,
            wlan: ta,
            binding: ta
        }))
    })),
    wan_objects: e7(e1(ta, tn())),
    wan_lifecycle: e7(e1(ta, t_)),
    wan_stage: e7(e4([
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
    wifi_objects: e7(eK({
        owned: eG(ts),
        pending: e8(ta),
        pending_instance: e8(ts)
    })),
    wifi_lifecycle: e7(e1(ta, t_)),
    wifi_stage: e7(e4([
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
    wifi_cleanup: e7(e4([
        "disable",
        "preserve",
        "delete"
    ]))
});
let tb = eK({
    enabled: tl,
    mode: e4([
        "auto",
        "manual"
    ]),
    vlan: eG(ts),
    priority: ts,
    address: ta,
    acs_url: ta,
    port: ts,
    path: ta,
    dhcp_enabled: tl
}), tw = eK({
    state: e4([
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
    error: e8(ta),
    inflight: tl,
    ready: tl,
    desired_version: e8(ta),
    applied_version: e8(ta),
    next_retry_at: ts,
    attempts: ts,
    desired: e8(tb),
    applied: e8(tb),
    previous: e8(tb),
    plan: eG(eK({
        operation: ta,
        key: ta,
        value: eG(ta)
    }))
});
const tS = eK({
    device: ta,
    name: e8(ta),
    group: e8(ta),
    group_name: e8(ta),
    template: e8(ta),
    template_name: e8(ta),
    optical_sn: ta,
    adapter: ta,
    omci_management: eK({
        state: ta,
        reason: e7(e8(ta))
    }),
    management: e8(tg),
    acs_bootstrap: tv,
    provisioning: ty,
    services: eG(tf),
    ssids: eG(tf),
    wifi_sync: tm
}), tz = eK({
    enabled: tl,
    mode: e4([
        "auto",
        "manual"
    ]),
    method: e3("diff"),
    revision: ta,
    triggers: eG(ta),
    interval_minutes: new eM({
        type: "number",
        coerce: !0,
        checks: [],
        ...Y(void 0)
    }),
    error: e8(ta),
    devices: eG(tS),
    management_network: tw,
    omci_management: tn(),
    groups: eG(eK({
        id: ta,
        name: e8(ta),
        template: ta
    })),
    pending_devices: eG(ta)
}), tL = eQ([
    eK({
        valid: e3(!0),
        revision: ta,
        devices: ts,
        error: e7(eH())
    }),
    eK({
        error: ta,
        valid: e7(eH()),
        revision: e7(eH()),
        devices: e7(eH())
    })
]);
let tk = eD(), tP = eR(), tT = e8(tP), tA = e1(tk, eK({
    source: tk,
    unit: tk,
    reason: e8(tk),
    raw: e8(tk),
    age_seconds: tT
}));
const tN = eK({
    phase: e4([
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
    generation: tP,
    error: e8(tk)
}), tj = e4([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tC = eK({
    model: tk,
    wavelength_tx_nm: tP,
    wavelength_rx_nm: tP,
    phy_rate_downlink_gbps: tP,
    phy_rate_uplink_gbps: tP,
    tx_power_dbm: tT,
    laser_bias_current_ma: tT,
    temperature_celsius: tT,
    vcc_voltage: tT,
    cdr_locked: e8(eU()),
    tx_enabled: e8(eU()),
    measurements: tA
}), tE = eK({
    equipment_id: e8(tk),
    hardware_version: e8(tk),
    software_images: eG(tk),
    omcc_version: tT,
    errors: eG(tk)
});
const tO = eK({
    onu_id: tP,
    vendor: tk,
    model: tk,
    serial_number: tk,
    state: tj,
    business_status: tN,
    management: e8(tg),
    provisioning: e8(ty),
    services: eG(tf),
    ssids: eG(tf),
    wifi_sync: tm,
    acs_bootstrap: e7(tv),
    identity: e8(tE),
    identity_age_seconds: tT,
    identity_current: eU(),
    fiber_distance_m: tT,
    ranging_delay_rtd_ns: tT,
    equalization_delay_bits: new te({
        type: "catch",
        innerType: tT,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tT,
    optical_tx_power_dbm: tT,
    firmware_version: tk,
    hardware_version: tk,
    uptime_seconds: tT,
    data_path: eK({
        interface: tk,
        gem_ports: e8(eG(tP)),
        vlan_id: tT,
        tx_bytes: tT,
        rx_bytes: tT,
        current_tx_kbps: tT,
        current_rx_kbps: tT,
        measurements: tA
    }),
    wifi_mesh: eK({
        channel_2g: tT,
        channel_5g: tT,
        bandwidth_5g: e8(tk),
        tx_power_pct: tT,
        measurements: tA
    }),
    connected_clients: e8(eG(eK({
        mac: tk,
        ip: tk,
        band: tk,
        rssi_dbm: tT,
        rx_rate_mbps: tT,
        tx_rate_mbps: tT
    }))),
    measurements: tA
});
let tx = eK({
    reserved_sn: e7(tk),
    port: tP,
    interface: tk,
    carrier: eU(),
    status: tk,
    onu_id: e7(tP),
    onu_sn: e7(tk),
    link_state: tk
});
const t$ = eK({
    onu_pinning: e7(eK({
        desired: e1(tk, tP),
        active: e1(tk, tP),
        pending_restart: eU(),
        allocation_blocked: eU(),
        startup_error: e8(tk),
        config_error: e8(tk)
    })),
    fpga_status: tk,
    provisioning: e8(tz),
    optical_transceiver: tC,
    switch_ports: eG(tx),
    sub_gateways: eG(tO),
    telemetry_gateways: eG(eK({
        id: tk,
        last_seen_sec_ago: tP,
        last_payload_bytes: tP
    }))
});
e1(tk, eK({
    carrier: e7(eU()),
    mac: e7(tk),
    link: e7(eK({
        speed: e7(tP),
        duplex: e7(tk),
        autoneg: e7(eU())
    })),
    stats: e7(e1(tk, tP))
})), _("Not started"), _("Collecting identity"), _("Retrying identity"), _("Unsupported"), _("Configuring"), _("Verifying"), _("WAN pending"), _("Verified"), _("Retrying"), _("Offline");
let tV = L.rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: !0
}), tI = (L.rpc.declare({
    object: "luci.fttr",
    method: "get_sync",
    reject: !0
}), L.rpc.declare({
    object: "luci.fttr",
    method: "config_check",
    reject: !0
})), tD = L.rpc.declare({
    object: "luci.fttr",
    method: "config_reload",
    reject: !0
}), tM = L.rpc.declare({
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
const tR = async ()=>t$.parse(to(await tV())), tW = async ()=>tL.parse(await tI()), tU = async ()=>tz.parse(to(await tD())), tZ = async ()=>eK({
        restarting: e3(!0)
    }).parse(to(await tM()));
eK({
    schema_version: e3(1),
    status: e4([
        "success",
        "error"
    ]),
    action: e4([
        "optical_on",
        "optical_off",
        "optical_status",
        "optical_reload",
        "optical_reinitialize",
        "optical_shutdown"
    ]),
    desired_enabled: e8(eU()),
    tx_enabled: e8(eU()),
    actor_state: e4([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: eU(),
    discovery_active: eU(),
    cleanup_pending: eU(),
    error: e8(eK({
        code: eD(),
        message: eD()
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
}), eQ([
    eK({
        operation_ids: eG(eR()),
        revision: eD()
    }),
    eK({
        started: e3(!0),
        mode: e4([
            "apply",
            "plan"
        ])
    }),
    eK({
        reset: e3(!0),
        device: eD()
    }),
    eK({
        operation_ids: eG(eR()),
        mode: e4([
            "apply",
            "plan"
        ]),
        reconcile: e7(eU()),
        retry: e7(eU())
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
}), eK({
    source: e4([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: eD(),
    size: eR(),
    sha256: eD(),
    data: e7(eD()),
    factory: eK({
        detected: eU(),
        device: eD(),
        has_data: eU(),
        sha256: eD(),
        data: eD()
    }),
    firmware: eK({
        exists: eU(),
        path: eD(),
        size: eR(),
        sha256: eD(),
        data: eD()
    }),
    error: e7(eD())
}), eK({
    success: eU(),
    path: eD(),
    size: eR(),
    sha256: eD(),
    error: e7(eD())
}), eK({
    success: eU(),
    output: e7(eD()),
    error: e7(eD())
});
let tq = eK({
    schema_version: e3(1),
    version: eD(),
    features: eK({
        acs: eU(),
        mqtt: eU(),
        "device-hl202": eU(),
        "device-hwtc": eU()
    }),
    functions: eK({
        optical: eU(),
        omci_mib: eU(),
        mqtt_telemetry: eU(),
        hl202_management: eU(),
        cwmp: eU()
    }),
    pages: eK({
        status: eU(),
        config: eU(),
        sync: eU(),
        hl202: eU(),
        hardware: eU(),
        calibration: eU(),
        about: eU()
    })
}), tH = L.rpc.declare({
    object: "luci.fttr",
    method: "get_capabilities",
    reject: !0
});
const tF = async ()=>tq.parse(to(await tH()));
async function tG(e) {
    if (!(await tF()).pages[e]) throw Error(_("This page is not supported by the installed FTTR build."));
}
let tB = L.view, tK = L.uci, tJ = L.form;
async function tQ(e, t, n) {
    try {
        let i = await e();
        t.textContent = JSON.stringify(i, null, 2), n?.(i);
    } catch (e) {
        t.textContent = String(e), n?.({
            error: String(e)
        });
    }
}
let main = tB.extend({
    async load () {
        await tG("config"), await tK.load("fttr"), tK.sections("fttr", "provisioning").length || tK.add("fttr", "provisioning", "provisioning"), tK.sections("fttr", "management").length || tK.add("fttr", "management", "management");
        let [e, t] = await Promise.all([
            tW().catch((e)=>({
                    error: String(e)
                })),
            tR().catch((e)=>({
                    error: String(e),
                    sub_gateways: []
                }))
        ]);
        return {
            error: e.error || ("error" in t ? t.error : void 0),
            connectedDevices: t.sub_gateways,
            pinning: "onu_pinning" in t ? t.onu_pinning : void 0
        };
    },
    render (e) {
        var t, n, i, r;
        let o, C, O, x = new tJ.Map("fttr", _("FTTR configuration")), V = x.section(tJ.NamedSection, "acs", "acs");
        V.addremove = !1, V.anonymous = !1;
        let I = tK.sections("fttr", "provisioning")[0]?.[".name"] ?? "provisioning";
        (function(e, t, n) {
            e.tab("basic", t);
            let i = e.taboption("basic", L.form.SectionValue, "_acs", L.form.NamedSection, "acs", "acs").subsection;
            i.addremove = !1, i.anonymous = !1;
            let r = l(i, L.form.Flag, "enabled", _("Enable ACS"));
            r.default = "1", r.rmempty = !1, (r = l(i, L.form.Value, "port", _("Listen port"), "port")).default = "7547", r.rmempty = !1, (r = l(i, L.form.Value, "path", _("CWMP path"))).default = "/cwmp", r.rmempty = !1, r.validate = (e, t)=>!!t.startsWith("/") || _("The path must start with '/'."), (r = l(i, L.form.Value, "state_file", _("ACS state file"))).default = "/var/lib/fttr/acs-state.json", r.rmempty = !1, r.validate = (e, t)=>!!t.startsWith("/") || _("The state file path must be absolute."), (r = l(i, L.form.Value, "username", _("HTTP Basic username"))).optional = !0, r.rmempty = !0, (r = l(i, L.form.Value, "password", _("HTTP Basic password"))).password = !0, r.optional = !0, r.rmempty = !0;
            let o = e.taboption("basic", L.form.SectionValue, "_management", L.form.NamedSection, "management", "management").subsection;
            o.addremove = !1, (r = l(o, L.form.Flag, "enabled", _("Enable management network"))).default = "1", r.rmempty = !1, (r = c(o, "mode", _("Management application mode"), [
                [
                    "manual",
                    _("Manual")
                ],
                [
                    "auto",
                    _("Automatic")
                ]
            ])).default = "auto", r.rmempty = !1, r.description = _("Manual mode only discovers and plans. Use Apply management configuration on the Synchronization page to create or update the isolated network, ACS listener and child TR069 settings."), (r = l(o, L.form.Value, "address", _("Management IPv4 address/prefix"), "cidr4")).default = "192.168.46.1/24", r.rmempty = !1, r.description = _("The local ACS binds to this address. The child ACS URL is generated from this address, the ACS port and CWMP path."), (r = l(o, L.form.DummyValue, "_generated_acs_url", _("Generated ACS URL"))).cfgvalue = ()=>{
                let t = e.map.data, n = String(t.get("fttr", "management", "address") || "192.168.46.1/24").split("/")[0];
                return `http://${n}:${t.get("fttr", "acs", "port") || "7547"}${t.get("fttr", "acs", "path") || "/cwmp"}`;
            }, (r = l(o, L.form.DynamicList, "vlan", _("TR069 VLANs"), "range(1,4094)")).default = [
                "46"
            ], r.rmempty = !1, r.description = _("All listed VLANs share one management bridge and DHCP pool. Retain an existing listed management VLAN; the first VLAN is the fallback."), r.validate = (e, t)=>!!("" === t || /^\d+$/.test(t) && Number(t) >= 1 && 4094 >= Number(t)) || _("Enter a VLAN ID in 1\u20134094.");
            let a = r.parse;
            for (let [e, t, n] of (r.parse = function(e) {
                let t = this.formvalue(e) || [];
                return t.length ? new Set(t.map(Number)).size !== t.length ? Promise.reject(Error(_("Duplicate VLAN IDs are not allowed."))) : a.call(this, e) : Promise.reject(Error(_("Enter at least one VLAN ID in 1\u20134094.")));
            }, (r = l(o, L.form.Value, "priority", _("Priority"), "range(0,7)")).default = "0", r.rmempty = !1, (r = l(o, L.form.Flag, "dhcp_enabled", _("Enable management DHCP"))).default = "1", r.rmempty = !1, [
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
            ]))(r = l(o, L.form.Value, e, t)).default = n, r.rmempty = !1, r.depends("dhcp_enabled", "1");
            let s = e.taboption("basic", L.form.SectionValue, "_policy", L.form.NamedSection, n, "provisioning").subsection;
            for (let [e, t] of (s.addremove = !1, s.anonymous = !1, (r = l(s, L.form.Flag, "enabled", _("Enable provisioning"))).default = "1", r.rmempty = !1, (r = l(s, L.form.Flag, "allow_unsupported_as_bridge", _("Allow unsupported ONUs as bridge"))).default = "0", r.rmempty = !1, r.description = _("Automatically provision standard G.988 transparent Layer 2 bridge for unrecognized or third-party GPON ONUs in O5 state."), (r = c(s, "mode", _("Synchronization mode"), [
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
        })(V, _("Basic"), I), t = e.connectedDevices ?? [], n = e.pinning, o = new Map(t.map((e)=>[
                e.serial_number,
                e
            ])), C = (e)=>{
            let t = o.get(e), n = L.uci.sections("fttr", "device").find((t)=>t.optical_sn === e), i = t?.model || String(n?.adapter || _("Unknown model"));
            return `${i} \xb7 ${e} \xb7 ${t?.state === "o5_operation" ? _("Connected") : _("Offline")}${t?.onu_id != null ? ` \xb7 ONU ${t.onu_id}` : ""}`;
        }, V.tab("devices", _("Devices & groups")), v(f(V, "devices", "_groups", "group", _("Groups"), (e)=>{
            g(e, "_name", _("Group"), (e)=>String(L.uci.get("fttr", e, "name") || e)), l(e, L.form.Value, "name", _("Name")).modalonly = !0, p(e, "template", _("Template"), "template").modalonly = !0;
        }), P), f(V, "devices", "_devices", "device", _("Devices"), (e)=>{
            g(e, "_device", _("Device"), (e)=>{
                let t = String(L.uci.get("fttr", e, "optical_sn") || "");
                return t ? C(t) : _("New device");
            }), g(e, "_active_pin", _("Active allocation"), (e)=>{
                let i = String(L.uci.get("fttr", e, "optical_sn") || ""), r = n?.active[i.toUpperCase()], o = t.find((e)=>e.serial_number.toUpperCase() === i.toUpperCase())?.onu_id, a = L.uci.get("fttr", e, "onu_id"), s = (null == a || "" === a ? void 0 : Number(a)) !== r;
                return [
                    null != o ? `fttr${o + 1}` : _("Not registered"),
                    null != r ? `${_("Reserved")}: fttr${r + 1}` : _("Automatic allocation"),
                    s ? _("Pending restart") : ""
                ].filter(Boolean).join(" \xb7 ");
            }), e.tab("general", _("General Settings")), e.tab("cwmp", _("CWMP Settings")), e.tab("advanced", _("Advanced Settings"));
            let i = d(e, "general", L.form.ListValue, "optical_sn", _("Connected device"));
            i.modalonly = !0, i.rmempty = !1, i.description = _("Lists supported devices registered on the optical link, including devices that have not sent an ACS Inform. Devices already configured are omitted when adding a new device.");
            let r = i.renderWidget;
            i.renderWidget = function(e, n, i) {
                this.keylist = [], this.vallist = [];
                let o = String(L.uci.get("fttr", e, "optical_sn") || ""), a = new Set(L.uci.sections("fttr", "device").filter((t)=>t[".name"] !== e).map((e)=>e.optical_sn));
                for (let e of t)"o5_operation" === e.state && A(e) && !a.has(e.serial_number) && this.value(e.serial_number, C(e.serial_number));
                o && !this.keylist.includes(o) && this.value(o, C(o));
                let s = i || o || this.keylist[0] || "";
                return r.call(this, e, n, s);
            }, i.validate = (e, t)=>t ? !L.uci.sections("fttr", "device").some((n)=>n[".name"] !== e && n.optical_sn === t) || _("Device already configured.") : _("Select device."), i.write = (e, t)=>{
                L.uci.set("fttr", e, "optical_sn", t);
                let n = A(o.get(t));
                n && !L.uci.get("fttr", e, "adapter") && L.uci.set("fttr", e, "adapter", n);
            };
            let l = u(e, "general", "adapter", _("Device adapter"), [
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
            l.modalonly = !0, l.default = "generic", l.rmempty = !1;
            let c = u(e, "general", "provisioning_method", _("Provisioning method"), [
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
            c.modalonly = !0, c.retain = !0, c.depends("adapter", "hl202"), c.description = _("HL202 defaults to native command provisioning with readback verification. Builds without MQTT use ACS. Transport failures require reconciliation and do not switch to ACS automatically."), function(e, t, n, i, r) {
                let o = arguments.length > 5 && void 0 !== arguments[5] && arguments[5], a = d(e, t, s.RichListValue, n, i);
                return a.rmempty = o, a.optional = o, a.default = "", m(a, ()=>[
                        ...o ? [
                            [
                                "",
                                _("None")
                            ]
                        ] : [],
                        ...L.uci.sections("fttr", r).map((e)=>[
                                e[".name"],
                                String(e.name || e.ssid || e.optical_sn || e[".name"])
                            ])
                    ]), a.validate = (e, t)=>!!(o && !t || L.uci.sections("fttr", r).some((e)=>e[".name"] === t)) || _("Select an existing item."), a;
            }(e, "general", "group", _("Group"), "group").modalonly = !0;
            let p = u(e, "general", "onu_id", _("Fixed interface"), [
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
            p.modalonly = !0, p.description = _("Reserves this interface by optical serial number, even while offline. Changes take effect after restarting FTTR; Reload does not move registered devices.");
            let f = e.taboption("general", L.form.Button, "_pin_current", _("Use current interface"));
            f.modalonly = !0, f.inputtitle = _("Pin current interface"), f.inputstyle = "apply", f.onclick = (e, n)=>{
                let r = String(i.formvalue(n) ?? L.uci.get("fttr", n, "optical_sn") ?? ""), o = t.find((e)=>e.serial_number.toUpperCase() === r.toUpperCase());
                o?.state !== "o5_operation" || null == o.onu_id ? L.ui.addNotification(null, a("p", {
                    children: _("Select a registered O5 device first.")
                }), "warning") : p.getUIElement(n)?.setValue(String(o.onu_id));
            }, p.validate = (e, t)=>!t || (/^(?:[0-9]|1[0-5])$/.test(t) ? !L.uci.sections("fttr", "device").some((n)=>{
                    if (n[".name"] === e) return !1;
                    let i = p.formvalue(n[".name"]) ?? n.onu_id;
                    return null != i && String(i) === t;
                }) || _("Interface already reserved by another device.") : _("Select an interface from fttr1 to fttr16."));
            let h = u(e, "cwmp", "cwmp_contract", _("CWMP contract"), [
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
            h.modalonly = !0, h.default = "auto", h.rmempty = !1, h.description = _("Independent of the optical adapter. Parameter paths, types and writable evidence are discovered before synchronization. Unverified candidates do not authorize writes.");
            let v = d(e, "cwmp", L.form.Flag, "connection_request", _("Supports Connection Request"));
            v.modalonly = !0, v.default = "1", v.rmempty = !1, v.description = _("Independent per device; enabled by default for all adapters. Enabled: on-demand sessions with periodic Inform enabled and an interval of at most 12 hours (backend default: 43200 seconds). Disabled: manually set PeriodicInformEnable to true and PeriodicInformInterval to at most 180 seconds; no interval is written automatically. Requires reachable CWMP, verified standard parameters, HTTP Digest support, a prior Inform with a ConnectionRequestURL and valid CPE credentials. Firmware support is not guaranteed. Acceptance is not proof of a session or completed RPCs.");
            let y = d(e, "cwmp", L.form.Flag, "connection_request_defaults", _("Use backend Connection Request defaults"));
            y.modalonly = !0, y.default = "1", y.rmempty = !1, y.retain = !0, y.depends("connection_request", "1"), y.cfgvalue = (e)=>{
                let t = L.uci.get("fttr", e, "connection_request_defaults");
                return null != t ? String(t) : L.uci.get("fttr", e, "connection_request_username") && L.uci.get("fttr", e, "connection_request_password") ? "0" : "1";
            }, y.description = _("Uses a backend-reserved profile; factory credentials are not yet verified. Disable to enter this CPE's existing credentials and port. Saved custom values are retained while hidden.");
            let b = d(e, "cwmp", L.form.Value, "connection_request_username", _("CPE Connection Request username"));
            b.modalonly = !0, b.optional = !0, b.rmempty = !0, b.retain = !0, b.depends({
                connection_request: "1",
                connection_request_defaults: "0"
            }), b.description = _("Enter this CPE's existing Connection Request credentials, not the ACS inbound HTTP Basic credentials. No custom credential defaults are assumed.");
            let w = d(e, "cwmp", L.form.Value, "connection_request_password", _("CPE Connection Request password"));
            w.modalonly = !0, w.password = !0, w.optional = !0, w.rmempty = !0, w.retain = !0, w.depends({
                connection_request: "1",
                connection_request_defaults: "0"
            }), w.description = _("Saved custom values are retained when Connection Requests are disabled or backend defaults are selected. Leave these fields unchanged to preserve their saved values.");
            let S = d(e, "cwmp", L.form.Value, "connection_request_port", _("CPE Connection Request port"), "port");
            S.modalonly = !0, S.default = "7547", S.rmempty = !1, S.retain = !0, S.depends({
                connection_request: "1",
                connection_request_defaults: "0"
            });
            let z = d(e, "advanced", L.form.Flag, "omci_management", _("Provision management VLAN and ACS via OMCI"));
            z.modalonly = !0, z.default = "0", z.rmempty = !1, z.description = _("Disabled by default. Uses the global management VLAN, priority and ACS URL for this device only, subject to management application authorization. Disabling skips future OMCI management writes and retains existing ONU settings. ME readback does not prove WAN creation or successful Inform; K155 may clear its local ACS URL when enabled.");
            let k = u(e, "advanced", "wifi_cleanup", _("Unconfigured WLANs"), [
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
            k.modalonly = !0, k.default = "disable", k.description = _("By default, extra WLANs are disabled and retained. Deleting objects is destructive and should only be selected deliberately.");
        }), V.tab("templates", _("Templates")), v(f(V, "templates", "_templates", "template", _("Templates"), (e)=>{
            for (let [t, n] of (e.description = _("Create a template first, then add its SSIDs and networks in their tabs. Each editor changes one item. Confirm stages changes; Save & Apply applies the page configuration.") + " " + _("Deleting an unused template also deletes its SSIDs and networks."), g(e, "_name", _("Template"), (e)=>String(L.uci.get("fttr", e, "name") || _("New template"))), [
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
            ]))g(e, `_${t}_count`, n, (e)=>String(L.uci.sections("fttr", t).filter((t)=>t.template === e).length));
            let t = l(e, L.form.Value, "name", _("Name"));
            t.modalonly = !0, t.rmempty = !1;
        }), k), V.tab("wifi", _("SSIDs")), v(f(V, "wifi", "_wifi", "wifi", _("SSIDs"), (e)=>{
            e.description = _("Create SSIDs here before selecting them in a network. Every SSID belongs to one template.");
            let t = h(e), n = t.validate;
            t.validate = function(e, t) {
                let i = n.call(this, e, t);
                return !0 !== i ? i : !w().network.some((n)=>b(n.ssid).includes(e) && n.template !== t) || _("This SSID is bound to a network. Remove its network bindings before changing the template.");
            }, g(e, "_ssid", _("SSID"), (e)=>String(L.uci.get("fttr", e, "ssid") || e)), g(e, "_radio", _("Band"), (e)=>"2g" === L.uci.get("fttr", e, "radio") ? "2.4 GHz" : "5 GHz"), g(e, "_security", _("Security"), (e)=>{
                let t = String(L.uci.get("fttr", e, "security") || "");
                return "none" === t ? _("None (Open)") : t || _("Keep current key");
            });
            let i = l(e, L.form.Value, "ssid", _("SSID"));
            i.modalonly = !0, i.rmempty = !1, i.validate = (e, t)=>new TextEncoder().encode(t).length >= 1 && new TextEncoder().encode(t).length <= 32 || _("SSID must be 1\u201332 bytes.");
            let r = c(e, "radio", _("Band"), [
                [
                    "2g",
                    "2.4 GHz"
                ],
                [
                    "5g",
                    "5 GHz"
                ]
            ]);
            r.modalonly = !0, r.default = "2g", c(e, "security", _("Security"), [
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
            let o = l(e, L.form.Value, "key", _("Password"));
            o.password = !0, o.modalonly = !0, o.depends("security", "wpa2-psk"), o.depends("security", "wpa3-sae"), o.depends("security", "wpa2-psk/wpa3-sae"), o.depends("security", "wpa-psk/wpa2-psk"), o.rmempty = !1, o.validate = (e, t)=>{
                let n = new TextEncoder().encode(t).length;
                return n >= 8 && n <= 63 || _("Password must be 8\u201363 bytes.");
            };
        }), T), V.tab("networks", _("Networks")), f(V, "networks", "_networks", "network", _("Networks"), (e)=>{
            e.description = _("Networks bind VLAN services to wired ports and optional SSIDs within one template.");
            let t = h(e);
            g(e, "_name", _("Network"), (e)=>String(L.uci.get("fttr", e, "name") || _("New network"))), g(e, "_vlan", _("VLAN"), (e)=>String(L.uci.get("fttr", e, "vlan") || "0")), g(e, "_services", _("WAN Service List (multi-select)"), (e)=>b(L.uci.get("fttr", e, "service_list")).join(", ")), g(e, "_bindings", _("LAN / WLAN port bindings"), (e)=>[
                    ...b(L.uci.get("fttr", e, "port")).map((e)=>e.toUpperCase()),
                    ...b(L.uci.get("fttr", e, "ssid")).map((e)=>String(L.uci.get("fttr", e, "ssid") || e))
                ].join(", "));
            let n = l(e, L.form.Value, "name", _("Name"));
            n.modalonly = !0, n.rmempty = !1;
            let i = l(e, L.form.MultiValue, "service_list", _("WAN Service List (multi-select)"));
            for (let e of (i.modalonly = !0, i.rmempty = !1, i.validate = (e, t)=>N(t), i.description = _("Select at least one of INTERNET, OTHER, IPTV, and VOIP for each custom VLAN. TR069 is reserved for OMCI."), y))i.value(e, e);
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
            r.modalonly = !0, r.rmempty = !0, r.placeholder = _("No SSIDs selected"), r.description = _("Optional for wired-only networks. Only SSIDs from the selected template are listed. Changing the template clears the SSID selection."), m(r, function(e) {
                let t = this.section.getOption("template");
                return z(w(), String(t?.formvalue(e) ?? L.uci.get("fttr", e, "template") ?? ""));
            }), r.validate = function(e, t) {
                let n = String(this.section.getOption("template").formvalue(e) ?? L.uci.get("fttr", e, "template") ?? ""), i = new Set(z(w(), n).map((e)=>{
                    let [t] = e;
                    return t;
                }));
                return !!b(t).every((e)=>i.has(e)) || _("Select SSIDs belonging to this network's template.");
            }, t.onchange = function(e, t, n) {
                let i = this.section.getOption("ssid").getUIElement(t);
                if (!i) return;
                let r = z(w(), n);
                i.clearChoices(!0), i.addChoices(r.map((e)=>{
                    let [t] = e;
                    return t;
                }), Object.fromEntries(r));
            };
            let o = l(e, L.form.MultiValue, "port", _("Ports"));
            o.modalonly = !0;
            for(let e = 1; e <= 4; e++)o.value(`lan${e}`, `LAN${e}`);
        }), this.handleSave = ()=>x.save(()=>{
                let e = w(), t = j(e);
                if (t.length) throw Error(t.map((t)=>{
                    let n = e[t.kind].find((e)=>e[".name"] === t.sectionId), i = e.template.find((e)=>e[".name"] === n?.template), r = [
                        i && S(i),
                        n ? S(n) : t.sectionId
                    ].filter(Boolean).join(" / ");
                    return `${r} [${t.sectionId}.${t.field}]: ${t.message}`;
                }).join("\n"));
                L.uci.unset("fttr", "acs", "listen"), L.uci.unset("fttr", "management", "acs_url");
            });
        let D = a("pre", {
            style: "white-space:pre-wrap;overflow-wrap:anywhere",
            "aria-live": "polite"
        }), M = null, R = (e)=>{
            var t;
            O = e?.error, M?.parentNode?.removeChild(M), M = null, e?.error && (M = L.ui.addNotification(_("FTTR configuration check failed"), (t = {
                children: [
                    a("p", {
                        children: String(e.error)
                    }),
                    a("button", {
                        class: "cbi-button cbi-button-action",
                        type: "button",
                        onclick: ()=>$(V, O),
                        children: _("Review and repair configuration")
                    })
                ]
            }, a("div", t)), "error"));
        };
        R(e);
        let W = (r = {
            class: "cbi-section",
            children: [
                (i = {
                    children: [
                        _("Saving configuration does not synchronize devices in Manual mode. After Save & Apply, open Synchronization and choose Apply differences. Preview differences is read-only."),
                        " ",
                        a("a", {
                            href: L.url("admin", "network", "fttr", "sync"),
                            children: _("Open Synchronization")
                        })
                    ]
                }, a("p", i)),
                a("h3", {
                    children: _("Configuration diagnostics")
                }),
                a("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    onclick: ()=>$(V, O),
                    children: _("Review and repair configuration")
                }),
                " ",
                a("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    onclick: ()=>tQ(tW, D, R),
                    children: _("Check")
                }),
                " ",
                a("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    disabled: !L.hasViewPermission(),
                    onclick: ()=>tQ(async ()=>(await tU(), await tW()), D, R),
                    children: _("Reload")
                }),
                " ",
                a("button", {
                    class: "cbi-button cbi-button-negative",
                    type: "button",
                    disabled: !L.hasViewPermission(),
                    onclick: ()=>tQ(tZ, D),
                    children: _("Restart")
                }),
                D
            ]
        }, a("div", r));
        return V.tab("diagnostics", _("Configuration diagnostics")), V.taboption("diagnostics", tJ.DummyValue, "_diagnostics", "").render = ()=>Promise.resolve(W), x.render();
    }
});

return main;