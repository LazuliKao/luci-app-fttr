
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


;// CONCATENATED MODULE: ./src/view/sync.tsx
// SPDX-License-Identifier: Apache-2.0

const getSync = L.rpc.declare({
    object: "luci.fttr",
    method: "get_sync",
    reject: true
});
const checkConfig = L.rpc.declare({
    object: "luci.fttr",
    method: "config_check",
    reject: true
});
const sync = L.rpc.declare({
    object: "luci.fttr",
    method: "sync",
    params: [
        "action",
        "target"
    ],
    reject: true
});
const sync_text = (value)=>value === null || value === undefined || value === "" ? "\u2014" : String(value);
const date = (value)=>value ? new Date(value * 1000).toLocaleString() : "\u2014";
function state(value) {
    return /*#__PURE__*/ jsx("span", {
        class: value === "verified" || value === "online" || value === "deleted" || value === "ready" ? "label success" : "label warning",
        children: sync_text(value)
    });
}
function itemTable(items) {
    return /*#__PURE__*/ jsx("div", {
        class: "table-wrapper",
        children: /*#__PURE__*/ jsxs("table", {
            class: "table",
            children: [
                /*#__PURE__*/ jsx("thead", {
                    children: /*#__PURE__*/ jsxs("tr", {
                        children: [
                            /*#__PURE__*/ jsx("th", {
                                children: _("Configuration item")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: _("Type")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: _("State")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: _("Evidence freshness")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: _("Last update / task")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: _("Reason / desired changes")
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ jsx("tbody", {
                    children: items.length ? items.map((item)=>/*#__PURE__*/ jsxs("tr", {
                            children: [
                                /*#__PURE__*/ jsx("td", {
                                    children: sync_text(item.name || item.id)
                                }),
                                /*#__PURE__*/ jsx("td", {
                                    children: sync_text(item.service_type || item.kind)
                                }),
                                /*#__PURE__*/ jsx("td", {
                                    children: state(item.state)
                                }),
                                /*#__PURE__*/ jsxs("td", {
                                    children: [
                                        item.current_revision === false ? _("Previous configuration") : item.current_revision === true ? _("Current configuration") : "\u2014",
                                        /*#__PURE__*/ jsx("br", {}),
                                        item.management_fresh === false ? _("Management stale") : item.management_fresh === true ? _("Management fresh") : "\u2014"
                                    ]
                                }),
                                /*#__PURE__*/ jsxs("td", {
                                    children: [
                                        date(item.updated_at),
                                        /*#__PURE__*/ jsx("br", {}),
                                        _("Task"),
                                        ": ",
                                        sync_text(item.task_id)
                                    ]
                                }),
                                /*#__PURE__*/ jsxs("td", {
                                    children: [
                                        sync_text(item.reason),
                                        (item.changes ?? []).map((change)=>/*#__PURE__*/ jsxs("div", {
                                                style: "overflow-wrap:anywhere",
                                                children: [
                                                    /*#__PURE__*/ jsx("code", {
                                                        children: change.name
                                                    }),
                                                    ": ",
                                                    change.desired
                                                ]
                                            }))
                                    ]
                                })
                            ]
                        })) : /*#__PURE__*/ jsx("tr", {
                        children: /*#__PURE__*/ jsx("td", {
                            colSpan: 6,
                            children: _("No desired items configured.")
                        })
                    })
                })
            ]
        })
    });
}
function bootstrapCard(bootstrap) {
    if (!bootstrap) return null;
    return /*#__PURE__*/ jsxs("div", {
        children: [
            /*#__PURE__*/ jsx("h4", {
                children: _("ACS bootstrap")
            }),
            /*#__PURE__*/ jsxs("p", {
                children: [
                    state(bootstrap.state),
                    " \xb7 ",
                    _("Method"),
                    ": ",
                    sync_text(bootstrap.method),
                    " \xb7 ",
                    _("Attempts"),
                    ":",
                    " ",
                    sync_text(bootstrap.attempts),
                    bootstrap.inflight ? ` \xb7 ${_("Command in progress")}` : ""
                ]
            }),
            /*#__PURE__*/ jsx("p", {
                style: "overflow-wrap:anywhere",
                children: sync_text(bootstrap.reason)
            }),
            /*#__PURE__*/ jsxs("p", {
                children: [
                    _("MQTT target"),
                    ": ",
                    /*#__PURE__*/ jsx("code", {
                        children: sync_text(bootstrap.mqtt_target)
                    }),
                    " \xb7 ",
                    _("Last telemetry"),
                    ":",
                    " ",
                    date(bootstrap.mqtt_last_seen),
                    ` \xb7 ${_("Identity source")}: ${sync_text(bootstrap.binding_source)}`,
                    /*#__PURE__*/ jsx("br", {}),
                    _("Settings verified"),
                    ": ",
                    date(bootstrap.settings_verified_at),
                    " \xb7 ",
                    _("Last Inform"),
                    ":",
                    " ",
                    date(bootstrap.last_inform),
                    /*#__PURE__*/ jsx("br", {}),
                    _("Next retry"),
                    ": ",
                    date(bootstrap.next_retry_at),
                    " \xb7 ",
                    _("Generation"),
                    ": ",
                    sync_text(bootstrap.generation),
                    " \xb7",
                    " ",
                    _("Updated"),
                    ": ",
                    date(bootstrap.updated_at)
                ]
            }),
            bootstrap.desired ? /*#__PURE__*/ jsxs("p", {
                style: "overflow-wrap:anywhere",
                children: [
                    _("Management VLAN"),
                    ": ",
                    sync_text(bootstrap.desired.vlan),
                    " \xb7 ",
                    _("Priority"),
                    ":",
                    " ",
                    sync_text(bootstrap.desired.priority),
                    /*#__PURE__*/ jsx("br", {}),
                    _("ACS URL"),
                    ": ",
                    /*#__PURE__*/ jsx("code", {
                        children: sync_text(bootstrap.desired.acs_url)
                    })
                ]
            }) : null,
            bootstrap.listener ? /*#__PURE__*/ jsxs("p", {
                children: [
                    _("Local ACS listener"),
                    ":",
                    " ",
                    /*#__PURE__*/ jsxs("code", {
                        children: [
                            sync_text(bootstrap.listener.listen),
                            bootstrap.listener.path || ""
                        ]
                    }),
                    " ",
                    "\xb7 ",
                    _("Enabled"),
                    ": ",
                    sync_text(bootstrap.listener.enabled)
                ]
            }) : null,
            [
                bootstrap.last_error,
                bootstrap.link_identity_error,
                bootstrap.persistence_error,
                bootstrap.listener?.error,
                bootstrap.endpoint_notice
            ].filter(Boolean).map((message)=>/*#__PURE__*/ jsx("p", {
                    class: "alert-message warning",
                    style: "overflow-wrap:anywhere",
                    children: message
                })),
            bootstrap.manual_steps?.length ? /*#__PURE__*/ jsxs("details", {
                children: [
                    /*#__PURE__*/ jsx("summary", {
                        children: _("Management setup / reachability guidance")
                    }),
                    /*#__PURE__*/ jsx("div", {
                        children: bootstrap.manual_steps.map((step, index)=>/*#__PURE__*/ jsxs("p", {
                                children: [
                                    index + 1,
                                    ". ",
                                    step
                                ]
                            }))
                    })
                ]
            }) : null
        ]
    });
}
function deviceCard(device, opened, reset, busy) {
    const op = device.provisioning;
    const lifecycle = [
        ...Object.entries(op.wan_lifecycle ?? {}).map((param)=>{
            let [id, item] = param;
            return {
                ...item,
                id: `WAN ${id}`,
                kind: "WAN lifecycle"
            };
        }),
        ...Object.entries(op.wifi_lifecycle ?? {}).map((param)=>{
            let [id, item] = param;
            return {
                ...item,
                id: `WLAN ${id}`,
                kind: "WLAN lifecycle"
            };
        })
    ];
    return /*#__PURE__*/ jsxs("div", {
        class: "cbi-section",
        children: [
            /*#__PURE__*/ jsxs("h3", {
                children: [
                    device.name || device.optical_sn,
                    " (",
                    device.adapter,
                    ")"
                ]
            }),
            L.hasViewPermission() ? /*#__PURE__*/ jsxs("p", {
                children: [
                    /*#__PURE__*/ jsx("button", {
                        type: "button",
                        class: "cbi-button cbi-button-action",
                        disabled: busy,
                        onclick: ()=>reset(device),
                        children: _("Reset synchronization state")
                    }),
                    " ",
                    _("Clear old tasks and managed-object records after a device factory reset. The next preview or apply reads the device again.")
                ]
            }) : null,
            /*#__PURE__*/ jsxs("p", {
                children: [
                    sync_text(device.group_name),
                    " \xb7 ",
                    sync_text(device.template_name),
                    " \xb7 OMCI: ",
                    state(device.omci_management?.state),
                    " ",
                    device.omci_management?.reason || ""
                ]
            }),
            /*#__PURE__*/ jsxs("p", {
                children: [
                    _("CWMP"),
                    ": ",
                    state(device.management?.state),
                    " ",
                    _("Synchronization"),
                    ": ",
                    state(op.state),
                    " ",
                    _("Wi-Fi"),
                    ":",
                    " ",
                    state(device.wifi_sync)
                ]
            }),
            /*#__PURE__*/ jsxs("p", {
                children: [
                    _("Operation"),
                    ": ",
                    sync_text(op.operation_id),
                    " (",
                    sync_text(op.mode),
                    ") \xb7 ",
                    _("Started"),
                    ": ",
                    date(op.started_at),
                    " \xb7",
                    " ",
                    _("Revision"),
                    ": ",
                    /*#__PURE__*/ jsx("code", {
                        children: sync_text(op.revision)
                    })
                ]
            }),
            itemTable(op.items ?? []),
            bootstrapCard(device.acs_bootstrap),
            lifecycle.length ? /*#__PURE__*/ jsxs("div", {
                children: [
                    /*#__PURE__*/ jsx("h4", {
                        children: _("WAN / WLAN lifecycle results")
                    }),
                    itemTable(lifecycle)
                ]
            }) : null,
            /*#__PURE__*/ jsxs("details", {
                "data-device": device.device,
                open: opened,
                children: [
                    /*#__PURE__*/ jsx("summary", {
                        children: _("Managed objects and lifecycle intent")
                    }),
                    /*#__PURE__*/ jsxs("p", {
                        children: [
                            _("Wi-Fi cleanup policy"),
                            ": ",
                            sync_text(op.wifi_cleanup),
                            " \xb7 ",
                            _("Wi-Fi stage"),
                            ": ",
                            sync_text(op.wifi_stage)
                        ]
                    }),
                    /*#__PURE__*/ jsx("pre", {
                        style: "white-space:pre-wrap;overflow-wrap:anywhere",
                        children: JSON.stringify({
                            wan_objects: op.wan_objects ?? {},
                            wifi_objects: op.wifi_objects ?? {}
                        }, null, 2)
                    })
                ]
            })
        ]
    });
}
const main = L.view.extend({
    load () {
        return Promise.all([
            getSync(),
            checkConfig()
        ]);
    },
    render (param) {
        let [initial, initialCheck] = param;
        const heading = /*#__PURE__*/ jsx("p", {});
        const error = /*#__PURE__*/ jsx("p", {
            class: "alert-message warning",
            hidden: true,
            "aria-live": "polite"
        });
        const result = /*#__PURE__*/ jsx("p", {
            "aria-live": "polite"
        });
        const target = /*#__PURE__*/ jsxs("select", {
            children: [
                /*#__PURE__*/ jsx("option", {
                    value: "all",
                    children: _("All devices")
                }),
                (initial.devices ?? []).map((d)=>/*#__PURE__*/ jsx("option", {
                        value: d.device,
                        children: d.device
                    }))
            ]
        });
        const content = /*#__PURE__*/ jsx("div", {});
        const managementContent = /*#__PURE__*/ jsx("div", {});
        let current = initial;
        let committed = initialCheck;
        let busy = false;
        let refreshing = false;
        const buttons = [];
        const reset = async (device)=>{
            if (busy) return;
            busy = true;
            update(current);
            try {
                const reply = await sync("reset_state", device.device);
                if (!reply || reply.error) throw new Error(String(reply?.error ?? "Empty synchronization reply"));
                result.textContent = _("Synchronization state reset for %s. Preview differences to read the current device state.").format(device.name || device.optical_sn);
                update(await getSync());
            } catch (failure) {
                result.textContent = String(failure);
            } finally{
                busy = false;
                update(current);
            }
        };
        const run = async (action)=>{
            if (busy) return;
            busy = true;
            for (const button of buttons)button.disabled = true;
            update(current);
            try {
                const reply = await sync(action, target.value);
                if (!reply || reply.error) throw new Error(String(reply?.error ?? "Empty synchronization reply"));
                result.textContent = action.startsWith("management_") ? _("Management operation started; status is refreshed below.") : _("Started: %s").format((reply.operation_ids ?? []).join(", "));
                update(await getSync());
            } catch (failure) {
                result.textContent = String(failure);
            } finally{
                busy = false;
                update(current);
            }
        };
        const plan = /*#__PURE__*/ jsx("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: ()=>run("plan"),
            children: _("Preview differences (read-only)")
        });
        const apply = /*#__PURE__*/ jsx("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            onclick: ()=>run("apply"),
            children: _("Apply differences")
        });
        buttons.push(plan, apply);
        const managementPlan = /*#__PURE__*/ jsx("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: ()=>run("management_plan"),
            children: _("Check management differences (read-only)")
        });
        const managementApply = /*#__PURE__*/ jsx("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            onclick: ()=>run("management_apply"),
            children: _("Apply management configuration")
        });
        buttons.push(managementPlan, managementApply);
        const managementPanel = /*#__PURE__*/ jsxs("div", {
            class: "cbi-section",
            children: [
                /*#__PURE__*/ jsx("h3", {
                    children: _("Isolated TR069 management network")
                }),
                managementContent,
                /*#__PURE__*/ jsxs("p", {
                    children: [
                        managementPlan,
                        " ",
                        managementApply
                    ]
                })
            ]
        });
        const manual = /*#__PURE__*/ jsxs("div", {
            class: "cbi-section",
            children: [
                /*#__PURE__*/ jsx("h3", {
                    children: _("Manual synchronization")
                }),
                /*#__PURE__*/ jsxs("label", {
                    children: [
                        _("Target"),
                        ": ",
                        target
                    ]
                }),
                " ",
                plan,
                " ",
                apply
            ]
        });
        const root = /*#__PURE__*/ jsxs("div", {
            class: "cbi-map",
            children: [
                /*#__PURE__*/ jsx("h2", {
                    children: _("FTTR synchronization")
                }),
                heading,
                error,
                managementPanel,
                manual,
                result,
                content
            ]
        });
        function update(status) {
            current = status;
            heading.textContent = `${_("Provisioning")}: ${status.enabled ? _("Enabled") : _("Disabled")} \xb7 ${_("Mode")}: ${sync_text(status.mode)} \xb7 ${_("Revision")}: ${sync_text(status.revision)} \xb7 ${_("Triggers")}: ${(status.triggers ?? []).join(", ")} \xb7 ${_("Interval")}: ${sync_text(status.interval)} s`;
            const messages = [
                status.error,
                committed.error ? _("Committed configuration is invalid: %s").format(committed.error) : committed.revision && committed.revision !== status.revision ? _("Committed configuration has not been loaded. Check Configuration diagnostics; an active operation may have prevented reload.") : ""
            ].filter(Boolean);
            error.hidden = !messages.length;
            error.textContent = messages.join(" \u2014 ");
            const names = [
                "all",
                ...Array.from(new Set((status.devices ?? []).map((d)=>d.group).filter(Boolean))).map((g)=>`group:${g}`),
                ...(status.devices ?? []).map((d)=>d.device)
            ];
            if (Array.from(target.options).map((o)=>o.value).join("\n") !== names.join("\n")) {
                const selected = target.value;
                target.replaceChildren(...names.map((name)=>/*#__PURE__*/ jsx("option", {
                        value: name,
                        children: name === "all" ? _("All devices") : name.startsWith("group:") ? (status.devices ?? []).find((d)=>`group:${d.group}` === name)?.group_name || name : (status.devices ?? []).find((d)=>d.device === name)?.name || name
                    })));
                target.value = names.includes(selected) ? selected : "all";
            }
            manual.hidden = status.mode !== "manual" || !L.hasViewPermission();
            const active = (status.devices ?? []).filter((d)=>target.value === "all" || d.device === target.value || `group:${d.group}` === target.value).some((d)=>![
                    "completed",
                    "not_started",
                    "interrupted"
                ].includes(d.provisioning.state ?? "not_started"));
            plan.disabled = busy || active || !!committed.error || !!committed.revision && committed.revision !== status.revision || !(status.devices ?? []).length;
            apply.disabled = plan.disabled || !status.enabled;
            const host = status.management_network;
            managementPlan.disabled = busy || !!host?.inflight || !!committed.error || !L.hasViewPermission();
            managementApply.disabled = managementPlan.disabled;
            managementContent.replaceChildren(/*#__PURE__*/ jsxs("div", {
                children: [
                    /*#__PURE__*/ jsxs("p", {
                        children: [
                            _("State"),
                            ": ",
                            sync_text(host?.state),
                            " \xb7 ",
                            _("Desired version"),
                            ": ",
                            sync_text(host?.desired_version),
                            " \xb7",
                            " ",
                            _("Applied version"),
                            ": ",
                            sync_text(host?.applied_version)
                        ]
                    }),
                    /*#__PURE__*/ jsxs("p", {
                        children: [
                            _("Next retry"),
                            ": ",
                            date(host?.next_retry_at)
                        ]
                    }),
                    host?.error ? /*#__PURE__*/ jsx("p", {
                        class: "alert-message warning",
                        children: host.error
                    }) : null,
                    /*#__PURE__*/ jsx("p", {
                        children: _("Saving in manual mode does not create interfaces, change firewall rules or configure child devices. Apply explicitly to authorize the current management configuration.")
                    }),
                    /*#__PURE__*/ jsx("pre", {
                        style: "white-space:pre-wrap;overflow-wrap:anywhere",
                        children: JSON.stringify({
                            desired: host?.desired,
                            applied: host?.applied,
                            plan: host?.plan ?? []
                        }, null, 2)
                    })
                ]
            }));
            const opened = new Set(Array.from(content.querySelectorAll("details[open]")).map((d)=>d.getAttribute("data-device")));
            content.replaceChildren(...(status.devices ?? []).map((d)=>deviceCard(d, opened.has(d.device), reset, busy)));
        }
        target.addEventListener("change", ()=>update(current));
        update(initial);
        L.Poll.add(async ()=>{
            if (!root.isConnected || refreshing) return;
            refreshing = true;
            try {
                const [status, check] = await Promise.all([
                    getSync(),
                    checkConfig()
                ]);
                committed = check;
                update(status);
            } catch (failure) {
                error.hidden = false;
                error.textContent = _("Status refresh failed: %s").format(String(failure));
            } finally{
                refreshing = false;
            }
        }, 5);
        return root;
    },
    handleSave: null,
    handleSaveApply: null,
    handleReset: null
});



return main;