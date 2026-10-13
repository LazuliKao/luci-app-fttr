
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


;// CONCATENATED MODULE: ./src/view/config/form.ts
// SPDX-License-Identifier: Apache-2.0
const form_form = L.form;
function field(section, type, name, title, datatype) {
    const option = section.option(type, name, title);
    if (datatype) option.datatype = datatype.startsWith("range(") ? `and(uinteger,${datatype})` : datatype;
    return option;
}
function choice(section, name, title, values) {
    let optional = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
    const option = field(section, form_form.ListValue, name, title);
    for (const [value, label] of values)option.value(value, label);
    option.rmempty = optional;
    return option;
}
function reference(section, name, title, kind) {
    let optional = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false;
    const option = field(section, form_form.ListValue, name, title);
    if (optional) option.value("", _("None"));
    for (const item of L.uci.sections("fttr", kind))option.value(item[".name"], String(item.name || item.ssid || item.optical_sn || item[".name"]));
    option.rmempty = optional;
    const render = option.renderWidget;
    option.renderWidget = function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        this.keylist = [];
        this.vallist = [];
        if (optional) this.value("", _("None"));
        for (const item of L.uci.sections("fttr", kind))this.value(item[".name"], String(item.name || item.ssid || item.optical_sn || item[".name"]));
        return render.apply(this, args);
    };
    return option;
}
function grid(parent, tab, key, kind, title, setup) {
    const value = parent.taboption(tab, form_form.SectionValue, key, form_form.GridSection, kind, title);
    const section = value.subsection;
    section.anonymous = true;
    section.addremove = true;
    section.modaltitle = (id)=>String(L.uci.get("fttr", id, "name") || L.uci.get("fttr", id, "ssid") || title);
    setup(section);
    return section;
}
function preview(section, name, title, textvalue) {
    const option = section.option(L.form.DummyValue, name, title);
    option.modalonly = false;
    option.textvalue = textvalue;
}
function templateGrid(parent, tab, key, kind, title, template, setup) {
    const s = grid(parent, tab, key, kind, title, setup);
    s.filter = (id)=>L.uci.get("fttr", id, "template") === template;
    s.handleAdd = function() {
        const id = L.uci.add("fttr", kind);
        L.uci.set("fttr", id, "template", template);
        return this.renderMoreOptionsModal(id);
    };
    return s;
}

;// CONCATENATED MODULE: ./src/view/config/basic.tsx
// SPDX-License-Identifier: Apache-2.0

function addBasic(section, tab, globalId) {
    section.tab("basic", tab);
    const acs = section.taboption("basic", L.form.SectionValue, "_acs", L.form.NamedSection, "acs", "acs");
    const a = acs.subsection;
    a.addremove = false;
    a.anonymous = false;
    let option = field(a, L.form.Flag, "enabled", _("Enable ACS"));
    option.default = "1";
    option.rmempty = false;
    option = field(a, L.form.Value, "port", _("Listen port"), "port");
    option.default = "7547";
    option.rmempty = false;
    option = field(a, L.form.Value, "path", _("CWMP path"));
    option.default = "/cwmp";
    option.rmempty = false;
    option.validate = (_id, value)=>value.startsWith("/") ? true : _("The path must start with '/'.");
    option = field(a, L.form.Value, "state_file", _("ACS state file"));
    option.default = "/var/lib/fttr/acs-state.json";
    option.rmempty = false;
    option.validate = (_id, value)=>value.startsWith("/") ? true : _("The state file path must be absolute.");
    option = field(a, L.form.Value, "username", _("HTTP Basic username"));
    option.optional = true;
    option.rmempty = true;
    option = field(a, L.form.Value, "password", _("HTTP Basic password"));
    option.password = true;
    option.optional = true;
    option.rmempty = true;
    const management = section.taboption("basic", L.form.SectionValue, "_management", L.form.NamedSection, "management", "management").subsection;
    management.addremove = false;
    option = field(management, L.form.Flag, "enabled", _("Enable management network"));
    option.default = "1";
    option.rmempty = false;
    option = choice(management, "mode", _("Management application mode"), [
        [
            "manual",
            _("Manual")
        ],
        [
            "auto",
            _("Automatic")
        ]
    ]);
    option.default = "manual";
    option.rmempty = false;
    option.description = _("Manual mode only discovers and plans. Use Apply management configuration on the Synchronization page to create or update the isolated network, ACS listener and child TR069 settings.");
    option = field(management, L.form.Value, "address", _("Management IPv4 address/prefix"), "cidr4");
    option.default = "192.168.46.1/24";
    option.rmempty = false;
    option.description = _("The local ACS binds to this address. The child ACS URL is generated from this address, the ACS port and CWMP path.");
    option = field(management, L.form.DummyValue, "_generated_acs_url", _("Generated ACS URL"));
    option.cfgvalue = ()=>{
        const data = section.map.data;
        const address = String(data.get("fttr", "management", "address") || "192.168.46.1/24").split("/")[0];
        return `http://${address}:${data.get("fttr", "acs", "port") || "7547"}${data.get("fttr", "acs", "path") || "/cwmp"}`;
    };
    option = field(management, L.form.Value, "vlan", _("TR069 VLAN"), "range(1,4094)");
    option.default = "46";
    option.rmempty = false;
    option = field(management, L.form.Value, "priority", _("Priority"), "range(0,7)");
    option.default = "0";
    option.rmempty = false;
    option = field(management, L.form.Flag, "dhcp_enabled", _("Enable management DHCP"));
    option.default = "1";
    option.rmempty = false;
    for (const [key, label, value] of [
        [
            "dhcp_start",
            _("DHCP start offset"),
            "100"
        ],
        [
            "dhcp_limit",
            _("DHCP address count"),
            "100"
        ],
        [
            "dhcp_leasetime",
            _("DHCP lease time"),
            "12h"
        ]
    ]){
        option = field(management, L.form.Value, key, label);
        option.default = value;
        option.rmempty = false;
        option.depends("dhcp_enabled", "1");
    }
    const policy = section.taboption("basic", L.form.SectionValue, "_policy", L.form.NamedSection, globalId, "provisioning");
    const p = policy.subsection;
    p.addremove = false;
    p.anonymous = false;
    option = field(p, L.form.Flag, "enabled", _("Enable provisioning"));
    option.default = "1";
    option.rmempty = false;
    option = choice(p, "mode", _("Synchronization mode"), [
        [
            "auto",
            _("Automatic")
        ],
        [
            "manual",
            _("Manual")
        ]
    ]);
    option.default = "manual";
    option.description = _("Manual mode only saves configuration; use Apply differences on the Synchronization page to send it to devices. Automatic mode synchronizes after Save & Apply when Configuration changed is selected.");
    option = field(p, L.form.MultiValue, "trigger", _("Automatic triggers"));
    for (const [value, label] of [
        [
            "config_change",
            _("Configuration changed")
        ],
        [
            "device_online",
            _("Device online")
        ],
        [
            "cwmp_boot",
            _("CWMP boot")
        ],
        [
            "periodic",
            _("Periodic")
        ]
    ])option.value(value, label);
    option.default = [
        "config_change",
        "device_online",
        "cwmp_boot"
    ];
    option.retain = true;
    option.depends("mode", "auto");
    option = field(p, L.form.Value, "interval", _("Periodic synchronization interval (seconds)"));
    option.default = "0";
    option.retain = true;
    option.depends("mode", "auto");
    option.validate = (_id, value)=>/^(0|[1-9][0-9]*)$/.test(value) && (Number(value) === 0 || Number(value) >= 30 && Number(value) <= 86400) ? true : _("Use 0 to disable, or 30\u201386400 seconds.");
    option = field(p, L.form.Value, "freshness", _("CWMP freshness (seconds)"), "range(1,86400)");
    option.default = "180";
}

;// CONCATENATED MODULE: ./src/view/config/devices.tsx
// SPDX-License-Identifier: Apache-2.0

function adapterFor(device) {
    const vendor = device?.vendor || device?.serial_number.slice(0, 4);
    if (vendor === "HWTC") return "hwtc";
    if (device?.model?.startsWith("HL202")) return "hl202";
    return undefined;
}
function addDevices(section, connected) {
    const bySerial = new Map(connected.map((device)=>[
            device.serial_number,
            device
        ]));
    const label = (serial)=>{
        const device = bySerial.get(serial);
        const configured = L.uci.sections("fttr", "device").find((item)=>item.optical_sn === serial);
        const model = device?.model || String(configured?.adapter || _("Unknown model"));
        return `${model} \xb7 ${serial} \xb7 ${device?.state === "O5Operation" ? _("Connected") : _("Offline")}${device?.onu_id != null ? ` \xb7 ONU ${device.onu_id}` : ""}`;
    };
    section.tab("devices", _("Devices & groups"));
    grid(section, "devices", "_groups", "group", _("Groups"), (s)=>{
        preview(s, "_name", _("Group"), (id)=>String(L.uci.get("fttr", id, "name") || id));
        field(s, L.form.Value, "name", _("Name")).modalonly = true;
        reference(s, "template", _("Template"), "template").modalonly = true;
    });
    grid(section, "devices", "_devices", "device", _("Devices"), (s)=>{
        preview(s, "_device", _("Device"), (id)=>{
            const serial = String(L.uci.get("fttr", id, "optical_sn") || "");
            return serial ? label(serial) : _("New device");
        });
        const serial = field(s, L.form.ListValue, "optical_sn", _("Connected device"));
        serial.modalonly = true;
        serial.rmempty = false;
        serial.description = _("Lists supported devices registered on the optical link, including devices that have not sent an ACS Inform. Devices already configured are omitted when adding a new device.");
        const render = serial.renderWidget;
        serial.renderWidget = function(id, index, configured) {
            this.keylist = [];
            this.vallist = [];
            const current = String(L.uci.get("fttr", id, "optical_sn") || "");
            const used = new Set(L.uci.sections("fttr", "device").filter((item)=>item[".name"] !== id).map((item)=>item.optical_sn));
            for (const device of connected)if (device.state === "O5Operation" && adapterFor(device) && !used.has(device.serial_number)) this.value(device.serial_number, label(device.serial_number));
            if (current && !this.keylist.includes(current)) this.value(current, label(current));
            const selected = configured || current || this.keylist[0] || "";
            return render.call(this, id, index, selected);
        };
        serial.validate = (id, value)=>{
            if (!value) return _("Select device.");
            return L.uci.sections("fttr", "device").some((item)=>item[".name"] !== id && item.optical_sn === value) ? _("Device already configured.") : true;
        };
        serial.write = (id, value)=>{
            L.uci.set("fttr", id, "optical_sn", value);
            const adapter = adapterFor(bySerial.get(value));
            if (adapter) L.uci.set("fttr", id, "adapter", adapter);
        };
        reference(s, "group", _("Group"), "group").modalonly = true;
        const contract = choice(s, "cwmp_contract", _("CWMP contract"), [
            [
                "auto",
                _("Automatic (read-only capability discovery)")
            ],
            [
                "hl202-cu",
                "HL202 \xb7 CU"
            ],
            [
                "hwtc-hw",
                "HWTC \xb7 HW"
            ],
            [
                "vendor-cu-parent-vlan",
                `CU \xb7 ${_("Unverified candidate")}`
            ],
            [
                "vendor-hw-connection-vlan",
                `HW \xb7 ${_("Unverified candidate")}`
            ],
            [
                "vendor-cm-candidate",
                `CM \xb7 ${_("Unverified candidate")}`
            ],
            [
                "vendor-ct-candidate",
                `CT \xb7 ${_("Unverified candidate")}`
            ]
        ]);
        contract.modalonly = true;
        contract.default = "auto";
        contract.rmempty = false;
        contract.description = _("Independent of the optical adapter. Parameter paths, types and writable evidence are discovered before synchronization. Unverified candidates do not authorize writes.");
        const omci = field(s, L.form.Flag, "omci_management", _("Provision management VLAN and ACS via OMCI"));
        omci.modalonly = true;
        omci.default = "0";
        omci.rmempty = false;
        omci.description = _("Disabled by default. Uses the global management VLAN, priority and ACS URL for this device only, subject to management application authorization. Disabling skips future OMCI management writes and retains existing ONU settings. ME readback does not prove WAN creation or successful Inform; K155 may clear its local ACS URL when enabled.");
        const cleanup = choice(s, "wifi_cleanup", _("Unconfigured WLANs"), [
            [
                "disable",
                _("Disable (keep the WLAN object)")
            ],
            [
                "preserve",
                _("Leave unchanged")
            ],
            [
                "delete",
                _("Delete the WLAN object")
            ]
        ]);
        cleanup.modalonly = true;
        cleanup.default = "disable";
        cleanup.description = _("By default, extra WLANs are disabled and retained. Deleting objects is destructive and should only be selected deliberately.");
    });
}

;// CONCATENATED MODULE: ./src/view/config/wifi.tsx
// SPDX-License-Identifier: Apache-2.0

function addTemplateWifi(section, template) {
    const wifi = templateGrid(section, "wifi", "_wifi", "wifi", _("SSIDs"), template, (s)=>{
        preview(s, "_ssid", _("SSID"), (id)=>String(L.uci.get("fttr", id, "ssid") || id));
        const ssid = field(s, L.form.Value, "ssid", _("SSID"));
        ssid.modalonly = true;
        ssid.rmempty = false;
        ssid.validate = (_id, value)=>new TextEncoder().encode(value).length >= 1 && new TextEncoder().encode(value).length <= 32 ? true : _("SSID must be 1\u201332 bytes.");
        choice(s, "radio", _("Band"), [
            [
                "2g",
                "2.4 GHz"
            ],
            [
                "5g",
                "5 GHz"
            ]
        ]).modalonly = true;
        const security = choice(s, "security", _("Security"), [
            [
                "",
                _("Keep current key")
            ],
            [
                "wpa2-psk",
                "WPA2-PSK"
            ]
        ], true);
        security.modalonly = true;
        const key = field(s, L.form.Value, "key", _("Password"));
        key.password = true;
        key.modalonly = true;
        key.depends("security", "wpa2-psk");
        key.rmempty = false;
        key.validate = (_id, value)=>{
            const length = new TextEncoder().encode(value).length;
            return length >= 8 && length <= 63 ? true : _("Password must be 8\u201363 bytes.");
        };
    });
    const remove = wifi.handleRemove;
    wifi.handleRemove = function(id, event) {
        for (const network of L.uci.sections("fttr", "network")){
            const refs = network.ssid == null ? [] : Array.isArray(network.ssid) ? network.ssid : [
                network.ssid
            ];
            if (refs.includes(id)) L.uci.set("fttr", network[".name"], "ssid", refs.filter((ref)=>ref !== id).map(String));
        }
        return remove.call(this, id, event);
    };
}

;// CONCATENATED MODULE: ./src/view/config/services.tsx

// SPDX-License-Identifier: Apache-2.0


function addServices(section) {
    section.tab("templates", _("Templates"));
    const templates = grid(section, "templates", "_templates", "template", _("Templates"), (s)=>{
        preview(s, "_name", _("Template"), (id)=>String(L.uci.get("fttr", id, "name") || _("New template")));
        const name = field(s, L.form.Value, "name", _("Name"));
        name.modalonly = true;
        name.rmempty = false;
    });
    const remove = templates.handleRemove;
    templates.handleRemove = function(id, event) {
        if (L.uci.sections("fttr", "group").some((group)=>group.template === id)) {
            L.ui.addNotification(null, /*#__PURE__*/ jsx("p", {
                children: _("Template is in use.")
            }), "error");
            return Promise.resolve();
        }
        for (const kind of [
            "network",
            "wifi"
        ])for (const child of L.uci.sections("fttr", kind))if (child.template === id) L.uci.remove("fttr", child[".name"]);
        return remove.call(this, id, event);
    };
    templates.addModalOptions = (modal, template)=>{
        modal.tab("general", _("General"));
        modal.getOption("name").tab = "general";
        modal.tab("wifi", _("SSIDs"));
        modal.tab("networks", _("Networks"));
        addTemplateWifi(modal, template);
        templateGrid(modal, "networks", "_networks", "network", _("Networks"), template, (s)=>{
            preview(s, "_name", _("Network"), (id)=>`${String(L.uci.get("fttr", id, "name") || _("New network"))} \xb7 VLAN ${String(L.uci.get("fttr", id, "vlan") || "0")}`);
            const name = field(s, L.form.Value, "name", _("Name"));
            name.modalonly = true;
            name.rmempty = false;
            const serviceList = field(s, L.form.MultiValue, "service_list", _("WAN Service List (multi-select)"));
            serviceList.modalonly = true;
            serviceList.description = _("For custom VLANs, select any combination of INTERNET, OTHER, IPTV, and VOIP. TR069 is reserved for OMCI.");
            for (const value of [
                "INTERNET",
                "OTHER",
                "IPTV",
                "VOIP"
            ])serviceList.value(value, value);
            for (const [key, title, datatype] of [
                [
                    "vlan",
                    _("VLAN"),
                    "range(0,4094)"
                ],
                [
                    "priority",
                    _("Priority"),
                    "range(0,7)"
                ]
            ]){
                const o = field(s, L.form.Value, key, title, datatype);
                o.default = "0";
                o.rmempty = false;
                o.modalonly = true;
            }
            const ssids = field(s, L.form.MultiValue, "ssid", _("SSIDs"));
            ssids.modalonly = true;
            for (const wifi of L.uci.sections("fttr", "wifi"))if (wifi.template === template) ssids.value(wifi[".name"], String(wifi.ssid || _("SSID")));
            const ports = field(s, L.form.MultiValue, "port", _("Ports"));
            ports.modalonly = true;
            for(let i = 1; i <= 4; i++)ports.value(`lan${i}`, `LAN${i}`);
        });
    };
}

;// CONCATENATED MODULE: ./src/view/config.tsx

// SPDX-License-Identifier: Apache-2.0



const view = L.view;
const uci = L.uci;
const config_form = L.form;
const rpc = L.rpc;
const checkConfig = rpc.declare({
    object: "luci.fttr",
    method: "config_check",
    reject: true
});
const reloadConfig = rpc.declare({
    object: "luci.fttr",
    method: "config_reload",
    reject: true
});
const restartService = rpc.declare({
    object: "luci.fttr",
    method: "restart_service",
    reject: true
});
const getStatus = rpc.declare({
    object: "luci.fttr",
    method: "get_status",
    reject: true
});
async function command(fn, output, onResult) {
    try {
        const result = await fn();
        output.textContent = result.error ? String(result.error) : JSON.stringify(result, null, 2);
        onResult?.(result);
    } catch (error) {
        output.textContent = String(error);
        onResult?.({
            error: String(error)
        });
    }
}
const main = view.extend({
    async load () {
        await uci.load("fttr");
        if (!uci.sections("fttr", "provisioning").length) uci.add("fttr", "provisioning", "provisioning");
        if (!uci.sections("fttr", "management").length) uci.add("fttr", "management", "management");
        const [check, status] = await Promise.all([
            checkConfig().catch((error)=>({
                    error: String(error)
                })),
            getStatus().catch((error)=>({
                    error: String(error),
                    sub_gateways: []
                }))
        ]);
        return {
            ...check,
            error: check.error || status.error,
            connectedDevices: status.sub_gateways ?? []
        };
    },
    render (initialCheck) {
        const map = new config_form.Map("fttr", _("FTTR configuration"));
        const section = map.section(config_form.NamedSection, "acs", "acs", "acs");
        section.addremove = false;
        section.anonymous = false;
        const globalId = uci.sections("fttr", "provisioning")[0]?.[".name"] ?? "provisioning";
        addBasic(section, _("Basic"), globalId);
        addDevices(section, initialCheck.connectedDevices ?? []);
        addServices(section);
        const save = map.save;
        map.save = function(cb, silent) {
            uci.unset("fttr", "acs", "listen");
            uci.unset("fttr", "management", "acs_url");
            return save.call(this, cb, silent);
        };
        const output = /*#__PURE__*/ jsx("pre", {
            style: "white-space:pre-wrap;overflow-wrap:anywhere",
            "aria-live": "polite"
        });
        let checkNotification = null;
        const showCheck = (result)=>{
            checkNotification?.parentNode?.removeChild(checkNotification);
            checkNotification = null;
            if (result?.error) {
                checkNotification = L.ui.addNotification(_("FTTR configuration check failed"), /*#__PURE__*/ jsx("p", {
                    children: String(result.error)
                }), "error");
            }
        };
        showCheck(initialCheck);
        const actions = /*#__PURE__*/ jsxs("div", {
            class: "cbi-section",
            children: [
                /*#__PURE__*/ jsxs("p", {
                    children: [
                        _("Saving configuration does not synchronize devices in Manual mode. After Save & Apply, open Synchronization and choose Apply differences. Preview differences is read-only."),
                        " ",
                        /*#__PURE__*/ jsx("a", {
                            href: L.url("admin", "network", "fttr", "sync"),
                            children: _("Open Synchronization")
                        })
                    ]
                }),
                /*#__PURE__*/ jsx("h3", {
                    children: _("Configuration diagnostics")
                }),
                /*#__PURE__*/ jsx("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    onclick: ()=>command(checkConfig, output, showCheck),
                    children: _("Check")
                }),
                " ",
                /*#__PURE__*/ jsx("button", {
                    class: "cbi-button cbi-button-action",
                    type: "button",
                    disabled: !L.hasViewPermission(),
                    onclick: ()=>command(async ()=>{
                            const reload = await reloadConfig();
                            if (reload.error) return reload;
                            return await checkConfig();
                        }, output, showCheck),
                    children: _("Reload")
                }),
                " ",
                /*#__PURE__*/ jsx("button", {
                    class: "cbi-button cbi-button-negative",
                    type: "button",
                    disabled: !L.hasViewPermission(),
                    onclick: ()=>command(restartService, output),
                    children: _("Restart")
                }),
                output
            ]
        });
        return map.render().then((node)=>/*#__PURE__*/ jsxs("div", {
                children: [
                    node,
                    actions
                ]
            }));
    }
});



return main;