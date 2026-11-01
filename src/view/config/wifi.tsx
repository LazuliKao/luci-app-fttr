// SPDX-License-Identifier: Apache-2.0
import { choice, field, grid, guardRemoval, preview, templateReference } from "./form";
import { canMoveWifi, removeWifi } from "./operations";

export function addWifi(section: any): void {
	section.tab("wifi", _("SSIDs"));
	const wifi = grid(section, "wifi", "_wifi", "wifi", _("SSIDs"), (s) => {
		s.description = _("Create SSIDs here before selecting them in a network. Every SSID belongs to one template.");
		const template = templateReference(s);
		const validateTemplate = template.validate;
		template.validate = function (id: string, value: string): boolean | string {
			const valid = validateTemplate.call(this, id, value);
			if (valid !== true) return valid;
			return canMoveWifi(id, value)
				? true
				: _("This SSID is bound to a network. Remove its network bindings before changing the template.");
		};
		preview(s, "_ssid", _("SSID"), (id) => String(L.uci.get("fttr", id, "ssid") || id));
		preview(s, "_radio", _("Band"), (id) => (L.uci.get("fttr", id, "radio") === "2g" ? "2.4 GHz" : "5 GHz"));
		preview(s, "_security", _("Security"), (id) => {
			const security = String(L.uci.get("fttr", id, "security") || "");
			return security === "none" ? _("None (Open)") : security || _("Keep current key");
		});
		const ssid = field(s, L.form.Value, "ssid", _("SSID"));
		ssid.modalonly = true;
		ssid.rmempty = false;
		ssid.validate = (_id: string, value: string) =>
			new TextEncoder().encode(value).length >= 1 && new TextEncoder().encode(value).length <= 32
				? true
				: _("SSID must be 1–32 bytes.");
		const radio = choice(s, "radio", _("Band"), [
			["2g", "2.4 GHz"],
			["5g", "5 GHz"],
		]);
		radio.modalonly = true;
		radio.default = "2g";
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
	guardRemoval(wifi, removeWifi);
}
