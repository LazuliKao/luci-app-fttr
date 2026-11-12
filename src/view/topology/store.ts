// SPDX-License-Identifier: Apache-2.0
import type {
	TopologyClient,
	TopologyClientsReply,
	TopologyClientsRequest,
	TopologyNodeReply,
	TopologyNodeRequest,
	TopologyReply,
} from "../../api/generated/types";

export interface TopologyApi {
	getTopology(): Promise<TopologyReply>;
	getTopologyNode(request: TopologyNodeRequest): Promise<TopologyNodeReply>;
	getTopologyClients(request: TopologyClientsRequest): Promise<TopologyClientsReply>;
}
export type ClientResult = Extract<TopologyClientsReply, { status: "ok" }>;
export interface ClientState {
	clients: TopologyClient[];
	loading: boolean;
	error: string | null;
	result: ClientResult | null;
}
export interface DetailState {
	loading: boolean;
	error: string | null;
}
/** Bound per-node client accumulation so repeated "Load more" cannot grow without limit. */
export const MAX_CLIENTS_PER_NODE = 2000;
export function errorText(error: unknown): string {
	return error instanceof Error ? error.message : String(error);
}

export class TopologyStore {
	snapshot: TopologyReply | null;
	clients = new Map<string, ClientState>();
	details = new Map<string, DetailState>();
	error: string | null;
	refreshing = false;
	lastSuccess: Date | null;
	private dead = false;
	private epoch = 0;
	private cycle = 0;
	private pending: Promise<void> | null = null;
	private detailTasks = new Map<string, Promise<void>>();

	constructor(
		private api: TopologyApi,
		private changed: () => void,
		initial: TopologyReply | null = null,
		error: string | null = null,
	) {
		this.snapshot = initial;
		this.error = error;
		this.lastSuccess = initial ? new Date() : null;
	}
	private emit() {
		if (!this.dead) this.changed();
	}
	private current(snapshot: TopologyReply, epoch: number) {
		return !this.dead && this.snapshot === snapshot && this.epoch === epoch;
	}

	/** No overlapping polls; a failed refresh retains the entire successful view. */
	refresh(hydrateOnly = false, focusNodeId?: string | null): Promise<void> {
		if (this.dead) return Promise.resolve();
		if (this.pending) return this.pending;
		this.refreshing = true;
		this.emit();
		this.pending = this.runRefresh(hydrateOnly, focusNodeId).finally(() => {
			this.pending = null;
			this.refreshing = false;
			this.emit();
		});
		return this.pending;
	}
	private async runRefresh(hydrateOnly: boolean, focusNodeId?: string | null) {
		try {
			if (!hydrateOnly || !this.snapshot) {
				const snapshot = await this.api.getTopology();
				if (this.dead) return;
				this.snapshot = snapshot;
				this.epoch++;
				this.clients = new Map();
				this.details = new Map();
				this.detailTasks.clear();
				this.lastSuccess = new Date();
				this.error = null;
				this.emit();
			}
			const snapshot = this.snapshot;
			if (!snapshot) return;
			const epoch = this.epoch;
			// Client inventories are heavier than the overview. Refresh all of them
			// every third poll and only the selected or not-yet-loaded node in between.
			this.cycle++;
			const refreshAll = this.cycle % 3 === 0;
			const ids = snapshot.nodes
				.map((node) => node.id)
				.filter((id) => refreshAll || id === focusNodeId || !this.clients.has(id));
			let index = 0;
			const worker = async () => {
				while (index < ids.length && this.current(snapshot, epoch)) {
					await this.loadClients(ids[index++]);
				}
			};
			await Promise.all(Array.from({ length: Math.min(3, ids.length) }, worker));
		} catch (error) {
			if (!this.dead) this.error = errorText(error);
		}
	}

	async loadClients(nodeId: string, more = false): Promise<void> {
		const snapshot = this.snapshot;
		if (!snapshot || this.dead || !snapshot.nodes.some((n) => n.id === nodeId)) return;
		const previous = this.clients.get(nodeId);
		if (previous?.loading || (more && !previous?.result?.next_cursor)) return;
		if (more && (previous?.clients.length ?? 0) >= MAX_CLIENTS_PER_NODE) return;
		const epoch = this.epoch;
		const state: ClientState = {
			clients: previous?.clients ?? [],
			result: previous?.result ?? null,
			loading: true,
			error: null,
		};
		this.clients.set(nodeId, state);
		this.emit();
		try {
			const reply = await this.api.getTopologyClients({
				node_id: nodeId,
				snapshot_id: snapshot.snapshot_id,
				limit: 100,
				...(more ? { cursor: previous?.result?.next_cursor ?? undefined } : {}),
			});
			if (!this.current(snapshot, epoch)) return;
			if (reply.status === "error") throw new Error(reply.code);
			if (reply.snapshot_id !== snapshot.snapshot_id || reply.parent_node_id !== nodeId)
				throw new Error("snapshot_mismatch");
			if (more) {
				const unique = new Map(
					[...state.clients, ...reply.clients].map((c) => [`${c.id}\u0000${c.interface}`, c]),
				);
				state.clients = [...unique.values()];
			} else state.clients = reply.clients;
			state.result = reply;
		} catch (error) {
			if (this.current(snapshot, epoch)) state.error = errorText(error);
		} finally {
			if (this.current(snapshot, epoch)) {
				state.loading = false;
				this.emit();
			}
		}
	}

	loadNode(nodeId: string): Promise<void> {
		const snapshot = this.snapshot;
		if (!snapshot || this.dead || !snapshot.nodes.some((n) => n.id === nodeId)) return Promise.resolve();
		const key = JSON.stringify([snapshot.snapshot_id, nodeId]);
		const running = this.detailTasks.get(key);
		if (running) return running;
		const epoch = this.epoch;
		const state = { loading: true, error: null as string | null };
		this.details.set(nodeId, state);
		this.emit();
		const task = (async () => {
			try {
				const reply = await this.api.getTopologyNode({ node_id: nodeId, snapshot_id: snapshot.snapshot_id });
				if (!this.current(snapshot, epoch)) return;
				if (reply.status === "error") throw new Error(reply.code);
				if (reply.snapshot_id !== snapshot.snapshot_id || reply.node.id !== nodeId)
					throw new Error("snapshot_mismatch");
				const index = snapshot.nodes.findIndex((n) => n.id === nodeId);
				if (index >= 0) snapshot.nodes[index] = reply.node;
			} catch (error) {
				if (this.current(snapshot, epoch)) state.error = errorText(error);
			} finally {
				this.detailTasks.delete(key);
				if (this.current(snapshot, epoch)) {
					state.loading = false;
					this.emit();
				}
			}
		})();
		this.detailTasks.set(key, task);
		return task;
	}
	destroy() {
		this.dead = true;
		this.epoch++;
		this.detailTasks.clear();
	}
}
