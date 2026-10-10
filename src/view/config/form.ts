// SPDX-License-Identifier: Apache-2.0

const form = L.form;

export function field(section: any, type: any, name: string, title: string, datatype?: string): any {
	const option = section.option(type, name, title);
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

export function reference(section: any, name: string, title: string, kind: string, optional = false): any {
	const option = field(section, form.ListValue, name, title);
	if (optional) option.value("", _("None"));
	for (const item of L.uci.sections("fttr", kind))
		option.value(item[".name"], String(item.name || item.ssid || item.optical_sn || item[".name"]));
	option.rmempty = optional;
	const render = option.renderWidget;
	option.renderWidget = function (...args: any[]): any {
		this.keylist = [];
		this.vallist = [];
		if (optional) this.value("", _("None"));
		for (const item of L.uci.sections("fttr", kind))
			this.value(item[".name"], String(item.name || item.ssid || item.optical_sn || item[".name"]));
		return render.apply(this, args);
	};
	return option;
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
	return section;
}

export function preview(section: any, name: string, title: string, textvalue: (id: string) => string): void {
	const option = section.option(L.form.DummyValue, name, title);
	option.modalonly = false;
	option.textvalue = textvalue;
}

export function templateGrid(
	parent: any,
	tab: string,
	key: string,
	kind: string,
	title: string,
	template: string,
	setup: (section: any) => void,
): any {
	const s = grid(parent, tab, key, kind, title, setup);
	s.filter = (id: string) => L.uci.get("fttr", id, "template") === template;
	s.handleAdd = function (): Promise<any> {
		const id = L.uci.add("fttr", kind);
		L.uci.set("fttr", id, "template", template);
		return this.map.save(null, true).then(() => this.renderMoreOptionsModal(id));
	};
	return s;
}
