import { spawnSync } from "node:child_process";
import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const frontend = fileURLToPath(new URL("../", import.meta.url));
const backend = process.env.FTTR_BACKEND_DIR || resolve(frontend, "../openwrt-fttr");
const args = process.argv.slice(2);
if (args.some((arg) => arg !== "--generate") || args.length > 1) {
	throw new Error("Usage: node scripts/check-sdk.mjs [--generate]");
}
const mode = args.includes("--generate") ? "--generate" : "--check";
const cargoManifest = resolve(backend, "fttr/src/crates/fttr-api/Cargo.toml");

if (existsSync(cargoManifest)) {
	const result = spawnSync(
		"cargo",
		[
			"run",
			"--locked",
			"--manifest-path",
			cargoManifest,
			"--features",
			"codegen",
			"--bin",
			"fttr-sdk",
			"--",
			mode,
			"--out-dir",
			resolve(frontend, "src/api/generated"),
		],
		{ stdio: "inherit" },
	);
	if (result.error) console.error(result.error.message);
	if (result.status !== 0) process.exit(result.status ?? 1);
} else {
	if (mode === "--generate") {
		throw new Error(
			`Cannot generate SDK: backend manifest not found at ${cargoManifest}. Set FTTR_BACKEND_DIR to point to openwrt-fttr.`,
		);
	}
	console.warn(
		`Backend manifest not found at ${cargoManifest}; skipping backend Rust SDK codegen check.`,
	);
}

const schemas = spawnSync(process.execPath, [resolve(frontend, "scripts/generate-schemas.mjs"), mode], {
	stdio: "inherit",
});
process.exit(schemas.status ?? 1);
