
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


;// CONCATENATED MODULE: ./src/view/index.tsx

// SPDX-License-Identifier: Apache-2.0
const view = L.view;
const rpc = L.rpc;
const poll = L.Poll;
const getStatus = rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: true
});
const getNetworkDevices = rpc.declare({
    object: "luci-rpc",
    method: "getNetworkDevices",
    expect: {
        "": []
    },
    reject: true
});
const view_text = (value)=>value === null || value === undefined || value === "" ? "\u2014" : String(value);
const badge = (value, label)=>/*#__PURE__*/ jsx("span", {
        class: value ? "label success" : "label warning",
        children: label
    });
function formatBytes(value) {
    if (value === undefined || !Number.isFinite(value) || value < 0) return "\u2014";
    if (value < 1024) return `${value} B`;
    const units = [
        "KiB",
        "MiB",
        "GiB",
        "TiB"
    ];
    let amount = value / 1024;
    let unit = 0;
    while(amount >= 1024 && unit < units.length - 1){
        amount /= 1024;
        unit++;
    }
    return `${amount.toFixed(1)} ${units[unit]}`;
}
function formatPackets(value) {
    if (value === undefined || !Number.isFinite(value) || value < 0) return "\u2014";
    if (value < 1000) return `${value} ${_("Pkts.")}`;
    return `${(value / 1000).toFixed(2)} K${_("Pkts.")}`;
}
function formatLinkSpeed(speed) {
    if (speed === undefined || !Number.isFinite(speed) || speed <= 0) return _("Unknown");
    if (speed >= 1000) return `${speed / 1000}\u{202F}GbE`;
    return `${speed}\u{202F}MbE`;
}
function renderPorts(status, devices) {
    const portByNumber = new Map((status.switch_ports ?? []).map((port)=>[
            port.port,
            port
        ]));
    const deviceByName = new Map();
    for (const device of devices){
        const name = device.device ?? device.name ?? device.ifname;
        if (name) deviceByName.set(name, device);
    }
    const ports = Array.from({
        length: 16
    }, (_port, index)=>{
        const number = index + 1;
        const port = portByNumber.get(number);
        const ifname = port?.interface ?? `fttr${number}`;
        const device = deviceByName.get(ifname);
        const stats = device?.stats ?? device?.statistics;
        const carrier = port?.carrier ?? device?.carrier ?? (device?.link?.speed !== undefined ? true : undefined);
        const onu = (status.sub_gateways ?? []).find((item)=>item.onu_id === port?.onu_id);
        const state = port?.link_state ?? port?.status ?? (device ? carrier ? _("Link up") : _("Link down") : _("Unavailable"));
        const connected = carrier === true;
        const icon = connected ? "port_up.svg" : "port_down.svg";
        const barColor = connected ? "144, 240, 144" : "240, 144, 144";
        const rxBytes = stats?.rx_bytes;
        const txBytes = stats?.tx_bytes;
        return /*#__PURE__*/ jsxs("div", {
            class: "ifacebox",
            style: "margin:.25em;width:100px",
            children: [
                /*#__PURE__*/ jsx("div", {
                    class: "ifacebox-head",
                    style: "font-weight:bold",
                    children: ifname
                }),
                /*#__PURE__*/ jsxs("div", {
                    class: "ifacebox-body",
                    children: [
                        /*#__PURE__*/ jsx("img", {
                            src: `/luci-static/resources/icons/${icon}`
                        }),
                        /*#__PURE__*/ jsx("br", {}),
                        connected ? /*#__PURE__*/ jsx("span", {
                            title: _("\u901F\u5EA6\uFF1A%s Mbit/s\uFF0C\u53CC\u5DE5\uFF1A%s").format(view_text(device?.link?.speed), view_text(device?.link?.duplex)),
                            children: formatLinkSpeed(device?.link?.speed)
                        }) : /*#__PURE__*/ jsx("span", {
                            children: carrier === false ? _("Disconnected") : _("Unknown")
                        })
                    ]
                }),
                /*#__PURE__*/ jsxs("div", {
                    class: "ifacebox-head cbi-tooltip-container",
                    style: "display:flex",
                    children: [
                        /*#__PURE__*/ jsx("div", {
                            style: `flex:1;height:3px;opacity:${connected ? 1 : 0.25};background-color:rgb(${barColor})`
                        }),
                        /*#__PURE__*/ jsxs("span", {
                            class: "cbi-tooltip left",
                            children: [
                                /*#__PURE__*/ jsxs("strong", {
                                    children: [
                                        _("Port status"),
                                        ": "
                                    ]
                                }),
                                view_text(state),
                                /*#__PURE__*/ jsx("br", {}),
                                /*#__PURE__*/ jsxs("strong", {
                                    children: [
                                        _("ONU"),
                                        ": "
                                    ]
                                }),
                                view_text(port?.onu_sn ?? onu?.serial_number ?? port?.onu_id),
                                /*#__PURE__*/ jsx("br", {}),
                                /*#__PURE__*/ jsxs("strong", {
                                    children: [
                                        _("MAC address"),
                                        ": "
                                    ]
                                }),
                                view_text(device?.mac)
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ jsx("div", {
                    class: "ifacebox-body",
                    children: /*#__PURE__*/ jsxs("div", {
                        class: "cbi-tooltip-container",
                        style: "text-align:left;font-size:80%",
                        children: [
                            "\u25B2\u202F",
                            formatBytes(txBytes),
                            /*#__PURE__*/ jsx("br", {}),
                            "\u25BC\u202F",
                            formatBytes(rxBytes),
                            /*#__PURE__*/ jsx("span", {
                                class: "cbi-tooltip",
                                children: /*#__PURE__*/ jsxs("span", {
                                    children: [
                                        /*#__PURE__*/ jsxs("span", {
                                            class: "nowrap",
                                            children: [
                                                /*#__PURE__*/ jsxs("strong", {
                                                    children: [
                                                        _("Received bytes"),
                                                        ": "
                                                    ]
                                                }),
                                                formatBytes(rxBytes)
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx("br", {}),
                                        /*#__PURE__*/ jsxs("span", {
                                            class: "nowrap",
                                            children: [
                                                /*#__PURE__*/ jsxs("strong", {
                                                    children: [
                                                        _("Received packets"),
                                                        ": "
                                                    ]
                                                }),
                                                formatPackets(stats?.rx_packets)
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx("br", {}),
                                        /*#__PURE__*/ jsxs("span", {
                                            class: "nowrap",
                                            children: [
                                                /*#__PURE__*/ jsxs("strong", {
                                                    children: [
                                                        _("Received multicast"),
                                                        ": "
                                                    ]
                                                }),
                                                formatPackets(stats?.rx_multicast ?? stats?.multicast)
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx("br", {}),
                                        /*#__PURE__*/ jsxs("span", {
                                            class: "nowrap",
                                            children: [
                                                /*#__PURE__*/ jsxs("strong", {
                                                    children: [
                                                        _("Receive errors"),
                                                        ": "
                                                    ]
                                                }),
                                                formatPackets(stats?.rx_errors)
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx("br", {}),
                                        /*#__PURE__*/ jsxs("span", {
                                            class: "nowrap",
                                            children: [
                                                /*#__PURE__*/ jsxs("strong", {
                                                    children: [
                                                        _("Receive dropped"),
                                                        ": "
                                                    ]
                                                }),
                                                formatPackets(stats?.rx_dropped)
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx("br", {}),
                                        /*#__PURE__*/ jsxs("span", {
                                            class: "nowrap",
                                            children: [
                                                /*#__PURE__*/ jsxs("strong", {
                                                    children: [
                                                        _("Transmitted bytes"),
                                                        ": "
                                                    ]
                                                }),
                                                formatBytes(txBytes)
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx("br", {}),
                                        /*#__PURE__*/ jsxs("span", {
                                            class: "nowrap",
                                            children: [
                                                /*#__PURE__*/ jsxs("strong", {
                                                    children: [
                                                        _("Transmitted packets"),
                                                        ": "
                                                    ]
                                                }),
                                                formatPackets(stats?.tx_packets)
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx("br", {}),
                                        /*#__PURE__*/ jsxs("span", {
                                            class: "nowrap",
                                            children: [
                                                /*#__PURE__*/ jsxs("strong", {
                                                    children: [
                                                        _("Transmit errors"),
                                                        ": "
                                                    ]
                                                }),
                                                formatPackets(stats?.tx_errors)
                                            ]
                                        }),
                                        /*#__PURE__*/ jsx("br", {}),
                                        /*#__PURE__*/ jsxs("span", {
                                            class: "nowrap",
                                            children: [
                                                /*#__PURE__*/ jsxs("strong", {
                                                    children: [
                                                        _("Transmit dropped"),
                                                        ": "
                                                    ]
                                                }),
                                                formatPackets(stats?.tx_dropped)
                                            ]
                                        })
                                    ]
                                })
                            })
                        ]
                    })
                })
            ]
        });
    });
    return /*#__PURE__*/ jsx("div", {
        style: "display:grid;grid-template-columns:repeat(auto-fit, minmax(100px, 1fr));margin-bottom:1em;align-items:center;justify-items:center;text-align:center",
        children: ports
    });
}
function renderTable(headings, rows, empty) {
    return /*#__PURE__*/ jsx("div", {
        class: "table-wrapper",
        children: /*#__PURE__*/ jsxs("table", {
            class: "table",
            children: [
                /*#__PURE__*/ jsx("thead", {
                    children: /*#__PURE__*/ jsx("tr", {
                        children: headings.map((heading)=>/*#__PURE__*/ jsx("th", {
                                children: heading
                            }))
                    })
                }),
                /*#__PURE__*/ jsx("tbody", {
                    children: rows.length ? rows.map((row)=>/*#__PURE__*/ jsx("tr", {
                            children: row.map((cell)=>/*#__PURE__*/ jsx("td", {
                                    children: cell
                                }))
                        })) : /*#__PURE__*/ jsx("tr", {
                        children: /*#__PURE__*/ jsx("td", {
                            colSpan: headings.length,
                            children: empty
                        })
                    })
                })
            ]
        })
    });
}
function renderStatus(status, devices) {
    const onus = Array.isArray(status.sub_gateways) ? status.sub_gateways : [];
    const optical = status.optical_transceiver ?? {};
    return /*#__PURE__*/ jsxs("div", {
        class: "cbi-map",
        children: [
            /*#__PURE__*/ jsx("h2", {
                children: _("FTTR overview")
            }),
            /*#__PURE__*/ jsxs("div", {
                class: "cbi-section",
                children: [
                    /*#__PURE__*/ jsx("h3", {
                        children: _("Controller")
                    }),
                    /*#__PURE__*/ jsx("table", {
                        class: "table",
                        children: /*#__PURE__*/ jsxs("tbody", {
                            children: [
                                /*#__PURE__*/ jsxs("tr", {
                                    children: [
                                        /*#__PURE__*/ jsx("th", {
                                            children: _("FPGA")
                                        }),
                                        /*#__PURE__*/ jsx("td", {
                                            children: view_text(status.fpga_status)
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsxs("tr", {
                                    children: [
                                        /*#__PURE__*/ jsx("th", {
                                            children: _("Optical module")
                                        }),
                                        /*#__PURE__*/ jsx("td", {
                                            children: view_text(optical.model)
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsxs("tr", {
                                    children: [
                                        /*#__PURE__*/ jsx("th", {
                                            children: _("CDR lock")
                                        }),
                                        /*#__PURE__*/ jsx("td", {
                                            children: optical.cdr_locked === undefined ? "\u2014" : badge(optical.cdr_locked, optical.cdr_locked ? _("Locked") : _("Unlocked"))
                                        })
                                    ]
                                })
                            ]
                        })
                    })
                ]
            }),
            /*#__PURE__*/ jsxs("div", {
                class: "cbi-section",
                children: [
                    /*#__PURE__*/ jsx("h3", {
                        children: _("Sub-gateways")
                    }),
                    renderTable([
                        _('ONU ID'),
                        _('Vendor'),
                        _('Model'),
                        _('Optical serial'),
                        _('Registration'),
                        _('Business'),
                        _('Firmware'),
                        _('Data interface')
                    ], onus.map((onu)=>[
                            onu.onu_id,
                            view_text(onu.vendor),
                            view_text(onu.identity?.equipment_id ?? onu.model),
                            view_text(onu.serial_number),
                            badge(onu.state === "O5Operation", onu.state),
                            view_text(onu.business_status),
                            view_text(onu.identity?.software_images?.join(", ") ?? onu.firmware_version),
                            view_text(onu.data_path?.interface)
                        ]), _("No registered sub-gateways."))
                ]
            }),
            /*#__PURE__*/ jsxs("div", {
                class: "cbi-section",
                children: [
                    /*#__PURE__*/ jsx("h3", {
                        children: _("Downstream ports")
                    }),
                    renderPorts(status, devices)
                ]
            })
        ]
    });
}
let pageRoot = null;
const main = view.extend({
    async load () {
        const [status, deviceResult] = await Promise.all([
            getStatus(),
            getNetworkDevices().catch((error)=>{
                console.warn("Failed to load network device details", error);
                return [];
            })
        ]);
        return {
            status,
            devices: deviceResult
        };
    },
    render (data) {
        pageRoot = renderStatus(data.status, data.devices);
        poll.add(async ()=>{
            if (!pageRoot?.isConnected) return;
            try {
                const [status, devices] = await Promise.all([
                    getStatus(),
                    getNetworkDevices().catch(()=>[])
                ]);
                const next = renderStatus(status, devices);
                pageRoot.replaceWith(next);
                pageRoot = next;
            } catch (error) {
                console.error("Failed to refresh FTTR status", error);
            }
        }, 10);
        return pageRoot;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});


return main;