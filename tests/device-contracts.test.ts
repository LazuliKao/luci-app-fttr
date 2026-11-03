import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { readdirSync, readFileSync } from "node:fs";
import test from "node:test";
import { fttrValidators } from "../src/api/client";
import { fttrMethods } from "../src/api/generated/luci-client";

const target = process.env.FTTR_SSH_TARGET;
if (!target || target.startsWith("-")) throw new Error("Set FTTR_SSH_TARGET to the router SSH destination");

function remote(command: string): string {
	return execFileSync("ssh", ["-o", "BatchMode=yes", target as string, command], {
		encoding: "utf8",
		timeout: 30_000,
		maxBuffer: 16 * 1024 * 1024,
	});
}

// Keep live replies in memory: status and calibration can contain device identifiers.
for (const [method, validator] of [
	["get_capabilities", fttrValidators.getCapabilities],
	["optical_status", fttrValidators.opticalStatus],
	["get_status", fttrValidators.getStatus],
	["get_sync", fttrValidators.getSync],
	["config_check", fttrValidators.configCheck],
	["npu_status", fttrValidators.npuStatus],
	["hl202_list", fttrValidators.hl202List],
	["get_calibration", fttrValidators.getCalibration],
] as const) {
	test(`live ${method} satisfies the frontend contract`, () => {
		const reply: unknown = JSON.parse(remote(`ubus call fttr ${method}`));
		try {
			validator.parse(reply);
		} catch (error) {
			const issues = (error as { issues?: Array<{ path: PropertyKey[]; code: string }> }).issues;
			assert.fail(
				issues
					? `${method}: ${issues.map((issue) => `${issue.path.join(".")} (${issue.code})`).join(", ")}`
					: `${method}: frontend rejected the live reply`,
			);
		}
	});
}

test("live native methods match the generated SDK for enabled features", () => {
	const capabilities = fttrValidators.getCapabilities.parse(JSON.parse(remote("ubus call fttr get_capabilities")));
	const expected = fttrMethods
		.filter((method) => method.feature === null || capabilities.features[method.feature])
		.map((method) => method.method)
		.sort();
	const actual = Array.from(
		remote("ubus -v list fttr").matchAll(/"([a-z0-9_]+)":\s*\{/g),
		(match) => match[1],
	).sort();
	assert.deepEqual(actual, expected);
});

test("installed LuCI ACL matches the generated ACL", () => {
	const local = JSON.parse(
		readFileSync(
			new URL("../package/luci-app-fttr/root/usr/share/rpcd/acl.d/luci-app-fttr.json", import.meta.url),
			"utf8",
		),
	);
	const installed = JSON.parse(remote("cat /usr/share/rpcd/acl.d/luci-app-fttr.json"));
	assert.deepEqual(installed, local);
});

test("installed LuCI pages match the current frontend build", () => {
	const directory = new URL("../package/luci-app-fttr/htdocs/luci-static/resources/view/fttr/", import.meta.url);
	const files = readdirSync(directory)
		.filter((file) => file.endsWith(".js"))
		.sort();
	assert.ok(files.length > 0);
	const installed = new Map(
		remote("sha256sum /www/luci-static/resources/view/fttr/*.js")
			.trim()
			.split("\n")
			.map((line) => {
				const [hash, path] = line.trim().split(/\s+/);
				return [path.split("/").pop(), hash];
			}),
	);
	for (const file of files) {
		const hash = createHash("sha256")
			.update(readFileSync(new URL(file, directory)))
			.digest("hex");
		assert.equal(installed.get(file), hash, `${file}: installed frontend differs from the current build`);
	}
});
