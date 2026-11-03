import * as z from "zod/mini";
import type { BusinessStatus, SubGatewayStatus } from "../../api/generated/types";

export {
	BusinessStatusSchema as businessStatus,
	NpuStatusSchema as npuStatus,
	NpuStatusSchema as nativeNpuStatus,
	PpeFlowEntrySchema as ppeFlowEntry,
	RegistrationStateSchema as registrationState,
	StatusReplySchema as status,
	SubGatewayStatusSchema as subGateway,
} from "../../api/generated/schemas";
export type {
	BusinessStatus,
	NpuStatus,
	PpeFlowEntry,
	StatusReply as FttrStatus,
	SubGatewayStatus as SubGateway,
	SwitchPortStatus,
} from "../../api/generated/types";

// luci-rpc is an external service and does not belong to the FTTR wire contract.
export const networkDevices = z.record(
	z.string(),
	z.object({
		carrier: z.optional(z.boolean()),
		mac: z.optional(z.string()),
		link: z.optional(
			z.object({
				speed: z.optional(z.number()),
				duplex: z.optional(z.string()),
				autoneg: z.optional(z.boolean()),
			}),
		),
		stats: z.optional(z.record(z.string(), z.number())),
	}),
);
export type NetworkDevice = z.infer<typeof networkDevices>[string];
export type NetworkDevices = z.infer<typeof networkDevices>;

export const businessLabels = () =>
	({
		not_started: _("Not started"),
		collecting_identity: _("Collecting identity"),
		retrying_identity: _("Retrying identity"),
		unsupported: _("Unsupported"),
		configuring: _("Configuring"),
		verifying: _("Verifying"),
		wan_bootstrap_pending: _("WAN pending"),
		verified: _("Verified"),
		retrying: _("Retrying"),
		offline: _("Offline"),
	}) satisfies Record<BusinessStatus["phase"], string>;

export function businessText(value: BusinessStatus): string {
	return `${businessLabels()[value.phase]} · ${value.generation}${value.error ? ` · ${value.error}` : ""}`;
}
export function eqdText(value: SubGatewayStatus["equalization_delay_bits"]): string {
	return value === null ? "—" : `${value} bits`;
}
