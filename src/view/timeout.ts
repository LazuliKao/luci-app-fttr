// SPDX-License-Identifier: Apache-2.0

/** Bound an RPC wait; an optional callback can clean up a late result. */
export function withTimeout<T>(
	promise: Promise<T>,
	ms: number,
	message: string,
	onLate?: (value: T) => void | Promise<void>,
): Promise<T> {
	return new Promise((resolve, reject) => {
		let timedOut = false;
		const timer = setTimeout(() => {
			timedOut = true;
			reject(new Error(message));
		}, ms);
		promise.then(
			(value) => {
				clearTimeout(timer);
				if (timedOut) {
					if (onLate)
						Promise.resolve()
							.then(() => onLate(value))
							.catch(console.warn);
				} else resolve(value);
			},
			(error) => {
				clearTimeout(timer);
				if (!timedOut) reject(error);
			},
		);
	});
}
