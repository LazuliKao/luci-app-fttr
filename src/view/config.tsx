// SPDX-License-Identifier: Apache-2.0

import { addAuth } from "./config/auth";
import { addBasic } from "./config/basic";
import { addDevices } from "./config/devices";
import { openRecovery } from "./config/recovery";
import { saveConfiguration } from "./config/save";
import { addServices } from "./config/services";
import type { PlatformInfoReply } from "./contracts/api";
import { checkConfig, getPlatformInfo, getStatus, reloadConfig, restartService } from "./contracts/api";
import { type Capabilities, getCapabilities } from "./contracts/capabilities";
import type { ConfigCheck } from "./contracts/provisioning";
import type { FttrStatus, SubGateway } from "./contracts/status";

const view = L.view;
const uci = L.uci;
const form = L.form;

async function command<T>(
	fn: () => Promise<T>,
	output: HTMLElement,
	onResult?: (result: T | { error: string }) => void,
): Promise<void> {
	try {
		const result = await fn();
		output.textContent = JSON.stringify(result, null, 2);
		onResult?.(result);
	} catch (error) {
		output.textContent = String(error);
		onResult?.({ error: String(error) });
	}
}

type InitialCheck = {
	error?: string;
	connectedDevices: SubGateway[];
	pinning?: FttrStatus["onu_pinning"];
	capabilities: Capabilities;
	platform: PlatformInfoReply;
};
const main = view.extend({
	async load(): Promise<InitialCheck> {
		const [capabilities, platform] = await Promise.all([getCapabilities(), getPlatformInfo()]);
		if (!capabilities.pages.config) {
			throw new Error(_("This page is not supported by the installed FTTR build."));
		}
		await uci.load("fttr");
		if (platform.platform_id === "fiberhome-an4475-g2" && !uci.sections("fttr", "fiberhome").length) {
			uci.add("fttr", "fiberhome", "fiberhome");
			uci.set("fttr", "fiberhome", "onu_count", "128");
		}
		if (!uci.sections("fttr", "provisioning").length) uci.add("fttr", "provisioning", "provisioning");
		if (!uci.sections("fttr", "management").length) uci.add("fttr", "management", "management");
		if (!uci.sections("fttr", "omci_auth").length) {
			uci.add("fttr", "omci_auth", "omci_auth_global");
			uci.set("fttr", "omci_auth_global", "schema_version", "1");
			uci.set("fttr", "omci_auth_global", "auth_mode", "disabled");
		}
		const [check, status] = await Promise.all([
			checkConfig().catch((error: unknown) => ({ error: String(error) })),
			getStatus().catch((error: unknown) => ({ error: String(error), sub_gateways: [] })),
		]);
		return {
			error: ("error" in check ? check.error : undefined) || ("error" in status ? status.error : undefined),
			connectedDevices: status.sub_gateways,
			pinning: "onu_pinning" in status ? status.onu_pinning : undefined,
			capabilities,
			platform,
		};
	},
	async render(initialCheck: InitialCheck): Promise<Node> {
		const map = new form.Map("fttr");
		const section = map.section(form.NamedSection, "acs", "acs");
		section.addremove = false;
		section.anonymous = false;

		const globalId = uci.sections("fttr", "provisioning")[0]?.[".name"] ?? "provisioning";
		addBasic(section, _("Basic"), globalId, initialCheck.platform);
		addAuth(section);
		addDevices(
			section,
			initialCheck.connectedDevices ?? [],
			initialCheck.platform,
			initialCheck.pinning,
			initialCheck.capabilities,
		);
		addServices(section);
		// The inherited Save & Apply handler calls this explicit page-save entry.
		this.handleSave = () => saveConfiguration(map, initialCheck.platform);

		const output = <pre style="white-space:pre-wrap;overflow-wrap:anywhere" aria-live="polite" />;
		let checkNotification: Node | null = null;
		let backendError: string | undefined;
		const showCheck = (result: ConfigCheck | { error?: string }): void => {
			backendError = "error" in result ? result.error : undefined;
			checkNotification?.parentNode?.removeChild(checkNotification);
			checkNotification = null;
			if (backendError) {
				checkNotification = L.ui.addNotification(
					_("FTTR configuration check failed"),
					<div>
						<p>{backendError}</p>
						<button
							class="cbi-button cbi-button-action"
							type="button"
							onclick={() => openRecovery(section, backendError)}
						>
							{_("Review and repair configuration")}
						</button>
					</div>,
					"error",
				);
			}
		};
		showCheck(initialCheck);
		const actions = (
			<div class="cbi-section" style="margin-bottom:16px">
				<div style="display:flex;flex-wrap:wrap;gap:8px;margin:12px 0">
					<button
						class="cbi-button cbi-button-action"
						type="button"
						onclick={() => openRecovery(section, backendError)}
					>
						{_("Review and repair configuration")}
					</button>
					<button
						class="cbi-button cbi-button-action"
						type="button"
						onclick={() => command<ConfigCheck>(checkConfig, output, showCheck)}
					>
						{_("Check")}
					</button>
					<button
						class="cbi-button cbi-button-action"
						type="button"
						disabled={!L.hasViewPermission()}
						onclick={() =>
							command<ConfigCheck>(
								async () => {
									await reloadConfig();
									return await checkConfig();
								},
								output,
								showCheck,
							)
						}
					>
						{_("Reload")}
					</button>
					<button
						class="cbi-button cbi-button-negative"
						type="button"
						disabled={!L.hasViewPermission()}
						onclick={() => command(restartService, output)}
					>
						{_("Restart")}
					</button>
				</div>
				{output}
			</div>
		);
		const renderedMap = await map.render();
		return (
			<div>
				<h2 style="margin-bottom:16px">{_("FTTR configuration")}</h2>
				{actions}
				{renderedMap}
			</div>
		);
	},
});

export { main };
