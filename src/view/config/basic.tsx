// SPDX-License-Identifier: Apache-2.0

import { choice, field } from "./form";

export function addBasic(section: any, tab: string, globalId: string): void {
	section.tab("basic", tab);
	const acs = section.taboption("basic", L.form.SectionValue, "_acs", L.form.NamedSection, "acs", "acs");
	const a = acs.subsection;
	a.addremove = false;
	a.anonymous = false;
	let option: any = field(a, L.form.Flag, "enabled", _("Enable ACS"));
	option.default = "1";
	option.rmempty = false;
	option = field(a, L.form.Value, "port", _("Listen port"), "port");
	option.default = "7547";
	option.rmempty = false;
	option = field(a, L.form.Value, "path", _("CWMP path"));
	option.default = "/cwmp";
	option.rmempty = false;
	option.validate = (_id: string, value: string) =>
		value.startsWith("/") ? true : _("The path must start with '/'.");
	option = field(a, L.form.Value, "state_file", _("ACS state file"));
	option.default = "/var/lib/fttr/acs-state.json";
	option.rmempty = false;
	option.validate = (_id: string, value: string) =>
		value.startsWith("/") ? true : _("The state file path must be absolute.");
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
	option.default = "manual";
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
	option.validate = (_id: string, value: string) =>
		value === "" || (/^\d+$/.test(value) && Number(value) >= 1 && Number(value) <= 4094)
			? true
			: _("Enter a VLAN ID in 1–4094.");
	const parseVlans = option.parse;
	option.parse = function (id: string) {
		const values: string[] = this.formvalue(id) || [];
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
	]) {
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
	option.default = "0";
	option.rmempty = false;
	option.description = _(
		"Automatically provision standard G.988 transparent Layer 2 bridge for unrecognized or third-party GPON ONUs in O5 state.",
	);
	option = choice(p, "mode", _("Synchronization mode"), [
		["auto", _("Automatic")],
		["manual", _("Manual")],
	]);
	option.default = "manual";
	option.description = _(
		"Manual mode only saves configuration; use Apply differences on the Synchronization page to send it to devices. Automatic mode synchronizes after Save & Apply when Configuration changed is selected.",
	);
	option = field(p, (L.form as any).MultiValue, "trigger", _("Automatic triggers"));
	for (const [value, label] of [
		["config_change", _("Configuration changed")],
		["device_online", _("Device online")],
		["cwmp_boot", _("CWMP boot")],
		["program_start", _("Program start")],
		["periodic", _("Periodic")],
	])
		option.value(value, label);
	option.default = ["config_change", "device_online", "cwmp_boot"];
	option.retain = true;
	option.depends("mode", "auto");
	option = field(p, L.form.Value, "interval_minutes", _("Periodic synchronization interval (minutes)"));
	option.default = "30";
	option.retain = true;
	option.depends("mode", "auto");
	option.validate = (_id: string, value: string) =>
		/^(0|[1-9][0-9]*)$/.test(value) && (Number(value) === 0 || (Number(value) >= 1 && Number(value) <= 1440))
			? true
			: _("Use 0 to disable, or 1–1440 minutes.");
	option = field(p, L.form.Value, "freshness", _("CWMP freshness (seconds)"), "range(1,86400)");
	option.default = "180";
}
