import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { createFttrClient, fttrMethods } from "../src/api/generated/luci-client";
import { capabilities, opticalReply } from "../src/api/validators";
import { checked } from "../src/view/contracts/common";

const optical = {
	schema_version: 1,
	status: "error",
	action: "optical_off",
	desired_enabled: false,
	tx_enabled: null,
	actor_state: "unknown",
	hardware_ready: false,
	discovery_active: false,
	cleanup_pending: false,
	error: { code: "NotConnected", message: "hardware initialization incomplete" },
};

function setup(response: unknown, failure?: Error) {
	const declarations: Array<{ object: string; method: string; params?: string[]; reject: boolean }> = [];
	const calls: Array<{ method: string; args: unknown[] }> = [];
	const rpc = {
		declare(options: (typeof declarations)[number]) {
			declarations.push(options);
			return async (...args: unknown[]) => {
				calls.push({ method: options.method, args });
				if (failure) throw failure;
				return response;
			};
		},
	} as unknown as typeof L.rpc;
	return {
		client: createFttrClient(rpc, {
			getCapabilities: { parse: (value: unknown) => capabilities.parse(checked(value)) },
			opticalStatus: opticalReply,
			opticalSet: opticalReply,
		}),
		declarations,
		calls,
	};
}

test("SDK declares native methods and maps false to the enabled positional parameter", async () => {
	const { client, declarations, calls } = setup(optical);
	assert.ok(declarations.every((item) => item.object === "fttr" && item.reject));
	assert.deepEqual(declarations.find((item) => item.method === "optical_set")?.params, ["enabled"]);
	assert.equal((await client.opticalSet({ enabled: false })).status, "error");
	assert.deepEqual(calls, [{ method: "optical_set", args: [false] }]);
	assert.equal(fttrMethods.find((item) => item.method === "optical_set")?.access, "write");
});

test("optical business errors remain structured, null is accepted, malformed replies fail", async () => {
	assert.deepEqual(await setup(optical).client.opticalStatus(), optical);
	await assert.rejects(setup({ ...optical, tx_enabled: "false" }).client.opticalStatus());
	await assert.rejects(setup({ ...optical, schema_version: 2 }).client.opticalStatus());
});

test("transport rejection is propagated once without retrying a write", async () => {
	const error = new Error("transport unavailable");
	const { client, calls } = setup(undefined, error);
	await assert.rejects(client.opticalSet({ enabled: true }), (actual) => actual === error);
	assert.equal(calls.length, 1);
});

test("capabilities retain checked RPC error handling", async () => {
	await assert.rejects(
		setup({ error: { code: "unavailable", message: "not ready" } }).client.getCapabilities(),
		/not ready/,
	);
});

test("capability helpers import without a LuCI global", async () => {
	assert.equal("L" in globalThis, false);
	const helpers = await import("../src/view/contracts/capabilities");
	assert.deepEqual(helpers.adaptersFromCapabilities(), []);
});

test("all generated methods have matching native rpcd ACL access", () => {
	const acl = JSON.parse(
		readFileSync(
			new URL("../package/luci-app-fttr/root/usr/share/rpcd/acl.d/luci-app-fttr.json", import.meta.url),
			"utf8",
		),
	)["luci-app-fttr"];
	for (const method of fttrMethods) {
		assert.ok(acl[method.access].ubus.fttr.includes(method.method), `${method.access}: fttr.${method.method}`);
	}
});
