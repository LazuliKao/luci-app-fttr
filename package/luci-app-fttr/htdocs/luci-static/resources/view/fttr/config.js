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
function d(e, t, n, i) {
    let r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], o = l(e, s.ListValue, t, n);
    for (let [e, t] of i)o.value(e, t);
    return o.rmempty = r, o;
}
function c(e, t, n, i) {
    let r = arguments.length > 4 && void 0 !== arguments[4] && arguments[4], o = l(e, s.RichListValue, t, n);
    return o.rmempty = r, o.optional = r, o.default = "", u(o, ()=>[
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
function u(e, t) {
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
function p(e, t, n, i, r, o) {
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
function f(e, t, n, i) {
    let r = e.option(L.form.DummyValue, t, n);
    r.modalonly = !1, r.textvalue = i;
}
function m(e) {
    f(e, "_template", _("Template"), (e)=>{
        let t = String(L.uci.get("fttr", e, "template") || "");
        return String(L.uci.get("fttr", t, "name") || t || _("Missing template"));
    });
    let t = c(e, "template", _("Template"), "template");
    return t.modalonly = !0, t;
}
function g(e, t) {
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
const h = [
    "INTERNET",
    "OTHER",
    "IPTV",
    "VOIP"
];
function y(e) {
    return Array.isArray(e) ? e.map(String) : String(e ?? "").split(/\s+/).filter(Boolean);
}
function v() {
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
function b(e) {
    return String(e.name || e.ssid || e.optical_sn || e[".name"]);
}
function w(e, t) {
    return e.wifi.filter((e)=>e.template === t).map((e)=>[
            e[".name"],
            b(e)
        ]);
}
function S(e) {
    let t = v();
    if (t.group.some((t)=>t.template === e)) throw Error(_("Template is in use."));
    for (let n of t.wifi)n.template === e && k(n[".name"]);
    for (let n of [
        ...t.network,
        ...t.wifi
    ])n.template === e && L.uci.remove("fttr", n[".name"]);
}
function z(e) {
    if (v().device.some((t)=>t.group === e)) throw Error(_("Group is used by devices. Reassign those devices before deleting it."));
}
function k(e) {
    for (let t of v().network){
        let n = y(t.ssid);
        if (n.includes(e)) {
            let i = n.filter((t)=>t !== e);
            i.length ? L.uci.set("fttr", t[".name"], "ssid", i) : L.uci.unset("fttr", t[".name"], "ssid");
        }
    }
}
function P(e) {
    return "HWTC" === (e?.vendor || e?.serial_number.slice(0, 4)) ? "hwtc" : e?.model?.startsWith("HL202") ? "hl202" : "generic";
}
function N(e) {
    let t = y(e);
    return t.length ? !!t.every((e)=>h.includes(e)) || _("WAN Service List may only contain INTERNET, OTHER, IPTV, and VOIP.") : _("Select at least one WAN Service List label.");
}
function T(e) {
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
        for (let e of y(t.ssid)){
            let n = r.get(e);
            n && n.template === t.template || o("network", t, "ssid", _("Select SSIDs belonging to this network's template."));
        }
    }
    for (let t of e.device)i.has(String(t.group || "")) || o("device", t, "group", _("Select an existing group."));
    return t;
}
function j(e, t) {
    return e.children.find((e)=>e.subsection?.sectiontype === t)?.subsection;
}
function A(e) {
    return ({
        device: _("Device"),
        group: _("Group"),
        template: _("Template"),
        wifi: _("SSID"),
        network: _("Network")
    })[e];
}
async function C(e, t) {
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
function O(e, t) {
    var n, i, r;
    let s = function(e) {
        let t = new Map();
        for (let n of T(e)){
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
    }(v());
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
                                A(n.kind),
                                ": ",
                                b(n.row),
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
                                        ].includes(e.field) && y(n.row[e.field]).length ? (i = {
                                            children: [
                                                " ",
                                                a("code", {
                                                    children: y(n.row[e.field]).join(", ")
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
                            onclick: (t)=>C(t, async ()=>{
                                    if (!L.hasViewPermission()) return;
                                    let t = j(e, n.kind);
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
                                                        A(n.kind),
                                                        ": ",
                                                        b(n.row)
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
                                                    onclick: ()=>O(e, t),
                                                    children: _("Cancel")
                                                }),
                                                " ",
                                                a("button", {
                                                    class: "cbi-button cbi-button-negative",
                                                    type: "button",
                                                    disabled: !L.hasViewPermission(),
                                                    onclick: (i)=>C(i, async ()=>{
                                                            if (!L.hasViewPermission()) return;
                                                            let r = j(e, n.kind);
                                                            if (!r) throw Error(_("Configuration editor is unavailable."));
                                                            await r.handleRemove(n.sectionId, i), O(e, t);
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
function x(e, t, n) {
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
class $ extends Error {
    constructor(){
        super("Encountered Promise during synchronous parse. Use .parseAsync() instead.");
    }
}
const I = {};
function V(e) {
    return e && Object.assign(I, e), I;
}
function D(e, t) {
    return "bigint" == typeof t ? t.toString() : t;
}
function R(e) {
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
function M(e) {
    let t = +!!e.startsWith("^"), n = e.endsWith("$") ? e.length - 1 : e.length;
    return e.slice(t, n);
}
const U = Symbol("evaluating");
function Z(e, t, n) {
    let i;
    Object.defineProperty(e, t, {
        get () {
            if (i !== U) return void 0 === i && (i = U, i = n()), i;
        },
        set (n) {
            Object.defineProperty(e, t, {
                value: n
            });
        },
        configurable: !0
    });
}
function W(e, t, n) {
    Object.defineProperty(e, t, {
        value: n,
        writable: !0,
        enumerable: !0,
        configurable: !0
    });
}
function q(...e) {
    let t = {};
    for (let n of e)Object.assign(t, Object.getOwnPropertyDescriptors(n));
    return Object.defineProperties({}, t);
}
const H = "captureStackTrace" in Error ? Error.captureStackTrace : (...e)=>{};
function F(e) {
    return "object" == typeof e && null !== e && !Array.isArray(e);
}
function G(e) {
    if (!1 === F(e)) return !1;
    let t = e.constructor;
    if (void 0 === t || "function" != typeof t) return !0;
    let n = t.prototype;
    return !1 !== F(n) && !1 !== Object.prototype.hasOwnProperty.call(n, "isPrototypeOf");
}
const B = new Set([
    "string",
    "number",
    "symbol"
]);
function K(e) {
    return e.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function J(e, t, n) {
    let i = new e._zod.constr(t ?? e._zod.def);
    return (!t || n?.parent) && (i._zod.parent = e), i;
}
function X(e) {
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
function Q(e, t = 0) {
    if (!0 === e.aborted) return !0;
    for(let n = t; n < e.issues.length; n++)if (e.issues[n]?.continue !== !0) return !0;
    return !1;
}
function Y(e, t) {
    return t.map((t)=>(t.path ?? (t.path = []), t.path.unshift(e), t));
}
function ee(e) {
    return "string" == typeof e ? e : e?.message;
}
function et(e, t, n) {
    let i = {
        ...e,
        path: e.path ?? []
    };
    return e.message || (i.message = ee(e.inst?._zod.def?.error?.(e)) ?? ee(t?.error?.(e)) ?? ee(n.customError?.(e)) ?? ee(n.localeError?.(e)) ?? "Invalid input"), delete i.inst, delete i.continue, t?.reportInput || delete i.input, i;
}
const en = (e, t)=>{
    e.name = "$ZodError", Object.defineProperty(e, "_zod", {
        value: e._zod,
        enumerable: !1
    }), Object.defineProperty(e, "issues", {
        value: t,
        enumerable: !1
    }), e.message = JSON.stringify(t, D, 2), Object.defineProperty(e, "toString", {
        value: ()=>e.message,
        enumerable: !1
    });
}, ei = x("$ZodError", en), er = x("$ZodError", en, {
    Parent: Error
}), eo = (t = er, (e, n, i, r)=>{
    let o = i ? Object.assign(i, {
        async: !1
    }) : {
        async: !1
    }, a = e._zod.run({
        value: n,
        issues: []
    }, o);
    if (a instanceof Promise) throw new $();
    if (a.issues.length) {
        let e = new (r?.Err ?? t)(a.issues.map((e)=>et(e, o, V())));
        throw H(e, r?.callee), e;
    }
    return a.value;
}), ea = (n = er, async (e, t, i, r)=>{
    let o = i ? Object.assign(i, {
        async: !0
    }) : {
        async: !0
    }, a = e._zod.run({
        value: t,
        issues: []
    }, o);
    if (a instanceof Promise && (a = await a), a.issues.length) {
        let e = new (r?.Err ?? n)(a.issues.map((e)=>et(e, o, V())));
        throw H(e, r?.callee), e;
    }
    return a.value;
}), es = (i = er, (e, t, n)=>{
    let r = n ? {
        ...n,
        async: !1
    } : {
        async: !1
    }, o = e._zod.run({
        value: t,
        issues: []
    }, r);
    if (o instanceof Promise) throw new $();
    return o.issues.length ? {
        success: !1,
        error: new (i ?? ei)(o.issues.map((e)=>et(e, r, V())))
    } : {
        success: !0,
        data: o.value
    };
}), el = (r = er, async (e, t, n)=>{
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
        error: new r(o.issues.map((e)=>et(e, i, V())))
    } : {
        success: !0,
        data: o.value
    };
}), ed = /^-?\d+(?:\.\d+)?$/, ec = /^(?:true|false)$/i, eu = /^null$/i, ep = {
    major: 4,
    minor: 3,
    patch: 6
}, ef = x("$ZodType", (e, t)=>{
    var n;
    e ?? (e = {}), e._zod.def = t, e._zod.bag = e._zod.bag || {}, e._zod.version = ep;
    let i = [
        ...e._zod.def.checks ?? []
    ];
    for (let t of (e._zod.traits.has("$ZodCheck") && i.unshift(e), i))for (let n of t._zod.onattach)n(e);
    if (0 === i.length) (n = e._zod).deferred ?? (n.deferred = []), e._zod.deferred?.push(()=>{
        e._zod.run = e._zod.parse;
    });
    else {
        let t = (e, t, n)=>{
            let i, r = Q(e);
            for (let o of t){
                if (o._zod.def.when) {
                    if (!o._zod.def.when(e)) continue;
                } else if (r) continue;
                let t = e.issues.length, a = o._zod.check(e);
                if (a instanceof Promise && n?.async === !1) throw new $();
                if (i || a instanceof Promise) i = (i ?? Promise.resolve()).then(async ()=>{
                    await a, e.issues.length !== t && (r || (r = Q(e, t)));
                });
                else {
                    if (e.issues.length === t) continue;
                    r || (r = Q(e, t));
                }
            }
            return i ? i.then(()=>e) : e;
        }, n = (n, r, o)=>{
            if (Q(n)) return n.aborted = !0, n;
            let a = t(r, i, o);
            if (a instanceof Promise) {
                if (!1 === o.async) throw new $();
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
                if (!1 === o.async) throw new $();
                return a.then((e)=>t(e, i, o));
            }
            return t(a, i, o);
        };
    }
    Z(e, "~standard", ()=>({
            validate: (t)=>{
                try {
                    let n = es(e, t);
                    return n.success ? {
                        value: n.data
                    } : {
                        issues: n.error?.issues
                    };
                } catch (n) {
                    return el(e, t).then((e)=>e.success ? {
                            value: e.data
                        } : {
                            issues: e.error?.issues
                        });
                }
            },
            vendor: "zod",
            version: 1
        }));
}), e_ = x("$ZodString", (e, t)=>{
    var n;
    let i;
    ef.init(e, t), e._zod.pattern = [
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
}), em = x("$ZodNumber", (e, t)=>{
    ef.init(e, t), e._zod.pattern = e._zod.bag.pattern ?? ed, e._zod.parse = (n, i)=>{
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
}), eg = x("$ZodBoolean", (e, t)=>{
    ef.init(e, t), e._zod.pattern = ec, e._zod.parse = (n, i)=>{
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
}), eh = x("$ZodNull", (e, t)=>{
    ef.init(e, t), e._zod.pattern = eu, e._zod.values = new Set([
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
}), ey = x("$ZodNever", (e, t)=>{
    ef.init(e, t), e._zod.parse = (t, n)=>(t.issues.push({
            expected: "never",
            code: "invalid_type",
            input: t.value,
            inst: e
        }), t);
});
function ev(e, t, n) {
    e.issues.length && t.issues.push(...Y(n, e.issues)), t.value[n] = e.value;
}
const eb = x("$ZodArray", (e, t)=>{
    ef.init(e, t), e._zod.parse = (n, i)=>{
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
            s instanceof Promise ? o.push(s.then((t)=>ev(t, n, e))) : ev(s, n, e);
        }
        return o.length ? Promise.all(o).then(()=>n) : n;
    };
});
function ew(e, t, n, i, r) {
    if (e.issues.length) {
        if (r && !(n in i)) return;
        t.issues.push(...Y(n, e.issues));
    }
    void 0 === e.value ? n in i && (t.value[n] = void 0) : t.value[n] = e.value;
}
const eS = x("$ZodObject", (e, t)=>{
    let n;
    ef.init(e, t);
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
    let r = R(()=>(function(e) {
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
    Z(e._zod, "propValues", ()=>{
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
        if (!F(a)) return t.issues.push({
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
            o instanceof Promise ? s.push(o.then((n)=>ew(n, t, e, a, r))) : ew(o, t, e, a, r);
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
                o instanceof Promise ? e.push(o.then((e)=>ew(e, n, r, t, c))) : ew(o, n, r, t, c);
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
function ez(e, t, n, i) {
    for (let n of e)if (0 === n.issues.length) return t.value = n.value, t;
    let r = e.filter((e)=>!Q(e));
    return 1 === r.length ? (t.value = r[0].value, r[0]) : (t.issues.push({
        code: "invalid_union",
        input: t.value,
        inst: n,
        errors: e.map((e)=>e.issues.map((e)=>et(e, i, V())))
    }), t);
}
const ek = x("$ZodUnion", (e, t)=>{
    ef.init(e, t), Z(e._zod, "optin", ()=>t.options.some((e)=>"optional" === e._zod.optin) ? "optional" : void 0), Z(e._zod, "optout", ()=>t.options.some((e)=>"optional" === e._zod.optout) ? "optional" : void 0), Z(e._zod, "values", ()=>{
        if (t.options.every((e)=>e._zod.values)) return new Set(t.options.flatMap((e)=>Array.from(e._zod.values)));
    }), Z(e._zod, "pattern", ()=>{
        if (t.options.every((e)=>e._zod.pattern)) {
            let e = t.options.map((e)=>e._zod.pattern);
            return RegExp(`^(${e.map((e)=>M(e.source)).join("|")})$`);
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
        return a ? Promise.all(s).then((t)=>ez(t, r, e, o)) : ez(s, r, e, o);
    };
}), eL = x("$ZodDiscriminatedUnion", (e, t)=>{
    t.inclusive = !1, ek.init(e, t);
    let n = e._zod.parse;
    Z(e._zod, "propValues", ()=>{
        let e = {};
        for (let n of t.options){
            let i = n._zod.propValues;
            if (!i || 0 === Object.keys(i).length) throw Error(`Invalid discriminated union option at index "${t.options.indexOf(n)}"`);
            for (let [t, n] of Object.entries(i))for (let i of (e[t] || (e[t] = new Set()), n))e[t].add(i);
        }
        return e;
    });
    let i = R(()=>{
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
        if (!F(a)) return r.issues.push({
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
}), eP = x("$ZodRecord", (e, t)=>{
    ef.init(e, t), e._zod.parse = (n, i)=>{
        let r = n.value;
        if (!G(r)) return n.issues.push({
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
                    t.issues.length && n.issues.push(...Y(e, t.issues)), n.value[e] = t.value;
                })) : (a.issues.length && n.issues.push(...Y(e, a.issues)), n.value[e] = a.value);
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
            if ("string" == typeof a && ed.test(a) && s.issues.length) {
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
                    issues: s.issues.map((e)=>et(e, i, V())),
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
                e.issues.length && n.issues.push(...Y(a, e.issues)), n.value[s.value] = e.value;
            })) : (l.issues.length && n.issues.push(...Y(a, l.issues)), n.value[s.value] = l.value);
        }
        return o.length ? Promise.all(o).then(()=>n) : n;
    };
}), eN = x("$ZodEnum", (e, t)=>{
    var n;
    let i;
    ef.init(e, t);
    let r = (i = Object.values(n = t.entries).filter((e)=>"number" == typeof e), Object.entries(n).filter(([e, t])=>-1 === i.indexOf(+e)).map(([e, t])=>t)), o = new Set(r);
    e._zod.values = o, e._zod.pattern = RegExp(`^(${r.filter((e)=>B.has(typeof e)).map((e)=>"string" == typeof e ? K(e) : e.toString()).join("|")})$`), e._zod.parse = (t, n)=>{
        let i = t.value;
        return o.has(i) || t.issues.push({
            code: "invalid_value",
            values: r,
            input: i,
            inst: e
        }), t;
    };
}), eT = x("$ZodLiteral", (e, t)=>{
    if (ef.init(e, t), 0 === t.values.length) throw Error("Cannot create literal schema with no valid values");
    let n = new Set(t.values);
    e._zod.values = n, e._zod.pattern = RegExp(`^(${t.values.map((e)=>"string" == typeof e ? K(e) : e ? K(e.toString()) : String(e)).join("|")})$`), e._zod.parse = (i, r)=>{
        let o = i.value;
        return n.has(o) || i.issues.push({
            code: "invalid_value",
            values: t.values,
            input: o,
            inst: e
        }), i;
    };
});
function ej(e, t) {
    return e.issues.length && void 0 === t ? {
        issues: [],
        value: void 0
    } : e;
}
const eA = x("$ZodOptional", (e, t)=>{
    ef.init(e, t), e._zod.optin = "optional", e._zod.optout = "optional", Z(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            void 0
        ]) : void 0), Z(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${M(e.source)})?$`) : void 0;
    }), e._zod.parse = (e, n)=>{
        if ("optional" === t.innerType._zod.optin) {
            let i = t.innerType._zod.run(e, n);
            return i instanceof Promise ? i.then((t)=>ej(t, e.value)) : ej(i, e.value);
        }
        return void 0 === e.value ? e : t.innerType._zod.run(e, n);
    };
}), eE = x("$ZodNullable", (e, t)=>{
    ef.init(e, t), Z(e._zod, "optin", ()=>t.innerType._zod.optin), Z(e._zod, "optout", ()=>t.innerType._zod.optout), Z(e._zod, "pattern", ()=>{
        let e = t.innerType._zod.pattern;
        return e ? RegExp(`^(${M(e.source)}|null)$`) : void 0;
    }), Z(e._zod, "values", ()=>t.innerType._zod.values ? new Set([
            ...t.innerType._zod.values,
            null
        ]) : void 0), e._zod.parse = (e, n)=>null === e.value ? e : t.innerType._zod.run(e, n);
}), eC = x("$ZodCatch", (e, t)=>{
    ef.init(e, t), Z(e._zod, "optin", ()=>t.innerType._zod.optin), Z(e._zod, "optout", ()=>t.innerType._zod.optout), Z(e._zod, "values", ()=>t.innerType._zod.values), e._zod.parse = (e, n)=>{
        if ("backward" === n.direction) return t.innerType._zod.run(e, n);
        let i = t.innerType._zod.run(e, n);
        return i instanceof Promise ? i.then((i)=>(e.value = i.value, i.issues.length && (e.value = t.catchValue({
                ...e,
                error: {
                    issues: i.issues.map((e)=>et(e, n, V()))
                },
                input: e.value
            }), e.issues = []), e)) : (e.value = i.value, i.issues.length && (e.value = t.catchValue({
            ...e,
            error: {
                issues: i.issues.map((e)=>et(e, n, V()))
            },
            input: e.value
        }), e.issues = []), e);
    };
}), eO = x("$ZodLazy", (e, t)=>{
    ef.init(e, t), Z(e._zod, "innerType", ()=>t.getter()), Z(e._zod, "pattern", ()=>e._zod.innerType?._zod?.pattern), Z(e._zod, "propValues", ()=>e._zod.innerType?._zod?.propValues), Z(e._zod, "optin", ()=>e._zod.innerType?._zod?.optin ?? void 0), Z(e._zod, "optout", ()=>e._zod.innerType?._zod?.optout ?? void 0), e._zod.parse = (t, n)=>e._zod.innerType._zod.run(t, n);
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
const ex = x("ZodMiniType", (e, t)=>{
    if (!e._zod) throw Error("Uninitialized schema in ZodMiniType.");
    ef.init(e, t), e.def = t, e.type = t.type, e.parse = (t, n)=>eo(e, t, n, {
            callee: e.parse
        }), e.safeParse = (t, n)=>es(e, t, n), e.parseAsync = async (t, n)=>ea(e, t, n, {
            callee: e.parseAsync
        }), e.safeParseAsync = async (t, n)=>el(e, t, n), e.check = (...n)=>e.clone({
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
        }), e.with = e.check, e.clone = (t, n)=>J(e, t, n), e.brand = ()=>e, e.register = (t, n)=>(t.add(e, n), e), e.apply = (t)=>t(e);
}), e$ = x("ZodMiniString", (e, t)=>{
    e_.init(e, t), ex.init(e, t);
});
function eI(e) {
    return new e$({
        type: "string",
        ...X(e)
    });
}
const eV = x("ZodMiniNumber", (e, t)=>{
    em.init(e, t), ex.init(e, t);
});
function eD(e) {
    return new eV({
        type: "number",
        checks: [],
        ...X(e)
    });
}
const eR = x("ZodMiniBoolean", (e, t)=>{
    eg.init(e, t), ex.init(e, t);
});
function eM(e) {
    return new eR({
        type: "boolean",
        ...X(e)
    });
}
const eU = x("ZodMiniNull", (e, t)=>{
    eh.init(e, t), ex.init(e, t);
}), eZ = x("ZodMiniNever", (e, t)=>{
    ey.init(e, t), ex.init(e, t);
});
function eW(e) {
    return new eZ({
        type: "never",
        ...X(e)
    });
}
const eq = x("ZodMiniArray", (e, t)=>{
    eb.init(e, t), ex.init(e, t);
});
function eH(e, t) {
    return new eq({
        type: "array",
        element: e,
        ...X(t)
    });
}
const eF = x("ZodMiniObject", (e, t)=>{
    eS.init(e, t), ex.init(e, t), Z(e, "shape", ()=>t.shape);
});
function eG(e, t) {
    return new eF({
        type: "object",
        shape: e ?? {},
        ...X(t)
    });
}
const eB = x("ZodMiniUnion", (e, t)=>{
    ek.init(e, t), ex.init(e, t);
});
function eK(e, t) {
    return new eB({
        type: "union",
        options: e,
        ...X(t)
    });
}
const eJ = x("ZodMiniDiscriminatedUnion", (e, t)=>{
    eL.init(e, t), ex.init(e, t);
});
function eX(e, t, n) {
    return new eJ({
        type: "union",
        options: t,
        discriminator: e,
        ...X(n)
    });
}
const eQ = x("ZodMiniRecord", (e, t)=>{
    eP.init(e, t), ex.init(e, t);
});
function eY(e, t, n) {
    return new eQ({
        type: "record",
        keyType: e,
        valueType: t,
        ...X(n)
    });
}
const e0 = x("ZodMiniEnum", (e, t)=>{
    eN.init(e, t), ex.init(e, t), e.options = Object.values(t.entries);
});
function e1(e, t) {
    return new e0({
        type: "enum",
        entries: Array.isArray(e) ? Object.fromEntries(e.map((e)=>[
                e,
                e
            ])) : e,
        ...X(t)
    });
}
const e2 = x("ZodMiniLiteral", (e, t)=>{
    eT.init(e, t), ex.init(e, t);
});
function e4(e, t) {
    return new e2({
        type: "literal",
        values: Array.isArray(e) ? e : [
            e
        ],
        ...X(t)
    });
}
const e3 = x("ZodMiniOptional", (e, t)=>{
    eA.init(e, t), ex.init(e, t);
});
function e5(e) {
    return new e3({
        type: "optional",
        innerType: e
    });
}
const e6 = x("ZodMiniNullable", (e, t)=>{
    eE.init(e, t), ex.init(e, t);
});
function e7(e) {
    return new e6({
        type: "nullable",
        innerType: e
    });
}
const e9 = x("ZodMiniCatch", (e, t)=>{
    eC.init(e, t), ex.init(e, t);
}), e8 = x("ZodMiniLazy", (e, t)=>{
    eO.init(e, t), ex.init(e, t);
});
function te() {
    let e = new e8({
        type: "lazy",
        getter: ()=>eK([
                eI(),
                eD(),
                eM(),
                new eU({
                    type: "null",
                    ...X(void 0)
                }),
                eH(e),
                eY(eI(), e)
            ])
    });
    return e;
}
let tt = eG({
    error: eK([
        eI(),
        eG({
            code: eI(),
            message: eI()
        })
    ])
});
class tn extends Error {
    code;
    constructor(e, t){
        super(t), this.code = e, this.name = "RpcError";
    }
}
function ti(e) {
    let t = tt.safeParse(e);
    if (t.success) {
        let e = t.data.error;
        throw "string" == typeof e ? new tn("rpc", e) : new tn(e.code, e.message);
    }
    return e;
}
eG({
    status: e4("pending"),
    job: eI()
}), eX("status", [
    eG({
        status: e4("pending")
    }),
    eG({
        status: e4("ready"),
        chunk: eD(),
        chunks: eD(),
        bytes: eD(),
        data: eI()
    })
]);
let tr = eI(), to = eD(), ta = eM(), ts = e5(tr), tl = e5(to), td = e5(ta);
const tc = e1([
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
]), tu = e1([
    "not_configured",
    "stale_revision",
    "stale_management",
    "verified",
    "attention_required",
    "accepted_unverified",
    "pending",
    "recovering",
    "waiting_management"
]), tp = eG({
    id: tr,
    name: e5(e7(tr)),
    kind: e1([
        "device_service",
        "ssid",
        "port_binding",
        "wan_activation"
    ]),
    service_type: tr,
    state: tr,
    reason: ts,
    revision: ts,
    current_revision: td,
    management_fresh: td,
    operation_id: tl,
    task_id: e5(e7(to)),
    updated_at: tl,
    changes: e5(eH(eG({
        name: tr,
        desired: tr
    })))
});
let tf = eG({
    state: tr,
    reason: ts,
    task_id: e5(e7(to)),
    instance: tl
});
const t_ = eG({
    cwmp_id: tr,
    state: e1([
        "online",
        "waiting_inform",
        "offline_or_stale"
    ]),
    optical_online: ta,
    last_inform: e7(to),
    age_seconds: e7(to)
});
let tm = eG({
    state: e1([
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
    method: ts,
    reason: ts,
    mqtt_target: e7(tr),
    binding_source: ts,
    link_identity_error: e7(tr),
    mqtt_last_seen: e7(to),
    cwmp_id: ts,
    desired_version: ts,
    generation: tl,
    inflight: td,
    attempts: tl,
    next_retry_at: tl,
    updated_at: tl,
    settings_verified_at: e7(to),
    last_inform: e7(to),
    last_error: e5(e7(tr)),
    persistence_error: e5(e7(tr)),
    desired: e5(e7(eG({
        vlan: to,
        vlans: eH(to),
        priority: to,
        acs_url: tr
    }))),
    listener: e5(eG({
        enabled: ta,
        listen: tr,
        path: tr,
        error: e7(tr)
    })),
    endpoint_notice: ts,
    manual_steps: e5(eH(tr))
});
const tg = eX("state", [
    tm,
    function(e, t) {
        if (!G(t)) throw Error("Invalid input to extend: expected a plain object");
        let n = e._zod.def.checks;
        if (n && n.length > 0) {
            let n = e._zod.def.shape;
            for(let e in t)if (void 0 !== Object.getOwnPropertyDescriptor(n, e)) throw Error("Cannot overwrite keys on object schemas containing refinements. Use `.safeExtend()` instead.");
        }
        let i = q(e._zod.def, {
            get shape () {
                let n = {
                    ...e._zod.def.shape,
                    ...t
                };
                return W(this, "shape", n), n;
            }
        });
        return J(e, i);
    }(function(e) {
        var t = void 0;
        let n = e._zod.def.checks;
        if (n && n.length > 0) throw Error(".partial() cannot be used on object schemas containing refinements");
        let i = q(e._zod.def, {
            get shape () {
                let n = e._zod.def.shape, i = {
                    ...n
                };
                if (t) for(let e in t){
                    if (!(e in n)) throw Error(`Unrecognized key: "${e}"`);
                    t[e] && (i[e] = e3 ? new e3({
                        type: "optional",
                        innerType: n[e]
                    }) : n[e]);
                }
                else for(let e in n)i[e] = e3 ? new e3({
                    type: "optional",
                    innerType: n[e]
                }) : n[e];
                return W(this, "shape", i), i;
            },
            checks: []
        });
        return J(e, i);
    }(tm), {
        state: e1([
            "pending",
            "unavailable"
        ]),
        reason: tr
    })
]), th = eG({
    state: tc,
    operation_id: tl,
    device: ts,
    optical_sn: ts,
    cwmp_id: ts,
    revision: ts,
    mode: e5(e1([
        "apply",
        "plan"
    ])),
    started_at: tl,
    current_revision: td,
    management_fresh: td,
    reason: ts,
    error: ts,
    attempts: tl,
    next_retry_at: tl,
    reconcile_reason: ts,
    items: eH(tp),
    cwmp_contract: e5(eG({
        state: tr,
        requested: tr,
        contract: e7(tr),
        reason: tr,
        cache_hit: ta,
        schema: tr,
        capabilities: e7(eG({
            wan: tr,
            wlan: tr,
            binding: tr
        }))
    })),
    wan_objects: e5(eY(tr, te())),
    wan_lifecycle: e5(eY(tr, tf)),
    wan_stage: e5(e1([
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
    wifi_objects: e5(eG({
        owned: eH(to),
        pending: e7(tr),
        pending_instance: e7(to)
    })),
    wifi_lifecycle: e5(eY(tr, tf)),
    wifi_stage: e5(e1([
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
    wifi_cleanup: e5(e1([
        "disable",
        "preserve",
        "delete"
    ]))
});
let ty = eG({
    enabled: ta,
    mode: e1([
        "auto",
        "manual"
    ]),
    vlan: eH(to),
    priority: to,
    address: tr,
    acs_url: tr,
    port: to,
    path: tr,
    dhcp_enabled: ta
}), tv = eG({
    state: e1([
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
    error: e7(tr),
    inflight: ta,
    ready: ta,
    desired_version: e7(tr),
    applied_version: e7(tr),
    next_retry_at: to,
    attempts: to,
    desired: e7(ty),
    applied: e7(ty),
    previous: e7(ty),
    plan: eH(eG({
        operation: tr,
        key: tr,
        value: eH(tr)
    }))
});
const tb = eG({
    device: tr,
    name: e7(tr),
    group: e7(tr),
    group_name: e7(tr),
    template: e7(tr),
    template_name: e7(tr),
    optical_sn: tr,
    adapter: tr,
    omci_management: eG({
        state: tr,
        reason: e5(e7(tr))
    }),
    management: e7(t_),
    acs_bootstrap: tg,
    provisioning: th,
    services: eH(tp),
    ssids: eH(tp),
    wifi_sync: tu
}), tw = eG({
    enabled: ta,
    mode: e1([
        "auto",
        "manual"
    ]),
    method: e4("diff"),
    revision: tr,
    triggers: eH(tr),
    interval_minutes: new eV({
        type: "number",
        coerce: !0,
        checks: [],
        ...X(void 0)
    }),
    error: e7(tr),
    devices: eH(tb),
    management_network: tv,
    omci_management: te(),
    groups: eH(eG({
        id: tr,
        name: e7(tr),
        template: tr
    })),
    pending_devices: eH(tr)
}), tS = eK([
    eG({
        valid: e4(!0),
        revision: tr,
        devices: to,
        error: e5(eW())
    }),
    eG({
        error: tr,
        valid: e5(eW()),
        revision: e5(eW()),
        devices: e5(eW())
    })
]);
let tz = eI(), tk = eD(), tL = e7(tk), tP = eY(tz, eG({
    source: tz,
    unit: tz,
    reason: e7(tz),
    raw: e7(tz),
    age_seconds: tL
}));
const tN = eG({
    phase: e1([
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
    generation: tk,
    error: e7(tz)
}), tT = e1([
    "o1_initial",
    "o2_standby",
    "o3_serial_number",
    "o4_ranging",
    "o5_operation",
    "o6_intermittent_lods",
    "o7_emergency_stop"
]);
let tj = eG({
    model: tz,
    wavelength_tx_nm: tk,
    wavelength_rx_nm: tk,
    phy_rate_downlink_gbps: tk,
    phy_rate_uplink_gbps: tk,
    tx_power_dbm: tL,
    laser_bias_current_ma: tL,
    temperature_celsius: tL,
    vcc_voltage: tL,
    cdr_locked: e7(eM()),
    tx_enabled: e7(eM()),
    measurements: tP
}), tA = eG({
    equipment_id: e7(tz),
    hardware_version: e7(tz),
    software_images: eH(tz),
    omcc_version: tL,
    errors: eH(tz)
});
const tE = eG({
    onu_id: tk,
    vendor: tz,
    model: tz,
    serial_number: tz,
    state: tT,
    business_status: tN,
    management: e7(t_),
    provisioning: e7(th),
    services: eH(tp),
    ssids: eH(tp),
    wifi_sync: tu,
    acs_bootstrap: e5(tg),
    identity: e7(tA),
    identity_age_seconds: tL,
    identity_current: eM(),
    fiber_distance_m: tL,
    ranging_delay_rtd_ns: tL,
    equalization_delay_bits: new e9({
        type: "catch",
        innerType: tL,
        catchValue: ()=>null
    }),
    optical_rx_power_dbm: tL,
    optical_tx_power_dbm: tL,
    firmware_version: tz,
    hardware_version: tz,
    uptime_seconds: tL,
    data_path: eG({
        interface: tz,
        gem_ports: e7(eH(tk)),
        vlan_id: tL,
        tx_bytes: tL,
        rx_bytes: tL,
        current_tx_kbps: tL,
        current_rx_kbps: tL,
        measurements: tP
    }),
    wifi_mesh: eG({
        channel_2g: tL,
        channel_5g: tL,
        bandwidth_5g: e7(tz),
        tx_power_pct: tL,
        measurements: tP
    }),
    connected_clients: e7(eH(eG({
        mac: tz,
        ip: tz,
        band: tz,
        rssi_dbm: tL,
        rx_rate_mbps: tL,
        tx_rate_mbps: tL
    }))),
    measurements: tP
});
let tC = eG({
    reserved_sn: e5(tz),
    port: tk,
    interface: tz,
    carrier: eM(),
    status: tz,
    onu_id: e5(tk),
    onu_sn: e5(tz),
    link_state: tz
});
const tO = eG({
    onu_pinning: e5(eG({
        desired: eY(tz, tk),
        active: eY(tz, tk),
        pending_restart: eM(),
        allocation_blocked: eM(),
        startup_error: e7(tz),
        config_error: e7(tz)
    })),
    fpga_status: tz,
    provisioning: e7(tw),
    optical_transceiver: tj,
    switch_ports: eH(tC),
    sub_gateways: eH(tE),
    telemetry_gateways: eH(eG({
        id: tz,
        last_seen_sec_ago: tk,
        last_payload_bytes: tk
    }))
});
eY(tz, eG({
    carrier: e5(eM()),
    mac: e5(tz),
    link: e5(eG({
        speed: e5(tk),
        duplex: e5(tz),
        autoneg: e5(eM())
    })),
    stats: e5(eY(tz, tk))
})), _("Not started"), _("Collecting identity"), _("Retrying identity"), _("Unsupported"), _("Configuring"), _("Verifying"), _("WAN pending"), _("Verified"), _("Retrying"), _("Offline");
let tx = L.rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: !0
}), t$ = (L.rpc.declare({
    object: "luci.fttr",
    method: "get_sync",
    reject: !0
}), L.rpc.declare({
    object: "luci.fttr",
    method: "config_check",
    reject: !0
})), tI = L.rpc.declare({
    object: "luci.fttr",
    method: "config_reload",
    reject: !0
}), tV = L.rpc.declare({
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
const tD = async ()=>tO.parse(ti(await tx())), tR = async ()=>tS.parse(await t$()), tM = async ()=>tw.parse(ti(await tI())), tU = async ()=>eG({
        restarting: e4(!0)
    }).parse(ti(await tV()));
eG({
    schema_version: e4(1),
    status: e1([
        "success",
        "error"
    ]),
    action: e1([
        "optical_on",
        "optical_off",
        "optical_status",
        "optical_reload",
        "optical_reinitialize",
        "optical_shutdown"
    ]),
    desired_enabled: e7(eM()),
    tx_enabled: e7(eM()),
    actor_state: e1([
        "enabled",
        "disabled",
        "unknown"
    ]),
    hardware_ready: eM(),
    discovery_active: eM(),
    cleanup_pending: eM(),
    error: e7(eG({
        code: eI(),
        message: eI()
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
}), eK([
    eG({
        operation_ids: eH(eD()),
        revision: eI()
    }),
    eG({
        started: e4(!0),
        mode: e1([
            "apply",
            "plan"
        ])
    }),
    eG({
        reset: e4(!0),
        device: eI()
    }),
    eG({
        operation_ids: eH(eD()),
        mode: e1([
            "apply",
            "plan"
        ]),
        reconcile: e5(eM()),
        retry: e5(eM())
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
}), eG({
    source: e1([
        "factory",
        "firmware",
        "builtin"
    ]),
    active_path: eI(),
    size: eD(),
    sha256: eI(),
    data: e5(eI()),
    factory: eG({
        detected: eM(),
        device: eI(),
        has_data: eM(),
        sha256: eI(),
        data: eI()
    }),
    firmware: eG({
        exists: eM(),
        path: eI(),
        size: eD(),
        sha256: eI(),
        data: eI()
    }),
    error: e5(eI())
}), eG({
    success: eM(),
    path: eI(),
    size: eD(),
    sha256: eI(),
    error: e5(eI())
}), eG({
    success: eM(),
    output: e5(eI()),
    error: e5(eI())
});
let tZ = eG({
    schema_version: e4(1),
    version: eI(),
    features: eG({
        acs: eM(),
        mqtt: eM(),
        "device-hl202": eM(),
        "device-hwtc": eM()
    }),
    functions: eG({
        optical: eM(),
        omci_mib: eM(),
        mqtt_telemetry: eM(),
        hl202_management: eM(),
        cwmp: eM()
    }),
    pages: eG({
        status: eM(),
        config: eM(),
        sync: eM(),
        hl202: eM(),
        hardware: eM(),
        calibration: eM(),
        about: eM()
    })
}), tW = L.rpc.declare({
    object: "luci.fttr",
    method: "get_capabilities",
    reject: !0
});
const tq = async ()=>tZ.parse(ti(await tW()));
async function tH(e) {
    if (!(await tq()).pages[e]) throw Error(_("This page is not supported by the installed FTTR build."));
}
let tF = L.view, tG = L.uci, tB = L.form;
async function tK(e, t, n) {
    try {
        let i = await e();
        t.textContent = JSON.stringify(i, null, 2), n?.(i);
    } catch (e) {
        t.textContent = String(e), n?.({
            error: String(e)
        });
    }
}
let main = tF.extend({
    async load () {
        await tH("config"), await tG.load("fttr"), tG.sections("fttr", "provisioning").length || tG.add("fttr", "provisioning", "provisioning"), tG.sections("fttr", "management").length || tG.add("fttr", "management", "management");
        let [e, t] = await Promise.all([
            tR().catch((e)=>({
                    error: String(e)
                })),
            tD().catch((e)=>({
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
        let o, s, j, A = new tB.Map("fttr", _("FTTR configuration")), C = A.section(tB.NamedSection, "acs", "acs");
        C.addremove = !1, C.anonymous = !1;
        let x = tG.sections("fttr", "provisioning")[0]?.[".name"] ?? "provisioning";
        (function(e, t, n) {
            e.tab("basic", t);
            let i = e.taboption("basic", L.form.SectionValue, "_acs", L.form.NamedSection, "acs", "acs").subsection;
            i.addremove = !1, i.anonymous = !1;
            let r = l(i, L.form.Flag, "enabled", _("Enable ACS"));
            r.default = "1", r.rmempty = !1, (r = l(i, L.form.Value, "port", _("Listen port"), "port")).default = "7547", r.rmempty = !1, (r = l(i, L.form.Value, "path", _("CWMP path"))).default = "/cwmp", r.rmempty = !1, r.validate = (e, t)=>!!t.startsWith("/") || _("The path must start with '/'."), (r = l(i, L.form.Value, "state_file", _("ACS state file"))).default = "/var/lib/fttr/acs-state.json", r.rmempty = !1, r.validate = (e, t)=>!!t.startsWith("/") || _("The state file path must be absolute."), (r = l(i, L.form.Value, "username", _("HTTP Basic username"))).optional = !0, r.rmempty = !0, (r = l(i, L.form.Value, "password", _("HTTP Basic password"))).password = !0, r.optional = !0, r.rmempty = !0;
            let o = e.taboption("basic", L.form.SectionValue, "_management", L.form.NamedSection, "management", "management").subsection;
            o.addremove = !1, (r = l(o, L.form.Flag, "enabled", _("Enable management network"))).default = "1", r.rmempty = !1, (r = d(o, "mode", _("Management application mode"), [
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
        })(C, _("Basic"), x), t = e.connectedDevices ?? [], n = e.pinning, o = new Map(t.map((e)=>[
                e.serial_number,
                e
            ])), s = (e)=>{
            let t = o.get(e), n = L.uci.sections("fttr", "device").find((t)=>t.optical_sn === e), i = t?.model || String(n?.adapter || _("Unknown model"));
            return `${i} \xb7 ${e} \xb7 ${t?.state === "o5_operation" ? _("Connected") : _("Offline")}${t?.onu_id != null ? ` \xb7 ONU ${t.onu_id}` : ""}`;
        }, C.tab("devices", _("Devices & groups")), g(p(C, "devices", "_groups", "group", _("Groups"), (e)=>{
            f(e, "_name", _("Group"), (e)=>String(L.uci.get("fttr", e, "name") || e)), l(e, L.form.Value, "name", _("Name")).modalonly = !0, c(e, "template", _("Template"), "template").modalonly = !0;
        }), z), p(C, "devices", "_devices", "device", _("Devices"), (e)=>{
            f(e, "_device", _("Device"), (e)=>{
                let t = String(L.uci.get("fttr", e, "optical_sn") || "");
                return t ? s(t) : _("New device");
            });
            let i = l(e, L.form.ListValue, "optical_sn", _("Connected device"));
            i.modalonly = !0, i.rmempty = !1, i.description = _("Lists supported devices registered on the optical link, including devices that have not sent an ACS Inform. Devices already configured are omitted when adding a new device.");
            let r = i.renderWidget;
            i.renderWidget = function(e, n, i) {
                this.keylist = [], this.vallist = [];
                let o = String(L.uci.get("fttr", e, "optical_sn") || ""), a = new Set(L.uci.sections("fttr", "device").filter((t)=>t[".name"] !== e).map((e)=>e.optical_sn));
                for (let e of t)"o5_operation" === e.state && P(e) && !a.has(e.serial_number) && this.value(e.serial_number, s(e.serial_number));
                o && !this.keylist.includes(o) && this.value(o, s(o));
                let l = i || o || this.keylist[0] || "";
                return r.call(this, e, n, l);
            }, i.validate = (e, t)=>t ? !L.uci.sections("fttr", "device").some((n)=>n[".name"] !== e && n.optical_sn === t) || _("Device already configured.") : _("Select device."), i.write = (e, t)=>{
                L.uci.set("fttr", e, "optical_sn", t);
                let n = P(o.get(t));
                n && !L.uci.get("fttr", e, "adapter") && L.uci.set("fttr", e, "adapter", n);
            };
            let u = d(e, "adapter", _("Device adapter"), [
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
            u.modalonly = !0, u.default = "generic", u.rmempty = !1, c(e, "group", _("Group"), "group").modalonly = !0;
            let p = d(e, "onu_id", _("Fixed interface"), [
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
            let m = e.option(L.form.Button, "_pin_current", _("Use current interface"));
            m.modalonly = !0, m.inputtitle = _("Pin current interface"), m.inputstyle = "apply", m.onclick = (e, n)=>{
                let r = String(i.formvalue(n) ?? L.uci.get("fttr", n, "optical_sn") ?? ""), o = t.find((e)=>e.serial_number.toUpperCase() === r.toUpperCase());
                o?.state !== "o5_operation" || null == o.onu_id ? L.ui.addNotification(null, a("p", {
                    children: _("Select a registered O5 device first.")
                }), "warning") : p.getUIElement(n)?.setValue(String(o.onu_id));
            }, p.validate = (e, t)=>!t || (/^(?:[0-9]|1[0-5])$/.test(t) ? !L.uci.sections("fttr", "device").some((n)=>{
                    if (n[".name"] === e) return !1;
                    let i = p.formvalue(n[".name"]) ?? n.onu_id;
                    return null != i && String(i) === t;
                }) || _("Interface already reserved by another device.") : _("Select an interface from fttr1 to fttr16.")), f(e, "_active_pin", _("Active allocation"), (e)=>{
                let i = String(L.uci.get("fttr", e, "optical_sn") || ""), r = n?.active[i.toUpperCase()], o = t.find((e)=>e.serial_number.toUpperCase() === i.toUpperCase())?.onu_id, a = L.uci.get("fttr", e, "onu_id"), s = (null == a || "" === a ? void 0 : Number(a)) !== r;
                return [
                    null != o ? `fttr${o + 1}` : _("Not registered"),
                    null != r ? `${_("Reserved")}: fttr${r + 1}` : _("Automatic allocation"),
                    s ? _("Pending restart") : ""
                ].filter(Boolean).join(" \xb7 ");
            });
            let g = d(e, "cwmp_contract", _("CWMP contract"), [
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
            g.modalonly = !0, g.default = "auto", g.rmempty = !1, g.description = _("Independent of the optical adapter. Parameter paths, types and writable evidence are discovered before synchronization. Unverified candidates do not authorize writes.");
            let h = l(e, L.form.Flag, "connection_request", _("Supports Connection Request"));
            h.modalonly = !0, h.default = "1", h.rmempty = !1, h.description = _("Independent per device; enabled by default for all adapters. Enabled: on-demand sessions with periodic Inform enabled and an interval of at most 12 hours (backend default: 43200 seconds). Disabled: manually set PeriodicInformEnable to true and PeriodicInformInterval to at most 180 seconds; no interval is written automatically. Requires reachable CWMP, verified standard parameters, HTTP Digest support, a prior Inform with a ConnectionRequestURL and valid CPE credentials. Firmware support is not guaranteed. Acceptance is not proof of a session or completed RPCs.");
            let y = l(e, L.form.Flag, "connection_request_defaults", _("Use backend Connection Request defaults"));
            y.modalonly = !0, y.default = "1", y.rmempty = !1, y.retain = !0, y.depends("connection_request", "1"), y.cfgvalue = (e)=>{
                let t = L.uci.get("fttr", e, "connection_request_defaults");
                return null != t ? String(t) : L.uci.get("fttr", e, "connection_request_username") && L.uci.get("fttr", e, "connection_request_password") ? "0" : "1";
            }, y.description = _("Uses a backend-reserved profile; factory credentials are not yet verified. Disable to enter this CPE's existing credentials and port. Saved custom values are retained while hidden.");
            let v = l(e, L.form.Value, "connection_request_username", _("CPE Connection Request username"));
            v.modalonly = !0, v.optional = !0, v.rmempty = !0, v.retain = !0, v.depends({
                connection_request: "1",
                connection_request_defaults: "0"
            }), v.description = _("Enter this CPE's existing Connection Request credentials, not the ACS inbound HTTP Basic credentials. No custom credential defaults are assumed.");
            let b = l(e, L.form.Value, "connection_request_password", _("CPE Connection Request password"));
            b.modalonly = !0, b.password = !0, b.optional = !0, b.rmempty = !0, b.retain = !0, b.depends({
                connection_request: "1",
                connection_request_defaults: "0"
            }), b.description = _("Saved custom values are retained when Connection Requests are disabled or backend defaults are selected. Leave these fields unchanged to preserve their saved values.");
            let w = l(e, L.form.Value, "connection_request_port", _("CPE Connection Request port"), "port");
            w.modalonly = !0, w.default = "7547", w.rmempty = !1, w.retain = !0, w.depends({
                connection_request: "1",
                connection_request_defaults: "0"
            });
            let S = l(e, L.form.Flag, "omci_management", _("Provision management VLAN and ACS via OMCI"));
            S.modalonly = !0, S.default = "0", S.rmempty = !1, S.description = _("Disabled by default. Uses the global management VLAN, priority and ACS URL for this device only, subject to management application authorization. Disabling skips future OMCI management writes and retains existing ONU settings. ME readback does not prove WAN creation or successful Inform; K155 may clear its local ACS URL when enabled.");
            let z = d(e, "wifi_cleanup", _("Unconfigured WLANs"), [
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
            z.modalonly = !0, z.default = "disable", z.description = _("By default, extra WLANs are disabled and retained. Deleting objects is destructive and should only be selected deliberately.");
        }), C.tab("templates", _("Templates")), g(p(C, "templates", "_templates", "template", _("Templates"), (e)=>{
            for (let [t, n] of (e.description = _("Create a template first, then add its SSIDs and networks in their tabs. Each editor changes one item. Confirm stages changes; Save & Apply applies the page configuration.") + " " + _("Deleting an unused template also deletes its SSIDs and networks."), f(e, "_name", _("Template"), (e)=>String(L.uci.get("fttr", e, "name") || _("New template"))), [
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
            ]))f(e, `_${t}_count`, n, (e)=>String(L.uci.sections("fttr", t).filter((t)=>t.template === e).length));
            let t = l(e, L.form.Value, "name", _("Name"));
            t.modalonly = !0, t.rmempty = !1;
        }), S), C.tab("wifi", _("SSIDs")), g(p(C, "wifi", "_wifi", "wifi", _("SSIDs"), (e)=>{
            e.description = _("Create SSIDs here before selecting them in a network. Every SSID belongs to one template.");
            let t = m(e), n = t.validate;
            t.validate = function(e, t) {
                let i = n.call(this, e, t);
                return !0 !== i ? i : !v().network.some((n)=>y(n.ssid).includes(e) && n.template !== t) || _("This SSID is bound to a network. Remove its network bindings before changing the template.");
            }, f(e, "_ssid", _("SSID"), (e)=>String(L.uci.get("fttr", e, "ssid") || e)), f(e, "_radio", _("Band"), (e)=>"2g" === L.uci.get("fttr", e, "radio") ? "2.4 GHz" : "5 GHz"), f(e, "_security", _("Security"), (e)=>{
                let t = String(L.uci.get("fttr", e, "security") || "");
                return "none" === t ? _("None (Open)") : t || _("Keep current key");
            });
            let i = l(e, L.form.Value, "ssid", _("SSID"));
            i.modalonly = !0, i.rmempty = !1, i.validate = (e, t)=>new TextEncoder().encode(t).length >= 1 && new TextEncoder().encode(t).length <= 32 || _("SSID must be 1\u201332 bytes.");
            let r = d(e, "radio", _("Band"), [
                [
                    "2g",
                    "2.4 GHz"
                ],
                [
                    "5g",
                    "5 GHz"
                ]
            ]);
            r.modalonly = !0, r.default = "2g", d(e, "security", _("Security"), [
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
        }), k), C.tab("networks", _("Networks")), p(C, "networks", "_networks", "network", _("Networks"), (e)=>{
            e.description = _("Networks bind VLAN services to wired ports and optional SSIDs within one template.");
            let t = m(e);
            f(e, "_name", _("Network"), (e)=>String(L.uci.get("fttr", e, "name") || _("New network"))), f(e, "_vlan", _("VLAN"), (e)=>String(L.uci.get("fttr", e, "vlan") || "0")), f(e, "_services", _("WAN Service List (multi-select)"), (e)=>y(L.uci.get("fttr", e, "service_list")).join(", ")), f(e, "_bindings", _("LAN / WLAN port bindings"), (e)=>[
                    ...y(L.uci.get("fttr", e, "port")).map((e)=>e.toUpperCase()),
                    ...y(L.uci.get("fttr", e, "ssid")).map((e)=>String(L.uci.get("fttr", e, "ssid") || e))
                ].join(", "));
            let n = l(e, L.form.Value, "name", _("Name"));
            n.modalonly = !0, n.rmempty = !1;
            let i = l(e, L.form.MultiValue, "service_list", _("WAN Service List (multi-select)"));
            for (let e of (i.modalonly = !0, i.rmempty = !1, i.validate = (e, t)=>N(t), i.description = _("Select at least one of INTERNET, OTHER, IPTV, and VOIP for each custom VLAN. TR069 is reserved for OMCI."), h))i.value(e, e);
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
            r.modalonly = !0, r.rmempty = !0, r.placeholder = _("No SSIDs selected"), r.description = _("Optional for wired-only networks. Only SSIDs from the selected template are listed. Changing the template clears the SSID selection."), u(r, function(e) {
                let t = this.section.getOption("template");
                return w(v(), String(t?.formvalue(e) ?? L.uci.get("fttr", e, "template") ?? ""));
            }), r.validate = function(e, t) {
                let n = String(this.section.getOption("template").formvalue(e) ?? L.uci.get("fttr", e, "template") ?? ""), i = new Set(w(v(), n).map((e)=>{
                    let [t] = e;
                    return t;
                }));
                return !!y(t).every((e)=>i.has(e)) || _("Select SSIDs belonging to this network's template.");
            }, t.onchange = function(e, t, n) {
                let i = this.section.getOption("ssid").getUIElement(t);
                if (!i) return;
                let r = w(v(), n);
                i.clearChoices(!0), i.addChoices(r.map((e)=>{
                    let [t] = e;
                    return t;
                }), Object.fromEntries(r));
            };
            let o = l(e, L.form.MultiValue, "port", _("Ports"));
            o.modalonly = !0;
            for(let e = 1; e <= 4; e++)o.value(`lan${e}`, `LAN${e}`);
        }), this.handleSave = ()=>A.save(()=>{
                let e = v(), t = T(e);
                if (t.length) throw Error(t.map((t)=>{
                    let n = e[t.kind].find((e)=>e[".name"] === t.sectionId), i = e.template.find((e)=>e[".name"] === n?.template), r = [
                        i && b(i),
                        n ? b(n) : t.sectionId
                    ].filter(Boolean).join(" / ");
                    return `${r} [${t.sectionId}.${t.field}]: ${t.message}`;
                }).join("\n"));
                L.uci.unset("fttr", "acs", "listen"), L.uci.unset("fttr", "management", "acs_url");
            });
        let $ = a("pre", {
            style: "white-space:pre-wrap;overflow-wrap:anywhere",
            "aria-live": "polite"
        }), I = null, V = (e)=>{
            var t;
            j = e?.error, I?.parentNode?.removeChild(I), I = null, e?.error && (I = L.ui.addNotification(_("FTTR configuration check failed"), (t = {
                children: [
                    a("p", {
                        children: String(e.error)
                    }),
                    a("button", {
                        class: "cbi-button cbi-button-action",
                        type: "button",
                        onclick: ()=>O(C, j),
                        children: _("Review and repair configuration")
                    })
                ]
            }, a("div", t)), "error"));
        };
        V(e);
        let D = (r = {
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
                    onclick: ()=>O(C, j),
                    children: _("Review and repair configuration")
                }),
                " ",
                a("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    onclick: ()=>tK(tR, $, V),
                    children: _("Check")
                }),
                " ",
                a("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    disabled: !L.hasViewPermission(),
                    onclick: ()=>tK(async ()=>(await tM(), await tR()), $, V),
                    children: _("Reload")
                }),
                " ",
                a("button", {
                    class: "cbi-button cbi-button-negative",
                    type: "button",
                    disabled: !L.hasViewPermission(),
                    onclick: ()=>tK(tU, $),
                    children: _("Restart")
                }),
                $
            ]
        }, a("div", r));
        return C.tab("diagnostics", _("Configuration diagnostics")), C.taboption("diagnostics", tB.DummyValue, "_diagnostics", "").render = ()=>Promise.resolve(D), A.render();
    }
});

return main;