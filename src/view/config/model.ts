// SPDX-License-Identifier: Apache-2.0

export const serviceLabels = ["INTERNET", "OTHER", "IPTV", "VOIP"];
export const configKinds = ["template", "wifi", "network", "group", "device"] as const;
export type ConfigKind = (typeof configKinds)[number];
export interface ConfigRow {
	".name": string;
	[key: string]: unknown;
}
export type ConfigSnapshot = Record<ConfigKind, ConfigRow[]>;

export function list(value: unknown): string[] {
	return Array.isArray(value)
		? value.map(String)
		: String(value ?? "")
				.split(/\s+/)
				.filter(Boolean);
}

export function snapshot(): ConfigSnapshot {
	const read = (kind: ConfigKind): ConfigRow[] =>
		L.uci
			.sections("fttr", kind)
			.map((row) =>
				Object.fromEntries(
					Object.entries(row).map(([key, value]) => [key, Array.isArray(value) ? [...value] : value]),
				),
			) as ConfigRow[];
	return {
		template: read("template"),
		wifi: read("wifi"),
		network: read("network"),
		group: read("group"),
		device: read("device"),
	};
}

export function label(row: ConfigRow): string {
	return String(row.name || row.ssid || row.optical_sn || row[".name"]);
}

export function wifiChoices(data: ConfigSnapshot, template: string): Array<[string, string]> {
	return data.wifi.filter((wifi) => wifi.template === template).map((wifi) => [wifi[".name"], label(wifi)]);
}
