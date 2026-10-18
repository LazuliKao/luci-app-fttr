import { checked, jobChunk, jobStart, RpcError } from "../contracts/common";
import { accountReply, deviceList, execReply, reportReply, type SourceTarget, type Target } from "../contracts/hl202";

export type { SourceTarget, Target } from "../contracts/hl202";

const rawList = L.rpc.declare<unknown>({ object: "luci.fttr", method: "hl202_list", reject: true });
const result = L.rpc.declare<unknown, [string, number]>({
	object: "luci.fttr",
	method: "hl202_job_result",
	params: ["job", "chunk"],
	reject: true,
});
const report = L.rpc.declare<unknown, [Target | SourceTarget]>({
	object: "luci.fttr",
	method: "hl202_report",
	params: ["target"],
	reject: true,
});
const accounts = L.rpc.declare<unknown, [Target]>({
	object: "luci.fttr",
	method: "hl202_accounts_start",
	params: ["target"],
	reject: true,
});
const update = L.rpc.declare<unknown, [Target, string, number, string, boolean]>({
	object: "luci.fttr",
	method: "hl202_account_update",
	params: ["target", "kind", "entry", "password", "active"],
	reject: true,
});
const exec = L.rpc.declare<unknown, [Target, string, number]>({
	object: "luci.fttr",
	method: "hl202_exec_start",
	params: ["target", "script", "timeout_seconds"],
	reject: true,
});

async function wait(start: unknown): Promise<unknown> {
	const initial = jobStart.parse(checked(start));
	const deadline = Date.now() + 330000;
	const path = window.location.pathname;
	const parts: Uint8Array[] = [];
	let totalBytes = 0;
	let expected: { chunks: number; bytes: number } | null = null;
	for (let chunk = 0; chunk < 128; ) {
		if (window.location.pathname !== path)
			throw new RpcError(
				"navigation",
				_("Result polling stopped after leaving the page. The backend job is not cancelled."),
			);
		if (Date.now() > deadline)
			throw new RpcError(
				"timeout",
				_("Job polling timed out; execution outcome is unknown. Do not automatically retry."),
			);
		const response = jobChunk.parse(checked(await result(initial.job, chunk)));
		switch (response.status) {
			case "pending":
				await new Promise<void>((resolve) => window.setTimeout(resolve, 1000));
				continue;
			case "ready": {
				if (
					!Number.isInteger(response.chunks) ||
					response.chunks < 1 ||
					response.chunks > 128 ||
					response.chunk !== chunk ||
					!Number.isInteger(response.bytes) ||
					response.bytes < 1 ||
					response.bytes > 4194304 ||
					response.data.length > 43692
				)
					throw new RpcError("transport", _("Invalid job result"));
				if (expected && (response.chunks !== expected.chunks || response.bytes !== expected.bytes))
					throw new RpcError("transport", _("Inconsistent job result chunks"));
				expected = { chunks: response.chunks, bytes: response.bytes };
				const part = Uint8Array.from(atob(response.data), (character) => character.charCodeAt(0));
				if (part.length > 32768 || totalBytes + part.length > response.bytes)
					throw new RpcError("transport", _("Job result exceeds the transport limit"));
				parts.push(part);
				totalBytes += part.length;
				chunk++;
				if (chunk === response.chunks) {
					if (totalBytes !== response.bytes) throw new RpcError("transport", _("Incomplete job result"));
					const bytes = new Uint8Array(totalBytes);
					let offset = 0;
					for (const part of parts) {
						bytes.set(part, offset);
						offset += part.length;
					}
					return checked(JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)));
				}
			}
		}
	}
	throw new RpcError("transport", _("Too many result chunks"));
}

export const list = async () => deviceList.parse(checked(await rawList()));
export const readReport = async (target: Target | SourceTarget) => reportReply.parse(await wait(await report(target)));
export const readAccounts = async (target: Target) => accountReply.parse(await wait(await accounts(target)));
export const setAccount = async (
	target: Target,
	change: {
		readonly entry: number;
		readonly kind: "password" | "active";
		readonly password: string;
		readonly active: boolean;
	},
) =>
	accountReply.parse(
		await wait(await update(target, `account_set_${change.kind}`, change.entry, change.password, change.active)),
	);
export const execute = async (target: Target, script: string, timeout: number) =>
	execReply.parse(await wait(await exec(target, script, timeout)));
