// SPDX-License-Identifier: Apache-2.0

import { getNpuStatus, setNpu } from "./contracts/api";
import type { NpuStatus } from "./contracts/status";
import { exactCounter, maskText } from "./npu-data";

function row(label: string, value: string | number | HTMLElement): HTMLElement {
	return (
		<div class="fttr-npu-row">
			<span>{label}</span>
			<strong>{value}</strong>
		</div>
	);
}

function flag(value: boolean, valid: boolean | undefined, yes: string, no: string): HTMLElement {
	return (
		<span class={`fttr-npu-state ${valid === true ? (value ? "ready" : "pending") : ""}`}>
			{valid === true ? (value ? yes : no) : _("Unknown")}
		</span>
	);
}

function renderStatus(npu: NpuStatus): HTMLElement {
	if (!npu.supported)
		return (
			<div class="cbi-section">
				{_("NPU hardware acceleration is not compiled or unsupported on this target.")}
			</div>
		);
	const routed = npu.wan_upstream || npu.wan_downstream;
	const admissionMask = routed ? npu.routed_offload_mask : npu.bridge_offload_mask;
	const admissionValid = routed ? npu.routed_mask_valid : npu.mask_valid;
	return (
		<div>
			{npu.sampled_at_ms === undefined ? (
				<p class="alert-message warning">
					{_("Backend reliability metadata is unavailable. Update fttrctl before trusting these readings.")}
				</p>
			) : null}
			{npu.errors?.length ? (
				<div class="alert-message warning">
					<strong>{_("Some data sources are unavailable")}</strong>
					<ul>
						{npu.errors.map((error) => (
							<li>{error}</li>
						))}
					</ul>
				</div>
			) : null}
			<div class="fttr-npu-grid">
				<div class="cbi-section">
					<h3>{_("Engine and admission status")}</h3>
					{row(
						_("Saved configuration"),
						flag(npu.bridge_offload_enabled, npu.config_valid, _("Enabled"), _("Disabled")),
					)}
					{row(_("NPU engine"), flag(npu.engine_attached, npu.engine_valid, _("Attached"), _("Detached")))}
					{row(
						_("Port admission"),
						flag(admissionMask !== 0, admissionValid, _("Admitted"), _("Not admitted")),
					)}
					{row(_("Configured mode"), routed ? _("WAN routed offload") : _("ONU bridge offload"))}
					{row(_("Managed bridge"), npu.config_valid ? npu.bridge : "—")}
					{row(_("Bridge offload mask"), maskText(npu.bridge_offload_mask, npu.mask_valid))}
					{row(_("Admitted ports"), admissionValid ? npu.active_ports.join(", ") || _("None") : "—")}
					{row(_("Firewall hooks"), flag(npu.fw4_hooks_ready, npu.hooks_valid, _("Ready"), _("Not ready")))}
					{row(_("Routed offload mask"), maskText(npu.routed_offload_mask, npu.routed_mask_valid))}
					{row(
						_("Driver debug logging"),
						flag(npu.bridge_offload_debug, npu.debug_valid, _("Enabled"), _("Disabled")),
					)}
					<p class="fttr-npu-note">
						{_(
							"Admission allows eligible traffic to bind; it does not prove that packets are currently hardware-forwarded. The switch controls FTTR bridge and WAN admission, not the entire NPU or firewall offloading for other interfaces.",
						)}
					</p>
				</div>
				<div class="cbi-section">
					<h3>{_("PPE flow snapshot")}</h3>
					{row(_("Bound hardware flows"), npu.flows_valid ? npu.bound_entries : "—")}
					{row(_("Current non-empty FOE entries"), npu.entries_valid ? npu.total_entries : "—")}
					{row(_("Current bound-flow packets"), exactCounter(npu.total_packets_exact, npu.counters_valid))}
					{row(_("Current bound-flow bytes"), exactCounter(npu.total_bytes_exact, npu.counters_valid))}
					<p class="fttr-npu-note">
						{_(
							"Source: PPE debugfs bind/entries and driver sysfs. These are global PPE snapshots, not FTTR-only totals or table capacity. Reads are sequential, not atomic.",
						)}
					</p>
					<p class="fttr-npu-note">
						{_(
							"Counters cover only currently bound flows and may decrease when flows expire. Driver-exported zeroes are not proof of no traffic. AN7581 native L2B counters are unavailable; — means unavailable, not zero.",
						)}
					</p>
				</div>
			</div>
			<div class="cbi-section">
				<h3>{_("Active hardware offload flows (PPE FOE Bound)")}</h3>
				{!npu.flows_valid ? (
					<p>{_("Flow table is unavailable. A failed read must not be interpreted as an empty table.")}</p>
				) : npu.bound_flows.length === 0 ? (
					<p>{_("No bound hardware flows in this snapshot.")}</p>
				) : (
					<div style="overflow-x:auto">
						<table class="table fttr-npu-flows">
							<thead>
								<tr>
									{[
										_("Index"),
										_("Type"),
										_("Original endpoints"),
										_("Translated endpoints"),
										_("Ethernet / MAC"),
										_("VLAN"),
										_("Packets"),
										_("Bytes"),
									].map((label) => (
										<th>{label}</th>
									))}
								</tr>
							</thead>
							<tbody>
								{npu.bound_flows.map((flow) => (
									<tr>
										<td>
											<code>{flow.index}</code>
										</td>
										<td>{flow.pkt_type}</td>
										<td>
											<code>{flow.orig_tuple || "—"}</code>
										</td>
										<td>
											<code>{flow.new_tuple || "—"}</code>
										</td>
										<td>
											<code>{flow.eth || "—"}</code>
										</td>
										<td>{flow.vlan || "—"}</td>
										<td>
											{exactCounter(
												flow.packets_exact,
												flow.counters_valid && npu.engine_valid && npu.engine_attached,
											)}
										</td>
										<td>
											{exactCounter(
												flow.bytes_exact,
												flow.counters_valid && npu.engine_valid && npu.engine_attached,
											)}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}

function renderPage(): HTMLElement {
	let latest: NpuStatus | undefined;
	let busy = false;
	let dirty = false;
	let revision = 0;
	let lastReceived = 0;
	let inFlight: Promise<void> | undefined;
	const enabled = (
		<input
			id="fttr-npu-enabled"
			type="checkbox"
			disabled
			onchange={() => {
				dirty = true;
			}}
		/>
	) as HTMLInputElement;
	const bridge = (
		<input
			id="fttr-npu-bridge"
			type="text"
			maxLength={15}
			disabled
			oninput={() => {
				dirty = true;
			}}
		/>
	) as HTMLInputElement;
	const feedback = <p aria-live="polite" />;
	const direction = (id: string) =>
		(
			<input
				id={id}
				type="checkbox"
				disabled
				onchange={() => {
					dirty = true;
				}}
			/>
		) as HTMLInputElement;
	const wanUpstream = direction("fttr-npu-wan-upstream");
	const wanDownstream = direction("fttr-npu-wan-downstream");
	const onuBridge = direction("fttr-npu-onu-bridge");
	const freshness = <p aria-live="polite">{_("Loading…")}</p>;
	const content = <div />;
	const save = (
		<button type="button" class="cbi-button cbi-button-apply" disabled>
			{_("Save NPU configuration")}
		</button>
	) as HTMLButtonElement;
	const refresh = (
		<button type="button" class="cbi-button cbi-button-action">
			{_("Refresh")}
		</button>
	) as HTMLButtonElement;
	const controls = (): void => {
		const unavailable =
			busy ||
			!L.hasViewPermission() ||
			!latest?.supported ||
			latest.config_valid !== true ||
			!lastReceived ||
			Date.now() - lastReceived > 12000;
		enabled.disabled = bridge.disabled = save.disabled = unavailable;
		wanUpstream.disabled = wanDownstream.disabled = onuBridge.disabled = unavailable;
		refresh.disabled = busy || !!inFlight;
	};
	const fetchStatus = async (): Promise<void> => {
		if (inFlight || busy) return inFlight;
		const token = revision;
		inFlight = (async () => {
			try {
				// A timed-out/late response can never overwrite a newer operation.
				let timer: ReturnType<typeof setTimeout> | undefined;
				const npu = await Promise.race([
					getNpuStatus(),
					new Promise<never>((_resolve, reject) => {
						timer = setTimeout(() => reject(new Error(_("NPU status request timed out"))), 10000);
					}),
				]).finally(() => clearTimeout(timer));
				if (token !== revision || busy) return;
				latest = npu;
				lastReceived = Date.now();
				if (!dirty && npu.config_valid) {
					enabled.checked = npu.bridge_offload_enabled;
					bridge.value = npu.bridge;
					wanUpstream.checked = npu.wan_upstream;
					wanDownstream.checked = npu.wan_downstream;
					onuBridge.checked = npu.onu_bridge;
				}
				content.replaceChildren(renderStatus(npu));
				freshness.textContent = `${_("Last successful sample")}: ${npu.sampled_at_ms ? new Date(npu.sampled_at_ms).toLocaleString() : _("Unknown")} · ${_("Refresh interval: 3 seconds")}`;
			} catch (error) {
				if (token !== revision || busy) return;
				lastReceived = 0;
				// Remove old figures instead of leaving stale green indicators visible.
				content.replaceChildren(
					<p class="alert-message warning">
						{_("Live NPU data is unavailable. Previous readings are stale.")}
					</p>,
				);
				freshness.textContent = `${_("Refresh failed")}: ${String(error)}`;
			} finally {
				inFlight = undefined;
				controls();
			}
		})();
		controls();
		return inFlight;
	};
	refresh.onclick = () => {
		void fetchStatus();
	};
	save.onclick = async () => {
		if (save.disabled || busy) return;
		const name = bridge.value.trim();
		const requestedEnabled = enabled.checked;
		const requestedUpstream = wanUpstream.checked;
		const requestedDownstream = wanDownstream.checked;
		const requestedOnuBridge = onuBridge.checked;
		let saved = false;
		if (requestedEnabled && requestedOnuBridge && (requestedUpstream || requestedDownstream)) {
			feedback.textContent = _(
				"WAN and ONU bridge offload cannot be enabled together. Disable ONU bridge offload before enabling WAN directions.",
			);
			return;
		}
		if (!/^[a-zA-Z0-9_.-]{1,15}$/.test(name)) {
			feedback.textContent = _(
				"Use a bridge interface name of 1–15 letters, digits, dots, underscores or hyphens.",
			);
			return;
		}
		busy = true;
		revision++;
		controls();
		feedback.textContent = _("Saving…");
		try {
			const reply = await setNpu({
				enabled: requestedEnabled,
				bridge: name,
				wan_upstream: requestedUpstream,
				wan_downstream: requestedDownstream,
				onu_bridge: requestedOnuBridge,
			});
			if (reply.status !== "success") throw new Error(reply.error || _("Failed to save NPU configuration"));
			dirty = false;
			saved = true;
			feedback.textContent = _(
				"Configuration saved. Waiting for driver admission readback; enabling may take several seconds and requires eligible ports and firewall policy.",
			);
		} catch (error) {
			feedback.textContent = `${_("NPU configuration failed")}: ${String(error)}`;
		} finally {
			await inFlight;
			busy = false;
			await fetchStatus();
			if (
				saved &&
				(!lastReceived ||
					!latest?.config_valid ||
					latest.bridge !== name ||
					latest.bridge_offload_enabled !== requestedEnabled ||
					latest.wan_upstream !== requestedUpstream ||
					latest.wan_downstream !== requestedDownstream ||
					latest.onu_bridge !== requestedOnuBridge)
			) {
				feedback.textContent = _(
					"Save returned success, but configuration readback could not be confirmed. Refresh before retrying.",
				);
			}
			controls();
		}
	};
	const root = (
		<div class="cbi-map fttr-npu">
			<style>{`.fttr-npu-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px}.fttr-npu-row{display:flex;justify-content:space-between;gap:16px;padding:7px 0;border-bottom:1px dashed #8884}.fttr-npu-row strong{text-align:right;overflow-wrap:anywhere}.fttr-npu-note{opacity:.75;font-size:90%;line-height:1.5}.fttr-npu-state{padding:2px 6px;border:1px solid #8886;border-radius:4px}.fttr-npu-state.ready{color:#2b8;border-color:#2b86}.fttr-npu-state.pending{color:#d90;border-color:#d906}.fttr-npu label{display:inline-flex;gap:8px;align-items:center;margin:8px 20px 8px 0}.fttr-npu-flows{font-size:85%}.fttr-npu-flows td{overflow-wrap:anywhere}`}</style>
			<h2>{_("NPU hardware acceleration")}</h2>
			<div class="cbi-section">
				<h3>{_("NPU configuration")}</h3>
				<label htmlFor="fttr-npu-enabled">
					{enabled}
					{_("Enable FTTR hardware offload")}
				</label>
				<label htmlFor="fttr-npu-bridge">
					{_("Bridge interface")}
					{bridge}
				</label>
				<label htmlFor="fttr-npu-wan-upstream">
					{wanUpstream}
					{_("Enable WAN upstream offload (experimental)")}
				</label>
				<label htmlFor="fttr-npu-wan-downstream">
					{wanDownstream}
					{_("Enable WAN downstream offload (experimental)")}
				</label>
				<label htmlFor="fttr-npu-onu-bridge">
					{onuBridge}
					{_("Enable ONU bridge offload")}
				</label>
				<p class="fttr-npu-note">
					{_(
						"WAN and ONU bridge offload use exclusive port modes. Disable ONU bridge offload before enabling either WAN direction.",
					)}
				</p>
				<p class="fttr-npu-note">
					{_(
						"WAN directions require software and hardware flow offloading in the firewall settings. Saving here does not change those global settings.",
					)}
				</p>
				<div>
					{save} {refresh}
				</div>
				{feedback}
			</div>
			{freshness}
			{content}
		</div>
	);
	void fetchStatus();
	L.Poll.add(async () => {
		if (!root.isConnected) return;
		if (lastReceived && Date.now() - lastReceived > 12000) {
			lastReceived = 0;
			content.replaceChildren(
				<p class="alert-message warning">{_("Live NPU data is unavailable. Previous readings are stale.")}</p>,
			);
			controls();
		}
		await fetchStatus();
	}, 3);
	return root;
}

const main = L.view.extend({
	render: renderPage,
	handleSaveApply: null,
	handleSave: null,
	handleReset: null,
});

export { main };
