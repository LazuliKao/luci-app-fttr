import { button, text } from "./hl202/dom";
import { accountsPanel, consolePanel, isBusy, reportPanel } from "./hl202/panels";
import { check, list, object, type Target } from "./hl202/rpc";

function renderPage(): HTMLElement {
	const select = document.createElement("select");
	select.id = "hl202-device";
	select.setAttribute("aria-label", _("HL202 device"));
	const refresh = button(_("Refresh devices"));
	const status = <p aria-live="polite" />;
	const panels = <div />;
	const sourceSelect = document.createElement("select");
	sourceSelect.id = "hl202-source";
	sourceSelect.setAttribute("aria-label", _("Read-only MQTT source"));
	const sourceRead = button(_("Inspect source report (read-only)"));
	const sourceDetails = <div />;
	let sourceTargets: readonly { readonly mqtt_mac: string; readonly binding_generation: string }[] = [];
	const sources = (
		<details>
			<summary>{_("MQTT source identity")}</summary>
			<pre style="white-space:pre-wrap;overflow-wrap:anywhere" />
			<label htmlFor="hl202-source">
				{_("Read-only MQTT source")} {sourceSelect}
			</label>
			{sourceRead}
			{sourceDetails}
		</details>
	);
	let targets: readonly Target[] = [];
	let shown = "";
	let reportRevision: number | undefined;
	const show = (): void => {
		const target = targets.find((item) => item.optical_sn === select.value);
		const key = target ? `${target.optical_sn}/${target.binding_generation}` : select.value;
		if (shown === key) return;
		shown = key;
		reportRevision = undefined;
		panels.replaceChildren();
		if (target)
			panels.append(
				<p>
					<a href={L.url("admin", "network", "fttr", "hardware")}>
						{_("Open optical status and ONU/MIB details")}
					</a>
				</p>,
				reportPanel(target),
				accountsPanel(target),
				consolePanel(target),
			);
		else
			panels.append(
				<p>{_("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")}</p>,
			);
	};
	const reload = async (): Promise<void> => {
		refresh.disabled = true;
		status.textContent = _("Loading devices…");
		try {
			const response = check(await list());
			if (!Array.isArray(response.devices)) throw new Error(_("Invalid device list"));
			const previous = select.value;
			targets = [];
			select.replaceChildren();
			const found: Target[] = [];
			const revisions = new Map<string, number>();
			for (const value of response.devices) {
				const device = object(value);
				if (typeof device.optical_sn !== "string" || typeof device.onu_id !== "number")
					throw new Error(_("Invalid device identity"));
				const ready = device.can_execute === true && device.mqtt !== null;
				if (typeof device.report_revision === "number")
					revisions.set(device.optical_sn, device.report_revision);
				select.append(
					<option value={device.optical_sn}>
						{text(
							`${String(device.model)} / ${device.optical_sn} / ONU ${device.onu_id} — ${ready ? _("MQTT ready") : _("MQTT unavailable")}; ${device.optical_online ? _("Optical online") : _("Optical offline")}`,
						)}
					</option>,
				);
				if (ready) {
					const mqtt = object(device.mqtt);
					if (typeof mqtt.binding_generation !== "string") throw new Error(_("Invalid binding generation"));
					found.push({
						optical_sn: device.optical_sn,
						onu_id: device.onu_id,
						binding_generation: mqtt.binding_generation,
					});
				}
			}
			targets = found;
			if (Array.from(select.options).some((option) => option.value === previous)) select.value = previous;
			status.textContent = response.devices.length
				? _("Select a device to inspect reports and run operations.")
				: _("No HL202 optical devices were found.");
			const pre = sources.querySelector("pre");
			if (pre) pre.textContent = JSON.stringify(response.sources, null, 2);
			const previousSource = sourceSelect.value;
			const observations: { mqtt_mac: string; binding_generation: string }[] = [];
			sourceSelect.replaceChildren();
			if (Array.isArray(response.sources))
				for (const value of response.sources) {
					const source = object(value);
					if (typeof source.mqtt_mac !== "string" || typeof source.binding_generation !== "string")
						throw new Error(_("Invalid source observation"));
					observations.push({ mqtt_mac: source.mqtt_mac, binding_generation: source.binding_generation });
					sourceSelect.append(
						<option value={source.mqtt_mac}>
							{text(`${source.mqtt_mac} — ${String(source.reason)}`)}
						</option>,
					);
				}
			sourceTargets = observations;
			if (observations.some((source) => source.mqtt_mac === previousSource)) sourceSelect.value = previousSource;
			sourceRead.disabled = observations.length === 0;
			show();
			const revision = revisions.get(select.value);
			if (revision !== undefined && revision !== reportRevision && !isBusy()) {
				reportRevision = revision;
				const read = panels.querySelector("button");
				if (read instanceof HTMLButtonElement) read.click();
			}
		} catch (cause: unknown) {
			targets = [];
			panels.replaceChildren();
			shown = "";
			status.textContent = cause instanceof Error ? cause.message : _("Request failed");
		} finally {
			refresh.disabled = false;
		}
	};
	select.addEventListener("change", show);
	sourceRead.addEventListener("click", () => {
		const target = sourceTargets.find((source) => source.mqtt_mac === sourceSelect.value);
		sourceDetails.replaceChildren();
		if (target) {
			const panel = reportPanel(target);
			sourceDetails.append(panel);
			const read = panel.querySelector("button");
			if (read instanceof HTMLButtonElement) read.click();
		}
	});
	refresh.addEventListener("click", () => {
		void reload();
	});
	void reload();
	const root = (
		<div class="cbi-map hl202-management">
			<style>
				{
					".hl202-management :is(.cbi-dropdown,.fluent-custom-select){width:100%;max-width:100%;min-width:0!important;box-sizing:border-box}.hl202-management :is(.cbi-dropdown,.fluent-custom-select)>ul>li{white-space:normal;overflow-wrap:anywhere}"
				}
			</style>
			<h2>{_("HL202 sub-gateway management")}</h2>
			<div class="cbi-section">
				<label htmlFor="hl202-device" style="display:block;max-width:100%">
					{_("HL202 device")} {select}
				</label>{" "}
				{refresh}
				{status}
				{sources}
			</div>
			{panels}
		</div>
	);
	const poll = async (): Promise<void> => {
		if (!root.isConnected) return;
		await reload();
		if (root.isConnected) window.setTimeout(() => void poll(), 5000);
	};
	window.setTimeout(() => void poll(), 5000);
	return root;
}

const view = L.view;
if (!("extend" in view) || typeof view.extend !== "function") throw new Error("LuCI view extension is unavailable");
const main: unknown = Reflect.apply(view.extend, view, [
	{ render: renderPage, handleSave: null, handleSaveApply: null, handleReset: null },
]);

export { main };
