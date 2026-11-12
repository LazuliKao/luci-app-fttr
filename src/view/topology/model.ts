// SPDX-License-Identifier: Apache-2.0
// UI-only derivations. Backend IDs, relations and binding states are authoritative.
import type { TopologyClient, TopologyLink, TopologyNode, TopologyReply } from "../../api/generated/types";

export const CONTROLLER_ID = "controller";
export type Selection = { kind: "node"; id: string } | { kind: "client"; parent: string; id: string };

export function clientKey(parent: string, client: TopologyClient): string {
	return JSON.stringify(["client", parent, client.id, client.interface]);
}

export function counts(snapshot: TopologyReply) {
	const onus = snapshot.nodes.filter((n) => n.detail.kind === "onu");
	return {
		known: onus.length,
		registered: onus.filter((n) => n.detail.kind === "onu" && n.detail.registration === "o5_operation").length,
		boundOnly: onus.filter((n) => n.detail.kind === "onu" && n.detail.registration === null).length,
	};
}

export function linkFor(snapshot: TopologyReply, nodeId: string): TopologyLink | undefined {
	return snapshot.links.find((link) => link.target === nodeId && link.relation === "pon_logical");
}

export function nodeAddresses(node: TopologyNode): string[] {
	if (node.detail.kind === "controller") return [...new Set(node.detail.interfaces.flatMap((i) => i.addresses))];
	const hl = node.detail.extensions.hl202;
	return [...new Set([hl?.bridge_ip, hl?.ip].filter((ip): ip is string => Boolean(ip)))];
}

export interface AddressSummary {
	primary: string | null;
	others: string[];
}
function usableAddress(address: string): boolean {
	return !/^fe80:/i.test(address) && !/^169\.254\./i.test(address) && address !== "::1";
}
/** Uplink and IPv4 addresses first; link-local values stay in the interface detail. */
export function addressSummary(node: TopologyNode): AddressSummary {
	const preferred =
		node.detail.kind === "controller" ? node.detail.uplinks.flatMap((uplink) => uplink.addresses) : [];
	const ordered = [...new Set([...preferred, ...nodeAddresses(node)])];
	const primary =
		ordered.find((address) => /^\d+\.\d+\.\d+\.\d+$/.test(address)) ?? ordered.find(usableAddress) ?? null;
	return { primary, others: ordered.filter((address) => address !== primary) };
}

export interface Placement {
	id: string;
	x: number;
	y: number;
	width: number;
	height: number;
	parent: string | null;
}
export interface ClientGroup {
	clients: TopologyClient[];
}
export const CLIENT_PREVIEW_LIMIT = 2;
export const NODE_HEIGHT = 150;
export const CLIENT_HEIGHT = 72;
const CLIENT_STEP = 80;
const ROW_GAP = 22;

/** Three explicit columns; no invented splitter or inferred physical port. */
export function layout(snapshot: TopologyReply, clients: ReadonlyMap<string, ClientGroup>) {
	const positions: Placement[] = [];
	const controller = snapshot.nodes.find((n) => n.detail.kind === "controller");
	const onus = snapshot.nodes
		.filter((n) => n.detail.kind === "onu")
		.sort((a, b) => {
			const aId = a.detail.kind === "onu" ? a.detail.onu_id : null;
			const bId = b.detail.kind === "onu" ? b.detail.onu_id : null;
			return (aId ?? 256) - (bId ?? 256) || a.id.localeCompare(b.id);
		});
	let top = 56;
	for (const node of onus) {
		const children = clients.get(node.id)?.clients.slice(0, CLIENT_PREVIEW_LIMIT) ?? [];
		const childHeight = children.length ? (children.length - 1) * CLIENT_STEP + CLIENT_HEIGHT : 0;
		const height = Math.max(NODE_HEIGHT, childHeight);
		positions.push({
			id: node.id,
			x: 454,
			y: top + (height - NODE_HEIGHT) / 2,
			width: 306,
			height: NODE_HEIGHT,
			parent: linkFor(snapshot, node.id)?.source ?? null,
		});
		children.forEach((client, index) => {
			positions.push({
				id: clientKey(node.id, client),
				x: 858,
				y: top + (height - childHeight) / 2 + index * CLIENT_STEP,
				width: 254,
				height: CLIENT_HEIGHT,
				parent: node.id,
			});
		});
		top += height + ROW_GAP;
	}
	const localClients = controller ? (clients.get(controller.id)?.clients.slice(0, CLIENT_PREVIEW_LIMIT) ?? []) : [];
	const controllerY = Math.max(56, (top - 220) / 2);
	if (controller) {
		positions.unshift({ id: controller.id, x: 28, y: controllerY, width: 322, height: 198, parent: null });
		// Local AP associations are siblings of ONUs, not clients of an arbitrary ONU.
		localClients.forEach((client, index) => {
			positions.push({
				id: clientKey(controller.id, client),
				x: 28,
				y: controllerY + 242 + index * 88,
				width: 322,
				height: 76,
				parent: controller.id,
			});
		});
	}
	return {
		positions,
		width: Math.max(800, ...positions.map((p) => p.x + p.width + 36)),
		height: Math.max(430, ...positions.map((p) => p.y + p.height + 56)),
	};
}

/** Evidence ages are referenced to fttr.status, not the later aggregation time. */
export function measurementAge(
	snapshot: TopologyReply,
	age: number | null | undefined,
	now = Date.now() / 1000,
): number | null {
	if (age == null) return null;
	const sampled = snapshot.sources.find((s) => s.id === "fttr.status")?.sampled_at ?? snapshot.generated_at;
	return age + Math.max(0, now - sampled);
}
