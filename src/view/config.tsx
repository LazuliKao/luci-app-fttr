// SPDX-License-Identifier: Apache-2.0

const view = L.view;
const uci = L.uci;
const form = L.form;

const main = (view as any).extend({
	load(): Promise<unknown> {
		return uci.load("fttr");
	},
	render(): Promise<Node> {
		const map = new form.Map(
			"fttr",
			_("FTTR configuration"),
			_("ACS settings are read by fttrd at startup. Save and apply changes to restart the FTTR service."),
		);
		const section = map.section(form.NamedSection, "acs", "acs", _("Embedded ACS"));
		section.addremove = false;
		section.anonymous = false;

		let option: any = section.option(form.Flag, "enabled", _("Enable ACS"));
		option.default = "0";
		option.rmempty = false;
		option.description = _("The backend must be built with ACS support. The default is disabled.");

		option = section.option(form.Value, "port", _("Listen port"));
		option.datatype = "port";
		option.default = "7547";
		option.rmempty = false;
		option.description = _("TCP port used by the embedded CWMP ACS.");

		option = section.option(form.Value, "path", _("CWMP path"));
		option.default = "/cwmp";
		option.rmempty = false;
		option.validate = (_sectionId: string, value: unknown) =>
			typeof value === "string" && value.startsWith("/")
				? true
				: _("The path must start with '/'.");

		option = section.option(form.Value, "listen", _("Listen address"));
		option.optional = true;
		option.rmempty = true;
		option.datatype = "ipaddr";
		option.placeholder = _("Use the LAN address");
		option.description = _("Leave empty to use the current LAN IP address.");

		option = section.option(form.Value, "state_file", _("ACS state file"));
		option.default = "/var/lib/fttr/acs-state.json";
		option.rmempty = false;
		option.validate = (_sectionId: string, value: unknown) =>
			typeof value === "string" && value.startsWith("/")
				? true
				: _("The state file path must be absolute.");

		option = section.option(form.Value, "username", _("HTTP Basic username"));
		option.optional = true;
		option.rmempty = true;

		option = section.option(form.Value, "password", _("HTTP Basic password"));
		option.password = true;
		option.optional = true;
		option.rmempty = true;
		option.description = _("Stored in UCI and passed to fttrd when the service starts.");

		option = section.option(form.Flag, "provision_k155", _("Enable experimental K155 OMCI ACS provisioning"));
		option.default = "0";
		option.rmempty = false;
		option.description = _("Opt-in only. Requires ACS and the HWTC K155 device adapter in the backend build.");

		option = section.option(form.Value, "k155_vlan", _("K155 ACS management VLAN"));
		option.datatype = "range(0,4094)";
		option.default = "0";
		option.rmempty = false;
		option.description = _("Use 0 for untagged management traffic, or a VLAN ID from 1 to 4094.");

		return map.render();
	},
});

export { main };
