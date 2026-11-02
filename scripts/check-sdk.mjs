import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const frontend = fileURLToPath(new URL("../", import.meta.url));
const backend = process.env.FTTR_BACKEND_DIR || resolve(frontend, "../openwrt-fttr");
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
		"--check",
		"--out-dir",
		resolve(frontend, "src/api/generated"),
	],
	{ stdio: "inherit" },
);
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
