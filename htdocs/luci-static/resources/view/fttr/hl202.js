
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


;// CONCATENATED MODULE: ./src/view/hl202/dom.ts
const dom_text = (value)=>document.createTextNode(value);
function dom_button(label) {
    let kind = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "action";
    const node = document.createElement("button");
    node.className = `cbi-button cbi-button-${kind}`;
    node.textContent = label;
    return node;
}
function dom_input(type, label) {
    const node = document.createElement("input");
    node.type = type;
    node.setAttribute("aria-label", label);
    return node;
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
const rpc_report = L.rpc.declare({
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
const readReport = async (target)=>wait(await rpc_report(target));
const readAccounts = async (target)=>wait(await accounts(target));
const setAccount = async (target, change)=>wait(await update(target, `account_set_${change.kind}`, change.entry, change.password, change.active));
const execute = async (target, script, timeout)=>wait(await exec(target, script, timeout));

;// CONCATENATED MODULE: ./src/view/hl202/panels.tsx



const raw = (value)=>/*#__PURE__*/ jsx("pre", {
        style: "white-space:pre-wrap;overflow-wrap:anywhere;max-height:32rem;overflow:auto",
        children: dom_text(typeof value === "string" ? value : JSON.stringify(value, null, 2))
    });
const section = (title, children)=>/*#__PURE__*/ jsxs("div", {
        class: "cbi-section",
        children: [
            /*#__PURE__*/ jsx("h3", {
                children: title
            }),
            children
        ]
    });
let busy = false;
const isBusy = ()=>busy;
function action(button, output, run) {
    button.addEventListener("click", async ()=>{
        if (busy) {
            output.textContent = _("Another operation is in progress.");
            return;
        }
        busy = true;
        button.disabled = true;
        output.textContent = _("Waiting for device result\u2026");
        try {
            await run();
        } catch (cause) {
            output.textContent = cause instanceof Error ? cause.message : _("Request failed");
        } finally{
            busy = false;
            button.disabled = false;
        }
    });
}
function operation(output, response) {
    const selected = object(response.operation);
    const result = object(selected.result);
    const status = typeof result.status === "string" ? result.status : _("Unknown");
    output.replaceChildren(/*#__PURE__*/ jsx("p", {
        children: dom_text(`${_("State")}: ${status}; ${_("Exit code")}: ${String(result.exit_code ?? "\u2014")}; ${_("Request ID")}: ${String(result.request_id ?? "\u2014")}`)
    }));
    if (selected.binding_current === false) output.append(/*#__PURE__*/ jsx("p", {
        children: _("Device binding changed after submission. This result belongs to the original target.")
    }));
    if (status === "timeout") output.append(/*#__PURE__*/ jsx("p", {
        children: _("Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.")
    }));
    if (typeof result.error === "string") output.append(raw(result.error));
    if (typeof result.output === "string") output.append(raw(result.output));
    if (result.output_truncated === true) output.append(/*#__PURE__*/ jsx("p", {
        children: _("Output was truncated at the byte limit.")
    }));
}
function reportPanel(target) {
    const output = /*#__PURE__*/ jsx("div", {
        "aria-live": "polite"
    });
    const button = dom_button(_("Read MQTT report"));
    action(button, output, async ()=>{
        const response = await readReport(target);
        if (!response.report) {
            output.textContent = _("No MQTT report has been parsed yet.");
            return;
        }
        const state = object(response.report);
        output.replaceChildren(/*#__PURE__*/ jsx("p", {
            children: dom_text(`${_("Revision")}: ${String(state.revision)}; ${_("Last received")}: ${String(state.last_received ?? "\u2014")}; ${_("Last good report")}: ${String(state.last_good ?? "\u2014")}`)
        }));
        if (typeof state.error === "string") output.append(/*#__PURE__*/ jsx("p", {
            children: dom_text(`${_("Latest report error")}: ${state.error}`)
        }));
        if (!state.report) return;
        const report = object(state.report);
        const fields = object(report.fields);
        output.append(/*#__PURE__*/ jsx("div", {
            style: "overflow-x:auto",
            children: /*#__PURE__*/ jsxs("table", {
                class: "table",
                children: [
                    /*#__PURE__*/ jsx("thead", {
                        children: /*#__PURE__*/ jsxs("tr", {
                            children: [
                                /*#__PURE__*/ jsx("th", {
                                    children: _("Field")
                                }),
                                /*#__PURE__*/ jsx("th", {
                                    children: _("Value")
                                }),
                                /*#__PURE__*/ jsx("th", {
                                    children: _("Source member")
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx("tbody", {
                        children: Object.entries(fields).map((param)=>{
                            let [name, value] = param;
                            const field = object(value);
                            return /*#__PURE__*/ jsxs("tr", {
                                children: [
                                    /*#__PURE__*/ jsx("td", {
                                        children: dom_text(name)
                                    }),
                                    /*#__PURE__*/ jsx("td", {
                                        children: dom_text(`${String(field.value)}${typeof field.unit === "string" ? ` ${field.unit}` : ""}`)
                                    }),
                                    /*#__PURE__*/ jsx("td", {
                                        children: dom_text(String(field.member))
                                    })
                                ]
                            });
                        })
                    })
                ]
            })
        }));
        if (Array.isArray(report.errors) && report.errors.length) output.append(raw(report.errors));
        if (Array.isArray(report.members)) for (const value of report.members){
            const member = object(value);
            output.append(/*#__PURE__*/ jsxs("details", {
                children: [
                    /*#__PURE__*/ jsx("summary", {
                        children: dom_text(`${String(member.name)} (${String(member.bytes)} bytes, ${String(member.encoding)})`)
                    }),
                    typeof member.text === "string" ? raw(member.text) : /*#__PURE__*/ jsx("p", {
                        children: member.text_omitted ? _("Text omitted at the shared byte limit.") : _("Binary member; text is unavailable.")
                    })
                ]
            }));
        }
    });
    return section(_("MQTT report"), [
        button,
        output
    ]);
}
function accountsPanel(target) {
    const output = /*#__PURE__*/ jsx("div", {
        "aria-live": "polite"
    });
    const button = dom_button(_("Read users"));
    button.disabled = !L.hasViewPermission();
    action(button, output, async ()=>{
        const response = check(await readAccounts(target));
        operation(output, response);
        if (!Array.isArray(response.accounts)) return;
        for (const item of response.accounts){
            const account = object(item);
            if (typeof account.entry !== "number" || typeof account.username !== "string" || typeof account.active !== "boolean") throw new Error(_("Invalid account metadata"));
            const entry = account.entry;
            const active = account.active;
            const password = dom_input("password", `${_("New password")}: ${account.username}`);
            password.autocomplete = "new-password";
            password.id = `hl202-password-${entry}`;
            const save = dom_button(_("Set password"));
            const toggle = dom_button(active ? _("Disable") : _("Enable"));
            save.disabled = toggle.disabled = !L.hasViewPermission();
            const status = /*#__PURE__*/ jsx("div", {
                "aria-live": "polite"
            });
            action(save, status, async ()=>{
                const value = password.value;
                password.value = "";
                const result = await setAccount(target, {
                    entry,
                    kind: "password",
                    password: value,
                    active
                });
                operation(status, result);
                status.append(/*#__PURE__*/ jsx("p", {
                    children: dom_text(String(result.write_status))
                }));
            });
            action(toggle, status, async ()=>{
                const result = await setAccount(target, {
                    entry,
                    kind: "active",
                    password: "",
                    active: !active
                });
                operation(status, result);
                status.append(/*#__PURE__*/ jsxs("p", {
                    children: [
                        dom_text(String(result.write_status)),
                        "; ",
                        _("Refresh users to read the current state.")
                    ]
                }));
            });
            output.append(/*#__PURE__*/ jsxs("div", {
                class: "cbi-section",
                children: [
                    /*#__PURE__*/ jsx("h4", {
                        children: dom_text(`${account.username} (Entry ${entry}) \u{2014} ${active ? _("Enabled") : _("Disabled")}`)
                    }),
                    /*#__PURE__*/ jsxs("label", {
                        htmlFor: password.id,
                        children: [
                            _("New password"),
                            " ",
                            password
                        ]
                    }),
                    " ",
                    save,
                    " ",
                    toggle,
                    status
                ]
            }));
        }
    });
    return section(_("User management"), [
        /*#__PURE__*/ jsx("p", {
            children: _("Password writes are accepted and saved by the device; this does not prove web login permission. Existing permission masks are preserved.")
        }),
        button,
        output
    ]);
}
function consolePanel(target) {
    const script = document.createElement("textarea");
    script.id = "hl202-script";
    script.rows = 8;
    script.style.cssText = "width:100%;box-sizing:border-box;font-family:monospace";
    script.setAttribute("aria-label", _("Remote shell command"));
    script.spellcheck = false;
    const timeout = dom_input("number", _("Timeout in seconds"));
    timeout.id = "hl202-timeout";
    timeout.min = "1";
    timeout.max = "300";
    timeout.value = "20";
    const button = dom_button(_("Execute on selected HL202"), "apply");
    button.disabled = !L.hasViewPermission();
    const output = /*#__PURE__*/ jsx("div", {
        "aria-live": "polite"
    });
    action(button, output, async ()=>{
        const seconds = Number(timeout.value);
        if (!Number.isInteger(seconds) || seconds < 1 || seconds > 300) throw new Error(_("Timeout must be 1\u2013300 seconds."));
        if (!script.value.trim() || script.value.includes("\0") || new TextEncoder().encode(script.value).length > 65536) throw new Error(_("Enter a non-empty UTF-8 script up to 64 KiB without NUL characters."));
        operation(output, await execute(target, script.value, seconds));
    });
    return section(_("Raw command console"), [
        /*#__PURE__*/ jsx("p", {
            children: _("Shell executes on the selected ONU. Timeout does not cancel execution. Raw output can contain secrets.")
        }),
        /*#__PURE__*/ jsx("p", {
            children: dom_text(`${_("Target")}: ${target.optical_sn} / ONU ${target.onu_id}`)
        }),
        /*#__PURE__*/ jsxs("label", {
            htmlFor: "hl202-script",
            children: [
                _("Remote shell command"),
                script
            ]
        }),
        /*#__PURE__*/ jsxs("label", {
            htmlFor: "hl202-timeout",
            children: [
                _("Timeout in seconds"),
                " ",
                timeout
            ]
        }),
        button,
        output
    ]);
}

;// CONCATENATED MODULE: ./src/view/hl202.tsx




function renderPage() {
    const select = document.createElement("select");
    select.id = "hl202-device";
    select.setAttribute("aria-label", _("HL202 device"));
    const refresh = dom_button(_("Refresh devices"));
    const status = /*#__PURE__*/ jsx("p", {
        "aria-live": "polite"
    });
    const panels = /*#__PURE__*/ jsx("div", {});
    const sourceSelect = document.createElement("select");
    sourceSelect.id = "hl202-source";
    sourceSelect.setAttribute("aria-label", _("Read-only MQTT source"));
    const sourceRead = dom_button(_("Inspect source report (read-only)"));
    const sourceDetails = /*#__PURE__*/ jsx("div", {});
    let sourceTargets = [];
    const sources = /*#__PURE__*/ jsxs("details", {
        children: [
            /*#__PURE__*/ jsx("summary", {
                children: _("MQTT source identity")
            }),
            /*#__PURE__*/ jsx("pre", {
                style: "white-space:pre-wrap;overflow-wrap:anywhere"
            }),
            /*#__PURE__*/ jsxs("label", {
                htmlFor: "hl202-source",
                children: [
                    _("Read-only MQTT source"),
                    " ",
                    sourceSelect
                ]
            }),
            sourceRead,
            sourceDetails
        ]
    });
    let targets = [];
    let shown = "";
    let reportRevision;
    const show = ()=>{
        const target = targets.find((item)=>item.optical_sn === select.value);
        const key = target ? `${target.optical_sn}/${target.binding_generation}` : select.value;
        if (shown === key) return;
        shown = key;
        reportRevision = undefined;
        panels.replaceChildren();
        if (target) panels.append(/*#__PURE__*/ jsx("p", {
            children: /*#__PURE__*/ jsx("a", {
                href: L.url("admin", "network", "fttr", "hardware"),
                children: _("Open optical status and ONU/MIB details")
            })
        }), reportPanel(target), accountsPanel(target), consolePanel(target));
        else panels.append(/*#__PURE__*/ jsx("p", {
            children: _("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")
        }));
    };
    const reload = async ()=>{
        refresh.disabled = true;
        status.textContent = _("Loading devices\u2026");
        try {
            const response = check(await list());
            if (!Array.isArray(response.devices)) throw new Error(_("Invalid device list"));
            const previous = select.value;
            targets = [];
            select.replaceChildren();
            const found = [];
            const revisions = new Map();
            for (const value of response.devices){
                const device = object(value);
                if (typeof device.optical_sn !== "string" || typeof device.onu_id !== "number") throw new Error(_("Invalid device identity"));
                const ready = device.can_execute === true && device.mqtt !== null;
                if (typeof device.report_revision === "number") revisions.set(device.optical_sn, device.report_revision);
                select.append(/*#__PURE__*/ jsx("option", {
                    value: device.optical_sn,
                    children: dom_text(`${String(device.model)} / ${device.optical_sn} / ONU ${device.onu_id} \u{2014} ${ready ? _("MQTT ready") : _("MQTT unavailable")}; ${device.optical_online ? _("Optical online") : _("Optical offline")}`)
                }));
                if (ready) {
                    const mqtt = object(device.mqtt);
                    if (typeof mqtt.binding_generation !== "string") throw new Error(_("Invalid binding generation"));
                    found.push({
                        optical_sn: device.optical_sn,
                        onu_id: device.onu_id,
                        binding_generation: mqtt.binding_generation
                    });
                }
            }
            targets = found;
            if (Array.from(select.options).some((option)=>option.value === previous)) select.value = previous;
            status.textContent = response.devices.length ? _("Select a device to inspect reports and run operations.") : _("No HL202 optical devices were found.");
            const pre = sources.querySelector("pre");
            if (pre) pre.textContent = JSON.stringify(response.sources, null, 2);
            const previousSource = sourceSelect.value;
            const observations = [];
            sourceSelect.replaceChildren();
            if (Array.isArray(response.sources)) for (const value of response.sources){
                const source = object(value);
                if (typeof source.mqtt_mac !== "string" || typeof source.binding_generation !== "string") throw new Error(_("Invalid source observation"));
                observations.push({
                    mqtt_mac: source.mqtt_mac,
                    binding_generation: source.binding_generation
                });
                sourceSelect.append(/*#__PURE__*/ jsx("option", {
                    value: source.mqtt_mac,
                    children: dom_text(`${source.mqtt_mac} \u{2014} ${String(source.reason)}`)
                }));
            }
            sourceTargets = observations;
            if (observations.some((source)=>source.mqtt_mac === previousSource)) sourceSelect.value = previousSource;
            sourceRead.disabled = observations.length === 0;
            show();
            const revision = revisions.get(select.value);
            if (revision !== undefined && revision !== reportRevision && !isBusy()) {
                reportRevision = revision;
                const read = panels.querySelector("button");
                if (read instanceof HTMLButtonElement) read.click();
            }
        } catch (cause) {
            targets = [];
            panels.replaceChildren();
            shown = "";
            status.textContent = cause instanceof Error ? cause.message : _("Request failed");
        } finally{
            refresh.disabled = false;
        }
    };
    select.addEventListener("change", show);
    sourceRead.addEventListener("click", ()=>{
        const target = sourceTargets.find((source)=>source.mqtt_mac === sourceSelect.value);
        sourceDetails.replaceChildren();
        if (target) {
            const panel = reportPanel(target);
            sourceDetails.append(panel);
            const read = panel.querySelector("button");
            if (read instanceof HTMLButtonElement) read.click();
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
                children: ".hl202-management :is(.cbi-dropdown,.fluent-custom-select){width:100%;max-width:100%;min-width:0!important;box-sizing:border-box}.hl202-management :is(.cbi-dropdown,.fluent-custom-select)>ul>li{white-space:normal;overflow-wrap:anywhere}"
            }),
            /*#__PURE__*/ jsx("h2", {
                children: _("HL202 sub-gateway management")
            }),
            /*#__PURE__*/ jsxs("div", {
                class: "cbi-section",
                children: [
                    /*#__PURE__*/ jsxs("label", {
                        htmlFor: "hl202-device",
                        style: "display:block;max-width:100%",
                        children: [
                            _("HL202 device"),
                            " ",
                            select
                        ]
                    }),
                    " ",
                    refresh,
                    status,
                    sources
                ]
            }),
            panels
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