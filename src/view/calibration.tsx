// SPDX-License-Identifier: Apache-2.0

import type { CalibrationMode, CalibrationVersion } from "../api/generated/types";
import calibrationCss from "./calibration.css?inline";
import badgeCss from "./components/badge.css?inline";
import {
	calibratedAdc,
	calibratedTemperature,
	calibratedTx,
	calibrationApplyOutcome,
	temperatureTarget,
} from "./components/calibration-model";
import { createTabMenu, type TabItem } from "./components/tabs";
import { ViewStyle } from "./components/view-style";
import {
	applyCalibration,
	type CalibrationInfo,
	getCalibration,
	saveCalibration,
	selectCalibration,
} from "./contracts/api";
import { requireCalibrationProfile } from "./contracts/capabilities";
import tokensCss from "./styles/tokens.css?inline";

const view = L.view;

const STOCK_SHA256 = "a9447a85073b61016d8ef1e736e944c9942e1b138ba9a35663b48abcf47c1bd4";

interface ParsedCalibration {
	size: number;
	sha256: string;
	isStockHash: boolean;
	registers: number[];
	tempPrimary: { n: number; d: number; o: number };
	tempAlt: { n: number; d: number; o: number };
	tempThreshold: number;
	voltage: { n: number; d: number; o: number };
	bias: { n: number; d: number; o: number };
	txPower: { n: number; d: number; o: number };
	table: number[];
	tableEnabled: boolean;
	simulated: {
		temp: number | null;
		voltage: number | null;
		bias: number | null;
		txPower: number | null;
	};
}

async function computeSha256(buffer: ArrayBuffer): Promise<string> {
	if (window.crypto?.subtle) {
		const hashBuffer = await window.crypto.subtle.digest("SHA-256", buffer);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
	}
	return _("Unavailable");
}

function arrayBufferToBase64(buffer: ArrayBuffer): string {
	let binary = "";
	const bytes = new Uint8Array(buffer);
	const len = bytes.byteLength;
	for (let i = 0; i < len; i++) {
		binary += String.fromCharCode(bytes[i]);
	}
	return window.btoa(binary);
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
	const binaryString = window.atob(base64);
	const len = binaryString.length;
	const bytes = new Uint8Array(len);
	for (let i = 0; i < len; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}
	return bytes.buffer;
}

function parseCalibrationBuffer(buffer: ArrayBuffer, sha256Hex: string): ParsedCalibration | null {
	const bytes = new Uint8Array(buffer);
	const size = bytes.byteLength;
	if (size !== 288 && size !== 56) {
		return null;
	}

	const view = new DataView(buffer);
	const registers: number[] = [];
	for (let i = 0; i < Math.min(56, size); i++) {
		registers.push(bytes[i]);
	}

	const tempPrimary =
		size >= 0x46
			? { n: view.getUint16(0x40, false), d: view.getUint16(0x42, false), o: view.getInt16(0x44, false) }
			: { n: 7142, d: 4096, o: -24780 };

	const voltage =
		size >= 0x4c
			? { n: view.getUint16(0x46, false), d: view.getUint16(0x48, false), o: view.getInt16(0x4a, false) }
			: { n: 950, d: 1024, o: 0 };

	const bias =
		size >= 0x52
			? { n: view.getUint16(0x4c, false), d: view.getUint16(0x4e, false), o: view.getInt16(0x50, false) }
			: { n: 1403, d: 1024, o: 337 };

	const txPower =
		size >= 0x58
			? { n: view.getUint16(0x52, false), d: view.getUint16(0x54, false), o: view.getInt16(0x56, false) }
			: { n: 227, d: 256, o: 1 };

	const tempAlt =
		size >= 0x5e
			? { n: view.getUint16(0x58, false), d: view.getUint16(0x5a, false), o: view.getInt16(0x5c, false) }
			: { n: 7372, d: 4096, o: -26735 };

	const tempThreshold = size >= 0x60 ? view.getUint16(0x5e, false) : 35;
	const table = size === 288 ? Array.from({ length: 84 }, (_, i) => view.getUint16(0x70 + i * 2, false)) : [];
	const tableEnabled = size === 288 && bytes[0x60] === 1;
	if (
		bytes.every((v) => v === 0) ||
		bytes.every((v) => v === 255) ||
		(size === 288 && bytes[0x60] > 1) ||
		(tableEnabled && (tempPrimary.d === 0 || table.some((code) => code > 1023)))
	)
		return null;

	const partial: ParsedCalibration = {
		size,
		sha256: sha256Hex,
		isStockHash: sha256Hex.toLowerCase() === STOCK_SHA256.toLowerCase(),
		registers,
		tempPrimary,
		tempAlt,
		tempThreshold,
		voltage,
		bias,
		txPower,
		table,
		tableEnabled,
		simulated: { temp: 0, voltage: 0, bias: 0, txPower: null },
	};

	const voltageValue = calibratedAdc(0x8880, voltage);
	const biasValue = calibratedAdc(0x1f40, bias);
	partial.simulated = {
		temp: calibratedTemperature(0x5980, tempPrimary, tempAlt, tempThreshold),
		voltage: voltageValue === null ? null : Math.fround(voltageValue / 10000),
		bias: biasValue === null ? null : Math.fround(biasValue / 500),
		txPower: calibratedTx(0x2440, txPower),
	};

	return partial;
}

function renderHash(hash?: string | null): HTMLElement {
	if (!hash) return <span>{_("—")}</span>;
	const short = `${hash.slice(0, 8)}…${hash.slice(-8)}`;
	return (
		<code
			class="fttr-hash"
			title={`${hash}\n(${_("Click to copy full SHA-256")})`}
			onclick={(e: MouseEvent) => {
				e.stopPropagation();
				if (navigator.clipboard) {
					navigator.clipboard.writeText(hash);
					const el = e.currentTarget as HTMLElement;
					el.classList.add("copied");
					setTimeout(() => {
						el.classList.remove("copied");
					}, 1500);
				}
			}}
		>
			{short}
		</code>
	);
}

function renderRegisterGrid(registers: number[]): HTMLElement {
	const rows: HTMLElement[] = [];
	for (let offset = 0; offset < registers.length; offset += 8) {
		const chunk = registers.slice(offset, offset + 8);
		rows.push(
			<tr>
				<td style="font-family:monospace;font-weight:600;opacity:0.75;padding:4px 8px">
					0x{offset.toString(16).padStart(2, "0").toUpperCase()}
				</td>
				{chunk.map((val, idx) => {
					const regAddr = offset + idx;
					const isLatch = regAddr === 0x27;
					return (
						<td
							style="font-family:monospace;text-align:center;padding:4px 6px"
							title={_("Register %s: %s (%s)").format(
								`0x${regAddr.toString(16).padStart(2, "0").toUpperCase()}`,
								`0x${val.toString(16).padStart(2, "0").toUpperCase()}`,
								String(val),
							)}
						>
							{isLatch ? (
								<span class="fttr-badge fttr-badge-warning" style="font-weight:700">
									0x{val.toString(16).padStart(2, "0").toUpperCase()}
								</span>
							) : (
								<span>0x{val.toString(16).padStart(2, "0").toUpperCase()}</span>
							)}
						</td>
					);
				})}
				{Array.from({ length: 8 - chunk.length }).map(() => (
					<td style="text-align:center;opacity:0.35;padding:4px 6px">{_("—")}</td>
				))}
			</tr>,
		);
	}

	return (
		<div style="overflow-x:auto">
			<table class="table cbi-section-table" style="font-size:88%;margin-top:4px;margin-bottom:6px">
				<thead>
					<tr>
						<th style="width:56px;opacity:0.8;padding:4px 8px">{_("Address")}</th>
						<th style="opacity:0.8;padding:4px 6px">+0</th>
						<th style="opacity:0.8;padding:4px 6px">+1</th>
						<th style="opacity:0.8;padding:4px 6px">+2</th>
						<th style="opacity:0.8;padding:4px 6px">+3</th>
						<th style="opacity:0.8;padding:4px 6px">+4</th>
						<th style="opacity:0.8;padding:4px 6px">+5</th>
						<th style="opacity:0.8;padding:4px 6px">+6</th>
						<th style="opacity:0.8;padding:4px 6px">+7</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
			<p style="font-size:82%;opacity:0.75;margin:2px 0 0">
				{_("Note: Register")} <code>0x27</code>{" "}
				{_(
					"(highlighted in yellow) is the hardware latch register. It is skipped during sequential writes, then written with",
				)}{" "}
				<code>0x55</code> {_("to commit all changes.")}
			</p>
		</div>
	);
}

function renderParametersCard(cal: ParsedCalibration, title: string, subtitle?: string): HTMLElement {
	const hashBadge = cal.isStockHash ? (
		<span class="fttr-badge fttr-badge-info">{_("Historical stock sample match")}</span>
	) : (
		<span class="fttr-badge fttr-badge-info">{_("Custom calibration data")}</span>
	);

	const sizeBadge =
		cal.size === 288 ? (
			<span class="fttr-badge fttr-badge-success">{_("Standard %s bytes").format("288")}</span>
		) : (
			<span class="fttr-badge fttr-badge-warning">
				{_("Basic %s bytes (ADC coefficients missing)").format("56")}
			</span>
		);

	const sampleTarget = cal.tableEnabled ? temperatureTarget(0x5980, cal.tempPrimary, cal.table) : null;

	return (
		<div class="fttr-card" style="margin-top:10px">
			<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:10px;flex-wrap:wrap;gap:8px">
				<div>
					<h4 style="margin:0;font-size:102%">{title}</h4>
					{subtitle && <p style="margin:2px 0 0;font-size:85%;opacity:0.75">{subtitle}</p>}
				</div>
				<div style="display:flex;gap:6px">
					{sizeBadge}
					{hashBadge}
				</div>
			</div>

			<div class="fttr-grid-3" style="margin-bottom:10px">
				<div class="fttr-stat-tile">
					<div class="label">{_("Data size")}</div>
					<div class="val">{_("%s bytes").format(String(cal.size))}</div>
				</div>
				<div class="fttr-stat-tile">
					<div class="label">{_("SHA-256 checksum")}</div>
					<div style="margin-top:2px">{renderHash(cal.sha256)}</div>
				</div>
				<div class="fttr-stat-tile">
					<div class="label">{_("Simulated telemetry readings")}</div>
					<div style="font-size:85%;font-weight:600;margin-top:2px">
						{cal.simulated.temp != null ? `${cal.simulated.temp} °C` : "—"} ·{" "}
						{cal.simulated.voltage != null ? `${cal.simulated.voltage} V` : "—"} ·{" "}
						{cal.simulated.bias != null ? `${cal.simulated.bias} mA` : "—"} ·{" "}
						{cal.simulated.txPower != null ? `${cal.simulated.txPower} dBm` : "—"}
					</div>
				</div>
			</div>

			{/* ADC Coefficients Table */}
			<div style="margin-top:12px">
				<h5 style="margin:0 0 6px;font-size:92%">
					{_("ADC diagnostic polynomial conversion coefficients (offsets %s)").format("0x40 ~ 0x5F")}
				</h5>
				<div style="overflow-x:auto">
					<table class="table cbi-section-table" style="font-size:88%;margin:0">
						<thead>
							<tr>
								<th style="padding:5px 8px">{_("Diagnostic measurement channel")}</th>
								<th style="padding:5px 8px">{_("Register offset")}</th>
								<th style="padding:5px 8px">N / D / O</th>
								<th style="padding:5px 8px">{_("Conversion formula")}</th>
								<th style="padding:5px 8px">{_("Typical raw simulated value")}</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td style="padding:5px 8px">
									<strong>{_("Primary temperature parameters (Temp)")}</strong>
								</td>
								<td style="padding:5px 8px">
									<code>0x40 / 0x42 / 0x44</code>
								</td>
								<td style="padding:5px 8px">
									{cal.tempPrimary.n} / {cal.tempPrimary.d} / {cal.tempPrimary.o}
								</td>
								<td style="padding:5px 8px">
									<code>(raw * N / D + O) / 256 °C</code>
								</td>
								<td style="padding:5px 8px">
									{_("Raw")} <code>0x5980</code> → <strong>{cal.simulated.temp} °C</strong>
								</td>
							</tr>
							<tr>
								<td style="padding:5px 8px">
									<strong>{_("Alternate temperature parameters (Alt Temp)")}</strong>
								</td>
								<td style="padding:5px 8px">
									<code>0x58 / 0x5A / 0x5C</code>
								</td>
								<td style="padding:5px 8px">
									{cal.tempAlt.n} / {cal.tempAlt.d} / {cal.tempAlt.o}
								</td>
								<td style="padding:5px 8px">
									{_("Threshold ≤ %s °C").format(String(cal.tempThreshold))}
								</td>
								<td style="padding:5px 8px">
									{_("Segment threshold: %s °C").format(String(cal.tempThreshold))}
								</td>
							</tr>
							<tr>
								<td style="padding:5px 8px">
									<strong>{_("Supply voltage (Vcc)")}</strong>
								</td>
								<td style="padding:5px 8px">
									<code>0x46 / 0x48 / 0x4A</code>
								</td>
								<td style="padding:5px 8px">
									{cal.voltage.n} / {cal.voltage.d} / {cal.voltage.o}
								</td>
								<td style="padding:5px 8px">
									<code>(raw * N / D + O) / 10000 V</code>
								</td>
								<td style="padding:5px 8px">
									{_("Raw")} <code>0x8880</code> → <strong>{cal.simulated.voltage} V</strong>
								</td>
							</tr>
							<tr>
								<td style="padding:5px 8px">
									<strong>{_("Bias current (Bias Current)")}</strong>
								</td>
								<td style="padding:5px 8px">
									<code>0x4C / 0x4E / 0x50</code>
								</td>
								<td style="padding:5px 8px">
									{cal.bias.n} / {cal.bias.d} / {cal.bias.o}
								</td>
								<td style="padding:5px 8px">
									<code>(raw * N / D + O) / 500 mA</code>
								</td>
								<td style="padding:5px 8px">
									{_("Raw")} <code>0x1F40</code> → <strong>{cal.simulated.bias} mA</strong>
								</td>
							</tr>
							<tr>
								<td style="padding:5px 8px">
									<strong>{_("Transmit optical power (Tx Power)")}</strong>
								</td>
								<td style="padding:5px 8px">
									<code>0x52 / 0x54 / 0x56</code>
								</td>
								<td style="padding:5px 8px">
									{cal.txPower.n} / {cal.txPower.d} / {cal.txPower.o}
								</td>
								<td style="padding:5px 8px">
									<code>p_mw = (raw*N/D+O)/10000; 10*log10(p_mw) dBm</code>
								</td>
								<td style="padding:5px 8px">
									{_("Raw")} <code>0x2440</code> →{" "}
									<strong>{cal.simulated.txPower ?? _("—")} dBm</strong>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>

			{/* Register hex grid */}
			<div style="margin-top:12px">
				<h5 style="margin:0 0 4px;font-size:92%">
					{_("BOSA hardware register initialization table (first %s bytes, %s)").format("56", "0x00 ~ 0x37")}
				</h5>
				{renderRegisterGrid(cal.registers)}
			</div>

			{/* Temperature compensation summary */}
			<div class="fttr-card" style="margin-top:12px">
				<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px">
					<h5 style="margin:0;font-size:92%">
						{_("Temperature compensation table (84 entries, 10-bit hardware codes)")}
					</h5>
					<span class={`fttr-badge ${cal.tableEnabled ? "fttr-badge-success" : "fttr-badge-neutral"}`}>
						{cal.size === 56
							? _("Disabled (56-byte register-only file)")
							: cal.tableEnabled
								? _("Mod_Lut_EN Enabled")
								: _("Mod_Lut_EN Disabled")}
					</span>
				</div>
				<p style="font-size:85%;opacity:0.8;margin:6px 0 0">
					{cal.size === 56
						? _(
								"Register-only file: telemetry coefficients are supplemented from built-in data; temperature compensation is disabled.",
							)
						: cal.tableEnabled
							? _(
									"Mod_Lut_EN is enabled. This table controls registers 0x06/0x07; it is not a dBm target.",
								)
							: _("Mod_Lut_EN is disabled.")}
					{sampleTarget && (
						<span>
							{" "}
							· {_("Offline sample at raw 0x5980:")}{" "}
							<strong>
								{_("Index %s → Code %s").format(String(sampleTarget.index), String(sampleTarget.code))}
							</strong>
						</span>
					)}
				</p>
			</div>
		</div>
	);
}

function renderActiveSourceBadge(source: "factory" | "firmware" | "builtin"): HTMLElement {
	switch (source) {
		case "factory":
			return (
				<span class="fttr-badge fttr-badge-success">
					{_("1MB Factory partition (offset %s)").format("0x2200")}
				</span>
			);
		case "firmware":
			return <span class="fttr-badge fttr-badge-info">/lib/firmware/modified_UX3326.bin</span>;
		case "builtin":
			return <span class="fttr-badge fttr-badge-danger">{_("Built-in static defaults (fallback)")}</span>;
	}
}

function renderCalibrationPage(currentInfo: CalibrationInfo): HTMLElement {
	const root = <div class="fttr-calibration" />;

	type TabId = "overview" | "parameters" | "upload";
	let activeTab: TabId = "overview";
	const tabItems = new Map<TabId, HTMLElement>();

	let uploadedBuffer: ArrayBuffer | null = null;
	let parsedUpload: ParsedCalibration | null = null;

	const globalAlertMount = <div style="margin-bottom:12px" />;
	const warningMount = <div />;
	const overviewRuntimeMount = <div />;
	const overviewSourcesMount = <div />;
	const parametersMount = <div />;
	const uploadAlertMount = <div />;
	const uploadPreviewMount = <div />;

	let activeParsedGlobal: ParsedCalibration | null = null;
	let factoryParsedGlobal: ParsedCalibration | null = null;
	let selectedParamView: "active" | "factory" = "active";

	const sourceSelect = (
		<select aria-label={_("Calibration source")} style="margin-right:4px">
			<option value="auto">auto ({_("Auto detection order")})</option>
			<option value="factory">factory ({_("1MB Factory partition only")})</option>
			<option value="firmware">firmware ({_("/lib/firmware file only")})</option>
			<option value="builtin">builtin ({_("Built-in defaults only")})</option>
		</select>
	) as HTMLSelectElement;
	sourceSelect.value = currentInfo.state?.selected ?? "auto";

	const sourceButton = (
		<button type="button" class="cbi-button cbi-button-action" style="margin-right:4px">
			{_("Save source selection")}
		</button>
	) as HTMLButtonElement;

	const applyButton = (
		<button type="button" class="cbi-button cbi-button-apply" style="margin-right:4px">
			{_("Apply selected calibration")}
		</button>
	) as HTMLButtonElement;

	const refreshButton = (
		<button type="button" class="cbi-button">
			{_("Refresh status")}
		</button>
	) as HTMLButtonElement;

	const uploadButton = (
		<button type="button" class="cbi-button cbi-button-action" disabled style="margin-right:8px">
			{_("Upload and save to %s").format("/lib/firmware/modified_UX3326.bin")}
		</button>
	) as HTMLButtonElement;

	let busy = false;
	let sourceSupported = Boolean(currentInfo.state);

	function setBusy(value: boolean) {
		busy = value;
		sourceSelect.disabled = value || !sourceSupported || !L.hasViewPermission();
		sourceButton.disabled = sourceSelect.disabled;
		applyButton.disabled = sourceSelect.disabled;
		refreshButton.disabled = value;
		uploadButton.disabled = value || !parsedUpload || !L.hasViewPermission();
	}

	const tabs: readonly TabItem<TabId>[] = [
		{ id: "overview", label: _("Overview & Control") },
		{ id: "parameters", label: _("Calibration parameters") },
		{ id: "upload", label: _("Upload calibration") },
	];

	const overviewPanel = (<div class="cal-panel cal-panel-overview" />) as HTMLElement;
	const parametersPanel = (<div class="cal-panel cal-panel-parameters" />) as HTMLElement;
	const uploadPanel = (<div class="cal-panel cal-panel-upload" />) as HTMLElement;

	const switchTab = (id: TabId): void => {
		activeTab = id;
		for (const [tId, li] of tabItems) {
			li.className = tId === id ? "cbi-tab" : "cbi-tab-disabled";
		}
		overviewPanel.hidden = id !== "overview";
		parametersPanel.hidden = id !== "parameters";
		uploadPanel.hidden = id !== "upload";
		window.dispatchEvent(new Event("resize"));
	};

	const tabMenu = createTabMenu(tabs, activeTab, switchTab, tabItems, "margin-top:10px;margin-bottom:12px");

	function updateParametersView(info: CalibrationInfo) {
		parametersMount.replaceChildren();

		const hasBoth = Boolean(factoryParsedGlobal && activeParsedGlobal && info.source !== "factory");
		const isSameHash =
			factoryParsedGlobal && activeParsedGlobal && factoryParsedGlobal.sha256 === activeParsedGlobal.sha256;

		if (hasBoth) {
			const activeBtn = (
				<button
					type="button"
					class={`cbi-button ${selectedParamView === "active" ? "cbi-button-action" : "cbi-button-neutral"}`}
					style="margin-right:6px"
					onclick={() => {
						selectedParamView = "active";
						updateParametersView(info);
					}}
				>
					{_("Candidate / Active parameters (%s)").format(info.active_path)}
				</button>
			) as HTMLElement;

			const factoryBtn = (
				<button
					type="button"
					class={`cbi-button ${selectedParamView === "factory" ? "cbi-button-action" : "cbi-button-neutral"}`}
					onclick={() => {
						selectedParamView = "factory";
						updateParametersView(info);
					}}
				>
					{_("1MB Factory partition parameters (0x2200)")}
				</button>
			) as HTMLElement;

			parametersMount.appendChild(
				<div
					class="fttr-card"
					style="margin-bottom:10px;display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:8px"
				>
					<div>
						<span style="font-weight:600;font-size:90%;margin-right:8px">{_("Select dataset:")}</span>
						{activeBtn}
						{factoryBtn}
					</div>
					{isSameHash && (
						<span class="fttr-badge fttr-badge-success" style="font-size:85%">
							{_("Candidate matches Factory partition data")}
						</span>
					)}
				</div>,
			);
		}

		if (selectedParamView === "factory" && factoryParsedGlobal) {
			parametersMount.appendChild(
				renderParametersCard(
					factoryParsedGlobal,
					_(
						"Downstream optical calibration parameters extracted from the 1MB Factory partition (offset %s)",
					).format("0x2200"),
					_("Device: %s, length %s bytes").format(info.factory.device, "288"),
				),
			);
		} else if (activeParsedGlobal) {
			parametersMount.appendChild(
				renderParametersCard(
					activeParsedGlobal,
					_("Candidate calibration parameters (%s)").format(info.active_path),
					_("Effective data size: %s bytes").format(String(info.size)),
				),
			);
		} else if (factoryParsedGlobal) {
			parametersMount.appendChild(
				renderParametersCard(
					factoryParsedGlobal,
					_(
						"Downstream optical calibration parameters extracted from the 1MB Factory partition (offset %s)",
					).format("0x2200"),
					_("Device: %s, length %s bytes").format(info.factory.device, "288"),
				),
			);
		} else {
			parametersMount.appendChild(
				<div class="fttr-card" style="text-align:center;padding:24px;opacity:0.75">
					{_("No calibration parameters are available to inspect.")}
				</div>,
			);
		}
	}

	function renderVersionCard(
		title: string,
		version: CalibrationVersion | null | undefined,
		badgeNode: HTMLElement,
		statusBadgeNode: HTMLElement,
		pathText?: string,
		errorText?: string | null,
	): HTMLElement {
		return (
			<div class="fttr-card">
				<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
					<h4 style="margin:0;font-size:95%">{title}</h4>
					<div style="display:flex;gap:6px">
						{badgeNode}
						{statusBadgeNode}
					</div>
				</div>
				{errorText ? (
					<p class="alert-message danger" style="margin:4px 0 8px;padding:6px 10px;font-size:85%">
						{errorText}
					</p>
				) : null}
				{version ? (
					<div>
						{pathText && (
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">{_("Candidate path")}</span>
								<code style="font-size:88%">{pathText}</code>
							</div>
						)}
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{_("Data size")}</span>
							<span>{_("%s bytes").format(String(version.size))}</span>
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{_("Raw SHA-256")}</span>
							{renderHash(version.raw_sha256)}
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{_("Effective SHA-256")}</span>
							{renderHash(version.effective_sha256)}
						</div>
						{version.supplemented && (
							<p style="font-size:80%;opacity:0.75;margin:4px 0 0">
								{_(
									"56-byte register image supplemented with built-in telemetry coefficients; temperature compensation disabled.",
								)}
							</p>
						)}
					</div>
				) : (
					<div style="opacity:0.6;font-size:90%;padding:12px 0">{_("Unavailable")}</div>
				)}
			</div>
		);
	}

	function renderRuntime(info: CalibrationInfo) {
		const state = info.state;
		sourceSupported = Boolean(state);
		if (!state) {
			overviewRuntimeMount.replaceChildren(
				<p class="alert-message warning">
					{_(
						"This backend does not expose versioned calibration state. Update the backend before selecting or applying a source.",
					)}
				</p>,
			);
			return;
		}

		const t = state.temperature_compensation;
		const time = (unix: number | null) => (unix === null ? _("Never") : new Date(unix * 1000).toLocaleTimeString());

		// Control bar status badge
		const controlStatusBadge = state.pending ? (
			<span class="fttr-badge fttr-badge-warning">{_("Pending apply")}</span>
		) : state.hardware_applied ? (
			<span class="fttr-badge fttr-badge-success">{_("In sync with applied version")}</span>
		) : (
			<span class="fttr-badge fttr-badge-info">{_("Candidate matches active")}</span>
		);

		// Candidate source badge
		const candidateSourceBadge = state.candidate ? (
			<span class="fttr-badge fttr-badge-info">{state.candidate.source}</span>
		) : (
			<span class="fttr-badge fttr-badge-neutral">—</span>
		);

		const candidateStatusBadge = state.pending ? (
			<span class="fttr-badge fttr-badge-warning">{_("Pending / not applied")}</span>
		) : (
			<span class="fttr-badge fttr-badge-success">{_("In sync")}</span>
		);

		// Active source badge
		const activeSourceBadge = state.active ? (
			renderActiveSourceBadge(state.active.source as "factory" | "firmware" | "builtin")
		) : (
			<span class="fttr-badge fttr-badge-neutral">—</span>
		);

		const activeStatusBadge = state.hardware_applied ? (
			<span class="fttr-badge fttr-badge-success">{_("Hardware applied")}</span>
		) : (
			<span class="fttr-badge fttr-badge-warning">{_("Hardware not applied")}</span>
		);

		overviewRuntimeMount.replaceChildren(
			<div>
				{/* Top control bar */}
				<div class="fttr-card" style="margin-bottom:12px">
					<div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:10px">
						<div style="display:flex;align-items:center;gap:6px;flex-wrap:wrap">
							<span style="font-weight:600;font-size:92%">
								{_("Source for the next apply / enable:")}
							</span>
							{sourceSelect}
							{sourceButton}
							{applyButton}
							{refreshButton}
						</div>
						<div style="display:flex;align-items:center;gap:6px">
							<span class="fttr-kv-label" style="font-size:85%">
								{_("Status:")}
							</span>
							{controlStatusBadge}
						</div>
					</div>
				</div>

				{/* Candidate vs Active runtime comparison */}
				<div class="fttr-grid-2">
					{renderVersionCard(
						_("Last successfully initialized version"),
						state.active,
						activeSourceBadge,
						activeStatusBadge,
						info.active_path,
					)}
					{renderVersionCard(
						_("Candidate (next enable / apply)"),
						state.candidate,
						candidateSourceBadge,
						candidateStatusBadge,
						undefined,
						state.candidate_error,
					)}
				</div>

				{/* Temperature compensation card */}
				<div class="fttr-card" style="margin-top:12px">
					<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px">
						<h4 style="margin:0;font-size:95%">{_("Owner temperature compensation")}</h4>
						<span class={`fttr-badge ${t.enabled ? "fttr-badge-success" : "fttr-badge-neutral"}`}>
							{t.enabled ? _("Enabled") : _("Disabled")} ({t.reason})
						</span>
					</div>
					{t.error && (
						<p class="alert-message danger" style="margin:4px 0 8px;padding:6px 10px;font-size:85%">
							{t.error}
						</p>
					)}
					<div class="fttr-grid-4">
						<div class="fttr-stat-tile">
							<div class="label">{_("Raw temperature")}</div>
							<div class="val">{t.raw_temperature != null ? String(t.raw_temperature) : "—"}</div>
						</div>
						<div class="fttr-stat-tile">
							<div class="label">{_("LUT table index")}</div>
							<div class="val">{t.table_index != null ? `#${t.table_index}` : "—"}</div>
						</div>
						<div class="fttr-stat-tile">
							<div class="label">{_("Target code")}</div>
							<div class="val">{t.target_code != null ? String(t.target_code) : "—"}</div>
						</div>
						<div class="fttr-stat-tile">
							<div class="label">{_("Calibration SHA-256")}</div>
							<div style="margin-top:2px">{renderHash(t.calibration_sha256)}</div>
						</div>
					</div>
					<div style="display:flex;justify-content:space-between;align-items:center;margin-top:8px;font-size:80%;opacity:0.75;flex-wrap:wrap;gap:6px">
						<span>
							{_("Last check: %s").format(time(t.last_check_unix))} ·{" "}
							{_("Last write: %s").format(time(t.last_write_unix))}
						</span>
						<span
							title={_(
								"RESET_N, GPON MAC TX and measured optical emission are separate states. Compensation codes are not dBm targets.",
							)}
						>
							ℹ{" "}
							{_(
								"RESET_N, GPON MAC TX and measured optical emission are separate states. Compensation codes are not dBm targets.",
							)}
						</span>
					</div>
				</div>
			</div>,
		);
	}

	function renderSourcesOverview(info: CalibrationInfo) {
		overviewSourcesMount.replaceChildren(
			<div style="margin-top:14px">
				<h4 style="margin:0 0 8px;font-size:95%">{_("Calibration data source detection overview")}</h4>
				<div class="fttr-grid-2">
					<div class="fttr-card">
						<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
							<strong>{_("1. Factory partition (first in Auto mode)")}</strong>
							{info.factory.has_data ? (
								<span class="fttr-badge fttr-badge-success">
									{_("Data present (%s bytes)").format("288")}
								</span>
							) : (
								<span class="fttr-badge fttr-badge-neutral">{_("No valid data")}</span>
							)}
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{_("Device and offset")}</span>
							<code>{info.factory.device || _("No device detected")} @ 0x2200</code>
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{_("Usage status")}</span>
							<span>
								{info.state?.hardware_applied && info.state.active?.source === "factory" ? (
									<span class="fttr-badge fttr-badge-success">
										{_("Applied source (see version above)")}
									</span>
								) : (
									<span style="opacity:0.7">{_("Inactive")}</span>
								)}
							</span>
						</div>
						{info.factory.has_data && (
							<div style="margin-top:8px;text-align:right">
								<button
									type="button"
									class="cbi-button cbi-button-neutral"
									style="font-size:85%;padding:2px 8px"
									onclick={() => {
										selectedParamView = "factory";
										updateParametersView(info);
										switchTab("parameters");
									}}
								>
									{_("View Factory parameters")} →
								</button>
							</div>
						)}
					</div>

					<div class="fttr-card">
						<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
							<strong>{_("2. Firmware file (second in Auto mode)")}</strong>
							{info.firmware.exists ? (
								<span class="fttr-badge fttr-badge-info">
									{_("Exists (%s bytes)").format(String(info.firmware.size))}
								</span>
							) : (
								<span class="fttr-badge fttr-badge-neutral">{_("File does not exist")}</span>
							)}
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{_("Firmware path")}</span>
							<code>{info.firmware.path}</code>
						</div>
						<div class="fttr-kv-row">
							<span class="fttr-kv-label">{_("Usage status")}</span>
							<span>
								{info.state?.hardware_applied && info.state.active?.source === "firmware" ? (
									<span class="fttr-badge fttr-badge-info">
										{_("Applied source (see version above)")}
									</span>
								) : info.firmware.exists ? (
									<span class="fttr-badge fttr-badge-neutral">
										{_("Stored file (selection and application are separate)")}
									</span>
								) : (
									<span style="opacity:0.7">{_("Not ready")}</span>
								)}
							</span>
						</div>
						<div style="margin-top:8px;text-align:right">
							<button
								type="button"
								class="cbi-button cbi-button-neutral"
								style="font-size:85%;padding:2px 8px"
								onclick={() => switchTab("upload")}
							>
								{info.firmware.exists ? _("Update calibration file") : _("Upload calibration file")} →
							</button>
						</div>
					</div>
				</div>
			</div>,
		);
	}

	function refreshCurrentStatus(info: CalibrationInfo) {
		warningMount.replaceChildren();

		// 1. Fallback Warning Banner
		if (info.source === "builtin" && !info.state?.candidate_error) {
			warningMount.appendChild(
				<div class="alert-message warning" style="margin-bottom:12px">
					<h4 style="margin:0 0 4px">{_("Candidate uses a built-in historical calibration sample")}</h4>
					<p style="margin:0 0 4px;font-size:90%">
						{_(
							"Built-in data may be explicitly selected or chosen by automatic fallback. A sample hash does not establish calibration accuracy for this device.",
						)}
					</p>
					<p style="margin:0;font-size:85%;opacity:0.85">
						{_("Use the Upload tab to upload the %s-byte").format("288")} <code>modified_UX3326.bin</code>{" "}
						{_("calibration file extracted from the factory backup to")}{" "}
						<code>/lib/firmware/modified_UX3326.bin</code>{" "}
						{_("then select Firmware and apply it separately.")}
					</p>
				</div>,
			);
		}

		// 2. Parse active data if available
		activeParsedGlobal = null;
		if (info.data) {
			try {
				const buf = base64ToArrayBuffer(info.data);
				activeParsedGlobal = parseCalibrationBuffer(buf, info.sha256);
			} catch {
				// ignore parse failure
			}
		}

		// 3. Parse factory data if present
		factoryParsedGlobal = null;
		if (info.factory.has_data && info.factory.data) {
			try {
				const buf = base64ToArrayBuffer(info.factory.data);
				factoryParsedGlobal = parseCalibrationBuffer(buf, info.factory.sha256);
			} catch {
				// ignore parse failure
			}
		}

		renderRuntime(info);
		renderSourcesOverview(info);
		updateParametersView(info);
	}

	refreshCurrentStatus(currentInfo);

	// Upload form handling
	const fileInput = (<input type="file" accept=".bin" style="display:none" />) as HTMLInputElement;

	const dropZone = (
		<div class="fttr-dropzone">
			<div style="font-size:22px;margin-bottom:6px" aria-hidden="true">
				<span style="display:inline-block;width:1em;height:1em;background-color:currentColor;mask:url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 7V5a1 1 0 0 1 1-1h5l2 3h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z' fill='none' stroke='black' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E&quot;) center/contain no-repeat" />
			</div>
			<div style="font-weight:600;margin-bottom:4px">
				{_("Click to select or drag a %s file here").format("UX3326.bin")}
			</div>
			<div style="font-size:85%;opacity:0.75">
				{_("Supported file:")} <code>modified_UX3326.bin</code>{" "}
				{_(
					"(exactly 288 bytes, or 56 register bytes with supplemented telemetry and no temperature compensation)",
				)}
			</div>
		</div>
	) as HTMLElement;

	dropZone.addEventListener("click", () => fileInput.click());
	dropZone.addEventListener("dragover", (e) => {
		e.preventDefault();
		dropZone.style.opacity = "0.75";
	});
	dropZone.addEventListener("dragleave", () => {
		dropZone.style.opacity = "1";
	});
	dropZone.addEventListener("drop", (e) => {
		e.preventDefault();
		dropZone.style.opacity = "1";
		if (e.dataTransfer?.files.length) {
			handleFile(e.dataTransfer.files[0]);
		}
	});

	fileInput.addEventListener("change", () => {
		if (fileInput.files?.length) {
			handleFile(fileInput.files[0]);
		}
	});

	async function handleFile(file: File) {
		if (busy) return;
		uploadedBuffer = null;
		parsedUpload = null;
		uploadAlertMount.replaceChildren();
		uploadPreviewMount.replaceChildren();
		uploadButton.disabled = true;

		const size = file.size;

		// 1. Strict File Size Validation
		if (size !== 288 && size !== 56) {
			uploadAlertMount.appendChild(
				<div class="alert-message danger">
					<h4 style="margin:0 0 4px">{_("File size validation failed")}</h4>
					<p style="margin:0;font-size:90%">
						{_("A full UX3326 BOSA calibration file must be exactly")}{" "}
						<strong>{_("%s bytes").format("288")}</strong>{" "}
						{_(
							"(the first %s bytes configure registers, followed by ADC diagnostic conversion coefficients from %s).",
						).format("56", "0x40")}
						{_(
							"A 56-byte register-only file is also accepted with supplemented telemetry and temperature compensation disabled.",
						)}
						<br />
						{_("Selected file:")} <strong>{file.name}</strong> {_("Size:")}{" "}
						<strong>{_("%s bytes").format(String(size))}</strong> {_("Upload blocked.")}
					</p>
				</div>,
			);
			return;
		}

		setBusy(true);
		try {
			const buffer = await file.arrayBuffer();
			const hash = await computeSha256(buffer);
			const parsed = parseCalibrationBuffer(buffer, hash);

			if (!parsed) {
				uploadAlertMount.appendChild(
					<div class="alert-message danger">
						<h4 style="margin:0 0 4px">{_("Failed to parse calibration file")}</h4>
						<p style="margin:0;font-size:90%">
							{_("Unable to parse the calibration file structure. Please check the file's integrity.")}
						</p>
					</div>,
				);
				return;
			}

			uploadedBuffer = buffer;
			parsedUpload = parsed;

			// Show validation passed banner
			uploadAlertMount.appendChild(
				<div class="alert-message success">
					<h4 style="margin:0 0 4px">
						{_("File validation succeeded: %s (%s bytes)").format(file.name, String(size))}
					</h4>
					<p style="margin:0;font-size:90%">
						SHA-256: <code>{hash}</code>{" "}
						{parsed.isStockHash
							? _("(historical sample match, not device-specific validation)")
							: _("(different from historical sample)")}
						<br />
						{_(
							"All parameters were parsed successfully and are previewed below. Verify them, then click the button below to upload to",
						)}{" "}
						<code>/lib/firmware/modified_UX3326.bin</code>.
					</p>
				</div>,
			);

			// Render preview card
			uploadPreviewMount.appendChild(
				renderParametersCard(parsed, _("Parameter preview for upload: %s").format(file.name)),
			);
		} catch (err) {
			uploadAlertMount.appendChild(
				<div class="alert-message danger">
					<p style="margin:0">{_("Error reading file: %s").format(String(err))}</p>
				</div>,
			);
		} finally {
			setBusy(false);
		}
	}

	uploadButton.addEventListener("click", async () => {
		if (busy || !L.hasViewPermission() || !uploadedBuffer || !parsedUpload) return;

		setBusy(true);
		uploadButton.textContent = _("Uploading to %s...").format("/lib/firmware/modified_UX3326.bin");
		uploadAlertMount.replaceChildren();

		try {
			const base64Data = arrayBufferToBase64(uploadedBuffer);
			const saveRes = await saveCalibration(base64Data);
			if (!saveRes.success) {
				throw new Error(_("Failed to save calibration file"));
			}

			uploadAlertMount.appendChild(
				<div class="alert-message success">
					<h4 style="margin:0 0 4px">{_("Calibration data saved successfully!")}</h4>
					<p style="margin:0 0 6px;font-size:90%">
						{_("File written to")} <code>{saveRes.path}</code> ({_("%s bytes").format(String(saveRes.size))}
						, SHA-256: <code>{saveRes.sha256}</code>).
						{_(
							"Saving does not switch the source or apply hardware. Select Firmware explicitly, then apply the selected calibration when ready.",
						)}
					</p>
					<button
						type="button"
						class="cbi-button cbi-button-action"
						style="font-size:85%"
						onclick={() => switchTab("overview")}
					>
						{_("Go to Overview & Control to apply")} →
					</button>
				</div>,
			);

			const refreshed = await getCalibration();
			refreshCurrentStatus(refreshed);
		} catch (err) {
			uploadAlertMount.appendChild(
				<div class="alert-message danger">
					<h4 style="margin:0 0 4px">{_("Upload write failed")}</h4>
					<p style="margin:0">{String(err)}</p>
				</div>,
			);
		} finally {
			setBusy(false);
			uploadButton.textContent = _("Upload and save to %s").format("/lib/firmware/modified_UX3326.bin");
		}
	});

	async function action(operation: () => Promise<void>) {
		if (busy) return;
		setBusy(true);
		globalAlertMount.replaceChildren();
		try {
			await operation();
		} catch (error) {
			globalAlertMount.replaceChildren(<p class="alert-message danger">{String(error)}</p>);
		} finally {
			setBusy(false);
		}
	}

	sourceButton.addEventListener("click", () =>
		action(async () => {
			if (!L.hasViewPermission() || !sourceSupported) return;
			const info = await selectCalibration(sourceSelect.value as CalibrationMode);
			refreshCurrentStatus(info);
			globalAlertMount.replaceChildren(
				<p class="alert-message success">
					{_(
						"Source selection saved. Existing hardware and telemetry remain on the applied version until apply or the next enable.",
					)}
				</p>,
			);
		}),
	);

	applyButton.addEventListener("click", () =>
		action(async () => {
			if (!L.hasViewPermission() || !sourceSupported) return;
			const result = await applyCalibration();
			const outcome = calibrationApplyOutcome(result);
			refreshCurrentStatus(await getCalibration());
			if (outcome === "failed") throw new Error(result.error ?? _("Calibration application failed"));
			const message =
				outcome === "applied"
					? _("The selected version was applied by the optical owner.")
					: outcome === "deferred"
						? _(
								"Calibration is pending. Disabled optics remain disabled; the selected version will load on the next enable. Check candidate and active hashes above.",
							)
						: _(
								"The operation completed without version confirmation. Refresh status before interpreting the outcome.",
							);
			globalAlertMount.replaceChildren(
				<p class={`alert-message ${outcome === "applied" ? "success" : "warning"}`}>
					{message}
					{result.output && <span> {result.output}</span>}
				</p>,
			);
		}),
	);

	refreshButton.addEventListener("click", () =>
		action(async () => {
			refreshCurrentStatus(await getCalibration());
			globalAlertMount.replaceChildren(
				<p class="alert-message success">{_("Calibration status refreshed successfully.")}</p>,
			);
		}),
	);

	setBusy(false);

	// Assemble panels
	overviewPanel.appendChild(
		<div>
			{warningMount}
			{overviewRuntimeMount}
			{overviewSourcesMount}
		</div>,
	);

	parametersPanel.appendChild(<div>{parametersMount}</div>);

	uploadPanel.appendChild(
		<div class="cbi-section">
			<h3 style="margin-top:0">{_("Upload a new UX3326 calibration file")}</h3>
			<p style="font-size:90%;opacity:0.75;margin-top:0;margin-bottom:12px">
				{_("New calibration tables are always saved to")} <code>/lib/firmware/modified_UX3326.bin</code>.{" "}
				{_(
					"The file must contain 288 bytes, or 56 register bytes with supplemented telemetry and no temperature compensation.",
				)}
			</p>
			{dropZone}
			{fileInput}
			<div style="margin-top:12px">{uploadAlertMount}</div>
			<div style="margin-top:12px">{uploadPreviewMount}</div>

			<div class="fttr-card" style="margin-top:14px">
				<h4 style="margin-top:0;margin-bottom:10px;font-size:95%">{_("Write settings and execution")}</h4>
				<div class="fttr-kv-row" style="margin-bottom:10px">
					<span class="fttr-kv-label" style="min-width:160px">
						{_("Target storage path")}
					</span>
					<code>/lib/firmware/modified_UX3326.bin</code>
				</div>
				<div>{uploadButton}</div>
			</div>
		</div>,
	);

	overviewPanel.hidden = false;
	parametersPanel.hidden = true;
	uploadPanel.hidden = true;

	root.appendChild(
		<div>
			<ViewStyle styles={[tokensCss, badgeCss, calibrationCss]} />

			<h2 style="margin-bottom:4px">{_("BOSA downstream optical calibration management (UX3326)")}</h2>
			<p class="cbi-section-descr" style="margin-bottom:12px">
				{_("Manage HM2004-DU UX3326 calibration snapshots. Auto selects the first valid source in this order:")}{" "}
				<strong>{_("1MB Factory UBI partition (offset %s)").format("0x2200")}</strong>,{" "}
				<strong>/lib/firmware/modified_UX3326.bin</strong>{" "}
				{_(
					"then built-in historical data. Explicit sources never silently fall back. Upload, source selection and application are separate operations.",
				)}
			</p>

			{tabMenu}
			{globalAlertMount}

			<div id="fttr-cal-panels-container">
				{overviewPanel}
				{parametersPanel}
				{uploadPanel}
			</div>
		</div>,
	);

	return root;
}

const main = view.extend({
	async load(): Promise<CalibrationInfo> {
		await requireCalibrationProfile("ux3326");
		return getCalibration();
	},
	render(info: CalibrationInfo): HTMLElement {
		return renderCalibrationPage(info);
	},
	handleSaveApply: null,
	handleSave: null,
	handleReset: null,
});

export { main };
