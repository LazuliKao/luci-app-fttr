
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


;// CONCATENATED MODULE: ./src/view/components/onu-details.tsx
// SPDX-License-Identifier: Apache-2.0

const getStatus = L.rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: true
});
const startMib = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_start",
    params: [
        "onu_id",
        "optical_sn",
        "tables"
    ],
    reject: true
});
const getMib = L.rpc.declare({
    object: "luci.fttr",
    method: "mib_result",
    params: [
        "job",
        "chunk"
    ],
    reject: true
});
const onu_details_text = (v)=>v == null || v === "" ? "\u2014" : String(v);
const json = (v)=>JSON.stringify(v, null, 2);
const valueText = (v)=>v === null ? _("Conflicting values; inspect observations") : onu_details_text(v.value ?? v.hex ?? v.bytes);
function reference(definition) {
    const ref = definition.reference;
    return ref?.url.startsWith("https://github.com/opencord/omci-lib-go/blob/v2.2.4/") ? /*#__PURE__*/ jsx("a", {
        href: ref.url,
        target: "_blank",
        rel: "noopener noreferrer",
        children: ref.id
    }) : /*#__PURE__*/ jsx("span", {
        children: "\u2014"
    });
}
function browser(report) {
    const content = /*#__PURE__*/ jsx("div", {
        style: "min-width:0;flex:1"
    });
    const filter = /*#__PURE__*/ jsx("input", {
        type: "search",
        placeholder: _("Search ME name or Class ID")
    });
    const classes = /*#__PURE__*/ jsx("div", {});
    function select(id) {
        content.replaceChildren(...report.entities.filter((e)=>e.class_id === id).map((entity)=>/*#__PURE__*/ jsxs("details", {
                children: [
                    /*#__PURE__*/ jsxs("summary", {
                        children: [
                            onu_details_text(entity.name),
                            " \xb7 ",
                            _("Entity"),
                            " ",
                            entity.entity_id,
                            " (0x",
                            entity.entity_id.toString(16),
                            ") \xb7",
                            " ",
                            entity.support
                        ]
                    }),
                    /*#__PURE__*/ jsxs("table", {
                        class: "table",
                        children: [
                            /*#__PURE__*/ jsx("thead", {
                                children: /*#__PURE__*/ jsxs("tr", {
                                    children: [
                                        /*#__PURE__*/ jsx("th", {
                                            children: _("Attribute")
                                        }),
                                        /*#__PURE__*/ jsx("th", {
                                            children: _("Type")
                                        }),
                                        /*#__PURE__*/ jsx("th", {
                                            children: _("Value")
                                        }),
                                        /*#__PURE__*/ jsx("th", {
                                            children: _("Definition")
                                        })
                                    ]
                                })
                            }),
                            /*#__PURE__*/ jsx("tbody", {
                                children: entity.attributes.map((attribute)=>/*#__PURE__*/ jsxs("tr", {
                                        children: [
                                            /*#__PURE__*/ jsx("td", {
                                                children: attribute.definition.name
                                            }),
                                            /*#__PURE__*/ jsx("td", {
                                                children: attribute.definition.kind
                                            }),
                                            /*#__PURE__*/ jsxs("td", {
                                                children: [
                                                    valueText(attribute.value),
                                                    /*#__PURE__*/ jsxs("details", {
                                                        children: [
                                                            /*#__PURE__*/ jsx("summary", {
                                                                children: _("Raw data / observations")
                                                            }),
                                                            /*#__PURE__*/ jsx("pre", {
                                                                style: "white-space:pre-wrap;overflow-wrap:anywhere",
                                                                children: json(attribute.observations)
                                                            })
                                                        ]
                                                    })
                                                ]
                                            }),
                                            /*#__PURE__*/ jsx("td", {
                                                children: reference(attribute.definition)
                                            })
                                        ]
                                    }))
                            })
                        ]
                    }),
                    !entity.attributes.length ? /*#__PURE__*/ jsx("p", {
                        children: _("Basic display only; raw records are preserved.")
                    }) : null,
                    report.tables.filter((t)=>t.class_id === id && t.entity_id === entity.entity_id).map((table)=>/*#__PURE__*/ jsxs("details", {
                            children: [
                                /*#__PURE__*/ jsxs("summary", {
                                    children: [
                                        table.attribute.name,
                                        " \xb7",
                                        " ",
                                        table.collected ? `${table.rows.length} ${_("rows")}` : onu_details_text(table.error)
                                    ]
                                }),
                                table.vlan_rules.length ? /*#__PURE__*/ jsxs("table", {
                                    class: "table",
                                    children: [
                                        /*#__PURE__*/ jsx("thead", {
                                            children: /*#__PURE__*/ jsxs("tr", {
                                                children: [
                                                    /*#__PURE__*/ jsx("th", {
                                                        children: _("Outer filter (priority / VID / TPID-DEI)")
                                                    }),
                                                    /*#__PURE__*/ jsx("th", {
                                                        children: _("Inner filter (priority / VID / TPID-DEI)")
                                                    }),
                                                    /*#__PURE__*/ jsx("th", {
                                                        children: _("EtherType code")
                                                    }),
                                                    /*#__PURE__*/ jsx("th", {
                                                        children: _("Remove tags")
                                                    }),
                                                    /*#__PURE__*/ jsx("th", {
                                                        children: _("Outer treatment (priority / VID / TPID-DEI)")
                                                    }),
                                                    /*#__PURE__*/ jsx("th", {
                                                        children: _("Inner treatment (priority / VID / TPID-DEI)")
                                                    }),
                                                    /*#__PURE__*/ jsx("th", {
                                                        children: _("Delete entry")
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx("tbody", {
                                            children: table.vlan_rules.map((rule)=>/*#__PURE__*/ jsxs("tr", {
                                                    children: [
                                                        /*#__PURE__*/ jsx("td", {
                                                            children: `${rule.filter_outer_priority} / ${rule.filter_outer_vid} / ${rule.filter_outer_tpid_dei}`
                                                        }),
                                                        /*#__PURE__*/ jsx("td", {
                                                            children: `${rule.filter_inner_priority} / ${rule.filter_inner_vid} / ${rule.filter_inner_tpid_dei}`
                                                        }),
                                                        /*#__PURE__*/ jsx("td", {
                                                            children: onu_details_text(rule.filter_ethertype)
                                                        }),
                                                        /*#__PURE__*/ jsx("td", {
                                                            children: onu_details_text(rule.tags_to_remove)
                                                        }),
                                                        /*#__PURE__*/ jsx("td", {
                                                            children: `${rule.treatment_outer_priority} / ${rule.treatment_outer_vid} / ${rule.treatment_outer_tpid_dei}`
                                                        }),
                                                        /*#__PURE__*/ jsx("td", {
                                                            children: `${rule.treatment_inner_priority} / ${rule.treatment_inner_vid} / ${rule.treatment_inner_tpid_dei}`
                                                        }),
                                                        /*#__PURE__*/ jsx("td", {
                                                            children: onu_details_text(rule.delete_entry)
                                                        })
                                                    ]
                                                }))
                                        })
                                    ]
                                }) : null,
                                /*#__PURE__*/ jsxs("p", {
                                    children: [
                                        _("G.988 encoded field values"),
                                        ": ",
                                        reference(table.attribute)
                                    ]
                                }),
                                /*#__PURE__*/ jsx("pre", {
                                    style: "white-space:pre-wrap;overflow-wrap:anywhere",
                                    children: json(table.vlan_rules.length ? table.vlan_rules : table.rows)
                                })
                            ]
                        })),
                    /*#__PURE__*/ jsxs("details", {
                        children: [
                            /*#__PURE__*/ jsx("summary", {
                                children: _("Records / diagnostics")
                            }),
                            /*#__PURE__*/ jsx("pre", {
                                style: "white-space:pre-wrap;overflow-wrap:anywhere",
                                children: json({
                                    diagnostics: entity.diagnostics,
                                    records: report.records.filter((r)=>r.class_id === id && r.entity_id === entity.entity_id)
                                })
                            })
                        ]
                    })
                ]
            })));
    }
    function list() {
        const query = filter.value.toLowerCase();
        classes.replaceChildren(...report.classes.filter((c)=>`${c.class_id} ${c.name ?? ""}`.toLowerCase().includes(query)).map((c)=>/*#__PURE__*/ jsx("div", {
                children: /*#__PURE__*/ jsxs("button", {
                    type: "button",
                    class: "cbi-button",
                    style: "margin:.2em 0;white-space:normal;text-align:left",
                    onclick: ()=>select(c.class_id),
                    children: [
                        c.class_id,
                        " \xb7 ",
                        c.name ?? _("Unknown class"),
                        " (",
                        c.entities,
                        ")"
                    ]
                })
            })));
    }
    filter.addEventListener("input", list);
    list();
    if (report.classes.length) select(report.classes[0].class_id);
    return /*#__PURE__*/ jsxs("div", {
        style: "display:flex;gap:1em;flex-wrap:wrap",
        children: [
            /*#__PURE__*/ jsxs("div", {
                style: "flex:0 1 240px",
                children: [
                    filter,
                    classes
                ]
            }),
            content
        ]
    });
}
function showOnuDetails(initial) {
    let initialTab = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "basic";
    let closed = false;
    let busy = false;
    let report = null;
    const basic = /*#__PURE__*/ jsx("table", {
        class: "table",
        children: /*#__PURE__*/ jsx("tbody", {
            children: [
                [
                    _("Vendor"),
                    initial.vendor
                ],
                [
                    _("Model"),
                    initial.identity?.equipment_id ?? initial.model
                ],
                [
                    _("Optical serial"),
                    initial.serial_number
                ],
                [
                    _("ONU ID"),
                    initial.onu_id
                ],
                [
                    _("Registration"),
                    initial.state
                ],
                [
                    _("Business"),
                    initial.business_status
                ],
                [
                    _("Data interface"),
                    initial.data_path?.interface
                ],
                [
                    _("Hardware version"),
                    initial.identity?.hardware_version ?? initial.hardware_version
                ],
                [
                    _("Software images"),
                    initial.identity?.software_images?.join(", ") ?? initial.firmware_version
                ],
                [
                    _("OMCC version"),
                    initial.identity?.omcc_version == null ? null : `0x${initial.identity.omcc_version.toString(16)}`
                ],
                [
                    _("Identity source"),
                    initial.identity ? initial.identity_current === false ? _("Cached identity") : initial.identity_current === true ? _("Current registration") : _("Registration freshness unavailable") : _("Not collected")
                ],
                [
                    _("Identity age"),
                    initial.identity_age_seconds == null ? null : `${initial.identity_age_seconds} s`
                ],
                [
                    _("Identity read errors"),
                    initial.identity?.errors?.join("; ")
                ]
            ].map((param)=>{
                let [name, value] = param;
                return /*#__PURE__*/ jsxs("tr", {
                    children: [
                        /*#__PURE__*/ jsx("th", {
                            children: name
                        }),
                        /*#__PURE__*/ jsx("td", {
                            children: onu_details_text(value)
                        })
                    ]
                });
            })
        })
    });
    const message = /*#__PURE__*/ jsx("p", {
        role: "status",
        children: _("Read MIB on demand. Results are a snapshot, not live polling.")
    });
    const results = /*#__PURE__*/ jsx("div", {});
    const raw = /*#__PURE__*/ jsx("textarea", {
        readOnly: true,
        rows: 20,
        style: "width:100%;font-family:monospace"
    });
    const copyMessage = /*#__PURE__*/ jsx("span", {
        role: "status"
    });
    const copy = /*#__PURE__*/ jsx("button", {
        type: "button",
        class: "cbi-button",
        onclick: async ()=>{
            try {
                await navigator.clipboard.writeText(raw.value);
                copyMessage.textContent = _("Copied");
            } catch  {
                raw.focus();
                raw.select();
                copyMessage.textContent = _("Select and copy the JSON manually.");
            }
        },
        children: _("Copy JSON")
    });
    const download = /*#__PURE__*/ jsx("a", {
        href: "data:application/json,%7B%7D",
        class: "cbi-button",
        download: `mib-${initial.serial_number}.json`,
        children: _("Download JSON")
    });
    let downloadUrl = null;
    const rawPanel = /*#__PURE__*/ jsxs("div", {
        children: [
            /*#__PURE__*/ jsxs("p", {
                children: [
                    copy,
                    " ",
                    download,
                    " ",
                    copyMessage
                ]
            }),
            raw
        ]
    });
    const read = /*#__PURE__*/ jsx("button", {
        type: "button",
        class: "cbi-button cbi-button-action",
        onclick: ()=>run(false),
        children: _("Read MIB")
    });
    const tables = /*#__PURE__*/ jsx("button", {
        type: "button",
        class: "cbi-button cbi-button-action",
        onclick: ()=>run(true),
        children: _("Read MIB and VLAN tables")
    });
    const mib = /*#__PURE__*/ jsxs("div", {
        children: [
            /*#__PURE__*/ jsxs("p", {
                children: [
                    read,
                    " ",
                    tables
                ]
            }),
            message,
            results
        ]
    });
    const panels = {
        basic,
        mib,
        raw: rawPanel
    };
    const buttons = new Map();
    function tab(name) {
        for (const [key, panel] of Object.entries(panels))panel.hidden = key !== name;
        for (const [key, button] of buttons)button.disabled = key === name;
    }
    const navigation = /*#__PURE__*/ jsx("p", {
        children: [
            [
                "basic",
                _("Basic information")
            ],
            [
                "mib",
                "OMCI / MIB"
            ],
            [
                "raw",
                _("Raw JSON")
            ]
        ].map((param)=>{
            let [key, label] = param;
            const button = /*#__PURE__*/ jsx("button", {
                type: "button",
                class: "cbi-button",
                onclick: ()=>tab(key),
                children: label
            });
            buttons.set(key, button);
            return button;
        })
    });
    const body = /*#__PURE__*/ jsxs("div", {
        style: "width:min(1100px,85vw);max-height:75vh;overflow:auto",
        children: [
            navigation,
            basic,
            mib,
            rawPanel,
            /*#__PURE__*/ jsx("div", {
                class: "right",
                children: /*#__PURE__*/ jsx("button", {
                    type: "button",
                    class: "cbi-button",
                    onclick: ()=>{
                        closed = true;
                        if (downloadUrl) URL.revokeObjectURL(downloadUrl);
                        L.ui.hideModal();
                    },
                    children: _("Close")
                })
            })
        ]
    });
    const active = ()=>!closed && body.isConnected && body.getClientRects().length > 0;
    async function run(withTables) {
        if (busy) return;
        busy = true;
        read.disabled = tables.disabled = true;
        message.textContent = _("Reading MIB\u2026");
        try {
            const status = await getStatus();
            const current = status.sub_gateways?.find((o)=>o.serial_number === initial.serial_number);
            if (current?.state !== "O5Operation") throw new Error(_("Device is offline; reopen details after registration."));
            if (!active()) return;
            const started = await startMib(current.onu_id, current.serial_number, withTables);
            if (started.error || !started.job) throw new Error(started.error ?? _("Cannot start MIB query"));
            const deadline = Date.now() + 140000;
            while(active()){
                const result = await getMib(started.job, 0);
                if (!active()) return;
                if (result.error) throw new Error(result.error);
                if (result.status === "ready") {
                    if (!result.chunks || result.chunks > 1024 || !result.bytes || result.bytes > 32 * 1024 * 1024 || result.chunk !== 0 || !result.data) throw new Error(_("Invalid MIB snapshot"));
                    const buffer = new Uint8Array(result.bytes);
                    let offset = 0;
                    for(let chunk = 0; chunk < result.chunks; chunk++){
                        const part = chunk === 0 ? result : await getMib(started.job, chunk);
                        if (!active()) return;
                        if (part.error) throw new Error(part.error);
                        if (part.chunk !== chunk || part.chunks !== result.chunks || part.bytes !== result.bytes || !part.data) throw new Error(_("Invalid MIB snapshot chunk"));
                        const decoded = atob(part.data);
                        if (offset + decoded.length > buffer.length) throw new Error(_("Invalid MIB snapshot size"));
                        for(let index = 0; index < decoded.length; index++)buffer[offset++] = decoded.charCodeAt(index);
                        message.textContent = `${_("Downloading MIB snapshot")}: ${chunk + 1}/${result.chunks}`;
                    }
                    if (offset !== buffer.length) throw new Error(_("Incomplete MIB snapshot"));
                    const snapshot = JSON.parse(new TextDecoder("utf-8", {
                        fatal: true
                    }).decode(buffer));
                    if (snapshot.error || !snapshot.report) throw new Error(snapshot.error ?? _("Missing MIB report"));
                    report = snapshot.report;
                    if (report.schema_version !== 1 || report.onu_id !== current.onu_id) throw new Error(_("Unexpected MIB response"));
                    message.textContent = `${new Date().toLocaleString()} \xb7 ONU ${report.onu_id} \xb7 ${_("Upload complete")}: ${report.uploaded_complete} \xb7 ${report.received_records}/${report.expected_records} \xb7 ${_("Decoded / partial / basic")}: ${report.decoded_records}/${report.partial_records}/${report.basic_records} \xb7 ${_("Tables requested / collected")}: ${report.tables_requested}/${report.tables_collected}`;
                    results.replaceChildren(browser(report), /*#__PURE__*/ jsxs("details", {
                        children: [
                            /*#__PURE__*/ jsx("summary", {
                                children: _("Upload diagnostics")
                            }),
                            /*#__PURE__*/ jsx("pre", {
                                children: json(report.diagnostics)
                            })
                        ]
                    }));
                    raw.value = json(report);
                    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
                    downloadUrl = URL.createObjectURL(new Blob([
                        raw.value
                    ], {
                        type: "application/json"
                    }));
                    download.href = downloadUrl;
                    copy.disabled = false;
                    download.hidden = false;
                    return;
                }
                if (Date.now() >= deadline) throw new Error(_("MIB query timed out; retry."));
                await new Promise((resolve)=>setTimeout(resolve, 1000));
            }
        } catch (error) {
            if (active()) message.textContent = `${String(error)}${report ? ` \xb7 ${_("Previous snapshot retained")}` : ""}`;
        } finally{
            busy = false;
            read.disabled = tables.disabled = false;
        }
    }
    copy.disabled = true;
    download.hidden = true;
    tab(initialTab);
    L.ui.showModal(`${initial.model} \u{2014} ${initial.serial_number}`, body);
}

;// CONCATENATED MODULE: ./src/view/hardware.tsx

// SPDX-License-Identifier: Apache-2.0

const view = L.view;
const rpc = L.rpc;
const hardware_getStatus = rpc.declare({
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
                            _("FPGA status"),
                            status.fpga_status
                        ],
                        [
                            _("Optical transceiver"),
                            optical.model
                        ],
                        [
                            _("TX wavelength"),
                            optical.wavelength_tx_nm === undefined ? undefined : `${optical.wavelength_tx_nm} nm`
                        ],
                        [
                            _("RX wavelength"),
                            optical.wavelength_rx_nm === undefined ? undefined : `${optical.wavelength_rx_nm} nm`
                        ],
                        [
                            _("Downlink PHY rate"),
                            optical.phy_rate_downlink_gbps === undefined ? undefined : `${optical.phy_rate_downlink_gbps} Gbps`
                        ],
                        [
                            _("Uplink PHY rate"),
                            optical.phy_rate_uplink_gbps === undefined ? undefined : `${optical.phy_rate_uplink_gbps} Gbps`
                        ],
                        [
                            _("CDR lock"),
                            optical.cdr_locked === undefined ? undefined : optical.cdr_locked ? _("Locked") : _("Unlocked")
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
                        /*#__PURE__*/ jsx("p", {
                            children: /*#__PURE__*/ jsx("button", {
                                type: "button",
                                class: "cbi-button cbi-button-action",
                                onclick: ()=>showOnuDetails(onu, "mib"),
                                children: _("View OMCI / MIB")
                            })
                        }),
                        rows([
                            [
                                _("Vendor"),
                                onu.vendor
                            ],
                            [
                                _("Optical serial"),
                                onu.serial_number
                            ],
                            [
                                _("Registration state"),
                                onu.state
                            ],
                            [
                                _("Identity source"),
                                freshness
                            ],
                            [
                                _("Identity age"),
                                onu.identity_age_seconds === undefined ? undefined : `${onu.identity_age_seconds} s`
                            ],
                            [
                                _("Equipment ID"),
                                identity.equipment_id ?? onu.model
                            ],
                            [
                                _("Hardware version"),
                                identity.hardware_version ?? onu.hardware_version
                            ],
                            [
                                _("Firmware version"),
                                onu.firmware_version
                            ],
                            [
                                _("Software images"),
                                softwareImages.length ? softwareImages.join(", ") : undefined
                            ],
                            [
                                _("OMCC version"),
                                identity.omcc_version === undefined ? undefined : `0x${identity.omcc_version.toString(16).padStart(2, "0")}`
                            ],
                            [
                                _("Identity read errors"),
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
        return hardware_getStatus();
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