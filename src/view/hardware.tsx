// SPDX-License-Identifier: Apache-2.0

import { showOnuDetails } from "./components/onu-details";
import { getOpticalStatus, getStatus, setOptical } from "./contracts/api";
import { eqdText, type FttrStatus as FttrHardwareStatus, type SubGateway } from "./contracts/status";

const view = L.view;

const text = (value: unknown): string => (value === null || value === undefined || value === "" ? "—" : String(value));

function formatFirmware(raw?: string): { display: string; full?: string } {
	if (!raw) return { display: "—" };
	const match = raw.match(/image\s*\d+:\s*([^;,\s]+)/i);
	if (match?.[1]) {
		return { display: match[1], full: raw.replace(/;\s*/g, "\n") };
	}
	return { display: raw };
}

function formatAge(seconds: number | null): string {
	if (seconds === null || !Number.isFinite(seconds) || seconds < 0) return "—";
	if (seconds < 60) return _("%d seconds ago").replace("%d", String(seconds));
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return _("%d minutes ago").replace("%d", String(minutes));
	const hours = Math.floor(minutes / 60);
	const remMin = minutes % 60;
	return _("%d hours %d minutes ago").replace("%d", String(hours)).replace("%d", String(remMin));
}

function formatPower(power: number | null): string {
	if (power === null || !Number.isFinite(power)) return "—";
	return `${power.toFixed(2)} dBm`;
}

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

// Laser output (UX3326 I2C TX_DIS) row state.
// Primary source: optical_transceiver.tx_enabled from the polled fttrd status.
// The override keeps the row authoritative between a toggle click and the next poll.
let laserOverride: boolean | null | undefined;
// Panel currently hosting the laser row, plus an in-flight guard. Both are
// module-level so a poll that swaps panels mid-request cannot re-enable the
// button or leave the reply handler refreshing a detached node.
let laserPanel: HTMLElement | null = null;
let laserBusy = false;

function applyLaserRow(txEnabled: boolean | null | undefined): void {
	const panel = laserPanel;
	if (!panel) return;
	const stateNode = panel.querySelector('[data-fttr="laser-state"]');
	const toggle = panel.querySelector('[data-fttr="laser-toggle"]');
	if (!(stateNode instanceof HTMLElement) || !(toggle instanceof HTMLButtonElement)) return;
	if (txEnabled === true) {
		stateNode.textContent = _("Emitting");
		stateNode.className = "fttr-badge fttr-badge-success";
	} else if (txEnabled === false) {
		stateNode.textContent = _("Off (TX disabled)");
		stateNode.className = "fttr-badge fttr-badge-warning";
	} else {
		stateNode.textContent = _("Unknown");
		stateNode.className = "fttr-badge fttr-badge-neutral";
	}
	// Label and action must agree: offer "on" only when the laser is known to
	// be off; an unknown state defaults to the conservative "off" action.
	toggle.textContent = txEnabled === false ? _("Turn laser on") : _("Turn laser off");
	toggle.disabled = laserBusy;
	toggle.onclick = async () => {
		if (laserBusy) return;
		// Read the latest known state instead of a value captured at render time.
		const enabling = laserOverride === false;
		const warning = enabling
			? _("Re-enable the 1490nm downlink laser? Discovery resumes and sub-gateways can register again.")
			: _(
					"Turn off the 1490nm downlink laser? All sub-gateways are gracefully disconnected and cannot register until the laser is re-enabled. This setting is saved and reapplied after a reboot.",
				);
		if (!window.confirm(warning)) return;
		laserBusy = true;
		applyLaserRow(laserOverride);
		try {
			const reply = await setOptical(enabling);
			if (reply.status === "error") {
				window.alert(`${_("Failed to change laser output")}: ${reply.error?.message ?? _("unknown error")}`);
				return;
			}
			// The daemon echoes the readback value; fall back to the requested
			// state if an older daemon omits the field.
			laserOverride = reply.tx_enabled ?? enabling;
		} catch (error) {
			window.alert(`${_("Failed to change laser output")}: ${String(error)}`);
		} finally {
			laserBusy = false;
			applyLaserRow(laserOverride);
		}
	};
}

function createControllerPanel(status: FttrHardwareStatus): HTMLElement {
	const optical = status.optical_transceiver;

	const fpgaStatusNode = (
		<span
			class={`fttr-badge ${status.fpga_status === "ready" ? "fttr-badge-success" : "fttr-badge-neutral"}`}
			style="font-size:95%"
		>
			{status.fpga_status === "ready" ? _("Ready") : text(status.fpga_status)}
		</span>
	);

	const cdrNode = renderCdrBadge(optical.cdr_locked);

	return (
		<div class="cbi-section fttr-panel-controller">
			<h3 style="margin-bottom:12px">{_("Controller hardware")}</h3>
			<div class="fttr-grid-3">
				<div class="fttr-card">
					<h4 style="margin-top:0;margin-bottom:8px;font-size:95%">{_("FPGA status")}</h4>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{_("FPGA status")}</span>
						<span>{fpgaStatusNode}</span>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{_("FPGA identifier")}</span>
						<code>{text(status.fpga_status)}</code>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{_("CDR lock")}</span>
						<span>{cdrNode}</span>
					</div>
				</div>

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
					<div class="fttr-kv-row" data-fttr="laser-row">
						<span class="fttr-kv-label">{_("Laser output")}</span>
						<span class="fttr-badge fttr-badge-neutral" data-fttr="laser-state">
							{_("Loading…")}
						</span>
					</div>
				</div>

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
						<span>
							{optical.laser_bias_current_ma == null ? "—" : `${optical.laser_bias_current_ma} mA`}
						</span>
					</div>
				</div>
			</div>
			<div class="fttr-kv-row" style="margin-top:10px">
				<span class="fttr-kv-label">{_("Laser control")}</span>
				<span>
					<button class="fttr-btn-subtle" data-fttr="laser-toggle" type="button" disabled>
						{_("Loading…")}
					</button>
				</span>
			</div>
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
									{_("Sub-gateway %s — %s")
										.replace("%s", String(onu.onu_id))
										.replace("%s", text(onu.model))}
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
									<span>{formatAge(onu.identity_age_seconds)}</span>
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

function renderHardwarePage(initialStatus: FttrHardwareStatus): HTMLElement {
	type TabId = "controller" | "subgateways";
	let activeTab: TabId = "controller";

	// Module state survives LuCI view remounts; clear a stuck in-flight flag
	// from a previous mount whose rpcd reply may never settle after unload.
	laserBusy = false;

	const tabs: Array<{ id: TabId; label: string }> = [
		{ id: "controller", label: _("Controller & optical transceiver") },
		{ id: "subgateways", label: _("Sub-gateways & optical links") },
	];

	const tabItems = new Map<TabId, HTMLElement>();

	let controllerPanel = createControllerPanel(initialStatus);
	let subgatewaysPanel = createSubgatewaysPanel(initialStatus.sub_gateways ?? []);

	const switchTab = (id: TabId): void => {
		activeTab = id;
		for (const [tId, li] of tabItems) {
			li.className = tId === id ? "cbi-tab" : "cbi-tab-disabled";
		}
		controllerPanel.hidden = id !== "controller";
		subgatewaysPanel.hidden = id !== "subgateways";
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

	controllerPanel.hidden = false;
	subgatewaysPanel.hidden = true;
	// Seed the laser row from the status payload; fall back to the optical IPC
	// when the daemon did not report the TX_DIS bit.
	if (initialStatus.optical_transceiver.tx_enabled !== undefined) {
		laserOverride = initialStatus.optical_transceiver.tx_enabled;
	} else {
		getOpticalStatus()
			.then((reply) => {
				laserOverride = reply.tx_enabled;
				applyLaserRow(laserOverride);
			})
			.catch(() => {});
	}
	laserPanel = controllerPanel;
	applyLaserRow(laserOverride);

	const panelsContainer = (
		<div id="fttr-panels-container">
			{controllerPanel}
			{subgatewaysPanel}
		</div>
	);

	const root = (
		<div class="cbi-map fttr-hardware">
			<style>
				{`
				.fttr-hardware {
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
					.fttr-hardware {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .fttr-hardware,
				[data-theme="dark"] .fttr-hardware {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-danger-color: #e74c3c;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				.fttr-hardware .fttr-badge {
					display: inline-block;
					padding: 0.18em 0.55em;
					font-size: 85%;
					font-weight: 600;
					line-height: 1.25;
					border-radius: 3px;
					white-space: nowrap;
					text-align: center;
				}

				.fttr-hardware .fttr-badge-success {
					background: var(--fttr-success-bg);
					color: var(--fttr-success-color);
					border: 1px solid var(--fttr-success-border);
				}

				.fttr-hardware .fttr-badge-warning {
					background: var(--fttr-warning-bg);
					color: var(--fttr-warning-color);
					border: 1px solid var(--fttr-warning-border);
				}

				.fttr-hardware .fttr-badge-danger {
					background: var(--fttr-danger-bg);
					color: var(--fttr-danger-color);
					border: 1px solid var(--fttr-danger-border);
				}

				.fttr-hardware .fttr-badge-info {
					background: var(--fttr-info-bg);
					color: var(--fttr-info-color);
					border: 1px solid var(--fttr-info-border);
				}

				.fttr-hardware .fttr-badge-neutral {
					background: var(--fttr-neutral-bg);
					color: var(--fttr-neutral-color);
					border: 1px solid var(--fttr-neutral-border);
				}

				.fttr-hardware .fttr-grid-2 {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
					gap: 12px;
					margin: 8px 0;
				}

				.fttr-hardware .fttr-grid-3 {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
					gap: 12px;
					margin: 8px 0;
				}

				.fttr-hardware .fttr-card {
					padding: 12px 14px;
					border: 1px solid rgba(127, 140, 141, 0.2);
					border-radius: 6px;
					background: rgba(127, 140, 141, 0.04);
				}

				.fttr-hardware .fttr-kv-row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 5px 0;
					border-bottom: 1px dashed rgba(127, 140, 141, 0.15);
					font-size: 88%;
				}

				.fttr-hardware .fttr-kv-row:last-child {
					border-bottom: none;
				}

				.fttr-hardware .fttr-kv-label {
					color: #888;
				}

				.fttr-hardware .fttr-onu-card {
					position: relative;
					margin-bottom: 1.2em;
				}

				.fttr-hardware .fttr-card-header {
					display: flex;
					justify-content: space-between;
					align-items: center;
					flex-wrap: wrap;
					gap: 10px;
					margin-bottom: 10px;
				}

				.fttr-hardware .fttr-card-title-group {
					display: flex;
					align-items: center;
					gap: 10px;
					flex-wrap: wrap;
				}

				.fttr-hardware .fttr-card-meta-tags {
					display: flex;
					align-items: center;
					flex-wrap: wrap;
					gap: 6px;
				}

				.fttr-hardware .fttr-btn-subtle {
					font-size: 82%;
					padding: 3px 10px;
					border: 1px solid rgba(127, 140, 141, 0.35);
					background: transparent;
					color: inherit;
					border-radius: 4px;
					cursor: pointer;
					text-decoration: none;
					transition: all 0.2s ease;
				}

				.fttr-hardware .fttr-btn-subtle:hover {
					background: rgba(52, 152, 219, 0.1);
					border-color: rgba(52, 152, 219, 0.4);
					color: #2980b9;
				}

				.fttr-hardware .cbi-tabmenu {
					margin-top: 14px;
					margin-bottom: 0;
					user-select: none;
				}

				.fttr-hardware #fttr-panels-container > .cbi-section {
					margin-top: 0;
					border-top-left-radius: 0;
				}
				`}
			</style>
			<h2>{_("FTTR hardware status")}</h2>
			{tabMenu}
			{panelsContainer}
			<p class="cbi-footer" style="margin-top:1.5em;font-size:85%;color:#888">
				{_("Identity information is read-only and limited to fields provided by fttrctl status.")}
			</p>
		</div>
	);

	let updating = false;
	L.Poll.add(async () => {
		if (!root.isConnected || updating) return;
		updating = true;
		try {
			const latest = await getStatus();
			const newController = createControllerPanel(latest);
			const newSubgateways = createSubgatewaysPanel(latest.sub_gateways ?? []);
			newController.hidden = activeTab !== "controller";
			newSubgateways.hidden = activeTab !== "subgateways";
			controllerPanel.replaceWith(newController);
			subgatewaysPanel.replaceWith(newSubgateways);
			controllerPanel = newController;
			subgatewaysPanel = newSubgateways;
			laserPanel = newController;
			if (latest.optical_transceiver.tx_enabled !== undefined) {
				laserOverride = latest.optical_transceiver.tx_enabled;
			}
			applyLaserRow(laserOverride);
		} catch {
			// Ignore periodic poll failures
		} finally {
			updating = false;
		}
	}, 10);

	return root;
}

const main = view.extend({
	load(): Promise<FttrHardwareStatus> {
		return getStatus();
	},
	render(status: FttrHardwareStatus): HTMLElement {
		return renderHardwarePage(status);
	},
	handleSaveApply: null,
	handleSave: null,
	handleReset: null,
});

export { main };
