// SPDX-License-Identifier: Apache-2.0

import type { PlatformInfoReply } from "../api/generated/types";
import { isPageHidden } from "../visibility";
import badgeCss from "./components/badge.css?inline";
import { createFecMonitor } from "./components/fec-monitor";
import { formatAge, formatFirmware, formatPower, text } from "./components/formatters";
import { createFpgaDiagnostics } from "./components/fpga-diagnostics";
import { showOnuDetails } from "./components/onu-details";
import { capturePanelState } from "./components/panel-state";
import { createTabMenu } from "./components/tabs";
import { ViewStyle } from "./components/view-style";
import { getPlatformInfo, getStatus } from "./contracts/api";
import { eqdText, type FttrStatus as FttrHardwareStatus, type SubGateway } from "./contracts/status";
import hardwareCss from "./hardware.css?inline";
import tokensCss from "./styles/tokens.css?inline";

const view = L.view;

function renderStateBadge(stateVal?: string): HTMLElement {
	if (!stateVal) return <span class="fttr-badge fttr-badge-neutral">—</span>;
	if (stateVal === "o5_operation" || stateVal === "online" || stateVal === "ready" || stateVal === "connected") {
		return (
			<span class="fttr-badge fttr-badge-success" title={stateVal}>
				{stateVal === "o5_operation" ? _("Connected") : _("Ready")}
			</span>
		);
	}
	if (stateVal.includes("O4") || stateVal.includes("ranging") || stateVal.includes("sync")) {
		return (
			<span class="fttr-badge fttr-badge-warning" title={stateVal}>
				{stateVal}
			</span>
		);
	}
	return (
		<span class="fttr-badge fttr-badge-neutral" title={stateVal}>
			{stateVal}
		</span>
	);
}

function renderCdrBadge(locked: boolean | null): HTMLElement {
	if (locked === null) return <span class="fttr-badge fttr-badge-neutral">{_("Unknown")}</span>;
	return locked ? (
		<span class="fttr-badge fttr-badge-success">{_("Locked")}</span>
	) : (
		<span class="fttr-badge fttr-badge-warning">{_("Unlocked")}</span>
	);
}

function createControllerPanel(status: FttrHardwareStatus, platform: PlatformInfoReply): HTMLElement {
	const optical = status.optical_transceiver;
	const mac = status.pon_mac;
	const fpgaStatusNode = (
		<span
			class={`fttr-badge ${status.fpga_status === "ready" ? "fttr-badge-success" : "fttr-badge-neutral"}`}
			style="font-size:95%"
		>
			{status.fpga_status === "ready" ? _("Ready") : text(status.fpga_status)}
		</span>
	);

	const cards: HTMLElement[] = [];
	if (platform.operations.fpga_diagnostics) {
		cards.push(
			<div class="fttr-card">
				<h4 style="margin-top:0;margin-bottom:8px;font-size:95%">{_("FPGA status")}</h4>
				<div class="fttr-kv-row">
					<span class="fttr-kv-label">0x01000004</span>
					<code>
						{mac?.register == null ? _("Unknown") : `0x${mac.register.toString(16).padStart(8, "0")}`}
					</code>
				</div>
				{mac?.error ? <p class="alert-message warning">{mac.error}</p> : null}
				<div class="fttr-kv-row">
					<span class="fttr-kv-label">{_("FPGA status")}</span>
					<span>{fpgaStatusNode}</span>
				</div>
				<div class="fttr-kv-row">
					<span class="fttr-kv-label">{_("FPGA identifier")}</span>
					<code>{text(status.fpga_status)}</code>
				</div>
			</div>,
		);
	}
	if (platform.operations.transceiver_telemetry) {
		cards.push(
			<div class="fttr-card">
				<h4 style="margin-top:0;margin-bottom:8px;font-size:95%">{_("Optical transceiver")}</h4>
				<div class="fttr-kv-row">
					<span class="fttr-kv-label">{_("Module model")}</span>
					<strong>{text(optical.model)}</strong>
				</div>
				<div class="fttr-kv-row">
					<span class="fttr-kv-label">{_("TX wavelength")}</span>
					<span>{optical.wavelength_tx_nm ? `${optical.wavelength_tx_nm} nm` : "—"}</span>
				</div>
				<div class="fttr-kv-row">
					<span class="fttr-kv-label">{_("RX wavelength")}</span>
					<span>{optical.wavelength_rx_nm ? `${optical.wavelength_rx_nm} nm` : "—"}</span>
				</div>
				<div class="fttr-kv-row">
					<span class="fttr-kv-label">{_("CDR lock")}</span>
					<span>{renderCdrBadge(optical.cdr_locked)}</span>
				</div>
			</div>,
		);
		cards.push(
			<div class="fttr-card">
				<h4 style="margin-top:0;margin-bottom:8px;font-size:95%">{_("Physical rates and diagnostics")}</h4>
				<div class="fttr-kv-row">
					<span class="fttr-kv-label">{_("Downlink PHY rate")}</span>
					<span>{optical.phy_rate_downlink_gbps ? `${optical.phy_rate_downlink_gbps} Gbps` : "—"}</span>
				</div>
				<div class="fttr-kv-row">
					<span class="fttr-kv-label">{_("Uplink PHY rate")}</span>
					<span>{optical.phy_rate_uplink_gbps ? `${optical.phy_rate_uplink_gbps} Gbps` : "—"}</span>
				</div>
				<div class="fttr-kv-row">
					<span class="fttr-kv-label">{_("Temperature")}</span>
					<span>{optical.temperature_celsius == null ? "—" : `${optical.temperature_celsius} °C`}</span>
				</div>
				<div class="fttr-kv-row">
					<span class="fttr-kv-label">{_("TX power")}</span>
					<span>{formatPower(optical.tx_power_dbm)}</span>
				</div>
				<div class="fttr-kv-row">
					<span class="fttr-kv-label">{_("Voltage")}</span>
					<span>{optical.vcc_voltage == null ? "—" : `${optical.vcc_voltage} V`}</span>
				</div>
				<div class="fttr-kv-row">
					<span class="fttr-kv-label">{_("Bias current")}</span>
					<span>{optical.laser_bias_current_ma == null ? "—" : `${optical.laser_bias_current_ma} mA`}</span>
				</div>
			</div>,
		);
	}

	return (
		<div class="cbi-section fttr-panel-controller">
			<h3 style="margin-bottom:12px">{_("Controller hardware")}</h3>
			{cards.length ? (
				<div class="fttr-grid-3">{cards}</div>
			) : (
				<p>{_("No controller diagnostics are reported by the selected platform.")}</p>
			)}
		</div>
	);
}

function createSubgatewaysPanel(onus: SubGateway[]): HTMLElement {
	if (!onus.length) {
		return (
			<div class="cbi-section fttr-panel-subgateways">
				<p style="text-align:center;color:#888;padding:2em 0">
					{_("No sub-gateways are currently registered.")}
				</p>
			</div>
		);
	}

	return (
		<div class="fttr-panel-subgateways">
			{onus.map((onu) => {
				const identity = onu.identity;
				const softwareImages = identity?.software_images ?? [];
				const fw = formatFirmware(onu.firmware_version);
				const freshness = onu.identity
					? onu.identity_current
						? _("Current registration")
						: _("Cached identity")
					: _("Not collected");

				const freshnessBadge = (
					<span
						class={`fttr-badge ${onu.identity_current ? "fttr-badge-info" : "fttr-badge-neutral"}`}
						style="font-size:80%"
					>
						{freshness}
					</span>
				);

				return (
					<div class="cbi-section fttr-onu-card">
						<div class="fttr-card-header">
							<div class="fttr-card-title-group">
								<h3 style="margin:0">
									{_("Sub-gateway %s — %s").format(String(onu.onu_id), text(onu.model))}
								</h3>
								<div class="fttr-card-meta-tags">
									<span class="fttr-badge fttr-badge-neutral">{onu.vendor}</span>
									<code>{onu.serial_number}</code>
									{renderStateBadge(onu.state)}
									{freshnessBadge}
								</div>
							</div>
							<div>
								<button
									type="button"
									class="fttr-btn-subtle"
									onclick={() => showOnuDetails(onu, "mib")}
								>
									{_("View OMCI / MIB details")} →
								</button>
							</div>
						</div>

						<div class="fttr-grid-2">
							<div class="fttr-card">
								<h4 style="margin-top:0;margin-bottom:6px;font-size:92%;color:#888">
									{_("Optical physical layer and link parameters")}
								</h4>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{_("Optical RX power")}</span>
									<strong>{formatPower(onu.optical_rx_power_dbm)}</strong>
								</div>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{_("Optical TX power")}</span>
									<strong>{formatPower(onu.optical_tx_power_dbm)}</strong>
								</div>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{_("Equalization delay (EQD)")}</span>
									<span>{eqdText(onu.equalization_delay_bits)}</span>
								</div>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{_("Data interface")}</span>
									<code>{text(onu.data_path?.interface)}</code>
								</div>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{_("Identity age")}</span>
									<span>{formatAge(onu.identity_age_seconds) ?? "—"}</span>
								</div>
							</div>

							<div class="fttr-card">
								<h4 style="margin-top:0;margin-bottom:6px;font-size:92%;color:#888">
									{_("Hardware specifications and firmware images")}
								</h4>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{_("Equipment ID")}</span>
									<span>{text(identity?.equipment_id ?? onu.model)}</span>
								</div>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{_("Hardware version")}</span>
									<code>{text(identity?.hardware_version ?? onu.hardware_version)}</code>
								</div>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{_("Firmware version")}</span>
									<span title={fw.full || fw.display}>
										<strong>{fw.display}</strong>
									</span>
								</div>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{_("OMCC version")}</span>
									<span>
										{identity?.omcc_version != null
											? `0x${identity.omcc_version.toString(16).padStart(2, "0")} (${identity.omcc_version})`
											: "—"}
									</span>
								</div>
								{identity?.errors.length ? (
									<div class="fttr-kv-row" style="color:#e74c3c">
										<span class="fttr-kv-label">{_("Identity read errors")}</span>
										<span>{identity.errors.join("; ")}</span>
									</div>
								) : null}
								{softwareImages.length > 1 ? (
									<div class="fttr-kv-row" style="font-size:80%;color:#888">
										<span class="fttr-kv-label">{_("Software images")}</span>
										<span>{softwareImages.join(" · ")}</span>
									</div>
								) : null}
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
}

function renderHardwarePage(initialStatus: FttrHardwareStatus, platform: PlatformInfoReply): HTMLElement {
	type TabId = "controller" | "subgateways" | "fec" | "fpga";
	let activeTab: TabId = "controller";

	// Module state survives LuCI view remounts; clear a stuck in-flight flag
	// from a previous mount whose rpcd reply may never settle after unload.

	const tabs: Array<{ id: TabId; label: string }> = [
		{ id: "controller", label: _("Controller & optical transceiver") },
		{ id: "subgateways", label: _("Sub-gateways & optical links") },
	];
	if (platform.operations.downstream_fec) tabs.push({ id: "fec", label: _("ONU FEC monitoring") });
	if (platform.operations.fpga_diagnostics) tabs.push({ id: "fpga", label: _("FPGA diagnostics") });

	const tabItems = new Map<TabId, HTMLElement>();

	let controllerPanel = createControllerPanel(initialStatus, platform);
	let subgatewaysPanel = createSubgatewaysPanel(initialStatus.sub_gateways ?? []);
	const fecMonitor = platform.operations.downstream_fec ? createFecMonitor(initialStatus) : undefined;
	const fecPanel = fecMonitor?.element;
	const fpgaMonitor = platform.operations.fpga_diagnostics ? createFpgaDiagnostics() : undefined;
	const staleNotice = (
		<p class="alert-message warning" role="status" hidden>
			{_("Live hardware status is unavailable. The displayed data may be stale.")}
		</p>
	);
	let lastSuccess = Date.now();

	const switchTab = (id: TabId): void => {
		activeTab = id;
		for (const [tId, li] of tabItems) {
			li.className = tId === id ? "cbi-tab" : "cbi-tab-disabled";
		}
		controllerPanel.hidden = id !== "controller";
		subgatewaysPanel.hidden = id !== "subgateways";
		if (fecPanel) fecPanel.hidden = id !== "fec";
		fpgaMonitor?.setActive(id === "fpga");
		window.dispatchEvent(new Event("resize"));
	};

	const tabMenu = createTabMenu(tabs, activeTab, switchTab, tabItems);

	controllerPanel.hidden = false;
	subgatewaysPanel.hidden = true;
	if (fecPanel) fecPanel.hidden = true;

	const panelsContainer = (
		<div id="fttr-panels-container">
			{controllerPanel}
			{subgatewaysPanel}
			{fecPanel ?? null}
			{fpgaMonitor?.element ?? null}
		</div>
	);

	const root = (
		<div class="cbi-map fttr-hardware">
			<ViewStyle styles={[tokensCss, badgeCss, hardwareCss]} />
			<h2>{_("FTTR hardware status")}</h2>
			{staleNotice}
			{tabMenu}
			{panelsContainer}
			<p class="cbi-footer" style="margin-top:1.5em;font-size:85%;color:#888">
				{_("Identity information is read-only and limited to fields provided by fttrctl status.")}
			</p>
		</div>
	);

	let updating = false;
	let lastSnapshot = JSON.stringify(initialStatus);
	L.Poll.add(async () => {
		if (!root.isConnected || isPageHidden() || updating) return;
		updating = true;
		try {
			const latest = await getStatus();
			fecMonitor?.update(latest);
			const snapshot = JSON.stringify(latest);
			if (snapshot !== lastSnapshot) {
				lastSnapshot = snapshot;
				const restore = capturePanelState(panelsContainer);
				const newController = createControllerPanel(latest, platform);
				const newSubgateways = createSubgatewaysPanel(latest.sub_gateways ?? []);
				newController.hidden = activeTab !== "controller";
				newSubgateways.hidden = activeTab !== "subgateways";
				controllerPanel.replaceWith(newController);
				subgatewaysPanel.replaceWith(newSubgateways);
				controllerPanel = newController;
				subgatewaysPanel = newSubgateways;
				restore();
			}
			lastSuccess = Date.now();
			staleNotice.hidden = true;
		} catch (error) {
			console.error("Failed to refresh hardware status", error);
			staleNotice.hidden = Date.now() - lastSuccess <= 30000;
		} finally {
			updating = false;
		}
	}, 10);

	return root;
}

const main = view.extend({
	async load(): Promise<{ status: FttrHardwareStatus; platform: PlatformInfoReply }> {
		const [status, platform] = await Promise.all([getStatus(), getPlatformInfo()]);
		return { status, platform };
	},
	render(data: { status: FttrHardwareStatus; platform: PlatformInfoReply }): HTMLElement {
		return renderHardwarePage(data.status, data.platform);
	},
	handleSaveApply: null,
	handleSave: null,
	handleReset: null,
});

export { main };
