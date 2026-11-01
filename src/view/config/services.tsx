// SPDX-License-Identifier: Apache-2.0
import { dynamicChoices, field, grid, guardRemoval, preview, templateReference } from "./form";
import { list, serviceLabels, snapshot, wifiChoices } from "./model";
import { removeTemplate } from "./operations";
import { validateServiceList } from "./validation";
import { addWifi } from "./wifi";

export function addServices(section: any): void {
	section.tab("templates", _("Templates"));
	const templates = grid(section, "templates", "_templates", "template", _("Templates"), (s) => {
		s.description =
			_(
				"Create a template first, then add its SSIDs and networks in their tabs. Each editor changes one item. Confirm stages changes; Save & Apply applies the page configuration.",
			) +
			" " +
			_("Deleting an unused template also deletes its SSIDs and networks.");
		preview(s, "_name", _("Template"), (id) => String(L.uci.get("fttr", id, "name") || _("New template")));
		for (const [kind, title] of [
			["wifi", _("SSIDs")],
			["network", _("Networks")],
			["group", _("Groups")],
		])
			preview(s, `_${kind}_count`, title, (id) =>
				String(L.uci.sections("fttr", kind).filter((item) => item.template === id).length),
			);
		const name = field(s, L.form.Value, "name", _("Name"));
		name.modalonly = true;
		name.rmempty = false;
	});
	guardRemoval(templates, removeTemplate);
	addWifi(section);
	section.tab("networks", _("Networks"));
	grid(section, "networks", "_networks", "network", _("Networks"), (s) => {
		s.description = _("Networks bind VLAN services to wired ports and optional SSIDs within one template.");
		const template = templateReference(s);
		preview(s, "_name", _("Network"), (id) => String(L.uci.get("fttr", id, "name") || _("New network")));
		preview(s, "_vlan", _("VLAN"), (id) => String(L.uci.get("fttr", id, "vlan") || "0"));
		preview(s, "_services", _("WAN Service List (multi-select)"), (id) =>
			list(L.uci.get("fttr", id, "service_list")).join(", "),
		);
		preview(s, "_bindings", _("LAN / WLAN port bindings"), (id) =>
			[
				...list(L.uci.get("fttr", id, "port")).map((port) => port.toUpperCase()),
				...list(L.uci.get("fttr", id, "ssid")).map((wifi) => String(L.uci.get("fttr", wifi, "ssid") || wifi)),
			].join(", "),
		);
		const name = field(s, L.form.Value, "name", _("Name"));
		name.modalonly = true;
		name.rmempty = false;
		const services = field(s, (L.form as any).MultiValue, "service_list", _("WAN Service List (multi-select)"));
		services.modalonly = true;
		services.rmempty = false;
		services.validate = (_id: string, value: unknown) => validateServiceList(value);
		services.description = _(
			"Select at least one of INTERNET, OTHER, IPTV, and VOIP for each custom VLAN. TR069 is reserved for OMCI.",
		);
		for (const value of serviceLabels) services.value(value, value);
		for (const [key, title, datatype] of [
			["vlan", _("VLAN"), "range(0,4094)"],
			["priority", _("Priority"), "range(0,7)"],
		]) {
			const option = field(s, L.form.Value, key, title, datatype);
			option.default = "0";
			option.rmempty = false;
			option.modalonly = true;
		}
		const ssids = field(s, (L.form as any).MultiValue, "ssid", _("SSIDs"));
		ssids.modalonly = true;
		ssids.rmempty = true;
		ssids.placeholder = _("No SSIDs selected");
		ssids.description = _(
			"Optional for wired-only networks. Only SSIDs from the selected template are listed. Changing the template clears the SSID selection.",
		);
		// renderWidget is cloned into the single-item modal; resolve its sibling
		// template option there, rather than capturing the hidden grid's option.
		dynamicChoices(ssids, function (id) {
			const selected = this.section.getOption("template");
			return wifiChoices(snapshot(), String(selected?.formvalue(id) ?? L.uci.get("fttr", id, "template") ?? ""));
		});
		ssids.validate = function (id: string, value: unknown): boolean | string {
			const selected = this.section.getOption("template");
			const owner = String(selected.formvalue(id) ?? L.uci.get("fttr", id, "template") ?? "");
			const allowed = new Set(wifiChoices(snapshot(), owner).map(([key]) => key));
			return list(value).every((key) => allowed.has(key))
				? true
				: _("Select SSIDs belonging to this network's template.");
		};
		template.onchange = function (_event: Event, id: string, value: string): void {
			const widget = this.section.getOption("ssid").getUIElement(id);
			if (!widget) return;
			const choices = wifiChoices(snapshot(), value);
			widget.clearChoices(true);
			widget.addChoices(
				choices.map(([key]) => key),
				Object.fromEntries(choices),
			);
		};
		const ports = field(s, (L.form as any).MultiValue, "port", _("Ports"));
		ports.modalonly = true;
		for (let i = 1; i <= 4; i++) ports.value(`lan${i}`, `LAN${i}`);
	});
}
