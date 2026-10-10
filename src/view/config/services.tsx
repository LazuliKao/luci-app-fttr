// SPDX-License-Identifier: Apache-2.0
import { choice, field, grid, preview, templateGrid } from "./form";
import { addTemplateWifi } from "./wifi";
export function addServices(section: any): void {
	section.tab("templates", _("Templates"));
	const templates = grid(section, "templates", "_templates", "template", _("Templates"), (s) => {
		preview(s, "_name", _("Template"), (id) => String(L.uci.get("fttr", id, "name") || _("New template")));
		const name = field(s, L.form.Value, "name", _("Name"));
		name.modalonly = true;
		name.rmempty = false;
	});
	const remove = templates.handleRemove;
	templates.handleRemove = function (id: string, event: Event): any {
		if (L.uci.sections("fttr", "group").some((group) => group.template === id)) {
			L.ui.addNotification(null, <p>{_("Template is in use.")}</p>, "error");
			return Promise.resolve();
		}
		for (const kind of ["network", "wifi"])
			for (const child of L.uci.sections("fttr", kind))
				if (child.template === id) L.uci.remove("fttr", child[".name"]);
		return remove.call(this, id, event);
	};
	templates.addModalOptions = (modal: any, template: string) => {
		modal.tab("general", _("General"));
		modal.getOption("name").tab = "general";
		modal.tab("wifi", _("SSIDs"));
		modal.tab("networks", _("Networks"));
		addTemplateWifi(modal, template);
		templateGrid(modal, "networks", "_networks", "network", _("Networks"), template, (s) => {
			preview(
				s,
				"_name",
				_("Network"),
				(id) =>
					`${String(L.uci.get("fttr", id, "name") || _("New network"))} · VLAN ${String(L.uci.get("fttr", id, "vlan") || "0")}`,
			);
			const name = field(s, L.form.Value, "name", _("Name"));
			name.modalonly = true;
			name.rmempty = false;
			choice(s, "type", _("Type"), [
				["internet", "INTERNET"],
				["iptv", "IPTV"],
			]).modalonly = true;
			for (const [key, title, datatype] of [
				["vlan", _("VLAN"), "range(0,4094)"],
				["priority", _("Priority"), "range(0,7)"],
			]) {
				const o = field(s, L.form.Value, key, title, datatype);
				o.default = "0";
				o.rmempty = false;
				o.modalonly = true;
			}
			const ssids = field(s, (L.form as any).MultiValue, "ssid", _("SSIDs"));
			ssids.modalonly = true;
			for (const wifi of L.uci.sections("fttr", "wifi"))
				if (wifi.template === template) ssids.value(wifi[".name"], String(wifi.ssid || _("SSID")));
			const ports = field(s, (L.form as any).MultiValue, "port", _("Ports"));
			ports.modalonly = true;
			for (let i = 1; i <= 4; i++) ports.value(`lan${i}`, `LAN${i}`);
		});
	};
}
