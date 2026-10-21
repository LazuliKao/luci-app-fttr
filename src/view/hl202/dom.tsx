// SPDX-License-Identifier: Apache-2.0

export const STATE_I18N: Record<
	string,
	{ label: string; type: "success" | "warning" | "danger" | "info" | "neutral" }
> = {
	ready: { label: _("Ready"), type: "success" },
	online: { label: _("Online"), type: "success" },
	success: { label: _("Success"), type: "success" },
	offline: { label: _("Offline"), type: "danger" },
	error: { label: _("Error"), type: "danger" },
	failed: { label: _("Failed"), type: "danger" },
	timeout: { label: _("Timeout"), type: "warning" },
	pending: { label: _("Pending"), type: "warning" },
	running: { label: _("Running"), type: "info" },
	unavailable: { label: _("Unavailable"), type: "neutral" },
	disabled: { label: _("Disabled"), type: "neutral" },
	enabled: { label: _("Enabled"), type: "success" },
};

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
	if (days > 0) parts.push(_("%d days").replace("%d", String(days)));
	if (hours > 0 || days > 0) parts.push(_("%d hours").replace("%d", String(hours)));
	if (minutes > 0 || hours > 0 || days > 0) parts.push(_("%d minutes").replace("%d", String(minutes)));
	parts.push(_("%d seconds").replace("%d", String(secs)));
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
