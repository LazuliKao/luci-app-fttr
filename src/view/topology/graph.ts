// SPDX-License-Identifier: Apache-2.0

// G6 adapter: owns the Graph instance, maps the topology model into G6 data
// with explicit theme colors, serializes asynchronous mutations and manages
// viewport/selection. Detailed device information stays in LuCI components.

import { DragCanvas } from "@antv/g6/esm/behaviors/drag-canvas";
import { ZoomCanvas } from "@antv/g6/esm/behaviors/zoom-canvas";
import { CanvasEvent, GraphEvent, NodeEvent } from "@antv/g6/esm/constants";
import { Polyline } from "@antv/g6/esm/elements/edges/polyline";
import { Rect } from "@antv/g6/esm/elements/nodes/rect";
import { register } from "@antv/g6/esm/registry/register";
import { Graph as G6Graph } from "@antv/g6/esm/runtime/graph";
import type { EdgeData, NodeData } from "@antv/g6/esm/spec";
import { dark, light } from "@antv/g6/esm/themes";
import { ArrangeDrawOrder } from "@antv/g6/esm/transforms/arrange-draw-order";
import { CollapseExpandCombo } from "@antv/g6/esm/transforms/collapse-expand-combo";
import { CollapseExpandNode } from "@antv/g6/esm/transforms/collapse-expand-node";
import { GetEdgeActualEnds } from "@antv/g6/esm/transforms/get-edge-actual-ends";
import { UpdateRelatedEdge } from "@antv/g6/esm/transforms/update-related-edge";
import type { IElementEvent } from "@antv/g6/esm/types";
import { getRegistrationBadgeSpec } from "../components/badge";
import { formatPower } from "../components/formatters";
import { businessLabels } from "../contracts/status";
import {
	CONTROLLER_ID,
	edgeId,
	gridPositions,
	shortSerial,
	type TopologyMeasurement,
	type TopologyModel,
	type TopologySubGateway,
} from "./model";

// Register only the minimal extensions required by the FTTR topology view.
// This avoids importing all built-in layouts (D3, Dagre, Force, etc.) and plugins,
// significantly reducing the bundled artifact size.
register("node", "rect", Rect);
register("edge", "polyline", Polyline);
register("behavior", "drag-canvas", DragCanvas);
register("behavior", "zoom-canvas", ZoomCanvas);
register("transform", "update-related-edges", UpdateRelatedEdge);
register("transform", "collapse-expand-node", CollapseExpandNode);
register("transform", "collapse-expand-combo", CollapseExpandCombo);
register("transform", "get-edge-actual-ends", GetEdgeActualEnds);
register("transform", "arrange-draw-order", ArrangeDrawOrder);
register("theme", "light", light);
register("theme", "dark", dark);

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

export type Tone = "success" | "warning" | "danger" | "info" | "neutral";

const LIGHT: TopologyPalette = {
	dark: false,
	nodeFill: "#ffffff",
	nodeStroke: "#c8ced6",
	text: "#1f2328",
	muted: "#6b7280",
	edge: "#9aa4b1",
	selected: "#2f81f7",
	labelBackground: "rgba(255, 255, 255, 0.92)",
	success: "#27ae60",
	warning: "#d35400",
	danger: "#c0392b",
	info: "#2980b9",
	neutral: "#7f8c8d",
};

const DARK: TopologyPalette = {
	dark: true,
	nodeFill: "#23272e",
	nodeStroke: "#475061",
	text: "#e6e6e6",
	muted: "#9aa4b1",
	edge: "#6b7686",
	selected: "#58a6ff",
	labelBackground: "rgba(20, 22, 26, 0.88)",
	success: "#2ecc71",
	warning: "#f39c12",
	danger: "#e74c3c",
	info: "#3498db",
	neutral: "#bdc3c7",
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

/** Effective (first non-transparent) background color of an element or its ancestors. */
function effectiveBackground(element: Element): [number, number, number, number] | null {
	let current: Element | null = element;
	while (current) {
		const color = parseColor(getComputedStyle(current).backgroundColor);
		if (color && color[3] > 0.5) return color;
		current = current.parentElement;
	}
	return null;
}

/**
 * Map the active LuCI theme into explicit canvas colors. Canvas elements do
 * not inherit CSS, so the theme is sampled from the rendered page.
 */
export function readPalette(element: Element): TopologyPalette {
	const root = document.documentElement;
	const background = effectiveBackground(element);
	const hinted =
		root.getAttribute("data-darkmode") === "true" ||
		root.getAttribute("data-theme") === "dark" ||
		document.body?.getAttribute("data-darkmode") === "true" ||
		document.body?.getAttribute("data-theme") === "dark";
	const dark = background ? luminance(background) < 0.35 : hinted;
	const base = dark ? DARK : LIGHT;
	const color = parseColor(getComputedStyle(element).color);
	// Only adopt the theme text color when it contrasts with the chosen base.
	const text = color && luminance(color) > 0.5 === dark ? getComputedStyle(element).color : base.text;
	return { ...base, text };
}

export function samePalette(a: TopologyPalette, b: TopologyPalette): boolean {
	return (Object.keys(a) as (keyof TopologyPalette)[]).every((key) => a[key] === b[key]);
}

// ---------------------------------------------------------------------------
// Presentation helpers (shared with the TSX page)
// ---------------------------------------------------------------------------

const TONE_ICON: Record<Tone, string> = {
	success: "✓",
	warning: "!",
	danger: "✕",
	info: "…",
	neutral: "○",
};

export function toneIcon(tone: Tone): string {
	return TONE_ICON[tone];
}

/** Overall node tone; always paired with a text label/icon, never color alone. */
export function subGatewayTone(node: TopologySubGateway): Tone {
	if (node.issues.length) return "danger";
	if (!node.present) return "neutral";
	if (!node.registered) return "warning";
	if (node.business?.phase === "verified" && !node.business.error) return "success";
	if (node.business?.error) return "warning";
	return "info";
}

export function subGatewayStateText(node: TopologySubGateway): string {
	if (!node.present) return _("Offline");
	const registration = getRegistrationBadgeSpec(node.registration ?? undefined).label;
	const business = node.business ? businessLabels()[node.business.phase] : "—";
	return `${registration} · ${business}`;
}

export function subGatewayTitle(node: TopologySubGateway): string {
	return node.label || node.vendor || (node.present ? _("Sub-gateway") : _("Offline device"));
}

export function bindingText(node: TopologySubGateway): string | null {
	const { kind, active, desired } = node.binding;
	switch (kind) {
		case "effective":
			return _("Fixed fttr%d").format(active ?? 0);
		case "pending_add":
			return _("fttr%d after restart").format(desired ?? 0);
		case "pending_change":
			return _("fttr%d → fttr%d after restart").format(active ?? 0, desired ?? 0);
		case "pending_remove":
			return _("Unpin fttr%d after restart").format(active ?? 0);
		default:
			return null;
	}
}

export function measurementText(value: TopologyMeasurement, format: (value: number) => string): string {
	if (value.value === null) return _("unavailable");
	return value.stale ? `${format(value.value)} (${_("stale")})` : format(value.value);
}

export function formatDistance(meters: number): string {
	return meters >= 1000 ? `${(meters / 1000).toFixed(2)} km` : `${Math.round(meters)} m`;
}

export function rxPowerText(node: TopologySubGateway): string {
	return measurementText(node.rxPower, (value) => formatPower(value, 1));
}

function clip(value: string, max = 26): string {
	return value.length > max ? `${value.slice(0, max - 1)}…` : value;
}

// ---------------------------------------------------------------------------
// Layout and data mapping
// ---------------------------------------------------------------------------

const CONTROLLER_SIZE: [number, number] = [208, 84];
const NODE_SIZE: [number, number] = [184, 88];
const COLUMN_GAP = 24;
const ROW_GAP = 128;
const FIRST_ROW_OFFSET = 176;
const DROP = 56;
const MAX_COLUMNS = 8;

interface Placement {
	x: number;
	y: number;
	busY: number;
}

function placements(count: number): Placement[] {
	const pitch = NODE_SIZE[0] + COLUMN_GAP;
	return gridPositions(count, MAX_COLUMNS).map(({ row, column, columns }) => {
		const y = FIRST_ROW_OFFSET + row * (NODE_SIZE[1] + ROW_GAP);
		return {
			x: (column - (columns - 1) / 2) * pitch,
			y,
			busY: y - NODE_SIZE[1] / 2 - DROP,
		};
	});
}

function controllerLines(model: TopologyModel): string[] {
	const c = model.controller;
	const fpga = c.fpgaStatus === "ready" ? `✓ ${_("Ready")}` : c.fpgaStatus ? `! ${c.fpgaStatus}` : "—";
	const cdr = c.cdrLocked == null ? _("Unknown") : c.cdrLocked ? `✓ ${_("Locked")}` : `! ${_("Unlocked")}`;
	return [
		_("FTTR controller"),
		`${_("FPGA")}: ${fpga} · ${_("CDR")}: ${cdr}`,
		c.opticalModel ? clip(c.opticalModel, 30) : `${_("Optical module")}: —`,
		_("Registered %d / %d").format(model.counts.registered, model.counts.known),
	];
}

function controllerTone(model: TopologyModel): Tone {
	const c = model.controller;
	if (c.allocationBlocked || c.pinningError) return "danger";
	if (c.fpgaStatus !== "ready" || c.cdrLocked === false) return "warning";
	return "success";
}

function subGatewayLines(node: TopologySubGateway): string[] {
	const tone = subGatewayTone(node);
	const iface = node.dataInterface
		? `${node.dataInterface.name}${node.dataInterface.carrier === false ? ` (${_("link down")})` : ""}`
		: _("No data interface");
	const binding = node.binding.kind !== "none" && node.binding.kind !== "effective" ? " *" : "";
	return [
		clip(subGatewayTitle(node)),
		shortSerial(node.serial) ?? _("Serial unavailable"),
		clip(`${toneIcon(tone)} ${subGatewayStateText(node)}`, 30),
		clip(`${iface}${binding}`),
	];
}

function edgeLabel(node: TopologySubGateway): string {
	if (!node.present) return _("offline");
	const distance = measurementText(node.distance, formatDistance);
	return `${_("ONU Rx")} ${rxPowerText(node)} · ${distance}`;
}

export interface GraphDataOptions {
	palette: TopologyPalette;
	selected: string | null;
}

export function toGraphData(
	model: TopologyModel,
	{ palette, selected }: GraphDataOptions,
): { nodes: NodeData[]; edges: EdgeData[] } {
	const ctrlTone = controllerTone(model);
	const nodes: NodeData[] = [
		{
			id: CONTROLLER_ID,
			type: "rect",
			style: {
				x: 0,
				y: 0,
				size: CONTROLLER_SIZE,
				radius: 6,
				fill: palette.nodeFill,
				stroke: selected === CONTROLLER_ID ? palette.selected : palette[ctrlTone],
				lineWidth: selected === CONTROLLER_ID ? 3 : 2,
				cursor: "pointer",
				labelText: controllerLines(model).join("\n"),
				labelPlacement: "center",
				labelFill: palette.text,
				labelFontSize: 12,
				labelLineHeight: 17,
				labelTextAlign: "center",
				labelWordWrap: false,
				labelBackground: false,
				badges: [{ text: toneIcon(ctrlTone), placement: "top-right" }],
				badgePalette: [palette[ctrlTone]],
				badgeFontSize: 10,
			},
		},
	];
	const edges: EdgeData[] = [];
	const positions = placements(model.subGateways.length);

	model.subGateways.forEach((node, index) => {
		const { x, y, busY } = positions[index];
		const tone = subGatewayTone(node);
		const isSelected = node.id === selected;
		const color = palette[tone];
		nodes.push({
			id: node.id,
			type: "rect",
			style: {
				x,
				y,
				size: NODE_SIZE,
				radius: 6,
				fill: palette.nodeFill,
				fillOpacity: node.present ? 1 : 0.6,
				stroke: isSelected ? palette.selected : color,
				lineWidth: isSelected ? 3 : node.present ? 2 : 1.5,
				lineDash: node.present ? 0 : [5, 4],
				cursor: "pointer",
				labelText: subGatewayLines(node).join("\n"),
				labelPlacement: "center",
				labelFill: node.present ? palette.text : palette.muted,
				labelFontSize: 11,
				labelLineHeight: 16,
				labelTextAlign: "center",
				labelWordWrap: false,
				labelBackground: false,
				badges: [{ text: toneIcon(tone), placement: "top-right" }],
				badgePalette: [color],
				badgeFontSize: 10,
			},
		});

		// Path: controller bottom → logical PON bus → drop into the node top.
		const sourceY = CONTROLLER_SIZE[1] / 2;
		const targetY = y - NODE_SIZE[1] / 2;
		const trunk = busY - sourceY;
		const span = Math.abs(x);
		const drop = targetY - busY;
		const total = trunk + span + drop;
		edges.push({
			id: edgeId(node.id),
			source: CONTROLLER_ID,
			target: node.id,
			type: "polyline",
			style: {
				controlPoints: [
					[0, busY],
					[x, busY],
				],
				radius: 6,
				stroke: isSelected ? palette.selected : node.present ? color : palette.edge,
				lineWidth: isSelected ? 2.5 : 1.5,
				lineDash: node.present ? 0 : [5, 4],
				endArrow: false,
				zIndex: isSelected ? 2 : node.present ? 1 : 0,
				labelText: edgeLabel(node),
				labelPlacement: total > 0 ? (trunk + span + drop / 2) / total : "center",
				labelAutoRotate: false,
				labelFill: node.present ? palette.text : palette.muted,
				labelFontSize: 10,
				labelBackground: true,
				labelBackgroundFill: palette.labelBackground,
				labelBackgroundRadius: 3,
				labelPadding: [1, 4],
			},
		});
	});

	return { nodes, edges };
}

// ---------------------------------------------------------------------------
// Graph lifecycle
// ---------------------------------------------------------------------------

export interface TopologyGraphOptions {
	container: HTMLElement;
	width: number;
	height: number;
	palette: TopologyPalette;
	onSelect(id: string | null): void;
	onActivate(id: string): void;
	onError(error: unknown): void;
}

export interface TopologyGraph {
	/** Apply a new model; preserves viewport unless it has never been adjusted. */
	update(model: TopologyModel, selected: string | null): Promise<void>;
	setPalette(palette: TopologyPalette): Promise<void>;
	resize(width: number, height: number): Promise<void>;
	zoomIn(): Promise<void>;
	zoomOut(): Promise<void>;
	fit(): Promise<void>;
	destroy(): void;
}

export function createTopologyGraph(options: TopologyGraphOptions): TopologyGraph {
	const { container } = options;
	let palette = options.palette;
	let model: TopologyModel | null = null;
	let selected: string | null = null;
	let rendered = false;
	let destroyed = false;
	let fitting = false;
	let userAdjusted = false;
	let structureKey: string | null = null;
	let queue: Promise<void> = Promise.resolve();

	const graph = new G6Graph({
		container,
		width: options.width,
		height: options.height,
		animation: false,
		padding: 24,
		zoomRange: [0.15, 3],
		behaviors: [
			{ type: "drag-canvas", key: "drag" },
			// Wheel zoom requires Ctrl so normal page scrolling over the graph keeps working.
			{
				type: "zoom-canvas",
				key: "wheel-zoom",
				preventDefault: false,
				enable: (event: { ctrlKey?: boolean; metaKey?: boolean }) => Boolean(event.ctrlKey || event.metaKey),
			},
			{ type: "zoom-canvas", key: "pinch-zoom", trigger: ["pinch"] },
		],
	});

	// Block browser page zoom only for the Ctrl/Meta+wheel gesture that zooms the graph.
	const onWheel = (event: WheelEvent) => {
		if (event.ctrlKey || event.metaKey) event.preventDefault();
	};
	container.addEventListener("wheel", onWheel, { passive: false });

	graph.on(GraphEvent.AFTER_TRANSFORM, () => {
		if (!fitting) userAdjusted = true;
	});
	graph.on(NodeEvent.CLICK, (event: IElementEvent) => {
		options.onSelect(String(event.target.id));
	});
	graph.on(NodeEvent.DBLCLICK, (event: IElementEvent) => {
		options.onActivate(String(event.target.id));
	});
	graph.on(CanvasEvent.CLICK, () => options.onSelect(null));

	const enqueue = (task: () => Promise<void>): Promise<void> => {
		queue = queue
			.then(async () => {
				if (!destroyed) await task();
			})
			.catch((error) => {
				if (!destroyed) options.onError(error);
			});
		return queue;
	};

	const autoFit = async () => {
		fitting = true;
		try {
			// Center at natural scale, shrinking only when the topology overflows.
			await graph.zoomTo(1, false);
			await graph.fitCenter(false);
			await graph.fitView({ when: "overflow", direction: "both" }, false);
		} finally {
			fitting = false;
		}
	};

	const redraw = async () => {
		if (!model) return;
		graph.setData(toGraphData(model, { palette, selected }));
		if (!rendered) {
			await graph.render();
			rendered = true;
		} else {
			await graph.draw();
		}
	};

	return {
		update(next, nextSelected) {
			return enqueue(async () => {
				model = next;
				selected = nextSelected;
				const structureChanged = next.structureKey !== structureKey;
				const first = !rendered;
				structureKey = next.structureKey;
				await redraw();
				if (destroyed) return;
				if (first || (structureChanged && !userAdjusted)) await autoFit();
			});
		},
		setPalette(next) {
			return enqueue(async () => {
				palette = next;
				await redraw();
			});
		},
		resize(width, height) {
			return enqueue(async () => {
				graph.resize(width, height);
				if (rendered && !userAdjusted) await autoFit();
			});
		},
		zoomIn() {
			return enqueue(() => graph.zoomBy(1.25, false));
		},
		zoomOut() {
			return enqueue(() => graph.zoomBy(0.8, false));
		},
		fit() {
			return enqueue(async () => {
				userAdjusted = false;
				if (rendered) await autoFit();
			});
		},
		destroy() {
			if (destroyed) return;
			destroyed = true;
			container.removeEventListener("wheel", onWheel);
			graph.off();
			graph.destroy();
		},
	};
}
