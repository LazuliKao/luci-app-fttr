import assert from "node:assert/strict";
import { test } from "node:test";
import { withTimeout } from "../src/view/timeout";

test("RPC timeout rejects and cleans up a late result", async () => {
	let finish!: (value: string) => void;
	let released = "";
	const rpc = new Promise<string>((resolve) => {
		finish = resolve;
	});
	await assert.rejects(
		withTimeout(rpc, 5, "timed out", (value) => {
			released = value;
		}),
		/timed out/,
	);
	finish("job-id");
	await new Promise((resolve) => setTimeout(resolve, 0));
	assert.equal(released, "job-id");
});

test("RPC completion and failures propagate before timeout", async () => {
	assert.equal(await withTimeout(Promise.resolve(42), 100, "timed out"), 42);
	await assert.rejects(withTimeout(Promise.reject(new Error("offline")), 100, "timed out"), /offline/);
});
