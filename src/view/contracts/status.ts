import * as z from "zod/mini";
import { acsBootstrap, management, provisioning, syncItem, syncStatus, wifiSync } from "./provisioning";

const str = z.string();
const num = z.number();
const nullableNumber = z.nullable(num);
const measurements = z.record(
	str,
	z.object({ source: str, unit: str, reason: z.nullable(str), raw: z.nullable(str), age_seconds: nullableNumber }),
);
export const businessStatus = z.object({
	phase: z.enum([
		"not_started",
		"collecting_identity",
		"retrying_identity",
		"unsupported",
		"configuring",
		"verifying",
		"wan_bootstrap_pending",
		"verified",
		"retrying",
		"offline",
	]),
	generation: num,
	error: z.nullable(str),
});
export const registrationState = z.enum([
	"o1_initial",
	"o2_standby",
	"o3_serial_number",
	"o4_ranging",
	"o5_operation",
	"o6_intermittent_lods",
	"o7_emergency_stop",
]);
const optical = z.object({
	model: str,
	wavelength_tx_nm: num,
	wavelength_rx_nm: num,
	phy_rate_downlink_gbps: num,
	phy_rate_uplink_gbps: num,
	tx_power_dbm: nullableNumber,
	laser_bias_current_ma: nullableNumber,
	temperature_celsius: nullableNumber,
	vcc_voltage: nullableNumber,
	cdr_locked: z.nullable(z.boolean()),
	measurements,
});
const identity = z.object({
	equipment_id: z.nullable(str),
	hardware_version: z.nullable(str),
	software_images: z.array(str),
	omcc_version: nullableNumber,
	errors: z.array(str),
});
export const subGateway = z.object({
	onu_id: num,
	vendor: str,
	model: str,
	serial_number: str,
	state: registrationState,
	business_status: businessStatus,
	management: z.nullable(management),
	provisioning: z.nullable(provisioning),
	services: z.array(syncItem),
	ssids: z.array(syncItem),
	wifi_sync: wifiSync,
	acs_bootstrap: z.optional(acsBootstrap),
	identity: z.nullable(identity),
	identity_age_seconds: nullableNumber,
	identity_current: z.boolean(),
	fiber_distance_m: nullableNumber,
	ranging_delay_rtd_ns: nullableNumber,
	equalization_delay_bits: z.catch(nullableNumber, null),
	optical_rx_power_dbm: nullableNumber,
	optical_tx_power_dbm: nullableNumber,
	firmware_version: str,
	hardware_version: str,
	uptime_seconds: nullableNumber,
	data_path: z.object({
		interface: str,
		gem_ports: z.nullable(z.array(num)),
		vlan_id: nullableNumber,
		tx_bytes: nullableNumber,
		rx_bytes: nullableNumber,
		current_tx_kbps: nullableNumber,
		current_rx_kbps: nullableNumber,
		measurements,
	}),
	wifi_mesh: z.object({
		channel_2g: nullableNumber,
		channel_5g: nullableNumber,
		bandwidth_5g: z.nullable(str),
		tx_power_pct: nullableNumber,
		measurements,
	}),
	connected_clients: z.nullable(
		z.array(
			z.object({
				mac: str,
				ip: str,
				band: str,
				rssi_dbm: nullableNumber,
				rx_rate_mbps: nullableNumber,
				tx_rate_mbps: nullableNumber,
			}),
		),
	),
	measurements,
});
const switchPort = z.object({
	port: num,
	interface: str,
	carrier: z.boolean(),
	status: str,
	onu_id: z.optional(num),
	onu_sn: z.optional(str),
	link_state: str,
});
export const status = z.object({
	fpga_status: str,
	provisioning: z.nullable(syncStatus),
	optical_transceiver: optical,
	switch_ports: z.array(switchPort),
	sub_gateways: z.array(subGateway),
	telemetry_gateways: z.array(z.object({ id: str, last_seen_sec_ago: num, last_payload_bytes: num })),
});
export const networkDevices = z.record(
	str,
	z.object({
		carrier: z.optional(z.boolean()),
		mac: z.optional(str),
		link: z.optional(
			z.object({ speed: z.optional(num), duplex: z.optional(str), autoneg: z.optional(z.boolean()) }),
		),
		stats: z.optional(z.record(str, num)),
	}),
);
export type SubGateway = z.infer<typeof subGateway>;
export type FttrStatus = z.infer<typeof status>;
export type SwitchPortStatus = z.infer<typeof switchPort>;
export type NetworkDevice = z.infer<typeof networkDevices>[string];
export type NetworkDevices = z.infer<typeof networkDevices>;
export type BusinessStatus = z.infer<typeof businessStatus>;

export const businessLabels = {
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
} satisfies Record<BusinessStatus["phase"], string>;

export function businessText(value: BusinessStatus): string {
	return `${businessLabels[value.phase]} · ${value.generation}${value.error ? ` · ${value.error}` : ""}`;
}

export function eqdText(value: SubGateway["equalization_delay_bits"]): string {
	return value === null ? "—" : `${value} bits`;
}
