// SPDX-License-Identifier: Apache-2.0

import { showOnuDetails } from "./components/onu-details";

const view = L.view;
const rpc = L.rpc;

interface OpticalTransceiverStatus {
	model?: string;
	vendor?: string;
	serial_number?: string;
	part_number?: string;
	wavelength_tx_nm?: number;
	wavelength_rx_nm?: number;
	phy_rate_downlink_gbps?: number;
	phy_rate_uplink_gbps?: number;
	tx_power_dbm?: number;
	laser_bias_current_ma?: number;
	temperature_celsius?: number;
	vcc_voltage?: number;
	cdr_locked?: boolean;
}

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
	business_status?: string;
	hardware_version: string;
	firmware_version: string;
	identity?: OnuIdentity;
	identity_age_seconds?: number;
	identity_current?: boolean;
	fiber_distance_m?: number;
	ranging_delay_rtd_ns?: number;
	optical_rx_power_dbm?: number;
	optical_tx_power_dbm?: number;
	data_path?: {
		interface?: string;
		gem_ports?: number[];
		vlan_id?: number;
		tx_bytes?: number;
		rx_bytes?: number;
	};
}

interface FttrHardwareStatus {
	fpga_status: string;
	optical_transceiver?: OpticalTransceiverStatus;
	sub_gateways?: SubGateway[];
}

const getStatus = rpc.declare<FttrHardwareStatus>({
	object: "luci.fttr",
	method: "get_status",
	reject: true,
});

const I18N_DICT: Record<string, string> = {
	"FTTR hardware status": "FTTR 硬件与光模块状态",
	"Controller hardware": "主控制器硬件",
	"Controller & optical transceiver": "主控制器与光模块",
	"Sub-gateways & optical links": "子网关光链路与硬件",
	"FPGA status": "FPGA 状态",
	"Optical transceiver": "SFP+ 光模块",
	"TX wavelength": "发射波长 (TX)",
	"RX wavelength": "接收波长 (RX)",
	"Downlink PHY rate": "下行物理速率",
	"Uplink PHY rate": "上行物理速率",
	"CDR lock": "CDR 锁相环",
	Locked: "已锁定",
	Unlocked: "未锁定",
	"Sub-gateway %s — %s": "子网关 #%s — %s",
	"View OMCI / MIB": "查看 OMCI / MIB",
	"View OMCI / MIB details": "查看 OMCI / MIB 详情",
	Vendor: "供应商",
	"Optical serial": "光路序列号 (SN)",
	"Registration state": "注册状态",
	"Identity source": "身份数据源",
	"Current registration": "当前注册",
	"Cached identity": "缓存身份",
	"Not collected": "未采集",
	"Identity age": "身份时效",
	"Equipment ID": "设备型号",
	"Hardware version": "硬件版本",
	"Firmware version": "固件版本",
	"Software images": "软件镜像",
	"OMCC version": "OMCC 版本",
	"Identity read errors": "身份读取异常",
	"No sub-gateways are currently registered.": "当前暂无已注册的子网关。",
	"Identity information is read-only and limited to fields provided by fttrctl status.":
		"硬件与身份信息均为只读，数据来源于 fttrctl status。",
	"Fiber distance": "光纤物理距离",
	"Optical RX power": "接收光功率 (RX)",
	"Optical TX power": "发射光功率 (TX)",
	"Data interface": "数据接口",
	Temperature: "工作温度",
	Voltage: "工作电压",
	"Bias current": "偏置电流",
	"TX power": "发射功率",
	Ready: "就绪",
	Online: "在线",
	Offline: "离线",
	Connected: "已连接 (O5)",
};

function tr(key: string): string {
	const translated = _(key);
	const isZh = /zh/i.test(
		document.documentElement.getAttribute("lang") ||
			(window as unknown as { L?: { env?: { lang?: string } } }).L?.env?.lang ||
			navigator.language ||
			"",
	);
	if (isZh && I18N_DICT[key]) return I18N_DICT[key];
	return translated || key;
}

const text = (value: unknown): string => (value === null || value === undefined || value === "" ? "—" : String(value));

function formatFirmware(raw?: string): { display: string; full?: string } {
	if (!raw) return { display: "—" };
	const match = raw.match(/image\s*\d+:\s*([^;,\s]+)/i);
	if (match?.[1]) {
		return { display: match[1], full: raw.replace(/;\s*/g, "\n") };
	}
	return { display: raw };
}

function formatAge(seconds?: number): string {
	if (seconds === undefined || !Number.isFinite(seconds) || seconds < 0) return "—";
	if (seconds < 60) return `${seconds} 秒前`;
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) return `${minutes} 分钟前`;
	const hours = Math.floor(minutes / 60);
	const remMin = minutes % 60;
	return `${hours} 小时 ${remMin} 分钟前`;
}

function formatPower(power?: number): string {
	if (power === undefined || !Number.isFinite(power)) return "—";
	return `${power.toFixed(2)} dBm`;
}

function renderStateBadge(stateVal?: string): HTMLElement {
	if (!stateVal) return <span class="fttr-badge fttr-badge-neutral">—</span>;
	if (stateVal === "O5Operation" || stateVal === "online" || stateVal === "ready" || stateVal === "connected") {
		return (
			<span class="fttr-badge fttr-badge-success" title={stateVal}>
				{stateVal === "O5Operation" ? tr("Connected") : tr("Ready")}
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

function renderCdrBadge(locked?: boolean): HTMLElement {
	if (locked === undefined) return <span class="fttr-badge fttr-badge-neutral">—</span>;
	return locked ? (
		<span class="fttr-badge fttr-badge-success">{tr("Locked")}</span>
	) : (
		<span class="fttr-badge fttr-badge-warning">{tr("Unlocked")}</span>
	);
}

function createControllerPanel(status: FttrHardwareStatus): HTMLElement {
	const optical = status.optical_transceiver ?? {};

	const fpgaStatusNode = (
		<span class="fttr-badge fttr-badge-success" style="font-size:95%">
			{status.fpga_status ? tr("Ready") : "—"}
		</span>
	);

	const cdrNode = renderCdrBadge(optical.cdr_locked);

	return (
		<div class="cbi-section fttr-panel-controller">
			<h3 style="margin-bottom:12px">{tr("Controller hardware")}</h3>
			<div class="fttr-grid-3">
				<div class="fttr-card">
					<h4 style="margin-top:0;margin-bottom:8px;font-size:95%">{tr("FPGA status")}</h4>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{tr("FPGA status")}</span>
						<span>{fpgaStatusNode}</span>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">FPGA 标识</span>
						<code>{text(status.fpga_status)}</code>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{tr("CDR lock")}</span>
						<span>{cdrNode}</span>
					</div>
				</div>

				<div class="fttr-card">
					<h4 style="margin-top:0;margin-bottom:8px;font-size:95%">{tr("Optical transceiver")}</h4>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">模块型号</span>
						<strong>{text(optical.model)}</strong>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{tr("TX wavelength")}</span>
						<span>{optical.wavelength_tx_nm ? `${optical.wavelength_tx_nm} nm` : "—"}</span>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{tr("RX wavelength")}</span>
						<span>{optical.wavelength_rx_nm ? `${optical.wavelength_rx_nm} nm` : "—"}</span>
					</div>
				</div>

				<div class="fttr-card">
					<h4 style="margin-top:0;margin-bottom:8px;font-size:95%">物理速率与诊断</h4>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{tr("Downlink PHY rate")}</span>
						<span>{optical.phy_rate_downlink_gbps ? `${optical.phy_rate_downlink_gbps} Gbps` : "—"}</span>
					</div>
					<div class="fttr-kv-row">
						<span class="fttr-kv-label">{tr("Uplink PHY rate")}</span>
						<span>{optical.phy_rate_uplink_gbps ? `${optical.phy_rate_uplink_gbps} Gbps` : "—"}</span>
					</div>
					{optical.temperature_celsius !== undefined ? (
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{tr("Temperature")}</span>
							<span>{optical.temperature_celsius} °C</span>
						</div>
					) : null}
					{optical.tx_power_dbm !== undefined ? (
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{tr("TX power")}</span>
							<span>{formatPower(optical.tx_power_dbm)}</span>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
}

function createSubgatewaysPanel(onus: SubGateway[]): HTMLElement {
	if (!onus.length) {
		return (
			<div class="cbi-section fttr-panel-subgateways">
				<p style="text-align:center;color:#888;padding:2em 0">
					{tr("No sub-gateways are currently registered.")}
				</p>
			</div>
		);
	}

	return (
		<div class="fttr-panel-subgateways">
			{onus.map((onu) => {
				const identity = onu.identity ?? {};
				const softwareImages = identity.software_images ?? [];
				const fw = formatFirmware(onu.firmware_version);
				const freshness = onu.identity
					? onu.identity_current
						? tr("Current registration")
						: tr("Cached identity")
					: tr("Not collected");

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
									{tr("Sub-gateway %s — %s")
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
									{tr("View OMCI / MIB details")} →
								</button>
							</div>
						</div>

						<div class="fttr-grid-2">
							<div class="fttr-card">
								<h4 style="margin-top:0;margin-bottom:6px;font-size:92%;color:#888">
									光纤物理层与链路参数
								</h4>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{tr("Optical RX power")}</span>
									<strong>{formatPower(onu.optical_rx_power_dbm)}</strong>
								</div>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{tr("Optical TX power")}</span>
									<strong>{formatPower(onu.optical_tx_power_dbm)}</strong>
								</div>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{tr("Fiber distance")}</span>
									<span>
										{onu.fiber_distance_m !== undefined ? `${onu.fiber_distance_m} m` : "—"}
									</span>
								</div>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{tr("Data interface")}</span>
									<code>{text(onu.data_path?.interface)}</code>
								</div>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{tr("Identity age")}</span>
									<span>{formatAge(onu.identity_age_seconds)}</span>
								</div>
							</div>

							<div class="fttr-card">
								<h4 style="margin-top:0;margin-bottom:6px;font-size:92%;color:#888">
									硬件规格与固件镜像
								</h4>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{tr("Equipment ID")}</span>
									<span>{text(identity.equipment_id ?? onu.model)}</span>
								</div>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{tr("Hardware version")}</span>
									<code>{text(identity.hardware_version ?? onu.hardware_version)}</code>
								</div>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{tr("Firmware version")}</span>
									<span title={fw.full || fw.display}>
										<strong>{fw.display}</strong>
									</span>
								</div>
								<div class="fttr-kv-row">
									<span class="fttr-kv-label">{tr("OMCC version")}</span>
									<span>
										{identity.omcc_version !== undefined
											? `0x${identity.omcc_version.toString(16).padStart(2, "0")} (${identity.omcc_version})`
											: "—"}
									</span>
								</div>
								{identity.errors?.length ? (
									<div class="fttr-kv-row" style="color:#e74c3c">
										<span class="fttr-kv-label">{tr("Identity read errors")}</span>
										<span>{identity.errors.join("; ")}</span>
									</div>
								) : null}
								{softwareImages.length > 1 ? (
									<div class="fttr-kv-row" style="font-size:80%;color:#888">
										<span class="fttr-kv-label">{tr("Software images")}</span>
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

	const tabs: Array<{ id: TabId; label: string }> = [
		{ id: "controller", label: tr("Controller & optical transceiver") },
		{ id: "subgateways", label: tr("Sub-gateways & optical links") },
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
			<h2>{tr("FTTR hardware status")}</h2>
			{tabMenu}
			{panelsContainer}
			<p class="cbi-footer" style="margin-top:1.5em;font-size:85%;color:#888">
				{tr("Identity information is read-only and limited to fields provided by fttrctl status.")}
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
		} catch {
			// Ignore periodic poll failures
		} finally {
			updating = false;
		}
	}, 10);

	return root;
}

const main = (view as any).extend({
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
