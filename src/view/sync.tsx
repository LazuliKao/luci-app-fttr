// SPDX-License-Identifier: Apache-2.0

import { checkConfig, getSync, type SyncAction, sync } from "./contracts/api";
import type { AcsBootstrap, ConfigCheck, DeviceSync, Lifecycle, SyncItem, SyncStatus } from "./contracts/provisioning";

const STATE_I18N: Record<string, { label: string; type: "success" | "warning" | "danger" | "info" | "neutral" }> = {
	ready: { label: "就绪", type: "success" },
	verified: { label: "已校验", type: "success" },
	online: { label: "在线", type: "success" },
	completed: { label: "已完成", type: "success" },
	applied: { label: "已应用", type: "success" },
	waiting_inform: { label: "等待 Inform", type: "warning" },
	pending: { label: "待同步", type: "warning" },
	awaiting_apply: { label: "待应用授权", type: "warning" },
	syncing: { label: "同步中", type: "info" },
	discovering: { label: "探测中", type: "info" },
	not_started: { label: "未启动", type: "neutral" },
	disabled: { label: "已禁用", type: "neutral" },
	enabled: { label: "已启用", type: "success" },
	interrupted: { label: "已中断", type: "danger" },
	failed: { label: "已失败", type: "danger" },
	stale: { label: "已失效", type: "warning" },
	error: { label: "异常", type: "danger" },
	deleted: { label: "已删除", type: "neutral" },
};

const STATE_EN_LABELS: Record<string, string> = {
	waiting_inform: "Waiting Inform",
	not_started: "Not Started",
	awaiting_apply: "Awaiting Apply",
	ready: "Ready",
	verified: "Verified",
	online: "Online",
	completed: "Completed",
	applied: "Applied",
	syncing: "Syncing",
	discovering: "Discovering",
	disabled: "Disabled",
	enabled: "Enabled",
	interrupted: "Interrupted",
	failed: "Failed",
	stale: "Stale",
	error: "Error",
	deleted: "Deleted",
	pending: "Pending",
};

const I18N_DICT: Record<string, string> = {
	"FTTR synchronization": "FTTR 配置同步",
	Provisioning: "配置下发引擎",
	Mode: "工作模式",
	Revision: "版本号",
	Triggers: "触发事件",
	Interval: "轮询间隔",
	Enabled: "已启用",
	Disabled: "已禁用",
	"Isolated TR069 management network": "TR069 隔离管理网络",
	"Management network": "管理网络",
	"Management interface": "管理接口",
	"Management VLAN": "管理 VLAN",
	Priority: "优先级",
	"Service IP / Netmask": "服务 IP / 掩码",
	"ACS URL": "ACS 服务地址",
	"DHCP service": "DHCP 服务",
	"Desired version": "期望版本",
	"Applied version": "已应用版本",
	"Next retry": "下次重试",
	Synchronized: "已同步",
	"Pending apply": "待应用",
	"Check management differences (read-only)": "检查管理差异（只读）",
	"Apply management configuration": "应用管理网络配置",
	"Saving in manual mode does not create interfaces, change firewall rules or configure child devices. Apply explicitly to authorize the current management configuration.":
		"手动模式下保存不会自动创建接口、修改防火墙规则或配置子网关。请显式点击应用以授权并生效当前管理配置。",
	"Pending configuration changes": "待生效配置变更",
	"No pending changes. Management network is in sync.": "无待生效变更，管理网络处于同步状态。",
	"Advanced diagnostics / Raw configuration (JSON)": "高级诊断 / 原始配置差异 (JSON)",
	"Manual synchronization": "手动同步操作",
	Target: "目标对象",
	"All devices": "全部子网关",
	"Preview differences (read-only)": "预览差异（只读）",
	"Apply differences": "下发差异配置",
	"Reset synchronization state": "重置同步状态",
	"Clear old tasks and managed-object records after a device factory reset. The next preview or apply reads the device again.":
		"在子网关恢复出厂设置后清除历史任务和托管对象记录，下次预览或下发将重新读取该设备状态。",
	"Are you sure you want to reset the synchronization state for %s?":
		"确定要重置 %s 的同步状态吗？重置后将清除历史任务记录，重新同步。",
	"Configuration item": "配置项",
	Type: "类型",
	State: "状态",
	"Evidence freshness": "证据时效",
	"Last update / task": "最后更新 / 任务",
	"Reason / desired changes": "原因 / 期望变更",
	"Current configuration": "当前修订",
	"Previous configuration": "历史修订",
	"Management fresh": "有效",
	"Management stale": "失效",
	Task: "任务",
	"No desired items configured.": "未配置期望同步项。",
	"CWMP contract": "CWMP 契约能力",
	Capabilities: "能力集",
	Bindings: "绑定关系",
	Schema: "数据模型",
	Cache: "契约缓存",
	Matched: "已命中缓存",
	"Fresh discovery": "全新探测发现",
	"ACS bootstrap": "ACS 引导与接入",
	Method: "引导方式",
	Attempts: "重试次数",
	"Command in progress": "指令执行中",
	"Authorize and apply management settings": "授权并应用管理设置",
	"Required after management drift or service restart; verifies the child ACS settings before business synchronization.":
		"管理网络配置漂移或服务重启后必需；在业务同步前校验子网关 ACS 设置。",
	"MQTT target": "MQTT 主题",
	"Last telemetry": "最后遥测",
	"Identity source": "标识来源",
	"Settings verified": "设置校验时间",
	"Last Inform": "最后 Inform",
	Generation: "迭代代数",
	Updated: "更新时间",
	"Local ACS listener": "本地 ACS 监听器",
	"Management setup / reachability guidance": "管理网络配置与可达性排障指引",
	"WAN / WLAN lifecycle results": "WAN / WLAN 生命周期结果",
	"Managed objects and lifecycle intent": "托管对象与生命周期意图",
	"Wi-Fi cleanup policy": "Wi-Fi 清理策略",
	"Wi-Fi stage": "Wi-Fi 阶段",
	Operation: "操作 ID",
	Started: "启动时间",
	Group: "分组",
	Template: "模板",
	"Synchronization state reset for %s. Preview differences to read the current device state.":
		"已重置 %s 的同步状态。请点击“预览差异”以读取该设备的最新状态。",
	"Management operation started; status is refreshed below.": "管理网络操作已启动，最新状态将在下方刷新。",
	"Started: %s": "已启动操作：%s",
	"Status refresh failed: %s": "状态刷新失败：%s",
	None: "无",
};

function tr(key: string): string {
	const translated = _(key);
	const isZh = /zh/i.test(
		document.documentElement.getAttribute("lang") ||
			(window as unknown as { L?: { env?: { lang?: string } } }).L?.env?.lang ||
			navigator.language ||
			"",
	);
	if (isZh && I18N_DICT[key]) return I18N_DICT[key];
	return translated || key;
}

const text = (value: unknown): string => (value === null || value === undefined || value === "" ? "—" : String(value));
const date = (value?: number | null): string => (value ? new Date(value * 1000).toLocaleString() : "—");

function renderStateBadge(value?: string): HTMLElement {
	if (!value) return <span class="fttr-badge fttr-badge-neutral">—</span>;
	const isZh = /zh/i.test(
		document.documentElement.getAttribute("lang") ||
			(window as unknown as { L?: { env?: { lang?: string } } }).L?.env?.lang ||
			navigator.language ||
			"",
	);
	const entry = STATE_I18N[value];
	const label = isZh ? entry?.label || value : STATE_EN_LABELS[value] || value;
	const badgeType = entry?.type || "neutral";
	return (
		<span class={`fttr-badge fttr-badge-${badgeType}`} title={value}>
			{label}
		</span>
	);
}

function renderFreshness(currentRev?: boolean, mgmtFresh?: boolean): HTMLElement {
	return (
		<div style="display:flex;flex-direction:column;gap:3px;align-items:flex-start">
			{currentRev === true ? (
				<span class="fttr-badge fttr-badge-info" style="font-size:78%">
					{tr("Current configuration")}
				</span>
			) : currentRev === false ? (
				<span class="fttr-badge fttr-badge-neutral" style="font-size:78%">
					{tr("Previous configuration")}
				</span>
			) : (
				<span>—</span>
			)}
			{mgmtFresh === true ? (
				<span class="fttr-badge fttr-badge-success" style="font-size:78%">
					{tr("Management fresh")}
				</span>
			) : mgmtFresh === false ? (
				<span class="fttr-badge fttr-badge-warning" style="font-size:78%">
					{tr("Management stale")}
				</span>
			) : null}
		</div>
	);
}

type ItemRow = Partial<Omit<SyncItem, "kind">> & Lifecycle & { id: string; kind: string };
function itemTable(items: ItemRow[]): HTMLElement {
	return (
		<div class="table-wrapper">
			<table class="table">
				<thead>
					<tr>
						<th>{tr("Configuration item")}</th>
						<th>{tr("Type")}</th>
						<th>{tr("State")}</th>
						<th>{tr("Evidence freshness")}</th>
						<th>{tr("Last update / task")}</th>
						<th>{tr("Reason / desired changes")}</th>
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
										{item.service_type === "wifi" || item.kind === "ssid"
											? "Wi-Fi"
											: item.service_type === "wan" || item.kind === "wan_activation"
												? "WAN"
												: text(item.service_type || item.kind)}
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
											{tr("Task")} #{item.task_id}
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
								{tr("No desired items configured.")}
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
				<h4 style="margin:0">{tr("ACS bootstrap")}</h4>
				<div style="display:flex;align-items:center;gap:6px">
					{renderStateBadge(bootstrap.state)}
					{bootstrap.inflight ? (
						<span class="fttr-badge fttr-badge-info">{tr("Command in progress")}</span>
					) : null}
				</div>
			</div>

			<div class="fttr-card">
				<div class="fttr-grid-3">
					<div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{tr("Method")}</span>
							<code>{text(bootstrap.method)}</code>
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{tr("Attempts")}</span>
							<span>{text(bootstrap.attempts)}</span>
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{tr("Identity source")}</span>
							<span>{text(bootstrap.binding_source)}</span>
						</div>
					</div>
					<div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{tr("Management VLAN")}</span>
							<span>
								{bootstrap.desired?.vlan !== undefined
									? `VLAN ${bootstrap.desired.vlan} (Prio ${bootstrap.desired.priority ?? 0})`
									: "—"}
							</span>
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{tr("ACS URL")}</span>
							<code style="font-size:80%">{text(bootstrap.desired?.acs_url)}</code>
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{tr("Local ACS listener")}</span>
							<code style="font-size:80%">
								{bootstrap.listener?.listen
									? `${bootstrap.listener.listen}${bootstrap.listener.path || ""}`
									: "—"}
							</code>
						</div>
					</div>
					<div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{tr("Last telemetry")}</span>
							<span style="font-size:85%">{date(bootstrap.mqtt_last_seen)}</span>
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{tr("Last Inform")}</span>
							<span style="font-size:85%">{date(bootstrap.last_inform)}</span>
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{tr("Settings verified")}</span>
							<span style="font-size:85%">{date(bootstrap.settings_verified_at)}</span>
						</div>
					</div>
				</div>

				{bootstrap.mqtt_target ? (
					<div style="font-size:85%;color:#666;margin-top:6px;border-top:1px dashed rgba(127,140,141,0.15);padding-top:6px">
						<span style="color:#888">{tr("MQTT target")}:</span> <code>{bootstrap.mqtt_target}</code>
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
							{tr("Authorize and apply management settings")}
						</button>{" "}
						<span style="font-size:85%;color:#666">
							{tr(
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
						{tr("Management setup / reachability guidance")}
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
	applyManagement: () => Promise<void>,
	managementApplyDisabled: boolean,
	busy: boolean,
): HTMLElement {
	const op = device.provisioning;
	const lifecycle = [
		...Object.entries(op.wan_lifecycle ?? {}).map(([id, item]) => ({
			...item,
			id: `WAN ${id}`,
			kind: "WAN",
		})),
		...Object.entries(op.wifi_lifecycle ?? {}).map(([id, item]) => ({
			...item,
			id: `WLAN ${id}`,
			kind: "Wi-Fi",
		})),
	];

	const confirmReset = () => {
		const label = device.name || device.optical_sn;
		if (
			window.confirm(tr("Are you sure you want to reset the synchronization state for %s?").replace("%s", label))
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
							<span class="fttr-badge fttr-badge-neutral" title={tr("Group")}>
								{device.group_name}
							</span>
						) : null}
						{device.template_name ? (
							<span class="fttr-badge fttr-badge-neutral" title={tr("Template")}>
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
						<button
							type="button"
							class="fttr-btn-subtle"
							disabled={busy}
							title={tr(
								"Clear old tasks and managed-object records after a device factory reset. The next preview or apply reads the device again.",
							)}
							onclick={confirmReset}
						>
							{tr("Reset synchronization state")}
						</button>
					</div>
				) : null}
			</div>

			<div class="fttr-device-status-strip">
				<div class="fttr-status-pill-group">
					<span>
						<span class="fttr-pill-label">CWMP:</span> {renderStateBadge(device.management?.state)}
					</span>
					<span>
						<span class="fttr-pill-label">{tr("Synchronization")}:</span> {renderStateBadge(op.state)}
					</span>
					<span>
						<span class="fttr-pill-label">Wi-Fi:</span> {renderStateBadge(device.wifi_sync)}
					</span>
				</div>
				<div class="fttr-status-op-info">
					<span>
						{tr("Operation")}: <strong>{text(op.operation_id)}</strong> ({text(op.mode)})
					</span>
					<span>·</span>
					<span>
						{tr("Started")}: {date(op.started_at)}
					</span>
					<span>·</span>
					<span>
						{tr("Revision")}: <code>{text(op.revision)}</code>
					</span>
				</div>
			</div>

			{itemTable(op.items ?? [])}

			{op.cwmp_contract ? (
				<div style="margin-top:1.2em">
					<h4 style="margin-bottom:0.5em">{tr("CWMP contract")}</h4>
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
								<span style="color:#888">{tr("Bindings")}:</span>{" "}
								{renderStateBadge(op.cwmp_contract.capabilities?.binding)}
							</span>
							<span>
								<span style="color:#888">{tr("Cache")}:</span>{" "}
								<span class="fttr-badge fttr-badge-info" style="font-size:80%">
									{op.cwmp_contract.cache_hit ? tr("Matched") : tr("Fresh discovery")}
								</span>
							</span>
						</div>
						{op.cwmp_contract.schema ? (
							<div style="font-size:85%;color:#666">
								{tr("Schema")}: <code>{op.cwmp_contract.schema}</code>
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
					<h4 style="margin-bottom:0.5em">{tr("WAN / WLAN lifecycle results")}</h4>
					{itemTable(lifecycle)}
				</div>
			) : null}

			<details data-device={device.device} open={opened} style="margin-top:1em">
				<summary style="cursor:pointer;user-select:none;font-weight:600">
					{tr("Managed objects and lifecycle intent")}
				</summary>
				<div style="padding:8px 0">
					<div style="display:flex;gap:16px;flex-wrap:wrap;font-size:90%;margin-bottom:6px">
						<span>
							<span style="color:#888">{tr("Wi-Fi cleanup policy")}:</span> {text(op.wifi_cleanup)}
						</span>
						<span>
							<span style="color:#888">{tr("Wi-Fi stage")}:</span> {text(op.wifi_stage)}
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
	load(): Promise<[SyncStatus, ConfigCheck]> {
		return Promise.all([getSync(), checkConfig()]);
	},
	render([initial, initialCheck]: [SyncStatus, ConfigCheck]): HTMLElement {
		const heading = <div />;
		const error = <p class="alert-message warning" hidden aria-live="polite" />;
		const result = <div class="fttr-sync-result" aria-live="polite" style="margin:10px 0" />;
		const target = (
			<select class="cbi-input-select">
				<option value="all">{tr("All devices")}</option>
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
						{tr(
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

		const run = async (action: SyncAction) => {
			if (busy) return;
			busy = true;
			for (const button of buttons) button.disabled = true;
			update(current);
			try {
				const reply = await sync(action, target.value);
				const msg = action.startsWith("management_")
					? tr("Management operation started; status is refreshed below.")
					: tr("Started: %s").replace("%s", "operation_ids" in reply ? reply.operation_ids.join(", ") : "—");
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
				{tr("Preview differences (read-only)")}
			</button>
		) as HTMLButtonElement;
		const apply = (
			<button type="button" class="cbi-button cbi-button-positive" onclick={() => run("apply")}>
				{tr("Apply differences")}
			</button>
		) as HTMLButtonElement;
		buttons.push(plan, apply);

		const managementPlan = (
			<button type="button" class="cbi-button cbi-button-action" onclick={() => run("management_plan")}>
				{tr("Check management differences (read-only)")}
			</button>
		) as HTMLButtonElement;
		const managementApply = (
			<button type="button" class="cbi-button cbi-button-positive" onclick={() => run("management_apply")}>
				{tr("Apply management configuration")}
			</button>
		) as HTMLButtonElement;
		buttons.push(managementPlan, managementApply);

		const managementPanel = (
			<div class="cbi-section">
				<h3>{tr("Isolated TR069 management network")}</h3>
				{managementContent}
				<p style="margin-top:10px">
					{managementPlan} {managementApply}
				</p>
			</div>
		);

		const manual = (
			<div class="cbi-section">
				<h3>{tr("Manual synchronization")}</h3>
				<div style="display:flex;align-items:center;flex-wrap:wrap;gap:12px">
					{/* biome-ignore lint/a11y/noLabelWithoutControl: The select node is inserted inside this label. */}
					<label style="display:flex;align-items:center;gap:8px">
						<span>{tr("Target")}:</span>
						{target}
					</label>
					<div style="display:flex;gap:8px">
						{plan}
						{apply}
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
				<h2>{tr("FTTR synchronization")}</h2>
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
						<strong style="margin-right:.4em">{tr("Provisioning")}:</strong>
						<span class={`fttr-badge ${status.enabled ? "fttr-badge-success" : "fttr-badge-neutral"}`}>
							{status.enabled ? tr("Enabled") : tr("Disabled")}
						</span>
					</span>
					<span>
						<span style="color:#888;margin-right:.3em">{tr("Mode")}:</span>
						<span class="fttr-badge fttr-badge-info">{text(status.mode)}</span>
					</span>
					<span>
						<span style="color:#888;margin-right:.3em">{tr("Revision")}:</span>
						<code>{text(status.revision)}</code>
					</span>
					{(status.triggers ?? []).length ? (
						<span>
							<span style="color:#888;margin-right:.3em">{tr("Triggers")}:</span>
							<code>{(status.triggers ?? []).join(", ")}</code>
						</span>
					) : null}
					{status.interval ? (
						<span>
							<span style="color:#888;margin-right:.3em">{tr("Interval")}:</span>
							<span>{status.interval} s</span>
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
								? tr("All devices")
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
							<span class="fttr-pill-label">{tr("State")}:</span> {renderStateBadge(host?.state)}
						</span>
						<span>
							<span class="fttr-pill-label">{tr("Desired version")}:</span>{" "}
							<code>{text(host?.desired_version)}</code>
						</span>
						<span>
							<span class="fttr-pill-label">{tr("Applied version")}:</span>{" "}
							<code>{text(host?.applied_version)}</code>
						</span>
						{host?.desired_version || host?.applied_version ? (
							<span>
								{isSync ? (
									<span class="fttr-badge fttr-badge-success">{tr("Synchronized")}</span>
								) : (
									<span class="fttr-badge fttr-badge-warning">{tr("Pending apply")}</span>
								)}
							</span>
						) : null}
						{host?.next_retry_at ? (
							<span>
								<span class="fttr-pill-label">{tr("Next retry")}:</span> {date(host.next_retry_at)}
							</span>
						) : null}
					</div>

					<div class="fttr-grid-3">
						<div class="fttr-card">
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">{tr("Management interface")}</span>
								<strong>—</strong>
							</div>
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">{tr("Management VLAN")}</span>
								<span>
									VLAN {text(configuration?.vlan.join(", "))} (Prio {text(configuration?.priority)})
								</span>
							</div>
						</div>
						<div class="fttr-card">
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">{tr("Service IP / Netmask")}</span>
								<code>{text(configuration?.address)}</code>
							</div>
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">{tr("DHCP service")}</span>
								<span>
									{configuration === null ? (
										"—"
									) : configuration.dhcp_enabled ? (
										<span class="fttr-badge fttr-badge-success">{tr("Enabled")}</span>
									) : (
										<span class="fttr-badge fttr-badge-neutral">{tr("Disabled")}</span>
									)}
								</span>
							</div>
						</div>
						<div class="fttr-card">
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">{tr("ACS URL")}</span>
								<code style="font-size:80%">{text(configuration?.acs_url)}</code>
							</div>
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">{tr("Mode")}</span>
								<span>{text(configuration?.mode)}</span>
							</div>
						</div>
					</div>

					{planChanges.length ? (
						<div style="margin-top:10px">
							<h5 style="margin-bottom:4px;font-size:90%">{tr("Pending configuration changes")}</h5>
							<div class="table-wrapper">
								<table class="table" style="font-size:85%">
									<thead>
										<tr>
											<th>{tr("Operation")}</th>
											<th>{tr("Configuration item")}</th>
											<th>{tr("Reason / desired changes")}</th>
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
						{tr(
							"Saving in manual mode does not create interfaces, change firewall rules or configure child devices. Apply explicitly to authorize the current management configuration.",
						)}
					</p>

					<details style="margin-top:6px;margin-bottom:10px">
						<summary style="cursor:pointer;user-select:none;font-size:85%;color:#666">
							{tr("Advanced diagnostics / Raw configuration (JSON)")}
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
