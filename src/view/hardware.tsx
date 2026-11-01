// SPDX-License-Identifier: Apache-2.0

import { formatAge, formatBytes, formatFirmware, formatPackets, formatPower, text } from "./components/formatters";
import { showOnuDetails } from "./components/onu-details";
import { getOpticalStatus, getStatus, type OpticalReply, setNpu, setOptical } from "./contracts/api";
import { eqdText, type FttrStatus as FttrHardwareStatus, type SubGateway } from "./contracts/status";

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

// Optical IPC reports committed intent separately from FPGA reset readback.
let laserOverride: boolean | null = null;
let laserReply: OpticalReply | null = null;
// Panel currently hosting the laser row, plus an in-flight guard. Both are
// module-level so a poll that swaps panels mid-request cannot re-enable the
// button or leave the reply handler refreshing a detached node.
let laserPanel: HTMLElement | null = null;
let laserBusy = false;
let laserRevision = 0;

function applyLaserRow(txEnabled: boolean | null): void {
	const panel = laserPanel;
	if (!panel) return;
	const stateNode = panel.querySelector('[data-fttr="laser-state"]');
	const toggle = panel.querySelector('[data-fttr="laser-toggle"]');
	if (!(stateNode instanceof HTMLElement) || !(toggle instanceof HTMLButtonElement)) return;
	if (txEnabled === true) {
		stateNode.textContent = _("TX enabled (reset readback)");
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
		laserRevision++;
		applyLaserRow(laserOverride);
		try {
			const reply = await setOptical(enabling);
			laserReply = reply;
			laserOverride = reply.tx_enabled;
			if (reply.status === "error") {
				window.alert(`${_("Failed to change laser output")}: ${reply.error?.message ?? _("unknown error")}`);
				return;
			}
		} catch (error) {
			laserOverride = null;
			laserReply = null;
			window.alert(`${_("Failed to change laser output")}: ${String(error)}`);
		} finally {
			laserBusy = false;
			applyLaserRow(laserOverride);
		}
	};
	const detail = panel.querySelector('[data-fttr="laser-detail"]');
	if (detail instanceof HTMLElement) {
		const desired = laserReply?.desired_enabled;
		detail.textContent = [
			desired === true
				? _("Saved setting: on")
				: desired === false
					? _("Saved setting: off")
					: _("Saved setting: unknown"),
			laserReply
				? laserReply.discovery_active
					? _("Discovery active")
					: _("Discovery paused")
				: _("Discovery state: unknown"),
			laserReply?.cleanup_pending ? _("ONU cleanup pending") : "",
			laserReply?.error?.message ?? "",
		]
			.filter(Boolean)
			.join(" · ");
	}
}

let npuOverride: boolean | null = null;
let npuPanel: HTMLElement | null = null;
let npuBusy = false;
let npuRevision = 0;

function applyNpuRow(enabled: boolean | null): void {
	const panel = npuPanel;
	if (!panel) return;
	const stateNode = panel.querySelector('[data-fttr="npu-state"]');
	const toggle = panel.querySelector('[data-fttr="npu-toggle"]');
	if (!(stateNode instanceof HTMLElement) || !(toggle instanceof HTMLButtonElement)) return;
	if (enabled === true) {
		stateNode.textContent = _("Enabled");
		stateNode.className = "fttr-badge fttr-badge-success";
	} else if (enabled === false) {
		stateNode.textContent = _("Disabled");
		stateNode.className = "fttr-badge fttr-badge-warning";
	} else {
		stateNode.textContent = _("Unknown");
		stateNode.className = "fttr-badge fttr-badge-neutral";
	}
	toggle.textContent = enabled === false ? _("Turn NPU offload on") : _("Turn NPU offload off");
	toggle.disabled = npuBusy;
	toggle.onclick = async () => {
		if (npuBusy) return;
		const enabling = npuOverride === false;
		const warning = enabling
			? _("Enable NPU / PPE hardware offload for FTTR bridge traffic?")
			: _("Disable NPU / PPE hardware offload? Traffic will fall back to Linux software bridge.");
		if (!window.confirm(warning)) return;
		npuBusy = true;
		npuRevision++;
		applyNpuRow(npuOverride);
		try {
			const reply = await setNpu(enabling);
			npuOverride = reply.enabled ?? enabling;
			if (reply.status === "error") {
				window.alert(`${_("Failed to change NPU offload state")}: ${reply.error ?? _("unknown error")}`);
				return;
			}
		} catch (error) {
			npuOverride = null;
			window.alert(`${_("Failed to change NPU offload state")}: ${String(error)}`);
		} finally {
			npuBusy = false;
			applyNpuRow(npuOverride);
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
					<div data-fttr="laser-detail" style="font-size:85%;margin-top:8px" />
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

				const offloadAdmitted = onu.data_path?.offload?.bridge_enabled === true;
				const offloadBadge = offloadAdmitted ? (
					<span
						class="fttr-badge fttr-badge-success"
						title={_("NPU hardware offload admitted")}
						style="font-size:80%"
					>
						{_("NPU Offloaded")}
					</span>
				) : (
					<span
						class="fttr-badge fttr-badge-neutral"
						title={_("Standard software forwarding")}
						style="font-size:80%"
					>
						{_("Software")}
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
									{offloadBadge}
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

function createNpuPanel(status: FttrHardwareStatus): HTMLElement {
	const npu = status.npu;
	if (!npu?.supported) {
		return (
			<div class="cbi-section fttr-panel-npu">
				<p style="text-align:center;color:#888;padding:2em 0">
					{_("NPU hardware acceleration is not compiled or unsupported on this target.")}
				</p>
			</div>
		);
	}

	const engineBadge = npu.engine_attached ? (
		<span class="fttr-badge fttr-badge-success">{_("Attached (Ready)")}</span>
	) : (
		<span class="fttr-badge fttr-badge-neutral">{_("Detached")}</span>
	);

	const hooksBadge = npu.fw4_hooks_ready ? (
		<span class="fttr-badge fttr-badge-success">{_("Ready")}</span>
	) : (
		<span class="fttr-badge fttr-badge-warning">{_("Pending")}</span>
	);

	const debugBadge = npu.bridge_offload_debug ? (
		<span class="fttr-badge fttr-badge-warning">{_("Active")}</span>
	) : (
		<span class="fttr-badge fttr-badge-neutral">{_("Disabled")}</span>
	);

	const activePortsText = npu.active_ports.length > 0 ? npu.active_ports.join(", ") : _("None");

	return (
		<div class="cbi-section fttr-panel-npu">
			<h3 style="margin-bottom:12px">{_("NPU hardware offload & PPE flow tables")}</h3>
			<div class="fttr-grid-3">
				<div class="fttr-card">
					<h4 style="margin-top:0;margin-bottom:8px;font-size:95%">{_("Engine and admission status")}</h4>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{_("NPU engine")}</span>
						<span>{engineBadge}</span>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{_("Hardware offload")}</span>
						<span class="fttr-badge fttr-badge-neutral" data-fttr="npu-state">
							{_("Loading…")}
						</span>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{_("Managed bridge")}</span>
						<code>{npu.bridge}</code>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{_("Bridge offload mask")}</span>
						<code>{`0x${npu.bridge_offload_mask.toString(16).padStart(4, "0")} (${npu.bridge_offload_mask})`}</code>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{_("Active offload ports")}</span>
						<span>{activePortsText}</span>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{_("Firewall hooks")}</span>
						<span>{hooksBadge}</span>
					</div>
				</div>

				<div class="fttr-card">
					<h4 style="margin-top:0;margin-bottom:8px;font-size:95%">
						{_("Traffic counters & flow capacity")}
					</h4>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{_("Bound hardware flows")}</span>
						<strong>{npu.bound_entries}</strong>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{_("Total FOE entries")}</span>
						<span>{npu.total_entries}</span>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{_("Offloaded packets")}</span>
						<strong>{formatPackets(npu.total_packets)}</strong>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{_("Offloaded traffic")}</span>
						<strong>{formatBytes(npu.total_bytes)}</strong>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{_("Routed offload mask")}</span>
						<code>{`0x${npu.routed_offload_mask.toString(16).padStart(4, "0")}`}</code>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{_("Driver debug logging")}</span>
						<span>{debugBadge}</span>
					</div>
				</div>

				<div class="fttr-card">
					<h4 style="margin-top:0;margin-bottom:8px;font-size:95%">{_("NPU control")}</h4>
					<p style="font-size:85%;color:#888;margin:6px 0 12px 0">
						{_(
							"Toggle hardware-level flow offloading on Airoha PPE. Disabling falls back to standard Linux software bridge forwarding.",
						)}
					</p>
					<div style="margin-top:10px">
						<button class="fttr-btn-subtle" data-fttr="npu-toggle" type="button" disabled>
							{_("Loading…")}
						</button>
					</div>
				</div>
			</div>

			<div style="margin-top:16px">
				<h4 style="margin-bottom:8px">{_("Active hardware offload flows (PPE FOE Bound)")}</h4>
				{npu.bound_flows.length === 0 ? (
					<p style="color:#888;font-size:90%;font-style:italic">
						{_(
							"No active hardware-offloaded flows in PPE table. Flows bind automatically during continuous inter-ONU traffic.",
						)}
					</p>
				) : (
					<div style="overflow-x:auto">
						<table class="table" style="font-size:85%;width:100%">
							<thead>
								<tr>
									<th>{_("Index")}</th>
									<th>{_("Type")}</th>
									<th>{_("Tuple / Endpoints")}</th>
									<th>{_("Ethernet / MAC")}</th>
									<th>{_("VLAN")}</th>
									<th>{_("Packets")}</th>
									<th>{_("Bytes")}</th>
								</tr>
							</thead>
							<tbody>
								{npu.bound_flows.map((flow) => (
									<tr>
										<td>
											<code>{flow.index}</code>
										</td>
										<td>
											<span class="fttr-badge fttr-badge-info">{flow.pkt_type}</span>
										</td>
										<td>
											<code>{flow.orig_tuple || "—"}</code>
										</td>
										<td style="font-size:85%">
											<code>{flow.eth || "—"}</code>
										</td>
										<td>{flow.vlan || "0,0"}</td>
										<td>
											<strong>{formatPackets(flow.packets)}</strong>
										</td>
										<td>
											<strong>{formatBytes(flow.bytes)}</strong>
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}

function renderHardwarePage(initialStatus: FttrHardwareStatus): HTMLElement {
	type TabId = "controller" | "subgateways" | "npu";
	let activeTab: TabId = "controller";

	// Module state survives LuCI view remounts; clear a stuck in-flight flag
	// from a previous mount whose rpcd reply may never settle after unload.
	laserBusy = false;
	npuBusy = false;

	const tabs: Array<{ id: TabId; label: string }> = [
		{ id: "controller", label: _("Controller & optical transceiver") },
		{ id: "subgateways", label: _("Sub-gateways & optical links") },
		{ id: "npu", label: _("NPU & hardware offload") },
	];

	const tabItems = new Map<TabId, HTMLElement>();

	let controllerPanel = createControllerPanel(initialStatus);
	let subgatewaysPanel = createSubgatewaysPanel(initialStatus.sub_gateways ?? []);
	let npuPanelNode = createNpuPanel(initialStatus);

	const switchTab = (id: TabId): void => {
		activeTab = id;
		for (const [tId, li] of tabItems) {
			li.className = tId === id ? "cbi-tab" : "cbi-tab-disabled";
		}
		controllerPanel.hidden = id !== "controller";
		subgatewaysPanel.hidden = id !== "subgateways";
		npuPanelNode.hidden = id !== "npu";
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
	npuPanelNode.hidden = true;
	laserOverride = initialStatus.optical_transceiver.tx_enabled;
	laserReply = null;
	const initialRevision = laserRevision;
	getOpticalStatus()
		.then((reply) => {
			if (laserBusy || initialRevision !== laserRevision) return;
			laserReply = reply;
			laserOverride = reply.tx_enabled;
			applyLaserRow(laserOverride);
		})
		.catch(() => {
			if (laserBusy || initialRevision !== laserRevision) return;
			laserOverride = null;
			applyLaserRow(laserOverride);
		});
	laserPanel = controllerPanel;
	applyLaserRow(laserOverride);

	npuPanel = npuPanelNode;
	npuOverride = initialStatus.npu?.bridge_offload_enabled ?? null;
	applyNpuRow(npuOverride);

	const panelsContainer = (
		<div id="fttr-panels-container">
			{controllerPanel}
			{subgatewaysPanel}
			{npuPanelNode}
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
		const revision = laserRevision;
		const currentNpuRevision = npuRevision;
		try {
			if (laserBusy || npuBusy) return;
			const [latest, optical] = await Promise.all([getStatus(), getOpticalStatus()]);
			if (laserBusy || npuBusy || revision !== laserRevision || currentNpuRevision !== npuRevision) return;
			const newController = createControllerPanel(latest);
			const newSubgateways = createSubgatewaysPanel(latest.sub_gateways ?? []);
			const newNpu = createNpuPanel(latest);
			newController.hidden = activeTab !== "controller";
			newSubgateways.hidden = activeTab !== "subgateways";
			newNpu.hidden = activeTab !== "npu";
			controllerPanel.replaceWith(newController);
			subgatewaysPanel.replaceWith(newSubgateways);
			npuPanelNode.replaceWith(newNpu);
			controllerPanel = newController;
			subgatewaysPanel = newSubgateways;
			npuPanelNode = newNpu;
			laserPanel = newController;
			npuPanel = newNpu;
			laserReply = optical;
			laserOverride = optical.tx_enabled;
			applyLaserRow(laserOverride);
			npuOverride = latest.npu?.bridge_offload_enabled ?? null;
			applyNpuRow(npuOverride);
		} catch {
			if (laserBusy || npuBusy || revision !== laserRevision || currentNpuRevision !== npuRevision) return;
			laserReply = null;
			laserOverride = null;
			applyLaserRow(laserOverride);
			npuOverride = null;
			applyNpuRow(npuOverride);
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
