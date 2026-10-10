// SPDX-License-Identifier: Apache-2.0

import { grid, preview, reference } from "./form";

export function addBindings(section: any): void {
	section.tab("bindings", _("Port bindings"));
	grid(section, "bindings", "_bindings", "port_binding", _("LAN / WLAN port bindings"), (s) => {
		preview(
			s,
			"_binding",
			_("Binding"),
			(id) =>
				`${String(L.uci.get("fttr", id, "device") || "")} · ${String(L.uci.get("fttr", id, "device_service") || "")}`,
		);
		for (const [name, title, kind] of [
			["device", _("Device"), "device"],
			["device_service", _("WAN service"), "device_service"],
		] as Array<[string, string, string]>) {
			const option = reference(s, name, title, kind);
			option.modalonly = true;
		}
		const interfaces = s.option(L.form.DynamicList, "interface", _("CWMP interface references"));
		interfaces.modalonly = true;
		interfaces.rmempty = false;
		interfaces.placeholder = "InternetGatewayDevice.LANDevice.1.WLANConfiguration.1";
		interfaces.validate = (_id: string, value: string) =>
			value.startsWith("InternetGatewayDevice.LANDevice.1.") && !value.endsWith(".") && !value.includes(",")
				? true
				: _("Enter a complete LANDevice.1 interface reference, without trailing dot or comma.");
	});
}
