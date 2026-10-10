
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
function createPortCard(number) {
    const element = /*#__PURE__*/ jsxs("div", {
        class: "ifacebox",
        style: "margin:.25em;width:100px",
        children: [
            /*#__PURE__*/ jsx("div", {
                class: "ifacebox-head",
                style: "font-weight:bold",
                children: /*#__PURE__*/ jsx("span", {})
            }),
            /*#__PURE__*/ jsxs("div", {
                class: "ifacebox-body",
                children: [
                    /*#__PURE__*/ jsx("img", {
                        src: "/luci-static/resources/icons/port_down.svg",
                        alt: "",
                        "aria-hidden": "true"
                    }),
                    /*#__PURE__*/ jsx("br", {}),
                    /*#__PURE__*/ jsx("span", {
                        children: _("Unknown")
                    })
                ]
            }),
            /*#__PURE__*/ jsxs("div", {
                class: "ifacebox-head cbi-tooltip-container",
                style: "display:flex",
                children: [
                    /*#__PURE__*/ jsx("div", {
                        style: "flex:1;height:3px;opacity:0.25;background-color:rgb(240, 144, 144)"
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
                            /*#__PURE__*/ jsx("span", {}),
                            /*#__PURE__*/ jsx("br", {}),
                            /*#__PURE__*/ jsxs("strong", {
                                children: [
                                    _("ONU"),
                                    ": "
                                ]
                            }),
                            /*#__PURE__*/ jsx("span", {}),
                            /*#__PURE__*/ jsx("br", {}),
                            /*#__PURE__*/ jsxs("strong", {
                                children: [
                                    _("MAC address"),
                                    ": "
                                ]
                            }),
                            /*#__PURE__*/ jsx("span", {})
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
                        /*#__PURE__*/ jsx("span", {}),
                        /*#__PURE__*/ jsx("br", {}),
                        "\u25BC\u202F",
                        /*#__PURE__*/ jsx("span", {}),
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
                                            /*#__PURE__*/ jsx("span", {})
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
                                            /*#__PURE__*/ jsx("span", {})
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
                                            /*#__PURE__*/ jsx("span", {})
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
                                            /*#__PURE__*/ jsx("span", {})
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
                                            /*#__PURE__*/ jsx("span", {})
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
                                            /*#__PURE__*/ jsx("span", {})
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
                                            /*#__PURE__*/ jsx("span", {})
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
                                            /*#__PURE__*/ jsx("span", {})
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
                                            /*#__PURE__*/ jsx("span", {})
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
    const spans = element.querySelectorAll("span");
    const ifnameNode = spans[0];
    const speedNode = spans[1];
    const portStateNode = spans[3];
    const onuNode = spans[4];
    const macNode = spans[5];
    const txSummaryNode = spans[6];
    const rxSummaryNode = spans[7];
    const rxBytesNode = spans[11];
    const rxPacketsNode = spans[12];
    const rxMulticastNode = spans[13];
    const rxErrorsNode = spans[14];
    const rxDroppedNode = spans[15];
    const txBytesNode = spans[16];
    const txPacketsNode = spans[17];
    const txErrorsNode = spans[18];
    const txDroppedNode = spans[19];
    const iconNode = element.getElementsByTagName("img").item(0);
    if (!iconNode) throw new Error("Port card icon is missing");
    const linkBarNode = element.children.item(2).children.item(0);
    return {
        element,
        update (status, devices) {
            const port = (status.switch_ports ?? []).find((item)=>item.port === number);
            const ifname = port?.interface ?? `fttr${number}`;
            const device = devices.get(ifname);
            const stats = device?.stats ?? device?.statistics;
            const carrier = port?.carrier ?? device?.carrier ?? (device?.link?.speed !== undefined ? true : undefined);
            const onu = (status.sub_gateways ?? []).find((item)=>item.onu_id === port?.onu_id);
            const connected = carrier === true;
            const rxBytes = stats?.rx_bytes;
            const txBytes = stats?.tx_bytes;
            ifnameNode.textContent = ifname;
            iconNode.setAttribute("src", `/luci-static/resources/icons/${connected ? "port_up.svg" : "port_down.svg"}`);
            speedNode.textContent = connected ? formatLinkSpeed(device?.link?.speed) : carrier === false ? _("Disconnected") : _("Unknown");
            speedNode.setAttribute("title", _("\u901F\u5EA6\uFF1A%s Mbit/s\uFF0C\u53CC\u5DE5\uFF1A%s").format(view_text(device?.link?.speed), view_text(device?.link?.duplex)));
            linkBarNode.style.opacity = connected ? "1" : "0.25";
            linkBarNode.style.backgroundColor = connected ? "rgb(144, 240, 144)" : "rgb(240, 144, 144)";
            portStateNode.textContent = view_text(port?.link_state ?? port?.status ?? (device ? carrier ? _("Link up") : _("Link down") : _("Unavailable")));
            onuNode.textContent = view_text(port?.onu_sn ?? onu?.serial_number ?? port?.onu_id);
            macNode.textContent = view_text(device?.mac);
            txSummaryNode.textContent = formatBytes(txBytes);
            rxSummaryNode.textContent = formatBytes(rxBytes);
            rxBytesNode.textContent = formatBytes(rxBytes);
            rxPacketsNode.textContent = formatPackets(stats?.rx_packets);
            rxMulticastNode.textContent = formatPackets(stats?.rx_multicast ?? stats?.multicast);
            rxErrorsNode.textContent = formatPackets(stats?.rx_errors);
            rxDroppedNode.textContent = formatPackets(stats?.rx_dropped);
            txBytesNode.textContent = formatBytes(txBytes);
            txPacketsNode.textContent = formatPackets(stats?.tx_packets);
            txErrorsNode.textContent = formatPackets(stats?.tx_errors);
            txDroppedNode.textContent = formatPackets(stats?.tx_dropped);
        }
    };
}
function createOnuRow(onu) {
    const element = /*#__PURE__*/ jsxs("tr", {
        children: [
            /*#__PURE__*/ jsx("td", {
                children: /*#__PURE__*/ jsx("span", {})
            }),
            /*#__PURE__*/ jsx("td", {
                children: /*#__PURE__*/ jsx("span", {})
            }),
            /*#__PURE__*/ jsx("td", {
                children: /*#__PURE__*/ jsx("span", {})
            }),
            /*#__PURE__*/ jsx("td", {
                children: /*#__PURE__*/ jsx("span", {})
            }),
            /*#__PURE__*/ jsx("td", {
                children: /*#__PURE__*/ jsx("span", {})
            }),
            /*#__PURE__*/ jsx("td", {
                children: /*#__PURE__*/ jsx("span", {})
            }),
            /*#__PURE__*/ jsx("td", {
                children: /*#__PURE__*/ jsx("span", {})
            }),
            /*#__PURE__*/ jsx("td", {
                children: /*#__PURE__*/ jsx("span", {})
            }),
            /*#__PURE__*/ jsx("td", {
                children: /*#__PURE__*/ jsx("span", {})
            }),
            /*#__PURE__*/ jsx("td", {
                children: /*#__PURE__*/ jsx("span", {})
            }),
            /*#__PURE__*/ jsx("td", {
                children: /*#__PURE__*/ jsx("span", {})
            })
        ]
    });
    const cells = Array.from(element.querySelectorAll("td > span"));
    const registrationNode = cells[4];
    const row = {
        element,
        update (value) {
            cells[0].textContent = String(value.onu_id);
            cells[1].textContent = view_text(value.vendor);
            cells[2].textContent = view_text(value.identity?.equipment_id ?? value.model);
            cells[3].textContent = view_text(value.serial_number);
            registrationNode.textContent = view_text(value.state);
            registrationNode.className = value.state === "O5Operation" ? "label success" : "label warning";
            cells[5].textContent = view_text(value.business_status);
            cells[6].textContent = view_text(value.identity?.software_images?.join(", ") ?? value.firmware_version);
            cells[7].textContent = view_text(value.data_path?.interface);
            cells[8].textContent = view_text(value.management?.state);
            cells[9].textContent = view_text(value.provisioning?.state);
            cells[9].setAttribute("title", value.provisioning?.current_revision === false ? _("Previous configuration") : value.provisioning?.management_fresh === false ? _("Management stale") : "");
            cells[10].textContent = view_text(value.wifi_sync);
        }
    };
    row.update(onu);
    return row;
}
function createOnuTable(onus) {
    const rows = new Map();
    for (const onu of onus)rows.set(onu.onu_id, createOnuRow(onu));
    const emptyRow = /*#__PURE__*/ jsx("tr", {
        children: /*#__PURE__*/ jsx("td", {
            colSpan: 11,
            children: _("No registered sub-gateways.")
        })
    });
    let showingEmpty = onus.length === 0;
    const body = /*#__PURE__*/ jsx("tbody", {
        children: showingEmpty ? emptyRow : [
            ...rows.values()
        ].map((row)=>row.element)
    });
    const element = /*#__PURE__*/ jsx("div", {
        class: "table-wrapper",
        children: /*#__PURE__*/ jsxs("table", {
            class: "table",
            children: [
                /*#__PURE__*/ jsx("thead", {
                    children: /*#__PURE__*/ jsxs("tr", {
                        children: [
                            /*#__PURE__*/ jsx("th", {
                                children: _("ONU ID")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: _("Vendor")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: _("Model")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: _("Optical serial")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: _("Registration")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: _("Business")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: _("Firmware")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: _("Data interface")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: _("CWMP")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: _("Synchronization")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: _("Wi-Fi sync")
                            })
                        ]
                    })
                }),
                body
            ]
        })
    });
    return {
        element,
        update (nextOnus) {
            const nextIds = new Set(nextOnus.map((onu)=>onu.onu_id));
            for (const [onuId, row] of rows){
                if (!nextIds.has(onuId)) {
                    row.element.remove();
                    rows.delete(onuId);
                }
            }
            if (nextOnus.length === 0) {
                if (!showingEmpty) body.append(emptyRow);
                showingEmpty = true;
                return;
            }
            if (showingEmpty) {
                emptyRow.remove();
                showingEmpty = false;
            }
            for (const [index, onu] of nextOnus.entries()){
                let row = rows.get(onu.onu_id);
                if (!row) {
                    row = createOnuRow(onu);
                    rows.set(onu.onu_id, row);
                }
                row.update(onu);
                const current = body.children.item(index);
                if (current !== row.element) body.insertBefore(row.element, current);
            }
        }
    };
}
function createStatusView(initialStatus, initialDevices) {
    const initialOptical = initialStatus.optical_transceiver ?? {};
    const onuTable = createOnuTable(initialStatus.sub_gateways ?? []);
    const ports = Array.from({
        length: 16
    }, (_port, index)=>createPortCard(index + 1));
    const deviceMap = new Map();
    const updateDevices = (devices)=>{
        deviceMap.clear();
        for (const device of devices){
            const name = device.device ?? device.name ?? device.ifname;
            if (name) deviceMap.set(name, device);
        }
    };
    updateDevices(initialDevices);
    const element = /*#__PURE__*/ jsxs("div", {
        class: "cbi-map",
        children: [
            /*#__PURE__*/ jsx("h2", {
                children: _("FTTR overview")
            }),
            /*#__PURE__*/ jsx("p", {
                "data-provisioning-summary": "true"
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
                                            children: /*#__PURE__*/ jsx("span", {
                                                children: view_text(initialStatus.fpga_status)
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsxs("tr", {
                                    children: [
                                        /*#__PURE__*/ jsx("th", {
                                            children: _("Optical module")
                                        }),
                                        /*#__PURE__*/ jsx("td", {
                                            children: /*#__PURE__*/ jsx("span", {
                                                children: view_text(initialOptical.model)
                                            })
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsxs("tr", {
                                    children: [
                                        /*#__PURE__*/ jsx("th", {
                                            children: _("CDR lock")
                                        }),
                                        /*#__PURE__*/ jsx("td", {
                                            children: initialOptical.cdr_locked === undefined ? /*#__PURE__*/ jsx("span", {
                                                children: "\u2014"
                                            }) : badge(initialOptical.cdr_locked, initialOptical.cdr_locked ? _("Locked") : _("Unlocked"))
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
                    onuTable.element
                ]
            }),
            /*#__PURE__*/ jsxs("div", {
                class: "cbi-section",
                children: [
                    /*#__PURE__*/ jsx("h3", {
                        children: _("Downstream ports")
                    }),
                    /*#__PURE__*/ jsx("div", {
                        style: "display:grid;grid-template-columns:repeat(auto-fit, minmax(100px, 1fr));margin-bottom:1em;align-items:center;justify-items:center;text-align:center",
                        children: ports.map((port)=>port.element)
                    })
                ]
            })
        ]
    });
    const controllerCells = element.querySelectorAll("table tbody td > span");
    const fpgaNode = controllerCells[0];
    const opticalNode = controllerCells[1];
    const cdrNode = controllerCells[2];
    const provisioningNode = element.querySelector("[data-provisioning-summary]");
    const update = (status, devices)=>{
        const optical = status.optical_transceiver ?? {};
        const provisioning = status.provisioning;
        provisioningNode.textContent = provisioning ? `${_("Provisioning")}: ${provisioning.enabled ? _("Enabled") : _("Disabled")} / ${view_text(provisioning.mode)} / ${view_text(provisioning.revision)}${provisioning.error ? ` \u{2014} ${provisioning.error}` : ""}` : _("Provisioning status unavailable");
        fpgaNode.textContent = view_text(status.fpga_status);
        opticalNode.textContent = view_text(optical.model);
        cdrNode.textContent = optical.cdr_locked === undefined ? "\u2014" : optical.cdr_locked ? _("Locked") : _("Unlocked");
        cdrNode.className = optical.cdr_locked === undefined ? "" : optical.cdr_locked ? "label success" : "label warning";
        onuTable.update(status.sub_gateways ?? []);
        updateDevices(devices);
        for (const port of ports)port.update(status, deviceMap);
    };
    update(initialStatus, initialDevices);
    return {
        element,
        update
    };
}
let pageRoot = null;
let pageView = null;
let refreshing = false;
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
        pageView = createStatusView(data.status, data.devices);
        pageRoot = pageView.element;
        poll.add(async ()=>{
            if (refreshing || !pageRoot?.isConnected || !pageView) return;
            const activeView = pageView;
            refreshing = true;
            try {
                const [status, devices] = await Promise.all([
                    getStatus(),
                    getNetworkDevices().catch(()=>[])
                ]);
                if (pageView === activeView && activeView.element.isConnected) activeView.update(status, devices);
            } catch (error) {
                console.error("Failed to refresh FTTR status", error);
            } finally{
                refreshing = false;
            }
        }, 10);
        return pageRoot;
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});


return main;