// SPDX-License-Identifier: Apache-2.0
// G6-backed FTTR topology canvas: renders rich HTML device cards inside an
// interactive AntV G6 viewport with optical link labels, hover neighbor
// highlighting, minimap navigation, and theme-synchronized palettes.

import { HoverActivate } from "@antv/g6/esm/behaviors/hover-activate";
import { ZoomCanvas } from "@antv/g6/esm/behaviors/zoom-canvas";
import { CanvasEvent, EdgeEvent, GraphEvent } from "@antv/g6/esm/constants";
import { CubicHorizontal } from "@antv/g6/esm/elements/edges/cubic-horizontal";
import { CubicVertical } from "@antv/g6/esm/elements/edges/cubic-vertical";
import { Polyline } from "@antv/g6/esm/elements/edges/polyline";
import { HTML as G6HtmlNode } from "@antv/g6/esm/elements/nodes/html";
import { Minimap } from "@antv/g6/esm/plugins/minimap";
import { register } from "@antv/g6/esm/registry/register";
import { Graph as G6Graph } from "@antv/g6/esm/runtime/graph";
import type { EdgeData, NodeData } from "@antv/g6/esm/spec";
import { dark, light } from "@antv/g6/esm/themes";
import { ArrangeDrawOrder } from "@antv/g6/esm/transforms/arrange-draw-order";
import { CollapseExpandCombo } from "@antv/g6/esm/transforms/collapse-expand-combo";
import { CollapseExpandNode } from "@antv/g6/esm/transforms/collapse-expand-node";
import { GetEdgeActualEnds } from "@antv/g6/esm/transforms/get-edge-actual-ends";
import { UpdateRelatedEdge } from "@antv/g6/esm/transforms/update-related-edge";
import type { ElementType, IElementEvent } from "@antv/g6/esm/types";
import type { TopologyClient, TopologyNode, TopologyReply } from "../../api/generated/types";
import {
	CLIENT_PREVIEW_LIMIT,
	clientKey,
	layout,
	linkFor,
	nodeAddresses,
	observedCount,
	type Selection,
} from "./model";
import { badge, clientCard, nodeCard, nodeTone, num, type Tone } from "./presentation";
import type { ClientState } from "./store";

// Register only the minimal G6 ESM extensions required by the FTTR topology view.
let registered = false;
function ensureRegistered() {
	if (registered) return;
	registered = true;
	register("node", "html", G6HtmlNode);
	register("edge", "cubic-horizontal", CubicHorizontal);
	register("edge", "cubic-vertical", CubicVertical);
	register("edge", "polyline", Polyline);
	register("behavior", "zoom-canvas", ZoomCanvas);
	register("behavior", "hover-activate", HoverActivate);
	register("plugin", "minimap", Minimap);
	register("transform", "update-related-edges", UpdateRelatedEdge);
	register("transform", "collapse-expand-node", CollapseExpandNode);
	register("transform", "collapse-expand-combo", CollapseExpandCombo);
	register("transform", "get-edge-actual-ends", GetEdgeActualEnds);
	register("transform", "arrange-draw-order", ArrangeDrawOrder);
	register("theme", "light", light);
	register("theme", "dark", dark);
}

export interface TopologyPalette {
	dark: boolean;
	nodeFill: string;
	nodeStroke: string;
	text: string;
	muted: string;
	edge: string;
	selected: string;
	labelBackground: string;
	success: string;
	warning: string;
	danger: string;
	info: string;
	neutral: string;
}

const LIGHT: TopologyPalette = {
	dark: false,
	nodeFill: "#f7f8fa",
	nodeStroke: "#d0d7de",
	text: "#1f2328",
	muted: "#656d76",
	edge: "#8c959f",
	selected: "#2876df",
	labelBackground: "rgba(255, 255, 255, 0.92)",
	success: "#158353",
	warning: "#a96908",
	danger: "#b42318",
	info: "#2876df",
	neutral: "#6e7781",
};

const DARK: TopologyPalette = {
	dark: true,
	nodeFill: "#1f242c",
	nodeStroke: "#3b434f",
	text: "#e6edf3",
	muted: "#9198a1",
	edge: "#656d76",
	selected: "#75adff",
	labelBackground: "rgba(22, 27, 34, 0.9)",
	success: "#51d9a2",
	warning: "#eab969",
	danger: "#ff8078",
	info: "#75adff",
	neutral: "#8b949e",
};

function parseColor(value: string): [number, number, number, number] | null {
	const match = value.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+%?))?\s*\)/i);
	if (!match) return null;
	let alpha = match[4] === undefined ? 1 : Number.parseFloat(match[4]);
	if (match[4]?.endsWith("%")) alpha /= 100;
	return [Number(match[1]), Number(match[2]), Number(match[3]), alpha];
}

function luminance([r, g, b]: [number, number, number, number]): number {
	const channel = (value: number) => {
		const c = value / 255;
		return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
	};
	return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function effectiveBackground(element: Element): [number, number, number, number] | null {
	let current: Element | null = element;
	while (current) {
		const color = parseColor(getComputedStyle(current).backgroundColor);
		if (color && color[3] > 0.5) return color;
		current = current.parentElement;
	}
	return null;
}

export function readPalette(element: Element): TopologyPalette {
	const root = document.documentElement;
	const background = effectiveBackground(element);
	const hinted =
		root.getAttribute("data-darkmode") === "true" ||
		root.getAttribute("data-theme") === "dark" ||
		document.body?.getAttribute("data-darkmode") === "true" ||
		document.body?.getAttribute("data-theme") === "dark";
	const isDark = background ? luminance(background) < 0.35 : hinted;
	const base = isDark ? DARK : LIGHT;
	const color = parseColor(getComputedStyle(element).color);
	const text = color && luminance(color) > 0.5 === isDark ? getComputedStyle(element).color : base.text;
	return { ...base, text };
}

export function samePalette(a: TopologyPalette, b: TopologyPalette): boolean {
	return (Object.keys(a) as (keyof TopologyPalette)[]).every((key) => a[key] === b[key]);
}

export type StatusFilter = "all" | "online" | "attention" | "offline";

export interface GraphFilter {
	query: string;
	status: StatusFilter;
}

function matchesStatus(node: TopologyNode, snapshot: TopologyReply, status: StatusFilter): boolean {
	if (status === "all") return true;
	const tone = nodeTone(node, snapshot);
	if (status === "online") return tone === "success" || tone === "info";
	if (status === "attention") return tone === "warning" || tone === "danger";
	return tone === "neutral";
}

function matchesQuery(text: string, values: Array<string | null | undefined>): boolean {
	if (!text) return true;
	return values.some((value) => value?.toLowerCase().includes(text));
}

function nodeMatchesFilter(node: TopologyNode, snapshot: TopologyReply, filter: GraphFilter): boolean {
	if (!matchesStatus(node, snapshot, filter.status)) return false;
	const query = filter.query.trim().toLowerCase();
	if (!query) return true;
	const detail = node.detail;
	return matchesQuery(query, [
		node.id,
		node.label,
		detail.model,
		...nodeAddresses(node),
		...(detail.kind === "onu" ? [detail.serial_number, detail.vendor, detail.extensions.hl202?.mac] : []),
	]);
}

export function countFilteredNodes(snapshot: TopologyReply, filter: GraphFilter): { matched: number; total: number } {
	const total = snapshot.nodes.length;
	const hasFilter = Boolean(filter.query.trim()) || filter.status !== "all";
	if (!hasFilter) return { matched: total, total };
	let matched = 0;
	for (const node of snapshot.nodes) {
		if (nodeMatchesFilter(node, snapshot, filter)) matched++;
	}
	return { matched, total };
}

function clientMatchesFilter(client: TopologyClient, filter: GraphFilter): boolean {
	if (filter.status !== "all" && filter.status !== "online") return false;
	const query = filter.query.trim().toLowerCase();
	if (!query) return true;
	return matchesQuery(query, [client.hostname, client.mac, client.interface, ...client.addresses]);
}

function buildNodeElement(
	id: string,
	node: TopologyNode | undefined,
	client: { parent: string; client: TopologyClient } | undefined,
	snapshot: TopologyReply,
	clientState: ClientState | undefined,
	selected: boolean,
	dimmed: boolean,
): HTMLElement {
	const tone: Tone = node ? nodeTone(node, snapshot) : "neutral";
	const kindClass = node?.detail.kind === "controller" ? "is-controller" : client ? "is-client" : "is-onu";
	const card = (
		<div
			class={`topo-graph-card topo-${tone} ${kindClass} ${selected ? "is-selected" : ""} ${dimmed ? "is-dimmed" : ""}`}
			data-topo-id={id}
			style="width:100%;height:100%"
		>
			{node ? nodeCard(node, snapshot) : client ? clientCard(client.client) : null}
		</div>
	);
	if (node) {
		const total = observedCount(clientState);
		const overflow = Boolean(
			clientState && (clientState.clients.length > CLIENT_PREVIEW_LIMIT || clientState.result?.next_cursor),
		);
		if (total > 0 && overflow) {
			card.append(
				<div class="topo-card-overflow">
					{_("View all observed objects")} · {total}
					{clientState?.result?.next_cursor ? "+" : ""}
				</div>,
			);
		} else if (clientState?.error) {
			card.append(<div class="topo-card-overflow is-warn">{badge(_("Objects unavailable"), "warning")}</div>);
		}
	}
	return card;
}

export interface TopologyGraph {
	update(
		snapshot: TopologyReply,
		clients: ReadonlyMap<string, ClientState>,
		selected: Selection,
		filter?: GraphFilter,
	): void;
	setPalette(palette: TopologyPalette): void;
	setMinimap(enabled: boolean): void;
	fit(): void;
	zoom(factor: number): void;
	reset(): void;
	focusNode(id: string): void;
	setPanning(enabled: boolean): void;
	destroy(): void;
}

export function createTopologyGraph(
	container: HTMLElement,
	onSelect: (selection: Selection) => void,
	onScale?: (scale: number) => void,
	initialPalette?: TopologyPalette,
): TopologyGraph {
	ensureRegistered();

	let palette = initialPalette ?? readPalette(container);
	let dead = false;
	let rendered = false;
	let fitting = false;
	let userAdjusted = false;
	let panEnabled = false;
	let minimapEnabled = (container.clientWidth || 800) >= 640;
	let lastWidth = 0;
	let lastSignature = "";
	let lastSnapshot: TopologyReply | null = null;
	let lastClients: ReadonlyMap<string, ClientState> = new Map();
	let lastSelected: Selection = { kind: "node", id: "" };
	let lastFilter: GraphFilter = { query: "", status: "all" };
	let selectionLookup = new Map<string, Selection>();
	let toneLookup = new Map<string, Tone>();
	let queue: Promise<void> = Promise.resolve();

	const width = Math.max(container.clientWidth || 800, 320);
	const height = Math.max(container.clientHeight || 500, 320);

	const minimapPlugin = () => ({
		type: "minimap",
		key: "minimap",
		className: "topo-minimap",
		size: [156, 96] as [number, number],
		padding: 8,
		position: "right-bottom" as const,
		containerStyle: {
			left: "auto",
			top: "auto",
			right: "12px",
			bottom: "12px",
			background: palette.dark ? "rgba(24, 28, 35, 0.78)" : "rgba(255, 255, 255, 0.82)",
			backdropFilter: "blur(8px)",
			border: `1px solid ${palette.nodeStroke}`,
			borderRadius: "8px",
			boxShadow: "0 4px 14px rgba(0, 0, 0, 0.14)",
			overflow: "hidden",
		},
		maskStyle: {
			border: `1px solid ${palette.selected}`,
			background: palette.dark ? "rgba(117, 173, 255, 0.12)" : "rgba(40, 118, 223, 0.1)",
		},
		shape: (
			id: string,
			elementType: ElementType,
			element: { getShape: (name: string) => { cloneNode: () => unknown } },
		) => {
			if (elementType === "edge") return element.getShape("key").cloneNode();
			const rect = element.getShape("key-container").cloneNode() as {
				style: Record<string, unknown>;
			};
			const tone = toneLookup.get(id) ?? "neutral";
			rect.style.opacity = 0.92;
			rect.style.fill = palette[tone];
			rect.style.fillOpacity = 0.22;
			rect.style.stroke = palette[tone];
			rect.style.lineWidth = 1.5;
			rect.style.radius = 5;
			return rect;
		},
	});

	const graph = new G6Graph({
		container,
		width,
		height,
		theme: palette.dark ? "dark" : "light",
		animation: false,
		padding: 28,
		zoomRange: [0.15, 2.5],
		edge: {
			state: {
				active: {
					stroke: palette.selected,
					strokeOpacity: 1,
					lineWidth: 3.2,
					zIndex: 4,
				},
				inactive: {
					opacity: 0.75,
				},
			},
		},
		node: {
			state: {
				active: { zIndex: 3 },
				inactive: { opacity: 0.75 },
			},
		},
		behaviors: [
			{
				type: "zoom-canvas",
				key: "wheel-zoom",
				preventDefault: true,
				sensitivity: 0.45,
			},
			{
				type: "hover-activate",
				key: "hover",
				degree: 1,
				state: "active",
				inactiveState: "inactive",
				animation: false,
				enable: (event: { pointerType?: string }) =>
					event.pointerType !== "touch" &&
					(typeof window === "undefined" || window.matchMedia("(hover: hover)").matches),
			},
		],
		plugins: minimapEnabled ? [minimapPlugin()] : [],
	});

	const onWheel = (event: WheelEvent) => {
		event.preventDefault();
		// G6's HTML node overlay sits above the canvas and doesn't forward wheel events.
		if (!(event.target instanceof HTMLCanvasElement)) {
			const box = container.getBoundingClientRect();
			const clamped = Math.max(-120, Math.min(120, event.deltaY));
			const ratio = Math.exp(-clamped * 0.0006);
			const origin: [number, number] = [event.clientX - box.left, event.clientY - box.top];
			void enqueue(async () => {
				userAdjusted = true;
				await graph.zoomBy(ratio, false, origin);
				emitScale();
			});
		}
	};
	const activePointers = new Map<number, { x: number; y: number }>();
	let movedDistance = 0;
	let dragging = false;
	let suppressClick = false;

	const onPointerDown = (event: PointerEvent) => {
		if (event.pointerType === "touch") return;
		if (event.pointerType === "mouse" && event.button !== 0) return;
		if ((event.target as Element | null)?.closest(".topo-minimap")) return;
		activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
		if (activePointers.size === 1) {
			movedDistance = 0;
			dragging = false;
			suppressClick = false;
		} else {
			dragging = false;
			container.classList.remove("is-panning");
		}
	};
	const onPointerMove = (event: PointerEvent) => {
		if (event.pointerType === "touch") return;
		const prev = activePointers.get(event.pointerId);
		if (!prev) return;
		const dx = event.clientX - prev.x;
		const dy = event.clientY - prev.y;
		activePointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
		if (activePointers.size !== 1) return;
		movedDistance += Math.hypot(dx, dy);
		if (!dragging && movedDistance > 7) {
			dragging = true;
			container.classList.add("is-panning");
			try {
				container.setPointerCapture(event.pointerId);
			} catch {
				// Pointer may already be released.
			}
		}
		if (dragging && (dx !== 0 || dy !== 0)) {
			userAdjusted = true;
			void graph.translateBy([dx, dy], false);
		}
	};
	const endPan = (event: PointerEvent) => {
		if (event.pointerType === "touch") return;
		if (!activePointers.delete(event.pointerId)) return;
		if (activePointers.size === 0 && dragging) {
			suppressClick = true;
			dragging = false;
			container.classList.remove("is-panning");
			try {
				if (container.hasPointerCapture(event.pointerId)) container.releasePointerCapture(event.pointerId);
			} catch {
				// Ignore if already released.
			}
		}
	};

	let activeTouchId: number | null = null;
	let lastTouchX = 0;
	let lastTouchY = 0;
	let touchMoved = 0;
	let touchDragging = false;
	let lastPinchDist: number | null = null;
	let pinchRafId = 0;
	let pendingPinchRatio = 1;
	let pendingPinchOrigin: [number, number] | null = null;

	const cancelPinchRaf = () => {
		if (pinchRafId) {
			cancelAnimationFrame(pinchRafId);
			pinchRafId = 0;
		}
		pendingPinchRatio = 1;
		pendingPinchOrigin = null;
	};
	const resetTouchPan = () => {
		activeTouchId = null;
		touchMoved = 0;
		touchDragging = false;
		lastPinchDist = null;
		cancelPinchRaf();
		container.classList.remove("is-panning");
	};
	const findTouch = (touches: TouchList, id: number): Touch | undefined => {
		for (let i = 0; i < touches.length; i++) {
			const t = touches[i];
			if (t && t.identifier === id) return t;
		}
		return undefined;
	};
	const pinchDistance = (t0: Touch, t1: Touch) => Math.hypot(t0.clientX - t1.clientX, t0.clientY - t1.clientY);
	const flushPinchZoom = () => {
		pinchRafId = 0;
		if (dead || !pendingPinchOrigin || Math.abs(pendingPinchRatio - 1) <= 0.002) {
			pendingPinchRatio = 1;
			pendingPinchOrigin = null;
			return;
		}
		const ratio = Math.max(0.85, Math.min(1.18, pendingPinchRatio));
		const origin = pendingPinchOrigin;
		pendingPinchRatio = 1;
		pendingPinchOrigin = null;
		userAdjusted = true;
		void graph.zoomBy(ratio, false, origin).then(() => {
			emitScale();
		});
	};
	const onTouchStart = (event: TouchEvent) => {
		if (!panEnabled) return;
		const target = event.target as Element | null;
		if (target?.closest(".topo-minimap") || target?.closest(".topo-pan-toggle")) return;
		if (event.touches.length === 2) {
			const t0 = event.touches[0];
			const t1 = event.touches[1];
			activeTouchId = null;
			touchDragging = false;
			cancelPinchRaf();
			container.classList.remove("is-panning");
			lastPinchDist = t0 && t1 ? pinchDistance(t0, t1) : null;
			return;
		}
		if (event.touches.length !== 1) {
			resetTouchPan();
			return;
		}
		const touch = event.touches[0];
		if (!touch) return;
		lastPinchDist = null;
		cancelPinchRaf();
		activeTouchId = touch.identifier;
		lastTouchX = touch.clientX;
		lastTouchY = touch.clientY;
		touchMoved = 0;
		touchDragging = false;
		suppressClick = false;
	};
	const onTouchMove = (event: TouchEvent) => {
		if (!panEnabled) return;
		if (event.touches.length === 2) {
			const t0 = event.touches[0];
			const t1 = event.touches[1];
			if (!t0 || !t1) return;
			event.preventDefault();
			const dist = pinchDistance(t0, t1);
			if (lastPinchDist && lastPinchDist > 20 && dist > 20) {
				const rawRatio = dist / lastPinchDist;
				if (Math.abs(rawRatio - 1) > 0.006) {
					lastPinchDist = dist;
					const damped = Math.max(0.92, Math.min(1.08, 1 + (rawRatio - 1) * 0.65));
					const box = container.getBoundingClientRect();
					const ox = Math.max(0, Math.min(box.width, (t0.clientX + t1.clientX) / 2 - box.left));
					const oy = Math.max(0, Math.min(box.height, (t0.clientY + t1.clientY) / 2 - box.top));
					pendingPinchRatio *= damped;
					pendingPinchOrigin = [ox, oy];
					if (!pinchRafId) pinchRafId = requestAnimationFrame(flushPinchZoom);
				}
			} else {
				lastPinchDist = dist;
			}
			return;
		}
		if (activeTouchId === null || event.touches.length !== 1) return;
		const touch = findTouch(event.touches, activeTouchId);
		if (!touch) return;
		event.preventDefault();
		const dx = touch.clientX - lastTouchX;
		const dy = touch.clientY - lastTouchY;
		lastTouchX = touch.clientX;
		lastTouchY = touch.clientY;
		touchMoved += Math.hypot(dx, dy);
		if (!touchDragging && touchMoved > 7) {
			touchDragging = true;
			container.classList.add("is-panning");
		}
		if (touchDragging && (dx !== 0 || dy !== 0)) {
			userAdjusted = true;
			void graph.translateBy([dx, dy], false);
		}
	};
	const onTouchEnd = (event: TouchEvent) => {
		if (event.touches.length < 2) {
			lastPinchDist = null;
			cancelPinchRaf();
		}
		if (activeTouchId === null) return;
		if (event.touches.length > 0 && findTouch(event.touches, activeTouchId)) return;
		if (touchDragging) suppressClick = true;
		resetTouchPan();
	};
	const onClickCapture = (event: MouseEvent) => {
		if (!suppressClick) return;
		suppressClick = false;
		event.preventDefault();
		event.stopPropagation();
	};
	const onCardClick = (event: MouseEvent) => {
		const card = (event.target as Element | null)?.closest<HTMLElement>("[data-topo-id]");
		if (!card?.dataset.topoId) return;
		const target = selectionLookup.get(card.dataset.topoId);
		if (target) onSelect(target);
	};
	const onCardDblClick = (event: MouseEvent) => {
		const card = (event.target as Element | null)?.closest<HTMLElement>("[data-topo-id]");
		const id = card?.dataset.topoId;
		if (!id || !selectionLookup.has(id)) return;
		void enqueue(async () => {
			userAdjusted = true;
			await graph.focusElement(id, { duration: 220 });
		});
	};

	container.addEventListener("pointerdown", onPointerDown);
	container.addEventListener("pointermove", onPointerMove);
	container.addEventListener("pointerup", endPan);
	container.addEventListener("pointercancel", endPan);
	container.addEventListener("lostpointercapture", endPan);
	container.addEventListener("touchstart", onTouchStart, { passive: true });
	container.addEventListener("touchmove", onTouchMove, { passive: false });
	container.addEventListener("touchend", onTouchEnd);
	container.addEventListener("touchcancel", onTouchEnd);
	container.addEventListener("click", onClickCapture, true);
	container.addEventListener("click", onCardClick);
	container.addEventListener("dblclick", onCardDblClick);
	container.addEventListener("wheel", onWheel, { passive: false });

	const emitScale = () => {
		if (!dead) onScale?.(graph.getZoom());
	};

	graph.on(GraphEvent.AFTER_TRANSFORM, () => {
		if (!fitting) userAdjusted = true;
		emitScale();
	});

	graph.on(CanvasEvent.DBLCLICK, () => {
		void enqueue(async () => {
			userAdjusted = false;
			if (rendered) await autoFit(true);
		});
	});

	graph.on(EdgeEvent.CLICK, (event: IElementEvent) => {
		const edgeIdValue = String(event.target.id);
		const edge = graph.getEdgeData(edgeIdValue);
		if (!edge?.target) return;
		const target = selectionLookup.get(String(edge.target));
		if (target) onSelect(target);
	});

	const enqueue = (task: () => Promise<void>): Promise<void> => {
		queue = queue
			.then(async () => {
				if (!dead) await task();
			})
			.catch(() => {
				// Ignore transient errors on destroyed/updating graphs.
			});
		return queue;
	};

	const autoFit = async (full = false) => {
		fitting = true;
		try {
			await graph.zoomTo(1, false);
			await graph.fitCenter(false);
			await graph.fitView({ when: "overflow", direction: "both" }, false);
			if (!full && graph.getZoom() < 0.7) {
				await graph.zoomTo(0.7, false);
				await graph.fitCenter(false);
			}
			emitScale();
		} finally {
			fitting = false;
		}
	};

	const redraw = async (
		snapshot: TopologyReply,
		clients: ReadonlyMap<string, ClientState>,
		selected: Selection,
		filter: GraphFilter,
	) => {
		const data = layout(snapshot, clients);
		const byId = new Map(data.positions.map((p) => [p.id, p]));
		const nodesMap = new Map(snapshot.nodes.map((n) => [n.id, n]));
		const objectsMap = new Map(
			[...clients].flatMap(([parent, state]) =>
				state.clients
					.slice(0, CLIENT_PREVIEW_LIMIT)
					.map((client) => [clientKey(parent, client), { parent, client }] as const),
			),
		);

		const nextSelectionLookup = new Map<string, Selection>();
		const nextToneLookup = new Map<string, Tone>();
		const g6Nodes: NodeData[] = [];
		const g6Edges: EdgeData[] = [];
		const selectedId = selected.id;
		const selectedPathTargets = new Set<string>([selectedId]);
		if (selected.kind === "client" && selected.parent) selectedPathTargets.add(selected.parent);
		const hasFilter = Boolean(filter.query.trim()) || filter.status !== "all";

		for (const p of data.positions) {
			const node = nodesMap.get(p.id);
			const object = objectsMap.get(p.id);
			if (!node && !object) continue;

			const tone: Tone = node ? nodeTone(node, snapshot) : "neutral";
			nextToneLookup.set(p.id, tone);
			nextSelectionLookup.set(
				p.id,
				node ? { kind: "node", id: node.id } : { kind: "client", parent: object?.parent ?? "", id: p.id },
			);

			const matches = node
				? nodeMatchesFilter(node, snapshot, filter)
				: object
					? clientMatchesFilter(object.client, filter)
					: true;

			const el = buildNodeElement(
				p.id,
				node,
				object,
				snapshot,
				node ? clients.get(node.id) : undefined,
				selectedId === p.id,
				hasFilter && !matches,
			);

			g6Nodes.push({
				id: p.id,
				type: "html",
				style: {
					x: p.x + p.width / 2,
					y: p.y + p.height / 2,
					size: [p.width, p.height],
					dx: -p.width / 2,
					dy: -p.height / 2,
					innerHTML: el,
					cursor: "pointer",
					zIndex: selectedId === p.id ? 3 : 1,
					ports: [
						{ key: "left", placement: [0, 0.5] },
						{ key: "right", placement: [1, 0.5] },
						{ key: "top", placement: [0.5, 0] },
						{ key: "bottom", placement: [0.5, 1] },
					],
				},
			});
		}

		for (const target of data.positions) {
			const source = target.parent ? byId.get(target.parent) : null;
			if (!source) continue;

			const object = objectsMap.get(target.id);
			const targetNode = nodesMap.get(target.id);
			const isVertical = target.x === source.x;
			const isSelected = selectedPathTargets.has(target.id);
			const tone = nextToneLookup.get(target.id) ?? "neutral";

			if (object) {
				const isAssociated = object.client.relation === "associated_with";
				g6Edges.push({
					id: `edge:${target.id}`,
					source: source.id,
					target: target.id,
					type: isVertical ? "cubic-vertical" : "cubic-horizontal",
					style: {
						sourcePort: isVertical ? "bottom" : "right",
						targetPort: isVertical ? "top" : "left",
						stroke: isSelected ? palette.selected : isAssociated ? palette.success : palette.muted,
						strokeOpacity: isSelected ? 1 : 0.85,
						lineWidth: isSelected ? 2.8 : 2,
						lineDash: isAssociated ? [3, 4] : [6, 4],
						shadowColor: isSelected ? palette.selected : undefined,
						shadowBlur: isSelected ? 8 : 0,
						cursor: "pointer",
						zIndex: isSelected ? 4 : 0,
						endArrow: false,
						labelText: isAssociated ? _("Wi-Fi") : undefined,
						labelAutoRotate: false,
						labelFill: palette.text,
						labelFontSize: 10,
						labelBackground: isAssociated,
						labelBackgroundFill: palette.labelBackground,
						labelBackgroundStroke: palette.nodeStroke,
						labelBackgroundLineWidth: 1,
						labelBackgroundRadius: 4,
						labelPadding: [1, 5],
					},
				});
			} else if (targetNode) {
				const link = linkFor(snapshot, targetNode.id);
				const isOffline = targetNode.detail.kind === "onu" && targetNode.detail.registration === null;
				const rxText =
					link?.onu_rx_power_dbm != null
						? `${link.data_interface ? `${link.data_interface} · ` : ""}${num(link.onu_rx_power_dbm, "dBm", 1)}`
						: isOffline
							? _("Binding only")
							: (link?.data_interface ?? _("Logical PON"));

				g6Edges.push({
					id: `edge:${target.id}`,
					source: source.id,
					target: target.id,
					type: "cubic-horizontal",
					style: {
						sourcePort: "right",
						targetPort: "left",
						curvePosition: 0.45,
						stroke: isSelected ? palette.selected : isOffline ? palette.edge : palette[tone],
						strokeOpacity: isSelected ? 1 : isOffline ? 0.78 : 0.92,
						lineWidth: isSelected ? 3.2 : 2.5,
						lineDash: isOffline ? [6, 4] : 0,
						shadowColor: isSelected ? palette.selected : undefined,
						shadowBlur: isSelected ? 8 : 0,
						cursor: "pointer",
						zIndex: isSelected ? 4 : 1,
						endArrow: false,
						labelText: rxText,
						labelAutoRotate: false,
						labelFill: isSelected ? palette.selected : isOffline ? palette.muted : palette.text,
						labelFontSize: 10,
						labelBackground: true,
						labelBackgroundFill: palette.labelBackground,
						labelBackgroundStroke: isSelected ? palette.selected : palette.nodeStroke,
						labelBackgroundLineWidth: 1,
						labelBackgroundRadius: 4,
						labelPadding: [2, 6],
					},
				});
			}
		}

		selectionLookup = nextSelectionLookup;
		toneLookup = nextToneLookup;

		const signature = JSON.stringify({
			width: data.width,
			height: data.height,
			selectedId,
			palette,
			filter,
			nodes: g6Nodes.map((n) => [
				n.id,
				n.style?.x,
				n.style?.y,
				(n.style?.innerHTML as HTMLElement | undefined)?.outerHTML ?? "",
			]),
			edges: g6Edges.map((e) => [e.id, e.style?.stroke, e.style?.labelText, e.style?.lineWidth]),
		});

		if (rendered && signature === lastSignature) return;
		lastSignature = signature;

		graph.setData({ nodes: g6Nodes, edges: g6Edges });
		if (!rendered) {
			await graph.render();
			rendered = true;
		} else {
			await graph.draw();
		}

		if (!userAdjusted && (lastWidth === 0 || data.width > lastWidth)) {
			await autoFit(false);
		}
		lastWidth = data.width;
	};

	const resizeTarget = container.parentElement ?? container;
	const observer = new ResizeObserver(() => {
		if (dead || !resizeTarget.clientWidth || !resizeTarget.clientHeight) return;
		void enqueue(async () => {
			graph.resize(resizeTarget.clientWidth, resizeTarget.clientHeight);
			if (rendered && !userAdjusted) await autoFit(false);
		});
	});
	observer.observe(resizeTarget);

	return {
		update(snapshot, clients, selected, filter = { query: "", status: "all" }) {
			lastSnapshot = snapshot;
			lastClients = clients;
			lastSelected = selected;
			lastFilter = filter;
			void enqueue(() => redraw(snapshot, clients, selected, filter));
		},
		setPalette(next) {
			if (samePalette(palette, next)) return;
			palette = next;
			void enqueue(async () => {
				graph.setTheme(palette.dark ? "dark" : "light");
				if (minimapEnabled) graph.setPlugins([minimapPlugin()]);
				if (lastSnapshot) await redraw(lastSnapshot, lastClients, lastSelected, lastFilter);
			});
		},
		setMinimap(enabled) {
			if (minimapEnabled === enabled) return;
			minimapEnabled = enabled;
			void enqueue(async () => {
				graph.setPlugins(enabled ? [minimapPlugin()] : []);
			});
		},
		fit() {
			void enqueue(async () => {
				userAdjusted = false;
				if (rendered) await autoFit(true);
			});
		},
		zoom(factor) {
			void enqueue(async () => {
				userAdjusted = true;
				await graph.zoomBy(factor, { duration: 120 });
				emitScale();
			});
		},
		reset() {
			void enqueue(async () => {
				userAdjusted = true;
				await graph.zoomTo(1, { duration: 120 });
				emitScale();
			});
		},
		focusNode(id) {
			if (!selectionLookup.has(id)) return;
			void enqueue(async () => {
				userAdjusted = true;
				await graph.focusElement(id, { duration: 220 });
			});
		},
		setPanning(enabled) {
			panEnabled = enabled;
			if (!enabled) resetTouchPan();
			container.classList.toggle("is-pan-mode", enabled);
		},
		destroy() {
			if (dead) return;
			dead = true;
			cancelPinchRaf();
			observer.disconnect();
			container.removeEventListener("pointerdown", onPointerDown);
			container.removeEventListener("pointermove", onPointerMove);
			container.removeEventListener("pointerup", endPan);
			container.removeEventListener("pointercancel", endPan);
			container.removeEventListener("lostpointercapture", endPan);
			container.removeEventListener("touchstart", onTouchStart);
			container.removeEventListener("touchmove", onTouchMove);
			container.removeEventListener("touchend", onTouchEnd);
			container.removeEventListener("touchcancel", onTouchEnd);
			container.removeEventListener("click", onClickCapture, true);
			container.removeEventListener("click", onCardClick);
			container.removeEventListener("dblclick", onCardDblClick);
			container.removeEventListener("wheel", onWheel);
			graph.off();
			graph.destroy();
		},
	};
}
