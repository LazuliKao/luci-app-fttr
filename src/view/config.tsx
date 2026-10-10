// SPDX-License-Identifier: Apache-2.0

import { addBasic } from "./config/basic";
import { addDevices } from "./config/devices";
import { addServices } from "./config/services";

const view = L.view;
const uci = L.uci;
const form = L.form;
const rpc = L.rpc;
const checkConfig = rpc.declare<any>({ object: "luci.fttr", method: "config_check", reject: true });
const reloadConfig = rpc.declare<any>({ object: "luci.fttr", method: "config_reload", reject: true });
const restartService = rpc.declare<any>({ object: "luci.fttr", method: "restart_service", reject: true });
const getStatus = rpc.declare<any>({ object: "luci.fttr", method: "get_status", reject: true });

async function command(fn: () => Promise<any>, output: HTMLElement, onResult?: (result: any) => void): Promise<void> {
	try {
		const result = await fn();
		output.textContent = result.error ? String(result.error) : JSON.stringify(result, null, 2);
		onResult?.(result);
	} catch (error) {
		output.textContent = String(error);
		onResult?.({ error: String(error) });
	}
}

const main = (view as any).extend({
	async load(): Promise<any> {
		await uci.load("fttr");
		if (!uci.sections("fttr", "provisioning").length) uci.add("fttr", "provisioning", "provisioning");
		if (!uci.sections("fttr", "management").length) uci.add("fttr", "management", "management");
		try {
			const [check, status]: any[] = await Promise.all([
				checkConfig(),
				getStatus().catch(() => ({ sub_gateways: [] })),
			]);
			return { ...check, connectedDevices: status.sub_gateways ?? [] };
		} catch (error) {
			return { error: String(error) };
		}
	},
	render(initialCheck: any): Promise<Node> {
		const map = new form.Map("fttr", _("FTTR configuration"));
		const section = map.section(form.NamedSection, "acs", "acs", "acs");
		section.addremove = false;
		section.anonymous = false;

		const globalId = uci.sections("fttr", "provisioning")[0]?.[".name"] ?? "provisioning";
		addBasic(section, _("Basic"), globalId);
		addDevices(section, initialCheck.connectedDevices ?? []);
		addServices(section);

		const output = <pre style="white-space:pre-wrap;overflow-wrap:anywhere" aria-live="polite" />;
		let checkNotification: Node | null = null;
		const showCheck = (result: any): void => {
			checkNotification?.parentNode?.removeChild(checkNotification);
			checkNotification = null;
			if (result?.error) {
				checkNotification = L.ui.addNotification(
					_("FTTR configuration check failed"),
					<p>{String(result.error)}</p>,
					"error",
				);
			}
		};
		showCheck(initialCheck);
		const actions = (
			<div class="cbi-section">
				<p>
					{_(
						"Saving configuration does not synchronize devices in Manual mode. After Save & Apply, open Synchronization and choose Apply differences. Preview differences is read-only.",
					)}{" "}
					<a href={L.url("admin", "network", "fttr", "sync")}>{_("Open Synchronization")}</a>
				</p>
				<h3>{_("Configuration diagnostics")}</h3>
				<button
					class="cbi-button cbi-button-action"
					type="button"
					onclick={() => command(checkConfig, output, showCheck)}
				>
					{_("Check")}
				</button>{" "}
				<button
					class="cbi-button cbi-button-action"
					type="button"
					disabled={!L.hasViewPermission()}
					onclick={() =>
						command(
							async () => {
								const reload: any = await reloadConfig();
								if (reload.error) return reload;
								return await checkConfig();
							},
							output,
							showCheck,
						)
					}
				>
					{_("Reload")}
				</button>{" "}
				<button
					class="cbi-button cbi-button-negative"
					type="button"
					disabled={!L.hasViewPermission()}
					onclick={() => command(restartService, output)}
				>
					{_("Restart")}
				</button>
				{output}
			</div>
		);
		return map.render().then((node: Node) => (
			<div>
				{node}
				{actions}
			</div>
		));
	},
});

export { main };
