// SPDX-License-Identifier: Apache-2.0

import {
	BADGE_CSS,
	getBusinessBadgeSpec,
	getCwmpBadgeSpec,
	getProvisioningBadgeSpec,
	getRegistrationBadgeSpec,
	getWifiSyncBadgeSpec,
	updateBadge,
} from "./components/badge";
import { formatBytes, formatFirmware, formatLinkSpeed, formatPackets, text } from "./components/formatters";
import { showOnuDetails } from "./components/onu-details";
import { getNetworkDevices, getStatus } from "./contracts/api";
import type { FttrStatus, NetworkDevices, SubGateway } from "./contracts/status";

const view = L.view;
const poll = L.Poll;

interface PortCard {
	element: HTMLElement;
	update(status: FttrStatus, devices: NetworkDevices): void;
}

function createPortCard(number: number): PortCard {
	const ifnameNode = <span />;
	const speedNode = (
		<span style="display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:90%">
			{_("Unknown")}
		</span>
	);
	const iconNode = <img src="/luci-static/resources/icons/port_down.svg" alt="" aria-hidden="true" />;
	const linkBarNode = <div style="flex:1;height:3px;opacity:0.25;background-color:rgb(240, 144, 144)" />;
	const portStateNode = <span />;
	const onuNode = <span />;
	const macNode = <span />;
	const txSummaryNode = <span />;
	const rxSummaryNode = <span />;
	const rxBytesNode = <span />;
	const rxPacketsNode = <span />;
	const rxMulticastNode = <span />;
	const rxErrorsNode = <span />;
	const rxDroppedNode = <span />;
	const txBytesNode = <span />;
	const txPacketsNode = <span />;
	const txErrorsNode = <span />;
	const txDroppedNode = <span />;

	const element = (
		<div
			class="ifacebox fttr-port-card"
			data-fttr-port={String(number)}
			style="box-sizing:border-box;margin:0;cursor:pointer"
		>
			<div class="ifacebox-head fttr-port-name" style="font-weight:bold">
				{ifnameNode}
			</div>
			<div class="ifacebox-body fttr-port-identity">
				{iconNode}
				{speedNode}
			</div>
			<div class="ifacebox-head cbi-tooltip-container" style="display:flex">
				{linkBarNode}
				<span class="cbi-tooltip left">
					<strong>{_("Port status")}: </strong>
					{portStateNode}
					<br />
					<strong>{_("ONU")}: </strong>
					{onuNode}
					<br />
					<strong>{_("MAC address")}: </strong>
					{macNode}
				</span>
			</div>
			<div class="ifacebox-body">
				<div
					class="cbi-tooltip-container fttr-port-stats"
					style="display:flex;flex-direction:column;align-items:center;font-size:80%;line-height:1.4;cursor:pointer;width:100%"
				>
					<div style="display:flex;flex-direction:column;align-items:center">
						<div style="white-space:nowrap">▲ {txSummaryNode}</div>
						<div style="white-space:nowrap">▼ {rxSummaryNode}</div>
					</div>
					<span class="cbi-tooltip">
						<span>
							<span class="nowrap">
								<strong>{_("Received bytes")}: </strong>
								{rxBytesNode}
							</span>
							<br />
							<span class="nowrap">
								<strong>{_("Received packets")}: </strong>
								{rxPacketsNode}
							</span>
							<br />
							<span class="nowrap">
								<strong>{_("Received multicast")}: </strong>
								{rxMulticastNode}
							</span>
							<br />
							<span class="nowrap">
								<strong>{_("Receive errors")}: </strong>
								{rxErrorsNode}
							</span>
							<br />
							<span class="nowrap">
								<strong>{_("Receive dropped")}: </strong>
								{rxDroppedNode}
							</span>
							<br />
							<span class="nowrap">
								<strong>{_("Transmitted bytes")}: </strong>
								{txBytesNode}
							</span>
							<br />
							<span class="nowrap">
								<strong>{_("Transmitted packets")}: </strong>
								{txPacketsNode}
							</span>
							<br />
							<span class="nowrap">
								<strong>{_("Transmit errors")}: </strong>
								{txErrorsNode}
							</span>
							<br />
							<span class="nowrap">
								<strong>{_("Transmit dropped")}: </strong>
								{txDroppedNode}
							</span>
						</span>
					</span>
				</div>
			</div>
		</div>
	);

	element.addEventListener("mouseenter", () => {
		const currentOnuId = element.getAttribute("data-active-onu-id");
		if (currentOnuId) {
			const targetRow = document.querySelector(`[data-fttr-onu-id="${currentOnuId}"]`);
			targetRow?.classList.add("fttr-row-highlight");
		}
	});

	element.addEventListener("mouseleave", () => {
		document.querySelectorAll(".fttr-row-highlight").forEach((el) => {
			el.classList.remove("fttr-row-highlight");
		});
	});

	element.addEventListener("click", () => {
		const currentOnuId = element.getAttribute("data-active-onu-id");
		if (currentOnuId) {
			const targetRow = document.querySelector(`[data-fttr-onu-id="${currentOnuId}"]`);
			if (targetRow) {
				targetRow.scrollIntoView({ behavior: "smooth", block: "nearest" });
				targetRow.classList.add("fttr-row-highlight");
				window.setTimeout(() => targetRow.classList.remove("fttr-row-highlight"), 1500);
			}
		}
	});

	return {
		element,
		update(status, devices) {
			const port = (status.switch_ports ?? []).find((item) => item.port === number);
			const ifname = port?.interface ?? `fttr${number}`;
			const device = devices[ifname];
			const stats = device?.stats;
			const carrier = port?.carrier ?? device?.carrier ?? (device?.link?.speed !== undefined ? true : undefined);
			const onu = (status.sub_gateways ?? []).find((item) => item.onu_id === port?.onu_id);
			const connected = carrier === true;
			const rxBytes = stats?.rx_bytes;
			const txBytes = stats?.tx_bytes;

			if (port?.onu_id !== undefined) {
				element.setAttribute("data-active-onu-id", String(port.onu_id));
			} else {
				element.removeAttribute("data-active-onu-id");
			}

			if (connected) {
				element.classList.add("port-up");
				element.classList.remove("port-down");
			} else {
				element.classList.add("port-down");
				element.classList.remove("port-up");
			}

			ifnameNode.textContent = ifname;
			iconNode.setAttribute("src", `/luci-static/resources/icons/${connected ? "port_up.svg" : "port_down.svg"}`);
			speedNode.textContent = connected
				? device?.link?.speed !== undefined
					? formatLinkSpeed(device.link.speed)
					: _("Connected")
				: carrier === false
					? _("Disconnected")
					: _("Unknown");
			speedNode.setAttribute(
				"title",
				_("速度：%s Mbit/s，双工：%s").format(text(device?.link?.speed), text(device?.link?.duplex)),
			);
			linkBarNode.style.opacity = connected ? "1" : "0.25";
			linkBarNode.style.backgroundColor = connected ? "rgb(46, 204, 113)" : "rgba(200, 200, 200, 0.4)";
			portStateNode.textContent = text(
				(port?.reserved_sn && port.onu_id === undefined ? _("Reserved (offline)") : port?.link_state) ??
					port?.status ??
					(device ? (carrier ? _("Link up") : _("Link down")) : _("Unavailable")),
			);
			if (port?.reserved_sn && port.onu_id !== undefined)
				portStateNode.textContent += ` · ${_("Fixed interface")}`;
			onuNode.textContent = text(port?.onu_sn ?? onu?.serial_number ?? port?.reserved_sn ?? port?.onu_id);
			element.title = port?.reserved_sn ? `${_("Reserved")}: ${port.reserved_sn}` : "";
			macNode.textContent = text(device?.mac);

			txSummaryNode.textContent = !connected && !txBytes ? "—" : formatBytes(txBytes);
			rxSummaryNode.textContent = !connected && !rxBytes ? "—" : formatBytes(rxBytes);
			rxBytesNode.textContent = formatBytes(rxBytes);
			rxPacketsNode.textContent = formatPackets(stats?.rx_packets);
			rxMulticastNode.textContent = formatPackets(stats?.rx_multicast ?? stats?.multicast);
			rxErrorsNode.textContent = formatPackets(stats?.rx_errors);
			rxDroppedNode.textContent = formatPackets(stats?.rx_dropped);
			txBytesNode.textContent = formatBytes(txBytes);
			txPacketsNode.textContent = formatPackets(stats?.tx_packets);
			txErrorsNode.textContent = formatPackets(stats?.tx_errors);
			txDroppedNode.textContent = formatPackets(stats?.tx_dropped);
		},
	};
}

interface OnuRow {
	element: HTMLElement;
	update(onu: SubGateway): void;
}

function createOnuRow(onu: SubGateway): OnuRow {
	let current = onu;
	const onuIdNode = <span />;
	const vendorNode = <span />;
	const modelNode = <span />;
	const serialNode = <code style="font-size:90%" />;
	const registrationNode = <span class="fttr-badge" />;
	const businessNode = <span class="fttr-badge" />;
	const firmwareNode = <span style="font-size:90%" />;
	const dataInterfaceNode = <code style="font-size:90%" />;
	const cwmpNode = <span class="fttr-badge" />;
	const provisioningNode = <span class="fttr-badge" />;
	const wifiSyncNode = <span class="fttr-badge" />;

	const element = (
		<tr data-fttr-onu-id={String(onu.onu_id)}>
			<td>{onuIdNode}</td>
			<td>{vendorNode}</td>
			<td>{modelNode}</td>
			<td>{serialNode}</td>
			<td>{registrationNode}</td>
			<td>{businessNode}</td>
			<td>{firmwareNode}</td>
			<td>{dataInterfaceNode}</td>
			<td>{cwmpNode}</td>
			<td>{provisioningNode}</td>
			<td>{wifiSyncNode}</td>
			<td style="text-align:right">
				<button type="button" class="cbi-button cbi-button-neutral" onclick={() => showOnuDetails(current)}>
					{_("Details")}
				</button>
			</td>
		</tr>
	);

	element.addEventListener("mouseenter", () => {
		const ifname = current.data_path?.interface;
		if (ifname) {
			const portMatch = ifname.match(/fttr(\d+)/);
			if (portMatch) {
				const portEl = document.querySelector(`[data-fttr-port="${portMatch[1]}"]`);
				portEl?.classList.add("fttr-port-highlight");
			}
		}
	});

	element.addEventListener("mouseleave", () => {
		document.querySelectorAll(".fttr-port-highlight").forEach((el) => {
			el.classList.remove("fttr-port-highlight");
		});
	});

	const row: OnuRow = {
		element,
		update(value) {
			current = value;
			element.setAttribute("data-fttr-onu-id", String(value.onu_id));
			onuIdNode.textContent = String(value.onu_id);
			vendorNode.textContent = text(value.vendor);
			modelNode.textContent = text(value.identity?.equipment_id ?? value.model);
			serialNode.textContent = text(value.serial_number);

			const regSpec = getRegistrationBadgeSpec(value.state);
			updateBadge(registrationNode, regSpec.tone, regSpec.label, regSpec.title);

			const busSpec = getBusinessBadgeSpec(value.business_status);
			updateBadge(businessNode, busSpec.tone, busSpec.label, busSpec.title);

			const fw = formatFirmware(value.firmware_version || value.identity?.software_images?.join("; "));
			firmwareNode.textContent = fw.display;
			if (fw.full) {
				firmwareNode.setAttribute("title", fw.full);
			} else {
				firmwareNode.removeAttribute("title");
			}

			dataInterfaceNode.textContent = text(value.data_path?.interface);

			const cwmpSpec = getCwmpBadgeSpec(value.management);
			updateBadge(cwmpNode, cwmpSpec.tone, cwmpSpec.label, cwmpSpec.title);

			const provSpec = getProvisioningBadgeSpec(value.provisioning);
			updateBadge(provisioningNode, provSpec.tone, provSpec.label, provSpec.title);

			const wifiSpec = getWifiSyncBadgeSpec(value.wifi_sync);
			updateBadge(wifiSyncNode, wifiSpec.tone, wifiSpec.label, wifiSpec.title);
		},
	};
	row.update(onu);
	return row;
}

interface OnuTable {
	element: HTMLElement;
	update(onus: SubGateway[]): void;
}

function createOnuTable(onus: SubGateway[]): OnuTable {
	const rows = new Map<number, OnuRow>();
	for (const onu of onus) rows.set(onu.onu_id, createOnuRow(onu));
	const emptyRow = (
		<tr>
			<td colSpan={12}>{_("No registered sub-gateways.")}</td>
		</tr>
	);
	let showingEmpty = onus.length === 0;
	const body = <tbody>{showingEmpty ? emptyRow : [...rows.values()].map((row) => row.element)}</tbody>;
	const element = (
		<div class="table-wrapper">
			<table class="table">
				<thead>
					<tr>
						<th>{_("ONU ID")}</th>
						<th>{_("Vendor")}</th>
						<th>{_("Model")}</th>
						<th>{_("Optical serial")}</th>
						<th>{_("Registration")}</th>
						<th>{_("Business")}</th>
						<th>{_("Firmware")}</th>
						<th>{_("Data interface")}</th>
						<th>{_("CWMP")}</th>
						<th>{_("Synchronization")}</th>
						<th>{_("Wi-Fi sync")}</th>
						<th style="text-align:right">{_("Details")}</th>
					</tr>
				</thead>
				{body}
			</table>
		</div>
	);

	return {
		element,
		update(nextOnus) {
			const nextIds = new Set(nextOnus.map((onu) => onu.onu_id));
			for (const [onuId, row] of rows) {
				if (!nextIds.has(onuId)) {
					row.element.remove();
					rows.delete(onuId);
				}
			}

			if (nextOnus.length === 0) {
				if (!showingEmpty) body.append(emptyRow);
				showingEmpty = true;
				return;
			}

			if (showingEmpty) {
				emptyRow.remove();
				showingEmpty = false;
			}

			for (const [index, onu] of nextOnus.entries()) {
				let row = rows.get(onu.onu_id);
				if (!row) {
					row = createOnuRow(onu);
					rows.set(onu.onu_id, row);
				}
				row.update(onu);
				const current = body.children.item(index);
				if (current !== row.element) body.insertBefore(row.element, current);
			}
		},
	};
}

interface StatusView {
	element: HTMLElement;
	update(status: FttrStatus, devices: NetworkDevices): void;
}

function createStatusView(initialStatus: FttrStatus, initialDevices: NetworkDevices): StatusView {
	const initialOptical = initialStatus.optical_transceiver ?? {};
	const onuTable = createOnuTable(initialStatus.sub_gateways ?? []);
	const ports = Array.from({ length: 16 }, (_port, index) => createPortCard(index + 1));

	const provisioningStatusNode = <span class="fttr-badge" />;
	const provisioningModeNode = <span class="fttr-badge fttr-badge-info" />;
	const provisioningRevNode = <code style="font-size:90%" />;
	const provisioningErrorNode = <span class="fttr-badge fttr-badge-danger" style="margin-left:.5em" />;
	const provisioningNode = (
		<div
			data-provisioning-summary="true"
			style="display:flex;align-items:center;flex-wrap:wrap;gap:0.75em;margin-top:.25em;margin-bottom:1.2em;font-size:92%"
		>
			<span>
				<strong style="margin-right:.4em">{_("Provisioning")}:</strong>
				{provisioningStatusNode}
			</span>
			<span>
				<span style="color:#888;margin-right:.3em">{_("Mode")}:</span>
				{provisioningModeNode}
			</span>
			<span>
				<span style="color:#888;margin-right:.3em">{_("Revision")}:</span>
				{provisioningRevNode}
			</span>
			{provisioningErrorNode}
		</div>
	);

	const fpgaNode = <span class="fttr-badge" />;
	const opticalNode = <span>{text(initialOptical.model)}</span>;
	const cdrNode = <span class="fttr-badge" />;
	const pinningNode = <p role="status" />;

	const element = (
		<div class="cbi-map fttr-overview">
			<style>
				{`
				.fttr-overview {
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
					.fttr-overview {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .fttr-overview,
				[data-theme="dark"] .fttr-overview {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-danger-color: #e74c3c;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				${BADGE_CSS}

				.fttr-overview .fttr-ports-grid {
					display: grid;
					grid-template-columns: repeat(8, 100px);
					gap: 8px;
					margin-bottom: 1em;
					margin-inline: auto;
					width: fit-content;
					max-width: 100%;
				}

				@media (max-width: 1100px) {
					.fttr-overview .fttr-ports-grid {
						grid-template-columns: repeat(4, 100px);
					}
				}

				@media (max-width: 520px) {
					.fttr-overview .fttr-ports-grid {
						grid-template-columns: repeat(2, 100px);
					}
				}

				.fttr-overview .fttr-port-card {
					box-sizing: border-box;
					width: 100px;
					margin: 0;
					cursor: pointer;
					text-align: center;
					transition: opacity 0.2s, box-shadow 0.2s, transform 0.2s;
				}

				.fttr-overview .fttr-port-name {
					text-align: center;
				}

				.fttr-overview .fttr-port-identity {
					display: flex;
					flex-direction: column;
					align-items: center;
				}

				.fttr-overview .fttr-port-identity > span {
					text-align: center;
				}

				.fttr-overview .fttr-port-stats {
					display: flex !important;
					flex-direction: column !important;
					align-items: center;
					font-size: 80%;
					line-height: 1.4;
					width: 100%;
					box-sizing: border-box;
				}

				.fttr-overview .fttr-port-stats > div {
					white-space: nowrap;
				}

				.fttr-overview .fttr-port-card.port-down {
					opacity: 0.65;
				}

				.fttr-overview .fttr-port-card.port-down:hover {
					opacity: 1 !important;
				}

				.fttr-overview .fttr-row-highlight {
					background-color: rgba(52, 152, 219, 0.12) !important;
					outline: 1px solid rgba(52, 152, 219, 0.4);
				}

				.fttr-overview .fttr-port-highlight {
					box-shadow: 0 0 0 2px #3498db !important;
					transform: translateY(-2px);
				}

				.fttr-overview table.table th {
					white-space: nowrap;
					padding: 0.5em 0.7em;
				}

				.fttr-overview table.table td {
					white-space: nowrap;
					padding: 0.5em 0.7em;
					vertical-align: middle;
				}
				`}
			</style>
			<h2>{_("FTTR overview")}</h2>
			{provisioningNode}
			{pinningNode}
			<div class="cbi-section">
				<h3>{_("Controller")}</h3>
				<table class="table">
					<tbody>
						<tr>
							<th style="width:15%">{_("FPGA status")}</th>
							<td style="width:35%">{fpgaNode}</td>
							<th style="width:15%">{_("CDR lock")}</th>
							<td style="width:35%">{cdrNode}</td>
						</tr>
						<tr>
							<th>{_("Optical module")}</th>
							<td colSpan={3}>{opticalNode}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="cbi-section">
				<h3>{_("Sub-gateways")}</h3>
				{onuTable.element}
			</div>
			<div class="cbi-section">
				<h3>{_("Downstream ports")}</h3>
				<div class="fttr-ports-grid">{ports.map((port) => port.element)}</div>
			</div>
		</div>
	);

	const update = (status: FttrStatus, devices: NetworkDevices) => {
		const optical = status.optical_transceiver;
		const provisioning = status.provisioning;
		const pinning = status.onu_pinning;
		pinningNode.textContent = pinning
			? [
					pinning.allocation_blocked ? _("ONU allocation blocked by invalid startup configuration.") : "",
					pinning.pending_restart ? _("Fixed interface changes pending FTTR restart.") : "",
					pinning.startup_error || pinning.config_error || "",
				]
					.filter(Boolean)
					.join(" ")
			: "";
		pinningNode.hidden = !pinningNode.textContent;

		if (provisioning) {
			updateBadge(
				provisioningStatusNode,
				provisioning.enabled ? "success" : "neutral",
				provisioning.enabled ? _("Enabled") : _("Disabled"),
			);
			provisioningModeNode.textContent = text(provisioning.mode);
			provisioningRevNode.textContent = text(provisioning.revision);
			if (provisioning.error) {
				provisioningErrorNode.textContent = provisioning.error;
				provisioningErrorNode.style.display = "";
			} else {
				provisioningErrorNode.style.display = "none";
			}
			provisioningNode.style.display = "";
		} else {
			provisioningNode.textContent = _("Provisioning status unavailable");
		}

		if (status.fpga_status === "ready") {
			updateBadge(fpgaNode, "success", _("Ready"));
		} else if (status.fpga_status) {
			updateBadge(fpgaNode, "neutral", text(status.fpga_status));
		} else {
			updateBadge(fpgaNode, "none", "—");
		}

		opticalNode.textContent = text(optical.model);

		if (optical.cdr_locked == null) {
			updateBadge(cdrNode, "none", _("Unknown"));
		} else if (optical.cdr_locked) {
			updateBadge(cdrNode, "success", _("Locked"));
		} else {
			updateBadge(cdrNode, "warning", _("Unlocked"));
		}

		onuTable.update(status.sub_gateways ?? []);
		for (const port of ports) port.update(status, devices);
	};

	update(initialStatus, initialDevices);
	return { element, update };
}

let pageRoot: HTMLElement | null = null;
let pageView: StatusView | null = null;
let refreshing = false;

export const main = view.extend({
	async load(): Promise<{ status: FttrStatus; devices: NetworkDevices }> {
		const [status, deviceResult] = await Promise.all([
			getStatus(),
			getNetworkDevices().catch((error) => {
				console.warn("Failed to load network device details", error);
				return {};
			}),
		]);
		return { status, devices: deviceResult };
	},
	render(data: { status: FttrStatus; devices: NetworkDevices }): HTMLElement {
		pageView = createStatusView(data.status, data.devices);
		pageRoot = pageView.element;
		poll.add(async () => {
			if (refreshing || !pageRoot?.isConnected || !pageView) return;
			const activeView = pageView;
			refreshing = true;
			try {
				const [status, devices] = await Promise.all([getStatus(), getNetworkDevices().catch(() => ({}))]);
				if (pageView === activeView && activeView.element.isConnected) activeView.update(status, devices);
			} catch (error) {
				console.error("Failed to refresh FTTR status", error);
			} finally {
				refreshing = false;
			}
		}, 10);
		return pageRoot;
	},
	handleSaveApply: null,
	handleSave: null,
	handleReset: null,
});
