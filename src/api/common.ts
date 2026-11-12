// SPDX-License-Identifier: Apache-2.0

import * as z from "zod/mini";

export { JobChunkSchema as jobChunk, JobPendingSchema as jobStart } from "./generated/schemas";

const errorReply = z.object({
	error: z.union([z.string(), z.object({ code: z.string(), message: z.string() })]),
});

export class RpcError extends Error {
	constructor(
		readonly code: string,
		message: string,
	) {
		super(message);
		this.name = "RpcError";
	}
}

export function checked(value: unknown): unknown {
	const failure = errorReply.safeParse(value);
	if (failure.success) {
		const error = failure.data.error;
		throw typeof error === "string" ? new RpcError("rpc", error) : new RpcError(error.code, error.message);
	}
	return value;
}

export function assertNever(value: never): never {
	throw new RpcError("unexpected_variant", `Unexpected variant: ${String(value)}`);
}
