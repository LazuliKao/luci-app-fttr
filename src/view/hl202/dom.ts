export const text = (value: string): Text => document.createTextNode(value);

export function button(label: string, kind = "action"): HTMLButtonElement {
	const node = document.createElement("button");
	node.className = `cbi-button cbi-button-${kind}`;
	node.textContent = label;
	return node;
}

export function input(type: string, label: string): HTMLInputElement {
	const node = document.createElement("input");
	node.type = type;
	node.setAttribute("aria-label", label);
	return node;
}
