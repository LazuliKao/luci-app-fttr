// SPDX-License-Identifier: Apache-2.0

import type { PlatformInfoReply } from "../contracts/api";
import type { Capabilities } from "../contracts/capabilities";
import { choice, dynamicChoices, field, grid, preview } from "./form";

function validIpv4OrCidr(value: unknown): true | string {
	if (typeof value !== "string") return _("Enter an IPv4 address or CIDR prefix (e.g. 10.0.0.1 or 10.20.30.0/24).");
	const raw = value.trim();
	const parts = raw.split("/");
	if (parts.length > 2) return _("Invalid IPv4 or CIDR format.");
	const addr = parts[0] ?? "";
	const octets = addr.split(".");
	if (octets.length !== 4 || octets.some((o) => !/^(0|[1-9]\d{0,2})$/.test(o) || Number(o) > 255)) {
		return _("Enter a valid IPv4 address.");
	}
	const prefixRaw = parts[1];
	if (prefixRaw !== undefined) {
		if (!/^\d+$/.test(prefixRaw)) return _("Invalid CIDR prefix length.");
		const prefix = Number(prefixRaw);
		if (prefix < 1 || prefix > 32) return _("CIDR prefix must be between 1 and 32.");
		const ipNum =
			((Number(octets[0]) << 24) | (Number(octets[1]) << 16) | (Number(octets[2]) << 8) | Number(octets[3])) >>>
			0;
		const mask = prefix === 32 ? 0xffffffff : (0xffffffff << (32 - prefix)) >>> 0;
		if ((ipNum & ~mask) !== 0) {
			return _("CIDR host bits must be zero (e.g. 10.20.30.0/24).");
		}
	}
	return true;
}

function validAcsRedirectPath(value: unknown): true | string {
	const raw = String(value ?? "").trim();
	if (!raw) return _("Specify an exact path starting with '/' (e.g. '/cwmp') or '*' explicitly for wildcard.");
	if (raw === "*") return true;
	if (!raw.startsWith("/")) return _("Exact path must start with '/' (or enter '*' explicitly for wildcard).");
	if (/[?#\s]/.test(raw) || raw.includes("..") || raw.includes("\\")) {
		return _("Exact path must not contain whitespace, query, fragment, backslash, or '..'.");
	}
	return true;
}

export function addBasic(
	section: LuCI.form.AbstractSection,
	tab: string,
	globalId: string,
	platform: PlatformInfoReply,
	capabilities?: Capabilities,
): void {
	section.tab("basic", tab);
	if (platform.platform_id === "fiberhome-an4475-g2") {
		const fiberhome = section.taboption(
			"basic",
			L.form.SectionValue,
			"_fiberhome",
			L.form.NamedSection,
			"fiberhome",
			"fiberhome",
		).subsection;
		fiberhome.addremove = false;
		const count = field(fiberhome, L.form.Value, "onu_count", _("ONU interface count"), "range(1,128)");
		count.default = "128";
		count.rmempty = false;
		count.description = _(
			"Reserves ONU IDs 0 through count − 1. Restart FTTR to apply; this does not guarantee concurrent ONU capacity.",
		);
		const snapshot = field(fiberhome, L.form.Flag, "rx_snapshot", _("FSL RX register snapshots"));
		snapshot.default = "0";
		snapshot.rmempty = false;
		snapshot.description = _(
			"Off by default. Logs up to three RX register snapshots at 30-second intervals after restart. Restart FTTR to apply changes.",
		);
		const status = field(fiberhome, L.form.DummyValue, "_count_status", _("Saved / active count"));
		status.cfgvalue = () => {
			const saved = Number(L.uci.get("fttr", "fiberhome", "onu_count") || 128);
			const active = platform.onus.length;
			return `${saved} / ${active}${saved !== active ? ` · ${_("Pending restart")}` : ""}`;
		};
	}
	const acs = section.taboption("basic", L.form.SectionValue, "_acs", L.form.NamedSection, "acs", "acs");
	const a = acs.subsection;
	a.addremove = false;
	a.anonymous = false;
	let option: LuCI.form.Value = field(a, L.form.Flag, "enabled", _("Enable ACS"));
	option.default = "1";
	option.rmempty = false;
	option = field(a, L.form.Value, "port", _("Listen port"), "port");
	option.default = "7547";
	option.rmempty = false;
	option = field(a, L.form.Value, "path", _("CWMP path"));
	option.default = "/cwmp";
	option.rmempty = false;
	option.validate = (_id, value) =>
		typeof value === "string" && value.startsWith("/") ? true : _("The path must start with '/'.");
	option = field(a, L.form.Value, "state_file", _("ACS state file"));
	option.default = "/var/lib/fttr/acs-state.json";
	option.rmempty = false;
	option.validate = (_id, value) =>
		typeof value === "string" && value.startsWith("/") ? true : _("The state file path must be absolute.");
	option = field(a, L.form.Value, "username", _("HTTP Basic username"));
	option.optional = true;
	option.rmempty = true;
	option = field(a, L.form.Value, "password", _("HTTP Basic password"));
	option.password = true;
	option.optional = true;
	option.rmempty = true;
	const management = section.taboption(
		"basic",
		L.form.SectionValue,
		"_management",
		L.form.NamedSection,
		"management",
		"management",
	).subsection;
	management.addremove = false;
	option = field(management, L.form.Flag, "enabled", _("Enable management network"));
	option.default = "1";
	option.rmempty = false;
	option = choice(management, "mode", _("Management application mode"), [
		["manual", _("Manual")],
		["auto", _("Automatic")],
	]);
	option.default = "auto";
	option.rmempty = false;
	option.description = _(
		"Manual mode only discovers and plans. Use Apply management configuration on the Synchronization page to create or update the isolated network, ACS listener and child TR069 settings.",
	);
	option = field(management, L.form.Value, "address", _("Management IPv4 address/prefix"), "cidr4");
	option.default = "192.168.46.1/24";
	option.rmempty = false;
	option.description = _(
		"The local ACS binds to this address. The child ACS URL is generated from this address, the ACS port and CWMP path.",
	);
	option = field(management, L.form.DummyValue, "_generated_acs_url", _("Generated ACS URL"));
	option.cfgvalue = () => {
		const data = section.map.data;
		const address = String(data.get("fttr", "management", "address") || "192.168.46.1/24").split("/")[0];
		return `http://${address}:${data.get("fttr", "acs", "port") || "7547"}${data.get("fttr", "acs", "path") || "/cwmp"}`;
	};
	option = field(management, L.form.DynamicList, "vlan", _("TR069 VLANs"), "range(1,4094)");
	option.default = ["46"];
	option.rmempty = false;
	option.description = _(
		"All listed VLANs share one management bridge and DHCP pool. Retain an existing listed management VLAN; the first VLAN is the fallback.",
	);
	option.validate = (_id, value) =>
		typeof value === "string" &&
		(value === "" || (/^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 4094))
			? true
			: _("Enter a VLAN ID in 1–4094.");
	const parseVlans = option.parse;
	option.parse = function (id: string) {
		const input = this.formvalue(id);
		const values = Array.isArray(input) ? input.map(String) : [];
		if (!values.length) return Promise.reject(new Error(_("Enter at least one VLAN ID in 1–4094.")));
		if (new Set(values.map(Number)).size !== values.length)
			return Promise.reject(new Error(_("Duplicate VLAN IDs are not allowed.")));
		return parseVlans.call(this, id);
	};
	option = field(management, L.form.Value, "priority", _("Priority"), "range(0,7)");
	option.default = "0";
	option.rmempty = false;
	option = field(management, L.form.Flag, "dhcp_enabled", _("Enable management DHCP"));
	option.default = "1";
	option.rmempty = false;
	for (const [key, label, value] of [
		["dhcp_start", _("DHCP start offset"), "100"],
		["dhcp_limit", _("DHCP address count"), "100"],
		["dhcp_leasetime", _("DHCP lease time"), "12h"],
	] as const) {
		option = field(management, L.form.Value, key, label);
		option.default = value;
		option.rmempty = false;
		option.depends("dhcp_enabled", "1");
	}

	const policy = section.taboption(
		"basic",
		L.form.SectionValue,
		"_policy",
		L.form.NamedSection,
		globalId,
		"provisioning",
	);
	const p = policy.subsection;
	p.addremove = false;
	p.anonymous = false;
	option = field(p, L.form.Flag, "enabled", _("Enable provisioning"));
	option.default = "1";
	option.rmempty = false;
	option = field(p, L.form.Flag, "allow_unsupported_as_bridge", _("Allow unsupported ONUs as bridge"));
	option.default = "1";
	option.rmempty = false;
	option.description = _(
		"Automatically provision standard G.988 transparent Layer 2 bridge for unrecognized or third-party GPON ONUs in O5 state.",
	);
	option = choice(p, "mode", _("Synchronization mode"), [
		["auto", _("Automatic")],
		["manual", _("Manual")],
	]);
	option.default = "auto";
	option.description = _(
		"Manual mode only saves configuration; use Apply differences on the Synchronization page to send it to devices. Automatic mode synchronizes after Save & Apply when Configuration changed is selected.",
	);
	option = field(p, L.form.MultiValue, "trigger", _("Automatic triggers"));
	for (const [value, label] of [
		["config_change", _("Configuration changed")],
		["device_online", _("Device online")],
		["cwmp_boot", _("CWMP boot")],
		["program_start", _("Program start")],
		["periodic", _("Periodic")],
	] as const)
		option.value(value, label);
	option.default = ["config_change", "device_online", "cwmp_boot", "program_start", "periodic"];
	option.retain = true;
	option.depends("mode", "auto");
	option = field(p, L.form.Value, "interval_minutes", _("Periodic synchronization interval (minutes)"));
	option.default = "30";
	option.retain = true;
	option.depends("mode", "auto");
	option.validate = (_id, value) =>
		typeof value === "string" &&
		/^(0|[1-9][0-9]*)$/.test(value) &&
		(Number(value) === 0 || (Number(value) >= 1 && Number(value) <= 1440))
			? true
			: _("Use 0 to disable, or 1–1440 minutes.");
	option = field(p, L.form.Value, "freshness", _("CWMP freshness (seconds)"), "range(1,86400)");
	option.default = "180";

	if (capabilities?.features["mqtt-bridge"] ?? capabilities?.features.mqtt ?? true) {
		const mqttBridge = section.taboption(
			"basic",
			L.form.SectionValue,
			"_mqtt_bridge",
			L.form.NamedSection,
			"mqtt_bridge",
			"mqtt_bridge",
		).subsection;
		mqttBridge.addremove = false;
		mqttBridge.anonymous = false;
		const enabled = field(mqttBridge, L.form.Flag, "enabled", _("Enable bridge-mode MQTT redirect"));
		enabled.default = "0";
		enabled.rmempty = false;
		enabled.description = _(
			"Off by default. In pure bridge mode where the upstream router assigns LAN IPv4 via DHCP, selectively redirects verified HL202 sub-gateways' upstream MQTT (TCP 1883) connections to this controller's embedded broker without altering NAT-mode ONUs or downstream clients.",
		);
	}

	if (capabilities?.features["acs-bridge"] ?? capabilities?.features.acs ?? true) {
		const acsBridge = section.taboption(
			"basic",
			L.form.SectionValue,
			"_acs_bridge",
			L.form.NamedSection,
			"acs_bridge",
			"acs_bridge",
		).subsection;
		acsBridge.addremove = false;
		acsBridge.anonymous = false;
		const abEnabled = field(acsBridge, L.form.Flag, "enabled", _("Enable arbitrary-IP ACS hijack & redirect"));
		abEnabled.default = "0";
		abEnabled.rmempty = false;
		abEnabled.description = _(
			"Off by default. Intercepts configured target ACS IP/CIDR and port connections on FTTR ONU bridge ports (fttrN on br-lan, excluding router eth/wlan ports) or the isolated br-tr069 management VLAN, and redirects them to this controller's embedded ACS. Note: hosts bridged behind the same fttrN port share that L2 port; use br-tr069 management scope for per-device source IP isolation.",
		);
		const mgmtGateway = field(
			acsBridge,
			L.form.Flag,
			"management_gateway",
			_("Advertise isolated management gateway (DHCP Option 3)"),
		);
		mgmtGateway.default = "0";
		mgmtGateway.rmempty = false;
		mgmtGateway.depends("enabled", "1");
		mgmtGateway.description = _(
			"Advertises the management bridge IP as default gateway (DHCP Option 3) on br-tr069 while keeping firewall forwarding rejected, so FTTR ONUs pointing to arbitrary external ACS IPs (e.g. 10.x.x.x) send packets to prerouting DNAT without modifying ONU settings.",
		);

		grid(section, "basic", "_acs_redirect", "acs_redirect", _("ACS redirect rules (FTTR ONUs)"), (s) => {
			s.description = _(
				"Each rule matches FTTR ONU traffic toward an arbitrary operator ACS IPv4/CIDR and TCP port. Exact path is default/recommended (e.g. '/tr069'); enter '*' explicitly to wildcard any valid CWMP POST path. Path policies apply per active listener (LAN vs br-tr069) once rules are installed.",
			);
			preview(s, "_rule_summary", _("Rule"), (id) => {
				const ruleName = String(L.uci.get("fttr", id, "name") || "").trim();
				const target = String(L.uci.get("fttr", id, "target_ip") || "—");
				const port = String(L.uci.get("fttr", id, "target_port") || "7547");
				const on = L.uci.get("fttr", id, "enabled") !== "0";
				return `${ruleName || `${target}:${port}`} · ${on ? _("Enabled") : _("Disabled")}`;
			});
			preview(s, "_scope_preview", _("Scope"), (id) => {
				const scope = String(L.uci.get("fttr", id, "scope") || "lan");
				if (scope === "management") return _("TR069 management (br-tr069)");
				if (scope === "both") return _("Both (fttrN + br-tr069)");
				return _("Bridge / LAN (fttrN port)");
			});
			preview(s, "_target_preview", _("Original ACS target"), (id) => {
				const target = String(L.uci.get("fttr", id, "target_ip") || "—");
				const port = String(L.uci.get("fttr", id, "target_port") || "7547");
				return `${target}:${port}`;
			});
			preview(s, "_path_mode_preview", _("CWMP path matching"), (id) => {
				const raw = String(L.uci.get("fttr", id, "path") ?? "").trim();
				if (raw === "*") return _("Explicit wildcard (* — any valid path)");
				if (raw.startsWith("/")) return _("Exact path: %s").format(raw);
				return _("Missing path (edit required)");
			});
			preview(s, "_device_preview", _("Target FTTR ONU"), (id) => {
				const devId = String(L.uci.get("fttr", id, "device") || "").trim();
				if (!devId) return _("All online FTTR ONUs (scope-filtered)");
				const row = L.uci
					.sections("fttr", "device")
					.find(
						(d) => d[".name"] === devId || String(d.optical_sn || "").toUpperCase() === devId.toUpperCase(),
					);
				if (!row) return devId;
				const label = String(row.name || "").trim();
				const sn = String(row.optical_sn || "").trim();
				return label && sn ? `${label} (${sn})` : label || sn || devId;
			});

			const rEnabled = field(s, L.form.Flag, "enabled", _("Enable rule"));
			rEnabled.default = "1";
			rEnabled.rmempty = false;
			rEnabled.modalonly = true;

			const rName = field(s, L.form.Value, "name", _("Rule name"));
			rName.optional = true;
			rName.rmempty = true;
			rName.modalonly = true;

			const rScope = choice(s, "scope", _("Scope"), [
				["lan", _("Bridge / LAN (fttrN port)")],
				["management", _("TR069 management (br-tr069)")],
				["both", _("Both (fttrN + br-tr069)")],
			]);
			rScope.default = "lan";
			rScope.modalonly = true;

			const rTarget = field(s, L.form.Value, "target_ip", _("Target ACS IPv4 / CIDR"));
			rTarget.rmempty = false;
			rTarget.modalonly = true;
			rTarget.placeholder = "10.0.0.1 / 10.20.30.0/24";
			rTarget.validate = (_id, value) => validIpv4OrCidr(value);

			const rPort = field(s, L.form.Value, "target_port", _("Target TCP port"), "port");
			rPort.default = "7547";
			rPort.rmempty = false;
			rPort.modalonly = true;

			const rPath = field(s, L.form.Value, "path", _("CWMP POST path"));
			rPath.default = "/cwmp";
			rPath.optional = false;
			rPath.rmempty = false;
			rPath.modalonly = true;
			rPath.placeholder = "/cwmp or *";
			rPath.description = _(
				"Required. Enter an exact path starting with '/' (e.g. '/tr069') to restrict to that path, or enter '*' explicitly to wildcard any valid CWMP POST path. Active rules share the accepted path set of their target listener (LAN vs br-tr069).",
			);
			rPath.validate = (_id, value) => validAcsRedirectPath(value);

			const rDevice = field(s, L.form.RichListValue, "device", _("Target FTTR ONU"));
			rDevice.optional = true;
			rDevice.rmempty = true;
			rDevice.modalonly = true;
			rDevice.default = "";
			rDevice.description = _(
				"Restricts LAN interception to the ONU's fttrN port (never router eth/wlan ports; bridged downstream hosts behind fttrN share the L2 port) and isolates br-tr069 management rules by unique ONU management IPv4.",
			);
			dynamicChoices(rDevice, () => [
				["", _("All online FTTR ONUs (fttrN / br-tr069)")],
				...L.uci.sections("fttr", "device").map((row): [string, string] => {
					const name = String(row.name || "").trim();
					const sn = String(row.optical_sn || "").trim();
					return [row[".name"], name && sn ? `${name} (${sn})` : name || sn || row[".name"]];
				}),
			]);
		});
	}
}
