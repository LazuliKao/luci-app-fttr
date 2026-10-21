// SPDX-License-Identifier: Apache-2.0

import { type BusinessStatus, businessText, type SubGateway } from "../contracts/status";
import { formatAge, text } from "./formatters";

export type BadgeTone = "success" | "warning" | "danger" | "info" | "neutral" | "none";

export interface BadgeProps {
	tone: BadgeTone;
	title?: string;
	class?: string;
	children?: unknown;
}

/**
 * Reusable LuCI JSX Badge component.
 */
export function Badge(props: BadgeProps): HTMLElement {
	const toneClass = props.tone === "none" ? "" : `fttr-badge fttr-badge-${props.tone}`;
	const extraClass = props.class ? ` ${props.class}` : "";
	const span = (<span class={`${toneClass}${extraClass}`.trim()}>{props.children}</span>) as HTMLElement;
	if (props.title) {
		span.setAttribute("title", props.title);
	}
	return span;
}

/**
 * Mutate existing DOM node for polling/dynamic table updates.
 */
export function updateBadge(node: HTMLElement, tone: BadgeTone, label: string, title?: string): void {
	node.textContent = label;
	if (tone === "none") {
		node.className = "";
	} else {
		node.className = `fttr-badge fttr-badge-${tone}`;
	}
	if (title) {
		node.setAttribute("title", title);
	} else {
		node.removeAttribute("title");
	}
}

// ---------------------------------------------------------------------------
// Registration State
// ---------------------------------------------------------------------------

export const REGISTRATION_STATE_LABELS: Record<string, string> = {
	o1_initial: _("O1 Initial"),
	o2_standby: _("O2 Standby"),
	o3_serial_number: _("O3 Serial Number"),
	o4_ranging: _("O4 Ranging"),
	o5_operation: _("O5 (Operation)"),
	o6_intermittent_lods: _("O6 Intermittent LODS"),
	o7_emergency_stop: _("O7 Emergency Stop"),
};

export function getRegistrationBadgeSpec(state?: string): {
	tone: BadgeTone;
	label: string;
	title?: string;
} {
	if (!state) {
		return { tone: "none", label: "—" };
	}
	if (state === "o5_operation") {
		return {
			tone: "success",
			label: REGISTRATION_STATE_LABELS.o5_operation,
			title: state,
		};
	}
	const label = REGISTRATION_STATE_LABELS[state] ?? text(state);
	return {
		tone: "warning",
		label,
		title: state,
	};
}

export function RegistrationBadge(props: { state?: string }): HTMLElement {
	const spec = getRegistrationBadgeSpec(props.state);
	return (
		<Badge tone={spec.tone} title={spec.title}>
			{spec.label}
		</Badge>
	);
}

// ---------------------------------------------------------------------------
// Business Status
// ---------------------------------------------------------------------------

export function getBusinessBadgeSpec(status?: BusinessStatus | null): {
	tone: BadgeTone;
	label: string;
	title?: string;
} {
	if (!status) return { tone: "neutral", label: "—" };
	const tone: BadgeTone =
		status.phase === "verified"
			? "success"
			: status.error || status.phase === "wan_bootstrap_pending"
				? "warning"
				: "neutral";
	return {
		tone,
		label: businessText(status),
		title: status.error || undefined,
	};
}

export function BusinessBadge(props: { status?: BusinessStatus | null }): HTMLElement {
	const spec = getBusinessBadgeSpec(props.status);
	return (
		<Badge tone={spec.tone} title={spec.title}>
			{spec.label}
		</Badge>
	);
}

// ---------------------------------------------------------------------------
// CWMP Status
// ---------------------------------------------------------------------------

export const CWMP_STATE_LABELS: Record<string, string> = {
	online: _("Online"),
	waiting_inform: _("Waiting Inform"),
	offline_or_stale: _("Offline or stale"),
};

export function getCwmpBadgeSpec(mgmt?: SubGateway["management"]): {
	tone: BadgeTone;
	label: string;
	title?: string;
} {
	const state = mgmt?.state;
	const age =
		mgmt?.age_seconds ?? (mgmt?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - mgmt.last_inform) : null);
	const ageText = formatAge(age);
	const fullTime = mgmt?.last_inform ? new Date(mgmt.last_inform * 1000).toLocaleString() : null;
	const title = fullTime ? _("Last Inform: %s").replace("%s", fullTime) : undefined;

	let label = "—";
	let tone: BadgeTone = "none";

	if (state === "online") {
		tone = "success";
		label = CWMP_STATE_LABELS.online;
	} else if (state === "waiting_inform") {
		tone = "warning";
		label = CWMP_STATE_LABELS.waiting_inform;
	} else if (state === "offline_or_stale") {
		tone = "danger";
		label = CWMP_STATE_LABELS.offline_or_stale;
	} else if (state) {
		tone = "neutral";
		label = text(state);
	}

	const displayLabel = ageText && state ? `${label} · ${ageText}` : label;
	return { tone, label: displayLabel, title };
}

export function CwmpBadge(props: { management?: SubGateway["management"] }): HTMLElement {
	const spec = getCwmpBadgeSpec(props.management);
	return (
		<Badge tone={spec.tone} title={spec.title}>
			{spec.label}
		</Badge>
	);
}

// ---------------------------------------------------------------------------
// Provisioning Status
// ---------------------------------------------------------------------------

export const PROVISIONING_STATE_LABELS: Record<string, string> = {
	waiting: _("Waiting"),
	wan_reconciling: _("WAN reconciling"),
	wan_verifying: _("WAN verifying"),
	wifi_reconciling: _("Wi-Fi reconciling"),
	discovering: _("Discovering"),
	reading: _("Reading"),
	disabling: _("Disabling"),
	disabling_read: _("Disabling read"),
	writing: _("Writing"),
	verifying: _("Verifying"),
	settling: _("Settling"),
	completed: _("Completed"),
	interrupted: _("Interrupted"),
	recovering: _("Recovering"),
	waiting_management: _("Waiting management"),
	waiting_task: _("Waiting task"),
	reset_pending: _("Reset pending"),
	failed: _("Failed"),
	error: _("Error"),
	blocked: _("Blocked"),
	not_started: _("Not started"),
};

export function getProvisioningBadgeSpec(
	provData?: SubGateway["provisioning"] | null,
	customTitle?: string,
): {
	tone: BadgeTone;
	label: string;
	title?: string;
} {
	const state: string | undefined = provData?.state;
	const nextRetry =
		provData?.next_retry_at && provData.next_retry_at > Math.floor(Date.now() / 1000)
			? provData.next_retry_at - Math.floor(Date.now() / 1000)
			: 0;
	const title =
		customTitle ??
		(provData?.current_revision === false
			? _("Previous configuration")
			: provData?.management_fresh === false
				? _("Management stale")
				: provData?.reconcile_reason
					? provData.reconcile_reason
					: nextRetry > 0
						? _("Next self-healing retry in %d seconds").replace("%d", String(nextRetry))
						: (provData?.reason ?? provData?.error));

	if (!state || state === "not_started") {
		return { tone: "neutral", label: PROVISIONING_STATE_LABELS.not_started, title };
	}
	if (state === "completed" || state === "verified") {
		return {
			tone: "success",
			label: state === "completed" ? PROVISIONING_STATE_LABELS.completed : _("Ready"),
			title,
		};
	}
	if (
		state === "wan_reconciling" ||
		state === "wan_verifying" ||
		state === "wifi_reconciling" ||
		state === "discovering" ||
		state === "reading" ||
		state === "disabling" ||
		state === "disabling_read" ||
		state === "writing" ||
		state === "verifying" ||
		state === "settling" ||
		state === "recovering" ||
		state === "waiting_task"
	) {
		const label = PROVISIONING_STATE_LABELS[state] ?? text(state);
		return { tone: "info", label, title };
	}
	if (state === "interrupted" || state === "failed" || state === "error" || state === "blocked") {
		const label = state === "blocked" ? PROVISIONING_STATE_LABELS.blocked : PROVISIONING_STATE_LABELS.interrupted;
		return { tone: "danger", label, title };
	}
	if (state === "waiting" || state === "pending" || state === "waiting_management" || state === "reset_pending") {
		const label = PROVISIONING_STATE_LABELS[state] ?? PROVISIONING_STATE_LABELS.waiting;
		return { tone: "warning", label, title };
	}
	return { tone: "neutral", label: text(state), title };
}

export function ProvisioningBadge(props: {
	provisioning?: SubGateway["provisioning"] | null;
	title?: string;
}): HTMLElement {
	const spec = getProvisioningBadgeSpec(props.provisioning, props.title);
	return (
		<Badge tone={spec.tone} title={spec.title}>
			{spec.label}
		</Badge>
	);
}

// ---------------------------------------------------------------------------
// Wi-Fi Sync Status
// ---------------------------------------------------------------------------

export const WIFI_SYNC_STATE_LABELS: Record<string, string> = {
	not_configured: _("Not configured"),
	stale_revision: _("Stale revision"),
	stale_management: _("Stale management"),
	verified: _("Verified"),
	attention_required: _("Attention required"),
	accepted_unverified: _("Unverified"),
	pending: _("Pending"),
	recovering: _("Recovering"),
	waiting_management: _("Waiting management"),
};

export function getWifiSyncBadgeSpec(state?: string): {
	tone: BadgeTone;
	label: string;
	title?: string;
} {
	if (!state || state === "not_configured") {
		return { tone: "neutral", label: WIFI_SYNC_STATE_LABELS.not_configured };
	}
	if (state === "verified") {
		return { tone: "success", label: WIFI_SYNC_STATE_LABELS.verified };
	}
	if (state === "attention_required") {
		return { tone: "danger", label: WIFI_SYNC_STATE_LABELS.attention_required };
	}
	if (state === "stale_revision" || state === "stale_management" || state === "waiting_management") {
		return { tone: "warning", label: WIFI_SYNC_STATE_LABELS[state] };
	}
	if (state === "recovering") {
		return { tone: "info", label: WIFI_SYNC_STATE_LABELS.recovering };
	}
	if (state === "accepted_unverified" || state === "pending") {
		return { tone: "warning", label: WIFI_SYNC_STATE_LABELS[state] };
	}
	return { tone: "neutral", label: text(state) };
}

export function WifiSyncBadge(props: { state?: string }): HTMLElement {
	const spec = getWifiSyncBadgeSpec(props.state);
	return (
		<Badge tone={spec.tone} title={spec.title}>
			{spec.label}
		</Badge>
	);
}

// ---------------------------------------------------------------------------
// Common Badge CSS
// ---------------------------------------------------------------------------

export const BADGE_CSS = `
.fttr-badge {
	display: inline-block;
	padding: 0.18em 0.55em;
	font-size: 85%;
	font-weight: 600;
	line-height: 1.25;
	border-radius: 3px;
	white-space: nowrap;
	text-align: center;
}

.fttr-badge-success {
	background: var(--fttr-success-bg, rgba(46, 204, 113, 0.15));
	color: var(--fttr-success-color, #27ae60);
	border: 1px solid var(--fttr-success-border, rgba(46, 204, 113, 0.35));
}

.fttr-badge-warning {
	background: var(--fttr-warning-bg, rgba(243, 156, 18, 0.15));
	color: var(--fttr-warning-color, #d35400);
	border: 1px solid var(--fttr-warning-border, rgba(243, 156, 18, 0.35));
}

.fttr-badge-danger {
	background: var(--fttr-danger-bg, rgba(231, 76, 60, 0.15));
	color: var(--fttr-danger-color, #c0392b);
	border: 1px solid var(--fttr-danger-border, rgba(231, 76, 60, 0.35));
}

.fttr-badge-info {
	background: var(--fttr-info-bg, rgba(52, 152, 219, 0.15));
	color: var(--fttr-info-color, #2980b9);
	border: 1px solid var(--fttr-info-border, rgba(52, 152, 219, 0.35));
}

.fttr-badge-neutral {
	background: var(--fttr-neutral-bg, rgba(127, 140, 141, 0.12));
	color: var(--fttr-neutral-color, #7f8c8d);
	border: 1px solid var(--fttr-neutral-border, rgba(127, 140, 141, 0.25));
}

@media (prefers-color-scheme: dark) {
	.fttr-badge-success {
		color: var(--fttr-success-color, #2ecc71);
	}
	.fttr-badge-warning {
		color: var(--fttr-warning-color, #f39c12);
	}
	.fttr-badge-danger {
		color: var(--fttr-danger-color, #e74c3c);
	}
	.fttr-badge-info {
		color: var(--fttr-info-color, #3498db);
	}
	.fttr-badge-neutral {
		color: var(--fttr-neutral-color, #bdc3c7);
	}
}

[data-darkmode="true"] .fttr-badge-success,
[data-theme="dark"] .fttr-badge-success {
	color: var(--fttr-success-color, #2ecc71);
}
[data-darkmode="true"] .fttr-badge-warning,
[data-theme="dark"] .fttr-badge-warning {
	color: var(--fttr-warning-color, #f39c12);
}
[data-darkmode="true"] .fttr-badge-danger,
[data-theme="dark"] .fttr-badge-danger {
	color: var(--fttr-danger-color, #e74c3c);
}
[data-darkmode="true"] .fttr-badge-info,
[data-theme="dark"] .fttr-badge-info {
	color: var(--fttr-info-color, #3498db);
}
[data-darkmode="true"] .fttr-badge-neutral,
[data-theme="dark"] .fttr-badge-neutral {
	color: var(--fttr-neutral-color, #bdc3c7);
}
`;
