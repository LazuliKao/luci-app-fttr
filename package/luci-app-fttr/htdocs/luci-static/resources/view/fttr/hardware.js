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

;// CONCATENATED MODULE: ./src/view/hardware.tsx

// SPDX-License-Identifier: Apache-2.0

const view = L.view;
const rpc = L.rpc;
const hardware_getStatus = rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: true
});
const I18N_DICT = {
    "FTTR hardware status": "FTTR \u786C\u4EF6\u4E0E\u5149\u6A21\u5757\u72B6\u6001",
    "Controller hardware": "\u4E3B\u63A7\u5236\u5668\u786C\u4EF6",
    "Controller & optical transceiver": "\u4E3B\u63A7\u5236\u5668\u4E0E\u5149\u6A21\u5757",
    "Sub-gateways & optical links": "\u5B50\u7F51\u5173\u5149\u94FE\u8DEF\u4E0E\u786C\u4EF6",
    "FPGA status": "FPGA \u72B6\u6001",
    "Optical transceiver": "SFP+ \u5149\u6A21\u5757",
    "TX wavelength": "\u53D1\u5C04\u6CE2\u957F (TX)",
    "RX wavelength": "\u63A5\u6536\u6CE2\u957F (RX)",
    "Downlink PHY rate": "\u4E0B\u884C\u7269\u7406\u901F\u7387",
    "Uplink PHY rate": "\u4E0A\u884C\u7269\u7406\u901F\u7387",
    "CDR lock": "CDR \u9501\u76F8\u73AF",
    Locked: "\u5DF2\u9501\u5B9A",
    Unlocked: "\u672A\u9501\u5B9A",
    "Sub-gateway %s \u2014 %s": "\u5B50\u7F51\u5173 #%s \u2014 %s",
    "View OMCI / MIB": "\u67E5\u770B OMCI / MIB",
    "View OMCI / MIB details": "\u67E5\u770B OMCI / MIB \u8BE6\u60C5",
    Vendor: "\u4F9B\u5E94\u5546",
    "Optical serial": "\u5149\u8DEF\u5E8F\u5217\u53F7 (SN)",
    "Registration state": "\u6CE8\u518C\u72B6\u6001",
    "Identity source": "\u8EAB\u4EFD\u6570\u636E\u6E90",
    "Current registration": "\u5F53\u524D\u6CE8\u518C",
    "Cached identity": "\u7F13\u5B58\u8EAB\u4EFD",
    "Not collected": "\u672A\u91C7\u96C6",
    "Identity age": "\u8EAB\u4EFD\u65F6\u6548",
    "Equipment ID": "\u8BBE\u5907\u578B\u53F7",
    "Hardware version": "\u786C\u4EF6\u7248\u672C",
    "Firmware version": "\u56FA\u4EF6\u7248\u672C",
    "Software images": "\u8F6F\u4EF6\u955C\u50CF",
    "OMCC version": "OMCC \u7248\u672C",
    "Identity read errors": "\u8EAB\u4EFD\u8BFB\u53D6\u5F02\u5E38",
    "No sub-gateways are currently registered.": "\u5F53\u524D\u6682\u65E0\u5DF2\u6CE8\u518C\u7684\u5B50\u7F51\u5173\u3002",
    "Identity information is read-only and limited to fields provided by fttrctl status.": "\u786C\u4EF6\u4E0E\u8EAB\u4EFD\u4FE1\u606F\u5747\u4E3A\u53EA\u8BFB\uFF0C\u6570\u636E\u6765\u6E90\u4E8E fttrctl status\u3002",
    "Fiber distance": "\u5149\u7EA4\u7269\u7406\u8DDD\u79BB",
    "Optical RX power": "\u63A5\u6536\u5149\u529F\u7387 (RX)",
    "Optical TX power": "\u53D1\u5C04\u5149\u529F\u7387 (TX)",
    "Data interface": "\u6570\u636E\u63A5\u53E3",
    Temperature: "\u5DE5\u4F5C\u6E29\u5EA6",
    Voltage: "\u5DE5\u4F5C\u7535\u538B",
    "Bias current": "\u504F\u7F6E\u7535\u6D41",
    "TX power": "\u53D1\u5C04\u529F\u7387",
    Ready: "\u5C31\u7EEA",
    Online: "\u5728\u7EBF",
    Offline: "\u79BB\u7EBF",
    Connected: "\u5DF2\u8FDE\u63A5 (O5)"
};
function tr(key) {
    const translated = _(key);
    const isZh = /zh/i.test(document.documentElement.getAttribute("lang") || window.L?.env?.lang || navigator.language || "");
    if (isZh && I18N_DICT[key]) return I18N_DICT[key];
    return translated || key;
}
const hardware_text = (value)=>value === null || value === undefined || value === "" ? "\u2014" : String(value);
function formatFirmware(raw) {
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
function formatAge(seconds) {
    if (seconds === undefined || !Number.isFinite(seconds) || seconds < 0) return "\u2014";
    if (seconds < 60) return `${seconds} \u{79D2}\u{524D}`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} \u{5206}\u{949F}\u{524D}`;
    const hours = Math.floor(minutes / 60);
    const remMin = minutes % 60;
    return `${hours} \u{5C0F}\u{65F6} ${remMin} \u{5206}\u{949F}\u{524D}`;
}
function formatPower(power) {
    if (power === undefined || !Number.isFinite(power)) return "\u2014";
    return `${power.toFixed(2)} dBm`;
}
function renderStateBadge(stateVal) {
    if (!stateVal) return /*#__PURE__*/ jsx("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: "\u2014"
    });
    if (stateVal === "O5Operation" || stateVal === "online" || stateVal === "ready" || stateVal === "connected") {
        return /*#__PURE__*/ jsx("span", {
            class: "fttr-badge fttr-badge-success",
            title: stateVal,
            children: stateVal === "O5Operation" ? tr("Connected") : tr("Ready")
        });
    }
    if (stateVal.includes("O4") || stateVal.includes("ranging") || stateVal.includes("sync")) {
        return /*#__PURE__*/ jsx("span", {
            class: "fttr-badge fttr-badge-warning",
            title: stateVal,
            children: stateVal
        });
    }
    return /*#__PURE__*/ jsx("span", {
        class: "fttr-badge fttr-badge-neutral",
        title: stateVal,
        children: stateVal
    });
}
function renderCdrBadge(locked) {
    if (locked === undefined) return /*#__PURE__*/ jsx("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: "\u2014"
    });
    return locked ? /*#__PURE__*/ jsx("span", {
        class: "fttr-badge fttr-badge-success",
        children: tr("Locked")
    }) : /*#__PURE__*/ jsx("span", {
        class: "fttr-badge fttr-badge-warning",
        children: tr("Unlocked")
    });
}
function createControllerPanel(status) {
    const optical = status.optical_transceiver ?? {};
    const fpgaStatusNode = /*#__PURE__*/ jsx("span", {
        class: "fttr-badge fttr-badge-success",
        style: "font-size:95%",
        children: status.fpga_status ? tr("Ready") : "\u2014"
    });
    const cdrNode = renderCdrBadge(optical.cdr_locked);
    return /*#__PURE__*/ jsxs("div", {
        class: "cbi-section fttr-panel-controller",
        children: [
            /*#__PURE__*/ jsx("h3", {
                style: "margin-bottom:12px",
                children: tr("Controller hardware")
            }),
            /*#__PURE__*/ jsxs("div", {
                class: "fttr-grid-3",
                children: [
                    /*#__PURE__*/ jsxs("div", {
                        class: "fttr-card",
                        children: [
                            /*#__PURE__*/ jsx("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: tr("FPGA status")
                            }),
                            /*#__PURE__*/ jsxs("div", {
                                class: "fttr-kv-row",
                                children: [
                                    /*#__PURE__*/ jsx("span", {
                                        class: "fttr-kv-label",
                                        children: tr("FPGA status")
                                    }),
                                    /*#__PURE__*/ jsx("span", {
                                        children: fpgaStatusNode
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsxs("div", {
                                class: "fttr-kv-row",
                                children: [
                                    /*#__PURE__*/ jsx("span", {
                                        class: "fttr-kv-label",
                                        children: "FPGA \u6807\u8BC6"
                                    }),
                                    /*#__PURE__*/ jsx("code", {
                                        children: hardware_text(status.fpga_status)
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsxs("div", {
                                class: "fttr-kv-row",
                                children: [
                                    /*#__PURE__*/ jsx("span", {
                                        class: "fttr-kv-label",
                                        children: tr("CDR lock")
                                    }),
                                    /*#__PURE__*/ jsx("span", {
                                        children: cdrNode
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsxs("div", {
                        class: "fttr-card",
                        children: [
                            /*#__PURE__*/ jsx("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: tr("Optical transceiver")
                            }),
                            /*#__PURE__*/ jsxs("div", {
                                class: "fttr-kv-row",
                                children: [
                                    /*#__PURE__*/ jsx("span", {
                                        class: "fttr-kv-label",
                                        children: "\u6A21\u5757\u578B\u53F7"
                                    }),
                                    /*#__PURE__*/ jsx("strong", {
                                        children: hardware_text(optical.model)
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsxs("div", {
                                class: "fttr-kv-row",
                                children: [
                                    /*#__PURE__*/ jsx("span", {
                                        class: "fttr-kv-label",
                                        children: tr("TX wavelength")
                                    }),
                                    /*#__PURE__*/ jsx("span", {
                                        children: optical.wavelength_tx_nm ? `${optical.wavelength_tx_nm} nm` : "\u2014"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsxs("div", {
                                class: "fttr-kv-row",
                                children: [
                                    /*#__PURE__*/ jsx("span", {
                                        class: "fttr-kv-label",
                                        children: tr("RX wavelength")
                                    }),
                                    /*#__PURE__*/ jsx("span", {
                                        children: optical.wavelength_rx_nm ? `${optical.wavelength_rx_nm} nm` : "\u2014"
                                    })
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsxs("div", {
                        class: "fttr-card",
                        children: [
                            /*#__PURE__*/ jsx("h4", {
                                style: "margin-top:0;margin-bottom:8px;font-size:95%",
                                children: "\u7269\u7406\u901F\u7387\u4E0E\u8BCA\u65AD"
                            }),
                            /*#__PURE__*/ jsxs("div", {
                                class: "fttr-kv-row",
                                children: [
                                    /*#__PURE__*/ jsx("span", {
                                        class: "fttr-kv-label",
                                        children: tr("Downlink PHY rate")
                                    }),
                                    /*#__PURE__*/ jsx("span", {
                                        children: optical.phy_rate_downlink_gbps ? `${optical.phy_rate_downlink_gbps} Gbps` : "\u2014"
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsxs("div", {
                                class: "fttr-kv-row",
                                children: [
                                    /*#__PURE__*/ jsx("span", {
                                        class: "fttr-kv-label",
                                        children: tr("Uplink PHY rate")
                                    }),
                                    /*#__PURE__*/ jsx("span", {
                                        children: optical.phy_rate_uplink_gbps ? `${optical.phy_rate_uplink_gbps} Gbps` : "\u2014"
                                    })
                                ]
                            }),
                            optical.temperature_celsius !== undefined ? /*#__PURE__*/ jsxs("div", {
                                class: "fttr-kv-row",
                                children: [
                                    /*#__PURE__*/ jsx("span", {
                                        class: "fttr-kv-label",
                                        children: tr("Temperature")
                                    }),
                                    /*#__PURE__*/ jsxs("span", {
                                        children: [
                                            optical.temperature_celsius,
                                            " \xb0C"
                                        ]
                                    })
                                ]
                            }) : null,
                            optical.tx_power_dbm !== undefined ? /*#__PURE__*/ jsxs("div", {
                                class: "fttr-kv-row",
                                children: [
                                    /*#__PURE__*/ jsx("span", {
                                        class: "fttr-kv-label",
                                        children: tr("TX power")
                                    }),
                                    /*#__PURE__*/ jsx("span", {
                                        children: formatPower(optical.tx_power_dbm)
                                    })
                                ]
                            }) : null
                        ]
                    })
                ]
            })
        ]
    });
}
function createSubgatewaysPanel(onus) {
    if (!onus.length) {
        return /*#__PURE__*/ jsx("div", {
            class: "cbi-section fttr-panel-subgateways",
            children: /*#__PURE__*/ jsx("p", {
                style: "text-align:center;color:#888;padding:2em 0",
                children: tr("No sub-gateways are currently registered.")
            })
        });
    }
    return /*#__PURE__*/ jsx("div", {
        class: "fttr-panel-subgateways",
        children: onus.map((onu)=>{
            const identity = onu.identity ?? {};
            const softwareImages = identity.software_images ?? [];
            const fw = formatFirmware(onu.firmware_version);
            const freshness = onu.identity ? onu.identity_current ? tr("Current registration") : tr("Cached identity") : tr("Not collected");
            const freshnessBadge = /*#__PURE__*/ jsx("span", {
                class: `fttr-badge ${onu.identity_current ? "fttr-badge-info" : "fttr-badge-neutral"}`,
                style: "font-size:80%",
                children: freshness
            });
            return /*#__PURE__*/ jsxs("div", {
                class: "cbi-section fttr-onu-card",
                children: [
                    /*#__PURE__*/ jsxs("div", {
                        class: "fttr-card-header",
                        children: [
                            /*#__PURE__*/ jsxs("div", {
                                class: "fttr-card-title-group",
                                children: [
                                    /*#__PURE__*/ jsx("h3", {
                                        style: "margin:0",
                                        children: tr("Sub-gateway %s \u2014 %s").replace("%s", String(onu.onu_id)).replace("%s", hardware_text(onu.model))
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-card-meta-tags",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-badge fttr-badge-neutral",
                                                children: onu.vendor
                                            }),
                                            /*#__PURE__*/ jsx("code", {
                                                children: onu.serial_number
                                            }),
                                            renderStateBadge(onu.state),
                                            freshnessBadge
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx("div", {
                                children: /*#__PURE__*/ jsxs("button", {
                                    type: "button",
                                    class: "fttr-btn-subtle",
                                    onclick: ()=>showOnuDetails(onu, "mib"),
                                    children: [
                                        tr("View OMCI / MIB details"),
                                        " \u2192"
                                    ]
                                })
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsxs("div", {
                        class: "fttr-grid-2",
                        children: [
                            /*#__PURE__*/ jsxs("div", {
                                class: "fttr-card",
                                children: [
                                    /*#__PURE__*/ jsx("h4", {
                                        style: "margin-top:0;margin-bottom:6px;font-size:92%;color:#888",
                                        children: "\u5149\u7EA4\u7269\u7406\u5C42\u4E0E\u94FE\u8DEF\u53C2\u6570"
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Optical RX power")
                                            }),
                                            /*#__PURE__*/ jsx("strong", {
                                                children: formatPower(onu.optical_rx_power_dbm)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Optical TX power")
                                            }),
                                            /*#__PURE__*/ jsx("strong", {
                                                children: formatPower(onu.optical_tx_power_dbm)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Fiber distance")
                                            }),
                                            /*#__PURE__*/ jsx("span", {
                                                children: onu.fiber_distance_m !== undefined ? `${onu.fiber_distance_m} m` : "\u2014"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Data interface")
                                            }),
                                            /*#__PURE__*/ jsx("code", {
                                                children: hardware_text(onu.data_path?.interface)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Identity age")
                                            }),
                                            /*#__PURE__*/ jsx("span", {
                                                children: formatAge(onu.identity_age_seconds)
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsxs("div", {
                                class: "fttr-card",
                                children: [
                                    /*#__PURE__*/ jsx("h4", {
                                        style: "margin-top:0;margin-bottom:6px;font-size:92%;color:#888",
                                        children: "\u786C\u4EF6\u89C4\u683C\u4E0E\u56FA\u4EF6\u955C\u50CF"
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Equipment ID")
                                            }),
                                            /*#__PURE__*/ jsx("span", {
                                                children: hardware_text(identity.equipment_id ?? onu.model)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Hardware version")
                                            }),
                                            /*#__PURE__*/ jsx("code", {
                                                children: hardware_text(identity.hardware_version ?? onu.hardware_version)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Firmware version")
                                            }),
                                            /*#__PURE__*/ jsx("span", {
                                                title: fw.full || fw.display,
                                                children: /*#__PURE__*/ jsx("strong", {
                                                    children: fw.display
                                                })
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("OMCC version")
                                            }),
                                            /*#__PURE__*/ jsx("span", {
                                                children: identity.omcc_version !== undefined ? `0x${identity.omcc_version.toString(16).padStart(2, "0")} (${identity.omcc_version})` : "\u2014"
                                            })
                                        ]
                                    }),
                                    identity.errors?.length ? /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        style: "color:#e74c3c",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Identity read errors")
                                            }),
                                            /*#__PURE__*/ jsx("span", {
                                                children: identity.errors.join("; ")
                                            })
                                        ]
                                    }) : null,
                                    softwareImages.length > 1 ? /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        style: "font-size:80%;color:#888",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Software images")
                                            }),
                                            /*#__PURE__*/ jsx("span", {
                                                children: softwareImages.join(" \xb7 ")
                                            })
                                        ]
                                    }) : null
                                ]
                            })
                        ]
                    })
                ]
            });
        })
    });
}
function renderHardwarePage(initialStatus) {
    let activeTab = "controller";
    const tabs = [
        {
            id: "controller",
            label: tr("Controller & optical transceiver")
        },
        {
            id: "subgateways",
            label: tr("Sub-gateways & optical links")
        }
    ];
    const tabItems = new Map();
    let controllerPanel = createControllerPanel(initialStatus);
    let subgatewaysPanel = createSubgatewaysPanel(initialStatus.sub_gateways ?? []);
    const switchTab = (id)=>{
        activeTab = id;
        for (const [tId, li] of tabItems){
            li.className = tId === id ? "cbi-tab" : "cbi-tab-disabled";
        }
        controllerPanel.hidden = id !== "controller";
        subgatewaysPanel.hidden = id !== "subgateways";
        window.dispatchEvent(new Event("resize"));
    };
    const tabMenu = /*#__PURE__*/ jsx("ul", {
        class: "cbi-tabmenu",
        style: "margin-top:14px;margin-bottom:0",
        children: tabs.map((tab)=>{
            const li = /*#__PURE__*/ jsx("li", {
                class: activeTab === tab.id ? "cbi-tab" : "cbi-tab-disabled",
                "data-tab": tab.id,
                children: /*#__PURE__*/ jsx("a", {
                    href: `#tab-${tab.id}`,
                    onclick: (e)=>{
                        e.preventDefault();
                        switchTab(tab.id);
                    },
                    children: tab.label
                })
            });
            tabItems.set(tab.id, li);
            return li;
        })
    });
    controllerPanel.hidden = false;
    subgatewaysPanel.hidden = true;
    const panelsContainer = /*#__PURE__*/ jsxs("div", {
        id: "fttr-panels-container",
        children: [
            controllerPanel,
            subgatewaysPanel
        ]
    });
    const root = /*#__PURE__*/ jsxs("div", {
        class: "cbi-map fttr-hardware",
        children: [
            /*#__PURE__*/ jsx("style", {
                children: `
				.fttr-hardware {
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
					.fttr-hardware {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .fttr-hardware,
				[data-theme="dark"] .fttr-hardware {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-danger-color: #e74c3c;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				.fttr-hardware .fttr-badge {
					display: inline-block;
					padding: 0.18em 0.55em;
					font-size: 85%;
					font-weight: 600;
					line-height: 1.25;
					border-radius: 3px;
					white-space: nowrap;
					text-align: center;
				}

				.fttr-hardware .fttr-badge-success {
					background: var(--fttr-success-bg);
					color: var(--fttr-success-color);
					border: 1px solid var(--fttr-success-border);
				}

				.fttr-hardware .fttr-badge-warning {
					background: var(--fttr-warning-bg);
					color: var(--fttr-warning-color);
					border: 1px solid var(--fttr-warning-border);
				}

				.fttr-hardware .fttr-badge-danger {
					background: var(--fttr-danger-bg);
					color: var(--fttr-danger-color);
					border: 1px solid var(--fttr-danger-border);
				}

				.fttr-hardware .fttr-badge-info {
					background: var(--fttr-info-bg);
					color: var(--fttr-info-color);
					border: 1px solid var(--fttr-info-border);
				}

				.fttr-hardware .fttr-badge-neutral {
					background: var(--fttr-neutral-bg);
					color: var(--fttr-neutral-color);
					border: 1px solid var(--fttr-neutral-border);
				}

				.fttr-hardware .fttr-grid-2 {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
					gap: 12px;
					margin: 8px 0;
				}

				.fttr-hardware .fttr-grid-3 {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
					gap: 12px;
					margin: 8px 0;
				}

				.fttr-hardware .fttr-card {
					padding: 12px 14px;
					border: 1px solid rgba(127, 140, 141, 0.2);
					border-radius: 6px;
					background: rgba(127, 140, 141, 0.04);
				}

				.fttr-hardware .fttr-kv-row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 5px 0;
					border-bottom: 1px dashed rgba(127, 140, 141, 0.15);
					font-size: 88%;
				}

				.fttr-hardware .fttr-kv-row:last-child {
					border-bottom: none;
				}

				.fttr-hardware .fttr-kv-label {
					color: #888;
				}

				.fttr-hardware .fttr-onu-card {
					position: relative;
					margin-bottom: 1.2em;
				}

				.fttr-hardware .fttr-card-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: wrap;
					gap: 10px;
					margin-bottom: 10px;
				}

				.fttr-hardware .fttr-card-title-group {
					display: flex;
					align-items: center;
					gap: 10px;
					flex-wrap: wrap;
				}

				.fttr-hardware .fttr-card-meta-tags {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					gap: 6px;
				}

				.fttr-hardware .fttr-btn-subtle {
					font-size: 82%;
					padding: 3px 10px;
					border: 1px solid rgba(127, 140, 141, 0.35);
					background: transparent;
					color: inherit;
					border-radius: 4px;
					cursor: pointer;
					text-decoration: none;
					transition: all 0.2s ease;
				}

				.fttr-hardware .fttr-btn-subtle:hover {
					background: rgba(52, 152, 219, 0.1);
					border-color: rgba(52, 152, 219, 0.4);
					color: #2980b9;
				}

				.fttr-hardware .cbi-tabmenu {
					margin-top: 14px;
					margin-bottom: 0;
					user-select: none;
				}

				.fttr-hardware #fttr-panels-container > .cbi-section {
					margin-top: 0;
					border-top-left-radius: 0;
				}
				`
            }),
            /*#__PURE__*/ jsx("h2", {
                children: tr("FTTR hardware status")
            }),
            tabMenu,
            panelsContainer,
            /*#__PURE__*/ jsx("p", {
                class: "cbi-footer",
                style: "margin-top:1.5em;font-size:85%;color:#888",
                children: tr("Identity information is read-only and limited to fields provided by fttrctl status.")
            })
        ]
    });
    let updating = false;
    L.Poll.add(async ()=>{
        if (!root.isConnected || updating) return;
        updating = true;
        try {
            const latest = await hardware_getStatus();
            const newController = createControllerPanel(latest);
            const newSubgateways = createSubgatewaysPanel(latest.sub_gateways ?? []);
            newController.hidden = activeTab !== "controller";
            newSubgateways.hidden = activeTab !== "subgateways";
            controllerPanel.replaceWith(newController);
            subgatewaysPanel.replaceWith(newSubgateways);
            controllerPanel = newController;
            subgatewaysPanel = newSubgateways;
        } catch  {
        // Ignore periodic poll failures
        } finally{
            updating = false;
        }
    }, 10);
    return root;
}
const main = view.extend({
    load () {
        return hardware_getStatus();
    },
    render (status) {
        return renderHardwarePage(status);
    },
    handleSaveApply: null,
    handleSave: null,
    handleReset: null
});



return main;