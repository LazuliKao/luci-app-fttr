// SPDX-License-Identifier: Apache-2.0

import { date, formatUptime, renderBadge, text } from "./dom";
import { execute, readAccounts, readReport, type SourceTarget, setAccount, type Target } from "./rpc";

let busy = false;
export const isBusy = (): boolean => busy;

export interface ReportController {
	readonly element: HTMLElement;
	setTarget(target: Target | SourceTarget | null): void;
	refresh(explicitTarget?: Target | SourceTarget): Promise<void>;
}

export interface AccountsController {
	readonly element: HTMLElement;
	setTarget(target: Target | null): void;
	refresh(): Promise<void>;
}

export interface ConsoleController {
	readonly element: HTMLElement;
	setTarget(target: Target | null): void;
}

export function createReportPanel(): ReportController {
	let currentTarget: Target | SourceTarget | null = null;
	const outputSummary = <div style="margin:8px 0;display:flex;align-items:center;flex-wrap:wrap;gap:10px" />;
	const outputTable = <div style="overflow-x:auto;margin:8px 0" />;
	const outputMembers = <div style="margin-top:10px" />;
	const statusMsg = <div style="font-size:88%;color:#888;margin:6px 0" aria-live="polite" />;

	const readBtn = (
		<button type="button" class="cbi-button cbi-button-action">
			{_("Read MQTT report")}
		</button>
	) as HTMLButtonElement;

	const doRead = async (targetToRead?: Target | SourceTarget) => {
		const target = targetToRead || currentTarget;
		if (!target) {
			statusMsg.textContent = _(
				"This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.",
			);
			return;
		}
		if (busy) {
			statusMsg.textContent = _("Another operation is in progress.");
			return;
		}
		busy = true;
		readBtn.disabled = true;
		statusMsg.textContent = _("Waiting for device result…");
		try {
			const response = await readReport(target);
			if (JSON.stringify(target) !== JSON.stringify(currentTarget)) return;
			if (!response.report) {
				outputSummary.replaceChildren();
				outputTable.replaceChildren();
				outputMembers.replaceChildren();
				statusMsg.textContent = _("No MQTT report has been parsed yet.");
				return;
			}
			const state = response.report;
			outputSummary.replaceChildren(
				<span>
					<span style="color:#888;margin-right:4px">{_("Revision")}:</span>
					{renderBadge("info", `#${String(state.revision)}`)}
				</span>,
				<span>
					<span style="color:#888;margin-right:4px">{_("Last received")}:</span>
					<strong>{date(typeof state.last_received === "number" ? state.last_received : undefined)}</strong>
				</span>,
				<span>
					<span style="color:#888;margin-right:4px">{_("Last good report")}:</span>
					<strong>{date(typeof state.last_good === "number" ? state.last_good : undefined)}</strong>
				</span>,
			);
			if (typeof state.error === "string") {
				outputSummary.append(
					<div class="alert-message warning" style="width:100%;margin-top:6px">
						{_("Latest report error")}: {state.error}
					</div>,
				);
			}

			if (state.report) {
				const rep = state.report;
				const fields = rep.fields;
				outputTable.replaceChildren(
					<table class="table" style="font-size:90%">
						<thead>
							<tr>
								<th>{_("Field")}</th>
								<th>{_("Value")}</th>
								<th>{_("Source member")}</th>
							</tr>
						</thead>
						<tbody>
							{Object.entries(fields).map(([name, field]) => {
								const rawVal = field.value;
								let displayVal =
									rawVal === null
										? "—"
										: `${typeof rawVal === "object" ? JSON.stringify(rawVal) : String(rawVal)}${field.unit ? ` ${field.unit}` : ""}`;
								if (name === "uptime_seconds" && typeof rawVal === "number") {
									displayVal = formatUptime(rawVal);
								}
								return (
									<tr>
										<td>
											<code>{name}</code>
										</td>
										<td>
											<strong>{displayVal}</strong>
										</td>
										<td>
											<span class="hl202-badge hl202-badge-neutral">{text(field.member)}</span>
										</td>
									</tr>
								);
							})}
						</tbody>
					</table>,
				);

				const membersList: HTMLElement[] = [];
				for (const member of rep.members) {
					const copyBtn = (
						<button
							type="button"
							class="fttr-btn-subtle"
							style="margin-left:8px"
							onclick={(e: MouseEvent) => {
								e.stopPropagation();
								if (typeof member.text === "string") {
									void navigator.clipboard?.writeText(member.text);
									copyBtn.textContent = _("Copied to clipboard");
									setTimeout(() => {
										copyBtn.textContent = _("Copy member text");
									}, 1500);
								}
							}}
						>
							{_("Copy member text")}
						</button>
					) as HTMLButtonElement;

					membersList.push(
						<details style="margin:6px 0;border:1px solid rgba(127,140,141,0.15);border-radius:4px;padding:4px 8px">
							<summary style="cursor:pointer;user-select:none;font-weight:600;font-size:90%">
								{_("%s (%s bytes, %s)").format(
									String(member.name),
									String(member.bytes),
									String(member.encoding),
								)}
								{typeof member.text === "string" ? copyBtn : null}
							</summary>
							<div style="margin-top:6px">
								{typeof member.text === "string" ? (
									<pre class="hl202-terminal-output" style="max-height:16rem">
										{member.text}
									</pre>
								) : (
									<p style="font-size:85%;color:#888;margin:4px 0">
										{member.text_omitted
											? _("Text omitted at the shared byte limit.")
											: _("Binary member; text is unavailable.")}
									</p>
								)}
							</div>
						</details>,
					);
				}
				outputMembers.replaceChildren(
					...rep.errors.map((message) => <div class="alert-message warning">{message}</div>),
					...membersList,
				);
			} else {
				outputTable.replaceChildren();
				outputMembers.replaceChildren();
			}
			statusMsg.textContent = "";
		} catch (cause: unknown) {
			statusMsg.textContent = cause instanceof Error ? cause.message : _("Request failed");
		} finally {
			busy = false;
			readBtn.disabled = !currentTarget;
		}
	};

	readBtn.addEventListener("click", () => {
		void doRead();
	});

	const element = (
		<div class="cbi-section hl202-panel-report">
			<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px">
				<h3 style="margin:0">{_("MQTT report")}</h3>
				{readBtn}
			</div>
			{statusMsg}
			{outputSummary}
			{outputTable}
			{outputMembers}
		</div>
	);

	return {
		element,
		setTarget(target: Target | SourceTarget | null) {
			if (JSON.stringify(target) !== JSON.stringify(currentTarget)) {
				outputSummary.replaceChildren();
				outputTable.replaceChildren();
				outputMembers.replaceChildren();
				statusMsg.textContent = "";
			}
			currentTarget = target;
			readBtn.disabled = !target;
		},
		refresh(explicitTarget?: Target | SourceTarget) {
			return doRead(explicitTarget);
		},
	};
}

export function createAccountsPanel(): AccountsController {
	let currentTarget: Target | null = null;
	const statusMsg = <div style="font-size:88%;color:#888;margin:6px 0" aria-live="polite" />;
	const usersContainer = <div style="margin-top:10px;display:flex;flex-direction:column;gap:10px" />;

	const readBtn = (
		<button type="button" class="cbi-button cbi-button-action">
			{_("Read users")}
		</button>
	) as HTMLButtonElement;

	readBtn.disabled = !L.hasViewPermission();

	const doRead = async () => {
		if (!currentTarget) {
			statusMsg.textContent = _(
				"This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.",
			);
			return;
		}
		if (busy) {
			statusMsg.textContent = _("Another operation is in progress.");
			return;
		}
		busy = true;
		readBtn.disabled = true;
		statusMsg.textContent = _("Waiting for device result…");
		const target = currentTarget;
		try {
			const response = await readAccounts(target);
			if (JSON.stringify(target) !== JSON.stringify(currentTarget)) return;
			usersContainer.replaceChildren();
			const op = response.operation;
			const res = op.result;
			if (res.status === "timeout") {
				statusMsg.textContent = _(
					"Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.",
				);
			} else {
				statusMsg.textContent = !op.binding_current
					? _("Device binding changed; this result is stale.")
					: (res.error ?? (response.accounts === null ? _("Account data is unavailable.") : ""));
			}

			if (response.accounts && op.binding_current) {
				const userNodes: HTMLElement[] = [];
				for (const account of response.accounts) {
					const entry = account.entry;
					let active = account.active;

					const activeBadge = (
						<span
							class={`hl202-badge ${active ? "hl202-badge-success" : "hl202-badge-neutral"}`}
							style="font-size:80%"
						>
							{active ? _("Enabled") : _("Disabled")}
						</span>
					);

					const pwdInput = (
						<input
							type="password"
							class="cbi-input-text"
							placeholder={_("New password")}
							autocomplete="new-password"
							style="width:180px"
						/>
					) as HTMLInputElement;

					const saveBtn = (
						<button type="button" class="cbi-button cbi-button-action">
							{_("Set password")}
						</button>
					) as HTMLButtonElement;

					const toggleBtn = (
						<button
							type="button"
							class={`cbi-button ${active ? "cbi-button-neutral" : "cbi-button-apply"}`}
						>
							{active ? _("Disable") : _("Enable")}
						</button>
					) as HTMLButtonElement;

					saveBtn.disabled = toggleBtn.disabled = !L.hasViewPermission();
					const userActionStatus = <div style="font-size:82%;margin-top:4px" aria-live="polite" />;

					saveBtn.addEventListener("click", async () => {
						if (!currentTarget || busy || JSON.stringify(target) !== JSON.stringify(currentTarget)) return;
						const val = pwdInput.value;
						if (!val) {
							userActionStatus.textContent = _("Enter a non-empty password.");
							return;
						}
						pwdInput.value = "";
						busy = true;
						saveBtn.disabled = toggleBtn.disabled = true;
						userActionStatus.textContent = _("Waiting for device result…");
						try {
							const result = await setAccount(target, {
								entry,
								kind: "password",
								password: val,
								active,
							});
							if (JSON.stringify(target) !== JSON.stringify(currentTarget)) return;
							const setOp = result.operation;
							const setRes = setOp.result;
							if (setOp.binding_current && result.write_status === "accepted_and_saved") {
								userActionStatus.textContent = _(
									"Password accepted and saved; web login permission is not verified.",
								);
							} else {
								userActionStatus.textContent =
									setRes.error ?? _("Execution outcome is unknown. Do not automatically retry.");
							}
						} catch (e: unknown) {
							userActionStatus.textContent = e instanceof Error ? e.message : _("Request failed");
						} finally {
							busy = false;
							saveBtn.disabled = toggleBtn.disabled = !L.hasViewPermission();
						}
					});

					toggleBtn.addEventListener("click", async () => {
						if (!currentTarget || busy || JSON.stringify(target) !== JSON.stringify(currentTarget)) return;
						busy = true;
						saveBtn.disabled = toggleBtn.disabled = true;
						userActionStatus.textContent = _("Waiting for device result…");
						try {
							const nextActive = !active;
							const result = await setAccount(target, {
								entry,
								kind: "active",
								password: "",
								active: nextActive,
							});
							if (JSON.stringify(target) !== JSON.stringify(currentTarget)) return;
							const readback = result.accounts?.find((account) => account.entry === entry);
							if (
								!result.operation.binding_current ||
								result.write_status !== "accepted_and_saved" ||
								!readback
							) {
								userActionStatus.textContent =
									result.operation.result.error ??
									_("Execution outcome is unknown. Refresh users before retrying.");
								return;
							}
							active = readback.active;
							activeBadge.className = `hl202-badge ${active ? "hl202-badge-success" : "hl202-badge-neutral"}`;
							activeBadge.textContent = active ? _("Enabled") : _("Disabled");
							toggleBtn.className = `cbi-button ${active ? "cbi-button-neutral" : "cbi-button-apply"}`;
							toggleBtn.textContent = active ? _("Disable") : _("Enable");
							userActionStatus.textContent = `${String(result.write_status)}; ${_("Refresh users to read the current state.")}`;
						} catch (e: unknown) {
							userActionStatus.textContent = e instanceof Error ? e.message : _("Request failed");
						} finally {
							busy = false;
							saveBtn.disabled = toggleBtn.disabled = !L.hasViewPermission();
						}
					});

					userNodes.push(
						<div
							class="cbi-section"
							style="margin:0;padding:10px 14px;border:1px solid rgba(127,140,141,0.2);border-radius:5px"
						>
							<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:8px">
								<div style="display:flex;align-items:center;gap:8px">
									<strong style="font-size:105%">{account.username}</strong>
									<span style="font-size:80%;color:#888">
										{_("(Entry %s)").replace("%s", String(entry))}
									</span>
									{activeBadge}
								</div>
								<div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px">
									{pwdInput}
									{saveBtn}
									{toggleBtn}
								</div>
							</div>
							{userActionStatus}
						</div>,
					);
				}
				usersContainer.replaceChildren(...userNodes);
			}
		} catch (cause: unknown) {
			statusMsg.textContent = cause instanceof Error ? cause.message : _("Request failed");
		} finally {
			busy = false;
			readBtn.disabled = !currentTarget || !L.hasViewPermission();
		}
	};

	readBtn.addEventListener("click", () => {
		void doRead();
	});

	const element = (
		<div class="cbi-section hl202-panel-accounts">
			<div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:8px;margin-bottom:6px">
				<h3 style="margin:0">{_("User management")}</h3>
				{readBtn}
			</div>
			<p style="font-size:85%;color:#888;margin:4px 0">
				{_(
					"Password writes are accepted and saved by the device; this does not prove web login permission. Existing permission masks are preserved.",
				)}
			</p>
			{statusMsg}
			{usersContainer}
		</div>
	);

	return {
		element,
		setTarget(target: Target | null) {
			if (JSON.stringify(target) !== JSON.stringify(currentTarget)) {
				usersContainer.replaceChildren();
				statusMsg.textContent = "";
			}
			currentTarget = target;
			readBtn.disabled = !target || !L.hasViewPermission();
		},
		refresh() {
			return doRead();
		},
	};
}

export function createConsolePanel(): ConsoleController {
	let currentTarget: Target | null = null;
	const targetLine = <div style="font-size:88%;color:#666;margin:4px 0" />;

	const script = (
		<textarea
			id="hl202-script"
			rows={8}
			class="hl202-terminal-textarea"
			spellcheck={false}
			aria-label={_("Remote shell command")}
			placeholder={_(
				"# Enter shell commands to execute on the selected sub-gateway (Ctrl + Enter to execute)...",
			)}
		/>
	) as HTMLTextAreaElement;

	const timeout = (
		<input
			type="number"
			id="hl202-timeout"
			min="1"
			max="300"
			value="20"
			class="cbi-input-text"
			style="width:70px;text-align:center"
			aria-label={_("Timeout in seconds")}
		/>
	) as HTMLInputElement;

	const execBtn = (
		<button type="button" class="cbi-button cbi-button-apply" style="font-weight:600">
			{_("Execute on selected HL202")}
		</button>
	) as HTMLButtonElement;

	execBtn.disabled = !L.hasViewPermission();

	const outputStatus = <div style="display:flex;align-items:center;flex-wrap:wrap;gap:8px" />;
	const outputBody = (
		<pre class="hl202-terminal-output" style="min-height:4rem;display:none">
			{_("# Waiting for commands...")}
		</pre>
	) as HTMLPreElement;

	const copyBtn = (
		<button
			type="button"
			class="fttr-btn-subtle"
			onclick={() => {
				if (outputBody.textContent) {
					void navigator.clipboard?.writeText(outputBody.textContent);
					copyBtn.textContent = _("Copied to clipboard");
					setTimeout(() => {
						copyBtn.textContent = _("Copy output");
					}, 1500);
				}
			}}
		>
			{_("Copy output")}
		</button>
	) as HTMLButtonElement;

	const clearBtn = (
		<button
			type="button"
			class="fttr-btn-subtle"
			onclick={() => {
				outputBody.textContent = "";
				outputBody.style.display = "none";
				outputStatus.replaceChildren();
			}}
		>
			{_("Clear output")}
		</button>
	) as HTMLButtonElement;

	const doExecute = async () => {
		if (!currentTarget) {
			outputStatus.replaceChildren(
				<div class="alert-message warning">
					{_("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")}
				</div>,
			);
			return;
		}
		if (busy) {
			outputStatus.replaceChildren(
				<div class="alert-message warning">{_("Another operation is in progress.")}</div>,
			);
			return;
		}
		const seconds = Number(timeout.value);
		if (!Number.isInteger(seconds) || seconds < 1 || seconds > 300) {
			outputStatus.replaceChildren(
				<div class="alert-message warning">{_("Timeout must be 1–300 seconds.")}</div>,
			);
			return;
		}
		const cmd = script.value.trim();
		if (!cmd || cmd.includes("\0") || new TextEncoder().encode(cmd).length > 65536) {
			outputStatus.replaceChildren(
				<div class="alert-message warning">
					{_("Enter a non-empty UTF-8 script up to 64 KiB without NUL characters.")}
				</div>,
			);
			return;
		}

		busy = true;
		execBtn.disabled = true;
		outputBody.style.display = "block";
		outputBody.textContent = `# [${new Date().toLocaleTimeString()}] ${_("Dispatching to %s (timeout: %s s)...").format(currentTarget.optical_sn, String(seconds))}\n`;
		outputStatus.replaceChildren(renderBadge("info", _("Waiting for device result…")));

		const startTime = Date.now();
		const target = currentTarget;
		try {
			const res = await execute(target, script.value, seconds);
			if (JSON.stringify(target) !== JSON.stringify(currentTarget)) return;
			const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
			const op = res.operation;
			const result = op.result;
			const status = result.status;
			const exitCode = result.exit_code;
			const isSuccess = op.binding_current && !result.error && status === "executed" && exitCode === 0;

			const statusBadge = renderBadge(
				isSuccess ? "success" : status === "timeout" ? "warning" : "danger",
				isSuccess
					? _("Success")
					: status === "timeout"
						? _("Timeout")
						: `${_("Exit code")} ${String(exitCode ?? status)}`,
			);

			outputStatus.replaceChildren(
				statusBadge,
				<span>
					<span style="color:#888">{_("Exit code")}:</span> <code>{String(exitCode ?? "—")}</code>
				</span>,
				<span>
					<span style="color:#888">{_("Duration")}:</span> <strong>{elapsed} s</strong>
				</span>,
				<span>
					<span style="color:#888">{_("Request ID")}:</span> <code>{String(result.request_id ?? "—")}</code>
				</span>,
				<div style="margin-left:auto;display:flex;gap:6px">
					{copyBtn}
					{clearBtn}
				</div>,
			);

			const outputLines: string[] = [];
			if (!op.binding_current) outputLines.push(_("Device binding changed; this result is stale."));
			if (status === "timeout" || status === "dispatched")
				outputLines.push(
					_(
						"Execution outcome is unknown. Timeout does not cancel the remote command; do not automatically retry.",
					),
				);
			if (typeof result.output === "string" && result.output.length) {
				outputLines.push(result.output);
			}
			if (typeof result.error === "string" && result.error.length) {
				outputLines.push(`[STDERR]\n${result.error}`);
			}
			if (result.output_truncated === true) {
				outputLines.push(`\n[!] ${_("Output was truncated at the byte limit.")}`);
			}
			if (outputLines.length === 0) {
				outputLines.push(_("No output returned."));
			}
			outputBody.textContent = outputLines.join("\n");
		} catch (cause: unknown) {
			const elapsed = ((Date.now() - startTime) / 1000).toFixed(2);
			outputStatus.replaceChildren(
				renderBadge("danger", _("Failed")),
				<span>
					<span style="color:#888">{_("Duration")}:</span> {elapsed} s
				</span>,
				<div style="margin-left:auto;display:flex;gap:6px">
					{copyBtn}
					{clearBtn}
				</div>,
			);
			outputBody.textContent = `[ERROR] ${cause instanceof Error ? cause.message : _("Request failed")}`;
		} finally {
			busy = false;
			execBtn.disabled = !currentTarget || !L.hasViewPermission();
		}
	};

	execBtn.addEventListener("click", () => {
		void doExecute();
	});

	script.addEventListener("keydown", (e: KeyboardEvent) => {
		if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
			e.preventDefault();
			void doExecute();
		}
	});

	// Quick snippets
	const snippets = [
		{ label: `uptime (${_("Load")})`, cmd: "uptime" },
		{ label: `meminfo (${_("Memory")})`, cmd: "cat /proc/meminfo | head -n 10" },
		{ label: "cpuinfo (CPU)", cmd: "cat /proc/cpuinfo | grep 'model name\\|processor'" },
		{ label: `ifconfig (${_("Network")})`, cmd: "ifconfig" },
		{ label: `ps (${_("Processes")})`, cmd: "ps" },
		{ label: `dmesg (${_("Kernel log")})`, cmd: "dmesg | tail -n 25" },
	];

	const snippetsBar = (
		<div class="hl202-snippets">
			<span style="font-size:80%;color:#888;margin-right:2px">{_("Quick diagnostic commands")}:</span>
			{snippets.map((snip) => (
				<button
					type="button"
					class="hl202-snippet-tag"
					onclick={() => {
						script.value = snip.cmd;
						script.focus();
					}}
				>
					{snip.label}
				</button>
			))}
		</div>
	);

	const element = (
		<div class="cbi-section hl202-panel-console">
			<h3 style="margin-bottom:4px">{_("Raw command console")}</h3>
			<p style="font-size:85%;color:#888;margin-top:0;margin-bottom:6px">
				{_(
					"Shell executes on the selected ONU. Timeout does not cancel execution. Raw output can contain secrets.",
				)}
			</p>
			{targetLine}
			{snippetsBar}
			<div class="hl202-terminal" style="margin-bottom:8px">
				{script}
			</div>
			<div style="display:flex;align-items:center;flex-wrap:wrap;gap:12px;margin-bottom:8px">
				<label htmlFor="hl202-timeout" style="display:flex;align-items:center;gap:6px;font-size:90%">
					<span>{_("Timeout in seconds")}:</span>
					{timeout}
				</label>
				<span style="font-size:82%;color:#888">{_("(Shortcut: %s)").replace("%s", "Ctrl + Enter")}</span>
				<div style="margin-left:auto">{execBtn}</div>
			</div>
			<div style="margin-top:10px">
				{outputStatus}
				{outputBody}
			</div>
		</div>
	);

	return {
		element,
		setTarget(target: Target | null) {
			if (JSON.stringify(target) !== JSON.stringify(currentTarget)) {
				outputStatus.replaceChildren();
				outputBody.textContent = "";
				outputBody.style.display = "none";
			}
			currentTarget = target;
			execBtn.disabled = !target || !L.hasViewPermission();
			if (target) {
				targetLine.replaceChildren(
					<span>
						<span style="color:#888">{_("Target")}:</span> <strong>{target.optical_sn}</strong> (ONU{" "}
						{target.onu_id}) · <code>gen: {target.binding_generation}</code>
					</span>,
				);
			} else {
				targetLine.replaceChildren(
					<span style="color:#e74c3c">
						{_("This optical device has no fresh, unambiguous MQTT binding. Commands are unavailable.")}
					</span>,
				);
			}
		},
	};
}

// Keep legacy wrappers for compatibility
export function reportPanel(target: Target | SourceTarget): HTMLElement {
	const ctrl = createReportPanel();
	ctrl.setTarget(target);
	return ctrl.element;
}

export function accountsPanel(target: Target): HTMLElement {
	const ctrl = createAccountsPanel();
	ctrl.setTarget(target);
	return ctrl.element;
}

export function consolePanel(target: Target): HTMLElement {
	const ctrl = createConsolePanel();
	ctrl.setTarget(target);
	return ctrl.element;
}
