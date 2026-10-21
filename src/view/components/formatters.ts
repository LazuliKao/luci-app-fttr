// SPDX-License-Identifier: Apache-2.0

export const text = (value: unknown): string =>
	value === null || value === undefined || value === "" ? "—" : String(value);

/**
 * Format optical power in dBm.
 */
export function formatPower(power: number | null | undefined, precision = 3): string {
	if (power == null || !Number.isFinite(power)) return "—";
	return `${power.toFixed(precision)} dBm`;
}

/**
 * Human-readable duration (e.g. "2d 2h 11m 40s").
 */
export function formatUptime(seconds: number | null | undefined): string {
	if (seconds == null || !Number.isFinite(seconds) || seconds < 0) return "—";
	const total = Math.floor(seconds);
	const d = Math.floor(total / 86400);
	const h = Math.floor((total % 86400) / 3600);
	const m = Math.floor((total % 3600) / 60);
	const s = total % 60;
	const parts: string[] = [];
	if (d > 0) parts.push(`${d}d`);
	if (h > 0 || d > 0) parts.push(`${h}h`);
	if (m > 0 || h > 0 || d > 0) parts.push(`${m}m`);
	parts.push(`${s}s`);
	return parts.join(" ");
}

/**
 * Relative age string (e.g. "4 seconds ago", "2 minutes ago").
 */
export function formatAge(seconds: number | null | undefined): string | null {
	if (seconds == null || !Number.isFinite(seconds) || seconds < 0) return null;
	const sec = Math.floor(seconds);
	if (sec < 60) {
		return (sec === 1 ? _("%d second ago") : _("%d seconds ago")).replace("%d", String(sec));
	}
	const mins = Math.floor(sec / 60);
	if (mins < 60) {
		return (mins === 1 ? _("%d minute ago") : _("%d minutes ago")).replace("%d", String(mins));
	}
	const hours = Math.floor(sec / 3600);
	if (hours < 24) {
		return (hours === 1 ? _("%d hour ago") : _("%d hours ago")).replace("%d", String(hours));
	}
	const days = Math.floor(sec / 86400);
	return (days === 1 ? _("%d day ago") : _("%d days ago")).replace("%d", String(days));
}

/**
 * Extract primary firmware version and preserve all software images for hover tooltip.
 */
export function formatFirmware(raw: string | undefined): { display: string; full?: string } {
	if (!raw) return { display: "—" };
	const match = raw.match(/image\s*\d+:\s*([^;,\s]+)/i);
	if (match?.[1]) {
		return { display: match[1], full: raw.replace(/;\s*/g, "\n") };
	}
	return { display: raw };
}

/**
 * Format bytes into human-readable unit (B, KiB, MiB, GiB, TiB).
 */
export function formatBytes(value: number | undefined): string {
	if (value === undefined || !Number.isFinite(value) || value < 0) return "—";
	if (value < 1024) return `${value} B`;
	const units = ["KiB", "MiB", "GiB", "TiB"];
	let amount = value / 1024;
	let unit = 0;
	while (amount >= 1024 && unit < units.length - 1) {
		amount /= 1024;
		unit++;
	}
	return `${amount.toFixed(1)} ${units[unit]}`;
}

/**
 * Format packet count.
 */
export function formatPackets(value: number | undefined): string {
	if (value === undefined || !Number.isFinite(value) || value < 0) return "—";
	if (value < 1000) return `${value} Pkts.`;
	return `${(value / 1000).toFixed(2)} KPkts.`;
}

/**
 * Format link speed in MbE or GbE.
 */
export function formatLinkSpeed(speed: number | undefined): string {
	if (speed === undefined || !Number.isFinite(speed) || speed <= 0) return _("Unknown");
	if (speed >= 1000) return `${speed / 1000} GbE`;
	return `${speed} MbE`;
}
