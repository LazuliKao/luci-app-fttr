
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

;// CONCATENATED MODULE: ./src/view/index.tsx

// SPDX-License-Identifier: Apache-2.0

const view = L.view;
const rpc = L.rpc;
const poll = L.Poll;
const view_getStatus = rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: true
});
const getNetworkDevices = rpc.declare({
    object: "luci-rpc",
    method: "getNetworkDevices",
    expect: {
        "": {}
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
    const ifnameNode = /*#__PURE__*/ jsx("span", {});
    const speedNode = /*#__PURE__*/ jsx("span", {
        children: _("Unknown")
    });
    const iconNode = /*#__PURE__*/ jsx("img", {
        src: "/luci-static/resources/icons/port_down.svg",
        alt: "",
        "aria-hidden": "true"
    });
    const linkBarNode = /*#__PURE__*/ jsx("div", {
        style: "flex:1;height:3px;opacity:0.25;background-color:rgb(240, 144, 144)"
    });
    const portStateNode = /*#__PURE__*/ jsx("span", {});
    const onuNode = /*#__PURE__*/ jsx("span", {});
    const macNode = /*#__PURE__*/ jsx("span", {});
    const txSummaryNode = /*#__PURE__*/ jsx("span", {});
    const rxSummaryNode = /*#__PURE__*/ jsx("span", {});
    const rxBytesNode = /*#__PURE__*/ jsx("span", {});
    const rxPacketsNode = /*#__PURE__*/ jsx("span", {});
    const rxMulticastNode = /*#__PURE__*/ jsx("span", {});
    const rxErrorsNode = /*#__PURE__*/ jsx("span", {});
    const rxDroppedNode = /*#__PURE__*/ jsx("span", {});
    const txBytesNode = /*#__PURE__*/ jsx("span", {});
    const txPacketsNode = /*#__PURE__*/ jsx("span", {});
    const txErrorsNode = /*#__PURE__*/ jsx("span", {});
    const txDroppedNode = /*#__PURE__*/ jsx("span", {});
    const element = /*#__PURE__*/ jsxs("div", {
        class: "ifacebox",
        style: "margin:.25em;width:100px",
        children: [
            /*#__PURE__*/ jsx("div", {
                class: "ifacebox-head",
                style: "font-weight:bold",
                children: ifnameNode
            }),
            /*#__PURE__*/ jsxs("div", {
                class: "ifacebox-body",
                children: [
                    iconNode,
                    /*#__PURE__*/ jsx("br", {}),
                    speedNode
                ]
            }),
            /*#__PURE__*/ jsxs("div", {
                class: "ifacebox-head cbi-tooltip-container",
                style: "display:flex",
                children: [
                    linkBarNode,
                    /*#__PURE__*/ jsxs("span", {
                        class: "cbi-tooltip left",
                        children: [
                            /*#__PURE__*/ jsxs("strong", {
                                children: [
                                    _("Port status"),
                                    ": "
                                ]
                            }),
                            portStateNode,
                            /*#__PURE__*/ jsx("br", {}),
                            /*#__PURE__*/ jsxs("strong", {
                                children: [
                                    _("ONU"),
                                    ": "
                                ]
                            }),
                            onuNode,
                            /*#__PURE__*/ jsx("br", {}),
                            /*#__PURE__*/ jsxs("strong", {
                                children: [
                                    _("MAC address"),
                                    ": "
                                ]
                            }),
                            macNode
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
                        txSummaryNode,
                        /*#__PURE__*/ jsx("br", {}),
                        "\u25BC\u202F",
                        rxSummaryNode,
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
                                            rxBytesNode
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
                                            rxPacketsNode
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
                                            rxMulticastNode
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
                                            rxErrorsNode
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
                                            rxDroppedNode
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
                                            txBytesNode
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
                                            txPacketsNode
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
                                            txErrorsNode
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
                                            txDroppedNode
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
    return {
        element,
        update (status, devices) {
            const port = (status.switch_ports ?? []).find((item)=>item.port === number);
            const ifname = port?.interface ?? `fttr${number}`;
            const device = devices[ifname];
            const stats = device?.stats;
            const carrier = port?.carrier ?? device?.carrier ?? (device?.link?.speed !== undefined ? true : undefined);
            const onu = (status.sub_gateways ?? []).find((item)=>item.onu_id === port?.onu_id);
            const connected = carrier === true;
            const rxBytes = stats?.rx_bytes;
            const txBytes = stats?.tx_bytes;
            ifnameNode.textContent = ifname;
            iconNode.setAttribute("src", `/luci-static/resources/icons/${connected ? "port_up.svg" : "port_down.svg"}`);
            speedNode.textContent = connected ? device?.link?.speed !== undefined ? formatLinkSpeed(device.link.speed) : _("Connected") : carrier === false ? _("Disconnected") : _("Unknown");
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
    let current = onu;
    const onuIdNode = /*#__PURE__*/ jsx("span", {});
    const vendorNode = /*#__PURE__*/ jsx("span", {});
    const modelNode = /*#__PURE__*/ jsx("span", {});
    const serialNode = /*#__PURE__*/ jsx("span", {});
    const registrationNode = /*#__PURE__*/ jsx("span", {});
    const businessNode = /*#__PURE__*/ jsx("span", {});
    const firmwareNode = /*#__PURE__*/ jsx("span", {});
    const dataInterfaceNode = /*#__PURE__*/ jsx("span", {});
    const cwmpNode = /*#__PURE__*/ jsx("span", {});
    const provisioningNode = /*#__PURE__*/ jsx("span", {});
    const wifiSyncNode = /*#__PURE__*/ jsx("span", {});
    const element = /*#__PURE__*/ jsxs("tr", {
        children: [
            /*#__PURE__*/ jsx("td", {
                children: onuIdNode
            }),
            /*#__PURE__*/ jsx("td", {
                children: vendorNode
            }),
            /*#__PURE__*/ jsx("td", {
                children: modelNode
            }),
            /*#__PURE__*/ jsx("td", {
                children: serialNode
            }),
            /*#__PURE__*/ jsx("td", {
                children: registrationNode
            }),
            /*#__PURE__*/ jsx("td", {
                children: businessNode
            }),
            /*#__PURE__*/ jsx("td", {
                children: firmwareNode
            }),
            /*#__PURE__*/ jsx("td", {
                children: dataInterfaceNode
            }),
            /*#__PURE__*/ jsx("td", {
                children: cwmpNode
            }),
            /*#__PURE__*/ jsx("td", {
                children: provisioningNode
            }),
            /*#__PURE__*/ jsx("td", {
                children: wifiSyncNode
            }),
            /*#__PURE__*/ jsx("td", {
                children: /*#__PURE__*/ jsx("button", {
                    type: "button",
                    class: "cbi-button cbi-button-action",
                    onclick: ()=>showOnuDetails(current),
                    children: _("Details")
                })
            })
        ]
    });
    const row = {
        element,
        update (value) {
            current = value;
            onuIdNode.textContent = String(value.onu_id);
            vendorNode.textContent = view_text(value.vendor);
            modelNode.textContent = view_text(value.identity?.equipment_id ?? value.model);
            serialNode.textContent = view_text(value.serial_number);
            registrationNode.textContent = view_text(value.state);
            registrationNode.className = value.state === "O5Operation" ? "label success" : "label warning";
            businessNode.textContent = view_text(value.business_status);
            firmwareNode.textContent = view_text(value.identity?.software_images?.join(", ") ?? value.firmware_version);
            dataInterfaceNode.textContent = view_text(value.data_path?.interface);
            cwmpNode.textContent = view_text(value.management?.state);
            provisioningNode.textContent = view_text(value.provisioning?.state);
            provisioningNode.setAttribute("title", value.provisioning?.current_revision === false ? _("Previous configuration") : value.provisioning?.management_fresh === false ? _("Management stale") : "");
            wifiSyncNode.textContent = view_text(value.wifi_sync);
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
            colSpan: 12,
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
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: _("Details")
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
    const provisioningNode = /*#__PURE__*/ jsx("p", {
        "data-provisioning-summary": "true"
    });
    const fpgaNode = /*#__PURE__*/ jsx("span", {
        children: view_text(initialStatus.fpga_status)
    });
    const opticalNode = /*#__PURE__*/ jsx("span", {
        children: view_text(initialOptical.model)
    });
    const cdrNode = initialOptical.cdr_locked === undefined ? /*#__PURE__*/ jsx("span", {
        children: "\u2014"
    }) : badge(initialOptical.cdr_locked, initialOptical.cdr_locked ? _("Locked") : _("Unlocked"));
    const element = /*#__PURE__*/ jsxs("div", {
        class: "cbi-map",
        children: [
            /*#__PURE__*/ jsx("h2", {
                children: _("FTTR overview")
            }),
            provisioningNode,
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
                                            children: fpgaNode
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsxs("tr", {
                                    children: [
                                        /*#__PURE__*/ jsx("th", {
                                            children: _("Optical module")
                                        }),
                                        /*#__PURE__*/ jsx("td", {
                                            children: opticalNode
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsxs("tr", {
                                    children: [
                                        /*#__PURE__*/ jsx("th", {
                                            children: _("CDR lock")
                                        }),
                                        /*#__PURE__*/ jsx("td", {
                                            children: cdrNode
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
    const update = (status, devices)=>{
        const optical = status.optical_transceiver ?? {};
        const provisioning = status.provisioning;
        provisioningNode.textContent = provisioning ? `${_("Provisioning")}: ${provisioning.enabled ? _("Enabled") : _("Disabled")} / ${view_text(provisioning.mode)} / ${view_text(provisioning.revision)}${provisioning.error ? ` \u{2014} ${provisioning.error}` : ""}` : _("Provisioning status unavailable");
        fpgaNode.textContent = view_text(status.fpga_status);
        opticalNode.textContent = view_text(optical.model);
        cdrNode.textContent = optical.cdr_locked === undefined ? "\u2014" : optical.cdr_locked ? _("Locked") : _("Unlocked");
        cdrNode.className = optical.cdr_locked === undefined ? "" : optical.cdr_locked ? "label success" : "label warning";
        onuTable.update(status.sub_gateways ?? []);
        for (const port of ports)port.update(status, devices);
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
            view_getStatus(),
            getNetworkDevices().catch((error)=>{
                console.warn("Failed to load network device details", error);
                return {};
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
                    view_getStatus(),
                    getNetworkDevices().catch(()=>({}))
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