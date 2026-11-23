// SPDX-License-Identifier: Apache-2.0
import assert from "node:assert/strict";
import { test } from "node:test";
import type { SubGateway } from "../src/view/contracts/status";

class TestNode {
	children: (TestNode | string)[] = [];
	parent: TestNode | null = null;
	connected = false;
	disabled = false;
	style = { display: "", width: "", setProperty: () => {}, removeProperty: () => {} };
	listeners: Record<string, () => unknown> = {};
	constructor(
		public tag: string,
		public attrs: Record<string, unknown> = {},
		children: unknown = [],
	) {
		this.append(...(Array.isArray(children) ? children : [children]));
	}
	append(...children: unknown[]) {
		for (const child of children.flat(Infinity)) {
			if (child == null) continue;
			if (child instanceof TestNode && child.tag === "#fragment") {
				const transferred = child.children.splice(0);
				this.append(...transferred);
			} else if (child instanceof TestNode) {
				child.parent = this;
				this.children.push(child);
			} else this.children.push(String(child));
		}
	}
	get isConnected(): boolean {
		return this.connected || !!this.parent?.isConnected;
	}
	getClientRects() {
		return this.isConnected ? [{}] : [];
	}
	get firstElementChild() {
		return this.children.find((child) => child instanceof TestNode);
	}
	get textContent(): string {
		return this.children.map((child) => (child instanceof TestNode ? child.textContent : child)).join("");
	}
	set textContent(value: string) {
		this.children = [value];
	}
	replaceChildren(...children: unknown[]) {
		this.children = [];
		this.append(...children);
	}
	addEventListener(event: string, handler: () => unknown) {
		this.listeners[event] = handler;
	}
	setAttribute(name: string, value: string) {
		this.attrs[name] = value;
	}
	all(tag: string): TestNode[] {
		return [this, ...this.children.flatMap((child) => (child instanceof TestNode ? child.all(tag) : []))].filter(
			(node) => node.tag === tag,
		);
	}
}

test("mounted fragment reports MIB request failures in the visible modal", async () => {
	let modal: TestNode | undefined;
	Object.assign(globalThis, {
		_: (value: string) => value,
		Node: TestNode,
		document: { createDocumentFragment: () => new TestNode("#fragment") },
		E: (tag: string, attrs: Record<string, unknown>, children: unknown) => new TestNode(tag, attrs, children),
		L: {
			rpc: {
				declare: () => async () => {
					throw new Error("backend unavailable");
				},
			},
			ui: {
				showModal: (_title: string, fragment: TestNode) => {
					modal = new TestNode("modal");
					modal.connected = true;
					modal.append(fragment);
				},
			},
		},
	});
	const { showOnuDetails } = await import("../src/view/components/onu-details");
	showOnuDetails(
		{ onu_id: 1, serial_number: "TEST00000000", state: "o5_operation", model: "test" } as SubGateway,
		"mib",
	);
	assert.ok(modal);
	const button = modal.all("button").find((node) => node.textContent === "Read MIB");
	assert.ok(button);
	await button.listeners.click();
	await new Promise((resolve) => setTimeout(resolve, 0));
	assert.match(modal.textContent, /backend unavailable/);
	assert.doesNotMatch(modal.textContent, /Reading MIB…/);
	assert.equal(button.disabled, false);
});
