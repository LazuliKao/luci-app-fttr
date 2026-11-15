// SPDX-License-Identifier: Apache-2.0

const form = L.form;

export function field<T extends LuCI.form.AbstractValue>(
	section: LuCI.form.AbstractSection,
	type: LuCI.form.ClassConstructor<T>,
	name: string,
	title: string,
	datatype?: string,
): T {
	const option = section.option(type, name, title);
	if (datatype) option.datatype = datatype.startsWith("range(") ? `and(uinteger,${datatype})` : datatype;
	return option;
}

export function tabfield<T extends LuCI.form.AbstractValue>(
	section: LuCI.form.AbstractSection,
	tab: string,
	type: LuCI.form.ClassConstructor<T>,
	name: string,
	title: string,
	datatype?: string,
): T {
	const option = section.taboption(tab, type, name, title);
	if (datatype) option.datatype = datatype.startsWith("range(") ? `and(uinteger,${datatype})` : datatype;
	return option;
}

export function choice(
	section: LuCI.form.AbstractSection,
	name: string,
	title: string,
	values: Array<[string, string]>,
	optional = false,
): LuCI.form.ListValue {
	const option = field(section, form.ListValue, name, title);
	for (const [value, label] of values) option.value(value, label);
	option.rmempty = optional;
	return option;
}

export function tabchoice(
	section: LuCI.form.AbstractSection,
	tab: string,
	name: string,
	title: string,
	values: Array<[string, string]>,
	optional = false,
): LuCI.form.ListValue {
	const option = tabfield(section, tab, form.ListValue, name, title);
	for (const [value, label] of values) option.value(value, label);
	option.rmempty = optional;
	return option;
}

export function reference(
	section: LuCI.form.AbstractSection,
	name: string,
	title: string,
	kind: string,
	optional = false,
): LuCI.form.RichListValue {
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
	option.validate = (_id, value) =>
		(optional && !value) || L.uci.sections("fttr", kind).some((item) => item[".name"] === value)
			? true
			: _("Select an existing item.");
	return option;
}

export function tabreference(
	section: LuCI.form.AbstractSection,
	tab: string,
	name: string,
	title: string,
	kind: string,
	optional = false,
): LuCI.form.RichListValue {
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
	option.validate = (_id, value) =>
		(optional && !value) || L.uci.sections("fttr", kind).some((item) => item[".name"] === value)
			? true
			: _("Select an existing item.");
	return option;
}

export function dynamicChoices(
	option: LuCI.form.Value,
	choices: (this: LuCI.form.Value, id: string) => Array<[string, string]>,
): void {
	const transform = option.transformChoices;
	option.transformChoices = function () {
		// LuCI returns null for an empty keylist, but Dropdown.render() needs an object.
		return transform.call(this) ?? {};
	};
	const render = option.renderWidget;
	option.renderWidget = function (...args) {
		this.keylist = [];
		this.vallist = [];
		for (const [key, label] of choices.call(this, String(args[0]))) this.value(key, label);
		return render.apply(this, args);
	};
}

export function grid(
	parent: LuCI.form.AbstractSection,
	tab: string,
	key: string,
	kind: string,
	title: string,
	setup: (section: LuCI.form.GridSection) => void,
): LuCI.form.GridSection {
	const value = parent.taboption(tab, form.SectionValue, key, form.GridSection, kind, title);
	const section = value.subsection;
	section.anonymous = true;
	section.addremove = true;
	section.modaltitle = (id: string) =>
		String(L.uci.get("fttr", id, "name") || L.uci.get("fttr", id, "ssid") || title);
	setup(section);
	section.addModalOptions = (modal, id): void => {
		const parse = modal.map.parse;
		modal.map.parse = function (): Promise<void> {
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

export function preview(
	section: LuCI.form.AbstractSection,
	name: string,
	title: string,
	textvalue: (id: string) => string,
): void {
	const option = section.option(L.form.DummyValue, name, title);
	option.modalonly = false;
	option.textvalue = textvalue;
}

export function templateReference(section: LuCI.form.AbstractSection): LuCI.form.RichListValue {
	preview(section, "_template", _("Template"), (id) => {
		const template = String(L.uci.get("fttr", id, "template") || "");
		return String(L.uci.get("fttr", template, "name") || template || _("Missing template"));
	});
	const option = reference(section, "template", _("Template"), "template");
	option.modalonly = true;
	return option;
}

export function guardRemoval(section: LuCI.form.GridSection, beforeRemove: (id: string) => void): void {
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
