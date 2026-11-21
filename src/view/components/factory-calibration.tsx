// SPDX-License-Identifier: Apache-2.0
import type { NativeCalibrationInfo } from "../../api/generated/types";
import { applyCalibration, getCalibrationDetails } from "../contracts/api";

/** AN4475-G2's opaque factory table, deliberately independent of HM2004's editor. */
export function renderFactoryCalibration(initial: NativeCalibrationInfo): HTMLElement {
	let info = initial;
	let busy = false;
	let message = "";
	let failed = false;
	const mount = <div />;
	async function run(apply: boolean) {
		if (busy) return;
		if (apply && (!L.hasViewPermission() || !info.can_apply || !info.factory_table.valid)) return;
		busy = true;
		message = "";
		failed = false;
		render();
		try {
			const outcome = apply
				? await applyCalibration().then(
						(result) => ({ ok: true as const, result }),
						(error: unknown) => ({ ok: false as const, error }),
					)
				: undefined;
			// A timed-out RPC can still have changed hardware. Refresh the receipt
			// even when the job request fails, without discarding the original error.
			const next = await getCalibrationDetails().catch((error: unknown) => {
				if (outcome && !outcome.ok) throw new Error(`${String(outcome.error)}; ${String(error)}`);
				throw error;
			});
			if (!("factory_table" in next) || next.profile !== "ux3326s_factory") {
				throw new Error(_("The calibration profile changed. Reload this page."));
			}
			info = next;
			if (outcome && !outcome.ok) throw outcome.error;
			if (apply) {
				const result = outcome?.ok ? outcome.result : undefined;
				if (!result?.success || !info.application.applied) {
					throw new Error(
						result?.error || info.application.error || _("Factory calibration was not applied."),
					);
				}
				message = _("Factory calibration applied through checked I2C transactions.");
			}
		} catch (error) {
			failed = true;
			message = error instanceof Error ? error.message : String(error);
		} finally {
			busy = false;
			render();
		}
	}
	function render() {
		const table = info.factory_table;
		const applied = info.application;
		mount.replaceChildren(
			<div class="cbi-section">
				<h3>{_("AN4475-G2 factory optical calibration")}</h3>
				<p>
					{_(
						"UX3326S1 uses this device's original factory table. HM2004 coefficient editing, firmware uploads and source selection do not apply to this profile.",
					)}
				</p>
				<p>
					{_(
						"Reapplying temporarily stops ONU service, disables downstream transmission, verifies the live chip signature, writes the factory sequence and restores the saved optical settings. The factory partition is never written.",
					)}
				</p>
				<table class="table cbi-section-table">
					<tbody>
						<tr>
							<td>{_("Source")}</td>
							<td>
								<code>
									{table.source} @ 0x{table.offset.toString(16)}
								</code>
							</td>
						</tr>
						<tr>
							<td>{_("Table / payload bytes")}</td>
							<td>
								{table.size} / {table.payload_bytes}
							</td>
						</tr>
						<tr>
							<td>{_("Header, payload CRC and chip discriminator")}</td>
							<td>{table.valid ? _("Valid") : _("Invalid")}</td>
						</tr>
						<tr>
							<td>{_("Chip discriminator")}</td>
							<td>{table.chip_id === null ? "—" : `0x${table.chip_id.toString(16)}`}</td>
						</tr>
						<tr>
							<td>SHA-256</td>
							<td style="overflow-wrap:anywhere">
								<code>{table.sha256 || "—"}</code>
							</td>
						</tr>
						<tr>
							<td>{_("Application status")}</td>
							<td>{applied.applied ? _("Applied by hardware owner") : _("Not applied")}</td>
						</tr>
						<tr>
							<td>{_("Applied SHA-256")}</td>
							<td style="overflow-wrap:anywhere">
								<code>{applied.sha256 || "—"}</code>
							</td>
						</tr>
						<tr>
							<td>{_("Live chip signature verified")}</td>
							<td>{applied.live_signature_verified ? _("Yes") : _("No")}</td>
						</tr>
						<tr>
							<td>{_("Completed register writes")}</td>
							<td>{applied.register_writes}</td>
						</tr>
						<tr>
							<td>{_("Applied at")}</td>
							<td>
								{applied.applied_unix === null
									? "—"
									: new Date(applied.applied_unix * 1000).toLocaleString()}
							</td>
						</tr>
					</tbody>
				</table>
				<p>
					{_(
						"Application confirms the checked I2C sequence, not full register readback, measured optical power or HM2004 temperature compensation. Unverified live measurements remain unavailable.",
					)}
				</p>
				{(table.error || applied.error) && <p class="alert-message warning">{table.error || applied.error}</p>}
				{message && <p class={`alert-message ${failed ? "warning" : "success"}`}>{message}</p>}
				<button type="button" class="cbi-button" disabled={busy} onclick={() => run(false)}>
					{_("Refresh")}
				</button>{" "}
				{info.can_apply && (
					<button
						type="button"
						class="cbi-button cbi-button-apply"
						disabled={busy || !table.valid || !L.hasViewPermission()}
						onclick={() => run(true)}
					>
						{busy ? _("Applying…") : _("Reapply factory calibration")}
					</button>
				)}
			</div>,
		);
	}
	render();
	return mount;
}
