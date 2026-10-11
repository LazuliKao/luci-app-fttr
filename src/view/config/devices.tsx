// SPDX-License-Identifier: Apache-2.0
import { choice, field, grid, preview, reference } from "./form";

interface ConnectedDevice {
	serial_number: string;
	model?: string;
	vendor?: string;
	state?: string;
	onu_id?: number;
}

function adapterFor(device?: ConnectedDevice): string | undefined {
	if (device?.model?.startsWith("HL202")) return "hl202";
	if (device?.model?.startsWith("K155")) return "k155";
	return undefined;
}

export function addDevices(section: any, connected: ConnectedDevice[]): void {
	const bySerial = new Map(connected.map((device) => [device.serial_number, device]));
	const label = (serial: string): string => {
		const device = bySerial.get(serial);
		const configured = L.uci.sections("fttr", "device").find((item) => item.optical_sn === serial);
		const model = device?.model || String(configured?.adapter || _("Unknown model"));
		return `${model} · ${serial} · ${device?.state === "O5Operation" ? _("Connected") : _("Offline")}${device?.onu_id != null ? ` · ONU ${device.onu_id}` : ""}`;
	};
	section.tab("devices", _("Devices & groups"));
	grid(section, "devices", "_groups", "group", _("Groups"), (s) => {
		preview(s, "_name", _("Group"), (id) => String(L.uci.get("fttr", id, "name") || id));
		field(s, L.form.Value, "name", _("Name")).modalonly = true;
		reference(s, "template", _("Template"), "template").modalonly = true;
	});
	grid(section, "devices", "_devices", "device", _("Devices"), (s) => {
		preview(s, "_device", _("Device"), (id) => {
			const serial = String(L.uci.get("fttr", id, "optical_sn") || "");
			return serial ? label(serial) : _("New device");
		});
		const serial = field(s, L.form.ListValue, "optical_sn", _("Connected device"));
		serial.modalonly = true;
		serial.rmempty = false;
		const render = serial.renderWidget;
		serial.renderWidget = function (id: string, index: number, configured: string | null): any {
			this.keylist = [];
			this.vallist = [];
			const current = String(L.uci.get("fttr", id, "optical_sn") || "");
			const used = new Set(
				L.uci
					.sections("fttr", "device")
					.filter((item) => item[".name"] !== id)
					.map((item) => item.optical_sn),
			);
			for (const device of connected)
				if (device.state === "O5Operation" && adapterFor(device) && !used.has(device.serial_number))
					this.value(device.serial_number, label(device.serial_number));
			if (current && !this.keylist.includes(current)) this.value(current, label(current));
			const selected = configured || current || this.keylist[0] || "";
			return render.call(this, id, index, selected);
		};
		serial.validate = (id: string, value: string): boolean | string => {
			if (!value) return _("Select device.");
			return L.uci.sections("fttr", "device").some((item) => item[".name"] !== id && item.optical_sn === value)
				? _("Device already configured.")
				: true;
		};
		serial.write = (id: string, value: string): void => {
			L.uci.set("fttr", id, "optical_sn", value);
			const adapter = adapterFor(bySerial.get(value));
			if (adapter) L.uci.set("fttr", id, "adapter", adapter);
		};
		reference(s, "group", _("Group"), "group").modalonly = true;
		const cleanup = choice(s, "wifi_cleanup", _("Unconfigured WLANs"), [
			["disable", _("Disable (keep the WLAN object)")],
			["preserve", _("Leave unchanged")],
			["delete", _("Delete the WLAN object")],
		]);
		cleanup.modalonly = true;
		cleanup.default = "disable";
		cleanup.description = _(
			"By default, extra WLANs are disabled and retained. Deleting objects is destructive and should only be selected deliberately.",
		);
	});
}
