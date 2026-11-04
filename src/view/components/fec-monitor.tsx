// SPDX-License-Identifier: Apache-2.0
import type { FttrStatus } from "../contracts/status";

export function createFecMonitor(initial: FttrStatus) {
	const rows = <tbody />;
	const summary = <p />;
	const enabled = <span />;
	const element = (
		<div class="cbi-section" data-fttr="fec-monitor">
			<h3>{_("ONU FEC monitoring details")}</h3>
			<p>{_("Counters describe the last completed 15-minute PM interval, not live or cumulative traffic.")}</p>
			<div class="fttr-card">
				<div class="fttr-kv-row">
					<span class="fttr-kv-label">{_("Downstream FEC hardware state")}</span>
					{enabled}
				</div>
				{summary}
			</div>
			<div class="table-wrapper" style="overflow-x:auto;margin-top:12px">
				<table class="table">
					<thead>
						<tr>
							<th>{_("ONU")}</th>
							<th>{_("OMCI status")}</th>
							<th>{_("Interval")}</th>
							<th>{_("Corrected bytes")}</th>
							<th>{_("Corrected code words")}</th>
							<th>{_("Uncorrectable code words")}</th>
							<th>{_("Total code words")}</th>
							<th>{_("FEC seconds")}</th>
						</tr>
					</thead>
					{rows}
				</table>
			</div>
		</div>
	);
	const update = (status: FttrStatus) => {
		const onus = status.sub_gateways ?? [];
		const ready = onus.filter((onu) => onu.state === "o5_operation" && onu.fec?.downstream_pm != null).length;
		const desired = status.pon_mac?.desired_fec_enabled;
		const actual = status.pon_mac?.fec_enabled;
		enabled.textContent = `${_("Saved")}: ${desired == null ? _("Unknown") : desired ? _("Enabled") : _("Disabled")} · ${_("Hardware")}: ${actual == null ? _("Unknown") : actual ? _("Enabled") : _("Disabled")}`;
		summary.textContent = !desired
			? _("OMCI FEC monitoring paused")
			: `${_("OMCI FEC monitoring ready")}: ${ready}/${onus.length}`;
		rows.replaceChildren(
			...onus.map((onu) => {
				const fec = onu.fec;
				const pm = fec?.downstream_pm;
				return (
					<tr>
						<td>{`${onu.onu_id} · ${onu.model || onu.vendor}`}</td>
						<td>
							{onu.state !== "o5_operation"
								? _("Offline")
								: pm
									? _("Ready")
									: fec?.measurement.reason || _("Awaiting OMCI preparation")}
						</td>
						<td>{pm?.interval_end_time ?? "—"}</td>
						<td>{pm?.corrected_bytes ?? "—"}</td>
						<td>{pm?.corrected_code_words ?? "—"}</td>
						<td>{pm?.uncorrectable_code_words ?? "—"}</td>
						<td>{pm?.total_code_words ?? "—"}</td>
						<td>{pm?.fec_seconds ?? "—"}</td>
					</tr>
				);
			}),
		);
	};
	update(initial);
	return { element, update };
}
