// SPDX-License-Identifier: Apache-2.0
import { choice, field, tabchoice, tabfield } from "./form";

export function authFields(section: LuCI.form.AbstractSection, device = false): void {
	const value = <T extends LuCI.form.AbstractValue>(
		type: LuCI.form.ClassConstructor<T>,
		key: string,
		label: string,
	): T => (device ? tabfield(section, "auth", type, key, label) : field(section, type, key, label));
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
		mode.write = (id, text) => {
			L.uci.set("fttr", id, "auth_mode", text);
			L.uci.set("fttr", id, "schema_version", "1");
		};
	}
	for (const [key, label, max] of [
		["auth_loid", _("Expected LOID"), 24],
		["auth_password", _("Expected password"), 12],
	] as const) {
		const option = value(L.form.Value, key, label);
		option.depends("auth_mode", "loid_password");
		option.password = key === "auth_password";
		option.rmempty = false;
		option.validate = (_id, text) =>
			typeof text === "string" && text.length > 0 && text.length <= max && /^[\x20-\x7e]+$/.test(text)
				? true
				: _("Use 1–%s printable ASCII characters; spaces are significant.").format(String(max));
	}
}

export function addAuth(section: LuCI.form.AbstractSection): void {
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
