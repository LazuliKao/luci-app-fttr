// SPDX-License-Identifier: Apache-2.0

import { applyCalibration, type CalibrationInfo, getCalibration, saveCalibration } from "./contracts/api";

const view = L.view;

function tr(key: string): string {
	return _(key) || key;
}

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
	simulated: {
		temp: number;
		voltage: number;
		bias: number;
		txPower: number | null;
	};
}

async function computeSha256(buffer: ArrayBuffer): Promise<string> {
	if (window.crypto?.subtle) {
		const hashBuffer = await window.crypto.subtle.digest("SHA-256", buffer);
		const hashArray = Array.from(new Uint8Array(hashBuffer));
		return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
	}
	return "unavailable";
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

function calcTemp(raw: number, cal: ParsedCalibration): number {
	const { n, d, o } = cal.tempPrimary;
	const div = d === 0 ? 4096 : d;
	const scaled = Math.floor((raw * n) / div) + o;
	const temp = scaled / 256.0;
	if (temp <= cal.tempThreshold) {
		const { n: nAlt, d: dAlt, o: oAlt } = cal.tempAlt;
		const divAlt = dAlt === 0 ? 4096 : dAlt;
		const scaledAlt = Math.floor((raw * nAlt) / divAlt) + oAlt;
		return Number((scaledAlt / 256.0).toFixed(2));
	}
	return Number(temp.toFixed(2));
}

function calcVolt(raw: number, cal: ParsedCalibration): number {
	const { n, d, o } = cal.voltage;
	const div = d === 0 ? 1024 : d;
	const scaled = Math.floor((raw * n) / div) + o;
	return Number((scaled / 10000.0).toFixed(2));
}

function calcBias(raw: number, cal: ParsedCalibration): number {
	const { n, d, o } = cal.bias;
	const div = d === 0 ? 1024 : d;
	const scaled = Math.floor((raw * n) / div) + o;
	return Number((scaled / 500.0).toFixed(2));
}

function calcTx(raw: number, cal: ParsedCalibration): number | null {
	const { n, d, o } = cal.txPower;
	const div = d === 0 ? 256 : d;
	const pUw = Math.floor((raw * n) / div) + o;
	const pMw = pUw / 10000.0;
	if (pMw > 0) {
		return Number((10.0 * Math.log10(pMw)).toFixed(2));
	}
	return null;
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

	const tempThreshold = size >= 0x60 ? view.getInt16(0x5e, false) : 35;

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
		simulated: { temp: 0, voltage: 0, bias: 0, txPower: null },
	};

	partial.simulated = {
		temp: calcTemp(0x5980, partial),
		voltage: calcVolt(0x8880, partial),
		bias: calcBias(0x1f40, partial),
		txPower: calcTx(0x2440, partial),
	};

	return partial;
}

function renderRegisterGrid(registers: number[]): HTMLElement {
	const rows: HTMLElement[] = [];
	for (let offset = 0; offset < registers.length; offset += 8) {
		const chunk = registers.slice(offset, offset + 8);
		rows.push(
			<tr>
				<td style="font-family:monospace;font-weight:600;opacity:0.75">
					0x{offset.toString(16).padStart(2, "0").toUpperCase()}
				</td>
				{chunk.map((val, idx) => {
					const regAddr = offset + idx;
					const isLatch = regAddr === 0x27;
					return (
						<td
							style="font-family:monospace;text-align:center"
							title={`Reg 0x${regAddr.toString(16).padStart(2, "0").toUpperCase()}: 0x${val
								.toString(16)
								.padStart(2, "0")
								.toUpperCase()} (${val})`}
						>
							{isLatch ? (
								<span class="fttr-badge fttr-badge-warning">
									0x{val.toString(16).padStart(2, "0").toUpperCase()}
								</span>
							) : (
								<span>0x{val.toString(16).padStart(2, "0").toUpperCase()}</span>
							)}
						</td>
					);
				})}
				{Array.from({ length: 8 - chunk.length }).map(() => (
					<td style="text-align:center;opacity:0.35">—</td>
				))}
			</tr>,
		);
	}

	return (
		<div style="overflow-x:auto">
			<table class="table cbi-section-table" style="font-size:90%;margin-top:8px">
				<thead>
					<tr>
						<th style="width:64px;opacity:0.8">Addr</th>
						<th style="opacity:0.8">+0</th>
						<th style="opacity:0.8">+1</th>
						<th style="opacity:0.8">+2</th>
						<th style="opacity:0.8">+3</th>
						<th style="opacity:0.8">+4</th>
						<th style="opacity:0.8">+5</th>
						<th style="opacity:0.8">+6</th>
						<th style="opacity:0.8">+7</th>
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
			<p style="font-size:85%;opacity:0.75;margin:4px 0 0">
				注：寄存器 <code>0x27</code>（黄色高亮）为硬件生效锁存寄存器，顺序写入时自动跳过，写入完成后统一送入{" "}
				<code>0x55</code> 提交生效。
			</p>
		</div>
	);
}

function renderParametersCard(cal: ParsedCalibration, title: string, subtitle?: string): HTMLElement {
	const hashBadge = cal.isStockHash ? (
		<span class="fttr-badge fttr-badge-success">官方出厂基线匹配</span>
	) : (
		<span class="fttr-badge fttr-badge-info">自定义校准数据</span>
	);

	const sizeBadge =
		cal.size === 288 ? (
			<span class="fttr-badge fttr-badge-success">标准 288 字节</span>
		) : (
			<span class="fttr-badge fttr-badge-warning">基础 56 字节（缺 ADC 系数）</span>
		);

	return (
		<div class="fttr-card" style="margin-top:12px">
			<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px">
				<div>
					<h4 style="margin:0;font-size:105%">{title}</h4>
					{subtitle && <p style="margin:2px 0 0;font-size:85%;opacity:0.75">{subtitle}</p>}
				</div>
				<div style="display:flex;gap:6px">
					{sizeBadge}
					{hashBadge}
				</div>
			</div>

			<div class="fttr-grid-3" style="margin-bottom:12px">
				<div class="fttr-card">
					<div class="fttr-kv-label" style="font-size:85%">
						数据大小
					</div>
					<div style="font-size:110%;font-weight:600;margin-top:2px">{cal.size} 字节</div>
				</div>
				<div class="fttr-card">
					<div class="fttr-kv-label" style="font-size:85%">
						SHA-256 校验和
					</div>
					<code style="font-size:80%;word-break:break-all">{cal.sha256}</code>
				</div>
				<div class="fttr-card">
					<div class="fttr-kv-label" style="font-size:85%">
						出厂基线一致性
					</div>
					<div style="margin-top:2px">
						{cal.isStockHash ? "完全吻合 (a9447a8...)" : "非原厂默认 (自标定)"}
					</div>
				</div>
			</div>

			<h5 style="margin:16px 0 6px;font-size:95%">ADC 诊断多项式换算系数 (偏移 0x40 ~ 0x5F)</h5>
			<div style="overflow-x:auto">
				<table class="table cbi-section-table" style="font-size:90%">
					<thead>
						<tr>
							<th>诊断测量通道</th>
							<th>寄存器偏移</th>
							<th>分子 N</th>
							<th>分母 D</th>
							<th>偏移 O</th>
							<th>换算公式</th>
							<th>典型 Raw 模拟值</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>
								<strong>温度主参数 (Temp)</strong>
							</td>
							<td>
								<code>0x40 / 0x42 / 0x44</code>
							</td>
							<td>{cal.tempPrimary.n}</td>
							<td>{cal.tempPrimary.d}</td>
							<td>{cal.tempPrimary.o}</td>
							<td>
								<code>(raw * N / D + O) / 256 °C</code>
							</td>
							<td>
								Raw <code>0x5980</code> → <strong>{cal.simulated.temp} °C</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>温度备用参数 (Alt Temp)</strong>
							</td>
							<td>
								<code>0x58 / 0x5A / 0x5C</code>
							</td>
							<td>{cal.tempAlt.n}</td>
							<td>{cal.tempAlt.d}</td>
							<td>{cal.tempAlt.o}</td>
							<td>当计算温度 ≤ {cal.tempThreshold} °C 时采用备用参数</td>
							<td>分段阈值：{cal.tempThreshold} °C</td>
						</tr>
						<tr>
							<td>
								<strong>供电电压 (Vcc)</strong>
							</td>
							<td>
								<code>0x46 / 0x48 / 0x4A</code>
							</td>
							<td>{cal.voltage.n}</td>
							<td>{cal.voltage.d}</td>
							<td>{cal.voltage.o}</td>
							<td>
								<code>(raw * N / D + O) / 10000 V</code>
							</td>
							<td>
								Raw <code>0x8880</code> → <strong>{cal.simulated.voltage} V</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>偏置电流 (Bias Current)</strong>
							</td>
							<td>
								<code>0x4C / 0x4E / 0x50</code>
							</td>
							<td>{cal.bias.n}</td>
							<td>{cal.bias.d}</td>
							<td>{cal.bias.o}</td>
							<td>
								<code>(raw * N / D + O) / 500 mA</code>
							</td>
							<td>
								Raw <code>0x1F40</code> → <strong>{cal.simulated.bias} mA</strong>
							</td>
						</tr>
						<tr>
							<td>
								<strong>发射光功率 (Tx Power)</strong>
							</td>
							<td>
								<code>0x52 / 0x54 / 0x56</code>
							</td>
							<td>{cal.txPower.n}</td>
							<td>{cal.txPower.d}</td>
							<td>{cal.txPower.o}</td>
							<td>
								<code>p_mw = (raw*N/D+O)/10000; 10*log10(p_mw) dBm</code>
							</td>
							<td>
								Raw <code>0x2440</code> → <strong>{cal.simulated.txPower ?? "—"} dBm</strong>
							</td>
						</tr>
					</tbody>
				</table>
			</div>

			<h5 style="margin:16px 0 6px;font-size:95%">BOSA 硬件寄存器初始化表 (前 56 字节，0x00 ~ 0x37)</h5>
			{renderRegisterGrid(cal.registers)}
		</div>
	);
}

function renderCalibrationPage(currentInfo: CalibrationInfo): HTMLElement {
	const root = document.createElement("div");
	root.className = "fttr-calibration";

	let uploadedBuffer: ArrayBuffer | null = null;
	let parsedUpload: ParsedCalibration | null = null;

	const warningMount = <div />;
	const statusMount = <div />;
	const previewMount = <div />;
	const alertMount = <div />;

	function renderActiveSourceBadge(source: "factory" | "firmware" | "builtin"): HTMLElement {
		switch (source) {
			case "factory":
				return <span class="fttr-badge fttr-badge-success">1MB Factory 分区 (偏移 0x2200)</span>;
			case "firmware":
				return <span class="fttr-badge fttr-badge-info">/lib/firmware/modified_UX3326.bin</span>;
			case "builtin":
				return <span class="fttr-badge fttr-badge-danger">内置静态默认版本 (Fallback)</span>;
		}
	}

	function refreshCurrentStatus(info: CalibrationInfo) {
		warningMount.innerHTML = "";
		statusMount.innerHTML = "";

		// 1. Fallback Warning Banner
		if (info.source === "builtin") {
			warningMount.appendChild(
				<div class="alert-message warning" style="margin-bottom:16px">
					<h4 style="margin:0 0 6px">当前正处于【内置静态默认版本】回退运行模式</h4>
					<p style="margin:0 0 4px">
						系统未在 <strong>1MB Factory UBI 分区 (偏移 0x2200)</strong> 读取到有效校准数据，且目标固件目录{" "}
						<code>/lib/firmware/modified_UX3326.bin</code> 不存在。当前光模块正使用编译期源码内嵌参数运行。
					</p>
					<p style="margin:0;font-size:90%;opacity:0.85">
						建议将从原厂备份提取的 288 字节 <code>modified_UX3326.bin</code> 校准文件通过下方表单上传至{" "}
						<code>/lib/firmware/modified_UX3326.bin</code>，以确保激光器发射功率及 ADC 诊断读数精确。
					</p>
				</div>,
			);
		}

		// 2. Parse active data if available
		let activeParsed: ParsedCalibration | null = null;
		if (info.data) {
			try {
				const buf = base64ToArrayBuffer(info.data);
				activeParsed = parseCalibrationBuffer(buf, info.sha256);
			} catch {
				// ignore parse failure
			}
		}

		// 3. Parse factory data if present
		let factoryParsed: ParsedCalibration | null = null;
		if (info.factory.has_data && info.factory.data) {
			try {
				const buf = base64ToArrayBuffer(info.factory.data);
				factoryParsed = parseCalibrationBuffer(buf, info.factory.sha256);
			} catch {
				// ignore parse failure
			}
		}

		// 4. Source Status Overview Card
		statusMount.appendChild(
			<div class="cbi-section" style="margin-bottom:16px">
				<div class="fttr-card">
					<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;flex-wrap:wrap;gap:8px">
						<h3 style="margin:0;font-size:110%">当前系统生效校准数据</h3>
						<div style="display:flex;align-items:center;gap:8px">
							<span class="fttr-kv-label">生效数据源：</span>
							{renderActiveSourceBadge(info.source)}
						</div>
					</div>

					<div class="fttr-grid-3" style="margin-bottom:12px">
						<div class="fttr-card">
							<div class="fttr-kv-label" style="font-size:85%">
								当前生效路径
							</div>
							<strong style="word-break:break-all;font-size:95%">{info.active_path}</strong>
						</div>
						<div class="fttr-card">
							<div class="fttr-kv-label" style="font-size:85%">
								生效数据大小
							</div>
							<div style="font-size:110%;font-weight:600;margin-top:2px">{info.size} 字节</div>
						</div>
						<div class="fttr-card">
							<div class="fttr-kv-label" style="font-size:85%">
								SHA-256 校验和
							</div>
							<code style="font-size:80%;word-break:break-all">{info.sha256}</code>
						</div>
					</div>

					<h4 style="margin:16px 0 8px;font-size:95%;border-top:1px dashed rgba(127,140,141,0.2);padding-top:12px">
						校准数据源探测概况
					</h4>
					<div class="fttr-grid-2">
						<div class="fttr-card">
							<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
								<strong>1. 1MB Factory 分区 (最高优先级)</strong>
								{info.factory.has_data ? (
									<span class="fttr-badge fttr-badge-success">数据有效 (288 字节)</span>
								) : (
									<span class="fttr-badge fttr-badge-neutral">无有效数据</span>
								)}
							</div>
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">设备与偏移</span>
								<code>{info.factory.device || "未探测到设备"} @ 0x2200</code>
							</div>
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">使用状态</span>
								<span>
									{info.source === "factory" ? (
										<span class="fttr-badge fttr-badge-success">当前正在使用</span>
									) : (
										<span style="opacity:0.7">未生效</span>
									)}
								</span>
							</div>
						</div>

						<div class="fttr-card">
							<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px">
								<strong>2. 固件文件路径 (次优先级)</strong>
								{info.firmware.exists ? (
									<span class="fttr-badge fttr-badge-info">已存在 ({info.firmware.size} 字节)</span>
								) : (
									<span class="fttr-badge fttr-badge-neutral">文件不存在</span>
								)}
							</div>
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">固件路径</span>
								<code>{info.firmware.path}</code>
							</div>
							<div class="fttr-kv-row">
								<span class="fttr-kv-label">使用状态</span>
								<span>
									{info.source === "firmware" ? (
										<span class="fttr-badge fttr-badge-info">当前正在使用</span>
									) : info.firmware.exists ? (
										<span class="fttr-badge fttr-badge-neutral">已就绪 (被 Factory 覆盖)</span>
									) : (
										<span style="opacity:0.7">未就绪</span>
									)}
								</span>
							</div>
						</div>
					</div>
				</div>

				{/* If 1MB factory has data, directly display its parsed parameters card */}
				{info.factory.has_data && factoryParsed && (
					<div style="margin-top:16px">
						{renderParametersCard(
							factoryParsed,
							"1MB Factory 分区提取的下行光校准参数 (偏移 0x2200)",
							`设备: ${info.factory.device}，长度 288 字节${
								info.source === "factory" ? " (当前系统正在使用该数据)" : ""
							}`,
						)}
					</div>
				)}

				{/* If active source is firmware or builtin, show the active parameters */}
				{(!info.factory.has_data || info.source !== "factory") && activeParsed && (
					<div style="margin-top:16px">
						{renderParametersCard(
							activeParsed,
							`当前系统生效校准参数 (${info.active_path})`,
							`生效数据大小: ${info.size} 字节`,
						)}
					</div>
				)}
			</div>,
		);
	}

	refreshCurrentStatus(currentInfo);

	// Upload form components
	const applyHardwareCheckbox = (
		<input id="fttr-cal-apply-hw" type="checkbox" checked style="margin-right:6px" />
	) as HTMLInputElement;

	const uploadButton = (
		<button type="button" class="cbi-button cbi-button-action" disabled style="margin-right:8px">
			{tr("上传并保存至 /lib/firmware/modified_UX3326.bin")}
		</button>
	) as HTMLButtonElement;

	const fileInput = (<input type="file" accept=".bin" style="display:none" />) as HTMLInputElement;

	const dropZone = (
		<div class="fttr-dropzone">
			<div style="font-size:22px;margin-bottom:6px" aria-hidden="true">
				<span style="display:inline-block;width:1em;height:1em;background-color:currentColor;mask:url(&quot;data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath d='M3 7V5a1 1 0 0 1 1-1h5l2 3h9a1 1 0 0 1 1 1v11a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V7Z' fill='none' stroke='black' stroke-width='2' stroke-linejoin='round'/%3E%3C/svg%3E&quot;) center/contain no-repeat" />
			</div>
			<div style="font-weight:600;margin-bottom:4px">点击选择或拖拽 UX3326.bin 文件至此处</div>
			<div style="font-size:85%;opacity:0.75">
				支持 <code>modified_UX3326.bin</code> 文件；必须严格为 288 字节
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
		alertMount.innerHTML = "";
		previewMount.innerHTML = "";
		uploadButton.disabled = true;

		const size = file.size;

		// 1. Strict File Size Validation
		if (size !== 288 && size !== 56) {
			alertMount.appendChild(
				<div class="alert-message danger">
					<h4 style="margin:0 0 6px">文件大小校验失败</h4>
					<p style="margin:0">
						标准 Semtech UX3326 BOSA 校准文件必须严格为 <strong>288 字节</strong>
						（前 56 字节寄存器配置 + 0x40 后的 ADC 诊断换算系数）。
						<br />
						当前选中的文件 <strong>{file.name}</strong> 大小为 <strong>{size} 字节</strong>，已阻止上传。
					</p>
				</div>,
			);
			return;
		}

		try {
			const buffer = await file.arrayBuffer();
			uploadedBuffer = buffer;
			const hash = await computeSha256(buffer);
			const parsed = parseCalibrationBuffer(buffer, hash);

			if (!parsed) {
				alertMount.appendChild(
					<div class="alert-message danger">
						<h4 style="margin:0 0 6px">解析校准文件失败</h4>
						<p style="margin:0">无法解析该校准文件的数据结构，请确认文件完整性。</p>
					</div>,
				);
				return;
			}

			parsedUpload = parsed;
			uploadButton.disabled = false;

			// Show validation passed banner
			alertMount.appendChild(
				<div class="alert-message success">
					<h4 style="margin:0 0 6px">
						文件校验成功：{file.name} ({size} 字节)
					</h4>
					<p style="margin:0">
						SHA-256: <code>{hash}</code>
						{parsed.isStockHash ? " (与原厂官方出厂基线完全吻合)" : " (自定义/自标定校准表)"}
						<br />
						各项参数已成功解析并在下方预览，核对无误后点击下方按钮上传至{" "}
						<code>/lib/firmware/modified_UX3326.bin</code>。
					</p>
				</div>,
			);

			// Render preview card
			previewMount.appendChild(renderParametersCard(parsed, `待上传文件参数预览：${file.name}`));
		} catch (err) {
			alertMount.appendChild(
				<div class="alert-message danger">
					<p style="margin:0">读取文件异常：{String(err)}</p>
				</div>,
			);
		}
	}

	uploadButton.addEventListener("click", async () => {
		if (!uploadedBuffer || !parsedUpload) return;

		uploadButton.disabled = true;
		uploadButton.textContent = "正在上传至 /lib/firmware/modified_UX3326.bin...";
		alertMount.innerHTML = "";

		try {
			const base64Data = arrayBufferToBase64(uploadedBuffer);
			const shouldApply = applyHardwareCheckbox.checked;

			// Step 1: Save strictly to /lib/firmware/modified_UX3326.bin
			const saveRes = await saveCalibration(base64Data);
			if (!saveRes.success) {
				throw new Error(saveRes.error || "保存校准文件失败");
			}

			let applyMsg = "";
			// Step 2: Apply to transceiver if checked
			if (shouldApply) {
				uploadButton.textContent = "正在配置 BOSA 光收发器硬件...";
				const applyRes = await applyCalibration();
				if (!applyRes.success) {
					applyMsg = `，但光收发器硬件初始化警告：${applyRes.error || "未知异常"}`;
				} else {
					applyMsg = "，且光收发器硬件重置与寄存器表已成功锁存写入（bosa-init 成功）";
				}
			}

			alertMount.appendChild(
				<div class="alert-message success">
					<h4 style="margin:0 0 6px">校准数据保存成功！</h4>
					<p style="margin:0">
						文件已写入至 <code>{saveRes.path}</code>（{saveRes.size} 字节，SHA-256:{" "}
						<code>{saveRes.sha256}</code>）{applyMsg}。
					</p>
				</div>,
			);

			// Step 3: Refresh server calibration status
			const refreshed = await getCalibration();
			refreshCurrentStatus(refreshed);
		} catch (err) {
			alertMount.appendChild(
				<div class="alert-message danger">
					<h4 style="margin:0 0 6px">上传写入失败</h4>
					<p style="margin:0">{String(err)}</p>
				</div>,
			);
		} finally {
			uploadButton.disabled = false;
			uploadButton.textContent = tr("上传并保存至 /lib/firmware/modified_UX3326.bin");
		}
	});

	root.appendChild(
		<div>
			<style>{`
				.fttr-calibration {
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
					.fttr-calibration {
						--fttr-success-color: #2ecc71;
						--fttr-warning-color: #f39c12;
						--fttr-danger-color: #e74c3c;
						--fttr-info-color: #3498db;
						--fttr-neutral-color: #bdc3c7;
					}
				}

				[data-darkmode="true"] .fttr-calibration,
				[data-theme="dark"] .fttr-calibration {
					--fttr-success-color: #2ecc71;
					--fttr-warning-color: #f39c12;
					--fttr-danger-color: #e74c3c;
					--fttr-info-color: #3498db;
					--fttr-neutral-color: #bdc3c7;
				}

				.fttr-calibration .fttr-badge {
					display: inline-block;
					padding: 0.18em 0.55em;
					font-size: 85%;
					font-weight: 600;
					line-height: 1.25;
					border-radius: 3px;
					white-space: nowrap;
					text-align: center;
				}

				.fttr-calibration .fttr-badge-success {
					background: var(--fttr-success-bg);
					color: var(--fttr-success-color);
					border: 1px solid var(--fttr-success-border);
				}

				.fttr-calibration .fttr-badge-warning {
					background: var(--fttr-warning-bg);
					color: var(--fttr-warning-color);
					border: 1px solid var(--fttr-warning-border);
				}

				.fttr-calibration .fttr-badge-danger {
					background: var(--fttr-danger-bg);
					color: var(--fttr-danger-color);
					border: 1px solid var(--fttr-danger-border);
				}

				.fttr-calibration .fttr-badge-info {
					background: var(--fttr-info-bg);
					color: var(--fttr-info-color);
					border: 1px solid var(--fttr-info-border);
				}

				.fttr-calibration .fttr-badge-neutral {
					background: var(--fttr-neutral-bg);
					color: var(--fttr-neutral-color);
					border: 1px solid var(--fttr-neutral-border);
				}

				.fttr-calibration .fttr-grid-2 {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
					gap: 12px;
					margin: 8px 0;
				}

				.fttr-calibration .fttr-grid-3 {
					display: grid;
					grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
					gap: 12px;
					margin: 8px 0;
				}

				.fttr-calibration .fttr-card {
					padding: 12px 14px;
					border: 1px solid rgba(127, 140, 141, 0.2);
					border-radius: 6px;
					background: rgba(127, 140, 141, 0.04);
				}

				.fttr-calibration .fttr-kv-row {
					display: flex;
					justify-content: space-between;
					align-items: center;
					padding: 6px 0;
					border-bottom: 1px dashed rgba(127, 140, 141, 0.15);
					font-size: 88%;
				}

				.fttr-calibration .fttr-kv-row:last-child {
					border-bottom: none;
				}

				.fttr-calibration .fttr-kv-label {
					opacity: 0.75;
				}

				.fttr-calibration .fttr-dropzone {
					border: 1px dashed rgba(127, 140, 141, 0.35);
					border-radius: 6px;
					padding: 22px;
					text-align: center;
					background: rgba(127, 140, 141, 0.03);
					cursor: pointer;
					transition: background 0.15s ease, border-color 0.15s ease;
				}

				.fttr-calibration .fttr-dropzone:hover {
					background: rgba(127, 140, 141, 0.08);
					border-color: rgba(127, 140, 141, 0.6);
				}
			`}</style>

			<h2 style="margin-bottom:6px">BOSA 下行光路校准管理 (UX3326)</h2>
			<p class="cbi-section-descr" style="margin-bottom:16px">
				管理 HM2004-DU Micro-OLT FPGA 子系统挂载的 Semtech UX3326 BOSA 光收发器校准数据。系统按优先级依次从{" "}
				<strong>1MB Factory UBI 分区 (偏移 0x2200)</strong>、<strong>/lib/firmware/modified_UX3326.bin</strong>{" "}
				读取校准数据；若均无有效数据则自动回退至内置静态默认版本。
			</p>

			{warningMount}
			{statusMount}

			<div class="cbi-section">
				<h3>上传新的 UX3326 校准文件</h3>
				<p style="font-size:90%;opacity:0.75;margin-top:0;margin-bottom:12px">
					上传新的校准表将固定保存至固件目录 <code>/lib/firmware/modified_UX3326.bin</code>
					。文件大小必须严格为 288 字节。
				</p>
				{dropZone}
				{fileInput}
				<div style="margin-top:12px">{alertMount}</div>
				<div style="margin-top:12px">{previewMount}</div>

				<div class="fttr-card" style="margin-top:16px">
					<h4 style="margin-top:0;margin-bottom:12px">写入设置与执行</h4>
					<div class="fttr-kv-row" style="margin-bottom:12px">
						<span class="fttr-kv-label" style="min-width:160px">
							目标存储路径
						</span>
						<code>/lib/firmware/modified_UX3326.bin</code>
					</div>
					<div class="fttr-kv-row" style="margin-bottom:16px">
						<span class="fttr-kv-label" style="min-width:160px">
							硬件立即生效
						</span>
						<label htmlFor="fttr-cal-apply-hw" style="display:flex;align-items:center;cursor:pointer">
							{applyHardwareCheckbox}
							<span>保存后立即向 BOSA 硬件写入 56 寄存器并执行锁存提交 (bosa-init)</span>
						</label>
					</div>
					<div>{uploadButton}</div>
				</div>
			</div>
		</div>,
	);

	return root;
}

const main = view.extend({
	load(): Promise<CalibrationInfo> {
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
