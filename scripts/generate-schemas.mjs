import { readFileSync, writeFileSync } from "node:fs";
import { renderSchemas } from "./schema-codegen.mjs";

const args = process.argv.slice(2);
if (args.length !== 1 || !["--generate", "--check"].includes(args[0])) {
	throw new Error("Usage: node scripts/generate-schemas.mjs --generate|--check");
}
const output = new URL("../src/api/generated/schemas.ts", import.meta.url);
const source = renderSchemas(readFileSync(new URL("../src/api/generated/types.ts", import.meta.url), "utf8"));
let current;
try {
	current = readFileSync(output, "utf8");
} catch (error) {
	if (error.code !== "ENOENT") throw error;
}
if (current !== source) {
	if (args[0] === "--check") throw new Error("SDK schema drift: run pnpm sdk:generate");
	writeFileSync(output, source);
}
console.log(`SDK schemas ${args[0] === "--check" ? "checked" : "generated"}`);
