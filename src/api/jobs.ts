import { checked, jobStart, RpcError } from "../view/contracts/common";
import { isPageHidden, onPageLeave } from "../view/contracts/visibility";
import { getFttrClient } from "./client";

// Polling never replays the operation. Leaving a page only releases its result.
export async function waitForJob(start: unknown, parseResult: (value: unknown) => unknown = checked): Promise<unknown> {
	const initial = jobStart.parse(checked(start));
	let deadline = Date.now() + 330000;
	const path = window.location.pathname;
	let left = false;
	const removePageLeave = onPageLeave(() => {
		left = true;
	});
	const parts: Uint8Array[] = [];
	let totalBytes = 0;
	let expected: { chunks: number; bytes: number } | undefined;
	try {
		for (let chunk = 0; chunk < 128; ) {
			// Pause result polling while the tab is hidden; the deadline counts only
			// foreground time so a backgrounded job is not reported as timed out.
			if (isPageHidden()) {
				const hiddenAt = Date.now();
				while (isPageHidden() && !left) await new Promise<void>((resolve) => window.setTimeout(resolve, 1000));
				deadline += Date.now() - hiddenAt;
			}
			if (left || window.location.pathname !== path)
				throw new RpcError(
					"navigation",
					_("Result polling stopped after leaving the page. The backend job is not cancelled."),
				);
			if (Date.now() > deadline)
				throw new RpcError(
					"timeout",
					_("Job polling timed out; execution outcome is unknown. Do not automatically retry."),
				);
			const response = await getFttrClient().jobResult({ job: initial.job, chunk });
			if (response.status === "pending") {
				await new Promise<void>((resolve) => window.setTimeout(resolve, 1000));
				continue;
			}
			if (
				!Number.isInteger(response.chunks) ||
				response.chunks < 1 ||
				response.chunks > 128 ||
				response.chunk !== chunk ||
				!Number.isInteger(response.bytes) ||
				response.bytes < 1 ||
				response.bytes > 4194304 ||
				response.data.length > 43692
			)
				throw new RpcError("transport", _("Invalid job result"));
			if (expected && (response.chunks !== expected.chunks || response.bytes !== expected.bytes))
				throw new RpcError("transport", _("Inconsistent job result chunks"));
			expected = { chunks: response.chunks, bytes: response.bytes };
			const part = Uint8Array.from(atob(response.data), (character) => character.charCodeAt(0));
			if (part.length > 32768 || totalBytes + part.length > response.bytes)
				throw new RpcError("transport", _("Job result exceeds the transport limit"));
			parts.push(part);
			totalBytes += part.length;
			chunk++;
			if (chunk === response.chunks) {
				if (totalBytes !== response.bytes) throw new RpcError("transport", _("Incomplete job result"));
				const bytes = new Uint8Array(totalBytes);
				let offset = 0;
				for (const part of parts) {
					bytes.set(part, offset);
					offset += part.length;
				}
				return parseResult(JSON.parse(new TextDecoder("utf-8", { fatal: true }).decode(bytes)));
			}
		}
		throw new RpcError("transport", _("Too many result chunks"));
	} finally {
		removePageLeave();
		await getFttrClient()
			.jobRelease({ job: initial.job })
			.catch(() => {});
	}
}
