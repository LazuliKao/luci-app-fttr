import type { PlatformInfoReply } from "./api";

export function platformOnu(platform: PlatformInfoReply, id: number) {
	return platform.onus.find((onu) => onu.onu_id === id);
}

export function platformOnuLabel(platform: PlatformInfoReply, id: number): string {
	const onu = platformOnu(platform, id);
	return onu?.interface ? `${onu.interface} · ONU-ID ${id}` : `ONU-ID ${id}`;
}
