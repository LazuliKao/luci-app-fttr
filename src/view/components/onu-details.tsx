// SPDX-License-Identifier: Apache-2.0

import { getStatus } from "../contracts/api";
import { assertNever, checked } from "../contracts/common";
import {
	type Definition,
	getMib,
	type MibReport,
	mibSnapshot,
	releaseMib,
	startMib,
	type Value,
} from "../contracts/mib";
import type { SubGateway as OnuDetails } from "../contracts/status";
import { BADGE_CSS, BusinessBadge, CwmpBadge, ProvisioningBadge, RegistrationBadge, WifiSyncBadge } from "./badge";
import { formatPower, formatUptime, text } from "./formatters";

const json = (v: unknown): string => JSON.stringify(v, null, 2);
async function reportBlob(report: MibReport): Promise<Blob> {
	const parts: BlobPart[] = ["{"];
	let first = true;
	for (const [key, value] of Object.entries(report)) {
		if (!first) parts.push(",");
		first = false;
		parts.push(JSON.stringify(key), ":");
		if (Array.isArray(value)) {
			parts.push("[");
			for (let index = 0; index < value.length; index++) {
				if (index) parts.push(",");
				const item = JSON.stringify(value[index]);
				if (item === undefined) throw new Error(_("MIB snapshot cannot be serialized"));
				parts.push(item);
				if (index % 32 === 31) await new Promise((resolve) => setTimeout(resolve, 0));
			}
			parts.push("]");
		} else {
			const item = JSON.stringify(value);
			if (item === undefined) throw new Error(_("MIB snapshot cannot be serialized"));
			parts.push(item);
		}
	}
	parts.push("}");
	return new Blob(parts, { type: "application/json" });
}

function jsonPreview(report: MibReport): string {
	return json({
		schema_version: report.schema_version,
		reference_version: report.reference_version,
		onu_id: report.onu_id,
		uploaded_complete: report.uploaded_complete,
		expected_records: report.expected_records,
		received_records: report.received_records,
		decoded_records: report.decoded_records,
		partial_records: report.partial_records,
		basic_records: report.basic_records,
		tables_requested: report.tables_requested,
		tables_collected: report.tables_collected,
		class_count: report.classes.length,
		classes: report.classes.slice(0, 25),
		additional_classes: Math.max(0, report.classes.length - 25),
		record_count: report.records.length,
		first_record: report.records[0] ?? null,
		table_count: report.tables.length,
		diagnostics_count: report.diagnostics.length,
	});
}

function valueText(value: Value | null): string {
	if (value === null) return _("Conflicting values; inspect observations");
	switch (value.type) {
		case "unsigned":
		case "signed":
		case "decimal":
		case "text":
			return text(value.value);
		case "octets":
			return text(value.hex);
		case "table_length":
			return text(value.bytes);
		default:
			return assertNever(value);
	}
}

function reference(definition: Definition): HTMLElement {
	const ref = definition.reference;
	return ref?.url.startsWith("https://github.com/opencord/omci-lib-go/blob/v2.2.4/") ? (
		<a href={ref.url} target="_blank" rel="noopener noreferrer">
			{ref.id}
		</a>
	) : (
		<span>—</span>
	);
}

function browser(report: MibReport): HTMLElement {
	let selectedId: number | null = report.classes.length ? report.classes[0].class_id : null;
	const content = <div class="mib-content" />;
	const filter = (
		<input type="search" class="cbi-input-text mib-search-input" placeholder={_("Search ME name or Class ID…")} />
	) as HTMLInputElement;
	const classes = <div class="mib-class-list" />;
	const classButtons = new Map<number, HTMLElement>();

	function select(id: number): void {
		selectedId = id;
		for (const [classId, btn] of classButtons) {
			if (classId === id) {
				btn.classList.add("active");
			} else {
				btn.classList.remove("active");
			}
		}

		const entities = report.entities.filter((e) => e.class_id === id);
		if (!entities.length) {
			content.replaceChildren(
				<div class="mib-empty-content">
					<p>{_("No entities recorded for this ME class.")}</p>
				</div>,
			);
			return;
		}

		content.replaceChildren(
			...entities.map((entity, index) => (
				<details open={index === 0} class="mib-entity-details">
					<summary class="mib-entity-summary">
						<span class="mib-entity-title">
							<strong>{text(entity.name)}</strong>
							<span class="mib-entity-id-tag">
								{_("Entity")} {entity.entity_id} (0x{entity.entity_id.toString(16)})
							</span>
						</span>
						<span class="mib-entity-support">{entity.support}</span>
					</summary>
					<div class="mib-entity-body">
						{entity.attributes.length ? (
							<table class="table mib-attributes-table">
								<thead>
									<tr>
										<th style="width:28%">{_("Attribute")}</th>
										<th style="width:14%">{_("Type")}</th>
										<th>{_("Value")}</th>
										<th style="width:18%">{_("Definition")}</th>
									</tr>
								</thead>
								<tbody>
									{entity.attributes.map((attribute) => (
										<tr>
											<td class="mib-attr-name">{attribute.definition.name}</td>
											<td class="mib-attr-kind">
												<code>{attribute.definition.kind}</code>
											</td>
											<td class="mib-attr-value">
												<span class="mib-val-display">{valueText(attribute.value)}</span>
												{attribute.observations?.length ? (
													<details class="mib-obs-details">
														<summary>{_("Raw data / observations")}</summary>
														<pre class="mib-pre">{json(attribute.observations)}</pre>
													</details>
												) : null}
											</td>
											<td class="mib-attr-ref">{reference(attribute.definition)}</td>
										</tr>
									))}
								</tbody>
							</table>
						) : (
							<p>{_("Basic display only; raw records are preserved.")}</p>
						)}
						{report.tables
							.filter((t) => t.class_id === id && t.entity_id === entity.entity_id)
							.map((table) => (
								<details class="mib-table-details">
									<summary>
										{table.attribute.name} ·{" "}
										{table.collected ? `${table.rows.length} ${_("rows")}` : text(table.error)}
									</summary>
									{table.vlan_rules.length ? (
										<div class="mib-table-overflow">
											<table class="table">
												<thead>
													<tr>
														<th>{_("Outer filter (priority / VID / TPID-DEI)")}</th>
														<th>{_("Inner filter (priority / VID / TPID-DEI)")}</th>
														<th>{_("EtherType code")}</th>
														<th>{_("Remove tags")}</th>
														<th>{_("Outer treatment (priority / VID / TPID-DEI)")}</th>
														<th>{_("Inner treatment (priority / VID / TPID-DEI)")}</th>
														<th>{_("Delete entry")}</th>
													</tr>
												</thead>
												<tbody>
													{table.vlan_rules.map((rule) => (
														<tr>
															<td>{`${rule.filter_outer_priority} / ${rule.filter_outer_vid} / ${rule.filter_outer_tpid_dei}`}</td>
															<td>{`${rule.filter_inner_priority} / ${rule.filter_inner_vid} / ${rule.filter_inner_tpid_dei}`}</td>
															<td>{text(rule.filter_ethertype)}</td>
															<td>{text(rule.tags_to_remove)}</td>
															<td>{`${rule.treatment_outer_priority} / ${rule.treatment_outer_vid} / ${rule.treatment_outer_tpid_dei}`}</td>
															<td>{`${rule.treatment_inner_priority} / ${rule.treatment_inner_vid} / ${rule.treatment_inner_tpid_dei}`}</td>
															<td>{text(rule.delete_entry)}</td>
														</tr>
													))}
												</tbody>
											</table>
										</div>
									) : null}
									<p style="margin-top:6px">
										{_("G.988 encoded field values")}: {reference(table.attribute)}
									</p>
									<pre class="mib-pre">
										{json(table.vlan_rules.length ? table.vlan_rules : table.rows)}
									</pre>
								</details>
							))}
						<details class="mib-diag-details">
							<summary>{_("Records / diagnostics")}</summary>
							<pre class="mib-pre">
								{json({
									diagnostics: entity.diagnostics,
									records: report.records.filter(
										(r) => r.class_id === id && r.entity_id === entity.entity_id,
									),
								})}
							</pre>
						</details>
					</div>
				</details>
			)),
		);
	}

	function list(): void {
		const query = filter.value.trim().toLowerCase();
		classButtons.clear();
		const filtered = report.classes.filter((c) => `${c.class_id} ${c.name ?? ""}`.toLowerCase().includes(query));
		if (!filtered.length) {
			classes.replaceChildren(<div class="mib-empty-list">{_("No matching ME classes")}</div>);
			return;
		}
		classes.replaceChildren(
			...filtered.map((c) => {
				const btn = (
					<button
						type="button"
						class={`mib-class-btn${c.class_id === selectedId ? " active" : ""}`}
						onclick={() => select(c.class_id)}
					>
						<span class="mib-class-id">{c.class_id}</span>
						<span class="mib-class-name" title={c.name ?? _("Unknown class")}>
							{c.name ?? _("Unknown class")}
						</span>
						<span class="mib-class-count">{c.entities}</span>
					</button>
				) as HTMLElement;
				classButtons.set(c.class_id, btn);
				return btn;
			}),
		);
	}

	filter.addEventListener("input", list);
	list();
	if (report.classes.length) select(report.classes[0].class_id);

	return (
		<div class="mib-browser">
			<div class="mib-sidebar">
				<div class="mib-search-box">{filter}</div>
				{classes}
			</div>
			{content}
		</div>
	);
}

function renderStatusChips(report: MibReport): HTMLElement {
	return (
		<div class="mib-chips">
			<span class="mib-chip mib-chip-primary">ONU {report.onu_id}</span>
			<span class={`mib-chip ${report.uploaded_complete ? "mib-chip-success" : "mib-chip-warning"}`}>
				{report.uploaded_complete ? _("Upload complete") : _("Upload incomplete")}
			</span>
			<span class="mib-chip mib-chip-info">
				{_("Records")}: {report.received_records}
				{report.expected_records !== report.received_records ? ` / ${report.expected_records}` : ""}
			</span>
			<span class="mib-chip">
				{_("Decoded")}: {report.decoded_records}
			</span>
			{report.partial_records > 0 ? (
				<span class="mib-chip mib-chip-warning">
					{_("Partial")}: {report.partial_records}
				</span>
			) : null}
			<span class="mib-chip mib-chip-neutral">
				{_("Basic")}: {report.basic_records}
			</span>
			<span class="mib-chip">
				{report.tables_collected ? _("VLAN tables collected") : _("VLAN tables not collected")}
			</span>
			<span class="mib-chip mib-chip-subtle">{new Date().toLocaleTimeString()}</span>
		</div>
	);
}

export function showOnuDetails(initial: OnuDetails, initialTab = "basic"): void {
	let closed = false;
	let busy = false;
	let report: MibReport | null = null;
	let job: string | null = null;

	type DetailRowValue = Node | string | number | null | undefined;
	interface DetailGroup {
		title: string;
		rows: [string, DetailRowValue][];
	}

	const basicGroups: DetailGroup[] = [
		{
			title: _("Device identification"),
			rows: [
				[_("Vendor"), initial.vendor],
				[_("Model"), initial.identity?.equipment_id ?? initial.model],
				[_("Optical serial"), <code style="font-size:90%">{initial.serial_number}</code>],
				[_("ONU ID"), initial.onu_id],
				[_("Hardware version"), initial.identity?.hardware_version ?? initial.hardware_version],
				[_("Software images"), initial.identity?.software_images?.join(", ") ?? initial.firmware_version],
				[
					_("OMCC version"),
					initial.identity?.omcc_version == null ? null : (
						<code style="font-size:90%">0x{initial.identity.omcc_version.toString(16)}</code>
					),
				],
			],
		},
		{
			title: _("Optical & link status"),
			rows: [
				[_("Registration"), <RegistrationBadge state={initial.state} />],
				[_("Business"), <BusinessBadge status={initial.business_status} />],
				[_("Receive optical power"), formatPower(initial.optical_rx_power_dbm)],
				[_("Transmit optical power"), formatPower(initial.optical_tx_power_dbm)],
				[
					_("Equalization delay (EQD)"),
					initial.equalization_delay_bits == null ? (
						"—"
					) : (
						<code style="font-size:90%">{initial.equalization_delay_bits} bits</code>
					),
				],
				[
					_("Data interface"),
					initial.data_path?.interface ? (
						<code style="font-size:90%">{initial.data_path.interface}</code>
					) : null,
				],
				[
					_("Uptime"),
					initial.uptime_seconds == null
						? null
						: `${formatUptime(initial.uptime_seconds)} (${Math.floor(initial.uptime_seconds)} s)`,
				],
			],
		},
		{
			title: _("Management & cache"),
			rows: [
				[_("CWMP"), <CwmpBadge management={initial.management} />],
				[
					_("Last Inform"),
					initial.management?.last_inform
						? `${new Date(initial.management.last_inform * 1000).toLocaleString()}${
								initial.management.age_seconds != null ? ` (${initial.management.age_seconds} s)` : ""
							}`
						: null,
				],
				[_("Provisioning"), <ProvisioningBadge provisioning={initial.provisioning} />],
				[_("Wi-Fi sync"), <WifiSyncBadge state={initial.wifi_sync} />],
				[
					_("Identity source"),
					initial.identity
						? initial.identity_current === false
							? _("Cached identity")
							: initial.identity_current === true
								? _("Current registration")
								: _("Registration freshness unavailable")
						: _("Not collected"),
				],
				[_("Identity age"), initial.identity_age_seconds == null ? null : `${initial.identity_age_seconds} s`],
				[_("Identity read errors"), initial.identity?.errors?.join("; ")],
			],
		},
	];

	const basic = (
		<div class="onu-basic-container">
			{basicGroups.map((group) => (
				<div class="cbi-section onu-basic-section">
					<h3 class="onu-basic-title">{group.title}</h3>
					<table class="table onu-basic-table">
						<tbody>
							{group.rows.map(([name, value]) => (
								<tr>
									<th style="width:35%">{name}</th>
									<td>{value instanceof Node ? value : text(value)}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			))}
		</div>
	);

	const statusContainer = (
		<div class="mib-status-bar" role="status">
			<span class="mib-hint-text">{_("Read MIB on demand. Results are a snapshot, not live polling.")}</span>
		</div>
	) as HTMLElement;

	const progressBar = (
		<div class="cbi-progressbar" style="display:none;width:100%" title="0%">
			<div style="width:0%" />
		</div>
	) as HTMLElement;

	const results = <div />;
	const raw = (<pre class="onu-raw-pre" />) as HTMLElement;
	const downloadMessage = <span class="download-status" role="status" />;
	let downloadUrl: string | null = null;

	const download = (
		<button
			type="button"
			class="cbi-button cbi-button-action"
			disabled
			onclick={async () => {
				if (!report || closed) return;
				download.disabled = true;
				downloadMessage.textContent = _("Preparing JSON download…");
				try {
					const blob = await reportBlob(report);
					if (closed) return;
					if (downloadUrl) URL.revokeObjectURL(downloadUrl);
					downloadUrl = URL.createObjectURL(blob);
					const anchor = document.createElement("a");
					anchor.href = downloadUrl;
					anchor.download = `mib-${initial.serial_number}.json`;
					anchor.click();
					downloadMessage.textContent = _("JSON download started");
					window.setTimeout(() => {
						URL.revokeObjectURL(anchor.href);
						if (downloadUrl === anchor.href) downloadUrl = null;
					}, 1000);
				} catch (error) {
					downloadMessage.textContent = String(error);
				} finally {
					download.disabled = !report || closed;
				}
			}}
		>
			{_("Download JSON")}
		</button>
	) as HTMLButtonElement;

	const rawPanel = (
		<div class="onu-raw-panel">
			<div class="onu-raw-toolbar">
				<span class="onu-raw-hint">
					{_("This is a lightweight preview. Download JSON to save the complete MIB snapshot.")}
				</span>
				<div class="onu-raw-actions">
					{download}
					{downloadMessage}
				</div>
			</div>
			{raw}
		</div>
	);

	const read = (
		<button type="button" class="cbi-button cbi-button-apply" onclick={() => run(false)}>
			{_("Read MIB")}
		</button>
	) as HTMLButtonElement;

	const tables = (
		<button type="button" class="cbi-button cbi-button-action" onclick={() => run(true)}>
			{_("Read MIB and VLAN tables")}
		</button>
	) as HTMLButtonElement;

	const mib = (
		<div class="onu-mib-panel">
			<div class="mib-controls">
				<div class="mib-action-group">
					{read}
					{tables}
					<small class="mib-action-hint">
						{_("Collecting VLAN tables queries extended filter tables and takes longer.")}
					</small>
				</div>
				{statusContainer}
				{progressBar}
			</div>
			{results}
		</div>
	);

	const panels: Record<string, HTMLElement> = { basic, mib, raw: rawPanel };
	const tabItems = new Map<string, HTMLElement>();

	function tab(name: string): void {
		for (const [key, panel] of Object.entries(panels)) {
			if (key === name) panel.style.removeProperty("display");
			else panel.style.setProperty("display", "none", "important");
		}
		for (const [key, li] of tabItems) {
			li.className = key === name ? "cbi-tab" : "cbi-tab-disabled";
		}
	}

	const tabsList = [
		{ id: "basic", label: _("Basic information") },
		{ id: "mib", label: "OMCI / MIB" },
		{ id: "raw", label: _("Raw JSON") },
	];

	const tabMenu = (
		<ul class="cbi-tabmenu" style="margin:0;padding-left:0;display:flex;flex-wrap:wrap">
			{tabsList.map((t) => {
				const li = (
					<li class={t.id === initialTab ? "cbi-tab" : "cbi-tab-disabled"} data-tab={t.id}>
						<a
							href={`#tab-${t.id}`}
							onclick={(e: MouseEvent) => {
								e.preventDefault();
								tab(t.id);
							}}
						>
							{t.label}
						</a>
					</li>
				) as HTMLElement;
				tabItems.set(t.id, li);
				return li;
			})}
		</ul>
	);

	const header = <div class="onu-details-header">{tabMenu}</div>;

	const dialogRoot = (
		<div class="onu-details-dialog">
			<style>
				{`
				.onu-details-dialog {
					--fttr-border: rgba(127, 127, 127, 0.22);
					--fttr-card-bg: rgba(127, 127, 127, 0.04);
					--fttr-hover-bg: rgba(127, 127, 127, 0.1);
					--fttr-active-bg: rgba(52, 152, 219, 0.16);
					--fttr-active-color: #3498db;

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

					display: flex;
					flex-direction: column;
				}
				@media (prefers-color-scheme: dark) {
					.onu-details-dialog {
						--fttr-border: rgba(255, 255, 255, 0.14);
						--fttr-card-bg: rgba(255, 255, 255, 0.03);
						--fttr-hover-bg: rgba(255, 255, 255, 0.08);
						--fttr-active-bg: rgba(52, 152, 219, 0.25);
						--fttr-active-color: #5dade2;

						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}
				${BADGE_CSS}
				.onu-details-header {
					margin-bottom: 12px;
					border-bottom: 1px solid var(--fttr-border);
					padding-bottom: 4px;
				}
				.onu-details-header .cbi-tabmenu {
					border-bottom: none;
					margin: 0;
				}
				.onu-raw-toolbar {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: wrap;
					gap: 12px;
					margin-bottom: 10px;
				}
				.onu-raw-hint {
					font-size: 0.9em;
					opacity: 0.8;
				}
				.onu-raw-actions {
					display: flex;
					align-items: center;
					gap: 8px;
				}
				.onu-raw-actions .download-status {
					font-size: 0.85em;
					opacity: 0.8;
				}
				.mib-controls {
					margin-bottom: 12px;
					display: flex;
					flex-direction: column;
					gap: 8px;
				}
				.mib-action-group {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					gap: 8px;
				}
				.mib-action-hint {
					opacity: 0.7;
					font-size: 0.85em;
				}
				.mib-status-bar {
					min-height: 26px;
					display: flex;
					align-items: center;
					font-size: 0.9em;
				}
				.mib-hint-text {
					opacity: 0.75;
					font-style: italic;
				}
				.mib-error-text {
					color: #e74c3c;
				}
				.mib-chips {
					display: flex;
					flex-wrap: wrap;
					gap: 6px;
					align-items: center;
				}
				.mib-chip {
					display: inline-flex;
					align-items: center;
					font-size: 0.82em;
					padding: 2px 8px;
					border-radius: 4px;
					background: var(--fttr-hover-bg);
					border: 1px solid var(--fttr-border);
				}
				.mib-chip-primary {
					background: rgba(52, 152, 219, 0.15);
					border-color: rgba(52, 152, 219, 0.35);
					color: var(--fttr-active-color);
					font-weight: 600;
				}
				.mib-chip-success {
					background: rgba(46, 204, 113, 0.15);
					border-color: rgba(46, 204, 113, 0.35);
					color: #27ae60;
				}
				.mib-chip-warning {
					background: rgba(243, 156, 18, 0.15);
					border-color: rgba(243, 156, 18, 0.35);
					color: #d35400;
				}
				.mib-chip-info {
					background: rgba(155, 89, 182, 0.15);
					border-color: rgba(155, 89, 182, 0.35);
					color: #8e44ad;
				}
				.mib-chip-neutral {
					opacity: 0.85;
				}
				.mib-chip-subtle {
					opacity: 0.65;
					font-size: 0.8em;
				}
				.mib-browser {
					display: flex;
					height: 520px;
					border: 1px solid var(--fttr-border);
					border-radius: 6px;
					overflow: hidden;
					background: var(--fttr-card-bg);
				}
				.mib-sidebar {
					width: 270px;
					min-width: 240px;
					display: flex;
					flex-direction: column;
					border-right: 1px solid var(--fttr-border);
					background: var(--fttr-card-bg);
				}
				.mib-search-box {
					padding: 8px;
					border-bottom: 1px solid var(--fttr-border);
				}
				.mib-search-input {
					width: 100% !important;
					box-sizing: border-box;
					height: 32px;
					font-size: 0.9em;
				}
				.mib-class-list {
					flex: 1;
					overflow-y: auto;
					padding: 4px;
				}
				.mib-class-btn {
					display: flex;
					align-items: center;
					width: 100%;
					padding: 6px 8px;
					margin-bottom: 2px;
					border: none;
					border-left: 3px solid transparent;
					border-radius: 3px;
					background: transparent;
					color: inherit;
					font-size: 0.88em;
					text-align: left;
					cursor: pointer;
					box-sizing: border-box;
				}
				.mib-class-btn:hover {
					background: var(--fttr-hover-bg);
				}
				.mib-class-btn.active {
					background: var(--fttr-active-bg);
					color: var(--fttr-active-color);
					font-weight: 600;
					border-left-color: var(--fttr-active-color);
				}
				.mib-class-id {
					font-family: monospace;
					margin-right: 6px;
					opacity: 0.7;
					min-width: 24px;
					text-align: right;
				}
				.mib-class-name {
					flex: 1;
					overflow: hidden;
					text-overflow: ellipsis;
					white-space: nowrap;
					padding: 0 4px;
				}
				.mib-class-count {
					font-size: 0.78em;
					padding: 1px 6px;
					border-radius: 10px;
					background: var(--fttr-hover-bg);
					opacity: 0.8;
				}
				.mib-content {
					flex: 1;
					min-width: 0;
					overflow-y: auto;
					padding: 12px 16px;
				}
				.mib-empty-list, .mib-empty-content {
					padding: 20px;
					text-align: center;
					opacity: 0.7;
					font-style: italic;
				}
				.mib-entity-details {
					margin-bottom: 12px;
					border: 1px solid var(--fttr-border);
					border-radius: 5px;
					overflow: hidden;
				}
				.mib-entity-details > summary {
					padding: 8px 12px;
					background: var(--fttr-hover-bg);
					cursor: pointer;
					display: flex;
					justify-content: space-between;
					align-items: center;
					user-select: none;
					font-size: 0.95em;
				}
				.mib-entity-title {
					display: flex;
					align-items: center;
					gap: 8px;
				}
				.mib-entity-id-tag {
					font-size: 0.85em;
					opacity: 0.75;
					font-family: monospace;
				}
				.mib-entity-support {
					font-size: 0.8em;
					padding: 2px 6px;
					border-radius: 3px;
					background: var(--fttr-card-bg);
					border: 1px solid var(--fttr-border);
					opacity: 0.85;
				}
				.mib-entity-body {
					padding: 10px 12px;
				}
				.mib-attributes-table {
					width: 100%;
					margin-bottom: 10px;
					font-size: 0.9em;
				}
				.mib-attr-name {
					font-weight: 500;
					word-break: break-word;
				}
				.mib-attr-kind code {
					font-size: 0.85em;
				}
				.mib-attr-value {
					word-break: break-all;
				}
				.mib-val-display {
					font-family: monospace;
				}
				.mib-obs-details {
					margin-top: 4px;
					font-size: 0.85em;
				}
				.mib-obs-details summary {
					cursor: pointer;
					color: var(--fttr-active-color);
				}
				.mib-pre {
					white-space: pre-wrap;
					overflow-wrap: anywhere;
					max-height: 180px;
					overflow-y: auto;
					padding: 6px 8px;
					background: var(--fttr-card-bg);
					border-radius: 4px;
					font-size: 0.85em;
				}
				.mib-table-overflow {
					overflow-x: auto;
					max-width: 100%;
					margin-top: 8px;
					margin-bottom: 8px;
				}
				.mib-table-details {
					margin-top: 10px;
					border: 1px solid var(--fttr-border);
					border-radius: 4px;
					padding: 6px 10px;
				}
				.mib-table-details summary {
					cursor: pointer;
					font-weight: 500;
				}
				.mib-diag-details {
					margin-top: 10px;
					font-size: 0.9em;
				}
				.mib-diag-details summary {
					cursor: pointer;
					opacity: 0.75;
				}
				.mib-upload-diagnostics {
					margin-top: 12px;
					border: 1px solid var(--fttr-border);
					border-radius: 4px;
					padding: 6px 10px;
				}
				.mib-upload-diagnostics summary {
					cursor: pointer;
					font-weight: 500;
				}
				.onu-basic-container {
					display: flex;
					flex-direction: column;
					gap: 14px;
					max-height: 60vh;
					overflow-y: auto;
					padding-right: 4px;
				}
				.onu-basic-section {
					margin-bottom: 0 !important;
					padding: 10px 14px;
					border: 1px solid var(--fttr-border);
					border-radius: 6px;
					background: var(--fttr-card-bg);
				}
				.onu-basic-title {
					margin-top: 0.2em;
					margin-bottom: 0.6em;
					font-size: 1.05em;
				}
				.onu-basic-table {
					width: 100%;
					margin-bottom: 0;
				}
				.onu-basic-table th {
					opacity: 0.75;
					font-weight: normal;
				}
				.onu-raw-panel {
					max-height: 60vh;
					display: flex;
					flex-direction: column;
					gap: 8px;
				}
				.onu-raw-pre {
					flex: 1;
					max-height: 50vh;
					overflow: auto;
					white-space: pre-wrap;
					overflow-wrap: anywhere;
					padding: 10px;
					background: var(--fttr-card-bg);
					border: 1px solid var(--fttr-border);
					border-radius: 4px;
				}
				.onu-details-footer {
					margin-top: 14px;
					display: flex;
					justify-content: flex-end;
				}
				`}
			</style>
			{header}
			{basic}
			{mib}
			{rawPanel}
			<div class="right onu-details-footer">
				<button
					type="button"
					class="cbi-button"
					onclick={() => {
						closed = true;
						if (downloadUrl) URL.revokeObjectURL(downloadUrl);
						downloadUrl = null;
						report = null;
						raw.textContent = "";
						results.replaceChildren();
						L.ui.hideModal();
					}}
				>
					{_("Close")}
				</button>
			</div>
		</div>
	) as HTMLElement;

	const active = (): boolean => !closed && dialogRoot.isConnected && dialogRoot.getClientRects().length > 0;

	async function run(withTables: boolean): Promise<void> {
		if (busy) return;
		busy = true;
		read.disabled = tables.disabled = true;
		progressBar.style.display = "";
		progressBar.title = "0%";
		(progressBar.firstElementChild as HTMLElement).style.width = "0%";
		statusContainer.textContent = _("Reading MIB…");
		try {
			const status = await getStatus();
			const current = status.sub_gateways?.find((o) => o.serial_number === initial.serial_number);
			if (current?.state !== "o5_operation")
				throw new Error(_("Device is offline; reopen details after registration."));
			if (!active()) return;
			const started = await startMib(current.onu_id, current.serial_number, withTables);
			job = started.job;
			const deadline = Date.now() + 140000;
			while (active()) {
				const result = await getMib(started.job, 0);
				if (!active()) return;
				if (result.status === "ready") {
					if (
						!result.chunks ||
						result.chunks > 1024 ||
						!result.bytes ||
						result.bytes > 32 * 1024 * 1024 ||
						result.chunk !== 0 ||
						!result.data
					)
						throw new Error(_("Invalid MIB snapshot"));
					const buffer = new Uint8Array(result.bytes);
					let offset = 0;
					for (let chunk = 0; chunk < result.chunks; chunk++) {
						const part = chunk === 0 ? result : await getMib(started.job, chunk);
						if (!active()) return;
						if (
							part.status !== "ready" ||
							part.chunk !== chunk ||
							part.chunks !== result.chunks ||
							part.bytes !== result.bytes ||
							!part.data
						)
							throw new Error(_("Invalid MIB snapshot chunk"));
						const decoded = atob(part.data);
						if (decoded.length > 32768 || offset + decoded.length > buffer.length)
							throw new Error(_("Invalid MIB snapshot size"));
						for (let index = 0; index < decoded.length; index++)
							buffer[offset++] = decoded.charCodeAt(index);
						const pct = Math.min(100, Math.round(((chunk + 1) / result.chunks) * 100));
						progressBar.title = `${pct}%`;
						(progressBar.firstElementChild as HTMLElement).style.width = `${pct}%`;
						statusContainer.textContent = `${_("Downloading MIB snapshot")}: ${chunk + 1}/${result.chunks}`;
					}
					if (offset !== buffer.length) throw new Error(_("Incomplete MIB snapshot"));
					await releaseJob();
					const snapshot = mibSnapshot.parse(
						checked(JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(buffer))),
					);
					report = snapshot.report;
					if (report.schema_version !== 1 || report.onu_id !== current.onu_id)
						throw new Error(_("Unexpected MIB response"));

					progressBar.style.display = "none";
					statusContainer.replaceChildren(renderStatusChips(report));
					results.replaceChildren(
						browser(report),
						<details class="mib-upload-diagnostics">
							<summary>{_("Upload diagnostics")}</summary>
							<pre class="mib-pre">{json(report.diagnostics)}</pre>
						</details>,
					);
					raw.textContent = jsonPreview(report);
					download.disabled = false;
					return;
				}
				if (result.progress) {
					const { phase, received, expected } = result.progress;
					statusContainer.textContent =
						phase === "starting"
							? _("Starting OMCI MIB read…")
							: phase === "tables"
								? `${_("Collecting VLAN tables")}${expected == null ? "" : `: ${received}/${expected}`}`
								: expected == null
									? _("Reading OMCI MIB records…")
									: `${_("Reading OMCI MIB records")}: ${received}/${expected}`;
					if (expected && expected > 0) {
						const pct = Math.min(100, Math.round((received / expected) * 100));
						progressBar.title = `${pct}%`;
						(progressBar.firstElementChild as HTMLElement).style.width = `${pct}%`;
					}
				}
				if (Date.now() >= deadline) throw new Error(_("MIB query timed out; retry."));
				await new Promise((resolve) => setTimeout(resolve, 1000));
			}
		} catch (error) {
			if (active()) {
				progressBar.style.display = "none";
				statusContainer.replaceChildren(
					<span class="mib-error-text">
						{String(error)}
						{report ? ` · ${_("Previous snapshot retained")}` : ""}
					</span>,
				);
			}
		} finally {
			await releaseJob();
			busy = false;
			read.disabled = tables.disabled = false;
		}
	}

	async function releaseJob(): Promise<void> {
		if (!job) return;
		const completedJob = job;
		job = null;
		try {
			await releaseMib(completedJob);
		} catch (error) {
			console.warn("Failed to release MIB snapshot", error);
		}
	}

	tab(initialTab);
	L.ui.showModal(`${initial.model} — ${initial.serial_number}`, dialogRoot, "modal-wide");
}
