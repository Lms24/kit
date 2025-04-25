import { trace } from '@opentelemetry/api';

import { VERSION } from '../version.js';

/**
 * @template T
 * @param {string} name
 * @param {import("@opentelemetry/api").SpanOptions} options
 * @param {(span: import("@opentelemetry/api").Span) => T | Promise<T>} callback
 * @returns {T | Promise<T>}
 */
export function startAndEndSpan(name, options, callback) {
	const tracer = trace.getTracer('sveltekit', VERSION);
	return tracer.startActiveSpan(name, options, (span) => {
		const result = callback(span);
		if (result instanceof Promise) {
			result.then(() => span.end());
		} else {
			span.end();
		}
		return result;
	});
}
