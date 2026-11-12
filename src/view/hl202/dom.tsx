// SPDX-License-Identifier: Apache-2.0

export const text = (value: unknown): string =>
	value === null || value === undefined || value === "" ? "—" : String(value);

export const date = (value?: number): string => (value ? new Date(value * 1000).toLocaleString() : "—");

export function formatUptime(seconds?: number): string {
	if (seconds === undefined || !Number.isFinite(seconds) || seconds < 0) return "—";
	const days = Math.floor(seconds / 86400);
	const hours = Math.floor((seconds % 86400) / 3600);
	const minutes = Math.floor((seconds % 3600) / 60);
	const secs = seconds % 60;
	const parts: string[] = [];
	if (days > 0) parts.push(_("%d days").format(days));
	if (hours > 0 || days > 0) parts.push(_("%d hours").format(hours));
	if (minutes > 0 || hours > 0 || days > 0) parts.push(_("%d minutes").format(minutes));
	parts.push(_("%d seconds").format(secs));
	return `${parts.join(" ")} (${seconds} s)`;
}

export function renderBadge(
	type: "success" | "warning" | "danger" | "info" | "neutral",
	label: string,
	title?: string,
): HTMLElement {
	return (
		<span class={`hl202-badge hl202-badge-${type}`} title={title}>
			{label}
		</span>
	);
}
