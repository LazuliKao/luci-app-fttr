import * as z from "zod/mini";

const errorReply = z.object({ error: z.union([z.string(), z.object({ code: z.string(), message: z.string() })]) });

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

export const jobStart = z.object({ status: z.literal("pending"), job: z.string() });
export const jobChunk = z.discriminatedUnion("status", [
	z.object({ status: z.literal("pending") }),
	z.object({
		status: z.literal("ready"),
		chunk: z.number(),
		chunks: z.number(),
		bytes: z.number(),
		data: z.string(),
	}),
]);

export function assertNever(value: never): never {
	throw new RpcError("unexpected_variant", `Unexpected variant: ${String(value)}`);
}
