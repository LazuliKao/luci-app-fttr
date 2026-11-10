import type { CalibrationApplied } from "../../api/generated/types";

export interface Coefficients {
	n: number;
	d: number;
	o: number;
}

// Offline preview only. Match the firmware's single-precision quotient, not
// integer truncation; rejected ranges are unavailable rather than guessed.
export function calibratedAdc(raw: number, { n, d, o }: Coefficients): number | null {
	const product = raw * n;
	if (d === 0 || product > 0x7fffffff) return null;
	return Math.fround(Math.fround(Math.fround(product) / d) + o);
}

export function calibratedTemperature(
	raw: number,
	primary: Coefficients,
	alternate: Coefficients,
	threshold: number,
): number | null {
	const value = calibratedAdc(raw, primary);
	if (value === null) return null;
	const temperature = Math.fround(value / 256);
	if (temperature > threshold) return temperature;
	const alt = calibratedAdc(raw, alternate);
	return alt === null ? null : Math.fround(alt / 256);
}

export function calibratedTx(raw: number, coefficients: Coefficients): number | null {
	const value = calibratedAdc(raw, coefficients);
	if (value === null) return null;
	const mw = Math.fround(Math.fround(value / 10) / 1000);
	return mw > 0 ? Math.fround(10 * Math.log10(mw)) : null;
}

export function temperatureTarget(
	raw: number,
	primary: Coefficients,
	table: number[],
): { index: number; code: number } | null {
	if (primary.d === 0 || raw * primary.n > 0x7fffffff || table.length !== 84) return null;
	const q = Math.trunc((raw * primary.n) / primary.d) + primary.o;
	if (q > 0x7fffffff || q < -0x80000000) return null;
	const index = ((q >> 8) + 40) >> 1;
	const code = table[index];
	return index >= 0 && index < 84 && code >= 0 && code <= 1023 ? { index, code } : null;
}

export function calibrationApplyOutcome(result: CalibrationApplied): "failed" | "deferred" | "applied" | "unknown" {
	if (!result.success) return "failed";
	if (!result.state) return "unknown";
	return result.state.hardware_applied && !result.state.pending ? "applied" : "deferred";
}
