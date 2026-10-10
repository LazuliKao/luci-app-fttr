// SPDX-License-Identifier: Apache-2.0

const view = L.view;
const rpc = L.rpc;

interface OnuIdentity {
	equipment_id?: string;
	hardware_version?: string;
	software_images?: string[];
	omcc_version?: number;
	errors?: string[];
}

interface SubGateway {
	onu_id: number;
	vendor: string;
	model: string;
	serial_number: string;
	state: string;
	hardware_version: string;
	firmware_version: string;
	identity?: OnuIdentity;
	identity_age_seconds?: number;
	identity_current?: boolean;
}

interface FttrHardwareStatus {
	fpga_status: string;
	optical_transceiver?: {
		model?: string;
		wavelength_tx_nm?: number;
		wavelength_rx_nm?: number;
		phy_rate_downlink_gbps?: number;
		phy_rate_uplink_gbps?: number;
		cdr_locked?: boolean;
	};
	sub_gateways?: SubGateway[];
}

const getStatus = rpc.declare<FttrHardwareStatus>({
	object: "luci.fttr",
	method: "get_status",
	reject: true,
});

const text = (value: unknown): string => (value === null || value === undefined || value === "" ? "—" : String(value));

function rows(items: Array<[string, unknown]>): HTMLElement {
	return (
		<table class="table">
			<tbody>
				{items.map(([label, value]) => (
					<tr>
						<th>{label}</th>
						<td>{text(value)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

function renderHardware(status: FttrHardwareStatus): HTMLElement {
	const optical = status.optical_transceiver ?? {};
	const onus = Array.isArray(status.sub_gateways) ? status.sub_gateways : [];

	return (
		<div class="cbi-map">
			<h2>{_("FTTR hardware status")}</h2>
			<div class="cbi-section">
				<h3>{_("Controller hardware")}</h3>
				{rows([
					[_("FPGA status"), status.fpga_status],
					[_("Optical transceiver"), optical.model],
					[
						_("TX wavelength"),
						optical.wavelength_tx_nm === undefined ? undefined : `${optical.wavelength_tx_nm} nm`,
					],
					[
						_("RX wavelength"),
						optical.wavelength_rx_nm === undefined ? undefined : `${optical.wavelength_rx_nm} nm`,
					],
					[
						_("Downlink PHY rate"),
						optical.phy_rate_downlink_gbps === undefined
							? undefined
							: `${optical.phy_rate_downlink_gbps} Gbps`,
					],
					[
						_("Uplink PHY rate"),
						optical.phy_rate_uplink_gbps === undefined ? undefined : `${optical.phy_rate_uplink_gbps} Gbps`,
					],
					[
						_("CDR lock"),
						optical.cdr_locked === undefined ? undefined : optical.cdr_locked ? _("Locked") : _("Unlocked"),
					],
				])}
			</div>
			{onus.length ? (
				onus.map((onu) => {
					const identity = onu.identity ?? {};
					const softwareImages = identity.software_images ?? [];
					const freshness = onu.identity
						? onu.identity_current
							? _("Current registration")
							: _("Cached identity")
						: _("Not collected");

					return (
						<div class="cbi-section">
							<h3>{_("Sub-gateway %s — %s").format(String(onu.onu_id), text(onu.model))}</h3>
							{rows([
								[_("Vendor"), onu.vendor],
								[_("Optical serial"), onu.serial_number],
								[_("Registration state"), onu.state],
								[_("Identity source"), freshness],
								[
									_("Identity age"),
									onu.identity_age_seconds === undefined
										? undefined
										: `${onu.identity_age_seconds} s`,
								],
								[_("Equipment ID"), identity.equipment_id ?? onu.model],
								[_("Hardware version"), identity.hardware_version ?? onu.hardware_version],
								[_("Firmware version"), onu.firmware_version],
								[_("Software images"), softwareImages.length ? softwareImages.join(", ") : undefined],
								[
									_("OMCC version"),
									identity.omcc_version === undefined
										? undefined
										: `0x${identity.omcc_version.toString(16).padStart(2, "0")}`,
								],
								[
									_("Identity read errors"),
									identity.errors?.length ? identity.errors.join("; ") : undefined,
								],
							])}
						</div>
					);
				})
			) : (
				<div class="cbi-section">
					<p>{_("No sub-gateways are currently registered.")}</p>
				</div>
			)}
			<p class="cbi-footer">
				{_("Identity information is read-only and limited to fields provided by fttrctl status.")}
			</p>
		</div>
	);
}

let pageRoot: HTMLElement | null = null;

const main = (view as any).extend({
	load(): Promise<FttrHardwareStatus> {
		return getStatus();
	},
	render(status: FttrHardwareStatus): HTMLElement {
		pageRoot = renderHardware(status);
		return pageRoot;
	},
	handleSaveApply: null,
	handleSave: null,
	handleReset: null,
});

export { main };
