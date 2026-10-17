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
const STATE_I18N = {
    ready: {
        label: "\u5C31\u7EEA",
        type: "success"
    },
    verified: {
        label: "\u5DF2\u6821\u9A8C",
        type: "success"
    },
    online: {
        label: "\u5728\u7EBF",
        type: "success"
    },
    completed: {
        label: "\u5DF2\u5B8C\u6210",
        type: "success"
    },
    applied: {
        label: "\u5DF2\u5E94\u7528",
        type: "success"
    },
    waiting_inform: {
        label: "\u7B49\u5F85 Inform",
        type: "warning"
    },
    pending: {
        label: "\u5F85\u540C\u6B65",
        type: "warning"
    },
    awaiting_apply: {
        label: "\u5F85\u5E94\u7528\u6388\u6743",
        type: "warning"
    },
    syncing: {
        label: "\u540C\u6B65\u4E2D",
        type: "info"
    },
    discovering: {
        label: "\u63A2\u6D4B\u4E2D",
        type: "info"
    },
    not_started: {
        label: "\u672A\u542F\u52A8",
        type: "neutral"
    },
    disabled: {
        label: "\u5DF2\u7981\u7528",
        type: "neutral"
    },
    enabled: {
        label: "\u5DF2\u542F\u7528",
        type: "success"
    },
    interrupted: {
        label: "\u5DF2\u4E2D\u65AD",
        type: "danger"
    },
    failed: {
        label: "\u5DF2\u5931\u8D25",
        type: "danger"
    },
    stale: {
        label: "\u5DF2\u5931\u6548",
        type: "warning"
    },
    error: {
        label: "\u5F02\u5E38",
        type: "danger"
    },
    deleted: {
        label: "\u5DF2\u5220\u9664",
        type: "neutral"
    }
};
const STATE_EN_LABELS = {
    waiting_inform: "Waiting Inform",
    not_started: "Not Started",
    awaiting_apply: "Awaiting Apply",
    ready: "Ready",
    verified: "Verified",
    online: "Online",
    completed: "Completed",
    applied: "Applied",
    syncing: "Syncing",
    discovering: "Discovering",
    disabled: "Disabled",
    enabled: "Enabled",
    interrupted: "Interrupted",
    failed: "Failed",
    stale: "Stale",
    error: "Error",
    deleted: "Deleted",
    pending: "Pending"
};
const I18N_DICT = {
    "FTTR synchronization": "FTTR \u914D\u7F6E\u540C\u6B65",
    Provisioning: "\u914D\u7F6E\u4E0B\u53D1\u5F15\u64CE",
    Mode: "\u5DE5\u4F5C\u6A21\u5F0F",
    Revision: "\u7248\u672C\u53F7",
    Triggers: "\u89E6\u53D1\u4E8B\u4EF6",
    Interval: "\u8F6E\u8BE2\u95F4\u9694",
    Enabled: "\u5DF2\u542F\u7528",
    Disabled: "\u5DF2\u7981\u7528",
    "Isolated TR069 management network": "TR069 \u9694\u79BB\u7BA1\u7406\u7F51\u7EDC",
    "Management network": "\u7BA1\u7406\u7F51\u7EDC",
    "Management interface": "\u7BA1\u7406\u63A5\u53E3",
    "Management VLAN": "\u7BA1\u7406 VLAN",
    Priority: "\u4F18\u5148\u7EA7",
    "Service IP / Netmask": "\u670D\u52A1 IP / \u63A9\u7801",
    "ACS URL": "ACS \u670D\u52A1\u5730\u5740",
    "DHCP service": "DHCP \u670D\u52A1",
    "Desired version": "\u671F\u671B\u7248\u672C",
    "Applied version": "\u5DF2\u5E94\u7528\u7248\u672C",
    "Next retry": "\u4E0B\u6B21\u91CD\u8BD5",
    Synchronized: "\u5DF2\u540C\u6B65",
    "Pending apply": "\u5F85\u5E94\u7528",
    "Check management differences (read-only)": "\u68C0\u67E5\u7BA1\u7406\u5DEE\u5F02\uFF08\u53EA\u8BFB\uFF09",
    "Apply management configuration": "\u5E94\u7528\u7BA1\u7406\u7F51\u7EDC\u914D\u7F6E",
    "Saving in manual mode does not create interfaces, change firewall rules or configure child devices. Apply explicitly to authorize the current management configuration.": "\u624B\u52A8\u6A21\u5F0F\u4E0B\u4FDD\u5B58\u4E0D\u4F1A\u81EA\u52A8\u521B\u5EFA\u63A5\u53E3\u3001\u4FEE\u6539\u9632\u706B\u5899\u89C4\u5219\u6216\u914D\u7F6E\u5B50\u7F51\u5173\u3002\u8BF7\u663E\u5F0F\u70B9\u51FB\u5E94\u7528\u4EE5\u6388\u6743\u5E76\u751F\u6548\u5F53\u524D\u7BA1\u7406\u914D\u7F6E\u3002",
    "Pending configuration changes": "\u5F85\u751F\u6548\u914D\u7F6E\u53D8\u66F4",
    "No pending changes. Management network is in sync.": "\u65E0\u5F85\u751F\u6548\u53D8\u66F4\uFF0C\u7BA1\u7406\u7F51\u7EDC\u5904\u4E8E\u540C\u6B65\u72B6\u6001\u3002",
    "Advanced diagnostics / Raw configuration (JSON)": "\u9AD8\u7EA7\u8BCA\u65AD / \u539F\u59CB\u914D\u7F6E\u5DEE\u5F02 (JSON)",
    "Manual synchronization": "\u624B\u52A8\u540C\u6B65\u64CD\u4F5C",
    Target: "\u76EE\u6807\u5BF9\u8C61",
    "All devices": "\u5168\u90E8\u5B50\u7F51\u5173",
    "Preview differences (read-only)": "\u9884\u89C8\u5DEE\u5F02\uFF08\u53EA\u8BFB\uFF09",
    "Apply differences": "\u4E0B\u53D1\u5DEE\u5F02\u914D\u7F6E",
    "Reset synchronization state": "\u91CD\u7F6E\u540C\u6B65\u72B6\u6001",
    "Clear old tasks and managed-object records after a device factory reset. The next preview or apply reads the device again.": "\u5728\u5B50\u7F51\u5173\u6062\u590D\u51FA\u5382\u8BBE\u7F6E\u540E\u6E05\u9664\u5386\u53F2\u4EFB\u52A1\u548C\u6258\u7BA1\u5BF9\u8C61\u8BB0\u5F55\uFF0C\u4E0B\u6B21\u9884\u89C8\u6216\u4E0B\u53D1\u5C06\u91CD\u65B0\u8BFB\u53D6\u8BE5\u8BBE\u5907\u72B6\u6001\u3002",
    "Are you sure you want to reset the synchronization state for %s?": "\u786E\u5B9A\u8981\u91CD\u7F6E %s \u7684\u540C\u6B65\u72B6\u6001\u5417\uFF1F\u91CD\u7F6E\u540E\u5C06\u6E05\u9664\u5386\u53F2\u4EFB\u52A1\u8BB0\u5F55\uFF0C\u91CD\u65B0\u540C\u6B65\u3002",
    "Configuration item": "\u914D\u7F6E\u9879",
    Type: "\u7C7B\u578B",
    State: "\u72B6\u6001",
    "Evidence freshness": "\u8BC1\u636E\u65F6\u6548",
    "Last update / task": "\u6700\u540E\u66F4\u65B0 / \u4EFB\u52A1",
    "Reason / desired changes": "\u539F\u56E0 / \u671F\u671B\u53D8\u66F4",
    "Current configuration": "\u5F53\u524D\u4FEE\u8BA2",
    "Previous configuration": "\u5386\u53F2\u4FEE\u8BA2",
    "Management fresh": "\u6709\u6548",
    "Management stale": "\u5931\u6548",
    Task: "\u4EFB\u52A1",
    "No desired items configured.": "\u672A\u914D\u7F6E\u671F\u671B\u540C\u6B65\u9879\u3002",
    "CWMP contract": "CWMP \u5951\u7EA6\u80FD\u529B",
    Capabilities: "\u80FD\u529B\u96C6",
    Bindings: "\u7ED1\u5B9A\u5173\u7CFB",
    Schema: "\u6570\u636E\u6A21\u578B",
    Cache: "\u5951\u7EA6\u7F13\u5B58",
    Matched: "\u5DF2\u547D\u4E2D\u7F13\u5B58",
    "Fresh discovery": "\u5168\u65B0\u63A2\u6D4B\u53D1\u73B0",
    "ACS bootstrap": "ACS \u5F15\u5BFC\u4E0E\u63A5\u5165",
    Method: "\u5F15\u5BFC\u65B9\u5F0F",
    Attempts: "\u91CD\u8BD5\u6B21\u6570",
    "Command in progress": "\u6307\u4EE4\u6267\u884C\u4E2D",
    "Authorize and apply management settings": "\u6388\u6743\u5E76\u5E94\u7528\u7BA1\u7406\u8BBE\u7F6E",
    "Required after management drift or service restart; verifies the child ACS settings before business synchronization.": "\u7BA1\u7406\u7F51\u7EDC\u914D\u7F6E\u6F02\u79FB\u6216\u670D\u52A1\u91CD\u542F\u540E\u5FC5\u9700\uFF1B\u5728\u4E1A\u52A1\u540C\u6B65\u524D\u6821\u9A8C\u5B50\u7F51\u5173 ACS \u8BBE\u7F6E\u3002",
    "MQTT target": "MQTT \u4E3B\u9898",
    "Last telemetry": "\u6700\u540E\u9065\u6D4B",
    "Identity source": "\u6807\u8BC6\u6765\u6E90",
    "Settings verified": "\u8BBE\u7F6E\u6821\u9A8C\u65F6\u95F4",
    "Last Inform": "\u6700\u540E Inform",
    Generation: "\u8FED\u4EE3\u4EE3\u6570",
    Updated: "\u66F4\u65B0\u65F6\u95F4",
    "Local ACS listener": "\u672C\u5730 ACS \u76D1\u542C\u5668",
    "Management setup / reachability guidance": "\u7BA1\u7406\u7F51\u7EDC\u914D\u7F6E\u4E0E\u53EF\u8FBE\u6027\u6392\u969C\u6307\u5F15",
    "WAN / WLAN lifecycle results": "WAN / WLAN \u751F\u547D\u5468\u671F\u7ED3\u679C",
    "Managed objects and lifecycle intent": "\u6258\u7BA1\u5BF9\u8C61\u4E0E\u751F\u547D\u5468\u671F\u610F\u56FE",
    "Wi-Fi cleanup policy": "Wi-Fi \u6E05\u7406\u7B56\u7565",
    "Wi-Fi stage": "Wi-Fi \u9636\u6BB5",
    Operation: "\u64CD\u4F5C ID",
    Started: "\u542F\u52A8\u65F6\u95F4",
    Group: "\u5206\u7EC4",
    Template: "\u6A21\u677F",
    "Synchronization state reset for %s. Preview differences to read the current device state.": "\u5DF2\u91CD\u7F6E %s \u7684\u540C\u6B65\u72B6\u6001\u3002\u8BF7\u70B9\u51FB\u201C\u9884\u89C8\u5DEE\u5F02\u201D\u4EE5\u8BFB\u53D6\u8BE5\u8BBE\u5907\u7684\u6700\u65B0\u72B6\u6001\u3002",
    "Management operation started; status is refreshed below.": "\u7BA1\u7406\u7F51\u7EDC\u64CD\u4F5C\u5DF2\u542F\u52A8\uFF0C\u6700\u65B0\u72B6\u6001\u5C06\u5728\u4E0B\u65B9\u5237\u65B0\u3002",
    "Started: %s": "\u5DF2\u542F\u52A8\u64CD\u4F5C\uFF1A%s",
    "Status refresh failed: %s": "\u72B6\u6001\u5237\u65B0\u5931\u8D25\uFF1A%s",
    None: "\u65E0"
};
function tr(key) {
    const translated = _(key);
    const isZh = /zh/i.test(document.documentElement.getAttribute("lang") || window.L?.env?.lang || navigator.language || "");
    if (isZh && I18N_DICT[key]) return I18N_DICT[key];
    return translated || key;
}
const sync_text = (value)=>value === null || value === undefined || value === "" ? "\u2014" : String(value);
const date = (value)=>value ? new Date(value * 1000).toLocaleString() : "\u2014";
function renderStateBadge(value) {
    if (!value) return /*#__PURE__*/ jsx("span", {
        class: "fttr-badge fttr-badge-neutral",
        children: "\u2014"
    });
    const isZh = /zh/i.test(document.documentElement.getAttribute("lang") || window.L?.env?.lang || navigator.language || "");
    const entry = STATE_I18N[value];
    const label = isZh ? entry?.label || value : STATE_EN_LABELS[value] || value;
    const badgeType = entry?.type || "neutral";
    return /*#__PURE__*/ jsx("span", {
        class: `fttr-badge fttr-badge-${badgeType}`,
        title: value,
        children: label
    });
}
function renderFreshness(currentRev, mgmtFresh) {
    return /*#__PURE__*/ jsxs("div", {
        style: "display:flex;flex-direction:column;gap:3px;align-items:flex-start",
        children: [
            currentRev === true ? /*#__PURE__*/ jsx("span", {
                class: "fttr-badge fttr-badge-info",
                style: "font-size:78%",
                children: tr("Current configuration")
            }) : currentRev === false ? /*#__PURE__*/ jsx("span", {
                class: "fttr-badge fttr-badge-neutral",
                style: "font-size:78%",
                children: tr("Previous configuration")
            }) : /*#__PURE__*/ jsx("span", {
                children: "\u2014"
            }),
            mgmtFresh === true ? /*#__PURE__*/ jsx("span", {
                class: "fttr-badge fttr-badge-success",
                style: "font-size:78%",
                children: tr("Management fresh")
            }) : mgmtFresh === false ? /*#__PURE__*/ jsx("span", {
                class: "fttr-badge fttr-badge-warning",
                style: "font-size:78%",
                children: tr("Management stale")
            }) : null
        ]
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
                                children: tr("Configuration item")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: tr("Type")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: tr("State")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: tr("Evidence freshness")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: tr("Last update / task")
                            }),
                            /*#__PURE__*/ jsx("th", {
                                children: tr("Reason / desired changes")
                            })
                        ]
                    })
                }),
                /*#__PURE__*/ jsx("tbody", {
                    children: items.length ? items.map((item)=>/*#__PURE__*/ jsxs("tr", {
                            children: [
                                /*#__PURE__*/ jsx("td", {
                                    children: /*#__PURE__*/ jsx("strong", {
                                        children: sync_text(item.name || item.id)
                                    })
                                }),
                                /*#__PURE__*/ jsx("td", {
                                    children: /*#__PURE__*/ jsx("span", {
                                        class: "fttr-badge fttr-badge-info",
                                        style: "font-size:80%",
                                        children: item.service_type === "wifi" || item.kind === "wifi" ? "Wi-Fi" : item.service_type === "wan" || item.kind === "wan" ? "WAN" : sync_text(item.service_type || item.kind)
                                    })
                                }),
                                /*#__PURE__*/ jsx("td", {
                                    children: renderStateBadge(item.state)
                                }),
                                /*#__PURE__*/ jsx("td", {
                                    children: renderFreshness(item.current_revision, item.management_fresh)
                                }),
                                /*#__PURE__*/ jsxs("td", {
                                    children: [
                                        /*#__PURE__*/ jsx("div", {
                                            children: date(item.updated_at)
                                        }),
                                        item.task_id !== undefined && item.task_id !== null ? /*#__PURE__*/ jsxs("span", {
                                            class: "fttr-badge fttr-badge-neutral",
                                            style: "font-size:75%;margin-top:2px",
                                            children: [
                                                tr("Task"),
                                                " #",
                                                item.task_id
                                            ]
                                        }) : null
                                    ]
                                }),
                                /*#__PURE__*/ jsxs("td", {
                                    children: [
                                        item.reason ? /*#__PURE__*/ jsx("div", {
                                            style: "margin-bottom:3px;color:#555;overflow-wrap:anywhere",
                                            children: item.reason
                                        }) : null,
                                        (item.changes ?? []).length ? /*#__PURE__*/ jsx("div", {
                                            style: "font-size:85%",
                                            children: (item.changes ?? []).map((change)=>/*#__PURE__*/ jsxs("div", {
                                                    style: "overflow-wrap:anywhere;margin-top:2px",
                                                    children: [
                                                        /*#__PURE__*/ jsx("code", {
                                                            children: change.name
                                                        }),
                                                        " = ",
                                                        /*#__PURE__*/ jsx("code", {
                                                            children: change.desired
                                                        })
                                                    ]
                                                }))
                                        }) : !item.reason && "\u2014"
                                    ]
                                })
                            ]
                        })) : /*#__PURE__*/ jsx("tr", {
                        children: /*#__PURE__*/ jsx("td", {
                            colSpan: 6,
                            style: "text-align:center;color:#888;padding:1em",
                            children: tr("No desired items configured.")
                        })
                    })
                })
            ]
        })
    });
}
function bootstrapCard(bootstrap, applyManagement, managementApplyDisabled) {
    if (!bootstrap) return null;
    return /*#__PURE__*/ jsxs("div", {
        style: "margin-top:1.2em",
        children: [
            /*#__PURE__*/ jsxs("div", {
                style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:0.5em",
                children: [
                    /*#__PURE__*/ jsx("h4", {
                        style: "margin:0",
                        children: tr("ACS bootstrap")
                    }),
                    /*#__PURE__*/ jsxs("div", {
                        style: "display:flex;align-items:center;gap:6px",
                        children: [
                            renderStateBadge(bootstrap.state),
                            bootstrap.inflight ? /*#__PURE__*/ jsx("span", {
                                class: "fttr-badge fttr-badge-info",
                                children: tr("Command in progress")
                            }) : null
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ jsxs("div", {
                class: "fttr-card",
                children: [
                    /*#__PURE__*/ jsxs("div", {
                        class: "fttr-grid-3",
                        children: [
                            /*#__PURE__*/ jsxs("div", {
                                children: [
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Method")
                                            }),
                                            /*#__PURE__*/ jsx("code", {
                                                children: sync_text(bootstrap.method)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Attempts")
                                            }),
                                            /*#__PURE__*/ jsx("span", {
                                                children: sync_text(bootstrap.attempts)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Identity source")
                                            }),
                                            /*#__PURE__*/ jsx("span", {
                                                children: sync_text(bootstrap.binding_source)
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsxs("div", {
                                children: [
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Management VLAN")
                                            }),
                                            /*#__PURE__*/ jsx("span", {
                                                children: bootstrap.desired?.vlan !== undefined ? `VLAN ${bootstrap.desired.vlan} (Prio ${bootstrap.desired.priority ?? 0})` : "\u2014"
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("ACS URL")
                                            }),
                                            /*#__PURE__*/ jsx("code", {
                                                style: "font-size:80%",
                                                children: sync_text(bootstrap.desired?.acs_url)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Local ACS listener")
                                            }),
                                            /*#__PURE__*/ jsx("code", {
                                                style: "font-size:80%",
                                                children: bootstrap.listener?.listen ? `${bootstrap.listener.listen}${bootstrap.listener.path || ""}` : "\u2014"
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsxs("div", {
                                children: [
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Last telemetry")
                                            }),
                                            /*#__PURE__*/ jsx("span", {
                                                style: "font-size:85%",
                                                children: date(bootstrap.mqtt_last_seen)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Last Inform")
                                            }),
                                            /*#__PURE__*/ jsx("span", {
                                                style: "font-size:85%",
                                                children: date(bootstrap.last_inform)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Settings verified")
                                            }),
                                            /*#__PURE__*/ jsx("span", {
                                                style: "font-size:85%",
                                                children: date(bootstrap.settings_verified_at)
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    bootstrap.mqtt_target ? /*#__PURE__*/ jsxs("div", {
                        style: "font-size:85%;color:#666;margin-top:6px;border-top:1px dashed rgba(127,140,141,0.15);padding-top:6px",
                        children: [
                            /*#__PURE__*/ jsxs("span", {
                                style: "color:#888",
                                children: [
                                    tr("MQTT target"),
                                    ":"
                                ]
                            }),
                            " ",
                            /*#__PURE__*/ jsx("code", {
                                children: bootstrap.mqtt_target
                            })
                        ]
                    }) : null,
                    bootstrap.reason ? /*#__PURE__*/ jsx("div", {
                        style: "font-size:85%;color:#d35400;margin-top:6px;overflow-wrap:anywhere",
                        children: bootstrap.reason
                    }) : null,
                    bootstrap.state === "awaiting_apply" ? /*#__PURE__*/ jsxs("div", {
                        style: "margin-top:10px;padding:8px;background:rgba(243,156,18,0.1);border-radius:4px;border:1px solid rgba(243,156,18,0.3)",
                        children: [
                            /*#__PURE__*/ jsx("button", {
                                type: "button",
                                class: "cbi-button cbi-button-positive",
                                disabled: managementApplyDisabled,
                                onclick: applyManagement,
                                children: tr("Authorize and apply management settings")
                            }),
                            " ",
                            /*#__PURE__*/ jsx("span", {
                                style: "font-size:85%;color:#666",
                                children: tr("Required after management drift or service restart; verifies the child ACS settings before business synchronization.")
                            })
                        ]
                    }) : null
                ]
            }),
            [
                bootstrap.last_error,
                bootstrap.link_identity_error,
                bootstrap.persistence_error,
                bootstrap.listener?.error,
                bootstrap.endpoint_notice
            ].filter(Boolean).map((message)=>/*#__PURE__*/ jsx("div", {
                    class: "alert-message warning",
                    style: "overflow-wrap:anywhere;margin-top:8px",
                    children: message
                })),
            bootstrap.manual_steps?.length ? /*#__PURE__*/ jsxs("details", {
                style: "margin-top:8px",
                children: [
                    /*#__PURE__*/ jsx("summary", {
                        style: "cursor:pointer;user-select:none;font-weight:600",
                        children: tr("Management setup / reachability guidance")
                    }),
                    /*#__PURE__*/ jsx("div", {
                        style: "padding:6px 0",
                        children: bootstrap.manual_steps.map((step, index)=>/*#__PURE__*/ jsxs("p", {
                                style: "margin:4px 0;font-size:90%",
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
function deviceCard(device, opened, reset, applyManagement, managementApplyDisabled, busy) {
    const op = device.provisioning;
    const lifecycle = [
        ...Object.entries(op.wan_lifecycle ?? {}).map((param)=>{
            let [id, item] = param;
            return {
                ...item,
                id: `WAN ${id}`,
                kind: "WAN"
            };
        }),
        ...Object.entries(op.wifi_lifecycle ?? {}).map((param)=>{
            let [id, item] = param;
            return {
                ...item,
                id: `WLAN ${id}`,
                kind: "Wi-Fi"
            };
        })
    ];
    const confirmReset = ()=>{
        const label = device.name || device.optical_sn;
        if (window.confirm(tr("Are you sure you want to reset the synchronization state for %s?").replace("%s", label))) {
            reset(device);
        }
    };
    return /*#__PURE__*/ jsxs("div", {
        class: "cbi-section fttr-device-card",
        children: [
            /*#__PURE__*/ jsxs("div", {
                class: "fttr-card-header",
                children: [
                    /*#__PURE__*/ jsxs("div", {
                        class: "fttr-card-title-group",
                        children: [
                            /*#__PURE__*/ jsxs("h3", {
                                style: "margin:0",
                                children: [
                                    device.name || device.optical_sn,
                                    " ",
                                    /*#__PURE__*/ jsxs("small", {
                                        style: "font-size:75%;font-weight:normal;color:#888",
                                        children: [
                                            "(",
                                            device.adapter,
                                            ")"
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsxs("div", {
                                class: "fttr-card-meta-tags",
                                children: [
                                    device.group_name ? /*#__PURE__*/ jsx("span", {
                                        class: "fttr-badge fttr-badge-neutral",
                                        title: tr("Group"),
                                        children: device.group_name
                                    }) : null,
                                    device.template_name ? /*#__PURE__*/ jsx("span", {
                                        class: "fttr-badge fttr-badge-neutral",
                                        title: tr("Template"),
                                        children: device.template_name
                                    }) : null,
                                    /*#__PURE__*/ jsxs("span", {
                                        style: "font-size:85%;color:#666",
                                        children: [
                                            "OMCI: ",
                                            renderStateBadge(device.omci_management?.state),
                                            device.omci_management?.reason ? /*#__PURE__*/ jsxs("span", {
                                                style: "margin-left:4px;color:#888",
                                                title: device.omci_management.reason,
                                                children: [
                                                    "(",
                                                    device.omci_management.reason,
                                                    ")"
                                                ]
                                            }) : null
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    L.hasViewPermission() ? /*#__PURE__*/ jsx("div", {
                        class: "fttr-card-actions",
                        children: /*#__PURE__*/ jsx("button", {
                            type: "button",
                            class: "fttr-btn-subtle",
                            disabled: busy,
                            title: tr("Clear old tasks and managed-object records after a device factory reset. The next preview or apply reads the device again."),
                            onclick: confirmReset,
                            children: tr("Reset synchronization state")
                        })
                    }) : null
                ]
            }),
            /*#__PURE__*/ jsxs("div", {
                class: "fttr-device-status-strip",
                children: [
                    /*#__PURE__*/ jsxs("div", {
                        class: "fttr-status-pill-group",
                        children: [
                            /*#__PURE__*/ jsxs("span", {
                                children: [
                                    /*#__PURE__*/ jsx("span", {
                                        class: "fttr-pill-label",
                                        children: "CWMP:"
                                    }),
                                    " ",
                                    renderStateBadge(device.management?.state)
                                ]
                            }),
                            /*#__PURE__*/ jsxs("span", {
                                children: [
                                    /*#__PURE__*/ jsxs("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            tr("Synchronization"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    renderStateBadge(op.state)
                                ]
                            }),
                            /*#__PURE__*/ jsxs("span", {
                                children: [
                                    /*#__PURE__*/ jsx("span", {
                                        class: "fttr-pill-label",
                                        children: "Wi-Fi:"
                                    }),
                                    " ",
                                    renderStateBadge(device.wifi_sync)
                                ]
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsxs("div", {
                        class: "fttr-status-op-info",
                        children: [
                            /*#__PURE__*/ jsxs("span", {
                                children: [
                                    tr("Operation"),
                                    ": ",
                                    /*#__PURE__*/ jsx("strong", {
                                        children: sync_text(op.operation_id)
                                    }),
                                    " (",
                                    sync_text(op.mode),
                                    ")"
                                ]
                            }),
                            /*#__PURE__*/ jsx("span", {
                                children: "\xb7"
                            }),
                            /*#__PURE__*/ jsxs("span", {
                                children: [
                                    tr("Started"),
                                    ": ",
                                    date(op.started_at)
                                ]
                            }),
                            /*#__PURE__*/ jsx("span", {
                                children: "\xb7"
                            }),
                            /*#__PURE__*/ jsxs("span", {
                                children: [
                                    tr("Revision"),
                                    ": ",
                                    /*#__PURE__*/ jsx("code", {
                                        children: sync_text(op.revision)
                                    })
                                ]
                            })
                        ]
                    })
                ]
            }),
            itemTable(op.items ?? []),
            op.cwmp_contract ? /*#__PURE__*/ jsxs("div", {
                style: "margin-top:1.2em",
                children: [
                    /*#__PURE__*/ jsx("h4", {
                        style: "margin-bottom:0.5em",
                        children: tr("CWMP contract")
                    }),
                    /*#__PURE__*/ jsxs("div", {
                        class: "fttr-card",
                        children: [
                            /*#__PURE__*/ jsxs("div", {
                                style: "display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                                children: [
                                    /*#__PURE__*/ jsxs("div", {
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                children: sync_text(op.cwmp_contract.requested)
                                            }),
                                            " \u2192",
                                            " ",
                                            /*#__PURE__*/ jsx("code", {
                                                children: sync_text(op.cwmp_contract.contract)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsx("div", {
                                        children: renderStateBadge(op.cwmp_contract.state)
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsxs("div", {
                                style: "display:flex;flex-wrap:wrap;gap:12px;margin-bottom:6px;font-size:90%",
                                children: [
                                    /*#__PURE__*/ jsxs("span", {
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                style: "color:#888",
                                                children: "WAN:"
                                            }),
                                            " ",
                                            renderStateBadge(op.cwmp_contract.capabilities?.wan)
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("span", {
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                style: "color:#888",
                                                children: "WLAN:"
                                            }),
                                            " ",
                                            renderStateBadge(op.cwmp_contract.capabilities?.wlan)
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("span", {
                                        children: [
                                            /*#__PURE__*/ jsxs("span", {
                                                style: "color:#888",
                                                children: [
                                                    tr("Bindings"),
                                                    ":"
                                                ]
                                            }),
                                            " ",
                                            renderStateBadge(op.cwmp_contract.capabilities?.binding)
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("span", {
                                        children: [
                                            /*#__PURE__*/ jsxs("span", {
                                                style: "color:#888",
                                                children: [
                                                    tr("Cache"),
                                                    ":"
                                                ]
                                            }),
                                            " ",
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-badge fttr-badge-info",
                                                style: "font-size:80%",
                                                children: op.cwmp_contract.cache_hit ? tr("Matched") : tr("Fresh discovery")
                                            })
                                        ]
                                    })
                                ]
                            }),
                            op.cwmp_contract.schema ? /*#__PURE__*/ jsxs("div", {
                                style: "font-size:85%;color:#666",
                                children: [
                                    tr("Schema"),
                                    ": ",
                                    /*#__PURE__*/ jsx("code", {
                                        children: op.cwmp_contract.schema
                                    })
                                ]
                            }) : null,
                            op.cwmp_contract.reason ? /*#__PURE__*/ jsx("div", {
                                style: "font-size:85%;margin-top:4px;color:#e67e22",
                                children: op.cwmp_contract.reason
                            }) : null
                        ]
                    })
                ]
            }) : null,
            bootstrapCard(device.acs_bootstrap, applyManagement, managementApplyDisabled),
            lifecycle.length ? /*#__PURE__*/ jsxs("div", {
                style: "margin-top:1.2em",
                children: [
                    /*#__PURE__*/ jsx("h4", {
                        style: "margin-bottom:0.5em",
                        children: tr("WAN / WLAN lifecycle results")
                    }),
                    itemTable(lifecycle)
                ]
            }) : null,
            /*#__PURE__*/ jsxs("details", {
                "data-device": device.device,
                open: opened,
                style: "margin-top:1em",
                children: [
                    /*#__PURE__*/ jsx("summary", {
                        style: "cursor:pointer;user-select:none;font-weight:600",
                        children: tr("Managed objects and lifecycle intent")
                    }),
                    /*#__PURE__*/ jsxs("div", {
                        style: "padding:8px 0",
                        children: [
                            /*#__PURE__*/ jsxs("div", {
                                style: "display:flex;gap:16px;flex-wrap:wrap;font-size:90%;margin-bottom:6px",
                                children: [
                                    /*#__PURE__*/ jsxs("span", {
                                        children: [
                                            /*#__PURE__*/ jsxs("span", {
                                                style: "color:#888",
                                                children: [
                                                    tr("Wi-Fi cleanup policy"),
                                                    ":"
                                                ]
                                            }),
                                            " ",
                                            sync_text(op.wifi_cleanup)
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("span", {
                                        children: [
                                            /*#__PURE__*/ jsxs("span", {
                                                style: "color:#888",
                                                children: [
                                                    tr("Wi-Fi stage"),
                                                    ":"
                                                ]
                                            }),
                                            " ",
                                            sync_text(op.wifi_stage)
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsx("pre", {
                                style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:85%;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px;max-height:240px;overflow-y:auto",
                                children: JSON.stringify({
                                    wan_objects: op.wan_objects ?? {},
                                    wifi_objects: op.wifi_objects ?? {}
                                }, null, 2)
                            })
                        ]
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
        const heading = /*#__PURE__*/ jsx("div", {});
        const error = /*#__PURE__*/ jsx("p", {
            class: "alert-message warning",
            hidden: true,
            "aria-live": "polite"
        });
        const result = /*#__PURE__*/ jsx("div", {
            class: "fttr-sync-result",
            "aria-live": "polite",
            style: "margin:10px 0"
        });
        const target = /*#__PURE__*/ jsxs("select", {
            class: "cbi-input-select",
            children: [
                /*#__PURE__*/ jsx("option", {
                    value: "all",
                    children: tr("All devices")
                }),
                (initial.devices ?? []).map((d)=>/*#__PURE__*/ jsx("option", {
                        value: d.device,
                        children: d.name || d.device
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
                result.replaceChildren(/*#__PURE__*/ jsx("div", {
                    class: "alert-message info",
                    children: tr("Synchronization state reset for %s. Preview differences to read the current device state.").replace("%s", device.name || device.optical_sn)
                }));
                update(await getSync());
            } catch (failure) {
                result.replaceChildren(/*#__PURE__*/ jsx("div", {
                    class: "alert-message danger",
                    children: String(failure)
                }));
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
                const msg = action.startsWith("management_") ? tr("Management operation started; status is refreshed below.") : tr("Started: %s").replace("%s", (reply.operation_ids ?? []).join(", "));
                result.replaceChildren(/*#__PURE__*/ jsx("div", {
                    class: "alert-message info",
                    children: msg
                }));
                update(await getSync());
            } catch (failure) {
                result.replaceChildren(/*#__PURE__*/ jsx("div", {
                    class: "alert-message danger",
                    children: String(failure)
                }));
            } finally{
                busy = false;
                update(current);
            }
        };
        const plan = /*#__PURE__*/ jsx("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: ()=>run("plan"),
            children: tr("Preview differences (read-only)")
        });
        const apply = /*#__PURE__*/ jsx("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            onclick: ()=>run("apply"),
            children: tr("Apply differences")
        });
        buttons.push(plan, apply);
        const managementPlan = /*#__PURE__*/ jsx("button", {
            type: "button",
            class: "cbi-button cbi-button-action",
            onclick: ()=>run("management_plan"),
            children: tr("Check management differences (read-only)")
        });
        const managementApply = /*#__PURE__*/ jsx("button", {
            type: "button",
            class: "cbi-button cbi-button-positive",
            onclick: ()=>run("management_apply"),
            children: tr("Apply management configuration")
        });
        buttons.push(managementPlan, managementApply);
        const managementPanel = /*#__PURE__*/ jsxs("div", {
            class: "cbi-section",
            children: [
                /*#__PURE__*/ jsx("h3", {
                    children: tr("Isolated TR069 management network")
                }),
                managementContent,
                /*#__PURE__*/ jsxs("p", {
                    style: "margin-top:10px",
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
                    children: tr("Manual synchronization")
                }),
                /*#__PURE__*/ jsxs("div", {
                    style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px",
                    children: [
                        /*#__PURE__*/ jsxs("label", {
                            style: "display:flex;align-items:center;gap:8px",
                            children: [
                                /*#__PURE__*/ jsxs("span", {
                                    children: [
                                        tr("Target"),
                                        ":"
                                    ]
                                }),
                                target
                            ]
                        }),
                        /*#__PURE__*/ jsxs("div", {
                            style: "display:flex;gap:8px",
                            children: [
                                plan,
                                apply
                            ]
                        })
                    ]
                })
            ]
        });
        const root = /*#__PURE__*/ jsxs("div", {
            class: "cbi-map fttr-sync",
            children: [
                /*#__PURE__*/ jsx("style", {
                    children: `
					.fttr-sync {
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
						.fttr-sync {
							--fttr-success-color: #2ecc71;
							--fttr-warning-color: #f39c12;
							--fttr-danger-color: #e74c3c;
							--fttr-info-color: #3498db;
							--fttr-neutral-color: #bdc3c7;
						}
					}

					[data-darkmode="true"] .fttr-sync,
					[data-theme="dark"] .fttr-sync {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}

					.fttr-sync .fttr-badge {
						display: inline-block;
						padding: 0.18em 0.55em;
						font-size: 85%;
						font-weight: 600;
						line-height: 1.25;
						border-radius: 3px;
						white-space: nowrap;
						text-align: center;
					}

					.fttr-sync .fttr-badge-success {
						background: var(--fttr-success-bg);
						color: var(--fttr-success-color);
						border: 1px solid var(--fttr-success-border);
					}

					.fttr-sync .fttr-badge-warning {
						background: var(--fttr-warning-bg);
						color: var(--fttr-warning-color);
						border: 1px solid var(--fttr-warning-border);
					}

					.fttr-sync .fttr-badge-danger {
						background: var(--fttr-danger-bg);
						color: var(--fttr-danger-color);
						border: 1px solid var(--fttr-danger-border);
					}

					.fttr-sync .fttr-badge-info {
						background: var(--fttr-info-bg);
						color: var(--fttr-info-color);
						border: 1px solid var(--fttr-info-border);
					}

					.fttr-sync .fttr-badge-neutral {
						background: var(--fttr-neutral-bg);
						color: var(--fttr-neutral-color);
						border: 1px solid var(--fttr-neutral-border);
					}

					.fttr-sync .fttr-grid-2 {
						display: grid;
						grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
						gap: 12px;
						margin: 8px 0;
					}

					.fttr-sync .fttr-grid-3 {
						display: grid;
						grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
						gap: 12px;
						margin: 8px 0;
					}

					.fttr-sync .fttr-card {
						padding: 10px 14px;
						border: 1px solid rgba(127, 140, 141, 0.2);
						border-radius: 6px;
						background: rgba(127, 140, 141, 0.04);
					}

					.fttr-sync .fttr-kv-row {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 4px 0;
						border-bottom: 1px dashed rgba(127, 140, 141, 0.15);
						font-size: 88%;
					}

					.fttr-sync .fttr-kv-row:last-child {
						border-bottom: none;
					}

					.fttr-sync .fttr-kv-label {
						color: #888;
					}

					.fttr-sync .fttr-pill-label {
						color: #888;
						margin-right: 4px;
						font-size: 90%;
					}

					.fttr-sync .fttr-device-card {
						position: relative;
						margin-bottom: 1.5em;
					}

					.fttr-sync .fttr-card-header {
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
						flex-wrap: wrap;
						gap: 10px;
						margin-bottom: 10px;
					}

					.fttr-sync .fttr-card-title-group {
						display: flex;
						flex-direction: column;
						gap: 4px;
					}

					.fttr-sync .fttr-card-meta-tags {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 6px;
					}

					.fttr-sync .fttr-device-status-strip {
						display: flex;
						justify-content: space-between;
						align-items: center;
						flex-wrap: wrap;
						gap: 10px;
						padding: 8px 12px;
						background: rgba(127, 140, 141, 0.05);
						border: 1px solid rgba(127, 140, 141, 0.15);
						border-radius: 5px;
						margin-bottom: 12px;
					}

					.fttr-sync .fttr-status-pill-group {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 12px;
					}

					.fttr-sync .fttr-status-op-info {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 6px;
						font-size: 85%;
						color: #666;
					}

					.fttr-sync .fttr-btn-subtle {
						font-size: 80%;
						padding: 3px 8px;
						border: 1px solid rgba(127, 140, 141, 0.35);
						background: transparent;
						color: inherit;
						border-radius: 4px;
						cursor: pointer;
						transition: all 0.2s ease;
					}

					.fttr-sync .fttr-btn-subtle:hover {
						background: rgba(231, 76, 60, 0.1);
						border-color: rgba(231, 76, 60, 0.4);
						color: #c0392b;
					}

					.fttr-sync .table th {
						white-space: nowrap;
						user-select: none;
					}

					.fttr-sync .table td {
						vertical-align: middle;
					}
					`
                }),
                /*#__PURE__*/ jsx("h2", {
                    children: tr("FTTR synchronization")
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
            heading.replaceChildren(/*#__PURE__*/ jsxs("div", {
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
                            /*#__PURE__*/ jsx("span", {
                                class: `fttr-badge ${status.enabled ? "fttr-badge-success" : "fttr-badge-neutral"}`,
                                children: status.enabled ? tr("Enabled") : tr("Disabled")
                            })
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
                            /*#__PURE__*/ jsx("span", {
                                class: "fttr-badge fttr-badge-info",
                                children: sync_text(status.mode)
                            })
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
                            /*#__PURE__*/ jsx("code", {
                                children: sync_text(status.revision)
                            })
                        ]
                    }),
                    (status.triggers ?? []).length ? /*#__PURE__*/ jsxs("span", {
                        children: [
                            /*#__PURE__*/ jsxs("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    tr("Triggers"),
                                    ":"
                                ]
                            }),
                            /*#__PURE__*/ jsx("code", {
                                children: (status.triggers ?? []).join(", ")
                            })
                        ]
                    }) : null,
                    status.interval ? /*#__PURE__*/ jsxs("span", {
                        children: [
                            /*#__PURE__*/ jsxs("span", {
                                style: "color:#888;margin-right:.3em",
                                children: [
                                    tr("Interval"),
                                    ":"
                                ]
                            }),
                            /*#__PURE__*/ jsxs("span", {
                                children: [
                                    status.interval,
                                    " s"
                                ]
                            })
                        ]
                    }) : null
                ]
            }));
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
                        children: name === "all" ? tr("All devices") : name.startsWith("group:") ? (status.devices ?? []).find((d)=>`group:${d.group}` === name)?.group_name || name : (status.devices ?? []).find((d)=>d.device === name)?.name || name
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
            const desired = host?.desired;
            const applied = host?.applied;
            const planChanges = host?.plan ?? [];
            const isSync = Boolean(host?.applied_version) && Boolean(host?.desired_version) && host?.applied_version === host?.desired_version;
            managementContent.replaceChildren(/*#__PURE__*/ jsxs("div", {
                children: [
                    /*#__PURE__*/ jsxs("div", {
                        style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:10px",
                        children: [
                            /*#__PURE__*/ jsxs("span", {
                                children: [
                                    /*#__PURE__*/ jsxs("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            tr("State"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    renderStateBadge(host?.state)
                                ]
                            }),
                            /*#__PURE__*/ jsxs("span", {
                                children: [
                                    /*#__PURE__*/ jsxs("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            tr("Desired version"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    /*#__PURE__*/ jsx("code", {
                                        children: sync_text(host?.desired_version)
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsxs("span", {
                                children: [
                                    /*#__PURE__*/ jsxs("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            tr("Applied version"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    /*#__PURE__*/ jsx("code", {
                                        children: sync_text(host?.applied_version)
                                    })
                                ]
                            }),
                            host?.desired_version || host?.applied_version ? /*#__PURE__*/ jsx("span", {
                                children: isSync ? /*#__PURE__*/ jsx("span", {
                                    class: "fttr-badge fttr-badge-success",
                                    children: tr("Synchronized")
                                }) : /*#__PURE__*/ jsx("span", {
                                    class: "fttr-badge fttr-badge-warning",
                                    children: tr("Pending apply")
                                })
                            }) : null,
                            host?.next_retry_at ? /*#__PURE__*/ jsxs("span", {
                                children: [
                                    /*#__PURE__*/ jsxs("span", {
                                        class: "fttr-pill-label",
                                        children: [
                                            tr("Next retry"),
                                            ":"
                                        ]
                                    }),
                                    " ",
                                    date(host.next_retry_at)
                                ]
                            }) : null
                        ]
                    }),
                    /*#__PURE__*/ jsxs("div", {
                        class: "fttr-grid-3",
                        children: [
                            /*#__PURE__*/ jsxs("div", {
                                class: "fttr-card",
                                children: [
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Management interface")
                                            }),
                                            /*#__PURE__*/ jsx("strong", {
                                                children: sync_text(desired?.interface || applied?.interface || "br-lan.40")
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Management VLAN")
                                            }),
                                            /*#__PURE__*/ jsxs("span", {
                                                children: [
                                                    "VLAN ",
                                                    sync_text(desired?.vlan ?? applied?.vlan ?? 40),
                                                    " (Prio",
                                                    " ",
                                                    sync_text(desired?.priority ?? applied?.priority ?? 0),
                                                    ")"
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsxs("div", {
                                class: "fttr-card",
                                children: [
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Service IP / Netmask")
                                            }),
                                            /*#__PURE__*/ jsxs("code", {
                                                children: [
                                                    sync_text(desired?.address || applied?.address || "192.168.40.1"),
                                                    desired?.netmask ? ` / ${desired.netmask}` : ""
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("DHCP service")
                                            }),
                                            /*#__PURE__*/ jsx("span", {
                                                children: (desired?.dhcp_enabled ?? applied?.dhcp_enabled) !== false ? /*#__PURE__*/ jsx("span", {
                                                    class: "fttr-badge fttr-badge-success",
                                                    children: tr("Enabled")
                                                }) : /*#__PURE__*/ jsx("span", {
                                                    class: "fttr-badge fttr-badge-neutral",
                                                    children: tr("Disabled")
                                                })
                                            })
                                        ]
                                    })
                                ]
                            }),
                            /*#__PURE__*/ jsxs("div", {
                                class: "fttr-card",
                                children: [
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("ACS URL")
                                            }),
                                            /*#__PURE__*/ jsx("code", {
                                                style: "font-size:80%",
                                                children: sync_text(desired?.acs_url || applied?.acs_url)
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        class: "fttr-kv-row",
                                        children: [
                                            /*#__PURE__*/ jsx("span", {
                                                class: "fttr-kv-label",
                                                children: tr("Mode")
                                            }),
                                            /*#__PURE__*/ jsx("span", {
                                                children: sync_text(desired?.mode || applied?.mode || status.mode)
                                            })
                                        ]
                                    })
                                ]
                            })
                        ]
                    }),
                    planChanges.length ? /*#__PURE__*/ jsxs("div", {
                        style: "margin-top:10px",
                        children: [
                            /*#__PURE__*/ jsx("h5", {
                                style: "margin-bottom:4px;font-size:90%",
                                children: tr("Pending configuration changes")
                            }),
                            /*#__PURE__*/ jsx("div", {
                                class: "table-wrapper",
                                children: /*#__PURE__*/ jsxs("table", {
                                    class: "table",
                                    style: "font-size:85%",
                                    children: [
                                        /*#__PURE__*/ jsx("thead", {
                                            children: /*#__PURE__*/ jsxs("tr", {
                                                children: [
                                                    /*#__PURE__*/ jsx("th", {
                                                        children: tr("Operation")
                                                    }),
                                                    /*#__PURE__*/ jsx("th", {
                                                        children: tr("Configuration item")
                                                    }),
                                                    /*#__PURE__*/ jsx("th", {
                                                        children: tr("Reason / desired changes")
                                                    })
                                                ]
                                            })
                                        }),
                                        /*#__PURE__*/ jsx("tbody", {
                                            children: planChanges.map((p)=>/*#__PURE__*/ jsxs("tr", {
                                                    children: [
                                                        /*#__PURE__*/ jsx("td", {
                                                            children: /*#__PURE__*/ jsx("span", {
                                                                class: "fttr-badge fttr-badge-info",
                                                                children: p.operation
                                                            })
                                                        }),
                                                        /*#__PURE__*/ jsx("td", {
                                                            children: /*#__PURE__*/ jsx("code", {
                                                                children: p.key
                                                            })
                                                        }),
                                                        /*#__PURE__*/ jsx("td", {
                                                            children: /*#__PURE__*/ jsx("code", {
                                                                children: (p.value ?? []).join(", ")
                                                            })
                                                        })
                                                    ]
                                                }))
                                        })
                                    ]
                                })
                            })
                        ]
                    }) : null,
                    host?.error ? /*#__PURE__*/ jsx("div", {
                        class: "alert-message warning",
                        style: "margin-top:8px",
                        children: host.error
                    }) : null,
                    /*#__PURE__*/ jsx("p", {
                        style: "font-size:85%;color:#888;margin-top:8px;margin-bottom:8px",
                        children: tr("Saving in manual mode does not create interfaces, change firewall rules or configure child devices. Apply explicitly to authorize the current management configuration.")
                    }),
                    /*#__PURE__*/ jsxs("details", {
                        style: "margin-top:6px;margin-bottom:10px",
                        children: [
                            /*#__PURE__*/ jsx("summary", {
                                style: "cursor:pointer;user-select:none;font-size:85%;color:#666",
                                children: tr("Advanced diagnostics / Raw configuration (JSON)")
                            }),
                            /*#__PURE__*/ jsx("pre", {
                                style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px",
                                children: JSON.stringify({
                                    desired: host?.desired,
                                    applied: host?.applied,
                                    plan: host?.plan ?? []
                                }, null, 2)
                            })
                        ]
                    })
                ]
            }));
            const opened = new Set(Array.from(content.querySelectorAll("details[open]")).map((d)=>d.getAttribute("data-device")));
            content.replaceChildren(...(status.devices ?? []).map((d)=>deviceCard(d, opened.has(d.device), reset, ()=>run("management_apply"), managementApply.disabled, busy)));
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