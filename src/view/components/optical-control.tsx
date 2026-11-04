// SPDX-License-Identifier: Apache-2.0
import type { OpticalReply, OpticalSettings } from "../../api/generated/types";
import { getOpticalStatus, setOptical } from "../contracts/api";

export function createOpticalControl() {
	const definitions = [
		[
			"enabled",
			_("FPGA master switch"),
			_(
				"Controls optical module reset and ONU discovery. Turning it off resets the module and disconnects all ONUs.",
			),
		],
		[
			"downstream_tx_enabled",
			_("GPON downstream optical emission"),
			_(
				"Controls GPON downstream 1490 nm optical emission. Turning it off removes the downstream optical signal and disconnects ONUs.",
			),
		],
		[
			"fec_enabled",
			_("GPON downstream FEC encoding"),
			_(
				"Controls GPON downstream FEC encoding. When downstream transmission is enabled, ONU-side OMCI FEC performance monitoring is also enabled.",
			),
		],
	] as const;
	let saved: OpticalSettings | null = null;
	let reply: OpticalReply | null = null;
	let busy = false;
	let refreshing = false;
	let dirty = false;
	let revision = 0;
	let stale = true;
	const inputs = new Map<keyof OpticalSettings, HTMLInputElement>();
	const states = new Map<keyof OpticalSettings, HTMLElement>();
	const message = <p role="status" aria-live="polite" />;
	const value = (state: boolean | null | undefined) =>
		state == null ? _("Unknown") : state ? _("Enabled") : _("Disabled");
	const save = (
		<button class="cbi-button cbi-button-apply" type="button" disabled>
			{_("Save & Apply")}
		</button>
	) as HTMLButtonElement;
	const read = (): OpticalSettings => ({
		enabled: inputs.get("enabled")!.checked,
		downstream_tx_enabled: inputs.get("downstream_tx_enabled")!.checked,
		fec_enabled: inputs.get("fec_enabled")!.checked,
	});
	const render = () => {
		for (const [key] of definitions) {
			const input = inputs.get(key)!;
			input.disabled = busy || stale || !saved || !L.hasViewPermission();
			if (!dirty && saved) input.checked = saved[key];
			const actual =
				key === "enabled"
					? reply?.tx_enabled
					: key === "downstream_tx_enabled"
						? reply?.pon_mac?.tx_enabled
						: reply?.pon_mac?.fec_enabled;
			states.get(key)!.textContent = `${_("Saved")}: ${value(saved?.[key])} · ${_("Hardware")}: ${value(actual)}`;
		}
		save.disabled =
			busy || stale || !saved || !L.hasViewPermission() || (!dirty && !reply?.error && !reply?.pon_mac?.error);
	};
	const element = (
		<div class="cbi-section" data-fttr="optical-control">
			<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:10px">
				{definitions.map(([key, label, description]) => {
					const input = (<input type="checkbox" id={`fttr-optical-${key}`} disabled />) as HTMLInputElement;
					inputs.set(key, input);
					input.onchange = () => {
						dirty = true;
						render();
					};
					const state = <span style="margin-inline-start:1em" />;
					states.set(key, state);
					return (
						<div style="padding:10px 12px;border:1px solid rgba(127,140,141,.25);border-radius:5px;min-width:0">
							<div style="display:flex;align-items:center;justify-content:space-between;gap:8px">
								<label style="font-weight:600" htmlFor={`fttr-optical-${key}`}>
									{label}
								</label>
								{input}
							</div>
							<div style="font-size:82%;margin-top:6px" class="cbi-value-description">
								{description}
							</div>
							<div style="font-size:82%;margin-top:5px" role="status">
								{state}
							</div>
						</div>
					);
				})}
			</div>
			<div style="display:flex;align-items:center;gap:10px;flex-wrap:wrap;margin-top:10px">
				{save}
				{message}
			</div>
		</div>
	);
	const accept = (next: OpticalReply) => {
		stale = false;
		reply = next;
		saved = next.settings ?? null;
		const mac = next.pon_mac;
		const applied =
			saved &&
			next.tx_enabled === saved.enabled &&
			mac &&
			mac.tx_enabled === (saved.enabled && saved.downstream_tx_enabled) &&
			mac.fec_enabled === (saved.enabled && saved.fec_enabled) &&
			!next.cleanup_pending;
		message.textContent =
			next.error?.message || mac?.error || (applied ? "" : _("Saved; applying hardware configuration"));
		render();
	};
	save.onclick = async () => {
		if (busy || stale || !saved || !L.hasViewPermission()) return;
		const settings = read();
		if (
			((!settings.enabled && saved.enabled) ||
				(!settings.downstream_tx_enabled && saved.downstream_tx_enabled)) &&
			!window.confirm(_("This disconnects all ONUs on this PON. Apply these settings?"))
		)
			return;
		busy = true;
		revision++;
		render();
		try {
			const next = await setOptical(settings);
			if (next.status === "success") dirty = false;
			accept(next);
		} catch (error) {
			message.textContent = String(error);
		} finally {
			busy = false;
			render();
		}
	};
	return {
		element,
		async refresh() {
			if (busy || refreshing) return;
			const startedRevision = revision;
			refreshing = true;
			try {
				const next = await getOpticalStatus();
				if (!busy && startedRevision === revision) accept(next);
			} catch (error) {
				if (!busy && startedRevision === revision) {
					stale = true;
					message.textContent = String(error);
					render();
				}
			} finally {
				refreshing = false;
			}
		},
	};
}
