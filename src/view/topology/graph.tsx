// SPDX-License-Identifier: Apache-2.0
// LuCI-owned card graph: semantic buttons, explicit layout and a pan/zoom viewport.
import type { TopologyReply } from "../../api/generated/types";
import { CLIENT_PREVIEW_LIMIT, clientKey, layout, observedCount, type Selection } from "./model";
import { badge, clientCard, nodeCard, nodeState, nodeTone, relationText } from "./presentation";
import type { ClientState } from "./store";

export interface TopologyGraph {
	update(snapshot: TopologyReply, clients: ReadonlyMap<string, ClientState>, selected: Selection): void;
	fit(): void;
	zoom(factor: number): void;
	reset(): void;
	destroy(): void;
}

export function createTopologyGraph(
	container: HTMLElement,
	onSelect: (selection: Selection) => void,
	onScale?: (scale: number) => void,
): TopologyGraph {
	const world = <div class="topo-world" />;
	container.replaceChildren(world);
	let dimensions = { width: 1000, height: 600 };
	let position = { x: 0, y: 0, scale: 1 };
	let adjusted = false;
	let dead = false;
	let painted = "";
	let lastWidth = 0;
	let initialized = false;
	let gesture: { x: number; y: number; distance: number } | null = null;
	const pointers = new Map<number, { x: number; y: number }>();

	function transform() {
		world.style.transform = `translate(${position.x}px, ${position.y}px) scale(${position.scale})`;
		onScale?.(position.scale);
	}
	function fit(full = true) {
		if (dead || !container.clientWidth || !container.clientHeight) return;
		adjusted = false;
		// A true fit may shrink everything; the automatic fit keeps text readable and
		// lets the user pan the overflow instead.
		const scale = Math.max(
			full ? 0.15 : 0.7,
			Math.min(
				1,
				(container.clientWidth - 40) / dimensions.width,
				(container.clientHeight - 40) / dimensions.height,
			),
		);
		position = {
			scale,
			x: Math.max(12, (container.clientWidth - dimensions.width * scale) / 2),
			y: Math.max(12, (container.clientHeight - dimensions.height * scale) / 2),
		};
		transform();
	}
	function zoomAt(factor: number, x = container.clientWidth / 2, y = container.clientHeight / 2) {
		const scale = Math.max(0.15, Math.min(2, position.scale * factor));
		const ratio = scale / position.scale;
		position = { scale, x: x - (x - position.x) * ratio, y: y - (y - position.y) * ratio };
		adjusted = true;
		transform();
	}
	function centerGesture() {
		const points = [...pointers.values()];
		if (!points.length) return null;
		return {
			x: points.reduce((sum, p) => sum + p.x, 0) / points.length,
			y: points.reduce((sum, p) => sum + p.y, 0) / points.length,
			distance: points.length > 1 ? Math.hypot(points[1].x - points[0].x, points[1].y - points[0].y) : 0,
		};
	}
	const down = (event: PointerEvent) => {
		if ((event.target as Element).closest("button") || (event.pointerType === "mouse" && event.button !== 0))
			return;
		pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
		container.setPointerCapture(event.pointerId);
		gesture = centerGesture();
		container.classList.add("is-panning");
	};
	const move = (event: PointerEvent) => {
		if (!pointers.has(event.pointerId)) return;
		pointers.set(event.pointerId, { x: event.clientX, y: event.clientY });
		const next = centerGesture();
		if (gesture && next) {
			position.x += next.x - gesture.x;
			position.y += next.y - gesture.y;
			if (next.distance > 0 && gesture.distance > 0) {
				const box = container.getBoundingClientRect();
				zoomAt(next.distance / gesture.distance, next.x - box.left, next.y - box.top);
			}
			adjusted = true;
			transform();
		}
		gesture = next;
	};
	const up = (event: PointerEvent) => {
		pointers.delete(event.pointerId);
		gesture = centerGesture();
		if (!pointers.size) container.classList.remove("is-panning");
	};
	const wheel = (event: WheelEvent) => {
		if (!event.ctrlKey && !event.metaKey) return;
		event.preventDefault();
		const box = container.getBoundingClientRect();
		zoomAt(Math.exp(-event.deltaY * 0.002), event.clientX - box.left, event.clientY - box.top);
	};
	const focus = (event: FocusEvent) => {
		const button = (event.target as Element).closest<HTMLElement>(".topo-graph-card");
		if (!button) return;
		const node = button.getBoundingClientRect();
		const box = container.getBoundingClientRect();
		if (node.left < box.left || node.right > box.right || node.top < box.top || node.bottom > box.bottom) {
			position.x += box.left + box.width / 2 - (node.left + node.width / 2);
			position.y += box.top + box.height / 2 - (node.top + node.height / 2);
			adjusted = true;
			transform();
		}
	};
	container.addEventListener("pointerdown", down);
	container.addEventListener("pointermove", move);
	container.addEventListener("pointerup", up);
	container.addEventListener("pointercancel", up);
	container.addEventListener("lostpointercapture", up);
	container.addEventListener("wheel", wheel, { passive: false });
	container.addEventListener("focusin", focus);
	const observer = new ResizeObserver(() => {
		if (!dead && !adjusted) fit(false);
	});
	observer.observe(container);

	return {
		update(snapshot, clients, selected) {
			if (dead) return;
			const data = layout(snapshot, clients);
			dimensions = data;
			const byId = new Map(data.positions.map((p) => [p.id, p]));
			const objects = new Map(
				[...clients].flatMap(([parent, state]) =>
					state.clients
						.slice(0, CLIENT_PREVIEW_LIMIT)
						.map((client) => [clientKey(parent, client), { parent, client }] as const),
				),
			);
			const selectedId = selected.id;
			const nodes = new Map(snapshot.nodes.map((n) => [n.id, n]));
			const parts: HTMLElement[] = [];
			const highlight = (id: string | null) => {
				for (const wire of world.querySelectorAll<HTMLElement>("[data-target]")) {
					wire.classList.toggle(
						"is-hovered",
						id !== null && (wire.dataset.target === id || wire.dataset.source === id),
					);
				}
			};
			for (const target of data.positions) {
				const source = target.parent ? byId.get(target.parent) : null;
				if (!source) continue;
				const object = objects.get(target.id);
				const dashed = object?.client.relation === "learned_behind";
				const dotted = object?.client.relation === "associated_with";
				const selectLink = () =>
					onSelect(
						object
							? { kind: "client", parent: object.parent, id: target.id }
							: { kind: "node", id: target.id },
					);
				const label = `${object ? relationText(object.client) : _("Logical PON link")} · ${nodes.get(target.id)?.label ?? object?.client.hostname ?? object?.client.mac ?? target.id}`;
				const segment = (
					vertical: boolean,
					x: number,
					y: number,
					length: number,
					hit = false,
					focus = false,
				) => (
					<button
						type="button"
						class={`topo-wire-hit ${vertical ? "is-vertical" : "is-horizontal"} ${hit ? "is-hit" : ""}`}
						style={`left:${x}px;top:${y}px;${vertical ? "height" : "width"}:${Math.max(length, 2)}px`}
						tabIndex={focus ? 0 : -1}
						aria-hidden={focus ? undefined : "true"}
						aria-label={focus ? label : undefined}
						title={hit ? label : undefined}
						data-key={focus ? `link:${target.id}` : undefined}
						onclick={selectLink}
					/>
				);
				if (target.x === source.x) {
					const sx = source.x + source.width / 2,
						sy = source.y + source.height;
					const tx = target.x + target.width / 2,
						ty = target.y,
						middle = (sy + ty) / 2;
					parts.push(
						<div
							class={`topo-wire ${dotted ? "is-associated" : "is-learned"} ${selectedId === target.id ? "is-selected" : ""}`}
							data-source={source.id}
							data-target={target.id}
						>
							{segment(true, sx, sy, middle - sy)}
							{segment(false, Math.min(sx, tx), middle, Math.abs(tx - sx))}
							{segment(true, tx, middle, ty - middle, true, true)}
						</div>,
					);
					continue;
				}
				const sx = source.x + source.width,
					sy = source.y + source.height / 2;
				const tx = target.x,
					ty = target.y + target.height / 2;
				const middle = (sx + tx) / 2;
				const wire = (
					<div
						class={`topo-wire ${dashed ? "is-learned" : dotted ? "is-associated" : "is-pon"} ${selectedId === target.id ? "is-selected" : ""}`}
						data-source={source.id}
						data-target={target.id}
						title={object ? relationText(object.client) : _("Logical PON link")}
					/>
				);
				wire.append(
					segment(false, sx, sy, middle - sx),
					segment(true, middle, Math.min(sy, ty), Math.abs(ty - sy)),
					segment(false, middle, ty, tx - middle, true, true),
				);
				parts.push(wire);
			}
			for (const p of data.positions) {
				const node = nodes.get(p.id);
				const object = objects.get(p.id);
				if (!node && !object) continue;
				const tone = node ? nodeTone(node, snapshot) : "neutral";
				const button = (
					<button
						type="button"
						class={`topo-graph-card topo-${tone} ${node?.detail.kind === "controller" ? "is-controller" : object ? "is-client" : "is-onu"} ${selectedId === p.id ? "is-selected" : ""}`}
						style={`left:${p.x}px;top:${p.y}px;width:${p.width}px;height:${p.height}px`}
						data-key={p.id}
						onpointerenter={() => highlight(p.id)}
						onpointerleave={() => highlight(null)}
						onfocus={() => highlight(p.id)}
						onblur={() => highlight(null)}
						aria-pressed={String(selectedId === p.id)}
						aria-label={
							node
								? `${node.label} · ${nodeState(node)}`
								: `${object?.client.hostname ?? object?.client.mac} · ${object ? relationText(object.client) : ""}`
						}
						onclick={() =>
							onSelect(
								node
									? { kind: "node", id: node.id }
									: { kind: "client", parent: object?.parent ?? "", id: p.id },
							)
						}
					>
						{node ? nodeCard(node, snapshot) : object ? clientCard(object.client) : null}
					</button>
				);
				parts.push(button);
				if (node) {
					const state = clients.get(node.id);
					const total = observedCount(state);
					const overflow = Boolean(
						state && (state.clients.length > CLIENT_PREVIEW_LIMIT || state.result?.next_cursor),
					);
					if (total > 0 && overflow) {
						parts.push(
							<button
								type="button"
								class="topo-graph-more"
								style={`left:${p.x}px;top:${p.y + p.height + 4}px;width:${p.width}px`}
								onclick={() => onSelect({ kind: "node", id: node.id })}
							>
								{_("View all observed objects")} · {total}
								{state?.result?.next_cursor ? "+" : ""}
							</button>,
						);
					} else if (state?.error)
						parts.push(
							<div
								class="topo-graph-note"
								style={`left:${p.x}px;top:${p.y + p.height + 4}px;width:${p.width}px`}
							>
								{badge(_("Objects unavailable"), "warning")}
							</div>,
						);
				}
			}
			const syncSelection = () => {
				for (const card of world.querySelectorAll<HTMLElement>(".topo-graph-card")) {
					const current = card.dataset.key === selectedId;
					card.classList.toggle("is-selected", current);
					card.setAttribute("aria-pressed", String(current));
				}
				for (const wire of world.querySelectorAll<HTMLElement>(".topo-wire"))
					wire.classList.toggle("is-selected", wire.dataset.target === selectedId);
			};
			// Ignore the selection-only classes so a click updates classes instead of
			// rebuilding the whole world and dropping hover or text selection.
			const signature = parts
				.map((part) =>
					part.outerHTML
						.replace(/class="([^"]*)"/g, (_, value: string) => {
							return `class="${value
								.replace(/\bis-selected\b/g, "")
								.replace(/\s+/g, " ")
								.trim()}"`;
						})
						.replace(/\saria-pressed="(?:true|false)"/g, ""),
				)
				.join("");
			if (initialized && signature === painted) {
				syncSelection();
				return;
			}
			const focused =
				document.activeElement instanceof HTMLElement && world.contains(document.activeElement)
					? document.activeElement.dataset.key
					: null;
			world.replaceChildren(...parts);
			painted = signature;
			if (focused)
				[...world.querySelectorAll<HTMLElement>("[data-key]")]
					.find((n) => n.dataset.key === focused)
					?.focus({ preventScroll: true });
			// Only refit when the third column appears (the canvas gets wider). Row
			// height changes from refreshed inventories must not move the viewport.
			if (!initialized || (!adjusted && dimensions.width > lastWidth)) fit(false);
			lastWidth = dimensions.width;
			initialized = true;
		},
		fit: () => fit(),
		zoom: (factor) => zoomAt(factor),
		reset: () => zoomAt(1 / position.scale),
		destroy() {
			dead = true;
			observer.disconnect();
			container.removeEventListener("pointerdown", down);
			container.removeEventListener("pointermove", move);
			container.removeEventListener("pointerup", up);
			container.removeEventListener("pointercancel", up);
			container.removeEventListener("lostpointercapture", up);
			container.removeEventListener("wheel", wheel);
			container.removeEventListener("focusin", focus);
			pointers.clear();
			world.remove();
		},
	};
}
