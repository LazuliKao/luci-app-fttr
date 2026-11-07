// Additional HTML elements supported by the existing LuCI JSX runtime.
declare global {
	namespace JSX {
		interface IntrinsicElements {
			details: JSXElement<HTMLDetailsElement>;
			summary: JSXElement<HTMLElement>;
			section: JSXElement<HTMLElement>;
			aside: JSXElement<HTMLElement>;
			header: JSXElement<HTMLElement>;
			footer: JSXElement<HTMLElement>;
			i: JSXElement<HTMLElement>;
			dl: JSXElement<HTMLDListElement>;
			dt: JSXElement<HTMLElement>;
			dd: JSXElement<HTMLElement>;
		}
	}
}

export {};
