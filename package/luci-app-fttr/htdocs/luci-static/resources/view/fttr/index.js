'use strict';
'require view as __fttr_view';
'require rpc as __fttr_rpc';
'require ui as __fttr_ui';
'require uci as __fttr_uci';
'require form as __fttr_form';
'require poll as __fttr_poll';
'require dom as __fttr_dom';

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
    const body = /*#__PURE__*/ jsxs(Fragment, {
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
    // The body is a Fragment; track a persistent element after its children are mounted.
    const active = ()=>!closed && navigation.isConnected && navigation.getClientRects().length > 0;
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
const I18N_DICT = {
    "FTTR overview": "FTTR \u603B\u89C8",
    Controller: "\u4E3B\u63A7\u5236\u5668",
    FPGA: "FPGA",
    "FPGA status": "FPGA \u72B6\u6001",
    "Optical module": "\u5149\u6A21\u5757",
    "CDR lock": "CDR \u9501\u5B9A",
    "Sub-gateways": "\u4ECE\u7F51\u5173\u5217\u8868",
    "Downstream ports": "\u4E0B\u884C\u7AEF\u53E3",
    "ONU ID": "ONU ID",
    Vendor: "\u4F9B\u5E94\u5546",
    Model: "\u578B\u53F7",
    "Optical serial": "\u5149\u7EA4 SN",
    Registration: "\u6CE8\u518C\u72B6\u6001",
    Business: "\u4E1A\u52A1\u72B6\u6001",
    Firmware: "\u56FA\u4EF6\u7248\u672C",
    "Data interface": "\u6570\u636E\u63A5\u53E3",
    CWMP: "CWMP",
    Synchronization: "\u914D\u7F6E\u540C\u6B65",
    "Wi-Fi sync": "Wi-Fi \u540C\u6B65",
    Details: "\u8BE6\u60C5",
    "Port status": "\u7AEF\u53E3\u72B6\u6001",
    ONU: "ONU",
    "MAC address": "MAC \u5730\u5740",
    Locked: "\u5DF2\u9501\u5B9A",
    Unlocked: "\u672A\u9501\u5B9A",
    Connected: "\u5DF2\u8FDE\u63A5",
    Disconnected: "\u672A\u8FDE\u63A5",
    Ready: "\u5DF2\u5C31\u7EEA",
    Online: "\u5728\u7EBF",
    Offline: "\u79BB\u7EBF",
    "Waiting Inform": "\u7B49\u5F85 Inform",
    "Offline or stale": "\u79BB\u7EBF\u6216\u8FC7\u671F",
    Discovering: "\u53D1\u73B0\u4E2D",
    Completed: "\u5DF2\u5B8C\u6210",
    Interrupted: "\u5DF2\u4E2D\u65AD",
    Blocked: "\u5DF2\u963B\u585E",
    Reconciling: "\u8C03\u8C10\u4E2D",
    Pending: "\u7B49\u5F85\u4E2D",
    "Not started": "\u672A\u5F00\u59CB",
    Verified: "\u5DF2\u6821\u9A8C",
    "WAN pending": "WAN \u5F15\u5BFC\u4E2D",
    Synced: "\u5DF2\u540C\u6B65",
    "Not configured": "\u672A\u914D\u7F6E",
    "Attention required": "\u9700\u6CE8\u610F",
    "Stale revision": "\u7248\u672C\u8FC7\u671F",
    "Stale management": "\u7BA1\u7406\u8FC7\u671F",
    Unverified: "\u4E0B\u53D1\u672A\u6821\u9A8C",
    Enabled: "\u5DF2\u542F\u7528",
    Disabled: "\u5DF2\u7981\u7528",
    Provisioning: "\u914D\u7F6E\u4E0B\u53D1",
    Mode: "\u6A21\u5F0F",
    Revision: "\u7248\u672C\u53F7",
    "No registered sub-gateways.": "\u65E0\u5DF2\u6CE8\u518C\u4ECE\u7F51\u5173\u3002",
    "O5 (Operation)": "O5 \u8FD0\u884C",
    "Link up": "\u5DF2\u8FDE\u901A",
    "Link down": "\u5DF2\u65AD\u5F00",
    Unavailable: "\u4E0D\u53EF\u7528",
    Unknown: "\u672A\u77E5",
    "Received bytes": "\u63A5\u6536\u5B57\u8282\u6570",
    "Received packets": "\u63A5\u6536\u6570\u636E\u5305",
    "Received multicast": "\u63A5\u6536\u7EC4\u64AD\u5305",
    "Receive errors": "\u63A5\u6536\u9519\u8BEF",
    "Receive dropped": "\u63A5\u6536\u4E22\u5F03",
    "Transmitted bytes": "\u53D1\u9001\u5B57\u8282\u6570",
    "Transmitted packets": "\u53D1\u9001\u6570\u636E\u5305",
    "Transmit errors": "\u53D1\u9001\u9519\u8BEF",
    "Transmit dropped": "\u53D1\u9001\u4E22\u5F03",
    "Previous configuration": "\u5386\u53F2\u914D\u7F6E",
    "Management stale": "\u7BA1\u7406\u4FE1\u606F\u8FC7\u671F",
    "Provisioning status unavailable": "\u914D\u7F6E\u4E0B\u53D1\u72B6\u6001\u4E0D\u53EF\u7528",
    wan_reconciling: "WAN \u8C03\u8C10\u4E2D",
    wan_verifying: "WAN \u6821\u9A8C\u4E2D",
    wifi_reconciling: "Wi-Fi \u8C03\u8C10\u4E2D",
    discovering: "\u53D1\u73B0\u4E2D",
    reading: "\u8BFB\u53D6\u4E2D",
    disabling: "\u7981\u7528\u4E2D",
    disabling_read: "\u7981\u7528\u6821\u9A8C\u4E2D",
    writing: "\u5199\u5165\u4E2D",
    verifying: "\u6821\u9A8C\u4E2D",
    settling: "\u7A33\u5B9A\u4E2D"
};
function tr(key) {
    const translated = _(key);
    if (translated && translated !== key) return translated;
    const isZh = /zh/i.test(document.documentElement.getAttribute("lang") || window.L?.env?.lang || navigator.language || "");
    if (isZh && I18N_DICT[key]) return I18N_DICT[key];
    return translated || key;
}
const view_text = (value)=>value === null || value === undefined || value === "" ? "\u2014" : String(value);
function updateBadge(node, type, label, title) {
    node.textContent = label;
    if (type === "none") {
        node.className = "";
    } else {
        node.className = `fttr-badge fttr-badge-${type}`;
    }
    if (title) {
        node.setAttribute("title", title);
    } else {
        node.removeAttribute("title");
    }
}
/** Extract primary firmware version and preserve all software images for hover tooltip */ function formatFirmware(raw) {
    if (!raw) return {
        display: "\u2014"
    };
    const match = raw.match(/image\s*\d+:\s*([^;,\s]+)/i);
    if (match?.[1]) {
        return {
            display: match[1],
            full: raw.replace(/;\s*/g, "\n")
        };
    }
    return {
        display: raw
    };
}
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
    if (value < 1000) return `${value} ${tr("Received packets").includes("\u5305") ? "\u5305" : "Pkts."}`;
    return `${(value / 1000).toFixed(2)} K${tr("Received packets").includes("\u5305") ? "\u5305" : "Pkts."}`;
}
function formatLinkSpeed(speed) {
    if (speed === undefined || !Number.isFinite(speed) || speed <= 0) return tr("Unknown");
    if (speed >= 1000) return `${speed / 1000}\u{202F}GbE`;
    return `${speed}\u{202F}MbE`;
}
function createPortCard(number) {
    const ifnameNode = /*#__PURE__*/ jsx("span", {});
    const speedNode = /*#__PURE__*/ jsx("span", {
        children: tr("Unknown")
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
        class: "ifacebox fttr-port-card",
        "data-fttr-port": String(number),
        style: "box-sizing:border-box;width:100%;margin:0;cursor:pointer",
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
                                    tr("Port status"),
                                    ": "
                                ]
                            }),
                            portStateNode,
                            /*#__PURE__*/ jsx("br", {}),
                            /*#__PURE__*/ jsxs("strong", {
                                children: [
                                    tr("ONU"),
                                    ": "
                                ]
                            }),
                            onuNode,
                            /*#__PURE__*/ jsx("br", {}),
                            /*#__PURE__*/ jsxs("strong", {
                                children: [
                                    tr("MAC address"),
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
                    style: "text-align:left;font-size:80%;line-height:1.4",
                    children: [
                        /*#__PURE__*/ jsxs("div", {
                            style: "white-space:nowrap",
                            children: [
                                "\u25B2\u202F",
                                txSummaryNode
                            ]
                        }),
                        /*#__PURE__*/ jsxs("div", {
                            style: "white-space:nowrap",
                            children: [
                                "\u25BC\u202F",
                                rxSummaryNode
                            ]
                        }),
                        /*#__PURE__*/ jsx("span", {
                            class: "cbi-tooltip",
                            children: /*#__PURE__*/ jsxs("span", {
                                children: [
                                    /*#__PURE__*/ jsxs("span", {
                                        class: "nowrap",
                                        children: [
                                            /*#__PURE__*/ jsxs("strong", {
                                                children: [
                                                    tr("Received bytes"),
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
                                                    tr("Received packets"),
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
                                                    tr("Received multicast"),
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
                                                    tr("Receive errors"),
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
                                                    tr("Receive dropped"),
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
                                                    tr("Transmitted bytes"),
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
                                                    tr("Transmitted packets"),
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
                                                    tr("Transmit errors"),
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
                                                    tr("Transmit dropped"),
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
    element.addEventListener("mouseenter", ()=>{
        const currentOnuId = element.getAttribute("data-active-onu-id");
        if (currentOnuId) {
            const targetRow = document.querySelector(`[data-fttr-onu-id="${currentOnuId}"]`);
            targetRow?.classList.add("fttr-row-highlight");
        }
    });
    element.addEventListener("mouseleave", ()=>{
        document.querySelectorAll(".fttr-row-highlight").forEach((el)=>{
            el.classList.remove("fttr-row-highlight");
        });
    });
    element.addEventListener("click", ()=>{
        const currentOnuId = element.getAttribute("data-active-onu-id");
        if (currentOnuId) {
            const targetRow = document.querySelector(`[data-fttr-onu-id="${currentOnuId}"]`);
            if (targetRow) {
                targetRow.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
                targetRow.classList.add("fttr-row-highlight");
                window.setTimeout(()=>targetRow.classList.remove("fttr-row-highlight"), 1500);
            }
        }
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
            if (port?.onu_id !== undefined) {
                element.setAttribute("data-active-onu-id", String(port.onu_id));
            } else {
                element.removeAttribute("data-active-onu-id");
            }
            if (connected) {
                element.classList.add("port-up");
                element.classList.remove("port-down");
            } else {
                element.classList.add("port-down");
                element.classList.remove("port-up");
            }
            ifnameNode.textContent = ifname;
            iconNode.setAttribute("src", `/luci-static/resources/icons/${connected ? "port_up.svg" : "port_down.svg"}`);
            speedNode.textContent = connected ? device?.link?.speed !== undefined ? formatLinkSpeed(device.link.speed) : tr("Connected") : carrier === false ? tr("Disconnected") : tr("Unknown");
            speedNode.setAttribute("title", _("\u901F\u5EA6\uFF1A%s Mbit/s\uFF0C\u53CC\u5DE5\uFF1A%s").format(view_text(device?.link?.speed), view_text(device?.link?.duplex)));
            linkBarNode.style.opacity = connected ? "1" : "0.25";
            linkBarNode.style.backgroundColor = connected ? "rgb(46, 204, 113)" : "rgba(200, 200, 200, 0.4)";
            portStateNode.textContent = view_text(port?.link_state ?? port?.status ?? (device ? carrier ? tr("Link up") : tr("Link down") : tr("Unavailable")));
            onuNode.textContent = view_text(port?.onu_sn ?? onu?.serial_number ?? port?.onu_id);
            macNode.textContent = view_text(device?.mac);
            txSummaryNode.textContent = !connected && !txBytes ? "\u2014" : formatBytes(txBytes);
            rxSummaryNode.textContent = !connected && !rxBytes ? "\u2014" : formatBytes(rxBytes);
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
const REGISTRATION_STATE_LABELS = {
    O1Initial: _("O1 Initial"),
    O2Standby: _("O2 Standby"),
    O3Serial_Number: _("O3 Serial Number"),
    O4Ranging: _("O4 Ranging"),
    O5Operation: _("O5 (Operation)"),
    O6POPUP: _("O6 POPUP"),
    O7Emergency_Stop: _("O7 Emergency Stop")
};
const CWMP_STATE_LABELS = {
    online: _("Online"),
    waiting_inform: _("Waiting Inform"),
    offline_or_stale: _("Offline or stale")
};
const PROVISIONING_STATE_LABELS = {
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
    failed: _("Failed"),
    error: _("Error"),
    blocked: _("Blocked"),
    not_started: _("Not started")
};
const WIFI_SYNC_STATE_LABELS = {
    not_configured: _("Not configured"),
    stale_revision: _("Stale revision"),
    stale_management: _("Stale management"),
    verified: _("Verified"),
    attention_required: _("Attention required"),
    accepted_unverified: _("Unverified"),
    pending: _("Pending")
};
function renderCwmpBadge(node, state) {
    if (!state) {
        updateBadge(node, "none", "\u2014");
    } else if (state === "online") {
        updateBadge(node, "success", tr(CWMP_STATE_LABELS.online));
    } else if (state === "waiting_inform") {
        updateBadge(node, "warning", tr(CWMP_STATE_LABELS.waiting_inform));
    } else if (state === "offline_or_stale") {
        updateBadge(node, "danger", tr(CWMP_STATE_LABELS.offline_or_stale));
    } else {
        updateBadge(node, "neutral", view_text(state));
    }
}
function renderProvisioningBadge(node, state, title) {
    if (!state || state === "not_started") {
        updateBadge(node, "neutral", tr(PROVISIONING_STATE_LABELS.not_started), title);
    } else if (state === "completed" || state === "verified") {
        updateBadge(node, "success", state === "completed" ? tr(PROVISIONING_STATE_LABELS.completed) : tr("Ready"), title);
    } else if (state === "wan_reconciling" || state === "wan_verifying" || state === "wifi_reconciling" || state === "discovering" || state === "reading" || state === "disabling" || state === "disabling_read" || state === "writing" || state === "verifying" || state === "settling") {
        const rawLabel = PROVISIONING_STATE_LABELS[state] ?? state;
        updateBadge(node, "info", tr(rawLabel), title);
    } else if (state === "interrupted" || state === "failed" || state === "error" || state === "blocked") {
        const rawLabel = state === "blocked" ? PROVISIONING_STATE_LABELS.blocked : PROVISIONING_STATE_LABELS.interrupted;
        updateBadge(node, "danger", tr(rawLabel), title);
    } else if (state === "waiting" || state === "pending") {
        updateBadge(node, "warning", tr(PROVISIONING_STATE_LABELS.waiting), title);
    } else {
        updateBadge(node, "neutral", view_text(state), title);
    }
}
function renderWifiSyncBadge(node, state) {
    if (!state || state === "not_configured") {
        updateBadge(node, "neutral", tr(WIFI_SYNC_STATE_LABELS.not_configured));
    } else if (state === "verified") {
        updateBadge(node, "success", tr(WIFI_SYNC_STATE_LABELS.verified));
    } else if (state === "attention_required") {
        updateBadge(node, "danger", tr(WIFI_SYNC_STATE_LABELS.attention_required));
    } else if (state === "stale_revision" || state === "stale_management") {
        updateBadge(node, "warning", tr(WIFI_SYNC_STATE_LABELS[state]));
    } else if (state === "accepted_unverified" || state === "pending") {
        updateBadge(node, "warning", tr(WIFI_SYNC_STATE_LABELS[state]));
    } else {
        updateBadge(node, "neutral", view_text(state));
    }
}
function createOnuRow(onu) {
    let current = onu;
    const onuIdNode = /*#__PURE__*/ jsx("span", {});
    const vendorNode = /*#__PURE__*/ jsx("span", {});
    const modelNode = /*#__PURE__*/ jsx("span", {});
    const serialNode = /*#__PURE__*/ jsx("code", {
        style: "font-size:90%"
    });
    const registrationNode = /*#__PURE__*/ jsx("span", {
        class: "fttr-badge"
    });
    const businessNode = /*#__PURE__*/ jsx("span", {
        class: "fttr-badge"
    });
    const firmwareNode = /*#__PURE__*/ jsx("span", {
        style: "font-size:90%"
    });
    const dataInterfaceNode = /*#__PURE__*/ jsx("code", {
        style: "font-size:90%"
    });
    const cwmpNode = /*#__PURE__*/ jsx("span", {
        class: "fttr-badge"
    });
    const provisioningNode = /*#__PURE__*/ jsx("span", {
        class: "fttr-badge"
    });
    const wifiSyncNode = /*#__PURE__*/ jsx("span", {
        class: "fttr-badge"
    });
    const element = /*#__PURE__*/ jsxs("tr", {
        "data-fttr-onu-id": String(onu.onu_id),
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
                style: "text-align:right",
                children: /*#__PURE__*/ jsx("button", {
                    type: "button",
                    class: "cbi-button cbi-button-neutral",
                    onclick: ()=>showOnuDetails(current),
                    children: tr("Details")
                })
            })
        ]
    });
    element.addEventListener("mouseenter", ()=>{
        const ifname = current.data_path?.interface;
        if (ifname) {
            const portMatch = ifname.match(/fttr(\d+)/);
            if (portMatch) {
                const portEl = document.querySelector(`[data-fttr-port="${portMatch[1]}"]`);
                portEl?.classList.add("fttr-port-highlight");
            }
        }
    });
    element.addEventListener("mouseleave", ()=>{
        document.querySelectorAll(".fttr-port-highlight").forEach((el)=>{
            el.classList.remove("fttr-port-highlight");
        });
    });
    const row = {
        element,
        update (value) {
            current = value;
            element.setAttribute("data-fttr-onu-id", String(value.onu_id));
            onuIdNode.textContent = String(value.onu_id);
            vendorNode.textContent = view_text(value.vendor);
            modelNode.textContent = view_text(value.identity?.equipment_id ?? value.model);
            serialNode.textContent = view_text(value.serial_number);
            if (value.state === "O5Operation") {
                updateBadge(registrationNode, "success", tr(REGISTRATION_STATE_LABELS.O5Operation), value.state);
            } else if (value.state) {
                const rawLabel = REGISTRATION_STATE_LABELS[value.state] ?? value.state;
                updateBadge(registrationNode, "warning", tr(rawLabel));
            } else {
                updateBadge(registrationNode, "none", "\u2014");
            }
            const bStatus = value.business_status ?? "";
            if (bStatus.startsWith("Verified")) {
                updateBadge(businessNode, "success", tr("Verified"), bStatus);
            } else if (bStatus.includes("pending")) {
                updateBadge(businessNode, "warning", tr("WAN pending"), bStatus);
            } else if (bStatus) {
                updateBadge(businessNode, "neutral", bStatus);
            } else {
                updateBadge(businessNode, "none", "\u2014");
            }
            const fw = formatFirmware(value.firmware_version || value.identity?.software_images?.join("; "));
            firmwareNode.textContent = fw.display;
            if (fw.full) {
                firmwareNode.setAttribute("title", fw.full);
            } else {
                firmwareNode.removeAttribute("title");
            }
            dataInterfaceNode.textContent = view_text(value.data_path?.interface);
            renderCwmpBadge(cwmpNode, value.management?.state);
            const provState = value.provisioning?.state;
            const provTitle = value.provisioning?.current_revision === false ? tr("Previous configuration") : value.provisioning?.management_fresh === false ? tr("Management stale") : value.provisioning?.error;
            renderProvisioningBadge(provisioningNode, provState, provTitle);
            renderWifiSyncBadge(wifiSyncNode, value.wifi_sync);
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
            children: tr("No registered sub-gateways.")
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
                                children: tr("ONU ID")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: tr("Vendor")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: tr("Model")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: tr("Optical serial")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: tr("Registration")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: tr("Business")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: tr("Firmware")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: tr("Data interface")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: tr("CWMP")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: tr("Synchronization")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: tr("Wi-Fi sync")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                style: "text-align:right",
                                children: tr("Details")
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
    const provisioningStatusNode = /*#__PURE__*/ jsx("span", {
        class: "fttr-badge"
    });
    const provisioningModeNode = /*#__PURE__*/ jsx("span", {
        class: "fttr-badge fttr-badge-info"
    });
    const provisioningRevNode = /*#__PURE__*/ jsx("code", {
        style: "font-size:90%"
    });
    const provisioningErrorNode = /*#__PURE__*/ jsx("span", {
        class: "fttr-badge fttr-badge-danger",
        style: "margin-left:.5em"
    });
    const provisioningNode = /*#__PURE__*/ jsxs("div", {
        "data-provisioning-summary": "true",
        style: "display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%",
        children: [
            /*#__PURE__*/ jsxs("span", {
                children: [
                    /*#__PURE__*/ jsxs("strong", {
                        style: "margin-right:.4em",
                        children: [
                            tr("Provisioning"),
                            ":"
                        ]
                    }),
                    provisioningStatusNode
                ]
            }),
            /*#__PURE__*/ jsxs("span", {
                children: [
                    /*#__PURE__*/ jsxs("span", {
                        style: "color:#888;margin-right:.3em",
                        children: [
                            tr("Mode"),
                            ":"
                        ]
                    }),
                    provisioningModeNode
                ]
            }),
            /*#__PURE__*/ jsxs("span", {
                children: [
                    /*#__PURE__*/ jsxs("span", {
                        style: "color:#888;margin-right:.3em",
                        children: [
                            tr("Revision"),
                            ":"
                        ]
                    }),
                    provisioningRevNode
                ]
            }),
            provisioningErrorNode
        ]
    });
    const fpgaNode = /*#__PURE__*/ jsx("span", {
        class: "fttr-badge"
    });
    const opticalNode = /*#__PURE__*/ jsx("span", {
        children: view_text(initialOptical.model)
    });
    const cdrNode = /*#__PURE__*/ jsx("span", {
        class: "fttr-badge"
    });
    const element = /*#__PURE__*/ jsxs("div", {
        class: "cbi-map fttr-overview",
        children: [
            /*#__PURE__*/ jsx("style", {
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

				.fttr-overview .fttr-badge {
					display: inline-block;
					padding: 0.18em 0.55em;
					font-size: 85%;
					font-weight: 600;
					line-height: 1.25;
					border-radius: 3px;
					white-space: nowrap;
					text-align: center;
				}

				.fttr-overview .fttr-badge-success {
					background: var(--fttr-success-bg);
					color: var(--fttr-success-color);
					border: 1px solid var(--fttr-success-border);
				}

				.fttr-overview .fttr-badge-warning {
					background: var(--fttr-warning-bg);
					color: var(--fttr-warning-color);
					border: 1px solid var(--fttr-warning-border);
				}

				.fttr-overview .fttr-badge-danger {
					background: var(--fttr-danger-bg);
					color: var(--fttr-danger-color);
					border: 1px solid var(--fttr-danger-border);
				}

				.fttr-overview .fttr-badge-info {
					background: var(--fttr-info-bg);
					color: var(--fttr-info-color);
					border: 1px solid var(--fttr-info-border);
				}

				.fttr-overview .fttr-badge-neutral {
					background: var(--fttr-neutral-bg);
					color: var(--fttr-neutral-color);
					border: 1px solid var(--fttr-neutral-border);
				}

				.fttr-overview .fttr-ports-grid {
					display: grid;
					grid-template-columns: repeat(8, minmax(0, 1fr));
					gap: 8px;
					margin-bottom: 1em;
				}

				@media (max-width: 1200px) {
					.fttr-overview .fttr-ports-grid {
						grid-template-columns: repeat(4, minmax(0, 1fr));
					}
				}

				@media (max-width: 600px) {
					.fttr-overview .fttr-ports-grid {
						grid-template-columns: repeat(2, minmax(0, 1fr));
					}
				}

				.fttr-overview .fttr-port-card {
					box-sizing: border-box;
					width: 100%;
					margin: 0;
					cursor: pointer;
					transition: opacity 0.2s, box-shadow 0.2s, transform 0.2s;
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
            /*#__PURE__*/ jsx("h2", {
                children: tr("FTTR overview")
            }),
            provisioningNode,
            /*#__PURE__*/ jsxs("div", {
                class: "cbi-section",
                children: [
                    /*#__PURE__*/ jsx("h3", {
                        children: tr("Controller")
                    }),
                    /*#__PURE__*/ jsx("table", {
                        class: "table",
                        children: /*#__PURE__*/ jsxs("tbody", {
                            children: [
                                /*#__PURE__*/ jsxs("tr", {
                                    children: [
                                        /*#__PURE__*/ jsx("th", {
                                            style: "width:15%",
                                            children: tr("FPGA status")
                                        }),
                                        /*#__PURE__*/ jsx("td", {
                                            style: "width:35%",
                                            children: fpgaNode
                                        }),
                                        /*#__PURE__*/ jsx("th", {
                                            style: "width:15%",
                                            children: tr("CDR lock")
                                        }),
                                        /*#__PURE__*/ jsx("td", {
                                            style: "width:35%",
                                            children: cdrNode
                                        })
                                    ]
                                }),
                                /*#__PURE__*/ jsxs("tr", {
                                    children: [
                                        /*#__PURE__*/ jsx("th", {
                                            children: tr("Optical module")
                                        }),
                                        /*#__PURE__*/ jsx("td", {
                                            colSpan: 3,
                                            children: opticalNode
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
                        children: tr("Sub-gateways")
                    }),
                    onuTable.element
                ]
            }),
            /*#__PURE__*/ jsxs("div", {
                class: "cbi-section",
                children: [
                    /*#__PURE__*/ jsx("h3", {
                        children: tr("Downstream ports")
                    }),
                    /*#__PURE__*/ jsx("div", {
                        class: "fttr-ports-grid",
                        children: ports.map((port)=>port.element)
                    })
                ]
            })
        ]
    });
    const update = (status, devices)=>{
        const optical = status.optical_transceiver ?? {};
        const provisioning = status.provisioning;
        if (provisioning) {
            updateBadge(provisioningStatusNode, provisioning.enabled ? "success" : "neutral", provisioning.enabled ? tr("Enabled") : tr("Disabled"));
            provisioningModeNode.textContent = view_text(provisioning.mode);
            provisioningRevNode.textContent = view_text(provisioning.revision);
            if (provisioning.error) {
                provisioningErrorNode.textContent = provisioning.error;
                provisioningErrorNode.style.display = "";
            } else {
                provisioningErrorNode.style.display = "none";
            }
            provisioningNode.style.display = "";
        } else {
            provisioningNode.textContent = tr("Provisioning status unavailable");
        }
        if (status.fpga_status === "ready") {
            updateBadge(fpgaNode, "success", tr("Ready"));
        } else if (status.fpga_status) {
            updateBadge(fpgaNode, "neutral", view_text(status.fpga_status));
        } else {
            updateBadge(fpgaNode, "none", "\u2014");
        }
        opticalNode.textContent = view_text(optical.model);
        if (optical.cdr_locked === undefined) {
            updateBadge(cdrNode, "none", "\u2014");
        } else if (optical.cdr_locked) {
            updateBadge(cdrNode, "success", tr("Locked"));
        } else {
            updateBadge(cdrNode, "warning", tr("Unlocked"));
        }
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