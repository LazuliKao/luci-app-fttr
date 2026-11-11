// SPDX-License-Identifier: Apache-2.0

import { getFttrClient } from "../../api/client";
import type { Capabilities } from "../../api/generated/types";
import { getPlatformInfo, type PlatformInfoReply } from "./api";

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

export async function requirePlatformOperation(
	operation: keyof PlatformInfoReply["operations"],
): Promise<PlatformInfoReply> {
	const platform = await getPlatformInfo();
	if (!platform.operations[operation]) {
		throw new Error(_("This operation is not supported by the selected platform."));
	}
	return platform;
}

export async function requireCalibrationProfile(
	profile: NonNullable<PlatformInfoReply["operations"]["calibration_profile"]>,
): Promise<PlatformInfoReply> {
	const platform = await getPlatformInfo();
	if (platform.operations.calibration_profile !== profile) {
		throw new Error(_("This calibration profile is not supported by the selected platform."));
	}
	return platform;
}
