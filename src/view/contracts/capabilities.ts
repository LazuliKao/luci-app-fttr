// SPDX-License-Identifier: Apache-2.0

import * as z from "zod/mini";
import { checked } from "./common";

const adapterCapability = z.object({
	id: z.string(),
	name: z.string(),
});

const capabilities = z.object({
	schema_version: z.literal(1),
	version: z.string(),
	features: z.record(z.string(), z.boolean()),
	functions: z.object({
		optical: z.boolean(),
		omci_mib: z.boolean(),
		mqtt_telemetry: z.boolean(),
		hl202_management: z.boolean(),
		cwmp: z.boolean(),
	}),
	pages: z.object({
		status: z.boolean(),
		config: z.boolean(),
		sync: z.boolean(),
		hl202: z.boolean(),
		hardware: z.boolean(),
		calibration: z.boolean(),
		about: z.boolean(),
	}),
	adapters: z.optional(z.array(adapterCapability)),
});

export type Capabilities = z.infer<typeof capabilities>;

export function adaptersFromCapabilities(capabilities?: Capabilities): Array<[string, string]> {
	if (capabilities?.adapters && capabilities.adapters.length > 0) {
		return capabilities.adapters.map((item) => [
			item.id,
			item.id === "generic" ? _("Generic G.988 Bridge") : item.name,
		]);
	}
	const list: Array<[string, string]> = [];
	if (capabilities?.features?.["device-hl202"] !== false) list.push(["hl202", "H3C HL202"]);
	if (capabilities?.features?.["device-hwtc"] !== false) list.push(["hwtc", "Huawei HWTC"]);
	if (capabilities?.features?.["device-star"] !== false) list.push(["star", "STAR SG631"]);
	list.push(["generic", _("Generic G.988 Bridge")]);
	return list;
}

let rawCapabilitiesRpc: (() => Promise<unknown>) | undefined;
function getRawCapabilities(): Promise<unknown> {
	if (!rawCapabilitiesRpc) {
		rawCapabilitiesRpc = L.rpc.declare<unknown>({
			object: "luci.fttr",
			method: "get_capabilities",
			reject: true,
		});
	}
	return rawCapabilitiesRpc();
}

export const getCapabilities = async (): Promise<Capabilities> =>
	capabilities.parse(checked(await getRawCapabilities()));

// Check before loading UCI, issuing feature RPCs or starting page polling.
// Missing/old capability endpoints remain an error, never inferred as full support.
export async function requirePage(page: keyof Capabilities["pages"]): Promise<void> {
	const support = await getCapabilities();
	if (!support.pages[page]) throw new Error(_("This page is not supported by the installed FTTR build."));
}
