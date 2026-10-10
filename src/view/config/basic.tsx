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
	option = field(a, L.form.Value, "listen", _("Listen address"), "ipaddr");
	option.optional = true;
	option.rmempty = true;
	option.placeholder = _("Use the LAN address");
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
	option = field(management, L.form.Value, "vlan", _("TR069 VLAN"), "range(0,4094)");
	option.default = "46";
	option.rmempty = false;
	option = field(management, L.form.Value, "priority", _("Priority"), "range(0,7)");
	option.default = "0";
	option.rmempty = false;
	option = field(management, L.form.Value, "acs_url", _("ACS URL"));
	option.rmempty = false;

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
		["periodic", _("Periodic")],
	])
		option.value(value, label);
	option.default = ["config_change", "device_online", "cwmp_boot"];
	option.retain = true;
	option.depends("mode", "auto");
	option = field(p, L.form.Value, "interval", _("Periodic synchronization interval (seconds)"));
	option.default = "0";
	option.retain = true;
	option.depends("mode", "auto");
	option.validate = (_id: string, value: string) =>
		/^(0|[1-9][0-9]*)$/.test(value) && (Number(value) === 0 || (Number(value) >= 30 && Number(value) <= 86400))
			? true
			: _("Use 0 to disable, or 30–86400 seconds.");
	option = field(p, L.form.Value, "freshness", _("CWMP freshness (seconds)"), "range(1,86400)");
	option.default = "180";
}
