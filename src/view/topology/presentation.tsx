// SPDX-License-Identifier: Apache-2.0
import type {
	MeasurementEvidence,
	TopologyClient,
	TopologyLink,
	TopologyNode,
	TopologyReply,
	TopologySource,
} from "../../api/generated/types";
import {
	getBusinessBadgeSpec,
	getCwmpBadgeSpec,
	getRegistrationBadgeSpec,
	getWifiSyncBadgeSpec,
} from "../components/badge";
import { formatUptime } from "../components/formatters";
import { TOPOLOGY_ICONS, type TopologyIconName } from "./icons";
import { addressSummary, clientKey, linkFor, measurementAge, type Selection } from "./model";
import type { ClientState, TopologyStore } from "./store";

export type Tone = "success" | "warning" | "info" | "neutral" | "danger";
export function badge(label: string, tone: string = "neutral", title?: string): HTMLElement {
	return (
		<span class={`topo-chip topo-${tone}`} title={title}>
			{label}
		</span>
	);
}
export function num(value: number | null | undefined, unit = "", digits = 1): string {
	return value == null || !Number.isFinite(value) ? "—" : `${value.toFixed(digits)}${unit ? ` ${unit}` : ""}`;
}
export function relationText(client: TopologyClient): string {
	return client.relation === "associated_with"
		? _("Wireless association")
		: client.relation === "learned_behind"
			? _("Learned behind gateway")
			: _("Logical PON link");
}
export function queryError(error: string): string {
	if (error === "snapshot_expired") return _("Snapshot expired. Refresh the topology to continue.");
	if (error === "node_not_found") return _("This node is no longer in the snapshot.");
	if (error === "invalid_cursor") return _("The continuation is no longer valid. Refresh the topology.");
	if (error === "snapshot_mismatch") return _("The response belongs to another snapshot. Refresh the topology.");
	return error;
}
export function nodeTone(node: TopologyNode, snapshot: TopologyReply): Tone {
	if (snapshot.issues.some((issue) => issue.node_id === node.id)) return "danger";
	const detail = node.detail;
	if (detail.kind === "controller") return detail.fpga_status.toLowerCase() === "ready" ? "info" : "warning";
	if (detail.registration === null) return "neutral";
	if (detail.registration !== "o5_operation" || detail.business?.error) return "warning";
	return detail.business?.phase === "verified" ? "success" : "info";
}
export function nodeState(node: TopologyNode): string {
	if (node.detail.kind === "controller") return _("Controller");
	if (node.detail.registration === null) return _("Binding only");
	return getRegistrationBadgeSpec(node.detail.registration).label;
}
function nodeStateTitle(node: TopologyNode): string | undefined {
	if (node.detail.kind === "controller") return node.detail.fpga_status;
	const parts = [node.detail.registration ?? "binding_only"];
	if (node.detail.business?.error) parts.push(node.detail.business.error);
	if (node.detail.binding.pending_restart) parts.push("pending_restart");
	return parts.join(" · ");
}
function bindingLabel(node: TopologyNode): string {
	if (node.detail.kind !== "onu") return "";
	const b = node.detail.binding;
	const active = b.active_onu_id == null ? "—" : String(b.active_onu_id);
	const desired = b.desired_onu_id == null ? "—" : String(b.desired_onu_id);
	return b.state === "none"
		? _("Not pinned")
		: b.state === "effective"
			? `${_("Pinned ONU ID")} ${active}`
			: `${_("ONU ID")} ${active} → ${desired} · ${_("Pending restart")}`;
}

function deviceIcon(name: TopologyIconName): HTMLElement {
	const icon = <span class="topo-device-icon" aria-hidden="true" />;
	icon.innerHTML = TOPOLOGY_ICONS[name];
	return icon;
}

export function nodeCard(node: TopologyNode, snapshot: TopologyReply): HTMLElement {
	const detail = node.detail;
	const link = linkFor(snapshot, node.id);
	const address = addressSummary(node).primary;
	return (
		<div class="topo-card-content">
			<div class="topo-card-head">
				{deviceIcon(detail.kind === "controller" ? "controller" : "onu")}
				<div class="topo-card-title">
					<strong title={node.label}>{node.label}</strong>
					<small>
						{detail.kind === "controller"
							? _("Main gateway")
							: `${_("ONU")} ${detail.onu_id ?? "—"} · ${link?.data_interface ?? _("Binding only")}`}
					</small>
				</div>
				<span class={`topo-dot topo-${nodeTone(node, snapshot)}`} aria-hidden="true" />
			</div>
			<div class="topo-card-address" title={address ?? undefined}>
				{address ?? (detail.kind === "onu" ? detail.serial_number : null) ?? _("Address unavailable")}
			</div>
			{detail.kind === "controller" ? (
				<>
					<div class="topo-card-metric">
						<span>{_("Module Tx")}</span>
						<strong>{num(detail.optical.tx_power_dbm, "dBm", 2)}</strong>
					</div>
					<div class="topo-card-foot">
						<span>{_("Nominal PON capacity")}</span>
						<span>{num(detail.optical.nominal_downlink_gbps, "Gbps", 3)}</span>
					</div>
					<small class="topo-card-note">{_("Shared downstream capacity")}</small>
				</>
			) : (
				<>
					<div class="topo-card-metric">
						<span>{_("ONU Rx")}</span>
						<strong>{num(link?.onu_rx_power_dbm, "dBm", 2)}</strong>
						{badge(nodeState(node), nodeTone(node, snapshot), nodeStateTitle(node))}
					</div>
					<div class="topo-card-foot">
						<span>
							{detail.business ? getBusinessBadgeSpec(detail.business).label : bindingLabel(node)}
						</span>
						<span>
							{link?.carrier === true
								? _("Carrier up")
								: link?.carrier === false
									? _("Carrier down")
									: "—"}
						</span>
					</div>
				</>
			)}
		</div>
	);
}

export function clientCard(client: TopologyClient): HTMLElement {
	return (
		<div class="topo-client-content">
			{deviceIcon(client.relation === "associated_with" ? "wifiClient" : "wiredClient")}
			<div class="topo-card-title">
				<strong title={client.hostname ?? client.mac}>{client.hostname ?? client.mac}</strong>
				<small>{relationText(client)}</small>
				<small>{client.addresses[0] ?? client.mac}</small>
			</div>
		</div>
	);
}

function row(label: string, value: unknown): HTMLElement {
	return (
		<div class="topo-detail-row">
			<dt>{label}</dt>
			<dd>{value instanceof Node ? value : value == null || value === "" ? "—" : String(value)}</dd>
		</div>
	);
}
function section(title: string, children: unknown): HTMLElement {
	return (
		<section class="topo-detail-section">
			<h4>{title}</h4>
			{children}
		</section>
	);
}
function specBadge(spec: { label: string; tone: string; title?: string }): HTMLElement {
	return badge(spec.label, spec.tone, spec.title);
}

function measured(
	snapshot: TopologyReply,
	value: number | null | undefined,
	unit: string,
	evidence?: MeasurementEvidence,
	digits = 2,
): HTMLElement {
	const age = measurementAge(snapshot, evidence?.age_seconds);
	return (
		<span class="topo-measure" title={evidence?.reason ?? undefined}>
			{num(value, unit, digits)}
			{evidence ? (
				<small>
					{evidence.source}
					{age == null ? "" : ` · ${num(age, "s", 0)} ${_("ago")}`}
					{evidence.reason ? ` · ${evidence.reason}` : ""}
				</small>
			) : null}
		</span>
	);
}

function opticalDetails(node: TopologyNode, snapshot: TopologyReply, link?: TopologyLink): HTMLElement | null {
	if (node.detail.kind === "controller") {
		const o = node.detail.optical;
		return section(
			_("Optical module diagnostics"),
			<dl>
				{row(_("Module"), o.model)}
				{row(_("Transmit power"), measured(snapshot, o.tx_power_dbm, "dBm", o.measurements.tx_power_dbm))}
				{row(
					_("Laser bias current"),
					measured(snapshot, o.laser_bias_current_ma, "mA", o.measurements.laser_bias_current_ma),
				)}
				{row(
					_("Temperature"),
					measured(snapshot, o.temperature_celsius, "°C", o.measurements.temperature_celsius),
				)}
				{row(_("Supply voltage"), measured(snapshot, o.vcc_voltage, "V", o.measurements.vcc_voltage, 4))}
				{row(_("Transmitter"), o.tx_enabled == null ? null : o.tx_enabled ? _("Enabled") : _("Disabled"))}
				{row(_("Tx / Rx wavelength"), `${o.wavelength_tx_nm} / ${o.wavelength_rx_nm} nm`)}
				{row(_("Nominal downstream / upstream"), `${o.nominal_downlink_gbps} / ${o.nominal_uplink_gbps} Gbps`)}
				<p class="topo-muted">{_("Shared nominal PON capacity, not per-device negotiated speed.")}</p>
			</dl>,
		);
	}
	if (!link || node.detail.registration === null) return null;
	return section(
		_("ONU optical diagnostics"),
		<dl>
			{row(
				_("Receive power (downstream)"),
				measured(snapshot, link.onu_rx_power_dbm, "dBm", link.measurements.optical_rx_power_dbm),
			)}
			{row(
				_("Transmit power (upstream)"),
				measured(snapshot, link.onu_tx_power_dbm, "dBm", link.measurements.optical_tx_power_dbm),
			)}
			{row(
				_("Equalization delay"),
				measured(snapshot, link.equalization_delay_bits, "bits", link.measurements.equalization_delay_bits, 0),
			)}
		</dl>,
	);
}

function networkDetails(node: TopologyNode, snapshot: TopologyReply, link?: TopologyLink): HTMLElement {
	if (node.detail.kind === "controller") {
		const d = node.detail;
		return section(
			_("Interfaces and uplinks"),
			<div>
				{d.uplinks.length ? (
					d.uplinks.map((u) => (
						<div class="topo-inset">
							<strong>
								{u.interface} · {u.protocol ?? "—"}
							</strong>
							<p>{u.addresses.join(", ") || "—"}</p>
							{badge(u.up ? _("Interface up") : _("Interface down"), u.up ? "info" : "neutral")}
						</div>
					))
				) : (
					<p class="topo-muted">{_("No default-route uplink reported.")}</p>
				)}
				<p class="topo-muted">{_("A default route does not prove Internet reachability.")}</p>
				<details>
					<summary>
						{_("Local interfaces")} ({d.interfaces.length})
					</summary>
					{d.interfaces.map((i) => (
						<div class="topo-inset">
							<strong>{i.name}</strong>
							<dl>
								{row(_("MAC"), i.mac)}
								{row(_("Addresses"), i.addresses.join(", "))}
								{row(_("Carrier"), i.carrier == null ? null : i.carrier ? _("Up") : _("Down"))}
								{i.speed_mbps != null
									? row(_("Physical link speed"), num(i.speed_mbps, "Mbps", 0))
									: null}
								{i.duplex ? row(_("Duplex"), i.duplex) : null}
								{i.bridge_members.length ? row(_("Bridge members"), i.bridge_members.join(", ")) : null}
							</dl>
						</div>
					))}
				</details>
			</div>,
		);
	}
	const path = link?.data_path;
	const inventory = path?.onu_inventory;
	return section(
		_("Logical link and traffic"),
		<>
			<dl>
				{row(_("Data interface"), link?.data_interface)}
				{row(_("Carrier"), link?.carrier == null ? null : link.carrier ? _("Up") : _("Down"))}
				{row(_("Fixed binding"), bindingLabel(node))}
				{path ? (
					<>
						{row(
							_("From ONU (controller RX)"),
							measured(snapshot, path.current_rx_kbps, "kbps", path.measurements.current_rx_kbps, 1),
						)}
						{row(
							_("To ONU (controller TX)"),
							measured(snapshot, path.current_tx_kbps, "kbps", path.measurements.current_tx_kbps, 1),
						)}
						{row(_("Received bytes"), path.rx_bytes?.toLocaleString())}
						{row(_("Transmitted bytes"), path.tx_bytes?.toLocaleString())}
					</>
				) : null}
			</dl>
			<p class="topo-muted">
				{_(
					"Logical interface, not a physical splitter port. Counters do not prove current end-to-end connectivity.",
				)}
			</p>
			{inventory ? (
				<details>
					<summary>{_("Actual OMCI GEM / VLAN inventory")}</summary>
					<pre>{JSON.stringify(inventory, null, 2)}</pre>
				</details>
			) : null}
		</>,
	);
}

function nodeDetails(node: TopologyNode, snapshot: TopologyReply): HTMLElement[] {
	const d = node.detail;
	const hl = d.kind === "onu" ? d.extensions.hl202 : null;
	const link = linkFor(snapshot, node.id);
	const addresses = addressSummary(node);
	const identity = section(
		_("Device identity"),
		<>
			<dl>
				{row(_("Device type"), d.kind === "controller" ? _("Main gateway") : _("Optical sub-gateway"))}
				{row(_("Model"), d.model)}
				{row(_("Firmware"), d.firmware_version)}
				{row(
					_("Addresses"),
					<>
						<span>{addresses.primary ?? "—"}</span>
						{addresses.others.length ? (
							<details class="topo-address-more">
								<summary title={_("More addresses")}>{`+${addresses.others.length}`}</summary>
								<div class="topo-address-list">{addresses.others.join(", ")}</div>
							</details>
						) : null}
					</>,
				)}
				{d.kind === "onu" ? (
					<>
						{row(_("ONU ID"), d.onu_id)}
						{hl?.mac ? row(_("Reported MAC"), hl.mac) : null}
					</>
				) : null}
				{row(_("Uptime"), formatUptime(d.uptime_seconds))}
			</dl>
			{d.kind === "onu" ? (
				<details>
					<summary>{_("More identity information")}</summary>
					<dl>
						{row(_("Vendor"), d.vendor)}
						{row(_("Optical serial"), d.serial_number)}
						{row(_("Hardware"), d.hardware_version)}
						{row(_("Identity current"), d.identity_current ? _("Yes") : _("No"))}
						{d.identity_age_seconds != null
							? row(_("Identity age"), num(d.identity_age_seconds, "s", 0))
							: null}
					</dl>
				</details>
			) : null}
		</>,
	);
	const status = section(
		_("Independent device states"),
		<dl>
			{d.kind === "controller" ? (
				row(_("FPGA"), d.fpga_status)
			) : (
				<>
					{row(
						_("Registration"),
						d.registration ? specBadge(getRegistrationBadgeSpec(d.registration)) : badge(_("Binding only")),
					)}
					{row(_("Business"), specBadge(getBusinessBadgeSpec(d.business)))}
					{row(_("CWMP"), specBadge(getCwmpBadgeSpec(d.management ?? undefined)))}
					{row(_("Wi-Fi sync"), d.wifi_sync ? specBadge(getWifiSyncBadgeSpec(d.wifi_sync)) : null)}
					{d.binding.pending_restart ? row(_("Binding"), badge(_("Pending restart"), "warning")) : null}
				</>
			)}
		</dl>,
	);
	const result = [identity, status];
	const optical = opticalDetails(node, snapshot, link);
	if (optical) result.push(optical);
	result.push(networkDetails(node, snapshot, link));
	if (d.kind === "onu") {
		if (hl)
			result.push(
				section(
					_("HL202 report extension"),
					<dl>
						{row(_("Report revision"), hl.report_revision)}
						{row(_("Report age"), num(hl.age_seconds, "s", 0))}
						{row(_("Reported IP"), hl.ip)}
						{row(_("Bridge IP"), hl.bridge_ip)}
						{row(_("Connection type (raw)"), hl.connection_type_raw)}
						{row(_("CPU usage (raw)"), hl.cpu_usage_raw)}
						{row(_("Memory usage (raw)"), hl.memory_usage_raw)}
						{row(_("Reported uptime"), formatUptime(hl.uptime_seconds))}
					</dl>,
				),
			);
		if (d.services.length || d.ssids.length || d.provisioning)
			result.push(
				section(
					_("Provisioning and synchronization"),
					<>
						{[...d.services, ...d.ssids].map((item) => (
							<div class="topo-inset">
								<strong>{item.name ?? item.id}</strong>
								<p>
									{item.service_type} · {item.state}
								</p>
								{item.reason ? <p>{item.reason}</p> : null}
							</div>
						))}
						{d.provisioning ? (
							<details>
								<summary>{_("Provisioning details")}</summary>
								<pre>{JSON.stringify(d.provisioning, null, 2)}</pre>
							</details>
						) : null}
					</>,
				),
			);
	}
	const issues = snapshot.issues.filter((i) => i.node_id === node.id);
	if (issues.length)
		result.push(
			section(
				_("Reported issues"),
				issues.map((issue) => <p class="topo-error">{issue.code}</p>),
			),
		);
	return result;
}

export function clientList(
	parent: string,
	state: ClientState | undefined,
	selected: Selection,
	onSelect: (selection: Selection) => void,
	more: () => void,
	retry: () => void,
): HTMLElement {
	return section(
		_("Associated and learned objects"),
		<>
			{state?.result ? (
				<div class="topo-client-counts">
					{state.result.associated_client_count != null
						? badge(`${_("Associated")}: ${state.result.associated_client_count}`, "info")
						: null}
					{state.result.learned_host_count != null
						? badge(`${_("Learned")}: ${state.result.learned_host_count}`)
						: null}
					{!state.result.complete ? badge(_("Partial inventory"), "warning") : null}
				</div>
			) : null}
			<p class="topo-muted">
				{_("Bridge learning shows a device behind this gateway, not direct Ethernet or Wi-Fi attachment.")}
			</p>
			{state?.clients.map((client) => (
				<button
					type="button"
					class={`topo-list-client ${selected.kind === "client" && selected.id === clientKey(parent, client) ? "is-selected" : ""}`}
					data-focus-key={clientKey(parent, client)}
					onclick={() => onSelect({ kind: "client", parent, id: clientKey(parent, client) })}
				>
					<strong>{client.hostname ?? client.mac}</strong>
					<small>{client.addresses.join(", ") || client.mac}</small>
					<span>{relationText(client)}</span>
				</button>
			))}
			{state?.loading ? <p role="status">{_("Loading objects…")}</p> : null}
			{state?.error ? (
				<div class="topo-error" role="status">
					<p>{queryError(state.error)}</p>
					<button type="button" class="cbi-button" data-focus-key="retry-clients" onclick={retry}>
						{_("Retry")}
					</button>
				</div>
			) : null}
			{state && !state.loading && !state.error && !state.clients.length ? (
				<p class="topo-muted">
					{state.result?.associated_client_count === 0 || state.result?.learned_host_count === 0
						? _("No objects observed in this snapshot.")
						: _("Inventory unavailable for this node.")}
				</p>
			) : null}
			{state?.result?.next_cursor ? (
				<button
					type="button"
					class="cbi-button"
					data-focus-key="more-clients"
					disabled={state.loading}
					onclick={more}
				>
					{_("Load more")}
				</button>
			) : null}
		</>,
	);
}

export function sourcesDetails(sources: TopologySource[]): HTMLElement {
	return (
		<details class="topo-sources">
			<summary>
				{_("Data sources")} · {sources.filter((s) => s.state !== "ok").length} {_("partial / unavailable")}
			</summary>
			{sources.map((source) => (
				<div class="topo-source">
					<strong>{source.id}</strong>
					{badge(source.state, source.state === "ok" ? "info" : "warning")}
					<small>
						{new Date(source.sampled_at * 1000).toLocaleTimeString()}
						{source.reason ? ` · ${source.reason}` : ""}
					</small>
				</div>
			))}
		</details>
	);
}

export function renderDetails(
	store: TopologyStore,
	selected: Selection,
	onSelect: (selection: Selection) => void,
): HTMLElement {
	const snapshot = store.snapshot;
	if (!snapshot) return <p class="topo-empty">{_("Topology is not available yet.")}</p>;
	const parentId = selected.kind === "node" ? selected.id : selected.parent;
	const parent = snapshot.nodes.find((node) => node.id === parentId);
	if (!parent) return <p class="topo-empty">{_("The selected node is no longer present.")}</p>;
	const clientState = store.clients.get(parentId);
	const client =
		selected.kind === "client" ? clientState?.clients.find((c) => clientKey(parentId, c) === selected.id) : null;
	const detailState = store.details.get(parentId);
	return (
		<>
			<div class="topo-panel-title">
				<div>
					<small>{selected.kind === "client" ? _("Observed object") : _("Node and link details")}</small>
					<h3>
						{selected.kind === "client"
							? (client?.hostname ?? client?.mac ?? _("Loading object…"))
							: parent.label}
					</h3>
				</div>
				{badge(
					selected.kind === "client" ? _("Object") : nodeState(parent),
					selected.kind === "client" ? "info" : nodeTone(parent, snapshot),
				)}
			</div>
			{detailState?.loading ? (
				<p class="topo-panel-status" role="status">
					{_("Loading node details…")}
				</p>
			) : null}
			{detailState?.error ? (
				<p class="topo-error" role="status">
					{queryError(detailState.error)}
				</p>
			) : null}
			{selected.kind === "client" ? (
				<>
					<button type="button" class="topo-back" onclick={() => onSelect({ kind: "node", id: parentId })}>
						← {parent.label}
					</button>
					{client ? (
						section(
							_("Observed identity and relationship"),
							<dl>
								{row(_("Name"), client.hostname)}
								{row(_("MAC"), client.mac)}
								{row(_("Addresses"), client.addresses.join(", "))}
								{row(_("Relationship"), relationText(client))}
								{row(_("Parent gateway"), parent.label)}
								{row(_("Observation interface"), client.interface)}
								{row(_("Source"), client.source)}
							</dl>,
						)
					) : (
						<p class="topo-empty">
							{clientState?.loading
								? _("Loading objects for the current snapshot…")
								: _("This object was not observed in the current snapshot.")}
						</p>
					)}
				</>
			) : (
				nodeDetails(parent, snapshot)
			)}
			{clientList(
				parentId,
				clientState,
				selected,
				onSelect,
				() => void store.loadClients(parentId, true),
				() => void store.loadClients(parentId, Boolean(clientState?.result?.next_cursor)),
			)}
			{sourcesDetails(clientState?.result?.sources ?? snapshot.sources)}
		</>
	);
}
