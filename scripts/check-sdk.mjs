import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const frontend = fileURLToPath(new URL("../", import.meta.url));
const backend = process.env.FTTR_BACKEND_DIR || resolve(frontend, "../openwrt-fttr");
const args = process.argv.slice(2);
if (args.some((arg) => arg !== "--generate") || args.length > 1) {
	throw new Error("Usage: node scripts/check-sdk.mjs [--generate]");
}
const mode = args.includes("--generate") ? "--generate" : "--check";
const result = spawnSync(
	"cargo",
	[
		"run",
		"--locked",
		"--manifest-path",
		resolve(backend, "h3c-fttr-tools/src/crates/fttr-api/Cargo.toml"),
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
const schemas = spawnSync(process.execPath, [resolve(frontend, "scripts/generate-schemas.mjs"), mode], {
	stdio: "inherit",
});
process.exit(schemas.status ?? 1);
