// SPDX-License-Identifier: Apache-2.0

type StateContainer = Element & {
	scrollTop: number;
	contains(other: Node | null): boolean;
	querySelectorAll<E extends Element = Element>(selectors: string): NodeListOf<E>;
};

const DETAILS = "details";

/** Stable key for an expandable block; falls back to its position in the tree. */
const detailKey = (container: Element, node: Element): string =>
	node.getAttribute("data-state-key") ??
	node.getAttribute("data-device") ??
	node.querySelector("summary")?.textContent ??
	pathOf(container, node)?.join(".") ??
	"";

/** Sequence of child indexes from `container` down to `node`. */
function pathOf(container: Element, node: Element): number[] | null {
	const path: number[] = [];
	let current: Element | null = node;
	while (current && current !== container) {
		const parent: Element | null = current.parentElement;
		if (!parent) return null;
		const index = Array.prototype.indexOf.call(parent.children, current) as number;
		if (index < 0) return null;
		path.unshift(index);
		current = parent;
	}
	return current === container ? path : null;
}

function atPath(container: Element, path: number[]): Element | null {
	let node: Element | null = container;
	for (const index of path) {
		node = node?.children[index] ?? null;
		if (!node) return null;
	}
	return node;
}

/**
 * Snapshot a container's interaction state and return a restore callback.
 * LuCI views rebuild whole panels on each poll; restoring these details keeps
 * expanded <details>, keyboard focus and scroll position stable. This is the
 * same capture/restore pattern topology.tsx's renderPanel() already uses.
 */
export function capturePanelState(container: StateContainer): () => void {
	const open = new Set<string>();
	for (const details of container.querySelectorAll(DETAILS))
		if ((details as HTMLDetailsElement).open) {
			const key = detailKey(container, details);
			if (key) open.add(key);
		}

	const active = typeof document !== "undefined" ? document.activeElement : null;
	const focusPath = active && container.contains(active) ? pathOf(container, active) : null;
	const scroll = container.scrollTop;
	const pageScroll = typeof window !== "undefined" ? window.scrollY : 0;

	return () => {
		for (const details of container.querySelectorAll<HTMLDetailsElement>(DETAILS))
			if (open.has(detailKey(container, details))) details.open = true;
		container.scrollTop = scroll;
		if (focusPath) {
			const target = atPath(container, focusPath);
			if (target && typeof (target as HTMLElement).focus === "function")
				(target as HTMLElement).focus({ preventScroll: true });
		}
		if (typeof window !== "undefined" && typeof window.scrollTo === "function" && window.scrollY !== pageScroll)
			window.scrollTo(0, pageScroll);
	};
}
