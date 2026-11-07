import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";
import ts from "typescript";
import { renderSchemas } from "../scripts/schema-codegen.mjs";

test("schema generation is ordered by dependencies, deterministic and matches committed output", () => {
	const types = readFileSync(new URL("../src/api/generated/types.ts", import.meta.url), "utf8");
	const expected = readFileSync(new URL("../src/api/generated/schemas.ts", import.meta.url), "utf8");
	assert.equal(renderSchemas(types), expected);
	const parsed = ts.createSourceFile("types.ts", types, ts.ScriptTarget.Latest, true);
	assert.equal(renderSchemas([...parsed.statements].reverse().map((node) => node.getText(parsed)).join("\n")), expected);
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

test("internally tagged object intersections preserve both tag and payload validation", () => {
	const schema = renderSchemas('export type Payload = { value: number | null }; export type Node = { kind: "onu" } & Payload;');
	assert.match(schema, /z.intersection\(z.object\(\{ "kind": z.literal\("onu"\) \}\), PayloadSchema\)/);
	assert.ok(schema.indexOf("export const PayloadSchema") < schema.indexOf("export const NodeSchema"));
	assert.throws(() => renderSchemas('export type A = { kind: "onu" } & Missing;'));
	assert.throws(() => renderSchemas('export type A = { kind: "onu" } & A;'));
});
