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
}

interface NetworkDevice {
	device?: string;
	name?: string;
	ifname?: string;
	carrier?: boolean;
	mac?: string;
	link?: { speed?: number; duplex?: string; autoneg?: boolean };
	stats?: Record<string, number>;
	statistics?: Record<string, number>;
}

const getStatus = rpc.declare<FttrStatus>({
	object: "luci.fttr",
	method: "get_status",
	reject: true,
});

const getNetworkDevices = rpc.declare<NetworkDevice[]>({
	object: "luci-rpc",
	method: "getNetworkDevices",
	expect: { "": [] },
	reject: true,
});

const text = (value: unknown): string =>
	value === null || value === undefined || value === "" ? "—" : String(value);

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

function renderPorts(status: FttrStatus, devices: NetworkDevice[]): HTMLElement {
	const portByNumber = new Map((status.switch_ports ?? []).map((port) => [port.port, port]));
	const deviceByName = new Map<string, NetworkDevice>();
	for (const device of devices) {
		const name = device.device ?? device.name ?? device.ifname;
		if (name) deviceByName.set(name, device);
	}
	const ports = Array.from({ length: 16 }, (_port, index) => {
		const number = index + 1;
		const port = portByNumber.get(number);
		const ifname = port?.interface ?? `fttr${number}`;
		const device = deviceByName.get(ifname);
		const stats = device?.stats ?? device?.statistics;
		const carrier = port?.carrier ?? device?.carrier ?? (device?.link?.speed !== undefined ? true : undefined);
		const onu = (status.sub_gateways ?? []).find((item) => item.onu_id === port?.onu_id);
		const state = port?.link_state ?? port?.status ?? (device ? (carrier ? _("Link up") : _("Link down")) : _("Unavailable"));
		const connected = carrier === true;
		const icon = connected ? "port_up.svg" : "port_down.svg";
		const barColor = connected ? "144, 240, 144" : "240, 144, 144";
		const rxBytes = stats?.rx_bytes;
		const txBytes = stats?.tx_bytes;
		return (
			<div class="ifacebox" style="margin:.25em;width:100px">
				<div class="ifacebox-head" style="font-weight:bold">{ifname}</div>
				<div class="ifacebox-body">
					<img src={`/luci-static/resources/icons/${icon}`} />
					<br />
					{connected
						? <span title={_('速度：%s Mbit/s，双工：%s').format(text(device?.link?.speed), text(device?.link?.duplex))}>{formatLinkSpeed(device?.link?.speed)}</span>
						: <span>{carrier === false ? _("Disconnected") : _("Unknown")}</span>}
				</div>
				<div class="ifacebox-head cbi-tooltip-container" style="display:flex">
					<div style={`flex:1;height:3px;opacity:${connected ? 1 : 0.25};background-color:rgb(${barColor})`}></div>
					<span class="cbi-tooltip left">
						<strong>{_("Port status")}: </strong>{text(state)}<br />
						<strong>{_("ONU")}: </strong>{text(port?.onu_sn ?? onu?.serial_number ?? port?.onu_id)}<br />
						<strong>{_("MAC address")}: </strong>{text(device?.mac)}
					</span>
				</div>
				<div class="ifacebox-body">
					<div class="cbi-tooltip-container" style="text-align:left;font-size:80%">
						▲ {formatBytes(txBytes)}<br />
						▼ {formatBytes(rxBytes)}
						<span class="cbi-tooltip">
							<span>
								<span class="nowrap"><strong>{_("Received bytes")}: </strong>{formatBytes(rxBytes)}</span><br />
								<span class="nowrap"><strong>{_("Received packets")}: </strong>{formatPackets(stats?.rx_packets)}</span><br />
								<span class="nowrap"><strong>{_("Received multicast")}: </strong>{formatPackets(stats?.rx_multicast ?? stats?.multicast)}</span><br />
								<span class="nowrap"><strong>{_("Receive errors")}: </strong>{formatPackets(stats?.rx_errors)}</span><br />
								<span class="nowrap"><strong>{_("Receive dropped")}: </strong>{formatPackets(stats?.rx_dropped)}</span><br />
								<span class="nowrap"><strong>{_("Transmitted bytes")}: </strong>{formatBytes(txBytes)}</span><br />
								<span class="nowrap"><strong>{_("Transmitted packets")}: </strong>{formatPackets(stats?.tx_packets)}</span><br />
								<span class="nowrap"><strong>{_("Transmit errors")}: </strong>{formatPackets(stats?.tx_errors)}</span><br />
								<span class="nowrap"><strong>{_("Transmit dropped")}: </strong>{formatPackets(stats?.tx_dropped)}</span>
							</span>
						</span>
					</div>
				</div>
			</div>
		);
	});
	return (
		<div style="display:grid;grid-template-columns:repeat(auto-fit, minmax(100px, 1fr));margin-bottom:1em;align-items:center;justify-items:center;text-align:center">
			{ports}
		</div>
	);
}

function renderTable(
	headings: string[],
	rows: Array<Array<string | number | HTMLElement>>,
	empty: string,
): HTMLElement {
	return (
		<div class="table-wrapper">
			<table class="table">
				<thead>
					<tr>{headings.map((heading) => <th>{heading}</th>)}</tr>
				</thead>
				<tbody>
					{rows.length ? (
						rows.map((row) => <tr>{row.map((cell) => <td>{cell}</td>)}</tr>)
					) : (
						<tr><td colSpan={headings.length}>{empty}</td></tr>
					)}
				</tbody>
			</table>
		</div>
	);
}

function renderStatus(status: FttrStatus, devices: NetworkDevice[]): HTMLElement {
	const onus = Array.isArray(status.sub_gateways) ? status.sub_gateways : [];
	const optical = status.optical_transceiver ?? {};

	return (
		<div class="cbi-map">
			<h2>{_("FTTR overview")}</h2>
			<div class="cbi-section">
				<h3>{_("Controller")}</h3>
				<table class="table">
					<tbody>
						<tr><th>{_("FPGA")}</th><td>{text(status.fpga_status)}</td></tr>
						<tr><th>{_("Optical module")}</th><td>{text(optical.model)}</td></tr>
						<tr>
							<th>{_("CDR lock")}</th>
							<td>
								{optical.cdr_locked === undefined
									? "—"
									: badge(optical.cdr_locked, optical.cdr_locked ? _("Locked") : _("Unlocked"))}
							</td>
						</tr>
					</tbody>
				</table>
			</div>
			<div class="cbi-section">
				<h3>{_("Sub-gateways")}</h3>
				{renderTable(
					[_('ONU ID'), _('Vendor'), _('Model'), _('Optical serial'), _('Registration'), _('Business'), _('Firmware'), _('Data interface')],
					onus.map((onu) => [
						onu.onu_id,
						text(onu.vendor),
						text(onu.identity?.equipment_id ?? onu.model),
						text(onu.serial_number),
						badge(onu.state === "O5Operation", onu.state),
						text(onu.business_status),
						text(onu.identity?.software_images?.join(", ") ?? onu.firmware_version),
						text(onu.data_path?.interface),
					]),
					_("No registered sub-gateways."),
				)}
			</div>
			<div class="cbi-section">
				<h3>{_("Downstream ports")}</h3>
				{renderPorts(status, devices)}
			</div>
		</div>
	);
}

let pageRoot: HTMLElement | null = null;

export const main = (view as any).extend({
	async load(): Promise<{ status: FttrStatus; devices: NetworkDevice[] }> {
		const [status, deviceResult] = await Promise.all([
			getStatus(),
			getNetworkDevices().catch((error) => {
				console.warn("Failed to load network device details", error);
				return [];
			}),
		]);
		return { status, devices: deviceResult };
	},
	render(data: { status: FttrStatus; devices: NetworkDevice[] }): HTMLElement {
		pageRoot = renderStatus(data.status, data.devices);
		poll.add(async () => {
			if (!pageRoot?.isConnected) return;
			try {
				const [status, devices] = await Promise.all([
					getStatus(),
					getNetworkDevices().catch(() => []),
				]);
				const next = renderStatus(status, devices);
				pageRoot.replaceWith(next);
				pageRoot = next;
			} catch (error) {
				console.error("Failed to refresh FTTR status", error);
			}
		}, 10);
		return pageRoot;
	},
	handleSaveApply: null,
	handleSave: null,
	handleReset: null,
});
