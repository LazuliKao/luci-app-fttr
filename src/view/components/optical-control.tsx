// SPDX-License-Identifier: Apache-2.0
import type { OpticalReply, OpticalSettings } from "../../api/generated/types";
import { getOpticalStatus, setOptical } from "../contracts/api";

export function createOpticalControl(platformId?: string | null) {
	const fsl = platformId === "fiberhome-an4475-g2";
	const definitions = [
		[
			"enabled",
			fsl ? _("Optical controller master switch") : _("FPGA master switch"),
			fsl
				? _(
						"Controls the optical hardware owner and ONU discovery. Turning it off disables GPON transmission and disconnects all ONUs; it does not reset the optical module.",
					)
				: _(
						"Controls optical module reset and ONU discovery. Turning it off resets the module and disconnects all ONUs.",
					),
		],
		[
			"downstream_tx_enabled",
			fsl ? _("GPON downstream transmission") : _("GPON downstream optical emission"),
			fsl
				? _(
						"Controls GPON downstream frame transmission. Turning it off stops ONU communication without resetting the optical module.",
					)
				: _(
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
	const required = <T,>(items: Map<keyof OpticalSettings, T>, key: keyof OpticalSettings): T => {
		const item = items.get(key);
		if (item === undefined) throw new Error(`Missing optical control: ${key}`);
		return item;
	};
	const message = <p role="status" aria-live="polite" />;
	const value = (state: boolean | null | undefined) =>
		state == null ? _("Unknown") : state ? _("Enabled") : _("Disabled");
	const save = (
		<button class="cbi-button cbi-button-apply" type="button" disabled>
			{_("Save & Apply")}
		</button>
	) as HTMLButtonElement;
	const read = (): OpticalSettings => ({
		enabled: required(inputs, "enabled").checked,
		downstream_tx_enabled: required(inputs, "downstream_tx_enabled").checked,
		fec_enabled: required(inputs, "fec_enabled").checked,
	});
	const isApplied = () =>
		Boolean(
			saved &&
				reply?.status === "success" &&
				reply.hardware_ready &&
				reply.actor_state === (saved.enabled ? "enabled" : "disabled") &&
				reply.tx_enabled === saved.enabled &&
				reply.pon_mac?.tx_enabled === (saved.enabled && saved.downstream_tx_enabled) &&
				reply.pon_mac?.fec_enabled === (saved.enabled && saved.fec_enabled) &&
				!reply.error &&
				!reply.pon_mac.error &&
				!reply.cleanup_pending,
		);
	const render = () => {
		for (const [key] of definitions) {
			const input = required(inputs, key);
			input.disabled = busy || stale || !saved || !L.hasViewPermission();
			if (!dirty && saved) input.checked = saved[key];
			const actual =
				key === "enabled"
					? reply?.tx_enabled
					: key === "downstream_tx_enabled"
						? reply?.pon_mac?.tx_enabled
						: reply?.pon_mac?.fec_enabled;
			required(states, key).textContent =
				`${_("Saved")}: ${value(saved?.[key])} · ${fsl && key === "enabled" ? _("Controller") : _("Hardware")}: ${value(actual)}`;
		}
		save.disabled = busy || stale || !saved || !L.hasViewPermission() || (!dirty && isApplied());
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
		message.textContent =
			next.error?.message || mac?.error || (isApplied() ? "" : _("Saved; applying hardware configuration"));
		render();
	};
	const applySettings = async (settings: OpticalSettings) => {
		if (busy || stale || !saved || !L.hasViewPermission()) return;
		busy = true;
		revision++;
		render();
		try {
			const next = await setOptical(settings);
			if (next.status === "success") dirty = false;
			accept(next);
		} catch (error) {
			stale = true;
			message.textContent = String(error);
		} finally {
			busy = false;
			render();
		}
	};
	save.onclick = () => {
		if (busy || stale || !saved || !L.hasViewPermission()) return;
		const settings = read();
		if ((!settings.enabled && saved.enabled) || (!settings.downstream_tx_enabled && saved.downstream_tx_enabled)) {
			L.ui.showModal(
				_("Optical transceiver"),
				<div>
					{[
						<p>{_("This disconnects all ONUs on this PON. Apply these settings?")}</p>,
						<div class="right">
							<button type="button" class="cbi-button" onclick={() => L.ui.hideModal()}>
								{_("Cancel")}
							</button>{" "}
							<button
								type="button"
								class="cbi-button cbi-button-negative"
								onclick={() => {
									L.ui.hideModal();
									return applySettings(settings);
								}}
							>
								{_("Confirm")}
							</button>
						</div>,
					]}
				</div>,
			);
			return;
		}
		return applySettings(settings);
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
