// SPDX-License-Identifier: Apache-2.0

const view = L.view;
const rpc = L.rpc;
const poll = L.Poll;

interface SubGateway {
	onu_id: number;
	vendor: string;
	model: string;
	serial_number: string;
	state: string;
	business_status?: string;
	firmware_version: string;
	identity?: {
		equipment_id?: string;
		hardware_version?: string;
		software_images?: string[];
		omcc_version?: number;
	};
	data_path?: { interface?: string };
	management?: { state?: string };
	provisioning?: { state?: string; current_revision?: boolean; management_fresh?: boolean };
	wifi_sync?: string;
}

interface FttrStatus {
	fpga_status: string;
	optical_transceiver?: {
		model?: string;
		cdr_locked?: boolean;
	};
	switch_ports?: Array<{
		port: number;
		interface: string;
		carrier: boolean;
		status?: string;
		onu_id?: number;
		onu_sn?: string;
		link_state?: string;
	}>;
	sub_gateways?: SubGateway[];
	provisioning?: { enabled?: boolean; mode?: string; revision?: string; error?: string };
}

interface NetworkDevice {
	carrier?: boolean;
	mac?: string;
	link?: { speed?: number; duplex?: string; autoneg?: boolean };
	stats?: Record<string, number>;
}

type NetworkDevices = Record<string, NetworkDevice>;

const getStatus = rpc.declare<FttrStatus>({
	object: "luci.fttr",
	method: "get_status",
	reject: true,
});

const getNetworkDevices = rpc.declare<NetworkDevices>({
	object: "luci-rpc",
	method: "getNetworkDevices",
	expect: { "": {} },
	reject: true,
});

const text = (value: unknown): string => (value === null || value === undefined || value === "" ? "—" : String(value));

const badge = (value: boolean, label: string): HTMLElement => (
	<span class={value ? "label success" : "label warning"}>{label}</span>
);

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
	if (value < 1000) return `${value} ${_("Pkts.")}`;
	return `${(value / 1000).toFixed(2)} K${_("Pkts.")}`;
}

function formatLinkSpeed(speed: number | undefined): string {
	if (speed === undefined || !Number.isFinite(speed) || speed <= 0) return _("Unknown");
	if (speed >= 1000) return `${speed / 1000} GbE`;
	return `${speed} MbE`;
}

interface PortCard {
	element: HTMLElement;
	update(status: FttrStatus, devices: NetworkDevices): void;
}

function createPortCard(number: number): PortCard {
	const ifnameNode = <span />;
	const speedNode = <span>{_("Unknown")}</span>;
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
		<div class="ifacebox" style="margin:.25em;width:100px">
			<div class="ifacebox-head" style="font-weight:bold">
				{ifnameNode}
			</div>
			<div class="ifacebox-body">
				{iconNode}
				<br />
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
				<div class="cbi-tooltip-container" style="text-align:left;font-size:80%">
					▲ 
					{txSummaryNode}
					<br />
					▼ 
					{rxSummaryNode}
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
			linkBarNode.style.backgroundColor = connected ? "rgb(144, 240, 144)" : "rgb(240, 144, 144)";
			portStateNode.textContent = text(
				port?.link_state ??
					port?.status ??
					(device ? (carrier ? _("Link up") : _("Link down")) : _("Unavailable")),
			);
			onuNode.textContent = text(port?.onu_sn ?? onu?.serial_number ?? port?.onu_id);
			macNode.textContent = text(device?.mac);
			txSummaryNode.textContent = formatBytes(txBytes);
			rxSummaryNode.textContent = formatBytes(rxBytes);
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
	const onuIdNode = <span />;
	const vendorNode = <span />;
	const modelNode = <span />;
	const serialNode = <span />;
	const registrationNode = <span />;
	const businessNode = <span />;
	const firmwareNode = <span />;
	const dataInterfaceNode = <span />;
	const cwmpNode = <span />;
	const provisioningNode = <span />;
	const wifiSyncNode = <span />;
	const element = (
		<tr>
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
		</tr>
	);
	const row: OnuRow = {
		element,
		update(value) {
			onuIdNode.textContent = String(value.onu_id);
			vendorNode.textContent = text(value.vendor);
			modelNode.textContent = text(value.identity?.equipment_id ?? value.model);
			serialNode.textContent = text(value.serial_number);
			registrationNode.textContent = text(value.state);
			registrationNode.className = value.state === "O5Operation" ? "label success" : "label warning";
			businessNode.textContent = text(value.business_status);
			firmwareNode.textContent = text(value.identity?.software_images?.join(", ") ?? value.firmware_version);
			dataInterfaceNode.textContent = text(value.data_path?.interface);
			cwmpNode.textContent = text(value.management?.state);
			provisioningNode.textContent = text(value.provisioning?.state);
			provisioningNode.setAttribute(
				"title",
				value.provisioning?.current_revision === false
					? _("Previous configuration")
					: value.provisioning?.management_fresh === false
						? _("Management stale")
						: "",
			);
			wifiSyncNode.textContent = text(value.wifi_sync);
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
			<td colSpan={11}>{_("No registered sub-gateways.")}</td>
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
	const provisioningNode = <p data-provisioning-summary="true" />;
	const fpgaNode = <span>{text(initialStatus.fpga_status)}</span>;
	const opticalNode = <span>{text(initialOptical.model)}</span>;
	const cdrNode =
		initialOptical.cdr_locked === undefined ? (
			<span>—</span>
		) : (
			badge(initialOptical.cdr_locked, initialOptical.cdr_locked ? _("Locked") : _("Unlocked"))
		);

	const element = (
		<div class="cbi-map">
			<h2>{_("FTTR overview")}</h2>
			{provisioningNode}
			<div class="cbi-section">
				<h3>{_("Controller")}</h3>
				<table class="table">
					<tbody>
						<tr>
							<th>{_("FPGA")}</th>
							<td>{fpgaNode}</td>
						</tr>
						<tr>
							<th>{_("Optical module")}</th>
							<td>{opticalNode}</td>
						</tr>
						<tr>
							<th>{_("CDR lock")}</th>
							<td>{cdrNode}</td>
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
				<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(100px, 1fr));margin-bottom:1em;align-items:center;justify-items:center;text-align:center">
					{ports.map((port) => port.element)}
				</div>
			</div>
		</div>
	);
	const update = (status: FttrStatus, devices: NetworkDevices) => {
		const optical = status.optical_transceiver ?? {};
		const provisioning = status.provisioning;
		provisioningNode.textContent = provisioning
			? `${_("Provisioning")}: ${provisioning.enabled ? _("Enabled") : _("Disabled")} / ${text(provisioning.mode)} / ${text(provisioning.revision)}${provisioning.error ? ` — ${provisioning.error}` : ""}`
			: _("Provisioning status unavailable");
		fpgaNode.textContent = text(status.fpga_status);
		opticalNode.textContent = text(optical.model);
		cdrNode.textContent = optical.cdr_locked === undefined ? "—" : optical.cdr_locked ? _("Locked") : _("Unlocked");
		cdrNode.className =
			optical.cdr_locked === undefined ? "" : optical.cdr_locked ? "label success" : "label warning";
		onuTable.update(status.sub_gateways ?? []);
		for (const port of ports) port.update(status, devices);
	};

	update(initialStatus, initialDevices);
	return { element, update };
}

let pageRoot: HTMLElement | null = null;
let pageView: StatusView | null = null;
let refreshing = false;

export const main = (view as any).extend({
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
