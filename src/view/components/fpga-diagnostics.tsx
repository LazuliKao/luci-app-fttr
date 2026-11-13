// SPDX-License-Identifier: Apache-2.0
import type { FpgaGrant, FpgaSnapshot } from "../../api/generated/types";
import { createFpgaSampler, type FpgaSample, type SamplingState } from "../../fpga-diagnostics";
import { isPageHidden } from "../../visibility";
import { getFpgaDiagnostic } from "../contracts/api";

const hex = (value: number) => `0x${value.toString(16).padStart(8, "0")}`;
const deltaText = (value: number | null | undefined) => (value === null || value === undefined ? "—" : `+${value}`);

function grant(value: FpgaGrant): HTMLElement {
	return (
		<span>
			{`${_("bit 28")}: ${value.enabled_bit28 ? "1" : "0"}; ${_("Bandwidth (raw units)")}: ${value.bandwidth}; ${_("Weight")}: ${value.weight}`}
			<br />
			<small>{`${hex(value.bandwidth_raw)} / ${hex(value.control_raw)}`}</small>
		</span>
	);
}

function renderSample(sample: FpgaSample): HTMLElement {
	const { snapshot: snap, delta } = sample;
	return (
		<div>
			<p>{`${_("Sample time")}: ${new Date(snap.started_unix_ms).toISOString()}; ${_("Read duration")}: ${snap.read_duration_us} µs`}</p>
			<p>{`${_("Main bandwidth enabled")}: ${snap.main_bandwidth_enabled ? _("Yes") : _("No")} (${hex(snap.main_bandwidth_raw)})`}</p>
			<p role="status">
				{delta?.hardware_continuity_verified
					? `${_("Modulo deltas over")}: ${delta.elapsed_ms} ms`
					: _(
							"No continuous baseline. Deltas are withheld until daemon and hardware context continuity can be verified.",
						)}
			</p>
			<div style="overflow-x:auto">
				<table class="table">
					<thead>
						<tr>
							<th>{_("ONU slot")}</th>
							<th>{_("Registration token")}</th>
							<th>LoB (16-bit)</th>
							<th>BIP (16-bit)</th>
							<th>{_("Management grant")}</th>
							<th>{_("Business grant")}</th>
						</tr>
					</thead>
					<tbody>
						{snap.onus.map((onu) => {
							const change = delta?.onus.find((item) => item.slot === onu.slot);
							return (
								<tr class="tr">
									<td>{onu.slot}</td>
									<td>{onu.generation ?? _("Unregistered")}</td>
									<td>{`${onu.lob} (${deltaText(change?.lob_modulo_65536)})`}</td>
									<td>{`${onu.bip} (${deltaText(change?.bip_modulo_65536)})`}</td>
									<td>{grant(onu.management)}</td>
									<td>{grant(onu.business)}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			<h3>{_("Global counters (32-bit)")}</h3>
			<p>
				{_(
					"Global counters cannot be attributed to a selected ONU. FPGA BCH readings are separate from ONU FEC PM. Grant bandwidth units are unverified.",
				)}
			</p>
			<div style="overflow-x:auto">
				<table class="table">
					<thead>
						<tr>
							<th>{_("Group")}</th>
							<th>{_("Stock label / key")}</th>
							<th>{_("Address")}</th>
							<th>{_("Value")}</th>
							<th>{_("Modulo delta")}</th>
						</tr>
					</thead>
					<tbody>
						{snap.counter_descriptors.map((item) => (
							<tr class="tr">
								<td>{item.group}</td>
								<td>
									{item.label}
									<br />
									<small>{item.key}</small>
								</td>
								<td>
									<code>{item.address}</code>
								</td>
								<td>{snap.counters[item.key]}</td>
								<td>{deltaText(delta?.counters_modulo_4294967296?.[item.key])}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<details>
				<summary>{_("Source, limitations and raw registers")}</summary>
				<p style="overflow-wrap:anywhere">{`moltdbg SHA-256: ${snap.source_sha256}`}</p>
				<p>{snap.limitations}</p>
				<p style="overflow-wrap:anywhere">{`${_("Daemon")}: ${snap.daemon_instance ?? "—"}; ${_("Hardware epoch")}: ${snap.hardware_epoch ?? "—"}`}</p>
				<pre>{JSON.stringify(snap.raw_registers, null, 2)}</pre>
			</details>
		</div>
	);
}

function download(samples: readonly FpgaSample[], ndjson: boolean): void {
	const data = ndjson
		? `${samples.map((sample) => JSON.stringify(sample)).join("\n")}\n`
		: JSON.stringify({ schema_version: 2, samples }, null, 2);
	const url = URL.createObjectURL(new Blob([data], { type: ndjson ? "application/x-ndjson" : "application/json" }));
	const link = (<a href={url}>{_("Export JSON")}</a>) as HTMLAnchorElement;
	link.download = `fttr-fpga-diagnostics.${ndjson ? "ndjson" : "json"}`;
	link.click();
	setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function createFpgaDiagnostics() {
	let active = false;
	let samples: readonly FpgaSample[] = [];
	let latest: FpgaSnapshot | undefined;
	const target = (
		<select id="fttr-fpga-target" aria-label={_("ONU slot")}>
			<option value="all">{_("All slots")}</option>
			{Array.from({ length: 16 }, (_, id) => (
				<option value={String(id)}>{`ONU ${id}`}</option>
			))}
		</select>
	) as HTMLSelectElement;
	const count = (
		<input id="fttr-fpga-count" type="number" min="1" max="120" step="1" value="10" aria-label={_("Samples")} />
	) as HTMLInputElement;
	const interval = (
		<input
			id="fttr-fpga-interval"
			type="number"
			min="100"
			max="10000"
			step="100"
			value="1000"
			aria-label={_("Interval (ms)")}
		/>
	) as HTMLInputElement;
	const notice = <p role="status">{_("Read a snapshot or start a bounded sampling window.")}</p>;
	const output = <div />;
	const single = (
		<button class="cbi-button cbi-button-action" type="button" click={() => start(1)}>
			{_("Read snapshot")}
		</button>
	) as HTMLButtonElement;
	const startButton = (
		<button class="cbi-button cbi-button-action" type="button" click={() => start(Number(count.value))}>
			{_("Start sampling")}
		</button>
	) as HTMLButtonElement;
	const stopButton = (
		<button class="cbi-button" type="button" disabled click={() => sampler.stop()}>
			{_("Stop")}
		</button>
	) as HTMLButtonElement;
	const json = (
		<button class="cbi-button" type="button" disabled click={() => download(samples, false)}>
			{_("Export JSON")}
		</button>
	) as HTMLButtonElement;
	const ndjson = (
		<button class="cbi-button" type="button" disabled click={() => download(samples, true)}>
			{_("Export NDJSON")}
		</button>
	) as HTMLButtonElement;
	const element = (
		<div class="cbi-section" hidden>
			<h3>{_("FPGA diagnostics")}</h3>
			<p>
				{_(
					"Read-only observed register diagnostics. Sampling is limited to 120 samples and 60 seconds; it stops when this panel becomes inactive.",
				)}
			</p>
			<div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
				<label htmlFor="fttr-fpga-target">
					{_("ONU slot")} {target}
				</label>
				<label htmlFor="fttr-fpga-count">
					{_("Samples")} {count}
				</label>
				<label htmlFor="fttr-fpga-interval">
					{_("Interval (ms)")} {interval}
				</label>
				{single}
				{startButton}
				{stopButton}
				{json}
				{ndjson}
			</div>
			{notice}
			{output}
		</div>
	);
	const leave = () => {
		if (isPageHidden() || !element.isConnected) sampler.stop();
	};
	const pageHide = () => sampler.stop();
	let listening = false;
	function changed(state: SamplingState) {
		samples = state.samples;
		for (const control of [target, count, interval, single, startButton])
			control.disabled = state.running || state.busy;
		stopButton.disabled = !state.running;
		json.disabled = ndjson.disabled = samples.length === 0;
		if (state.running !== listening) {
			listening = state.running;
			if (listening) {
				document.addEventListener("visibilitychange", leave);
				window.addEventListener("pagehide", pageHide);
			} else {
				document.removeEventListener("visibilitychange", leave);
				window.removeEventListener("pagehide", pageHide);
			}
		}
		notice.className = state.error ? "alert-message warning" : "";
		notice.textContent = state.error
			? `${_("Sampling failed; retained samples may be stale.")} ${state.error}`
			: `${state.running ? _("Sampling") : state.busy ? _("Waiting for pending read") : _("Stopped")}: ${samples.length} ${_("samples")}`;
		const sample = samples[samples.length - 1];
		if (sample?.snapshot !== latest) {
			latest = sample?.snapshot;
			output.replaceChildren(...(sample ? [renderSample(sample)] : []));
		}
	}
	const sampler = createFpgaSampler({
		read: getFpgaDiagnostic,
		available: () => active && element.isConnected && !isPageHidden(),
		changed,
	});
	function start(sampleCount: number) {
		try {
			sampler.start({
				request: target.value === "all" ? {} : { onu_id: Number(target.value) },
				samples: sampleCount,
				intervalMs: Number(interval.value),
			});
		} catch (error) {
			notice.textContent = error instanceof Error ? error.message : String(error);
		}
	}
	return {
		element,
		setActive(value: boolean) {
			active = value;
			element.hidden = !value;
			if (!value) sampler.stop();
		},
	};
}
