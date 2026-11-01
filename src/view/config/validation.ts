// SPDX-License-Identifier: Apache-2.0
import { type ConfigKind, type ConfigRow, type ConfigSnapshot, label, list, serviceLabels } from "./model";

export interface ConfigIssue {
	kind: ConfigKind;
	sectionId: string;
	field: string;
	message: string;
}

export function validateServiceList(value: unknown): true | string {
	const services = list(value);
	if (!services.length) return _("Select at least one WAN Service List label.");
	return services.every((service) => serviceLabels.includes(service))
		? true
		: _("WAN Service List may only contain INTERNET, OTHER, IPTV, and VOIP.");
}

// Data-only validation: no reads or writes to the live UCI editing state.
export function validateConfig(data: ConfigSnapshot): ConfigIssue[] {
	const issues: ConfigIssue[] = [];
	const templates = new Set(data.template.map((row) => row[".name"]));
	const groups = new Set(data.group.map((row) => row[".name"]));
	const wifiById = new Map(data.wifi.map((row) => [row[".name"], row]));
	const add = (kind: ConfigKind, row: ConfigRow, field: string, message: string): void => {
		issues.push({ kind, sectionId: row[".name"], field, message });
	};
	for (const row of data.template)
		if (!String(row.name || "").trim()) add("template", row, "name", _("Name is required."));
	for (const kind of ["wifi", "network", "group"] as const)
		for (const row of data[kind])
			if (!templates.has(String(row.template || "")))
				add(kind, row, "template", _("Select an existing template."));
	for (const row of data.wifi) {
		const bytes = new TextEncoder().encode(String(row.ssid || "")).length;
		if (bytes < 1 || bytes > 32) add("wifi", row, "ssid", _("SSID must be 1–32 bytes."));
		if (row.radio !== "2g" && row.radio !== "5g") add("wifi", row, "radio", _("Select a wireless band."));
		if (["wpa2-psk", "wpa3-sae", "wpa2-psk/wpa3-sae", "wpa-psk/wpa2-psk"].includes(String(row.security))) {
			const length = new TextEncoder().encode(String(row.key || "")).length;
			if (length < 8 || length > 63) add("wifi", row, "key", _("Password must be 8–63 bytes."));
		}
	}
	for (const row of data.network) {
		if (!String(row.name || "").trim()) add("network", row, "name", _("Name is required."));
		const services = validateServiceList(row.service_list);
		if (services !== true) add("network", row, "service_list", services);
		for (const [field, max] of [
			["vlan", 4094],
			["priority", 7],
		] as const) {
			const value = String(row[field] ?? "0");
			if (!/^\d+$/.test(value) || Number(value) > max)
				add("network", row, field, _("Value is outside the allowed range."));
		}
		for (const id of list(row.ssid)) {
			const wifi = wifiById.get(id);
			if (!wifi || wifi.template !== row.template)
				add("network", row, "ssid", _("Select SSIDs belonging to this network's template."));
		}
	}
	for (const row of data.device)
		if (!groups.has(String(row.group || ""))) add("device", row, "group", _("Select an existing group."));
	return issues;
}

export function formatIssues(data: ConfigSnapshot, issues: ConfigIssue[]): string {
	return issues
		.map((issue) => {
			const row = data[issue.kind].find((item) => item[".name"] === issue.sectionId);
			const template = data.template.find((item) => item[".name"] === row?.template);
			const path = [template && label(template), row ? label(row) : issue.sectionId].filter(Boolean).join(" / ");
			return `${path} [${issue.sectionId}.${issue.field}]: ${issue.message}`;
		})
		.join("\n");
}
