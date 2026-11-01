// SPDX-License-Identifier: Apache-2.0
// Contract tests against real, pinned LuCI classes. Only DOM-facing APIs and
// the UCI transport are replaced; no native form lifecycle method is copied.
import assert from "node:assert/strict";
import { beforeEach, test } from "node:test";

const revision = "5599f42b0eb861cd0414391fb412b0947b1e4e13";
const base = `https://raw.githubusercontent.com/openwrt/luci/${revision}/modules/luci-base/htdocs/luci-static/resources`;
async function source(name: string): Promise<string> {
	const response = await fetch(`${base}/${name}.js`);
	if (!response.ok) throw new Error(`Cannot load LuCI ${name}: ${response.status}`);
	return response.text();
}
const [coreSource, formSource, uiSource] = await Promise.all([source("luci"), source("form"), source("ui")]);
Object.defineProperty(String.prototype, "format", {
	value: function (...values: unknown[]) {
		let index = 0;
		return String(this).replace(/%[sd]/g, () => String(values[index++]));
	},
	configurable: true,
});
const classSource = coreSource.slice(coreSource.indexOf("const superContext ="), coreSource.indexOf("const Headers ="));
const baseclass = new Function("toCamelCase", "LuCI", `${classSource}; return Class;`)((value: string) => value, {
	prototype: { isArguments: (value: unknown) => Object.prototype.toString.call(value) === "[object Arguments]" },
});

type Row = Record<string, any>;
let rows = new Map<string, Row>();
let serial = 0;
let transports = 0;
const notifications: unknown[] = [];
const uci = {
	loadPackage: async () => {},
	load: async () => {},
	save: async () => {
		transports++;
	},
	get: (_config: string, id: string, key?: string) => (key ? rows.get(id)?.[key] : rows.get(id)),
	set: (_config: string, id: string, key: string, value: unknown) => {
		rows.get(id)![key] = value;
	},
	unset: (_config: string, id: string, key: string) => {
		if (rows.has(id)) delete rows.get(id)![key];
	},
	sections: (_config: string, kind: string) => [...rows.values()].filter((row) => row[".type"] === kind),
	add: (_config: string, kind: string, name?: string) => {
		const id = name || `new${++serial}`;
		rows.set(id, { ".name": id, ".type": kind });
		return id;
	},
	remove: (_config: string, id: string) => rows.delete(id),
};

class TestNode {
	children: Array<TestNode | string>;
	handlers: Record<string, Function> = {};
	disabled: boolean;
	constructor(
		public tag = "",
		public attributes: Row = {},
		children: any = [],
	) {
		this.children = (Array.isArray(children) ? children : [children]).filter((child) => child != null);
		this.disabled = Boolean(attributes.disabled);
	}
	addEventListener(type: string, listener: Function) {
		this.handlers[type] = listener;
	}
	append(...children: Array<TestNode | string>) {
		this.children.push(...children);
	}
	get text(): string {
		return this.children.map((child) => (child instanceof TestNode ? child.text : child)).join("");
	}
}
class Dropdown {
	constructor(
		public value: unknown,
		public choices: Record<string, string>,
		public options: Row,
	) {}
	render() {
		Object.keys(this.choices);
		return this;
	}
	clearChoices(reset: boolean) {
		assert.equal(reset, true);
		this.value = [];
		this.choices = {};
	}
	addChoices(_keys: string[], labels: Record<string, string>) {
		Object.assign(this.choices, labels);
	}
}
const element = (tag?: string, attributes?: Row, children?: any) => new TestNode(tag, attributes, children);
const ui = {
	AbstractElement: Dropdown,
	Dropdown,
	Select: Dropdown,
	hideModal: () => {},
	showModal: (...args: unknown[]) => notifications.push(args),
	addNotification: (...args: unknown[]) => notifications.push(args),
};
const dom = { elem: () => false, findClassInstance: (node: any) => node?.instance };
const L: any = {
	uci,
	ui,
	hasViewPermission: () => true,
	bind: (fn: Function, self: unknown, ...args: unknown[]) => fn.bind(self, ...args),
	toArray: (value: unknown) => (value == null ? [] : Array.isArray(value) ? value : [value]),
	isObject: (value: unknown) => value != null && typeof value === "object" && !Array.isArray(value),
	error: (_type: string, message: string) => {
		throw new Error(message);
	},
};
Object.assign(globalThis, {
	L,
	_: (text: string) => text,
	E: element,
	Node: TestNode,
	document: { createDocumentFragment: () => new TestNode() },
});
const Form = new Function("baseclass", "L", "ui", "uci", "rpc", "dom", "_", "E", formSource)(
	baseclass,
	L,
	ui,
	uci,
	{ declare: () => async () => true },
	dom,
	(text: string) => text,
	element,
);
L.form = new Form();
const NativeElement = new Function(
	"baseclass",
	`${uiSource.slice(uiSource.indexOf("const UIElement ="), uiSource.indexOf("const UITextfield ="))}; return UIElement;`,
)(baseclass);
const { addServices } = await import("../src/view/config/services");
const { saveConfiguration } = await import("../src/view/config/save");
const { openRecovery } = await import("../src/view/config/recovery");
const { reference } = await import("../src/view/config/form");

beforeEach(() => {
	rows = new Map();
	transports = 0;
	notifications.length = 0;
	L.hasViewPermission = () => true;
	for (const [id, kind, values] of [
		["acs", "acs", {}],
		["t1", "template", { name: "Home" }],
		["t2", "template", { name: "Guest" }],
		["w1", "wifi", { template: "t1", ssid: "Home WiFi", radio: "2g" }],
		["w2", "wifi", { template: "t2", ssid: "Guest WiFi", radio: "5g" }],
		["n1", "network", { template: "t1", name: "Internet", service_list: ["INTERNET"], ssid: ["w1"] }],
	] as const)
		rows.set(id, { ".name": id, ".type": kind, ...values });
});

function editor() {
	const map = new L.form.Map("fttr");
	const root = map.section(L.form.NamedSection, "acs", "acs");
	addServices(root);
	const grids = root.children.map((option: any) => option.subsection);
	return { map, root, grids };
}
function modal(grid: any, id: string) {
	const map = new L.form.Map("fttr");
	map.findElement = () => null;
	const section = map.section(L.form.NamedSection, id, grid.sectiontype);
	grid.cloneOptions(grid, section);
	grid.addModalOptions(section, id);
	return section;
}
function headlessSave(map: any) {
	map.checkDepends = () => {};
	map.parse = async () => {};
	map.load = async () => {};
	map.renderContents = async () => {};
}

test("all service grids are siblings; their item modals have no nested sections", () => {
	const { grids } = editor();
	assert.deepEqual(
		grids.map((grid: any) => grid.sectiontype),
		["template", "wifi", "network"],
	);
	for (const grid of grids) {
		assert.ok(grid instanceof L.form.GridSection);
		assert.ok(grid.children.every((option: any) => !option.subsection));
	}
});

test("required references offer real choices only and reject missing targets", () => {
	const map = new L.form.Map("fttr");
	const section = map.section(L.form.NamedSection, "n1", "network");
	const required = reference(section, "template", "Template", "template");
	const widget = required.renderWidget("n1", 0, null);
	assert.deepEqual(widget.choices, { t1: "Home", t2: "Guest" });
	assert.equal(widget.options.optional, false);
	assert.equal(required.rmempty, false);
	assert.equal(required.validate("n1", "t1"), true);
	assert.notEqual(required.validate("n1", ""), true);
	assert.notEqual(required.validate("n1", "deleted-template"), true);
	rows.delete("t1");
	rows.delete("t2");
	assert.deepEqual(required.renderWidget("n1", 0, null).choices, {});
	const optional = reference(section, "optional_template", "Template", "template", true);
	assert.deepEqual(optional.renderWidget("n1", 0, null).choices, { "": "None" });
	assert.equal(optional.validate("n1", ""), true);
});

test("native add/cancel removes a new section for every editor and preserves existing sections", async () => {
	const { map, grids } = editor();
	for (const grid of grids) {
		const original = structuredClone([...rows]);
		grid.getPreviousModalMap = () => null;
		grid.renderMoreOptionsModal = async () => {};
		await grid.handleAdd(null);
		const id = map.addedSection;
		assert.ok(rows.has(id));
		await grid.handleModalCancel(null, null, false);
		assert.deepEqual([...rows], original);
		assert.equal(map.addedSection, undefined);
		await grid.handleModalCancel(null, null, false);
		assert.deepEqual([...rows], original);
	}
});

test("cloned modal options use their own template value, with safe empty choices", () => {
	const { grids } = editor();
	const grid = grids.find((item: any) => item.sectiontype === "network");
	const section = modal(grid, "n1");
	const ssids = section.getOption("ssid");
	section.getOption("template").formvalue = () => "t2";
	const widget = ssids.renderWidget("n1", 0, []);
	assert.deepEqual(widget.choices, { w2: "Guest WiFi" });
	assert.notEqual(ssids.validate("n1", ["w1"]), true);
	assert.equal(ssids.validate("n1", ["w2"]), true);
	rows.delete("w2");
	assert.deepEqual(ssids.renderWidget("n1", 0, []).choices, {});
	assert.equal(ssids.validate("n1", []), true);
});

test("changing a template clears the widget without mutating UCI before confirmation", () => {
	const { grids } = editor();
	const section = modal(
		grids.find((item: any) => item.sectiontype === "network"),
		"n1",
	);
	const ssids = section.getOption("ssid");
	const widget = ssids.renderWidget("n1", 0, ["w1"]);
	ssids.getUIElement = () => widget;
	section.getOption("template").onchange(null, "n1", "t2");
	assert.deepEqual(widget.value, []);
	assert.deepEqual(widget.choices, { w2: "Guest WiFi" });
	assert.deepEqual(rows.get("n1")!.ssid, ["w1"]);
	assert.equal(rows.get("n1")!.template, "t1");
});

test("field validation blocks moving a bound SSID and invalid service labels", () => {
	const { grids } = editor();
	const wifi = modal(
		grids.find((item: any) => item.sectiontype === "wifi"),
		"w1",
	);
	assert.notEqual(wifi.getOption("template").validate("w1", "t2"), true);
	assert.equal(wifi.getOption("template").validate("w1", "t1"), true);
	const network = modal(
		grids.find((item: any) => item.sectiontype === "network"),
		"n1",
	);
	assert.notEqual(network.getOption("service_list").validate("n1", ["TR069"]), true);
	assert.notEqual(network.getOption("template").validate("n1", ""), true);
});

test("native row removal and native Map.save stay independent of global page validation", async () => {
	const { map, grids } = editor();
	headlessSave(map);
	rows.get("n1")!.service_list = [];
	const nativeSave = map.save;
	await assert.rejects(saveConfiguration(map), /n1.service_list/);
	assert.equal(transports, 0);
	assert.equal(map.save, nativeSave);
	assert.equal(notifications.length, 1);
	rows.set("n2", { ".name": "n2", ".type": "network", template: "t1" });
	await grids.find((item: any) => item.sectiontype === "network").handleRemove("n2", null);
	assert.equal(rows.has("n2"), false);
	assert.equal(transports, 1);
	map.parse = async () => {
		rows.get("n1")!.service_list = ["INTERNET"];
	};
	await saveConfiguration(map);
	assert.equal(transports, 2);
});

test("invalid modal confirmation cannot partially write other fields before cancellation", async () => {
	const { grids } = editor();
	const grid = grids.find((item: any) => item.sectiontype === "network");
	const section = modal(grid, "n1");
	const values: Row = { ...rows.get("n1"), name: "Edited", service_list: [] };
	const invalid: string[] = [];
	for (const option of section.children) {
		option.isActive = () => true;
		const widget = new NativeElement();
		widget.getValue = () => values[option.option] ?? option.default;
		widget.vfunc = () => {
			widget.validState = option.getValidator("n1")(widget.getValue()) === true;
		};
		widget.setInvalid = () => invalid.push(option.option);
		option.getUIElement = () => widget;
	}
	section.map.checkDepends = () => {};
	section.map.load = async () => {};
	section.map.renderContents = async () => {};
	const before = structuredClone([...rows]);
	await assert.rejects(section.map.save(null, true), /Correct the invalid fields/);
	assert.deepEqual([...rows], before);
	assert.deepEqual(invalid, ["service_list"]);
	assert.equal(transports, 0);
	grid.getPreviousModalMap = () => null;
	await grid.handleModalCancel(null, null, false);
	assert.deepEqual([...rows], before);
	values.service_list = ["INTERNET"];
	await section.map.save(null, true);
	assert.equal(rows.get("n1")!.name, "Edited");
	assert.equal(transports, 1);
	// Native triggerValidation returns false for an unchanged, valid field.
	assert.equal(section.getOption("name").triggerValidation("n1"), false);
	assert.equal(section.getOption("name").isValid("n1"), true);
	await section.map.save(null, true);
	assert.equal(transports, 2);
});

function buttons(node: TestNode): TestNode[] {
	return [
		...(node.tag === "button" ? [node] : []),
		...node.children.flatMap((child) => (child instanceof TestNode ? buttons(child) : [])),
	];
}
function currentDialog(): TestNode {
	return (notifications.at(-1) as any[])[1];
}
async function click(text: string): Promise<void> {
	const button = buttons(currentDialog()).find((item) => item.text === text)!;
	assert.ok(button, `Missing button: ${text}`);
	await button.handlers.click({ currentTarget: button });
}

test("recovery routes the broken group reference to the exact device editor", async () => {
	const { map, root } = editor();
	rows.set("d1", { ".name": "d1", ".type": "device", optical_sn: "TEST-ONU", group: "sg631_probe_group" });
	root.tab("devices", "Devices");
	const device = root.taboption("devices", L.form.SectionValue, "_devices", L.form.GridSection, "device").subsection;
	let edited: string | undefined;
	device.renderMoreOptionsModal = async (id: string) => {
		edited = id;
	};
	const before = structuredClone([...rows]);
	openRecovery(root, "unknown group: sg631_probe_group");
	assert.match(currentDialog().text, /sg631_probe_group/);
	await click("Edit to repair");
	assert.equal(edited, "d1");
	assert.deepEqual([...rows], before);
	assert.equal(map.addedSection, undefined);
});

test("recovery cleanup confirms the target then uses native removal for that row only", async () => {
	const { map, root } = editor();
	headlessSave(map);
	rows.get("n1")!.service_list = [];
	const others = structuredClone([...rows].filter(([id]) => id !== "n1"));
	openRecovery(root);
	await click("Delete this configuration");
	assert.ok(rows.has("n1"));
	await click("Delete this configuration");
	assert.equal(rows.has("n1"), false);
	assert.deepEqual([...rows], others);
	assert.equal(transports, 1);
	assert.match(currentDialog().text, /No problems were found/);
});

test("read-only users can inspect recovery but cannot edit or delete", async () => {
	const { root } = editor();
	rows.get("n1")!.service_list = [];
	L.hasViewPermission = () => false;
	const before = structuredClone([...rows]);
	openRecovery(root);
	const actions = buttons(currentDialog()).filter((button) =>
		["Edit to repair", "Delete this configuration"].includes(button.text),
	);
	assert.equal(actions.length, 2);
	assert.ok(actions.every((button) => button.disabled));
	await click("Edit to repair");
	assert.deepEqual([...rows], before);
	assert.equal(transports, 0);
});
