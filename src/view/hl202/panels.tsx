import { input, button as makeButton, text } from "./dom";
import {
	check,
	execute,
	type JsonObject,
	object,
	readAccounts,
	readReport,
	type SourceTarget,
	setAccount,
	type Target,
} from "./rpc";

const raw = (value: unknown): HTMLElement => (
	<pre style="white-space:pre-wrap;overflow-wrap:anywhere;max-height:32rem;overflow:auto">
		{text(typeof value === "string" ? value : JSON.stringify(value, null, 2))}
	</pre>
);
const section = (title: string, children: HTMLElement[]): HTMLElement => (
	<div class="cbi-section">
		<h3>{title}</h3>
		{children}
	</div>
);
type Action = () => Promise<void>;
let busy = false;
export const isBusy = (): boolean => busy;

function action(button: HTMLButtonElement, output: HTMLElement, run: Action): void {
	button.addEventListener("click", async () => {
		if (busy) {
			output.textContent = _("Another operation is in progress.");
			return;
		}
		busy = true;
		button.disabled = true;
		output.textContent = _("Waiting for device result…");
		try {
			await run();
		} catch (cause: unknown) {
			output.textContent = cause instanceof Error ? cause.message : _("Request failed");
		} finally {
			busy = false;
			button.disabled = false;
		}
	});
}

function operation(output: HTMLElement, response: JsonObject): void {
	const selected = object(response.operation);
	const result = object(selected.result);
	const status = typeof result.status === "string" ? result.status : _("Unknown");
	output.replaceChildren(
		<p>
			{text(
				`${_("State")}: ${status}; ${_("Exit code")}: ${String(result.exit_code ?? "—")}; ${_("Request ID")}: ${String(result.request_id ?? "—")}`,
			)}
		</p>,
	);
	if (selected.binding_current === false)
		output.append(
			<p>{_("Device binding changed after submission. This result belongs to the original target.")}</p>,
		);
	if (status === "timeout")
		output.append(
			<p>
				{_(
					"Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.",
				)}
			</p>,
		);
	if (typeof result.error === "string") output.append(raw(result.error));
	if (typeof result.output === "string") output.append(raw(result.output));
	if (result.output_truncated === true) output.append(<p>{_("Output was truncated at the byte limit.")}</p>);
}

export function reportPanel(target: Target | SourceTarget): HTMLElement {
	const output = <div aria-live="polite" />;
	const button = makeButton(_("Read MQTT report"));
	action(button, output, async () => {
		const response = await readReport(target);
		if (!response.report) {
			output.textContent = _("No MQTT report has been parsed yet.");
			return;
		}
		const state = object(response.report);
		output.replaceChildren(
			<p>
				{text(
					`${_("Revision")}: ${String(state.revision)}; ${_("Last received")}: ${String(state.last_received ?? "—")}; ${_("Last good report")}: ${String(state.last_good ?? "—")}`,
				)}
			</p>,
		);
		if (typeof state.error === "string")
			output.append(<p>{text(`${_("Latest report error")}: ${state.error}`)}</p>);
		if (!state.report) return;
		const report = object(state.report);
		const fields = object(report.fields);
		output.append(
			<div style="overflow-x:auto">
				<table class="table">
					<thead>
						<tr>
							<th>{_("Field")}</th>
							<th>{_("Value")}</th>
							<th>{_("Source member")}</th>
						</tr>
					</thead>
					<tbody>
						{Object.entries(fields).map(([name, value]) => {
							const field = object(value);
							return (
								<tr>
									<td>{text(name)}</td>
									<td>
										{text(
											`${String(field.value)}${typeof field.unit === "string" ? ` ${field.unit}` : ""}`,
										)}
									</td>
									<td>{text(String(field.member))}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>,
		);
		if (Array.isArray(report.errors) && report.errors.length) output.append(raw(report.errors));
		if (Array.isArray(report.members))
			for (const value of report.members) {
				const member = object(value);
				output.append(
					<details>
						<summary>
							{text(`${String(member.name)} (${String(member.bytes)} bytes, ${String(member.encoding)})`)}
						</summary>
						{typeof member.text === "string" ? (
							raw(member.text)
						) : (
							<p>
								{member.text_omitted
									? _("Text omitted at the shared byte limit.")
									: _("Binary member; text is unavailable.")}
							</p>
						)}
					</details>,
				);
			}
	});
	return section(_("MQTT report"), [button, output]);
}

export function accountsPanel(target: Target): HTMLElement {
	const output = <div aria-live="polite" />;
	const button = makeButton(_("Read users"));
	button.disabled = !L.hasViewPermission();
	action(button, output, async () => {
		const response = check(await readAccounts(target));
		operation(output, response);
		if (!Array.isArray(response.accounts)) return;
		for (const item of response.accounts) {
			const account = object(item);
			if (
				typeof account.entry !== "number" ||
				typeof account.username !== "string" ||
				typeof account.active !== "boolean"
			)
				throw new Error(_("Invalid account metadata"));
			const entry = account.entry;
			const active = account.active;
			const password = input("password", `${_("New password")}: ${account.username}`);
			password.autocomplete = "new-password";
			password.id = `hl202-password-${entry}`;
			const save = makeButton(_("Set password"));
			const toggle = makeButton(active ? _("Disable") : _("Enable"));
			save.disabled = toggle.disabled = !L.hasViewPermission();
			const status = <div aria-live="polite" />;
			action(save, status, async () => {
				const value = password.value;
				password.value = "";
				const result = await setAccount(target, { entry, kind: "password", password: value, active });
				operation(status, result);
				status.append(<p>{text(String(result.write_status))}</p>);
			});
			action(toggle, status, async () => {
				const result = await setAccount(target, { entry, kind: "active", password: "", active: !active });
				operation(status, result);
				status.append(
					<p>
						{text(String(result.write_status))}; {_("Refresh users to read the current state.")}
					</p>,
				);
			});
			output.append(
				<div class="cbi-section">
					<h4>{text(`${account.username} (Entry ${entry}) — ${active ? _("Enabled") : _("Disabled")}`)}</h4>
					<label htmlFor={password.id}>
						{_("New password")} {password}
					</label>{" "}
					{save} {toggle}
					{status}
				</div>,
			);
		}
	});
	return section(_("User management"), [
		<p>
			{_(
				"Password writes are accepted and saved by the device; this does not prove web login permission. Existing permission masks are preserved.",
			)}
		</p>,
		button,
		output,
	]);
}

export function consolePanel(target: Target): HTMLElement {
	const script = document.createElement("textarea");
	script.id = "hl202-script";
	script.rows = 8;
	script.style.cssText = "width:100%;box-sizing:border-box;font-family:monospace";
	script.setAttribute("aria-label", _("Remote shell command"));
	script.spellcheck = false;
	const timeout = input("number", _("Timeout in seconds"));
	timeout.id = "hl202-timeout";
	timeout.min = "1";
	timeout.max = "300";
	timeout.value = "20";
	const button = makeButton(_("Execute on selected HL202"), "apply");
	button.disabled = !L.hasViewPermission();
	const output = <div aria-live="polite" />;
	action(button, output, async () => {
		const seconds = Number(timeout.value);
		if (!Number.isInteger(seconds) || seconds < 1 || seconds > 300)
			throw new Error(_("Timeout must be 1–300 seconds."));
		if (
			!script.value.trim() ||
			script.value.includes("\0") ||
			new TextEncoder().encode(script.value).length > 65536
		)
			throw new Error(_("Enter a non-empty UTF-8 script up to 64 KiB without NUL characters."));
		operation(output, await execute(target, script.value, seconds));
	});
	return section(_("Raw command console"), [
		<p>
			{_(
				"Shell executes on the selected ONU. Timeout does not cancel execution. Raw output can contain secrets.",
			)}
		</p>,
		<p>{text(`${_("Target")}: ${target.optical_sn} / ONU ${target.onu_id}`)}</p>,
		<label htmlFor="hl202-script">
			{_("Remote shell command")}
			{script}
		</label>,
		<label htmlFor="hl202-timeout">
			{_("Timeout in seconds")} {timeout}
		</label>,
		button,
		output,
	]);
}
