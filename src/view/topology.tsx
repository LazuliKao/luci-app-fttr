// SPDX-License-Identifier: Apache-2.0

import {
	BADGE_CSS,
	type BadgeTone,
	getBusinessBadgeSpec,
	getCwmpBadgeSpec,
	getRegistrationBadgeSpec,
	getWifiSyncBadgeSpec,
	updateBadge,
} from "./components/badge";
import { formatPower, text } from "./components/formatters";
import { showOnuDetails } from "./components/onu-details";
import { getNetworkDevices, getStatus } from "./contracts/api";
import type { FttrStatus, NetworkDevices } from "./contracts/status";
import {
	bindingText,
	createTopologyGraph,
	formatDistance,
	measurementText,
	readPalette,
	rxPowerText,
	samePalette,
	subGatewayStateText,
	subGatewayTitle,
	subGatewayTone,
	type TopologyGraph,
	type TopologyPalette,
	toneIcon,
} from "./topology/graph";
import { buildTopology, CONTROLLER_ID, type TopologyModel, type TopologySubGateway } from "./topology/model";

const view = L.view;
const poll = L.Poll;

const REFRESH_INTERVAL = 10;

interface LoadResult {
	status: FttrStatus | null;
	devices: NetworkDevices | null;
	error: string | null;
	devicesError: boolean;
}

function errorText(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

async function loadData(): Promise<LoadResult> {
	let devicesError = false;
	const [status, devices] = await Promise.all([
		getStatus(),
		getNetworkDevices().catch((error) => {
			console.warn("Failed to load network device details", error);
			devicesError = true;
			return null;
		}),
	]);
	return { status, devices, error: null, devicesError };
}

const TOPOLOGY_CSS = `
.fttr-topology {
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
	.fttr-topology {
		--fttr-success-color: #2ecc71;
		--fttr-warning-color: #f39c12;
		--fttr-danger-color: #e74c3c;
		--fttr-info-color: #3498db;
		--fttr-neutral-color: #bdc3c7;
	}
}
[data-darkmode="true"] .fttr-topology,
[data-theme="dark"] .fttr-topology {
	--fttr-success-color: #2ecc71;
	--fttr-warning-color: #f39c12;
	--fttr-danger-color: #e74c3c;
	--fttr-info-color: #3498db;
	--fttr-neutral-color: #bdc3c7;
}
${BADGE_CSS}
.fttr-topology .fttr-topo-header {
	display: flex;
	flex-wrap: wrap;
	align-items: center;
	gap: .5em 1em;
	margin-bottom: .75em;
	font-size: 92%;
}
.fttr-topology .fttr-topo-counts {
	display: flex;
	flex-wrap: wrap;
	gap: .4em;
}
.fttr-topology .fttr-topo-notices:empty {
	display: none;
}
.fttr-topology .fttr-topo-notices > p {
	margin: 0 0 .5em;
}
.fttr-topology .fttr-topo-toolbar {
	display: flex;
	flex-wrap: wrap;
	gap: .4em;
	margin-bottom: .5em;
}
.fttr-topology .fttr-topo-toolbar .cbi-button {
	min-width: 2.6em;
}
.fttr-topology .fttr-topo-stage {
	position: relative;
	box-sizing: border-box;
	width: 100%;
	height: 60vh;
	min-height: 360px;
	max-height: 760px;
	border: 1px solid rgba(127, 140, 141, 0.35);
	border-radius: 4px;
	overflow: hidden;
}
.fttr-topology .fttr-topo-canvas {
	position: absolute;
	inset: 0;
}
.fttr-topology .fttr-topo-overlay {
	position: absolute;
	inset: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	gap: .75em;
	padding: 1em;
	text-align: center;
}
.fttr-topology .fttr-topo-overlay[hidden] {
	display: none;
}
.fttr-topology .fttr-topo-hint {
	margin: .4em 0 0;
	font-size: 85%;
	opacity: .75;
}
.fttr-topology .fttr-topo-legend {
	display: flex;
	flex-wrap: wrap;
	gap: .4em;
	margin-top: .4em;
	font-size: 90%;
}
.fttr-topology .fttr-topo-selection table.table th {
	width: 30%;
	white-space: nowrap;
}
.fttr-topology .fttr-topo-selection-actions {
	margin-top: .5em;
	text-align: right;
}
@media (max-width: 640px) {
	.fttr-topology .fttr-topo-stage {
		height: 62vh;
		min-height: 300px;
	}
	.fttr-topology .fttr-topo-toolbar .cbi-button {
		flex: 1 1 auto;
	}
}
`;

function badge(tone: BadgeTone, label: string, title?: string): HTMLElement {
	const node = <span class="fttr-badge" />;
	updateBadge(node, tone, label, title);
	return node;
}

function row(label: string, value: unknown): HTMLElement {
	return (
		<tr>
			<th>{label}</th>
			<td>{value instanceof Node ? value : text(value)}</td>
		</tr>
	);
}

function bindingRows(node: TopologySubGateway): HTMLElement[] {
	const rows = [row(_("Fixed interface"), bindingText(node) ?? _("Not pinned"))];
	if (node.binding.kind !== "none" && node.binding.kind !== "effective")
		rows.push(row(_("Binding state"), _("Pending FTTR restart")));
	return rows;
}

function issueText(node: TopologySubGateway): string | null {
	if (!node.issues.length) return null;
	return node.issues
		.map((issue) =>
			issue === "missing_serial"
				? _("Optical serial missing; identity is tied to the ONU ID")
				: issue === "duplicate_serial"
					? _("Several live ONUs report the same optical serial")
					: _("Several devices claim the same data interface"),
		)
		.join("; ");
}

function controllerSummary(model: TopologyModel): HTMLElement {
	const c = model.controller;
	return (
		<table class="table">
			<tbody>
				{row(
					_("FPGA status"),
					c.fpgaStatus === "ready"
						? badge("success", _("Ready"))
						: c.fpgaStatus
							? badge("neutral", c.fpgaStatus)
							: null,
				)}
				{row(
					_("CDR lock"),
					c.cdrLocked == null
						? badge("none", _("Unknown"))
						: c.cdrLocked
							? badge("success", _("Locked"))
							: badge("warning", _("Unlocked")),
				)}
				{row(_("Optical module"), c.opticalModel)}
				{row(
					_("Controller Tx power"),
					measurementText(c.txPower, (value) => formatPower(value, 2)),
				)}
				{row(
					_("Downstream transmitter"),
					c.txEnabled == null ? null : c.txEnabled ? _("Enabled") : _("Disabled"),
				)}
				{row(_("Registered sub-gateways"), `${model.counts.registered} / ${model.counts.known}`)}
				{c.pinningError ? row(_("Fixed interface error"), c.pinningError) : null}
			</tbody>
		</table>
	);
}

function subGatewaySummary(node: TopologySubGateway): HTMLElement {
	const onu = node.onu;
	const reg = getRegistrationBadgeSpec(node.registration ?? undefined);
	const bus = getBusinessBadgeSpec(node.business);
	const cwmp = getCwmpBadgeSpec(onu?.management ?? undefined);
	const wifi = getWifiSyncBadgeSpec(node.wifiSync ?? undefined);
	const issues = issueText(node);
	return (
		<table class="table">
			<tbody>
				{row(_("Model"), node.label)}
				{row(_("Vendor"), node.vendor)}
				{row(_("Optical serial"), node.serial)}
				{node.present ? row(_("ONU ID"), node.onuId) : row(_("Presence"), badge("neutral", _("Offline")))}
				{node.present ? row(_("Registration"), badge(reg.tone, reg.label, reg.title)) : null}
				{node.present ? row(_("Business"), badge(bus.tone, bus.label, bus.title)) : null}
				{node.present ? row(_("CWMP"), badge(cwmp.tone, cwmp.label, cwmp.title)) : null}
				{node.present ? row(_("Wi-Fi sync"), badge(wifi.tone, wifi.label, wifi.title)) : null}
				{row(
					_("Data interface"),
					node.dataInterface
						? `${node.dataInterface.name}${
								node.dataInterface.carrier === true
									? ` · ${_("Link up")}`
									: node.dataInterface.carrier === false
										? ` · ${_("Link down")}`
										: ""
							}`
						: null,
				)}
				{bindingRows(node)}
				{node.present ? row(_("ONU receive power (downstream)"), rxPowerText(node)) : null}
				{node.present ? row(_("Fiber distance"), measurementText(node.distance, formatDistance)) : null}
				{issues ? row(_("Identity warning"), badge("danger", issues)) : null}
			</tbody>
		</table>
	);
}

interface TopologyPage {
	element: HTMLElement;
	destroy(): void;
}

let activePage: TopologyPage | null = null;

function createTopologyPage(initial: LoadResult): TopologyPage {
	let model: TopologyModel | null = initial.status ? buildTopology(initial.status, initial.devices) : null;
	let selected: string | null = null;
	let lastSuccess: Date | null = initial.status ? new Date() : null;
	let lastError: string | null = initial.error;
	let devicesError = initial.devicesError;
	let refreshing = false;
	let destroyed = false;
	let attached = false;
	let graph: TopologyGraph | null = null;
	let graphError: string | null = null;
	let palette: TopologyPalette | null = null;
	let themeFrame = 0;
	let resizeFrame = 0;

	const updatedNode = <span />;
	const stateNode = <span class="fttr-badge" />;
	const knownNode = <span class="fttr-badge" />;
	const registeredNode = <span class="fttr-badge" />;
	const registeringNode = <span class="fttr-badge" />;
	const offlineNode = <span class="fttr-badge" />;
	const noticesNode = <div class="fttr-topo-notices" role="status" aria-live="polite" />;
	const canvasNode = <div class="fttr-topo-canvas" />;
	const overlayText = <p />;
	const overlayRetry = (
		<button type="button" class="cbi-button cbi-button-action" onclick={() => void refresh()}>
			{_("Retry")}
		</button>
	) as HTMLButtonElement;
	const overlayNode = (
		<div class="fttr-topo-overlay" hidden>
			{overlayText}
			{overlayRetry}
		</div>
	);
	const selectionBody = <div />;
	const detailsButton = (
		<button
			type="button"
			class="cbi-button cbi-button-neutral"
			onclick={() => openDetails(selected)}
			title={_("Open the details of the selected sub-gateway")}
		>
			{_("Details")}
		</button>
	) as HTMLButtonElement;
	const selectionNode = (
		<div class="cbi-section fttr-topo-selection">
			<h3>{_("Selected device")}</h3>
			{selectionBody}
			<div class="fttr-topo-selection-actions">{detailsButton}</div>
		</div>
	);
	const refreshButton = (
		<button
			type="button"
			class="cbi-button cbi-button-action"
			aria-label={_("Refresh topology")}
			title={_("Refresh topology")}
			onclick={() => void refresh()}
		>
			{_("Refresh")}
		</button>
	) as HTMLButtonElement;

	const toolButton = (label: string, symbol: string, action: () => void) => (
		<button type="button" class="cbi-button cbi-button-neutral" aria-label={label} title={label} onclick={action}>
			{symbol}
		</button>
	);

	const element = (
		<div class="cbi-map fttr-topology">
			<style>{TOPOLOGY_CSS}</style>
			<h2>{_("FTTR Topology")}</h2>
			<div class="fttr-topo-header">
				{updatedNode}
				{stateNode}
				<span class="fttr-topo-counts">
					{knownNode}
					{registeredNode}
					{registeringNode}
					{offlineNode}
				</span>
			</div>
			{noticesNode}
			<div class="fttr-topo-toolbar" role="toolbar" aria-label={_("Topology controls")}>
				{toolButton(_("Zoom in"), "+", () => void graph?.zoomIn())}
				{toolButton(_("Zoom out"), "−", () => void graph?.zoomOut())}
				{toolButton(_("Fit topology to view"), _("Fit"), () => void graph?.fit())}
				{refreshButton}
			</div>
			<section class="fttr-topo-stage" aria-label={_("FTTR topology graph")}>
				{canvasNode}
				{overlayNode}
			</section>
			<p class="fttr-topo-hint">
				{_(
					"Click a device to select it, double-click to open its details. Drag to pan; use Ctrl + mouse wheel or pinch to zoom.",
				)}
			</p>
			<div class="fttr-topo-legend">
				{badge("success", `${toneIcon("success")} ${_("Registered, business verified")}`)}
				{badge("info", `${toneIcon("info")} ${_("Registered, business in progress")}`)}
				{badge("warning", `${toneIcon("warning")} ${_("Registering or business warning")}`)}
				{badge("neutral", `${toneIcon("neutral")} ${_("Offline (bound)")}`)}
				{badge("danger", `${toneIcon("danger")} ${_("Identity conflict")}`)}
				{badge("none", `* ${_("Binding change pending restart")}`)}
			</div>
			{selectionNode}
		</div>
	);

	// -----------------------------------------------------------------------
	// Rendering of LuCI-owned elements
	// -----------------------------------------------------------------------

	function renderHeader(): void {
		updatedNode.textContent = lastSuccess
			? _("Last updated: %s").format(lastSuccess.toLocaleTimeString())
			: _("Not yet updated");
		if (refreshing) updateBadge(stateNode, "info", _("Refreshing…"));
		else if (lastError && model)
			updateBadge(stateNode, "warning", _("Stale data"), _("Last refresh failed: %s").format(lastError));
		else if (lastError) updateBadge(stateNode, "danger", _("Unavailable"), lastError);
		else updateBadge(stateNode, "success", _("Live"));
		refreshButton.disabled = refreshing;

		const counts = model?.counts;
		updateBadge(
			knownNode,
			"neutral",
			_("Known: %s").format(text(counts?.known)),
			_("Live sub-gateways plus offline devices known from fixed interface bindings"),
		);
		updateBadge(
			registeredNode,
			"success",
			_("Registered: %s").format(text(counts?.registered)),
			_("Live sub-gateways in O5 operation state"),
		);
		updateBadge(
			registeringNode,
			"warning",
			_("Registering: %s").format(text(counts?.registering)),
			_("Live sub-gateways not yet in O5 operation state"),
		);
		updateBadge(
			offlineNode,
			"neutral",
			_("Offline: %s").format(text(counts?.offline)),
			_("Bound sub-gateways absent from live status"),
		);
		registeringNode.hidden = !counts?.registering;
	}

	function renderNotices(): void {
		const notices: string[] = [];
		const c = model?.controller;
		if (c?.allocationBlocked) notices.push(_("ONU allocation blocked by invalid startup configuration."));
		if (c?.pendingRestart) notices.push(_("Fixed interface changes pending FTTR restart."));
		if (c?.pinningError) notices.push(c.pinningError);
		if (model && model.counts.known === 0) notices.push(_("No known sub-gateways."));
		if (model && devicesError) notices.push(_("Interface details unavailable; link states may be incomplete."));
		if (model && lastError)
			notices.push(_("Refresh failed; showing the last successful data. %s").format(lastError));
		if (graphError) notices.push(_("Topology graph error: %s").format(graphError));
		noticesNode.replaceChildren(...notices.map((notice) => <p>{notice}</p>));
	}

	function renderOverlay(): void {
		if (!model) {
			overlayText.textContent = lastError
				? _("Unable to load FTTR status: %s").format(lastError)
				: _("Loading FTTR status…");
			overlayRetry.hidden = !lastError;
			overlayRetry.disabled = refreshing;
			overlayNode.hidden = false;
		} else if (graphError && !graph) {
			overlayText.textContent = _("Unable to render the topology graph: %s").format(graphError);
			overlayRetry.hidden = true;
			overlayNode.hidden = false;
		} else {
			overlayNode.hidden = true;
		}
	}

	function findNode(id: string | null): TopologySubGateway | null {
		return (id && model?.subGateways.find((node) => node.id === id)) || null;
	}

	function renderSelection(): void {
		if (!model || !selected) {
			selectionBody.replaceChildren(<p>{_("Select a device in the topology to show its summary.")}</p>);
			detailsButton.hidden = true;
			return;
		}
		if (selected === CONTROLLER_ID) {
			selectionBody.replaceChildren(controllerSummary(model));
			detailsButton.hidden = true;
			return;
		}
		const node = findNode(selected);
		if (!node) {
			selected = null;
			renderSelection();
			return;
		}
		selectionBody.replaceChildren(
			<p>
				<strong>{subGatewayTitle(node)}</strong>{" "}
				{badge(subGatewayTone(node), `${toneIcon(subGatewayTone(node))} ${subGatewayStateText(node)}`)}
			</p>,
			subGatewaySummary(node),
		);
		// Offline placeholders have no ONU record; show the reduced binding summary only.
		detailsButton.hidden = !node.onu;
	}

	function openDetails(id: string | null): void {
		// Resolve from the latest model so details never use an outdated snapshot.
		const node = findNode(id);
		if (node?.onu) showOnuDetails(node.onu);
	}

	function renderAll(): void {
		renderHeader();
		renderNotices();
		renderOverlay();
		renderSelection();
	}

	// -----------------------------------------------------------------------
	// Graph integration
	// -----------------------------------------------------------------------

	function onGraphError(error: unknown): void {
		if (destroyed) return;
		console.error("FTTR topology graph error", error);
		graphError = errorText(error);
		renderNotices();
		renderOverlay();
	}

	function select(id: string | null): void {
		if (destroyed) return;
		selected = id && (id === CONTROLLER_ID || findNode(id)) ? id : null;
		renderSelection();
		if (model) void graph?.update(model, selected);
	}

	function ensureGraph(): void {
		if (graph || destroyed || !model) return;
		const width = canvasNode.clientWidth;
		const height = canvasNode.clientHeight;
		// Wait until the container is attached and has usable dimensions.
		if (width < 16 || height < 16) return;
		try {
			palette = readPalette(canvasNode);
			graph = createTopologyGraph({
				container: canvasNode,
				width,
				height,
				palette,
				onSelect: select,
				onActivate: (id) => {
					select(id);
					openDetails(id);
				},
				onError: onGraphError,
			});
			graphError = null;
			void graph.update(model, selected);
		} catch (error) {
			graph = null;
			onGraphError(error);
		}
	}

	const resizeObserver = new ResizeObserver(() => {
		if (destroyed || !canvasNode.isConnected) return;
		attached = true;
		cancelAnimationFrame(resizeFrame);
		resizeFrame = requestAnimationFrame(() => {
			if (destroyed) return;
			if (!graph) {
				ensureGraph();
				renderOverlay();
				return;
			}
			const width = canvasNode.clientWidth;
			const height = canvasNode.clientHeight;
			if (width >= 16 && height >= 16) void graph.resize(width, height);
		});
	});
	resizeObserver.observe(canvasNode);

	function scheduleThemeCheck(): void {
		if (destroyed) return;
		cancelAnimationFrame(themeFrame);
		themeFrame = requestAnimationFrame(() => {
			if (destroyed || !graph) return;
			const next = readPalette(canvasNode);
			if (palette && samePalette(palette, next)) return;
			palette = next;
			void graph.setPalette(next);
		});
	}

	const themeObserver = new MutationObserver(scheduleThemeCheck);
	const themeAttributes = ["class", "style", "data-darkmode", "data-theme"];
	themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: themeAttributes });
	if (document.body) themeObserver.observe(document.body, { attributes: true, attributeFilter: themeAttributes });
	const colorScheme = window.matchMedia?.("(prefers-color-scheme: dark)");
	colorScheme?.addEventListener?.("change", scheduleThemeCheck);

	// -----------------------------------------------------------------------
	// Refresh and lifecycle
	// -----------------------------------------------------------------------

	async function refresh(): Promise<void> {
		if (refreshing || destroyed) return;
		refreshing = true;
		renderHeader();
		renderOverlay();
		try {
			const result = await loadData();
			if (destroyed || !result.status) return;
			model = buildTopology(result.status, result.devices);
			devicesError = result.devicesError;
			lastSuccess = new Date();
			lastError = null;
			if (selected && selected !== CONTROLLER_ID && !findNode(selected)) selected = null;
			if (graph) void graph.update(model, selected);
			else ensureGraph();
		} catch (error) {
			if (destroyed) return;
			// Keep the previous graph and mark it stale instead of reporting devices offline.
			console.error("Failed to refresh FTTR topology", error);
			lastError = errorText(error);
		} finally {
			refreshing = false;
			if (!destroyed) renderAll();
		}
	}

	const tick = async () => {
		if (destroyed) return;
		if (!element.isConnected) {
			// Page left (or replaced) after having been shown: release everything.
			if (attached) destroy();
			return;
		}
		attached = true;
		await refresh();
	};
	poll.add(tick, REFRESH_INTERVAL);

	const onPageHide = () => destroy();
	window.addEventListener("pagehide", onPageHide);

	function destroy(): void {
		if (destroyed) return;
		destroyed = true;
		poll.remove(tick);
		window.removeEventListener("pagehide", onPageHide);
		resizeObserver.disconnect();
		themeObserver.disconnect();
		colorScheme?.removeEventListener?.("change", scheduleThemeCheck);
		cancelAnimationFrame(resizeFrame);
		cancelAnimationFrame(themeFrame);
		graph?.destroy();
		graph = null;
		if (activePage?.element === element) activePage = null;
	}

	renderAll();
	return { element, destroy };
}

export const main = view.extend({
	async load(): Promise<LoadResult> {
		try {
			return await loadData();
		} catch (error) {
			console.error("Failed to load FTTR status", error);
			return { status: null, devices: null, error: errorText(error), devicesError: false };
		}
	},
	render(data: LoadResult): HTMLElement {
		// Guard against duplicate polling when the view is rendered again.
		activePage?.destroy();
		activePage = createTopologyPage(data);
		return activePage.element;
	},
	handleSaveApply: null,
	handleSave: null,
	handleReset: null,
});
