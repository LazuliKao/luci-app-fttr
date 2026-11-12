// SPDX-License-Identifier: Apache-2.0

/** True when the tab is backgrounded. Safe in environments without a DOM (unit tests). */
export function isPageHidden(): boolean {
	return typeof document !== "undefined" && document.hidden;
}

/**
 * Register a `pagehide` callback and return a disposer. Job polling uses this to
 * stop when the view is unloaded even if the URL path has not changed. Returns a
 * no-op disposer when the environment lacks event APIs.
 */
export function onPageLeave(callback: () => void): () => void {
	if (typeof window === "undefined" || typeof window.addEventListener !== "function") return () => {};
	window.addEventListener("pagehide", callback, { once: true });
	return () => window.removeEventListener("pagehide", callback);
}
