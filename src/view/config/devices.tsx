// SPDX-License-Identifier: Apache-2.0

import { adaptersFromCapabilities, type Capabilities } from "../contracts/capabilities";
import type { FttrStatus } from "../contracts/status";
import { field, grid, guardRemoval, preview, reference, tabchoice, tabfield, tabreference } from "./form";
import { removeGroup } from "./operations";

interface ConnectedDevice {
	serial_number: string;
	model?: string;
	vendor?: string;
	state?: string;
	onu_id?: number;
}

function adapterFor(device?: ConnectedDevice, supported?: Set<string>): string {
	const vendor = device?.vendor || device?.serial_number.slice(0, 4);
	if (vendor === "HWTC" && (!supported || supported.has("hwtc"))) return "hwtc";
	if (device?.model?.startsWith("HL202") && (!supported || supported.has("hl202"))) return "hl202";
	if (
		(vendor === "STAR" || device?.model?.includes("SG631") || device?.serial_number.startsWith("STAR")) &&
		(!supported || supported.has("star"))
	) {
		return "star";
	}
	return "generic";
}

function selectionFor(
	device: ConnectedDevice | undefined,
	supported: {
		omci: Set<string>;
		bootstrap: Set<string>;
		provisioning: Set<string>;
	},
): { omci: string; bootstrap: string; provisioning: string } {
	const omci = adapterFor(device, supported.omci);
	if (omci === "hl202" && supported.provisioning.has("hl202-mqtt")) {
		return { omci, bootstrap: "none", provisioning: "hl202-mqtt" };
	}
	if (omci === "hwtc" && supported.bootstrap.has("manual-acs") && supported.provisioning.has("hwtc-hw")) {
		return { omci, bootstrap: "manual-acs", provisioning: "hwtc-hw" };
	}
	return { omci, bootstrap: "none", provisioning: "none" };
}

export function addDevices(
	section: any,
	connected: ConnectedDevice[],
	pinning?: FttrStatus["onu_pinning"],
	capabilities?: Capabilities,
): void {
	const bySerial = new Map(connected.map((device) => [device.serial_number, device]));
	const supportedAdapters = {
		omci: new Set(adaptersFromCapabilities(capabilities, "omci").map(([key]) => key)),
		bootstrap: new Set(adaptersFromCapabilities(capabilities, "bootstrap").map(([key]) => key)),
		provisioning: new Set(adaptersFromCapabilities(capabilities, "provisioning").map(([key]) => key)),
	};
	const omciChoices = adaptersFromCapabilities(capabilities, "omci");
	const bootstrapChoices = adaptersFromCapabilities(capabilities, "bootstrap");
	const provisioningChoices = adaptersFromCapabilities(capabilities, "provisioning");
	const label = (serial: string): string => {
		const device = bySerial.get(serial);
		const configured = L.uci.sections("fttr", "device").find((item) => item.optical_sn === serial);
		const model = device?.model || String(configured?.model || _("Unknown model"));
		return `${model} · ${serial} · ${device?.state === "o5_operation" ? _("Connected") : _("Offline")}${device?.onu_id != null ? ` · ONU ${device.onu_id}` : ""}`;
	};
	section.tab("devices", _("Devices & groups"));
	const groups = grid(section, "devices", "_groups", "group", _("Groups"), (s) => {
		preview(s, "_name", _("Group"), (id) => String(L.uci.get("fttr", id, "name") || id));
		field(s, L.form.Value, "name", _("Name")).modalonly = true;
		reference(s, "template", _("Template"), "template").modalonly = true;
	});
	guardRemoval(groups, removeGroup);
	grid(section, "devices", "_devices", "device", _("Devices"), (s) => {
		preview(s, "_device", _("Device"), (id) => {
			const serial = String(L.uci.get("fttr", id, "optical_sn") || "");
			return serial ? label(serial) : _("New device");
		});
		preview(s, "_active_pin", _("Active allocation"), (id) => {
			const sn = String(L.uci.get("fttr", id, "optical_sn") || "");
			const active = pinning?.active[sn.toUpperCase()];
			const actual = connected.find((device) => device.serial_number.toUpperCase() === sn.toUpperCase())?.onu_id;
			const desired = L.uci.get("fttr", id, "onu_id");
			const pending = (desired == null || desired === "" ? undefined : Number(desired)) !== active;
			return [
				actual != null ? `fttr${actual + 1}` : _("Not registered"),
				active != null ? `${_("Reserved")}: fttr${active + 1}` : _("Automatic allocation"),
				pending ? _("Pending restart") : "",
			]
				.filter(Boolean)
				.join(" · ");
		});

		s.tab("general", _("General Settings"));
		s.tab("cwmp", _("CWMP Settings"));
		s.tab("advanced", _("Advanced Settings"));

		const serial = tabfield(s, "general", L.form.ListValue, "optical_sn", _("Connected device"));
		serial.modalonly = true;
		serial.rmempty = false;
		serial.description = _(
			"Lists supported devices registered on the optical link, including devices that have not sent an ACS Inform. Devices already configured are omitted when adding a new device.",
		);
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
				if (
					device.state === "o5_operation" &&
					adapterFor(device, supportedAdapters.omci) &&
					!used.has(device.serial_number)
				)
					this.value(device.serial_number, label(device.serial_number));
			if (current && !this.keylist.includes(current)) this.value(current, label(current));
			const selected = configured || current || this.keylist[0] || "";
			return render.call(this, id, index, selected);
		};
		const omciAdapter = tabchoice(s, "general", "omci_adapter", _("OMCI adapter"), omciChoices);
		const bootstrapAdapter = tabchoice(s, "general", "bootstrap_adapter", _("ACS bootstrap"), bootstrapChoices);
		const provisioningAdapter = tabchoice(
			s,
			"general",
			"provisioning_adapter",
			_("Business provisioning"),
			provisioningChoices,
		);
		for (const option of [omciAdapter, bootstrapAdapter, provisioningAdapter]) {
			option.modalonly = true;
			option.rmempty = false;
			option.retain = true;
		}
		omciAdapter.default = "generic";
		bootstrapAdapter.default = "none";
		provisioningAdapter.default = "none";
		omciAdapter.description = _("Select the OMCI profile used to read and configure this device.");
		bootstrapAdapter.description = _(
			"Select how ACS settings are established. Manual ACS, OMCI ACS and HL202 MQTT ACS are independent of business provisioning.",
		);
		provisioningAdapter.description = _(
			"Select the transport and CWMP contract for business configuration. Unsupported candidates remain unavailable and are not selected automatically.",
		);
		const setRecommendations = (id: string, value: string): void => {
			const selected = selectionFor(bySerial.get(value), supportedAdapters);
			omciAdapter.getUIElement(id)?.setValue(selected.omci);
			bootstrapAdapter.getUIElement(id)?.setValue(selected.bootstrap);
			provisioningAdapter.getUIElement(id)?.setValue(selected.provisioning);
		};
		serial.onchange = (_event: Event, id: string, value: string): void => setRecommendations(id, value);
		serial.validate = (id: string, value: string): boolean | string => {
			if (!value) return _("Select device.");
			return L.uci.sections("fttr", "device").some((item) => item[".name"] !== id && item.optical_sn === value)
				? _("Device already configured.")
				: true;
		};
		serial.write = (id: string, value: string): void => {
			const previous = String(L.uci.get("fttr", id, "optical_sn") || "");
			L.uci.set("fttr", id, "optical_sn", value);
			const selection = selectionFor(bySerial.get(value), supportedAdapters);
			const changed = previous !== value;
			for (const [option, recommended] of [
				["omci_adapter", selection.omci],
				["bootstrap_adapter", selection.bootstrap],
				["provisioning_adapter", selection.provisioning],
			] as const) {
				if (changed || !L.uci.get("fttr", id, option)) L.uci.set("fttr", id, option, recommended);
			}
		};
		for (const option of [omciAdapter, bootstrapAdapter, provisioningAdapter]) {
			const renderOption = option.renderWidget;
			option.renderWidget = function (id: string, index: number, configured: string | null): any {
				const selected = configured || String(L.uci.get("fttr", id, option.option) || "");
				if (selected && !this.keylist.includes(selected))
					this.value(selected, `${selected} (${_("unavailable")})`);
				return renderOption.call(this, id, index, selected || option.default);
			};
		}
		const validateSelection = (id: string): boolean | string => {
			const current = (option: any): string =>
				String(option.formvalue(id) ?? L.uci.get("fttr", id, option.option) ?? "");
			const selectedOmci = current(omciAdapter);
			const selectedBootstrap = current(bootstrapAdapter);
			const selectedProvisioning = current(provisioningAdapter);
			if (!supportedAdapters.omci.has(selectedOmci))
				return _("Selected OMCI adapter is unavailable in this build.");
			if (!supportedAdapters.bootstrap.has(selectedBootstrap))
				return _("Selected ACS bootstrap is unavailable in this build.");
			if (!supportedAdapters.provisioning.has(selectedProvisioning))
				return _("Selected business provisioning option is unavailable in this build.");
			const provisioningUsesAcs = selectedProvisioning !== "none" && selectedProvisioning !== "hl202-mqtt";
			return (selectedBootstrap === "none") === !provisioningUsesAcs
				? true
				: _(
						"ACS provisioning requires an ACS bootstrap selection; MQTT or disabled provisioning requires none.",
					);
		};
		bootstrapAdapter.validate = validateSelection;
		provisioningAdapter.validate = validateSelection;
		tabreference(s, "general", "group", _("Group"), "group").modalonly = true;
		const pin = tabchoice(
			s,
			"general",
			"onu_id",
			_("Fixed interface"),
			[
				["", _("Automatic allocation")],
				...Array.from({ length: 16 }, (_, id): [string, string] => [
					String(id),
					`fttr${id + 1} · ONU-ID ${id}`,
				]),
			],
			true,
		);
		pin.modalonly = true;
		pin.description = _(
			"Reserves this interface by optical serial number, even while offline. Changes take effect after restarting FTTR; Reload does not move registered devices.",
		);
		const pinCurrent: InstanceType<typeof L.form.Button> = s.taboption(
			"general",
			L.form.Button,
			"_pin_current",
			_("Use current interface"),
		);
		pinCurrent.modalonly = true;
		pinCurrent.inputtitle = _("Pin current interface");
		pinCurrent.inputstyle = "apply";
		pinCurrent.onclick = (_event, id) => {
			const selected = String(serial.formvalue(id) ?? L.uci.get("fttr", id, "optical_sn") ?? "");
			const current = connected.find((device) => device.serial_number.toUpperCase() === selected.toUpperCase());
			if (current?.state !== "o5_operation" || current.onu_id == null) {
				L.ui.addNotification(null, <p>{_("Select a registered O5 device first.")}</p>, "warning");
				return;
			}
			pin.getUIElement(id)?.setValue(String(current.onu_id));
		};
		pin.validate = (id: string, value: string): boolean | string => {
			if (!value) return true;
			if (!/^(?:[0-9]|1[0-5])$/.test(value)) return _("Select an interface from fttr1 to fttr16.");
			return L.uci.sections("fttr", "device").some((item) => {
				if (item[".name"] === id) return false;
				const other = pin.formvalue(item[".name"]) ?? item.onu_id;
				return other != null && String(other) === value;
			})
				? _("Interface already reserved by another device.")
				: true;
		};
		const connectionRequest = tabfield(
			s,
			"cwmp",
			L.form.Flag,
			"connection_request",
			_("Supports Connection Request"),
		);
		connectionRequest.modalonly = true;
		connectionRequest.default = "1";
		connectionRequest.rmempty = false;
		connectionRequest.description = _(
			"Independent per device; enabled by default for all adapters. Enabled: on-demand sessions with periodic Inform enabled and an interval of at most 12 hours (backend default: 43200 seconds). Disabled: manually set PeriodicInformEnable to true and PeriodicInformInterval to at most 180 seconds; no interval is written automatically. Requires reachable CWMP, verified standard parameters, HTTP Digest support, a prior Inform with a ConnectionRequestURL and valid CPE credentials. Firmware support is not guaranteed. Acceptance is not proof of a session or completed RPCs.",
		);
		const requestDefaults = tabfield(
			s,
			"cwmp",
			L.form.Flag,
			"connection_request_defaults",
			_("Use backend Connection Request defaults"),
		);
		requestDefaults.modalonly = true;
		requestDefaults.default = "1";
		requestDefaults.rmempty = false;
		requestDefaults.retain = true;
		requestDefaults.depends("connection_request", "1");
		requestDefaults.cfgvalue = (id: string): string => {
			const configured = L.uci.get("fttr", id, "connection_request_defaults");
			if (configured != null) return String(configured);
			return L.uci.get("fttr", id, "connection_request_username") &&
				L.uci.get("fttr", id, "connection_request_password")
				? "0"
				: "1";
		};
		requestDefaults.description = _(
			"Uses a backend-reserved profile; factory credentials are not yet verified. Disable to enter this CPE's existing credentials and port. Saved custom values are retained while hidden.",
		);
		const requestUsername = tabfield(
			s,
			"cwmp",
			L.form.Value,
			"connection_request_username",
			_("CPE Connection Request username"),
		);
		requestUsername.modalonly = true;
		requestUsername.optional = true;
		requestUsername.rmempty = true;
		requestUsername.retain = true;
		requestUsername.depends({ connection_request: "1", connection_request_defaults: "0" });
		requestUsername.description = _(
			"Enter this CPE's existing Connection Request credentials, not the ACS inbound HTTP Basic credentials. No custom credential defaults are assumed.",
		);
		const requestPassword = tabfield(
			s,
			"cwmp",
			L.form.Value,
			"connection_request_password",
			_("CPE Connection Request password"),
		);
		requestPassword.modalonly = true;
		requestPassword.password = true;
		requestPassword.optional = true;
		requestPassword.rmempty = true;
		requestPassword.retain = true;
		requestPassword.depends({ connection_request: "1", connection_request_defaults: "0" });
		requestPassword.description = _(
			"Saved custom values are retained when Connection Requests are disabled or backend defaults are selected. Leave these fields unchanged to preserve their saved values.",
		);
		const requestPort = tabfield(
			s,
			"cwmp",
			L.form.Value,
			"connection_request_port",
			_("CPE Connection Request port"),
			"port",
		);
		requestPort.modalonly = true;
		requestPort.default = "7547";
		requestPort.rmempty = false;
		requestPort.retain = true;
		requestPort.depends({ connection_request: "1", connection_request_defaults: "0" });
		const cleanup = tabchoice(s, "advanced", "wifi_cleanup", _("Unconfigured WLANs"), [
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
