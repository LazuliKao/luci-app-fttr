import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import { renderSchemas } from "../scripts/schema-codegen.mjs";

test("schema generation is ordered by dependencies, deterministic and matches committed output", () => {
	const types = readFileSync(new URL("../src/api/generated/types.ts", import.meta.url), "utf8");
	const expected = readFileSync(new URL("../src/api/generated/schemas.ts", import.meta.url), "utf8");
	assert.equal(renderSchemas(types), expected);
	assert.equal(renderSchemas(types.split("\n").reverse().join("\n")), expected);
	const schema = renderSchemas(
		'export type A = { next?: B, values: { [key in string]: number } }; export type B = "pending" | null;',
	);
	assert.ok(schema.indexOf("export const BSchema") < schema.indexOf("export const ASchema"));
	assert.match(schema, /"next": z.optional\(BSchema\)/);
	assert.match(schema, /z.record\(z.string\(\), z.number\(\)\)/);
	assert.match(schema, /z.union\(\[z.literal\("pending"\), z.null\(\)\]\)/);
});

test("unsupported syntax and broken references fail closed rather than accepting unchecked data", () => {
	for (const source of [
		"export type A = any;",
		"export type A = bigint;",
		"export interface A {}",
		"export type A = Missing;",
		"export type A = A;",
		"export type A = B; export type B = A;",
		"export type A<T> = T;",
		"export type A = string & number;",
		"export type A = { [key in string]?: boolean };",
		"export type A = { readonly value: string };",
		"export type A = string; export type A = number;",
		"export type A = {",
	]) {
		assert.throws(() => renderSchemas(source), undefined, source);
	}
});
