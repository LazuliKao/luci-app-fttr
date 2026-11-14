// SPDX-License-Identifier: Apache-2.0

import { isPageHidden } from "../visibility";
import badgeCss from "./components/badge.css?inline";
import { createTabMenu } from "./components/tabs";
import { ViewStyle } from "./components/view-style";
import { requirePage } from "./contracts/capabilities";
import type { DeviceMeta } from "./contracts/hl202";
import { setHl202Badge, text } from "./hl202/dom";
import { createAccountsPanel, createConsolePanel, createReportPanel, isBusy } from "./hl202/panels";
import { list, type Target } from "./hl202/rpc";
import hl202Css from "./hl202.css?inline";
import tokensCss from "./styles/tokens.css?inline";

function renderPage(): HTMLElement {
	const select = (
		<select id="hl202-device" class="cbi-input-select" aria-label={_("HL202 device")} style="min-width:320px" />
	) as HTMLSelectElement;

	const refresh = (
		<button type="button" class="cbi-button cbi-button-action">
			{_("Refresh devices")}
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
			{_("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")}
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
						{_("Open optical status and ONU/MIB details")} →
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
			aria-label={_("Read-only MQTT source")}
			style="min-width:240px"
		/>
	) as HTMLSelectElement;
	const sourceRead = (
		<button type="button" class="cbi-button cbi-button-action" style="margin-left:8px">
			{_("Inspect source report (read-only)")}
		</button>
	) as HTMLButtonElement;
	const sourceDetails = <div style="margin-top:10px" />;
	let sourceTargets: readonly { readonly mqtt_mac: string; readonly binding_generation: string }[] = [];
	const sourcesPre = (
		<pre style="white-space:pre-wrap;overflow-wrap:anywhere;font-size:80%;max-height:200px;overflow-y:auto" />
	);

	const sourcesPanel = (
		<div class="cbi-section hl202-panel-sources">
			<h3 style="margin-bottom:4px">{_("MQTT source identity")}</h3>
			<p style="font-size:85%;color:#888;margin-top:0;margin-bottom:8px">
				{_("Inspect read-only MQTT source reports and diagnostics for unbound or unselected devices.")}
			</p>
			<div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px;margin-bottom:8px">
				<label htmlFor="hl202-source">
					{_("Read-only MQTT source")}: {sourceSelect}
				</label>
				{sourceRead}
			</div>
			{sourceDetails}
			<details style="margin-top:10px">
				<summary style="cursor:pointer;font-size:85%;color:#888;font-weight:600">
					{_("Raw source observations (JSON)")}
				</summary>
				<div style="margin-top:6px">{sourcesPre}</div>
			</details>
		</div>
	);

	type TabId = "report" | "accounts" | "console" | "sources";
	let activeTab: TabId = "report";

	const tabs: Array<{ id: TabId; label: string }> = [
		{ id: "report", label: _("MQTT report") },
		{ id: "accounts", label: _("User management") },
		{ id: "console", label: _("Raw command console") },
		{ id: "sources", label: _("MQTT source identity") },
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

	const tabMenu = createTabMenu(tabs, activeTab, switchTab, tabItems);

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
			summaryNameNode.textContent = _("No HL202 optical devices were found.");
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
			setHl202Badge(summaryOpticalNode, "success", _("Optical online"));
		} else {
			setHl202Badge(summaryOpticalNode, "danger", _("Optical offline"));
		}

		if (device.can_execute && device.mqtt) {
			setHl202Badge(summaryMqttNode, "success", _("MQTT ready"));
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
			setHl202Badge(summaryMqttNode, "warning", _("MQTT unavailable"));
			summaryGenNode.hidden = true;
			deviceWarning.hidden = false;

			reportCtrl.setTarget(null);
			accountsCtrl.setTarget(null);
			consoleCtrl.setTarget(null);
		}
	};

	const reload = async (showLoading = true): Promise<void> => {
		refresh.disabled = true;
		if (showLoading) status.textContent = _("Loading devices…");
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
								`${d.model} / ${d.optical_sn} / ONU ${d.onu_id} — ${d.can_execute ? _("MQTT ready") : _("MQTT unavailable")}; ${d.optical_online ? _("Optical online") : _("Optical offline")}`,
							)}
						</option>
					)),
				);
				if (parsedDevices.some((d) => d.optical_sn === previousVal)) {
					select.value = previousVal;
				}
			}

			status.textContent = parsedDevices.length
				? _("Select a device to inspect reports and run operations.")
				: _("No HL202 optical devices were found.");

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
			status.textContent = cause instanceof Error ? cause.message : _("Request failed");
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
			<ViewStyle styles={[tokensCss, badgeCss, hl202Css]} />
			<h2>{_("HL202 sub-gateway management")}</h2>
			<div class="cbi-section">
				<div style="display:flex;align-items:center;flex-wrap:wrap;gap:10px">
					<label htmlFor="hl202-device" style="display:flex;align-items:center;gap:8px">
						<strong>{_("HL202 device")}:</strong>
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

	// Self-terminating chain: once the view is detached no further timer is
	// scheduled, so no L.Poll.remove teardown is needed (this view has no destroy hook).
	const tick = async (): Promise<void> => {
		if (!root.isConnected) return;
		if (!isPageHidden()) await reload(false);
		if (root.isConnected) window.setTimeout(() => void tick(), 5000);
	};

	window.setTimeout(() => void tick(), 5000);
	return root;
}

const view = L.view;
if (!("extend" in view) || typeof view.extend !== "function") throw new Error("LuCI view extension is unavailable");
const main: unknown = Reflect.apply(view.extend, view, [
	{
		load: () => requirePage("hl202"),
		render: renderPage,
		handleSave: null,
		handleSaveApply: null,
		handleReset: null,
	},
]);

export { main };
