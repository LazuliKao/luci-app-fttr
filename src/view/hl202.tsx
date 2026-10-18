// SPDX-License-Identifier: Apache-2.0

import type { DeviceMeta } from "./contracts/hl202";
import { text, tr } from "./hl202/dom";
import { createAccountsPanel, createConsolePanel, createReportPanel, isBusy } from "./hl202/panels";
import { list, type Target } from "./hl202/rpc";

function renderPage(): HTMLElement {
	const select = (
		<select id="hl202-device" class="cbi-input-select" aria-label={tr("HL202 device")} style="min-width:320px" />
	) as HTMLSelectElement;

	const refresh = (
		<button type="button" class="cbi-button cbi-button-action">
			{tr("Refresh devices")}
		</button>
	) as HTMLButtonElement;

	const status = <div style="font-size:88%;color:#888;margin:6px 0" aria-live="polite" />;

	// Top Device Status Card elements
	const summaryNameNode = <strong>—</strong>;
	const summaryModelNode = (
		<span class="hl202-badge hl202-badge-neutral" style="font-size:80%">
			—
		</span>
	);
	const summaryOpticalNode = <span class="hl202-badge hl202-badge-neutral">—</span>;
	const summaryMqttNode = <span class="hl202-badge hl202-badge-neutral">—</span>;
	const summaryGenNode = (
		<span class="hl202-badge hl202-badge-info" style="font-size:80%">
			—
		</span>
	);
	const deviceWarning = (
		<div class="alert-message warning" style="margin-top:8px" hidden>
			{tr("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")}
		</div>
	);

	const deviceOverviewCard = (
		<div class="cbi-section hl202-device-card" style="margin-bottom:0">
			<div class="hl202-card-header">
				<div class="hl202-device-title">
					{summaryNameNode}
					{summaryModelNode}
				</div>
				<div class="hl202-device-badges">
					{summaryOpticalNode}
					{summaryMqttNode}
					{summaryGenNode}
				</div>
				<div class="hl202-device-links">
					<a href={L.url("admin", "network", "fttr", "hardware")} class="fttr-btn-subtle">
						{tr("Open optical status and ONU/MIB details")} →
					</a>
				</div>
			</div>
			{deviceWarning}
		</div>
	);

	// Persistent Panels
	const reportCtrl = createReportPanel();
	const accountsCtrl = createAccountsPanel();
	const consoleCtrl = createConsolePanel();

	// Diagnostic Panel: Sources
	const sourceSelect = (
		<select
			id="hl202-source"
			class="cbi-input-select"
			aria-label={tr("Read-only MQTT source")}
			style="min-width:240px"
		/>
	) as HTMLSelectElement;
	const sourceRead = (
		<button type="button" class="cbi-button cbi-button-action" style="margin-left:8px">
			{tr("Inspect source report (read-only)")}
		</button>
	) as HTMLButtonElement;
	const sourceDetails = <div style="margin-top:10px" />;
	let sourceTargets: readonly { readonly mqtt_mac: string; readonly binding_generation: string }[] = [];
	const sourcesPre = (
		<pre style="white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto" />
	);

	const sourcesPanel = (
		<div class="cbi-section hl202-panel-sources">
			<h3 style="margin-bottom:4px">{tr("MQTT source identity")}</h3>
			<p style="font-size:85%;color:#888;margin-top:0;margin-bottom:8px">
				{tr("Inspect read-only MQTT source reports and diagnostics for unbound or unselected devices.")}
			</p>
			<div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px">
				<label htmlFor="hl202-source">
					{tr("Read-only MQTT source")}: {sourceSelect}
				</label>
				{sourceRead}
			</div>
			{sourceDetails}
			<details style="margin-top:10px">
				<summary style="cursor:pointer;font-size:85%;color:#888;font-weight:600">
					{tr("Raw source observations (JSON)")}
				</summary>
				<div style="margin-top:6px">{sourcesPre}</div>
			</details>
		</div>
	);

	type TabId = "report" | "accounts" | "console" | "sources";
	let activeTab: TabId = "report";

	const tabs: Array<{ id: TabId; label: string }> = [
		{ id: "report", label: tr("MQTT report") },
		{ id: "accounts", label: tr("User management") },
		{ id: "console", label: tr("Raw command console") },
		{ id: "sources", label: tr("MQTT source identity") },
	];

	const tabItems = new Map<TabId, HTMLElement>();

	const switchTab = (id: TabId): void => {
		activeTab = id;
		for (const [tId, li] of tabItems) {
			li.className = tId === id ? "cbi-tab" : "cbi-tab-disabled";
		}
		reportCtrl.element.hidden = id !== "report";
		accountsCtrl.element.hidden = id !== "accounts";
		consoleCtrl.element.hidden = id !== "console";
		sourcesPanel.hidden = id !== "sources";
		window.dispatchEvent(new Event("resize"));
	};

	const tabMenu = (
		<ul class="cbi-tabmenu" style="margin-top:14px;margin-bottom:0">
			{tabs.map((tab) => {
				const li = (
					<li class={activeTab === tab.id ? "cbi-tab" : "cbi-tab-disabled"} data-tab={tab.id}>
						<a
							href={`#tab-${tab.id}`}
							onclick={(e: MouseEvent) => {
								e.preventDefault();
								switchTab(tab.id);
							}}
						>
							{tab.label}
						</a>
					</li>
				) as HTMLElement;
				tabItems.set(tab.id, li);
				return li;
			})}
		</ul>
	);

	// Initially show first tab
	reportCtrl.element.hidden = false;
	accountsCtrl.element.hidden = true;
	consoleCtrl.element.hidden = true;
	sourcesPanel.hidden = true;

	const panelsContainer = (
		<div id="hl202-panels-container">
			{reportCtrl.element}
			{accountsCtrl.element}
			{consoleCtrl.element}
			{sourcesPanel}
		</div>
	);

	let currentDevices: DeviceMeta[] = [];
	let previousDeviceFingerprint = "";
	let reportRevision = "";

	const show = (): void => {
		const selectedSn = select.value;
		const device = currentDevices.find((d) => d.optical_sn === selectedSn);

		if (!device) {
			summaryNameNode.textContent = tr("No HL202 optical devices were found.");
			summaryModelNode.textContent = "—";
			summaryOpticalNode.textContent = "—";
			summaryMqttNode.textContent = "—";
			summaryGenNode.textContent = "—";
			deviceWarning.hidden = true;
			reportCtrl.setTarget(null);
			accountsCtrl.setTarget(null);
			consoleCtrl.setTarget(null);
			return;
		}

		summaryNameNode.textContent = `${device.optical_sn} (ONU ${device.onu_id})`;
		summaryModelNode.textContent = device.model || "HL202";

		if (device.optical_online) {
			summaryOpticalNode.className = "hl202-badge hl202-badge-success";
			summaryOpticalNode.textContent = tr("Optical online");
		} else {
			summaryOpticalNode.className = "hl202-badge hl202-badge-danger";
			summaryOpticalNode.textContent = tr("Optical offline");
		}

		if (device.can_execute && device.mqtt) {
			summaryMqttNode.className = "hl202-badge hl202-badge-success";
			summaryMqttNode.textContent = tr("MQTT ready");
			summaryGenNode.textContent = `gen: ${device.mqtt.binding_generation}`;
			summaryGenNode.hidden = false;
			deviceWarning.hidden = true;

			const target: Target = {
				optical_sn: device.optical_sn,
				onu_id: device.onu_id,
				binding_generation: device.mqtt.binding_generation,
			};

			reportCtrl.setTarget(target);
			accountsCtrl.setTarget(target);
			consoleCtrl.setTarget(target);
		} else {
			summaryMqttNode.className = "hl202-badge hl202-badge-warning";
			summaryMqttNode.textContent = tr("MQTT unavailable");
			summaryGenNode.hidden = true;
			deviceWarning.hidden = false;

			reportCtrl.setTarget(null);
			accountsCtrl.setTarget(null);
			consoleCtrl.setTarget(null);
		}
	};

	const reload = async (): Promise<void> => {
		refresh.disabled = true;
		status.textContent = tr("Loading devices…");
		try {
			const response = await list();
			const parsedDevices = response.devices;

			currentDevices = parsedDevices;

			// Compare fingerprint before rebuilding select options to avoid destroying open menu
			const fingerprint = parsedDevices
				.map(
					(d) =>
						`${d.optical_sn}:${d.onu_id}:${d.optical_online}:${d.can_execute}:${d.report_revision}:${d.mqtt?.binding_generation}`,
				)
				.join("|");

			if (fingerprint !== previousDeviceFingerprint) {
				previousDeviceFingerprint = fingerprint;
				const previousVal = select.value;
				select.replaceChildren(
					...parsedDevices.map((d) => (
						<option value={d.optical_sn}>
							{text(
								`${d.model} / ${d.optical_sn} / ONU ${d.onu_id} — ${d.can_execute ? tr("MQTT ready") : tr("MQTT unavailable")}; ${d.optical_online ? tr("Optical online") : tr("Optical offline")}`,
							)}
						</option>
					)),
				);
				if (parsedDevices.some((d) => d.optical_sn === previousVal)) {
					select.value = previousVal;
				}
			}

			status.textContent = parsedDevices.length
				? tr("Select a device to inspect reports and run operations.")
				: tr("No HL202 optical devices were found.");

			// Update diagnostics sources
			sourcesPre.textContent = JSON.stringify(response.sources, null, 2);
			const previousSource = sourceSelect.value;
			const observations: { mqtt_mac: string; binding_generation: string }[] = [];
			sourceSelect.replaceChildren();
			for (const src of response.sources) {
				observations.push({ mqtt_mac: src.mqtt_mac, binding_generation: src.binding_generation });
				sourceSelect.append(
					<option value={src.mqtt_mac}>{text(`${src.mqtt_mac} — ${String(src.reason)}`)}</option>,
				);
			}
			sourceTargets = observations;
			if (observations.some((s) => s.mqtt_mac === previousSource)) {
				sourceSelect.value = previousSource;
			}
			sourceRead.disabled = observations.length === 0;

			show();

			// Auto refresh report if revision changed
			const selectedDev = parsedDevices.find((d) => d.optical_sn === select.value);
			if (
				selectedDev?.can_execute &&
				selectedDev.report_revision !== null &&
				`${selectedDev.optical_sn}:${selectedDev.mqtt?.binding_generation}:${selectedDev.report_revision}` !==
					reportRevision &&
				!isBusy()
			) {
				reportRevision = `${selectedDev.optical_sn}:${selectedDev.mqtt?.binding_generation}:${selectedDev.report_revision}`;
				void reportCtrl.refresh();
			}
		} catch (cause: unknown) {
			currentDevices = [];
			show();
			status.textContent = cause instanceof Error ? cause.message : tr("Request failed");
		} finally {
			refresh.disabled = false;
		}
	};

	select.addEventListener("change", show);

	sourceRead.addEventListener("click", () => {
		const target = sourceTargets.find((s) => s.mqtt_mac === sourceSelect.value);
		sourceDetails.replaceChildren();
		if (target) {
			const panel = createReportPanel();
			panel.setTarget(target);
			sourceDetails.append(panel.element);
			void panel.refresh(target);
		}
	});

	refresh.addEventListener("click", () => {
		void reload();
	});

	void reload();

	const root = (
		<div class="cbi-map hl202-management">
			<style>
				{`
				.hl202-management {
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
					.hl202-management {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .hl202-management,
				[data-theme="dark"] .hl202-management {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-danger-color: #e74c3c;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				.hl202-management .hl202-badge {
					display: inline-block;
					padding: 0.18em 0.55em;
					font-size: 85%;
					font-weight: 600;
					line-height: 1.25;
					border-radius: 3px;
					white-space: nowrap;
					text-align: center;
				}

				.hl202-management .hl202-badge-success {
					background: var(--fttr-success-bg);
					color: var(--fttr-success-color);
					border: 1px solid var(--fttr-success-border);
				}

				.hl202-management .hl202-badge-warning {
					background: var(--fttr-warning-bg);
					color: var(--fttr-warning-color);
					border: 1px solid var(--fttr-warning-border);
				}

				.hl202-management .hl202-badge-danger {
					background: var(--fttr-danger-bg);
					color: var(--fttr-danger-color);
					border: 1px solid var(--fttr-danger-border);
				}

				.hl202-management .hl202-badge-info {
					background: var(--fttr-info-bg);
					color: var(--fttr-info-color);
					border: 1px solid var(--fttr-info-border);
				}

				.hl202-management .hl202-badge-neutral {
					background: var(--fttr-neutral-bg);
					color: var(--fttr-neutral-color);
					border: 1px solid var(--fttr-neutral-border);
				}

				.hl202-management .hl202-device-card {
					padding: 12px 16px;
					border: 1px solid rgba(127, 140, 141, 0.2);
					border-radius: 6px;
					background: rgba(127, 140, 141, 0.04);
					margin-top: 10px;
					margin-bottom: 0;
				}

				.hl202-management .hl202-card-header {
					display: flex;
					align-items: center;
					justify-content: space-between;
					flex-wrap: wrap;
					gap: 12px;
				}

				.hl202-management .hl202-device-title {
					display: flex;
					align-items: center;
					gap: 8px;
				}

				.hl202-management .hl202-device-badges {
					display: flex;
					align-items: center;
					gap: 8px;
					flex-wrap: wrap;
				}

				.hl202-management .cbi-tabmenu {
					margin-top: 14px;
					margin-bottom: 0;
					user-select: none;
				}

				.hl202-management #hl202-panels-container > .cbi-section {
					margin-top: 0;
					border-top-left-radius: 0;
				}

				.hl202-management .hl202-terminal {
					background: #1e1e1e;
					color: #d4d4d4;
					font-family: Consolas, Monaco, "Courier New", monospace;
					border: 1px solid #333;
					border-radius: 4px;
					box-sizing: border-box;
				}

				.hl202-management .hl202-terminal-textarea {
					width: 100%;
					padding: 10px 12px;
					background: transparent;
					color: inherit;
					font-family: inherit;
					font-size: 90%;
					border: none;
					resize: vertical;
					outline: none;
					line-height: 1.45;
				}

				.hl202-management .hl202-terminal-output {
					background: #141414;
					color: #38ef7d;
					font-family: Consolas, Monaco, "Courier New", monospace;
					font-size: 88%;
					padding: 12px 14px;
					border-radius: 4px;
					border: 1px solid #2a2a2a;
					max-height: 28rem;
					overflow: auto;
					white-space: pre-wrap;
					word-break: break-all;
					line-height: 1.4;
					margin-top: 8px;
				}

				.hl202-management .hl202-snippets {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					gap: 6px;
					margin-bottom: 8px;
				}

				.hl202-management .hl202-snippet-tag {
					font-size: 80%;
					padding: 2px 8px;
					border-radius: 3px;
					border: 1px solid rgba(127, 140, 141, 0.35);
					background: rgba(127, 140, 141, 0.08);
					color: inherit;
					cursor: pointer;
					transition: all 0.15s ease;
				}

				.hl202-management .hl202-snippet-tag:hover {
					background: rgba(52, 152, 219, 0.15);
					border-color: rgba(52, 152, 219, 0.4);
					color: #2980b9;
				}

				.hl202-management .fttr-btn-subtle {
					font-size: 82%;
					padding: 2px 8px;
					border: 1px solid rgba(127, 140, 141, 0.35);
					background: transparent;
					color: inherit;
					border-radius: 4px;
					cursor: pointer;
					text-decoration: none;
				}

				.hl202-management .fttr-btn-subtle:hover {
					background: rgba(52, 152, 219, 0.1);
					border-color: rgba(52, 152, 219, 0.4);
					color: #2980b9;
				}

				.hl202-management :is(.cbi-dropdown,.fluent-custom-select) {
					width: 100%;
					max-width: 100%;
					min-width: 0 !important;
					box-sizing: border-box;
				}

				.hl202-management :is(.cbi-dropdown,.fluent-custom-select) > ul > li {
					white-space: normal;
					overflow-wrap: anywhere;
				}
				`}
			</style>
			<h2>{tr("HL202 sub-gateway management")}</h2>
			<div class="cbi-section">
				<div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px">
					<label htmlFor="hl202-device" style="display:flex;align-items:center;gap:8px">
						<strong>{tr("HL202 device")}:</strong>
						{select}
					</label>
					{refresh}
				</div>
				{status}
				{deviceOverviewCard}
			</div>
			{tabMenu}
			{panelsContainer}
		</div>
	);

	const poll = async (): Promise<void> => {
		if (!root.isConnected) return;
		await reload();
		if (root.isConnected) window.setTimeout(() => void poll(), 5000);
	};

	window.setTimeout(() => void poll(), 5000);
	return root;
}

const view = L.view;
if (!("extend" in view) || typeof view.extend !== "function") throw new Error("LuCI view extension is unavailable");
const main: unknown = Reflect.apply(view.extend, view, [
	{ render: renderPage, handleSave: null, handleSaveApply: null, handleReset: null },
]);

export { main };
