import assert from "node:assert/strict";
import test from "node:test";
import type { PlatformInfoReply } from "../src/api/generated/types";
import { platformOnu, platformOnuLabel } from "../src/view/contracts/platform";

const sparsePlatform: PlatformInfoReply = {
	schema_version: 1,
	selection: "selected",
	platform_id: "test-sparse",
	vendor: "Test",
	model: "Sparse resource fixture",
	onus: [
		{ onu_id: 3, interface: "pon-user" },
		{ onu_id: 72, interface: null },
	],
	operations: {
		optical_control: false,
		transceiver_telemetry: false,
		fpga_diagnostics: false,
		bosa_diagnostics: false,
		calibration_profile: null,
		npu_offload: false,
		omci_mib: true,
		downstream_fec: false,
	},
};

test("platform ONU lookup uses exact sparse resource IDs and explicit interfaces", () => {
	assert.deepEqual(platformOnu(sparsePlatform, 72), { onu_id: 72, interface: null });
	assert.equal(platformOnu(sparsePlatform, 16), undefined);
	assert.equal(platformOnuLabel(sparsePlatform, 3), "pon-user · ONU-ID 3");
	assert.equal(platformOnuLabel(sparsePlatform, 72), "ONU-ID 72");
	assert.equal(platformOnuLabel(sparsePlatform, 16), "ONU-ID 16");
});
