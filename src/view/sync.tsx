// SPDX-License-Identifier: Apache-2.0

interface SyncItem {
	id?: string;
	name?: string;
	kind?: string;
	service_type?: string;
	state?: string;
	reason?: string;
	revision?: string;
	current_revision?: boolean;
	management_fresh?: boolean;
	task_id?: number;
	updated_at?: number;
	changes?: Array<{ name: string; desired: string }>;
}

interface AcsBootstrap {
	state?: string;
	method?: string;
	reason?: string;
	mqtt_target?: string;
	binding_source?: string;
	link_identity_error?: string;
	mqtt_last_seen?: number;
	cwmp_id?: string;
	desired_version?: string;
	generation?: number;
	inflight?: boolean;
	attempts?: number;
	next_retry_at?: number;
	updated_at?: number;
	settings_verified_at?: number;
	last_inform?: number;
	last_error?: string;
	persistence_error?: string;
	desired?: { vlan?: number; priority?: number; acs_url?: string };
	listener?: { enabled?: boolean; listen?: string; path?: string; error?: string };
	endpoint_notice?: string;
	manual_steps?: string[];
}

interface DeviceSync {
	device: string;
	name?: string;
	group?: string;
	template?: string;
	group_name?: string;
	template_name?: string;
	omci_management?: { state?: string; reason?: string };
	optical_sn: string;
	adapter: string;
	wifi_sync?: string;
	management?: { state?: string; age_seconds?: number; last_inform?: number };
	acs_bootstrap?: AcsBootstrap;
	provisioning: {
		cwmp_contract?: {
			state?: string;
			requested?: string;
			contract?: string;
			reason?: string;
			cache_hit?: boolean;
			schema?: string;
			capabilities?: { wan?: string; wlan?: string; binding?: string };
		};
		state?: string;
		operation_id?: number;
		revision?: string;
		mode?: string;
		started_at?: number;
		current_revision?: boolean;
		management_fresh?: boolean;
		items?: SyncItem[];
		wan_objects?: Record<string, unknown>;
		wan_lifecycle?: Record<string, SyncItem>;
		wifi_objects?: { owned?: number[]; pending?: string; pending_instance?: number };
		wifi_lifecycle?: Record<string, SyncItem>;
		wifi_stage?: string;
		wifi_cleanup?: string;
	};
}

interface SyncStatus {
	management_network?: {
		state?: string;
		error?: string;
		inflight?: boolean;
		ready?: boolean;
		desired_version?: string;
		applied_version?: string;
		next_retry_at?: number;
		desired?: Record<string, unknown>;
		applied?: Record<string, unknown>;
		plan?: Array<{ operation: string; key: string; value: string[] }>;
	};
	enabled?: boolean;
	mode?: string;
	revision?: string;
	triggers?: string[];
	interval?: number;
	error?: string;
	devices?: DeviceSync[];
}

interface ConfigCheck {
	valid?: boolean;
	revision?: string;
	error?: string;
}

const getSync = L.rpc.declare<SyncStatus>({ object: "luci.fttr", method: "get_sync", reject: true });
const checkConfig = L.rpc.declare<ConfigCheck>({ object: "luci.fttr", method: "config_check", reject: true });
const sync = L.rpc.declare<{ error?: string; operation_ids?: number[] }, [string, string]>({
	object: "luci.fttr",
	method: "sync",
	params: ["action", "target"],
	reject: true,
});
const text = (value: unknown): string => (value === null || value === undefined || value === "" ? "—" : String(value));
const date = (value?: number): string => (value ? new Date(value * 1000).toLocaleString() : "—");

function state(value?: string): HTMLElement {
	return (
		<span
			class={
				value === "verified" || value === "online" || value === "deleted" || value === "ready"
					? "label success"
					: "label warning"
			}
		>
			{text(value)}
		</span>
	);
}

function itemTable(items: SyncItem[]): HTMLElement {
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
								<td>{text(item.name || item.id)}</td>
								<td>{text(item.service_type || item.kind)}</td>
								<td>{state(item.state)}</td>
								<td>
									{item.current_revision === false
										? _("Previous configuration")
										: item.current_revision === true
											? _("Current configuration")
											: "—"}
									<br />
									{item.management_fresh === false
										? _("Management stale")
										: item.management_fresh === true
											? _("Management fresh")
											: "—"}
								</td>
								<td>
									{date(item.updated_at)}
									<br />
									{_("Task")}: {text(item.task_id)}
								</td>
								<td>
									{text(item.reason)}
									{(item.changes ?? []).map((change) => (
										<div style="overflow-wrap:anywhere">
											<code>{change.name}</code>: {change.desired}
										</div>
									))}
								</td>
							</tr>
						))
					) : (
						<tr>
							<td colSpan={6}>{_("No desired items configured.")}</td>
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
		<div>
			<h4>{_("ACS bootstrap")}</h4>
			<p>
				{state(bootstrap.state)} · {_("Method")}: {text(bootstrap.method)} · {_("Attempts")}:{" "}
				{text(bootstrap.attempts)}
				{bootstrap.inflight ? ` · ${_("Command in progress")}` : ""}
			</p>
			<p style="overflow-wrap:anywhere">{text(bootstrap.reason)}</p>
			{bootstrap.state === "awaiting_apply" ? (
				<p>
					<button
						type="button"
						class="cbi-button cbi-button-positive"
						disabled={managementApplyDisabled}
						onclick={applyManagement}
					>
						{_("Authorize and apply management settings")}
					</button>{" "}
					{_(
						"Required after management drift or service restart; verifies the child ACS settings before business synchronization.",
					)}
				</p>
			) : null}
			<p>
				{_("MQTT target")}: <code>{text(bootstrap.mqtt_target)}</code> · {_("Last telemetry")}:{" "}
				{date(bootstrap.mqtt_last_seen)}
				{` · ${_("Identity source")}: ${text(bootstrap.binding_source)}`}
				<br />
				{_("Settings verified")}: {date(bootstrap.settings_verified_at)} · {_("Last Inform")}:{" "}
				{date(bootstrap.last_inform)}
				<br />
				{_("Next retry")}: {date(bootstrap.next_retry_at)} · {_("Generation")}: {text(bootstrap.generation)} ·{" "}
				{_("Updated")}: {date(bootstrap.updated_at)}
			</p>
			{bootstrap.desired ? (
				<p style="overflow-wrap:anywhere">
					{_("Management VLAN")}: {text(bootstrap.desired.vlan)} · {_("Priority")}:{" "}
					{text(bootstrap.desired.priority)}
					<br />
					{_("ACS URL")}: <code>{text(bootstrap.desired.acs_url)}</code>
				</p>
			) : null}
			{bootstrap.listener ? (
				<p>
					{_("Local ACS listener")}:{" "}
					<code>
						{text(bootstrap.listener.listen)}
						{bootstrap.listener.path || ""}
					</code>{" "}
					· {_("Enabled")}: {text(bootstrap.listener.enabled)}
				</p>
			) : null}
			{[
				bootstrap.last_error,
				bootstrap.link_identity_error,
				bootstrap.persistence_error,
				bootstrap.listener?.error,
				bootstrap.endpoint_notice,
			]
				.filter(Boolean)
				.map((message) => (
					<p class="alert-message warning" style="overflow-wrap:anywhere">
						{message}
					</p>
				))}
			{bootstrap.manual_steps?.length ? (
				<details>
					<summary>{_("Management setup / reachability guidance")}</summary>
					<div>
						{bootstrap.manual_steps.map((step, index) => (
							<p>
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
	applyManagement: () => Promise<void>,
	managementApplyDisabled: boolean,
	busy: boolean,
): HTMLElement {
	const op = device.provisioning;
	const lifecycle = [
		...Object.entries(op.wan_lifecycle ?? {}).map(([id, item]) => ({
			...item,
			id: `WAN ${id}`,
			kind: "WAN lifecycle",
		})),
		...Object.entries(op.wifi_lifecycle ?? {}).map(([id, item]) => ({
			...item,
			id: `WLAN ${id}`,
			kind: "WLAN lifecycle",
		})),
	];
	return (
		<div class="cbi-section">
			<h3>
				{device.name || device.optical_sn} ({device.adapter})
			</h3>
			{L.hasViewPermission() ? (
				<p>
					<button
						type="button"
						class="cbi-button cbi-button-action"
						disabled={busy}
						onclick={() => reset(device)}
					>
						{_("Reset synchronization state")}
					</button>{" "}
					{_(
						"Clear old tasks and managed-object records after a device factory reset. The next preview or apply reads the device again.",
					)}
				</p>
			) : null}
			<p>
				{text(device.group_name)} · {text(device.template_name)} · OMCI: {state(device.omci_management?.state)}{" "}
				{device.omci_management?.reason || ""}
			</p>
			<p>
				{_("CWMP")}: {state(device.management?.state)} {_("Synchronization")}: {state(op.state)} {_("Wi-Fi")}:{" "}
				{state(device.wifi_sync)}
			</p>
			<p>
				{_("Operation")}: {text(op.operation_id)} ({text(op.mode)}) · {_("Started")}: {date(op.started_at)} ·{" "}
				{_("Revision")}: <code>{text(op.revision)}</code>
			</p>
			{itemTable(op.items ?? [])}
			{op.cwmp_contract ? (
				<div>
					<h4>{_("CWMP contract")}</h4>
					<p>
						{text(op.cwmp_contract.requested)} → <code>{text(op.cwmp_contract.contract)}</code> ·{" "}
						{state(op.cwmp_contract.state)}
					</p>
					<p>
						WAN: {state(op.cwmp_contract.capabilities?.wan)} · WLAN:{" "}
						{state(op.cwmp_contract.capabilities?.wlan)} · {_("Bindings")}:{" "}
						{state(op.cwmp_contract.capabilities?.binding)}
					</p>
					<p>{op.cwmp_contract.reason || ""}</p>
					<p>
						{_("Schema")}: <code>{text(op.cwmp_contract.schema)}</code> · {_("Cache")}:{" "}
						{op.cwmp_contract.cache_hit ? _("Matched") : _("Fresh discovery")}
					</p>
				</div>
			) : null}
			{bootstrapCard(device.acs_bootstrap, applyManagement, managementApplyDisabled)}
			{lifecycle.length ? (
				<div>
					<h4>{_("WAN / WLAN lifecycle results")}</h4>
					{itemTable(lifecycle)}
				</div>
			) : null}
			<details data-device={device.device} open={opened}>
				<summary>{_("Managed objects and lifecycle intent")}</summary>
				<p>
					{_("Wi-Fi cleanup policy")}: {text(op.wifi_cleanup)} · {_("Wi-Fi stage")}: {text(op.wifi_stage)}
				</p>
				<pre style="white-space:pre-wrap;overflow-wrap:anywhere">
					{JSON.stringify(
						{ wan_objects: op.wan_objects ?? {}, wifi_objects: op.wifi_objects ?? {} },
						null,
						2,
					)}
				</pre>
			</details>
		</div>
	);
}

const main = (L.view as any).extend({
	load(): Promise<[SyncStatus, ConfigCheck]> {
		return Promise.all([getSync(), checkConfig()]);
	},
	render([initial, initialCheck]: [SyncStatus, ConfigCheck]): HTMLElement {
		const heading = <p />;
		const error = <p class="alert-message warning" hidden aria-live="polite" />;
		const result = <p aria-live="polite" />;
		const target = (
			<select>
				<option value="all">{_("All devices")}</option>
				{(initial.devices ?? []).map((d) => (
					<option value={d.device}>{d.device}</option>
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
				const reply = await sync("reset_state", device.device);
				if (!reply || reply.error) throw new Error(String(reply?.error ?? "Empty synchronization reply"));
				result.textContent = _(
					"Synchronization state reset for %s. Preview differences to read the current device state.",
				).format(device.name || device.optical_sn);
				update(await getSync());
			} catch (failure) {
				result.textContent = String(failure);
			} finally {
				busy = false;
				update(current);
			}
		};
		const run = async (action: string) => {
			if (busy) return;
			busy = true;
			for (const button of buttons) button.disabled = true;
			update(current);
			try {
				const reply = await sync(action, target.value);
				if (!reply || reply.error) throw new Error(String(reply?.error ?? "Empty synchronization reply"));
				result.textContent = action.startsWith("management_")
					? _("Management operation started; status is refreshed below.")
					: _("Started: %s").format((reply.operation_ids ?? []).join(", "));
				update(await getSync());
			} catch (failure) {
				result.textContent = String(failure);
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
		buttons.push(plan, apply);
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
				<p>
					{managementPlan} {managementApply}
				</p>
			</div>
		);
		const manual = (
			<div class="cbi-section">
				<h3>{_("Manual synchronization")}</h3>
				{/* biome-ignore lint/a11y/noLabelWithoutControl: The select node is inserted inside this label. */}
				<label>
					{_("Target")}: {target}
				</label>{" "}
				{plan} {apply}
			</div>
		);
		const root = (
			<div class="cbi-map">
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
			heading.textContent = `${_("Provisioning")}: ${status.enabled ? _("Enabled") : _("Disabled")} · ${_("Mode")}: ${text(status.mode)} · ${_("Revision")}: ${text(status.revision)} · ${_("Triggers")}: ${(status.triggers ?? []).join(", ")} · ${_("Interval")}: ${text(status.interval)} s`;
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
			managementContent.replaceChildren(
				<div>
					<p>
						{_("State")}: {text(host?.state)} · {_("Desired version")}: {text(host?.desired_version)} ·{" "}
						{_("Applied version")}: {text(host?.applied_version)}
					</p>
					<p>
						{_("Next retry")}: {date(host?.next_retry_at)}
					</p>
					{host?.error ? <p class="alert-message warning">{host.error}</p> : null}
					<p>
						{_(
							"Saving in manual mode does not create interfaces, change firewall rules or configure child devices. Apply explicitly to authorize the current management configuration.",
						)}
					</p>
					<pre style="white-space:pre-wrap;overflow-wrap:anywhere">
						{JSON.stringify(
							{ desired: host?.desired, applied: host?.applied, plan: host?.plan ?? [] },
							null,
							2,
						)}
					</pre>
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
						() => run("management_apply"),
						managementApply.disabled,
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
