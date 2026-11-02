// SPDX-License-Identifier: Apache-2.0

import type * as z from "zod/mini";
import { getFttrClient } from "../../api/client";
import type { capabilities } from "../../api/validators";

export type Capabilities = z.infer<typeof capabilities>;

export function adaptersFromCapabilities(capabilities?: Capabilities): Array<[string, string]> {
	return (capabilities?.adapters ?? []).map((item) => [
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
