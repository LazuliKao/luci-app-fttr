// SPDX-License-Identifier: Apache-2.0
import { list, snapshot } from "./model";

export function removeTemplate(id: string): void {
	const data = snapshot();
	if (data.group.some((group) => group.template === id)) throw new Error(_("Template is in use."));
	for (const wifi of data.wifi) if (wifi.template === id) removeWifi(wifi[".name"]);
	for (const row of [...data.network, ...data.wifi]) if (row.template === id) L.uci.remove("fttr", row[".name"]);
}

export function removeGroup(id: string): void {
	if (snapshot().device.some((device) => device.group === id))
		throw new Error(_("Group is used by devices. Reassign those devices before deleting it."));
}

export function removeWifi(id: string): void {
	for (const network of snapshot().network) {
		const refs = list(network.ssid);
		if (refs.includes(id)) {
			const remaining = refs.filter((ref) => ref !== id);
			if (remaining.length) L.uci.set("fttr", network[".name"], "ssid", remaining);
			else L.uci.unset("fttr", network[".name"], "ssid");
		}
	}
}

export function canMoveWifi(id: string, template: string): boolean {
	return !snapshot().network.some((network) => list(network.ssid).includes(id) && network.template !== template);
}
