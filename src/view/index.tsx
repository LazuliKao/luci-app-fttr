// SPDX-License-Identifier: Apache-2.0

import { showOnuDetails } from "./components/onu-details";
import { getNetworkDevices, getStatus } from "./contracts/api";
import { businessText, type FttrStatus, type NetworkDevices, type SubGateway } from "./contracts/status";

const view = L.view;
const poll = L.Poll;

function tr(key: string): string {
	const translated = _(key);
	return translated || key;
}

const text = (value: unknown): string => (value === null || value === undefined || value === "" ? "—" : String(value));

function updateBadge(
	node: HTMLElement,
	type: "success" | "warning" | "danger" | "info" | "neutral" | "none",
	label: string,
	title?: string,
): void {
	node.textContent = label;
	if (type === "none") {
		node.className = "";
	} else {
		node.className = `fttr-badge fttr-badge-${type}`;
	}
	if (title) {
		node.setAttribute("title", title);
	} else {
		node.removeAttribute("title");
	}
}

/** Extract primary firmware version and preserve all software images for hover tooltip */
function formatFirmware(raw: string | undefined): { display: string; full?: string } {
	if (!raw) return { display: "—" };
	const match = raw.match(/image\s*\d+:\s*([^;,\s]+)/i);
	if (match?.[1]) {
		return { display: match[1], full: raw.replace(/;\s*/g, "\n") };
	}
	return { display: raw };
}

function formatBytes(value: number | undefined): string {
	if (value === undefined || !Number.isFinite(value) || value < 0) return "—";
	if (value < 1024) return `${value} B`;
	const units = ["KiB", "MiB", "GiB", "TiB"];
	let amount = value / 1024;
	let unit = 0;
	while (amount >= 1024 && unit < units.length - 1) {
		amount /= 1024;
		unit++;
	}
	return `${amount.toFixed(1)} ${units[unit]}`;
}

function formatPackets(value: number | undefined): string {
	if (value === undefined || !Number.isFinite(value) || value < 0) return "—";
	if (value < 1000) return `${value} ${tr("Received packets").includes("包") ? "包" : "Pkts."}`;
	return `${(value / 1000).toFixed(2)} K${tr("Received packets").includes("包") ? "包" : "Pkts."}`;
}

function formatLinkSpeed(speed: number | undefined): string {
	if (speed === undefined || !Number.isFinite(speed) || speed <= 0) return tr("Unknown");
	if (speed >= 1000) return `${speed / 1000} GbE`;
	return `${speed} MbE`;
}

interface PortCard {
	element: HTMLElement;
	update(status: FttrStatus, devices: NetworkDevices): void;
}

function createPortCard(number: number): PortCard {
	const ifnameNode = <span />;
	const speedNode = (
		<span style="display:inline-block;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:90%">
			{tr("Unknown")}
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
					<strong>{tr("Port status")}: </strong>
					{portStateNode}
					<br />
					<strong>{tr("ONU")}: </strong>
					{onuNode}
					<br />
					<strong>{tr("MAC address")}: </strong>
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
								<strong>{tr("Received bytes")}: </strong>
								{rxBytesNode}
							</span>
							<br />
							<span class="nowrap">
								<strong>{tr("Received packets")}: </strong>
								{rxPacketsNode}
							</span>
							<br />
							<span class="nowrap">
								<strong>{tr("Received multicast")}: </strong>
								{rxMulticastNode}
							</span>
							<br />
							<span class="nowrap">
								<strong>{tr("Receive errors")}: </strong>
								{rxErrorsNode}
							</span>
							<br />
							<span class="nowrap">
								<strong>{tr("Receive dropped")}: </strong>
								{rxDroppedNode}
							</span>
							<br />
							<span class="nowrap">
								<strong>{tr("Transmitted bytes")}: </strong>
								{txBytesNode}
							</span>
							<br />
							<span class="nowrap">
								<strong>{tr("Transmitted packets")}: </strong>
								{txPacketsNode}
							</span>
							<br />
							<span class="nowrap">
								<strong>{tr("Transmit errors")}: </strong>
								{txErrorsNode}
							</span>
							<br />
							<span class="nowrap">
								<strong>{tr("Transmit dropped")}: </strong>
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
					: tr("Connected")
				: carrier === false
					? tr("Disconnected")
					: tr("Unknown");
			speedNode.setAttribute(
				"title",
				_("速度：%s Mbit/s，双工：%s").format(text(device?.link?.speed), text(device?.link?.duplex)),
			);
			linkBarNode.style.opacity = connected ? "1" : "0.25";
			linkBarNode.style.backgroundColor = connected ? "rgb(46, 204, 113)" : "rgba(200, 200, 200, 0.4)";
			portStateNode.textContent = text(
				port?.link_state ??
					port?.status ??
					(device ? (carrier ? tr("Link up") : tr("Link down")) : tr("Unavailable")),
			);
			onuNode.textContent = text(port?.onu_sn ?? onu?.serial_number ?? port?.onu_id);
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

const REGISTRATION_STATE_LABELS: Record<string, string> = {
	o1_initial: _("O1 Initial"),
	o2_standby: _("O2 Standby"),
	o3_serial_number: _("O3 Serial Number"),
	o4_ranging: _("O4 Ranging"),
	o5_operation: _("O5 (Operation)"),
	o6_intermittent_lods: _("O6 Intermittent LODS"),
	o7_emergency_stop: _("O7 Emergency Stop"),
};

const CWMP_STATE_LABELS: Record<string, string> = {
	online: _("Online"),
	waiting_inform: _("Waiting Inform"),
	offline_or_stale: _("Offline or stale"),
};

const PROVISIONING_STATE_LABELS: Record<string, string> = {
	waiting: _("Waiting"),
	wan_reconciling: _("WAN reconciling"),
	wan_verifying: _("WAN verifying"),
	wifi_reconciling: _("Wi-Fi reconciling"),
	discovering: _("Discovering"),
	reading: _("Reading"),
	disabling: _("Disabling"),
	disabling_read: _("Disabling read"),
	writing: _("Writing"),
	verifying: _("Verifying"),
	settling: _("Settling"),
	completed: _("Completed"),
	interrupted: _("Interrupted"),
	recovering: _("Recovering"),
	waiting_management: _("Waiting management"),
	waiting_task: _("Waiting task"),
	failed: _("Failed"),
	error: _("Error"),
	blocked: _("Blocked"),
	not_started: _("Not started"),
};

const WIFI_SYNC_STATE_LABELS: Record<string, string> = {
	not_configured: _("Not configured"),
	stale_revision: _("Stale revision"),
	stale_management: _("Stale management"),
	verified: _("Verified"),
	attention_required: _("Attention required"),
	accepted_unverified: _("Unverified"),
	pending: _("Pending"),
	recovering: _("Recovering"),
	waiting_management: _("Waiting management"),
};

function formatAge(seconds: number | null | undefined): string | null {
	if (seconds == null || seconds < 0) return null;
	if (seconds < 60) {
		return tr(seconds === 1 ? "%d second ago" : "%d seconds ago").replace("%d", String(seconds));
	}
	const mins = Math.floor(seconds / 60);
	if (mins < 60) {
		return tr(mins === 1 ? "%d minute ago" : "%d minutes ago").replace("%d", String(mins));
	}
	const hours = Math.floor(seconds / 3600);
	if (hours < 24) {
		return tr(hours === 1 ? "%d hour ago" : "%d hours ago").replace("%d", String(hours));
	}
	const days = Math.floor(seconds / 86400);
	return tr(days === 1 ? "%d day ago" : "%d days ago").replace("%d", String(days));
}

function renderCwmpStatus(node: HTMLElement, mgmt: SubGateway["management"]): void {
	const state = mgmt?.state;
	const age =
		mgmt?.age_seconds ?? (mgmt?.last_inform ? Math.max(0, Math.floor(Date.now() / 1000) - mgmt.last_inform) : null);
	const ageText = formatAge(age);
	const fullTime = mgmt?.last_inform ? new Date(mgmt.last_inform * 1000).toLocaleString() : null;
	const title = fullTime ? tr("Last Inform: %s").replace("%s", fullTime) : undefined;

	let label = "—";
	let type: "success" | "warning" | "danger" | "neutral" | "none" = "none";

	if (state === "online") {
		type = "success";
		label = tr(CWMP_STATE_LABELS.online);
	} else if (state === "waiting_inform") {
		type = "warning";
		label = tr(CWMP_STATE_LABELS.waiting_inform);
	} else if (state === "offline_or_stale") {
		type = "danger";
		label = tr(CWMP_STATE_LABELS.offline_or_stale);
	} else if (state) {
		type = "neutral";
		label = text(state);
	}

	const displayLabel = ageText && state ? `${label} · ${ageText}` : label;
	updateBadge(node, type, displayLabel, title);
}

function renderProvisioningBadge(node: HTMLElement, state: string | undefined, title?: string): void {
	if (!state || state === "not_started") {
		updateBadge(node, "neutral", tr(PROVISIONING_STATE_LABELS.not_started), title);
	} else if (state === "completed" || state === "verified") {
		updateBadge(
			node,
			"success",
			state === "completed" ? tr(PROVISIONING_STATE_LABELS.completed) : tr("Ready"),
			title,
		);
	} else if (
		state === "wan_reconciling" ||
		state === "wan_verifying" ||
		state === "wifi_reconciling" ||
		state === "discovering" ||
		state === "reading" ||
		state === "disabling" ||
		state === "disabling_read" ||
		state === "writing" ||
		state === "verifying" ||
		state === "settling" ||
		state === "recovering" ||
		state === "waiting_task"
	) {
		const rawLabel = PROVISIONING_STATE_LABELS[state] ?? state;
		updateBadge(node, "info", tr(rawLabel), title);
	} else if (state === "interrupted" || state === "failed" || state === "error" || state === "blocked") {
		const rawLabel =
			state === "blocked" ? PROVISIONING_STATE_LABELS.blocked : PROVISIONING_STATE_LABELS.interrupted;
		updateBadge(node, "danger", tr(rawLabel), title);
	} else if (state === "waiting" || state === "pending" || state === "waiting_management") {
		const rawLabel = PROVISIONING_STATE_LABELS[state] ?? PROVISIONING_STATE_LABELS.waiting;
		updateBadge(node, "warning", tr(rawLabel), title);
	} else {
		updateBadge(node, "neutral", text(state), title);
	}
}

function renderWifiSyncBadge(node: HTMLElement, state: string | undefined): void {
	if (!state || state === "not_configured") {
		updateBadge(node, "neutral", tr(WIFI_SYNC_STATE_LABELS.not_configured));
	} else if (state === "verified") {
		updateBadge(node, "success", tr(WIFI_SYNC_STATE_LABELS.verified));
	} else if (state === "attention_required") {
		updateBadge(node, "danger", tr(WIFI_SYNC_STATE_LABELS.attention_required));
	} else if (state === "stale_revision" || state === "stale_management" || state === "waiting_management") {
		updateBadge(node, "warning", tr(WIFI_SYNC_STATE_LABELS[state]));
	} else if (state === "recovering") {
		updateBadge(node, "info", tr(WIFI_SYNC_STATE_LABELS.recovering));
	} else if (state === "accepted_unverified" || state === "pending") {
		updateBadge(node, "warning", tr(WIFI_SYNC_STATE_LABELS[state]));
	} else {
		updateBadge(node, "neutral", text(state));
	}
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
					{tr("Details")}
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

			if (value.state === "o5_operation") {
				updateBadge(registrationNode, "success", tr(REGISTRATION_STATE_LABELS.o5_operation), value.state);
			} else if (value.state) {
				const rawLabel = REGISTRATION_STATE_LABELS[value.state] ?? value.state;
				updateBadge(registrationNode, "warning", tr(rawLabel));
			} else {
				updateBadge(registrationNode, "none", "—");
			}

			const bStatus = value.business_status;
			const tone =
				bStatus.phase === "verified"
					? "success"
					: bStatus.error || bStatus.phase === "wan_bootstrap_pending"
						? "warning"
						: "neutral";
			updateBadge(businessNode, tone, businessText(bStatus));

			const fw = formatFirmware(value.firmware_version || value.identity?.software_images?.join("; "));
			firmwareNode.textContent = fw.display;
			if (fw.full) {
				firmwareNode.setAttribute("title", fw.full);
			} else {
				firmwareNode.removeAttribute("title");
			}

			dataInterfaceNode.textContent = text(value.data_path?.interface);

			renderCwmpStatus(cwmpNode, value.management);

			const provState = value.provisioning?.state;
			const provData = value.provisioning;
			const nextRetry =
				provData?.next_retry_at && provData.next_retry_at > Math.floor(Date.now() / 1000)
					? provData.next_retry_at - Math.floor(Date.now() / 1000)
					: 0;
			const provTitle =
				provData?.current_revision === false
					? tr("Previous configuration")
					: provData?.management_fresh === false
						? tr("Management stale")
						: provData?.reconcile_reason
							? tr(provData.reconcile_reason)
							: nextRetry > 0
								? tr("Next self-healing retry in %d seconds").replace("%d", String(nextRetry))
								: (provData?.reason ?? provData?.error);

			renderProvisioningBadge(provisioningNode, provState, provTitle);

			renderWifiSyncBadge(wifiSyncNode, value.wifi_sync);
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
			<td colSpan={12}>{tr("No registered sub-gateways.")}</td>
		</tr>
	);
	let showingEmpty = onus.length === 0;
	const body = <tbody>{showingEmpty ? emptyRow : [...rows.values()].map((row) => row.element)}</tbody>;
	const element = (
		<div class="table-wrapper">
			<table class="table">
				<thead>
					<tr>
						<th>{tr("ONU ID")}</th>
						<th>{tr("Vendor")}</th>
						<th>{tr("Model")}</th>
						<th>{tr("Optical serial")}</th>
						<th>{tr("Registration")}</th>
						<th>{tr("Business")}</th>
						<th>{tr("Firmware")}</th>
						<th>{tr("Data interface")}</th>
						<th>{tr("CWMP")}</th>
						<th>{tr("Synchronization")}</th>
						<th>{tr("Wi-Fi sync")}</th>
						<th style="text-align:right">{tr("Details")}</th>
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
				<strong style="margin-right:.4em">{tr("Provisioning")}:</strong>
				{provisioningStatusNode}
			</span>
			<span>
				<span style="color:#888;margin-right:.3em">{tr("Mode")}:</span>
				{provisioningModeNode}
			</span>
			<span>
				<span style="color:#888;margin-right:.3em">{tr("Revision")}:</span>
				{provisioningRevNode}
			</span>
			{provisioningErrorNode}
		</div>
	);

	const fpgaNode = <span class="fttr-badge" />;
	const opticalNode = <span>{text(initialOptical.model)}</span>;
	const cdrNode = <span class="fttr-badge" />;

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

				.fttr-overview .fttr-badge {
					display: inline-block;
					padding: 0.18em 0.55em;
					font-size: 85%;
					font-weight: 600;
					line-height: 1.25;
					border-radius: 3px;
					white-space: nowrap;
					text-align: center;
				}

				.fttr-overview .fttr-badge-success {
					background: var(--fttr-success-bg);
					color: var(--fttr-success-color);
					border: 1px solid var(--fttr-success-border);
				}

				.fttr-overview .fttr-badge-warning {
					background: var(--fttr-warning-bg);
					color: var(--fttr-warning-color);
					border: 1px solid var(--fttr-warning-border);
				}

				.fttr-overview .fttr-badge-danger {
					background: var(--fttr-danger-bg);
					color: var(--fttr-danger-color);
					border: 1px solid var(--fttr-danger-border);
				}

				.fttr-overview .fttr-badge-info {
					background: var(--fttr-info-bg);
					color: var(--fttr-info-color);
					border: 1px solid var(--fttr-info-border);
				}

				.fttr-overview .fttr-badge-neutral {
					background: var(--fttr-neutral-bg);
					color: var(--fttr-neutral-color);
					border: 1px solid var(--fttr-neutral-border);
				}

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
			<h2>{tr("FTTR overview")}</h2>
			{provisioningNode}
			<div class="cbi-section">
				<h3>{tr("Controller")}</h3>
				<table class="table">
					<tbody>
						<tr>
							<th style="width:15%">{tr("FPGA status")}</th>
							<td style="width:35%">{fpgaNode}</td>
							<th style="width:15%">{tr("CDR lock")}</th>
							<td style="width:35%">{cdrNode}</td>
						</tr>
						<tr>
							<th>{tr("Optical module")}</th>
							<td colSpan={3}>{opticalNode}</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="cbi-section">
				<h3>{tr("Sub-gateways")}</h3>
				{onuTable.element}
			</div>
			<div class="cbi-section">
				<h3>{tr("Downstream ports")}</h3>
				<div class="fttr-ports-grid">{ports.map((port) => port.element)}</div>
			</div>
		</div>
	);

	const update = (status: FttrStatus, devices: NetworkDevices) => {
		const optical = status.optical_transceiver;
		const provisioning = status.provisioning;

		if (provisioning) {
			updateBadge(
				provisioningStatusNode,
				provisioning.enabled ? "success" : "neutral",
				provisioning.enabled ? tr("Enabled") : tr("Disabled"),
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
			provisioningNode.textContent = tr("Provisioning status unavailable");
		}

		if (status.fpga_status === "ready") {
			updateBadge(fpgaNode, "success", tr("Ready"));
		} else if (status.fpga_status) {
			updateBadge(fpgaNode, "neutral", text(status.fpga_status));
		} else {
			updateBadge(fpgaNode, "none", "—");
		}

		opticalNode.textContent = text(optical.model);

		if (optical.cdr_locked == null) {
			updateBadge(cdrNode, "none", tr("Unknown"));
		} else if (optical.cdr_locked) {
			updateBadge(cdrNode, "success", tr("Locked"));
		} else {
			updateBadge(cdrNode, "warning", tr("Unlocked"));
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
