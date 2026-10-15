export type JsonObject = { readonly [key: string]: unknown };
export interface Target {
	readonly optical_sn: string;
	readonly onu_id: number;
	readonly binding_generation: string;
}
export interface SourceTarget {
	readonly mqtt_mac: string;
	readonly binding_generation: string;
}

export function object(value: unknown): JsonObject {
	if (!isObject(value)) throw new Error(_("Invalid response"));
	return value;
}

function isObject(value: unknown): value is JsonObject {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function check(value: unknown): JsonObject {
	const result = object(value);
	if (result.error) {
		if (typeof result.error === "string") throw new Error(result.error);
		const error = object(result.error);
		throw new Error(typeof error.message === "string" ? error.message : _("Request failed"));
	}
	return result;
}

export const list = L.rpc.declare<unknown>({ object: "luci.fttr", method: "hl202_list", reject: true });
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

async function wait(start: unknown): Promise<JsonObject> {
	const initial = check(start);
	if (typeof initial.job !== "string") throw new Error(_("Missing job identifier"));
	const deadline = Date.now() + 330000;
	const path = window.location.pathname;
	const parts: Uint8Array[] = [];
	let totalBytes = 0;
	for (let chunk = 0; chunk < 128; ) {
		if (window.location.pathname !== path)
			throw new Error(_("Result polling stopped after leaving the page. The backend job is not cancelled."));
		if (Date.now() > deadline)
			throw new Error(_("Job polling timed out; execution outcome is unknown. Do not automatically retry."));
		const response = check(await result(initial.job, chunk));
		if (response.status === "pending") {
			await new Promise<void>((resolve) => window.setTimeout(resolve, 1000));
			continue;
		}
		if (response.status !== "ready" || typeof response.data !== "string" || typeof response.chunks !== "number")
			throw new Error(_("Invalid job result"));
		if (response.chunks < 1 || response.chunks > 128 || response.data.length > 43692)
			throw new Error(_("Job result exceeds the transport limit"));
		const part = Uint8Array.from(atob(response.data), (character) => character.charCodeAt(0));
		if (part.length > 32768 || totalBytes + part.length > 4194304)
			throw new Error(_("Job result exceeds the transport limit"));
		parts.push(part);
		totalBytes += part.length;
		chunk++;
		if (chunk === response.chunks) {
			const bytes = new Uint8Array(totalBytes);
			let offset = 0;
			for (const part of parts) {
				bytes.set(part, offset);
				offset += part.length;
			}
			return check(JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)));
		}
	}
	throw new Error(_("Too many result chunks"));
}

export const readReport = async (target: Target | SourceTarget): Promise<JsonObject> => wait(await report(target));
export const readAccounts = async (target: Target): Promise<JsonObject> => wait(await accounts(target));
export const setAccount = async (
	target: Target,
	change: {
		readonly entry: number;
		readonly kind: "password" | "active";
		readonly password: string;
		readonly active: boolean;
	},
): Promise<JsonObject> =>
	wait(await update(target, `account_set_${change.kind}`, change.entry, change.password, change.active));
export const execute = async (target: Target, script: string, timeout: number): Promise<JsonObject> =>
	wait(await exec(target, script, timeout));
