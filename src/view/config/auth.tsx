// SPDX-License-Identifier: Apache-2.0
import { choice, field, tabchoice, tabfield } from "./form";

export function authFields(section: any, device = false): void {
	const value = (type: any, key: string, label: string): any =>
		device ? tabfield(section, "auth", type, key, label) : field(section, type, key, label);
	const modes: [string, string][] = [
		["disabled", _("Disabled (skip authentication)")],
		["loid_password", _("LOID and password")],
	];
	if (device) modes.unshift(["inherit", _("Inherit global policy")]);
	const mode = device
		? tabchoice(section, "auth", "auth_mode", _("Authentication mode"), modes)
		: choice(section, "auth_mode", _("Authentication mode"), modes);
	mode.default = device ? "inherit" : "disabled";
	mode.rmempty = false;
	if (!device) {
		mode.write = (id: string, text: string) => {
			L.uci.set("fttr", id, "auth_mode", text);
			L.uci.set("fttr", id, "schema_version", "1");
		};
	}
	mode.description = _(
		"Inheritance uses the complete global policy. A device override requires its own LOID and password. Authentication is separate from optical identity and forwarding verification.",
	);
	for (const [key, label, max] of [
		["auth_loid", _("Expected LOID"), 24],
		["auth_password", _("Expected password"), 12],
	] as const) {
		const option = value(L.form.Value, key, label);
		option.depends("auth_mode", "loid_password");
		option.password = key === "auth_password";
		option.rmempty = false;
		option.validate = (_id: string, text: string) =>
			text.length > 0 && text.length <= max && /^[\x20-\x7e]+$/.test(text)
				? true
				: _("Use 1–%s printable ASCII characters; spaces are significant.").format(String(max));
	}
}

export function addAuth(section: any): void {
	section.tab("auth", _("ONU authentication"));
	const id = L.uci.sections("fttr", "omci_auth")[0]?.[".name"] || "omci_auth_global";
	const nested = section.taboption(
		"auth",
		L.form.SectionValue,
		"_omci_auth",
		L.form.NamedSection,
		id,
		"omci_auth",
	).subsection;
	nested.addremove = false;
	nested.anonymous = false;
	authFields(nested);
}
