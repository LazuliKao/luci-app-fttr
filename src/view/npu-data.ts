// SPDX-License-Identifier: Apache-2.0

/** Never route hardware u64 counters through a JavaScript Number. */
export function exactCounter(value: string | undefined, valid: boolean | undefined): string {
	return valid === true && value !== undefined && /^(0|[1-9][0-9]*)$/.test(value)
		? BigInt(value).toLocaleString()
		: "—";
}

export function maskText(mask: number, valid: boolean | undefined): string {
	return valid === true ? `0x${mask.toString(16).padStart(4, "0")} (${mask})` : "—";
}

export function directionMaskText(mask: number | undefined, valid: boolean | undefined): string {
	if (valid !== true || mask === undefined || mask < 0 || mask > 7) return "—";
	const labels: string[] = [];
	if (mask & 1) labels.push("WAN US");
	if (mask & 2) labels.push("WAN DS");
	if (mask & 4) labels.push("ONU bridge");
	return `0x${mask.toString(16)} (${labels.length ? labels.join(" + ") : "none"})`;
}
