// SPDX-License-Identifier: Apache-2.0

export const STATE_I18N: Record<
	string,
	{ label: string; type: "success" | "warning" | "danger" | "info" | "neutral" }
> = {
	ready: { label: "就绪", type: "success" },
	online: { label: "在线", type: "success" },
	success: { label: "成功", type: "success" },
	offline: { label: "离线", type: "danger" },
	error: { label: "异常", type: "danger" },
	failed: { label: "失败", type: "danger" },
	timeout: { label: "超时", type: "warning" },
	pending: { label: "待处理", type: "warning" },
	running: { label: "执行中", type: "info" },
	unavailable: { label: "不可用", type: "neutral" },
	disabled: { label: "已禁用", type: "neutral" },
	enabled: { label: "已启用", type: "success" },
};

export function tr(key: string): string {
	return _(key) || key;
}

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
	if (days > 0) parts.push(`${days}天`);
	if (hours > 0 || days > 0) parts.push(`${hours}小时`);
	if (minutes > 0 || hours > 0 || days > 0) parts.push(`${minutes}分钟`);
	parts.push(`${secs}秒`);
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
