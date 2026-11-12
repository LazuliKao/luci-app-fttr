// SPDX-License-Identifier: Apache-2.0
import { getFttrClient } from "../api/client";
import type { TopologyReply } from "../api/generated/types";
import { isPageHidden } from "../visibility";
import { formatAge } from "./components/formatters";
import { createTopologyGraph } from "./topology/graph";
import { CONTROLLER_ID, counts, type Selection } from "./topology/model";
import { badge, renderDetails } from "./topology/presentation";
import { errorText, TopologyStore } from "./topology/store";
import { TOPOLOGY_CSS } from "./topology/style";

const view = L.view;
const poll = L.Poll;
const REFRESH_INTERVAL = 10;
interface LoadResult {
	snapshot: TopologyReply | null;
	error: string | null;
}
interface TopologyPage {
	element: HTMLElement;
	destroy(): void;
}
let activePage: TopologyPage | null = null;

function createTopologyPage(initial: LoadResult): TopologyPage {
	let dead = false;
	let attached = false;
	let selected: Selection = {
		kind: "node",
		id: initial.snapshot?.nodes.find((n) => n.detail.kind === "controller")?.id ?? CONTROLLER_ID,
	};
	let panelKey = "";
	let panelSelection = "";
	let themeFrame = 0;
	const countsNode = <div class="topo-counts" />;
	const updated = <span class="topo-sampled" />;
	const zoomLevel = <span class="topo-zoom">100%</span>;
	const liveState = <span role="status" aria-live="polite" />;
	const notices = <div class="topo-notices" role="status" aria-live="polite" />;
	const panel = <aside class="topo-panel" aria-label={_("Node and link details")} />;
	const viewport = (
		<section
			class="topo-viewport"
			aria-label={_("Topology canvas. Use Tab to select devices and the toolbar to zoom or fit.")}
		/>
	);
	const overlayMessage = <p />;
	const retryButton = (
		<button type="button" class="cbi-button cbi-button-action" onclick={() => void refresh()}>
			{_("Retry")}
		</button>
	) as HTMLButtonElement;
	const overlay = (
		<div class="topo-overlay">
			{overlayMessage}
			{retryButton}
		</div>
	);
	const deviceSelect = (
		<select
			id="fttr-topology-device"
			aria-label={_("Select a topology device")}
			onchange={(event: Event) => select({ kind: "node", id: (event.target as HTMLSelectElement).value })}
		/>
	) as HTMLSelectElement;
	const refreshButton = (
		<button type="button" class="cbi-button cbi-button-action" onclick={() => void refresh()}>
			{_("Refresh")}
		</button>
	) as HTMLButtonElement;
	const tool = (label: string, symbol: string, action: () => void) => (
		<button type="button" class="cbi-button cbi-button-neutral" title={label} aria-label={label} onclick={action}>
			{symbol}
		</button>
	);
	const element = (
		<div class="cbi-map fttr-topology">
			<style>{TOPOLOGY_CSS}</style>
			<header class="topo-header">
				<div>
					<h2>{_("FTTR Topology")}</h2>
					<p class="topo-subtitle">{_("Logical PON connections and observed devices")}</p>
				</div>
				{countsNode}
			</header>
			{notices}
			<label class="topo-device-picker" htmlFor="fttr-topology-device">
				<span>{_("Device")}</span>
				{deviceSelect}
			</label>
			<div class="topo-workspace">
				<section class="topo-stage" aria-label={_("FTTR topology graph")}>
					<div class="topo-stage-header">
						<span class="topo-stage-heading">
							{_("Network overview")} · {liveState}
							{updated}
						</span>
						<div class="topo-toolbar" role="toolbar" aria-label={_("Topology controls")}>
							{tool(_("Zoom in"), "+", () => graph.zoom(1.2))}
							{tool(_("Zoom out"), "−", () => graph.zoom(1 / 1.2))}
							{zoomLevel}
							{tool(_("Reset zoom to 100%"), "1:1", () => graph.reset())}
							{tool(_("Fit topology to view"), _("Fit"), () => graph.fit())}
							{refreshButton}
						</div>
					</div>
					<div class="topo-viewport-wrap">
						{viewport}
						{overlay}
					</div>
					<div class="topo-legend">
						<span>
							<i />
							{_("Logical PON")}
						</span>
						<span>
							<i class="is-associated" />
							{_("Wireless association")}
						</span>
						<span>
							<i class="is-learned" />
							{_("Learned behind gateway")}
						</span>
					</div>
				</section>
				{panel}
			</div>
			<footer class="topo-footer">
				<span>{_("Drag to pan · Ctrl + wheel or pinch to zoom · Click a card for details")}</span>
				<span>{`${_("Refresh")}: ${REFRESH_INTERVAL}s`}</span>
			</footer>
		</div>
	);
	// A single refresh emits several store changes (start, snapshot, per-node
	// clients, finish). Coalesce them into one render per frame instead of
	// rebuilding the panel and graph on every emit.
	let renderFrame = 0;
	const scheduleRender = () => {
		if (renderFrame) return;
		renderFrame = requestAnimationFrame(() => {
			renderFrame = 0;
			render();
		});
	};
	const store = new TopologyStore(getFttrClient(), scheduleRender, initial.snapshot, initial.error);
	const graph = createTopologyGraph(viewport, select, (scale) => {
		zoomLevel.textContent = `${Math.round(scale * 100)}%`;
	});

	function select(selection: Selection) {
		if (dead) return;
		selected = selection;
		render();
		if (selection.kind === "node") void store.loadNode(selection.id);
	}

	function renderPanel() {
		const parentId = selected.kind === "node" ? selected.id : selected.parent;
		const clientState = store.clients.get(parentId);
		const detailState = store.details.get(parentId);
		const selectionKey = JSON.stringify(selected);
		const nextKey = JSON.stringify([
			selectionKey,
			store.snapshot?.nodes.find((node) => node.id === parentId),
			clientState?.clients.length,
			clientState?.loading,
			clientState?.error,
			clientState?.result?.next_cursor,
			clientState?.result?.associated_client_count,
			clientState?.result?.learned_host_count,
			clientState?.result?.sources,
			detailState?.loading,
			detailState?.error,
		]);
		if (panelKey === nextKey) return;
		const sameSelection = panelSelection === selectionKey;
		const scroll = sameSelection ? panel.scrollTop : 0;
		const open = sameSelection
			? [...panel.querySelectorAll<HTMLDetailsElement>("details")].map((detail) => detail.open)
			: [];
		const focused =
			sameSelection && document.activeElement instanceof HTMLElement && panel.contains(document.activeElement)
				? document.activeElement.dataset.focusKey
				: null;
		panel.replaceChildren(renderDetails(store, selected, select));
		[...panel.querySelectorAll<HTMLDetailsElement>("details")].forEach((detail, index) => {
			if (open[index]) detail.open = true;
		});
		panel.scrollTop = scroll;
		if (focused)
			[...panel.querySelectorAll<HTMLElement>("[data-focus-key]")]
				.find((node) => node.dataset.focusKey === focused)
				?.focus({ preventScroll: true });
		panelKey = nextKey;
		panelSelection = selectionKey;
	}

	function render() {
		if (dead) return;
		const snapshot = store.snapshot;
		refreshButton.disabled = store.refreshing;
		retryButton.disabled = store.refreshing;
		liveState.replaceChildren(
			badge(
				store.refreshing
					? _("Refreshing…")
					: store.error
						? snapshot
							? _("Stale snapshot")
							: _("Unavailable")
						: _("Snapshot"),
				store.error ? "warning" : "info",
			),
		);
		const age = snapshot ? Math.max(0, Math.round(Date.now() / 1000 - snapshot.generated_at)) : null;
		const ageText = age === null ? null : formatAge(age);
		updated.textContent = snapshot ? `${_("Sampled")} · ${ageText ?? "—"}` : _("No successful snapshot yet");
		updated.title = snapshot ? new Date(snapshot.generated_at * 1000).toLocaleString() : "";
		updated.dataset.stale = String(age !== null && age > REFRESH_INTERVAL * 2);
		overlay.hidden = Boolean(snapshot?.nodes.length);
		overlayMessage.textContent = snapshot
			? _("No nodes reported in this snapshot.")
			: store.error
				? `${_("Unable to load topology")}: ${store.error}`
				: _("Loading topology…");
		retryButton.hidden = !store.error;
		const messages: string[] = [];
		if (store.error) messages.push(`${_("Refresh failed; keeping the last successful snapshot.")} ${store.error}`);
		if (snapshot) {
			const count = counts(snapshot);
			countsNode.replaceChildren(
				...[
					[count.registered, _("O5 registered")],
					[count.known, _("Known ONUs")],
					[count.boundOnly, _("Binding only")],
				].map(([value, label]) => (
					<span class="topo-count">
						<strong>{value}</strong>
						{label}
					</span>
				)),
			);
			if (!snapshot.nodes.some((n) => n.id === (selected.kind === "node" ? selected.id : selected.parent)))
				selected = {
					kind: "node",
					id:
						snapshot.nodes.find((n) => n.detail.kind === "controller")?.id ??
						snapshot.nodes[0]?.id ??
						CONTROLLER_ID,
				};
			const optionKey = JSON.stringify(snapshot.nodes.map((n) => [n.id, n.label]));
			if (deviceSelect.dataset.options !== optionKey) {
				deviceSelect.replaceChildren(...snapshot.nodes.map((n) => <option value={n.id}>{n.label}</option>));
				deviceSelect.dataset.options = optionKey;
			}
			deviceSelect.value = selected.kind === "node" ? selected.id : selected.parent;
			const failed = snapshot.sources.filter((s) => s.state === "unavailable");
			if (failed.length)
				messages.push(`${_("Some data sources are unavailable")}: ${failed.map((s) => s.id).join(", ")}`);
			if (snapshot.issues.length)
				messages.push(`${_("Backend topology issues")}: ${snapshot.issues.map((i) => i.code).join(", ")}`);
			if (!count.known) messages.push(_("No known sub-gateways in this snapshot."));
			graph.update(snapshot, store.clients, selected);
		}
		notices.replaceChildren(...messages.map((message) => <p>{message}</p>));
		renderPanel();
	}

	async function refresh(hydrateOnly = false) {
		if (dead || store.refreshing) return;
		await store.refresh(hydrateOnly, selected.kind === "node" ? selected.id : selected.parent);
		if (!dead && selected.kind === "node") await store.loadNode(selected.id);
	}
	const tick = async () => {
		if (dead) return;
		if (!element.isConnected) {
			if (attached) destroy();
			return;
		}
		attached = true;
		if (isPageHidden()) return;
		await refresh();
	};
	function updateTheme() {
		if (dead) return;
		const parent = element.parentElement;
		if (!parent) return;
		let current: Element | null = parent;
		let background = "";
		while (current) {
			const color = getComputedStyle(current).backgroundColor;
			if (color && color !== "transparent" && color !== "rgba(0, 0, 0, 0)") {
				background = color;
				break;
			}
			current = current.parentElement;
		}
		if (background) element.style.setProperty("--topo-bg", background);
		element.style.setProperty("--topo-text", getComputedStyle(parent).color);
		const channels = background
			.match(/[\d.]+/g)
			?.slice(0, 3)
			.map(Number);
		element.dataset.dark = String(channels ? channels.reduce((sum, value) => sum + value, 0) / 3 < 128 : false);
	}
	const themeChanged = () => {
		cancelAnimationFrame(themeFrame);
		themeFrame = requestAnimationFrame(updateTheme);
	};
	const themeObserver = new MutationObserver(themeChanged);
	for (const target of [document.documentElement, document.body])
		if (target)
			themeObserver.observe(target, {
				attributes: true,
				attributeFilter: ["class", "style", "data-darkmode", "data-theme"],
			});
	const scheme = window.matchMedia?.("(prefers-color-scheme: dark)");
	scheme?.addEventListener("change", themeChanged);
	const lifecycle = new MutationObserver(() => {
		if (element.isConnected) {
			if (!attached) {
				attached = true;
				updateTheme();
			}
		} else if (attached) destroy();
	});
	if (document.body) lifecycle.observe(document.body, { childList: true, subtree: true });
	function destroy() {
		if (dead) return;
		dead = true;
		store.destroy();
		graph.destroy();
		poll.remove(tick);
		themeObserver.disconnect();
		lifecycle.disconnect();
		scheme?.removeEventListener("change", themeChanged);
		cancelAnimationFrame(themeFrame);
		if (renderFrame) cancelAnimationFrame(renderFrame);
		window.removeEventListener("pagehide", destroy);
		if (activePage?.element === element) activePage = null;
	}
	window.addEventListener("pagehide", destroy);
	poll.add(tick, REFRESH_INTERVAL);
	render();
	// load() already fetched the overview; hydrate associations without creating another snapshot.
	void refresh(Boolean(initial.snapshot));
	return { element, destroy };
}

export const main = view.extend({
	async load(): Promise<LoadResult> {
		try {
			return { snapshot: await getFttrClient().getTopology(), error: null };
		} catch (error) {
			return { snapshot: null, error: errorText(error) };
		}
	},
	render(initial: LoadResult): HTMLElement {
		activePage?.destroy();
		activePage = createTopologyPage(initial);
		return activePage.element;
	},
	handleSaveApply: null,
	handleSave: null,
	handleReset: null,
});
