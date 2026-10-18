// SPDX-License-Identifier: Apache-2.0

import { getStatus } from "../contracts/api";
import { assertNever, checked } from "../contracts/common";
import { type Definition, getMib, type MibReport, mibSnapshot, startMib, type Value } from "../contracts/mib";
import { businessText, eqdText, type SubGateway as OnuDetails } from "../contracts/status";

const text = (v: unknown): string => (v == null || v === "" ? "—" : String(v));
const json = (v: unknown): string => JSON.stringify(v, null, 2);
function valueText(value: Value | null): string {
	if (value === null) return _("Conflicting values; inspect observations");
	switch (value.type) {
		case "unsigned":
		case "signed":
		case "decimal":
		case "text":
			return text(value.value);
		case "octets":
			return text(value.hex);
		case "table_length":
			return text(value.bytes);
		default:
			return assertNever(value);
	}
}

function reference(definition: Definition): HTMLElement {
	const ref = definition.reference;
	return ref?.url.startsWith("https://github.com/opencord/omci-lib-go/blob/v2.2.4/") ? (
		<a href={ref.url} target="_blank" rel="noopener noreferrer">
			{ref.id}
		</a>
	) : (
		<span>—</span>
	);
}

function browser(report: MibReport): HTMLElement {
	const content = <div style="min-width:0;flex:1" />;
	const filter = (<input type="search" placeholder={_("Search ME name or Class ID")} />) as HTMLInputElement;
	const classes = <div />;
	function select(id: number): void {
		content.replaceChildren(
			...report.entities
				.filter((e) => e.class_id === id)
				.map((entity) => (
					<details>
						<summary>
							{text(entity.name)} · {_("Entity")} {entity.entity_id} (0x{entity.entity_id.toString(16)}) ·{" "}
							{entity.support}
						</summary>
						<table class="table">
							<thead>
								<tr>
									<th>{_("Attribute")}</th>
									<th>{_("Type")}</th>
									<th>{_("Value")}</th>
									<th>{_("Definition")}</th>
								</tr>
							</thead>
							<tbody>
								{entity.attributes.map((attribute) => (
									<tr>
										<td>{attribute.definition.name}</td>
										<td>{attribute.definition.kind}</td>
										<td>
											{valueText(attribute.value)}
											<details>
												<summary>{_("Raw data / observations")}</summary>
												<pre style="white-space:pre-wrap;overflow-wrap:anywhere">
													{json(attribute.observations)}
												</pre>
											</details>
										</td>
										<td>{reference(attribute.definition)}</td>
									</tr>
								))}
							</tbody>
						</table>
						{!entity.attributes.length ? (
							<p>{_("Basic display only; raw records are preserved.")}</p>
						) : null}
						{report.tables
							.filter((t) => t.class_id === id && t.entity_id === entity.entity_id)
							.map((table) => (
								<details>
									<summary>
										{table.attribute.name} ·{" "}
										{table.collected ? `${table.rows.length} ${_("rows")}` : text(table.error)}
									</summary>
									{table.vlan_rules.length ? (
										<table class="table">
											<thead>
												<tr>
													<th>{_("Outer filter (priority / VID / TPID-DEI)")}</th>
													<th>{_("Inner filter (priority / VID / TPID-DEI)")}</th>
													<th>{_("EtherType code")}</th>
													<th>{_("Remove tags")}</th>
													<th>{_("Outer treatment (priority / VID / TPID-DEI)")}</th>
													<th>{_("Inner treatment (priority / VID / TPID-DEI)")}</th>
													<th>{_("Delete entry")}</th>
												</tr>
											</thead>
											<tbody>
												{table.vlan_rules.map((rule) => (
													<tr>
														<td>{`${rule.filter_outer_priority} / ${rule.filter_outer_vid} / ${rule.filter_outer_tpid_dei}`}</td>
														<td>{`${rule.filter_inner_priority} / ${rule.filter_inner_vid} / ${rule.filter_inner_tpid_dei}`}</td>
														<td>{text(rule.filter_ethertype)}</td>
														<td>{text(rule.tags_to_remove)}</td>
														<td>{`${rule.treatment_outer_priority} / ${rule.treatment_outer_vid} / ${rule.treatment_outer_tpid_dei}`}</td>
														<td>{`${rule.treatment_inner_priority} / ${rule.treatment_inner_vid} / ${rule.treatment_inner_tpid_dei}`}</td>
														<td>{text(rule.delete_entry)}</td>
													</tr>
												))}
											</tbody>
										</table>
									) : null}
									<p>
										{_("G.988 encoded field values")}: {reference(table.attribute)}
									</p>
									<pre style="white-space:pre-wrap;overflow-wrap:anywhere">
										{json(table.vlan_rules.length ? table.vlan_rules : table.rows)}
									</pre>
								</details>
							))}
						<details>
							<summary>{_("Records / diagnostics")}</summary>
							<pre style="white-space:pre-wrap;overflow-wrap:anywhere">
								{json({
									diagnostics: entity.diagnostics,
									records: report.records.filter(
										(r) => r.class_id === id && r.entity_id === entity.entity_id,
									),
								})}
							</pre>
						</details>
					</details>
				)),
		);
	}
	function list(): void {
		const query = filter.value.toLowerCase();
		classes.replaceChildren(
			...report.classes
				.filter((c) => `${c.class_id} ${c.name ?? ""}`.toLowerCase().includes(query))
				.map((c) => (
					<div>
						<button
							type="button"
							class="cbi-button"
							style="margin:.2em 0;white-space:normal;text-align:left"
							onclick={() => select(c.class_id)}
						>
							{c.class_id} · {c.name ?? _("Unknown class")} ({c.entities})
						</button>
					</div>
				)),
		);
	}
	filter.addEventListener("input", list);
	list();
	if (report.classes.length) select(report.classes[0].class_id);
	return (
		<div style="display:flex;gap:1em;flex-wrap:wrap">
			<div style="flex:0 1 240px">
				{filter}
				{classes}
			</div>
			{content}
		</div>
	);
}

export function showOnuDetails(initial: OnuDetails, initialTab = "basic"): void {
	let closed = false;
	let busy = false;
	let report: MibReport | null = null;
	const basic = (
		<table class="table">
			<tbody>
				{[
					[_("Vendor"), initial.vendor],
					[_("Model"), initial.identity?.equipment_id ?? initial.model],
					[_("Optical serial"), initial.serial_number],
					[_("ONU ID"), initial.onu_id],
					[_("Registration"), initial.state],
					[_("Business"), businessText(initial.business_status)],
					[_("Data interface"), initial.data_path?.interface],
					[
						_("Receive optical power"),
						initial.optical_rx_power_dbm == null ? null : `${initial.optical_rx_power_dbm.toFixed(3)} dBm`,
					],
					[
						_("Transmit optical power"),
						initial.optical_tx_power_dbm == null ? null : `${initial.optical_tx_power_dbm.toFixed(3)} dBm`,
					],
					[_("Uptime"), initial.uptime_seconds == null ? null : `${Math.floor(initial.uptime_seconds)} s`],
					[_("Equalization delay (EQD)"), eqdText(initial.equalization_delay_bits)],
					[_("Hardware version"), initial.identity?.hardware_version ?? initial.hardware_version],
					[_("Software images"), initial.identity?.software_images?.join(", ") ?? initial.firmware_version],
					[
						_("OMCC version"),
						initial.identity?.omcc_version == null
							? null
							: `0x${initial.identity.omcc_version.toString(16)}`,
					],
					[
						_("Identity source"),
						initial.identity
							? initial.identity_current === false
								? _("Cached identity")
								: initial.identity_current === true
									? _("Current registration")
									: _("Registration freshness unavailable")
							: _("Not collected"),
					],
					[
						_("Identity age"),
						initial.identity_age_seconds == null ? null : `${initial.identity_age_seconds} s`,
					],
					[_("Identity read errors"), initial.identity?.errors?.join("; ")],
				].map(([name, value]) => (
					<tr>
						<th>{name}</th>
						<td>{text(value)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
	const message = <p role="status">{_("Read MIB on demand. Results are a snapshot, not live polling.")}</p>;
	const results = <div />;
	const raw = (<textarea readOnly rows={20} style="width:100%;font-family:monospace" />) as HTMLTextAreaElement;
	const copyMessage = <span role="status" />;
	const copy = (
		<button
			type="button"
			class="cbi-button"
			onclick={async () => {
				try {
					await navigator.clipboard.writeText(raw.value);
					copyMessage.textContent = _("Copied");
				} catch {
					raw.focus();
					raw.select();
					copyMessage.textContent = _("Select and copy the JSON manually.");
				}
			}}
		>
			{_("Copy JSON")}
		</button>
	) as HTMLButtonElement;
	const download = (
		<a href="data:application/json,%7B%7D" class="cbi-button" download={`mib-${initial.serial_number}.json`}>
			{_("Download JSON")}
		</a>
	) as HTMLAnchorElement;
	let downloadUrl: string | null = null;
	const rawPanel = (
		<div>
			<p>
				{copy} {download} {copyMessage}
			</p>
			{raw}
		</div>
	);
	const read = (
		<button type="button" class="cbi-button cbi-button-action" onclick={() => run(false)}>
			{_("Read MIB")}
		</button>
	) as HTMLButtonElement;
	const tables = (
		<button type="button" class="cbi-button cbi-button-action" onclick={() => run(true)}>
			{_("Read MIB and VLAN tables")}
		</button>
	) as HTMLButtonElement;
	const mib = (
		<div>
			<p>
				{read} {tables}
			</p>
			{message}
			{results}
		</div>
	);
	const panels: Record<string, HTMLElement> = { basic, mib, raw: rawPanel };
	const buttons = new Map<string, HTMLButtonElement>();
	function tab(name: string): void {
		for (const [key, panel] of Object.entries(panels)) {
			if (key === name) panel.style.removeProperty("display");
			else panel.style.setProperty("display", "none", "important");
		}
		for (const [key, button] of buttons) button.disabled = key === name;
	}
	const navigation = (
		<p>
			{[
				["basic", _("Basic information")],
				["mib", "OMCI / MIB"],
				["raw", _("Raw JSON")],
			].map(([key, label]) => {
				const button = (
					<button type="button" class="cbi-button" onclick={() => tab(key)}>
						{label}
					</button>
				) as HTMLButtonElement;
				buttons.set(key, button);
				return button;
			})}
		</p>
	);
	const body = (
		<>
			{navigation}
			{basic}
			{mib}
			{rawPanel}
			<div class="right">
				<button
					type="button"
					class="cbi-button"
					onclick={() => {
						closed = true;
						if (downloadUrl) URL.revokeObjectURL(downloadUrl);
						L.ui.hideModal();
					}}
				>
					{_("Close")}
				</button>
			</div>
		</>
	);
	// The body is a Fragment; track a persistent element after its children are mounted.
	const active = (): boolean => !closed && navigation.isConnected && navigation.getClientRects().length > 0;
	async function run(withTables: boolean): Promise<void> {
		if (busy) return;
		busy = true;
		read.disabled = tables.disabled = true;
		message.textContent = _("Reading MIB…");
		try {
			const status = await getStatus();
			const current = status.sub_gateways?.find((o) => o.serial_number === initial.serial_number);
			if (current?.state !== "o5_operation")
				throw new Error(_("Device is offline; reopen details after registration."));
			if (!active()) return;
			const started = await startMib(current.onu_id, current.serial_number, withTables);
			const deadline = Date.now() + 140000;
			while (active()) {
				const result = await getMib(started.job, 0);
				if (!active()) return;
				if (result.status === "ready") {
					if (
						!result.chunks ||
						result.chunks > 1024 ||
						!result.bytes ||
						result.bytes > 32 * 1024 * 1024 ||
						result.chunk !== 0 ||
						!result.data
					)
						throw new Error(_("Invalid MIB snapshot"));
					const buffer = new Uint8Array(result.bytes);
					let offset = 0;
					for (let chunk = 0; chunk < result.chunks; chunk++) {
						const part = chunk === 0 ? result : await getMib(started.job, chunk);
						if (!active()) return;
						if (
							part.status !== "ready" ||
							part.chunk !== chunk ||
							part.chunks !== result.chunks ||
							part.bytes !== result.bytes ||
							!part.data
						)
							throw new Error(_("Invalid MIB snapshot chunk"));
						const decoded = atob(part.data);
						if (decoded.length > 32768 || offset + decoded.length > buffer.length)
							throw new Error(_("Invalid MIB snapshot size"));
						for (let index = 0; index < decoded.length; index++)
							buffer[offset++] = decoded.charCodeAt(index);
						message.textContent = `${_("Downloading MIB snapshot")}: ${chunk + 1}/${result.chunks}`;
					}
					if (offset !== buffer.length) throw new Error(_("Incomplete MIB snapshot"));
					const snapshot = mibSnapshot.parse(
						checked(JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(buffer))),
					);
					report = snapshot.report;
					if (report.schema_version !== 1 || report.onu_id !== current.onu_id)
						throw new Error(_("Unexpected MIB response"));
					message.textContent = `${new Date().toLocaleString()} · ONU ${report.onu_id} · ${_("Upload complete")}: ${report.uploaded_complete} · ${report.received_records}/${report.expected_records} · ${_("Decoded / partial / basic")}: ${report.decoded_records}/${report.partial_records}/${report.basic_records} · ${_("Tables requested / collected")}: ${report.tables_requested}/${report.tables_collected}`;
					results.replaceChildren(
						browser(report),
						<details>
							<summary>{_("Upload diagnostics")}</summary>
							<pre>{json(report.diagnostics)}</pre>
						</details>,
					);
					raw.value = json(report);
					if (downloadUrl) URL.revokeObjectURL(downloadUrl);
					downloadUrl = URL.createObjectURL(new Blob([raw.value], { type: "application/json" }));
					download.href = downloadUrl;
					copy.disabled = false;
					download.style.display = "";
					return;
				}
				if (Date.now() >= deadline) throw new Error(_("MIB query timed out; retry."));
				await new Promise((resolve) => setTimeout(resolve, 1000));
			}
		} catch (error) {
			if (active())
				message.textContent = `${String(error)}${report ? ` · ${_("Previous snapshot retained")}` : ""}`;
		} finally {
			busy = false;
			read.disabled = tables.disabled = false;
		}
	}
	copy.disabled = true;
	download.style.display = "none";
	tab(initialTab);
	L.ui.showModal(`${initial.model} — ${initial.serial_number}`, body);
}
