// SPDX-License-Identifier: Apache-2.0
import { choice, field, preview, templateGrid } from "./form";
export function addTemplateWifi(section: any, template: string): void {
	const wifi = templateGrid(section, "wifi", "_wifi", "wifi", _("SSIDs"), template, (s) => {
		preview(s, "_ssid", _("SSID"), (id) => String(L.uci.get("fttr", id, "ssid") || id));
		const ssid = field(s, L.form.Value, "ssid", _("SSID"));
		ssid.modalonly = true;
		ssid.rmempty = false;
		ssid.validate = (_id: string, value: string) =>
			new TextEncoder().encode(value).length >= 1 && new TextEncoder().encode(value).length <= 32
				? true
				: _("SSID must be 1–32 bytes.");
		choice(s, "radio", _("Band"), [
			["2g", "2.4 GHz"],
			["5g", "5 GHz"],
		]).modalonly = true;
		const security = choice(
			s,
			"security",
			_("Security"),
			[
				["", _("Keep current key")],
				["wpa2-psk", "WPA2-PSK"],
				["wpa3-sae", "WPA3-SAE"],
				["wpa2-psk/wpa3-sae", "WPA2-PSK / WPA3-SAE"],
				["wpa-psk/wpa2-psk", "WPA-PSK / WPA2-PSK"],
				["none", _("None (Open)")],
			],
			true,
		);
		security.modalonly = true;
		const key = field(s, L.form.Value, "key", _("Password"));
		key.password = true;
		key.modalonly = true;
		key.depends("security", "wpa2-psk");
		key.depends("security", "wpa3-sae");
		key.depends("security", "wpa2-psk/wpa3-sae");
		key.depends("security", "wpa-psk/wpa2-psk");
		key.rmempty = false;
		key.validate = (_id: string, value: string) => {
			const length = new TextEncoder().encode(value).length;
			return length >= 8 && length <= 63 ? true : _("Password must be 8–63 bytes.");
		};
	});
	const remove = wifi.handleRemove;
	wifi.handleRemove = function (id: string, event: Event): any {
		for (const network of L.uci.sections("fttr", "network")) {
			const refs = network.ssid == null ? [] : Array.isArray(network.ssid) ? network.ssid : [network.ssid];
			if (refs.includes(id))
				L.uci.set("fttr", network[".name"], "ssid", refs.filter((ref) => ref !== id).map(String));
		}
		return remove.call(this, id, event);
	};
}
