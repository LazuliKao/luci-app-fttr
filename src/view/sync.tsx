// SPDX-License-Identifier: Apache-2.0

import { showOnuDetails } from "./components/onu-details";
import { checkConfig, getStatus, getSync, type SyncAction, sync } from "./contracts/api";
import { requirePage } from "./contracts/capabilities";
import type { AcsBootstrap, ConfigCheck, DeviceSync, Lifecycle, SyncItem, SyncStatus } from "./contracts/provisioning";

const STATE_I18N: Record<string, { label: string; type: "success" | "warning" | "danger" | "info" | "neutral" }> = {
	ready: { label: _("Ready"), type: "success" },
	verified: { label: _("Verified"), type: "success" },
	online: { label: _("Online"), type: "success" },
	completed: { label: _("Completed"), type: "success" },
	applied: { label: _("Applied"), type: "success" },
	waiting_inform: { label: _("Waiting Inform"), type: "warning" },
	pending: { label: _("Pending"), type: "warning" },
	awaiting_apply: { label: _("Awaiting Apply"), type: "warning" },
	syncing: { label: _("Syncing"), type: "info" },
	discovering: { label: _("Discovering"), type: "info" },
	recovering: { label: _("Recovering"), type: "info" },
	waiting_management: { label: _("Waiting Management"), type: "warning" },
	waiting_task: { label: _("Waiting Task"), type: "info" },
	reconcile_required: { label: _("Reconcile Required"), type: "warning" },
	not_started: { label: _("Not Started"), type: "neutral" },
	disabled: { label: _("Disabled"), type: "neutral" },
	enabled: { label: _("Enabled"), type: "success" },
	interrupted: { label: _("Interrupted"), type: "danger" },
	failed: { label: _("Failed"), type: "danger" },
	stale: { label: _("Stale"), type: "warning" },
	error: { label: _("Error"), type: "danger" },
	deleted: { label: _("Deleted"), type: "neutral" },
};

const text = (value: unknown): string => (value === null || value === undefined || value === "" ? "—" : String(value));
const date = (value?: number | null): string => (value ? new Date(value * 1000).toLocaleString() : "—");

function formatAge(seconds: number | null | undefined): string | null {
	if (seconds == null || seconds < 0) return null;
	if (seconds < 60) {
		return (seconds === 1 ? _("%d second ago") : _("%d seconds ago")).replace("%d", String(seconds));
	}
	const mins = Math.floor(seconds / 60);
	if (mins < 60) {
		return (mins === 1 ? _("%d minute ago") : _("%d minutes ago")).replace("%d", String(mins));
	}
	const hours = Math.floor(seconds / 3600);
	if (hours < 24) {
		return (hours === 1 ? _("%d hour ago") : _("%d hours ago")).replace("%d", String(hours));
	}
	const days = Math.floor(seconds / 86400);
	return (days === 1 ? _("%d day ago") : _("%d days ago")).replace("%d", String(days));
}

function renderStateBadge(value?: string, customTitle?: string): HTMLElement {
	if (!value) return <span class="fttr-badge fttr-badge-neutral">—</span>;
	const entry = STATE_I18N[value];
	const label = entry?.label || text(value);
	const badgeType = entry?.type || "neutral";
	return (
		<span class={`fttr-badge fttr-badge-${badgeType}`} title={customTitle || value}>
			{label}
		</span>
	);
}

function renderFreshness(currentRev?: boolean, mgmtFresh?: boolean): HTMLElement {
	return (
		<div style="display:flex;flex-direction:column;gap:3px;align-items:flex-start">
			{currentRev === true ? (
				<span class="fttr-badge fttr-badge-info" style="font-size:78%">
					{_("Current configuration")}
				</span>
			) : currentRev === false ? (
				<span class="fttr-badge fttr-badge-neutral" style="font-size:78%">
					{_("Previous configuration")}
				</span>
			) : (
				<span>—</span>
			)}
			{mgmtFresh === true ? (
				<span class="fttr-badge fttr-badge-success" style="font-size:78%">
					{_("Management fresh")}
				</span>
			) : mgmtFresh === false ? (
				<span class="fttr-badge fttr-badge-warning" style="font-size:78%">
					{_("Management stale")}
				</span>
			) : null}
		</div>
	);
}

type ItemRow = Partial<Omit<SyncItem, "kind">> & Lifecycle & { id: string; kind: string };
function formatItemType(serviceType: string, kind: string): string {
	switch (serviceType) {
		case "wifi":
			return "Wi-Fi";
		case "wan":
			return "WAN";
		case "internet":
			return "Internet";
		case "iptv":
			return "IPTV";
		case "tr069":
			return "TR-069";
		default:
			return kind === "port_binding" ? _("Binding") : text(serviceType || kind);
	}
}
function itemTable(items: ItemRow[]): HTMLElement {
	return (
		<div class="table-wrapper">
			<table class="table">
				<thead>
					<tr>
						<th>{_("Configuration item")}</th>
						<th>{_("Type")}</th>
						<th>{_("State")}</th>
						<th>{_("Evidence freshness")}</th>
						<th>{_("Last update / task")}</th>
						<th>{_("Reason / desired changes")}</th>
					</tr>
				</thead>
				<tbody>
					{items.length ? (
						items.map((item) => (
							<tr>
								<td>
									<strong>{text(item.name || item.id)}</strong>
								</td>
								<td>
									<span class="fttr-badge fttr-badge-info" style="font-size:80%">
										{formatItemType(item.service_type ?? "", item.kind)}
									</span>
								</td>
								<td>{renderStateBadge(item.state)}</td>
								<td>{renderFreshness(item.current_revision, item.management_fresh)}</td>
								<td>
									<div>{date(item.updated_at)}</div>
									{item.task_id !== undefined && item.task_id !== null ? (
										<span
											class="fttr-badge fttr-badge-neutral"
											style="font-size:75%;margin-top:2px"
										>
											{_("Task")} #{item.task_id}
										</span>
									) : null}
								</td>
								<td>
									{item.reason ? (
										<div style="margin-bottom:3px;color:#555;overflow-wrap:anywhere">
											{item.reason}
										</div>
									) : null}
									{(item.changes ?? []).length ? (
										<div style="font-size:85%">
											{(item.changes ?? []).map((change) => (
												<div style="overflow-wrap:anywhere;margin-top:2px">
													<code>{change.name}</code> = <code>{change.desired}</code>
												</div>
											))}
										</div>
									) : (
										!item.reason && "—"
									)}
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={6} style="text-align:center;color:#888;padding:1em">
								{_("No desired items configured.")}
							</td>
						</tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

function bootstrapCard(
	bootstrap: AcsBootstrap | undefined,
	applyManagement: () => Promise<void>,
	managementApplyDisabled: boolean,
): HTMLElement | null {
	if (!bootstrap) return null;
	return (
		<div style="margin-top:1.2em">
			<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:0.5em">
				<h4 style="margin:0">{_("ACS bootstrap")}</h4>
				<div style="display:flex;align-items:center;gap:6px">
					{renderStateBadge(bootstrap.state)}
					{bootstrap.inflight ? (
						<span class="fttr-badge fttr-badge-info">{_("Command in progress")}</span>
					) : null}
				</div>
			</div>

			<div class="fttr-card">
				<div class="fttr-grid-3">
					<div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{_("Method")}</span>
							<code>{text(bootstrap.method)}</code>
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{_("Attempts")}</span>
							<span>{text(bootstrap.attempts)}</span>
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{_("Identity source")}</span>
							<span>{text(bootstrap.binding_source)}</span>
						</div>
					</div>
					<div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{_("Management VLAN")}</span>
							<span>
								{bootstrap.desired?.vlan !== undefined
									? `VLAN ${bootstrap.desired.vlan} (Prio ${bootstrap.desired.priority ?? 0})`
									: "—"}
							</span>
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{_("ACS URL")}</span>
							<code style="font-size:80%">{text(bootstrap.desired?.acs_url)}</code>
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{_("Local ACS listener")}</span>
							<code style="font-size:80%">
								{bootstrap.listener?.listen
									? `${bootstrap.listener.listen}${bootstrap.listener.path || ""}`
									: "—"}
							</code>
						</div>
					</div>
					<div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{_("Last telemetry")}</span>
							<span style="font-size:85%">{date(bootstrap.mqtt_last_seen)}</span>
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{_("Last Inform")}</span>
							<span style="font-size:85%">{date(bootstrap.last_inform)}</span>
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{_("Settings verified")}</span>
							<span style="font-size:85%">{date(bootstrap.settings_verified_at)}</span>
						</div>
					</div>
				</div>

				{bootstrap.mqtt_target ? (
					<div style="font-size:85%;color:#666;margin-top:6px;border-top:1px dashed rgba(127,140,141,0.15);padding-top:6px">
						<span style="color:#888">{_("MQTT target")}:</span> <code>{bootstrap.mqtt_target}</code>
					</div>
				) : null}

				{bootstrap.reason ? (
					<div style="font-size:85%;color:#d35400;margin-top:6px;overflow-wrap:anywhere">
						{bootstrap.reason}
					</div>
				) : null}

				{bootstrap.state === "awaiting_apply" ? (
					<div style="margin-top:10px;padding:8px;background:rgba(243,156,18,0.1);border-radius:4px;border:1px solid rgba(243,156,18,0.3)">
						<button
							type="button"
							class="cbi-button cbi-button-positive"
							disabled={managementApplyDisabled}
							onclick={applyManagement}
						>
							{_("Authorize and apply management settings")}
						</button>{" "}
						<span style="font-size:85%;color:#666">
							{_(
								"Required after management drift or service restart; verifies the child ACS settings before business synchronization.",
							)}
						</span>
					</div>
				) : null}
			</div>

			{[
				bootstrap.last_error,
				bootstrap.link_identity_error,
				bootstrap.persistence_error,
				bootstrap.listener?.error,
				bootstrap.endpoint_notice,
			]
				.filter(Boolean)
				.map((message) => (
					<div class="alert-message warning" style="overflow-wrap:anywhere;margin-top:8px">
						{message}
					</div>
				))}

			{bootstrap.manual_steps?.length ? (
				<details style="margin-top:8px">
					<summary style="cursor:pointer;user-select:none;font-weight:600">
						{_("Management setup / reachability guidance")}
					</summary>
					<div style="padding:6px 0">
						{bootstrap.manual_steps.map((step, index) => (
							<p style="margin:4px 0;font-size:90%">
								{index + 1}. {step}
							</p>
						))}
					</div>
				</details>
			) : null}
		</div>
	);
}

function deviceCard(
	device: DeviceSync,
	opened: boolean,
	reset: (device: DeviceSync) => Promise<void>,
	applyDevice: (device: DeviceSync) => Promise<void>,
	showMib: (device: DeviceSync) => Promise<void>,
	applyManagement: () => Promise<void>,
	managementApplyDisabled: boolean,
	provisioningEnabled: boolean,
	busy: boolean,
): HTMLElement {
	const op = device.provisioning;
	const operationActive = !["completed", "not_started", "interrupted"].includes(op.state);
	const lifecycle = [
		...Object.entries(op.wan_lifecycle ?? {}).map(([id, item]) => ({
			...item,
			id: `WAN ${id}`,
			kind: "wan_activation",
			service_type: "wan",
		})),
		...Object.entries(op.wifi_lifecycle ?? {}).map(([id, item]) => ({
			...item,
			id: `WLAN ${id}`,
			kind: "ssid",
			service_type: "wifi",
		})),
	];

	const confirmReset = () => {
		const label = device.name || device.optical_sn;
		if (
			window.confirm(_("Are you sure you want to reset the synchronization state for %s?").replace("%s", label))
		) {
			reset(device);
		}
	};

	return (
		<div class="cbi-section fttr-device-card">
			<div class="fttr-card-header">
				<div class="fttr-card-title-group">
					<h3 style="margin:0">
						{device.name || device.optical_sn}{" "}
						<small style="font-size:75%;font-weight:normal;color:#888">({device.adapter})</small>
					</h3>
					<div class="fttr-card-meta-tags">
						{device.group_name ? (
							<span class="fttr-badge fttr-badge-neutral" title={_("Group")}>
								{device.group_name}
							</span>
						) : null}
						{device.template_name ? (
							<span class="fttr-badge fttr-badge-neutral" title={_("Template")}>
								{device.template_name}
							</span>
						) : null}
						<span style="font-size:85%;color:#666">
							OMCI: {renderStateBadge(device.omci_management?.state)}
							{device.omci_management?.reason ? (
								<span style="margin-left:4px;color:#888" title={device.omci_management.reason}>
									({device.omci_management.reason})
								</span>
							) : null}
						</span>
					</div>
				</div>
				{L.hasViewPermission() ? (
					<div class="fttr-card-actions">
						<button type="button" class="cbi-button cbi-button-action" onclick={() => showMib(device)}>
							{_("View OMCI / MIB details")}
						</button>
						<button
							type="button"
							class="cbi-button cbi-button-positive"
							disabled={busy || operationActive || !provisioningEnabled}
							title={
								!provisioningEnabled
									? _("Provisioning is disabled")
									: operationActive
										? _("This device already has an active synchronization operation")
										: _("Start configuration delivery for this device")
							}
							onclick={() => applyDevice(device)}
						>
							{_("Sync now")}
						</button>
						<button
							type="button"
							class="cbi-button cbi-button-positive"
							disabled={busy}
							title={_(
								"Clear old tasks and managed-object records after a device factory reset. The next preview or apply reads the device again.",
							)}
							onclick={confirmReset}
						>
							{_("Reset synchronization state")}
						</button>
					</div>
				) : null}
			</div>

			<div class="fttr-device-status-strip">
				<div class="fttr-status-pill-group">
					<span>
						<span class="fttr-pill-label">CWMP:</span>{" "}
						{renderStateBadge(
							device.management?.state,
							device.management?.last_inform
								? `${_("Last Inform: %s").replace("%s", date(device.management.last_inform))}${
										device.management.age_seconds != null
											? ` (${formatAge(device.management.age_seconds)})`
											: ""
									}`
								: undefined,
						)}
					</span>
					<span>
						<span class="fttr-pill-label">{_("Synchronization")}:</span> {renderStateBadge(op.state)}
					</span>
					<span>
						<span class="fttr-pill-label">Wi-Fi:</span> {renderStateBadge(device.wifi_sync)}
					</span>
				</div>
				<div class="fttr-status-op-info">
					<span>
						{_("Operation")}: <strong>{text(op.operation_id)}</strong> ({text(op.mode)})
					</span>
					<span>·</span>
					<span>
						{_("Started")}: {date(op.started_at)}
					</span>
					<span>·</span>
					<span>
						{_("Revision")}: <code>{text(op.revision)}</code>
					</span>
					{op.attempts ? (
						<>
							<span>·</span>
							<span style="color:#e67e22">
								{_("Attempts")}: <strong>{op.attempts}</strong>
							</span>
						</>
					) : null}
					{op.next_retry_at && op.next_retry_at > Math.floor(Date.now() / 1000) ? (
						<>
							<span>·</span>
							<span style="color:#d35400">
								{_("Next self-healing retry in %d seconds").replace(
									"%d",
									String(op.next_retry_at - Math.floor(Date.now() / 1000)),
								)}
							</span>
						</>
					) : null}
				</div>
			</div>

			{op.reconcile_reason ? (
				<div class="alert-message info" style="margin:8px 0;font-size:85%">
					{op.reconcile_reason}
				</div>
			) : null}

			{itemTable(op.items ?? [])}

			{op.cwmp_contract ? (
				<div style="margin-top:1.2em">
					<h4 style="margin-bottom:0.5em">{_("CWMP contract")}</h4>
					<div class="fttr-card">
						<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px">
							<div>
								<span>{text(op.cwmp_contract.requested)}</span> →{" "}
								<code>{text(op.cwmp_contract.contract)}</code>
							</div>
							<div>{renderStateBadge(op.cwmp_contract.state)}</div>
						</div>
						<div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:6px;font-size:90%">
							<span>
								<span style="color:#888">WAN:</span>{" "}
								{renderStateBadge(op.cwmp_contract.capabilities?.wan)}
							</span>
							<span>
								<span style="color:#888">WLAN:</span>{" "}
								{renderStateBadge(op.cwmp_contract.capabilities?.wlan)}
							</span>
							<span>
								<span style="color:#888">{_("Bindings")}:</span>{" "}
								{renderStateBadge(op.cwmp_contract.capabilities?.binding)}
							</span>
							<span>
								<span style="color:#888">{_("Cache")}:</span>{" "}
								<span class="fttr-badge fttr-badge-info" style="font-size:80%">
									{op.cwmp_contract.cache_hit ? _("Matched") : _("Fresh discovery")}
								</span>
							</span>
						</div>
						{op.cwmp_contract.schema ? (
							<div style="font-size:85%;color:#666">
								{_("Schema")}: <code>{op.cwmp_contract.schema}</code>
							</div>
						) : null}
						{op.cwmp_contract.reason ? (
							<div style="font-size:85%;margin-top:4px;color:#e67e22">{op.cwmp_contract.reason}</div>
						) : null}
					</div>
				</div>
			) : null}

			{bootstrapCard(device.acs_bootstrap, applyManagement, managementApplyDisabled)}

			{lifecycle.length ? (
				<div style="margin-top:1.2em">
					<h4 style="margin-bottom:0.5em">{_("WAN / WLAN lifecycle results")}</h4>
					{itemTable(lifecycle)}
				</div>
			) : null}

			<details data-device={device.device} open={opened} style="margin-top:1em">
				<summary style="cursor:pointer;user-select:none;font-weight:600">
					{_("Managed objects and lifecycle intent")}
				</summary>
				<div style="padding:8px 0">
					<div style="display:flex;gap:16px;flex-wrap:wrap;font-size:90%;margin-bottom:6px">
						<span>
							<span style="color:#888">{_("Wi-Fi cleanup policy")}:</span> {text(op.wifi_cleanup)}
						</span>
						<span>
							<span style="color:#888">{_("Wi-Fi stage")}:</span> {text(op.wifi_stage)}
						</span>
					</div>
					<pre style="white-space:pre-wrap;overflow-wrap:anywhere;font-size:85%;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px;max-height:240px;overflow-y:auto">
						{JSON.stringify(
							{ wan_objects: op.wan_objects ?? {}, wifi_objects: op.wifi_objects ?? {} },
							null,
							2,
						)}
					</pre>
				</div>
			</details>
		</div>
	);
}

const main = L.view.extend({
	async load(): Promise<[SyncStatus, ConfigCheck]> {
		await requirePage("sync");
		return Promise.all([getSync(), checkConfig()]);
	},
	render([initial, initialCheck]: [SyncStatus, ConfigCheck]): HTMLElement {
		const heading = <div />;
		const error = <p class="alert-message warning" hidden aria-live="polite" />;
		const result = <div class="fttr-sync-result" aria-live="polite" style="margin:10px 0" />;
		const target = (
			<select class="cbi-input-select">
				<option value="all">{_("All devices")}</option>
				{(initial.devices ?? []).map((d) => (
					<option value={d.device}>{d.name || d.device}</option>
				))}
			</select>
		) as HTMLSelectElement;
		const content = <div />;
		const managementContent = <div />;
		let current = initial;
		let committed = initialCheck;
		let busy = false;
		let refreshing = false;
		const buttons: HTMLButtonElement[] = [];

		const reset = async (device: DeviceSync) => {
			if (busy) return;
			busy = true;
			update(current);
			try {
				await sync("reset_state", device.device);
				result.replaceChildren(
					<div class="alert-message info">
						{_(
							"Synchronization state reset for %s. Preview differences to read the current device state.",
						).replace("%s", device.name || device.optical_sn)}
					</div>,
				);
				update(await getSync());
			} catch (failure) {
				result.replaceChildren(<div class="alert-message danger">{String(failure)}</div>);
			} finally {
				busy = false;
				update(current);
			}
		};

		const applyDevice = async (device: DeviceSync) => {
			if (busy) return;
			busy = true;
			update(current);
			try {
				const reply = await sync("apply", device.device);
				const operationIds = "operation_ids" in reply ? reply.operation_ids.join(", ") : "—";
				result.replaceChildren(
					<div class="alert-message info">
						{_("Configuration delivery started for %s. Operation IDs: %s")
							.replace("%s", device.name || device.optical_sn)
							.replace("%s", operationIds || "—")}
					</div>,
				);
				update(await getSync());
			} catch (failure) {
				result.replaceChildren(<div class="alert-message danger">{String(failure)}</div>);
			} finally {
				busy = false;
				update(current);
			}
		};

		const showMib = async (device: DeviceSync) => {
			try {
				const status = await getStatus();
				const onu = status.sub_gateways.find((item) => item.serial_number === device.optical_sn);
				if (!onu) throw new Error(_("Device is offline or no longer registered; refresh status and retry."));
				showOnuDetails(onu, "mib");
			} catch (failure) {
				result.replaceChildren(<div class="alert-message danger">{String(failure)}</div>);
			}
		};

		const run = async (action: SyncAction) => {
			if (busy) return;
			busy = true;
			for (const button of buttons) button.disabled = true;
			update(current);
			try {
				const reply = await sync(action, target.value);
				const msg = action.startsWith("management_")
					? _("Management operation started; status is refreshed below.")
					: _("Started: %s").replace("%s", "operation_ids" in reply ? reply.operation_ids.join(", ") : "—");
				result.replaceChildren(<div class="alert-message info">{msg}</div>);
				update(await getSync());
			} catch (failure) {
				result.replaceChildren(<div class="alert-message danger">{String(failure)}</div>);
			} finally {
				busy = false;
				update(current);
			}
		};

		const plan = (
			<button type="button" class="cbi-button cbi-button-action" onclick={() => run("plan")}>
				{_("Preview differences (read-only)")}
			</button>
		) as HTMLButtonElement;
		const apply = (
			<button type="button" class="cbi-button cbi-button-positive" onclick={() => run("apply")}>
				{_("Apply differences")}
			</button>
		) as HTMLButtonElement;
		const reconcile = (
			<button
				type="button"
				class="cbi-button cbi-button-action"
				title={_("Read current device parameters and auto-verify matching settings without writing to device")}
				onclick={() => run("reconcile")}
			>
				{_("Reconcile (read-only)")}
			</button>
		) as HTMLButtonElement;
		const retry = (
			<button
				type="button"
				class="cbi-button cbi-button-positive"
				title={_("Clear backoff delays and retry safe difference synchronization")}
				onclick={() => run("retry")}
			>
				{_("Self-heal / retry")}
			</button>
		) as HTMLButtonElement;
		buttons.push(plan, apply, reconcile, retry);

		const managementPlan = (
			<button type="button" class="cbi-button cbi-button-action" onclick={() => run("management_plan")}>
				{_("Check management differences (read-only)")}
			</button>
		) as HTMLButtonElement;
		const managementApply = (
			<button type="button" class="cbi-button cbi-button-positive" onclick={() => run("management_apply")}>
				{_("Apply management configuration")}
			</button>
		) as HTMLButtonElement;
		buttons.push(managementPlan, managementApply);

		const managementPanel = (
			<div class="cbi-section">
				<h3>{_("Isolated TR069 management network")}</h3>
				{managementContent}
				<p style="margin-top:10px">
					{managementPlan} {managementApply}
				</p>
			</div>
		);

		const manual = (
			<div class="cbi-section">
				<h3>{_("Manual synchronization")}</h3>
				<div style="display:flex;align-items:center;flex-wrap:wrap;gap:12px">
					{/* biome-ignore lint/a11y/noLabelWithoutControl: The select node is inserted inside this label. */}
					<label style="display:flex;align-items:center;gap:8px">
						<span>{_("Target")}:</span>
						{target}
					</label>
					<div style="display:flex;gap:8px;flex-wrap:wrap">
						{plan}
						{apply}
						{reconcile}
						{retry}
					</div>
				</div>
			</div>
		);

		const root = (
			<div class="cbi-map fttr-sync">
				<style>
					{`
					.fttr-sync {
						--fttr-success-bg: rgba(46, 204, 113, 0.15);
						--fttr-success-color: #27ae60;
						--fttr-success-border: rgba(46, 204, 113, 0.35);

						--fttr-warning-bg: rgba(243, 156, 18, 0.15);
						--fttr-warning-color: #d35400;
						--fttr-warning-border: rgba(243, 156, 18, 0.35);

						--fttr-danger-bg: rgba(231, 76, 60, 0.15);
						--fttr-danger-color: #c0392b;
						--fttr-danger-border: rgba(231, 76, 60, 0.35);

						--fttr-info-bg: rgba(52, 152, 219, 0.15);
						--fttr-info-color: #2980b9;
						--fttr-info-border: rgba(52, 152, 219, 0.35);

						--fttr-neutral-bg: rgba(127, 140, 141, 0.12);
						--fttr-neutral-color: #7f8c8d;
						--fttr-neutral-border: rgba(127, 140, 141, 0.25);
					}

					@media (prefers-color-scheme: dark) {
						.fttr-sync {
							--fttr-success-color: #2ecc71;
							--fttr-warning-color: #f39c12;
							--fttr-danger-color: #e74c3c;
							--fttr-info-color: #3498db;
							--fttr-neutral-color: #bdc3c7;
						}
					}

					[data-darkmode="true"] .fttr-sync,
					[data-theme="dark"] .fttr-sync {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}

					.fttr-sync .fttr-badge {
						display: inline-block;
						padding: 0.18em 0.55em;
						font-size: 85%;
						font-weight: 600;
						line-height: 1.25;
						border-radius: 3px;
						white-space: nowrap;
						text-align: center;
					}

					.fttr-sync .fttr-badge-success {
						background: var(--fttr-success-bg);
						color: var(--fttr-success-color);
						border: 1px solid var(--fttr-success-border);
					}

					.fttr-sync .fttr-badge-warning {
						background: var(--fttr-warning-bg);
						color: var(--fttr-warning-color);
						border: 1px solid var(--fttr-warning-border);
					}

					.fttr-sync .fttr-badge-danger {
						background: var(--fttr-danger-bg);
						color: var(--fttr-danger-color);
						border: 1px solid var(--fttr-danger-border);
					}

					.fttr-sync .fttr-badge-info {
						background: var(--fttr-info-bg);
						color: var(--fttr-info-color);
						border: 1px solid var(--fttr-info-border);
					}

					.fttr-sync .fttr-badge-neutral {
						background: var(--fttr-neutral-bg);
						color: var(--fttr-neutral-color);
						border: 1px solid var(--fttr-neutral-border);
					}

					.fttr-sync .fttr-grid-2 {
						display: grid;
						grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
						gap: 12px;
						margin: 8px 0;
					}

					.fttr-sync .fttr-grid-3 {
						display: grid;
						grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
						gap: 12px;
						margin: 8px 0;
					}

					.fttr-sync .fttr-card {
						padding: 10px 14px;
						border: 1px solid rgba(127, 140, 141, 0.2);
						border-radius: 6px;
						background: rgba(127, 140, 141, 0.04);
					}

					.fttr-sync .fttr-kv-row {
						display: flex;
						justify-content: space-between;
						align-items: center;
						padding: 4px 0;
						border-bottom: 1px dashed rgba(127, 140, 141, 0.15);
						font-size: 88%;
					}

					.fttr-sync .fttr-kv-row:last-child {
						border-bottom: none;
					}

					.fttr-sync .fttr-kv-label {
						color: #888;
					}

					.fttr-sync .fttr-pill-label {
						color: #888;
						margin-right: 4px;
						font-size: 90%;
					}

					.fttr-sync .fttr-device-card {
						position: relative;
						margin-bottom: 1.5em;
					}

					.fttr-sync .fttr-card-header {
						display: flex;
						justify-content: space-between;
						align-items: flex-start;
						flex-wrap: wrap;
						gap: 10px;
						margin-bottom: 10px;
					}

					.fttr-sync .fttr-card-title-group {
						display: flex;
						flex-direction: column;
						gap: 4px;
					}

					.fttr-sync .fttr-card-meta-tags {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 6px;
					}

					.fttr-sync .fttr-device-status-strip {
						display: flex;
						justify-content: space-between;
						align-items: center;
						flex-wrap: wrap;
						gap: 10px;
						padding: 8px 12px;
						background: rgba(127, 140, 141, 0.05);
						border: 1px solid rgba(127, 140, 141, 0.15);
						border-radius: 5px;
						margin-bottom: 12px;
					}

					.fttr-sync .fttr-status-pill-group {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 12px;
					}

					.fttr-sync .fttr-status-op-info {
						display: flex;
						align-items: center;
						flex-wrap: wrap;
						gap: 6px;
						font-size: 85%;
						color: #666;
					}

					.fttr-sync .fttr-btn-subtle {
						font-size: 80%;
						padding: 3px 8px;
						border: 1px solid rgba(127, 140, 141, 0.35);
						background: transparent;
						color: inherit;
						border-radius: 4px;
						cursor: pointer;
						transition: all 0.2s ease;
					}

					.fttr-sync .fttr-btn-subtle:hover {
						background: rgba(231, 76, 60, 0.1);
						border-color: rgba(231, 76, 60, 0.4);
						color: #c0392b;
					}

					.fttr-sync .table th {
						white-space: nowrap;
						user-select: none;
					}

					.fttr-sync .table td {
						vertical-align: middle;
					}
					`}
				</style>
				<h2>{_("FTTR synchronization")}</h2>
				{heading}
				{error}
				{managementPanel}
				{manual}
				{result}
				{content}
			</div>
		);

		function update(status: SyncStatus): void {
			current = status;
			heading.replaceChildren(
				<div
					data-provisioning-summary="true"
					style="display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%"
				>
					<span>
						<strong style="margin-right:.4em">{_("Provisioning")}:</strong>
						<span class={`fttr-badge ${status.enabled ? "fttr-badge-success" : "fttr-badge-neutral"}`}>
							{status.enabled ? _("Enabled") : _("Disabled")}
						</span>
					</span>
					<span>
						<span style="color:#888;margin-right:.3em">{_("Mode")}:</span>
						<span class="fttr-badge fttr-badge-info">{text(status.mode)}</span>
					</span>
					<span>
						<span style="color:#888;margin-right:.3em">{_("Revision")}:</span>
						<code>{text(status.revision)}</code>
					</span>
					{(status.triggers ?? []).length ? (
						<span>
							<span style="color:#888;margin-right:.3em">{_("Triggers")}:</span>
							<code>{(status.triggers ?? []).join(", ")}</code>
						</span>
					) : null}
					{status.interval_minutes ? (
						<span>
							<span style="color:#888;margin-right:.3em">{_("Interval (minutes)")}:</span>
							<span>{status.interval_minutes}</span>
						</span>
					) : null}
				</div>,
			);

			const messages = [
				status.error,
				committed.error
					? _("Committed configuration is invalid: %s").format(committed.error)
					: committed.revision && committed.revision !== status.revision
						? _(
								"Committed configuration has not been loaded. Check Configuration diagnostics; an active operation may have prevented reload.",
							)
						: "",
			].filter(Boolean);
			error.hidden = !messages.length;
			error.textContent = messages.join(" — ");

			const names = [
				"all",
				...Array.from(new Set((status.devices ?? []).map((d) => d.group).filter(Boolean))).map(
					(g) => `group:${g}`,
				),
				...(status.devices ?? []).map((d) => d.device),
			];
			if (
				Array.from(target.options)
					.map((o) => o.value)
					.join("\n") !== names.join("\n")
			) {
				const selected = target.value;
				target.replaceChildren(
					...names.map((name) => (
						<option value={name}>
							{name === "all"
								? _("All devices")
								: name.startsWith("group:")
									? (status.devices ?? []).find((d) => `group:${d.group}` === name)?.group_name ||
										name
									: (status.devices ?? []).find((d) => d.device === name)?.name || name}
						</option>
					)),
				);
				target.value = names.includes(selected) ? selected : "all";
			}

			manual.hidden = status.mode !== "manual" || !L.hasViewPermission();
			const active = (status.devices ?? [])
				.filter(
					(d) => target.value === "all" || d.device === target.value || `group:${d.group}` === target.value,
				)
				.some(
					(d) => !["completed", "not_started", "interrupted"].includes(d.provisioning.state ?? "not_started"),
				);
			plan.disabled =
				busy ||
				active ||
				!!committed.error ||
				(!!committed.revision && committed.revision !== status.revision) ||
				!(status.devices ?? []).length;
			apply.disabled = plan.disabled || !status.enabled;

			const host = status.management_network;
			managementPlan.disabled = busy || !!host?.inflight || !!committed.error || !L.hasViewPermission();
			managementApply.disabled = managementPlan.disabled;

			const configuration = host.desired ?? host.applied;
			const planChanges = host?.plan ?? [];
			const isSync =
				Boolean(host?.applied_version) &&
				Boolean(host?.desired_version) &&
				host?.applied_version === host?.desired_version;

			managementContent.replaceChildren(
				<div>
					<div style="display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:10px">
						<span>
							<span class="fttr-pill-label">{_("State")}:</span> {renderStateBadge(host?.state)}
						</span>
						<span>
							<span class="fttr-pill-label">{_("Desired version")}:</span>{" "}
							<code>{text(host?.desired_version)}</code>
						</span>
						<span>
							<span class="fttr-pill-label">{_("Applied version")}:</span>{" "}
							<code>{text(host?.applied_version)}</code>
						</span>
						{host?.desired_version || host?.applied_version ? (
							<span>
								{isSync ? (
									<span class="fttr-badge fttr-badge-success">{_("Synchronized")}</span>
								) : (
									<span class="fttr-badge fttr-badge-warning">{_("Pending apply")}</span>
								)}
							</span>
						) : null}
						{host?.next_retry_at ? (
							<span>
								<span class="fttr-pill-label">{_("Next retry")}:</span> {date(host.next_retry_at)}
							</span>
						) : null}
					</div>

					<div class="fttr-grid-3">
						<div class="fttr-card">
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">{_("Management interface")}</span>
								<strong>—</strong>
							</div>
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">{_("Management VLAN")}</span>
								<span>
									VLAN {text(configuration?.vlan.join(", "))} (Prio {text(configuration?.priority)})
								</span>
							</div>
						</div>
						<div class="fttr-card">
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">{_("Service IP / Netmask")}</span>
								<code>{text(configuration?.address)}</code>
							</div>
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">{_("DHCP service")}</span>
								<span>
									{configuration === null ? (
										"—"
									) : configuration.dhcp_enabled ? (
										<span class="fttr-badge fttr-badge-success">{_("Enabled")}</span>
									) : (
										<span class="fttr-badge fttr-badge-neutral">{_("Disabled")}</span>
									)}
								</span>
							</div>
						</div>
						<div class="fttr-card">
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">{_("ACS URL")}</span>
								<code style="font-size:80%">{text(configuration?.acs_url)}</code>
							</div>
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">{_("Mode")}</span>
								<span>{text(configuration?.mode)}</span>
							</div>
						</div>
					</div>

					{planChanges.length ? (
						<div style="margin-top:10px">
							<h5 style="margin-bottom:4px;font-size:90%">{_("Pending configuration changes")}</h5>
							<div class="table-wrapper">
								<table class="table" style="font-size:85%">
									<thead>
										<tr>
											<th>{_("Operation")}</th>
											<th>{_("Configuration item")}</th>
											<th>{_("Reason / desired changes")}</th>
										</tr>
									</thead>
									<tbody>
										{planChanges.map((p) => (
											<tr>
												<td>
													<span class="fttr-badge fttr-badge-info">{p.operation}</span>
												</td>
												<td>
													<code>{p.key}</code>
												</td>
												<td>
													<code>{(p.value ?? []).join(", ")}</code>
												</td>
											</tr>
										))}
									</tbody>
								</table>
							</div>
						</div>
					) : null}

					{host?.error ? (
						<div class="alert-message warning" style="margin-top:8px">
							{host.error}
						</div>
					) : null}

					<p style="font-size:85%;color:#888;margin-top:8px;margin-bottom:8px">
						{_(
							"Saving in manual mode does not create interfaces, change firewall rules or configure child devices. Apply explicitly to authorize the current management configuration.",
						)}
					</p>

					<details style="margin-top:6px;margin-bottom:10px">
						<summary style="cursor:pointer;user-select:none;font-size:85%;color:#666">
							{_("Advanced diagnostics / Raw configuration (JSON)")}
						</summary>
						<pre style="white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto;background:rgba(0,0,0,0.03);padding:8px;border-radius:4px">
							{JSON.stringify(
								{ desired: host?.desired, applied: host?.applied, plan: host?.plan ?? [] },
								null,
								2,
							)}
						</pre>
					</details>
				</div>,
			);

			const opened = new Set(
				Array.from(content.querySelectorAll("details[open]")).map((d) => d.getAttribute("data-device")),
			);
			content.replaceChildren(
				...(status.devices ?? []).map((d) =>
					deviceCard(
						d,
						opened.has(d.device),
						reset,
						applyDevice,
						showMib,
						() => run("management_apply"),
						managementApply.disabled,
						status.enabled,
						busy,
					),
				),
			);
		}

		target.addEventListener("change", () => update(current));
		update(initial);

		L.Poll.add(async () => {
			if (!root.isConnected || refreshing) return;
			refreshing = true;
			try {
				const [status, check] = await Promise.all([getSync(), checkConfig()]);
				committed = check;
				update(status);
			} catch (failure) {
				error.hidden = false;
				error.textContent = _("Status refresh failed: %s").format(String(failure));
			} finally {
				refreshing = false;
			}
		}, 5);

		return root;
	},
	handleSave: null,
	handleSaveApply: null,
	handleReset: null,
});

export { main };
