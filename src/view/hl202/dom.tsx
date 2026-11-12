// SPDX-License-Identifier: Apache-2.0

import { formatDate, text } from "../components/formatters";

export { formatDate as date, text };

export type Hl202BadgeTone = "success" | "warning" | "danger" | "info" | "neutral";

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

export function renderBadge(type: Hl202BadgeTone, label: string, title?: string): HTMLElement {
	return (
		<span class={`hl202-badge hl202-badge-${type}`} title={title}>
			{label}
		</span>
	);
}

/** Update an existing badge node without replacing it (keeps focus/listeners). */
export function setHl202Badge(node: HTMLElement, type: Hl202BadgeTone, label: string): void {
	node.className = `hl202-badge hl202-badge-${type}`;
	node.textContent = label;
}
