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


;// CONCATENATED MODULE: ./src/view/hl202/dom.tsx

// SPDX-License-Identifier: Apache-2.0
const STATE_I18N = (/* unused pure expression or super */ null && ({
    ready: {
        label: "\u5C31\u7EEA",
        type: "success"
    },
    online: {
        label: "\u5728\u7EBF",
        type: "success"
    },
    success: {
        label: "\u6210\u529F",
        type: "success"
    },
    offline: {
        label: "\u79BB\u7EBF",
        type: "danger"
    },
    error: {
        label: "\u5F02\u5E38",
        type: "danger"
    },
    failed: {
        label: "\u5931\u8D25",
        type: "danger"
    },
    timeout: {
        label: "\u8D85\u65F6",
        type: "warning"
    },
    pending: {
        label: "\u5F85\u5904\u7406",
        type: "warning"
    },
    running: {
        label: "\u6267\u884C\u4E2D",
        type: "info"
    },
    unavailable: {
        label: "\u4E0D\u53EF\u7528",
        type: "neutral"
    },
    disabled: {
        label: "\u5DF2\u7981\u7528",
        type: "neutral"
    },
    enabled: {
        label: "\u5DF2\u542F\u7528",
        type: "success"
    }
}));
const I18N_DICT = {
    "HL202 sub-gateway management": "HL202 \u5B50\u7F51\u5173\u7BA1\u7406",
    "HL202 device": "HL202 \u8BBE\u5907",
    "Refresh devices": "\u5237\u65B0\u8BBE\u5907\u5217\u8868",
    "Select a device to inspect reports and run operations.": "\u9009\u62E9\u4E00\u4E2A\u5B50\u7F51\u5173\u8BBE\u5907\u4EE5\u67E5\u770B\u9065\u6D4B\u62A5\u544A\u548C\u6267\u884C\u8FD0\u7EF4\u6307\u4EE4\u3002",
    "No HL202 optical devices were found.": "\u672A\u53D1\u73B0 HL202 \u5149\u8BBE\u5907\u3002",
    "Loading devices\u2026": "\u6B63\u5728\u52A0\u8F7D\u8BBE\u5907\u5217\u8868\u2026",
    "Invalid device list": "\u8BBE\u5907\u5217\u8868\u683C\u5F0F\u65E0\u6548",
    "Invalid device identity": "\u8BBE\u5907\u6807\u8BC6\u4FE1\u606F\u65E0\u6548",
    "MQTT ready": "MQTT \u5C31\u7EEA",
    "MQTT unavailable": "MQTT \u4E0D\u53EF\u7528",
    "Optical online": "\u5149\u7EA4\u5728\u7EBF",
    "Optical offline": "\u5149\u7EA4\u79BB\u7EBF",
    "Invalid binding generation": "\u7ED1\u5B9A\u4EE3\u6570\u65E0\u6548",
    "MQTT source identity": "MQTT \u6570\u636E\u6E90\u8EAB\u4EFD\u8BCA\u65AD",
    "Read-only MQTT source": "\u53EA\u8BFB MQTT \u6E90",
    "Inspect source report (read-only)": "\u67E5\u770B\u6E90\u62A5\u544A\uFF08\u53EA\u8BFB\uFF09",
    "Invalid source observation": "\u6E90\u89C2\u6D4B\u6570\u636E\u65E0\u6548",
    "Open optical status and ONU/MIB details": "\u6253\u5F00\u5149\u6A21\u5757\u72B6\u6001\u4E0E ONU/MIB \u8BE6\u60C5",
    "This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.": "\u8BE5\u5149\u8BBE\u5907\u6CA1\u6709\u6700\u65B0\u4E14\u786E\u5B9A\u7684 MQTT \u7ED1\u5B9A\uFF0C\u8FD0\u7EF4\u6307\u4EE4\u6682\u4E0D\u53EF\u7528\u3002",
    "MQTT report": "MQTT \u9065\u6D4B\u62A5\u544A",
    "Read MQTT report": "\u8BFB\u53D6 MQTT \u62A5\u544A",
    "No MQTT report has been parsed yet.": "\u5C1A\u672A\u89E3\u6790\u5230\u4EFB\u4F55 MQTT \u62A5\u544A\u6570\u636E\u3002",
    Revision: "\u4FEE\u8BA2\u7248\u672C",
    "Last received": "\u6700\u540E\u63A5\u6536\u65F6\u95F4",
    "Last good report": "\u6700\u540E\u6B63\u5E38\u62A5\u544A\u65F6\u95F4",
    "Latest report error": "\u6700\u65B0\u62A5\u544A\u9519\u8BEF",
    Field: "\u6307\u6807\u5B57\u6BB5",
    Value: "\u6570\u503C",
    "Source member": "\u6765\u6E90\u7EC4\u4EF6",
    "Text omitted at the shared byte limit.": "\u6587\u672C\u8D85\u8FC7\u5171\u4EAB\u5B57\u8282\u4E0A\u9650\u5DF2\u7701\u7565\u3002",
    "Binary member; text is unavailable.": "\u4E8C\u8FDB\u5236\u6570\u636E\uFF0C\u65E0\u6CD5\u663E\u793A\u7EAF\u6587\u672C\u3002",
    "User management": "\u7528\u6237\u7BA1\u7406",
    "Read users": "\u8BFB\u53D6\u7528\u6237\u5217\u8868",
    "Password writes are accepted and saved by the device; this does not prove web login permission. Existing permission masks are preserved.": "\u5BC6\u7801\u5199\u5165\u7531\u8BBE\u5907\u63A5\u53D7\u5E76\u4FDD\u5B58\uFF1B\u8FD9\u5E76\u4E0D\u8BC1\u660E\u5177\u5907 Web \u767B\u5F55\u6743\u9650\uFF0C\u73B0\u6709\u6743\u9650\u63A9\u7801\u4E88\u4EE5\u4FDD\u7559\u3002",
    "Invalid account metadata": "\u7528\u6237\u5143\u6570\u636E\u65E0\u6548",
    "New password": "\u65B0\u5BC6\u7801",
    "Set password": "\u4FEE\u6539\u5BC6\u7801",
    Disable: "\u7981\u7528",
    Enable: "\u542F\u7528",
    Enabled: "\u5DF2\u542F\u7528",
    Disabled: "\u5DF2\u7981\u7528",
    "Refresh users to read the current state.": "\u8BF7\u5237\u65B0\u7528\u6237\u5217\u8868\u4EE5\u8BFB\u53D6\u6700\u65B0\u72B6\u6001\u3002",
    "Raw command console": "\u539F\u751F\u547D\u4EE4\u63A7\u5236\u53F0",
    "Shell executes on the selected ONU. Timeout does not cancel execution. Raw output can contain secrets.": "Shell \u811A\u672C\u76F4\u63A5\u5728\u6240\u9009 ONU \u4E0A\u6267\u884C\u3002\u8D85\u65F6\u4E0D\u4F1A\u53D6\u6D88\u6267\u884C\u3002\u539F\u59CB\u8F93\u51FA\u53EF\u80FD\u5305\u542B\u654F\u611F\u4FE1\u606F\u3002",
    Target: "\u76EE\u6807\u8BBE\u5907",
    "Remote shell command": "\u8FDC\u7A0B Shell \u811A\u672C",
    "Timeout in seconds": "\u8D85\u65F6\u65F6\u95F4\uFF08\u79D2\uFF09",
    "Execute on selected HL202": "\u5728\u6240\u9009 HL202 \u4E0A\u6267\u884C",
    "Timeout must be 1\u2013300 seconds.": "\u8D85\u65F6\u65F6\u95F4\u5FC5\u987B\u5728 1\u2013300 \u79D2\u4E4B\u95F4\u3002",
    "Enter a non-empty UTF-8 script up to 64 KiB without NUL characters.": "\u8BF7\u8F93\u5165 64 KiB \u4EE5\u5185\u3001\u4E0D\u542B NUL \u7A7A\u5B57\u7B26\u7684\u975E\u7A7A UTF-8 \u811A\u672C\u3002",
    "Waiting for device result\u2026": "\u6B63\u5728\u7B49\u5F85\u8BBE\u5907\u8FD4\u56DE\u7ED3\u679C\u2026",
    "Another operation is in progress.": "\u53E6\u4E00\u4E2A\u64CD\u4F5C\u6B63\u5728\u8FDB\u884C\u4E2D\uFF0C\u8BF7\u7A0D\u5019\u3002",
    "Request failed": "\u8BF7\u6C42\u5931\u8D25",
    Unknown: "\u672A\u77E5",
    State: "\u72B6\u6001",
    "Exit code": "\u9000\u51FA\u7801",
    "Request ID": "\u8BF7\u6C42 ID",
    "Device binding changed after submission. This result belongs to the original target.": "\u63D0\u4EA4\u540E\u8BBE\u5907\u7ED1\u5B9A\u5DF2\u53D1\u751F\u53D8\u5316\uFF0C\u6B64\u7ED3\u679C\u5C5E\u4E8E\u539F\u76EE\u6807\u8BBE\u5907\u3002",
    "Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.": "\u6267\u884C\u7ED3\u679C\u672A\u77E5\u3002\u8D85\u65F6\u4E0D\u4F1A\u4E2D\u65AD\u8FDC\u7AEF\u547D\u4EE4\uFF1B\u8BF7\u52FF\u81EA\u52A8\u91CD\u8BD5\u3002",
    "Output was truncated at the byte limit.": "\u8F93\u51FA\u5185\u5BB9\u5DF2\u8FBE\u5230\u5B57\u8282\u4E0A\u9650\u5E76\u88AB\u622A\u65AD\u3002",
    "Copy output": "\u590D\u5236\u8F93\u51FA",
    "Clear output": "\u6E05\u7A7A\u8F93\u51FA",
    "Copied to clipboard": "\u5DF2\u590D\u5236\u5230\u526A\u8D34\u677F",
    "Quick diagnostic commands": "\u5FEB\u6377\u8BCA\u65AD\u547D\u4EE4",
    Execution: "\u6267\u884C\u7ED3\u679C",
    Duration: "\u6267\u884C\u8017\u65F6",
    "Copy member text": "\u590D\u5236\u6587\u672C",
    "Password updated successfully": "\u5BC6\u7801\u4FEE\u6539\u6210\u529F",
    "Inspect read-only MQTT source reports and diagnostics for unbound or unselected devices.": "\u67E5\u770B\u672A\u7ED1\u5B9A\u6216\u672A\u9009\u5B9A\u8BBE\u5907\u7684\u53EA\u8BFB MQTT \u9065\u6D4B\u62A5\u544A\u4E0E\u6570\u636E\u6E90\u8BCA\u65AD\u3002",
    "Raw source observations (JSON)": "\u539F\u59CB\u6E90\u89C2\u6D4B\u6570\u636E (JSON)"
};
function tr(key) {
    const translated = _(key);
    const isZh = /zh/i.test(document.documentElement.getAttribute("lang") || window.L?.env?.lang || navigator.language || "");
    if (isZh && I18N_DICT[key]) return I18N_DICT[key];
    return translated || key;
}
const dom_text = (value)=>value === null || value === undefined || value === "" ? "\u2014" : String(value);
const date = (value)=>value ? new Date(value * 1000).toLocaleString() : "\u2014";
function formatUptime(seconds) {
    if (seconds === undefined || !Number.isFinite(seconds) || seconds < 0) return "\u2014";
    const days = Math.floor(seconds / 86400);
    const hours = Math.floor(seconds % 86400 / 3600);
    const minutes = Math.floor(seconds % 3600 / 60);
    const secs = seconds % 60;
    const parts = [];
    if (days > 0) parts.push(`${days}\u{5929}`);
    if (hours > 0 || days > 0) parts.push(`${hours}\u{5C0F}\u{65F6}`);
    if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}\u{5206}\u{949F}`);
    parts.push(`${secs}\u{79D2}`);
    return `${parts.join(" ")} (${seconds} s)`;
}
function renderBadge(type, label, title) {
    return /*#__PURE__*/ jsx("span", {
        class: `hl202-badge hl202-badge-${type}`,
        title: title,
        children: label
    });
}

;// CONCATENATED MODULE: ./src/view/hl202/rpc.ts
function object(value) {
    if (!isObject(value)) throw new Error(_("Invalid response"));
    return value;
}
function isObject(value) {
    return typeof value === "object" && value !== null && !Array.isArray(value);
}
function check(value) {
    const result = object(value);
    if (result.error) {
        if (typeof result.error === "string") throw new Error(result.error);
        const error = object(result.error);
        throw new Error(typeof error.message === "string" ? error.message : _("Request failed"));
    }
    return result;
}
const list = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_list",
    reject: true
});
const rpc_result = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_job_result",
    params: [
        "job",
        "chunk"
    ],
    reject: true
});
const report = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_report",
    params: [
        "target"
    ],
    reject: true
});
const accounts = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_accounts_start",
    params: [
        "target"
    ],
    reject: true
});
const update = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_account_update",
    params: [
        "target",
        "kind",
        "entry",
        "password",
        "active"
    ],
    reject: true
});
const exec = L.rpc.declare({
    object: "luci.fttr",
    method: "hl202_exec_start",
    params: [
        "target",
        "script",
        "timeout_seconds"
    ],
    reject: true
});
async function wait(start) {
    const initial = check(start);
    if (typeof initial.job !== "string") throw new Error(_("Missing job identifier"));
    const deadline = Date.now() + 330000;
    const path = window.location.pathname;
    const parts = [];
    let totalBytes = 0;
    for(let chunk = 0; chunk < 128;){
        if (window.location.pathname !== path) throw new Error(_("Result polling stopped after leaving the page. The backend job is not cancelled."));
        if (Date.now() > deadline) throw new Error(_("Job polling timed out; execution outcome is unknown. Do not automatically retry."));
        const response = check(await rpc_result(initial.job, chunk));
        if (response.status === "pending") {
            await new Promise((resolve)=>window.setTimeout(resolve, 1000));
            continue;
        }
        if (response.status !== "ready" || typeof response.data !== "string" || typeof response.chunks !== "number") throw new Error(_("Invalid job result"));
        if (response.chunks < 1 || response.chunks > 128 || response.data.length > 43692) throw new Error(_("Job result exceeds the transport limit"));
        const part = Uint8Array.from(atob(response.data), (character)=>character.charCodeAt(0));
        if (part.length > 32768 || totalBytes + part.length > 4194304) throw new Error(_("Job result exceeds the transport limit"));
        parts.push(part);
        totalBytes += part.length;
        chunk++;
        if (chunk === response.chunks) {
            const bytes = new Uint8Array(totalBytes);
            let offset = 0;
            for (const part of parts){
                bytes.set(part, offset);
                offset += part.length;
            }
            return check(JSON.parse(new TextDecoder("utf-8", {
                fatal: true
            }).decode(bytes)));
        }
    }
    throw new Error(_("Too many result chunks"));
}
const readReport = async (target)=>wait(await report(target));
const readAccounts = async (target)=>wait(await accounts(target));
const setAccount = async (target, change)=>wait(await update(target, `account_set_${change.kind}`, change.entry, change.password, change.active));
const execute = async (target, script, timeout)=>wait(await exec(target, script, timeout));

;// CONCATENATED MODULE: ./src/view/hl202/panels.tsx

// SPDX-License-Identifier: Apache-2.0


let busy = false;
const isBusy = ()=>busy;
function createReportPanel() {
    let currentTarget = null;
    const outputSummary = /*#__PURE__*/ jsx("div", {
        style: "margin:8px 0;display:flex;align-items:center;flex-wrap:wrap;gap:10px"
    });
    const outputTable = /*#__PURE__*/ jsx("div", {
        style: "overflow-x:auto;margin:8px 0"
    });
    const outputMembers = /*#__PURE__*/ jsx("div", {
        style: "margin-top:10px"
    });
    const statusMsg = /*#__PURE__*/ jsx("div", {
        style: "font-size:88%;color:#888;margin:6px 0",
        "aria-live": "polite"
    });
    const readBtn = /*#__PURE__*/ jsx("button", {
        type: "button",
        class: "cbi-button cbi-button-action",
        children: tr("Read MQTT report")
    });
    const doRead = async (targetToRead)=>{
        const target = targetToRead || currentTarget;
        if (!target) {
            statusMsg.textContent = tr("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
            return;
        }
        if (busy) {
            statusMsg.textContent = tr("Another operation is in progress.");
            return;
        }
        busy = true;
        readBtn.disabled = true;
        statusMsg.textContent = tr("Waiting for device result\u2026");
        try {
            const response = await readReport(target);
            if (!response.report) {
                outputSummary.replaceChildren();
                outputTable.replaceChildren();
                outputMembers.replaceChildren();
                statusMsg.textContent = tr("No MQTT report has been parsed yet.");
                return;
            }
            const state = object(response.report);
            outputSummary.replaceChildren(/*#__PURE__*/ jsxs("span", {
                children: [
                    /*#__PURE__*/ jsxs("span", {
                        style: "color:#888;margin-right:4px",
                        children: [
                            tr("Revision"),
                            ":"
                        ]
                    }),
                    renderBadge("info", `#${String(state.revision)}`)
                ]
            }), /*#__PURE__*/ jsxs("span", {
                children: [
                    /*#__PURE__*/ jsxs("span", {
                        style: "color:#888;margin-right:4px",
                        children: [
                            tr("Last received"),
                            ":"
                        ]
                    }),
                    /*#__PURE__*/ jsx("strong", {
                        children: date(typeof state.last_received === "number" ? state.last_received : undefined)
                    })
                ]
            }), /*#__PURE__*/ jsxs("span", {
                children: [
                    /*#__PURE__*/ jsxs("span", {
                        style: "color:#888;margin-right:4px",
                        children: [
                            tr("Last good report"),
                            ":"
                        ]
                    }),
                    /*#__PURE__*/ jsx("strong", {
                        children: date(typeof state.last_good === "number" ? state.last_good : undefined)
                    })
                ]
            }));
            if (typeof state.error === "string") {
                outputSummary.append(/*#__PURE__*/ jsxs("div", {
                    class: "alert-message warning",
                    style: "width:100%;margin-top:6px",
                    children: [
                        tr("Latest report error"),
                        ": ",
                        state.error
                    ]
                }));
            }
            if (state.report) {
                const rep = object(state.report);
                const fields = object(rep.fields);
                outputTable.replaceChildren(/*#__PURE__*/ jsxs("table", {
                    class: "table",
                    style: "font-size:90%",
                    children: [
                        /*#__PURE__*/ jsx("thead", {
                            children: /*#__PURE__*/ jsxs("tr", {
                                children: [
                                    /*#__PURE__*/ jsx("th", {
                                        children: tr("Field")
                                    }),
                                    /*#__PURE__*/ jsx("th", {
                                        children: tr("Value")
                                    }),
                                    /*#__PURE__*/ jsx("th", {
                                        children: tr("Source member")
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ jsx("tbody", {
                            children: Object.entries(fields).map((param)=>{
                                let [name, val] = param;
                                const field = object(val);
                                const rawVal = field.value;
                                let displayVal = `${String(rawVal)}${typeof field.unit === "string" ? ` ${field.unit}` : ""}`;
                                if (name === "uptime_seconds" && typeof rawVal === "number") {
                                    displayVal = formatUptime(rawVal);
                                }
                                return /*#__PURE__*/ jsxs("tr", {
                                    children: [
                                        /*#__PURE__*/ jsx("td", {
                                            children: /*#__PURE__*/ jsx("code", {
                                                children: name
                                            })
                                        }),
                                        /*#__PURE__*/ jsx("td", {
                                            children: /*#__PURE__*/ jsx("strong", {
                                                children: displayVal
                                            })
                                        }),
                                        /*#__PURE__*/ jsx("td", {
                                            children: /*#__PURE__*/ jsx("span", {
                                                class: "hl202-badge hl202-badge-neutral",
                                                children: dom_text(field.member)
                                            })
                                        })
                                    ]
                                });
                            })
                        })
                    ]
                }));
                const membersList = [];
                if (Array.isArray(rep.members)) {
                    for (const val of rep.members){
                        const member = object(val);
                        const copyBtn = /*#__PURE__*/ jsx("button", {
                            type: "button",
                            class: "fttr-btn-subtle",
                            style: "margin-left:8px",
                            onclick: (e)=>{
                                e.stopPropagation();
                                if (typeof member.text === "string") {
                                    void navigator.clipboard?.writeText(member.text);
                                    copyBtn.textContent = tr("Copied to clipboard");
                                    setTimeout(()=>{
                                        copyBtn.textContent = tr("Copy member text");
                                    }, 1500);
                                }
                            },
                            children: tr("Copy member text")
                        });
                        membersList.push(/*#__PURE__*/ jsxs("details", {
                            style: "margin:6px 0;border:1px solid rgba(127,140,141,0.15);border-radius:4px;padding:4px 8px",
                            children: [
                                /*#__PURE__*/ jsxs("summary", {
                                    style: "cursor:pointer;user-select:none;font-weight:600;font-size:90%",
                                    children: [
                                        dom_text(`${String(member.name)} (${String(member.bytes)} bytes, ${String(member.encoding)})`),
                                        typeof member.text === "string" ? copyBtn : null
                                    ]
                                }),
                                /*#__PURE__*/ jsx("div", {
                                    style: "margin-top:6px",
                                    children: typeof member.text === "string" ? /*#__PURE__*/ jsx("pre", {
                                        class: "hl202-terminal-output",
                                        style: "max-height:16rem",
                                        children: member.text
                                    }) : /*#__PURE__*/ jsx("p", {
                                        style: "font-size:85%;color:#888;margin:4px 0",
                                        children: member.text_omitted ? tr("Text omitted at the shared byte limit.") : tr("Binary member; text is unavailable.")
                                    })
                                })
                            ]
                        }));
                    }
                }
                outputMembers.replaceChildren(...membersList);
            }
            statusMsg.textContent = "";
        } catch (cause) {
            statusMsg.textContent = cause instanceof Error ? cause.message : tr("Request failed");
        } finally{
            busy = false;
            readBtn.disabled = !currentTarget;
        }
    };
    readBtn.addEventListener("click", ()=>{
        void doRead();
    });
    const element = /*#__PURE__*/ jsxs("div", {
        class: "cbi-section hl202-panel-report",
        children: [
            /*#__PURE__*/ jsxs("div", {
                style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                children: [
                    /*#__PURE__*/ jsx("h3", {
                        style: "margin:0",
                        children: tr("MQTT report")
                    }),
                    readBtn
                ]
            }),
            statusMsg,
            outputSummary,
            outputTable,
            outputMembers
        ]
    });
    return {
        element,
        setTarget (target) {
            currentTarget = target;
            readBtn.disabled = !target;
        },
        refresh (explicitTarget) {
            return doRead(explicitTarget);
        }
    };
}
function createAccountsPanel() {
    let currentTarget = null;
    const statusMsg = /*#__PURE__*/ jsx("div", {
        style: "font-size:88%;color:#888;margin:6px 0",
        "aria-live": "polite"
    });
    const usersContainer = /*#__PURE__*/ jsx("div", {
        style: "margin-top:10px;display:flex;flex-direction:column;gap:10px"
    });
    const readBtn = /*#__PURE__*/ jsx("button", {
        type: "button",
        class: "cbi-button cbi-button-action",
        children: tr("Read users")
    });
    readBtn.disabled = !L.hasViewPermission();
    const doRead = async ()=>{
        if (!currentTarget) {
            statusMsg.textContent = tr("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.");
            return;
        }
        if (busy) {
            statusMsg.textContent = tr("Another operation is in progress.");
            return;
        }
        busy = true;
        readBtn.disabled = true;
        statusMsg.textContent = tr("Waiting for device result\u2026");
        try {
            const response = check(await readAccounts(currentTarget));
            const op = object(response.operation);
            const res = object(op.result);
            if (res.status === "timeout") {
                statusMsg.textContent = tr("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.");
            } else {
                statusMsg.textContent = "";
            }
            if (Array.isArray(response.accounts)) {
                const userNodes = [];
                for (const item of response.accounts){
                    const account = object(item);
                    if (typeof account.entry !== "number" || typeof account.username !== "string" || typeof account.active !== "boolean") {
                        throw new Error(tr("Invalid account metadata"));
                    }
                    const entry = account.entry;
                    let active = account.active;
                    const activeBadge = /*#__PURE__*/ jsx("span", {
                        class: `hl202-badge ${active ? "hl202-badge-success" : "hl202-badge-neutral"}`,
                        style: "font-size:80%",
                        children: active ? tr("Enabled") : tr("Disabled")
                    });
                    const pwdInput = /*#__PURE__*/ jsx("input", {
                        type: "password",
                        class: "cbi-input-text",
                        placeholder: tr("New password"),
                        autocomplete: "new-password",
                        style: "width:180px"
                    });
                    const saveBtn = /*#__PURE__*/ jsx("button", {
                        type: "button",
                        class: "cbi-button cbi-button-action",
                        children: tr("Set password")
                    });
                    const toggleBtn = /*#__PURE__*/ jsx("button", {
                        type: "button",
                        class: `cbi-button ${active ? "cbi-button-neutral" : "cbi-button-apply"}`,
                        children: active ? tr("Disable") : tr("Enable")
                    });
                    saveBtn.disabled = toggleBtn.disabled = !L.hasViewPermission();
                    const userActionStatus = /*#__PURE__*/ jsx("div", {
                        style: "font-size:82%;margin-top:4px",
                        "aria-live": "polite"
                    });
                    saveBtn.addEventListener("click", async ()=>{
                        if (!currentTarget || busy) return;
                        const val = pwdInput.value;
                        if (!val) {
                            userActionStatus.textContent = tr("Enter a non-empty UTF-8 script up to 64 KiB without NUL characters.");
                            return;
                        }
                        pwdInput.value = "";
                        busy = true;
                        saveBtn.disabled = toggleBtn.disabled = true;
                        userActionStatus.textContent = tr("Waiting for device result\u2026");
                        try {
                            const result = await setAccount(currentTarget, {
                                entry,
                                kind: "password",
                                password: val,
                                active
                            });
                            const setOp = object(result.operation);
                            const setRes = object(setOp.result);
                            if (setRes.status === "success" || result.write_status === "committed") {
                                userActionStatus.innerHTML = `<span style="color:#27ae60">${tr("Password updated successfully")}</span>`;
                            } else {
                                userActionStatus.textContent = String(result.write_status || setRes.status || tr("Request failed"));
                            }
                        } catch (e) {
                            userActionStatus.textContent = e instanceof Error ? e.message : tr("Request failed");
                        } finally{
                            busy = false;
                            saveBtn.disabled = toggleBtn.disabled = !L.hasViewPermission();
                        }
                    });
                    toggleBtn.addEventListener("click", async ()=>{
                        if (!currentTarget || busy) return;
                        busy = true;
                        saveBtn.disabled = toggleBtn.disabled = true;
                        userActionStatus.textContent = tr("Waiting for device result\u2026");
                        try {
                            const nextActive = !active;
                            const result = await setAccount(currentTarget, {
                                entry,
                                kind: "active",
                                password: "",
                                active: nextActive
                            });
                            active = nextActive;
                            activeBadge.className = `hl202-badge ${active ? "hl202-badge-success" : "hl202-badge-neutral"}`;
                            activeBadge.textContent = active ? tr("Enabled") : tr("Disabled");
                            toggleBtn.className = `cbi-button ${active ? "cbi-button-neutral" : "cbi-button-apply"}`;
                            toggleBtn.textContent = active ? tr("Disable") : tr("Enable");
                            userActionStatus.textContent = `${String(result.write_status)}; ${tr("Refresh users to read the current state.")}`;
                        } catch (e) {
                            userActionStatus.textContent = e instanceof Error ? e.message : tr("Request failed");
                        } finally{
                            busy = false;
                            saveBtn.disabled = toggleBtn.disabled = !L.hasViewPermission();
                        }
                    });
                    userNodes.push(/*#__PURE__*/ jsxs("div", {
                        class: "cbi-section",
                        style: "margin:0;padding:10px 14px;border:1px solid rgba(127,140,141,0.2);border-radius:5px",
                        children: [
                            /*#__PURE__*/ jsxs("div", {
                                style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                                children: [
                                    /*#__PURE__*/ jsxs("div", {
                                        style: "display:flex;align-items:center;gap:8px",
                                        children: [
                                            /*#__PURE__*/ jsx("strong", {
                                                style: "font-size:105%",
                                                children: account.username
                                            }),
                                            /*#__PURE__*/ jsxs("span", {
                                                style: "font-size:80%;color:#888",
                                                children: [
                                                    "(Entry ",
                                                    entry,
                                                    ")"
                                                ]
                                            }),
                                            activeBadge
                                        ]
                                    }),
                                    /*#__PURE__*/ jsxs("div", {
                                        style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px",
                                        children: [
                                            pwdInput,
                                            saveBtn,
                                            toggleBtn
                                        ]
                                    })
                                ]
                            }),
                            userActionStatus
                        ]
                    }));
                }
                usersContainer.replaceChildren(...userNodes);
            }
        } catch (cause) {
            statusMsg.textContent = cause instanceof Error ? cause.message : tr("Request failed");
        } finally{
            busy = false;
            readBtn.disabled = !currentTarget || !L.hasViewPermission();
        }
    };
    readBtn.addEventListener("click", ()=>{
        void doRead();
    });
    const element = /*#__PURE__*/ jsxs("div", {
        class: "cbi-section hl202-panel-accounts",
        children: [
            /*#__PURE__*/ jsxs("div", {
                style: "display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:6px",
                children: [
                    /*#__PURE__*/ jsx("h3", {
                        style: "margin:0",
                        children: tr("User management")
                    }),
                    readBtn
                ]
            }),
            /*#__PURE__*/ jsx("p", {
                style: "font-size:85%;color:#888;margin:4px 0",
                children: tr("Password writes are accepted and saved by the device; this does not prove web login permission. Existing permission masks are preserved.")
            }),
            statusMsg,
            usersContainer
        ]
    });
    return {
        element,
        setTarget (target) {
            currentTarget = target;
            readBtn.disabled = !target || !L.hasViewPermission();
        },
        refresh () {
            return doRead();
        }
    };
}
function createConsolePanel() {
    let currentTarget = null;
    const targetLine = /*#__PURE__*/ jsx("div", {
        style: "font-size:88%;color:#666;margin:4px 0"
    });
    const script = /*#__PURE__*/ jsx("textarea", {
        id: "hl202-script",
        rows: 8,
        class: "hl202-terminal-textarea",
        spellcheck: false,
        "aria-label": tr("Remote shell command"),
        placeholder: "# \u8F93\u5165\u5728\u6240\u9009\u5B50\u7F51\u5173\u4E0A\u6267\u884C\u7684 Shell \u547D\u4EE4 (\u652F\u6301 Ctrl + Enter \u5FEB\u6377\u6267\u884C)..."
    });
    const timeout = /*#__PURE__*/ jsx("input", {
        type: "number",
        id: "hl202-timeout",
        min: "1",
        max: "300",
        value: "20",
        class: "cbi-input-text",
        style: "width:70px;text-align:center",
        "aria-label": tr("Timeout in seconds")
    });
    const execBtn = /*#__PURE__*/ jsx("button", {
        type: "button",
        class: "cbi-button cbi-button-apply",
        style: "font-weight:600",
        children: tr("Execute on selected HL202")
    });
    execBtn.disabled = !L.hasViewPermission();
    const outputStatus = /*#__PURE__*/ jsx("div", {
        style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px"
    });
    const outputBody = /*#__PURE__*/ jsx("pre", {
        class: "hl202-terminal-output",
        style: "min-height:4rem;display:none",
        children: "# \u7B49\u5F85\u6267\u884C\u6307\u4EE4..."
    });
    const copyBtn = /*#__PURE__*/ jsx("button", {
        type: "button",
        class: "fttr-btn-subtle",
        onclick: ()=>{
            if (outputBody.textContent) {
                void navigator.clipboard?.writeText(outputBody.textContent);
                copyBtn.textContent = tr("Copied to clipboard");
                setTimeout(()=>{
                    copyBtn.textContent = tr("Copy output");
                }, 1500);
            }
        },
        children: tr("Copy output")
    });
    const clearBtn = /*#__PURE__*/ jsx("button", {
        type: "button",
        class: "fttr-btn-subtle",
        onclick: ()=>{
            outputBody.textContent = "";
            outputBody.style.display = "none";
            outputStatus.replaceChildren();
        },
        children: tr("Clear output")
    });
    const doExecute = async ()=>{
        if (!currentTarget) {
            outputStatus.replaceChildren(/*#__PURE__*/ jsx("div", {
                class: "alert-message warning",
                children: tr("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
            }));
            return;
        }
        if (busy) {
            outputStatus.replaceChildren(/*#__PURE__*/ jsx("div", {
                class: "alert-message warning",
                children: tr("Another operation is in progress.")
            }));
            return;
        }
        const seconds = Number(timeout.value);
        if (!Number.isInteger(seconds) || seconds < 1 || seconds > 300) {
            outputStatus.replaceChildren(/*#__PURE__*/ jsx("div", {
                class: "alert-message warning",
                children: tr("Timeout must be 1\u2013300 seconds.")
            }));
            return;
        }
        const cmd = script.value.trim();
        if (!cmd || cmd.includes("\0") || new TextEncoder().encode(cmd).length > 65536) {
            outputStatus.replaceChildren(/*#__PURE__*/ jsx("div", {
                class: "alert-message warning",
                children: tr("Enter a non-empty UTF-8 script up to 64 KiB without NUL characters.")
            }));
            return;
        }
        busy = true;
        execBtn.disabled = true;
        outputBody.style.display = "block";
        outputBody.textContent = `# [${new Date().toLocaleTimeString()}] \u{6B63}\u{5728}\u{4E0B}\u{53D1}\u{81F3} ${currentTarget.optical_sn} (\u{8D85}\u{65F6}: ${seconds}s)...\n`;
        outputStatus.replaceChildren(renderBadge("info", tr("Waiting for device result\u2026")));
        const startTime = Date.now();
        try {
            const res = await execute(currentTarget, script.value, seconds);
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
            const op = object(res.operation);
            const result = object(op.result);
            const status = typeof result.status === "string" ? result.status : tr("Unknown");
            const exitCode = result.exit_code;
            const isSuccess = status === "success" && exitCode === 0;
            const statusBadge = renderBadge(isSuccess ? "success" : status === "timeout" ? "warning" : "danger", isSuccess ? tr("Success") : status === "timeout" ? tr("Timeout") : `${tr("Exit code")} ${String(exitCode ?? status)}`);
            outputStatus.replaceChildren(statusBadge, /*#__PURE__*/ jsxs("span", {
                children: [
                    /*#__PURE__*/ jsxs("span", {
                        style: "color:#888",
                        children: [
                            tr("Exit code"),
                            ":"
                        ]
                    }),
                    " ",
                    /*#__PURE__*/ jsx("code", {
                        children: String(exitCode ?? "\u2014")
                    })
                ]
            }), /*#__PURE__*/ jsxs("span", {
                children: [
                    /*#__PURE__*/ jsxs("span", {
                        style: "color:#888",
                        children: [
                            tr("Duration"),
                            ":"
                        ]
                    }),
                    " ",
                    /*#__PURE__*/ jsxs("strong", {
                        children: [
                            elapsed,
                            " s"
                        ]
                    })
                ]
            }), /*#__PURE__*/ jsxs("span", {
                children: [
                    /*#__PURE__*/ jsxs("span", {
                        style: "color:#888",
                        children: [
                            tr("Request ID"),
                            ":"
                        ]
                    }),
                    " ",
                    /*#__PURE__*/ jsx("code", {
                        children: String(result.request_id ?? "\u2014")
                    })
                ]
            }), /*#__PURE__*/ jsxs("div", {
                style: "margin-left:auto;display:flex;gap:6px",
                children: [
                    copyBtn,
                    clearBtn
                ]
            }));
            const outputLines = [];
            if (typeof result.output === "string" && result.output.length) {
                outputLines.push(result.output);
            }
            if (typeof result.error === "string" && result.error.length) {
                outputLines.push(`[STDERR]\n${result.error}`);
            }
            if (result.output_truncated === true) {
                outputLines.push(`\n[!] ${tr("Output was truncated at the byte limit.")}`);
            }
            if (outputLines.length === 0) {
                outputLines.push("(\u547D\u4EE4\u5DF2\u6267\u884C\u5B8C\u6BD5\uFF0C\u65E0\u6807\u51C6\u8F93\u51FA\u8FD4\u56DE)");
            }
            outputBody.textContent = outputLines.join("\n");
        } catch (cause) {
            const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
            outputStatus.replaceChildren(renderBadge("danger", tr("Failed")), /*#__PURE__*/ jsxs("span", {
                children: [
                    /*#__PURE__*/ jsxs("span", {
                        style: "color:#888",
                        children: [
                            tr("Duration"),
                            ":"
                        ]
                    }),
                    " ",
                    elapsed,
                    " s"
                ]
            }), /*#__PURE__*/ jsxs("div", {
                style: "margin-left:auto;display:flex;gap:6px",
                children: [
                    copyBtn,
                    clearBtn
                ]
            }));
            outputBody.textContent = `[ERROR] ${cause instanceof Error ? cause.message : tr("Request failed")}`;
        } finally{
            busy = false;
            execBtn.disabled = !currentTarget || !L.hasViewPermission();
        }
    };
    execBtn.addEventListener("click", ()=>{
        void doExecute();
    });
    script.addEventListener("keydown", (e)=>{
        if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
            e.preventDefault();
            void doExecute();
        }
    });
    // Quick snippets
    const snippets = [
        {
            label: "uptime (\u8D1F\u8F7D)",
            cmd: "uptime"
        },
        {
            label: "meminfo (\u5185\u5B58)",
            cmd: "cat /proc/meminfo | head -n 10"
        },
        {
            label: "cpuinfo (CPU)",
            cmd: "cat /proc/cpuinfo | grep 'model name\\|processor'"
        },
        {
            label: "ifconfig (\u7F51\u7EDC)",
            cmd: "ifconfig"
        },
        {
            label: "ps (\u8FDB\u7A0B)",
            cmd: "ps"
        },
        {
            label: "dmesg (\u5185\u6838\u65E5\u5FD7)",
            cmd: "dmesg | tail -n 25"
        }
    ];
    const snippetsBar = /*#__PURE__*/ jsxs("div", {
        class: "hl202-snippets",
        children: [
            /*#__PURE__*/ jsxs("span", {
                style: "font-size:80%;color:#888;margin-right:2px",
                children: [
                    tr("Quick diagnostic commands"),
                    ":"
                ]
            }),
            snippets.map((snip)=>/*#__PURE__*/ jsx("button", {
                    type: "button",
                    class: "hl202-snippet-tag",
                    onclick: ()=>{
                        script.value = snip.cmd;
                        script.focus();
                    },
                    children: snip.label
                }))
        ]
    });
    const element = /*#__PURE__*/ jsxs("div", {
        class: "cbi-section hl202-panel-console",
        children: [
            /*#__PURE__*/ jsx("h3", {
                style: "margin-bottom:4px",
                children: tr("Raw command console")
            }),
            /*#__PURE__*/ jsx("p", {
                style: "font-size:85%;color:#888;margin-top:0;margin-bottom:6px",
                children: tr("Shell executes on the selected ONU. Timeout does not cancel execution. Raw output can contain secrets.")
            }),
            targetLine,
            snippetsBar,
            /*#__PURE__*/ jsx("div", {
                class: "hl202-terminal",
                style: "margin-bottom:8px",
                children: script
            }),
            /*#__PURE__*/ jsxs("div", {
                style: "display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:8px",
                children: [
                    /*#__PURE__*/ jsxs("label", {
                        htmlFor: "hl202-timeout",
                        style: "display:flex;align-items:center;gap:6px;font-size:90%",
                        children: [
                            /*#__PURE__*/ jsxs("span", {
                                children: [
                                    tr("Timeout in seconds"),
                                    ":"
                                ]
                            }),
                            timeout
                        ]
                    }),
                    /*#__PURE__*/ jsx("span", {
                        style: "font-size:82%;color:#888",
                        children: "(\u5FEB\u6377\u952E: Ctrl + Enter)"
                    }),
                    /*#__PURE__*/ jsx("div", {
                        style: "margin-left:auto",
                        children: execBtn
                    })
                ]
            }),
            /*#__PURE__*/ jsxs("div", {
                style: "margin-top:10px",
                children: [
                    outputStatus,
                    outputBody
                ]
            })
        ]
    });
    return {
        element,
        setTarget (target) {
            currentTarget = target;
            execBtn.disabled = !target || !L.hasViewPermission();
            if (target) {
                targetLine.replaceChildren(/*#__PURE__*/ jsxs("span", {
                    children: [
                        /*#__PURE__*/ jsxs("span", {
                            style: "color:#888",
                            children: [
                                tr("Target"),
                                ":"
                            ]
                        }),
                        " ",
                        /*#__PURE__*/ jsx("strong", {
                            children: target.optical_sn
                        }),
                        " (ONU",
                        " ",
                        target.onu_id,
                        ") \xb7 ",
                        /*#__PURE__*/ jsxs("code", {
                            children: [
                                "gen: ",
                                target.binding_generation
                            ]
                        })
                    ]
                }));
            } else {
                targetLine.replaceChildren(/*#__PURE__*/ jsx("span", {
                    style: "color:#e74c3c",
                    children: tr("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
                }));
            }
        }
    };
}
// Keep legacy wrappers for compatibility
function reportPanel(target) {
    const ctrl = createReportPanel();
    ctrl.setTarget(target);
    return ctrl.element;
}
function accountsPanel(target) {
    const ctrl = createAccountsPanel();
    ctrl.setTarget(target);
    return ctrl.element;
}
function consolePanel(target) {
    const ctrl = createConsolePanel();
    ctrl.setTarget(target);
    return ctrl.element;
}

;// CONCATENATED MODULE: ./src/view/hl202.tsx

// SPDX-License-Identifier: Apache-2.0



function renderPage() {
    const select = /*#__PURE__*/ jsx("select", {
        id: "hl202-device",
        class: "cbi-input-select",
        "aria-label": tr("HL202 device"),
        style: "min-width:320px"
    });
    const refresh = /*#__PURE__*/ jsx("button", {
        type: "button",
        class: "cbi-button cbi-button-action",
        children: tr("Refresh devices")
    });
    const status = /*#__PURE__*/ jsx("div", {
        style: "font-size:88%;color:#888;margin:6px 0",
        "aria-live": "polite"
    });
    // Top Device Status Card elements
    const summaryNameNode = /*#__PURE__*/ jsx("strong", {
        children: "\u2014"
    });
    const summaryModelNode = /*#__PURE__*/ jsx("span", {
        class: "hl202-badge hl202-badge-neutral",
        style: "font-size:80%",
        children: "\u2014"
    });
    const summaryOpticalNode = /*#__PURE__*/ jsx("span", {
        class: "hl202-badge hl202-badge-neutral",
        children: "\u2014"
    });
    const summaryMqttNode = /*#__PURE__*/ jsx("span", {
        class: "hl202-badge hl202-badge-neutral",
        children: "\u2014"
    });
    const summaryGenNode = /*#__PURE__*/ jsx("span", {
        class: "hl202-badge hl202-badge-info",
        style: "font-size:80%",
        children: "\u2014"
    });
    const deviceWarning = /*#__PURE__*/ jsx("div", {
        class: "alert-message warning",
        style: "margin-top:8px",
        hidden: true,
        children: tr("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
    });
    const deviceOverviewCard = /*#__PURE__*/ jsxs("div", {
        class: "cbi-section hl202-device-card",
        style: "margin-bottom:0",
        children: [
            /*#__PURE__*/ jsxs("div", {
                class: "hl202-card-header",
                children: [
                    /*#__PURE__*/ jsxs("div", {
                        class: "hl202-device-title",
                        children: [
                            summaryNameNode,
                            summaryModelNode
                        ]
                    }),
                    /*#__PURE__*/ jsxs("div", {
                        class: "hl202-device-badges",
                        children: [
                            summaryOpticalNode,
                            summaryMqttNode,
                            summaryGenNode
                        ]
                    }),
                    /*#__PURE__*/ jsx("div", {
                        class: "hl202-device-links",
                        children: /*#__PURE__*/ jsxs("a", {
                            href: L.url("admin", "network", "fttr", "hardware"),
                            class: "fttr-btn-subtle",
                            children: [
                                tr("Open optical status and ONU/MIB details"),
                                " \u2192"
                            ]
                        })
                    })
                ]
            }),
            deviceWarning
        ]
    });
    // Persistent Panels
    const reportCtrl = createReportPanel();
    const accountsCtrl = createAccountsPanel();
    const consoleCtrl = createConsolePanel();
    // Diagnostic Panel: Sources
    const sourceSelect = /*#__PURE__*/ jsx("select", {
        id: "hl202-source",
        class: "cbi-input-select",
        "aria-label": tr("Read-only MQTT source"),
        style: "min-width:240px"
    });
    const sourceRead = /*#__PURE__*/ jsx("button", {
        type: "button",
        class: "cbi-button cbi-button-action",
        style: "margin-left:8px",
        children: tr("Inspect source report (read-only)")
    });
    const sourceDetails = /*#__PURE__*/ jsx("div", {
        style: "margin-top:10px"
    });
    let sourceTargets = [];
    const sourcesPre = /*#__PURE__*/ jsx("pre", {
        style: "white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto"
    });
    const sourcesPanel = /*#__PURE__*/ jsxs("div", {
        class: "cbi-section hl202-panel-sources",
        children: [
            /*#__PURE__*/ jsx("h3", {
                style: "margin-bottom:4px",
                children: tr("MQTT source identity")
            }),
            /*#__PURE__*/ jsx("p", {
                style: "font-size:85%;color:#888;margin-top:0;margin-bottom:8px",
                children: tr("Inspect read-only MQTT source reports and diagnostics for unbound or unselected devices.")
            }),
            /*#__PURE__*/ jsxs("div", {
                style: "display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px",
                children: [
                    /*#__PURE__*/ jsxs("label", {
                        htmlFor: "hl202-source",
                        children: [
                            tr("Read-only MQTT source"),
                            ": ",
                            sourceSelect
                        ]
                    }),
                    sourceRead
                ]
            }),
            sourceDetails,
            /*#__PURE__*/ jsxs("details", {
                style: "margin-top:10px",
                children: [
                    /*#__PURE__*/ jsx("summary", {
                        style: "cursor:pointer;font-size:85%;color:#888;font-weight:600",
                        children: tr("Raw source observations (JSON)")
                    }),
                    /*#__PURE__*/ jsx("div", {
                        style: "margin-top:6px",
                        children: sourcesPre
                    })
                ]
            })
        ]
    });
    let activeTab = "report";
    const tabs = [
        {
            id: "report",
            label: tr("MQTT report")
        },
        {
            id: "accounts",
            label: tr("User management")
        },
        {
            id: "console",
            label: tr("Raw command console")
        },
        {
            id: "sources",
            label: tr("MQTT source identity")
        }
    ];
    const tabItems = new Map();
    const switchTab = (id)=>{
        activeTab = id;
        for (const [tId, li] of tabItems){
            li.className = tId === id ? "cbi-tab" : "cbi-tab-disabled";
        }
        reportCtrl.element.hidden = id !== "report";
        accountsCtrl.element.hidden = id !== "accounts";
        consoleCtrl.element.hidden = id !== "console";
        sourcesPanel.hidden = id !== "sources";
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
    // Initially show first tab
    reportCtrl.element.hidden = false;
    accountsCtrl.element.hidden = true;
    consoleCtrl.element.hidden = true;
    sourcesPanel.hidden = true;
    const panelsContainer = /*#__PURE__*/ jsxs("div", {
        id: "hl202-panels-container",
        children: [
            reportCtrl.element,
            accountsCtrl.element,
            consoleCtrl.element,
            sourcesPanel
        ]
    });
    let currentDevices = [];
    let previousDeviceFingerprint = "";
    let reportRevision;
    const show = ()=>{
        const selectedSn = select.value;
        const device = currentDevices.find((d)=>d.optical_sn === selectedSn);
        if (!device) {
            summaryNameNode.textContent = tr("No HL202 optical devices were found.");
            summaryModelNode.textContent = "\u2014";
            summaryOpticalNode.textContent = "\u2014";
            summaryMqttNode.textContent = "\u2014";
            summaryGenNode.textContent = "\u2014";
            deviceWarning.hidden = true;
            reportCtrl.setTarget(null);
            accountsCtrl.setTarget(null);
            consoleCtrl.setTarget(null);
            return;
        }
        summaryNameNode.textContent = `${device.optical_sn} (ONU ${device.onu_id})`;
        summaryModelNode.textContent = device.model || "HL202";
        if (device.optical_online) {
            summaryOpticalNode.className = "hl202-badge hl202-badge-success";
            summaryOpticalNode.textContent = tr("Optical online");
        } else {
            summaryOpticalNode.className = "hl202-badge hl202-badge-danger";
            summaryOpticalNode.textContent = tr("Optical offline");
        }
        if (device.can_execute && device.mqtt) {
            summaryMqttNode.className = "hl202-badge hl202-badge-success";
            summaryMqttNode.textContent = tr("MQTT ready");
            summaryGenNode.textContent = `gen: ${device.mqtt.binding_generation}`;
            summaryGenNode.hidden = false;
            deviceWarning.hidden = true;
            const target = {
                optical_sn: device.optical_sn,
                onu_id: device.onu_id,
                binding_generation: device.mqtt.binding_generation
            };
            reportCtrl.setTarget(target);
            accountsCtrl.setTarget(target);
            consoleCtrl.setTarget(target);
        } else {
            summaryMqttNode.className = "hl202-badge hl202-badge-warning";
            summaryMqttNode.textContent = tr("MQTT unavailable");
            summaryGenNode.hidden = true;
            deviceWarning.hidden = false;
            reportCtrl.setTarget(null);
            accountsCtrl.setTarget(null);
            consoleCtrl.setTarget(null);
        }
    };
    const reload = async ()=>{
        refresh.disabled = true;
        status.textContent = tr("Loading devices\u2026");
        try {
            const response = check(await list());
            if (!Array.isArray(response.devices)) throw new Error(tr("Invalid device list"));
            const parsedDevices = [];
            for (const val of response.devices){
                const d = object(val);
                if (typeof d.optical_sn !== "string" || typeof d.onu_id !== "number") {
                    throw new Error(tr("Invalid device identity"));
                }
                const ready = d.can_execute === true && d.mqtt !== null;
                let mqttObj = null;
                if (ready) {
                    const m = object(d.mqtt);
                    if (typeof m.binding_generation !== "string") throw new Error(tr("Invalid binding generation"));
                    mqttObj = {
                        binding_generation: m.binding_generation
                    };
                }
                parsedDevices.push({
                    optical_sn: d.optical_sn,
                    onu_id: d.onu_id,
                    model: String(d.model || "HL202"),
                    optical_online: Boolean(d.optical_online),
                    can_execute: Boolean(d.can_execute),
                    mqtt: mqttObj,
                    report_revision: typeof d.report_revision === "number" ? d.report_revision : undefined
                });
            }
            currentDevices = parsedDevices;
            // Compare fingerprint before rebuilding select options to avoid destroying open menu
            const fingerprint = parsedDevices.map((d)=>`${d.optical_sn}:${d.onu_id}:${d.optical_online}:${d.can_execute}:${d.report_revision}`).join("|");
            if (fingerprint !== previousDeviceFingerprint) {
                previousDeviceFingerprint = fingerprint;
                const previousVal = select.value;
                select.replaceChildren(...parsedDevices.map((d)=>/*#__PURE__*/ jsx("option", {
                        value: d.optical_sn,
                        children: dom_text(`${d.model} / ${d.optical_sn} / ONU ${d.onu_id} \u{2014} ${d.can_execute ? tr("MQTT ready") : tr("MQTT unavailable")}; ${d.optical_online ? tr("Optical online") : tr("Optical offline")}`)
                    })));
                if (parsedDevices.some((d)=>d.optical_sn === previousVal)) {
                    select.value = previousVal;
                }
            }
            status.textContent = parsedDevices.length ? tr("Select a device to inspect reports and run operations.") : tr("No HL202 optical devices were found.");
            // Update diagnostics sources
            sourcesPre.textContent = JSON.stringify(response.sources, null, 2);
            const previousSource = sourceSelect.value;
            const observations = [];
            sourceSelect.replaceChildren();
            if (Array.isArray(response.sources)) {
                for (const value of response.sources){
                    const src = object(value);
                    if (typeof src.mqtt_mac !== "string" || typeof src.binding_generation !== "string") {
                        throw new Error(tr("Invalid source observation"));
                    }
                    observations.push({
                        mqtt_mac: src.mqtt_mac,
                        binding_generation: src.binding_generation
                    });
                    sourceSelect.append(/*#__PURE__*/ jsx("option", {
                        value: src.mqtt_mac,
                        children: dom_text(`${src.mqtt_mac} \u{2014} ${String(src.reason)}`)
                    }));
                }
            }
            sourceTargets = observations;
            if (observations.some((s)=>s.mqtt_mac === previousSource)) {
                sourceSelect.value = previousSource;
            }
            sourceRead.disabled = observations.length === 0;
            show();
            // Auto refresh report if revision changed
            const selectedDev = parsedDevices.find((d)=>d.optical_sn === select.value);
            if (selectedDev && selectedDev.report_revision !== undefined && selectedDev.report_revision !== reportRevision && !isBusy()) {
                reportRevision = selectedDev.report_revision;
                void reportCtrl.refresh();
            }
        } catch (cause) {
            currentDevices = [];
            show();
            status.textContent = cause instanceof Error ? cause.message : tr("Request failed");
        } finally{
            refresh.disabled = false;
        }
    };
    select.addEventListener("change", show);
    sourceRead.addEventListener("click", ()=>{
        const target = sourceTargets.find((s)=>s.mqtt_mac === sourceSelect.value);
        sourceDetails.replaceChildren();
        if (target) {
            const panel = createReportPanel();
            panel.setTarget(target);
            sourceDetails.append(panel.element);
            void panel.refresh(target);
        }
    });
    refresh.addEventListener("click", ()=>{
        void reload();
    });
    void reload();
    const root = /*#__PURE__*/ jsxs("div", {
        class: "cbi-map hl202-management",
        children: [
            /*#__PURE__*/ jsx("style", {
                children: `
				.hl202-management {
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
					.hl202-management {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .hl202-management,
				[data-theme="dark"] .hl202-management {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-danger-color: #e74c3c;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				.hl202-management .hl202-badge {
					display: inline-block;
					padding: 0.18em 0.55em;
					font-size: 85%;
					font-weight: 600;
					line-height: 1.25;
					border-radius: 3px;
					white-space: nowrap;
					text-align: center;
				}

				.hl202-management .hl202-badge-success {
					background: var(--fttr-success-bg);
					color: var(--fttr-success-color);
					border: 1px solid var(--fttr-success-border);
				}

				.hl202-management .hl202-badge-warning {
					background: var(--fttr-warning-bg);
					color: var(--fttr-warning-color);
					border: 1px solid var(--fttr-warning-border);
				}

				.hl202-management .hl202-badge-danger {
					background: var(--fttr-danger-bg);
					color: var(--fttr-danger-color);
					border: 1px solid var(--fttr-danger-border);
				}

				.hl202-management .hl202-badge-info {
					background: var(--fttr-info-bg);
					color: var(--fttr-info-color);
					border: 1px solid var(--fttr-info-border);
				}

				.hl202-management .hl202-badge-neutral {
					background: var(--fttr-neutral-bg);
					color: var(--fttr-neutral-color);
					border: 1px solid var(--fttr-neutral-border);
				}

				.hl202-management .hl202-device-card {
					padding: 12px 16px;
					border: 1px solid rgba(127, 140, 141, 0.2);
					border-radius: 6px;
					background: rgba(127, 140, 141, 0.04);
					margin-top: 10px;
					margin-bottom: 0;
				}

				.hl202-management .hl202-card-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-wrap: wrap;
					gap: 12px;
				}

				.hl202-management .hl202-device-title {
					display: flex;
					align-items: center;
					gap: 8px;
				}

				.hl202-management .hl202-device-badges {
					display: flex;
					align-items: center;
					gap: 8px;
					flex-wrap: wrap;
				}

				.hl202-management .cbi-tabmenu {
					margin-top: 14px;
					margin-bottom: 0;
					user-select: none;
				}

				.hl202-management #hl202-panels-container > .cbi-section {
					margin-top: 0;
					border-top-left-radius: 0;
				}

				.hl202-management .hl202-terminal {
					background: #1e1e1e;
					color: #d4d4d4;
					font-family: Consolas, Monaco, "Courier New", monospace;
					border: 1px solid #333;
					border-radius: 4px;
					box-sizing: border-box;
				}

				.hl202-management .hl202-terminal-textarea {
					width: 100%;
					padding: 10px 12px;
					background: transparent;
					color: inherit;
					font-family: inherit;
					font-size: 90%;
					border: none;
					resize: vertical;
					outline: none;
					line-height: 1.45;
				}

				.hl202-management .hl202-terminal-output {
					background: #141414;
					color: #38ef7d;
					font-family: Consolas, Monaco, "Courier New", monospace;
					font-size: 88%;
					padding: 12px 14px;
					border-radius: 4px;
					border: 1px solid #2a2a2a;
					max-height: 28rem;
					overflow: auto;
					white-space: pre-wrap;
					word-break: break-all;
					line-height: 1.4;
					margin-top: 8px;
				}

				.hl202-management .hl202-snippets {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					gap: 6px;
					margin-bottom: 8px;
				}

				.hl202-management .hl202-snippet-tag {
					font-size: 80%;
					padding: 2px 8px;
					border-radius: 3px;
					border: 1px solid rgba(127, 140, 141, 0.35);
					background: rgba(127, 140, 141, 0.08);
					color: inherit;
					cursor: pointer;
					transition: all 0.15s ease;
				}

				.hl202-management .hl202-snippet-tag:hover {
					background: rgba(52, 152, 219, 0.15);
					border-color: rgba(52, 152, 219, 0.4);
					color: #2980b9;
				}

				.hl202-management .fttr-btn-subtle {
					font-size: 82%;
					padding: 2px 8px;
					border: 1px solid rgba(127, 140, 141, 0.35);
					background: transparent;
					color: inherit;
					border-radius: 4px;
					cursor: pointer;
					text-decoration: none;
				}

				.hl202-management .fttr-btn-subtle:hover {
					background: rgba(52, 152, 219, 0.1);
					border-color: rgba(52, 152, 219, 0.4);
					color: #2980b9;
				}

				.hl202-management :is(.cbi-dropdown,.fluent-custom-select) {
					width: 100%;
					max-width: 100%;
					min-width: 0 !important;
					box-sizing: border-box;
				}

				.hl202-management :is(.cbi-dropdown,.fluent-custom-select) > ul > li {
					white-space: normal;
					overflow-wrap: anywhere;
				}
				`
            }),
            /*#__PURE__*/ jsx("h2", {
                children: tr("HL202 sub-gateway management")
            }),
            /*#__PURE__*/ jsxs("div", {
                class: "cbi-section",
                children: [
                    /*#__PURE__*/ jsxs("div", {
                        style: "display:flex;align-items:center;flex-wrap:wrap;gap:10px",
                        children: [
                            /*#__PURE__*/ jsxs("label", {
                                htmlFor: "hl202-device",
                                style: "display:flex;align-items:center;gap:8px",
                                children: [
                                    /*#__PURE__*/ jsxs("strong", {
                                        children: [
                                            tr("HL202 device"),
                                            ":"
                                        ]
                                    }),
                                    select
                                ]
                            }),
                            refresh
                        ]
                    }),
                    status,
                    deviceOverviewCard
                ]
            }),
            tabMenu,
            panelsContainer
        ]
    });
    const poll = async ()=>{
        if (!root.isConnected) return;
        await reload();
        if (root.isConnected) window.setTimeout(()=>void poll(), 5000);
    };
    window.setTimeout(()=>void poll(), 5000);
    return root;
}
const view = L.view;
if (!("extend" in view) || typeof view.extend !== "function") throw new Error("LuCI view extension is unavailable");
const main = Reflect.apply(view.extend, view, [
    {
        render: renderPage,
        handleSave: null,
        handleSaveApply: null,
        handleReset: null
    }
]);



return main;