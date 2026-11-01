// SPDX-License-Identifier: Apache-2.0

const form = L.form;

export function field(section: any, type: any, name: string, title: string, datatype?: string): any {
	const option = section.option(type, name, title);
	if (datatype) option.datatype = datatype.startsWith("range(") ? `and(uinteger,${datatype})` : datatype;
	return option;
}

export function tabfield(section: any, tab: string, type: any, name: string, title: string, datatype?: string): any {
	const option = section.taboption(tab, type, name, title);
	if (datatype) option.datatype = datatype.startsWith("range(") ? `and(uinteger,${datatype})` : datatype;
	return option;
}

export function choice(
	section: any,
	name: string,
	title: string,
	values: Array<[string, string]>,
	optional = false,
): any {
	const option = field(section, form.ListValue, name, title);
	for (const [value, label] of values) option.value(value, label);
	option.rmempty = optional;
	return option;
}

export function tabchoice(
	section: any,
	tab: string,
	name: string,
	title: string,
	values: Array<[string, string]>,
	optional = false,
): any {
	const option = tabfield(section, tab, form.ListValue, name, title);
	for (const [value, label] of values) option.value(value, label);
	option.rmempty = optional;
	return option;
}

export function reference(section: any, name: string, title: string, kind: string, optional = false): any {
	// Keep validation and presentation in the same LuCI widget. Themes may
	// replace native selects and strand validation messages behind the proxy.
	const option = field(section, form.RichListValue, name, title);
	option.rmempty = optional;
	option.optional = optional;
	option.default = "";
	dynamicChoices(option, () => [
		...(optional ? [["", _("None")] as [string, string]] : []),
		...L.uci
			.sections("fttr", kind)
			.map((item): [string, string] => [
				item[".name"],
				String(item.name || item.ssid || item.optical_sn || item[".name"]),
			]),
	]);
	option.validate = (_id: string, value: string) =>
		(optional && !value) || L.uci.sections("fttr", kind).some((item) => item[".name"] === value)
			? true
			: _("Select an existing item.");
	return option;
}

export function tabreference(
	section: any,
	tab: string,
	name: string,
	title: string,
	kind: string,
	optional = false,
): any {
	const option = tabfield(section, tab, form.RichListValue, name, title);
	option.rmempty = optional;
	option.optional = optional;
	option.default = "";
	dynamicChoices(option, () => [
		...(optional ? [["", _("None")] as [string, string]] : []),
		...L.uci
			.sections("fttr", kind)
			.map((item): [string, string] => [
				item[".name"],
				String(item.name || item.ssid || item.optical_sn || item[".name"]),
			]),
	]);
	option.validate = (_id: string, value: string) =>
		(optional && !value) || L.uci.sections("fttr", kind).some((item) => item[".name"] === value)
			? true
			: _("Select an existing item.");
	return option;
}

export function dynamicChoices(option: any, choices: (this: any, id: string) => Array<[string, string]>): void {
	const transform = option.transformChoices;
	option.transformChoices = function (): object {
		// LuCI returns null for an empty keylist, but Dropdown.render() needs an object.
		return transform.call(this) ?? {};
	};
	const render = option.renderWidget;
	option.renderWidget = function (...args: any[]): any {
		this.keylist = [];
		this.vallist = [];
		for (const [key, label] of choices.call(this, String(args[0]))) this.value(key, label);
		return render.apply(this, args);
	};
}

export function grid(
	parent: any,
	tab: string,
	key: string,
	kind: string,
	title: string,
	setup: (section: any) => void,
): any {
	const value = parent.taboption(tab, form.SectionValue, key, form.GridSection, kind, title);
	const section = value.subsection;
	section.anonymous = true;
	section.addremove = true;
	section.modaltitle = (id: string) =>
		String(L.uci.get("fttr", id, "name") || L.uci.get("fttr", id, "ssid") || title);
	setup(section);
	section.addModalOptions = (modal: any, id: string): void => {
		const parse = modal.map.parse;
		modal.map.parse = function (): Promise<unknown> {
			// Native parsing writes valid options while other options may reject.
			// Validate the complete single-item editor before allowing any writes.
			let valid = true;
			for (const option of modal.children) {
				if (!option.isActive(id)) continue;
				// triggerValidation() reports a state change, not validity.
				option.triggerValidation(id);
				if (!option.isValid(id)) valid = false;
				const value = option.formvalue(id);
				if (
					!option.rmempty &&
					!option.optional &&
					(value == null || value === "" || (Array.isArray(value) && !value.length))
				) {
					option.getUIElement(id)?.setInvalid(_("This field is required."));
					valid = false;
				}
			}
			return valid ? parse.call(this) : Promise.reject(new Error(_("Correct the invalid fields before saving.")));
		};
	};
	return section;
}

export function preview(section: any, name: string, title: string, textvalue: (id: string) => string): void {
	const option = section.option(L.form.DummyValue, name, title);
	option.modalonly = false;
	option.textvalue = textvalue;
}

export function templateReference(section: any): any {
	preview(section, "_template", _("Template"), (id) => {
		const template = String(L.uci.get("fttr", id, "template") || "");
		return String(L.uci.get("fttr", template, "name") || template || _("Missing template"));
	});
	const option = reference(section, "template", _("Template"), "template");
	option.modalonly = true;
	return option;
}

export function guardRemoval(section: any, beforeRemove: (id: string) => void): void {
	const remove = section.handleRemove;
	section.handleRemove = async function (id: string, event: Event): Promise<void> {
		try {
			beforeRemove(id);
			await remove.call(this, id, event);
		} catch (error) {
			L.ui.addNotification(null, <p>{String(error instanceof Error ? error.message : error)}</p>, "error");
		}
	};
}
