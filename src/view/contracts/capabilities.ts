// SPDX-License-Identifier: Apache-2.0

import { getFttrClient } from "../../api/client";
import type { Capabilities } from "../../api/generated/types";

export type { Capabilities } from "../../api/generated/types";

export function adaptersFromCapabilities(
	capabilities?: Capabilities,
	layer: keyof Capabilities["adapters"] = "omci",
): Array<[string, string]> {
	return (capabilities?.adapters[layer] ?? []).map((item) => [
		item.id,
		item.id === "generic" ? _("Generic G.988 Bridge") : item.name,
	]);
}

export const getCapabilities = async (): Promise<Capabilities> => getFttrClient().getCapabilities();

// Check before loading UCI, issuing feature RPCs or starting page polling.
// Missing/old capability endpoints remain an error, never inferred as full support.
export async function requirePage(page: keyof Capabilities["pages"]): Promise<void> {
	const support = await getCapabilities();
	if (!support.pages[page]) throw new Error(_("This page is not supported by the installed FTTR build."));
}
