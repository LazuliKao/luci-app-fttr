
// UNUSED EXPORTS: main

;// CONCATENATED MODULE: ./node_modules/.pnpm/@lazulikao+luci-types@https_685a81b9ead15f36368ce6e6ebcf4a27/node_modules/@lazulikao/luci-types/src/jsx/jsx-factory.ts
/**
 * JSX Fragment symbol
 */ const Fragment = Symbol.for("jsx.fragment");
function normalizeChildren(input) {
    let out = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
    for (const child of input){
        if (child == null || typeof child === "boolean") continue;
        if (Array.isArray(child)) {
            normalizeChildren(child, out);
        } else {
            out.push(child instanceof Node ? child : String(child));
        }
    }
    return out;
}
function isPropertyBag(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}
function isEventListener(value) {
    return typeof value === "function";
}
function createJsxNode(type, config) {
    const { children, ...props } = isPropertyBag(config) ? config : {};
    const childArray = children == null ? [] : Array.isArray(children) ? children : [
        children
    ];
    const filteredChildren = normalizeChildren(childArray);
    if (type === Fragment) {
        const fragment = document.createDocumentFragment();
        fragment.append(...filteredChildren);
        return fragment;
    }
    if (typeof type === "function") {
        const result = Reflect.apply(type, undefined, [
            {
                ...props,
                children: filteredChildren
            }
        ]);
        if (!(result instanceof Node)) {
            throw new TypeError("JSX components must return a DOM Node");
        }
        return result;
    }
    if (typeof type !== "string") {
        throw new TypeError("JSX element types must be tag names or component functions");
    }
    const eventHandlers = {};
    const finalProps = {
        ...props
    };
    for (const [key, value] of Object.entries(finalProps)){
        if (key.startsWith("on") && isEventListener(value)) {
            eventHandlers[key] = value;
            delete finalProps[key];
        } else if (typeof value === "boolean") {
            if (value) {
                finalProps[key] = key;
            } else {
                delete finalProps[key];
            }
        }
    }
    const hasProps = Object.keys(finalProps).length > 0;
    const element = !hasProps ? filteredChildren.length > 1 ? E(type, {}, filteredChildren) : E(type, {}, filteredChildren[0]) : filteredChildren.length > 1 ? E(type, finalProps, filteredChildren) : E(type, finalProps, filteredChildren[0]);
    for (const [eventName, handler] of Object.entries(eventHandlers)){
        const eventType = eventName.slice(2).toLowerCase();
        element.addEventListener(eventType, handler);
    }
    return element;
}
/**
 * JSX automatic runtime - production (single/no children)
 */ function jsx(type, config) {
    return createJsxNode(type, config);
}
/**
 * JSX automatic runtime - production (multiple static children)
 */ function jsxs(type, config) {
    return createJsxNode(type, config);
}
/**
 * JSX automatic runtime - development mode
 */ function jsxDEV(type, config) {
    return createJsxNode(type, config);
}

;// CONCATENATED MODULE: ./node_modules/.pnpm/@lazulikao+luci-types@https_685a81b9ead15f36368ce6e6ebcf4a27/node_modules/@lazulikao/luci-types/src/jsx/jsx-runtime.ts


;// CONCATENATED MODULE: ./src/view/hardware.tsx

// SPDX-License-Identifier: Apache-2.0
const view = L.view;
const rpc = L.rpc;
const getStatus = rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: true
});
const hardware_text = (value)=>value === null || value === undefined || value === "" ? "\u2014" : String(value);
function rows(items) {
    return /*#__PURE__*/ jsx("table", {
        class: "table",
        children: /*#__PURE__*/ jsx("tbody", {
            children: items.map((param)=>{
                let [label, value] = param;
                return /*#__PURE__*/ jsxs("tr", {
                    children: [
                        /*#__PURE__*/ jsx("th", {
                            children: label
                        }),
                        /*#__PURE__*/ jsx("td", {
                            children: hardware_text(value)
                        })
                    ]
                });
            })
        })
    });
}
function renderHardware(status) {
    const optical = status.optical_transceiver ?? {};
    const onus = Array.isArray(status.sub_gateways) ? status.sub_gateways : [];
    return /*#__PURE__*/ jsxs("div", {
        class: "cbi-map",
        children: [
            /*#__PURE__*/ jsx("h2", {
                children: _("FTTR hardware status")
            }),
            /*#__PURE__*/ jsxs("div", {
                class: "cbi-section",
                children: [
                    /*#__PURE__*/ jsx("h3", {
                        children: _("Controller hardware")
                    }),
                    rows([
                        [
                            _('FPGA status'),
                            status.fpga_status
                        ],
                        [
                            _('Optical transceiver'),
                            optical.model
                        ],
                        [
                            _('TX wavelength'),
                            optical.wavelength_tx_nm === undefined ? undefined : `${optical.wavelength_tx_nm} nm`
                        ],
                        [
                            _('RX wavelength'),
                            optical.wavelength_rx_nm === undefined ? undefined : `${optical.wavelength_rx_nm} nm`
                        ],
                        [
                            _('Downlink PHY rate'),
                            optical.phy_rate_downlink_gbps === undefined ? undefined : `${optical.phy_rate_downlink_gbps} Gbps`
                        ],
                        [
                            _('Uplink PHY rate'),
                            optical.phy_rate_uplink_gbps === undefined ? undefined : `${optical.phy_rate_uplink_gbps} Gbps`
                        ],
                        [
                            _('CDR lock'),
                            optical.cdr_locked === undefined ? undefined : optical.cdr_locked ? _('Locked') : _('Unlocked')
                        ]
                    ])
                ]
            }),
            onus.length ? onus.map((onu)=>{
                const identity = onu.identity ?? {};
                const softwareImages = identity.software_images ?? [];
                const freshness = onu.identity ? onu.identity_current ? _("Current registration") : _("Cached identity") : _("Not collected");
                return /*#__PURE__*/ jsxs("div", {
                    class: "cbi-section",
                    children: [
                        /*#__PURE__*/ jsx("h3", {
                            children: _("Sub-gateway %s \u2014 %s").format(String(onu.onu_id), hardware_text(onu.model))
                        }),
                        rows([
                            [
                                _('Vendor'),
                                onu.vendor
                            ],
                            [
                                _('Optical serial'),
                                onu.serial_number
                            ],
                            [
                                _('Registration state'),
                                onu.state
                            ],
                            [
                                _('Identity source'),
                                freshness
                            ],
                            [
                                _('Identity age'),
                                onu.identity_age_seconds === undefined ? undefined : `${onu.identity_age_seconds} s`
                            ],
                            [
                                _('Equipment ID'),
                                identity.equipment_id ?? onu.model
                            ],
                            [
                                _('Hardware version'),
                                identity.hardware_version ?? onu.hardware_version
                            ],
                            [
                                _('Firmware version'),
                                onu.firmware_version
                            ],
                            [
                                _('Software images'),
                                softwareImages.length ? softwareImages.join(", ") : undefined
                            ],
                            [
                                _('OMCC version'),
                                identity.omcc_version === undefined ? undefined : `0x${identity.omcc_version.toString(16).padStart(2, "0")}`
                            ],
                            [
                                _('Identity read errors'),
                                identity.errors?.length ? identity.errors.join("; ") : undefined
                            ]
                        ])
                    ]
                });
            }) : /*#__PURE__*/ jsx("div", {
                class: "cbi-section",
                children: /*#__PURE__*/ jsx("p", {
                    children: _("No sub-gateways are currently registered.")
                })
            }),
            /*#__PURE__*/ jsx("p", {
                class: "cbi-footer",
                children: _("Identity information is read-only and limited to fields provided by fttrctl status.")
            })
        ]
    });
}
let pageRoot = null;
const main = view.extend({
    load () {
        return getStatus();
    },
    render (status) {
        pageRoot = renderHardware(status);
        return pageRoot;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});



return main;